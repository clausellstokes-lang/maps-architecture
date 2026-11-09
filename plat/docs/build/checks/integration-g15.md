# Integration re-check of stage group 15: M0-x-04 (flow flow-7, 2026-11-09)

Lane `check/integration-flow-7-g15-close`, 2026-11-09 20:41 – 22:32. This re-check follows the integration fix of
the first check's one blocker (lane `check/integration-flow-7-g15`, 2026-11-02, verdict FAIL, B-1; its full text is in
this file's earlier version and in the lane log). The fix is M0-x-04's hardening round S2 (`build/M0-x-04-fix-s2`,
C-0464), closed by `check/M0-x-04-close-s2` (PASS).

**Verdict: PASS, with no blocker.** B-1 is fixed. The NEAR gate (the item's own test files at full strength) now exits 0 with
5 files and 49 / 49 tests, and the composition test that was red at `run.test.ts:211` runs to its last assertion.
A probe re-ran the first check's evidence (P2 and P3) on the tree as it stands and found the same: S3's site equals the
flat fixture built on the run's registered view, field by field, and the test's tail (slice, S4, S5, ways, gates)
equals the items' own composition. Install, lint (with its probe-red check), build and `landed:verify` pass.
RELATED (reduced strength) exits 0 over 259 files, 3310 / 3310, so the first check's six RELATED reds (B-1's pin and five foreign M0-x-06 edge pins) are all green now. The files M0-x-04's re-landed record changed hold no stub, shortcut or path outside `plat/`.

**The seat.** Opus 5.5 in Claude Code in a Claude Code cloud container. `python3 tools/machine_profile.py --id` printed
`linux:Intel(R) Xeon(R) Processor @ 2.30GHz:4cpu:16gib`, as the brief requires, and `node --version` printed
`v24.12.0`. `tools/test_budget.py` printed 1 before every run (W = 1). The seat is independent of M0-x-04's authors
(`build/M0-x-04`, `-fix1`, `-fix-s1`, `-fix-s2`) and checkers (`check/M0-x-04`, `-close-r1`, `-close-s1`, `-close-s2`).
It changed no file of any item and ran no git command. Its ledger row is **L-0741**. The probe and the logs are in the
session's scratchpad (`…/scratchpad/g15c/`). The probe ran from `plat/` with
`corepack pnpm exec tsx --conditions=plat-source <probe>`, importing the packages' `src/` by absolute path, and wrote
nothing in `plat/`. No timing was taken or judged; durations below are informative only.

**Busy items.** The brief lists M0-a-06, M0-c-02 and M0-c-04 as busy. M0-c-02 (S3's commits) and M0-c-04 (S5a / S5b)
are dependencies of M0-x-04, so their in-flight edits stand in the tree that the tests and the probe composed. Nothing
in this verdict rests on a red in their files. Every probe run committed with `bugs []`.

## (1) The previous check's line, re-run

| line | evidence re-run | result | label |
|---|---|---|---|
| **B-1** — M0-x-04's NEAR gate red at `packages/layout/test/pipeline/base/run.test.ts:211`: the expected site was built as `flatFixture(1, { frameAreaHa, walledHa })` on the bare `tableView()`, while the runner's default view is `tableView(TABLE_IDS, [s6Table()])` (x-02 S3, Q99, C-0454) and `base.ts` hands that view to the site; the tail (old lines 214 – 242) never ran | (a) the NEAR gate below; (b) the files: `run.test.ts` (sha256 `3f4e7cfa…`, = the record) declares `REGISTERED = tableView(TABLE_IDS, [s6Table()])` at line 54 and builds the fixture on it at line 212 (`flatFixture(1, { frameAreaHa: SIZE.areaHa, walledHa: SIZE.walledHa, tables: REGISTERED })`); lines 214 – 216 pin the site's view (`site.tables.hash` = REGISTERED's, ≠ the bare view's, its `s6` table = `s6Table()`); the tail runs to line 255; `view.test.ts` (new, `30773cba…`) pins that the arena, S6 and its sited features read the run's one view; `base.ts` (`7a8e6247…`) `baseSite` hands `ctx.tables` to the fixture (line 438), `baseS6Input` hands `ctx.tables` to `siteFeatures` and S6's input (lines 644, 660), `baseArena`'s default is the registered view (line 968) and `runBase` hands it `options.tables` (line 986); (c) probe P1 below, the first check's P2 and P3 re-run | (a) NEAR exit 0, 5 files 49 / 49, no skip: the composition test passes whole. (b) as the required change asked: the fixture on the run's view, the tail kept running; the "at least one S5c street" claim stays at seed 1, where it holds. (c) P1: on flat seeds 1 – 3 the site equals the registered-view fixture in every field, differs from the bare fixture in `tables` only, and the tail equals the items' own on 3 / 3 | **FIXED** (CONFIRMED) |

## (2) Gates, run once (executed in `plat/`)

| gate | command | result | label |
|---|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 | CONFIRMED |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 1277 files, 0 errors, 0 warnings`. All ten planted probe lines were listed (`zz-probe.ts:6 – 16`: Math.pow, Math.random, Math.sin, Date.now, performance.now, `**`, `Object.keys().sort()`, `[3, 1].sort()`, localeCompare, for…in), and it printed `lint: probe-red ok`; `lint: 9 whole-tree checks` | CONFIRMED |
| build | `corepack pnpm build` | exit 0 | CONFIRMED |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item M0-x-04` | `ok (1 record)`. The record is lane `build/M0-x-04-fix-s2`; the seven files' sha256 in the tree (`base.ts` `7a8e6247…`, `index.ts` `0bb743c7…`, `guard.test.ts` `f0ea830e…`, `order.test.ts` `a28cc80b…`, `run.test.ts` `3f4e7cfa…`, `table.test.ts` `93743cb9…`, `view.test.ts` `30773cba…`) equal it | CONFIRMED |
| NEAR, full strength | `corepack pnpm exec vitest run --maxWorkers=1 packages/layout/test/pipeline/base/` (PLAT_FUZZ_RUNS unset; fast-check seed 105720959) | **exit 0**: `Test Files 5 passed (5) · Tests 49 passed (49)` (344 s, informative). The first check's 45 / 46 over 4 files is now 49 / 49 over 5: B-1's test green, `view.test.ts`'s three tests and `run.test.ts`'s S6-input pin added by round S2 | CONFIRMED |
| RELATED, reduced | `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1 packages/layout/src/pipeline/base.ts packages/layout/src/pipeline/index.ts` (the group's changed sources, from `landed/M0-x-04.json`; fast-check seed -1763885935) | **exit 0**: `Test Files 259 passed (259) · Tests 3310 passed (3310)` (6 142 s at W = 1, informative). The first check had 257 files, 3284 / 3290, with six reds: B-1's `run.test.ts:211` and five testkit edge re-pins of M0-x-06 (`repins.test.ts` × 4, `ep01-s1-s3-s4.test.ts` × 1). All six are green now. No J176 bench file is red. The counts equal `check/M0-x-04-close-s2`'s RELATED (259 files, 3310 / 3310) | CONFIRMED |

## (3) Probe (executed)

**P1 — B-1's evidence re-run** (`p1-b1.mts`, `p1.log`; the first check's P2 and P3 in one). Runs: `runBase` on the
flat fixture at seeds 1, 2 and 3 on the test frame (900 ha, 30 ha walled, C-0264 (10)), no view handed in. For each,
the base's S3 site was compared, field by field (stream, terrain and town key aside, as the test does), with
`flatFixture(seed, …)` on the registered view and on the bare view; then `run.test.ts`'s composition tail ran verbatim
on the registered-view fixture keyed by the town root (`s3Slice` → `commitS3Slice` → `runS4` → `runS5` on a fresh
indexed arena).

| check | seed 1 | seed 2 | seed 3 |
|---|---|---|---|
| `report.bugs`, `model.order` | `[]`, S1 S3 S4 S5 S6 S8 | `[]`, same | `[]`, same |
| site = fixture on the registered view | true | true | true |
| fields where site ≠ fixture on the bare view | `tables` | `tables` | `tables` |
| town key = `mintTownRoot(seedKey(seed))` | true | true | true |
| commit / runS4 / runS5 ok | true | true | true |
| slice, S4 ways, S5 growth, prune, capacity, ways, gates = the items' own | all true | all true | all true |
| S5c streets | 1 | 0 | 0 |

So the base composes the view as Q99 promises, the test now expects it, and the tail the first check could only probe
is now in the gate at seed 1. The S5c count at seeds 2 and 3 is the first check's N-2 (the base and the items agree);
round S2 kept the "at least one street" claim at seed 1 only.

## (4) The files the re-landed record changed

Round S2 changed `packages/layout/src/pipeline/base.ts`, `test/pipeline/base/run.test.ts` and the new
`test/pipeline/base/view.test.ts` (with its notes, C-0464, L-0735). Read for blockers only:

- `base.ts`: `baseS6Input` passes `ctx.tables` to `siteFeatures` and to S6's input; `baseArena(bp, tables = tableView(TABLE_IDS, [s6Table()]))`;
  `runBase` hands `options.tables` to the arena. No stub or shortcut on an honest path; the only `notBuilt` lines
  (166 – 168: another rung, a population, an aspect other than 1) predate the round and carry `notBuilt('M1')` with
  C-0264 (3). This also closes the first check's N-1 (the arena's frame on the bare view).
- `run.test.ts`, `view.test.ts`: tests only; they pin the view at the three readers and the composition on it.
- Every path is inside `plat/`. No clean-room breach: the files cite the design, choices and queue rows only.

## Verdict and failing lines

**PASS.** No failing line. B-1 is fixed (section 1). Every gate exits 0. NEAR passes 49 / 49 at full strength, and RELATED passes 3310 / 3310 at reduced strength. Probe P1 re-runs the composition at the meeting point B-1 named (the runner's view → S3's site → the items' own S3 – S5) on three seeds, and it holds. M0-x-04's re-landed files hold no blocker.

## Notes (not blockers)

- **N-1 (closed).** The first check's N-1 (`baseArena` built its frame on the bare view) is closed by round S2:
  `baseArena`'s default is the registered view and `runBase` hands it the run's (`view.test.ts` pins both).
- **N-2 (standing, informative; M0-c-05 / M0-x-04).** On the test frame S5c grows no secondary street at flat seeds 2
  and 3 (P1), in the base and in the items' own composition alike. The test keeps the claim at seed 1.
- **N-3 (busy items).** M0-c-02 and M0-c-04 are busy; their in-flight edits stand in the composed tree. No probe run
  refused, and nothing here judges their files.
- **N-4 (closed for this group).** The first check's N-5 (five foreign M0-x-06 edge reds in RELATED) does not recur: this
  RELATED run is green throughout (seed -1763885935; `PLAT_FUZZ_SEED` replays it).

## The probe and logs

Session scratchpad `…/scratchpad/g15c/`: `install.log`, `lint.log`, `build.log`, `landed-verify.log`, `near.log`,
`related.log`, `p1-b1.mts` (`p1.log`).

## The checker's ledger row

L-0741 (`plat/CLEAN-ROOM.md` §2).
