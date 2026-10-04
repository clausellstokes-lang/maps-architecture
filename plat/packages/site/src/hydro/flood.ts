// The priority flood (M0-e-02; §4.2 S1 (3): "Sinks are filled by a bucket-queue priority flood on the integer heights
// of the hydrology grid … with exact flat surfaces — a filled depression keeps its spill height, never raised by ε —
// and a depression deeper than the table's lake threshold is typed a lake"; §2.3 *Flats*).
//
// The mechanism is the published Priority-Flood (Barnes, Lehman and Mulla, "Priority-Flood: An optimal
// depression-filling and watershed-labeling algorithm for digital elevation models", Computers & Geosciences 62, 2014):
// the border cells are the seeds; the lowest open cell is taken next and each unvisited 8-neighbour is closed at
// max(its height, the taken cell's level). On integer heights the priority queue is a bucket queue — one bucket per
// centimetre between the lowest and highest height, each a singly linked stack — so the flood is linear in the cell
// count plus the height range, and since a closed cell's level is never below the level being taken, the bucket
// pointer only rises. The order inside a bucket is fixed (last in, first out; neighbours in the D8 code order), so the
// visit order is deterministic; the filled surface itself does not depend on it. Heights are untouched: the surface is
// written into its own array through the range check.
import { heightWriter } from '../terrain/range.js';
import { cellCount, D8_DX, D8_DY, invCols, onBorder, type HydroField } from './field.js';

/** A filled depression: one 8-connected region the flood raised, with its exact spill height. */
export interface Depression {
  /** Its lowest-indexed cell (the region's address in scan order). */
  first: number;
  /** The number of cells raised. */
  cells: number;
  /** The spill height every raised cell now has (cm, exact). */
  spillCm: number;
  /** Spill height less the lowest raised cell's height (cm). */
  depthCm: number;
  /** Its lowest cell (the first such in scan order). */
  lowest: number;
  /** Deeper than the lake threshold (§4.2 S1 (3)): typed a lake. Lakes as water bodies are M1's (§4b, C-0048). */
  lake: boolean;
}

/** What the flood reports beside the filled surface it writes into the field. */
export interface FloodResult {
  /** Every filled depression, in scan order of its first cell. */
  depressions: Depression[];
  /** 1 on the cells of a depression typed a lake, 0 elsewhere. */
  lakeMask: Uint8Array;
  /** The cells the flood took (hydro.cells' charge: every cell once). */
  cells: number;
}

const NONE = 0xffffffff;

/**
 * Fills `grid`'s depressions on its integer heights (§4.2 S1 (3)): writes `grid.filledCm` — every cell's height or,
 * inside a depression, its spill height exactly — and types every depression deeper than `lakeThresholdCm` a lake.
 */
export function priorityFlood(grid: HydroField, lakeThresholdCm = Infinity): FloodResult {
  const g = grid.grid;
  const cols = g.cols;
  const rows = g.rows;
  const n = cellCount(g);
  const h = grid.heightCm;
  if (h.length !== n || n === 0) throw new RangeError('priorityFlood: the heights do not match the grid');
  let lo = h[0];
  let hi = h[0];
  for (let c = 1; c < n; c += 1) {
    const v = h[c];
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  const filled = new Int32Array(n);
  const out = heightWriter(filled, grid.limitCm);
  const head = new Uint32Array(hi - lo + 1).fill(NONE);
  const next = new Uint32Array(n);
  const closed = new Uint8Array(n);
  const inv = invCols(g);
  let taken = 0;
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      if (!onBorder(g, i, j)) continue;
      const c = j * cols + i;
      closed[c] = 1;
      out.write(c, h[c]);
      const b = h[c] - lo;
      next[c] = head[b];
      head[b] = c;
    }
  }
  for (let b = 0; b < head.length; ) {
    const c = head[b];
    if (c === NONE) {
      b += 1;
      continue;
    }
    head[b] = next[c];
    taken += 1;
    const level = b + lo;
    const ci = c % cols;
    const cj = Math.round((c - ci) * inv);
    for (let k = 0; k < 8; k += 1) {
      const i = ci + D8_DX[k];
      const j = cj + D8_DY[k];
      if (i < 0 || j < 0 || i >= cols || j >= rows) continue;
      const m = j * cols + i;
      if (closed[m] === 1) continue;
      closed[m] = 1;
      const f = h[m] > level ? h[m] : level;
      out.write(m, f);
      const fb = f - lo;
      next[m] = head[fb];
      head[fb] = m;
    }
  }
  grid.filledCm = filled;
  const { depressions, lakeMask } = depressionsOf(grid, lakeThresholdCm);
  return { depressions, lakeMask, cells: taken };
}

/**
 * The filled depressions of a flooded field: the 8-connected regions of raised cells (filled above height) sharing one
 * filled level, in scan order, each with its spill height, depth and lake type.
 */
function depressionsOf(grid: HydroField, lakeThresholdCm: number): { depressions: Depression[]; lakeMask: Uint8Array } {
  const g = grid.grid;
  const cols = g.cols;
  const rows = g.rows;
  const n = cellCount(g);
  const h = grid.heightCm;
  const f = grid.filledCm;
  const seen = new Uint8Array(n);
  const lakeMask = new Uint8Array(n);
  const queue = new Uint32Array(n);
  const inv = invCols(g);
  const out: Depression[] = [];
  for (let s = 0; s < n; s += 1) {
    if (seen[s] === 1 || !(f[s] > h[s])) continue;
    const level = f[s];
    let qh = 0;
    let qt = 0;
    queue[qt] = s;
    qt += 1;
    seen[s] = 1;
    let lowest = s;
    while (qh < qt) {
      const c = queue[qh];
      qh += 1;
      if (h[c] < h[lowest]) lowest = c;
      const ci = c % cols;
      const cj = Math.round((c - ci) * inv);
      for (let k = 0; k < 8; k += 1) {
        const i = ci + D8_DX[k];
        const j = cj + D8_DY[k];
        if (i < 0 || j < 0 || i >= cols || j >= rows) continue;
        const m = j * cols + i;
        if (seen[m] === 1 || f[m] !== level || !(f[m] > h[m])) continue;
        seen[m] = 1;
        queue[qt] = m;
        qt += 1;
      }
    }
    const depthCm = level - h[lowest];
    const lake = depthCm > lakeThresholdCm;
    if (lake) for (let q = 0; q < qt; q += 1) lakeMask[queue[q]] = 1;
    out.push({ first: s, cells: qt, spillCm: level, depthCm, lowest, lake });
  }
  return { depressions: out, lakeMask };
}
