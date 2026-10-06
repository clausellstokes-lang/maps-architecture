// M0-e-03's test support: a hand-built S1 StageContext (C-0123: @plat/site's stages are tested under a hand-built
// context over the kernel's façade, never through @plat/layout's runner), an indexed ground arena with its façade,
// and the river fixtures — S1 (1)'s terrain and S1 (3)'s river, built by M0-e-01's and M0-e-02's code, as the L0 batch
// reads them.
import { attachIndex, createKernel, createPlat, createRng, entityKey, seedKey, STAGES, streamFromKey, type Frame, type Hash128, type Kernel, type Plat } from '@plat/kernel';
import type { Cm, StageContext, Terrain, WaterBody, WaterSet } from '@plat/model';
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

/**
 * §4.2 S1 (5)'s local flow, computed here independently of `siteCrossings`: at the course point nearest `q`, the unit
 * chord from the course point one channel width (its width profile there) upstream to the one a width downstream, both
 * found by walking the course's arc length in floating point. The ± 10° deck tests measure every deck against it, never
 * against the site's own `flow` (M0-e-03 check B-1).
 */
export function flowNear(body: WaterBody, q: { x: number; y: number }): { x: number; y: number } {
  const c = body.course ?? [];
  const w = body.widthProfile ?? new Int32Array();
  let best = 0;
  let bd = Infinity;
  c.forEach((p, i) => {
    const d = Math.hypot(p.x - q.x, p.y - q.y);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  const arcs = [0];
  for (let i = 1; i < c.length; i += 1) arcs.push(arcs[i - 1] + Math.hypot(c[i].x - c[i - 1].x, c[i].y - c[i - 1].y));
  const at = (s: number): { x: number; y: number } => {
    let i = 1;
    while (i < c.length - 1 && arcs[i] < s) i += 1;
    const t = Math.min(1, Math.max(0, (s - arcs[i - 1]) / (arcs[i] - arcs[i - 1])));
    return { x: c[i - 1].x + (c[i].x - c[i - 1].x) * t, y: c[i - 1].y + (c[i].y - c[i - 1].y) * t };
  };
  const a = at(arcs[best] - w[best]);
  const b = at(arcs[best] + w[best]);
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  return { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
}

/** The angle (degrees, 0 – 90) between the segment a→b and the normal of the unit `flow`: 0 for a deck straight across it. */
export function offNormalDeg(a: { x: number; y: number }, b: { x: number; y: number }, flow: { x: number; y: number }): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const along = Math.abs(dx * flow.x + dy * flow.y) / Math.hypot(dx, dy);
  return (Math.asin(Math.min(1, along)) * 180) / Math.PI;
}
