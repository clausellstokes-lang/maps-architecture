// M0-e-03's test support: a hand-built S1 StageContext (C-0123: @plat/site's stages are tested under a hand-built
// context over the kernel's façade, never through @plat/layout's runner), an indexed ground arena with its façade,
// and the river fixtures — S1 (1)'s terrain and S1 (3)'s river, built by M0-e-01's and M0-e-02's code, as the L0 batch
// reads them.
import { attachIndex, createKernel, createPlat, createRng, entityKey, seedKey, STAGES, streamFromKey, type Frame, type Hash128, type Kernel, type Plat } from '@plat/kernel';
import type { Cm, StageContext, Terrain, WaterSet } from '@plat/model';
import { rungProfile, tableView, type BaseRung, type TableView } from '@plat/tables';
import { buildTerrain, GROUND_KEY, siteFrame, terrainParams, TOWN_ROOT, type SiteEnv, type SiteRequest } from '../../src/terrain/index.js';
import { runRivers, type RiverRequest } from '../../src/hydro/index.js';

export const TABLES: TableView = tableView();

/** The index cells per level for a site-sized arena (cm). */
export const INDEX_CELLS: [number, number, number, number, number] = [10_000, 5_000, 2_500, 1_200, 600];

/** The town root's entity key for `seed`. */
export function townKey(seed: number): Hash128 {
  return entityKey(seedKey(seed), [0, 0], { layer: 'ground', part: 0 });
}

/** A hand-built S1 context over `seed` at `rung` (the terrain and hydro items' pattern). */
export function siteContext(seed: number, rung: BaseRung = 'CITY', epoch = 0): StageContext<SiteEnv> {
  const rng = createRng();
  const keys = new Map<number, Hash128>([[TOWN_ROOT, townKey(seed)]]);
  return {
    doc: undefined,
    plats: {},
    tables: TABLES,
    rung: rungProfile(rung),
    report: undefined,
    epoch,
    stream(concern, entity, opts) {
      const k = keys.get(entity);
      if (k === undefined) throw new Error(`no entity key for handle ${String(entity)}`);
      return rng.stream(k, STAGES.S1, concern, opts);
    },
    streamOpts(_concern, _entity, attempt = 0) {
      return { reroll: 0, attempt, epoch, salt: 0 };
    },
  };
}

/** An empty indexed ground arena over `frame` and its façade. */
export function ground(frame: Frame): { plat: Plat; kernel: Kernel } {
  const plat = createPlat(GROUND_KEY, frame, { vertices: 4096, edgePairs: 4096, roleRows: 8192 });
  attachIndex(plat, { gridCellCm: INDEX_CELLS });
  const kernel = createKernel(new Map([[GROUND_KEY, plat]]));
  return { plat, kernel };
}

/** The frame of a size at a rung. */
export function frameOf(size: { areaHa?: number; population?: number } = {}, rung: BaseRung = 'CITY'): Frame {
  const f = siteFrame(size, rungProfile(rung), TABLES);
  if (!f.ok) throw new Error(f.detail);
  return f.value;
}

/** A river fixture: the terrain of `site` (its noise from `seed`) and the water S1 (3) traces on it. */
export interface RiverFixture {
  frame: Frame;
  terrain: Terrain;
  water: WaterSet;
  ctx: StageContext<SiteEnv>;
}

export function riverFixture(seed: number, site: SiteRequest, river: RiverRequest | null, size: { areaHa?: number; population?: number } = {}, rung: BaseRung = 'CITY'): RiverFixture {
  const frame = frameOf(size, rung);
  const t = buildTerrain({ id: 'terrain:ground', key: GROUND_KEY, frame, params: terrainParams(TABLES, rung), epoch: 0 }, site, streamFromKey([seed, 7, 0, 0]));
  if (!t.ok) throw new Error(t.detail);
  const ctx = siteContext(seed, rung);
  const r = runRivers({ size, site: { river } }, t.value, { bodies: [], bridges: [] }, ctx);
  if (!r.ok) throw new Error(r.detail);
  return { frame, terrain: t.value, water: r.value.water, ctx };
}

/** A lattice point. */
export function pt(x: number, y: number): { x: Cm; y: Cm } {
  return { x: x as Cm, y: y as Cm };
}
