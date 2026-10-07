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
// A TypeScript port of fdlibm 5.3's argument reduction, e_rem_pio2.c (__ieee754_rem_pio2) and k_rem_pio2.c
// (__kernel_rem_pio2; netlib; plat/vendor/fdlibm-5.3/), line for line and bit-exact to the C (M0-d-03; C-0039): the
// remainder of x by π/2 as y[0] + y[1] and the quotient's last bits. |x| < 2^19 · π/2 reduces by Cody–Waite with 33-bit
// pieces of π/2 (up to three); larger |x| by Payne–Hanek with 2/π's bits as 24-bit integers. __kernel_rem_pio2 is
// ported at the one precision e_rem_pio2 asks of it (prec = 2, jk = 4); its prec 0 and 3 cases have no reader
// (C-0039: port what is read). Internal to dmath; sin and cos (trig.ts) call remPio2.
import { scalbn } from './scalbn.js';
import { fromWords, hi, lo } from './words.js';

/* Table of constants for 2/pi, 396 Hex digits (476 decimal) of 2/pi */
const two_over_pi = Int32Array.of(
  0xa2f983, 0x6e4e44, 0x1529fc, 0x2757d1, 0xf534dd, 0xc0db62,
  0x95993c, 0x439041, 0xfe5163, 0xabdebb, 0xc561b7, 0x246e3a,
  0x424dd2, 0xe00649, 0x2eea09, 0xd1921c, 0xfe1deb, 0x1cb129,
  0xa73ee8, 0x8235f5, 0x2ebb44, 0x84e99c, 0x7026b4, 0x5f7e41,
  0x3991d6, 0x398353, 0x39f49c, 0x845f8b, 0xbdf928, 0x3b1ff8,
  0x97ffde, 0x05980f, 0xef2f11, 0x8b5a0a, 0x6d1f6d, 0x367ecf,
  0x27cb09, 0xb74f46, 0x3f669e, 0x5fea2d, 0x7527ba, 0xc7ebe5,
  0xf17b3d, 0x0739f7, 0x8a5292, 0xea6bfb, 0x5fb11f, 0x8d5d08,
  0x560330, 0x46fc7b, 0x6babf0, 0xcfbc20, 0x9af436, 0x1da9e3,
  0x91615e, 0xe61b08, 0x659985, 0x5f14a0, 0x68408d, 0xffd880,
  0x4d7327, 0x310606, 0x1556ca, 0x73a8c9, 0x60e27b, 0xc08c6b,
);

const npio2_hw = Int32Array.of(
  0x3ff921fb, 0x400921fb, 0x4012d97c, 0x401921fb, 0x401f6a7a, 0x4022d97c,
  0x4025fdbb, 0x402921fb, 0x402c463a, 0x402f6a7a, 0x4031475c, 0x4032d97c,
  0x40346b9c, 0x4035fdbb, 0x40378fdb, 0x403921fb, 0x403ab41b, 0x403c463a,
  0x403dd85a, 0x403f6a7a, 0x40407e4c, 0x4041475c, 0x4042106c, 0x4042d97c,
  0x4043a28c, 0x40446b9c, 0x404534ac, 0x4045fdbb, 0x4046c6cb, 0x40478fdb,
  0x404858eb, 0x404921fb,
);

/*
 * invpio2:  53 bits of 2/pi
 * pio2_1:   first  33 bit of pi/2
 * pio2_1t:  pi/2 - pio2_1
 * pio2_2:   second 33 bit of pi/2
 * pio2_2t:  pi/2 - (pio2_1+pio2_2)
 * pio2_3:   third  33 bit of pi/2
 * pio2_3t:  pi/2 - (pio2_1+pio2_2+pio2_3)
 */
const zero = 0.00000000000000000000e+00; /* 0x00000000, 0x00000000 */
const half = 5.00000000000000000000e-01; /* 0x3FE00000, 0x00000000 */
const two24 = 1.67772160000000000000e+07; /* 0x41700000, 0x00000000 */
const invpio2 = 6.36619772367581382433e-01; /* 0x3FE45F30, 0x6DC9C883 */
const pio2_1 = 1.57079632673412561417e+00; /* 0x3FF921FB, 0x54400000 */
const pio2_1t = 6.07710050650619224932e-11; /* 0x3DD0B461, 0x1A626331 */
const pio2_2 = 6.07710050630396597660e-11; /* 0x3DD0B461, 0x1A600000 */
const pio2_2t = 2.02226624879595063154e-21; /* 0x3BA3198A, 0x2E037073 */
const pio2_3 = 2.02226624871116645580e-21; /* 0x3BA3198A, 0x2E000000 */
const pio2_3t = 8.47842766036889956997e-32; /* 0x397B839A, 0x252049C1 */

/* k_rem_pio2.c's constants */
const PIo2 = [
  1.57079625129699707031e+00, /* 0x3FF921FB, 0x40000000 */
  7.54978941586159635335e-08, /* 0x3E74442D, 0x00000000 */
  5.39030252995776476554e-15, /* 0x3CF84698, 0x80000000 */
  3.28200341580791294123e-22, /* 0x3B78CC51, 0x60000000 */
  1.27065575308067607349e-29, /* 0x39F01B83, 0x80000000 */
  1.22933308981111328932e-36, /* 0x387A2520, 0x40000000 */
  2.73370053816464559624e-44, /* 0x36E38222, 0x80000000 */
  2.16741683877804819444e-51, /* 0x3569F31D, 0x00000000 */
];
const one = 1.0;
const twon24 = 5.96046447753906250000e-08; /* 0x3E700000, 0x00000000 */
const JK = 4; /* init_jk[prec] at prec = 2, the one precision e_rem_pio2 asks for */

/* __kernel_rem_pio2's work arrays; every element is written before it is read, and each call clears them first */
const iq = new Int32Array(20);
const f = new Float64Array(20);
const fq = new Float64Array(20);
const q = new Float64Array(20);
const tx = new Float64Array(3);

/**
 * fdlibm 5.3's __kernel_rem_pio2(x, y, e0, nx, 2, two_over_pi): x (nx 24-bit pieces of a positive value, x[0]'s
 * exponent e0) reduced by π/2 into y[0] + y[1]; returns the quotient's last three bits.
 */
function kernelRemPio2(x: Float64Array, y: Float64Array, e0: number, nx: number): number {
  let jz: number;
  let carry: number;
  let n: number;
  let i: number;
  let j: number;
  let k: number;
  let q0: number;
  let ih: number;
  let z: number;
  let fw: number;
  iq.fill(0);
  f.fill(0);
  fq.fill(0);
  q.fill(0);

  /* initialize jk*/
  const jk = JK;
  const jp = jk;

  /* determine jx,jv,q0, note that 3>q0 */
  const jx = nx - 1;
  let jv = ((e0 - 3) / 24) | 0; /* C's integer division: truncation toward zero */
  if (jv < 0) jv = 0;
  q0 = e0 - 24 * (jv + 1);

  /* set up f[0] to f[jx+jk] where f[jx+jk] = ipio2[jv+jk] */
  j = jv - jx;
  const m = jx + jk;
  for (i = 0; i <= m; i++, j++) f[i] = j < 0 ? zero : two_over_pi[j];

  /* compute q[0],q[1],...q[jk] */
  for (i = 0; i <= jk; i++) {
    for (j = 0, fw = 0.0; j <= jx; j++) fw += x[j] * f[jx + i - j];
    q[i] = fw;
  }

  jz = jk;
  for (;;) {
    /* recompute: */
    /* distill q[] into iq[] reversingly */
    for (i = 0, j = jz, z = q[jz]; j > 0; i++, j--) {
      fw = (twon24 * z) | 0;
      iq[i] = (z - two24 * fw) | 0;
      z = q[j - 1] + fw;
    }

    /* compute n */
    z = scalbn(z, q0); /* actual value of z */
    z -= 8.0 * Math.floor(z * 0.125); /* trim off integer >= 8 */
    n = z | 0;
    z -= n;
    ih = 0;
    if (q0 > 0) {
      /* need iq[jz-1] to determine n */
      i = iq[jz - 1] >> (24 - q0);
      n += i;
      iq[jz - 1] -= i << (24 - q0);
      ih = iq[jz - 1] >> (23 - q0);
    } else if (q0 === 0) ih = iq[jz - 1] >> 23;
    else if (z >= 0.5) ih = 2;

    if (ih > 0) {
      /* q > 0.5 */
      n += 1;
      carry = 0;
      for (i = 0; i < jz; i++) {
        /* compute 1-q */
        j = iq[i];
        if (carry === 0) {
          if (j !== 0) {
            carry = 1;
            iq[i] = 0x1000000 - j;
          }
        } else iq[i] = 0xffffff - j;
      }
      if (q0 > 0) {
        /* rare case: chance is 1 in 12 */
        switch (q0) {
          case 1:
            iq[jz - 1] &= 0x7fffff;
            break;
          case 2:
            iq[jz - 1] &= 0x3fffff;
            break;
        }
      }
      if (ih === 2) {
        z = one - z;
        if (carry !== 0) z -= scalbn(one, q0);
      }
    }

    /* check if recomputation is needed */
    if (z === zero) {
      j = 0;
      for (i = jz - 1; i >= jk; i--) j |= iq[i];
      if (j === 0) {
        /* need recomputation */
        for (k = 1; iq[jk - k] === 0; k++); /* k = no. of terms needed */

        for (i = jz + 1; i <= jz + k; i++) {
          /* add q[jz+1] to q[jz+k] */
          f[jx + i] = two_over_pi[jv + i];
          for (j = 0, fw = 0.0; j <= jx; j++) fw += x[j] * f[jx + i - j];
          q[i] = fw;
        }
        jz += k;
        continue; /* goto recompute */
      }
    }
    break;
  }

  /* chop off zero terms */
  if (z === 0.0) {
    jz -= 1;
    q0 -= 24;
    while (iq[jz] === 0) {
      jz--;
      q0 -= 24;
    }
  } else {
    /* break z into 24-bit if necessary */
    z = scalbn(z, -q0);
    if (z >= two24) {
      fw = (twon24 * z) | 0;
      iq[jz] = (z - two24 * fw) | 0;
      jz += 1;
      q0 += 24;
      iq[jz] = fw;
    } else iq[jz] = z | 0;
  }

  /* convert integer "bit" chunk to floating-point value */
  fw = scalbn(one, q0);
  for (i = jz; i >= 0; i--) {
    q[i] = fw * iq[i];
    fw *= twon24;
  }

  /* compute PIo2[0,...,jp]*q[jz,...,0] */
  for (i = jz; i >= 0; i--) {
    for (fw = 0.0, k = 0; k <= jp && k <= jz - i; k++) fw += PIo2[k] * q[i + k];
    fq[jz - i] = fw;
  }

  /* compress fq[] into y[] (prec 1 and 2) */
  fw = 0.0;
  for (i = jz; i >= 0; i--) fw += fq[i];
  y[0] = ih === 0 ? fw : -fw;
  fw = fq[0] - fw;
  for (i = 1; i <= jz; i++) fw += fq[i];
  y[1] = ih === 0 ? fw : -fw;
  return n & 7;
}

/**
 * fdlibm 5.3's __ieee754_rem_pio2(x, y): writes the remainder of x by π/2 to y[0] + y[1] (|y[0] + y[1]| ≤ π/4) and
 * returns the quotient n (its last bits for a huge |x|), so that x = n · π/2 + y[0] + y[1].
 */
export function remPio2(x: number, y: Float64Array): number {
  let z: number;
  let w: number;
  let t: number;
  let r: number;
  let i: number;
  let n: number;

  const hx = hi(x); /* high word of x */
  const ix = hx & 0x7fffffff;
  if (ix <= 0x3fe921fb) {
    /* |x| ~<= pi/4 , no need for reduction */
    y[0] = x;
    y[1] = 0;
    return 0;
  }
  if (ix < 0x4002d97c) {
    /* |x| < 3pi/4, special case with n=+-1 */
    if (hx > 0) {
      z = x - pio2_1;
      if (ix !== 0x3ff921fb) {
        /* 33+53 bit pi is good enough */
        y[0] = z - pio2_1t;
        y[1] = z - y[0] - pio2_1t;
      } else {
        /* near pi/2, use 33+33+53 bit pi */
        z -= pio2_2;
        y[0] = z - pio2_2t;
        y[1] = z - y[0] - pio2_2t;
      }
      return 1;
    } else {
      /* negative x */
      z = x + pio2_1;
      if (ix !== 0x3ff921fb) {
        /* 33+53 bit pi is good enough */
        y[0] = z + pio2_1t;
        y[1] = z - y[0] + pio2_1t;
      } else {
        /* near pi/2, use 33+33+53 bit pi */
        z += pio2_2;
        y[0] = z + pio2_2t;
        y[1] = z - y[0] + pio2_2t;
      }
      return -1;
    }
  }
  if (ix <= 0x413921fb) {
    /* |x| ~<= 2^19*(pi/2), medium size */
    t = Math.abs(x);
    n = (t * invpio2 + half) | 0;
    const fn = n;
    r = t - fn * pio2_1;
    w = fn * pio2_1t; /* 1st round good to 85 bit */
    if (n < 32 && ix !== npio2_hw[n - 1]) {
      y[0] = r - w; /* quick check no cancellation */
    } else {
      const j = ix >> 20;
      y[0] = r - w;
      i = j - ((hi(y[0]) >> 20) & 0x7ff);
      if (i > 16) {
        /* 2nd iteration needed, good to 118 */
        t = r;
        w = fn * pio2_2;
        r = t - w;
        w = fn * pio2_2t - (t - r - w);
        y[0] = r - w;
        i = j - ((hi(y[0]) >> 20) & 0x7ff);
        if (i > 49) {
          /* 3rd iteration need, 151 bits acc */
          t = r; /* will cover all possible cases */
          w = fn * pio2_3;
          r = t - w;
          w = fn * pio2_3t - (t - r - w);
          y[0] = r - w;
        }
      }
    }
    y[1] = r - y[0] - w;
    if (hx < 0) {
      y[0] = -y[0];
      y[1] = -y[1];
      return -n;
    }
    return n;
  }
  /*
   * all other (large) arguments
   */
  if (ix >= 0x7ff00000) {
    /* x is inf or NaN */
    y[0] = y[1] = x - x;
    return 0;
  }
  /* set z = scalbn(|x|,ilogb(x)-23) */
  const e0 = (ix >> 20) - 1046; /* e0 = ilogb(z)-23; */
  z = fromWords(ix - (e0 << 20), lo(x));
  for (i = 0; i < 2; i++) {
    tx[i] = z | 0;
    z = (z - tx[i]) * two24;
  }
  tx[2] = z;
  let nx = 3;
  while (tx[nx - 1] === zero) nx--; /* skip zero term */
  n = kernelRemPio2(tx, y, e0, nx);
  if (hx < 0) {
    y[0] = -y[0];
    y[1] = -y[1];
    return -n;
  }
  return n;
}
