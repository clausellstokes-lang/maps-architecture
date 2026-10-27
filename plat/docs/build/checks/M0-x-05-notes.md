# M0-x-05 — minor notes for the hardening milestone M4 (check/M0-x-05, 2026-10-07)

None of these fails the item (J180). Each is a gap or a hardening step, not a wrong result.

1. **The table is not cross-checked against the stages' own ladder declarations (PLAUSIBLE gap; the codes CONFIRMED by
   reading).** S3's slice writes an F-ROUTE `unserved` with code `unserved` (`siting/routes.ts` l. 103 and 144: a pick
   the plaza tree cannot reach, or no path to the frame). The `S3` StageDecl declares an F-WALL `reroute`
   (`pipeline/base.ts` l. 454; C-0201 (6)). Neither is a `STAGE_LADDERS` row, and `readSlice` counts neither. The
   `unserved` rung itself is exercised at S4/S5b, and `reroute` is M0-c-01's addition, not a §5.2 rung. Hardening: one
   test that walks every registered stage's `ladder` declaration (`registerBase`) and requires each (class, rung) to
   be a table row or a declared non-§5.2 extra.
2. **The verdict does not fold in the fixture runs' `bugs`.** `fixtures.ts`'s `chain()` discards the chain's report.
   Some rung tests assert `bugs` empty for their own runs, but `stageLadderCoverage().covered` would stay true with a
   bug in a fixture run. This seat's probe found 0 bugs in all 21 chain runs (CONFIRMED). Hardening: carry a bugs
   count per fixture into the report and require it to be 0.
3. **F-BUDGET-STAGE's `accept_shortfall` is reached through the walled skip (why `walled`), not after a top-up.**
   Demand ×4 at the small town's stage 3 gives `top_up` and then `accept_shortfall` (why `remainder`) (CONFIRMED by
   probe). That is the design's ladder order exactly and would make a stronger fixture. A side observation for
   M0-c-05 (PLAUSIBLE, not this item's): at ×4 the shortfall after the top-up (1.37 × 10⁹ cm²) is larger than before it
   (1.03 × 10⁹ cm²). The bands are probably re-cut over the grown land. Worth a look in M0-c-05's hardening.
4. **`checkLadderTable` pre-names the kernel ladders (F-NUM, F-SKELETON) without consulting the kernel report.** If
   M0-k-04's report lost its F-SKELETON rows, `tableProblems` would stay empty and `covered` would stay true. Only
   `ladders` would drop the class, which the full-run test does catch. Hardening: derive the kernel classes from
   `kernel.ladders` in the verdict.
5. **"Reproduces byte for byte" is tested in one process and without the plain baseline.** This seat's separate bench
   run reproduced the committed summary byte for byte, plain baseline included (sha256 `d4a65c0f…`). Hardening: a test
   that compares a second process's summary.
6. **W_CUT_SLID's leaf counts slide steps, not slid cuts.** `cut/slide` shows "fixture 30" for one cut slid 30 steps,
   and the plain baseline's 26 is a step count too. Name the unit in the summary, or count the slid (c) cuts.
7. **The `route.nodes` fixtures use S3's and S4's direct `routeNodesLimit` option, not "a test-side workLimits table".**
   Neither stage takes a table (`backbone/stage.ts` l. 169, `siting/slice.ts` l. 94 read `loadWorkLimits()` or the
   option), so the table's law path for `route.nodes` is not exercised by a low floor. C-0269 (3) names the option.
   Hardening: a table injection in S3 and S4, or a note in C-0269.
8. **F-CUT's "nowhere on the plain fixture" rests on one control, a 200 m × 150 m rectangle.** By C-0269 (2), the plain
   FLAT run reaches every F-CUT rung. A second plain S8 control (a convex non-rectangular face set) would make the
   zero less dependent on one shape.
9. **For the session, not the item:**
   (a) The RELATED red `bench/test/fusion/hausdorff.test.ts` (S8 ≡ S9) is M0-c-06's in-progress file. It fails with this
   item's testkit index line removed (CONFIRMED in this seat's mirror).
   (b) The plain FLAT run at seed 1 leaves S5b's stage-3 main road `s5b:3/4/out` unserved (no path). That is M0-c-04's
   router outcome. It is reported and fails safe, so it is for M0-c-04's hardening, not this item.

## Hardening round S1 — the builder's notes (lane `build/M0-x-05-fix-s1`, 2026-10-27)

The session's hardening round of M0-x-05 (J237 (2), J186, J192): the twelve FIX-NOW rows `checks/hardening-inventory.md`
assigns to the item — M0-b-03:12 N-3, :13 N-4, :14 N-5, M0-c-03:26 5, and this file's rows 1 – 8. Choices row C-0432.
Every source note was read whole before its row was touched. Tests only, at the floor; the only source changes are the
item's own (`packages/testkit/src/ladders/`, `bench/src/ladder-coverage/`); no stage file was edited.

**The tree.** The round opened on the landed M0-b-03 S7 – S8 tree (its round S7's Q65: rung (c)'s squared ends, C-0426)
and M0-a-09's S14 – S17. On it the item's NEAR set was green before any edit (9 files, 68 / 68, 970 s at W = 1): the
`cut/antenna` red that M0-b-03's S7-5 (a) recorded (`{ 'S8 F-CUT antenna': 1 }` against the recorded
`a@attempt>=1` line) no longer reproduces — the fixture leaves `{ 'S8 F-CUT a@attempt>=1': 1, 'S8 F-CUT antenna': 1 }`
again, its recorded outcome, so no re-record was needed.

**The refusal census (J264 (4), N-58), before → after.** The item's registered families are its fixtures and controls
and the plain flat fixture. Before (the round's start, a probe over a copy of `fixtures.ts` that counts each run's
throws, `bugs` entries, S8 `refused` districts and `unresolved` faces): 33 fixture and control runs — 0 throws, 0 bugs,
0 S8 districts refused, 0 faces unresolved; `runBase(FLAT_BLUEPRINT, 1)` — 0 bugs, 0 refused, 0 unresolved. After: 35
runs (the 33, the new control `plain/s8-convex`, N-3's face #106) — 0 / 0 / 0 / 0; the plain flat fixture 0 / 0 / 0.
Never rising; no lawful input refused in the families, so no refusal to class.

**Output.** No stage output moves (no stage file edited). The item's own outputs move where a row asks: the
`budget/accept` fixture is re-forced (row 3), a control added (row 8), the report and summary gain the bugs counts and
units (rows 2, 6), the table's problems the declarations' (row 1); the summary is regenerated once on this tree
(below).

### The inventory's rows

| row | outcome | evidence | mutant (killed by) |
|---|---|---|---|
| **M0-b-03:12 N-3** — (d)'s area bound untested (K19) | **PINNED** | `rungs-s8.test.ts` 'above (d)’s bound': F-CUT's concave #106 at seed 1 (`fcutConcave(ABOVE_BOUND_FACE)`, the draw M0-b-03's `squared.test.ts` replays) through S8's Stage object — its area above `substitutionAreaFactor` × e_hi² (2.08 × e_hi², the factor read from the cut table, e_hi from the face's stop line), every rung before (c) refused or none, more than one straight foot refused, then (c) cuts it (its squared end): outcome `cut`, no (d) line, no court, nothing unresolved. `cut/slide`'s slid face asserted above the bound too (refused feet before its cut, no (d) line); `cut/court`'s face asserted within it (one (c) line, then (d)). | **K19** (`substitutionMaxCm2 = +∞`: every face within the bound) — killed (coverage.test's full run: `S8 F-CUT W_CUT_SLID` not reached; replayed on the pin file, the N-3 case red). **K19b** (the court decision alone forced, `if (area <= …)` before the (d) line → `if (true)`) — SURVIVES, equivalent in practice: since C-0426 a face above the bound reaches that line only when every straight and every squared foot is refused, and no registered family holds one (M0-b-03 S7's census: F-CUT's 10⁵ at seed 1, the residue and M0 (b) families, base and CITY runs all `unresolved` 0; this round's census 0). A KI row for M4 (FAIL SAFE NOW: such a face would stand `unresolved`, typed and reported). |
| **M0-b-03:13 N-4** — the reflex pre-cut and the antenna split unit-tested only (K38, K37) | **already done** by `build/M0-x-05` (2026-10-07; `rungs-s8.test.ts` sha256 96ce562e… in `landed/M0-x-05.json`; the commit is the steward's), confirmed | `cut/reflex` (the L district through S8's Stage object: the pre-cut's line `pre` / `cut` on the top face) and `cut/antenna` (the small flat town at seed 6 through the base chain to S8: the antenna split's `antenna` / `cut` after `pre` / `refused`). M0-b-03's C1-9 records the same two killed in its `sharedVertex.test.ts`. | **K38** (`pre = null`) — killed; **K37** (the antenna branch never taken) — killed. |
| **M0-b-03:14 N-5** — `W_CUT_SLID` on an S8 run untested (K39) | **already done** by `build/M0-x-05`, confirmed | `cut/slide` asserts the slid cut's `slide` 30, `W_CUT_SLID` 30 in S8's district record and 30 under S8 in the generation report (and under no other stage). | **K39** (the straight slide's `run.warn('W_CUT_SLID', …)` removed) — killed. |
| **M0-c-03:26 5** — the F-ROUTE rungs' path from the slice into `S4Report.rungs` untested | **already done** by `build/M0-x-05`, confirmed | `rungs-route.test.ts` runs S4 through `runChain` — `registerBase`, M0-x-02's runner and S4's registered adapter (no override for `route/another-site`), so `runS4`'s `rungs: built.rungs` hand-off — and reads `s4.report.rungs`: the outward re-solve's `another_site` (gate:1/out) and the inward part's `unserved` (gate:0/in, why `water`), both masks. | **C5** (`rungs: []` at `backbone/stage.ts` l. 388) — killed. |
| **1** (l. 5) — the table not cross-checked against the stages' declarations | **PINNED** | `src/ladders/declared.ts`: `registeredRungs()` reads every base stage's StageDecl `ladder` from `registerBase` on a fresh registry (S3, S4, S5, S6, S8 — 30 rows; S1 declares none, its river reports §5.4 `ladderUses`); `DECLARED_RUNGS` maps each (stage, class, rung) to the `STAGE_LADDERS` rows it reaches, or to a declared extra with its reason — two: S3's F-WALL `reroute` (C-0201 (6)) and S6's F-NUM `degenerateFaceMerge` (§4.1's S6 row); `declaredRungProblems()` names an undeclared rung, a lost row, a class mismatch, a blank extra, a stale mapping. Folded into `stageLadderCoverage()`'s `tableProblems` (so into the bench verdict). `table.test.ts` (3 cases). | **R1** (S3 declares a sixth F-WALL rung `gateShift` in `pipeline/base.ts`) — killed (entry.test's whole run exits 1; table.test's walker red). |
| **2** (l. 12) — the verdict does not fold in the fixture runs' `bugs` | **PINNED** | `readers.ts` `BUGS_LEAF` and `readRun` (a chain run's `report.bugs` counted under the reserved leaf `bugs`, absent at 0); `fixtures.ts`'s `chain()` reads through it; each built row's `exercised.bugs`, the report's `controlBugs`; `stageCovered` requires both 0; the summary carries per-rung `bugs`, `fixtureBugs`, `controlBugs`; the bench line prints each fixture's bugs. `chain.test.ts` (readRun), `coverage.test.ts` (a buggy fixture fails its row, a buggy control the check; the full run asserts every row's bugs 0 and `controlBugs` 0). | **R2** (readRun drops the bugs) — killed (chain.test); **R2b** (the verdict ignores bugs) — killed (coverage.test). |
| **3** (l. 16) — F-BUDGET-STAGE's accepted shortfall reached through the walled skip | **PINNED** | `budget/accept` re-forced as the note proposes: demand × 4 at the unwalled stage 3 of the small flat town (60 ha walled, seed 1) — `top_up`, then `accept_shortfall` with why `remainder`, §5.2's ladder order; the walled form kept as a second case (`skipped_walled`, why `walled`). Side observation for M0-c-05, re-measured today: the shortfall after the top-up (1.372 × 10⁹ cm²) exceeds the one before it (1.029 × 10⁹ cm²) — M0-c-05's, reported. | **R3** (`capacity.ts` l. 366, the `remainder` line, removed) — killed (coverage.test; the pin file's `budget/accept` red). |
| **4** (l. 21) — `checkLadderTable` pre-names the kernel ladders | **PINNED** | `stageLadderCoverage()` passes `kernel.ladders` (the merged report's own) to the table check; `KERNEL_LADDERS` stays exported (API frozen), unused by the verdict. `coverage.test.ts`: a kernel report that lost F-SKELETON → `"§5.2's F-SKELETON is missing from the table"`, not covered; F-NUM lost stays named by its stage rows. | **R4** (the verdict's kernel classes pre-named again) — killed (coverage.test). |
| **5** (l. 25) — "reproduces byte for byte" in one process, without the plain baseline | **REPORTED** — routed to M0-f-02b's nightly tier (C-0105: a vitest test spawns no tier script); no pin here | The check's shape for f-02b's brief: one nightly job that, in a fresh process on a clean checkout, runs `corepack pnpm bench -- ladder-coverage` (a whole run: the plain flat fixture at seed 1, the kernel at its own 8 draws), which rewrites `docs/build/summaries/M0-x-05.json`, and passes when the rewritten bytes' sha256 equals the committed file's (the summary carries no timing, C-0067) — failing with the first differing key; optionally a second process's `$PLAT_BENCH_OUT/ladder-coverage/report.json` compared with the first's. This round's own two-process evidence: two processes — `corepack pnpm bench -- ladder-coverage` in the tree, then again in the lane mirror (its sources `cmp`-identical) — both exit 0, `covered true`; the summary's sha256 `a5ddf0e1…` both times, `report.json`'s `b5cb99d6…` both times, the plain baseline included; the committed summary moves `d4a65c0f…` → `a5ddf0e1…` (regenerated once, on this tree: the new `units`, the bugs counts, and the plain baseline re-measured — pre 29, antenna 24, (a) at attempt ≥ 1 97, (b) 5, `W_CUT_SLID` 95 slide steps, (d) 4, F-ROUTE `unserved` 1; every fixture and control count unchanged). | — |
| **6** (l. 28) — `W_CUT_SLID`'s leaf counts slide steps | **PINNED** (the unit named; the count kept: §4.6 step 8 (c) reports `W_CUT_SLID` "with its step count") | `table.ts` `LEAF_UNITS` / `unitOf` (`rung_uses` by default, `slide_steps` for `S8 F-CUT W_CUT_SLID`); the summary's `units`; the bench prints each count with its unit. `coverage.test.ts` and `entry.test.ts` assert the units. | **R6** (the W_CUT_SLID unit dropped) — killed (coverage.test). |
| **7** (l. 30) — the `route.nodes` fixtures use the stages' direct option | **choices row** (C-0432 (7), the note's second alternative) **and PINNED** (the law path S3 does read) | A table injection is not inside the owns: S3's slice (M0-c-01) and S4 (M0-c-03) take no table — each reads `loadWorkLimits()` itself or the `routeNodesLimit` option. The pin: the plain chain's S3 slice reports `routeNodesLimit` equal to `workLimitOf(loadWorkLimits().law('route.nodes'), S3's stage scope, its lattice's nodes)` (> 1): the stage's law path over the shipped table is exercised, the low floor entered through the option. S4's report carries no limit, so its law path is untested here — for M0-c-03 (a note for the session). | **R7** (S3's default limit a constant 10⁶) — killed (rungs-growth's plain chain). |
| **8** (l. 34) — F-CUT's "nowhere on the plain fixture" rests on one rectangle | **PINNED** | `LADDER_CONTROLS` gains `plain/s8-convex`: a regular hexagon district of 110 m radius through S8's Stage object (measured: 18 cuts, 19 blocks, every one rung (a) at attempt 0, no refused line but the deep spine's); `rungs-s8.test.ts` asserts it leaves nothing, every cut (a) at attempt 0 and no refused rung line. Probed beside it: an ellipse-like octagon and a parallelogram leave nothing too; a trapezoid and a convex pentagon reach (a) at attempt ≥ 1 and (b) — lawfully: a plain control must leave nothing, so they are not controls. | **R8** (S8 refuses rung (a) at attempt 0 on a convex depth-0 face of ≥ 5 vertices) — killed (coverage.test's control count `S8 F-CUT a@attempt>=1` 1, the hexagon's; two old `rungs-s8` cases see it too. The sharper **R8b** (the same refusal on a depth-0 face whose every turn lies between 40° and 80° — a near-regular polygon) is killed by `plain/s8-convex` alone: the round's before-image of `rungs-s8.test.ts` is 9 / 9 green on it, the new file red on that one case). |

**The self-check (J183).** 15 targeted mutants in the lane's one mirror (`/home/user/maps-scratch/waves/selfcheck-build-M0-x-05-fix-s1`,
isolation proven: no link into the tree, `@plat/layout` resolving inside the mirror), each applied alone, run
`corepack pnpm exec vitest run --maxWorkers=1 --bail=1 packages/testkit/test/ladders bench/test/ladder-coverage`,
restored from `plat/` and `cmp`-checked (the mirror deleted at the end): 15 run — K19, K38, K37, K39, C5, R3, R8 killed by coverage.test's full run (≈ 5 min each); R1 and R6 by entry.test's whole run (exit 1; `units` undefined); R2 by chain.test (`expected {} to deeply equal { bugs: 2 }`); R2b and R4 by coverage.test's planted cases; R7 by rungs-growth's plain chain (`expected 1000000 to be 63528`); R8b by rungs-s8's `plain/s8-convex`; **K19b survived** (77 / 77), equivalent in practice (row N-3). 14 killed, 1 equivalent; every mutated file restored and `cmp`-equal to the tree. Each pin's own case was then replayed on its mutant (the pin file
alone, the case's name): K19 ('above (d)’s bound'), K38 ('cut/reflex'), K37 ('cut/antenna'), K39 ('cut/slide'), C5 (rungs-route 'route/another-site'), R1 (table 'every declared'), R3 (rungs-growth 'stage 3 (unwalled) short by 75'), R6 (coverage 'the summary is numbers'), R8 (rungs-s8 'plain/s8-convex') — each 1 failed, the rest skipped; R2, R2b, R4, R7 and R8b failed on their pin case in the sweep itself.

**The gates.** `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile` exit 0; `corepack pnpm lint` exit 0 (`lint: eslint 1185 files, 0 errors, 0 warnings`, `lint: probe-red ok`); `corepack pnpm build` exit 0; NEAR at full strength (`corepack pnpm exec vitest run --maxWorkers=1 packages/testkit/test/ladders bench/test/ladder-coverage`, PLAT_FUZZ_RUNS unset) — before any edit 9 files 68 / 68, after the round 9 files 77 / 77 exit 0 (908 s, the final tree); RELATED at 1000 (`PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1` over the seven changed sources — `ladders/{readers,table,coverage,fixtures,types,declared}.ts`, `bench/src/ladder-coverage/index.ts`, final) 93 files, 1 653 passed, 1 failed, exit 1 (2 715 s): the one red is foreign (below); the bench entry exit 0 twice (row 5).

**For the session (not the item's):** (a) RELATED's one red, bench `scan/scan.test.ts` K6-6 — vitest's 5 s default
timeout on the whole-tree scan (5 427 ms here), M0-k-06's, red on M0-b-03's before-images (S7-5 (b)); (b) M0-c-05: the
shortfall after a top-up larger than before it (row 3); (c) M0-c-03: S4's report carries no `routeNodesLimit`, so S4's
law path for `route.nodes` has no test (row 7); (d) M0-x-04 and the stage items: the declarations do not name every rung
the stages report — S1 declares no ladder (its F-RIVER and F-WORK uses are §5.4 `ladderUses`), S3 no F-WORK (its
slice's `route.nodes` `work_cut`), S6 none for the fields' `work_cut` — the reverse of row 1's walk, outside the owns;
(e) K19b, a KI row for M4 (above).

## Closing check of hardening round S1 — this checker's notes (lane `check/M0-x-05-close-s1`, 2026-10-27)

The verdict is `checks/M0-x-05-s1.md` (FAIL on two lines: row 2's carry through `chain()`, CK11, and row 1's fold into
the verdict, CK09). The rows below are the check's other findings; none is a blocker (FAIL SAFE NOW, N-45).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| S1c-1 | **The court decision alone forced (CK03, the builder's K19b) survives, equivalent in practice.** `bentCutFabric.ts`'s `if (area <= run.substitutionMaxCm2)` before the (d) line read as `if (true)` leaves `rungs-s8.test.ts` 11 / 11 and NEAR 77 / 77 green. It changes output only for a face above (d)'s bound whose every straight and every squared foot of (c) is refused (then `unresolved` becomes `court`). No registered family yields one: this check's census (36 runs) and M0-b-03 S7's (F-CUT's 10⁵ faces at seed 1, base and CITY runs) count 0 unresolved faces. N-3's ask is met by its first alternative (#106, cut by (c)'s slide). | A fault-injection pin: S8 run on a face above the bound with a kernel stub (or a test seam on `tryOn`) refusing every split, asserting the face stands `unresolved`, never `court`. | M4 |
| S1c-2 | **The design's §5.2 now holds classes the table does not list.** `docs/ARCHITECTURE.md` §5.2's staged layers' table (l. 9970 – 9971) has `F-WORLD, F-GW, F-PLACE† [V13 §3.16]` and a second `F-SITE† [V14 §3.14]`; `SECTION_5_2` and `STAGE_LADDERS` (40 classes, `table.test.ts`'s `DESIGN_5_2`) list none of them, so `ladders 40`, `tableProblems 0` and "every §5.2 ladder appears in the table once" are judged against the older list. The second F-SITE also breaks the table's one-row-per-class key. | For the session: rule whether M0's table follows the amended §5.2 — three rows deferred to V13, the V14 F-SITE deferred to V14 under a name rule for a repeated class id, `DESIGN_5_2` updated — and hand it to the item's next round, which can take it with this check's two failing lines. | M0 |
| S1c-3 | **The `bugs` fold reaches chain runs only.** The fixtures run on S8's Stage object (`cut/reflex`, `cut/turned-frame`, `cut/mean-normal`, `cut/court`, `work/cut`, `plain/s8`, `plain/s8-convex`), on the registered EnceinteStrategy (`wall/reoffset`, `wall/union-simplify`, `plain/trace`) and on the kernel façade (`work/kernel`, `plain/kernel`) carry no GenerationReport: S8 runs with `report: undefined`, so its stage-end rows report to no sink. Their `bugs` is 0 by construction, not by measurement. | Run the Stage-object fixtures with a counting `ReportSink` (a failed `invariant` counted under `BUGS_LEAF`), or state the scope in a choices row. | M4 |
| S1c-4 | **For the session, not the item: RELATED's one red.** `bench/test/scan/scan.test.ts` K6-6 timed out at vitest's 5 s default (5 087 ms) during the W = 1 RELATED run; replayed alone it passes (9 / 9). This is M0-k-06's whole-tree scan on a 4-core machine; the builder saw it at 5 427 ms. | M0-k-06: give the case an explicit timeout. | M0-k-06 / M4 |

## Hardening round S2 — the builder's notes (lane `build/M0-x-05-fix-s2`, 2026-10-27)

The closing check of round S1 (`checks/M0-x-05-s1.md`, lane `check/M0-x-05-close-s1`) failed the round on two lines,
both "a stated promise with no pin": its mutants CK11 (row 2's own defect) and CK09 (row 1's fold, C-0432 (1)) survived
the whole NEAR set (77 / 77). This round is tests only, inside the owns (`packages/testkit/test/ladders/`); no source
file changed, so no output moves and the summary is not regenerated. Choices row C-0433.

| row | outcome | evidence | mutant (killed by) |
|---|---|---|---|
| **2** (l. 12) — the verdict does not fold in the fixture runs' `bugs`: the carry through `fixtures.ts`'s `chain()` | **PINNED** | New file `test/ladders/chain-bugs.test.ts`: `vi.mock('../../src/ladders/chain.js')` keeps every export and wraps `runChain` so its real run's `report.bugs` gains ONE planted entry (`{ cls: 'F-WALL', entity: 'x05:planted', … stage: 'S3' }`); `LADDER_FIXTURES`' `wall/redraw` `run()` (through `chain()`, so `readRun`) leaves `S3 F-WALL redraw` 1 and `bugs` 1; `stageLadderCoverage({ kernel: ladderCoverage({ draws: 1 }), controls: [], only: ['S3 F-WALL redraw'] })` gives that row `exercised` `{ fixture: 1, control: 0, bugs: 1 }`, `controlBugs` 0, `stageCovered` and `covered` false (the row's `exercised` is the discriminating assertion: `only` leaves the other rows unrun). Green on the tree (13 s with row 1's case). | **CK11** (`chain()` → `readRun({ ...runChain(spec), report: { bugs: [] } })`, the closing check's form verbatim) — KILLED: the pins alone `Tests 1 failed \| 1 passed`, `AssertionError: expected undefined to be 1` (the `bugs` leaf); the item's whole folder (`vitest run --maxWorkers=1 --bail=1 packages/testkit/test/ladders bench/test/ladder-coverage`) exit 1, `chain-bugs.test.ts` the red (15.5 s). |
| **1** (l. 5) — C-0432 (1)'s fold: a declared rung the table does not hold is a table problem of `stageLadderCoverage()` (so of the bench verdict) | **PINNED** | `coverage.test.ts` 'a table that lost a row a stage declares fails the check, with the walker’s message, though every fixture passes': `rows` = `STAGE_LADDERS` without S8's F-CUT `antenna` row, planted fixtures (one per remaining built row, its leaf once), no controls → `tableProblems` exactly `["S8's F-CUT 'antennaSplit' maps to 'S8 F-CUT antenna', which the table does not hold"]` (the walker's message verbatim), every remaining built row reached and clean, `stageCovered` and `covered` false, the summary's `tableProblems` 1. | **CK09** (`coverage.ts` l. 64: `, ...declaredRungProblems(undefined, rows)` dropped from `tableProblems`) — KILLED: the pins alone `Tests 1 failed \| 1 passed`, `AssertionError: expected [] to deeply equal [ Array(1) ]`; the whole folder `--bail=1` exit 1, `coverage.test.ts` the red (286 s). (Its `stageCovered` false is a second independent kill: under CK09 every row is clean, so the verdict reads true.) |

**The self-check (J183).** One mirror, `/home/user/maps-scratch/waves/selfcheck-build-M0-x-05-fix-s2` (a real `cp -a`
of `plat/`; isolation proven: no link into the tree, `@plat/layout` under `packages/testkit/node_modules/@plat/`
resolving inside the mirror). Each mutant applied alone, run on the two pins and then on the item's whole folder with
`--bail=1`, restored from `plat/` and `cmp`-checked; the mirror deleted at the end. 2 mutants, 2 killed.

**The refusal census (J264 (4), N-58), before → after.** No source file changed in this round, so no run of the item's
families can move: the census stands as the closing check measured it on this tree — 36 runs (28 fixtures, 6 controls
including `plain/s8-convex`, N-3's #106, `runBase(FLAT_BLUEPRINT, 1)`): 0 throws, 0 bugs, 0 S8 districts refused,
0 faces unresolved — before and after; the round's NEAR run re-asserts every fixture's and control's `bugs` 0 and
`covered` true (`coverage.test.ts`'s whole report). Never rising; no refusal to class.

**API and texts (J263 Q1, Q6).** No export added, removed or renamed; no message text changed (the walker's message is
pinned verbatim as it stands).

**The gates (the round resumed in a fresh child, 2026-10-27 ~19:42Z, CONTINUE RULE; Intel Xeon @ 2.10GHz 4 cpu 16 GiB,
Node 24.12.0).** `install --frozen-lockfile` 0; `lint` 0 (eslint 1186 files, 0 errors; `probe-red ok`, every planted
probe line reported); `build` 0; NEAR (`vitest run --maxWorkers=1 packages/testkit/test/ladders bench/test/ladder-coverage`,
fuzz size unset) 10 files 79 / 79 exit 0 (702 s; the round S1 set 77 plus the two pins); RELATED@1000
(`PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=1` over the round's two changed test files — no source file
changed, so the selection is those two files) 2 files 18 / 18 exit 0 (211 s).

## Closing check of fix round S2 — this checker's notes (lane `check/M0-x-05-close-s2`, 2026-10-27)

The verdict is `checks/M0-x-05-s2.md` (PASS). CONFIRM-ONLY: round S1's closing check's two failing lines re-introduced
alone in this seat's own mirror (`/home/user/maps-scratch/waves/check-M0-x-05`), each in the previous check's form —
CK11 (`fixtures.ts`'s `chain()` → `readRun({ ...runChain(spec), report: { bugs: [] } })`) turns
`chain-bugs.test.ts` red (`expected undefined to be 1`), CK09 (`coverage.ts` l. 64 without
`...declaredRungProblems(undefined, rows)`) turns `coverage.test.ts`'s round-S2 case red
(`expected [] to deeply equal [ Array(1) ]`); both pins green on the clean mirror (2 files 18 / 18) and NEAR green in
the tree (10 files 79 / 79). Gates install 0, lint 0 (eslint 1186, probe-red ok), build 0, landed:verify ok. Census
re-measured: 34 runs (28 fixtures, 6 controls) 0 throws, 0 bugs, 9 S8 reads with 0 districts refused and 0 faces
unresolved — not risen. No new row: no search beyond the two lines and the gates (the owner's CONFIRM-ONLY rule); rows
S1c-1 – S1c-4 above stand as written.
