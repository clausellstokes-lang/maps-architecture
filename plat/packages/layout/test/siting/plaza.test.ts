// The main plaza (§4.2 S3 (2); C-0032; M0-c-01): a compact polygon at the nucleus, compactness ≥ 0.8, its area in the
// rung's band, its vertices the attach points routes end at.
import { CONCERNS, streamFromKey } from '@plat/kernel';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { area2Of } from '../../src/siting/geom.js';
import { angularGap, bearingCdeg, compactnessOf, flatFixture, plaza, PLAZA_AREA_BAND_HA, PLAZA_COMPACTNESS_MIN, ringIsSimple } from '../../src/index.js';
import { P, SEEDS, sliceOf } from './support.js';

const key = fc.array(fc.integer({ min: 0, max: 0xffffffff }), { minLength: 4, maxLength: 4 });

describe('the main plaza (§4.2 S3 (2))', () => {
  it('has compactness ≥ 0.8 and its area in the CITY band (0.35 – 0.6 ha), 5 or 6 vertices, counter-clockwise and simple', () => {
    fc.assert(
      fc.property(key, fc.integer({ min: -100_000, max: 100_000 }), fc.integer({ min: -100_000, max: 100_000 }), (k, x, y) => {
        const p = plaza(P(x, y), streamFromKey(k));
        expect(p.compactness).toBeGreaterThanOrEqual(PLAZA_COMPACTNESS_MIN);
        expect(p.compactness).toBe(compactnessOf(p.ring));
        expect(p.areaCm2).toBeGreaterThanOrEqual(0.35e8);
        expect(p.areaCm2).toBeLessThanOrEqual(0.6e8);
        expect(p.areaCm2).toBe(area2Of(p.ring) / 2);
        expect([5, 6]).toContain(p.vertices);
        expect(p.ring.length).toBe(p.vertices);
        expect(ringIsSimple(p.ring)).toBe(true);
        for (const q of p.ring) {
          expect(Number.isInteger(q.x) && Number.isInteger(q.y)).toBe(true);
          // At the nucleus: every vertex within the band's largest circumradius (0.6 ha pentagon ≈ 50 m, with the jitter).
          expect(Math.hypot(q.x - x, q.y - y)).toBeLessThan(6_000);
        }
      }),
      { numRuns: 400 },
    );
  });

  it('takes the rung band: TOWN 0.25 – 0.45 ha, METROPOLIS 0.45 – 0.8 ha', () => {
    expect(PLAZA_AREA_BAND_HA.TOWN).toEqual([0.25, 0.45]);
    expect(PLAZA_AREA_BAND_HA.CITY).toEqual([0.35, 0.6]);
    expect(PLAZA_AREA_BAND_HA.METROPOLIS).toEqual([0.45, 0.8]);
    for (const k of [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) {
      const t = plaza(P(0, 0), streamFromKey(k), { rung: 'TOWN' });
      expect(t.areaCm2).toBeGreaterThanOrEqual(0.25e8);
      expect(t.areaCm2).toBeLessThanOrEqual(0.45e8);
      const m = plaza(P(0, 0), streamFromKey(k), { rung: 'METROPOLIS' });
      expect(m.areaCm2).toBeGreaterThanOrEqual(0.45e8);
      expect(m.areaCm2).toBeLessThanOrEqual(0.8e8);
    }
  });

  it('draws both vertex counts and spreads its area over the band', () => {
    const counts = new Set<number>();
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i < 200; i += 1) {
      const p = plaza(P(0, 0), flatFixture(i).stream(CONCERNS['reserve.plaza']));
      counts.add(p.vertices);
      lo = Math.min(lo, p.areaCm2);
      hi = Math.max(hi, p.areaCm2);
    }
    expect([...counts].sort()).toEqual([5, 6]);
    expect(lo).toBeLessThan(0.4e8);
    expect(hi).toBeGreaterThan(0.55e8);
  });

  it('no quadrilateral reaches compactness 0.8 — why the plaza draws 5 or 6 vertices (C-XXXX (3))', () => {
    expect(compactnessOf([P(0, 0), P(1000, 0), P(1000, 1000), P(0, 1000)])).toBeLessThan(0.8);
    expect(compactnessOf([P(0, 0), P(1000, 0), P(1000, 1000), P(0, 1000)])).toBeCloseTo(Math.PI / 4, 9);
  });

  it('aligns a side with a given contour bearing', () => {
    for (const b of [0, 4_500, 9_000, 13_000]) {
      const p = plaza(P(0, 0), streamFromKey([4, 3, 2, 1]), { contourBearingCdeg: b });
      const [a, c] = [p.ring[0], p.ring[1]];
      const dir = bearingCdeg(c.x - a.x, c.y - a.y);
      // Parallel to the contour within the ± 3° angle and ± 5 % radius jitter of its two ends (≤ 9°).
      expect(Math.min(angularGap(dir, b), angularGap(dir, b + 18_000))).toBeLessThanOrEqual(900);
    }
  });

  for (const seed of SEEDS) {
    it(`seed ${String(seed)}: the slice's plaza is at the nucleus and its vertices are the attach points`, () => {
      const s = sliceOf(seed);
      expect(s.plaza.compactness).toBeGreaterThanOrEqual(0.8);
      expect(s.plaza.areaCm2).toBeGreaterThanOrEqual(0.35e8);
      expect(s.plaza.areaCm2).toBeLessThanOrEqual(0.6e8);
      expect(s.lattice.costs.reservations[0].ring).toEqual(s.plaza.ring);
      expect(s.lattice.costs.reservations[0].attach).toEqual(s.plaza.ring);
      expect(s.lattice.attachNodes[0].length).toBe(s.plaza.vertices);
      const used = new Set(s.routes.map((r) => r.attachIndex));
      expect(used.size).toBeGreaterThan(0);
      for (const i of used) expect(i).toBeLessThan(s.plaza.vertices);
    });
  }
});
