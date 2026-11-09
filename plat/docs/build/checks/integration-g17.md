# Integration check of stage group 17: M0-x-06, M0-f-03b, M0-t-00, M0-c-07 (flow flow-7, 2026-11-09)

Lane `check/integration-flow-7-g17`, 2026-11-09 20:57 – 22:12.

**Verdict: PASS.** No blocker was found. Install, lint (with its probe-red check), build and landed:verify are green. Each item's own tests are green at full strength. The related set over the group's 34 changed sources is green at reduced strength, with no red at all. The composition probes ran each meeting point end to end on honest inputs, and every one matched what the design and the choices rows promise there. Notes N-1 – N-6 follow. They are not blockers.

The four items import none of each other. They meet through shared records and tables, and the probes ran each of these
meeting points end to end:

- M0-f-03b's work-limit table (`packages/tables/data/workLimits.json`, the shipped version 2 and the staged fit,
  version 3) under M0-x-06's F-WORK class cells and EP-01's S8 cells.
- M0-c-07's gate re-run (through M0-c-06's entry) into M0-f-03b's reader of M0-c-06's work blocks.
- M0-t-00's tier timing over the real tier manifest (M0-f-02a/b's lists, which carry M0-x-06's edge suite), and t-00's
  bar list over the real `timingBars`.
- The group's three bench entries (`worklimits`, `fusion-ng`, `bench:timing-phase`).

**The seat.** Opus 5.5 in Claude Code in a Claude Code cloud container. `python3 tools/machine_profile.py --id` printed
`linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib`, as the brief names, and `node --version` printed `v24.12.0`.
`tools/test_budget.py` gave 1 worker for every run. The seat is independent of the four items' authors and checkers. It
changed no file of any item and ran no git command. Its ledger row is **L-0738**. The probes and logs are in
`/home/user/maps-scratch/waves/integration-g17/`. Each probe ran from `plat/` with
`corepack pnpm exec tsx --conditions=plat-source`, imported the packages' and the bench's `src/` by absolute path, and
wrote nothing in `plat/` (P4 checked `reference-score.json` and `workLimits.json` by sha256 before and after). No timing
was taken or judged: this machine is not §12.1's reference, and every duration below is informative.

**Busy items.** The brief listed M0-a-06 (the kernel's `tx/`), M0-c-02 (layout `enceinte/`, S3's trace) and M0-c-04
(S5a / S5b). None of them owns a file of the group. M0-c-02 and M0-c-04 are on M0-x-06's `dependsOn` list and under every
x-06 chain fixture and c-07's gate re-run (through M0-c-06's runs), and M0-a-06's `tx/` is under every batch. Every probe
and test ran on the tree as it stood, and nothing in them differed or threw (N-6). landed:verify was `ok` for all four
items.

## The meeting points

| # | where | who writes / who reads | what the design or choices promise |
|---|---|---|---|
| A | the work-limit table → the stages → the edge suite | f-03b owns `workLimits.json` (handed over from f-03a). S8 (M0-b-03) reads its `cut.*` laws, and the other stages their rows (`registerBase`). x-06's F-WORK class cells lower `cut.kernelCalls` from the loaded table (`classes.ts` `lowWork()`), and every x-06 fixture runs its stage under the shipped table | §5.1 (5) (limit = floor + perUnit × count; coefficients from the spike × 1.5; a change that moves output is a declared shift); C-0021; C-0445 (the fit staged as `fixtures/workLimits.v3.json`, the shipped table held at version 2 until the session rules); x-06's F-WORK cell ("the coarser rung's output made degenerate") |
| B | the gate re-run's record → the work-limit fit | c-07's `gateRerun` re-runs M0-c-06's entry and records `reportShape(report)` and the tables loaded. f-03b's `fitWorkLimits` reads M0-c-06's summary (`runs[i].work`, the `timing` stamps) | M0-c-07's builds ("the gate re-run through M0-c-06's harness, reproducing its report shape"); C-0091; C-0446; c-07's N-03 (the re-run never writes M0-c-06's summary) |
| C | the tier manifest → the timing phase | M0-f-02a/b's `tier-jobs` lists carry x-06's edge suite (one unit per test file at `PLAT_EDGE_SEEDS=1000`, plus the hang attribution). t-00's `timeTiers` takes the real manifest and refuses a job that would run a tier or the timing phase. t-00's `resolveBars` reads M0-work.json's `timingBars` | C-0088, C-0097, C-0121 (the tier record; pending jobs listed, never timed; no nested tier); C-0100 (B-EDGE nightly at 1 000 seeds; x-06's C-0057 form for the count); M0-t-00's test "every bar of M0-work.json's timingBars list appears in the record exactly once" |
| D | the bench dispatcher | `scripts/bench.mjs` dispatches `worklimits`, `fusion-ng` and `timing-phase` | each entry refuses a bad argument with exit 64 (M0-s-01; C-0095); timing-phase refuses to start without `PLAT_TIMING_TOKEN` (C-0103) and writes no committed file |

## (1) Gates, run once (CONFIRMED, executed)

| gate | command | result |
|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 (`Already up to date`) |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 1277 files, 0 errors, 0 warnings`, `lint: probe-red ok` (each planted line of `tools/lint/fixtures/probe/zz-probe.ts` reported), `licences ok`, `kernel-boundary ok`, `bench-boundary ok`, `9 whole-tree checks` |
| build | `corepack pnpm build` | exit 0 |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item <id>` for M0-x-06, M0-f-03b, M0-t-00 and M0-c-07 (each record names flow-7) | `ok (1 record)` × 4 |
| near, full strength | `corepack pnpm exec vitest run --maxWorkers=1` (the budget's number) over `packages/testkit/test/edge`, `bench/test/worklimits`, `bench/test/timing-phase` and `bench/test/fusion-ng` (PLAT_FUZZ_RUNS and PLAT_EDGE_SEEDS unset: the PR size, 10 edge seeds) | exit 0: `Test Files 31 passed (31) · Tests 337 passed (337)`, 590 s (edge 18 files, worklimits 3, timing-phase 4, fusion-ng 6). The `FAIL` lines in the log are the fusion harness's own bar verdicts printed by c-07's gate tests on test-size runs, not test failures |
| related, reduced | `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1` over the 34 `.ts` sources that the four landed records list under `src/` (`related-sources.txt`: `packages/testkit/src/edge/` 15, `bench/src/worklimits/` 3, `bench/src/timing-phase/` 7, `bench/src/fusion-ng/` 9; N-5) | exit 0: `Test Files 140 passed (140) · Tests 2174 passed (2174)`, 3 654 s, fast-check seed 543646903. There was no red, so no J176 bench file was selected, and K6-6's scan timeout did not recur here. The `FAIL` lines in the log are the harnesses' own bar verdicts on planted inputs (fuzz-bar, cross-host), printed by their tests |

## (2) Composition probes (CONFIRMED, executed)

**P1: the work-limit table under the edge suite's S8 and F-WORK cells** (`probes/p1-worklimits-edge.mts`, meeting point
A; `p1.log`, exit 0). The probe used x-06's own fixtures and seed families (`edgeSeeds(id, 10)`, the PR size) and judged
every run with x-06's `judgeEdgeOutcome`.

- (a) **The counter set.** The shipped table (version 2), the staged fit `bench/test/worklimits/fixtures/workLimits.v3.json`
  (parsed through f-03a's `parseWorkLimitsText`), f-03a's `WORK_LIMIT_COUNTERS` and M0-work.json's `workLimitCounters`
  each list the same 17 counters. x-06's `lowWork()` differs from the shipped table in exactly two fields
  (`cut.kernelCalls` perUnit 64 → 0 and floor 4 096 → 0), and its `laws[]` and `law()` agree on every counter.
- (b) **The cells.** 50 runs per case (5 kinds × 10 seeds):

  | case | result |
  |---|---|
  | `class/F-WORK/<kind>` as x-06 runs it (the shipped table, lowered) | 50 / 50 `laddered` with `work_cut`, the stated outcome |
  | the same cells with the staged v3 lowered by x-06's rule | 50 / 50 `laddered` with `work_cut`, the stated outcome |
  | control (not judged): the same arena (scale 3) under the shipped table NOT lowered | 50 / 50 without `work_cut` |
  | `EP-01/S8/<kind>` under the shipped table | 50 / 50 stated (absorbed 27, laddered 23) |
  | `EP-01/S8/<kind>` with S8 under the staged v3 | 50 / 50 stated, the same counts kind by kind |

  So x-06's F-WORK cell is not vacuous against f-03b's table: the coarser rung is taken because the law is lowered, and
  it would still be taken after the hand-over. The S8 cells keep their outcomes under v3 (N-1 for the cells that do
  not).

**P2: c-07's gate re-run into f-03b's reader** (`probes/p2-gate-rerun.mts`, meeting point B; `p2.log`, exit 0). The
probe ran `gateRerun({ from: 1, seeds: 2, size: { frameHa: 900, walledHa: 30 } })` (c-07's test size), a real re-run of
M0-c-06's entry, into `p2-out/`.

- The re-run exited 0 with restarts 0, bugs 0 and S8 refusals 0 on both runs. Its census is empty. It recorded `cut`,
  `bands`, `granularity` and `interior`, each at version 1 (N-3).
- **The run shape.** Each `runs[]` entry of the re-run record has exactly the key set of the committed
  `docs/build/summaries/M0-c-06.json` runs (`seedRows` in place of `perSeed`, as `reportShape` writes it), and the same
  five work counters (`cut.candidates`, `cut.kernelCalls`, `cut.recursionDepth`, `growth.candidates`,
  `growth.proposals`) in C-0091's block form. Every block's `limitHits` is 0.
- **f-03b's fit over it.** With the committed summary, `fitWorkLimits` gives 17 counters, 36 hit-rate rows (11 of them
  c-06's), `pass false` with 29 unbounded rows, and the worst bounded row 1.0128 per 1 000 (c-06's integrated S8, 34
  of 33 569: C-0446 and C-0450's known state). With the re-run's `runs[]` put in the summary's place, the fit reads
  every block with no `FitError`, gives the same 36 rows and 29 unbounded rows, and its c-06 S8 rows bound at 0. With
  the re-run record standing whole as M0-c-06's summary, the fit refuses it: `FitError: M0-c-06/timing: not an object`.
  The re-run record carries no `timing` block, because c-07 never runs the entry with `--summary` (its N-03). That is
  detect-and-refuse, not a wrong result (N-2).

**P3: t-00's tiers over the real manifest, and its bars over the real `timingBars`** (`probes/p3-tiers-bars.mts`, meeting
point C; `p3.log`, exit 0). No unit was run.

- `manifestProblems` is empty for all three tiers (10 jobs each).
- No job of any tier has a unit that `nestedTierCall` flags, and no job's source is under `bench/src/timing-phase/` or
  `bench/src/tiers/`, so t-00's `timingPhaseInside` stays false. The nightly's `timing-phase (nightly contents)` job is
  `not-built`, waiting for M1, as t-00's builds require.
- The pending jobs are the deny-list scan (PR) and the parity report (nightly, milestone), each `after-M-1` with its file
  named, as C-0121 has them.
- **The edge suite's job** (`edge-suite (1 000 seeds)`, item M0-x-06, nightly and milestone) is `built`. It has 19
  units: one per test file of x-06's `packages/testkit/test/edge/` (the 18 files in the tree, the same list) and the
  post-hoc hang attribution. Each unit carries `PLAT_EDGE_SEEDS=1000`, which x-06's `edgeSeedCount` reads as 1 000.
- `resolveBars(readTimingBars())` matches the 13 rows of M0-work.json's `timingBars` one to one to t-00's 13 `BAR_IDS`
  (each once).

**P4: the bench entries** (meeting point D; `p4-cli.log`).

- `corepack pnpm bench -- worklimits --no-such-flag`, `bench -- fusion-ng --no-such-flag` and `bench -- fusion-ng
  --phase c` each exit 64 with the entry's usage line.
- `corepack pnpm bench:timing-phase` without `PLAT_TIMING_TOKEN` (and `PLAT_BENCH_OUT` in the scratch folder) exits 3:
  `REFUSE (no-token)`, naming C-0103 and the alternative. It wrote only `p4-out/timing-phase/refusal.json`.
- `bench/src/host/reference-score.json` and `packages/tables/data/workLimits.json` have the same sha256 before and
  after.

## Notes (not blockers)

- **N-1 (M0-f-03b → M0-x-06; for the session's ruling on C-0445).** The shipped `workLimits.json` is version 2 (f-03a's
  placeholders), as C-0445 and C-0450 hold it until the session rules on the hand-over. The staged v3 moves the output of
  other items' tests, x-06's among them: C-0445 lists `testkit/test/edge/repins.test.ts` EP-01/S1/self-touching seed
  2651453823 and EP-01/S5a/coincident seed 1658509524, which go refused-safe → laddered / absorbed at v3. P1 found no
  such move in x-06's S8 and F-WORK cells. Under §5.1 (5), a coefficient change that moves output is a declared shift, so
  applying v3 must move x-06's re-pins in the same round. Today the composition is consistent: the pins hold at the
  shipped version, and NEAR is green.
- **N-2 (M0-c-07 → M0-f-03b, informative).** c-07's re-run record composes with f-03b's reader at the run level (P2).
  But it is not an M0-c-06 summary: it lacks `timing`, and f-03b refuses it whole. A re-fit after an applied
  recalibration (§4.4's fallback, then §5.1 (5)'s "recomputed whenever the stage's code changes") therefore needs
  M0-c-06's own `--summary` run, not c-07's record. Nothing reads the record that way today.
- **N-3 (M0-c-07; a hardening KI under J202).** `GATE_TABLES` (`fusion-ng/gate.ts`) records `cut`, `bands`, `granularity`
  and `interior`, but not `workLimits`, whose `cut.kernelCalls`, `cut.recursionDepth` and `cut.candidates` laws S8 reads.
  If f-03b's v3 is applied, C-0445 reports F-CUT faces turning `work_cut` at `cut.candidates`. Two re-runs could then
  differ in their statistics while their `tables` records are equal. The re-run's result would not be wrong, only less
  fully attributed. Today every S8 block's `limitHits` is 0 (P2). Adding `workLimits` to the recorded ids is a one-word
  hardening in c-07's file.
- **N-4 (M0-t-00 / M0-x-06 via M0-f-02b, informative).** The nightly and milestone tiers each run x-06's edge suite at
  1 000 seeds in 18 file units, each with a 12 h deadline. The whole group NEAR at 10 seeds took 590 s on one worker
  here, so the edge suite at 1 000 seeds is on the order of 100 × that in CPU. t-00 records these tiers as projected
  and never gating at M0 (C-0027, C-0097). The real figure is M0-t-01's to measure.
- **N-5 (scope of RELATED).** The related set is the 34 `.ts` sources that the four landed records list under `src/`.
  It leaves out two files on purpose. x-06's one export line in `packages/testkit/src/index.ts` is an append under
  C-0064, recorded under `appends` and not as a changed file, as x-06's own S1 closing check treated it. f-03b's
  `packages/tables/data/workLimits.json` is data, not a `src/` file, and it is unchanged from f-03a's version 2 bytes
  (C-0450).
- **N-6 (busy items).** M0-c-02 and M0-c-04 (S3's trace and S5a / S5b) and M0-a-06 (the kernel's transactions) sit under
  x-06's chain fixtures and under c-07's gate re-run. Nothing differed and nothing threw. A later landing of theirs can
  move x-06's pinned seeds (x-06 depends on both), and the probes here describe the tree of 2026-11-09 20:57 – 22:12.

## Clean room

The seat read only `docs/ARCHITECTURE.md` (§5.1 (5), the lines on work-limit coefficients, by grep) and `plat/`: the
four items' entries in `docs/build/M0-work.json` (and its `timingBars` and `workLimitCounters`), their landed records,
`docs/build/checks/integration-g16.md` (format), the head of `checks/M0-x-06-s1.md`, the headings of the other items'
checks, `docs/build/choices.md` C-0021 and C-0444 – C-0446 and C-0450 (grep), and the group's sources and tests. It
also read the sources they import where the items meet: `packages/tables/data/workLimits.json`, `bench/src/tier-jobs/`,
`bench/src/tiers/{status,runner}.ts` (exports), `packages/layout/src/pipeline/base.ts` (grep), and
`docs/build/summaries/M0-c-06.json` (keys). No research, capture, reference or review path was opened, listed or
searched. Every search ran inside `plat/` or on a named design file.
