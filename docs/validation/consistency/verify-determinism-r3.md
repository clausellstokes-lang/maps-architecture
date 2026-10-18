# Verify — determinism part (§5, §6, §7) of the consolidated ARCHITECTURE.md, round 3 (after repair round 3)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-determinism-r3`, 2026-09-26. Status: COMPLETE. Inputs: §5–§7 of the current
`docs/ARCHITECTURE.md` (l. 3916–5456); the round-2 document (sha256 `d9d509fa…`, reproduced at r2 by the `assemble-r0.py` → `assemble-r1.py` →
`assemble-r2.py` chain and equal to assemble-r3's "before"); the current document, reproduced byte for byte by `assemble-r3.py` from it (sha256
`7a4e19db…`); the whole-document diff r2 → r3 (7 hunks, 36 lines out and 36 in, every hunk read) with a word diff of
each hunk; the archive; all 601 records of `inventory-determinism.json`; `canon.json` (`by_inventory_id`, `facts`,
`conflicts` and home rules R4, R5, R8, R9 for the ids the changed text touches); the mapping table of
`rewrite-determinism.md`; the four `repair-r3-*.md` files with their landing notes in `docs/lane-events.log`;
`validate.md` (V-FIN-01 … V-FIN-07); `assemble-r3.md`; and `verify-determinism-r2.md` (the earlier verdicts). The
determinism repair file has no preamble; its landing note claims V-FIN-03 and V-FIN-04, the two validate.md issues owned
by determinism.

## 1. Outcome

**1 issue, minor (0 blocker, 0 major), owned by rendering (VDR3-1). No issue is owned by determinism.**

* **Both determinism fixes are FIXED.** V-FIN-03 (= VDR2-1): F-CONTOUR's bracket now names §8.2 beside §4.2 S1.
  V-FIN-04: §6.1's `render.stampTiles` entry now states the key's function, "the four 32-bit-lane finalisers (as for the
  seed key) over the words (…)". Each is validate.md §8's exact text.
* **The other lanes' round-3 fixes that touch this part agree with its canonical statements.** V-FIN-06 (§9.5's compass
  keyed from §6.1's town root key, DETERMINISM-139), V-FIN-01 (§12.6's replay sentence against §7.3 item 2,
  DETERMINISM-407) and V-FIN-02 (§13.2's `wealthLevel` sweep, the test F-BUDGET-STAGE points to, DETERMINISM-049). V-FIN-05
  (§16 M2b) and V-FIN-07 (§4.2 S1 (1)) touch no fact of this part.
* **The part changed in exactly 6 lines (2 hunks),** each a claimed substitution: l. 4009 and l. 4177–4181. Nothing else
  in §5–§7 moved, and no line number of the document moved.
* **VD5-1 … VD5-5 and the routed NP5-2, NP5-3 and VD5-6 stay FIXED;** none is UNFIXED.
* **VDR3-1 is not a round-3 change.** It was found on re-reading §12.6, which round 3 replaced, under DETERMINISM-251,
  whose pointer lands there. §12.6's verification law restates §6.3's matching budget as "≤ 2 µs per re-derived entity",
  without §6.3's "≤ 20 µs per overlap-anchored one". The pair is archive-identical, and r0–r2 of this lane missed it.
* **Scans:** no deferral wording, review marker or fix-round tag; 0 broken references; all 34 J pointers resolve.
* **Coverage:** 152 of the 601 ids were re-checked this round; 449 keep their r2 verdict.

CONFIRMED by executed reproduction, diff, word diff, grep and scripts: every FIXED verdict in §3 (new text present
once, old text gone, landing lines read), VDR3-1's premise (both statements and both archive lines), and the checks of
§8. PLAUSIBLE (reading only): that "(as for the seed key)" carries the archive's "§6.1's four-lane finaliser" exactly,
and the rulings of §7.

## 2. Issues

| id | severity | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VDR3-1 | minor | conflict | rendering | §6.3 (l. 4432–4434) is the home of the succession-matching budget (DETERMINISM-251; canon rule R8 names "§6.3 matching" as a budget that stays at its subject section, with §12 pointing to it): "≤ 2 µs per re-derived point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the scope costs of §12.6". §12.6's verification law restates it in c(e) as "plus succession matching (≤ 2 µs per re-derived entity, §6.3)" (l. 7337–7338). That applies the point-anchored figure to every entity, so for the overlap-anchored kinds (ways without matched end junctions, enceintes, water bodies, greenery, land use) the two places give different budgets, ≤ 2 µs against ≤ 20 µs. The pair is archive-identical (archive l. 5604 and l. 9037), so no repair round caused it; r0–r2 missed it. It was found on re-reading §12.6, which round 3 replaced, under DETERMINISM-251, whose "scope costs of §12.6" lands there. | §12.6, the law's c(e): change "plus succession matching (≤ 2 µs per re-derived entity, §6.3)" to "plus succession matching (§6.3's budget)". Nothing else changes; §6.3 keeps the budget with its measurement and fallback. |

## 3. The issues round 3 claimed to fix, and the other lanes' round-3 fixes that touch this part

| issue | owner, fixed by | verdict | where the fix stands (evidence) |
|---|---|---|---|
| V-FIN-03 (= VDR2-1 = VR-R2-3) | determinism, repair-r3-determinism | FIXED | l. 4009: "F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2]", the exact required text (script: 1 occurrence). Rung 1, the coast construction, is stated at §4.2 S1 (2) (l. 2675–2678), which points on to "§8.2's relief tier (F-CONTOUR, §5.2)". Rung 2, the clip to the land faces in vector space before emission, is stated at §8.2 (l. 5719–5722; RENDERING-084, of which PIPELINE-066 is the restatement), which points back to F-CONTOUR and §4.2 S1 (2). The rest of the row is byte-identical to r2 (word diff: one substitution). |
| V-FIN-04 (= VR-R2-1) | determinism, repair-r3-determinism | FIXED | l. 4176–4181: "keyed by a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band) —, with `STAGE_VIEW` and reroll, attempt, epoch and salt 0". This is the exact required text (whitespace-normalised script: 1 occurrence; the old "keyed by a constant entity key over" 0). It restores the archive's §8.10 statement at the fact's home (archive l. 7744–7746, "§6.1's four-lane finaliser over the words (…)"; RENDERING-286, which the canon holds as a restatement of DETERMINISM-161). "(as for the seed key)" lands on l. 4117–4118, "four 32-bit-lane finalisers with distinct salts (all `Math.imul`)". §8.10's unchanged pointer to "§6.1's registry entry" (l. 6261–6262) now lands on a stated function. The key stays seed-independent (its words hold no seed), as §13.3's shift record says ("the library being seed-independent", l. 7821). The five-line span is re-wrapped 5 → 5; the word diff shows only the inserted words. |
| V-FIN-06 | rendering, repair-r3-rendering | FIXED; agrees with §6.1 | §9.5 l. 6561–6562: "keyed from the town root's entity key (§6.1, §14 `TOWN_ROOT`) with the concern `style.compass`"; "the seed key alone" has 0 hits. The compass, the emblem (l. 6588) and §14's `TOWN_ROOT` comment (l. 8292) all use §6.1's town root key, "the seed key mixed with the fixed town lineage …, so they depend on the recipe alone and never on `docId`" (l. 4120–4123; DETERMINISM-139). |
| V-FIN-01 (= V-MODEL-R2-01 = VR-R2-2) | rendering, repair-r3-rendering | FIXED; agrees with §7.3 item 2 | §12.6 l. 7329–7331: "… folds the log on the model through the session's code path, and the view stages run once at the end (§7.3 item 2) — S13a's scoped delta …". §7.3 item 2 (l. 4866–4870; DETERMINISM-407) is the one statement: "Only the view stages wait: S14 and S13b run once at the end". The archive's §12.6 said the same (archive l. 9028–9030). |
| V-FIN-02 (= P2-1 = V-SCOPE-R2-02) | scope, repair-r3-scope | FIXED; agrees with F-BUDGET-STAGE | §13.2 l. 7687–7688: "(population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2)". F-BUDGET-STAGE's test cell (l. 4012) points there unchanged. DETERMINISM-049's archive text, "the walled share in its band" (archive l. 5129), and §4.4 S5d's "inside its rung band" (archive l. 4112) are now both carried at the test's home (SCOPE-184). §4.2 S2 (l. 2786–2791) gives the walled share per rung. The re-wrap changed no other word (word diff). |
| V-FIN-05 (= V-SCOPE-R2-01) | scope, repair-r3-scope | FIXED; no fact of this part | §16 M2b (l. 8645): "the `lit` export beside a moving `path` sun (§12.7);" is inserted after the light-passes criterion. This part's two §16 pointers (l. 4078, l. 4477) land on M1's row, M2b's flat-cost criterion and M4's row, all unchanged. |
| V-FIN-07 | pipeline, repair-r3-pipeline | FIXED; no fact of this part | §4.2 S1 (1) (l. 2658): "(at §2.3's resolution per rung)". No pointer of §5–§7 targets S1 (1), and no id of this part states the raster's resolution (§7.2 and §7.3 (a) speak of cells and §2.3's relief limit only). |

## 4. Open items VD5-1 … VD5-5 and routed items

No round-3 hunk touches the text that fixes them: the part's only hunks are F-CONTOUR's bracket and the
`render.stampTiles` key clause. The receipts are occurrence counts in the part, r2 against r3, and row identity by
script.

| item | verdict | note |
|---|---|---|
| VD5-1 | FIXED | §7.3 item 4, §7.4's regenerate and upgrade rows, §7.5 (`MigrationMap.changedConfirmations`) and §6.3: no hunk; `changedConfirmations` 3 = 3. |
| VD5-2 | FIXED | §7.5's packs bullet and F-EDIT's row: F-EDIT's row is byte-identical to r2 (script); "keep the old model" 3 = 3. |
| VD5-3 | FIXED | §6.3's case-(4) trigger list and §7.4's rebase row: no hunk; `frozenImport` 6 = 6. |
| VD5-4 | FIXED | §6.2's node rule and §5.3's CI row: no hunk; "town node" 2 = 2. |
| VD5-5 | FIXED | §6.5 (9) and §7.3 items 6 and 7 (i): no hunk; "records digest" 6 = 6. |
| NP5-2 / NP5-3 / VD5-6 (routed) | FIXED | F-ROUTE's row is byte-identical to r2 (script); §7.6's canonical sentence, §7.4's warp paragraph and the §2.9 pointers have no hunk. |

GAP-1 (no value for k in "no branch re-joins its parent within k segments (§4.4)", l. 4061) is unchanged.
`validate.md` §5 routed it, with GAP-2, to the next design pass (`workflows/09-amendments-b.js`) with a recommended
k = 3; adding a design number is not this pass's to do. The pipeline verifier's O-R3-1 (the k of §4.2 S1 (4)'s island
branch) is pipeline's.

## 5. What round 3 changed under this part's pointers

Every `§` pointer of §5–§7 into the five subsections other lanes replaced was re-checked against its hunk (52
occurrences; `ptrs-other.txt` in the receipts). None lands on text that no longer states its fact.

| subsection (lane) | what the hunk changed | this part's pointers into it | result |
|---|---|---|---|
| §4.2 (pipeline) | S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" | 33 | none targets S1 (1); all land on byte-identical text (S0; S1 as a whole for F-OUTLINE, F-RIVER and F-CONTOUR; S1 (2), (3), (5), (7); S2; S3, S3 (6), (7), (9), (11)) |
| §9.5 (rendering) | " — the seed key alone" deleted from the compass bullet | 4 | §6.1's two pointers (l. 4121, l. 4148) land on the changed bullet and now agree with it without the appositive; §7.1's Measure row (l. 4717) and §7.4's rerollLayer row (l. 5099) land on the measure tool and on the compass and emblem as furniture, unchanged |
| §12.6 (rendering) | the replay sentence's verb restored | 1 (§6.3's matching budget, l. 4434) | lands on the scope costs, unchanged, and on c(e)'s matching term, whose restated value is VDR3-1 (unchanged since the archive, not the hunk) |
| §13.2 (scope) | the `wealthLevel` sweep's rung-band qualifier; its bullet re-wrapped (l. 7687–7711) | 12 | F-BUDGET-STAGE's test (l. 4012) lands on the changed words (V-FIN-02, FIXED); §5.3's harbour-fixture pointer (l. 4046) lands on re-wrapped words that are unchanged; the other 10 land outside l. 7687–7711 (outline test l. 7683, cost-model, op-order, naming-input, completeness, faithfulness, warp and MFCG-asks targets) |
| §16 (scope) | M2b's `lit`-export criterion inserted | 2 (l. 4078, l. 4477) | M1's row ("METROPOLIS is in the goldens …; M2b measures and tunes it"), M2b's "fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS" and M4's "output version 1 fixed, ending the *preview* label" are unchanged |

**Restatements in the re-wrapped §13.2 bullet.** That bullet tests the facts of 14 of this part's ids: the derived-complete
digest, NF-P5, the seam exception (NF-P6), the crossing invariant and its harbour works, the roads leaving a walled
stage, the drawn-bridge rule and the heights datum. Every one of those words is as in r2 (word diff: V-FIN-02's
substitution only), so each reads as r2 verified it.

**Inside this part.** 19 pointers from the rest of §5–§7 lead into §5.2 and §6.1: 18 `§` pointers plus the by-name
"(F-CONTOUR)" of §7.3 (b) (l. 4934). Two land on changed text: §5.3's "F-CONTOUR's clip (§5.2)" (l. 4063) and
l. 4934's "(F-CONTOUR)". Both still hold, because the row still names the clip rung and its bracket now also names §8.2.
The other 17 land on text byte-identical to r2. No pointer in §5–§7 targets the `render.stampTiles` entry.

**Other parts' statements about the two changed passages** all agree with them:

* §4.2 S1 (2) (l. 2678) and §8.2 (l. 5722) both point to F-CONTOUR, §5.2.
* §8.10 (l. 6261–6262): "under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)".
* §13.3 (l. 7816–7821): `render.stampTiles` view shifts, `outputVersion: null`, "the library being seed-independent".
* §14's `Rng.stream(entityKey: Hash128, stage /* STAGE_VIEW = 0xffff for paint programs and furniture */, …)`
  (l. 8307–8308). Four 32-bit lanes make the 128-bit constant key.
* The J-R42 index row (l. 9555): "a constant stream key for the stamp-tile library | §8.10".

## 6. Conflicts whose places round 3 replaced

The canon's conflicts with a place in §5.2 or §6.1 are DETERMINISM-C-1 and C-10 (§6.1), C-3 (F-REDERIVE), C-6 and C-7
(F-EDIT), C-9 (F-RIVER), CF-PIPE-04 (F-SITING), CF-PIPE-10 and MODEL-C11 (F-ROUTE), KERNEL-C05 (F-SKELETON), CANON-C06
(F-LABEL's test) and CANON-C08 (§6.1's stream key, canonical). The two hunks are F-CONTOUR's bracket and the
stamp-tile key clause, and neither is one of those places. Every resolving sentence is byte-identical to r2 (diff), so
each conflict stays resolved as the canon ruled.

## 7. Observations, each ruled (no finding left open)

* **O1–O3 and O7–O10 (from r1 and r2): unchanged, same rulings** (verify-determinism-r2.md §6). No round-3 hunk
  touches their text. O1's §13.2 lines, the stage contract tests at l. 7675–7676, lie outside the re-wrapped bullet.
  O4 stays resolved: the new §6.1 entry keeps "reroll, attempt, epoch and salt 0", and §8.10 still points to it. O5 and
  O6 were resolved or ruled at r2.
* **O11 (from r2), re-read after V-FIN-01: same ruling, INVALID as a conflict.** §12.6's restored sentence says "the
  view stages run once at the end", while the law V = M(B) + Σ c(e) + S14(B) + 5 ms counts S14 and not S13b. The
  archive had the same pair (archive l. 9028–9032). §7.3 item 2 says when the view stages run; §12.6 states what
  verification costs.
* **O12. F-CONTOUR's where "S1" and §5.3's "stage-end (S1)" check, against §8.2's extraction per render tile: INVALID
  as a conflict.** Both cells are the archive's (l. 5126, l. 5183), whose own §3 table already said contours are
  extracted per render tile, not in S1 (archive l. 2150). The canon holds F-CONTOUR "at S1" (DETERMINISM-041). The where
  column names the stage whose construction owns the class, the coast construction, and §5.3 checks the clip
  construction at S1's end. The bracket now names both computing sections, and no cell of the row changed but the
  bracket.
* **O13. The em dash followed by a comma ("band) —, with `STAGE_VIEW`") in §6.1's entry: INVALID as a finding.** It is
  the archive's own construction (archive l. 7746, "… 4 for the class's band) —, the stage `STAGE_VIEW`") and V-FIN-04's
  exact text. It is cosmetic, and the meaning is unambiguous.
* **O14. §13.2's "0 L3 band faces split or cleared (NF-P5)" (l. 7694) against §5.3's five face kinds: INVALID as a
  conflict.** The line is archive-identical (archive l. 9444–9445) and one of the words the re-wrap kept. §5.3's NF-P5
  check row (DETERMINISM-096) runs the whole invariant on every batch in the invariant suite: removed or changed L3 faces
  of kind band, setback, glacis, tower or gatehouse against the declared enceintes. §13.2's line is an extra
  stage-property assertion over B-CITY, not a narrower statement of the rule.
* **O15. `doc_checks.py` now reports 26 unreviewed C3 runs in §5–§7: corpus growth, not a document defect.** The
  r2 and r3 documents raise identical hit multisets on one corpus load (§8). Nothing else changed since assemble-r3's
  final run at 20:24, which covered §5–§7 with 0 unreviewed hits: not the document (sha256 `7a4e19db…`) and not the
  allow file (771 lines, last written 20:24). Each of the 26 runs needs at least one 3-gram of a file written after
  20:27: `research/findings/dwellings-synthesis.md` (still being written at 21:14), `_critic-dwellings.md` or 3 new
  capture JSON files. As `validate.md` §9 (1) and assemble-r3 §6 set out, the next seat that writes the allow file
  reviews them.

## 8. Mechanical checks (receipts)

Scratch receipts are in `scratchpad/vd3/` of this session:

* the documents: `r2.md`, `r3.md`, `cur.md`;
* the diffs: `r2-r3.diff`, `worddiff.py`;
* the parts: `part-r2.md`, `part-r3.md`;
* the pointer scans: `ptrs.py`, `ptrs-other.txt`, `ptrs-det.txt`, `map_ptrs.py`;
* the references: `refs-r2.*`, `refs-r3.*`;
* the checks: `dc_multi.py` (assemble-r3's one-load variant, unchanged), `dc-multi.out`, `dc-multi.json`;
* the table: `ids.tsv`, `build_tsv.py`, `checked_list.py`, `checked-list.md`.

The checks:

* **Reproduction.** `assemble-r3.py` run on the r2 document (`d9d509fa…`, reproduced at r2 from `assemble-r0.py` →
  `assemble-r1.py` → `assemble-r2.py`) gives `7a4e19db…`, and `cmp` finds it identical to `docs/ARCHITECTURE.md`.
* **Diff r2 → r3.** The whole document has 7 hunks, 36 lines out and 36 in, as assemble-r3 reports. The word diff shows
  one substitution per hunk, the one validate.md §8 required. The seven required texts each occur once
  (whitespace-normalised script). Of the six texts they replaced (V-FIN-05 is an insertion), five have 0 hits, and
  V-FIN-03's old "[§4.2 S1] |" remains only as the brackets of F-OUTLINE and F-RIVER (l. 4007, l. 4008). §5–§7 have 2
  hunks, 6 lines: l. 4009 and l. 4177–4181.
* **References.** The resolver (`assemble-r0-refs.py`) finds 0 broken references in §5–§7. The document's only 2 are
  external, at l. 2036 and 6826. Its output is identical on r2 and r3.
* **J pointers.** There are 34 distinct J pointers in §5–§7. Each has exactly one index row and one rationale Part A
  row (script). §6.1 still cites J-DET-22 and J-DET-53.
* **Wording.** §5–§7 hold 0 "PENDING FABLE REVIEW" lines; the document's one is the banner, l. 3. The part has 0 hits
  for TBD, TODO, deferred, "open question", "to be decided", "for now", "pending" and "round N". The one line containing
  "postponed" is F-BUDGET-TIME's row ("postpone or resume a lazy tier"; "a tier postponed and resumed"), a mechanism, as
  at r2. The 26 lines containing "later" are
  identical to r2's.
* **Tags.** The tag-like tokens form the same multiset as r2's (NF-P5 ×4, NF-P6 ×2, K-6, R-1, G-P6 and G-R12 in §6.1,
  and the ids of the headings).
* **Headings and fences.** The 140 heading lines are identical to r2's, and the 88 fence lines balance.
* **Document checks.** The official checker's logic was run through the one-load variant on r2 and r3 against one
  corpus snapshot (835 956 C3 3-grams, 478 C4 lists). With `--sections "5,6,7"`, both documents give C1 5/0, C2 0/0,
  C3 91/26, C4 1/0, S1 0/0 and S2 0/0. With `"5.2,6.1"`, both give C1 5/0, C3 17/5, C4 1/0 and S1 and S2 0. The hit
  multisets, lines included, are identical (script over `dc-multi.json`), so the blocks add or remove no hit. The exit status is 1 on both documents; the unreviewed
  hits are O15's.
* **Identifiers and figures.** Of the archive's backticked identifiers in §5–§7, the same 4 as at r1 and r2 miss a
  verbatim match in the document: the two receipt names that §13.2 cites in path form, `planned ∈ [0, 1]` (wrapped
  across a line in §7.7) and `coverage-audit-vg.md` (in J-DET-53's rationale row). Every approximate figure (≈ …) of the
  archive's §5–§7 is still present (script). The digest-tree figures ≈ 30 000, ≈ 15 000 and ≈ 0.25 MB live at §12.8,
  l. 7447–7448, as at r1.
* **Size.** The part is 189 830 bytes (r2: 189 751, so +79: +7 in §5.2 and +72 in §6.1), 84.6 % of the archive's
  224 320.

## 9. Checked list — every inventory id

Columns: the r2 verdict (`verify-determinism-r2.md` §8), what this round re-checked, the r3 verdict, and a note. The
categories are:

* **changed text:** a round-3 hunk changed the statement. It was read against the archive, the canon and the homes it
  points to.
* **home in a replaced subsection:** the statement lies in §5.2 or §6.1, which the determinism repair replaced, outside
  the changed lines (or, for DETERMINISM-042 and -159, on a changed line but outside the changed words). It is
  byte-identical to r2, so the r2 verdict is re-confirmed by the diff.
* **pointer in a replaced subsection** / **J pointer in a replaced subsection:** the id's pointer, or its J pointer,
  lies in §5.2 or §6.1. The pointer text is byte-identical, and J rows were re-checked by script.
* **target in a replaced subsection:** the id is homed in §4.2, §9.5, §12.6, §13.2 or §16, a subsection another lane
  replaced. It was re-checked against that hunk.
* **pointer lands in a replaced subsection:** the id's text points into §4.2, §9.5, §12.6, §13.2 or §16. The landing
  was re-checked (§5).
* **pointer into a replaced subsection:** the id's text elsewhere in §5–§7 points into §5.2 or §6.1.
* **restated in a replaced subsection:** a round-3 hunk, or the re-wrapped §13.2 bullet, restates or tests the id's
  fact. It was checked for agreement.
* **not touched:** the id keeps its r2 verdict. It sits in §5.1, §5.3–§5.4, §6.2–§6.5 or §7 (or a plain-words intro),
  and its pointers land on passages round 3 did not change.

| id | r2 verdict | r3 re-check | r3 verdict | note |
|---|---|---|---|---|
| DETERMINISM-001 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-002 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-003 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-004 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-005 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-006 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-007 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-008 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-009 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-010 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-011 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-012 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-013 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-014 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-015 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-016 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-017 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-018 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-019 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-020 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-021 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-022 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-023 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-024 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-025 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-026 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-027 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-028 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-029 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-030 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-031 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-032 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-033 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-034 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-035 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-036 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-037 | OK | pointer in a replaced subsection; target in a replaced subsection | OK | pointer text byte-identical to r2; "§13.2's outline stage property test" lands on l. 7683–7684 (10 000 outlines per intent → 0 self-intersections, 0 untyped loops), outside the re-wrapped lines |
| DETERMINISM-038 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-039 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-040 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-041 | VDR2-1 | changed text | OK — V-FIN-03 FIXED | bracket now "[§4.2 S1, §8.2]" (l. 4009), V-FIN-03's exact text: §4.2 S1 (2) (l. 2675–2678) states the coast construction (rung 1) and points on to "§8.2's relief tier (F-CONTOUR, §5.2)"; §8.2 (l. 5719–5722) states the extraction and the clip to the land faces in vector space (rung 2, RENDERING-084) and points back; where, detection, ladder and test cells byte-identical to r2 and to the archive row (l. 5126) |
| DETERMINISM-042 | OK | home in a replaced subsection | OK | on the changed row, but its test cell is byte-identical to r2 ("steep-coast, cliff and spit fixtures: 0 contours crossing water; 0 S1 aborts"); the row's only change is the bracket (DETERMINISM-041) |
| DETERMINISM-043 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-044 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-045 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-046 | OK | pointer in a replaced subsection; target in a replaced subsection | OK | pointer text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-047 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-048 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-049 | OK — VDR1-2 FIXED (pipeline) | pointer in a replaced subsection; target in a replaced subsection; restated in a replaced subsection | OK — V-FIN-02 FIXED (scope) | F-BUDGET-STAGE's test cell (l. 4012) byte-identical to r2 ("§13.2's B-CITY `wealthLevel` sweep"); §13.2 (l. 7687–7688) now states "population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2" — the archive's "the walled share in its band" (l. 5129) with §4.4 S5d's "inside its rung band" (l. 4112), SCOPE-184's home; §4.2 S2 (l. 2786–2791) gives the walled share per rung |
| DETERMINISM-050 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-051 | OK | home in a replaced subsection; restated in a replaced subsection | OK | text byte-identical to r2 (diff); §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-052 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-053 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-054 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-055 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-056 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-057 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-058 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-059 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-060 | OK — VDR1-3 FIXED | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2 (diff); §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-061 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-062 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-063 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-064 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-065 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-066 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-067 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-068 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-069 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-070 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-071 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-072 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-073 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-074 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-075 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-076 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-077 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-078 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-079 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-080 | OK | pointer in a replaced subsection; restated in a replaced subsection | OK | pointer text byte-identical to r2 (diff); §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-081 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-082 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-083 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-084 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-085 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-086 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-087 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-088 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-089 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-090 | OK (r1) | restated in a replaced subsection | OK | §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-091 | OK | restated in a replaced subsection | OK | §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-092 | OK | pointer lands in a replaced subsection; restated in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched; §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-093 | OK (r1) | restated in a replaced subsection | OK | §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-094 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-095 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-096 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-097 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-098 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-099 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-100 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-101 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-102 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-103 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-104 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-105 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-106 | OK | pointer lands in a replaced subsection; restated in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched; §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-107 | OK | target in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-108 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-109 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-110 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-111 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-112 | OK | pointer into a replaced subsection | OK | "F-CONTOUR's clip (§5.2)" lands on the changed row, which still names the clip rung; its bracket now also names §8.2, where the clip is computed (V-FIN-03) |
| DETERMINISM-113 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-114 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-115 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-116 | OK (r1) | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-117 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-118 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-119 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-120 | OK | restated in a replaced subsection | OK | §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-121 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-122 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-123 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-124 | OK | pointer lands in a replaced subsection | OK | text byte-identical to r2; its cost test lands on §13.2's cost-model bullet (untouched), and "generated from M1 on, §16" on §16's M1 row ("METROPOLIS is in the goldens, B-CITY, the determinism tests …; M2b measures and tunes it") and M2b's "per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS"; §16's only hunk is M2b's inserted `lit`-export criterion (V-FIN-05) |
| DETERMINISM-125 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-126 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-127 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-128 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-129 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-130 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-131 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-132 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-133 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-134 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-135 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-136 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-137 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (l. 4117–4118); the `render.stampTiles` entry's new "(as for the seed key)" points here, as the archive's §8.10 "§6.1's four-lane finaliser" did |
| DETERMINISM-138 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-139 | OK (r1) | home in a replaced subsection; pointer lands in a replaced subsection; restated in a replaced subsection | OK — V-FIN-06 FIXED (rendering) | text byte-identical to r2 (l. 4120–4123); §9.5's compass now reads "keyed from the town root's entity key (§6.1, §14 `TOWN_ROOT`) with the concern `style.compass`" (l. 6561–6562): the appositive "— the seed key alone", which named a key other than this home's "seed key mixed with the fixed town lineage", is gone; the emblem (l. 6588–6589) and §14's `TOWN_ROOT` comment (l. 8292) key the same way |
| DETERMINISM-140 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-141 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-142 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-143 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-144 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-145 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-146 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-147 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-148 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-149 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-150 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-151 | OK (r1) | home in a replaced subsection; pointer lands in a replaced subsection | OK | text byte-identical to r2; "(… the compass furniture program and the emblem generator, §9.5)" lands on §9.5's compass (`style.compass` and that concern's salt, a logged `rerollLayer('style.compass')`) and emblem (`naming.emblem` and its salt) bullets, whose only change is V-FIN-06's deleted appositive |
| DETERMINISM-152 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-153 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-154 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-155 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-156 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-157 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-158 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-159 | OK | home in a replaced subsection; pointer lands in a replaced subsection | OK | the 63 concern names are byte-identical to r2; the list's only changed words are the `render.stampTiles` key clause (DETERMINISM-161); its `blueprint.features` pointer (§4.2) lands on S0, untouched |
| DETERMINISM-160 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-161 | OK — VR-R1-3 (a) FIXED | changed text | OK — V-FIN-04 FIXED | the entry (l. 4176–4181) now states the derivation: "keyed by a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 …, 4 …) —, with `STAGE_VIEW` and reroll, attempt, epoch and salt 0" — V-FIN-04's exact text and the archive's §8.10 statement (l. 7744–7746, RENDERING-286, which the canon holds as this fact's restatement); "(as for the seed key)" lands on l. 4117–4118; the key stays seed-independent, as §13.3's view-shift record says (l. 7821); §8.10 (l. 6261–6262) points here unchanged |
| DETERMINISM-162 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-163 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-164 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-165 | OK | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-166 | OK | pointer in a replaced subsection | OK | pointer text byte-identical to r2 (diff) |
| DETERMINISM-167 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-168 | OK (r1) | J pointer in a replaced subsection | OK | J-DET-53 still cited in §6.1 (script); index and Part A rows intact; the Enter bullet is byte-identical to r2 |
| DETERMINISM-169 | OK (r1) | J pointer in a replaced subsection | OK | "(J-DET-53)" still at §6.1's Enter bullet (script); index and Part A rows intact |
| DETERMINISM-170 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-171 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-172 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-173 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-174 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-175 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-176 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-177 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-178 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-179 | OK (r1) | restated in a replaced subsection | OK | §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-180 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-181 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-182 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-183 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-184 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-185 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-186 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-187 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-188 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-189 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-190 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-191 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-192 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-193 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-194 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-195 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-196 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-197 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-198 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-199 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-200 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-201 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-202 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-203 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-204 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-205 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-206 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-207 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-208 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-209 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-210 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-211 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-212 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-213 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-214 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-215 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-216 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-217 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-218 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-219 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-220 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-221 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-222 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-223 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-224 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-225 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-226 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-227 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-228 | OK (r1) | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-229 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-230 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-231 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-232 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-233 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-234 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-235 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-236 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-237 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-238 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-239 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-240 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-241 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-242 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-243 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-244 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-245 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-246 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-247 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-248 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-249 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-250 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-251 | OK | pointer lands in a replaced subsection | VDR3-1 | home text byte-identical to r2 (l. 4432–4434, "≤ 2 µs per re-derived point-anchored entity and ≤ 20 µs per overlap-anchored one, median, included in the scope costs of §12.6"); the §12.6 it points to restates it in the law's c(e) as "succession matching (≤ 2 µs per re-derived entity, §6.3)" (l. 7337–7338), without the overlap-anchored figure; archive-identical (archive l. 5604 and 9037), not a round-3 change, missed at r0–r2 |
| DETERMINISM-252 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-253 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-254 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-255 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-256 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-257 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-258 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-259 | OK | target in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-260 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-261 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-262 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-263 | OK (r1) | pointer lands in a replaced subsection | OK | text byte-identical to r2; "fixed at M4's exit, §16" lands on §16's M4 row ("output version 1 fixed, ending the *preview* label"); §16's only hunk is M2b's inserted `lit`-export criterion (V-FIN-05) |
| DETERMINISM-264 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-265 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-266 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-267 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-268 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-269 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-270 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-271 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-272 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-273 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-274 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-275 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-276 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-277 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-278 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-279 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-280 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-281 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-282 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-283 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-284 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-285 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-286 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-287 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-288 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-289 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-290 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-291 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-292 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-293 | OK (r1) | restated in a replaced subsection | OK | §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-294 | OK | target in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-295 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-296 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-297 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-298 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-299 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-300 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-301 | OK (r1) | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-302 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-303 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-304 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-305 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-306 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-307 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-308 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-309 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-310 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-311 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-312 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-313 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-314 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-315 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-316 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-317 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-318 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-319 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-320 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-321 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-322 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-323 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-324 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-325 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-326 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-327 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-328 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-329 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-330 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-331 | OK (r1) | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-332 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-333 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-334 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-335 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-336 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-337 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-338 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-339 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-340 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-341 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-342 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-343 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-344 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-345 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-346 | OK (r1) | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-347 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-348 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-349 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-350 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-351 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-352 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-353 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-354 | OK (r1) | restated in a replaced subsection | OK | §9.5's compass bullet, the one V-FIN-06 touched, restates the decoupled compass (view key `compass` = `trueNorth` by default, or `free`, l. 6570–6572) in r2's words; agrees with the Rotate row (l. 4716) |
| DETERMINISM-355 | OK (r1) | target in a replaced subsection | OK | §9.5's measure-tool bullet (l. 6591–6595) is byte-identical to r2: polyline length in metres and feet, area mode, snapping to way centrelines, face edges and vertices, "a measurement is view data"; §7.1's Measure row points there |
| DETERMINISM-356 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-357 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-358 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-359 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-360 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-361 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-362 | OK | pointer lands in a replaced subsection; restated in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched; §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-363 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-364 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-365 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-366 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-367 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-368 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-369 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-370 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-371 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-372 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-373 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-374 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-375 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-376 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-377 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-378 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-379 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-380 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-381 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-382 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-383 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-384 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-385 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-386 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-387 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-388 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-389 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-390 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-391 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-392 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-393 | OK | target in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-394 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-395 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-396 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-397 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-398 | OK | restated in a replaced subsection | OK | §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-399 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-400 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-401 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-402 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-403 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-404 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-405 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-406 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-407 | OK — VR-R1-3 (b) FIXED | restated in a replaced subsection | OK — V-FIN-01 FIXED (rendering) | text byte-identical to r2 (l. 4866–4870); §12.6 (l. 7329–7331) now reads "folds the log on the model through the session's code path, and the view stages run once at the end (§7.3 item 2)": the verb is back and agrees with this home's "Only the view stages wait: S14 and S13b run once at the end" (archive l. 9028–9030 said the same) |
| DETERMINISM-408 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-409 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-410 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-411 | OK | pointer lands in a replaced subsection; pointer into a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched; its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-412 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-413 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-414 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-415 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-416 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-417 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-418 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-419 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-420 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-421 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-422 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-423 | OK | restated in a replaced subsection | OK | §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-424 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-425 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-426 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-427 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-428 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-429 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-430 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-431 | OK | pointer into a replaced subsection; pointer lands in a replaced subsection | OK | its by-name "contours clipped (F-CONTOUR)" lands on the changed row, which still names the clip (now bracketed to §8.2 as well); "§4.2 S1 (7)" lands on untouched text (§4.2's only hunk is S1 (1)) |
| DETERMINISM-432 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-433 | OK | pointer lands in a replaced subsection; pointer into a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched; its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-434 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-435 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-436 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-437 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-438 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-439 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-440 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-441 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-442 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-443 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-444 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-445 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-446 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-447 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-448 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-449 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-450 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-451 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-452 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-453 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-454 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-455 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-456 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-457 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-458 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-459 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-460 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-461 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-462 | OK — VDR1-1 FIXED | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-463 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-464 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-465 | OK | target in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-466 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-467 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-468 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-469 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-470 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-471 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-472 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-473 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-474 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-475 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-476 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-477 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-478 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-479 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-480 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-481 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-482 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-483 | OK (r1) | pointer into a replaced subsection; pointer lands in a replaced subsection | OK | "§6.1's rerollable concerns" lands on §6.1's salt component, byte-identical to r2; "compass and emblem: furniture only (§9.5)" lands on §9.5's compass and emblem bullets (only change: V-FIN-06's deleted appositive) |
| DETERMINISM-484 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-485 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-486 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-487 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-488 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-489 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-490 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-491 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-492 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-493 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-494 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-495 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-496 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-497 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-498 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-499 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-500 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-501 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-502 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-503 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-504 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-505 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-506 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-507 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-508 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-509 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-510 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-511 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-512 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-513 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-514 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-515 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-516 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-517 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-518 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-519 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-520 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-521 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-522 | OK | target in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-523 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-524 | OK | pointer lands in a replaced subsection | OK | §13.2's only hunk is the `wealthLevel` sweep's "walled share inside its rung band, §4.2 S2" (V-FIN-02), its bullet re-wrapped with every other word unchanged (word diff); the pointed-to fact is untouched |
| DETERMINISM-525 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-526 | OK | pointer lands in a replaced subsection; restated in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched; §13.2's re-wrapped stage-property bullet tests it with every word as in r2 (word diff: V-FIN-02's substitution only) |
| DETERMINISM-527 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-528 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-529 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-530 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-531 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-532 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-533 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-534 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-535 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-536 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-537 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-538 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-539 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-540 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-541 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-542 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-543 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-544 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-545 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-546 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-547 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-548 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-549 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-550 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-551 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-552 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-553 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-554 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-555 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-556 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-557 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-558 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-559 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-560 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-561 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-562 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-563 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-564 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-565 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-566 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-567 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-568 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-569 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-570 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-571 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-572 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-573 | OK | pointer into a replaced subsection | OK | its pointer into §5.2 or §6.1 lands on text byte-identical to r2 (diff) |
| DETERMINISM-574 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-575 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-576 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-577 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-578 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-579 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-580 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-581 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-582 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-583 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-584 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-585 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-586 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-587 | OK | pointer lands in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-588 | OK | target in a replaced subsection | OK | §4.2's only hunk is S1 (1)'s stored-raster resolution, now "(at §2.3's resolution per rung)" (V-FIN-07); the pointed-to fact is untouched |
| DETERMINISM-589 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-590 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-591 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-592 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-593 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-594 | OK | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-595 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-596 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-597 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-598 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-599 | OK (r1) | home in a replaced subsection | OK | text byte-identical to r2 (diff) |
| DETERMINISM-600 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
| DETERMINISM-601 | OK (r1) | not touched | OK (r2) | keeps its r2 verdict (verify-determinism-r2.md §8) |
