// The site spike's fixtures and derivations for the growth stage's S5 pins (M0-c-04 hardening round S5; Q122's S5
// class, M0-e-06 S3's seed lists; C-0475): M0-e-06's relief-60 and relief-3000 river fixtures at §12.2's CITY size (or
// the site harness's test size), the base registration (M0-x-04) through S5 (S6 and S8 left out), and the promise the
// round's held enclosure keeps on every walled stage k ≥ 2 — every point of the wall standing before the stage inside
// its boundary (C-0475 (2)). The `coarse` configuration is R12-5's switch as the spike registers it: the RiverStrategy
// with `hydroCoarsen`, its work limit `hydroCellsLimit`'s. A CITY derivation costs about 1 – 3.5 min on the cloud
// machine.
import { stageText, type Cm, type Seed } from '@plat/kernel';
import { riverStrategy, type RiverStrategy } from '@plat/site';
import { loadWorkLimits } from '@plat/tables';
import { baseArena, createRegistry, hydroCellsLimit, registerBase, RIVER_BLUEPRINT, run, type BaseBlueprint, type GrowthState } from '../../../src/index.js';

/** M0-e-06's relief-60 fixture at CITY: RIVER_BLUEPRINT's river on S0's rolling relief (amplitude 60 m). */
export const RELIEF_60: BaseBlueprint = {
  ...RIVER_BLUEPRINT,
  site: { relief: 'rolling', river: RIVER_BLUEPRINT.site.river ?? null },
  terrain: 'base',
};

/** M0-e-06's relief-3000 fixture at CITY: RIVER_BLUEPRINT's river on hilly ground over a 3 000 m hill at the centre. */
export const RELIEF_3000: BaseBlueprint = {
  ...RIVER_BLUEPRINT,
  site: { relief: 'hilly', primitives: [{ kind: 'hill', at: { x: 0 as Cm, y: 0 as Cm }, radiusM: 1200, heightM: 3000 }], river: RIVER_BLUEPRINT.site.river ?? null },
  terrain: 'base',
};

/** A fixture at the site harness's test size: M0-x-04's 900 ha frame with 30 ha walled (C-0264 (10); C-0271 (3)). */
export function testSized(bp: BaseBlueprint): BaseBlueprint {
  return { ...bp, size: { ...bp.size, areaHa: 900 }, walledHa: 30 };
}

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

/** The base registration through S5 (S6 and S8 left out), under the configuration: the bugs and S5's growth state. */
export function deriveThroughS5(fixture: BaseBlueprint, seed: number, config: 'default' | 'coarse'): { bugs: string[]; growth: GrowthState | undefined } {
  const registry = createRegistry();
  registerBase(registry);
  if (config === 'coarse') registry.river.set('coarse', coarseRivers());
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('sitefix: the registry holds no base product');
  const kept = product.stages.filter((s) => ['S1', 'S3', 'S4', 'S5'].includes(stageText(s.id)));
  product.stages.splice(0, product.stages.length, ...kept);
  const bp: BaseBlueprint = config === 'coarse' ? { ...fixture, river: 'coarse' } : fixture;
  const out = run(registry, { ...bp, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
  return { bugs: out.report.bugs.map((b) => `${b.stage} ${b.cls}`), growth: out.model.data.get('s5.growth') as GrowthState | undefined };
}

/** Does `q` lie inside `ring` (even-odd)? */
export function insideOf(ring: readonly { x: number; y: number }[], q: { x: number; y: number }): boolean {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) c = !c;
  }
  return c;
}

/**
 * The held enclosure's promise on every walled stage k ≥ 2, as text: every point of the wall standing before the stage
 * inside the stage's boundary (C-0475 (2)).
 */
export function roundBreaks(growth: GrowthState): string[] {
  const out: string[] = [];
  let wall: readonly { x: number; y: number }[] | null = growth.stages[0]?.wall ?? null;
  for (const st of growth.stages) {
    if (st.k >= 2 && st.walled && st.boundary !== null) {
      if (wall !== null) {
        const outline = st.boundary.set.outline;
        const outside = wall.filter((p) => !insideOf(outline, p)).length;
        if (outside > 0) out.push(`stage ${String(st.k)}: ${String(outside)} points of the wall before it outside its boundary`);
      }
    }
    if (st.wall !== null) wall = st.wall;
  }
  return out;
}
