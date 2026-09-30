# Verify — determinism part (§5, §6, §7) of the consolidated ARCHITECTURE.md, round 0

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Lane `consistency/verify-determinism-r0`, 2026-09-26. Status: COMPLETE. Inputs read in full: §5–§7 of the new
`docs/ARCHITECTURE.md` (l. 3916–5445), the archived §5–§7 (`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`
l. 5025–6773), all 601 records of `inventory-determinism.json`, `canon.json` (every conflict, routing and home rule that
touches this part, and `by_inventory_id` for all 601 ids), `rewrite-determinism.md` (whole mapping table, none sampled),
`still-open-r5.json` (VD5-1 … VD5-7, NP5-1 … NP5-4), the cross-part notes of the other five rewrite reports, and every
home section a pointer of this part lands on.

## 1. Outcome

Every one of the 601 inventory ids was checked against the new text, and each "referenced to §x" id against its target
section. **17 issues, all minor (0 blocker, 0 major): 15 owned by determinism, 2 by rendering.** The five open items
owned here (VD5-1 … VD5-5) and the three routed ones (NP5-2, NP5-3, VD5-6) are **fixed**. Every canon conflict routed
here is applied, except that CF-PIPE-04's home lacks the union detail (VDC-5), C-5 leaves a location phrase (VDC-12) and
MODEL-C09's "in-window" qualifier is missing from §6.2 (VDC-6). No deferral wording, no review marker and no round
narration are left in §5–§7. Four facts are **lost**: the engine id `plat-arrangement@<version>` (VDC-1), the
lock → unlock and setAttr → undo naming fixture (VDC-2), the digest-memory breakdown (VDC-3, rendering) and "logged with
author `host`" (VDC-4, rendering). Of the cross-part notes addressed to this part, 7 valid ones are not reflected
(VDC-1, -5, -7, -8, -9, -10, -11); two are recorded below as moot or partly wrong (§4).

## 2. Issues

| id | severity | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VDC-1 | minor | lost | determinism | The engine id `plat-arrangement@<version>` is stated nowhere: §5.4's `kernel.engine` comment now reads "the engine id, §3.7", and §3.7 says "The generation report names the engine that ran (§5.4)" — a circular pointer (DETERMINISM-127/-128, KERNEL-316; kernel note 12 asked to keep the comment). | §5.4: `engine: string /* 'plat-arrangement@<version>', §3.7 */`. |
| VDC-2 | minor | lost | determinism | The fixture "a street locked and later unlocked, and a street renamed by `setAttr` and the rename undone, each around a corpus selection: the freeing event re-draws by case (4), listed, confirmed and stored in the event; kept and truncated logs give one digest" (archived §6.3 and §13.2, SCOPE-208) is gone: the canon homed it at §6.5 (9) (DETERMINISM-298, detail gap flagged), which lists only the setAttr + undo and rerollLayer + undo truncation pairs; §13.2's naming-input list has no unlock case (grep: 0 test mentions of `unlock`). | §6.5 (9) truncation identity: "… a `setAttr(name)` + `undo` pair, a `lock` + `unlock` pair and a naming `rerollLayer` + `undo` pair, each around a corpus selection — the freeing event re-drawing the name by §6.3's case (4), listed, confirmed and stored in the event, and the naming records restored with the names (§2.8) — …". |
| VDC-3 | minor | lost | rendering | The digest-tree memory breakdown (≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and interior nodes at 16 B each, DETERMINISM-190; canon detail gap) appears nowhere; §12.8 keeps only "≈ 1 MB". Determinism rewrite note 6 asked §12.8 to take it. | §12.8, beside "the model tree ≈ 1 MB": "(≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and their interior nodes at 16 B each)". |
| VDC-4 | minor | lost | rendering | "Bridge commands from a host … are logged with `author: 'host'`" (archived §7.1, only statement) is gone: §7.1 now points to §11.3, whose Logging rule says events are logged one to one but never names the author (DETERMINISM-378 → RENDERING-472). | §11.3 Logging: "… logged one to one, a host's own commands with `author: 'host'` (§7.1)" (or restore the clause in §7.1). |
| VDC-5 | minor | conflict | determinism | §4.7 S10b says F-SITING's "last rung reduces the manifest, lowest-priority classes first"; F-SITING, the canonical home (CF-PIPE-04), says only "reduce the manifest and report `unplaced`" (pipeline note D-2, the union §10.2 used to state). | §5.2 F-SITING ladder: "… → reduce the manifest, lowest-priority classes first, and report `unplaced` — …". |
| VDC-6 | minor | conflict | determinism | §6.2 says the records root is "recomputed by every load" and the 150 ms recomputation is "used … by every load (§2.9 step 3)"; §2.8 and §2.9 (MODEL-C09 ruling) say every in-window load — a frozen view checks chunk hashes only (§2.9 step 2, §6.4, §5.3). | §6.2: "recomputed by every in-window load (§2.9 step 3)" in the records-digest bullet and "by every in-window load (§2.9 step 3)" in Bars. |
| VDC-7 | minor | conflict | determinism | §2.6 stored-composition rule (1) (NP5-1) says the faces sharing a split edge — the building's yard parts, a row neighbour's footprint and wing rings, a neighbouring plot's L4 face — equal their prior rings minus the vertices, "the check of §7.3 item 7 (ii)"; item 7 (ii) checks only the seam exception's faces and does not name these faces or the `composition` role rows (model note 8). | §7.3 item 7 (ii): add "and, for an edit that stores a composition, each face §2.6 composition rule (1) names — the yard parts, a row neighbour's footprint and wing rings, a neighbouring plot's L4 face — equal to its prior ring after removing those vertices, the `composition` role rows present". |
| VDC-8 | minor | conflict | determinism | §7.2 (home of the brush threshold, DETERMINISM-388) says a stroke re-derives blocks "whose plot samples moved by more than τ" without the baseline that PIPELINE-211 stated and pipeline note D-5 asked to keep: the samples the plots' `DerivationRecord` holds. | §7.2 Field brushes: "… whose plot samples moved — against the samples their `DerivationRecord` holds (§2.8) — by more than τ = 0.01 …". |
| VDC-9 | minor | conflict | determinism | §4.2 S0 and §2.9 point to §7.7 for "the blueprint's assignments and edits entering the log"; §7.7 One path names only assignments at log positions 0…k (PIPELINE-054; pipeline note D-6). | §7.7 One path: "A blueprint's assignments and edits become events at log positions 0…k when the document is created; every `assign` event …". |
| VDC-10 | minor | conflict | determinism | F-CASTLE's test column restates §4.8's castle acceptance ("0 ways through reservations", MFCG's 178 / 11 census baseline), which the canon homes at §4.8 and §4.8 now states (pipeline note D-3). Values agree. | F-CASTLE test: "§4.8's castle acceptance; O8 (d)". |
| VDC-11 | minor | conflict | determinism | Rendering's R13 notes ("may add") are not reflected at this part's homes: (a) §6.1's `render.stampTiles` entry lacks "reroll, attempt, epoch and salt 0", stated at §8.10; (b) §7.3 item 2's replay-mode list lacks "the undo of an upgrade after a reload", which §12.6's copy of the list has; (c) §7.8's proxy thumbnails lack "drawn in a distinct preview style, never presented as the map", stated at §8.5. No value disagrees. | Add (a) and (b) at §6.1 and §7.3 item 2; for (c) add the clause or "(their drawing: §8.5)". |
| VDC-12 | minor | conflict | determinism | C-5 is applied by pointer, but §7.1 ("builds a `Bridge` where the drawn line crosses the channel's centreline, by §4.2 S1 (5)'s rule") and §7.4's "draw bridges" row keep the location claim that C-5 found stale: by §4.2 S1 (5) the deck is the unused site within `crossing.snapM` of that point, else a new deck there. | §7.1 and §7.4: "places its `Bridge` by §4.2 S1 (5)'s rule for a drawn bridge" (drop "where the drawn line crosses the channel's centreline"). |
| VDC-13 | minor | changed | determinism | F-SITING's test (S10b placement) now points to "§4.5 S7b (3)'s placement acceptance (O18 f)", which covers only institutions and parks larger than one block (S7b claims); the archived test was "100 % of institutions on a plot meeting their requirement". The canon merged two different tests (DETERMINISM-057 into PIPELINE-221). §15.2 O18 (f) still has "institutions placed 100 %". | F-SITING test: "O18 (f) (§15.2): 100 % of institutions on a plot meeting their requirement; §4.5 S7b (3) for claims larger than one block; the derived-complete digest across district orders (§6.5 (9))". |
| VDC-14 | minor | changed | determinism | §5.3 cost rule now reads "TOWN → METROPOLIS at M2b, which generates METROPOLIS from M1": it drops "which measures METROPOLIS" and reads as if M2b generates METROPOLIS (§16: METROPOLIS is generated from M1; M2b measures and tunes it). | "(… TOWN → METROPOLIS at M2b, which measures METROPOLIS — generated from M1 on, §16)". |
| VDC-15 | minor | broken-reference | determinism | F-SKELETON's test says "0 crashes on 1 000 holed polygons (§3.8)"; §3.8 no longer lists that run (the kernel rewrite moved it to §13.1's skeleton fixtures, KERNEL-363). | Point to §13.1 (the same cell already cites §13.1's ladder coverage, which states it). |
| VDC-16 | minor | broken-reference | determinism | §0.2's landing of owner rule 5 cites "§7.1 (the clause map, the edit-target table and its registry test)"; §7.1 no longer states the registry test (now §2.8 → §13.2, DETERMINISM-372). | §7.1 Edit targets: "…lifecycle row; its completeness test is §13.2's (§2.8)" (or scope amends §0.2 to cite §2.8). |
| VDC-17 | minor | new-problem | determinism | Residual double statements after the parallel R13 unions: the mapping calls these ids "referenced", but the §5.2 test cells still restate bars their homes now state — F-NUM (B-FUZZ 10⁶, 0 crashes / hangs / self-intersections / undeclared slivers = §13.1 + §13.8), F-OUTLINE (= §13.2's outline tests), F-BUDGET-STAGE (± 5 % on ≥ 95 %, walled share = §13.2, and §4.4 S5d points back to §5.2), F-SKELETON (ladder coverage, 1 000 holed = §13.1). Values agree. | Reduce each cell to its pointer and any bar only §5.2 holds ("0 mandatory chains rejected on B-CITY"), or record them as R9's §5.2-test-column exception. |

CONFIRMED (grep and diff on the files): VDC-1 … -6, -9, -10, -14 … -17. PLAUSIBLE (reading only): that VDC-7's check
belongs in item 7 (ii), that VDC-8, VDC-11 and VDC-12 matter to an implementer, and that VDC-13's narrower pointer loses
meaning (the aggregate O18 (f) survives in §15.2).

## 3. Open items VD5-1 … VD5-5 and routed items

| item | verdict | where the fix stands |
|---|---|---|
| VD5-1 | FIXED | §7.3 item 4 (compare only under the confirming version: `from` of the first live `upgrade` after the event, else the document's version; later versions apply recomputed values, listed once; the upgrade's undo compares again); §7.4 regenerate and upgrade rows; §7.5 bullet, `MigrationMap.changedConfirmations`, M3a test (both halves); §6.3 points. |
| VD5-2 | FIXED | §7.5 packs bullet (removal dropped; only "keep the old model"; frozen view whose `frozenImport` the cap refuses; CLI replays), F-EDIT detection and resolution, §7.5 test (> 2 MB copy gets the conflict, commits nothing); §2.9 step 2's "(the cap above applies)" agrees. |
| VD5-3 | FIXED | §6.3 case-(4) trigger list (frozenImport over every unedited generated name); §7.4 rebase row (returns `confirm`, renames stored by the table's case-(4) shorthand); §2.9 step 2 points to that row; §13.2 holds the frozen-fixture B-EDIT case. |
| VD5-4 | FIXED | §6.2 node rule (partition node, town node for ways, walls, water bodies, districts; a move between nodes re-hashes both); §5.3 CI row names both trees; §13.2 holds the `drawBoundary` save/reload fixture. |
| VD5-5 | FIXED | §2.8 route-independent record rule (model); §6.5 (9) replay = session and truncation identity compare records digests; §7.3 items 6 and 7 (i); §6.2 says which checks read which digest; §7.4 truncation test; §13.2 holds the epoch-grown Adjust fixture. |
| NP5-2 (routed) | FIXED | F-ROUTE `where`: S4; S5b at stages k ≥ 2 and every epoch (S4's router, §4.4); S4's local operator. §4.4 S5b points back. |
| NP5-3 (routed) | FIXED | (a) §7.6 canonical sentence "…, listed for confirmation (§6.3 case (4)), and never the row's other names"; (b) §7.4 warp paragraph names the stored composition. |
| VD5-6 (routed) | FIXED | §7.4 truncation and §7.6 point to §2.9's pack set and retention (which includes the redo-stack case). |

## 4. Conflicts and cross-part notes

**Canon conflicts routed to this part.** Applied: C-1, C-2 (J-DET-20 amended too), C-3, C-4, C-6, C-7, C-8, C-9, C-10,
KERNEL-C01, CF-PIPE-05, CF-PIPE-06, CF-PIPE-10, CANON-C06, CANON-C07, CANON-C10, MODEL-C05 (item 5 names the three
kinds), MODEL-C10 (§5.3 unit row points to §2.1), SCOPE-C03 (item 7 (iv) points to §13.2, no bound restated), CANON-C08
(§6.1 canonical). Incomplete: CF-PIPE-04 (home lacks the union detail → VDC-5), C-5 (location phrase → VDC-12),
MODEL-C09 (this part's "every load" → VDC-6). GAP-1 (no value for k in "no branch re-joins its parent within k
segments") is unchanged, as the canon rules; §4.4, which the row now cites, states no re-join rule — for the owner / Fable.

**Cross-part notes addressed to this part (every one checked).**

| note | verdict |
|---|---|
| kernel 8 — §6.5 (10) and DETERMINISM-303 point to §3.7 | reflected |
| kernel 8 — optional VK5-1 clause in §7.3's S6 row | moot, not raised: §3.3's "No item changes in place" list now names "an item whose partition changes" |
| kernel 12 — §5.4's engine comment stays valid | valid, not reflected → VDC-1 |
| model 8 — §7.3 item 7 (ii) covers §2.6 rule (1)'s faces and role rows | valid, not reflected → VDC-7 |
| model 9 — §7.4 rebase row states VD5-3; §6.3's dormant-record pointer | reflected |
| model 10 — §6.2 (iii) withholds a `verified` report | reflected ("nothing is reported verified") |
| model 11 — keep "§2.9 step 3" for the root of record in §7.5 (2), §5.3, §7.4 | reflected |
| model 12 — VD5-5 at §6.5 (9), §7.3 item 7 (i) | reflected |
| model 18 — cite §2 anchors as they now read | reflected (every §2.2 rule, §2.6 rule and §2.9 step pointer resolves) |
| pipeline D-1 — F-ROUTE adds S5b | reflected |
| pipeline D-2 — F-SITING "lowest-priority classes first" | valid, not reflected → VDC-5 |
| pipeline D-3 — F-CASTLE test keeps one statement | valid, not reflected → VDC-10 |
| pipeline D-4 — §7.3 item 1 keeps every seam-exception element | reflected (all six elements present) |
| pipeline D-5 — §7.2 keeps τ, DerivationRecord samples, replay τ, epochs as Δ | partly: τ, replay and epochs present; DerivationRecord → VDC-8 |
| pipeline D-6 — §7.7 keeps ≈ 200, "assignments and edits at 0…k", `entryMode` | ≈ 200 present; "and edits" → VDC-9; the `entryMode` part is judged unnecessary and not raised: its home is §2.9's `Recipe` (read by §4.7 S10b), and DETERMINISM-575's canonical fact does not contain it |
| pipeline D-7 — NP5-3 (b) and VD5-6 pointers | reflected |
| rendering — §6.1 `render.stampTiles` may add "…salt 0" | valid (R13), not reflected → VDC-11 (a) |
| rendering — §7.1 rotation sentence lives in §11.1 | reflected |
| rendering — §7.3 item 2 may add a replay kind | valid (R13), not reflected → VDC-11 (b) |
| rendering — §7.8 may add the preview-style clause "or keep pointing to §8.5" | valid, not reflected → VDC-11 (c); the premise is wrong: §7.8 never pointed to §8.5 |
| rendering — F-LABEL points to §9.4 | reflected |
| scope 4 — §6.4's "preview notice of §13.3" resolves | reflected (§13.3 states the notice) |
| scope 5 — §7.6 keeps stating calibratable rows | reflected |
| scope 1 / determinism 10 — fix-record tag style | not this part's issue: §5–§7 carry none (only NF-P5, NF-P6 and heading ids); document-level, listed for the validator in assemble-r0 §5 |

The determinism rewrite's own outgoing notes were checked where this part's pointers depend on them: 1 (§3.7) applied;
2 (§2.2 rule 7) applied; 3 (§13.2 fixtures) partly applied, the missing case being VDC-2; 4 (§2.8, §2.9) applied;
5 (§11.1) applied; 6 (§12.8) not applied → VDC-3; 7 (§4.5, §4.2 S1 (5), §4.4) applied; 8 (J rows, J-DET-53/54,
J-DET-20) applied; 9 (D-9 → §13.5) applied.

## 5. Mechanical checks (receipts)

* The assembled §5–§7 equal the rewrite's three section files byte for byte except one trailing blank line (`diff`: 2
  lines each).
* Mapping table: 601 of 601 inventory ids, 0 missing, 0 extra; the mapping kind agrees with the canon's role and action
  for every id (504 home → kept, 69 restatement → referenced, 26 rationale → J row, 2 move-in → moved) (script).
* 0 "PENDING FABLE REVIEW" lines, 0 deferral words (TBD, TODO, deferred, open question) and 0 round narration in §5–§7;
  every "later" is temporal (grep).
* 34 distinct J pointers in §5–§7: each has exactly one index row in the main document and one Part A row in
  `docs/ARCHITECTURE-RATIONALE.md` (script). Rationale F.4 holds every line of `rewrite-determinism-rationale.md` except
  its headings and preamble, and all 26 passages are verbatim from the archive (asterisk placement aside) (script).
* Identifiers: 541 identifiers of the archived §5–§7 (backticked and in code); 4 absent from the whole new document and
  the rationale file — `author: 'host'` (VDC-4), two receipt names present in §13.2 in path form, and `planned ∈ [0, 1]`
  (present, split across a line) — so one real loss (script, then read).
* Numbers: 223 numeric phrases; 5 absent everywhere — ≈ 30 000 and ≈ 15 000 (VDC-3), ≥ 99.5 % and ≥ 99.3 % (dropped
  by SCOPE-C03's ruling; §13.2 keeps the executed counts), "1 500–10 000 inhabitants" (format; §1.1 states it) (script).
* The concern registry's 72 names are identical and in the same order (script). Every sub-anchored pointer of the part
  (§2.2 rules 2–7, §2.6 rule 4, §2.9 steps 2–4, §3.2 (8), §3.3 rules 1–3, §3.6 (5), §4.2 S1 (2)/(3)/(5)/(7), §4.2 S3
  (6)/(7)/(9)/(11), §4.5 S7b (3)/(4), §4.6 (7), §4.11 (1), §8.1 items 4–5, §13.6 (2)) lands on an existing item (grep).
* Size (observation, not an issue): the part is 189 050 bytes, 84 % of 224 321, above the 55–65 % document target; the
  rewrite report states the reason (504 of 601 items are home statements).

## 6. Checked list — every inventory id

Verdict **OK** = the fact is stated with the same meaning at the mapped place; for a "referenced" id, the pointer is
present and the target section states the fact (checked); for a rationale id, the pointer is present and the passage
is in the rationale file under that J row. A VDC id = the issue in §2.

| id | disposition (rewrite mapping) | verdict | note |
|---|---|---|---|
| DETERMINISM-001 | §5.1 (1) — kept | OK | "IMPROVEMENTS J-K" is docs/IMPROVEMENTS.md J-K (checked); evidence pointers kept |
| DETERMINISM-002 | §5 (plain-words intro) — §5 plain-words intro (kept) | OK |  |
| DETERMINISM-003 | §5.1 (2) — kept | OK |  |
| DETERMINISM-004 | §5.1 (3) — kept | OK |  |
| DETERMINISM-005 | §5.1 (4) — kept | OK |  |
| DETERMINISM-006 | §5.1 (5) — kept | OK |  |
| DETERMINISM-007 | §5.1 (5) — kept | OK |  |
| DETERMINISM-008 | §5.1 (5) — kept | OK |  |
| DETERMINISM-009 | §5.1 (5) — kept | OK |  |
| DETERMINISM-010 | referenced to §1.1 (was at §5.1 (5)) | OK | pointer "(§1.1)"; §1.1 states TOWN [1 500, 10 000), METROPOLIS [30 000, 120 000] |
| DETERMINISM-011 | §5.1 (5) — kept | OK |  |
| DETERMINISM-012 | §5.1 (5) — kept | OK |  |
| DETERMINISM-013 | §5.1 (5) — kept | OK |  |
| DETERMINISM-014 | §5.1 (5) — kept | OK |  |
| DETERMINISM-015 | §5.1 (5) — kept | OK |  |
| DETERMINISM-016 | §5.1 (5) — kept | OK |  |
| DETERMINISM-017 | rationale → J-DET-3 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §5.1 (5) | OK | J-DET-3 index + Part A rows; passage verbatim in rationale F.4 R01 |
| DETERMINISM-018 | §5.1 (6) — kept | OK |  |
| DETERMINISM-019 | §5.1 (6) — kept | OK |  |
| DETERMINISM-020 | §5.1 (6) — C-2: canonical statement of the advance cap (`reroll.maxAdvance`, default 3) | OK | C-2 applied; J-DET-20 row amended |
| DETERMINISM-021 | §5.1 (6) — C-2 canonical value | OK | C-2 |
| DETERMINISM-022 | §5.1 (6) — kept | OK |  |
| DETERMINISM-023 | §5.1 (7) — CANON-C10: counting rule kept; acceptance bars by pointer to §13.5 | OK | CANON-C10: counting rule kept, bars by pointer; §13.5 row states tier-6 0, degraded ≤ 5 % |
| DETERMINISM-024 | §5.1 tier table — kept | OK |  |
| DETERMINISM-025 | §5.1 tier table — kept | OK |  |
| DETERMINISM-026 | §5.1 — kept | OK |  |
| DETERMINISM-027 | §5.2 preamble — preamble reworded to R4 (row owns detection, rung order, test; † names the computing section) | OK | preamble reworded to canon rule R4 (sanctioned) |
| DETERMINISM-028 | §5.2 F-NUM — kept | OK |  |
| DETERMINISM-029 | referenced to §3.6 (was at §5.2 F-NUM) | OK | §3.6 "Chain classes" states the mandatory list and the rule |
| DETERMINISM-030 | referenced to §13.1 (was at §5.2 F-NUM) | VDC-17 | pointer present, but the cell still restates the bar now also at §13.1 / §13.8 (values agree) |
| DETERMINISM-031 | §5.2 F-CUT — kept | OK |  |
| DETERMINISM-032 | §5.2 F-CUT — kept | OK |  |
| DETERMINISM-033 | §5.2 F-CUT — kept | OK |  |
| DETERMINISM-034 | §5.2 F-CORRIDOR — kept | OK |  |
| DETERMINISM-035 | §5.2 F-CORRIDOR — kept | OK |  |
| DETERMINISM-036 | §5.2 F-OUTLINE — kept | OK |  |
| DETERMINISM-037 | referenced to §13.2 (was at §5.2 F-OUTLINE) | VDC-17 | pointer present; cell restates §13.2 stage property test (values agree) |
| DETERMINISM-038 | §5.2 F-RIVER — kept | OK |  |
| DETERMINISM-039 | §5.2 F-RIVER — C-9: escalation by pointer to §7.3 S1 rows; moved-knot clause by pointer to §7.3 (b) 1 | OK | C-9 applied; moved-knot clause at F-EDIT and §7.3 (b) 1 |
| DETERMINISM-040 | §5.2 F-RIVER — kept | OK |  |
| DETERMINISM-041 | §5.2 F-CONTOUR — kept | OK |  |
| DETERMINISM-042 | §5.2 F-CONTOUR — kept | OK |  |
| DETERMINISM-043 | §5.2 F-SITE — kept | OK |  |
| DETERMINISM-044 | §5.2 F-SITE — kept | OK |  |
| DETERMINISM-045 | §5.2 F-ROUTE — NP5-2 / CF-PIPE-10: `where` adds S5b (stages k ≥ 2, epochs); in-operator siting by pointer to §4.2 S1 (5) | OK | NP5-2 / CF-PIPE-10 applied |
| DETERMINISM-046 | referenced to §4.2 S1 (5) (was at §5.2 F-ROUTE) | OK | §4.2 S1 (5) "A deck placed before its water exists" states it |
| DETERMINISM-047 | §5.2 F-ROUTE — kept | OK |  |
| DETERMINISM-048 | §5.2 F-BUDGET-STAGE — kept | OK |  |
| DETERMINISM-049 | referenced to §13.2 (was at §5.2 F-BUDGET-STAGE) | VDC-17 | pointer present; cell restates §13.2 sweep (and §4.4 S5d points back to §5.2) |
| DETERMINISM-050 | §5.2 F-WALL — kept | OK |  |
| DETERMINISM-051 | §5.2 F-WALL — kept | OK |  |
| DETERMINISM-052 | §5.2 F-CASTLE — kept | OK |  |
| DETERMINISM-053 | referenced to §4.8 castle (was at §5.2 F-CASTLE) | VDC-10 | duplicate of §4.8 acceptance (pipeline note D-3) |
| DETERMINISM-054 | §5.2 F-PLOT — kept | OK |  |
| DETERMINISM-055 | §5.2 F-PLOT — kept | OK |  |
| DETERMINISM-056 | §5.2 F-SITING — CF-PIPE-04: canonical, unchanged | VDC-5 | CF-PIPE-04 canonical but lacks "lowest-priority classes first" (pipeline note D-2) |
| DETERMINISM-057 | referenced to §4.5 S7b (3) (was at §5.2 F-SITING) | VDC-13 | points to §4.5 S7b (3), a narrower test (claims larger than one block) |
| DETERMINISM-058 | §5.2 F-SITEPLAN — kept | OK |  |
| DETERMINISM-059 | referenced to §15.2 (was at §5.2 F-SITEPLAN) | OK | §15.2 O17 (f) "footprints fit 100 %" |
| DETERMINISM-060 | §5.2 F-SKELETON — kept | OK |  |
| DETERMINISM-061 | referenced to §13.1 (was at §5.2 F-SKELETON) | VDC-15, VDC-17 | "(§3.8)" pointer broken; cell also restates §13.1 (values agree) |
| DETERMINISM-062 | referenced to §9.4 (was at §5.2 F-LABEL) | OK | §9.4 states the seven rungs; detection kept in §5.2 |
| DETERMINISM-063 | referenced to §9.4 (was at §5.2 F-LABEL) | OK | CANON-C06; §9.4 acceptance, 5 % inference dropped there |
| DETERMINISM-064 | §5.2 F-WORK — kept | OK |  |
| DETERMINISM-065 | §5.2 F-WORK — kept | OK | shim × 10 / × 0.1 stated at §6.5 (9) |
| DETERMINISM-066 | §5.2 F-BUDGET-TIME — kept | OK |  |
| DETERMINISM-067 | §5.2 F-BUDGET-TIME — kept | OK |  |
| DETERMINISM-068 | §5.2 F-EDIT — C-6 / VD5-2: detection adds the upgrade pack-copy cap case (§7.5); moved course knot by pointer | OK | C-6 / VD5-2 applied |
| DETERMINISM-069 | §5.2 F-EDIT — C-7 / VD5-2: precedence by pointer to §7.7; resolution adds "the pack and its size with keep the old model" | OK | C-7 / VD5-2 applied |
| DETERMINISM-070 | §5.2 F-EDIT — kept | OK |  |
| DETERMINISM-071 | referenced to §2.9 pack set bullet (was at §5.2 F-EDIT) | OK | §2.9 pack set bullet states the 2 MB cap |
| DETERMINISM-072 | §5.2 F-REDERIVE — kept | OK |  |
| DETERMINISM-073 | §5.2 F-REDERIVE — kept | OK |  |
| DETERMINISM-074 | §5.2 F-REDERIVE — C-3: kept-way re-route by pointer to §7.3 (b) 2; kept-way definition and cut rule stated here | OK | C-3 applied |
| DETERMINISM-075 | §5.2 F-REDERIVE — C-3: detour bound defined here; §7.3 (b) 2 points to it | OK | C-3: detour bound defined here |
| DETERMINISM-076 | §5.2 F-REDERIVE — kept | OK |  |
| DETERMINISM-077 | §5.2 F-REDERIVE — kept | OK |  |
| DETERMINISM-078 | §5.2 F-REDERIVE — kept | OK |  |
| DETERMINISM-079 | referenced to §7.3 (7) (v) (was at §5.2 F-REDERIVE) | OK | §7.3 item 7 (v) carries the union of the test details |
| DETERMINISM-080 | referenced to §2.6 Heights and ground datum (was at §5.2 F-REDERIVE) | OK | §2.6 datum rule (`max(samples) + plinthCm`); (v) cites it |
| DETERMINISM-081 | §5.3 — kept | OK |  |
| DETERMINISM-082 | §5.3 — kept | OK |  |
| DETERMINISM-083 | §5.3 — kept | OK |  |
| DETERMINISM-084 | referenced to §3.10 (was at §5.3 row 1) | OK | row points to §3.10 (kernel home) |
| DETERMINISM-085 | §5.3 — kept | OK |  |
| DETERMINISM-086 | §5.3 — kept | OK |  |
| DETERMINISM-087 | §5.3 — kept | OK |  |
| DETERMINISM-088 | §5.3 — kept | OK |  |
| DETERMINISM-089 | §5.3 — kept | OK |  |
| DETERMINISM-090 | §5.3 — kept | OK |  |
| DETERMINISM-091 | §5.3 — kept | OK |  |
| DETERMINISM-092 | §5.3 — kept | OK |  |
| DETERMINISM-093 | §5.3 — kept (NF-P5 row) | OK |  |
| DETERMINISM-094 | §5.3 — kept | OK |  |
| DETERMINISM-095 | §5.3 — kept | OK |  |
| DETERMINISM-096 | §5.3 — kept | OK |  |
| DETERMINISM-097 | §5.3 — kept | OK |  |
| DETERMINISM-098 | referenced to §2.6 wing rule 4 (was at §5.3) | OK | §2.6 rule 4 states the check and tiers |
| DETERMINISM-099 | §5.3 — kept | OK |  |
| DETERMINISM-100 | §5.3 — kept | OK |  |
| DETERMINISM-101 | §5.3 — kept | OK |  |
| DETERMINISM-102 | §5.3 — kept | OK |  |
| DETERMINISM-103 | §5.3 — kept | OK |  |
| DETERMINISM-104 | referenced to §2.1 Units (was at §5.3) | OK | §2.1 Units (MODEL-C10 wording) |
| DETERMINISM-105 | referenced to §3.10 (was at §5.3) | OK | §3.10 reverse-index row |
| DETERMINISM-106 | §5.3 — kept | OK |  |
| DETERMINISM-107 | referenced to §4.2 S3 (9) (was at §5.3) | OK | §4.2 S3 (9) states ≤ 40 m and the on_enceinte exception |
| DETERMINISM-108 | referenced to §4.6 (7) (was at §5.3) | OK | §4.6 (7) "Seam portals" states the portal gap |
| DETERMINISM-109 | §5.3 — kept | OK |  |
| DETERMINISM-110 | §5.3 — kept | OK | GAP-1 (k has no value) unchanged, as the canon rules; for the owner / Fable |
| DETERMINISM-111 | §5.3 — kept | OK |  |
| DETERMINISM-112 | §5.3 — kept | OK |  |
| DETERMINISM-113 | §5.3 — kept | OK | §9.6 pointer resolves (uniqueness) |
| DETERMINISM-114 | §5.3 — kept | OK |  |
| DETERMINISM-115 | §5.3 — kept | OK |  |
| DETERMINISM-116 | §5.3 — kept; salts rule by pointer to §6.1 | OK | salts rule by pointer to §6.1 |
| DETERMINISM-117 | referenced to §2.9 load step 3 (was at §5.3) | OK | §2.9 step 3 "Decode and check", "A rebased base" state it |
| DETERMINISM-118 | referenced to §2.9 load step 3 (was at §5.3) | OK | §2.9 step 3 "Records mismatch" states it |
| DETERMINISM-119 | §5.3 — VD5-4: row now names the records tree | OK | VD5-4: row names both trees |
| DETERMINISM-120 | §5.3 — kept; points to §6.5 (9), §7.3 item 7 | OK |  |
| DETERMINISM-121 | §5.3 — kept; F-LABEL test by pointer to §9.4 | OK |  |
| DETERMINISM-122 | §5.3 — kept | OK |  |
| DETERMINISM-123 | §5.3 — kept | OK |  |
| DETERMINISM-124 | §5.3 — kept | VDC-14 | M2b clause garbled |
| DETERMINISM-125 | §5.3 — kept | OK |  |
| DETERMINISM-126 | rationale → J-DET-39 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §5.3 | OK | J-DET-39 rows; passage in F.4 R02 |
| DETERMINISM-127 | §5.4 — kept; engine and warning codes by pointer (§3.7, §3.1) | VDC-1 | engine comment lost the id `plat-arrangement@<version>` |
| DETERMINISM-128 | referenced to §3.1 (was at §5.4) | VDC-1 | warning codes stated at §3.1 (OK); engine id stated nowhere now |
| DETERMINISM-129 | §5.4 — kept | OK |  |
| DETERMINISM-130 | §5.4 — kept | OK |  |
| DETERMINISM-131 | §5.4 — kept | OK |  |
| DETERMINISM-132 | §5.4 — kept | OK |  |
| DETERMINISM-133 | §5.4 — kept | OK |  |
| DETERMINISM-134 | §6 (plain-words intro) — kept | OK |  |
| DETERMINISM-135 | §6.1 — kept | OK |  |
| DETERMINISM-136 | §6.1 — kept | OK |  |
| DETERMINISM-137 | §6.1 — kept | OK |  |
| DETERMINISM-138 | §6.1 — C-1: entity key = seed key + lineage hash (§6.3) + arena key (layer and part, §2.2) | OK | C-1 applied; §2.2 PlatKey = layer and part |
| DETERMINISM-139 | §6.1 — kept | OK |  |
| DETERMINISM-140 | §6.1 — kept | OK |  |
| DETERMINISM-141 | §6.1 — kept | OK |  |
| DETERMINISM-142 | §6.1 — kept | OK |  |
| DETERMINISM-143 | §6.1 — kept | OK |  |
| DETERMINISM-144 | §6.1 — kept | OK |  |
| DETERMINISM-145 | §6.1 — C-1: lineage component points to §6.3's lineage key | OK | C-1 applied |
| DETERMINISM-146 | §6.1 — kept | OK |  |
| DETERMINISM-147 | §6.1 — kept | OK |  |
| DETERMINISM-148 | §6.1 — kept | OK |  |
| DETERMINISM-149 | §6.1 — kept | OK |  |
| DETERMINISM-150 | §6.1 — kept | OK |  |
| DETERMINISM-151 | §6.1 — C-10: rerollable = exactly the six listed; naming.quarter and style.random registered non-rerollable | OK | C-10 applied |
| DETERMINISM-152 | §6.1 — kept | OK |  |
| DETERMINISM-153 | §6.1 — kept | OK |  |
| DETERMINISM-154 | §6.1 — kept | OK |  |
| DETERMINISM-155 | §6.1 — C-10 (registry marks rerollable; generated type; CI reader test) | OK | C-10 applied |
| DETERMINISM-156 | §6.1 — kept | OK |  |
| DETERMINISM-157 | §6.1 — kept | OK |  |
| DETERMINISM-158 | §6.1 — kept | OK |  |
| DETERMINISM-159 | §6.1 — C-10 (registry list unchanged) | OK | C-10; 72 backticked names identical and in the same order (script) |
| DETERMINISM-160 | §6.1 — kept | OK |  |
| DETERMINISM-161 | §6.1 — kept | VDC-11 | rendering note (a): "reroll, attempt, epoch and salt 0" only at §8.10 |
| DETERMINISM-162 | §6.1 — kept | OK |  |
| DETERMINISM-163 | §6.1 — kept | OK |  |
| DETERMINISM-164 | §6.1 — kept | OK |  |
| DETERMINISM-165 | §6.1 — kept (+ "words 0 and 1", union from RENDERING-033) | OK | union "words 0 and 1" |
| DETERMINISM-166 | referenced to §8.10 (was at §6.1) | OK | §8.10 states tiles, hash check, render.instances placement, band subsets |
| DETERMINISM-167 | §6.1 — kept | OK |  |
| DETERMINISM-168 | §6.1 — kept; rationale → J-DET-53 | OK |  |
| DETERMINISM-169 | rationale → J-DET-53 (new row, canon) in docs/ARCHITECTURE-RATIONALE.md; "(J-DET-53)" left at §6.1 Enter | OK | J-DET-53 new row; passage in F.4 R03 |
| DETERMINISM-170 | §6.1 — kept | OK |  |
| DETERMINISM-171 | §6.2 — kept | OK |  |
| DETERMINISM-172 | referenced to §2.9 Recipe (was at §6.2) | OK | §2.9 `Recipe` lists every field |
| DETERMINISM-173 | §6.2 — kept | OK |  |
| DETERMINISM-174 | §6.2 — kept; laziness contract, pack resolution by pointer (§4.1, §2.9) | OK |  |
| DETERMINISM-175 | referenced to §4.1 (was at §6.2) | OK | §4.1 laziness contract |
| DETERMINISM-176 | referenced to §2.9 pack set bullet (was at §6.2) | OK | §2.9 load resolution by hash |
| DETERMINISM-177 | §6.2 — kept | OK |  |
| DETERMINISM-178 | §6.2 — kept; derived-complete test by pointer to §6.5 (9) | OK |  |
| DETERMINISM-179 | referenced to §6.5 (9) (was at §6.2) | OK | §6.5 (9) derived-complete digest (pool sizes 0–3 = workers on and off) |
| DETERMINISM-180 | §6.2 — kept | OK |  |
| DETERMINISM-181 | §6.2 — kept | OK |  |
| DETERMINISM-182 | §6.2 — kept | OK |  |
| DETERMINISM-183 | §6.2 — kept | OK |  |
| DETERMINISM-184 | §6.2 — kept | OK |  |
| DETERMINISM-185 | §6.2 — kept | OK |  |
| DETERMINISM-186 | §6.2 — kept | OK |  |
| DETERMINISM-187 | §6.2 — kept | OK |  |
| DETERMINISM-188 | §6.2 — kept | OK |  |
| DETERMINISM-189 | §6.2 — kept | OK |  |
| DETERMINISM-190 | referenced to §12.8 (was at §6.2) | VDC-3 | breakdown (≈ 30 000 leaves, ≈ 15 000 ring hashes, 16 B) stated nowhere |
| DETERMINISM-191 | §6.2 — kept | OK |  |
| DETERMINISM-192 | §6.2 — VD5-4: node keying rule (partition node, one town node) | OK | VD5-4 applied |
| DETERMINISM-193 | referenced to §12.8 (was at §6.2) | OK | §12.8 states ≈ 0.25 MB |
| DETERMINISM-194 | §6.2 — kept | OK |  |
| DETERMINISM-195 | §6.2 — VD5-4: moves between nodes re-hash both nodes | VDC-6 | VD5-4 applied; "recomputed by every load" contradicts §2.9 (in-window only) |
| DETERMINISM-196 | §6.2 — kept | OK |  |
| DETERMINISM-197 | §6.2 — VD5-5: replay = session and truncation identity also compare the records digest | OK | VD5-5 applied |
| DETERMINISM-198 | rationale → J-DET-49 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.2 | OK | J-DET-49; F.4 R04 |
| DETERMINISM-199 | §6.2 — kept | VDC-6 | "by every load (§2.9 step 3)" — §2.8/§2.9 say every in-window load |
| DETERMINISM-200 | §6.2 — kept | OK |  |
| DETERMINISM-201 | §6.2 — kept | OK |  |
| DETERMINISM-202 | §6.2 (i) — kept | OK |  |
| DETERMINISM-203 | §6.2 (ii) — kept | OK |  |
| DETERMINISM-204 | §6.2 (iii) — kept | OK |  |
| DETERMINISM-205 | §6.2 (iii) — kept | OK | "chunked per district" now stated at §7.4 Checkpoints |
| DETERMINISM-206 | §6.2 (iii) — kept | OK | also covers model note 10 ("nothing is reported verified") |
| DETERMINISM-207 | rationale → J-DET-40 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.2 (iii) | OK | J-DET-40 (+J-DET-45); F.4 R05–R06 |
| DETERMINISM-208 | §6.2 (iii) — kept | OK |  |
| DETERMINISM-209 | §6.3 — kept | OK |  |
| DETERMINISM-210 | §6.3 — C-1 canonical lineage key | OK | C-1 canonical |
| DETERMINISM-211 | §6.3 — kept | OK |  |
| DETERMINISM-212 | §6.3 — kept | OK |  |
| DETERMINISM-213 | §6.3 — kept | OK |  |
| DETERMINISM-214 | rationale → J-DET-1 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.3 | OK | J-DET-1; F.4 R07 |
| DETERMINISM-215 | §6.3 — kept | OK |  |
| DETERMINISM-216 | §6.3 — kept | OK |  |
| DETERMINISM-217 | §6.3 — kept | OK |  |
| DETERMINISM-218 | §6.3 — kept | OK |  |
| DETERMINISM-219 | §6.3 — kept | OK |  |
| DETERMINISM-220 | §6.3 — kept | OK |  |
| DETERMINISM-221 | §6.3 — kept | OK |  |
| DETERMINISM-222 | rationale → J-DET-2 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.3 | OK | J-DET-2; F.4 R08 |
| DETERMINISM-223 | §6.3 — kept | OK |  |
| DETERMINISM-224 | §6.3 — CF-PIPE-05 canonical (four draw cases) | OK | CF-PIPE-05 canonical |
| DETERMINISM-225 | §6.3 — VD5-3: trigger list adds the frozenImport rebase (every unedited generated name) | OK | VD5-3 applied (frozenImport in the trigger list) |
| DETERMINISM-226 | §6.3 — kept | OK | slice definition stated at §2.8 NamingRecord and §7.6 |
| DETERMINISM-227 | §6.3 — kept | OK |  |
| DETERMINISM-228 | §6.3 — kept | OK |  |
| DETERMINISM-229 | §6.3 — kept | OK |  |
| DETERMINISM-230 | §6.3 — kept; VD5-1 comparison rule by pointer to §7.3 item 4; frozenImport returns confirm | OK | VD5-1 by pointer to §7.3 item 4; frozenImport returns confirm |
| DETERMINISM-231 | §6.3 — kept | OK |  |
| DETERMINISM-232 | §6.3 — kept | OK |  |
| DETERMINISM-233 | rationale → J-DET-37 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.3 | OK | J-DET-37 (+J-DET-41); F.4 R09 |
| DETERMINISM-234 | §6.3 — kept | OK |  |
| DETERMINISM-235 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-236 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-237 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-238 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-239 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-240 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-241 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-242 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-243 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-244 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-245 | §6.3 anchor table — kept | OK |  |
| DETERMINISM-246 | referenced to §3.6 (was at §6.3) | OK | §3.6 (5): children returned left of the directed cut first |
| DETERMINISM-247 | §6.3 — kept | OK |  |
| DETERMINISM-248 | §6.3 — kept | OK |  |
| DETERMINISM-249 | §6.3 — kept | OK |  |
| DETERMINISM-250 | §6.3 — kept | OK |  |
| DETERMINISM-251 | §6.3 — kept | OK |  |
| DETERMINISM-252 | §6.3 — kept | OK |  |
| DETERMINISM-253 | §6.3 — kept | OK |  |
| DETERMINISM-254 | §6.3 — kept | OK |  |
| DETERMINISM-255 | §6.3 — kept | OK |  |
| DETERMINISM-256 | §6.3 — kept | OK |  |
| DETERMINISM-257 | §6.3 scope of stability — kept | OK |  |
| DETERMINISM-258 | §6.3 — kept; naming-input fixtures by pointer to §13.2 | OK |  |
| DETERMINISM-259 | referenced to §13.2 (was at §6.3) | VDC-2 | §13.2 lacks the lock→unlock / setAttr→undo case-(4) fixture |
| DETERMINISM-260 | §6.4 — kept | OK |  |
| DETERMINISM-261 | §6.4 — kept | OK |  |
| DETERMINISM-262 | §6.4 — kept | OK |  |
| DETERMINISM-263 | §6.4 — kept | OK |  |
| DETERMINISM-264 | §6.4 — kept | OK |  |
| DETERMINISM-265 | §6.4 — kept | OK |  |
| DETERMINISM-266 | §6.4 — kept | OK |  |
| DETERMINISM-267 | §6.4 — kept | OK |  |
| DETERMINISM-268 | §6.4 — kept; pack set by pointer to §2.9 | OK | pack set by pointer to §2.9 (§2.9 defines it) |
| DETERMINISM-269 | §6.4 — kept | OK |  |
| DETERMINISM-270 | §6.4 — kept | OK |  |
| DETERMINISM-271 | rationale → J-DET-50 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.4 | OK | J-DET-50 (+17, 35); F.4 R10 |
| DETERMINISM-272 | §6.4 — kept | OK |  |
| DETERMINISM-273 | §6.4 — kept | OK |  |
| DETERMINISM-274 | §6.4 — kept | OK |  |
| DETERMINISM-275 | §6.4 — kept | OK |  |
| DETERMINISM-276 | §6.4 — kept | OK |  |
| DETERMINISM-277 | §6.4 — kept; shift/cascade records by pointer to §13.3 | OK | record contents by pointer to §13.3 |
| DETERMINISM-278 | referenced to §13.3 (was at §6.4) | OK | §13.3 states shift and cascade records |
| DETERMINISM-279 | referenced to §3.2 (3) (was at §6.5 (1)) | OK | restated minimally with pointer to §3.2 |
| DETERMINISM-280 | §6.5 (2) — kept | OK |  |
| DETERMINISM-281 | §6.5 (3) — kept | OK |  |
| DETERMINISM-282 | §6.5 (3) — kept | OK |  |
| DETERMINISM-283 | §6.5 (3) — kept | OK |  |
| DETERMINISM-284 | §6.5 (3) — kept; ratio() rule by pointer to §3.2 (8) | OK |  |
| DETERMINISM-285 | referenced to §3.2 (8) (was at §6.5 (3)) | OK | §3.2 (8) "Checked ratios" |
| DETERMINISM-286 | §6.5 (4) — kept | OK |  |
| DETERMINISM-287 | §6.5 (5) — kept | OK |  |
| DETERMINISM-288 | referenced to §3.3 step 2 (was at §6.5 (6)) | OK | §3.3 pool steps 2 and 4 |
| DETERMINISM-289 | §6.5 (7) — kept (KERNEL-C01: fallback engine by pointer to §3.7) | OK | KERNEL-C01: §3.7 points to §6.5 (7) for an engine change |
| DETERMINISM-290 | §6.5 (8) — kept | OK |  |
| DETERMINISM-291 | §6.5 (9) — kept | OK |  |
| DETERMINISM-292 | §6.5 (9) — kept | OK |  |
| DETERMINISM-293 | §6.5 (9) — kept | OK |  |
| DETERMINISM-294 | referenced to §13.2 (MOVE OUT; §6.5 (9) names op-order determinism by pointer) | OK | §13.2 states op-order determinism |
| DETERMINISM-295 | referenced to §13.3 (was at §6.5 (9)) | OK | §13.3 placement digests |
| DETERMINISM-296 | §6.5 (9) — kept | OK |  |
| DETERMINISM-297 | §6.5 (9) — VD5-5: requires equal records digests too | OK | VD5-5 applied |
| DETERMINISM-298 | §6.5 (9) — VD5-5: requires equal records digests too | VDC-2 | VD5-5 applied; lock + unlock case and the case-(4) clause (SCOPE-208 detail gap) missing |
| DETERMINISM-299 | §6.5 (9) — kept | OK |  |
| DETERMINISM-300 | §6.5 (9) — kept | OK |  |
| DETERMINISM-301 | §6.5 (9) — kept | OK |  |
| DETERMINISM-302 | §6.5 (10) — kept; Clipper2 half by pointer to §3.7 (KERNEL-C01) | OK | KERNEL-C01 applied |
| DETERMINISM-303 | referenced to §3.7 (was at §6.5 (10)) | OK | §3.7 states the fallback and its shift-record stage list |
| DETERMINISM-304 | rationale → J-DET-28 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.5 (10) | OK | J-DET-28; F.4 R11 |
| DETERMINISM-305 | §7 (plain-words intro) — §7 plain-words intro (kept) | OK |  |
| DETERMINISM-306 | §7.1 — kept (comments shortened) | OK |  |
| DETERMINISM-307 | §7.1 — the event list by reference to §6.3 case (4) triggers (EditBase.renames comment) | OK | event list by reference to §6.3 case (4) |
| DETERMINISM-308 | §7.1 — kept | OK |  |
| DETERMINISM-309 | §7.1 — kept | OK |  |
| DETERMINISM-310 | §7.1 — kept | OK |  |
| DETERMINISM-311 | §7.1 — kept | OK |  |
| DETERMINISM-312 | §7.1 — kept | OK |  |
| DETERMINISM-313 | §7.1 — kept | OK |  |
| DETERMINISM-314 | §7.1 — kept | OK |  |
| DETERMINISM-315 | §7.1 — kept | OK |  |
| DETERMINISM-316 | §7.1 — kept | OK |  |
| DETERMINISM-317 | §7.1 — kept | OK |  |
| DETERMINISM-318 | §7.1 — kept | OK |  |
| DETERMINISM-319 | §7.1 — kept | OK |  |
| DETERMINISM-320 | §7.1 — kept | OK |  |
| DETERMINISM-321 | §7.1 — kept | OK |  |
| DETERMINISM-322 | §7.1 — kept | OK |  |
| DETERMINISM-323 | §7.1 — kept | OK |  |
| DETERMINISM-324 | §7.1 — kept | OK |  |
| DETERMINISM-325 | §7.1 — kept | OK |  |
| DETERMINISM-326 | §7.1 — kept | OK |  |
| DETERMINISM-327 | §7.1 — kept | OK |  |
| DETERMINISM-328 | §7.1 — kept | OK |  |
| DETERMINISM-329 | §7.1 — kept | OK |  |
| DETERMINISM-330 | §7.1 — kept | OK |  |
| DETERMINISM-331 | §7.1 — kept | OK |  |
| DETERMINISM-332 | referenced to §4.11 (was at §7.1) | OK | §4.11 `ConversionOp` holds all ten kinds (and more) |
| DETERMINISM-333 | §7.1 — kept | OK |  |
| DETERMINISM-334 | §7.1 — kept | OK |  |
| DETERMINISM-335 | §7.1 — kept | OK |  |
| DETERMINISM-336 | §7.1 — kept | OK |  |
| DETERMINISM-337 | §7.1 — kept | OK |  |
| DETERMINISM-338 | §7.1 — kept | OK |  |
| DETERMINISM-339 | §7.1 — kept | OK |  |
| DETERMINISM-340 | §7.1 — kept | OK |  |
| DETERMINISM-341 | §7.1 — kept | OK |  |
| DETERMINISM-342 | §7.1 named actions — kept | OK |  |
| DETERMINISM-343 | §7.1 named actions — kept | OK |  |
| DETERMINISM-344 | §7.1 named actions — C-2: points to §5.1 (6) | OK | C-2 applied |
| DETERMINISM-345 | §7.1 named actions — canonical list of early-consumed parameters (also the no-local-operator list of §7.3 item 3) | OK | canonical early-parameter list |
| DETERMINISM-346 | §7.1 named actions — kept | OK |  |
| DETERMINISM-347 | §7.1 named actions — kept | OK |  |
| DETERMINISM-348 | §7.1 warp — kept | OK |  |
| DETERMINISM-349 | §7.1 warp — kept | OK |  |
| DETERMINISM-350 | referenced to §3.6 (was at §7.1 warp) | OK | §3.6 "Whole-step validation" (≤ 8 halvings) |
| DETERMINISM-351 | §7.1 warp — kept (points to §7.4 warp paragraph) | OK | record list stated in §7.4 warp paragraph |
| DETERMINISM-352 | §7.1 warp — kept | OK |  |
| DETERMINISM-353 | §7.1 warp table — kept | OK |  |
| DETERMINISM-354 | §7.1 warp table — kept; export clause → §11.1 | OK |  |
| DETERMINISM-355 | referenced to §9.5 (was at §7.1 warp table) | OK | §9.5 measure tool |
| DETERMINISM-356 | rationale → J-DET-15 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.1 | OK | J-DET-15; F.4 R12 |
| DETERMINISM-357 | moved out → §11.1 (rendering states it; §7.1 Rotate row points there) | OK | moved out; §11.1 "Rotation" states it |
| DETERMINISM-358 | §7.1 drawing — kept | OK |  |
| DETERMINISM-359 | §7.1 drawing — kept | OK |  |
| DETERMINISM-360 | §7.1 drawing — kept | OK |  |
| DETERMINISM-361 | rationale → J-DET-14 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.1 drawing | OK | J-DET-14; F.4 R13 |
| DETERMINISM-362 | §7.1 drawing — C-5: by pointer to §4.2 S1 (5) | VDC-12 | C-5 pointer present; location phrase kept |
| DETERMINISM-363 | §7.1 building editing — kept | OK |  |
| DETERMINISM-364 | §7.1 building editing — kept | OK |  |
| DETERMINISM-365 | §7.1 building editing — kept | OK |  |
| DETERMINISM-366 | §7.1 brushes — kept | OK |  |
| DETERMINISM-367 | §7.1 brushes — kept | OK |  |
| DETERMINISM-368 | §7.1 brushes — kept | OK |  |
| DETERMINISM-369 | §7.1 people — kept | OK |  |
| DETERMINISM-370 | §7.1 people — kept | OK |  |
| DETERMINISM-371 | §7.1 edit targets — kept | OK |  |
| DETERMINISM-372 | referenced to §2.8 entity registry (was at §7.1 edit targets) | VDC-16 | registry test now §2.8 → §13.2; §0.2 still cites it at §7.1 |
| DETERMINISM-373 | §7.1 edit targets — kept | OK |  |
| DETERMINISM-374 | referenced to §2.9 View state (was at §7.1 edit targets) | OK | §2.9 View state |
| DETERMINISM-375 | §7.1 dry run — kept | OK |  |
| DETERMINISM-376 | §7.1 dry run — kept; action list by pointer to §5.2 F-EDIT | OK | action list by pointer to F-EDIT |
| DETERMINISM-377 | §7.1 dry run — kept | OK |  |
| DETERMINISM-378 | referenced to §11.3 (was at §7.1 dry run) | VDC-4 | §11.3 Logging lacks "author 'host'" |
| DETERMINISM-379 | §7.2 — kept | OK |  |
| DETERMINISM-380 | §7.2 — kept | OK |  |
| DETERMINISM-381 | referenced to §3.6 (was at §7.2) | OK | §3.6 held set (closed over coarser Steiner endpoints) |
| DETERMINISM-382 | §7.2 — C-7: points to §7.7 | OK | C-7 applied |
| DETERMINISM-383 | §7.2 drawn constraints — kept | OK |  |
| DETERMINISM-384 | §7.2 drawn constraints — kept | OK |  |
| DETERMINISM-385 | §7.2 drawn constraints — kept | OK |  |
| DETERMINISM-386 | §7.2 drawn constraints — kept | OK |  |
| DETERMINISM-387 | rationale → J-DET-6 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.2 | OK | J-DET-6; F.4 R14 |
| DETERMINISM-388 | §7.2 field brushes — kept, τ = 0.01 stated here (detail from DETERMINISM-389, PIPELINE-211) | VDC-8 | τ stated; DerivationRecord baseline missing (pipeline note D-5) |
| DETERMINISM-389 | referenced to §7.2 field brushes (was at §7.2 field brushes) | OK | within-part: τ at §7.2 |
| DETERMINISM-390 | referenced to §4.5 (was at §7.2 field brushes) | OK | §4.5 Bands states it |
| DETERMINISM-391 | §7.2 terrain brush — kept | OK |  |
| DETERMINISM-392 | §7.2 terrain brush — kept; sea floor by pointer to §4.2 S1 (2) | OK |  |
| DETERMINISM-393 | referenced to §4.2 S1 (2) (was at §7.2 terrain brush) | OK | §4.2 S1 (2) two cells, sea level + 10 cm |
| DETERMINISM-394 | §7.2 terrain brush — kept | OK |  |
| DETERMINISM-395 | §7.2 terrain brush — kept | OK |  |
| DETERMINISM-396 | rationale → J-DET-24 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.2 | OK | J-DET-24; F.4 R15 |
| DETERMINISM-397 | §7.3 (1) — kept (merged with DETERMINISM-594) | OK |  |
| DETERMINISM-398 | §7.3 (1) — kept | OK | every element of pipeline note D-4 present |
| DETERMINISM-399 | §7.3 (2) — kept; rederivesFrom by pointer to §3.3 | OK |  |
| DETERMINISM-400 | referenced to §3.10 (was at §7.3 (2)) | OK | §3.3 KernelTx.rederivesFrom and kept-content rules; §3.10 row |
| DETERMINISM-401 | referenced to §4.7 S10 (0) (was at §7.3 (2)) | OK | §4.7 S10 step (0) |
| DETERMINISM-402 | §7.3 (2) — kept; step (0) itself by pointer to §4.7 | OK |  |
| DETERMINISM-403 | §7.3 (2) — kept | OK |  |
| DETERMINISM-404 | rationale → J-DET-29 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.3 (2) | OK | J-DET-29; F.4 R16 |
| DETERMINISM-405 | §7.3 (2) — by pointer to §6.3 draw cases | OK | by pointer to §6.3 |
| DETERMINISM-406 | referenced to §8.1 (4) §8.1 item 4 (was at §7.3 (2)) | OK | §8.1 item 4 |
| DETERMINISM-407 | §7.3 (2) — kept (+ J-DET-21) | VDC-11 | rendering note (c): §12.6 lists one more replay kind |
| DETERMINISM-408 | §7.3 (3) — kept | OK |  |
| DETERMINISM-409 | §7.3 (3) — kept | OK |  |
| DETERMINISM-410 | §7.3 operator table — C-9: both escalation triggers stated | OK | C-9 applied |
| DETERMINISM-411 | §7.3 operator table — C-9: both escalation triggers stated | OK | C-9 applied |
| DETERMINISM-412 | §7.3 operator table — C-8: gate-count change re-derives from S3 (stage 1) or S5 of its stage (later enceinte) | OK | C-8 applied |
| DETERMINISM-413 | §7.3 operator table — kept | OK |  |
| DETERMINISM-414 | §7.3 operator table — kept | OK | kernel note 8 optional VK5-1 clause moot: §3.3 states it |
| DETERMINISM-415 | §7.3 operator table — C-8: "or the gate count" removed (stale); keeps "when the enceinte kind changes" | OK | C-8 applied |
| DETERMINISM-416 | §7.3 operator table — kept; carve footprint by pointer to §4.11 with its composition | OK |  |
| DETERMINISM-417 | §7.3 operator table — kept | OK |  |
| DETERMINISM-418 | §7.3 (a) 1 — kept | OK |  |
| DETERMINISM-419 | §7.3 (a) 2 — kept | OK |  |
| DETERMINISM-420 | §7.3 (a) 2 — kept | OK |  |
| DETERMINISM-421 | §7.3 (a) 2 — kept | OK |  |
| DETERMINISM-422 | §7.3 (a) 3 — kept | OK |  |
| DETERMINISM-423 | §7.3 (a) 4 — kept | OK |  |
| DETERMINISM-424 | rationale → J-DET-24 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.3 (a) 4 | OK | J-DET-24; F.4 R17 |
| DETERMINISM-425 | §7.3 (a) 5 — kept | OK |  |
| DETERMINISM-426 | §7.3 (a) 6 — kept | OK |  |
| DETERMINISM-427 | §7.3 (b) — kept; clearing rules by pointer to §3.3 | OK |  |
| DETERMINISM-428 | §7.3 (b) 1 — kept | OK |  |
| DETERMINISM-429 | §7.3 (b) 1 — kept | OK |  |
| DETERMINISM-430 | §7.3 (b) 1 — kept | OK |  |
| DETERMINISM-431 | §7.3 (b) 1 — kept | OK |  |
| DETERMINISM-432 | §7.3 (b) 2 — kept | OK |  |
| DETERMINISM-433 | §7.3 (b) 2 — C-3 canonical deck choice; detour bound by pointer to §5.2 F-REDERIVE; kept-way definition by pointer to F-REDERIVE | OK | C-3 canonical |
| DETERMINISM-434 | §7.3 (b) 2 — kept | OK |  |
| DETERMINISM-435 | §7.3 (b) 2 — kept | OK |  |
| DETERMINISM-436 | §7.3 (b) 2 — kept | OK |  |
| DETERMINISM-437 | §7.3 (b) 3 — kept; clear-region semantics by pointer to §3.3 rule 1 | OK |  |
| DETERMINISM-438 | §7.3 (b) 3 — kept | OK |  |
| DETERMINISM-439 | §7.3 (b) 3 — cut mechanics by pointer to F-REDERIVE's way rung (§5.2); rekey clause kept | OK | cut mechanics by pointer to F-REDERIVE; rekey kept |
| DETERMINISM-440 | §7.3 (b) 3 — contact-name choice rule by pointer to §2.2 rule 7 (stated there identically, l. 870–880) | OK | §2.2 rule 7 states the choice; ordinal from 2 at §3.3 rule 2 |
| DETERMINISM-441 | referenced to §2.2 rule 5 Stretches (was at §7.3 (b) 3) | OK | §2.2 rule 5 "Stretches" |
| DETERMINISM-442 | §7.3 (b) 3 — kept | OK |  |
| DETERMINISM-443 | §7.3 (b) 4 — kept | OK |  |
| DETERMINISM-444 | §7.3 (b) 4 — kept | OK |  |
| DETERMINISM-445 | §7.3 (b) 4 — kept | OK |  |
| DETERMINISM-446 | §7.3 (b) 5 — kept | OK |  |
| DETERMINISM-447 | §7.3 (b) 6 — kept | OK |  |
| DETERMINISM-448 | §7.3 (b) 7 — kept | OK |  |
| DETERMINISM-449 | §7.3 (b) 8 — CANON-C07: "the height samples the edit changed" | OK | CANON-C07 applied |
| DETERMINISM-450 | §7.3 (b) 9 — by pointer to §5.2 F-REDERIVE (deck and site over land = DETERMINISM-076, -077) | OK | by pointer to F-REDERIVE |
| DETERMINISM-451 | §7.3 (b) — kept | OK |  |
| DETERMINISM-452 | rationale → J-DET-23 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.3 (b) | OK | J-DET-23; F.4 R18 |
| DETERMINISM-453 | §7.3 (3) — list by reference to §7.1 (DETERMINISM-345) | OK | by reference to §7.1 |
| DETERMINISM-454 | §7.3 (4) — kept | OK |  |
| DETERMINISM-455 | §7.3 (4) — VD5-1: stored fates and renames compared only under the confirming output version | OK | VD5-1 applied |
| DETERMINISM-456 | §7.3 (4) — kept | OK |  |
| DETERMINISM-457 | §7.3 (4) — VD5-1; freed-name events by pointer to §6.3 case (4) | OK | VD5-1; freed-name events by §6.3 case (4) |
| DETERMINISM-458 | referenced to §2.8 Derivation records (was at §7.3 (5)) | OK | §2.8 DerivationRecord and "Derivation records" |
| DETERMINISM-459 | §7.3 (5) — kept | OK |  |
| DETERMINISM-460 | §7.3 (6) — VD5-5: both routes leave the same records (§2.8) | OK | VD5-5; §2.8 states the route-independent rule |
| DETERMINISM-461 | §7.3 (7) (i) — VD5-5: replay = session compares the records digest too | OK | VD5-5 applied |
| DETERMINISM-462 | §7.3 (7) (ii) — kept | VDC-7 | model note 8 (NP5-1 companion) not reflected |
| DETERMINISM-463 | §7.3 (7) (iii) — kept | OK |  |
| DETERMINISM-464 | §7.3 (7) (iv) — kept | OK |  |
| DETERMINISM-465 | referenced to §13.2 (was at §7.3 (7) (iv)) | OK | §13.2 campaign; the "≥ 99.5 %" bound dropped by SCOPE-C03 |
| DETERMINISM-466 | §7.3 (7) (v) — kept; union of F-REDERIVE test details (0 sites over land, 0 hard violations, events for every demolition/cut/re-route; drawn-way and drawn-wall sequences) | OK | union of F-REDERIVE test details |
| DETERMINISM-467 | §7.3 (7) (v) — kept | OK |  |
| DETERMINISM-468 | §7.3 (7) (v) — kept | OK |  |
| DETERMINISM-469 | §7.3 (7) (vi) — kept | OK |  |
| DETERMINISM-470 | §7.4 — kept | OK |  |
| DETERMINISM-471 | §7.4 lifecycle — kept; case (4) by the table's shorthand | OK |  |
| DETERMINISM-472 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-473 | §7.4 lifecycle — kept; kernel validation by pointer to §3.6 | OK |  |
| DETERMINISM-474 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-475 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-476 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-477 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-478 | §7.4 lifecycle — VD5-1: fates and renames compared under §7.3 item 4's rule | OK | VD5-1 applied |
| DETERMINISM-479 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-480 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-481 | §7.4 lifecycle — C-4: row names editTable / editPreset only | OK | C-4 applied |
| DETERMINISM-482 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-483 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-484 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-485 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-486 | §7.4 lifecycle — C-4: setStyle stated in this row only | OK | C-4 applied |
| DETERMINISM-487 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-488 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-489 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-490 | §7.4 lifecycle — VD5-3: frozenImport rebase runs case (4), returns confirm, stores renames | OK | VD5-3 applied (model note 9 satisfied) |
| DETERMINISM-491 | §7.4 lifecycle — moved from the rebase row to the "Rebases" paragraph under the table (text kept) | OK | moved to "Rebases" paragraph, text kept |
| DETERMINISM-492 | §7.4 lifecycle — moved from the rebase row to the "Rebases" paragraph under the table (text kept) | OK | moved to "Rebases" paragraph, text kept |
| DETERMINISM-493 | §7.4 lifecycle — VD5-1: upgrade lists recomputed fates/renames of earlier events once in its diff | OK | VD5-1 applied |
| DETERMINISM-494 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-495 | §7.4 lifecycle — kept | OK |  |
| DETERMINISM-496 | §7.4 undo — kept | OK |  |
| DETERMINISM-497 | §7.4 sessions — kept | OK | "host keeps one per user and document" stated at §11.3 |
| DETERMINISM-498 | rationale → J-DET-34 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.4 sessions | OK | J-DET-34; F.4 R19 |
| DETERMINISM-499 | §7.4 targets — kept | OK |  |
| DETERMINISM-500 | §7.4 targets — kept | OK |  |
| DETERMINISM-501 | §7.4 application — kept | OK |  |
| DETERMINISM-502 | §7.4 application — kept | OK |  |
| DETERMINISM-503 | §7.4 independence — kept | OK |  |
| DETERMINISM-504 | §7.4 independence — kept | OK |  |
| DETERMINISM-505 | §7.4 records — kept | OK |  |
| DETERMINISM-506 | §7.4 records — kept | OK |  |
| DETERMINISM-507 | §7.4 truncation — kept; pack retention by pointer to §2.9 | OK | pack retention by pointer to §2.9 |
| DETERMINISM-508 | referenced to §2.9 pack set bullet (was at §7.4 truncation) | OK | CF-PIPE-06; §2.9 retention incl. redo stack |
| DETERMINISM-509 | §7.4 truncation — VD5-5: equal records digests too; cases by pointer to §6.5 (9) | OK | VD5-5 applied |
| DETERMINISM-510 | §7.4 checkpoints — kept | OK |  |
| DETERMINISM-511 | §7.4 checkpoints — kept | OK |  |
| DETERMINISM-512 | §7.4 — kept | OK |  |
| DETERMINISM-513 | rationale → J-DET-16 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.4 | OK | J-DET-16; F.4 R20 |
| DETERMINISM-514 | §7.4 warp ground — kept | OK |  |
| DETERMINISM-515 | §7.4 warp ground — kept | OK |  |
| DETERMINISM-516 | §7.4 warp ground — kept | OK |  |
| DETERMINISM-517 | §7.4 warp ground — kept | OK |  |
| DETERMINISM-518 | referenced to §2.6 stored composition (2)–(5) (was at §7.4 warp ground) | OK | §2.6 wing-carrying rules 1–4 and stored composition (1)–(5) |
| DETERMINISM-519 | §7.4 warp ground — kept | OK |  |
| DETERMINISM-520 | §7.4 warp ground — kept | OK |  |
| DETERMINISM-521 | referenced to §8.10 (was at §7.4 warp ground) | OK | §8.10 (points survive by position in the face) |
| DETERMINISM-522 | referenced to §13.2 (was at §7.4 warp ground) | OK | §13.2 warp fixtures and §2.6's test |
| DETERMINISM-523 | rationale → J-DET-31 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.4 warp ground | OK | J-DET-31; F.4 R21 |
| DETERMINISM-524 | §7.4 MFCG asks — kept | OK |  |
| DETERMINISM-525 | §7.4 MFCG asks — kept | OK |  |
| DETERMINISM-526 | §7.4 MFCG asks — C-5: by pointer to §4.2 S1 (5) | VDC-12 | C-5 pointer present; location phrase kept |
| DETERMINISM-527 | §7.5 — kept | OK |  |
| DETERMINISM-528 | §7.5 (1) — kept | OK |  |
| DETERMINISM-529 | §7.5 (2) — kept | OK |  |
| DETERMINISM-530 | §7.5 (2) — kept | OK |  |
| DETERMINISM-531 | §7.5 (2) — kept | OK |  |
| DETERMINISM-532 | §7.5 (2) — kept | OK |  |
| DETERMINISM-533 | §7.5 (2) — VD5-2 / C-6: only "keep the old model" offered; frozen view whose frozenImport the cap refuses; CLI replays | OK | VD5-2 / C-6 applied |
| DETERMINISM-534 | §7.5 (2) — kept | OK |  |
| DETERMINISM-535 | §7.5 (2) — kept | OK |  |
| DETERMINISM-536 | §7.5 (2) — kept | OK |  |
| DETERMINISM-537 | §7.5 (2) — kept; rationale → J-DET-18 | OK |  |
| DETERMINISM-538 | referenced to §2.9 Size budget (was at §7.5 (2)) | OK | §2.9 Size budget METROPOLIS ≤ 8 MB |
| DETERMINISM-539 | rationale → J-DET-18 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.5 | OK | J-DET-18; F.4 R22 |
| DETERMINISM-540 | §7.5 (2) — kept | OK |  |
| DETERMINISM-541 | §7.5 — kept | OK |  |
| DETERMINISM-542 | §7.5 — VD5-1: MigrationMap.changedConfirmations added | OK | VD5-1 applied (`changedConfirmations`) |
| DETERMINISM-543 | rationale → J-DET-44 (+ J-DET-54 new, canon) in docs/ARCHITECTURE-RATIONALE.md; "(J-DET-44, J-DET-54)" left at §7.5 | OK | J-DET-44 + J-DET-54; F.4 R23 |
| DETERMINISM-544 | §7.5 — VD5-1, VD5-2: two tests added | OK | VD5-1 and VD5-2 tests added |
| DETERMINISM-545 | §7.6 — kept | OK |  |
| DETERMINISM-546 | §7.6 — kept | OK |  |
| DETERMINISM-547 | referenced to §2.9 pack set bullet (was at §7.6) | OK | §2.9 pack set / §10.4 SettingPack |
| DETERMINISM-548 | §7.6 — kept (+ corpus select/deselect is this adjust) | OK |  |
| DETERMINISM-549 | referenced to §2.9 pack set bullet (was at §7.6) | OK | CF-PIPE-06 / VD5-6 |
| DETERMINISM-550 | §7.6 — NP5-3: "…, listed for confirmation (§6.3 case (4)), and never the row's other names" | OK | NP5-3 (a) canonical sentence |
| DETERMINISM-551 | referenced to §2.9 pack set bullet (was at §7.6) | OK | §2.9 user-corpus bullet |
| DETERMINISM-552 | §7.6 — kept | OK |  |
| DETERMINISM-553 | §7.6 — kept | OK |  |
| DETERMINISM-554 | §7.6 — kept | OK |  |
| DETERMINISM-555 | §7.6 — kept | OK |  |
| DETERMINISM-556 | rationale → J-DET-48 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.6 | OK | J-DET-48; F.4 R24 |
| DETERMINISM-557 | §7.6 — kept | OK |  |
| DETERMINISM-558 | §7.6 — kept | OK |  |
| DETERMINISM-559 | §7.6 — kept | OK |  |
| DETERMINISM-560 | §7.6 — kept | OK |  |
| DETERMINISM-561 | §7.6 — kept | OK |  |
| DETERMINISM-562 | §7.7 — kept | OK |  |
| DETERMINISM-563 | §7.7 (1) — kept | OK |  |
| DETERMINISM-564 | §7.7 (1) — kept (+ "≈ 200 internal parameters", union from PIPELINE-053) | OK | union "≈ 200 internal parameters" |
| DETERMINISM-565 | §7.7 (1) — kept | OK |  |
| DETERMINISM-566 | §7.7 (1) — kept | OK |  |
| DETERMINISM-567 | §7.7 (1) — kept | OK |  |
| DETERMINISM-568 | §7.7 (1) — kept | OK |  |
| DETERMINISM-569 | §7.7 (2) — kept | OK |  |
| DETERMINISM-570 | §7.7 (3) — kept | OK |  |
| DETERMINISM-571 | §7.7 (3) — kept | OK |  |
| DETERMINISM-572 | §7.7 (3) — kept | OK |  |
| DETERMINISM-573 | §7.7 — C-7 canonical: one order for every meeting of protections and inputs; S10–S11 apply it to assignments | OK | C-7 canonical |
| DETERMINISM-574 | rationale → J-DET-11 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.7 | OK | J-DET-11; F.4 R25 |
| DETERMINISM-575 | §7.7 — kept | VDC-9 | "and edits" missing (pipeline note D-6) |
| DETERMINISM-576 | §7.7 — kept | OK |  |
| DETERMINISM-577 | §7.7 — kept | OK |  |
| DETERMINISM-578 | §7.7 — kept | OK | "should-have" is a priority tier (§15.2, M3b), not deferral wording |
| DETERMINISM-579 | §7.8 — kept | OK |  |
| DETERMINISM-580 | §7.8 — kept | OK |  |
| DETERMINISM-581 | §7.8 — kept | OK |  |
| DETERMINISM-582 | §7.8 — kept | OK |  |
| DETERMINISM-583 | §7.8 — kept | OK |  |
| DETERMINISM-584 | rationale → J-DET-27 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §7.8 | OK | J-DET-27; F.4 R26 |
| DETERMINISM-585 | §7.8 — kept | VDC-11 | rendering note (d): preview-style clause only at §8.5 |
| DETERMINISM-586 | §7.8 — kept | OK |  |
| DETERMINISM-587 | §7.8 — kept; auto features by pointer to §4.2 S0 | OK |  |
| DETERMINISM-588 | referenced to §4.2 S0 (was at §7.8) | OK | §4.2 S0 feature draws |
| DETERMINISM-589 | §7.8 — kept | OK |  |
| DETERMINISM-590 | referenced to Delegated decisions (was at §5.1 (1)) | OK | D-9 row points to §13.5 |
| DETERMINISM-591 | referenced to Delegated decisions (was at §6.2; §6.5 (7)) | OK | D-14 row; §6.5 (7) cites D-14 |
| DETERMINISM-592 | referenced to Delegated decisions (was at §6.5 (2)) | OK | D-23 row; §6.5 (2) cites D-23 |
| DETERMINISM-593 | rationale → J-K8 in docs/ARCHITECTURE-RATIONALE.md; pointer left at §6.5 (10) | OK | J-K8 pointer at §6.5 (10) |
| DETERMINISM-594 | §7.3 (1) — kept (merged into item 1) | OK |  |
| DETERMINISM-595 | §7.4 application — kept | OK |  |
| DETERMINISM-596 | §7.4 targets — kept | OK |  |
| DETERMINISM-597 | §6.2 — kept | OK |  |
| DETERMINISM-598 | referenced to §13.3 (was at §6.4 goldens) | OK | §13.3 states the record contents |
| DETERMINISM-599 | §6.1 — kept | OK |  |
| DETERMINISM-600 | referenced to §2.9 pack set bullet (was at §6.4) | OK | §2.9 defines the pack set |
| DETERMINISM-601 | §6.2 (iii) — kept | OK |  |
