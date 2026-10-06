# Integration check of stage group 11: M0-c-02, M0-x-02, M0-k-04, M0-k-05 (flow flow-7, 2026-10-06)

Lane `check/integration-flow-7-g11`, about 16:00 – __END__.

**Verdict: PASS.** The gates are green. The four items' tests are green at full strength, and the related set is
green at reduced strength. Four composition probes ran the meeting points end to end on honest inputs, and none of
them shows a wrong result or an interface mismatch. Six notes follow (N-1 – N-6). None of them is a blocker.

**The seat.** Opus 5.5 in Claude Code on the owner's Windows PC. The machine check
(`python3 tools/machine_profile.py --id`) printed `wsl:Intel(R) Core(TM) i9-10900K CPU @ 3.70GHz:20cpu:16gib`, and
`node --version` printed `v24.12.0`. The seat is independent of the four items' authors and checkers. It changed no
file of any item. Its ledger row is **L-0263**. The probes and logs are in `~/maps-scratch/waves/integration-g11/`.
Each probe was run with `corepack pnpm exec tsx --conditions=plat-source` from `plat/`. The probes import the packages'
`src/` and two items' read-only test supports (`layout/test/enceinte/support.ts` and
`layout/test/pipeline/core/support.ts`) by absolute path, and they write nothing in `plat/`. No timing was taken or
judged.

**Incident (disclosed).** One shell line ended with a stray `git -C …/plat status --porcelain | head -0`. That is a
read-only status, and its output was discarded. It changed no tracked file and made no commit. It still breaks the
"no git command" rule, so it is recorded here and in L-0263.

**Busy items.** M0-c-04, M0-e-04 and M0-b-04 were busy. None of the probes reads their files. The whole-suite run
loads their tests, and any red found there is a session note.

## The meeting points

| # | where | who writes / who reads | what the design or choices promise |
|---|---|---|---|
| A | the S3 slice's commits run as pipeline stages | c-02 (`commitOuterRing`, `commitS3Batch`, `baseEnceinte.trace`, `layStrips`) inside x-02's `run` and `ctx.batch` | §4.1: S1's L0 batch, S3's declared L1 batch, S5a's trace for k = 1 (C-0226 (2)). C-0224 (6): each batch goes through the façade's tx in the stage's op form, and every created face is ranked. Two runs give one model digest. The report is whole and `bugs` is empty |
| B | `registry.enceinte` and `StageContext` | c-02's `EnceinteStrategy` and `EnceinteContext`; x-02's `StrategyRegistry` and `PipelineContext` | §4.12, §14: the strategy is registered by name, and the stage's context is what the strategy runs in |
| C | the wall as a metric input | c-02's `Traced.line` (a closed CCW ring of lattice points, cm, the arena's frame); k-05's `MetricDoc.wall` ("the outermost curtain wall's trace", integer cm, open or closed) | §13.5: wall alignment by distance band, blocks per ha, and the street signature inside the wall |
| D | §5.4's `bugs` and `kernel` block | k-04's `BugEntry`, `FuzzReport` and `CountsReport.totals`; x-02's `BugRow` and `KernelReport` | §5.1 (8): a bug abort rolls its batch back and writes one entry (class, entity, key, stage). §5.4: warnings per code, downgrades, work-limit hits |
| E | the bench dispatcher | k-04's `fuzz-bar`; k-05's `parity` and `baselines-check` in one `scripts/bench.mjs` | C-0113: one entry per harness, and exit 64 on usage |

## Gates, run once (CONFIRMED, executed)

| gate | command | result |
|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 (`Already up to date`) |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 897 files, 0 errors, 0 warnings`. Every planted probe line was listed, and it printed `lint: probe-red ok` |
| build | `corepack pnpm build` | exit 0 (`build: tsc -b ok`, esbuild bundles) |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item <id>` for each item | `ok (1 record)` × 4 (M0-c-02, M0-x-02, M0-k-04, M0-k-05) |
| near, full strength | `vitest run --maxWorkers=3` over `layout/test/enceinte/`, `layout/test/pipeline/core/`, `testkit/test/runner/`, `bench/test/fuzz-bar/`, `testkit/test/parity/`, `bench/test/parity/`, `bench/test/baselines-check/` (PLAT_FUZZ_RUNS unset) | exit 0: `Test Files 24 passed (24) · Tests 466 passed (466)`. The four `bar FAILS` lines are the planted crash, hang, invalid output and bug entry, and they are expected |
| related, reduced | `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=3` over the 49 source files under `packages/*/src/` that the four landed records list (`related-sources.txt`) | exit 0: `Test Files 92 passed (92) · Tests 1558 passed (1558)` |
| whole suite (J194) | `PLAT_FUZZ_RUNS=1000 corepack pnpm test --maxWorkers=2` | __WHOLE__ |

## Composition probes (CONFIRMED, executed)

**P1: c-02's commits as pipeline stages, through x-02's batch door (`p1-runner-s3.mts`; meeting points A and B).**
This probe registers `baseEnceinte` in `registry.enceinte` under `ENCEINTE_STRATEGY_ID` and registers three fixture
stages:

- S1 (callback form) runs `commitOuterRing`.
- S3 (declared form) runs `commitS3Batch`.
- S5 (callback form) runs the strategy's `trace` with the runner's `PipelineContext` as its `EnceinteContext`, and then
  `layStrips` with `commitS3Slice`'s strip stops.

c-02's functions get a kernel whose `tx` is the runner's `ctx.batch`. That means every batch takes the stage's op form,
its work-limit law, its batch-scope rows and its rank. The probe compares the result with c-02's own `commitS3Slice` on
a fresh kernel. It covers the small site at seeds 1–12 and CITY at seeds 1–3, 15 derivations in all:

- **The geometry matches in all 15 derivations.** The trace line is identical, and so are the L0 face set, the L1 face
  set (slot-free canonical rings), the `TraceReport` and the `StripsLaid` (3 + 3 strips at small, and the same at
  CITY).
- **Determinism.** Two runs give the same model-digest root and a byte-identical report in 15/15.
- **Ranks.** The L0 face has S1's rank 0. The 3 L1 faces of S3's batch have rank 1. The faces from the trace and the
  strips have rank 2: 7 at small and 15 at CITY.
- **The report.** `bugs` is `[]` and `workLimitHits` is 0. `work` is charged per stage (for example S1 33, S3 78,
  S5 2 798). `kernel.warnings` counts the commits' `W_ATTRACTED`, which is 2 on small seed 2.
- **Result:** `{"probe":"P1","runs":10,"direct_ok":10,"bad":[]}` and `{"runs":3,…,"bad":[]}`, plus seeds 1–2,
  `bad: []`.

A control run with `FWD=1` returns the S5 stage's batch warnings in its result, the way c-02's own results carry them.
On seed 2 that moves `kernel.warnings.W_ATTRACTED` from 2 to 4. This is N-1, and it is the composer's rule, not a
defect of either item.

**P3t: the shapes where items meet, at type level (`types/p3-types.ts`, `tsc --noEmit` on the packages' src).** The
probe checks these assignments:

- k-04's `BugEntry` and x-02's `BugRow`, in both directions.
- `GenerationReport['bugs']` to `BugEntry[]`.
- k-04's `CountsReport['totals']` and `FuzzReport` to `Pick<KernelReport, 'warnings' | 'downgrades' | 'workLimitHits'>`.
- x-02's `PipelineContext` to c-02's `EnceinteContext`.
- `baseEnceinte` to `EnceinteStrategy`, and its registration in `StrategyRegistry.enceinte`.
- `Traced['line']` to `MetricDoc['wall']`.

`tsc` exit 0. The negative control (a `BugRow` without `stage`) is red with `TS2741 Property 'stage' is missing`, exit 2.

**P2: c-02's trace as k-05's wall (`p2-wall-metrics.mts`; meeting point C).** The probe commits the slice with
`commitS3Slice`. It hands `Traced.line` as `MetricDoc.wall`, the slice's gate routes as ways, and a seeded grid of
60 m × 40 m blocks as blocks. The grid is rotated 17° on odd seeds and covers the trace's bounding box ± 100 m. The
probe ran small seeds 1–12 and CITY seeds 1–4, all committed:

- `wallRing` reads the trace vertex for vertex in metres (cm / 100) in 16/16. Every trace is CCW.
- `blocksPerHa` equals an independent count of centroids inside the trace divided by the shoelace area in hectares,
  in 16/16 (to 1e-9). For example, small seed 7 gives 54 blocks and 2.8972 per ha.
- `wallAlignment`'s band membership (0–40, 40–100, 100–200 m) equals an independent nearest-segment computation in
  16/16. For example, seed 7 gives 17 / 21 / 15.
- `sgd.tShare`, `sgd.deadEnds` and `blockc.perHa` give the same value for the wall open, closed, rotated in start or
  reversed.
- `bldg.wallAlign.*` give the same value open and closed. They change with the ring's start or orientation on some
  seeds: a start rotated by 7 vertices changed them on 4 of 12 small seeds, and reversal changed them on 15 of 16.
  This is N-3. It is k-05's metric tie at a wall vertex, it is deterministic for one input, and the metric is a
  non-gating proxy (C-0018).

**P3: §5.1 (8)'s bug abort, kernel side and pipeline side (`p3-bugs.mts`; meeting point D).** Six chains were run,
each with a point past 2²³ cm. Each chain went three ways:

- through k-04's `bugAbort`;
- through a fixture S4 stage's `ctx.batch`, the stage writing its entry through `ctx.report.bug` (the ladder path);
- through a fixture S4 stage that returns the refusal (the runner's refused-stage path, C-0224 (5)).

The results:

- All three paths gave `E_OUT_OF_RANGE`.
- All three rolled back: the arena version did not change, and the S4 stage root equals the S1 root.
- The ladder path's row `{cls:"F-NUM", entity:"town:…", key:"S4/route@town:…", stage:"S4"}` has k-04's `BugEntry`
  fields, with the same class and stage name as k-04's `{cls:"F-NUM", …, stage:"S4"}`.
- The refused path wrote one `S4` row.
- `workLimitHits` was 0.
- **Result:** `{"probe":"P3","runs":6,"bad":[]}`.

**P3s: downgrades counted alike (`docs/build/summaries/M0-k-04.json`).** x-02 counts `kernel.downgrades` as the sum of
the `W_DOWNGRADE` warning counts. k-04 counts one per downgraded operation. The two agree in k-04's committed 10⁴
summary: `totals.downgrades` 3 695 = `totals.warnings.W_DOWNGRADE` 3 695, all of them from `skeleton`.

**P4: the bench dispatcher (meeting point E).** `corepack pnpm parity`, run with no arguments, exits 64 with its usage
line naming `--ours`. An unknown harness exits 64, and its message lists `fuzz-bar`, `parity` and `baselines-check`
side by side. Each item's bench tests are in the near set, and they are green.

## Failing lines

None.

## Notes (not blockers)

- **N-1 (M0-x-04, when it writes the base table; C-0224 (5)).** x-02's runner counts every commit record's warnings
  and also the stage result's warnings, "so a stage does not re-forward its batches' warnings in its result". c-02's
  `commitS3Slice`, `trace` and `layStrips` return their batches' warnings in their results. So do the passed stages
  outside the group: site `water/stage.ts`, layout `backbone/stage.ts` and `growth/mainRoads.ts`. A wrapper that
  forwards them through `ctx.batch` counts each one twice: P1 with `FWD=1` gave `W_ATTRACTED` 2 → 4. No group item
  composes these today (C-0077). M0-x-04 must drop the forwarded warnings, or the rule must change.
- **N-2 (M0-x-04).** c-02's batches name their own stages: the outer ring S1, the S3 batch S3 (declared ops), and the
  trace and strips S5 (callbacks, C-0226 (2)). They use a fixed work limit of 10⁷. `commitS3Slice` therefore cannot be
  one stage's run. It mixes op forms, and through `ctx.batch` the stage's id and law replace c-02's. P1 shows the
  split that composes exactly: S1 → `commitOuterRing`, S3 → `commitS3Batch`, and S5 → `trace` + `layStrips` with
  `commitS3Slice`'s stops. The stops are computed inside `commitS3Slice` and are not exported as a function, so the
  probe copied them.
- **N-3 (M0-k-05 hardening, KI).** `nearestEdge` (`testkit/src/metrics/geometry.ts`) keeps the first edge on a strict
  `<`. When a block centroid's nearest wall point is a vertex, the two edges at that vertex tie, and the ring's start
  and orientation decide which edge wins. As a result, `bldg.wallAlign.median` and `share15` differ for one wall given
  CW or from another start (P2, P2d, P2e: one block's folded angle 43.2° vs 19.6°). The result is deterministic for a
  given input, and the row is a non-gating proxy (C-0018). A harness should pass `Traced.line` unchanged until the tie
  is broken independently of the ring's form.
- **N-4 (vocabulary, for the session).** One `bugs` list gets three key forms:
  - k-04's fuzz entries: `cls` is the failure class (`F-NUM`), and `key` is a replay key (`bfuzz/bugAbort#n`).
  - x-02's refused-stage entries: `cls` is the kernel code (`E_OUT_OF_RANGE`), and `key` is `<stage>@<town>`
    (C-0224 (5)).
  - The ladder path: `key` is the textual stream key.

  The shapes are equal (P3t), and CI reads only that the list is empty.
- **N-5 (M0-x-05).** c-02 reports F-WALL's trace rungs in `TraceReport.rungs` (`WallRung`), not through
  `ReportSink.ladderUse`, because `siteContext`'s `report` is `undefined`. The stage-ladder coverage and the report's
  `ladderUses` therefore need a `WallRung` → `LadderUse` mapping when the stage is composed. k-04's `CoverageRow` names
  a rung in words, while x-02's `LadderUse.rung` is a number. M0-x-05's merge (C-0109) reconciles the two.
- **N-6 (whole suite).** __N6__

## Probes and logs

`~/maps-scratch/waves/integration-g11/`:

- shared helpers: `lib.mts`
- probes: `p1-runner-s3.mts`, `p2-wall-metrics.mts` (with the diagnostics `p2d-diag.mts` and `p2e-diag.mts`),
  `p3-bugs.mts` and `types/p3-types.ts` (with its negative control `types/p3-neg.ts`)
- logs: `p1-small.log`, `p1-city.log`, `p2-small.log`, `p2-city.log`, `near.log`, `related.log`, `whole.log`, and the
  gate logs `install.log`, `lint.log` and `build.log`
- inputs: `related-sources.txt`
