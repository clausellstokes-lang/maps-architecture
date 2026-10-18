// dmath's property tests (M0-d-03; §6.5 (2); C-0137): fast-check at PLAT_FUZZ_RUNS (10⁴ when unset, C-0057).
//   * pow(x, ±0) = 1 and pow(x, 1) = x, bit-exact, for every double x (NaN included: pow(NaN, 0) = 1, pow(NaN, 1) NaN);
//   * exp(log(x)) within 1 ulp of x on x ∈ [1/e, e] (|ln x| ≤ 1) — the domain C-0137 fixes: beyond it the round trip's
//     error grows with |ln x| (an error of one ulp of ln x is a relative error of |ln x| · 2⁻⁵² in x), measured at 2 ulp
//     on [1/16, 16], 4 on [2⁻¹⁰, 2¹⁰] and 511 on [10⁻³⁰⁰, 10³⁰⁰];
//   * sin²(x) + cos²(x) within 2 ulp of 1 (2 · 2⁻⁵²) for every finite x, the large-argument reduction included;
//   * atan2's quadrant signs: the result carries y's sign bit, |θ| ≤ π/2 when x has a clear sign bit (x ≥ +0) and
//     ≥ π/2 when x's sign bit is set (x ≤ −0), |θ| ≤ π, for every non-NaN pair, zeros and infinities included.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { dmath } from '../../src/index.js';
import { bitsOf } from './vectors.js';

const ULP_OF_ONE = 2 ** -52;
const HALF_PI = 1.5707963267948966; /* fdlibm's pi_o_2, 0x3FF921FB54442D18 */
const PI = 3.141592653589793; /* fdlibm's pi, 0x400921FB54442D18 */

/** The distance between two doubles of one sign in units in the last place (their bit patterns' difference). */
function ulps(a: number, b: number): bigint {
  const d = bitsOf(a) - bitsOf(b);
  return d < 0n ? -d : d;
}

const signBit = (x: number): boolean => x < 0 || Object.is(x, -0);

describe('dmath properties', () => {
  it('the package index exports dmath with its seven routines (§3.1 names)', async () => {
    const pkg = await import('../../src/index.js');
    expect(Object.keys(pkg.dmath).sort()).toEqual(['atan', 'atan2', 'cos', 'exp', 'log', 'pow', 'sin']);
    expect(Object.isFrozen(pkg.dmath)).toBe(true);
  });

  it('pow(x, 0) = pow(x, -0) = 1 for every double x', () => {
    fc.assert(
      fc.property(fc.double(), (x) => Object.is(dmath.pow(x, 0), 1) && Object.is(dmath.pow(x, -0), 1)),
    );
  });

  it('pow(x, 1) = x bit-exact for every double x (NaN stays NaN)', () => {
    fc.assert(fc.property(fc.double(), (x) => Object.is(dmath.pow(x, 1), x)));
  });

  it('exp(log(x)) lies within 1 ulp of x for x in [1/e, e] (C-0137)', () => {
    fc.assert(
      fc.property(fc.double({ min: 1 / Math.E, max: Math.E, noNaN: true }), (x) => ulps(dmath.exp(dmath.log(x)), x) <= 1n),
    );
  });

  it('sin²(x) + cos²(x) lies within 2 ulp of 1 for every finite x', () => {
    fc.assert(
      fc.property(fc.double({ noNaN: true, noDefaultInfinity: true }), (x) => {
        const s = dmath.sin(x);
        const c = dmath.cos(x);
        return Math.abs(s * s + c * c - 1) <= 2 * ULP_OF_ONE;
      }),
    );
  });

  it("atan2's quadrant signs hold for every non-NaN (y, x), zeros and infinities included", () => {
    fc.assert(
      fc.property(fc.double({ noNaN: true }), fc.double({ noNaN: true }), (y, x) => {
        const t = dmath.atan2(y, x);
        if (Number.isNaN(t) || signBit(t) !== signBit(y) || Math.abs(t) > PI) return false;
        return signBit(x) ? Math.abs(t) >= HALF_PI : Math.abs(t) <= HALF_PI;
      }),
    );
  });

  it('atan2 at the axes and corners: the signed-zero and infinity table', () => {
    const cases: [number, number, number][] = [
      [0, 1, 0], [-0, 1, -0], [0, -1, PI], [-0, -1, -PI], [0, 0, 0], [-0, 0, -0], [0, -0, PI], [-0, -0, -PI],
      [1, 0, HALF_PI], [-1, 0, -HALF_PI], [1, -0, HALF_PI], [-1, -0, -HALF_PI],
      [1, Infinity, 0], [-1, Infinity, -0], [1, -Infinity, PI], [-1, -Infinity, -PI],
      [Infinity, 1, HALF_PI], [-Infinity, 1, -HALF_PI], [Infinity, Infinity, PI / 4], [-Infinity, -Infinity, -0.75 * PI],
    ];
    for (const [y, x, want] of cases) expect([y, x, dmath.atan2(y, x)]).toEqual([y, x, want]);
  });
});
