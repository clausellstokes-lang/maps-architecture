# The session's seam for M0-e-02 S2's declared shift (J766, J786) — 2026-11-12

M0-e-02 S2 (the seventy-sixth landing; choices C-0498) re-traces a river along its own descent line when its three
re-traces fail. On the site fixture relief-60 at the test size, seed 2, the river is then another attempt.

* The five site-spike titles J766 declared (bench/test/site/spike.test.ts, relief-60 seed 2): GREEN on the merged tree —
  the derivation commits whole there (0 refusals; S3 with two water gates). Nothing to re-pin.
* ONE other pin moved, found by the landings' gate (RELATED@1000 over the three changed sources on the merged tree,
  a557bbad): `plat/packages/layout/test/growth/s5ab/held.test.ts` (M0-c-04's), the test-size case of "the enclosure of
  stage k − 1 is held with the standing wall". Its own non-vacuity line — "the plain boundary leaves points of stage 1's
  wall outside it: the repair runs" — read 0 (`held-seed2-red-on-the-merged-tree.log`): with the new river the wall
  stands inside stage 2's plain boundary.
* THE SEAM: the case is moved from seed 2 to SEED 12 of the same fixture and size; no assertion is changed.
  `scan-relief60-testsize-seeds-1-70.jsonl` is the session's scan on the merged tree with the test's own `stage2`
  helper: the plain boundary leaves the wall outside on seeds 12 (9 points, up to 537 cm), 13 (3, 864 cm), 22 (1,
  1 020 cm), 38 (17, 852 cm), 58 (4, 2 180 cm) and 68 (5, 651 cm); on each the step commits, the handed boundary holds
  the wall, `defectOf` is null, the land is exact, nothing is folded.
* PROVEN on the merged tree with the seam: the file whole, 7 of 7 at the PR size (818 s) and 7 of 7 at
  PLAT_FUZZ_RUNS=1000 (855 s); lint 0 (eslint 1 312 files); landed:verify ok (469 records).
* M0-c-04 S6 (child DU, in flight at this writing) changes the same file elsewhere, from a base before the shift: AT ITS
  LANDING the seam is re-applied on its version, and its new literal pins on relief-60 CITY seed 13 are checked on the
  merged tree.
