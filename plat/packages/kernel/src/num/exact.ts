// The kernel's shared exact predicates and constants (M0-a-01; §3.2 (1), (3), (8), §3.10; C-0314). One home for the
// segment and ring tests every kernel folder reads — the closed-segment clearance test, the closed-segment contact
// test, the crossing rule of the point-in-ring tests and their three boundary readings — for the lattice inputs, the
// lattice order of §3.3's vertex key and the direction half-plane, and for the constants the folders spell as
// literals. Imported by path (`../num/exact.js`); `num/index.ts` does not re-export it, so the package's public API is
// unchanged.
//
// THE EXACTNESS CONTRACT. Every coordinate is a finite double; on lattice points (integers with |x|, |y| < 2²³, snap's
// range invariant) every coordinate difference is below 2²⁴, every product of two below 2⁴⁸ and every `orient2d`
// below 2⁴⁹, so each sign below is exact (§3.2 (1), (3)); the doubled convention (a half-lattice point such as an edge
// midpoint, every coordinate times 2) keeps `orient2d` below 2⁵¹. `segmentCloserThan` compares o² with r²·|ab|²: both
// are exact while they stay at or below 2⁵³ — for r = attractCm (26 cm) a segment up to about 36 km — and beyond that a
// rounding can only blur a near-tie, never a clear answer. `halfPlaneOf` reads an integer direction vector by comparing
// its two coordinates with 0, exact on every input; `comparePoints` orders two lattice points by at most two
// comparisons per coordinate and no arithmetic, exact on every lattice input. The lattice-coordinate bound is
// `isLatticeCoord`'s: an integer with |v| < 2²³ (`LATTICE.rangeCm`, snap's invariant), NaN and ±∞ outside it; `lp`
// and `distinctRing` take points the caller already holds within it. Only + − × and `orient2d` are used; no division,
// no `Math` member beyond `min`, `max` and `abs` (§6.5 (3)).

import type { Cm, LatticePoint } from '../types/index.js';
import { LATTICE } from './lattice.js';
import { orient2d } from './predicates.js';
import { ratio, type RatioKind } from './ratio.js';

// ---- the closed-segment tests -----------------------------------------------------------------------------------------

/**
 * Is p closer than r to the closed segment a–b? Strict: a point exactly r away is clear (§3.2 (2): an edge of exactly
 * `minEdge` is allowed). Where p's projection falls at or before a (dot ≤ 0) — or the segment is one point — the
 * distance is to a; at or past b (dot ≥ |ab|²), to b; between them, the perpendicular distance, compared squared as
 * `orient2d(a, b, p)² < r² · |ab|²`. r is a whole number of centimetres at every caller (`minEdgeCm`, `attractCm`).
 */
export function segmentCloserThan(px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number): boolean {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const dot = (px - ax) * dx + (py - ay) * dy;
  const r2 = r * r;
  if (dot <= 0 || l2 === 0) return (px - ax) * (px - ax) + (py - ay) * (py - ay) < r2;
  if (dot >= l2) return (px - bx) * (px - bx) + (py - by) * (py - by) < r2;
  const o = orient2d(ax, ay, bx, by, px, py);
  return o * o < r2 * l2;
}

/** Does q, already collinear with a–b, lie in the segment's closed bounding box (so on the closed segment)? */
function inClosedBox(ax: number, ay: number, bx: number, by: number, qx: number, qy: number): boolean {
  return Math.min(ax, bx) <= qx && qx <= Math.max(ax, bx) && Math.min(ay, by) <= qy && qy <= Math.max(ay, by);
}

/**
 * Do the closed segments a–b and c–d share a point? A proper crossing (each segment's ends strictly on opposite sides
 * of the other's line), or an end of one lying on the other — a touch at an end and a collinear overlap count; a
 * segment of one point is a point test.
 */
export function segmentsMeet(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const o1 = orient2d(ax, ay, bx, by, cx, cy);
  const o2 = orient2d(ax, ay, bx, by, dx, dy);
  const o3 = orient2d(cx, cy, dx, dy, ax, ay);
  const o4 = orient2d(cx, cy, dx, dy, bx, by);
  if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) return true;
  return (o1 === 0 && inClosedBox(ax, ay, bx, by, cx, cy))
    || (o2 === 0 && inClosedBox(ax, ay, bx, by, dx, dy))
    || (o3 === 0 && inClosedBox(cx, cy, dx, dy, ax, ay))
    || (o4 === 0 && inClosedBox(cx, cy, dx, dy, bx, by));
}

/** Does q lie on the closed segment a–b (collinear with it and inside its closed box)? */
export function onLatticeSegment(ax: number, ay: number, bx: number, by: number, qx: number, qy: number): boolean {
  return orient2d(ax, ay, bx, by, qx, qy) === 0 && inClosedBox(ax, ay, bx, by, qx, qy);
}

// ---- the point-in-ring tests ------------------------------------------------------------------------------------------

/** A ring's vertex: lattice points at every caller (`LatticePoint` is one), doubles where a caller says so. */
export interface RingPoint {
  readonly x: number;
  readonly y: number;
}

/** How a ring's crossings decide inside: their parity (even–odd), or their signed sum (non-zero winding). */
export type FillRule = 'evenOdd' | 'nonZero';

/**
 * The one crossing rule of every point-in-ring test: the edge a → b counts when it straddles the horizontal through q
 * half-open — an upward edge from ay ≤ qy to by > qy with q strictly left of it, +1; a downward edge from ay > qy to
 * by ≤ qy with q strictly right of it, −1; otherwise 0. So a vertex exactly at qy counts through the edge that leaves
 * it upward or arrives at it downward: once where the ring passes through that height, twice (+1 and −1) or never where
 * it only touches it. The parity of the counts is the crossing number, their sum the winding number (Sunday's rule).
 */
export function crossingStep(ax: number, ay: number, bx: number, by: number, qx: number, qy: number): number {
  if (ay <= qy) return by > qy && orient2d(ax, ay, bx, by, qx, qy) > 0 ? 1 : 0;
  return by <= qy && orient2d(ax, ay, bx, by, qx, qy) < 0 ? -1 : 0;
}

/** The winding number of q about the closed ring (signed, + counter-clockwise; `crossingStep` summed over its edges). */
export function windingNumber(ring: readonly RingPoint[], qx: number, qy: number): number {
  const n = ring.length;
  let w = 0;
  for (let i = 0; i < n; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    w += crossingStep(a.x, a.y, b.x, b.y, qx, qy);
  }
  return w;
}

/**
 * THE OFF-RING READING, on the lattice: is q inside the ring by crossing parity (even–odd)? Defined for a point on none
 * of the ring's edges — every caller asks only such points — and on a ring point its answer is the parity's, not a rule.
 */
export function insideLatticeRing(ring: readonly RingPoint[], qx: number, qy: number): boolean {
  const n = ring.length;
  let inside = false;
  for (let i = 0; i < n; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    if (crossingStep(a.x, a.y, b.x, b.y, qx, qy) !== 0) inside = !inside;
  }
  return inside;
}

/**
 * THE OFF-RING READING, doubled: `insideLatticeRing` on the ring's coordinates times 2 against the doubled point
 * (qx2, qy2) — a half-lattice point such as an edge midpoint (a + b), which no edge of a simple arrangement passes
 * through, so parity alone decides.
 */
export function insideDoubledRing(ring: readonly RingPoint[], qx2: number, qy2: number): boolean {
  const n = ring.length;
  let inside = false;
  for (let i = 0; i < n; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    if (crossingStep(2 * a.x, 2 * a.y, 2 * b.x, 2 * b.y, qx2, qy2) !== 0) inside = !inside;
  }
  return inside;
}

/** The fill rule applied to a winding sum: odd for even–odd, non-zero for non-zero winding. */
function filled(w: number, fill: FillRule): boolean {
  return fill === 'nonZero' ? w !== 0 : (w & 1) === 1;
}

/**
 * THE CLOSED READING: is q inside the ring or on it? A point on any edge (`onLatticeSegment`) is inside; elsewhere the
 * fill rule decides. Every ring length is read as given (a caller that treats a ring of fewer than three points as
 * empty says so before calling).
 */
export function insideOrOnRing(ring: readonly RingPoint[], qx: number, qy: number, fill: FillRule): boolean {
  const n = ring.length;
  let w = 0;
  for (let i = 0; i < n; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    if (onLatticeSegment(a.x, a.y, b.x, b.y, qx, qy)) return true;
    w += crossingStep(a.x, a.y, b.x, b.y, qx, qy);
  }
  return filled(w, fill);
}

/**
 * THE STRICT READING over a ring set (an outer ring and its holes, or several rings): is q strictly inside? A point on
 * any edge of any ring is outside; elsewhere the fill rule decides over the crossings of every ring together.
 */
export function strictlyInsideRings(rings: readonly (readonly RingPoint[])[], qx: number, qy: number, fill: FillRule): boolean {
  let w = 0;
  for (const ring of rings) {
    const n = ring.length;
    for (let i = 0; i < n; i++) {
      const a = ring[i];
      const b = ring[(i + 1) % n];
      if (onLatticeSegment(a.x, a.y, b.x, b.y, qx, qy)) return false;
      w += crossingStep(a.x, a.y, b.x, b.y, qx, qy);
    }
  }
  return filled(w, fill);
}

// ---- the lattice inputs -----------------------------------------------------------------------------------------------

/** Is v a lattice coordinate: an integer with |v| < 2²³ (§3.2 (1), (7))? NaN and ±∞ are not. */
export function isLatticeCoord(v: number): boolean {
  return Number.isInteger(v) && Math.abs(v) < LATTICE.rangeCm;
}

/** A lattice point from integers the caller holds in range (no check: snap is the door, §3.2 (7)). */
export function lp(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

/** The ring without consecutive repeats of one lattice point (the closing repeat included), in its own order. */
export function distinctRing(ring: readonly LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const p of ring) {
    const q = out[out.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) out.push(p);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

// ---- the lattice order ------------------------------------------------------------------------------------------------

/**
 * Two lattice points in §3.3's vertex key order: by y, then by x. −1 when a comes first, 1 when b does, 0 for one
 * position. The comparator every canonical sort of points reads (a face's key, a removed record's key, a ring's start).
 */
export function comparePoints(a: LatticePoint, b: LatticePoint): number {
  return a.y !== b.y ? (a.y < b.y ? -1 : 1) : a.x !== b.x ? (a.x < b.x ? -1 : 1) : 0;
}

// ---- the direction half-plane -----------------------------------------------------------------------------------------

/**
 * The half of the direction circle a non-zero integer vector (x, y) lies in: [0°, 180°) — y > 0, or y = 0 with x > 0 —
 * is 0, and [180°, 360°) is 1. Ordered by this half and then by `orient2d` against the origin, directions run
 * counter-clockwise from +x (§3.8's skeleton and roof test, §3.6's rotation check). The zero vector has no direction:
 * both comparisons fail and it reads 1.
 */
export function halfPlaneOf(x: number, y: number): number {
  return y > 0 || (y === 0 && x > 0) ? 0 : 1;
}

// ---- the shared constants ---------------------------------------------------------------------------------------------

/** π to the double nearest it (`Math.PI` is outside §6.5 (3)'s allowlist, C-0125). */
export const PI = 3.141592653589793;

/** 2²⁴: a query box's coordinates stay within ± this, the spatial index's bound (twice §3.2 (1)'s range). */
export const BOX_RANGE = 16_777_216;

/** 2²⁰: the power of two a small quotient's terms are scaled by before `ratio()`, exactly (it cancels). */
export const POW2_20 = 1_048_576;

/**
 * num ÷ den through `ratio()` (§3.2 (8), the division rule of C-0044) with both terms scaled by 2²⁰, so a
 * denominator of at least 2⁻²⁰ in `kind`'s unit clears the floor; scaling by a power of two is exact while the terms
 * stay finite, so the quotient is num ÷ den's. Null below the floor (a NaN denominator included).
 */
export function divScaled(num: number, den: number, kind: RatioKind): number | null {
  const r = ratio(num * POW2_20, den * POW2_20, kind);
  return r.ok ? r.value : null;
}
