/*!
 * ====================================================
 * Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
 *
 * Permission to use, copy, modify, and distribute this
 * software is freely granted, provided that this notice
 * is preserved.
 * ====================================================
 */
// A TypeScript port of fdlibm 5.3's e_exp.c (__ieee754_exp; netlib; plat/vendor/fdlibm-5.3/), line for line and bit-exact
// to the C (M0-d-03; §6.5 (2); §4.4 S5c's ρ = e^(−Δs/ℓ) reads it). Method (fdlibm's): x = k · ln2 + r with |r| ≤ ln2 / 2,
// r = hi − lo; exp(r) = 1 + r + r · R1(r) / (2 − R1(r)) with a degree-5 polynomial; exp(x) = 2^k · exp(r).
// exp(+∞) = +∞, exp(−∞) = 0, exp(NaN) = NaN; overflow above 709.78…, underflow below −745.13…; error below 1 ulp.
// The divisions below are fdlibm's own, each vetted (C-0125 (6)): IEEE 754 division is exact by specification (§6.5 (2)).
import { hi, lo, withHi } from './words.js';

const one = 1.0;
const halF = [0.5, -0.5];
const huge = 1.0e+300;
const twom1000 = 9.33263618503218878990e-302; /* 2**-1000=0x01700000,0*/
const o_threshold = 7.09782712893383973096e+02; /* 0x40862E42, 0xFEFA39EF */
const u_threshold = -7.45133219101941108420e+02; /* 0xc0874910, 0xD52D3051 */
const ln2HI = [6.93147180369123816490e-01 /* 0x3fe62e42, 0xfee00000 */, -6.93147180369123816490e-01 /* 0xbfe62e42, 0xfee00000 */];
const ln2LO = [1.90821492927058770002e-10 /* 0x3dea39ef, 0x35793c76 */, -1.90821492927058770002e-10 /* 0xbdea39ef, 0x35793c76 */];
const invln2 = 1.44269504088896338700e+00; /* 0x3ff71547, 0x652b82fe */
const P1 = 1.66666666666666019037e-01; /* 0x3FC55555, 0x5555553E */
const P2 = -2.77777777770155933842e-03; /* 0xBF66C16C, 0x16BEBD93 */
const P3 = 6.61375632143793436117e-05; /* 0x3F11566A, 0xAF25DE2C */
const P4 = -1.65339022054652515390e-06; /* 0xBEBBBD41, 0xC5D26BF1 */
const P5 = 4.13813679705723846039e-08; /* 0x3E663769, 0x72BEA4D0 */

/** fdlibm 5.3's __ieee754_exp(x): e raised to the power x. */
export function exp(x: number): number {
  let y: number;
  let hi_ = 0;
  let lo_ = 0;
  let t: number;
  let k = 0;

  let hx = hi(x) >>> 0; /* high word of x, fdlibm's unsigned */
  const xsb = (hx >>> 31) & 1; /* sign bit of x */
  hx &= 0x7fffffff; /* high word of |x| */

  /* filter out non-finite argument */
  if (hx >= 0x40862e42) {
    /* if |x|>=709.78... */
    if (hx >= 0x7ff00000) {
      if (((hx & 0xfffff) | lo(x)) !== 0) return x + x; /* NaN */
      else return xsb === 0 ? x : 0.0; /* exp(+-inf)={inf,0} */
    }
    if (x > o_threshold) return huge * huge; /* overflow */
    if (x < u_threshold) return twom1000 * twom1000; /* underflow */
  }

  /* argument reduction */
  if (hx > 0x3fd62e42) {
    /* if  |x| > 0.5 ln2 */
    if (hx < 0x3ff0a2b2) {
      /* and |x| < 1.5 ln2 */
      hi_ = x - ln2HI[xsb];
      lo_ = ln2LO[xsb];
      k = 1 - xsb - xsb;
    } else {
      k = (invln2 * x + halF[xsb]) | 0; /* C's (int): truncation toward zero, |value| < 2^11 here */
      t = k;
      hi_ = x - t * ln2HI[0]; /* t*ln2HI is exact here */
      lo_ = t * ln2LO[0];
    }
    x = hi_ - lo_;
  } else if (hx < 0x3e300000) {
    /* when |x|<2**-28 */
    if (huge + x > one) return one + x; /* trigger inexact */
  } else k = 0;

  /* x is now in primary range */
  t = x * x;
  const c = x - t * (P1 + t * (P2 + t * (P3 + t * (P4 + t * P5))));
  // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_exp.c's (x*c)/(c-2.0), IEEE 754 exact division, vetted (C-0125 (6))
  if (k === 0) return one - ((x * c) / (c - 2.0) - x);
  // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_exp.c's (x*c)/(2.0-c), IEEE 754 exact division, vetted (C-0125 (6))
  else y = one - (lo_ - (x * c) / (2.0 - c) - hi_);
  if (k >= -1021) {
    return withHi(y, (hi(y) + (k << 20)) | 0); /* add k to y's exponent */
  } else {
    y = withHi(y, (hi(y) + ((k + 1000) << 20)) | 0); /* add k to y's exponent */
    return y * twom1000;
  }
}
