// D8 and accumulation (M0-e-02; §2.3 *Flats*, §4.2 S1 (3)): the flow direction of every cell of the hydrology grid on
// the filled surface, flats included through flatRank, with the fixed tie order E, NE, N, NW, W, SW, S, SE; the flow
// accumulation (each cell counts itself and every cell draining through it); and the corridor step after a carve —
// "D8 is recomputed on the carved corridor cells and their neighbours and accumulation once" (§4.2 S1 (3)).
//
// Steepest descent: among the strictly lower 8-neighbours the one of the steepest slope, drop ÷ distance with the
// diagonal √2 times the orthogonal; compared exactly on integers as drop² × 2 (orthogonal) against drop² (diagonal).
// A border cell with no lower neighbour inside the grid drains off the grid by its outward code. A flat cell (interior,
// nothing lower) drains to its equal-height neighbour of lowest flatRank (a low edge's rank is 0), which resolveFlats
// guarantees lower than its own. Ties anywhere: the first in code order.
import { heightWriter } from '../terrain/range.js';
import { cellCount, codeOf, D8_DX, D8_DY, invCols, NO_FLOW, onBorder, outwardCode, rowOf, type HydroField } from './field.js';

/**
 * The squared-slope key of a drop by D8 code k: drop² × 2 for an orthogonal step, drop² for a diagonal one — drop ÷
 * distance compared exactly on integers (the header's steepest descent). File-level: shared by path inside
 * `@plat/site` (the river's descent, ./trace.ts), not part of the package's API (J263 Q1's convention).
 */
export function slopeKey(drop: number, k: number): number {
  const d2 = drop * drop;
  return (k & 1) === 0 ? d2 * 2 : d2;
}

/**
 * The D8 code of cell (i, j) on the filled surface `f` with ranks `rank`: steepest descent, else (border) outward, else
 * (flat) the equal-height neighbour of lowest rank below its own; NO_FLOW when none exists (never on a resolved field).
 */
export function flowCode(grid: HydroField, f: Int32Array, rank: Uint32Array, i: number, j: number): number {
  const g = grid.grid;
  const cols = g.cols;
  const rows = g.rows;
  const c = j * cols + i;
  const steep = steepest(f, cols, rows, c, i, j);
  if (steep >= 0) return steep;
  if (onBorder(g, i, j)) return outwardCode(g, i, j);
  const v = f[c];
  const own = rank[c];
  let best = -1;
  let bestRank = own;
  for (let k = 0; k < 8; k += 1) {
    const x = i + D8_DX[k];
    const y = j + D8_DY[k];
    if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
    const m = y * cols + x;
    if (f[m] !== v) continue;
    if (rank[m] < bestRank) {
      bestRank = rank[m];
      best = k;
    }
  }
  return best >= 0 ? best : NO_FLOW;
}

/** What d8 reports: the cells left without a direction (0 on every resolved field — §13.1's 100 %). */
export interface D8Result {
  cells: number;
  undefinedCells: number;
}

/** D8 flow direction of every cell of `grid` (priorityFlood and resolveFlats first) into `grid.flowDir`. */
export function d8(grid: HydroField): D8Result {
  const g = grid.grid;
  const n = cellCount(g);
  const f = grid.filledCm;
  const rank = grid.flatRank;
  if (f.length !== n || rank.length !== n) throw new RangeError('d8: the field is not flooded and resolved (priorityFlood, resolveFlats first)');
  const dir = new Uint8Array(n);
  let undefinedCells = 0;
  for (let j = 0; j < g.rows; j += 1) {
    for (let i = 0; i < g.cols; i += 1) {
      const k = flowCode(grid, f, rank, i, j);
      dir[j * g.cols + i] = k;
      if (k === NO_FLOW) undefinedCells += 1;
    }
  }
  grid.flowDir = dir;
  return { cells: n, undefinedCells };
}

/** The cell cell c drains into, or −1 when it drains off the grid (or has no direction). */
export function downstream(grid: HydroField, c: number, i: number, j: number): number {
  const k = grid.flowDir[c];
  if (k === NO_FLOW) return -1;
  const x = i + D8_DX[k];
  const y = j + D8_DY[k];
  if (x < 0 || y < 0 || x >= grid.grid.cols || y >= grid.grid.rows) return -1;
  return y * grid.grid.cols + x;
}

/**
 * Flow accumulation (§2.3 `flowAccum`) into `grid.flowAccum`: each cell counts itself and every cell draining through
 * it, in cells. Kahn's order over the drainage graph from the cells nothing drains into, in index order. Refuses (throws)
 * a field whose directions hold a cycle — which d8 never makes — naming the cells left over.
 */
export function accumulate(grid: HydroField): { cells: number } {
  const g = grid.grid;
  const cols = g.cols;
  const n = cellCount(g);
  if (grid.flowDir.length !== n) throw new RangeError('accumulate: the field has no directions (d8 first)');
  const inv = invCols(g);
  // In-degree: how many cells drain into each cell still to be counted.
  const into = new Uint32Array(n);
  const target = new Float64Array(n);
  for (let c = 0; c < n; c += 1) {
    const i = c % cols;
    const t = downstream(grid, c, i, Math.round((c - i) * inv)); // rowOf
    target[c] = t;
    if (t >= 0) into[t] += 1;
  }
  const acc = new Uint32Array(n).fill(1);
  const queue = new Uint32Array(n);
  let qt = 0;
  for (let c = 0; c < n; c += 1) {
    if (into[c] === 0) {
      queue[qt] = c;
      qt += 1;
    }
  }
  let qh = 0;
  while (qh < qt) {
    const c = queue[qh];
    qh += 1;
    const t = target[c];
    if (t < 0) continue;
    acc[t] += acc[c];
    into[t] -= 1;
    if (into[t] === 0) {
      queue[qt] = t;
      qt += 1;
    }
  }
  if (qt !== n) throw new Error(`accumulate: ${String(n - qt)} cells lie on a drainage cycle`);
  grid.flowAccum = acc;
  return { cells: n };
}

/**
 * One corridor of a carved course on the hydrology grid: its cells in course order (8-adjacent, each once), the
 * filled-surface height each takes (non-increasing: the carved bed), and where its last cell drains — off the grid
 * (`exit: -1`, by the last cell's outward code) or into another corridor's cell (a tributary's confluence).
 */
export interface Corridor {
  cells: readonly number[];
  bedCm: readonly number[];
  exit: number;
}

/**
 * The corridor step (§4.2 S1 (3)): after the carve, each corridor cell takes its bed height on the filled surface and
 * drains to the next corridor cell (the last off the grid or into its confluence), its flatRank 0; then every other
 * cell beside a corridor recomputes its D8 by steepest descent on the updated surface where a strictly lower neighbour
 * now exists (its rank 0), and keeps its direction otherwise. Accumulation is left to one `accumulate` after every
 * corridor is set. Corridors drain downstream and nothing drains out of one, so the field stays acyclic and every cell
 * keeps a direction.
 */
export function recomputeCorridors(grid: HydroField, corridors: readonly Corridor[]): { corridorCells: number; neighbours: number } {
  const g = grid.grid;
  const cols = g.cols;
  const rows = g.rows;
  const n = cellCount(g);
  const inv = invCols(g);
  const inCorridor = new Uint8Array(n);
  // The filled surface is a height raster: the corridor beds are written into it through the range check.
  const f = grid.filledCm;
  const lowered = new Map<number, number>();
  for (const cor of corridors) {
    if (cor.cells.length !== cor.bedCm.length) throw new RangeError('recomputeCorridors: one bed per corridor cell');
    for (let q = 0; q < cor.cells.length; q += 1) {
      const c = cor.cells[q];
      inCorridor[c] = 1;
      const b = cor.bedCm[q];
      lowered.set(c, b < f[c] ? b : f[c]);
    }
  }
  const surface = grid.filledCm;
  const writer = heightWriter(surface, grid.limitCm);
  for (const [c, b] of lowered) writer.write(c, b);
  let corridorCells = 0;
  for (const cor of corridors) {
    const cs = cor.cells;
    for (let q = 0; q < cs.length; q += 1) {
      const c = cs[q];
      const ci = c % cols;
      const cj = rowOf(c, ci, inv);
      let code: number;
      if (q + 1 < cs.length) {
        const m = cs[q + 1];
        const mi = m % cols;
        code = codeOf(ci, cj, mi, rowOf(m, mi, inv));
      } else if (cor.exit >= 0) {
        const mi = cor.exit % cols;
        code = codeOf(ci, cj, mi, rowOf(cor.exit, mi, inv));
      } else {
        code = outwardCode(g, ci, cj);
      }
      if (code < 0) throw new RangeError(`recomputeCorridors: corridor cell ${String(c)} does not step to an 8-neighbour`);
      grid.flowDir[c] = code;
      grid.flatRank[c] = 0;
      corridorCells += 1;
    }
  }
  let neighbours = 0;
  const done = new Uint8Array(n);
  for (const cor of corridors) {
    for (const c of cor.cells) {
      const ci = c % cols;
      const cj = rowOf(c, ci, inv);
      for (let k = 0; k < 8; k += 1) {
        const x = ci + D8_DX[k];
        const y = cj + D8_DY[k];
        if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
        const m = y * cols + x;
        if (inCorridor[m] === 1 || done[m] === 1) continue;
        done[m] = 1;
        neighbours += 1;
        const best = steepest(surface, cols, rows, m, x, y);
        if (best >= 0) {
          grid.flowDir[m] = best;
          grid.flatRank[m] = 0;
        }
      }
    }
  }
  return { corridorCells, neighbours };
}

/**
 * The steepest strictly-lower neighbour's code of cell c at (i, j) on surface `f`, or −1: the largest `slopeKey`, the
 * first in code order on a tie (strict `>`) — `flowCode`'s first phase and the corridor neighbours' re-pointing.
 */
function steepest(f: Int32Array, cols: number, rows: number, c: number, i: number, j: number): number {
  const v = f[c];
  let best = -1;
  let bestKey = 0;
  for (let k = 0; k < 8; k += 1) {
    const x = i + D8_DX[k];
    const y = j + D8_DY[k];
    if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
    const drop = v - f[y * cols + x];
    if (drop <= 0) continue;
    const key = slopeKey(drop, k);
    if (key > bestKey) {
      bestKey = key;
      best = k;
    }
  }
  return best;
}
