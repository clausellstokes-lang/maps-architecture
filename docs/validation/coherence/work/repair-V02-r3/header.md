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

