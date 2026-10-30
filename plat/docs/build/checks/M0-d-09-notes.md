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

## Hardening round S1 (lane `build/M0-d-09-fix-s1`, flow-7, 2026-10-19 – 2026-10-20; J237 (2), J186, J192, J264, J290 / N-58; choices C-0401) — the builder's row-by-row outcome

The session's hardening round of M0-d-09 on the inventory's FIX-NOW rows M0-d-09:7 1, :15 2, :26 4, :32 5, :43 7,
:47 8 and :58 9 (re-triage J423, batch B3: all seven kept). Each source note above (1, 2, 4, 5, 7, 8, 9) was read whole
before its fix. Rows 3 and 6 are CARRY-FORWARD to M1 and row 10 is M0-c-04's; none of them is touched. The edits stay
inside the item's owns: `bench/src/determinism/report.ts` (rows 7 and 8), the tests `bench/test/determinism/report.test.ts`
(rows 1, 7, 8), `pair.test.ts` (row 2), `planted.test.ts` with the new fixture `fixtures/clock-stages.ts` and the
clock table's entry and stages in `support.ts` (row 4), and `runner.test.ts` (rows 5 and 9). No index or barrel export was added, removed or
renamed (J263 Q1): `bench/src/determinism/index.ts` is byte-identical to its landed hash. The round started on
2026-10-19 and resumed on 2026-10-20 under the CONTINUE RULE. Its edits stood in the tree, and its mirror and mutant logs
were gone, so every mutant below was re-run first-hand in a rebuilt mirror, under the definitions given here.

| row | outcome | what changed | pin (test title) | mutants killed |
|---|---|---|---|---|
| 1 (:7, TP) | **pinned** | Test only. A report is built from two seed results, one with a `contended` stamp and one with an `authoritative` stamp. It asserts `timings.contended === 1`, `timings.authoritative === 1` and `taken`, with the stamps kept in label order, each with the authority the harness measured. The summary's `timings` is `{ stamps: 2, contended: 1, authoritative: 1 }`, and the verdict stays `pass`: a stamp is reported, never a result. A second report with two contended stamps gives `{ 2, 2, 0 }`. | `report.test.ts` "counts the timing stamps by their authority, one contended and one authoritative (hardening S1, check note 1)" | TP (`authoritative: stamps.length`, the note's mutant) |
| 2 (:15, P10) | **pinned** | Test only. `matchPair` runs on the site pair at seed 1 (test frame), its fresh side with the S1, S3 or S4 root tampered in turn: `rootsEqual` is false, while `recordsEqual` stays true, `missing` stays 0 and `redrawn` stays `['S5', 'S6', 'S8']`. So `rootsEqual` alone sees the tamper. A fresh side with no S4 root is also `rootsEqual` false, and the untampered pair is true. | `pair.test.ts` "a fresh side with a tampered S1, S3 or S4 root, or none, has rootsEqual false; its records and entities as they were" | P10 (`rootsEqual = true`, the note's mutant) |
| 4 (:26) | **pinned** (the note's shape: a planted scratch stage that reads `performance.now()`) | Test and fixture. `fixtures/clock-stages.ts` is a scratch table whose `scratch.clocked` stage is a time-budgeted ladder. At seed 2 alone it reads `performance.now()` around a real 300 ms `Atomics.wait`, which no clock shim scales, and takes rung 2 when more than 1 500 ms seem to have passed. Un-dilated, it always takes rung 1. The run over seeds 1 – 3 with 3 check seeds: the legs, the in-process run and the op-order runs agree. The dilation runs number 6 with 1 differing and 4 clock reads answered, and both the dilation's first difference and the report's are `{ seed: 2, stage: 'scratch.clocked', check: 'dilation x10' }`. The failure text is `dilation: 1 of 6 runs differ`, and the verdict is `fail`. | `planted.test.ts` "a planted clock read (hardening S1, check note 4) › is named by the dilation runs as the first difference, and by nothing else" | D1 (the dilation runs at factor 1: plain re-runs), D2 (`count: 0`: the reads the shim answered not counted) |
| 5 (:32) | **fixed** (test: the reproduction widened to the whole spike city) | The byte-for-byte reproduction now runs every stage of the spike city (`SPIKE_STAGE_IDS`, 17 cells: the fusion spike, the site spike and the records tree) at seed 1, with both re-derivation pairs (fusion and site) and the check runs. It asserts `reportText(b) === reportText(a)`, and also the oracle tally (fusion commits + site commits + `RECORDS_BATCHES` + 1), both pairs in `perPair`, and the site pair's `redrawn`. **The two readings of the row:** note 5 named the site spike as the missing half. The re-triage (J423) restated the row as "add the fusion spike", because fix round 1 had moved the runner test's pair to the site spike (lane log, 2026-10-08 05:23). The widened test holds both halves, so both readings are met. Of the note's alternatives (the site spike, or a second seed), the whole spike city at one seed was taken. | `runner.test.ts` "byte for byte on a second run (seeded): the whole spike city — the fusion spike, the site spike and the records tree — at seed 1, its pairs and the check runs (hardening S1, check note 5)" | R5a (a run-to-run random term in the **fusion** pair's `reportedRefs`), R5b (the same in the **site** pair's) |
| 7 (:43) | **fixed** (the row's "say so in the summary"; wording) | `report.ts`: each cross-host run in the report carries `hostKind`, the host M0-d-06's leg measured itself on (`host.kind`: `native-arm64`, `rosetta` or `native-x64`). The numbers-only summary's `crosshost.runs[]` carries the same field, and the terminal line reads `<leg>/<workers> ran on <hostKind>`. The leg id `node-x64-rosetta` stays (C-0228 (1)). On a native x86-64 host the summary now reads `hostKind: 'native-x64'`, and under Rosetta it reads `rosetta`. | `report.test.ts` "names the host each leg ran on: the x86-64 leg node-x64-rosetta on a native x86-64 host reads native-x64 (hardening S1, check note 7)" | H7 (the summary's `hostKind` dropped) |
| 8 (:47) | **fixed** (the row's second alternative: the scope stated in the summary) | `report.ts`: the summary gains `refusedScope: { inProcessSeeds, crossHostOnlySeeds }`. The report's `bugs` field says in its doc comment what it counts, and the terminal line reads `refused stages: N (the K in-process seeds only; J cross-host-only seeds compared, not counted)`. A run with no in-process seed reports `refused 0` with every seed in `crossHostOnlySeeds`. **Why not the first alternative:** counting the legs' refusals needs a leg to return its report's bug count beside the digest. That return shape is M0-d-06's (`CrossHostDigest`, `packages/testkit/src/crosshost/`), outside this item's owns and a contract between items. A refusal on a leg is still compared, through its `<spike>.report` cell. | `report.test.ts` "says that the refused count covers the in-process seeds only (hardening S1, check note 8)" | B8 (the summary's `refusedScope` dropped) |
| 9 (:58, T5b) | **pinned** (the note's probe, made a test) | Test only. A records stage puts a `RecordsRun` with `mismatches: 1` in the carry. `runSeedTask`'s tally is `{ batches: RECORDS_BATCHES + 1, mismatches: 1, first: { spike: 'records', … } }`. Through `buildReport`, the oracle bar fails (`oracle: 1 of 4 batches missed, 0 end check(s) failed`, with `RECORDS_BATCHES` = 3), the first difference is `records.records` at batch 2, and the verdict is `fail`. The control, the same run with 0 misses, passes the oracle bar. | `runner.test.ts` "a records-tree oracle miss (hardening S1, check note 9) › reaches the seed's tally and fails the oracle bar and the verdict through buildReport" | T5b (`mismatches += rec.oracle.mismatches;` deleted, the note's mutant) |

**Mutant table** (J183: the faults the rows name, re-introduced in the lane's one scratch mirror,
`/home/user/maps-scratch/waves/selfcheck-build-M0-d-09-fix-s1/plat`). Isolation was proven first: no link into the tree,
and `realpath` of `bench/node_modules/@plat/testkit` was inside the mirror. Each mutant ran
`corepack pnpm exec vitest run --maxWorkers=1 --bail=1 bench/test/determinism`. Each file was restored by copy and
checked with `cmp -s`. **9 mutants: 9 killed**, each by the pin named above (the run's only failing test):

| mutant | file | the fault | killed by | exit |
|---|---|---|---|---|
| TP | `report.ts` | `authoritative: stamps.length` | row 1's pin | 1 |
| P10 | `rederive.ts` | `const rootsEqual = true;` | row 2's pin | 1 |
| D1 | `task.ts` | `withDilationCounted(1, …)`: the dilation runs are plain re-runs | row 4's pin (53 other tests green, the Math.random plant among them) | 1 |
| D2 | `task.ts` | the dilation check's `count: 0` | row 4's pin | 1 |
| R5a | `rederive.ts` | `reportedRefs` + a random term for the fusion pair | row 5's pin | 1 |
| R5b | `rederive.ts` | `reportedRefs` + a random term for the site pair | row 5's pin | 1 |
| H7 | `report.ts` | the summary's `hostKind` dropped | row 7's pin | 1 |
| B8 | `report.ts` | the summary's `refusedScope` dropped | row 8's pin | 1 |
| T5b | `task.ts` | `mismatches += rec.oracle.mismatches;` deleted | row 9's pin | 1 |

**The control (red only with the round's tests).** TP, P10, D1, D2, R5a, H7, B8 and T5b were applied together in the
mirror, and the folder was run with the round's seven tests skipped (`-t '^(?!.*hardening S1).*$'`): **50 passed, 7
skipped, exit 0.** So no test from before the round kills any of them. R5b was left out of the joint run because it
edits the line R5a edits. Its control is the same shape as R5a's (PLAUSIBLE). That control also skips the widened
reproduction test itself. Whether the pre-round reproduction (the site spike and the records tree, after fix round 1)
would have caught R5b, and not R5a, is reasoned from the lane log's 2026-10-08 05:23 line, not run (PLAUSIBLE).

**Refusals (J264, N-58).** The item's registered family is the spike city its tests derive: the test frame (400 ha,
12 ha walled), seeds 1 – 4, both spikes, each as the old run and as the `{ S5: 1 }` re-derivation, 16 runs. **Refused
0 before** (2026-10-19, lane log 13:42) **and 0 after** (2026-10-20, probe `zz-census.test.ts`, mirror only: 16 runs,
0 bugs). The count did not rise, and no lawful-input refusal was seen. The round changes no derivation: `spike.ts`,
`stages.ts`, `rederive.ts`, `task.ts`, `records.ts`, `census.ts`, `entities.ts` and `runner.ts` are byte-identical to
their landed hashes. So no refusal class moved, and nothing has a verdict to class.

**Behaviour and formats (no declared shift).** No digest, golden, stage root or seed-to-output law moved. The changes
are additive fields of the item's own output, which rows 7 and 8 ask for:
* `DeterminismSpikeReport.crosshost.runs[].hostKind` (optional);
* the summary's `crosshost.runs[].hostKind` and `refusedScope`;
* two terminal lines (`reportLines`), each pinned verbatim by its row's test (J263 Q6).

Nothing outside the item reads the report, the summary or `reportLines` (searched inside `plat/`). The committed
`docs/build/summaries/M0-d-09.json` is a measured run's output (2026-10-08), and it is not re-written by hand. The next
spike run writes the new fields. Rows 3 and 6 stay CARRY-FORWARD (M1, records with Identity).

**Gates** (2026-10-20, W = 1 from `tools/test_budget.py`): install --frozen-lockfile 0; lint 0 (`lint: probe-red ok`);
build 0; NEAR `bench/test/determinism` 9 files 57/57, exit 0; RELATED@1000 over `bench/src/determinism/report.ts` (PLAT_FUZZ_RUNS=1000) 9 files 57/57, exit 0.

**Seat slips (disclosed; also in the seat's CLEAN-ROOM row).** At its start this seat ran two read-only git commands
(`git status --short`, `git log --oneline -3`), against the working rule. Their output was not used: attribution stands
on the landed record's hashes. Once, mutant TP was applied for a few seconds to the shared tree's `report.ts` instead of
the mirror. It was reverted at once, and the file was `cmp`-identical to the mirror's pristine copy before any test of
this seat ran. Every mutant run afterwards went through a script that writes only to the mirror.

## Closing check of hardening round S1 (lane `check/M0-d-09-close-s1`, flow-7, 2026-10-20)

None of these fails the round (J162, N-45): each is a fail-safe observation or a tightening. The verdict is
`checks/M0-d-09-s1.md`. Logs are in `/home/user/maps-scratch/waves/check-M0-d-09/close-s1/`.

11. **At the test frame the site spike's `{ S5: 1 }` reroll also re-draws nothing at seeds 2 and 3.** This is for the
    session with row 10 (M0-c-04's S5 owners), not for M0-d-09.
    * The checker's census probe (`census.txt`, mirror only) derived the site spike at seeds 1 – 4, old and `{ S5: 1 }`.
      The model root moved at seeds 1 and 4 and stayed equal at seeds 2 and 3. The fusion spike's root stayed equal at
      all four seeds (row 10's observation). There were 0 refusals.
    * The item stays fail-safe: such a pair is counted as `unmoved`, and the matching bar fails only when no pair re-drew
      a stage (C-0280). The runner's tests use seed 1, where the site pair moves.
    * Suggested handling: fold it into row 10's question. A later test-frame matching workload should pick its seeds from
      the pairs that move.
12. **In row 9's pin, `miss.verdict === 'fail'` does not tell the miss apart (M4).**
    * The scratch table holds the records stage only, so it has no spike to census, and the distinctness bar fails with
      or without the miss. The clean control's verdict is `fail` too.
    * The assertions that do tell the miss apart are `oracle.pass === false`, the `oracle: 1 of 4 batches missed …`
      failure line and the first difference. This checker's mutants T5b, T5c and T5d (`oracle.pass` ignoring
      `mismatches`) are each red on them.
    * Suggested handling (M4): assert that the miss's `failures` minus the clean control's is exactly the oracle line.
13. **The clock fixture's un-dilated rung depends on wall time (M4).**
    * `scratch.clocked` takes rung 1 un-dilated only while the real 300 ms `Atomics.wait` reads under 1 500 ms. A host
      stall of more than about 1.2 s between the two reads would put an un-dilated run on rung 2. The legs and the
      in-process run would then differ, and the test would go red: a flake shown as a red test, never a silent pass.
    * `Atomics.wait` throws on a browser's main thread, so the fixture serves the Node legs only. The test asks for
      one Node leg.
    * Suggested handling (M4): widen the budget margin, or retry the un-dilated read once before the run is judged.

## Hardening round S2 (lane `build/M0-d-09-fix-s2`, flow-7, 2026-10-30; the session's fix round on queue row Q124, J601, J615, J637; J183, J263 Q1, Q6, J264, J290 / N-58; choices C-0449) — the builder's row-by-row outcome

One row: **Q124** (`docs/M0-FIX-QUEUE.md`). The address hand-on gives one old id to two fresh entities, undetected.
The declared red was `bench/test/determinism/pair.test.ts:86` on the design tree. The edits stay inside the item's
owns: `bench/src/determinism/rederive.ts` (`mintAddresses`, `duplicateIds`, `silentRebinds`, `matchPair`'s `minted`)
and `bench/test/determinism/pair.test.ts`. No index or barrel export was added, removed or renamed (J263 Q1):
`bench/src/determinism/index.ts` is unchanged. `@plat/model`'s `match` was read and not edited.

**The reproduction (first, as the brief asks).** The lane's mirror held the tree before this round. In it,
`corepack pnpm exec vitest run --maxWorkers=1 bench/test/determinism/pair.test.ts` gave 8 of 9 green and exit 1, with
the one red at `pair.test.ts:86:40`: `junction:6nymg6w713p26: expected true to be false`. A mirror-only probe of the
seed-1 site pair (test frame) gave:

| old address (S8) | successor (by point) | distance / radius | the fresh entity whose natural address it is | its final address |
|---|---|---|---|---|
| `junction:6nymg6w713p26` at (5574, 19624) | `junction:3ab8743sbjpay` at (5584, 19550) | 74.7 cm / 1 m | `junction:6nymg6w713p26`: the same lineage `[236050502, 1794805815]`, at (4132, 14862), outcome `fresh` | `junction:6nymg6w713p26~1` |
| `block:2skgtzs7hxr50` at (6570, 16693) | `block:cmps09px73p0z` at (6637, 16672) | 70.2 cm / 2 m | `block:2skgtzs7hxr50`: the same lineage `[1327423648, 751704830]`, at (2677, 18712), outcome `fresh` | `block:2skgtzs7hxr50~1` |

The pair's counters before the round read `duplicateIds` 0, `silentRebinds` 0 and `suffixed` 24.

**Which it was: neither the matcher nor the mint's output.**
* **The matcher.** Both successions follow §6.3's anchor rule as written: "the fresh entity … whose anchor lies
  nearest within the kind's hysteresis radius succeeds it". So **no defect of `match` (M0-d-05b) is reported**. The
  natural holder has the old entity's lineage because S8 keys it by the same creation index. §6.3 says "the entities
  the batch itself replaces are not collisions". Its anchor is about 50 m away, so the routine rightly leaves it `fresh`.
* **The mint.** Before the round, the mint already gave each natural holder `~1`, by §6.3's one collision rule ("A
  fresh entity whose natural address equals a live address, a tombstone, or an address its own batch retires takes the
  suffix `~k`"). So the final addresses held each address once. The counters' 0 was C-0274's count, after the mint.
* **The test.** The red came from the test's held-set clause, which read the routine's raw `addressOf`. The routine
  gives a natural holder its own id there, before the mint. The clause had been green at seed 1 only because no `~k`
  case arose there until c-02 S5 shifted S8's output (C-0274 had met the case at fusion seed 6 and site seed 4).

**The two readings of the row's "never to a successor when a fresh entity minted it":**
* **Taken.** The mint never lets one address go both to a successor and to a fresh entity that mints it, whichever
  sorts first.
* **Not taken.** The natural holder keeps the old id and the anchor's successor loses it. That contradicts §6.3's
  carry-over and its collision rule, and it would override `match`'s succession (a contract between items, rule (3)).
  If the session wants that reading, it is a ruling on §6.3, not this round's.

**The pin passes on this tree with the guard alone.** No change to the matcher was needed.

| row | outcome | what changed | pin (test title) | mutants killed |
|---|---|---|---|---|
| Q124 (the hand-on's uniqueness) | **fixed** (guard) | `mintAddresses` hands an address on only when the address's old entity has a `succeed` outcome naming that fresh entity, of its kind (`lawfulHandOn`). It reserves every such address before it mints a natural one. A hand-on that no outcome backs is refused: the entity is listed in the new `MintedAddresses.refused` and minted as fresh. So no address is held twice, for any hand-on. | `pair.test.ts` "the hand-on's uniqueness (hardening S2, Q124)" › "a planted succession that hands a held id is refused, minted fresh and counted: a survivor's, another successor's, a fresh entity's own", and "the final addresses are held once for any planted hand-on, and every refusal is counted (fast-check)" | B |
| Q124 (the counters count the case) | **fixed** | `duplicateIds` adds the refused hand-ons. `silentRebinds` gains an optional `minted` parameter (default: the mint) and checks the final addresses. It counts a successor not at its handed-on address, a fresh entity at an old address it was not handed, a refused hand-on of an address another entity holds, and a kept reference whose successor ends elsewhere. | the same tests, and "a succession handing a natural holder's address: the successor keeps it, the holder takes ~k, whichever sorts first (§6.3)": the routine's raw addresses as the mint's output count 1 duplicate and 1 silent re-bind, and a mint that loses the hand-on counts 1 silent re-bind | C, D, E, F, G |
| Q124 (pair.test.ts:86, the declared red) | **fixed** (the clause reads the final addresses, C-0274) | The held-set clause reads `r.minted.addressOf` and asserts `r.minted.refused` empty. Wherever a succession hands a fresh entity's natural address to another, the successor ends at that address and the natural holder at `<id>~k`. | `pair.test.ts` "every S1 and S4 entity survives identically; the S5 / S6 / S8 entities match per kind with 0 duplicate ids and 0 silent re-binds" (the seed-1 pair itself) | A |

**Mutant table** (J183: the faults Q124 names, re-introduced in the lane's one scratch mirror,
`/home/user/maps-scratch/waves/selfcheck-build-M0-d-09-fix-s2/plat`).
* **Isolation:** proven first. No link resolved into `/home/user/maps-architecture`, and `realpath` of
  `bench/node_modules/@plat/model` lay inside the mirror.
* **The run:** each mutant ran
  `corepack pnpm exec vitest run --maxWorkers=1 --bail=1 bench/test/determinism`. After each, `rederive.ts` was restored
  by copy and checked with `cmp -s`.
* **The result: 7 mutants, 7 killed.** The line numbers are those of the run, before G's pin added four lines.

| mutant | the fault (`rederive.ts`) | killed by | exit |
|---|---|---|---|
| A | Q124's fault: a natural holder keeps an address a succession hands to another (`taken` starts empty and no hand-on is reserved) | the seed-1 pair: `r.duplicateIds` 2 at `pair.test.ts:77` (the two successions above) | 1 |
| B | an unbacked hand-on kept as handed (`lawfulHandOn` returns `handedOn`) | the planted pin: `refused` `[]` for "a survivor's address" (:316) | 1 |
| C | `duplicateIds` blind to the refused hand-ons (`let n = 0`) | the counters' test from before the round, "count a duplicate address and every kind of silent re-bind" (:259, a survivor's address handed on) | 1 |
| D | `silentRebinds` on the routine's addresses only (the pre-round counter) | the natural-holder pin: the raw map counts 0, not 1 (:303) | 1 |
| E | `silentRebinds` blind to a refused hand-on of a held id | the planted pin: "a survivor's address" counts 0, not 1 (:322) | 1 |
| F | `silentRebinds` blind to a fresh entity ending at an old address not handed to it | the natural-holder pin (:303) | 1 |
| G | `silentRebinds` blind to a successor that does not end at its handed-on address after the mint | the first run SURVIVED (9 files, 60/60, exit 0), because no test passed a mint that loses a hand-on. A pin was added (the "lost" mint in the natural-holder test), and the re-run killed G at :307 | 1 |

One mutant was not run. Removing the canonical-order rebuild of the `addressOf` map is equivalent: no consumer reads the
map's order, and `toEqual` on a Map ignores it.

**Refusals (J264, N-58).** The item's registered family is the spike city its tests derive: the test frame (400 ha,
12 ha walled), seeds 1 – 4, both spikes, each as the old run and as the `{ S5: 1 }` re-derivation. That is 16 runs.
* **Refused 0 before** (the pristine mirror, probe `zz-census.test.ts`, mirror only) **and 0 after** (the same probe on
  the round's sources). The count did not rise, and no refusal was seen, so nothing has a verdict to class.
* The pairs' counters were equal before and after: `duplicateIds` 0 and `silentRebinds` 0 at all eight pairs;
  `suffixed` 24 (site 1), 81 (site 4) and 0 at the others; refused hand-ons 0.
* The site pair re-drew at seeds 1 and 4, and the other six pairs re-drew nothing (note 11's observation, unchanged).

**Behaviour and formats (no declared shift).** On the matcher's real output every hand-on is lawful, so the final
addresses and every count are unchanged. No digest, golden, stage root, report field, summary field or terminal line
moved, and no message text changed. The additions are:
* `MintedAddresses.refused` (a field of an exported type);
* `silentRebinds`'s optional fourth parameter;
* `minted` on `matchPair`'s result, beside `result` (not in `PairResult`, which the report reads).

**Q124's declared red lifts at this landing.** `pair.test.ts` is green on the tree: 12 tests (G's pin sits inside the
natural-holder test), and the folder `bench/test/determinism` gives 9 files, 60/60.

**Gates** (2026-10-30, W = 1 from `tools/test_budget.py`):
* install --frozen-lockfile 0; lint 0 (`lint: probe-red ok`; eslint 1257 files, 0 errors, 0 warnings); build 0;
* NEAR `bench/test/determinism`: 9 files, 60/60, exit 0;
* RELATED@1000 over `bench/src/determinism/rederive.ts` (PLAT_FUZZ_RUNS=1000): 13 files, 118/118, exit 0;
* `landed:verify -- flow-7 --item M0-d-09`: ok.

The brief's opening gate (the design branch at 5e32b503 or later) could not be confirmed without git. The local
`main` and `FETCH_HEAD` name 90a8d0fe, and the declared red reproduced exactly as Q124 describes it.

## Closing check of hardening round S2 (lane `check/M0-d-09-close-s2`, flow-7, 2026-10-30)

None of these fails the round (J162, N-45). Each is a fail-safe observation, a further hardening test, or a process
note. The verdict is `checks/M0-d-09-s2.md`, and the logs are in `/home/user/maps-scratch/waves/check-M0-d-09/`.

The round's opening gate is confirmed. The GitHub API's commit list names 5e32b50e74 as the parent of the tree's base
90a8d0fe.

14. **`lawfulHandOn`'s kind check has no pin (checker mutant K4 survives) (M4).**
    * Dropping `o.kind === f.kind` stays green on `pair.test.ts` and on the whole RELATED set.
    * The case is reachable only through a planted `MatchResult` whose `succeed` outcome names a fresh entity of
      another kind. `match` pairs within one kind, so its real output never does this.
    * Uniqueness holds under the mutant: one old id has one outcome, and that outcome names one fresh entity. So Q124's
      promise is untouched. Only the doc comment's extra clause ("or one of another kind") goes unpinned.
    * Suggested handling (M4): add a planted cross-kind `succeed` outcome to the planted pin, and expect it in
      `refused`.
15. **`silentRebinds`'s kept-reference check on the minted map is count-only (checker mutant K13 survives) (M4).**
    * Reading only the raw map in the kept-reference line leaves every test green.
    * A kept reference's `fresh` is its `succeed` outcome's, so the succession line already counts the same case. The
      counter stays non-zero and the gate (`=== 0`) is unchanged.
    * Suggested handling (M4): pin the exact count with a mint that loses a hand-on plus a kept reference, or drop
      the redundant clause.
16. **The author's CLEAN-ROOM row L-0702 discloses one non-recursive `ls` of the project root and one of `docs/`
    (top-level names only).** This is for the session.
    * The firewall says "never a recursive search, find, du or ls from the project root or from docs/". The seat read
      it as covering any `ls`, and disclosed the two listings.
    * Per the row, no listed file or folder outside the brief's was opened. So no forbidden material was read, and this
      checker does not count it as a breach of rule 1's reading list.
    * Suggested handling: the session rules whether a top-level name listing is within the firewall's wording, and
      re-states the rule in the next briefs if it is not.
