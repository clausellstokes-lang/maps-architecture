// The field grid and its rasterisers (M0-e-05; §4.5 *Mechanism*: "32 m cells over frame + margin"; §2.3's rasters).
// The grid is @plat/site's height-raster geometry at the field's cell: square cells over the frame and its margin,
// centred on the frame's centre, row-major from the south-west corner, a cell's value standing at its centre. A point
// reads the cell holding it (clamped to the grid at its edge). The rasterisers mark the sources the distance transforms
// measure from: a point its cell; a segment every cell it passes through (sampled at a quarter cell, both ends included);
// a ring its edges and every cell whose centre lies inside it (even–odd, a scan line through each row's centres,
// half-open on the ring's vertices). Integer and correctly rounded arithmetic only: a raster is a function of its inputs.
import { ratio, type Frame } from '@plat/kernel';
import { heightGrid } from '@plat/site';
import type { FieldGrid, Path, XY } from './types.js';

function refuse(reason: string): never {
  throw new RangeError(`fields grid: ${reason}`);
}

/** The field grid over `frame` and its margin at `cellCm` (§4.5). */
export function fieldGrid(frame: Frame, cellCm: number): FieldGrid {
  return heightGrid(frame, cellCm);
}

/** 1 ÷ the grid's cell (cm⁻¹). */
export function invCell(g: FieldGrid): number {
  const r = ratio(1, g.cellCm, 'length');
  if (!r.ok) refuse(`a cell of ${String(g.cellCm)} cm`);
  return r.value;
}

/** The column of x, clamped to the grid. */
export function colOf(g: FieldGrid, inv: number, x: number): number {
  const i = Math.floor((x - g.originX) * inv);
  return i < 0 ? 0 : i >= g.cols ? g.cols - 1 : i;
}

/** The row of y, clamped to the grid. */
export function rowOf(g: FieldGrid, inv: number, y: number): number {
  const j = Math.floor((y - g.originY) * inv);
  return j < 0 ? 0 : j >= g.rows ? g.rows - 1 : j;
}

/** The index of the cell holding p (clamped to the grid). */
export function cellOf(g: FieldGrid, inv: number, p: XY): number {
  return rowOf(g, inv, p.y) * g.cols + colOf(g, inv, p.x);
}

/** Column i's centre x. */
export function cx(g: FieldGrid, i: number): number {
  return g.originX + (i + 0.5) * g.cellCm;
}

/** Row j's centre y. */
export function cy(g: FieldGrid, j: number): number {
  return g.originY + (j + 0.5) * g.cellCm;
}

/** Marks the cell holding p. */
export function markPoint(mask: Uint8Array, g: FieldGrid, inv: number, p: XY): void {
  mask[cellOf(g, inv, p)] = 1;
}

/** Marks every cell segment ab passes through: samples at a quarter cell or less apart, both ends included. */
export function markSegment(mask: Uint8Array, g: FieldGrid, inv: number, a: XY, b: XY): void {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const n = Math.max(1, Math.ceil(len * inv * 4));
  const step = ratio(1, n, 'count');
  if (!step.ok) refuse('a segment of no step');
  for (let k = 0; k <= n; k += 1) {
    const t = k === n ? 1 : k * step.value;
    mask[rowOf(g, inv, a.y + t * dy) * g.cols + colOf(g, inv, a.x + t * dx)] = 1;
  }
}

/** Marks every cell a polyline passes through (closed: its last point joined to its first). */
export function markPath(mask: Uint8Array, g: FieldGrid, inv: number, path: Path, closed: boolean): void {
  if (path.length === 1) markPoint(mask, g, inv, path[0]);
  for (let k = 0; k + 1 < path.length; k += 1) markSegment(mask, g, inv, path[k], path[k + 1]);
  if (closed && path.length >= 3) markSegment(mask, g, inv, path[path.length - 1], path[0]);
}

/**
 * Calls `cell(index)` for every cell whose centre lies inside the rings by the even–odd rule (outer ring and holes
 * together): per row, the crossings of its centre line with the rings' edges, half-open on vertices (an edge counts
 * where one end lies strictly above the line and the other at or below it), sorted, filled pairwise.
 */
export function fillRings(g: FieldGrid, rings: readonly Path[], cell: (index: number) => void): void {
  let ymin = Infinity;
  let ymax = -Infinity;
  for (const r of rings) {
    for (const p of r) {
      if (p.y < ymin) ymin = p.y;
      if (p.y > ymax) ymax = p.y;
    }
  }
  if (!(ymax > ymin)) return;
  const inv = invCell(g);
  const j0 = Math.max(0, Math.floor((ymin - g.originY) * inv - 0.5));
  const j1 = Math.min(g.rows - 1, Math.ceil((ymax - g.originY) * inv - 0.5));
  const xs: number[] = [];
  for (let j = j0; j <= j1; j += 1) {
    const y = cy(g, j);
    xs.length = 0;
    for (const r of rings) {
      const n = r.length;
      for (let k = 0; k < n; k += 1) {
        const a = r[k];
        const b = r[k + 1 === n ? 0 : k + 1];
        if (a.y > y !== b.y > y) {
          // the crossing's x: b.y ≠ a.y on such an edge (one end strictly above y, the other not), whole centimetres apart
          const t = ratio(y - a.y, b.y - a.y, 'length');
          if (!t.ok) continue;
          xs.push(a.x + t.value * (b.x - a.x));
        }
      }
    }
    if (xs.length < 2) continue;
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      // the columns whose centres lie in [xs[k], xs[k + 1])
      const i0 = Math.max(0, Math.ceil((xs[k] - g.originX) * inv - 0.5));
      const i1 = Math.min(g.cols - 1, Math.ceil((xs[k + 1] - g.originX) * inv - 0.5) - 1);
      for (let i = i0; i <= i1; i += 1) cell(j * g.cols + i);
    }
  }
}

/** Marks the cells of a filled ring set and of its edges (a water body, a plaza: a source thinner than a cell is kept). */
export function markArea(mask: Uint8Array, g: FieldGrid, inv: number, rings: readonly Path[]): void {
  fillRings(g, rings, (i) => {
    mask[i] = 1;
  });
  for (const r of rings) markPath(mask, g, inv, r, true);
}
