// The terrain's raster geometry (M0-e-01; §2.3 *The rasters*, §3.2 (9)): the height raster over the frame and its
// context margin, and the grids laid over the same extent (the hydrology grid S1 (3) fills, the resource grid).
//
// Arena coordinates are centimetres about the frame's centre, +y north (§3.2 (9)). The arena reaches ⌈w · (½ + m)⌉
// either side of the centre across and ⌈h · (½ + m)⌉ along (w × h the frame, m its margin share — frameOf's own
// reach). The height raster takes cols = ⌈2 · reachX ÷ cell⌉ by rows = ⌈2 · reachY ÷ cell⌉ cells centred on (0, 0),
// its south-west corner (originX, originY) = (−⌊cols · cell ÷ 2⌋, −⌊rows · cell ÷ 2⌋): it covers the arena, by less
// than one cell more on each axis. Cells are row-major from that corner (row 0 the southernmost); a cell's value
// stands at its centre (C-0165 (3)). Every other grid of this section shares the corner and covers the same extent, and
// has one arithmetic for a cell's centre and row (`origin + (i + ½) · cell`; the row `Math.round((c − i) · (1 ÷ cols))`,
// C-0044), read through `centreX`, `centreY`, `cellCentre` (and hydro's `rowOf` for a row alone) — except where a
// reader spells the same expression out on purpose: the hydrology's per-cell inner loops (flood, flats, D8, the river's
// surface) write the row inline, marked `// rowOf`, and the river's inlet search one axis's centre (hydro/strategy.ts).
import { ratio, type Frame } from '@plat/kernel';
import type { HydroGrid, Terrain } from '@plat/model';

/** A grid of square cells: `cols × rows` cells of `cellCm` from the south-west corner (originX, originY). */
export interface CellGrid {
  cellCm: number;
  cols: number;
  rows: number;
  originX: number;
  originY: number;
}

/** The arena's half-extent about the frame's centre: the frame plus its margin on every side (§3.2 (9)). */
export function arenaReach(frame: Frame): { x: number; y: number } {
  const reach = 0.5 + frame.marginShare;
  return { x: Math.ceil(frame.widthCm * reach), y: Math.ceil(frame.heightCm * reach) };
}

/**
 * The height raster's own grid: a terrain record's five grid fields (§2.3), in `CellGrid`'s order. File-level: shared
 * by path inside `@plat/site`, not part of the package's API (J263 Q1's convention).
 */
export function rasterGrid(t: Terrain): CellGrid {
  return { cellCm: t.cellCm, cols: t.cols, rows: t.rows, originX: t.originX, originY: t.originY };
}

/** ⌈a ÷ b⌉ for positive integers below 2²⁴ — the double quotient is correctly rounded, so the ceiling is exact. */
function ceilDiv(a: number, b: number): number {
  const q = ratio(a, b, 'length');
  if (!q.ok) throw new RangeError(`terrain grid: a cell of ${String(b)} cm`);
  return Math.ceil(q.value);
}

/** The height raster's grid for `frame` at `cellCm` (an integer ≥ 1): see the header. */
export function heightGrid(frame: Frame, cellCm: number): CellGrid {
  if (!(Number.isInteger(cellCm) && cellCm >= 1)) throw new RangeError(`heightGrid: cell ${String(cellCm)} cm`);
  const r = arenaReach(frame);
  const cols = Math.max(1, ceilDiv(2 * r.x, cellCm));
  const rows = Math.max(1, ceilDiv(2 * r.y, cellCm));
  return { cellCm, cols, rows, originX: -Math.floor((cols * cellCm) / 2), originY: -Math.floor((rows * cellCm) / 2) };
}

/**
 * The grid of `cellCm` cells laid over `extent`'s whole extent from its south-west corner (§2.3: "the same extent"):
 * the least cols × rows that cover it. The hydrology grid's geometry (S1 (3)) and the resource grid's.
 */
export function coveringGrid(extent: CellGrid, cellCm: number): CellGrid {
  if (!(Number.isInteger(cellCm) && cellCm >= 1)) throw new RangeError(`coveringGrid: cell ${String(cellCm)} cm`);
  return {
    cellCm,
    cols: ceilDiv(extent.cols * extent.cellCm, cellCm),
    rows: ceilDiv(extent.rows * extent.cellCm, cellCm),
    originX: extent.originX,
    originY: extent.originY,
  };
}

/** A HydroGrid's geometry over the height raster's extent at `cellCm` (§2.3's `hydro`). */
export function hydroGridOver(extent: CellGrid, cellCm: number): HydroGrid {
  const g = coveringGrid(extent, cellCm);
  return { cellCm: g.cellCm as HydroGrid['cellCm'], cols: g.cols, rows: g.rows, originX: g.originX as HydroGrid['originX'], originY: g.originY as HydroGrid['originY'] };
}

/** The x of column i's centre. */
export function centreX(g: CellGrid, i: number): number {
  return g.originX + (i + 0.5) * g.cellCm;
}

/** The y of row j's centre. */
export function centreY(g: CellGrid, j: number): number {
  return g.originY + (j + 0.5) * g.cellCm;
}

/**
 * The centre of cell `c` (row-major from the south-west corner), `invCols` the caller's 1 ÷ `g.cols`: column `c % cols`,
 * row `Math.round((c − i) · invCols)` — the product of an exact multiple of cols and its reciprocal lies within an ulp of
 * the row, so the rounding is exact (C-0044: no division) — then `centreX`, `centreY`. File-level: shared by path inside
 * `@plat/site`, not part of the package's API (J263 Q1's convention).
 */
export function cellCentre(g: CellGrid, c: number, invCols: number): { x: number; y: number } {
  const i = c % g.cols;
  const j = Math.round((c - i) * invCols);
  return { x: centreX(g, i), y: centreY(g, j) };
}
