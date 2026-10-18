// The hydrology raster S1 (3) works on (M0-e-02; §2.3 *The hydrology grid*, *Flats*): the `hydro` grid over the frame
// and its margin at the rung's cell (16 / 25 / 32 m; one coarser step under R12-5's switch), each cell's height the
// height raster's bilinear sample at the cell's centre rounded to the centimetre — so the flood runs on integers — and
// the four arrays the pipeline fills in order: the filled surface (priorityFlood), flatRank (resolveFlats), flowDir
// (d8) and flowAccum (accumulate). Cells are row-major from the south-west corner, row 0 the southernmost (the height
// raster's convention, ../terrain/grid.ts).
//
// D8 codes (§2.3: "D8 ties break in the fixed neighbour order E, NE, N, NW, W, SW, S, SE"): the code IS the order —
// E 0, NE 1, N 2, NW 3, W 4, SW 5, S 6, SE 7 — so a scan of the codes in increasing order meets the neighbours in the
// tie order and the first best wins. A border cell with no lower neighbour inside the grid drains off the grid by its
// outward code (§2.3: flow leaves by the frame edge; C-0173 (2)). NO_FLOW marks a cell the pipeline has not yet
// given a direction; after d8 no land cell carries it.
import { ratio } from '@plat/kernel';
import type { Cm, HydroGrid, PointCm, Terrain } from '@plat/model';
import { heightWriter } from '../terrain/range.js';
import { terrainSampler } from '../terrain/sampler.js';
import { centreX, centreY } from '../terrain/grid.js';

/** The column step of each D8 code (E, NE, N, NW, W, SW, S, SE). */
export const D8_DX: readonly number[] = Object.freeze([1, 1, 0, -1, -1, -1, 0, 1]);
/** The row step of each D8 code (+1 is north). */
export const D8_DY: readonly number[] = Object.freeze([0, 1, 1, 1, 0, -1, -1, -1]);
/** The codes' names in order — the tie order of §2.3. */
export const D8_NAMES: readonly string[] = Object.freeze(['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE']);
/** A cell with no direction yet (never left on a cell after d8). */
export const NO_FLOW = 255;

/**
 * The working hydrology raster: its geometry, the sampled heights (never changed by the pipeline — the flood writes
 * its own array), and the arrays the four steps fill.
 */
export interface HydroField {
  /** The grid's geometry (Terrain.hydro's shape). */
  grid: HydroGrid;
  /** The declared height range the filled surface is written against (the terrain's reliefLimitCm). */
  limitCm: number;
  /** Each cell's height: the height raster's bilinear sample at its centre, rounded to the centimetre (§2.3). */
  heightCm: Int32Array;
  /** priorityFlood's surface: every depression raised to its spill height exactly (length 0 until the flood). */
  filledCm: Int32Array;
  /** resolveFlats' order on each flat; 0 off flats (length 0 until resolveFlats). */
  flatRank: Uint32Array;
  /** d8's direction per cell (length 0 until d8). */
  flowDir: Uint8Array;
  /** accumulate's count of cells draining through each cell, itself included (length 0 until accumulate). */
  flowAccum: Uint32Array;
}

/** A point in arena centimetres. */
export function pointCm(x: number, y: number): PointCm {
  return { x: x as Cm, y: y as Cm };
}

/** The number of cells of a grid. */
export function cellCount(g: HydroGrid): number {
  return g.cols * g.rows;
}

/**
 * 1 ÷ `cols` through `ratio` (§3.2 (8)), the reciprocal `rowOf` multiplies by. File-level: shared by path inside
 * `@plat/site`, not part of the package's API (J263 Q1's convention).
 */
export function invOfCols(cols: number): number {
  const r = ratio(1, cols, 'count');
  if (!r.ok) throw new RangeError(`hydro grid: ${String(cols)} columns`);
  return r.value;
}

/** 1 ÷ cols of grid `g` through `ratio` (§3.2 (8)): `invOfCols(g.cols)`. */
export function invCols(g: HydroGrid): number {
  return invOfCols(g.cols);
}

/**
 * The row of cell `c` in column `i` (`i = c % cols`), `inv` the grid's 1 ÷ cols (`invOfCols`): `Math.round((c − i) ·
 * inv)` — the product of an exact multiple of cols and its reciprocal lies within an ulp of the row, so the rounding is
 * exact (C-0044: no division). The per-cell inner loops of the flood, the flats, the accumulation and the river's
 * surface write the same expression inline (marked `// rowOf`). File-level: shared by path inside `@plat/site`, not
 * part of the package's API (J263 Q1's convention).
 */
export function rowOf(c: number, i: number, inv: number): number {
  return Math.round((c - i) * inv);
}

/** Whether cell (i, j) lies on the grid's border (a seed of the flood, an outlet of the flow). */
export function onBorder(g: HydroGrid, i: number, j: number): boolean {
  return i === 0 || j === 0 || i === g.cols - 1 || j === g.rows - 1;
}

/**
 * The outward D8 code of a border cell: W on the west column, E on the east, S on the south row, N on the north, and
 * the diagonal at a corner (SW, SE, NW, NE); a 1 × n grid's cells take the first that applies in that order. −1 for an
 * interior cell.
 */
export function outwardCode(g: HydroGrid, i: number, j: number): number {
  const w = i === 0;
  const e = i === g.cols - 1;
  const s = j === 0;
  const n = j === g.rows - 1;
  if (s && w) return 5;
  if (s && e) return 7;
  if (n && w) return 3;
  if (n && e) return 1;
  if (w) return 4;
  if (e) return 0;
  if (s) return 6;
  if (n) return 2;
  return -1;
}

/** The D8 code of the step from cell (i, j) to the adjacent cell (i2, j2), or −1 when they are not 8-neighbours. */
export function codeOf(i: number, j: number, i2: number, j2: number): number {
  const dx = i2 - i;
  const dy = j2 - j;
  for (let k = 0; k < 8; k += 1) if (D8_DX[k] === dx && D8_DY[k] === dy) return k;
  return -1;
}

/**
 * The working field of `terrain` on a hydrology grid of `cellCm` over the height raster's extent: every cell's height
 * the TerrainSampler's bilinear height at the cell's centre (rounded to the centimetre, §2.3), written through the
 * range check (../terrain/range.ts, the one door for height rasters in @plat/site).
 */
export function hydroField(terrain: Terrain, grid: HydroGrid): HydroField {
  const n = cellCount(grid);
  const heights = new Int32Array(n);
  const out = heightWriter(heights, terrain.reliefLimitCm);
  // The sampler's slope step is not read here; any positive step builds it.
  const sampler = terrainSampler(terrain, 1);
  for (let j = 0; j < grid.rows; j += 1) {
    const y = centreY(grid, j);
    for (let i = 0; i < grid.cols; i += 1) {
      out.write(j * grid.cols + i, sampler.heightAt(pointCm(centreX(grid, i), y)));
    }
  }
  return {
    grid,
    limitCm: terrain.reliefLimitCm,
    heightCm: heights,
    filledCm: new Int32Array(0),
    flatRank: new Uint32Array(0),
    flowDir: new Uint8Array(0),
    flowAccum: new Uint32Array(0),
  };
}

/** A field over raw heights (tests and hand-built fixtures): the heights are written through the range check. */
export function fieldOf(grid: HydroGrid, heightsCm: ArrayLike<number>, limitCm = 1_000_000): HydroField {
  const n = cellCount(grid);
  if (heightsCm.length !== n) throw new RangeError(`fieldOf: ${String(heightsCm.length)} heights for ${String(n)} cells`);
  const heights = new Int32Array(n);
  const out = heightWriter(heights, limitCm);
  for (let c = 0; c < n; c += 1) out.write(c, heightsCm[c]);
  return { grid, limitCm, heightCm: heights, filledCm: new Int32Array(0), flatRank: new Uint32Array(0), flowDir: new Uint8Array(0), flowAccum: new Uint32Array(0) };
}
