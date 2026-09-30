# assemble-r2 — lane amendments-c/assemble-r2 (the mechanical assembler of repair round 2 of the bundled pass c + d + e)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/assemble-r2).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 archive of the pre-repair-r2 state: done (docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md sha256 024c57da…, docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r2-2026-09-28.md sha256 33b21ca8…; cmp-identical, mode 444)
> STEP 1 inventory of the six repair-r2 files (closure, double REPLACE): done (55 blocks, every file closed by END, no heading REPLACEd twice; scratch asm2/parse.out)
> STEP 2 blocks applied to copies (apply-blocks.py, two-pass), audited: done (55/55, 0 skipped, 0 merges, audit not-OK 0; applied doc 3094f248…, rationale 3a36bfe5…)
> STEP 3 scripted hand-off (restated rows, the seats' named hand-offs): done (assemble-r2-handoff.py: index 9 / Part A 10 swaps, 5 substitutions, 5 checks satisfied; doc 3daa0b07…, rationale bfa20419…; index 733 = Part A 733; cross-checked byte-identical against repair-rendering-r2-handoff.py + swap_restated)
> STEP 4 install over the live files: done 13:27 after the checks passed on the copies (live hashes re-checked first; design 024c57da… -> 3daa0b07…, rationale 33b21ca8… -> bfa20419…; code-impact untouched)
> STEP 5 references: done (resolver 2 broken = the baseline's 2 external; J ids 720 -> 730; wide J scan: the same 5 non-index family tokens as the input, none new; T-ids 202 cited, all in §13.2; P-id citations unchanged)
> STEP 6 document checks: done (18 keys; untouched and assembled both exit 0: C1 5/0 C2 0/0 C3 1 334/0 C4 10/0 S1 0/0 S2 0/0; corpus 916 788 3-grams both runs; no allow row, no correction)
> STEP 7 changelog in docs/ARCHITECTURE-VALIDATION.md §Ac: done (### §Ac.2, 58 rows covering all 75 verify-r1 ids, asserted by script; file 2 020 -> 2 122 lines, sha256 1a87c53e…)
> STEP 8 this report complete: done
> STEP 9 queue row + LANDED line: done (queue row B-amendments-c/assemble-r2 appended; LANDED line in docs/lane-events.log)

Lane `amendments-c/assemble-r2`, 2026-09-28, started 13:21. Status: COMPLETE. Input design `024c57da…`, rationale `33b21ca8…`, code-impact `cf6f665f…`,
validation `725af402…`. Scratch: scratchpad `c0d81c15…/scratchpad/asm2/`.

## 1 Outcome

All 55 blocks of the six repair-r2 files were applied and none was skipped. The seats' hand-offs were applied by script,
and the design and the rationale file are installed. The references are unchanged: the 2 baseline external citations.
The document checks over the 18 changed top-level keys exit 0 with the untouched document's counts, with no correction
and no allow row. The changelog is `docs/ARCHITECTURE-VALIDATION.md` §Ac.2. Nothing was hand-edited: every change came
from `apply-blocks.py`, from `assemble-r2-handoff.py` (new, in this folder) or from a short asserted append script (the
changelog). `research/findings/code-impact.md` and the allow file are unchanged.

No assembler decision was needed. The seats' hand-offs are complete and mutually consistent: every restated row is
declared by its seat, every one-string substitution matched once in its scope, and every "folded" hand-off is present
where the seat said.

## 2 Blocks applied and skipped, per file

Order: two-pass (every REPLACE first, then J-ROWS and RATIONALE-A; files in name order, blocks in file order). Every file
ends in `=== END ===`, so no file is truncated. No heading is REPLACEd twice, so there was no three-way merge. No heading
was missing and none was retitled. `repair-r2-rendering.md.prev`, an earlier draft of the rendering file that differs
only in one line wrap, is not a `repair-r2-*.md` file and was not applied.

| file | sha256 | blocks | REPLACE | J-ROWS | RATIONALE-A | skipped |
|---|---|---|---|---|---|---|
| `repair-r2-determinism.md` | `bb86c4e3…` | 9 | 7 | 1 (2 rows) | 1 (2 entries) | 0 |
| `repair-r2-kernel.md` | `cb11169f…` | 2 | 2 | — | — | 0 |
| `repair-r2-model.md` | `fd7be707…` | 7 | 5 | 1 (2 rows) | 1 (2 entries) | 0 |
| `repair-r2-pipeline.md` | `60ce1b04…` | 12 | 10 | 1 (4 rows) | 1 (4 entries) | 0 |
| `repair-r2-rendering.md` | `be53dba1…` | 17 | 15 | 1 (10 rows) | 1 (10 entries) | 0 |
| `repair-r2-scope.md` | `dd849bac…` | 8 | 6 | 1 (1 row) | 1 (2 entries) | 0 |
| **total** | | **55** | **45** | **5 (19 rows)** | **5 (20 entries)** | **0** |

The apply-blocks notes are all expected. They are the nine "DUPLICATE ID inserted" notes of the seats' restated rows,
which the hand-off swaps (§3). The audit covers 55 blocks: 45 are "OK (present once)", 10 are row blocks "OK", and 0 are
not OK. After the hand-off, one block body is no longer verbatim in the installed design, for a known reason: pipeline's II.7.3
block, which carries rendering hand-off 4's one-string substitution (re-checked on the installed file: every other
REPLACE body is present once, and every J-ROWS and RATIONALE-A row is present once, the restated ones at the older rows'
places). The rendering seat's own script (`repair-rendering-r2-handoff.py`) with `swap_restated` on the same input
reproduces this seat's output byte for byte (design `3daa0b07…`, rationale `bfa20419…`).

## 3 Hand-off (`docs/validation/amendments-c/assemble-r2-handoff.py`, sha256 `a2131b3c…`)

1. **Restated rows swapped into the older rows' places.**
   * Index, 9 rows: J-A63.22 (model), J-A68.73 (determinism), J-A72.50, J-A88.42, J-A65.46 and J-A65.49 (pipeline), and
     J-A68.83, J-A68.85 and J-A68.89 (rendering).
   * Part A, 10 entries: the same nine, plus J-A66.01 (scope).
   * Both sets equal the seats' declared hand-offs exactly; the script stops otherwise.
   * The 10 new ids stay where the protocol appended them: J-A65.22 (model), J-A88.73 (determinism), J-A65.02 (scope),
     and J-A68.90, J-A63.82, J-A68.91, J-A68.92, J-A85.83, J-A101.86 and J-A67.83 (rendering).
   * Result: 733 index rows and 733 Part A entries, the same id set (checked by hash), no duplicate.
2. **One-string substitutions** (rendering hand-offs 2–5). Each old string occurs exactly once, inside its named row or
   subsection, and each new string was absent before.
   * J-A20.82's index row: "by §2.8's marker (`dossier`" → "by §2.8's `factTier` (`dossier`".
   * J-A20.82's Part A entry: the same change, in the entry's own dashes.
   * J-A68.86's Part A clause: "their builds and their P-ids P22–P24 (the readings' sections are
     `research/findings/code-impact.md` §(d)'s)".
   * II.7.3's light-shaft sentence gains ", a secret one lit only for a key under which it draws (§8.1 item 7)". This is
     applied to pipeline's r2 text of II.7.3.
   * §13.4: "— the march unchanged —" → "— the traversal unchanged —".
3. **Checked, not applied.** Each text is present exactly once (whitespace-normalised) in its named subsection.
   * Pipeline hand-off (2): §5.2 F-SITING's detection cell "finds no district whose capacity holds a household that fills
     no dossier's population (… housed at the nearest range, J-A72.50)", and "reported with the capacities that refused
     it". Both are carried by determinism's §5.2 block, as its preamble (3) says.
   * Kernel cross-part note 1: §2.2 rule 1 states "the ground's frame plus its context margin, as the sewer's is
     (II.7.2)", which is where §3.2 (9)'s new pointer lands.
   * Scope hand-off (2): pipeline's S0 `relief: 'auto'` toggle in §4.2 and determinism's §6.1 relief draw landed together
     with scope's bars.

Logs: `assemble-r2-apply-log.json`, `assemble-r2-handoff-log.json` (this folder).

## 4 Sizes

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 17 050 lines, 2 246 556 bytes, `024c57da…` | 17 215 lines, 2 281 645 bytes, `3daa0b0731b8c76f…` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 304 lines, 648 787 bytes, `33b21ca8…` | 2 314 lines, 664 923 bytes, `bfa20419ca4dd6e5…` |
| `docs/ARCHITECTURE-VALIDATION.md` | 2 020 lines, `725af402…` | 2 122 lines, `1a87c53e…` |
| `research/findings/code-impact.md` | 228 lines, `cf6f665f…` | unchanged |

Archives (read-only, cmp-identical to the inputs):
* `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md`
* `docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r2-2026-09-28.md`

No existing archive was touched. Headings stay 147 → 147, with every heading line unchanged. Fence lines stay 130 → 130.
The title block is unchanged. The one review banner is unchanged, and there is no per-section marker. The live hashes
were re-checked immediately before the install (13:27), and the installed files are cmp-identical to the checked copies.

## 5 Changed sections (exact heading lines; each one's own text differs from the input)

47 headings changed: the 45 REPLACE targets, plus §13.4 (changed only by hand-off 5) and `# Judgment calls` (its index
rows, and the J-A20.82 substitution). No heading line was removed or added.

* `## The whole design in one page (plain words)`
* ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), items 8–31 (`AMENDMENTS-2026-09-25b`) and items 32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`)
* `### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices`
* `### 2.3 Terrain and water`
* `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface`
* `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records`
* `### 2.8 Identity, lifecycle, provenance, the entity registry`
* `### 3.2 Numeric policy`
* `### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end`
* `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace`
* `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims`
* `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model`
* `### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)`
* `### 4.10 S13 Names and labels · S14 Display list · S15 Simulation`
* `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)`
* `### 5.2 Failure classes: detection, ladder, test`
* `### 5.4 The generation report`
* `### 6.1 RNG and stream design`
* `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`
* `### 7.5 Migration and upgrade (G-P9)`
* `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)`
* `### 8.1 The display list (renderer-independent, columnar, incremental)`
* `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)`
* `### 8.3 Symbol catalogue and draw-style census`
* `### 8.4 Layers, shadows, heights`
* `### 8.8 Tiles, zoom stops, print and the canvas budget`
* `### 8.9 Backends, text, threads and the worker boundary`
* `### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally`
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)`
* `### 11.1 Formats`
* `### 11.2 The embedding API and the worker boundary (SCL-6)`
* `### 11.3 The host bridge — the host is the store (FTG-12)`
* `### 11.4 Host inputs (DEF-11)`
* `### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)`
* `### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6)`
* `### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)`
* `### 12.8 Memory (what is counted, per rung)`
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`
* `### 13.4 Visual regression, B-ZOOM and the app harness`
* `### 13.8 CI tiers and compute budgets (SCL-18; D-34)`
* `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2`
* `### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order`
* `### II.7.5 The undercity (item 65): what it requires, existence and the 1–3 bound, a shadow of the settlement`
* `### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)`
* `# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)`
* `# Judgment calls ("chose X over Y because Z"; each vetoable)`

Top-level keys changed (18): The whole design, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, PART II, Delegated
decisions, Judgment calls.

## 6 References

* **Resolver** (`docs/validation/amendments-b/refs.py`, i.e. `consistency/assemble-r0-refs.py` with the dotted J-A
  grammar). Input: 141 heading keys, 35 D ids, 720 J ids, 2 broken. Output: 141 / 35 / 730 / **2 broken**. The two are
  the same external citations as before (`os-geometry.md` §2.1.4; RFC 7946 §3.1.6). No fix was needed.
* **Wide J scan** (case-insensitive; every cited `J-…` in the design and the rationale file, against the index rows).
  733 ids are defined. The only unmatched tokens are the five pre-existing Part A citations of other ledgers' ids — the
  survey plan's J-M4 and J-M9, and the Fable review's J-Fcode-1 to J-Fcode-3. They are identical in the input.
* **T ids.** 202 are cited, all defined in §13.2. The six new ones are T65-7, T65-8, T70-6, T72-9, T88-1 and T88-2.
* **P ids.** The design's P-id citations are unchanged in count. The rationale's J-A68.86 cites P22–P24, which are rows
  of code-impact.md §(d).
* **Held-part phrases.** There are no "160 / 162", "160 of 162", "16-cell" or "16 cells wide" in either file. "visibly
  differ" occurs once, in Part A J-A52.61, which says the claim is held; it is unchanged from the input. "draws no cast
  shadow" occurs 4 times in both input and output, as our preset's behaviour (J-A68.86).
* **Other checks.** No "TBD" or "TODO" was introduced. No `=== ` line leaked into either file.

## 7 Document checks (`docs/validation/bench/doc_checks.py`, allow file `docs/validation/doc-checks-allow.tsv`)

The run used `--sections "The whole design,0,2,3,4,5,6,7,8,9,10,11,12,13,16,PART II,Delegated decisions,Judgment
calls"`. Both runs (13:25–13:27) were on one corpus snapshot: 9 626 JSON files, 916 788 3-grams, 478 C4 lists. Their
stderr (unreadable-JSON warnings for pre-existing captures) is identical. Each cell reads hits / unreviewed.

| run | document | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| U | untouched `024c57da…` | 5 / 0 | 0 / 0 | 1 334 / 0 | 10 / 0 | 0 / 0 | 0 / 0 | 0 |
| **A, final** | **assembled `3daa0b07…` (= installed)** | **5 / 0** | **0 / 0** | **1 334 / 0** | **10 / 0** | **0 / 0** | **0 / 0** | **0** |

No mechanical correction and no allow row was needed.

**Rationale file (information only, outside §17.1 (2)'s gate; S2 resolved against the matching design).**
* Input: C3 508 / 330, C4 7 / 7, S2 17 / 15.
* Output: C3 506 / 328, C4 7 / 7, S2 17 / 15.
* The sorted unreviewed sets differ only in three ways. Two C3 runs are gone ("and 1 5 on the", "set by the source
  the"). One C4 list of plain words changed with the restated J-A68.83: "field pass point reach square water" became
  "field pass reach side square town water".
* No new C3 run appears.

## 8 Held parts (gate (a)) — none written by round 2

No repair-r2 seat wrote a held part. Each report's held-parts section says so, and the phrase scan in §6 agrees. The
following remain held and absent from the installed design:
* **item 52**: the references' session-reached maps visibly differ;
* **item 35 (support)**: the position check, 160 of 162 faces;
* **item 60 (support)**: the 16-cell hand-off support;
* **item 68 (g)**: "MFCG draws no cast shadows";
* **item 68 (support)**: VG 1.6.9's shadow and night-light layers, and Dwellings' shading and occlusion.

The released parts stand as earlier rounds applied them: item 37, item 58 (f) and item 59's timing, each labelled. Item
49's deletion stays rejected (the 49 % figure is cited to F4).

## 9 Issues for the next round

Assembly raised none: nothing was skipped, merged or truncated. One seat's cross-part note, which is not a hand-off,
remains open for its owner. The pipeline report §4 (3) says model §2.7's `UndergroundSystem.sources` comment names only
"the raiseGrade that buried a town". It could add the generation-time buried town, "or, at generation, the
growth-stage-1 districts a history scar buried (II.7.6)". Nothing reads the comment as a rule, since II.7.6 states the
rule. The seats' other cross-part notes are already folded. Model's §4.7 (1) withdraw clause is in pipeline's block.
Model's §7.4 light hosts and §7.1 entrance side are in determinism's blocks. Kernel's §2.2 dependency is in model's
block. Pipeline's note 2 is in scope's §13.2 and §16. Rendering's II.7.3 note went in as hand-off 4.

## 10 CONFIRMED vs PLAUSIBLE

**CONFIRMED** (executed):
* the block application (55/55, audit clean);
* the hand-off, cross-checked byte-identical against the rendering seat's own script;
* the installed hashes;
* the index / Part A id sets;
* the references and the J, T and P id scans;
* the two doc-check runs and their counts;
* the rationale-file information runs;
* the changelog's 75-id coverage (asserted by script).

**PLAUSIBLE**: nothing in this report rests on reasoning alone. The design content of the blocks is the repair seats'
(PENDING FABLE REVIEW) and is not judged here.

Receipts: scratchpad `c0d81c15…/scratchpad/asm2/` holds `parse.out`, `apply.out`, `handoff.out`, `xcheck/`,
`verify.py`, `verify.out`, `refs-U.json`, `refs-A.json`, `changed.json`, `dc-U.out`, `dc-A.out`, `dc-RU.out`,
`dc-RA.out`, `ru.set`, `ra.set` and `changelog.md`.
