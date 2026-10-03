/*
 * The known-answer generator of PLAT's dmath (item M0-d-03; choices C-0029, C-0039, C-0135).
 *
 * Compiled by gen.sh against the unmodified fdlibm 5.3 sources in plat/vendor/fdlibm-5.3/ with Apple clang in strict
 * IEEE mode (-O0 -ffp-contract=off -fno-fast-math -fno-builtin -D__LITTLE_ENDIAN), once for arm64 and once for x86-64
 * (run under Rosetta 2), and run with an output folder as its one argument. It writes one file per ported routine,
 * numbers only: one case per line, every operand and the result as the 16 hexadecimal digits of its IEEE 754 binary64
 * bit pattern, in the routine's argument order —
 *
 *   pow.txt    x y pow(x, y)        (fdlibm's __ieee754_pow)
 *   log.txt    x log(x)             (__ieee754_log)
 *   exp.txt    x exp(x)             (__ieee754_exp)
 *   sin.txt    x sin(x)             (s_sin.c with k_sin.c, k_cos.c, e_rem_pio2.c, k_rem_pio2.c)
 *   cos.txt    x cos(x)             (s_cos.c, the same kernels)
 *   atan2.txt  y x atan2(y, x)      (__ieee754_atan2)
 *   atan.txt   x atan(x)            (s_atan.c)
 *
 * A NaN result is written as the one quiet NaN 7ff8000000000000: IEEE 754 leaves a NaN's sign and payload to the
 * hardware (x86-64's default NaN is negative, arm64's positive), so only "is NaN" is a known answer (C-0135).
 * The arguments are the special values (signed zeros, subnormals, infinities, NaN, the extremes), the routines' own
 * branch thresholds and reduction boundaries with their neighbouring doubles, and at least 10 000 drawn arguments per
 * routine from splitmix64 (Steele, Lea and Flood, "Fast splittable pseudorandom number generators", OOPSLA 2014) under
 * a fixed seed, so both architectures write the same arguments.
 */
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "fdlibm.h"

typedef unsigned long long u64;

static u64 bits(double x) { u64 u; memcpy(&u, &x, sizeof u); return u; }
static double dbl(u64 u) { double x; memcpy(&x, &u, sizeof x); return x; }
static u64 result_bits(double r) { return r != r ? 0x7ff8000000000000ULL : bits(r); }

/* splitmix64 */
static u64 state = 0x5d4e3c2b1a091807ULL;
static u64 next64(void) {
	u64 z = (state += 0x9e3779b97f4a7c15ULL);
	z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
	z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
	return z ^ (z >> 31);
}
/* a uniform double in [0, 1): 53 random bits, exact */
static double unit(void) { return (double)(next64() >> 11) * (1.0 / 9007199254740992.0); }
static double uniform(double a, double b) { return a + (b - a) * unit(); }
static int below(int n) { return (int)(next64() % (u64)n); }
/* random sign, biased exponent uniform in [emin, emax] (0 = subnormal), random 52-bit fraction */
static double logu(int emin, int emax, int signed_) {
	u64 e = (u64)(emin + below(emax - emin + 1));
	u64 s = signed_ ? (next64() >> 63) : 0;
	return dbl((s << 63) | (e << 52) | (next64() & 0x000fffffffffffffULL));
}
/* the double k units in the last place from x along the bit patterns (x finite and away from zero) */
static double nudge(double x, int k) { return dbl(bits(x) + (u64)(long long)k); }
static double words(unsigned hi, unsigned lo) { return dbl(((u64)hi << 32) | lo); }

/* special values shared by every routine */
static const u64 SPECIAL[] = {
	0x0000000000000000ULL, 0x8000000000000000ULL, /* +-0 */
	0x0000000000000001ULL, 0x8000000000000001ULL, /* +-min subnormal */
	0x0000000000000002ULL, 0x00000000ffffffffULL, 0x0008000000000000ULL,
	0x000fffffffffffffULL, 0x800fffffffffffffULL, /* +-max subnormal */
	0x0010000000000000ULL, 0x8010000000000000ULL, /* +-min normal */
	0x7fefffffffffffffULL, 0xffefffffffffffffULL, /* +-max */
	0x7ff0000000000000ULL, 0xfff0000000000000ULL, /* +-inf */
	0x7ff8000000000000ULL, 0xfff8000000000000ULL, 0x7ff0000000000001ULL, 0x7ff8000000000123ULL, /* NaNs */
	0x3ff0000000000000ULL, 0xbff0000000000000ULL, /* +-1 */
	0x3ff0000000000001ULL, 0x3fefffffffffffffULL, 0xbff0000000000001ULL, 0xbfefffffffffffffULL,
	0x4000000000000000ULL, 0xc000000000000000ULL, 0x3fe0000000000000ULL, 0xbfe0000000000000ULL,
	0x3ff8000000000000ULL, 0x4008000000000000ULL, 0x4024000000000000ULL, 0x3fb999999999999aULL,
	0x3fd0000000000000ULL, 0x3fe8000000000000ULL, 0xc008000000000000ULL,
	0x3fe921fb54442d18ULL, 0x3ff921fb54442d18ULL, 0x400921fb54442d18ULL, 0x401921fb54442d18ULL, /* pi/4 .. 2pi */
	0xbfe921fb54442d18ULL, 0xbff921fb54442d18ULL, 0xc00921fb54442d18ULL,
	0x4005bf0a8b145769ULL, /* e */
	0x01a56e1fc2f8f359ULL, 0x7e37e43c8800759cULL, /* 1e-300, 1e300 */
	0x3e30000000000000ULL, 0x3e40000000000000ULL, 0x3e20000000000000ULL, /* 2^-28, 2^-27, 2^-29 */
	0x41e0000000000000ULL, 0x43f0000000000000ULL, 0x4410000000000000ULL, /* 2^31, 2^64, 2^66 */
	0x4340000000000000ULL, 0x4330000000000000ULL, /* 2^53, 2^52 */
	0x4086200000000000ULL, 0x4086300000000000ULL, 0xc087480000000000ULL, 0xc087500000000000ULL, /* 708, 710, -745, -746 */
	0x40862e42fefa39efULL, 0xc0874910d52d3051ULL, /* exp's thresholds */
	0x4341c37937e08000ULL, 0x44b52d02c7e14af6ULL, 0x7fe0000000000000ULL, /* 1e16, 1e23, 2^1023 */
};
#define NSPECIAL ((int)(sizeof SPECIAL / sizeof SPECIAL[0]))

static FILE *out;
static long cases;

static void open_file(const char *dir, const char *name) {
	char path[4096];
	snprintf(path, sizeof path, "%s/%s", dir, name);
	out = fopen(path, "w");
	if (!out) { perror(path); exit(1); }
	cases = 0;
}
static void close_file(const char *name, long minimum) {
	if (fclose(out) != 0) { perror(name); exit(1); }
	if (cases < minimum) { fprintf(stderr, "%s: %ld cases, fewer than %ld\n", name, cases, minimum); exit(1); }
	printf("%s %ld\n", name, cases);
}

typedef double (*fn1)(double);
typedef double (*fn2)(double, double);
static void one(fn1 f, double x) {
	fprintf(out, "%016llx %016llx\n", bits(x), result_bits(f(x)));
	cases++;
}
static void two(fn2 f, double a, double b) {
	fprintf(out, "%016llx %016llx %016llx\n", bits(a), bits(b), result_bits(f(a, b)));
	cases++;
}
/* x and its neighbours k = -r..r units in the last place away */
static void around(fn1 f, double x, int r) {
	int k;
	for (k = -r; k <= r; k++) one(f, nudge(x, k));
}

#define MIN_CASES 10000L

static void unary_common(fn1 f) {
	int i;
	for (i = 0; i < NSPECIAL; i++) one(f, dbl(SPECIAL[i]));
	for (i = 0; i < 1000; i++) one(f, dbl(next64()));          /* any bit pattern */
	for (i = 0; i < 1000; i++) one(f, logu(0, 2046, 1));        /* any finite magnitude */
}

static void gen_sin_cos(fn1 f) {
	int i, n;
	const double pio2 = 1.57079632679489661923;
	unary_common(f);
	/* the branch thresholds: |x| ~ pi/4, 3pi/4, 2^19 pi/2 (e_rem_pio2), 2^-27 (the kernels), 0.3 and 0.78125 (k_cos) */
	around(f, words(0x3fe921fb, 0x00000000), 2); around(f, words(0x3fe921fb, 0xffffffff), 2);
	around(f, words(0x3fe921fc, 0x00000000), 2); around(f, words(0x4002d97c, 0x00000000), 2);
	around(f, words(0x4002d97b, 0xffffffff), 2); around(f, words(0x413921fb, 0xffffffff), 2);
	around(f, words(0x413921fc, 0x00000000), 2); around(f, words(0x3e400000, 0x00000000), 2);
	around(f, words(0x3fd33333, 0x00000000), 2); around(f, words(0x3fe90000, 0x00000000), 2);
	around(f, words(0x3ff921fb, 0x54442d18), 3); around(f, words(0xbff921fb, 0x54442d18), 3);
	/* the reduction boundaries: n pi/2 and its neighbours, n = 1 .. 200 and a few large n, both signs */
	for (n = 1; n <= 200; n++) { around(f, n * pio2, 2); around(f, -n * pio2, 1); }
	for (n = 0; n < 40; n++) around(f, (double)(below(1 << 30) + 1) * pio2, 1);
	/* a hard case for the reduction: x near a large multiple of pi/2 (e_rem_pio2's 3rd iteration and k_rem_pio2) */
	around(f, 6381956970095103.0, 2); around(f, 5.319372648326541e+255, 2);
	around(f, 1e22, 2); around(f, 2.0 * 6381956970095103.0, 2);
	for (i = 0; i < 2500; i++) one(f, uniform(-6.5, 6.5));
	for (i = 0; i < 1000; i++) one(f, uniform(-0.8, 0.8));
	for (i = 0; i < 1500; i++) one(f, uniform(-1e5, 1e5));
	for (i = 0; i < 1000; i++) one(f, uniform(-1.7e6, 1.7e6));   /* across 2^19 pi/2 ~ 823550 */
	for (i = 0; i < 1500; i++) one(f, logu(1043, 2046, 1));      /* k_rem_pio2: |x| >= 2^20 */
	for (i = 0; i < 500; i++) one(f, logu(900, 1022, 1));        /* |x| < 1, small */
}

static double fd_sin(double x) { return sin(x); }
static double fd_cos(double x) { return cos(x); }
static double fd_atan(double x) { return atan(x); }

static void gen_exp(void) {
	fn1 f = __ieee754_exp;
	int i, k;
	const double ln2 = 0.693147180559945286227;
	unary_common(f);
	around(f, dbl(0x40862e42fefa39efULL), 8); around(f, dbl(0xc0874910d52d3051ULL), 8);
	around(f, words(0x40862e42, 0x00000000), 2); around(f, words(0x40862e41, 0xffffffff), 2);
	around(f, words(0x3fd62e42, 0xfefa39ef), 3); around(f, words(0x3ff0a2b2, 0x3f3bab73), 3);
	around(f, words(0x3fd62e43, 0x00000000), 2); around(f, words(0x3ff0a2b2, 0x00000000), 2);
	around(f, words(0x3e300000, 0x00000000), 2); around(f, words(0xbe300000, 0x00000000), 2);
	around(f, -708.39641853226408, 3); around(f, -1021.0 * ln2, 3); around(f, -1022.0 * ln2, 3); /* k = -1021 edge */
	for (k = -1074; k <= 1023; k += 7) around(f, k * ln2, 1);    /* x = k ln2: exact powers of two */
	for (k = -60; k <= 60; k++) around(f, (k + 0.5) * ln2, 1);   /* rounding boundaries of k */
	for (i = 0; i < 2500; i++) one(f, uniform(-745.2, 709.8));
	for (i = 0; i < 2000; i++) one(f, uniform(-2.0, 2.0));
	for (i = 0; i < 1000; i++) one(f, uniform(-0.35, 0.35));
	for (i = 0; i < 1000; i++) one(f, logu(900, 1020, 1));        /* tiny |x| */
	for (i = 0; i < 500; i++) one(f, uniform(-750.0, -700.0));   /* subnormal results */
	for (i = 0; i < 500; i++) one(f, uniform(700.0, 712.0));     /* overflow edge */
}

static void gen_log(void) {
	fn1 f = __ieee754_log;
	int i;
	unary_common(f);
	around(f, 1.0, 8); around(f, words(0x3ff6a09e, 0x667f3bcd), 3); around(f, words(0x3fe6a09e, 0x667f3bcd), 3);
	around(f, words(0x3ff00000, 0x00000000), 3); around(f, words(0x3ff00001, 0x00000000), 2);
	around(f, words(0x3feffffe, 0x00000000), 2);
	around(f, words(0x3ff6147a, 0x00000000), 2); around(f, words(0x3ff6b851, 0x00000000), 2); /* i|j sign change */
	for (i = 0; i < 3000; i++) one(f, logu(1, 2046, 0));         /* any positive normal */
	for (i = 0; i < 2000; i++) one(f, uniform(0.5, 2.0));
	for (i = 0; i < 1000; i++) one(f, 1.0 + uniform(-9.5367431640625e-07, 9.5367431640625e-07)); /* |f| < 2^-20 */
	for (i = 0; i < 1000; i++) one(f, logu(0, 0, 0));            /* subnormals */
	for (i = 0; i < 1000; i++) one(f, uniform(0.0, 10.0));
	for (i = 0; i < 500; i++) one(f, -uniform(0.0, 10.0));       /* negative: NaN */
	for (i = 0; i < 500; i++) one(f, uniform(1e3, 1e6));
}

static void gen_atan(void) {
	fn1 f = fd_atan;
	int i;
	unary_common(f);
	/* the intervals' edges: 7/16, 11/16, 19/16, 39/16 (high words 0x3fdc0000, 0x3fe60000, 0x3ff30000, 0x40038000),
	   2^66 and 2^-29, both signs */
	around(f, 0.4375, 3); around(f, 0.6875, 3); around(f, 1.1875, 3); around(f, 2.4375, 3);
	around(f, -0.4375, 3); around(f, -0.6875, 3); around(f, -1.1875, 3); around(f, -2.4375, 3);
	around(f, words(0x44100000, 0x00000000), 2); around(f, words(0x3e200000, 0x00000000), 2);
	around(f, words(0xc4100000, 0x00000000), 2); around(f, words(0xbe200000, 0x00000000), 2);
	for (i = 0; i < 3000; i++) one(f, uniform(-4.0, 4.0));
	for (i = 0; i < 2500; i++) one(f, logu(950, 1100, 1));
	for (i = 0; i < 2000; i++) one(f, uniform(-100.0, 100.0));
	for (i = 0; i < 500; i++) one(f, uniform(-1.0, 1.0));
}

static void gen_atan2(void) {
	fn2 f = __ieee754_atan2;
	int i, j;
	/* every special pair (y, x) */
	for (i = 0; i < NSPECIAL; i++)
		for (j = 0; j < NSPECIAL; j++)
			if ((i + j) % 2 == 0 || i < 20 || j < 20) two(f, dbl(SPECIAL[i]), dbl(SPECIAL[j]));
	for (i = 0; i < 2500; i++) { double y = uniform(-10.0, 10.0), x = uniform(-10.0, 10.0); two(f, y, x); }
	for (i = 0; i < 1500; i++) { double y = logu(900, 1150, 1), x = logu(900, 1150, 1); two(f, y, x); }
	for (i = 0; i < 500; i++) two(f, uniform(-10.0, 10.0), 1.0);                        /* x = 1: atan(y) */
	for (i = 0; i < 500; i++) {                                                           /* |y / x| beyond 2^60 */
		double x = uniform(-10.0, 10.0), s = dbl((u64)(1023 + 55 + below(15)) << 52);
		two(f, x * s, x); two(f, x, x * s); two(f, -x, x * s);
	}
	for (i = 0; i < 1000; i++) { double y = dbl(next64()), x = dbl(next64()); two(f, y, x); }
	for (i = 0; i < 500; i++) { double y = uniform(-1.0, 1.0), x = dbl(SPECIAL[below(NSPECIAL)]); two(f, y, x); }
	for (i = 0; i < 500; i++) { double y = dbl(SPECIAL[below(NSPECIAL)]), x = uniform(-1.0, 1.0); two(f, y, x); }
}

static void gen_pow(void) {
	fn2 f = __ieee754_pow;
	int i, j, k;
	/* every special pair (x, y) */
	for (i = 0; i < NSPECIAL; i++)
		for (j = 0; j < NSPECIAL; j++)
			if ((i + j) % 2 == 0 || i < 20 || j < 20) two(f, dbl(SPECIAL[i]), dbl(SPECIAL[j]));
	/* the 5.3 fix: x within ulps of -1 and +1, y huge */
	for (k = -4; k <= 4; k++) {
		two(f, nudge(-1.0, k < 0 ? 0 : k), 4.5035996273704970e+15); two(f, nudge(1.0, k), 4.5035996273704970e+15);
		two(f, nudge(-1.0, k < 0 ? 0 : k), -4.5035996273704970e+15); two(f, words(0xbfefffff, 0xfffffffe), 4.5035996273704970e+15);
	}
	for (i = 0; i < 2000; i++) { double x = logu(1003, 1043, 0), y = uniform(-50.0, 50.0); two(f, x, y); } /* x in [2^-20, 2^20] */
	for (i = 0; i < 1000; i++) { double x = uniform(0.0, 10.0), y = uniform(-10.0, 10.0); two(f, x, y); }
	for (i = 0; i < 1000; i++) { double x = -uniform(0.0, 10.0), y = (double)(below(121) - 60); two(f, x, y); } /* x < 0, integer y */
	for (i = 0; i < 500; i++) { double x = -uniform(0.0, 10.0), y = uniform(-10.0, 10.0); two(f, x, y); } /* x < 0, y not an integer */
	for (i = 0; i < 500; i++) { double x = -logu(1, 2046, 0), y = dbl(0x4330000000000000ULL + (u64)below(1 << 20)); two(f, x, y); } /* y >= 2^52 */
	for (i = 0; i < 700; i++) {                                                            /* x near 1, |y| > 2^31 */
		double x = 1.0 + uniform(-9.5367431640625e-07, 9.5367431640625e-07);
		u64 e = (u64)(1023 + 31 + below(34)), m = next64() & 0x000fffffffffffffULL, s = next64() >> 63;
		double y = dbl(s << 63 | e << 52 | m);
		two(f, x, y);
	}
	for (i = 0; i < 500; i++) {                                                            /* near overflow and underflow */
		double x = uniform(1.1, 4.0);
		double l2 = __ieee754_log(x) / 0.693147180559945286227;
		two(f, x, uniform(1020.0, 1026.0) / l2); two(f, x, uniform(-1080.0, -1070.0) / l2);
	}
	for (i = 0; i < 500; i++) { double x = logu(0, 0, 0), y = uniform(-2.0, 2.0); two(f, x, y); } /* subnormal x */
	for (i = 0; i < 700; i++) { double x = dbl(next64()), y = dbl(next64()); two(f, x, y); }
	for (i = 0; i < 500; i++) { double x = uniform(0.0, 4.0), y = uniform(0.0, 1.0); two(f, x, y); } /* the readers' powers: 4^u, r^g */
	for (i = 0; i < 300; i++) two(f, uniform(-3.0, 3.0), 0.5);                            /* y = 0.5: sqrt */
	for (i = 0; i < 300; i++) two(f, uniform(-3.0, 3.0), 2.0);
	for (i = 0; i < 300; i++) two(f, uniform(-3.0, 3.0), -1.0);
}

int main(int argc, char **argv) {
	if (argc != 2) { fprintf(stderr, "usage: kat <output folder>\n"); return 64; }
	open_file(argv[1], "pow.txt"); gen_pow(); close_file("pow.txt", MIN_CASES);
	open_file(argv[1], "log.txt"); gen_log(); close_file("log.txt", MIN_CASES);
	open_file(argv[1], "exp.txt"); gen_exp(); close_file("exp.txt", MIN_CASES);
	open_file(argv[1], "sin.txt"); gen_sin_cos(fd_sin); close_file("sin.txt", MIN_CASES);
	open_file(argv[1], "cos.txt"); gen_sin_cos(fd_cos); close_file("cos.txt", MIN_CASES);
	open_file(argv[1], "atan2.txt"); gen_atan2(); close_file("atan2.txt", MIN_CASES);
	open_file(argv[1], "atan.txt"); gen_atan(); close_file("atan.txt", MIN_CASES);
	return 0;
}
