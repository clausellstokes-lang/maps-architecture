# M0-d-09: minor notes for the hardening milestone M4 (lane `check/M0-d-09`, 2026-10-07)

These are the minor findings of the first check (`checks/M0-d-09.md`). None of them fails the item (J180, N-45). The
mutant ids are the check's own. Logs are in `~/maps-scratch/waves/check-M0-d-09/` (`mut-<id>.log`, `results.txt`,
`results2.txt`).

1. **The summary's authority counts have no test (mutant TP survives).**
   * Mutant TP changes `report.ts` to `authoritative: stamps.length`. `report.test.ts`, `runner.test.ts` and
     `pair.test.ts` all stay green, because every test that builds a report runs with the timing switch off and has
     no stamp.
   * No timing value is presented as a result: each stamp in the full report keeps the authority the M0-f-01
     harness measured, and the summary holds counts only.
   * To harden: build a report from two seed results, one stamp `contended` and one `authoritative`. Assert
     `timings.contended === 1`, `timings.authoritative === 1`, and the summary's matching counts.
2. **`matchPair`'s own `rootsEqual` is not tested on a failing input (mutant P10 survives).**
   * Mutant P10 sets `rootsEqual = true`. `pair.test.ts`, `runner.test.ts` and `report.test.ts` stay green.
   * `pair.test.ts` asserts the standing roots directly. `report.test.ts` fails a synthetic pair whose `rootsEqual`
     is false. The `recordsEqual` compare of S1, S3 and S4's records also guards a moved standing stage (PLAUSIBLE).
   * To harden: run `matchPair` on a pair whose fresh side has a tampered S4 root, and assert `rootsEqual === false`.
3. **The lineage and stage compare in the standing check is equivalent on M0's inputs (mutant E1 survives).**
   * Mutant E1 reduces the standing check to "the same kind and id exists".
   * Every standing entity (S1's water and bridges, S3's enceinte and gates, S4's ways, junctions, gates and bridges)
     carries an address lineage (`addressLineage(id)`). Its `by` comes from the same S1 – S4 records in both runs. So
     the dropped compares cannot differ while the id matches. Judged equivalent at M0.
   * Revisit at M1, when standing records carry their own Identity.
4. **The dilation runs read no clock (`reads: 0`).**
   * At this seed the model reads no clock, so each × 10 and × 0.1 run is a plain re-run. The runner's planted test
     plants `Math.random` only.
   * The dilation half therefore never sees a scaled read on the spike city. M0-d-08's own tests hold the shim.
   * To harden: add a planted scratch stage that reads `performance.now()`, and assert that the dilation runs name it
     as the first difference.
5. **The byte-for-byte reproduction test covers half of the spike city.**
   * `runner.test.ts` runs the fusion spike and the records tree only, at the test frame. The site spike's eight
     cells are not in the reproduced report.
   * My probe found the planted-table report byte-identical at `--jobs 1` and `--jobs 3`.
   * To harden: add the site spike to the reproduction, or a second reproduction at another seed.
6. **"0 duplicate ids" is counted after a bench-side copy of the mint's address rule (C-0274).**
   * `mintAddresses` restates §6.3's `~k` rule for provisional ids, because M0's records carry no lineage keys for
     M0-d-05a's `mint` to read.
   * The count therefore guards the routine's hand-on (one address handed twice, or a survivor's address handed),
     not `mint` itself.
   * To harden: re-run the pair through `mint` once M1's records carry Identity.
7. **The summary names the x86-64 leg `node-x64-rosetta` on a native x86-64 host.**
   * The full report's `engine` field carries the measured `host.kind`. The numbers-only summary keeps only the leg
     id, so on this machine it reads as Rosetta.
   * This is wording only (C-0228 (1) keeps the id).
8. **Refused stages are counted from the in-process seeds only.**
   * `bugs.refused` sums `SeedResult.bugs`, so a run with no in-process seed reports `refused 0` whatever its legs
     derived. My cross-host-only runs over seeds 35 – 100 (`--pairs 0 --checks 0`) are such runs.
   * A refusal on a leg is still compared, through the `<spike>.report` cell's digest. But it is not counted or listed.
   * To harden: also count refusals for the cross-host seeds, for example by the leg returning its report's bug
     count beside the digest, or say in the summary that `refused` covers the in-process seeds only.

## Rows added by the closing check (lane `check/M0-d-09-close-r1`, 2026-10-08)

None of these fails the item (J162, J169, N-45). Logs are in `~/maps-scratch/waves/check-M0-d-09/close-r1/`.

9. **The records tree's mismatch count has no test of its wiring into the seed's tally (mutant T5b survives).**
   * Mutant T5b deletes `mismatches += rec.oracle.mismatches;` in `task.ts`. All 9 test files (51 tests) stay green
     (`mut-T5b-all.log`). B-3's fix pins the records tree's batch count in the tally
     (`oracle.batches === commits + RECORDS_BATCHES + 1`, which kills T5 and ST1), but not its miss count.
   * On the item's code a planted records miss reaches the tally. My probe `zz-probe-recmiss.test.ts` (mirror only)
     puts a records run with `mismatches: 1` in the carry and gets `{"batches":4,"mismatches":1,"first":{"spike":
     "records",…}}`. Under T5b the same probe gets `mismatches: 0`, so the verdict would pass while still naming the
     miss as `firstDifference`. The code is right today; only a test is missing.
   * To harden (M4): add that probe to `runner.test.ts`, then send the tally through `buildReport` and assert
     `verdict === 'fail'`.
10. **At the test frame the fusion spike's `{ S5: 1 }` reroll re-draws nothing (C-0280 (3), confirmed). This is for
    the session and the growth stage's owners, not for M0-d-09.**
    * My probe (`zz-probe-city.test.ts`, mirror only) compared stage roots between the old run and the `{ S5: 1 }` run:
      * test frame (400 ha, 12 ha walled), fusion seeds 1, 2 and 3: no stage root moved, and there were no refusals;
      * CITY, fusion seed 1: S5, S6 and S8 moved.
    * The item reports such a pair as `unmoved`, and its matching bar fails only when no pair re-drew a stage. So the
      bar is fail-safe.
    * Why S5 on the small flat frame draws nothing from the rerolled streams is a question for S5's owners (M0-c
      fused layout). It matters for any later test that uses a test-frame fusion pair as a matching workload.
