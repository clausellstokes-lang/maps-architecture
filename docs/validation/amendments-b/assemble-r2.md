# assemble-r2 — lane amendments-b/assemble-r2 (the mechanical assembler of amendments-b repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/assemble-r2).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 archive: done 08:28 (docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md sha256 365e19f2…, docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r2-2026-09-27.md sha256 50a94f2d…, both cmp-identical, read-only; validation, allow TSV and queue copied to the scratchpad asm2/)
> STEP 1 apply + hand-off: done 08:28 (apply-blocks.py 58/58 applied, 0 skipped, audit not-OK 0; assemble-r2-handoff.py: 20 index + 22 Part A restated rows swapped into place, VS1-04 paragraph swapped 2 -> 2 lines; two runs byte-identical)
> STEP 2 audit + install: done 08:29 (post-hand-off audit 58 blocks present once, 0 problems, 469/469 rows, 0 duplicate ids, same id set; live hashes checked 365e19f2…/50a94f2d… then installed: doc 831efd42…, rationale f2c2a1ca…; logs assemble-r2-apply-log.json, assemble-r2-handoff-log.json)
> STEP 3 references: done 08:29 (refs.py on the installed doc: 139 heading keys, 35 D ids, 469 J ids, 2 broken = the 2 pre-existing external citations, same as the archive; 0 fixes)
> STEP 4 document checks: done 08:35 (19 keys; run 0: C3 1262/10, exit 1 — exactly the 10 runs repair-model-r2 proposed; attributed by script, 10 assembler rows appended, 1556 -> 1567 lines; run 1: C1 5/0, C2 0/0, C3 1262/0, C4 9/0, S1 0/0, S2 0/0, exit 0)
> STEP 5 changelog: done 08:38 (docs/ARCHITECTURE-VALIDATION.md: '### §Ab.2 Repair round 2 applied (2026-09-27)' appended inside §Ab — a paragraph, a legend and 85 issue rows, 4 cells each; 1433 -> 1546 lines, the first 1433 unchanged)
> STEP 6 this report complete: done 08:40
> STEP 7 Fable queue row + LANDED line: done 08:41 (row B-amendments-b/assemble-r2 appended to docs/FABLE-REVIEW-QUEUE.md, PENDING; LANDED line in docs/lane-events.log)

Lane `amendments-b/assemble-r2`, 2026-09-27 08:27–08:41. Status: COMPLETE. A mechanical seat: every change to the
design documents was made by a script (`apply-blocks.py`, then `assemble-r2-handoff.py`), and no section text was edited
by hand.

## Outcome

All 58 blocks of the six `docs/validation/amendments-b/repair-r2-*.md` files are applied and none was skipped: 46 REPLACE
blocks, each on a distinct heading (no heading was replaced twice), 6 J-ROWS blocks (30 index rows) and 6 RATIONALE-A
blocks (32 Part A entries). No file was truncated (each ends with `=== END ===`), no header was malformed and no heading
was missing. The seats' hand-offs were applied by script: the 20 restated index rows and 22 restated Part A entries were
moved into the older rows' places and the older rows deleted, and the paragraph under `# Judgment calls` was swapped for
scope's VS1-04 text (2 lines to 2). No seat handed off a one-string substitution this round. The audit after the hand-off
finds every block's text in the document exactly once, 469 index rows and 469 Part A entries with the same id set, and
no duplicate id.

The resolver finds 2 broken references, the same two external citations the document had before; no fix was needed.
The document checks over the 19 changed top-level keys exit 0 (C1 5/0, C2 0/0, C3 1 262/0, C4 9/0, S1 0/0, S2 0/0)
after 10 reviewed C3 rows: exactly the 10 runs the model seat proposed, attributed by script and written by this seat.
The changelog is `docs/ARCHITECTURE-VALIDATION.md` "### §Ab.2 Repair round 2 applied (2026-09-27)", with one row for
each of the 85 issue ids of the six verify-r1 reports.

**Nothing needs a ruling from this lane.** The seats' cross-part notes that no block applied go to the verify round
(§8).

## 1 Archive

* `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md` — `cmp`-identical to the document before assembly;
  sha256 `365e19f24743c88a5814e5cfddcc086ee961b03c0cd4697fab9afe5f23d0a2b3`, 1 571 348 bytes, 12 793 lines; read-only.
* `docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r2-2026-09-27.md` — `cmp`-identical to the rationale file
  before assembly; sha256 `50a94f2d6fca8b86609398b5a6ee6136511adc323f8d2e29f6c3d736e9d82a9a`, 419 246 bytes; read-only.
* No existing archive file was touched. The validation file, the allow file and the review queue were copied to the
  session scratchpad (`asm2/validation-before.md`, `asm2/allow-before.tsv`, `asm2/queue-before.md`); each was only
  appended to, and its old prefix is byte-identical (checked with `cmp`).

## 2 The scripts

* `docs/validation/amendments-b/apply-blocks.py` (assemble-r0's applier, unchanged) wrote the applied copies and the log
  `docs/validation/amendments-b/assemble-r2-apply-log.json`. It reported the restated rows as "DUPLICATE ID inserted",
  exactly the ids the six seats' hand-offs list, and no other note.
* `docs/validation/amendments-b/assemble-r2-handoff.py` (new, stdlib only, never writes in place) applied the hand-off.
  Its step 1 is `assemble-r1-handoff.py`'s `swap_restated`, imported unchanged: it swaps each id that occurs exactly
  twice in the index or in Part A, and stops if an id occurs three times (two files restating one id, the kernel seat's
  hand-off (2); none did) or if the later row is no row of the block files. Its step 2 swaps the VS1-04 paragraph only if
  the preamble holds exactly 2 OLD and 2 NEW lines, the OLD run occurs exactly once and the NEW run not at all. Its log
  is `docs/validation/amendments-b/assemble-r2-handoff-log.json`, and it holds every swapped-out row verbatim.
* Two full runs (apply, then hand-off) gave byte-identical outputs and logs. The live files still had the base hashes
  `365e19f2…` / `50a94f2d…` when the outputs were installed at 08:29.

## 3 Blocks applied and skipped, per file

| block file | sha256 (first 16) | lines | blocks | applied | skipped | REPLACE | J-ROWS rows | Part A entries |
|---|---|---|---|---|---|---|---|---|
| `repair-r2-determinism.md` | `a2dec8c605b012ed` | 1247 | 12 | 12 | 0 | 10 | 9 | 9 |
| `repair-r2-kernel.md` | `181f2bb84e9ee615` | 393 | 6 | 6 | 0 | 4 | 2 | 2 |
| `repair-r2-model.md` | `de085af53721aa98` | 1147 | 6 | 6 | 0 | 4 | 6 | 6 |
| `repair-r2-pipeline.md` | `844bbbe7011785b1` | 2520 | 14 | 14 | 0 | 12 | 9 | 9 |
| `repair-r2-rendering.md` | `bfc05490b1ca4a9a` | 636 | 10 | 10 | 0 | 8 | 3 | 3 |
| `repair-r2-scope.md` | `a14ffbc8c90cfa60` | 945 | 10 | 10 | 0 | 8 | 1 | 3 |
| **total** | | | 58 | 58 | 0 | 46 | 30 | 32 |

* **Skipped:** none. **Truncated files:** none. **Malformed headers:** none. **Text outside blocks:** none (the preambles
  of the determinism, pipeline and scope files are ignored by the protocol).
* **Two REPLACEs of one heading:** none. The six files' REPLACE targets are disjoint.
* **Restated rows swapped into place.** In the index there are 20: determinism J-DET-2, J-DET-53, J-A31.71, J-A12.71,
  J-A20.75, J-A22.74 and J-A31.75; kernel J-A12.31 and J-A28.34; model J-A28.23, J-A28.26, J-A28.29 and J-A30.23; pipeline
  J-A24.43, J-A26.44, J-A31.40, J-A31.44 and J-A31.48; rendering J-A30.85 and J-A30.87. Part A has the same 20 plus 2
  that are restated there only: scope J-A20.01 and J-A28.01. After apply-blocks those two showed as
  `part_a_without_j_rows`, as the scope seat predicted. After the swap every Part A id has its index row.
* **New ids** (they stay where the protocol appended them, in file order). They are 10: determinism J-A28.73 and
  J-A22.76; model J-A29.25 and J-A20.22; pipeline J-A28.46, J-A11.43, J-A20.42 and J-A12.47; rendering J-A28.87; scope
  J-A17.01 (the scope seat allowed it to stay where it lands).
* **The index paragraph (VS1-04).** Swapped at l. 12 419, inside `# Judgment calls` (l. 12 414–12 899 of the installed
  document); the OLD lines occur 0 times after it and the NEW lines once.
* **Headings 145 → 145; fence lines 108 → 108.** Every heading line is unchanged and the fences are balanced. The title
  block and its review banner are byte-identical. There is no per-section review marker (0 PENDING FABLE REVIEW lines in
  the document).
* **Round 1's open note is closed.** §2.6's "Bars" line now reads T28-13 – T28-18 (the model seat's V-MAB1-13); "T28-13 –
  T28-17" occurs 0 times.

## 4 Sizes before and after

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 12 793 lines, 1 571 348 bytes, sha256 `365e19f2…` | 12 942 lines, 1 599 297 bytes, sha256 `831efd429092adf3849b6eec3cd8703816c790ae53404a96b4cb3c23166be584` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 040 lines, 419 246 bytes, sha256 `50a94f2d…` | 2 050 lines, 440 261 bytes, sha256 `f2c2a1ca11a0f1da5da2891ee69c70588806000066b77bdd7242d1e5fb64dae1` |
| `docs/ARCHITECTURE-VALIDATION.md` | 1 433 lines, 246 046 bytes | 1 546 lines, 254 818 bytes (§Ab.2 appended) |
| `docs/validation/doc-checks-allow.tsv` | 1 556 lines, 435 614 bytes | 1 567 lines, 441 290 bytes (1 comment line and 10 rows appended) |
| judgment index rows / Part A entries | 459 / 459 | 469 / 469 |
| headings / fence lines | 145 / 108 | 145 / 108 |

## 5 Changed sections (exact heading lines, in document order)

* `### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`)` — scope #1 REPLACE (48 → 48 lines)
* `### 1.4 Fusion thesis, stage by stage` — scope #2 REPLACE (47 → 47 lines)
* `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector` — model #1 REPLACE (114 → 117 lines)
* `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface` — model #2 REPLACE (550 → 571 lines)
* `### 2.8 Identity, lifecycle, provenance, the entity registry` — model #3 REPLACE (152 → 155 lines)
* `### 2.9 The document and serialisation` — model #4 REPLACE (284 → 284 lines)
* `### 3.1 Build-versus-adopt, per primitive` — kernel #1 REPLACE (47 → 47 lines)
* `### 3.4 Kernel operations the pipeline needs (complete list)` — kernel #2 REPLACE (169 → 186 lines)
* `### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement` — kernel #3 REPLACE (105 → 105 lines)
* `### 3.10 Kernel invariants — what is checked, when, and at what cost` — kernel #4 REPLACE (42 → 42 lines)
* `### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker` — pipeline #1 REPLACE (153 → 154 lines)
* `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace` — pipeline #2 REPLACE (414 → 415 lines)
* `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims` — pipeline #3 REPLACE (180 → 181 lines)
* `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule` — pipeline #4 REPLACE (178 → 179 lines)
* `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model` — pipeline #5 REPLACE (314 → 330 lines)
* `### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)` — pipeline #6 REPLACE (158 → 162 lines)
* `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)` — pipeline #7 REPLACE (519 → 526 lines)
* `### 5.2 Failure classes: detection, ladder, test` — determinism #1 REPLACE (30 → 30 lines)
* `### 5.3 The invariant suite, by scope (SCL-1)` — determinism #2 REPLACE (63 → 63 lines)
* `### 6.1 RNG and stream design` — determinism #3 REPLACE (132 → 139 lines)
* `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)` — determinism #4 REPLACE (183 → 184 lines)
* `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation` — determinism #5 REPLACE (228 → 230 lines)
* `### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes` — determinism #6 REPLACE (55 → 56 lines)
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8` — determinism #7 REPLACE (169 → 174 lines)
* `### 7.5 Migration and upgrade (G-P9)` — determinism #8 REPLACE (82 → 89 lines)
* `### 7.6 The override layer and editable tables (G-P12; owner amendment 5)` — determinism #9 REPLACE (80 → 81 lines)
* `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)` — determinism #10 REPLACE (143 → 152 lines)
* `### 8.3 Symbol catalogue and draw-style census` — rendering #1 REPLACE (56 → 56 lines)
* `### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint` — rendering #2 REPLACE (90 → 90 lines)
* `### 8.9 Backends, text, threads and the worker boundary` — rendering #3 REPLACE (123 → 123 lines)
* `### 9.4 Sizes, floors, the ladder, quarters, overflow, halos` — rendering #4 REPLACE (44 → 45 lines)
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)` — pipeline #8 REPLACE (148 → 149 lines)
* `### 11.1 Formats` — rendering #5 REPLACE (118 → 119 lines)
* `### 11.2 The embedding API and the worker boundary (SCL-6)` — rendering #6 REPLACE (84 → 86 lines)
* `### 11.3 The host bridge — the host is the store (FTG-12)` — rendering #7 REPLACE (72 → 73 lines)
* `### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)` — rendering #8 REPLACE (25 → 25 lines)
* `### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test` — scope #3 REPLACE (129 → 133 lines)
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT` — scope #4 REPLACE (314 → 324 lines)
* `### 13.9 The corpus-calibration interface (staged by the owner; DEF-9)` — scope #5 REPLACE (35 → 35 lines)
* `## §14 Package and module layout, key interfaces, dependency rules, extension points` — scope #6 REPLACE (193 → 194 lines)
* `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2` — scope #7 REPLACE (92 → 92 lines)
* `## II.1 The district → neighbourhood interface` — pipeline #9 REPLACE (99 → 99 lines)
* `## II.6 The staged layers — floating islands and sewers: the hooks the base carries now` — pipeline #10 REPLACE (128 → 136 lines)
* `### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order` — pipeline #11 REPLACE (122 → 124 lines)
* `### II.7.4 The hook interfaces and the base's part` — pipeline #12 REPLACE (26 → 26 lines)
* `# Staged by the owner's roadmap (this document defers nothing)` — scope #8 REPLACE (21 → 21 lines)
* `# Judgment calls ("chose X over Y because Z"; each vetoable)` — its index table: 20 rows restated in place, 10 new
  rows appended after the last row; its opening paragraph's 2 lines swapped (VS1-04, scope hand-off (2))
* `## Part A — Judgment calls ("chose X over Y because Z"; each vetoable)` of `docs/ARCHITECTURE-RATIONALE.md` — 22
  entries restated in place, 10 new entries appended before `## Part B`

The line counts include each range's trailing blank lines. The 19 top-level keys changed (a diff of every level-1 and
level-2 section against the archive): §0, §1, §2, §3, §4, §5, §6, §7, §8, §9, §10, §11, §12, §13, §14, §16, PART II
(II.1, II.6, II.7), Judgment calls and Staged. Unchanged: the summary, §15, §17, PART III, Delegated decisions and
Appendix A.

## 6 References

* **The resolver** (`docs/validation/amendments-b/refs.py`, assemble-r0-refs.py's logic with the widened J-id grammar)
  found on the installed document: 139 heading keys, 35 D ids, 469 J ids and **2 broken references**. They are the two
  external citations the document had before: `os-geometry.md` §2.1.4 (l. 2679, marked external) and RFC 7946 §3.1.6
  (l. 9123). The pre-repair archive gives the same 2 (l. 2635 and l. 9012). **Mechanical fixes: none were needed.**
* S2 of the document checks (every `§n` / `§n.m` pointer) reports 0.

## 7 Document checks

The command was `python3 docs/validation/bench/doc_checks.py --sections "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,PART II,Judgment calls,Staged"`
with the allow file `docs/validation/doc-checks-allow.tsv`. Cells read hits / unreviewed.

| run (end) | document | corpus: JSON files / C3 3-grams | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|---|
| 0 (08:31) | installed `831efd42…` | 9 626 / 911 940 | 5 / 0 | 0 / 0 | 1 262 / 10 | 9 / 0 | 0 / 0 | 0 / 0 | 1 |
| 10 rows appended | | | | | | | | | |
| **1, final (08:35)** | **installed** | **9 626 / 911 940** | **5 / 0** | **0 / 0** | **1 262 / 0** | **9 / 0** | **0 / 0** | **0 / 0** | **0** |

* **The residue is the model seat's list.** Run 0's 10 unreviewed hits are all C3, all in §2, and are exactly the 10 runs
  `repair-model-r2-report.md` proposed. The other five seats' blocks raised no unreviewed hit, as their reports said.
* **How the runs were attributed.** A script (`asm2/attrib.py`) used the check's own tokenisation. For each run it
  recorded which archive holds the run, which block file holds it, and every findings file and JSON file holding the
  whole run, any 5 consecutive tokens of it, or its 3-grams.
* **Results.** Every run occurs in `repair-r2-model.md`. No findings file holds any whole run. No JSON file holds any
  5-token window of any run. One findings file holds one 5-token window of one run (below).
* **The rows** (`asm2/classify.py`, which asserts the categories before writing):

| category | rows |
|---|---|
| our own new text of repair round 2 (`repair-r2-model.md`; in no archive), stitched: no corpus file holds 5 consecutive tokens | 8 |
| a run whose text already occurs in the base document (the r2 archive), re-bounded by the model seat's neighbouring edit ("at the ground storey each") | 1 |
| "at every storey it serves the": its window "every storey it serves the" is held only by `research/findings/dwellings-synthesis.md`, the program's own Fable synthesis of item 28 (the precedent of assemble-r0 and assemble-r1) | 1 |

* **Stale rows are kept.** The allow file was only appended to. There is one comment line naming this lane.
* **The corpus did not change between runs.** Runs 0 and 1 saw the same corpus (9 626 JSON files, 911 940 3-grams, the
  same figures as round 1). The unreadable-JSON warnings (994 lines, `captures/dwellings/*/network/bodies/*.json`) are the
  capture bodies that round 1 also skipped.

## 8 Notes for the verify round (no ruling needed from this lane)

The seats' reports hold cross-part notes on other lanes' text. No hand-off applied them, and this seat applies only
hand-offs. A string probe of the assembled text (`asm2/crosspart-probes.txt`) shows these still open:

1. **Pipeline → determinism §5.2.** F-PLAN tier 6 still says "S10b's fill" (l. 5 586). The pipeline and model seats
   both ask for "the generation fill (S10b's placement, S11's clamped write)".
2. **Pipeline → scope §13.2.** §4.2 S3 (12) now cites a `portRef` contract test in §13.2, but §13.2 does not name
   `portRef` (0 occurrences). T19-4 also lacks the overflow qualifier.
3. **Pipeline → model §2.6.** The static-baseline sentence does not name §4.7's overflow re-placement (0 occurrences of
   "overflow" in §2.6).
4. **Model → determinism.** `fieldBand` and `spans` are named in none of §7.1's derived list, §7.4's rows, §7.5's
   transforms or §6.2's leaf column order (0 occurrences each). The model seat asks for them.
5. **Kernel → model §2.6 and determinism §5.2.** Neither names `tileRings`. The hole case (an earlier wing wholly inside a
   later one at a storey, refused by §3.4) has no §2.6 rule, and F-PLAN's refusal path does not cite it.
6. **Model → scope T28-3.** No trapdoor-core wording (0 occurrences of "trapdoor core" in §13.2).
7. **Rendering → §1.1.** The l. 211 comment still cites "(§3.2, §12.2)"; §12.2 now holds only a pointer and the cap
   figures.
8. **Model, new observation.** A shell change that shrinks the extents can drop the capacity below `Building.households`
   with no re-clamp path (`repair-model-r2-report.md`, "New observation").

The reports' sections: determinism "Cross-part dependencies"; model "Cross-part follow-ups"; kernel "Cross-part notes";
pipeline §4; rendering "Cross-part observations"; scope preamble (3), whose dependencies are all installed by this same
assembly.

## 9 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed; receipts below).**
* The archive copies are `cmp`-identical, with the hashes above.
* 58 of 58 blocks were applied and 0 skipped. Two runs gave byte-identical outputs. The live hashes were checked before
  install.
* The hand-off: 20 index rows and 22 Part A entries swapped, and the VS1-04 paragraph, each asserted.
* The post-hand-off audit: every block present once, 469 / 469 rows, the same id set in both tables, no duplicates,
  headings unchanged, fences balanced, title block unchanged.
* The resolver: 2 broken references, both pre-existing external citations.
* The two check runs, the last exiting 0.
* The attribution of the 10 residue runs.
* The §Ab.2 table: 85 rows, 4 cells each, covering every issue id the six verify-r1 reports define. Every one of the 46
  replaced sections and all 32 restated or new J ids appear in it.
* The string probes of §8.

**PLAUSIBLE (reasoning only).**
* That the 10 allowed runs are false positives. The judgment rests on the attribution: no JSON file holds 5 consecutive
  tokens of any of them, and only the program's own synthesis holds one window of one run. It is not a proof.
* That §Ab.2's per-issue sections are complete. They are read by script from the seats' ledgers and issue tables, so a
  section a seat changed for an issue without recording it is not listed.
* The mechanisms the blocks state. They are the seats' design and belong to the verify round, not this seat.

**Receipts** (session scratchpad `…/scratchpad/asm2/`):
* the apply runs: `apply-run1.txt`, `apply-run2.txt`, `apply-log1.json`, `apply-log2.json`, `parse.txt`;
* the hand-off runs: `handoff-run1.txt`, `handoff-run2.txt`, `handoff-log1.json`, `handoff-log2.json`;
* the audit: `audit.py`, `audit-final1.json`, `audit-final1.txt`, `changed-sections.txt`;
* the resolver: `refs-installed.*`, `refs-before.*`;
* the check runs: `dc-inst0.txt`, `dc-inst1.txt`;
* the allow rows: `residue0.txt`, `attrib.py`, `attrib-residue.json`, `attrib-residue.txt`, `classify.py`,
  `assembler-rows.tsv`;
* the changelog: `changelog.py`, `changelog.json`, `changelog-rows.txt`, `ab2.md`;
* the probes: `crosspart-probes.txt`;
* the pre-change copies: `doc-before.md`, `rat-before.md`, `validation-before.md`, `allow-before.tsv`, `queue-before.md`.
