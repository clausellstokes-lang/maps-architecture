// M0-c-02 hardening round S6 — Q122's S3 class, the enceinte's share, pinned seed by seed (ZERO REFUSALS, J264; C-0454).
// The e-06 site spike's fixtures are the harness's own lawful inputs (M0-e-06; bench/src/site/fixtures.ts, rebuilt here
// from the same parts: RIVER_BLUEPRINT's river from the west on S0's `rolling` relief, or on the 3 000 m hill-acropolis
// site; CITY; the `coarse` configuration R12-5's RiverStrategy with `hydroCoarsen` on). Before the round, e-06 S3's
// 800-run (summaries/M0-e-06.json, groups[].refusals) refused S3 on these seeds:
// * F-WALL E_SELF_INTERSECT "F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later
//   rungs are M1's (§5.2; C-0085)" — 32 relief-60 seeds in each configuration and 4 relief-3000 seeds in each: in every
//   one the boundary as given is a lawful trace and the touches are the pull's own (its offsets along each vertex's
//   normal cross at a sharp bend) — OUR OWN INTERMEDIATE; the trace now re-runs steps (2) – (3) with them undone (the
//   pull untangled, else the boundary unpulled, smoothed kept simple), so every seed commits; on five of the runs (relief-60
//   default 67 and 197, coarse 67, 84 and 149) the ring after the water splice touched itself as well — a graze's cut
//   point kept 1 – 8 cm from the shore vertex it meets, the side between them shorter than the touch — and the re-run
//   takes the ring with such points merged (`mergedNear`, the gates and the crossings' banks kept);
// * E_DEGENERATE `empty` — 25 relief-3000 seeds in each configuration: `layStrips` inserted a two-point setback chain 26 –
//   34 cm long whose ends the insertion's attraction landed on one vertex (§3.6 step 2); such a chain bounds nothing and
//   is no longer laid, so every seed commits.
// Each seed is derived through S1 – S3 on the committed tree (S4 on stubbed). THE COST (named, C-0454): one derivation
// is 15 – 90 s at one worker on this machine (S1's hydrology the most of it); the six cells hold 122 derivations, about
// 60 – 90 minutes at full strength (PLAT_FUZZ_RUNS unset, the item's NEAR); at reduced strength (PLAT_FUZZ_RUNS set,
// RELATED@1000) each cell derives its first seed only.
import { describe, expect, it } from 'vitest';
import { stageText, type Seed } from '@plat/kernel';
import { riverStrategy, type RiverStrategy } from '@plat/site';
import { loadWorkLimits, type BaseRung } from '@plat/tables';
import { baseArena, createRegistry, registerBase, RIVER_BLUEPRINT, run, type BaseBlueprint, type PipelineStage } from '../../src/index.js';
import { hydroCellsLimit } from '../../src/pipeline/base.js';
import { selfTouches } from '../../src/enceinte/plane.js';
import { closedChain, GROUND } from './support.js';

type Fixture = 'relief-60' | 'relief-3000';
type Config = 'default' | 'coarse';

/** The e-06 fixtures' blueprints (bench/src/site/fixtures.ts `riverOn`). */
const BLUEPRINTS: Record<Fixture, BaseBlueprint> = {
  'relief-60': { ...RIVER_BLUEPRINT, site: { relief: 'rolling', river: RIVER_BLUEPRINT.site.river ?? null }, terrain: 'base' } as BaseBlueprint,
  'relief-3000': {
    ...RIVER_BLUEPRINT,
    site: { relief: 'hilly', primitives: [{ kind: 'hill', at: { x: 0, y: 0 }, radiusM: 1200, heightM: 3000 }], river: RIVER_BLUEPRINT.site.river ?? null },
    terrain: 'base',
  } as unknown as BaseBlueprint,
};

/** The before-round refusals, by class and configuration (summaries/M0-e-06.json at e-06 S3's landing). */
const CELLS: readonly { cls: 'F-WALL' | 'E_DEGENERATE'; fixture: Fixture; config: Config; seeds: readonly number[] }[] = [
  { cls: 'F-WALL', fixture: 'relief-60', config: 'default', seeds: [16, 19, 20, 21, 31, 33, 35, 41, 43, 45, 48, 61, 67, 69, 73, 77, 82, 85, 86, 90, 112, 116, 117, 121, 128, 131, 143, 146, 163, 173, 194, 197] },
  { cls: 'F-WALL', fixture: 'relief-60', config: 'coarse', seeds: [16, 19, 20, 21, 33, 35, 41, 44, 45, 48, 62, 67, 69, 73, 76, 82, 84, 85, 86, 90, 112, 116, 117, 121, 128, 131, 143, 146, 149, 153, 163, 194] },
  { cls: 'F-WALL', fixture: 'relief-3000', config: 'default', seeds: [4, 49, 54, 168] },
  { cls: 'F-WALL', fixture: 'relief-3000', config: 'coarse', seeds: [4, 49, 54, 168] },
  { cls: 'E_DEGENERATE', fixture: 'relief-3000', config: 'default', seeds: [6, 7, 10, 12, 13, 23, 25, 38, 50, 58, 60, 69, 78, 91, 100, 127, 138, 158, 165, 166, 179, 180, 189, 194, 199] },
  { cls: 'E_DEGENERATE', fixture: 'relief-3000', config: 'coarse', seeds: [6, 7, 10, 12, 13, 23, 25, 38, 50, 58, 60, 69, 78, 91, 100, 127, 138, 158, 165, 166, 179, 180, 189, 194, 199] },
];

/** Full strength unless PLAT_FUZZ_RUNS is set (RELATED's reduced strength: each cell's first seed). */
const FULL = process.env.PLAT_FUZZ_RUNS === undefined;

/** The fixture at a seed through S3 (later stages stubbed), as the e-06 harness registers it. */
function throughS3(fixture: Fixture, config: Config, seed: number) {
  const registry = createRegistry();
  registerBase(registry);
  const bp0 = BLUEPRINTS[fixture];
  if (config === 'coarse') {
    const wl = loadWorkLimits();
    registry.river.set('coarse', Object.freeze({
      rivers(bp: Parameters<RiverStrategy['rivers']>[0], terrain: Parameters<RiverStrategy['rivers']>[1], water: Parameters<RiverStrategy['rivers']>[2], ctx: Parameters<RiverStrategy['rivers']>[3], k: Parameters<RiverStrategy['rivers']>[4]) {
        return riverStrategy({ hydroCoarsen: true, hydroCellsLimit: hydroCellsLimit(terrain, ctx.tables, (ctx as unknown as { rung: { rung: BaseRung } }).rung.rung, wl) }).rivers(bp, terrain, water, ctx, k);
      },
    } satisfies RiverStrategy));
  }
  const bp: BaseBlueprint = config === 'coarse' ? ({ ...bp0, river: 'coarse' } as BaseBlueprint) : bp0;
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('no base product');
  const order = ['S1', 'S2', 'S3'];
  const kept = product.stages.map((st) => (order.includes(stageText(st.id)) ? st : (Object.freeze({ ...st, run: () => ({ ok: true, value: {}, warnings: [] }) }) as unknown as PipelineStage)));
  product.stages.splice(0, product.stages.length, ...kept);
  return run(registry, { ...bp, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
}

describe('Q122\'s S3 class, the enceinte\'s share: every seed of e-06 S3\'s refusals commits S3 (J264; C-0454)', () => {
  for (const cell of CELLS) {
    describe(`${cell.cls} — ${cell.fixture} ${cell.config} (${String(cell.seeds.length)} seeds)`, () => {
      for (const seed of FULL ? cell.seeds : cell.seeds.slice(0, 1)) {
        it(`seed ${String(seed)}: S3 commits — no bug, the trace one simple closed run, both strips typed`, () => {
          const out = throughS3(cell.fixture, cell.config, seed);
          expect(out.report.bugs).toEqual([]);
          const k = out.model.kernel;
          const wall = closedChain(k.plat(GROUND), { role: 'wall', entity: 'enceinte:1' });
          expect(selfTouches(wall)).toBe(false);
          const v = k.view(GROUND, 1);
          const owners = new Set(v.faces().map((f) => v.owner(f) ?? ''));
          expect(owners.has('wall_strip:1-inner')).toBe(true);
          expect(owners.has('wall_strip:1-outer')).toBe(true);
        }, 600_000);
      }
    });
  }
});
