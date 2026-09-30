# handfix-c/apply — the amendments-c closing hand fix applied (59 rows)

> Mechanical seat (opus), lane `handfix-c/apply`, 2026-09-28. Rows: `closing-handfix-rows.py` (this folder); rulings: `closing-report.md` §2–§3. PENDING FABLE REVIEW (inherits the closing seat's marker).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM verify-input: live hashes 70ddb6e3… / e138da23… | done (full sha256 matched EXPECT_DOC / EXPECT_RAT)
ITEM archive: both live files to docs/archive/*-pre-handfix-c-2026-09-28.md, cmp, chmod a-w | done
ITEM read: rows file whole, handfix.py engine whole, closing-report §2–§3 | done
ITEM scratch-apply: 59 rows on scratch copies, skip-and-record on bad anchors | done (59 applied, 0 skipped; byte-identical to the rows file's dry run and the closing seat's close-c/doc-P.md, rat-P.md)
ITEM install: scratch copies over live files, one move each | done (live hashes re-verified first; design 87588d34…, rationale db063efd…)
ITEM refs: resolver, broken == baseline 2 | done (2 before, 2 after, the same externals; no fix needed)
ITEM doc-checks: three-copy method, exit 0 | done (U, N, C, U2 exit 0; C3 1 186/0 -> 1 185/0; no correction, no allow row)
ITEM index: judgment index rows == Part A entries | done (735 = 735 before, 736 = 736 after, one id set)
ITEM validation-table: §Ac "Hand fix (2026-09-28)" | done (§Ac.4, l. 2199)
ITEM bundle: tools/bundle_architecture.py + --check | done (UP TO DATE, exit 0)
ITEM close-out: lane-events LANDED, progress.py --log | done (16:26)

## 1 Input and archive

| file | sha256 | bytes | lines (wc -l) |
|---|---|---|---|
| docs/ARCHITECTURE.md (live, before) | 70ddb6e302ea06c19891bdba707570963c39a4e2760150432c97fb2d8f4bf819 | 2 298 461 | 17 305 |
| docs/ARCHITECTURE-RATIONALE.md (live, before) | e138da2377d31b9fa9c1ae73ce7a64b1512a97f770c4b28c4d3844ad30aed16e | 672 652 | 2 316 |
| docs/archive/ARCHITECTURE-pre-handfix-c-2026-09-28.md | same as the live design (cmp identical), mode r--r--r-- | | |
| docs/archive/ARCHITECTURE-RATIONALE-pre-handfix-c-2026-09-28.md | same as the live rationale (cmp identical), mode r--r--r-- | | |

Neither archive path existed before this seat; both were copied with `cp -p`, compared with `cmp` (identical) and made read-only.

## 2 The rows applied

Engine: `docs/validation/amendments-c/handfix-apply.py` (this lane's wrapper; it imports the rows of `closing-handfix-rows.py` and the engine of `amendments-b/handfix/handfix.py` unchanged, and skips and records a row whose anchor is not found exactly once instead of refusing the run). Log: scratch `handfix-c/apply-log.json`, printed table `handfix-c/apply.out`.

* **59 of 59 rows applied, 0 skipped.** Every anchor was counted exactly once on the original file and again on the evolving text before its row was written; every new text occurs exactly once right after its row and again in the final result (whitespace-normalised count and the engine's soft-break pattern, both 1 for all 59).
* Soft line breaks: 10 anchors spanned soft breaks; 4 breaks were carried to the same words and 10 were joined (a soft break renders as a space; the engine logs each). With the 2 inserted lines (the J-A66.72 index row and §8.3's island-shadow row), the design loses 8 lines net.
* Cross-checks: the result is byte-identical to the rows file's own dry run (`closing-handfix-rows.py --out-doc … --out-rationale …`, exit 0, "59 rows, 0 failing") and to the closing seat's dry run (`close-c/doc-P.md`, `close-c/rat-P.md`).
* Headings 147 and fence lines 130 before and after; every heading line is unchanged.
* Install: the live hashes were re-verified (70ddb6e3…, e138da23…) immediately before; each scratch copy was copied into `docs/` as a temporary file and renamed over its live file in one `mv`, then compared with `cmp` (identical).

| file | before sha256 | after sha256 | bytes | lines (wc -l) |
|---|---|---|---|---|
| docs/ARCHITECTURE.md | 70ddb6e3… | 87588d349c3da25575e915034412627bb4671c9b4696d74675b42d7f7316c31d | 2 298 461 → 2 304 442 | 17 305 → 17 297 |
| docs/ARCHITECTURE-RATIONALE.md | e138da23… | db063efd3e73f682730e607be93ad2d15e64837a36229a1810ae4b97080e9693 | 672 652 → 675 351 | 2 316 → 2 317 |

## 3 References (`docs/validation/amendments-b/refs.py <document> <out.json>`, outputs in scratch)

| document | headings | D ids | J ids | broken |
|---|---|---|---|---|
| untouched archive | 141 | 35 | 732 | 2 |
| installed design | 141 | 35 | 733 | 2 |

The 2 broken references are the same baseline external citations before and after: `os-geometry.md` §2.1.4 (EXT) and
RFC 7946 §3.1.6 (the resolver marks it "int", but it is the RFC's own section). No mechanical fix was needed. A
case-insensitive scan (every `J-…` token cited in the design against every `| J-… |` row id) finds no cited id
undefined, before or after. T66-6 is defined once in §13.2 ("(T66-6) a `drawBoundary` …") and cited in §0.2 row 66,
§16 M4 and J-A66.01.

## 4 Document checks (`docs/validation/bench/doc_checks.py`, allow file `docs/validation/doc-checks-allow.tsv`)

Keys: `--sections "0,2,4,5,6,7,8,10,12,13,16,PART II,Judgment calls"` — every top-level key a doc row touched (from the
apply log's headings; the same 13 keys the closing seat used). The five runs were launched together at 16:20 and
finished at 16:23; the untouched copy was run again afterwards (U2) to bracket the corpus. All six runs read one
snapshot: identical headers without `colour_files` (9 626 JSON files, 916 788 3-grams, 478 C4 lists) and identical
stderr (994 unreadable-JSON warnings for pre-existing captures). Cells read hits / unreviewed.

| run | document | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| U | untouched archive `70ddb6e3…` | 5 / 0 | 0 / 0 | 1 186 / 0 | 9 / 0 | 0 / 0 | 0 / 0 | 0 |
| **N** | **installed design `87588d34…`** | **5 / 0** | **0 / 0** | **1 185 / 0** | **9 / 0** | **0 / 0** | **0 / 0** | **0** |
| C | combined copy (scratch, byte-identical to N: this lane is the only writer, so mine = combined) | 5 / 0 | 0 / 0 | 1 185 / 0 | 9 / 0 | 0 / 0 | 0 / 0 | 0 |
| U2 | untouched archive, after the others | 5 / 0 | 0 / 0 | 1 186 / 0 | 9 / 0 | 0 / 0 | 0 / 0 | 0 |

The counts equal the closing seat's dry-run receipts (`dc-U.out` 1 186 / 0, `dc-P.out` 1 185 / 0). No mechanical
correction and no allow row was needed; the allow file is unchanged.

**Rationale file (information only, outside §17.1 (2)'s gate; whole file, S2 resolved against the matching design).**
Untouched: C3 515 / 336, C4 9 / 9, S2 17 / 15. Installed: C3 514 / 335, C4 10 / 10, S2 17 / 15. Two unreviewed C3 hits
left with J-A68.93's old wording ("and a building s footprint", "footprint with the building s"). Two were added, both in
the closing seat's own wording: C3 "2 1 4 11 and" (J-A66.72's "which §2.1, §4.11 and II.7.6 now say") and C4 "hall hill
keep ring tower" (J-A68.93's restated reason, l. 780). They read as coincidences with the corpus, the same kind as the
file's standing hits. As at assemble-r3 §7, they are listed here for the next round and were not edited by this
mechanical seat.

## 5 The judgment index and Part A

| | index rows (`# Judgment calls`) | Part A entries | same id set | duplicates |
|---|---|---|---|---|
| before (archive) | 735 | 735 | yes | 0 / 0 |
| after (installed) | 736 | 736 | yes | 0 / 0 |

J-A66.72 is the one new id, once in each. The brief's "736 = 736 before" is the closing seat's figure, which it measured
on its dry-run result, so it is the after value; assemble-r3 also recorded 735 = 735 on the input.

## 6 The validation record and the bundle

* `docs/ARCHITECTURE-VALIDATION.md`: appended `### §Ac.4 Hand fix (2026-09-28)`, a paragraph and a 19-row table (issue id,
  sections changed), at the end of the §Ac section (l. 2199; the file went from 2 197 to 2 234 lines).
* `python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md` (17 346 lines from 1 source; it had been stale
  since 03:52). Then `--check` printed "UP TO DATE", exit 0. The bundle carries the design's new sha256.

## 7 Not done, and CONFIRMED versus PLAUSIBLE

* Nothing in the brief was left undone. No row was skipped, and no design text was edited outside the 59 rows.
* CONFIRMED (executed this lane): the input hashes; the archives identical and read-only; 59/59 rows applied with the
  anchor and new-text counts; byte-identity with both dry runs; the install; the resolver (2 = baseline); the doc checks
  (exit 0, one snapshot); the index = Part A counts; the bundle check.
* PLAUSIBLE: the content of the 19 changes. The closing seat's rulings (§3 of its report) are carried as written, and no
  verifier has re-read the installed result. PENDING FABLE REVIEW, per the closing report's §6.
