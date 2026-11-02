# Integration check of stage group 15: M0-x-04 (flow flow-7, 2026-11-02)

Lane `check/integration-flow-7-g15`, 2026-11-02 03:05 – 05:20.

**Verdict: FAIL, with one blocker (B-1).** The NEAR gate (the item's own test files at full strength) exits 1. Its one
red is `packages/layout/test/pipeline/base/run.test.ts:211`, a file of the group. That pin compares the base's S3 site
with a flat fixture built on the bare default tables view. Since M0-x-02's hardening round S3 (Q99, landed 2026-10-31),
the runner gives every stage its registered view, and `base.ts` correctly hands that view to the site. The composed
result is right. Probes P2 and P3 show that the site equals the fixture built on the run's view, and that the rest of
the test (the slice, S4, S5, ways and gates against the items' own composition) holds on seeds 1 – 6. The fault is the
stale expectation in M0-x-04's test. M0-x-02's notes 26 and 29 declared this shift, and the session's queue calls it
Q138. Because the red sits in the group's own file, the gate rule makes it a blocker. The required change is
M0-x-04's alone.

Everything else is green or a note. Install, lint (with its probe-red check), build and `landed:verify` pass. RELATED
(reduced strength) has six reds: the same `run.test.ts:211` pin, and five in M0-x-06's edge pins, which are busy and foreign to the group. The composition probes ran `runBase` end to end on 7 honest runs, twice, in two processes. They
found §4.1's order, the declared op form of every batch, the data keys the harnesses read, S4's built bridge reaching
S6, and byte-identical output across the two processes.

**The seat.** Opus 5.5 in Claude Code in a Claude Code cloud container. `python3 tools/machine_profile.py --id` printed
`linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib`, as the brief requires, and `node --version` printed
`v24.12.0`. `tools/test_budget.py` printed 1 before every run (W = 1). The seat is independent of M0-x-04's authors
(`build/M0-x-04`, `-fix1`, `-fix-s1`) and checkers (`check/M0-x-04`, `-close-r1`, `-close-s1`). It changed no file of any
item and ran no git command. Its ledger row is **L-0729**. The probes and logs are in
`/home/user/maps-scratch/waves/integration-g15/`. Each probe was run from `plat/` with
`corepack pnpm exec tsx --conditions=plat-source <probe>`. The probes import the packages' `src/` by absolute path and
write nothing in `plat/`. No timing was taken or judged; durations below are informative only.

**Busy items.** The brief lists M0-a-06, M0-c-02, M0-c-04 and M0-x-06 as busy. M0-c-02 (S3's commits) and M0-c-04
(S5a / S5b) are dependencies of M0-x-04, so their in-flight edits stand in the tree that the probes composed. Nothing
in this verdict rests on a red in their files. Every probe run committed with `bugs []`.

## The meeting points

M0-x-04 is the one file that names every M0 stage (`packages/layout/src/pipeline/base.ts`). Its interfaces are
`registerBase(registry)` and `runBase(blueprint, seed, scope): { model, report }`. They meet its dependencies and its
callers at these points:

| # | where | who writes / who reads | what the design or choices promise |
|---|---|---|---|
| A | the registered set → the runner's order | x-04 declares each stage's data keys. x-02's `kahn` / `run` orders and runs them | §4.1: "the base's registrations yield exactly the order drawn above" (S1, S3, S4, S5, S6, S8); a cycle is a registration error (§4.12) |
| B | each item's exported Stage → the batch's op form | e-03's `s1Stage`, c-03's `s4Stage`, c-04's `s5aStage` / `s5bStage`, c-05's `s5cStage` / `s5dStage`, e-04's `s6Stage` and b-03's `s8Stage` declare `txForm`. The base's façade watch observes each batch | M0.md §5 item 25 / §4.1 (`BASE_OP_FORMS`). S5a's trace batches commit as callback (C-0226 (2), C-0244 (8), C-0264 (1); pinned) |
| C | the runner's tables view → S3's site → S6 / S8's table reads | x-02 `run` (Q99: `tableView(TABLE_IDS, [s6Table()])` by default) → x-04 `baseSite` (`tables: ctx.tables`) → c-01 `flatFixture` (`site.tables`) → S8's `site.tables.table('regimes')`, S6's `s6TableIn` | Q99 / C-0453: every stage reads one registered view. C-0264 (2), (3): S3's site is the flat fixture's with S1's terrain, keyed by the town root |
| D | S3 → S4 → S5 records → the items' own composition | x-04's adapters hand c-02's commit, c-03's `runS4` inputs and c-04 / c-05's growth state on | run.test.ts: "the composition equals the items' own through S5 (M0-c-01 … M0-c-05)" |
| E | S4's built bridges → S6's sited features | c-03 writes `bridges` (state `built`). x-04's S6 adapter reads the key. e-04's `siteFeatures` seeds bridgehead wards | C-0267 (refining C-0264 (5)): S6's bridges are S4's |
| F | `runBase`'s model / report → the harnesses | `bench/src/fusion/runs.ts` (`fields`, `districts`), `bench/src/fusion-ng/hoods.ts` (`infill`, `blocks`, `lanes`, report stages), `bench/src/site/compose.ts` (`s1`), `bench/src/determinism/spike.ts` (bugs), testkit's `ladders/chain.ts` and `edge/chain.ts` (report stages) | C-0077: the integrated runner entry the harnesses call; the item's test: two runs at one seed give identical model digests |

## (1) Gates, run once (executed in `plat/`)

| gate | command | result | label |
|---|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 | CONFIRMED |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 1275 files, 0 errors, 0 warnings`. All ten planted probe lines were listed (`zz-probe.ts:6 – 16`: Math.pow, Math.random, Math.sin, Date.now, performance.now, `**`, `Object.keys().sort()`, `[3, 1].sort()`, localeCompare, for…in), and it printed `lint: probe-red ok`; `lint: 9 whole-tree checks` | CONFIRMED |
| build | `corepack pnpm build` | exit 0 | CONFIRMED |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item M0-x-04` | `ok (1 record)`. `base.ts` sha256 `d1c9d7d6…` equals the record (lane `build/M0-x-04-fix-s1`). For context, `--item M0-x-02` and `--item M0-c-01` are `ok (1 record)` too | CONFIRMED |
| NEAR, full strength | `corepack pnpm exec vitest run --maxWorkers=1 packages/layout/test/pipeline/base/` (PLAT_FUZZ_RUNS unset; fast-check seed 1206083598) | **exit 1**: `Test Files 1 failed / 3 passed (4) · Tests 1 failed / 45 passed (46)` (378 s, informative). The one red is `run.test.ts > the composition equals the items' own through S5 (M0-c-01 … M0-c-05) > S3's site is the flat fixture's …`, at `run.test.ts:211` `expect(canonicalText(restA)).toBe(canonicalText(restB))`. The two texts differ only in `"tables":{"hash":…}`: received `[3583497132,961889844,1541159756,447780439]` (the registered view), expected `[3142915123,597354915,394476638,1383838904]` (the bare `tableView()`). See B-1 | CONFIRMED |
| RELATED, reduced | `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1 packages/layout/src/pipeline/base.ts packages/layout/src/pipeline/index.ts` (the group's changed sources, from `landed/M0-x-04.json`; fast-check seed 1154117115) | **exit 1**: `Test Files 3 failed / 254 passed (257) · Tests 6 failed / 3284 passed (3290)` (7 486 s at W = 1, informative). The reds: (a) `layout/test/pipeline/base/run.test.ts:211`, the same pin as NEAR (B-1); (b) `testkit/test/edge/repins.test.ts` × 4, `EP-01/S1/self-touching at seed 2651453823` (`expected 'laddered' to be 'refused-safe'`), `EP-01/S5a/coincident at seed 1658509524`, `EP-01/S6/self-touching at seed 4101706098` and `EP-01/S6/coincident at seed 2708765650`; (c) `testkit/test/edge/ep01-s1-s3-s4.test.ts` `EP-01/S1/self-touching` (`refused E_INVARIANT on a seed the pin does not name`, 2893352673). (b) and (c) are M0-x-06's re-pins. M0-x-06 is busy, and base.ts changed no file on their path since their pins were taken. The same cells are red, as foreign, in other seats' RELATED runs (`check/M0-x-02-close-s3`, `check/M0-e-04-close-s4`, `check/M0-a-08-close-s5`: Q106, Q113 and Q140 / J676's declared shift). Notes, not the group's gate (N-5). No J176 bench file is red | CONFIRMED |

## (2) Composition probes (executed)

**P1 — `runBase` end to end** (`p1-compose.mts`; meeting points A, B, E and F). Runs: flat seeds 1 – 3, river from
27 000 cdeg (`RIVER_BLUEPRINT`) seeds 1, 3 and 5, and river from 0 cdeg seed 2, all on the test frame (900 ha, 30 ha
walled, C-0264 (10)), with a batch watcher. The probe ran twice in two separate processes (`p1a.log`, `p1b.log`).

| check | result |
|---|---|
| fail-safety | 7 / 7 committed. None threw, and `report.bugs` is `[]` on every run |
| order (A) | `model.order`, `report.stages` and the sequence of stages seen by the watcher are `S1 S3 S4 S5 S6 S8` on 7 / 7 |
| op forms (B) | 25 – 49 batches a run. Every batch's form equals `BASE_OP_FORMS[sub]`, apart from the pinned S5a-callback exception (5 batches a run, C-0264 (1)). `formBad` is `[]` on 7 / 7 |
| S4 → S6 bridges (E) | river 27 000 seed 5: S4 builds `bridge:8`, and S6's record holds `bridge:8/end:0` and `bridge:8/end:1`. On the other six runs no bridge is built and no bridgehead is sited |
| harness keys (F) | each of `s1`, `water`, `terrain`, `s3`, `s3.slice`, `s3.commit`, `ways`, `gates`, `bridges`, `s4`, `s5`, `s5.growth`, `districts`, `s6`, `fields`, `fieldBands`, `infill`, `blocks` and `lanes` is present on 7 / 7. Every district has pass-1 values, and S8 refused 0 districts (11 – 34 districts, 170 – 211 blocks, 160 – 184 lanes) |
| determinism | `cmp p1a.log p1b.log`: identical. Every root, stage root and count is equal across the two processes |

**P2 — the tables view at S3's site** (`p2-site-view.mts`; meeting point C). Runs: flat seeds 1 – 2 and river seed 1.
The base's S3 site was compared, field by field, with `flatFixture` built two ways: on the bare default view, and on the
runner's registered view `tableView(TABLE_IDS, [s6Table()])`.

| check | result |
|---|---|
| site vs the fixture on the bare view | differs in `tables` only (3 / 3) |
| site vs the fixture on the registered view | no field differs (3 / 3) |
| the site's view | carries `s6` (the bare view does not). Its `regimes` table equals the bare view's, so S8's regime rows are unchanged |
| a run handed the bare view (`runBase(FLAT, 1, …, { tables: tableView() })`) | commits, order `S1 … S8`, `bugs []`. S6 falls back through `s6TableIn` |

So the base composes the view as Q99 promises: the stages and the site read one registered view. Only the test's
expectation still builds the bare one.

**P3 — the composition test's unexercised tail** (`p3-tail.mts`; meeting point D). In the tree, `run.test.ts`'s
composition test stops at line 211, so its later assertions are not run. They compare the slice, S4's ways, S5's growth,
prune and capacity records, the ways and the gates with the items' own `s3Slice` → `commitS3Slice` → `runS4` → `runS5`
on a fresh arena. The probe runs the test body verbatim with one change: the fixture is built on the run's registered
view (`p3.log`).

| seeds | result |
|---|---|
| 1, 4, 5 | every check true: town key, site = fixture, terrain, commit / S4 / S5 ok, slice, S4 ways, S5 growth (count and streets), prune, capacity, ways, gates |
| 2, 3, 6 | every composition check true. The base's S5c secondaries are empty, and so are the items' own (equal). Only the test's seed-1 claim "at least one S5c street" would not hold at these seeds (note N-2) |

## (3) The blocker

| # | blocker | evidence | required change (one item) | label |
|---|---|---|---|---|
| **B-1** | **M0-x-04's NEAR gate is red at `run.test.ts:211`**, because a pin in the group's own file holds a stale expectation. `run.test.ts:203` builds the expected site as `flatFixture(1, { frameAreaHa, walledHa })`. That falls to `fixtures/flat.ts:43` `opts.tables ?? tableView()`, the bare view. Since M0-x-02's round S3 (Q99, C-0453), the runner's default view is `tableView(TABLE_IDS, [s6Table()])` (`runner.ts:258`). The base hands that view to the site (`base.ts:437`, `tables: ctx.tables`), as Q99 means it to. The test then fails on `site.tables` alone, and its later composition assertions (lines 214 – 242) never run. A gate exits non-zero because of a file of the group: a blocker by the brief's rule. The composed result itself is right (P2, P3). | NEAR log (above): `Tests 1 failed / 45 passed (46)`, with the diff in `"tables":{"hash":…}` only. P2: the site equals the registered-view fixture in every field (3 / 3). P3: the tail holds on seeds 1 – 6. M0-x-02's notes 26 and 29 declare the shift and leave the pin to "M0-c-01 S4 … or M0-x-04 S2". RELATED runs of other seats since 2026-10-31 (`check/M0-x-02-close-s3`, `check/M0-a-08-close-s5`) carry the same red as foreign (Q138) | **M0-x-04**: in `packages/layout/test/pipeline/base/run.test.ts`'s composition test, build the expected fixture on the view the run gives its stages: `flatFixture(1, { frameAreaHa, walledHa, tables: <the run's view> })`, using the registered view `tableView(TABLE_IDS, [s6Table()])` or the site's own `tables`. Then keep the tail's assertions running. Seat's choice, recorded in the round's notes: keep "at least one S5c street" only at seed 1, where it holds (N-2). This is the narrower of the two owners note 26 names. Changing `flatFixture`'s default (M0-c-01) would move `site.tables` for every other caller of the fixture | CONFIRMED |

## Notes (not blockers)

- **N-1 (informative; for the session).** `base.ts`'s `baseArena(bp, options.tables)` builds the ground frame from
  `options.tables ?? tableView()` (the bare view), while the stages read the runner's registered view. P2 shows the
  fixture's frame equal on both views (they differ in `tables` only), so the arena and the site share one frame today. If a frame
  table is ever registered beside `s6`, `baseArena` should take the runner's default. KI for the hardening pass (J202).
- **N-2 (informative; M0-c-05 / M0-x-04).** On the 900 ha / 30 ha test frame, S5c grows no secondary street at flat
  seeds 2, 3 and 6 (P3), in the base and in the items' own composition alike. This is not a composition fault (the two
  agree), and the test frame is C-0264 (10)'s reduced size, not a bar. If B-1's round makes the tail run at more seeds,
  the "at least one street" claim belongs to seed 1.
- **N-3 (informative).** P1's river 27 000 seed 5 now gives 162 lanes, root `[2266437795,2018362997,2764051164,772796875]`
  (the close-r1 check recorded 170 lanes, root `[3079720843,…]` on 2026-10-07). Later declared rounds of the
  dependencies moved it. `bridge:8` still reaches S6 with both deck ends.
- **N-4 (busy items).** M0-c-02 and M0-c-04 were being worked on during the check. The probes composed their in-flight
  tree, and no probe run refused. Nothing here judges their files.
- **N-5 (foreign RELATED reds; M0-x-06, busy).** The five testkit edge reds of the RELATED row: `repins.test.ts`
  EP-01/S1/self-touching 2651453823, S5a/coincident 1658509524, S6/self-touching 4101706098, S6/coincident 2708765650,
  and `ep01-s1-s3-s4.test.ts` EP-01/S1/self-touching 2893352673. Each is a re-pin of M0-x-06 whose cell another
  round's declared shift moved. `PLAT_FUZZ_SEED=1154117115` replays the run. For the session's queue rows (Q106, Q113,
  Q140), not this group.

## The probes and logs

`/home/user/maps-scratch/waves/integration-g15/`: `install.log`, `lint.log`, `build.log`, `landed-verify.log`,
`near.log`, `related.log`, `p1-compose.mts` (`p1a.log`, `p1b.log`), `p2-site-view.mts` (`p2.log`), `p3-tail.mts`
(`p3.log`).

## The checker's ledger row

L-0729 (`plat/CLEAN-ROOM.md` §2).
