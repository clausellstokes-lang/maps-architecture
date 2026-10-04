// M0-a-10: regularFit — §3.4 *The regular fit* and §13.1's fixtures of item 45: regular n-gons (n = 3 … 12, radius
// ≥ 5 m) rotated and snapped return every target within 1 cm of its vertex and a compactness within 10⁻³ of that
// n-gon's own; every rotation of a ring's vertex order and its reversal return identical targets bit for bit; a thin
// rectangle (1 : 3 or thinner) falls below compactness 0.75 with its targets on a square; a side split into many short
// edges leaves the centre unchanged; fewer than three vertices, a zero-area ring and a vanishing first component return
// E_DEGENERATE (detail `fit`).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { regularFit, type RegularFit } from '../../src/geom/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { TIMEOUT, generator, intIn, pt, regularNgon, rotate } from './support.js';

const FIT = { ok: false, code: 'E_DEGENERATE', detail: 'fit' };

function fitOf(ring: readonly LatticePoint[]): RegularFit {
  const r = regularFit(ring);
  if (!r.ok) throw new Error(`fit refused: ${r.code} ${r.detail}`);
  return r.value;
}

/** The regular n-gon's own compactness 4πA ÷ P² = π ÷ (n · tan(π ÷ n)). */
const ngonCompactness = (n: number): number => Math.PI / (n * Math.tan(Math.PI / n));

describe('regularFit — item 45 (§3.4, §13.1)', () => {
  it('regular n-gons (n = 3 … 12, radius ≥ 5 m) rotated and snapped: every target within 1 cm, compactness within 10⁻³', () => {
    const rnd = generator(4501);
    let worstTarget = 0;
    let worstCompact = 0;
    for (let n = 3; n <= 12; n += 1) {
      for (let t = 0; t < 300; t += 1) {
        const r = t === 0 ? 500 : intIn(rnd, 500, 200_000);
        const ring = regularNgon(n, r, rnd() * 2 * Math.PI, intIn(rnd, -4e6, 4e6), intIn(rnd, -4e6, 4e6));
        const f = fitOf(ring);
        expect(f.n).toBe(n);
        ring.forEach((p, i) => {
          const d = Math.hypot(f.targets[i].x - p.x, f.targets[i].y - p.y);
          worstTarget = Math.max(worstTarget, d);
          expect(d).toBeLessThanOrEqual(1);
        });
        const dc = Math.abs(f.compactness - ngonCompactness(n));
        worstCompact = Math.max(worstCompact, dc);
        expect(dc).toBeLessThanOrEqual(1e-3);
        expect(Math.abs(f.radiusCm - r)).toBeLessThan(1);
      }
    }
    expect(worstTarget).toBeLessThan(1);
    expect(worstCompact).toBeLessThan(1e-3);
  }, TIMEOUT);

  it('every rotation of the vertex order and its reversal give identical targets, centre, radius and phase, bit for bit', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 0x7fffffff }), fc.integer({ min: 3, max: 16 }), (seed, n) => {
        const rnd = generator(seed);
        // a convex-ish ring with jittered radii, so the vertices are not a regular polygon
        const ring = regularNgon(n, intIn(rnd, 1000, 100_000), rnd() * 6, intIn(rnd, -1e6, 1e6), intIn(rnd, -1e6, 1e6)).map((p) => pt(p.x + intIn(rnd, -200, 200), p.y + intIn(rnd, -200, 200)));
        const r0 = regularFit(ring);
        if (!r0.ok) return;
        const base = r0.value;
        for (let k = 0; k < ring.length; k += 1) {
          const f = fitOf(rotate(ring, k));
          expect(f.centre).toEqual(base.centre);
          expect(f.radiusCm).toBe(base.radiusCm);
          expect(f.phaseCdeg).toBe(base.phaseCdeg);
          expect(f.compactness).toBe(base.compactness);
          f.targets.forEach((t, i) => expect(t).toEqual(base.targets[(i + k) % ring.length]));
        }
        const rev = fitOf(ring.slice().reverse());
        expect(rev.centre).toEqual(base.centre);
        expect(rev.radiusCm).toBe(base.radiusCm);
        expect(rev.phaseCdeg).toBe(base.phaseCdeg);
        rev.targets.forEach((t, i) => expect(t).toEqual(base.targets[ring.length - 1 - i]));
      }),
      { numRuns: 300 },
    );
  }, TIMEOUT);

  it('a thin rectangle (1 : 3 and thinner) falls below compactness 0.75, its targets lying on a square', () => {
    for (const [w, h] of [[3000, 1000], [9000, 1000], [1000, 4000]]) {
      const f = fitOf([pt(100, 200), pt(100 + w, 200), pt(100 + w, 200 + h), pt(100, 200 + h)]);
      expect(f.compactness).toBeLessThan(0.75);
      const t = f.targets;
      const side = (i: number): number => Math.hypot(t[(i + 1) % 4].x - t[i].x, t[(i + 1) % 4].y - t[i].y);
      for (let i = 0; i < 4; i += 1) {
        expect(Math.abs(side(i) - side(0))).toBeLessThan(1e-6 * side(0));
        const ax = t[(i + 1) % 4].x - t[i].x;
        const ay = t[(i + 1) % 4].y - t[i].y;
        const bx = t[(i + 2) % 4].x - t[(i + 1) % 4].x;
        const by = t[(i + 2) % 4].y - t[(i + 1) % 4].y;
        expect(Math.abs(ax * bx + ay * by)).toBeLessThan(1e-6 * side(0) * side(0));
      }
      expect(f.centre.x).toBeCloseTo(100 + w / 2, 9);
      expect(f.centre.y).toBeCloseTo(200 + h / 2, 9);
    }
  });

  it('a side split into many short edges leaves the centre unchanged, bit for bit (the area centroid, exact)', () => {
    const rnd = generator(77);
    for (let t = 0; t < 200; t += 1) {
      const n = intIn(rnd, 3, 9);
      // an n-gon on a 10 m lattice, so every side holds collinear lattice points to split it at
      const cx = intIn(rnd, -2e6, 2e6);
      const cy = intIn(rnd, -2e6, 2e6);
      const ring = regularNgon(n, intIn(rnd, 5, 500), rnd() * 6).map((p) => pt(p.x * 1000 + cx, p.y * 1000 + cy));
      const i = intIn(rnd, 0, n - 1);
      const a = ring[i];
      const b = ring[(i + 1) % n];
      // collinear lattice points on side a → b by gcd stepping (§13.1 (2))
      const g = gcd(b.x - a.x, b.y - a.y);
      const sx = (b.x - a.x) / g;
      const sy = (b.y - a.y) / g;
      const extra: LatticePoint[] = [];
      for (let k = 1; k < g && extra.length < 40; k += Math.max(1, Math.floor(g / 41))) extra.push(pt(a.x + k * sx, a.y + k * sy));
      expect(extra.length).toBeGreaterThan(0);
      const split = [...ring.slice(0, i + 1), ...extra, ...ring.slice(i + 1)];
      expect(fitOf(split).centre).toEqual(fitOf(ring).centre);
    }
  }, TIMEOUT);

  it('returns E_DEGENERATE `fit` for fewer than three vertices, a zero-area ring and a vanishing first component', () => {
    expect(regularFit([])).toEqual(FIT);
    expect(regularFit([pt(0, 0), pt(1000, 0)])).toEqual(FIT);
    expect(regularFit([pt(0, 0), pt(1000, 0), pt(2000, 0)])).toEqual(FIT); // collinear: zero area
    expect(regularFit([pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(1000, 0)])).toEqual(FIT); // retraced: zero area
    expect(regularFit([pt(5, 5), pt(5, 5), pt(5, 5)])).toEqual(FIT);
    // radius below 1 cm: a tiny triangle, and a simple 7-gon of 33 m² whose first component is 0.23 cm (found by search)
    expect(regularFit([pt(0, 0), pt(1, 0), pt(0, 1)])).toEqual(FIT);
    const vanishing = [pt(1538, 1177), pt(2142, 797), pt(1336, 2191), pt(1461, 685), pt(1516, 1219), pt(1460, 1385), pt(1386, 2058)];
    expect(regularFit(vanishing)).toEqual(FIT);
    expect(regularFit(vanishing.slice().reverse())).toEqual(FIT);
  });

  it('refuses a coordinate off the lattice with E_OUT_OF_RANGE', () => {
    expect(regularFit([pt(0, 0), pt(1000, 0), { x: 3, y: Number.POSITIVE_INFINITY } as LatticePoint])).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'y' });
  });

  it('gives a square its own corners, the phase of its lowest-leftmost corner and compactness π ÷ 4', () => {
    const f = fitOf([pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)]);
    expect(f.centre).toEqual({ x: 500, y: 500 });
    expect(f.phaseCdeg).toBe(22_500); // (0, 0) about (500, 500): 225°
    expect(Math.abs(f.radiusCm - 500 * Math.SQRT2)).toBeLessThan(1e-9);
    expect(Math.abs(f.compactness - Math.PI / 4)).toBeLessThan(1e-12);
    f.targets.forEach((t, i) => {
      const p = [pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)][i];
      expect(Math.hypot(t.x - p.x, t.y - p.y)).toBeLessThan(1e-9);
    });
  });
});

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}
