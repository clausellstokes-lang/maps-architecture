// Plane helpers of the trace strategy (M0-c-02): distances, crossings, containment, rings' orientation, the
// self-touch test F-WALL's detection reads and the clip of a line by regions the strips stop at. Values in cm (doubles
// or lattice points); every division by a variable goes through `ratio` (§3.2 (8), C-0044), every real function other
// than + − × ÷ and √ through the kernel's dmath (§6.5 (2)). No arena is read here.
import { LATTICE, orient2d, snap, type LatticePoint } from '@plat/kernel';
import { insideRing, quot } from '../siting/geom.js';
import type { XY } from './types.js';

/** Two segments closer than this touch (a vertex within attraction of an edge would be attracted onto it, §3.6). */
export const TOUCH_CM = LATTICE.attractCm;

/** The lattice point nearest (x, y); RangeError off the lattice's range (the kernel's one door, §3.2 (7)). */
export function lat(p: XY): LatticePoint {
  const s = snap(p.x, p.y);
  if (!s.ok) throw new RangeError(`enceinte: (${String(p.x)}, ${String(p.y)}) lies off the lattice's range`);
  return s.value;
}

/** Squared length of b − a. */
export function d2(a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return dx * dx + dy * dy;
}

/** The distance of a and b. */
export function dist(a: XY, b: XY): number {
  return Math.sqrt(d2(a, b));
}

/** The unit vector of v, or null when it is shorter than a centimetre. */
export function unitOf(v: XY): XY | null {
  const l = Math.sqrt(v.x * v.x + v.y * v.y);
  if (l < 1) return null;
  return { x: quot(v.x, l, 'length', 'unit'), y: quot(v.y, l, 'length', 'unit') };
}

/** Twice the signed area of a ring (counter-clockwise positive). */
export function area2(ring: readonly XY[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === ring.length ? 0 : i + 1];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** The ring counter-clockwise (a copy; reversed when it was clockwise). */
export function ccw<T extends XY>(ring: readonly T[]): T[] {
  return area2(ring) < 0 ? [...ring].reverse() : [...ring];
}

/** The ring without a closing repeat of its first point and without consecutive repeats. */
export function openRing<T extends XY>(ring: readonly T[]): T[] {
  const out: T[] = [];
  for (const p of ring) {
    const last = out[out.length - 1];
    if (last === undefined || last.x !== p.x || last.y !== p.y) out.push(p);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/** The point of segment ab nearest p, with its parameter t ∈ [0, 1] and squared distance. */
export function footOn(p: XY, a: XY, b: XY): { at: XY; t: number; d2: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 < 1 ? 0 : quot((p.x - a.x) * dx + (p.y - a.y) * dy, l2, 'area', 'segment foot');
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  const at = { x: a.x + t * dx, y: a.y + t * dy };
  return { at, t, d2: d2(p, at) };
}

/** The squared distance of segments ab and cd (0 when they meet). */
export function segD2(a: XY, b: XY, c: XY, d: XY): number {
  if (segmentsCross(a, b, c, d)) return 0;
  return Math.min(footOn(a, c, d).d2, footOn(b, c, d).d2, footOn(c, a, b).d2, footOn(d, a, b).d2);
}

/** Do the closed segments ab and cd meet (touch or cross)? orient2d's signs. */
export function segmentsCross(a: XY, b: XY, c: XY, d: XY): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  if (o1 !== o2 && o3 !== o4) return true;
  const on = (p: XY, q: XY, r: XY): boolean => Math.min(p.x, q.x) <= r.x && r.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= r.y && r.y <= Math.max(p.y, q.y);
  if (o1 === 0 && on(a, b, c)) return true;
  if (o2 === 0 && on(a, b, d)) return true;
  if (o3 === 0 && on(c, d, a)) return true;
  if (o4 === 0 && on(c, d, b)) return true;
  return false;
}

/**
 * The parameters (t on ab, u on cd) where segment ab properly crosses the line of segment cd within both segments, or
 * null (parallel, or meeting outside either). Doubles; the caller rounds the point it keeps.
 */
export function crossParams(a: XY, b: XY, c: XY, d: XY): { t: number; u: number } | null {
  const rx = b.x - a.x;
  const ry = b.y - a.y;
  const sx = d.x - c.x;
  const sy = d.y - c.y;
  const den = rx * sy - ry * sx;
  if (Math.abs(den) < 1) return null;
  const qx = c.x - a.x;
  const qy = c.y - a.y;
  const t = quot(qx * sy - qy * sx, den, 'area', 'crossing');
  const u = quot(qx * ry - qy * rx, den, 'area', 'crossing');
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { t, u };
}

/** Is q strictly inside the ring (even–odd; on the ring counts as outside)? */
export function inside(ring: readonly XY[], q: XY): boolean {
  return insideRing(ring, q, false);
}

/** The distance of p from the closed ring's line. */
export function distToRing(p: XY, ring: readonly XY[]): number {
  let best = Infinity;
  for (let i = 0; i < ring.length; i += 1) {
    const f = footOn(p, ring[i], ring[i + 1 === ring.length ? 0 : i + 1]);
    if (f.d2 < best) best = f.d2;
  }
  return Math.sqrt(best);
}

/**
 * The largest distance of the closed line `line` from the closed ring `ring`, over its vertices and points every
 * `stepCm` along each of its sides (S3 (9)'s test: "the trace departs from the boundary by ≤ 40 m everywhere").
 */
export function departure(line: readonly XY[], ring: readonly XY[], stepCm = 100): number {
  let worst = 0;
  for (let i = 0; i < line.length; i += 1) {
    const a = line[i];
    const b = line[i + 1 === line.length ? 0 : i + 1];
    const l = dist(a, b);
    const n = Math.max(1, Math.ceil(quot(l, stepCm, 'length', 'departure step')));
    for (let s = 0; s < n; s += 1) {
      const t = quot(s, n, 'count', 'departure sample');
      const d = distToRing({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }, ring);
      if (d > worst) worst = d;
    }
  }
  return worst;
}

/**
 * Does the closed line touch itself — two non-adjacent sides within `touchCm` (or crossing), or two adjacent sides
 * folding back over each other? F-WALL's detection "the trace self-intersects" (§5.2), with the attraction distance as
 * the touch (a side that close would be attracted onto the other at insertion, §3.6).
 */
export function selfTouches(line: readonly XY[], touchCm = TOUCH_CM): boolean {
  const n = line.length;
  if (n < 3) return true;
  const t2 = touchCm * touchCm;
  const box = (i: number): [number, number, number, number] => {
    const a = line[i];
    const b = line[i + 1 === n ? 0 : i + 1];
    return [Math.min(a.x, b.x) - touchCm, Math.min(a.y, b.y) - touchCm, Math.max(a.x, b.x) + touchCm, Math.max(a.y, b.y) + touchCm];
  };
  const boxes = Array.from({ length: n }, (_, i) => box(i));
  for (let i = 0; i < n; i += 1) {
    const a = line[i];
    const b = line[i + 1 === n ? 0 : i + 1];
    if (a.x === b.x && a.y === b.y) return true;
    const bi = boxes[i];
    for (let j = i + 1; j < n; j += 1) {
      const adjacent = j === i + 1 || (i === 0 && j === n - 1);
      const c = line[j];
      const d = line[j + 1 === n ? 0 : j + 1];
      if (adjacent) {
        const shared = j === i + 1 ? b : a;
        const p = j === i + 1 ? a : b;
        const q = j === i + 1 ? d : c;
        // A fold back: the two sides leave the shared vertex within a hair of one direction.
        const o = orient2d(p.x, p.y, shared.x, shared.y, q.x, q.y);
        const dot = (q.x - shared.x) * (p.x - shared.x) + (q.y - shared.y) * (p.y - shared.y);
        if (dot > 0 && Math.abs(o) * Math.abs(o) <= t2 * Math.min(d2(shared, p), d2(shared, q))) return true;
        continue;
      }
      const bj = boxes[j];
      if (bi[2] < bj[0] || bj[2] < bi[0] || bi[3] < bj[1] || bj[3] < bi[1]) continue;
      if (segD2(a, b, c, d) <= t2) return true;
    }
  }
  return false;
}

/** Does the closed line cross or touch any core ring, or leave a core ring's point outside itself? */
export function crossesCore(line: readonly XY[], core: readonly (readonly XY[])[]): boolean {
  for (const ring of core) {
    if (ring.length === 0) continue;
    if (!inside(line, ring[0])) return true;
    for (let i = 0; i < line.length; i += 1) {
      const a = line[i];
      const b = line[i + 1 === line.length ? 0 : i + 1];
      for (let j = 0; j < ring.length; j += 1) {
        if (segmentsCross(a, b, ring[j], ring[j + 1 === ring.length ? 0 : j + 1])) return true;
      }
    }
  }
  return false;
}

/** A piece of a line between two places it meets a region's boundary (or its own ends). */
export interface Piece {
  readonly points: XY[];
  /** The region index each end lies on (−1: the line's own end, or a closed line with no crossing). */
  readonly startOn: number;
  readonly endOn: number;
}

/**
 * The parts of a line lying outside every region — a region one ring, or several read even–odd (a ring with holes) —
 * split where the line crosses a region's boundary: the crossing points exact in doubles, the pieces in line order,
 * each end naming the region it lies on. A closed line with no crossing outside every region is one piece (both ends
 * −1, its first point repeated last); one wholly inside a region gives none.
 */
export function clipOutside(line: readonly XY[], closed: boolean, regions: readonly (readonly (readonly XY[])[])[]): Piece[] {
  const n = line.length;
  const segs = closed ? n : n - 1;
  // Every crossing: (segment, t, region).
  const cuts: { s: number; t: number; r: number }[] = [];
  for (let s = 0; s < segs; s += 1) {
    const a = line[s];
    const b = line[s + 1 === n ? 0 : s + 1];
    regions.forEach((rings, r) => {
      for (const ring of rings) {
        for (let j = 0; j < ring.length; j += 1) {
          const x = crossParams(a, b, ring[j], ring[j + 1 === ring.length ? 0 : j + 1]);
          if (x !== null) cuts.push({ s, t: x.t, r });
        }
      }
    });
  }
  cuts.sort((p, q) => p.s - q.s || p.t - q.t || p.r - q.r);
  const pointAt = (s: number, t: number): XY => {
    const a = line[s];
    const b = line[s + 1 === n ? 0 : s + 1];
    return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
  };
  const within = (rings: readonly (readonly XY[])[], p: XY): boolean => {
    let odd = false;
    for (const ring of rings) if (inside(ring, p)) odd = !odd;
    return odd;
  };
  const outside = (p: XY): boolean => regions.every((rings) => !within(rings, p));
  const long = (pts: readonly XY[]): boolean => {
    let l = 0;
    for (let i = 0; i + 1 < pts.length; i += 1) l += dist(pts[i], pts[i + 1]);
    return l >= 1;
  };
  if (cuts.length === 0) {
    if (!outside(line[0])) return [];
    const pts = line.map((p) => ({ x: p.x, y: p.y }));
    if (closed) pts.push({ x: line[0].x, y: line[0].y });
    return [{ points: pts, startOn: -1, endOn: -1 }];
  }
  // Walk from cut to cut (a closed line wraps); keep the stretches whose middle lies outside every region.
  const pieces: Piece[] = [];
  // The stretch from one cut to the next: the cut point, the line's vertices after its segment up to the next cut's
  // segment (all the way round when the next cut is the same one or lies behind it on the same segment), the cut point.
  const stretch = (from: { s: number; t: number }, to: { s: number; t: number }, wrap: boolean): XY[] => {
    const pts: XY[] = [pointAt(from.s, from.t)];
    if (from.s !== to.s || wrap) {
      let s = from.s;
      do {
        s = s + 1 === n ? 0 : s + 1;
        pts.push({ x: line[s].x, y: line[s].y });
      } while (s !== to.s);
    }
    pts.push(pointAt(to.s, to.t));
    return pts;
  };
  const mid = (pts: readonly XY[]): XY => {
    // A point well inside the stretch: the middle of its longest side.
    let best = 0;
    let at = 0;
    for (let i = 0; i + 1 < pts.length; i += 1) {
      const l = d2(pts[i], pts[i + 1]);
      if (l > best) {
        best = l;
        at = i;
      }
    }
    return { x: (pts[at].x + pts[at + 1].x) * 0.5, y: (pts[at].y + pts[at + 1].y) * 0.5 };
  };
  if (!closed) {
    const first = { s: 0, t: 0 };
    const last = { s: segs - 1, t: 1 };
    const bounds = [{ ...first, r: -1 }, ...cuts, { ...last, r: -1 }];
    for (let i = 0; i + 1 < bounds.length; i += 1) {
      const a = bounds[i];
      const b = bounds[i + 1];
      const pts = stretch(a, b, false);
      if (long(pts) && outside(mid(pts))) pieces.push({ points: pts, startOn: a.r, endOn: b.r });
    }
    return pieces;
  }
  for (let i = 0; i < cuts.length; i += 1) {
    const a = cuts[i];
    const b = cuts[(i + 1) % cuts.length];
    const wrap = i + 1 === cuts.length || (a.s === b.s && b.t <= a.t);
    const pts = stretch(a, b, wrap);
    if (long(pts) && outside(mid(pts))) pieces.push({ points: pts, startOn: a.r, endOn: b.r });
  }
  return pieces;
}
