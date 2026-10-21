// Plane helpers of the S3 slice (M0-c-01), the package's shared home of exact plane geometry: the checked quotient,
// compass bearings, angular gaps, point-in-ring and segment tests and distances on values in cm, and the shared
// constants (π, centidegrees per radian, cm² per hectare). The package's other folders import them by path; the siting
// index lists five of them. It is not the only home: after the consolidation rounds (R1 – R11) some folders keep
// predicates of their own (enceinte/plane.ts's, infill/bentCutFabric.ts's private even–odd `insideRing`), so a
// change here does not reach them (N-c1c-6). Every real function other than + − × ÷ and √ goes through the kernel's
// dmath (§6.5 (2)); every division by a variable through `ratio` (§3.2 (8), C-0044). Bearings follow M0-e-01's
// convention: compass centidegrees clockwise from north (+y), the direction (sin θ, cos θ), in [0, 36 000).
import { dmath, orient2d, ratio, snap, type LatticePoint, type RatioKind } from '@plat/kernel';

/** A point in cm (values, not arena slots). */
export interface XY {
  x: number;
  y: number;
}

/** π to the double nearest it (Math.PI is outside §6.5 (3)'s allowlist). */
export const PI = 3.141592653589793;

/** Centidegrees per radian (18 000 ÷ π). */
export const CDEG_PER_RAD = 5729.5779513082325;

/** One hectare in cm². */
export const HA_CM2 = 100_000_000;

/** n ÷ d through `ratio`; a degenerate denominator is a programming error of the caller here (RangeError). */
export function quot(n: number, d: number, kind: RatioKind, what: string): number {
  const r = ratio(n, d, kind);
  if (!r.ok) throw new RangeError(`siting: ${what}: a ${kind} denominator below its floor (${String(d)})`);
  return r.value;
}

/** The lattice point nearest (x, y) — the kernel's one door (§3.2 (7)); RangeError off the arena's range. */
export function latticeAt(x: number, y: number): LatticePoint {
  const s = snap(x, y);
  if (!s.ok) throw new RangeError(`siting: (${String(x)}, ${String(y)}) lies off the lattice's range`);
  return s.value;
}

/** The compass bearing (cdeg, clockwise from north, [0, 36 000)) of the direction (dx, dy); 0 for a zero vector. */
export function bearingCdeg(dx: number, dy: number): number {
  if (dx === 0 && dy === 0) return 0;
  let b = Math.round(dmath.atan2(dx, dy) * CDEG_PER_RAD);
  if (b < 0) b += 36_000;
  if (b >= 36_000) b -= 36_000;
  return b;
}

/** The unsigned angular difference of two bearings (cdeg), in [0, 18 000]. */
export function angularGap(a: number, b: number): number {
  let d = Math.abs(a - b);
  while (d >= 36_000) d -= 36_000;
  return d > 18_000 ? 36_000 - d : d;
}

/** Twice the signed area of a ring (counter-clockwise positive), summed in ring order. */
export function area2Of(ring: readonly XY[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === ring.length ? 0 : i + 1];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** The perimeter of a closed ring. */
export function perimeterOf(ring: readonly XY[]): number {
  let p = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === ring.length ? 0 : i + 1];
    p += Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  }
  return p;
}

/** 4π·A ÷ P² of a ring (§3.4's `compactness`; §4.2 S3 (2)'s plaza floor reads it). */
export function compactnessOf(ring: readonly XY[]): number {
  const p = perimeterOf(ring);
  return quot(4 * PI * (Math.abs(area2Of(ring)) * 0.5), p * p, 'area', 'compactness');
}

/**
 * Even–odd containment, exact on lattice points through orient2d: true strictly inside, false outside; a point on the
 * ring counts as `onRing` (default false: outside).
 */
export function insideRing(ring: readonly XY[], q: XY, onRing = false): boolean {
  let inside = false;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === ring.length ? 0 : i + 1];
    const o = orient2d(a.x, a.y, b.x, b.y, q.x, q.y);
    if (o === 0 && Math.min(a.x, b.x) <= q.x && q.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= q.y && q.y <= Math.max(a.y, b.y)) return onRing;
    if (a.y > q.y !== b.y > q.y) {
      if (b.y > a.y ? o > 0 : o < 0) inside = !inside;
    }
  }
  return inside;
}

/** Do the closed segments ab and cd meet (touch or cross)? Exact through orient2d. */
export function segmentsMeet(a: XY, b: XY, c: XY, d: XY): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  if (o1 !== o2 && o3 !== o4) return true;
  const on = (p: XY, q: XY, r: XY): boolean => Math.min(p.x, q.x) <= r.x && r.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= r.y && r.y <= Math.max(p.y, q.y);
  if (o1 === 0 && on(a, b, c)) return true;
  if (o2 === 0 && on(a, b, d)) return true;
  if (o3 === 0 && on(c, d, a)) return true;
  if (o4 === 0 && on(c, d, b)) return true;
  return false;
}

/** Does the segment ab meet the closed region of the ring (an end inside or on it, or crossing one of its sides)? */
export function segmentMeetsRing(ring: readonly XY[], a: XY, b: XY): boolean {
  if (insideRing(ring, a, true) || insideRing(ring, b, true)) return true;
  for (let i = 0; i < ring.length; i += 1) {
    if (segmentsMeet(a, b, ring[i], ring[i + 1 === ring.length ? 0 : i + 1])) return true;
  }
  return false;
}

/** Is the closed ring simple: no two non-adjacent sides meet and no two adjacent sides overlap? O(n²). */
export function ringIsSimple(ring: readonly XY[]): boolean {
  const n = ring.length;
  if (n < 3) return false;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === n ? 0 : i + 1];
    if (a.x === b.x && a.y === b.y) return false;
    for (let j = i + 1; j < n; j += 1) {
      const c = ring[j];
      const d = ring[j + 1 === n ? 0 : j + 1];
      const adjacent = j === i + 1 || (i === 0 && j === n - 1);
      if (adjacent) {
        // Adjacent sides share one end; they may not fold back over each other.
        const shared = j === i + 1 ? b : a;
        const p = j === i + 1 ? a : b;
        const q = j === i + 1 ? d : c;
        if (orient2d(p.x, p.y, shared.x, shared.y, q.x, q.y) === 0 && (q.x - shared.x) * (p.x - shared.x) + (q.y - shared.y) * (p.y - shared.y) > 0) return false;
        continue;
      }
      if (segmentsMeet(a, b, c, d)) return false;
    }
  }
  return true;
}

/**
 * The squared distance from p to the segment ab: the foot clamped to the segment (a degenerate ab is its point a).
 */
export function distToSegment2(p: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : quot((p.x - a.x) * dx + (p.y - a.y) * dy, len2, 'area', 'segment foot');
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  const fx = a.x + t * dx - p.x;
  const fy = a.y + t * dy - p.y;
  return fx * fx + fy * fy;
}

/** The distance from p to the segment ab: √ of `distToSegment2`, the same double as the one-step form. */
export function distToSegment(p: XY, a: XY, b: XY): number {
  return Math.sqrt(distToSegment2(p, a, b));
}
