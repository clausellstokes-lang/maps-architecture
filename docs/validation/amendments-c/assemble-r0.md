# assemble-r0 — lane amendments-c/assemble-r0 (the mechanical assembler of the bundled pass c + d + e)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/assemble-r0).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 archive: done (2026-09-28 04:20; both copies cmp-identical, read-only; sha256 design 1c23190f040c8935…, rationale 0be40dfd41ff9678…)
> STEP 1 apply-blocks.py: done (docs/validation/amendments-c/apply-blocks.py; synthetic test: clean merge, conflict skip, missing heading, truncated tail, two-pass versus one-pass)
> STEP 2 blocks applied to copies, audited, installed: done 04:20 (two-pass order: 132/132 applied, 0 skipped, audit 0 not OK; one-pass comparison LOSES T #3 (§4.5 APPEND); installed: doc sha256 994ea880…, rationale 84cf0c37…; logs assemble-r0-apply-log.json and assemble-r0-apply-log-one-pass.json)
> STEP 3 references: done 04:22 (resolver amendments-b/refs.py: 2 broken before = 2 after, both pre-existing external citations; a wide J-id scan found 2 cited-but-undefined Fable ids, J-Fdet-1 and J-Fredteam-1, fixed mechanically by applying their Fable J-ROWS and RATIONALE-A verbatim (assemble-r0-refs-fix.blocks; doc 7f4c0e25…, rationale 22f01184…); 0 undefined after)
> STEP 4 document checks: done 04:31 (25 keys; exit 0: C1 5/0, C2 0/0, C3 1441/0, C4 12/0, S1 0/0, S2 0/0; 125 reviewed allow rows appended, 1 579 → 1 705 lines)
> STEP 5 changelog in docs/ARCHITECTURE-VALIDATION.md: done (## §Ac Amendments c applied (2026-09-27), 59 item rows)
> STEP 6 this report complete: done
> STEP 7 queue row + LANDED line: done (04:40; queue row B-amendments-c/assemble-r0 appended once)

Lane `amendments-c/assemble-r0`, 2026-09-28 04:17–04:40. Status: COMPLETE. This is a mechanical seat. Every change to
the three documents was made by a script, and no section text was edited by hand.

## Outcome

All 132 blocks of the twelve `docs/validation/amendments-c/blocks-*.md` files are applied, and none was skipped. They are
82 REPLACE, 25 APPEND TO SECTION and 1 INSERT AFTER block on `docs/ARCHITECTURE.md`, 12 J-ROWS blocks (230 rows of the
judgment index) and 12 RATIONALE-A blocks (230 entries of Part A of `docs/ARCHITECTURE-RATIONALE.md`). No file was
truncated, no header was malformed, and no heading was missing or ambiguous. No heading was replaced twice, so the
three-way merge never ran on the real blocks.

The blocks were applied in the **two-pass order** of route §C.9.2: every REPLACE first, then every INSERT AFTER, APPEND
TO SECTION, J-ROWS and RATIONALE-A block, each group in file-name order and block order. The task's literal order (files
in name order, blocks in file order) was also run, on a copy, and it provably loses one block. Seat T's §4.5 APPEND
(item 72's home paragraphs, "Neighbourhood character, identity, the three dials and the band range") would be applied
before seat C's §4.5 REPLACE, because `blocks-pipeline-transitions-…` sorts before `blocks-pipeline-walls-…`, and the
REPLACE would then erase it. The one-pass audit reports it LOST, and the two-pass audit finds every block's text exactly
once. This is the only difference between the two orders.

The document grew from 13 026 to 16 872 lines (1 645 248 to 2 192 330 bytes; sha256 `1c23190f…` to
`7f4c0e253438b41b…`). The rationale file grew from 2 053 to 2 285 lines (459 633 to 623 311 bytes; sha256 `0be40dfd…`
to `22f01184eac296c1…`). The headings went from 145 to 147; the new ones are II.7.5 and II.7.6, which seat D's
APPEND to II.7.4 carries. Code fences are balanced (108 to 130 fence lines). The title block and its one review banner
are byte-identical, and the document has no per-section review marker.

The reference check found two cited judgment ids that had no index row and no Part A entry, **J-Fdet-1** (§7.4) and
**J-Fredteam-1** (§4.6 and §5.2's F-CUT row). The seats had folded the section text of those Fable review blocks and asked
the assembler to apply only their rows. This lane applied the two J-ROWS and two RATIONALE-A rows verbatim from
`docs/fable-review/main/blocks-determinism.md` and `blocks-redteam.md`, and none of their APPEND bodies. After that, every
cited J id resolves (704 defined, 704 cited). The resolver's two remaining broken references are the two external
citations the document already had. The document checks over the 25 changed top-level keys exit 0 (C1 5 / 0, C2 0 / 0,
C3 1 441 / 0, C4 12 / 0, S1 0 / 0, S2 0 / 0) after 125 reviewed allow rows. The changelog is
`docs/ARCHITECTURE-VALIDATION.md` "## §Ac Amendments c applied (2026-09-27)".

**Nothing needs a ruling from this lane.** The two judgment calls it made are in §10, and the open cross-part findings
for the verify and repair round are in §9.

## 1 Archive

* `docs/archive/ARCHITECTURE-pre-amendments-c-2026-09-27.md` is `cmp`-identical to `docs/ARCHITECTURE.md` before
  assembly: sha256 `1c23190f040c8935532e81731dfaa7df44a7aad43033fba3a0eb0e92011af461`, 1 645 248 bytes, 13 026 lines.
* `docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-2026-09-27.md` is `cmp`-identical to
  `docs/ARCHITECTURE-RATIONALE.md` before assembly: sha256 `0be40dfd41ff9678dcc83c9476e3bfa08c7a6ed88fd113a513e00577e7ff2b37`,
  459 633 bytes, 2 053 lines.
* Both are mode 444, like the earlier archives. Neither existed before this lane, and neither was overwritten.
* Every seat built its blocks on these hashes (the route and all twelve LANDED lines name design `1c23190f…`). Before
  installing, the lane checked that the live files still had them.

## 2 The applier — `docs/validation/amendments-c/apply-blocks.py` (reused by later rounds)

The script is `docs/validation/amendments-b/apply-blocks.py` with the same spacing rules and the same audit, plus two
changes. Both are stated in its header.

1. **Order.** `--order two-pass` is the default: every REPLACE runs first, then the other kinds, in the same file and
   block order. `--order one-pass` reproduces the literal order for comparison.
2. **A second REPLACE of one heading.** It is merged three-way with `git merge-file -p OURS BASE THEIRS`. The base is
   the subsection in the input document (the archive), ours is the subsection as it stands (the first block's body), and
   theirs is the second block's body. A clean merge is applied and logged under `merges`. A conflicting merge keeps
   the first block; the second is skipped and reported for the repair round.

The rest is unchanged. A block naming a missing heading is skipped and reported. A file whose last block is not closed
is TRUNCATED: its complete blocks are applied and the tail is skipped. J-ROWS go after the last row of the `# Judgment
calls` index table, and RATIONALE-A rows after the last row of Part A's table, before `## Part B`.

**Receipts.**
* A synthetic test (scratchpad `asm/t/`) covered each path. A clean merge of two non-overlapping REPLACEs kept both
  changes. A conflicting third REPLACE was skipped with "CONFLICT — 1 conflicting hunk(s)". A missing heading was
  skipped, and a truncated tail was skipped. An APPEND that sorts before a REPLACE of its heading survives two-pass and
  is LOST under one-pass.
* The real run is reproducible: two runs on the same inputs gave byte-identical outputs.
* The logs are `assemble-r0-apply-log.json` (the installed two-pass run), `assemble-r0-apply-log-one-pass.json` (the
  comparison run, never installed) and `assemble-r0-refs-fix-log.json` (the reference fix).

## 3 Blocks applied and skipped, per file

| seat | block file | sha256 (first 16) | lines | blocks | applied | skipped | REPLACE / APPEND / INSERT | J-ROWS rows | Part A entries |
|---|---|---|---|---|---|---|---|---|---|
| E2 | `blocks-determinism-determinism-undergrou….md` | `7d3e89df3e9ff793` | 2047 | 17 | 17 | 0 | 14 / 1 / 0 | 24 | 24 |
| E1 | `blocks-determinism-dossier.md` | `161e4e760f678871` | 530 | 3 | 3 | 0 | 1 / 0 / 0 | 24 | 24 |
| K | `blocks-kernel.md` | `6cfa332ea201e88e` | 474 | 7 | 7 | 0 | 5 / 0 / 0 | 4 | 4 |
| M | `blocks-model.md` | `41e22b9768006294` | 2007 | 11 | 11 | 0 | 9 / 0 / 0 | 18 | 18 |
| A | `blocks-pipeline-bentcut.md` | `67289e48f3a9d647` | 304 | 4 | 4 | 0 | 2 / 0 / 0 | 11 | 11 |
| B | `blocks-pipeline-plots.md` | `48fc2b8f9ac09c90` | 391 | 3 | 3 | 0 | 1 / 0 / 0 | 5 | 5 |
| D | `blocks-pipeline-staged-clandestine-under….md` | `0f3af41c4dbe6b17` | 1137 | 12 | 12 | 0 | 7 / 2 / 1 | 21 | 21 |
| T | `blocks-pipeline-transitions-informal-cha….md` | `3c58b6e38f7fb4a8` | 1510 | 13 | 13 | 0 | 2 / 9 / 0 | 42 | 42 |
| C | `blocks-pipeline-walls-districts-hinterla….md` | `18778ea2c8797524` | 1202 | 8 | 8 | 0 | 6 / 0 / 0 | 10 | 10 |
| R | `blocks-rendering.md` | `948ad1c1e7af9699` | 2273 | 25 | 25 | 0 | 18 / 5 / 0 | 30 | 30 |
| S1 | `blocks-scope-provenance-bentcut-calibrat….md` | `6c9f21edfaac7904` | 1265 | 13 | 13 | 0 | 10 / 1 / 0 | 18 | 18 |
| S2 | `blocks-scope-render-labels-dossier-plots….md` | `1aa57a6f84f4e133` | 1056 | 16 | 16 | 0 | 7 / 7 / 0 | 23 | 23 |
| **total** | | | | 132 | 132 | 0 | 82 / 25 / 1 | 230 | 230 |

* **Skipped:** none. **Truncated files:** none; every file ends with `=== END ===`. **Malformed headers:** none.
  **Text outside blocks:** none, beyond each file's preamble.
* **Two REPLACEs of one heading:** none, so there was no merge and no conflict.
* **Headings with a REPLACE and APPENDs from several blocks:**
  * §4.5: C REPLACE, then T APPEND. This is the one the one-pass order breaks.
  * §4.6: A REPLACE, then T APPEND.
  * §4.7: B REPLACE, then D APPEND, then T APPEND, in route exception 3's order.
  * §10.2 and PART III: D REPLACE, then T APPEND.
  * II.7.4: D REPLACE, then D APPEND, which adds II.7.5 and II.7.6.
  * §13.2: S1 REPLACE, then S2 APPEND.

  The audit finds each body once.
* **Audit:** 132 of 132 blocks OK, present once. 0 CARRIED, 0 SUPERSEDED, 0 LOST, 0 DUPLICATED and 0 MISSING.
* **J ids:** 230 new `J-A…` and `J-Fpipe-2` rows, and each has one index row and one Part A entry. None lacks its
  partner, none appears in two blocks, and there are no duplicate ids. Both tables go from 472 to 702 rows, and to 704
  after the reference fix. The rows follow the files' name order, because the protocol appends.
* **Retitled headings:** none.

## 4 Sizes before and after

| file | before | after assembly | after the reference fix (installed) |
|---|---|---|---|
| `docs/ARCHITECTURE.md` | 13 026 lines, 1 645 248 bytes, `1c23190f…` | 16 870 lines, 2 191 782 bytes, `994ea880…` | 16 872 lines, 2 192 330 bytes, `7f4c0e253438b41beb19fce30e8ec6addc4cc9f1bd01c7896a5aa2961d715623` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 053 lines, 459 633 bytes, `0be40dfd…` | 2 283 lines, 619 666 bytes, `84cf0c37…` | 2 285 lines, 623 311 bytes, `22f01184eac296c1b4498c4bf59edd17bbb24a849ab9a325055079d4c45fd730` |
| `docs/ARCHITECTURE-VALIDATION.md` | 1 752 lines, `be681293…` | — | 1 850 lines (the §Ac section appended) |
| `docs/validation/doc-checks-allow.tsv` | 1 579 lines | — | 1 705 lines (1 block comment and 125 rows appended) |

## 5 Changed sections (exact heading lines)

There are 100 headings targeted, listed in document order. Each carries the seat and block that changed it. Two
headings are new, and the two tables were appended to.

* `` ## The whole design in one page (plain words) `` — S1 #11 APPEND
* `` ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`) `` — S1 #10 REPLACE
* `` ### 0.3 Evidence discipline `` — S1 #5 REPLACE
* `` ### 1.1 What is built, in what order; the two size ladders `` — S2 #10 REPLACE
* `` ### 1.2 The one-click default, stated once `` — S2 #11 REPLACE
* `` ### 1.3 The thesis in one paragraph `` — S1 #3 REPLACE
* `` ### 1.4 Fusion thesis, stage by stage `` — S1 #4 REPLACE
* `` ### 1.7 Tech stack (reasons; no dependence on any existing project) `` — S2 #12 REPLACE
* `` ### 2.1 Layers, coordinates, units, ids `` — M #1 REPLACE
* `` ### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices `` — M #2 REPLACE
* `` ### 2.3 Terrain and water `` — M #3 REPLACE
* `` ### 2.4 Ways (the skeleton) and typed edges `` — M #4 REPLACE
* `` ### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector `` — M #5 REPLACE
* `` ### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface `` — M #6 REPLACE
* `` ### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records `` — M #7 REPLACE
* `` ### 2.8 Identity, lifecycle, provenance, the entity registry `` — M #8 REPLACE
* `` ### 2.9 The document and serialisation `` — M #9 REPLACE
* `` ### 3.1 Build-versus-adopt, per primitive `` — K #2 REPLACE
* `` ### 3.4 Kernel operations the pipeline needs (complete list) `` — K #1 REPLACE
* `` ### 3.5 Why this kernel closes the creators' failure classes `` — K #3 REPLACE
* `` ### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement `` — K #4 REPLACE
* `` ### 3.10 Kernel invariants — what is checked, when, and at what cost `` — K #5 REPLACE
* `` ### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker `` — T #1 REPLACE
* `` ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace `` — C #2 REPLACE
* `` ### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph `` — T #2 APPEND
* `` ### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check `` — C #3 REPLACE
* `` ### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims `` — C #4 REPLACE; T #3 APPEND
* `` ### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule `` — A #1 REPLACE; T #4 APPEND
* `` ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model `` — B #1 REPLACE; D #4 APPEND; T #5 APPEND
* `` ### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture `` — C #1 REPLACE
* `` ### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19) `` — C #6 REPLACE
* `` ### 4.10 S13 Names and labels · S14 Display list · S15 Simulation `` — T #6 APPEND
* `` ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) `` — T #7 REPLACE
* `` ### 5.1 Principles and the seven tiers (G-P7) `` — E2 #1 REPLACE
* `` ### 5.2 Failure classes: detection, ladder, test `` — E2 #2 REPLACE
* `` ### 5.3 The invariant suite, by scope (SCL-1) `` — E2 #3 REPLACE
* `` ### 5.4 The generation report `` — E2 #4 REPLACE
* `` ### 6.1 RNG and stream design `` — E2 #5 REPLACE
* `` ### 6.2 What a seed determines, and the model digest `` — E2 #6 REPLACE
* `` ### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated) `` — E2 #7 REPLACE
* `` ### 6.5 Floating-point policy, determinism lint, determinism tests (G-P10) `` — E2 #8 REPLACE
* `` ### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation `` — E2 #9 REPLACE
* `` ### 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes `` — E2 #10 REPLACE
* `` ### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3) `` — E2 #11 REPLACE
* `` ### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 `` — E2 #12 REPLACE
* `` ### 7.5 Migration and upgrade (G-P9) `` — E2 #13 APPEND
* `` ### 7.6 The override layer and editable tables (G-P12; owner amendment 5) `` — E2 #14 REPLACE
* `` ### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook) `` — E1 #1 REPLACE
* `` ### 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15) `` — E2 #15 REPLACE
* `` ### 8.1 The display list (renderer-independent, columnar, incremental) `` — R #1 REPLACE
* `` ### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2) `` — R #2 REPLACE
* `` ### 8.3 Symbol catalogue and draw-style census `` — R #3 REPLACE
* `` ### 8.4 Layers, shadows, heights `` — R #4 REPLACE
* `` ### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint `` — R #5 REPLACE
* `` ### 8.6 Stage-2 render tier and stage-3 LOD `` — R #6 APPEND
* `` ### 8.8 Tiles, zoom stops, print and the canvas budget `` — R #7 REPLACE
* `` ### 8.9 Backends, text, threads and the worker boundary `` — R #8 REPLACE
* `` ### 8.10 Decoration instances (trees, scatter, crowns, roof detail) `` — R #9 REPLACE
* `` ### 9.1 What is model and what is view `` — R #10 REPLACE
* `` ### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally `` — R #11 REPLACE
* `` ### 9.3 Spines and candidates `` — R #12 REPLACE
* `` ### 9.4 Sizes, floors, the ladder, quarters, overflow, halos `` — R #13 REPLACE
* `` ### 9.5 Furniture, framing and tools `` — R #14 REPLACE
* `` ### 9.6 Names `` — R #15 APPEND
* `` ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) `` — D #5 REPLACE; T #8 APPEND
* `` ### 10.3 People, households, relations, sub-locations, schedules `` — T #9 APPEND
* `` ### 10.4 Names, descriptions and setting packs `` — T #10 APPEND
* `` ### 11.1 Formats `` — R #16 REPLACE
* `` ### 11.2 The embedding API and the worker boundary (SCL-6) `` — R #17 REPLACE
* `` ### 11.3 The host bridge — the host is the store (FTG-12) `` — R #18 REPLACE
* `` ### 11.4 Host inputs (DEF-11) `` — R #19 REPLACE
* `` ### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6) `` — R #20 APPEND
* `` ### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9) `` — R #21 APPEND
* `` ### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) `` — R #22 REPLACE
* `` ### 12.8 Memory (what is counted, per rung) `` — R #23 APPEND
* `` ### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test `` — S2 #4 APPEND
* `` ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT `` — S1 #6 REPLACE; S2 #3 APPEND
* `` ### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1 `` — S2 #5 APPEND
* `` ### 13.4 Visual regression, B-ZOOM and the app harness `` — S2 #6 APPEND
* `` ### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file `` — S1 #2 REPLACE
* `` ### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30) `` — S2 #7 APPEND
* `` ### 13.8 CI tiers and compute budgets (SCL-18; D-34) `` — S2 #8 APPEND
* `` ### 13.9 The corpus-calibration interface (staged by the owner; DEF-9) `` — S2 #9 APPEND
* `` ## §14 Package and module layout, key interfaces, dependency rules, extension points `` — S2 #2 REPLACE
* `` ### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked `` — S2 #1 REPLACE
* `` ### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5 `` — S2 #13 REPLACE
* `` ## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 `` — S1 #7 REPLACE
* `` ### 17.1 The clean-room chain (IMP-1; D-29) `` — S1 #1 REPLACE
* `` ## II.1 The district → neighbourhood interface `` — C #5 REPLACE
* `` ## II.2 Templates as fabric strategies (NG B2, B7, B8) `` — D #1 REPLACE
* `` ## II.3 Block content dispatch, pins, local identities (stage-2 feature S2: context features) `` — D #2 REPLACE
* `` ## II.5 What the base already carries for stage 2 (all base requirements in PART I) `` — A #2 REPLACE
* `` ## II.6 The staged layers — floating islands and sewers: the hooks the base carries now `` — D #6 REPLACE
* `` ## II.7 The sewer layer — existence by tier, the network stage, the underground neighbourhoods (staged, with its base hooks) `` — D #7 INSERT AFTER
* `` ### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order `` — D #8 REPLACE
* `` ### II.7.4 The hook interfaces and the base's part `` — D #9 REPLACE; D #10 APPEND
* `` # PART III — What a later village product needs from the base (one page; the hooks are concrete) `` — D #3 REPLACE; T #11 APPEND
* `` # Delegated decisions (the owner deferred all judgment; each is final unless vetoed) `` — S1 #8 REPLACE
* `` # Staged by the owner's roadmap (this document defers nothing) `` — S2 #14 REPLACE
* `` # Appendix A — reading record, and CONFIRMED versus PLAUSIBLE `` — S1 #9 REPLACE
* `` ### II.7.5 The undercity (item 65): what it requires, existence and the 1–3 bound, a shadow of the settlement `` — new, from D #10 APPEND
* `` ### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65) `` — new, from D #10 APPEND
* `` # Judgment calls ("chose X over Y because Z"; each vetoable) `` — 12 J-ROWS blocks (230 rows) and 2 reference-fix rows
* `## Part A — Judgment calls ("chose X over Y because Z"; each vetoable)` of the rationale file — 12 RATIONALE-A blocks (230 entries) and 2 reference-fix entries

**Top-level keys changed (25):** The whole design, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, PART II,
PART III, Delegated decisions, Judgment calls, Staged, Appendix A.

## 6 References

* **Resolver.** The lane ran `docs/validation/amendments-b/refs.py`, which is the consistency resolver
  `assemble-r0-refs.py` with its J-id grammar widened for the dotted `J-A` ids.
  * Untouched document: 139 heading keys, 35 D ids, 472 J ids, 2 broken.
  * Assembled document: 141 heading keys, 35 D ids, 701 J ids, 2 broken.
  * The 2 broken references are the same pre-existing external citations: "`os-geometry.md` §2.1.4" (a research file's
    section, flagged EXT) and "RFC 7946 §3.1.6" (the GeoJSON standard's section, flagged int by the heuristic). Neither
    is a pointer into the design, and neither needs a fix.
* **Wide J-id scan.** The resolver's J grammar is upper-case only, so it cannot see the Fable ids `J-Fdet-1`,
  `J-Fredteam-1` and `J-Fpipe-2`. The lane therefore ran a case-insensitive scan: every cited `J-…` id against every
  table-row id.
  * Untouched: 472 defined, 472 cited, 0 undefined.
  * Assembled: 702 defined, 704 cited, 2 undefined. J-Fredteam-1 is cited at §4.6 step 8 (c) and §5.2's F-CUT row;
    J-Fdet-1 is cited at §7.4's *Independence through the input layer*.
* **Mechanical fix.** The lane applied, by the same script, the J-ROWS and RATIONALE-A blocks of
  `docs/fable-review/main/blocks-determinism.md` (J-Fdet-1) and `docs/fable-review/main/blocks-redteam.md`
  (J-Fredteam-1), verbatim. It did not apply their APPEND TO SECTION bodies, because those are folded into §7.4 and §4.6.
  * The input file is `docs/validation/amendments-c/assemble-r0-refs-fix.blocks`. It is named without the `blocks-`
    prefix, so no later glob re-applies it.
  * The audit reports 4 of 4 blocks OK. The index and Part A hold 704 rows each, with no duplicates.
  * After the fix: 704 defined, 704 cited, 0 undefined. doc_checks S2 (every `§n` and `§n.m` pointer) reports 0.
  * `J-Fpipe-2` needed nothing, because seat T's blocks carry its rows.
* **Hazard for whoever applies the Fable review blocks later.** Four Fable blocks are now folded, and applying any of
  them again would duplicate its text:
  * `docs/fable-review/main/blocks-determinism.md` B-1 (§7.4) and B-2 (§7.3 (b) 3), folded by E2;
  * `blocks-redteam.md` B-1 (§4.6 rung (c)), folded by A;
  * `blocks-pipeline.md` B-1 (§4.11 *A cut way's far part*), carried by T.

  Their J rows are now all present, so a re-application would only report them as "row already present verbatim".

## 7 Document checks

The command was `python3 docs/validation/bench/doc_checks.py --sections "The whole design,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,PART II,PART III,Delegated decisions,Judgment calls,Staged,Appendix A"`,
with the allow file `docs/validation/doc-checks-allow.tsv`. These are the 25 top-level keys the blocks changed.

| run (end) | document | corpus: JSON files / C3 3-grams / C4 lists | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|---|
| baseline (04:25, run in parallel with run 1) | the untouched archive `1c23190f…` | 9 626 / 916 623 / 478 | 5 / 0 | 0 / 0 | 1 346 / 38 | 12 / 0 | 0 / 0 | 0 / 0 | 1 |
| 1 (04:25) | installed `7f4c0e25…` | 9 626 / 916 623 / 478 | 5 / 0 | 0 / 0 | 1 441 / 167 | 12 / 0 | 0 / 0 | 0 / 0 | 1 |
| 125 reviewed rows appended | | | | | | | | | |
| **2, final (04:31)** | **installed `7f4c0e25…`** | **9 626 / 916 623 / 478** | **5 / 0** | **0 / 0** | **1 441 / 0** | **12 / 0** | **0 / 0** | **0 / 0** | **0** |

Cells read hits / unreviewed.

**The corpus was quiescent.** No file under `research/` or `captures/` changed in the 90 minutes before the runs, and all
three runs read the same corpus: 9 626 JSON files, 916 623 C3 3-grams and 478 C4 lists.

**What was reviewed.** The 167 unreviewed hit lines are 125 distinct texts.
* **Attribution.** Each text was attributed by script (scratchpad `asm/attrib.py`, with the check's own tokenisation).
  The script recorded:
  * the lines of the installed document that carry the run;
  * the lines of the archive that carry it;
  * the block files that contain it;
  * the findings files that hold it whole;
  * and whether its word tokens occur in order in any JSON file.
* **Reading.** Each text was then read in context (scratchpad `asm/attrib-new.txt`).
* **Pre-existing hits.** 31 texts are pre-existing: the untouched document raises them too. They are corpus drift over
  unchanged text, from findings files written after the last allow rows.
* **New hits.** 94 texts are this pass's own text.

None of the hits is a reference list, table, grammar, palette or identifier. C1's five hits are the standing reviewed
ones, and there are no C2, C4, S1 or S2 hits to review. The 125 rows are:

| category | rows |
|---|---|
| pre-existing corpus drift on text unchanged by this pass (the untouched document raises them; 23 carried unchanged inside a block, 8 outside every block) | 31 |
| section-pointer digits, item, step or test labels and numeric values meeting ordinary words | 41 |
| ordinary English of our own new text, stitched (the run occurs contiguously in no findings file and no JSON file) | 30 |
| build names that the amendments files' gate (b) requires (NG 1.2.2, MFCG 12710731, VG 1.6.9, store ids, Fantasy Manor 1.0.0 build 890) | 13 |
| dates, file names and review labels of our own ("docs/AMENDMENTS-2026-09-27c.md item", "Fable review 2026-09-27", "of the 2026-09-25 …") | 5 |
| the owner's words quoted verbatim (item 65's "exist in the same level", item 68 (d′)'s "to have a lot of", item 20 (h)'s "the rest of the map") | 3 |
| Fable's released labelled wording for item 37 ("export scale 0.35 per unit in the GeoJSON") | 1 |
| our own model text restated from the program's Fable synthesis `dwellings-synthesis` (seat M's proposed row) | 1 |

* **Seat-proposed rows.** The seats' proposals are all among these texts, and the attribution confirms each one:
  * the build names (A note 19, S1 §4);
  * "fable review 2026 09 27" (E2 §6);
  * "captures mfcg exports sweep 2026 09 25 readme md" (C);
  * "of the first two vertices of" (K);
  * "ring polygon inside the ground storey s wings" (M §6);
  * three of rendering's four pre-existing runs (R §5). The fourth, "9 3 spines and candidates", is not a hit on this corpus, so it was not added.
* **The allow file.** No row was dropped, and the file was only appended to. The block comment names this lane.
* **Rationale file (information only, outside §17.1 (2)'s gate).** The same checks over the rationale file's Part A,
  with S2 resolved against the design, give:
  * untouched: C3 289 / 204 unreviewed, C4 6 / 6, S2 17 / 15, C1 0;
  * assembled: C3 387 / 269, C4 6 / 6, S2 17 / 15, C1 0.

  Part A was never under the gate, and every earlier assembler checked the design only. It has no C1 identifier, and
  its S2 count is unchanged.

## 8 Changelog

`docs/ARCHITECTURE-VALIDATION.md` now ends with "## §Ac Amendments c applied (2026-09-27)". It holds:
* one paragraph on the application: the counts, the two-pass order, the reference fix, the hashes, the archives, the
  headings and the checks;
* a legend;
* a table of 59 rows, one per item (20 (h), 32–88 and 101), giving the home section, the referencing sections and the
  blocks applied.

The table was generated by scratchpad `asm/changelog.py`, which reads:
* **home and referencing sections:** §0.2's landing table as assembled, for 20 (h), 32–72 and 101. Items 73–88 share
  item 20's row, so theirs come from `route.json`.
* **blocks applied:** the blocks whose text names the item as "item N", "items N–M", `J-AN.n`, `TN-n` or `TN`.
* **J counts:** this pass's rows per item, from the apply log.

## 9 Held parts, open cross-part findings, and notes for the verify and repair round

**Held parts (gate (a)).** The seats report that nothing held was written.
* Released by Fable's evidence gate, and applied with its labelled wording:
  * 37 (seat A, §4.6);
  * 58 (f) (seat D, II.2);
  * 59's timing (seat R, §12.7).
* Rejected by the gate: 49's deletion. §1.4 keeps "49 % of buildings in no ring", cited to F4 (seat S1).
* Still held and not written (route §C.4 and §C.9.4; the seats' reports):
  * item 52's claim that the references' session-reached maps visibly differ (E2 §4);
  * item 35 (support), the position check on 160 of 162 faces (A);
  * item 68 (g), "MFCG draws no cast shadows". The `MFCG` preset's behaviour is stated as ours, J-A68.86 (R §4, T §6);
  * item 68 (support), VG 1.6.9's shadow and night layers and Dwellings' shading gradients (R §4).
* Items 73–88 and 101 hold nothing.
* A grep of the assembled document finds no "visibly differ" and no "160 / 162". "Draws no cast shadow" occurs only as
  our preset's behaviour, at §1.4, §8.4 and J-A68.86.

**Open cross-part findings.** The seats reported these; this lane confirmed the first two by grep of the installed
document and did not check the rest.
1. **CONFIRMED open.** §3.1's `Warning` union (l. 2488) has no `'W_CUT_SLID'`. §4.6 step 8 (c) and §5.2 use that code
   (seat A note 6).
2. **CONFIRMED open.** §4.7's `LightRule` has no `sizeCm` (seat R: "T's LightRule lacks sizeCm"). Seat M aligned
   `LightSource.sizeCm`.
3. Item 81 (b)'s "the frame grown by §3.2 (9)" has no kernel mechanism (seat K, report §4 note 9).
4. `RaiseGrade` records no created address (seat M's finding for D).
5. The retrovalidation findings RV-pc-2 (reference code identifiers in the design against §17.1) and RV-pipeline-gen-6
   are routed to the repairers by their own files.

**For whoever builds on the design next.** The owner's relayed request for this run was: "i meant bundle the 17 volumes
after the ammendment pass". The volumes must therefore be built from the design as assembled here (sha256 `7f4c0e25…`)
or from its repaired successor. The lane log shows `volumes/V1-neighbourhoods` STARTED at 03:53, before this assembly,
on the pre-assembly design `1c23190f…`; that volume should be re-read against the assembled text.

## 10 Judgment calls of this lane (vetoable)

* **JUDGMENT: the two-pass order over the task's literal one-pass order.** The literal order provably drops seat T's
  §4.5 APPEND (the one-pass audit reports it LOST), which is item 72's home text. Route §C.9.2 found the defect and
  prescribed this fix, seat T's dry run used it, and seat R's and seat M's one-pass dry runs reported the same LOST block. On this set the two orders differ only in that block.
  To flip this: re-run the script with `--order one-pass` on the archive and install that output instead. Say "veto" to
  flip it.
* **JUDGMENT: two dangling Fable J ids fixed by importing their verbatim rows, over reporting them to the repair round.**
  The rows exist word for word in the Fable review files. The citing seats (E2 and A) asked the assembler to apply
  exactly those rows. No wording was chosen. To flip this: remove the two rows from the index and from Part A. Say
  "veto" to flip it.

CONFIRMED versus PLAUSIBLE: every count, hash, audit state, check result and grep finding above is CONFIRMED by an
executed run in this lane. The classification of the 125 allow rows is CONFIRMED by script attribution and a reading of
each text in context. The judgment that none of them is copied reference content is that reading's conclusion.
