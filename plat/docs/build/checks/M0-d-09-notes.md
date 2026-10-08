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
