# Verify — pipeline part, consistency pass round 0 (§4, §10, PART II, PART III)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-pipeline-r0`, 2026-09-26. Status: COMPLETE. Verifies the pipeline part of the assembled
`docs/ARCHITECTURE.md` — `## §4 Generation pipeline` (l. 2505–3915), `## §10 Simulation and content layer` (l. 6606–6777),
`# PART II` with `## II.1`–`## II.6` and `# PART III` (l. 8871–9139) — against the archive
`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md` (l. 3353–5024, 8203–8396, 10770–11073), `inventory-pipeline.json`
(449 items + 10 internal conflicts), `canon.json`, and the whole mapping table of `rewrite-pipeline.md` (459 rows, none
sampled), plus every cross-part note the other five rewrite reports address to this part.

## 1. Outcome

The part is sound. All 459 inventory records are accounted for: 451 verified OK at their mapped place (for a reference,
the pointer is present and the target states the fact), and 8 issues remain — all **minor**, none blocking. The assembled
text is byte-identical to the rewrite's ten section files except the two heading renames the assembler made (CF-PIPE-08).

* **Open items owned by this part — all FIXED:** NP5-1, NP5-2, NP5-3, NP5-4, VD5-6, each in every place it had to change,
  the model, determinism and scope companions included (§4). The VS5-2 pipeline companion is in.
* **Conflicts routed here — all resolved as the canon rules:** CF-PIPE-01 … CF-PIPE-10, KERNEL-C12, MODEL-C11, CANON-C05,
  the MODEL-C04 alignment, DETERMINISM-C-5, CANON-C09, SCOPE-C09, and the rewrite's own NEW-PIPE-1 (§5).
* **Scans:** no "PENDING FABLE REVIEW" line, no fix-round id, no round narration, no deferral wording in the part.

The 8 issues, by owner:

* **pipeline (5):** P0-1 §4.9 lays avenues and hedgerows on a jittered *grid* where §8.10 lays them on a *line*
  (rendering's note, not applied); P0-2 the containment-by-parent rule is lost behind a pointer to §2.5, which never stated
  it; P0-6 a new parenthetical in §4.8 over-states S3's moat decks; P0-7 §4.2 S1's coast clamp does not point to §3.8's
  `spine` reader and downgrade (kernel note 9, not applied); P0-8 §4.11's `build.footprint?: Polygon` no longer matches
  §7.1's `PolygonCm` after the model part declared `Polygon` one ring.
* **determinism (2):** P0-3 "an `insert` whose key already exists is an orphan too" is stated nowhere; P0-5 §7.7 names
  only the blueprint's assignments, not its edits, at log positions 0…k.
* **rendering (1):** P0-4 step (0)'s ≈ 3 ms band cost is stated nowhere (§12.4 keeps only the 5 ms total).

P0-5, P0-7 and P0-8 are also raised by the determinism, kernel and model verifiers (VDC-9 / V-MODEL-06, VK-R0-11,
V-MODEL-12); they are listed here because each touches this part's text or pointers.

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution: the text identity (diff), the mapping's completeness, every number of
every home item present, the identifier diff, every J pointer and its rationale rows, every sub-anchor reference, the
scans, and each issue's absence or disagreement (grep over the whole new document). PLAUSIBLE (reading only): that no
other compressed sentence shifted its meaning — one full side-by-side reading of the old and new text, no second reader —
and NEW-PIPE-1's reading of `sea_wall` (supported by §5.3's quay-reachability row and F-WALL's test).

## 2. Method

1. **Identity.** `diff` of l. 2505–3915, 6606–6777 and 8871–9139 against `new/pipeline/01`–`10`: equal except the II.3 and
   II.4 heading renames (CF-PIPE-08, `assemble-r0.md` §1).
2. **Reading.** Old and new text read side by side, subsection by subsection (§4.1 … §4.12, §10.1 … §10.4, PART II intro,
   II.1 … II.6, PART III); every inventory record of the subsection then checked against both. Every reference target in
   another part was read at its new place (§1.1, §2.2, §2.3, §2.5, §2.6, §2.7, §2.8, §2.9, §3.3, §3.7, §3.8, §5.1, §5.2,
   §5.3, §6.1, §6.2, §6.3, §6.5, §7.1, §7.2, §7.3, §7.4, §7.6, §7.7, §8.1, §8.2, §8.5, §8.6, §8.9, §8.10, §9.1, §9.2, §9.4,
   §9.6, §11.2, §12.3, §12.4, §12.5, §12.6, §12.7, §13.1, §13.2, §13.5, §13.6, §14, §16, the rationale file).
3. **Mapping completeness.** A script joined the 459 inventory records with `canon.json`'s `by_inventory_id` and the
   mapping table: 459 of 459 mapped, 0 extra, 0 kind mismatches; each mapping's disposition agrees with the canon's action
   (365 state, 47 reference, 3 section restatement, 2 moved out, 29 rationale, 2 history), the only split being
   PIPELINE-338 (part kept, part referenced).
4. **Numbers.** Every number in the inventory statement of each of the 365 home items is present in the new part
   (0 missing); every number of the canon's detail gaps for pipeline-homed facts is present.
5. **Identifiers.** The backticked identifiers of the old part missing from the new part (23) were each traced (§7).
6. **Clause coverage, both ways.** Content-word coverage of the 792 old clauses against the new document and of the 803
   new clauses against the archive; the 82 and 52 clauses below 0.97 were read: fix-round tags, rationale passages now in
   the rationale file, history, or unions — no loss or new fact beyond the issues below.
7. **Judgment pointers.** 55 distinct J ids are cited; each has an index row. Each of the 29 rationale-out items has its
   "(J-x)" in the part, its Part A row and its index row; the rationale file's Part F.3 equals the rewrite's §9 passages
   (30 lines, identical).
8. **Anchors.** The 137 distinct §-references of the part (e.g. "§3.3 pool step 3", "§7.3 item 1", "§7.3 (b) 2",
   "§2.2 rule 7", "§6.3 case (4)", "§13.6 (2)", "§7.3's S12 row") resolve to existing numbered items.
9. **Scans.** 0 "PENDING FABLE REVIEW"; 0 fix-round ids (NF-, VP, NP, VK, VD, NR, VS, X-, "round N"); "later" occurs 26
   times, each ordinary English inside an algorithm or an owner-staged subject (the village product, the evolution engine,
   the staged layers, "setting packs later" D-6); no TBD, "open", "deferred" or "to be decided".

## 3. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| P0-1 | minor | conflict | pipeline | §4.9's S12b table, row "trees at render" (PIPELINE-317, l. 3686): green entities are instanced by §8.10's stamp "or a jittered grid (orchards 6–8 m, avenues and hedgerows 8–12 m)". §8.10 — the home of instance layouts (RENDERING-276, -306, -307; §8.3's census RENDERING-143) — lays orchards on a jittered **grid** (ordinal (u, v)) and avenues, street trees and hedgerows on a jittered **line** (ordinal i along the row). The disagreement predates the pass (archive l. 4753 vs l. 7715), the canon did not list it, and the rendering rewrite's cross-part note asking §4.9 to point to §8.10 was not applied. | Replace the layout clause by a pointer: "instanced by §8.10's layouts — a stamp for areas, a jittered grid for orchards, a jittered line for avenues, street trees and hedgerows — at the spacings of the rows above". Minimum: "a jittered grid (orchards 6–8 m) or line (avenues and hedgerows 8–12 m)". |
| P0-2 | minor | lost | pipeline | §4.5 Grower (PIPELINE-198, l. 3172): "A district's faces and their containment are §2.5's (O11 b)". The archive stated the rule only here (l. 4169–4170): "after S8 cuts lanes inside them, the finer faces inherit the district through `parent`, so containment is 100 % by construction (O11 b)". §2.5 — archived and new — never stated it (its `District.faces` comment says only "L1 coarse faces, before and after infill"); the canon's "section restatement of §2.5" label was wrong, so the pointer targets a section that does not state the rule. §5.3's containment row checks the invariant; nothing states why it holds. | Restore the sentence at §4.5. Alternatively add it to §2.5 and keep the pointer, or point to §3.3 step 3 ("a district's face set is its L1 faces and every face nested in them") and §5.3's containment row. |
| P0-3 | minor | lost | determinism (alt. pipeline) | §10.4 setting packs (PIPELINE-400, l. 6772): a pack's row operations are "orphaned and reported exactly as a user override is (§7.6; LC-22)". The archive's §10.4 (l. 8389) added "an `insert` whose key already exists is an orphan too"; §7.6's override bullet (the home, DETERMINISM-557, l. 5323–5325) covers only a row a newer version changed or removed. The `insert` case is stated nowhere in the new document (grep). | Add to §7.6's "Overrides are row operations" bullet: "an `insert` whose key already exists is an orphan too". Alternatively restore the clause in §10.4. |
| P0-4 | minor | lost | rendering | §4.7 S10 (0) now says "(cost §12.4)" (PIPELINE-256, l. 3406). The archive's split — "≈ 3 ms at CITY with the margin bands, plus ≈ 2.3 ms to rebuild the L3 static partitions it touched" (l. 4440) — lived only in §4.7. §12.4's S10 (0) row holds the 5 ms total and §3.3 step 1 the ≈ 2.3 ms rebuild; the ≈ 3 ms band figure is stated nowhere (grep). The pipeline rewrite's note R-1 asked §12.4 to keep the split. | §12.4's S10 (0) row: "≈ 3 ms bands + ≈ 2.3 ms L3 partition rebuild (§3.3 step 1)". |
| P0-5 | minor | lost | determinism | §4.2 S0 (PIPELINE-054, l. 2642): "Intent expansion, and the blueprint's assignments and edits entering the log, are §7.7's". §7.7 One path (l. 5384) names only "A blueprint's assignments become `assign` events at log positions 0…k"; the edits half survives only in §2.9 ("enter as the log's first events (§7.7)"), which points back to §7.7. The archive's §4.2 S0 and §2.9 had "assignments and edits … at log positions 0…k". Pipeline note D-6 asked §7.7 to keep it. Same finding as verify-determinism VDC-9 and verify-model V-MODEL-06. | §7.7 One path: "A blueprint's assignments and edits become `assign` and edit events at log positions 0…k when the document is created". |
| P0-6 | minor | new-problem | pipeline | §4.8 Water furniture, Bridges (PIPELINE-297, l. 3593–3594): the rewrite replaced the archive's pointer "(§4.2 S1 (5), S3 (2) and (10), …)" with the parenthetical "S3's on the moats and canals it carves (every gate across a city moat, the castle gate across a ring castle moat, along a canal at the crossing spacing row)". §4.2 S3 (10), the home, places a city-moat deck only "at every main gate and at a harbour gate (7), where the gate's route crosses the channel"; a road-less postern and a river water gate get none. A new restatement in a non-home that over-states the home. | Restore the pointer: "S3's on the moats and canals it carves (§4.2 S3 (2), (10))". Or quote the home: "at every main gate and harbour gate across a city moat, …". |
| P0-7 | minor | conflict | pipeline | §4.2 S1 (2) Simplicity (PIPELINE-062, l. 2669–2670) takes the local feature size from "the base shape's medial axis, from its straight skeleton". §3.8 now lists this clamp as a `spine` reader whose downgrade is the sampled medial axis (l. 2371–2372, 2413, 2420). §4.2 names neither the `spine` use nor the downgrade (kernel note 9, not applied). The texts agree; §4.2 lacks the link a reader needs to find the downgrade. Same finding as verify-kernel VK-R0-11. | §4.2 S1 (2): "(the distance to the base shape's medial axis — §3.8's `spine` reader, with its sampled-medial-axis downgrade; …)". |
| P0-8 | minor | conflict | pipeline | §4.11's `ConversionOp` (PIPELINE-332, l. 3766) has `{ op: 'build'; …; footprint?: Polygon }` and says "`build` below is §7.1's `build` event". §7.1's event has `footprint?: PolygonCm` (l. 4638). The model part now declares `type Polygon = PointCm[] /* one ring */` (l. 1167, its deviation D1), so a holed footprint fits §7.1 and not §4.11. The archive declared no `Polygon`, and the canon's alias (`Polygon = PolygonCm`) made the two agree. Same finding as verify-model V-MODEL-12. | §4.11: `build.footprint?: PolygonCm`, as §7.1. The other `Polygon` fields of the part are single rings and stay. |

## 4. Open items owned by this part (UNFIXED: none)

| item | where it is fixed (checked) | verdict |
|---|---|---|
| NP5-1 | §4.1 S11 row: "a row's party wall is the plot's shared L3 side line carrying the `party_wall` rows, §4.7" (CF-PIPE-03). Model half, §2.6 "the stored composition" (1): every face sharing a split edge (the building's yard parts, a row neighbour's footprint across a party wall, a neighbouring plot's L4 face across the plot line) gains the vertex and is in the storing edit's effective scope. The levels are an L4 same-level split, or an L4 Steiner vertex placed by `splitThrough` on a plot line or kerb. Each vertex is guarded by a `('composition', …)` indexed vertex role row. | FIXED |
| NP5-2 | §4.1 S5 row and L0-writer sentence (canon ruling CF-PIPE-10 verbatim); §4.2 S1 (5) "in S5b at stages k ≥ 2 and in every epoch"; §4.3 Result "under the same F-ROUTE ladder"; §4.4 S5b "It routes under S4's F-ROUTE ladder (§5.2), extra-bridge rung included …". Companions: §5.2 F-ROUTE "where" names S5b; rationale J-I18 lists S5b's L0 rows. | FIXED |
| NP5-3 | (a) §10.4: "re-draws exactly the unedited names drawn from that field, listed for confirmation (§6.3 case (4)), and never the row's other names"; §7.6's canonical sentence has the same order. (b) §7.4's warp paragraph: "for a stored composition the check also requires its composed wings to unite to the moved face, its rooms to lie inside it and its tower centres inside or on it (§2.6)". | FIXED |
| NP5-4 | No text of the part names `Tower`, `Room`, `Porch` or the carried set (grep: 0). §2.6 defines `Room { ring; wing; subLocation? }`, `Porch` in relative form and `ComposedTower`; §2.7's `Tower` comment names `ComposedTower`; §14 holds no composition copy. | FIXED |
| VD5-6 | §10.4: "how long its content stays in the document is §2.9's pack-set rule" and "retained there by §2.9's pack-set rule". §2.9's pack set keeps a pack while the base recipe, any log event or a truncated event held on a saved redo stack names it. §7.4 and §7.6 point to §2.9. | FIXED |
| VS5-2 (scope-owned; pipeline companion) | PART II intro, II.2 ("the `area` template is the base's own bent-cut fabric … opened as a `refine` close-up") and the II.1 `NeighbourhoodRequest` comment; §13.6 (2) and the D5Pair comment agree. | FIXED (companion) |

GAP-1 (canon): the part states no value for the branch re-join constant k, as the canon rules; the gap stays with the
owner and Fable. It is not an issue of this pass.

## 5. Conflicts routed to this part

| conflict | verdict |
|---|---|
| CF-PIPE-01 … CF-PIPE-10 | each RESOLVED; see the last ten rows of §8 |
| KERNEL-C12 | RESOLVED — §4.1 "Static index partitions are rebuilt as §3.3 states"; §3.3 lists the three moments, never per batch |
| MODEL-C11 | RESOLVED — §4.2 S1 (5) "A deck placed before its water exists" is the canonical list (carve, outer moat as a carve, S1's water operator, F-ROUTE's rung inside one of these); §2.2 rules 3 (c) and 7 point here |
| CANON-C05 | RESOLVED — the mechanisms §12.4 assumes are stated in §4 (fBm grid and refinement §4.2 S1 (1); hydrology grids §4.2 S1 (3); hexagonal lattice §4.3; splat and three-box blur §4.5; 16 m distance rasters and top-k §4.7 S10b; margin band §4.5), each marked "Mechanism (budget: §12.4)"; §12.4's header now points to §4 |
| MODEL-C04 (alignment) | RESOLVED — §4.8 names `Castle.surround` (esplanade, park, plaza, cliff skirt, or none) and `Castle.moat`; values match §2.7 |
| DETERMINISM-C-5 | RESOLVED — §4.2 S1 (5) states the drawn-bridge rule (a site within `crossing.snapM`, 20 m, else one L0 batch of two shore splits) |
| CANON-C09 | RESOLVED — §4.7 S11 points to §13.5 for FTG's measured entrance distance (2.99 m there) |
| SCOPE-C09 | RESOLVED — no edit; the granularity table's 4 m narrowest frontage unchanged |
| NEW-PIPE-1 (found by the rewrite) | RESOLVED — §4.4 S5a "under either wall a water gate stands at every quay access" equals the archive's §4.4 and §4.8 wording, agrees with §5.3's "every quay reachable … except at a gate" row and F-WALL's test, and §2.7's `waterfront` comment now defers to §4.4 S5a. PLAUSIBLE that this is the intended design; Fable should re-check |

## 6. Cross-part notes addressed to this part

| note (source) | verdict |
|---|---|
| model 4 — MODEL-164 / MODEL-167 move in; §4.2 S1 (5) is the one statement of the `deck_end` writers and their levels | reflected. §4.2 S1 (1) and (3) state the moved facts and §2.3 points there. S1 (5) states S1's sites (L0), S3's carved decks ("the same form", L0 also in §4.1's S3 row), the extra-bridge shore splits of S4, S5b and an edit plus a drawn bridge (L0), and preparation-batch decks (L1, promoted by the water's L0 batch) |
| model 5 — §4.4 S5a owns the water gates' bank placement and the waterfront rows | reflected (S5a "Water and the waterfront"; §2.7 defers) |
| model 6 — §4.8 surround uses `Castle.surround`'s values; moat = `Castle.moat` | reflected |
| model 7 — §4.11 states the complete conversion kind list once | reflected: `ConversionOp` lists every kind, abandon / decay / ruin / clear / rebuild included; §2.8 and §7.1 point to it |
| model 18 — cite §2's anchors as they now read | reflected: §2.2 rules 1, 3, 5, 7, §2.9 step 3 and §2.6's carry / check / wing-carrying rule / datum step all resolve |
| kernel 9 — S1's coast clamp as §3.8's `spine` reader with its downgrade | **not reflected → P0-7**. The note is valid: the texts agree, but §4.2 gives no pointer to where the downgrade is stated |
| kernel 10 — §4.1 points to §3.3's three rebuild moments | reflected |
| determinism 7 — τ not restated at §4.5; drawn bridge canonical at §4.2 S1 (5); §4.4 S5b points to F-ROUTE | reflected (the part's only "τ" is the nucleus tip factor) |
| determinism decision 1 / note 10; scope note 1 — tag style | not raised for this part: every fix-round id is gone. Audit-lens ids (GEO-, LC-, FTG-, COV-, SCL-, MFP-, DEF-, IMP-, MN-) are kept, as the rendering part keeps them; principle (3) removes history and round narration, which these ids are not. The document-wide convention is the validator's call (the kernel part keeps fix-round ids: VK-R0-8) |
| rendering — §4.9's "jittered grid" vs §8.10's line for avenues and hedgerows | **not reflected → P0-1** |
| rendering — II.4 points to §8.6 for the render tier | reflected ("§8.2's and §8.6's") |
| rendering — §4.1 (PIPELINE-043, -048, -049) points to §8.9 and §12.3 | reflected |
| rendering — the mechanisms §12.4 points to stay stated in §4 | reflected (CANON-C05 row of §5) |
| scope 5 — D-19's values stay stated (gate law §4.2 S3, district band §4.5, stage rows §4.2 S2, tower spacing §4.8) | reflected |
| scope 6 — R-3 would move the target of §15.1's E3 pointer | consistent: II.4 still states the road programs, so §15.1's "(the road programs II.4 adds)" resolves |

## 7. Observations (not raised)

* **Identifiers of the old part absent from the new part (23), all traced.** Present at their home in the document:
  `.dd2vtt` (§8.1), `@plat/api` (§5.1 (5)), `FaceRef` and `gate_opening` / `treatment` (§2.5), `entryMode` (§2.9, §4.7 as
  `recipe.entryMode`), `moat: 'inner'` (§13.2), `naming` / `naming.quarter` / `naming.emblem` (§6.1), `unserved` (§5.2),
  `workLimit` (now `StageDecl.workLimits`), `{ kind: 'relations'; … }` (§11.2), `disc` / `lozenge` (outline list at §4.2
  S1 (2); II.6's narrower list dropped by CF-PIPE-09). Line-wrapped, still present: `rosterMode: 'minimiseUnemployment'`.
  History or rationale: `N_d − N_q`, `builtBlockShare = 1 − 0.38`, `r1-integration-log.md`, the receipt's long path.
  Issues: `faces` / `parent` (P0-2) and `insert` (P0-3).
* **Duplicates elsewhere of this part's homes, values agreeing** (for those parts' verifiers):
  * §2.8's decline-hooks bullet still restates the sentences unioned into §4.11 (model note M-5);
  * §5.2 F-CASTLE's test column repeats §4.8's castle acceptance (VDC-10);
  * §5.2 F-SITING lacks "lowest-priority classes first", which §4.7 S10b states as how the rung is computed (canon R4; VDC-5).
* **Size.** The part is 201 055 bytes against 237 257 (85 %); the document is 76.5 % against the pass's 55–65 % target.
  The rewrite report records the reason (dense home content). This is not an issue kind.
* **Batch table.** S12a, S10a and S10b are merged into one "none" row at S12a's position. Stage order is unaffected because
  none of them writes a batch.
* **Scratchpad hazard.** The parallel verify lanes share one session scratchpad. A file with a generic name (`new-part.md`)
  was overwritten by another lane mid-run. This lane rebuilt every scratch file in a private subdirectory
  (`vp-verify-pipeline/`) and re-ran the affected checks; the results were identical.

## 8. Checked list — every inventory id of the part (459; none sampled)

Verdicts: **OK** (the fact is stated with its archived meaning at the mapped place; for a reference, the pointer is present and the target states the fact; for a rationale item, the "(J-x)" pointer is present and the rationale file carries the row and the passage), **RESOLVED** (an internal conflict), or **ISSUE P0-n** (§3). Totals: 451 OK or RESOLVED, 8 with an issue.

| id | kind | stated in the archive at | now (the rewrite's mapping) | verdict |
|---|---|---|---|---|
| PIPELINE-001 | rule | §4 intro | §4 intro | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-002 | mechanism | §4.1 | §4.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-003 | interface | §4.1 | §4.12 `StageDecl` (the field list); §4.1 now reads "each stage registers a `StageDecl` (§4.12)" and keeps the op-form a… | OK — field list stated once in §4.12 `StageDecl` (inputs, outputs, streamKeys, invariants with scope, ladder, workLimits, budgetMs reporting only, batch, lineageUnit, lazy, txForm); §4.1 points; op-form list kept at §4.1 (CF-PIPE-02) |
| PIPELINE-004 | rule | §4.1 | §4.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-005 | rule | §4.1 | §4.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-006 | rule | §4.1 | §4.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-007 | rule | §4.1 | §4.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-008 | rule | §4.1 | §4.1 "Why this order" (a) | OK — (a); outer moat by S5a's carve path kept |
| PIPELINE-009 | rule | §4.1 | §4.1 "Why this order" (b) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-010 | rule | §4.1 | §4.1 "Why this order" (c) — "large institutions" are now S7b claims, pointer to §4.2 S3 (12) and §4.5 S7b (3) (CF-PIPE-… | OK — (c) now points to §4.2 S3 (12) (lists plazas, precinct, market square, castle bailey) and §4.5 S7b (3) for large institutions (CF-PIPE-01) |
| PIPELINE-011 | rule | §4.1 | §4.1 "Why this order" (d); the construction itself §4.2 S3 intro and (4)–(10) | OK — (d) points to §4.2 S3, whose intro states the one construction and 'no later stage recomputes a boundary they were fixed on' |
| PIPELINE-012 | rule | §4.1 | §4.1 "Why this order" (e) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-013 | rule | §4.1 | §4.1 laziness contract | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-014 | rule | §4.1 | §4.1 laziness contract | OK — 'two districts (or a district and the hinterland)' now 'two face sets' (face set defined §3.3 step 3); same meaning |
| PIPELINE-015 | rule | §4.1 | §4.1 laziness contract | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-016 | rule | §4.1 | §4.1 laziness contract | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-017 | rule | §4.1 | referenced to §5.2 F-CUT (moved out; §4.6 step 8 (d) reads the allocation's pending claims) | OK — moved out: §5.2 F-CUT substitution rung reads 'the district's allocation, never live roster state' |
| PIPELINE-018 | rule | §4.1 | referenced to §6.3 (DETERMINISM-224) | OK — reference: §6.3 states the four draw cases; §4.1 reads 'only in §6.3's cases' (CF-PIPE-05) |
| PIPELINE-019 | rule | §4.1 | referenced to §9.1 (RENDERING-330) | OK — reference: §9.1 View (never hashed, per zoom stop) and §9.2 metrics from the bundled fonts |
| PIPELINE-020 | rule | §4.1 | §4.1 one-click first paint | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-021 | rule | §4.1 | §4.1 one-click first paint | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-022 | budget | §4.1 | referenced to §12.5 (RENDERING-538) | OK — reference: §12.5 states < 1 s to ≈ 14 200 buildings, ≈ 2.3 s at the 35 000-building cap (120 000 people), single-worker knee ≈ 11 400, no preview |
| PIPELINE-023 | rule | §4.1 | referenced to §6.2 (DETERMINISM-597) | OK — reference: §6.2 eager model; document digest separate (§2.9) |
| PIPELINE-024 | test | §4.1 | referenced to §6.5 (9) (DETERMINISM-293) | OK — reference: §6.5 (9) derived-complete digest (50 METROPOLIS seeds, three orders, pool sizes 0–3, S12b named) |
| PIPELINE-025 | rule | §4.1 | referenced to §3.3 (KERNEL-103) | OK — reference: §3.3 'One level per transaction' |
| PIPELINE-026 | mechanism | §4.1 | §4.1 batch table, S1 row | OK — S1 row; Bridge state now by pointer to §4.2 S1 (5), which states it |
| PIPELINE-027 | mechanism | §4.1 | §4.1 batch table, S3 row | OK — S3 row; reservation list by pointer to §4.2 S3 (12), which lists them |
| PIPELINE-028 | mechanism | §4.1 | §4.1 batch table, S4 row (NP5-2 context: S5b row added beside it) | OK — S4 row; the in-operator case now stated once at §4.2 S1 (5) 'A deck placed before its water exists' |
| PIPELINE-029 | mechanism | §4.1 | §4.1 batch table, S5 row — adds "k ≥ 2 — S5b L0 … two same-level shore splits before S5b's L1 batch" (NP5-2, CF-PIPE-10) | OK — S5 row carries the NP5-2 / CF-PIPE-10 S5b L0 batch verbatim |
| PIPELINE-030 | mechanism | §4.1 | §4.1 batch table, S6 row | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-031 | mechanism | §4.1 | §4.1 batch table, S7 row | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-032 | mechanism | §4.1 | §4.1 batch table, S7b row and S12a/S10a/S10b row | OK — S12a, S10a, S10b merged into one 'none' row; no batch order changes |
| PIPELINE-033 | mechanism | §4.1 | §4.1 batch table, S8 and S9 rows | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-034 | mechanism | §4.1 | §4.1 batch table, S10 row (step (0) contents point to §4.7 S10 (0)) | OK — step (0) contents at §4.7 S10 (0) and §4.5 (margin band, 2 m a side); hinterland recipe at §4.9 / §4.7 S10 (0) |
| PIPELINE-035 | mechanism | §4.1 | §4.1 batch table, S11 row — corrected: "a row's party wall is the plot's shared L3 side line carrying the `party_wall` … | OK — NP5-1: party wall = the plot's shared L3 side line carrying `party_wall` rows (CF-PIPE-03) |
| PIPELINE-036 | mechanism | §4.1 | §4.1 batch table, S12b row + the carry sentence under the table | OK — S12b row plus the carry sentence under the table (J-P47) |
| PIPELINE-037 | mechanism | §4.1 | referenced to §7.3 (section restatement) | OK — section restatement: §7.1 dry run runs a chained operator's whole chain on the overlay; §7.3 chain order; decks by §4.2 S1 (5); multi-level conversions §4.11 |
| PIPELINE-038 | rule | §4.1 | §4.1 sentence under the batch table — L0 writers now "S1, S3, S4 and S5b (F-ROUTE's extra bridge only) and S5a" (NP5-2,… | OK — L0 writers 'S1, S3, S4 and S5b (F-ROUTE's extra bridge only) and S5a' (NP5-2) |
| PIPELINE-039 | decision | §4.1 | rationale → J-P46 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P46)" left at §4.1 | OK — rationale → J-P46: '(J-P46)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-040 | rule | §4.1 | §4.1 sentence under the batch table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-041 | rule | §4.1 | referenced to §3.3 step 1 (KERNEL-138) | OK — reference: §3.3 'Static partitions are rebuilt at three moments, never per batch' and pool step 1 (KERNEL-C12) |
| PIPELINE-042 | rule | §4.1 | referenced to §5.1 (5) (DETERMINISM-015) | OK — reference: §5.1 (5) wall-clock only in `@plat/api`'s worker host; 'never milliseconds' kept at §4.1 |
| PIPELINE-043 | mechanism | §4.1 | referenced to §8.9 (RENDERING-241) | OK — reference: §8.9 threads and what-crosses table (nothing model-sized reaches the main thread) |
| PIPELINE-044 | mechanism | §4.1 | §4.1 workers bullet | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-045 | rule | §4.1 | §4.1 workers bullet | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-046 | mechanism | §4.1 | §4.1 workers bullet (hinterland unit) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-047 | rule | §4.1 | §4.1 workers bullet | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-048 | measurement | §4.1 | referenced to §12.3 (RENDERING-509) | OK — reference: §12.3 'Which configuration is primary' (sweep rule ≤ 1.10 × law, 200 seeds at pool sizes 0–3) |
| PIPELINE-049 | fallback | §4.1 | referenced to §12.3 (RENDERING-500) | OK — reference: §12.3 single-worker column = pre-decided fallback; golden run pool sizes 0–3 |
| PIPELINE-050 | decision | §4.1 | rationale → J-P10 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P10)" left at §4.1 | OK — rationale → J-P10: '(J-P10)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-051 | decision | §4.1 | rationale → J-P27 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P27)" left at §4.1 | OK — rationale → J-P27: '(J-P27)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-052 | type | §4.2 S0 | §4.2 S0 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-053 | rule | §4.2 S0 | referenced to §7.7 (1) (DETERMINISM-564) | OK — reference: §7.7 '≈ 200 internal parameters … a pure function held in data' |
| PIPELINE-054 | rule | §4.2 S0 | referenced to §7.7 (DETERMINISM-575) | ISSUE P0-5 — §7.7 states only the assignments at positions 0…k; the edits half is only at §2.9 ('the log's first events'); entryMode survives at §2.9 and §4.7 S10b |
| PIPELINE-055 | rule | §4.2 S0 | referenced to §1.1 (SCOPE-063) | OK — reference: §1.1 (band chooses the rung, a rung without a population takes its target, F-EDIT conflict, LadderRouter below 1 500) |
| PIPELINE-056 | mechanism | §4.2 S0 | §4.2 S0 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-057 | rule | §4.2 S0 | §4.2 S0 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-058 | mechanism | §4.2 S1 (1) | §4.2 S1 (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-059 | number | §4.2 S1 (1) | §4.2 S1 (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-060 | mechanism | §4.2 S1 (2) | §4.2 S1 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-061 | mechanism | §4.2 S1 (2) | §4.2 S1 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-062 | rule | §4.2 S1 (2) | §4.2 S1 (2) | ISSUE P0-7 — the clamp reads the skeleton's medial axis but names neither §3.8's `spine` use nor its downgrade (kernel note 9 not reflected) |
| PIPELINE-063 | rule | §4.2 S1 (2) | §4.2 S1 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-064 | test | §4.2 S1 (2) | referenced to §13.2 (SCOPE-183) | OK — reference: §13.2 stage property tests (10 000 outlines per intent) |
| PIPELINE-065 | rule | §4.2 S1 (2) | §4.2 S1 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-066 | rule | §4.2 S1 (2) | referenced to §8.2; the clip-to-land rule (GEO-14) kept at §4.2 S1 (2) with the pointer | OK — reference: §8.2 relief tier (marching squares per tile); clip-to-land and the golden fixtures kept at §4.2 S1 (2) |
| PIPELINE-067 | mechanism | §4.2 S1 (2) | §4.2 S1 (2) | OK — ground placement now by pointer to II.6 'Where it floats', which states it; occlusion §8.4 |
| PIPELINE-068 | mechanism | §4.2 S1 (2) | §4.2 S1 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-069 | mechanism | §4.2 S1 (3) | §4.2 S1 (3) (flat resolution and lake typing unioned from §2.3) | OK — flat resolution and lake typing unioned from §2.3 |
| PIPELINE-070 | mechanism | §4.2 S1 (3) | §4.2 S1 (3) | OK — carve bed monotone / D8 recompute unioned (MODEL-164); the VG live-course comparison survives in PART III |
| PIPELINE-071 | number | §4.2 S1 (3) | §4.2 S1 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-072 | rule | §4.2 S1 (3) | §4.2 S1 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-073 | number | §4.2 S1 (3) | §4.2 S1 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-074 | mechanism | §4.2 S1 (3) | §4.2 S1 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-075 | rule | §4.2 S1 (4) | §4.2 S1 (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-076 | interface | §4.2 S1 (5) | §4.2 S1 (5) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-077 | number | §4.2 S1 (5) | §4.2 S1 (5) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-078 | rule | §4.2 S1 (5) | §4.2 S1 (5) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-079 | rule | §4.2 S1 (5) | §4.2 S1 (5) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-080 | rule | §4.2 S1 (5) | §4.2 S1 (5) bullet "A site no way uses" ("not drawn, named, labelled or exported" unioned from §2.7) | OK — 'not drawn, named, labelled or exported' unioned |
| PIPELINE-081 | rule | §4.2 S1 (5) | §4.2 S1 (5) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-082 | rule | §4.2 S1 (5) | §4.2 S1 (5) bullet "A deck where no site stands" — standing-water list adds S5b (NP5-2); "every bridge has one structur… | OK — S5b added to the standing-water list (NP5-2); 'every bridge has one structure' unioned |
| PIPELINE-083 | rule | §4.2 S1 (5) | §4.2 S1 (5) bullet "A deck placed before its water exists" — now the canonical list (carve, outer moat as a carve, S1's… | OK — canonical deck-before-water list (MODEL-C11) |
| PIPELINE-084 | mechanism | §4.2 S1 (6) | §4.2 S1 (6) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-085 | rule | §4.2 S1 (7) | §4.2 S1 (7) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-086 | rule | §4.2 S1 (8) | §4.2 S1 (8) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-087 | number | §4.2 S1 (8) | §4.2 S1 (8) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-088 | mechanism | §4.2 S1 (9)-(10) | §4.2 S1 (9)-(10) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-089 | rule | §4.2 S1 | referenced to §5.2 F-RIVER; "restart-free" sentence kept at §4.2 S1 with the pointer | OK — reference: §5.2 F-RIVER ladder; restart-free sentence kept |
| PIPELINE-090 | mechanism | §4.2 S2 | §4.2 S2 | OK — the government seat list now stated only at §10.2 (checked) |
| PIPELINE-091 | rule | §4.2 S2 | §4.2 S2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-092 | rule | §4.2 S2 | §4.2 S2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-093 | rule | §4.2 S2 | §4.2 S2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-094 | number | §4.2 S2 | §4.2 S2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-095 | decision | §4.2 S2 | rationale → J-P6 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P6)" left at §4.2 S2 | OK — rationale → J-P6: '(J-P6)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-096 | measurement | §4.2 S2 | §4.2 S2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-097 | number | §4.2 S2 | §4.2 S2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-098 | decision | §4.2 S2 | rationale → J-P5 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P5)" left at §4.2 S2 | OK — rationale → J-P5: '(J-P5)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-099 | type | §4.2 S2 | §4.2 S2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-100 | rule | §4.2 S3 | §4.2 S3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-101 | mechanism | §4.2 S3 (1) | §4.2 S3 (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-102 | mechanism | §4.2 S3 (1) | §4.2 S3 (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-103 | rule | §4.2 S3 (1) | §4.2 S3 (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-104 | number | §4.2 S3 (2) | §4.2 S3 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-105 | rule | §4.2 S3 (2) | §4.2 S3 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-106 | number | §4.2 S3 (2) | §4.2 S3 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-107 | rule | §4.2 S3 (3) | §4.2 S3 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-108 | rule | §4.2 S3 (4) | §4.2 S3 (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-109 | mechanism | §4.2 S3 (4) | §4.2 S3 (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-110 | rule | §4.2 S3 (4) | §4.2 S3 (4) | OK — J-P45 pointer; rationale clauses left |
| PIPELINE-111 | rule | §4.2 S3 (4) | §4.2 S3 (4) | OK — the 1.5 × L* bound follows from (7)'s guard as stated |
| PIPELINE-112 | measurement | §4.2 S3 (4) | §4.2 S3 (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-113 | rule | §4.2 S3 (4) | §4.2 S3 (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-114 | mechanism | §4.2 S3 (5) | §4.2 S3 (5) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-115 | mechanism | §4.2 S3 (6) | §4.2 S3 (6) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-116 | rule | §4.2 S3 (6) | §4.2 S3 (6) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-117 | rule | §4.2 S3 (7) | §4.2 S3 (7) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-118 | rule | §4.2 S3 (7) | §4.2 S3 (7) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-119 | rule | §4.2 S3 (7) | §4.2 S3 (7) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-120 | mechanism | §4.2 S3 (8) | §4.2 S3 (8) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-121 | rule | §4.2 S3 (8) | §4.2 S3 (8) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-122 | mechanism | §4.2 S3 (9) | §4.2 S3 (9) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-123 | test | §4.2 S3 (9) | §4.2 S3 (9) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-124 | evidence | §4.2 S3 (9) | dropped (history; validation record) — one receipt pointer kept at §4.2 S3 (9) | OK — history dropped; receipt pointer `fixall_pipeline_r2_levelset.out` kept at S3 (9) |
| PIPELINE-125 | mechanism | §4.2 S3 (10) | §4.2 S3 (10) | OK — townSide values now by pointer to §4.8 ('dry_ditch' \| 'none', default dry_ditch) |
| PIPELINE-126 | number | §4.2 S3 (10) | §4.2 S3 (10) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-127 | number | §4.2 S3 (10) | §4.2 S3 (10) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-128 | rule | §4.2 S3 (10) | §4.2 S3 (10) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-129 | number | §4.2 S3 (10) | §4.2 S3 (10) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-130 | mechanism | §4.2 S3 (11) | §4.2 S3 (11) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-131 | test | §4.2 S3 (11) | referenced to §13.2 (SCOPE-191) | OK — reference: §13.2 walled coastal harbour fixtures (all conditions present) |
| PIPELINE-132 | rule | §4.2 S3 (12) | §4.2 S3 (12) | OK — S3 (12) canonical list; 'every other claim larger than a block is S7b's' added as pointer (CF-PIPE-01) |
| PIPELINE-133 | term | §4.2 S3 (13) | §4.2 S3 (13) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-134 | rule | §4.2 S3 (13) | §4.2 S3 (13) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-135 | decision | §4.2 | rationale → J-P26 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P26)" left at §4.2 | OK — rationale → J-P26: '(J-P26)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-136 | decision | §4.2 | rationale → J-P35 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P35)" left at §4.2 | OK — rationale → J-P35: '(J-P35)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-137 | decision | §4.2 | rationale → J-P44 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P44)" left at §4.2 | OK — rationale → J-P44: '(J-P44)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-138 | decision | §4.2 | rationale → J-P45 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P45)" left at §4.2 | OK — rationale → J-P45: '(J-P45)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-139 | decision | §4.2 | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.2 | OK — rationale → J-P36: '(J-P36)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-140 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-141 | mechanism | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-142 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-143 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-144 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-145 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-146 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-147 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-148 | mechanism | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-149 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-150 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-151 | rule | §4.3 | referenced to §5.2 F-ROUTE; "decks are fixed graph edges" kept at §4.3 | OK — reference: §5.2 F-ROUTE ladder; 'decks are fixed graph edges' kept |
| PIPELINE-152 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-153 | test | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-154 | rule | §4.3 | §4.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-155 | mechanism | §4.3 | referenced to §7.3 operator table (DETERMINISM-412) | OK — reference: §7.3 operator table S4 row |
| PIPELINE-156 | rule | §4.4 | §4.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-157 | mechanism | §4.4 S5a | §4.4 S5a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-158 | number | §4.4 S5a | §4.4 S5a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-159 | rule | §4.4 S5a | §4.4 S5a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-160 | rule | §4.4 S5a | §4.4 S5a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-161 | test | §4.4 S5a | referenced to §13.5 (B-REF anisotropy row); calibration target kept at §4.4 S5a | OK — reference: §13.5 outline-anisotropy row (monotone in the anisotropy row); calibration target kept |
| PIPELINE-162 | mechanism | §4.4 S5a | §4.4 S5a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-163 | rule | §4.4 S5a | §4.4 S5a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-164 | rule | §4.4 S5a | §4.4 S5a "Water and the waterfront" (§3.3 rule 3 promotion unioned) | OK — §3.3 rule 3 promotion unioned (MODEL-129) |
| PIPELINE-165 | rule | §4.4 S5a | §4.4 S5a "Water and the waterfront" (anchoring on shore/bank/cliff/enceinte and the enclosed/sealed test unioned from §… | OK — NEW-PIPE-1 wording equals the archive's §4.4 and §4.8 (gates at every quay access under either wall), agrees with §5.3's quay-reachability row and F-WALL's test; §2.7's `waterfront` comment now defers to §4.4 S5a |
| PIPELINE-166 | rule | §4.4 S5a | §4.4 S5a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-167 | rule | §4.4 S5a | referenced to §5.2 F-WALL; the pull cap kept at §4.4 S5a | OK — reference: §5.2 F-WALL last rung; pull cap kept |
| PIPELINE-168 | mechanism | §4.4 S5a | §4.4 S5a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-169 | rule | §4.4 S5b | §4.4 S5b — routes under S4's F-ROUTE ladder incl. extra bridge; L0 batch before its L1 batch (NP5-2) | OK — NP5-2: S5b routes under S4's F-ROUTE ladder, extra bridge included, L0 batch before its L1 batch |
| PIPELINE-170 | rule | §4.4 S5b | §4.4 S5b | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-171 | test | §4.4 S5b | §4.4 S5b | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-172 | mechanism | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-173 | rule | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-174 | acceptance | §4.4 S5c | referenced to §13.5 table (SCOPE-263) | OK — reference: §13.5 MFCG street-signature row (0.84–0.97 / 0.32–0.68; median 3.5–4.5°) |
| PIPELINE-175 | decision | §4.4 S5c | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 S5c | OK — rationale → J-P4: '(J-P4)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-176 | mechanism | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-177 | evidence | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-178 | rule | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-179 | rule | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-180 | rule | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-181 | rule | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-182 | rule | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-183 | number | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-184 | rule | §4.4 S5c | §4.4 S5c | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-185 | mechanism | §4.4 S5d | §4.4 S5d | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-186 | rule | §4.4 S5d | §4.4 S5d | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-187 | test | §4.4 S5d | §4.4 S5d test ("on ≥ 95 % of seeds" unioned from §5.2 F-BUDGET-STAGE) | OK — '≥ 95 % of seeds' unioned from F-BUDGET-STAGE |
| PIPELINE-188 | number | §4.4 table | §4.4 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-189 | rule | §4.4 table | §4.4 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-190 | test | §4.4 table | §4.4 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-191 | decision | §4.4 | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 | OK — rationale → J-P4: '(J-P4)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-192 | acceptance | §4.4 | §4.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-193 | fallback | §4.4 | §4.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-194 | rule | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-195 | rule | §4.5 | §4.5 "Perimeter and margin band" — the margin band's one statement (perimeter and shared reservation boundaries); §4.1 … | OK — the margin band's one statement at §4.5 (half-width 2 m a side, residue with its side's ground role, perimeter and shared reservation boundaries); §4.1, §4.7 S10 (0), §3.3 pool step 3 and II.1 point here |
| PIPELINE-196 | mechanism | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-197 | rule | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-198 | rule | §4.5 | referenced to §2.5 (section restatement) | ISSUE P0-2 — pointer to §2.5 for containment; §2.5 does not state the parent-inheritance rule |
| PIPELINE-199 | mechanism | §4.5 | §4.5 Quarters | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-200 | rule | §4.5 | §4.5 Quarters (receipts kept as pointers) | OK — receipts kept as pointers |
| PIPELINE-201 | evidence | §4.5 | dropped (history; validation record) — receipts kept at §4.5 Quarters | OK — executed evidence dropped as history; receipts kept at §4.5 Quarters |
| PIPELINE-202 | rule | §4.5 | referenced to §9.4; "S13a names every node of the tree" kept at §4.5 Quarters | OK — reference: §9.4 (city cut min(N_q, L), finer cut between bands as view data, district band labels districts) |
| PIPELINE-203 | decision | §4.5 | rationale → J-P28 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P28)" left at §4.5 | OK — rationale → J-P28: '(J-P28)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-204 | decision | §4.5 | rationale → J-P2 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P2)" left at §4.5 | OK — rationale → J-P2: '(J-P2)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-205 | rule | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-206 | rule | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-207 | mechanism | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-208 | number | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-209 | rule | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-210 | rule | §4.5 | §4.5 Fields, Bands bullet ("`setAttr` … re-derives every block whose band changes" unioned from §2.5) | OK — setAttr re-derives every block whose band changes (unioned) |
| PIPELINE-211 | rule | §4.5 | referenced to §7.2; "a field brush never moves FieldBands" kept at §4.5 Bands | OK — reference: §7.2 field brushes (τ = 0.01, same τ on replay, strokes kept over epochs); samples in §2.8 `DerivationRecord.fields` |
| PIPELINE-212 | rule | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-213 | rule | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-214 | rule | §4.5 | §4.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-215 | rule | §4.5 S7b | §4.5 S7b | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-216 | mechanism | §4.5 S7b (1) | §4.5 S7b (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-217 | rule | §4.5 S7b (2) | §4.5 S7b (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-218 | rule | §4.5 S7b (3) | §4.5 S7b (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-219 | rule | §4.5 S7b (3) | §4.5 S7b (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-220 | decision | §4.5 S7b (3) | rationale → J-P41 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P41)" left at §4.5 S7b (3) | OK — rationale → J-P41: '(J-P41)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-221 | test | §4.5 S7b (3) | §4.5 S7b (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-222 | rule | §4.5 S7b (4) | §4.5 S7b (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-223 | rule | §4.5 S7b (5) | §4.5 S7b (5) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-224 | rule | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-225 | rule | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-226 | test | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-227 | rule | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-228 | test | §4.6 | referenced to §16 M0 (b) (moved out; §4.6 "Sides" points) | OK — moved out: §16 M0 (b) names curved, round-joined, triangular, C-shaped and holed faces |
| PIPELINE-229 | rule | §4.6 (1) | §4.6 (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-230 | number | §4.6 (2) | §4.6 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-231 | rule | §4.6 (3) | §4.6 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-232 | rule | §4.6 (4) | §4.6 (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-233 | measurement | §4.6 (4) | §4.6 (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-234 | rule | §4.6 (5) | §4.6 (5) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-235 | number | §4.6 (6) | §4.6 (6) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-236 | rule | §4.6 (7) | §4.6 (7) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-237 | rule | §4.6 (7) | §4.6 (7) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-238 | rule | §4.6 (7) | §4.6 (7) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-239 | rule | §4.6 (7) | referenced to §7.3 item 1; one-sentence summary and pointer at §4.6 step 7 | OK — reference: §7.3 item 1 carries every element (chains and Corridor records, strips and wedges, neighbour step only, rings changed only by the vertices, promoted vertex returns, Seam records) |
| PIPELINE-240 | decision | §4.6 (7) | rationale → J-P32 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P32)" left at §4.6 (7) | OK — rationale → J-P32: '(J-P32)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-241 | rule | §4.6 (8) | §4.6 step 8 ("each rung under an operation-count work limit; ≤ 3 candidates in all" unioned from §3.5) | OK — operation-count work limit per rung and '≤ 3 in all' unioned (KERNEL-236) |
| PIPELINE-242 | acceptance | §4.6 (8) | §4.6 (8) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-243 | rule | §4.6 (9) | §4.6 (9) | OK — 'drawn once from the district's stream' stated at II.2 |
| PIPELINE-244 | rule | §4.6 (10)-(11) | §4.6 (10)-(11) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-245 | decision | §4.6 (10) | rationale → J-P11 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P11)" left at §4.6 (10) | OK — rationale → J-P11: '(J-P11)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-246 | rule | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-247 | number | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-248 | rule | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-249 | interface | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-250 | interface | §4.6 | §4.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-251 | mechanism | §4.7 S9 | referenced to §3.7; S9's per-district / hinterland runs and the strip's L2 kept at §4.7 S9 | OK — reference: §3.7 corridorUnion (round joins, square ends at gates and bridgeheads); per-district runs and strip L2 kept |
| PIPELINE-252 | rule | §4.7 S9 | §4.7 S9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-253 | mechanism | §4.7 S10a | §4.7 S10a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-254 | rule | §4.7 S10a | §4.7 S10a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-255 | rule | §4.7 S10 (0) | §4.7 S10 (0) (margin bands by pointer to §4.5) | OK — margin bands by pointer to §4.5 |
| PIPELINE-256 | number | §4.7 S10 (0) | referenced to §12.4 (RENDERING-523) | ISSUE P0-4 — the ≈ 3 ms band cost is stated nowhere now (§12.4 row holds the 5 ms total, §3.3 step 1 the ≈ 2.3 ms rebuild) |
| PIPELINE-257 | rule | §4.7 S10 (0) | referenced to §7.3 item 2; the castle-curtain and hinterland-recipe clauses stay at §4.7 S10 (0) | OK — reference: §7.3 item 2 'Shared-edge parts' (after S8/S9, restricted to scope, cross edges attracted); castle-curtain and hinterland clauses kept |
| PIPELINE-258 | mechanism | §4.7 S10 | §4.7 S10 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-259 | number | §4.7 table | §4.7 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-260 | rule | §4.7 S10 (3) | §4.7 S10 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-261 | rule | §4.7 S10 (4) | §4.7 S10 (4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-262 | test | §4.7 S10 (4) | referenced to §13.2 (SCOPE-183) | OK — reference: §13.2 stage property tests (plots on concave, notched, curved blocks) |
| PIPELINE-263 | rule | §4.7 S10 (5)-(6) | §4.7 S10 (5)-(6) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-264 | rule | §4.7 S10 (7) | §4.7 S10 (7) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-265 | rule | §4.7 S10 (8) | §4.7 S10 (8) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-266 | rule | §4.7 S10 (9)-(10) | §4.7 S10 (9)-(10) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-267 | rule | §4.7 S10 | §4.7 S10 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-268 | rule | §4.7 S10 | §4.7 S10 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-269 | rule | §4.7 S10 | §4.7 S10 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-270 | rule | §4.7 S10b | §4.7 S10b | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-271 | rule | §4.7 S10b | §4.7 S10b | OK — block-level acceptance by pointer to §13.5 'block-level use mix' row |
| PIPELINE-272 | rule | §4.7 S10b | §4.7 S10b | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-273 | rule | §4.7 S10b | §4.7 S10b — "never gives up" now reads "never silently", with F-SITING's last rung (CF-PIPE-04) | OK — 'never gives up silently'; F-SITING's last rung (CF-PIPE-04); 'lowest-priority classes first' is how the rung is computed (canon R4) |
| PIPELINE-274 | number | §4.7 S10b | §4.7 S10b | OK — 'one linear distance transform per class' unioned from §12.4 (CANON-C05) |
| PIPELINE-275 | rule | §4.7 S10b | §4.7 S10b | OK — 'never by being viewed' stated at §10.3 (pointer) |
| PIPELINE-276 | rule | §4.7 S11 | §4.7 S11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-277 | number | §4.7 S11 table | §4.7 S11 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-278 | rule | §4.7 S11 | referenced to §2.5 `PlotBound`; the streetwall-continuity and export clauses kept at §4.7 S11, stroke rule → §8.2 | OK — reference: §2.5 `PlotBound` (gate_opening sub-edge, splitThrough); stroke rule §8.2 treatment row; streetwall and export clauses kept |
| PIPELINE-279 | rule | §4.7 S11 | §4.7 S11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-280 | rule | §4.7 S11 | §4.7 S11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-281 | rule | §4.7 S11 | §4.7 S11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-282 | number | §4.7 pins | §4.7 pins | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-283 | rule | §4.7 | referenced to §8.5 (RENDERING-180) | OK — reference: §8.5 bands; the cadastral outline toggle §2.1 / §2.5 |
| PIPELINE-284 | rule | §4.8 | §4.8 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-285 | number | §4.8 | §4.8 wall strips | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-286 | rule | §4.8 | §4.8 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-287 | decision | §4.8 | rationale → J-P29 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P29)" left at §4.8 | OK — rationale → J-P29: '(J-P29)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-288 | rule | §4.8 | §4.8 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-289 | rule | §4.8 | §4.8 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-290 | number | §4.8 | §4.8 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-291 | mechanism | §4.8 castle | §4.8 castle (surround named as `Castle.surround`, moat as `Castle.moat`, per MODEL-C04) | OK — surround row named `Castle.surround` with 'or none', moat `Castle.moat` (MODEL-C04; values match §2.7) |
| PIPELINE-292 | rule | §4.8 castle | §4.8 castle | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-293 | decision | §4.8 castle | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.8 castle | OK — rationale → J-P36: '(J-P36)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-294 | rule | §4.8 castle | §4.8 castle | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-295 | acceptance | §4.8 castle | §4.8 castle acceptance ("0 ways through reservations" and MFCG census baseline unioned from §5.2 F-CASTLE) | OK — '0 ways through reservations' and MFCG's 178 / 11 baseline unioned from F-CASTLE |
| PIPELINE-296 | rule | §4.8 | §4.8 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-297 | rule | §4.8 water | §4.8 water furniture (deck list unioned from §2.7) | ISSUE P0-6 — the rewrite's new parenthetical 'every gate across a city moat' over-states §4.2 S3 (10) (decks at every main gate and a harbour gate) |
| PIPELINE-298 | rule | §4.8 water | referenced to §6.3 (bridge address); the re-base and gate-passage clauses kept at §4.8 | OK — reference: §6.3 Bridges succession; re-base and gate-passage clauses kept |
| PIPELINE-299 | number | §4.8 water | §4.8 water | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-300 | rule | §4.8 water | referenced to §5.3 (crossing invariant); the harbour-works list kept at §4.8 water furniture | OK — reference: §5.3 crossing invariant defines a harbour work; list kept |
| PIPELINE-301 | rule | §4.8 water | §4.8 water | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-302 | rule | §4.9 S12a | §4.9 S12a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-303 | rule | §4.9 S12a | §4.9 S12a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-304 | mechanism | §4.9 S12a | §4.9 S12a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-305 | number | §4.9 S12a | §4.9 S12a | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-306 | rule | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-307 | test | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-308 | mechanism | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-309 | rule | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-310 | mechanism | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-311 | rule | §4.9 S12b | §4.9 S12b | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-312 | rule | §4.9 S12b | §4.9 S12b | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-313 | number | §4.9 table | §4.9 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-314 | rule | §4.9 table | §4.9 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-315 | number | §4.9 table | §4.9 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-316 | number | §4.9 table | §4.9 table | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-317 | rule | §4.9 table | §4.9 table | ISSUE P0-1 — 'jittered grid (… avenues and hedgerows 8–12 m)' disagrees with §8.10's jittered line (rendering cross-part note) |
| PIPELINE-318 | rule | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-319 | rule | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-320 | rule | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-321 | acceptance | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-322 | rule | §4.9 | referenced to §8.5; the `grove` tag / dramatic-forest options and the layer toggle kept at §4.9 acceptance | OK — reference: §8.5 bands (city fills, district crowns) and 'Line greenery'; grove / dramatic-forest options and layer toggle kept |
| PIPELINE-323 | rule | §4.9 | §4.9 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-324 | rule | §4.10 | §4.10 — names drawn "in §6.3's cases" (CF-PIPE-05) | OK — 'in §6.3's cases' (CF-PIPE-05) |
| PIPELINE-325 | rule | §4.10 | referenced to §9.1 (RENDERING-330) | OK — reference: §9.1 View, §9.2 metrics; cross-engine identity §9.1 Consequences |
| PIPELINE-326 | rule | §4.10 | referenced to §8.1 (section restatement) | OK — section restatement: §8.1 item 3 (one mark per pass) and item 6 (transient export lists; raster list transferred) |
| PIPELINE-327 | mechanism | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-328 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-329 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-330 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-331 | test | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-332 | type | §4.11 | §4.11 | ISSUE P0-8 — `build.footprint?: Polygon` is one ring under §2.8's new declaration while §7.1's `build` event, which §4.11 says it is, takes `PolygonCm` |
| PIPELINE-333 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-334 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-335 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-336 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-337 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-338 | rule | §4.11 | part-specific use kept at §4.11 "Other crossings" (the carve's wall-run rule, J-I13); the shared re-trace rule referenc… | OK — carve's wall-run rule kept (J-I13); shared re-trace referenced to §7.3 (b) 2 |
| PIPELINE-339 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-340 | test | §4.11 | referenced to §13.1 (SCOPE-126) | OK — reference: §13.1 canal-across-a-wall fixture; river-across-a-wall fixture at §7.3 item 7 |
| PIPELINE-341 | mechanism | §4.11 batch (1) | §4.11 batch (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-342 | mechanism | §4.11 batch (2) | §4.11 batch (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-343 | mechanism | §4.11 batch (3) | §4.11 batch (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-344 | rule | §4.11 (4) | §4.11 batch (4) ("a carve costs its footprint, not the town" unioned from §3.3) | OK — 'a carve costs its footprint, not the town' unioned (KERNEL-122) |
| PIPELINE-345 | test | §4.11 (4) | referenced to §13.2; the result stated once in §4.11 batch (4) with the fixture pointer | OK — reference: §13.2 canal across the perimeter; result stated once at §4.11 batch (4) |
| PIPELINE-346 | rule | §4.11 (4) | referenced to §7.3 item 1; the carve's neighbour-step clause kept at §4.11 batch (4) | OK — reference: §7.3 item 1; neighbour-step clause kept |
| PIPELINE-347 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-348 | decision | §4.11 | rationale → J-P30 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P30)" left at §4.11 | OK — rationale → J-P30: '(J-P30)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-349 | decision | §4.11 | rationale → J-P34 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P34)" left at §4.11 | OK — rationale → J-P34: '(J-P34)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-350 | decision | §4.11 | rationale → J-P43 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P43)" left at §4.11 | OK — rationale → J-P43: '(J-P43)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-351 | decision | §4.11 | rationale → J-P40 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P40)" left at §4.11 | OK — rationale → J-P40: '(J-P40)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-352 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-353 | rule | §4.11 | §4.11 evolution hooks (user-applied by hand, ruined-building drawing, engine rule table unioned from §2.8) | OK — user-applied, ruined drawing and engine rule table unioned from §2.8 (§2.8 still restates them with the same meaning — model's single-source item, noted) |
| PIPELINE-354 | interface | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-355 | rule | §4.11 | §4.11 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-356 | interface | §4.12 | §4.12 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-357 | interface | §4.12 | §4.12 | OK — `StageDecl.txForm` comment points back to §4.1 (CF-PIPE-02) |
| PIPELINE-358 | interface | §4.12 | §4.12 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-359 | rule | §4.12 | §4.12 | OK — Seam record contents by pointer to II.1, which declares them |
| PIPELINE-360 | rule | §10 intro | §10 intro | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-361 | rule | §10.1 | §10.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-362 | rule | §10.1 | §10.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-363 | rule | §10.1 | §10.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-364 | rule | §10.1 | §10.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-365 | decision | §10.1 | rationale → J-9 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-9)" left at §10.1 | OK — rationale → J-9; 'Schedules and the calendar are not in the base (J-9)' kept |
| PIPELINE-366 | rule | §10.1 | §10.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-367 | decision | §10.1 | rationale → J-P21 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P21)" left at §10.1 | OK — rationale → J-P21; the persisted-store rule kept |
| PIPELINE-368 | interface | §10.2 | §10.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-369 | mechanism | §10.2 | §10.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-370 | test | §10.2 | §10.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-371 | rule | §10.2 | §10.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-372 | rule | §10.2 | §10.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-373 | rule | §10.2 | §10.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-374 | rule | §10.2 | §10.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-375 | rule | §10.2 | §10.2 Output paragraph — the reconcile sentence points to §4.7 S10b and F-SITING (CF-PIPE-04) | OK — reconcile sentence points to §4.7 S10b and F-SITING (CF-PIPE-04) |
| PIPELINE-376 | rule | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-377 | rule | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-378 | rule | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-379 | number | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-380 | interface | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-381 | rule | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-382 | rule | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-383 | mechanism | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-384 | mechanism | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-385 | mechanism | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-386 | budget | §10.3 | referenced to §12.7 (RENDERING-578) | OK — reference: §12.7 simulation module budget (one hour for 50 000 people ≤ 50 ms) |
| PIPELINE-387 | rule | §10.3 | §10.3 calendar ("logs no event" unioned from §11.3) | OK — 'logs no event' unioned from §11.3 |
| PIPELINE-388 | rule | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-389 | interface | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-390 | interface | §10.3 | §10.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-391 | rule | §10.3 | referenced to §11.2 (RENDERING-450) | OK — reference: §11.2 `{ kind: 'relations'; person; up; down }` |
| PIPELINE-392 | mechanism | §10.4 | §10.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-393 | rule | §10.4 | referenced to §6.3 (DETERMINISM-224) | OK — reference: §6.3 four cases; §6.1 registry (naming.quarter, naming.emblem); §9.6 uniqueness (never renamed; re-draw on own stream) |
| PIPELINE-394 | rule | §10.4 | §10.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-395 | rule | §10.4 | §10.4 per-culture paragraph — the re-draw clause in NP5-3 (a)'s order, pointer to §7.6 | OK — NP5-3 (a) order |
| PIPELINE-396 | rule | §10.4 | referenced to §7.6; one clause kept at §10.4 in NP5-3 (a)'s order | OK — reference: §7.6 (NP5-3 (a) order there too) and §2.8 `NamingRecord.slices` ((row, field) hashed with the corpus hash) |
| PIPELINE-397 | rule | §10.4 | referenced to §2.9 pack set bullet (MODEL-374) | OK — reference: §2.9 pack-set bullet (base recipe, log events, truncated event on a saved redo stack) (VD5-6) |
| PIPELINE-398 | interface | §10.4 | §10.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-399 | rule | §10.4 | §10.4 setting packs paragraph — retention is now a pointer to §2.9's pack-set rule (VD5-6, CF-PIPE-06) | OK — retention by pointer to §2.9's pack-set rule (VD5-6, CF-PIPE-06) |
| PIPELINE-400 | rule | §10.4 | referenced to §7.6; the pack patch form (`baseRowHash`, `baseVersion`, orphans) kept briefly at §10.4 | ISSUE P0-3 — 'an insert whose key already exists is an orphan too' is stated nowhere now |
| PIPELINE-401 | rule | §10.4 | §10.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-402 | rule | PART II intro | PART II intro — `area` = the base's bent-cut fabric (CF-PIPE-07) | OK — area = the base's bent-cut fabric (CF-PIPE-07) |
| PIPELINE-403 | interface | II.1 | II.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-404 | interface | II.1 | II.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-405 | interface | II.1 | II.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-406 | interface | II.1 | II.1 `NeighbourhoodRequest` (comment: `bent-cut` is NG's `area` template; CF-PIPE-07) | OK — comment "'bent-cut' (refine; NG's `area` template)" (CF-PIPE-07) |
| PIPELINE-407 | interface | II.1 | II.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-408 | rule | II.1 | II.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-409 | rule | II.1 | II.1 | OK — margin band by pointer to §4.5 |
| PIPELINE-410 | rule | II.1 | II.1 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-411 | rule | II.1 (1) | II.1 (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-412 | rule | II.1 (2) | II.1 (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-413 | rule | II.1 (3) | II.1 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-414 | rule | II.1 (3) | II.1 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-415 | rule | II.1 (3) | II.1 (3) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-416 | test | II.1 (3) | referenced to §13.1 (SCOPE-142) | OK — reference: §13.1 neighbour-step fixture covers plot-line end and footprint corner, block, plot and wing rings |
| PIPELINE-417 | acceptance | II.1 (3) | II.1 rule (3) and II.5 — spelled "stage-2 feature S1" (CF-PIPE-08) | OK — 'stage-2 feature S1' (CF-PIPE-08) |
| PIPELINE-418 | rule | II.1 (4) | II.1 rule (4) (its persistence clause now points to II.4) | OK — persistence clause by pointer to II.4, which states it |
| PIPELINE-419 | rule | II.1 (5) | II.1 rule (5) (outline list is a pointer to §4.2 S1 (2)) | OK — outline list by pointer to §4.2 S1 (2) (CF-PIPE-09) |
| PIPELINE-420 | rule | II.1 (6) | II.1 (6) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-421 | decision | II.1 | rationale → J-P33 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P33)" left at II.1 | OK — rationale → J-P33: '(J-P33)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-422 | decision | II.1 | rationale → J-P37 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P37)" left at II.1 | OK — rationale → J-P37: '(J-P37)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-423 | decision | II.1 | rationale → J-P38 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P38)" left at II.1 | OK — rationale → J-P38: '(J-P38)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-424 | mechanism | II.2 | II.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-425 | rule | II.2 | II.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-426 | decision | II.2 | rationale → J-S42 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-S42)" left at II.2 | OK — rationale → J-S42: '(J-S42)' present at the mapped place; Part A row and index row present; passage verbatim in the rationale file's F.3 |
| PIPELINE-427 | rule | II.2 | II.2 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-428 | rule | II.2 | II.2 — "the `area` template is the base's own bent-cut fabric … opened as a `refine` close-up" (VS5-2, CF-PIPE-07); "st… | OK — 'the area template is the base's own bent-cut fabric … opened as a refine close-up' (VS5-2); 'stage-2 feature S4' |
| PIPELINE-429 | rule | II.3 | II.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-430 | rule | II.3 | II.3 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-431 | budget | II.4 | referenced to §8.2 / §8.6; the stage-2-tier additions (road programs, hood title, instanced hatching, ≈ 25 canvas ops p… | OK — reference: §8.2 `hatched` row and §8.6; road programs, hood title, instanced hatching and ≈ 25 ops per wing stated at II.4 (≈ 25 also §12.5); nothing lost |
| PIPELINE-432 | rule | II.4 | II.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-433 | rule | II.4 | II.4 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-434 | rule | II.4 | II.4 | OK — summary with 'stated in full in §7.3 item 1' |
| PIPELINE-435 | rule | II.5 | II.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-436 | acceptance | II.5 | II.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-437 | acceptance | II.5 | II.5 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-438 | rule | II.6 | II.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-439 | rule | II.6 | II.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-440 | rule | II.6 | II.6 — "an outline template of §4.2 S1 (2)" (CF-PIPE-09) | OK — 'an outline template of §4.2 S1 (2)' (CF-PIPE-09) |
| PIPELINE-441 | interface | II.6 | II.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-442 | interface | II.6 | II.6 | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-443 | rule | PART III | PART III | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-444 | rule | PART III | PART III | OK — VG live-course sentence kept here |
| PIPELINE-445 | rule | PART III (1) | PART III (1) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-446 | rule | PART III (2) | PART III (2) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-447 | rule | PART III (3)-(4) | PART III (3)-(4) | OK — stated at the mapped place with the archived meaning (read side by side) |
| PIPELINE-448 | number | PART III (5) | PART III (5) | OK — 'whose size follows its population within its rung' now §1.1's |
| PIPELINE-449 | acceptance | PART III | PART III | OK — stated at the mapped place with the archived meaning (read side by side) |
| CF-PIPE-01 | conflict | §4.1 / §4.2 S3 (12) / §4.5 S7b (3) | resolved at §4.1 "Why this order" (c) (§3 above) | RESOLVED — §4.1 (c): S3's reservations point to §4.2 S3 (12); large institutions are S7b claims (§4.5 S7b (3)) |
| CF-PIPE-02 | conflict | §4.1 / §4.12 | resolved: §4.1 points to §4.12 `StageDecl` | RESOLVED — §4.1 'Each stage registers a StageDecl (§4.12)'; op-form list kept; §14 `Stage<I,O> extends StageDecl` points to §4.12 |
| CF-PIPE-03 | conflict | §4.1 S11 row / §4.7 | resolved with NP5-1 at §4.1 S11 row | RESOLVED — §4.1 S11 row: party wall = shared L3 side line with `party_wall` rows (NP5-1) |
| CF-PIPE-04 | conflict | §4.7 S10b / §10.2 / §5.2 | resolved at §4.7 S10b and §10.2 (pointers to F-SITING) | RESOLVED — §4.7 S10b 'never gives up silently' with F-SITING's last rung; §10.2 points to §4.7 S10b and F-SITING |
| CF-PIPE-05 | conflict | §4.1 / §4.10 / §10.4 | resolved: "in §6.3's cases" | RESOLVED — §4.1, §4.10, §10.4 'only in §6.3's cases' |
| CF-PIPE-06 | conflict | §10.4 / §2.9 | resolved with VD5-6: pointers to §2.9 | RESOLVED — §10.4 both retention sentences point to §2.9's pack-set rule (VD5-6) |
| CF-PIPE-07 | conflict | PART II intro / II.2 / II.1 | resolved with VS5-2: `area` = bent-cut | RESOLVED — PART II intro, II.2 and the II.1 comment: `area` = bent-cut, a refine close-up; §13.6 (2) agrees |
| CF-PIPE-08 | conflict | II.1–II.4 | resolved: "stage-2 feature S<n>" in text; two heading renames for the assembler | RESOLVED — 'stage-2 feature S1/S2/S4/S5/S6' throughout II.1–II.5; both headings renamed by the assembler; no bare stage-2 S-id left |
| CF-PIPE-09 | conflict | II.6 / §4.2 S1 (2) | resolved: II.6 points to §4.2 S1 (2) | RESOLVED — II.6 'an outline template of §4.2 S1 (2)' |
| CF-PIPE-10 | conflict | §4.1 / §4.4 S5b / §5.2 | resolved with NP5-2 (canon ruling, option 1) | RESOLVED — canon ruling stated in §4.1 S5 row and L0-writer sentence, §4.4 S5b, §4.2 S1 (5); companions §5.2 F-ROUTE 'where' and J-I18 present |
