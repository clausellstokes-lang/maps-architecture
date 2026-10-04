// The region check of the oracles (M0-k-03, fix round 2; C-0150): an oracle library's answer is accepted only when
// its region matches, within a tolerance far below §3.7's bounds, the region the operands define under the declared
// rule — checked from the operands' own winding numbers, by neither library. polygon-clipping 0.15.7 can return a wrong
// region without throwing (the check `checks/M0-k-03.md` F4: a union with a self-crossing operand, and its own xor of
// two simple overlapping rings), so an unchecked library answer could pass off a wrong region as an oracle result.
//
// The method is the plane's decomposition into vertical slabs (the trapezoidal decomposition): every vertex of every
// ring — both operands' and the candidate result's — and every crossing of two of their edges is a slab boundary, so
// inside a slab no two edges cross and the space between two consecutive edges is a trapezoid on which every ring set's
// winding number is constant. Walking each slab upward from below (winding 0), crossing an edge that runs in +x adds 1
// to its set's winding number and one that runs in −x subtracts 1 (a counter-clockwise ring's interior lies to the
// left of its edges). On each trapezoid the operands' winding numbers give the truth — the fill rule reads each
// operand (non-zero: w ≠ 0; even-odd: w odd), the operation combines the two — and the candidate's winding number,
// read as the region's indicator, must be 1 inside and 0 outside (outer rings counter-clockwise, holes clockwise, no
// overlap: the form every consumer of an oracle region reads, `symDiffArea` and `faceCount` among them). The check
// returns the area of the trapezoids where the two differ. It runs in doubles: a slab boundary a rounding error moves
// changes the measured area by a sliver of that error's width, never by a region.
import type { BooleanOp, FillRule, RingLike } from './types.js';

/** A point in doubles, [x, y] in cm. */
export type DPoint = readonly [number, number];

/** A ring in doubles (closed implicitly: the last point joins the first). */
export type DRing = readonly DPoint[];

/** One operand of the check: its rings and the rule that reads them. */
export interface CheckOperand {
  readonly rings: readonly DRing[];
  readonly fill: FillRule;
}

/**
 * The tolerance per cm of the operands' boundary: 0.01 cm. A correct answer misses the true region only by its own
 * rounding — polygon-clipping's doubles (under 10⁻¹³ cm/cm), Clipper2's 10⁻³ cm output precision (under 4 × 10⁻⁴ cm/cm;
 * both measured on 2 000 random booleans) — while the wrong regions found (F4) miss it by 1.0 and 6.8 cm/cm, and §3.7's
 * tightest bound is 1 cm/cm (C-0150).
 */
export const REGION_CHECK_CM = 0.01;

/** The verdict of the check on one candidate. */
export interface RegionCheck {
  /** The area, in cm², where the candidate's region and the operands' region differ. */
  mismatchCm2: number;
  /** The operands' boundary length × `REGION_CHECK_CM`. */
  boundCm2: number;
  /** Whether the mismatch is finite and within the bound. */
  ok: boolean;
}

/** An edge with xl < xr, its set (0 = a, 1 = b, 2 = the candidate) and its winding step (+1 when it runs in +x). */
interface Edge {
  xl: number;
  yl: number;
  xr: number;
  yr: number;
  set: 0 | 1 | 2;
  step: 1 | -1;
  /** Its y at the current slab's left and right boundaries (scratch of the walk). */
  y0: number;
  y1: number;
}

function addRing(edges: Edge[], xs: number[], ring: DRing, set: 0 | 1 | 2): void {
  const n = ring.length;
  if (n < 2) return;
  for (let i = 0; i < n; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % n];
    // A vertical edge (and a repeated point) crosses no vertical line inside a slab: it changes no winding number there.
    if (x1 === x2) continue;
    if (x1 < x2) edges.push({ xl: x1, yl: y1, xr: x2, yr: y2, set, step: 1, y0: 0, y1: 0 });
    else edges.push({ xl: x2, yl: y2, xr: x1, yr: y1, set, step: -1, y0: 0, y1: 0 });
    xs.push(x1, x2);
  }
}

/** The x of a crossing of two edges inside both (null when they do not cross there or are parallel). */
function crossingX(e: Edge, f: Edge): number | null {
  const dx1 = e.xr - e.xl;
  const dy1 = e.yr - e.yl;
  const dx2 = f.xr - f.xl;
  const dy2 = f.yr - f.yl;
  const d = dx1 * dy2 - dy1 * dx2;
  if (d === 0) return null;
  const ox = f.xl - e.xl;
  const oy = f.yl - e.yl;
  const s = (ox * dy2 - oy * dx2) / d;
  const t = (ox * dy1 - oy * dx1) / d;
  if (!(s > 0 && s < 1 && t > 0 && t < 1)) return null;
  return e.xl + s * dx1;
}

/** Every crossing x: the edges swept in order of their left ends, each pair whose x and y ranges overlap tested. */
function crossings(edges: readonly Edge[], xs: number[]): void {
  const byLeft = edges.slice().sort((p, q) => p.xl - q.xl);
  for (let i = 0; i < byLeft.length; i += 1) {
    const e = byLeft[i];
    const eLo = Math.min(e.yl, e.yr);
    const eHi = Math.max(e.yl, e.yr);
    for (let j = i + 1; j < byLeft.length; j += 1) {
      const f = byLeft[j];
      if (f.xl >= e.xr) break;
      if (Math.max(f.yl, f.yr) < eLo || Math.min(f.yl, f.yr) > eHi) continue;
      const x = crossingX(e, f);
      if (x !== null) xs.push(x);
    }
  }
}

function yAt(e: Edge, x: number): number {
  if (x === e.xl) return e.yl;
  if (x === e.xr) return e.yr;
  return e.yl + ((e.yr - e.yl) * (x - e.xl)) / (e.xr - e.xl);
}

function filled(w: number, fill: FillRule): boolean {
  return fill === 'nonzero' ? w !== 0 : w % 2 !== 0;
}

function combine(op: BooleanOp, inA: boolean, inB: boolean): boolean {
  switch (op) {
    case 'union':
      return inA || inB;
    case 'intersection':
      return inA && inB;
    case 'difference':
      return inA && !inB;
    case 'xor':
      return inA !== inB;
  }
}

/** The summed boundary length of a ring set in doubles. */
function boundaryLength(rings: readonly DRing[]): number {
  let s = 0;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 1) {
      const [ax, ay] = r[i];
      const [bx, by] = r[(i + 1) % r.length];
      s += Math.hypot(bx - ax, by - ay);
    }
  }
  return s;
}

/**
 * The area, in cm², where `candidate` (read as a region: winding 1 inside, 0 outside) differs from `a op b` with each
 * operand read by its own fill rule. Exact up to the doubles' rounding at the slab boundaries.
 */
export function regionMismatchCm2(op: BooleanOp, a: CheckOperand, b: CheckOperand, candidate: readonly DRing[]): number {
  const edges: Edge[] = [];
  const xs: number[] = [];
  for (const r of a.rings) addRing(edges, xs, r, 0);
  for (const r of b.rings) addRing(edges, xs, r, 1);
  for (const r of candidate) addRing(edges, xs, r, 2);
  if (edges.length === 0) return 0;
  crossings(edges, xs);
  xs.sort((p, q) => p - q);
  const byLeft = edges.slice().sort((p, q) => p.xl - q.xl);
  // The active edges in their order at the last slab's middle; each slab re-sorts them by insertion from that order,
  // which costs one step per pair that changed places (a crossing), so the walk stays near-linear per slab.
  let active: Edge[] = [];
  let next = 0;
  let mismatch = 0;
  for (let k = 0; k + 1 < xs.length; k += 1) {
    const x0 = xs[k];
    const x1 = xs[k + 1];
    if (!(x1 > x0)) continue;
    active = active.filter((e) => e.xr > x0);
    while (next < byLeft.length && byLeft[next].xl <= x0) {
      const e = byLeft[next];
      next += 1;
      if (e.xr > x0) active.push(e);
    }
    if (active.length === 0) continue;
    for (const e of active) {
      e.y0 = yAt(e, x0);
      e.y1 = yAt(e, x1);
    }
    for (let i = 1; i < active.length; i += 1) {
      const e = active[i];
      const m = e.y0 + e.y1;
      let j = i - 1;
      while (j >= 0 && active[j].y0 + active[j].y1 > m) {
        active[j + 1] = active[j];
        j -= 1;
      }
      active[j + 1] = e;
    }
    const w = x1 - x0;
    const wind = [0, 0, 0];
    for (let i = 0; i + 1 < active.length; i += 1) {
      const e = active[i];
      wind[e.set] += e.step;
      const f = active[i + 1];
      const truth = combine(op, filled(wind[0], a.fill), filled(wind[1], b.fill)) ? 1 : 0;
      if (wind[2] === truth) continue;
      const gap = (f.y0 - e.y0 + f.y1 - e.y1) / 2;
      if (gap > 0) mismatch += gap * w;
    }
  }
  return mismatch;
}

/** The check of one candidate: its mismatch against the operands' region and the bound it must keep. */
export function regionCheck(op: BooleanOp, a: CheckOperand, b: CheckOperand, candidate: readonly DRing[]): RegionCheck {
  const mismatchCm2 = regionMismatchCm2(op, a, b, candidate);
  const boundCm2 = REGION_CHECK_CM * (boundaryLength(a.rings) + boundaryLength(b.rings));
  return { mismatchCm2, boundCm2, ok: Number.isFinite(mismatchCm2) && mismatchCm2 <= boundCm2 };
}

/** Lattice rings (or any rings of x, y points) as an operand of the check. */
export function checkOperand(rings: readonly RingLike[], fill: FillRule): CheckOperand {
  return { rings: rings.map((r) => r.map((p) => [p.x, p.y] as const)), fill };
}

/** A failed check in words, for a refusal's message. */
export function wrongRegion(r: RegionCheck): string {
  return `a wrong region (${r.mismatchCm2.toFixed(1)} cm² off the operands' region; bound ${r.boundCm2.toFixed(1)} cm²)`;
}
