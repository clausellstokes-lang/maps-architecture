# Rewrite — determinism part (§5 failure handling, §6 determinism, §7 editing and regeneration locality)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Outputs: `docs/validation/consistency/new/determinism/05-failure-handling.md`,
`06-determinism.md`, `07-editing-locality.md` (each starts with its section's heading line exactly as today), and
`docs/validation/consistency/rewrite-determinism-rationale.md` (the 26 inline "Chose … because" passages, verbatim, for
the rationale file). Inputs read completely: §5–§7 of `docs/ARCHITECTURE.md` (l. 5025–6773), `inventory-determinism.md/.json`
(all 601 items), `canon.md` (home rules, every conflict touching this part, the open-item routing, the DETERMINISM part
section) with `canon.json` queried by id, `still-open-r5.json` (VD5-1 … VD5-7, NP5-2, NP5-3, VK5-1, VK5-2, NP5-1, NP5-4),
`r5-verify-determinism.md` for VD5-1 … VD5-5, `OWNER-INSTRUCTIONS-2026-09-25.md`, `DEFINITION.md`, and the headings of
every other part.

## 1. Sizes

| section | before (bytes / lines) | after (bytes / lines) | ratio |
|---|---|---|---|
| §5 | 41 948 / 203 | 35 010 / 185 | 83 % |
| §6 | 60 044 / 580 | 50 287 / 499 | 84 % |
| §7 | 122 329 / 966 | 103 753 / 843 | 85 % |
| **part** | **224 321 / 1 749** | **189 050 / 1 527** | **84 %** |

The part lands at 84 %, above the document-wide 55–65 % target. Reason (CONFIRMED by the canon's own counts): 504 of
this part's 601 inventory items are normative facts whose only home is here; 70 restate a fact homed elsewhere, 26 are
rationale passages (25 copies of J rows plus J-DET-53's new one), 1 moved out, 0 are history. So the text is almost
entirely canonical mechanism — the S1 water operator, the lifecycle table, the failure-class rows, the digest and
identity rules — which this pass may not drop. What was removed: 19 per-section review markers, the 26 inline rationale
passages (≈ 16 KB, moved verbatim to the rationale companion file), the 70 restatements the canon routes elsewhere and
the within-part duplicates (below), the fix-record tags, and wordier phrasing. The document-wide target depends on the parts that carry the Judgment-call rows, §0's round
narration and the §12–§16 restatements.

## 2. Decisions taken in this rewrite (vetoable; Fable-reviewed 2026-09-26 — verdict in docs/validation/consistency/SUMMARY.md)

1. **Fix-record tags removed from the normative text.** Parenthetical provenance ids of the fix rounds and red-team
   lenses — `LC-`, `SCL-`, `GEO-`, `VIS-`, `MFP-`, `FTG-n`, `IMP-`, `COV-…`, `NF-D…`, `N-n`, `VK…`, `VD…`, `VP…`, `VS…`,
   `NP…`, `NR…` — were cut, as "per VD2-10" narration. Kept: `NF-P5` and `NF-P6` (they name an invariant and an exception
   other sections cite), D- and J- ids, the design-goal ids in headings (G-P…, G-R…), the IMPROVEMENTS acceptance ids (O…),
   `IMPROVEMENTS J-K` (clarified from the bare "J-K"), and executed-evidence file pointers. Traceability is preserved by
   the archived document and by §5 of this report, which maps every inventory item (whose `values`/`notes` carry the
   tags) to its new place. Note: the kernel rewrite kept its tags, so the assembled document mixes both styles; the
   validator or Fable should pick one.
2. **Subsection headings are unchanged**, so no renumbering: every "§5.1 (6)", "§6.2 (iii)", "§6.3 case (4)", "§6.5
   (9)", "§7.3 item 7 (iv)", "§7.3 (a) 4", "§7.3 (b) 1–9", "§7.1's walls row", "§5.3's deck row", "§6.3's bridge row",
   "§7.3's carve row" and "§7.4, 'Warp and what stands on the ground'" pointer still resolves. One paragraph was added:
   **"Rebases"** under the §7.4 lifecycle table now holds the rebase row's undo and bridged-client text (unchanged
   wording), so the table cells stay short.
3. **Within-part single sourcing.** One statement each for: the kept-way definition and detour bound (§5.2
   F-REDERIVE; §7.3 (b) 2 points); deck and site over land (F-REDERIVE; (b) 9 points); the case-(4) trigger list (§6.3;
   `EditBase.renames` and the §7.4 rows point); the early-consumed parameter list (§7.1 Adjust; §7.3 item 3 points); the
   derived-complete digest (§6.5 (9); §6.2 and F-SITING point); roads leaving a walled stage (§5.3's S7 row; F-WALL
   points); worker merge order (§6.3; §6.2 and §6.5 (6) point); the rename-confirmation rule (§7.3 item 4; §6.3 points).
4. **Detail kept where the canonical home lacks it** (rule R13's union, pending the home editor): F-NUM's B-FUZZ bars
   (10⁶ inputs per primitive, 0 self-intersecting outputs, 0 undeclared slivers — §13.1 states neither), F-BUDGET-STAGE's
   "on ≥ 95 % of seeds", F-SITEPLAN's "0 renderer fallback rectangles", F-LABEL's detection (§9.4 states only the rungs).
   Union into my homes: τ = 0.01 (§7.2), "≈ 200 internal parameters" (§7.7), render key "words 0 and 1" (§6.1), F-REDERIVE's
   test details into oracle (v).

## 3. Open items fixed

| item | owner | where | how |
|---|---|---|---|
| VD5-1 | determinism | §7.3 item 4; §7.4 regenerate and upgrade rows; §7.5 (bullet, `MigrationMap`, diff, test) | A replay (or receiving client) compares an event's stored fates and renames only when it folds the event under the output version that confirmed them — the `from` of the first live `upgrade` after it, else the document's own version. Under a later version the recomputed values apply; the upgrade names those events once in its diff through the new field `MigrationMap.changedConfirmations: number[]`, never re-reported at load; the upgrade's undo (under `from`) compares again. M3a test added: an upgraded document whose pre-upgrade corpus selection renames differently under `to` lists it once and reloads with no mismatch; a divergence forced under the confirming version is still reported. |
| VD5-2 | determinism | §7.5 packs bullet and test; §5.2 F-EDIT | Canon choice (option a): "removing the pack" dropped — the only resolution offered is keeping the old model, because the pack set keeps every pack the log ever named; such a town stays at its output version and, once that leaves the browser window, opens as a frozen view whose `frozenImport` the same cap refuses (viewable, exportable; the CLI still replays it). F-EDIT names the case and resolution. Test added: a dropped pack whose copy passes 2 MB gets the conflict with only "keep the old model" and commits nothing. |
| VD5-3 | determinism | §6.3 case (4) trigger list; §7.4 rebase row | A `frozenImport` rebase runs case (4) over every unedited generated name, returns `confirm` with the renames listed, and stores them in the rebase event's `renames`. The B-EDIT fixture is routed to §13.2 (scope; cross-part note 3). |
| VD5-4 | determinism | §6.2 records digest; §5.3 CI-only maintenance row | One node per static-index partition (its district's, or the partition outside districts) plus one **town node** for records of entities in no partition (ways, walls, water bodies, districts); a batch that moves an entity between nodes (re-parent across districts, district merge or split, `outskirtToDistrict`) moves its records' leaves and re-hashes both nodes although no record changed. §5.3's digest-maintenance oracle now names the records tree. The `drawBoundary` save/reload fixture is routed to §13.2 (scope). |
| VD5-5 | determinism | §6.5 (9) replay = session and truncation identity; §7.3 item 7 (i); §7.3 item 6; §6.2 records digest; §7.4 truncation | Replay = session, truncation identity and oracle (i) require equal **records** digests as well as model digests; §7.3 item 6 states that tree scoping and the dependency-graph route leave the same records because a re-derivation that reproduces an entity's leaf digest keeps its old derivation record — the rule itself is §2.8's (canon routes it to the model rewriter). §6.2 says which checks read the model digest alone and which compare both. The epoch-grown Adjust-during-verification fixture is routed to §13.2 (scope). |
| NP5-2 (routed) | pipeline | §5.2 F-ROUTE | `where` = S4; S5b at stages k ≥ 2 and in every epoch (S4's router, §4.4); S4's local operator (canon CF-PIPE-10). |
| NP5-3 (routed) | pipeline | §7.6 packs bullet (DETERMINISM-550); §7.4 warp paragraph | (a) "… re-draws exactly the unedited names whose naming records cite a changed slice, listed for confirmation (§6.3 case (4)), and never the row's other names"; (b) "… halving the step when it fails, as for a held pin (§3.6); for a stored composition the check also requires its composed wings to unite to the moved face, its rooms to lie inside it and its tower centres inside or on it (§2.6)". |
| VD5-6 (routed) | pipeline | §7.4 truncation; §7.6 | Both point to §2.9's pack set and retention rule instead of restating it (canon CF-PIPE-06). |

## 4. Conflicts resolved (as the canon rules)

| conflict | resolution in the new text |
|---|---|
| C-1 lineage key | §6.3 states the lineage key (arena key = layer and part; the unit's lineage hash; reroll; dup); §6.1's lineage component points there; the entity key names "its arena key (layer and part, §2.2)". |
| C-2 advance cap | `reroll.maxAdvance` (default 3) stated once in §5.1 (6); §7.1 New random and §6.3 case (3) point to it. (J-DET-20's wording is the scope rewriter's.) |
| C-3 kept-way deck | §7.3 (b) 2 states the deck choice (successor site preferred within the detour bound); F-REDERIVE points to it and keeps the kept-way definition, the detour bound value and the cut rule. |
| C-4 setStyle row | setStyle appears only in the setLayer / setStyle / paintGround row; the table row is editTable / editPreset. |
| C-5 drawn bridge | §7.1 and the §7.4 "draw bridges" ask point to §4.2 S1 (5)'s rule for a drawn bridge (snapM site, else a new deck). |
| C-6 / VD5-2 cap cases | F-EDIT names the host-provider case (§2.9) and the upgrade pack-copy case (§7.5). |
| C-7 precedence | Stated once in §7.7 as the one order for every meeting of protections and inputs, S10–S11 applying it to assignments; §7.2 and F-EDIT point. |
| C-8 gate count | S4 row: a gate-count change re-derives from S3 for stage 1 and from S5 of its stage for a later enceinte; S7 row keeps only "when the enceinte kind changes". |
| C-9 S1 escalation | §7.3's S1 rows state both triggers (course leaves its drainage basin; F-RIVER needs its inlet or centre rung); F-RIVER points. |
| C-10 rerollable concerns | §6.1: rerollable only if non-geometry and read by a registered stage or paint program, and the registry marks exactly the six; `naming.quarter` and `style.random` registered non-rerollable (a new `setStyle` re-draws the random style). |
| KERNEL-C01 | §6.5 (10) points to §3.7 for the Clipper2 fallback (adoption, golden shift); keeps its determinism test. |
| CF-PIPE-04 | F-SITING canonical, unchanged. |
| CF-PIPE-05 | §6.3's four draw cases are the canonical statement (other parts point). |
| CF-PIPE-06 | §7.4 truncation and §7.6 point to §2.9 pack retention. |
| CF-PIPE-10 (NP5-2) | F-ROUTE `where` adds S5b. |
| CANON-C06 | F-LABEL points to §9.4 (the overflow-cap inference is dropped at §9.4 by rendering). |
| CANON-C07 | §7.3 (b) 8 reads "the height samples the edit changed". |
| CANON-C10 | §5.1 (7) keeps the counting rule and points to §13.5 for the bars. |

## 5. Cross-part notes (other parts' text; not edited here)

1. **Kernel §3.7** (CONFIRMED, text contradiction the canon missed): l. 3123 says "changing the engine is a
   **generator**-version bump with a declared golden shift"; §6.4 (a release that declares a shift bumps the **output**
   version; the generator version is informational) and §6.5 (7) say output-version bump. §3.7 should read
   "output-version bump". §3.7 should also carry the Clipper2 shift-record stage list now that §6.5 (10) points there:
   S1's outline repair, S3's reservations, S8's kerbs, S9's corridors, S10's step (0) wall and margin bands, S11's
   footprints, S12b's greenery faces, with cascade records downstream (§13.3).
2. **Model §2.2 rule 7** is now the only statement of the `anchor` contact-name choice (entity of the edge's first
   own-level row; district first in id order; perimeter: inner district or hinterland pseudo-district; enceinte on
   setback/glacis; smallest free ordinal, from 2 on an enceinte) — §7.3 (b) 3 points to it; keep it there.
3. **Scope §13.2** must add the routed B-EDIT fixtures: VD5-3 (a frozen fixture whose naming row changed imports with its
   renames listed; a New random afterwards renames nothing outside its scope), VD5-4 (a `drawBoundary` moving surviving
   blocks, saved and reloaded, reports no corrupt cache), VD5-5 (an Adjust during load verification in an epoch-grown
   town, saved and reloaded, reports no records mismatch). §6.3's measurement now points to §13.2's naming-input
   fixtures: check that SCOPE-207/208 carry every case of the archived §6.3 list — including "a bridge re-sited
   afterwards keeps its new name" and "an `editTable` of one naming grammar row renames exactly the unedited names citing
   it".
4. **Model §2.8**: VD5-5's rule ("a re-derivation that reproduces an entity's leaf digest exactly keeps its old derivation
   record") must be stated there; §7.3 item 6 relies on it. **Model §2.9 step 2**: say that the `frozenImport` rebase
   reconciles names by §6.3 case (4) (VD5-3) and that a pack copy past the 2 MB cap refuses it (VD5-2, as §7.5 now
   says). **Model §2.9 chunks / `Snapshot.recordsDigest`**: any restatement of the records tree's grouping should point
   to §6.2's node rule (VD5-4).
5. **Rendering §11.1** must now state the export rule moved out of §7.1 (DETERMINISM-357): picture exports (SVG, PNG,
   VTT) use the view's rotation; GeoJSON keeps model coordinates and records the rotation. §7.1's Rotate row points to
   §11.1.
6. **Rendering §12.8** holds the digest-tree memory (≈ 1 MB model tree, ≈ 0.25 MB records tree at CITY); the breakdown
   §6.2 used to give (≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and interior nodes at 16 B each) now appears
   nowhere unless §12.8 takes it.
7. **Pipeline §4.5 / §4.2 S1 (5) / §4.4**: τ = 0.01 is stated in §7.2 (canonical home DETERMINISM-388) — §4.5 should
   point rather than restate; the drawn-bridge rule is canonical in §4.2 S1 (5) (C-5); §4.4 S5b points to F-ROUTE
   (NP5-2).
8. **Scope J rows**: fold `rewrite-determinism-rationale.md` R01–R26 into `docs/ARCHITECTURE-RATIONALE.md` under the J
   rows named (R03 is new J-DET-53; R23's second half is new J-DET-54); J-DET-20 must say `reroll.maxAdvance` (default 3).
9. **Scope D-9** points to §13.5 (CANON-C10). GAP-1 (k of the branch re-join invariant) is unchanged in §5.3, pointing
   to §4.4.
10. **Tag style**: this part removed fix-record tags; the kernel part kept them. The validator should make the document
    consistent one way or the other (decision 1 above).

## 6. Verification run on the new files (receipts)

* Every `§n` / `§n.m` pointer in the three files resolves to a heading of the current document: 0 unresolved (script over
  the heading list of `docs/ARCHITECTURE.md`); every `II.n` pointer resolves.
* Tables: every table line outside fences starts and ends with `|` and matches its header's cell count (doc_checks S1
  logic): 0 hits.
* No `PENDING FABLE REVIEW` line in the section files; no fix-record tag left except `NF-P5`, `NF-P6` and the `SCL-1` in
  §5.3's unchanged heading; no deferral wording (TBD, deferred, open question).
* Every J pointer left behind (J-DET-1, -2, -3, -6, -11, -14 … -18, -20 … -25, -27 … -29, -31, -34, -35, -37, -39, -40,
  -44 … -46, -48 … -50, -53, -54, J-K8) occurs in the new text.
* Token check of all 505 home items (numbers, identifiers) against the new text: every miss is a removed tag, a unit
  spelling (µs vs us) or a count annotation, except one (`plinthCm`), restored.
* Clause-level coverage check of the archived text against the new text (fraction of content words present): the 169
  clauses under 93 % were reviewed by hand; each is a removed tag, a moved rationale passage or a restatement now
  referenced to its canonical home, and the referenced homes were checked to state the fact (§3.6 warp validation, §3.8
  holed-polygon run, §8.1 item 4, §9.5 measure tool, §10.4 pack content, §13.2 faithfulness campaign and warp fixtures,
  §2.2 rule 7, §2.9 pack set, §3.3 rule 1). PLAUSIBLE: a clause whose words survive but whose meaning shifted would pass
  this check; the verify seat's item-by-item reading is the CONFIRMED check.

## 7. Mapping table — every inventory id of this part

Locations are subsection anchors of the new text (numbering unchanged). "referenced to §x" = the fact is homed at §x
and this part now points to it; "rationale → J-x" = the passage left for the rationale file (text kept verbatim in
`rewrite-determinism-rationale.md`), the rule it justifies staying where it was.

| id | archived location | new location |
|---|---|---|
| DETERMINISM-001 | §5.1 (1) | §5.1 (1) — kept |
| DETERMINISM-002 | §5 intro | §5 (plain-words intro) — §5 plain-words intro (kept) |
| DETERMINISM-003 | §5.1 (2) | §5.1 (2) — kept |
| DETERMINISM-004 | §5.1 (3) | §5.1 (3) — kept |
| DETERMINISM-005 | §5.1 (4) | §5.1 (4) — kept |
| DETERMINISM-006 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-007 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-008 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-009 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-010 | §5.1 (5) | referenced to §1.1 (was at §5.1 (5)) |
| DETERMINISM-011 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-012 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-013 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-014 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-015 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-016 | §5.1 (5) | §5.1 (5) — kept |
| DETERMINISM-017 | §5.1 (5) | rationale → J-DET-3 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §5.1 (5) |
| DETERMINISM-018 | §5.1 (6) | §5.1 (6) — kept |
| DETERMINISM-019 | §5.1 (6) | §5.1 (6) — kept |
| DETERMINISM-020 | §5.1 (6) | §5.1 (6) — C-2: canonical statement of the advance cap (`reroll.maxAdvance`, default 3) |
| DETERMINISM-021 | §5.1 (6) | §5.1 (6) — C-2 canonical value |
| DETERMINISM-022 | §5.1 (6) | §5.1 (6) — kept |
| DETERMINISM-023 | §5.1 (7) | §5.1 (7) — CANON-C10: counting rule kept; acceptance bars by pointer to §13.5 |
| DETERMINISM-024 | §5.1 tier table | §5.1 tier table — kept |
| DETERMINISM-025 | §5.1 tier table | §5.1 tier table — kept |
| DETERMINISM-026 | §5.1 | §5.1 — kept |
| DETERMINISM-027 | §5.2 preamble | §5.2 preamble — preamble reworded to R4 (row owns detection, rung order, test; † names the computing section) |
| DETERMINISM-028 | §5.2 F-NUM | §5.2 F-NUM — kept |
| DETERMINISM-029 | §5.2 F-NUM | referenced to §3.6 (was at §5.2 F-NUM) |
| DETERMINISM-030 | §5.2 F-NUM | referenced to §13.1 (was at §5.2 F-NUM) |
| DETERMINISM-031 | §5.2 F-CUT | §5.2 F-CUT — kept |
| DETERMINISM-032 | §5.2 F-CUT | §5.2 F-CUT — kept |
| DETERMINISM-033 | §5.2 F-CUT | §5.2 F-CUT — kept |
| DETERMINISM-034 | §5.2 F-CORRIDOR | §5.2 F-CORRIDOR — kept |
| DETERMINISM-035 | §5.2 F-CORRIDOR | §5.2 F-CORRIDOR — kept |
| DETERMINISM-036 | §5.2 F-OUTLINE | §5.2 F-OUTLINE — kept |
| DETERMINISM-037 | §5.2 F-OUTLINE | referenced to §13.2 (was at §5.2 F-OUTLINE) |
| DETERMINISM-038 | §5.2 F-RIVER | §5.2 F-RIVER — kept |
| DETERMINISM-039 | §5.2 F-RIVER | §5.2 F-RIVER — C-9: escalation by pointer to §7.3 S1 rows; moved-knot clause by pointer to §7.3 (b) 1 |
| DETERMINISM-040 | §5.2 F-RIVER | §5.2 F-RIVER — kept |
| DETERMINISM-041 | §5.2 F-CONTOUR | §5.2 F-CONTOUR — kept |
| DETERMINISM-042 | §5.2 F-CONTOUR | §5.2 F-CONTOUR — kept |
| DETERMINISM-043 | §5.2 F-SITE | §5.2 F-SITE — kept |
| DETERMINISM-044 | §5.2 F-SITE | §5.2 F-SITE — kept |
| DETERMINISM-045 | §5.2 F-ROUTE | §5.2 F-ROUTE — NP5-2 / CF-PIPE-10: `where` adds S5b (stages k ≥ 2, epochs); in-operator siting by pointer to §4.2 S1 (5) |
| DETERMINISM-046 | §5.2 F-ROUTE | referenced to §4.2 S1 (5) (was at §5.2 F-ROUTE) |
| DETERMINISM-047 | §5.2 F-ROUTE | §5.2 F-ROUTE — kept |
| DETERMINISM-048 | §5.2 F-BUDGET-STAGE | §5.2 F-BUDGET-STAGE — kept |
| DETERMINISM-049 | §5.2 F-BUDGET-STAGE | referenced to §13.2 (was at §5.2 F-BUDGET-STAGE) |
| DETERMINISM-050 | §5.2 F-WALL | §5.2 F-WALL — kept |
| DETERMINISM-051 | §5.2 F-WALL | §5.2 F-WALL — kept |
| DETERMINISM-052 | §5.2 F-CASTLE | §5.2 F-CASTLE — kept |
| DETERMINISM-053 | §5.2 F-CASTLE | referenced to §4.8 castle (was at §5.2 F-CASTLE) |
| DETERMINISM-054 | §5.2 F-PLOT | §5.2 F-PLOT — kept |
| DETERMINISM-055 | §5.2 F-PLOT | §5.2 F-PLOT — kept |
| DETERMINISM-056 | §5.2 F-SITING | §5.2 F-SITING — CF-PIPE-04: canonical, unchanged |
| DETERMINISM-057 | §5.2 F-SITING | referenced to §4.5 S7b (3) (was at §5.2 F-SITING) |
| DETERMINISM-058 | §5.2 F-SITEPLAN | §5.2 F-SITEPLAN — kept |
| DETERMINISM-059 | §5.2 F-SITEPLAN | referenced to §15.2 (was at §5.2 F-SITEPLAN) |
| DETERMINISM-060 | §5.2 F-SKELETON | §5.2 F-SKELETON — kept |
| DETERMINISM-061 | §5.2 F-SKELETON | referenced to §13.1 (was at §5.2 F-SKELETON) |
| DETERMINISM-062 | §5.2 F-LABEL | referenced to §9.4 (was at §5.2 F-LABEL) |
| DETERMINISM-063 | §5.2 F-LABEL | referenced to §9.4 (was at §5.2 F-LABEL) |
| DETERMINISM-064 | §5.2 F-WORK | §5.2 F-WORK — kept |
| DETERMINISM-065 | §5.2 F-WORK | §5.2 F-WORK — kept |
| DETERMINISM-066 | §5.2 F-BUDGET-TIME | §5.2 F-BUDGET-TIME — kept |
| DETERMINISM-067 | §5.2 F-BUDGET-TIME | §5.2 F-BUDGET-TIME — kept |
| DETERMINISM-068 | §5.2 F-EDIT | §5.2 F-EDIT — C-6 / VD5-2: detection adds the upgrade pack-copy cap case (§7.5); moved course knot by pointer |
| DETERMINISM-069 | §5.2 F-EDIT | §5.2 F-EDIT — C-7 / VD5-2: precedence by pointer to §7.7; resolution adds "the pack and its size with keep the old model" |
| DETERMINISM-070 | §5.2 F-EDIT | §5.2 F-EDIT — kept |
| DETERMINISM-071 | §5.2 F-EDIT | referenced to §2.9 pack set bullet (was at §5.2 F-EDIT) |
| DETERMINISM-072 | §5.2 F-REDERIVE | §5.2 F-REDERIVE — kept |
| DETERMINISM-073 | §5.2 F-REDERIVE | §5.2 F-REDERIVE — kept |
| DETERMINISM-074 | §5.2 F-REDERIVE | §5.2 F-REDERIVE — C-3: kept-way re-route by pointer to §7.3 (b) 2; kept-way definition and cut rule stated here |
| DETERMINISM-075 | §5.2 F-REDERIVE | §5.2 F-REDERIVE — C-3: detour bound defined here; §7.3 (b) 2 points to it |
| DETERMINISM-076 | §5.2 F-REDERIVE | §5.2 F-REDERIVE — kept |
| DETERMINISM-077 | §5.2 F-REDERIVE | §5.2 F-REDERIVE — kept |
| DETERMINISM-078 | §5.2 F-REDERIVE | §5.2 F-REDERIVE — kept |
| DETERMINISM-079 | §5.2 F-REDERIVE | referenced to §7.3 (7) (v) (was at §5.2 F-REDERIVE) |
| DETERMINISM-080 | §5.2 F-REDERIVE | referenced to §2.6 Heights and ground datum (was at §5.2 F-REDERIVE) |
| DETERMINISM-081 | §5.3 | §5.3 — kept |
| DETERMINISM-082 | §5.3 | §5.3 — kept |
| DETERMINISM-083 | §5.3 | §5.3 — kept |
| DETERMINISM-084 | §5.3 row 1 | referenced to §3.10 (was at §5.3 row 1) |
| DETERMINISM-085 | §5.3 | §5.3 — kept |
| DETERMINISM-086 | §5.3 | §5.3 — kept |
| DETERMINISM-087 | §5.3 | §5.3 — kept |
| DETERMINISM-088 | §5.3 | §5.3 — kept |
| DETERMINISM-089 | §5.3 | §5.3 — kept |
| DETERMINISM-090 | §5.3 | §5.3 — kept |
| DETERMINISM-091 | §5.3 | §5.3 — kept |
| DETERMINISM-092 | §5.3 | §5.3 — kept |
| DETERMINISM-093 | §5.3 | §5.3 — kept (NF-P5 row) |
| DETERMINISM-094 | §5.3 | §5.3 — kept |
| DETERMINISM-095 | §5.3 | §5.3 — kept |
| DETERMINISM-096 | §5.3 | §5.3 — kept |
| DETERMINISM-097 | §5.3 | §5.3 — kept |
| DETERMINISM-098 | §5.3 | referenced to §2.6 wing rule 4 (was at §5.3) |
| DETERMINISM-099 | §5.3 | §5.3 — kept |
| DETERMINISM-100 | §5.3 | §5.3 — kept |
| DETERMINISM-101 | §5.3 | §5.3 — kept |
| DETERMINISM-102 | §5.3 | §5.3 — kept |
| DETERMINISM-103 | §5.3 | §5.3 — kept |
| DETERMINISM-104 | §5.3 | referenced to §2.1 Units (was at §5.3) |
| DETERMINISM-105 | §5.3 | referenced to §3.10 (was at §5.3) |
| DETERMINISM-106 | §5.3 | §5.3 — kept |
| DETERMINISM-107 | §5.3 | referenced to §4.2 S3 (9) (was at §5.3) |
| DETERMINISM-108 | §5.3 | referenced to §4.6 (7) (was at §5.3) |
| DETERMINISM-109 | §5.3 | §5.3 — kept |
| DETERMINISM-110 | §5.3 | §5.3 — kept |
| DETERMINISM-111 | §5.3 | §5.3 — kept |
| DETERMINISM-112 | §5.3 | §5.3 — kept |
| DETERMINISM-113 | §5.3 | §5.3 — kept |
| DETERMINISM-114 | §5.3 | §5.3 — kept |
| DETERMINISM-115 | §5.3 | §5.3 — kept |
| DETERMINISM-116 | §5.3 | §5.3 — kept; salts rule by pointer to §6.1 |
| DETERMINISM-117 | §5.3 | referenced to §2.9 load step 3 (was at §5.3) |
| DETERMINISM-118 | §5.3 | referenced to §2.9 load step 3 (was at §5.3) |
| DETERMINISM-119 | §5.3 | §5.3 — VD5-4: row now names the records tree |
| DETERMINISM-120 | §5.3 | §5.3 — kept; points to §6.5 (9), §7.3 item 7 |
| DETERMINISM-121 | §5.3 | §5.3 — kept; F-LABEL test by pointer to §9.4 |
| DETERMINISM-122 | §5.3 | §5.3 — kept |
| DETERMINISM-123 | §5.3 | §5.3 — kept |
| DETERMINISM-124 | §5.3 | §5.3 — kept |
| DETERMINISM-125 | §5.3 | §5.3 — kept |
| DETERMINISM-126 | §5.3 | rationale → J-DET-39 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §5.3 |
| DETERMINISM-127 | §5.4 | §5.4 — kept; engine and warning codes by pointer (§3.7, §3.1) |
| DETERMINISM-128 | §5.4 | referenced to §3.1 (was at §5.4) |
| DETERMINISM-129 | §5.4 | §5.4 — kept |
| DETERMINISM-130 | §5.4 | §5.4 — kept |
| DETERMINISM-131 | §5.4 | §5.4 — kept |
| DETERMINISM-132 | §5.4 | §5.4 — kept |
| DETERMINISM-133 | §5.4 | §5.4 — kept |
| DETERMINISM-134 | §6 intro | §6 (plain-words intro) — kept |
| DETERMINISM-135 | §6.1 | §6.1 — kept |
| DETERMINISM-136 | §6.1 | §6.1 — kept |
| DETERMINISM-137 | §6.1 | §6.1 — kept |
| DETERMINISM-138 | §6.1 | §6.1 — C-1: entity key = seed key + lineage hash (§6.3) + arena key (layer and part, §2.2) |
| DETERMINISM-139 | §6.1 | §6.1 — kept |
| DETERMINISM-140 | §6.1 | §6.1 — kept |
| DETERMINISM-141 | §6.1 | §6.1 — kept |
| DETERMINISM-142 | §6.1 | §6.1 — kept |
| DETERMINISM-143 | §6.1 | §6.1 — kept |
| DETERMINISM-144 | §6.1 | §6.1 — kept |
| DETERMINISM-145 | §6.1 | §6.1 — C-1: lineage component points to §6.3's lineage key |
| DETERMINISM-146 | §6.1 | §6.1 — kept |
| DETERMINISM-147 | §6.1 | §6.1 — kept |
| DETERMINISM-148 | §6.1 | §6.1 — kept |
| DETERMINISM-149 | §6.1 | §6.1 — kept |
| DETERMINISM-150 | §6.1 | §6.1 — kept |
| DETERMINISM-151 | §6.1 | §6.1 — C-10: rerollable = exactly the six listed; naming.quarter and style.random registered non-rerollable |
| DETERMINISM-152 | §6.1 | §6.1 — kept |
| DETERMINISM-153 | §6.1 | §6.1 — kept |
| DETERMINISM-154 | §6.1 | §6.1 — kept |
| DETERMINISM-155 | §6.1 | §6.1 — C-10 (registry marks rerollable; generated type; CI reader test) |
| DETERMINISM-156 | §6.1 | §6.1 — kept |
| DETERMINISM-157 | §6.1 | §6.1 — kept |
| DETERMINISM-158 | §6.1 | §6.1 — kept |
| DETERMINISM-159 | §6.1 | §6.1 — C-10 (registry list unchanged) |
| DETERMINISM-160 | §6.1 | §6.1 — kept |
| DETERMINISM-161 | §6.1 | §6.1 — kept |
| DETERMINISM-162 | §6.1 | §6.1 — kept |
| DETERMINISM-163 | §6.1 | §6.1 — kept |
| DETERMINISM-164 | §6.1 | §6.1 — kept |
| DETERMINISM-165 | §6.1 | §6.1 — kept (+ "words 0 and 1", union from RENDERING-033) |
| DETERMINISM-166 | §6.1 | referenced to §8.10 (was at §6.1) |
| DETERMINISM-167 | §6.1 | §6.1 — kept |
| DETERMINISM-168 | §6.1 | §6.1 — kept; rationale → J-DET-53 |
| DETERMINISM-169 | §6.1 | rationale → J-DET-53 (new row, canon) in docs/ARCHITECTURE-RATIONALE.md; "(J-DET-53)" left at §6.1 Enter |
| DETERMINISM-170 | §6.1 | §6.1 — kept |
| DETERMINISM-171 | §6.2 | §6.2 — kept |
| DETERMINISM-172 | §6.2 | referenced to §2.9 Recipe (was at §6.2) |
| DETERMINISM-173 | §6.2 | §6.2 — kept |
| DETERMINISM-174 | §6.2 | §6.2 — kept; laziness contract, pack resolution by pointer (§4.1, §2.9) |
| DETERMINISM-175 | §6.2 | referenced to §4.1 (was at §6.2) |
| DETERMINISM-176 | §6.2 | referenced to §2.9 pack set bullet (was at §6.2) |
| DETERMINISM-177 | §6.2 | §6.2 — kept |
| DETERMINISM-178 | §6.2 | §6.2 — kept; derived-complete test by pointer to §6.5 (9) |
| DETERMINISM-179 | §6.2 | referenced to §6.5 (9) (was at §6.2) |
| DETERMINISM-180 | §6.2 | §6.2 — kept |
| DETERMINISM-181 | §6.2 | §6.2 — kept |
| DETERMINISM-182 | §6.2 | §6.2 — kept |
| DETERMINISM-183 | §6.2 | §6.2 — kept |
| DETERMINISM-184 | §6.2 | §6.2 — kept |
| DETERMINISM-185 | §6.2 | §6.2 — kept |
| DETERMINISM-186 | §6.2 | §6.2 — kept |
| DETERMINISM-187 | §6.2 | §6.2 — kept |
| DETERMINISM-188 | §6.2 | §6.2 — kept |
| DETERMINISM-189 | §6.2 | §6.2 — kept |
| DETERMINISM-190 | §6.2 | referenced to §12.8 (was at §6.2) |
| DETERMINISM-191 | §6.2 | §6.2 — kept |
| DETERMINISM-192 | §6.2 | §6.2 — VD5-4: node keying rule (partition node, one town node) |
| DETERMINISM-193 | §6.2 | referenced to §12.8 (was at §6.2) |
| DETERMINISM-194 | §6.2 | §6.2 — kept |
| DETERMINISM-195 | §6.2 | §6.2 — VD5-4: moves between nodes re-hash both nodes |
| DETERMINISM-196 | §6.2 | §6.2 — kept |
| DETERMINISM-197 | §6.2 | §6.2 — VD5-5: replay = session and truncation identity also compare the records digest |
| DETERMINISM-198 | §6.2 | rationale → J-DET-49 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.2 |
| DETERMINISM-199 | §6.2 | §6.2 — kept |
| DETERMINISM-200 | §6.2 | §6.2 — kept |
| DETERMINISM-201 | §6.2 | §6.2 — kept |
| DETERMINISM-202 | §6.2 (i) | §6.2 (i) — kept |
| DETERMINISM-203 | §6.2 (ii) | §6.2 (ii) — kept |
| DETERMINISM-204 | §6.2 (iii) | §6.2 (iii) — kept |
| DETERMINISM-205 | §6.2 (iii) | §6.2 (iii) — kept |
| DETERMINISM-206 | §6.2 (iii) | §6.2 (iii) — kept |
| DETERMINISM-207 | §6.2 (iii) | rationale → J-DET-40 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.2 (iii) |
| DETERMINISM-208 | §6.2 (iii) | §6.2 (iii) — kept |
| DETERMINISM-209 | §6.3 | §6.3 — kept |
| DETERMINISM-210 | §6.3 | §6.3 — C-1 canonical lineage key |
| DETERMINISM-211 | §6.3 | §6.3 — kept |
| DETERMINISM-212 | §6.3 | §6.3 — kept |
| DETERMINISM-213 | §6.3 | §6.3 — kept |
| DETERMINISM-214 | §6.3 | rationale → J-DET-1 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.3 |
| DETERMINISM-215 | §6.3 | §6.3 — kept |
| DETERMINISM-216 | §6.3 | §6.3 — kept |
| DETERMINISM-217 | §6.3 | §6.3 — kept |
| DETERMINISM-218 | §6.3 | §6.3 — kept |
| DETERMINISM-219 | §6.3 | §6.3 — kept |
| DETERMINISM-220 | §6.3 | §6.3 — kept |
| DETERMINISM-221 | §6.3 | §6.3 — kept |
| DETERMINISM-222 | §6.3 | rationale → J-DET-2 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.3 |
| DETERMINISM-223 | §6.3 | §6.3 — kept |
| DETERMINISM-224 | §6.3 | §6.3 — CF-PIPE-05 canonical (four draw cases) |
| DETERMINISM-225 | §6.3 | §6.3 — VD5-3: trigger list adds the frozenImport rebase (every unedited generated name) |
| DETERMINISM-226 | §6.3 | §6.3 — kept |
| DETERMINISM-227 | §6.3 | §6.3 — kept |
| DETERMINISM-228 | §6.3 | §6.3 — kept |
| DETERMINISM-229 | §6.3 | §6.3 — kept |
| DETERMINISM-230 | §6.3 | §6.3 — kept; VD5-1 comparison rule by pointer to §7.3 item 4; frozenImport returns confirm |
| DETERMINISM-231 | §6.3 | §6.3 — kept |
| DETERMINISM-232 | §6.3 | §6.3 — kept |
| DETERMINISM-233 | §6.3 | rationale → J-DET-37 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.3 |
| DETERMINISM-234 | §6.3 | §6.3 — kept |
| DETERMINISM-235 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-236 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-237 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-238 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-239 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-240 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-241 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-242 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-243 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-244 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-245 | §6.3 anchor table | §6.3 anchor table — kept |
| DETERMINISM-246 | §6.3 | referenced to §3.6 (was at §6.3) |
| DETERMINISM-247 | §6.3 | §6.3 — kept |
| DETERMINISM-248 | §6.3 | §6.3 — kept |
| DETERMINISM-249 | §6.3 | §6.3 — kept |
| DETERMINISM-250 | §6.3 | §6.3 — kept |
| DETERMINISM-251 | §6.3 | §6.3 — kept |
| DETERMINISM-252 | §6.3 | §6.3 — kept |
| DETERMINISM-253 | §6.3 | §6.3 — kept |
| DETERMINISM-254 | §6.3 | §6.3 — kept |
| DETERMINISM-255 | §6.3 | §6.3 — kept |
| DETERMINISM-256 | §6.3 | §6.3 — kept |
| DETERMINISM-257 | §6.3 scope of stability | §6.3 scope of stability — kept |
| DETERMINISM-258 | §6.3 | §6.3 — kept; naming-input fixtures by pointer to §13.2 |
| DETERMINISM-259 | §6.3 | referenced to §13.2 (was at §6.3) |
| DETERMINISM-260 | §6.4 | §6.4 — kept |
| DETERMINISM-261 | §6.4 | §6.4 — kept |
| DETERMINISM-262 | §6.4 | §6.4 — kept |
| DETERMINISM-263 | §6.4 | §6.4 — kept |
| DETERMINISM-264 | §6.4 | §6.4 — kept |
| DETERMINISM-265 | §6.4 | §6.4 — kept |
| DETERMINISM-266 | §6.4 | §6.4 — kept |
| DETERMINISM-267 | §6.4 | §6.4 — kept |
| DETERMINISM-268 | §6.4 | §6.4 — kept; pack set by pointer to §2.9 |
| DETERMINISM-269 | §6.4 | §6.4 — kept |
| DETERMINISM-270 | §6.4 | §6.4 — kept |
| DETERMINISM-271 | §6.4 | rationale → J-DET-50 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.4 |
| DETERMINISM-272 | §6.4 | §6.4 — kept |
| DETERMINISM-273 | §6.4 | §6.4 — kept |
| DETERMINISM-274 | §6.4 | §6.4 — kept |
| DETERMINISM-275 | §6.4 | §6.4 — kept |
| DETERMINISM-276 | §6.4 | §6.4 — kept |
| DETERMINISM-277 | §6.4 | §6.4 — kept; shift/cascade records by pointer to §13.3 |
| DETERMINISM-278 | §6.4 | referenced to §13.3 (was at §6.4) |
| DETERMINISM-279 | §6.5 (1) | referenced to §3.2 (3) (was at §6.5 (1)) |
| DETERMINISM-280 | §6.5 (2) | §6.5 (2) — kept |
| DETERMINISM-281 | §6.5 (3) | §6.5 (3) — kept |
| DETERMINISM-282 | §6.5 (3) | §6.5 (3) — kept |
| DETERMINISM-283 | §6.5 (3) | §6.5 (3) — kept |
| DETERMINISM-284 | §6.5 (3) | §6.5 (3) — kept; ratio() rule by pointer to §3.2 (8) |
| DETERMINISM-285 | §6.5 (3) | referenced to §3.2 (8) (was at §6.5 (3)) |
| DETERMINISM-286 | §6.5 (4) | §6.5 (4) — kept |
| DETERMINISM-287 | §6.5 (5) | §6.5 (5) — kept |
| DETERMINISM-288 | §6.5 (6) | referenced to §3.3 step 2 (was at §6.5 (6)) |
| DETERMINISM-289 | §6.5 (7) | §6.5 (7) — kept (KERNEL-C01: fallback engine by pointer to §3.7) |
| DETERMINISM-290 | §6.5 (8) | §6.5 (8) — kept |
| DETERMINISM-291 | §6.5 (9) | §6.5 (9) — kept |
| DETERMINISM-292 | §6.5 (9) | §6.5 (9) — kept |
| DETERMINISM-293 | §6.5 (9) | §6.5 (9) — kept |
| DETERMINISM-294 | §6.5 (9) | referenced to §13.2 (MOVE OUT; §6.5 (9) names op-order determinism by pointer) |
| DETERMINISM-295 | §6.5 (9) | referenced to §13.3 (was at §6.5 (9)) |
| DETERMINISM-296 | §6.5 (9) | §6.5 (9) — kept |
| DETERMINISM-297 | §6.5 (9) | §6.5 (9) — VD5-5: requires equal records digests too |
| DETERMINISM-298 | §6.5 (9) | §6.5 (9) — VD5-5: requires equal records digests too |
| DETERMINISM-299 | §6.5 (9) | §6.5 (9) — kept |
| DETERMINISM-300 | §6.5 (9) | §6.5 (9) — kept |
| DETERMINISM-301 | §6.5 (9) | §6.5 (9) — kept |
| DETERMINISM-302 | §6.5 (10) | §6.5 (10) — kept; Clipper2 half by pointer to §3.7 (KERNEL-C01) |
| DETERMINISM-303 | §6.5 (10) | referenced to §3.7 (was at §6.5 (10)) |
| DETERMINISM-304 | §6.5 (10) | rationale → J-DET-28 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.5 (10) |
| DETERMINISM-305 | §7 intro | §7 (plain-words intro) — §7 plain-words intro (kept) |
| DETERMINISM-306 | §7.1 | §7.1 — kept (comments shortened) |
| DETERMINISM-307 | §7.1 | §7.1 — the event list by reference to §6.3 case (4) triggers (EditBase.renames comment) |
| DETERMINISM-308 | §7.1 | §7.1 — kept |
| DETERMINISM-309 | §7.1 | §7.1 — kept |
| DETERMINISM-310 | §7.1 | §7.1 — kept |
| DETERMINISM-311 | §7.1 | §7.1 — kept |
| DETERMINISM-312 | §7.1 | §7.1 — kept |
| DETERMINISM-313 | §7.1 | §7.1 — kept |
| DETERMINISM-314 | §7.1 | §7.1 — kept |
| DETERMINISM-315 | §7.1 | §7.1 — kept |
| DETERMINISM-316 | §7.1 | §7.1 — kept |
| DETERMINISM-317 | §7.1 | §7.1 — kept |
| DETERMINISM-318 | §7.1 | §7.1 — kept |
| DETERMINISM-319 | §7.1 | §7.1 — kept |
| DETERMINISM-320 | §7.1 | §7.1 — kept |
| DETERMINISM-321 | §7.1 | §7.1 — kept |
| DETERMINISM-322 | §7.1 | §7.1 — kept |
| DETERMINISM-323 | §7.1 | §7.1 — kept |
| DETERMINISM-324 | §7.1 | §7.1 — kept |
| DETERMINISM-325 | §7.1 | §7.1 — kept |
| DETERMINISM-326 | §7.1 | §7.1 — kept |
| DETERMINISM-327 | §7.1 | §7.1 — kept |
| DETERMINISM-328 | §7.1 | §7.1 — kept |
| DETERMINISM-329 | §7.1 | §7.1 — kept |
| DETERMINISM-330 | §7.1 | §7.1 — kept |
| DETERMINISM-331 | §7.1 | §7.1 — kept |
| DETERMINISM-332 | §7.1 | referenced to §4.11 (was at §7.1) |
| DETERMINISM-333 | §7.1 | §7.1 — kept |
| DETERMINISM-334 | §7.1 | §7.1 — kept |
| DETERMINISM-335 | §7.1 | §7.1 — kept |
| DETERMINISM-336 | §7.1 | §7.1 — kept |
| DETERMINISM-337 | §7.1 | §7.1 — kept |
| DETERMINISM-338 | §7.1 | §7.1 — kept |
| DETERMINISM-339 | §7.1 | §7.1 — kept |
| DETERMINISM-340 | §7.1 | §7.1 — kept |
| DETERMINISM-341 | §7.1 | §7.1 — kept |
| DETERMINISM-342 | §7.1 named actions | §7.1 named actions — kept |
| DETERMINISM-343 | §7.1 named actions | §7.1 named actions — kept |
| DETERMINISM-344 | §7.1 named actions | §7.1 named actions — C-2: points to §5.1 (6) |
| DETERMINISM-345 | §7.1 named actions | §7.1 named actions — canonical list of early-consumed parameters (also the no-local-operator list of §7.3 item 3) |
| DETERMINISM-346 | §7.1 named actions | §7.1 named actions — kept |
| DETERMINISM-347 | §7.1 named actions | §7.1 named actions — kept |
| DETERMINISM-348 | §7.1 warp | §7.1 warp — kept |
| DETERMINISM-349 | §7.1 warp | §7.1 warp — kept |
| DETERMINISM-350 | §7.1 warp | referenced to §3.6 (was at §7.1 warp) |
| DETERMINISM-351 | §7.1 warp | §7.1 warp — kept (points to §7.4 warp paragraph) |
| DETERMINISM-352 | §7.1 warp | §7.1 warp — kept |
| DETERMINISM-353 | §7.1 warp table | §7.1 warp table — kept |
| DETERMINISM-354 | §7.1 warp table | §7.1 warp table — kept; export clause → §11.1 |
| DETERMINISM-355 | §7.1 warp table | referenced to §9.5 (was at §7.1 warp table) |
| DETERMINISM-356 | §7.1 | rationale → J-DET-15 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.1 |
| DETERMINISM-357 | §7.1 | moved out → §11.1 (rendering states it; §7.1 Rotate row points there) |
| DETERMINISM-358 | §7.1 drawing | §7.1 drawing — kept |
| DETERMINISM-359 | §7.1 drawing | §7.1 drawing — kept |
| DETERMINISM-360 | §7.1 drawing | §7.1 drawing — kept |
| DETERMINISM-361 | §7.1 drawing | rationale → J-DET-14 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.1 drawing |
| DETERMINISM-362 | §7.1 drawing | §7.1 drawing — C-5: by pointer to §4.2 S1 (5) |
| DETERMINISM-363 | §7.1 building editing | §7.1 building editing — kept |
| DETERMINISM-364 | §7.1 building editing | §7.1 building editing — kept |
| DETERMINISM-365 | §7.1 building editing | §7.1 building editing — kept |
| DETERMINISM-366 | §7.1 brushes | §7.1 brushes — kept |
| DETERMINISM-367 | §7.1 brushes | §7.1 brushes — kept |
| DETERMINISM-368 | §7.1 brushes | §7.1 brushes — kept |
| DETERMINISM-369 | §7.1 people | §7.1 people — kept |
| DETERMINISM-370 | §7.1 people | §7.1 people — kept |
| DETERMINISM-371 | §7.1 edit targets | §7.1 edit targets — kept |
| DETERMINISM-372 | §7.1 edit targets | referenced to §2.8 entity registry (was at §7.1 edit targets) |
| DETERMINISM-373 | §7.1 edit targets | §7.1 edit targets — kept |
| DETERMINISM-374 | §7.1 edit targets | referenced to §2.9 View state (was at §7.1 edit targets) |
| DETERMINISM-375 | §7.1 dry run | §7.1 dry run — kept |
| DETERMINISM-376 | §7.1 dry run | §7.1 dry run — kept; action list by pointer to §5.2 F-EDIT |
| DETERMINISM-377 | §7.1 dry run | §7.1 dry run — kept |
| DETERMINISM-378 | §7.1 dry run | referenced to §11.3 (was at §7.1 dry run) |
| DETERMINISM-379 | §7.2 | §7.2 — kept |
| DETERMINISM-380 | §7.2 | §7.2 — kept |
| DETERMINISM-381 | §7.2 | referenced to §3.6 (was at §7.2) |
| DETERMINISM-382 | §7.2 | §7.2 — C-7: points to §7.7 |
| DETERMINISM-383 | §7.2 drawn constraints | §7.2 drawn constraints — kept |
| DETERMINISM-384 | §7.2 drawn constraints | §7.2 drawn constraints — kept |
| DETERMINISM-385 | §7.2 drawn constraints | §7.2 drawn constraints — kept |
| DETERMINISM-386 | §7.2 drawn constraints | §7.2 drawn constraints — kept |
| DETERMINISM-387 | §7.2 | rationale → J-DET-6 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.2 |
| DETERMINISM-388 | §7.2 field brushes | §7.2 field brushes — kept, τ = 0.01 stated here (detail from DETERMINISM-389, PIPELINE-211) |
| DETERMINISM-389 | §7.2 field brushes | referenced to §7.2 field brushes (was at §7.2 field brushes) |
| DETERMINISM-390 | §7.2 field brushes | referenced to §4.5 (was at §7.2 field brushes) |
| DETERMINISM-391 | §7.2 terrain brush | §7.2 terrain brush — kept |
| DETERMINISM-392 | §7.2 terrain brush | §7.2 terrain brush — kept; sea floor by pointer to §4.2 S1 (2) |
| DETERMINISM-393 | §7.2 terrain brush | referenced to §4.2 S1 (2) (was at §7.2 terrain brush) |
| DETERMINISM-394 | §7.2 terrain brush | §7.2 terrain brush — kept |
| DETERMINISM-395 | §7.2 terrain brush | §7.2 terrain brush — kept |
| DETERMINISM-396 | §7.2 | rationale → J-DET-24 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.2 |
| DETERMINISM-397 | §7.3 (1) | §7.3 (1) — kept (merged with DETERMINISM-594) |
| DETERMINISM-398 | §7.3 (1) | §7.3 (1) — kept |
| DETERMINISM-399 | §7.3 (2) | §7.3 (2) — kept; rederivesFrom by pointer to §3.3 |
| DETERMINISM-400 | §7.3 (2) | referenced to §3.10 (was at §7.3 (2)) |
| DETERMINISM-401 | §7.3 (2) | referenced to §4.7 S10 (0) (was at §7.3 (2)) |
| DETERMINISM-402 | §7.3 (2) | §7.3 (2) — kept; step (0) itself by pointer to §4.7 |
| DETERMINISM-403 | §7.3 (2) | §7.3 (2) — kept |
| DETERMINISM-404 | §7.3 (2) | rationale → J-DET-29 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.3 (2) |
| DETERMINISM-405 | §7.3 (2) | §7.3 (2) — by pointer to §6.3 draw cases |
| DETERMINISM-406 | §7.3 (2) | referenced to §8.1 (4) §8.1 item 4 (was at §7.3 (2)) |
| DETERMINISM-407 | §7.3 (2) | §7.3 (2) — kept (+ J-DET-21) |
| DETERMINISM-408 | §7.3 (3) | §7.3 (3) — kept |
| DETERMINISM-409 | §7.3 (3) | §7.3 (3) — kept |
| DETERMINISM-410 | §7.3 operator table | §7.3 operator table — C-9: both escalation triggers stated |
| DETERMINISM-411 | §7.3 operator table | §7.3 operator table — C-9: both escalation triggers stated |
| DETERMINISM-412 | §7.3 operator table | §7.3 operator table — C-8: gate-count change re-derives from S3 (stage 1) or S5 of its stage (later enceinte) |
| DETERMINISM-413 | §7.3 operator table | §7.3 operator table — kept |
| DETERMINISM-414 | §7.3 operator table | §7.3 operator table — kept |
| DETERMINISM-415 | §7.3 operator table | §7.3 operator table — C-8: "or the gate count" removed (stale); keeps "when the enceinte kind changes" |
| DETERMINISM-416 | §7.3 operator table | §7.3 operator table — kept; carve footprint by pointer to §4.11 with its composition |
| DETERMINISM-417 | §7.3 operator table | §7.3 operator table — kept |
| DETERMINISM-418 | §7.3 (a) 1 | §7.3 (a) 1 — kept |
| DETERMINISM-419 | §7.3 (a) 2 | §7.3 (a) 2 — kept |
| DETERMINISM-420 | §7.3 (a) 2 | §7.3 (a) 2 — kept |
| DETERMINISM-421 | §7.3 (a) 2 | §7.3 (a) 2 — kept |
| DETERMINISM-422 | §7.3 (a) 3 | §7.3 (a) 3 — kept |
| DETERMINISM-423 | §7.3 (a) 4 | §7.3 (a) 4 — kept |
| DETERMINISM-424 | §7.3 (a) 4 | rationale → J-DET-24 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.3 (a) 4 |
| DETERMINISM-425 | §7.3 (a) 5 | §7.3 (a) 5 — kept |
| DETERMINISM-426 | §7.3 (a) 6 | §7.3 (a) 6 — kept |
| DETERMINISM-427 | §7.3 (b) | §7.3 (b) — kept; clearing rules by pointer to §3.3 |
| DETERMINISM-428 | §7.3 (b) 1 | §7.3 (b) 1 — kept |
| DETERMINISM-429 | §7.3 (b) 1 | §7.3 (b) 1 — kept |
| DETERMINISM-430 | §7.3 (b) 1 | §7.3 (b) 1 — kept |
| DETERMINISM-431 | §7.3 (b) 1 | §7.3 (b) 1 — kept |
| DETERMINISM-432 | §7.3 (b) 2 | §7.3 (b) 2 — kept |
| DETERMINISM-433 | §7.3 (b) 2 | §7.3 (b) 2 — C-3 canonical deck choice; detour bound by pointer to §5.2 F-REDERIVE; kept-way definition by pointer to F-REDERIVE |
| DETERMINISM-434 | §7.3 (b) 2 | §7.3 (b) 2 — kept |
| DETERMINISM-435 | §7.3 (b) 2 | §7.3 (b) 2 — kept |
| DETERMINISM-436 | §7.3 (b) 2 | §7.3 (b) 2 — kept |
| DETERMINISM-437 | §7.3 (b) 3 | §7.3 (b) 3 — kept; clear-region semantics by pointer to §3.3 rule 1 |
| DETERMINISM-438 | §7.3 (b) 3 | §7.3 (b) 3 — kept |
| DETERMINISM-439 | §7.3 (b) 3 | §7.3 (b) 3 — cut mechanics by pointer to F-REDERIVE's way rung (§5.2); rekey clause kept |
| DETERMINISM-440 | §7.3 (b) 3 | §7.3 (b) 3 — contact-name choice rule by pointer to §2.2 rule 7 (stated there identically, l. 870–880) |
| DETERMINISM-441 | §7.3 (b) 3 | referenced to §2.2 rule 5 Stretches (was at §7.3 (b) 3) |
| DETERMINISM-442 | §7.3 (b) 3 | §7.3 (b) 3 — kept |
| DETERMINISM-443 | §7.3 (b) 4 | §7.3 (b) 4 — kept |
| DETERMINISM-444 | §7.3 (b) 4 | §7.3 (b) 4 — kept |
| DETERMINISM-445 | §7.3 (b) 4 | §7.3 (b) 4 — kept |
| DETERMINISM-446 | §7.3 (b) 5 | §7.3 (b) 5 — kept |
| DETERMINISM-447 | §7.3 (b) 6 | §7.3 (b) 6 — kept |
| DETERMINISM-448 | §7.3 (b) 7 | §7.3 (b) 7 — kept |
| DETERMINISM-449 | §7.3 (b) 8 | §7.3 (b) 8 — CANON-C07: "the height samples the edit changed" |
| DETERMINISM-450 | §7.3 (b) 9 | §7.3 (b) 9 — by pointer to §5.2 F-REDERIVE (deck and site over land = DETERMINISM-076, -077) |
| DETERMINISM-451 | §7.3 (b) | §7.3 (b) — kept |
| DETERMINISM-452 | §7.3 (b) | rationale → J-DET-23 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.3 (b) |
| DETERMINISM-453 | §7.3 (3) | §7.3 (3) — list by reference to §7.1 (DETERMINISM-345) |
| DETERMINISM-454 | §7.3 (4) | §7.3 (4) — kept |
| DETERMINISM-455 | §7.3 (4) | §7.3 (4) — VD5-1: stored fates and renames compared only under the confirming output version |
| DETERMINISM-456 | §7.3 (4) | §7.3 (4) — kept |
| DETERMINISM-457 | §7.3 (4) | §7.3 (4) — VD5-1; freed-name events by pointer to §6.3 case (4) |
| DETERMINISM-458 | §7.3 (5) | referenced to §2.8 Derivation records (was at §7.3 (5)) |
| DETERMINISM-459 | §7.3 (5) | §7.3 (5) — kept |
| DETERMINISM-460 | §7.3 (6) | §7.3 (6) — VD5-5: both routes leave the same records (§2.8) |
| DETERMINISM-461 | §7.3 (7) (i) | §7.3 (7) (i) — VD5-5: replay = session compares the records digest too |
| DETERMINISM-462 | §7.3 (7) (ii) | §7.3 (7) (ii) — kept |
| DETERMINISM-463 | §7.3 (7) (iii) | §7.3 (7) (iii) — kept |
| DETERMINISM-464 | §7.3 (7) (iv) | §7.3 (7) (iv) — kept |
| DETERMINISM-465 | §7.3 (7) (iv) | referenced to §13.2 (was at §7.3 (7) (iv)) |
| DETERMINISM-466 | §7.3 (7) (v) | §7.3 (7) (v) — kept; union of F-REDERIVE test details (0 sites over land, 0 hard violations, events for every demolition/cut/re-route; drawn-way and drawn-wall sequences) |
| DETERMINISM-467 | §7.3 (7) (v) | §7.3 (7) (v) — kept |
| DETERMINISM-468 | §7.3 (7) (v) | §7.3 (7) (v) — kept |
| DETERMINISM-469 | §7.3 (7) (vi) | §7.3 (7) (vi) — kept |
| DETERMINISM-470 | §7.4 | §7.4 — kept |
| DETERMINISM-471 | §7.4 lifecycle | §7.4 lifecycle — kept; case (4) by the table's shorthand |
| DETERMINISM-472 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-473 | §7.4 lifecycle | §7.4 lifecycle — kept; kernel validation by pointer to §3.6 |
| DETERMINISM-474 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-475 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-476 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-477 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-478 | §7.4 lifecycle | §7.4 lifecycle — VD5-1: fates and renames compared under §7.3 item 4's rule |
| DETERMINISM-479 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-480 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-481 | §7.4 lifecycle | §7.4 lifecycle — C-4: row names editTable / editPreset only |
| DETERMINISM-482 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-483 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-484 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-485 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-486 | §7.4 lifecycle | §7.4 lifecycle — C-4: setStyle stated in this row only |
| DETERMINISM-487 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-488 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-489 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-490 | §7.4 lifecycle | §7.4 lifecycle — VD5-3: frozenImport rebase runs case (4), returns confirm, stores renames |
| DETERMINISM-491 | §7.4 lifecycle | §7.4 lifecycle — moved from the rebase row to the "Rebases" paragraph under the table (text kept) |
| DETERMINISM-492 | §7.4 lifecycle | §7.4 lifecycle — moved from the rebase row to the "Rebases" paragraph under the table (text kept) |
| DETERMINISM-493 | §7.4 lifecycle | §7.4 lifecycle — VD5-1: upgrade lists recomputed fates/renames of earlier events once in its diff |
| DETERMINISM-494 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-495 | §7.4 lifecycle | §7.4 lifecycle — kept |
| DETERMINISM-496 | §7.4 undo | §7.4 undo — kept |
| DETERMINISM-497 | §7.4 sessions | §7.4 sessions — kept |
| DETERMINISM-498 | §7.4 sessions | rationale → J-DET-34 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.4 sessions |
| DETERMINISM-499 | §7.4 targets | §7.4 targets — kept |
| DETERMINISM-500 | §7.4 targets | §7.4 targets — kept |
| DETERMINISM-501 | §7.4 application | §7.4 application — kept |
| DETERMINISM-502 | §7.4 application | §7.4 application — kept |
| DETERMINISM-503 | §7.4 independence | §7.4 independence — kept |
| DETERMINISM-504 | §7.4 independence | §7.4 independence — kept |
| DETERMINISM-505 | §7.4 records | §7.4 records — kept |
| DETERMINISM-506 | §7.4 records | §7.4 records — kept |
| DETERMINISM-507 | §7.4 truncation | §7.4 truncation — kept; pack retention by pointer to §2.9 |
| DETERMINISM-508 | §7.4 truncation | referenced to §2.9 pack set bullet (was at §7.4 truncation) |
| DETERMINISM-509 | §7.4 truncation | §7.4 truncation — VD5-5: equal records digests too; cases by pointer to §6.5 (9) |
| DETERMINISM-510 | §7.4 checkpoints | §7.4 checkpoints — kept |
| DETERMINISM-511 | §7.4 checkpoints | §7.4 checkpoints — kept |
| DETERMINISM-512 | §7.4 | §7.4 — kept |
| DETERMINISM-513 | §7.4 | rationale → J-DET-16 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.4 |
| DETERMINISM-514 | §7.4 warp ground | §7.4 warp ground — kept |
| DETERMINISM-515 | §7.4 warp ground | §7.4 warp ground — kept |
| DETERMINISM-516 | §7.4 warp ground | §7.4 warp ground — kept |
| DETERMINISM-517 | §7.4 warp ground | §7.4 warp ground — kept |
| DETERMINISM-518 | §7.4 warp ground | referenced to §2.6 stored composition (2)–(5) (was at §7.4 warp ground) |
| DETERMINISM-519 | §7.4 warp ground | §7.4 warp ground — kept |
| DETERMINISM-520 | §7.4 warp ground | §7.4 warp ground — kept |
| DETERMINISM-521 | §7.4 warp ground | referenced to §8.10 (was at §7.4 warp ground) |
| DETERMINISM-522 | §7.4 warp ground | referenced to §13.2 (was at §7.4 warp ground) |
| DETERMINISM-523 | §7.4 warp ground | rationale → J-DET-31 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.4 warp ground |
| DETERMINISM-524 | §7.4 MFCG asks | §7.4 MFCG asks — kept |
| DETERMINISM-525 | §7.4 MFCG asks | §7.4 MFCG asks — kept |
| DETERMINISM-526 | §7.4 MFCG asks | §7.4 MFCG asks — C-5: by pointer to §4.2 S1 (5) |
| DETERMINISM-527 | §7.5 | §7.5 — kept |
| DETERMINISM-528 | §7.5 (1) | §7.5 (1) — kept |
| DETERMINISM-529 | §7.5 (2) | §7.5 (2) — kept |
| DETERMINISM-530 | §7.5 (2) | §7.5 (2) — kept |
| DETERMINISM-531 | §7.5 (2) | §7.5 (2) — kept |
| DETERMINISM-532 | §7.5 (2) | §7.5 (2) — kept |
| DETERMINISM-533 | §7.5 (2) | §7.5 (2) — VD5-2 / C-6: only "keep the old model" offered; frozen view whose frozenImport the cap refuses; CLI replays |
| DETERMINISM-534 | §7.5 (2) | §7.5 (2) — kept |
| DETERMINISM-535 | §7.5 (2) | §7.5 (2) — kept |
| DETERMINISM-536 | §7.5 (2) | §7.5 (2) — kept |
| DETERMINISM-537 | §7.5 (2) | §7.5 (2) — kept; rationale → J-DET-18 |
| DETERMINISM-538 | §7.5 (2) | referenced to §2.9 Size budget (was at §7.5 (2)) |
| DETERMINISM-539 | §7.5 | rationale → J-DET-18 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.5 |
| DETERMINISM-540 | §7.5 (2) | §7.5 (2) — kept |
| DETERMINISM-541 | §7.5 | §7.5 — kept |
| DETERMINISM-542 | §7.5 | §7.5 — VD5-1: MigrationMap.changedConfirmations added |
| DETERMINISM-543 | §7.5 | rationale → J-DET-44 (+ J-DET-54 new, canon) in docs/ARCHITECTURE-RATIONALE.md; "(J-DET-44, J-DET-54)" left at §7.5 |
| DETERMINISM-544 | §7.5 | §7.5 — VD5-1, VD5-2: two tests added |
| DETERMINISM-545 | §7.6 | §7.6 — kept |
| DETERMINISM-546 | §7.6 | §7.6 — kept |
| DETERMINISM-547 | §7.6 | referenced to §2.9 pack set bullet (was at §7.6) |
| DETERMINISM-548 | §7.6 | §7.6 — kept (+ corpus select/deselect is this adjust) |
| DETERMINISM-549 | §7.6 | referenced to §2.9 pack set bullet (was at §7.6) |
| DETERMINISM-550 | §7.6 | §7.6 — NP5-3: "…, listed for confirmation (§6.3 case (4)), and never the row's other names" |
| DETERMINISM-551 | §7.6 | referenced to §2.9 pack set bullet (was at §7.6) |
| DETERMINISM-552 | §7.6 | §7.6 — kept |
| DETERMINISM-553 | §7.6 | §7.6 — kept |
| DETERMINISM-554 | §7.6 | §7.6 — kept |
| DETERMINISM-555 | §7.6 | §7.6 — kept |
| DETERMINISM-556 | §7.6 | rationale → J-DET-48 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.6 |
| DETERMINISM-557 | §7.6 | §7.6 — kept |
| DETERMINISM-558 | §7.6 | §7.6 — kept |
| DETERMINISM-559 | §7.6 | §7.6 — kept |
| DETERMINISM-560 | §7.6 | §7.6 — kept |
| DETERMINISM-561 | §7.6 | §7.6 — kept |
| DETERMINISM-562 | §7.7 | §7.7 — kept |
| DETERMINISM-563 | §7.7 (1) | §7.7 (1) — kept |
| DETERMINISM-564 | §7.7 (1) | §7.7 (1) — kept (+ "≈ 200 internal parameters", union from PIPELINE-053) |
| DETERMINISM-565 | §7.7 (1) | §7.7 (1) — kept |
| DETERMINISM-566 | §7.7 (1) | §7.7 (1) — kept |
| DETERMINISM-567 | §7.7 (1) | §7.7 (1) — kept |
| DETERMINISM-568 | §7.7 (1) | §7.7 (1) — kept |
| DETERMINISM-569 | §7.7 (2) | §7.7 (2) — kept |
| DETERMINISM-570 | §7.7 (3) | §7.7 (3) — kept |
| DETERMINISM-571 | §7.7 (3) | §7.7 (3) — kept |
| DETERMINISM-572 | §7.7 (3) | §7.7 (3) — kept |
| DETERMINISM-573 | §7.7 | §7.7 — C-7 canonical: one order for every meeting of protections and inputs; S10–S11 apply it to assignments |
| DETERMINISM-574 | §7.7 | rationale → J-DET-11 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.7 |
| DETERMINISM-575 | §7.7 | §7.7 — kept |
| DETERMINISM-576 | §7.7 | §7.7 — kept |
| DETERMINISM-577 | §7.7 | §7.7 — kept |
| DETERMINISM-578 | §7.7 | §7.7 — kept |
| DETERMINISM-579 | §7.8 | §7.8 — kept |
| DETERMINISM-580 | §7.8 | §7.8 — kept |
| DETERMINISM-581 | §7.8 | §7.8 — kept |
| DETERMINISM-582 | §7.8 | §7.8 — kept |
| DETERMINISM-583 | §7.8 | §7.8 — kept |
| DETERMINISM-584 | §7.8 | rationale → J-DET-27 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.8 |
| DETERMINISM-585 | §7.8 | §7.8 — kept |
| DETERMINISM-586 | §7.8 | §7.8 — kept |
| DETERMINISM-587 | §7.8 | §7.8 — kept; auto features by pointer to §4.2 S0 |
| DETERMINISM-588 | §7.8 | referenced to §4.2 S0 (was at §7.8) |
| DETERMINISM-589 | §7.8 | §7.8 — kept |
| DETERMINISM-590 | §5.1 (1) | referenced to Delegated decisions (was at §5.1 (1)) |
| DETERMINISM-591 | §6.2; §6.5 (7) | referenced to Delegated decisions (was at §6.2; §6.5 (7)) |
| DETERMINISM-592 | §6.5 (2) | referenced to Delegated decisions (was at §6.5 (2)) |
| DETERMINISM-593 | §6.5 (10) | rationale → J-K8 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.5 (10) |
| DETERMINISM-594 | §7.3 (1) | §7.3 (1) — kept (merged into item 1) |
| DETERMINISM-595 | §7.4 application | §7.4 application — kept |
| DETERMINISM-596 | §7.4 targets | §7.4 targets — kept |
| DETERMINISM-597 | §6.2 | §6.2 — kept |
| DETERMINISM-598 | §6.4 goldens | referenced to §13.3 (was at §6.4 goldens) |
| DETERMINISM-599 | §6.1 | §6.1 — kept |
| DETERMINISM-600 | §6.4 | referenced to §2.9 pack set bullet (was at §6.4) |
| DETERMINISM-601 | §6.2 (iii) | §6.2 (iii) — kept |
