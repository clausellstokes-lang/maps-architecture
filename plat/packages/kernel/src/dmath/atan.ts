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
// A TypeScript port of fdlibm 5.3's s_atan.c and e_atan2.c (atan, __ieee754_atan2; netlib; plat/vendor/fdlibm-5.3/),
// line for line and bit-exact to the C (M0-d-03; §3.2 (5): unit vectors to centidegrees; §3.4's regularFit phase).
// atan (fdlibm's method): reduce to |x| by atan(−x) = −atan(x), then on [0, 7/16] a degree-22 odd polynomial; on
// [7/16, 11/16], [11/16, 19/16], [19/16, 39/16] and [39/16, ∞) atan(c) + atan((t − c) / (1 + t·c)) for c = 1/2, 1, 3/2
// and atan(∞) + atan(−1/t). atan2(y, x) = arg(x + iy) in [−π, π] with IEEE 754's signed-zero and infinity table
// (atan2(±0, +0) = ±0, atan2(±0, −0) = ±π, atan2(±y, ±∞), atan2(±∞, x), …); NaN in, NaN out.
// The divisions below are fdlibm's own, each vetted (C-0125 (6)): IEEE 754 division is exact by specification (§6.5 (2)).
import { hi, lo, withHi } from './words.js';

const atanhi = [
  4.63647609000806093515e-01, /* atan(0.5)hi 0x3FDDAC67, 0x0561BB4F */
  7.85398163397448278999e-01, /* atan(1.0)hi 0x3FE921FB, 0x54442D18 */
  9.82793723247329054082e-01, /* atan(1.5)hi 0x3FEF730B, 0xD281F69B */
  1.57079632679489655800e+00, /* atan(inf)hi 0x3FF921FB, 0x54442D18 */
];
const atanlo = [
  2.26987774529616870924e-17, /* atan(0.5)lo 0x3C7A2B7F, 0x222F65E2 */
  3.06161699786838301793e-17, /* atan(1.0)lo 0x3C81A626, 0x33145C07 */
  1.39033110312309984516e-17, /* atan(1.5)lo 0x3C700788, 0x7AF0CBBD */
  6.12323399573676603587e-17, /* atan(inf)lo 0x3C91A626, 0x33145C07 */
];
const aT = [
  3.33333333333329318027e-01, /* 0x3FD55555, 0x5555550D */
  -1.99999999998764832476e-01, /* 0xBFC99999, 0x9998EBC4 */
  1.42857142725034663711e-01, /* 0x3FC24924, 0x920083FF */
  -1.11111104054623557880e-01, /* 0xBFBC71C6, 0xFE231671 */
  9.09088713343650656196e-02, /* 0x3FB745CD, 0xC54C206E */
  -7.69187620504482999495e-02, /* 0xBFB3B0F2, 0xAF749A6D */
  6.66107313738753120669e-02, /* 0x3FB10D66, 0xA0D03D51 */
  -5.83357013379057348645e-02, /* 0xBFADDE2D, 0x52DEFD9A */
  4.97687799461593236017e-02, /* 0x3FA97B4B, 0x24760DEB */
  -3.65315727442169155270e-02, /* 0xBFA2B444, 0x2C6A6C2F */
  1.62858201153657823623e-02, /* 0x3F90AD3A, 0xE322DA11 */
];
const one = 1.0;
const huge = 1.0e300;

/* e_atan2.c's constants */
const tiny = 1.0e-300;
const zero = 0.0;
const pi_o_4 = 7.8539816339744827900e-01; /* 0x3FE921FB, 0x54442D18 */
const pi_o_2 = 1.5707963267948965580e+00; /* 0x3FF921FB, 0x54442D18 */
const pi = 3.1415926535897931160e+00; /* 0x400921FB, 0x54442D18 */
const pi_lo = 1.2246467991473531772e-16; /* 0x3CA1A626, 0x33145C07 */

/** fdlibm 5.3's atan(x): the arctangent of x, in [−π/2, π/2]. */
export function atan(x: number): number {
  let id: number;
  const hx = hi(x);
  const ix = hx & 0x7fffffff;
  if (ix >= 0x44100000) {
    /* if |x| >= 2^66 */
    if (ix > 0x7ff00000 || (ix === 0x7ff00000 && lo(x) !== 0)) return x + x; /* NaN */
    if (hx > 0) return atanhi[3] + atanlo[3];
    else return -atanhi[3] - atanlo[3];
  }
  if (ix < 0x3fdc0000) {
    /* |x| < 0.4375 */
    if (ix < 0x3e200000) {
      /* |x| < 2^-29 */
      if (huge + x > one) return x; /* raise inexact */
    }
    id = -1;
  } else {
    x = Math.abs(x);
    if (ix < 0x3ff30000) {
      /* |x| < 1.1875 */
      if (ix < 0x3fe60000) {
        /* 7/16 <=|x|<11/16 */
        id = 0;
        // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 s_atan.c's (2.0*x-one)/(2.0+x), IEEE 754 exact division, vetted (C-0125 (6))
        x = (2.0 * x - one) / (2.0 + x);
      } else {
        /* 11/16<=|x|< 19/16 */
        id = 1;
        // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 s_atan.c's (x-one)/(x+one), IEEE 754 exact division, vetted (C-0125 (6))
        x = (x - one) / (x + one);
      }
    } else {
      if (ix < 0x40038000) {
        /* |x| < 2.4375 */
        id = 2;
        // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 s_atan.c's (x-1.5)/(one+1.5*x), IEEE 754 exact division, vetted (C-0125 (6))
        x = (x - 1.5) / (one + 1.5 * x);
      } else {
        /* 2.4375 <= |x| < 2^66 */
        id = 3;
        // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 s_atan.c's -1.0/x, IEEE 754 exact division, vetted (C-0125 (6))
        x = -1.0 / x;
      }
    }
  }
  /* end of argument reduction */
  let z = x * x;
  const w = z * z;
  /* break sum from i=0 to 10 aT[i]z**(i+1) into odd and even poly */
  const s1 = z * (aT[0] + w * (aT[2] + w * (aT[4] + w * (aT[6] + w * (aT[8] + w * aT[10])))));
  const s2 = w * (aT[1] + w * (aT[3] + w * (aT[5] + w * (aT[7] + w * aT[9]))));
  if (id < 0) return x - x * (s1 + s2);
  z = atanhi[id] - (x * (s1 + s2) - atanlo[id] - x);
  return hx < 0 ? -z : z;
}

/** fdlibm 5.3's __ieee754_atan2(y, x): the angle of the point (x, y), in [−π, π]. */
export function atan2(y: number, x: number): number {
  let z: number;
  const hx = hi(x);
  const ix = hx & 0x7fffffff;
  const lx = lo(x);
  const hy = hi(y);
  const iy = hy & 0x7fffffff;
  const ly = lo(y);
  if ((ix | ((lx | -lx) >>> 31)) > 0x7ff00000 || (iy | ((ly | -ly) >>> 31)) > 0x7ff00000) {
    /* x or y is NaN */
    return x + y;
  }
  if (((hx - 0x3ff00000) | lx) === 0) return atan(y); /* x=1.0 */
  const m = ((hy >> 31) & 1) | ((hx >> 30) & 2); /* 2*sign(x)+sign(y) */

  /* when y = 0 */
  if ((iy | ly) === 0) {
    switch (m) {
      case 0:
      case 1:
        return y; /* atan(+-0,+anything)=+-0 */
      case 2:
        return pi + tiny; /* atan(+0,-anything) = pi */
      case 3:
        return -pi - tiny; /* atan(-0,-anything) =-pi */
    }
  }
  /* when x = 0 */
  if ((ix | lx) === 0) return hy < 0 ? -pi_o_2 - tiny : pi_o_2 + tiny;

  /* when x is INF */
  if (ix === 0x7ff00000) {
    if (iy === 0x7ff00000) {
      switch (m) {
        case 0:
          return pi_o_4 + tiny; /* atan(+INF,+INF) */
        case 1:
          return -pi_o_4 - tiny; /* atan(-INF,+INF) */
        case 2:
          return 3.0 * pi_o_4 + tiny; /*atan(+INF,-INF)*/
        case 3:
          return -3.0 * pi_o_4 - tiny; /*atan(-INF,-INF)*/
      }
    } else {
      switch (m) {
        case 0:
          return zero; /* atan(+...,+INF) */
        case 1:
          return -zero; /* atan(-...,+INF) */
        case 2:
          return pi + tiny; /* atan(+...,-INF) */
        case 3:
          return -pi - tiny; /* atan(-...,-INF) */
      }
    }
  }
  /* when y is INF */
  if (iy === 0x7ff00000) return hy < 0 ? -pi_o_2 - tiny : pi_o_2 + tiny;

  /* compute y/x */
  const k = (iy - ix) >> 20;
  if (k > 60) z = pi_o_2 + 0.5 * pi_lo; /* |y/x| >  2**60 */
  else if (hx < 0 && k < -60) z = 0.0; /* |y|/x < -2**60 */
  // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_atan2.c's y/x ("safe to do y/x"), IEEE 754 exact division, vetted (C-0125 (6))
  else z = atan(Math.abs(y / x)); /* safe to do y/x */
  switch (m) {
    case 0:
      return z; /* atan(+,+) */
    case 1:
      return withHi(z, hi(z) ^ 0x80000000); /* atan(-,+) */
    case 2:
      return pi - (z - pi_lo); /* atan(+,-) */
    default:
      /* case 3 */
      return z - pi_lo - pi; /* atan(-,-) */
  }
}
