// The readers' formulas through dmath (M0-d-03; §4.6 steps 1 and 9, §4.4 S5c, §6.5 (3)): the shapes the stages read
// are well-formed at their endpoints and inside their ranges when computed by dmath.pow and dmath.exp. The stages' own
// tests — the stop threshold drawn per face, the width exponent per district, the heading walk — are their items'
// (M0-b-02 and M0-c-05); these hold only the dmath side of them.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { dmath } from '../../src/index.js';

const EPS = 2 ** -52;

describe('§4.6 step 9: p = 0.5 · 4^u, ln p uniform between ln 0.5 and ln 2', () => {
  const p = (u: number): number => 0.5 * dmath.pow(4, u);

  it('is exactly 0.5, 1 and 2 at u = 0, 1/2 and 1', () => {
    expect([p(0), p(0.5), p(1)]).toEqual([0.5, 1, 2]);
  });

  it('lies in [0.5, 2] for every u in [0, 1], and ln p = (2u − 1) · ln 2 within 4 ulp of ln 2', () => {
    const ln2 = dmath.log(2);
    fc.assert(
      fc.property(fc.double({ min: 0, max: 1, noNaN: true }), (u) => {
        const v = p(u);
        return v >= 0.5 && v <= 2 && Math.abs(dmath.log(v) - (2 * u - 1) * ln2) <= 4 * EPS * ln2;
      }),
    );
  });
});

describe('§4.6 step 1: τ = e_lo · (e_hi / e_lo)^g, g in [0, 1]', () => {
  const tau = (lo: number, hi: number, g: number): number => lo * dmath.pow(hi / lo, g);

  it('is e_lo at g = 0, and e_lo · (e_hi / e_lo) — e_hi within one rounding — at g = 1', () => {
    fc.assert(
      fc.property(fc.double({ min: 1, max: 60, noNaN: true }), fc.double({ min: 0, max: 120, noNaN: true }), (lo, d) => {
        const hi = lo + d;
        return tau(lo, hi, 0) === lo && tau(lo, hi, 1) === lo * (hi / lo) && Math.abs(tau(lo, hi, 1) - hi) <= 2 * EPS * hi;
      }),
    );
    // e_lo · (e_hi / e_lo) is not always e_hi: one rounding above it here (measured in about 5 % of random pairs)
    expect(tau(56.14646220283734, 59.07190612517458, 1)).toBe(59.071906125174586);
  });

  it('lies in [e_lo, e_hi] up to that one rounding for every g in [0, 1] (the stage clamps if it needs the closed range)', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 1, max: 60, noNaN: true }),
        fc.double({ min: 0, max: 120, noNaN: true }),
        fc.double({ min: 0, max: 1, noNaN: true }),
        (lo, d, g) => {
          const hi = lo + d;
          const t = tau(lo, hi, g);
          return t >= lo && t <= hi * (1 + 2 * EPS);
        },
      ),
    );
  });
});

describe('§4.4 S5c: ρ = e^(−Δs/ℓ), the heading walk’s step correlation', () => {
  const rho = (ds: number, ell: number): number => dmath.exp(-ds / ell);

  it('is exactly 1 at Δs = 0 and lies in (0, 1) for 0 < Δs ≤ 10 ℓ', () => {
    expect(rho(0, 90)).toBe(1);
    fc.assert(
      fc.property(fc.double({ min: 1, max: 1000, noNaN: true }), fc.double({ min: 0.01, max: 10, noNaN: true }), (ell, share) => {
        const r = rho(share * ell, ell);
        return r > 0 && r < 1;
      }),
    );
  });

  it('at the organic defaults (ℓ = 90 m; lane 15 – 25 m and secondary 25 – 40 m steps) lies between e^(−40/90) and e^(−15/90)', () => {
    for (const ds of [15, 20, 25, 30, 40]) {
      const r = rho(ds, 90);
      expect(r).toBeGreaterThanOrEqual(rho(40, 90));
      expect(r).toBeLessThanOrEqual(rho(15, 90));
    }
    expect(rho(30, 90)).toBeCloseTo(0.7165313105737893, 15);
  });
});
