// Test support for M0-a-10's geometry services: lattice points, the constructive classes of §13.1 (regular n-gons
// rotated and snapped, snapped rotated squares, star rings of radius 2²³ − 2), random simple and degenerate rings, and
// the independent references the tests judge with — exact containment, a brute-force minimum-area rectangle, segment
// crossings — written here from their definitions, never with the code under test.
import fc from 'fast-check';
import { orient2d, snap } from '../../src/num/index.js';
import type { Cm, LatticePoint } from '../../src/types/index.js';

/** 2²³ and the largest coordinate snap accepts. */
export const RANGE = 2 ** 23;
export const MAX = RANGE - 1;

/** The hard timeout of a property at PLAT_FUZZ_RUNS (10⁶ nightly, C-0057) on the shared machine; never a timing. */
export const TIMEOUT = 600_000;

export interface XY {
  x: number;
  y: number;
}

/** A lattice point from integers the test already holds in range. */
export const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** A double through snap, which must accept it. */
export function snapped(x: number, y: number): LatticePoint {
  const r = snap(x, y);
  if (!r.ok) throw new Error(`support: (${x}, ${y}) is out of range`);
  return r.value;
}

/** mulberry32: a seeded u32 generator for the fixed-size loops, independent of fast-check. */
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

/** The regular n-gon of radius r about (cx, cy), its first corner at angle a (radians), counter-clockwise, snapped. */
export function regularNgon(n: number, r: number, a: number, cx = 0, cy = 0): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let k = 0; k < n; k += 1) out.push(snapped(cx + r * Math.cos(a + (2 * Math.PI * k) / n), cy + r * Math.sin(a + (2 * Math.PI * k) / n)));
  return out;
}

/** The star polygon {n/k} of radius 2²³ − 2 about the origin (§13.1's star rings; self-crossing for k ≥ 2). */
export function starRing(n: number, k: number, phase = 0): LatticePoint[] {
  const R = 2 ** 23 - 2;
  const out: LatticePoint[] = [];
  for (let j = 0; j < n; j += 1) {
    const a = phase + (2 * Math.PI * j * k) / n;
    out.push(snapped(R * Math.cos(a), R * Math.sin(a)));
  }
  return out;
}

/** A simple star-shaped ring: angles sorted, radii random — simple by construction (distinct angles about a kernel point). */
export function starShaped(rnd: () => number, n: number, rMin: number, rMax: number, cx = 0, cy = 0): LatticePoint[] {
  const angles = Array.from({ length: n }, () => rnd() * 2 * Math.PI).sort((a, b) => a - b);
  const out: LatticePoint[] = [];
  for (const a of angles) {
    const r = rMin + rnd() * (rMax - rMin);
    const p = snapped(cx + r * Math.cos(a), cy + r * Math.sin(a));
    const q = out[out.length - 1];
    if (q === undefined || q.x !== p.x || q.y !== p.y) out.push(p);
  }
  return out;
}

/** The ring started at its k-th vertex. */
export const rotate = <T>(ring: readonly T[], k: number): T[] => [...ring.slice(k), ...ring.slice(0, k)];

/** Is the ring simple (no two non-adjacent edges meet, no adjacent edges overlap)? Exact on lattice points. */
export function isSimple(ring: readonly LatticePoint[]): boolean {
  const n = ring.length;
  if (n < 3) return false;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    if (a.x === b.x && a.y === b.y) return false;
    for (let j = i + 1; j < n; j += 1) {
      const c = ring[j];
      const d = ring[(j + 1) % n];
      const adjacent = j === i + 1 || (i === 0 && j === n - 1);
      if (adjacent) {
        // adjacent edges share one vertex; they may not fold back onto each other
        const shared = j === i + 1 ? b : a;
        const other1 = j === i + 1 ? a : b;
        const other2 = j === i + 1 ? d : c;
        if (orient2d(other1.x, other1.y, shared.x, shared.y, other2.x, other2.y) === 0) {
          const dot = (other1.x - shared.x) * (other2.x - shared.x) + (other1.y - shared.y) * (other2.y - shared.y);
          if (dot > 0) return false;
        }
        continue;
      }
      if (segmentsMeet(a, b, c, d)) return false;
    }
  }
  return true;
}

function onSeg(a: XY, b: XY, p: XY): boolean {
  return Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y);
}

/** Do the closed segments ab and cd share a point? Exact on lattice points. */
export function segmentsMeet(a: XY, b: XY, c: XY, d: XY): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSeg(a, b, c)) return true;
  if (o2 === 0 && onSeg(a, b, d)) return true;
  if (o3 === 0 && onSeg(c, d, a)) return true;
  if (o4 === 0 && onSeg(c, d, b)) return true;
  return false;
}

/** Do segments ab and cd cross at a point interior to both (a proper crossing)? Exact on lattice points. */
export function properCross(a: XY, b: XY, c: XY, d: XY): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  return o1 * o2 < 0 && o3 * o4 < 0;
}

/** Even–odd containment of a double point in a lattice ring, strictly: false within `eps` of an edge. */
export function strictlyInsideD(ring: readonly LatticePoint[], q: XY, eps: number): boolean {
  let inside = false;
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    if (distToSeg(q, a, b) <= eps) return false;
    if (a.y > q.y !== b.y > q.y) {
      const x = a.x + ((q.y - a.y) * (b.x - a.x)) / (b.y - a.y);
      if (x > q.x) inside = !inside;
    }
  }
  return inside;
}

/** The distance from p to the segment ab. */
export function distToSeg(p: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y);
}

/**
 * Does the rectangle (four corners, counter-clockwise) lie strictly inside the lattice ring? Every corner strictly
 * inside, no ring vertex inside or on the rectangle, and no ring edge crossing a rectangle side — decided with a
 * tolerance far below the services' margin.
 */
export function rectInside(ring: readonly LatticePoint[], corners: readonly XY[], eps = 1e-7): boolean {
  for (const c of corners) if (!strictlyInsideD(ring, c, eps)) return false;
  // no ring vertex inside the rectangle (closed, widened by eps)
  for (const v of ring) {
    let inside = true;
    for (let i = 0; i < 4; i += 1) {
      const a = corners[i];
      const b = corners[(i + 1) % 4];
      const o = (b.x - a.x) * (v.y - a.y) - (b.y - a.y) * (v.x - a.x);
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      if (o / len < -eps) inside = false;
    }
    if (inside) return false;
  }
  // no ring edge crossing a side: sides are inside the ring and no vertex lies in the rectangle, so a crossing edge
  // would have to enter through one side and leave through another — checked with doubles at the margin's scale
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    for (let k = 0; k < 4; k += 1) {
      const c = corners[k];
      const d = corners[(k + 1) % 4];
      const d1 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
      const d2 = (b.x - a.x) * (d.y - a.y) - (b.y - a.y) * (d.x - a.x);
      const d3 = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
      const d4 = (d.x - c.x) * (b.y - c.y) - (d.y - c.y) * (b.x - c.x);
      if (d1 * d2 < 0 && d3 * d4 < 0) return false;
    }
  }
  return true;
}

/** Twice the signed area of a double ring. */
export function area2D(ring: readonly XY[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const p = ring[i];
    const q = ring[(i + 1) % ring.length];
    s += p.x * q.y - q.x * p.y;
  }
  return s;
}

/** A lattice coordinate. */
export const coord = (lim = MAX): fc.Arbitrary<number> => fc.integer({ min: -Math.floor(lim), max: Math.floor(lim) });

/** A lattice point within ±lim. */
export const latticePoint = (lim = MAX): fc.Arbitrary<LatticePoint> => fc.tuple(coord(lim), coord(lim)).map(([x, y]) => pt(x, y));

/**
 * §13.1 (1)'s random rings: star-shaped simple rings (concave), thin ones, near-collinear ones, rings with a duplicated
 * vertex, self-touching (a vertex repeated apart), self-crossing (random order), zero-area (retraced) and, rarely,
 * ≥ 300-vertex ones; anywhere in range. `large` admits the 300-vertex family.
 */
export function randomRing(large = true): fc.Arbitrary<LatticePoint[]> {
  const seed = fc.integer({ min: 0, max: 0x7fffffff });
  const centre = fc.tuple(coord(MAX - 2_000_000), coord(MAX - 2_000_000));
  const star = fc.tuple(seed, centre, fc.integer({ min: 3, max: 40 }), fc.integer({ min: 30, max: 1_000_000 })).map(([s, [cx, cy], n, r]) => {
    const rnd = generator(s);
    return starShaped(rnd, n, r * 0.2, r, cx, cy);
  });
  const big = fc.tuple(seed, centre).map(([s, [cx, cy]]) => starShaped(generator(s), 320, 2_000, 900_000, cx, cy));
  const thin = fc.tuple(latticePoint(MAX - 1000), fc.integer({ min: 30, max: 1_000_000 }), fc.integer({ min: 1, max: 3 }), fc.integer({ min: -1000, max: 1000 })).map(([p, len, w, dx]) => [
    p,
    pt(p.x + len, p.y + dx),
    pt(p.x + len, p.y + dx + w),
    pt(p.x, p.y + w),
  ].map((q) => pt(Math.max(-MAX, Math.min(MAX, q.x)), Math.max(-MAX, Math.min(MAX, q.y)))));
  const nearCollinear = fc.tuple(latticePoint(MAX / 2), fc.integer({ min: 1, max: 1000 }), fc.integer({ min: 1, max: 1000 }), fc.integer({ min: 2, max: 20 }), fc.integer({ min: -1, max: 1 })).map(([p, dx, dy, k, bump]) => {
    const out: LatticePoint[] = [];
    for (let i = 0; i <= k; i += 1) out.push(pt(p.x + i * dx, p.y + i * dy + (i === 1 ? bump : 0)));
    return out;
  });
  const dup = fc.tuple(star, fc.nat()).map(([r, k]) => {
    const i = k % r.length;
    const out = r.slice();
    out.splice(i, 0, r[i]);
    return out;
  });
  const retraced = fc.tuple(latticePoint(MAX / 2), latticePoint(MAX / 2), latticePoint(MAX / 2)).map(([a, b, c]) => [a, b, c, b]);
  const crossing = fc.array(latticePoint(), { minLength: 3, maxLength: 24 });
  const arbs: fc.Arbitrary<LatticePoint[]>[] = [star, star, thin, nearCollinear, dup, retraced, crossing];
  if (large) arbs.push(big);
  return fc.oneof(...arbs);
}

/** §13.1 (2)'s constructive classes for the ring services: regular n-gons (3 … 12) rotated and snapped, snapped rotated squares, star rings. */
export function constructiveRing(): fc.Arbitrary<LatticePoint[]> {
  const ngon = fc.tuple(fc.integer({ min: 3, max: 12 }), fc.integer({ min: 500, max: 2_000_000 }), fc.double({ min: 0, max: 2 * Math.PI, noNaN: true }), coord(MAX - 2_100_000), coord(MAX - 2_100_000)).map(([n, r, a, cx, cy]) =>
    regularNgon(n, r, a, cx, cy),
  );
  const square = fc.tuple(fc.integer({ min: 25, max: 3_000_000 }), fc.double({ min: 0, max: Math.PI / 2, noNaN: true }), coord(MAX - 4_300_000), coord(MAX - 4_300_000)).map(([s, a, cx, cy]) => {
    const r = s / Math.SQRT2;
    return regularNgon(4, r, a + Math.PI / 4, cx, cy);
  });
  const star = fc.tuple(fc.integer({ min: 5, max: 16 }), fc.integer({ min: 1, max: 7 }), fc.double({ min: 0, max: 1, noNaN: true })).map(([n, k, ph]) => starRing(n, Math.min(k, Math.floor((n - 1) / 2)) || 1, ph));
  return fc.oneof(ngon, square, star);
}
