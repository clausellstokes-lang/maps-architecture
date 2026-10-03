/*
 * ====================================================
 * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
 *
 * Developed at SunSoft, a Sun Microsystems, Inc. business.
 * Permission to use, copy, modify, and distribute this
 * software is freely granted, provided that this notice
 * is preserved.
 * ====================================================
 */
// A TypeScript port of fdlibm 5.3's s_scalbn.c and s_copysign.c (netlib; plat/vendor/fdlibm-5.3/), line for line, for
// dmath (M0-d-03): pow and the large-argument reduction scale by powers of two through them. Internal to dmath.
import { hi, lo, withHi } from './words.js';

const two54 = 1.80143985094819840000e+16; /* 0x43500000, 0x00000000 */
const twom54 = 5.55111512312578270212e-17; /* 0x3C900000, 0x00000000 */
const huge = 1.0e300;
const tiny = 1.0e-300;

/** copysign(x, y): the magnitude of x with the sign bit of y. */
export function copysign(x: number, y: number): number {
  return withHi(x, (hi(x) & 0x7fffffff) | (hi(y) & 0x80000000));
}

/** scalbn(x, n): x · 2ⁿ by exponent manipulation (n an integer). */
export function scalbn(x: number, n: number): number {
  let hx = hi(x);
  const lx = lo(x) | 0;
  let k = (hx & 0x7ff00000) >> 20; /* extract exponent */
  if (k === 0) {
    /* 0 or subnormal x */
    if ((lx | (hx & 0x7fffffff)) === 0) return x; /* +-0 */
    x *= two54;
    hx = hi(x);
    k = ((hx & 0x7ff00000) >> 20) - 54;
    if (n < -50000) return tiny * x; /* underflow */
  }
  if (k === 0x7ff) return x + x; /* NaN or Inf */
  k = k + n;
  if (k > 0x7fe) return huge * copysign(huge, x); /* overflow */
  if (k > 0) return withHi(x, (hx & 0x800fffff) | (k << 20)); /* normal result */
  if (k <= -54) {
    if (n > 50000) return huge * copysign(huge, x); /* in case integer overflow in n+k: overflow */
    return tiny * copysign(tiny, x); /* underflow */
  }
  k += 54; /* subnormal result */
  x = withHi(x, (hx & 0x800fffff) | (k << 20));
  return x * twom54;
}
