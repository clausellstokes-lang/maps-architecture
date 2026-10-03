# dmath's known-answer vectors (fdlibm 5.3)

Numbers only (choices C-0029, C-0135; item M0-d-03). `arm64/` and `x86_64/` hold one file per ported routine, written
by `gen/gen.sh`, which compiles `gen/kat.c` with the unmodified fdlibm 5.3 sources of `plat/vendor/fdlibm-5.3/` and
runs it once per architecture; the two folders are byte-identical (a difference is a build-flag error, never a design
fact) and both are committed.

* **Format.** One case per line; every operand and the result as the 16 hexadecimal digits of its IEEE 754 binary64 bit
  pattern, in the routine's argument order: `pow.txt` *x y r*, `atan2.txt` *y x r*, the others *x r*. A NaN result is
  written as the one quiet NaN `7ff8000000000000` and read as "is NaN" (C-0135).
* **Generated with** Apple clang 16.0.0 (clang-1600.0.26.6), `-O0 -ffp-contract=off -fno-fast-math -fno-builtin
  -D__LITTLE_ENDIAN`, `-arch arm64` run natively and `-arch x86_64` run under Rosetta 2 (`arch -x86_64`), on the
  reference machine (§12.1) on 2026-10-03.
* **Cases** (each file): pow 12 381, log 11 121, exp 10 925, sin 11 867, cos 11 867, atan2 11 045, atan 10 139 — the
  special values (signed zeros, subnormals, infinities, NaNs, the extremes), each routine's branch thresholds and
  reduction boundaries with their neighbouring doubles, the special pairs of pow and atan2, and at least 10 000
  arguments per routine drawn by splitmix64 under a fixed seed (`gen/kat.c` lists each family).
* **Regenerate:** `sh packages/kernel/test/vectors/fdlibm/gen/gen.sh` from `plat/`. **Check** (the checker's step):
  `sh packages/kernel/test/vectors/fdlibm/gen/gen.sh --check` recompiles both, regenerates into a temporary folder and
  compares both sets with these files byte for byte (exit 0 when equal).
* **Read by** `packages/kernel/test/dmath/kat.test.ts` (vitest, the runner's Node) and
  `packages/kernel/test/dmath/kat-hosts.mjs` (Node arm64 and Node x64 under Rosetta 2: the exit bar).
