# M0-x-05 — minor notes for the hardening milestone M4 (check/M0-x-05, 2026-10-07)

None of these fails the item (J180). Each is a gap or a hardening step, not a wrong result.

1. **The table is not cross-checked against the stages' own ladder declarations (PLAUSIBLE gap; the codes CONFIRMED by
   reading).** S3's slice writes an F-ROUTE `unserved` with code `unserved` (`siting/routes.ts` l. 103 and 144: a pick
   the plaza tree cannot reach, or no path to the frame). The `S3` StageDecl declares an F-WALL `reroute`
   (`pipeline/base.ts` l. 454; C-0201 (6)). Neither is a `STAGE_LADDERS` row, and `readSlice` counts neither. The
   `unserved` rung itself is exercised at S4/S5b, and `reroute` is M0-c-01's addition, not a §5.2 rung. Hardening: one
   test that walks every registered stage's `ladder` declaration (`registerBase`) and requires each (class, rung) to
   be a table row or a declared non-§5.2 extra.
2. **The verdict does not fold in the fixture runs' `bugs`.** `fixtures.ts`'s `chain()` discards the chain's report.
   Some rung tests assert `bugs` empty for their own runs, but `stageLadderCoverage().covered` would stay true with a
   bug in a fixture run. This seat's probe found 0 bugs in all 21 chain runs (CONFIRMED). Hardening: carry a bugs
   count per fixture into the report and require it to be 0.
3. **F-BUDGET-STAGE's `accept_shortfall` is reached through the walled skip (why `walled`), not after a top-up.**
   Demand ×4 at the small town's stage 3 gives `top_up` and then `accept_shortfall` (why `remainder`) (CONFIRMED by
   probe). That is the design's ladder order exactly and would make a stronger fixture. A side observation for
   M0-c-05 (PLAUSIBLE, not this item's): at ×4 the shortfall after the top-up (1.37 × 10⁹ cm²) is larger than before it
   (1.03 × 10⁹ cm²). The bands are probably re-cut over the grown land. Worth a look in M0-c-05's hardening.
4. **`checkLadderTable` pre-names the kernel ladders (F-NUM, F-SKELETON) without consulting the kernel report.** If
   M0-k-04's report lost its F-SKELETON rows, `tableProblems` would stay empty and `covered` would stay true. Only
   `ladders` would drop the class, which the full-run test does catch. Hardening: derive the kernel classes from
   `kernel.ladders` in the verdict.
5. **"Reproduces byte for byte" is tested in one process and without the plain baseline.** This seat's separate bench
   run reproduced the committed summary byte for byte, plain baseline included (sha256 `d4a65c0f…`). Hardening: a test
   that compares a second process's summary.
6. **W_CUT_SLID's leaf counts slide steps, not slid cuts.** `cut/slide` shows "fixture 30" for one cut slid 30 steps,
   and the plain baseline's 26 is a step count too. Name the unit in the summary, or count the slid (c) cuts.
7. **The `route.nodes` fixtures use S3's and S4's direct `routeNodesLimit` option, not "a test-side workLimits table".**
   Neither stage takes a table (`backbone/stage.ts` l. 169, `siting/slice.ts` l. 94 read `loadWorkLimits()` or the
   option), so the table's law path for `route.nodes` is not exercised by a low floor. C-0269 (3) names the option.
   Hardening: a table injection in S3 and S4, or a note in C-0269.
8. **F-CUT's "nowhere on the plain fixture" rests on one control, a 200 m × 150 m rectangle.** By C-0269 (2), the plain
   FLAT run reaches every F-CUT rung. A second plain S8 control (a convex non-rectangular face set) would make the
   zero less dependent on one shape.
9. **For the session, not the item:**
   (a) The RELATED red `bench/test/fusion/hausdorff.test.ts` (S8 ≡ S9) is M0-c-06's in-progress file. It fails with this
   item's testkit index line removed (CONFIRMED in this seat's mirror).
   (b) The plain FLAT run at seed 1 leaves S5b's stage-3 main road `s5b:3/4/out` unserved (no path). That is M0-c-04's
   router outcome. It is reported and fails safe, so it is for M0-c-04's hardening, not this item.
