// The water polygon's fast construction (M0-e-03; C-0229 (2)): a body's shore ring as the two offset lines of its
// (simplified) course at half its width — the left line out, the right line back — with mitred joins (a bevel past twice
// the half-width), the small loops a tight inner bend makes erased, a round or flat cap at each end, clipped to the
// arena's rectangle, and a tributary's mouth cut along the shore of the river it joins. It is the same region the
// kernel's `buffer` (§3.4; M0-a-08) unites strip by strip, built in one pass: the arrangement's union costs ≈ 10 s and
// its clip ≈ 20 s on a CITY river (≈ 800 course points, measured), the offset ring milliseconds. Every result is
// checked simple — no two non-adjacent segments meet — and clear of the earlier bodies' rings but at a mouth; a ring
// that fails is refused (null) and the caller takes the kernel's buffer and booleans for that body.
import { dmath, type LatticePoint } from '@plat/kernel';
import type { Cm } from '@plat/model';
import type { XY } from '../hydro/course.js';
import { area2, insideRings, quot, segDist2, type Reach } from './geometry.js';

/** A round cap's chords per half-turn. */
const CAP_STEPS = 12;

function sub(a: XY, b: XY): XY {
  return { x: a.x - b.x, y: a.y - b.y };
}

function unitOf(v: XY): XY | null {
  const len = Math.sqrt(v.x * v.x + v.y * v.y);
  if (len < 1) return null;
  return { x: quot(v.x, len), y: quot(v.y, len) };
}

/** The crossing of segments ab and cd (proper or touching), as the parameter along ab and the point, or null. */
export function segCross(a: XY, b: XY, c: XY, d: XY): { t: number; at: XY } | null {
  const rx = b.x - a.x;
  const ry = b.y - a.y;
  const sx = d.x - c.x;
  const sy = d.y - c.y;
  const den = rx * sy - ry * sx;
  const qx = c.x - a.x;
  const qy = c.y - a.y;
  if (den === 0) return null;
  // scaled so the divisor clears ratio's floor whatever the segments' lengths
  const t = quot((qx * sy - qy * sx) * 1024, den * 1024);
  const u = quot((qx * ry - qy * rx) * 1024, den * 1024);
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { t, at: { x: a.x + rx * t, y: a.y + ry * t } };
}

/** The offset lines of a chain: per point, its left and right offset point (one, or two at a bevel). */
function offsets(pts: readonly XY[], half: readonly number[], startNormal?: XY, endNormal?: XY): { left: XY[]; right: XY[] } | null {
  const n = pts.length;
  const dirs: XY[] = [];
  for (let i = 0; i + 1 < n; i += 1) {
    const u = unitOf(sub(pts[i + 1], pts[i]));
    if (u === null) return null;
    dirs.push(u);
  }
  const left: XY[] = [];
  const right: XY[] = [];
  for (let i = 0; i < n; i += 1) {
    const h = half[i];
    const p = pts[i];
    let nPrev: XY | null = i > 0 ? { x: -dirs[i - 1].y, y: dirs[i - 1].x } : null;
    let nNext: XY | null = i < n - 1 ? { x: -dirs[i].y, y: dirs[i].x } : null;
    if (i === 0 && startNormal !== undefined) nNext = startNormal;
    if (i === n - 1 && endNormal !== undefined) nPrev = endNormal;
    if (nPrev === null || nNext === null) {
      const m = (nPrev ?? nNext) as XY;
      left.push({ x: p.x + m.x * h, y: p.y + m.y * h });
      right.push({ x: p.x - m.x * h, y: p.y - m.y * h });
      continue;
    }
    const sum = unitOf({ x: (nPrev.x + nNext.x) * 1024, y: (nPrev.y + nNext.y) * 1024 });
    const cosHalf = sum === null ? 0 : sum.x * nNext.x + sum.y * nNext.y;
    if (sum === null || cosHalf < 0.5) {
      // a turn past 120°: bevel on both sides (the inner side's overlap is erased as a loop)
      left.push({ x: p.x + nPrev.x * h, y: p.y + nPrev.y * h }, { x: p.x + nNext.x * h, y: p.y + nNext.y * h });
      right.push({ x: p.x - nPrev.x * h, y: p.y - nPrev.y * h }, { x: p.x - nNext.x * h, y: p.y - nNext.y * h });
      continue;
    }
    const len = quot(h * 1024, cosHalf * 1024);
    left.push({ x: p.x + sum.x * len, y: p.y + sum.y * len });
    right.push({ x: p.x - sum.x * len, y: p.y - sum.y * len });
  }
  return { left, right };
}

/**
 * An offset line with the loops of its inner bends erased — a loop the line makes where the bend is tighter than the
 * half-width lies inside the buffer when a sample of points inside it (a 5 × 5 grid over its box, those inside it) lies
 * within 1.5 times the chain's greatest half-width of the chain — and each loop that is not so covered kept as a hole:
 * a pocket of land a meander closes round (its own tight bends erased; a pocket inside a pocket refused, null).
 */
function eraseLoops(line: XY[], chain: readonly XY[], maxHalf: number, depth = 0): { line: XY[]; holes: XY[][] } | null {
  let q = line.slice();
  const holes: XY[][] = [];
  for (let guard = 0; guard < 10_000; guard += 1) {
    let cut: { i: number; j: number; at: XY } | null = null;
    const closed = q.length > 3 && q[0].x === q[q.length - 1].x && q[0].y === q[q.length - 1].y;
    outer: for (let i = 0; i + 1 < q.length; i += 1) {
      for (let j = i + 2; j + 1 < q.length; j += 1) {
        // a closed line's first and last segments meet at its shared end, which is no crossing
        if (closed && i === 0 && j === q.length - 2) continue;
        const x = segCross(q[i], q[i + 1], q[j], q[j + 1]);
        if (x !== null) {
          cut = { i, j, at: x.at };
          break outer;
        }
      }
    }
    if (cut === null) return { line: q, holes };
    const loop = [cut.at, ...q.slice(cut.i + 1, cut.j + 1)];
    if (!covered(loop, chain, maxHalf)) {
      // a pocket of land the river closes round: a hole of the polygon, its own tight bends erased
      if (depth > 0) {
        why = 'a pocket inside a pocket';
        return null;
      }
      const inner = eraseLoops([...loop, cut.at], chain, maxHalf, depth + 1);
      if (inner === null) return null;
      holes.push(inner.line.slice(0, inner.line.length - 1));
    }
    q = [...q.slice(0, cut.i + 1), cut.at, ...q.slice(cut.j + 1)];
  }
  why = 'too many loops';
  return null;
}

/** Why the last offset or mouth ring was refused (for the stage's report). */
let why = '';

/** The reason the last `offsetRing` or `mouthRing` returned null. */
export function refusal(): string {
  return why;
}

/** Is the loop's inside within 1.5 `h` of the chain, on a 5 × 5 sample (a mitre reaches past `h`; a pocket of land is farther)? */
function covered(loop: readonly XY[], chain: readonly XY[], h: number): boolean {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of loop) {
    x0 = Math.min(x0, p.x);
    y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, p.x);
    y1 = Math.max(y1, p.y);
  }
  const lim = 2.25 * h * h;
  for (let a = 1; a <= 5; a += 1) {
    for (let b = 1; b <= 5; b += 1) {
      const p = { x: x0 + ((x1 - x0) * a) / 6, y: y0 + ((y1 - y0) * b) / 6 };
      if (!insideRings([loop], p)) continue;
      let best = Infinity;
      for (let k = 0; k + 1 < chain.length && best > lim; k += 1) best = Math.min(best, segDist2(p, chain[k], chain[k + 1]));
      if (best > lim) return false;
    }
  }
  return true;
}

/** A round cap from `from` around centre c to `to` (the half-turn on the side away from `inward`). */
function cap(c: XY, from: XY, h: number, outward: XY): XY[] {
  const out: XY[] = [];
  const a = { x: quot(from.x - c.x, h), y: quot(from.y - c.y, h) };
  // the half-turn from `from` through the outward direction to the opposite point
  const turn = a.x * outward.y - a.y * outward.x >= 0 ? 1 : -1;
  for (let k = 1; k < CAP_STEPS; k += 1) {
    const th = (turn * 3.141592653589793 * k) / CAP_STEPS;
    const cs = dmath.cos(th);
    const sn = dmath.sin(th);
    out.push({ x: c.x + (a.x * cs - a.y * sn) * h, y: c.y + (a.x * sn + a.y * cs) * h });
  }
  return out;
}

/** The ends of a chain's ring: `round` a half-disc, `flat` the straight cut across. */
export type Cap = 'round' | 'flat';

/** The ring of a chain (counter-clockwise, doubles) or null (see the header). */
export function offsetRing(pts: readonly XY[], half: readonly number[], caps: [Cap, Cap], normals: { start?: XY; end?: XY } = {}): { ring: XY[]; holes: XY[][] } | null {
  const n = pts.length;
  if (n < 2) return null;
  why = '';
  const off = offsets(pts, half, normals.start, normals.end);
  if (off === null) {
    why = 'a repeated point';
    return null;
  }
  let maxH = 0;
  for (const h of half) if (h > maxH) maxH = h;
  const l = eraseLoops(off.left, pts, maxH);
  const r = eraseLoops(off.right, pts, maxH);
  if (l === null || r === null) return null;
  const left = l.line;
  const right = r.line;
  const ring: XY[] = [...right];
  const endDir = unitOf(sub(pts[n - 1], pts[n - 2])) as XY;
  if (caps[1] === 'round') ring.push(...cap(pts[n - 1], right[right.length - 1], half[n - 1], endDir));
  for (let i = left.length - 1; i >= 0; i -= 1) ring.push(left[i]);
  const startDir = unitOf(sub(pts[0], pts[1])) as XY;
  if (caps[0] === 'round') ring.push(...cap(pts[0], left[0], half[0], startDir));
  return { ring: area2(ring) < 0 ? ring.reverse() : ring, holes: [...l.holes, ...r.holes] };
}

/** The ring clipped to the arena's rectangle (Sutherland–Hodgman; the window is convex). */
export function clipToArena(ring: readonly XY[], reach: Reach): XY[] {
  let pts = ring.slice();
  const sides: [number, number, number][] = [
    [1, 0, reach.x],
    [-1, 0, reach.x],
    [0, 1, reach.y],
    [0, -1, reach.y],
  ];
  for (const [ax, ay, lim] of sides) {
    if (pts.length === 0) break;
    const out: XY[] = [];
    for (let i = 0; i < pts.length; i += 1) {
      const p = pts[i];
      const q = pts[i + 1 === pts.length ? 0 : i + 1];
      const dp = ax * p.x + ay * p.y - lim;
      const dq = ax * q.x + ay * q.y - lim;
      if (dp <= 0) out.push(p);
      if ((dp < 0 && dq > 0) || (dp > 0 && dq < 0)) {
        const t = quot(dp * 1024, (dp - dq) * 1024);
        const x = p.x + (q.x - p.x) * t;
        const y = p.y + (q.y - p.y) * t;
        // the crossing lies on the side exactly
        out.push(ax !== 0 ? { x: ax * lim, y } : { x, y: ay * lim });
      }
    }
    pts = out;
  }
  return pts;
}

/** A ring on the lattice: rounded, consecutive repeats and back-and-forth spikes dropped; null below three points. */
export function snapRing(ring: readonly XY[]): LatticePoint[] | null {
  const out: LatticePoint[] = [];
  for (const q of ring) {
    const p = { x: Math.round(q.x) as Cm, y: Math.round(q.y) as Cm };
    const last = out[out.length - 1];
    if (last !== undefined && last.x === p.x && last.y === p.y) continue;
    out.push(p);
    // a spike a → b → a
    while (out.length >= 3) {
      const a = out[out.length - 3];
      const c = out[out.length - 1];
      if (a.x !== c.x || a.y !== c.y) break;
      out.splice(out.length - 2, 2);
    }
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  if (out.length < 3 || area2(out) === 0) return null;
  return out;
}

/** The squared distance between two segments when they meet (0), else Infinity — the simplicity test's predicate. */
function meets(a: XY, b: XY, c: XY, d: XY): boolean {
  const o1 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const o2 = (b.x - a.x) * (d.y - a.y) - (b.y - a.y) * (d.x - a.x);
  const o3 = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
  const o4 = (d.x - c.x) * (b.y - c.y) - (d.y - c.y) * (b.x - c.x);
  if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) return true;
  const on = (p: XY, q: XY, r: XY): boolean => Math.min(p.x, q.x) <= r.x && r.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= r.y && r.y <= Math.max(p.y, q.y);
  return (o1 === 0 && on(a, b, c)) || (o2 === 0 && on(a, b, d)) || (o3 === 0 && on(c, d, a)) || (o4 === 0 && on(c, d, b));
}

/** Boxes of a ring's segments, for the pair tests' early outs. */
function boxes(ring: readonly XY[]): Float64Array {
  const n = ring.length;
  const b = new Float64Array(4 * n);
  for (let i = 0; i < n; i += 1) {
    const p = ring[i];
    const q = ring[i + 1 === n ? 0 : i + 1];
    b[4 * i] = Math.min(p.x, q.x);
    b[4 * i + 1] = Math.min(p.y, q.y);
    b[4 * i + 2] = Math.max(p.x, q.x);
    b[4 * i + 3] = Math.max(p.y, q.y);
  }
  return b;
}

/** Is the ring simple: no two non-adjacent segments meet, and adjacent ones only at their shared vertex? */
export function isSimple(ring: readonly XY[]): boolean {
  const n = ring.length;
  const b = boxes(ring);
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const a2 = ring[i + 1 === n ? 0 : i + 1];
    for (let j = i + 1; j < n; j += 1) {
      if (b[4 * j] > b[4 * i + 2] || b[4 * j + 2] < b[4 * i] || b[4 * j + 1] > b[4 * i + 3] || b[4 * j + 3] < b[4 * i + 1]) continue;
      const c = ring[j];
      const c2 = ring[j + 1 === n ? 0 : j + 1];
      const adjacent = j === i + 1 || (i === 0 && j === n - 1);
      if (!adjacent) {
        if (meets(a, a2, c, c2)) return false;
        continue;
      }
      // adjacent: they share one vertex; they must not fold back over each other (collinear, the far ends one way)
      const mid = j === i + 1 ? a2 : a;
      const e1 = j === i + 1 ? a : a2;
      const e2 = j === i + 1 ? c2 : c;
      const o = (e1.x - mid.x) * (e2.y - mid.y) - (e1.y - mid.y) * (e2.x - mid.x);
      if (o === 0 && (e1.x - mid.x) * (e2.x - mid.x) + (e1.y - mid.y) * (e2.y - mid.y) > 0) return false;
    }
  }
  return true;
}

/** Does any segment of ring a (except those flagged in `skip`) meet any segment of the rings `others`? */
export function meetsAny(a: readonly XY[], others: readonly (readonly XY[])[], skip?: (i: number) => boolean): boolean {
  const ba = boxes(a);
  for (const r of others) {
    const br = boxes(r);
    const m = r.length;
    for (let i = 0; i < a.length; i += 1) {
      if (skip?.(i) === true) continue;
      const p = a[i];
      const p2 = a[i + 1 === a.length ? 0 : i + 1];
      for (let j = 0; j < m; j += 1) {
        if (br[4 * j] > ba[4 * i + 2] || br[4 * j + 2] < ba[4 * i] || br[4 * j + 1] > ba[4 * i + 3] || br[4 * j + 3] < ba[4 * i + 1]) continue;
        if (meets(p, p2, r[j], r[j + 1 === m ? 0 : j + 1])) return true;
      }
    }
  }
  return false;
}

/** Is q within ON_CM of a segment of the rings? */
function onRings(rings: readonly (readonly XY[])[], q: XY): boolean {
  for (const r of rings) {
    const m = r.length;
    for (let j = 0; j < m; j += 1) {
      const a = r[j];
      const b = r[j + 1 === m ? 0 : j + 1];
      if (Math.min(a.x, b.x) - ON_CM > q.x || Math.max(a.x, b.x) + ON_CM < q.x || Math.min(a.y, b.y) - ON_CM > q.y || Math.max(a.y, b.y) + ON_CM < q.y) continue;
      if (segDist2(q, a, b) <= ON_CM * ON_CM) return true;
    }
  }
  return false;
}

/** A point within this of an earlier ring lies on it (the lattice rounding of a mouth's ends, cm). */
const ON_CM = 2;

/** A segment's end on an earlier ring is drawn back this far before the clearance test (cm). */
const SHRINK_CM = 5;

/**
 * Is a body's ring clear of the earlier bodies' rings, but where it lies along them — a segment with both ends on an
 * earlier ring is a shared stretch (a mouth, the estuary's cut), and a segment's end on one meets it there?
 */
export function clearOf(ring: readonly XY[], earlier: readonly (readonly XY[])[]): boolean {
  if (earlier.length === 0) return true;
  const n = ring.length;
  const on = ring.map((q) => onRings(earlier, q));
  for (let i = 0; i < n; i += 1) {
    const j = i + 1 === n ? 0 : i + 1;
    if (on[i] && on[j]) continue;
    let a = ring[i];
    let b = ring[j];
    const len = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
    if (len <= 2 * SHRINK_CM) {
      if (on[i] || on[j]) continue;
    } else {
      const ux = quot((b.x - a.x) * SHRINK_CM, len);
      const uy = quot((b.y - a.y) * SHRINK_CM, len);
      if (on[i]) a = { x: a.x + ux, y: a.y + uy };
      if (on[j]) b = { x: b.x - ux, y: b.y - uy };
    }
    if (meetsAny([a, b], earlier, (k) => k === 1)) return false;
  }
  return true;
}

/**
 * A joined body's ring cut at the shore of the body it joins (see the header): the offset lines walked from the
 * body's start to their first crossing with an earlier ring — both on one ring — and closed along that ring between
 * the two crossings, the shorter way; the start capped. Null when a line never crosses, the two cross different rings,
 * or a line is refused (a loop over land).
 */
export function mouthRing(pts: readonly XY[], half: readonly number[], startCap: Cap, earlier: readonly (readonly XY[])[]): { ring: XY[]; holes: XY[][] } | null {
  const n = pts.length;
  if (n < 2) return null;
  why = '';
  const off = offsets(pts, half);
  if (off === null) {
    why = 'a repeated point';
    return null;
  }
  let maxH = 0;
  for (const h of half) if (h > maxH) maxH = h;
  const l = eraseLoops(off.left, pts, maxH);
  const rr = eraseLoops(off.right, pts, maxH);
  if (l === null || rr === null) return null;
  const left = l.line;
  const right = rr.line;
  const first = (line: XY[]): { i: number; ring: number; seg: number; at: XY } | null => {
    for (let i = 0; i + 1 < line.length; i += 1) {
      let best: { ring: number; seg: number; t: number; at: XY } | null = null;
      for (let r = 0; r < earlier.length; r += 1) {
        const ring = earlier[r];
        const m = ring.length;
        for (let s = 0; s < m; s += 1) {
          const x = segCross(line[i], line[i + 1], ring[s], ring[s + 1 === m ? 0 : s + 1]);
          if (x !== null && (best === null || x.t < best.t)) best = { ring: r, seg: s, t: x.t, at: x.at };
        }
      }
      if (best !== null) return { i, ring: best.ring, seg: best.seg, at: best.at };
    }
    return null;
  };
  const hl = first(left);
  const hr = first(right);
  if (hl === null || hr === null || hl.ring !== hr.ring) {
    why = 'no mouth';
    return null;
  }
  const river = earlier[hl.ring];
  const m = river.length;
  // the river's vertices from HR to HL: forward (hr.seg + 1 … hl.seg) or backward (hr.seg … hl.seg + 1), the shorter
  const fwd: XY[] = [];
  for (let k = (hr.seg + 1) % m, guard = 0; guard < m; k = (k + 1) % m, guard += 1) {
    if (hr.seg === hl.seg) break;
    fwd.push(river[k]);
    if (k === hl.seg) break;
  }
  const bwd: XY[] = [];
  for (let k = hr.seg, guard = 0; guard < m; k = (k - 1 + m) % m, guard += 1) {
    if (hr.seg === hl.seg) break;
    bwd.push(river[k]);
    if (k === (hl.seg + 1) % m) break;
  }
  const path = hr.seg === hl.seg ? [] : fwd.length <= bwd.length ? fwd : bwd;
  const ring: XY[] = [...right.slice(0, hr.i + 1), hr.at, ...path, hl.at];
  for (let i = hl.i; i >= 0; i -= 1) ring.push(left[i]);
  const startDir = unitOf(sub(pts[0], pts[1])) as XY;
  if (startCap === 'round') ring.push(...cap(pts[0], left[0], half[0], startDir));
  return { ring: area2(ring) < 0 ? ring.reverse() : ring, holes: [...l.holes, ...rr.holes] };
}

/** The ring's own tolerance (cm): a vertex within it of the chord around it is dropped (Douglas–Peucker on the ring). */
export const RING_TOL_CM = 20;

/** cos 30°: a ring vertex whose two edges meet at a sharper angle is a needle (cleanRing drops it). */
const NEEDLE_COS = 0.8660254037844386;

/** The least clearance (cm) between a vertex of a fast ring and any segment of it not incident to the vertex. */
export const RING_CLEAR_CM = 60;

/**
 * A lattice ring cleaned for insertion: Douglas–Peucker at RING_TOL_CM (from its first vertex and the vertex farthest
 * from it), which drops the tiny zig-zags the mitres and the loop cuts leave, then every vertex closer than
 * RING_CLEAR_CM ÷ 2 to the one before it dropped, then every needle (an angle below 30°); the `fixed` vertices (on the
 * arena's edge, on an earlier ring) always stay. Null below three vertices.
 */
export function cleanRing(ring: readonly LatticePoint[], fixed: (q: XY) => boolean = () => false): LatticePoint[] | null {
  const n = ring.length;
  if (n < 4) return n === 3 ? ring.slice() : null;
  let far = 0;
  let farD = -1;
  for (let i = 1; i < n; i += 1) {
    const dx = ring[i].x - ring[0].x;
    const dy = ring[i].y - ring[0].y;
    if (dx * dx + dy * dy > farD) {
      farD = dx * dx + dy * dy;
      far = i;
    }
  }
  const keep = new Uint8Array(n);
  keep[0] = 1;
  keep[far] = 1;
  for (let i = 0; i < n; i += 1) if (fixed(ring[i])) keep[i] = 1;
  const tol2 = RING_TOL_CM * RING_TOL_CM;
  const stack: [number, number][] = [
    [0, far],
    [far, n],
  ];
  while (stack.length > 0) {
    const [a, b] = stack.pop() as [number, number];
    if (b - a < 2) continue;
    const pa = ring[a];
    const pb = ring[b % n];
    let worst = -1;
    let worstD = tol2;
    for (let i = a + 1; i < b; i += 1) {
      const d = segDist2(ring[i], pa, pb);
      if (d > worstD) {
        worstD = d;
        worst = i;
      }
    }
    if (worst < 0) {
      // the fixed vertices between a and b split the stretch
      for (let i = a + 1; i < b; i += 1) {
        if (keep[i] === 1) {
          stack.push([i, b], [a, i]);
          break;
        }
      }
      continue;
    }
    keep[worst] = 1;
    stack.push([worst, b], [a, worst]);
  }
  const out: LatticePoint[] = [];
  const min2 = (RING_CLEAR_CM * RING_CLEAR_CM) / 4;
  for (let i = 0; i < n; i += 1) {
    if (keep[i] === 0) continue;
    const last = out[out.length - 1];
    if (last !== undefined && !fixed(ring[i])) {
      const dx = ring[i].x - last.x;
      const dy = ring[i].y - last.y;
      if (dx * dx + dy * dy < min2) continue;
    }
    out.push(ring[i]);
  }
  // a needle — a vertex whose two edges fold back within NEEDLE_COS of each other — is dropped, again until none
  for (let changed = true; changed && out.length > 3; ) {
    changed = false;
    for (let i = 0; i < out.length && out.length > 3; i += 1) {
      const v = out[i];
      if (fixed(v)) continue;
      const a = out[(i + out.length - 1) % out.length];
      const b = out[(i + 1) % out.length];
      const ax = a.x - v.x;
      const ay = a.y - v.y;
      const bx = b.x - v.x;
      const by = b.y - v.y;
      const dot = ax * bx + ay * by;
      if (dot > 0 && dot * dot > NEEDLE_COS * NEEDLE_COS * (ax * ax + ay * ay) * (bx * bx + by * by)) {
        out.splice(i, 1);
        changed = true;
        i -= 1;
      }
    }
  }
  while (out.length > 3 && !fixed(out[out.length - 1])) {
    const dx = out[0].x - out[out.length - 1].x;
    const dy = out[0].y - out[out.length - 1].y;
    if (dx * dx + dy * dy >= min2) break;
    out.pop();
  }
  return out.length >= 3 && area2(out) !== 0 ? out : null;
}

/** Does every vertex keep RING_CLEAR_CM from every segment of the ring not incident to it? */
export function clearRing(ring: readonly XY[]): boolean {
  const n = ring.length;
  const b = boxes(ring);
  const c2 = RING_CLEAR_CM * RING_CLEAR_CM;
  for (let v = 0; v < n; v += 1) {
    const q = ring[v];
    for (let s = 0; s < n; s += 1) {
      // the vertex's one-ring: the segments incident to it or to its two neighbours (§3.10's clearance row)
      if (s === v || (s + 1) % n === v || s === (v + 1) % n || (s + 2) % n === v) continue;
      if (b[4 * s] - RING_CLEAR_CM > q.x || b[4 * s + 2] + RING_CLEAR_CM < q.x || b[4 * s + 1] - RING_CLEAR_CM > q.y || b[4 * s + 3] + RING_CLEAR_CM < q.y) continue;
      if (segDist2(q, ring[s], ring[(s + 1) % n]) < c2) return false;
    }
  }
  return true;
}

/** Do two rings keep RING_CLEAR_CM between every vertex of one and every segment of the other (and never meet)? */
export function ringsApart(a: readonly XY[], b: readonly XY[]): boolean {
  if (meetsAny(a, [b])) return false;
  const c2 = RING_CLEAR_CM * RING_CLEAR_CM;
  for (const [p, q] of [
    [a, b],
    [b, a],
  ] as const) {
    const bq = boxes(q);
    const m = q.length;
    for (const v of p) {
      for (let s = 0; s < m; s += 1) {
        if (bq[4 * s] - RING_CLEAR_CM > v.x || bq[4 * s + 2] + RING_CLEAR_CM < v.x || bq[4 * s + 1] - RING_CLEAR_CM > v.y || bq[4 * s + 3] + RING_CLEAR_CM < v.y) continue;
        if (segDist2(v, q[s], q[(s + 1) % m]) < c2) return false;
      }
    }
  }
  return true;
}
