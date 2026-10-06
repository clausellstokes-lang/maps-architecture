// S1's L0 batch as a Stage (M0-e-03; §4.1's S1 row and *Registration and order*: S1 registers as callback, "which is
// always safe"; §4.2 S1 (5), (8), (9); §3.10's stored-reference row at stage end; §14's Stage and StageContext).
//
// `runS1` takes the terrain S1 (1) built and the water S1 (3) traced, and: splits off the basic estuary (`mouth`),
// builds the bodies' polygons, sites the crossings over every reach (S1 (5)), commits the arena's outer ring alone and
// then the water batch (shores, decks, owners, land, banks, pins), rebuilds the L0 index partitions at the stage's end
// (§3.3) and checks §3.10's stage-end rows over every reference the water, the bridges, the land and the terrain hold —
// a failing hard row refuses the stage E_INVARIANT — then writes Terrain.outfalls (S1 (9)). The stage draws nothing
// (no stream key). Its input carries the kernel façade the runner hands it: §14's `run(input, ctx)` has no kernel
// parameter and the StageContext no kernel slot (C-0225 (1)).
import { checkStageEnd, err, ok, STAGES, type KernelResult, type Warning } from '@plat/kernel';
import type { GeomRef, Id, Rung, Scope, Stage, StageContext, WaterSet, WorkLimitLaw } from '@plat/model';
import { loadWorkLimits, workLimitOf } from '@plat/tables';
import { GROUND_KEY } from '../terrain/heightfield.js';
import type { SiteEnv } from '../terrain/types.js';
import { siteCrossings } from './crossings.js';
import { bridgeId, outerRingBatch, waterFaces } from './faces.js';
import { reachOf } from './geometry.js';
import { outfalls } from './outfalls.js';
import { waterParams } from './params.js';
import { splitEstuary, waterPolygons } from './polygons.js';
import type { S1Input, S1Output } from './types.js';

/** The work-limit counters an L0 batch charges (M0.md §2.2's insert and tx rows). */
export const S1_COUNTERS = Object.freeze(['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked'] as const);

/** The stage's options. */
export interface S1StageOptions {
  /** A work limit (operations) for each of the two L0 batches in place of the laws' (a test's or a runner's override). */
  workLimit?: number;
}

/**
 * The batches' work limit (§5.1 (5)): the sum of the counters' laws over the batch — `vertices` the points it inserts,
 * `faces` its rings and the land around them (C-0225 (10)).
 */
export function l0WorkLimit(vertices: number, faces: number): number {
  const t = loadWorkLimits();
  const scope = { kind: 'stage' as const, stage: STAGES.S1 };
  let sum = 0;
  for (const c of S1_COUNTERS) sum += workLimitOf(t.law(c), scope, { vertices, faces });
  return sum;
}

/** S1's L0 batch (see the header). The terrain record takes its outfalls in place. */
export function runS1(input: S1Input, ctx: StageContext<SiteEnv>, opts: S1StageOptions = {}): KernelResult<S1Output> {
  const k = input.kernel;
  const plat = k.plat(GROUND_KEY);
  const reach = reachOf(plat.frame);
  const params = waterParams(ctx.tables);
  const warnings: Warning[] = [];
  const bodies = splitEstuary(input.water.bodies, reach, input.mouth);
  const polys = waterPolygons(bodies, reach);
  if (!polys.ok) return err(polys.code, `S1 water polygons: ${polys.detail}`);
  warnings.push(...polys.warnings);
  const reaches = polys.value.reaches;
  const sites = siteCrossings(reaches, params.searchBandCm * 0.01, input.existingDecks ?? [], {
    reach,
    minSpacingCm: params.minSpacingCm,
    fordMaxWidthCm: params.fordMaxWidthCm,
  });
  const first = input.water.bridges.length;
  const ids = sites.map((_, i) => bridgeId(first + i));
  let points = 4 + 2 * sites.length;
  let rings = 1;
  for (const r of reaches) {
    for (const p of r.parts) {
      for (const ring of p.rings) points += ring.length;
      rings += p.rings.length;
    }
  }
  const limitRing = opts.workLimit ?? l0WorkLimit(4, 2);
  const limitWater = opts.workLimit ?? l0WorkLimit(points, 2 * rings + 2);
  const batch = { key: GROUND_KEY, stage: STAGES.S1 };
  const ring = outerRingBatch(k, input.terrain.id, reach, { ...batch, workLimit: limitRing });
  if (!ring.ok) return err(ring.code, ring.detail);
  warnings.push(...ring.warnings);
  const water = waterFaces(reaches, k, { ...batch, workLimit: limitWater, sites, bridgeIds: ids, epoch: ctx.epoch });
  if (!water.ok) return err(water.code, water.detail);
  warnings.push(...water.warnings);
  const version = plat.version;
  const bridges = water.value.bridges;
  const kept = reaches.map((r) => r.body);
  const out: WaterSet = { bodies: kept, bridges: [...input.water.bridges, ...bridges] };
  // the stage's end: the L0 partitions rebuilt (§3.3), then §3.10's stored references
  if (plat.index !== undefined) k.index.rebuildAtStageEnd(GROUND_KEY);
  const refs: GeomRef[] = [{ role: 'margin', entity: input.terrain.id }];
  const live = new Set<Id>([input.terrain.id]);
  for (const b of out.bodies) {
    refs.push(b.face, b.shore);
    live.add(b.id);
  }
  for (const b of out.bridges) {
    refs.push(...b.deck);
    live.add(b.id);
  }
  for (const c of water.value.land) {
    refs.push(c.face);
    live.add(c.id);
  }
  const rows = checkStageEnd(plat, { refs, isLive: (id) => live.has(id) });
  const failed = rows.filter((r) => r.class === 'hard' && !r.holds);
  if (failed.length > 0) return err('E_INVARIANT', `S1 stage end: ${failed.map((r) => `${r.name}: ${r.problems.slice(0, 3).join('; ')}`).join(' | ')}`);
  // S1 (9): the outfalls on the hydrology S1 (3) left
  input.terrain.outfalls = outfalls(input.terrain, reaches, { reach, stretchCm: params.outfallStretchCm });
  return ok(
    {
      terrain: input.terrain,
      water: out,
      land: water.value.land,
      sites,
      report: {
        dropped: polys.value.dropped,
        fallbacks: polys.value.fallbacks,
        versions: [ring.value, version],
        stageEnd: rows.map((r) => ({ name: r.name, holds: r.holds, count: r.subjects })),
        warnings,
      },
    },
    warnings,
  );
}

/** §12.4's S1 row (25 ms at CITY; reporting only — the other rungs report against it until their rows, M1). */
const BUDGET_MS: Record<Rung, number> = { TOWN: 25, CITY: 25, METROPOLIS: 25, THORP: 25, HAMLET: 25, VILLAGE: 25 };

/** The laws of the counters the L0 batches charge, as the declaration lists them (§4.12's `workLimits`). */
function laws(): WorkLimitLaw[] {
  const t = loadWorkLimits();
  return S1_COUNTERS.map((c) => {
    const law = t.law(c);
    if (law.unit === 'fixed') throw new RangeError(`S1: the counter ${c} has a fixed law; its declaration needs a unit`);
    return { ...law };
  });
}

/**
 * S1's L0 batch as §14's Stage: id S1, callback form, no stream key; its input is the runner's model record for the
 * batch (S1Input — the terrain, the water, the mouth, the façade), checked for its fields (C-0225 (1)).
 */
export function s1Stage(opts: S1StageOptions = {}): Stage<S1Input, S1Output, SiteEnv> {
  return Object.freeze({
    id: STAGES.S1,
    version: '1',
    inputs: [] as string[],
    outputs: ['terrain', 'water'] as string[],
    streamKeys: [] as string[],
    invariants: [{ name: 'references-resolve', scope: 'stage' as const, class: 'hard' as const, kind: 'check' as const, check: 'references-resolve' }],
    ladder: [] as { failureClass: string; rungs: string[] }[],
    workLimits: laws(),
    budgetMs: BUDGET_MS,
    batch: { kind: 'stage' as const, stage: STAGES.S1 },
    lineageUnit: 'terrain',
    lazy: false,
    txForm: 'callback' as const,
    inputsOf(model: SiteEnv['model'], _scope: Scope): S1Input {
      const m = model as Partial<S1Input> | null | undefined;
      if (m === null || m === undefined || m.terrain === undefined || m.water === undefined || m.kernel === undefined) {
        throw new TypeError('s1Stage.inputsOf: the model hands S1 its terrain, its water and the kernel façade');
      }
      return m as S1Input;
    },
    run(input: S1Input, ctx: StageContext<SiteEnv>): KernelResult<S1Output> {
      return runS1(input, ctx, opts);
    },
  });
}
