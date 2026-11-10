# M0-c-06 — the checker's notes for the hardening milestone M4 (check/M0-c-06, 2026-10-27)

MINOR findings of the item's FIRST check (J180: nothing here fails the item; each is a hardening row). The check's
verdict is `checks/M0-c-06.md`; the mutants named here are the checker's own (`/home/user/maps-scratch/waves/check-M0-c-06/mutants.json`,
runner `mut.py`, results `mut-results.json`; the scratch mirrors are deleted at the check's end).

| # | where | note |
|---|---|---|
| 1 | `bench/src/fusion/hausdorff.ts` `vertexWithin`; `bench/test/fusion/hausdorff.test.ts` "a near-tie no double decides" | Mutant H2 (the cross product squared in doubles instead of BigInt) SURVIVES: the test's near-tie `(2 883 896, 2 916 961)` against the edge `(0, 0) → (3 355 167, 3 393 757)` has c² − q · l² = 297 521 at c² ≈ 1.23e17 (ulp 16), and the double distance reads 73.539105243490 against √5 408 = 73.539105243401 (8.9e-11 cm apart, 10⁴ ulps) — every double form decides it. Within the lattice's range (coordinates < 2²³ cm) a flip needs c² > 2⁵³ with a gap under half an ulp, i.e. an edge longer than ≈ 13 km (l² > 1.7e12) — none in a 5 km frame, so the BigInt is defence in depth beyond the harness's inputs. Hardening: reword the comment (it overstates) and, if the fixture is to pin the BigInt, use an edge ≥ 13 km with a gap below 64. CONFIRMED (node: the three edges' c², q · l², gaps and ulps printed). |
| 2 | `hausdorff.ts` `directedWithin` (`EVALS`), `drift.ts` `directed` / `sliver` (`DRIFT_EVALS`) | Mutants H4 (budget → pass) and D2 (an undecided cell no longer refutes) SURVIVE: no test reaches the evaluation budget (an interval stays open only where its bound exceeds r while its floor does not, so the count is logarithmic per crossing of the bound; 200 000 / 400 000 evaluations need thousands of crossings — a saw-tooth ring, contrived, N-45). Hardening: make the budgets injectable and pin "an exhausted budget refutes" on a saw-tooth fixture. |
| 3 | `measure.ts` `s8s9`: `s9Refused += 1`, `kerbReads += 1` | Mutants M3 and M4 (the counter zeroed) SURVIVE the derivation tests: seeds 1 – 2 and the river seeds meet no refusal, so the census's attribution has no positive control. The bar's promise holds under both (CONFIRMED by reading): a refused union leaves no L2 record, every block of the district is compared with its L1 face and reads `beyond`; a missing working ring compares as Infinity and reads `beyond` — the run fails either way; what a zeroed counter would lose is the census row (J264). The C-0438 smoke (s9Refused 7 / 11, kerbReads 0 / 1, verdict red) is the executed receipt that the counters count. Hardening: a test that wraps `d.model.kernel.tx` to refuse level-2 specs (and one that plants a seed off every face) and asserts the two counters and `beyond` together. |
| 4 | `measure.ts` `corpusCounts` | Mutant M14 (the downgrades pass-through zeroed) SURVIVES: seeds 1 – 2 at the test size have 0 real downgrades, so N-52 (5)'s clause test cannot tell a zeroed sensor from a clean corpus; the fold's bar is pinned with planted records (report.test.ts) and the smoke's 3 / 3 downgrades at seeds 28, 38, 47 are the executed receipt of the pass-through. Hardening: plant a sharp-cornered face in `ins.districtFaces` before `measure()` and assert `corpus.*.downgrades ≥ 1` and the census's `corpusRoof` with it. |
| 5 | `report.ts` `foldRun` (`h.beyond += x.beyond`) | Mutant R10 (the beyond count folded as a maximum) SURVIVES: the sums test of C-0439 (3) covers `driftBeyond`, `drifted` and `driftSeedless` but not `beyond` (nor `commit`, `zero`, `within1cm`, `s9Refused`, `kerbReads`); the verdict is unchanged (`beyond === 0` either way), the summary's count would be wrong on a multi-seed red. Hardening: extend the sums test to every summed field. |
| 6 | `measure.ts` `stopRegion` (the `enters` rule) | Mutant D6 (every lane whose box overlaps the stop kerb's box read as a spine) SURVIVES: the synthetic bounding lane of drift.test.ts lies outside the stop kerb's box, so the box pre-filter alone skips it; a lane whose box overlaps but whose centreline never enters is not pinned. The verdicts are unchanged under the mutant (a bounding lane's band lies outside both kerbs; only the `spines` list and the split-path `drifted` classification move). Hardening: a bounding lane whose box overlaps the stop kerb (a diagonal lane past a corner) asserted no spine. |
| 7 | `bench/test/fusion/derive.test.ts` "each walled coarse face its own district" | Mutant U2 (the stand-in owner filter `isS1LandOwner` removed) is KILLED by the whole NEAR set — hausdorff.test.ts's listed test (fusion seed 1's exact share 0.866 < the 0.95 ratchet; 2 tests) and drift.test.ts's river test (driftBeyond 11) — but NOT by derive.test.ts (12 / 12 green under it), whose title claims the stand-in reading: at the test size the mutant makes 18 stand-ins of the 7 (the 10 inner wall-strip faces and the plaza re-owned and cut as districts; `stripFaces` still finds the 4 outer strips, so the strip clause stays green; CONFIRMED by a mirror probe, seeds 1 – 2). Hardening: derive.test.ts pins the stand-in set against an independent read before the stand-in step (every live L1 face inside the outer wall with no owner or an S1 land owner, and no other; 7 at the test size, no `wall_strip:*` or `plaza:*` face among them). |
| 8 | `bench/test/fusion/hausdorff.test.ts` the ratchet test | `S8S9_EXACT_FLOOR` is pinned at 0.95 by value and the derivation test asserts `zero / compared ≥ 0.95` on seeds 1 – 2 only; the smoke's per-seed minimum at CITY (≥ 0.97) is reported, not asserted. Hardening: a per-seed floor on the smoke's report (the summary's `perSeed` rows are in the full report only). |
| 9 | `bench/src/fusion/index.ts` `parseArgs` | `--workers` above the machine's cores is accepted (1 – 64); the pool then oversubscribes the host. Informative only (C-0270 (14): the report does not depend on W — CONFIRMED here by the worker-count probe, sha256-equal reports at W = 1 and W = 2). Hardening: cap by `os.availableParallelism()` with a note. |

## Hardening round S1 (lane `build/M0-c-06-fix-s1`, 2026-11-09; the session's hardening round S1, J722 (vetoable): the rows the second re-triage found still open — Q118-c06, c-06:3 (row 3 above), c-06:5 (row 5 above); J237 (2), J238, J264 / N-58, J290, J263 Q1 / Q6, N-45; choices C-0467). The builder's row-by-row outcome

The round stayed inside the item's owns (`bench/src/fusion/`, `bench/test/fusion/`, `docs/build/summaries/M0-c-06.json`)
and read the stages the harness derives through without editing them. Rows 1, 2, 4, 6, 7 and 8 above are the M1 carry of
ruling (a) and are not this round's; row 9 asks nothing.

Sources changed (against the item's landed record):

* `runs.ts` (`147600f3…` → `dc9d4115…`): `BatchSeen`, `WATCHED_STAGES` (S1, S3, S4, S5, S6 — the stages that charge the
  kernel's counters in M0-f-03b's STAGE_CHARGES), `watchedKernel` (M0-e-06 S3's watched façade, C-0453 (2): the batch's
  callback, or each declared op's `apply` / `prepare`, passed through to see the overlay; the ops, their order, the
  charges and the result the stage's own), `Instruments.batches` and `Instruments.s6Faces`, `DeriveOptions.watch` and
  `instrument`'s optional fifth parameter `watch` — both **off by default**.
* `pool.ts` (`da02c839…` → `616e2fd4…`): `runTask` — the harness's task, the records the summary is folded from —
  derives with `watch: true`.
* `measure.ts` (`1ed08e56…` → `ed767114…`): `StageRow`, `stageRows(d)` and `SeedRecord.stageRows`.
* `report.ts` (`9cdcc615…` → `219f107a…`): `StageWorkBlock`, `STAGE_WORK`, `stageWorkOf` and `RunSummary.stageWork`
  (the summary carries it through `summaryOf`'s spread of the run, after `work`).

Unchanged: `index.ts` (`37243f07…`; no folder-index or barrel export added, removed or renamed — the new names are
exported from their modules only, as M0-e-06 S3 did), `timing.ts` (`698490ff…`, byte-identical), `drift.ts`,
`hausdorff.ts`, `ramp.ts`, `worker.ts`. No message text changed. Tests: `stagework.test.ts` (new, 5 tests),
`hausdorff.test.ts` (+1), `report.test.ts` (+1), `support.ts` (`goodRecord` carries `stageRows: []`).

**No declared shift.** No derivation moved: the watched façade's root and every stage root equal an unwatched
derivation's (`stagework.test.ts`, fusion seed 1 at the test size; the probe in the mirror showed the same for the
integrated run). `derive`'s default is unwatched, so every caller outside the harness's tasks derives exactly as before:
the timing phase (`timing.ts`, byte-identical; M0-t-00's `timing-phase/gate-stages.ts` and `workloads.ts`) and the
profiler (`profile/driver.ts`) never see the watcher, and the timing bar's stamps carry none of its cost. The record and
the report gain fields only; every existing field is computed as before.

### Row-by-row outcome

| row | outcome | what changed | the pin (test) | mutants (red on it) |
|---|---|---|---|---|
| Q118-c06 (the per-stage work blocks; queue row Q118, f-03b's N-8) | **FIXED in the harness. The committed summary's blocks REPORTED (ruling (b)). The reader's read REPORTED (M0-f-03b's file)** | Each run's summary gains `stageWork[stage][counter]` in M0-e-06 S3's form `{ stage, unit, units, unitsTotal, perUnit, charged }`: for every stage of STAGE_WORK the run invoked, every counter it gives the stage with a sample. STAGE_WORK equals f-03b's STAGE_CHARGES on S1, S3, S4, S5, S6 and S8 (the five kernel counters at S1 – S6; hydro.cells at S1; route.nodes at S3, S4, S5; growth.* at S5; grower.turns and field.cells at S6; cut.* at S8). A kernel counter's sample is one batch the watched stage committed or refused (a declared batch with no op, ok with no record, is none — S5 has three at seed 1), its units the batch's limit read back through the five kernel laws (M0-e-06's `kernelUnits`, imported); route.nodes one per derivation per stage over the lattice's nodes; hydro.cells (S1's river report) over the hydrology grid; grower.turns over the live L1 faces as S6 began; field.cells over pass 1's grid; growth.* and cut.* the existing `work` rows. | `stagework.test.ts` "STAGE_WORK is M0-f-03b's STAGE_CHARGES …", "every charged counter at each charging stage has a block of n > 0 in the summary, with the table's unit (the reader's UNBOUNDED rule, C-0446)" (the summary of the harness's own `fusion()` run: for each run and each stage of C06_RUN_STAGES, every STAGE_CHARGES counter has a block of n > 0 and the table's unit), "a kernel block's n is the stage's batches committed or refused …" (n, charged, unitsTotal and the largest work per unit against the watched batches), "the watched façade leaves the derivation unchanged …" (roots, the default unwatched, the harness's records equal the hand-watched ones), and the fold on hand records. | Q118a (`stageWork` folded as `{}`), Q118b (the kernel rows dropped from `stageRows`), Q118c (no stage watched), Q118d (a no-op batch counted), Q118e (a refused batch left out), Q118f (S4's route.nodes row dropped), Q118g (a block's unit not the table's), Q118h (S1's hydro.cells out of STAGE_WORK), Q118i (S6's faces not read), Q118j (the watcher changes a declared batch: `workLimit` 1), Q118k (`runTask` unwatched) |
| c-06:3 (row 3: `s9Refused` / `kerbReads` without a positive control) | **PINNED** (no source change, as the re-triage read it) | — | `hausdorff.test.ts` "the census's positive control (hardening round S1, notes row 3) …": fusion seed 1 at the test size measured twice. (a) The model's façade refuses every level-2 batch: `s9Refused` = the census's `s9` = the stand-in districts (7), `kerbReads` 0, every compared block beyond the bound and compared with its own L1 face (`s9OwnL1` = compared, `zero` 0), the misses name the planted refusal, the fold's `s8s9` verdict false with the counts folded. (b) Every block seed moved onto a vertex of the L1 face that held it (off every face): `kerbReads` = the census's `kerbReads` = compared, every block beyond, no S9 refusal, the fold's verdict false. | M3 (`s9Refused += 1` zeroed), M4 (`kerbReads += 1` zeroed) — the first check's survivors |
| c-06:5 (row 5: `foldRun`'s `beyond` and the other sums) | **PINNED** (no source change) | — | `report.test.ts` "every summed count of the fold is a sum over the seeds, never the largest …": three seeds whose every summed count differs — all thirteen summed S8 ≡ S9 counts (`blocks`, `compared`, `zero`, `within1cm`, `beyond`, `split`, `s9OwnL1`, `drifted`, `driftBeyond`, `driftSeedless`, `commit`, `s9Refused`, `kerbReads`), `seedsBeyond` and `seedsAllZero`, the refusal census's nine totals and its seed count, the corpus's four counts per use, restarts and bugs (entries and seeds), the strip counts, `s8Refused`, the ladder per key and its uses, the pooled junction nodes, the turn steps, and the roads' stages and mismatches. | R10 (`beyond` folded as a maximum — the first check's survivor), R10b – R10f (`commit`, `kerbReads`, `zero`, `within1cm`, `s9Refused` folded as a maximum) |

### The committed summary (ruling (b)) — REPORTED

`docs/build/summaries/M0-c-06.json` is **unchanged**: sha256 `f3829f1011e7ca6c5dc6a4817d8ca3c74c37b0db3d0e7a2421a8ce695a4d5e53`
before and after the round. The per-stage blocks need, per derivation, each kernel batch's charged work by counter at
each stage and the stage-scope counts (route.nodes at S3 and S5, hydro.cells, grower.turns, field.cells). The 1 000-seed
long run (`session/fusion-1000-1`, tree 4abd334a, seven runners) recorded none of them: its records kept only `work`'s
S5 growth.* and S8 cut.* rows, and its per-seed records are not on this machine. The blocks therefore cannot be added
without re-taking the long run (2 000 CITY derivations; the long run's contended S8 p50 alone was 204 s a seed). The two
other ways would break ruling (b). Re-keying the long run's own `work` blocks gives only growth.* and cut.*, and gives
them without `charged`, so it does not reach the form. Blocks from a smaller re-run put under `runs[i]` would be a second
population under the long run's key, which is a silent re-draw. **The next long run writes them**: the session's re-take
after M0-a-09 S18 (J637 (1)), with `corepack pnpm bench -- fusion --summary` — runTask watches, so its summary carries
`runs[i].stageWork` beside every key it has today. The 1 000-seed bar stays PENDING-LONG-RUN (C-0272's pattern), as the
ruling says.

**REPORTED (M0-f-03b's file).** `bench/src/worklimits/fit.ts` `c06Groups` reads `runs[i].work` with one stage per counter.
Its one-loop change is the same as M0-e-06 S3's: read `runs[i].stageWork[stage]` as the stage's blocks where a run has
it, and `work` otherwise. A kernel block carries no hit count. The census's `kernelWorkLimitHits` per run is the
`before` that stands beside it. Until both land, the committed dry run's 9 M0-c-06 rows stay unbounded, as they are
today.

**The blocks at the test size** (the harness's own run, seed 1, both runs; n per block): S1 kernel × 5 n 2 and hydro.cells
n 1; S3 kernel n 3, route.nodes n 1; S4 kernel n 1, route.nodes n 1; S5 kernel n 5 (4 committed + 1 refused; 3 no-op
batches left out), growth.* n 3, route.nodes n 1; S6 (integrated) kernel n 1, grower.turns n 1 (27 faces), field.cells n
1; S8 cut.* n 7 (fusion) / 11 (integrated). Every (stage, counter) the reader charges has a block; none is missing.

### The refusal census (J264 / N-58) and the refusal verdicts (J290)

Before and after, on the item's registered families at the test size (seeds 1 – 2, both runs: `hausdorff.test.ts`'s census
test): 0 of every kind → 0 (`s8`, `s9`, `kerbReads`, `corpusRoof`, `corpusSpine`, `kernelDowngrades`,
`kernelWorkLimitHits`, `unplaced`, `degraded`), with restarts 0 and bugs none. Not risen. The long run's census in the
committed summary is unchanged and was not re-measured: fusion `s8` 1, `s9` 11, corpus 82 / 82; integrated `s9` 8,
corpus 99 / 99, and the 8 S6 `E_INVARIANT` seeds (Q133, M0-e-04's). No derivation changed, so nothing could move it.
The refusals the new pin meets are the test's own plants. Each is UNLAWFUL by construction (a façade that refuses every
level-2 batch, and seeds moved off every face). Verdict REFUSE-visible, as designed: each is counted in the census, its
blocks read beyond, and the run's verdict is false. No user reaches either through §11.4's doors. No lawful-input refusal
was met.

### Gates and self-check (J183)

All at W = 1 (`tools/test_budget.py`): `install --frozen-lockfile` 0; `lint` 0 (`eslint 1278 files, 0 errors, 0 warnings`; `lint: probe-red ok`; `lint: bench-boundary ok`; 9 whole-tree checks); `build` 0; NEAR `corepack pnpm exec vitest run --maxWorkers=1 bench/test/fusion` (the path filter also takes `bench/test/fusion-ng`): 16 files, 133 / 133, exit 0 (689 s); RELATED@1000 `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1` over `bench/src/fusion/{runs,measure,report,pool}.ts`: 23 files, 230 / 230, exit 0 (698 s).

Self-check: 19 targeted mutants in the lane mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-c-06-fix-s1` (isolation proven: no symbolic link into the tree, the `@plat/*` realpaths inside the mirror). Each mutant was applied to the mirror only and run as `corepack pnpm exec vitest run --maxWorkers=1 --bail=1 bench/test/fusion -t <its row's pin>`, then its file was restored from the tree and checked with `cmp`. Result: 19 KILLED, 0 survivors, 0 equivalent — Q118a – Q118k 11 / 11, M3 and M4 2 / 2, R10 and R10b – R10f 6 / 6. Every pin passes without its mutant (the NEAR run on the same bytes). The mirror was removed at the end.

## Closing check of hardening round S1 (lane `check/M0-c-06-close-s1`, 2026-11-09; verdict `checks/M0-c-06-s1.md`)

Non-blocking observations of the closing check (the blocker — Q118-c06's four survivors — is the verdict's failing line, not a row here).

| # | where | note |
|---|---|---|
| S1-c1 | `bench/src/fusion/measure.ts` `stageRows` (S5's kernel samples); `packages/layout/src/growth/boundary.ts` :504–515 | Each derivation's S5 kernel block counts S5a's gate-plan batch, which is always rejected by design (`E_INVARIANT`, "a batch always rejected (the arena untouched)"), as a refused sample with its real charges (fusion seed 1 at the test size: insert.points 3). That fits the round's stated population ("committed or refused"), and the census rightly does not count it. M0-f-03b's reader should know that one refused S5 sample per derivation is this designed rejection, not a work-limit hit. Suggested handling: a one-line comment in `stageRows` or in the reader's fit; informative; M4. |

## Hardening round S1, fix round 2 (lane `build/M0-c-06-fix-s2`, 2026-11-09; after the closing check's FAIL in `checks/M0-c-06-s1.md`, failing line Q118-c06; choices C-0468)

The closing check found the content of Q118's per-stage blocks unpinned. Four non-equivalent mutants survived
`stagework.test.ts`: C-Q5 (`countsOf` returns `{}` always), C-Q6 (a declared-op batch passes through the façade
unwrapped), C-Q8 (`s6Faces` + 7) and C-Q17 (hydro.cells' units `cols`). The old content assertions took their expected
values from the same `d.ins.batches` and `d.ins.s6Faces` that the mutants corrupt. This round is **tests only**, inside
`bench/test/fusion/`, as the verdict asks. `bench/src/fusion/*` is byte-identical to the landed record of round S1
(`runs.ts` `dc9d4115…`, `measure.ts` `ed767114…`, `report.ts` `219f107a…`, `pool.ts` `616e2fd4…`, `index.ts`
`37243f07…`). `summaries/M0-c-06.json` is unchanged (sha256 `f3829f10…`). No derivation, record or message text moved.
There is no declared shift.

### Row-by-row outcome

| row | outcome | the pin (`bench/test/fusion/stagework.test.ts`) | mutants (red on it) |
|---|---|---|---|
| Q118-c06 (C-Q5, C-Q6: the kernel reads) | **PINNED** | (1) **New describe**, "the watched façade against the overlay's own charged work (a hand-built arena …)". `watchedKernel` runs on a fresh 1 km² arena built with `createKernel`. It gets a callback batch (the L0 outer ring) and a declared-op batch of two `insertChain` ops at L1 (S3's enceinte form). Each op's own `apply` and the callback capture the overlay. Each `BatchSeen.counts` must equal that overlay's own `work.counts`, must not be empty, and must be > 0 on `insert.points` and `tx.facesWalked`. (2) **On the fixture** (seed 1, both runs, the test size): every kernel stage (S1, S3, S4, S5, and S6 for the integrated run) has a block charged > 0, with a largest work per unit > 0, on `insert.points` and on `tx.facesWalked`. Every committed batch of S3 and S4 has non-zero `insert.points` and `tx.facesWalked`. S4's only batch and S3's enceinte batch are declared-op batches. | C-Q5, C-Q6, C-Q5b (`countsOf` drops `tx.facesWalked`), C-Q6b (the callback batch unwatched): each KILLED by (1). C-Q5, C-Q6 and C-Q5b were also run against (2) alone, and each is KILLED there too (see below). |
| Q118-c06 (C-Q17: hydro.cells' units) | **PINNED** | On the fixture, the terrain is read from `d.model.data.get('terrain')`. Its `hydro.rows` must be > 1, so a factor of rows shows. S1's `hydro.cells` block must have `unitsTotal` = `units.max` = `hydro.cols × hydro.rows`. | C-Q17 (cols only), C-Q17b (rows only): KILLED |
| Q118-c06 (C-Q8: grower.turns' units) | **PINNED** | The integrated derivation gets a reader planted through `derive`'s `plant` hook, inside the instrumented S6 and before S6 runs. It counts the arena's live L1 face slots straight from the Plat (`isFaceLive` over `slots.face[1]`), never through the façade or its view. `d.ins.s6Faces` and S6's `grower.turns` `units.max` must equal that count, and the count must be > 0. The plant only reads, so the harness's records still equal the hand-watched ones, which the existing test checks. | C-Q8 (+7), C-Q8b (read at L0): KILLED |

### Self-check (J183) — the round's mutant table

The mutants ran in the lane mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-c-06-fix-s2/plat`, a `cp -a` copy.
Isolation was proven first: no symbolic link leads into the tree, and the realpaths of `bench/node_modules/@plat/{kernel,layout}`
lie inside the mirror. Each mutant was applied to the mirror only. Then
`corepack pnpm exec vitest run --maxWorkers=1 --bail=1 bench/test/fusion -t '<the pins>'` ran, and the file was copied
back from the tree and checked with `cmp`. Every file restored. The unmutated baseline is green: 2 / 2 pins, the rest
skipped.

| mutant | file | change | result |
|---|---|---|---|
| C-Q5 | runs.ts | `countsOf` returns `{}` always | KILLED (the hand-built pin; also the fixture pin alone) |
| C-Q6 | runs.ts | `kernel.tx(spec)`: a declared-op batch unwrapped | KILLED (the hand-built pin; also the fixture pin alone) |
| C-Q8 | runs.ts | `s6Faces` + 7 | KILLED (the fixture pin) |
| C-Q17 | measure.ts | hydro.cells units `cols` | KILLED (the fixture pin) |
| C-Q5b | runs.ts | `countsOf` drops `tx.facesWalked` | KILLED (the hand-built pin; also the fixture pin alone) |
| C-Q6b | runs.ts | the callback batch's overlay not seen | KILLED (the hand-built pin) |
| C-Q8b | runs.ts | `s6Faces` read at L0 | KILLED (the fixture pin) |
| C-Q17b | measure.ts | hydro.cells units `rows` | KILLED (the fixture pin) |

Result: 8 / 8 KILLED, with 0 survivors and 0 equivalent. The table and its runner are in the scratchpad:
`mutants.py` and `mut.py` under `/tmp/claude-0/-home-user-maps-architecture/d191c51d-d506-500b-87ea-d839127d561d/scratchpad/fix2/`.
The mirror was removed at the end.

### The refusal census (J264 / N-58)

There is no source change, so no derivation moved. The census of the registered families at the test size is 0 → 0 on
every kind. `hausdorff.test.ts`'s census test is green in NEAR, and the closing check's probe found the same for flat
seeds 1 – 3 and river seed 1. The new pins meet no refusal: the hand-built arena's two batches commit. Not risen.

### Gates

All ran at W = 1 (`tools/test_budget.py`):

* `install --frozen-lockfile`: exit 0.
* `lint`: exit 0. "eslint 1278 files, 0 errors, 0 warnings"; "lint: probe-red ok"; "lint: bench-boundary ok"; 9 whole-tree checks.
* `build`: exit 0.
* NEAR, the item's 10 test files under `bench/test/fusion/` (derive, drift, entry, hausdorff, measure, ramp, report,
  restart, stagework, timing): 10 files, 98 / 98, exit 0 (629 s).
* RELATED@1000, `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1` over
  `bench/src/fusion/{runs,measure,report,pool}.ts`: 23 files, 231 / 231, exit 0 (699 s). This round changed no source,
  so the set is round S1's.
