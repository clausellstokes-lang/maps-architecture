// Plane geometry for the metrics (M0-k-05): 10 m arc-length resampling (§13.5 *Curves*), headings, ring area and
// centroid (the shoelace formula), point in ring (the crossing number), distances to segments, and the length of a
// polyline inside a ring. Inputs are centimetres; every length and area these return is in metres or square metres.
import type { XY } from './doc.js';

/** A point in metres. */
export interface Pt {
  readonly x: number;
  readonly y: number;
}

/** The resampling step of §13.5 *Curves*: both sides resampled at a 10 m arc-length step. */
export const RESAMPLE_STEP_M = 10;

/** A ring without its closing duplicate (the last vertex equal to the first). */
export function openRing<T extends XY>(ring: readonly T[]): readonly T[] {
  const n = ring.length;
  if (n >= 2 && ring[0].x === ring[n - 1].x && ring[0].y === ring[n - 1].y) return ring.slice(0, n - 1);
  return ring;
}

/** A polyline in metres, consecutive duplicate vertices dropped. */
export function toMetres(line: readonly XY[]): Pt[] {
  const out: Pt[] = [];
  for (const p of line) {
    const q = { x: p.x / 100, y: p.y / 100 };
    const last = out[out.length - 1];
    if (last === undefined || last.x !== q.x || last.y !== q.y) out.push(q);
  }
  return out;
}

/** The polyline's length in metres. */
export function lengthM(line: readonly Pt[]): number {
  let s = 0;
  for (let i = 1; i < line.length; i += 1) s += Math.hypot(line[i].x - line[i - 1].x, line[i].y - line[i - 1].y);
  return s;
}

/**
 * Arc-length resampling (§13.5 *Curves*; C-0180 (2)): the points at s = 0, step, 2·step, … ≤ the polyline's length,
 * measured along the polyline; the tail shorter than one step is dropped, so every resampled step is exactly `step`
 * long along the original. A polyline shorter than one step gives its start alone.
 */
export function resample(line: readonly Pt[], step: number = RESAMPLE_STEP_M): Pt[] {
  if (line.length === 0) return [];
  const out: Pt[] = [line[0]];
  let next = step;
  let walked = 0;
  for (let i = 1; i < line.length; i += 1) {
    const a = line[i - 1];
    const b = line[i];
    const seg = Math.hypot(b.x - a.x, b.y - a.y);
    if (seg === 0) continue;
    while (walked + seg >= next) {
      const t = (next - walked) / seg;
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      next += step;
    }
    walked += seg;
  }
  return out;
}

/** The heading of each step of a resampled polyline, radians in (−π, π]. */
export function headings(points: readonly Pt[]): number[] {
  const out: number[] = [];
  for (let i = 1; i < points.length; i += 1) out.push(Math.atan2(points[i].y - points[i - 1].y, points[i].x - points[i - 1].x));
  return out;
}

/** An angle wrapped into (−π, π]. */
export function wrapPi(a: number): number {
  let r = a % (2 * Math.PI);
  if (r <= -Math.PI) r += 2 * Math.PI;
  else if (r > Math.PI) r -= 2 * Math.PI;
  return r;
}

export const DEG = 180 / Math.PI;

/** Twice the signed shoelace area of a ring in cm² (positive counter-clockwise); exact for integer centimetres. */
export function area2Cm(ring: readonly XY[]): number {
  const r = openRing(ring);
  let s = 0;
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** A ring's unsigned area in m². */
export function areaM2(ring: readonly XY[]): number {
  return Math.abs(area2Cm(ring)) / 2 / 1e4;
}

/** A ring's area centroid in metres (the vertex mean for a zero-area ring). */
export function centroidM(ring: readonly XY[]): Pt {
  const r = openRing(ring);
  let a2 = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < r.length; i += 1) {
    const p = r[i];
    const q = r[(i + 1) % r.length];
    const c = p.x * q.y - q.x * p.y;
    a2 += c;
    cx += (p.x + q.x) * c;
    cy += (p.y + q.y) * c;
  }
  if (a2 === 0) {
    let sx = 0;
    let sy = 0;
    for (const p of r) {
      sx += p.x;
      sy += p.y;
    }
    return { x: sx / r.length / 100, y: sy / r.length / 100 };
  }
  return { x: cx / (3 * a2) / 100, y: cy / (3 * a2) / 100 };
}

/** Is `p` (metres) inside the ring (metres; open or closed)? The crossing number; a point on an edge may go either way. */
export function insideRing(p: Pt, ring: readonly Pt[]): boolean {
  let inside = false;
  const n = ring.length;
  for (let i = 0, j = n - 1; i < n; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/** The distance from `p` to the segment ab (all metres). */
export function segmentDistance(p: Pt, a: Pt, b: Pt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/** The nearest edge of a ring (metres, open) to `p`: its distance and its direction in radians. */
export function nearestEdge(p: Pt, ring: readonly Pt[]): { dist: number; dir: number } {
  let best = Infinity;
  let dir = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (a.x === b.x && a.y === b.y) continue;
    const d = segmentDistance(p, a, b);
    if (d < best) {
      best = d;
      dir = Math.atan2(b.y - a.y, b.x - a.x);
    }
  }
  return { dist: best, dir };
}

/** The length in metres of the polyline's parts inside the ring (both in metres; the ring open). */
export function lengthInsideM(line: readonly Pt[], ring: readonly Pt[]): number {
  let total = 0;
  const n = ring.length;
  for (let i = 1; i < line.length; i += 1) {
    const a = line[i - 1];
    const b = line[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const seg = Math.hypot(dx, dy);
    if (seg === 0) continue;
    const ts = [0, 1];
    for (let k = 0; k < n; k += 1) {
      const c = ring[k];
      const d = ring[(k + 1) % n];
      const ex = d.x - c.x;
      const ey = d.y - c.y;
      const den = dx * ey - dy * ex;
      if (den === 0) continue;
      const t = ((c.x - a.x) * ey - (c.y - a.y) * ex) / den;
      const u = ((c.x - a.x) * dy - (c.y - a.y) * dx) / den;
      if (t > 0 && t < 1 && u >= 0 && u <= 1) ts.push(t);
    }
    ts.sort((x, y) => x - y);
    for (let k = 1; k < ts.length; k += 1) {
      const t0 = ts[k - 1];
      const t1 = ts[k];
      if (t1 <= t0) continue;
      const tm = (t0 + t1) / 2;
      if (insideRing({ x: a.x + dx * tm, y: a.y + dy * tm }, ring)) total += (t1 - t0) * seg;
    }
  }
  return total;
}

/** An undirected axis angle folded into [0°, 45°] against another (orientation modulo 90°, §13.5's wall alignment). */
export function foldDeg90(a: number, b: number): number {
  let d = Math.abs((a - b) * DEG) % 90;
  if (d > 45) d = 90 - d;
  return d;
}
