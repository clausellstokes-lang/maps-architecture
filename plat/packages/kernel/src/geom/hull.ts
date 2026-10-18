// hull(points): the convex hull by Andrew's monotone chain (§3.1, §3.4; §17.1 (8): A. M. Andrew, "Another efficient
// algorithm for convex hulls in two dimensions", Information Processing Letters 9 (1979)). M0-a-10. Exact: every turn is
// orient2d on lattice points (§3.2 (1), (3)), so collinear and duplicate points are decided without a tolerance. The
// one contract of §3.4 (GEO-7): fewer than 3 distinct points, or a collinear hull, returns E_DEGENERATE `collinear` —
// never a hull of zero area. It is obb's and lir's internal step.
import { degenerate, ok, orient2d, type KernelResult } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import { lp, offLattice } from './common.js';

/** Lowest-leftmost first: y, then x — the kernel's vertex order (§3.3). */
function lowerLeft(a: LatticePoint, b: LatticePoint): boolean {
  return a.y < b.y || (a.y === b.y && a.x < b.x);
}

/**
 * The strict convex hull of lattice points: its corners counter-clockwise from the lowest-leftmost one, no three
 * collinear, as fresh points. E_DEGENERATE `collinear` for fewer than 3 distinct points or a collinear set;
 * E_OUT_OF_RANGE for a coordinate off the lattice (`offLattice`).
 */
export function hull(points: readonly LatticePoint[]): KernelResult<LatticePoint[]> {
  const bad = offLattice<LatticePoint[]>(points);
  if (bad !== null) return bad;
  const n = points.length;
  if (n < 3) return degenerate('collinear');
  const s = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const h: LatticePoint[] = [];
  // Lower chain left to right, then upper chain right to left; a non-left turn (orient2d ≤ 0) pops, so collinear and
  // repeated points leave the hull.
  for (let i = 0; i < n; i += 1) {
    const p = s[i];
    while (h.length >= 2 && orient2d(h[h.length - 2].x, h[h.length - 2].y, h[h.length - 1].x, h[h.length - 1].y, p.x, p.y) <= 0) h.pop();
    h.push(p);
  }
  const lower = h.length + 1;
  for (let i = n - 2; i >= 0; i -= 1) {
    const p = s[i];
    while (h.length >= lower && orient2d(h[h.length - 2].x, h[h.length - 2].y, h[h.length - 1].x, h[h.length - 1].y, p.x, p.y) <= 0) h.pop();
    h.push(p);
  }
  h.pop(); // the chain returns to its first point
  if (h.length < 3) return degenerate('collinear');
  let m = 0;
  for (let i = 1; i < h.length; i += 1) if (lowerLeft(h[i], h[m])) m = i;
  const out: LatticePoint[] = [];
  for (let i = 0; i < h.length; i += 1) {
    const p = h[(m + i) % h.length];
    out.push(lp(p.x, p.y));
  }
  return ok(out);
}
