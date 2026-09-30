# Verify — pipeline part, consistency pass round 1 (§4, §10, PART II, PART III)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-pipeline-r1`, 2026-09-26. Status: COMPLETE. Re-verifies the pipeline part of
`docs/ARCHITECTURE.md` after repair round 1 — `## §4 Generation pipeline` (l. 2504–3916), `## §10 Simulation and content
layer` (l. 6620–6791), `# PART II` with `## II.1`–`## II.6` and `# PART III` (l. 8903–9171) — against the archive
`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`, `inventory-pipeline.json` (449 items + 10 internal conflicts),
`canon.json`, `rewrite-pipeline.md`'s mapping table, the six `repair-r1-*.md` files, `assemble-r1.md` and this lane's
earlier report `verify-pipeline-r0.md`.

## 1. Outcome

Round 1 fixed everything it was asked to fix in this part and broke nothing that was already right; three small new
pointer and duplication problems remain, all **minor** and all this part's to fix.

* **The eight round-0 issues — all FIXED.** The pipeline repair fixed its five (P0-1, P0-2, P0-6, P0-7, P0-8 — the same
  findings as VR-R0-11, VK-R0-11 and V-MODEL-12), and the other lanes fixed the three routed to them (P0-3 at §7.6, P0-4 at
  §12.4, P0-5 at §7.7). Each was checked at its new text (§5).
* **Open items owned by this part — still FIXED:** NP5-1, NP5-2, NP5-3, NP5-4 and VD5-6; round 1 touched some of their
  places and every one still holds (§6). **UNFIXED: none.**
* **Round 1's footprint in this part is exactly five hunks** (9 lines out, 11 in, +368 bytes), one per repaired finding;
  §10, PART II and PART III are byte-identical to round 0 (§2).
* **New issues (3, all minor, owner pipeline):**
  * **P1-1** — the contour clip is now stated twice. The rendering repair made §8.2, the canon's home, state it, and §4.2
    S1 (2) still states it in full.
  * **P1-2** — §4.4 S5d cites §5.2 for its "on ≥ 95 % of seeds" bar, but round 1 reduced F-BUDGET-STAGE's test cell to a
    pointer to §13.2. §13.2 states the whole sweep again.
  * **P1-3** — §4.8's castle acceptance cites §5.2 for MFCG's 178 / 11 census baseline, but round 1 reduced F-CASTLE's
    test cell to a pointer back to §4.8.
* **Scans:** the part holds no "PENDING FABLE REVIEW" line, no fix-round tag, no round narration and no deferral
  wording. Its "later" and "open" occurrences are the same lines as before round 1.

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution:
* the pre-repair document was rebuilt byte-identically (both sha256 match `assemble-r1.md`);
* the whole-document and part diffs;
* the 64 target checks (script greps of each reference target in the new text);
* the anchor, judgment-pointer and rationale-F.3 checks, and the scans;
* each issue's evidence (quoted lines).

PLAUSIBLE (reading only): that no hunk in another part changes the meaning of a fact this part points to beyond the
cases named in §8 (every hunk was read once, with no second reader), and observations O-1 and O-3 (§9).

## 2. What round 1 changed in this part (receipts)

* **Before and after.** `python3 docs/validation/consistency/assemble-r0.py` rebuilt the pre-repair document into this
  lane's scratch directory. Its sha256 `ee314f23…afed175` is `assemble-r1.md`'s "before". The landed document's sha256
  `ddd48f07…ebb1` is its "after". The whole-document diff has 115 hunks, 258 lines out and 290 in, as assemble-r1
  reports.
* **This part:** 1 852 → 1 854 lines and 201 055 → 201 423 bytes. `diff` shows exactly five hunks, all from
  `repair-r1-pipeline.md`:

  | hunk (new lines) | subsection | finding | change |
  |---|---|---|---|
  | l. 2669–2671 | §4.2 S1 (2) Simplicity | P0-7 = VK-R0-11 | "from its straight skeleton" → "the clamp reads it through `skeleton(rings, 'spine')` (§3.4) as §3.8's `spine` reader, with its sampled-medial-axis downgrade" |
  | l. 3172–3174 | §4.5 Grower | P0-2 | "A district's faces and their containment are §2.5's (O11 b)." → the archived rule restored with pointers (§2.5, §3.3 pool step 3, `parent` §2.8, §5.3's containment row) |
  | l. 3595–3597 | §4.8 Water furniture | P0-6 | the moat-deck parenthetical → "(§4.2 S3 (2), (10))" |
  | l. 3687 | §4.9 table, "trees at render" | P0-1 = VR-R0-11 | "§8.10's ranked tile stamp … or a jittered grid (orchards 6–8 m, avenues and hedgerows 8–12 m)" → "§8.10's layouts — … a jittered grid for orchards (6–8 m), a jittered line for avenues and street trees (at their rows' spacings above) and for hedgerows (8–12 m)" |
  | l. 3767 | §4.11 `ConversionOp` | P0-8 = V-MODEL-12 | `build.footprint?: Polygon` → `footprint?: PolygonCm /* as §7.1's build event */` |

* **No number was lost.** Every number in the old hunks is in the new hunks. The new numbers are section numbers,
  "(2), (10)" and the restored "100 %". The identifiers the hunks add are `FaceRef`, `faces`, `parent`,
  `skeleton(rings, 'spine')` and `spine`. The rest of the five replaced subsections (§4.2, §4.5, §4.8, §4.9, §4.11) is
  byte-identical to round 0.
* **Cosmetic only (not an issue kind).** The repair did not rewrap two lines: l. 2671 is short and l. 3597 is 147
  characters. `doc_checks` passes (assemble-r1 §4).

## 3. Method

1. **Scope of the re-check.** 233 of the 459 records were re-checked:
   * every id whose home lies in a replaced subsection of this part (§4.2, §4.5, §4.8, §4.9, §4.11);
   * every id whose reference target, or the source it cites, lies in a subsection another repair replaced (§2.1, §2.2,
     §2.5, §2.9, §3.2–§3.4, §3.6–§3.10, §5.2–§5.4, §6.1, §6.2, §6.5, §7.1–§7.4, §7.6–§7.8, §8.1–§8.3, §8.9, §8.10, §9.5,
     §11.2, §11.3, §12.2, §12.4, §12.6, §12.8, §12.9, §0.2, §13.1, §13.2, §13.7, §16, the Judgment calls index);
   * the eight round-0 issue ids;
   * the conflicts whose places round 1 replaced.

   The other 226 keep their round-0 verdict, which `verify-pipeline-r0.md` §8 cites.
2. **Every hunk of the whole-document diff was read** and judged for its effect on this part's statements and pointers
   (§8).
3. **Target re-reads.** A script (`checks.py` in the lane's scratch directory) cut each target subsection out of the new
   document and checked that the stated fact is present: 64 checks, 0 missing. The texts were then read where the
   meaning mattered.
4. **Anchors.** Round 1 changed no heading line and no numbered-list marker in the whole document (312 markers compared).
   So every sub-anchor this part uses ("§3.3 pool step 3", "§7.3 (b) 2", "§2.2 rule 7", "§6.5 (9)" …) still names the
   same item. The part's distinct §-references went from 176 to 177. The only new ones are `§2.8` and `§3.8's`, both from
   the repair, and both resolve. The table-row anchors all exist: §7.3's S6, S7, S12 and carve rows, §5.3's deck and
   containment rows, §8.2's treatment row and §4.1's S5 row.
5. **Judgment pointers.** The part cites 55 J ids, and each has an index row and a Part A row. The rationale file's F.3
   still equals `rewrite-pipeline.md` §9 (34 non-blank lines, 0 missing). The scope lane's direct edit touched only J-DET-36
   and the F.2 heading.
6. **Scans** (the part): 0 "PENDING FABLE REVIEW". There are no fix-round tags: the only pattern match is `COV-NG-VS27`,
   an audit coverage id that is kept as round 0 kept the audit ids. "later" occurs 25 times and "open" 16 times, the same
   lines as before round 1 except the rewrapped "for an open arm". There is no TBD, deferred or "to be decided".

## 4. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| P1-1 | minor | new-problem | pipeline | **The contour clip is now stated twice.** §4.2 S1 (2) (PIPELINE-066, l. 2677–2679) still states it in full: "contour lines are not model geometry: they are extracted per render tile and **clipped to the land faces in vector space before emission** (§8.2), so a contour never crosses the shore …". Round 1's rendering block (VR-R0-7) made §8.2's relief tier state the same clip (l. 5722–5723): "… and clipped to the land faces in vector space before emission, so no contour crosses a shore (F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2))". The canon homes this fact at §8.2 (PIPELINE-066 → RENDERING-084; inventory: "state it there once and replace the text here with a pointer"; pipeline note R-4 asked for it). The values agree. `repair-r1-rendering` and `assemble-r1.md` §5 left the §4.2 line to pipeline. | §4.2 S1 (2): keep the coast construction (PIPELINE-065, homed here) and make the contour clause a pointer: "contour lines are not model geometry: their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2), so a contour never crosses the shore, cliffs and sub-cell spits included (steep-coast and cliff fixtures in the golden suite)". |
| P1-2 | minor | broken-reference | pipeline | **§4.4 S5d cites §5.2 for a bar §5.2 no longer states.** §4.4 S5d's test (PIPELINE-187, l. 3124–3125) reads "B-CITY sweeps `wealthLevel` ∈ {0, 0.5, 1} and asserts population ± 5 % (on ≥ 95 % of seeds, §5.2) and the walled share inside its rung band". The clause was unioned from F-BUDGET-STAGE's test cell. Round 1's determinism block (VDC-17) reduced that cell to "§13.2's B-CITY `wealthLevel` sweep" (l. 4013). The citation therefore leads §4.4 → §5.2 → §13.2, and §13.2 states the whole test again (l. 7690–7691: "population ± 5 % on ≥ 95 % of seeds, walled share in band"). The canon holds this one test as two facts — PIPELINE-187 homed at §4.4 S5d and SCOPE-184 at §13.2 — while its rule R9 homes a test stated in §13 and elsewhere in §13. The values agree. | §4.4 S5d: "**Test:** §13.2's B-CITY `wealthLevel` sweep", as F-BUDGET-STAGE already points (R9). If the owner prefers to keep the statement here, drop the stale "§5.2" ("… (on ≥ 95 % of seeds) …") and make §13.2's sweep a pointer to §4.4 S5d. |
| P1-3 | minor | broken-reference | pipeline | **§4.8 cites §5.2 for a baseline §5.2 no longer states.** §4.8's castle acceptance (PIPELINE-295, l. 3590–3591) ends "(0 ways through reservations; MFCG's census baseline of 178 equalise passes and 11 bloats, §5.2)". Both clauses were unioned from F-CASTLE's test cell. Round 1's determinism block (VDC-10) reduced that cell to "§4.8's castle acceptance; O8 (d)" (l. 4015). §5.2 no longer states the baseline, and its cell now points back here. (Read generously, "§5.2" can name F-CASTLE's equalise and bloat rungs, which it still lists — hence minor.) | §4.8: drop the trailing "§5.2" — "(0 ways through reservations; MFCG's census baseline of 178 equalise passes and 11 bloats)" — or name what §5.2 holds: "… 11 bloats of F-CASTLE's equalise and bloat rungs (§5.2)". |

## 5. The eight round-0 issues, re-checked

| r0 issue (also raised as) | fixed by | where, now (quoted) | verdict |
|---|---|---|---|
| P0-1 (VR-R0-11) | repair-r1-pipeline | §4.9 "trees at render" (l. 3687): "instanced by §8.10's layouts — the ranked tile stamp for areas (woods, gardens, parks, copses: wood 3–5 m, garden 4–6 m), a jittered grid for orchards (6–8 m), a jittered line for avenues and street trees (at their rows' spacings above) and for hedgerows (8–12 m)". §8.10 (l. 6236–6240) lays a stamp for areas, a grid for orchards and a line for avenues, street trees and hedgerows. The spacings are unchanged: avenues 8–12 m and street trees 10–14 m are their rows', and orchards and hedgerows are as archived. | FIXED |
| P0-2 | repair-r1-pipeline (Fable seat ruled the home is §4.5) | §4.5 Grower (l. 3172–3174): "A district's `faces` is a `FaceRef` (§2.5): its L1 faces and every face nested in them (§3.3 pool step 3) — after S8 cuts lanes inside them, the finer faces inherit the district through `parent` (§2.8), so containment is 100 % by construction (O11 b; §5.3's containment row checks it)". This has the archive's meaning (archive l. 4169–4170), and every target exists. | FIXED (see O-1) |
| P0-3 | repair-r1-determinism | §7.6 override bullet (l. 5332–5335) now ends "an `insert` whose key already exists is an orphan too". §10.4's "(§7.6; LC-22)" resolves. | FIXED |
| P0-4 (VR-R0-2) | repair-r1-rendering | §12.4's S10 (0) row (l. 7230): "≈ 3 ms for the bands on the wall traces and ≈ 6 km of perimeter (the margin bands included) + ≈ 2.3 ms for the L3 partition rebuild of the ≈ 9 000 items it made (§3.3 pool step 1; …)", with the 5 ms total kept. §4.7 S10 (0)'s "cost §12.4" resolves. | FIXED |
| P0-5 (VDC-9, V-MODEL-06) | repair-r1-determinism | §7.7 One path (l. 5394): "A blueprint's assignments and edits become `assign` and edit events at log positions 0…k when the document is created". §4.2 S0's pointer resolves. | FIXED |
| P0-6 | repair-r1-pipeline | §4.8 Water furniture (l. 3595–3596): "S3's on the moats and canals it carves (§4.2 S3 (2), (10))". This is the pointer to the home, and the over-statement is gone. | FIXED |
| P0-7 (VK-R0-11) | repair-r1-pipeline | §4.2 S1 (2) (l. 2669–2670): "the clamp reads it through `skeleton(rings, 'spine')` (§3.4) as §3.8's `spine` reader, with its sampled-medial-axis downgrade". §3.4 declares `skeleton(rings, use: 'roof'\|'spine'\|'regions')` (l. 1981). §3.8 lists "the local feature size S1's coast simplicity clamp reads (§4.2 S1); downgrade: a **sampled medial axis**" (l. 2370–2371). | FIXED |
| P0-8 (V-MODEL-12) | repair-r1-pipeline (Fable seat: D1 stands) | §4.11 (l. 3767): `{ op: 'build'; plot: Id; cls: BuildingClass; footprint?: PolygonCm /* as §7.1's build event */ }`. The footprint type now equals §7.1's (l. 4644). | FIXED (see O-2, O-3) |

## 6. Open items owned by this part

| item | places round 1 touched, re-checked | verdict |
|---|---|---|
| NP5-1 | §4.1's S11 row is unchanged. The model half (§2.6's stored composition (1)) is unchanged. Round 1 extended its companions to match it: §7.3 item 7 (ii) now checks each face that composition rule (1) adds to the scope (l. 5052–5054, V-MODEL-13), and §13.2's composition test now includes "a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall" (V-MODEL-03). | FIXED |
| NP5-2 | §4.2 S1 (5) is byte-identical inside the replaced §4.2. §4.1's S5 row, the L0-writer sentence and §4.4 S5b are unchanged. §5.2 F-ROUTE's "where" still names S5b (l. 4012), and J-I18's index row and Part A row still list S5b's batch. | FIXED |
| NP5-3 | (a) §10.4 (l. 6761–6763) and §7.6 (l. 5316–5317) keep the same order: "re-draws exactly the unedited names …, listed for confirmation (§6.3 case (4)), and never the row's other names". (b) §7.4's warp paragraph (l. 5205–5206) is unchanged. | FIXED |
| NP5-4 | The part names no `Tower`, `Room`, `Porch`, `ComposedTower` or carried set (grep: 0). | FIXED |
| VD5-6 | §2.9 was replaced by the model repair, which changed step 4 only. The pack-set bullet still keeps a pack while "the base recipe, any log event or a truncated event held on a saved redo stack" names it. §10.4's two pointers ("§2.9's pack-set rule") resolve. | FIXED |

GAP-1 (canon): the part still states no value for the branch re-join constant k, as the canon rules. That gap stays with
the owner and Fable and is not an issue of this pass.

## 7. Conflicts routed to this part whose places round 1 replaced

| conflict | re-check | verdict |
|---|---|---|
| CF-PIPE-01 | §4.2 S3 (12) and §4.5 S7b (3) are byte-identical in the replaced blocks. §4.1 (c) is unchanged. | RESOLVED |
| CF-PIPE-04 | F-SITING now reads "reduce the manifest, lowest-priority classes first, and report `unplaced`" (l. 4017; VDC-5). That is the wording §4.7 S10b already uses. The canon's resolution prescribes one wording in both, and the values agree (O-4). | RESOLVED |
| CF-PIPE-06 | §2.9's pack-set rule is unchanged, and §10.4 points to it twice. | RESOLVED |
| CF-PIPE-09 | §4.2 S1 (2)'s outline-template list (disc, D-shape, lozenge, crescent, spindle) is byte-identical, and II.6 points to it. | RESOLVED |
| CF-PIPE-10 | §4.2 S1 (5), §4.1's S5 row and L0-writer sentence, §4.4 S5b and F-ROUTE's "where" are all unchanged. | RESOLVED |
| KERNEL-C12 | §3.3 still says "three moments, never per batch" (tags removed only). | RESOLVED |
| MODEL-C11 | §4.2 S1 (5)'s "A deck placed before its water exists" is byte-identical. §2.2 still points there (l. 478, 596). | RESOLVED |
| CANON-C05 | §12.4's header still reads "Each stage's mechanism is its stage section's (§4)". The §4 mechanisms are unchanged. | RESOLVED |
| MODEL-C04 | §4.8's `Castle.surround` and `Castle.moat` text is byte-identical. | RESOLVED |
| DETERMINISM-C-5 | §4.2 S1 (5)'s drawn-bridge rule is byte-identical. §7.1 and §7.4's "draw bridges" row now point to it without restating the location (VDC-12), which agrees. | RESOLVED |
| NEW-PIPE-1 | §4.4 S5a is unchanged. §5.3's row "every quay reachable from the town without crossing a wall except at a gate" (l. 4061) and F-WALL's row are untouched. | RESOLVED (PLAUSIBLE intended design, as in r0) |

CF-PIPE-02, -03, -05, -07 and -08 and CANON-C09 and SCOPE-C09 have no place in a replaced subsection. Their round-0
verdict (RESOLVED) holds.

## 8. Other parts' round-1 changes that this part points into

Every hunk of the whole-document diff outside this part was read. The table lists each changed subsection and its
effect here.

| changed subsection (repair) | what changed | effect on this part |
|---|---|---|
| §0.2 (scope) | row 5's §7.1 wording | none; the part does not cite §0.2 |
| §2.1 (model) | angles named `…Cdeg` / typed `Cdeg`; the lint covers length fields | none; the part has no angle field |
| §2.2 (model) | rule 3's promotion clause ("the hot pixel of the route it was placed on, §3.6"; V-MODEL-09 restored the archive's wording) | none; §4.11 batch (3) and II.1 (3) cite rule 3 for Steiner vertices and promotion, whose meaning is unchanged |
| §2.5 (model) | the τ re-derivation now points to §7.2 | agrees with §4.5 Bands ("a field brush (§7.2) never moves them") |
| §2.9 (model) | step 4's bridged-load policy moved to §11.3 | none; the pack-set rule (VD5-6) is unchanged |
| §3.2, §3.6, §3.8, §3.9, §3.10 (kernel) | fix-round tags dropped; §3.9 and §3.10 now defer to §2.2 rule 7's registry | none; the new §4.2 pointer to §3.8 resolves |
| §3.3 (kernel) | tags dropped; the copy-size receipt named; prepared contacts carry distinct anchor keys | none; §4.11 batch (1)'s "smallest free ordinal" agrees |
| §3.4 (kernel) | comments cleaned; `resolve` "valid until the next commit" | none; `skeleton(rings, 'spine')` and `claimSubFace` as cited |
| §3.7 (kernel) | engine id stated; M0 (ii) restores "one district ≤ 3 ms" | none; §4.7 S9 states no per-district cost |
| §5.2 (determinism) | test cells of F-NUM, F-OUTLINE, F-BUDGET-STAGE, F-CASTLE and F-SKELETON reduced to pointers; F-SITING gains "lowest-priority classes first" and O18 (f) | **P1-2** (F-BUDGET-STAGE) and **P1-3** (F-CASTLE); F-OUTLINE → §13.2 agrees with §4.2 S1 (2)'s "property test: §13.2"; F-SITING: O-4 |
| §5.3, §5.4 (determinism) | METROPOLIS measurement wording; the report's warning codes listed | none; the part cites no warning code |
| §6.1, §6.2, §6.5 (determinism) | stamp-tile key; "every in-window load"; cross-host pool sizes; the corpus-selection fixture | none; `render.instances` (§4.9) and §6.5 (9) (§4.1) are as cited |
| §7.1, §7.4 (determinism) | the drawn-bridge location claim dropped (VDC-12); registry test → §13.2 | agrees with §4.2 S1 (5) |
| §7.2 (determinism) | a stroke compares against the `DerivationRecord` samples | agrees with §4.5 |
| §7.3 (determinism) | replay mode covers the undo of an upgrade; item 7 (ii) covers composition rule (1) | none; NP5-1's companion (§6) |
| §7.6, §7.7 (determinism) | the `insert` orphan (P0-3); assignments and edits (P0-5) | P0-3 and P0-5 FIXED |
| §7.8 (determinism) | the preview proxies drawn in §8.5's distinct preview style | none; the part does not describe the proxies |
| §8.1, §8.3, §8.10, §9.5, §12.6, §12.9 (rendering) | tags dropped | none |
| §8.2 (rendering) | the relief tier now states the contour clip (VR-R0-7) | **P1-1** |
| §8.9 (rendering) | `VectorBackend` (the SVG writer in the generation worker) | none; §4.10's transient export lists agree |
| §11.2, §11.3 (rendering) | tags; the bridge policy and host authorship | none; §10.3's `relations` query and "logs no event" agree |
| §12.2 (rendering) | the rung figures now point to §1.1's rung table | none; the part does not cite §12.2 |
| §12.4 (rendering) | the S9 row points to §3.7's M0 bar; S10 (0)'s split (P0-4) | P0-4 FIXED; §4.7 S10 (0)'s "cost §12.4" resolves |
| §12.8 (rendering) | memory lines | none; the part does not cite §12.8 |
| §13.1 (scope) | §16 M3a's carve fixtures moved here, the S5a outer moat among them; `insetRing`; the hill-acropolis relief fixture | agrees with §4.4 S5a and §4.11 (at S5a nothing is cut and `R` clears nothing); the part's `insetRing` matches §3.4 |
| §13.2 (scope) | the seam check by pointer; the composition and load-verification tests extended | none against this part; NP5-1's companion (§6) |
| §13.7 (scope) | O13 (a)'s ladder wording | none |
| §16 (scope) | M3a's exit points to §13.1–§13.2's carve fixtures; the staged sentence | §4.11's "the §13.1 and §16 M3a fixtures" still resolves |
| Judgment calls (scope) | the J-DET-36 and J-S43 rows | none; the part cites neither |

## 9. Observations (not raised)

* **O-1 — which `parent` §4.5 means (PLAUSIBLE; for Fable).** The restored sentence points `parent` to §2.8, which is
  `Identity.parent` ("containment parent", l. 1168). The sentence's subject is faces, though, and the face field
  "the level − 1 face containing it" is §2.2's `LevelFaces.parent` (l. 355). The archive's own §3.1 row spoke of the
  arena's "containment by parent". The §2.8 reading is coherent too: block, plot and building records chain to their
  district, which is §5.3's "building ⊂ plot ⊂ block ⊂ district" row. The Fable seat chose §2.8, and the fact is intact
  either way, so this is not raised. Relatedly, "its L1 faces and every face nested in them" is §3.3's *face set*; the
  `FaceRef` itself holds the L1 faces (§2.5 comment).
* **O-2 — §4.11's `build` member vs §7.1's `build` event.** The member lacks §7.1's optional `use?` and `heights?`, and the
  archive had the same (l. 4846 vs 5848). Every value the member can carry is a valid §7.1 `build` event, since the two
  fields are optional, so no statement disagrees. Adding them would widen the conversion op, which is beyond a
  consistency repair. The repair seat left this to the r1 verifiers; it is ruled here as not an issue.
* **O-3 — `carve.polygon: Polygon` is one ring (PLAUSIBLE; a design question for Fable, not a consistency defect).** A
  moat carved by an edit around a closed enceinte is an annulus, and so is S5a's outer moat, which runs through the same
  carve path. One ring cannot hold an annulus. The archive's own usage already treated `Polygon` as one ring
  (`carryWings`' "the footprint's rings, outer first"), so D1 did not change the field's meaning. The repair seat's D1
  ruling kept it single-ring, giving plots as its reason, which does not cover the moat.
* **O-4 — "lowest-priority classes first" now appears in F-SITING and in §4.7 S10b.** This is the one wording the canon's
  CF-PIPE-04 resolution prescribes for §4.7 S10b's pointer sentence, and the values agree.
* **O-5 — values-agreeing restatements owned by other parts**, for their verifiers:
  * §3.3 pool step 1 keeps "≈ 2.3 ms at CITY", now carried in §12.4 too (kernel);
  * §2.3 (l. 687–689) also says contours are "clipped to the land faces (§4.2 S1 (2), §8, §11)" (model; see P1-1);
  * §2.8's decline-hooks bullet still restates the sentences §4.11 unioned (model, as noted in r0).
* **O-6 — cosmetic wraps.** The repair did not rewrap two lines: l. 2671 is short and l. 3597 is 147 characters.
* **Scratchpad hygiene.** This lane rebuilt every scratch file in its own subdirectory (`vp-verify-pipeline-r1/`),
  because the parallel lanes share one session scratchpad.

## 10. Checked list — every inventory id of the part (459; none sampled)

Verdicts:
* **FIXED** — a round-0 issue, now resolved at the place shown.
* **ISSUE P1-n** — see §4.
* **OK — re-checked** — the id's home lies in a block round 1 replaced, or its target or cited source lies in a
  subsection another repair replaced. It was re-read in the new text.
* **OK / RESOLVED — not touched by round 1** — round 1 changed neither its text nor its target, so the round-0 verdict
  holds (`verify-pipeline-r0.md` §8, which records the side-by-side check).

Totals: 438 OK, 10 RESOLVED, 8 FIXED, 3 ISSUE. Of these, 233 were re-checked this round and 226 hold their r0 verdict.

| id | kind | now (the rewrite's mapping) | r0 | r1 verdict |
|---|---|---|---|---|
| PIPELINE-001 | rule | §4 intro | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-002 | mechanism | §4.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-003 | interface | §4.12 `StageDecl` (the field list); §4.1 now reads "each stage registers a `StageDecl` (§4.12)… | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-004 | rule | §4.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-005 | rule | §4.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-006 | rule | §4.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-007 | rule | §4.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-008 | rule | §4.1 "Why this order" (a) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-009 | rule | §4.1 "Why this order" (b) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-010 | rule | §4.1 "Why this order" (c) — "large institutions" are now S7b claims, pointer to §4.2 S3 (12) a… | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-011 | rule | §4.1 "Why this order" (d); the construction itself §4.2 S3 intro and (4)–(10) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-012 | rule | §4.1 "Why this order" (e) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-013 | rule | §4.1 laziness contract | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-014 | rule | §4.1 laziness contract | OK | OK — target re-read: §3.3 pool step 3 still defines a district's face set; round 1 changed only tags there |
| PIPELINE-015 | rule | §4.1 laziness contract | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-016 | rule | §4.1 laziness contract | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-017 | rule | referenced to §5.2 F-CUT (moved out; §4.6 step 8 (d) reads the allocation's pending claims) | OK | OK — target re-read: §5.2 F-CUT row untouched by round 1 |
| PIPELINE-018 | rule | referenced to §6.3 (DETERMINISM-224) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-019 | rule | referenced to §9.1 (RENDERING-330) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-020 | rule | §4.1 one-click first paint | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-021 | rule | §4.1 one-click first paint | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-022 | budget | referenced to §12.5 (RENDERING-538) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-023 | rule | referenced to §6.2 (DETERMINISM-597) | OK | OK — target re-read: §6.2's eager model unchanged (round 1 changed only the load wording, "every in-window load") |
| PIPELINE-024 | test | referenced to §6.5 (9) (DETERMINISM-293) | OK | OK — target re-read: §6.5 (9) derived-complete digest unchanged (round 1 added pool sizes 0–3 to the cross-host bullet only) |
| PIPELINE-025 | rule | referenced to §3.3 (KERNEL-103) | OK | OK — target re-read: §3.3 'One level per transaction' unchanged (tags removed only) |
| PIPELINE-026 | mechanism | §4.1 batch table, S1 row | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-027 | mechanism | §4.1 batch table, S3 row | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-028 | mechanism | §4.1 batch table, S4 row (NP5-2 context: S5b row added beside it) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-029 | mechanism | §4.1 batch table, S5 row — adds "k ≥ 2 — S5b L0 … two same-level shore splits before S5b's L1 … | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-030 | mechanism | §4.1 batch table, S6 row | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-031 | mechanism | §4.1 batch table, S7 row | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-032 | mechanism | §4.1 batch table, S7b row and S12a/S10a/S10b row | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-033 | mechanism | §4.1 batch table, S8 and S9 rows | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-034 | mechanism | §4.1 batch table, S10 row (step (0) contents point to §4.7 S10 (0)) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-035 | mechanism | §4.1 batch table, S11 row — corrected: "a row's party wall is the plot's shared L3 side line c… | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-036 | mechanism | §4.1 batch table, S12b row + the carry sentence under the table | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-037 | mechanism | referenced to §7.3 (section restatement) | OK | OK — targets re-read: §7.1 dry run and §7.3 chain order unchanged in meaning |
| PIPELINE-038 | rule | §4.1 sentence under the batch table — L0 writers now "S1, S3, S4 and S5b (F-ROUTE's extra brid… | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-039 | decision | rationale → J-P46 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P46)" left at §4.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-040 | rule | §4.1 sentence under the batch table | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-041 | rule | referenced to §3.3 step 1 (KERNEL-138) | OK | OK — target re-read: §3.3 three rebuild moments, never per batch — unchanged |
| PIPELINE-042 | rule | referenced to §5.1 (5) (DETERMINISM-015) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-043 | mechanism | referenced to §8.9 (RENDERING-241) | OK | OK — target re-read: §8.9 threads; round 1 added `VectorBackend` (the SVG writer in the generation worker) — the main-thread rule is unchanged |
| PIPELINE-044 | mechanism | §4.1 workers bullet | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-045 | rule | §4.1 workers bullet | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-046 | mechanism | §4.1 workers bullet (hinterland unit) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-047 | rule | §4.1 workers bullet | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-048 | measurement | referenced to §12.3 (RENDERING-509) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-049 | fallback | referenced to §12.3 (RENDERING-500) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-050 | decision | rationale → J-P10 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P10)" left at §4.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-051 | decision | rationale → J-P27 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P27)" left at §4.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-052 | type | §4.2 S0 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-053 | rule | referenced to §7.7 (1) (DETERMINISM-564) | OK | OK — target re-read: §7.7 (1) unchanged |
| PIPELINE-054 | rule | referenced to §7.7 (DETERMINISM-575) | ISSUE P0-5 | FIXED (P0-5) — §7.7 One path now reads "A blueprint's assignments and edits become `assign` and edit events at log positions 0…k" (l. 5394); §4.2 S0's pointer resolves |
| PIPELINE-055 | rule | referenced to §1.1 (SCOPE-063) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-056 | mechanism | §4.2 S0 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-057 | rule | §4.2 S0 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-058 | mechanism | §4.2 S1 (1) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-059 | number | §4.2 S1 (1) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-060 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-061 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-062 | rule | §4.2 S1 (2) | ISSUE P0-7 | FIXED (P0-7) — §4.2 S1 (2): the clamp reads the medial axis "through `skeleton(rings, 'spine')` (§3.4) as §3.8's `spine` reader, with its sampled-medial-axis downgrade"; §3.4's signature and §3.8's reader list agree |
| PIPELINE-063 | rule | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-064 | test | referenced to §13.2 (SCOPE-183) | OK | OK — target re-read: §13.2's stage property tests (10 000 outlines per intent) present; F-OUTLINE now points there too |
| PIPELINE-065 | rule | §4.2 S1 (2) | OK | OK — the coast construction (its home) byte-identical; the adjacent clip clause is P1-1 (PIPELINE-066) |
| PIPELINE-066 | rule | referenced to §8.2; the clip-to-land rule (GEO-14) kept at §4.2 S1 (2) with the pointer | OK | ISSUE P1-1 — §8.2's relief tier now states the clip (round 1, VR-R0-7) and §4.2 S1 (2) still states it in full: two statements |
| PIPELINE-067 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-068 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-069 | mechanism | §4.2 S1 (3) (flat resolution and lake typing unioned from §2.3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-070 | mechanism | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-071 | number | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-072 | rule | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-073 | number | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-074 | mechanism | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-075 | rule | §4.2 S1 (4) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-076 | interface | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-077 | number | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-078 | rule | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-079 | rule | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-080 | rule | §4.2 S1 (5) bullet "A site no way uses" ("not drawn, named, labelled or exported" unioned from… | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-081 | rule | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-082 | rule | §4.2 S1 (5) bullet "A deck where no site stands" — standing-water list adds S5b (NP5-2); "ever… | OK | OK — byte-identical; §7.1 and §7.4's draw-bridge row now point here without restating the location (round 1, VDC-12) — agrees |
| PIPELINE-083 | rule | §4.2 S1 (5) bullet "A deck placed before its water exists" — now the canonical list (carve, ou… | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-084 | mechanism | §4.2 S1 (6) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-085 | rule | §4.2 S1 (7) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-086 | rule | §4.2 S1 (8) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-087 | number | §4.2 S1 (8) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-088 | mechanism | §4.2 S1 (9)-(10) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-089 | rule | referenced to §5.2 F-RIVER; "restart-free" sentence kept at §4.2 S1 with the pointer | OK | OK — target re-read: §5.2 F-RIVER row untouched |
| PIPELINE-090 | mechanism | §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-091 | rule | §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-092 | rule | §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-093 | rule | §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-094 | number | §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-095 | decision | rationale → J-P6 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P6)" left at §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-096 | measurement | §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-097 | number | §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-098 | decision | rationale → J-P5 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P5)" left at §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-099 | type | §4.2 S2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-100 | rule | §4.2 S3 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-101 | mechanism | §4.2 S3 (1) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-102 | mechanism | §4.2 S3 (1) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-103 | rule | §4.2 S3 (1) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-104 | number | §4.2 S3 (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-105 | rule | §4.2 S3 (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-106 | number | §4.2 S3 (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-107 | rule | §4.2 S3 (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-108 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-109 | mechanism | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-110 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-111 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-112 | measurement | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-113 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-114 | mechanism | §4.2 S3 (5) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-115 | mechanism | §4.2 S3 (6) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-116 | rule | §4.2 S3 (6) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-117 | rule | §4.2 S3 (7) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-118 | rule | §4.2 S3 (7) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-119 | rule | §4.2 S3 (7) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-120 | mechanism | §4.2 S3 (8) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-121 | rule | §4.2 S3 (8) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-122 | mechanism | §4.2 S3 (9) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-123 | test | §4.2 S3 (9) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-124 | evidence | dropped (history; validation record) — one receipt pointer kept at §4.2 S3 (9) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-125 | mechanism | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-126 | number | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-127 | number | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-128 | rule | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-129 | number | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-130 | mechanism | §4.2 S3 (11) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-131 | test | referenced to §13.2 (SCOPE-191) | OK | OK — target re-read: §13.2's walled coastal harbour fixtures present |
| PIPELINE-132 | rule | §4.2 S3 (12) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-133 | term | §4.2 S3 (13) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-134 | rule | §4.2 S3 (13) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-135 | decision | rationale → J-P26 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P26)" left at §4.2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-136 | decision | rationale → J-P35 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P35)" left at §4.2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-137 | decision | rationale → J-P44 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P44)" left at §4.2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-138 | decision | rationale → J-P45 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P45)" left at §4.2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-139 | decision | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.2 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-140 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-141 | mechanism | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-142 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-143 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-144 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-145 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-146 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-147 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-148 | mechanism | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-149 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-150 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-151 | rule | referenced to §5.2 F-ROUTE; "decks are fixed graph edges" kept at §4.3 | OK | OK — target re-read: §5.2 F-ROUTE row untouched (S5b still in its 'where') |
| PIPELINE-152 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-153 | test | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-154 | rule | §4.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-155 | mechanism | referenced to §7.3 operator table (DETERMINISM-412) | OK | OK — target re-read: §7.3 operator table S4 row untouched |
| PIPELINE-156 | rule | §4.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-157 | mechanism | §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-158 | number | §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-159 | rule | §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-160 | rule | §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-161 | test | referenced to §13.5 (B-REF anisotropy row); calibration target kept at §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-162 | mechanism | §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-163 | rule | §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-164 | rule | §4.4 S5a "Water and the waterfront" (§3.3 rule 3 promotion unioned) | OK | OK — text byte-identical; §3.3 rule 3 promotion unchanged |
| PIPELINE-165 | rule | §4.4 S5a "Water and the waterfront" (anchoring on shore/bank/cliff/enceinte and the enclosed/s… | OK | OK — text byte-identical; §5.3's quay-reachability row and F-WALL's test untouched (NEW-PIPE-1 holds) |
| PIPELINE-166 | rule | §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-167 | rule | referenced to §5.2 F-WALL; the pull cap kept at §4.4 S5a | OK | OK — target re-read: §5.2 F-WALL row untouched |
| PIPELINE-168 | mechanism | §4.4 S5a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-169 | rule | §4.4 S5b — routes under S4's F-ROUTE ladder incl. extra bridge; L0 batch before its L1 batch (… | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-170 | rule | §4.4 S5b | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-171 | test | §4.4 S5b | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-172 | mechanism | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-173 | rule | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-174 | acceptance | referenced to §13.5 table (SCOPE-263) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-175 | decision | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-176 | mechanism | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-177 | evidence | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-178 | rule | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-179 | rule | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-180 | rule | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-181 | rule | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-182 | rule | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-183 | number | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-184 | rule | §4.4 S5c | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-185 | mechanism | §4.4 S5d | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-186 | rule | §4.4 S5d | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-187 | test | §4.4 S5d test ("on ≥ 95 % of seeds" unioned from §5.2 F-BUDGET-STAGE) | OK | ISSUE P1-2 — '(on ≥ 95 % of seeds, §5.2)' cites F-BUDGET-STAGE, whose test cell round 1 reduced to a pointer to §13.2's sweep |
| PIPELINE-188 | number | §4.4 table | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-189 | rule | §4.4 table | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-190 | test | §4.4 table | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-191 | decision | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-192 | acceptance | §4.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-193 | fallback | §4.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-194 | rule | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-195 | rule | §4.5 "Perimeter and margin band" — the margin band's one statement (perimeter and shared reser… | OK | OK — the margin band's one statement byte-identical; §3.3 pool step 3 still points here |
| PIPELINE-196 | mechanism | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-197 | rule | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-198 | rule | referenced to §2.5 (section restatement) | ISSUE P0-2 | FIXED (P0-2) — restored at §4.5: "… the finer faces inherit the district through `parent` (§2.8), so containment is 100 % by construction (O11 b; §5.3's containment row checks it)"; targets §2.5, §3.3 pool step 3, §5.3 present (see O-1 on which `parent`) |
| PIPELINE-199 | mechanism | §4.5 Quarters | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-200 | rule | §4.5 Quarters (receipts kept as pointers) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-201 | evidence | dropped (history; validation record) — receipts kept at §4.5 Quarters | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-202 | rule | referenced to §9.4; "S13a names every node of the tree" kept at §4.5 Quarters | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-203 | decision | rationale → J-P28 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P28)" left at §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-204 | decision | rationale → J-P2 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P2)" left at §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-205 | rule | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-206 | rule | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-207 | mechanism | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-208 | number | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-209 | rule | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-210 | rule | §4.5 Fields, Bands bullet ("`setAttr` … re-derives every block whose band changes" unioned fro… | OK | OK — text byte-identical; round 1's §2.5 edit points τ re-derivation to §7.2 (agrees; V-MODEL-10) |
| PIPELINE-211 | rule | referenced to §7.2; "a field brush never moves FieldBands" kept at §4.5 Bands | OK | OK — target re-read: §7.2 τ = 0.01, same τ on replay, stroke list kept over epochs; round 1 added "against the samples their `DerivationRecord` holds (§2.8)" — agrees |
| PIPELINE-212 | rule | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-213 | rule | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-214 | rule | §4.5 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-215 | rule | §4.5 S7b | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-216 | mechanism | §4.5 S7b (1) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-217 | rule | §4.5 S7b (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-218 | rule | §4.5 S7b (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-219 | rule | §4.5 S7b (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-220 | decision | rationale → J-P41 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P41)" left at §4.5 S7b (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-221 | test | §4.5 S7b (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-222 | rule | §4.5 S7b (4) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-223 | rule | §4.5 S7b (5) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-224 | rule | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-225 | rule | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-226 | test | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-227 | rule | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-228 | test | referenced to §16 M0 (b) (moved out; §4.6 "Sides" points) | OK | OK — target re-read: §16 M0 (b) still names curved, round-joined, triangular, C-shaped and holed faces |
| PIPELINE-229 | rule | §4.6 (1) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-230 | number | §4.6 (2) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-231 | rule | §4.6 (3) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-232 | rule | §4.6 (4) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-233 | measurement | §4.6 (4) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-234 | rule | §4.6 (5) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-235 | number | §4.6 (6) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-236 | rule | §4.6 (7) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-237 | rule | §4.6 (7) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-238 | rule | §4.6 (7) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-239 | rule | referenced to §7.3 item 1; one-sentence summary and pointer at §4.6 step 7 | OK | OK — target re-read: §7.3 item 1 unchanged |
| PIPELINE-240 | decision | rationale → J-P32 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P32)" left at §4.6 (7) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-241 | rule | §4.6 step 8 ("each rung under an operation-count work limit; ≤ 3 candidates in all" unioned fr… | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-242 | acceptance | §4.6 (8) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-243 | rule | §4.6 (9) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-244 | rule | §4.6 (10)-(11) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-245 | decision | rationale → J-P11 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P11)" left at §4.6 (10) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-246 | rule | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-247 | number | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-248 | rule | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-249 | interface | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-250 | interface | §4.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-251 | mechanism | referenced to §3.7; S9's per-district / hinterland runs and the strip's L2 kept at §4.7 S9 | OK | OK — target re-read: §3.7 `corridorUnion` unchanged; round 1 restored 'one district ≤ 3 ms' at §3.7 M0 (ii) — §4.7 S9 states no per-district cost, so no duplicate |
| PIPELINE-252 | rule | §4.7 S9 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-253 | mechanism | §4.7 S10a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-254 | rule | §4.7 S10a | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-255 | rule | §4.7 S10 (0) (margin bands by pointer to §4.5) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-256 | number | referenced to §12.4 (RENDERING-523) | ISSUE P0-4 | FIXED (P0-4) — §12.4's S10 (0) row now "≈ 3 ms for the bands … (the margin bands included) + ≈ 2.3 ms for the L3 partition rebuild" (l. 7230); §4.7 S10 (0)'s "cost §12.4" resolves |
| PIPELINE-257 | rule | referenced to §7.3 item 2; the castle-curtain and hinterland-recipe clauses stay at §4.7 S10 (… | OK | OK — target re-read: §7.3 item 2 'Shared-edge parts' unchanged |
| PIPELINE-258 | mechanism | §4.7 S10 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-259 | number | §4.7 table | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-260 | rule | §4.7 S10 (3) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-261 | rule | §4.7 S10 (4) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-262 | test | referenced to §13.2 (SCOPE-183) | OK | OK — target re-read: §13.2 plots on concave, notched and curved blocks present |
| PIPELINE-263 | rule | §4.7 S10 (5)-(6) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-264 | rule | §4.7 S10 (7) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-265 | rule | §4.7 S10 (8) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-266 | rule | §4.7 S10 (9)-(10) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-267 | rule | §4.7 S10 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-268 | rule | §4.7 S10 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-269 | rule | §4.7 S10 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-270 | rule | §4.7 S10b | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-271 | rule | §4.7 S10b | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-272 | rule | §4.7 S10b | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-273 | rule | §4.7 S10b — "never gives up" now reads "never silently", with F-SITING's last rung (CF-PIPE-04) | OK | OK — text unchanged; F-SITING now also says "lowest-priority classes first" (round 1, VDC-5): CF-PIPE-04's one wording, values agree (O-4) |
| PIPELINE-274 | number | §4.7 S10b | OK | OK — text unchanged; §12.4's S10b row untouched |
| PIPELINE-275 | rule | §4.7 S10b | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-276 | rule | §4.7 S11 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-277 | number | §4.7 S11 table | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-278 | rule | referenced to §2.5 `PlotBound`; the streetwall-continuity and export clauses kept at §4.7 S11,… | OK | OK — targets re-read: §2.5 `PlotBound` and §8.2's boundary-treatment row untouched |
| PIPELINE-279 | rule | §4.7 S11 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-280 | rule | §4.7 S11 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-281 | rule | §4.7 S11 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-282 | number | §4.7 pins | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-283 | rule | referenced to §8.5 (RENDERING-180) | OK | OK — targets unchanged (round 1's §2.1 edit concerns angle units only) |
| PIPELINE-284 | rule | §4.8 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-285 | number | §4.8 wall strips | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-286 | rule | §4.8 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-287 | decision | rationale → J-P29 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P29)" left at §4.8 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-288 | rule | §4.8 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-289 | rule | §4.8 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-290 | number | §4.8 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-291 | mechanism | §4.8 castle (surround named as `Castle.surround`, moat as `Castle.moat`, per MODEL-C04) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-292 | rule | §4.8 castle | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-293 | decision | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.8 castle | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-294 | rule | §4.8 castle | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-295 | acceptance | §4.8 castle acceptance ("0 ways through reservations" and MFCG census baseline unioned from §5… | OK | ISSUE P1-3 — '(… 178 equalise passes and 11 bloats, §5.2)' cites F-CASTLE, whose test cell round 1 reduced to a pointer back to §4.8 |
| PIPELINE-296 | rule | §4.8 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-297 | rule | §4.8 water furniture (deck list unioned from §2.7) | ISSUE P0-6 | FIXED (P0-6) — §4.8: "S3's on the moats and canals it carves (§4.2 S3 (2), (10))" — the pointer to the home, no restatement |
| PIPELINE-298 | rule | referenced to §6.3 (bridge address); the re-base and gate-passage clauses kept at §4.8 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-299 | number | §4.8 water | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-300 | rule | referenced to §5.3 (crossing invariant); the harbour-works list kept at §4.8 water furniture | OK | OK — text byte-identical; §5.3's crossing invariant untouched |
| PIPELINE-301 | rule | §4.8 water | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-302 | rule | §4.9 S12a | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-303 | rule | §4.9 S12a | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-304 | mechanism | §4.9 S12a | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-305 | number | §4.9 S12a | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-306 | rule | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-307 | test | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-308 | mechanism | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-309 | rule | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-310 | mechanism | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-311 | rule | §4.9 S12b | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-312 | rule | §4.9 S12b | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-313 | number | §4.9 table | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-314 | rule | §4.9 table | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-315 | number | §4.9 table | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-316 | number | §4.9 table | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-317 | rule | §4.9 table | ISSUE P0-1 | FIXED (P0-1) — §4.9 row: "instanced by §8.10's layouts — the ranked tile stamp for areas …, a jittered grid for orchards (6–8 m), a jittered line for avenues and street trees (at their rows' spacings above) and for hedgerows (8–12 m)"; agrees with §8.10 (l. 6236–6240); no number changed |
| PIPELINE-318 | rule | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-319 | rule | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-320 | rule | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-321 | acceptance | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-322 | rule | referenced to §8.5; the `grove` tag / dramatic-forest options and the layer toggle kept at §4.… | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-323 | rule | §4.9 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-324 | rule | §4.10 — names drawn "in §6.3's cases" (CF-PIPE-05) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-325 | rule | referenced to §9.1 (RENDERING-330) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-326 | rule | referenced to §8.1 (section restatement) | OK | OK — target re-read: §8.1 items 3 and 6 unchanged (round 1 dropped a tag in item 5) |
| PIPELINE-327 | mechanism | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-328 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-329 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-330 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-331 | test | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-332 | type | §4.11 | ISSUE P0-8 | FIXED (P0-8) — `build.footprint?: PolygonCm /* as §7.1's build event */` (l. 3767) equals §7.1's field (l. 4644); see O-2, O-3 |
| PIPELINE-333 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-334 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-335 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-336 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-337 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-338 | rule | part-specific use kept at §4.11 "Other crossings" (the carve's wall-run rule, J-I13); the shar… | OK | OK — text byte-identical; §7.3 (b) 2 untouched |
| PIPELINE-339 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-340 | test | referenced to §13.1 (SCOPE-126) | OK | OK — target re-read: §13.1's canal-across-a-walled-CITY fixture present; round 1 moved §16 M3a's carve fixture list into §13.1 (M3a now points to §13.1–§13.2), so §4.11's 'the §13.1 and §16 M3a fixtures' still resolves |
| PIPELINE-341 | mechanism | §4.11 batch (1) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-342 | mechanism | §4.11 batch (2) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-343 | mechanism | §4.11 batch (3) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-344 | rule | §4.11 batch (4) ("a carve costs its footprint, not the town" unioned from §3.3) | OK | OK — text byte-identical; §3.3 clear regions unchanged in meaning (round 1 added the one-anchor-key check) |
| PIPELINE-345 | test | referenced to §13.2; the result stated once in §4.11 batch (4) with the fixture pointer | OK | OK — target re-read: §13.2's canal across the perimeter, '0 district faces outside the perimeter', present |
| PIPELINE-346 | rule | referenced to §7.3 item 1; the carve's neighbour-step clause kept at §4.11 batch (4) | OK | OK — target re-read: §7.3 item 1 neighbour step unchanged |
| PIPELINE-347 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-348 | decision | rationale → J-P30 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P30)" left at §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-349 | decision | rationale → J-P34 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P34)" left at §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-350 | decision | rationale → J-P43 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P43)" left at §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-351 | decision | rationale → J-P40 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P40)" left at §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-352 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-353 | rule | §4.11 evolution hooks (user-applied by hand, ruined-building drawing, engine rule table unione… | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-354 | interface | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-355 | rule | §4.11 | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-356 | interface | §4.12 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-357 | interface | §4.12 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-358 | interface | §4.12 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-359 | rule | §4.12 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-360 | rule | §10 intro | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-361 | rule | §10.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-362 | rule | §10.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-363 | rule | §10.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-364 | rule | §10.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-365 | decision | rationale → J-9 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-9)" left at §10.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-366 | rule | §10.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-367 | decision | rationale → J-P21 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P21)" left at §10.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-368 | interface | §10.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-369 | mechanism | §10.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-370 | test | §10.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-371 | rule | §10.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-372 | rule | §10.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-373 | rule | §10.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-374 | rule | §10.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-375 | rule | §10.2 Output paragraph — the reconcile sentence points to §4.7 S10b and F-SITING (CF-PIPE-04) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-376 | rule | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-377 | rule | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-378 | rule | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-379 | number | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-380 | interface | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-381 | rule | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-382 | rule | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-383 | mechanism | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-384 | mechanism | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-385 | mechanism | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-386 | budget | referenced to §12.7 (RENDERING-578) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-387 | rule | §10.3 calendar ("logs no event" unioned from §11.3) | OK | OK — §11.3's bridge bullets rewritten by round 1; `sim.advance` still over the bridge and 'no bridge command changes the model any other way' — §10.3's 'logs no event' agrees |
| PIPELINE-388 | rule | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-389 | interface | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-390 | interface | §10.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-391 | rule | referenced to §11.2 (RENDERING-450) | OK | OK — target re-read: §11.2 `{ kind: 'relations'; person: Id; up: number; down: number }` present |
| PIPELINE-392 | mechanism | §10.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-393 | rule | referenced to §6.3 (DETERMINISM-224) | OK | OK — target re-read: §6.1 registry names `naming.quarter`, `naming.emblem` (round 1 changed only the stamp-tile key) |
| PIPELINE-394 | rule | §10.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-395 | rule | §10.4 per-culture paragraph — the re-draw clause in NP5-3 (a)'s order, pointer to §7.6 | OK | OK — §7.6's NP5-3 (a) sentence unchanged by round 1 |
| PIPELINE-396 | rule | referenced to §7.6; one clause kept at §10.4 in NP5-3 (a)'s order | OK | OK — §7.6's sentence unchanged by round 1 |
| PIPELINE-397 | rule | referenced to §2.9 pack set bullet (MODEL-374) | OK | OK — target re-read: §2.9 pack-set bullet unchanged (round 1 changed step 4 only) |
| PIPELINE-398 | interface | §10.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-399 | rule | §10.4 setting packs paragraph — retention is now a pointer to §2.9's pack-set rule (VD5-6, CF-… | OK | OK — target re-read: §2.9 pack-set rule unchanged |
| PIPELINE-400 | rule | referenced to §7.6; the pack patch form (`baseRowHash`, `baseVersion`, orphans) kept briefly a… | ISSUE P0-3 | FIXED (P0-3) — §7.6 override bullet now ends "an `insert` whose key already exists is an orphan too" (l. 5334–5335); §10.4's pointer resolves |
| PIPELINE-401 | rule | §10.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-402 | rule | PART II intro — `area` = the base's bent-cut fabric (CF-PIPE-07) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-403 | interface | II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-404 | interface | II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-405 | interface | II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-406 | interface | II.1 `NeighbourhoodRequest` (comment: `bent-cut` is NG's `area` template; CF-PIPE-07) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-407 | interface | II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-408 | rule | II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-409 | rule | II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-410 | rule | II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-411 | rule | II.1 (1) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-412 | rule | II.1 (2) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-413 | rule | II.1 (3) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-414 | rule | II.1 (3) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-415 | rule | II.1 (3) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-416 | test | referenced to §13.1 (SCOPE-142) | OK | OK — target re-read: §13.1's neighbour-step fixture present |
| PIPELINE-417 | acceptance | II.1 rule (3) and II.5 — spelled "stage-2 feature S1" (CF-PIPE-08) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-418 | rule | II.1 rule (4) (its persistence clause now points to II.4) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-419 | rule | II.1 rule (5) (outline list is a pointer to §4.2 S1 (2)) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-420 | rule | II.1 (6) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-421 | decision | rationale → J-P33 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P33)" left at II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-422 | decision | rationale → J-P37 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P37)" left at II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-423 | decision | rationale → J-P38 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P38)" left at II.1 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-424 | mechanism | II.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-425 | rule | II.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-426 | decision | rationale → J-S42 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-S42)" left at II.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-427 | rule | II.2 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-428 | rule | II.2 — "the `area` template is the base's own bent-cut fabric … opened as a `refine` close-up"… | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-429 | rule | II.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-430 | rule | II.3 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-431 | budget | referenced to §8.2 / §8.6; the stage-2-tier additions (road programs, hood title, instanced ha… | OK | OK — targets unchanged in this respect (§8.2 `hatched` row; §8.6) |
| PIPELINE-432 | rule | II.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-433 | rule | II.4 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-434 | rule | II.4 | OK | OK — §7.3 item 1 unchanged |
| PIPELINE-435 | rule | II.5 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-436 | acceptance | II.5 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-437 | acceptance | II.5 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-438 | rule | II.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-439 | rule | II.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-440 | rule | II.6 — "an outline template of §4.2 S1 (2)" (CF-PIPE-09) | OK | OK — re-checked: its block was replaced; this text is byte-identical (part diff: five hunks, none here) and its pointers resolve |
| PIPELINE-441 | interface | II.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-442 | interface | II.6 | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-443 | rule | PART III | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-444 | rule | PART III | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-445 | rule | PART III (1) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-446 | rule | PART III (2) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-447 | rule | PART III (3)-(4) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-448 | number | PART III (5) | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| PIPELINE-449 | acceptance | PART III | OK | OK — not touched by round 1; r0 verdict holds (verify-pipeline-r0.md §8) |
| CF-PIPE-01 | conflict | resolved at §4.1 "Why this order" (c) (§3 above) | RESOLVED | RESOLVED — §4.2 S3 (12) and §4.5 S7b (3) byte-identical in the replaced blocks |
| CF-PIPE-02 | conflict | resolved: §4.1 points to §4.12 `StageDecl` | RESOLVED | RESOLVED — not touched by round 1; r0 verdict holds |
| CF-PIPE-03 | conflict | resolved with NP5-1 at §4.1 S11 row | RESOLVED | RESOLVED — not touched by round 1; r0 verdict holds |
| CF-PIPE-04 | conflict | resolved at §4.7 S10b and §10.2 (pointers to F-SITING) | RESOLVED | RESOLVED — F-SITING now carries the same wording as §4.7 S10b (VDC-5); values agree |
| CF-PIPE-05 | conflict | resolved: "in §6.3's cases" | RESOLVED | RESOLVED — not touched by round 1; r0 verdict holds |
| CF-PIPE-06 | conflict | resolved with VD5-6: pointers to §2.9 | RESOLVED | RESOLVED — §2.9's pack-set rule unchanged by round 1 |
| CF-PIPE-07 | conflict | resolved with VS5-2: `area` = bent-cut | RESOLVED | RESOLVED — not touched by round 1; r0 verdict holds |
| CF-PIPE-08 | conflict | resolved: "stage-2 feature S<n>" in text; two heading renames for the assembler | RESOLVED | RESOLVED — not touched by round 1; r0 verdict holds |
| CF-PIPE-09 | conflict | resolved: II.6 points to §4.2 S1 (2) | RESOLVED | RESOLVED — §4.2 S1 (2)'s outline-template list byte-identical |
| CF-PIPE-10 | conflict | resolved with NP5-2 (canon ruling, option 1) | RESOLVED | RESOLVED — §4.2 S1 (5), §4.4 S5b and §4.1 unchanged; F-ROUTE's 'where' (S5b) untouched |
