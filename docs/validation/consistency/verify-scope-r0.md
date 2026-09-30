# Verify — scope part (title, summary, §0, PART I heading, §1, §13–§17, Delegated decisions, Judgment calls, Staged, Appendix A), consistency pass round 0

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-scope-r0`, 2026-09-26. Status: COMPLETE. Verifies the scope part of the assembled
`docs/ARCHITECTURE.md` (title block l. 1–19, summary l. 20–83, §0 l. 84–122, PART I heading, §1 l. 125–297, §13–§17
l. 7498–8870, Delegated decisions, Judgment calls, Staged and Appendix A l. 9140–9639) against the archive
`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`, `inventory-scope.json` (828 items + 11 conflict records),
`canon.json` (by-id routing, the 23 conflicts touching the part, the scope open items and routed edits, the scope-homed
facts' other-part members and detail gaps), the whole mapping table of `rewrite-scope.md` (839 rows + 10 MOVE IN rows,
none sampled), `docs/ARCHITECTURE-RATIONALE.md`, `still-open-r5.json`, and every cross-part note the other five rewrite
reports address to this part. Every section of the new part was read in full; every inventory statement was checked
against it; the archived text was read wherever a statement was abridged or a clause-coverage script flagged a loss.
Scratch files are in a private scratchpad subdirectory (`vs-verify-scope/`).

## 1. Outcome

The part is sound. All 839 inventory records and the 10 MOVE IN facts are accounted for; the assembled sections are
byte-identical to `new/scope/01`–`14`. The four open items this part owns — **VS5-1, VS5-2, VS5-3 and VD5-7 — are
FIXED** (§3), every routed scope edit (VK5-1, VK5-2, VD5-3, VD5-4, VD5-5, NR5-1, NR5-2, NP5-2, NP5-4) is in, and every
canon conflict routed here is resolved as ruled (§4). The single review banner replaces the per-section markers (one
"PENDING FABLE REVIEW" line in the whole document). No deferral wording and no round narration remain in the part.

**12 issues, all minor (0 blocker, 0 major, 0 UNFIXED, 0 DEFERRAL-WORDING): 10 owned by scope, 2 by determinism.**
Five are details lost at a scope home because a restatement elsewhere became a pointer to it without the union of rule
R13 (V-SCOPE-01 … -04, -08); four are disagreements (V-SCOPE-05, -06, -09, -10); one broken landing (V-SCOPE-07); two
small new problems of the rewrite's own wording (V-SCOPE-11, -12). Seven of the twelve were also found by the kernel,
model or determinism verifiers (ids given); they are listed here because each is in this part's text or pointers.
Part size: 420 603 → 277 970 bytes (66.1 %), at the top of the pass's 55–65 % target (observation O-1).

**CONFIRMED vs PLAUSIBLE.** CONFIRMED (executed): the identity diff, the mapping's completeness, the numeric survival
check, the judgment-row diffs and index coverage, the rationale file's verbatim checks, the sub-anchor resolution, the
scans, and each issue's absence or disagreement (grep over the whole new document and the archive). PLAUSIBLE (reading
only): that no other compressed sentence shifted meaning — one full reading of the new part against the inventory and
the archive, no second reader — and the severity of each issue.

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| V-SCOPE-01 | minor | lost | scope | SCOPE-158 (home §13.1) lacks the detail of its model member MODEL-169: the archived §2.3 S1 fixture was "3 000 m relief, **hill-acropolis site**"; §2.3 now points to §13.1, whose sentence says only "a 3 000 m relief fixture stores without a clamp" (grep "acropolis": only §7.7's form name, l. 5401). Same finding as V-MODEL-02. | §13.1 Properties: "a 3 000 m relief fixture with a hill-acropolis site stores without a clamp and D8 is defined …". |
| V-SCOPE-02 | minor | lost | scope | SCOPE-203 "§2.6's test" (§13.2, l. 7703–7710) is now the only statement of the test (§2.6 l. 1008–1010 points to it) but lacks four clauses of the archived test (archive l. 1453–1460, MODEL-264): every carried ring simple; a neighbouring plot re-fitted onto a shared party wall adds its corner to the wing ring along that wall; a replay reproduces the rings; the hand-built composition's shape (composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on a corner and one inside, rooms in one wing). Same finding as V-MODEL-03. | Add the four clauses to §13.2's "§2.6's test". |
| V-SCOPE-03 | minor | lost | scope | SCOPE-205 / -206 (§13.2 load verification) keep the fixtures but not their pass criteria from MODEL-403 / -408: the corrupt snapshot's "session's digest after the replay equals a fresh replay's"; the altered-naming-record case's "a corpus selection made afterwards renames exactly what a session that never saved renames"; the 100 ms case's "the edit applies at once, and after either choice the session's digest equals the digest a fresh load of the saved document replays to, and that load reports no mismatch" (grep: none of the three anywhere; "never offered as the saved town" survives as §2.9's rule, l. 1375, and "a mismatch withdraws" as §6.2 (iii), l. 4311). Same finding as V-MODEL-04. | Add the three criteria to §13.2's load-verification fixtures. |
| V-SCOPE-04 | minor | lost | scope | SCOPE-145 (§13.1 stretch fixture, l. 7564–7567) keeps "the rest of each chain unchanged and every remaining profile sample within 10⁻⁹ cm" but not KERNEL-228's "and every other role unchanged" (archive §3.4 l. 2756); §3.4 now says only "Fixtures: §13.1". Same finding as VK-R0-10. | Append "and every other role unchanged" to §13.1's stretch fixture. |
| V-SCOPE-05 | minor | conflict | scope | KERNEL-123 listed "an outer moat at S5a" among the M3a carve fixtures; §3.3 now points to "the carve fixtures of §13.1–§13.2" (l. 1757) and §16 M3a's exit still lists it among "the clear-region fixtures of §3.3" (l. 8616), but §13.1's carve fixtures (l. 7542–7560) — the test home — do not. The fixture is stated only in a milestone row whose pointer chain ends at a home that lacks it. VK-R0-1 raised this as lost; its evidence that §16 omits the fixture is inaccurate (observation O-7). | Add to §13.1's kept-content/carve fixtures: "an outer moat carved at S5a — the same footprint, contact and role assertions"; §16 M3a may then point to §13.1. |
| V-SCOPE-06 | minor | conflict | scope | §13.1 Properties (SCOPE-154, l. 7599) test "`insetFace` empties monotonically", an op that does not exist; §3.4's uniform inset is `insetRing` (l. 1980). Pre-existing (archive l. 9357), not in the canon. Same finding as VK-R0-13. | Rename to `insetRing` in §13.1. |
| V-SCOPE-07 | minor | broken-reference | scope | §0.2 row 5 (SCOPE-046, l. 108) lands owner rule 5 in "§7.1 (the clause map, the edit-target table and its registry test)" and names §7.1 as the clause map; the new §7.1 "Edit targets" paragraph (l. 4749–4755) dropped the archive's "The rule, clause by clause:" and "a CI test fails if a generated type has none" — the registry test is now §2.8's path test, stated in §13.2 (MODEL-354 moved in). Same finding as VDC-16 (determinism's alternative fix: restore a pointer in §7.1). | §0.2 row 5: "§7.1 (the edit targets, clause by clause, and the edit-target table), §7.2–§7.6, §2.8 (edit paths in the entity registry; its completeness test, §13.2)". Either this or VDC-16's §7.1 pointer suffices; both together are consistent. |
| V-SCOPE-08 | minor | lost | determinism | SCOPE-208 is referenced to DETERMINISM-298 (§6.5 (9)), which the canon flagged with this detail gap, but §6.5 (9)'s truncation identity (l. 4582–4586) names only the `setAttr(name)` + `undo` and `rerollLayer` + `undo` pairs; the **lock + unlock** case and "the freeing event re-draws by case (4), with its rename stored in the event" are stated nowhere (grep: no test mentions `unlock`). Determinism note 3 asked scope to check that SCOPE-207 / -208 carry every archived §6.3 case. Same finding as VDC-2. | §6.5 (9) truncation identity: "… a `setAttr(name)` + `undo` pair, a `lock` + `unlock` pair and a naming `rerollLayer` + `undo` pair, each around a corpus selection — the freeing event re-drawing by §6.3 case (4), listed, confirmed and stored in the event …". Alternative: scope adds the case to §13.2's naming-input fixtures. |
| V-SCOPE-09 | minor | conflict | determinism | SCOPE-176 is a restatement of DETERMINISM-291 (§6.5 (9) cross-host); the canon flagged the detail gap "pool sizes 0–3" for the union. §6.5 (9)'s cross-host bullet (l. 4570) still reads "Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off" (no pool sizes), while §13.2's Stage contract tests (l. 7651–7652) still state the whole fact with "pool sizes 0–3" (the mapping calls it a pointer) and §13.3 (l. 7842–7843) relies on "the contract tests of §13.2 covering 0–3". Two statements of one test, the home lacking the non-home's detail. | §6.5 (9) cross-host: "… workers on and off, pool sizes 0–3". Scope may then reduce §13.2's sentence to "§6.5 (9)'s cross-host test is the stage contract test" and §13.3's parenthetical to "§6.5 (9)'s cross-host test covering 0–3". |
| V-SCOPE-10 | minor | conflict | scope | Kernel note 5 (valid) not reflected: the KERNEL-357 judgment (each Steiner split keyed by its route edge's endpoints, over the split vertex's lattice point alone) is mapped by the canon as a rationale copy of J-DET-36 (SCOPE-648), but J-DET-36's Part A row and index row do not contain it; the passage survives only in rationale F.2 (l. 1106–1108) under a heading that still carries the instruction "append it to J-DET-36 or give it its own row". A vetoable choice with no index entry, and an unexecuted instruction in the rationale file. | Append the passage to Part A's J-DET-36 row, marked "(amended by the consistency pass: KERNEL-357's split key)"; extend the index row ("…; Steiner splits in their partition's chunk, keyed by their route edge's endpoints"); drop the instruction from F.2's heading. |
| V-SCOPE-11 | minor | new-problem | scope | §16's closing paragraph (l. 8671–8674) says "the subjects the owner's roadmap places **after these milestones** … are the one list in *Staged by the owner's roadmap*", but since SCOPE-C11 that list includes stage 2, "built in this program at M5 (§16)" — one of these milestones. | "the subjects the owner's roadmap places after the base — stage 2 at M5 above, the others staged by the owner — are the one list in *Staged by the owner's roadmap*; …". |
| V-SCOPE-12 | minor | new-problem | scope | The judgment index row J-S43 (SCOPE-809, l. 9582) reads "the fix-all line widened by 3–4 pw for six new components"; §16's effort table renamed that line "mechanisms the lines above do not price" (l. 8638), so the index names a line §16 no longer has, and keeps fix-round naming in the normative text. | Index row J-S43: "the unpriced-mechanisms line of §16's effort table widened by 3–4 pw for six new components". |

## 3. Open items owned by this part (VD5-7, VS5-1, VS5-2, VS5-3) and routed scope edits

UNFIXED: none.

| item | where it is fixed (checked in the assembled text) | verdict |
|---|---|---|
| **VS5-1** | §16 M1 content: "a saved town **of the running output version** opens by decoding its snapshot and comparing its recomputed root with `model.digest` … a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 steps 3 and 5); **a document whose `outputVersion` is not the running one is never root-checked**: it opens as §2.9 step 2's frozen view — each chunk checked by its content hash, the state decoded for view and export only, labelled "made with oK; not verified by this version" — with the offer to open its recipe under the running version and §6.4's preview notice; the `frozenImport` rebase arrives with M3a's rebases"; the M2a clause reads "opens an M1 document of the running output version". M1 exit: "a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message". J-S40 and J-I19 amended (diffed). Model companion §2.9 step 5 present (V-MODEL report). The item's text named "§13.3's notice"; the new text says "§6.4's preview notice", and §6.4 shows "the preview notice of §13.3" — one hop, same notice. | FIXED |
| **VD5-7** | The item's first option: §16 M2a content "with the keep, §6.4's link rule that the base is the recipe, with its message — a link is emitted only for a town that rule and §6.4's log rules allow, and a rebased town, a kept saved town included, is offered as its `.plat` file"; M2a exit "a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)"; M3a keeps only "the pack and host-content link refusals" and its exit no longer lists the kept-town case. §6.4 states the rule and the message ("this town was kept from a saved copy and cannot be rebuilt from a link"). | FIXED |
| **VS5-2** | §13.6 (2): "for `area`, the district's own `bent-cut` fabric (the base's, II.2) opened as a `refine` close-up — no `setAttr`, its building count the city-LOD count (II.1, II.4); for `street`, `square` and `ring`, `setAttr(district.fabric, template)`, a `replace` close-up (II.4)"; the `D5Pair` NG comment carries the same mapping; J-S34 amended "(`area` = the base's `bent-cut` …)" (diffed). Pipeline companion II.2: "The `area` template is the base's own bent-cut fabric (`FabricStrategyId` `bent-cut`, §4.6), the default, opened as a `refine` close-up"; II.1's `FabricStrategyId` comment agrees. | FIXED |
| **VS5-3** | §17.1 (4): "its inputs to the product are three files committed the same way into `plat/goldens/d5/⟨milestone⟩/`: `ftg-captures.json` … and `ng-counts.json` …, numbers only, which `plat d5 seeds` reads and nothing else, and the sitting's `record.json` — numbers, hashes and the owner's answers, no reference image or reference data (§13.6 (9)) — which the milestone record and the release notes read" (the item's sentence, verbatim in substance); D-29 points to "the committed files of §17.1 (4)"; §13.6 (2) and (9), §13.3's `MilestoneRecord.d5.record` and §14's `@plat/docs` agree. | FIXED |
| VK5-1 (routed) | §13.1 indexes: "a `drawBoundary` that moves a kept block from district A to district B, B's partitions rebuilt before A's — every L3 query over the block returns each plot once, before and after A's rebuild". | present |
| VK5-2 (routed) | §13.1 carves: "a deck whose bank vertex also carries a width knot, removed by F-REDERIVE — the vertex ends unpinned, its knot kept". | present |
| VD5-3 (routed) | §13.2 naming inputs: "a frozen fixture whose naming row changed imports with its renames listed, and a New random made afterwards renames nothing outside its scope". | present |
| VD5-4 (routed) | §13.2 load verification: "a `drawBoundary` that moves surviving blocks, saved and reloaded, reports no corrupt cache". | present |
| VD5-5 (routed) | §13.2 load verification: "an Adjust made during load verification in an epoch-grown town, saved and reloaded, reports no records mismatch". | present |
| NR5-1, NR5-2 (routed) | §14: `TileAddress`, `TileRasterOpts`, `TileBackend`, `RasterJob`, `VectorBackend` → "§8.9"; `LabelPlacer` and `PlacementJob` → "§9.2's `LabelRows` view: §9.2"; `@plat/model` lists "the label-row tables `LabelTable`, `StringTable`, `GeomTable` with §9.2's `LabelRows` view (§8.1)"; the dependency paragraph names "the label-row tables and `LabelRows`" among the types from `model`. §9.2's interface takes `labels: LabelRows` (l. 6427–6428). | present |
| NP5-2 (routed) | J-I18 amended with S5b's extra-bridge batch (diffed; index row says so). | present |
| NP5-4 (routed) | §14 holds no copy of the composition types ("`BuildingGenerator` { `outline(…)`; `compose(…, lod)` } is §2.6's"); nothing to rename. | present |

## 4. Canon conflicts touching the part (23 records; SCOPE-C05 = KERNEL-C01, SCOPE-C08 = CF-PIPE-07)

| conflict | verdict (checked in the new text) |
|---|---|
| SCOPE-C01 model time vs MFCG | RESOLVED — §13.5's generation-time row keeps its bar "(the ratios at MFCG's matched building counts are §12.9's)"; §1.1's model-p95 column removed, "Budgets inside a rung" points to §12.3 / §12.5 / §12.8 / §12.9; D-18 points to §12.9 "a declared trade" with no rounded ratio. §12.9 states 1.8× / 2.3× / 5.1×; §12.3's table holds 92–110 / 265–340 / 724–880 ms. |
| SCOPE-C02 (VS5-3) | RESOLVED — §3 above. |
| SCOPE-C03 campaign bound | RESOLVED — §13.2 alone states the executed counts; §15.2 O9 (c) "judged by §13.2's calibrated rank campaign, whose design and executed calibration are stated there"; J-S4 amended; "≥ 99.5 %" occurs nowhere (grep 0). |
| SCOPE-C04 scripted tasks | RESOLVED — §15.2 O16 full (c) "the scripted tasks of §13.4", no list; §13.4 lists seven. |
| SCOPE-C05 / KERNEL-C01 Clipper2 | RESOLVED — §1.7 "with Clipper2 and `polygon-clipping` as CI oracles (§3.7 states the one case in which Clipper2 ships)"; §14 `@plat/testkit` "the boolean and buffer oracles (…; §3.7)"; §16 riskiest items "(M0 a; §3.7's pre-decided fallback)"; §17.4 "dev (shipped only in §3.7's pre-decided fallback)"; D-14 "with the oracles and the one pre-decided fallback of §3.7". None restates "oracles only". |
| SCOPE-C06 (VS5-1) | RESOLVED — §3 above. |
| SCOPE-C07 (VD5-7) | RESOLVED — §3 above. |
| SCOPE-C08 / CF-PIPE-07 (VS5-2) | RESOLVED — §3 above. |
| SCOPE-C09 plot width | INVALID per canon — no change: §15.2 O5 (b) keeps "0 plots < 3 m"; §3.2 (2) keeps `minPlotWidth = 2.5 m`; D-19 points there. |
| SCOPE-C10 CityJSON | RESOLVED — the §0.6 completion record left the normative text (rationale Part B); D-8, §11.1, §14 `@plat/export`, §16 M3b and "CityJSON is built (§11.1)" agree. |
| SCOPE-C11 staged list | RESOLVED — one list in *Staged*, its preface "the one list of subjects the owner's roadmap places after the base: stage 2 is built in this program at M5 (§16)" and the stage-2 row "(built in this program at M5, after the base)"; §1.1's stage table and the summary point to it; §16's pointer sentence has a wording slip (V-SCOPE-11). |
| MODEL-C03 (NP5-4) | RESOLVED — no copy in §14. |
| KERNEL-C06, KERNEL-C12 | RESOLVED — J-K6 amended ("one per district plus one for everything outside districts … §3.3's three moments"); index row agrees. |
| CF-PIPE-02 | RESOLVED — §14 `Stage<I, O> extends StageDecl` keeps `version`, `inputsOf`, `run` and points to §4.12, whose `StageDecl` carries `workLimits`, `budgetMs` (reporting only), `lineageUnit`, `txForm`. |
| CF-PIPE-10 (NP5-2) | RESOLVED — J-I18 amended. |
| DETERMINISM-C-2 | RESOLVED — J-DET-20 amended (`reroll.maxAdvance`, default 3); index row says so. |
| RENDERING-C01 (NR5-2), RENDERING-C02 (NR5-1) | RESOLVED — §3 above. |
| CANON-C03 frames | RESOLVED — §1.1's rung table gives "area; side at the default aspect 1, §3.2 (9)". |
| CANON-C08 key components | RESOLVED — §1.4 "(key components §6.1)"; D-15 "keyed from §6.1's structured components". |
| CANON-C09 FTG entrance | RESOLVED — §1.4 "≈ 3 m from the road (C9; 2.99 m measured, §13.5)". |
| CANON-C10 delivery bars | RESOLVED — D-9 "with their bars in §13.5"; §13.5 holds tier-6 omissions 0 and degraded ≤ 5 %. |

Canon rulings not made by this pass: RULING-1 (the owner's GPL-3 intent against §17.3 / D-22's proprietary default) is
unchanged, as the canon rules — owner-gated (O-5). GAP-1 and GAP-2 are not this part's.

## 5. Cross-part notes addressed to the scope part

| from | note | verdict |
|---|---|---|
| kernel 4 | MOVE IN KERNEL-129 (§13.2), -131, -282, -343, -363 (§13.1); the VK5-1 and VK5-2 fixtures; "the harness reports both shares per operation" | reflected (all present; §13.1 "the harness reporting both shares per operation and drawing ≥ 10⁵ unattracted cases per operation") |
| kernel 5 | rationale: attach the kernel companion's passages to their J rows; new row J-K36; KERNEL-357's passage into J-DET-36 or its own row; J-K6 amended; J-K34 may add partitions | J-K36 and J-K6 reflected; the passages sit verbatim in rationale F.2 keyed by J id (judged satisfied — nothing lost, each names its row); J-K34's index row names "moves to another partition"; **KERNEL-357 not reflected → V-SCOPE-10** |
| kernel 6 | §13.3 may say which pool sizes the nightly run samples | reflected: "pool sizes 0 and 3, the contract tests of §13.2 covering 0–3" (this also answers VK-R0-9; see V-SCOPE-09 for the remaining residue) |
| kernel 11 | §1.7, §14 `@plat/testkit`, §16, §17.4, D-14 point to §3.7 for Clipper2 | reflected (§4 above) |
| model 15 | MOVE IN MODEL-274, -339, -354, -430; §13.2 is the only statement of "§2.6's test" (incl. the generation-equals-regeneration compound and the stage-3 intake run) and of the load-verification fixtures | move-ins and the named fixture families reflected; the test's own clauses and pass criteria not carried → **V-SCOPE-02, V-SCOPE-03** (and V-SCOPE-01 via the canon member MODEL-169) |
| model 16 | §14: rename any composition copy; unit types; `Polygon` one ring | reflected — §14 holds no copy; its `Scope.ring: Polygon` reads as one ring under the model's D1 |
| model 17 | rationale rows J-P50, J-DET-52; index rows for every J id §2 cites | reflected (both rows present with archived text; the index has all 276 ids) |
| model 18 | cite §2's anchors as they now read | reflected — every §2 anchor the part cites resolves (§2.2 rules 3, 7; §2.9 steps 2–5, "steps 3–4", "steps 3 and 5"; "§2.6's test") |
| pipeline S-1 | J-I18 gains S5b's batch | reflected |
| pipeline S-2 | §16 M0 (b) re-measures NG's signature on curved, round-joined, triangular, C-shaped and holed faces | reflected |
| pipeline S-3 | §13.1's neighbour step at a footprint corner, with block, plot and wing rings | reflected |
| pipeline S-4 | §1.1: a rung without a population takes the target; population outside the rung's band an F-EDIT conflict | reflected |
| pipeline S-5 | §14 `Stage<I,O>` keeps only its extra fields | reflected |
| pipeline S-6 | VS5-2's wording | reflected |
| pipeline S-7 | union the §9 passages into their J rows | judged satisfied, not raised: the passages are verbatim in rationale F.3 under a preface that keys each to its row (J-P2, J-P4, J-3, J-P5, J-P6, J-P11, J-P21, J-P36, J-9, J-S42); merging them into the Part A cells would change presentation only |
| pipeline S-8 | index rows may add the new places | optional; the index's "where" column names each rule's section — no change needed |
| determinism 3 | §13.2 gains the VD5-3, VD5-4, VD5-5 fixtures; SCOPE-207 / -208 carry every archived §6.3 case, incl. the re-sited bridge and the one-row `editTable` | fixtures and both named cases reflected; the lock + unlock / `setAttr` + undo case is stated nowhere → **V-SCOPE-08** (home §6.5 (9), determinism) |
| determinism 8 | fold R01–R26 into the J rows; J-DET-53, J-DET-54 new; J-DET-20 amended | reflected (rationale F.4 R01–R26 by J id; both new rows; J-DET-20 diffed) |
| determinism 9 | D-9 → §13.5; GAP-1 unchanged | reflected |
| determinism 10, scope 1 | tag style | not a scope-part defect: this part removed every fix-round tag; audit tags remain in subsection headings — the document-wide convention is the validator's (O-2) |
| rendering (§14) | TileRasterOpts / RasterJob / TileBackend and LabelPlacer copies → pointers; `@plat/model` and the dependency paragraph add `LabelRows`, `LabelTable`, `StringTable`, `GeomTable` | reflected |
| rendering (J rows) | J-R55, J-R56 new; J-R53 "6–9 % smaller" if it quotes the percentage; longer passages kept in the sidecar | J-R55, J-R56 reflected; J-R53 quotes no percentage, so nothing to change (judged not applicable); passages in rationale F.5 |
| rendering (§13.2 / §13.5 / D-18 / §1.1 / §15.2) | MODEL-430 / RENDERING-402 in §13.2; §13.5, D-18, §1.1 → §12.9 / §12.3; §1.1 frames as areas; O3 (d) and D-18 → §12.3's declaration | reflected |

## 6. Mechanical checks (executed)

1. **Identity.** The 14 assembled sections equal `new/scope/01-title.md` … `14-appendix-a.md` (trailing newline
   aside): 14 / 14 identical.
2. **Mapping completeness.** A script joined `inventory-scope.json`, `canon.json`'s `by_inventory_id` and the mapping
   table: 839 of 839 records mapped (828 SCOPE ids + 11 conflict records), 0 extra, 0 duplicate, 0 kind mismatch, 0
   canon-action mismatch (506 state, 272 rationale, 37 reference-section, 13 drop-history, 11 conflict). Canon roles:
   470 scope homes, 36 restatements of other parts' homes (21 rendering, 12 determinism, 3 pipeline), 37 section or
   summary restatements, 272 rationale, 13 history.
3. **Numbers.** Every digit group of the statements and values of the 470 scope-homed "state" items is present in the
   new part except in 19 items, each accounted for: history or rationale moved out (SCOPE-006 "0.11", -038 panel
   scores, -040, -215's verifier and first-night figures, -532 "94-package closure", -553, -554 — all in the rationale
   file); referenced per canon (SCOPE-066 / -067 / -068 model-p95 cells → §12.3, where 92–110 / 265–340 / 724–880 ms
   stand; -415, -425, -467, -527 → §12.3 / §12.5 / §12.9; -426's "≥ 99.5 %" removed by SCOPE-C03; -528's 0.47 → §4.2 S3
   (4)); tags or formatting (-212 "32 817" = 32 768 + 49; -221 "144" = 12 × 3 × 4; -273 the COV tag number).
4. **Other-part members of scope homes (rule R13).** The 47 scope-homed facts with members in other parts were read
   member by member (the canon's 10 numeric detail gaps included). Unions present: DETERMINISM-030 (self-touching,
   no self-intersecting output, no undeclared sliver; 10⁶ per primitive via §13.8 and M0), -049 (≥ 95 % of seeds),
   -061 (0 crashes on the 1 000 holed polygons), -259 (fate report, event, rebased document, 0 duplicate ids, 0 silent
   re-binds, re-sited bridge, one-row `editTable`, quarter names), -465 (§13.2's executed calibration), KERNEL-262 /
   -315 / -123 (except the outer moat, V-SCOPE-05), PIPELINE-055 / -131 / -416, MODEL-244 / -280 / -282. Missing:
   MODEL-169 (V-SCOPE-01), MODEL-264 (V-SCOPE-02), MODEL-403 / -408 (V-SCOPE-03), KERNEL-228 (V-SCOPE-04).
5. **Pointer targets.** Every "referenced to §x" id was read at its target: §12.1 (timing phase, calibration score),
   §12.3 (laws, knees, max clause, pool rule), §12.5 (first-map laws and runs at M1 / M2b), §12.6 (± 20 % from M2a /
   M2b), §12.7 (A2 300-dpi run, 50 ms occupancy), §12.8 (300-edit document at pool sizes 0 and 3), §12.9 (1.8× / 2.3× /
   5.1×), §8.2 (role continuity by family and milestone; §16 M1 carries ink's city → district switch), §8.3 (census,
   slot resolution 0 unresolved / 0 ambiguous, stamp-tile hashes), §8.5 (first paint; access-critical ways ≥ 95 %),
   §8.9 (`TileRasterOpts` with `lightStep`), §9.2 (`LabelRows`; the pin-pass fixture), §9.4 (± 1 of 9 / 12 / 18),
   §5.3 (the digest-maintenance oracle), §6.1 (town-root key), §6.4 (preview flag and "the preview notice of §13.3";
   link rules), §6.5 (3) (lint scope, import closure), §6.5 (9) (see V-SCOPE-08, -09), §7.3 item 7 (v) and (vi), §7.4
   (the thirteen asks), §4.2 S2 (0.87–0.92), §4.9 (O19 (a)–(g)), §4.11 (epoch, conversions, the staged engine), II.1,
   II.2, PART III.
6. **Judgment calls.** The 269 archived rows are all in rationale Part A, verbatim except exactly the 7 rows the canon
   amends (J-K6, J-DET-20, J-S4, J-S34, J-S40, J-I18, J-I19 — each diff matches its ruling and carries the
   "Amended by the consistency pass" note); the 7 new rows (J-K36, J-DET-52, -53, -54, J-P50, J-R55, J-R56) carry
   their archived passages; the index has 276 rows = Part A's 276 = the canon's `judgment_index` (0 missing either way);
   every index row's one-line choice was read against its full row (276 / 276) and every "where" names a section that
   states or points to the rule. The archived Judgment-calls preface (round ledger) is Part A's preface (19 / 19 lines).
7. **Rationale file, verbatim.** Part B holds every archived §0 and title-block line the part no longer states
   (0 missing); Part C holds A.1, A.2, A.4, A.5 (0 missing); Part D holds the 35 archived D rows (35 / 35); Part E's
   seven passages are verbatim from the archive (0 non-verbatim).
8. **Clause coverage, both ways.** 3-gram coverage of the archived part's clauses against the new document: 206
   clauses below 0.5, each read — history or rationale moved out, a pointer replacing a restatement, summary
   paraphrase, or an issue / observation of this file. New clauses against the archive: 67 below 0.6, each read —
   pointers, canon and open-item wording, the banner; no new fact beyond the open items and rulings.
9. **Sub-anchors.** The 48 distinct qualified references of the part (§x.y (n), S-items, steps, rules, items, cases —
   e.g. §4.2 S3 (11), §7.3 item 7 (vi), §2.9 steps 3–4, §6.3 case (4), §3.3 pool step 1, II.1 rule (5)) resolve to
   existing labels in their targets.
10. **Scans.** One "PENDING FABLE REVIEW" line in the whole document (the banner, l. 3). No fix-round id (VS/VD/VK/NP/
    NR/VP) and no "round N" in the part (the J-S43 index row's "fix-all line" is V-SCOPE-12). "Later" 26 times, each read —
    ordinary English ("each later wall ring", "a later release"), the `VILLAGE-LATER` tag, or an owner-staged subject
    (village, corpus calibration, evolution, embedding in a host); no "TBD", "to be decided" or open question.
11. **Size.** 420 603 → 277 970 bytes (66.1 %).

## 7. Observations (not raised)

* **O-1 Size.** 66.1 % of the pre-pass bytes, just above the 55–65 % target; the rewrite report gives the reason (the
  part's own tests, matrices and build rows).
* **O-2 Tag style.** This part removed every fix-round tag; the headings of §13.3, §13.7, §13.8, §13.9 and §17.1–§17.4
  keep audit tags (G-P11, G-R9, IMP-6, DEF-1, SCL-18, DEF-9, IMP-1, IMP-15, DEF-14, IMP-14) as the rewrite decided. The
  document-wide convention (the kernel part keeps fix-round tags, VK-R0-8) is the validator's.
* **O-3 An evidence clause dropped outside the inventory.** §1.4's secondary-streets MFCG column lost "the 2017
  ancestor drew streets on cell edges" (and "real, fully connected" → "connected"); archive l. 425. Not an inventory
  clause and not a design fact; restore if the evidence column should stay complete.
* **O-4 `TOWN_ROOT`.** §14 names the identifier and points to §6.1, which describes "the town root's entity key" (seed
  key mixed with the fixed town lineage) without naming it; §9.5 glosses the same key as "the seed key alone" (rendering
  wording, pre-existing). The J-S27 index row's "where" (§9.5, §14) could add §6.1.
* **O-5 RULING-1.** §17.3 / D-22 keep the proprietary default against the owner's stated GPL-3 intent — an owner
  decision the canon leaves open by design; unchanged here.
* **O-6 VK-R0-9** (nightly pool sizes) is reflected in the text: §13.3 says "pool sizes 0 and 3, the contract tests of
  §13.2 covering 0–3"; this file is the record the kernel verifier asked for. V-SCOPE-09 is the remaining residue.
* **O-7 VK-R0-1's evidence.** §16 M3a's exit does list "an outer moat at S5a" (l. 8616); the fixture is missing only
  from §13.1, so V-SCOPE-05 is a conflict between two statements of the part, not a loss from the document.
* **O-8 Mapping labels.** The mapping calls SCOPE-176 and SCOPE-200 "referenced", but §13.2 still states both; for
  SCOPE-200 that is right (§13.2 is the only statement of the rich-compound fixture; §7.3 item 7 (vi) holds the
  district fixtures), for SCOPE-176 see V-SCOPE-09.
* **O-9 Summary.** The new one-page summary no longer paraphrases SCOPE-025, -028 or -029 (the warp carrying outlines,
  the frozen view, the kept town shared as a file); the facts stand at their homes and R11 lets the summary select.
  The summary's figures are all canonical (§12.3's 58 800, §12.5's 48 000 and 2.3 s, §16's 153–204 pw).
* **O-10 Rationale presentation.** The other parts' longer passages sit in rationale Part F keyed by J id rather than
  merged into the Part A cells (pipeline S-7, kernel 5, determinism 8) — nothing is lost; only KERNEL-357's lacks a row
  (V-SCOPE-10).

## 8. Checked list — every inventory id (839 records; none sampled)

Verdicts: "OK — stated" = the fact is stated at the new location with the archived meaning; "OK — pointer" = the
restatement became a pointer and its target states the fact; "OK — Part A row" = the judgment call is in the rationale
file (verbatim, or amended exactly as the canon rules) with its index row; "OK — verbatim in the rationale file" =
history moved out; an issue id marks the rows of §2.

| id | kind | canon | new location (mapping, abridged) | verdict |
|---|---|---|---|---|
| SCOPE-001 | defined-term | state | title block (codename; placeholder per D-19) | OK — stated at the new location |
| SCOPE-002 | rule | state | title block — *How to read this file* | OK — stated at the new location |
| SCOPE-003 | rule | state | title block (the evidence tags) and §0.3 / Appendix A (CONFIRMED vs PLAUSIBLE) | OK — stated at the new location |
| SCOPE-004 | history | drop-history | history — moved verbatim to rationale file Part B (former title block); pointer to ARCHITECTURE-VALIDATION.… | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-005 | history | state | §0.1 (the lane, run and base in one sentence); verbatim in rationale Part B (former title block) | OK — stated at the new location |
| SCOPE-006 | marker | state | title block — the single consolidation banner; all 133 per-section banners removed | OK — stated at the new location |
| SCOPE-007 | rule | reference-section | summary (plain-words paraphrase; its section is §1.1) | OK — paraphrase or pointer present; target states it |
| SCOPE-008 | rule | reference-section | summary (plain-words paraphrase; its section is §1) | OK — paraphrase or pointer present; target states it |
| SCOPE-009 | restatement | reference-section | summary (plain-words paraphrase; its section is §4.2) | OK — paraphrase or pointer present; target states it |
| SCOPE-010 | restatement | reference-section | summary (plain-words paraphrase; its section is §4.2) | OK — paraphrase or pointer present; target states it |
| SCOPE-011 | restatement | reference-section | summary (plain-words paraphrase; its section is §4.2) | OK — paraphrase or pointer present; target states it |
| SCOPE-012 | restatement | reference-section | summary (plain-words paraphrase; its section is §4.8) | OK — paraphrase or pointer present; target states it |
| SCOPE-013 | restatement | reference-section | summary (plain-words paraphrase; its section is §4.3) | OK — paraphrase or pointer present; target states it |
| SCOPE-014 | restatement | reference-section | summary (plain-words paraphrase; its section is §4.5) | OK — paraphrase or pointer present; target states it |
| SCOPE-015 | restatement | reference-section | summary (plain-words paraphrase; its section is §4.7) | OK — paraphrase or pointer present; target states it |
| SCOPE-016 | restatement | reference-section | summary (plain-words paraphrase; its section is §2.6) | OK — paraphrase or pointer present; target states it |
| SCOPE-017 | restatement | reference-section | summary (plain-words paraphrase; its section is §4.9) | OK — paraphrase or pointer present; target states it |
| SCOPE-018 | restatement | reference-section | summary (plain-words paraphrase; its section is §8) | OK — paraphrase or pointer present; target states it |
| SCOPE-019 | restatement | reference-section | summary (plain-words paraphrase; its section is §11.1) | OK — paraphrase or pointer present; target states it |
| SCOPE-020 | restatement | reference-section | summary (plain-words paraphrase; its section is §12.5) | OK — paraphrase or pointer present; target states it |
| SCOPE-021 | restatement | reference-section | summary (plain-words paraphrase; its section is §12.3) | OK — paraphrase or pointer present; target states it |
| SCOPE-022 | restatement | reference-section | summary (plain-words paraphrase; its section is §9.4) | OK — summary keeps "merged into named quarters at city zoom"; the MFCG count is §9.4's |
| SCOPE-023 | restatement | reference-section | summary (plain-words paraphrase; its section is §7.1) | OK — paraphrase or pointer present; target states it |
| SCOPE-024 | restatement | reference-section | summary (plain-words paraphrase; its section is §7.3) | OK — paraphrase or pointer present; target states it |
| SCOPE-025 | restatement | reference-section | summary (plain-words paraphrase; its section is §2.6) | OK — no longer paraphrased in the summary; stated at its home §2.6 |
| SCOPE-026 | restatement | reference-section | summary (plain-words paraphrase; its section is §6.3) | OK — paraphrase or pointer present; target states it |
| SCOPE-027 | restatement | reference-section | summary (plain-words paraphrase; its section is §2.9) | OK — paraphrase or pointer present; target states it |
| SCOPE-028 | restatement | reference-section | summary (plain-words paraphrase; its section is §2.9) | OK — no longer paraphrased in the summary; stated at §2.9 step 2 (and §16 M1 for VS5-1) |
| SCOPE-029 | restatement | reference-section | summary (plain-words paraphrase; its section is §6.4) | OK — no longer paraphrased in the summary; stated at §6.4 (and §16 M2a for VD5-7) |
| SCOPE-030 | restatement | reference-section | summary (plain-words paraphrase; its section is §7.4) | OK — paraphrase or pointer present; target states it |
| SCOPE-031 | restatement | reference-section | summary (plain-words paraphrase; its section is §6) | OK — paraphrase or pointer present; target states it |
| SCOPE-032 | restatement | reference-section | summary (plain-words paraphrase; its section is §5) | OK — paraphrase or pointer present; target states it |
| SCOPE-033 | restatement | reference-section | summary (plain-words paraphrase; its section is §16) | OK — paraphrase or pointer present; target states it |
| SCOPE-034 | restatement | reference-section | summary (plain-words paraphrase; its section is §13) | OK — paraphrase or pointer present; target states it |
| SCOPE-035 | restatement | reference-section | summary (plain-words paraphrase; its section is §16) | OK — paraphrase or pointer present; target states it |
| SCOPE-036 | restatement | reference-section | summary (plain-words paraphrase; its section is §17) | OK — paraphrase or pointer present; target states it |
| SCOPE-037 | restatement | reference-section | summary (plain-words paraphrase; its section is Staged) | OK — paraphrase or pointer present; target states it |
| SCOPE-038 | history | state | §0.1 (base proposal, grafts G-P1–G-P17 / G-R1–G-R15, repairs K-1–K-6, judging.md §3–§4); the panel scores →… | OK — stated at the new location |
| SCOPE-039 | rule | state | §0.1 (one design, not a concatenation) | OK — stated at the new location |
| SCOPE-040 | history | state | Appendix A reading-record paragraph (summary); verbatim in rationale Part B (former §0.2) | OK — stated at the new location |
| SCOPE-041 | history | drop-history | history — rationale file (verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-042 | mapping | state | §0.2 | OK — stated at the new location |
| SCOPE-043 | mapping | state | §0.2 | OK — stated at the new location |
| SCOPE-044 | mapping | state | §0.2 | OK — stated at the new location |
| SCOPE-045 | mapping | state | §0.2 | OK — stated at the new location |
| SCOPE-046 | mapping | state | §0.2 | **V-SCOPE-07** — §7.1 no longer holds a "clause map" label or the registry test |
| SCOPE-047 | mapping | state | §0.2 | OK — stated at the new location |
| SCOPE-048 | mapping | state | §0.2 | OK — stated at the new location |
| SCOPE-049 | defined-term | state | §0.3 | OK — stated at the new location |
| SCOPE-050 | rule | state | §0.3 | OK — stated at the new location |
| SCOPE-051 | rule | state | §0.3 | OK — stated at the new location |
| SCOPE-052 | history | drop-history | history — rationale file (verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-053 | rule | state | §0.2 row 7 ("D-1–D-7, each FINAL") and the Delegated decisions preface | OK — stated at the new location |
| SCOPE-054 | history | drop-history | history — rationale file (verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-055 | history | drop-history | history — rationale file (verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-056 | history | drop-history | history — rationale file (verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-057 | history | drop-history | history — rationale file (verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-058 | history | drop-history | history — rationale file (verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-059 | restatement | state | §16 effort table total and D-20 (153–204 pw); the "raised from 150–200" history → rationale Part B (former … | OK — stated at the new location |
| SCOPE-060 | rule | state | §1 (plain words) | OK — stated at the new location |
| SCOPE-061 | rule | state | §1.1 | OK — stated at the new location |
| SCOPE-062 | rule | state | §1.1 | OK — stated at the new location |
| SCOPE-063 | rule | state | §1.1 | OK — stated at the new location |
| SCOPE-064 | rule | state | §1.1 | OK — stated at the new location |
| SCOPE-065 | interface | state | §1.1 | OK — stated at the new location |
| SCOPE-066 | number | state | §1.1 rung table, TOWN row (frame as area + side at aspect 1, CANON-C03); its model p95 cell referenced to §… | OK — stated at the new location |
| SCOPE-067 | number | state | §1.1 rung table, CITY row (frame per CANON-C03); model p95 cell referenced to §12.3 (SCOPE-C01) | OK — stated at the new location |
| SCOPE-068 | number | state | §1.1 rung table, METROPOLIS row (frame per CANON-C03); model p95 cell referenced to §12.3 (SCOPE-C01) | OK — stated at the new location |
| SCOPE-069 | budget | state | referenced to §12.3 (RENDERING-502); pointer in §1.1 | OK — pointer present; target §12.3 states it |
| SCOPE-070 | budget | state | referenced to §12.3 (RENDERING-504); pointer in §1.1 | OK — pointer present; target §12.3 states it |
| SCOPE-071 | budget | state | referenced to §12.5 (RENDERING-538); pointer in §1.1 | OK — pointer present; target §12.5 states it |
| SCOPE-072 | rule | reference-section | section restatement → §4.2; pointer in §1.1 | OK — paraphrase or pointer present; target states it |
| SCOPE-073 | decision | rationale | rationale file Part A row J-S13 (+ Part E.1 verbatim); the rule and "(J-S13)" stay in §1.1 *The rung modifi… | OK — rationale row and index row present; the rule and its "(J-x)" stay at the section |
| SCOPE-074 | acceptance-bar | state | §1.1 | OK — stated at the new location |
| SCOPE-075 | rule | state | §1.1 | OK — stated at the new location |
| SCOPE-076 | interface | state | §1.1 | OK — stated at the new location |
| SCOPE-077 | rule | state | §1.2 | OK — stated at the new location |
| SCOPE-078 | rule | state | referenced to §8.5 (RENDERING-194); pointer in §1.2 | OK — pointer present; target §8.5 states it |
| SCOPE-079 | rule | state | §1.2 | OK — stated at the new location |
| SCOPE-080 | rule | state | §1.2 | OK — stated at the new location |
| SCOPE-081 | mechanism | state | §1.3 | OK — stated at the new location |
| SCOPE-082 | decision | state | §1.3 | OK — stated at the new location |
| SCOPE-083 | rule | state | §1.4 | OK — stated at the new location |
| SCOPE-084 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-085 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-086 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-087 | decision | state | §1.4 | OK (signature measures → §13.5); observation O-3: the MFCG column lost "the 2017 ancestor drew streets on cell edges" (not an inventory clause) |
| SCOPE-088 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-089 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-090 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-091 | decision | state | §1.4 buildings row (FTG entrance ≈ 3 m, 2.99 m measured → §13.5, CANON-C09) | OK — stated at the new location |
| SCOPE-092 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-093 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-094 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-095 | decision | state | §1.4 determinism row (key components → §6.1, CANON-C08) | OK — stated at the new location |
| SCOPE-096 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-097 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-098 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-099 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-100 | rule | state | §1.4 | OK — stated at the new location |
| SCOPE-101 | decision | state | §1.4 | OK — stated at the new location |
| SCOPE-102 | test | state | §1.4 | OK — stated at the new location |
| SCOPE-103 | mechanism | state | referenced to §4.11 (PIPELINE-327); pointer in §1.5 | OK — pointer present; target §4.11 states it |
| SCOPE-104 | rule | reference-section | section restatement → §4.11; pointer in §1.5 | OK — paraphrase or pointer present; target states it |
| SCOPE-105 | rule | state | referenced to §4.11 (PIPELINE-355); pointer in §1.5 | OK — pointer present; target §4.11 states it |
| SCOPE-106 | rule | reference-section | section restatement → II.1; pointer in §1.6 | OK — paraphrase or pointer present; target states it |
| SCOPE-107 | rule | reference-section | section restatement → PART III; pointer in §1.6 | OK — paraphrase or pointer present; target states it |
| SCOPE-108 | decision | state | §1.7 | OK — stated at the new location |
| SCOPE-109 | decision | state | §1.7 | OK — stated at the new location |
| SCOPE-110 | decision | state | §1.7 numeric-core row (Clipper2 shipping → §3.7, KERNEL-C01) | OK — stated at the new location |
| SCOPE-111 | decision | state | §1.7 | OK — stated at the new location |
| SCOPE-112 | decision | state | §1.7 | OK — stated at the new location |
| SCOPE-113 | decision | state | §1.7 | OK — stated at the new location |
| SCOPE-114 | decision | state | §1.7 | OK — stated at the new location |
| SCOPE-115 | decision | state | §1.7 | OK — stated at the new location |
| SCOPE-116 | rule | state | §1.7 repository row (path rule → §17.1 (3)) | OK — stated at the new location |
| SCOPE-117 | rule | state | §1.7 | OK — stated at the new location |
| SCOPE-118 | rule | state | §13 (plain words) | OK — stated at the new location |
| SCOPE-119 | acceptance-bar | state | §13.1 | OK — stated at the new location |
| SCOPE-120 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-121 | rule | state | §13.1 | OK — stated at the new location |
| SCOPE-122 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-123 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-124 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-125 | test | state | §13.1 | OK; **V-SCOPE-05** — KERNEL-123's "outer moat at S5a" fixture not in this home (listed only in §16 M3a exit) |
| SCOPE-126 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-127 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-128 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-129 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-130 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-131 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-132 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-133 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-134 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-135 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-136 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-137 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-138 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-139 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-140 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-141 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-142 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-143 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-144 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-145 | test | state | §13.1 | **V-SCOPE-04** — "every other role unchanged" (KERNEL-228) missing from the home |
| SCOPE-146 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-147 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-148 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-149 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-150 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-151 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-152 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-153 | invariant | state | §13.1 | OK — stated at the new location |
| SCOPE-154 | invariant | state | §13.1 | **V-SCOPE-06** — `insetFace` (no such op; §3.4 `insetRing`) |
| SCOPE-155 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-156 | invariant | state | §13.1 | OK — stated at the new location |
| SCOPE-157 | invariant | state | §13.1 | OK — stated at the new location |
| SCOPE-158 | test | state | §13.1 | **V-SCOPE-01** — MODEL-169's "hill-acropolis site" missing from the home |
| SCOPE-159 | test | state | §13.1 | OK — stated at the new location |
| SCOPE-160 | test | state | §13.2 *Invariants* | OK — stated at the new location |
| SCOPE-161 | test | state | referenced to §5.3 (DETERMINISM-119); pointer in §13.2 | OK — pointer present; target §5.3 states it |
| SCOPE-162 | rule | state | §13.2 | OK — stated at the new location |
| SCOPE-163 | rule | state | §13.2 | OK — stated at the new location |
| SCOPE-164 | test | state | §13.2 *Cost-model tests* | OK — stated at the new location |
| SCOPE-165 | acceptance-bar | state | §13.2 *Cost-model tests* | OK — stated at the new location |
| SCOPE-166 | acceptance-bar | state | §13.2 *Cost-model tests* | OK — stated at the new location |
| SCOPE-167 | acceptance-bar | state | referenced to §12.6 (RENDERING-552); pointer in §13.2 | OK — pointer present; target §12.6 states it |
| SCOPE-168 | test | state | §13.2 *Cost-model tests* | OK — stated at the new location |
| SCOPE-169 | test | state | referenced to §12.8 (RENDERING-594); pointer in §13.2 | OK — pointer present; target §12.8 states it |
| SCOPE-170 | acceptance-bar | state | §13.2 *Document tests* | OK — stated at the new location |
| SCOPE-171 | acceptance-bar | state | referenced to §12.7 (RENDERING-578); pointer in §13.2 | OK — pointer present; target §12.7 states it |
| SCOPE-172 | test | state | referenced to §12.5 (RENDERING-539); pointer in §13.2 | OK — pointer present; target §12.5 states it |
| SCOPE-173 | test | state | referenced to §12.7 (RENDERING-575); pointer in §13.2 | OK — pointer present; target §12.7 states it |
| SCOPE-174 | acceptance-bar | state | referenced to §12.3 (RENDERING-513); pointer in §13.2 | OK — pointer present; target §12.3 states it |
| SCOPE-175 | rule | state | referenced to §12.1 (RENDERING-488); pointer in §13.2 | OK — pointer present; target §12.1 states it |
| SCOPE-176 | test | state | referenced to §6.5 (9) (DETERMINISM-291); pointer in §13.2 | **V-SCOPE-09** — still restated in §13.2 with "pool sizes 0–3"; home §6.5 (9) lacks it (canon detail gap) |
| SCOPE-177 | test | reference-section | section restatement → §6.5; pointer in §13.2 | OK — paraphrase or pointer present; target states it |
| SCOPE-178 | test | state | §13.2 *Stage contract tests* | OK — stated at the new location |
| SCOPE-179 | test | state | §13.2 *Stage contract tests* | OK — stated at the new location |
| SCOPE-180 | test | state | referenced to §8.3 (RENDERING-146); pointer in §13.2 | OK — pointer present; target §8.3 states it |
| SCOPE-181 | acceptance-bar | state | §13.2 *Stage contract tests* (seam check) | OK — stated at the new location |
| SCOPE-182 | test | state | referenced to §8.3 (RENDERING-136); pointer in §13.2 | OK — pointer present; target §8.3 states it |
| SCOPE-183 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-184 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-185 | acceptance-bar | state | §13.2 | OK — stated at the new location |
| SCOPE-186 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-187 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-188 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-189 | acceptance-bar | state | §13.2 | OK — stated at the new location |
| SCOPE-190 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-191 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-192 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-193 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-194 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-195 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-196 | rule | state | §13.2 *B-EDIT and the locality oracle* | OK — stated at the new location |
| SCOPE-197 | test | state | §13.2 *B-EDIT* | OK — stated at the new location |
| SCOPE-198 | test | state | §13.2 *B-EDIT* | OK — stated at the new location |
| SCOPE-199 | test | state | §13.2 *B-EDIT* | OK — stated at the new location |
| SCOPE-200 | test | state | referenced to §7.3 (7) (vi) (DETERMINISM-469); pointer in §13.2 | OK — pointer present; target §7.3 (7) (vi) states it |
| SCOPE-201 | test | state | referenced to §7.3 (7) (v) (DETERMINISM-467); pointer in §13.2 | OK — pointer present; target §7.3 (7) (v) states it |
| SCOPE-202 | test | state | §13.2 *B-EDIT* | OK — stated at the new location |
| SCOPE-203 | test | state | §13.2 *B-EDIT* ("§2.6's test", with the stage-3 intake run of MODEL-282) | **V-SCOPE-02** — MODEL-264's clauses missing from "§2.6's test" |
| SCOPE-204 | test | state | referenced to §6.5 (9) (DETERMINISM-298); pointer in §13.2 | OK — pointer present; target §6.5 (9) states it |
| SCOPE-205 | test | state | §13.2 *B-EDIT* — load verification | **V-SCOPE-03** — MODEL-403 / MODEL-408 pass criteria missing |
| SCOPE-206 | test | state | §13.2 *B-EDIT* — load verification | **V-SCOPE-03** — MODEL-403's "later corpus selection" criterion missing (VD5-5 fixture present) |
| SCOPE-207 | test | state | §13.2 *B-EDIT* — naming inputs (union with DETERMINISM-259) | OK — stated at the new location |
| SCOPE-208 | test | state | referenced to §6.5 (9) (DETERMINISM-298); pointer in §13.2 | **V-SCOPE-08** — target §6.5 (9) lacks the lock + unlock case and the case-(4) re-draw clause |
| SCOPE-209 | test | state | referenced to §6.5 (9) (DETERMINISM-300); pointer in §13.2 | OK — pointer present; target §6.5 (9) states it |
| SCOPE-210 | test | state | §13.2 *B-EDIT* | OK — stated at the new location |
| SCOPE-211 | test | state | referenced to §7.4 MFCG asks (DETERMINISM-524); pointer in §13.2 | OK — pointer present; target §7.4 MFCG asks states it |
| SCOPE-212 | test | state | §13.2 *The faithfulness campaign* | OK — stated at the new location |
| SCOPE-213 | algorithm-step | state | §13.2 *The faithfulness campaign* | OK — stated at the new location |
| SCOPE-214 | budget | state | §13.2 *The faithfulness campaign* | OK — stated at the new location |
| SCOPE-215 | evidence | state | §13.2 *The faithfulness campaign* — Calibration (executed, n = 800 results); the n = 400 comparison and ver… | OK — stated at the new location |
| SCOPE-216 | rule | state | §13.2 *The faithfulness campaign* | OK — stated at the new location |
| SCOPE-217 | rule | state | §13.2 *The faithfulness campaign* | OK — stated at the new location |
| SCOPE-218 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-219 | test | state | §13.2 | OK — stated at the new location |
| SCOPE-220 | acceptance-bar | state | §13.2 | OK — stated at the new location |
| SCOPE-221 | test | state | §13.3 | OK — stated at the new location |
| SCOPE-222 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-223 | acceptance-bar | state | §13.3 | OK — stated at the new location |
| SCOPE-224 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-225 | type | state | §13.3 | OK — stated at the new location |
| SCOPE-226 | interface | state | §13.3 | OK — stated at the new location |
| SCOPE-227 | interface | state | §13.3 | OK — stated at the new location |
| SCOPE-228 | interface | state | §13.3 | OK — stated at the new location |
| SCOPE-229 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-230 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-231 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-232 | test | state | §13.3 | OK — stated at the new location |
| SCOPE-233 | rule | state | referenced to §6.5 (3) (DETERMINISM-282); pointer in §13.3 | OK — pointer present; target §6.5 (3) states it |
| SCOPE-234 | test | state | §13.3 | OK — stated at the new location |
| SCOPE-235 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-236 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-237 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-238 | rule | state | referenced to §6.4 (DETERMINISM-263); pointer in §13.3 | OK — pointer present; target §6.4 states it |
| SCOPE-239 | rule | state | §13.3 | OK — stated at the new location |
| SCOPE-240 | test | state | §13.3 | OK ("0 and 3, the contract tests of §13.2 covering 0–3"; kernel note 6 / VK-R0-9 reflected; depends on V-SCOPE-09) |
| SCOPE-241 | test | state | §13.4 | OK — stated at the new location |
| SCOPE-242 | test | state | §13.4 | OK — stated at the new location |
| SCOPE-243 | test | state | referenced to §9.4 (RENDERING-380); pointer in §13.4 | OK — pointer present; target §9.4 states it |
| SCOPE-244 | test | state | referenced to §8.3 (RENDERING-132); pointer in §13.4 | OK — pointer present; target §8.3 states it |
| SCOPE-245 | acceptance-bar | state | referenced to §8.2 (RENDERING-107); pointer in §13.4 | OK — pointer present; target §8.2 states it |
| SCOPE-246 | test | state | §13.4 | OK — stated at the new location |
| SCOPE-247 | acceptance-bar | state | §13.4 | OK — stated at the new location |
| SCOPE-248 | test | state | §13.4 | OK — stated at the new location |
| SCOPE-249 | rule | state | §13.5 | OK — stated at the new location |
| SCOPE-250 | interface | state | §13.5 | OK — stated at the new location |
| SCOPE-251 | interface | state | §13.5 | OK — stated at the new location |
| SCOPE-252 | rule | state | §13.5 | OK — stated at the new location |
| SCOPE-253 | rule | state | §13.5 | OK — stated at the new location |
| SCOPE-254 | rule | state | §13.5 | OK — stated at the new location |
| SCOPE-255 | rule | state | §13.5 | OK — stated at the new location |
| SCOPE-256 | rule | state | §13.5 | OK — stated at the new location |
| SCOPE-257 | rule | state | §13.5 | OK — stated at the new location |
| SCOPE-258 | rule | state | §13.5 | OK — stated at the new location |
| SCOPE-259 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-260 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-261 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-262 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-263 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-264 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-265 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-266 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-267 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-268 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-269 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-270 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-271 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-272 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-273 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-274 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-275 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-276 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-277 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-278 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-279 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-280 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-281 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-282 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-283 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-284 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-285 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-286 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-287 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-288 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-289 | acceptance-bar | state | §13.5 table | OK — stated at the new location |
| SCOPE-290 | defined-term | state | §13.6 | OK — stated at the new location |
| SCOPE-291 | rule | state | §13.6 (1) | OK — stated at the new location |
| SCOPE-292 | rule | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-293 | defined-term | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-294 | interface | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-295 | rule | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-296 | rule | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-297 | rule | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-298 | rule | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-299 | rule | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-300 | algorithm-step | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-301 | rule | state | §13.6 (2) | OK — stated at the new location |
| SCOPE-302 | rule | state | §13.6 (3) | OK — stated at the new location |
| SCOPE-303 | rule | state | §13.6 (3) | OK — stated at the new location |
| SCOPE-304 | rule | state | §13.6 (4) | OK — stated at the new location |
| SCOPE-305 | rule | state | §13.6 (5) | OK — stated at the new location |
| SCOPE-306 | acceptance-bar | state | §13.6 (6) | OK — stated at the new location |
| SCOPE-307 | rule | state | §13.6 (7) | OK — stated at the new location |
| SCOPE-308 | rule | state | §13.6 (7) | OK — stated at the new location |
| SCOPE-309 | rule | state | §13.6 (8) | OK — stated at the new location |
| SCOPE-310 | rule | state | §13.6 (8) | OK — stated at the new location |
| SCOPE-311 | rule | state | §13.6 (9) | OK — stated at the new location |
| SCOPE-312 | type | state | §13.6 (9) | OK — stated at the new location |
| SCOPE-313 | type | state | §13.6 (9) | OK — stated at the new location |
| SCOPE-314 | type | state | §13.6 (9) | OK — stated at the new location |
| SCOPE-315 | interface | state | §13.6 (9) | OK — stated at the new location |
| SCOPE-316 | rule | state | §13.6 (9) | OK — stated at the new location |
| SCOPE-317 | rule | state | §13.7 | OK — stated at the new location |
| SCOPE-318 | rule | state | §13.7 | OK — stated at the new location |
| SCOPE-319 | rule | state | §13.7 | OK — stated at the new location |
| SCOPE-320 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-321 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-322 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-323 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-324 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-325 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-326 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-327 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-328 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-329 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-330 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-331 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-332 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-333 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-334 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-335 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-336 | acceptance-bar | state | §13.7 table | OK — stated at the new location |
| SCOPE-337 | rule | state | §13.7 | OK — stated at the new location |
| SCOPE-338 | budget | state | §13.8 | OK — stated at the new location |
| SCOPE-339 | budget | state | §13.8 | OK — stated at the new location |
| SCOPE-340 | budget | state | §13.8 | OK — stated at the new location |
| SCOPE-341 | rule | state | referenced to §12.1 (RENDERING-489); pointer in §13.8 | OK — pointer present; target §12.1 states it |
| SCOPE-342 | budget | state | §13.8 | OK — stated at the new location |
| SCOPE-343 | rule | state | §13.8 | OK — stated at the new location |
| SCOPE-344 | rule | state | §13.9 | OK — stated at the new location |
| SCOPE-345 | interface | state | §13.9 | OK — stated at the new location |
| SCOPE-346 | algorithm-step | state | §13.9 | OK — stated at the new location |
| SCOPE-347 | rule | state | §14 (plain words) | OK — stated at the new location |
| SCOPE-348 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-349 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-350 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-351 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-352 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-353 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-354 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-355 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-356 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-357 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-358 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-359 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-360 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-361 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-362 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-363 | interface | state | §14 packages | OK — stated at the new location |
| SCOPE-364 | restatement | reference-section | section restatement → §4.1–§4.12 (one pointer sentence in §14) | OK — paraphrase or pointer present; target states it |
| SCOPE-365 | rule | state | §14 | OK — stated at the new location |
| SCOPE-366 | rule | state | §14 | OK — stated at the new location |
| SCOPE-367 | rule | state | referenced to §6.5 (3) (DETERMINISM-282); pointer in §14 | OK — pointer present; target §6.5 (3) states it |
| SCOPE-368 | rule | state | §14 | OK — stated at the new location |
| SCOPE-369 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-370 | type | state | §14 interfaces | OK — stated at the new location |
| SCOPE-371 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-372 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-373 | defined-term | state | referenced to §6.1 (DETERMINISM-139); pointer in §14 interfaces | OK (§6.1 states the town root key; observation O-4: the identifier `TOWN_ROOT` itself is named only in §14 and §9.5) |
| SCOPE-374 | type | state | §14 interfaces | OK — stated at the new location |
| SCOPE-375 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-376 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-377 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-378 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-379 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-380 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-381 | interface | state | referenced to §9.2 (RENDERING-346); pointer in §14 interfaces | OK — pointer present; target §9.2 states it |
| SCOPE-382 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-383 | interface | state | referenced to §8.9 (RENDERING-251); pointer in §14 interfaces | OK — pointer present; target §8.9 states it |
| SCOPE-384 | interface | state | referenced to §8.9 (RENDERING-252); pointer in §14 interfaces | OK — pointer present; target §8.9 states it |
| SCOPE-385 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-386 | interface | state | §14 interfaces | OK — stated at the new location |
| SCOPE-387 | rule | state | §14 app | OK — stated at the new location |
| SCOPE-388 | interface | state | §14 app | OK — stated at the new location |
| SCOPE-389 | acceptance-bar | state | §14 app | OK — stated at the new location |
| SCOPE-390 | rule | state | §14 app | OK — stated at the new location |
| SCOPE-391 | rule | state | §14 app | OK — stated at the new location |
| SCOPE-392 | rule | state | §14 | OK — stated at the new location |
| SCOPE-393 | rule | state | §15 (plain words) | OK — stated at the new location |
| SCOPE-394 | defined-term | state | §15.1 | OK — stated at the new location |
| SCOPE-395 | mapping | state | §15.1 MFCG | OK — stated at the new location |
| SCOPE-396 | mapping | state | §15.1 MFCG | OK — stated at the new location |
| SCOPE-397 | mapping | state | §15.1 MFCG | OK — stated at the new location |
| SCOPE-398 | mapping | state | §15.1 MFCG | OK — stated at the new location |
| SCOPE-399 | mapping | state | §15.1 MFCG | OK — stated at the new location |
| SCOPE-400 | mapping | state | §15.1 FTG | OK — stated at the new location |
| SCOPE-401 | mapping | state | §15.1 FTG | OK — stated at the new location |
| SCOPE-402 | mapping | state | §15.1 FTG | OK — stated at the new location |
| SCOPE-403 | mapping | state | §15.1 FTG | OK — stated at the new location |
| SCOPE-404 | mapping | state | §15.1 FTG | OK — stated at the new location |
| SCOPE-405 | restatement | state | §15.1 FTG H2 row, figures referenced to §12.3 / §12.5 / D-18 | OK — pointer present; target §12.5 states it |
| SCOPE-406 | mapping | state | §15.1 NG | OK — stated at the new location |
| SCOPE-407 | mapping | state | §15.1 NG | OK — stated at the new location |
| SCOPE-408 | mapping | state | §15.1 VG | OK — stated at the new location |
| SCOPE-409 | rule | state | §15.1 VG | OK — stated at the new location |
| SCOPE-410 | defined-term | state | §15.2 | OK — stated at the new location |
| SCOPE-411 | rule | state | §15.2 | OK — stated at the new location |
| SCOPE-412 | rule | state | §15.2 | OK — stated at the new location |
| SCOPE-413 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-414 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-415 | acceptance-bar | state | §15.2 O3 row (d): laws and knees referenced to §12.3 (bars kept) | OK — stated at the new location |
| SCOPE-416 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-417 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-418 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-419 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-420 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-421 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-422 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-423 | acceptance-bar | state | §15.2 O19 row: letters referenced to §4.9, classes kept | OK — pointer present; target §4.9 states it |
| SCOPE-424 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-425 | acceptance-bar | state | §15.2 O12 row (g): knee referenced to §12.5 | OK — stated at the new location |
| SCOPE-426 | acceptance-bar | state | §15.2 O9 row (c): campaign bound referenced to §13.2 (SCOPE-C03) | OK — stated at the new location |
| SCOPE-427 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-428 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-429 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-430 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-431 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-432 | acceptance-bar | state | §15.2 O16 full row (c): "the scripted tasks of §13.4" (SCOPE-C04) | OK — stated at the new location |
| SCOPE-433 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-434 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-435 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-436 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-437 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-438 | acceptance-bar | state | §15.2 | OK — stated at the new location |
| SCOPE-439 | rule | state | §16 (plain words) | OK — stated at the new location |
| SCOPE-440 | budget | state | §16 preface (153–204 pw, 77–102 calendar weeks, staffing) | OK — stated at the new location |
| SCOPE-441 | rule | state | §16 | OK — stated at the new location |
| SCOPE-442 | rule | state | §16 preface — *The owner's panel at every gating exit* (rule itself §13.6 (7)) | OK — stated at the new location |
| SCOPE-443 | rule | state | §16 M-1 | OK — stated at the new location |
| SCOPE-444 | acceptance-bar | state | §16 M-1 | OK — stated at the new location |
| SCOPE-445 | rule | state | §16 M0 | OK — stated at the new location |
| SCOPE-446 | acceptance-bar | state | §16 M0 | OK — stated at the new location |
| SCOPE-447 | acceptance-bar | state | §16 M0 | OK — stated at the new location |
| SCOPE-448 | acceptance-bar | state | §16 M0 | OK — stated at the new location |
| SCOPE-449 | acceptance-bar | state | §16 M0 | OK — stated at the new location |
| SCOPE-450 | rule | state | §16 M1 | OK — stated at the new location |
| SCOPE-451 | rule | state | §16 M1 content (the `.plat` reader), amended by VS5-1 | OK — stated at the new location |
| SCOPE-452 | rule | state | §16 M1 | OK — stated at the new location |
| SCOPE-453 | acceptance-bar | state | §16 M1 | OK — stated at the new location |
| SCOPE-454 | acceptance-bar | state | §16 M1 | OK — stated at the new location |
| SCOPE-455 | acceptance-bar | state | §16 M1 | OK — stated at the new location |
| SCOPE-456 | acceptance-bar | state | §16 M1 exit (+ the VS5-1 frozen-view fixture) | OK — stated at the new location |
| SCOPE-457 | rule | state | §16 M2a content (+ VD5-7 link rule with the keep) | OK — stated at the new location |
| SCOPE-458 | acceptance-bar | state | §16 M2a exit (+ VD5-7 kept-town link-refusal case) | OK — stated at the new location |
| SCOPE-459 | rule | state | §16 M2b | OK — stated at the new location |
| SCOPE-460 | acceptance-bar | state | §16 M2b | OK — stated at the new location |
| SCOPE-461 | rule | state | §16 M3a content (link refusals narrowed to packs and host content, VD5-7) | OK — stated at the new location |
| SCOPE-462 | acceptance-bar | state | §16 M3a | OK (lists the outer-moat fixture; see **V-SCOPE-05**) |
| SCOPE-463 | acceptance-bar | state | §16 M3a exit (kept-town link case moved to M2a, VD5-7) | OK — stated at the new location |
| SCOPE-464 | rule | state | §16 M3b | OK — stated at the new location |
| SCOPE-465 | acceptance-bar | state | §16 M3b | OK — stated at the new location |
| SCOPE-466 | rule | state | §16 M4 | OK — stated at the new location |
| SCOPE-467 | acceptance-bar | state | §16 M4 | OK — stated at the new location |
| SCOPE-468 | rule | state | §16 M4b | OK — stated at the new location |
| SCOPE-469 | rule | state | §16 M5 | OK — stated at the new location |
| SCOPE-470 | budget | state | §16 effort table | OK — stated at the new location |
| SCOPE-471 | history | drop-history | history — rationale file Part E.3 (verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-472 | budget | state | §16 *The six new components* | OK — stated at the new location |
| SCOPE-473 | rule | state | §16 *The six new components* (the pricing rule) | OK — stated at the new location |
| SCOPE-474 | decision | rationale | rationale file Part A row J-S6 (+ Part E.3 verbatim); the cuts list stays in §16 with "(J-S6, D-20)" | OK — rationale row and index row present; the rule and its "(J-x)" stay at the section |
| SCOPE-475 | rule | state | §16 riskiest items (Clipper2 → §3.7, KERNEL-C01) | OK — stated at the new location |
| SCOPE-476 | rule | state | §16 last paragraph → the Staged list (SCOPE-C11); nothing else out of scope | OK (pointer to the one Staged list, SCOPE-C11); **V-SCOPE-11** — "after these milestones" wording |
| SCOPE-477 | rule | state | §17 (plain words) | OK — stated at the new location |
| SCOPE-478 | rule | state | §17.1 (1) | OK — stated at the new location |
| SCOPE-479 | rule | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-480 | rule | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-481 | test | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-482 | test | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-483 | test | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-484 | test | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-485 | test | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-486 | test | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-487 | rule | state | §17.1 (2) | OK — stated at the new location |
| SCOPE-488 | evidence | drop-history | history/evidence — rationale file Part E.4 (verbatim); one-line receipt pointer left in §17.1 (2) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-489 | decision | rationale | rationale file rows J-S32 / J-S35 (+ Part E.4 verbatim); "(J-S32)", "(J-S35)" left in §17.1 (2) | OK — rationale row and index row present; the rule and its "(J-x)" stay at the section |
| SCOPE-490 | rule | state | §17.1 (3) | OK — stated at the new location |
| SCOPE-491 | rule | state | §17.1 (4), rewritten by VS5-3 (three committed files) | OK — stated at the new location |
| SCOPE-492 | mechanism | state | §17.1 (5) | OK — stated at the new location |
| SCOPE-493 | rule | state | §17.1 (5) | OK — stated at the new location |
| SCOPE-494 | rule | state | §17.1 (5) | OK — stated at the new location |
| SCOPE-495 | rule | state | §17.1 (6) | OK — stated at the new location |
| SCOPE-496 | rule | state | §17.1 (7) | OK — stated at the new location |
| SCOPE-497 | rule | state | §17.1 (8) | OK — stated at the new location |
| SCOPE-498 | rule | state | §17.1 (8) | OK — stated at the new location |
| SCOPE-499 | rule | state | §17.1 (9) | OK — stated at the new location |
| SCOPE-500 | decision | state | §17.2 (the choice; the because-clause kept in one line with "(J-S15)"; verbatim in rationale Part E.5) | OK — stated at the new location |
| SCOPE-501 | rule | state | §17.2 | OK — stated at the new location |
| SCOPE-502 | decision | state | §17.3 (proprietary default, owner veto; "(J-S10)"; verbatim in rationale Part E.6) | OK (proprietary default kept; RULING-1 is the owner's) |
| SCOPE-503 | rule | state | §17.3 | OK — stated at the new location |
| SCOPE-504 | rule | state | §17.4 | OK — stated at the new location |
| SCOPE-505 | rule | state | §17.4 | OK — stated at the new location |
| SCOPE-506 | rule | state | §17.4 | OK — stated at the new location |
| SCOPE-507 | decision | state | §17.4 | OK — stated at the new location |
| SCOPE-508 | rule | state | §17.4 | OK — stated at the new location |
| SCOPE-509 | rule | state | Delegated decisions preface | OK — stated at the new location |
| SCOPE-510 | decision | state | Delegated decisions D-1 | OK — stated at the new location |
| SCOPE-511 | decision | state | Delegated decisions D-2 | OK — stated at the new location |
| SCOPE-512 | decision | state | Delegated decisions D-3 | OK — stated at the new location |
| SCOPE-513 | decision | state | Delegated decisions D-4 | OK — stated at the new location |
| SCOPE-514 | decision | state | Delegated decisions D-5 | OK — stated at the new location |
| SCOPE-515 | decision | state | Delegated decisions D-6 | OK — stated at the new location |
| SCOPE-516 | decision | state | Delegated decisions D-7 | OK — stated at the new location |
| SCOPE-517 | decision | state | Delegated decisions D-8 | OK — stated at the new location |
| SCOPE-518 | decision | state | Delegated decisions D-9 (bars → §13.5, CANON-C10) | OK — stated at the new location |
| SCOPE-519 | decision | state | Delegated decisions D-10 | OK — stated at the new location |
| SCOPE-520 | decision | state | Delegated decisions D-11 | OK — stated at the new location |
| SCOPE-521 | decision | state | Delegated decisions D-12 | OK — stated at the new location |
| SCOPE-522 | decision | state | Delegated decisions D-13 | OK — stated at the new location |
| SCOPE-523 | decision | state | Delegated decisions D-14 (→ §3.7, KERNEL-C01) | OK — stated at the new location |
| SCOPE-524 | decision | state | Delegated decisions D-15 (→ §6.1, CANON-C08) | OK — stated at the new location |
| SCOPE-525 | decision | state | Delegated decisions D-16 | OK — stated at the new location |
| SCOPE-526 | decision | state | Delegated decisions D-17 | OK — stated at the new location |
| SCOPE-527 | decision | state | Delegated decisions D-18 (budgets and misses → §12.3 / §12.5 / §12.9, SCOPE-C01); the pre-pass row verbatim… | OK — stated at the new location |
| SCOPE-528 | decision | state | Delegated decisions D-19 (each value → its home: §2.3, §1.1, §3.2 (2), (9), §4.5, §4.2 S3, §4.2 S2, §8.4, §… | OK — stated at the new location |
| SCOPE-529 | decision | state | Delegated decisions D-20 | OK — stated at the new location |
| SCOPE-530 | decision | state | Delegated decisions D-21 | OK — stated at the new location |
| SCOPE-531 | decision | state | Delegated decisions D-22 | OK (RULING-1 is the owner's) |
| SCOPE-532 | decision | state | Delegated decisions D-23 | OK — stated at the new location |
| SCOPE-533 | decision | state | Delegated decisions D-24 | OK — stated at the new location |
| SCOPE-534 | decision | state | Delegated decisions D-25 | OK — stated at the new location |
| SCOPE-535 | decision | state | Delegated decisions D-26 | OK — stated at the new location |
| SCOPE-536 | decision | state | Delegated decisions D-27 | OK — stated at the new location |
| SCOPE-537 | decision | state | Delegated decisions D-28 | OK — stated at the new location |
| SCOPE-538 | decision | state | Delegated decisions D-29 (files → §17.1 (4), SCOPE-C02) | OK — stated at the new location |
| SCOPE-539 | decision | state | Delegated decisions D-30 | OK — stated at the new location |
| SCOPE-540 | decision | state | Delegated decisions D-31 | OK — stated at the new location |
| SCOPE-541 | decision | state | Delegated decisions D-32 | OK — stated at the new location |
| SCOPE-542 | decision | state | Delegated decisions D-33 | OK — stated at the new location |
| SCOPE-543 | decision | state | Delegated decisions D-34 | OK — stated at the new location |
| SCOPE-544 | decision | state | Delegated decisions D-35 | OK — stated at the new location |
| SCOPE-545 | rule | state | Staged — preface (history sentence → rationale Part E.7) | OK — stated at the new location |
| SCOPE-546 | mapping | state | Staged — stage-2 row ("built in this program at M5", SCOPE-C11) | OK — stated at the new location |
| SCOPE-547 | mapping | state | Staged by the owner's roadmap | OK — stated at the new location |
| SCOPE-548 | mapping | state | Staged by the owner's roadmap | OK — stated at the new location |
| SCOPE-549 | mapping | state | Staged by the owner's roadmap | OK — stated at the new location |
| SCOPE-550 | mapping | state | Staged by the owner's roadmap | OK — stated at the new location |
| SCOPE-551 | mapping | state | Staged by the owner's roadmap | OK — stated at the new location |
| SCOPE-552 | mapping | state | Staged by the owner's roadmap | OK — stated at the new location |
| SCOPE-553 | history | state | Appendix A reading-record paragraph (summary); verbatim in rationale Part C (A.1) | OK — stated at the new location |
| SCOPE-554 | history | state | Appendix A reading-record paragraph (summary); verbatim in rationale Part C (A.2) | OK — stated at the new location |
| SCOPE-555 | rule | state | Appendix A — A.3 | OK — stated at the new location |
| SCOPE-556 | history | drop-history | history — rationale file Part C (A.4, verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-557 | history | drop-history | history — rationale file Part C (A.5, verbatim) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-558 | rule | state | Judgment calls index preface | OK — stated at the new location |
| SCOPE-559 | history | drop-history | history — rationale file Part A preface (verbatim round ledger) | OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-560 | decision | rationale | rationale file Part A row J-1 (verbatim); index row J-1 | OK — Part A row verbatim; index row present |
| SCOPE-561 | decision | rationale | rationale file Part A row J-2 (verbatim); index row J-2 | OK — Part A row verbatim; index row present |
| SCOPE-562 | decision | rationale | rationale file Part A row J-3 (verbatim); index row J-3 | OK — Part A row verbatim; index row present |
| SCOPE-563 | decision | rationale | rationale file Part A row J-4 (verbatim); index row J-4 | OK — Part A row verbatim; index row present |
| SCOPE-564 | decision | rationale | rationale file Part A row J-5 (verbatim); index row J-5 | OK — Part A row verbatim; index row present |
| SCOPE-565 | decision | rationale | rationale file Part A row J-6 (verbatim); index row J-6 | OK — Part A row verbatim; index row present |
| SCOPE-566 | decision | rationale | rationale file Part A row J-7 (verbatim); index row J-7 | OK — Part A row verbatim; index row present |
| SCOPE-567 | decision | rationale | rationale file Part A row J-8 (verbatim); index row J-8 | OK — Part A row verbatim; index row present |
| SCOPE-568 | decision | rationale | rationale file Part A row J-9 (verbatim); index row J-9 | OK — Part A row verbatim; index row present |
| SCOPE-569 | decision | rationale | rationale file Part A row J-10 (verbatim); index row J-10 | OK — Part A row verbatim; index row present |
| SCOPE-570 | decision | rationale | rationale file Part A row J-11 (verbatim); index row J-11 | OK — Part A row verbatim; index row present |
| SCOPE-571 | decision | rationale | rationale file Part A row J-12 (verbatim); index row J-12 | OK — Part A row verbatim; index row present |
| SCOPE-572 | decision | rationale | rationale file Part A row J-13 (verbatim); index row J-13 | OK — Part A row verbatim; index row present |
| SCOPE-573 | decision | rationale | rationale file Part A row J-14 (verbatim); index row J-14 | OK — Part A row verbatim; index row present |
| SCOPE-574 | decision | rationale | rationale file Part A row J-15 (verbatim); index row J-15 | OK — Part A row verbatim; index row present |
| SCOPE-575 | decision | rationale | rationale file Part A row J-16 (verbatim); index row J-16 | OK — Part A row verbatim; index row present |
| SCOPE-576 | decision | rationale | rationale file Part A row J-17 (verbatim); index row J-17 | OK — Part A row verbatim; index row present |
| SCOPE-577 | decision | rationale | rationale file Part A row J-18 (verbatim); index row J-18 | OK — Part A row verbatim; index row present |
| SCOPE-578 | decision | rationale | rationale file Part A row J-K1 (verbatim); index row J-K1 | OK — Part A row verbatim; index row present |
| SCOPE-579 | decision | rationale | rationale file Part A row J-K2 (verbatim); index row J-K2 | OK — Part A row verbatim; index row present |
| SCOPE-580 | decision | rationale | rationale file Part A row J-K3 (verbatim); index row J-K3 | OK — Part A row verbatim; index row present |
| SCOPE-581 | decision | rationale | rationale file Part A row J-K4 (verbatim); index row J-K4 | OK — Part A row verbatim; index row present |
| SCOPE-582 | decision | rationale | rationale file Part A row J-K5 (verbatim); index row J-K5 | OK — Part A row verbatim; index row present |
| SCOPE-583 | decision | rationale | rationale file Part A row J-K6 (verbatim, amended for KERNEL-C06, KERNEL-C12); index row J-K6 | OK — Part A row amended as ruled: amended (KERNEL-C06, C12); index row present |
| SCOPE-584 | decision | rationale | rationale file Part A row J-K7 (verbatim); index row J-K7 | OK — Part A row verbatim; index row present |
| SCOPE-585 | decision | rationale | rationale file Part A row J-K8 (verbatim); index row J-K8 | OK — Part A row verbatim; index row present |
| SCOPE-586 | decision | rationale | rationale file Part A row J-K9 (verbatim); index row J-K9 | OK — Part A row verbatim; index row present |
| SCOPE-587 | decision | rationale | rationale file Part A row J-K10 (verbatim); index row J-K10 | OK — Part A row verbatim; index row present |
| SCOPE-588 | decision | rationale | rationale file Part A row J-K11 (verbatim); index row J-K11 | OK — Part A row verbatim; index row present |
| SCOPE-589 | decision | rationale | rationale file Part A row J-K12 (verbatim); index row J-K12 | OK — Part A row verbatim; index row present |
| SCOPE-590 | decision | rationale | rationale file Part A row J-K13 (verbatim); index row J-K13 | OK — Part A row verbatim; index row present |
| SCOPE-591 | decision | rationale | rationale file Part A row J-K14 (verbatim); index row J-K14 | OK — Part A row verbatim; index row present |
| SCOPE-592 | decision | rationale | rationale file Part A row J-K15 (verbatim); index row J-K15 | OK — Part A row verbatim; index row present |
| SCOPE-593 | decision | rationale | rationale file Part A row J-K16 (verbatim); index row J-K16 | OK — Part A row verbatim; index row present |
| SCOPE-594 | decision | rationale | rationale file Part A row J-K17 (verbatim); index row J-K17 | OK — Part A row verbatim; index row present |
| SCOPE-595 | decision | rationale | rationale file Part A row J-K18 (verbatim); index row J-K18 | OK — Part A row verbatim; index row present |
| SCOPE-596 | decision | rationale | rationale file Part A row J-K19 (verbatim); index row J-K19 | OK — Part A row verbatim; index row present |
| SCOPE-597 | decision | rationale | rationale file Part A row J-K20 (verbatim); index row J-K20 | OK — Part A row verbatim; index row present |
| SCOPE-598 | decision | rationale | rationale file Part A row J-K21 (verbatim); index row J-K21 | OK — Part A row verbatim; index row present |
| SCOPE-599 | decision | rationale | rationale file Part A row J-K22 (verbatim); index row J-K22 | OK — Part A row verbatim; index row present |
| SCOPE-600 | decision | rationale | rationale file Part A row J-K23 (verbatim); index row J-K23 | OK — Part A row verbatim; index row present |
| SCOPE-601 | decision | rationale | rationale file Part A row J-K24 (verbatim); index row J-K24 | OK — Part A row verbatim; index row present |
| SCOPE-602 | decision | rationale | rationale file Part A row J-K25 (verbatim); index row J-K25 | OK — Part A row verbatim; index row present |
| SCOPE-603 | decision | rationale | rationale file Part A row J-K26 (verbatim); index row J-K26 | OK — Part A row verbatim; index row present |
| SCOPE-604 | decision | rationale | rationale file Part A row J-K27 (verbatim); index row J-K27 | OK — Part A row verbatim; index row present |
| SCOPE-605 | decision | rationale | rationale file Part A row J-K28 (verbatim); index row J-K28 | OK — Part A row verbatim; index row present |
| SCOPE-606 | decision | rationale | rationale file Part A row J-K29 (verbatim); index row J-K29 | OK — Part A row verbatim; index row present |
| SCOPE-607 | decision | rationale | rationale file Part A row J-K30 (verbatim); index row J-K30 | OK — Part A row verbatim; index row present |
| SCOPE-608 | decision | rationale | rationale file Part A row J-K31 (verbatim); index row J-K31 | OK — Part A row verbatim; index row present |
| SCOPE-609 | decision | rationale | rationale file Part A row J-K32 (verbatim); index row J-K32 | OK — Part A row verbatim; index row present |
| SCOPE-610 | decision | rationale | rationale file Part A row J-K33 (verbatim); index row J-K33 | OK — Part A row verbatim; index row present |
| SCOPE-611 | decision | rationale | rationale file Part A row J-K34 (verbatim); index row J-K34 | OK — Part A row verbatim; index row present |
| SCOPE-612 | decision | rationale | rationale file Part A row J-K35 (verbatim); index row J-K35 | OK — Part A row verbatim; index row present |
| SCOPE-613 | decision | rationale | rationale file Part A row J-DET-1 (verbatim); index row J-DET-1 | OK — Part A row verbatim; index row present |
| SCOPE-614 | decision | rationale | rationale file Part A row J-DET-2 (verbatim); index row J-DET-2 | OK — Part A row verbatim; index row present |
| SCOPE-615 | decision | rationale | rationale file Part A row J-DET-3 (verbatim); index row J-DET-3 | OK — Part A row verbatim; index row present |
| SCOPE-616 | decision | rationale | rationale file Part A row J-DET-4 (verbatim); index row J-DET-4 | OK — Part A row verbatim; index row present |
| SCOPE-617 | decision | rationale | rationale file Part A row J-DET-5 (verbatim); index row J-DET-5 | OK — Part A row verbatim; index row present |
| SCOPE-618 | decision | rationale | rationale file Part A row J-DET-6 (verbatim); index row J-DET-6 | OK — Part A row verbatim; index row present |
| SCOPE-619 | decision | rationale | rationale file Part A row J-DET-7 (verbatim); index row J-DET-7 | OK — Part A row verbatim; index row present |
| SCOPE-620 | decision | rationale | rationale file Part A row J-DET-8 (verbatim); index row J-DET-8 | OK — Part A row verbatim; index row present |
| SCOPE-621 | decision | rationale | rationale file Part A row J-DET-9 (verbatim); index row J-DET-9 | OK — Part A row verbatim; index row present |
| SCOPE-622 | decision | rationale | rationale file Part A row J-DET-10 (verbatim); index row J-DET-10 | OK — Part A row verbatim; index row present |
| SCOPE-623 | decision | rationale | rationale file Part A row J-DET-11 (verbatim); index row J-DET-11 | OK — Part A row verbatim; index row present |
| SCOPE-624 | decision | rationale | rationale file Part A row J-DET-12 (verbatim); index row J-DET-12 | OK — Part A row verbatim; index row present |
| SCOPE-625 | decision | rationale | rationale file Part A row J-DET-13 (verbatim); index row J-DET-13 | OK — Part A row verbatim; index row present |
| SCOPE-626 | decision | rationale | rationale file Part A row J-DET-14 (verbatim); index row J-DET-14 | OK — Part A row verbatim; index row present |
| SCOPE-627 | decision | rationale | rationale file Part A row J-DET-15 (verbatim); index row J-DET-15 | OK — Part A row verbatim; index row present |
| SCOPE-628 | decision | rationale | rationale file Part A row J-DET-16 (verbatim); index row J-DET-16 | OK — Part A row verbatim; index row present |
| SCOPE-629 | decision | rationale | rationale file Part A row J-DET-17 (verbatim); index row J-DET-17 | OK — Part A row verbatim; index row present |
| SCOPE-630 | decision | rationale | rationale file Part A row J-DET-18 (verbatim); index row J-DET-18 | OK — Part A row verbatim; index row present |
| SCOPE-631 | decision | rationale | rationale file Part A row J-DET-19 (verbatim); index row J-DET-19 | OK — Part A row verbatim; index row present |
| SCOPE-632 | decision | rationale | rationale file Part A row J-DET-20 (verbatim, amended for DETERMINISM-C-2); index row J-DET-20 | OK — Part A row amended as ruled: amended (DETERMINISM-C-2); index row present |
| SCOPE-633 | decision | rationale | rationale file Part A row J-DET-21 (verbatim); index row J-DET-21 | OK — Part A row verbatim; index row present |
| SCOPE-634 | decision | rationale | rationale file Part A row J-DET-22 (verbatim); index row J-DET-22 | OK — Part A row verbatim; index row present |
| SCOPE-635 | decision | rationale | rationale file Part A row J-DET-23 (verbatim); index row J-DET-23 | OK — Part A row verbatim; index row present |
| SCOPE-636 | decision | rationale | rationale file Part A row J-DET-24 (verbatim); index row J-DET-24 | OK — Part A row verbatim; index row present |
| SCOPE-637 | decision | rationale | rationale file Part A row J-DET-25 (verbatim); index row J-DET-25 | OK — Part A row verbatim; index row present |
| SCOPE-638 | decision | rationale | rationale file Part A row J-DET-26 (verbatim); index row J-DET-26 | OK — Part A row verbatim; index row present |
| SCOPE-639 | decision | rationale | rationale file Part A row J-DET-27 (verbatim); index row J-DET-27 | OK — Part A row verbatim; index row present |
| SCOPE-640 | decision | rationale | rationale file Part A row J-DET-28 (verbatim); index row J-DET-28 | OK — Part A row verbatim; index row present |
| SCOPE-641 | decision | rationale | rationale file Part A row J-DET-29 (verbatim); index row J-DET-29 | OK — Part A row verbatim; index row present |
| SCOPE-642 | decision | rationale | rationale file Part A row J-DET-30 (verbatim); index row J-DET-30 | OK — Part A row verbatim; index row present |
| SCOPE-643 | decision | rationale | rationale file Part A row J-DET-31 (verbatim); index row J-DET-31 | OK — Part A row verbatim; index row present |
| SCOPE-644 | decision | rationale | rationale file Part A row J-DET-32 (verbatim); index row J-DET-32 | OK — Part A row verbatim; index row present |
| SCOPE-645 | decision | rationale | rationale file Part A row J-DET-33 (verbatim); index row J-DET-33 | OK — Part A row verbatim; index row present |
| SCOPE-646 | decision | rationale | rationale file Part A row J-DET-34 (verbatim); index row J-DET-34 | OK — Part A row verbatim; index row present |
| SCOPE-647 | decision | rationale | rationale file Part A row J-DET-35 (verbatim); index row J-DET-35 | OK — Part A row verbatim; index row present |
| SCOPE-648 | decision | rationale | rationale file Part A row J-DET-36 (verbatim); index row J-DET-36 | OK (row verbatim); **V-SCOPE-10** — KERNEL-357's passage (canon rationale-copy of this row) not in the row or index |
| SCOPE-649 | decision | rationale | rationale file Part A row J-DET-37 (verbatim); index row J-DET-37 | OK — Part A row verbatim; index row present |
| SCOPE-650 | decision | rationale | rationale file Part A row J-DET-38 (verbatim); index row J-DET-38 | OK — Part A row verbatim; index row present |
| SCOPE-651 | decision | rationale | rationale file Part A row J-DET-39 (verbatim); index row J-DET-39 | OK — Part A row verbatim; index row present |
| SCOPE-652 | decision | rationale | rationale file Part A row J-DET-40 (verbatim); index row J-DET-40 | OK — Part A row verbatim; index row present |
| SCOPE-653 | decision | rationale | rationale file Part A row J-DET-41 (verbatim); index row J-DET-41 | OK — Part A row verbatim; index row present |
| SCOPE-654 | decision | rationale | rationale file Part A row J-DET-42 (verbatim); index row J-DET-42 | OK — Part A row verbatim; index row present |
| SCOPE-655 | decision | rationale | rationale file Part A row J-DET-43 (verbatim); index row J-DET-43 | OK — Part A row verbatim; index row present |
| SCOPE-656 | decision | rationale | rationale file Part A row J-DET-44 (verbatim); index row J-DET-44 | OK — Part A row verbatim; index row present |
| SCOPE-657 | decision | rationale | rationale file Part A row J-DET-45 (verbatim); index row J-DET-45 | OK — Part A row verbatim; index row present |
| SCOPE-658 | decision | rationale | rationale file Part A row J-DET-46 (verbatim); index row J-DET-46 | OK — Part A row verbatim; index row present |
| SCOPE-659 | decision | rationale | rationale file Part A row J-DET-47 (verbatim); index row J-DET-47 | OK — Part A row verbatim; index row present |
| SCOPE-660 | decision | rationale | rationale file Part A row J-DET-48 (verbatim); index row J-DET-48 | OK — Part A row verbatim; index row present |
| SCOPE-661 | decision | rationale | rationale file Part A row J-DET-49 (verbatim); index row J-DET-49 | OK — Part A row verbatim; index row present |
| SCOPE-662 | decision | rationale | rationale file Part A row J-DET-50 (verbatim); index row J-DET-50 | OK — Part A row verbatim; index row present |
| SCOPE-663 | decision | rationale | rationale file Part A row J-DET-51 (verbatim); index row J-DET-51 | OK — Part A row verbatim; index row present |
| SCOPE-664 | decision | rationale | rationale file Part A row J-P1 (verbatim); index row J-P1 | OK — Part A row verbatim; index row present |
| SCOPE-665 | decision | rationale | rationale file Part A row J-P2 (verbatim); index row J-P2 | OK — Part A row verbatim; index row present |
| SCOPE-666 | decision | rationale | rationale file Part A row J-P3 (verbatim); index row J-P3 | OK — Part A row verbatim; index row present |
| SCOPE-667 | decision | rationale | rationale file Part A row J-P4 (verbatim); index row J-P4 | OK — Part A row verbatim; index row present |
| SCOPE-668 | decision | rationale | rationale file Part A row J-P5 (verbatim); index row J-P5 | OK — Part A row verbatim; index row present |
| SCOPE-669 | decision | rationale | rationale file Part A row J-P6 (verbatim); index row J-P6 | OK — Part A row verbatim; index row present |
| SCOPE-670 | decision | rationale | rationale file Part A row J-P7 (verbatim); index row J-P7 | OK — Part A row verbatim; index row present |
| SCOPE-671 | decision | rationale | rationale file Part A row J-P8 (verbatim); index row J-P8 | OK — Part A row verbatim; index row present |
| SCOPE-672 | decision | rationale | rationale file Part A row J-P9 (verbatim); index row J-P9 | OK — Part A row verbatim; index row present |
| SCOPE-673 | decision | rationale | rationale file Part A row J-P10 (verbatim); index row J-P10 | OK — Part A row verbatim; index row present |
| SCOPE-674 | decision | rationale | rationale file Part A row J-P11 (verbatim); index row J-P11 | OK — Part A row verbatim; index row present |
| SCOPE-675 | decision | rationale | rationale file Part A row J-P12 (verbatim); index row J-P12 | OK — Part A row verbatim; index row present |
| SCOPE-676 | decision | rationale | rationale file Part A row J-P13 (verbatim); index row J-P13 | OK — Part A row verbatim; index row present |
| SCOPE-677 | decision | rationale | rationale file Part A row J-P14 (verbatim); index row J-P14 | OK — Part A row verbatim; index row present |
| SCOPE-678 | decision | rationale | rationale file Part A row J-P15 (verbatim); index row J-P15 | OK — Part A row verbatim; index row present |
| SCOPE-679 | decision | rationale | rationale file Part A row J-P16 (verbatim); index row J-P16 | OK — Part A row verbatim; index row present |
| SCOPE-680 | decision | rationale | rationale file Part A row J-P17 (verbatim); index row J-P17 | OK — Part A row verbatim; index row present |
| SCOPE-681 | decision | rationale | rationale file Part A row J-P18 (verbatim); index row J-P18 | OK — Part A row verbatim; index row present |
| SCOPE-682 | decision | rationale | rationale file Part A row J-P19 (verbatim); index row J-P19 | OK — Part A row verbatim; index row present |
| SCOPE-683 | decision | rationale | rationale file Part A row J-P20 (verbatim); index row J-P20 | OK — Part A row verbatim; index row present |
| SCOPE-684 | decision | rationale | rationale file Part A row J-P21 (verbatim); index row J-P21 | OK — Part A row verbatim; index row present |
| SCOPE-685 | decision | rationale | rationale file Part A row J-P22 (verbatim); index row J-P22 | OK — Part A row verbatim; index row present |
| SCOPE-686 | decision | rationale | rationale file Part A row J-P23 (verbatim); index row J-P23 | OK — Part A row verbatim; index row present |
| SCOPE-687 | decision | rationale | rationale file Part A row J-P24 (verbatim); index row J-P24 | OK — Part A row verbatim; index row present |
| SCOPE-688 | decision | rationale | rationale file Part A row J-P25 (verbatim); index row J-P25 | OK — Part A row verbatim; index row present |
| SCOPE-689 | decision | rationale | rationale file Part A row J-P26 (verbatim); index row J-P26 | OK — Part A row verbatim; index row present |
| SCOPE-690 | decision | rationale | rationale file Part A row J-P27 (verbatim); index row J-P27 | OK — Part A row verbatim; index row present |
| SCOPE-691 | decision | rationale | rationale file Part A row J-P28 (verbatim); index row J-P28 | OK — Part A row verbatim; index row present |
| SCOPE-692 | decision | rationale | rationale file Part A row J-P29 (verbatim); index row J-P29 | OK — Part A row verbatim; index row present |
| SCOPE-693 | decision | rationale | rationale file Part A row J-P30 (verbatim); index row J-P30 | OK — Part A row verbatim; index row present |
| SCOPE-694 | decision | rationale | rationale file Part A row J-P31 (verbatim); index row J-P31 | OK — Part A row verbatim; index row present |
| SCOPE-695 | decision | rationale | rationale file Part A row J-P32 (verbatim); index row J-P32 | OK — Part A row verbatim; index row present |
| SCOPE-696 | decision | rationale | rationale file Part A row J-P33 (verbatim); index row J-P33 | OK — Part A row verbatim; index row present |
| SCOPE-697 | decision | rationale | rationale file Part A row J-P34 (verbatim); index row J-P34 | OK — Part A row verbatim; index row present |
| SCOPE-698 | decision | rationale | rationale file Part A row J-P35 (verbatim); index row J-P35 | OK — Part A row verbatim; index row present |
| SCOPE-699 | decision | rationale | rationale file Part A row J-P36 (verbatim); index row J-P36 | OK — Part A row verbatim; index row present |
| SCOPE-700 | decision | rationale | rationale file Part A row J-P37 (verbatim); index row J-P37 | OK — Part A row verbatim; index row present |
| SCOPE-701 | decision | rationale | rationale file Part A row J-P38 (verbatim); index row J-P38 | OK — Part A row verbatim; index row present |
| SCOPE-702 | decision | rationale | rationale file Part A row J-P39 (verbatim); index row J-P39 | OK — Part A row verbatim; index row present |
| SCOPE-703 | decision | rationale | rationale file Part A row J-P40 (verbatim); index row J-P40 | OK — Part A row verbatim; index row present |
| SCOPE-704 | decision | rationale | rationale file Part A row J-P41 (verbatim); index row J-P41 | OK — Part A row verbatim; index row present |
| SCOPE-705 | decision | rationale | rationale file Part A row J-P42 (verbatim); index row J-P42 | OK — Part A row verbatim; index row present |
| SCOPE-706 | decision | rationale | rationale file Part A row J-P43 (verbatim); index row J-P43 | OK — Part A row verbatim; index row present |
| SCOPE-707 | decision | rationale | rationale file Part A row J-P44 (verbatim); index row J-P44 | OK — Part A row verbatim; index row present |
| SCOPE-708 | decision | rationale | rationale file Part A row J-P45 (verbatim); index row J-P45 | OK — Part A row verbatim; index row present |
| SCOPE-709 | decision | rationale | rationale file Part A row J-P46 (verbatim); index row J-P46 | OK — Part A row verbatim; index row present |
| SCOPE-710 | decision | rationale | rationale file Part A row J-P47 (verbatim); index row J-P47 | OK — Part A row verbatim; index row present |
| SCOPE-711 | decision | rationale | rationale file Part A row J-P48 (verbatim); index row J-P48 | OK — Part A row verbatim; index row present |
| SCOPE-712 | decision | rationale | rationale file Part A row J-P49 (verbatim); index row J-P49 | OK — Part A row verbatim; index row present |
| SCOPE-713 | decision | rationale | rationale file Part A row J-R1 (verbatim); index row J-R1 | OK — Part A row verbatim; index row present |
| SCOPE-714 | decision | rationale | rationale file Part A row J-R2 (verbatim); index row J-R2 | OK — Part A row verbatim; index row present |
| SCOPE-715 | decision | rationale | rationale file Part A row J-R3 (verbatim); index row J-R3 | OK — Part A row verbatim; index row present |
| SCOPE-716 | decision | rationale | rationale file Part A row J-R4 (verbatim); index row J-R4 | OK — Part A row verbatim; index row present |
| SCOPE-717 | decision | rationale | rationale file Part A row J-R5 (verbatim); index row J-R5 | OK — Part A row verbatim; index row present |
| SCOPE-718 | decision | rationale | rationale file Part A row J-R6 (verbatim); index row J-R6 | OK — Part A row verbatim; index row present |
| SCOPE-719 | decision | rationale | rationale file Part A row J-R7 (verbatim); index row J-R7 | OK — Part A row verbatim; index row present |
| SCOPE-720 | decision | rationale | rationale file Part A row J-R8 (verbatim); index row J-R8 | OK — Part A row verbatim; index row present |
| SCOPE-721 | decision | rationale | rationale file Part A row J-R9 (verbatim); index row J-R9 | OK — Part A row verbatim; index row present |
| SCOPE-722 | decision | rationale | rationale file Part A row J-R10 (verbatim); index row J-R10 | OK — Part A row verbatim; index row present |
| SCOPE-723 | decision | rationale | rationale file Part A row J-R11 (verbatim); index row J-R11 | OK — Part A row verbatim; index row present |
| SCOPE-724 | decision | rationale | rationale file Part A row J-R12 (verbatim); index row J-R12 | OK — Part A row verbatim; index row present |
| SCOPE-725 | decision | rationale | rationale file Part A row J-R13 (verbatim); index row J-R13 | OK — Part A row verbatim; index row present |
| SCOPE-726 | decision | rationale | rationale file Part A row J-R14 (verbatim); index row J-R14 | OK — Part A row verbatim; index row present |
| SCOPE-727 | decision | rationale | rationale file Part A row J-R15 (verbatim); index row J-R15 | OK — Part A row verbatim; index row present |
| SCOPE-728 | decision | rationale | rationale file Part A row J-R16 (verbatim); index row J-R16 | OK — Part A row verbatim; index row present |
| SCOPE-729 | decision | rationale | rationale file Part A row J-R17 (verbatim); index row J-R17 | OK — Part A row verbatim; index row present |
| SCOPE-730 | decision | rationale | rationale file Part A row J-R18 (verbatim); index row J-R18 | OK — Part A row verbatim; index row present |
| SCOPE-731 | decision | rationale | rationale file Part A row J-R19 (verbatim); index row J-R19 | OK — Part A row verbatim; index row present |
| SCOPE-732 | decision | rationale | rationale file Part A row J-R20 (verbatim); index row J-R20 | OK — Part A row verbatim; index row present |
| SCOPE-733 | decision | rationale | rationale file Part A row J-R21 (verbatim); index row J-R21 | OK — Part A row verbatim; index row present |
| SCOPE-734 | decision | rationale | rationale file Part A row J-R22 (verbatim); index row J-R22 | OK — Part A row verbatim; index row present |
| SCOPE-735 | decision | rationale | rationale file Part A row J-R23 (verbatim); index row J-R23 | OK — Part A row verbatim; index row present |
| SCOPE-736 | decision | rationale | rationale file Part A row J-R24 (verbatim); index row J-R24 | OK — Part A row verbatim; index row present |
| SCOPE-737 | decision | rationale | rationale file Part A row J-R25 (verbatim); index row J-R25 | OK — Part A row verbatim; index row present |
| SCOPE-738 | decision | rationale | rationale file Part A row J-R26 (verbatim); index row J-R26 | OK — Part A row verbatim; index row present |
| SCOPE-739 | decision | rationale | rationale file Part A row J-R27 (verbatim); index row J-R27 | OK — Part A row verbatim; index row present |
| SCOPE-740 | decision | rationale | rationale file Part A row J-R28 (verbatim); index row J-R28 | OK — Part A row verbatim; index row present |
| SCOPE-741 | decision | rationale | rationale file Part A row J-R29 (verbatim); index row J-R29 | OK — Part A row verbatim; index row present |
| SCOPE-742 | decision | rationale | rationale file Part A row J-R30 (verbatim); index row J-R30 | OK — Part A row verbatim; index row present |
| SCOPE-743 | decision | rationale | rationale file Part A row J-R31 (verbatim); index row J-R31 | OK — Part A row verbatim; index row present |
| SCOPE-744 | decision | rationale | rationale file Part A row J-R32 (verbatim); index row J-R32 | OK — Part A row verbatim; index row present |
| SCOPE-745 | decision | rationale | rationale file Part A row J-R33 (verbatim); index row J-R33 | OK — Part A row verbatim; index row present |
| SCOPE-746 | decision | rationale | rationale file Part A row J-R34 (verbatim); index row J-R34 | OK — Part A row verbatim; index row present |
| SCOPE-747 | decision | rationale | rationale file Part A row J-R35 (verbatim); index row J-R35 | OK — Part A row verbatim; index row present |
| SCOPE-748 | decision | rationale | rationale file Part A row J-R36 (verbatim); index row J-R36 | OK — Part A row verbatim; index row present |
| SCOPE-749 | decision | rationale | rationale file Part A row J-R37 (verbatim); index row J-R37 | OK — Part A row verbatim; index row present |
| SCOPE-750 | decision | rationale | rationale file Part A row J-R38 (verbatim); index row J-R38 | OK — Part A row verbatim; index row present |
| SCOPE-751 | decision | rationale | rationale file Part A row J-R39 (verbatim); index row J-R39 | OK — Part A row verbatim; index row present |
| SCOPE-752 | decision | rationale | rationale file Part A row J-R40 (verbatim); index row J-R40 | OK — Part A row verbatim; index row present |
| SCOPE-753 | decision | rationale | rationale file Part A row J-R41 (verbatim); index row J-R41 | OK — Part A row verbatim; index row present |
| SCOPE-754 | decision | rationale | rationale file Part A row J-R42 (verbatim); index row J-R42 | OK — Part A row verbatim; index row present |
| SCOPE-755 | decision | rationale | rationale file Part A row J-R43 (verbatim); index row J-R43 | OK — Part A row verbatim; index row present |
| SCOPE-756 | decision | rationale | rationale file Part A row J-R44 (verbatim); index row J-R44 | OK — Part A row verbatim; index row present |
| SCOPE-757 | decision | rationale | rationale file Part A row J-R45 (verbatim); index row J-R45 | OK — Part A row verbatim; index row present |
| SCOPE-758 | decision | rationale | rationale file Part A row J-R46 (verbatim); index row J-R46 | OK — Part A row verbatim; index row present |
| SCOPE-759 | decision | rationale | rationale file Part A row J-R47 (verbatim); index row J-R47 | OK — Part A row verbatim; index row present |
| SCOPE-760 | decision | rationale | rationale file Part A row J-R48 (verbatim); index row J-R48 | OK — Part A row verbatim; index row present |
| SCOPE-761 | decision | rationale | rationale file Part A row J-R49 (verbatim); index row J-R49 | OK — Part A row verbatim; index row present |
| SCOPE-762 | decision | rationale | rationale file Part A row J-R50 (verbatim); index row J-R50 | OK — Part A row verbatim; index row present |
| SCOPE-763 | decision | rationale | rationale file Part A row J-R51 (verbatim); index row J-R51 | OK — Part A row verbatim; index row present |
| SCOPE-764 | decision | rationale | rationale file Part A row J-R52 (verbatim); index row J-R52 | OK — Part A row verbatim; index row present |
| SCOPE-765 | decision | rationale | rationale file Part A row J-R53 (verbatim); index row J-R53 | OK — Part A row verbatim; index row present |
| SCOPE-766 | decision | rationale | rationale file Part A row J-R54 (verbatim); index row J-R54 | OK — Part A row verbatim; index row present |
| SCOPE-767 | decision | rationale | rationale file Part A row J-S1 (verbatim); index row J-S1 | OK — Part A row verbatim; index row present |
| SCOPE-768 | decision | rationale | rationale file Part A row J-S2 (verbatim); index row J-S2 | OK — Part A row verbatim; index row present |
| SCOPE-769 | decision | rationale | rationale file Part A row J-S3 (verbatim); index row J-S3 | OK — Part A row verbatim; index row present |
| SCOPE-770 | decision | rationale | rationale file Part A row J-S4 (verbatim, amended for SCOPE-C03); index row J-S4 | OK — Part A row amended as ruled: amended (SCOPE-C03); index row present |
| SCOPE-771 | decision | rationale | rationale file Part A row J-S5 (verbatim); index row J-S5 | OK — Part A row verbatim; index row present |
| SCOPE-772 | decision | rationale | rationale file Part A row J-S6 (verbatim); index row J-S6 | OK — Part A row verbatim; index row present |
| SCOPE-773 | decision | rationale | rationale file Part A row J-S7 (verbatim); index row J-S7 | OK — Part A row verbatim; index row present |
| SCOPE-774 | decision | rationale | rationale file Part A row J-S8 (verbatim); index row J-S8 | OK — Part A row verbatim; index row present |
| SCOPE-775 | decision | rationale | rationale file Part A row J-S9 (verbatim); index row J-S9 | OK — Part A row verbatim; index row present |
| SCOPE-776 | decision | rationale | rationale file Part A row J-S10 (verbatim); index row J-S10 | OK — Part A row verbatim; index row present |
| SCOPE-777 | decision | rationale | rationale file Part A row J-S11 (verbatim); index row J-S11 | OK — Part A row verbatim; index row present |
| SCOPE-778 | decision | rationale | rationale file Part A row J-S12 (verbatim); index row J-S12 | OK — Part A row verbatim; index row present |
| SCOPE-779 | decision | rationale | rationale file Part A row J-S13 (verbatim); index row J-S13 | OK — Part A row verbatim; index row present |
| SCOPE-780 | decision | rationale | rationale file Part A row J-S14 (verbatim); index row J-S14 | OK — Part A row verbatim; index row present |
| SCOPE-781 | decision | rationale | rationale file Part A row J-S15 (verbatim); index row J-S15 | OK — Part A row verbatim; index row present |
| SCOPE-782 | decision | rationale | rationale file Part A row J-S16 (verbatim); index row J-S16 | OK — Part A row verbatim; index row present |
| SCOPE-783 | decision | rationale | rationale file Part A row J-S17 (verbatim); index row J-S17 | OK — Part A row verbatim; index row present |
| SCOPE-784 | decision | rationale | rationale file Part A row J-S18 (verbatim); index row J-S18 | OK — Part A row verbatim; index row present |
| SCOPE-785 | decision | rationale | rationale file Part A row J-S19 (verbatim); index row J-S19 | OK — Part A row verbatim; index row present |
| SCOPE-786 | decision | rationale | rationale file Part A row J-S20 (verbatim); index row J-S20 | OK — Part A row verbatim; index row present |
| SCOPE-787 | decision | rationale | rationale file Part A row J-S21 (verbatim); index row J-S21 | OK — Part A row verbatim; index row present |
| SCOPE-788 | decision | rationale | rationale file Part A row J-S22 (verbatim); index row J-S22 | OK — Part A row verbatim; index row present |
| SCOPE-789 | decision | rationale | rationale file Part A row J-S23 (verbatim); index row J-S23 | OK — Part A row verbatim; index row present |
| SCOPE-790 | decision | rationale | rationale file Part A row J-S24 (verbatim); index row J-S24 | OK — Part A row verbatim; index row present |
| SCOPE-791 | decision | rationale | rationale file Part A row J-S25 (verbatim); index row J-S25 | OK — Part A row verbatim; index row present |
| SCOPE-792 | decision | rationale | rationale file Part A row J-S26 (verbatim); index row J-S26 | OK — Part A row verbatim; index row present |
| SCOPE-793 | decision | rationale | rationale file Part A row J-S27 (verbatim); index row J-S27 | OK (row verbatim); observation O-4: index "where" could add §6.1 (the town-root key's home) |
| SCOPE-794 | decision | rationale | rationale file Part A row J-S28 (verbatim); index row J-S28 | OK — Part A row verbatim; index row present |
| SCOPE-795 | decision | rationale | rationale file Part A row J-S29 (verbatim); index row J-S29 | OK — Part A row verbatim; index row present |
| SCOPE-796 | decision | rationale | rationale file Part A row J-S30 (verbatim); index row J-S30 | OK — Part A row verbatim; index row present |
| SCOPE-797 | decision | rationale | rationale file Part A row J-S31 (verbatim); index row J-S31 | OK — Part A row verbatim; index row present |
| SCOPE-798 | decision | rationale | rationale file Part A row J-S32 (verbatim); index row J-S32 | OK — Part A row verbatim; index row present |
| SCOPE-799 | decision | rationale | rationale file Part A row J-S33 (verbatim); index row J-S33 | OK — Part A row verbatim; index row present |
| SCOPE-800 | decision | rationale | rationale file Part A row J-S34 (verbatim, amended for VS5-2); index row J-S34 | OK — Part A row amended as ruled: amended (VS5-2); index row present |
| SCOPE-801 | decision | rationale | rationale file Part A row J-S35 (verbatim); index row J-S35 | OK — Part A row verbatim; index row present |
| SCOPE-802 | decision | rationale | rationale file Part A row J-S36 (verbatim); index row J-S36 | OK — Part A row verbatim; index row present |
| SCOPE-803 | decision | rationale | rationale file Part A row J-S37 (verbatim); index row J-S37 | OK — Part A row verbatim; index row present |
| SCOPE-804 | decision | rationale | rationale file Part A row J-S38 (verbatim); index row J-S38 | OK — Part A row verbatim; index row present |
| SCOPE-805 | decision | rationale | rationale file Part A row J-S39 (verbatim); index row J-S39 | OK — Part A row verbatim; index row present |
| SCOPE-806 | decision | rationale | rationale file Part A row J-S40 (verbatim, amended for VS5-1); index row J-S40 | OK — Part A row amended as ruled: amended (VS5-1); index row present |
| SCOPE-807 | decision | rationale | rationale file Part A row J-S41 (verbatim); index row J-S41 | OK — Part A row verbatim; index row present |
| SCOPE-808 | decision | rationale | rationale file Part A row J-S42 (verbatim); index row J-S42 | OK — Part A row verbatim; index row present |
| SCOPE-809 | decision | rationale | rationale file Part A row J-S43 (verbatim); index row J-S43 | OK (row verbatim); **V-SCOPE-12** — index row calls it "the fix-all line", a name §16 no longer uses |
| SCOPE-810 | decision | rationale | rationale file Part A row J-I1 (verbatim); index row J-I1 | OK — Part A row verbatim; index row present |
| SCOPE-811 | decision | rationale | rationale file Part A row J-I2 (verbatim); index row J-I2 | OK — Part A row verbatim; index row present |
| SCOPE-812 | decision | rationale | rationale file Part A row J-I3 (verbatim); index row J-I3 | OK — Part A row verbatim; index row present |
| SCOPE-813 | decision | rationale | rationale file Part A row J-I4 (verbatim); index row J-I4 | OK — Part A row verbatim; index row present |
| SCOPE-814 | decision | rationale | rationale file Part A row J-I5 (verbatim); index row J-I5 | OK — Part A row verbatim; index row present |
| SCOPE-815 | decision | rationale | rationale file Part A row J-I6 (verbatim); index row J-I6 | OK — Part A row verbatim; index row present |
| SCOPE-816 | decision | rationale | rationale file Part A row J-I7 (verbatim); index row J-I7 | OK — Part A row verbatim; index row present |
| SCOPE-817 | decision | rationale | rationale file Part A row J-I8 (verbatim); index row J-I8 | OK — Part A row verbatim; index row present |
| SCOPE-818 | decision | rationale | rationale file Part A row J-I9 (verbatim); index row J-I9 | OK — Part A row verbatim; index row present |
| SCOPE-819 | decision | rationale | rationale file Part A row J-I10 (verbatim); index row J-I10 | OK — Part A row verbatim; index row present |
| SCOPE-820 | decision | rationale | rationale file Part A row J-I11 (verbatim); index row J-I11 | OK — Part A row verbatim; index row present |
| SCOPE-821 | decision | rationale | rationale file Part A row J-I12 (verbatim); index row J-I12 | OK — Part A row verbatim; index row present |
| SCOPE-822 | decision | rationale | rationale file Part A row J-I13 (verbatim); index row J-I13 | OK — Part A row verbatim; index row present |
| SCOPE-823 | decision | rationale | rationale file Part A row J-I14 (verbatim); index row J-I14 | OK — Part A row verbatim; index row present |
| SCOPE-824 | decision | rationale | rationale file Part A row J-I15 (verbatim); index row J-I15 | OK — Part A row verbatim; index row present |
| SCOPE-825 | decision | rationale | rationale file Part A row J-I16 (verbatim); index row J-I16 | OK — Part A row verbatim; index row present |
| SCOPE-826 | decision | rationale | rationale file Part A row J-I17 (verbatim); index row J-I17 | OK — Part A row verbatim; index row present |
| SCOPE-827 | decision | rationale | rationale file Part A row J-I18 (verbatim, amended for NP5-2 / CF-PIPE-10); index row J-I18 | OK — Part A row amended as ruled: amended (CF-PIPE-10 / NP5-2); index row present |
| SCOPE-828 | decision | rationale | rationale file Part A row J-I19 (verbatim, amended for VS5-1); index row J-I19 | OK — Part A row amended as ruled: amended (VS5-1); index row present |
| SCOPE-C01 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C02 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C03 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C04 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C05 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C06 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C07 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C08 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C09 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C10 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |
| SCOPE-C11 | — | conflict | conflict record — resolved as §4 of this report states | resolved as the canon rules (§4 of this file) |

**MOVE IN** (facts other parts stated, now stated in this part)

| inventory id | fact | new home | verdict |
|---|---|---|---|
| MODEL-274 | heights acceptance (100 %; 0 wings off the datum rule on hilly goldens and after terrain s | §13.2 *Stage property tests* | OK — stated at the new home |
| MODEL-339 | the 20-epoch heap ≤ 1.3 × and document ≤ 2 × test (M4) | §13.2 *B-EDIT* (and §13.8 milestone tier, §16 M4) | OK — stated at the new home |
| MODEL-354 | the entity-registry path test | §13.2 *Document tests* | OK — stated at the new home |
| MODEL-430 | export → import → export byte-identical over the canonical form (O9 a, O11 c) | §13.2 *Document tests* | OK — stated at the new home |
| KERNEL-129 | callback-form issue-order determinism (two runs, slot renumbering, pool sizes 0–3) | §13.2 *Stage contract tests* — op-order determinism | OK — stated at the new home |
| KERNEL-131 | the slot-renumbering property test | §13.1 *Properties* | OK — stated at the new home |
| KERNEL-282 | the slide fixture (`warp` with `fromLevel = 1` over a street ending on a shore) | §13.1 *attraction and moves* | OK (§13.1 attraction and moves) |
| KERNEL-343 | the straight-skeleton M0 fixtures | §13.1 *straight-skeleton fixtures (M0)* | OK — stated at the new home |
| KERNEL-363 | save → load → save byte-identical, loaded arena passing every hard invariant | §13.1 *Properties* | OK — stated at the new home |
| PIPELINE-228 | M0 (b) re-measures NG's signature on curved, round-joined, triangular, C-shaped and holed  | §16 M0 content (b) | OK — stated at the new home |
