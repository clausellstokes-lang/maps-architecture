// hexLattice(region, spacingCm, jitterCm, rng) (§3.4; §4.3: S4's routing lattice, built at §4.2 S3 (3)): a jittered
// hexagonal point set whose adjacency is known by construction — six neighbours per interior point, no Poisson
// sampling, relaxation or triangulation. M0-a-10; C-0159 (7).
//
// The nominal lattice is the triangular one anchored at the world origin: row j at y = j·h (h = s·√3 ÷ 2), point i of a
// row at x = i·s, shifted by s ÷ 2 on odd rows, so two calls over neighbouring regions share one lattice. Rows are
// visited bottom to top and points left to right over the region's bounding box widened by the jitter; each point is
// displaced by a vector drawn uniformly in a disc of radius R (two uniforms per try, a try outside the unit disc drawn
// again), snapped to the lattice (§3.2 (7)), and kept when strictly inside the region: the shared exact module's strict
// reading over the region's rings, even–odd, on lattice points (not the doubled convention) — a point on any ring is
// outside (`strictlyInsideRings`, kernel-plan.md §1.0 N-3, §1.12 G-2; C-0314). A row's test reads only the rings whose
// vertical extent reaches the row's band; a ring wholly above or below it neither holds the point nor straddles its
// height, so it adds no crossing. With jitter 0 nothing is drawn.
//
// The asserts are §3.4's: spacingCm ≥ minEdge and 0 ≤ jitterCm < spacingCm ÷ 2 (so no two points coincide). §4.3 also
// says no edge crosses another; jitter below half the spacing alone does not hold that — a triangle of side s whose
// three corners move by up to s ÷ 2 can flip — while displacements below half the triangle's height, s·√3 ÷ 4, keep
// every triangle's orientation and every vertex-disjoint edge pair at a positive distance (the lattice's closest such
// pairs lie h apart, and each moves at most 2·R). So the disc's radius is R = min(jitterCm, s·√3 ÷ 4 − 1 cm), the
// 1 cm leaving room for the snap's ≤ 0.71 cm: jitter up to about 0.43 of the spacing is drawn as asked, a larger
// one clamped there.
import { isLatticeCoord, strictlyInsideRings } from '../num/exact.js';
import { LATTICE, ratio, snap } from '../num/index.js';
import type { Stream } from '../rng/index.js';
import type { LatticePoint } from '../types/index.js';
import { SQRT3 } from './common.js';
import type { FaceRings } from './side-runs.js';

/** S4's lattice: the kept points in row-then-column order, and per point six neighbour indices (−1: none). */
export interface HexLattice {
  points: LatticePoint[];
  /**
   * Six entries per point: adjacency[6·i + d] is the neighbour of point i in direction d — 0 east, 1 north-east,
   * 2 north-west, 3 west, 4 south-west, 5 south-east (counter-clockwise) — or −1 where that lattice point is not kept.
   */
  adjacency: Int32Array;
}

/**
 * The jittered hexagonal lattice over a region (lattice rings: outer rings and holes, even–odd). An empty region gives
 * no points. Throws a RangeError when an assert fails: spacingCm finite and ≥ minEdge (25 cm), 0 ≤ jitterCm <
 * spacingCm ÷ 2, every ring point a lattice point.
 */
export function hexLattice(region: FaceRings, spacingCm: number, jitterCm: number, rng: Stream): HexLattice {
  const s = spacingCm;
  if (!(s >= LATTICE.minEdgeCm && s < Infinity)) throw new RangeError(`hexLattice: spacingCm must be finite and ≥ minEdge (${LATTICE.minEdgeCm}), got ${String(s)}`);
  if (!(jitterCm >= 0 && jitterCm < s * 0.5)) throw new RangeError(`hexLattice: jitterCm must satisfy 0 ≤ jitter < spacing ÷ 2, got ${String(jitterCm)} at spacing ${String(s)}`);
  let xmin = Infinity;
  let xmax = -Infinity;
  let ymin = Infinity;
  let ymax = -Infinity;
  // Each ring closes on itself, so it has as many edges as points; ringLo/ringHi hold each ring's vertical extent.
  let edgeCount = 0;
  const ringLo: number[] = [];
  const ringHi: number[] = [];
  for (const ring of region) {
    let lo = Infinity;
    let hi = -Infinity;
    for (const a of ring) {
      if (!isLatticeCoord(a.x) || !isLatticeCoord(a.y)) throw new RangeError('hexLattice: a region point is not a lattice point (§3.2 (7))');
      if (a.x < xmin) xmin = a.x;
      if (a.x > xmax) xmax = a.x;
      if (a.y < lo) lo = a.y;
      if (a.y > hi) hi = a.y;
    }
    if (lo < ymin) ymin = lo;
    if (hi > ymax) ymax = hi;
    ringLo.push(lo);
    ringHi.push(hi);
    edgeCount += ring.length;
  }
  if (edgeCount < 3) return { points: [], adjacency: new Int32Array(0) };
  const h = SQRT3 * s * 0.5;
  const R = Math.min(jitterCm, h * 0.5 - 1);
  const invS = ratio(1, s, 'length');
  const invH = ratio(1, h, 'length');
  if (!invS.ok || !invH.ok) return { points: [], adjacency: new Int32Array(0) };
  const pad = R + 1;
  const j0 = Math.floor((ymin - pad) * invH.value) - 1;
  const j1 = Math.ceil((ymax + pad) * invH.value) + 1;
  const i0 = Math.floor((xmin - pad - s) * invS.value) - 1;
  const i1 = Math.ceil((xmax + pad) * invS.value) + 1;
  const cols = i1 - i0 + 1;
  const rows = j1 - j0 + 1;
  const index = new Int32Array(cols * rows).fill(-1);
  const points: LatticePoint[] = [];
  for (let j = j0; j <= j1; j += 1) {
    const y0 = j * h;
    const ox = (j & 1) === 1 ? s * 0.5 : 0;
    // The rings that reach this row's band: a kept point lies within pad of y0, so only these can hold it or cross
    // its height.
    const band: (readonly LatticePoint[])[] = [];
    const lo = y0 - pad;
    const hi = y0 + pad;
    for (let r = 0; r < region.length; r += 1) if (ringHi[r] >= lo && ringLo[r] <= hi) band.push(region[r]);
    for (let i = i0; i <= i1; i += 1) {
      let dx = 0;
      let dy = 0;
      if (R > 0) {
        let u = 0;
        let v = 0;
        do {
          u = 2 * rng.float01() - 1;
          v = 2 * rng.float01() - 1;
        } while (u * u + v * v >= 1);
        dx = R * u;
        dy = R * v;
      }
      if (band.length === 0) continue;
      const sp = snap(i * s + ox + dx, y0 + dy);
      if (!sp.ok || !strictlyInsideRings(band, sp.value.x, sp.value.y, 'evenOdd')) continue;
      index[(j - j0) * cols + (i - i0)] = points.length;
      points.push(sp.value);
    }
  }
  const n = points.length;
  const adjacency = new Int32Array(6 * n).fill(-1);
  const at = (i: number, j: number): number => (i < i0 || i > i1 || j < j0 || j > j1 ? -1 : index[(j - j0) * cols + (i - i0)]);
  for (let j = j0; j <= j1; j += 1) {
    const odd = (j & 1) === 1;
    for (let i = i0; i <= i1; i += 1) {
      const k = index[(j - j0) * cols + (i - i0)];
      if (k === -1) continue;
      // Row j + 1 and j − 1 are shifted by half a spacing the other way: their two neighbours are (i, i + 1) on an odd
      // row and (i − 1, i) on an even one.
      const l = odd ? i : i - 1;
      const r = odd ? i + 1 : i;
      adjacency[6 * k] = at(i + 1, j);
      adjacency[6 * k + 1] = at(r, j + 1);
      adjacency[6 * k + 2] = at(l, j + 1);
      adjacency[6 * k + 3] = at(i - 1, j);
      adjacency[6 * k + 4] = at(l, j - 1);
      adjacency[6 * k + 5] = at(r, j - 1);
    }
  }
  return { points, adjacency };
}
