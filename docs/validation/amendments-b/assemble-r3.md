# assemble-r3 — lane amendments-b/assemble-r3 (the mechanical assembler of amendments-b repair round 3)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/assemble-r3).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 archive: done 10:17 (docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md sha256 831efd42…, docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r3-2026-09-27.md sha256 f2c2a1ca…, both cmp-identical, read-only; validation, allow TSV and queue copied to the scratchpad asm3/)
> STEP 1 apply + hand-off: done 10:18 (apply-blocks.py 46/46 applied, 0 skipped, audit not-OK 0; assemble-r3-handoff.py: 12 index + 15 Part A restated rows swapped into place, the swapped id sets asserted equal to the six hand-offs; two runs byte-identical)
> STEP 2 audit + install: done 10:18 (post-hand-off audit 46 blocks present once, 0 problems, 470/470 rows, 0 duplicate ids, same id set, new id J-A20.43; live hashes checked 831efd42…/f2c2a1ca… then installed: doc 1a861c72…, rationale 8a24a5a7…; logs assemble-r3-apply-log.json, assemble-r3-handoff-log.json)
> STEP 3 references: done 10:19 (refs.py on the installed doc: 139 heading keys, 35 D ids, 470 J ids, 2 broken = the 2 pre-existing external citations, same as the archive; 0 fixes)
> STEP 4 document checks: done 10:20 (19 keys; run 0 on the installed doc: C1 5/0, C2 0/0, C3 1250/0, C4 10/0, S1 0/0, S2 0/0, exit 0 — no allow row needed, allow file unchanged)
> STEP 5 changelog: done 10:23 (docs/ARCHITECTURE-VALIDATION.md: '### §Ab.3 Repair round 3 applied (2026-09-27)' appended inside §Ab — a paragraph, a legend and 53 issue rows (5 cells each), built by the asserted script asm3/changelog.py; 1546 -> 1627 lines, the first 254 818 bytes unchanged)
> STEP 6 this report complete: done 10:25
> STEP 7 Fable queue row + LANDED line: done 10:25 (row B-amendments-b/assemble-r3 appended to docs/FABLE-REVIEW-QUEUE.md, PENDING; LANDED line in docs/lane-events.log)

Lane `amendments-b/assemble-r3`, 2026-09-27 10:16–10:25. Status: COMPLETE. A mechanical seat: every change to the
design documents was made by a script (`apply-blocks.py`, then `assemble-r3-handoff.py`), and no section text was edited
by hand.

## Outcome

All 46 blocks of the six `docs/validation/amendments-b/repair-r3-*.md` files are applied and none was skipped: 35 REPLACE
blocks, each on a distinct heading (no heading was replaced twice), 5 J-ROWS blocks (13 index rows) and 6 RATIONALE-A
blocks (16 Part A entries). No file was truncated (each ends with `=== END ===`), no header was malformed, no heading was
missing and no text stood outside a block. The seats' one hand-off, the restated-row swap, was applied by script: 12
restated index rows and 15 restated Part A entries were moved into the older rows' places and the older rows deleted,
and the script asserts that the swapped ids are exactly the ones the six hand-offs name. No seat handed off a paragraph
swap or a one-string substitution. The audit after the hand-off finds every block's text in the document exactly once,
470 index rows and 470 Part A entries with the same id set, and no duplicate id. The one new id is J-A20.43 (pipeline).

The resolver finds 2 broken references. They are the same two external citations the document had before, so no fix
was needed. The document checks over the 19 changed top-level keys exit 0 on the first run: C1 5/0, C2 0/0, C3 1 250/0,
C4 10/0, S1 0/0, S2 0/0 (hits / unreviewed). The archive scores the same keys C3 1 251/0, and no allow row was added.
The changelog is `docs/ARCHITECTURE-VALIDATION.md` "### §Ab.3 Repair round 3 applied (2026-09-27)". It has one row for
each of the 53 primary issues of `validate.md` §6, with the 23 merged carried ids named in the row of their primary.

**Nothing needs a ruling from this lane.** The seats' cross-part notes that no block applied go to the verify round
(§8).

## 1 Archive

* `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md` — `cmp`-identical to the document before assembly;
  sha256 `831efd429092adf3849b6eec3cd8703816c790ae53404a96b4cb3c23166be584`, 1 599 297 bytes, 12 942 lines; read-only.
* `docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-repair-r3-2026-09-27.md` — `cmp`-identical to the rationale file
  before assembly; sha256 `f2c2a1ca11a0f1da5da2891ee69c70588806000066b77bdd7242d1e5fb64dae1`, 440 261 bytes; read-only.
* Both names were new; no existing archive file was touched. The validation file, the allow file and the review queue
  were copied to the session scratchpad (`asm3/validation-before.md`, `asm3/allow-before.tsv`, `asm3/queue-before.md`).
  The validation file and the queue were only appended to, and their old prefixes are byte-identical (checked by
  script). The allow file is unchanged.

## 2 The scripts

* `docs/validation/amendments-b/apply-blocks.py` (assemble-r0's applier, unchanged) wrote the applied copies and the log
  `docs/validation/amendments-b/assemble-r3-apply-log.json`. Its only notes were "DUPLICATE ID inserted" on the restated
  rows, exactly the ids the six hand-offs list.
* `docs/validation/amendments-b/assemble-r3-handoff.py` (new, stdlib only, never writes in place) applied the hand-off.
  It imports `assemble-r1-handoff.py`'s `swap_restated` unchanged. That function swaps each id that occurs exactly twice
  in the index or in Part A, and it stops if an id occurs three times (two files restating one id; none did) or if the
  later row is no row of the block files. The new script then asserts that the swapped ids equal the hand-offs' sets: 12
  in the index, and the same 12 plus J-A28.33, J-A28.34 (kernel) and J-A20.01 (scope) in Part A. Its log is
  `docs/validation/amendments-b/assemble-r3-handoff-log.json`, which holds every swapped-out row verbatim.
* Two full runs (apply, then hand-off) gave byte-identical outputs, logs and console output. The live files still had the
  base hashes `831efd42…` / `f2c2a1ca…` when the outputs were installed at 10:18.

## 3 Blocks applied and skipped, per file

| block file | sha256 (first 16) | lines | blocks | applied | skipped | REPLACE | J-ROWS rows | Part A entries |
|---|---|---|---|---|---|---|---|---|
| `repair-r3-determinism.md` | `05b21b6f4f84bfbe` | 1481 | 12 | 12 | 0 | 10 | 4 | 4 |
| `repair-r3-kernel.md` | `45687a09c35dd0cf` | 268 | 3 | 3 | 0 | 2 | 0 | 2 |
| `repair-r3-model.md` | `b1aa6afd975c481f` | 760 | 4 | 4 | 0 | 2 | 3 | 3 |
| `repair-r3-pipeline.md` | `2d2c4ff0cb6a4dea` | 1539 | 8 | 8 | 0 | 6 | 4 | 4 |
| `repair-r3-rendering.md` | `195dbaa2c8b278e7` | 467 | 8 | 8 | 0 | 6 | 1 | 1 |
| `repair-r3-scope.md` | `9c4b399815fd7e0b` | 921 | 11 | 11 | 0 | 9 | 1 | 2 |
| **total** | | | 46 | 46 | 0 | 35 | 13 | 16 |

* **Skipped:** none. **Truncated files:** none. **Malformed headers:** none. **Text outside blocks:** none (the preambles
  of the determinism, pipeline and scope files are ignored by the protocol).
* **Two REPLACEs of one heading:** none. The six files' REPLACE targets are disjoint.
* **Restated rows swapped into place.** The index has 12: determinism J-DET-53, J-A20.75, J-A31.76 and J-A28.73; model
  J-A28.23, J-A28.26 and J-A29.25; pipeline J-A30.41, J-A11.43 and J-A28.46; rendering J-A30.87; scope J-A17.01. Part A
  has the same 12 plus 3 restated there only: kernel J-A28.33 and J-A28.34, and scope J-A20.01. After apply-blocks those
  3 showed as `part_a_without_j_rows`, as the kernel and scope seats predicted. After the swap every Part A id has its
  index row.
* **New id:** J-A20.43 (pipeline, VD2-02), index row l. 12 984 and Part A l. 516, where the protocol appended them.
* **Headings 145 → 145; fence lines 108 → 108.** Every heading line is unchanged, the fences are balanced, and the title
  block and its review banner are byte-identical. There is no per-section review marker (0 PENDING FABLE REVIEW lines
  in the document). The rationale file outside Part A is byte-identical.

## 4 Sizes before and after

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 12 942 lines, 1 599 297 bytes, sha256 `831efd42…` | 13 028 lines, 1 618 241 bytes, sha256 `1a861c729f26ba997ae78222d867f715dac2bb77d15e3e8128c661b4f25a3817` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 050 lines, 440 261 bytes, sha256 `f2c2a1ca…` | 2 051 lines, 448 374 bytes, sha256 `8a24a5a7b571946047c14063b5ad1f29298b9d327ba6796bcde1fb17611fec3f` |
| `docs/ARCHITECTURE-VALIDATION.md` | 1 546 lines, 254 818 bytes | 1 627 lines, 260 654 bytes (§Ab.3 appended) |
| `docs/validation/doc-checks-allow.tsv` | 1 567 lines, 441 290 bytes | unchanged |
| judgment index rows / Part A entries | 469 / 469 | 470 / 470 |
| headings / fence lines | 145 / 108 | 145 / 108 |

## 5 Changed sections (exact heading lines, in document order)

* `## The whole design in one page (plain words)` — scope #1 REPLACE (83 → 83 lines)
* `### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`)` — scope #2 REPLACE (48 → 48 lines)
* `### 1.1 What is built, in what order; the two size ladders` — scope #3 REPLACE (67 → 67 lines)
* `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface` — model #1 REPLACE (571 → 593 lines)
* `### 2.8 Identity, lifecycle, provenance, the entity registry` — model #2 REPLACE (155 → 155 lines)
* `### 3.2 Numeric policy` — kernel #1 REPLACE (68 → 68 lines)
* `### 3.4 Kernel operations the pipeline needs (complete list)` — kernel #2 REPLACE (186 → 193 lines)
* `### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker` — pipeline #1 REPLACE (154 → 154 lines)
* `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule` — pipeline #2 REPLACE (179 → 182 lines)
* `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model` — pipeline #3 REPLACE (330 → 334 lines)
* `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)` — pipeline #4 REPLACE (526 → 543 lines)
* `### 5.2 Failure classes: detection, ladder, test` — determinism #1 REPLACE (30 → 30 lines)
* `### 5.3 The invariant suite, by scope (SCL-1)` — determinism #2 REPLACE (63 → 63 lines)
* `### 6.1 RNG and stream design` — determinism #3 REPLACE (139 → 141 lines)
* `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)` — determinism #4 REPLACE (184 → 187 lines)
* `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation` — determinism #5 REPLACE (230 → 233 lines)
* `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)` — determinism #6 REPLACE (273 → 280 lines)
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8` — determinism #7 REPLACE (174 → 175 lines)
* `### 7.5 Migration and upgrade (G-P9)` — determinism #8 REPLACE (89 → 91 lines)
* `### 7.6 The override layer and editable tables (G-P12; owner amendment 5)` — determinism #9 REPLACE (81 → 83 lines)
* `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)` — determinism #10 REPLACE (152 → 155 lines)
* `### 8.3 Symbol catalogue and draw-style census` — rendering #1 REPLACE (56 → 56 lines)
* `### 8.4 Layers, shadows, heights` — rendering #2 REPLACE (73 → 73 lines)
* `### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint` — rendering #3 REPLACE (90 → 91 lines)
* `### 8.6 Stage-2 render tier and stage-3 LOD` — rendering #4 REPLACE (31 → 31 lines)
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)` — pipeline #5 REPLACE (149 → 149 lines)
* `### 11.1 Formats` — rendering #5 REPLACE (119 → 119 lines)
* `### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)` — rendering #6 REPLACE (83 → 84 lines)
* `### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test` — scope #4 REPLACE (133 → 136 lines)
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT` — scope #5 REPLACE (324 → 324 lines)
* `### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)` — scope #6 REPLACE (53 → 53 lines)
* `### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5` — scope #7 REPLACE (56 → 56 lines)
* `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2` — scope #8 REPLACE (92 → 92 lines)
* `## II.6 The staged layers — floating islands and sewers: the hooks the base carries now` — pipeline #6 REPLACE (136 → 140 lines)
* `# Staged by the owner's roadmap (this document defers nothing)` — scope #9 REPLACE (21 → 21 lines)
* `# Judgment calls ("chose X over Y because Z"; each vetoable)` — its index table: 12 rows restated in place, 1 new row
  (J-A20.43) appended after the last row
* `## Part A — Judgment calls ("chose X over Y because Z"; each vetoable)` of `docs/ARCHITECTURE-RATIONALE.md` — 15
  entries restated in place, 1 new entry (J-A20.43) appended before `## Part B`

The line counts include each range's trailing blank lines. A script diffed every heading's own text against the archive
and found exactly these 36 headings changed in the document. The 19 top-level keys changed (level-1 and level-2
sections) are: the summary, §0, §1, §2, §3, §4, §5, §6, §7, §8, §10, §11, §12, §13, §15, §16, PART II (II.6), Judgment
calls and Staged. Unchanged: §9, §14, §17, PART III, Delegated decisions and Appendix A.

## 6 References

* **The resolver** (`docs/validation/amendments-b/refs.py`, assemble-r0-refs.py's logic with the widened J-id grammar;
  its JSON written to the scratchpad) found on the installed document: 139 heading keys, 35 D ids, 470 J ids and **2
  broken references**. They are the two external citations the document had before: `os-geometry.md` §2.1.4 (l. 2 708,
  marked external) and RFC 7946 §3.1.6 (l. 9 200). The pre-repair archive gives the same 2 (l. 2 679 and l. 9 123).
  **Mechanical fixes: none were needed.**
* S2 of the document checks (every `§n` / `§n.m` pointer) reports 0.

## 7 Document checks

The command was `python3 docs/validation/bench/doc_checks.py --sections "The whole design in one page,0,1,2,3,4,5,6,7,8,10,11,12,13,15,16,PART II,Judgment calls,Staged"`
with the allow file `docs/validation/doc-checks-allow.tsv`. Every key was found (0 "section not found" warnings). Cells
read hits / unreviewed.

| run | document | corpus: JSON files / C3 3-grams | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|---|
| baseline | archive `831efd42…` | 9 626 / 911 940 | 5 / 0 | 0 / 0 | 1 251 / 0 | 10 / 0 | 0 / 0 | 0 / 0 | 0 |
| **0, final (10:20)** | **installed `1a861c72…`** | **9 626 / 911 940** | **5 / 0** | **0 / 0** | **1 250 / 0** | **10 / 0** | **0 / 0** | **0 / 0** | **0** |

* No allow row was needed and none was added; the allow file is byte-identical. The six seats each reworded their own C3
  runs before landing, as their reports say.
* The unreadable-JSON warnings (994 lines, all `captures/dwellings/*/network/bodies/*.json`) are the capture bodies that
  rounds 1 and 2 also skipped. The corpus figures equal round 2's.

## 8 Notes for the verify round (no ruling needed from this lane)

The round-3 hand-offs' cross-file pointers all land in this same assembly. A string probe of the installed text
(`asm3/crosspart-probes.txt`) finds each target present:
* §4.11's *Dossier content across epochs* (cited by §7.7 and §5.3) and T20-6 in §13.2.
* The clip order in §2.6 (cited by §3.4 and §5.2), and `tileRings` in §2.6 and §5.2.
* §6.3's tunnel SPLIT rule (cited by II.6), and the `Basement.access` derivation in §2.6 (cited by §10.2).
* §2.8's and §4.1's spanned-passage stale entries.
* S11's overflow pass in §4.7 and §5.2, and the capacity re-homing in §2.6 (cited by §5.2, §7.1 and §7.3).
* `portRef`, the trapdoor and the walk-out in §13.2.
* `fieldBand` in §7.1, §7.4 and §7.5, and `UndergroundRule` and `TunnelProfileRow` in §7.6.
* `plan()` in §8.6, the seed clip in §12.7, and §1.1's pointer to §3.2 (9).

The seats' open notes, which no block applied, are these:
1. **Model → scope §13.2 / determinism §5.3.** No bar proves V-MAB2-01's re-homing on the edit paths: a `setAttr` of
   heights or a §7.6 edit of `households.max` that lowers a capacity, and the undo of each. The seat proposes extending
   T28-18 (or adding T28-19) and a §5.3 row. The probe finds "re-hom" 0 times in §13.2 and §5.3.
2. **Model, new observation (PLAUSIBLE).** It is not stated what happens when the households past a lowered capacity
   include a locked one (§4.7, §5.2, §7.2).
3. **Model, new observation (PLAUSIBLE).** Does the capacity read the base wings only, or also a stored composition's
   composed wings? A one-clause ruling in §2.6 would settle it.
4. **Determinism, for Fable.** VP2-07's F-SITING last rung against item 20 (b): can a dossier's population be dropped
   when a district's residential capacity falls short? This is a question on J-A28.46.
5. **Scope, §16 (PLAUSIBLE, recorded as a departure).** The household capacity moved from M3a to M2b (T19-4 reads it).
   The work moves between milestones and is not re-priced.

The reports' sections are: model "Cross-part notes"; determinism "For Fable to re-check first"; scope §3; pipeline
"Refinements beyond the validator's text"; kernel "Deviations"; rendering "Vetoable deviations".

## 9 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed; receipts below).**
* The archive copies are `cmp`-identical, with the hashes above.
* 46 of 46 blocks were applied and 0 skipped. Two runs gave byte-identical outputs. The live hashes were checked before
  install.
* The hand-off swapped 12 index rows and 15 Part A entries, and the swapped id sets were asserted equal to the
  hand-offs.
* The post-hand-off audit found every block present once and 470 / 470 rows. Both tables hold the same id set with no
  duplicates, and the old ids keep their order. Headings are unchanged, the fences are balanced, and the title block and
  the rationale outside Part A are unchanged.
* The resolver found 2 broken references, both pre-existing external citations.
* The check run exited 0, and so did the baseline run.
* The §Ab.3 table has 53 rows, 5 cells each. The script asserts that every row's sections are its seat's REPLACE
  targets and its J ids are rows of that seat's blocks. It also asserts that every REPLACE target and J id is covered,
  and that the primaries equal validate.md §6's 53 headings. The merged ids are read from validate.md §3.
* The string probes of §8.

**PLAUSIBLE (reasoning only).**
* That §Ab.3's per-issue sections are complete. They were transcribed from the seats' ledgers and issue tables, so a
  section a seat changed for an issue without recording it is not listed. The coverage assertion does guarantee that
  every replaced section is attributed to at least one issue.
* The mechanisms the blocks state. They are the seats' design and belong to the verify round, not this seat.

**Receipts** (session scratchpad `…/scratchpad/asm3/`):
* the apply runs: `parse.txt`, `apply-run1.txt`, `apply-run2.txt`, `apply-log1.json`, `apply-log2.json`;
* the hand-off runs: `handoff-run1.txt`, `handoff-run2.txt`, `handoff-log1.json`, `handoff-log2.json`;
* the audit: `audit.py`, `audit-final1.json`, `audit-final1.txt`, `changed.py`, `changed-sections.txt`;
* the resolver: `refs-installed.*`, `refs-before.*`;
* the check runs: `dc-inst0.txt` / `.err`, `dc-before.txt` / `.err`;
* the changelog: `changelog.py`, `changelog.json`, `changelog-rows.txt`, `ab3-head.md`, `ab3.md`;
* the probes: `probes.py`, `crosspart-probes.txt`;
* the pre-change copies: `doc-before.md`, `rat-before.md`, `validation-before.md`, `allow-before.tsv`, `queue-before.md`.
