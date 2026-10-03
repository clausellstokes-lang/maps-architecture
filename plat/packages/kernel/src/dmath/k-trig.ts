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
// A TypeScript port of fdlibm 5.3's k_sin.c and k_cos.c (__kernel_sin, __kernel_cos; netlib; plat/vendor/fdlibm-5.3/),
// line for line and bit-exact to the C (M0-d-03): sine and cosine on [−π/4, π/4] of x + y, y the tail of a reduced
// argument; polynomials of degree 13 and 14 (fdlibm's Remez fits). Internal to dmath; sin and cos (trig.ts) call them.
import { fromWords, hi } from './words.js';

const half = 5.00000000000000000000e-01; /* 0x3FE00000, 0x00000000 */
const S1 = -1.66666666666666324348e-01; /* 0xBFC55555, 0x55555549 */
const S2 = 8.33333333332248946124e-03; /* 0x3F811111, 0x1110F8A6 */
const S3 = -1.98412698298579493134e-04; /* 0xBF2A01A0, 0x19C161D5 */
const S4 = 2.75573137070700676789e-06; /* 0x3EC71DE3, 0x57B1FE7D */
const S5 = -2.50507602534068634195e-08; /* 0xBE5AE5E6, 0x8A2B9CEB */
const S6 = 1.58969099521155010221e-10; /* 0x3DE5D93A, 0x5ACFD57C */

const one = 1.00000000000000000000e+00; /* 0x3FF00000, 0x00000000 */
const C1 = 4.16666666666666019037e-02; /* 0x3FA55555, 0x5555554C */
const C2 = -1.38888888888741095749e-03; /* 0xBF56C16C, 0x16C15177 */
const C3 = 2.48015872894767294178e-05; /* 0x3EFA01A0, 0x19CB1590 */
const C4 = -2.75573143513906633035e-07; /* 0xBE927E4F, 0x809C52AD */
const C5 = 2.08757232129817482790e-09; /* 0x3E21EE9E, 0xBDB4B1C4 */
const C6 = -1.13596475577881948265e-11; /* 0xBDA8FAE9, 0xBE8838D4 */

/** fdlibm 5.3's __kernel_sin(x, y, iy): sin(x + y) for |x| ≤ π/4; iy = 0 when y is zero. */
export function kernelSin(x: number, y: number, iy: number): number {
  const ix = hi(x) & 0x7fffffff; /* high word of x */
  if (ix < 0x3e400000) {
    /* |x| < 2**-27 */
    if ((x | 0) === 0) return x; /* generate inexact */
  }
  const z = x * x;
  const v = z * x;
  const r = S2 + z * (S3 + z * (S4 + z * (S5 + z * S6)));
  if (iy === 0) return x + v * (S1 + z * r);
  return x - (z * (half * y - v * r) - y - v * S1);
}

/** fdlibm 5.3's __kernel_cos(x, y): cos(x + y) for |x| ≤ π/4. */
export function kernelCos(x: number, y: number): number {
  let qx: number;
  const ix = hi(x) & 0x7fffffff; /* ix = |x|'s high word*/
  if (ix < 0x3e400000) {
    /* if x < 2**27 */
    if ((x | 0) === 0) return one; /* generate inexact */
  }
  const z = x * x;
  const r = z * (C1 + z * (C2 + z * (C3 + z * (C4 + z * (C5 + z * C6)))));
  if (ix < 0x3fd33333) {
    /* if |x| < 0.3 */
    return one - (0.5 * z - (z * r - x * y));
  }
  if (ix > 0x3fe90000) {
    /* x > 0.78125 */
    qx = 0.28125;
  } else {
    qx = fromWords(ix - 0x00200000, 0); /* x/4 */
  }
  const hz = 0.5 * z - qx;
  const a = one - qx;
  return a - (hz - (z * r - x * y));
}
