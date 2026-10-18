# xoshiro128\*\*'s known-answer vectors

Numbers only (choices C-0029, C-0143; item M0-d-01). `arm64/` and `x86_64/` hold the same two files, written by
`gen/gen.sh`, which compiles `gen/kat.c` with the authors' unmodified `xoshiro128starstar.c` (and the `f2x.c` it
includes) from `plat/vendor/xoshiro/` and runs it once per architecture; the two folders are byte-identical (a
difference is a build-flag error, never a design fact) and both are committed.

* **Format.** One case per line, every number 8 lower-case hexadecimal digits (a u32):
  `xoshiro128ss.txt` — the state `s0 s1 s2 s3` the case seeds into the C's `s[0 … 3]`, then the first eight values
  `next()` returns; `xoshiro128ss-long.txt` — the state, a step count `n`, then the values returned by calls
  `n + 1 … n + 4`.
* **Generated with** Apple clang 16.0.0 (clang-1600.0.26.6), `-O0 -ffp-contract=off -fno-fast-math -w`, `-arch arm64`
  run natively and `-arch x86_64` run under Rosetta 2 (`arch -x86_64`), on the reference machine (§12.1) on 2026-10-03.
* **Cases.** `xoshiro128ss.txt` 4 232: the authors' customary (1, 2, 3, 4), every word all ones, the kernel's all-zero
  nudge (C-0143), five patterned states, all 128 single-bit states, and 4 096 states drawn by splitmix64 under a fixed
  seed (an all-zero draw skipped); `xoshiro128ss-long.txt` 8: (1, 2, 3, 4), the nudge and six drawn states through
  10⁶ calls.
* **Regenerate:** `sh packages/kernel/test/vectors/xoshiro/gen/gen.sh` from `plat/`. **Check** (the checker's step):
  `sh packages/kernel/test/vectors/xoshiro/gen/gen.sh --check` recompiles both, regenerates into a temporary folder and
  compares both sets with these files byte for byte (exit 0 when equal).
* **Read by** `packages/kernel/test/rng/kat.test.ts` (vitest, the runner's Node) and
  `packages/kernel/test/rng/kat-hosts.mjs` (Node arm64 and Node x64 under Rosetta 2: the exit bar).
