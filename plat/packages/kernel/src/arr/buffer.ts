// buffer(chains, halfWidthCm, joins, ends) (§3.4; §3.7 *Decision*; §3.11 *no input*). M0-a-08.
//
// §3.7: "A buffer is the union of per-segment strips — each segment widened by its half-width on both sides — and
// per-vertex joins: `round` joins and ends are chords of at most 2 cm sagitta (about 27 chords per full circle at a 3 m
// radius); a `square` join cuts the corner square at the half-width from the vertex, and a `square` end extends the
// strip by the half-width beyond its end point; a `miter` join extends the two outer edges to their meeting point, cut
// square at twice the half-width from the vertex where they would meet farther (the miter limit); a `flat` end stops
// the strip at its end point. Where the half-width varies … the segment's strip is the trapezoid between them." The
// parts are built in doubles — directions through `ratio()`, angles through `dmath` — each part's points snapped to the
// lattice by `snap`'s rounding, every part counter-clockwise, and united on the scratch arrangement (`winding.ts`) under
// the non-zero rule, so the output obeys the insertion rules like every other chain.
//
// The construction's readings (C-0216 (2)): a chain is open — its first and last points are its ends even when they
// coincide; consecutive repeated points are dropped (the first one's half-width kept), and a chain left with fewer than
// two distinct points adds nothing; every part carries its chain point as a vertex and computes each offset point by the
// one expression its neighbours use, so neighbouring parts meet along identical lattice segments; a square join's cut is
// perpendicular to the bisector of the two outer normals, a reversal (a 180° turn) joining ahead of the vertex; with
// varying half-widths a join's legs use the vertex's own half-width; a straight-on vertex has no join. The round arc's
// vertices lie on the circle in equal angular steps from one leg's offset point to the other's, the fewest steps whose
// chord keeps a sagitta of at most 2 cm. Half-widths are one non-negative number, or one per input point of the chains
// in order (§3.4: "per input point of these transient chains"); anything else is the caller's error (a RangeError).
import { dmath } from '../dmath/index.js';
import { area2, orient2d, ratio, snap, ok, type KernelResult } from '../num/index.js';
import type { Cm, LatticePoint } from '../types/index.js';
import { offLattice, PI, unitOf, type XY } from '../geom/common.js';
import { emptyResult, overlayRegion, type Ring } from './winding.js';

/** §3.4's joins. */
export type JoinKind = 'round' | 'square' | 'miter';

/** §3.4's ends. */
export type EndKind = 'round' | 'square' | 'flat';

/** §3.7: round joins and ends are chords of at most this sagitta, in cm. */
export const SAGITTA_CM = 2;

/** 2²⁰: numerators and small denominators are scaled by it before ratio() (exact: a power of two). */
const SCALE = 1_048_576;

/** num ÷ den through ratio() for a denominator of at least 2⁻²⁰ (exact scaling), else null. */
function div(num: number, den: number): number | null {
  const r = ratio(num * SCALE, den * SCALE, 'length');
  return r.ok ? r.value : null;
}

/**
 * The largest angular step whose chord on a circle of radius r keeps a sagitta of at most 2 cm: 2·acos(1 − 2 ÷ r),
 * taken as 2·atan2(√(1 − c²), c) through dmath, at most π (a radius of 1 cm or less: one step per half-turn).
 */
export function maxArcStep(r: number): number {
  const q = div(SAGITTA_CM, r);
  if (q === null) return PI;
  const c = 1 - q;
  if (c <= -1) return PI;
  const s = Math.sqrt(Math.max(0, 1 - c * c));
  return Math.min(PI, 2 * dmath.atan2(s, c));
}

/** The number of equal chords an arc of `theta` radians on radius r takes (§3.7's sagitta rule; at least one). */
export function arcSteps(theta: number, r: number): number {
  const steps = div(theta, maxArcStep(r));
  return Math.max(1, Math.ceil((steps ?? 1) - 1e-12));
}

/** The point w to the right of p across direction u. */
function right(p: XY, u: XY, w: number): XY {
  return { x: p.x + u.y * w, y: p.y - u.x * w };
}

/** The point w to the left of p across direction u. */
function left(p: XY, u: XY, w: number): XY {
  return { x: p.x - u.y * w, y: p.y + u.x * w };
}

/** The unit vector n rotated by phi radians (counter-clockwise when positive), through dmath. */
function rot(n: XY, phi: number): XY {
  const c = dmath.cos(phi);
  const s = dmath.sin(phi);
  return { x: n.x * c - n.y * s, y: n.x * s + n.y * c };
}

/** A part from doubles: its points snapped, consecutive repeats dropped, counter-clockwise; null when it has no area. */
type Snapped = Ring | null | 'range';

function part(points: readonly XY[]): Snapped {
  const out: LatticePoint[] = [];
  for (const q of points) {
    const s = snap(q.x, q.y);
    if (!s.ok) return 'range';
    const last = out[out.length - 1];
    if (last === undefined || last.x !== s.value.x || last.y !== s.value.y) out.push(s.value);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  if (out.length < 3) return null;
  const a = area2(out);
  if (a === 0) return null;
  return a > 0 ? out : out.reverse();
}

/** The largest |coordinate| a part may keep once clipped to the lattice (§3.2 (1): |v| < 2²³). */
const RANGE_IN = 8_388_607;

/**
 * A convex part clipped to the lattice's box |x|, |y| ≤ 2²³ − 1 (Sutherland–Hodgman on the box's four sides, in
 * doubles; every new point lies on a side, its other coordinate rounded later by `snap`). Used only where the region
 * that matters lies inside the lattice — `offsetFace`'s parts are subtracted from a face, which lies inside it — so
 * the clip changes nothing a caller keeps (C-0193 (3)).
 */
function clipToLattice(points: readonly XY[]): XY[] {
  let pts = points.slice();
  const sides: [number, number, number][] = [
    [1, 0, RANGE_IN],
    [-1, 0, RANGE_IN],
    [0, 1, RANGE_IN],
    [0, -1, RANGE_IN],
  ];
  for (const [ax, ay, lim] of sides) {
    if (pts.length === 0) break;
    const out: XY[] = [];
    for (let i = 0; i < pts.length; i += 1) {
      const p = pts[i];
      const q = pts[(i + 1) % pts.length];
      const fp = ax * p.x + ay * p.y - lim;
      const fq = ax * q.x + ay * q.y - lim;
      if (fp <= 0) out.push(p);
      if ((fp < 0 && fq > 0) || (fp > 0 && fq < 0)) {
        const t = fp / (fp - fq);
        const x = p.x + t * (q.x - p.x);
        const y = p.y + t * (q.y - p.y);
        out.push(ax !== 0 ? { x: ax * lim, y } : { x, y: ay * lim });
      }
    }
    pts = out;
  }
  return pts;
}

/** The arc from `first` turning by `sweep` (signed radians) about v on radius w, from v as a fan or (fromCentre false) alone. */
function arcPoints(v: XY, w: number, n1: XY, sweep: number, first: XY, last: XY, fromCentre: boolean): XY[] {
  const m = arcSteps(Math.abs(sweep), w);
  const pts: XY[] = fromCentre ? [v, first] : [first];
  for (let k = 1; k < m; k += 1) {
    const t = ratio(sweep * k, m, 'count');
    const n = rot(n1, t.ok ? t.value : 0);
    pts.push({ x: v.x + n.x * w, y: v.y + n.y * w });
  }
  pts.push(last);
  return pts;
}

/** The join at vertex v between incoming direction u1 and outgoing u2 (turn: +1 left, −1 right, 0 reversal). */
function joinPoints(v: XY, u1: XY, u2: XY, turn: number, w: number, joins: JoinKind): XY[] {
  // The outer side: the right for a left turn and for a reversal, the left for a right turn.
  const outerRight = turn >= 0;
  const n1: XY = outerRight ? { x: u1.y, y: -u1.x } : { x: -u1.y, y: u1.x };
  const n2: XY = outerRight ? { x: u2.y, y: -u2.x } : { x: -u2.y, y: u2.x };
  const e1 = outerRight ? right(v, u1, w) : left(v, u1, w);
  const e2 = outerRight ? right(v, u2, w) : left(v, u2, w);
  const cross = u1.x * u2.y - u1.y * u2.x;
  const dot = u1.x * u2.x + u1.y * u2.y;
  const theta = turn === 0 ? PI : dmath.atan2(Math.abs(cross), dot); // the turn, (0, π]
  if (joins === 'round') return arcPoints(v, w, n1, outerRight ? theta : -theta, e1, e2, true);
  // The bisector of the outer normals (ahead of the vertex for a reversal).
  const b: XY = turn === 0 ? { x: u1.x, y: u1.y } : (unitOf({ x: n1.x + n2.x, y: n1.y + n2.y }) ?? { x: u1.x, y: u1.y });
  const cosHalf = n1.x * b.x + n1.y * b.y; // cos(θ/2): the miter point lies w ÷ cos(θ/2) from v
  if (joins === 'miter' && cosHalf >= 0.5) {
    const d = div(w, cosHalf) ?? 2 * w;
    return [v, e1, { x: v.x + b.x * d, y: v.y + b.y * d }, e2];
  }
  const cut = joins === 'square' ? w : 2 * w;
  // e1 + t1·u1 and e2 − t2·u2 on the cut line (x − v)·b = cut.
  const t1 = div(cut - w * cosHalf, u1.x * b.x + u1.y * b.y) ?? 0;
  const t2 = div(w * (n2.x * b.x + n2.y * b.y) - cut, u2.x * b.x + u2.y * b.y) ?? 0;
  const c1: XY = { x: e1.x + u1.x * t1, y: e1.y + u1.y * t1 };
  const c2: XY = { x: e2.x - u2.x * t2, y: e2.y - u2.y * t2 };
  return [v, e1, c1, c2, e2];
}

/** The end at point p, d pointing out of the chain; null for a flat end. */
function endPoints(p: XY, d: XY, w: number, ends: EndKind): XY[] | null {
  if (ends === 'flat') return null;
  const r = right(p, d, w);
  const l = left(p, d, w);
  if (ends === 'square') return [r, { x: r.x + d.x * w, y: r.y + d.y * w }, { x: l.x + d.x * w, y: l.y + d.y * w }, l, p];
  return [...arcPoints(p, w, { x: d.y, y: -d.x }, PI, r, l, false), p];
}

/** Half-widths per chain point; a RangeError unless one non-negative finite number, or one per input point. */
function widthsPerChain(chains: readonly (readonly LatticePoint[])[], halfWidthCm: number | readonly number[]): number[][] {
  const bad = (): never => {
    throw new RangeError('buffer: a half-width is a finite number ≥ 0 — one for every point, or one per input point of the chains in order');
  };
  if (typeof halfWidthCm === 'number') {
    if (!(halfWidthCm >= 0 && halfWidthCm < Infinity)) bad();
    return chains.map((c) => c.map(() => halfWidthCm));
  }
  const total = chains.reduce((s, c) => s + c.length, 0);
  if (halfWidthCm.length !== total) bad();
  const out: number[][] = [];
  let k = 0;
  for (const c of chains) {
    const ws: number[] = [];
    for (let i = 0; i < c.length; i += 1) {
      const w = halfWidthCm[k];
      k += 1;
      if (!(w >= 0 && w < Infinity)) bad();
      ws.push(w);
    }
    out.push(ws);
  }
  return out;
}

/**
 * §3.7's parts of the buffer — strips, joins and ends — as counter-clockwise lattice rings (parts with no area after
 * snapping dropped); E_OUT_OF_RANGE for an input point off the lattice or a part point beyond it.
 */
export function bufferParts(
  chains: readonly (readonly LatticePoint[])[],
  halfWidthCm: number | readonly number[],
  joins: JoinKind,
  ends: EndKind,
): KernelResult<Ring[]> {
  if (joins !== 'round' && joins !== 'square' && joins !== 'miter') throw new RangeError(`buffer: unknown join ${String(joins)}`);
  if (ends !== 'round' && ends !== 'square' && ends !== 'flat') throw new RangeError(`buffer: unknown end ${String(ends)}`);
  for (const c of chains) {
    const bad = offLattice<Ring[]>(c);
    if (bad !== null) return bad;
  }
  const widths = widthsPerChain(chains, halfWidthCm);
  const parts: Ring[] = [];
  let range = false;
  const push = (pts: XY[] | null): void => {
    if (pts === null) return;
    const r = part(pts);
    if (r === 'range') range = true;
    else if (r !== null) parts.push(r);
  };
  chains.forEach((chain, ci) => {
    const pts: XY[] = [];
    const ws: number[] = [];
    chain.forEach((p, i) => {
      const q = pts[pts.length - 1];
      if (q !== undefined && q.x === p.x && q.y === p.y) return;
      pts.push({ x: p.x, y: p.y });
      ws.push(widths[ci][i]);
    });
    const n = pts.length;
    if (n < 2) return;
    const dirs: XY[] = [];
    for (let i = 0; i + 1 < n; i += 1) dirs.push(unitOf({ x: pts[i + 1].x - pts[i].x, y: pts[i + 1].y - pts[i].y }) as XY);
    for (let i = 0; i + 1 < n; i += 1) {
      const p = pts[i];
      const q = pts[i + 1];
      const u = dirs[i];
      push([left(p, u, ws[i]), p, right(p, u, ws[i]), right(q, u, ws[i + 1]), q, left(q, u, ws[i + 1])]);
    }
    for (let i = 1; i + 1 < n; i += 1) {
      const w = ws[i];
      if (!(w > 0)) continue;
      const a = pts[i - 1];
      const v = pts[i];
      const b = pts[i + 1];
      const o = orient2d(a.x, a.y, v.x, v.y, b.x, b.y);
      const forward = (v.x - a.x) * (b.x - v.x) + (v.y - a.y) * (b.y - v.y);
      if (o === 0 && forward > 0) continue; // straight on: no join
      push(joinPoints(v, dirs[i - 1], dirs[i], o > 0 ? 1 : o < 0 ? -1 : 0, w, joins));
    }
    if (ws[0] > 0) push(endPoints(pts[0], { x: -dirs[0].x, y: -dirs[0].y }, ws[0], ends));
    if (ws[n - 1] > 0) push(endPoints(pts[n - 1], dirs[n - 2], ws[n - 1], ends));
  });
  if (range) return { ok: false, code: 'E_OUT_OF_RANGE', detail: 'buffer' };
  return ok(parts);
}

/**
 * The parts of ⋃ buffer(edgeᵢ, dᵢ) with round ends over closed rings (`offsetFace`'s, C-0193 (3)). A segment widened
 * with round ends is its strip and a disc at each end point, so the union is every edge's strip at its own distance and,
 * at every vertex, the two edges' discs. Where the vertex's two distances are equal and neither edge is shorter than
 * that distance, the two strips already cover the disc but for the sector on the outer side of the turn, so that sector
 * alone is added — the round join of `buffer`, anchored on the strips' own corners, so neighbouring parts meet at
 * identical lattice points and the overlay attracts nothing there; elsewhere each edge's round end cap is added at the
 * vertex. `perEdge` lists one distance per edge, ring after ring, edge i from vertex i to vertex i + 1.
 */
export function ringEdgeParts(rings: readonly (readonly LatticePoint[])[], perEdge: readonly number[]): KernelResult<Ring[]> {
  const parts: Ring[] = [];
  let range = false;
  const push = (pts: XY[] | null): void => {
    if (pts === null) return;
    const r = part(clipToLattice(pts));
    if (r === 'range') range = true;
    else if (r !== null) parts.push(r);
  };
  let k = 0;
  for (const ring of rings) {
    const bad = offLattice<Ring[]>(ring);
    if (bad !== null) return bad;
    const n = ring.length;
    const pts: XY[] = ring.map((p) => ({ x: p.x, y: p.y }));
    const ds = perEdge.slice(k, k + n);
    k += n;
    const dirs: (XY | null)[] = [];
    const lens: number[] = [];
    for (let i = 0; i < n; i += 1) {
      const q = pts[i + 1 === n ? 0 : i + 1];
      const dx = q.x - pts[i].x;
      const dy = q.y - pts[i].y;
      dirs.push(unitOf({ x: dx, y: dy }));
      lens.push(Math.sqrt(dx * dx + dy * dy));
    }
    for (let i = 0; i < n; i += 1) {
      const u = dirs[i];
      const w = ds[i];
      if (u === null || !(w > 0)) continue;
      const p = pts[i];
      const q = pts[i + 1 === n ? 0 : i + 1];
      push([left(p, u, w), p, right(p, u, w), right(q, u, w), q, left(q, u, w)]);
    }
    for (let i = 0; i < n; i += 1) {
      const b = i === 0 ? n - 1 : i - 1;
      const v = pts[i];
      const u1 = dirs[b];
      const u2 = dirs[i];
      const w1 = ds[b];
      const w2 = ds[i];
      if (u1 !== null && u2 !== null && w1 === w2 && w1 > 0 && lens[b] >= w1 && lens[i] >= w1) {
        const a = pts[b];
        const c = pts[i + 1 === n ? 0 : i + 1];
        const o = orient2d(a.x, a.y, v.x, v.y, c.x, c.y);
        const forward = (v.x - a.x) * (c.x - v.x) + (v.y - a.y) * (c.y - v.y);
        if (o === 0 && forward > 0) continue; // straight on: the strips cover the disc
        push(joinPoints(v, u1, u2, o > 0 ? 1 : o < 0 ? -1 : 0, w1, 'round'));
        continue;
      }
      if (u1 !== null && w1 > 0) push(endPoints(v, u1, w1, 'round'));
      if (u2 !== null && w2 > 0) push(endPoints(v, { x: -u2.x, y: -u2.y }, w2, 'round'));
    }
  }
  if (range) return { ok: false, code: 'E_OUT_OF_RANGE', detail: 'buffer' };
  return ok(parts);
}

/**
 * §3.4's `buffer`: the union of §3.7's strips, joins and ends of the chains, as rings (outer counter-clockwise, holes
 * clockwise); a buffer with nothing in it — no chain of two distinct points with a positive half-width — is
 * E_DEGENERATE `empty` (§3.11), carrying the overlay's warnings.
 */
export function buffer(
  chains: readonly (readonly LatticePoint[])[],
  halfWidthCm: Cm | number | readonly (Cm | number)[],
  joins: JoinKind,
  ends: EndKind,
): KernelResult<Ring[]> {
  const parts = bufferParts(chains, halfWidthCm, joins, ends);
  if (!parts.ok) return parts;
  const r = overlayRegion([parts.value], (w) => w[0] !== 0);
  if (!r.ok) return r;
  if (r.value.length === 0) return emptyResult(r.warnings);
  return ok(r.value, r.warnings);
}
