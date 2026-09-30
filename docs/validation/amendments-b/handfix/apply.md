# handfix-b/apply — the 31 hand fixes of amendments-b closing-report §2, applied

> PENDING FABLE REVIEW — Opus-produced (handfix-b/apply).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM archive: planned docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-2026-09-27.md, chmod a-w, sha256 | done (1a861c72… / 8a24a5a7…)
ITEM encode: planned handfix.py with every sub-change of the 31 as data rows | done (74 rows; pre-check OK: 74/74 once, all quoted strings verbatim in the report)
ITEM apply: planned one run, anchors asserted once, both files written once | done (73 applied, 1 carried, 0 skipped; doc 5d752c9b…, rationale 61477508…; verify-normalised OK)
ITEM refs: planned reference resolver over the new text | done (doc 2 flags = the 2 pre-existing external citations; 0 new; every ref in the 73 texts resolves)
ITEM doc-checks: planned three-copy method over the changed top-level keys | done (6 new hits, reviewed as allow rows; subsection and top-level runs exit 0)
ITEM report: planned this file's table, hashes, sizes, results; queue row; LANDED line | done

Lane `handfix-b/apply`, 2026-09-27, a mechanical seat (opus). Input: `docs/ARCHITECTURE.md` sha256 `1a861c72…` and
`docs/ARCHITECTURE-RATIONALE.md` sha256 `8a24a5a7…` — the hashes the closing seat judged, unchanged when this lane began.

## Outcome

* **All 31 hand fixes are applied, none skipped.** The 31 required changes break into 74 sub-change rows in
  `handfix.py`: 73 applied and 1 carried. The carried row is VR3-01 (3), which the report itself folds into V-MAB3-08
  (ii)'s single F-EDIT insertion. No anchor was missing or ambiguous, so no sub-change was guessed or dropped.
* **The output differs from the input by exactly those rows, and otherwise by whitespace alone** (CONFIRMED by an
  independent second implementation, `verify-normalised.py`). Code fences are still balanced, the heading count is
  unchanged (145 document / 141 rationale), and every table row keeps its header's cell count.
* **References:** there are no new broken references. Every §, J, D, II and T id in the 73 new texts resolves. The
  judgment index and Part A now hold 471 ids each (J-A30.25 added), with no orphans.
* **Document checks:** the change adds 6 hits (4 C3, 2 C4). Each was reviewed and none is copied text; they are now
  allow rows in `docs/validation/doc-checks-allow.tsv`. The final runs exit 0.
* **Parts touched:** model (§2.5, §2.6), kernel (J-A28.33's index row only; §3's text is unchanged), pipeline (§4.7,
  §10.2, II.6), determinism (§5.2, §5.3, §6.3, §7.1, §7.3, §7.4, §7.7) and scope (§0.2, §13.1, §13.2, §13.8, §16, the
  Judgment-calls index, Staged), plus the rationale's Part A. The rendering part was not touched.

## Method

`docs/validation/amendments-b/handfix/handfix.py` holds each sub-change as one data row: (n, id, part, sub, file, kind,
anchor, text[, scope]). The kinds are:

* `replace`, `insert_after` and `insert_line` (a new table row after the one row starting with the anchor);
* `append_entry` (text added at the end of one Part A entry);
* `j_row` and `rat_a` (a new index row and a new Part A entry, each placed after its table's last row, as the BLOCK
  PROTOCOL places them);
* `carried` (no edit of its own).

The script works in four steps:

1. **Pre-check, before any write.** Every anchor is counted on the original files. It must occur exactly once, inside
   its scope when it has one; the scoped anchors also occur once in the whole file. Every quoted anchor and every new
   text must also be a verbatim substring of closing-report §2, which checks this seat's transcription. The result
   was 74 / 74.
2. **Apply in order.** The rows are applied in the report's order on the evolving text, and each anchor is counted
   again at that point.
3. **Count the results.** Each applied text is counted in the result, and each occurs once.
4. **Write once.** Both files are written a single time, guarded by their input hashes.

**The one reading this seat made: soft line breaks.** The document is hard-wrapped, and the report quotes each string
on one line; the closing seat's probe normalised whitespace. So 19 anchors, as quoted, sit across a line break in the
file. In the matcher, each single space of a quoted string matches either a space or one soft line break with its
indentation. It never matches a blank line, so it can never cross a paragraph break. Every other character must match
exactly.

Across the 16 replaced strings, 20 soft breaks were handled. 11 were carried to the same words of the new text, where
the words before the break (or after it) are shared. The other 9 were joined, so two lines became one. A soft break
renders as a space, so a join changes nothing a reader sees. The 3 insert-after anchors keep their breaks. None of
this whitespace handling touched a code fence: the five fenced edits (§2.5's `Passage.headroomCm`, `Wing.spans`, the
§7.1 `revert` comment, and §10.2's `structures` and `basementAccess`) had no break.

**Anchors this seat located itself** (the report names the place but quotes no string there):

* #8: the new §5.3 row goes after the line starting "| the interior ladder (item 28 (f), §2.6):".
* #11 (1): "append" to the setAttr row's undo cell was placed after that cell's last words, "the text it replaces kept
  in that event's undo record", inside that row.
* The six Part A "append" changes (#5 (iv), #14 (v), #15 (3), #18 (iii), #21 (2), #26 (2)) go at the end of the entry
  whose id cell is named, before its closing " |".
* The report's three ellipsis-prefixed anchors (#15 (1), #25 (1), #30) were matched without the "…", as the closing
  seat noted they should be.

## The 31, in apply order

| n | id (merged ids) | owner part | applied / skipped and why | sub-changes (file line of the applied text, final) | sections changed |
|---|---|---|---|---|---|
| 1 | VP3-04 | pipeline | applied (4 of 4 sub-changes); 3 anchor(s) across a soft line break | (1) §10.2 (doc l. 8911); (2) §4.7 (doc l. 4672); (3) §4.7 (doc l. 4675); (4) §4.7 (doc l. 4678) | §10.2, §4.7 |
| 2 | VP3-01 (= VD3-02) | pipeline | applied (3 of 3 sub-changes); 1 anchor(s) across a soft line break | (1) §4.7 Households per building (doc l. 4684); (2) J-A28.46 index row (doc l. 12973); (3) J-A28.46 Part A (rat l. 513) | §4.7, Judgment-calls index, Part A |
| 3 | VD3-01 (= VP3-02) | determinism | applied (2 of 2 sub-changes) | (1) §5.2 F-SITING ladder cell (doc l. 5633); (2) §5.2 F-SITING test cell (doc l. 5633) | §5.2 |
| 4 | VS3-04 (= VD3-12 (2), VP3-03) | scope | applied (3 of 3 sub-changes) | §13.2 T19-4 (doc l. 10330); §16 M3a exit (doc l. 11358); §16 M2b exit (doc l. 11357) | §13.2, §16 |
| 5 | V-MAB3-01 (= VD3-11, VP3-07) | model | applied (4 of 4 sub-changes) | (i) §2.6 capacity bullet (doc l. 1488); (ii) §2.6 capacity bullet (doc l. 1491); (iii) J-A28.23 index row (doc l. 12817); (iv) J-A28.23 Part A (rat l. 357) | §2.6, Judgment-calls index, Part A |
| 6 | V-MAB3-08 | determinism | applied (2 of 2 sub-changes); 1 anchor(s) across a soft line break | (i) §7.3 item 4 (doc l. 6885); (ii) §5.2 F-EDIT detection (with VR3-01 (3)) (doc l. 5641) | §7.3, §5.2 |
| 7 | VR3-01 | model | applied (5 of 6 sub-changes; 1 carried by #6 (ii), as the report instructs) | (1) §2.5 Passage (doc l. 877); (2) §7.1 Entrances, basements, passages and plans (doc l. 6547); (3) §5.2 F-EDIT detection; (4) §13.2 T30-4 (doc l. 10416); (5) J-ROWS (doc l. 12977); (6) RATIONALE-A (rat l. 517) | §2.5, §7.1, §13.2, Judgment-calls index, Part A |
| 8 | VD3-05 (= V-MAB3-07) | determinism | applied (1 of 1 sub-changes) | §5.3 row after the interior-ladder row (doc l. 5666) | §5.3 |
| 9 | VD3-06 (= V-MAB3-10) | determinism | applied (1 of 1 sub-changes); 1 anchor(s) across a soft line break | §7.1 Entrances, basements, passages and plans (doc l. 6555) | §7.1 |
| 10 | VD3-07 | determinism | applied (1 of 1 sub-changes) | §7.3 stored-plan row, first cell (doc l. 6747) | §7.3 |
| 11 | VD3-08 | determinism | applied (3 of 3 sub-changes) | (1) §7.4 setAttr / setAttrMany / paint row, undo cell (appended at its end) (doc l. 6978); (2) §7.4 moveVertex / warp row, undo cell (doc l. 6979); (3) §7.4 editTable / editPreset row, undo cell (doc l. 6995) | §7.4 |
| 12 | V-MAB3-09 | determinism | applied (1 of 1 sub-changes) | §7.3 item 1 (doc l. 6694) | §7.3 |
| 13 | VS3-05 (= VD3-12 (1), (3), V-MAB3-06) | scope | applied (5 of 5 sub-changes) | (1) §13.2 T28-18 (doc l. 10404); (2) §13.8 (doc l. 10865); (3) §16 M3a exit (doc l. 11358); (4) §16 M3a content (doc l. 11358); (5) J-A28.01 Part A (restated-row swap; index unchanged) (rat l. 474) | §13.2, §13.8, §16, Part A |
| 14 | V-MAB3-02 (= VR3-02) | model | applied (5 of 5 sub-changes); 3 anchor(s) across a soft line break | (i) §2.6 capacity bullet (doc l. 1472); (ii) §2.6 Wing.spans (doc l. 987); (iii) §2.6 stage-3 contract (doc l. 1258); (iv) §2.6 intake bullet (doc l. 1278); (v) J-A28.28 Part A (rat l. 492) | §2.6, Part A |
| 15 | VK3-01 | model | applied (3 of 3 sub-changes) | (1) §2.6 stage-3 contract (doc l. 1266); (2) J-A28.26 index row (doc l. 12820); (3) J-A28.26 Part A (rat l. 360) | §2.6, Judgment-calls index, Part A |
| 16 | V-MAB3-03 | model | applied (1 of 1 sub-changes); 1 anchor(s) across a soft line break | §2.6 step 5 (doc l. 1402) | §2.6 |
| 17 | VS3-07 (= V-MAB3-11) | scope | applied (1 of 1 sub-changes); 1 anchor(s) across a soft line break | §13.2 T28-2 (doc l. 10368) | §13.2 |
| 18 | V-MAB3-04 | model | applied (3 of 3 sub-changes); 1 anchor(s) across a soft line break | (i) §10.2 RoomProgramRow (doc l. 8991); (ii) §2.6 step 3 (doc l. 1381); (iii) J-A29.25 Part A (rat l. 508) | §10.2, §2.6, Part A |
| 19 | V-MAB3-05 | model | applied (1 of 1 sub-changes); 1 anchor(s) across a soft line break | §2.6 re-cut bullet (doc l. 1511) | §2.6 |
| 20 | VS3-08 (= V-MAB3-12) | scope | applied (1 of 1 sub-changes); 1 anchor(s) across a soft line break | §13.2 T28-15 (doc l. 10397) | §13.2 |
| 21 | VP3-05 | pipeline | applied (2 of 2 sub-changes); 1 anchor(s) across a soft line break | (1) II.6 (doc l. 11944); (2) J-A11.43 Part A (rat l. 510) | II.6, Part A |
| 22 | VD3-10 (= VP3-06) | determinism | applied (1 of 1 sub-changes); 1 anchor(s) across a soft line break | §6.3 JOIN and SPLIT bullet (doc l. 6202) | §6.3 |
| 23 | VS3-03 | scope | applied (1 of 1 sub-changes) | §13.2 T11-1 (doc l. 10297) | §13.2 |
| 24 | VD3-03 | determinism | applied (3 of 3 sub-changes); 1 anchor(s) across a soft line break | (1) §7.7 item 2 (doc l. 7393); (2) J-A20.75 index row (doc l. 12940); (3) J-A20.75 Part A (rat l. 480) | §7.7, Judgment-calls index, Part A |
| 25 | VD3-04 | determinism | applied (7 of 7 sub-changes); 2 anchor(s) across a soft line break | (1) §7.4 Replay semantics (doc l. 6971); (2) §7.4 Targets (doc l. 7034); (3) §7.1 revert comment (doc l. 6447); (4) §7.7 item 6 (doc l. 7437); (5) §5.2 F-EDIT detection (doc l. 5641); (6) J-A22.76 index row (doc l. 12967); (7) J-A22.76 Part A (rat l. 507) | §7.4, §7.1, §7.7, §5.2, Judgment-calls index, Part A |
| 26 | VD3-09 | determinism | applied (2 of 2 sub-changes) | (1) §5.2 F-PLAN tier 2 (doc l. 5635); (2) J-A28.73 Part A (rat l. 506) | §5.2, Part A |
| 27 | VP3-08 | determinism | applied (1 of 1 sub-changes) | J-A28.51 Part A (rat l. 336) | Part A |
| 28 | VK3-02 | kernel | applied (1 of 1 sub-changes) | J-A28.33 index row (restated-row swap) (doc l. 12813) | Judgment-calls index |
| 29 | VS3-01 | scope | applied (3 of 3 sub-changes) | §0.2 row 20 (doc l. 151); §16 M4 (doc l. 11360); Staged evolution row (doc l. 12996) | §0.2, §16, Staged by the owner's roadmap |
| 30 | VS3-02 | scope | applied (1 of 1 sub-changes) | J-A16.01 Part A (restated-row swap; index unchanged) (rat l. 466) | Part A |
| 31 | VS3-06 (= VK3-03) | scope | applied (1 of 1 sub-changes) | §13.1 (doc l. 10081) | §13.1 |

## Archive, hashes, sizes

| file | sha256 | bytes | lines |
|---|---|---|---|
| `docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (read-only) | `1a861c729f26ba997ae78222d867f715dac2bb77d15e3e8128c661b4f25a3817` | 1 618 241 | 13 028 |
| `docs/archive/ARCHITECTURE-RATIONALE-pre-handfix-b-2026-09-27.md` (read-only) | `8a24a5a7b571946047c14063b5ad1f29298b9d327ba6796bcde1fb17611fec3f` | 448 374 | 2 051 |
| `docs/ARCHITECTURE.md` after | `5d752c9b872f56e1ace7bb29b7b1955521899df9e134af5921037b3efae1edb1` | 1 629 203 (+10 962) | 13 021 (−7: 9 soft breaks joined, +1 §5.3 row, +1 index row) |
| `docs/ARCHITECTURE-RATIONALE.md` after | `6147750844eeaaf6af4e9ab660d39eb237f394e715d625f5f6eb275dc958589d` | 451 973 (+3 599) | 2 052 (+1 Part A entry) |

The files written are byte-identical to the dry run that was verified (`cmp`). The run log is
`docs/validation/amendments-b/handfix/apply-log.json`.

## Verification

* **`verify-normalised.py`** (this folder) re-applies the rows by a second, simpler route. It applies the line-level
  rows to the original lines, then applies every replace and insert-after on whitespace-collapsed text, where each
  collapsed anchor must occur once. It then compares the result with the collapsed output. Both files came out equal
  ("VERIFY OK"). The same script checked structure: fences balanced, headings 145 → 145 and 141 → 141, and 0 table
  rows off their header's cell count, before and after.
* **References.** `docs/validation/amendments-b/refs.py` on the new document found 139 headings, 35 D ids, 471 J ids
  and 2 flags. Both flags pre-exist unchanged and are citations of outside documents, not references into this one: an
  outside file's §2.1.4 and RFC 7946 §3.1.6. That makes 0 broken references and 0 to fix. Each new text was then
  checked id by id against the new files, and all resolve: every § or continuation number against the document's
  headings, every J id in both the index and Part A (for example J-A20.72, J-A20.42 and J-P48), every II.n, D-n, and
  T-id with its defining "(Tn-m)". The rationale's § pointers, resolved against the document's headings, leave 17
  unresolved before and 17 after, all pre-existing (0 added). Two pointers the new text makes were also checked by
  reading: step 3's "`trapdoor` fallback above" exists in §2.6 step 3, and "step 4's wing-local modules" matches step
  4's "wing-local module".
* **Document checks** (`doc_checks.py`, three copies against one corpus snapshot; the untouched copy was run before and
  after the others with identical counts, so the corpus held still):

| keys | untouched | mine | combined (the live file) |
|---|---|---|---|
| changed subsections: 0.2, 2.5, 2.6, 4.7, 5.2, 5.3, 6.3, 7.1, 7.3, 7.4, 7.7, 10.2, 13.1, 13.2, 13.8, 16, II.6, Judgment calls, Staged | C3 540 / C4 6, 0 unreviewed, exit 0 | C3 542 / C4 8: 4 + 2 unreviewed before review; after the allow rows, exit 0 | the same as mine (no other writer) |
| top-level: 0, 2, 4, 5, 6, 7, 10, 13, 16, PART II, Judgment calls, Staged | C3 960 / C4 7, exit 0 | C3 962 / C4 9, 0 unreviewed, exit 0 | the same, exit 0 |

  C1 (5), C2 (0), S1 (0) and S2 (0) are unchanged. The six new hits, each reviewed and now an allow row:

  * **Three chance matches.** The C3 runs "2 of the plot s" (#1 (2)), "root of the basement s" (#16) and "wing to the
    plan rung" (#15 (1)) are stitched: none occurs contiguously in any findings file or any JSON file under research/
    or captures/.
  * **One moved boundary.** "stair core doors on every storey it serves" is the tail of the already-reviewed hit "item
    29 5 stair core doors…" (allow row by amendments-b/assemble-r0). #16's clause now sits inside that run and splits
    it.
  * **Two C4 lines that gained one word each.** Only one word on each line is new: "pass" on §16's M3a row (#13 (4)),
    and "hearth" on §5.2's F-PLAN row (#26 (1)). The other four words of each hit were already on those long rows, in
    unrelated clauses.

## Parts touched (keys)

* **model:** §2.5 and §2.6 (#5, #7, #14, #15, #16, #18, #19), the new J-A30.25, and the Part A entries J-A28.23,
  J-A28.26, J-A28.28 and J-A29.25.
* **kernel:** J-A28.33's index row (#28) only.
* **pipeline:** §4.7, §10.2 and II.6 (#1, #2, #18 (i), #21), and J-A28.46 and J-A11.43.
* **determinism:** §5.2, §5.3, §6.3, §7.1, §7.3, §7.4 and §7.7, and J-A20.75, J-A22.76, J-A28.51 and J-A28.73.
* **scope:** §0.2, §13.1, §13.2, §13.8, §16, the Judgment-calls index and Staged, and J-A16.01 and J-A28.01.
* **rendering:** none.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk):

* The archive hashes, and the input hashes matching the closing seat's.
* The 74 anchors each found once on the original, every quoted string verbatim in the report, and 73 rows applied and
  1 carried, with 0 skipped.
* Each applied text found once in the result, and the independent collapsed re-application equal to the output.
* The fences, headings and table cell counts.
* The references and the document-check counts above.

**PLAUSIBLE:**

* That the texts the closing seat ruled, once installed, leave no new defect. This seat applied the ruled wording and
  judged none of it. The closing report asks for one verification of the touched subsections (§2.5, §2.6, §4.7, §5.2,
  §5.3, §6.3, §7.1, §7.3, §7.4, §7.7, §10.2, §13.1, §13.2, §13.8, §16, §0.2, II.6, Staged, the index and Part A)
  before the pass is called closed.
* That joining 9 soft breaks is invisible. It is by Markdown's rules, but it was not rendered.

## Files

* `docs/validation/amendments-b/handfix/handfix.py`: the rows and the engine (`--check`, dry run, `--write`).
* `docs/validation/amendments-b/handfix/verify-normalised.py`: the independent check.
* `docs/validation/amendments-b/handfix/apply-log.json`: every row, with its counts, its line and the soft-break notes.
* `docs/validation/amendments-b/handfix/apply.md`: this file.
* `docs/ARCHITECTURE.md` and `docs/ARCHITECTURE-RATIONALE.md`: written once.
* `docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` and
  `docs/archive/ARCHITECTURE-RATIONALE-pre-handfix-b-2026-09-27.md`.
* `docs/validation/doc-checks-allow.tsv`: 6 rows appended (block handfix-b/apply).
