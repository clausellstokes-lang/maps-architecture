# Integration check of stage group 16: M0-d-09, M0-c-06, M0-e-06, M0-x-05 (flow flow-7, 2026-11-02)

Lane `check/integration-flow-7-g16`, 2026-11-02 03:51 – 06:29.

**Verdict: PASS.** No blocker was found. Install, lint (with its probe-red check), build and landed:verify are
green. Each item's own tests are green at full strength. The related set over the group's 39 changed sources is green
at reduced strength except for one foreign timeout (N-9). The composition probes ran each meeting point end to end on
honest inputs, and every one matched what the design and the choices rows promise there. Notes N-1 – N-9 follow. They
are not blockers.

The probes ran these meeting points end to end:

- M0-d-09's fusion spike against M0-c-06's two runs on the same seeds and frames, at the test frame and at CITY.
- M0-d-09's site spike against M0-e-06's derivation of the same blueprint, at the test frame and at CITY.
- M0-d-09's distinctness census and §6.2 CI oracle over M0-e-06's two relief fixtures, in both configurations.
- M0-x-05's ladder readers and stage-rung registry over every M0-c-06 and M0-e-06 run.
- The four bench entries, and M0-f-03b's reader over the two spike summaries.

**The seat.** Opus 5.5 in Claude Code in a Claude Code cloud container. `python3 tools/machine_profile.py --id` printed
`linux:Intel(R) Xeon(R) Processor @ 2.80GHz:4cpu:16gib`, and `node --version` printed `v24.12.0`. The seat is
independent of the four items' authors and checkers. It changed no file of any item and ran no git command. Its ledger
row is **L-0733**. The probes and logs are in `/home/user/maps-scratch/waves/integration-g16/`. Each probe was run from
`plat/` with `corepack pnpm exec tsx --conditions=plat-source`. The probes import the packages' and the bench's `src/`
by absolute path and write nothing in `plat/`. No timing was taken or judged: this machine is not §12.1's reference, and
every stamp a harness printed is CONTENDED.

**Busy items.** The brief listed M0-a-06 (kernel `tx/`), M0-c-02 (layout `enceinte/`) and M0-c-04 (S5a / S5b). None of
them owns a file of the group. M0-c-02 and M0-c-04 are on the derivation path of every probe (S3's trace, S5a and S5b),
and M0-a-06's `tx/` is under every batch. Every probe ran on the tree as it stood, and nothing in them differed (N-8).
landed:verify was `ok` for all four items at the start.

## The meeting points

| # | where | who writes / who reads | what the design or choices promise |
|---|---|---|---|
| A | the spike city's fusion half ← the fusion gate harness | d-09's `spikeRun('fusion')` derives `FLAT_BLUEPRINT` through M0-x-04's base table (exactly `runBase`). c-06's `derive('integrated')` is the base's six stages with every stage wrapped (stamps, invocation counts), and `derive('fusion')` replaces S6 + S8 with its stand-in S8 | C-0015 (the spike city is the fusion spike's and the site spike's CITY outputs); C-0268 (1) (`fusion` = `FLAT_BLUEPRINT` through the base); C-0270 (1) (the two runs share S1 – S5; the instrumentation is bench-side and never in the model) |
| B | the spike city's site half ← the site spike harness | d-09's `spikeRun('site')` derives `RIVER_BLUEPRINT`. e-06's `deriveSpike` derives the base table minus S8, each stage wrapped (`timed`), the TerrainStrategy wrapped (`capturingTerrain`), on its fixtures `relief-60` and `relief-3000` (RIVER_BLUEPRINT's river on S0's rolling and hill-acropolis reliefs), with the coarse configuration as R12-5's switch | C-0015; C-0268 (1); §16 M0 (d) ("every stream key distinct"; the digests); §6.1 *Distinctness*; §6.2's CI oracle after every batch; C-0271 (2) (the switch off is byte-identical to the base's S6) |
| C | the stages' ladder records ← the ladder-coverage readers | S1's river report, S3's gate rungs and trace, S4's / S5b's router rungs, S5c's / S5d's records, S6's and the fields' `workCut`, and S8's infill report are written by the stages that c-06 and e-06 run. x-05's `readRun` / `readModel` count them under `STAGE_LADDERS`' leaf keys. c-06's `measure()` folds its own ladder tally from the same records | §13.1 *Ladder coverage*; §5.2; §5.4 (`stages[].ladderUses`); C-0085; C-0270 (3) ("every ladder use counted") |
| D | the bench dispatcher | `scripts/bench.mjs` dispatches `determinism`, `fusion`, `site` and `ladder-coverage` to the four items' entries | each entry dispatches and refuses a bad argument with exit 64 (M0-s-01; C-0095) |
| E | the work-per-unit blocks | c-06's `runs[i].work` and e-06's `groups[].work` blocks are read by M0-f-03b's fit (`SUMMARY_IDS`) | C-0091; C-0446 |

## (1) Gates, run once (CONFIRMED, executed)

| gate | command | result |
|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 1276 files, 0 errors, 0 warnings`, `lint: probe-red ok`, `vendor-scan ok`, `repository-path ok`, `kernel-boundary ok`, `bench-boundary ok`, `9 whole-tree checks` |
| build | `corepack pnpm build` | exit 0 |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item <id>` for M0-d-09, M0-c-06, M0-e-06 and M0-x-05 (each record names flow-7) | `ok (1 record)` × 4 |
| near, full strength | `corepack pnpm exec vitest run --maxWorkers=1` (the budget's number) over `bench/test/determinism`, `bench/test/fusion`, `bench/test/site`, `packages/testkit/test/ladders` and `bench/test/ladder-coverage` (PLAT_FUZZ_RUNS unset) | exit 0: `Test Files 41 passed (41) · Tests 365 passed (365)`, 4 364 s. The `FAIL` lines in the log are the harnesses' own bar verdicts printed by their entry tests on test-size runs, not test failures. The bench `ladder-coverage/entry.test.ts` summary-path case, the brief's known mirror-path red, is green in the tree |
| related, reduced | `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1` over the 39 sources the four landed records list under `bench/src/` and `packages/testkit/src/` (`related-sources.txt`) | exit 1: `Test Files 1 failed / 121 passed (122) · Tests 1 failed / 2001 passed (2002)`, 4 660 s. The one red is foreign, and it is not a file of the group: `bench/test/scan/scan.test.ts` › 'on this tree with a deny-list present … never 2 (K6-6)' — `Test timed out in 5000ms` (M0-k-06's whole-tree scan, which no group item changed). Replayed alone (`vitest run --maxWorkers=1 bench/test/scan/scan.test.ts`), it passes 9 / 9 (`scan-replay.log`). This is the same foreign K6-6 timeout that the M0-x-06 S1 closing check recorded (N-9). There is no red in a test of the group's items, and none of the J176 bench files was selected |

## (2) Composition probes (CONFIRMED, executed)

**P1: d-09's fusion spike against c-06's runs** (`probes/p1-fusion-spike.mts`, meeting point A). For each seed the
probe derives `spikeRun('fusion', seed, { size })`, `derive('integrated', seed, size)` and `derive('fusion', seed, size)`,
then runs c-06's `measure()` on the integrated derivation.

| run | log | result |
|---|---|---|
| test frame (d-09's `sizes/test.json`: 400 ha, 12 ha walled), seeds 1, 3, 4 | `p1-test.log` | 3/3 equal. d-09's stage roots (S1, S3, S4, S5, S6, S8) equal c-06's integrated run's, stage for stage. The final roots are equal, the generation reports' H128 digests are equal, and c-06's `SeedRecord.root` is d-09's root. c-06's fusion run equals d-09 through S5 (C-0270 (1)). There are no bugs on either side, and restarts are 0 |
| CITY (no size input), seed 1 | `p1-city.log` | the same, all equal (695 s for the five derivations; root `be9e88bf…`). c-06's tally holds 2 052 ladder records at CITY (N-2) |

So c-06's instrumentation (wrapped stages, stamps, the S6 hook that reads district faces) does not change a byte of the
model or the report. The 1 000-seed fusion gate and the spike city's fusion half are the same derivation, as C-0015
needs.

**P2: d-09's site spike against e-06's derivation, and d-09's checks over e-06's fixtures**
(`probes/p2-site-spike.mts`, meeting point B)

| run | log | result |
|---|---|---|
| (a) e-06's `deriveSpike({ blueprint: RIVER_BLUEPRINT }, seed, 'default', size)` against `spikeRun('site', seed, { size })`, e-06's test size (900 ha, 30 ha walled), seeds 1, 3 | `p2-test.log` | S1, S3, S4, S5 and S6 roots are equal on both seeds. e-06's wrappers (`timed`, `capturingTerrain`, the watched kernel) change nothing. d-09 runs S8 beyond, which e-06 drops by design (`SPIKE_STAGES`). No bugs |
| (a) the same at CITY, seed 1 | `p2-city.log` | S1 – S6 roots equal (455 s) |
| (b) e-06's `relief-60` and `relief-3000`, `default` and `coarse`, test size, seeds 1, 3: each derivation inside d-09's `withKeyCensus`, derived twice, and (default) the base table with d-09's façade watch (`registerBase({ onBatch })`) running `ModelDigest.oracle()` after every committed batch | `p2-test.log` | 8/8 clean. Streams and lineage hashes have 0 collisions in every run (for example, relief-3000 default seed 3: 66 streams and 359 lineages distinct). Twice-derived roots are equal. The oracle has 0 misses over 7 – 22 committed batches, and the end oracle holds. The plain base run equals e-06's default spike on S1 – S6. Three runs refuse at S5 with e-06's known classes, deterministically, with the oracle clean (N-6) |
| (b) at CITY, `relief-3000` `default`, seed 1 | `p2b-city.log` | clean: streams 106 / 0 collisions, lineages 656 / 0 collisions, twice-equal, oracle 43 batches / 0 misses, end oracle ok, the base run equal on S1 – S6, no bugs |

**P3: x-05's readers and registry over c-06's and e-06's runs** (`probes/p3-ladders.mts`, meeting point C). The runs
were c-06 fusion and integrated (400 ha / 12 ha) and e-06's two fixtures × two configurations (test size), seeds 1 and 3:
12 derivations (`p3-test.log`). The probe ran x-05's `readRun` on each one and listed every rung record raw, beside c-06's
own `measure().ladder`.

- **Every leaf x-05 read is a built row of `STAGE_LADDERS`.** There were 0 unknown leaves and 0 leaves of a deferred row.
  The rungs the honest runs reached were these:
  - S8 F-CUT `pre`, `a@attempt>=1`, `b` and `d`;
  - S1 F-RIVER `carve`, `retrace` and `inlet`;
  - S3/S5a trace F-WALL `reoffset` and `union_simplify`;
  - S4/S5b F-ROUTE `unserved`.

  No report carries a ladder class outside the table. The only class the GenerationReports carry is `S1 F-RIVER`.
- c-06's tally and x-05's leaves count the same records under different rules. They agree where the rules agree, and
  N-2 and N-3 record where they differ. The coarse configuration's S1 record is the exception, in N-4.

**P4: the bench entries** (meeting point D; `cli-*.log`). `corepack pnpm bench -- <h> --no-such-flag` was run for `h` in
`determinism`, `fusion`, `site` and `ladder-coverage`. Each exits 64 with its own usage line.

**P5: M0-f-03b's reader over the two spike summaries** (meeting point E; `p5-worklimits.log`). `corepack pnpm bench --
worklimits --date 2026-11-02` (a dry run that writes nothing in `plat/`) parses c-06's `runs[].work` and e-06's
`groups[].work` with no `FitError`. It folds every block, and both summaries' stages fit the stage table (`C06_RUN_STAGES`,
e-06's `stages` rows). It exits 1 on its own verdict, with 29 UNBOUNDED rows (N-5).

## Notes (not blockers)

- **N-1 (M0-d-09; for M1's re-run, informative).** d-09's site spike is `RIVER_BLUEPRINT`: the river on plain relief
  (C-0268 (1)). e-06's two fixtures are that river on the 60 m rolling and the 3 000 m hill-acropolis reliefs. C-0015
  calls the spike city "the site-and-fields spike's CITY outputs". On `RIVER_BLUEPRINT` the two harnesses derive the
  same model, byte for byte (P2 (a)). d-09's census and CI oracle also hold on e-06's relief fixtures in both
  configurations (P2 (b), CITY included). The machinery of the digest bars therefore holds on the composition. But the
  five-engine cross-host bar and the 100-seed digest run cover only plain relief. That is a documented reading (J156,
  C-0268), and M1 re-runs every such bar on B-CITY (C-0015). If the owner wants relief in the M0 digest bar, d-09's
  `SPIKES` would take e-06's fixtures (a choices row; vetoable).
- **N-2 (M0-c-06; hardening KI under J202).** c-06's ladder tally (`bench/src/fusion/measure.ts` 681 – 689) has two
  problems:
  - It counts every S8 rung record as a ladder use, including the rungs a cut `refused` or left at `none`, and it
    counts rung (a) at attempt 0 (the plain cut).
  - It files S8's deep-interior split under `S8/F-CUT/deep`. The deep-interior rule is §4.6's, and it is not a §5.2
    F-CUT rung. x-05's table rightly has no such row.

  So `FusionGateReport.ladderUses` (2 052 records at CITY seed 1) is a count of rung records, not §5.4's ladder uses.
  No bar reads it: the restart count is the asserted clause, and it is 0 in every probe. The report should say what it
  counts, or count only the rungs that took (x-05's rule).
- **N-3 (M0-x-05, informative).** x-05 counts rung (c) by `W_CUT_SLID` slide steps (`LEAF_UNITS`). A (c) cut at the
  midpoint (slide 0) leaves no code, so x-05 does not count it. P3 shows such cuts on c-06's runs: `s8 c cut` once or
  twice per seed, with no `W_CUT_SLID`. This is consistent with §5.2 ("`W_CUT_SLID` with its step count"). The rung is
  covered by x-05's fixture that forces a slide (30 steps).
- **N-4 (M0-e-06, informative).** In e-06's `coarse` configuration the S1 record's `river` is absent from the model
  (`model.data.get('s1').river`). The coarse RiverStrategy forwards its report to the GenerationReport and to the
  harness's capture only. A reader of the S1 record, such as x-05's `readRiver`, therefore sees 0 F-RIVER rungs on a
  coarse run, while `report.stages` S1 `ladderUses` carry them (relief-3000 seed 1: 153 in the report, 0 read from the
  record). No item of the group reads the other's record here: x-05 runs its own fixtures, and e-06 reads its capture.
  It is a trap for a later reader of R12-5's coarse runs, which should read the report.
- **N-5 (M0-c-06 / M0-e-06 → M0-f-03b, known).** The hit-rate report is UNBOUNDED at 29 stage rows. The stages charge
  the kernel's five counters (and S6's `grower.turns`, S1's `hydro.cells` and S5's growth counters on some rows), and
  the summaries carry no block for them. This is the state M0-f-03b's fix round 1 (C-0446) and M0-e-06's S3 check
  recorded. The two summaries' formats compose with the reader, and no group contract is broken here.
- **N-6 (M0-e-06 / M0-d-09, informative).** The refusals the probes met are the items' known rare classes. Each was
  deterministic, reported in `bugs`, and oracle-clean:
  - e-06 test size: relief-60 seed 3 `S5:E_SELF_INTERSECT`; relief-3000 seed 1 `S5:E_INVARIANT`;
  - d-09 test frame: seed 2's site, C-0264 (13), which the probes did not meet.

  Every CITY run in the probes committed.
- **N-7 (M0-d-09, PENDING-MAC).** The browser legs and the arm64 / Rosetta legs cannot run here. The composed checks
  above are in-process on Node x64. The cross-host run of the spike city is d-09's own bar and a Mac step.
- **N-8 (busy items).** M0-c-02 and M0-c-04 (S3's trace and S5a / S5b) and M0-a-06 (the kernel's transactions) sit under
  every probe derivation. Nothing differed and nothing threw. A later landing of theirs can move these items' fixtures,
  and the probes here describe the tree of 2026-11-02 03:51 – 06:29.
- **N-9 (M0-k-06, foreign, informative).** In RELATED@1000, `bench/test/scan/scan.test.ts`'s K6-6 case (the real scan
  of `plat/` under a synthetic deny-list) timed out at its 5 s default, after 77 minutes of a one-worker run. Alone it
  passes 9 / 9. The scan's time grows with the tree. No group item changed a file on its path (the group's sources are
  the four harness folders and `testkit/src/ladders/`), so it is not the group's gate. The case wants an explicit
  timeout in M0-k-06's hardening pass; M0-x-06's S1 closing check met the same timeout.
