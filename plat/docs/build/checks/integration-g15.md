# Integration re-check of stage group 15: M0-x-04 (flow flow-7, 2026-11-06)

Lane `check/integration-flow-7-g15-close`, 2026-11-06 09:55 – @@END@@. The re-check after the integration fix (M0-x-04's
round S2, lane `build/M0-x-04-fix-s2`, C-0464; closing check `check/M0-x-04-close-s2` PASS). It replaces the first
integration check of 2026-11-02 (lane `check/integration-flow-7-g15`, verdict FAIL, one blocker B-1, ledger row L-0732),
whose findings are restated under "The previous check" below.

**Verdict: @@VERDICT@@.** B-1 is fixed: `run.test.ts`'s composition test now builds its expected fixture on the
runner's registered view `tableView(TABLE_IDS, [s6Table()])` (`run.test.ts:212`), asserts the site carries that view,
and its tail (slice, S4 ways, S5 growth / prune / capacity, ways, gates against the items' own composition) runs and
holds. The NEAR gate is green (5 files, 49 / 49). The gates install, lint (with its probe-red check), build and
`landed:verify` pass. @@RELATED_SUMMARY@@ The composition probe P1 re-ran meeting point C on the landed tree: the S3 site
carries the registered view and equals the fixture built on it, a run handed the bare view gives the same model root
and report, and two processes are byte-identical. The files the re-landed record changed (`base.ts`, `run.test.ts`,
the new `view.test.ts`) hold no blocker.

**The seat.** Opus 5.5 in Claude Code in a Claude Code cloud container. `python3 tools/machine_profile.py --id` printed
`linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib`, as the brief requires, and `node --version` printed
`v24.12.0`. `tools/test_budget.py` printed 1 before every run (W = 1). The seat is independent of M0-x-04's authors
(`build/M0-x-04`, `-fix1`, `-fix-s1`, `-fix-s2`) and checkers (`check/M0-x-04`, `-close-r1`, `-close-s1`, `-close-s2`),
and of the first integration check. It changed no file of any item and ran no git command. Its ledger row is
**@@LID@@**. The probe and logs are in `/home/user/maps-scratch/waves/integration-g15-close/`. The probe was run from
`plat/` with `corepack pnpm exec tsx --conditions=plat-source <probe>`; it imports the packages' `src/` by absolute
path and writes nothing in `plat/`. No timing was taken or judged; durations below are informative only.

**Busy items.** The brief lists M0-a-06, M0-c-02 and M0-c-04 as busy. M0-c-02 (S3's commits) and M0-c-04 (S5a / S5b)
are dependencies of M0-x-04, so their in-flight edits stand in the tree the gates and the probe composed. Nothing in
this verdict rests on a red in their files; every probe run committed with `bugs []`.

## The previous check (re-run of its evidence)

| line | the previous finding | re-run evidence (this seat, this tree) | status |
|---|---|---|---|
| **B-1** (M0-x-04) | NEAR red at `packages/layout/test/pipeline/base/run.test.ts:211` ("S3's site is the flat fixture's with S1's terrain"): the expected site built as `flatFixture(1, { frameAreaHa, walledHa })` fell to `fixtures/flat.ts:43`'s bare `tableView()`, while since M0-x-02 S3 (Q99, C-0454) the runner's default view is `tableView(TABLE_IDS, [s6Table()])` and the base hands it to the site (`base.ts`, `tables: ctx.tables`); the diff was in `site.tables.hash` alone and the tail (old lines 214 – 242) never ran | (a) **The source.** `run.test.ts:54` defines `REGISTERED = tableView(TABLE_IDS, [s6Table()])`; `run.test.ts:212` builds `flatFixture(1, { frameAreaHa: SIZE.areaHa, walledHa: SIZE.walledHa, tables: REGISTERED })`; `:214 – 216` assert the site's view hash is the registered one, not the bare one, and that it carries `s6`; the tail (`:217 – 255`) is unchanged in substance and is reached. (b) **NEAR**, the item's own test directory at full strength: exit 0, `Test Files 5 passed (5) · Tests 49 passed (49)` (the previous run: 1 failed / 45 passed of 46; `view.test.ts` is new, with three tests). (c) **P1** (below): on flat seeds 1 – 3 the base's S3 site equals the fixture on the registered view in every field (3 / 3), and on all five runs it carries the registered view with `s6` (5 / 5). (d) `base.ts:438` still hands `ctx.tables` to the site; `base.ts:968`'s `baseArena` default is now the registered view (the first check's N-1), and `runBase` (`:986`) hands it the run's `options.tables` | **FIXED** (CONFIRMED) |

## (1) Gates, run once (executed in `plat/`)

| gate | command | result | label |
|---|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 | CONFIRMED |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 1277 files, 0 errors, 0 warnings`; the planted probe lines listed (`zz-probe.ts:6 – 14` and on) and `lint: probe-red ok`; licences, kernel-boundary, bench-boundary ok; `lint: 9 whole-tree checks` | CONFIRMED |
| build | `corepack pnpm build` | exit 0 | CONFIRMED |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item M0-x-04` | `ok (1 record)`. The tree's sha256 equal the record (lane `build/M0-x-04-fix-s2`): `base.ts` `7a8e6247…`, `index.ts` `0bb743c7…`, `run.test.ts` `3f4e7cfa…`, `view.test.ts` `30773cba…`, `guard` / `order` / `table.test.ts` `f0ea830e…` / `a28cc80b…` / `93743cb9…` | CONFIRMED |
| NEAR, full strength | `corepack pnpm exec vitest run --maxWorkers=1 packages/layout/test/pipeline/base/` (PLAT_FUZZ_RUNS unset; fast-check seed -725909503) | **exit 0**: `Test Files 5 passed (5) · Tests 49 passed (49)` (473 s, informative) | CONFIRMED |
| RELATED, reduced | `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1 packages/layout/src/pipeline/base.ts packages/layout/src/pipeline/index.ts` (the group's changed sources, from `landed/M0-x-04.json`; fast-check seed -249086275) | @@RELATED_ROW@@ | CONFIRMED |

## (2) Composition probe (executed)

**P1 — meeting point C after the fix** (`probes/p1-view.mts`; also A, B, F in brief). Runs: flat seeds 1 – 3 and the
river from 27 000 cdeg (`RIVER_BLUEPRINT`) seeds 1 and 5, on the test frame (900 ha, 30 ha walled, C-0264 (10)), each
run once with no view (the runner's registered default) and once handed the bare `tableView()`, with a batch watcher.
The probe ran twice in two separate processes (`p1a.log`, `p1b.log`).

| check | result |
|---|---|
| fail-safety | 10 / 10 runs committed; `report.bugs` is `[]` on every one |
| order (A) | `model.order` is `S1 S3 S4 S5 S6 S8` on 5 / 5 |
| op forms (B) | 25 – 32 batches a run; every batch's form equals `BASE_OP_FORMS.get(sub)` apart from the pinned S5a callback (C-0264 (1)); `formBad` is `[]` on 5 / 5 |
| the site's view (C) | the S3 site's `tables.hash` is the registered view's and its `s6` table is `s6Table()`'s on 5 / 5 |
| site = fixture on the registered view (C, B-1's claim) | every field except stream, terrain and town key (the test's own comparison) equal on flat 1 – 3 (3 / 3) |
| no shift across views | a run handed the bare view gives the same model root and the same report (sha256 of its canonical text) as the default run on 5 / 5 — the cells of the two views are equal, as C-0464's census says |
| harness keys (F) | 27 data keys on every run |
| determinism | `cmp p1a.log p1b.log`: identical |

River 27 000 seed 5's root is `[2266437795,2018362997,2764051164,772796875]`, the same as the first check's N-3
(2026-11-02): no output moved between the two checks on that run.

## (3) The re-landed files (read for blockers only)

M0-x-04's record (`landed/M0-x-04.json`, lane `build/M0-x-04-fix-s2`) changed `base.ts` (`baseS6Input` reads
`ctx.tables` for S6's input and `siteFeatures`; `baseArena`'s default view is the registered one; `runBase` hands it
`options.tables`), `run.test.ts` (the composition fixture on `REGISTERED`) and the new `view.test.ts`. Read in full at
the changed regions: no stub or shortcut on an honest path (the only `notBuilt` throws are `checkBaseBlueprint`'s
M1 refusals of C-0264 (3), unchanged), no wrong result (P1), the choices row C-0464 names its tests, no path outside
`plat/`, nothing that breaches the clean room. No blocker.

## Failing lines

@@FAILING@@

## Notes (not blockers)

- **N-1 (closed).** The first check's N-1 (`baseArena` built the frame from the bare view) is closed by the same round:
  `baseArena`'s default is now the registered view (`base.ts:968`) and `view.test.ts` pins it.
- **N-2 (stands, informative).** The "at least one S5c street" claim stays a seed-1 claim on the 900 ha / 30 ha test
  frame (C-0464 keeps the composition test at seed 1); the first check found no S5c street at flat seeds 2, 3 and 6 in
  the base and in the items' own composition alike. Not a composition fault.
- **N-3 (busy items).** M0-c-02 and M0-c-04 (dependencies, busy) and M0-a-06 (busy) were being worked on during the
  check. The gates and P1 composed their in-flight tree; no run refused. Nothing here judges their files.
@@RELATED_NOTE@@
## The probes and logs

`/home/user/maps-scratch/waves/integration-g15-close/`: `install.log`, `lint.log`, `build.log`, `landed-verify.log`,
`near.log`, `related.log`, `probes/p1-view.mts` (`p1a.log`, `p1b.log`).

## The checker's ledger row

@@LID@@ (`plat/CLEAN-ROOM.md` §2). The first check's row L-0732 stands for its own seat.
