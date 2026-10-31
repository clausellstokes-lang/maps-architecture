// The site spike's S5 refusals that were the growth stage's own (M0-c-04 hardening round S5; Q122's S5 class, M0-e-06
// S3's seed lists; C-0454): on the river fixture over the 3 000 m hill (M0-e-06's relief-3000 — RIVER_BLUEPRINT's river
// on hilly ground with a 3 000 m hill of 1 200 m radius under the centre) at §12.2's CITY size, seeds 21 and 59 refused
// S5 E_DEGENERATE 'empty' in both configurations: stage 2's S5b spawned (seed 21: re-drew) a destination 13.6 – 14 m from
// an arterial's crossing of the boundary (the slope term outweighs the angular gap on the hill), so the two gates stood
// inside one gate square and the strips between them collapsed. With the gate square (C-0454 (1)) both seeds commit S5
// in both configurations, every spawned gate a gate square from the stage's other gates. Each derivation runs the
// base registration (M0-x-04) through S5 at CITY (S6 and S8 left out): about 1 – 2.5 min each on the cloud machine, so
// the file costs about 4 – 10 min at one worker (the round's named cost). The `coarse` configuration is R12-5's
// switch as the spike registers it: the RiverStrategy with `hydroCoarsen`, its work limit `hydroCellsLimit`'s.
import { stageText, type Cm, type Seed } from '@plat/kernel';
import { riverStrategy, type RiverStrategy } from '@plat/site';
import { loadWorkLimits, tableView } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { baseArena, createRegistry, hydroCellsLimit, registerBase, RIVER_BLUEPRINT, run, type BaseBlueprint, type GrowthState } from '../../../src/index.js';

/** M0-e-06's relief-3000 fixture at CITY: RIVER_BLUEPRINT's river on hilly ground over a 3 000 m hill at the centre. */
const RELIEF_3000: BaseBlueprint = {
  ...RIVER_BLUEPRINT,
  site: { relief: 'hilly', primitives: [{ kind: 'hill', at: { x: 0 as Cm, y: 0 as Cm }, radiusM: 1200, heightM: 3000 }], river: RIVER_BLUEPRINT.site.river ?? null },
  terrain: 'base',
};

/** The spike's `coarse` RiverStrategy (R12-5): `hydroCoarsen` on, the hydrology cells' limit for the run's terrain. */
function coarseRivers(): RiverStrategy {
  const wl = loadWorkLimits();
  return Object.freeze({
    rivers(bp, terrain, water, ctx, k) {
      const limit = hydroCellsLimit(terrain, ctx.tables, ctx.rung.rung as Parameters<typeof hydroCellsLimit>[2], wl);
      return riverStrategy({ hydroCoarsen: true, hydroCellsLimit: limit }).rivers(bp, terrain, water, ctx, k);
    },
  } satisfies RiverStrategy);
}

/** The base registration through S5 (S6 and S8 left out), under the configuration. */
function deriveThroughS5(seed: number, config: 'default' | 'coarse'): { bugs: string[]; growth: GrowthState | undefined } {
  const registry = createRegistry();
  registerBase(registry);
  if (config === 'coarse') registry.river.set('coarse', coarseRivers());
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('site.test: the registry holds no base product');
  const kept = product.stages.filter((s) => ['S1', 'S3', 'S4', 'S5'].includes(stageText(s.id)));
  product.stages.splice(0, product.stages.length, ...kept);
  const bp: BaseBlueprint = config === 'coarse' ? { ...RELIEF_3000, river: 'coarse' } : RELIEF_3000;
  const out = run(registry, { ...bp, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
  return { bugs: out.report.bugs.map((b) => `${b.stage} ${b.cls}`), growth: out.model.data.get('s5.growth') as GrowthState | undefined };
}

/** Each spawned road's destination and every other crossing of its stage's boundary, at least a gate square apart. */
function crowded(growth: GrowthState, square: number): string[] {
  const out: string[] = [];
  for (const st of growth.stages) {
    if (st.k === 1 || !st.walled || st.trace === null) continue;
    for (const r of st.roads) {
      for (const g of st.crossings) {
        const d = Math.hypot(r.pick.at.x - g.at.x, r.pick.at.y - g.at.y);
        if (d < square - 106) out.push(`stage ${String(st.k)}: ${r.way.id}'s destination ${String(Math.round(d))} cm from ${g.way}'s crossing`);
      }
      for (const o of st.roads) {
        if (o === r) continue;
        const d = Math.hypot(r.pick.at.x - o.pick.at.x, r.pick.at.y - o.pick.at.y);
        if (d < square - 106) out.push(`stage ${String(st.k)}: ${r.way.id}'s destination ${String(Math.round(d))} cm from ${o.way.id}'s`);
      }
    }
  }
  return out;
}

/** The gate square from the tables: twice the outer strip (half the wall's thickness, the outer setback and glacis). */
const WALLS = tableView().table('walls');
const SQUARE = 2 * (WALLS.num('era.default', 'thicknessM') / 2 + WALLS.num('era.default', 'outerSetbackGlacisM')) * 100;

describe('the site spike\'s growth-stage S5 refusals commit (relief-3000 at CITY; C-0454 (1))', () => {
  for (const config of ['default', 'coarse'] as const) {
    for (const seed of [21, 59]) {
      it(`relief-3000 ${config} seed ${String(seed)}: S5 commits (was E_DEGENERATE 'empty': two gates 14 m apart), every spawned destination a gate square from the stage's crossings`, { timeout: 900_000 }, () => {
        const d = deriveThroughS5(seed, config);
        expect(d.bugs).toEqual([]);
        expect(d.growth).toBeDefined();
        const growth = d.growth as GrowthState;
        expect(growth.stages.length).toBe(3);
        expect(growth.stages[1].walled).toBe(true);
        expect(growth.stages[1].roads.length).toBeGreaterThan(0);
        expect(crowded(growth, SQUARE)).toEqual([]);
      });
    }
  }
});
