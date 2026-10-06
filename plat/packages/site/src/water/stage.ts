// S1's L0 batch as a Stage (M0-e-03; §4.1's S1 row and *Registration and order*: S1 registers as callback, "which is
// always safe"; §4.2 S1 (5), (8), (9); §3.10's stored-reference row at stage end; §14's Stage and StageContext).
//
// `runS1` takes the terrain S1 (1) built and the water S1 (3) traced, and: splits off the basic estuary (`mouth`),
// builds the bodies' polygons, sites the crossings over every reach (S1 (5)), commits the arena's outer ring alone and
// then the water batch (shores, decks, owners, land, banks, pins), rebuilds the L0 index partitions at the stage's end
// (§3.3) and checks §3.10's stage-end rows over every reference the water, the bridges, the land and the terrain hold —
// a failing hard row refuses the stage E_INVARIANT — then writes Terrain.outfalls (S1 (9)). A water batch the kernel
// refuses on the fast rings is re-run on the kernel's own polygons; a body refused on both is left out and reported
// (`dropped`, reason `refused`; an estuary by keeping its river whole) and the batch re-run — never the first body, the
// river, whose refusal is the stage's (C-0229 (2)). The stage draws nothing
// (no stream key). Its input carries the kernel façade the runner hands it: §14's `run(input, ctx)` has no kernel
// parameter and the StageContext no kernel slot (C-0229 (1)).
import { checkStageEnd, err, ok, STAGES, type Kernel, type KernelError, type KernelResult, type Warning } from '@plat/kernel';
import type { GeomRef, Id, Rung, Scope, Stage, StageContext, WaterBody, WaterSet, WorkLimitLaw } from '@plat/model';
import { loadWorkLimits, workLimitOf } from '@plat/tables';
import { GROUND_KEY } from '../terrain/heightfield.js';
import type { SiteEnv } from '../terrain/types.js';
import { siteCrossings } from './crossings.js';
import { bridgeId, outerRingBatch, waterFaces } from './faces.js';
import { reachOf, type Reach } from './geometry.js';
import { outfalls } from './outfalls.js';
import { waterParams, type WaterParams } from './params.js';
import { waterPolygons } from './polygons.js';
import type { CrossingSite, DroppedBody, S1Input, S1Output } from './types.js';

/** The work-limit counters an L0 batch charges (M0.md §2.2's insert and tx rows). */
export const S1_COUNTERS = Object.freeze(['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked'] as const);

/** The stage's options. */
export interface S1StageOptions {
  /** A work limit (operations) for each of the two L0 batches in place of the laws' (a test's or a runner's override). */
  workLimit?: number;
}

/**
 * The batches' work limit (§5.1 (5)): the sum of the counters' laws over the batch — `vertices` the points it inserts,
 * `faces` its rings and the land around them (C-0229 (10)).
 */
export function l0WorkLimit(vertices: number, faces: number): number {
  const t = loadWorkLimits();
  const scope = { kind: 'stage' as const, stage: STAGES.S1 };
  let sum = 0;
  for (const c of S1_COUNTERS) sum += workLimitOf(t.law(c), scope, { vertices, faces });
  return sum;
}

type Attempt =
  | { ok: true; polys: Extract<ReturnType<typeof waterPolygons>, { ok: true }>; sites: CrossingSite[]; faces: Extract<ReturnType<typeof waterFaces>, { ok: true }>; retried: boolean }
  | { ok: false; code: KernelError; detail: string; fast: boolean };

/** One try at the water: the polygons (fast, or the kernel's only), the sites on them, the water batch. */
function water(input: S1Input, bodies: readonly WaterBody[], mouth: S1Input['mouth'], reach: Reach, params: WaterParams, k: Kernel, ctx: StageContext<SiteEnv>, opts: S1StageOptions, slowOnly: boolean): Attempt {
  const polys = waterPolygons(bodies, reach, { slowOnly, ...(mouth !== undefined ? { mouth } : {}) });
  if (!polys.ok) return { ok: false, code: polys.code, detail: `S1 water polygons: ${polys.detail}`, fast: false };
  const reaches = polys.value.reaches;
  const fast = polys.value.fallbacks.length < reaches.length;
  const sites = siteCrossings(reaches, params.searchBandCm * 0.01, input.existingDecks ?? [], { reach, minSpacingCm: params.minSpacingCm, fordMaxWidthCm: params.fordMaxWidthCm });
  const first = input.water.bridges.length;
  const ids = sites.map((_, i) => bridgeId(first + i));
  let points = 2 * sites.length;
  let rings = 1;
  for (const r of reaches) {
    for (const p of r.parts) {
      for (const q of p.rings) points += q.length;
      rings += p.rings.length;
    }
  }
  const faces = waterFaces(reaches, k, { key: GROUND_KEY, stage: STAGES.S1, workLimit: opts.workLimit ?? l0WorkLimit(points, 2 * rings + 2), sites, bridgeIds: ids, epoch: ctx.epoch });
  if (!faces.ok) return { ok: false, code: faces.code, detail: faces.detail, fast };
  return { ok: true, polys, sites, faces, retried: slowOnly };
}

/** S1's L0 batch (see the header). The terrain record takes its outfalls in place. */
export function runS1(input: S1Input, ctx: StageContext<SiteEnv>, opts: S1StageOptions = {}): KernelResult<S1Output> {
  const k = input.kernel;
  const plat = k.plat(GROUND_KEY);
  const reach = reachOf(plat.frame);
  const params = waterParams(ctx.tables);
  const warnings: Warning[] = [];
  const bodies = input.water.bodies.slice();
  const ring = outerRingBatch(k, input.terrain.id, reach, { key: GROUND_KEY, stage: STAGES.S1, workLimit: opts.workLimit ?? l0WorkLimit(4, 2) });
  if (!ring.ok) return err(ring.code, ring.detail);
  warnings.push(...ring.warnings);
  // the water: the fast rings first; a batch the kernel refuses on them is re-run on the kernel's own polygons (the
  // refused batch wrote nothing), so a ring the fast path's checks passed but the insertion could not keep never
  // decides the outcome (C-0229 (2))
  // A body the kernel refuses on both (its shore not a simple ring once inserted — a tributary meeting its river at a
  // grazing angle) is left out, reported `refused`, and the water re-run without it; the first body (the river) never
  // is: its refusal is the stage's (detect and refuse).
  const refused: DroppedBody[] = [];
  let standing = bodies;
  let mouth = input.mouth;
  let attempt = water(input, standing, mouth, reach, params, k, ctx, opts, false);
  for (let guard = 0; !attempt.ok && attempt.code === 'E_INVARIANT' && guard <= bodies.length + 1; guard += 1) {
    if (attempt.fast) {
      attempt = water(input, standing, mouth, reach, params, k, ctx, opts, true);
      if (attempt.ok || attempt.code !== 'E_INVARIANT') break;
    }
    const named = /\(shore, ([^)]+)\)/.exec(attempt.detail)?.[1];
    if (named !== undefined && named.startsWith('water:estuary:') && mouth !== undefined && mouth !== 'none') {
      // the estuary refused: the river kept whole
      refused.push({ id: named, reason: 'refused' });
      mouth = 'none';
    } else {
      const at = named === undefined ? -1 : standing.findIndex((b) => b.id === named);
      if (at <= 0) break;
      refused.push({ id: standing[at].id, reason: 'refused' });
      standing = standing.filter((_, i) => i !== at);
    }
    attempt = water(input, standing, mouth, reach, params, k, ctx, opts, false);
  }
  if (!attempt.ok) return err(attempt.code, attempt.detail);
  const { polys, sites, faces } = attempt;
  warnings.push(...polys.warnings, ...faces.warnings);
  const reaches = polys.value.reaches;
  const committed = faces;
  const version = plat.version;
  const bridges = committed.value.bridges;
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
  for (const c of committed.value.land) {
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
      land: committed.value.land,
      sites,
      report: {
        dropped: [...refused, ...polys.value.dropped],
        fallbacks: polys.value.fallbacks,
        retried: attempt.retried,
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
 * batch (S1Input — the terrain, the water, the mouth, the façade), checked for its fields (C-0229 (1)).
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
