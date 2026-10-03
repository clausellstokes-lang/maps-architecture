# Assemble — coherence pass, round 7 third fix pass (the nine repair-r7x block files applied to the base and the volumes)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r7x (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r7x`, 2026-10-02, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at e75baf6; base `561d5541…` as assemble-r7w installed
  it); untouched snapshot — done
- P2 block inventory and routing (9 files, 25 REPLACE: base 12, volumes 13; 0 missing, 0 ambiguous, 0 unclosed, 0 overlap,
  0 double REPLACE, 0 RULING REQUEST; the model's block first); ASSEMBLE NOTES census — done
- P3 apply (25 applied, audit not-OK 0; volume outputs equal their seats' records; the four base seats' stand-alone runs
  reproduced, disjoint, their union the combined diff), headings unchanged, install (6 of 15 changed) — done
- P4 references: 57 448 checked, 0 broken, 0 mechanical fix, 97 ambiguous-form listed; §2.7's laws (law, clause, term), its
  two tables, the worked-example and support-step citations, Part H's 107 ruled texts and 57 cross-unit anchors all resolve
  — done
- P5 document checks, three-copy method: 11 allow rows (7 proposed by the seats that wrote the text, 4 the assembler's
  review of the model's runs); the installed copy exits 0 on both key sets (PROVISIONAL: corpus incomplete); 9 allow rows
  now stale, listed; volume information runs — done
- P6 bundle and `--check` — done
- P7 review-id and marker census (ROUND-7 NOTES (9) (c), (e)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r7x/`. Most are assemble-r7w's scripts
with the round label and the scratch folder (`scratchpad/coherence/asm7x/`) changed: `snapshot.py`, `route.py`, `apply.py` (which
runs `docs/validation/amendments-b/apply-blocks.py` unchanged), `headings.py`, `install.py`, `mirror.sh` with `refs.py` and
`refsreport.py`, `lawrefs.py`, `tablerefs.py`, `examples.py`, `checks.py`, `attrib.py`, `hitctx.py`, `staleallow.py`, `volchecks.sh`
with `volsummary.py`, `sizes.py`, `after.py`.

These are this round's own or changed:
* `alone.py`, `volrec.py`: their records are this round's four base headers and five volume headers (sections 2.1, 2.2).
* `mkfinal.py` (new): the final texts, the untouched copies overlaid by `apply.py`'s outputs (no assembler change follows).
* `ambdiff.py` (new): the ambiguous-form references new and gone, matched by text, not line (section 4.1).
* `partH.py` (new): every quoted "old" → "new" text and every "after / before … insert / add" text of adjudication-r7x's Part H,
  checked present in the installed unit (section 4.5).
* `endrefs.py`: this round's 57 cross-unit anchors (section 4.6). ROUND-7 NOTES (9) (b) asks for this once both ends are in.
* `c3runs.py` (new): doc_checks' C3 runs located by line in the untouched and installed copies, so a run the untouched copy
  carries only inside a longer reviewed run is told apart from one it carries as a run (section 5).
* `allowrows.py`: this round's eleven rows, the same two rules, the sites read from `c3runs.py`.
* `reviewids.py`: it also counts the round-7x narration forms ("adjudication-r7x", "r7x", `VF7w-…`, "root cause", "class
  sweep") and, per token, the short Part H and sweep ids (M1–M12, P1–P9, D1–D6, S1–S9, X1–X2, SW1–SW5, W1–W6, F1–F5).

No live text was edited by hand, and the assembler changed nothing after the blocks. Each script's records sit beside it:
* routing and application: `snapshot.json`, `blocks.json`, `split/`, `logs/`, `apply.json`, `alone.json`, `volrec.json`,
  `headings.json`, `install.json`, `after.json`;
* references: `refs-before.out`, `refs-first.out` (= `refs-final.out`), `refs-summary.json`, `ambiguous-refs.tsv`,
  `ambiguous-diff.txt`, `external-refs.tsv`;
* the laws, tables, examples, ruled texts and anchors: `lawrefs-*.out` and `.json`, `tablerefs-*`, `examples-*`, `partH.json`,
  `endrefs.out`, `endrefs.json`;
* document checks: `checks-first.json`, `checks.json`, `c3-attribution-first.tsv`, `c3-attribution.tsv`, `c3runs.json`,
  `hitctx.tsv`, `staleallow.json`, `volchecks-final.txt`;
* sizes and census: `sizes.json`, `unitsizes.json`, `reviewids-untouched.*`, `reviewids-final.*`.

## Outcome

**All nine repair files had LANDED before this seat started** (ROUND-7 NOTES (9) (d)). Each has a
`coherence/repair-<unit>-r7x LANDED` line in the lane log and its result in `results/coherence_repair-<unit>-r7x.json`. All nine
are committed at HEAD `e75baf6`. Kernel, rendering, V01, V02, V03, V05, V08, V10 and V12 had nothing to repair this pass, so they
have no file.

**Blocks: 25 found, 25 applied, 0 skipped.**
* All 25 are REPLACE blocks: 12 for the base, 13 for five volumes. There is no J-ROWS, RATIONALE-A or RULING REQUEST block.
* No heading was missing or ambiguous, and no block was truncated.
* No two blocks touch one subsection: there is no double REPLACE and no nesting. So no three-way merge was needed, and no heading
  was retitled.
* The audit finds every applied body exactly once, and the fences are balanced in every file.
* Every volume output equals its repair seat's recorded dry run:
  * V06 and V11 by sha256;
  * V04 and V07 by bytes, lines and the exact live lines changed;
  * V09 by its lines and per-section words.
* Each of the four base seats' recorded stand-alone dry runs is reproduced (scope by sha256 prefix as well). Their diffs are
  pairwise disjoint, and their union is the combined run's diff.

**The model's block was applied first** (ROUND-7 NOTES (9) (e)). This round the model writes §2.7 alone (one REPLACE: 37
count-asserted substitutions, M1–M12 and its sweep's X1, X2, every one inside the support step (6)). One of them changes a law:
M12, END-L3, law 3's sentence ("A line's part inside a strip that crosses no deck line there leaves it on the side it entered
from."). After all nine files were in, every citation of "§2.7's laws" by law, clause or term was checked against what the
installed laws define, and so was every table, worked-example and support-step citation. **All resolve.** Every ruled text of
adjudication-r7x's Part H stands in its unit (section 4.5), and the 57 cross-unit anchors this round's FIX, END and CLASS lines
name are each defined at their homes (section 4.6).

**ASSEMBLE NOTES and swaps: none** (section 2.5). No header carries an ASSEMBLE NOTE, a swap or a restated row.
* Eight proposed allow rows were reviewed (determinism 2, pipeline 1, scope 5). Pipeline's is the same run as determinism's first
  ("law 1 2 6 9"), so they are one row. All seven distinct rows were written.
* Four further runs, all in the model's §2.7 text, had no proposal; the assembler reviewed them and wrote a row for each.

**Nothing is unplaced.** The round adds, removes and retitles no heading.

**Size.** The set (base and volumes) goes from 9 900.5 KB to 9 902.4 KB (+238 words, +0.01 %):
* the base grows by 212 words: model −99, determinism −141, pipeline −124, scope +576;
* the volumes grow by 26 words: V04 +20, V06 −144, V07 −24, V09 +90, V11 +84.
Every word changed is ruled FIX, END or CLASS text, or a seat's R7-01 (2) sweep conformation in the forms F1–F5.

**References.**
* 57 448 references are checked. **None is broken**, before or after.
* **No mechanical fix was needed**: the resolver finds no FIX-class reference. So the installed base is the blocks' output.
* 97 references resolve but are ambiguous in form (98 before). The two bare `§3.2` sites that assemble-r7w listed (T110-2 (1),
  T-V6-73) are gone: S3 and V6-6 prefix them "V06 §3.2". One is new: V11 row 80's "§2.7's laws" after a V06 list.

**Document checks.** The installed document exits 0 over every top-level key and over the eight `#` keys, against one corpus
snapshot.
* This needed 11 reviewed allow rows.
* The result is **provisional**, because the reference corpus is incomplete in this checkout.
* The installed document's total is **3 783 hits** (C1 5, C2 1, C3 3 448, C4 12, S1 0, S2 317), 0 unreviewed.

**Bundle.** `docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes.

**Review ids and review markers in design text** (ROUND-7 NOTES (9) (c), (e)):
* **0** review-id sites outside the decision and request records (0 before);
* **0** `PRB7…` ids, **0** "(amended, …)" markers and **0** new "(J14n …)" change markers in the base, the volumes and INDEX;
* **0** round-7x narration forms ("adjudication-r7x", "r7x", `VF7w-…`, "root cause", "class sweep", "END-L3", form ids F1–F5,
  the seats' short ids) added to the base, the volumes or INDEX;
* **no new owner-id parenthetical.** The nine standing ones are unchanged; each cites a rule's source (section 7).

## 1. Live files — sha256 before and after

**Before:** the committed text at HEAD `e75baf64e8fd`. Each live file equalled its HEAD blob. These are assemble-r7w's outputs:
* the base is `561d554110258e3b…`, ROUND-7 NOTES (4)'s merge base;
* every repair file was written against them.

**After:**
* `install.py` wrote the blocks' outputs, only after confirming each live file still held its P1 sha256. It verified each written
  file byte-identical to its final copy.
* No later step changed a live design file. After P5–P7, `after.py` re-checked every live file equal to its final copy.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 3 208 376 | 3 209 864 | `561d554110258e3bef6f756b46200b8a3d8b2f00f3c4c72853e33c9fde678f77` | `03573b4f209a0cef3024adaa2ec10f431b9c6f96ab22aaaae0899aee8de075af` |
| `docs/ARCHITECTURE-RATIONALE.md` | 704 813 | 704 813 | `7e172500f6a791c5cf1e667c657309b6a49ee067dc130a05d82e605a06579c39` | unchanged (no block) |
| `docs/volumes/V01-neighbourhoods.md` | 529 232 | 529 232 | `5c0ea6757d0cb7cc3a866131961f817cb031919d1276b0dc33def3e95c3b9b1a` | unchanged (no block) |
| `docs/volumes/V02-buildings.md` | 565 121 | 565 121 | `c7fbb7055d776409fe0f906059fcf943198ecb81de065054674be4859cef4540` | unchanged (no block) |
| `docs/volumes/V03-interiors.md` | 467 810 | 467 810 | `894955c29098f435f9f483c2c0991fe7ebfc79b19d4dd0e0a2c078e676266792` | unchanged (no block) |
| `docs/volumes/V04-underground.md` | 536 408 | 536 518 | `caf4af3c0221629dbbec859d06a8542e60db394b8b3d751e74700449ee12a43a` | `4dfe36fb01108f2bbf0430e24f4cacc72bad52bf7db1d9f2708083861ce7680e` |
| `docs/volumes/V05-sky.md` | 404 696 | 404 696 | `1931fec160a4b146d1778deac28413dc329bae2868d8542f4967116a695e671f` | unchanged (no block) |
| `docs/volumes/V06-evolution.md` | 710 871 | 710 168 | `f829ee6a91265e76b508310705167c8a27eb05a1a96cd2394401cfe567f187c1` | `58f0fb64092942c2a93f9881486ea67e9640d6e4fab76b101b5ca9ef8872baeb` |
| `docs/volumes/V07-village.md` | 622 153 | 622 038 | `4e2b51c8632803a3d101e0d41263552fea84617478014f65194c63b6c95aa343` | `6202d46df5b3eabf034ec388adbdb11e83d0295b4b80e0901031d309cbacf5ba` |
| `docs/volumes/V08-settlementforge.md` | 582 193 | 582 193 | `83382cac1e496ffb29d7ca1d9ea1ed3c7b37978ddedd915ee50f73c89ca1b491` | unchanged (no block) |
| `docs/volumes/V09-application.md` | 779 271 | 779 775 | `e76c3c2ccc6b600e2b592311ebde61b995c5f25398700174ba7a89188bc1be1e` | `da502c0a32e9ad7dba2a694b05967adf830bba30035ce450db13688a2ec02f62` |
| `docs/volumes/V10-clerk.md` | 524 582 | 524 582 | `cb4d9cffb49f1bc3cb489a515a316f2e7046f6c44a4116cd895d891022762bc0` | unchanged (no block) |
| `docs/volumes/V11-content.md` | 681 412 | 681 994 | `67c7c0b837e1c53a1c428d75485da9c5e54c193428a0c9ba86a36f71aae86dfc` | `da9be47c3f14fd2f8cb3146549cea1c6a45c4d7a1a6099ba5508dbda3d79d080` |
| `docs/volumes/V12-calibration.md` | 526 016 | 526 016 | `3f20cb1fbf132b75ffdbd881b97084797c8203a63355587d1de977315f792b89` | unchanged (no block) |
| `docs/volumes/INDEX.md` | 24 074 | 24 074 | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` | unchanged (no block routes to it) |

Also written:
* `docs/ARCHITECTURE-FULL.md`, the bundle (section 6);
* `docs/validation/doc-checks-allow.tsv`, one appended block (section 5).

## 2. Blocks — routing, application, audit

**The block files** are exactly `docs/validation/coherence/repair-r7x-<unit>.md` for the nine units (ROUND-7 NOTES (1)): model,
pipeline, determinism, scope, V04, V06, V07, V09 and V11. `blocks.json` records each one's sha256 as read. Everything under
`work/` and the bench files is the repair seats' working material, never blocks.

**Routing** (`route.py`):
* Each file was cut at its `=== FILE <path> ===` lines. Every block went to the file its nearest FILE line above names, or the base
  when there is none (ROUND-7 NOTES (3)).
* Each volume file has one FILE line naming its own volume, and the four base files have none. No file carries blocks for more
  than one document, and none routes to INDEX.md or the rationale. (V09's "### 2.7" is its own volume's, routed by its FILE line;
  no other file names a base §2.7 heading.)
* **Order:** each split file keeps its repair file's basename behind an order prefix: `a-` for `repair-r7x-model.md`, `b-` for
  every other. `apply-blocks.py` applies its files in name order. So the base run applies the model's §2.7 block first, then
  determinism's, pipeline's and scope's (ROUND-7 NOTES (9) (e)). The base log's first audit entry is the model's block, and the
  base ran before the volumes.
* The FILE lines are left out (they are routing, not blocks); every other line is verbatim.
* Each volume ran with a throwaway rationale whose output equals its input.
* No text follows any file's last END.

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST, and 0
overlaps of any kind. No two blocks of the round, within one unit or across units, cover one subsection or nest. Two consequences:
* **No double REPLACE.** The brief's `git merge-file` step had nothing to merge (its merge base: the subsection as assemble-r7w
  installed it, base `561d554110258e3b…`). So there is no conflict and no lost hunk to report (ROUND-7 NOTES (4)).
* **No retitled target.** Every block was found on the text as it stood, and every body opens with its own target heading (ROUND-7
  NOTES (5)).

| unit | blocks found | applied | skipped | target | covers | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|---|
| model | 1 | 1 | 0 | `ARCHITECTURE.md` (applied first) | §2.7 | 31 663 → 31 564 (−0.3 %) | 185.5 → 184.9 |
| determinism | 3 | 3 | 0 | `ARCHITECTURE.md` | §5.2, §7.1, §7.3 | 27 015 → 26 874 (−0.5 %) | 163.7 → 163.0 |
| pipeline | 7 | 7 | 0 | `ARCHITECTURE.md` | §4.1, §4.2, §4.3, §4.4, §4.8, §4.11, §4.13 | 47 154 → 47 030 (−0.3 %) | 279.8 → 279.2 |
| scope | 1 | 1 | 0 | `ARCHITECTURE.md` | §13.2 | 28 810 → 29 386 (+2.0 %) | 174.4 → 177.6 |
| V04 | 1 | 1 | 0 | `V04-underground.md` | ## 7 | 9 005 → 9 025 (+0.2 %) | 52.5 → 52.6 |
| V06 | 4 | 4 | 0 | `V06-evolution.md` | §3.7, §3.17, §3.19, ## 7 | 26 265 → 26 121 (−0.5 %) | 154.3 → 153.6 |
| V07 | 2 | 2 | 0 | `V07-village.md` | §3.5a, ## 7 | 12 261 → 12 237 (−0.2 %) | 70.0 → 69.9 |
| V09 | 4 | 4 | 0 | `V09-application.md` | §2.7, §4.9, §4.20.2, §7.1 | 27 751 → 27 841 (+0.3 %) | 166.4 → 166.8 |
| V11 | 2 | 2 | 0 | `V11-content.md` | §1b, §3.1 | 11 861 → 11 945 (+0.7 %) | 74.2 → 74.8 |
| **total** | **25** | **25** | **0** | | | | |

"Covered text" compares, for each REPLACE, its target's section in the untouched file with the section of its body's heading in
the installed file.

**Each unit's block count matches its header, its result file and the orchestrator's count of 25:** model 1, pipeline 7,
determinism 3, scope 1, V04 1, V06 4, V07 2, V09 4, V11 2.

**Each unit's word change matches its header** (whitespace-split):
* model −99 (31 663 → 31 564); pipeline −124 (its seven subsections 47 154 → 47 030); scope +576 (§13.2 28 810 → 29 386);
* determinism −141: its header counts §5–§7 whole (84 165 → 84 024); the three covered subsections change by the same −141;
* V04 +20; V06 −144 (§3.7 −102, §3.17 +22, §3.19 −69, ## 7 +5); V07 −24; V11 +84 (§1b +2, §3.1 +82);
* **V09 +90, its per-section counts reproduced exactly** (§2.7 1 606 → 1 611, §4.9 13 199 → 13 268, §4.20.2 1 339 → 1 340, §7.1
  11 607 → 11 622). Its volume figure, "126,256 to 126,345 words (wc)" (+89), is another count: the volume's whitespace count is
  128 692 → 128 782.

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines (balanced) | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 12 | 12 | 0 | 153 → 153 | 140 → 140 | `03573b4f209a0cef` | each seat's stand-alone run reproduced (section 2.1); 24 163 → 24 192 lines; index and Part A unchanged, no duplicate id |
| `V04-underground.md` | 1 | 1 | 0 | 59 → 59 | 12 → 12 | `4dfe36fb01108f2b` | equal: 536 408 → 536 518 bytes, 3 644 → 3 644 lines; the diff touches exactly l. 3164 |
| `V06-evolution.md` | 4 | 4 | 0 | 65 → 65 | 28 → 28 | `58f0fb64092942c2` | equal: sha256 `58f0fb64092942c2a93f9881486ea67e9640d6e4fab76b101b5ca9ef8872baeb`, 710 168 bytes, 4 666 lines |
| `V07-village.md` | 2 | 2 | 0 | 58 → 58 | 18 → 18 | `6202d46df5b3eabf` | equal: 622 153 → 622 038 bytes, 4 125 → 4 124 lines; the diff touches exactly l. 1615–1618, 1621–1622 and 3710 |
| `V09-application.md` | 4 | 4 | 0 | 110 → 110 | 24 → 24 | `da502c0a32e9ad7d` | equal in its counts (4 / 4 / 0, audit OK, headings and fences unchanged, 5 045 → 5 045 lines) and its per-section words (no hash recorded); the diff touches l. 648, 2102–2104, 3022–3023, 4428 |
| `V11-content.md` | 2 | 2 | 0 | 58 → 58 | 22 → 22 | `da9be47c3f14fd2f` | equal: sha256 `da9be47c3f14fd2f8cb3146549cea1c6a45c4d7a1a6099ba5508dbda3d79d080`, 681 994 bytes, 5 470 lines; changed lines exactly l. 208 and 1006 |

**Audit, for each run:**
* every applied body is found exactly once in the output (not-OK 0);
* every title block is unchanged by the blocks;
* the PENDING FABLE REVIEW lines are unchanged in every file;
* the applier printed no note: no duplicate id, no retitle, no supersession, no malformed header;
* no `=== ` header line and no "RULING REQUEST" text stands in any installed file.

### 2.1 The base seats' dry runs, reproduced (`alone.py`, `alone.json`)

`alone.py` ran each base seat's split file alone on the untouched base and rationale. It compared the result with the seat's header:

| seat | alone: found / applied / skipped / audit not-OK | lines | old lines its diff touches | its header's record, reproduced |
|---|---|---|---|---|
| model | 1 / 1 / 0 / 0 | 24 163 → 24 160 | 94 lines, all inside §2.7 (l. 2249–3520): 2855–2856, 2914, 2916, 2964–2969, 2977–2978, 2987–2988, 3016, 3019–3020, 3022–3023, 3058–3059, 3069–3075, 3078–3086, 3138, 3142–3147, 3153–3154, 3177–3188, 3199–3204, 3231, 3244–3250, 3258–3264, 3273, 3330–3332, 3340, 3342–3345, 3347, 3352–3353, 3369–3371 | headings 153 → 153, fences balanced, title block unchanged, rationale unchanged, 24 163 → 24 160 lines, every line outside §2.7 byte-identical |
| determinism | 3 / 3 / 0 / 0 | 24 163 → 24 162 | l. 9855, 11147–11155, 11343–11344, 11601 | exactly its hunk list (§5.2's F-WALL row: D4, D5; §7.1 *Raised ways* re-wrapped to 8 lines: D3; the outcome table: D1, D2; §7.3's S7 row: D6); rationale unchanged |
| pipeline | 7 / 7 / 0 / 0 | 24 163 → 24 163 | l. 5709, 5713, 6227, 6244, 6251, 6407, 6503, 6586, 6602–6603, 6618, 6645, 6653, 6658, 6693, 8347, 8405, 8954, 8964, 9710, 9712 | exactly its 21 lines; rationale byte-identical |
| scope | 1 / 1 / 0 / 0 | 24 163 → 24 196 | 40 lines in 18 hunks, all in §13.2's T110 bullet (l. 19256–19567) | 3 208 376 → 3 211 705 bytes, sha256 `79d7a8ef…`, 18 hunks, rationale unchanged |

**All four equal their records.**

**The four diffs are disjoint.** No old line is touched by two seats. The union of the four touched-line sets (168 old lines)
equals the combined run's touched set. The combined base grows by 29 lines, the sum of the four stand-alone growths
(−3 − 1 + 0 + 33): 24 163 → 24 192. Its bytes grow by 1 488, the sum of the four (−534 − 740 − 567 + 3 329).

### 2.2 The volume seats' dry runs, reproduced (`volrec.py`, `volrec.json`)

Each volume output was compared with what its seat's header records:
* V06's and V11's sha256 are equal.
* V04's and V07's bytes, lines and the exact live lines the diff touches are equal.
* V09's lines and per-section word counts are equal (section 2's table). Its header records no hash and no line list; its
  diff touches exactly the lines of its eight edits (l. 648, 2102–2104, 3022–3023, 4428).

### 2.3 Headings, RULING REQUEST blocks

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents. Each count is
unchanged: base 153, INDEX 9, V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67.

**RULING REQUEST blocks: 0** (ROUND-7 NOTES (2), (9) (f)):
* each repair header and result file records 0;
* no `=== RULING REQUEST` line stands in any of the nine files.

### 2.4 The model's block applied first, and the other units' citations of the laws

ROUND-7 NOTES (9) (e) names the model's blocks "§2.2, §2.7, §2.8". This round the model writes §2.7 alone, as its header says: 1
REPLACE, the live §2.7 with 37 count-asserted substitutions (M1–M12 and its sweep's X1, X2). Every edit is inside the support step
(6). One edit changes the laws: M12, END-L3, law 3's sentence on a line's part inside a strip, which now reads "… leaves it on the
side it entered from." (3 words fewer, J150). No other law is touched.

It was applied first. Every citation of the laws, their terms and their worked examples was checked after all nine files were in
(section 4).

### 2.5 NOTES FOR ASSEMBLE — the census (ROUND-7 NOTES (9) (a))

I read all nine preambles. I looked for every line that names Assemble or the assembler, a swap, a title block, a restated row, a
J-ROWS or RATIONALE-A row, a proposed allow row, a NOTE or a HAND-OFF.

**No header carries an ASSEMBLE NOTE, a swap instruction or a restated J-ROWS or RATIONALE-A row.**
* Every volume unit records its title block untouched.
* No base unit writes a J-ROWS or RATIONALE-A block.
* So `final/` is `apply.py`'s output (`mkfinal.py`). The rationale, V01, V02, V03, V05, V08, V10, V12 and INDEX.md are carried
  unchanged.

**Eight proposed allow rows are addressed to the assembler** (tab form; the allow file is the assembler's to write):
* **Determinism's two:** "law 1 2 6 9" (D1's and D3's "law 1 (2)–(6), (9)–(11)" in §7.1) and "3 7 1 2 7" (D5's "V06 §3.7.1;
  §2.7's laws" in §5.2's F-WALL ladder cell).
* **Pipeline's one:** "law 1 2 6 9" (P1's and P3's citation form F1, §4.3 *Where it may not go* and §4.4 S5a *Trace* (2)) — the
  same run as determinism's, so one row.
* **Scope's five:** "route and the same on a" (S6 item 1), "through it and the stage" (S6 item 2), "a run of the hand" (S1),
  "law 1 2 4 6" (S9 (e), (f)) and "one at a point of" (S6 item 5), all in §13.2's T110-2.
Each was reviewed and written (section 5).

**The volume headers record their volume doc-check results** and propose no tab-form row:
* V06 records "law 1 2 6 9" three times and "3 7 6 5 3 7 2 the"; the first is now covered by the base row, the second stands
  (section 5).
* V07 records one hit gone ("1 5 and 0 on a") and none new; V04 records none new; V09 and V11 record no doc-check run.
As in rounds 0–7w, no row is appended for volume runs (section 5).

**HAND-OFFS and observations in the headers** are for the adjudicator and the next verifiers, not assembly work. They stand in the
repair files. Each "both ends" claim was checked in the installed text (sections 4.5, 4.6). Every hand-off has both ends
installed:
* **model ↔ scope:** M11's W6·C2 and W8·C2 name "T110-2 (4) (H)"; S8 writes the hand `convert` `gateToJunction` (W6) and
  `absorbWall` (W8) runs into T110-2 (4).
* **model ↔ V07:** M11's W5·C2 names "T-V7-48's decay clause (V)"; V7-1 writes the palisade's run "beneath the declared viaduct".
* **model ↔ pipeline:** M4, M5 and M10 cite §4.4 S5a *Trace* (2)'s pull and pin rule; P1 and P2 write them in F1 and law 2's
  order.
* **model ↔ V06:** M4 cites V06 §3.7.4 (2)'s cost field as searching the same shapes; V6-1 writes it in F1.
* **determinism ↔ scope:** D1's row; S1 writes its bar, T110-2 (4)'s gate clause.
* **determinism ↔ pipeline:** D4 (F-WALL's detection, "an arterial or a carried way") and P2's step (c), F-WALL's raised-way rung.
* **determinism ↔ V06:** D5's epoch wait in F-WALL's ladder cell; V6-2 and V6-3 in V06 §3.7.1 and §3.17 (3), all counted
  `walls.waited`.
* **V06 ↔ scope:** V6-6 and S3, "V06 §3.1, V06 §3.2, V06 §3.7.5" in T-V6-73 and T110-2 (1), word-identical.
* **V06 ↔ pipeline, model, scope:** VF7w-EPO-01's ENDs, P3 (§4.3 *Where it may not go*), M1 (*over the band*) and S9 (d)
  (T110-2 (3)).
* **V09 ↔ scope:** V9-4 (T-V9-52's road clause) and S5 (T110-2 (4)), each citing law 1 (5), law 2 (a), law 3.
* **V09 ↔ determinism:** V9-2, V9-3 and V9-5's line and source cells against D1 and D3's §7.1 text.
* **V11:** row 80's EVO_FORT and S1 readers cite V06 §3.7.6 (5), §5.2's F-REDERIVE and §7.3 (b) 3, each standing.

**Observations for the adjudicator, listed in section 8:**
* **determinism:** three citations narrower than the forms, written nothing because its brief scoped it to the ruled lines: §7.3
  (b) 3 twice (l. 11697, 11705 of the pre-round text: "law 2 (a)" where D6's form reads "law 2, in its order") and §7.1's last
  outcome row ("law 1 (2), (5)" for the course D3 now cites in full).
* **V09:** three clauses of T-V9-52's viaduct fixture, written nothing for the same reason: (a) a gate slid "to the strip's edge
  its grip came from", (b) a wall drawn along beneath "moves to the strip's edge", (c) a dropped gate "moves along the trace
  clear of it" — (a) and (b) name the place END-L3 now takes out of law 3.
* **pipeline:** §4.8's S7 lead and §4.11 *carve* still cite "§2.7's way-and-channel table, row (a)" / "row (c)" with the laws in
  a parenthesis; they cite the laws, so Part H's citation rule holds.

ROUND-7 NOTES (9) (b) is met: all nine files were applied before the reference check (section 4).

## 3. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | lines before → after | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|---|
| base | 3 208 376 | 3 209 864 | +0.05 % | 522 184 | 522 396 | +0.04 % | 24 163 → 24 192 | 3133.2 → 3134.6 |
| V01 | 529 232 | 529 232 | 0.0 % | 86 896 | 86 896 | 0.0 % | 3 762 → 3 762 | 516.8 → 516.8 |
| V02 | 565 121 | 565 121 | 0.0 % | 94 571 | 94 571 | 0.0 % | 4 227 → 4 227 | 551.9 → 551.9 |
| V03 | 467 810 | 467 810 | 0.0 % | 79 495 | 79 495 | 0.0 % | 3 304 → 3 304 | 456.8 → 456.8 |
| V04 | 536 408 | 536 518 | +0.02 % | 87 453 | 87 473 | +0.02 % | 3 644 → 3 644 | 523.8 → 523.9 |
| V05 | 404 696 | 404 696 | 0.0 % | 68 398 | 68 398 | 0.0 % | 3 096 → 3 096 | 395.2 → 395.2 |
| V06 | 710 871 | 710 168 | −0.1 % | 116 420 | 116 276 | −0.1 % | 4 676 → 4 666 | 694.2 → 693.5 |
| V07 | 622 153 | 622 038 | −0.02 % | 103 064 | 103 040 | −0.02 % | 4 125 → 4 124 | 607.6 → 607.5 |
| V08 | 582 193 | 582 193 | 0.0 % | 92 453 | 92 453 | 0.0 % | 3 735 → 3 735 | 568.5 → 568.5 |
| V09 | 779 271 | 779 775 | +0.06 % | 128 692 | 128 782 | +0.07 % | 5 045 → 5 045 | 761.0 → 761.5 |
| V10 | 524 582 | 524 582 | 0.0 % | 84 926 | 84 926 | 0.0 % | 3 580 → 3 580 | 512.3 → 512.3 |
| V11 | 681 412 | 681 994 | +0.09 % | 113 848 | 113 932 | +0.07 % | 5 470 → 5 470 | 665.4 → 666.0 |
| V12 | 526 016 | 526 016 | 0.0 % | 85 347 | 85 347 | 0.0 % | 3 561 → 3 561 | 513.7 → 513.7 |
| INDEX | 24 074 | 24 074 | 0.0 % | 4 054 | 4 054 | 0.0 % | 202 → 202 | 23.5 → 23.5 |
| rationale | 704 813 | 704 813 | 0.0 % | 119 127 | 119 127 | 0.0 % | 2 386 → 2 386 | 688.3 → 688.3 |
| **base + volumes** | 10 138 141 | 10 140 007 | +0.02 % | 1 663 747 | 1 663 985 | +0.01 % | | **9900.5 → 9902.4** |
| **volumes** | 6 929 765 | 6 930 143 | +0.01 % | 1 141 563 | 1 141 589 | +0.00 % | | 6767.3 → 6767.7 |
| **base + volumes + INDEX** | 10 162 215 | 10 164 081 | +0.02 % | 1 667 801 | 1 668 039 | +0.01 % | | 9924.0 → 9925.9 |

Words are whitespace-split, as rounds 0–7w counted them; a seat's `wc -w` or other count can differ by a few.

**Why the round is near flat.** This pass closes the family's root cause by replacing restatements of §2.7's laws with
citations (forms F1–F5), which removes words, and adds the runs, seed conditions, readers and line forms its findings require.
* The removals are all RESTATEMENT: the model's lists in *beneath*, *over the band*, the fixed-place and bent-group sentences and
  the tables (−99 net), determinism's §7.1 row and *Raised ways* (−141 net), pipeline's S5a list, pin rule and course rule
  (−124 net), V06's §3.7.1, §3.7.6 (5), §3.19 (5) and T-V6-47 (−144 net), V07's §3.5a (4) and T-V7-48 (−24 net).
* The growth is ruled content: scope's §13.2 runs, seed conditions and bars (+576), V09's line form, shape-lock qualifier and
  citations (+90), V11's two readers (+84), V04's seed condition (+20).
* The assembler may not compress text.

**Against the shrink goal.** The band is 25–40 % fewer words than the pre-coherence archive, which held 1 491 685 words for base and
volumes.
* The set now stands at 1 663 985 words: +11.55 % against the archive (+11.53 % before this round).
* No unit shrank by more than half.
* Each repair file states what holds its unit; each cites this pass as a repair, not a shrink round.

**Duplicate id definitions across the set** (principle (4)): **none** (`sizes.py`). The census covers the judgment index, Part A,
D-n, T-ER, every volume's T-Vn-m and J-Vn.m rows, and `_integrate.md`'s J-VI rows. The resolver's defined ids are unchanged at
3 468: no id was added, removed or renumbered.

## 4. References

### 4.1 The resolver

**The resolver.** This is assemble-r0's `refs.py` (citation form canon S7: a bare `§x` is the base's; a volume's section is `Vnn
§x` everywhere), unchanged but for its root. It ran on two mirror trees (`mirror.sh`), the untouched set and the final set. Each
tree had `_integrate.md`, files f and g, `research/` and `docs/volumes/critique/` linked in.

**What it checks.**
* **The forms:** every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…`, with lines read joined.
* **The targets:** the headings and ids that now exist. The numbered targets are unchanged by the round: base 147, V01 121, V02 99,
  V03 53, V04 66, V05 60, V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8. Defined ids: 3 468.

**Ordering.**
* All nine files were applied before the run (ROUND-7 NOTES (9) (b)), the model's block first ((9) (e)). So every cross-unit
  citation of Part H's END lines is read with both its ends in place.
* The untouched run's printout is byte-identical to assemble-r7w's final run (`refs-before.out` = assemble-r7w's `refs-final.out`).

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 57 163 | 57 213 | the target exists |
| external | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 98 | 97 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` that only one volume of its list has: the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 57 399 | 57 448 | |

**Broken: 0**, before and after. **Mechanical fixes: 0.** The first run of the final set found no reference of class FIX, so there
was nothing to fix, and no repair file records a renumbering.

**Ambiguous form: 97** (98 before), listed in `ambiguous-refs.tsv` with unit, line, reference, the list's head volume and context:
base 19, V01 15, V02 13, V03 12, V04 1, V05 4, V06 5, V07 2, V09 7, V10 6, V11 11, V12 2. Each resolves under S7 as the base's; the
verifier confirms each or prefixes it.

The round's changes to this list (`ambiguous-diff.txt`, matched by text; each checked by reading):
* **Two sites gone:** the bare `§3.2` of "V06 §3.1, §3.2, V06 §3.7.5" in base T110-2 (1) and V06 T-V6-73, which assemble-r7w
  listed. S3 and V6-6 now write "V06 §3.1, V06 §3.2, V06 §3.7.5".
* **One site new:** V11 l. 1006, row 80's readers cell (V11-1's text): "… by `structure.span.deckDepthCm`, by §2.7's laws, law 1
  (2), (4)–(7) …" after "V06 §3.7.6 (5)". It names the base's laws, as S7 reads it.
* **Three sites carried with new context:** V06 l. 1612 (§3.7.6 (5)'s cost field, rewritten by V6-1), V07 l. 3709 (T-V7-48, one
  line earlier), V11 l. 208 (W50, rewritten by V11-1). Each is the same "§2.7's laws" after a volume list.

**External: 131** (bare 120, bare-cont 1, J 10), listed in `external-refs.tsv`.

### 4.2 §2.7's laws, cited by law, clause and term (ROUND-7 NOTES (9) (e); `lawrefs.py`, `lawrefs-*.json`)

The resolver reads section numbers, not the law, clause and term names that the other units cite from §2.7's laws. `lawrefs.py`
does that:
* it parses the installed laws, from "(0) **§2.7's laws**" to "**Worked examples**";
* it then checks every citation of them in the installed base, volumes and INDEX, with lines read joined.

**What the laws define** (unchanged in shape by this round; law 3's sentence reworded by END-L3):
* **law 1:** the clauses (1)–(11);
* **law 2:** the heads *Entry*, *Newer*, *Not yet built*, *The soft readings*, *Carried way* and *A warp*; the steps (a)–(c); the labels
  (G1) and (G3);
* **law 3:** the keys (1)–(3);
* **law 4:** the label (G2);
* **the Terms:** the bold or italic terms, among them **the ends**, with *newly*, *deepens*, *The check* and *Show me why*.

**What is cited** (untouched → installed):
* **citations of a law by number: 914 → 953.** By unit: base 630, V01 10, V04 40, V05 1, V06 111, V07 71, V09 61, V10 8, V11 18,
  V12 3.
* **clause citations, numeric ranges expanded: 939 → 1 086.**
  * law 1: (1) 53, (2) 111, (3) 72, (4) 96, (5) 128, (6) 86, (7) 46, (8) 142, (9) 44, (10) 51, (11) 37;
  * law 2: (a) 105, (b) 20, (c) 80;
  * law 4's (G2): 15.
* **term and head citations: 96 → 103.**
  * law 2 heads: *Entry* 29, *Carried way* 27, *Newer* 6, *Not yet built* 4, *A warp* 1;
  * "laws' *x*": *Order* 14, *held* 6, ***ends* 5 (new: F5's "these laws' *ends*")**, *what stands of a wall* 3, *Newer* 2,
    *anything across a strip* 2, and *The check*, *beyond the foot*, *meeting* and *the band* 1 each.

**Result: 0 citations do not resolve.**
* Every cited law is one of 1–4, every clause exists for its law, and every head and term is defined.
* V11's "alignment law 0" values are content of its tables, not citations, and are passed over.

### 4.3 §2.7's two tables, cited by name (`tablerefs.py`, `tablerefs-*.json`)

**What the installed §2.7 defines** (unchanged):
* the four outcomes ***over the band***, ***down before the wall***, ***beneath*** and ***unchanged meeting***;
* the crossing table's rows W1–W14 and columns C1–C13;
* the way-and-channel table's rows (a)–(e).

**What the set cites** in the forms this script reads (untouched → installed):
* outcome names after "crossing table": 32 → 33;
* cells `Wn·Cm`: 106 → 106;
* "way-and-channel table, row(s) …": 11 → 8.

The drop is pipeline's P3 and P5, which rewrote six "§2.7's way-and-channel table, row (x)" citations into the citing form
("§2.7's laws, law n …; its worked example the way-and-channel table's row (x)"). Section 4.4 checks that form. **0 do not
resolve.**

### 4.4 The citing forms: worked examples and the support step (`examples.py`, `examples-*.json`)

`examples.py` checks each target named after "its / their worked example(s)":
* a crossing-table row W*n* (in 1–14) or cell C*m* (in 1–13);
* a way-and-channel row (*x*) (in (a)–(e)), including "that table's row (*x*)";
* a named sentence (the lock, bent-group and fixed-place sentences, all three standing), with the bent-group sentence's items
  (i)–(iv);
* an italic name, which must be one of the 167 bold or italic names of §2.7 from the support step to its end (166 before).

It also checks every "support step (n)" against the step's items (0)–(7) as installed.

**Results** (untouched → installed):
* worked-example citations: 232 → 238 (base 124, V01 6, V04 13, V05 1, V06 46, V07 23, V09 20, V10 1, V11 4);
* their targets: rows W*n* 58, cells C*m* 12, way-and-channel rows 28 (33 in all forms), the lock sentence 31, the fixed-place
  sentence 23, the bent-group sentence 13 (its item (i) 3), italic names 120, "the crossing table" 78;
* "support step (n)" citations: 30 → 30;
* **0 do not resolve.**

One site the script cannot parse, V07 l. 1612 ("(their worked examples §2.7's crossing table)"), is untouched by this round. It
resolves, as assemble-r7v and assemble-r7w read it.

### 4.5 Part H's ruled texts, installed (`partH.py`, `partH.json`; ROUND-7 NOTES (9) (b), (f))

`partH.py` reads adjudication-r7x's Part H unit by unit and checks each ruled text in the installed file of its unit (lines read
joined; an elided "…" text checked by its segments):
* **99 "old" → "new" pairs:** model 35, pipeline 20, determinism 6, scope 14, V04 1, V06 11, V07 5, V09 6, V11 1. **Every new text
  stands.** Every old text is gone, save two whose old text is the head of its own new text (D4's "or a carried way given no
  lawful gate and no re-route" inside "or an arterial or a carried way …"; V7-1's "of the palisade's run beneath the
  carried-down deck" inside its extension).
* **8 insertions read by pattern** ("after "…" insert / add "…"", "before "…" insert "…""): determinism 1 (D5), scope 4 (S6 items 1,
  2, 3, 5), V09 2 (V9-2's line and source cells), V11 1 (row 80). **Each stands, joined to its anchor text.**
* **1 insertion checked by hand:** S6 item 4 (its anchor quoted after "the table-edit variant's"), present once in T110-2 (4).

So every FIX, END, END-L and CLASS line of this pass stands in its unit, and each two-ended fix has both ends in.

### 4.6 This round's cross-unit anchors (`endrefs.py`, `endrefs.json`; ROUND-7 NOTES (9) (b))

Part H's END lines put one fix's two ends in two units' files. The resolver reads section numbers, so `endrefs.py` checks the
named things those citations point at. **57 anchors**, each defined at its home in the installed set (untouched → installed
citations in brackets):

* **Defined new this round, both ends now in:**
  * law 3's sentence (END-L3): "A line's part inside a strip that crosses no deck line there leaves it on the side it entered
    from." (0 → 1; the old "goes to the strip's edge on the side it entered from" stands nowhere in the set);
  * V09 §4.9's `bend.raised.wall` line form "{way} keeps clear of {wall}, {m} m off your line." (V9-2);
  * T110-2 (4)'s hand `convert` `gateToJunction` (W6) and `absorbWall` (W8) runs (S8), which M11's "T110-2 (4) (H)" names (3 →
    5);
  * T-V7-48's decay clause beneath the declared viaduct (V7-1), which M11's W5·C2 names (41 → 43);
  * §4.8 *The harbour mouth*'s chain "at the nearest heads or shore points along the entrance whose gate and towers §2.7's laws
    admit, else not laid, reported" (P4).
* **Defined before and after, cited more:**
  * §4.4 S5a *Trace* (2) (12 → 16), the pull's search band (5 → 10), §4.4 S5a *Outer moats* (5 → 6), §4.2 S3 (7) (30 → 32);
  * *Where the line crosses* (1 → 6), **Line and band** (1 → 3), these laws' *ends* (0 → 5), ***beneath*** (123 → 126), the
    fixed-place sentence (26 → 28), the bent-group sentence (20 → 21);
  * F-WALL's raised-way rung (5 → 10), F-ROUTE (34 → 35), F-REDERIVE (30 → 31), F-V-RAISED (11 → 12), `W_RAISED_MEETING` (9 →
    10), `walls.waited` (15 → 19);
  * V06 §3.7.1 (18 → 19), V06 §3.7.6 (5) (6 → 8), "V06 §3.1, V06 §3.2, V06 §3.7.5" (0 → 2);
  * `bend.wall.raisedCrossing` (26 → 27), `refuse.raised.meeting` (31 → 33), §7.3 (b) 3 (17 → 18), `setAttr(castle, …site…)` (5 →
    6), `wall.barrierReachM` (18 → 19), `gateToJunction` (14 → 15), `absorbWall` (36 → 37);
  * §8.11's T-ER-12 (1 → 2), T110-2 (127 → 130), V07 §3.5a (3) (14 → 15);
  * EVO_FORT (18 → 20), J-V11.109 (4 → 5), `structure.stripMarginM` (20 → 22), `structure.span.deckDepthCm` (6 → 7).
* **Defined, citations unchanged:** §4.3 *Where it may not go*, §4.2 S3 (9) (a), V06 §3.7.4 (2)'s cost field, V06 §3.17 (3), V06
  §3.19 (5), ***over the band***, §2.7 *At the frame*, `raised.waited`, §7.1 *Raised ways, aqueducts and retaining walls*,
  `bend.wall.aqueductArch`, `bend.raised.underSpan`, §7.3's S7 operator row, T-V6-73, T-V6-47, T-V4-63, T-V9-52, V09 §4.20.6 (2),
  §2.7's support step (6).

**0 anchors are undefined at their homes.**

## 5. Document checks (three-copy method, one corpus snapshot)

**The command.** `python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with
`docs/validation/doc-checks-allow.tsv`, run by `checks.py` on three copies against one corpus snapshot:
* **untouched** — the live base before this round, sha256 `561d5541…`;
* **new** — the blocks applied, `03573b4f…`;
* **combined** — the installed text, `03573b4f…`. This round it equals *new*: the assembler changed nothing after the blocks.

**Two key sets:**
* (a) the 34 top-level heading keys `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.7,PART III,Delegated
  decisions,Judgment calls,Staged,Appendix A`. This is the brief's command. The parent keys span their children, so their C3 and C4
  hits count twice.
* (b) the eight `#` keys, which partition the document.

The corpus fingerprint (path, size and mtime of the 128 files doc_checks reads) is equal before and after every run
(`b2f7e5c5fd256d59…`).

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon,
research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds
the corpus before any freeze". Every count below is PROVISIONAL (ROUND-7 NOTES (6)).

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 1 / 0 | 3438 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1775 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |
| new = combined (a) | first | 5 / 0 | 1 / 0 | 3448 / 32 | 12 / 0 | 0 / 0 | 317 / 0 | 1 |
| new = combined (b) | first | 5 / 0 | 1 / 0 | 1780 / 16 | 6 / 0 | 0 / 0 | 317 / 0 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3438 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1775 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |
| **new = combined** (a) | final | 5 / 0 | 1 / 0 | 3448 / 0 | 12 / 0 | 0 / 0 | 317 / 0 | **0** |
| **new = combined** (b) | final | 5 / 0 | 1 / 0 | 1780 / 0 | 6 / 0 | 0 / 0 | 317 / 0 | **0** |

(hits / unreviewed.)

**The final result.** The installed document's final run exits 0 on both key sets. Its total over the 34 keys is **3 783 hits** (C1
5, C2 1, C3 3 448, C4 12, S1 0, S2 317), 0 unreviewed.
* The untouched copy is round 7w's clean state: exit 0, with counts equal to assemble-r7w's combined run.
* S2 gains 3 hits, all reviewed: two more "§2.10" (D5's and P4's "V06 §2.10") and one more "§3.13" (P4's "V07 §3.13"),
  volume pointers whose texts already have rows.

**Corrected by hand: none.** There was no S1 table fault, and no G-cite fix this round.

**The unreviewed hits, attributed.** The (b) set has 11 distinct C3 runs (16 sites). `attrib.py` attributed each
(`c3-attribution.tsv`), `c3runs.py` located each as a run by line in both copies (`c3runs.json`), and `hitctx.py` recovered its text
at every site (`hitctx.tsv`). This seat read each in context. Every one is:
* new text of a repair block, every site on a line this round's blocks changed;
* no run of the untouched base. Two runs' words stand in the untouched copy only inside a longer run that already has a row: "law 1
  2 4 6" inside "band law 1 2 4 6" (l. 3011, unchanged), and "it is placed along the" inside "clear it is placed along the" (the
  run M1's edit ends);
* a run of the design's own numbered law or section pointers, or plain English, free of any list, table, grammar, palette or
  identifier;
* held whole by no corpus file.
They are false positives.

**The rows** (`allowrows.py`, one block `# block: coherence/assemble-r7x`):

| run | installed sites | proposed by | text |
|---|---|---|---|
| "law 1 2 6 9" | l. 3082 (§2.7, model M4), 6500 (§4.3, P3), 6599 (§4.4, P1), 11150, 11339 (§7.1, D3, D1) | determinism, pipeline | F1/F4's "law 1 (2)–(6), (9)–(11)" |
| "3 7 1 2 7" | l. 9852 (§5.2) | determinism | D5's "V06 §3.7.1; §2.7's laws, law 2 (c)" |
| "route and the same on a" | l. 19333 (§13.2) | scope | S6 item 1 |
| "through it and the stage" | l. 19370 (§13.2) | scope | S6 item 2 |
| "a run of the hand" | l. 19418 (§13.2) | scope | S1 |
| "law 1 2 4 6" | l. 19484, 19578 (§13.2) | scope | S9 (e), (f)'s "law 1 (2), (4)–(6)" |
| "one at a point of" | l. 19591 (§13.2) | scope | S6 item 5 |
| "5 is a gate and" | l. 2916 (§2.7) | the assembler's review | M10, row (d)'s gates cell: "(law 1 (1), (4), (5)) is a gate and one of `c` …" |
| "is moved to the nearest" | l. 2978 (§2.7) | the assembler's review | the model's sweep X2 (F2): "a stroke across the strip of such a span is moved to the nearest place these laws admit it" |
| "it is placed along the" | l. 3023 (§2.7) | the assembler's review | M1: "where law 1 (5) bars it is placed along the trace at the nearest lawful point" |
| "law 1 2 where the" | l. 3272 (§2.7) | the assembler's review | M9: "(law 1 (2); *Where the line crosses*)" |

**Reviewed allow rows: 11** (7 proposed, 4 the assembler's review of the model's runs; the model's header records no
document-check run and proposes no row).
* **Append only.** The script ran only after checking that the allow file's sha256 still equalled HEAD's.
* It stops unless every attributed hit is covered by exactly one rule, every site is new text, and no untouched run equals the hit.
* The allow file goes from 2 419 to 2 431 lines (a header and 11 rows), sha256 `bc418ce0…` → `7e8ad91c…`. Its first 2 419 lines are
  byte-identical to HEAD.

**Allow rows made stale by this round: 9, listed, not dropped.** The brief allows dropping rows that point at text this pass removed,
"with a note". `staleallow.py` finds nine C3 rows that matched the untouched set and match nothing in the installed set, each
pointing at a restatement this round replaced by a citation:
* l. 2353 "1 4 is a gate and", l. 2354 "1 5 6 4 3", l. 2369 "clear it is placed along the", l. 2382 "law 1 2 4 of", l. 2403 "the
  gate and the wall and", l. 2404 "the gate and the wall and the way" (assemble-r7's reviews of §2.7's worked examples);
* l. 2383 "law 1 2 5 6" (assemble-r7's, base and V09), l. 2389 "moved to the edge a" (assemble-r7's, determinism), l. 2419 "law 1 2
  5 6 10" (assemble-r7w's, §7.1 *Raised ways*, which D3 rewrote; the determinism header names it).
They stay: the shared file is append-only for this seat (ORCHESTRATION NOTES), and the close may drop them with the earlier
assemblers' listed rows.

**Volume information runs** (`volchecks.sh`, `volsummary.py`, recorded in `volchecks-final.txt`). Each volume and INDEX was run as a
whole document, untouched against installed, with `--heads` the matching base. Volume runs carry hundreds of unreviewed runs from
before this pass, so they are not held to exit 0, as in rounds 0–7w.
* **The installed volumes add 5 new distinct unreviewed pairs and drop 1:**
  * V06 + "3 7 6 5 3 7 2 the" (V6-2 (2)'s "V06 §3.7.6 (5))." running into "**3.7.2 The"), as its header records; V06's three
    "law 1 2 6 9" hits are covered by the base row;
  * V09 + "along a wall or an" (V9-2's `bend.raised.wall` form, "(along a wall, or an end under …)");
  * V11 + "1 4 6 7 3", "3 5 2 s f" and "3 7 6 5 the" (V11-1's row 80 citations: "law 1 (4)–(6); §7.3 (b) 3, §5.2's F-REDERIVE"
    and "EVO_FORT (V06 §3.7.6 (5): the …");
  * V07 − "1 5 and 0 on a" (gone with V7-3's gate clause), as its header records.
* V01, V02, V03, V04, V05, V08, V10, V12 and INDEX: 0 new and 0 gone. This matches the V04 header.
* No volume seat proposed a row in the allow file's tab form, so none is appended. The five pairs are listed for those volumes'
  seats or the close.

**The rationale** (information; not held to exit 0) is unchanged this round. It was run once, with `--heads` the installed base: C3
493 / 320 unreviewed and S2 17 / 15, equal to assemble-r7w's.

## 6. Bundle

Before the run, `--check` reported the bundle STALE. `python3 tools/bundle_architecture.py` then wrote `docs/ARCHITECTURE-FULL.md`:
* 72 911 lines reported from 14 sources;
* 10 183 687 → 10 185 553 bytes;
* sha256 `2c0068b41d8a21d3…` → `e0175f7592fcd615da1121ef8c1975934cc1bfcc4b92af705b2ab20328af4318`.

`--check` now reports it UP TO DATE (exit 0). No live file changed after it.

## 7. Review ids and review markers in design text (ROUND-7 NOTES (9) (c), (e))

**Method.** `reviewids.py` counts citations of review-process ids in the live base, volumes and INDEX:
* the rulings `R<n>-nn` (R7-01 among them);
* every issue, conflict, wiring, inventory or probe id the coherence pass's own records define: 9 243 tokens, 233 of them `PRB…` ids.
  The records are `verify-*.md`, `adjudication-r*.md` (adjudication-r7x's among them), `famverify-*.md` (the `VF7w-…` ids),
  `inventory-*.md`, `probe-r*.md`, canon, agreement, edges and wiring;
* less any token the design itself defines, and the design id families.

A citation counts only outside the decision and request records:
* in the base, *Delegated decisions* and *Judgment calls*;
* in the volumes, §9 Decisions, §10 Base change requests, §13 Fix list and Integration notes;
* anywhere, a J-, BCR-, X- or CVR- row.

**Separate counts for (9) (e)**, each over the whole set, records included:
* every `PRB…` token; every "(amended, …)" marker; every parenthetical opening with a J144–J151 id;
* every END-line id (`E-M2`, `E-S0`, `E-V6-20` …);
* the narration forms of rounds 7v–7x ("adjudication-r7x", "r7x", "fix pass", "root cause", "class sweep", `END-L`n, `VF7w-…`,
  `VPC-r6-…`, `R7-01`);
* Part H's line ids `Vn-m` (`V6-7`, `V9-1`, `V11-1` …);
* per token, the short ids that collide with design ids — adjudication-r7x's M1–M12, P1–P9, D1–D6, S1–S9, the seats' sweep ids X1,
  X2, SW1–SW5, W1–W6, and the forms F1–F5 — untouched against installed, every growth read in context.

The census is read-only: nothing was edited, and the verifiers raise any site.

**Results** (untouched → installed):
* **Design-text sites of review ids: 0 → 0.**
* **`PRB…` ids: 0 → 0.** "(amended, …)" markers: 0 → 0.
* **END-line ids: 2 → 2.** Both are V09 l. 4629's "(Part II, E-S33, E-S34)", design ids of Part II that stood before.
* **Narration forms: 0 new.** The "pass n / round n / Part H / root cause …" list is 104 → 104, the same texts, unchanged but for
  line numbers: the design's own "field pass 1 / 2" and way-drawing passes, plus one record site, V09's BCR row.
* **Part H line ids: 1 → 1**, unchanged: V10 l. 1745 "V10-15", a site no block of this round touches.
* **Short ids: 4 873 → 4 883 tokens; the ten new are design ids**, each read: the stages S1 (V11 row 80, W50: +3), S3 (+3) and S4
  (+2: "a second S4 viaduct", "S4's router", "an S4 route", "S4's commit"), and the crossing table's rows W2 (§4.11, §7.1's row:
  +1) and W6 ("(W6)", S8's run: +1). No form id F1–F5 and no seat's sweep id stands in design text.
* **Inside the records, 25 citations stand**, kept as records and unchanged: V03 9, V09 15, V10 1.
* **Change markers: 0.** The installed text carries the same nine parentheticals opening with a J144–J150 id as before, only renumbered
  by the round's lines. Each cites an owner decision as the source of the rule beside it, the form the base already uses for its J
  rows. No block adds or edits one. All nine are listed for the verifiers:
  * base l. 2579, the laws' head: "normative (J146)";
  * base l. 2653, *Held*: "Held is locked, on the axis named, and nothing else (J147)" — bare in form;
  * base l. 2655, *held in placement*: "its shape still changing at a meeting (J144)";
  * base l. 2706, law 1 (2): "nothing of either record written (J149)" — bare in form;
  * base l. 2740, law 1 (10): "a placement-held thing's shape alone (J144)";
  * base l. 2743, law 1 (10): "a gate made in it (J147, J150)";
  * base l. 19277, §13.2's T110-2: "(J147, J150), on a second run shape-locked";
  * base l. 19665, §13.2's T110-4: "nothing held because it was drawn or declared (J147)";
  * V07 l. 2313, §3.11: "its gates kept — never moved for a meeting (J148)".
  Every J144–J151 mention in the set is listed in `reviewids-final.json` (24: base 20, V06 1, V07 2, V11 1, as before).

Full lists: `reviewids-final.tsv`, `.json` and `.out`; `reviewids-untouched.tsv`, `.json` and `.out`.

## 8. Not placed, and left for the verifier

* **Unplaced: none.** Every block of the nine files is applied. There is no RULING REQUEST, no ASSEMBLE NOTE, no swap and no double
  REPLACE, so there is no merge conflict and no lost hunk. No block targeted a missing or retitled heading.
* **Broken references: 0** (section 4). Every §2.7 table name; every law, clause and term citation of §2.7's laws; every
  worked-example and support-step citation; every ruled text of Part H; and all 57 cross-unit anchors resolve.
* **Mechanical fixes: none** (section 4.1).
* **97 ambiguous-form references** (section 4.1, `ambiguous-refs.tsv`; 2 gone, 1 new: V11 l. 1006's "§2.7's laws" after "V06
  §3.7.6 (5)", the base's laws as S7 reads it). They read as the base's under S7; the verifier confirms each or prefixes it.
* **Determinism's observations for the adjudicator** (its header): three citations narrower than the forms, not written because the
  seat was scoped to its ruled lines — §7.3 (b) 3's two "law 2 (a)" (installed l. 11692–11693, 11701: "the raised way met by §2.7's
  laws, law 2 (a)", "which a re-traced run meets by §2.7's laws, law 2 (a)"), and §7.1's last outcome row's "(§2.7's laws, law 1
  (2), (5))" (installed l. 11342) for an aqueduct drawn across a standing wall. Each a minor at most, its seat says.
* **V09's observations for the next family check** (its header): three clauses of T-V9-52's viaduct fixture — (a) a gate slid "to
  the strip's edge its grip came from", (b) a wall drawn along beneath "moves to the strip's edge with the line's keep-clear form",
  (c) a dropped gate "moves along the trace clear of it". (a) and (b) name the place END-L3 now takes out of law 3.
* **A sibling of (b) in the base**, read and kept by scope's sweep: T110-2 (4)'s along-beneath parts "moved to the strip's edge on
  its entry side, its band outside the under-deck strip" (installed l. 19462–19463), which scope reads as law 3's side with law 1
  (4)'s band outside the strip. Listed beside V09's (b) for the verifier.
* **One form difference, not new:** scope's S6 writes the hand castle siting `setAttr(castle, 'site')`; §2.7's fixed-place sentence
  writes `setAttr(castle, 'site' | 'baileyArea')` and §7.4's edit table `setAttr(castle, site)`. The same edit, quoted two ways
  before this round.
* **The support step (6)'s old term "held"** still stands at one site, §7.4's raised-way row (installed l. 12129): "its deck and
  piers held, as every raised way is from its creation". Assemble-r7v listed it as kept until round 8; no block of this round
  touches it.
* **Owner-decision citations of a rule's source:** nine parentheticals, unchanged (section 7). Review ids, PRB ids, narration and
  change markers in design text: 0.
* **Hand-offs recorded in the repair files' headers** (section 2.5) are not assembly work. Each "both ends" claim is installed.
* **Volume document checks:** 5 new volume hits without a row in the allow file (V06 1, V09 1, V11 3; section 5,
  `volchecks-final.txt`), for those volumes' seats or the close.
* **Allow rows made stale by this round: 9** (section 5), listed, not dropped.
* **The document checks are provisional** (section 5). Re-run them on the machine that holds the reference corpus. Seven of the
  eleven base rows were proposed by the seats that wrote the text; four are this seat's review of the model's runs.
* **Size:** the set is at +11.55 % words against the pre-coherence archive, outside the shrink band (section 3). Each repair file
  states what holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):**
* the 15 live files' sha256:
  * before: each equal to its HEAD blob at `e75baf6`;
  * after: each equal to its final copy, re-checked after the checks and the bundle;
* the nine repair files landed and committed;
* the routing of 25 blocks and the census: 0 missing, 0 ambiguous, 0 unclosed, 0 RULING REQUEST, 0 overlap, 0 double REPLACE, 0
  retitle;
* the model's block applied first;
* 25 applied, with audit not-OK 0 and balanced fences in every file;
* the volume outputs against their seats' records:
  * V06 and V11 equal to their recorded sha256;
  * V04 and V07 equal in bytes, lines and touched lines;
  * V09 equal in its counts, lines and per-section words;
* the four base seats' stand-alone runs reproduced (scope by sha256 prefix too), their diffs disjoint, their union the combined
  diff, the line and byte growths summing;
* no heading added, removed or retitled;
* the reference counts of section 4: 0 broken, 0 FIX, every §2.7 law, clause, term, table, worked-example and support-step citation
  resolving, every Part H ruled text installed, and 57 cross-unit anchors defined;
* every hand-off's two ends present in the installed text;
* the document checks' counts of section 5, the installed copy exiting 0 on both key sets against one corpus snapshot;
* the allow file appended only; the nine rows this round made stale listed;
* the bundle regenerated and `--check` clean;
* the sizes of section 3 and no duplicate id definition;
* the review-id and marker census of section 7.

**PLAUSIBLE:**
* **That the 11 reviewed rows are false positives.** Each was attributed and located by script and read in context by this seat;
  seven were proposed by the seats that wrote the text.
* **That V04's, V07's and V09's outputs equal their seats' generators.** Those seats record counts or lines but no hash, and every
  count matches.
* **That the ambiguous-form references read as their authors meant.** S7 reads them as the base's. The new one was checked by
  reading, the rest not one by one.
* **That `lawrefs.py`, `examples.py`, `partH.py` and `endrefs.py` catch every citation of §2.7's laws, its worked examples, this
  pass's ruled texts and its anchors.** They read:
  * a "law n" or "laws n–m", with the clause list right after it;
  * a law-2 head right after "law 2", and a term after "laws'";
  * the text after "its / their worked example(s)" up to the next ";" or unbalanced ")";
  * "support step (n)";
  * Part H's quoted texts of the two forms named in section 4.5 (one more checked by hand);
  * the 57 anchors by the forms listed in the script.
  A citation in another form is not checked.
* **That the review-id census's token set is complete.** It reads:
  * the ids the coherence records define as headings, first table cells or bold labels;
  * the `R<n>-nn` rulings;
  * every `PRB…` token, every "(amended, …)" and J144–J151 parenthetical, every END-line id, the narration forms and the short
    ids named in section 7.
  An id cited only in running text of a record would be missed.
