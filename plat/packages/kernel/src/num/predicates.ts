// Exact orientation and areas (§3.2 (1), (3), (6); GEO-32, J-K13). M0-a-01. Every coordinate is an integer with
// |x|, |y| < 2²³ (snap's range invariant), so every coordinate difference is below 2²⁴, every product below 2⁴⁸ and
// every orient2d determinant below 2⁴⁹: exact in ordinary doubles. No orientation, sliver or degeneracy decision reads
// the sign of a float sum.
import type { LatticePoint } from '../types/index.js';

/** 2⁵²: area2's double partial is flushed into its BigInt accumulator when its magnitude reaches this (§3.2 (6)). */
const FLUSH = 4_503_599_627_370_496;

/**
 * Twice the signed area of the triangle a, b, c — positive when c lies to the left of a → b (counter-clockwise, +y
 * north), negative to the right, 0 when collinear — exact for lattice points (§3.2 (1)). Flat coordinates, so the
 * arena's typed arrays feed it without allocating (C-0134 (2)).
 */
export function orient2d(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): number {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax) + 0;
}

/** The sign of a value as −1, 0 or 1 (never −0). */
function sign(v: number): number {
  return v > 0 ? 1 : v < 0 ? -1 : 0;
}

/**
 * The orientation of three points (§3.4's read service), or of a ring (§3.2 (6)): `orient2d` at the ring's
 * lowest-leftmost vertex (least y, then least x) with its neighbours the nearest vertices before and after it that are
 * not the same lattice point. 1 counter-clockwise, −1 clockwise, 0 degenerate. Where that vertex is the tip of a spike
 * — its neighbours collinear with it, which no simple ring has — the sign of the exact `area2Big` decides (C-0134 (2)).
 * Where the lowest-leftmost lattice point recurs apart from its run of consecutive duplicates — a pinch, or an antenna
 * based there, so "the lowest-leftmost vertex" names two or more corners — the sign of `area2Big` decides too
 * (C-0140): so a ring's orientation never depends on the vertex its list starts at, and reversing a ring negates it.
 */
export function orient(ring: readonly LatticePoint[]): number;
export function orient(a: LatticePoint, b: LatticePoint, c: LatticePoint): number;
export function orient(first: readonly LatticePoint[] | LatticePoint, b?: LatticePoint, c?: LatticePoint): number {
  if (!Array.isArray(first)) {
    const a = first as LatticePoint;
    if (b === undefined || c === undefined) return 0;
    return sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  }
  const ring = first as readonly LatticePoint[];
  const n = ring.length;
  if (n < 3) return 0;
  let m = 0;
  for (let i = 1; i < n; i += 1) {
    const p = ring[i];
    const q = ring[m];
    if (p.y < q.y || (p.y === q.y && p.x < q.x)) m = i;
  }
  const v = ring[m];
  let ip = (m + n - 1) % n;
  while (ip !== m && ring[ip].x === v.x && ring[ip].y === v.y) ip = (ip + n - 1) % n;
  let inx = (m + 1) % n;
  while (inx !== m && ring[inx].x === v.x && ring[inx].y === v.y) inx = (inx + 1) % n;
  if (ip === m || inx === m) return 0; // every vertex is one lattice point
  // The vertices from inx forward to ip lie outside v's run; v among them is a second corner at the lowest-leftmost
  // point (C-0140), decided by the exact area.
  for (let j = inx; j !== ip; j = (j + 1) % n) {
    if (ring[j].x === v.x && ring[j].y === v.y) return areaSign(ring);
  }
  const p = ring[ip];
  const q = ring[inx];
  const s = sign(orient2d(p.x, p.y, v.x, v.y, q.x, q.y));
  if (s !== 0) return s;
  return areaSign(ring);
}

/** The sign of a ring's exact twice-area, as −1, 0 or 1: `orient`'s fallback (C-0134 (2), C-0140). */
function areaSign(ring: readonly LatticePoint[]): number {
  const big = area2Big(ring);
  return big > 0n ? 1 : big < 0n ? -1 : 0;
}

/** The minimum corner of a ring's bounding box, as [x, y]. */
function minCorner(ring: readonly LatticePoint[]): [number, number] {
  let minX = ring[0].x as number;
  let minY = ring[0].y as number;
  for (let i = 1; i < ring.length; i += 1) {
    if (ring[i].x < minX) minX = ring[i].x;
    if (ring[i].y < minY) minY = ring[i].y;
  }
  return [minX, minY];
}

/**
 * Twice the signed area of a ring (positive counter-clockwise), exact: each shoelace term on coordinates relative to
 * the ring's bounding-box minimum corner (in [0, 2²⁴), so |term| < 2⁴⁸), summed in a double partial flushed into a
 * BigInt accumulator whenever its magnitude reaches 2⁵² — one comparison per term — so every partial stays below
 * 2⁵² + 2⁴⁸ < 2⁵³ and every addition is exact (§3.2 (6)). The value is returned as a double, exact whenever
 * |2A| ≤ 2⁵³: every simple ring (below 2⁴⁹) and every ring of at most 32 vertices; a larger self-crossing ring — a
 * boolean operand before its overlay — takes `area2Big` (C-0134 (3)). Fewer than three vertices: 0.
 */
export function area2(ring: readonly LatticePoint[]): number {
  const n = ring.length;
  if (n < 3) return 0;
  const [minX, minY] = minCorner(ring);
  let px = ring[n - 1].x - minX;
  let py = ring[n - 1].y - minY;
  let s = 0;
  let acc = 0n;
  let flushed = false;
  for (let i = 0; i < n; i += 1) {
    const qx = ring[i].x - minX;
    const qy = ring[i].y - minY;
    s += px * qy - qx * py;
    if (s >= FLUSH || s <= -FLUSH) {
      acc += BigInt(s);
      s = 0;
      flushed = true;
    }
    px = qx;
    py = qy;
  }
  return flushed ? Number(acc + BigInt(s)) + 0 : s + 0;
}

/** Twice the signed area of any ring snap can produce, as an exact BigInt — a self-crossing ring's (§3.2 (6)). */
export function area2Big(ring: readonly LatticePoint[]): bigint {
  const n = ring.length;
  if (n < 3) return 0n;
  const [minX, minY] = minCorner(ring);
  let px = ring[n - 1].x - minX;
  let py = ring[n - 1].y - minY;
  let s = 0;
  let acc = 0n;
  for (let i = 0; i < n; i += 1) {
    const qx = ring[i].x - minX;
    const qy = ring[i].y - minY;
    s += px * qy - qx * py;
    if (s >= FLUSH || s <= -FLUSH) {
      acc += BigInt(s);
      s = 0;
    }
    px = qx;
    py = qy;
  }
  return acc + BigInt(s);
}
