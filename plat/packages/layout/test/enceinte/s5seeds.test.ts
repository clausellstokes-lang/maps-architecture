// M0-c-02 hardening round S6 — Q88 with Q46, F-WALL's part (J637 RL2; C-0454): the wall's share of the S5 refusals,
// seed by seed, each classed by F-WALL's rung (§5.2 F-WALL's Trace ladder: re-offset → union-simplify, M0's (C-0085);
// anchor open ends by attraction onto the nearest barrier edge or enceinte → divert → posterns → cut, M1's).
// * MAKE-IT-SUCCEED (the M0 steps; OUR OWN INTERMEDIATE — the pull's offsets crossing at a sharp bend, or two kept
//   points of the water splice closer than the attraction distance): Q46's `runBase` seeds — RIVER 900 ha / 30 ha walled
//   8 and 14 (S5 E_SELF_INTERSECT before) and 12 (S3 E_INVARIANT "gate:2 not on the committed trace" in N-33's first
//   part; it commits on this tree), RIVER_BLUEPRINT 3 and 4 (S5) and 5 (S3) — the relief-60 site spike's seed 2 (N-33;
//   Q88) and its coarse seed 1 (Q88's seed 1 under R12-5's switch: a graze's two shore points 19 cm apart): each now
//   commits through S5.
// * The later rungs' class (J264 (2), N-64 (4)'s J238 (1) proof in C-0454): the stage-2 boundary as given (M0-c-04's
//   picked boundary) does not keep clear of the core — enceinte:1, or the plaza — so no trace `aroundAll` of it can, and
//   only an open stretch anchored on the previous enceinte (M1: `traceBase`'s `aroundStage`, notBuilt('M1'); §5.2's
//   anchor rung) would: relief-60 default seeds 1 (Q88) and 31, coarse 20, 44 and 67 (31 – 67 reaching S5 since the
//   round's S3 fix), RIVER from the north 900 ha seeds 1 and 6 (KI-10, R-30). Each is
//   refused, typed, the message pinned verbatim (J263 Q6). These seeds are REPORTED to M0-c-04 too (its boundary).
// THE COST: 15 derivations, each through S5 15 s – 7 min at one worker on this machine (relief-60's S1 and S5 the most);
// at reduced strength (PLAT_FUZZ_RUNS set) only the RIVER 900 ha cells run.
import { describe, expect, it } from 'vitest';
import { stageText, STAGES, type KernelResult, type Seed } from '@plat/kernel';
import type { Scope } from '@plat/model';
import { riverStrategy, type RiverStrategy } from '@plat/site';
import { loadWorkLimits, type BaseRung } from '@plat/tables';
import { baseArena, createRegistry, registerBase, RIVER_BLUEPRINT, run, type BaseBlueprint, type ModelView, type PipelineContext, type PipelineStage } from '../../src/index.js';
import { hydroCellsLimit } from '../../src/pipeline/base.js';

const FULL = process.env.PLAT_FUZZ_RUNS === undefined;

const RIVER900: BaseBlueprint = { ...RIVER_BLUEPRINT, size: { ...RIVER_BLUEPRINT.size, areaHa: 900 }, walledHa: 30 } as BaseBlueprint;
const RIVER_N: BaseBlueprint = { ...RIVER900, site: { ...RIVER_BLUEPRINT.site, river: { inflowBearingCdeg: 0, mouth: 'none' } } } as BaseBlueprint;
const RELIEF_60: BaseBlueprint = { ...RIVER_BLUEPRINT, site: { relief: 'rolling', river: RIVER_BLUEPRINT.site.river ?? null }, terrain: 'base' } as BaseBlueprint;

/** The base registered through S5 (later stages dropped) at `seed`, with S5's own refusal (code and detail); `coarse` the
 * e-06 harness's R12-5 configuration (its RiverStrategy with `hydroCoarsen` on). */
function throughS5(bp0: BaseBlueprint, seed: number, coarse = false): ReturnType<typeof run> & { refusal: { code: string; detail: string } | null } {
  const registry = createRegistry();
  registerBase(registry);
  if (coarse) {
    const wl = loadWorkLimits();
    registry.river.set('coarse', Object.freeze({
      rivers(b: Parameters<RiverStrategy['rivers']>[0], terrain: Parameters<RiverStrategy['rivers']>[1], water: Parameters<RiverStrategy['rivers']>[2], ctx: Parameters<RiverStrategy['rivers']>[3], k: Parameters<RiverStrategy['rivers']>[4]) {
        return riverStrategy({ hydroCoarsen: true, hydroCellsLimit: hydroCellsLimit(terrain, ctx.tables, (ctx as unknown as { rung: { rung: BaseRung } }).rung.rung, wl) }).rivers(b, terrain, water, ctx, k);
      },
    } satisfies RiverStrategy));
  }
  const bp: BaseBlueprint = coarse ? ({ ...bp0, river: 'coarse' } as BaseBlueprint) : bp0;
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('no base product');
  let refusal: { code: string; detail: string } | null = null;
  const kept = product.stages
    .filter((s) => (s.id as number) <= (STAGES.S5 as number))
    .map((s) =>
      stageText(s.id) !== 'S5'
        ? s
        : (Object.freeze({
            ...s,
            inputsOf: (model: ModelView, scope: Scope): unknown => s.inputsOf(model, scope),
            run: (input: unknown, ctx: PipelineContext): KernelResult<unknown> => {
              const r = s.run(input, ctx);
              if (!r.ok) refusal = { code: r.code, detail: r.detail };
              return r;
            },
          }) as PipelineStage),
    );
  product.stages.length = 0;
  product.stages.push(...kept);
  const out = run(registry, { ...bp, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
  return { ...out, refusal };
}

const COMMITS: readonly { name: string; bp: BaseBlueprint; seeds: readonly number[]; reduced: boolean; coarse?: boolean }[] = [
  { name: 'RIVER 900 ha / 30 ha walled (Q46: 8, 14 S5 F-WALL; 12 S3 gate:2)', bp: RIVER900, seeds: [8, 12, 14], reduced: true },
  { name: 'RIVER_BLUEPRINT (Q46: 3, 4 S5 F-WALL; 5 S3 F-WALL)', bp: RIVER_BLUEPRINT, seeds: [3, 4, 5], reduced: false },
  { name: 'the relief-60 site spike, default (N-33, Q88: seed 2)', bp: RELIEF_60, seeds: [2], reduced: false },
  { name: 'the relief-60 site spike, coarse (Q88: seed 1; e-06 S5 F-WALL)', bp: RELIEF_60, seeds: [1], reduced: false, coarse: true },
];

const LATER_RUNGS: readonly { name: string; bp: BaseBlueprint; seed: number; detail: string; coarse?: boolean }[] = [
  { name: 'the relief-60 site spike, default, seed 1 (Q88)', bp: RELIEF_60, seed: 1, detail: "F-WALL: the trace touches itself after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)" },
  { name: 'the relief-60 site spike, default, seed 31 (S3 F-WALL before the round, e-06 S3; S5 now)', bp: RELIEF_60, seed: 31, detail: "F-WALL: the trace crosses the core after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)" },
  { name: 'the relief-60 site spike, coarse, seed 20 (S3 F-WALL before the round; S5 now)', bp: RELIEF_60, seed: 20, detail: "F-WALL: the trace touches itself after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)", coarse: true },
  { name: 'the relief-60 site spike, coarse, seed 44 (S3 F-WALL before the round; S5 now)', bp: RELIEF_60, seed: 44, detail: "F-WALL: the trace touches itself after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)", coarse: true },
  { name: 'the relief-60 site spike, coarse, seed 67 (S3 F-WALL before the round; S5 now)', bp: RELIEF_60, seed: 67, detail: "F-WALL: the trace crosses the core after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)", coarse: true },
  { name: 'RIVER from the north 900 ha, seed 1 (KI-10; R-30)', bp: RIVER_N, seed: 1, detail: "F-WALL: the trace crosses the core after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)" },
  { name: 'RIVER from the north 900 ha, seed 6 (KI-10; R-30)', bp: RIVER_N, seed: 6, detail: "F-WALL: the trace touches itself after the re-offset and union-simplify rungs on the pulled line, the pull untangled and the boundary as given; the later rungs are notBuilt('M1') (§5.2; C-0085)" },
];

describe('F-WALL\'s M0 steps: the S5 sources that commit (Q46, N-33; C-0454)', () => {
  for (const cell of COMMITS) {
    if (!FULL && !cell.reduced) continue;
    for (const seed of cell.seeds) {
      it(`${cell.name} — seed ${String(seed)}: S1 – S5 commit, no bug`, () => {
        const out = throughS5(cell.bp, seed, cell.coarse === true);
        expect(out.refusal).toBeNull();
        expect(out.report.bugs).toEqual([]);
        const v = out.model.kernel.view({ layer: 'ground', part: 0 }, 1);
        const owners = new Set(v.faces().map((f) => v.owner(f) ?? ''));
        for (const o of ['wall_strip:1-inner', 'wall_strip:1-outer']) expect(owners.has(o), o).toBe(true);
      }, 900_000);
    }
  }
});

describe('F-WALL\'s later rungs (M1): the stage-2 boundary as given meets the core — refused, typed, verbatim (RL2; J263 Q6; C-0454)', () => {
  for (const cell of FULL ? LATER_RUNGS : []) {
    it(`${cell.name}: S5 refused E_SELF_INTERSECT, the message naming notBuilt('M1')`, () => {
      const out = throughS5(cell.bp, cell.seed, cell.coarse === true);
      expect(out.refusal).toEqual({ code: 'E_SELF_INTERSECT', detail: cell.detail });
    }, 900_000);
  }
});
