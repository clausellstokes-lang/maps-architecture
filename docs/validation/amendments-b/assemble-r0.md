# assemble-r0 — lane amendments-b/assemble-r0 (the mechanical assembler of amendments b)

> PENDING FABLE REVIEW — Opus-produced (lane amendments-b/assemble-r0, a mechanical seat); queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 archive: done (2026-09-27 02:47; both copies cmp-identical; sha256 in §1)
> STEP 1 apply-blocks.py: done (docs/validation/amendments-b/apply-blocks.py; refs.py = the widened resolver)
> STEP 2 blocks applied to copies, audited, installed: done 02:58 (131/131 applied, 0 skipped, audit clean; installed: doc sha256 87d89692…, rationale 3f39b2de…; log assemble-r0-apply-log.json)
> STEP 3 references: done (refs.py: 2 broken = the 2 pre-existing external citations; 0 fixes needed)
> STEP 4 document checks: done 03:11 (25 keys; exit 0 — C1 5/0, C2 0/0, C3 1138/0, C4 9/0, S1 0/0, S2 0/0; 451 reviewed allow rows appended, 902 → 1 355 lines)
> STEP 5 changelog in docs/ARCHITECTURE-VALIDATION.md: done (## §Ab Amendments b applied (2026-09-26), 24 item rows)
> STEP 6 this report complete: done
> STEP 7 LANDED line: done (2026-09-27 03:17)

Lane `amendments-b/assemble-r0`, 2026-09-27 02:46–03:17. Status: COMPLETE. This is a mechanical seat: every change to
the three documents was made by a script, and no section text was edited by hand.

## Outcome

All 131 blocks of the ten `docs/validation/amendments-b/blocks-*.md` files are applied, and none was skipped. They are
61 REPLACE, 49 APPEND TO SECTION and 1 INSERT AFTER block on `docs/ARCHITECTURE.md`, 10 J-ROWS blocks (156 rows of the
judgment index) and 10 RATIONALE-A blocks (156 entries of Part A of `docs/ARCHITECTURE-RATIONALE.md`). No file was
truncated, no header was malformed, no heading was missing or ambiguous, and no heading was replaced twice.

The document grew from 9 667 to 12 417 lines (1 121 558 to 1 503 967 bytes; sha256 `1dbfd9d4…` to `87d8969209c7deb5…`).
The rationale file grew from 1 857 to 2 013 lines (279 900 to 383 760 bytes; sha256 `5f80e197…` to `3f39b2de60c97741…`).
The headings went from 140 to 145: `## II.7` and its four subsections are new, and the REPLACE of §0.2 retitled it. Code
fences are balanced (88 to 110 fence lines). The title block and its review banner are byte-identical, and the document
has no per-section review marker.

The post-application audit finds every block's text in the output exactly once. Four APPEND blocks were overwritten by a
later REPLACE of the same heading, and that REPLACE carries each of them byte for byte, as their seats arranged. They are
the §4.11 APPENDs of `blocks-pipeline-assignments.md` (#5), `blocks-pipeline-emulation-hidden.md` (#9) and
`blocks-pipeline-evolution-islands.md` (#1), carried by `blocks-pipeline-prosperity-change-dossier-plan.md` #1, and the
§4.2 APPEND of `blocks-pipeline-assignments.md` (#4), carried by `blocks-pipeline-emulation-hidden.md` #2. So a single
pass in name order gives the intended text; no block was re-applied and none is duplicated.

The reference check (the resolver with its J-id grammar widened for the dotted `J-A` ids) finds 2 broken references,
the same two external citations the document already had; no fix was needed. The document checks over the 25 changed
top-level keys exit 0 (C1 5 / 0, C2 0 / 0, C3 1 138 / 0, C4 9 / 0, S1 0 / 0, S2 0 / 0) after 451 reviewed allow rows.
The changelog is `docs/ARCHITECTURE-VALIDATION.md` "## §Ab Amendments b applied (2026-09-26)".

**Nothing needs a ruling from this lane.** The notes for the verify and repair round are in §9.

## 1 Archive

* `docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md` — `cmp`-identical to `docs/ARCHITECTURE.md` before assembly;
  sha256 `1dbfd9d4f39723ee7a48f53fca89cc4b8ae4dbdbb565d9fb46433535232bdb78`, 1 121 558 bytes, 9 667 lines.
* `docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-b-2026-09-26.md` — `cmp`-identical to
  `docs/ARCHITECTURE-RATIONALE.md` before assembly; sha256 `5f80e197795a94732b590f190c59ad9fe8e589ff336949f8b6846bb70b8cd4cf`,
  279 900 bytes, 1 857 lines.

## 2 The applier — `docs/validation/amendments-b/apply-blocks.py` (reused by later rounds)

The script is stdlib-only and never writes in place. It reads the document and the rationale file, applies the block
files in name order, and writes the two outputs and a JSON log to the paths it is given. This lane installed the outputs
by copying them over the live files, after checking that the live files still had the hashes the blocks were built on.
Its header states the protocol and its spacing rules, so a later round reproduces them. In short:

* A block is located on the document **as it stands** after the blocks before it. A subsection ends at the next heading
  of the same or a higher level, and headings inside fenced code are not headings.
* REPLACE keeps the replaced range's trailing blank lines. A body that opens with a different heading of the same level
  retitles the heading, and this is reported. A body that does not open with a heading of the target's level is skipped.
* APPEND puts one blank line and the body after the subsection's last non-blank line. INSERT AFTER puts one blank line
  and the body after the heading line.
* J-ROWS go directly after the last row of the `| id | the choice | where |` table in `# Judgment calls`. RATIONALE-A
  rows go directly after the last row of Part A's `| id | call |` table, before `## Part B`. Neither table gets a blank
  line. Duplicate ids, rows already present and rows with the wrong cell count are reported.
* The audit searches each applied block's body in the output as a contiguous run of lines. It then classifies it as
  present once, CARRIED, SUPERSEDED, LOST, DUPLICATED or MISSING. It also checks the J-ROWS ids against the RATIONALE-A
  ids, duplicate ids in both tables, headings, fences and the title block.

The run is reproducible: two runs on the same inputs gave byte-identical outputs. The log is
`docs/validation/amendments-b/assemble-r0-apply-log.json`. It records every block's target line, its old and new range,
its body hash, the rows it inserted and the audit state.

## 3 Blocks applied and skipped, per file

| block file | sha256 (first 16) | lines | blocks | applied | skipped | REPLACE / APPEND / INSERT | J-ROWS rows | Part A entries |
|---|---|---|---|---|---|---|---|---|
| `blocks-determinism.md` | `a49e006dc5823462` | 1587 | 17 | 17 | 0 | 13 / 2 / 0 | 25 | 25 |
| `blocks-kernel.md` | `5cfc335eb21cfebc` | 644 | 8 | 8 | 0 | 5 / 1 / 0 | 7 | 7 |
| `blocks-model.md` | `94d5ff24b323c687` | 1639 | 11 | 11 | 0 | 8 / 1 / 0 | 21 | 21 |
| `blocks-pipeline-assignments.md` | `988ba64dc1eb320b` | 510 | 10 | 10 | 0 | 3 / 5 / 0 | 13 | 13 |
| `blocks-pipeline-emulation-hidden.md` | `966f9d427e448cd2` | 1029 | 13 | 13 | 0 | 4 / 7 / 0 | 15 | 15 |
| `blocks-pipeline-evolution-islands.md` | `0515d1303d335691` | 253 | 8 | 8 | 0 | 0 / 6 / 0 | 15 | 15 |
| `blocks-pipeline-prosperity-change-dossier-plan.md` | `510dbacc8e3382c6` | 701 | 14 | 14 | 0 | 1 / 11 / 0 | 18 | 18 |
| `blocks-pipeline-sewers.md` | `a177eb924ed36404` | 345 | 10 | 10 | 0 | 0 / 8 / 0 | 10 | 10 |
| `blocks-rendering.md` | `cb8388671426a03c` | 1515 | 19 | 19 | 0 | 17 / 0 / 0 | 14 | 14 |
| `blocks-scope.md` | `c9a1b97b8adab6ef` | 1147 | 21 | 21 | 0 | 10 / 8 / 1 | 18 | 18 |
| **total** | | | 131 | 131 | 0 | 61 / 49 / 1 | 156 | 156 |

* **Skipped:** none. **Truncated files:** none, and every file ends with `=== END ===`. **Malformed headers:** none.
  **Text outside blocks:** none, beyond each file's preamble.
* **Two REPLACEs of one heading:** none. Several headings take a REPLACE and APPENDs from different files, in name
  order: §4.2, §4.5, §4.6, §4.7, §4.9, §4.11 and §10.2. The audit confirms every one of those bodies once.
* **Carried blocks (CARRIED by a later REPLACE, present once, byte-identical):** `blocks-pipeline-assignments.md` #4
  (§4.2) and #5 (§4.11), `blocks-pipeline-emulation-hidden.md` #9 (§4.11) and `blocks-pipeline-evolution-islands.md`
  #1 (§4.11). Two seats' notes had asked for re-application: the emulation-hidden seat's note (3) and the assignments
  seat's note (a). The prosperity seat's 01:30 rebuild and the emulation seat's §4.2 REPLACE made that unnecessary,
  because they carry the text. The audit is the proof. Re-applying would have duplicated 195 lines in §4.11 and 12 in §4.2.
* **Retitled heading:** `blocks-scope.md` #2 names `` ### 0.2 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land ``
  and opens with `` ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`) ``.
  Every `§0.2` pointer still resolves.
* **J ids:** 156 `J-A` ids; each has one index row and one Part A entry (0 without the other, 0 in two blocks, 0 duplicates
  in either table: 432 rows each). The rows follow the files' name order (determinism, kernel, model, the five pipeline
  seats, rendering, scope), not the item order, because the protocol appends.
* **REPLACE deltas:** the 61 REPLACE bodies keep 5 546 of the 5 921 old lines verbatim, change 375 and add 2 059 lines.
  The largest shares of changed old lines are §4.7 (35 of 146), §4.5 (27 of 115), §4.11 (23 of 161), §4.9 (21 of 102),
  §7.7 (21 of 63) and §14 (21 of 173); each is the seat's stated substitution set. Two REPLACE sets (kernel and
  pipeline-assignments) were generated from the route's snapshot `7a4e19db…`. A diff of a copy of that snapshot against
  the archived `1dbfd9d4…` shows three hunks, all outside those sections: the banner line, one line of §9.5, and two lines
  of §12.6 joined into one. So nothing was reverted. Both manual r3
  fixes survive: "§6.3's budget" in §12.6 and "the export's declared grid, §11.1" in §9.5.

## 4 Sizes before and after

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 9 667 lines, 1 121 558 bytes, sha256 `1dbfd9d4…` | 12 417 lines, 1 503 967 bytes, sha256 `87d8969209c7deb59ab7e112bf9578c06f7ac67a7deaa42b7973599f30cc0429` |
| `docs/ARCHITECTURE-RATIONALE.md` | 1 857 lines, 279 900 bytes, sha256 `5f80e197…` | 2 013 lines, 383 760 bytes, sha256 `3f39b2de60c977419b06583592a3aeb4011ab9b6221d9d148dcf133047e63685` |
| `docs/ARCHITECTURE-VALIDATION.md` | 1 122 lines, 216 334 bytes | 1 174 lines, 229 860 bytes (the §Ab section appended) |
| `docs/validation/doc-checks-allow.tsv` | 902 lines, 174 249 bytes | 1 355 lines, 345 674 bytes (2 comment lines and 451 rows appended; the first 902 lines unchanged, diffed) |
| headings of the document | 140 | 145 |
| judgment index rows / Part A entries | 276 / 276 | 432 / 432 |

## 5 Changed sections (exact heading lines)

Changed sections, in document order (86 headings targeted, plus the new headings and the two tables):

* `## The whole design in one page (plain words)` — scope #1 APPEND
* `` ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`) `` — scope #2 REPLACE — retitled; the block names the old heading `` ### 0.2 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land ``
* `### 1.1 What is built, in what order; the two size ladders` — scope #3 REPLACE
* `### 1.2 The one-click default, stated once` — scope #4 REPLACE
* `### 1.4 Fusion thesis, stage by stage` — scope #5 REPLACE
* `### 2.1 Layers, coordinates, units, ids` — model #1 APPEND
* `### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices` — model #2 REPLACE
* `### 2.3 Terrain and water` — model #3 REPLACE
* `### 2.4 Ways (the skeleton) and typed edges` — model #4 REPLACE
* `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector` — model #5 REPLACE
* `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface` — model #6 REPLACE
* `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records` — model #7 REPLACE
* `### 2.8 Identity, lifecycle, provenance, the entity registry` — model #8 REPLACE
* `### 2.9 The document and serialisation` — model #9 REPLACE
* `### 3.1 Build-versus-adopt, per primitive` — kernel #1 REPLACE
* `### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end` — kernel #2 REPLACE
* `### 3.4 Kernel operations the pipeline needs (complete list)` — kernel #3 APPEND
* `### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement` — kernel #4 REPLACE
* `### 3.8 The straight skeleton — numeric contract, validator, downgrades` — kernel #5 REPLACE
* `### 3.10 Kernel invariants — what is checked, when, and at what cost` — kernel #6 REPLACE
* `### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker` — pipeline-emulation-hidden #1 APPEND; pipeline-prosperity-change-dossier-plan #2 APPEND
* `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace` — pipeline-assignments #4 APPEND; pipeline-emulation-hidden #2 REPLACE; pipeline-prosperity-change-dossier-plan #3 APPEND; pipeline-sewers #5 APPEND
* `### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph` — pipeline-emulation-hidden #3 APPEND
* `### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check` — pipeline-emulation-hidden #4 APPEND
* `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims` — pipeline-emulation-hidden #5 REPLACE; pipeline-prosperity-change-dossier-plan #4 APPEND; pipeline-sewers #6 APPEND
* `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule` — pipeline-emulation-hidden #6 REPLACE; pipeline-prosperity-change-dossier-plan #5 APPEND
* `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model` — pipeline-assignments #1 REPLACE; pipeline-emulation-hidden #7 APPEND; pipeline-evolution-islands #4 APPEND; pipeline-prosperity-change-dossier-plan #6 APPEND
* `### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)` — pipeline-emulation-hidden #8 REPLACE; pipeline-evolution-islands #3 APPEND; pipeline-prosperity-change-dossier-plan #7 APPEND
* `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)` — pipeline-assignments #5 APPEND; pipeline-emulation-hidden #9 APPEND; pipeline-evolution-islands #1 APPEND; pipeline-prosperity-change-dossier-plan #1 REPLACE
* `### 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer)` — pipeline-assignments #6 APPEND; pipeline-sewers #7 APPEND
* `### 5.2 Failure classes: detection, ladder, test` — determinism #1 REPLACE
* `### 5.3 The invariant suite, by scope (SCL-1)` — determinism #2 REPLACE
* `### 5.4 The generation report` — determinism #3 REPLACE
* `### 6.1 RNG and stream design` — determinism #4 REPLACE
* `### 6.2 What a seed determines, and the model digest` — determinism #5 APPEND
* `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)` — determinism #6 REPLACE
* `### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10)` — determinism #7 REPLACE
* `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation` — determinism #8 REPLACE
* `### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes` — determinism #9 REPLACE
* `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)` — determinism #10 REPLACE
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8` — determinism #11 REPLACE
* `### 7.5 Migration and upgrade (G-P9)` — determinism #12 APPEND
* `### 7.6 The override layer and editable tables (G-P12; owner amendment 5)` — determinism #13 REPLACE
* `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)` — determinism #14 REPLACE
* `### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)` — determinism #15 REPLACE
* `### 8.1 The display list (renderer-independent, columnar, incremental)` — rendering #1 REPLACE
* `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)` — rendering #2 REPLACE
* `### 8.3 Symbol catalogue and draw-style census` — rendering #3 REPLACE
* `### 8.4 Layers, shadows, heights` — rendering #4 REPLACE
* `### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint` — rendering #5 REPLACE
* `### 8.6 Stage-2 render tier and stage-3 LOD` — rendering #6 REPLACE
* `### 8.9 Backends, text, threads and the worker boundary` — rendering #7 REPLACE
* `### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally` — rendering #8 REPLACE
* `### 9.5 Furniture, framing and tools` — rendering #9 REPLACE
* `### 10.1 Scope and depth (judgment J-9; IMPROVEMENTS J-S adopted; the content locality contract)` — pipeline-assignments #2 REPLACE
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)` — pipeline-assignments #3 REPLACE; pipeline-emulation-hidden #10 APPEND; pipeline-evolution-islands #5 APPEND; pipeline-prosperity-change-dossier-plan #8 APPEND; pipeline-sewers #8 APPEND
* `### 10.3 People, households, relations, sub-locations, schedules` — pipeline-assignments #7 APPEND
* `### 11.1 Formats` — rendering #10 REPLACE
* `### 11.2 The embedding API and the worker boundary (SCL-6)` — rendering #11 REPLACE
* `### 11.3 The host bridge — the host is the store (FTG-12)` — rendering #12 REPLACE
* `### 11.4 Host inputs (DEF-11)` — rendering #13 REPLACE
* `### 12.4 CITY per-stage split (SCL-3)` — rendering #14 REPLACE
* `### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)` — rendering #15 REPLACE
* `### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)` — rendering #16 REPLACE
* `### 12.8 Memory (what is counted, per rung)` — rendering #17 REPLACE
* `### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test` — scope #6 APPEND
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT` — scope #7 APPEND
* `### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file` — scope #8 APPEND
* `### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)` — scope #9 APPEND
* `### 13.8 CI tiers and compute budgets (SCL-18; D-34)` — scope #10 APPEND
* `### 13.9 The corpus-calibration interface (staged by the owner; DEF-9)` — scope #11 APPEND
* `## §14 Package and module layout, key interfaces, dependency rules, extension points` — scope #12 REPLACE
* `` ### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5 `` — scope #13 REPLACE
* `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2` — scope #14 REPLACE
* `### 17.1 The clean-room chain (IMP-1; D-29)` — scope #15 REPLACE
* `# PART II — STAGE 2: the city composed of neighbourhoods (interface depth; built after the base)` — pipeline-sewers #1 APPEND
* `## II.1 The district → neighbourhood interface` — pipeline-prosperity-change-dossier-plan #9 APPEND; pipeline-sewers #3 APPEND
* `## II.3 Block content dispatch, pins, local identities (stage-2 feature S2: context features)` — pipeline-prosperity-change-dossier-plan #10 APPEND
* `## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6)` — pipeline-prosperity-change-dossier-plan #11 APPEND
* `## II.5 What the base already carries for stage 2 (all base requirements in PART I)` — pipeline-prosperity-change-dossier-plan #12 APPEND
* `## II.6 The staged layers — floating islands and sewers: the hooks the base carries now` — pipeline-evolution-islands #2 APPEND; pipeline-sewers #2 APPEND
* `# PART III — What a later village product needs from the base (one page; the hooks are concrete)` — pipeline-assignments #8 APPEND; pipeline-emulation-hidden #11 APPEND; pipeline-evolution-islands #6 APPEND; pipeline-sewers #4 APPEND
* `# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)` — scope #16 REPLACE
* `# Judgment calls ("chose X over Y because Z"; each vetoable)` — scope #17 INSERT AFTER
* `# Staged by the owner's roadmap (this document defers nothing)` — scope #18 REPLACE
* `# Appendix A — reading record, and CONFIRMED versus PLAUSIBLE` — scope #19 APPEND
* `## II.7 The sewer layer — existence by tier, the network stage, the underground neighbourhoods (staged, with its base hooks)` — NEW (added inside `blocks-pipeline-sewers.md` #1, the APPEND to PART II)
* `### II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the toggle as visibility, the drain rule` — NEW (added inside `blocks-pipeline-sewers.md` #1, the APPEND to PART II)
* `### II.7.2 The network stage: the gate, the underground arena's levels, the tunnel profile, depth and outfalls, editing` — NEW (added inside `blocks-pipeline-sewers.md` #1, the APPEND to PART II)
* `### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order` — NEW (added inside `blocks-pipeline-sewers.md` #1, the APPEND to PART II)
* `### II.7.4 The hook interfaces and the base's part` — NEW (added inside `blocks-pipeline-sewers.md` #1, the APPEND to PART II)
* `# Judgment calls ("chose X over Y because Z"; each vetoable)` — its index table: 156 `J-A` rows after `J-I19` (10 J-ROWS blocks), besides scope #17's INSERT AFTER
* `` docs/ARCHITECTURE-RATIONALE.md`, `## Part A — Judgment calls ("chose X over Y because Z"; each vetoable) `` — 156 entries after `J-I19`, before `## Part B` (10 RATIONALE-A blocks)

## 6 References

* **The resolver.** The lane ran `docs/validation/amendments-b/refs.py`, a copy of
  `docs/validation/consistency/assemble-r0-refs.py` with one change: the J-id grammar is widened so that the protocol's
  dotted ids resolve. Definitions use `\|\s*(J-[A-Z0-9.-]+?)\s*\|`. Citations use
  `(J-(?:[A-Z]+-?)?\d+(?:\.\d+)?)(?!\d)(?!\.\d)`. Every seat flagged this widening. The citation look-ahead deviates on
  purpose from the seats' suggested `(?![\d.])`, which would silently skip every id that ends a sentence (`J-DET-12.`).
* **Result on the assembled document:** 139 heading keys, 35 D ids and 432 J ids; **2 broken references**. They are the
  same two external citations the untouched document has: `os-geometry.md` §2.1.4 (l. 2552, marked external) and
  RFC 7946 §3.1.6 (l. 8726). They are not references into this document, so no fix was made.
* **For comparison:** the unwidened original reports 331 broken references on the same document, namely those 2 plus
  329 dotted `J-A` citations.
* **Extra checks:**
  * All 88 `II.7.n` citations resolve to the four new `### II.7.n` headings.
  * Every `J-A` range cited in the text (such as `J-A31.41–.49`) exists row by row (0 missing).
  * doc_checks S2 (every `§n` / `§n.m` pointer) reports 0.
* **Mechanical fixes made: none were needed.**

## 7 Document checks

The command was `python3 docs/validation/bench/doc_checks.py --sections "The whole design,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,PART II,PART III,Delegated decisions,Judgment calls,Staged,Appendix A"`,
with the allow file `docs/validation/doc-checks-allow.tsv`. These are the 25 top-level keys the blocks changed. `PART II`
spans II.1–II.7, and the title block and the `# PART I` heading line are the only text outside the keys.

| run (end) | document | corpus: JSON files / C3 3-grams | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|---|
| baseline (02:54) | the untouched document `1dbfd9d4…` | 9 626 / 859 804 | 5 / 0 | 0 / 0 | 744 / 76 | 7 / 0 | 0 / 0 | 0 / 0 | 1 |
| 1 (02:54) | the assembled copy `87d89692…` | 9 626 / 859 804 | 5 / 0 | 0 / 0 | 1 069 / 394 | 9 / 2 | 0 / 0 | 0 / 0 | 1 |
| 2 (03:01) | installed `87d89692…` | 9 626 / 868 386 | 5 / 0 | 0 / 0 | 1 131 / 460 | 9 / 2 | 0 / 0 | 0 / 0 | 1 |
| 442 rows appended | | | | | | | | | |
| 3 (03:08) | installed | 9 626 / 871 473 | 5 / 0 | 0 / 0 | 1 138 / 10 | 9 / 0 | 0 / 0 | 0 / 0 | 1 |
| 9 rows appended | | | | | | | | | |
| **4, final (03:11)** | **installed** | **9 626 / 871 603** | **5 / 0** | **0 / 0** | **1 138 / 0** | **9 / 0** | **0 / 0** | **0 / 0** | **0** |

Cells read hits / unreviewed.

**The corpus was live.** `research/findings/code-mfcg.md` (02:02) and `code-village.md` (02:31) had joined it before this
lane began. The untouched document alone already raised 76 unreviewed C3 hits against them. `code-neighbourhood.md` was
written from 02:32 until its lane landed at 03:05, and it raised runs 2 and 3's new hits. Many of those are the design's
own phrases and audit ids, quoted in that file's design-versus-code table.

**What was reviewed.**
* **Attribution.** Every unreviewed hit was attributed by script (`scratchpad/asm/attrib.py`), with the check's own
  tokenisation. The script records which corpus files hold each 3-gram of the run and which files hold the whole run
  contiguously. It also records whether the run is unchanged text of the archived document or which block file carries
  it.
* **Reading.** Every run was then read in its category list, and the ones matched whole by a reference-reading findings
  file were read in context.
* **Classification.** `scratchpad/asm/classify.py` wrote each row's reason from its category.

None of the hits is a reference list, table, grammar, palette or identifier. The 451 rows (451 distinct texts) are:

| category | rows |
|---|---|
| our own new text, stitched: the run occurs contiguously in no corpus file | 152 |
| our own new text restated from `research/findings/dwellings-synthesis.md`, the program's own Fable synthesis of item 28 (in no reference-reading findings file) | 130 |
| corpus growth on text unchanged by this pass, stitched | 95 |
| section-pointer digits, stage or item labels and numeric values | 53 |
| corpus growth on unchanged text that a `code-*.md` findings file (written after it) also contains | 15 |
| ordinary phrases of our new text that a findings file also uses ("one at a time from the", "depends on the seed and", "lie on the kerb the") | 3 |
| our own §4.6 width formula, quoted by `code-neighbourhood.md` | 1 |
| C4: generic nouns of our own sentences that are members of one 44-word place-name list in `captures/village/…/0013-eda47b10.json` ("court gate hall side yard", l. 876; "cross point side wall yard", l. 5411) | 2 |

* **Seat-proposed rows.** 295 of the 451 texts had a reviewed row proposed by a seat: `amend-model.md` 176,
  `amend-determinism.md` 105 and `amend-scope.md` 14. The attribution confirms each of them. Thirteen proposed rows never
  appeared as hits, so they were not added.
* **Stale allow rows are kept.** No row was dropped, and the file was only appended to.
* **Hazard for the next doc_checks seat.** A new lane, `code/manor`, STARTED at 03:08 and is writing
  `research/findings/code-manor.md`. The final run above saw that file as a skeleton. As it grows it will raise new
  stitched C3 runs over unchanged text, as the other `code-*` findings did. The next seat that runs doc_checks should
  review its own run's hits, or run after that lane lands.

## 8 Changelog

`docs/ARCHITECTURE-VALIDATION.md` now ends with "## §Ab Amendments b applied (2026-09-26)". It opens with a paragraph on
the application: the counts, hashes, archive, headings, carried blocks, references and checks. A legend follows, then the
24-row table *item · home section · referencing sections · blocks applied*.
* **Home and referencing sections** are read from the landing table of the assembled §0.2, the design's own record of
  where items 8–31 land.
* **"Blocks applied"** lists, per block file, the blocks whose text names the item ("item N", `J-AN.n`, `TN-n`, `AM-N`),
  with each block's target key and kind.
* **J-rows.** Each row ends with the item's `J-A` row count.

The table's cells have 4 columns throughout (checked).

## 9 Notes for the verify and repair round (no ruling needed from this lane)

1. **Carried and superseded text.** Nothing was lost, and the audit shows every block present once. The emulation-hidden
   seat's note (3), "apply my §4.11 APPEND after the prosperity REPLACE", is superseded by that seat's own later rebuild
   (01:30), which carries it. Following note (3) would have duplicated 52 lines.
2. **Superseded phrases kept in the one-page summary.** "the market square, the castle and the large precincts are
   reserved" (1 occurrence) and "about 153–204 expert person-weeks" (1) remain in place, as the scope seat's note (c)
   says. The appended summary paragraph names both as superseded. A finishing seat allowed to touch the summary may fold
   them in.
3. **Retired-text probes.** These phrases now occur 0 times:
   * "calls modest", "When the island toggle is on, S7b creates";
   * "only on new or transformed plots", "periphery, lowest value";
   * "the best is the **centre / market**";
   * `entrance: VertexRef`, "a field brush or an epoch compares";
   * `use: Id /* roster building type */`.

   "only outside the enceinte" occurs once, inside the J-A27.43 index row that names the retired clause.
4. **The index order.** The 156 `J-A` rows sit in application order (file name), not item order. The introduction
   inserted by `blocks-scope.md` #17 explains the id scheme.
5. **The resolver.** Later rounds should run `docs/validation/amendments-b/refs.py` instead of the r0 resolver, which
   misreads every dotted id.
6. **The corpus.** See §7's hazard.

## 10 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed; receipts below).**
* The archive copies are `cmp`-identical, with hashes as listed.
* 131 of 131 blocks were applied and 0 skipped. Two runs gave byte-identical outputs. The live files' hashes were checked
  before install and the installed hashes after.
* The audit states, the heading, fence and title-block checks, the J-id and Part A cross-checks, and the cell counts of
  Part A and of the §Ab table.
* The resolver result, with 2 broken references, both external.
* The four doc_checks runs, the last exiting 0.
* The attribution of every reviewed hit.
* The retired-text probes.
* The diff of the route's snapshot `7a4e19db…` (a scratchpad copy, `ARCH-snapshot.md`) against the archived `1dbfd9d4…`: three hunks, none in a section a snapshot-generated block replaces.

**PLAUSIBLE (reasoning only).**
* That the 451 allowed runs are false positives. The judgment rests on the attribution (no run is held whole by a
  reference-reading source, except ordinary phrases and the design's own text quoted back) and on reading the runs; it
  is not a proof.
* That the item-to-block mapping of the changelog is complete. It is a mechanical proxy (explicit item mentions), so a
  block that serves an item without naming it is not listed.
* The mechanisms the blocks state. They are the seats' design and are for the verify round, not this seat.

**Receipts** (session scratchpad `…/scratchpad/asm/`):
* the apply logs `apply-log.json` and `apply-log2.json`, `apply-run1.txt` and `apply-run2.txt`;
* the diffs `doc.diff` and `rat.diff`, and `replace-deltas.txt`;
* the resolver outputs `refs-live.*`, `refs-out.*`, `refs-out-orig.*` and `refs-installed.*`;
* the check runs `dc-live1.txt`, `dc-out1.txt` and `dc-inst1.txt`–`dc-inst3.txt`;
* the attribution, classification and row files `attrib*.json`, `unreviewed*.tsv` and `allow-inst*.tsv`;
* the changelog inputs `landing-rows.json` and `changelog-rows.md`;
* the pre-append copies `validation-before.md` and `allow-before.tsv`.


## Fable review (2026-09-27) — B-amendments-b/assemble-r0

Reviewer: Fable (claude-fable-5-1), lane fable-review/main/integration (`docs/fable-review/main/integration.md`).
**Verdict: CONFIRMED.** Fidelity re-derived by script against the archives: the first five REPLACE blocks of
`blocks-model.md` (§2.2–§2.6) equal their subsections in `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r1-2026-09-27.md`
(87d89692…) line for line ignoring blank lines and differ from the pre-r0 archive (1dbfd9d4…); the four CARRIED APPEND
bodies (§4.2 assignments #4; §4.11 assignments #5, emulation-hidden #9, evolution-islands #1) are present exactly once,
whole; the archive sha256 chain matches every report. Of the 451 allow rows, fourteen sampled from the dwellings-synthesis
category are our own record names and phrases (restatements of the program's own synthesis, no reference list, tag list or
palette) and the two C4 rows are chance matches of generic nouns. The applier's spacing and carried-block rules and the
changelog's explicit-mention proxy are as stated. No correction.
