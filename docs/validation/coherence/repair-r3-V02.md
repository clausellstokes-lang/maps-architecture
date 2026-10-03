# Repair round 3 — V02 (buildings, stage 3) — lane coherence/repair-V02-r3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V02-r3; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V02-r3`, 2026-10-01)
- P0 brief read whole (5 routed issues; ROUND-3 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); resume check: no output, no
  LANDED line: fresh start: done
- P1 adjudication-r3's table of contents, R3-01 – R3-03, R3-05, R3-08, R3-09, R3-10, R3-26 and Part H · V02 (5 issues,
  3 END lines) read whole: done
- P2 issue sources (verify-agree-proof-r2t, verify-scope-r2t, verify-vol-V01-V02-r2t, verify-vol-V11-V12-r2t) and the
  live V02 units concerned read whole; the homes cited checked in the live set and in the round-3 repair files already
  landed (rendering §8.1 item 7, §8.2, §8.8, T-ER-27; model §2.6 step 7; scope §13.2's stage-3 row and runs lists; V06
  §3.22 (3), §3.23 (3); V08 §3.16 (7) (b), §7.1; V12 §2.13, §3.7.8, X-V12-11); live V01 §2.3, §3.16, V03 §5.6, base §8.1,
  §8.2's slot resolution, §8.9: done
- P3 count-asserted edits and generated blocks (work/repair-V02-r3/edits.py, build.py: 33 substitutions, each applied
  exactly its asserted number of times; 14 REPLACE blocks): done
- P4 dry run of apply-blocks.py on a copy (14 of 14 applied, byte-identical to the generator's volume); tables, ids,
  references, review-id scan, doc_checks: done
- P5 result file and LANDED: done

## Summary

* **Blocks:** 14 `REPLACE` blocks on `docs/volumes/V02-buildings.md` (no retitle, no insert): §1b, §1c, §2.4, §2.5, §3.1,
  §3.18, §5.7, §6.3, §6.6, §7.2, §7.6, §7.8, §8.6, §13. **Ruling requests: 0.**
* **Live file** (assemble-r2's output): `docs/volumes/V02-buildings.md` sha256 c4d398371f65…; every REPLACE body is the
  live unit with count-asserted substitutions; every untouched line is verbatim. Expected volume sha256 4696951caa15….
* **Binding rulings applied:** R3-01 (both ends this round; the three END lines below; HAND-OFFS for the ends no line
  names), R3-02 (no review id written into the design: scan clean), R3-03 (grades as Part H gives them), R3-05 (the
  roofless case cited from §2.6 step 7, its scope not restated, at §5.7 (2), X34, §3.18 and T-V2-59 (b)), R3-08 (a) and
  (b) (item 123 (b)'s "reused" read as a `reoccupy` back into use; the per-element `decayPeak` through V03 §5.6 (2) (b)),
  R3-09 (c) (V02 reads `disasterSource(…).pattern`) and (e) (the look fixture's disasters are calamities with their linked
  `reconstruction` conditions), R3-10 (a preview never hands over), R3-26 (the heads name the base-bar clauses run; the
  pin clauses in the registration form).

## Issues → where fixed (5 routed ids: 5 FIXED; none MERGED or INVALID)

* **VAP-r2-02** (FIX per R3-26; graded MINOR, bookkeeping). §7.2's T-V2-58 head reads "(item 115 (f); takes T115-1's
  composed-shape clause and T115-4's rung clause on B-MASS, §13.2's stage-3 row)"; its (f) ends "— the `item115.ceiling`
  registration of B-MASS on V12 §3.7.8's engine (V12 §2.13), written by the M6a seat (T115-4)". §7.8's T-V2-59 head reads
  "(item 123 (d), (f); takes T123-5 and T123-7's exterior clause)". Both agree with scope's round-3 take-over row and V12's
  round-3 union (`item115.ceiling`'s "B-MASS (V02, T-V2-58 (f))", §3.7.8's list, X-V12-11).
* **VCS-r2-05** (FIX). §7.6's T-V2-24: "… completes within ten seconds from the click to the file written** (T119-2's
  stage-3 export clause; V12 §3.15.9's wait timer, five seeds each; R12-31) …"; nothing else changes (R12-31 and R12-32
  are §12's own rule ids, not review ids).
* **VV12-r2-04** (FIX per R3-09 (c)). §5.7 (4): "Its kind — V01's `disasterSource(doc, overlay, key).pattern` (V01 §2.3,
  V01 §3.16 (2): the overlay's calamity's type through V06 §2.4's calamity table; `scatter` with no calamity, a preview's
  included) — adds one flavour: a `fire` pattern blackens, …; a `flood` and a `scatter` (an earthquake, every other kind,
  a preview) draw the damage alone". The parenthesis widens the required "`scatter` for a preview" to R3-09 (b)'s cases
  (an overlay with no calamity — a stressor's, a condition with no `calamity` field — gives `scatter` as a preview does).
  §2.4's `look.kind` is now `pattern: 'fire' | 'flood' | 'scatter'` with the comment "V01's DisasterSource.pattern". §1b's
  input cell and X35 name `disasterSource` (its `pattern`) beside `disasterDistricts`; §5.7 (1) and §3.18's look row read
  "that look's pattern"; §3.18 adds the no-calamity edge (`scatter`); T-V2-60 (f) names the patterns; §8.6's M6b row
  waits on `disasterSource` and `disasterDistricts`.
* **VV12-r2-05** (FIX; MAJOR). The producer and the consumer are wired across the worker boundary, stated at §5.7 (8) (the
  home) and cited at §2.4, §2.5, §3.1, §1b and §1c:
  1. *Where it runs.* `exteriorDamage` runs in the generation worker inside S14, for the buildings of each district whose
     district, neighbourhood or building band S14 builds (a full build, a band request, a picture export's transient
     list), at the drawn week, `crises` and effective knowledge key (§5.7 (8); §3.1's new row; §2.5's lifecycle row).
  2. *How it travels.* As the building's **damage marks** in its district's group of the display list or a
     `DisplayDelta` (§8.1, §8.9): one `building.look` mark (`building.look.fire` under a `fire` pattern) carrying the
     look's tone and dash and the fire's charred holes; at the element reading an `area` mark per hole ring
     (`building.roof.hole`) and per patched ring (`building.roof.patch`) and a `ribbon` mark per gap span
     (`building.wall.gap`), each naming its wing's key in the `wing` attribute column (matched to `RoofFacet.wing`); each
     mark with the building's `entity`, render key, `knownTo` and one `revision` (the hash of the leaf-digest revision,
     the plan's hash, the damaged and repaired element ids and the look's pattern). No sheet entry paints a damage mark on
     its own (they are read by the `roofscape` program and the outline while they draw their building), so none takes a
     slot of §8.2's slot resolution.
  3. *When it is re-sent.* The generation worker keeps each building's last `revision` and re-emits exactly the buildings
     whose `revision` changes: on a week step (beside §8.1 item 7's Works re-emission; a level crossing no threshold
     re-emits nothing), on a change of `crises` or of the effective knowledge key, when a plan enters or leaves force
     (a click, `view` derivation; eviction, staleness), and after a commit in §8.1 item 4's delta.
  4. *In the tile worker.* It clips each ring against its wing's facets in the memoised roofscape (V02 §6.3), memoises
     the clipped rings under the marks' `revision` (V02 §6.6), cuts the outline at each gap, and keys the tile by the
     drawn week and, where a `building.look` mark is held, by `crises` and the effective knowledge key (§8.8's tile key,
     which rendering's round-3 block writes with "(V02 §5.7 (8))"); the SVG writer clips against the roofscape it derives
     in the generation worker.
  §1b's row names this path; §6.6 adds the generation worker's rows (a building's marks ≤ 1 µs / ≤ 5 µs median, ≤ 30 µs
  p99; a week step's test ≤ 1 µs a building, ≤ 3 µs with a plan in force) with the delivered bytes, the tile worker's rows
  marked as such, the memo keyed by the marks' `revision`, and fallback (c); §6.3 counts the marks and their `wing`
  column; §3.18 adds the marks' edges; §8.6's M6b row carries the path. T-V2-59 (e) adds the eviction of the plan in force
  (the marks re-emitted at the massing reading, the cached tile redrawn) and the week step with and without a threshold
  crossed; T-V2-60 (g) adds Show crises switched off and back, a preview started and ended and View as changed over a
  cached district-band tile of a struck district (the tile redrawn after each) and the week step 17 → 18.
  **One element of the required list not applied, with its reason:** the marks carry no `level` and no separate `reading`
  field. The tile worker draws no form that reads the level (every hole, gap, patch and the look's tone are decided in
  the generation worker), so a `level` column would have no reader (principle (7)), and since `decayLevel` moves every
  week it would re-emit every decaying building at every week step with no pixel changed, against §8.1 item 7's
  O(changed) rule. The reading is the marks' presence (§5.7 (8): "The reading is their presence, and the level stays in
  the generation worker"). Everything else of the required change is applied as written.
* **VV1112-r2-09** (FIX per R3-26). T-V2-59 (d): "… at level 0 before any decay every tile byte-identical to the same
  fixture without item 123 (T123-7's no-op) — the `item123.damage` registration of the damage sub-fixture's exteriors on
  V12 §3.7.8's engine (V12 §2.13), written by the seat landing V02's item-123 exterior step (M6b, V02 §8.6)"; T-V2-60 (c):
  "(the `item122.crises` no-op — the `item122.crises` registration of the look fixture's exteriors on V12 §3.7.8's engine
  (V12 §2.13), written by the seat landing V02's ruined-look step (M6b, V02 §8.6))". At the root: §1b gains the two
  registration rows (producer the seat, consumer V12 §3.7.8's engine, `entityScope` and `view` kinds); §13's received
  row for X-V12-11 names T-V2-58 (f), T-V2-59 (d) and T-V2-60 (c); §8.6's M6b row lists the registrations. These ids are
  the ones V12's round-3 union lists (§2.13, §3.7.8, X-V12-11) and scope's take-over row carries. T-V2-60's head names
  "T122-1 and T122-7's `item122.crises` registration on the look fixture's exteriors" — scope's round-3 hand-off to V02,
  closed here.

## END lines written (Part H · V02)

* **END of VAF-R2T-01 (R3-05).** §5.7 (2)'s roofless sentence: "… the plan's open ceilings are the roof it lacks — every
  roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while the building is `decayed` or `ruined` (§2.6 step
  7) — which T-V2-59 (b) holds (X34)"; X34: "every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while
  the building is `decayed` or `ruined` (§2.6 step 7), damaged". The wider restatement ("a roofless building — the model's
  `decayed`, `ruined` and `charred` states — … every roof bay … open") is gone from §5.7 (2), X34, §3.18's row and
  T-V2-59 (b), which now cite §2.6 step 7's scope (a burned building is `decayed`, V06 §3.11.2 (3), so its charred shell
  falls inside it; T-V2-59's fixture names the burned house).
* **END of VAT2-r2-09 (R3-10).** §5.7 (1): "and has not handed over ((6); a preview never hands over, V06 §3.22 (3))".
  Its other ends at V02: §1b's input cell ("`crisisLookYields`, false for a preview"), X36, §3.18's look row (a preview
  over buildings under a rebuild's Works: the look on every building of its units), T-V2-60 (d) (the preview on the
  rebuilt seed in week 18 draws the look on its units' buildings under the rebuild's Works) with the fixture naming it.
* **END of VV56-r2-06 (R3-08 (b)).** §5.7 (2): repaired is "the level below its threshold and V06's per-element
  `decayPeak` (the highest level since the element entered the plan, V06 §3.23 (3), read through V03 §5.6 (2) (b))
  reaching it by the same comparison, … so an element added after its building's damage left (a wing an `extend` adds, an
  element a re-cut makes) is drawn as built". Its other ends at V02: §2.4's `patched` comment, §1b's input cell, X34, X36
  (V06's round-3 hand-off (b): `decayPeak` per element with `since`), §3.18's restoration row, and T-V2-59 (c) with the
  fixture (the restored manor extended by a wing, its new wing drawn as built). §5.7 (2)'s "damaged" reads §6.3 *Plan
  damage*'s one comparison ("the level above 0 and at least its keyed threshold t"), the canon wording R3-04 fixes for
  every unit, so the repaired clause can say "by the same comparison"; and the restoration reads R3-08 (a)'s "reused"
  ("a `reoccupy` back into use, a repair").

## HAND-OFFS (R3-01 (3): ends no END line names, for round 4's verifiers; none is open wording in the design text)

* **V03** — V03 §5.6 (2)'s `PlanDamage.look: ExteriorDamage['look']` comment reads "V02 §2.4's: the condition (null for a
  preview) and the calamity's type"; V02 §2.4's field is now `pattern` (V01's `DisasterSource.pattern`), so the comment
  reads "the condition (null for a preview) and its pattern (V01's `DisasterSource.pattern`)". The type follows V02's
  record automatically; only the comment's words move.
* **rendering** — §12.8's display-list line counts V02's damage marks and their `wing` attribute column (V02 §6.3 declares
  the bytes: ≈ 0.2 KB a building under a look at the massing reading, ≈ 2 KB a damaged house, ≤ 20 KB a fully ruined
  large manor; 4 B a mark of each finer-band table carrying one), as it counts V02's model bytes in the model line. §8.1
  item 7, §8.2's `decaying` row and §8.8's tile key already carry V02 §5.7 (8)'s ends (rendering's round-3 blocks).
* **V01** — VV12-r2-04's END under Part H · V01 (`DisasterSource.calamity`'s comment naming no V02 reader; `pattern`'s
  naming §8.2's disaster row and V02 §5.7 (4)) is V01's to write this round; V02 now reads `pattern` only, as that END
  assumes.

## Words (principle (9)'s report)

V02: 91 696 → 93 940 words (+2 244, +2.4 %). The words on removed lines: 3 044; on added lines: 5 288 (most removed lines
are re-wrapped paragraphs carried back with their change). Sources of the removed words: restatement — the roofless
scope restated at §5.7 (2), §3.18, X34 and T-V2-59 (b), now cited from §2.6 step 7, and §2.4's path paragraph kept to a
citation of §5.7 (8); narration, duplicated mechanisms, verbose prose: none found in the units touched. Added: the defect
fixes' design text — the generation-worker path, its marks, re-emission and tile-worker clip (§5.7 (8)) with its cost and
memory rows, lifecycle and `where it runs` rows and edges; the per-element peak and the preview's hand-over at their
readers; the registration clauses and rows. A repair round over defects, so the unit grows; its shrink stays the
rewrite's.

## Checks

* **Dry run.** `apply-blocks.py` (amendments-b) on a copy of the live V02 (this file's blocks, the FILE line removed): 14
  of 14 applied, 0 skipped, 0 malformed; audit 0 not OK; headings 77 → 77, none retitled; fences balanced (16 → 16);
  the title block unchanged; the output byte-identical to the generator's volume (sha256 4696951caa15…).
* **Tables.** Every table row of the expected volume has its header's cell count (0 mismatches; 0 in the live file).
* **Ids.** No test, decision or hand-off id added or removed: T-V2-1 – T-V2-60, J-V2.1 – J-V2.113, X1 – X37 (§13's
  census line unchanged). Every pointer added resolves: V02 §5.7 (8), §6.3, §6.6, §8.6, §5.2, §2.4, §7.2, §7.8; V03 §5.6
  (2) (b); V06 §3.22 (3), §3.23 (3), §2.4; V01 §2.3, §3.16 (2); V08 §3.16 (7) (b); V12 §2.13, §3.7.8; base §2.6 step 7,
  §6.3 *Plan damage*, §8.1 items 4, 6, 7, §8.2's slot resolution, §8.8, §8.9; T115-4, T119-2, T122-1, T122-7, T123-5,
  T123-7.
* **Scans.** No `R2-nn`, `R3-nn` or verifier id in V02; no `look.kind` field, "the calamity's type V01's `disasterDistricts`
  reads", "that look's kind", "the model's `decayed`, `ruined` and `charred` states", "the pin is V12's" or "its pin is
  V12's" left.
* **doc_checks** (WARNING printed: reference corpus INCOMPLETE — captures, research/patreon, research/devlogs,
  research/ftg-docs and research/external missing — so the clean-room results are NOT authoritative; provisional), on the
  volume with the base's headings for S2: before → after C1 0 → 0, C2 0 → 0, C3 586 → 598 (528 → 534 unreviewed: plain
  phrases of our own design text, e.g. "read in the generation worker", "hash of the building's leaf digest"), C4 1 → 1
  (0 unreviewed), S1 0 → 0, S2 156 → 194 (9 → 10 unreviewed: every one the volume's own "V02 §6.6" read against the
  base's headings, the class already present before this round).

=== FILE docs/volumes/V02-buildings.md ===

=== REPLACE ### 1b The wiring table — every new piece, what feeds it and what it feeds ===
### 1b The wiring table — every new piece, what feeds it and what it feeds

Every piece below has a named producer and a named consumer; the base hook column names where it plugs in. The file f
items cited are applied to the base (their text is the base section's).

| new piece | kind | fed by (producer; the dossier or derivation row where a fact comes from one) | feeds (consumer) | base hook |
|---|---|---|---|---|
| `ComposedBuildingGenerator.outline()` (the massing) | stage function | `BuildingInput` from S11 (slot hint, access, ctx, class, drift); `CompositionRow` at the manifested band (§2.5 `Plot.builtBand` → §4.11's floor rule); `ClimateTable` pitch; `massing` stream | `Building.wings`, `Building.massing`; S11's footprint insertion and first carry, `deriveEntrances` (entrance hint), `deriveBase`, the basement decision, the capacity function, the yard partition (court typing); §8.4's casters; 3-D exports | §2.6 `BuildingGenerator.outline`; §4.7 S11 |
| `BaseWing.role`, `BaseWing.key`, `Building.nextWingKey` | persisted fields | the massing; `setMassing`; the mutator's wing step | the composer (per-wing keyed draws), the mutator (match by role), §6.3's anchors, the roofscape (joint priority), exports (role names), edits (`setAttr` paths by key), V01's `hatched` stack ties by wing key (V01 §5.1.3) | §2.6 `BaseWing` (item 216) |
| `Building.massing` (`MassingRef`) | persisted field | the massing; `setMassing` `family`; the mutator | the mutator (source family), `deriveEntrances` (entrance wing and side), the JSON export, the report, the clerk's reader | §2.6 `Building` (item 217) |
| `DriftBounds` | type (declared at §2.6) | an assignment (§7.7) | the massing's family filter and size clamp; the mutator's adapt bounds | §2.6 `BuildingInput.drift`; §7.7 `Assignment.drift` (item 385) |
| `composition.json` (`CompositionRow`, `MassingFamilyRow`, `WingRoleRow`, `MassingGrowthRow`, `TowerShapeRow`, `PorchKindRow`, `DormerKindRow`, `RoleKeyRow`, `ClassFamilyRow`, the constants row) | tables | `@plat/tables`, the override layer, the `FM` preset, the corpus phase (§13.9) | the massing, the composer, the mutator, the roofscape, `facadeBays`, §8.10's decorative chimneys; V01's entrance reserve (`PorchKindRow`'s `widthM`, `depthM`, `outside`, shipped from M3a-V2; V01 §3.8.2 step 5, V01 §3.8.3's digest) | §7.6; §10.2 `DesignationTemplateRow.composition` (item 426) |
| `ComposedBuildingGenerator.compose()` (the composer) | lazy stage function | the base wings, the entrance set, the plot and yard parts, `CompositionRow`, `compose.*` streams | `Composition` (the `wings` and `rooms` rungs), the elaboration cache, the building-band drawing, the plan rung (fixed rings, dormer rows), exports with compositions | §2.6 `BuildingGenerator.compose`; §4.1 trigger policy; §2.8 record |
| `Wing.base`, `Wing.dormerRows` (`DormerRow`), `ComposedTower.base`, `Porch.kind`, `Composition.row`, `.grammar`, `.secondaryPorch` | lazy record fields (stored when edited) | the composer; `setComposition` | the roofscape and its paint programs, the plan rung (edited dormer rows fixed), glTF, CityJSON and JSON exports, the carry (rooms only) | §2.6 `Composition` (items 218–220) |
| V11's `HeightsRow` with the columns `attic`, `parapetCm`, `towerStoreyCm` | table contract (V11's rows and values; V02's reading rule) | V11 §3.6.4 (table `heights`, keyed by template family) | M11's eave, ridge, tower storeys and spires; `attic` gates dormers (V02 §3.7); `parapetCm` on flat roofs | §10.2 `DesignationTemplateRow.heights` (items 435, 427) |
| the resolution chain; `composition.roleKeys`; `composition.classFamily`; the family, class-override, role and default rows; the arrangement law | stage logic and tables | `DesignationTemplateRow.composition`, `BuildingClassRow.templateFamily` (item 432), the compiled template's `arrangement` and `structures`, V07's `v.` classes (V07 §2.4; V11 §2.9) | M1 (every slot's row), `MassingRef.row`, `Composition.row`, T-V2-33, the why provider; V03's A1 (3) and slot order, which read `composition.classFamily` for a `v.` key without a programme row (V03 §2.4; J-V3.111) | §4.7 S11; §10.2 |
| the rung ceiling on a dwelling's row (item 115) | stage logic, table read | V11 §3.25.4's `grandeur.ceiling` row of the rung in force (the document's; at an epoch the fold's, V06 §3.8.5) and its `settings.grandClasses`; the use's class and its profile family; S11's capped key in `BuildingInput.compositionRow` | M1's capped row (M3–M8's families and their tower, turret and gate-tower cells), `MassingRef.row`'s `~<RUNG>`, a standing building's re-derivations, the why fact `massing/ceiling`, V09 §4.21.5's beyond-tier line, T-V2-55, T-V2-58 | §4.7 S10b *Class mix* (3), S11 *Footprints and heights*; §10.2 *Grandeur ceiling* |
| M3's budget test and M10's slot band | stage logic | V11's `footprintM2` (p10/p90 or the 0.7 / 1.45 ratios), the role table's `footprintShare`, `LadderStepRow.sizeFactor`, `buildingScale`, the significance shift | M4's family draw, M10's shrink and reverse lattice, the report's `overBudget` | §4.7 S11 |
| `CompositionRow.axis` (`fallLine`, `water`), `MassingRef.low` | table cell, persisted field | the row (V07's longhouse rule; the mill and landing rows; `needs.runningWater`, V02 §3.14.6); the terrain sampler; the water faces | M2's frame; V03's byre end (`low`); the why provider | §2.6 `BuildingInput.terrain` |
| the sunlit choice (`sunBias`) | stage logic, constant | §7.7's `Intent.latitudeDeg` (DR29 on a dossier map; absent 50) — the latitude item 102's model sampler reads (§4.5), never the style's `SunSpec.latitudeDeg`; the constants row; the presets | M5's mirror coins; T-V2-37; the why provider | item 102 (d) |
| the building casters (each wing's prism) | derived | the massing's wings and heights | item 102's epoch daylight raster (V06 §3.4, per wing); §8.4's shadows | §8.4 casters; §4.11 |
| attached structures (M8b; `BuildingInput.attached`) | stage logic, input field | V11's structures through `roleKeys` (`attach: 'main'`); S11's drawn counts (item 304) | the main building's wheel, church porch and west towers; the forced tower mill; the absorbed ranges' budget | §4.7 S11 (item 304) |
| `MassingRef.segments`, `.cupola`, `BaseWing.arcade` | persisted fields | M5 and M13 (`segments`), M12 (`cupola`), M11 (`arcade`); every `setMassing` op and the mutator | the parity harness, the report, the why provider; the roofscape and exports (`cupola`); the drawing, exports and capacity (`arcade`) | §2.6 `Building`, `BaseWing` (items 216, 217) |
| wing references by key; the canonical wing order | contract | every wing writer (massing, mutator, `setMassing`, migration) | the carry, the plan's re-cut, §6.3's re-match, the clip order; T-V2-34 | §2.6 (item 225) |
| the significance shift | stage logic | the use's σ (§4.5 (1), with V11 §3.13's landmark and `economicWeight` factors; DR24 with item 104 (a) (5), (7)) | every geometry cell and M10's budget of that building; T-V2-38 | §4.5 (1) |
| split and ladder composition (V02 §3.14.3–V02 §3.14.4) | stage logic | `Use.branchOf` and V11's `split` families (item 105 (h)); `LadderStepRow` (item 108) | the two buildings of a split site; members and SIZE buildings; W3b's arrangement change; T-V2-39, T-V2-40 | §4.7 S11 designation mutator |
| the crypt seed wings, the raised crypt's lift, the dig floor, the W6 dig trigger | stage logic, persisted heights | `cryptSeedWings` (template parts, a stack's tier 0, the east-most range); V03's stair-entered reading (V03 §3.7.4), which gives the ground wings over the basement's ring the lift and the half raise act on; V11's `crypt` column (item 436) through item 238; the terrain gate; V04's void systems; V11 §3.23.7's `DigRule` rows (the dig chance) | §2.6's basement function (`Basement.crypt`, `kind 'raised'`, item 226); V03's choir stairs; V04's access draw and item 109 (k) (5)'s obstacle test | §2.6 *Basements*; II.7.3; item 109 |
| `setComposition room`, `moveTower { shape }`, the secondary-porch op | edit kinds | T9's handles, the clerk, a skeleton file | the stored composition, the `rooms` rung, §7.3's orphan table | §7.1 (item 351) |
| the `WhyProvider` for `building` (`massing`, `wings/<key>`, `composition`) | interface implementer | the committed massing, M3's and M8's tests re-run without draws, the event log | V10's oracle and clerk; V09's "why?" panel; T-V2-43 | V10 §3.9 (item 270) |
| `fantasyShapes`' control row | control | the recipe | M3's family filter; V09's advanced panel; `@plat/docs` | §7.8 (item 402) |
| `@underground` rows, `BuildingInput.layer` | table rows, input field | S11's plot layer (II.7.3, II.7.5, item 109 (j) (4)) | M1's key suffix, M0 (f) | §2.6 `BuildingInput` (item 303) |
| the naming slice `building.wingRole` | table (V11's naming tables) | V11 (V02 X6) | the wing hover label (V02 §5.4) | §10.4 |
| roof decorations `sails`, `smokeStack`, `stepStones`, `wallGrass` | §8.10 rows (cells in V02 §5.3's style table) | the massing (sails; the class's `emits.smoke`); the `FM` look | the tile rasteriser | §8.10 |
| options `fantasyShapes` (a recipe parameter) and `massing.composed` (a table option, `extension` over both) | model options | the recipe and §7.8's control; the preset resolution (§7.6) | M3's family filter; V02 §3.1's switch to the base outline under `MFCG` and `FTG` | §7.8, §7.6 |
| the composer's room roles `hall`, `gatehall`, `chapel`, `towerRoom` | room rows | the `rooms` rung (V02 §3.8) | the plan rung's programme and its arches (V03); §8.5's room labels | §2.6 `Composition.rooms`; §10.2 `RoomProgramRow` |
| `RoofSpec.kind 'shed'` and `RoofSpec.high` | model field values | the massing (back ranges, lean-tos, outshots, stairs) | the roofscape, §8.2's roof programs, glTF and CityJSON roofs | §2.6 `RoofSpec` (item 222) |
| `roofscape(building)` | derived function (never stored) | base wings, heights, roofs, towers; the composition's dormer rows and porch where present; `valleyReach` (float mode) | §8.6's roof construction `roofscape`, §8.4's surface layer and casters' roof faces, glTF, OBJ and CityJSON LoD2.2 roofs, B-ZOOM | §8.6 (item 406) |
| `exteriorDamage(doc, b, view, opts)` and its `ExteriorDamage` (V02 §2.4) — the exterior's damage (item 123 (d)) and the ruined look of a disaster's buildings (item 122) | derived function (never stored), run in the generation worker by S14 (V02 §5.7 (8)) | V06's `decayLevel` for the building's lineage at §2.9's `week`; the plan in force — current or stored, in the elaboration cache — under its damage layer (V03; §2.6 step 7; §6.3's `plan.damage` with V11's ranges; its repaired elements by V06's per-element `decayPeak`, read through V03 §5.6 (2) (b)); the disaster looks drawn in the view over the building's unit (§2.7's `ConditionOverlay` and its reader rule; §7.7's DR44 and its admission at the view's knowledge key, `ViewOpts.viewAs` lowering it; §10.2's `disaster` row and its `lookLevel`, and `previewSeverity`; §2.9's `crises`; V01's `disasterSource` — its `pattern` — and `disasterDistricts`, V07's ends at THORP, HAMLET and VILLAGE; V06's `crisisLookYields`, false for a preview) | the building's damage marks (V02 §5.7 (8)) — in its district's group of the display list or a `DisplayDelta`, re-emitted for exactly the buildings whose marks change — read by V02 §5.7's drawing in the tile rasteriser (the `roofscape` program's holes and patches, clipped to their wing's facets, the outline's gaps and rubble, the look's tone and dash, the porch, cupola and roof-decoration draws over a hole) and by the SVG and PNG writers from their transient lists; the SVG semantics `sem.building.roof.hole` and `sem.building.rubble`; V02 §6.6's memo; T-V2-59, T-V2-60 | §8.1 (S14, its `group`, the `DisplayDelta`, item 7's week re-emission), §8.9 (the worker boundary), §8.2 (the `states` rows; the crisis look rows), §8.6 (the damaged plan, item 123), §8.8 (the tile key) |
| `valleyReach(X, Y, mode)` — the plan reach of the valley where wing X's ridge meets wing Y's roof | derived function, `@plat/plots` | the two wings' heights and roofs | `facadeBays` (integer mode) and the roofscape (float mode) | — (V02 §3.7) |
| `facadeBays(wing, side, bayM)` | derived function, in `@plat/plots`, re-exported by `@plat/buildings` (item 505) | a wing's ring, the `bayM` column, `valleyReach` (integer mode) | dormer positions (V02 §3.7), the plan rung's windows (V03), lit windows when no plan exists (§8.4's `live.windows`), decorative chimneys (§8.10) | §2.6 plan step 6 "one per façade bay" (item 406) |
| `resolveEnds(building)` | derived function | base wings, heights, joints | the roofscape; the drawing of ridge ends | — (V02 §5.2) |
| the mutator's wing step (`mutateMassing`) | stage function | `MutationRecord` steps of §4.7 S11; `MassingGrowthRow`; `siteplan.mutate` stream | kept, adapted, added and subtracted wings; `MutationStep` of part kind `wing`; the composition's per-wing keep; Works stages (V06) | §4.7 S11 designation mutator steps 1–7 |
| concerns `massing`, `compose.dormers`, `compose.porch`, `compose.rooms` | stream registry entries | §6.1's mixer | the massing and the composer | §6.1 registry (item 341) |
| anchors for base wings and composed parts | identity rows | §6.3's re-match | edits by key after a re-derivation; the mutator's keep | §6.3 anchor table (item 346) |
| events `setMassing`, `setComposition` | edit kinds | the canvas T9 `shape` handles, the clerk's tool API, a skeleton file | S11's operator on the plot (massing), the stored composition, `carryWings`, the capacity re-homing, the elaboration record | §7.1, §7.4 (item 351) |
| the `FM` building-scope parity preset | preset | `composition.json`'s `presets.FM` entries (the measured-rate ones set by V12's `reference` run against Fantasy Manor, V12 §3.7.2 (3)); V11 §3.24.0's item-110 chance and offer cells' `presets.FM` entries, 0 | the free-frame parity harness (V02 §7.4), the owner's stage-3 panel, a user's "Fantasy Manor look" | §7.6 (item 376) |
| the register entries of `composition.json`'s calibratable cells | calibration register entries | the seat landing M3a-V2, M6a, M6b and M6c (V02 §8.3, V02 §8.5), from this volume's defaults, tests and fallbacks (V02 §3.10, V02 §6, V02 §8.2) | `plat calibrate register --check` (T-V12-20) at each exit; V12's tuning, fallback and reference runs (V12 §3.7) | V12 §3.11; §13.9 |
| the `BenchBarDef` registrations of V02's eleven bars (T-V2-22, -28, -29, -30, -32, -36, -37, -42, -46, -47, -51) | bar registrations (`@plat/testkit/bars`) | the seats landing M3a-V2, M6a, M6b and M6c, each in the change that writes the register entry naming the bar (V02 §3.10.10; V02 §7's checks as their `run`) | `plat parity`'s `bar.` rows (V12 §1b); the register lint and the exit rule (V12 §3.11, T-V12-20) | V12 §2.1 (`BenchBarDef`, `bar.<barId>`); §13.8's CI tiers |
| the NoOpPin registration of T-V2-50 (item 110's off form) | pin registration | the seat landing M3a-V2 | V12 §3.7.8's pin engine, reading V11 §3.24.0's off form | §13.2's convention; V12 §3.7.8 |
| the rung-pin registration of T-V2-58 (B-MASS on `item115.ceiling`; item 115 (f)) | pin registration | the seat landing M6a | V12 §3.7.8's pin engine, its `rungScope` kind (V12 §2.13) | §13.2's convention (T115-4); V12 §3.7.8 |
| the `item123.damage` registration of T-V2-59 (d) (the damage sub-fixture's exteriors; item 123) | pin registration | the seat landing V02's item-123 exterior step (M6b, V02 §8.6) | V12 §3.7.8's pin engine, its `entityScope` kind (V12 §2.13) | §13.2's convention (T123-7); V12 §3.7.8 |
| the `item122.crises` registration of T-V2-60 (c) (the look fixture's exteriors; item 122) | pin registration | the seat landing V02's ruined-look step (M6b, V02 §8.6) | V12 §3.7.8's pin engine, its `view` kind (V12 §2.13) | §13.2's convention (T122-1, T122-7); V12 §3.7.8 |
| F-MASSING, F-COMPOSE | failure classes | the massing's and the composer's checks | the generation report (massing), the view report (composition) | §5.2 (item 328) |
| paint programs `roofscape`, `dormer`, `porch`, `towerRoof`, `stairFlight` and the style cells of V02 §5.3 | style programs and cells | the roofscape, the composition, `stairTreads` | the tile rasteriser; the SVG writer | §8.2 (item 406) |
| JSON `massing` and `composition` blocks; glTF composition meshes; CityJSON LoD2.2 roofscape, `BuildingPart`, `BuildingInstallation`; `on`, `solid`, `stack` | export content | the model and the elaboration cache (or a derive-on-export pass) | files | §11.1 (item 449) |
| `@plat/buildings` | package | `@plat/kernel`, `model`, `tables`, the `BuildingGenerator` interface and the stack helpers in `@plat/plots` | the `StrategyRegistry.building` entry `composed` | §14 (item 505) |
| the free-frame parity harness `plat/bench/fm-parity/` | test instrument | the `FM` preset; `baselines.json` rows from `captures/manor/README-frequencies.md` | §13.5's Fantasy Manor rows; the owner's stage-3 panel; V12's `reference` run against Fantasy Manor, whose fixture it is (V12 §3.7.2 (3)) | §13.5, §13.6 (item 522) |
| `layTiers` — the tier geometry, ST2–ST7 | pure function, `@plat/plots` | `TierInput` (V02 §2.6) | a `TierLay` or a typed `TierFailure` → `massStepped` (ST8 and the attempts), the `tiers` op (V02 §4.6), the mutator's anchored lay (V02 §3.15.5), V04's ruin stage (V02 X19) | §2.6 base outline builder (item 229) |
| `massStepped` — the stepped branch of the massing | exported function, `@plat/plots` | `BuildingInput`, the `CompositionRow`, the bands; `slotBand`; `drawTiers` on `massing` indices 8–9; the attempt streams `massing/attempt=a` | `Building.wings` and `Building.massing` (with `stack`) of a stepped building — from M3a through the base outline builder, from M6a through stage 3's M5; T-V2-46 | §2.6 base outline builder (item 229); §4.7 S11 |
| `slotBand` — M10's band as one formula | exported function, `@plat/plots` | the template's `footprintM2` (or `claimShare × area(H)` where the template is claim-sized or the row carries `claimShare`; on a deck the deck row), the role table's shares, `buildingScale`, `sizeFactor`, the significance shift (V02 §3.2 step 3), the drift's `areaPct` | M3's budget test, ST0, ST8, M10 | §4.7 S11 |
| `drawTiers` — ST1 as a function of two streams | exported function, `@plat/plots` | `TierCells` at the band and the storey heights; two `Rng`s (`massing` 8 and 9; `siteplan.mutate` for a mutation; V04's ruin stream) | the `TierDraws` list `layTiers` reads | §6.1 |
| `TierFailure` | type | `layTiers` (ST3's exhausted stair fallback, ST6's checks) | `massStepped`'s M14 loop; the `tiers` op's bend; the mutator's degrade; V04's ruin stage | — |
| `TierCells.heights`; `CompositionRow.claimShare`; the constants `claimLo`, `claimHi` | table cells | `composition.json` (V02 §3.10.9) | `layTiers`' storey heights for a ruin's shrine (V04 passes them); `slotBand` | §7.6 |
| the stack migration row | migration rule | the document loader | `MassingRef.stack` re-derived from the wings of a stepped building that lacks it; then the `tiers` op, the why facts, the JSON export | §7.5 |
| the stair form `none` and `MassingRef.stack.grade` | persisted values | the bends of V02 §4.6; a skeleton file line; `drawTiers` (the grade) | ST3, ST5, ST6, `stairChain`, `landingSide`, the entrance hint; the `tiers` op's re-lay (the grade); V03's `W_TIER_UNREACHED`; exports | §2.6 `MassingRef.stack` (item 217) |
| the bends of V02 §4.2, V02 §4.3 and V02 §4.6 — `bend.tiers.stepped`, `.none`, `.axial`, `.internal`, `.count`, `.step`, `.form`, `.top`; `bend.tier.height`; `bend.stack.groundWing`, `.roof`, `.base`; `bend.deck.single`, `.floors`, `.basement`; `bend.building.remove`; `bend.row.plotLine`; `bend.wing.grow`; `bend.family.nearest`; `bend.room.passage`, `bend.room.host` | edit results, each with its one-line words | V02 §4.2, V02 §4.3, V02 §4.6; V03 §4.2 (`bend.deck.basement`: a cellar asked for on a deck over water goes to the nearest ground building of its plot group, else its block, else the nearest building on the ground) | V09 §4.9's catalogue, one row per id with its words and buttons; V10's clerk, which words each bend through V09's rows (V02 X22); the why provider (`massing/bend/<id>`) | item 101 R2; §7.1 |
| `rebaseStack` — the building-level datum pass | derived function, `@plat/plots`, built at M3a-V2 | the ground wings' `levelledGroundCm` samples (with item 231's wall-side reading) through its `ground` parameter, which each re-basing path builds from its document and the plot's arena key; the deck's surface; a kept user `baseCm` of a ground wing; the crypt lift and the half raise | every stacked wing's `baseCm`, every stair's `ridgeCm` and `stairSteep`, `Building.heights` (the envelope, `floors`) → §8.4's casters and caster ceiling, V05's clearance (V02 X20), V06's shade mask, the 3-D exports | §2.6 datum (item 370); §7.3 (a) 4; §7.4; the carry's rule (2) |
| the stack order under Works | derived rule in `heightsAt` | §4.11 step 8 (item 318): the stack's courses, `on`, `solid` | §8.4's casters at a stage, §11.1's 3-D export, V06's Works (V02 X23) | §4.11 |
| the pent band facets | roofscape rule | a pent wing's ring and the ring of the wing standing on it | §8.4's surface layer and casters; glTF, OBJ and CityJSON roofs | §8.6 (item 406) |
| a solid stack's entrance and plan root | base rule | §2.6 *Entrances* rule 5 (item 230); ST7's hint | V03's plan root at the first landing door (V02 X18); T-V2-45 | §2.6 |
| the sibling-disjointness check | invariant | ST6; item 333 in the carry check | the carry's halving; F-REDERIVE; T-V2-44 | §2.6 rule 4; §5.3 |
| chimney hosting on a stack | draw rule | V02 §3.7's decorative chimneys; the roofscape reading `Chimney.column` and `Chimney.levels` | §8.10's tile draw; V03's carried stacks | §8.10, §8.6 |
| the `tiers` op and its fields | edit op | T9's tier controls (V09, V02 X21); the clerk (V10, V02 X22); a skeleton file | the stack's re-lay; undo; the why facts | §7.1 (item 351) |
| `terrace.wallBandCm` and the wall-side sample | base rule, constant | §2.6 datum (item 231) with item 110 (a)'s `RetainingWall`; the constant's cell (V02 §3.10.9) | the ground wing's datum sample near a retaining wall — `deriveBase` and `rebaseStack` (1); V03's walk-out reads its own band, 2 × `cellar.insetCm` (V03 §3.7.1), never this constant | §2.6; item 110 (a) |
| `levelledGroundCm(doc, key, p)` — §4.7's levelled-ground reader (item 309) | base reader, consumed here | S10 and S11's levelling (item 110 (a)'s platform datum of a levelled plot, block or ward), else S1's raster with the T2 terrain strokes | `deriveBase` and `rebaseStack`'s ground wings (items 370, 231; V02 §3.15.2 (1)), and through them the dig floor (V02 §3.14.5 (a)); the basement gate's fall (§2.6's skirt facts); the raised crypt's lowest sample (V02 §3.14.5 (d)); T-V2-51 (c) | §2.6 *Heights and the ground datum*, *Basements*; §4.7 S10–S11 (item 309) |
| `deckOk` per use (the crypt binding) | placement constraint | V11's `deckOk` (V02 X16); V04's crypt records | S10b's placement; T6's landward bend; the mutator's relocation (§10.3) | §4.7 S10b |
| the family `ovalCourt` (`massOval`, `@plat/plots`), the `arena` family row, `caveaM` | family, function, table row and cell | `composition.json`; the base outline builder from M3a (item 229) and M5 from M6a call `massOval` | M3–M13; the roofscape; V03's plan of the outer ring; V12's fixture bars (V02 X25); V11's arena plot (V02 X27); V01's hood-pin sites (V01 §3.8.2 step 1: no pin on the arena floor, the `court` yard part of item 303's hole sentence) | §7.6; §4.7 S11 |
| `vaultClamp` and its constant `vaultClampCm` | clamp, constant | `composition.json`'s constants; V04's chamber ceiling (V02 X29) | M11 on the underground layer | II.7.6 |
| `DeckContext` (with `landmark`) | input field (declared at §2.6) | S11, from the deck-plot record (`Plot.deck`, its `landmark` flag; item 246) | M1's chain and `@deck` suffix; M10's deck band or the landmark's own rows; M11's storey cap; `deriveBase`'s deck datum (item 370); the basement gate (item 305); the dig floor (V02 §3.14.5) | §2.6 `BuildingInput.deck` (item 305); §4.7 S11 |
| `BaseWing.on`, `BaseWing.solid` | persisted fields | `layTiers` through the massing (ST7), the `tiers` op, the mutator's stepped rows | `deriveBase`'s stacking (item 370), `storeyRange`, the capacity (item 371), the roofscape's occlusion and order, the casters, the carry check (item 333), exports, V03's plans of tiers (V02 X18), V01's `hatched` stack order by `on` depth and tier shadows (V01 §5.1.3; V02 X24) | §2.6 `BaseWing` (item 227) |
| the roles `tier`, `shrine`, `stair`; the family `stepped` | enum members | the massing | `WingRoleRow`, the roofscape, `building.wingRole` labels, exports, the why provider | §2.6 `WingRole`, `MassingFamilyId` (items 216, 221) |
| `MassingRef.stack` | persisted field | ST7, the `tiers` op, the mutator | the `tiers` op's re-lay, the why provider, the JSON export, the report | §2.6 `MassingRef` (item 217) |
| `CompositionRow.tiers` (`TierCells`) and the rows `stepped-temple`, `terraced-palace`, `tiered-tower`, `stepped-monument` | table cells and rows | `composition.json`, reached by name from V11's specialisations (V02 X17) and by V04 (V02 X19) | `layTiers` (ST1–ST8), M3's stepped test, the load checks (V02 §3.15.4) | §7.6; §10.2 `DesignationTemplateRow.composition` (item 426) |
| `storeyRange`, `deckLevel`, `stairChain`, `landingSide` | derived functions, `@plat/plots`, built at M3a-V2 | the wings with `on` and `solid` | the capacity and `Storey.wings` (item 371), `deriveBase` (item 370), V03's levels and landing doors (V02 X18), V03's eager facts at M3a — `ground(b)` and `floorCm` (V03 §3.3), `basementDoor(b)` and `stackAccessDoor(b, a)` (`stairChain`: the stair wings, stair 0 and its approach strip; V03 §3.7.1, V03 §3.7.2 (1)) — and through them V01's entrance reserve; T-V2-44, T-V2-45 | §2.6 capacity, `Storey` |
| stair 0's **approach strip** | derived region, never stored (V02 §4.6 (4)) | `stairChain`'s stair 0 with its ring and `RoofSpec.high`; the main entrance under `internal`; the constant `landingM` | V02 §4.6's ground-wing placement (`addRange`, `addTower`, `backRange`); V03's `basementDoor(b)` rule 2 and `stackAccessDoor(b, a)` (V03 §3.7.1, V03 §3.7.2 (1)) | §2.6 `Building` (the stack's wings) |
| the stack's heights envelope | derived rule in M11 | the stacked wings' heights | `Building.heights` → §8.4's caster ceiling, V05's clearance (V02 X20), exports | §2.6 *Heights* |
| the deck budget (read) | table contract | V11's table `deck` by deck kind × band (V02 X16), registered from C0 (V11 §2.1's empty-table rule): no deck plot exists without its row (V02 §3.16 (3)) | M10 and M11 on a deck plot; `bend.deck.floors` (V02 §4.6 (5)); the why provider | §10.2 (V11) |
| the `@deck` rows | table rows | `composition.json` | M1 and M5–M12 on a deck plot | §7.6 |
| the paint program `stairFlight`; the roofscape's stack order | style program, draw rule | the roofscape; `stairTreads` | the tile rasteriser, the SVG writer | §8.2 (item 406), §8.6 (item 419) |
| constants `tierMinSideM`, `landingM`, `stairClearM`, `stairGradeMax`, `pentShare`, `riserMaxCm`, `ovalSides`, `ovalAxisRatio`, `ovalMajorFactor` | table cells | `composition.json`'s constants row (V02 §3.10.9) | `layTiers`, `massStepped`, `massOval`, the roofscape, `stairTreads`, the exports, stair 0's approach strip (`landingM`) | §7.6 |
| `stairTreads(w)` — the one tread law of a stair wing (J-V2.90) | derived function, `@plat/plots` | a stair wing's `ridgeCm` (its rise, kept true by `rebaseStack`), its ring and `RoofSpec.high` (its run); `riserMaxCm` | `stairFlight`'s tread lines (V02 §5.6), the glTF, OBJ and CityJSON stair solids, the per-wing constructions' treads (item 419), V01's stair-flight hatch (V01 §5.1.2), V03's exterior flights (V03 §5.1) | §8.2, §8.6 (items 406, 419); §11.1 |
| `cryptSeedWings(b)` (J-V2.92) | derived function, `@plat/plots` | `BaseWing.partName` (item 234), a stack's tier 0, the wings' roles, rings and ridges | §2.6's basement function (item 238's crypt ring; item 226's lift and half raise act on the wings over the basement's ring); V03's crypt placement (V03 §3.7.4 step 1); T-V2-36, T-V2-53 | §2.6 *Basements* (items 226, 238) |
| the half cellar's raise (J-V2.91) | base rule, a datum term | §2.6's terrain gate choosing `half`; `cellar.depthCm`; for a crypt-only basement the wings over the crypt's ring (V03 §3.7.4) | `deriveBase` and `rebaseStack` (1) on every re-basing path → those wings' `Heights.baseCm`; the basement floor at the datum less half the depth; the dig floor (V02 §3.14.5 (a)); V03's storey datum and its half cellar's light windows (V03 §3.3, W2); T-V2-52 | §2.6 *Heights and the ground datum*, *Basements* (item 226) |
| `BaseWing.partName` | persisted field | the base outline builder's templates, passed through by M0 (d), kept by every V02 wing writer (V02 §2.1) | M8 (e)'s crossing tower; `cryptSeedWings`; V03's A5 (e) room placement; the why provider | §2.6 `BaseWing` (item 234) |
| the family rows `burial-ground`, `fort`, `arena` and the role rows `charnelHouse`, `lychgate` (J-V2.88) | table rows | `composition.json`; V11 §3.6.1's 35 template families and their structure names | M1's chain for the classes `cemetery`, `fort` and `arena` and their structures; `roleKeys`; M8b's absorbed arena gates; T-V2-33 | §7.6; §10.2 |
| the stepped specialisation a bend to `stepped` writes (J-V2.94) | edit side effect | V02 §4.6 (1)'s bend and `setMassing { family: 'stepped' }`; V11 §3.24.3's rows for the use's culture and class | the use's `siting.declared` `use:` row cell `specialisation` (V11 §4.2) → `Use.specialisation` → V11's composition and heights replacement, V03's plan rows (`for.use`), V10's why | §7.6 (V11 §4.2's document-only table); §7.1 `EditBase.group` |

**The dossier facts that reach a building's shape** (item 20 (h): the dossier says what exists; its shape is the map's
construction). Every record here has the fact tier `derived` (§2.8's `factTier`), or `declared` where an edit set it.
Each dossier fact that shapes the massing, with its field, its derivation row (§7.7) and the V08 and V11 rows that carry
it:

| dossier fact (SettlementForge field) | derivation row | carried by | reaches the massing as | read by |
|---|---|---|---|---|
| an institution's kind and tier (`institutions[].kind`) | DR24 (the class); DR9 (a ladder's members and SIZE step) | V08's kinds map → V11 §3.11; item 108's `LadderStepRow` | the class (for a ladder the member class or the SIZE factor) | V02 §3.2 step 1; M10 |
| a custom institution's scene archetype (`custom.sceneProfileId`) | DR24 (item 104 (a) (2)) | V11 §3.13.2's archetype row | the class | V02 §3.2 step 1 |
| its `category` and `tags` | DR24 (item 104 (a) (3)–(4)) → the siting profile | V11 §3.13 | nothing in the massing except `emits.smoke` and `needs.runningWater` (V02 §3.14.6) | M2's axis; §8.10's stacks |
| its `landmarkLevel` | DR24 (item 104 (a) (7)) → `landmark` | V11 §3.13's landmark factor on σ | the significance shift | V02 §3.2 step 3; M10 |
| its `economicWeight` (an optional library field) | DR24 (item 104 (a) (5)) | V11 §3.13's `economicWeight` factor on σ | the significance shift | V02 §3.2 step 3; M10 |
| its `materialFamily` | DR15 (materials) | the material row (V11 §3.19) | texture and colour only — never the massing | §8.2 |
| a split class's institution (with `activeChains` feeding the supply web) | DR10 (S10b's split placement; item 105 (h)) | V11 §2.3's `split.threshold` → `Use.branchOf` | the `split.works` and `split.shop` families | V02 §3.14.3 |
| a crypt record and the cathedral's existence | DR17 (a crypt record → its church's crypt); DR32 (the crypted churches) | V08's religious rows → V11's `crypt` column (item 436) → item 238 | the crypt seed wings and the raised crypt's lift | V02 §3.14.5 |
| a crypt record bound to a use that could stand on a deck (a bridge chapel's crypt) | DR17 with DR10 (the binding) | V11's `deckOk` per use (V02 X16) | never a deck plot: the use stands on land with its crypt | V02 §3.16 (6); S10b |
| households and bands (the population, `wealth.label`) | DR6 (the prosperity field and each plot's band), DR7 (households) | §7.7's derivation table | the manifested band (geometry) and the occupants' band (the composer's rooms) | V02 §3.2 step 3; V02 §3.8 |
| a worship, government or fortification institution whose culture builds in tiers — the dossier's `site.culture` only (no religion field builds in tiers — a deity is a temple's dedication — and the era is the constant `c14` on dossier maps) | DR15 (`site.culture` → the template-family row) | V11's specialisation rows `stepped_temple`, `terraced_palace`, `tiered_tower` with their chance and cap (V02 X17), which name the composition key | the `stepped` family through `DesignationTemplateRow.composition` | V02 §3.2 step 2; V02 §3.15 |
| a building on a deck plot — no dossier fact names a deck (the dossier's 'Bridge' and 'Wharf' landmark strings name features whose deck plots are map-side, V08) | none (map-side) | the base's deck plots (item 110 (d)); V11's `deckOk` column (V02 X16) | the `@deck` rows, the deck budget and datum | V02 §3.16 |

A dossier change reaches these facts by §7.7 item 11 (b): the map facts whose inputs it changed are re-derived inside
its disruption set by least-disruption mutation (§7.7 item 5; items 22, 75, 76), never a re-roll. At the building that
mutation is S11's designation mutator with V02 §3.9's wing step — keep what fits, add, subtract, adapt — for a changed
class, ladder step, custom record, significance or specialisation; a changed `materialFamily` reaches the material row
only (never the massing, T-V2-25); a changed crypt record re-derives the basement (§2.6) and with it the lift (V02
§3.14.5).
=== END ===

=== REPLACE ### 1c The base hooks consumed (by section) ===
### 1c The base hooks consumed (by section)

| base section | what this volume uses | how |
|---|---|---|
| §2.6 `BuildingGenerator` (`outline` / `compose` / `plan`) | the three-call split, `BuildingInput`, `KernelResult` | the massing implements `outline()`, the composer `compose()`; `plan()` is V03's |
| §2.6 `BaseWing`, `Building.wings`, the kinds `rect` / `quad` / `polygon`, `corners`, `ridgeAxis`, `spans` | the massing's output record | ranges and blocks are `rect` (butt joints) or `quad` (mitre joints); towers are `polygon`; a row keeps its `quad` |
| §2.6 the wing-carrying rule (`carryWings`, rules 1–5, J-P47–J-P49) | every wing and every stored composition point follows its footprint | unchanged; the massing establishes rule 1 at S11's first carry; the pairing tier (ii) covers every tiled massing, tier (iii) a massing with towers (V02 §3.5) |
| §2.6 *Heights* and `deriveBase`; *Materials*; *Entrances* (`deriveEntrances`, rules 1 and 5); *Basements*; the stage-3 contract and intake | heights per wing, the ground datum, texture-only materials, the entrance set the porch and the gate hall anchor on, the union contract, the intake fallback | as stated there, with items 223 (towers in the union, per-class admission), 224 (the entrance hint), 228 (a forecourt `U`'s door kept where it already lies free) and 230 (a solid stack's entrance at its stair's foot, the plan rooted at the first landing door) |
| §2.6 `Composition`, `Wing`, `ComposedTower`, `Porch`, `Room` | the lazy rungs' records | with items 218–220 (a composed wing and tower name their base wing; dormer rows; porch kinds) |
| §2.6 `PathShapeRow` (item 59) | Fantasy Manor's five layout families | five rows of `MassingFamilyRow` (V02 §2.3) under our own ids (item 221, with its table-migration row) |
| §2.6 *Basements* (items 238, 226); II.7.3; item 109 (j), (k) | the basement decision, the crypt column, the dig draw | the crypt seed wings and the raised crypt's lift; the dig floor and the W6 trigger (V02 §3.14.5) |
| §2.6 `interface Basement`, the terrain gate, §5.3's basement row, §7.4's warp check, §10.2 `cellar`, §13.2's T29-4, J-A29.25 (item 371) | the basement's place and its `external` access | inside the ground wings; `external` for a walk-out or where no ground wing is storeyed; the plan rung's step 3 and T28-3 are V03's (item 578) |
| §4.5 (1) significance; §7.7's `Intent.latitudeDeg` (DR29 on a dossier map; absent 50) — the latitude item 102's model sampler reads (§4.5), never the style's `SunSpec.latitudeDeg` | σ; the settlement's latitude | the significance shift (V02 §3.2 step 3); the sunlit choice (M5) |
| V10 §3.9 `WhyProvider` (item 270) | the oracle's per-kind explainer | V02 §4.5's provider for `building` |
| §7.8 the control registry | control rows | `fantasyShapes` (item 402) |
| §2.5 `SlotPlan.hint`, `BuildingSlot`, `ContextVector`, `PlotBound`, `YardPart`, `Passage`, `Plot.builtBand` / `fieldBand` | the region the massing may occupy, its frontage, its band | read at S11; the manifested band for geometry columns, the field band never (item 31) |
| §2.8 `ElaborationRecord`; §2.9 `ElaborationChunk` | the `wings` and `rooms` rungs' state and cache | the rungs' recorded inputs gain the composition slices (item 261) |
| §3.2–§3.4, §3.6–§3.8, §3.10 | the lattice, `minEdge` and `attractCm` (§2.2 `LatticeSpec`, §3.2), `lir(ring, axes)`, `obb`, booleans on the arrangement, the near-rectangle test, the straight skeleton | the massing's snap and validation (V02 §3.5); the roofscape's facet construction (V02 §5.2) |
| §4.1 the laziness contract and the elaboration trigger policy | massing eager (S11), composition lazy | unchanged; the `rooms` rung derives with the plan only (V02 §3.8) |
| §4.7 S11 — designation template, arrangements, front-line jitter, first carry, households fill, designation mutator, informal clusters, class mix | the class, the band, the slot, the structures, the mutation steps | the massing is S11's `outline()` for every arrangement; the mutator's wing step is V02 §3.9 |
| §4.7 S10–S11's levelling (item 110 (a)) and its reader `levelledGroundCm` (item 309) | the platform datums of levelled plots, blocks and wards | every ground sample of the datum, the basement gate and the raised crypt (items 370, 231) |
| §5.1–§5.3 | bounded ladders, no whole-map retry, the invariant suite | F-MASSING and F-COMPOSE (item 328), invariants (item 332) |
| §6.1 streams and the concern registry; §6.3 anchors | the composition's own concerns, appended when stage 3 registers them | `massing`, `compose.dormers`, `compose.porch`, `compose.rooms` (item 341); wing anchors (item 346) |
| §7.1 events, T9 `shape`, `regenerate` with `rung`; §7.2–§7.5 | edits of massing and composition | `setMassing` and `setComposition` (V02 §4; item 351) |
| §7.6 tables, `extension`, per-preset values | the composition tables and the parity presets | `composition.json`; the `FM` building-scope preset (item 376), resolving `composition.json`'s and V11 §3.24.0's `presets.FM` cells |
| §8.1, §8.2 (`roofConstruction`, `states`, roof tint by band), §8.4 (surface layer, casters), §8.5 (bands, change markers), §8.6 (stage-3 LOD, roof construction), §8.10 (roof detail) | the drawing | the construction `roofscape` (item 406); dormers, porches, tower roofs and stair flights as paint programs (V02 §5) |
| §4.9 `ClimateTable` (`ClimateRow.roof`, typed by V11 §2.8) | the climate's roof form and pitch | M11's one pitch rule and M12's flat roofs (V02 §3.5) |
| §10.2 `DesignationTemplateRow`, `BuildingClassRow.templateFamily`, `HeightsRow` (items 432, 435) | the per-band template, its family and heights | the `composition` column on the row and each structure (item 426); the resolution chain reads `templateFamily`; three heights columns (item 427) |
| §11.1 exports | JSON, SVG, glTF, OBJ, CityJSON, GeoJSON, VTT | V02 §5.5 |
| §12.4, §12.5, §12.7, §12.8 | S11's row, the first-map laws, the stage-3 bullet, the elaboration cache | V02 §6 |
| §13.2, §13.3, §13.5, §13.6 | bars, declared shifts, parity rows, the owner's panel | V02 §7 |
| §14, §15.1, §16 | packages, the parity matrix, the build plan | `@plat/buildings` (item 505); Fantasy Manor rows (item 522); milestones M6 and M3a-V2 (items 524, 525, 568) |
| §2.6 the base outline builder, `deriveBase`, the capacity function, `Storey.wings`, `BuildingInput` (items 227, 229, 305, 370, 371) | where the tier construction and the deck buildings plug in before stage 3; the stacked and deck datums; the storeys a stacked wing reaches; no cellar on a deck | V02 §3.15–V02 §3.16 |
| §2.7 `Bridge.deckCm`; §4.8 the piers', moles' and quays' deck heights; the deck plots (item 246) | the deck's surface and its plots | read through `DeckContext` (V02 §3.16) |
| §8.4 the casters (a prism from `baseCm`) and the caster ceiling; §8.6 the per-wing constructions (item 419) | one shadow per tier; the stack's order in every construction | V02 §5.6 |
| item 110 (a)–(f) (file g) | stepped massing, deck buildings, the building side of retaining walls, raised ways and the second fixture | V02 §3.15–V02 §3.17 |
| §2.6 *Heights and the ground datum*; §7.3 (a) 4; §7.4's warp and `moveVertex`; the wing-carrying rule's rule (2) | every path that re-bases a wing | one building-level pass, `rebaseStack`, for a building with a stacked wing (item 370); the wall-side sample (item 231) |
| §4.11 step 8 `heightsAt` | a building's heights at a Works stage | a stack rises in stack order, solid wings in courses (item 318) |
| item 101 R2 (`docs/AMENDMENTS-2026-09-27e.md`) | refusals only for what item 20 forbids (dossier facts) and what a lock protects | every structural limit of V02's edits is a named bend (V02 §4.2, V02 §4.3, V02 §4.6; J-V2.79) |
| §4.7 S10b *Class mix* (3) and S11 *Footprints and heights*; §10.2 *Grandeur ceiling* (item 115, file g) | the rung's `grandeur.ceiling` row (V11 §3.25.4) and its `settings.grandClasses`; S10b's manor count | the rung ceiling on a dwelling's resolved row (V02 §3.2 step 2) |
| §12.1 *Targets and the comfort level*; §12.10's R12-31 – R12-34 (item 119, file g) | the ten-second comfort level, the progress rule, the measured-gain rule, the interaction budgets | V02 §6's targets and waits (V02 §6, V02 §6.4) |
| §2.7 `ConditionOverlay` and its reader rule; §2.9's `week`, `crises` and `knowledge` keys; §7.7's DR44; §10.2's crisis look table (`RosterTables.crisis`: the `disaster` row's `lookLevel`, `previewSeverity`); §8.2's crisis look rows; §11's exports (item 122, file g) | the disaster looks drawn in the view, their admission and their level; the marks round the buildings | the ruined look of a disaster's buildings (V02 §5.7) |
| §2.6 step 7; §6.3's concern `plan.damage`; §8.6's damaged plan; §11.1's battle maps (item 123, file g) | the plan in force under its damage layer, one keyed threshold per element; the battle maps following the damage | the exterior's damage (V02 §5.7): the plan's own elements, never a threshold of V02's |
| §8.2's `states` rows (`abandoned`, `decayed`, `ruined`, `charred`, the Works `decaying`), the `charred` program, the wall `breached` row's rubble spill and the `condition` row's patched-courses roof `pattern`; §8.8's tile key | the drawn decline states and the marks and values the exterior's damage reuses | V02 §5.7 (no cell of its own) |
| §12.5 (the crisis looks drawn lazily per visible tile) | the look's per-tile cost | V02 §6.6 |
| §8.1's display list (S14; the `group` of delivery and invalidation; item 4's commit delta, item 6's transient lists, item 7's week re-emission) and §8.9's worker boundary | the path of the exterior's damage from the generation worker, where its inputs live, to the tile rasteriser and the export writers | V02 §5.7 (8) |
=== END ===

=== REPLACE ### 2.4 Derived at read (never stored) ===
### 2.4 Derived at read (never stored)

```ts
type RoofEnd = 'gable' | 'hip' | 'party' | 'mitre' | 'valley' | 'wall' | 'open';   // V02 §5.2: resolved per wing end from the joints and heights
interface RoofFacet { wing: number /* wing key, or a tower's */; ring: PointCm[]; z: number[] /* cm above the building's lowest base, per vertex */; normal: [number, number, number]; part: 'roof' | 'dormer' | 'porch' | 'tower' | 'cupola' }
declare function roofscape(b: Building, c?: Composition): RoofFacet[];           // V02 §5.2: planar, non-overlapping, covering the footprint (and a porch outside it)
declare function resolveEnds(b: Building): Map<number /* wing key */, [RoofEnd, RoofEnd]>;
declare function facadeBays(w: BaseWing, side: number /* any ring side; an eave side is the ring side of eave 0 or 1 (below) */, bayM: number): { atCm: Cm; widthCm: Cm }[];   // V02 §3.7: every ring side; integer centimetres only (its valley reaches by valleyReach's 'int' mode, never read from the float roofscape); implemented in @plat/plots beside massStepped, stairTreads and cryptSeedWings, re-exported by @plat/buildings (item 505)
declare function valleyReach(x: BaseWing, y: BaseWing, mode: 'int' | 'float'): number;   // V02 §3.7: the plan reach of the valley where x's ridge meets y's roof; 'int' for facadeBays (cm, byte-identical), 'float' for the roofscape (float64, view data)
declare function dormerPositions(w: BaseWing, row: DormerRow, obstacles: Polygon[]): { atCm: Cm }[];
declare function cryptSeedWings(b: Building): number[];   // V02 §3.14.5 (c): the wing keys whose ground storeys seed a crypt's ring; exported by @plat/plots beside massStepped; called by §2.6's basement function (items 238, 226)
```

**Eave sides.** A wing's two eave sides are the ring sides parallel to its ridge: for `ridgeAxis 0` (the ridge joins
the midpoints of sides 1 and 3) sides 2 and 4, for `ridgeAxis 1` sides 1 and 3; `eave: 0` is the one that comes first in
ring order. A `polygon` wing has no eave sides (no dormers).

**The exterior's damage (items 123 (d), 122; V02 §5.7).**

```ts
interface ExteriorDamage {                 // what V02 §5.7 draws of item 123's damage and of a disaster's ruined look; derived at read, never stored
  level: number;                           // the higher of V06's decayLevel at §2.9's week and the drawn disaster look's level (§10.2's
                                           // `disaster` row's lookLevel at its severity); 0 with neither
  look: { condition: Id | null /* null: a preview (§2.9's crises) */;
          pattern: 'fire' | 'flood' | 'scatter' /* V01's DisasterSource.pattern (V01 §3.16 (2)); 'scatter' with no calamity, a preview's included */ } | null;
  reading: 'none' | 'massing' | 'element'; // 'none': nothing to draw (level 0, nothing repaired); 'element' where the building's plan is current or
                                          // stored (V03); else 'massing'
  holes: { wing: number; ring: PointCm[] }[];          // 'element': each damaged roof bay over a room — the room's ring and its wing's key (a tower
                                                       // room's, its tower's); the drawing clips the ring to that wing's facets (V02 §5.7 (2), (8))
  gaps: { wing: number; span: [PointCm, PointCm] }[];  // 'element': each broken outer wall run of a wing's lowest storey, as its span on that wing's outline
  patched: { wing: number; ring: PointCm[] }[];        // 'element': each repaired roof bay over a room, as `holes` (item 114's patch material; V06's
                                                       // per-element decayPeak, read through V03 §5.6 (2) (b))
}
declare function exteriorDamage(doc: Document, b: Building, view: ViewState, opts: ViewOpts): ExteriorDamage;   // reads §2.9's week, crises and knowledge keys from view, opts.viewAs lowering the key (§9.2); runs in the generation worker (V02 §5.7 (8))
```

**Its path to the drawing** (V02 §5.7 (8)): it runs in the generation worker, where its inputs live; its result reaches
the tile worker as the building's damage marks in a `DisplayDelta` (§8.1, §8.9), re-emitted for exactly the buildings
whose marks change; the tile worker clips their rings against the roofscape it memoises (V02 §6.3).
=== END ===

=== REPLACE ### 2.5 Identity and lifecycle of every state field ===
### 2.5 Identity and lifecycle of every state field

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `BaseWing.role` | the massing at S11; the mutator's add step; `setMassing` (`addRange`, `addTower`, `addBlock`, `backRange`) | composer, mutator, roofscape, exports, anchors | leaf digest | Regenerate (keep) re-derives the same; New random on the plot re-draws it with the plot's reroll (§6.1) | the event's undo record keeps the former wings | the base carries it from M1 (item 216): the base outline builder writes `main`, `range` or `part`; for a document without it, the **fallback migration row** below |
| `BaseWing.key`, `Building.nextWingKey` | as `role`; a new key is `nextWingKey`, which then advances | as `role`; edit paths | leaf digest | as `role` — generation keys 0 … n − 1 in wing order (V02 §3.5 M13) | restored with the wings; `nextWingKey` restored to its former value | as `role` |
| `Building.massing` | S11 (the massing); `setMassing` `family`; the mutator (`family` and `row` of the target) | mutator, `deriveEntrances`, exports, reader | leaf digest | as above | restored | an older document keeps its value; one from before stage 3 has none and reads as `baseOutline` until an `upgrade` re-derives S11 (§7.5; a declared shift, §13.3); a `row` without the ceiling's `~<RUNG>` reads uncapped (V02 §3.2 step 2) |
| `MassingRef.segments`, `.low`, `.cupola` | M5 (`segments`, `low`), M12 (`cupola`); every `setMassing` op and the mutator rewrite them | the parity harness, the report, the why provider (`segments`); V03's byre end (`low`); the roofscape, the paint programs and the exports (`cupola`) | leaf digest | re-derived with the massing (the same draws) | restored with `Building.massing` | a `MassingRef` without them reads `segments` = the range-role wing count with each block's pieces re-joined, `low` absent, `cupola` absent until an `upgrade` re-derives S11 |
| the crypt lift (the ground-storey `baseCm` of the ground wings over the basement's ring, raised form; V02 §3.14.5) and **the half cellar's raise** (the ground wings over a `half` basement's ring, `cellar.depthCm ÷ 2`; a basement that is only a crypt, the wings over the crypt's ring; item 226) | M11, when §2.6's basement function takes the crypt ladder's `raised` form; the basement step when the gate chooses `half` (the gate reading the datum without the raise) | `deriveBase`'s successors, the heights, the plan's floor levels (V03's choir stairs, V03 §3.3's datum), the dig floor, the roofscape, the casters | leaf digest (it is those wings' `Heights.baseCm`) | re-derived with the basement after a `setMassing`, a designation mutation or a terrain change; kept by `deriveBase` and `rebaseStack` (1) on every re-basing path while the basement stays `half` (T-V2-52) | restored with the wings | a document without it re-derives the basement on load for an `always`-crypt building (V03's migrate row, item 238); a document whose half basements lack the raise gains it at its next `upgrade` — the one-time shift of J-V2.91, reported |
| `BaseWing.partName` (item 234) | the base outline builder's templates; passed through by M0 (d) | M8 (e), `cryptSeedWings`, V03 (A5 (e)), the why provider | leaf digest | kept on the wing that keeps its key by every V02 writer (V02 §2.1; a re-joined block keeps the lowest key's); absent on a wing V02 adds | restored with the wings | V03's row (V03 §2.5) |
| `RoofSpec.kind 'shed'`, `RoofSpec.high` | massing M12; `setAttr` | roofscape, exports | leaf digest | as above | restored | none before stage 3 |
| `BaseWing.arcade` | M11 (the row's `arcade`); `setAttr(wings/<key>/arcade)` | the drawing, the exports, the capacity function | leaf digest | re-derived with the massing | restored | absent before stage 3 (no arcade) |
| `Composition.secondaryPorch` | the composer (V02 §3.7); `setComposition` `porch` with `entrance` | roofscape, drawing, exports | lazy; stored with the composition | as the porch | restored | by the entrance ordinal; an entrance that no longer exists orphans it (§7.3 item 4), reported |
| `Composition.row`, `.grammar` | the composer | the elaboration record's slices; migration | lazy; stored with the composition when an edit stores it | a stale rung re-derives from committed state (V02 §3.11) | restored with the composition | a stored composition whose `grammar` is older keeps its stored fields; its unstored parts re-derive under the new grammar at the next click |
| `Wing.base` | the composer (1:1 with non-tower base wings) | roofscape, plan rung, exports | lazy / stored | re-derived; a stored one is re-matched by key when the wings change (V02 §3.9) | restored | a key that no longer exists orphans the composed wing (§7.3 item 4), reported |
| `Wing.dormerRows`, `DormerRow.edited` | the composer; `setComposition` `dormers` (sets `edited`) | roofscape, the plan rung, exports | lazy; stored (the first `setComposition` stores the composition, V02 §4) | an unedited row re-derives on the wing's own stream; an edited row is kept while its eave's length stays within ± `dormerEaveTol`, else orphaned and reported | the undo record keeps the former row | by the wing's key |
| `Porch.kind` | the composer; `setComposition` `porch` | roofscape, drawing, exports | lazy / stored | as dormer rows; side and offset re-read from the main entrance after every carry (the base's rule 3) | restored | — |
| `ComposedTower.base` | the composer (one per tower or turret wing) | plan rung (round wings), roofscape | lazy / stored | follows the tower wing | restored | by key |
| `Composition` as a whole | the `wings` rung (and `rooms` with the plan) | §8.6, the plan rung | the elaboration cache (non-canonical, §2.9); model data once stored | stale → re-derived at the next click (V02 §3.11) | an edit's undo restores the former composition, or removes it when that edit stored it (J-P48 (5)) | §7.5's orphan rule for stored parts |
| the exterior's damage and the ruined look (`ExteriorDamage`, V02 §5.7) | derived at read in the generation worker for each building of a band S14 builds — a full build, a band request, a picture export's transient list — from V06's level, the plan in force and the looks drawn in the view, and again on V02 §5.7 (8)'s changes | its damage marks: the tile rasteriser, the SVG and PNG writers; T-V2-59, T-V2-60 | never stored: no digest, no snapshot field, no cache chunk of its own (the clipped rings memoised beside the roofscape in the tile worker, V02 §6.6; the marks' `revision` kept by the generation worker, 4 B a building) | re-derived with the commit's delta (V02 §5.7 (8)); a Regenerate or New random changes it only through its inputs | — (an undo changes its inputs, never it; its marks re-emitted with the undo's delta) | none |

**The fallback migration row** (a document whose buildings carry no stage-3 fields — from before item 216 reached M1):
each wing's `key` = its index in `Building.wings`; its `role` by the base outline builder's rule — `main` for the first
rectangle (the bar of an L or T) or a row quad, `range` for the other rectangles, `part` for a template or axis-locked
part; `nextWingKey` = the wing count; `massing` absent (read as `baseOutline` with `segments` 1 until an `upgrade`
re-derives S11, a declared shift, §13.3); footprints, heights and roofs unchanged; the canonical order (V02 §2.1) then
holds because the base builder lays no tower. The index-named fields of item 225 need no rewrite: key = index.

**Identity.** A base wing's address is its building's with its key — the sub-record address `('wing', building, key)` —
and it is matched after a re-derivation by §6.3's wing anchor row (item 346). A composed wing, its dormer rows and a composed tower are addressed through the base wing key
they name; the porch by the building; the composer's rooms by the base's `room:<building>/<level>/<i>` (§2.6, §6.3).
No record here stores a stream key or a seed (the base's §2.4).
=== END ===

=== REPLACE ### 3.1 Where stage 3 runs ===
### 3.1 Where stage 3 runs

| step | when | where | eager / lazy | output | stream |
|---|---|---|---|---|---|
| the **massing** (`outline()`) | S11, once per building, inside the block's batch (§4.7 S11), and inside every operator that re-derives S11 on a plot — Regenerate, New random, a designation mutation's add step (V02 §3.9), `build`, `fill`, a terrain or water operator's re-fit (§7.3) | the derivation pool (or the generation worker), `@plat/buildings` | **eager** — model data | `Building.wings` with roles and keys, `Building.massing`, `nextWingKey`; then S11's base steps (insertion and first carry, `deriveBase`, `deriveEntrances`, the basement decision, the yard partition, the households fill) | `massing` (V02 §3.12) |
| a **`setMassing` commit** (V02 §4.2) | the event's fold | where the event folds | eager | the edited wings as S11's fixed input, then S11's base steps as above | none for the geometric ops; the `family` op on `siteplan.mutate` (V02 §3.12) |
| the **composer** (`compose(…, 'wings')`) | the `wings` rung: a neighbourhood click (II.4), a building click when `wings` is absent or stale, a visible tile **at the neighbourhood band or finer** under `elaborate: 'view'` (§4.1; the district band draws the massing's roofscape, which needs no composition, and requests nothing — V02 §6.2), an export that asks for compositions (V02 §5.5) | the derivation pool | **lazy** — the elaboration cache until an edit stores it | `Composition` with composed wings, towers, dormer rows, the porch | `compose.dormers`, `compose.porch` |
| the **rooms** rung (`compose(…, 'rooms')`) | only as the plan rung's input, on the building click that derives the plan (J-V2.9) | the derivation pool | lazy | `Composition.rooms`: hall, gate hall, chapel, tower rooms | `compose.rooms` |
| the **roofscape** | every draw of a building at the district band and finer; the surface layer; 3-D exports | the tile worker (drawing), the generation worker (exports) | derived at read | `RoofFacet[]` | none (no draws) |
| the **exterior's damage** (`exteriorDamage`, V02 §5.7) | every band S14 builds at the district band and finer — a full build, a band request, a picture export's transient list — and V02 §5.7 (8)'s re-emissions | the generation worker (S14) | derived at read — view data | the building's damage marks (V02 §5.7 (8)) | none (its thresholds keyed, §6.3; its rubble on the render key, §8.10) |
| the **wing step of the designation mutator** | every designation change (§4.7 S11 steps 1–7) | where the causing event folds | eager | the recorded wing steps | `siteplan.mutate` (the base's) |

**Registration.** `@plat/buildings` registers `ComposedBuildingGenerator` under the id `composed` in
`StrategyRegistry.building` (§14); from stage 3's landing the recipe's building strategy defaults to `composed` for new
documents, and a document keeps the strategy its recipe names (§7.5). The generator's `plan()` delegates to the
registered plan implementation (V03). **Under the `MFCG` and `FTG` parity presets the massing takes the family
`baseOutline` for every class** — the one option cell `massing.composed` (`extension: { over: 'both', mode: 'option' }`,
on by default) is off there — so the parity presets keep the base outline builder's footprints byte for byte (T-V2-26)
and §13.5's MFCG and FTG rows are unaffected.
=== END ===

=== REPLACE ### 3.18 Edges — every mechanism at its limits (principle (11)) ===
### 3.18 Edges — every mechanism at its limits (principle (11))

Every mechanism of V02 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home.

**(a) Degenerate geometry.** Every geometry stage 3 commits — the massing, a mutation's lay, a `setMassing` commit, a
stack's lay — passes M13's snap and validation (V02 §3.5: an edge below `minEdge` merged, every ring simple and
counter-clockwise, every wing at least 4 m² with every side at least `minEdge`) and commits through S11's kernel
transaction, so a zero-length, zero-area, self-touching, collinear or coincident ring is never committed: at generation
it is an M14 attempt and ends at worst at rung 3, the base rectangle the base guarantees (V02 §3.13); in an edit it is
bent to the least lawful size (`bend.wing.grow`, V02 §4.2 step 2). A degenerate slot hint (zero area, or narrower than
every family's least lengths) reaches rung 3 at once, and below it the base's F-SITEPLAN ladder (§2.6). The composer's
products (dormer rows, porches, rooms) that would be degenerate are dropped or shortened by F-COMPOSE's rungs (V02
§3.13); the view's derivations (the roofscape, `stairFlight`, the exports) skip a zero-area facet or a zero-length line
and never fail a tile or an export. Tests: T-V2-9, T-V2-17, T-V2-56.

**(b) Rungs.** Stage 3 runs at every rung; only its inputs differ:

| rung | stage 3 |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | V07's `v.` classes compose by `composition.classFamily` (V02 §3.10.5); a town class plays its `villageForm`'s `v.` class (V02 §3.2); no stepped building unless V11 §3.24.3's culture × class specialisation applies to the `v.` class under V07's `rules.tiers.capPerSettlement` (X26); deck buildings on a village bridge by V02 §3.16; no raised way (the base's rung gate); every dwelling but a `grandClasses` building reads its row under the rung's grandeur ceiling — at most `single`, `L` or `T`, no tower, turret, gate tower or court — while a manor S10b admits and a building the dossier or the author makes grand keep their full rows (V02 §3.2 step 2; item 115); a disaster's ruined look falls on every building of V07's ends (V02 §5.7) |
| TOWN | stage 3 whole; raised ways only as declared (V02 §3.17 (b)); stepped buildings at V11's caps (≤ 0.1 % of buildings, V02 §6.5); the grandeur ceiling caps nothing (V02 §3.2 step 2) |
| CITY, METROPOLIS | stage 3 whole; generated raised ways; V02 §6.1's rung rows; the grandeur ceiling caps nothing |
| the population cap | V02 §6.1's cap row; nothing else changes |
| any rung, the `VG` preset | `sunBias` 0.5 (V02 §3.10.9's preset entries); the rest as the rung's row |

Tests: T-V2-29, T-V2-30, T-V2-33 (every class at every band), T-V2-55, T-V2-58, T-V2-60.

**(c) Toggles and presets.**

| toggle or preset | stage 3 |
|---|---|
| `MFCG`, `FTG` | `massing.composed` off: every class's family `baseOutline`, the base outline builder's footprints byte for byte (V02 §3.1; T-V2-26); `sunBias` 0.5 |
| `NG` | the `hatched` family's constructions; the NG parity sheet's roof construction by V01 §7's rule (X14); T-V2-32 |
| `FM` | the `FM` building look and its calibrated cells (V02 §3.10.8); T-V2-31 |
| `massing.composed` off (an edit of the option) | as under `MFCG` and `FTG`: every class's family `baseOutline` (V02 §3.1) |
| `fantasyShapes` off (the default) / on | the three fantasy families never drawn / drawn at their row weights (V02 §3.3; V02 §4.4's control) |
| item 110's rows off (the `item110.stepped` and `item110.deck` overlays) | byte-identical to the composer without them (T-V2-50) |
| the grandeur ceiling off (V11 §3.24.0's off form: every `grandeur.ceiling` row `enabled` false) | no row capped: every rung reads as TOWN does, byte-identical to stage 3 without item 115 (the `item115.off` pin, V12 §2.13) |
| `elaborate: 'view'` off | the `wings` rung only on a click (V02 §3.11) |
| the export option `compositions` | V02 §5.5 |
| Show crises (§2.9's `crises`): `follow` (the default) / `off` / `preview` | the disaster looks drawn in the view fall on their units' buildings / no look: each building's exterior by its own decay alone, as if no disaster look stood / the previewed `disaster` look at §10.2's `previewSeverity` on the units its preview strikes (V02 §5.7); item 123's damage is never switched |

Tests: T-V2-26, T-V2-31, T-V2-32, T-V2-37, T-V2-50, T-V2-55, T-V2-58, T-V2-60.

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's cells are V02 §2.5's and every event's §7.4's
row (V02 §4.4); the elaboration cache and every derived view (V02 §2.4, the roofscape) are recomputed on load, undo,
redo and regenerate and never stored, so none goes stale in a save; a document without stage-3 fields loads by the
fallback migration row (T-V2-6), one without `MassingRef.stack` by the stack migration row (T-V2-46). The exterior's
damage and a disaster's ruined look (V02 §5.7) are derived at read and never stored: a load re-reads them from the
level, the plan in force and the looks, and an undo or redo of an epoch changes only the level they read, their damage
marks re-emitted with its delta (V02 §5.7 (8)). Tests: T-V2-6, T-V2-19, T-V2-20, T-V2-24, T-V2-34, T-V2-48, T-V2-59,
T-V2-60.

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory
data (E5), and degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| the stored composition (V02 §2.2) | a stored composition naming a wing key that left; an edited room whose host left; a secondary porch whose entrance left | listed in §7.3's orphan table with re-attach and discard (V02 §4.4), never dropped silently | leave out and report | T-V2-20 |
| the stored composition (V02 §2.2) | a stored composition whose `composition.json` slices a later table version changed | kept as stored (`edited` is never stale, V02 §3.11); its unedited parts re-derive only when the massing changes | — | T-V2-21 |
| the derived functions (V02 §2.4) | a side whose usable run is not positive; a `polygon` wing's free arc shorter than `bayM ÷ 2`; a wing with no ridge (`flat`, `none`) | no bay on that side or arc; no eave sides and so no dormer; `cryptSeedWings` on a building with none returns an empty list (V02 §3.14.5) | — | T-V2-53 |
| the row a building reads (V02 §3.2) | a class, family or structure with no row; a row breaking the arrangement law; V11's templates without the manor override, the role shares or item 427's columns | the chain's next key, ending at `default.<arrangement>/<band>`; the row skipped and reported at load (`arrangementSkip`); R7's defaults (V02 §8.4) | substitute | T-V2-33 |
| the rung ceiling (V02 §3.2 step 2) | a capped row keeping no family; an assignment's drift admitting none of the kept families; a `gatehouse` slot on a capped dwelling; a ceiling row that limits nothing or is off | the default row's capped families, else `baseOutline` (`ceilingEmpty`, reported); the drift's families read uncapped, the why fact naming it; the `outbuilding` row; no cap and no suffix | substitute | T-V2-58 |
| fitting (V02 §3.4) | the slot's `entranceOn` names no access segment; a zero-length access segment; `lir` of a sliver `H` | the plot's longest access segment gives `f`, and with none the massing takes rung 3, reported; a zero-length segment is never the longest; a clamped `w` below the least makes every family infeasible (M3), so rung 2, then rung 3 | substitute | T-V2-17, T-V2-56 |
| the massing (V02 §3.5) | a plot with no slot; a template that draws no structure | no `outline()` call; no building (open ground, V02 §3.10.7) | — | T-V2-56 |
| the massing (V02 §3.5) | one slot, one wing | the drawn family lays one range, or rung 2's `single` | simpler shape | T-V2-17 |
| the massing (V02 §3.5) | a hint below the family's least footprint `Amin`; a band above the plot's capacity | M3's budget test removes the family; M10's reverse-lattice shrink, then `overBudget` reported (T-V2-30) | simpler shape | T-V2-30 |
| the massing (V02 §3.5) | the most the rows draw (wings, blocks, towers, tiers) | every loop runs over a finite list — M7's and M8's candidates tried in drawn order until `k` are accepted or none remain — and at most three attempts of a family (M14), so no lay hangs; a lay the plot cannot hold is the next attempt | retry that piece | T-V2-17, T-V2-22 |
| the composer (V02 §3.6, V02 §3.7) | a building whose every eave has no bay; no main entrance side with room for a porch | no dormer; the porch ladder ends at `none` (F-COMPOSE (2)) | leave out and report | T-V2-12, T-V2-18 |
| the rooms rung (V02 §3.8) | a host shorter than the hall's least length; no host admitting a room | the room shortened once, then omitted, V03 placing that role (F-COMPOSE (3)) | leave out and report | T-V2-35 |
| the mutation (V02 §3.9) | a kept wing outside every target's ± 15 % side rule; a mutation toward the building's own family | the target unreachable, the next reachable family drawn; a mutation to its own family re-lays nothing (every wing kept) | substitute | T-V2-16 |
| elaboration (V02 §3.11) | a click on a building whose `wings` rung failed; a tile holding more buildings than one batch composes | the identity composition, reported (F-COMPOSE (4)); the batches of `viewBatchMs`, the massing's roofscape drawn meanwhile | substitute | T-V2-18, T-V2-22 |
| determinism (V02 §3.12) | two candidates at equal weight or distance; a row cell absent from `composition.json` | ties by the lowest key, then the fixed geometric enumeration order; an absent cell is resolved by V02 §3.2's chain before any draw, so no draw reads a missing range | — | T-V2-13, T-V2-33 |
| the owner's rules (V02 §3.14) | a split site whose works plot is lost; a ladder demotion with one member | the merge-back's two mutations in one event; the demotion keeps the member nearest its demand, the as-built bytes returning | — | T-V2-39, T-V2-40 |
| stepped massing (V02 §3.15) | a hint too small for a second tier; a draw of more tiers than fit | ST8's shrink, then the single fallback, reported (`tiersTruncated`, `shrineDropped`) | simpler shape | T-V2-46 |
| deck buildings (V02 §3.16) | a deck plot narrower than every family's least lengths; a deck whose `deckCm` is unset | F-MASSING to the base rectangle inside the plot; no deck plot at all (V02 §3.16 (1)) | simpler shape | T-V2-47 |
| item 110's rest (V02 §3.17) | a wall of zero height inside `terrace.wallBandCm`; a building meeting a raised way's pier strip | the wall-side sample equals the terrain's (nothing moves); the add path clears the building (V02 §3.17 (b)) | — | T-V2-51, T-V2-53 |
| the ops (V02 §4.1, V02 §4.2) | an op with no optional field; `addRange` whose two points coincide; a canvas drag to a zero-width range | every omitted value the row's central value (V02 §3.12); the zero-length centre line grows along the plot's frontage direction `f` (V02 §3.4) by `bend.wing.grow`'s rule, as a zero width grows to 2 m | repair locally | T-V2-19, T-V2-56 |
| `setComposition` (V02 §4.3) | `dormers` with count 0; `porch` with an `entrance` ordinal naming no current entrance | the eave's row stored with no dormer (`edited`); the op bends to the nearest side, rear or yard entrance (V02 §4.4's re-attach rule), and with none is a no-op, named | repair locally | T-V2-20, T-V2-56 |
| the skeleton file (V02 §4.5) | a `setMassing` line naming a key that no longer exists | orphaned and reported (§7.4's migrate cell) | leave out and report | T-V2-34 |
| editing stacks (V02 §4.6) | `centre` outside the plot; `radiusCm` giving tier 0 below 4 m² or a side below `minEdge` | the least move into the plot region; the ring grown to the least lawful size (`bend.wing.grow`), the stack re-inset | repair locally | T-V2-48 |
| drawing (V02 §5.1–§5.3, V02 §5.6) | a map with no building; a one-wing building; a sheet that omits one of V02 §5.3's cells | nothing drawn by stage 3; that wing's facets alone; the shipped default cell | — | T-V2-9, T-V2-56 |
| exports (V02 §5.5) | a scope with no building; a zero-area facet | no stage-3 entry; the facet skipped in every format | leave out | T-V2-24 |
| the exterior's damage (V02 §5.7) | level 0 (never abandoned, under no look); level 1; no plan in force (none stored, none current); a stale cached plan | nothing drawn, byte-identical (T123-7's no-op); every element the plan holds damaged; the massing reading, no hole or gap; the stale plan never read — the massing reading until the plan is re-derived | — | T-V2-59 |
| the exterior's damage (V02 §5.7) | a building with no roof bay over a room or no storeyed wing (a solid monument, a stack of solid tiers); a wing roofed `none` (the decline's roofless state, a fire's charred shell); a building under a Works whose stage draws no roof (`wallsRising`) or no building yet (`staked`, `groundBroken`) | no hole (gaps only where a storeyed wing has outer runs); no facet to hole — the gaps cut from its state row's outline, and every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while the building is `decayed` or `ruined`, damaged (§2.6 step 7); holes only in the facets the stage draws and gaps only on an outline it draws, nothing where it draws no building | — | T-V2-59 |
| the exterior's damage (V02 §5.7) | a restoration from level 1 to 0; a wing an `extend` adds, or an element a re-cut makes, after the damage left; a building first met ruined (generated as a ruin, or reached by item 113's replay) | the damage leaving in reverse threshold order, each repaired bay patched and each repaired run drawn whole; the new elements drawn as built, never patched (V06's per-element `decayPeak`, V03 §5.6 (2) (b)); its plan as built under its damage (V03), the exterior reading that plan | — | T-V2-59 |
| the damage marks (V02 §5.7 (8)) | a drawn week that moves a level without crossing a threshold; one that crosses one, a look's week edge or a rebuild's start; Show crises switched, a preview started or ended, View as changed; a plan entering force, or evicted from the elaboration cache; a commit that moves a level or a look's units; a cached tile of a struck district | nothing re-emitted; exactly the buildings whose marks change re-emitted, the rest untouched; the buildings of the looks' units before and after re-emitted; that building re-emitted, its element reading joining or leaving; its marks in the commit's delta; the tile redrawn after each re-emission (its dirty box, §8.1 item 4) and keyed by the drawn week, `crises` and the effective key (§8.8) | — | T-V2-59, T-V2-60 |
| the ruined look (V02 §5.7) | severity 0 and 1; two disaster looks over one building; a condition the view's key withholds; a `preview` on a standalone document; a preview over buildings under a rebuild's Works; an overlay whose condition carries no calamity | the `disaster` row's two `lookLevel` ends; the higher level, with that look's pattern (ties: the lower condition id); no look on any building; the previewed look at `previewSeverity` on its preview's units; the look on every building of its units whatever their Works (a preview never hands over, V06 §3.22 (3)); the `scatter` pattern (V01 §3.16 (2)) | — | T-V2-60 |
| the ruined look (V02 §5.7) | a roofless building; a deck building; a tower; a stack; an underground building | its state row with the gaps; as any building (its own plan; no cellar); the tower room's roof bay opening its cone; each storeyed wing's own roof bays and lowest-storey runs, a solid wing none; none — below ground is V04's | — | T-V2-60 |

**(f) Combinations** — where another unit's feature meets a V02 mechanism at its limits; the rung column names the
§5 rung of a failure outcome, and — marks a rule with no failure:

| combination | outcome | rung | test |
|---|---|---|---|
| a cliff and a composed building | the massing stays inside `H` (V02 §3.4), which the base's plot model keeps off the cliff face; each wing's datum is `deriveBase` over its own samples (plinth and skirt, §2.6); a wing against a retaining wall at the cliff's foot takes the wall-side sample (item 231) | — | T-V2-1, T-V2-51 |
| steep ground and a composed building | above `axisSlope` a `fallLine` class lies along the fall line (V02 §3.4); every wing's datum per `deriveBase` | — | T-V2-41 |
| steep ground and tiers | tier 0's datum per `deriveBase`, the stack re-based by `rebaseStack`; a stair whose run the slope lengthens steepens up to `stairGradeMax`, reported `stairSteep` (V02 §3.15) | repair locally (the stair steepened, `stairSteep` reported) | T-V2-44, T-V2-45 |
| steep ground and a crypt | the crypt's floor at `max(lowest terrain sample under its ring, water table + crypt.freeboardCm)` (V02 §3.14.5 (d)) | — | T-V2-36 |
| a river, a coast, a moat or an oasis and a crypt | the water table decides the ladder's form — full, half-sunk or raised (V02 §3.14.5 (d)); the crypt is never refused | — | T-V2-36 |
| a coast or an oasis and a composed building | a `water`-axis class reads the nearest water face — an oasis's spring pool included (item 111) — within `axisWaterM` (V02 §3.4) | — | T-V2-41, T-V2-57 |
| a harbour and a composed building | deck plots on moles, piers, jetties and quay platforms by V02 §3.16; a bank quay's plots ground | — | T-V2-47 |
| a bridge over a river, or over a moat away from a gate, and a composed building | a deck plot's building by V02 §3.16 (deck datum, `maxFloors`, no basement); a ford, a drawbridge or a gate's moat deck carries no deck plot (§4.7 *Deck plots*) | — | T-V2-47 |
| a moat, a square, an oasis's spring pool or the map frame and a composed building, tiers or a crypt | none crosses the plot, so `H` excludes them, and a basement or crypt lies under its building inside the plot; an oasis's spring pool is water outside the plot (item 111), so `H` excludes it and a stack stands inside `H`, tier 0 on `deriveBase`'s datum over its own samples (V02 §3.15.2); a porch stays inside the plot, clear of ways (T-V2-12); the base's margin band keeps plots off the frame | — | T-V2-1, T-V2-12, T-V2-36, T-V2-57 |
| a raised way and a composed building, tiers or a crypt | the add path clears every building meeting its piers or strip (V02 §3.17 (b)); a cleared building's basement and crypt leave through V03 and V04's closure, never silently (V02 §3.14.5 (c)); a use a dossier crypt record binds is relocated by the base's relocation (§10.3), its crypt re-derived at its new building by the no-refusal ladder; a building inside an arch vault is clamped by `vaultClamp` (M11) | leave out and report (a cleared building, its basement and crypt); substitute (the bound use at its new building); repair locally (`vaultClamp`) | T-V2-53, T-V2-57 |
| a stage-2 neighbourhood (V01) and a composed building | the neighbourhood click raises the `wings` rung centre-out (V02 §3.11); V01's entrance reserve reads the `PorchKindRow`s (V02 §8.5) | — | T-V2-21 |
| a terraced ward (V01) and a composed building or a crypt | every building's datum within `plinthCm + 10 cm` of its own terrace's level (T-V2-51); a basement's and a crypt's floors read the levelled ground as their terrain samples | — | T-V2-51, T-V2-57 |
| a lock and a composed building | a lock on `wings/<key>` holds that wing against every mutation, re-derivation and edit of another wing (V02 §4.1); an op on it is refused with the lock named (item 101 R2) | — (a refusal, the lock named; item 101 R2) | T-V2-19 |
| a crypt and undo | undo of a `setMassing` or a mutation restores the former basement and crypt with every wing, byte for byte (V02 §4.2 step 5) | — | T-V2-36 |
| a settlement growing over a sealed void | a wing W6 adds over a sealed void draws its access once on V04's `sewer` key (V02 §3.9 W6); no `setMassing` op draws | — | T-V2-36 |
| a dossier removing what an edit pinned | the dossier fact wins (item 20): the building goes by its fate, and the `setMassing` and `setComposition` edits on it are orphaned and listed in §7.3's orphan table | leave out and report (the orphaned edits listed) | T-V2-57 |
| a rung change at an epoch and a standing composed building (item 115 (e)) | the crossing reshapes no standing building, up or down: its re-derivations read the ceiling of the rung its `MassingRef.row` records; a building new or rebuilt from that epoch reads the new rung's ceiling (V02 §3.2 step 2; V06 §3.8.5) | — | T-V2-58 |
| an epoch undone after a save | the epoch's recorded wing steps (`EditBase.mutations`) reverse exactly on the loaded document as before the save | — | T-V2-15, T-V2-57 |
| a disaster's look over a building really decayed | each element drawn at the higher of the two levels; an element the look's level does not reach keeps its real state, a repaired one its patch | — | T-V2-60 |
| a disaster's look and its aftermath (V06) | the look leaves a building where V06's `crisisLookYields` holds, so no week draws both the look and the rebuild's scaffolding; a building the next epoch really ruins or abandons reads its own level from that epoch's week; an element only the look damaged is drawn in its real state when the look ends, never patched | — | T-V2-60 |
| a disaster's look and a Works on its building | a Works other than a `decay` Works begun by the week and not finished before the condition's `sinceWeek` (a rebuild, a repair, a clearance, a demolition) ends the look on that building (V06's `crisisLookYields`): its Works' stage and its own state drawn, never both; a `decay` Works, or one finished before the condition, leaves the look standing, its damage over what the stage draws — holes in the facets it draws, gaps on the outline it draws | — | T-V2-60 |
| a disaster's look over a deck building whose deck is ruined | the building by its own state row (§8.2's deck row) and the higher level; when the deck's fall tombstones it, nothing | — | T-V2-60 |
| a dossier change moving a condition's weeks or severity, or removing a building under a look | the look re-read at the next draw, no rung stale; a removed building drawn by its fate, no look on what is gone | — | T-V2-60 |
| an epoch undone, or a save and load, while a look stands | nothing stored: the exterior re-reads the restored level and the look's weeks, byte-identical to before | — | T-V2-59, T-V2-60 |
| a building's decline after its plan was derived (an epoch's `vacate`, a fire's `burn`, a flood's or a topple's `ruin`) | the `wings` and `rooms` rungs stay `current` (V02 §3.11) and the plan in force stands (§2.6 step 7); the exterior's element reading reads it at the rising level | — | T-V2-59 |
=== END ===

=== REPLACE ### 5.7 Ruin and disaster on the exterior (items 123 (d), 122) ===
### 5.7 Ruin and disaster on the exterior (items 123 (d), 122)

Two owner items reach the building's exterior, both looks: a building's floor plans show its ruin as a damage layer over
the same plan (item 123), and its exterior draws the same damage (item 123 (d)); a disaster's neighbourhoods look ruined
while it lasts (item 122 (b)). One reading, `exteriorDamage` (V02 §2.4), serves both. It changes no wing, `MassingRef`,
composition, stored plan, digest or hash, reads no model stream, and stores nothing.

**(1) The level.** A building's level is the higher of its **decay level** — V06's `decayLevel` for its lineage at
§2.9's `week`, 0 for a building never abandoned (item 123 (b)) — and the level of a **disaster look** over it: the
`disaster` row's `lookLevel` (§10.2; V11's values) at the condition's severity, linear between its two ends. A disaster
look lies over a building while the look is drawn in the view — its `ConditionOverlay` standing in the view's week by
§2.7's reader rule, its map row reading `disaster` (§7.7's DR44), admitted by the view's knowledge key (DR44's
admission; `ViewOpts.viewAs` lowering it, §9.2), and drawn by §2.9's `crises` in `follow` — or previewed: `crises` in
`preview` naming the `disaster` row, at §10.2's `previewSeverity`, with or without a dossier — while the building stands
in a unit the look strikes and has not handed over ((6); a preview never hands over, V06 §3.22 (3)). The units are every
district V01's `disasterDistricts` returns — for a preview, the districts it returns for the previewed look, keyed on
the look kind in the condition's stead (§10.2's placement; X35) — and at THORP, HAMLET and VILLAGE every end V07
returns; every building of a unit draws the look, with no second, per-building share (item 122 (b): whole
neighbourhoods). Nothing of the look is drawn from a stream of its own: its units are V01's and V07's (keyed by the
condition's id), its elements' thresholds the building's lineage's (§6.3), its rubble the building's render key's
(§8.10). Of two looks over one building the higher level is drawn, with that look's pattern ((4); ties: the lower
condition id). At level 0 — a building never abandoned, under no look — nothing of this section is drawn: the building
draws byte-identically to stage 3 without items 122 and 123 (T123-7's no-op).

**(2) The element reading — where the building's plan is in force.** Where the building's plan rung is current or stored
(V03; a stale cached plan is not read, its elements no longer sure to lie on the massing's facets), the exterior draws
exactly the damage the plan shows at the level. V03's damage layer gives each element its state — intact; damaged, by
§6.3 *Plan damage*'s one comparison (the level above 0 and at least its keyed threshold t: §6.3's `plan.damage`, V11's
ranges); or repaired, the level below its threshold and V06's per-element `decayPeak` (the highest level since the
element entered the plan, V06 §3.23 (3), read through V03 §5.6 (2) (b)) reaching it by the same comparison, its damage
having left through a restoration (item 123 (b): a `reoccupy` back into use, a repair), so an element added after its
building's damage left (a wing an `extend` adds, an element a re-cut makes) is drawn as built — and V02 reads two kinds
of element, never a threshold of its own:
* **A roof bay over a room** (the roof over a room of the storey directly under it). Damaged, it is a **hole**: the
  room's ring clipped to the facets of the room's own wing (a tower room's to its tower's; never another wing's),
  removed from those facets and from every dormer facet over it, and drawn as §8.2's `decayed` row draws a roofless
  building (no roof construction, the fill at the row's alpha); the roof's lines (V02 §5.2 step 5) stop at its edge,
  which is drawn in `ink` at the `roofscape` program's `hipWeight`. A wing whose every roof bay is damaged draws no roof
  facet over its rooms: the lost upper storey item 123 (c) gives a `ruined` building, seen from above. Repaired, its
  facets take §8.2's patched-courses roof `pattern` (the `condition` row's) over its ring, at the neighbourhood band and
  finer — item 114's patch material on a roof.
* **An outer wall run of a wing's lowest storey** (a wall run of the plan with the outside on one face, on the first
  storey `storeyRange` gives that wing; a solid wing has none). Broken, it is a **gap**: the outline the drawing gives
  that wall — the footprint outline for a wing on the ground, the eave line of a wing standing on another — is not drawn
  over the run's span, and at the neighbourhood band and finer §8.2's rubble spill (the wall `breached` row's dots,
  keyed by the building's render key, §8.10 — never a model stream) covers a strip along the span reaching the
  `roofscape` program's cell `rubbleReachM` (1.5 m; V02 §5.3) to each side of the outline (at least 1 px), the fallen
  wall's spill inside and out. Repaired, the run's outline is drawn whole (its patch material the plan's to show, V03).

Marks standing on a hole go with it: the cupola, `sails` and every roof decoration whose foot lies in a hole are not
drawn; a plan chimney stands (its stack is masonry; §8.6 draws it as before). The porch and a secondary porch are drawn
only while the outer run carrying their entrance stands. A wing roofed `none` (the decline's roofless state, a fire's
charred shell) has no facet to hole: the building draws its state row, the gaps cut from that row's outline, and the
plan's open ceilings are the roof it lacks — every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while
the building is `decayed` or `ruined` (§2.6 step 7) — which T-V2-59 (b) holds (X34). Where a building at the decay
Works' `decaying` stage draws its roof with gaps along the ridge, §8.2's row draws the element reading's holes in their
place (X37).

**(3) The massing reading — where no plan is in force.** No element is known, so nothing is drawn that a plan could
contradict. A building's own decay draws its state row alone (§8.2, as before). A building under a disaster look draws,
over its state row, its roof tone lerped toward `ground` as the `abandoned` row lerps it (30 %) and its outline dashed
as the `decaying` row dashes it — the dash the look's second cue (item 112). When the building's plan comes into force
(a building click; V03's `view` derivation), the element reading's holes and gaps join that tone and dash; because every
threshold is keyed by the lineage and the element's id (§6.3), they are the same whenever, and by whichever trigger, the
plan is derived (V02 §3.11: no rung is raised for them).

**(4) The disaster's kind.** The look draws the damage of (2) and (3) whatever the disaster. Its kind — V01's
`disasterSource(doc, overlay, key).pattern` (V01 §2.3, V01 §3.16 (2): the overlay's calamity's type through V06 §2.4's
calamity table; `scatter` with no calamity, a preview's included) — adds one flavour: a `fire` pattern blackens, the
massing reading's tone lerping toward `ink` instead of `ground` and every hole drawn in the `charred` program's tone; a
`flood` and a `scatter` (an earthquake, every other kind, a preview) draw the damage alone — an earthquake's fallen
wings, towers and open roofs and a flood's fallen walls and outbuildings are that damage, and a flood's stained lower
storeys lie under the roofs a map draws from above (J-V2.113). The look leaves no patch: an element only the look
damaged is drawn in its real state again from the week the look no longer stands (V06's `decayPeak` never reads a look).

**(5) At each band.** City band: nothing of this section — the masses are the model's, and a ruined quarter's tone is
§8.2's crisis rows'. District band: the tone and the dash, and the element reading's holes and gaps. Neighbourhood band
and finer: the rubble spill and the patches as well, the composition's dormers, porches and decorations as (2) says.
Building band: where a building's plan is drawn, the plan draws its own damage (V03; §8.6); every other building's
exterior as at the neighbourhood band.

**(6) The hand-over** (item 122 (a)). The look leaves a building where V06 hands it over: from the week V06's
`crisisLookYields(doc, building, overlay, week)` holds — a Works other than a `decay` Works begun on the building by
that week and not finished before the condition's `sinceWeek` (a rebuild, a repair, a clearance, a demolition) — the
building draws its Works' stage and its own state, so no week draws both the ruined look and the rebuild's scaffolding;
a `decay` Works never ends the look. A building no rebuild reaches keeps the look until its condition no longer stands.
A building the next epoch really ruins or abandons reads its own level from that epoch's week (V06's hazard and decline
phases), the look's level ruling only while it is the higher.

**(7) Exports.** A picture export — SVG, PNG, print — draws this section as the view draws it at its band, week and key
(item 122 (f)), from the damage marks of its transient list ((8)), the SVG carrying the holes in
`sem.building.roof.hole` and the rubble in `sem.building.rubble` (V02 §5.5); a battle map follows the damage by §11.1's
rule (item 123 (e)) and draws a disaster's look in its image only. The glTF, OBJ, CityJSON, GeoJSON and JSON exports
carry neither (J-V2.112).

**(8) Where it runs, and how it reaches the drawing.** `exteriorDamage` runs in the **generation worker**, where its
inputs live — the document, V06's levels over the lineage's lifecycle events, the plan in force in the elaboration cache
(§2.9), V01's `disasterSource` and V06's `crisisLookYields` — inside S14 (§8.1), for the buildings of each district
whose district, neighbourhood or building band S14 builds: a full build, a band request of the tiles entering the view
(§8.9), a picture export's transient list (§8.1 item 6), each at its drawn week, `crises` and effective knowledge key
(§2.9's keys, `ViewOpts.viewAs` lowering the key).
* **The damage marks.** Its result reaches the drawing as the building's damage marks, in its district's group (§8.1's
  `group`) of the display list or of a `DisplayDelta` (§8.9's generation → tile worker rows), each carrying the
  building's `entity`, its render key in `key` (the rubble's, §8.10), its `knownTo`, and one `revision`: a 32-bit hash
  of the building's leaf-digest revision, the plan's hash, its damaged and repaired element ids in plan order and its
  look's pattern (none without a look). A building under a disaster look has one `building.look` mark — kind `outline`,
  its footprint's outline; `building.look.fire` under a `fire` pattern — by which the drawing gives its roof the look's
  tone and its outline the dash ((3)) and, for a fire, its holes the charred tone ((4)). At the element reading each
  hole ring is an `area` mark `building.roof.hole`, each patched ring an `area` mark `building.roof.patch` and each gap
  span a `ribbon` mark `building.wall.gap` (its two points on its wing's outline), each naming its wing's key (a
  tower's) in its `wing` attribute column (§8.1's `attrs`), matched to the roofscape's `RoofFacet.wing`; their `lodMask`
  the district band and finer, the patches' the neighbourhood band and finer. The reading is their presence, and the
  level stays in the generation worker: every drawn form is decided there, so the tile worker reads none. A building
  with nothing of this section to draw — never abandoned and under no look, or at the massing reading under no look,
  where its state row draws its own decay — has no damage mark.
* **When it is sent again.** The generation worker keeps each building's last `revision` (4 B a building with damage
  marks) and re-emits, as a `DisplayDelta` over the districts whose bands the tile worker holds, exactly the buildings
  whose `revision` changes, removing the marks of a building left with none: when the drawn week moves — beside §8.1
  item 7's Works re-emission — testing the buildings with a plan in force whose level or peak is above 0 at either week
  and the buildings of the units of the looks standing in either week, a level that moves without crossing a threshold
  of its plan re-emitting nothing; when `crises` or the effective knowledge key changes (Show crises, a preview's start
  or end, View as), the buildings of the looks' units before and after; when a building's plan enters force (a building
  click, V03's `view` derivation answering a band request) or leaves it (evicted from the elaboration cache, or stale),
  that building; and after a commit — an edit, an epoch, an undo or redo, a regenerate, a dossier change applied — in
  §8.1 item 4's delta, the changed buildings and every building whose level, look units or hand-over the commit moves.
  Each delta's dirty boxes (§8.1 item 4) invalidate the cached tiles they meet.
* **In the tile worker.** The rasteriser clips each hole and patched ring against the facets of its wing in the
  roofscape it memoises (V02 §6.3), keeping the clipped rings beside it under the marks' `revision` (V02 §6.6), cuts the
  outline at each gap span and draws (2)–(5) by §5.3's `roofscape` program and the building's outline, which read the
  damage marks while they draw their building — no sheet entry paints a damage mark on its own, so none takes a slot
  (§8.2's slot resolution). A tile holding a damage mark is keyed by the drawn week, and one holding a `building.look`
  mark by `crises` and the effective knowledge key as well (§8.8's tile key; X37). The SVG writer draws the same marks
  from its transient list in the generation worker, clipping against the roofscape it derives there (V02 §5.2); a raster
  export's list carries them to the tile worker with its request.
=== END ===

=== REPLACE ### 6.3 Memory ===
### 6.3 Memory

* **Model:** per building ≈ 36 B for roles, keys, `nextWingKey` and `MassingRef` (with `segments`, `low` and `cupola`),
  and ≈ 50 B for the extra wings the composed massings carry (about 1.8 wings per building instead of about 1.3) — ≈ 1.2 MB
  at the METROPOLIS target, counted in §12.8's model line and re-declared at the intake.
* **The elaboration cache:** a `wings`-rung chunk ≤ **1 KB** per building at p99 (§12.8's line) — composed wings and
  towers are key references (2 B each), dormer rows 8 B each, the porch 12 B; the `rooms` rung's rings count in the plan's
  per-storey line (§12.8; a tower room's ring encoded as its tower's index and storey, derived at decode). Measured at M6b
  on B-PLAN's fixtures and B-CITY; fallback: the base's (the cap halves).
* **The roofscape memo:** ≤ 2 KB per building in the tile worker's session memo, LRU-capped at 8 MB per worker, evicting
  to recomputation.
* **The damage marks** (V02 §5.7 (8)): held in the tile worker's display list while drawn — ≈ 0.2 KB a building under a
  disaster look at the massing reading, ≈ 2 KB a damaged house at the element reading, ≤ 20 KB a fully ruined large
  manor (V02 §6.6) — and their `wing` attribute column, 4 B a mark of each district-, neighbourhood- or building-band
  table carrying one; counted in §12.8's display-list line and re-declared at the intake. The generation worker keeps
  4 B a building with damage marks (their `revision`).
=== END ===

=== REPLACE ### 6.6 Ruin and disaster on the exterior (items 123 (d), 122) ===
### 6.6 Ruin and disaster on the exterior (items 123 (d), 122)

| work | budget | estimate (PLAUSIBLE) |
|---|---|---|
| `exteriorDamage` at level 0 (the generation worker) | ≤ 1 µs per building of a band S14 builds | V06's `decayLevel` read (its cost V06's) and the look test against the units of the looks drawn in the view, listed once per look and week — no mark |
| a building's damage marks (the generation worker) | ≤ 1 µs under a look at the massing reading; ≤ 5 µs median, ≤ 30 µs p99 (a large manor fully ruined) at the element reading | the look mark; the plan's ≤ 60 roof bays and ≤ 80 outer runs compared with the level and the peak (§6.3's thresholds), their rings and spans packed into ≤ 141 marks — ≈ 0.2 KB delivered for a building under a look at the massing reading, ≈ 2 KB for a damaged house, ≤ 20 KB for a fully ruined large manor |
| a week step's re-emission test (the generation worker) | ≤ 1 µs per tested building, ≤ 3 µs with a plan in force | the level at both weeks against its plan's thresholds, its look's standing and hand-over at both (V02 §5.7 (8)) |
| the massing reading of a damaged building (the tile worker) | ≤ 2 µs over its roofscape | one tone lerp per facet and the outline's dash |
| the element reading of a damaged building (the tile worker) | ≤ 30 µs median, ≤ 200 µs p99 (a large manor fully ruined) over its roofscape | each hole and patched ring clipped against the ≤ 8 facets of its wing (float64, the renderer's CPU reference); the outline cut at each gap; the rubble spill per pixel cell |
| a neighbourhood-band tile in a disaster's district at the METROPOLIS core | ≤ 2 ms of tile-worker raster time over the tile's roofscape | ≤ 60 buildings (V02 §6.2) × 30 µs where every plan is in force; × 2 µs where none is |
| the memo (the tile worker) | ≤ 1 KB per damaged building, inside the roofscape memo's 8 MB LRU cap (V02 §6.3) | the clipped holes and patches, keyed by the marks' `revision` (the leaf digest, the plan's hash, the damaged and repaired element ids, the look's pattern) |

Drawn lazily per visible tile inside §12.5's frame budget — the crisis looks' lazy per-tile line — an interaction budget
item 119 (d) leaves as it is; nothing is derived for it (V02 §3.11), so it adds no one-time wait; its generation-worker
share rides the band builds and V02 §5.7 (8)'s re-emissions, O(changed buildings). **Measured** at M6b on B-CITY
METROPOLIS with the damage sub-fixture and the look fixture of V02 §7.8, plans derived on the core's buildings, across a
week scrub through the look's weeks and a Show crises toggle. **Fallbacks, in order:** (a) each hole's clip run first on
its bounding box and exactly only on an overlap (no output change); (b) on a tile still over its share, the rubble spill
left out at the neighbourhood band, the gaps kept — a declared view shift, reported; (c) a week step over its line: the
test reads only the two thresholds of the building's plan round its kept level, kept beside its `revision` (8 B more a
building; no output change).
=== END ===

=== REPLACE ### 7.2 Conformance (C) — hard bars, 100 % unless stated ===
### 7.2 Conformance (C) — hard bars, 100 % unless stated

* **T-V2-1 containment** — every wing inside its slot hint and its plot, never over a way corridor or another slot, the
  gable-fronted rows' back ranges included (each behind its quad's rear chain, never across a party wall) (B-MASS,
  B-CITY every rung; PR tier on B-MASS, nightly on B-CITY).
* **T-V2-2 the stage-3 contract** — the union of the composed wings and the composed towers' rings equals the footprint
  face (integer equality); each composed wing reaches exactly its base wing's storeys; the non-tower ground wings tile (the
  pairing holds; a wing with `on` by T-V2-44) (B-MASS, B-PLAN).
* **T-V2-3 towers** — each tower's overlap share in `[0.2, 0.6]` (a turret's in `[0.25, 0.75]`); no centre deeper than
  `0.35 r` in a wing; no tower–tower or tower–block overlap. A tower standing on its block (M8 (d)) or over a template's
  crossing (M8 (e)) is exempt from the share and depth tests and lies inside its container's ring inset by
  `towerOnBlockInsetM`. Every tower's eave at or above every roof inside its ring.
* **T-V2-4 the main door** — exactly one main entrance per building, on a side facing its access edge (§5.3's row), on
  every composed family (Fantasy Manor: 37 of 41 measured buildings have an entrance, `captures/manor/README-frequencies.md`
  §4 — ours is "beyond", O).
* **T-V2-5 the seed contract** — every tower vertex and wing side at least `attractCm` apart except at shared joints; the
  plan rung's transient arena accepts every stage-3 composition of B-PLAN and of every clicked B-CITY-lite building with
  0 `E_DEGENERATE` naming a composer's ring.
* **T-V2-6 keys and roles** — keys unique within a building and never re-used across a 10³-event B-EDIT sequence;
  `nextWingKey` never decreases; every wing has a role; the wings always in the canonical order (V02 §2.1); a document
  without stage-3 fields loads by the fallback migration row (V02 §2.5) with keys = indices and the base builder's roles.
* **T-V2-7 heights** — floors ≥ 1 (a `solid` wing 0, T-V2-44); the mitre-joined ranges of one path share floors; a
  spanning wing ≥ 2 floors; eave and ridge equal M11's formulas to the centimetre from V11's `HeightsRow`
  (`storeyCm.ground`, `storeyCm.upper`) and the one pitch rule (`roofPitch × ClimateRow.roof.pitch ÷ pitchRef`, clamped); a
  `shed` roof has `high`; `Heights.towerCm` the highest tower ridge above `baseCm` and absent without a tower. **Arid
  fixture:** every range, block and back range `flat` with its family's parapet, no dormer. **Cathedral fixture:** two west
  towers of the cathedral `HeightsRow`'s `towerStoreys` at its `towerStoreyCm` (V11 §3.6.4), each with a spire of rise
  `spireFactor × (eaveCm − baseCm)`; a church's single west tower at the church row's `towerStoreys` and `towerStoreyCm`.
* **T-V2-8 courts** — every footprint hole is a yard part of kind `court`; each court is entered through a door or the
  gate hall's arch at the plan rung (B-PLAN's closed-family fixtures).
* **T-V2-9 the roofscape tiles** — facets pairwise disjoint in their interiors; their union equals footprint ∪ porch rings,
  less the wings roofed `none`, to 0.5 % of the area; every facet planar to 1 cm; `dome` (a template part's), `plain` (the
  F-SKELETON downgrade) and `none` (a ruined building) each exercised; the cupola's facets excluded from the union (B-MASS,
  all constructions).
* **T-V2-10 joints** — every end classed by V02 §5.2's order; every valley's lines meet at the ridge extension within
  1 cm; no facet crosses a tower ring.
* **T-V2-11 dormers** — inside their host facets, clear of valleys, hips and towers; count ≤ the eave's bays; positions
  symmetric by V02 §3.7; an edited row unchanged by a re-derivation while its eave's length stays within ± 10 %.
* **T-V2-12 the porch** — inside the plot, clear of ways, other footprints **and the building's own other wings**, at the
  main entrance's side and offset, its width within the free part of that side less 0.6 m; a flush front's porch only
  `recessed` or none; also run on the terraced-palace fixture (a storeyed tier 0 with `flights`, stair 0 at its face's left
  end).
* **T-V2-13 determinism** — the same building state gives byte-identical massing and composition on Node 24, Chromium,
  Firefox and WebKit and with a pool of 0–3 workers; the derived-complete digest over click orders (§6.5 (9)) holds with
  stage 3 registered.
* **T-V2-14 rung isolation** — `regenerate` with `rung: 'wings'` changes dormer rows and the porch only (the building's
  leaf digest unchanged); `'rooms'` changes the composer's rooms only.
* **T-V2-15 mutation keeps what fits** — house → inn, inn → house, single → H, `rectCourt` → `L`, workshop → smithy, and a
  front's change (item 63): every kept wing byte-identical (its leaf digest), its dormer rows identical after the next
  click; the inverse restores the building's leaf digest exactly (item 18 (e); extends T18-1 – T18-4).
* **T-V2-16 the growth lattice** — every ordered pair of families of `MassingGrowthRow` on 50 B-MASS plots gives a valid
  massing or a reported fallback, never an exception; for every reachable pair of V02 §3.9's table the kept `main` wing is
  byte-identical after the lay (its leaf digest), and a pair outside the ± 15 % side rule is never drawn.
* **T-V2-17 the F-MASSING ladder** — fixtures that force each rung 0–3 (a 3.5 m wide hint reaches rung 3) take it, and the
  report counts it.
* **T-V2-18 F-COMPOSE** — the identity composition satisfies the contract on every fixture; on B-CITY the identity rate is
  ≤ 0.1 % of composed buildings (a higher rate is a composer bug, filed).
* **T-V2-19 edit locality** — every `setMassing` op on 200 B-MASS buildings, `moveTower { shape }` included: nothing
  outside the plot changes except the re-homed households' buildings and a spanned passage (the oracle, §7.3 item 7); each
  bent op names its bend; **no op is refused but by a lock** (item 101 R2): removing the last wing removes the building in
  one event; a row quad's reshape along the frontage moves the party-wall line (the neighbour's quad re-clipped, both in
  one event), its depth re-cuts the rear chain; removing a row quad that is not the last wing leaves a gap with the
  neighbours' ends reclassed as gables; a wing below 4 m² is grown; an op beyond the plot is clipped with `join` offered;
  an unreachable `family` bends to the nearest reachable one; a gate hall with no `gate` range becomes a gate passage; a
  hall or chapel with no admitting host goes to its fallback host (`bend.room.host`); undo and redo exact, restoring the
  building's (and the neighbour's) leaf digest.
* **T-V2-20 stored compositions** — the first `setComposition` stores the composition; §2.6's carry test (warps and vertex
  moves) passes with stored compositions of every family, towers included, and with the `room` and secondary-`porch` ops
  applied; an edited room survives a `rooms` re-derivation while its host keeps its key; undo removes what the first
  event stored; an orphaned dormer row, room or porch appears in §7.3's orphan table with re-attach and discard.
* **T-V2-21 staleness** — a massing change marks `wings` stale and the change marker appears; the next click re-derives;
  unchanged wings keep their dormer rows; a stored composition is re-matched inside the event, never stale; **a relet, a
  use change, an access, a Works stage and a material change each leave the `wings` rung `current` and draw no marker**;
  an occupants' band change marks the `rooms` rung stale and not `wings`.
* **T-V2-25 materials** — a material `setAttr` leaves every massing and composition byte unchanged (item 19; extends
  T19-3).
* **T-V2-26 the parity presets** — under `MFCG` and `FTG` every footprint is byte-identical to a build with
  `massing.composed` off (extends T23-1).
* **T-V2-27 capacity** — fewer than 1 % of residential buildings have their households clamped below the template's
  `households.built` by the massing's area and storeys (§2.6's capacity), reported by class otherwise.
* **T-V2-28 shelters and the underground** — every cluster structure is one wing with its kind's roof; every underground
  building (its row key suffixed `@underground`) a single range with a `flat` roof.
* **T-V2-33 totality of the composition key** (PR tier, on the compiled roster — V11 C1–C3b's 35 template families; the
  `burial-ground` exemption of V02 §3.10.7 included): every class of the compiled roster (the town and city classes, the
  `generic-<family>` classes, the custom archetypes' classes and V07's `v.` village classes, V07 §2.4) at every band, and
  every structure name of every compiled template, resolves by V02 §3.2's chain to a row above `default.*` (except the
  no-building classes of V02 §3.10.7), and every resolved row satisfies the arrangement law; the load checks of V02
  §3.10.7 pass; `arrangementSkip` is 0 on the shipped tables.
* **T-V2-34 wings by key** — on B-PLAN buildings with a stored plan, add and remove a range, a tower and a block in every
  order: every stored entrance, room, stair core and chimney keeps its wing (item 225), the wings stay in the canonical
  order, and undo restores the building's bytes.
* **T-V2-35 rooms follow the occupants** (at M6b, the composer's clauses) — a rich-band manor whose occupants' band is set
  to `poor` has no hall and no chapel ring, and returning to `rich` restores the as-built rooms exactly (the canonical
  chain); the gate hall and the tower rooms stay at every band; before V03's programme rows are loaded every hall lies in
  `[1.4w, length − 2 m]` and is reported `hallUnclamped`. **From M6-P's P1** (the programme rows loaded) every hall's area
  lies in its programme's `hall` row × the ladder's `sizeFactor`. The clause that the poor manor's plan houses at least
  three units in its main range is V03's (T-V3-25's manor clause).
* **T-V2-36 crypts** (from M6-U, V02 §8.1) — cathedral fixtures on `damp` and `flood` plots each carry a crypt in the
  `raised` form, the ground wings over the basement's ring lifted so their ground storey clears it by `crypt.clearCm`, and
  on `low` a half-sunk one with the wings over it raised by `cellar.depthCm ÷ 2` (item 226's half raise); after
  `setMassing` removes the east range, the crypt persists under the remaining wings (re-seeded by §2.6's rule), and the
  undo restores the former basement, crypt and wings byte for byte; a church mutated to a warehouse loses its crypt
  through the closure, reported; **a stepped great temple on a `flood` plot** (solid tier 0 of at least `crypt.clearCm +
  100 cm`) holds its raised crypt inside tier 0 with no lift, stair 0's grade unchanged, and one with a low tier 0 takes
  the lift with every stacked wing following through `rebaseStack`; no V02 path sources, moves or shrinks a catacomb (no
  V02 writer touches a catacomb record); a wing W6 adds over a sealed void draws once on its V04 key, and a `setMassing`
  op draws none; a stepped great temple with a storeyed ground annex on a `flood` plot takes the ground wings' whole inset
  in the `raised` form (V03 §3.7.4): the annex's ground storey clears it by `crypt.clearCm`, tier 0 inside or lifted as
  above, the annex's core reaching the basement; an author's crypt ring under a nave on a `low` plot raises the nave.
* **T-V2-37 the sunlit choice** — on the flat northern fixture (latitude 50°): the `L`'s arm, the `T`'s cross-wing, the
  `U`'s opening and the `towerHouse`'s corner take the option whose open vector faces south in 70 % ± 5 of 200 slots at
  `sunBias` 0.7, and 50 % ± 5 at 0.5 (the no-op pin: byte-identical draws to the unbiased coin); orientation by the
  frontage unchanged in every case; and the compiled `sunBias` resolves to 0.5 under each of `MFCG`, `FTG`, `VG` and `FM`
  — never the zeroing's 0.
* **T-V2-38 custom scale** — the landmark custom `mercantile-guildhall` composes at least one band richer (its row cells
  and M10's budget at a value ≥ one band width above) than the same class unmarked; a significance below the class's never
  shrinks a building; a `ruined-landmark` building is massed by its class's row and drawn roofless.
* **T-V2-39 split sites** — the butcher split composes the stall by `split.shop` and the slaughterhouse by `split.works`;
  a merge-back is one event whose undo restores both buildings byte for byte.
* **T-V2-40 ladders** — `brewer → brewery` keeps the brewer's quad byte-identical as the compound's frontage slot;
  `town granary → city granaries` yields one compound with at least three store buildings; the demotion restores the
  as-built bytes; COUNT members are buildings of the lesser class.
* **T-V2-41 orientation laws** — the longhouse on a 6 % slope lies within 10° of the fall line with `MassingRef.low` on its
  downhill end; the watermill's wheel wing lies on its water side, its outer side within 0.5 m of the plot's water edge;
  below `axisSlope`, or with no water in reach, the frontage frame.
* **T-V2-42 landmark and institution forms** — the cathedral has two west towers at its west corners and, where its
  template has a crossing, a crossing tower contained in it with probability per its row; the market hall's main range
  carries `arcade` (drawn dashed, exported open, outside the capacity's ground storey); the kiln yard's kiln is a round
  one-storey `towerHouse` with a cone; the rich hall's `cross` plan lays three wings with the main running through; a
  cupola sits at its range's ridge midpoint, never in `Heights`. **The arena** (B-MASS's arena sub-fixture and the second
  known-city fixture's arena): a closed `ovalCourt` of two rings sharing their vertices, the aspect of its hull's minimal
  bounding rectangle in [1.15, 1.4], its inner ring `solid` except the two gate passages at the major-axis ends, its court
  (the floor) one `court` yard part from M3a (item 303's hole sentence) and at least `courtMinM` across its least width
  and at least 10 % of the hull's area (the historical amphitheatres' 13–20 %; J-V2.84), the façade `arcade` where the row
  sets it; `massOval` from M3a and M5 from M6a byte-identical (T-V2-46's rule).
* **T-V2-43 why** — on untouched B-MASS buildings the `WhyProvider`'s family, row, alternatives and rejected tower
  candidates equal the massing's recorded draws and tests (recomputed without advancing any stream: the stream positions
  before and after are equal).
* **T-V2-54 the valley's reach** — on the butt-joint sub-fixture, for every abutted roof kind: `valleyReach(X, Y,
  'int')` is within 1 cm of `valleyReach(X, Y, 'float')`, so the usable run of the side a valley ends on stops where the
  drawn valley line starts (within 1 cm); for a `shed` `Y` both modes read the shed's full run; the bays stay
  byte-identical on every host (T-V2-13).
* **T-V2-55 every rung** — on B-VILLAGE at THORP, HAMLET and VILLAGE and on B-CITY at TOWN, CITY, METROPOLIS and the
  population cap: T-V2-1, T-V2-2, T-V2-9 and T-V2-13 hold at every rung; every `v.` class composes by its
  `composition.classFamily` row (V02 §3.10.5); no stepped building stands at a village rung unless a V11 specialisation
  drew it under V07's cap; the `VG` preset's `sunBias` is 0.5; every dwelling but a `grandClasses` building reads its
  row under the rung's grandeur ceiling at THORP, HAMLET and VILLAGE, and no row is capped at TOWN and above (V02 §3.2
  step 2; T-V2-58 holds the bar); every row of V02 §3.18 (b) and (c) holds.
* **T-V2-56 edges** — on the edge sub-fixture, every row of V02 §3.18 (e) takes the outcome and rung it names — never an
  exception, a hang or a whole-map retry — and is reported where the row says so: among them a zero-area and a sliver slot
  hint (rung 3 at once), a plot with no slot and a template drawing no structure (no building), `addRange` with coincident
  points (grown along `f`), a `setComposition porch` naming a missing entrance, `dormers` with count 0, a `tiers` op with
  `centre` outside the plot and a `radiusCm` below the least lawful ring, a sheet omitting one of V02 §5.3's cells, and an
  export of a scope with no building.
* **T-V2-57 combinations** — on the combination sub-fixture, every row of V02 §3.18 (f) holds: an oasis town's
  `water`-axis class laid on the spring pool's side, and a stepped building beside the pool standing inside `H`, tier 0
  on `deriveBase`'s datum; a raised way added over a chapel a dossier crypt record binds (the
  use relocated, its crypt re-derived at its new building, the cleared building's basement through the closure); a crypt
  on a terraced ward, its floor from the levelled ground; a dossier removing a building with a stored composition and
  edited wings (its edits orphaned and listed); an epoch undone after a save and load (every building's leaf digest
  restored).
* **T-V2-58 the grandeur ceiling** (item 115 (f); takes T115-1's composed-shape clause and T115-4's rung clause on
  B-MASS, §13.2's stage-3 row) — on B-VILLAGE's rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum (V07's
  T-V7-63 fixtures, 20 seeds a rung) and on B-MASS's ceiling sub-fixture: (a) no dwelling but a `grandClasses` building
  has an `H`, `U` or closed family, a `tower` or `turret` wing or a gate tower — every other dwelling's family in its
  ceiling row's `dwellingFamilies` or one of the arrangement's own constructions, its `MassingRef.row` carrying the rung
  it was capped at — and every size, dormer, porch and hearth cell reads as the uncapped row's; (b) the only dwellings
  with a grand arrangement are `grandClasses` buildings — none at THORP and HAMLET without a dossier record, at most one
  at VILLAGE and only with a `seigneurial` government or a dossier record (S10b's count, checked on the composed
  shapes); (c) the dossier-named hall (a `v.manor_house` record, the lord's hall, at HAMLET) reads its full row, and a
  `setMassing { family: 'H' }` and an `addTower` on a hamlet cottage are committed as asked, the why fact
  `massing/ceiling` naming each; (d) a terrain operator's re-fit of a standing capped and of a standing uncapped
  building keeps its `MassingRef.row`, cap and rung included, and its wings byte-identical (the epoch clauses are V06's
  T-V6-74); (e) a capped row keeping no family takes the default row's capped families (`ceilingEmpty` reported), a
  drift admitting only dropped families is read uncapped (the why fact naming it), and a `gatehouse` slot reads
  `outbuilding`; (f) TOWN, CITY and METROPOLIS byte-identical across the ceiling table's bump — the `item115.ceiling`
  registration of B-MASS on V12 §3.7.8's engine (V12 §2.13), written by the M6a seat (T115-4).
=== END ===

=== REPLACE ### 7.6 Cost, memory and exports ===
### 7.6 Cost, memory and exports

* **T-V2-22 cost** — V02 §6.1's bars (town-wide median ≤ 10 µs, composed classes ≤ 60 µs median and ≤ 250 µs p99, mean
  ≤ 12 µs) on B-CITY at every rung, and V02 §6.2's (compose ≤ 0.2 ms median, a neighbourhood ≤ 120 ms of pool time, the
  roofscape ≤ 25 µs median and ≤ 8 ms per district-band tile) — nightly; milestone at METROPOLIS. **And every one-time
  wait stage 3 adds to or lengthens** — the massing's share of a generate, a regenerate, an open and a dossier change,
  an `upgrade`, the load's stage-3 migration rows — **completes within ten seconds from the click at every rung's top and
  at the population cap** (V12 §3.15.9's wait timer, T119-2; the stage-3 share reported beside each wait; the cap at the
  milestone).
* **T-V2-23 memory** — V02 §6.3's lines (a `wings` chunk ≤ 1 KB at p99; the model's added bytes within the re-declared
  line).
* **T-V2-24 exports** — the JSON `massing` and `composition` blocks validate against the schema and round-trip; glTF and
  CityJSON validators green; their roofs equal the roofscape's facets (vertex for vertex after the exporter's rounding);
  an export with `derive` equals, byte for byte, one made with `asDrawn` after every building was clicked (below V02
  §6.4's measured limit); **and at every rung's top and at the population cap each format under each `compositions`
  option completes within ten seconds from the click to the file written** (T119-2's stage-3 export clause; V12
  §3.15.9's wait timer, five seeds each; R12-31), its first progress frame within one second where it runs longer
  (R12-32), a size above the measured limit taking V02 §6.4's fallback (b), named.

**CI tiers (§13.8).** PR: T-V2-1 – T-V2-21, T-V2-25 – T-V2-28, T-V2-30 (B-MASS against the compiled V11 templates),
T-V2-33 – T-V2-35, T-V2-37 – T-V2-43, T-V2-54, T-V2-56, T-V2-57 and T-V2-58's B-MASS clauses on B-MASS and B-PLAN
(≈ 60 s), and T-V2-55 on 20 seeds per rung. Nightly: B-CITY bars (T-V2-22, T-V2-29, T-V2-30, T-V2-32), T-V2-36 from
M6-U, T-V2-55's full bench, T-V2-58 on B-VILLAGE's rich fixtures, the harness at N = 2 000 (T-V2-31), B-EDIT at 10⁴
with the new kinds. Milestone: METROPOLIS and population-cap runs, exports and their ten-second timings (T-V2-22,
T-V2-24), the harness at N = 20 000, the owner's panel.
=== END ===

=== REPLACE ### 7.8 Ruin and disaster on the exterior ===
### 7.8 Ruin and disaster on the exterior

**Fixtures.** A **damage sub-fixture** of B-MASS: a `dwelling-detached` house, an `inn-compound` round its court, a
manor with towers and a turret, a stepped temple with its shrine and solid tiers, a terraced palace, a deck building on
a bridge, a solid stepped monument and a `hovel`, each with its plan derived (V03), drawn at decay levels 0, 0.1, 0.2,
0.3, 0.5, 0.75 and 1 (V06's level, set by the building's existence state and years, in stone and in timber), then
restored from 1 to 0 by a `repair` Works — the manor then extended by a wing (`extend`) — and each once with no plan in
force; and the house once burned (`burn`), its shell charred. A **look fixture** on B-CITY-lite's TOWN and CITY seeds
and B-VILLAGE's VILLAGE seed: a fire, a flood and an earthquake, each a calamity carried by V08's port with its linked
`reconstruction` condition (V08 §3.16 (7) (b)), whose map row then reads `disaster` (V11's map rows), at severities 0,
0.5 and 1, the condition's `sinceWeek` 10 and `untilWeek` 20; on one seed a rebuild's `repair` Works beginning in week
18 on half the struck buildings and a `decay` Works on two others, and a second calamity with its linked condition
overlapping the first; the same documents with Show crises `off` and with no condition; and the `disaster` preview on a
standalone document and on the rebuilt seed, its units holding buildings under the rebuild's Works.

* **T-V2-59 the exterior agrees with the plan** (item 123 (d), (f); takes T123-5 and T123-7's exterior clause) — on the
  damage sub-fixture at every level and every restoration step: (a) the holes are exactly the plan's damaged roof bays
  over rooms (ring for ring after the clip to their wing's facets), the gaps exactly its broken outer runs of each
  wing's lowest storey (span for span) and the patched rings exactly its repaired roof bays — none drawn where the plan
  shows the element intact; (b) on each building while `decayed` or `ruined`, the burned house's charred shell among
  them, no roof facet is drawn over a wing roofed `none` and every roof bay over a room of such a wing is damaged
  whatever its threshold (§2.6 step 7); (c) the holes and gaps at a higher level contain those at a lower, and the
  restoration removes them in reverse threshold order, each repaired bay patched and each repaired run drawn whole, the
  wing the `extend` then adds drawn as built, never patched; (d) at level 0 before any decay every tile byte-identical
  to the same fixture without item 123 (T123-7's no-op) — the `item123.damage` registration of the damage sub-fixture's
  exteriors on V12 §3.7.8's engine (V12 §2.13), written by the seat landing V02's item-123 exterior step (M6b, V02
  §8.6); (e) with no plan in force the massing reading — no hole, no gap — and, the plan then derived by a click and by
  V03's `view`, the same holes and gaps as from the stored plan; the plan then evicted from the elaboration cache, the
  building's damage marks re-emitted at the massing reading and its cached tile redrawn without them; a week step that
  moves a building's level without crossing a threshold re-emitting none of its marks, and one crossing a threshold
  re-emitting that building's alone; a plan derived while the building stood, the building then abandoned by an epoch's
  `vacate`, stays in force with its `wings` and `rooms` rungs `current`; (f) the model digest, every `MassingRef`, wing,
  stored composition and stored plan, and the saved bytes identical with the damage drawn and not, across a save and
  load and an undo and redo of the restoring epoch; (g) the glTF, OBJ and CityJSON exports byte-identical at every
  level, and an SVG at the neighbourhood band carrying the holes in `sem.building.roof.hole` and the rubble in
  `sem.building.rubble`, the outline open over each gap.
* **T-V2-60 a disaster's ruined look** (item 122; takes T122-1 and T122-7's `item122.crises` registration on the look
  fixture's exteriors) — on the look fixture: (a) every building of every unit `disasterDistricts` returns (V07's ends
  at VILLAGE) draws the look in exactly the weeks it stands (10–19; 10–17 on a building whose rebuild's Works begins in
  week 18) and no building outside those units does — at the element reading its holes and gaps equal its plan's damage
  at the higher of its own level and the look's, at the massing reading the toned roof and the dashed outline; (b) the
  model digest, every wing, `MassingRef`, stored composition and stored plan, and the saved bytes identical with Show
  crises `follow`, `off` and a preview and in every week; (c) with Show crises `off`, every building's exterior
  byte-identical to its drawing under no disaster look (its own decay alone), and with no condition and no preview every
  tile byte-identical to stage 3 without item 122 (the `item122.crises` no-op — the `item122.crises` registration of the
  look fixture's exteriors on V12 §3.7.8's engine (V12 §2.13), written by the seat landing V02's ruined-look step (M6b,
  V02 §8.6)); (d) from week 18 a building whose rebuild's Works began draws that Works' stage and not the look (V06's
  `crisisLookYields`), and a building under a `decay` Works keeps the look; the `disaster` preview on the rebuilt seed
  in week 18 draws the look on every building of its units, those under the rebuild's Works included (a preview never
  hands over); a building also really decayed drawn at the higher level; in week 20 every element in its real state,
  none patched by the look; (e) a viewer whose knowledge key withholds the condition sees the look on no building; (f)
  the fire's buildings blackened (the `fire` pattern), the flood's and the earthquake's not (`flood`, `scatter`); of two
  overlapping looks the higher level drawn; (g) one building's holes and gaps identical across two views, at the
  district and neighbourhood bands and in an SVG and a PNG export; over a cached district-band tile of a struck
  district, Show crises switched `off` and back, a preview started and ended, and View as set to a key that withholds
  the condition, the struck buildings' damage marks re-emitted and the tile redrawn after each, and the week step 17 →
  18 re-emitting exactly the buildings whose rebuild began; (h) the stepped temple, the deck building, a tower and a
  solid monument take V02 §3.18 (e)'s outcomes, and an underground building draws none of it.

**CI tiers for these:** T-V2-59 in the PR tier on the damage sub-fixture (≈ + 4 s); T-V2-60 in the PR tier on
B-CITY-lite's TOWN seed (≈ + 6 s) and nightly on every seed of the look fixture; both at the milestone on B-CITY
METROPOLIS with V02 §6.6's measurement.
=== END ===

=== REPLACE ### 8.6 Ruin and disaster in the build (items 123, 122) ===
### 8.6 Ruin and disaster in the build (items 123, 122)

| milestone | content | exit (executed) | est. |
|---|---|---|---|
| **M6b**, added — the exterior's damage at the later of M6b and V03's item-123 plan step (V03 §8); the ruined look with it, once item 122's base parts (M3b) and V01's `disasterSource` and `disasterDistricts` (M5) stand | `exteriorDamage` in the generation worker and its damage marks with their re-emission (V02 §5.7 (8)); V02 §5.7's drawing in every shipped family — the holes, gaps, rubble and patches, the massing reading's tone and dash, the fire's blackening — the SVG semantics and the export rows of V02 §5.5; V02 §6.6's memo; the pin registrations of T-V2-59 (d) and T-V2-60 (c) | T-V2-59, T-V2-60; V02 §6.6 measured | + 0.5–1 pw |

Until V03's item-123 step lands no plan carries a damage layer, so the element reading draws nothing and the massing
reading stands; until V06's decay level lands (M6-E) the level is read from the existence state alone at V11's default
age (V06); at THORP, HAMLET and VILLAGE the look's units wait for V07's ends (V07 §8).
=== END ===

=== REPLACE ## 13 Fix list ===
## 13 Fix list

**Nothing of this volume's own is open**: every finding against it is fixed in its text. The rows below are its
hand-offs — each a rule another unit carries, closed at that destination, which cites this volume. Where V02 reads a
stand-in while the destination's part is not yet built (a build-order fact, not an open choice), the last column names it.

| # | to | what the destination carries | stand-in before it is built |
|---|---|---|---|
| X1 | V11 §2.3 | `BuildingClassRow.templateFamily` is read by S11's composition resolution (V02 §3.2) and the tables editor | — |
| X2 | V11 §3.6.1 | the compiler emits `footprintM2` p10 and p90 by the derivation ratios 0.7 and 1.45 × p50, which V02 mirrors as its fixed `sizeBandLo` / `sizeBandHi` (V02 §3.10.9) | — |
| X3 | V11 §3.6.1 | the `manor` template override: prosperous p50 420 m², rich p50 650 m², rich plot 3 000 m², main-slot share ≥ 0.6 at prosperous and rich (J-V2.35; J-V11.39) | — |
| X4 | V11 §3.6.5 | the role table's `footprintShare` per structure | `mainShareDefault` 0.6, the rest equal |
| X5 | V11 §2.8, V11 §3.6.4 | the `attic`, `parapetCm` and `towerStoreyCm` columns and their values (items 427, 435); V02 §3.10.6 keeps only the reading rule | — |
| X6 | V11's naming tables | the slice `building.wingRole`, our own word per `WingRole` (V02 §5.4), with "a tier", "the shrine", "a stair", and "the seating" and "a gate passage" keyed by the `ovalCourt` family and the wing's `solid` flag | the role id |
| X7 | the base, §10.2 (item 436; V11's rows) | the class columns `crypt` (`always`, `basement`, `never`), `cryptM2` and `rankShare` that §2.6's crypt derivation reads | built with M6-U; T-V2-36's crypt clauses run from it (V02 §8.1) |
| X8 | V06 §3.4 | the epoch casters rasterised **per wing** (each wing's prism and roof rise, V02 §3.14.1); W10 "called through the mutator" | — |
| X9 | V08 | `MaterialRow`'s rows are V11's, and `materialFamily` reaches the material row only (V02 §1d) | — |
| X10 | V09 | the `FM` building look in the style panel; tool rows for `setComposition room`, the secondary porch and `moveTower { shape }`; the `fantasyShapes` control in the advanced panel (V02 §4.4–§4.5) | the ops through the clerk and the skeleton file |
| X11 | V03 | the plan reads wings by key (item 225); unedited dormer rows follow the plan's roofed rooms and edited rows stay fixed (V02 §3.7); the choir stairs over the raised crypt's lift; the room role `gatehall` in V03's role table | — |
| X12 | V04 | the dig draw's key carries the wing key for a wing the mutator adds (V02 §3.9 W6); item 109 (k) (5)'s obstacle test reads V02's footprint and basement floor (V02 §3.14.5 (f)) | — |
| X13 | V07 | every `v.` row names a V11 §3.6.1 `templateFamily` for its budget rows (J-V7.82, J-V7.101), read at the chain's step 4 after `composition.classFamily` (V02 §3.10.5), which is the one source of the village classes' composition keys | — |
| X14 | V01 §7, V01 §5.1.2 | the NG parity sheet's rule for its roof construction (V02 §5.3 supplies `roofscape`); the `hatched` hatch program run per roofscape facet | `fakeGablePerWing` |
| X15 | V05 | the island rim-slab crypt vault as the island form of the `always`-crypt ladder (V02 §3.14.5 (d)) | — |
| X16 | V11 | the `deck` table (`DeckBudgetRead`: `footprintM2`, `maxFloors`, the plot fields the base's deck plots read) by deck kind × band; `deckOk` read **per use**, false for an `always`-crypt class and for a use a dossier crypt record binds (V02 §3.16 (6)); V09's T6 landward bend for a hand placement | without `deckOk`, every class the base places on a deck plot composes by its `@deck` row |
| X17 | V11 §3.24.3 | the specialisations of V11 §3.24.3 (culture × class rows: `stepped_temple`, `terraced_palace`, `tiered_tower`), each naming its composition key in `DesignationTemplateRow.composition` (item 426, written by item 259's replacement), with their chance and cap rows (≤ 0.1 % of buildings), the culture read through DR15; no tier geometry cell in V11 (J-V2.62) | only a declared class and the `family` op reach `stepped` |
| X18 | V03 | plans of tiers: levels by `storeyRange`; no rooms in a `solid` wing; a landing door on `landingSide` for every storeyed wing standing on another; the shrine one room by its programme; item 230's root (a solid stack's main entrance at the stair's foot, the plan rooted at the first landing door, no plan above the ground without a storeyed wing, its basement storeys and access heads still planned); `W_TIER_UNREACHED` for a storeyed wing on a sealed stack; `floorCm` from each tier's ground and upper storey heights (J-V2.85); `Storey.level` 0 the lowest storeyed level (item 371); chimneys carried up through the tiers with `Chimney.levels` reaching the top wing (V02 §5.2); the crypt inside a solid tier 0 entered at its own floor by the door at `basementDoor(b)` (V03 §3.7.1); the arena's façade ring planned, the seating ring not; no basement on a deck; the bank quay's cellar by the ordinary gate; the walk-out door where a retaining wall is the plot's low edge | — |
| X19 | V04 | a ruin's stepped monument laid by `layTiers` with the `stepped-monument` row at its ancient-culture band, on its ruin stream, decayed by its persistence order; the vaults under raised ways are V04's (item 110 (b)) | — |
| X20 | V05 | the caster ceiling reads the stack's envelope (V02 §3.15.2); an island palace or temple may take a stepped row; its crypt is the rim-slab crypt vault under the building's lowest massing tier, inside underside tier 0 (the rim slab; J-VI.7) | — |
| X21 | V09 §4.9, V09 §4.20.5–V09 §4.20.6 | T9's tier controls (V02 §4.6 (7)) emitting `setMassing { op: 'tiers' }` and `setAttr`; the deck-plot badge reading V11's row; one catalogue row, with its words and buttons, per bend id of V02 §1b; no structural refusal (item 101 R2) | the ops through the clerk and the skeleton file |
| X22 | V10 | the clerk's tier calls and V02 §4.6 (7)'s why facts (`massing/bend/<id>`, `stack.grade`, the derived aspect); each bend said by its line and alternatives, never "cannot" | the events |
| X23 | V06 | tiers added or removed over epochs by V02 §3.15.5's rows; deck buildings falling with their deck by the base's fate rule, and deck-plot buildings at an epoch through S11's capped mutator (V02 §3.16 (3)); a solid monument never re-roofed; a stack's Works in stack order, solid wings by courses (item 318); an epoch's raised way clearing every building meeting its supports or strip (V06 §3.19 (7), cause `clearance`; V02 §3.17 (b)); `rebaseStack` on an epoch's terrain change | — |
| X24 | V01 §5.1.2 | the `hatched` family draws a stack in its order and hatches `stairFlight`'s treads by `stairTreads` (V02 §2.6) | the per-wing constructions' stack order and treads (item 419) |
| X25 | V12 | the second known-city fixture's golden and own bars; V02's bars on it are T-V2-42 (the arena), T-V2-44 – T-V2-47 and T-V2-51; the fixture declares its arena's precinct (60 × 50 m or larger) and its temple's precinct (V02 §3.10.3's receipt hints) | — |
| X26 | V07, V11 §3.24.3 | a village class takes tiers only through V11 §3.24.3's culture × class specialisations applied to the `v.` class that plays the row's class, under V07's `rules.tiers.capPerSettlement`; none by default; a village's piers and bridges take deck buildings by the `@deck` rows and V07's deck cell | — |
| X27 | V11 §3.6.1 | the `arena` template override: plot p50 2 500 / 4 000 / 6 000 / 9 000 m² (own; the historical amphitheatres' 1 400 – 11 000 m² hulls), footprint "the claim's" (so `slotBand` reads the `arena` row's `claimShare` .5–.8), main share 1, its `gate` structures absorbed as M5's passages; read with V02's `arena` family row (V02 §3.10.2) | — |
| X28 | the base, §2.7 (item 246) | the deck-plot record's `landmark` (a mole's head and mid-mole slots, and on a bridge whose deck span reaches V11's `deck.landmarks/bridgeMid/minSpanM` one mid-span slot), which S11 copies to `DeckContext.landmark`; no deck plot on a `ford`, a `draw` bridge or a bridge without `deckCm`; a quay platform on the bank flagged ground (`DeckContext.surfaceCm` null) | — |
| X29 | V04 | the chamber record gives its ceiling (an arch vault's soffit), which M11's `vaultClamp` reads for a building on the underground layer; the ruin stage calls `drawTiers` and `layTiers` alone with `TierCells.heights`, `plinthCm` 0, `parapetCm` 0, `scale` 1, and handles a `TierFailure` | no clamp (the `@underground` rows' one flat storey) |
| X30 | V03 | W2 lays windows by `facadeBays(wing, side, bayM)` on every side (a tower's round its free perimeter, V02 §3.7); V03 §3.7.4 step 1 places the crypt under `cryptSeedWings(b)`, else the far third of the region from the main entrance; exterior flights by `stairTreads`; T-V3-25 carries the poor manor's three-units clause; the half cellar's floor at the datum less half the depth | — |
| X31 | V01 §3.17.3 | the stair-flight hatch reads `stairTreads`; the raised way's add path clears the same set of buildings V02 §3.17 (b) clears | — |
| X32 | V11 §3.6.5 | the role table's `gate`, `charnel house`, `mortuary chapel` and `lychgate` shares feed M10 as written | — |
| X33 | V12 §2.1 | the metric family `bar.<barId>` (J-V12.65), which V02 §3.10.10 names as `bar.T-V2-<n>`; V02 registers its bars there (the `BenchBarDef` table, each written by the seat landing its line's milestone) | — |
| X34 | V03 | the damage layer V02 §5.7 reads for the plan in force: each roof bay over a room (its ring) and each outer wall run of a wing's lowest storey (its span), each intact, damaged or repaired at a level (repaired by V06's per-element `decayPeak`, an element that entered the plan after its building's damage left drawn as built, V03 §5.6 (2) (b)); every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while the building is `decayed` or `ruined` (§2.6 step 7), damaged, so the plan agrees with the roofless exterior (T-V2-59 (b)) | the element reading draws nothing (the massing reading) |
| X35 | V01, V07 | `disasterSource` and `disasterDistricts` (V01 §3.16): the districts a disaster strikes — for a standing condition, and for a preview of the look keyed on its look kind in the condition's stead (§10.2's placement) — and its `pattern` (`fire`, `flood` or `scatter`: the overlay's calamity's type through V06 §2.4's calamity table, `scatter` with no calamity), and V07's ends at THORP, HAMLET and VILLAGE; every building of each draws the ruined look (V02 §5.7) | no look on a building |
| X36 | V06 | `decayLevel` per lineage at a week, `decayPeak` per lineage at a week since an element's entry into the plan (V06 §3.23 (3); the entry week V03 §5.6 (2) (b) passes), and `crisisLookYields` per building, false for a preview (V06 §3.22 (3)), read by V02 §5.7 | the level from the existence state at V11's default age, nothing repaired; the look standing until its condition no longer stands |
| X37 | the base, §8.1, §8.2 and §8.8 (rendering) | the Works `decaying` row's gaps along the ridge drawn, where a plan is in force, as V02 §5.7's holes (§8.2); the drawn week in the tile key of a tile holding a building drawn under the damage layer, and `crises` and the effective knowledge key where it holds one under a disaster look (§8.8); §8.1 item 7's week re-emission carrying the buildings whose damage marks differ (V02 §5.7 (8)) | the row's own ridge gaps |

**Hand-offs received** — each closed in this volume:

| from | the hand-off | closed at |
|---|---|---|
| V06 §3.18.3 (1)–(2) | V03's rank re-runs inside each epoch op that changes the principal crypt or its building's designation; the basement re-derived with an always-crypt class | V02 §3.14.5 (c) (the crypt kept on every re-derivation, an epoch's included); the rank and the trim are V03's and V06's |
| V06 §3.8.4, V06 §3.19.5 (2) | deck-plot buildings at an epoch through S11's capped mutator | V02 §3.16 (3); X23 |
| V08 §2.6b (4) | the stepped specialisation rows keyed by culture and class, which DR15's template family reads | X17; V02 §3.2 step 1 reads the template's composition key |
| V09 XV-V9-6 | the no-refusal crypt ladder; the canvas-handle contract; X21; the bridge slot as a `DeckContext.landmark` plot; the registry path | V02 §3.14.5 (d), V02 §4.5, V02 §4.6 (7), V02 §3.16; X21, X28 |
| V09 XV-V9-8 | AP10's price with M6c | V02 §8.3's M6c row (counted on §16's line for V09's staged screens) |
| V10 CVR-V10-8 | the registry paths `deck/landmarks/<head\|mid>` and `massing/stack`; the `massing` section's item-110 rows | V02 §4.6 (7); X22 |
| V11 X-V11-5 | the S11 specialisation draw replaces the band template's `composition` and `heights` for the use (item 259) | V02 §3.2 step 1; X17 |
| V11 X-V11-9 | an oval composition key for the `arena` family | V02 §3.10.2's `arena` row (`ovalCourt`); X27 |
| V12 X-V12-2 | the panel a `PanelSpec` on V12's engine with its `'FM'` pairs and reference rows | V02 §7.5 |
| V12 X-V12-11 | T-V2-50 a `NoOpPin` on V12 §3.7.8's engine reading V11 §3.24.0's off form; T-V2-58 (f), T-V2-59 (d) and T-V2-60 (c) registered on that engine (`item115.ceiling`, `item123.damage`, `item122.crises`; V12 §2.13) | V02 §7.7 (T-V2-50); V02 §7.2 (T-V2-58 (f)); V02 §7.8 (T-V2-59 (d), T-V2-60 (c)); V02 §1b's registration rows |
| V12 X-V12-12 | §16's M3a row carrying item 110's base parts with item 229 | V02 §8.5's M3a-V2 row |
| V12 X-V12-15 | every bar a register line names registers a `BenchBarDef` | V02 §3.10.10 |
| V12 X-V12-18 | a line naming several stages is one entry with `stages` in the line's order | V02 §3.10.10 (as written) |
=== END ===

