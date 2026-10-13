// Plane helpers for S1's water (M0-e-03): the arena's half-extent and outer ring (§3.2 (9)), point-in-rings by the
// even-odd rule on lattice rings, distances to ring segments, the nearest point on a polyline with its arc and side,
// and a ray's first hit on a ring set. Doubles on integer centimetres: every product stays below 2⁵³, so the
// orientation tests are exact; quotients go through `ratio` (§3.2 (8)).
import { ratio, type Frame, type LatticePoint } from '@plat/kernel';
import type { Cm } from '@plat/model';
import { arcLengths, type XY } from '../hydro/course.js';

/** The arena's half-extent about the frame's centre: the frame plus its margin on every side (§3.2 (9)). */
export interface Reach {
  x: number;
  y: number;
}

/** The arena's half-extent of a frame (terrain/grid.ts's `arenaReach`: ⌈w · (½ + m)⌉, ⌈h · (½ + m)⌉). */
export function reachOf(frame: Frame): Reach {
  const r = 0.5 + frame.marginShare;
  return { x: Math.ceil(frame.widthCm * r), y: Math.ceil(frame.heightCm * r) };
}

/** The arena's outer ring (§4.1's S1 row): the frame plus its margin, counter-clockwise from the south-west corner. */
export function outerRing(reach: Reach): LatticePoint[] {
  const p = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
  return [p(-reach.x, -reach.y), p(reach.x, -reach.y), p(reach.x, reach.y), p(-reach.x, reach.y)];
}

/** Is the point on the arena's outer ring (on one of its four sides)? */
export function onRing(reach: Reach, q: XY): boolean {
  return Math.abs(q.x) === reach.x || Math.abs(q.y) === reach.y;
}

/** The distance from q to the arena's outer ring (inside: the least gap to a side). */
export function ringGap(reach: Reach, q: XY): number {
  return Math.min(reach.x - Math.abs(q.x), reach.y - Math.abs(q.y));
}

/** q ÷ d for a length divisor (a refusal reads as 0: the callers divide by lengths of at least a centimetre). */
export function quot(n: number, d: number): number {
  const r = ratio(n, d, 'length');
  return r.ok ? r.value : 0;
}

/** Twice the signed area of a ring (counter-clockwise positive). */
export function area2(ring: readonly XY[]): number {
  let s = 0;
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === n ? 0 : i + 1];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** Is q inside the ring set by the even-odd rule (a point on a ring counts as outside)? */
export function insideRings(rings: readonly (readonly XY[])[], q: XY): boolean {
  let inside = false;
  for (const ring of rings) {
    const n = ring.length;
    for (let i = 0; i < n; i += 1) {
      const a = ring[i];
      const b = ring[i + 1 === n ? 0 : i + 1];
      const o = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (o === 0 && Math.min(a.x, b.x) <= q.x && q.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= q.y && q.y <= Math.max(a.y, b.y)) return false;
      if (a.y > q.y !== b.y > q.y && (b.y > a.y ? o > 0 : o < 0)) inside = !inside;
    }
  }
  return inside;
}

/** The squared distance from q to segment ab. */
export function segDist2(q: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = 0;
  if (len2 > 0) {
    const r = ratio((q.x - a.x) * dx + (q.y - a.y) * dy, len2, 'area');
    t = r.ok ? Math.min(1, Math.max(0, r.value)) : 0;
  }
  const x = a.x + dx * t - q.x;
  const y = a.y + dy * t - q.y;
  return x * x + y * y;
}

/** The nearest point on segment ab to q. */
export function footOn(q: XY, a: XY, b: XY): XY {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = 0;
  if (len2 > 0) {
    const r = ratio((q.x - a.x) * dx + (q.y - a.y) * dy, len2, 'area');
    t = r.ok ? Math.min(1, Math.max(0, r.value)) : 0;
  }
  return { x: a.x + dx * t, y: a.y + dy * t };
}

/** The least squared distance from q to any segment of the ring set. */
export function ringsDist2(rings: readonly (readonly XY[])[], q: XY): number {
  let best = Infinity;
  for (const ring of rings) {
    const n = ring.length;
    for (let i = 0; i < n; i += 1) {
      const d = segDist2(q, ring[i], ring[i + 1 === n ? 0 : i + 1]);
      if (d < best) best = d;
    }
  }
  return best;
}

/** The squared distance between segments ab and cd (0 when they cross or touch). */
export function segSeg2(a: XY, b: XY, c: XY, d: XY): number {
  const o1 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const o2 = (b.x - a.x) * (d.y - a.y) - (b.y - a.y) * (d.x - a.x);
  const o3 = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
  const o4 = (d.x - c.x) * (b.y - c.y) - (d.y - c.y) * (b.x - c.x);
  if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) return 0;
  return Math.min(segDist2(a, c, d), segDist2(b, c, d), segDist2(c, a, b), segDist2(d, a, b));
}

/** A polyline with its cumulative arcs. */
export interface Line {
  points: readonly XY[];
  arcs: Float64Array;
}

/** A polyline read once for its arcs. */
export function lineOf(points: readonly XY[]): Line {
  return { points, arcs: arcLengths(points) };
}

/**
 * The nearest point of a polyline to q: its arc length from the first point, its squared distance, and the side q
 * lies on — +1 left of the line's direction there, −1 right, 0 on it.
 */
export function nearestOnLine(line: Line, q: XY): { arc: number; dist2: number; side: -1 | 0 | 1 } {
  const pts = line.points;
  let best = Infinity;
  let arc = 0;
  let side: -1 | 0 | 1 = 0;
  for (let i = 0; i + 1 < pts.length; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];
    const f = footOn(q, a, b);
    const dx = f.x - q.x;
    const dy = f.y - q.y;
    const d = dx * dx + dy * dy;
    if (d < best) {
      best = d;
      const ex = f.x - a.x;
      const ey = f.y - a.y;
      arc = line.arcs[i] + Math.sqrt(ex * ex + ey * ey);
      const o = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      side = o > 0 ? 1 : o < 0 ? -1 : 0;
    }
  }
  if (pts.length === 1) {
    const dx = pts[0].x - q.x;
    const dy = pts[0].y - q.y;
    best = dx * dx + dy * dy;
  }
  return { arc, dist2: best, side };
}

/** A ray's first hit on a ring set: the ring, the segment (from vertex `seg` to the next), the parameter along the ray. */
export interface RayHit {
  ring: number;
  seg: number;
  /** Distance along the (unit) ray, cm. */
  t: number;
  at: XY;
}

/** 2²⁰: a unit direction scaled by it keeps a ray's cross products above ratio's 1 cm floor (exact: a power of two). */
const RAY_SCALE = 1_048_576;

/** The first crossing of the ray from o along unit direction u with the rings' segments (t > 0), or null. */
export function rayHit(rings: readonly (readonly XY[])[], o: XY, u: XY): RayHit | null {
  let best: RayHit | null = null;
  const ux = u.x * RAY_SCALE;
  const uy = u.y * RAY_SCALE;
  for (let r = 0; r < rings.length; r += 1) {
    const ring = rings[r];
    const n = ring.length;
    for (let i = 0; i < n; i += 1) {
      const a = ring[i];
      const b = ring[i + 1 === n ? 0 : i + 1];
      const ex = b.x - a.x;
      const ey = b.y - a.y;
      // o + t·U = a + s·e: t = cross(a − o, e) ÷ cross(U, e), s = cross(a − o, U) ÷ cross(U, e); U = u · 2²⁰, so the
      // ray's distance in cm is t · 2²⁰. A segment parallel to the ray (|cross| below the floor) is never its hit.
      const den = ux * ey - uy * ex;
      const wx = a.x - o.x;
      const wy = a.y - o.y;
      const tr = ratio(wx * ey - wy * ex, den, 'length');
      const sr = ratio(wx * uy - wy * ux, den, 'length');
      if (!tr.ok || !sr.ok) continue;
      const t = tr.value * RAY_SCALE;
      const s = sr.value;
      if (t <= 0 || s < 0 || s > 1) continue;
      if (best === null || t < best.t) best = { ring: r, seg: i, t, at: { x: o.x + u.x * t, y: o.y + u.y * t } };
    }
  }
  return best;
}
