// Angles, directions and distance tests (§3.2 (3), (5)). M0-a-01. Centidegrees are the model's one angle unit; a
// direction is a unit vector in doubles derived from integer endpoints; a distance compared against `attractCm` or
// `minEdge` on a computed point (an exact foot, a crossing) uses + − × ÷ √ only, so every IEEE engine gives the same
// answer (§3.2 (3)).
import type { Cdeg, LatticePoint } from '../types/index.js';
import { LATTICE, roundHalfAway } from './lattice.js';
import { ratio } from './ratio.js';
import { err, ok, type KernelResult } from './result.js';

/** An angle in degrees quantised to the nearest centidegree, a half away from zero, unnormalised (C-0134 (8)). */
export function cdeg(degrees: number): Cdeg {
  return roundHalfAway(degrees * 100) as Cdeg;
}

/**
 * The unit vector from a to b (§3.2 (5)): (b − a) ÷ |b − a| through `ratio` (length), so equal endpoints return
 * E_DEGENERATE with detail `ratio` (C-0134 (8)).
 */
export function unitVec(a: LatticePoint, b: LatticePoint): KernelResult<{ x: number; y: number }> {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = ratio(dx, len, 'length');
  if (!ux.ok) return err(ux.code, ux.detail);
  const uy = ratio(dy, len, 'length');
  if (!uy.ok) return err(uy.code, uy.detail);
  return ok({ x: ux.value, y: uy.value });
}

/** The squared distance between two points, + − × only: exact for lattice points (below 2⁴⁹). */
export function dist2(ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  return dx * dx + dy * dy;
}

/** The distance between two points, √ of `dist2`. */
export function dist(ax: number, ay: number, bx: number, by: number): number {
  return Math.sqrt(dist2(ax, ay, bx, by));
}

/** Whether two points lie within `limitCm` of each other — at most, inclusive (C-0134 (7)). */
export function withinCm(ax: number, ay: number, bx: number, by: number, limitCm: number): boolean {
  return dist2(ax, ay, bx, by) <= limitCm * limitCm;
}

/** Whether two points lie within `attractCm` (26 cm) of each other, inclusive (§3.2 (2), §3.6). */
export function withinAttract(ax: number, ay: number, bx: number, by: number): boolean {
  return dist2(ax, ay, bx, by) <= LATTICE.attractCm * LATTICE.attractCm;
}

/** Whether two points are closer than `minEdge` (25 cm) — strictly: an edge of exactly 25 cm is allowed (§3.2 (2)). */
export function belowMinEdge(ax: number, ay: number, bx: number, by: number): boolean {
  return dist2(ax, ay, bx, by) < LATTICE.minEdgeCm * LATTICE.minEdgeCm;
}
