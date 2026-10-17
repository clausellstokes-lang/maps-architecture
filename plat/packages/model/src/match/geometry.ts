// The matching routine's geometry (item M0-d-05b; §6.3 *Anchors and hysteresis*, *The matching routine*): the checks
// of an anchor's coordinates, the closed point-in-area test (a tombstone's covering entity), the IoU of two areas (the
// overlap-anchored kinds) and the share of one spine lying on another (a way's overlap of its length). Every input
// coordinate is a lattice point — whole centimetres, |v| ≤ 2²⁴ — so every orientation, dot product and cross product
// below is an exact integer in a double (§3.2 (1)); the parameters of crossing points and the overlap sums are
// ordinary doubles, the same on every host (§6.5). Divisions go through the kernel's ratio() (§3.2 (8), C-0044).
import { area2, orient2d, ratio, type Box } from '@plat/kernel';
import type { PointCm, PolygonCm } from '../types/index.js';

/** The largest coordinate magnitude an anchor holds (the frame's range, §3.2 (1)). */
export const COORD_LIMIT = 16_777_216;

const isCoord = (v: unknown): boolean => typeof v === 'number' && Number.isInteger(v) && v >= -COORD_LIMIT && v <= COORD_LIMIT;

/** Refuses (RangeError) a point that is not two whole centimetres within ±2²⁴. */
export function checkPoint(p: PointCm, what: string): void {
  if (typeof p !== 'object' || p === null || !isCoord(p.x) || !isCoord(p.y)) {
    throw new RangeError(`match: ${what} is not a lattice point (whole centimetres within ±2²⁴)`);
  }
}

/** A ring prepared for the area tests: flat coordinates, oriented (outer counter-clockwise, holes clockwise). */
export interface Ring {
  readonly xs: Float64Array;
  readonly ys: Float64Array;
  readonly n: number;
}

/** An area prepared for the tests: its rings, its area in cm², its box. */
export interface Area {
  readonly rings: readonly Ring[];
  readonly area: number;
  readonly box: Box;
}

function ringOf(points: readonly PointCm[], reverse: boolean): Ring {
  const n = points.length;
  const xs = new Float64Array(n);
  const ys = new Float64Array(n);
  for (let i = 0; i < n; i += 1) {
    const p = points[reverse ? n - 1 - i : i];
    xs[i] = p.x;
    ys[i] = p.y;
  }
  return { xs, ys, n };
}

/**
 * Prepares an area (§2.8's PolygonCm: the outer ring, then its holes): every ring of at least three lattice points,
 * the outer ring turned counter-clockwise and each hole clockwise, its area (outer less holes) positive. Refuses
 * (RangeError) anything else — an overlap-anchored entity of zero area never reaches matching (§6.3, §5.1 (9)). The
 * rings are taken as simple, holes inside the outer ring and apart (the kernel's faces are).
 */
export function prepareArea(poly: PolygonCm, what: string): Area {
  if (!Array.isArray(poly) || poly.length === 0) throw new RangeError(`match: ${what} is not an area (an outer ring, then holes)`);
  const rings: Ring[] = [];
  let total = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let r = 0; r < poly.length; r += 1) {
    const ring = poly[r];
    if (!Array.isArray(ring) || ring.length < 3) throw new RangeError(`match: ${what} has a ring of fewer than three points`);
    for (const p of ring) {
      checkPoint(p, `a point of ${what}`);
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
    const a2 = area2(ring);
    if (a2 === 0) throw new RangeError(`match: ${what} has a ring of zero area`);
    // The outer ring counter-clockwise (positive), each hole clockwise (negative).
    const reverse = r === 0 ? a2 < 0 : a2 > 0;
    rings.push(ringOf(ring, reverse));
    total += r === 0 ? Math.abs(a2) : -Math.abs(a2);
  }
  if (!(total > 0)) throw new RangeError(`match: ${what} has no area`);
  return { rings, area: total * 0.5, box: { minX, minY, maxX, maxY } };
}

/** Whether two closed boxes meet. */
export function boxesMeet(a: Readonly<Box>, b: Readonly<Box>): boolean {
  return a.minX <= b.maxX && b.minX <= a.maxX && a.minY <= b.maxY && b.minY <= a.maxY;
}

/**
 * Whether the point lies in the closed area — on its boundary counts as inside (§6.3's "covering"; §3.6 (5)'s tie
 * is the caller's). Crossing number on the half-open rule, decided by exact orientations for a lattice point.
 */
export function coversPoint(a: Area, x: number, y: number): boolean {
  const b = a.box;
  if (x < b.minX || x > b.maxX || y < b.minY || y > b.maxY) return false;
  let inside = false;
  for (const ring of a.rings) {
    const { xs, ys, n } = ring;
    for (let i = 0, j = n - 1; i < n; j = i, i += 1) {
      const ux = xs[j];
      const uy = ys[j];
      const vx = xs[i];
      const vy = ys[i];
      const o = orient2d(ux, uy, vx, vy, x, y);
      if (o === 0 && x >= Math.min(ux, vx) && x <= Math.max(ux, vx) && y >= Math.min(uy, vy) && y <= Math.max(uy, vy)) return true;
      if (uy <= y !== vy <= y) {
        // An upward edge crosses the ray to the right when the point lies to its left; a downward one, to its right.
        if (vy > uy ? o > 0 : o < 0) inside = !inside;
      }
    }
  }
  return inside;
}

/** Strict inside test for a point that lies on no boundary of the area (a sub-segment's midpoint): crossing number. */
function insideOpen(a: Area, x: number, y: number): boolean {
  let inside = false;
  for (const ring of a.rings) {
    const { xs, ys, n } = ring;
    for (let i = 0, j = n - 1; i < n; j = i, i += 1) {
      const uy = ys[j];
      const vy = ys[i];
      if (uy <= y !== vy <= y) {
        const ux = xs[j];
        const vx = xs[i];
        const o = (vx - ux) * (y - uy) - (x - ux) * (vy - uy);
        if (vy > uy ? o > 0 : o < 0) inside = !inside;
      }
    }
  }
  return inside;
}

/**
 * num ÷ den for the overlap's quotients, through the kernel's ratio() under kind `area` (floor 1 cm², §3.2 (8),
 * C-0044): every denominator here is a product of two lattice lengths — a squared length, a dot or cross product, a
 * twice-area — so it is in cm². Kept apart from match.ts's `inverse` and timing.ts's `perEntity` and `shareOf` (each
 * its own kind); refuses with "match: a degenerate division in the overlap".
 */
function div(num: number, den: number): number {
  const r = ratio(num, den, 'area');
  if (!r.ok) throw new RangeError('match: a degenerate division in the overlap');
  return r.value;
}

/**
 * The part of `a`'s boundary inside `b` as Green's sum: Σ (x₀·y₁ − x₁·y₀) over every sub-segment of `a`'s edges
 * — split at every point where `b`'s boundary meets them — whose midpoint lies inside `b`; a sub-segment lying along
 * `b`'s boundary counts once, from `a`'s pass (`shared`), when the two run the same way (both areas on its left).
 */
function boundaryInside(a: Area, b: Area, shared: boolean, ox: number, oy: number): number {
  let sum = 0;
  const ts: number[] = [];
  const spans: number[] = []; // [lo, hi, sameWay (1 | 0)] per collinear overlap with an edge of b
  for (const ra of a.rings) {
    for (let i = 0; i < ra.n; i += 1) {
      const px = ra.xs[i];
      const py = ra.ys[i];
      const k = i + 1 === ra.n ? 0 : i + 1;
      const qx = ra.xs[k];
      const qy = ra.ys[k];
      const dx = qx - px;
      const dy = qy - py;
      const len2 = dx * dx + dy * dy;
      if (len2 === 0) continue;
      const eMinX = Math.min(px, qx);
      const eMaxX = Math.max(px, qx);
      const eMinY = Math.min(py, qy);
      const eMaxY = Math.max(py, qy);
      if (eMaxX < b.box.minX || eMinX > b.box.maxX || eMaxY < b.box.minY || eMinY > b.box.maxY) continue;
      ts.length = 0;
      spans.length = 0;
      ts.push(0, 1);
      for (const rb of b.rings) {
        for (let m = 0; m < rb.n; m += 1) {
          const ux = rb.xs[m];
          const uy = rb.ys[m];
          const l = m + 1 === rb.n ? 0 : m + 1;
          const vx = rb.xs[l];
          const vy = rb.ys[l];
          if (Math.max(ux, vx) < eMinX || Math.min(ux, vx) > eMaxX || Math.max(uy, vy) < eMinY || Math.min(uy, vy) > eMaxY) continue;
          const o1 = orient2d(px, py, qx, qy, ux, uy);
          const o2 = orient2d(px, py, qx, qy, vx, vy);
          if (o1 === 0 && o2 === 0) {
            // Collinear: the overlap of the two edges' parameter ranges on a.
            const tu = div((ux - px) * dx + (uy - py) * dy, len2);
            const tv = div((vx - px) * dx + (vy - py) * dy, len2);
            const lo = Math.max(0, Math.min(tu, tv));
            const hi = Math.min(1, Math.max(tu, tv));
            if (hi > lo) {
              ts.push(lo, hi);
              spans.push(lo, hi, (vx - ux) * dx + (vy - uy) * dy > 0 ? 1 : 0);
            } else if (hi === lo) ts.push(lo);
            continue;
          }
          if ((o1 > 0 && o2 > 0) || (o1 < 0 && o2 < 0)) continue;
          const o3 = orient2d(ux, uy, vx, vy, px, py);
          const o4 = orient2d(ux, uy, vx, vy, qx, qy);
          if ((o3 > 0 && o4 > 0) || (o3 < 0 && o4 < 0)) continue;
          if (o3 === 0) ts.push(0);
          else if (o4 === 0) ts.push(1);
          else if (o1 === 0) ts.push(div((ux - px) * dx + (uy - py) * dy, len2));
          else if (o2 === 0) ts.push(div((vx - px) * dx + (vy - py) * dy, len2));
          else ts.push(div(o3, o3 - o4));
        }
      }
      ts.sort((x, y) => x - y);
      let t0 = ts[0];
      for (let s = 1; s < ts.length; s += 1) {
        const t1 = ts[s];
        if (t1 <= t0) continue;
        const tm = (t0 + t1) * 0.5;
        let along = -1; // −1: not along b's boundary; 0: along it the other way; 1: along it the same way
        for (let c = 0; c < spans.length; c += 3) {
          if (tm >= spans[c] && tm <= spans[c + 1]) {
            along = Math.max(along, spans[c + 2]);
          }
        }
        let take: boolean;
        if (along >= 0) take = shared && along === 1;
        else take = insideOpen(b, px + tm * dx, py + tm * dy);
        if (take) {
          const sx = px - ox + t0 * dx;
          const sy = py - oy + t0 * dy;
          const ex = px - ox + t1 * dx;
          const ey = py - oy + t1 * dy;
          sum += sx * ey - ex * sy;
        }
        t0 = t1;
      }
    }
  }
  return sum;
}

/** The area (cm²) of the intersection of two prepared areas: Green's theorem over the boundary of a ∩ b. */
export function intersectionArea(a: Area, b: Area): number {
  if (!boxesMeet(a.box, b.box)) return 0;
  // Coordinates relative to a's lower corner keep the cross products small.
  const ox = a.box.minX;
  const oy = a.box.minY;
  const twice = boundaryInside(a, b, true, ox, oy) + boundaryInside(b, a, false, ox, oy);
  return Math.max(0, twice * 0.5);
}

/** The IoU of two prepared areas: |a ∩ b| ÷ |a ∪ b| (§6.3's overlap of the overlap-anchored kinds). */
export function iou(a: Area, b: Area): number {
  const i = intersectionArea(a, b);
  if (i === 0) return 0;
  const u = a.area + b.area - i;
  // In twice-areas, which a lattice area holds at ≥ 1 cm² (ratio's floor).
  return Math.min(1, div(2 * i, 2 * Math.max(u, i)));
}

/** A spine prepared for the overlap of its length: flat coordinates, its length (cm), its box. */
export interface Line {
  readonly xs: Float64Array;
  readonly ys: Float64Array;
  readonly n: number;
  readonly length: number;
  readonly box: Box;
}

/**
 * Prepares a spine: at least two lattice points, no two consecutive equal, a positive length. Refuses (RangeError)
 * anything else — an overlap-anchored entity of zero length never reaches matching (§6.3, §5.1 (9)).
 */
export function prepareLine(points: readonly PointCm[], what: string): Line {
  if (!Array.isArray(points) || points.length < 2) throw new RangeError(`match: ${what} is not a spine of at least two points`);
  const n = points.length;
  const xs = new Float64Array(n);
  const ys = new Float64Array(n);
  let length = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < n; i += 1) {
    const p = points[i];
    checkPoint(p, `a point of ${what}`);
    xs[i] = p.x;
    ys[i] = p.y;
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
    if (i > 0) {
      const dx = p.x - xs[i - 1];
      const dy = p.y - ys[i - 1];
      if (dx === 0 && dy === 0) throw new RangeError(`match: ${what} repeats a point (a zero-length segment)`);
      length += Math.sqrt(dx * dx + dy * dy);
    }
  }
  return { xs, ys, n, length, box: { minX, minY, maxX, maxY } };
}

/** The parameter interval [lo, hi] of t on which lo′ ≤ s0 + t·s1 ≤ hi′, written into out (lo > hi when empty). */
function linearBand(s0: number, s1: number, lo: number, hi: number, out: number[]): void {
  if (s1 === 0) {
    if (s0 >= lo && s0 <= hi) {
      out[0] = -Infinity;
      out[1] = Infinity;
    } else {
      out[0] = 1;
      out[1] = 0;
    }
    return;
  }
  const a = div(lo - s0, s1);
  const b = div(hi - s0, s1);
  out[0] = Math.min(a, b);
  out[1] = Math.max(a, b);
}

const BAND_A = [0, 0];
const BAND_B = [0, 0];

/**
 * The parameter interval of the segment P + t·D (t ∈ [0, 1]) within `d` of the segment U → V — the segment met with
 * the stadium around U → V, which is convex, so the answer is one interval: the hull of its meetings with the two end
 * disks and the rectangle between them. Written into out as [lo, hi] (lo > hi when empty).
 */
function stadium(px: number, py: number, dx: number, dy: number, ux: number, uy: number, vx: number, vy: number, d: number, out: number[]): void {
  let lo = Infinity;
  let hi = -Infinity;
  const a = dx * dx + dy * dy;
  // The end disks.
  for (let e = 0; e < 2; e += 1) {
    const cx = e === 0 ? ux : vx;
    const cy = e === 0 ? uy : vy;
    const wx = px - cx;
    const wy = py - cy;
    const b = dx * wx + dy * wy;
    const c = wx * wx + wy * wy - d * d;
    const disc = b * b - a * c;
    if (disc >= 0) {
      const s = Math.sqrt(disc);
      lo = Math.min(lo, div(-b - s, a));
      hi = Math.max(hi, div(-b + s, a));
    }
  }
  // The rectangle: the projection on U → V within [0, |E|²], the offset from it within d·|E|.
  const ex = vx - ux;
  const ey = vy - uy;
  const e2 = ex * ex + ey * ey;
  if (e2 > 0) {
    const wx = px - ux;
    const wy = py - uy;
    linearBand(wx * ex + wy * ey, dx * ex + dy * ey, 0, e2, BAND_A);
    const reach = d * Math.sqrt(e2);
    linearBand(ex * wy - ey * wx, ex * dy - ey * dx, -reach, reach, BAND_B);
    const rlo = Math.max(BAND_A[0], BAND_B[0]);
    const rhi = Math.min(BAND_A[1], BAND_B[1]);
    if (rlo <= rhi) {
      lo = Math.min(lo, rlo);
      hi = Math.max(hi, rhi);
    }
  }
  out[0] = Math.max(0, lo);
  out[1] = Math.min(1, hi);
}

const HIT = [0, 0];

/**
 * The length (cm) of `a` lying within `d` cm of `b` (a way's overlap of its length, §6.3): per segment of `a`, the
 * union of its parameter intervals within `d` of each segment of `b`, times the segment's length.
 */
export function lineOverlap(a: Line, b: Line, d: number): number {
  let total = 0;
  const iv: number[] = [];
  for (let i = 0; i + 1 < a.n; i += 1) {
    const px = a.xs[i];
    const py = a.ys[i];
    const dx = a.xs[i + 1] - px;
    const dy = a.ys[i + 1] - py;
    const sMinX = Math.min(px, px + dx) - d;
    const sMaxX = Math.max(px, px + dx) + d;
    const sMinY = Math.min(py, py + dy) - d;
    const sMaxY = Math.max(py, py + dy) + d;
    if (sMaxX < b.box.minX || sMinX > b.box.maxX || sMaxY < b.box.minY || sMinY > b.box.maxY) continue;
    iv.length = 0;
    for (let j = 0; j + 1 < b.n; j += 1) {
      const ux = b.xs[j];
      const uy = b.ys[j];
      const vx = b.xs[j + 1];
      const vy = b.ys[j + 1];
      if (Math.max(ux, vx) < sMinX || Math.min(ux, vx) > sMaxX || Math.max(uy, vy) < sMinY || Math.min(uy, vy) > sMaxY) continue;
      stadium(px, py, dx, dy, ux, uy, vx, vy, d, HIT);
      if (HIT[0] < HIT[1]) iv.push(HIT[0], HIT[1]);
    }
    if (iv.length === 0) continue;
    // Merge the intervals (pairs) by their lower ends.
    const order: number[] = [];
    for (let k = 0; k < iv.length; k += 2) order.push(k);
    order.sort((x, y) => iv[x] - iv[y] || iv[x + 1] - iv[y + 1]);
    let covered = 0;
    let curLo = iv[order[0]];
    let curHi = iv[order[0] + 1];
    for (let k = 1; k < order.length; k += 1) {
      const lo = iv[order[k]];
      const hi = iv[order[k] + 1];
      if (lo <= curHi) curHi = Math.max(curHi, hi);
      else {
        covered += curHi - curLo;
        curLo = lo;
        curHi = hi;
      }
    }
    covered += curHi - curLo;
    total += covered * Math.sqrt(dx * dx + dy * dy);
  }
  return total;
}

/** The share of `a`'s length lying within `d` of `b`, in [0, 1]. */
export function lineShare(a: Line, b: Line, d: number): number {
  const o = lineOverlap(a, b, d);
  if (o === 0) return 0;
  const r = ratio(o, a.length, 'length');
  if (!r.ok) throw new RangeError('match: a spine of no length');
  return Math.min(1, r.value);
}
