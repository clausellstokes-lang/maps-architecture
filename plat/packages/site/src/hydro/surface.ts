// The river's descent surface (M0-e-02 fix round 1; §4.2 S1 (3): "the course is traced by steepest descent … and the
// terrain is carved to the course … carving is capped at carveMaxCm and a course that would need more is re-routed by
// F-RIVER (§5.2), never trenched"; C-0173 (3), refined by C-0175 (1) – (3)).
//
// A river arriving by its upstream edge descends its OWN flooded surface, not the hydrology's: the hydrology's flood
// (./flood.ts, Terrain.flowDir) drains every cell to the nearest border, the river's upstream edge included, so near
// that edge its D8 runs straight back out of the arena (the course then crawls along its own closed edge and folds).
// The river's surface is the same bucket-queue Priority-Flood (Barnes, Lehman and Mulla 2014) on the hydrology grid's
// integer heights with three differences:
//   * its outlets (the seeds) are the open border cells — every border cell but those of the river's upstream edge —
//     and, for a tributary, the cells of the river it joins;
//   * its walls are never entered: the upstream edge's cells and the cells a re-trace closes;
//   * a cell is admitted only at a level within the surface's cap of its own height (SURFACE_CAP_SHARE of carveMaxCm):
//     a cell the flood could reach only at a higher level lies so deep below its spill that a bed through it would cut
//     deeper than the cap — it is left out, and the surface routes around it. Since popped levels never fall, a cell
//     refused once is refused for good.
// Each admitted cell keeps the cell that admitted it (its `parent`). The buckets are first-in, first-out, so on a flat
// (a filled depression or level ground) the parents form a breadth-first tree from the flat's spill: following them
// leads to the spill by the fewest steps.
//
// The descent on the surface (./trace.ts descentLine): from a cell, the steepest strictly lower admitted 8-neighbour
// (drop² × 2 orthogonal against drop² diagonal, the fixed tie order E, NE, N, NW, W, SW, S, SE — §2.3's), else its
// parent. A step either lowers the level or keeps it and moves to a cell popped earlier, so the line never revisits a
// cell and ends at an outlet. Its bound: along such a line the cut at any cell is at most the largest
// (level − height) met so far, so on the hydrology grid the line's monotone bed never cuts deeper than carveMaxCm.
import { heightWriter } from '../terrain/range.js';
import { cellCount, D8_DX, D8_DY, invCols, type HydroField } from './field.js';
import { SURFACE_CAP_SHARE } from './params.js';

/** `RiverSurface.parent`'s value for an outlet and for a cell not admitted. */
export const NO_PARENT = 0xffffffff;

/** The level above its height the river's surface admits a cell at: SURFACE_CAP_SHARE of carveMaxCm, whole centimetres. */
export function surfaceCapCm(carveMaxCm: number): number {
  return Math.floor(carveMaxCm * SURFACE_CAP_SHARE);
}

/** The river's flooded surface over the hydrology grid. */
export interface RiverSurface {
  /** The level of each admitted cell: its height, or inside a filled depression its spill height (0 elsewhere); written
   * through the range check like every height raster (../terrain/range.ts, the one door). */
  levelCm: Int32Array;
  /** 1 on the cells the flood admitted. */
  admitted: Uint8Array;
  /** The cell that admitted each cell (its drain on a flat); NO_PARENT for an outlet and for a cell not admitted. */
  parent: Uint32Array;
  /** The outlets it was seeded from (1 on each). */
  outlet: Uint8Array;
}

/**
 * The river's surface on `field`'s heights: seeded at the `outlet` cells (walls excepted), never entering `walls`, and
 * admitting a cell only at a level at most `capCm` above its height.
 */
export function riverSurface(field: HydroField, outlet: Uint8Array, walls: Uint8Array, capCm: number): RiverSurface {
  const g = field.grid;
  const cols = g.cols;
  const rows = g.rows;
  const n = cellCount(g);
  const h = field.heightCm;
  if (h.length !== n || outlet.length !== n || walls.length !== n) throw new RangeError('riverSurface: the masks do not match the grid');
  let lo = h[0];
  let hi = h[0];
  for (let c = 1; c < n; c += 1) {
    const v = h[c];
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  // First-in, first-out buckets by level: head and tail of each bucket, `next` along it (NO_PARENT ends a list).
  const head = new Uint32Array(hi - lo + 1).fill(NO_PARENT);
  const tail = new Uint32Array(hi - lo + 1).fill(NO_PARENT);
  const next = new Uint32Array(n).fill(NO_PARENT);
  const levelCm = new Int32Array(n);
  const level = heightWriter(levelCm, field.limitCm);
  const admitted = new Uint8Array(n);
  const parent = new Uint32Array(n).fill(NO_PARENT);
  const seeds = new Uint8Array(n);
  const push = (c: number, at: number): void => {
    level.write(c, at);
    admitted[c] = 1;
    const b = at - lo;
    next[c] = NO_PARENT;
    if (tail[b] === NO_PARENT) head[b] = c;
    else next[tail[b]] = c;
    tail[b] = c;
  };
  for (let c = 0; c < n; c += 1) {
    if (outlet[c] === 1 && walls[c] === 0) {
      seeds[c] = 1;
      push(c, h[c]);
    }
  }
  const inv = invCols(g);
  for (let b = 0; b < head.length; ) {
    const c = head[b];
    if (c === NO_PARENT) {
      b += 1;
      continue;
    }
    head[b] = next[c];
    if (head[b] === NO_PARENT) tail[b] = NO_PARENT;
    const lv = b + lo;
    const ci = c % cols;
    const cj = Math.round((c - ci) * inv);
    for (let k = 0; k < 8; k += 1) {
      const i = ci + D8_DX[k];
      const j = cj + D8_DY[k];
      if (i < 0 || j < 0 || i >= cols || j >= rows) continue;
      const m = j * cols + i;
      if (admitted[m] === 1 || walls[m] === 1) continue;
      const f = h[m] > lv ? h[m] : lv;
      if (f - h[m] > capCm) continue;
      parent[m] = c;
      push(m, f);
    }
  }
  return { levelCm, admitted, parent, outlet: seeds };
}
