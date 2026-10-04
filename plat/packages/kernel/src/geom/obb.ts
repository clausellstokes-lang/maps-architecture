// obb(ring): the oriented bounding box by rotating calipers over the hull (§3.1, §3.4; §17.1 (8): G. T. Toussaint,
// "Solving geometric problems with the rotating calipers", Proc. IEEE MELECON '83; H. Freeman and R. Shapira, CACM 18
// (1975): the minimum-area enclosing rectangle has a side on a hull edge). M0-a-10. The box is the minimum-area one; the
// calipers advance on exact integer dot and cross products of hull edges (each below 2⁴⁹), and the area of the box on
// hull edge i is compared in doubles (cross-multiplied, no division), the first edge in hull order (from the
// lowest-leftmost corner, counter-clockwise) winning a tie (C-0159 (1)). The one contract of §3.4 (GEO-7): fewer than 3 distinct points or a collinear hull is
// E_DEGENERATE `collinear` — never ok with a zero extent, so no caller divides by a zero minor axis.
import { err, ok, ratio, type KernelResult } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import type { XY } from './common.js';
import { hull } from './hull.js';

/** An oriented bounding box: values in cm (doubles), never arena coordinates. */
export interface Obb {
  /** The box's centre. */
  centre: XY;
  /** The long axis's unit direction, signed so that x > 0, or x = 0 and y > 0. */
  major: XY;
  /** `major` turned 90° counter-clockwise. */
  minor: XY;
  /** The box's extent along `major` (its long side), ≥ `minorCm`. */
  majorCm: number;
  /** The box's extent along `minor` (its short side), > 0. */
  minorCm: number;
  /** Its four corners counter-clockwise, the first the one on the defining hull edge's line with the least projection. */
  corners: [XY, XY, XY, XY];
}

function dot(ax: number, ay: number, bx: number, by: number): number {
  return ax * bx + ay * by;
}

function cross(ax: number, ay: number, bx: number, by: number): number {
  return ax * by - ay * bx;
}

/** The calipers over a strictly convex counter-clockwise hull of ≥ 3 lattice points. */
export function boxOfHull(H: readonly LatticePoint[]): Obb {
  const m = H.length;
  const X = (i: number): number => H[i % m].x;
  const Y = (i: number): number => H[i % m].y;
  // j: the farthest along the edge (max dot); k: the farthest from its line (max cross); l: the least along it (min
  // dot). On a convex counter-clockwise hull they follow edge i + 1 in that order and each only moves forward.
  let j = 1;
  let k = 1;
  let l = 1;
  let best = -1;
  // The best box's area times its edge's squared length, and that length: box i is smaller when
  // (dj − dl)·ck·len2_best < areaLen2_best·len2_i — the areas compared without a division.
  let bestNum = Infinity;
  let bestLen2 = 1;
  let bDl = 0;
  let bDj = 0;
  let bCk = 0;
  for (let i = 0; i < m; i += 1) {
    const ex = X(i + 1) - X(i);
    const ey = Y(i + 1) - Y(i);
    if (j < i + 1) j = i + 1;
    while (dot(ex, ey, X(j + 1) - X(j), Y(j + 1) - Y(j)) > 0) j += 1;
    if (k < j) k = j;
    while (cross(ex, ey, X(k + 1) - X(k), Y(k + 1) - Y(k)) > 0) k += 1;
    if (l < k) l = k;
    while (dot(ex, ey, X(l + 1) - X(l), Y(l + 1) - Y(l)) < 0) l += 1;
    const dj = dot(ex, ey, X(j) - X(i), Y(j) - Y(i));
    const dl = dot(ex, ey, X(l) - X(i), Y(l) - Y(i));
    const ck = cross(ex, ey, X(k) - X(i), Y(k) - Y(i));
    const len2 = dot(ex, ey, ex, ey);
    const num = (dj - dl) * ck;
    if (best === -1 || num * bestLen2 < bestNum * len2) {
      bestNum = num;
      bestLen2 = len2;
      best = i;
      bDl = dl;
      bDj = dj;
      bCk = ck;
    }
  }
  const ex = X(best + 1) - X(best);
  const ey = Y(best + 1) - Y(best);
  const len = Math.sqrt(ex * ex + ey * ey);
  const q = (v: number): number => {
    const r = ratio(v, len, 'length');
    return r.ok ? r.value : 0; // len ≥ 1: a hull edge joins two distinct lattice points
  };
  const u = { x: q(ex), y: q(ey) };
  const n = { x: -u.y, y: u.x };
  const ox = X(best);
  const oy = Y(best);
  const a0 = q(bDl);
  const a1 = q(bDj);
  const h = q(bCk);
  const at = (s: number, t: number): XY => ({ x: ox + u.x * s + n.x * t, y: oy + u.y * s + n.y * t });
  const width = a1 - a0;
  const corners: [XY, XY, XY, XY] = [at(a0, 0), at(a1, 0), at(a1, h), at(a0, h)];
  const centre = at((a0 + a1) * 0.5, h * 0.5);
  let major = width >= h ? u : n;
  if (major.x < 0 || (major.x === 0 && major.y < 0)) major = { x: -major.x, y: -major.y };
  const minor = { x: -major.y, y: major.x };
  return { centre, major, minor, majorCm: width >= h ? width : h, minorCm: width >= h ? h : width, corners };
}

/**
 * The minimum-area oriented bounding box of a ring's (or any point list's) lattice points. E_DEGENERATE `collinear` for
 * fewer than 3 distinct points or a collinear hull; E_OUT_OF_RANGE for a coordinate off the lattice.
 */
export function obb(ring: readonly LatticePoint[]): KernelResult<Obb> {
  const h = hull(ring);
  if (!h.ok) return err(h.code, h.detail);
  return ok(boxOfHull(h.value));
}
