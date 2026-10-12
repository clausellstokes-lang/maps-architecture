// M0-e-02's test support: small hydrology grids and fields, hand-built terrains over a frame (the raster written
// directly — test code, outside the package's one-door scan), the hand-built S1 context (C-0123's pattern: @plat/site's
// stages are tested under a hand-built StageContext, never through @plat/layout's runner), the river tests' shared
// trace inputs, and the readers and bars the tests use. The oracles stay the tests' own: `reachOf` states §3.2 (9)'s
// reach, `D8_STEPS` the D8 table `drainPath` follows — never the package's `arenaReach` or `D8_DX`/`D8_DY`.
import { createRng, entityKey, seedKey, STAGES, type Frame, type Hash128 } from '@plat/kernel';
import type { HydroGrid, StageContext, Terrain, WaterBody } from '@plat/model';
import { rungProfile, tableView, type BaseRung, type TableView } from '@plat/tables';
import { expect } from 'vitest';
import { flatTerrain, GROUND_KEY, hydroGridOver, siteFrame, terrainParams, TOWN_ROOT, type SiteEnv } from '../../src/terrain/index.js';
import {
  fieldOf,
  hydroParams,
  hydrology,
  rasterGeom,
  rasterise,
  type HydroField,
  type HydroParams,
  type HydrologyRun,
  type Inlet,
  type RiverBlueprint,
  type TraceOptions,
  type XY,
} from '../../src/hydro/index.js';
import { SMALL } from './fixtures.js';

export const TABLES: TableView = tableView();

/** CITY's hydrology parameters (the river tests' rung). */
export const CITY: HydroParams = hydroParams(TABLES, 'CITY');

/** A hydrology grid of `cols × rows` cells of `cellCm` from (originX, originY). */
export function gridOf(cols: number, rows: number, cellCm = 2500, originX = 0, originY = 0): HydroGrid {
  return { cellCm: cellCm as HydroGrid['cellCm'], cols, rows, originX: originX as HydroGrid['originX'], originY: originY as HydroGrid['originY'] };
}

/** A field over grid `g` whose cell (column i, row j) holds `h(i, j)` cm. */
export function fieldOver(g: HydroGrid, h: (i: number, j: number) => number): HydroField {
  return fieldOf(g, Array.from({ length: g.cols * g.rows }, (_, c) => h(c % g.cols, Math.floor(c / g.cols))));
}

/** A field over a heights function of (column, row) on `gridOf(cols, rows, cellCm)`. */
export function fieldFrom(cols: number, rows: number, h: (i: number, j: number) => number, cellCm = 2500): HydroField {
  return fieldOver(gridOf(cols, rows, cellCm), h);
}

/** The test-side D8 table (E, NE, N, NW, W, SW, S, SE; +1 north): the oracle's own, never `D8_DX`/`D8_DY` from src. */
export const D8_STEPS: { readonly dx: readonly number[]; readonly dy: readonly number[] } = Object.freeze({
  dx: Object.freeze([1, 1, 0, -1, -1, -1, 0, 1]),
  dy: Object.freeze([0, 1, 1, 1, 0, -1, -1, -1]),
});

/** The town root's entity key for `seed`. */
export function townKey(seed: number): Hash128 {
  return entityKey(seedKey(seed), [0, 0], { layer: 'ground', part: 0 });
}

/** A hand-built S1 context over `seed` at `rung` (the terrain item's pattern), recording each stream request. */
export function siteContext(seed: number, rung: BaseRung = 'CITY', epoch = 0): StageContext<SiteEnv> & { requests: { concern: number; entity: number; attempt: number }[] } {
  const rng = createRng();
  const keys = new Map<number, Hash128>([[TOWN_ROOT, townKey(seed)]]);
  const requests: { concern: number; entity: number; attempt: number }[] = [];
  return {
    doc: undefined,
    plats: {},
    tables: TABLES,
    rung: rungProfile(rung),
    report: undefined,
    epoch,
    requests,
    stream(concern, entity, opts) {
      requests.push({ concern, entity, attempt: opts.attempt });
      const k = keys.get(entity);
      if (k === undefined) throw new Error(`no entity key for handle ${String(entity)}`);
      return rng.stream(k, STAGES.S1, concern, opts);
    },
    streamOpts(_concern, _entity, attempt = 0) {
      return { reroll: 0, attempt, epoch, salt: 0 };
    },
  };
}

/** The frame of a blueprint size at `rung`. */
export function frameOf(size: RiverBlueprint['size'], rung: BaseRung = 'CITY'): Frame {
  const f = siteFrame(size, rungProfile(rung), TABLES);
  if (!f.ok) throw new Error(f.detail);
  return f.value;
}

/**
 * A terrain over the frame of `size` at `rung` whose raster holds `heightM(x, y)` (metres, arena cm coordinates) at
 * each cell centre, rounded to the centimetre.
 */
export function terrainFrom(size: RiverBlueprint['size'], heightM: (x: number, y: number) => number, rung: BaseRung = 'CITY'): Terrain {
  const f = frameOf(size, rung);
  const made = flatTerrain({ id: 'terrain:test', key: GROUND_KEY, frame: f, params: terrainParams(TABLES, rung), epoch: 0 }, 0, 0);
  if (!made.ok) throw new Error(made.detail);
  const t = made.value;
  for (let j = 0; j < t.rows; j += 1) {
    const y = t.originY + (j + 0.5) * t.cellCm;
    for (let i = 0; i < t.cols; i += 1) {
      const x = t.originX + (i + 0.5) * t.cellCm;
      t.heightCm[j * t.cols + i] = Math.round(heightM(x, y) * 100);
    }
  }
  return t;
}

/** A copy of a terrain's raster (to compare before and after a carve). */
export function heightsOf(t: Terrain): Int32Array {
  return Int32Array.from(t.heightCm);
}

/** The arena's half-extent of a frame. */
export function reachOf(f: Frame): { x: number; y: number } {
  return { x: Math.ceil(f.widthCm * (0.5 + f.marginShare)), y: Math.ceil(f.heightCm * (0.5 + f.marginShare)) };
}

/** A water body's course as plain points. */
export function courseOf(b: WaterBody): XY[] {
  return (b.course ?? []).map((p) => ({ x: p.x, y: p.y }));
}

/** The hydrology of `terrain` at CITY's cell and lake threshold, on `grid` (default: CITY's grid over its raster). */
export function cityHydrology(terrain: Terrain, grid?: HydroGrid): HydrologyRun {
  return hydrology(terrain, grid ?? hydroGridOver(rasterGeom(terrain), CITY.hydroCellCm), CITY.lakeThresholdCm);
}

/** The inlet at the north edge's middle cell of `grid`, arriving on the arena's north edge above the centre. */
export function northInlet(grid: HydroGrid, reach: { x: number; y: number }): Inlet {
  return { cell: (grid.rows - 1) * grid.cols + (grid.cols >> 1), at: { x: 0, y: reach.y } };
}

/** A trace's options on `terrain` at the rung `params` (CITY), the self-touch clearance given, over SMALL's arena. */
export function traceOpts(terrain: Terrain, clearanceCm: number, params: HydroParams = CITY, reach = reachOf(frameOf(SMALL))): TraceOptions {
  return { terrain, carveMaxCm: params.carveMaxCm, spacingCm: params.controlSpacingCm, clearanceCm, reach };
}

/**
 * The carve bars (§4.2 S1 (3)): no raster cell raised and none lowered past `carveMaxCm` from `before`; the bed under
 * every body's course never rises; and no river's reported deepest cut (`rivers`) passes the cap.
 */
export function carveBars(before: Int32Array, after: Terrain, bodies: readonly WaterBody[], carveMaxCm: number, rivers: readonly { maxCarveCm: number }[] = []): void {
  let deepest = 0;
  for (let c = 0; c < before.length; c += 1) {
    const cut = before[c] - after.heightCm[c];
    expect(cut).toBeGreaterThanOrEqual(0);
    if (cut > deepest) deepest = cut;
  }
  expect(deepest).toBeLessThanOrEqual(carveMaxCm);
  for (const r of rivers) expect(r.maxCarveCm).toBeLessThanOrEqual(carveMaxCm);
  for (const b of bodies) {
    const bed = bedAlong(after, courseOf(b));
    expect(bed.length).toBeGreaterThan(1);
    expect(nonIncreasing(bed)).toBe(true);
  }
}

/** The raster heights under a course, in course order (the bed the carve laid: the loop-erased raster path). */
export function bedAlong(t: Terrain, course: readonly XY[]): number[] {
  const g = { cellCm: t.cellCm, cols: t.cols, rows: t.rows, originX: t.originX, originY: t.originY };
  return rasterise(g, course, true).cells.map((c) => t.heightCm[c]);
}

/** Whether a sequence never rises. */
export function nonIncreasing(v: readonly number[]): boolean {
  for (let k = 1; k < v.length; k += 1) if (v[k] > v[k - 1]) return false;
  return true;
}

/** Follows D8 from cell c to where it leaves the grid; the path, or null on a cycle or a cell with no direction. */
export function drainPath(field: { grid: HydroGrid; flowDir: Uint8Array }, c: number): number[] | null {
  const g = field.grid;
  const path = [c];
  const seen = new Set<number>([c]);
  let cur = c;
  for (;;) {
    const k = field.flowDir[cur];
    if (k > 7) return null;
    const i = (cur % g.cols) + D8_STEPS.dx[k];
    const j = Math.floor(cur / g.cols) + D8_STEPS.dy[k];
    if (i < 0 || j < 0 || i >= g.cols || j >= g.rows) return path;
    cur = j * g.cols + i;
    if (seen.has(cur)) return null;
    seen.add(cur);
    path.push(cur);
  }
}

/** A blueprint with a river request over `size`. */
export function riverBp(size: RiverBlueprint['size'], river: RiverBlueprint['site']['river']): RiverBlueprint {
  return { size, site: { river } };
}
