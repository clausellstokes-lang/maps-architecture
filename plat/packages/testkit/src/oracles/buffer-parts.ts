// §3.7's buffer as the union of its parts (M0-k-03; C-0144 (4)): "the union of per-segment strips — each segment
// widened by its half-width on both sides — and per-vertex joins", with the ends at each chain's two end points. This
// file builds the parts, in doubles, every one counter-clockwise; each oracle unions them with its own boolean. Parts
// that meet share their meeting edges exactly: every strip, join and end carries its chain point as a vertex and
// computes each offset point by the one expression its neighbours use, so the union never sees two nearly-collinear
// edges where the construction meant one (polygon-clipping's sweep in doubles stalls on those).
// * A chain is open: its first and last points are its ends even when they coincide. Consecutive duplicate points are
//   dropped (the first one's half-width kept); a chain left with fewer than two distinct points has no segment and so
//   no strip, no join and no end — it adds nothing.
// * Half-widths: one for every point, or one per input point of the chains in order (§3.4's `Cm[]`, chain after
//   chain); a segment's strip is the trapezoid between its two ends' half-widths (§3.7).
// * Round joins and ends are chords of at most 2 cm sagitta with their vertices on the circle, in equal angular steps
//   from one leg's offset point to the other's — the construction ours is expected to share, so the two differ by
//   rounding only.
// * A square join cuts the corner perpendicular to the bisector at the half-width from the vertex; a miter join runs
//   the two outer edges to their meeting point, cut the same way at twice the half-width where they would meet
//   farther; a square end extends the strip by the half-width; a flat end stops at the point. A reversal (a 180° turn)
//   joins ahead of the vertex. With varying half-widths a join's legs follow the segments' directions at the vertex's
//   own half-width.
import { orient2d } from '@plat/kernel';
import type { EndKind, JoinKind, RingLike } from './types.js';

export type Pt = [number, number];

/** §3.7: "round joins and ends are chords of at most 2 cm sagitta". */
export const SAGITTA_CM = 2;

/** The largest angular step whose chord on radius r has a sagitta of at most `SAGITTA_CM` (at most π). */
export function maxArcStep(r: number): number {
  const c = 1 - SAGITTA_CM / r;
  return c <= -1 ? Math.PI : Math.min(Math.PI, 2 * Math.acos(c));
}

/** The number of equal steps an arc of `theta` radians on radius r takes. */
export function arcSteps(theta: number, r: number): number {
  return Math.max(1, Math.ceil(theta / maxArcStep(r) - 1e-12));
}

type Dir = { x: number; y: number };

/** The point w to the right of p across direction u. */
function right(p: Dir, u: Dir, w: number): Pt {
  return [p.x + u.y * w, p.y - u.x * w];
}

/** The point w to the left of p across direction u. */
function left(p: Dir, u: Dir, w: number): Pt {
  return [p.x - u.y * w, p.y + u.x * w];
}

function unit(a: Dir, b: Dir): Dir {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  return { x: dx / len, y: dy / len };
}

/** Rotates the unit vector n by phi radians (counter-clockwise when positive). */
function rot(n: Dir, phi: number): Dir {
  const c = Math.cos(phi);
  const s = Math.sin(phi);
  return { x: n.x * c - n.y * s, y: n.x * s + n.y * c };
}

/** The signed area of a polygon in doubles (a convex part's orientation, never a topology decision of the kernel). */
function signedArea(poly: readonly Pt[]): number {
  let s = 0;
  for (let i = 0; i < poly.length; i += 1) {
    const [ax, ay] = poly[i];
    const [bx, by] = poly[(i + 1) % poly.length];
    s += ax * by - bx * ay;
  }
  return s / 2;
}

/** The polygon without consecutive repeated points (a strip of zero half-width at one end is a triangle). */
function distinct(poly: Pt[]): Pt[] {
  const out: Pt[] = [];
  for (const p of poly) {
    const q = out[out.length - 1];
    if (q === undefined || q[0] !== p[0] || q[1] !== p[1]) out.push(p);
  }
  while (out.length > 1 && out[0][0] === out[out.length - 1][0] && out[0][1] === out[out.length - 1][1]) out.pop();
  return out;
}

/** The part counter-clockwise, or null when it has no area. */
function ccw(poly: Pt[]): Pt[] | null {
  const a = signedArea(poly);
  if (!(Math.abs(a) > 0)) return null;
  return a > 0 ? poly : poly.slice().reverse();
}

/** Half-widths per chain point, or an error string when they are not one non-negative finite number per point. */
export function widthsPerChain(chains: readonly RingLike[], halfWidthCm: number | readonly number[]): number[][] | string {
  if (typeof halfWidthCm === 'number') {
    if (!(Number.isFinite(halfWidthCm) && halfWidthCm >= 0)) return 'half-width';
    return chains.map((c) => c.map(() => halfWidthCm));
  }
  const total = chains.reduce((s, c) => s + c.length, 0);
  if (halfWidthCm.length !== total) return 'half-widths: one per input point';
  const out: number[][] = [];
  let k = 0;
  for (const c of chains) {
    const ws: number[] = [];
    for (let i = 0; i < c.length; i += 1) {
      const w = halfWidthCm[k];
      k += 1;
      if (!(Number.isFinite(w) && w >= 0)) return 'half-width';
      ws.push(w);
    }
    out.push(ws);
  }
  return out;
}

/** The arc part from v + w·n1 turning by sweep (signed radians) about v, as a fan from v (or, `fromCentre` false, the arc alone). */
function arcPart(v: Dir, w: number, n1: Dir, sweep: number, first: Pt, last: Pt, fromCentre: boolean): Pt[] {
  const m = arcSteps(Math.abs(sweep), w);
  const pts: Pt[] = fromCentre ? [[v.x, v.y], first] : [first];
  for (let k = 1; k < m; k += 1) {
    const n = rot(n1, (sweep * k) / m);
    pts.push([v.x + n.x * w, v.y + n.y * w]);
  }
  pts.push(last);
  return pts;
}

/** The join at vertex v between incoming direction u1 and outgoing u2 (turn: +1 left, −1 right, 0 reversal). */
function joinPart(v: Dir, u1: Dir, u2: Dir, turn: number, w: number, joins: JoinKind): Pt[] | null {
  // The outer side: the right for a left turn and for a reversal, the left for a right turn.
  const outerRight = turn >= 0;
  const n1: Dir = outerRight ? { x: u1.y, y: -u1.x } : { x: -u1.y, y: u1.x };
  const n2: Dir = outerRight ? { x: u2.y, y: -u2.x } : { x: -u2.y, y: u2.x };
  const e1 = outerRight ? right(v, u1, w) : left(v, u1, w);
  const e2 = outerRight ? right(v, u2, w) : left(v, u2, w);
  const cross = u1.x * u2.y - u1.y * u2.x;
  const dot = u1.x * u2.x + u1.y * u2.y;
  const theta = turn === 0 ? Math.PI : Math.atan2(Math.abs(cross), dot); // the turn, (0, π]
  if (joins === 'round') {
    const sweep = outerRight ? theta : -theta; // n1 → n2: counter-clockwise on the right side, clockwise on the left
    return ccw(arcPart(v, w, n1, sweep, e1, e2, true));
  }
  // The bisector of the outer normals (ahead of the vertex for a reversal).
  let b: Dir;
  if (turn === 0) b = { x: u1.x, y: u1.y };
  else {
    const bx = n1.x + n2.x;
    const by = n1.y + n2.y;
    const bl = Math.hypot(bx, by);
    b = { x: bx / bl, y: by / bl };
  }
  const cosHalf = n1.x * b.x + n1.y * b.y; // cos(θ/2): the miter point lies w / cos(θ/2) from v
  if (joins === 'miter' && cosHalf >= 0.5) {
    const d = w / cosHalf;
    return ccw([[v.x, v.y], e1, [v.x + b.x * d, v.y + b.y * d], e2]);
  }
  const cut = joins === 'square' ? w : 2 * w;
  // e1 + t1·u1 and e2 − t2·u2 on the cut line (x − v)·b = cut.
  const t1 = (cut - w * cosHalf) / (u1.x * b.x + u1.y * b.y);
  const t2 = (w * (n2.x * b.x + n2.y * b.y) - cut) / (u2.x * b.x + u2.y * b.y);
  const c1: Pt = [e1[0] + u1.x * t1, e1[1] + u1.y * t1];
  const c2: Pt = [e2[0] - u2.x * t2, e2[1] - u2.y * t2];
  return ccw([[v.x, v.y], e1, c1, c2, e2]);
}

/** The end at point p, d pointing out of the chain. */
function endPart(p: Dir, d: Dir, w: number, ends: EndKind): Pt[] | null {
  if (ends === 'flat') return null;
  const r = right(p, d, w);
  const l = left(p, d, w);
  if (ends === 'square') {
    return ccw([r, [r[0] + d.x * w, r[1] + d.y * w], [l[0] + d.x * w, l[1] + d.y * w], l, [p.x, p.y]]);
  }
  const nR: Dir = { x: d.y, y: -d.x };
  return ccw([...arcPart(p, w, nR, Math.PI, r, l, false), [p.x, p.y]]);
}

/**
 * The buffer's parts — strips, joins and ends — each counter-clockwise in doubles, or an error string for a refused
 * input (half-widths not one non-negative finite number per point).
 */
export function bufferParts(
  chains: readonly RingLike[],
  halfWidthCm: number | readonly number[],
  joins: JoinKind,
  ends: EndKind,
): Pt[][] | string {
  const widths = widthsPerChain(chains, halfWidthCm);
  if (typeof widths === 'string') return widths;
  const parts: Pt[][] = [];
  chains.forEach((chain, ci) => {
    const pts: Dir[] = [];
    const ws: number[] = [];
    chain.forEach((p, i) => {
      const q = pts[pts.length - 1];
      if (q !== undefined && q.x === p.x && q.y === p.y) return;
      pts.push({ x: p.x, y: p.y });
      ws.push(widths[ci][i]);
    });
    const n = pts.length;
    if (n < 2) return;
    const dirs: Dir[] = [];
    for (let i = 0; i + 1 < n; i += 1) dirs.push(unit(pts[i], pts[i + 1]));
    for (let i = 0; i + 1 < n; i += 1) {
      const p = pts[i];
      const q = pts[i + 1];
      const u = dirs[i];
      const strip = ccw(
        distinct([left(p, u, ws[i]), [p.x, p.y], right(p, u, ws[i]), right(q, u, ws[i + 1]), [q.x, q.y], left(q, u, ws[i + 1])]),
      );
      if (strip !== null) parts.push(strip);
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
      const part = joinPart(v, dirs[i - 1], dirs[i], o > 0 ? 1 : o < 0 ? -1 : 0, w, joins);
      if (part !== null) parts.push(part);
    }
    if (ws[0] > 0) {
      const d = dirs[0];
      const part = endPart(pts[0], { x: -d.x, y: -d.y }, ws[0], ends);
      if (part !== null) parts.push(part);
    }
    if (ws[n - 1] > 0) {
      const part = endPart(pts[n - 1], dirs[n - 2], ws[n - 1], ends);
      if (part !== null) parts.push(part);
    }
  });
  return parts;
}
