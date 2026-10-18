// Exact distance tests for the constructive set's witnesses (M0-k-02 fix round 1; §3.6's attraction band, hot pixel and
// placement rule; C-0187). A witness proves that its draw is the degeneracy it names with integer arithmetic only: a
// distance compared with a decimal bound as a squared cross product against the squared length (BigInt), a foot's
// rounding as twice its offset against the length, so no rounding of a double decides a case's claim.
import type { P } from './draw.js';
import { refCross } from './numeric.js';

const B = (v: number): bigint => BigInt(v);

/** |b − a|² in BigInt. */
export function len2(a: P, b: P): bigint {
  const dx = B(b.x) - B(a.x);
  const dy = B(b.y) - B(a.y);
  return dx * dx + dy * dy;
}

/** (b − a) · (p − a) in BigInt. */
export function dotAt(a: P, b: P, p: P): bigint {
  return (B(b.x) - B(a.x)) * (B(p.x) - B(a.x)) + (B(b.y) - B(a.y)) * (B(p.y) - B(a.y));
}

/**
 * The sign of (distance from p to the line a–b) − num / den: −1 nearer, 0 at, 1 farther — exactly, as
 * cross² · den² against num² · |b − a|².
 */
export function lineDistCmp(p: P, a: P, b: P, num: number, den = 1): number {
  const c = refCross(a, b, p);
  const lhs = c * c * B(den) * B(den);
  const rhs = B(num) * B(num) * len2(a, b);
  return lhs < rhs ? -1 : lhs > rhs ? 1 : 0;
}

/** Whether p's foot on the line a–b lies strictly inside the segment a–b. */
export function footInside(p: P, a: P, b: P): boolean {
  const t = dotAt(a, b, p);
  return t > 0n && t < len2(a, b);
}

/** Whether the distance from p to the segment a–b is strictly greater than r (an integer number of cm). */
export function segFartherThan(p: P, a: P, b: P, r: number): boolean {
  if (footInside(p, a, b)) return lineDistCmp(p, a, b, r) > 0;
  const r2 = B(r) * B(r);
  return len2(p, a) > r2 && len2(p, b) > r2;
}

/** Whether p's distance from the line a–b lies in [lo, hi], each num / den. */
export function lineDistIn(p: P, a: P, b: P, lo: number, hi: number, den: number): boolean {
  return lineDistCmp(p, a, b, lo, den) >= 0 && lineDistCmp(p, a, b, hi, den) <= 0;
}

/**
 * Whether p is the lattice point nearest its own foot on the line a–b, each coordinate of the foot strictly within half
 * a centimetre of p's — so a vertex placed by §3.6's placement rule at the nearest lattice point to that foot lands on p.
 * Twice the offset p − foot, times |b − a|², is 2 · (p · L − a · L − t · (b − a)) with t = (b − a) · (p − a).
 */
export function roundsToSelf(p: P, a: P, b: P): boolean {
  return roundsTo(p, p, a, b);
}

/** Whether r is the lattice point nearest the foot of q on the line a–b (each coordinate strictly within ½ cm). */
export function roundsTo(q: P, r: P, a: P, b: P): boolean {
  const L = len2(a, b);
  const t = dotAt(a, b, q);
  const ox = 2n * ((B(r.x) - B(a.x)) * L - t * (B(b.x) - B(a.x)));
  const oy = 2n * ((B(r.y) - B(a.y)) * L - t * (B(b.y) - B(a.y)));
  const abs = (v: bigint) => (v < 0n ? -v : v);
  return abs(ox) < L && abs(oy) < L;
}

/** The nearest lattice point to the foot of p on the line a–b (doubles; the witnesses compare it with an exact test). */
export function nearestToFoot(p: P, a: P, b: P): P {
  const L = Number(len2(a, b));
  const t = Number(dotAt(a, b, p)) / L;
  return { x: Math.round(a.x + t * (b.x - a.x)), y: Math.round(a.y + t * (b.y - a.y)) };
}

/**
 * The squared distance between the projections of p and q onto the line a–b, compared with [lo, hi] (integer cm): the
 * projections stand |(q − p) · (b − a)| / |b − a| apart, so the test is lo² · L ≤ ((q − p) · (b − a))² ≤ hi² · L.
 */
export function projectionGapIn(p: P, q: P, a: P, b: P, lo: number, hi: number): boolean {
  const L = len2(a, b);
  const g = (B(q.x) - B(p.x)) * (B(b.x) - B(a.x)) + (B(q.y) - B(p.y)) * (B(b.y) - B(a.y));
  const g2 = g * g;
  return g2 >= B(lo) * B(lo) * L && g2 <= B(hi) * B(hi) * L;
}

/** The crossing of the segments s0–s1 and a–b when they cross properly (each one's ends strictly either side of the other). */
export function properCrossing(s0: P, s1: P, a: P, b: P): { num: bigint; den: bigint } | null {
  const c0 = refCross(a, b, s0);
  const c1 = refCross(a, b, s1);
  const d0 = refCross(s0, s1, a);
  const d1 = refCross(s0, s1, b);
  if (c0 === 0n || c1 === 0n || d0 === 0n || d1 === 0n) return null;
  if (c0 > 0n === c1 > 0n || d0 > 0n === d1 > 0n) return null;
  // s0 + λ (s1 − s0), λ = c0 / (c0 − c1).
  return { num: c0, den: c0 - c1 };
}

/** Whether the crossing s0 + (num / den)(s1 − s0) lies within r cm of w (exact). */
export function crossingWithin(s0: P, s1: P, x: { num: bigint; den: bigint }, w: P, r: number): boolean {
  const px = B(s0.x) * x.den + x.num * (B(s1.x) - B(s0.x)) - B(w.x) * x.den;
  const py = B(s0.y) * x.den + x.num * (B(s1.y) - B(s0.y)) - B(w.y) * x.den;
  return px * px + py * py <= B(r) * B(r) * x.den * x.den;
}
