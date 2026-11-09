# Integration check of stage group 18: M0-f-02b (flow flow-7, 2026-11-09)

Lane `check/integration-flow-7-g18`, 2026-11-09 20:48 – 21:01.

**Verdict: PASS.** No blocker was found. Install, lint (with its probe-red check), build and landed:verify are
green. The item's own tests are green at full strength. The related set over the item's two changed sources is green
at reduced strength. The composition probes ran each meeting point end to end on honest inputs. Every one matched
what the design and the choices rows promise there. Notes N-1 – N-3 follow. They are not blockers.

The group has one item, M0-f-02b. Its meeting points are with the items it depends on:

- the harnesses its jobs call (M0-k-04, M0-c-06, M0-e-06, M0-b-04, M0-d-06, M0-d-09, M0-x-05, M0-k-05);
- the edge suite's runner (M0-x-06);
- the runner, the status derivation and the dispatcher it plugs into (M0-f-02a, M0-s-01).

**The seat.** Opus 5.5 in Claude Code, in a Claude Code cloud container. `python3 tools/machine_profile.py --id`
printed `linux:Intel(R) Xeon(R) Processor @ 2.30GHz:4cpu:16gib`, and `node --version` printed `v24.12.0`. The seat is
independent of the item's author and checkers. It changed no file of any item and ran no git command. Its ledger row
is **L-0737**. The probes and logs are in `/home/user/maps-scratch/waves/integration-g18/` (`probes/`, `logs/`). Each
probe was run from `plat/` with `corepack pnpm exec tsx --conditions=plat-source`. Every harness or tier-command output
went to a scratch `PLAT_BENCH_OUT` (`out-p3/`, `out-p4/`). The fixture tree of P2 was built under the scratch folder
and removed afterwards. No timing was taken or judged: this machine is not §12.1's reference, and every duration below
is CONTENDED and informative only.

**Busy items.** The brief lists M0-a-06 (kernel `tx/`), M0-c-02 (layout `enceinte/`) and M0-c-04 (S5a / S5b). None of
them owns a file of the group. They lie under the edge suite's fixtures and the ladder-coverage run (P3), which ran on
the tree as it stood. Nothing in those runs failed.

## The meeting points

| # | where | who writes / who reads | what the design or choices promise |
|---|---|---|---|
| A | every unit's command line ← the harness it calls | f-02b's `prJobs` / `nightlyJobs` / `milestoneJobs` write `corepack pnpm bench -- <name> <args>` or the tier command's `harness <name> <args>`. `scripts/bench.mjs` (`HARNESSES`, M0-s-01) and each harness's parser read them: fusion `parseArgs`, site `parseSiteArgs`, bentcut `parseArgs`, `parseCrossHostArgs`, `parseDeterminismArgs`, testkit `parityArgs`, fuzz-bar's known-flag set and `FUZZ_PRIMITIVES` | §13.8's sizes: B-FUZZ 10⁴ / 10⁶ per primitive, the constructive set at 10 / 100 draws per M0 case (C-0227 (13)); the spike stand-ins at 50 seeds (C-0015); fusion's 1 000 and the site spike's 200; F-CUT on 10⁵ faces; cross-host on five legs with workers off and on; determinism's 100 spike-city seeds. Each job's `source` and `item` are its harness's folder and item (C-0099) |
| B | the job lists ← the status derivation, the shape check and the fallback | f-02a's `deriveStatus`, `suiteProblem`, `manifestProblems`, `nestedTierCall` and `applyFallback` read f-02b's `Job`s. `corepack pnpm tier:<t> -- --list` is the real entry | every M0 job `built`; the deny-list scan and the parity report `after-M-1` naming their files; the nightly's last job `timing-phase (nightly contents)`, `not-built: M1`; no unit calls a tier or the timing phase (C-0088); a built job's suite missing or empty fails naming it (§13.8 *Edges*); the fallback never cuts the constructive set (§13.8) |
| C | the parity job ← C-0068 / C-0121 | f-02b declares `inputs: [baselines.json]`, `reviewedBy: [M0-b-05a, M0-c-07a]`, and the suite / `--ours` `docs/build/summaries/M0-c-07a.json`. f-02a's `reviewPending` reads the reviewers' `reviewed` entries. testkit's parity CLI reads a summary holding `parityOurs` | absent → `after-M-1: baselines.json`; present without both reviews of the current sha256 → pending with its review reason; both → built, our side then judged as a suite |
| D | the redirected harnesses ← `ctx.summary` | f-02b's `harness` subcommand (`runRedirected`) hands each harness `{ out, summary: $PLAT_BENCH_OUT/summaries/<item>.json }`. cross-host, determinism and ladder-coverage write `ctx.summary ?? SUMMARY_PATH`. `same-summary` compares the fresh summary with the committed one | a tier job writes nothing tracked into plat/ (C-0411 (4), C-0460); M0-x-05's summary is reproduced byte for byte by a second process (the x-05 notes' row 5) |
| E | the edge-suite job ← testkit's edge runner | f-02b's `edgeUnits` sets `PLAT_EDGE_SEEDS=1000` and runs `vitest run --project testkit packages/testkit/test/edge/<file>` under `edge`, which sets `PLAT_EDGE_LOG`. x-06's `support.ts` `runFixture` appends one JSON line per returned run. f-02b's `edge-hangs` reads those logs and replays each missing built fixture through `edge-replay` over `edgeSeeds(id, n)` | B-EDGE's nightly form at M0 (C-0100); its status derived from the folder (C-0099); the post-hoc hang attribution (x-06 notes row 10; C-0461 (3), C-0462) |

## (1) Gates, run once (CONFIRMED, executed)

| gate | command | result |
|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 ("Already up to date") |
| lint | `corepack pnpm lint` | exit 0. Output: `lint: eslint 1277 files, 0 errors, 0 warnings`, `kernel-boundary ok`, `bench-boundary ok`, `9 whole-tree checks`. Probe-red caught every planted line of `tools/lint/fixtures/probe/zz-probe.ts` (`:6 Math.pow` … `:14 localeCompare`) |
| build | `corepack pnpm build` | exit 0 |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item M0-f-02b` (the record names flow-7) | `ok (1 record)`. The item's 8 files match the record (`cli.ts ce8ff6bc…`, `index.ts ed22bf84…`, the summary `303b185d…`) |
| near, full strength | `corepack pnpm exec vitest run --maxWorkers=1 bench/test/tier-jobs/` (the budget's number; PLAT_FUZZ_RUNS unset) | exit 0: `Test Files 4 passed (4) · Tests 59 passed (59)` |
| related, reduced | `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1 bench/src/tier-jobs/index.ts bench/src/tier-jobs/cli.ts` (the group's changed sources: the item's landed record lists these two under `src/`) | exit 0: `Test Files 12 passed (12) · Tests 164 passed (164)`. The item checker's B5 reds (M0-f-02a's five transitional pins) are gone: the session's seam `session/f02a-seam-1` (L-0728) is in the tree. None of the J176 bench files was selected |

## (2) Composition probes (CONFIRMED, executed)

**P1: every unit's command line against the harness it calls** (`probes/p1-argv.mts`, meeting point A; `logs/p1.log`).
For each unit of the three real manifests that calls a harness, the probe resolved the name in `HARNESSES`. It
checked that the job's `source` and `item` are the harness's folder and item. It then ran the harness's own exported
parser over `[...entry.args, ...rest]`. Result: **0 mismatches**, exit 0.

| tier / job | parsed by the harness |
|---|---|
| pr B-FUZZ | `--primitive <p> --runs 10000 --constructive-seeds 10 --no-summary` for each of the 24 `FUZZ_PRIMITIVES`, then `--runs 1 --constructive-seeds 10 --no-summary` |
| nightly / milestone B-FUZZ | `--runs 1000000 --constructive-seeds 100` (`CONSTRUCTIVE_SEEDS_NIGHTLY = 100`; C-0227 (13)) |
| fusion (pr, nightly, milestone) | `from / seeds` blocks covering seeds 1 – 50 and 1 – 1 000, each exactly once, runs `fusion,integrated`, `summary false` |
| site (pr, nightly, milestone) | `first / seeds` covering 1 – 50 and 1 – 200 exactly once, size `city`, `summary false` |
| bent cut, nightly | phases `residue,signature,t34` at districts 1 000, signature 100, t34 10 000, `summary false` |
| F-CUT, milestone | phase `fcut` at `fcut 100000` |
| cross-host | fixture `kernel` → `bench/src/crosshost/fixtures/kernel.json`, legs `node-arm64, node-x64-rosetta, chromium, firefox, webkit`, workers `off, on` |
| determinism | 100 seeds (1 – 100), the five legs, workers off and on, size `city`, `isBarRun` true |
| parity | `parityArgs` → `ours docs/build/summaries/M0-c-07a.json` |

**P2: the lists through f-02a's derivation and checks** (`probes/p2-status.mts`, meeting points B and C; `logs/p2.log`,
`logs/p2-list-*.log`). Result: **0 mismatches**, exit 0.

* The real entries `corepack pnpm tier:pr | tier:nightly | tier:milestone -- --list` each exit 0, and the statuses
  are as the design promises:
  * every M0 job is `built`;
  * the PR deny-list scan is `after-M-1: denylist.json`;
  * the nightly and milestone parity report is `after-M-1: baselines.json`;
  * the nightly's last job is `timing-phase (nightly contents) — not-built: M1`;
  * the milestone has no timing-phase entry and ends with `F-CUT (10⁵ faces) — built`.
* `manifestProblems` is empty for all three tiers, and no built job has a load error.
* There are 62, 169 and 170 built units, and 0 of them is a nested tier or timing-phase call (C-0088).
* Every declared suite of a built job is present and non-empty: `flat.ts`, `site/fixtures.ts`, `bentcut/faces.ts`,
  `crosshost/fixtures/kernel.json` and `summaries/M0-x-05.json`.
* PR fallback: B-FUZZ goes to `--runs 5000` while the constructive set keeps `--constructive-seeds 10` (never cut).
  The fusion stand-in's blocks go to `1–10, 11–20, 21–25`.
* The parity job, on a scratch fixture tree (its index planted, the probe set to "exports run"):

  | state of the fixture tree | derived status |
  |---|---|
  | baselines absent | `after-M-1: baselines.json` |
  | present, no review | `(review pending: M0-b-05a, M0-c-07a)` |
  | M0-b-05a's review only | `(review pending: M0-c-07a)` |
  | M0-c-07a reviewed another sha256 | `(review pending: M0-c-07a)` |
  | both reviews | `built` |

  With both reviews, the our-side suite `docs/build/summaries/M0-c-07a.json` is present and the unit reads it as
  `--ours`. The milestone's copy derives the same.

**P3: the redirected harnesses and the edge-suite job, end to end** (`probes/p3-e2e.mts`, meeting points D and E;
`logs/p3-crosshost.log`, `logs/p3.log`). Each command was the manifest's own unit argv, run from `plat/` with
`PLAT_BENCH_OUT=out-p3/`.

* **Cross-host** (`tier-jobs/cli.ts harness crosshost run kernel`): exit 3 in 4 s, verdict `incomplete`. The Mac legs
  (Rosetta, firefox, webkit) are blocked as Mac steps. The summary was written to `out-p3/summaries/M0-d-06.json`,
  not into plat/.
* **Ladder coverage**: the whole run (`harness ladder-coverage`) exited 0 in 185 s: `ladders 40; kernel rows 16
  covered true; stage rows 73 (45 deferred); table problems 0; control bugs 0; covered true`. Then `same-summary
  M0-x-05` exited 0: `reproduced byte for byte in a second process (sha256 a5ddf0e1…)`.
* **Edge suite**: the job's 18 file units plus the post-hoc unit were run with the manifest's argv and env.
  `PLAT_EDGE_SEEDS` was overridden to 1 (the job states 1 000; the full sweep is ≈ 6 h, PLAUSIBLE, per the item's
  check).
  * Every file unit exited 0, and the 18 units took 4 – 33 s each.
  * `PLAT_EDGE_LOG` reached x-06's runner. There were 11 log files, all 72 built `EDGE_FIXTURES` were present, and
    71 fixtures had exactly one line at one seed. The env reached `SEEDS`: the twelfth fixture is run by a test at a
    count of its own.
  * The post-hoc unit exited 0: `every built fixture (72) returned in the logs (11 file(s)): no unattributed hang`.
* The committed summaries M0-d-06, M0-d-09, M0-x-05, M0-x-06 and M0-f-02b had the same sha256 before and after
  (`f6a58038…`, `2bfe3ea4…`, `a5ddf0e1…`, `4d963029…`, `303b185d…`).

**P4: the hang attribution's real replay child** (meeting point E; `logs/p4.log`). P3's logs were copied to
`out-p4/`, with fixture `cell/cliff×frame` removed. `edge-hangs` was then run with `PLAT_EDGE_SEEDS=2`:

* At `--hang-ms 120000` it exited 1: `1 built fixture(s) never returned in the logs: cell/cliff×frame` and
  `replayed on 2 seed(s): 2 returned, 0 threw; no hang — its unit's own failure`.
* At `--hang-ms 1` it exited 1: `cell/cliff×frame at seed 2637198874: no return in 6 ms (a hang, over 1 ms)`.
  Seed 2637198874 is the seed the suite's own run logged for that fixture, so the replay draws `edgeSeeds(id, n)`,
  the suite's family.

## Failing lines

None.

## Notes (not blockers)

| id | observation | handling | label |
|---|---|---|---|
| N-1 | **`--fallback` is accepted on the projected tiers.** §13.8's pre-decided fallback applies to the PR tier, and "the nightly tier absorbs the difference". The tiers entry (M0-f-02a, `bench/src/tiers/index.ts`) accepts `--fallback` for every tier, and `applyFallback` reduces every `fuzz` and `seeds` size. f-02b's nightly and milestone jobs declare those kinds, so `tier:nightly -- --fallback` would run B-FUZZ at 5 × 10³ (not 10⁶) and the spike sets at 25 (not 1 000 / 200). P2 printed the change. This fails safe: the switch is never the default, the runner prints `fallback applied: …` and records it in the TierReport's `fallback.changed`, and M0-t-01 applies it to the PR tier only | hardening: refuse `--fallback` outside `tier:pr` (detect and refuse), routed to M0-f-02a's runner (C-0241 (11)); M4 | CONFIRMED (by reading and P2's `applyFallback` over the real lists) |
| N-2 | **The edge-suite's 1 000-seed run was not taken here.** P3 ran the job's units at 1 seed. The 1 000-seed composition is the same command with a larger env value. The receipts and the ≈ 6 h projection are the item check's (PARTIAL, CONTENDED) | the session's queue row re-runs the nightly and milestone receipts whole after Q18 | PLAUSIBLE |
| N-3 | **The fusion and site stand-ins, B-FUZZ at 10⁶, the determinism spike and F-CUT on 10⁵ faces were not run end to end here.** Their command lines were checked against the harnesses' own parsers (P1). Their runs take hours on this machine (the item check's receipts: fusion ≈ 500 s a seed at CITY, KI-12). Cross-host and determinism need the Mac legs: PENDING-MAC (C-0460 (3)) | the item check's receipts stand; the Mac steps stay with the owner | PLAUSIBLE |

## Checker's ledger row: L-0737.
