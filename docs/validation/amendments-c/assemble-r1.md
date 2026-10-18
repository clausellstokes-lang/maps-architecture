# assemble-r1 — lane amendments-c/assemble-r1 (the mechanical assembler of repair round 1 of the bundled pass c + d + e)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/assemble-r1).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 archive of the pre-repair state: done 10:44 (docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md sha256 7f4c0e25…, docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r1-2026-09-28.md sha256 22f01184…; cmp-identical, mode 444)
> STEP 1 inventory of the six repair-r1 files (closure, double REPLACE): done (continuing seat 2026-09-28, re-derived: 89 blocks, every file closed by END, no heading REPLACEd twice)
> STEP 2 blocks applied to copies (apply-blocks.py, two-pass), audited: done (reproduced byte-identical by the continuing seat: doc f358b8bf…, rationale 8877372b…; 89/89, 0 skipped, audit not-OK 0)
> STEP 3 scripted hand-off (restated rows, one-string substitutions, P22–P24): done (reproduced byte-identical: doc 024c57da…, rationale 33b21ca8…, code-impact cf6f665f…; index 723 = Part A 723, no duplicate id)
> STEP 4 install over the live files: 4a research/findings/code-impact.md P22–P24 installed 11:20 (7e6de9d2… -> cf6f665f…; the hand-offs say BEFORE the design lands) | 4b design + rationale installed 11:26 after the checks passed on the copies (design 7f4c0e25… -> 024c57da…, rationale 22f01184… -> 33b21ca8…): done
> STEP 5 references: done (resolver 2 broken = the baseline's 2 external; wide J scan 0 undefined ids; P-ids cited all defined; T-ids 196 all in §13.2)
> STEP 6 document checks: done (23 keys; final exit 0: C1 5/0 C2 0/0 C3 1 420/0 C4 12/0 S1 0/0 S2 0/0 after 3 reviewed allow rows for the P22 corpus runs)
> STEP 7 changelog in docs/ARCHITECTURE-VALIDATION.md §Ac: done (### §Ac.1, 134 rows covering all 159 verify-r0 ids; file 1 850 -> 2 020 lines, sha256 725af402…)
> STEP 8 this report complete: done
> STEP 9 queue row + LANDED line: done (queue row B-amendments-c/assemble-r1 appended; LANDED line in docs/lane-events.log)

Lane `amendments-c/assemble-r1`, 2026-09-28, started 10:43 (first seat), continued and finished by a second seat at
11:31. Status: COMPLETE.

## 1 Outcome

All 89 blocks of the six repair-r1 files were applied and none was skipped; the seats' hand-offs were applied by script;
the design, the rationale file and `research/findings/code-impact.md` are installed; references are unchanged (the 2
baseline external citations); the document checks over the 23 changed top-level keys exit 0 after 3 reviewed allow
rows; the changelog is `docs/ARCHITECTURE-VALIDATION.md` §Ac.1. Nothing was hand-edited: every change came from
`apply-blocks.py`, `assemble-r1-handoff.py` or a short asserted append script.

**One assembler decision, vetoable (recorded here, in §Ac.1 and in the lane-events line).** The rendering and scope
repair seats both handed the append of the provenance rows P22–P24 to "the manager, BEFORE the design lands" (rendering
hand-off 3; scope hand-off (1): "If the append does not happen, block 7 must not land"). No manager step had done it
(code-impact.md still ended at P21, unchanged since 2026-09-27 22:37). The first seat of this lane wrote the append into
the hand-off script rather than hold back rendering's §8.4 and scope's §13.5; this seat kept that choice: the rows are
taken verbatim from the rendering report's fenced block (the wording measured C3-clean there, which replaces scope's
route-verbatim rows), each row's back-quoted source names and section numbers are checked by the script against the
reading it cites, and the append stops if any P22–P24 row already exists. **The manager must not append them again.**

## 2 Blocks applied and skipped, per file

Order: two-pass (every REPLACE first, then J-ROWS and RATIONALE-A; files in name order, blocks in file order) — scope's
REPLACE of the whole `# Judgment calls` section would otherwise erase the other five seats' J rows. Every file ends in
`=== END ===`; no file is truncated; no heading is REPLACEd twice (no three-way merge); no heading was missing.

| file | blocks | REPLACE | J-ROWS | RATIONALE-A | skipped |
|---|---|---|---|---|---|
| `repair-r1-determinism.md` | 14 | 12 | 1 | 1 | 0 |
| `repair-r1-kernel.md` | 7 | 5 | 1 | 1 | 0 |
| `repair-r1-model.md` | 8 | 6 | 1 | 1 | 0 |
| `repair-r1-pipeline.md` | 23 | 21 | 1 | 1 | 0 |
| `repair-r1-rendering.md` | 19 | 17 | 1 | 1 | 0 |
| `repair-r1-scope.md` | 18 | 16 | 1 | 1 | 0 |
| **total** | **89** | **77** | **6 (36 rows)** | **6 (40 entries)** | **0** |

apply-blocks notes (all expected): scope #2 retitles §0.2's heading (VSC-02); the J-ROWS / RATIONALE-A "DUPLICATE ID
inserted" notes are the seats' restated rows, swapped by the hand-off. Audit: 89 blocks, not OK 0. After the hand-off,
three block bodies are no longer verbatim in the output, each for a known reason: determinism #1 (§5.2, hand-off 4's
one-string substitution), scope #12 (§16, hand-off 7), scope #14 (the Judgment-calls section: the other seats' J rows
and the swaps; every non-J line of the block is verbatim).

## 3 Hand-off (`docs/validation/amendments-c/assemble-r1-handoff.py`)

1. **Restated rows swapped into the older rows' places:** index 17 (J-A12.45, J-A65.31, J-A65.32, J-A65.46, J-A65.48,
   J-A66.71, J-A67.61, J-A68.21, J-A68.83, J-A68.84, J-A68.85, J-A68.87, J-A72.61, J-A76.72, J-A79.23, J-A81.41,
   J-A88.41); Part A 21 (the same plus J-A32.02, J-A50.01, J-A63.01, J-A65.47). Both sets equal the seats' declared
   hand-offs exactly (the script stops otherwise). Result: 723 index rows and 723 Part A entries, the same id set, no
   duplicate.
2. **P22–P24** appended to `research/findings/code-impact.md` §(d) after P21 (225 → 228 lines, sha256 `7e6de9d2…` →
   `cf6f665f…`), installed before the design (§1).
3. **One-string substitutions** (each old string exactly once, inside its named section; new string absent before):
   §5.2 F-LIGHT "the vector `ShadowPass` with glow sprites" → "the vector pass (§8.2's `shadowPass` program) with glow
   sprites" (VRC-17); §13.4 the pre-decided fallback now "takes §8.4 (g)'s full-precision surface — the march unchanged"
   (VRC-08); §16 M2b trigger "48 ms" → "53 ms" (VRC-13; J-A72.82); Part A J-A68.86 "their P-ids P22–P24" (VRC-15).
4. **Hand-off 6 (§13.2 T30-5)** checked, not applied: scope's §13.2 block already carries the aligned clause (its
   cross-part note 4); the old clause is absent.

Both scripts were re-run by the continuing seat from the live inputs and reproduced the first seat's outputs
byte-for-byte (applied doc `f358b8bf…`, rationale `8877372b…`; final doc `024c57da…`, rationale `33b21ca8…`,
code-impact `cf6f665f…`). Logs: `assemble-r1-apply-log.json`, `assemble-r1-handoff-log.json` (this folder).

## 4 Sizes

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 16 872 lines, 2 192 330 bytes, `7f4c0e25…` | 17 050 lines, 2 246 556 bytes, `024c57dabc6b93c8…` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 285 lines, 623 311 bytes, `22f01184…` | 2 304 lines, 648 787 bytes, `33b21ca8cdc15789…` |
| `research/findings/code-impact.md` | 225 lines, 24 275 bytes, `7e6de9d2…` | 228 lines, 25 518 bytes, `cf6f665f…` |
| `docs/ARCHITECTURE-VALIDATION.md` | 1 850 lines, `7e5bd0b4…` | 2 020 lines, `725af402…` |

Archives (read-only, cmp-identical to the inputs): `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md`,
`docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r1-2026-09-28.md`. Headings 147 → 147; fence lines 130 →
130; title block unchanged; the one review banner unchanged, no per-section marker.

## 5 Changed sections (exact heading lines; own text differs from the input)

78 headings changed (77 REPLACE targets plus §13.4, changed only by hand-off 5); one heading line was
retitled by scope's §0.2 block, so the old line is gone:

* removed: `### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`)`
* `## The whole design in one page (plain words)`
* `### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), items 8–31 (`AMENDMENTS-2026-09-25b`) and items 32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`)`
* `### 1.1 What is built, in what order; the two size ladders`
* `### 1.2 The one-click default, stated once`
* `### 2.1 Layers, coordinates, units, ids`
* `### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices`
* `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector`
* `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface`
* `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records`
* `### 2.8 Identity, lifecycle, provenance, the entity registry`
* `### 3.1 Build-versus-adopt, per primitive`
* `### 3.2 Numeric policy`
* `### 3.4 Kernel operations the pipeline needs (complete list)`
* `### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement`
* `### 3.10 Kernel invariants — what is checked, when, and at what cost`
* `### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker`
* `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace`
* `### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph`
* `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims`
* `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule`
* `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model`
* `### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture`
* `### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)`
* `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)`
* `### 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer)`
* `### 5.2 Failure classes: detection, ladder, test`
* `### 5.3 The invariant suite, by scope (SCL-1)`
* `### 5.4 The generation report`
* `### 6.1 RNG and stream design`
* `### 6.2 What a seed determines, and the model digest`
* `### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)`
* `### 6.4 Permalinks, version axes, retention and goldens`
* `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`
* `### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)`
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`
* `### 7.5 Migration and upgrade (G-P9)`
* `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)`
* `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)`
* `### 8.3 Symbol catalogue and draw-style census`
* `### 8.4 Layers, shadows, heights`
* `### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint`
* `### 8.8 Tiles, zoom stops, print and the canvas budget`
* `### 8.9 Backends, text, threads and the worker boundary`
* `### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally`
* `### 9.4 Sizes, floors, the ladder, quarters, overflow, halos`
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)`
* `### 10.4 Names, descriptions and setting packs`
* `### 11.1 Formats`
* `### 11.2 The embedding API and the worker boundary (SCL-6)`
* `### 11.4 Host inputs (DEF-11)`
* `### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)`
* `### 12.3 Model budgets on the one-click path`
* `### 12.4 CITY per-stage split (SCL-3)`
* `### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6)`
* `### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)`
* `### 12.8 Memory (what is counted, per rung)`
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`
* `### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1`
* `### 13.4 Visual regression, B-ZOOM and the app harness`
* `### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file`
* `### 13.8 CI tiers and compute budgets (SCL-18; D-34)`
* `## §14 Package and module layout, key interfaces, dependency rules, extension points`
* `### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked`
* `### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5`
* `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2`
* `## II.1 The district → neighbourhood interface`
* `## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6)`
* `## II.6 The staged layers — floating islands and sewers: the hooks the base carries now`
* `### II.7.1 Existence by tier (item 14): the rung row, the S0 draw, the toggle as visibility, the drain rule`
* `### II.7.2 The network stage: the gate, the underground arena's levels, the tunnel profile, depth and outfalls, editing`
* `### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order`
* `### II.7.4 The hook interfaces and the base's part`
* `### II.7.5 The undercity (item 65): what it requires, existence and the 1–3 bound, a shadow of the settlement`
* `### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)`
* `# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)`
* `# Judgment calls ("chose X over Y because Z"; each vetoable)`
* `# Staged by the owner's roadmap (this document defers nothing)`
* `# Appendix A — reading record, and CONFIRMED versus PLAUSIBLE`

Top-level keys changed (23): The whole design, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, PART II,
Delegated decisions, Judgment calls, Staged, Appendix A.

## 6 References

* Resolver `docs/validation/amendments-b/refs.py` (= `consistency/assemble-r0-refs.py` with the dotted J-A grammar):
  input 141 heading keys / 35 D / 701 J / 2 broken; output 141 / 35 / 720 / **2 broken** — the same two external
  citations (`os-geometry.md` §2.1.4; RFC 7946 §3.1.6). No fix needed.
* Wide J scan (case-insensitive, every cited `J-…` against the index rows): 723 defined, 0 undefined ids (the only
  unmatched tokens are family prefixes in prose, e.g. `J-F⟨lane⟩-⟨n⟩` in the Judgment-calls intro).
* P ids: every P id the design and the rationale file cite is a row of code-impact.md §(d) (P1–P24); before the
  hand-off the rationale file cited P22 and P24 without rows.
* T ids: 196 cited, all defined in §13.2 (193 + scope's new T20-13, T66-5, T81-2).
* §0.2's old title occurs nowhere in the design or the rationale file.

## 7 Document checks (`docs/validation/bench/doc_checks.py`, allow file `docs/validation/doc-checks-allow.tsv`)

`--sections "The whole design,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,PART II,Delegated decisions,Judgment calls,Staged,Appendix A"`;
corpus 9 626 JSON files, 478 C4 lists (quiescent across all runs). Cells read hits / unreviewed.

| run | document | corpus 3-grams | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|---|
| U (11:17) | untouched `7f4c0e25…` | 916 623 (code-impact without P22–P24) | 5 / 0 | 0 / 0 | 1 420 / 0 | 12 / 0 | 0 / 0 | 0 / 0 | 0 |
| A-old (11:17) | assembled `024c57da…` | 916 623 | 5 / 0 | 0 / 0 | 1 417 / 0 | 12 / 0 | 0 / 0 | 0 / 0 | 0 |
| A (11:20) | assembled | 916 788 (with P22–P24) | 5 / 0 | 0 / 0 | 1 420 / 3 | 12 / 0 | 0 / 0 | 0 / 0 | 1 |
| 3 reviewed allow rows appended | | | | | | | | | |
| **A2, final (11:22)** | **assembled `024c57da…` (= installed, sha-identical)** | **916 788** | **5 / 0** | **0 / 0** | **1 420 / 0** | **12 / 0** | **0 / 0** | **0 / 0** | **0** |
| U2 (11:22) | untouched | 916 788 | 5 / 0 | 0 / 0 | 1 422 / 0 | 12 / 0 | 0 / 0 | 0 / 0 | 0 |

The repair blocks raise no unreviewed hit on their own (A-old). The 3 hits of run A come only from the P22 row joining
the findings corpus (A-old → A: +3; U → U2: +2, the two pre-existing texts), each reviewed as a false positive:
"of the 25 september 2026 capture" (the build name gate (b) requires, model repair's §2 text, l. 1482), "snap to the
preset s" (§4, pre-existing) and "cell of the preset s" (§13.2 T57-1, pre-existing), each meeting our own P22 wording
("the preset's light …"). No mechanical correction was needed. Allow file 1 705 → 1 709 lines (one comment line naming
this lane, three rows).

Rationale file (information only, outside §17.1 (2)'s gate; S2 resolved against the design): input C3 504 / 326, C4
6 / 6, S2 17 / 15; output C3 508 / 330, C4 7 / 7, S2 17 / 15 (S2 the same pointers at shifted lines). The new
unreviewed rationale runs are ordinary words and section digits of the restated and new Part A entries ("11 1 the same
rule", "base and the view and a", "is a third of an", "set by the source the", a digit run) and one C4 line of plain
words (J-A68.83: field, pass, point, reach, square, water).

## 8 Held parts (gate (a)) — none written by round 1

No repair seat wrote a held part (their reports: determinism —; kernel §5; pipeline §3; rendering "Held parts"; scope
§5). Still held and absent from the installed design (grep: no "visibly differ", no "160 / 162"; "draws no cast shadow"
only as our `MFCG` preset's behaviour with no claim about the reference, J-A68.86): **item 52** (the references'
session-reached maps visibly differ); **item 35 (support)** (the position check, 160 of 162 faces); **item 60
(support)** (the 16-cell hand-off support); **item 68 (g)** ("MFCG draws no cast shadows"); **item 68 (support)** (VG
1.6.9's shadow and night-light layers, Dwellings' shading and occlusion). Released parts stand as round 0 applied them
(37, 58 (f), 59's timing, labelled); item 49's deletion stays rejected (the 49 % figure cited to F4).

## 9 Issues for the next round

None from assembly: nothing skipped, merged or truncated. The seats' cross-part notes (not hand-offs) remain theirs for
the owners' next round: rendering → pipeline §4.10 (a building's description should read the drawn week, §4.11 (9));
scope → determinism §7.7 item 15, pipeline §4.11 *The rung at an epoch*, rendering §11.4 (the 120 000-cap refusal
wording, VSC-21), rendering §11.2 / J-A20.82's "by §2.8's marker" wording.

## 10 CONFIRMED vs PLAUSIBLE

CONFIRMED (executed): the block application and the hand-off (re-run, byte-identical to the first seat's outputs), the
installed hashes, the index / Part A id sets, the references, the T and P id scans, the six doc-check runs and their
counts, the changelog's 159-id coverage. PLAUSIBLE: none of this report's claims rests on reasoning alone; the choice
to append P22–P24 in the assembler is a judgment (§1), not a fact.

Receipts: scratchpad `c0d81c15…/scratchpad/asm1/` (first seat) and `asm1v/` (continuing seat: apply.out,
handoff.out, verify.out, check3.out, refs-U.json, refs-A.json, dc-U/Aold/A/A2/U2/RU/RA.out).
