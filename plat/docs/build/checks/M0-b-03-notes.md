# M0-b-03 — the check's minor notes (for the hardening milestone M4; none of them fails the item)

These notes come from the independent check of M0-b-03 (lane `check/M0-b-03`, 2026-10-06). The verdict is in
`checks/M0-b-03.md`. Each row below is minor under J180 and J202. It fails safely, it is reported, or it lies outside
the item's listed tests and bars. Each row names its handling and its milestone. "Survivor" means a targeted mutant
of this check that the near set and the related set both left green.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **All S8 blocks are `deep` under today's tables.** Probe 2 made 20 two-district runs (seeds 7–11 × prosperity 0.1 / 0.3 / 0.6 / 0.9). 957 of their 958 blocks were `deep` (for example seed 7 at 0.3: `"blocks":48,"deep":48`). This is the 0.6 × d̄ test of N-27, applied to blocks that stop at an OBB minor ≥ e_lo = 2·d_lo. The design says the depth rows are re-fitted at M-1 under this reading (§4.6 step 1, E12). Until then the deep test separates nothing. | This is a calibration matter, not a code fault. M0-c-07a / M-1 re-fit the depth rows. M0-c-06's statistics should read the deep share as uncalibrated until then. | M-1 / M0-c-07a |
| N-2 | **About half of the `back_lane` and `through_alley` treatments are refused by the block floor.** The spine halves a deep block, and a child of thickness ≈ ½·t falls below d_lo. Over probe 2's 20 runs, 180 spines were cut and 181 were refused: 167 by `width`, 8 with no candidate (`none`) and 6 by `continuation-class`. Each refused block keeps a `court` and is reported `W_DEEP_SPINE_REFUSED`, so the drawn shares drift toward `court` (§13.5's court-share keep-test). The outcome fails safely and is reported. | Re-read the floor for a spine's children (a half block is one plot row deep), or draw the spine treatments only where t ≥ 2·d_lo + w. This needs a choices row. Re-judge with N-1's re-fit. | M1 (with the court-share row) |
| N-3 | **The substitution rung's area bound has no test (survivor K19).** `area <= run.substitutionMaxCm2` was forced true and every test stayed green. Under C-0085, M0-x-05 owns F-CUT's per-rung ladder coverage. | M0-x-05: add a fixture of a face above 2·e_hi² that reaches (d). It must be cut by (c)'s slide or stand `unresolved`, and never become a court. | M0-x-05 |
| N-4 | **The reflex pre-cut and the antenna split are unit-tested only (survivors K38 and K37).** Disabling either one inside the S8 run leaves every test green. The functions themselves are tested in `ladder.test.ts`. | M0-x-05: add an S8-run fixture for each (an L-shaped face deeper than d̄, and a face wrapped round a cul-de-sac antenna). | M0-x-05 |
| N-5 | **`W_CUT_SLID` reporting on an S8 run has no test (survivor K39).** Probe 2 saw it fire (seed 11 at prosperity 0.1: `"W_CUT_SLID":56`). The slide's order is unit-tested. | M0-x-05: assert the warning and its step count on a slide fixture. | M0-x-05 |
| N-6 | **Step 10's continuation wiring (`nearestJunction` → `continuationVerdict`) has no integration test (survivor K23).** No probe run formed a crossroads: junction kinds over 479 faces were only `T` 10 667 and `end` 6 076. The rule itself is unit-tested. | Add a fixture whose cut lands within attractCm of an interior lane's junction: collinear within 6° admitted, otherwise refused. Add a second fixture on a bounding spine, which is always refused. | M4 |
| N-7 | **`Portal.bearing` direction is not pinned (survivor K44).** The portals test accepts 90° or 270° on either side, so a bearing reversed out of the district passes. The code is right: probe 2 checked each portal's bearing against its district's side and found `bearingWrong` 0 over 207 portals in 20 runs. The field is persisted in the `Seam` record. | Assert 270° for the west district's portals and 90° for the east district's. | M4 |
| N-8 | **`KernelTx.expect` with `BLOCK_FLOOR_ROW` is inert at M0 (survivor K31, equivalent).** The kernel checks a classFloor entry only when `env.floors` is injected (`tx.ts` l. 395). No M0 S8 kernel injects floors, and the code's own `judge` plus the post-split check enforce the floor. C-0237 (2) warns that an env that injects floors must restrict `block` to the batch's district faces. | Integration: when M0-x-04 / the runner inject floors, give `appliesTo` for `block`. | M0-x-04 / M1 |
| N-9 | **S8's stage-end row `seam-portals` is declared but never evaluated.** No check named `seam-portals` exists in the code, and `runS8` does not call `portalInvariant`. The runner's report would show it passing with count 0. S8 also issues its tx through `input.kernel` and draws through its own `createRng`, not through `ctx.batch` / `ctx.stream` (C-0237 (9), (11) declare this). | Wire `portalInvariant` into the stage end, or into the runner's check table. Route S8's batch and draws through the runner when M0-x-04 registers it. | M0-x-04 / M0-c-06 |
| N-10 | **T34-1's commit clause is judged on the stop-test blocks only.** Blocks that are `court` (rung (d)), `unresolved`, `work` or `empty` are not judged. This follows the brief ("rungs (b)–(d) run only on faces whose τ test passed"). A court block comes from a face whose minor was ≥ τ, so the design's "every block S8 commits" cannot hold for it literally. No choices row states the reading in so many words. | Add one sentence to a choices row: the commit clause covers the blocks the stop test made, and a substitution, F-WORK or tier-6 block is exempt by construction. | M4 |
| N-11 | **A failed undo can leave an orphan lane.** If `takeOut`'s `removeEdges` fails after a split, `tryCandidate` returns `floor-undo` / `end-rows-undo` and the ladder continues. The lane's edges may then remain with no `Way` record. No probe reached it (PLAUSIBLE only). | Prefer detect-and-refuse: on an undo failure, abort the district batch (it is rejected and reported). | M4 |
| N-12 | **Fallback constants stand in where a table cell is unreadable.** `continuationCdeg` falls back to 600 and `softShare` to 0.05 when the cut cell is not a number. The cells exist today. | Refuse (`stopError`) the way the other cut cells do. | M4 |
| N-13 | **The superseded `interior.json` `settings.deepFactor` = 2 stays in the table, unread** (C-0237 (6)). M0-c-07a owns the file, but its brief names "the deep-interior shares", not the factor. | Session: put the factor's re-fit in M0-c-07a's hand-over explicitly, or stage the cell. | M0-c-07a |
| N-14 | **The test support `faceCase` cannot always find the district face.** On `round-joined` at seedFamily `check-m0b03/s/round-joined` i = 2 it threw "the district face was not found": the inserted ring's vertices differ from the generator's polygon. The PR sample of 3 faces per kind does not hit it. | Locate the face by a point inside it (`pointLocate`), not by ring equality. | M4 |
| N-15 | **The residue soft bound was exceeded on 24 of 479 one-face districts in probe 1** (share 1.0 on small triangular and curved faces whose one face reached (d)). This is the design's soft bound, and it is reported (`residueSoftExceeded`). | M0-b-04 reports the per-district residue on its 10⁵ run. | M0-b-04 |
| N-16 | **The 'end-rows' touched mark has no test (closing check of fix round S1, survivor K03).** `tryCandidate` marks an 'end-rows' / 'end-rows-undo' refusal `touched`, so the ladder re-locates the face (C-0243 (1)). Removing that mark leaves near (73/73) and related at 1000 green. No honest input reached an 'end-rows' refusal: 0 in 1 000 whole districts at seed 1, 460 at seed 2 and 100 two-district runs (lane `check/M0-b-03-close-s1`). The code is right by reading. | Add a fixture that forces an end row to fail (for example a seam whose portal row is refused) with a later candidate on the same face, and assert no throw and a cut on the live slot. | M4 |
| N-17 | **The detect-and-refuse path of C-0243 (3) has no test (survivors K07, K10, K11, K12).** Mutants that commit an abandoned run, or that let the ladder or the stack go on after abandonment, or that drop the 'floor-undo' abandonment, all stay green: no test reaches abandonment. The checker forced it in probe-only copies (A1: `faceAgain` null; A2: `takeOut` failing) on F-CUT holed #330 and #464 at seed 1. Each run returned a typed `E_INVARIANT` refusal with no throw and 0 lanes / 0 blocks, and the L0–L2 recomputed digests were unchanged (CONFIRMED). | Add a test that injects the failure (a test hook on `faceAgain` / `takeOut`, or a kernel stub whose `removeEdges` refuses) and asserts the refusal, no commit and unchanged digests. | M4 |
| N-18 | **Equivalent survivors of the re-location's guards (K06, K08, K09, K13).** K06: locating from the item's first slot rather than the view's falls to the same seed point. K08 / K09: the ring check and the owner check never fire, because `removeEdges` restores the face (§2.2 rule 3; 20 / 20 floor refusals came back ring-equal). K13: re-locating after an untouched refusal returns the same view. | None (one-line note, J169). | — |
| N-19 | **A refused district batch leaves stale entries in the shared `widths` map.** `tryCandidate` writes each lane's width into `ctx.widths` (the stage's shared map). When the district's transaction is refused (C-0243's abandonment, and before it any kernel refusal of the batch), the arena rolls back but the map keeps widths for lane ids that no longer exist (forced probe: `widths 0->3` on #330, `0->10` on #464, no lane committed). This predates the fix. No reader enumerates the map, and a re-minted id is re-set before use. | Snapshot the map in `partition` and restore it when `k.tx` refuses. | M4 |
| N-20 | **Two equivalent survivors of the N-52 (4) refusal (closing check of fix round S2, lane `check/M0-b-03-close-s2`).** K10 (`makeBlock`'s `if (t.ok && !t.slit)` read as `if (t.ok)`) and K12 (the pre-kernel 'slit' refusal marked `touched: true`) leave near (12 files, 75/75) green. Both are equivalent, by reading: `makeBlock` is the only caller that passes `slitAllowed` false, the refusal returns before `connectHole`, so that call can never return `ok` with `slit` true; and `makeBlock` never reads `touched` (only the ladder does, bentCutFabric.ts ~1077). The `!t.slit` test in `makeBlock` is now dead code that is kept as a guard. | No test needed. If a later change lets `makeBlock` accept a slit (or reuse `tryCandidate` with `slitAllowed` false elsewhere), re-add a pin that the deep spine's `TryResult` is never `ok` with `slit` true. | M4 |
| N-21 | **A deep block whose spine runs onto a hole now keeps a court, even where a parallel spine clear of the hole would halve it.** The fix refuses the slit and does not try again (C-0288 (2)). In this checker's probe (450 holed one-district lands: off-centre holes, two holes, parallelograms; prosperity 0.3 / 0.7; seeds 1–5), 18 of 98 deep rungs are refused 'slit', and every one of them leaves a court. All of these fail safely: no lane stays in the arena, the ways agree with the blocks, and `W_DEEP_SPINE_REFUSED` is counted. | Quality, not safety (N-45). At hardening, try one spine offset off the hole (or a spine parallel to the hole's long side) before falling back to the court, and count how many courts that recovers. | M4 |
| N-22 | **Two detector branches of `portalInvariant` have no pin of their own (closing check of session fix round S3, lane `check/M0-b-03-close-s3`; survivors K15, K21).** (a) K21: the `unresolved` branch replaced by a silent `continue` leaves the near set (13 files, 89/89 at the time of the check, plus `districts/integration.test.ts` and `pipeline/base/run.test.ts`) green. For S8's own records the row still refuses, because a baseLane portal whose vertex does not resolve leaves its lane end without a portal (`lane-end-without-portal`). A planted EXTRA baseLane portal whose `at` resolves to nothing, beside the lane end's real portal, passes the mutated row. That is a deliberate-writer escape on a detector branch that predates the round (the pre-S3 `portalInvariant` had the same branch and no pin). (b) K15: the per-vertex `two-portals` check removed also leaves the near set green. The row's verdict is unchanged for S8's records: two portals at one vertex of a spine are 0 m apart, under the 6 m minimum gap, so the row reports `gap` and refuses (the checker's own runner probe, a phantom portal with a new id at a real portal's vertex, was refused under K15 with `{ pass: false, count: 1 }`). Only the problem's label differs. The one case the gap check cannot see is a non-baseLane portal recorded in a seam whose way chains do not pass through its vertex, which is another stage's wrong record. (c) For the record, with no action needed: when S8 has no input (river seed 2, where S5 is refused before S6), the `seam-portals` line reads `{ pass: true, count: 0 }`. After the round, count 0 means "not evaluated" and says so truthfully, because S8 cut nothing. | In `seamPortalsRow.test.ts`, add two planted-record pins over the honest twin: an extra baseLane portal whose `at` names no vertex must yield `unresolved`, and a second portal with a distinct id at a lane end's vertex must yield `two-portals` (and `gap`). | M0 hardening phase (J237) |
| N-23 | **Seven survivors of the closing check of session fix round S4 (lane `check/M0-b-03-close-s4`; K13, K16, K19, K20, K21, K22, K23): the round's readings are unit-pinned, their call sites and two edge cases are not.** Each survived the whole near set (15 files, 109 / 109), and the related set cannot kill it: over the whole RELATED set at 1000 in the seat's instrumented mirror (215 files) the branches of K13, K16, K19, K21, K22 (at its call site) and K23 never fire, and K20's fires only in `holes.test.ts` (8 times), green under it. The seat's divergence instrumentation (each mutant's branch logged, behaviour unchanged) over base flat / river 1–5 at 900 ha / 30 ha walled, integrated CITY 1, 7, 20, 23, 39, 44, fusion 30 and 360 bentcut family districts at seed 1, and its mutant probes on the integrated seeds, give: **(a) K23** — `continuationRefused` reading `bounding` from the end's spine only (the pre-round call; `continuationBounds` itself is pinned, K08 killed): 0 fires; output on integrated 23 identical to the round. Under it a continuation onto a junction of a district-bounding chain read on an interior spine would be admitted with its portal recorded under that chain (`portalSeamAt`) and the gap kept (the insertion read) — lawful under the row, contrary to N-57 (1)(b)'s chosen refusal. The first check's N-6 class (step 10's wiring has no integration test). **(b) K21** — `portalSeamAt` called without the planned spine (ways at v by id only): 0 fires (no portal is ever recorded under a way other than the planned spine on these runs); output on integrated 23 identical; both orders record a lawful seam. **(c) K13 / K22** — the insertion read's gap without the new lane's width / its `gap` breach ignored: the insertion read fires 0 times on honest runs; it fires only behind a removed tip check (K17: `antenna/refused/portal-gap` 1 / 3 / 3 / 2 on seeds 20 / 23 / 39 / 44, outputs identical to the round), so the tip check and the insertion read are each sufficient there. A breach both missed would be refused by the hard stage-end row (S8 refused whole: fail-safe, but a J264 lawful-input refusal). Outputs on integrated 20 / 39 identical. **(d) K16** — the tip's gap from the portal's width only (not max(portal, the lane band's top)): verdict-equivalent (the insertion read refuses an actual breach); 0 divergences; output on integrated 20 identical. The unit case reads one portal at 44 cm and one at 20 m, both on the same side of either bound. **(e) K19** — an arealess split child given its face's pole: equivalent in practice (a deep-interior spine runs through the block's pole, whose inscribed radius exceeds the spine's half-width, so each child keeps kerb area; 0 fires over 4 382 seeds; fusion 30 identical). **(f) K20** — `kerbSeed`'s pole of the component's outer ring without its holes: fires once — bentcut `holed` #26 at seed 1, `block:c97yq38sxx8sc`'s second seed moves 523.3 cm, (239688, −248276) → (239914, −247804) — and 8 times in the item's own `holes.test.ts` fixtures (moves of 12.2–67.2 m); every moved seed is still strictly inside its kerb's outer ring and in none of its holes (the seat's even–odd property, 0 bad under K20; `inHole=false` on all 8); `seeds.test.ts`'s property runs on the two-district fixture, whose kerbs have no holes, and would catch the move (its 100 cm tolerance) on a holed face. None changes an honest output to an unlawful one or reverts a failing line's evidence (the four seeds commit, fusion 30's kerbReads 0, under every survivor probed). | Add the pins, each small: (a) an S8 fixture whose cut lands within attractCm of a junction of a seam chain of the district read on an interior spine (a T where the bounding arterial bends) — refused `continuation-boundary`; with the arterial in no seam, admitted when collinear within 6° (N-6's two fixtures); (b) an S8 fixture with an end on a vertex shared by two seam chains of the district — the portal under the planned spine's seam; (c) a `portalGapBreach` unit case with the new lane wider than the existing portal, at a distance between the two gaps, and an S8 case where only the insertion read catches a breach (the antenna fixture behind a test seam that disables the tip check, or a portal on a second run of a multi-run chain); (d) a `tipInPortalGap` case at a distance between 2 · the portal's width and 2 · the lane band's top; (e) none needed (one-line note); (f) extend `seeds.test.ts`'s property to the holed fabric faces (bentcut `holed` #26 among them) and assert each split seed equals `kerbSeed` of its face read at the split. | M0 hardening (M0-x-01's census) / M4 |
| N-24 | **The round's one-time shift reaches nearly every integrated CITY seed, not the four the ruling counted (closing check of session fix round S4).** N-57 (1)'s "4 of 50 integrated seeds" was the refused set. The round's readings — the cross-chain portal reserved at the shared vertex (the full gap from the vertex, C-0329's KI) and the antenna tip refused in a gap — also move cuts on seeds whose S8 committed before: integrated 1–7 all move (model roots differ on 7 / 7; lanes 1 375 → 1 382, 1 432 = 1 432, 1 312 → 1 306, 1 367 → 1 362, 1 426 → 1 422, 1 376 → 1 375, 1 352 → 1 329). The harness's refusal census is equal on each; over the 19 runs that commit before and after, rung-(d) courts 57 → 59 (+1 on integrated 1 and 2), deep-spine fallbacks (`W_DEEP_SPINE_REFUSED`) 3 124 → 3 120 and `a/none/failed` 362 → 361 — a redistribution, not a lawful-input refusal. The base fixtures move on flat 4 only (C-0329 (5), stated); the fusion runs (no seams) keep their roots and lanes. Nothing committed moves (RELATED at 1000 green but the foreign edge/standing red). | The session's 50-seed smoke re-run (N-57 (4)'s continuation, M0-c-06) should expect every integrated seed's digest to move once; no re-recording of another item's pin is needed. | M0 (M0-c-06's continuation) |
| N-25 | **The round's declared KI (C-0338: "a parent part on ONE side cut in two by the spine's band … not seen on the registered seeds") occurs on a registered seed (closing check of session fix round S5, lane `check/M0-b-03-close-s5`).** Integrated CITY 5 `block:db2f94wpgb4e9` (back lane, kerb at the cut 2 144 m², spine `way:5c1da9bz2espj` hw 151.8 cm, bent near its end): child face 712's kerb has two components, 431.7 and 42.7 m², both inside the parent's kerb at the cut on one side of the spine; the record holds one seed per L1 face, (49078, 17313) in the 431.7 m² part, so the 42.7 m² piece is seedless and the c-06 harness reads `driftBeyond` 2 (sliver 360.14 cm, one-sided 694.76 cm) — identical before and after the round (the seat's `m0` / `m1` probes). Fusion 28 `block:dbn6qd1cfg269` (one of the residuals the author left to class B) has the same shape: parts 2 244 / 1 656 m² each holding a seed and a 74 m² seedless piece on the 1 656 m² part's side (`driftBeyond` 6 = 6 on the run, with `faxx9e5sqh506` / `7p7p4axr4nw3a`'s 86–88 cm slivers, whose seeds lie in their parts). The committed geometry is right; the record matches its schema (a seed per L1 face); the shortfall is visible to the harness (fails safe at M0, no S9 consumer). | **For the session first:** if M0-c-06's classification (C-0333 (7)) put these blocks in class B (routed to M0-a-09 s5), the mechanism measured here is the record's one seed per L1 face, not the kernel's geometry — re-route before M0-c-06's 50-seed smoke re-runs. Handling options: a seed per kerb component of the child inside the parent (the record's `seeds` as one per part — a record-format change, owner-gated), or the harness's split reading accepting a part of the parent's kerb on a side that holds no seed when the same L1 face holds a seed in another part on that side; correct C-0338's KI sentence (it is seen on integrated 5). | M0 (before M0-c-06's smoke closes); else M4 |
| N-26 | **Survivors of the closing check of round S5 (C04, C11, C12, C13; K09 at the call site).** C04 / C13 (`insidePart` without the parent's holes / the parent passed without them): equivalent — a component of kerb(child) lies in the child face, inside the parent face; a hole of the parent's kerb is another face's island plus its band. C11 (`makeBlock` falls back to `kerbSeed` without the parent when the child has no component inside it): never reached on the 16 registered CITY runs (NO-SHIFT: every split block's non-seed record and seed count identical to the pre-round rule's), so no test sees it; under it a child with no part on its side would record a point of another component — the wrong seed C-0338 (2) refuses. C12 (the parent branch's pole of a component's outer ring without its holes; s4's K20 class): output-identical to the round on fusion 3, integrated 5, fusion 30. K09 re-created at the call site (`breach` forced null) survives NEAR — s4's K22 (N-23 (c)); the function-level form (K09f) is killed. | Pins: (C11) a `makeBlock` case whose child holds no component inside the parent records none (e.g. a test seam over `kerbSeed`'s parent, or a fixture whose spine band swallows one side); (C12) extend N-23 (f)'s holed-face property to the split children. C04 / C13: none (one line here). | M4 |
| N-27 | **An id in the session's brief.** J318's list names integrated 37's class-A block `block:628bxff1f87e33`; the run's id is `block:628bxf1f87e33` (13 characters after `block:`, like every other). The seat's before/after on it: before one seed outside the kerb at the cut, an 817 m² seedless part, `driftBeyond` 2; after both seeds in their parts, `driftBeyond` 0. | Use `block:628bxf1f87e33` in the session's records. | M0 (the session's record) |


## Consolidation round C1 — the builder's notes (lane `build/M0-b-03-consolidate-1`, 2026-10-14)

Round R6 of `consolidation/layout-plan.md` (§1.2.5 – §1.2.14 with §1.1.1's and §1.1.6's equivalences, §2's
`infill/{deepInterior,portals,bentCutFabric,ladder}.ts` rows, §3's `test/infill/fabric/` row, §4; J260, J263 Q1, Q6,
Q8, J264 (5), J270 (a), (b), J290, J302 Q2, Q4, Q5, Q6, Q8, Q12), after R5 (`planner.ts`'s six file-level exports).
Choices row C-0375. No behaviour change.

**Old file → new file (J263 Q8).** No file was renamed, split, merged or added; every describe and `it` title is
unchanged and in its order (13 files, 36 describe, 100 `it` — the plan's 12 · 34 · 94 plus `splitSeeds.test.ts`'s
2 · 6, landed in round S5; the title lines' sha256 801f6d5a279525d4… before and after; 118 tests at run time with
`testkit/test/layout/infill-fabric/`). No case was merged, so every earlier mutant keeps the test that killed it.

| old file | new file | what changed |
|---|---|---|
| `src/infill/ladder.ts` | the same | 1.2.5: its `arrivalDot2`, `arrivesSquare`, `PI`, `RAD_PER_CDEG` deleted, the planner's imported by path; `TOUCH_CM` re-exported from the planner (`import { TOUCH_CM } from './planner.js'` + `export { TOUCH_CM }`: the file reads it too, so a bare `export … from` would not bind it); `spineHit`, `endOf`, `slideEnd` kept with headers saying why (J302 Q2). 1.2.6: `hullOf` exported file-level. 1.2.12: `kerbLength` deleted. 1.2.13: `SCALE` imported from `width.ts` |
| `src/infill/bentCutFabric.ts` | the same | 1.2.6: `hullRing` deleted, `majorExtent` calls ladder's `hullOf`. 1.2.7: `insideRing` deleted, `withHoles` / `insidePart` call `insideFace([ring], p)`. 1.2.8: `RAD_PER_CDEG` the planner's. 1.2.9: `cornerScale` the planner's (and `M_TO_CM`, the planner's one definition, the same 100). 1.2.10: three comparators → `compareKeys`. 1.2.12: `lineLength` for the width law's L. 1.2.14: `kerbSeed`'s, the split seeds' and `faceAgain`'s comments name the registered fixtures (`city-split-seeds.json`, `relocate.test.ts`'s holed #330 / #464) instead of pasting their diagnoses; "refined by" dropped |
| `src/infill/width.ts` | the same | 1.2.13: `SCALE` exported file-level (the fabric's one 2²⁰) |
| `src/infill/portals.ts` | the same | 1.2.10: three comparators → `compareKeys` (`waysAt`, the invariant's spine order and its placed-portal tie-break). 1.2.14: the header's "ladder.ts's mirror" → the one arrival band and the two kept differences |
| `src/infill/stage.ts` | the same | 1.2.10: `runS8`'s district tie-break → `compareKeys`. 1.1.6 (J302 Q6): `GROUND` = `@plat/site`'s `GROUND_KEY` |
| `src/infill/deepInterior.ts` | the same | 1.2.14: the header states the rule (`DEEP_FACTOR` × d̄, 0.6, §4.6, N-27, C-0237 (6)) and that interior.json is read for its shares, reach weights, `densityBase` and `reachRung.*` only; the NG counts, "superseded 2" and the hand-over gone |
| `src/infill/index.ts`, `src/index.ts` | the same | untouched, byte-identical (J263 Q1; the scaffold sentence kept, as every other folder index keeps it) |
| `test/infill/fabric/support.ts` | the same | gains `CELLS` (`cutCells()`) and `arenaWays(plat)` |
| `test/infill/fabric/ladder.test.ts` | the same | its `P` and `CELLS` removed, imported from `./support.js` |
| `test/infill/fabric/deep.test.ts` | the same | its `P` removed, imported from `./support.js` |
| `test/infill/fabric/portals.test.ts`, `sharedVertex.test.ts` | the same | their `CELLS` removed, imported from `./support.js` |
| `test/infill/fabric/holes.test.ts`, `seamPortalsRow.test.ts` | the same | their `arenaWays` removed, imported from `./support.js` |
| the other fabric files, `city-split-seeds.json`, `testkit/test/layout/infill-fabric/` | the same | unchanged (no changed name is read in the testkit folder: grep) |

**§3's twins — which moved and which stayed.** `CELLS` ×4: `ladder`, `portals`, `sharedVertex` declare `cutCells()` —
equal, moved; `width.test.ts`'s is `widthCells('CITY')` — another table's cells, kept. `P` ×3: `deep`'s and `ladder`'s
arrow functions equal `support.ts`'s `P` body — removed, `support.ts`'s kept. `SEED` ×2: `support.ts` 7 (the fixtures'
seed) and `strips.test.ts` 3 (its `flatFixture`'s seed) — unequal, both kept. `arenaWays` ×2: `holes` and
`seamPortalsRow` — the same loop (one names the row key `k`, the other `key`), moved. Kept apart, as §3 says:
`fixture`, `twoDistricts`, `runFixture`, `kerbNow`; the oracles of `seeds.test.ts` and `splitSeeds.test.ts`
(`area2`, `inside`, `segDist`, …) stay the test side's own.

**Equivalences shown (J112).** A probe in the scratchpad ran each deleted helper, copied verbatim from the before-image,
against the kept one it now calls, imported from the tree by path: `hullRing` vs `hullOf` over 100 000 point sets (3 –
40 points, spans 16 cm to 2²⁴ cm, duplicates and lattice-exact collinear points), `insideRing(ring, p)` vs
`insideFace([ring], p)` over 1 000 000 cases (on vertices, on edge midpoints, on a vertex's y, random), the inline
comparator vs `compareKeys` over 100 000 pairs and 1 000 sorts (ASCII ids, prefixes, astral and lone-surrogate code
units, the empty key), the old `arrivalDot2` vs the planner's for every band [lo, hi] with lo = 0, 7, … 18 000 (12 860),
the old `arrivesSquare` and `cornerScale` vs the planner's (100 000 each): **0 differences**; `RAD_PER_CDEG`, `TOUCH_CM`,
`SCALE`, `M_TO_CM` `Object.is`-equal to the deleted constants. Positive controls (the copied `hullRing` popping on `< 0`,
`insideRing` testing `<=`, a length-first comparator) differ on 1 728 / 2 000, 6 694 / 20 000 and 1 399 / 2 000 cases, so
the probe sees a difference when there is one. **1.2.6's bound:** `hullOf` decides with `orient2d` (exact), `hullRing`
with the plain cross `(a.x − o.x)(b.y − o.y) − (a.y − o.y)(b.x − o.x)`; on lattice points (|x|, |y| ≤ 2²⁴, the kernel's
range; `snap` refuses beyond it) each difference is below 2²⁵ in magnitude, each product below 2⁵⁰, their difference below
2⁵¹ < 2⁵³: every intermediate is an integer a double holds exactly, so the cross's sign is `orient2d`'s and the two hulls
are the same list; the two tails were diffed line by line (the same sort `a.x − b.x || a.y − b.y`, the same pops on `≤ 0`,
the same `lower.pop(); upper.pop(); lower.concat(upper)`). **1.2.7:** the same loop (`j` from `length − 1`), the same
`ratio(p.y − a.y, b.y − a.y, 'length')` with the `k.ok ? k.value : 0` fallback, the same `p.x < x`; neither exact on the
boundary; siting's exact `insideRing` not substituted. **1.2.5:** `dmath.cos(lo · RAD_PER_CDEG)` with the same double
`PI / 18000` = 0.00017453292519943294 (never growth's …296, J302 Q8); the same four statements on `sides.ts`'s `unit` /
`dot`. **1.2.10:** `compareKeys` is the inline expression (`kernel/src/arena/keys.ts:13`); `a − b || compareKeys(…)` is
the inline tie-break. **1.2.12:** `kerbLength` was `return lineLength(points)`; it was read by `bentCutFabric.ts` only (no
test or testkit file imports it: grep). **1.2.13:** `width.ts` imports `@plat/kernel` and `@plat/tables` only, so
`ladder.ts → width.ts` makes no cycle. **1.1.6 (J302 Q6):** the kernel keys arenas by value — `facade/kernel.ts`
`platOf` reads `arenas.get(keyName(key))`, `arena/plat.ts` `sameKey` compares `layer` and `part`; S8 reads its key only
as a value (`k.plat`, `lineageHash`, `mint`, `addressOf`, `entityKey`, `pointLocate`, `resolve`, `rebuildAtStageEnd`)
and never writes it, so the frozen `GROUND_KEY` is the unfrozen literal's equal.

**Kept apart, as the plan says.** `spineHit`, `endOf`, `slideEnd` (1.2.5; J302 Q2, queue row L28): the ladder's
`spineHit` divides through `div` (both operands × 2²⁰), so a denominator in [2⁻²⁰, 1) passes where the planner's
`ratio(…, 'length')` refuses (floor 1); where both pass the quotients are bit-equal; `endOf` calls its own `spineHit`;
`slideEnd` re-derives the kerb point on the rings (the planner's on its sides). `generated(epoch)` (1.2.11; J302 Q5,
queue row L30). `SEAM_PORTAL_ROW` (C-0298, C-0316). Every refusal detail text verbatim (J263 Q6): no message string
changed (the diff touches none). Q39 / `BENT_CUT`'s batch path untouched (J302 Q4). `div` stays ladder's (read by
`bentCutFabric.ts` and `deepInterior.ts`); `cosCdeg` stays ladder's (the judge's corner floor reads it).

**API frozen (J263 Q1).** `src/index.ts` and `src/infill/index.ts` byte-identical (sha256 f2349765…, 214be044…). The
TypeScript checker's exported names with value / type flags and types (a scratch script over the before-image and the
tree): package barrel 692 = 692, infill index 120 = 120, identical; file level `ladder.ts` 23 = 23 (`kerbLength` out,
`hullOf` in; `TOUCH_CM` the same name and type `0.5`), `width.ts` 10 → 11 (`SCALE`), every other owned file identical.
Neither new name reaches an index; both are imported by path.

**NO-SHIFT (J260 (3)) and refusals (J264 (5)).** The before-image is the owns at the round's start, equal to `landed/M0-b-03.json`'s hashes (bentCutFabric
3da29477…, ladder 2362e0b6…, portals c61e5af8…, stage ef76fc0f…, width 699ba577…, deepInterior d2635966…, index
214be044…), copied with the tree into a scratch mirror outside the project; the same probe script ran there (before) and
in the tree (after), each run printing its hashes (S8's output whole, the L1 digest, the model root, the stage roots, the
lanes, blocks, infill records and report) and its refusal counts. **The fabric's families** (the bench's bentcut tasks at
seed 1: 300 F-CUT concave / holed, 800 full — 1 100 tasks): every line identical before and after (the result files'
sha256 aa1d4123f81deeaf… both; the 1 100 record hashes concatenated 239333518bc69b14 both), 0 records refused, 0
districts refused, lanes 9 086 = 9 086, blocks 9 344 = 9 344. The plan's `9c0f7288b693ecdf` is b-03 s4's census hash
by its checker's own `fam.ts`, which is not in this tree, and S5 has moved split seeds since, so it is not this round's
before-value; the before / after pair above is. **The base fixtures** (`runBase` flat and river, 900 ha / 30 ha walled,
seeds 1 – 5): the 10 runs byte-identical (model root, stage roots, S8's root, lanes, blocks, infill, report), bugs 0 = 0,
S8's two rows identical, districts refused 0 = 0, rung refusals 1 439 = 1 439. **The integrated CITY seeds** 1 – 7, 20,
23, 39, 44 (`runBase(FLAT_BLUEPRINT)` at the full CITY size): the 11 runs byte-identical (same fields), bugs 0 = 0,
`block-floor` and `seam-portals` rows identical, districts refused 0 = 0, rung refusals 8 731 = 8 731, warnings
(`W_CUT_SLID`, `W_DEEP_SPINE_REFUSED`) equal. **Fusion 1, 2, 11, 30** cannot run here: `bench/src/fusion/` is the
scaffold's empty index (M0-c-06's harness is not built in this tree); fusion 30's face 197 runs as `seeds.test.ts`'s
fixture (green). **Refusals (J264 (5), J290):** over the item's registered families 0 before, 0 after — no stage or
district refusal in any run; the rung refusals are the ladder's typed moves to its next rung (§4.6 step 8), counted
equal; none is a lawful-input refusal of the stage. Every refusal code and detail text verbatim (no string literal in a
refusal path changed: the diff touches none).

**Self-check (J183): the targeted mutants.** 32 targeted mutants in the lane's one mirror (`vitest run --maxWorkers=1 --bail=1` over
`test/infill/fabric/` and `testkit/test/layout/infill-fabric/`, the item's NEAR set, 16 files, 118 tests), each file
restored from the tree and `cmp`-checked, the mirror diffed clean and deleted at the end. **The earlier rounds' killed
mutants, re-created on the consolidated code, all killed:** s4's sixteen — K01 – K08, K09 (as K09f, the function-level
form s5's check used), K10 – K12, K14, K15, K17, K18 — and s5's C06; K19 / K20 and K37 / K38 stay the recorded
survivors (N-23, N-4; not re-run). **This round's lines:** X01 (`hullOf` returns its lower chain: 1.2.6), X03 (the
inverted `insideFace` in `withHoles`: 1.2.7), X05 (`SCALE = 1`: 1.2.13), X06 (the ladder's centidegree conversion
doubled: 1.2.8), X08 (the width law's L halved: 1.2.12), X10 / X11 (the planner's `arrivalDot2` / `arrivesSquare`
always pass, through the import: 1.2.5) killed; X12 (the planner's `TOUCH_CM = 1`, which ladder.ts re-exports) survives
this folder and is killed by b-02's pin in `planner/sides.test.ts` (1 failed | 8 passed). **The moved test support:**
S01 (`CELLS` with no gap and a full band), S02 (`arenaWays` empty), S03 (`P` with x, y swapped) killed. **Four
survivors, each on code the round did not change (pin gaps that held before it too; rows C1-1 – C1-4):** X02 (`hullOf`
keeps collinear points on its lower chain), X04 (`boundaryWays` in reverse key order), X07 (the continuation
tolerance's conversion × 10 — N-6's class: step 10's wiring has no crossroads fixture), X09 (`faceSides` given a corner
scale of 0). The round's own swaps are proved by value instead: `compareKeys` is the inline expression, `cornerScale`
the same loop, `RAD_PER_CDEG` `Object.is`-equal (the equivalence probe above), and the NO-SHIFT runs are identical.

**Fixed-round lines (the brief's C1 list) and where each stands.** 1.2.5 / 1.2.8 / 1.2.9: the planner's `arrivalDot2`,
`arrivesSquare`, `cornerScale`, `RAD_PER_CDEG`, `TOUCH_CM`, `M_TO_CM` read by path; `PI` is no longer spelt in the
fabric (the ladder's conversion reads the planner's `RAD_PER_CDEG`, which reads siting's `PI`); `spineHit`, `endOf`,
`slideEnd` kept with their headers. 1.2.6 / 1.2.7 / 1.2.12 / 1.2.13: one hull (`hullOf`), one point-in-face test
(`insideFace`), `lineLength`, one `SCALE`. 1.2.10 / 1.2.11: seven comparator sites → `compareKeys` (the plan's six plus
`portalInvariant`'s placed-portal tie-break, the same expression); `generated` kept. 1.2.14: the comments of §2's four
infill rows; no refusal detail text changed; `SEAM_PORTAL_ROW` kept. §3: equal twins into `support.ts` (above); no merge;
titles kept; the folder has 13 test files (36 describe / 100 `it`) because `splitSeeds.test.ts` (2 / 6) landed in S5 after
the plan counted 12 · 34 · 94 — unchanged by this round. API: identical (above). NO-SHIFT: identical (above).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| C1-1 | **`hullOf`'s collinear rule is unpinned (self-check X02 survives NEAR 118/118).** Popping on `< 0` instead of `≤ 0` keeps exactly collinear points on the lower chain; the OBB of `majorExtent` is the same box, but `reflexVertices` could stop a lid walk at a ring vertex lying exactly on a lower hull edge and measure a shorter depth. The code is the same before and after the round (the deleted `hullRing` popped on `≤ 0` too, and was equally unpinned). | A `ladder.test.ts` case: a ring with a vertex exactly on a hull edge and a notch beside it; `reflexVertices`' depth equals the distance to the whole lid. | M4 |
| C1-2 | **The spine order of `kerbFace` is unpinned (X04: `boundaryWays` in reverse key order survives NEAR).** The order fixes each `KerbSpine`'s index (an `EndPlan.index`, the ties of `spineHit`'s first-best); the run stays deterministic under the reversal, so it is a pin gap, not a fail-safety one. The round's `compareKeys` is the inline expression (probe: 100 000 pairs and 1 000 sorts equal) and the NO-SHIFT runs are identical. | An S8-run pin of the spine ids' order on a face bounded by three or more ways. | M4 |
| C1-3 | **Step 10's tolerance conversion at its call site is unpinned (X07: `continuationCdeg × RAD_PER_CDEG × 10` survives NEAR) — N-6's class.** No fixture forms a crossroads; `continuationVerdict` is unit-tested with its tolerance given. The round's `RAD_PER_CDEG` is `Object.is`-equal to the deleted constant. | N-6's fixture (a cut landing within attractCm of an interior junction, collinear within 6° admitted, otherwise refused). | M4 |
| C1-4 | **The corner scale `faceSides` reads in the fabric is unpinned (X09: a corner scale of 0 survives NEAR).** The planner's tests pin `cornerScale`'s value (b-02's R5 mutants); the fabric's call site reads the same function now, by path. | A fabric case whose kerb's round-joined corner merges two runs only under the spine's half-width. | M4 |
| C1-5 | **Fusion 1, 2, 11, 30 were not run before / after.** `bench/src/fusion/` holds the scaffold's empty index (M0-c-06 is not built in this tree), so the plan's fusion digests have no harness here; fusion 30's face 197 runs as `seeds.test.ts`'s fixture. | The closing check, or M0-c-06's own round, re-runs the four seeds against this round's tree once the harness lands. | M0 (session note) |

## Consolidation round C1 — the closing check's notes (lane `check/M0-b-03-consolidate-close-1`, 2026-10-18)

The verdict is `checks/M0-b-03-c1.md` (PASS). The rows below are minor under J180 / J202 / J273: each lies on code
whose behaviour the round did not change (the swaps are value-equal and the before / after runs byte-identical), fails
safely, or tightens a claim. "Survivor" means a targeted mutant of this check that the item's NEAR set (16 files,
118 tests) left green.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| C1-6 | **The orders behind the round's `compareKeys` sites are unpinned (survivors X12, X13, X14; X08 is C1-2; X10 equivalent).** Reversing `portalInvariant`'s spine order (X12), its placed-portal tie by id (X13) or `runS8`'s district tie by id (X14) leaves NEAR green. X12 / X13 change only the order of the row's problem list, which reaches `seamPortalDetail`'s text on a breached run with two or more problems (a refusal path no lawful run takes); X14 fires only for two districts of equal lineage. X10 (`warningList` reversed) is equivalent: `report.ts` counts warnings by code and writes them through `sortedRecord`. The swaps themselves are proven by value (this check's probe: 200 000 pairs, 2 000 key sorts and 2 000 `(s, id)` tuple sorts, 0 differences) and the 21 base / CITY runs and 700 family tasks are byte-identical before / after. | A `seamPortalsRow.test.ts` case with two planted breaches on two spines pinning the detail's problem order; a two-district fixture of equal lineage is not constructible from S6 and needs no pin. | M4 |
| C1-7 | **The ladder's slide reads its arrival band unpinned in the fabric (survivor X16), and `runS8`'s default key is read by no caller (survivor X20).** X16: `slideEnd`'s bound forced to 1 (any arrival passes) leaves NEAR green; the band's function is the planner's `arrivalDot2` / `arrivesSquare` (bit-equal by this check's probe, pinned by b-02's tests), but no fabric case has a gap edge whose arrival leaves the band. X20: `stage.ts`'s `input.key ?? GROUND` with `GROUND` set to part 1 leaves NEAR green — `runBase`'s S8 adapter (`base.ts`, `key: GROUND`) and the fabric's `support.ts` (`key: GROUND`) always pass the key, so the default (now `@plat/site`'s value-equal `GROUND_KEY`) is unexercised. | A `sharedVertex.test.ts` / `portals.test.ts` case where the gap's near edge is off-band and the slide takes the far edge or the next rung; a `runS8` call without `key` in one stage test. | M4 |
| C1-8 | **The plan's 1.2.8 ORACLE over-reads ladder.test.ts's 'step 10' pair (survivor X18), and the hull's collinear rule is equivalent in practice (survivor X02).** The 'step 10' tests pin `continuationVerdict` with its tolerance given; the fabric's conversion `dmath.cos(continuationCdeg(run) × RAD_PER_CDEG)` doubled at its call site leaves NEAR green — the same gap as C1-3 / N-6 (no fixture forms a crossroads). X02 (`hullOf` popping on `< 0` in both chains; C1-1) run on flat 900 ha 1 – 5, river 900 ha 1 – 2 and this check's 700 family tasks gives output byte-identical to the round's. | N-6's crossroads fixture covers X18; C1-1's ring case covers X02. | M4 |
| C1-9 | **N-4's two survivors are now killed (K37 antenna split off, K38 reflex pre-cut off).** On the consolidated tests both go red in `sharedVertex.test.ts`'s S8 runs (the antenna case 'S8 commits and its row holds …: the tip is refused, no lane starts there'; the bend case at seed 7). The S4 round's run-level pins close N-4's S8-run gap for these two rungs. | The hardening pass reads N-4 as closed for K37 / K38 (M0-x-05's per-rung coverage stands for the others). | M4 |

## Hardening round S7 — the builder's notes (lane `build/M0-b-03-fix-s7`, 2026-10-25 – 26)

The session's hardening round of M0-b-03 (J237 (2), J186, J192; the particulars J489 (a)–(g)): first the six lines the
session added (L20, L25, L28, Q65, Q70, Q87), then the twelve FIX-NOW rows of `checks/hardening-inventory.md`
(N-6, N-7, N-10, N-12, N-14, N-16, N-17, N-19, N-21, N-22, N-25, N-26). Choices row C-0426. Q39 is not this round's
(J489 (b): M0-x-04's façade door); Q60's rider is not in play (J489 (f)).

**The before-state (J489 (a); Q18 / Q19 landed at f849488c).** Taken on the tree at the round's start (the owns'
hashes `bentCutFabric` a9436ef2…, `ladder` 8b3ac4ea…, `portals` 6e8da98a…, `stage` 6a47ce45…, kept as the lane's
before-image) by scratch probes in the lane's mirror (`runBase` and `runS8` through the bench's own builders; nothing of
the probe in `plat/`): base flat / river 900 ha / 30 ha walled seeds 1–5 — 0 bugs, 0 districts refused, `unresolved`
3 (flat 1, flat 3, river 3); the integrated CITY seeds 1–7, 20, 23, 39, 44 (`runBase(FLAT_BLUEPRINT)`) — 0 bugs, 0 districts refused, `unresolved` 2 (CITY 3, 7), courts 60, rung (a)'s antenna corner refusals `antenna:refused:angle` 592 (32 – 80 a seed) against 204 antenna cuts;
F-CUT's 10⁵ faces at seed 1 (M0-b-04's `fcutTasks` / `runTask`) — cut 72 879, slit 4 454, block 21 241, court 1 367,
**unresolved 59**, at most 3 kernel calls; the residue family (1 000 whole districts at seed 1) and the M0 (b) family
(5 × 100 whole districts) — unresolved 1 + 1, 0 refused, 0 threw. The fusion harness (`bench/src/fusion/`) is still
the scaffold's empty index in this tree (C1-5), so fusion 1, 2, 11, 30 and 49 do not run here; the smoke's face 479
enters as a fixture rebuilt from the diagnosis's recorded coordinates (`diagnosis-c06-smoke.md` §2).

### The session's lines

* **L20 — the needle (FIXED, DECLARED shift).** §4.6 step 8 rejects a split whose child violates "minEdge, min angle
  or the class's minimum block width"; the fabric read the min angle at the cut's own corners and the floor on the L1
  child, so a cut whose band runs nearly parallel to another spine's — the smoke's 0.8° wedge, a 16 m kerb needle
  10–26 cm wide — passed. Now, once the insertion stands whole (its junction and portal rows written), each child's
  kerb is read and a cut leaving a **needle** is refused `needle` like a child below the floor (the lane taken out, the
  ladder goes on): a convex corner of an outer ring of kerb(child) whose two sides, read **along the ring** over the
  plot's minimum width (`faces.plot.minPlotWidthM`, 2.5 m — the "minimum usable width at the tip"), meet below the
  plot's minimum corner (`faces.plot.minInteriorAnglePlotCdeg`, 12°), lying on the cut's band (within its half-width
  and 2 · attractCm). A cheap exact pre-test (`needleSuspect`: some L1 edge of the child within 15° of parallel to a cut
  segment and nearer than the two half-widths and the margin) decides whether the kerb is read at all. Two readings were
  measured wrong on the way and corrected before landing: a check on the kerb before the end rows (a junction's wedge
  only appears once its row stands) and sides read at the first ring point 2.5 m away (a square end whose short side
  turns at once read as 9°). Pins: `needle.test.ts` (12): the pre-test passes an edge 3°, 8°, 11° and 14° off the cut and near it, and not 20°, nor 8° beyond the reach, nor the cut's own edge (a 5° pre-test is red: M38); the smoke's 0.8° tip a needle on the cut's band and not
  elsewhere; a square, an 80° corner and a hole none; the floor 12° vs 8°; base flat 2's junction-wedge spur none;
  bentcut round-joined #20's square end none (the along-the-ring read); S8 on a 10° wedge (an antenna split converging
  on a lane): the antenna rung refused `needle`, the face cut by a later rung, no recorded block kerb with a tip below
  12° on an S8 lane's band. Exactness: the pre-test switched off gives byte-identical S8 output and report on the ten
  base runs and 200 family districts. Census and shift below.
* **L25 — the S4 pins and KIs (FIXED / PINNED; one sub-item REPORTED).** Pins, each red on its mutant (table below):
  K13 (`portalGapBreach` gap from both widths: a 3.4 m lane 6.4 m from a 3 m portal is a breach), K16 (`tipInPortalGap`
  from max(portal, the lane band's top): 8 m from a 2 m portal is in the gap), K19 (a split child read against no part
  of the parent records no seed — the `noParentPart` test seam), K20 (every seed's clearance against its kerb
  component's best, holes counted, on the holed lands, and `kerbSeed`'s unsplit pole on a land holding a reservation
  hole: `holes.test.ts`), K21 (an antenna split landing on the vertex two
  seam chains of the district share goes under the PLANNED spine's seam, not the lower id's: `sharedVertex.test.ts`),
  K22 / K12 (the insertion read REACHED: with the planner's and the ladder's portal readings switched off by the
  `portalsUnread` seam, only the insertion read keeps the antenna's tip lane out — refused `portal-gap`, S8 commits, the
  row holds), K23 (`continuation.test.ts`: L in no seam, B through J the district's seam — refused
  `continuation-boundary`). The exactly-collinear antenna cut is **ADMITTED** (R-26, MAKE-IT-SUCCEED): at a landing on
  an antenna's tip (a spike of the ring) the judge reads both children's corners against the antenna's edge, so a cut
  continuing the antenna is two straight corners, never the 0° corner of a fictitious continuation (`ladder.test.ts`'s
  spike cases; the continuation and K21 fixtures cut by the antenna split); census below. The fewer-seeds case is
  pinned (K19's fixture; `splitSeeds.test.ts`) and measured: 0 occurrences before and after on every registered run.
  **REPORTED for M0-b-02:** the clipped cross-chain portal still reserves the full gap from the shared vertex
  (`spinePortals` places it AT the vertex; the planner's slide and `lengthAt` read one gap per `KerbPortal`, which has
  no reach of its own) — sizing it to what the row needs (an end AT the vertex only) needs a per-portal reach in the
  planner's `KerbPortal` and its slide (`planner.ts`, M0-b-02's owns); the ladder alone sizing it would make the
  planner's and the ladder's slides disagree. Fails safe (more reservation than needed).
* **L28 — the ladder half (FIXED, NO shift measured).** `spineHit` (ladder.ts) reads the planner's floor: plain
  `ratio(…, 'length')` on both quotients, so |cross(dir, e)| < 1 is no hit (J424); the 2²⁰-scaled `div` is gone from
  the reach rule. Pin: `ladder.test.ts` — a ray with |cross| ≈ 0.8, its crossing 375 cm out inside the 426 cm reach
  (which the old floor admitted): a kerb end; a crossing with |cross| ≥ 1 still a spine end. Sweep (the old floor
  swapped back into the final sources): the ten base runs, CITY 1 – 3 (with the Q70 pair's runs) and 200 family districts byte-identical to the final run (model root, S8's output, its report); F-CUT's 59 and the families' numbers unchanged by it — no changed outcome to declare.
* **Q65 — rung (c) completes (FIXED, MAKE-IT-SUCCEED, DECLARED shift).** The 59 F-CUT faces failed because their every
  end is a kerb end (a boundary with no spine) that must arrive square (C-0237 (10), §4.6 step 7: it "stays there,
  square to the line"), and the perpendicular from the longest run meets no side square. The slide's straight pass is
  unchanged; on a face above the substitution bound whose every straight foot was refused, each foot refused
  `kerb-arrival` is tried again in the slide's order **ending square** (`squaredFarEnd`: at each kerb end not square
  the cut stops a third of the cut or e_lo / 2 short and a stub leaves it square to the boundary — the foot of its
  perpendicular on the L1 edge it lies on). A face within (d)'s bound keeps its court; every face the straight slide
  cuts is as before. The 59 replayed: **59 cut, 0 unresolved, at most 2 kernel calls**; F-CUT's 10⁵: cut 72 840, slit 4 492, block 21 241, court 1 427, unresolved 0, at most 5 kernel calls (≤ 6), 0 refused, 0 setup refusals.
  Pins: `squared.test.ts` (7) — six of the 59 at depth 0 (the bench's F-CUT run) cut by rung (c), ≤ 6 calls; x05's
  round-joined #25 (M0-x-05's cut/court face) still a court with no squared end tried. The L20 needle rule is not the
  cause on any of the 59 (each is cut, none refused `needle`).
* **Q70 — the mint's live set (FIXED, NO-SHIFT).** `Run.live` is a `LiveIndex`: the list plus an address index and a
  lineage index, kept as the run pushes and pops; `mintOne` hands the mint only the entries on its record's `dup` chain
  and its address's `~k` chain (the mint reads only the set's contents), and the whole live list is checked once per
  district (`mint([], ctx.live, …)`, the mint's own check). No change to `mint.ts` was needed. NO-SHIFT: the old
  whole-list mint swapped back into the final sources gives byte-identical model roots, S8 output and reports on
  the ten base runs, the integrated CITY 1 – 3 and 200 family districts. Pins: `mint.test.ts` — the run beside its own identities (same lineages, same addresses) takes a
  free dup for each; a third time beside both earlier runs it walks the dup chain on to dup 2; beside squatters on its addresses it keeps its lineages and takes `~1` each. Timing (informative,
  KI-12; never a bar): quiet runs in the lane's mirror, one process at a time, the before-image's four sources swapped in and out (each run's model root equal to the census's): S8's wall time on base river 2 16.8 s before → 18.7 s and 18.5 s after (the needle reads and the squared second pass), on the integrated CITY 1 224.5 s → 218.3 s and 220.3 s (within run-to-run noise; the mint's share on a mid-round CPU profile of river 2, `mintOne` inclusive, 0.33 s → 0.07 s). The census's own runs (three probes side by side on the four cores) are not a timing.
* **Q87 — the lifecycle builder (FIXED, NO-SHIFT).** The hand-written `generated(epoch)` is gone; every lane, block and
  junction S8 writes takes `@plat/model`'s `generatedLifecycle(epoch)` (the same object, keys in §2.8's order). Proven
  with Q70 (both swapped back together: identical) and pinned (`mint.test.ts`: every record's stamp equals the
  builder's at epochs 0 and 3).

### The inventory's rows

* **N-6 (PINNED).** `continuation.test.ts` (4) drives step 10 through S8 with the antenna split continuing a dead-end
  lane to an interior lane L at J where B leaves J on the far side: collinear — admitted, a lane ends at J (a
  crossroads); 9° off — refused `continuation-angle` (inside 12° and 60°, so the tolerance's conversion doubled or ×10
  is red: C1-3, C1-8's X07 / X18); L the district's boundary — refused `continuation-boundary`; L in no seam but B the
  district's seam through J — refused `continuation-boundary` (K23).
* **N-7 (PINNED).** `portals.test.ts`: the west district's portals bear 270°, the east's 90°, within 6°.
* **N-10 (TEXT).** C-0426 states it: T34-1's commit clause covers the blocks the stop test made (`how` 'stop'); a
  court of rung (d), a work block of F-WORK, an `unresolved` block (tier 6) and an `empty` one are exempt by
  construction — none passed the stop test, so "below the τ drawn for its face" cannot hold for it, and the clause's
  other half (every face the ladder cut at or above its τ) reads every face that went on to the ladder.
* **N-12 (FIXED).** `continuationCdeg` and `substitutionSoftShare` are read once per district run and refused like
  every other cut cell (`BentCutFabric: cut/settings/continuationCdeg is not a number`, `… cut/ladder/
  substitutionSoftShare …`); no stand-in constant. Pin: `cells.test.ts` (3). The needle's plot width cell
  (`faces/plot/minPlotWidthM`) is refused the same way.
* **N-14 (FIXED).** The testkit support's `faceCase` finds the district face (and each hole's) by a point inside it
  (the drawn polygon's pole), never by ring equality. Pin: `facecase.test.ts` (5) — the note's round-joined face 2 at
  `check-m0b03/s/round-joined` and four one-face draws there (3, 18, 26, 34) that threw before.
* **N-16 (PINNED).** `abandon.test.ts`: the `endRowsFailAt` seam fails the first end rows on F-CUT holed #330 and
  #464 — no throw, the district commits, the face cut by a later candidate on its live slot; and the touched mark itself
  (K03): on the two-district case the first end rows failing with the face then not found abandons the run naming
  "was not found as it was after a 'end-rows' refusal" (an untouched refusal never re-reads the face: red, M18).
* **N-17 (PINNED).** `abandon.test.ts`: `takeOutFails` and `faceLost` on holed #330 — E_INVARIANT `S8 <district>: …`
  naming the cause, no lane, no block, no district report, the arena's version and its L0–L2 digests recomputed from
  nothing unchanged.
* **N-19 (FIXED).** `partition` snapshots the shared width map and restores it when `k.tx` refuses. Pinned in the same
  cases (the map equals its before-state, a foreign entry kept).
* **N-21 (FIXED, DECLARED shift).** A deep block whose spine the judge reads as a slit now tries the spine offset clear
  of the hole (the band of offsets where the line comes within the spine's half-width + 2 · attractCm of a hole of the
  block's kerb, the line just outside it on each side, the nearer first), before the court. Recovered (scratch scans
  of `holes.test.ts`'s land generator, before → after): 3 of 6 slit refusals over 240 thicker lands with a 2 m hole;
  0 of 8 over 216 lands with centred 2 – 10 m holes and 0 of 6 over 432 off-centre lands — there either offset leaves
  one child below the block floor (d_lo), which is N-2's floor reading (carried to M-1's re-fit), not this rule. Pin: `holes.test.ts` — the 120 × 48 m land with a 6 × 2 m hole (seed 1, slit
  before): the offset back lane cuts, two faces with a seed each, the hole in one, no slit, no court. No carry-forward.
* **N-22 (PINNED).** `seamPortalsRow.test.ts`: an extra baseLane portal whose vertex role names no vertex →
  `unresolved` (K21); a second portal with its own id at a lane end's vertex → `gap` and `two-portals` (K15).
* **N-25 (TEXT + harness reading; the record format WAITS, J489 (d)).** C-0426 corrects C-0344's KI sentence: the case
  (a parent part on one side cut in two by the spine's band, one part seedless) IS seen on a registered seed —
  integrated CITY 5 `block:db2f94wpgb4e9` (and fusion 28 per N-25). `seedless.test.ts` names and counts it: the
  block's kerb at the cut less its back lane's band, read side by side (a 50 cm raster), holds two parts on one side,
  one seedless (≈ 43 m²) — count 1; an ordinary split (the two-district fixture) none. The block record keeps one seed
  per L1 face (M1's records).
* **N-26 (PINNED).** C11: `splitSeeds.test.ts` — a split child read against no part of the parent records no seed (the
  fallback to the unsplit pole is red). C12: `holes.test.ts`'s N-21 case — the offset spine's child holds the hole, and
  its seed's clearance is the component's best with the hole counted (the parent branch's pole without holes is red).
  C04 / C13: equivalent, as recorded.

**The test seam.** `DistrictContext.faults` / `S8Input.faults` (`FabricFaults`, bentCutFabric.ts, not in an index):
`takeOutFails`, `faceLost`, `endRowsFailAt`, `portalsUnread`, `noParentPart` — each forces one path no honest input
reaches; no stage, runner or bench sets it, and absent the run is byte-identical (every probe here runs without it).

**The refusal census (J264 (4), N-58; J290), before → after, every run without the test seam.**

| family | stage / district refusals | `unresolved` (a stage FINAL outcome on lawful input) | other |
|---|---|---|---|
| F-CUT 10⁵ faces, seed 1 (depth-0 ladders) | S8 0 → 0, setup 0 → 0 | **59 → 0** | court 1 367 → 1 427, cut 72 879 → 72 840, slit 4 454 → 4 492; max kernel calls 3 → 5 (≤ 6) |
| residue family, 1 000 whole districts, seed 1 | 0 → 0, threw 0 → 0 | 1 → 0 | courts 85 → 90; S8-made needle tips 31 → 2; `needle` refusals 0 → 38 |
| M0 (b) family, 5 × 100 whole districts, seed 1 | 0 → 0, threw 0 → 0 | 1 → 0 | courts 25 → 25; S8-made needle tips 8 → 1; `needle` 0 → 7 |
| base flat / river 900 ha / 30 ha walled, seeds 1–5 | bugs 0 → 0, districts 0 → 0 | 3 → 0 | courts 22 → 22; `antenna:refused:angle` 4 → 0; needle tips 4 → 0 |
| integrated CITY 1–7, 20, 23, 39, 44 | bugs 0 → 0, districts 0 → 0 | 2 → 0 | courts 60 → 61; **`antenna:refused:angle` 592 → 0** (antenna cuts 204 → 371); needle tips (CITY 1 – 3) 6 → 1; `needle` 0 → 41 |

Every refusal class met, classed (N-58): **the stage's and the districts' refusals** — none before or after.
**`unresolved` (R-27)** — LAWFUL, MAKE-IT-SUCCEED: 0 remain on any registered family. **The antenna corner check
(R-26)** — LAWFUL (a lawful cut the judge misread), MAKE-IT-SUCCEED: 0 remain. **`needle` (new)** — a rung-level
refusal of a candidate S8 itself planned (OUR OWN INTERMEDIATE, never the input): §4.6 step 8's "reject if either child
violates … min angle", the ladder's designed move to its next rung like `floor` and `width`; no face is left uncut by
it (every face it touches is cut by a later rung or, within (d)'s bound, becomes the designed court). The rung-level
refusals in all (the ladder's typed moves) on base + CITY 10 281 → 9 438; on the families 6 349 → 6 408 and 2 816 →
2 833 (the `needle` lines). **Residual needle-like tips** (a block kerb's corner below 12° over 2.5 m on the band of a
lane minted before it): 1 + 2 + 1 remain on CITY 1 – 3 and the families (and 0 – 2 on CITY 4 – 44, not measured
before), each a short spur of the kerb at a T-junction's wedge on the block's bounding lane — bentcut holed #95's
`block:etg099rnfyfq0` (a later lane's T 2.4 m off, in the face across the lane) and holed #304's `block:7vrffpcmjtrme`
(a kerb vertex ON lane `way:d7x8egs6c96pv`'s centreline at the junction of `way:ayf3tjd6v65bp`) — the kernel's kerb
wedge geometry (C-0422's `corridor_split` wedges), not two bands converging; it fails safe (S9 commits the same kerb)
and is REPORTED for M0-a-09 (the kerb) with those fixtures.

**The DECLARED shift (rule (3)).** Model roots move on 20 of the 21 base / CITY runs (flat 4 byte-identical), and on
the families' aggregate hashes (residue fc3add20d3b51d7c → bcf4350cd86b6ebc, M0 (b) bc566d97f5e8a8d1 → 3213f64d559a8e5c):
lanes 16 845 → 16 910 and blocks 16 275 → 16 322 over the 21 runs — the formerly unresolved faces cut (flat 1: 154 →
166 lanes, flat 3: 134 → 167, river 3: 165 → 180, CITY 3: 1 319 → 1 357, CITY 7: 1 336 → 1 357), the antenna cuts
admitted (+167), the needle cuts refused and re-cut (+43 refusals), the offset spines (N-21) where a hole stood in the
way. The digests and goldens this moves: none of this item's (its tests read the fabric's fixtures, re-pinned here
where they named an old outcome: none needed); of other items' committed pins, RELATED at 1000 is red only where it is
red on the before-image (below) — M0-x-05's `cut/court` and `cut/slide` fixtures keep their outcomes (the squared ends
run only as rung (c)'s second pass above the substitution bound); M0-c-06's 50-seed smoke (not in this tree) should
expect every integrated seed's digest to move once more (as N-24 said of S4).

**The self-check (J489 (g); the mutants).** 39 targeted mutants, each applied alone in the lane's one mirror and run
against the item's two test folders (`--maxWorkers=1 --bail=1`), the mutated file restored from the tree and compared
after each. 35 were killed on the first pass; M09, M18, M33 and M38 survived it and each gained the pin named in its
row (the mint's third run, the K03 two-district case, `kerbSeed`'s unsplit pole with a hole, the pre-test's angles),
then was killed on a second pass with the pins in place; M17 survives as an EQUIVALENT mutant.

| mutant | the change | file | outcome | the first red test (or why it survives) |
|---|---|---|---|---|
| M01 | L20 needle rule off | bentCutFabric.ts | killed | the antenna split that would leave the needle is refused ‘needle’; the face is cut by a late… |
| M02 | L20 needle near-check off (any tip) | ladder.ts | killed | the smoke’s 0.8° tip is a needle when it lies on the cut’s band, and not when the cut lies e… |
| M03 | L25/R-26 spike corners off | ladder.ts | killed | the antenna split that would leave the needle is refused ‘needle’; the face is cut by a late… |
| M04 | L28 old ladder floor (div) | ladder.ts | killed | a near-parallel end is no spine hit: it stays a kerb end on its kerb point |
| M05 | Q65 squared ends not tried | bentCutFabric.ts | killed | F-CUT concave #106 (seed 1; before: unresolved, every rung refused): the depth-0 ladder cuts… |
| M06 | Q65 the stub not square (its foot 3 m along the edge) | ladder.ts | killed | F-CUT concave #106 (seed 1; before: unresolved, every rung refused): the depth-0 ladder cuts… |
| M07 | Q70 mint reads no live entry | bentCutFabric.ts | killed | the same run again beside its own entities (same lineages, same addresses): every entity tak… |
| M08 | Q70 address chain unread | bentCutFabric.ts | killed | beside entities holding the run’s addresses under other lineages: every entity keeps its lin… |
| M09 | Q70 dup chain stops at the first lineage | bentCutFabric.ts | killed | a third time beside both earlier runs (the lineages of dup 0 and dup 1 both taken): every en… |
| M10 | Q87 hand-written stamp (seq 1) | bentCutFabric.ts | killed | at epoch 0: every lane, block and junction carries generatedLifecycle(0) |
| M11 | N-12 continuation fallback 600 | bentCutFabric.ts | killed | cut/settings/continuationCdeg not a number: the run is refused, naming the cell |
| M12 | N-12 softShare fallback 0.05 | bentCutFabric.ts | killed | cut/ladder/substitutionSoftShare not a number: the run is refused, naming the cell |
| M13 | N-19 widths not restored | bentCutFabric.ts | killed | F-CUT holed #330 with takeOutFails: E_INVARIANT 'a lane refused by the floor could not be ta… |
| M14 | N-17 K07 abandoned run commits | bentCutFabric.ts | killed | F-CUT holed #330 with takeOutFails: E_INVARIANT 'a lane refused by the floor could not be ta… |
| M15 | N-17 K12 floor-undo not abandoning | bentCutFabric.ts | killed | F-CUT holed #330 with takeOutFails: E_INVARIANT 'a lane refused by the floor could not be ta… |
| M16 | N-17 K10 ladder goes on after abandonment (rung a) | bentCutFabric.ts | killed | F-CUT holed #330 with takeOutFails: E_INVARIANT 'a lane refused by the floor could not be ta… |
| M17 | N-17 K11 stack goes on after abandonment | bentCutFabric.ts | survived | EQUIVALENT: `ladderOn` on an abandoned run returns no children at once and the run's report is dropped with it, so the guard only saves pops |
| M18 | N-16 K03 end-rows not touched | bentCutFabric.ts | killed | the two-district case, the first end rows failing and the face then not found: the run is ab… |
| M19 | N-7 K44 bearing reversed | bentCutFabric.ts | killed | a portal’s bearing points out of the arterial into its own district: 270° for the west distr… |
| M20 | N-14 faceCase by ring equality (the old support) | support.ts | killed | round-joined, the note’s face 2: the case builds, its district owns the face the polygon dre… |
| M21 | N-22 K21 unresolved branch silent | portals.ts | killed | an extra baseLane portal whose vertex role names no vertex, beside its lane end’s real porta… |
| M22 | N-22 K15 per-vertex two-portals off | portals.ts | killed | a second portal with its own id at a lane end’s vertex (its vertex role the real one’s): two… |
| M23 | N-6 K23 bounding from the end spine only | bentCutFabric.ts | killed | L in no seam, but B — through J — the district’s seam: the end read on the interior spine L… |
| M24 | N-6 X07 tolerance x10 | bentCutFabric.ts | killed | 9° off the arrival (beyond 6°, inside 12° and 60°): refused continuation-angle, and the face… |
| M25 | N-6 X18 tolerance x2 | bentCutFabric.ts | killed | 9° off the arrival (beyond 6°, inside 12° and 60°): refused continuation-angle, and the face… |
| M26 | N-6 bounding never | bentCutFabric.ts | killed | L bounds the district (its east half the second district’s): refused continuation-boundary |
| M27 | L25 K13 insertion gap without the new lane | portals.ts | killed | the insertion read: a new lane wider than the portal it meets widens the gap (K13) — 6.4 m f… |
| M28 | L25 K16 tip gap from the portal width only | ladder.ts | killed | the antenna’s tip: a gap is max(6 m, 2 × max(the portal’s width, the lane band’s top)) (K16)… |
| M29 | L25 K12/K22 insertion breach ignored | bentCutFabric.ts | killed | with the planner’s and the ladder’s portal readings switched off (a test seam), only the ins… |
| M30 | L25 K21 portal under the ways by id only | bentCutFabric.ts | killed | the antenna’s lane ends on V and its portal is in way:b’s seam (the planned spine first), no… |
| M31 | N-26 C11 fallback to kerbSeed without the parent | bentCutFabric.ts | killed | fixture seed 4: every back-lane / through-alley block records no seed, every other block its… |
| M32 | L25 K19 a seedless child given its face pole | bentCutFabric.ts | killed | fixture seed 4: every back-lane / through-alley block records no seed, every other block its… |
| M33 | L25 K20 the unsplit pole without holes | bentCutFabric.ts | killed | a land holding a reservation hole, before S8: kerbSeed of its face lies in no hole and has t… |
| M34 | N-26 C12 the split pole without holes | bentCutFabric.ts | killed | over holed lands that stop as one deep block (two lengths, two depths, two holes, four seeds… |
| M35 | N-21 offset spines never tried | bentCutFabric.ts | killed | the 120 × 48 m land with a 6 × 2 m hole: the offset back lane cuts, two faces with a seed ea… |
| M36 | L25 K20 at makeBlock: the stop seed without holes | bentCutFabric.ts | killed | the 120 × 45 m land with a 6 × 10 m hole at seed 1: the spine runs onto the hole, is refused… |
| M37 | L20 sides read at the first ring point (Euclidean), not along the ring | ladder.ts | killed | a square end whose short side turns within the arm is no needle: the sides are read along th… |
| M38 | L20 pre-test at 5 degrees | ladder.ts | killed | an edge 8° off the cut and near it is suspect |
| M39 | Q65 squared ends below the bound too | bentCutFabric.ts | killed | a face within (d)’s bound (x05/round-joined #25, M0-x-05’s cut/court face): (c)’s straight f… |


**Gates (this machine: linux:Intel(R) Xeon(R) Processor @ 2.80GHz:4cpu:16gib, Node 24.12.0; W = 1).**
`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile` exit 0; `corepack pnpm lint` exit 0
(eslint 1 178 files, 0 errors, 0 warnings; `lint: probe-red ok`); `corepack pnpm build` exit 0; NEAR at full strength
(`corepack pnpm exec vitest run --maxWorkers=1 packages/layout/test/infill/fabric packages/testkit/test/layout/infill-fabric`)
exit 0, 24 files, 179 / 179. RELATED at 1000 (`PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run` over the four changed
sources, on the final sources: the four's hashes unchanged since) — 224 files,
2 795 passed, 3 failed, exit 1; none is the item's (rule (3): no test of its own; no file on their import paths that
existed before the item), each a note for the session: (a) testkit `ladders/rungs-s8.test.ts` cut/antenna (M0-x-05's,
the small flat town seed 6: `{ 'S8 F-CUT antenna': 1 }` against the recorded `a@attempt>=1` line) — red identically on
this round's before-image; moved by M0-a-09's round S9 kerb and classed foreign there (M0-a-09-notes, reported to
M0-x-05); (b) testkit `runner/constructive.test.ts` kernel-reads-no-model from `testkit/dist` — the dist was not built
when RELATED ran; green replayed after the build gate; (c) bench `scan/scan.test.ts` K6-6 (M0-k-06's) — vitest's 5 s
default timeout on a whole-tree scan of plat/: 4 979 / 5 128 / 4 994 ms on the before-image, 5 035 – 5 465 ms after
(a timing, never a bar here; for M0-k-06: the case needs its own timeout). The tests added after RELATED ran (the
needle pre-test's, the mint's third run, `kerbSeed`'s hole, K03) are in the item's two folders and ran in NEAR at full
strength.

## Hardening round S7 — the closing check's notes (lane `check/M0-b-03-close-s7`, 2026-10-26)

The verdict is `checks/M0-b-03-s7.md` (FAIL on three pins: L20 / Y04, Q65 / Y19, Q70 / Y23 — the failing lines are
there, not here). The rows below are the check's other new findings; none is a blocker under the brief's rule (each
fails safely, is equivalent in practice on every honest run the seat measured, or tightens a claim). "Survivor" means
a targeted mutant of this check that the item's NEAR set (24 files, 179 tests) left green.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| S7-1 | **`squaredFarEnd`'s strict foot is unpinned (survivor Y18, equivalent in practice).** The stub's foot must be the perpendicular's foot strictly inside an L1 edge (`t > 0 && t < 1`; "a nearest point at a ring vertex is no square foot: null"). Read as `t >= 0 && t <= 1`, the committed lanes, blocks, block faces and S8 report are identical on the 16 formerly unresolved F-CUT faces the seat replayed (`fcutg` hashes): a vertex foot inside its normal cone arrives non-square and the judge refuses it `kerb-arrival` (at most an extra refused rung line). | One `squaredFarEnd` unit case whose stub point's nearest ring point is a vertex: null. | M4 |
| S7-2 | **N-21's "the nearer first" is unpinned (survivor Y37, equivalent in practice).** With the farther offset tried first, NEAR stays green and the 1 000 residue districts at seed 1 are byte-identical (lanes, blocks, block faces, report); on base 10 and CITY 1 no offset spine fires (the seat's counters in `mi`). | A `holes.test.ts` case whose hole lets both offsets cut, asserting the nearer one is the committed spine. | M4 |
| S7-3 | **`squared.test.ts` asserts "every end square" only through the judge.** Its titles say "≤ 6 kernel calls, every end square"; the body checks the outcome, the rung and the face counts, and the squareness of the committed lane's kerb ends is held only by the judge's own `kerb-arrival` check. | Assert `kerbEndsSquare` (or each end's arrival within the band) on the committed lane. | M4 |
| S7-4 | **N-25's pin is the before-image's record; after S7 the case is gone from integrated CITY 5.** `seedless-part.json` equals `block:db2f94wpgb4e9`'s record on the before-image (`m0`) exactly (27 kerb points; seeds (49617, 21756), (49079, 17316); a back lane). On the tree after the round the same block is `interior: court` with one seed (49865, 18401): its back lane is no longer cut. C-0426 (13)'s "is seen on a registered seed" therefore holds for the before-image only, and the round's own shift may have removed or moved the case. | The next round's choices row restates it ("seen on integrated CITY 5 before S7"); recount seedless split parts over the registered seeds on the tree (with the fusion harness when M0-c-06 lands). | M0 (with the fix round) |
| S7-5 | **RELATED's two reds predate the round.** (a) testkit `ladders/rungs-s8.test.ts` cut/antenna (M0-x-05's): `{ 'S8 F-CUT antenna': 1 }` against the recorded `{ …, 'S8 F-CUT a@attempt>=1': 1 }`, red identically in `m0` (the before-image) and `m1`; its import path runs through `bentCutFabric.ts`, which the round changed, but the red is not the round's (the builder classes it as moved by M0-a-09's S9 kerb). (b) bench `scan/scan.test.ts` K6-6 (M0-k-06's): vitest's 5 s default timeout on the whole-tree scan — 5 822 ms in the tree, 6 367 ms in `m0`, 6 152 ms in `m1`. | Session: cut/antenna to M0-x-05 (re-record or re-pick its fixture after M0-a-09's kerb); K6-6 to M0-k-06 (its own timeout). | M0 (session) |
| S7-6 | **The census's antenna count.** The seat's runs give `antenna:refused:angle` 592 → 0 over base + CITY (CITY 588, flat 4 / 5: 4), where C-0426 writes "596 → 0 (base + CITY)" and the notes "592 on CITY". Every other census number the seat re-measured equals the round's (F-CUT 72 840 / 4 492 / 21 241 / 1 427 / 0; residue 1 → 0, `needle` 0 → 38; M0 (b) 1 → 0, `needle` 0 → 7; base + CITY `needle` 0 → 43). | Restate in the next round's row. | M0 (the round's record) |

## Hardening round S8 — the builder's notes (lane `build/M0-b-03-fix-s8`, 2026-10-26)

Fix round S8 of the session's hardening round: the closing check of S7 (`checks/M0-b-03-s7.md`, lane
`check/M0-b-03-close-s7`) failed the round on three pins — L20 (survivor Y04), Q65 (Y19), Q70 (Y23) — and confirmed
every other line. Each line now has a pin red under the checker's mutant; the code of the three rules is unchanged (the
check found each rule right). Choices row C-0427.

| line | outcome | evidence |
|---|---|---|
| **L20** — the needle's "minimum usable width at the tip" (the sides read 2.5 m along the ring, C-0426 (1)) | **PINNED** | `needle.test.ts` 'a blunt-tipped needle is a needle …': a kerb whose sides converge 3° apart to a tip cut off square 30 cm wide — `needleTips` reports both tip vertices (0, 0) and (0, 30) (10.7° over the arm); the river 900 seed 2 figure (an end 42 cm wide, the sides 0.3° apart) reports both too; an end 3 m wide reports none. **Y04** (the sides read at the adjacent ring vertices) is red there (`expected [] to deeply equal [ { x: +0, y: +0 }, { x: +0, y: 30 } ]`): each tip reads about 90° at its neighbours. |
| **Q65** — the blocks the squared faces now get, recorded | **PINNED** (the DECLARED shift of C-0426 (2) recorded in this round) | `squared.test.ts`'s six faces (F-CUT concave #106, 748, 1274, 1361, 1920, 2015 at seed 1) each assert the one committed lane's chain (read from the arena's own tables by the test's `chainOf`, from the end with the smaller (x, y)), its width (to 10⁻⁶ cm), 2 blocks and 2 block faces, recorded from the tree as S7 landed it (table `SQUARED`). Each chain is three points: the straight cut, its corner K and the square stub. **Y19** (the leg L / 2) is red there on #106 (`expected [ [ -242122, 151783 ], …(2) ] to deeply equal [ [ -242097, 151990 ], …(2) ]`). |
| **Q70** — NO-SHIFT on the take-out path | **PINNED** | A test seam `FabricFaults.wholeLiveMint` (every mint reads the whole live list, the reading before Q70; no stage, runner or bench sets it — grep of `packages/*/src` and `bench/src`) and `mint.test.ts` 'a run that takes a lane out again …': the needle wedge (`support.ts`'s `needleWedge`, moved from `needle.test.ts` unchanged) refuses its antenna split 'needle' — the lane, its junction and its portal taken out — and a later rung mints at the same creation index; the run's minted entities, lane ids and block ids equal the whole-list run's, and no address takes a `~k`. **Y23** (`LiveIndex.pop` leaves both indexes holding the entry) is red there (`expected [ …(242) ] to deeply equal [ …(241) ]`: the stale lineage moves the re-mint to dup 1 and the run on). |

**Self-check (J183).** One mirror, `/home/user/maps-scratch/waves/selfcheck-build-M0-b-03-fix-s8` (`cp -a`; no
absolute link into the tree; `@plat/kernel` resolved inside it; deleted after). Y04, Y19 and Y23, the checker's
mutants as its verdict states them, each applied alone, run with `--maxWorkers=1 --bail=1` first on the pin's file and
then over the item's two folders, each restored by copy and `cmp -s`: 3 of 3 killed, each by its new pin (the first red
file in the folder run is the pin's). Without a mutant the pins are green (NEAR).

**Census (J264 (4), N-58).** No outcome moves: the round's one source change is a branch taken only when a test sets
`wholeLiveMint`, and the three pins assert today's outputs. The census is therefore the closing check of S7's after-
state, unchanged: `unresolved` F-CUT 0, residue 0, M0 (b) 0, base 0, CITY 0; `antenna:refused:angle` 0; stage /
district refusals 0. **Timing** (Q70, KI-12): none taken; the seam adds one comparison per mint.

**The closing check's other rows (S7-1 – S7-6).** Not this round's lines (none a blocker). S7-4 and S7-6 ask for a
restatement in the next round's row; C-0427 (4) restates both.
