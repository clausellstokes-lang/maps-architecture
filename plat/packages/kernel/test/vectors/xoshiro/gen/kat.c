/*
 * The known-answer generator of PLAT's xoshiro128** port (item M0-d-01; §6.1, §17.1 (8); choices C-0029, C-0143).
 *
 * Compiled by gen.sh against the authors' unmodified xoshiro128starstar.c (plat/vendor/xoshiro/, which includes f2x.c)
 * with Apple clang (-O0 -ffp-contract=off -fno-fast-math, C-0029's strict mode; the generator is integer arithmetic
 * only), once for arm64 and once for x86-64 (run under Rosetta 2), and run with an output folder as its one argument.
 * It writes two files, numbers only, every number as 8 lower-case hexadecimal digits (a u32):
 *
 *   xoshiro128ss.txt       s0 s1 s2 s3 r1 … r8     the state the case seeds into s[0 … 3], then the first eight
 *                                                  values next() returns from it
 *   xoshiro128ss-long.txt  s0 s1 s2 s3 n r1 … r4   the state, a step count n, then the values next() returns at calls
 *                                                  n + 1 … n + 4 (the first n discarded)
 *
 * The states: the authors' customary (1, 2, 3, 4); every word all ones; the kernel's all-zero nudge (C-0143); every
 * one of the 128 single-bit states; a few patterned states; then 4 096 states drawn by splitmix64 (Steele, Lea and
 * Flood, "Fast splittable pseudorandom number generators", OOPSLA 2014) under a fixed seed, an all-zero draw skipped
 * (the authors' note: the state must not be everywhere zero), so both architectures write the same cases. The long
 * file runs eight of those states through 10^6 calls.
 */
#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>
#include "xoshiro128starstar.c"

#define OUTS 8
#define RANDOM_CASES 4096
#define LONG_STEPS 1000000u

static uint64_t sm = UINT64_C(0x504c41545f726e67); /* splitmix64's state: the bytes of "PLAT_rng" */
static uint64_t splitmix64(void) {
	uint64_t z = (sm += UINT64_C(0x9e3779b97f4a7c15));
	z = (z ^ (z >> 30)) * UINT64_C(0xbf58476d1ce4e5b9);
	z = (z ^ (z >> 27)) * UINT64_C(0x94d049bb133111eb);
	return z ^ (z >> 31);
}

static void seed(uint32_t a, uint32_t b, uint32_t c, uint32_t d) {
	s[0] = a;
	s[1] = b;
	s[2] = c;
	s[3] = d;
}

static void short_case(FILE *f, uint32_t a, uint32_t b, uint32_t c, uint32_t d) {
	seed(a, b, c, d);
	fprintf(f, "%08" PRIx32 " %08" PRIx32 " %08" PRIx32 " %08" PRIx32, a, b, c, d);
	for (int i = 0; i < OUTS; i++) fprintf(f, " %08" PRIx32, next());
	fputc('\n', f);
}

static void long_case(FILE *f, uint32_t a, uint32_t b, uint32_t c, uint32_t d, uint32_t n) {
	seed(a, b, c, d);
	for (uint32_t i = 0; i < n; i++) next();
	fprintf(f, "%08" PRIx32 " %08" PRIx32 " %08" PRIx32 " %08" PRIx32 " %08" PRIx32, a, b, c, d, n);
	for (int i = 0; i < 4; i++) fprintf(f, " %08" PRIx32, next());
	fputc('\n', f);
}

static FILE *open_out(const char *dir, const char *name) {
	char path[4096];
	snprintf(path, sizeof path, "%s/%s", dir, name);
	FILE *f = fopen(path, "w");
	if (f == NULL) {
		fprintf(stderr, "kat: cannot write %s\n", path);
		return NULL;
	}
	return f;
}

int main(int argc, char **argv) {
	if (argc != 2) {
		fprintf(stderr, "usage: kat <output folder>\n");
		return 64;
	}
	FILE *f = open_out(argv[1], "xoshiro128ss.txt");
	FILE *g = open_out(argv[1], "xoshiro128ss-long.txt");
	if (f == NULL || g == NULL) return 1;

	uint32_t keep[8][4];
	int kept = 0;
	int cases = 0;

	short_case(f, 1, 2, 3, 4);
	short_case(f, 0xffffffffu, 0xffffffffu, 0xffffffffu, 0xffffffffu);
	short_case(f, 0x6a09e667u, 0xbb67ae85u, 0x3c6ef372u, 0xa54ff53au); /* the all-zero nudge (C-0143) */
	short_case(f, 0x428a2f98u, 0x71374491u, 0xb5c0fbcfu, 0xe9b5dba5u);
	short_case(f, 0x80000000u, 0x80000000u, 0x80000000u, 0x80000000u);
	short_case(f, 0x00000001u, 0x00000000u, 0x00000000u, 0x00000000u);
	short_case(f, 0xdeadbeefu, 0x00000000u, 0xffffffffu, 0x12345678u);
	short_case(f, 0x55555555u, 0xaaaaaaaau, 0x55555555u, 0xaaaaaaaau);
	cases += 8;
	for (int w = 0; w < 4; w++) {
		for (int b = 0; b < 32; b++) {
			uint32_t v[4] = { 0, 0, 0, 0 };
			v[w] = UINT32_C(1) << b;
			short_case(f, v[0], v[1], v[2], v[3]);
			cases += 1;
		}
	}
	for (int i = 0; i < RANDOM_CASES; ) {
		uint64_t x = splitmix64();
		uint64_t y = splitmix64();
		uint32_t v[4] = { (uint32_t)x, (uint32_t)(x >> 32), (uint32_t)y, (uint32_t)(y >> 32) };
		if ((v[0] | v[1] | v[2] | v[3]) == 0) continue;
		short_case(f, v[0], v[1], v[2], v[3]);
		if (kept < 6) {
			for (int k = 0; k < 4; k++) keep[kept][k] = v[k];
			kept += 1;
		}
		cases += 1;
		i += 1;
	}

	long_case(g, 1, 2, 3, 4, LONG_STEPS);
	long_case(g, 0x6a09e667u, 0xbb67ae85u, 0x3c6ef372u, 0xa54ff53au, LONG_STEPS);
	for (int k = 0; k < kept; k++) long_case(g, keep[k][0], keep[k][1], keep[k][2], keep[k][3], LONG_STEPS);

	if (fclose(f) != 0 || fclose(g) != 0) return 1;
	printf("  xoshiro128ss.txt %d cases, xoshiro128ss-long.txt %d cases\n", cases, 2 + kept);
	return 0;
}
