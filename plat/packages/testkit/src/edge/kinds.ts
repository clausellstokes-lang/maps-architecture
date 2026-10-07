// §5.1 (9)'s five degenerate kinds as geometry (M0-x-06; §4.13 EP-01: "zero-length, zero-area, self-touching, collinear
// or coincident geometry — refused by the kernel; the stage's failure class (§4.1)"; §3.11's *degenerate geometry* row;
// §13.1's ladder coverage: "per failure class, one degenerate input of each kind"). Each maker turns a stage's own
// geometry — a chain's points, a ring, a course — into the kind, on the lattice (whole centimetres, §3.2 (1)), near the
// geometry it came from so it stays inside the arena (C-EDGE (2), the readings of each kind):
//   zero-length    the chain collapsed to one point, given twice: length 0;
//   zero-area      a closed ring of three collinear points (out along a direction, back to its midpoint): area 0;
//   self-touching  a closed ring visiting one vertex twice (two triangles meeting at it, a bow-tie), or an open chain
//                  passing back through its own first point;
//   collinear      an open chain folding back along itself (out, then back to the midpoint of the leg it laid);
//   coincident     the chain given again where it already stands (every point coincident with a standing vertex),
//                  or two of its consecutive points made one.
import type { LatticePoint } from '@plat/kernel';

/** §5.1 (9)'s degenerate kinds, in the design's order. */
export type DegenerateKind = 'zero-length' | 'zero-area' | 'self-touching' | 'collinear' | 'coincident';

/** The five kinds in §5.1 (9)'s order (zero-length, zero-area, self-touching, collinear, coincident). */
export const DEGENERATE_KINDS: readonly DegenerateKind[] = Object.freeze(['zero-length', 'zero-area', 'self-touching', 'collinear', 'coincident']);

/** A lattice point (whole centimetres). */
export function lp(x: number, y: number): LatticePoint {
  return { x: Math.round(x), y: Math.round(y) } as LatticePoint;
}

/** A unit-ish direction of a chain (its first leg's, else east) and a leg length `s` (cm, ≥ 200, ≤ 4 000). */
export function legOf(points: readonly { x: number; y: number }[]): { dx: number; dy: number; s: number } {
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[0].x;
    const dy = points[i].y - points[0].y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d >= 1) return { dx: dx / d, dy: dy / d, s: Math.max(200, Math.min(4000, Math.round(d / 2))) };
  }
  return { dx: 1, dy: 0, s: 1000 };
}

/** The chain collapsed to its first point, given twice (zero-length). */
export function zeroLengthChain(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const a = lp(points[0].x, points[0].y);
  return [a, { ...a }];
}

/**
 * A closed ring of three collinear points from the chain's first point along its first leg: out 2s, back to s (zero
 * area). Its points are distinct and every two meet only along the one line.
 */
export function zeroAreaRing(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const { dx, dy, s } = legOf(points);
  const a = lp(points[0].x, points[0].y);
  return [a, lp(a.x + 2 * s * dx, a.y + 2 * s * dy), lp(a.x + s * dx, a.y + s * dy)];
}

/** A closed bow-tie ring at the chain's first point: two triangles meeting at it, the ring visiting it twice. */
export function selfTouchingRing(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const { dx, dy, s } = legOf(points);
  const m = lp(points[0].x, points[0].y);
  // the leg's normal
  const nx = -dy;
  const ny = dx;
  const h = Math.max(100, Math.round(s / 2));
  return [
    m,
    lp(m.x + s * dx - h * nx, m.y + s * dy - h * ny),
    lp(m.x + s * dx + h * nx, m.y + s * dy + h * ny),
    { ...m },
    lp(m.x - s * dx + h * nx, m.y - s * dy + h * ny),
    lp(m.x - s * dx - h * nx, m.y - s * dy - h * ny),
  ];
}

/** An open chain that passes back through its own first point (a loop, then on): self-touching at that point. */
export function selfTouchingChain(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const { dx, dy, s } = legOf(points);
  const a = lp(points[0].x, points[0].y);
  const nx = -dy;
  const ny = dx;
  return [a, lp(a.x + s * dx, a.y + s * dy), lp(a.x + s * dx + s * nx, a.y + s * dy + s * ny), { ...a }, lp(a.x - s * dx, a.y - s * dy)];
}

/** An open chain folding back along itself: out 2s along the leg, back to s (collinear overlap). */
export function collinearChain(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const { dx, dy, s } = legOf(points);
  const a = lp(points[0].x, points[0].y);
  return [a, lp(a.x + 2 * s * dx, a.y + 2 * s * dy), lp(a.x + s * dx, a.y + s * dy)];
}

/** The chain with every point given twice in a row (consecutive coincident points). */
export function doubledPoints(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const p of points) {
    const q = lp(p.x, p.y);
    out.push(q, { ...q });
  }
  return out;
}

/** Is a ring's twice-signed area zero (exact on the lattice)? */
export function ringArea2(ring: readonly { x: number; y: number }[]): number {
  let a = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const p = ring[i];
    const q = ring[i + 1 === ring.length ? 0 : i + 1];
    a += p.x * q.y - q.x * p.y;
  }
  return a;
}
