# assemble-r3 — lane amendments-c/assemble-r3 (the mechanical assembler of repair round 3 of the bundled pass c + d + e)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/assemble-r3).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 archive of the pre-repair-r3 state: done (docs/archive/ARCHITECTURE-pre-amendments-c-repair-r3-2026-09-28.md sha256 3daa0b07…, docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r3-2026-09-28.md sha256 bfa20419…; cmp-identical, mode 444)
> STEP 1 inventory of the five repair-r3 files (closure, double REPLACE): done (36 blocks, every file closed by END, no heading REPLACEd twice, all 26 REPLACE headings present once in the live design; scratch asm3/parse.out)
> STEP 2 blocks applied to copies (apply-blocks.py, two-pass), audited: done (36/36, 0 skipped, 0 merges, audit not-OK 0; applied doc 0d368d70…, rationale 1b85bd85…)
> STEP 3 scripted hand-off (restated rows, the seats' named hand-offs): done (assemble-r3-handoff.py: index 9 / Part A 11 swaps, new J-A68.93/.94 once, VD2-03 script exit 0 with 26 rewrites, 9 checks satisfied; doc 70ddb6e3…, rationale e138da23…; index 735 = Part A 735; cross-checked byte-identical against repair-rendering-r3-handoff.py + swap_restated + repair-determinism-r3-handoff.py run standalone)
> STEP 4 install over the live files: done 15:18 after the checks passed on the copies (live hashes re-checked first; design 3daa0b07… -> 70ddb6e3…, rationale bfa20419… -> e138da23…; code-impact and allow file untouched)
> STEP 5 references: done (resolver 2 broken = the baseline's 2 external; resolver J ids 730 -> 732; index 735 = Part A 735; wide J scan: the same 5 non-index tokens as the input; T-ids 202, all in §13.2; P-id tokens unchanged)
> STEP 6 document checks: done (15 keys; input and assembled both exit 0: C1 5/0 C2 0/0 C3 1 153/0 -> 1 159/0 C4 11/0 S1 0/0 S2 0/0; one corpus snapshot; no allow row, no correction; rationale information run: +8 C3 / +2 C4 unreviewed, all in rendering r3's Part A entries)
> STEP 7 changelog in docs/ARCHITECTURE-VALIDATION.md §Ac: done (### §Ac.3, 30 rows covering all 33 validate.md §5 ids plus RP3-01, asserted by script; file 2 122 -> 2 197 lines)
> STEP 8 this report complete: done
> STEP 9 queue row + LANDED line: done (queue row B-amendments-c/assemble-r3 appended; LANDED line in docs/lane-events.log)

Lane `amendments-c/assemble-r3`, 2026-09-28, started 15:09. Input design `3daa0b07…`, rationale `bfa20419…`,
validation `1a87c53e…`, code-impact `cf6f665f…`. Scratch: scratchpad `c0d81c15…/scratchpad/asm3/`.

Status: COMPLETE (installed 15:18; see the LANDED line in `docs/lane-events.log`). Every change came from `apply-blocks.py`, from
`assemble-r3-handoff.py` (new, in this folder, which runs the determinism seat's `repair-determinism-r3-handoff.py`
unchanged) or from a short asserted append script (the changelog). Nothing was hand-edited.

## 1 Outcome

All 36 blocks of the five repair-r3 files were applied and none was skipped. There was no merge, no truncation, no
missing heading and no retitle. The seats' hand-offs were applied by script and the design and the rationale file are
installed. The references are unchanged: the 2 baseline external citations. The document checks over the 15 changed
top-level keys exit 0 with 0 unreviewed hits in every check; the six hits the round adds are reviewed build tags. No
correction and no allow row was needed. The changelog is `docs/ARCHITECTURE-VALIDATION.md` §Ac.3.
`research/findings/code-impact.md` and the allow file are unchanged.

No assembler decision was needed. The seats' hand-offs are complete and mutually consistent. Every restated row is
declared by its seat. The VD2-03 pointer script passes on the combined document. Every cross-seat text a seat said it
follows is present once where the seat said.

## 2 Blocks applied and skipped, per file

Order: two-pass (every REPLACE first, then J-ROWS and RATIONALE-A; files in name order, blocks in file order). Every file
ends in `=== END ===`, so no file is truncated. No heading is REPLACEd twice, so there was no three-way merge. All 26
REPLACE headings stand once in the input design.

| file | sha256 | blocks | REPLACE | J-ROWS | RATIONALE-A | skipped |
|---|---|---|---|---|---|---|
| `repair-r3-determinism.md` | `107913206bda97ad…` | 4 | 2 (§7.4, §7.7) | 1 (1 row) | 1 (1 entry) | 0 |
| `repair-r3-model.md` | `819736b8e68ea146…` | 4 | 2 (§2.7, §2.9) | 1 (1 row) | 1 (1 entry) | 0 |
| `repair-r3-pipeline.md` | `6d38357eca3f7809…` | 7 | 5 (§4.6, §4.7, §4.11, §10.2, II.7.6) | 1 (1 row) | 1 (3 entries) | 0 |
| `repair-r3-rendering.md` | `8ba3fbee8af8d505…` | 12 | 10 (§8.1, §8.3, §8.4, §8.8, §8.9, §11.1, §11.3, §12.5, §12.7, §12.8) | 1 (7 rows) | 1 (7 entries) | 0 |
| `repair-r3-scope.md` | `ace817ca2520782e…` | 9 | 7 (§0.2, §13.2, §13.5, §14, §15.1, §15.2, §16) | 1 (1 row) | 1 (1 entry) | 0 |
| **total** | | **36** | **26** | **5 (11 rows)** | **5 (13 entries)** | **0** |

The apply-blocks notes are all expected: the ten "DUPLICATE ID inserted" notes of the seats' restated rows, which the
hand-off swaps (§3). `part_a_without_j_rows` is [J-A42.41, J-P37], exactly pipeline's Part-A-only restatements. The
audit covers 36 blocks and 0 are not OK. After the hand-off, 20 REPLACE bodies are present verbatim once in the
installed design. The other six (§2.7, §2.9, §4.11, §10.2, §11.1, §14) differ only by the VD2-03 script's pointer
rewrites: all were present once before that step, and a token-level diff of that step shows 25 changed lines whose
only differences are 26 "item" → "layer" tokens after "§7.7". Every J-ROWS row and RATIONALE-A entry is present once in
the installed files, the restated ones at the older rows' places.

## 3 Hand-off (`docs/validation/amendments-c/assemble-r3-handoff.py`)

1. **Restated rows swapped into the older rows' places** (`swap_restated`, unchanged from amendments-b).
   * Index, 9 rows: J-A68.73 (determinism), J-A88.21 (model), J-A88.42 (pipeline), J-A68.85, J-A68.89, J-A68.90,
     J-A68.92 and J-A101.86 (rendering), and J-A81.01 (scope).
   * Part A, 11 entries: the same nine, plus J-A42.41 and J-P37 (pipeline, Part A only).
   * Both sets equal the seats' declared hand-offs exactly; the script stops otherwise.
   * The 2 new ids stay where the protocol appended them: J-A68.93 and J-A68.94 (rendering), each once per table.
   * Result: 735 index rows and 735 Part A entries, the same id set, no duplicate.
2. **VD2-03 pointer hand-off.** `repair-determinism-r3-handoff.py` ran unchanged, as a subprocess, on step 1's output,
   with the rationale file; exit 0. It made 26 context rewrites ("§7.7 layer 2" 2 → 27, "§7.7 layer 1" 1 → 2). Every
   "§7.7 item 1/2" left (item 2: 14, item 1: 11) is a known dossier-contract pointer, and the rationale's 3 are
   checked. Its guarded harmonisation of §13.2 logged "absent — skipped", because scope's block already carries the
   landed wording. Its log is embedded in the hand-off log.
3. **Checked, not applied** (each present exactly once, whitespace-normalised, in its subsection or index row):
   * §13.2's lit-street fixture: "the door light keeping its fraction of the footprint ring's edge it stands on and
     never re-seated" (scope §4 (2), following determinism VD2-01);
   * §7.4: "keeps its fraction of the ring edge its point lies on";
   * J-A68.73's index row: "fraction of the footprint ring's edge"; and "fraction along the footprint edge" absent from
     the whole document (pipeline report §3's C3 note, resolved by determinism's rewording);
   * J-A88.42's index row: "its age the catacomb rule's age" (scope §4 (2): T88-1 follows it);
   * §2.9: "a recipe input read by S2's growth-stage count and II.7.6's rules (§2.7; §4.2 S2)" and J-A88.21's index row:
     "(its readers J-A88.42's)" (model hand-off 3);
   * §2.7: "the growth-stage-1 districts a `fire` or `flood` scar buried (II.7.6; J-A88.42)" (model V-MC2-02);
   * J-A81.01's index row: "| §7.7 item 15, §1.1, §14 |" (scope VD2-05).
4. **Cross-check.** The rendering seat's own script (`repair-rendering-r3-handoff.py`) on the applied copy, then
   `swap_restated` for the other ids, then the determinism script run standalone, reproduces this seat's output byte for
   byte (design `70ddb6e3…`, rationale `e138da23…`).

Logs: `assemble-r3-apply-log.json`, `assemble-r3-handoff-log.json` (this folder; copies of scratch `asm3/`'s).

## 4 Sizes

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 17 215 lines, 2 281 645 bytes, `3daa0b07…` | 17 305 lines, 2 298 461 bytes, `70ddb6e302ea06c1…` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 314 lines, 664 923 bytes, `bfa20419…` | 2 316 lines, 672 652 bytes, `e138da2377d31b9f…` |
| `docs/ARCHITECTURE-VALIDATION.md` | 2 122 lines, `1a87c53e…` | 2 197 lines, `52a7ff09…` |
| `research/findings/code-impact.md` | 228 lines, `cf6f665f…` | unchanged |
| `docs/validation/doc-checks-allow.tsv` | `f50531bb…` | unchanged |

Archives (read-only, cmp-identical to the inputs):
* `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r3-2026-09-28.md`
* `docs/archive/ARCHITECTURE-RATIONALE-pre-amendments-c-repair-r3-2026-09-28.md`

No existing archive was touched. Headings stay 147 → 147, with every heading line unchanged. Fence lines stay 130 →
130. The title block is unchanged. The one review banner is unchanged, and there is no per-section marker. The live
hashes were re-checked immediately before the install (15:18), and the installed files are cmp-identical to the checked
copies.

## 5 Changed sections (exact heading lines; each one's own text differs from the input)

33 headings changed: the 26 REPLACE targets; §4.2, §4.3, §4.5, §5.3, §10.3 and II.7.5, changed only by the VD2-03
pointer rewrites; and `# Judgment calls` (its index rows and J-A79.23's pointer). No heading line was removed or added.

* ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), items 8–31 (`AMENDMENTS-2026-09-25b`) and items 32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`)
* `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records`
* `### 2.9 The document and serialisation`
* `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace`
* `### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph`
* `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims`
* `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule`
* `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model`
* `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)`
* `### 5.3 The invariant suite, by scope (SCL-1)`
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`
* `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)`
* `### 8.1 The display list (renderer-independent, columnar, incremental)`
* `### 8.3 Symbol catalogue and draw-style census`
* `### 8.4 Layers, shadows, heights`
* `### 8.8 Tiles, zoom stops, print and the canvas budget`
* `### 8.9 Backends, text, threads and the worker boundary`
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)`
* `### 10.3 People, households, relations, sub-locations, schedules`
* `### 11.1 Formats`
* `### 11.3 The host bridge — the host is the store (FTG-12)`
* `### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6)`
* `### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)`
* `### 12.8 Memory (what is counted, per rung)`
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`
* `### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file`
* `## §14 Package and module layout, key interfaces, dependency rules, extension points`
* ### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked
* ### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5
* `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2`
* `### II.7.5 The undercity (item 65): what it requires, existence and the 1–3 bound, a shadow of the settlement`
* `### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)`
* `# Judgment calls ("chose X over Y because Z"; each vetoable)`

Top-level keys changed (15): 0, 2, 4, 5, 7, 8, 10, 11, 12, 13, 14, 15, 16, PART II, Judgment calls.

## 6 References

* **Resolver** (`docs/validation/amendments-b/refs.py`). Input: 141 heading keys, 35 D ids, 730 J ids, 2 broken.
  Output: 141 / 35 / 732 / **2 broken**. The two are the same external citations as before (`os-geometry.md` §2.1.4;
  RFC 7946 §3.1.6). No fix was needed.
* **Wide J scan** (case-insensitive; every cited `J-…` in the design and the rationale file, against the index rows).
  735 ids are defined. The only unmatched tokens are the five pre-existing Part A citations of other ledgers' ids — the
  survey plan's J-M4 and J-M9, and the Fable review's J-Fcode-1 to J-Fcode-3. They are identical in the input.
* **T ids.** 202 are cited, all defined in §13.2; the set is identical to the input's.
* **P ids.** The P-id citation tokens are unchanged in count (design 226, rationale 204).
* **Held-part phrases.** "160 / 162", "160 of 162", "16-cell", "16 cells wide" and "door concept": 0 in both files,
  before and after. "visibly differ" (1, Part A J-A52.61, which says the claim is held), "draws no cast shadow" (4, our
  preset's behaviour, J-A68.86) and "MFCG draws" (design 4, rationale 3): unchanged from the input.
* **Other checks.** No "TBD" or "TODO" was introduced. No `=== ` line leaked into either file.

## 7 Document checks (`docs/validation/bench/doc_checks.py`, allow file `docs/validation/doc-checks-allow.tsv`)

The run used `--sections "0,2,4,5,7,8,10,11,12,13,14,15,16,PART II,Judgment calls"`. Both runs (15:13–15:15, in
parallel) were on one corpus snapshot: 9 626 JSON files, 916 788 3-grams, 478 C4 lists. Their stderr (unreadable-JSON
warnings for pre-existing captures) is identical. Each cell reads hits / unreviewed.

| run | document | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| U | untouched `3daa0b07…` | 5 / 0 | 0 / 0 | 1 153 / 0 | 11 / 0 | 0 / 0 | 0 / 0 | 0 |
| **A, final** | **assembled `70ddb6e3…` (= installed)** | **5 / 0** | **0 / 0** | **1 159 / 0** | **11 / 0** | **0 / 0** | **0 / 0** | **0** |

The six added C3 hits are reviewed rows of the allow file: pipeline's "NG 1.2.2's" build tag (VAL-01) and scope's five
"of the 2026-09-25 capture" build names (VAL-02 and its extension): the normalised runs "ng 1 2 2 s" go 23 → 24 and
"of the 2026 09 25" 6 → 11 in the document, and both are reviewed C3 rows of the allow file. No mechanical
correction and no allow row was needed.

**Rationale file (information only, outside §17.1 (2)'s gate; S2 resolved against the matching design).**
* Input: C3 506 / 328, C4 7 / 7, S2 17 / 15.
* Output: C3 515 / 336, C4 9 / 9, S2 17 / 15.
* No unreviewed hit disappeared. Ten were added, all in rendering r3's Part A entries (restated or new):
  * J-A68.90: C3 "ends at the list s", "field over the whole frame", "view and a far field"; C4 "field hill pass reach
    side square";
  * J-A68.93: C3 "and a building s footprint", "footprint with the building s", "s and the generation worker";
  * J-A68.92: C3 "it by the same law";
  * J-A101.86: C3 "lives in the module s";
  * J-A68.85: C4 "high light lost night shadow".
  They read as plain-English coincidences with the corpus, the same kind as the file's 328 standing hits. The rendering
  seat's report ran doc_checks on the design keys only. They are listed in §9 for the next round and were not edited
  here (a mechanical seat).

## 8 Held parts (gate (a)) — none written by round 3

No repair-r3 seat wrote a held part. Each report's held-parts section says so, and the phrase scan in §6 agrees. The
following remain held and absent from the installed design, for Fable's retrovalidation:
* **item 52**: the references' session-reached maps visibly differ from a fresh load;
* **item 35 (support)**: the position check on 160 of 162 faces;
* **item 60 (support)**: the hand-off support for plans up to 16 cells wide, which are dropped;
* **item 68 (g)**: "MFCG draws no cast shadows" as a claim about the reference;
* **item 68 (support)**: VG 1.6.9's shadow and night-light layers, and Dwellings' shading and occlusion;
* **item 50 (MFCG clause)**: stands only as the route's inference sentence, as written.

The released parts stand as earlier rounds applied them: item 37, item 58 (f) and item 59's timing, each labelled. Item
49's deletion stays rejected (the 49 % figure is cited to F4).

## 9 Issues for the next round

Assembly raised none: nothing was skipped, merged or truncated, and no document-check hit is unreviewed. Open for their
owners (none is a hand-off, and none blocks this landing):
1. **Rendering, rationale file (information run, §7).** Ten new unreviewed C3/C4 hits in the Part A entries J-A68.85,
   J-A68.90, J-A68.92, J-A68.93 and J-A101.86. Reword, or record as reviewed if a later gate covers the rationale file.
2. **Determinism, §7.3 item 9 (d)** (model report cross-part note). The closure of an undercity entrance that lacks its
   lifeline runs II.7.6's connector step and can dig `dug` passages, but the edit kind does not declare which entity it
   acts on, so §2.7's `UndergroundSystem.sources` cannot name it yet. When §7.3 declares it, that entity joins the list.
3. **Model, §2.7 `Use.concealmentSource` comment** (pipeline report §3). It repeats what §4.7's *Concealed
   institutions* (1) now states; the two texts agree. For single source it could shorten to a pointer.
4. **Scope, §16 M2b / M3b cells** (rendering report cross-part note). If a verifier holds that R10 wants §8.3's two new
   rows named, the M2b cell gains "§8.3's mountainous fixture" and the M3b cell "§8.3's hand-lantern row". No price
   changes.
5. **Fable re-check first** (the seats' own PLAUSIBLE lists): pipeline's three departures from the validator's texts
   and its self-found RP3-01 (its report §2 (1), (2), (4)); rendering's ring-block mechanism (J-A68.90) and every
   time figure, PLAUSIBLE until M2b; scope's gate-(b) extension (its report §3) and the lit-street fixture's M3b / M4
   split; model's widened `sources` clause; determinism's door-light wording and the §7.7 pointer convention.

## 10 CONFIRMED vs PLAUSIBLE

**CONFIRMED** (executed):
* the block application (36/36, audit clean);
* the hand-off, cross-checked byte-identical against the rendering seat's swap script plus the determinism script run
  standalone;
* the VD2-03 step's token-level diff (only "item" → "layer" after "§7.7");
* the installed hashes;
* the index / Part A id sets;
* the references and the J, T and P id scans;
* the two doc-check runs and their counts, and the six added hits' two allow-listed runs (23 → 24, 6 → 11);
* the rationale-file information runs and the attribution of their ten new hits;
* the changelog's 33-id coverage (asserted by script).

**PLAUSIBLE**: nothing in this report rests on reasoning alone, except the reading in §7 that the ten rationale hits are
plain-English coincidences. The design content of the blocks is the repair seats' (PENDING FABLE REVIEW) and is not
judged here.

Receipts: scratchpad `c0d81c15…/scratchpad/asm3/` holds `parse.out`, `targets.txt`, `apply.out`, `apply-log.json`,
`handoff.out`, `handoff-log.json`, `xcheck/`, `verify.py`, `verify.out`, `verify-ids.py`, `verify-ids.out`,
`refs-U.json`, `refs-A.json`, `changed.json`, `dc-U.out`, `dc-A.out`, `dc-RU.out`, `dc-RA.out`, `ru.set`, `ra.set`
and `changelog.md`.
