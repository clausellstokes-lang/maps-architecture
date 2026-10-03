/*
 * ====================================================
 * Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
 *
 * Permission to use, copy, modify, and distribute this
 * software is freely granted, provided that this notice
 * is preserved.
 * ====================================================
 */
// A TypeScript port of fdlibm 5.3's e_pow.c (__ieee754_pow; netlib; plat/vendor/fdlibm-5.3/), line for line and bit-exact
// to the C (M0-d-03; §6.5 (3): every power not a literal integer 0 … 4 goes through dmath.pow). fdlibm's method and
// special cases, in its own words, are in the vendored source; in short:
//   pow(x, y) = 2^(y · log2(x)), log2(x) in two pieces, y · log2(x) = n + y' by simulated multiple precision, 2^y' by
//   a rational approximation; (anything)^0 = 1, (anything)^NaN = NaN (1^NaN too), NaN^(anything but 0) = NaN,
//   (−x)^(non-integer) = NaN, ±0 and ±∞ by IEEE 754's sign rules; integer powers of integers exact when representable.
// The divisions below are fdlibm's own, each vetted (C-0125 (6)): IEEE 754 division is exact by specification (§6.5 (2)).
import { scalbn } from './scalbn.js';
import { fromWords, hi, lo, withHi, withLo } from './words.js';

const bp = [1.0, 1.5];
const dp_h = [0.0, 5.84962487220764160156e-01]; /* 0x3FE2B803, 0x40000000 */
const dp_l = [0.0, 1.35003920212974897128e-08]; /* 0x3E4CFDEB, 0x43CFD006 */
const zero = 0.0;
const one = 1.0;
const two = 2.0;
const two53 = 9007199254740992.0; /* 0x43400000, 0x00000000 */
const huge = 1.0e300;
const tiny = 1.0e-300;
/* poly coefs for (3/2)*(log(x)-2s-2/3*s**3 */
const L1 = 5.99999999999994648725e-01; /* 0x3FE33333, 0x33333303 */
const L2 = 4.28571428578550184252e-01; /* 0x3FDB6DB6, 0xDB6FABFF */
const L3 = 3.33333329818377432918e-01; /* 0x3FD55555, 0x518F264D */
const L4 = 2.72728123808534006489e-01; /* 0x3FD17460, 0xA91D4101 */
const L5 = 2.30660745775561754067e-01; /* 0x3FCD864A, 0x93C9DB65 */
const L6 = 2.06975017800338417784e-01; /* 0x3FCA7E28, 0x4A454EEF */
const P1 = 1.66666666666666019037e-01; /* 0x3FC55555, 0x5555553E */
const P2 = -2.77777777770155933842e-03; /* 0xBF66C16C, 0x16BEBD93 */
const P3 = 6.61375632143793436117e-05; /* 0x3F11566A, 0xAF25DE2C */
const P4 = -1.65339022054652515390e-06; /* 0xBEBBBD41, 0xC5D26BF1 */
const P5 = 4.13813679705723846039e-08; /* 0x3E663769, 0x72BEA4D0 */
const lg2 = 6.93147180559945286227e-01; /* 0x3FE62E42, 0xFEFA39EF */
const lg2_h = 6.93147182464599609375e-01; /* 0x3FE62E43, 0x00000000 */
const lg2_l = -1.90465429995776804525e-09; /* 0xBE205C61, 0x0CA86C39 */
const ovt = 8.0085662595372944372e-0017; /* -(1024-log2(ovfl+.5ulp)) */
const cp = 9.61796693925975554329e-01; /* 0x3FEEC709, 0xDC3A03FD =2/(3ln2) */
const cp_h = 9.61796700954437255859e-01; /* 0x3FEEC709, 0xE0000000 =(float)cp */
const cp_l = -7.02846165095275826516e-09; /* 0xBE3E2FE0, 0x145B01F5 =tail of cp_h*/
const ivln2 = 1.44269504088896338700e+00; /* 0x3FF71547, 0x652B82FE =1/ln2 */
const ivln2_h = 1.44269502162933349609e+00; /* 0x3FF71547, 0x60000000 =24b 1/ln2*/
const ivln2_l = 1.92596299112661746887e-08; /* 0x3E54AE0B, 0xF85DDF44 =1/ln2 tail*/

/** fdlibm 5.3's __ieee754_pow(x, y): x raised to the power y. */
export function pow(x: number, y: number): number {
  let z: number;
  let ax: number;
  let z_h: number;
  let z_l: number;
  let p_h: number;
  let p_l: number;
  let y1: number;
  let t1: number;
  let t2: number;
  let r: number;
  let s: number;
  let t: number;
  let u: number;
  let v: number;
  let w: number;
  let i: number;
  let j: number;
  let k: number;
  let yisint: number;
  let n: number;

  const hx = hi(x);
  const lx = lo(x);
  const hy = hi(y);
  const ly = lo(y);
  let ix = hx & 0x7fffffff;
  const iy = hy & 0x7fffffff;

  /* y==zero: x**0 = 1 */
  if ((iy | ly) === 0) return one;

  /* +-NaN return x+y */
  if (ix > 0x7ff00000 || (ix === 0x7ff00000 && lx !== 0) || iy > 0x7ff00000 || (iy === 0x7ff00000 && ly !== 0)) {
    return x + y;
  }

  /* determine if y is an odd int when x < 0
   * yisint = 0	... y is not an integer
   * yisint = 1	... y is an odd int
   * yisint = 2	... y is an even int
   */
  yisint = 0;
  if (hx < 0) {
    if (iy >= 0x43400000) yisint = 2; /* even integer y */
    else if (iy >= 0x3ff00000) {
      k = (iy >> 20) - 0x3ff; /* exponent */
      if (k > 20) {
        j = ly >>> (52 - k);
        if (((j << (52 - k)) >>> 0) === ly) yisint = 2 - (j & 1);
      } else if (ly === 0) {
        j = iy >> (20 - k);
        if (j << (20 - k) === iy) yisint = 2 - (j & 1);
      }
    }
  }

  /* special value of y */
  if (ly === 0) {
    if (iy === 0x7ff00000) {
      /* y is +-inf */
      if (((ix - 0x3ff00000) | lx) === 0) return y - y; /* inf**+-1 is NaN */
      else if (ix >= 0x3ff00000) return hy >= 0 ? y : zero; /* (|x|>1)**+-inf = inf,0 */
      else return hy < 0 ? -y : zero; /* (|x|<1)**-,+inf = inf,0 */
    }
    if (iy === 0x3ff00000) {
      /* y is  +-1 */
      // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_pow.c's one/x (y = -1), IEEE 754 exact division, vetted (C-0125 (6))
      if (hy < 0) return one / x;
      else return x;
    }
    if (hy === 0x40000000) return x * x; /* y is  2 */
    if (hy === 0x3fe00000) {
      /* y is  0.5 */
      if (hx >= 0) return Math.sqrt(x); /* x >= +0 */
    }
  }

  ax = Math.abs(x);
  /* special value of x */
  if (lx === 0) {
    if (ix === 0x7ff00000 || ix === 0 || ix === 0x3ff00000) {
      z = ax; /*x is +-0,+-inf,+-1*/
      // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_pow.c's one/z (z = 1/|x|), IEEE 754 exact division, vetted (C-0125 (6))
      if (hy < 0) z = one / z;
      if (hx < 0) {
        if (((ix - 0x3ff00000) | yisint) === 0) {
          // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_pow.c's (z-z)/(z-z): (-1)**non-int is NaN, vetted (C-0125 (6))
          z = (z - z) / (z - z);
        } else if (yisint === 1) z = -z; /* (x<0)**odd = -(|x|**odd) */
      }
      return z;
    }
  }

  n = (hx >> 31) + 1;

  /* (x<0)**(non-int) is NaN */
  // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_pow.c's (x-x)/(x-x): (x<0)**(non-int) is NaN, vetted (C-0125 (6))
  if ((n | yisint) === 0) return (x - x) / (x - x);

  s = one; /* s (sign of result -ve**odd) = -1 else = 1 */
  if ((n | (yisint - 1)) === 0) s = -one; /* (-ve)**(odd int) */

  /* |y| is huge */
  if (iy > 0x41e00000) {
    /* if |y| > 2**31 */
    if (iy > 0x43f00000) {
      /* if |y| > 2**64, must o/uflow */
      if (ix <= 0x3fefffff) return hy < 0 ? huge * huge : tiny * tiny;
      if (ix >= 0x3ff00000) return hy > 0 ? huge * huge : tiny * tiny;
    }
    /* over/underflow if x is not close to one */
    if (ix < 0x3fefffff) return hy < 0 ? s * huge * huge : s * tiny * tiny;
    if (ix > 0x3ff00000) return hy > 0 ? s * huge * huge : s * tiny * tiny;
    /* now |1-x| is tiny <= 2**-20, suffice to compute
	   log(x) by x-x^2/2+x^3/3-x^4/4 */
    t = ax - one; /* t has 20 trailing zeros */
    w = t * t * (0.5 - t * (0.3333333333333333333333 - t * 0.25));
    u = ivln2_h * t; /* ivln2_h has 21 sig. bits */
    v = t * ivln2_l - w * ivln2;
    t1 = u + v;
    t1 = withLo(t1, 0);
    t2 = v - (t1 - u);
  } else {
    n = 0;
    /* take care subnormal number */
    if (ix < 0x00100000) {
      ax *= two53;
      n -= 53;
      ix = hi(ax);
    }
    n += (ix >> 20) - 0x3ff;
    j = ix & 0x000fffff;
    /* determine interval */
    ix = j | 0x3ff00000; /* normalize ix */
    if (j <= 0x3988e) k = 0; /* |x|<sqrt(3/2) */
    else if (j < 0xbb67a) k = 1; /* |x|<sqrt(3)   */
    else {
      k = 0;
      n += 1;
      ix -= 0x00100000;
    }
    ax = withHi(ax, ix);

    /* compute ss = s_h+s_l = (x-1)/(x+1) or (x-1.5)/(x+1.5) */
    u = ax - bp[k]; /* bp[0]=1.0, bp[1]=1.5 */
    // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_pow.c's one/(ax+bp[k]), IEEE 754 exact division, vetted (C-0125 (6))
    v = one / (ax + bp[k]);
    const ss = u * v;
    const s_h = withLo(ss, 0);
    /* t_h=ax+bp[k] High */
    let t_h = fromWords(((ix >> 1) | 0x20000000) + 0x00080000 + (k << 18), 0);
    let t_l = ax - (t_h - bp[k]);
    const s_l = v * (u - s_h * t_h - s_h * t_l);
    /* compute log(ax) */
    let s2 = ss * ss;
    r = s2 * s2 * (L1 + s2 * (L2 + s2 * (L3 + s2 * (L4 + s2 * (L5 + s2 * L6)))));
    r += s_l * (s_h + ss);
    s2 = s_h * s_h;
    t_h = 3.0 + s2 + r;
    t_h = withLo(t_h, 0);
    t_l = r - (t_h - 3.0 - s2);
    /* u+v = ss*(1+...) */
    u = s_h * t_h;
    v = s_l * t_h + t_l * ss;
    /* 2/(3log2)*(ss+...) */
    p_h = u + v;
    p_h = withLo(p_h, 0);
    p_l = v - (p_h - u);
    z_h = cp_h * p_h; /* cp_h+cp_l = 2/(3*log2) */
    z_l = cp_l * p_h + p_l * cp + dp_l[k];
    /* log2(ax) = (ss+..)*2/(3*log2) = n + dp_h + z_h + z_l */
    t = n;
    t1 = z_h + z_l + dp_h[k] + t;
    t1 = withLo(t1, 0);
    t2 = z_l - (t1 - t - dp_h[k] - z_h);
  }

  /* split up y into y1+y2 and compute (y1+y2)*(t1+t2) */
  y1 = withLo(y, 0);
  p_l = (y - y1) * t1 + y * t2;
  p_h = y1 * t1;
  z = p_l + p_h;
  j = hi(z);
  i = lo(z) | 0;
  if (j >= 0x40900000) {
    /* z >= 1024 */
    if (((j - 0x40900000) | i) !== 0) {
      /* if z > 1024 */
      return s * huge * huge; /* overflow */
    } else {
      if (p_l + ovt > z - p_h) return s * huge * huge; /* overflow */
    }
  } else if ((j & 0x7fffffff) >= 0x4090cc00) {
    /* z <= -1075 */
    if (((j - 0xc090cc00) | i) !== 0) {
      /* z < -1075 */
      return s * tiny * tiny; /* underflow */
    } else {
      if (p_l <= z - p_h) return s * tiny * tiny; /* underflow */
    }
  }
  /*
   * compute 2**(p_h+p_l)
   */
  i = j & 0x7fffffff;
  k = (i >> 20) - 0x3ff;
  n = 0;
  if (i > 0x3fe00000) {
    /* if |z| > 0.5, set n = [z+0.5] */
    n = j + (0x00100000 >> (k + 1));
    k = ((n & 0x7fffffff) >> 20) - 0x3ff; /* new k for n */
    t = fromWords(n & ~(0x000fffff >> k), 0);
    n = ((n & 0x000fffff) | 0x00100000) >> (20 - k);
    if (j < 0) n = -n;
    p_h -= t;
  }
  t = p_l + p_h;
  t = withLo(t, 0);
  u = t * lg2_h;
  v = (p_l - (t - p_h)) * lg2 + t * lg2_l;
  z = u + v;
  w = v - (z - u);
  t = z * z;
  t1 = z - t * (P1 + t * (P2 + t * (P3 + t * (P4 + t * P5))));
  // eslint-disable-next-line plat/ratio-division -- fdlibm 5.3 e_pow.c's (z*t1)/(t1-two), IEEE 754 exact division, vetted (C-0125 (6))
  r = (z * t1) / (t1 - two) - (w + z * w);
  z = one - (r - z);
  j = hi(z);
  j = (j + (n << 20)) | 0;
  if (j >> 20 <= 0) z = scalbn(z, n); /* subnormal output */
  else z = withHi(z, (hi(z) + (n << 20)) | 0);
  return s * z;
}
