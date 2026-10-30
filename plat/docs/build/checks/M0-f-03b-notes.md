# M0-f-03b — the check's notes (not failing lines)

These notes come from the first check (F0) of item M0-f-03b, lane `check/M0-f-03b`, 2026-10-28. The verdict and its
evidence are in `checks/M0-f-03b.md`. Under J180 and N-45, none of these notes fails the item. Each row gives the
observation, how it was established, the suggested handling and where it belongs. Rows N-6 and N-8 are findings for the
session that concern other items. They are listed here so the f1 round and Q118 can see them.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **The test does not hold "calibratable kept" on a cell whose calibratable is false.** Mutant T06 forces `calibratable: true` on every rewritten cell in `text.ts:73` and survives 327/327. It is equivalent on every lawful table, because C-0309 (2) holds each counting cell calibratable at any version (`tables/test/workLimits/table.test.ts`). The loader itself, however, admits a counting perUnit or floor with calibratable false (probe `loader.mts`: `v3 counting perUnit calibratable false LOADED v 3`). So if that invariant ever weakened, the fit would flip the flag silently. (CONFIRMED by mutant and probe) | Add a `fittedText` case in which one counting cell is calibratable false and assert that it stays false. Alternatively, have the fit refuse such a table. | M4 |
| N-2 | **`--date` accepts impossible calendar dates.** `parseArgs` and `spikeProvenance` check only `\d{4}-\d{2}-\d{2}`. So `--date 2026-02-30`, `2026-13-01` and `0000-00-00` reach the fit. A dry run reports with them. `--write` is refused only at the loader's provenance check, with exit 1 "refused", not exit 64 "a bad argument". This fails safely while B-1's guard stands. (CONFIRMED, probe `i02.mts`) | Validate the date as a real calendar date at the argument (exit 64), with a test. This does not replace B-1's test of the loader guard. | M4 |
| N-3 | **The "before" census counts only `E_WORK_LIMIT` refusals, so a stage's `work_cut` that is not a refusal reads as 0.** For M0-e-06 the fit reads `stages[S].refused.E_WORK_LIMIT`. Two cuts are not refusals: S6's grower cut (`districts/stage.ts:445`, `workCut`) and S3's route cut (`siting/routes.ts:161`, F-ROUTE `work_cut`). The summary records neither, and the kernel's `workLimitHits` does not count them either (`route.nodes` and `grower.turns` are layout counters). So "before 0" means "no kernel refusal", not "no work cut". At version 2 the true value is 0: grower.turns' maximum is 1.85 per face against version 2's law, and the e-06 version-2 control matches the version-3 run apart from the relief-3000 S3 shift. (CONFIRMED by read and by the P4 runs) | When the hit-rate report is rebuilt for B-2, record `before` as null ("not recorded") for any stage whose summary keeps no work-cut count. Alternatively, M0-e-06's summary could gain a per-stage work-cut count (that item's change). | the fix round with B-2, or M4 |
| N-4 | **`summaries/M0-f-03b.json` gives `table.version` 3 while the shipped file is version 2.** The summary records the fit, which is the hand-over as version 3, not the table in force. C-0445 declares this, but a reader of the summary alone could take version 3 as shipped. (CONFIRMED by read) | At the f1 round, add `shipped: <version>` and `handedOver: <bool>` to the summary, or name the field `fitVersion`. | f1 round / M4 |
| N-5 | **J566's floor law alone does not clear C-0445's F-CUT lawful refusals.** The floor law lets a counter whose committed-batch sample is at least 1 000 take its measured p999 × 1.5. cut.candidates has 4 775 samples across its 3 blocks, but its largest block has 1 679 (M0-b-04 1 500, M0-c-06 1 679 and 1 596). Either way it is at or above 1 000, so the law would write 20.34 again. C-0445 lists the lawful F-CUT concave faces #748, #1361 and #2015, which need 205 candidates against the 142 that 20.34 allows. The law also leaves open whether "sample" means the counter's total or its largest block. (CONFIRMED by count; the 205/142 figures are C-0445's) | The session states the sample reading in C-0445 / Q118, and gives cut.candidates either the F-CUT families' blocks or a design-law floor before the f1 re-fit. | f1 round (Q118) |
| N-6 | **Finding for the session: at version 3, a `route.nodes` work cut in S3 is followed by an `E_INVARIANT` bug on lawful input.** The fixture is relief-3000 at seed 8 (CITY), default and coarse configs. S3's batches are 110 and 1139, committed, then the third batch is refused E_INVARIANT, recorded in the generation report's `bugs` (`{"cls":"E_INVARIANT","key":"S3@town:10bqcwtcw044g","stage":"S3"}`). At version 2, and at version 3 with only `route.nodes` restored to version 2, the batches are 110, 1147 and 6470, all committed. A work cut that leads to a bug is a fail-safety gap of S3's slice and enceinte under a lower limit. Its input class is OUR OWN INTERMEDIATE (the slice cut at the limit), so the verdict is MAKE-IT-SUCCEED. It is not reachable at the shipped version 2. (CONFIRMED, probes `s3seed8.mts`, `s3kernel.mts`) | Route it to the S3 owners' round through Q118, with the fixture and seed: the F-ROUTE `work_cut` rung must leave S3 committable. The f1 re-fit must not ship a `route.nodes` law under which this happens. | f1 / Q118 (S3's owners) |
| N-7 | **The M0-c-06 probe at version 3 is a sample without a version-2 control.** Seeds 1 – 8 × both runs at version 3: bars HOLD, `kernelWorkLimitHits 0`, `limitHits` 0 on every counter, no F-WORK ladder use, bugs 0. M0-c-06 also drives S3's slice and S4, which charge `route.nodes`. No version-2 control was run (about 83 min at one worker), so any output shift there is unmeasured. The 50-seed form at version 3 was not run (about 7 h). (CONFIRMED for the sample; PLAUSIBLE beyond it) | At the f1 round, run M0-c-06 at the candidate table against a version-2 control on the same tree, at least on the committed seeds. | f1 round |
| N-8 | **Finding for the session: the summaries carry each counter at one stage only.** M0-e-06's `bench/src/site/report.ts:98 – 101` fixes `route.nodes` at S4, `hydro.cells` at S1, and `grower.turns` and `field.cells` at S6. S3's slice also charges `route.nodes`, and S3 and S5 charge the kernel's insert counters and `tx.facesWalked`. The relief-3000 groups' S4 `route.nodes` block has n = 0. M0-c-06 records only S5 growth and S8 cut. So the f1 inputs cannot bound S3 or S5 even after B-2's fix. (CONFIRMED by read) | M0-e-06 and M0-c-06 add per-stage blocks for every counter their stages charge, under C-0091's shape, before the f1 re-fit. Route through Q118. | f1 round (M0-e-06, M0-c-06) |
| N-9 | **The worst row sits exactly at the target.** M0-k-04's corridorUnion bound is 10 of 10 000 = 1.000 per 1 000. tx.facesWalked's maximum, 25.5, equals its threshold, and `hitBound` counts a block whose max reaches the threshold, so that row is at the target exactly. It passes by `<=`, as the test says. One more batch at the maximum in a later summary would fail it. (CONFIRMED by read of the report) | Informative. The f1 re-fit could state the margin per row. | M4 |
| N-10 | **(close-r1) C-0446 and L-0695 say C-0444 (7) and (8) were "marked" as amended, but C-0444's row is byte-unchanged and names no C-0446.** `sed -n 449p docs/build/choices.md \| grep -o C-0446 \| wc -l` printed `0`; the landed record's appends keep C-0444's line hash. The amendment itself stands in C-0446 (append-only rows), so the reading is right, but a reader of C-0444 alone still sees "after … every stage row … exactly 0 … the target ≤ 1 met" with no forward pointer. | Correct the wording of C-0446 (4)'s parenthesis and L-0695 at the next permitted append, or add a superseding note row; no code change. | M4 |
| N-11 | **(close-r1) The listed test 'the hit rate at the coefficients is ≤ 1 per 1 000 batches on the spikes' runs' now asserts the report FAILS (29 unbounded rows).** That is right by C-0446 and J566 (the bar is PENDING-LONG-RUN until the per-stage blocks exist), but the test's title states the target as met. | Retitle or split the test when f1 re-fits (the title then true again), so a reader of the test list does not read a pass. | f1 / M4 |

## Hardening round S1

Builder `build/M0-f-03b-fix-s1`, 2026-10-30. This is a session fix round (J640), tests only, on one queue row: Q134 in `docs/M0-FIX-QUEUE.md`. The choices row is C-0450.

| row | outcome | evidence | pin and mutant |
|---|---|---|---|
| Q134 | FIXED: tests only, no shift | Before: `bench/test/worklimits/` had 14 of 68 tests red on the tree. Five were in `fit.test.ts`, with Q134's messages verbatim. Nine were in `entry.test.ts`, and they were the same class: they read the live summaries through `summaries()`, the default summaries folder, or the committed record treated as the fit of the live files. After: 73 of 73 green (`fit.test.ts`, `entry.test.ts`, `live.test.ts`). NEAR (worklimits plus `packages/tables/test`): 14 files, 344 of 344. RELATED@1000: 3 files, 73 of 73. | A fixture edit turns a pin red: M01, M02, M03 killed. A simulated landing of another item, made by editing the LIVE summaries, leaves the folder green (M04, 73 of 73). Pointing the pins back at the live files turns that same edit red (M05). The mutant table is below. |

**The frozen copies.** The fixtures are in `bench/test/worklimits/fixtures/summaries/`. Each is a byte-identical copy of `docs/build/summaries/<item>.json` at the round's base. Each hash equals the sha256 in its item's landed record. support.ts `FIXTURE_SHA256` pins them, and `fit.test.ts` checks them in 'the pins read the frozen copies'. A re-freeze is a declared change: the pins and FIXTURE_SHA256 move together.

- M0-c-06: `f3829f1011e7ca6c5dc6a4817d8ca3c74c37b0db3d0e7a2421a8ce695a4d5e53` (the 1 000-seed fold, J628)
- M0-e-06: `6ba690c92b4b14e95c6fb93caa76ad3d4571feacf76698737ecbfd0232273613` (e-06 S2, J593)
- M0-b-04: `05ae6332417e21f1460c671cca6bc63ccc078163bd47eba62a7a9cdb5dbc51a8` (the same bytes F0 read)
- M0-k-04: `67322e4e7d5ead1348308714dfdddf0eda0fd4cee78efbc0400dab557bd28165` (the same bytes F0 read)

The bytes F0 read for c-06 (`b2fd94b4…`) and e-06 (`2fe14f76…`) are named in `summaries/M0-f-03b.json`'s inputs. They exist nowhere under plat/, and this seat runs no git, so the copies are S1's base. That is what the brief asks for.

**Which tests moved to the fixtures.** support.ts `summaries()` and `SUMMARY_TEXTS` now read the frozen copies, so every pin in `fit.test.ts` reads fixtures.

- Re-pinned to the frozen inputs' values in `fit.test.ts`:
  - The first hit-rate test is retitled. Its numbers: M0-c-06's integrated S8 is the one row over the target, 34 of 33 569 = 1.0128 per 1 000. `after` is 52. Worst is 34 000 / 33 569. Narrowed to BLOCKS_ONLY it gives pass false, 0, 52.
  - e-06 S3 batches are 535, 536, 587, 590.
  - e-06 S5 batches are 1291, 1292, 1451, 1457.
  - Every group's S4 now has its route.nodes block.
  - 'the rows': the batches are 31780, 33569, 400 and 167, and the total is 121 321. fWork S3 is 2248 of 2248, and fWork S8 cuts 34.
  - The small-stage case: 1 of 167 at route.nodes' threshold 3.0768.
  - 'a stage's bound never exceeds its batches': n is 167, so all three bounds are 167, after is 167, and the rate is 1 000 per 1 000.
- The tests that need a PASSING narrowed report now read `passingSummaries()` / `passingDir()`. This is the frozen set with one edit: c-06's integrated S8 cut.candidates max lowered from 28.33 to 20, under its threshold 20.3359. These tests are the 'just under the threshold' case and the entry's hand-over mechanics: --write writes the fit's text, a second run writes nothing, a new date gives version 4, and the loader-guard control.
- In `entry.test.ts`, every run that pins content passes `summariesDir: FIXTURE_DIR` or the passing folder. The expected written texts and summaries are computed from the same inputs (`summaryFor`, `PASSING_TEXT`).
- The fit of the frozen set from version 2 is pinned by its sha256, `82663a6f9fcc7356c54c11ee2c949d9c477c4e523225033e01991e26504c74db`. It departs from F0's hand-over (`fixtures/workLimits.v3.json`) in exactly four rows: growth.proposals, growth.candidates, route.nodes and grower.turns. Both facts are asserted.

**Which tests stayed as invariants, and why.**

- `live.test.ts` is new. It is the only test file besides the file-open log that reads `docs/build/summaries/`. It asserts only what holds whatever the summaries hold:
  - The fit reads the summaries. A refusal there is a broken contract between items (C-0091's shapes), never a moved number.
  - Each measured coefficient is the largest p999 of its blocks × 1.5.
  - The counters are the table's rows.
  - On every row: the bound is a non-negative integer, 0 ≤ after ≤ batches, after = min(batches, Σ bounds), and perThousand follows its formula.
  - The totals add up, and the unbounded list is exactly the unbounded rows.
  - pass ⇔ (no row unbounded ∧ worst ≤ 1).
  - There is a row for every stage each summary shows ran.
  - The dry run's lines are printed with `console.info` and not asserted. The test asserts only exit 0 or 1, the four files read in order, and nothing written but the report.
- In `entry.test.ts`, 'a dry run reads exactly the four' keeps its live default-folder run for the file-open log alone (C-0091): the four live paths in order, only the report written, and an exit in {0, 1}. Its content lines moved to a run over the frozen copies.

**F0's records are kept byte-unchanged.** These are the shipped `workLimits.json` (v2 `8c5b12b4…`), `fixtures/workLimits.v3.json` (`1b00cfbd…`) and `summaries/M0-f-03b.json` (`fd55e1f9…`).

- The test that called `M0-f-03b.json` "the summary of that fit (live)" is now 'F0's record of its fit'. It checks five things: the field shape matches the entry's summary, the inputs F0 read are pinned by sha256, the record agrees with the v3 hand-over cell by cell, the skeleton and warp rows hold, and the verdict is failing.
- Regenerating either record is Q118's re-fit (f-03b S2), not this round.

**The dry run's exit-1 behaviour is unchanged (C-0446).** Run: `PLAT_BENCH_OUT=<scratch> corepack pnpm bench -- worklimits --date 2026-10-27`. Before and after the round it prints the same 63 lines and exits 1, and `worklimits-report.json` is byte-identical (`cmp`). The last lines, verbatim:

```
worklimits: 121321 batches; E_WORK_LIMIT before 0 (8 row(s) unrecorded), after ≤ 52 on the bounded rows; worst 1.013 per 1 000 (target ≤ 1); 29 row(s) unbounded; report …/worklimits-report.json
worklimits: the hit rate is UNBOUNDED at 29 stage row(s): … missing blocks: M0-c-06 runs/0 (fusion) S1: insert.points, …
worklimits: a stage is over 1 work cut per 1 000 batches at the fitted coefficients — §5.1 (5)'s fallback is M1's sweep
worklimits: the hit-rate report does not pass; nothing written
```

No file under `bench/src/worklimits/` changed. The three hashes equal the item's landed record.

**The mutant table.** All mutants ran in the mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-f-03b-fix-s1`, which has since been deleted. Each command was `vitest run --maxWorkers=1 --bail=1 bench/test/worklimits`, with a narrower target where the id carries a suffix. Each file was restored and checked with `cmp -s`.

| id | mutant | result |
|---|---|---|
| M01 | fixture c-06: integrated S8 cut.candidates `batches` 33569 → 33570 | KILLED (fit.test: the over-target test) |
| M02 | fixture e-06: groups/0 S3 committed 534 → 535 | KILLED (fit.test: the e-06 S3 batches) |
| M02e | the same, entry.test alone | survived. entry.test pins only groups/2 S3 ('587 batches'), and M02 is killed by fit.test |
| M03 | fixture b-04: the cut.candidates p999's last digit (13.557243478260682 → …683) | KILLED (the sha256 pin. The two decimals parse to the same double, so only the bytes moved) |
| M04 | LIVE c-06 (33569 → 40000 everywhere) and e-06 (groups/0 S3 committed 534 → 600): another item's landing | GREEN 73/73. This is the fix: no pin moves |
| M05 | M04's live edit plus support.ts reading the live folder again (the old defect) | KILLED (fit.test). This is the defect class, red again |
| M06 / M06b | LIVE e-06 `size` 'city' → 'test' (the fit refuses the committed file) | KILLED (entry.test's file-open log; live.test 'the fit reads them'). This is the contract between the items |
| M07 | fit.ts: the row's cut no longer min(batches, Σ bounds) | KILLED (fit.test 'a stage's bound never exceeds its batches') |
| M07b | the same, live.test alone | survived. This is equivalent on today's data: no live row has Σ bounds > batches. The constructed case in fit.test kills it |
| M08 / M08b | fit.ts: `missing.length === 0 &&` dropped from pass | survived. This is an EQUIVALENT mutant: an unbounded row's perThousand is null, so `rows.every(…)` is already false |
| M08c | fit.ts: the target loosened to < 2 per 1 000 | KILLED (fit.test: BLOCKS_ONLY pass expected false at 1.0128) |
| M09 / M09e | support.ts: passingSummaries without its edit | KILLED (fit.test; entry.test 'while a stage is unbounded …': the hand-over no longer passes) |
| M10 | index.ts: a failing report exits 0 | KILLED (entry.test: exit 1 on the frozen copies) |
| M12e | fixture e-06: a non-largest route.nodes p999's last digit, entry.test alone | survived. This is equivalent for the fit: it is not the largest block. The sha256 pin in fit.test kills every byte edit |

That is 15 runs. Of the 14 mutants aimed at a red, 10 were killed. The 4 survivors are all equivalent, or killed by another file of the folder. M04 is the expected green.

**The refusal census (J264, N-58).** It is the fit's refusals (FitError and TableError) of the committed summaries. Before: 0. After: 0. No source changed. The dry run's exit 1 is a verdict, not a refusal. There are no lawful-input refusals, and no REFUSE class was added or removed.

**Notes for the session.** None of these fail S1.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-12 | **(S1) On the summaries at S1's base, the narrowed report fails too (not only the unbounded rows).** M0-c-06's integrated S8 cut.candidates max is 28.33, at or over its threshold 20.3359, across 33 569 batches. hitBound counts ⌈33 569 / 1 000⌉ = 34, which is 1.0128 per 1 000. This follows from the law: any block whose max reaches its threshold gives a row of ⌈n / 1 000⌉ / n per batch, which is over 1 per 1 000 unless n is a multiple of 1 000. (CONFIRMED by the dry run and fit.test.) | For Q118's re-fit (f-03b S2). The law's margin per row, N-9 and N-11, belong there too. | f-03b S2 |
| N-13 | **(S1) F0's hand-over `fixtures/workLimits.v3.json` is no longer the fit of the committed summaries.** The fit of S1's base differs in four rows: growth.proposals, growth.candidates, route.nodes and grower.turns. That fit text has sha256 `82663a6f…`. `summaries/M0-f-03b.json` still names F0's inputs. (CONFIRMED: entry.test.) | The session's C-0445 ruling should apply a re-fit from S2, not the F0 bytes. S2 re-freezes the fixtures as a declared change. | f-03b S2 |
| N-14 | **(close-s1) `live.test.ts`'s pass invariant alone cannot catch a pass that ignores unbounded rows while the live worst is over the target.** The closing checker's mutant K16 made `pass` count an unbounded row (`perThousand` null) as passing. live.test's 'pass ⇔ (none unbounded ∧ worst ≤ 1)' stayed green on the live summaries, because their worst row (c-06's integrated S8, 1.013) already makes both sides false. entry.test's fixture runs kill K16 (2 tests), so the promise is held. K03 (c-06 S8 `perUnit.max` 28.33 → 40.5) is equivalent on the frozen inputs: `hitBound` reads `max` only as `max < t`. | No action now. If a hardening pass wants live.test to hold the pass formula on its own, add a constructed row (an unbounded row with every bounded row within the target) to its invariants. | M4 |
