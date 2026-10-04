// M0-a-10: hull (Andrew's monotone chain) and obb (rotating calipers) — §3.1, §3.4's one contract (GEO-7), §13.1:
// "OBB contains the hull; collinear input returns E_DEGENERATE". The hull is judged against the extreme-point
// definition; the box against a brute-force minimum over every hull edge (Freeman–Shapira: the minimum-area box has a
// side on a hull edge).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { hull, obb } from '../../src/geom/index.js';
import { orient2d } from '../../src/num/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { MAX, TIMEOUT, constructiveRing, generator, intIn, latticePoint, pt, randomRing, rotate, snapped } from './support.js';

/** Every point on or left of every hull edge (counter-clockwise): exact. */
function containsAll(h: readonly LatticePoint[], pts: readonly LatticePoint[]): boolean {
  for (let i = 0; i < h.length; i += 1) {
    const a = h[i];
    const b = h[(i + 1) % h.length];
    for (const p of pts) if (orient2d(a.x, a.y, b.x, b.y, p.x, p.y) < 0) return false;
  }
  return true;
}

/** Strictly convex and counter-clockwise: every consecutive triple a strict left turn. */
function strictlyConvex(h: readonly LatticePoint[]): boolean {
  const n = h.length;
  for (let i = 0; i < n; i += 1) {
    const a = h[i];
    const b = h[(i + 1) % n];
    const c = h[(i + 2) % n];
    if (orient2d(a.x, a.y, b.x, b.y, c.x, c.y) <= 0) return false;
  }
  return true;
}

/** The extreme points by definition: a point is a hull corner iff it is not in the closed hull of the others minus itself. */
function bruteHullSet(pts: readonly LatticePoint[]): Set<string> {
  const uniq = [...new Map(pts.map((p) => [`${p.x},${p.y}`, p])).values()];
  const out = new Set<string>();
  for (const p of uniq) {
    // p is extreme iff some line through p has every other point strictly on one side or on the line but not beyond p
    // — equivalently, p is not in the convex hull of the others: test against every triangle and segment of the others.
    const others = uniq.filter((q) => q !== p);
    let inside = false;
    for (let i = 0; i < others.length && !inside; i += 1) {
      for (let j = i + 1; j < others.length && !inside; j += 1) {
        const a = others[i];
        const b = others[j];
        if (orient2d(a.x, a.y, b.x, b.y, p.x, p.y) === 0 && Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y)) inside = true;
        for (let k = j + 1; k < others.length && !inside; k += 1) {
          const c = others[k];
          const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, p.x, p.y));
          const o2 = Math.sign(orient2d(b.x, b.y, c.x, c.y, p.x, p.y));
          const o3 = Math.sign(orient2d(c.x, c.y, a.x, a.y, p.x, p.y));
          if ((o1 >= 0 && o2 >= 0 && o3 >= 0) || (o1 <= 0 && o2 <= 0 && o3 <= 0)) {
            if (orient2d(a.x, a.y, b.x, b.y, c.x, c.y) !== 0) inside = true;
          }
        }
      }
    }
    if (!inside) out.add(`${p.x},${p.y}`);
  }
  return out;
}

/** The brute-force minimum box area over every hull edge. */
function bruteMinArea(h: readonly LatticePoint[]): number {
  let best = Infinity;
  for (let i = 0; i < h.length; i += 1) {
    const a = h[i];
    const b = h[(i + 1) % h.length];
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const len = Math.hypot(ex, ey);
    let lo = Infinity;
    let hi = -Infinity;
    let top = 0;
    for (const p of h) {
      const d = ((p.x - a.x) * ex + (p.y - a.y) * ey) / len;
      const c = ((p.x - a.x) * ey * -1 + (p.y - a.y) * ex) / len;
      lo = Math.min(lo, d);
      hi = Math.max(hi, d);
      top = Math.max(top, c);
    }
    best = Math.min(best, (hi - lo) * top);
  }
  return best;
}

/** Every point inside the box, to a tolerance of `eps` cm. */
function boxContains(box: { centre: { x: number; y: number }; major: { x: number; y: number }; minor: { x: number; y: number }; majorCm: number; minorCm: number }, pts: readonly LatticePoint[], eps: number): boolean {
  for (const p of pts) {
    const dx = p.x - box.centre.x;
    const dy = p.y - box.centre.y;
    const u = dx * box.major.x + dy * box.major.y;
    const v = dx * box.minor.x + dy * box.minor.y;
    if (Math.abs(u) > box.majorCm / 2 + eps || Math.abs(v) > box.minorCm / 2 + eps) return false;
  }
  return true;
}

describe('hull (§3.1, §3.4)', () => {
  it('returns the strict hull counter-clockwise from the lowest-leftmost corner, collinear and inner points dropped', () => {
    const r = hull([pt(10, 10), pt(0, 0), pt(5, 0), pt(10, 0), pt(10, 5), pt(0, 10), pt(5, 5), pt(0, 0), pt(0, 5)]);
    expect(r.ok && r.value).toEqual([pt(0, 0), pt(10, 0), pt(10, 10), pt(0, 10)]);
  });

  it('returns E_DEGENERATE `collinear` for fewer than 3 distinct points or a collinear set (GEO-7)', () => {
    for (const pts of [[], [pt(0, 0)], [pt(0, 0), pt(5, 5)], [pt(1, 1), pt(1, 1), pt(1, 1)], [pt(0, 0), pt(3, 1), pt(6, 2), pt(9, 3), pt(-3, -1)]]) {
      expect(hull(pts)).toEqual({ ok: false, code: 'E_DEGENERATE', detail: 'collinear' });
    }
  });

  it('refuses a coordinate off the lattice with E_OUT_OF_RANGE (x first), never a value', () => {
    expect(hull([pt(0, 0), pt(10, 0), { x: Number.NaN, y: 3 } as LatticePoint])).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'x' });
    expect(hull([pt(0, 0), pt(10, 0), { x: 3, y: 2 ** 23 } as LatticePoint])).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'y' });
    expect(hull([pt(0, 0), pt(10, 0), { x: 0.5, y: 3 } as LatticePoint])).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
  });

  it('equals the extreme points of the set, strictly convex, containing every point — on random small sets', () => {
    fc.assert(
      fc.property(fc.array(fc.oneof(latticePoint(40), latticePoint()), { minLength: 0, maxLength: 14 }), (pts) => {
        const r = hull(pts);
        const brute = bruteHullSet(pts);
        if (!r.ok) {
          expect(r.detail).toBe('collinear');
          expect(brute.size).toBeLessThan(3);
          return;
        }
        expect(strictlyConvex(r.value)).toBe(true);
        expect(containsAll(r.value, pts)).toBe(true);
        expect(new Set(r.value.map((p) => `${p.x},${p.y}`))).toEqual(brute);
        const low = r.value.reduce((m, p) => (p.y < m.y || (p.y === m.y && p.x < m.x) ? p : m));
        expect(r.value[0]).toEqual(low);
      }),
      { numRuns: 2000 },
    );
  }, TIMEOUT);
});

describe('obb (§3.1 rotating calipers, §3.4, §13.1)', () => {
  it('gives an axis-aligned rectangle its own sides, the long one as the major axis', () => {
    const r = obb([pt(0, 0), pt(4000, 0), pt(4000, 1000), pt(0, 1000)]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.majorCm).toBe(4000);
    expect(r.value.minorCm).toBe(1000);
    expect(r.value.major).toEqual({ x: 1, y: 0 });
    expect(r.value.minor).toEqual({ x: -0, y: 1 });
    expect(r.value.centre).toEqual({ x: 2000, y: 500 });
  });

  it('finds a rotated snapped rectangle to the snap\'s accuracy', () => {
    const a = 0.3;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const ring = [[0, 0], [3000, 0], [3000, 800], [0, 800]].map(([x, y]) => snapped(x * c - y * s + 1e5, x * s + y * c - 2e5));
    const r = obb(ring);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(Math.abs(r.value.majorCm - 3000)).toBeLessThan(2);
    expect(Math.abs(r.value.minorCm - 800)).toBeLessThan(2);
    expect(Math.abs(Math.atan2(r.value.major.y, r.value.major.x) - a)).toBeLessThan(1e-3);
  });

  it('returns E_DEGENERATE `collinear` for fewer than 3 distinct points or a collinear hull — never ok with a zero extent', () => {
    expect(obb([pt(0, 0), pt(1, 1)])).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'collinear' });
    expect(obb([pt(0, 0), pt(2, 2), pt(4, 4), pt(2, 2)])).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'collinear' });
    expect(obb([pt(-MAX, -MAX), pt(MAX, MAX), pt(0, 0)])).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'collinear' });
    // the thinnest non-collinear triangle at the range's edge still has a positive minor extent
    const thin = obb([pt(-MAX, -MAX), pt(MAX, MAX), pt(0, 1)]);
    expect(thin.ok && thin.value.minorCm > 0).toBe(true);
  });

  it('contains the hull, is the minimum-area box over the hull edges, and has unit orthogonal axes (random and constructive rings)', () => {
    fc.assert(
      fc.property(fc.oneof(randomRing(false), constructiveRing()), (ring) => {
        const r = obb(ring);
        const h = hull(ring);
        expect(r.ok).toBe(h.ok);
        if (!r.ok || !h.ok) return;
        const b = r.value;
        expect(b.minorCm).toBeGreaterThan(0);
        expect(b.majorCm).toBeGreaterThanOrEqual(b.minorCm);
        expect(Math.abs(Math.hypot(b.major.x, b.major.y) - 1)).toBeLessThan(1e-12);
        expect(b.minor).toEqual({ x: -b.major.y, y: b.major.x });
        expect(b.major.x > 0 || (b.major.x === 0 && b.major.y > 0)).toBe(true);
        const scale = Math.max(1, ...ring.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))));
        expect(boxContains(b, h.value, scale * 1e-9)).toBe(true);
        const brute = bruteMinArea(h.value);
        expect(Math.abs(b.majorCm * b.minorCm - brute)).toBeLessThanOrEqual(brute * 1e-9 + 1e-6);
      }),
      { numRuns: 3000 },
    );
  }, TIMEOUT);

  it('is a function of the point set: every rotation and the reversal of a ring give the same box, bit for bit', () => {
    const rnd = generator(45);
    for (let t = 0; t < 200; t += 1) {
      const n = intIn(rnd, 3, 30);
      const ring = Array.from({ length: n }, () => pt(intIn(rnd, -1e6, 1e6), intIn(rnd, -1e6, 1e6)));
      const base = obb(ring);
      for (let k = 0; k < n; k += 1) expect(obb(rotate(ring, k))).toEqual(base);
      expect(obb(ring.slice().reverse())).toEqual(base);
    }
  }, TIMEOUT);
});
