// The curves (§3.1: "Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, … circular fillets — build";
// §17.1 (8): G. M. Chaikin, "An algorithm for high-speed curve generation", CGIP 3 (1974); the centripetal
// parameterisation of C. Yuksel, S. Schaefer and J. Keyser, "Parameterization and applications of Catmull–Rom curves",
// CAD 43 (2011), with its Bézier form; pinned-vertex Laplacian smoothing). M0-a-10; C-0159 (8). Each is a pure
// point-list operation on values in cm: its result re-enters an arena only through insertChain, which snaps it (§3.6),
// and smoothing committed geometry is a warp (§3.6). Visvalingam–Whyatt `simplify` reads the index and is M0-a-13's.
import { dmath } from '../dmath/index.js';
import { LATTICE, ratio } from '../num/index.js';
import { unitOf, type XY } from './common.js';

/** Corner cutting at ¼ and ¾ of every edge, `iterations` times (default 1). An open polyline keeps both ends. */
export function chaikin(points: readonly XY[], opts: { closed: boolean; iterations?: number }): XY[] {
  const it = opts.iterations ?? 1;
  if (!(Number.isInteger(it) && it >= 0 && it <= 16)) throw new RangeError(`chaikin: iterations must be an integer in [0, 16], got ${String(it)}`);
  let cur: XY[] = points.map((p) => ({ x: p.x, y: p.y }));
  for (let r = 0; r < it; r += 1) {
    const n = cur.length;
    if (n < 2 || (opts.closed && n < 3)) break;
    const next: XY[] = [];
    if (!opts.closed) next.push(cur[0]);
    const edges = opts.closed ? n : n - 1;
    for (let i = 0; i < edges; i += 1) {
      const a = cur[i];
      const b = cur[i + 1 === n ? 0 : i + 1];
      const q = { x: 0.75 * a.x + 0.25 * b.x, y: 0.75 * a.y + 0.25 * b.y };
      const s = { x: 0.25 * a.x + 0.75 * b.x, y: 0.25 * a.y + 0.75 * b.y };
      // An open polyline's end edges keep their end: only the inner quarter point is cut there.
      if (opts.closed || i > 0) next.push(q);
      if (opts.closed || i < edges - 1) next.push(s);
    }
    if (!opts.closed) next.push(cur[n - 1]);
    cur = next;
  }
  return cur;
}

/** One cubic Bézier segment. */
export interface Cubic {
  p0: XY;
  c1: XY;
  c2: XY;
  p1: XY;
}

/** The points with consecutive points closer than 1 cm merged (the first kept), and a closed list's closing repeat. */
function spaced(points: readonly XY[], closed: boolean): XY[] {
  const out: XY[] = [];
  const far = (a: XY, b: XY): boolean => (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) >= 1;
  for (const p of points) if (out.length === 0 || far(out[out.length - 1], p)) out.push({ x: p.x, y: p.y });
  if (closed) while (out.length > 1 && !far(out[0], out[out.length - 1])) out.pop();
  return out;
}

/**
 * The centripetal Catmull–Rom spline through the points (α = ½: knot intervals √|Pᵢ₊₁ − Pᵢ|), as one cubic Bézier per
 * span, each span from one control point to the next — so the curve passes through every control point. Consecutive
 * points closer than 1 cm are merged first; an open spline's end spans take reflected phantom points (straight ends).
 * Fewer than 2 points (3 when closed) give no span.
 */
export function catmullRom(points: readonly XY[], opts: { closed: boolean }): Cubic[] {
  const P = spaced(points, opts.closed);
  const n = P.length;
  if (n < 2 || (opts.closed && n < 3)) return [];
  const at = (i: number): XY => {
    if (opts.closed) return P[((i % n) + n) % n];
    if (i < 0) return { x: 2 * P[0].x - P[1].x, y: 2 * P[0].y - P[1].y };
    if (i >= n) return { x: 2 * P[n - 1].x - P[n - 2].x, y: 2 * P[n - 1].y - P[n - 2].y };
    return P[i];
  };
  const knot = (a: XY, b: XY): number => Math.sqrt(Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)));
  const q = (v: number, d: number): number => {
    const r = ratio(v, d, 'length');
    return r.ok ? r.value : 0; // every interval ≥ 1: points are ≥ 1 cm apart
  };
  const spans = opts.closed ? n : n - 1;
  const out: Cubic[] = [];
  for (let i = 0; i < spans; i += 1) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const d0 = knot(p0, p1);
    const d1 = knot(p1, p2);
    const d2 = knot(p2, p3);
    // Tangents scaled to the span's interval d1 (Yuksel et al.'s form): m1 at p1, m2 at p2.
    const m1x = d1 * (q(p1.x - p0.x, d0) - q(p2.x - p0.x, d0 + d1) + q(p2.x - p1.x, d1));
    const m1y = d1 * (q(p1.y - p0.y, d0) - q(p2.y - p0.y, d0 + d1) + q(p2.y - p1.y, d1));
    const m2x = d1 * (q(p2.x - p1.x, d1) - q(p3.x - p1.x, d1 + d2) + q(p3.x - p2.x, d2));
    const m2y = d1 * (q(p2.y - p1.y, d1) - q(p3.y - p1.y, d1 + d2) + q(p3.y - p2.y, d2));
    out.push({
      p0: { x: p1.x, y: p1.y },
      c1: { x: p1.x + m1x / 3, y: p1.y + m1y / 3 },
      c2: { x: p2.x - m2x / 3, y: p2.y - m2y / 3 },
      p1: { x: p2.x, y: p2.y },
    });
  }
  return out;
}

/**
 * The cubics sampled at `perSegment` equal parameter steps each (≥ 1): the first span's start, then each span's
 * interior samples and its end — so every span's end point is a sample, exactly.
 */
export function sampleCubics(cubics: readonly Cubic[], perSegment: number): XY[] {
  if (!(Number.isInteger(perSegment) && perSegment >= 1)) throw new RangeError(`sampleCubics: perSegment must be an integer ≥ 1, got ${String(perSegment)}`);
  const out: XY[] = [];
  if (cubics.length === 0) return out;
  out.push({ x: cubics[0].p0.x, y: cubics[0].p0.y });
  for (const c of cubics) {
    for (let k = 1; k < perSegment; k += 1) {
      const tr = ratio(k, perSegment, 'count');
      const t = tr.ok ? tr.value : 0;
      const u = 1 - t;
      const b0 = u * u * u;
      const b1 = 3 * u * u * t;
      const b2 = 3 * u * t * t;
      const b3 = t * t * t;
      out.push({ x: b0 * c.p0.x + b1 * c.c1.x + b2 * c.c2.x + b3 * c.p1.x, y: b0 * c.p0.y + b1 * c.c1.y + b2 * c.c2.y + b3 * c.p1.y });
    }
    out.push({ x: c.p1.x, y: c.p1.y });
  }
  return out;
}

/**
 * Pinned-vertex Laplacian smoothing: `iterations` (default 1) simultaneous steps, each moving every free vertex by
 * `lambda` (default ½, in (0, 1]) of the way toward its two neighbours' midpoint. The pinned indices never move, nor
 * do an open polyline's two ends.
 */
export function laplacianPinned(
  points: readonly XY[],
  opts: { closed: boolean; pinned?: readonly number[]; iterations?: number; lambda?: number },
): XY[] {
  const it = opts.iterations ?? 1;
  const lambda = opts.lambda ?? 0.5;
  if (!(Number.isInteger(it) && it >= 0)) throw new RangeError(`laplacianPinned: iterations must be an integer ≥ 0, got ${String(it)}`);
  if (!(lambda > 0 && lambda <= 1)) throw new RangeError(`laplacianPinned: lambda must lie in (0, 1], got ${String(lambda)}`);
  const n = points.length;
  const fixed = new Uint8Array(n);
  for (const i of opts.pinned ?? []) if (Number.isInteger(i) && i >= 0 && i < n) fixed[i] = 1;
  if (!opts.closed && n > 0) {
    fixed[0] = 1;
    fixed[n - 1] = 1;
  }
  let cur: XY[] = points.map((p) => ({ x: p.x, y: p.y }));
  if (n < 3) return cur;
  for (let r = 0; r < it; r += 1) {
    const next: XY[] = new Array<XY>(n);
    for (let i = 0; i < n; i += 1) {
      const p = cur[i];
      if (fixed[i] === 1) {
        next[i] = p;
        continue;
      }
      const a = cur[i === 0 ? n - 1 : i - 1];
      const b = cur[i + 1 === n ? 0 : i + 1];
      next[i] = { x: p.x + lambda * ((a.x + b.x) * 0.5 - p.x), y: p.y + lambda * ((a.y + b.y) * 0.5 - p.y) };
    }
    cur = next;
  }
  return cur;
}

/** A corner after `fillet`: the polyline from a to b, and whether the corner was rounded. */
export interface Fillet {
  points: XY[];
  filleted: boolean;
}

/**
 * A circular fillet at the corner k of the legs a–k and k–b (§3.1; §4.6 step 6): an arc tangent to both legs at
 * `tangentCm` from k (default: the shorter leg, so the arc spans it entirely — §4.6's rule), sampled in m ≥ 2 equal
 * chords no shorter than `chordCm` or the lattice minimum edge. The corner stays sharp (the polyline a, k, b, `filleted`
 * false) when a leg is shorter than the chord, the tangent length exceeds a leg or is not positive, the legs are
 * collinear or fold back — or turn so slightly that t·(1 + cos φ) is below ratio()'s 1 cm floor — or the arc would
 * hold fewer than three sample points. The radius follows from the legs: r = t · tan(φ ÷ 2), φ the corner's interior
 * angle. (A leg shorter than the chord already leaves fewer than three points — the arc r·δ is below 2t — so that test
 * is the rule's own statement, §3.1.)
 */
export function fillet(a: XY, k: XY, b: XY, opts: { chordCm: number; tangentCm?: number }): Fillet {
  const sharp: Fillet = { points: [{ x: a.x, y: a.y }, { x: k.x, y: k.y }, { x: b.x, y: b.y }], filleted: false };
  const chord = Math.max(opts.chordCm, LATTICE.minEdgeCm);
  if (!(chord < Infinity)) return sharp;
  const vax = a.x - k.x;
  const vay = a.y - k.y;
  const vbx = b.x - k.x;
  const vby = b.y - k.y;
  const la = Math.sqrt(vax * vax + vay * vay);
  const lb = Math.sqrt(vbx * vbx + vby * vby);
  if (!(la >= chord && lb >= chord)) return sharp;
  const t = opts.tangentCm ?? Math.min(la, lb);
  if (!(t > 0 && t <= la && t <= lb)) return sharp;
  const ua = unitOf({ x: vax, y: vay });
  const ub = unitOf({ x: vbx, y: vby });
  if (ua === null || ub === null) return sharp;
  const cosPhi = ua.x * ub.x + ua.y * ub.y;
  const crossAB = ua.x * ub.y - ua.y * ub.x;
  const sinPhi = Math.abs(crossAB);
  if (!(sinPhi > 1e-9)) return sharp; // collinear or folded back: no corner to round
  // r = t·sin φ ÷ (1 + cos φ), the denominator taken as the length t·(1 + cos φ) for ratio().
  const r = ratio(t * t * sinPhi, t * (1 + cosPhi), 'length');
  if (!r.ok) return sharp;
  const delta = dmath.atan2(sinPhi, -cosPhi); // the deflection, π − φ
  const mr = ratio(r.value * delta, chord, 'length'); // the arc's length in chords
  const m = mr.ok ? Math.floor(mr.value) : 0;
  if (m < 2) return sharp;
  const ta = { x: k.x + ua.x * t, y: k.y + ua.y * t };
  const tb = { x: k.x + ub.x * t, y: k.y + ub.y * t };
  // The centre: from ta along the leg's normal toward b's side, r away.
  const side = crossAB > 0 ? 1 : -1;
  const nx = -ua.y * side;
  const ny = ua.x * side;
  const cx = ta.x + nx * r.value;
  const cy = ta.y + ny * r.value;
  const rx = ta.x - cx;
  const ry = ta.y - cy;
  // Sweep from ta to tb: the turn's sign from (ta − c) to (tb − c).
  const sweep = (rx * (tb.y - cy) - ry * (tb.x - cx)) >= 0 ? 1 : -1;
  const pts: XY[] = [{ x: a.x, y: a.y }];
  if (t < la) pts.push(ta);
  for (let j = 1; j < m; j += 1) {
    const ang = ratio(delta * j, m, 'count');
    const th = (ang.ok ? ang.value : 0) * sweep;
    const c = dmath.cos(th);
    const s = dmath.sin(th);
    pts.push({ x: cx + rx * c - ry * s, y: cy + rx * s + ry * c });
  }
  if (t < lb) pts.push(tb);
  pts.push({ x: b.x, y: b.y });
  return { points: pts, filleted: true };
}
