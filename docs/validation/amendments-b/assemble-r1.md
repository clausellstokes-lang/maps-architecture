# assemble-r1 — lane amendments-b/assemble-r1 (the mechanical assembler of amendments-b repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/assemble-r1).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 archive: done 06:59 (docs/archive/ARCHITECTURE-pre-amendments-b-repair-r1-2026-09-27.md sha256 87d89692…, docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r1-2026-09-27.md sha256 3f39b2de…, both cmp-identical, read-only; validation 3d505352… and allow TSV affdac02… copied to the scratchpad)
> STEP 1 apply + hand-off: done 06:59 (apply-blocks.py 94/94 applied, 0 skipped, audit not-OK 0; assemble-r1-handoff.py: 23 index + 27 Part A restated rows swapped into place, VS-40 paragraph swapped, 3 rendering substitutions; two runs byte-identical)
> STEP 2 audit + install: done 07:00 (post-hand-off audit 94 blocks present once, 0 problems, 459/459 rows, 0 duplicate ids; live hashes checked 87d89692…/3f39b2de… then installed: doc 365e19f2…, rationale 50a94f2d…; logs assemble-r1-apply-log.json, assemble-r1-handoff-log.json)
> STEP 3 references: done 07:02 (refs.py on the installed doc: 139 heading keys, 35 D ids, 459 J ids, 2 broken = the 2 pre-existing external citations; 0 fixes)
> STEP 4 document checks: done 07:10 (25 keys; run 0: C3 1302/209, C4 10/1, exit 1; 142 repair rows + 57 assembler rows appended, 1355 -> 1556 lines; run 1: C1 5/0, C2 0/0, C3 1302/0, C4 10/0, S1 0/0, S2 0/0, exit 0)
> STEP 5 changelog: done 07:13 (docs/ARCHITECTURE-VALIDATION.md: '### §Ab.1 Repair round 1 applied (2026-09-27)' appended inside §Ab — a paragraph, a legend and 230 issue rows, 4 cells each; 1174 -> 1433 lines, the first 1174 unchanged)
> STEP 6 this report complete: done 07:15
> STEP 7 Fable queue row + LANDED line: done 07:15 (row B-amendments-b/assemble-r1 appended to docs/FABLE-REVIEW-QUEUE.md, PENDING; LANDED line in docs/lane-events.log)

Lane `amendments-b/assemble-r1`, 2026-09-27 06:58–07:15. Status: COMPLETE. A mechanical seat: every change to the
design documents was made by a script (`apply-blocks.py`, then `assemble-r1-handoff.py`), and no section text was edited
by hand.

## Outcome

All 94 blocks of the six `docs/validation/amendments-b/repair-r1-*.md` files are applied and none was skipped: 82 REPLACE
blocks, each on a distinct heading (no heading was replaced twice), 6 J-ROWS blocks (50 index rows) and 6 RATIONALE-A
blocks (54 Part A entries). No file was truncated (each ends with `=== END ===`), no header was malformed and no heading
was missing. The seats' hand-offs were applied by script: the 23 restated index rows and 27 restated Part A entries were
moved into the older rows' places and the older rows deleted; the paragraph under `# Judgment calls` was swapped for
scope's VS-40 text (4 lines to 5); and the rendering seat's three one-string substitutions were made. The audit after the
hand-off finds every block's text in the document exactly once (three REPLACE bodies after their hand-off substitution),
459 index rows and 459 Part A entries with the same id set, and no duplicate id.

The resolver finds 2 broken references, the same two external citations the document had before; no fix was needed.
The document checks over the 25 changed top-level keys exit 0 (C1 5/0, C2 0/0, C3 1 302/0, C4 10/0, S1 0/0, S2 0/0)
after 142 reviewed rows handed off by the repair seats and 57 of this seat's review. The changelog is
`docs/ARCHITECTURE-VALIDATION.md` "### §Ab.1 Repair round 1 applied (2026-09-27)", with one row per issue for all 230
issue ids of the six verify-r0 reports.

**Nothing needs a ruling from this lane.** One item goes to the verify round (§8 (1)): a cross-part note of the scope seat
that no seat applied.

## 1 Archive

* `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r1-2026-09-27.md` — `cmp`-identical to the document before assembly;
  sha256 `87d8969209c7deb59ab7e112bf9578c06f7ac67a7deaa42b7973599f30cc0429`, 1 503 967 bytes, 12 417 lines; read-only.
* `docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r1-2026-09-27.md` — `cmp`-identical to the rationale file
  before assembly; sha256 `3f39b2de60c977419b06583592a3aeb4011ab9b6221d9d148dcf133047e63685`, 383 760 bytes; read-only.
* No existing archive file was touched. The validation file and the allow file were copied to the session scratchpad
  (`asm1/validation-before.md`, `asm1/allow-before.tsv`), and both were only appended to (their old prefixes are
  byte-identical, checked with `cmp`).

## 2 The scripts

* `docs/validation/amendments-b/apply-blocks.py` (assemble-r0's applier, unchanged) wrote the applied copies and the log
  `docs/validation/amendments-b/assemble-r1-apply-log.json`. It reported the restated rows as "DUPLICATE ID inserted",
  exactly the ids the five seats' hand-offs list, and no other note.
* `docs/validation/amendments-b/assemble-r1-handoff.py` (new, stdlib only, never writes in place) applied the hand-off. It
  swaps each id that occurs exactly twice in the index or in Part A, and it stops unless the later row is a row of one of
  the block files. It swaps the VS-40 paragraph only if the four OLD lines occur exactly once. It makes each substitution
  only if the old string occurs exactly once and the new one not at all. Its log is
  `docs/validation/amendments-b/assemble-r1-handoff-log.json`, and it holds every swapped-out row verbatim.
* Two full runs (apply, then hand-off) gave byte-identical outputs. The live files still had the base hashes
  `87d89692…` / `3f39b2de…` when the outputs were installed at 07:00.

## 3 Blocks applied and skipped, per file

| block file | sha256 (first 16) | lines | blocks | applied | skipped | REPLACE | J-ROWS rows | Part A entries |
|---|---|---|---|---|---|---|---|---|
| `repair-r1-determinism.md` | `6091a11fc1567386` | 1791 | 16 | 16 | 0 | 14 | 14 | 14 |
| `repair-r1-kernel.md` | `0af1ca284cdedb52` | 832 | 8 | 8 | 0 | 6 | 3 | 5 |
| `repair-r1-model.md` | `33e27d742e760a58` | 1632 | 9 | 9 | 0 | 7 | 7 | 7 |
| `repair-r1-pipeline.md` | `8cb73e35a5f9fe3c` | 2752 | 20 | 20 | 0 | 18 | 10 | 10 |
| `repair-r1-rendering.md` | `3fa5953c7bfc7fb3` | 1654 | 18 | 18 | 0 | 16 | 9 | 9 |
| `repair-r1-scope.md` | `ff370304b4323884` | 2123 | 23 | 23 | 0 | 21 | 7 | 9 |
| **total** | | | 94 | 94 | 0 | 82 | 50 | 54 |

* **Skipped:** none. **Truncated files:** none. **Malformed headers:** none. **Text outside blocks:** none (the preambles
  are ignored by the protocol).
* **Two REPLACEs of one heading:** none. `### 3.8` is replaced by the rendering file (VK-24's pointer); no other file
  writes it.
* **Restated rows swapped into place.** In the index there are 23: determinism J-DET-2, J-DET-6, J-A20.74, J-A25.61,
  J-A28.61 and J-A30.71; kernel J-A21.31 and J-A30.31; pipeline J-A20.41, J-A23.41, J-A26.43, J-A28.42, J-A31.43, J-A31.44
  and J-A31.48; rendering J-A28.83, J-A28.84 and J-A30.83; scope J-A16.01, J-A23.01, J-A27.01, J-A28.01 and J-A28.02. Part A
  has the same 23 plus 4 that are restated there only: kernel J-A12.32 and J-A28.33, and scope J-A20.01 and J-A21.01. After
  apply-blocks those four showed as `part_a_without_j_rows`, as the seats predicted. After the swap every Part A id has
  its index row.
* **New ids** (they stay where the protocol appended them, in file order). They are 27:
  * determinism: J-A12.71, J-A20.75, J-A22.74, J-A22.75, J-A24.71, J-A30.72, J-A31.75 and J-A31.76;
  * kernel: J-A28.34;
  * model: J-A8.22, J-A28.28, J-A28.29, J-A29.23, J-A29.24, J-A30.23 and J-A30.24;
  * pipeline: J-A24.43, J-A26.44 and J-A31.40;
  * rendering: J-A19.81, J-A28.85, J-A28.86, J-A30.85, J-A30.86 and J-A30.87;
  * scope: J-A15.01 and J-A23.02.

  The scope seat allowed its two to stay where they land.
* **Hand-off substitutions** (each found once, then applied):
  * §2.6 `Room.lit` gains "§11.1" (VR-07, VK-24);
  * §7.6's enumeration gains `knowledge.admit` (§9.2) (VR-30);
  * §2.9's "every export" becomes "every picture and interchange export" (VR-10).
* **Fences 110 → 108.** This is the II.6 REPLACE (VK-05, VP-01), which removes the retired island code block, as the
  pipeline seat's receipts state. It is not a balance error: the fences are balanced.
* **Headings 145 → 145.** Every heading line is unchanged. The title block and its review banner are byte-identical.
  There is no per-section review marker (0 PENDING FABLE REVIEW lines in the document).

## 4 Sizes before and after

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 12 417 lines, 1 503 967 bytes, sha256 `87d89692…` | 12 793 lines, 1 571 348 bytes, sha256 `365e19f24743c88a5814e5cfddcc086ee961b03c0cd4697fab9afe5f23d0a2b3` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 013 lines, 383 760 bytes, sha256 `3f39b2de…` | 2 040 lines, 419 246 bytes, sha256 `50a94f2d6fca8b86609398b5a6ee6136511adc323f8d2e29f6c3d736e9d82a9a` |
| `docs/ARCHITECTURE-VALIDATION.md` | 1 174 lines, 229 860 bytes | 1 433 lines, 246 046 bytes (§Ab.1 appended) |
| `docs/validation/doc-checks-allow.tsv` | 1 355 lines, 345 674 bytes | 1 556 lines, 435 614 bytes (2 comment lines and 199 rows appended) |
| judgment index rows / Part A entries | 432 / 432 | 459 / 459 |
| headings / fence lines | 145 / 110 | 145 / 108 |

## 5 Changed sections (exact heading lines, in document order)

* `## The whole design in one page (plain words)` — scope #1 REPLACE (84 → 83 lines)
* `### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`)` — scope #2 REPLACE (48 → 48 lines)
* `### 1.1 What is built, in what order; the two size ladders` — scope #3 REPLACE (67 → 67 lines)
* `### 1.2 The one-click default, stated once` — scope #4 REPLACE (15 → 15 lines)
* `### 1.4 Fusion thesis, stage by stage` — scope #5 REPLACE (50 → 47 lines)
* `### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices` — model #1 REPLACE (313 → 315 lines)
* `### 2.3 Terrain and water` — model #2 REPLACE (84 → 85 lines)
* `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector` — model #3 REPLACE (113 → 114 lines)
* `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface` — model #4 REPLACE (502 → 550 lines)
* `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records` — model #5 REPLACE (107 → 107 lines)
* `### 2.8 Identity, lifecycle, provenance, the entity registry` — model #6 REPLACE (151 → 152 lines)
* `### 2.9 The document and serialisation` — model #7 REPLACE (281 → 284 lines)
* `### 3.1 Build-versus-adopt, per primitive` — kernel #1 REPLACE (47 → 47 lines)
* `### 3.2 Numeric policy` — kernel #2 REPLACE (66 → 68 lines)
* `### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end` — kernel #3 REPLACE (295 → 297 lines)
* `### 3.4 Kernel operations the pipeline needs (complete list)` — kernel #4 REPLACE (142 → 169 lines)
* `### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement` — kernel #5 REPLACE (104 → 105 lines)
* `### 3.8 The straight skeleton — numeric contract, validator, downgrades` — rendering #1 REPLACE (67 → 67 lines)
* `### 3.10 Kernel invariants — what is checked, when, and at what cost` — kernel #6 REPLACE (41 → 42 lines)
* `### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker` — pipeline #1 REPLACE (155 → 153 lines)
* `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace` — pipeline #2 REPLACE (400 → 414 lines)
* `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims` — pipeline #3 REPLACE (182 → 180 lines)
* `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule` — pipeline #4 REPLACE (178 → 178 lines)
* `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model` — pipeline #5 REPLACE (312 → 314 lines)
* `### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)` — pipeline #6 REPLACE (142 → 158 lines)
* `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)` — pipeline #7 REPLACE (506 → 519 lines)
* `### 5.1 Principles and the seven tiers (G-P7)` — determinism #1 REPLACE (72 → 79 lines)
* `### 5.2 Failure classes: detection, ladder, test` — determinism #2 REPLACE (30 → 30 lines)
* `### 5.3 The invariant suite, by scope (SCL-1)` — determinism #3 REPLACE (63 → 63 lines)
* `### 5.4 The generation report` — determinism #4 REPLACE (24 → 34 lines)
* `### 6.1 RNG and stream design` — determinism #5 REPLACE (115 → 132 lines)
* `### 6.2 What a seed determines, and the model digest` — determinism #6 REPLACE (141 → 146 lines)
* `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)` — determinism #7 REPLACE (176 → 183 lines)
* `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation` — determinism #8 REPLACE (220 → 228 lines)
* `### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes` — determinism #9 REPLACE (54 → 55 lines)
* `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)` — determinism #10 REPLACE (268 → 273 lines)
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8` — determinism #11 REPLACE (160 → 169 lines)
* `### 7.5 Migration and upgrade (G-P9)` — determinism #12 REPLACE (79 → 82 lines)
* `### 7.6 The override layer and editable tables (G-P12; owner amendment 5)` — determinism #13 REPLACE (78 → 80 lines)
* `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)` — determinism #14 REPLACE (135 → 143 lines)
* `### 8.1 The display list (renderer-independent, columnar, incremental)` — rendering #2 REPLACE (103 → 105 lines)
* `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)` — rendering #3 REPLACE (316 → 334 lines)
* `### 8.3 Symbol catalogue and draw-style census` — rendering #4 REPLACE (53 → 56 lines)
* `### 8.4 Layers, shadows, heights` — rendering #5 REPLACE (71 → 73 lines)
* `### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint` — rendering #6 REPLACE (70 → 90 lines)
* `### 8.6 Stage-2 render tier and stage-3 LOD` — rendering #7 REPLACE (27 → 31 lines)
* `### 8.8 Tiles, zoom stops, print and the canvas budget` — rendering #8 REPLACE (70 → 72 lines)
* `### 8.9 Backends, text, threads and the worker boundary` — rendering #9 REPLACE (123 → 123 lines)
* `### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally` — rendering #10 REPLACE (124 → 137 lines)
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)` — pipeline #8 REPLACE (142 → 148 lines)
* `### 10.4 Names, descriptions and setting packs` — pipeline #9 REPLACE (48 → 48 lines)
* `### 11.1 Formats` — rendering #11 REPLACE (104 → 118 lines)
* `### 11.2 The embedding API and the worker boundary (SCL-6)` — rendering #12 REPLACE (78 → 84 lines)
* `### 11.3 The host bridge — the host is the store (FTG-12)` — rendering #13 REPLACE (72 → 72 lines)
* `### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)` — rendering #14 REPLACE (52 → 54 lines)
* `### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)` — rendering #15 REPLACE (78 → 83 lines)
* `### 12.8 Memory (what is counted, per rung)` — rendering #16 REPLACE (82 → 82 lines)
* `### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test` — scope #6 REPLACE (125 → 129 lines)
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT` — scope #7 REPLACE (293 → 314 lines)
* `### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1` — scope #8 REPLACE (88 → 89 lines)
* `### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file` — scope #9 REPLACE (96 → 96 lines)
* `### 13.6 The owner's side-by-side protocol (D-5)` — scope #10 REPLACE (133 → 136 lines)
* `### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)` — scope #11 REPLACE (53 → 53 lines)
* `### 13.8 CI tiers and compute budgets (SCL-18; D-34)` — scope #12 REPLACE (27 → 29 lines)
* `### 13.9 The corpus-calibration interface (staged by the owner; DEF-9)` — scope #13 REPLACE (35 → 35 lines)
* `## §14 Package and module layout, key interfaces, dependency rules, extension points` — scope #14 REPLACE (189 → 193 lines)
* `### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked` — scope #15 REPLACE (169 → 169 lines)
* `### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5` — scope #16 REPLACE (56 → 56 lines)
* `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2` — scope #17 REPLACE (92 → 92 lines)
* `### 17.1 The clean-room chain (IMP-1; D-29)` — scope #18 REPLACE (131 → 127 lines)
* `## II.1 The district → neighbourhood interface` — pipeline #10 REPLACE (99 → 99 lines)
* `## II.3 Block content dispatch, pins, local identities (stage-2 feature S2: context features)` — pipeline #11 REPLACE (16 → 16 lines)
* `## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6)` — pipeline #12 REPLACE (37 → 35 lines)
* `## II.6 The staged layers — floating islands and sewers: the hooks the base carries now` — pipeline #13 REPLACE (119 → 128 lines)
* `### II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the toggle as visibility, the drain rule` — pipeline #14 REPLACE (50 → 50 lines)
* `### II.7.2 The network stage: the gate, the underground arena's levels, the tunnel profile, depth and outfalls, editing` — pipeline #15 REPLACE (54 → 55 lines)
* `### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order` — pipeline #16 REPLACE (121 → 122 lines)
* `### II.7.4 The hook interfaces and the base's part` — pipeline #17 REPLACE (25 → 26 lines)
* `# PART III — What a later village product needs from the base (one page; the hooks are concrete)` — pipeline #18 REPLACE (61 → 62 lines)
* `# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)` — scope #19 REPLACE (189 → 190 lines)
* `# Staged by the owner's roadmap (this document defers nothing)` — scope #20 REPLACE (21 → 21 lines)
* `# Appendix A — reading record, and CONFIRMED versus PLAUSIBLE` — scope #21 REPLACE (23 → 23 lines)
* `# Judgment calls ("chose X over Y because Z"; each vetoable)` — its index table: 23 rows restated in place, 27 new
  rows appended after the last row; its opening paragraph swapped (VS-40, scope hand-off (2))
* `## Part A — Judgment calls ("chose X over Y because Z"; each vetoable)` of `docs/ARCHITECTURE-RATIONALE.md` — 27
  entries restated in place, 27 new entries appended before `## Part B`

The line counts include each range's trailing blank lines. The top-level keys changed are the 25 of assemble-r0: the
summary, §0–§17, PART II, PART III, Delegated decisions, Judgment calls, Staged and Appendix A.

## 6 References

* **The resolver** (`docs/validation/amendments-b/refs.py`, the widened J-id grammar) found on the installed document:
  139 heading keys, 35 D ids, 459 J ids and **2 broken references**. They are the two external citations the document had
  before: `os-geometry.md` §2.1.4 (l. 2635, marked external) and RFC 7946 §3.1.6 (l. 9012). The pre-repair archive gives
  the same 2. **Mechanical fixes: none were needed.**
* S2 of the document checks (every `§n` / `§n.m` pointer) reports 0.

## 7 Document checks

The command was `python3 docs/validation/bench/doc_checks.py --sections "The whole design,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,PART II,PART III,Delegated decisions,Judgment calls,Staged,Appendix A"`
with the allow file `docs/validation/doc-checks-allow.tsv`. Cells read hits / unreviewed.

| run (end) | document | corpus: JSON files / C3 3-grams | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|---|
| 0 (07:03) | installed `365e19f2…` | 9 626 / 911 940 | 5 / 0 | 0 / 0 | 1 302 / 209 | 10 / 1 | 0 / 0 | 0 / 0 | 1 |
| 199 rows appended | | | | | | | | | |
| **1, final (07:10)** | **installed** | **9 626 / 911 940** | **5 / 0** | **0 / 0** | **1 302 / 0** | **10 / 0** | **0 / 0** | **0 / 0** | **0** |

* **The seats' rows (142).** The hand-offs gave 152 rows: determinism 34, kernel 18, rendering 21, scope 32 (the
  preambles' `# ALLOW` lines) and pipeline 47 (its report's §5). Ten texts repeat across the files, so they were
  written once, giving 142 rows. None was already in the file. Every one of the 142 was an unreviewed hit of run 0, and
  none was malformed.
* **The residue (57 C3 runs, this seat's review).** It lies in §2 (48 distinct runs, 52 occurrences), §3 (2) and the
  index (7, the model seat's J rows). The model and rendering seats had left these
  to the assembler.
  * **How the runs were attributed.** A script used the check's own tokenisation (`asm1/attrib.py`, `longest.py`).
    For each run it recorded which of the two archives already holds the run, the findings files and JSON files that
    share its 3-grams, and every findings file or JSON file that holds any 5 consecutive tokens of it.
  * **Results.** No JSON file holds any 5-token window of any run, and no reference-reading findings file does either.
  * **The rows.** `asm1/classify.py` wrote each row's reason from its category:

| category | rows |
|---|---|
| stitched, our own new text of repair round 1 (`repair-r1-model.md`; one also in `repair-r1-kernel.md`): no corpus file holds 5 consecutive tokens | 19 |
| stitched, a run whose text already occurs in one of the two archives (re-bounded by a neighbouring edit, or corpus growth from the 2026-09-27 `code-*.md` readings) | 22 |
| held only by `research/findings/dwellings-synthesis.md`, the program's own Fable synthesis of item 28 (assemble-r0's precedent, 130 rows): the §2.6 interface lines (`Wall`, `Opening`, the `faces` role list, the elaboration-state line) and phrases such as "of the wings that reach the storey" | 15 |
| an ordinary phrase that two findings files also use ("is a property of the") | 1 |

* **Stale rows are kept.** The allow file was only appended to.
* **The corpus is live.** Runs 0 and 1 saw the same corpus (911 940 3-grams). A findings file written later can raise
  new stitched runs over unchanged text, as the 2026-09-27 readings did for every repair seat.

## 8 Notes for the verify round (no ruling needed from this lane)

1. **Not applied: a cross-part note (it was no hand-off).** The scope seat's preamble (4) says model §2.6's
   "**Bars:** §13.2's T28-13 – T28-17." should read "T28-13 – T28-18", because T28-18 is new (VS-23). No seat applied
   it. The model seat landed first, and this seat applies only hand-offs. The text still reads T28-13 – T28-17 (l. 1488).
   It is not a broken reference, because every cited id exists. §13.2 now also defines T28-19, the plan block's schema.
2. **Other cross-part notes.** Each repair report has a section of notes on other lanes' text. Some were answered by the
   sibling seats' own blocks. For example, the determinism seat's VD-07b note ("reads the same recipe") is gone: 0
   occurrences, and "creation prefix" occurs 7 times. The verify round should read those sections against the assembled
   text:
   * determinism: "Cross-part dependencies";
   * model: "Cross-part follow-ups";
   * pipeline: §3;
   * rendering: "Cross-part notes";
   * scope: preamble (4);
   * kernel: preamble (3).
3. **The index order.** The 27 new ids sit after the last row in file-name order. The restated rows keep their old
   positions.
4. **The part counts of §Ab.1.** Pipeline has 57 rows, one more than its 56 routed issues, and scope has 51, one more
   than its 50. In each case the extra row is an issue that another seat owns and whose wording this seat's block also
   carries. One example is V-MAB-29's reuse wording in §4.11.

## 9 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed; receipts below).**
* The archive copies are `cmp`-identical, with the hashes above.
* 94 of 94 blocks were applied and 0 skipped. Two runs gave byte-identical outputs. The live hashes were checked before
  install.
* The hand-off swaps: 23 index rows and 27 Part A entries, the VS-40 paragraph and 3 substitutions, each asserted.
* The post-hand-off audit: every block present once, 459 / 459 rows, the same id set in both tables, no duplicates,
  headings unchanged, fences balanced, title block unchanged.
* The resolver: 2 broken references, both pre-existing external citations.
* The two check runs, the last exiting 0.
* The attribution of the 57 residue runs.
* The §Ab.1 table: 230 rows, 4 cells each, covering every issue id defined in the six verify-r0 reports.

**PLAUSIBLE (reasoning only).**
* That the 57 allowed runs are false positives. The judgment rests on the attribution: no reference-reading file and no
  JSON file holds 5 consecutive tokens of any of them. It is not a proof.
* That §Ab.1's per-issue sections are complete. They are read mechanically from the seats' ledgers and issue tables, so a
  section a seat changed for an issue without recording it is not listed.
* The mechanisms the blocks state. They are the seats' design and belong to the verify round, not this seat.

**Receipts** (session scratchpad `…/scratchpad/asm1/`):
* the apply runs: `apply-run1.txt`, `apply-run2.txt`, `apply-log*.json`;
* the hand-off runs: `handoff-run1.txt`, `handoff-run2.txt`, `handoff-log*.json`;
* the audit: `audit.py`, `audit-final.json`, `fences.py`, `ii6.diff`;
* the resolver: `refs-installed.*`, `refs-before.*`;
* the check runs: `dc-inst0.txt`, `dc-inst1.txt`;
* the allow rows: `gather_allow.py`, `allow-gather.json`, `allow-split.json`, `residue0.txt`, `attrib.py`,
  `attrib-residue.json`, `longest.py`, `w5.json`, `json-w5.json`, `classify.py`, `assembler-rows.tsv`;
* the changelog: `changelog.py`, `changelog.json`, `ab1.md`;
* the pre-change copies: `doc-before.md`, `rat-before.md`, `validation-before.md`, `allow-before.tsv`.
