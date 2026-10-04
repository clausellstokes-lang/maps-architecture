// M0-e-01's test support: the tables' view, a rung's terrain cells, a hand-built StageContext for S1 (C-0123's pattern:
// @plat/site's stages are tested under a hand-built context, never through @plat/layout's runner), and raw builders.
import { CONCERNS, createRng, entityKey, frameOf, seedKey, STAGES, streamFromKey, type Frame, type Hash128, type Stream } from '@plat/kernel';
import type { PointCm, StageContext, Terrain } from '@plat/model';
import { rungProfile, tableView, type BaseRung, type TableView } from '@plat/tables';
import { buildTerrain, GROUND_KEY, terrainParams, TOWN_ROOT, type SiteEnv, type SiteRequest, type TerrainParams } from '../../src/terrain/index.js';

export const TABLES: TableView = tableView();

/** A point in arena centimetres. */
export function pt(x: number, y: number): PointCm {
  return { x, y } as PointCm;
}

export function paramsOf(rung: BaseRung = 'CITY'): TerrainParams {
  return terrainParams(TABLES, rung);
}

/** A frame of `areaKm2` at `aspect` with the base law's 30 % margin. */
export function frame(areaKm2: number, aspect = 1, marginShare = 0.3): Frame {
  const f = frameOf(areaKm2 * 1_000_000, aspect, marginShare);
  if (!f.ok) throw new Error(f.detail);
  return f.value;
}

/** The town root's entity key for `seed` (a fixed lineage stands in for §6.3's town lineage, M0-d-05a's). */
export function townKey(seed: number): Hash128 {
  return entityKey(seedKey(seed), [0, 0], { layer: 'ground', part: 0 });
}

/** S1's `terrain.noise` stream for `seed`, as the context gives it. */
export function noiseFor(seed: number): Stream {
  return createRng().stream(townKey(seed), STAGES.S1, CONCERNS['terrain.noise'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
}

/** A hand-built S1 context over `seed` at `rung`: one derivation's Rng, the town root's key cached for TOWN_ROOT. */
export function siteContext(seed: number, rung: BaseRung = 'CITY', epoch = 0): StageContext<SiteEnv> & { requests: { concern: number; entity: number }[] } {
  const rng = createRng();
  const keys = new Map<number, Hash128>([[TOWN_ROOT, townKey(seed)]]);
  const requests: { concern: number; entity: number }[] = [];
  return {
    doc: undefined,
    plats: {},
    tables: TABLES,
    rung: rungProfile(rung),
    report: undefined,
    epoch,
    requests,
    stream(concern, entity, opts) {
      requests.push({ concern, entity });
      const k = keys.get(entity);
      if (k === undefined) throw new Error(`no entity key for handle ${String(entity)}`);
      return rng.stream(k, STAGES.S1, concern, opts);
    },
    streamOpts(_concern, _entity, attempt = 0) {
      return { reroll: 0, attempt, epoch, salt: 0 };
    },
  };
}

/** buildTerrain over a frame with a fresh stream from `key`, unwrapped. */
export function terrainOf(f: Frame, request: SiteRequest, params: TerrainParams = paramsOf(), key: readonly number[] = [1, 2, 3, 4]): { terrain: Terrain; warnings: { code: string; count: number }[] } {
  const r = buildTerrain({ id: 'terrain:test', key: GROUND_KEY, frame: f, params, epoch: 0 }, request, streamFromKey(key));
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
  return { terrain: r.value, warnings: r.warnings };
}

/** The raster's minimum and maximum. */
export function extremes(h: Int32Array): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (const v of h) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return { min, max };
}
