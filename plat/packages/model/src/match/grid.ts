// The routine's grids (item M0-d-05b; §6.3 *The matching routine*). A point grid per (kind, class family) whose cell
// is the kind's hysteresis radius, so every candidate of an old anchor lies in its 3 × 3 cell neighbourhood — the grid
// only gathers candidates; a pair is a candidate by its exact distance (≤ the radius), never by sharing a cell (§6.3:
// "matching is by distance, never by quantised cell"). A box grid over the fresh entities' boxes answers the
// overlap-anchored kinds when no spatial index is handed in, and the covering test of a tombstone's anchor. Lookups
// only: no output reads the order a map holds (every pair is sorted by its key before it is assigned).
import type { Box } from '@plat/kernel';

/** Cell coordinates are offset by 2²⁴ and packed with a stride of 2²⁶, exact in a double. */
const OFFSET = 16_777_216;
const STRIDE = 67_108_864;

/** floor(v ÷ cell) for a whole number v and a whole cell ≥ 1, exactly, without a division (`inv` = 1 / cell). */
function cellIndex(v: number, cell: number, inv: number): number {
  let q = Math.floor(v * inv);
  if (q * cell > v) q -= 1;
  else if ((q + 1) * cell <= v) q += 1;
  return q;
}

const pack = (cx: number, cy: number): number => (cx + OFFSET) * STRIDE + (cy + OFFSET);

/** A uniform grid of points (indices into the caller's arrays). */
export interface PointGrid {
  readonly cell: number;
  readonly inv: number;
  readonly cells: Map<number, number[]>;
}

/** An empty point grid with square cells of `cell` cm (a whole number ≥ 1); `inv` is 1 / cell, taken by the caller. */
export function pointGrid(cell: number, inv: number): PointGrid {
  return { cell, inv, cells: new Map() };
}

/** Enters item `i` at (x, y). */
export function gridAdd(g: PointGrid, i: number, x: number, y: number): void {
  const k = pack(cellIndex(x, g.cell, g.inv), cellIndex(y, g.cell, g.inv));
  const list = g.cells.get(k);
  if (list === undefined) g.cells.set(k, [i]);
  else list.push(i);
}

/** Calls `visit` with every item of the 3 × 3 cells around (x, y). */
export function gridNear(g: PointGrid, x: number, y: number, visit: (i: number) => void): void {
  const cx = cellIndex(x, g.cell, g.inv);
  const cy = cellIndex(y, g.cell, g.inv);
  for (let ix = cx - 1; ix <= cx + 1; ix += 1) {
    for (let iy = cy - 1; iy <= cy + 1; iy += 1) {
      const list = g.cells.get(pack(ix, iy));
      if (list === undefined) continue;
      for (const i of list) visit(i);
    }
  }
}

/** The most cells one box is entered in; a larger box goes to the `large` list, which every query reads. */
const MAX_BOX_CELLS = 64;

/** A uniform grid of boxes (indices into the caller's arrays). */
export interface BoxGrid {
  readonly cell: number;
  readonly inv: number;
  readonly cells: Map<number, number[]>;
  readonly large: number[];
  readonly boxes: Box[];
}

/**
 * A box grid over `boxes` (whole centimetres): its cell the mean of the boxes' larger sides, at least 1 m, so a box
 * meets a few cells; a box meeting more than 64 cells is read by every query instead.
 */
export function boxGrid(boxes: readonly Box[], inv: (cell: number) => number): BoxGrid {
  let sum = 0;
  for (const b of boxes) sum += Math.max(b.maxX - b.minX, b.maxY - b.minY);
  const mean = boxes.length === 0 ? 0 : Math.ceil(sum * inv(boxes.length));
  const cell = Math.max(100, mean);
  const g: BoxGrid = { cell, inv: inv(cell), cells: new Map(), large: [], boxes: [] };
  for (let i = 0; i < boxes.length; i += 1) {
    const b = boxes[i];
    g.boxes.push(b);
    const x0 = cellIndex(b.minX, cell, g.inv);
    const x1 = cellIndex(b.maxX, cell, g.inv);
    const y0 = cellIndex(b.minY, cell, g.inv);
    const y1 = cellIndex(b.maxY, cell, g.inv);
    if ((x1 - x0 + 1) * (y1 - y0 + 1) > MAX_BOX_CELLS) {
      g.large.push(i);
      continue;
    }
    for (let cx = x0; cx <= x1; cx += 1) {
      for (let cy = y0; cy <= y1; cy += 1) {
        const k = pack(cx, cy);
        const list = g.cells.get(k);
        if (list === undefined) g.cells.set(k, [i]);
        else list.push(i);
      }
    }
  }
  return g;
}

const meets = (a: Box, b: Readonly<Box>): boolean => a.minX <= b.maxX && b.minX <= a.maxX && a.minY <= b.maxY && b.minY <= a.maxY;

/** The indices of the boxes meeting the closed box `q`, each once, ascending. */
export function boxQuery(g: BoxGrid, q: Readonly<Box>): number[] {
  const out: number[] = [];
  if (g.boxes.length === 0) return out;
  const x0 = cellIndex(q.minX, g.cell, g.inv);
  const x1 = cellIndex(q.maxX, g.cell, g.inv);
  const y0 = cellIndex(q.minY, g.cell, g.inv);
  const y1 = cellIndex(q.maxY, g.cell, g.inv);
  const seen = new Set<number>();
  if ((x1 - x0 + 1) * (y1 - y0 + 1) > g.boxes.length) {
    // The query meets more cells than the grid holds boxes: read every box once instead.
    for (let i = 0; i < g.boxes.length; i += 1) if (meets(g.boxes[i], q)) out.push(i);
    return out;
  }
  for (let cx = x0; cx <= x1; cx += 1) {
    for (let cy = y0; cy <= y1; cy += 1) {
      const list = g.cells.get(pack(cx, cy));
      if (list === undefined) continue;
      for (const i of list) {
        if (seen.has(i)) continue;
        seen.add(i);
        if (meets(g.boxes[i], q)) out.push(i);
      }
    }
  }
  for (const i of g.large) if (meets(g.boxes[i], q)) out.push(i);
  out.sort((a, b) => a - b);
  return out;
}
