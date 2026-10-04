// lir(ring, axes): the largest inscribed rectangle, sampled deterministically over candidate axes (§3.1: "LIR sampled
// deterministically over four candidate axes — OBB long axis, frontage normal, ± 45°"; §3.4; G-R13). M0-a-10; C-0159
// (2). For each axis the ring is read in the axis's frame (u along it, v across it) and every slab between two of
// K + 1 evenly spaced v-levels (K = 8 unless given) is tried: an edge that meets the open slab blocks the u-interval it
// spans there, and between two blocked intervals the open rectangle meets no boundary, so it lies wholly inside or
// wholly outside the ring (even–odd), which the cross-section at the slab's middle decides. The widest inside gap times
// the slab's height is that slab's rectangle; the largest over every axis and slab wins (ties: the earlier axis, then
// the earlier slab, then the gap with the least u). A convex ring — every plot S11 fits — takes a faster path to the
// same rectangles: there the slab's room is the overlap of the cross-sections at its two levels, read in O(1) per slab
// from K + 1 cross-sections (C-0159 (2)). Where no sampled slab holds a rectangle — a ring far thinner than
// the level spacing on every axis — the slabs strictly inside each pair of consecutive vertex v-levels are tried
// instead, each of which holds one wherever the ring has interior there. The rectangle is shrunk by MARGIN on every
// side, far above the doubles' error at the range's edge (2²³ cm reads to ≈ 2·10⁻⁹ cm), so it lies strictly inside the
// ring. The one contract (§3.4, GEO-7): fewer than 3 distinct points or a collinear hull is E_DEGENERATE `collinear`;
// a ring with no interior at all (one that only retraces itself) is E_DEGENERATE `empty` — never ok with a zero extent.
import { degenerate, err, ok, orient2d, ratio, type KernelResult } from '../num/index.js';
import type { LatticePoint } from '../types/index.js';
import { distinctRing, unitOf, type XY } from './common.js';
import { hull } from './hull.js';
import { boxOfHull, type Obb } from './obb.js';

/** A largest inscribed rectangle: values in cm (doubles). */
export interface Lir {
  /** Its centre. */
  centre: XY;
  /** The unit direction its width is measured along (the axis it was found on). */
  axis: XY;
  /** Its extent along `axis`, > 0. */
  widthCm: number;
  /** Its extent across `axis` (along `axis` turned 90° counter-clockwise), > 0. */
  depthCm: number;
  areaCm2: number;
  /** Its corners counter-clockwise. */
  corners: [XY, XY, XY, XY];
  /** The index, in the axes searched, of the axis it was found on. */
  axisIndex: number;
}

/** The inward shrink on every side (cm): ≈ 10⁴ times the coordinate error at the range's edge. */
export const LIR_MARGIN = 1e-5;

/** The default number of slabs the v-range is cut into. */
export const LIR_LEVELS = 8;

/** 1 ÷ √2. */
const INV_SQRT2 = 0.7071067811865476;

/**
 * §3.1's candidate axes: the OBB's long axis, the frontage normal when the caller has a frontage, and the long axis
 * turned by + 45° and − 45°.
 */
export function lirAxes(box: Obb, frontageNormal?: XY): XY[] {
  const a = box.major;
  const out: XY[] = [{ x: a.x, y: a.y }];
  if (frontageNormal !== undefined) out.push({ x: frontageNormal.x, y: frontageNormal.y });
  out.push({ x: (a.x - a.y) * INV_SQRT2, y: (a.x + a.y) * INV_SQRT2 });
  out.push({ x: (a.x + a.y) * INV_SQRT2, y: (a.y - a.x) * INV_SQRT2 });
  return out;
}

interface Best {
  area: number;
  axis: number;
  u0: number;
  u1: number;
  v0: number;
  v1: number;
}

/** 2²⁰: a v-span is scaled by it before ratio(), so spans down to 2⁻²⁰ cm divide; a smaller one is read as level. */
const SPAN_SCALE = 1_048_576;

/** Does the edge's v-span divide (at least 2⁻²⁰ cm)? */
function spans(v1: number, v2: number): boolean {
  const d = (v2 - v1) * SPAN_SCALE;
  return d >= 1 || d <= -1;
}

/**
 * Per edge i (from vertex i to i + 1, closed) its du ÷ dv in the axis frame, or NaN for a level edge (a v-span below
 * 2⁻²⁰ cm): one ratio() per edge and axis, so a cross-section costs no division.
 */
function slopesOf(U: Float64Array, V: Float64Array, n: number, out: Float64Array): void {
  for (let i = 0; i < n; i += 1) {
    const j = i + 1 === n ? 0 : i + 1;
    const r = spans(V[i], V[j]) ? ratio((U[j] - U[i]) * SPAN_SCALE, (V[j] - V[i]) * SPAN_SCALE, 'length') : null;
    out[i] = r !== null && r.ok ? r.value : Number.NaN;
  }
}

/** u at v along edge i (slope S[i]); a level edge's u-midpoint. */
function uAt(U: Float64Array, S: Float64Array, i: number, j: number, V: Float64Array, v: number): number {
  const sl = S[i];
  return Number.isNaN(sl) ? (U[i] + U[j]) * 0.5 : U[i] + sl * (v - V[i]);
}

/**
 * The best rectangle in the slab va < v < vb of the ring (u, v arrays, n vertices, closed), or null. `best` is updated
 * when this slab's rectangle is strictly larger.
 */
function slab(U: Float64Array, V: Float64Array, S: Float64Array, n: number, va: number, vb: number, axis: number, best: Best): void {
  const h = vb - va - 2 * LIR_MARGIN;
  if (!(h > 0)) return;
  // The u-intervals the boundary blocks inside the open band (lo, hi), half a margin inside the slab: it holds the
  // rectangle's closed v-range [va + margin, vb − margin], and an edge that lies along a level of the slab (an OBB axis
  // runs along a hull edge, whose v reads to within the doubles' error of the level) does not block it.
  const bl = va + LIR_MARGIN * 0.5;
  const bh = vb - LIR_MARGIN * 0.5;
  const lo: number[] = [];
  const hi: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const j = i + 1 === n ? 0 : i + 1;
    const u1 = U[i];
    const v1 = V[i];
    const u2 = U[j];
    const v2 = V[j];
    if ((v1 <= bl && v2 <= bl) || (v1 >= bh && v2 >= bh)) continue;
    let a = u1;
    let b = u2;
    if (!Number.isNaN(S[i])) {
      // Clip to the band: the ends where the edge enters and leaves it (or its own ends inside it).
      const ta = v1 < bl ? bl : v1 > bh ? bh : v1;
      const tb = v2 < bl ? bl : v2 > bh ? bh : v2;
      a = ta === v1 ? u1 : uAt(U, S, i, j, V, ta);
      b = tb === v2 ? u2 : uAt(U, S, i, j, V, tb);
    }
    // A level edge (v-span below 2⁻²⁰ cm) inside the slab blocks its whole u-span.
    lo.push(a < b ? a : b);
    hi.push(a < b ? b : a);
  }
  if (lo.length === 0) return;
  const order = lo.map((_, i) => i).sort((x, y) => lo[x] - lo[y] || hi[x] - hi[y] || x - y);
  // The cross-section at the slab's middle: crossings sorted, inside between the 1st and 2nd, the 3rd and 4th, …
  const vm = (va + vb) * 0.5;
  const xs: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const j = i + 1 === n ? 0 : i + 1;
    if (V[i] > vm !== V[j] > vm) xs.push(uAt(U, S, i, j, V, vm));
  }
  xs.sort((x, y) => x - y);
  const inside = (u: number): boolean => {
    let c = 0;
    for (const x of xs) if (x < u) c += 1;
    return (c & 1) === 1;
  };
  let reach = hi[order[0]];
  for (let k = 1; k < order.length; k += 1) {
    const i = order[k];
    if (lo[i] > reach) {
      const g0 = reach;
      const g1 = lo[i];
      const w = g1 - g0 - 2 * LIR_MARGIN;
      if (w > 0 && w * h > best.area && inside((g0 + g1) * 0.5)) {
        best.area = w * h;
        best.axis = axis;
        best.u0 = g0 + LIR_MARGIN;
        best.u1 = g1 - LIR_MARGIN;
        best.v0 = va + LIR_MARGIN;
        best.v1 = vb - LIR_MARGIN;
      }
    }
    if (hi[i] > reach) reach = hi[i];
  }
}

/**
 * Is the ring convex and simple: with its consecutive repeats and its straight-through vertices dropped, a cyclic
 * rotation of its own strict hull, in either direction? Exact (orient2d on lattice points).
 */
function isConvexRing(ring: readonly LatticePoint[], H: readonly LatticePoint[]): boolean {
  const r = distinctRing(ring);
  const m = r.length;
  const c: LatticePoint[] = [];
  for (let i = 0; i < m; i += 1) {
    const a = r[i === 0 ? m - 1 : i - 1];
    const b = r[i];
    const d = r[i + 1 === m ? 0 : i + 1];
    const straight = orient2d(a.x, a.y, b.x, b.y, d.x, d.y) === 0 && (b.x - a.x) * (d.x - b.x) + (b.y - a.y) * (d.y - b.y) > 0;
    if (!straight) c.push(b);
  }
  const k = c.length;
  if (k !== H.length) return false;
  let s = -1;
  for (let i = 0; i < k; i += 1) if (c[i].x === H[0].x && c[i].y === H[0].y) s = i;
  if (s === -1) return false;
  let fwd = true;
  let back = true;
  for (let i = 0; i < k; i += 1) {
    const f = c[(s + i) % k];
    const g = c[(s - i + k) % k];
    if (f.x !== H[i].x || f.y !== H[i].y) fwd = false;
    if (g.x !== H[i].x || g.y !== H[i].y) back = false;
  }
  return fwd || back;
}

/**
 * The convex path: on a convex ring the room where a band's vertical segments fit is one interval, the overlap of the
 * cross-sections at the band's two ends (the left boundary is convex in v, the right concave, so each is extreme at an
 * end), and every slab is read in O(1) from cross-sections taken once per level. The hull H (counter-clockwise, its
 * u, v in U, V) is the ring; the band is the general slabs' (half a margin inside the slab), so both paths find one
 * rectangle per slab.
 */
function convexSlabs(U: Float64Array, V: Float64Array, S: Float64Array, m: number, levels: Float64Array, axis: number, best: Best): void {
  const K = levels.length - 1;
  // Per level two cross-sections, half a margin above it (a slab's bottom) and below it (a slab's top) — the band the
  // general slabs block over.
  const leftUp = new Float64Array(K + 1);
  const rightUp = new Float64Array(K + 1);
  const leftDn = new Float64Array(K + 1);
  const rightDn = new Float64Array(K + 1);
  const section = (L: number, outLo: Float64Array, outHi: Float64Array, i: number): void => {
    let lo = Infinity;
    let hi = -Infinity;
    for (let j = 0; j < m; j += 1) {
      const k = j + 1 === m ? 0 : j + 1;
      const v1 = V[j];
      const v2 = V[k];
      if (!((v1 <= L && L <= v2) || (v2 <= L && L <= v1))) continue;
      if (!Number.isNaN(S[j])) {
        const u = uAt(U, S, j, k, V, L);
        if (u < lo) lo = u;
        if (u > hi) hi = u;
      } else {
        const ua = U[j] < U[k] ? U[j] : U[k];
        const ub = U[j] < U[k] ? U[k] : U[j];
        if (ua < lo) lo = ua;
        if (ub > hi) hi = ub;
      }
    }
    outLo[i] = lo;
    outHi[i] = hi;
  };
  for (let i = 0; i <= K; i += 1) {
    section(levels[i] + LIR_MARGIN * 0.5, leftUp, rightUp, i);
    section(levels[i] - LIR_MARGIN * 0.5, leftDn, rightDn, i);
  }
  for (let p = 0; p < K; p += 1) {
    for (let q = p + 1; q <= K; q += 1) {
      const u0 = (leftUp[p] > leftDn[q] ? leftUp[p] : leftDn[q]) + LIR_MARGIN;
      const u1 = (rightUp[p] < rightDn[q] ? rightUp[p] : rightDn[q]) - LIR_MARGIN;
      const v0 = levels[p] + LIR_MARGIN;
      const v1 = levels[q] - LIR_MARGIN;
      const w = u1 - u0;
      const h = v1 - v0;
      if (w > 0 && h > 0 && w * h > best.area) {
        best.area = w * h;
        best.axis = axis;
        best.u0 = u0;
        best.u1 = u1;
        best.v0 = v0;
        best.v1 = v1;
      }
    }
  }
}

/**
 * The largest inscribed rectangle of a lattice ring over the candidate axes (any non-zero directions; an axis shorter
 * than 2⁻²⁰ or not finite is skipped, and when none is given or none is usable the axes are `lirAxes` of the ring's
 * OBB). `levels` is K, the slabs per axis (1 … 64). A convex ring takes the convex path (`convexSlabs`), any other the
 * general slabs; `path: 'slabs'` forces the general slabs (the tests compare the two).
 */
export function lir(ring: readonly LatticePoint[], axes?: readonly XY[], opts: { levels?: number; path?: 'auto' | 'slabs' } = {}): KernelResult<Lir> {
  const h = hull(ring);
  if (!h.ok) return err(h.code, h.detail);
  const K = opts.levels ?? LIR_LEVELS;
  if (!(Number.isInteger(K) && K >= 1 && K <= 64)) throw new RangeError(`lir: levels must be an integer in [1, 64], got ${String(K)}`);
  // The given axes, an unusable one skipped (its index kept); none given, or none usable: §3.1's candidates.
  let dirs: (XY | null)[] = (axes ?? []).map((a) => unitOf(a));
  if (dirs.every((d) => d === null)) dirs = lirAxes(boxOfHull(h.value)).map((a) => unitOf(a));
  const n = ring.length;
  // The frame's origin is the hull's lowest-leftmost corner, a point of the ring whichever vertex its list starts at.
  const ox = h.value[0].x;
  const oy = h.value[0].y;
  const U = new Float64Array(n);
  const V = new Float64Array(n);
  const best: Best = { area: 0, axis: -1, u0: 0, u1: 0, v0: 0, v1: 0 };
  const frame = (d: XY): { vmin: number; vmax: number } => {
    let vmin = Infinity;
    let vmax = -Infinity;
    for (let i = 0; i < n; i += 1) {
      const dx = ring[i].x - ox;
      const dy = ring[i].y - oy;
      U[i] = dx * d.x + dy * d.y;
      V[i] = dy * d.x - dx * d.y;
      if (V[i] < vmin) vmin = V[i];
      if (V[i] > vmax) vmax = V[i];
    }
    return { vmin, vmax };
  };
  const step = ratio(1, K, 'count');
  const inv = step.ok ? step.value : 1;
  const H = h.value;
  const convex = (opts.path ?? 'auto') === 'auto' && isConvexRing(ring, H);
  const HU = new Float64Array(H.length);
  const HV = new Float64Array(H.length);
  const S = new Float64Array(convex ? H.length : n);
  const levels = new Float64Array(K + 1);
  for (let a = 0; a < dirs.length; a += 1) {
    const d = dirs[a];
    if (d === null) continue;
    const { vmin, vmax } = frame(d);
    const span = vmax - vmin;
    for (let i = 0; i <= K; i += 1) levels[i] = i === K ? vmax : vmin + span * (i * inv);
    if (convex) {
      for (let i = 0; i < H.length; i += 1) {
        const dx = H[i].x - ox;
        const dy = H[i].y - oy;
        HU[i] = dx * d.x + dy * d.y;
        HV[i] = dy * d.x - dx * d.y;
      }
      slopesOf(HU, HV, H.length, S);
      convexSlabs(HU, HV, S, H.length, levels, a, best);
      continue;
    }
    slopesOf(U, V, n, S);
    for (let p = 0; p < K; p += 1) {
      for (let q = p + 1; q <= K; q += 1) slab(U, V, S, n, levels[p], levels[q], a, best);
    }
  }
  if (best.axis === -1) {
    // The fallback: slabs strictly inside consecutive vertex levels, on each axis in turn until one holds a rectangle.
    for (let a = 0; a < dirs.length && best.axis === -1; a += 1) {
      const d = dirs[a];
      if (d === null) continue;
      frame(d);
      const S2 = new Float64Array(n);
      slopesOf(U, V, n, S2);
      const vs = Array.from(V).sort((x, y) => x - y).filter((v, i, arr) => i === 0 || v > arr[i - 1]);
      for (let i = 0; i + 1 < vs.length; i += 1) {
        const q = (vs[i + 1] - vs[i]) * 0.25;
        slab(U, V, S2, n, vs[i] + q, vs[i + 1] - q, a, best);
      }
    }
  }
  if (best.axis === -1) return degenerate('empty');
  const d = dirs[best.axis] as XY;
  const at = (u: number, v: number): XY => ({ x: ox + d.x * u - d.y * v, y: oy + d.y * u + d.x * v });
  const width = best.u1 - best.u0;
  const depth = best.v1 - best.v0;
  return ok({
    centre: at((best.u0 + best.u1) * 0.5, (best.v0 + best.v1) * 0.5),
    axis: { x: d.x, y: d.y },
    widthCm: width,
    depthCm: depth,
    areaCm2: width * depth,
    corners: [at(best.u0, best.v0), at(best.u1, best.v0), at(best.u1, best.v1), at(best.u0, best.v1)],
    axisIndex: best.axis,
  });
}
