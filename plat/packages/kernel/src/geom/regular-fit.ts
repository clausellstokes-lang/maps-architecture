// regularFit(ring): the ring's best-fit regular polygon (§3.4 *The regular fit*; item 45, J-A45.31) — the one
// computation §4.8's castle repair and §7.1's `equalize` brush read. M0-a-10. The ring is read counter-clockwise (a
// clockwise ring in reverse) from its lowest-leftmost vertex p₀; the centre c is the ring's area centroid; the first
// Fourier component a = (1 ÷ n) · Σₖ (pₖ − c) · e^(−2πik/n) is summed in ring order with dmath's cosines and sines
// (§6.5 (2)); vertex k's target is c + a · e^(2πik/n). O(n); it reads no arena and writes nothing.
//
// Readings recorded in C-0159 (3): the centroid's numerators Σ (xₖ + xₖ₊₁) · crossₖ are summed EXACTLY — each term split
// into two products below 2⁴⁹ and summed with area2's flush — and the centre is the exact integer numerator rounded once
// to a double, divided once (through ratio()) by 3·2A, itself exact: two roundings, each of an exact integer. A side
// split into short collinear edges leaves the region's area and centroid numerators unchanged as integers, so both
// roundings act on identical integers and the centre is unchanged to the bit. Where the lowest-leftmost point recurs (a pinch), p₀ is the occurrence whose ring sequence is
// lexicographically least (y, then x), so the start does not depend on the vertex the list begins at. `phaseCdeg` is the
// polar angle of a in whole centidegrees in [0, 36000). Every division by a computed value goes through ratio().
import { dmath } from '../dmath/index.js';
import { roundHalfAway } from '../num/lattice.js';
import { degenerate, ok, orient, ratio, type KernelResult } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import { CDEG_PER_RAD, ExactSum, TWO_PI, offLattice, type XY } from './common.js';

/** The fit (§3.4): values in cm, never arena coordinates; a caller moves vertices toward `targets` only through warp. */
export interface RegularFit {
  /** The ring's vertex count. */
  n: number;
  /** The ring's area centroid, cm. */
  centre: XY;
  radiusCm: number;
  /** The polar angle, about `centre`, of the fit's corner the ring's lowest-leftmost vertex goes to (centidegrees, [0, 36000)). */
  phaseCdeg: number;
  /** Per input vertex, in input order: its place on the fit, cm. */
  targets: XY[];
  /** 4π·A ÷ P² of the ring. */
  compactness: number;
}

/** 2⁻²⁴ and 2²⁴, exact. */
const TWO_M24 = 5.960464477539063e-8;
const TWO_24 = 16_777_216;

/** Is the sequence of the ring read from s lexicographically less (y, then x) than from t? */
function lessFrom(ring: readonly LatticePoint[], order: readonly number[], s: number, t: number): boolean {
  const n = order.length;
  for (let i = 0; i < n; i += 1) {
    const a = ring[order[(s + i) % n]];
    const b = ring[order[(t + i) % n]];
    if (a.y !== b.y) return a.y < b.y;
    if (a.x !== b.x) return a.x < b.x;
  }
  return false;
}

/**
 * The best-fit regular polygon of a lattice ring. E_DEGENERATE `fit` for fewer than 3 vertices, a ring of zero area or
 * a vanishing first component (radius below 1 cm); E_OUT_OF_RANGE for a coordinate off the lattice.
 */
export function regularFit(ring: readonly LatticePoint[]): KernelResult<RegularFit> {
  const bad = offLattice<RegularFit>(ring);
  if (bad !== null) return bad;
  const n = ring.length;
  if (n < 3) return degenerate('fit');
  const o = orient(ring);
  if (o === 0) return degenerate('fit');
  // The input indices in counter-clockwise order, then rotated to start at p₀.
  const ccw: number[] = [];
  for (let i = 0; i < n; i += 1) ccw.push(o > 0 ? i : n - 1 - i);
  let s = 0;
  for (let i = 1; i < n; i += 1) {
    const p = ring[ccw[i]];
    const q = ring[ccw[s]];
    if (p.y < q.y || (p.y === q.y && p.x < q.x) || (p.x === q.x && p.y === q.y && lessFrom(ring, ccw, i, s))) s = i;
  }
  const order: number[] = [];
  for (let i = 0; i < n; i += 1) order.push(ccw[(s + i) % n]);
  // Bounding-box-relative coordinates in [0, 2²⁴) (§3.2 (6)).
  let mx = ring[0].x as number;
  let my = ring[0].y as number;
  for (const p of ring) {
    if (p.x < mx) mx = p.x;
    if (p.y < my) my = p.y;
  }
  const qx = new Float64Array(n);
  const qy = new Float64Array(n);
  for (let k = 0; k < n; k += 1) {
    qx[k] = ring[order[k]].x - mx;
    qy[k] = ring[order[k]].y - my;
  }
  // Twice the area and the centroid's numerators, exact.
  const a2 = new ExactSum();
  const nxHi = new ExactSum();
  const nxLo = new ExactSum();
  const nyHi = new ExactSum();
  const nyLo = new ExactSum();
  let perimeter = 0;
  for (let k = 0; k < n; k += 1) {
    const j = k + 1 === n ? 0 : k + 1;
    const c = qx[k] * qy[j] - qx[j] * qy[k]; // |c| < 2⁴⁸, exact
    a2.add(c);
    const ch = Math.floor(c * TWO_M24);
    const cl = c - ch * TWO_24; // in [0, 2²⁴)
    const wx = qx[k] + qx[j]; // < 2²⁵
    const wy = qy[k] + qy[j];
    nxHi.add(wx * ch);
    nxLo.add(wx * cl);
    nyHi.add(wy * ch);
    nyLo.add(wy * cl);
    const dx = qx[j] - qx[k];
    const dy = qy[j] - qy[k];
    perimeter += Math.sqrt(dx * dx + dy * dy);
  }
  const area2 = a2.total();
  if (area2 === 0n) return degenerate('fit');
  const three = Number(3n * area2);
  const cx = ratio(Number(nxHi.total() * 16_777_216n + nxLo.total()), three, 'area');
  const cy = ratio(Number(nyHi.total() * 16_777_216n + nyLo.total()), three, 'area');
  if (!cx.ok || !cy.ok) return degenerate('fit');
  // The first Fourier component, summed in ring order from p₀.
  const cs = new Float64Array(n);
  const sn = new Float64Array(n);
  let re = 0;
  let im = 0;
  for (let k = 0; k < n; k += 1) {
    const th = ratio(TWO_PI * k, n, 'count');
    const t = th.ok ? th.value : 0;
    cs[k] = dmath.cos(t);
    sn[k] = dmath.sin(t);
    const dx = qx[k] - cx.value;
    const dy = qy[k] - cy.value;
    re += dx * cs[k] + dy * sn[k];
    im += dy * cs[k] - dx * sn[k];
  }
  const ax = ratio(re, n, 'count');
  const ay = ratio(im, n, 'count');
  if (!ax.ok || !ay.ok) return degenerate('fit');
  const radius = Math.sqrt(ax.value * ax.value + ay.value * ay.value);
  if (!(radius >= 1)) return degenerate('fit');
  const targets: XY[] = new Array<XY>(n);
  for (let k = 0; k < n; k += 1) {
    targets[order[k]] = {
      x: mx + (cx.value + (ax.value * cs[k] - ay.value * sn[k])),
      y: my + (cy.value + (ax.value * sn[k] + ay.value * cs[k])),
    };
  }
  let phase = roundHalfAway(dmath.atan2(ay.value, ax.value) * CDEG_PER_RAD);
  if (phase < 0) phase += 36_000;
  if (phase >= 36_000) phase -= 36_000;
  const area2n = Number(area2);
  const compact = ratio(TWO_PI * (area2n < 0 ? -area2n : area2n), perimeter * perimeter, 'area');
  return ok({
    n,
    centre: { x: mx + cx.value, y: my + cy.value },
    radiusCm: radius,
    phaseCdeg: phase + 0,
    targets,
    compactness: compact.ok ? compact.value : 0,
  });
}
