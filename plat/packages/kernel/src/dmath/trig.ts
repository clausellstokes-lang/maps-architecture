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
// A TypeScript port of fdlibm 5.3's s_sin.c and s_cos.c (netlib; plat/vendor/fdlibm-5.3/), line for line and bit-exact
// to the C (M0-d-03; §3.4's regularFit reads them). The argument is reduced to y[0] + y[1] = x − n · π/2 in [−π/4, π/4]
// (rem-pio2.ts) and the kernel picked by n mod 4: sin is S, C, −S, −C and cos is C, −S, −C, S for n = 0, 1, 2, 3.
// sin(±∞), cos(±∞) and both of NaN are NaN; "nearly rounded" (fdlibm's words).
import { kernelCos, kernelSin } from './k-trig.js';
import { remPio2 } from './rem-pio2.js';
import { hi } from './words.js';

/* the reduced argument y[0] + y[1]; written by remPio2 and read straight after, within one call */
const y = new Float64Array(2);

/** fdlibm 5.3's sin(x). */
export function sin(x: number): number {
  const z = 0.0;
  /* High word of x. */
  const ix = hi(x) & 0x7fffffff;

  /* |x| ~< pi/4 */
  if (ix <= 0x3fe921fb) return kernelSin(x, z, 0);
  /* sin(Inf or NaN) is NaN */
  else if (ix >= 0x7ff00000) return x - x;
  /* argument reduction needed */
  else {
    const n = remPio2(x, y);
    switch (n & 3) {
      case 0:
        return kernelSin(y[0], y[1], 1);
      case 1:
        return kernelCos(y[0], y[1]);
      case 2:
        return -kernelSin(y[0], y[1], 1);
      default:
        return -kernelCos(y[0], y[1]);
    }
  }
}

/** fdlibm 5.3's cos(x). */
export function cos(x: number): number {
  const z = 0.0;
  /* High word of x. */
  const ix = hi(x) & 0x7fffffff;

  /* |x| ~< pi/4 */
  if (ix <= 0x3fe921fb) return kernelCos(x, z);
  /* cos(Inf or NaN) is NaN */
  else if (ix >= 0x7ff00000) return x - x;
  /* argument reduction needed */
  else {
    const n = remPio2(x, y);
    switch (n & 3) {
      case 0:
        return kernelCos(y[0], y[1]);
      case 1:
        return -kernelSin(y[0], y[1], 1);
      case 2:
        return -kernelCos(y[0], y[1]);
      default:
        return kernelSin(y[0], y[1], 1);
    }
  }
}
