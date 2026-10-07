// §13.5's growth-drift row and the street-turning row's no-cliff clause on the heading model (§4.4 S5c's `ou`; C-0122,
// C-0253 (1)): 4 000 streets per setting walked by M0-c-05's `headingStep` from its `growth.heading` and
// `growth.curvature` streams, measured by M0-k-05's METRICS — `growth.drift600m` (net turn over 600 m: p50 15–30°,
// > 90° on ≤ 1 %), `street.turnStep10m` (10 m resampling: no empty bin above 15° while the bin below holds > 1 %) —
// one metricVersion, never a second measurement. The settings: the secondary's and the lane's step ranges, and fixed
// 30 m steps, at which every third 10 m step carries a whole step's turn: the design's receipt (p95 ≈ 11.4°, p99 ≈
// 14.9°, Gaussian tails).
import { createRng, seedKey, STAGES, CONCERNS, type StageId, type Stream } from '@plat/kernel';
import { headingModel, headingStep, initialCurvature } from '@plat/layout';
import { tableView } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { metricById, quantile7, turnCliff, type MetricDoc, type MetricWay } from '../../../src/metrics/index.js';
import { measured } from './support.js';

const model = headingModel(tableView(), 'organic');

/** n streets of at least 630 m from the origin, each heading uniform, each step's length drawn in [lo, hi] (cm). */
function streets(n: number, lo: number, hi: number, seed: number): MetricWay[] {
  const rng = createRng();
  const s = (c: keyof typeof CONCERNS): Stream => rng.stream(seedKey(seed), STAGES.S5 as StageId, CONCERNS[c], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
  const heading = s('growth.heading');
  const curvature = s('growth.curvature');
  const out: MetricWay[] = [];
  for (let i = 0; i < n; i += 1) {
    const h0 = (2 * heading.float01() - 1) * Math.PI;
    let st = { heading: h0, curvature: initialCurvature(model, curvature), goalHeading: h0 };
    let x = 0;
    let y = 0;
    let walked = 0;
    const line = [{ x: 0, y: 0 }];
    while (walked < 63_000) {
      const ds = lo === hi ? lo : Math.round(lo + (hi - lo) * heading.float01());
      st = headingStep({ ...st, stepCm: ds, model }, heading);
      x += ds * Math.cos(st.heading);
      y += ds * Math.sin(st.heading);
      walked += ds;
      line.push({ x: Math.round(x), y: Math.round(y) });
    }
    out.push({ id: `s${String(i)}`, class: 'secondary', line, grown: true, organic: true });
  }
  return out;
}

const SETTINGS = [
  { name: 'secondary steps 25–40 m', lo: 2_500, hi: 4_000 },
  { name: 'lane steps 15–25 m', lo: 1_500, hi: 2_500 },
  { name: 'fixed 30 m steps', lo: 3_000, hi: 3_000 },
] as const;

describe('§13.5 growth drift on 4 000 streets per setting (M0-k-05’s growth.drift600m)', () => {
  for (const [i, set] of SETTINGS.entries()) {
    it(`${set.name}: net turn over 600 m p50 in 15–30°, > 90° on ≤ 1 %`, { timeout: 120_000 }, () => {
      const doc: MetricDoc = { ways: streets(4_000, set.lo, set.hi, 101 + i) };
      const drift = measured('growth.drift600m', doc) as readonly number[];
      expect(drift.length).toBeGreaterThanOrEqual(4_000);
      const sorted = drift.slice().sort((a, b) => a - b);
      const p50 = quantile7(sorted, 0.5);
      expect(p50).toBeGreaterThanOrEqual(15);
      expect(p50).toBeLessThanOrEqual(30);
      expect(sorted.filter((v) => v > 90).length / sorted.length).toBeLessThanOrEqual(0.01);
      expect(metricById('growth.drift600m')?.metricVersion).toBe('1.0.0');
    });

    it(`${set.name}: no turn cliff after 10 m resampling (M0-k-05’s street.turnStep10m)`, { timeout: 120_000 }, () => {
      const doc: MetricDoc = { ways: streets(4_000, set.lo, set.hi, 201 + i) };
      const steps = measured('street.turnStep10m', doc) as readonly number[];
      const c = turnCliff(steps);
      expect(c.steps).toBe(steps.length);
      expect(c.cliff).toBe(false);
      // The tail exists above 15° (a walk, not a clamp).
      expect(steps.some((t) => t > 15)).toBe(true);
    });
  }

  it('fixed 30 m steps: the per-step turn has the receipt’s Gaussian tails (p95 ≈ 11.4°, p99 ≈ 14.9°)', { timeout: 120_000 }, () => {
    const doc: MetricDoc = { ways: streets(4_000, 3_000, 3_000, 301) };
    const steps = measured('street.turnStep10m', doc) as readonly number[];
    // Every way's 10 m steps start at its origin; with 30 m steps the vertex turns are every third step's (at i ≡ 2).
    const perWay = doc.ways.map((w) => metricById('street.turnStep10m')!.measure({ ways: [w] }));
    const vertex: number[] = [];
    for (const m of perWay) {
      if ('notApplicable' in m) continue;
      const t = m.values.get('all') as readonly number[];
      for (let i = 2; i < t.length; i += 3) vertex.push(t[i]);
    }
    expect(vertex.length).toBeGreaterThan(70_000);
    expect(steps.length).toBeGreaterThanOrEqual(vertex.length);
    const sorted = vertex.slice().sort((a, b) => a - b);
    const p95 = quantile7(sorted, 0.95);
    const p99 = quantile7(sorted, 0.99);
    expect(p95).toBeGreaterThan(10.4);
    expect(p95).toBeLessThan(12.4);
    expect(p99).toBeGreaterThan(13.7);
    expect(p99).toBeLessThan(16.1);
    // Gaussian tails: |N(0, σ)|'s p99 / p95 = 2.576 / 1.960 ≈ 1.31 (a clamp would bring it toward 1).
    expect(p99 / p95).toBeGreaterThan(1.22);
    expect(p99 / p95).toBeLessThan(1.4);
    // The other 10 m steps (inside a 30 m step) carry no turn.
    const off: number[] = [];
    for (const m of perWay) {
      if ('notApplicable' in m) continue;
      const t = m.values.get('all') as readonly number[];
      for (let i = 0; i < t.length; i += 1) if (i % 3 !== 2) off.push(t[i]);
    }
    let maxOff = 0;
    for (const t of off) maxOff = Math.max(maxOff, t);
    expect(maxOff).toBeLessThan(0.5);
  });
});
