// Test support for M0-a-12's Delaunay adapter and sampled medial axis: shape builders (rotated, snapped rectangles,
// holed faces) and the independent references the tests judge with — distance to a segment, the even–odd containment
// of a point, segment meeting, a graph's components and independent cycles — written here from their definitions,
// never with the code under test.
import { orient2d, snap } from '../../src/num/index.js';
import type { Cm, LatticePoint } from '../../src/types/index.js';
import type { MedialAxis } from '../../src/medial/index.js';

export type Ring = LatticePoint[];

/** The hard timeout of a sweep on the shared machine; never a timing. */
export const TIMEOUT = 600_000;

export const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** A double through snap, which must accept it. */
export function snapped(x: number, y: number): LatticePoint {
  const r = snap(x, y);
  if (!r.ok) throw new Error(`support: (${x}, ${y}) is out of range`);
  return r.value;
}

/** mulberry32: a seeded generator for the sweeps, independent of fast-check. */
export function generator(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Local points rotated by `deg` about the origin, moved to (cx, cy) and snapped. */
export function place(local: readonly [number, number][], deg: number, cx: number, cy: number): Ring {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return local.map(([x, y]) => snapped(cx + x * c - y * s, cy + x * s + y * c));
}

/** The corners of a w × h rectangle centred on the origin, counter-clockwise. */
export const rectLocal = (w: number, h: number, x0 = -w / 2, y0 = -h / 2): [number, number][] => [
  [x0, y0],
  [x0 + w, y0],
  [x0 + w, y0 + h],
  [x0, y0 + h],
];

/** The distance from p to the segment a b. */
export function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
}

/** The distance from p to the nearest edge of any ring. */
export function boundaryDist(rings: readonly Ring[], x: number, y: number): number {
  let best = Infinity;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      best = Math.min(best, segDist(x, y, a.x, a.y, b.x, b.y));
    }
  }
  return best;
}

/** Even–odd containment over every ring, by a ray to +x with the half-open rule; a point on an edge counts as outside. */
export function insideEvenOdd(rings: readonly Ring[], x: number, y: number): boolean {
  if (boundaryDist(rings, x, y) === 0) return false;
  let odd = false;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      if (a.y > y === b.y > y) continue;
      const xi = a.x + ((y - a.y) * (b.x - a.x)) / (b.y - a.y);
      if (xi > x) odd = !odd;
    }
  }
  return odd;
}

/** Do the segments a b and c d meet (a crossing, a touch or an overlap)? */
export function meet(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const o1 = Math.sign(orient2d(ax, ay, bx, by, cx, cy));
  const o2 = Math.sign(orient2d(ax, ay, bx, by, dx, dy));
  const o3 = Math.sign(orient2d(cx, cy, dx, dy, ax, ay));
  const o4 = Math.sign(orient2d(cx, cy, dx, dy, bx, by));
  if (o1 * o2 < 0 && o3 * o4 < 0) return true;
  const on = (px: number, py: number, qx: number, qy: number, rx: number, ry: number): boolean =>
    Math.min(px, qx) <= rx && rx <= Math.max(px, qx) && Math.min(py, qy) <= ry && ry <= Math.max(py, qy);
  return (o1 === 0 && on(ax, ay, bx, by, cx, cy)) || (o2 === 0 && on(ax, ay, bx, by, dx, dy)) || (o3 === 0 && on(cx, cy, dx, dy, ax, ay)) || (o4 === 0 && on(cx, cy, dx, dy, bx, by));
}

/** A graph's connected components and its independent cycles (arcs − nodes + components). */
export function topology(axis: MedialAxis): { components: number; cycles: number } {
  const parent = axis.nodes.map((_, i) => i);
  const find = (i: number): number => {
    while (parent[i] !== i) i = parent[i];
    return i;
  };
  for (const { a, b } of axis.arcs) parent[find(a)] = find(b);
  const roots = new Set(axis.nodes.map((_, i) => find(i)));
  return { components: roots.size, cycles: axis.arcs.length - axis.nodes.length + roots.size };
}

/** The greatest distance from a point of the polyline-free set {arcs, nodes} to the segment p q, and back (sampled). */
export function hausdorffToSegment(axis: MedialAxis, px: number, py: number, qx: number, qy: number): { graphToSeg: number; segToGraph: number } {
  let graphToSeg = 0;
  for (const n of axis.nodes) graphToSeg = Math.max(graphToSeg, segDist(n.x, n.y, px, py, qx, qy));
  let segToGraph = 0;
  for (let i = 0; i <= 50; i += 1) {
    const x = px + ((qx - px) * i) / 50;
    const y = py + ((qy - py) * i) / 50;
    let best = Infinity;
    for (const n of axis.nodes) best = Math.min(best, Math.hypot(n.x - x, n.y - y));
    for (const { a, b } of axis.arcs) best = Math.min(best, segDist(x, y, axis.nodes[a].x, axis.nodes[a].y, axis.nodes[b].x, axis.nodes[b].y));
    segToGraph = Math.max(segToGraph, best);
  }
  return { graphToSeg, segToGraph };
}
