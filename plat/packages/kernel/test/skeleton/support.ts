// Test support for M0-a-11's straight skeleton: §13.1's skeleton fixture families (squares and rectangles at every
// centidegree 0°–90°; regular n-gons n = 3 … 64; equal-width strips; rotated L, T and U shapes; near-rectangles with a
// notch on a long side; 1 000 holed polygons; snapped rotated squares) built from seeded parameters, and the
// independent references the tests judge with — exact segment tests, containment, a corner-angle check — written here
// from their definitions, never with the code under test.
import { orient2d, snap } from '../../src/num/index.js';
import type { Cm, LatticePoint } from '../../src/types/index.js';

export type Ring = LatticePoint[];

/** The hard timeout of a fixture sweep on the shared machine; never a timing. */
export const TIMEOUT = 600_000;

/** A lattice point from integers the test holds in range. */
export const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** A double through snap, which must accept it. */
export function snapped(x: number, y: number): LatticePoint {
  const r = snap(x, y);
  if (!r.ok) throw new Error(`support: (${x}, ${y}) is out of range`);
  return r.value;
}

/** mulberry32: a seeded u32 generator for the fixture loops, independent of fast-check. */
export function generator(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A uniform integer in [lo, hi]. */
export const intIn = (rnd: () => number, lo: number, hi: number): number => lo + Math.floor(rnd() * (hi - lo + 1));

/** The seed of the holed-polygon family: PLAT_SKELETON_SEED when set (the checker's three seeds), else 1. */
export function holedSeed(env: Record<string, string | undefined> = process.env): number {
  const raw = env.PLAT_SKELETON_SEED;
  if (raw === undefined || raw === '') return 1;
  if (!/^[0-9]+$/.test(raw)) throw new Error(`PLAT_SKELETON_SEED must be a non-negative integer, got ${JSON.stringify(raw)}`);
  return Number(raw);
}

/** Local points (x, y) rotated by `deg` about the origin, moved to (cx, cy) and snapped. */
export function place(local: readonly [number, number][], deg: number, cx: number, cy: number): Ring {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return local.map(([x, y]) => snapped(cx + x * c - y * s, cy + x * s + y * c));
}

/** A w × h rectangle centred on (cx, cy), rotated by `deg`, snapped. */
export function rectangle(w: number, h: number, deg: number, cx = 12_345, cy = -6_789): Ring {
  return place(
    [
      [-w / 2, -h / 2],
      [w / 2, -h / 2],
      [w / 2, h / 2],
      [-w / 2, h / 2],
    ],
    deg,
    cx,
    cy,
  );
}

/** The regular n-gon of radius r about (cx, cy), its first corner at `phase` radians, counter-clockwise, snapped. */
export function regularNgon(n: number, r: number, phase: number, cx = 0, cy = 0): Ring {
  const out: Ring = [];
  for (let k = 0; k < n; k += 1) out.push(snapped(cx + r * Math.cos(phase + (2 * Math.PI * k) / n), cy + r * Math.sin(phase + (2 * Math.PI * k) / n)));
  return out;
}

/** An L shape: a bar of length a and width wa along x, a stem of length b and width wb up its left end. */
export function lShape(a: number, wa: number, b: number, wb: number, deg: number, cx = 0, cy = 0): Ring {
  return place(
    [
      [0, 0],
      [a, 0],
      [a, wa],
      [wb, wa],
      [wb, b],
      [0, b],
    ],
    deg,
    cx,
    cy,
  );
}

/** A T shape: a bar of length a and width wa along the top, a stem of width wb and length b down its middle. */
export function tShape(a: number, wa: number, b: number, wb: number, deg: number, cx = 0, cy = 0): Ring {
  const x0 = (a - wb) / 2;
  const x1 = (a + wb) / 2;
  return place(
    [
      [x0, 0],
      [x1, 0],
      [x1, b],
      [a, b],
      [a, b + wa],
      [0, b + wa],
      [0, b],
      [x0, b],
    ],
    deg,
    cx,
    cy,
  );
}

/** A U shape: a base of length a and width wa, two arms of height b and width wb at its ends. */
export function uShape(a: number, wa: number, b: number, wb: number, deg: number, cx = 0, cy = 0): Ring {
  return place(
    [
      [0, 0],
      [a, 0],
      [a, b],
      [a - wb, b],
      [a - wb, wa],
      [wb, wa],
      [wb, b],
      [0, b],
    ],
    deg,
    cx,
    cy,
  );
}

/** An equal-width strip of width w along the polyline `path` (axis-parallel legs, turning ±90°), as its outline. */
export function strip(path: readonly [number, number][], w: number, deg: number, cx = 0, cy = 0): Ring {
  // the left and right offsets of an axis-parallel polyline with right-angle turns, mitred
  const h = w / 2;
  const left: [number, number][] = [];
  const right: [number, number][] = [];
  const m = path.length;
  for (let i = 0; i < m; i += 1) {
    const [x, y] = path[i];
    const din = i > 0 ? dir(path[i - 1], path[i]) : dir(path[0], path[1]);
    const dout = i < m - 1 ? dir(path[i], path[i + 1]) : din;
    // the mitre of the two left normals
    const nx = -din[1] + -dout[1];
    const ny = din[0] + dout[0];
    const scale = i > 0 && i < m - 1 && (din[0] !== dout[0] || din[1] !== dout[1]) ? 1 : 0.5;
    left.push([x + nx * h * scale, y + ny * h * scale]);
    right.push([x - nx * h * scale, y - ny * h * scale]);
  }
  return place([...right, ...left.reverse()], deg, cx, cy);
}

function dir(a: readonly [number, number], b: readonly [number, number]): [number, number] {
  const dx = Math.sign(b[0] - a[0]);
  const dy = Math.sign(b[1] - a[1]);
  return [dx, dy];
}

/** A w × h rectangle with a nw × nh notch cut into its long bottom side at x = nx … nx + nw (§13.1, §3.8's case). */
export function notched(w: number, h: number, nx: number, nw: number, nh: number, deg: number, cx = 0, cy = 0): Ring {
  return place(
    [
      [0, 0],
      [nx, 0],
      [nx, nh],
      [nx + nw, nh],
      [nx + nw, 0],
      [w, 0],
      [w, h],
      [0, h],
    ],
    deg,
    cx,
    cy,
  );
}

/** The interior angle of each corner of a ring (degrees, the interior on the left of a counter-clockwise ring). */
export function cornerAngles(ring: readonly LatticePoint[]): number[] {
  const n = ring.length;
  const out: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const p = ring[(i + n - 1) % n];
    const v = ring[i];
    const q = ring[(i + 1) % n];
    const a = Math.atan2(p.y - v.y, p.x - v.x) - Math.atan2(q.y - v.y, q.x - v.x);
    let deg = (a * 180) / Math.PI;
    while (deg < 0) deg += 360;
    while (deg >= 360) deg -= 360;
    out.push(deg);
  }
  return out;
}

/** Twice the signed area (exact for these sizes). */
export function area2Of(ring: readonly LatticePoint[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** Do the closed segments ab and cd share a point? Exact on lattice points. */
export function segmentsMeet(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  if (o1 * o2 < 0 && o3 * o4 < 0) return true;
  const on = (p: LatticePoint, q: LatticePoint, r: LatticePoint): boolean =>
    Math.min(p.x, q.x) <= r.x && r.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= r.y && r.y <= Math.max(p.y, q.y);
  return (o1 === 0 && on(a, b, c)) || (o2 === 0 && on(a, b, d)) || (o3 === 0 && on(c, d, a)) || (o4 === 0 && on(c, d, b));
}

/** Is the ring simple (no two non-adjacent edges meet)? */
export function isSimple(ring: readonly LatticePoint[]): boolean {
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 2; j < n; j += 1) {
      if (i === 0 && j === n - 1) continue;
      if (segmentsMeet(ring[i], ring[(i + 1) % n], ring[j], ring[(j + 1) % n])) return false;
    }
  }
  return true;
}

/** Do two rings meet anywhere? */
export function ringsMeet(a: readonly LatticePoint[], b: readonly LatticePoint[]): boolean {
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < b.length; j += 1) if (segmentsMeet(a[i], a[(i + 1) % a.length], b[j], b[(j + 1) % b.length])) return true;
  }
  return false;
}

/** Even–odd containment of a double point in a ring, strictly: false within `eps` of an edge. */
export function strictlyInside(ring: readonly LatticePoint[], x: number, y: number, eps: number): boolean {
  let inside = false;
  const n = ring.length;
  for (let i = 0, j = n - 1; i < n; j = i, i += 1) {
    const a = ring[j];
    const b = ring[i];
    // distance to the edge
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const len2 = ex * ex + ey * ey;
    const t = Math.max(0, Math.min(1, ((x - a.x) * ex + (y - a.y) * ey) / len2));
    const dx = a.x + ex * t - x;
    const dy = a.y + ey * t - y;
    if (dx * dx + dy * dy < eps * eps) return false;
    if (a.y > y !== b.y > y && x < a.x + ((y - a.y) * ex) / ey) inside = !inside;
  }
  return inside;
}

/** Is the double point inside the face (outer ring less its holes), allowing `eps` onto the boundary? */
export function inFace(rings: readonly (readonly LatticePoint[])[], x: number, y: number, eps: number): boolean {
  const near = (ring: readonly LatticePoint[]): boolean => {
    for (let i = 0; i < ring.length; i += 1) {
      const a = ring[i];
      const b = ring[(i + 1) % ring.length];
      const ex = b.x - a.x;
      const ey = b.y - a.y;
      const t = Math.max(0, Math.min(1, ((x - a.x) * ex + (y - a.y) * ey) / (ex * ex + ey * ey)));
      const dx = a.x + ex * t - x;
      const dy = a.y + ey * t - y;
      if (dx * dx + dy * dy <= eps * eps) return true;
    }
    return false;
  };
  if (rings.some(near)) return true;
  if (!strictlyInside(rings[0], x, y, 0)) return false;
  for (let h = 1; h < rings.length; h += 1) if (strictlyInside(rings[h], x, y, 0)) return false;
  return true;
}

/**
 * Does the segment pq (doubles) stay inside the face: both ends inside it (within `eps` of the boundary counted in)
 * and no ring edge crossed properly — each end of the edge more than `eps` on either side of pq's line and each end
 * of pq more than `eps` on either side of the edge's line? A segment between two points of a face that crosses none of
 * its rings stays in it.
 */
export function segmentInFace(rings: readonly (readonly LatticePoint[])[], px: number, py: number, qx: number, qy: number, eps: number): boolean {
  if (!inFace(rings, px, py, eps) || !inFace(rings, qx, qy, eps)) return false;
  const side = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number): number => {
    const len = Math.hypot(bx - ax, by - ay);
    if (len === 0) return 0;
    const d = ((bx - ax) * (cy - ay) - (by - ay) * (cx - ax)) / len;
    return d > eps ? 1 : d < -eps ? -1 : 0;
  };
  for (const ring of rings) {
    for (let i = 0; i < ring.length; i += 1) {
      const a = ring[i];
      const b = ring[(i + 1) % ring.length];
      const s1 = side(px, py, qx, qy, a.x, a.y);
      const s2 = side(px, py, qx, qy, b.x, b.y);
      const s3 = side(a.x, a.y, b.x, b.y, px, py);
      const s4 = side(a.x, a.y, b.x, b.y, qx, qy);
      if (s1 * s2 < 0 && s3 * s4 < 0) return false;
    }
  }
  return true;
}

/** The smallest interior angle of a ring and its largest (degrees). */
export function angleRange(ring: readonly LatticePoint[]): [number, number] {
  const a = cornerAngles(area2Of(ring) > 0 ? ring : [...ring].reverse());
  return [Math.min(...a), Math.max(...a)];
}

/**
 * A star-shaped ring about (cx, cy): `m` angles with gaps of at least `minGapDeg` and at most `maxGapDeg`, radii in
 * [rLo, rHi], snapped, counter-clockwise.
 */
export function starRing(rnd: () => number, m: number, rLo: number, rHi: number, minGapDeg: number, cx = 0, cy = 0, maxGapDeg = 360): Ring {
  for (;;) {
    const angles = Array.from({ length: m }, () => rnd() * 360).sort((a, b) => a - b);
    let okGaps = true;
    for (let i = 0; i < m; i += 1) {
      const g = i + 1 < m ? angles[i + 1] - angles[i] : angles[0] + 360 - angles[i];
      if (g < minGapDeg || g > maxGapDeg) okGaps = false;
    }
    if (!okGaps) continue;
    return angles.map((a) => {
      const r = rLo + rnd() * (rHi - rLo);
      const t = (a * Math.PI) / 180;
      return snapped(cx + r * Math.cos(t), cy + r * Math.sin(t));
    });
  }
}

/**
 * The 1 000 holed polygons of §13.1 at a seed: half star-shaped outer rings with one to three star-shaped or regular
 * holes, half rectilinear outer rectangles with one to four rectangular holes on a 50 cm grid (simultaneous events by
 * construction). Each keeps the numeric contract — every corner between 6° and 354°, holes apart from the outer ring
 * and each other by at least 50 cm — checked here independently; a draw that breaks it is redrawn.
 */
export function holedPolygons(seed: number, count = 1_000): Ring[][] {
  const rnd = generator(seed * 0x9e3779b1 + 7);
  const out: Ring[][] = [];
  while (out.length < count) {
    const rings = out.length % 2 === 0 ? starHoled(rnd) : gridHoled(rnd);
    if (rings !== null) out.push(rings);
  }
  return out;
}

function contractOk(rings: Ring[]): boolean {
  for (const r of rings) {
    if (!isSimple(r)) return false;
    const [lo, hi] = angleRange(r);
    if (lo < 6 || hi > 354) return false;
  }
  for (let i = 0; i < rings.length; i += 1) for (let j = i + 1; j < rings.length; j += 1) if (ringsMeet(rings[i], rings[j])) return false;
  return true;
}

function starHoled(rnd: () => number): Ring[] | null {
  const R = intIn(rnd, 2_000, 6_000);
  // gaps of at most 75° keep the disc of radius 0.8 R · cos 37.5° ≈ 0.63 R inside the outer ring, where the holes go
  const outer = starRing(rnd, intIn(rnd, 6, 16), R * 0.8, R, 12, 0, 0, 75);
  const holes: Ring[] = [];
  const centres: [number, number, number][] = [];
  const h = intIn(rnd, 1, 3);
  for (let tries = 0; holes.length < h && tries < 50; tries += 1) {
    const r = intIn(rnd, 150, Math.floor(R * 0.2));
    const t = rnd() * 2 * Math.PI;
    const d = rnd() * (R * 0.55 - r);
    const cx = d * Math.cos(t);
    const cy = d * Math.sin(t);
    if (centres.some(([x, y, q]) => Math.hypot(x - cx, y - cy) < q + r + 80)) continue;
    const hole = rnd() < 0.5 ? regularNgon(intIn(rnd, 3, 8), r, rnd() * Math.PI, cx, cy) : starRing(rnd, intIn(rnd, 4, 9), r * 0.7, r, 25, cx, cy);
    holes.push(hole);
    centres.push([cx, cy, r]);
  }
  if (holes.length === 0) return null;
  const rings = [outer, ...holes];
  return contractOk(rings) ? rings : null;
}

function gridHoled(rnd: () => number): Ring[] | null {
  const W = intIn(rnd, 20, 80) * 50;
  const H = intIn(rnd, 20, 80) * 50;
  const ox = intIn(rnd, -200, 200) * 50;
  const oy = intIn(rnd, -200, 200) * 50;
  const outer = [pt(ox, oy), pt(ox + W, oy), pt(ox + W, oy + H), pt(ox, oy + H)];
  const holes: Ring[] = [];
  const boxes: [number, number, number, number][] = [];
  const h = intIn(rnd, 1, 4);
  for (let tries = 0; holes.length < h && tries < 60; tries += 1) {
    const w = intIn(rnd, 2, Math.max(2, Math.floor(W / 150))) * 50;
    const hh = intIn(rnd, 2, Math.max(2, Math.floor(H / 150))) * 50;
    const x = intIn(rnd, 1, Math.max(1, (W - w) / 50 - 1)) * 50;
    const y = intIn(rnd, 1, Math.max(1, (H - hh) / 50 - 1)) * 50;
    if (x < 50 || y < 50 || x + w > W - 50 || y + hh > H - 50) continue;
    if (boxes.some(([bx, by, bw, bh]) => x < bx + bw + 50 && bx < x + w + 50 && y < by + bh + 50 && by < y + hh + 50)) continue;
    boxes.push([x, y, w, hh]);
    holes.push([pt(ox + x, oy + y), pt(ox + x + w, oy + y), pt(ox + x + w, oy + y + hh), pt(ox + x, oy + y + hh)]);
  }
  if (holes.length === 0) return null;
  const rings = [outer, ...holes];
  return contractOk(rings) ? rings : null;
}

/** §13.1's snapped rotated squares at a seed: sides 3 – 30 m, random angles and centres. */
export function rotatedSquares(seed: number, count: number): Ring[] {
  const rnd = generator(seed * 0x85ebca6b + 3);
  const out: Ring[] = [];
  for (let i = 0; i < count; i += 1) {
    const s = intIn(rnd, 300, 3_000);
    out.push(rectangle(s, s, rnd() * 90, intIn(rnd, -100_000, 100_000) + rnd(), intIn(rnd, -100_000, 100_000) + rnd()));
  }
  return out;
}

/** A star-shaped ring of `m` vertices about the origin at evenly spaced, jittered angles and radii in [rLo, rHi]. */
export function jitteredStar(rnd: () => number, m: number, rLo: number, rHi: number, cx = 0, cy = 0): Ring {
  const out: Ring = [];
  for (let k = 0; k < m; k += 1) {
    const a = ((k + 0.15 + rnd() * 0.7) * 2 * Math.PI) / m;
    const r = rLo + rnd() * (rHi - rLo);
    const p = snapped(cx + r * Math.cos(a), cy + r * Math.sin(a));
    const q = out[out.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) out.push(p);
  }
  return out;
}

/** Every arc of a skeleton graph inside its face (within 0.1 mm of the boundary counted in): no roof line outside. */
export function arcsInFace(g: { rings: readonly (readonly LatticePoint[])[]; nodes: readonly { x: number; y: number }[]; arcs: readonly { a: number; b: number }[] }): boolean {
  for (const e of g.arcs) {
    const p = g.nodes[e.a];
    const q = g.nodes[e.b];
    if (!segmentInFace(g.rings, p.x, p.y, q.x, q.y, 0.01)) return false;
  }
  return true;
}
