// The dynamic uniform grid (§3.3 *Spatial indexes* (b); SCL-2, J-K6): one per level, over the items a batch adds since
// the last static build, with O(1) insert and delete. Its cell per level is the base settings row's `index.gridCellM`
// (the caller reads the table and hands the index the cell in centimetres: the kernel imports no table, §14). An
// item is entered in every cell its box meets; an item whose box meets more than `MAX_ITEM_CELLS` cells is held in the
// level's `large` set instead, which every query of the level reads — so an insert or delete costs at most that many
// set operations whatever the item's size. M0-a-03. Lookups only: no output reads the order a map or set holds (every
// query result is sorted by its canonical key, §3.3).
import { ratio } from '../num/index.js';
import { boxesMeet, check, type Box } from './items.js';

/** The most cells one grid item is entered in; a larger item goes to the level's `large` set. */
export const MAX_ITEM_CELLS = 64;

/** Cell coordinates are offset by 2²⁴ and packed with a stride of 2²⁵, exact in a double for every frame (§3.2 (1)). */
const CELL_OFFSET = 16_777_216;
const CELL_STRIDE = 33_554_432;

/** One item in a grid: its key, the static partition it will join at the next rebuild, its box and its cells. */
export interface GridEntry {
  readonly key: number;
  readonly partition: number;
  readonly box: Box;
  /** The packed cells it is entered in; null when it is in the `large` set. */
  readonly cells: readonly number[] | null;
}

/** §2.2's `UniformGrid`: kernel-internal. */
export interface UniformGrid {
  /** The cell's side in centimetres. */
  readonly cellCm: number;
  /** 1 ÷ cellCm, taken once through ratio() (§3.2 (8)). */
  readonly inv: number;
  readonly cells: Map<number, Set<number>>;
  readonly large: Set<number>;
  readonly entries: Map<number, GridEntry>;
}

/** An empty grid with square cells of `cellCm` centimetres (an integer ≥ 1). */
export function createGrid(cellCm: number): UniformGrid {
  check(Number.isInteger(cellCm) && cellCm >= 1 && cellCm <= CELL_OFFSET, 'a grid cell is a whole number of centimetres, 1 … 2²⁴');
  const inv = ratio(1, cellCm, 'length');
  check(inv.ok, 'a grid cell of at least 1 cm');
  return { cellCm, inv: inv.value, cells: new Map(), large: new Set(), entries: new Map() };
}

function cellOf(g: UniformGrid, v: number): number {
  return Math.floor(v * g.inv);
}

/** The packed cells a box meets, or null when they are more than `limit`. */
function cellsOf(g: UniformGrid, box: Box, limit: number): number[] | null {
  const x0 = cellOf(g, box.minX);
  const x1 = cellOf(g, box.maxX);
  const y0 = cellOf(g, box.minY);
  const y1 = cellOf(g, box.maxY);
  if ((x1 - x0 + 1) * (y1 - y0 + 1) > limit) return null;
  const out: number[] = [];
  for (let cx = x0; cx <= x1; cx++) {
    for (let cy = y0; cy <= y1; cy++) out.push((cx + CELL_OFFSET) * CELL_STRIDE + (cy + CELL_OFFSET));
  }
  return out;
}

/** Removes the entry with `key`, returning it (undefined when the grid holds none). */
export function gridTake(g: UniformGrid, key: number): GridEntry | undefined {
  const e = g.entries.get(key);
  if (e === undefined) return undefined;
  g.entries.delete(key);
  if (e.cells === null) g.large.delete(key);
  else {
    for (const c of e.cells) {
      const s = g.cells.get(c);
      if (s === undefined) continue;
      s.delete(key);
      if (s.size === 0) g.cells.delete(c);
    }
  }
  return e;
}

/** Enters an item (replacing any entry with its key); returns the entry it replaced, if any. */
export function gridPut(g: UniformGrid, key: number, partition: number, box: Box): GridEntry | undefined {
  const old = gridTake(g, key);
  const cells = cellsOf(g, box, MAX_ITEM_CELLS);
  const e: GridEntry = { key, partition, box: { minX: box.minX, minY: box.minY, maxX: box.maxX, maxY: box.maxY }, cells };
  g.entries.set(key, e);
  if (cells === null) g.large.add(key);
  else {
    for (const c of cells) {
      let s = g.cells.get(c);
      if (s === undefined) {
        s = new Set();
        g.cells.set(c, s);
      }
      s.add(key);
    }
  }
  return old;
}

/** The keys of the entries whose boxes meet `box` (closed), each once, in no particular order. */
export function gridCandidates(g: UniformGrid, box: Box): number[] {
  const out: number[] = [];
  if (g.entries.size === 0) return out;
  const cells = cellsOf(g, box, g.entries.size);
  if (cells === null) {
    // The box meets more cells than the grid holds items: read every entry once instead.
    for (const e of g.entries.values()) if (boxesMeet(e.box, box)) out.push(e.key);
    return out;
  }
  const seen = new Set<number>();
  for (const c of cells) {
    const s = g.cells.get(c);
    if (s === undefined) continue;
    for (const k of s) {
      if (seen.has(k)) continue;
      seen.add(k);
      const e = g.entries.get(k);
      if (e !== undefined && boxesMeet(e.box, box)) out.push(k);
    }
  }
  for (const k of g.large) {
    const e = g.entries.get(k);
    if (e !== undefined && boxesMeet(e.box, box)) out.push(k);
  }
  return out;
}
