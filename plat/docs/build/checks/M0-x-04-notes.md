# M0-x-04: the checker's minor notes for the hardening milestone M4 (lane `check/M0-x-04`, 2026-10-07)

These are MINOR findings from the first check of M0-x-04 (`checks/M0-x-04.md`). None of them fails the item (J180,
N-45). Each one is a known-issue row for the hardening pass, or a note routed to the item or the session it names. The
evidence for each note is in the check file and in `~/maps-scratch/waves/check-M0-x-04/`.

| # | note | evidence | route | label |
|---|---|---|---|---|
| 1 | **S5 refuses on river fixtures that reach a later stage's trace.** On the 900 ha test frame (30 ha walled), S5 refuses on 4 of 12 river runs and ends the run with one bug. River W seed 2: `E_DEGENERATE stretch`. River N seed 1 and seed 6: `E_SELF_INTERSECT F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's`. River N seed 5: `E_INVARIANT trace: gate gate:5 is not on the committed trace at its point (§4.2 S3 (9))`. Each one is detected and refused, never silent. S6 and S8 then do nothing. The code is M0-c-04's S5a trace. M0.md §1 (e) builds only stage 1's trace crossing the river at basic water gates (C-0087), so a later stage's trace across a river is outside M0's built set and refuses. C-0264 (13) lists these as known rare refusals. | probe 1 (`probe-a.jsonl`) and probe 2 (`probe2.jsonl`) | The session: M0-c-04's hardening, plus M0-e-06's integrated harness at the CITY size. The integrated harness should report the S5 refusal rate on river seeds. If the rate stays this high at CITY, a refusal should name its milestone (`notBuilt`) rather than a geometric code. | CONFIRMED |
| 2 | **S5a's batches commit as callback, but §4.1 states "declared" for S5a.** Stage 1's trace and strips (C-0226 (2)) and a later stage's crossing split, trace and strips (C-0244 (8)) pass a callback. The base records this, and `run.test.ts` pins it (`['S5a:callback']` is the only allowed divergence). §4.1 calls callback "always safe", so the divergence fails safe. The design text still says "declared". | the here-bar test; probe 1 (forms on 18 runs) | M0-c-02 and M0-c-04 at M1: move those batches to declared ops, or route a design-text row. | CONFIRMED |
| 3 | **S6's district count exceeds N_d ± 1 on the base test fixtures.** N_d is 7 at about 37–38 ha of land. Flat seeds 1–6 give 11, 12, 11, 15, 14 and 19 districts. River W seeds 1, 3, 4, 5 and 6 give 16, 34, 38, 17 and 25. River N seeds 2, 3 and 4 give 34, 34 and 39. S6's report shows the cause: `merges 0` and `belowFloor` up to 28, so the leftover rule keeps compartments that fall below the band floor. Every run fails safe (S8 refuses no district). The count law is M0-e-04's bar, and M0-e-06 re-judges it at the CITY size. It is not one of M0-x-04's listed bars. C-0266 (4) records it. | probe 1 | M0-e-04 and M0-e-06 | CONFIRMED |
| 4 | **The `enceintes` and `reservations` data keys are not pinned.** Mutant M39 survived: S5's `enceintes` held only S3's enceinte. Mutant M41 survived: S3's `reservations` was `[]`. No base adapter reads either key (S6 takes its wall lines from S5's state and its reservations from the commit's plaza; S6 and S8 declare `enceintes` only for ordering), so only `model.data` changes. A harness that reads `model.data.get('enceintes')` would read a wrong list without noticing. | `m-M39.log`, `m-M41.log` | M0-x-04 at M4: add a `run.test.ts` assertion that `enceintes` is S3's enceinte plus every walled stage's trace enceinte, and that `reservations` is `[plaza]`. | CONFIRMED |
| 5 | **`registerBase`'s doc comment claims an assertion that the code does not make.** The comment says "the set's order is asserted to be §4.1's drawn order (`BASE_ORDER`)", but `registerBase` asserts nothing at run time. The assertion is `table.test.ts`'s. For the fixed set (registerBase refuses a base product that already holds stages) a test catches any change as well as a run-time assert would. Even so, either the comment should say "tested", or a cheap `stageOrder` check against `BASE_ORDER` should run at the end of `registerBase`. | `base.ts:832–844` | M0-x-04 at M4 | CONFIRMED |
| 6 | **`districtValue` falls back to the field's value at the arena origin.** When a district owns no face of the field, `districtValue` returns `field.valueAt({ x: 0, y: 0 })`. This case is unreachable on the fixtures, because every district owns L1 faces and `fieldFaces` covers them. The fallback is still an arbitrary value. The detect-and-refuse form (an `E_INVARIANT` on S8's input) is preferred. | `base.ts:748–749` | M0-x-04 at M4 | PLAUSIBLE (reasoned; unreachable on the probes) |
| 7 | **The "base.ts is the one file" scan is weak.** The table test fails only when a second file names all ten factories. A file naming nine would pass. The checker's own count found every other file naming at most one. A stricter form: no file other than `base.ts` imports more than one stage factory from another item's module. | `table.test.ts:251–276`; the checker's count | M0-x-04 at M4 | CONFIRMED |
| 8 | **The guard catches only a wholly unclaimed perimeter.** The `W_LAND_UNCLAIMED` guard fires only when `landHa === 0`. If a future owner rule left part of the land unclaimed, the guard would not report it. S6's report has `unowned` (0 on every probe run). A soft check that S6's land is at least the land under S5's last boundary, less the reservations and strips, would detect a partial loss. | `base.ts:697`; probe 1 (`unowned 0`) | M0-x-04 or M0-e-04 at M4 | PLAUSIBLE |
| 9 | **The author ran one read-only `git status`.** L-0328 records the author's own note: "one read-only `git status` run by mistake at the start (no git state changed)". The working rules forbid every git command. The command changed nothing and is not a clean-room breach. | `CLEAN-ROOM.md` L-0328 | The session (seat discipline) | CONFIRMED |
| 10 | **S3 throws in a stage set without S5.** S3 commits stage 1's trace and strips at S5's id, so S3's batches need S5's rank. With S5 removed from the registered set, S3 throws `Error: tx: stage 5 has no u8 rank (§4.1's order; M0-x-04's table via env.rankOf)` rather than refusing. The base always registers S5, so this cannot happen on any M0 input. A product that reuses S3 without S5 (PART III) would meet it. | probe 4's first attempt (`p4.log`) | M1 (products) | CONFIRMED |
| 11 | **The order in which S4's built bridges reach S6 is not pinned (closing check `check/M0-x-04-close-r1`).** Mutant F9 (S4's bridges reversed before `siteFeatures`) survived the item's whole test set, because the one fixture that builds a bridge (RIVER, seed 5, 900 ha) builds exactly one (`bridge:8`), so the order of bridgehead seeds among several built bridges is never observed. The result stays deterministic either way (S4's order is canonical), so this is a hardening test, not a wrong result. In the checker's 24-run sweep (rivers from 0 / 9 000 / 18 000 / 27 000 cdeg × seeds 1–6, 900 ha, 30 ha walled) S4 built a bridge on 3 runs and never two; two of the three end in S5's refusals of note 1 (27 000 seed 2 `E_DEGENERATE`, 0 seed 5 `E_INVARIANT`), so the bridgehead path reaches S6 on one honest run only. Suggested handling: a fixture (likely the full CITY frame of the harnesses) where S4 builds two or more bridges on bridgehead-class ways, asserting the bridgehead features follow S4's bridge order. | `~/maps-scratch/waves/check-M0-x-04/close-r1/m-F9.log`, `sweep.jsonl` | M0-x-04 at M4 (or M0-e-06's harness fixture) | CONFIRMED |

## Hardening round S1 (lane `build/M0-x-04-fix-s1`, 2026-10-27)

The session's hardening round of M0-x-04 (J237 (2); the inventory's plan entry 46) on the FIX-NOW rows the inventory
(`checks/hardening-inventory.md`, J355) assigns to the item — M0-c-03:97 17, M0-x-04:12 4, :13 5, :14 6, :15 7, :16 8,
:19 11 — and the queue row Q39 with M0-e-03:140 18 (R4, J490: one façade-door mechanism). Gate: M0-b-03 S7–S8 landed
(0b734e7c; b-03 did not take Q39, its S8 batch path untouched). Choices row C-0443 names every row it closes. Every
source note was read whole; the inventory's fix shape was taken where the code allows it (row 17 and Q39 are the
exceptions, said and reported: each needs another item's file). The only source file changed is `packages/layout/src/pipeline/base.ts`; `pipeline/index.ts` is
untouched and `base.ts`'s 31 export lines are identical (no folder index or barrel export added, removed or renamed,
J263 Q1). The pre-round `base.ts` was re-derived from this round's by undoing its edits and hashes to the landed record's
4ce0382b993c1037…, so every before/after below is against the landed file.

| row | source note | outcome | the change | pin (red without the fix) | mutant(s) |
|---|---|---|---|---|---|
| M0-c-03:97 17 | c-03 notes 17 | REPORTED for the session's ruling (a contract reason: it needs M0-x-05's file too) | built, pinned and killed in this round, then withdrawn: the S3 adapter forwarded after its commit F-WALL's gate rungs, each unserved gate route (F-WORK `work_cut` when route.nodes cut it, then F-ROUTE `unserved`; `gate:<ordinal>` in `unserved`) and the stage-1 trace's F-WALL rungs; the S4 adapter S4's rungs in record order and its unserved parts — rung numbers by the declared ladders, §5.1 tiers, the town root's `route` / `gate.pick` key, an unknown rung refused `E_INVARIANT` (C-0443 (1), (2)). RELATED@1000 then turned `testkit/test/ladders/chain.test.ts` red ('the small river town (seed 2) through S4': the same roots, another report): M0-x-05's chain (`testkit/src/ladders/chain.ts`, C-0269) replicates the S3 and S4 adapters and holds them to the registered adapters' report byte for byte, and `base.ts`'s forwarders are not exported (J263 Q1). The fix lands with M0-x-05's replicas (or an exported forwarder, the session's API ruling) | while built: `report.test.ts` (every rung kind injected into the items' records; the report line for line; the unknown-rung refusal) and a `run.test.ts` case on flat 1, river 1, river 5 — red on the pre-round `base.ts`; both removed with the withdrawal | K1 – K7 (all killed while the forwarding stood) |
| M0-x-04:12 4 | note 4 | PINNED | — (the behaviour was right; the keys were unpinned) | `run.test.ts` *the data keys `enceintes` and `reservations`*: flat and river at seed 1, `enceintes` = S3's enceinte then every walled stage's trace enceinte (enceinte:1, enceinte:2), `reservations` = [S3's plaza] (plaza:0) | M39, M41 (the first check's mutants re-made) |
| M0-x-04:13 5 | note 5 | FIXED and PINNED (the run-time check, the alternative M0-work.json's builds text supports: "asserts the registered set's Kahn order") | `registerBase` runs Kahn's sort over the six adapters and the product's `extraInputs` before it registers anything; another order is a `RegistrationError` naming both orders, the registry left as it was; the comment now says what the code does | `order.test.ts` (new: Kahn's sort wrapped to hand back S4 and S5 exchanged → the error verbatim, the registry's stages and strategies empty) — red on the pre-round `base.ts` | O1 |
| M0-x-04:14 6 | note 6 | FIXED and PINNED (detect and refuse, the form the note prefers) | `districtValue` throws a RangeError naming the district and the field where it read the field at the origin; the S8 adapter refuses first, `E_INVARIANT` "S8: the district <id> owns no face of pass 1's <field> field — no value to cut it by (C-0264 (6), C-0443 (3))", prosperity before density | `table.test.ts`: the RangeError verbatim; S8's refusal for density and for prosperity verbatim, a covered input passing the check — both red on the pre-round `base.ts` | D1, D2, D3 |
| M0-x-04:15 7 | note 7 | FIXED and PINNED (the stricter scan is the row's fix) | — (a test) | `table.test.ts` *no other source file of the shipped packages imports more than one stage factory*: value imports of the ten factories per file over kernel, model, tables, site and layout; `base.ts` imports all ten, every other file at most one. The note's premise ("every other file naming at most one") does not hold for testkit: `testkit/src/ladders/chain.ts` (M0-x-05) imports nine, `testkit/src/edge/chain.ts` (M0-x-06) four and `testkit/src/ladders/fixtures.ts` two — harnesses composing stages, in a package nothing shipped imports (§14); the stricter rule reads the shipped packages, the older "names all ten" test still reads every package (C-0443 (6)) | S1 (a second layout file importing two factories) |
| M0-x-04:16 8 | note 8 | FIXED and PINNED (the soft check) | after S6 commits, the L1 faces under S5's last boundary (a point inside the face, holes counted) that are no water and still owned by no one or by `land:<n>` are counted `W_LAND_UNCLAIMED`, one per face; the stage commits (a partial loss fails safe; the wholly unclaimed case stays C-0264 (9)'s refusal) | `guard.test.ts` *the base S6's soft check*: the pre-fix rule west of x = 0 only — S6 commits districts, `W_LAND_UNCLAIMED` counts 4 faces, fewer than the land-owned faces (the margin's holed face is not counted) — red on the pre-round `base.ts`; `run.test.ts`'s `s6Outcome` holds it at 0 on the honest runs | L1, L2, L3 |
| M0-x-04:19 11 | note 11 | PINNED (a CITY fixture exists; nothing for M0-e-06) | — | `run.test.ts` *S6's bridgehead seeds follow S4's bridge order*: (a) the full CITY frame, a river from the south (18 000 cdeg), seed 5, run through S6: S4 builds bridge:18 (primary, way:6) and bridge:19 (through, way:0), S6 seeds bridge:18/end:0, /end:1, then bridge:19's (148 s here); (b) river seed 5 at 900 ha with a second S1 site made built: `baseS6Input`'s bridgehead features follow the bridges' order and its reverse. Found by a sweep through S4 at CITY (rivers from 0 / 9 000 / 18 000 / 27 000 cdeg × seeds 1 – 6): two or more built bridges on 2 runs — 9 000 seed 2 (five, but S5 refuses F-WALL `E_SELF_INTERSECT` before S6) and 18 000 seed 5 | F9 (the close-r1 checker's mutant re-made) |
| Q39 | docs/M0-FIX-QUEUE.md Q39; x-02 notes 11 | REPORTED for the session's ruling (a contract reason) | nothing built | — | — |
| M0-e-03:140 18 | e-03 notes 18 | REPORTED with Q39 (the same door) | nothing built | — | — |

**Q39 and M0-e-03:140 18 — why the ruled shape is not built here.** R4 places the door in `base.ts`'s `watched`: S8's
batches (and S1's) handed to the runner's batch door so the report counts them. The runner's door is `ctx.batch`
(M0-x-02's `runner.ts`; `BatchSpec` in `registry.ts`), and it does not take a stage's transaction — it builds one: the
work limit from ONE of the stage's declared laws by `spec.counter` over `spec.counts`, `expect` the stage's batch-scope
hard rows, `stage` and `rederivesFrom` the registered id, and it refuses a callback in a declared stage. The batches the
base's stages send carry other limits: S1's L0 batches and S8's district batches sum the five kernel counters' laws
(`site/src/water/stage.ts` `l0WorkLimit`; `infill/bentCutFabric.ts` `districtTxLimit`), and S8 declares only the cut
counters' laws; S3 commits S5a's callback batches at S5's id while S3 registers declared. A façade wrapper that re-sends
them through `ctx.batch` would change their work limits and stamps — the stages' contracts (M0-b-03's, M0-e-03's) — and
the stage's own sink has no other door (`ReportSink` has no work method; `invariant()` refuses a batch-scope hard row).
Probe (mirror, 900 ha, 30 ha walled; flat 1, river 1, river 5): every base stage's `work` line reads 0 on every counter —
S1, S3, S4, S5, S6 and S8, not only S1 and S8 — and S8's `block-floor` (batch, hard) reads pass true, count 0. The
smallest shape for the ruling: an M0-x-02 door that accounts a stage-built KernelTx (`BatchSpec.tx`, or
`PipelineContext.commit(tx, fn, counter)`: the declared id, op form and expect checked, then the batch door's own
accounting — work under `counter`, the expect rows evaluated, kernel warnings, `observe`, work-limit hits); `watched` then
routes every façade `tx` through it (about fifteen lines here, each stage's kernel-counter law named) and C-0316's guard
can read batch rows (x-02 note 11). M0-b-03:17 N-8 (the class floors inert without `env.floors`, a DUPLICATE riding Q39)
rides the same ruling.

**NO-SHIFT (J263) and the refusal census (J264 (4), N-58).** The family: the base runs on the 900 ha frame, 30 ha walled
— flat, river from the west, river from the north × seeds 1 – 6 (the first check's 18-run sweep). Pre-round `base.ts`
against this round's final file, in the mirror: the model root, the stage roots, the records (`ways` … `blocks`) and the
whole report identical on 18 of 18 runs (the census re-run on the final file: every field equal); the soft check counts 0 on all 18. While the withdrawn forwarding
stood the same 18 runs gave the same roots, records and refusals and the report gained its lines (S3's rungs on 9 runs,
S4's on 5 — river W 2: S4's four rungs and `unserved` ['gate:2/in']).
Refusals 3 → 3, identical: river N seeds 1 and 6 S5 `E_SELF_INTERSECT` ("F-WALL: the trace touches itself after the
re-offset and union-simplify rungs; the later rungs are M1's"), river N seed 5 S5 `E_INVARIANT` — M0-c-04's S5a trace
across the river, note 1's class (KI-10): input LAWFUL, the refused geometry OUR OWN INTERMEDIATE, verdict MAKE-IT-SUCCEED
in M0-c-04's round (foreign, unchanged). The round's new refusals — an unknown rung (S3, S4), a district without a value
(S8), a reordered set (registerBase) — are met by no lawful input (0 of 18); each is a contract between items failing.

**Self-check (J183).** K1 – K7 ran while row 17's forwarding stood; every other mutant's code and pin is unchanged by
its withdrawal, and a subset was re-run on the final file — M39, O1, D2, S1, L1 and F9, each killed again by the same pin. In the lane's one scratch mirror (`/home/user/maps-scratch/waves/selfcheck-build-M0-x-04-fix-s1/`, a
`cp -a` of `plat/`: no link into the tree, `@plat/kernel`'s realpath inside the mirror), each mutant applied to the mirror
only and run as `vitest run --maxWorkers=1 --bail=1 packages/layout/test/pipeline/base/` (the item's folder; the item has
no B-FUZZ), then restored from the tree and checked with `cmp` before the next. The clean mirror ran the folder green (48
of 49, then `guard.test.ts` 2 of 2 once its independent bound was corrected — the soft check counted 4 faces where a
vertex-only heuristic of the test's had found 1; the code was right). The new tests on the pre-round `base.ts` fail
exactly the 7 pins of rows 17 (3, since withdrawn), 6 (2), 8 (1) and 5 (1) and pass the other 42.

| mutant | row | the fault | killed by |
|---|---|---|---|
| K1 | 17 (withdrawn) | S3's forwarding call dropped | the withdrawn `run.test.ts` case (river 1's two trace rungs) |
| K2 | 17 (withdrawn) | S4's forwarding call dropped | the same case (river 5's another_site) |
| K3 | 17 (withdrawn) | S4's unserved parts not forwarded | the withdrawn `report.test.ts` (`unserved` lacks 'gate:9/out') |
| K4 | 17 (withdrawn) | S3's unserved id `route:<n>` for `gate:<n>` | the withdrawn `report.test.ts` |
| K5 | 17 (withdrawn) | the slope rung's tier 4 → 2 | the withdrawn `report.test.ts` |
| K6 | 17 (withdrawn) | no F-WORK line before a work-cut route's `unserved` | the withdrawn `report.test.ts` |
| K7 | 17 (withdrawn) | an unknown rung passes silently | the withdrawn `report.test.ts` (the S4 refusal) |
| M39 | 4 | S5's `enceintes` only S3's | `run.test.ts` *the data keys …* |
| M41 | 4 | S3's `reservations` [] | `run.test.ts` *the data keys …* |
| O1 | 5 | registerBase's order check removed | `order.test.ts` |
| D1 | 6 | `districtValue`'s origin fallback restored | `table.test.ts` (the RangeError) |
| D2 | 6 | S8's refusal removed | `table.test.ts` (the S8 refusal; without it the RangeError escapes the stage: a throw where it refuses) |
| D3 | 6 | only prosperity checked | `table.test.ts` (density's refusal) |
| S1 | 7 | a second layout source file importing `s4Stage` and `s6Stage` | `table.test.ts` (the stricter scan; the older scan stays green) |
| L1 | 8 | the soft check removed | `guard.test.ts` (the soft check) |
| L2 | 8 | the interior point from the outer ring only | `run.test.ts`'s here-bar (`s6Outcome`: the margin's holed face counted, `W_LAND_UNCLAIMED` 1 on flat 1) |
| L3 | 8 | the boundary test dropped | `run.test.ts`'s here-bar (the margin face counted) |
| F9 | 11 | S4's bridges reversed before `siteFeatures` | `run.test.ts` (the composition pin; the CITY two-bridge pin alone also red: bridge:19's ends first) |

18 mutants, 18 killed, each by its row's own pin; no survivor, no equivalent.

**New findings (none a blocker; for the session).**

* **N-s1-1 — the same class as c-03 note 17 in the later stages (with row 17's ruling).** S5's own rungs (S5b's F-ROUTE rungs in the growth
  state's `report.rungs`, S5a's F-WALL trace rungs at stages k ≥ 2, S5c's F-NUM, S5d's top-ups), S6's `workCut` and S8's
  per-district F-CUT and F-WORK rungs (`DistrictReport.rungs`, `workCut`) stay in their records and never reach the run's
  report. Each fails safe (the records hold them). Suggested handling: the same forwarding in the S5, S6 and S8 adapters
  with their tiers, in this item's next round or M4.
* **N-s1-2 — CITY refusals met by the bridge sweep (lawful input; foreign).** On the full CITY frame, river seed 5 at
  0, 9 000 and 27 000 cdeg: S3 refuses `E_SELF_INTERSECT` (the stage-1 trace; S1 laid the water, S4 never runs);
  9 000 seed 2: S5 F-WALL `E_SELF_INTERSECT` with five bridges built. For M0-c-02 / M0-c-04 and M0-e-06's integrated
  harness at CITY (note 1's class), seeds as given (`RIVER_BLUEPRINT` with `inflowBearingCdeg` set, `mouth: 'none'`).
* **N-s1-3 — the soft check counts faces, not hectares.** A sliver weighs as a block. Hardening: report the area left
  (ha) beside the count. M4.
* **N-s1-4 — RELATED@1000's foreign reds (the final file and the pre-round one alike).** `testkit/test/edge/repins.test.ts`
  'EP-01/S5a/coincident at seed 1658509524': the cell now reads `absorbed`, not `refused-safe` — red identically on the
  pre-round `base.ts` (mirror), a re-pin another round's success moved (M0-x-06's; a lawful input no longer refused).
  `bench/test/scan/scan.test.ts` K6-6: a 5 s timeout under the full run's load (green alone; the known red of M0-b-03 S8).
* **N-s1-5 — C-0269's replicas and this round's kept changes.** M0-x-05's chain replicates the S6 and S8 adapters: on an
  input no lawful run reaches, its S8 replica calls `baseS8Input`, whose `districtValue` now throws where the registered
  S8 refuses `E_INVARIANT` first, and its S6 replica has no soft check (it counts 0 on every lawful run, so the chain
  test's reports agree). For M0-x-05's next round: mirror S8's refusal and the soft check (with row 17's forwarding).

**Gates on the final file** (W = 1 throughout; the RELATED run re-done in a relaunched container, its first output lost):
`install --frozen-lockfile` 0; `lint` 0 (eslint 1185 files, 0 errors; `probe-red` reports the planted lines, e.g.
`zz-probe.ts:7 Math.random ← plat/math-allowlist, plat/no-nondeterminism`); `build` 0; NEAR (PR size)
`packages/layout/test/pipeline/base/` 4 files 46/46 exit 0; RELATED@1000 over `pipeline/base.ts` 225 files 2818/2819
exit 1 — the one red is N-s1-4's foreign `edge/repins.test.ts` EP-01/S5a/coincident 1658509524 (`absorbed` for
`refused-safe`; S3's S5a outcome, which no change of this round reaches); `landed:verify flow-7 --item M0-x-04` and
`--item build-M0-x-04-notes` ok.

## Closing check of hardening round S1 (lane `check/M0-x-04-close-s1`, 2026-10-27)

New findings of the closing check (`checks/M0-x-04-s1.md`, verdict PASS). None is a blocker (the rule of the brief):
each is a hardening row or a note for the session. Evidence in `/home/user/maps-scratch/waves/check-M0-x-04/close-s1/`.

| # | note | evidence | route | label |
|---|---|---|---|---|
| 12 | **The soft check's exact count is not pinned.** Mutant C15 (each face's first outer-ring vertex in place of `insidePoint`'s interior point) survives the item's NEAR folder (46/46): `guard.test.ts` asserts only `0 < counted < landOwned`, and on 15 partial-loss probes (the guard fixture's pre-fix rule on flat seeds 1 – 3, 900 ha, 30 ha walled, S8 left out; S6 refuses the S1 land faces west of a line at 10 – 50 % of its perimeter's width; every run commits with `bugs` [], 0 to 4 faces counted) C15's counts equal the final file's. A vertex lies on the face's own boundary, so a face touching S5's boundary from outside could be counted or missed; the detection itself holds (C13, C14, C16, C20 killed), and a lawful run counts 0 either way. Suggested handling: assert the guard fixture's exact count (4) and add a face whose first vertex lies on the boundary while its interior is outside. | `m-C15.log`, `m-C15-near.log`, `soft-final.jsonl` = `soft-C15.jsonl` | M0-x-04 at M4 | CONFIRMED |
| 13 | **The soft check's water-parent clause is never exercised.** Mutant C17 (the clause "an L1 face whose L0 parent is a water body's is water" dropped) survives NEAR (46/46) and the 18-run census (byte-identical output): on every fixture an L1 face under a body inherits the body as owner (§2.2 rule 4), so the owner clause already skips it. Redundant in practice, kept for a face whose owner was cleared. Suggested handling: a fixture with an unowned L1 face under a water L0 face, or drop the clause with a comment. | `m-C17.log`, `m-C17-near.log`, `census-C17.jsonl` = `census-final.jsonl` | M0-x-04 at M4 | CONFIRMED |
| 14 | **RELATED@1000's reds are foreign (round S1's N-s1-4 class).** See the verdict's RELATED line for this run's list. `testkit/test/edge/repins.test.ts` 'EP-01/S5a/coincident at seed 1658509524' reads `absorbed` for `refused-safe` (an S3/S5a outcome no change of this round reaches; red on the pre-round file per the builder's 17:13 line and in the seat's first, cut run). | `related/f179.log` (the per-file RELATED@1000 of 2026-10-28: 225 files, 2818 / 2819, this the one red; the bench scan K6-6 timeout of the cut runs green alone), `related.log`, `related.cut-2237.log` | the session (M0-x-06's re-pin) | CONFIRMED |
| 15 | **Disclosures.** The seat's context ended once (22:37) and was resumed in the same container from its CHECKPOINT lines and scratch logs; the RELATED run was re-run whole, cut again at 23:06 by a container restart, and run per test file (the managing seat's ruling of 2026-10-28) in a new container. The notes file (holding the builder's section) was read in the seat's first context; its mutants C1 – C20 are its own shapes, and several re-make the round's named mutants (C1 = M39, C2 = M41, C4 ≈ O1, C7 ≈ D1, C8 ≈ D2, C13 ≈ L1, C18 = F9) on purpose, as the brief asks a closing checker to re-kill each pin's mutant. In the resumed context a grep of the lane log for the item also showed the builder's CHECKPOINT lines, after this seat's mutants and census had run. | the lane log | the session (seat discipline) | CONFIRMED |

## Hardening round S2 (lane `build/M0-x-04-fix-s2`, 2026-11-02)

The session's fix round S2 of M0-x-04 (J704, vetoable): the integration fix of stage group 15's check
(`checks/integration-g15.md`, verdict FAIL on B-1) and RL8's per-owner x-04 line of Q99 (J637; x-02 note 24), with Q138
(x-02 S3's declared shift in this item's pin; x-02 notes 26 and 29). Gate: the g15 FAIL record landed
(`check/integration-flow-7-g15 LANDED` 05:21). Choices row C-0464 names both lines. The source file changed is
`packages/layout/src/pipeline/base.ts` (pre-round sha256 `d1c9d7d6…` = the landed record); `pipeline/index.ts` is
untouched, `base.ts`'s 31 export lines are identical (J263 Q1); `runner.ts` (M0-x-02), `fixtures/flat.ts` (M0-c-01),
`districts/stage.ts` and `districts/table.ts` (M0-e-04) and `@plat/tables` were read, never edited.

| line | source | outcome | the change | pin (red without the fix) | mutant |
|---|---|---|---|---|---|
| LINE 1 — Q138 / g15 B-1 | integration-g15.md B-1; x-02 notes 26, 29; Q138, Q99 | FIXED + PINNED (the test re-pinned against the landed runner; the composition's intent kept) | `run.test.ts`'s composition test builds its expected fixture on the run's view, `flatFixture(1, { frameAreaHa, walledHa, tables: REGISTERED })` with `REGISTERED = tableView(TABLE_IDS, [s6Table()])` — the runner's registered default (`runner.ts:258`), the view `baseSite` hands the site (`base.ts:438`, `tables: ctx.tables`). The registered view, not the site's own, so the test also holds what the run hands S3: new assertions that `site.tables.hash` is the registered view's, is not the bare `tableView()`'s, and carries `s6` (`s6Table()`'s hash). The tail (lines 214 – 242: slice, S4 ways, S5 growth / prune / capacity, ways, gates against the items' own `s3Slice` → `commitS3Slice` → `runS4` → `runS5`) now runs and holds; the test stays at seed 1, so "at least one S5c street" is claimed at seed 1 only (g15 N-2) | **Before** (the tree since x-02 S3, NEAR 45/46): `run.test.ts:211` `canonicalText(restA) !== canonicalText(restB)`, the texts equal but for `"tables":{"hash":…}` — received (the site, registered view) `[3583497132,961889844,1541159756,447780439]`, expected (the bare fixture) `[3142915123,597354915,394476638,1383838904]`. **After**: the composition test green (NEAR 49/49) | X1: the fixture's view reverted to the bare default → the composition test red at the `canonicalText` comparison, the same two hashes (`m-X1.log`) |
| LINE 2 — Q99's x-04 line | x-02 note 24; Q99 (RL8, J637); g15 N-1 | FIXED + PINNED, NO-SHIFT proven | (a) `baseS6Input` takes `ctx.tables` (its context `Pick` gains `'tables'`; every caller already passes the full `PipelineContext` or a test object) and passes it to S6's input (`tables: ctx.tables`) and to `siteFeatures` (`tables: ctx.tables`, whose edge class is read through `s6TableIn`) — Q99's "one registered view threaded through siteFeatures and S6" (J480); `districts/stage.ts:253`'s fallback is no longer reached from the base. (b) `baseArena`'s default view is the registered one, `tableView(TABLE_IDS, [s6Table()])` (the runner's model); `runBase` hands it `options.tables` when given (unchanged), so the arena's frame and the stages read one view | `run.test.ts` *flat: S6's input …*: the context carries `REGISTERED` and `inp.tables` is that very view. `view.test.ts` (new; `siteFrame`, `s6Stage`'s `inputsOf` and `siteFeatures` wrapped by `vi.mock` to record the view each is handed): `baseArena(BP)` reads the registered view (hash, `s6`), `baseArena(BP, BARE)` the view handed; `runBase(FLAT 900/30, 1)` with no view — every frame read, S6's input and its sited features carry the registered view's hash; handed a view — each is that very view. Red on the pre-round `base.ts` (T1, T2, A1 are its three differences) | T1 (S6 input's `tables` dropped) → `run.test.ts` S6-input pin; T2 (`siteFeatures`'s `tables` dropped) → `view.test.ts` (no view); A1 (`baseArena`'s bare default restored) → `view.test.ts` (baseArena); A2 (`runBase` not handing `options.tables` to the arena) → `view.test.ts` (handed a view) |

**NO-SHIFT (J263) and the refusal census (J264 (4), N-58).** The family: the base runs on the 900 ha frame, 30 ha walled
— flat, river from the west (27 000 cdeg, `RIVER_BLUEPRINT`), river from the north (0 cdeg) × seeds 1 – 6, the 18 runs
of round S1's census. The pre-round tree (the mirror before any edit) against the final tree, one probe
(`census.mts`: `runBase` per run, the model root, every stage root, the whole report's canonical text and every data
key's canonical text, hashed): `census-pre.jsonl` and `census-post.jsonl` are byte-equal (18 runs, 27 data keys each,
`cmp` exit 0). No output moved: the bare and the registered view hold the same cells for every table S6 and the frame
read (S6 fell back to `s6Table()` itself), so the change is the view's identity and hash alone, and no stage's output
reads the hash. Refusals 2 → 2, identical: river N seeds 1 and 6, S5 `E_SELF_INTERSECT` (M0-c-04's S5a trace across the
river, note 1's class, KI-10: input LAWFUL, geometry OUR OWN INTERMEDIATE, verdict MAKE-IT-SUCCEED in M0-c-04's round;
foreign, unchanged by this round). Round S1 counted 3 on the same family; river N seed 5's `E_INVARIANT` has since been
absorbed by a dependency's round (it commits in both images here). The round adds no refusal.

**Self-check (J183).** One mirror, `/home/user/maps-scratch/waves/selfcheck-build-M0-x-04-fix-s2/plat` (a `cp -a` of
`plat/` taken before the first edit; `find … -lname '/home/user/maps-architecture*'` printed nothing and
`@plat/kernel`'s realpath lay inside the mirror). The mirror served first as the pre-round image for the census, then
held the final files; each mutant was applied to the mirror only, run as `vitest run --maxWorkers=1 --bail=1
packages/layout/test/pipeline/base/`, and restored from the tree with `cmp -s` before the next. 5 mutants, 5 killed,
each by its line's own pin; no survivor, no equivalent. The mirror was removed when done.

| mutant | line | the fault | killed by |
|---|---|---|---|
| X1 | 1 | the composition fixture on the bare `tableView()` (the pre-round test) | `run.test.ts` *S3's site is the flat fixture's …* (`canonicalText`, `tables.hash`) |
| T1 | 2 | `baseS6Input` drops S6's `tables` | `run.test.ts` *flat: S6's input …* (`inp.tables`) |
| T2 | 2 | `baseS6Input` drops `siteFeatures`'s `tables` | `view.test.ts` *runBase with no view …* |
| A1 | 2 | `baseArena`'s default back to the bare `tableView()` | `view.test.ts` *baseArena's frame …* |
| A2 | 2 | `runBase` builds the arena on the default, not the run's view | `view.test.ts` *runBase handed a view …* |

**Reported (not built; other items' lines).** `fixtures/flat.ts:43`'s own default (`opts.tables ?? tableView()`) stays
M0-c-01 S4's RL8 line: this round re-pins the test instead (the narrower owner note 26 names); changing the fixture's
default would move `site.tables` for every other caller. `districts/stage.ts:253` and `districts/table.ts:112` are
M0-e-04's (done in e-04 S4, J686). Callers outside the owns that compose the same pieces — `testkit/src/ladders/chain.ts`
(M0-x-05) and `bench/src/site/compose.ts` (M0-e-06) call `baseS6Input` with the runner's full context and so read the
run's view too (the same cells; no output moves), and every harness calling `baseArena(bp)` now builds its frame on
the registered view (the same frame).

**Gates on the final file** (W = 1 throughout): `install --frozen-lockfile` 0; `lint` 0 (eslint 1277 files, 0 errors,
`probe-red ok`); `build` 0; NEAR (PR size, seed 204415723) `packages/layout/test/pipeline/base/` 5 files 49/49 exit 0;
RELATED@1000 over `pipeline/base.ts` (fast-check seed -353090509; 9 613 s at W = 1, informative) 259 files 3310/3310
exit 0 — no red, the g15 run's foreign edge reds (N-5) included; `install`, `lint` and `build` re-run 0 after the last edit.
Logs and the probe in
`/home/user/maps-scratch/session-fix/x04-s2/`.

## Closing check of hardening round S2 (lane `check/M0-x-04-close-s2`, 2026-11-02)

New findings of the closing check (`checks/M0-x-04-s2.md`, verdict PASS). None is a blocker (the rule of the brief):
each is a hardening row or a note for the session. Evidence in `/home/user/maps-scratch/waves/check-M0-x-04/close-s2/`.

| # | note | evidence | route | label |
|---|---|---|---|---|
| 16 | **S6's second-half test recomputes pass 1 on the bare view.** `run.test.ts`'s *S6's second half …* test (`:499`, `:510`) recomputes `fieldsPass1(…, tableView(), stream)` on the bare view, while the base hands pass 1 the run's view (`base.ts:794`, `ctx.tables`, the registered one since x-02 S3). The cells are equal today, so the comparison holds; if a field cell ever entered the registered view differently, this test would go red for the test's own view, not the base's. Suggested handling: recompute on `REGISTERED`, as the composition test now does. | `run.test.ts:499`, `:510`; `base.ts:794` | M0-x-04 at M4 | CONFIRMED (read; the test is green in NEAR) |
| 17 | **Two tests hand `baseS6Input` a context without a view.** The bridgehead-order test (`run.test.ts:392`, `ctx = { seedKey, streamOpts }` cast `as never`) calls `baseS6Input` with no `tables`, so S6's input and `siteFeatures` take `undefined` and fall back to `s6TableIn`'s own table — the very path LINE 2 closes for the base run. The cast hides the type the round widened. Only bridgehead ids are compared (the same cells), so the result is right. Suggested handling: give the test's context `tables: REGISTERED`, as the S6-input test at `:321` does. | `run.test.ts:392 – 394` | M0-x-04 at M4 | CONFIRMED (read) |
| 18 | **The base family's two refusals remain (routed again, with seeds).** River from 0 cdeg (900 ha / 30 ha walled), seeds 1 and 6: S5 `E_SELF_INTERSECT` (F-WALL after the re-offset and union-simplify rungs). Input LAWFUL, geometry OUR OWN INTERMEDIATE (M0-c-04's S5a trace of a later stage across the river; row 1, C-0264 (13)), verdict MAKE-IT-SUCCEED. Identical before and after this round (2 → 2). | `census-pre.log`, `census-post.log` | the session (M0-c-04's round) | CONFIRMED |
| 19 | **Harnesses that call M0-x-02's `run` directly build the arena on `baseArena`'s default.** `bench/src/fusion/runs.ts:350`, `fusion-ng/hoods.ts:208`, `site/compose.ts:304`, `testkit/src/edge/chain.ts:342`, `ladders/chain.ts:275` and several layout tests pass `arenas: () => [baseArena(bp)]` and no `tables`; since this round the arena and the runner's stages read the same registered view there (before, the arena read the bare one; the frame is equal on both). A caller that handed `run` a variant view while keeping `baseArena(bp)` would read two views; none does today (grep of every call site). Suggested handling: route such harnesses through `runBase`, or pass the same view to both. | the call-site grep (this check) | the session (M0-x-05 / bench owners), M4 | CONFIRMED (grep) / PLAUSIBLE (the variant case) |
| 20 | **`baseS6Input`'s context type widened (informative, API accounting).** Its `ctx` parameter is now `Pick<PipelineContext, 'seedKey' \| 'streamOpts' \| 'tables'>`. No export was added, removed or renamed (31 `^export` lines before and after, J263 Q1), and the row asks for the view through the context; the callers outside the owns (`testkit/src/ladders/chain.ts:196`, `bench/src/site/compose.ts:235`) pass a full `PipelineContext`, and `build` is green. | `base.ts:634`; `corepack pnpm build` exit 0 | none (recorded) | CONFIRMED |
| 21 | **Disclosures.** The RESUME rule's grep of the lane log for the item showed the builder's CHECKPOINT and LANDED lines before this seat planned its probes; the seat's mutants K1 – K11 and its census probe are its own shapes (K1, K4, K5, K6 and K7 re-make the round's X1, T1, T2, A1 and A2 on purpose, as the brief asks a closing checker to re-kill each pin's mutant). The round's notes section was read after the probes were planned. The pre-round image is a behavioural reconstruction (the round's four code lines reverted; its doc comments kept), sha256 `81cb3d89…` rather than the record's `d1c9d7d6…`, since no seat runs git. Harness-injected context (the account's e-mail, a git-attribution reminder, the tool listing) was not used. | the lane log; `pre-base.ts` | the session (seat discipline) | CONFIRMED |

## Hardening round S3 (lane `build/M0-x-04-fix-s3`, 2026-11-10; the M0 hardening phase's round S3 of M0-x-04, J237 (2), J238; rows x-04:16 and x-04:17, the second re-triage, J722 / J734; leg 2 of the merged round M0-x-02 + M0-x-04, J443)

The builder's row-by-row outcome. Both rows are test-only: `packages/layout/test/pipeline/base/run.test.ts` is the one
file changed (pre-round sha256 `3f4e7cfa…` = the landed record). No source file changed: `pipeline/base.ts` (`7a8e6247…`)
and `pipeline/index.ts` (`0bb743c7…`) are byte-equal to the record, so no export moved (J263 Q1) and no output can move
(NO-SHIFT: tests). Leg 1 (M0-x-02 S4, closed PASS 06:03) was read in its notes section 'Hardening round S4': its
`runner.ts` / `report.ts` / `registry.ts` changes (the batch door's optional `workLimit`, `warning` refusing an `E_` code,
the class-floor count) touch nothing this round's two tests compose — the base's warnings are `W_LAND_UNCLAIMED` — and
nothing of it was edited. The choices row is C-0485.

| row | source | outcome | the change | pin (red without the fix) | mutant(s) |
|---|---|---|---|---|---|
| x-04:16 — pass 1 recomputed on the bare view | note 16 (this file, closing check of S2) | FIXED + PINNED | `run.test.ts` › *S6's second half …* recomputes `fieldsPass1` on `REGISTERED` (`tableView(TABLE_IDS, [s6Table()])`, the runner's registered default, which the run — handed no view — gives every stage, and which `base.ts` hands pass 1 as `ctx.tables`), both in the record comparison and in the `without(…)` probes; it was the bare `tableView()` | the test itself: under the planted condition the note names (a field cell enters the registered view differently) the corrected test holds the base that hands pass 1 the run's view and goes red when the base hands it the bare one; the old form is red on the right base (its own view, the note's false red) and green on the wrong one (blind) | P16 (condition alone): new green, old RED; P16 + D16 (the defect): new RED, old green; D16 alone: equivalent today (below) |
| x-04:17 — `baseS6Input` handed a context without a view | note 17 (this file, closing check of S2) | FIXED + PINNED | `run.test.ts` › *river at seed 5 with a second S1 site …* gives its context `tables: REGISTERED` and asserts the composed input carries that very view (`made.value.tables` `toBe` `REGISTERED`) on each call; both `baseS6Input` calls of the file (this one and *flat: S6's input …*, which already carried the view) now pass the context typed, without the `as never` cast, so a context without `tables` is a `tsc -b` error (TS2345) | the test itself: red when `baseS6Input` drops the context's view (S6's input and `siteFeatures` take `undefined`, the path x-04 S2 closed for the run), green on the tree; the old form (no view, cast) is green on that defect (blind) and, under a fallback table that differs from the view's, red on the right base (its own missing view) | D17: new RED, old green; P17: new green, old RED; P17 + D17f: new RED; D17f alone: equivalent for this test, killed by `view.test.ts` (x-04 S2's T2); M17c: the old context without the cast → `tsc -b` TS2345 |

**Self-check (J183).** One mirror, `/home/user/maps-scratch/waves/selfcheck-build-M0-x-04-fix-s3/plat`, a `cp -a` of
`plat/` taken before the first edit (node_modules included); `find … -type l -lname '/home/user/maps-architecture*'`
printed nothing and `packages/layout/node_modules/@plat/tables` resolved inside the mirror. A driver
(`/home/user/maps-scratch/waves/x04-s3-work/mutants.py`) restored every file it touches from the tree with a byte compare,
planted the mutant in the mirror only, set the test form — `new` (the tree's corrected `run.test.ts`) or `old` (the
pre-round copy, sha256 `3f4e7cfa…`) — and ran `corepack pnpm exec vitest run --maxWorkers=1 --bail=1
packages/layout/test/pipeline/base/ -t <the row's test>` in the foreground, one at a time; the mirror was compared equal
to the tree after the last (`cmp -s`, 4 files). Control (no mutant, new form): the three tests green.

| mutant | row | the fault planted in the mirror | new form | old form |
|---|---|---|---|---|
| P16 | 16 | the condition note 16 names: a field cell enters the registered view differently — `fields/table.ts` `fieldsCells` reads ε's share halved from a view that carries `s6` (the registered view does, the bare one does not) | green (the base hands pass 1 the run's view; the test recomputes on it) | **RED** — `fieldsText(got)` ≠ the bare recompute: the test's own view (the note's false red) |
| P16 + D16 | 16 | P16, and `base.ts`'s pass 1 handed the bare `tableView()` instead of `ctx.tables` (the defect) | **RED** — the base's record ≠ the recompute on the run's view | green (blind: it recomputes on the same wrong view) |
| D16 | 16 | the defect alone | green | — |
| D17 | 17 | the defect note 17 describes: `baseS6Input` drops the context's view — S6's input and `siteFeatures` take `undefined` (`s6TableIn`'s own table) | **RED** — `expected undefined to be { … (hash, tables) }` | green (blind: no view handed, ids compared only) |
| P17 | 17 | `s6TableIn`'s fallback (no view) answers a table whose edge class differs from the view's `s6` (`minBarrierClass` `'lane'`) | green (the view's `s6` is read) | **RED** — `expected [] to deeply equal ['bridge:0/end:0', …]`: its own missing view |
| P17 + D17f | 17 | P17, and only `siteFeatures` handed `undefined` | **RED** — the bridgehead seeds vanish | (red under P17 alone already: it cannot tell the defect from its own context) |
| D17f | 17 | `siteFeatures` alone handed `undefined` | green (the cells are equal) — killed in the folder by `view.test.ts` › *runBase with no view …* (x-04 S2's T2) | — |
| M17c | 17 | the old context (no `tables`) with the cast removed | `tsc -b packages/layout/test` exit 1: TS2345 *Property 'tables' is missing … 'Pick<PipelineContext, "tables" \| "seedKey" \| "streamOpts">'* | (the old form's cast compiled) |

**Equivalent survivor (one line).** D16 alone survives the folder today: the bare and the registered view hold the same
`fields` and `bands` cells (a registered table can never replace a shipped one, `tableView`), so pass 1's output is
identical. **KI (hardening pass, not a fail):** an observation of the view pass 1 is handed — as `view.test.ts` observes
S6's and `siteFeatures`' — would kill D16 outright; route with the hardening pass.

**Refusal census (J264 (4), N-58).** No source file changed, so the before and the after are the same code; the family was
run once on the tree as the record: the base runs on the 900 ha frame, 30 ha walled — flat, river from the west
(27 000 cdeg), river from the north (0 cdeg) × seeds 1 – 6, 18 runs (`census.ts`: `runBase` per run, the model root, the
bugs). Refusals 2 → 2: river N seeds 1 and 6, S5 `E_SELF_INTERSECT` (M0-c-04's S5a trace across the river; note 18's
class: input LAWFUL, geometry OUR OWN INTERMEDIATE, verdict MAKE-IT-SUCCEED in M0-c-04's round; foreign, unchanged). The
other 16 runs commit with no bug.

**Not built here.** Note 19 (harnesses calling M0-x-02's `run` with `baseArena`'s default) is deferred to M1 by the
session's queue row (not this file's owner's write). Note 18 stays routed to M0-c-04.

**Gates on the final file** (W = 1 throughout): `install --frozen-lockfile` 0; `lint` 0 (eslint 1283 files, 0 errors,
`probe-red ok`, 9 whole-tree checks); `build` 0; NEAR (PR size, fast-check seed 981381075)
`packages/layout/test/pipeline/base/` 5 files 49/49 exit 0 (395 s, informative); RELATED@1000 over `pipeline/base.ts` and
`pipeline/index.ts` (fast-check seed 1237414782; 7 610 s at W = 1, informative) 259 files 3316/3316 exit 0 — no red;
`lint` re-run 0 after the last edit of this section. Logs and probes in `/home/user/maps-scratch/waves/x04-s3-work/`;
the mirror was removed.

## Closing check of hardening round S3 (lane `check/M0-x-04-close-s3`, 2026-11-10)

New findings of the closing check (`checks/M0-x-04-s3.md`). None is a blocker (the rule of the brief): each is a hardening
row or a note for the session. Evidence in `/home/user/maps-scratch/waves/check-M0-x-04/close-s3/`.

| # | note | evidence | route | label |
|---|---|---|---|---|
| 22 | **The base handing pass 1 the bare view survives the round's pins (equivalent at M0).** Mutant K16a (`base.ts` S6's second half: `fieldsPass1(…, tableView(), stream)` for `ctx.tables`) is green under the corrected test and green over the whole NEAR folder (`F-K16a.log`: 5 files, 49/49): a `View` can never replace the shipped `fields` / `bands` tables (`tables/src/loader/view.ts:85`), so every view `tableView` builds gives pass 1 the same cells. Only a hand-built `TableView` object (structural, as `bench/test/site/compose.test.ts:256` builds one for `fieldsReceipt`) handed to `runBase` could tell — no caller does. The round's pin needs it only with a perturbed view (K16c: red). Suggested handling: observe the view pass 1 receives, as `view.test.ts` observes S6's and `siteFeatures`'. | `m-K16a-*.log`, `F-K16a.log`, `m-K16c-new.log` | M0-x-04 at M4 | CONFIRMED (equivalence: PLAUSIBLE, reasoned from view.ts) |
| 23 | **Row 17's pin observes S6's input view, not `siteFeatures`' one.** K17b (`siteFeatures` handed no view inside `baseS6Input`) is green in the bridgehead test (the fallback `s6Table()` is the registered `s6`); under P17 (a fallback that differs) the corrected test is red (K17d). Over the NEAR folder K17b is killed by `view.test.ts` (`F-K17b.log`: 2 failed, 47 passed — both of its runBase view tests). Informative: the folder holds it. | `m-K17b-new.log`, `m-K17d-new.log`, `F-K17b.log` | none (recorded) | CONFIRMED |
| 24 | **Disclosures.** The lane log's lines for M0-x-04 (the builder's CHECKPOINT and LANDED lines) were seen when the seat looked for its own lane's lines, before planning; the seat's plan (`plan.md`) was written before it read the body of the section 'Hardening round S3'. The OLD form of `run.test.ts` used for the old-versus-new runs is the builder's pre-round copy (`/home/user/maps-scratch/waves/x04-s3-work/run.test.old.ts`, not a selfcheck folder), taken as evidence only after its sha256 `3f4e7cfa…` matched the S2 LANDED line's `run.test.ts (3f4e7cfa)` and its `diff` to the tree showed exactly the round's edits. Harness-injected context (a git-attribution reminder, the tool, skill and connector listings) was not used. | the lane log; `run.test.old.ts` | the session (seat discipline) | CONFIRMED |
