# repair-r3-rendering — lane coherence/repair-rendering-r3 (unit rendering: base §8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-rendering-r3; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 4ed292e94f2442e5… (assemble-r2's output); rationale dd2bfafa96aba31b….
# Each REPLACE body is the live subsection with count-asserted substitutions — work dir
# docs/validation/coherence/work/repair-rendering-r3/: orig/ split from the live base by split.py, patches/010–100
# (49 hunks, each OLD text found exactly once), apply.py, gen_blocks.py, extra-blocks.md (the J-ROWS and RATIONALE-A
# blocks), cycle.sh (apply, generate, dry-run, doc checks), swap_restated.py (the NOTE FOR ASSEMBLE below); every
# untouched line is verbatim.
# Blocks: 12 REPLACE (§8.1, §8.2, §8.4, §8.6, §8.8, §8.11, §9.5, §11.1, §11.2, §11.3, §11.4, §11.6), 1 J-ROWS (8 rows),
# 1 RATIONALE-A (9 rows: 8 new, J-A68.89 restated). Ruling requests: 0. Binding rulings applied: adjudication-r3's
# R3-01 – R3-05, R3-08 – R3-10, R3-14, R3-16, R3-20 – R3-24, R3-27 (Part H · rendering, with its 6 END lines); R3-07 on
# this unit's side.
#
# PROGRESS
# - P0 brief read whole; adjudication-r3 (TOC, R3-01 – R3-27 as listed, Part H · rendering with its 6 END lines): done
# - P1 live §8.1/8.2/8.4/8.6/8.7/8.8/8.11, §9.5, §11.1 – §11.4, §11.6, §12.1/12.8 read whole where touched; the
#   verifiers' files (verify-rendering-r2t and the issues' other sources), V02 §5.7, V03 §5.3/§5.6, V04 §5.1/§5.5/§5.6,
#   V06 §3.15.2/§3.22/§3.23, V09 §4.21.10/§4.21.12/§5.10, V10 §2.13, V11 §3.25.9, V12 §3.15.4, §2.9, §6.3, §10.2 read for
#   the shared names; the sibling round-3 drafts (pipeline §10.2 (d), determinism §6.1, V09) checked for agreement: done
# - P2 patches 010–100: done (all 28 ids: 23 fixed, 5 merged into them; the 6 END lines written)
# - P3 blocks generated; dry run on copies, alone and with the base siblings' drafts: done
# - P4 doc checks, references, the resolution receipt re-run, size: done
# - P5 result saved; LANDED: done
#
# ISSUES → WHERE FIXED (28 routed ids; Part H: 23 FIX, 5 MERGED; none INVALID; nothing to a fix list)
#  §8.6   VAF-R2T-02 (R3-05): every roof bay over a room of a roofless wing of a `decayed` or `ruined` building drawn
#         damaged whatever its t (§2.6 step 7's one case without a threshold), and counted as reached for the repaired
#         rule once the building is `decayed`. VRC2T-13 (R3-04; closes VDC2-08): "damaged while the level is above 0 and
#         at least t — §6.3 *Plan damage*'s one comparison". VRC2T-15 (R3-08 (b); with VV56-r2-06's END): a repaired
#         element is one whose threshold lies above the own level and at or below V06's per-element `decayPeak` (since
#         its entry into the plan, V06 §3.23 (3)), until the plan changes; a look leaves no patch. VV56-r2-02's §8.6 side
#         (R3-10): a disaster's building draws the look until `crisisLookYields` turns true on it, a preview never handing
#         over, the look in the drawing only (VRC2T-06 (a)).
#  §11.1  VRC2T-06 (closes VAL-R2-07): a battle map's `line_of_sight`, portals and lights read the building's OWN decay
#         level, never a look's `lookLevel` (item 122 (f); V03 §5.3); `cellarWall` and `cryptWall` runs keep their
#         segments (V04 §5.6 (2), (5)); a broken flight below level 0 stays a portal (V04 §5.6 (3)); no room light in a
#         decay run (V03 §5.6 (6)); the image draws the drawn level. VRC2T-11 (R3-22 (a); closes VDC2-12): no input gives
#         a true bearing, the anchor's default stands and stays a user setting.
#  §11.2  VAF-R2T-06: `MapBrief.raised[].kind: RaisedKind /* §2.7 */`. VKr2-08: "(V09 §4.21.9, V09 §3.9)". VRC2T-18
#         (elegance; equivalence: `FindLayer` and §2.1's `Layer` hold the same three values with no rule, value or
#         lifecycle apart, every field keeping its place and meaning): `FindLayer` dropped, the three `layer` fields typed
#         `Layer`. VRC2T-07 (R3-24): the `gazetteer` query's `week?` and *Find's match listing*'s rule at a drawn week whose
#         frame is not the head (the head index restricted to the frame's entities). VAT-r2-05 (R3-16 (a)): the
#         view-bound reader `{ kind: 'looks'; view }` answered as `LooksAnswer` (DR43's festivals, DR44's standing looks
#         or the preview, in the legend's order), *Knowledge*'s admission for it, its call-table row (one answer,
#         ≤ 64 KB). VRC2T-12: `interface ExportOpts` declared once (every option §11.1, §8.7, §8.9 and the volumes read,
#         each with its default), with `type Format` (an exporter's id).
#  §11.3  VAT-r2-04 (R3-21 (a)): the host's "layers shown" is a logged `setLayer { layer, spec: { visible } }` sent by
#         `doc.apply`, never `view.set`; R3-21 (b): `view.set { week }` writes §2.9's `week` only. VAL-R2-02 (R3-21 (d)):
#         `depthBand` among the per-viewer keys that never cross.
#  §8.2   VRC2T-01: chip glyphs nine (ring added) by (k − 1) mod 9 against eight colours and eight dashes. VRC2T-02
#         (R3-14 (3)): on a carriageway only a `barricade`; the `blockade`'s city-band camps on the approach roads'
#         verges. VRC2T-07 (R3-24): the drawn week among `live.find`'s re-runs, the outcome at a frame that is not the
#         head; `live.crises` placed over the model the view draws. VRC2T-09: Find runs only while a chip is on, `gaps`
#         alone drawing no veil. VRC2T-10: banner glyphs five (pale added) by (i − 1) mod 5 against four colours.
#         VRC2T-17 (R3-23 (c)): the spell's kind at `yearWeek`, never the drawn week. VV56-r2-02 (R3-10; closes
#         VPC-R2-10): the disaster look leaves building by building by `crisisLookYields`, a district's `ruinTone`
#         standing while any of its buildings draws it, a preview never handing over; *The layer* reads
#         `crisisLookYields` and re-runs at a Works' start week. VAT-r2-05 (R3-16 (a)): the legend sentence. VV12-r2-06
#         (1): the Works `decaying` row's ridge gaps are V02 §5.7's holes where the plan is in force.
#  §8.4   VRC2T-05: (g) the standard surface no lawful rung on a tier that holds full precision; VAL-R2-01 (R3-23 (d)):
#         (i)'s terms off while the underground layer is drawn.
#  §8.8   VRC2T-05: the fitting order and Auto's ladder pass over the standard surface on a full-precision tier; the
#         worked cases re-run (docs/validation/bench/coh_repair_rendering_r3_resolution.{py,out}). VRC2T-08: an idle
#         view is settled — Auto's change and a DPR change applied at once while no gesture runs. VAL-R2-01: the
#         effects layer draws nothing while the underground layer is drawn. VV12-r2-06 (2): `crises` and the effective
#         knowledge key in the tile key of a tile holding a building under a disaster look.
#  §8.1   VV12-r2-06 (3): a week change re-emits the buildings whose damage marks differ.
#  §9.5   VAT-r2-05: the legend's crisis entries are §11.2's `looks` evaluation.
#  §8.11  T-ER-25 (VRC2T-01, -07, -09), T-ER-26 (VRC2T-05, -08), T-ER-27 (VRC2T-02, -10, VV12-r2-06, VV56-r2-02 and the
#         END lines below), T-ER-28 (VRC2T-06, R3-05, R3-08 (b)), T-ER-29 (VAL-R2-01).
#  §11.6  T-ER-21: the host's commands' outcome (VAT-r2-04's note).
#  J rows VRC2T-19: RATIONALE-A and J-ROWS J-A121.02 – J-A121.07, J-A122.02, J-A124.02 (the round-2 calls with the
#         alternatives they were chosen over, and the idle-settle reading); J-A68.89 restated with the re-run figures.
#
# END LINES WRITTEN (Part H · rendering)
#  G125-V08 (R3-20 (1)): the `line` sentence the END quotes (l. 16347–16349) stands in §11.4, not §11.3, and is written
#    there as given; §11.3 holds no `line` clause.
#  VEW-r2-03 (R3-14 (6)) and VEW-r2-05 (R3-14 (2)): T-ER-27's fixtures and outcomes; the footprint bar reads "0 look
#    pixels on a building footprint but the parts §10.2 (d) draws on the buildings themselves (the burned farmsteads among
#    them)" — R3-14 (2)'s "burned farmsteads excepted", in pipeline's §10.2 (d) words, so the siege fixtures' burned
#    farmsteads do not fail it; T-ER-27's "no standing enceinte" reads "no standing town enceinte" (R3-14 (2)).
#  VPC-R2-03 (R3-09 (e)): T-ER-27's fire, flood and earthquake by their calamities with their linked `reconstruction`
#    conditions (V08 §3.16 (7) (b)).
#  VV56-r2-06 (R3-08 (b)): inside VRC2T-15's sentence.
#  ADJ-r3-02 (R3-27): §8.2's greyscale bar cites V12's `BenchBarDef` T114-6, its statistic `bar.T114-6`, V12 §3.15.4.
#
# NOTES ON THE TEXTS (where a ruling or the set's homes shaped a required change)
#  1. T-ER-21's outcome (VAT-r2-04's note) is written in the note's words with its inner ";" as "—", so the outcomes stay
#     aligned one-to-one with the row's semicolon-separated inputs.
#  2. `LooksAnswer.crises[]` carries `name?` (the condition's dossier name) beside VAT-r2-05's members, so V10's
#     `LookAnswer.crises.looks[].name` projects from it as R3-16 (a) asks and V09's why lines read one evaluation.
#  3. `ExportOpts` (VRC2T-12) types what the set already reads: `knowledge`, `find`, the frame, size (scale and DPI),
#     layers and the sheet's look through `view`, and the format options §11.1 and the volumes name (`text`, `lighting`,
#     `anchor`, `trees`, `exportWhy`, `compositions`, `interiors`, the plan block's numbering, the APNG stride, the VTT
#     grid, scene and plain picture), plus `week` (V06 §5.3: every export draws the drawn week) and `displayNames`
#     (§11.4's one export request); each default is its home's, or V09 §5.10's dialog default. `Format` and
#     `ViewHandle`, used and declared nowhere, are declared beside `DocHandle`.
#  4. VRC2T-05: only a tier whose GPU pass misses §13.4's tolerance on the standard surface holds full precision
#     (§8.4 (g)), so item 121 (e)'s order is kept as written and its first lighting step is passed over there, as a step
#     that frees nothing; the receipt confirms no fitted frame of such a tier lies on the standard surface.
#  5. R3-16 (a)'s "by its row's `label`" is V11 §3.25.9's column (the rows carry `label`; V09 words each look by it);
#     §10.2's `CrisisLookRow` declaration lists no `label` (HAND-OFF to pipeline).
#  6. This unit's side of R3-07 (no END line named it; R3-01 (3)): §8.6's "the plan it was built with, never a
#     re-derived one" read "the one it was last lived in, never re-cut (V03 §3.11's *Decay re-cuts no plan*)", and "the
#     built plan's" ids "the plan in force's".
#  7. This unit's side of VDC2-02 (determinism's): §8.2's weather marks keyed "by the spell's entity key, from its index,
#     folded with the frame's world-aligned cell — §6.1's `view.weather` row".
#
# NOTE FOR ASSEMBLE (one restated row; assemble-r1's swap rule, script work/repair-rendering-r3/swap_restated.py)
#  RATIONALE-A's last row restates the existing Part A entry J-A68.89 (its worked clause in item 121's split composition
#  and the full-precision rule; its judgment-index row is unchanged): after the blocks apply, the appended row takes the
#  older row's place (rationale l. 689 on the live file) and the older row is deleted. The script stops unless J-A68.89
#  occurs exactly twice in Part A. Dry run: Part A 805 rows, the index 805 rows, one id set, no duplicate.
#
# HAND-OFFS (R3-01 (3): ends no END line names, for round 4's verifiers; none is open wording in the design text)
#  * scope: §14's `Exporter` registry and the `HostContext` item cite §11.2's `ExportOpts` and `Format` (VRC2T-12's end).
#  * V08: W81 and §3.14's party pictures cite §11.2's `ExportOpts` (VRC2T-12's end).
#  * pipeline: §10.2's `CrisisLookRow` declares no `label`, which V11 §3.25.9's rows carry and §8.2's legend and V09 read.
#  * The volumes' ends of these fixes are their own END lines in Part H (V01's crisis services over the drawn frame,
#    V04 §5.1's citation of §8.8's underground rule, V09's chip glyphs, `looks` reader and week, V10's `Layer`,
#    `LooksAnswer` projections and `read_map find`'s week, V08's and determinism's host commands).
#
# JUDGMENT CALLS (vetoable; J122 where new design): the eight J rows below — J-A121.02 – J-A121.07, J-A122.02,
#  J-A124.02 — record round 2's calls and this round's idle-settle reading (J-A121.07); the ninth glyph (a ring) and the
#  fifth banner (a pale) are VRC2T-01's and VRC2T-10's own shapes.
#
# SIZE (principle (9)): §8, §9, §11, §12 91 201 → 94 018 words (+2 817, +3.1 %): §11.2 +1 125, §8.11 +656, §8.2 +347,
#  §8.8 +249, §8.6 +153, §8.4 +101, §11.1 +92, §11.3 +59, §8.1 +14, §9.5 +13, §11.6 +11, §11.4 −3. Removed: restatement
#  (the `FindLayer` type and its comment; the inline `RaisedKind` union; the damage comparison, the bearing rule and the
#  disaster look's end restated wrongly, each now one clause citing its home) and verbose prose (the geo anchor's
#  sentence). What holds the growth is content the issues require: the `ExportOpts` typed home with `Format` (≈ 680 words), the
#  `looks` reader and `LooksAnswer` (≈ 250), the edges and bars of T-ER-25 – T-ER-29 (≈ 650), the hand-over, frame and
#  full-precision rules; no content was thinned. The rationale grows by 9 Part A rows and the index by 8.
#
# CHECKS (scratch: scratchpad/coherence/)
#  * apply.py: 49 hunks, each OLD text found exactly once; gen_blocks.py: 12 REPLACE blocks + the J-ROWS and RATIONALE-A
#    blocks.
#  * apply-blocks.py on copies of the live files: 14 found, 14 applied, 0 skipped; audit not OK 0; headings 153 → 153;
#    fences balanced (140 → 140); title block unchanged; the one note the expected J-A68.89 duplicate, settled by the
#    swap above (Part A 805 = index 805, no duplicate). With the base siblings' drafts present at the time
#    (repair-r3-determinism, -model, -pipeline): 30 applied, audit not OK 0; no sibling block touches §8, §9, §11 or §12.
#  * doc_checks.py --sections 8,9,11,12 before / after (hits / unreviewed): C1 5/0 → 5/0, C2 1/0 → 1/0, C3 188/0 →
#    189/0, C4 3/0 → 3/0, S1 0/0 → 0/0, S2 208/0 → 227/0. WARNING printed both times: reference corpus incomplete
#    (captures, research/patreon, research/devlogs, research/ftg-docs, research/external absent) — clean-room results
#    NOT authoritative; provisional. Six C3 runs of ordinary English in the new text were reworded away.
#  * Every new reference resolves (V09 §3.9, V02 §5.7 (8), V03 §5.3 / §5.6 (2) (b)–(c) / (6), V04 §5.6 (2), (3), (5),
#    V06 §3.15.2 / §3.22 (3) / §3.23 (3), V09 §4.21.10 (10), V09 §5.10, V11 §3.25.9, V12 §3.15.4, §7.1's T12 `dress`,
#    §7.4's `setLayer` row); no adjudication or issue id in the design text; no deferral wording; no phone clause.
#  * The resolution receipt re-run: coh_repair_rendering_r3_resolution.out (1) every case on a tier that passes the
#    tolerance and on one that holds full precision; (2) the full-precision steps of the reference viewport and the
#    low-end device; (3) no fitted frame on a full-precision tier on the standard surface: True.
