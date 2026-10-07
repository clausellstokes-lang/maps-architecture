// T34-1's 10 000-face mean and the work-per-unit summary (M0-b-04; §13.2 T34-1, §13.8: "over 10 000 faces the mean of g
// lies within 7/30 ± 3 s.e.", nightly, C-0108; C-0091: per work counter the run charged, the work-per-unit quantiles
// { n, p50, p99, p999, max } and the unit count the law divides by).
import { describe, expect, it } from 'vitest';
import { foldT34, foldWork, G_MEAN, G_SD, lawUnits, quantiles, t34Task, runFull, type FullRecord } from '../../src/bentcut/index.js';

describe('T34-1’s mean of g', () => {
  it('passes within 3 s.e. of 7/30 and fails beyond, on planted draws', () => {
    expect(G_MEAN).toBe(7 / 30);
    expect(G_SD).toBeCloseTo(Math.sqrt(1 / 12 - (7 / 30) ** 2), 15);
    // Values alternating around 7/30 (mean exactly 7/30): z = 0.
    const n = 10_000;
    const around = Array.from({ length: n }, (_, i) => G_MEAN + (i % 2 === 0 ? 0.1 : -0.1));
    const t = foldT34(around, n, 1);
    expect(t.n).toBe(n);
    expect(t.mean).toBeCloseTo(G_MEAN, 12);
    expect(t.pass).toBe(true);
    // The same spread shifted by 3.1 s.e. fails; by 2.9 s.e. passes.
    const se = t.se;
    expect(foldT34(around.map((x) => x + 3.1 * se), n, 1).pass).toBe(false);
    expect(foldT34(around.map((x) => x - 3.1 * se), n, 1).pass).toBe(false);
    expect(foldT34(around.map((x) => x + 2.9 * se), n, 1).pass).toBe(true);
    // Fewer draws than wanted fail; only the first `wanted` are read.
    expect(foldT34(around.slice(0, 10), n, 1).pass).toBe(false);
    expect(foldT34([...around, 1, 1, 1], n, 1).mean).toBeCloseTo(G_MEAN, 12);
  });

  it('its faces go round the five M0 (b) kinds, face by face', () => {
    expect([0, 1, 2, 3, 4, 5].map((j) => [t34Task(j, 1).kind, t34Task(j, 1).i])).toEqual([
      ['curved', 0],
      ['round-joined', 0],
      ['triangular', 0],
      ['C-shaped', 0],
      ['holed', 0],
      ['curved', 1],
    ]);
  });

  it('on S8’s own stop draws round the M0 (b) kinds: the first faces’ g lie in [0, 1] and their mean sits within 3 s.e.', { timeout: 600_000 }, () => {
    const g: number[] = [];
    for (let j = 0; g.length < 400; j += 1) {
      const r = runFull(t34Task(j, 1));
      expect(r.refused).toBeNull();
      g.push(...r.g);
    }
    for (const x of g) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(1);
    }
    expect(foldT34(g, 400, 0).pass).toBe(true);
  });
});

describe('the work per unit (C-0091)', () => {
  const d = (units: number, kernelCalls: number, recursionDepth: number, candidates: number): FullRecord =>
    ({ phase: 'full', kind: 'holed', i: 0, setup: null, refused: null, units, work: { kernelCalls, recursionDepth, candidates } }) as unknown as FullRecord;

  it('a quantile block { n, p50, p99, p999, max } per counter the run charged, with the unit and its counts', () => {
    const w = foldWork([d(4, 8, 3, 40), d(16, 16, 4, 80), d(1, 1, 0, 2)]);
    expect(w.stage).toBe('S8');
    expect(Object.keys(w.counters)).toEqual(['cut.kernelCalls', 'cut.recursionDepth', 'cut.candidates']);
    const k = w.counters['cut.kernelCalls'];
    expect(k.unit).toBe('faces');
    expect(k.log2).toBe(false);
    expect(k.unitsTotal).toBe(21);
    expect(k.districts).toBe(3);
    // Work per unit: 8/4, 16/16, 1/1 = 2, 1, 1.
    expect(k.perUnit).toEqual(quantiles([2, 1, 1]));
    expect(Object.keys(k.perUnit)).toEqual(['n', 'p50', 'p99', 'p999', 'max']);
    // The depth law is log2: 3 / ⌈log2 4⌉, 4 / ⌈log2 16⌉, 0 / 1.
    const r = w.counters['cut.recursionDepth'];
    expect(r.log2).toBe(true);
    expect(r.perUnit).toEqual(quantiles([1.5, 1, 0]));
    expect([lawUnits(1, true), lawUnits(4, true), lawUnits(5, true), lawUnits(0, false), lawUnits(7, false)]).toEqual([1, 2, 3, 1, 7]);
  });

  it('a counter the run never charged has no block; refused districts are left out', () => {
    const w = foldWork([d(4, 8, 3, 0), { ...d(9, 99, 9, 99), refused: 'E_X' } as FullRecord]);
    expect(Object.keys(w.counters)).toEqual(['cut.kernelCalls', 'cut.recursionDepth']);
    expect(w.counters['cut.kernelCalls'].districts).toBe(1);
  });

  it('quantiles are type 7', () => {
    const q = quantiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(q.p50).toBe(5.5);
    expect(q.p99).toBeCloseTo(9.91, 12);
    expect(q.p999).toBeCloseTo(9.991, 12);
    expect(q.max).toBe(10);
    expect(quantiles([])).toEqual({ n: 0, p50: 0, p99: 0, p999: 0, max: 0 });
  });
});
