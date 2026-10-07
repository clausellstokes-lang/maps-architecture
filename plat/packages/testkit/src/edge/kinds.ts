// §5.1 (9)'s five degenerate kinds as geometry (M0-x-06; §4.13 EP-01: "zero-length, zero-area, self-touching, collinear
// or coincident geometry — refused by the kernel; the stage's failure class (§4.1)"; §3.11's *degenerate geometry* row;
// §13.1's ladder coverage: "per failure class, one degenerate input of each kind"). Each maker turns a stage's own
// geometry — a chain's points, a ring, a course — into the kind, on the lattice (whole centimetres, §3.2 (1)), near the
// geometry it came from so it stays inside the arena (C-0272 (2), the readings of each kind):
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

/** The leg as a whole-centimetre vector (its direction times s, rounded) and its normal (the vector turned left): the
 * kinds lay their points as whole multiples of these, so collinear points are exactly collinear on the lattice. */
export function legVector(points: readonly { x: number; y: number }[]): { vx: number; vy: number; nx: number; ny: number } {
  const { dx, dy, s } = legOf(points);
  const vx = Math.round(s * dx);
  const vy = Math.round(s * dy);
  return { vx, vy, nx: -vy, ny: vx };
}

/** The chain collapsed to its first point, given twice (zero-length). */
export function zeroLengthChain(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const a = lp(points[0].x, points[0].y);
  return [a, { ...a }];
}

/**
 * A closed ring of three collinear points from the chain's first point along its first leg: out 2v, back to v (zero
 * area, exactly: the points are whole multiples of one lattice vector). Its points are distinct.
 */
export function zeroAreaRing(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const { vx, vy } = legVector(points);
  const a = lp(points[0].x, points[0].y);
  return [a, lp(a.x + 2 * vx, a.y + 2 * vy), lp(a.x + vx, a.y + vy)];
}

/** A closed bow-tie ring at the chain's first point: two triangles meeting at it, the ring visiting it twice. */
export function selfTouchingRing(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const { vx, vy, nx, ny } = legVector(points);
  const m = lp(points[0].x, points[0].y);
  // half the normal, rounded: the triangles' half-width
  const hx = Math.round(nx / 2);
  const hy = Math.round(ny / 2);
  return [m, lp(m.x + vx - hx, m.y + vy - hy), lp(m.x + vx + hx, m.y + vy + hy), { ...m }, lp(m.x - vx + hx, m.y - vy + hy), lp(m.x - vx - hx, m.y - vy - hy)];
}

/** An open chain that passes back through its own first point (a loop, then on): self-touching at that point. */
export function selfTouchingChain(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const { vx, vy, nx, ny } = legVector(points);
  const a = lp(points[0].x, points[0].y);
  return [a, lp(a.x + vx, a.y + vy), lp(a.x + vx + nx, a.y + vy + ny), { ...a }, lp(a.x - vx, a.y - vy)];
}

/** An open chain folding back along itself: out 2v along the leg, back to v (an exact collinear overlap). */
export function collinearChain(points: readonly { x: number; y: number }[]): LatticePoint[] {
  const { vx, vy } = legVector(points);
  const a = lp(points[0].x, points[0].y);
  return [a, lp(a.x + 2 * vx, a.y + 2 * vy), lp(a.x + vx, a.y + vy)];
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

/**
 * A closed ring (counter-clockwise, its closing vertex not repeated) made the kind at its first vertex, the rest kept:
 * zero-length — that vertex given twice (a zero-length edge); zero-area — a spike out along its first edge's normal and
 * back (an antenna of zero area); self-touching — a loop leaving it and returning to it (the ring visits it twice);
 * collinear — on every edge with an interior lattice point, the one nearest its middle added (exactly collinear
 * vertices); coincident — the ring given twice round (every vertex coincident with another).
 */
export function degenerateRing(ring: readonly { x: number; y: number }[], kind: DegenerateKind): LatticePoint[] {
  const pts = ring.map((p) => lp(p.x, p.y));
  const a = pts[0];
  const { vx, vy } = legVector(pts);
  // the outward normal of a counter-clockwise ring's first edge (the leg turned right)
  const nx = vy;
  const ny = -vx;
  switch (kind) {
    case 'zero-length':
      return [a, { ...a }, ...pts.slice(1)];
    case 'zero-area':
      return [a, lp(a.x + 2 * nx, a.y + 2 * ny), { ...a }, ...pts.slice(1)];
    case 'self-touching':
      return [a, lp(a.x + nx, a.y + ny), lp(a.x + nx + vx, a.y + ny + vy), { ...a }, ...pts.slice(1)];
    case 'collinear': {
      // on each edge with an interior lattice point (gcd of its steps ≥ 2), the one nearest its middle: exactly collinear
      const out: LatticePoint[] = [];
      for (let i = 0; i < pts.length; i += 1) {
        const p = pts[i];
        const q = pts[i + 1 === pts.length ? 0 : i + 1];
        out.push(p);
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const g = gcd(Math.abs(dx), Math.abs(dy));
        if (g >= 2) {
          const t = Math.floor(g / 2);
          out.push(lp(p.x + (dx / g) * t, p.y + (dy / g) * t));
        }
      }
      return out;
    }
    case 'coincident':
      return [...pts, ...pts.map((p) => ({ ...p }))];
  }
}

function gcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}
