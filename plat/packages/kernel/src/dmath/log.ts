/*!
 * ====================================================
 * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
 *
 * Developed at SunSoft, a Sun Microsystems, Inc. business.
 * Permission to use, copy, modify, and distribute this
 * software is freely granted, provided that this notice
 * is preserved.
 * ====================================================
 */
// A TypeScript port of fdlibm 5.3's e_log.c (__ieee754_log; netlib; plat/vendor/fdlibm-5.3/), line for line and bit-exact
// to the C (M0-d-03; §6.5 (2)). Method (fdlibm's): x = 2^k · (1 + f) with √2/2 < 1 + f < √2; log(1 + f) from
// s = f / (2 + f) and a degree-14 polynomial in s; log(x) = k · ln2_hi + (f − (hfsq − (s · (hfsq + R) + k · ln2_lo))).
// log(x < 0) = NaN, log(±0) = −∞, log(+∞) = +∞, log(NaN) = NaN; error below 1 ulp.
// The divisions below are fdlibm's own, each vetted (C-0125 (6)): IEEE 754 division is exact by specification (§6.5 (2)).
import { hi, lo, withHi } from './words.js';

const ln2_hi = 6.93147180369123816490e-01; /* 3fe62e42 fee00000 */
const ln2_lo = 1.90821492927058770002e-10; /* 3dea39ef 35793c76 */
const two54 = 1.80143985094819840000e+16; /* 43500000 00000000 */
const Lg1 = 6.666666666666735130e-01; /* 3FE55555 55555593 */
const Lg2 = 3.999999999940941908e-01; /* 3FD99999 9997FA04 */
const Lg3 = 2.857142874366239149e-01; /* 3FD24924 94229359 */
const Lg4 = 2.222219843214978396e-01; /* 3FCC71C5 1D8E78AF */
const Lg5 = 1.818357216161805012e-01; /* 3FC74664 96CB03DE */
const Lg6 = 1.531383769920937332e-01; /* 3FC39A09 D078C69F */
const Lg7 = 1.479819860511658591e-01; /* 3FC2F112 DF3E5244 */
const zero = 0.0;

/** fdlibm 5.3's __ieee754_log(x): the natural logarithm of x. */
export function log(x: number): number {
  let hfsq: number;
  let R: number;
  let dk: number;
  let k: number;
  let i: number;

  let hx = hi(x); /* high word of x */
  const lx = lo(x); /* low  word of x */

  k = 0;
  if (hx < 0x00100000) {
    /* x < 2**-1022  */
    // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_log.c's -two54/zero: log(+-0) = -inf by IEEE 754 division, vetted (C-0125 (6))
    if (((hx & 0x7fffffff) | lx) === 0) return -two54 / zero; /* log(+-0)=-inf */
    // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_log.c's (x-x)/zero: log(-#) = NaN by IEEE 754 division, vetted (C-0125 (6))
    if (hx < 0) return (x - x) / zero; /* log(-#) = NaN */
    k -= 54;
    x *= two54; /* subnormal number, scale up x */
    hx = hi(x); /* high word of x */
  }
  if (hx >= 0x7ff00000) return x + x;
  k += (hx >> 20) - 1023;
  hx &= 0x000fffff;
  i = (hx + 0x95f64) & 0x100000;
  x = withHi(x, hx | (i ^ 0x3ff00000)); /* normalize x or x/2 */
  k += i >> 20;
  const f = x - 1.0;
  if ((0x000fffff & (2 + hx)) < 3) {
    /* |f| < 2**-20 */
    if (f === zero) {
      if (k === 0) return zero;
      dk = k;
      return dk * ln2_hi + dk * ln2_lo;
    }
    R = f * f * (0.5 - 0.33333333333333333 * f);
    if (k === 0) return f - R;
    dk = k;
    return dk * ln2_hi - (R - dk * ln2_lo - f);
  }
  // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_log.c's f/(2.0+f), IEEE 754 exact division, vetted (C-0125 (6))
  const s = f / (2.0 + f);
  dk = k;
  const z = s * s;
  i = hx - 0x6147a;
  const w = z * z;
  const j = 0x6b851 - hx;
  const t1 = w * (Lg2 + w * (Lg4 + w * Lg6));
  const t2 = z * (Lg1 + w * (Lg3 + w * (Lg5 + w * Lg7)));
  i |= j;
  R = t2 + t1;
  if (i > 0) {
    hfsq = 0.5 * f * f;
    if (k === 0) return f - (hfsq - s * (hfsq + R));
    return dk * ln2_hi - (hfsq - (s * (hfsq + R) + dk * ln2_lo) - f);
  }
  if (k === 0) return f - s * (f - R);
  return dk * ln2_hi - (s * (f - R) - dk * ln2_lo - f);
}
