// The course's geometry (M0-e-02; §4.2 S1 (3)): the Chaikin-smoothed control polyline, arc lengths, the point at an
// arc length, the self-touch test (GEO-36: "a self-touching course is re-traced with the offsets halved") and the
// rasterisation of a course onto a grid in course order. Pure arithmetic: + − × through `ratio` and Math.sqrt (§6.5).
import { ratio } from '@plat/kernel';

/** A point in arena centimetres (unrounded while a course is built; rounded to whole centimetres when recorded). */
export interface XY {
  x: number;
  y: number;
}

/** A square grid's geometry (the height raster's or the hydrology grid's). */
export interface GridGeom {
  cellCm: number;
  cols: number;
  rows: number;
  originX: number;
  originY: number;
}

function q(num: number, den: number): number {
  const r = ratio(num, den, 'length');
  if (!r.ok) throw new RangeError(`course: a length of ${String(den)} cm`);
  return r.value;
}

/**
 * Chaikin's corner cutting on an open polyline, `rounds` times (§4.2 S1 (3)): each segment (a, b) gives the points
 * ¾a + ¼b and ¼a + ¾b; the two endpoints are kept. Every output point lies on the control polygon's segments' hull
 * between two consecutive control points, so the course stays within half the control spacing of its knots' chords.
 */
export function chaikin(points: readonly XY[], rounds: number): XY[] {
  let cur: XY[] = points.map((p) => ({ x: p.x, y: p.y }));
  for (let r = 0; r < rounds && cur.length > 2; r += 1) {
    const out: XY[] = [cur[0]];
    for (let i = 0; i + 1 < cur.length; i += 1) {
      const a = cur[i];
      const b = cur[i + 1];
      out.push({ x: 0.75 * a.x + 0.25 * b.x, y: 0.75 * a.y + 0.25 * b.y });
      out.push({ x: 0.25 * a.x + 0.75 * b.x, y: 0.25 * a.y + 0.75 * b.y });
    }
    out.push(cur[cur.length - 1]);
    cur = out;
  }
  return cur;
}

/** The polyline rounded to whole centimetres, consecutive duplicates dropped (its first and last points kept). */
export function rounded(points: readonly XY[]): XY[] {
  const out: XY[] = [];
  for (const p of points) {
    const x = Math.round(p.x);
    const y = Math.round(p.y);
    const last = out[out.length - 1];
    if (last !== undefined && last.x === x && last.y === y) continue;
    out.push({ x: x === 0 ? 0 : x, y: y === 0 ? 0 : y });
  }
  return out;
}

/** The cumulative arc length at each vertex (0 at the first). */
export function arcLengths(points: readonly XY[]): Float64Array {
  const out = new Float64Array(points.length);
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    out[i] = out[i - 1] + Math.sqrt(dx * dx + dy * dy);
  }
  return out;
}

/** The point at arc length s along the polyline (clamped to its ends). */
export function pointAtArc(points: readonly XY[], arcs: Float64Array, s: number): XY {
  const n = points.length;
  if (s <= 0 || n === 1) return { x: points[0].x, y: points[0].y };
  if (s >= arcs[n - 1]) return { x: points[n - 1].x, y: points[n - 1].y };
  let i = 1;
  while (i < n - 1 && arcs[i] < s) i += 1;
  const a = points[i - 1];
  const b = points[i];
  const len = arcs[i] - arcs[i - 1];
  const t = len >= 1 ? q(s - arcs[i - 1], len) : 0;
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/** The squared distance from p to the segment ab. */
export function pointSegDist2(p: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = 0;
  if (len2 >= 1) {
    const r = ratio((p.x - a.x) * dx + (p.y - a.y) * dy, len2, 'area');
    t = r.ok ? r.value : 0;
    if (t < 0) t = 0;
    if (t > 1) t = 1;
  }
  const x = a.x + dx * t - p.x;
  const y = a.y + dy * t - p.y;
  return x * x + y * y;
}

function cross(ax: number, ay: number, bx: number, by: number): number {
  return ax * by - ay * bx;
}

/** Whether the segments ab and cd cross or touch (orientation signs; collinear overlaps by the distance test). */
function segmentsCross(a: XY, b: XY, c: XY, d: XY): boolean {
  const d1 = cross(b.x - a.x, b.y - a.y, c.x - a.x, c.y - a.y);
  const d2 = cross(b.x - a.x, b.y - a.y, d.x - a.x, d.y - a.y);
  const d3 = cross(d.x - c.x, d.y - c.y, a.x - c.x, a.y - c.y);
  const d4 = cross(d.x - c.x, d.y - c.y, b.x - c.x, b.y - c.y);
  return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
}

/** The squared distance between the segments ab and cd (0 when they cross). */
export function segSegDist2(a: XY, b: XY, c: XY, d: XY): number {
  if (segmentsCross(a, b, c, d)) return 0;
  return Math.min(pointSegDist2(a, c, d), pointSegDist2(b, c, d), pointSegDist2(c, a, b), pointSegDist2(d, a, b));
}

/**
 * The first self-touch of a course (GEO-36), or null: the least j, then the least i, such that the segments i and j
 * come within `clearanceCm` of each other while their separation along the course exceeds twice the clearance — the
 * course folding back on itself closer than its channel (C-0173 (5)). The course up to vertex j has no such pair.
 */
export function firstSelfTouch(points: readonly XY[], clearanceCm: number): { i: number; j: number } | null {
  const arcs = arcLengths(points);
  const c2 = clearanceCm * clearanceCm;
  const gap = 2 * clearanceCm;
  const segs = points.length - 1;
  if (segs < 3) return null;
  // Segments within the clearance have midpoints closer than the longest segment plus the clearance (B): bucketed by
  // midpoint on a grid of side B, segment j meets only the segments of the 3 × 3 buckets around its own. Segments are
  // bucketed as j advances (i + 1 < j), and j's least touching i is taken — the scan order of the definition.
  let longest = 0;
  let minX = Infinity;
  let minY = Infinity;
  for (let s = 0; s < segs; s += 1) {
    const len = arcs[s + 1] - arcs[s];
    if (len > longest) longest = len;
    const mx = (points[s].x + points[s + 1].x) * 0.5;
    const my = (points[s].y + points[s + 1].y) * 0.5;
    if (mx < minX) minX = mx;
    if (my < minY) minY = my;
  }
  const side = Math.max(1, longest + clearanceCm);
  const keyOf = (s: number): { bx: number; by: number } => ({
    bx: Math.floor(q((points[s].x + points[s + 1].x) * 0.5 - minX, side)),
    by: Math.floor(q((points[s].y + points[s + 1].y) * 0.5 - minY, side)),
  });
  const buckets = new Map<number, number[]>();
  const STRIDE = 1 << 20;
  const put = (s: number): void => {
    const { bx, by } = keyOf(s);
    const key = bx * STRIDE + by;
    const list = buckets.get(key);
    if (list === undefined) buckets.set(key, [s]);
    else list.push(s);
  };
  for (let j = 1; j < segs; j += 1) {
    if (j >= 2) put(j - 2);
    const { bx, by } = keyOf(j);
    let best = -1;
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        const list = buckets.get((bx + dx) * STRIDE + by + dy);
        if (list === undefined) continue;
        for (const i of list) {
          if (best >= 0 && i >= best) continue;
          if (arcs[j] - arcs[i + 1] <= gap) continue;
          if (segSegDist2(points[i], points[i + 1], points[j], points[j + 1]) < c2) best = i;
        }
      }
    }
    if (best >= 0) return { i: best, j };
  }
  return null;
}

/** The cell of grid `g` containing (x, y), clamped to the grid. */
export function cellAt(g: GridGeom, x: number, y: number): { i: number; j: number } {
  let i = Math.floor(q(x - g.originX, g.cellCm));
  let j = Math.floor(q(y - g.originY, g.cellCm));
  if (i < 0) i = 0;
  if (j < 0) j = 0;
  if (i > g.cols - 1) i = g.cols - 1;
  if (j > g.rows - 1) j = g.rows - 1;
  return { i, j };
}

/**
 * The cells a polyline passes through on grid `g`, in course order: each segment sampled at steps of at most half a
 * cell, so consecutive cells are 8-neighbours; consecutive repeats dropped. `at[v]` is the index in `cells` of vertex v's
 * cell. With `loopErase`, a cell met again cuts the loop back to its first visit, so the list is a simple 8-connected
 * path (the corridor's form).
 */
export function rasterise(g: GridGeom, points: readonly XY[], loopErase: boolean): { cells: number[]; at: number[] } {
  const cells: number[] = [];
  const at: number[] = [];
  const pos = new Map<number, number>();
  const push = (x: number, y: number): void => {
    const { i, j } = cellAt(g, x, y);
    const c = j * g.cols + i;
    if (cells.length > 0 && cells[cells.length - 1] === c) return;
    if (loopErase) {
      const seen = pos.get(c);
      if (seen !== undefined) {
        for (let k = seen + 1; k < cells.length; k += 1) pos.delete(cells[k]);
        cells.length = seen + 1;
        for (let v = 0; v < at.length; v += 1) if (at[v] > seen) at[v] = seen;
        return;
      }
      pos.set(c, cells.length);
    }
    cells.push(c);
  };
  const half = g.cellCm * 0.5;
  for (let v = 0; v < points.length; v += 1) {
    const b = points[v];
    if (v > 0) {
      const a = points[v - 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.ceil(q(len, half)));
      for (let s = 1; s < steps; s += 1) {
        const t = ratio(s, steps, 'count');
        const tv = t.ok ? t.value : 0;
        push(a.x + dx * tv, a.y + dy * tv);
      }
    }
    push(b.x, b.y);
    at.push(cells.length - 1);
  }
  return { cells, at };
}
