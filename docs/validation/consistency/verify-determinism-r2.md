# Verify — determinism part (§5, §6, §7) of the consolidated ARCHITECTURE.md, round 2 (after repair round 2)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Lane `consistency/verify-determinism-r2`, 2026-09-26. Status: COMPLETE. Inputs: §5–§7 of the current
`docs/ARCHITECTURE.md` (l. 3916–5456); the round-1 document, rebuilt with `assemble-r0.py` then `assemble-r1.py`
(sha256 `ddd48f07…`, assemble-r2's "before"); the current document, reproduced byte for byte by `assemble-r2.py`
(sha256 `d9d509fa…`); the whole-document diff r1 → r2 (16 hunks, 64 lines out and 62 in, every hunk read) and a
word-level diff of all 15 replaced subsections; the archive; all 601 records of `inventory-determinism.json`;
`canon.json` (`by_inventory_id` and `facts` for the ids the changed text touches; rules R4, R9, R13; KERNEL-C05,
CANON-C08); the mapping table of `rewrite-determinism.md`; the six `repair-r2-*.md` files with their landing notes in
`docs/lane-events.log`; `assemble-r2.md`; and `verify-determinism-r1.md` (the earlier verdicts) with the r1 issue tables
of all six verifiers. The determinism repair file has no preamble; its landing note claims VDR1-1 and VDR1-3, the only
r1 issues owned by determinism (VDR1-2 is pipeline's).

## 1. Outcome

**1 issue, minor (0 blocker, 0 major), owned by determinism (VDR2-1).** Both issues the determinism repair claimed are
fixed: VDR1-1 (§7.3 item 7 (ii) now names the wing rings) and VDR1-3 (F-SKELETON now lists S1's coast clamp as a
`spine` reader). VDR1-2 is fixed by the pipeline lane (P1-2). The other lanes' round-2 fixes that touch this part —
VR-R1-3 (a) and (b), V-SCOPE-R1-01 = V-MODEL-R1-01, P1-1 = VR-R1-4 and P1-3 — landed and agree with this part's
canonical statements; they also resolve r1's observations O4 and O5. The part changed in exactly 4 lines (3 hunks), each
a claimed substitution; nothing else in §5–§7 moved. The new problem is a side effect of P1-1: §4.2 S1 (2) now points
to §8.2 for the contour clip, so F-CONTOUR's bracket "[§4.2 S1]" reaches the clip rung's computation one hop short.
No value, rule or meaning differs from the archive outside the listed reconciliations; VD5-1 … VD5-5 and the routed
NP5-2, NP5-3 and VD5-6 stay fixed. No deferral wording, review marker or fix-round tag; 0 broken references; all 34 J
pointers resolve. 255 of the 601 ids were re-checked this round; 346 keep their r1 verdict.

CONFIRMED by executed reproduction, diff, word diff, grep and scripts: every FIXED verdict in §3, VDR2-1's premise
(the text of §4.2 S1 (2), §8.2 and F-CONTOUR), and the checks of §7. PLAUSIBLE (reading only): that the repair's two
vetoable calls read as the canon intends (§3), and the rulings of §6.

## 2. Issues

| id | severity | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VDR2-1 | minor | broken-reference | determinism | New problem from P1-1's fix (repair-r2-pipeline). F-CONTOUR's bracket "[§4.2 S1]" (l. 4009) names, by §5.2's † convention and canon R4, the section that states how its rungs are computed. Its ladder has two rungs: "the coast construction of §4.2 S1 → clip every contour to the land faces in vector space before emission". §4.2 S1 (2) still states the coast construction, but for the clip it now only points on: "their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2)" (l. 2677–2678). The clip's computation lives only at §8.2 (l. 5719–5722; canon fact RENDERING-084, of which PIPELINE-066 is the restatement). The bracket therefore reaches the second rung one hop short. Nothing is lost: the row names the rung and §8.2 points back to F-CONTOUR. This is the same class as V-SCOPE-R1-02 and VR-R1-6. | §5.2 F-CONTOUR: "F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2]". Nothing else in the row changes. |

## 3. The issues round 2 claimed to fix, and the other lanes' round-2 fixes that touch this part

| issue | owner, fixed by | verdict | where the fix stands (evidence) |
|---|---|---|---|
| VDR1-1 | determinism, repair-r2-determinism | FIXED | §7.3 item 7 (ii) (l. 5052–5053): "each face and wing ring §2.6's composition rule (1) adds to its scope equal to its prior ring after removing the vertices that rule inserted, with the `composition` role rows it adds present" — VDR1-1's required wording. §2.6 rule (1) (l. 984–988) adds "a row neighbour's wing rings" to the storing edit's scope and names "the check of §7.3 item 7 (ii)". |
| VDR1-3 | determinism, repair-r2-determinism | FIXED | F-SKELETON (l. 4018): where "S1, S11, S13a"; ladder "each reader takes its typed downgrade (§3.8): `spine` readers — label spines (§9.3) and S1's coast simplicity clamp (§4.2 S1 (2)): a sampled medial axis; roofs: a **plain roof** …". This agrees with §3.8's reader list (l. 2366–2373) and §4.2 S1 (2) (l. 2668–2670). The required change's "(§3.8)" now follows "typed downgrade", the same pointer. |
| the repair's vetoable call (1) | determinism | CONSISTENT | "the `regions` reader (S10) takes F-PLOT's ladder". §3.8 routes that reader to "(§4.7, §5.2 F-PLOT)"; F-PLOT's first rung is the reflex pre-cut partition "when the block's skeleton downgrades" (l. 4015). §4.7 S10 (4) (l. 3439–3441) labels the same downgrade "(F-SKELETON)": F-SKELETON detects, F-PLOT's ladder handles S10 (§6 O9). Every §3.8 reader is now accounted for in §5.2. |
| the repair's vetoable call (2) | determinism | CONSISTENT | §5.1's tier-4 example (l. 3988) is now "skeleton → sampled medial axis (spine readers) / plain roof (roofs)". The downgrades are the archive's (archive l. 5103, "medial axis (labels)"); "spine readers" names §3.8's reader kind instead of one of its readers. This is a reconciliation under KERNEL-C05, not a change. |
| VDR1-2 = P1-2 | pipeline, repair-r2-pipeline | FIXED | §4.4 S5d (l. 3124): "**Test:** §13.2's B-CITY `wealthLevel` sweep." — the pointer form F-BUDGET-STAGE's test cell uses. §13.2 (l. 7687) states "population ± 5 % on ≥ 95 % of seeds, walled share in band", which is DETERMINISM-049's statement. The stale "§5.2" is gone. |
| VR-R1-3 (a) | rendering, repair-r2-rendering | FIXED | §8.10 (l. 6261–6262): "under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)". §6.1's entry (l. 4176–4181) is now the key's one statement (creation index 0–3 for the four tiles and 4 for the band, `STAGE_VIEW`, reroll, attempt, epoch and salt 0; DETERMINISM-161, CANON-C08). §8.10 keeps only its construction's "(creation index 4)" and "(creation index 0–3)". r1 O4 is resolved. |
| VR-R1-3 (b) | rendering, repair-r2-rendering | FIXED | §12.6 (l. 7329–7331): "A replay (§7.3 item 2's replay mode) … the view stages once at the end (§7.3 item 2)". §7.3 item 2 (l. 4866–4870) keeps the list and "S14 and S13b run once at the end" as the one statement (DETERMINISM-407). |
| V-SCOPE-R1-01 = V-MODEL-R1-01 | scope, repair-r2-scope | FIXED; agrees with §6.2 (iii) | §13.2 (l. 7734–7742): the 100 ms case now runs "on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint has its recorded digest recomputed to match". The forced-§6.2 (iii) case ends "the mismatch withdraws the keep, and the snapshot is never kept". That is the pass criterion of the rule §6.2 (iii) states once (l. 4314–4315, "A mismatch withdraws the keep for good"; DETERMINISM-206). |
| P1-1 = VR-R1-4 | pipeline, repair-r2-pipeline | FIXED; side effect VDR2-1 | §4.2 S1 (2) (l. 2677–2679) keeps the coast construction and points to "§8.2's relief tier (F-CONTOUR, §5.2)". §8.2 (l. 5719–5722) states the clip and points back to F-CONTOUR and to §4.2 S1 (2). F-CONTOUR's ladder still names both rungs; its bracket is VDR2-1. |
| P1-3 | pipeline, repair-r2-pipeline | FIXED | §4.8 (l. 3588–3590): "(0 ways through reservations; MFCG's census baseline of 178 equalise passes and 11 bloats)", with no trailing "§5.2". F-CASTLE's test ("§4.8's castle acceptance; O8 (d)") now points one way. r1 O5 is resolved. |

## 4. Open items VD5-1 … VD5-5 and routed items

No round-2 hunk touches the text that fixes them. The only §7.3 hunk is item 7 (ii); F-EDIT's row, §6, §7.1, §7.2 and
§7.4–§7.8 have no hunk. The receipts are occurrence counts in the part, r1 against r2: `changedConfirmations` 3 = 3, "keep the
old model" 3 = 3, "town node" 2 = 2, "records digest" 6 = 6, `frozenImport` 6 = 6.

| item | verdict | note |
|---|---|---|
| VD5-1 | FIXED | §7.3 item 4, §7.4's regenerate and upgrade rows, §7.5 (`MigrationMap.changedConfirmations`) and §6.3: byte-identical to r1. |
| VD5-2 | FIXED | §7.5's packs bullet and F-EDIT's row: byte-identical to r1. |
| VD5-3 | FIXED | §6.3's case-(4) trigger list and §7.4's rebase row: byte-identical to r1. |
| VD5-4 | FIXED | §6.2's node rule and §5.3's CI row: byte-identical to r1. |
| VD5-5 | FIXED | §6.5 (9) and §7.3 items 6 and 7 (i): byte-identical to r1; the (ii) hunk leaves (i)'s "model digest and records digest" intact. |
| NP5-2 / NP5-3 / VD5-6 (routed) | FIXED | F-ROUTE's where (l. 4011), §7.6's canonical sentence, §7.4's warp paragraph and the §2.9 pointers are unchanged; §2.9 was not replaced this round. |

GAP-1 (no value for k in "no branch re-joins its parent within k segments", §5.3 → §4.4) is unchanged. It is one of
the canon's three gaps that this pass may not rule; the validator lists it for the owner or Fable.

## 5. What round 2 changed under this part's pointers

Every `§` pointer of §5–§7 into the 12 subsections other lanes replaced was re-checked against its hunk (102
occurrences; list in the scratch receipts, §7). Only one lands on changed text that no longer states the fact.

| subsection (lane) | what the hunk changed | this part's pointers into it | result |
|---|---|---|---|
| §0.2 (scope) | row 4's §12.2 wording | none | — |
| §1.2 (scope) | the 124–145 ms pointer | none | — |
| §2.6 (model) | wing rule 4's cost pointer, now "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)" | 11: §5.3's wing-rule row; §7.3 items 1, (a) 4, 7 (ii) and (v); §7.4's warp paragraph | all land on untouched text; §5.3's "≈ 0.06–2.7 µs a building" is rule 4's own figure, unchanged |
| §3.3 (kernel) | " (K4)" deleted | 22 | a tag only; all land |
| §4.2 (pipeline) | S1 (2)'s contour clause, now a pointer to §8.2 | 33 | 32 land on untouched text (S0; S1 and S1 (2)'s coast construction, floor and clamp; S1 (3), (5), (7); S2; S3 (6), (7), (9), (11)); F-CONTOUR's bracket → VDR2-1 |
| §4.4 (pipeline) | S5d's test sentence, now a pointer to §13.2 | 7 | all land; F-BUDGET-STAGE's "[§4.2 S2, §4.4]" still finds the top-up |
| §4.8 (pipeline) | "§5.2" dropped after the castle baseline | 5 | all land; F-CASTLE ↔ §4.8 is no longer circular |
| §8.10 (rendering) | the stamp-tile key sentence, now a pointer to §6.1 | 9 | all land (instance model, stamp library, `InstanceStyle`, overrides, world-anchored instances); §6.1 is now the key's only statement |
| §12.6 (rendering) | the replay bullet's first sentence, now a pointer to §7.3 item 2 | 1 (§6.3's matching budget) | lands on the scope costs and on c(e)'s matching term, unchanged |
| §12.7 (rendering) | `lit` export from M2b; the stage-3 hook pointer | none | — |
| §12.8 (rendering) | the atlas-set sentence | 2 (§6.2's two memory pointers) | the digest-tree memory (l. 7447–7448) is unchanged |
| §13.2 (scope) | B-EDIT's two substitutions, re-wrapped | 12 | the word diff shows nothing else changed; the cost-model, outline, `wealthLevel`, harbour, NF-P5, cost-test, naming-input, op-order, completeness, faithfulness, warp and MFCG-asks targets all land |

**Inside this part.** 64 pointers from the rest of §5–§7 lead into the three replaced determinism subsections (53
ids). 63 land on text byte-identical to r1. The one that lands on changed text is §6.2's "the locality checks of §7.3
item 7 (ii)–(vi) … read the model digest alone" (DETERMINISM-197). It still holds, because the (ii) hunk adds wing
rings to what (ii) compares and adds no digest.

**Other parts' statements about the three changed passages** all agree with them: §3.8's reader list and M0 fallback
(l. 2366–2373, 2417–2421); §4.2 S1 (2) (l. 2668–2670); §4.7 S10 (4) (l. 3439–3441; §6 O9); §9.3 (l. 6504–6505,
"When the skeleton fails (F-SKELETON), the medial axis of boundary samples is processed the same way"); §13.1's ladder
coverage (l. 7641–7643, "every rung of every ladder in §5.2 is reachable by a fixture"); `RoofSpec`'s `'plain'`
comment (l. 835); the §8 census row (l. 5884); §2.6 rule (1) and its "items 1 and 7 (ii)" list (l. 988, 1004).

## 6. Observations, each ruled (no finding left open)

* **O1–O3, O7, O8 (from r1): unchanged, same rulings.** No round-2 hunk touches their text. O1 (§13.2 and §13.3
  restate §6.5 (9)'s cross-host test, values equal) and O2 (§4.7 S10b restates F-SITING's last rung, CF-PIPE-04) are
  other parts' restatements with agreeing values. O3 (§2.5's τ) is V-MODEL-10's required wording. O7 and O8 are
  reconciliations, not changes.
* **O4 and O5 (from r1): resolved** by VR-R1-3 (a) and P1-3 (§3).
* **O6 (from r1), cosmetic short lines in §6.2: INVALID as a finding.** Markdown reflows a paragraph, so the rendered
  text is continuous and nothing changes in content.
* **O9. §4.7 S10 (4) versus F-SKELETON's `regions` clause: INVALID as a conflict.** §4.7 S10 (4) says "if the skeleton
  is downgraded (F-SKELETON), a reflex pre-cut partition … is used instead". F-SKELETON now says "the `regions` reader
  (S10) takes F-PLOT's ladder", and F-PLOT's first rung is that partition. The three statements describe one
  behaviour: F-SKELETON's detection fires, and S10's handling is F-PLOT's ladder. §3.8 (canonical, KERNEL-C05) says
  the same with "(§4.7, §5.2 F-PLOT)". The where column lists the stages whose rungs this row itself runs; the archive
  already split it the same way (archive l. 4479, 5135).
* **O10. §3.8's "A skeleton failure can therefore degrade a roof, a label or one stage's partition, never the plat"
  (l. 2364) against F-SKELETON's new S1 entry: INVALID as a conflict.** The coast clamp's downgrade changes the clamp's
  feature size, and so S1's land and sea outline, which is S1's partition. "One stage's partition" therefore covers it,
  and "never the plat" holds.
* **O11. §12.6's law V = M(B) + Σ c(e) + S14(B) + 5 ms counts S14 once but not S13b: INVALID as a conflict with §7.3
  item 2.** §7.3 item 2 says when the view stages run; §12.6 states what verification costs. The law is the archive's
  (archive l. 9032, J-R36), and round 2 changed only the bullet's first sentence.

## 7. Mechanical checks (receipts)

Scratch receipts are in `scratchpad/vd2/`: `r0.md`, `r1.md`, `r2.md`, `r1-r2.diff`, `ptrs-5-7.txt`, `inbound.txt`,
`refs-r2.json`, `dc-567*.txt`, `hits-567-r*.json` and `checked_list.py`.

* **Reproduction.** `assemble-r0.py` gives `ee314f23…`. `assemble-r1.py` on that gives `ddd48f07…`, assemble-r2's
  "before". `assemble-r2.py` on that gives `d9d509fa…`, and `cmp` finds it identical to `docs/ARCHITECTURE.md`.
* **Diff r1 → r2.** The whole document has 16 hunks, 64 lines out and 62 in, as assemble-r2 reports. §5–§7 have 3
  hunks and 4 lines: l. 3988 (tier 4), l. 4018 (F-SKELETON) and l. 5052–5053 (item 7 (ii)), in r2 numbering. A word
  diff of all 15 replaced subsections shows exactly the claimed substitutions.
* **References.** The resolver (`assemble-r0-refs.py`) finds 0 broken references in §5–§7. The document's only 2 are
  external, at l. 2036 and 6826.
* **J pointers.** There are 34 distinct J pointers in §5–§7. Each has exactly one index row and one rationale Part A
  row (script).
* **Wording.** §5–§7 hold 0 "PENDING FABLE REVIEW" lines; the document's one is the banner, l. 3. There are 0 hits for
  TBD, TODO, deferred, open question, "to be decided", "for now" and "pending". The 26 lines containing "later" are
  identical to r1's, all temporal. The tag-like tokens are identical to r1's as a multiset (NF-P5 ×4, NF-P6 ×2, the
  heading ids, K-6 and R-1 in §6.1).
* **Anchors.** The numbered item and step anchors of the whole document are identical in r1 and r2 (221 = 221 by this
  script). The 140 heading lines are unchanged.
* **Document checks.** `doc_checks.py --sections "5,6,7"` exits 0 with C1 5/0, C2 0, C3 63/0, C4 1/0, S1 0 and S2 0.
  Its (check, text) hit set is identical to r1's (69 = 69); only line numbers shift, by one.
* **Identifiers and figures.** Of the archive's backticked identifiers in §5–§7, the same 4 as at r1 miss a verbatim
  match. Two are receipt names that §13.2 cites in path form; `planned ∈ [0, 1]` wraps across a line in §7.7; and
  `coverage-audit-vg.md` sits in J-DET-53's rationale row. All 15 of the archive's approximate figures are present.
* **Size.** The part is 189 750 bytes (r1: 189 562, so +188), which is 84.6 % of the archive's 224 320.

## 8. Checked list — every inventory id

Columns: the r1 verdict (`verify-determinism-r1.md` §8), what this round re-checked, the r2 verdict, and a note. The
categories are:

* **changed text:** a round-2 hunk changed the statement. It was read against the archive, the canon and the homes it
  points to.
* **home in a replaced subsection:** the statement lies in §5.1, §5.2 or §7.3, which the determinism repair replaced,
  outside the 4 changed lines. It is byte-identical to r1, so r1's verdict is re-confirmed by the diff.
* **pointer in a replaced subsection** / **J pointer in a replaced subsection:** the id's pointer, or its J pointer,
  lies in §5.1, §5.2 or §7.3. The pointer text is byte-identical, and J rows were re-checked by script.
* **target in a replaced subsection:** the id is homed in a subsection another lane replaced. It was re-checked
  against that hunk.
* **pointer lands in a replaced subsection:** the id's text points into a subsection another lane replaced. The
  landing was re-checked (§5).
* **pointer into a replaced subsection:** the id's text elsewhere in §5–§7 points into §5.1, §5.2 or §7.3.
* **restated in a replaced subsection:** a round-2 hunk elsewhere restates or tests the id's fact. It was checked for
  agreement.
* **not touched:** the id keeps its r1 verdict. It sits in §5.3–§5.4, §6 or §7.1–§7.8 (or a plain-words intro), and
  its pointers land on passages round 2 did not change.

| id | r1 verdict | r2 re-check | r2 verdict | note |
|---|---|---|---|---|
| DETERMINISM-001 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-002 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-003 | OK (r0) | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-004 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-005 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-006 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-007 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-008 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-009 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-010 | OK (r0) | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-011 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-012 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-013 | OK (r0) | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-014 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-015 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-016 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-017 | OK | J pointer in a replaced subsection | OK | J-DET-3 still cited in §5.1 (script); index and Part A rows intact |
| DETERMINISM-018 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-019 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-020 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-021 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-022 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-023 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-024 | OK (r0) | changed text | OK | tier 4's skeleton example now reads "sampled medial axis (spine readers) / plain roof (roofs)" (repair's vetoable call 2): the same two downgrades, named by §3.8's reader kinds (KERNEL-C05); agrees with F-SKELETON and §3.8 |
| DETERMINISM-025 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-026 | OK (r0) | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-027 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-028 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-029 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-030 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-031 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-032 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-033 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-034 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-035 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-036 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-037 | OK | pointer in a replaced subsection; target in a replaced subsection | OK | pointer text byte-identical to r1 (diff); §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-038 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-039 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-040 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-041 | OK | home in a replaced subsection; target in a replaced subsection | VDR2-1 | row text byte-identical to r1, but since P1-1 §4.2 S1 (2) no longer states the clip rung's computation (it points to §8.2's relief tier), so the bracket [§4.2 S1] reaches the clip one hop short |
| DETERMINISM-042 | OK | home in a replaced subsection | OK | text byte-identical to r1; test unchanged (steep-coast, cliff and spit fixtures); the row's bracket is VDR2-1 |
| DETERMINISM-043 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-044 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-045 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); §4.4's only hunk is S5d's test sentence (now "§13.2's B-CITY `wealthLevel` sweep"); the pointed-to fact is untouched |
| DETERMINISM-046 | OK | pointer in a replaced subsection; target in a replaced subsection | OK | pointer text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-047 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-048 | OK | home in a replaced subsection; target in a replaced subsection | OK | text byte-identical to r1; bracket [§4.2 S2, §4.4]: §4.4 S5d still states the top-up (the hunk is its test sentence only) |
| DETERMINISM-049 | OK (here); VDR1-2 | home in a replaced subsection; target in a replaced subsection | OK — VDR1-2 FIXED (pipeline) | F-BUDGET-STAGE's test cell unchanged; §4.4 S5d now reads "**Test:** §13.2's B-CITY `wealthLevel` sweep." (P1-2), the same pointer form; §13.2 l. 7687 states ± 5 % on ≥ 95 % of seeds and the walled share in band |
| DETERMINISM-050 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); §4.4's only hunk is S5d's test sentence (now "§13.2's B-CITY `wealthLevel` sweep"); §4.8's only hunk drops "§5.2" after the 178 / 11 baseline; the pointed-to fact is untouched |
| DETERMINISM-051 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-052 | OK | home in a replaced subsection; target in a replaced subsection | OK | text byte-identical to r1; bracket [§4.2 S3, §4.8]: §4.8's Compactness paragraph still states how the equalise, bloat, re-site and keep rungs are computed |
| DETERMINISM-053 | OK | home in a replaced subsection; target in a replaced subsection | OK | test cell unchanged ("§4.8's castle acceptance; O8 (d)"); P1-3 dropped §4.8's trailing "§5.2", so the pointer is one-way; §4.8 l. 3588–3590 states ≥ 99 %, 0 ways through reservations and the 178 / 11 baseline (r1 O5 resolved) |
| DETERMINISM-054 | OK | home in a replaced subsection | OK | text byte-identical to r1; F-SKELETON's `regions` reader now points here, and this ladder's first rung ("when the block's skeleton downgrades, a reflex pre-cut partition") is that downgrade, as §3.8 and §4.7 S10 (4) state |
| DETERMINISM-055 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-056 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-057 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-058 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-059 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-060 | VDR1-3 | changed text | OK — VDR1-3 FIXED | where "S1, S11, S13a"; ladder "each reader takes its typed downgrade (§3.8): `spine` readers — label spines (§9.3) and S1's coast simplicity clamp (§4.2 S1 (2)): a sampled medial axis; roofs: a plain roof …; the `regions` reader (S10) takes F-PLOT's ladder"; agrees with §3.8's reader list, §4.2 S1 (2) and F-PLOT's first rung |
| DETERMINISM-061 | OK | changed text | OK | row line rewritten; the test cell is byte-identical ("§13.1's ladder-coverage fixtures"); §13.1 requires every rung of every §5.2 ladder reachable, so S1's rung is covered |
| DETERMINISM-062 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-063 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-064 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-065 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-066 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-067 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-068 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-069 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-070 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-071 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-072 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-073 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-074 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-075 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-076 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-077 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-078 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-079 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-080 | OK | pointer in a replaced subsection; target in a replaced subsection | OK | pointer text byte-identical to r1 (diff); §2.6's only hunk is wing rule 4's cost pointer (≤ 25 µs → §12.4's S11 row); the pointed-to fact is untouched |
| DETERMINISM-081 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-082 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-083 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-084 | OK | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-085 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-086 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-087 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-088 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-089 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-090 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-091 | OK | pointer lands in a replaced subsection | OK | §4.8's only hunk drops "§5.2" after the 178 / 11 baseline; the pointed-to fact is untouched |
| DETERMINISM-092 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-093 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-094 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-095 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-096 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-097 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-098 | OK | target in a replaced subsection | OK | §2.6's only hunk is wing rule 4's cost pointer (≤ 25 µs → §12.4's S11 row); the pointed-to fact is untouched |
| DETERMINISM-099 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-100 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-101 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-102 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-103 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-104 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-105 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-106 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-107 | OK | target in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-108 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-109 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-110 | OK | pointer lands in a replaced subsection | OK | §4.4's only hunk is S5d's test sentence (now "§13.2's B-CITY `wealthLevel` sweep"); the pointed-to fact is untouched |
| DETERMINISM-111 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-112 | OK | pointer into a replaced subsection | OK | points to F-CONTOUR's clip rung (§5.2), which the row still names; the row's bracket is VDR2-1 |
| DETERMINISM-113 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-114 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-115 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-116 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-117 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-118 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-119 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-120 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-121 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-122 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-123 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-124 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-125 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-126 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-127 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-128 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-129 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-130 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-131 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-132 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-133 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-134 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-135 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-136 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-137 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-138 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-139 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-140 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-141 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-142 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-143 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-144 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-145 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-146 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-147 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-148 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-149 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-150 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-151 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-152 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-153 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-154 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-155 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-156 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-157 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-158 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-159 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-160 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-161 | OK | target in a replaced subsection | OK — VR-R1-3 (a) FIXED | §8.10 now reads "under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)"; this entry (l. 4176–4181) is the one statement of the key — creation index 0–3 and 4, `STAGE_VIEW`, reroll, attempt, epoch and salt 0 — and §8.10 keeps only the construction's use of indices 4 and 0–3 (r1 O4 resolved) |
| DETERMINISM-162 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-163 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-164 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-165 | OK | pointer lands in a replaced subsection | OK | §8.10's only hunk is the stamp-tile random-source sentence (now points to §6.1's registry entry); the pointed-to fact is untouched |
| DETERMINISM-166 | OK | target in a replaced subsection | OK | §8.10's only hunk is the stamp-tile random-source sentence (now points to §6.1's registry entry); the pointed-to fact is untouched |
| DETERMINISM-167 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-168 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-169 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-170 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-171 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-172 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-173 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-174 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-175 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-176 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-177 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-178 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-179 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-180 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-181 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-182 | OK | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-183 | OK | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-184 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-185 | OK | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-186 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-187 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-188 | OK | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-189 | OK | pointer lands in a replaced subsection | OK | §12.8's only hunk is the atlas-set sentence; the pointed-to fact is untouched |
| DETERMINISM-190 | OK | target in a replaced subsection | OK | §12.8's only hunk is the atlas-set sentence; the pointed-to fact is untouched |
| DETERMINISM-191 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-192 | OK | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-193 | OK | target in a replaced subsection | OK | §12.8's only hunk is the atlas-set sentence; the pointed-to fact is untouched |
| DETERMINISM-194 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-195 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-196 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-197 | OK | pointer into a replaced subsection | OK | "the locality checks of §7.3 item 7 (ii)–(vi) … read the model digest alone" still holds: the (ii) hunk adds wing rings to what it compares, not a digest |
| DETERMINISM-198 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-199 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-200 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-201 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-202 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-203 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-204 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-205 | OK | restated in a replaced subsection | OK | §13.2's 100 ms case now runs "on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint has its recorded digest recomputed to match" (V-SCOPE-R1-01 = V-MODEL-R1-01): a step-4 mismatch on the load path stated here and in §2.9; consistent |
| DETERMINISM-206 | OK | restated in a replaced subsection | OK | §13.2's forced-§6.2 (iii) case now ends "the mismatch withdraws the keep, and the snapshot is never kept" (V-SCOPE-R1-01): the test's pass criterion; the rule stays stated once, here ("A mismatch withdraws the keep for good") |
| DETERMINISM-207 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-208 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-209 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-210 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-211 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-212 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-213 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-214 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-215 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-216 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-217 | OK (r0) | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-218 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-219 | OK (r0) | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-220 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-221 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-222 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-223 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-224 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-225 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-226 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-227 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-228 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-229 | OK (r0) | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-230 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-231 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-232 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-233 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-234 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-235 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-236 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-237 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-238 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-239 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-240 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-241 | OK (r0) | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-242 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-243 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-244 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-245 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-246 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-247 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-248 | OK (r0) | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-249 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-250 | OK (r0) | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-251 | OK (r0) | pointer lands in a replaced subsection | OK | §12.6's only hunk is the replay bullet's first sentence (now points to §7.3 item 2); the pointed-to fact is untouched |
| DETERMINISM-252 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-253 | OK (r0) | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-254 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-255 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-256 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-257 | OK (r0) | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-258 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-259 | OK | target in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-260 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-261 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-262 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-263 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-264 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-265 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-266 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-267 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-268 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-269 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-270 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-271 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-272 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-273 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-274 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-275 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-276 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-277 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-278 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-279 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-280 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-281 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-282 | OK | pointer lands in a replaced subsection | OK | §8.10's only hunk is the stamp-tile random-source sentence (now points to §6.1's registry entry); the pointed-to fact is untouched |
| DETERMINISM-283 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-284 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-285 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-286 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-287 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-288 | OK | target in a replaced subsection; pointer into a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched; its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-289 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-290 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-291 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-292 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-293 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-294 | OK | target in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-295 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-296 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-297 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-298 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-299 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-300 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-301 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-302 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-303 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-304 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-305 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-306 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-307 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-308 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-309 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-310 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-311 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-312 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-313 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-314 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-315 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-316 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-317 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-318 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-319 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-320 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-321 | OK | pointer lands in a replaced subsection | OK | §8.10's only hunk is the stamp-tile random-source sentence (now points to §6.1's registry entry); the pointed-to fact is untouched |
| DETERMINISM-322 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-323 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-324 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-325 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-326 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-327 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-328 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-329 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-330 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-331 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-332 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-333 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-334 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-335 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-336 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-337 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-338 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-339 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-340 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-341 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-342 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-343 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-344 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-345 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-346 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-347 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-348 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-349 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-350 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-351 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-352 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-353 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-354 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-355 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-356 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-357 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-358 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-359 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-360 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-361 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-362 | OK | pointer lands in a replaced subsection; pointer into a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched; its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-363 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-364 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-365 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-366 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-367 | OK | pointer lands in a replaced subsection | OK | §8.10's only hunk is the stamp-tile random-source sentence (now points to §6.1's registry entry); the pointed-to fact is untouched |
| DETERMINISM-368 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-369 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-370 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-371 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-372 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-373 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-374 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-375 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-376 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-377 | OK | pointer lands in a replaced subsection; pointer into a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched; its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-378 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-379 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-380 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-381 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-382 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-383 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-384 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-385 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-386 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-387 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-388 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-389 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-390 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-391 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-392 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-393 | OK | target in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-394 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-395 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-396 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-397 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-398 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §2.6's only hunk is wing rule 4's cost pointer (≤ 25 µs → §12.4's S11 row); the pointed-to fact is untouched |
| DETERMINISM-399 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-400 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-401 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-402 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-403 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-404 | OK | J pointer in a replaced subsection | OK | J-DET-29 still cited in §7.3 (script); index and Part A rows intact |
| DETERMINISM-405 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-406 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-407 | OK | home in a replaced subsection | OK — VR-R1-3 (b) FIXED | text byte-identical to r1; §12.6 now points here ("§7.3 item 2's replay mode"; "the view stages once at the end (§7.3 item 2)") instead of restating the list |
| DETERMINISM-408 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-409 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-410 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-411 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); §4.4's only hunk is S5d's test sentence (now "§13.2's B-CITY `wealthLevel` sweep"); the pointed-to fact is untouched |
| DETERMINISM-412 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-413 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-414 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-415 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-416 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-417 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-418 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-419 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-420 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-421 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-422 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-423 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §2.6's only hunk is wing rule 4's cost pointer (≤ 25 µs → §12.4's S11 row); the pointed-to fact is untouched |
| DETERMINISM-424 | OK | J pointer in a replaced subsection | OK | J-DET-24 still cited in §7.3 (script); index and Part A rows intact |
| DETERMINISM-425 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-426 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-427 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-428 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-429 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-430 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-431 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-432 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-433 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-434 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-435 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-436 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-437 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-438 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-439 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-440 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-441 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-442 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-443 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §3.3's only hunk drops the tag "(K4)"; §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-444 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-445 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); its "item 7 (ii) checks byte identity outside it" still holds (the (ii) hunk adds wing rings only); §3.3's only hunk drops the tag "(K4)" |
| DETERMINISM-446 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-447 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-448 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-449 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-450 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-451 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-452 | OK | J pointer in a replaced subsection | OK | J-DET-23 still cited in §7.3 (script); index and Part A rows intact |
| DETERMINISM-453 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-454 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-455 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-456 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-457 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-458 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r1 (diff) |
| DETERMINISM-459 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-460 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-461 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-462 | VDR1-1 | changed text | OK — VDR1-1 FIXED | now "each face and wing ring §2.6's composition rule (1) adds to its scope equal to its prior ring after removing the vertices that rule inserted, with the `composition` role rows it adds present" — VDR1-1's required wording; §2.6 rule (1) (l. 984–988) names the row neighbour's wing rings and "the check of §7.3 item 7 (ii)" |
| DETERMINISM-463 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-464 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-465 | OK | pointer in a replaced subsection; target in a replaced subsection | OK | pointer text byte-identical to r1 (diff); §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-466 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r1 (diff); §2.6's only hunk is wing rule 4's cost pointer (≤ 25 µs → §12.4's S11 row); the pointed-to fact is untouched |
| DETERMINISM-467 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-468 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-469 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-470 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-471 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-472 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-473 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-474 | OK | pointer lands in a replaced subsection; pointer into a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched; its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-475 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-476 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-477 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-478 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-479 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-480 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-481 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-482 | OK | pointer lands in a replaced subsection | OK | §8.10's only hunk is the stamp-tile random-source sentence (now points to §6.1's registry entry); the pointed-to fact is untouched |
| DETERMINISM-483 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-484 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-485 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-486 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-487 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-488 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-489 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-490 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-491 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-492 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-493 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-494 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-495 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-496 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-497 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-498 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-499 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-500 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-501 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-502 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-503 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-504 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-505 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-506 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-507 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-508 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-509 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-510 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-511 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-512 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-513 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-514 | OK | pointer lands in a replaced subsection | OK | §8.10's only hunk is the stamp-tile random-source sentence (now points to §6.1's registry entry); the pointed-to fact is untouched |
| DETERMINISM-515 | OK | pointer lands in a replaced subsection | OK | §3.3's only hunk drops the tag "(K4)"; the pointed-to fact is untouched |
| DETERMINISM-516 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-517 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-518 | OK | target in a replaced subsection | OK | §2.6's only hunk is wing rule 4's cost pointer (≤ 25 µs → §12.4's S11 row); the pointed-to fact is untouched |
| DETERMINISM-519 | OK | pointer lands in a replaced subsection; pointer into a replaced subsection | OK | §2.6's only hunk is wing rule 4's cost pointer (≤ 25 µs → §12.4's S11 row); the pointed-to fact is untouched; its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-520 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-521 | OK | target in a replaced subsection | OK | §8.10's only hunk is the stamp-tile random-source sentence (now points to §6.1's registry entry); the pointed-to fact is untouched |
| DETERMINISM-522 | OK | target in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-523 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-524 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is B-EDIT's two load-verification substitutions (word diff); the pointed-to fact is untouched |
| DETERMINISM-525 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-526 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-527 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-528 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-529 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-530 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-531 | OK (r0) | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-532 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-533 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-534 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-535 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-536 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-537 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-538 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-539 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-540 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-541 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-542 | OK (r0) | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-543 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-544 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-545 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-546 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-547 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-548 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-549 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-550 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-551 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-552 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-553 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-554 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-555 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-556 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-557 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-558 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-559 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-560 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-561 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-562 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-563 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-564 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-565 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-566 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-567 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-568 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-569 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-570 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-571 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-572 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-573 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-574 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-575 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-576 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-577 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-578 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); §4.4's only hunk is S5d's test sentence (now "§13.2's B-CITY `wealthLevel` sweep"); the pointed-to fact is untouched |
| DETERMINISM-579 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-580 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-581 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-582 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-583 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-584 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-585 | OK | pointer into a replaced subsection | OK | its pointer into §5.1, §5.2 or §7.3 lands on text byte-identical to r1 (diff) |
| DETERMINISM-586 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-587 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-588 | OK | target in a replaced subsection | OK | §4.2's only hunk is S1 (2)'s contour sentence (now a pointer to §8.2's relief tier); the pointed-to fact is untouched |
| DETERMINISM-589 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-590 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-591 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-592 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-593 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-594 | OK | home in a replaced subsection | OK | text byte-identical to r1 (diff) |
| DETERMINISM-595 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-596 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-597 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-598 | OK (r0) | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-599 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-600 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
| DETERMINISM-601 | OK | not touched | OK (r1) | keeps its r1 verdict (verify-determinism-r1.md §8) |
