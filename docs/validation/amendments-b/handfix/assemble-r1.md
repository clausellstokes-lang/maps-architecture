# handfix-b/assemble-r1 — the mechanical assembler of the hand-fix repair round 1

> PENDING FABLE REVIEW — Opus-produced (handfix-b/assemble-r1).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM archive: planned docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-repair-r1-2026-09-27.md, chmod a-w; allow TSV + queue copied to scratchpad handfix/asm1/ | done 13:23 (both cmp-identical, 5d752c9b… / 61477508…, read-only)
ITEM apply: planned apply-blocks.py on the four repair-r1-*.md (name order) twice, byte-identical | done 13:24 (19/19 applied, 0 skipped, 0 truncated, audit not-OK 0; two runs byte-identical)
ITEM hand-off: planned handfix/assemble-r1-handoff.py — restated-row swap (ids asserted against the four hand-offs) + model H1 (§7.3 item 1), H2 (§13.2 T8-3) | done 13:24 (7 index + 3 Part A swaps, sets asserted; H1 l. 6692, H2 l. 10282; two runs byte-identical)
ITEM audit + install: planned post-hand-off audit, live hashes checked (5d752c9b… / 61477508…), install | done 13:25 (audit 0 problems, 472/472 rows, 41 changed lines = the seats' predicted lines exactly + J-A30.26 row; installed doc e9c0b828…, rationale dcabf14b…)
ITEM refs: planned refs.py on installed doc vs archive | done 13:25 (broken 2 = 2 pre-existing external, J ids 471 -> 472; changed Part A rows all resolve)
ITEM doc checks: planned three copies (untouched archive / installed / combined = installed) on changed top-level keys; scope's allow rows | done 13:37 (+4 C3 hits: 2 reviewed by pipeline's row, 2 by scope's proposed rows appended; installed exit 0; untouched stable x3)
ITEM report + queue row + LANDED | done 13:40

Lane `handfix-b/assemble-r1`, 2026-09-27 13:22–13:40, opus, a mechanical seat. Every change to the design documents
was made by a script (`apply-blocks.py`, then `handfix/assemble-r1-handoff.py`); no section text was edited by hand.
Input: `docs/ARCHITECTURE.md` sha256 `5d752c9b…` and `docs/ARCHITECTURE-RATIONALE.md` `61477508…` (handfix-b/apply's
output, the state the four repair seats built their blocks on; unchanged when this lane began).

## Outcome

* **All 19 blocks of the four `handfix/repair-r1-*.md` files are applied; none skipped.** 13 REPLACE blocks on 13
  distinct headings, 3 J-ROWS blocks (8 index rows) and 3 RATIONALE-A blocks (4 Part A entries). No file was truncated
  (each ends with `=== END ===`), no header was malformed, no heading was missing, no text stood outside a block, and
  no heading was replaced twice.
* **The seats' hand-offs are applied by script.** 7 restated index rows and 3 restated Part A entries were moved into
  the older rows' places and the older rows deleted; the swapped ids are asserted equal to the hand-offs' lists. The
  model seat's two one-string substitutions landed once each: H1 in §7.3 item 1 (determinism's block) and H2 in §13.2
  T8-3 (scope's block).
* **The change is exactly what the seats predicted.** Against the archive, the document changes 41 lines in 38 hunks,
  plus one inserted row (J-A30.26). The 41 lines equal the union of the line lists the four seats reported from their
  dry runs, with nothing missing and nothing extra. The rationale changes 3 entries in place (J-A28.26, J-A16.01,
  J-A28.46) and gains 1 (J-A30.26).
* **References:** 2 broken, the same 2 pre-existing external citations as before; 0 new. J ids 471 → 472.
* **Document checks** over the 8 changed top-level keys: the assembly adds 4 C3 hits and nothing else. 2 are "both ends
  of an interior" (II.6 and T11-1), already reviewed by the pipeline seat's allow row. 2 are the scope seat's foreseen
  runs, "one 2 6 step 3" and "side of the ring is"; its proposed rows were appended to the allow file after this lane
  re-checked them. Final run: exit 0.
* **Nothing needs a ruling from this lane.** The seats' own PLAUSIBLE items go to the verify round (§8).

## 1 Archive

* `docs/archive/ARCHITECTURE-pre-handfix-b-repair-r1-2026-09-27.md`: `cmp`-identical to the document before assembly,
  sha256 `5d752c9b872f56e1ace7bb29b7b1955521899df9e134af5921037b3efae1edb1`, 1 629 203 bytes, read-only.
* `docs/archive/ARCHITECTURE-RATIONALE-pre-handfix-b-repair-r1-2026-09-27.md`: `cmp`-identical to the rationale before
  assembly, sha256 `6147750844eeaaf6af4e9ab660d39eb237f394e715d625f5f6eb275dc958589d`, 451 973 bytes, read-only.
* Both names were new. The allow file and the review queue were copied to the scratchpad first; each was only appended
  to, and its old prefix is byte-identical (checked).

## 2 The scripts

* `docs/validation/amendments-b/apply-blocks.py` (unchanged) wrote the applied copies and
  `docs/validation/amendments-b/handfix/assemble-r1-apply-log.json`. Its only notes were "DUPLICATE ID inserted" on the
  restated rows, exactly the ids the hand-offs list.
* `docs/validation/amendments-b/handfix/assemble-r1-handoff.py` (new, stdlib only, never writes in place). It imports
  `docs/validation/amendments-b/assemble-r1-handoff.py`'s `block_rows` and `swap_restated` unchanged. Then:
  * it asserts the swapped id sets: index {J-A28.73 (determinism), J-A28.23, J-A28.26, J-A28.28, J-A29.25 (model),
    J-A28.46, J-A11.43 (pipeline)}; Part A {J-A28.26 (model), J-A28.46 (pipeline), J-A16.01 (scope)};
  * for H1 and H2 it asserts that the old string occurs once in the document and inside the named subsection, that the
    new string is absent, and that both strings are verbatim lines of the model block file's preamble.
  Its log, `docs/validation/amendments-b/handfix/assemble-r1-handoff-log.json`, holds every swapped-out row verbatim.
* Two full runs (apply, then hand-off) gave byte-identical outputs, logs and console output. The live files still had
  the input hashes when the outputs were installed at 13:25.

## 3 Blocks applied and skipped, per file

| block file | sha256 (first 16) | lines | blocks | applied | skipped | REPLACE targets | index rows | Part A entries |
|---|---|---|---|---|---|---|---|---|
| `repair-r1-determinism.md` | `ec93797900bd22d3` | 838 | 6 | 6 | 0 | §5.2, §6.3, §7.3, §7.4, §7.7 | 1 restated (J-A28.73) | 0 |
| `repair-r1-model.md` | `1918cbd9c83f65de` | 973 | 5 | 5 | 0 | §2.5, §2.6, §7.1 | 4 restated + J-A30.26 new | 1 restated (J-A28.26) + J-A30.26 new |
| `repair-r1-pipeline.md` | `3dc5fa228dab8841` | 393 | 5 | 5 | 0 | §10.2, §10.3, II.6 | 2 restated (J-A28.46, J-A11.43) | 1 restated (J-A28.46) |
| `repair-r1-scope.md` | `43dce04ec18735fb` | 549 | 3 | 3 | 0 | §13.1, §13.2 | 0 | 1 restated (J-A16.01) |
| **total** | | | **19** | **19** | **0** | 13 | 8 (7 restated, 1 new) | 4 (3 restated, 1 new) |

* **Skipped: none. Truncated: none. Malformed: none.** The preambles of the model, pipeline and scope files are ignored
  by the protocol, as intended.
* **Audit after the hand-off** (`asm1/audit.py`): every REPLACE body is present exactly once (§7.3's and §13.2's with
  H1 and H2 applied), and every J-ROWS and RATIONALE-A row once. No swapped-out row remains. Index 471 → 472 rows and
  Part A 471 → 472 entries, with the same id set, no duplicates, and the old ids in their old order. The one new id is
  J-A30.26 (model, VHM-02).
* **Headings 145 → 145, every heading line unchanged; fence lines 108 → 108, balanced.** The title block is
  byte-identical, there are 0 per-section PENDING FABLE REVIEW lines before and after, and the rationale outside Part A
  is byte-identical.
* **Hand-off lines in the installed text:** H1 at l. 6692 (§7.3 item 1), H2 at l. 10282 (§13.2 T8-3).

## 4 Sizes before and after

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 13 021 lines, 1 629 203 bytes, sha256 `5d752c9b…` | 13 021 lines, 1 636 552 bytes, sha256 `e9c0b828c9dd1779edea44c38d4af5d75e3bcbebca6e6932b0fba643926bf943` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 052 lines, 451 973 bytes, sha256 `61477508…` | 2 053 lines, 456 336 bytes, sha256 `dcabf14b0ce9b9b04d5903d4bdb34443f63ac74cc15e240f6f4fa26d005bef70` |
| `docs/validation/doc-checks-allow.tsv` | 1 576 lines | 1 579 lines (1 comment + 2 rows appended) |
| judgment index rows / Part A entries | 471 / 471 | 472 / 472 |

The document's line count is unchanged: one soft-wrapped pair in §2.6 became one line (model block), and J-A30.26's
index row was added.

## 5 Changed sections (exact heading lines, in document order)

* `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector` — model #1 (l. 876–877)
* `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface` — model #2 (l. 959, 965, 1266, 1386–1387 joined, 1480; 591 → 590 lines)
* `### 5.2 Failure classes: detection, ladder, test` — determinism #1 (l. 5641)
* `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)` — determinism #2 (l. 6202)
* `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation` — model #3 (l. 6547, 6588)
* `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)` — determinism #3 (l. 6694, 6887) + model H1 (l. 6693)
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8` — determinism #4 (l. 6971, 6986–6987, 6994, 7054)
* `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)` — determinism #5 (l. 7406)
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)` — pipeline #1 (l. 8911)
* `### 10.3 People, households, relations, sub-locations, schedules` — pipeline #2 (l. 9091)
* `### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test` — scope #1 (l. 10081)
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT` — scope #2 (l. 10208, 10297, 10330, 10334, 10339, 10368, 10371, 10416) + model H2 (l. 10283)
* `## II.6 The staged layers — floating islands and sewers: the hooks the base carries now` — pipeline #3 (l. 11944)
* `# Judgment calls ("chose X over Y because Z"; each vetoable)` — 7 index rows restated in place (J-A28.23 l. 12817, J-A28.26 12820, J-A28.28 12952, J-A28.73 12966, J-A29.25 12968, J-A11.43 12970, J-A28.46 12973), J-A30.26 appended
* Rationale `## Part A — …` — J-A28.26 (l. 360), J-A16.01 (l. 466), J-A28.46 (l. 513) restated in place; J-A30.26 appended (l. 518)

Line numbers are the archive's. The 8 changed top-level keys are §2, §5, §6, §7, §10, §13, PART II and Judgment calls.

## 6 References

* `docs/validation/amendments-b/refs.py` on the installed document gives 139 heading keys, 35 D ids, 472 J ids and **2
  broken references**: `os-geometry.md` §2.1.4 (external) and RFC 7946 §3.1.6. The archive gives the same 2 (471 J
  ids). No fix was needed.
* The four changed Part A entries: every J id and § pointer they cite resolves against the installed document
  (`asm1/rat-refs.txt`). S2 of the document checks reports 0.
* Cross-part probes (`asm1/crosspart-probes.txt`, whitespace-collapsed):
  * T20-2's epoch-undo wording is present 3 times (§7.4 row, §7.7 item 3, T20-2).
  * T11-1's and II.6's "each split `Frontage`'s one record" is present 2 times.
  * VHM-01 (3)'s T30-4 clause, VDH-05's §6.3 clause, H1 and H2 are each present once.
  * The retired texts ("an undo of the lapsing event restores the hold", "so its undo restores the hold",
    "a dwelling slot") are each present 0 times.

## 7 Document checks (three-copy method, one corpus snapshot)

Command: `python3 docs/validation/bench/doc_checks.py --sections "2,5,6,7,10,13,PART II,Judgment calls"`. The corpus
had 9 626 JSON files and 911 940 C3 3-grams in every run. "Mine" and "combined" are the same copy here: this lane's
change is the whole combination.

| run | copy | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched ×3 (before, between, after) | archive `5d752c9b…` | 5 / 0 | 0 / 0 | 745 / 0 | 6 / 0 | 0 / 0 | 0 / 0 | 0 |
| mine = combined, before the allow rows | installed `e9c0b828…` | 5 / 0 | 0 / 0 | 749 / 2 | 6 / 0 | 0 / 0 | 0 / 0 | 1 |
| **final, live, after the allow rows** | **installed** | **5 / 0** | **0 / 0** | **749 / 0** | **6 / 0** | **0 / 0** | **0 / 0** | **0** |

Cells are hits / unreviewed. The three untouched runs were identical, so the corpus held still.

* **The hits the change adds**, from a run of both copies with an empty allow file, diffed: exactly 4 C3 hits. C1 and
  C4 differ only by a one-line shift.
  * "both ends of an interior" ×2 (II.6 and T11-1): reviewed by handfix-b/repair-pipeline-r1's row.
  * "one 2 6 step 3" (T28-2) and "side of the ring is" (T28-3): the runs the scope seat foresaw. This lane re-checked
    them: neither occurs contiguously in any `research/findings/*.md` file or any JSON file under research/ or captures/
    (`asm1/contig.txt`). Both are ordinary English stitched from separate corpus 3-grams.
* **Allow rows.** The scope seat's two proposed rows were appended verbatim (its preamble, prefix stripped), under one
  comment line naming both seats. Its third proposed row, "both ends of an interior", was not repeated, because the
  pipeline seat's row already covers every occurrence.
* The 994 unreadable-JSON warnings (`captures/dwellings/*/network/bodies/*.json`) are identical in every run.

## 8 Notes for the verify round (no ruling needed from this lane)

The seats' own PLAUSIBLE items, which the verifiers should re-read on the assembled text:
1. **Model:** the clip-order argument for composed towers (J-A28.26 as amended; the report's §2.1), and the
   trace-and-tombstone ruling J-A30.26 (amends J-A30.25).
2. **Determinism:** that VDH-01 (5), (6) are complete. It left three texts unchanged: J-A20.74's Part A ("so that its undo
   restores the hold", read as history), §7.4's epoch-row undo cell, and §11.3's M3a test ("one owner undo through a
   chain among them"), which is outside determinism's sections.
3. **Pipeline:** the refinements of VPH-02 (1) ("its flag read as true") and VPH-03 (1), and the J-A28.46 precedence
   ruling (`liveIn` governs the `houses` cell).
4. **Scope:** one recorded deviation. VSH-04's pointer is written "(the storey rule of §2.6's stage-3 contract)".
5. **Provenance:** `repair-r1-pipeline.md` had sha256 `3dc5fa22…` at assembly. The model and determinism seats' combined
   dry runs cite `530dd858…`, an earlier state of that file. This had no effect: the audit found every block's text
   once, H1 and H2 each once in place, and the changed-line set equal to the seats' predictions.

## 9 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed).**
* The archives are `cmp`-identical to the input.
* 19 of 19 blocks were applied and 0 skipped, and two runs were byte-identical.
* The hand-off gave 7 + 3 swaps with the id sets asserted, and H1 and H2 landed once each in their subsections.
* The post-hand-off audit found 0 problems. The changed-line set equals the seats' predicted set, and the live hashes
  were checked before install.
* References: 2 broken, both pre-existing. The probes are as listed.
* The document checks exit 0, and the added hits are exactly the 4 listed.

**PLAUSIBLE (reasoning only).** The design content of the blocks is the seats' work, and judging it belongs to the
verify round. The same holds for the claim that the two new allow rows are chance matches beyond the contiguity grep.

**Receipts** (session scratchpad `…/scratchpad/handfix/asm1/`):
* the apply runs: `parse.txt`, `apply-run{1,2}.txt`, `apply-log{1,2}.json`;
* the hand-off runs: `handoff-run{1,2}.txt`, `handoff-log{1,2}.json`;
* the audit: `audit.py`, `audit-final1.{json,txt}`, `predicted-lines.txt`;
* the resolver: `refs-installed.*`, `refs-before.*`, `rat-refs.txt`;
* the probes: `crosspart-probes.txt`, `contig.txt`;
* the check runs: `dc-untouched{1,2,3}.txt`, `dc-mine1.txt`, `dc-noallow-{untouched,mine}.txt`, `dc-installed-final.txt`;
* the added allow rows: `allow-add.tsv`;
* the pre-change copies: `doc-before.md`, `rat-before.md`, `allow-before.tsv`, `queue-before.md`.
