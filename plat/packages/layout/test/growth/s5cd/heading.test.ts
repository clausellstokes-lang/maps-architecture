// The `ou` heading model (§4.4 S5c *Heading model*; C-0254 (1)): its parameters read from regimes.json's heading rows,
// one step of the walk pinned against the design's formula (ρ = e^(−Δs/ℓ) through dmath.exp, κ_goal = (θ_goal − θ)/L_r,
// s√(1 − ρ²)ξ), the reversion toward the goal heading, the stationary spread of the first curvature, and the walk's
// refusal of a step that is no length. The 4 000-street drift distribution is measured by M0-k-05's metrics in
// testkit/test/layout/growth-s5cd/ (C-0122).
import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { createRng, dmath, seedKey, STAGES, CONCERNS, type StageId } from '@plat/kernel';
import { tableView } from '@plat/tables';
import { correlationOf, headingModel, headingStep, initialCurvature, RAD_PER_CDEG, wrapAngle, type HeadingModel } from '../../../src/growth/heading.js';
import { scripted } from './support.js';

const tables = tableView();
const organic = headingModel(tables, 'organic');

describe('the heading model’s parameters', () => {
  it('organic: s = 20° per 100 m (radians per cm), ℓ = 90 m, L_r = 250 m; planned: 5° per 100 m', () => {
    expect(organic.kind).toBe('ou');
    expect(organic.sigmaRadPerCm).toBeCloseTo((20 * Math.PI) / 180 / 10_000, 18);
    expect(organic.correlationCm).toBe(9_000);
    expect(organic.reversionCm).toBe(25_000);
    const planned = headingModel(tables, 'planned');
    expect(planned.sigmaRadPerCm).toBeCloseTo((5 * Math.PI) / 180 / 10_000, 18);
    expect(RAD_PER_CDEG * 18_000).toBeCloseTo(Math.PI, 15);
  });
});

describe('one step of the walk', () => {
  it('equals κ ← ρκ + (1 − ρ)κ_goal + s√(1 − ρ²)ξ, θ ← θ + κΔs, with ρ = dmath.exp(−Δs/ℓ)', () => {
    const cases = [
      { heading: 0.3, curvature: 2e-5, goalHeading: 0.1, stepCm: 3_000, xi: 0.7 },
      { heading: -2.9, curvature: -1e-5, goalHeading: 3.0, stepCm: 2_500, xi: -1.3 },
      { heading: 1.0, curvature: 0, goalHeading: 1.0, stepCm: 4_000, xi: 0 },
    ];
    for (const c of cases) {
      const rho = dmath.exp(-c.stepCm / organic.correlationCm);
      expect(correlationOf(c.stepCm, organic)).toBe(rho);
      const goal = wrapAngle(c.goalHeading - c.heading) / organic.reversionCm;
      const kappa = rho * c.curvature + (1 - rho) * goal + organic.sigmaRadPerCm * Math.sqrt(1 - rho * rho) * c.xi;
      const r = headingStep({ ...c, model: organic }, scripted([c.xi]));
      expect(r.curvature).toBe(kappa);
      expect(r.turn).toBe(kappa * c.stepCm);
      expect(r.heading).toBe(wrapAngle(c.heading + kappa * c.stepCm));
      expect(r.goalHeading).toBe(c.goalHeading);
    }
  });

  it('the goal term turns the shorter way across ±π, and the heading stays in (−π, π]', () => {
    const r = headingStep({ heading: 3.1, curvature: 0, goalHeading: -3.1, stepCm: 3_000, model: organic }, scripted([0]));
    expect(r.curvature).toBeGreaterThan(0);
    const s = headingStep({ heading: 3.14, curvature: 1e-3, goalHeading: 3.14, stepCm: 3_000, model: organic }, scripted([0]));
    expect(s.heading).toBeLessThanOrEqual(Math.PI);
    expect(s.heading).toBeGreaterThan(-Math.PI);
  });

  it('with no noise the heading reverts to the goal (mean reversion over L_r)', () => {
    const quiet: HeadingModel = { ...organic, sigmaRadPerCm: 0 };
    let st = { heading: 0.8, curvature: 0, goalHeading: 0 };
    for (let i = 0; i < 200; i += 1) st = headingStep({ ...st, stepCm: 3_000, model: quiet }, scripted([0]));
    expect(Math.abs(st.heading)).toBeLessThan(0.01);
  });

  it('a step must be a length > 0', () => {
    for (const stepCm of [0, -10, Number.NaN, Infinity]) expect(() => headingStep({ heading: 0, curvature: 0, goalHeading: 0, stepCm, model: organic }, scripted([0]))).toThrow(RangeError);
  });

  it('the walk draws exactly one normal per step from its stream', () => {
    let draws = 0;
    const s = { normal: () => ((draws += 1), 0.25) } as never;
    headingStep({ heading: 0, curvature: 0, goalHeading: 0, stepCm: 3_000, model: organic }, s);
    expect(draws).toBe(1);
  });

  it('property: the step’s turn is κ·Δs and wrapAngle keeps any heading in (−π, π]', () => {
    fc.assert(
      fc.property(fc.double({ min: -10, max: 10, noNaN: true }), fc.double({ min: -1e-3, max: 1e-3, noNaN: true }), fc.integer({ min: 1, max: 10_000 }), fc.double({ min: -6, max: 6, noNaN: true }), (h, k, ds, xi) => {
        const r = headingStep({ heading: h, curvature: k, goalHeading: 0, stepCm: ds, model: organic }, scripted([xi]));
        expect(r.turn).toBe(r.curvature * ds);
        expect(r.heading).toBeGreaterThan(-Math.PI);
        expect(r.heading).toBeLessThanOrEqual(Math.PI);
        expect(Math.abs(wrapAngle(r.heading - (h + r.turn)))).toBeLessThan(1e-9);
      }),
    );
  });
});

describe('the first curvature', () => {
  it('is drawn from the stationary law N(0, s²): over 20 000 draws its spread is s within 2 %', () => {
    const s = createRng().stream(seedKey(7), STAGES.S5 as StageId, CONCERNS['growth.curvature'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
    let sum = 0;
    let sum2 = 0;
    const n = 20_000;
    for (let i = 0; i < n; i += 1) {
      const k = initialCurvature(organic, s);
      sum += k;
      sum2 += k * k;
    }
    const mean = sum / n;
    const sd = Math.sqrt(sum2 / n - mean * mean);
    expect(Math.abs(mean)).toBeLessThan(0.03 * organic.sigmaRadPerCm);
    expect(Math.abs(sd / organic.sigmaRadPerCm - 1)).toBeLessThan(0.02);
  });

  it('the walk keeps the stationary spread: κ after 30 steps of 30 m has spread s within 3 %', () => {
    const s = createRng().stream(seedKey(11), STAGES.S5 as StageId, CONCERNS['growth.heading'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
    let sum2 = 0;
    const n = 5_000;
    for (let i = 0; i < n; i += 1) {
      let st = { heading: 0, curvature: initialCurvature(organic, s), goalHeading: 0 };
      for (let j = 0; j < 30; j += 1) st = headingStep({ ...st, stepCm: 3_000, model: { ...organic, reversionCm: 1e12 } }, s);
      sum2 += st.curvature * st.curvature;
    }
    expect(Math.abs(Math.sqrt(sum2 / n) / organic.sigmaRadPerCm - 1)).toBeLessThan(0.03);
  });
});
