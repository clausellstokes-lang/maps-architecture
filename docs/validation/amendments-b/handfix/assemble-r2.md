# handfix-b/assemble-r2 — the mechanical assembler of the hand-fix repair round 2

> PENDING FABLE REVIEW — Opus-produced (handfix-b/assemble-r2).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM start: input doc e9c0b828… / rationale dcabf14b… (the state all six r2 seats built on); six block files present, each ending with "=== END ===" | done 19:23
ITEM archive: planned docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-repair-r2-2026-09-27.md, chmod a-w | done 19:25 (both cmp-identical, e9c0b828… / dcabf14b…, read-only; allow TSV + queue copied to scratchpad handfix/asm2/)
ITEM apply: planned apply-blocks.py on the six repair-r2-*.md (name order) twice, byte-identical | done 19:27 (14/14 applied, 0 skipped, 0 truncated, audit not-OK 0; two runs byte-identical: outputs, logs, console)
ITEM hand-off: planned the seats' hand-offs by script (restated-row swaps + any one-string substitutions) | done 19:28 (handfix/assemble-r2-handoff.py: 3 index + 5 Part A swaps, id sets asserted; P1 §2.5 BuildingSlot.unhoused at l. 879; two runs byte-identical; cross-route: equals scope continuation's combined copy d3821b39… plus P1, and pipeline continuation's comb2 but for scope's one corrected phrase)
ITEM audit + install: planned post-hand-off audit, live hashes checked, install | done 19:28 (audit 0 problems; 26 changed old lines in 24 hunks = the six seats' predicted lines exactly, rationale 5 rows = predicted; index/Part A 472/472, same ids, same order; live hashes re-checked e9c0b828… / dcabf14b… before install; installed doc 357c02f2…, rationale 9575f26c…; apply + hand-off logs copied to handfix/assemble-r2-{apply,handoff}-log.json)
ITEM refs: planned refs.py on installed doc vs archive | done 19:29 (refs.py: installed and archive both 139 headings, 35 D ids, 472 J ids, broken 2 = the pre-existing external os-geometry.md §2.1.4 and RFC 7946 §3.1.6; the five changed Part A entries cite 35 § pointers and 16 J ids, all resolve)
ITEM doc checks: planned three copies (untouched archive / installed / combined = installed) on changed top-level keys | done 19:35 (keys 2,3,4,5,7,8,10,13,Judgment calls: untouched x2 and installed C1 5 / C2 0 / C3 986 / C4 7 / S1 0 / S2 0, 0 unreviewed, exit 0; raw hits 998 vs 998, 0 added 0 removed; untouched stable; rationale whole: +5 / -1 hits, all on the model's restated J-A28.26 row, reviewed by contiguity check, no allow row)
ITEM report + queue row + LANDED: planned report, queue row, final checks on the live files, LANDED line | done 19:40 (report written; queue row B-handfix-b/assemble-r2 appended, old prefix byte-identical; final checks on the live files: installed hashes, archives read-only, allow file unchanged, audit 0 problems; LANDED line written at 19:40)

Lane `handfix-b/assemble-r2`, 2026-09-27 19:23–19:40, opus, a mechanical seat. Every change to the design documents
was made by a script (`apply-blocks.py`, then `handfix/assemble-r2-handoff.py`); no section text was edited by hand.
Input: `docs/ARCHITECTURE.md` sha256 `e9c0b828…` and `docs/ARCHITECTURE-RATIONALE.md` `dcabf14b…` (handfix-b/assemble-r1's
output, the state all six round-2 repair seats built their blocks on; unchanged when this lane began and when it installed).
Each of the six block files was in its final state: every seat had landed, its Fable continuation included (three
regenerated their files — model, pipeline, scope — and three left them unchanged), and no file changed after its seat's
last LANDED line (file times checked; the hashes in §3 are the ones the later continuations record).

## Outcome

* **All 14 blocks of the six `handfix/repair-r2-*.md` files are applied; none skipped.** 8 REPLACE blocks on 8 distinct
  headings (§2.6, §3.4, §4.7, §5.2, §7.4, §8.2, §10.2, §13.2), 2 J-ROWS blocks (3 index rows) and 4 RATIONALE-A blocks
  (5 Part A entries). No file was truncated (each ends with `=== END ===`), no header was malformed, no heading was
  missing, no text stood outside a block, and no heading was replaced twice.
* **The seats' hand-offs are applied by script.** 3 restated index rows (J-A28.23, J-A28.26, J-A28.46) and 5 restated
  Part A entries (J-A20.74, J-A28.23, J-A28.26, J-A28.34, J-A28.46) were moved into the older rows' places and the older
  rows deleted; the swapped id sets are asserted equal to the hand-offs' lists. The pipeline seat's one substitution
  (P1: the new field `BuildingSlot.unhoused` in §2.5, which its §4.7, §10.2 and J-A28.46 texts cite) landed once, inside
  §2.5 (l. 879). No round-2 seat restated a row without saying so, and no seat added a new id.
* **The change is exactly what the seats predicted.** Against the archive, the document changes 26 lines in 24 hunks
  (26 → 30 lines: §3.4's gloss 3 → 5, §2.6's contract sentence 1 → 3). These 26 lines equal the union of the line lists
  the six seats reported from their dry runs, with nothing missing and nothing extra. The rationale changes 5 entries in
  place, exactly the five predicted, and nothing outside Part A.
* **Two independent routes agree.** The installed document with P1 reversed is byte-identical to the scope seat's Fable
  continuation's combined copy (`d3821b39…`, built from the same six files without P1), and the installed document differs
  from the pipeline seat's Fable continuation's combined copy (with P1, built before the scope file's regeneration) by
  exactly the scope correction ("the rings" → "those", l. 10378). Both rationale copies are byte-identical to mine.
* **References:** 2 broken, the same 2 pre-existing external citations as before; 0 new. J ids 472 → 472. Every § pointer,
  J id and D id cited by the five changed Part A entries resolves.
* **Document checks** over the 9 changed top-level keys: the assembly adds no hit (raw hit sets 998 = 998, identical after
  normalising line numbers); the installed run exits 0. The rationale (not gated; see §7) gains 5 hits and loses 1, all in
  the model seat's restated J-A28.26 entry; this lane reviewed each (§7) and adds no allow row.
* **Nothing needs a ruling from this lane.** The seats' own PLAUSIBLE items and judgment calls go to the verify round (§9).

## 1 Archive

* `docs/archive/ARCHITECTURE-pre-handfix-b-repair-r2-2026-09-27.md`: `cmp`-identical to the document before assembly,
  sha256 `e9c0b828c9dd1779edea44c38d4af5d75e3bcbebca6e6932b0fba643926bf943`, 1 636 552 bytes, read-only.
* `docs/archive/ARCHITECTURE-RATIONALE-pre-handfix-b-repair-r2-2026-09-27.md`: `cmp`-identical to the rationale before
  assembly, sha256 `dcabf14b0ce9b9b04d5903d4bdb34443f63ac74cc15e240f6f4fa26d005bef70`, 456 336 bytes, read-only.
* Both names were new. The allow file and the review queue were copied to the scratchpad first; the allow file is
  unchanged by this lane, and the queue was only appended to (its old prefix byte-identical, checked).

## 2 The scripts

* `docs/validation/amendments-b/apply-blocks.py` (unchanged) wrote the applied copies and
  `docs/validation/amendments-b/handfix/assemble-r2-apply-log.json` (its input paths are the scratch copies
  `doc-before.md` / `rat-before.md`, whose sha256 it records: the live base). Its only notes were "DUPLICATE ID inserted"
  on the restated rows, exactly the ids the hand-offs list, and `part_a_without_j_rows: ['J-A20.74', 'J-A28.34']`, which the
  determinism and kernel seats foresaw (their index rows are unchanged).
* `docs/validation/amendments-b/handfix/assemble-r2-handoff.py` (new, stdlib only, never writes in place), the round-1
  script's form. It imports `docs/validation/amendments-b/assemble-r1-handoff.py`'s `block_rows` and `swap_restated`
  unchanged. Then:
  * it asserts the swapped id sets: index {J-A28.23, J-A28.26 (model), J-A28.46 (pipeline)}; Part A {J-A20.74
    (determinism), J-A28.34 (kernel), J-A28.23, J-A28.26 (model), J-A28.46 (pipeline)};
  * for P1 it asserts that the old string occurs once in the document and inside §2.5, that the new string is absent,
    and that both equal the two lines the pipeline preamble quotes (the line after the one ending "Old:" and the line
    after "#   new:") — a transcription check against the seat's own text.
  Its log, `docs/validation/amendments-b/handfix/assemble-r2-handoff-log.json`, holds every swapped-out row verbatim and
  the substitution.
* Two full runs (apply, then hand-off) gave byte-identical outputs, logs and console output. The live files still had
  the input hashes when the outputs were installed at 19:28.

## 3 Blocks applied and skipped, per file

| block file | sha256 (first 16) | lines | blocks | applied | skipped | REPLACE targets | index rows | Part A entries |
|---|---|---|---|---|---|---|---|---|
| `repair-r2-determinism.md` | `ce62542d4a073f0f` | 212 | 3 | 3 | 0 | §5.2, §7.4 | 0 | 1 restated (J-A20.74) |
| `repair-r2-kernel.md` | `3362e9c9560c6792` | 209 | 2 | 2 | 0 | §3.4 | 0 | 1 restated (J-A28.34) |
| `repair-r2-model.md` | `fa0154b9d1f8d724` | 616 | 3 | 3 | 0 | §2.6 | 2 restated (J-A28.23, J-A28.26) | 2 restated (J-A28.23, J-A28.26) |
| `repair-r2-pipeline.md` | `3bdc244e90c9d9c1` | 524 | 4 | 4 | 0 | §4.7, §10.2 | 1 restated (J-A28.46) | 1 restated (J-A28.46) |
| `repair-r2-rendering.md` | `69a226bda9ae5f34` | 335 | 1 | 1 | 0 | §8.2 | 0 | 0 |
| `repair-r2-scope.md` | `84e00c5b396215f4` | 325 | 1 | 1 | 0 | §13.2 | 0 | 0 |
| **total** | | | **14** | **14** | **0** | 8 | 3 (all restated) | 5 (all restated) |

* **Skipped: none. Truncated: none. Malformed: none.** The preambles of the kernel, model and pipeline files are ignored
  by the protocol, as intended; the other three files open with their first block.
* **Audit after the hand-off** (`asm2/audit.py`): every REPLACE body is present exactly once, and every J-ROWS and
  RATIONALE-A row once. No swapped-out row remains. Index 472 → 472 rows and Part A 472 → 472 entries, with the same id
  set in the same order and no duplicates; every index id has a Part A entry and every Part A entry an index row.
* **Headings 145 → 145, every heading line unchanged; fence lines 108 → 108, balanced.** The title block is
  byte-identical, there are 0 per-section PENDING FABLE REVIEW lines before and after, and the rationale outside Part A
  is byte-identical.
* **Hand-off lines in the installed text:** P1 at l. 879 (§2.5 `BuildingSlot`); J-A28.23 at l. 12820, J-A28.26 at
  l. 12823, J-A28.46 at l. 12976 (index); J-A20.74 at l. 330, J-A28.23 at 357, J-A28.26 at 360, J-A28.34 at 487,
  J-A28.46 at 513 (rationale).

## 4 Sizes before and after

| file | before | after |
|---|---|---|
| `docs/ARCHITECTURE.md` | 13 021 lines, 1 636 552 bytes, sha256 `e9c0b828…` | 13 025 lines, 1 642 264 bytes, sha256 `357c02f28cbf16826d577713261f34d3d1f378ce33929637714b978d24ff24d7` |
| `docs/ARCHITECTURE-RATIONALE.md` | 2 053 lines, 456 336 bytes, sha256 `dcabf14b…` | 2 053 lines, 459 060 bytes, sha256 `9575f26c1df137ab77e1038d7cf4c2eaa1b0e7af4fdf1db94e8d5742f8a27eda` |
| `docs/validation/doc-checks-allow.tsv` | 1 579 lines | 1 579 lines (unchanged) |
| judgment index rows / Part A entries | 472 / 472 | 472 / 472 |

The document grows by 4 lines: §3.4's seed-clip gloss (kernel) and §2.6's new contract sentence, set on its own source
line (model), each add 2.

## 5 Changed sections (exact heading lines, in document order)

* `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector` — pipeline P1 (l. 879, hand-off)
* `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface` — model VHM1-01, VHM1-02, VHM1-03, VPH1-02 (l. 965, 983, 1019, 1266 → 3 lines, 1372, 1388, 1402, 1409, 1478, 1485, 1504; 590 → 592 lines)
* `### 3.4 Kernel operations the pipeline needs (complete list)` — kernel VHM1-04 (l. 2635–2637 → 5 lines; 193 → 195 lines)
* `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model` — pipeline VPH1-01 (1) (l. 4676)
* `### 5.2 Failure classes: detection, ladder, test` — determinism VDR-01 (l. 5640)
* `### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8` — determinism VDR-02 (l. 7047)
* `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)` — rendering VHM1-05 (l. 7756)
* `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)` — pipeline VPH1-01 (2) (l. 8910)
* `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT` — scope VSR-01 (1) (l. 10363), VSR-01 (2) (l. 10374), VSR-02 and VSR-03 (l. 10403)
* `# Judgment calls ("chose X over Y because Z"; each vetoable)` — 3 index rows restated in place (J-A28.23 l. 12816, J-A28.26 12819, J-A28.46 12972)
* Rationale `## Part A — …` — J-A20.74 (l. 330), J-A28.23 (357), J-A28.26 (360), J-A28.34 (487), J-A28.46 (513) restated in place

Line numbers are the archive's. The 9 changed top-level keys are §2, §3, §4, §5, §7, §8, §10, §13 and Judgment calls.

## 6 References

* `docs/validation/amendments-b/refs.py` on the installed document gives 139 heading keys, 35 D ids, 472 J ids and **2
  broken references**: `os-geometry.md` §2.1.4 (external) and RFC 7946 §3.1.6. The archive gives the same 2 (472 J ids).
  No fix was needed.
* The five changed Part A entries cite 35 § pointers, 16 J ids and no D id; every one resolves against the installed
  document (`asm2/rat-refs.txt`). S2 of the document checks reports 0 on the document.
* Cross-part probes (`asm2/crosspart-probes.txt`, whitespace-collapsed counts, archive → installed):
  * determinism's VDR-02 sentence in §7.4 ("whatever its row's undo, the plots the re-provision touched") 0 → 1, and the
    scope bar that cites it (T28-18, "its undo restoring those plots and every household byte-identically") 0 → 1;
  * `unhoused` 0 → 4 in the document (§2.5's field; §4.7 and §10.2, each naming `BuildingSlot.unhoused` with a §2.5
    pointer; the J-A28.46 row, naming the field) and 0 → 1 in the rationale (J-A28.46);
  * the model's "a stair turret" and "fills the room" 0 → 3 each in the document (the §2.6 contract sentence, the J-A28.26
    row, scope's T28-4), so scope's widened bar points at text that now exists;
  * the rendering row's pointer target in §2.6 ("no span mark, span caster or arch glyph drawn over it") 1 → 1, and the new
    row text 0 → 1;
  * the kernel's new gloss 0 → 1 in each file, its retired rationale wording 1 → 0; the scope stand-in's retired phrase
    ("less the rings of the earlier towers") 0 in both.

## 7 Document checks (three-copy method, one corpus snapshot)

Command: `python3 docs/validation/bench/doc_checks.py --sections "2,3,4,5,7,8,10,13,Judgment calls"`; the rationale with
no `--sections` (whole file) and `--heads` its matching document. Six runs were launched together at 19:29:14 and ended
at 19:32:09; the untouched copy ran once more after them (19:32–19:34). Every run read 9 626 JSON files, 911 940 C3
3-grams and 478 C4 lists (colour_files 10 097 in each), and printed the same 994 unreadable-JSON warnings
(`captures/dwellings/**/network/bodies/*.json`). "Mine" and "combined" are the same copy: this lane's change is the whole
combination.

| run | copy | allow file | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|---|
| untouched, run 1 (with the batch) | archive `e9c0b828…` | default | 5 | 0 | 986 | 7 | 0 | 0 | 0 | 0 |
| **mine = combined (installed)** | **`357c02f2…`** | **default** | **5** | **0** | **986** | **7** | **0** | **0** | **0** | **0** |
| untouched | archive | empty | 5 | 0 | 986 | 7 | 0 | 0 | 998 | 1 |
| mine = combined | installed | empty | 5 | 0 | 986 | 7 | 0 | 0 | 998 | 1 |
| untouched, run 2 (after the batch) | archive | default | 5 | 0 | 986 | 7 | 0 | 0 | 0 | 0 |
| rationale whole, untouched (`--heads` the archive) | archive rationale `dcabf14b…` | default | 0 | 0 | 399 | 6 | 0 | 17 | 274 | 1 |
| rationale whole, installed (`--heads` the installed document) | `9575f26c…` | default | 0 | 0 | 403 | 6 | 0 | 17 | 278 | 1 |

* **The document.** The two untouched runs gave identical output, so the corpus held still. With the empty allow file the raw hit lists of the archive and the installed copy agree hit for hit — 998
  each, 0 added, 0 removed, compared by (check, text) with line numbers normalised (`asm2/dc-diff.txt`). The assembly
  adds no hit, so no allow row is needed.
* **The rationale.** It lies outside the allow file's regime: its standing set of 274 unreviewed lines predates this
  pass, every seat's rationale run exits 1, and the allow file holds no rationale row. Compared the same way, the
  installed rationale adds 5 hits and loses 1, and all six sit on l. 360, the model seat's restated J-A28.26 entry (the
  pipeline seat's Fable continuation had found the same set and left it to this lane). Reviewed here, with
  `asm2/contig.py` (the checks' own tokenisation, over `research/findings/*.md` and every JSON file under research/ and
  captures/):
  * C3 "in the middle of the room", "ring with a hole a", "wall and the room is": contiguous in no findings file and no
    JSON file — ordinary English stitched from separate corpus 3-grams.
  * C3 "a spiral stair in a round tower": contiguous in no JSON file and in one findings file,
    `research/findings/dwellings-synthesis.md` l. 38 — our own architect seat's prose describing an option of the
    reference ("a spiral stair in a round tower), which it only offers as options"), not reference text. The entry uses
    the same plain description for the design's own tower rule.
  * C4 "hall keep ring stair tower wall well" replaces the old entry's "keep ring stair tower wall well" (the restated
    entry adds the word "hall"). They are ordinary architectural nouns used in the entry's prose. The list that holds
    all seven is one in 25 captured Neighbourhood bodies (an MFCG list in 75 bodies holds five), the same list the old
    entry matched with six, and that six-word hit was already in the standing set.

## 8 Cross-checks against the seats' own combined copies

`asm2/crossroute.txt`:
* **Route A.** The scope seat's Fable continuation built a combined copy from the same six files at their current
  hashes, with the restated-row swaps and without P1 (`combined-final-doc.md`, sha256 `d3821b39…`). The installed
  document with P1 reversed is byte-identical to it; the rationale copies are byte-identical.
* **Route B.** The pipeline seat's Fable continuation built a combined copy with P1 applied by its own simulation script,
  before the scope file was regenerated (`comb2-doc.md`, scope file `04d0945c…`). The installed document differs from it
  in one hunk, l. 10378 (T28-4), by exactly the scope continuation's correction "the rings" → "those"; the rationale
  copies are byte-identical.

## 9 Notes for the verify round (no ruling needed from this lane)

The seats' own PLAUSIBLE items and judgment calls, which the verifiers should re-read on the assembled text:
1. **Determinism** (VDR-01…03): that VDR-02's one Application sentence reaches every capacity-lowering row; the
   item 20 reading of the undo's moves; "stays as it is" for the redo case; the pairing with scope's T28-18. JUDGMENT
   (its Fable seat): the verifier's VDR-02 sentence kept verbatim ("its joined neighbour" without "if any").
2. **Kernel** (VHM1-04): the hole argument (CONFIRMED by its Fable seat on a raster model, `hole-gloss-check.py`); the
   widening of the fix to J-A28.34's Part A entry; the gloss kept verbatim.
3. **Model** (VHM1-01…03, VPH1-02): the widened VHM1-03 rule (any stair core's bay or chimney stack in a composer's
   room stands against its wall or fills it); `Building.dwelling` cleared on both paths; the capacity-0 sentence's
   "built as" clause; the `Composition.rooms` comment. PLAUSIBLE: that the candidate filter leaves real composers enough
   placements; how often the `liveIn` and `houses` edit paths are reached.
4. **Pipeline** (VPH1-01): refinements (a)–(c), in particular the stored field `BuildingSlot.unhoused` (landed by P1
   here); the institution widening; the overflow-pass ruling recorded in Part A. Its report asks for §4.7's *Households
   per building*, §10.2's `houses` comment, §2.5's `BuildingSlot` and J-A28.46 to be re-read together with §2.6's
   capacity sentence, which this assembly now makes possible.
5. **Rendering** (VHM1-05): the `sealed` override row left without a condition of its own; the city-band clause left
   as it stands.
6. **Scope** (VSR-01…03): the widened T28-4 clause (stair turret, stack); ", bringing its capacity below its
   households," in VSR-02; two dossier fixtures for VSR-03; the rewording to the contract's own phrase.
7. **Provenance.** Several seats' earlier combined dry runs cite superseded states of sibling files (model `67fa25da…` /
   `aa4dc3a4…`, pipeline `1881785f…` / `ffbe0d87…`, scope `04d0945c…`); the rendering continuation's "13 028 lines" is a
   combined copy before the swaps (3 duplicate index rows). None affects this assembly: the audit, the predicted-line
   match and both cross-routes ran on the six files at the hashes in §3.

## 10 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed).**
* The archives are `cmp`-identical to the input, and the live hashes were unchanged at install.
* 14 of 14 blocks were applied and 0 skipped, and two runs were byte-identical.
* The hand-off gave 3 + 5 swaps with the id sets asserted, and P1 landed once, inside §2.5, matching the seat's quoted
  lines.
* The post-hand-off audit found 0 problems, and the changed-line set equals the seats' predicted set in both files.
* Both cross-routes hold as stated in §8.
* References: 2 broken, both pre-existing; the changed Part A entries resolve; the probes are as listed.
* The document checks exit 0 and the assembly adds no document hit. The rationale's added hits are the 5 listed, each
  reviewed by the contiguity check.

**PLAUSIBLE (reasoning only).** The design content of the blocks is the seats' work; judging it belongs to the verify
round. The same holds for the reading that the rationale's added hits are chance or own-vocabulary matches beyond what
the contiguity check shows.

JUDGMENT: applied the seats' hand-offs (the restated-row swaps and P1) in this lane, by script, over applying the blocks
alone, because the protocol only appends rows — the index would keep 3 duplicate ids and Part A 5 — and without P1 the
pipeline's §4.7, §10.2 and J-A28.46 texts would cite a field that §2.5 does not define; round 1's assembler set the
precedent and every hand-off is addressed to this lane — say "veto" to flip it (the pre-hand-off copies are
`asm2/applied1.md` and `asm2/applied1-r.md`; the archives restore the base).
JUDGMENT: recorded the review of the rationale's 5 added hits in §7 rather than as allow rows, because the rationale lies
outside the allow file's regime (no rationale row exists, and its standing unreviewed set gates no seat) — say "veto" to
append the five rows (check, exact text, the reasons in §7).

**Receipts** (session scratchpad `…/scratchpad/handfix/asm2/`):
* the apply runs: `parse.txt`, `apply-run{1,2}.txt`, `apply-log{1,2}.json`, `applied{1,2}.md`, `applied{1,2}-r.md`;
* the hand-off runs: `handoff-run{1,2}.txt`, `handoff-log{1,2}.json`, `final{1,2}.md`, `final{1,2}-r.md`;
* the audit: `audit.py`, `audit-final{1,2}.{json,txt}`; the hashes: `live-hashes-start.txt`, `installed-hashes.txt`;
* the cross-routes: `crossroute.txt`; the probes: `crosspart-probes.txt`;
* the resolver: `refs-installed.*`, `refs-before.*`, `rat-refs.txt`;
* the check runs: `dc.sh`, `dc-untouched{1,2}.txt`, `dc-installed.txt`, `dc-noallow-{untouched,installed}.txt`,
  `dc-rat-{untouched,installed}.txt`, `dc-exits.txt`, `dc-diff.txt`, `contig.py`, `contig.txt`;
* the pre-change copies: `doc-before.md`, `rat-before.md`, `allow-before.tsv`, `queue-before.md`.
