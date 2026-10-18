# Assemble — coherence pass, round 7 fourth fix pass (the eight repair-r7y block files applied to the base and the volumes)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r7y (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r7y`, 2026-10-02, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at 393c356; base `03573b4f…` as assemble-r7x installed
  it); untouched snapshot — done
- P2 block inventory and routing (8 files, 27 REPLACE: base 13, volumes 14; 0 missing, 0 ambiguous, 0 unclosed, 0 overlap,
  0 double REPLACE, 0 RULING REQUEST; the model's block first); ASSEMBLE NOTES census (none) — done
- P3 apply (27 applied, audit not-OK 0; the four base seats' stand-alone runs reproduced, disjoint, their union the combined
  diff; the four volume outputs equal their seats' records), headings unchanged, install (5 of 15 changed) — done
- P4 references: 57 528 checked, 0 broken, 0 mechanical fix, 97 ambiguous-form (unchanged); §2.7's laws, its tables, the
  worked-example and support-step citations, the new F6 and F3 citing forms, Part H's 88 ruled texts, the seats' 7 sweep
  edits and 77 cross-unit anchors all resolve — done
- P5 document checks, three-copy method: 2 allow rows (both proposed by repair-r7y-pipeline); the installed copy exits 0 on
  both key sets (PROVISIONAL: corpus incomplete); 1 allow row now stale, listed; volume information runs — done
- P6 bundle and `--check` — done
- P7 review-id and marker census (ROUND-7 NOTES (9) (c), (e)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r7y/`. Most are assemble-r7x's
scripts with the round label and the scratch folder (`scratchpad/coherence/asm7y/`) changed: `snapshot.py`, `route.py`,
`apply.py` (which runs `docs/validation/amendments-b/apply-blocks.py` unchanged), `headings.py`, `mkfinal.py`, `install.py`,
`mirror.sh` with `refs.py`, `refsreport.py` and `ambdiff.py`, `lawrefs.py`, `tablerefs.py`, `examples.py`, `checks.py`,
`attrib.py`, `c3runs.py`, `hitctx.py`, `staleallow.py`, `volchecks.sh` with `volsummary.py`, `sizes.py`, `unitsizes.py`,
`after.py`.

These are this round's own or changed:
* `alone.py`, `volrec.py`: their records are this round's four base headers and four volume headers (sections 2.1, 2.2).
  `volrec.py` runs `wc -w` in the POSIX locale, as the seats did (Python's coerced `C.UTF-8` counts a lone "—" as a word).
* `partH.py`: adjudication-r7y's Part H, this round's eight units (section 4.5).
* `partH-hand.py` (new): the three Part H insertions `partH.py`'s pattern cannot cut, each cut from the adjudication by its
  exact delimiters and checked joined to its anchor (section 4.5).
* `sweeps.py` (new): the seats' own class (A) sweep edits outside Part H — model X1–X5, pipeline SW1, V07's F-V-RAISED
  detection (section 4.5).
* `f6refs.py` (new): the citing forms adjudication-r7y adds, F6 ("law 1, read with its terms; chiefly …") and F3 ("law 2,
  in its order"), each pointer checked against the installed laws (section 4.2).
* `endrefs.py`: this round's 77 cross-unit anchors (section 4.6).
* `allowrows.py`: this round's two rows, the same two rules.
* `reviewids.py`: it also counts the round-7y narration forms ("adjudication-r7y", "r7y", `VF7x-…`, "class (A) / (B)",
  "form F1–F6") and, per token, the short Part H ids M1–M10, P1–P14, D1–D10, S1–S5, the sweep ids X1–X5, SW1 and class (B)'s
  B1–B17.

No live text was edited by hand, and the assembler changed nothing after the blocks. Each script's records sit beside it:
* routing and application: `snapshot.json`, `blocks.json`, `split/`, `logs/`, `apply.json`, `alone.json`, `volrec.json`,
  `headings.json`, `install.json`, `after.json`;
* references: `refs-before.out`, `refs-first.out` (= `refs-final.out`), `refs-summary.json`, `ambiguous-refs.tsv`,
  `ambiguous-diff.txt`, `external-refs.tsv`;
* the laws, tables, examples, citing forms, ruled texts and anchors: `lawrefs-*`, `tablerefs-*`, `examples-*`, `f6refs-*`,
  `partH.json`, `partH.out`, `partH-hand.json`, `sweeps.json`, `endrefs.out`, `endrefs.json`;
* document checks: `checks-first.json`, `checks.json`, `c3-attribution-first.tsv`, `c3-attribution.tsv`, `c3runs.json`,
  `hitctx.tsv`, `staleallow.json`, `volchecks-final.txt`;
* sizes and census: `sizes.json`, `unitsizes.json`, `reviewids-untouched.*`, `reviewids-final.*`.

## Outcome

**All eight repair files had LANDED before this seat started** (ROUND-7 NOTES (9) (d)). Each has a
`coherence/repair-<unit>-r7y LANDED` line in the lane log and its result in `results/coherence_repair-<unit>-r7y.json`, and all
eight are committed (HEAD `393c356`). Kernel, rendering, V01, V02, V03, V04, V08, V10, V11 and V12 had nothing to repair this
pass, so they have no file.

**Blocks: 27 found, 27 applied, 0 skipped.**
* All 27 are REPLACE blocks: 13 for the base, 14 for four volumes. There is no J-ROWS, RATIONALE-A or RULING REQUEST block.
* No heading was missing or ambiguous, and no block was truncated.
* No two blocks touch one subsection: no double REPLACE, no nesting, so no three-way merge and no retitle.
* The audit finds every applied body exactly once, and the fences are balanced in every file.
* Every volume output equals its repair seat's recorded dry run: V05 and V06 by sha256; V07 by sha256 prefix, bytes, lines,
  touched lines and its `wc -w`; V09 by lines, per-section words and its `wc -w`.
* Each of the four base seats' recorded stand-alone dry runs is reproduced (scope by sha256 prefix as well). Their diffs are
  pairwise disjoint, and their union is the combined run's diff.

**The model's block was applied first** (ROUND-7 NOTES (9) (e)). This round the model writes §2.7 alone (one REPLACE: 18
count-asserted substitutions, M1–M10 and its sweep's X1–X5, every one inside the support step (6)'s worked examples and its
(7)); the laws keep their words. After all eight files were in, every citation of "§2.7's laws" by law, clause or term was
checked against what the installed laws define, and so was every table, worked-example and support-step citation, and every
pointer of the new F6 and F3 forms. **All resolve.** Every ruled text of adjudication-r7y's Part H stands in its unit (section
4.5), and the 77 cross-unit anchors this round's FIX, END and CLASS lines name are each defined at their homes (section 4.6).

**ASSEMBLE NOTES and swaps: none** (section 2.5). No header carries an ASSEMBLE NOTE, a swap or a restated row. Pipeline proposed
two allow rows; both were reviewed and written. No other seat proposed one, and no hit needed the assembler's own review.

**Nothing is unplaced.** The round adds, removes and retitles no heading.

**Size.** The set (base and volumes) goes from 9 902.4 KB to 9 914.0 KB (+2 081 words, +0.13 %):
* the base grows by 1 530 words: model +120, determinism +158, pipeline +560, scope +692;
* the volumes grow by 551 words: V05 +43, V06 +117, V07 +153, V09 +238.
Every word changed is ruled FIX, END or CLASS text, or a seat's class (A) sweep conformation in form F6, F1 or F3.

**References.**
* 57 528 references are checked. **None is broken**, before or after.
* **No mechanical fix was needed**: the resolver finds no FIX-class reference. So the installed base is the blocks' output.
* 97 references resolve but are ambiguous in form, the same 97 sites as before (matched by text).

**Document checks.** The installed document exits 0 over every top-level key and over the eight `#` keys, against one corpus
snapshot.
* This needed 2 reviewed allow rows, both proposed by repair-r7y-pipeline.
* The result is **provisional**, because the reference corpus is incomplete in this checkout.
* The installed document's total is **3 794 hits** (C1 5, C2 1, C3 3 458, C4 12, S1 0, S2 318), 0 unreviewed.

**Bundle.** `docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes.

**Review ids and review markers in design text** (ROUND-7 NOTES (9) (c), (e)):
* **0** review-id sites outside the decision and request records (0 before);
* **0** `PRB7…` ids, **0** "(amended, …)" markers and **0** change markers in the base, the volumes and INDEX;
* **0** round-7y narration forms added (the "pass n / round n / Part H / class (A) / form Fn …" list is 104 → 104, unchanged);
* **one new owner-id parenthetical**, "(J147, J150)" in T110-2 (2), scope S2 (1)'s ruled words "from the milestone that carries
  the shape lock (J147, J150)". It cites the rule's source in the form T110-4 (c) already uses (section 7).

## 1. Live files — sha256 before and after

**Before:** the committed text at HEAD `393c3568cd7b`. Each live file equalled its HEAD blob. These are assemble-r7x's outputs:
* the base is `03573b4f209a0cef…`, ROUND-7 NOTES (4)'s merge base;
* every repair file was written against them.

**After:**
* `install.py` wrote the blocks' outputs, only after confirming each live file still held its P1 sha256. It verified each written
  file byte-identical to its final copy.
* No later step changed a live design file. After P5–P7, `after.py` re-checked every live file equal to its final copy.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 3 209 864 | 3 218 661 | `03573b4f209a0cef3024adaa2ec10f431b9c6f96ab22aaaae0899aee8de075af` | `c13613c5771a99e583726d3258b55700eb68afd793e0933a7aaa0f162e6d147d` |
| `docs/ARCHITECTURE-RATIONALE.md` | 704 813 | 704 813 | `7e172500f6a791c5cf1e667c657309b6a49ee067dc130a05d82e605a06579c39` | unchanged (no block) |
| `docs/volumes/V01-neighbourhoods.md` | 529 232 | 529 232 | `5c0ea6757d0cb7cc3a866131961f817cb031919d1276b0dc33def3e95c3b9b1a` | unchanged (no block) |
| `docs/volumes/V02-buildings.md` | 565 121 | 565 121 | `c7fbb7055d776409fe0f906059fcf943198ecb81de065054674be4859cef4540` | unchanged (no block) |
| `docs/volumes/V03-interiors.md` | 467 810 | 467 810 | `894955c29098f435f9f483c2c0991fe7ebfc79b19d4dd0e0a2c078e676266792` | unchanged (no block) |
| `docs/volumes/V04-underground.md` | 536 518 | 536 518 | `4dfe36fb01108f2bbf0430e24f4cacc72bad52bf7db1d9f2708083861ce7680e` | unchanged (no block) |
| `docs/volumes/V05-sky.md` | 404 696 | 404 941 | `1931fec160a4b146d1778deac28413dc329bae2868d8542f4967116a695e671f` | `4517619dfe10fe5c5273e800e65eb09c331a9332397aea355a45bea55defe940` |
| `docs/volumes/V06-evolution.md` | 710 168 | 710 864 | `58f0fb64092942c2a93f9881486ea67e9640d6e4fab76b101b5ca9ef8872baeb` | `72fe7007503922403f6e2b7185016ed4deb532fb42e3098cdd123c1c3e1a10b6` |
| `docs/volumes/V07-village.md` | 622 038 | 622 965 | `6202d46df5b3eabf034ec388adbdb11e83d0295b4b80e0901031d309cbacf5ba` | `a93d1f64212153ee5c594762050286b2624bba4e408d9c599257630ce3a198c7` |
| `docs/volumes/V08-settlementforge.md` | 582 193 | 582 193 | `83382cac1e496ffb29d7ca1d9ea1ed3c7b37978ddedd915ee50f73c89ca1b491` | unchanged (no block) |
| `docs/volumes/V09-application.md` | 779 775 | 781 054 | `da502c0a32e9ad7dba2a694b05967adf830bba30035ce450db13688a2ec02f62` | `1394a5ee0e0e25cbdf5c884ebc0052f84d5a4c56df5718d84319bb669358dfd0` |
| `docs/volumes/V10-clerk.md` | 524 582 | 524 582 | `cb4d9cffb49f1bc3cb489a515a316f2e7046f6c44a4116cd895d891022762bc0` | unchanged (no block) |
| `docs/volumes/V11-content.md` | 681 994 | 681 994 | `da9be47c3f14fd2f8cb3146549cea1c6a45c4d7a1a6099ba5508dbda3d79d080` | unchanged (no block) |
| `docs/volumes/V12-calibration.md` | 526 016 | 526 016 | `3f20cb1fbf132b75ffdbd881b97084797c8203a63355587d1de977315f792b89` | unchanged (no block) |
| `docs/volumes/INDEX.md` | 24 074 | 24 074 | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` | unchanged (no block routes to it) |

Also written:
* `docs/ARCHITECTURE-FULL.md`, the bundle (section 6);
* `docs/validation/doc-checks-allow.tsv`, one appended block (section 5).

## 2. Blocks — routing, application, audit

**The block files** are exactly `docs/validation/coherence/repair-r7y-<unit>.md` for the eight units (ROUND-7 NOTES (1)): model,
pipeline, determinism, scope, V05, V06, V07 and V09. `blocks.json` records each one's sha256 as read. Everything under `work/`
and the bench files is the repair seats' working material, never blocks.

**Routing** (`route.py`):
* Each file was cut at its `=== FILE <path> ===` lines. Every block went to the file its nearest FILE line above names, or the base
  when there is none (ROUND-7 NOTES (3)).
* Each volume file has one FILE line naming its own volume, and the four base files have none. No file carries blocks for more
  than one document, and none routes to INDEX.md or the rationale.
* **Order:** each split file keeps its repair file's basename behind an order prefix: `a-` for `repair-r7y-model.md`, `b-` for
  every other. `apply-blocks.py` applies its files in name order, so the base run applies the model's §2.7 block first, then
  determinism's, pipeline's and scope's (ROUND-7 NOTES (9) (e)). The base log's first audit entry is the model's block, and the
  base ran before the volumes.
* The FILE lines are left out (they are routing, not blocks); every other line is verbatim.
* Each volume ran with a throwaway rationale whose output equals its input.
* No text follows any file's last END.

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST, and 0
overlaps of any kind. No two blocks of the round, within one unit or across units, cover one subsection or nest. V07's `## 4`
block carries its section whole (`### 4.1`–`### 4.5` verbatim, as its header says), and no other block targets a heading inside
it. Two consequences:
* **No double REPLACE.** The brief's `git merge-file` step had nothing to merge (its merge base: the subsection as assemble-r7x
  installed it, base `03573b4f…`). So there is no conflict and no lost hunk to report (ROUND-7 NOTES (4)).
* **No retitled target.** Every block was found on the text as it stood, and every body opens with its own target heading (ROUND-7
  NOTES (5)).

| unit | blocks found | applied | skipped | target | covers | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|---|
| model | 1 | 1 | 0 | `ARCHITECTURE.md` (applied first) | §2.7 | 31 564 → 31 684 (+0.4 %) | 184.9 → 185.7 |
| determinism | 5 | 5 | 0 | `ARCHITECTURE.md` | §5.2, §5.4, §7.1, §7.3, §7.7 | 43 413 → 43 571 (+0.4 %) | 267.0 → 267.8 |
| pipeline | 5 | 5 | 0 | `ARCHITECTURE.md` | §4.1, §4.2, §4.3, §4.4, §4.8 | 26 677 → 27 237 (+2.1 %) | 157.9 → 160.9 |
| scope | 2 | 2 | 0 | `ARCHITECTURE.md` | §13.2, §13.8 | 32 418 → 33 110 (+2.1 %) | 194.5 → 198.5 |
| V05 | 1 | 1 | 0 | `V05-sky.md` | ## 7 | 8 293 → 8 336 (+0.5 %) | 47.8 → 48.1 |
| V06 | 3 | 3 | 0 | `V06-evolution.md` | §3.7, §3.19, ## 7 | 25 531 → 25 648 (+0.5 %) | 150.0 → 150.7 |
| V07 | 7 | 7 | 0 | `V07-village.md` | §3.5a, §3.11, §3.13, ## 4, §5.1, ## 7, ## Integration notes | 23 732 → 23 885 (+0.6 %) | 138.7 → 139.6 |
| V09 | 3 | 3 | 0 | `V09-application.md` | §4.9, §4.20.2, §7.1 | 26 230 → 26 468 (+0.9 %) | 157.0 → 158.2 |
| **total** | **27** | **27** | **0** | | | | |

"Covered text" compares, for each REPLACE, its target's section in the untouched file with the section of its body's heading in
the installed file.

**Each unit's block count matches its header, its result file and the orchestrator's count of 27:** model 1, pipeline 5,
determinism 5, scope 2, V05 1, V06 3, V07 7, V09 3.

**Each unit's word change matches its header** (whitespace-split unless named):
* model +120 (§2.7 31 564 → 31 684); pipeline +560 (its five subsections 26 677 → 27 237); scope +692 (§13.2 29 386 → 30 073,
  §13.8 3 032 → 3 037);
* determinism +158: its header counts §5–§7 whole (84 024 → 84 182); the five covered subsections change by the same +158;
* V05 +43 (## 7 8 293 → 8 336); V06 +117 (§3.7 3 776 → 3 779, §3.19 6 668 → 6 676, ## 7 15 087 → 15 193);
* V07: its header's "101 097 → 101 249 words (wc -w; +152)" is reproduced exactly by `wc -w` in the POSIX locale; whitespace-split
  the volume is 103 040 → 103 193 (+153);
* V09: its per-section counts are reproduced exactly (§4.9 13 268 → 13 342, §4.20.2 1 340 → 1 443, §7.1 11 622 → 11 683), and
  its volume figure "126,345 to 126,579 (wc)" by POSIX `wc -w`; whitespace-split 128 782 → 129 020 (+238).

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines (balanced) | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 13 | 13 | 0 | 153 → 153 | 140 → 140 | `c13613c5771a99e5` | each seat's stand-alone run reproduced (section 2.1); 24 192 → 24 241 lines; rationale unchanged; no duplicate id |
| `V05-sky.md` | 1 | 1 | 0 | 62 → 62 | 14 → 14 | `4517619dfe10fe5c` | equal: sha256 `4517619dfe10fe5c…`, 404 941 bytes, 3 096 → 3 098 lines; the diff touches exactly l. 2579 (one line become three) |
| `V06-evolution.md` | 3 | 3 | 0 | 65 → 65 | 28 → 28 | `72fe700750392240` | equal: sha256 `72fe7007503922403f6e2b7185016ed4deb532fb42e3098cdd123c1c3e1a10b6`, 710 864 bytes, 4 667 lines, words 116 276 → 116 393 and per section |
| `V07-village.md` | 7 | 7 | 0 | 58 → 58 | 18 → 18 | `a93d1f64212153ee` | equal: sha256 `a93d1f64212153ee…`, 622 965 bytes, 4 124 → 4 132 lines; the diff touches exactly l. 1577–1578, 1616–1621, 2312–2320, 2769, 3026, 3257–3265, 3709, 4122–4124 (each range touched, nothing outside); `wc -w` 101 097 → 101 249 |
| `V09-application.md` | 3 | 3 | 0 | 110 → 110 | 24 → 24 | `1394a5ee0e0e25cb` | equal in its counts (3 / 3 / 0, audit OK, headings and fences unchanged, 5 045 → 5 049 lines), per-section words and `wc -w` (no hash recorded); the diff touches l. 2104–2105, 3018–3035, 4428 |

**Audit, for each run:**
* every applied body is found exactly once in the output (not-OK 0);
* every title block is unchanged by the blocks;
* the PENDING FABLE REVIEW lines are unchanged in every file (base 0 → 0, every other file 1 → 1);
* the applier printed no note: no duplicate id, no retitle, no supersession, no malformed header;
* no `=== ` header line and no "RULING REQUEST" text stands in any installed file.

### 2.1 The base seats' dry runs, reproduced (`alone.py`, `alone.json`)

`alone.py` ran each base seat's split file alone on the untouched base and rationale, and compared the result with the seat's
header:

| seat | alone: found / applied / skipped / audit not-OK | lines | old lines its diff touches | its header's record, reproduced |
|---|---|---|---|---|
| model | 1 / 1 / 0 / 0 | 24 192 → 24 202 | 29 lines, all inside §2.7 (l. 2249–3517): 2914, 2916, 2944, 2991–2992, 3020–3021, 3118–3119, 3123–3124, 3146–3148, 3181–3183, 3272–3273, 3281, 3328–3330, 3338, 3351, 3365–3368 | headings 153 → 153, fences balanced, title block unchanged, rationale unchanged, 24 192 → 24 202 lines, every line outside §2.7 byte-identical |
| determinism | 5 / 5 / 0 / 0 | 24 192 → 24 195 | l. 9851–9852, 9869, 9982, 11145–11148, 11339–11341, 11693–11694, 11701–11702, 12813 | exactly its hunk list (D2; D4, D1; D4; D3; D6 re-wrapped to 6 lines; D8, D9, D10; D5; D7); rationale unchanged |
| pipeline | 5 / 5 / 0 / 0 | 24 192 → 24 192 | l. 5708, 5795, 6222, 6224, 6241, 6248, 6413–6414, 6422, 6500, 6583, 6600, 6603, 6605, 6615, 6636, 6642, 6650, 6718, 8344, 8402 | exactly its 21 lines; 3 209 864 → 3 212 949 bytes; rationale byte-identical |
| scope | 2 / 2 / 0 / 0 | 24 192 → 24 228 | 14 lines in 9 hunks: 8 in §13.2's T110 bullet (l. 19302–19650), 1 in §13.8's T110 row (l. 20507) | 3 209 864 → 3 213 945 bytes, sha256 `e2c6ce59…`, 9 hunks, rationale unchanged |

**All four equal their records.**

**The four diffs are disjoint.** No old line is touched by two seats. The union of the four touched-line sets (80 old lines)
equals the combined run's touched set. The combined base grows by 49 lines, the sum of the four stand-alone growths
(10 + 3 + 0 + 36): 24 192 → 24 241. Its bytes grow by 8 797, the sum of the four (746 + 885 + 3 085 + 4 081).

### 2.2 The volume seats' dry runs, reproduced (`volrec.py`, `volrec.json`)

Each volume output was compared with what its seat's header records:
* V05's sha256 (prefix `4517619dfe10fe5c`), bytes, lines and its one touched line are equal.
* V06's full sha256, bytes, lines and whitespace words are equal, and so are its three section counts.
* V07's sha256 prefix, bytes, lines, the eight touched ranges and its `wc -w` are equal.
* V09's lines, its three section counts and its `wc -w` are equal. Its header records no hash and no line list. Its diff touches
  exactly the lines of its eight edits (l. 2104–2105 in §4.9's two rows, 3018–3035 the reflowed §4.20.2 (4), 4428 T-V9-52).

### 2.3 Headings, RULING REQUEST blocks

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents. Each count is
unchanged: base 153, INDEX 9, V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67.

**RULING REQUEST blocks: 0** (ROUND-7 NOTES (2), (9) (f)):
* each repair header and result file records 0;
* no `=== RULING REQUEST` line stands in any of the eight files.

### 2.4 The model's block applied first, and the other units' citations of the laws

ROUND-7 NOTES (9) (e) names the model's blocks "§2.2, §2.7, §2.8". This round the model writes §2.7 alone, as its header says: 1
REPLACE, the live §2.7 with 18 count-asserted substitutions (M1–M10 and its sweep's X1–X5). Every edit is inside the support
step (6)'s worked examples and its (7); the laws' text is untouched.

It was applied first. Every citation of the laws, their terms, their worked examples and the new F6 and F3 forms was checked after
all eight files were in (section 4).

### 2.5 NOTES FOR ASSEMBLE — the census (ROUND-7 NOTES (9) (a))

I read all eight preambles. I looked for every line that names Assemble or the assembler, a swap, a title block, a restated row, a
J-ROWS or RATIONALE-A row, a proposed allow row, a NOTE or a HAND-OFF.

**No header carries an ASSEMBLE NOTE, a swap instruction or a restated J-ROWS or RATIONALE-A row.**
* Every volume unit records its title block untouched.
* No base unit writes a J-ROWS or RATIONALE-A block.
* So `final/` is `apply.py`'s output (`mkfinal.py`). The rationale, V01, V02, V03, V04, V08, V10, V11, V12 and INDEX.md are
  carried unchanged.

**Two proposed allow rows are addressed to the assembler**, both pipeline's (tab form): "law 1 2 3 7" (P2's citation ending "law
1 (2), (3))." before list item "7.", §4.2 S3 (6)) and "the boundary and the cross" (P1 item 4, §4.2 S3 (7)). Each was reviewed
and written (section 5). Determinism and scope record their document-check runs with no new hit; the model records none.

**The volume headers record their volume doc-check results** and propose no tab-form row: V05, V06 and V07 record no new hit; V09
records no run. As in rounds 0–7x, no row is appended for volume runs (section 5).

**HAND-OFFS in the headers** are for the adjudicator and the next verifiers, not assembly work. They stand in the repair files.
Each "both ends" claim was checked in the installed text (sections 4.5, 4.6). Every two-ended fix has both ends installed:
* **model ↔ scope:** M4's "T110-4 (c) (its shape-locked ring)" in W1·C1's test; S1 writes T110-4 (c)'s third run.
* **model ↔ V07:** M7's W14 event cell "(E: a village epoch; law 2, in its order)"; V7-1 writes V07 §3.11's REPLACEMENT in
  law 2's order, its worked example row W14.
* **model ↔ pipeline:** M5's row (d) cites §4.4 S5a *Trace* (2) and S5b's spawned gate; P4 and P5 write the pin rule and S5b's
  count; P7 writes §4.1's L1 re-lays.
* **model ↔ determinism ↔ V09:** M8 and X1 write row (b)'s gates cell; D10 writes §7.1's `bend.raised.underSpan` cause naming row
  (b); V9-4 writes V09's source cell the same.
* **pipeline ↔ determinism ↔ scope:** P6 (S5d's kept arc), D1 (F-WALL's top-up exception), D2 (F-BUDGET-STAGE's kept arc), S2 (3)
  (the top-up run); P2 (S3 (6)'s cross wall), D3 (§5.4's `W_RAISED_MEETING` list), S2 (1) (the twin-town runs); P8 (the carried
  way's moat deck), S2 (2).
* **pipeline ↔ V07:** P9 (§4.1 *Declarations read ahead*'s refusal) and V7-2 (1)–(4) (V07's refusal rule at its three sites and
  T-V7-48's refused stroke).
* **determinism ↔ V07:** D4 and D9 ("a fixed place with no point in reach that §2.7's laws admit"); V07's sweep site writes
  F-V-RAISED's detection in the same words.
* **determinism ↔ V09:** D6 (§7.1 *Raised ways*' gate in law 2's order) and V9-2 (V09 §4.20.2 (4)); D8 and V9-4's source cell.
* **scope ↔ V06 ↔ V09:** S4 and V6-1 (VF7x-TST-02: T110-2 (1), (3) and T-V6-47, T-V6-48); S5, V6-2 and V9-3 (VF7x-TST-03 (a)–(d)).
* **V05 ↔ model:** V5-1's sentence in T-V5-14; base row W12's C8 cell already names T-V5-14.
* **scope ↔ V06:** S3's §13.8 T110 row cites "V06's E3, which builds `absorbWall`"; V06 ## 8's E3 cell stands.

**One hand-off is not written, by design:** pipeline's note to the model seat on §2.7's worked example *down before the wall*
(installed l. 3035: "at S3 (7) the stage-1 boundary (from S3 (9) on, its trace)"), which P3's §4.3 *Where it may not go* now
extends with "and a merged pair's cross wall … their trace". Pipeline grades the example non-normative and leaves it to the model
seat's next pass; listed in section 8.

ROUND-7 NOTES (9) (b) is met: all eight files were applied before the reference check (section 4).

## 3. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | lines before → after | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|---|
| base | 3 209 864 | 3 218 661 | +0.27 % | 522 396 | 523 926 | +0.29 % | 24 192 → 24 241 | 3134.6 → 3143.2 |
| V01 | 529 232 | 529 232 | 0.0 % | 86 896 | 86 896 | 0.0 % | 3 762 → 3 762 | 516.8 → 516.8 |
| V02 | 565 121 | 565 121 | 0.0 % | 94 571 | 94 571 | 0.0 % | 4 227 → 4 227 | 551.9 → 551.9 |
| V03 | 467 810 | 467 810 | 0.0 % | 79 495 | 79 495 | 0.0 % | 3 304 → 3 304 | 456.8 → 456.8 |
| V04 | 536 518 | 536 518 | 0.0 % | 87 473 | 87 473 | 0.0 % | 3 644 → 3 644 | 523.9 → 523.9 |
| V05 | 404 696 | 404 941 | +0.06 % | 68 398 | 68 441 | +0.06 % | 3 096 → 3 098 | 395.2 → 395.5 |
| V06 | 710 168 | 710 864 | +0.10 % | 116 276 | 116 393 | +0.10 % | 4 666 → 4 667 | 693.5 → 694.2 |
| V07 | 622 038 | 622 965 | +0.15 % | 103 040 | 103 193 | +0.15 % | 4 124 → 4 132 | 607.5 → 608.4 |
| V08 | 582 193 | 582 193 | 0.0 % | 92 453 | 92 453 | 0.0 % | 3 735 → 3 735 | 568.5 → 568.5 |
| V09 | 779 775 | 781 054 | +0.16 % | 128 782 | 129 020 | +0.18 % | 5 045 → 5 049 | 761.5 → 762.7 |
| V10 | 524 582 | 524 582 | 0.0 % | 84 926 | 84 926 | 0.0 % | 3 580 → 3 580 | 512.3 → 512.3 |
| V11 | 681 994 | 681 994 | 0.0 % | 113 932 | 113 932 | 0.0 % | 5 470 → 5 470 | 666.0 → 666.0 |
| V12 | 526 016 | 526 016 | 0.0 % | 85 347 | 85 347 | 0.0 % | 3 561 → 3 561 | 513.7 → 513.7 |
| INDEX | 24 074 | 24 074 | 0.0 % | 4 054 | 4 054 | 0.0 % | 202 → 202 | 23.5 → 23.5 |
| rationale | 704 813 | 704 813 | 0.0 % | 119 127 | 119 127 | 0.0 % | 2 386 → 2 386 | 688.3 → 688.3 |
| **base + volumes** | 10 140 007 | 10 151 951 | +0.12 % | 1 663 985 | 1 666 066 | +0.13 % | | **9902.4 → 9914.0** |
| **volumes** | 6 930 143 | 6 933 290 | +0.05 % | 1 141 589 | 1 142 140 | +0.05 % | | 6767.7 → 6770.8 |
| **base + volumes + INDEX** | 10 164 081 | 10 176 025 | +0.12 % | 1 668 039 | 1 670 120 | +0.12 % | | 9925.9 → 9937.5 |

Words are whitespace-split, as rounds 0–7x counted them; a seat's `wc -w` (POSIX locale) counts fewer (section 2).

**Why the round grows.** This pass closes the family's remaining subset citations by form F6 and adds the missing resolutions
and bars its findings require.
* Removed (all RESTATEMENT): the clause lists and paraphrases the F6 and F1 citations replace — the model's M3 paraphrases, V06's
  V6-2 bar texts (50 words), V09's "strip's edge" phrases (29 words), V07's restated refusal rule.
* Added, ruled content: pipeline's class (B) resolutions and its cross wall through S3 (6), S3 (7) and §4.3 (+560), scope's runs,
  seed conditions and bars (+692), determinism's ladder and table cells (+158), the model's law 2 (b) step, contraction trace step,
  row (d)'s (c) and a test (+120), V09's line form and law-2 order (+238), V07's refusal case and its bar (+153), V06's two bar
  clauses (+117), V05's test sentence (+43).
* The assembler may not compress text.

**Against the shrink goal.** The band is 25–40 % fewer words than the pre-coherence archive, which held 1 491 685 words for base and
volumes.
* The set now stands at 1 666 066 words: +11.69 % against the archive (+11.55 % before this round).
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
* All eight files were applied before the run (ROUND-7 NOTES (9) (b)), the model's block first ((9) (e)). So every cross-unit
  citation of Part H's END lines is read with both its ends in place.
* The untouched run's printout is byte-identical to assemble-r7x's final run (`refs-before.out` = assemble-r7x's `refs-final.out`).

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 57 213 | 57 293 | the target exists |
| external | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 97 | 97 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` that only one volume of its list has: the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 57 448 | 57 528 | |

**Broken: 0**, before and after. **Mechanical fixes: 0.** The first run of the final set found no reference of class FIX, so there
was nothing to fix, and no repair file records a renumbering.

**Ambiguous form: 97**, the same 97 sites as before, matched by text (`ambiguous-diff.txt`: none new, none gone), listed in
`ambiguous-refs.tsv`: base 19, V01 15, V02 13, V03 12, V04 1, V05 4, V06 5, V07 2, V09 7, V10 6, V11 11, V12 2. Each resolves under
S7 as the base's; the verifier confirms each or prefixes it.

**External: 131** (bare 120, bare-cont 1, J 10), listed in `external-refs.tsv`.

### 4.2 §2.7's laws, cited by law, clause, term and the new forms (ROUND-7 NOTES (9) (e); `lawrefs.py`, `f6refs.py`)

`lawrefs.py` parses the installed laws, from "(0) **§2.7's laws**" to "**Worked examples**", and checks every citation of them in
the installed base, volumes and INDEX, with lines read joined.

**What the laws define** (unchanged by this round): law 1's clauses (1)–(11); law 2's heads *Entry*, *Newer*, *Not yet built*, *The
soft readings*, *Carried way* and *A warp*, its steps (a)–(c) and the labels (G1), (G3); law 3's keys (1)–(3); law 4's label (G2);
the Terms (the bold or italic terms, among them **the ends**, with *newly*, *deepens*, *The check* and *Show me why*).

**What is cited** (untouched → installed):
* **citations of a law by number: 953 → 1 024.** By unit: base 679, V01 10, V04 40, V05 2, V06 113, V07 75, V09 76, V10 8, V11 18,
  V12 3.
* **clause citations right after "law n", ranges expanded: 1 086 → 1 079.** The fall is F6 at work: a clause list "law 1 (5)" now
  reads "law 1, read with its terms; chiefly (5)", whose pointers `f6refs.py` checks. Law 1: (1) 47, (2) 115, (3) 76, (4) 83,
  (5) 109, (6) 76, (7) 46, (8) 141, (9) 49, (10) 54, (11) 41; law 2: (a) 113, (b) 26, (c) 88; law 4's (G2) 15.
* **term and head citations: 103 → 107.** Law 2's *Entry* 30, *Carried way* 28, *Newer* 7, *Not yet built* 4, *A warp* 1; "laws'
  *x*": *Order* 15, *held* 6, *ends* 5, *what stands of a wall* 3 (one wrapped across a line break), *anything across a strip* 2,
  *Newer* 2, and *The check*, *beyond the foot*, *meeting* and *the band* 1 each.

**The new citing forms** (`f6refs.py`; untouched → installed):
* **F6, "law n, read with its terms[;|,] chiefly X": 1 → 42** (37 with a "chiefly" list): base 26 with a list and 5 whole, V06 3,
  V07 3, V09 5. Every pointer in X (to the next ";" or unbalanced ")") is a clause law 1 defines: (1) 7, (2) 1, (3) 2, (4) 17, (5)
  30, (6) 14, (8) 2, (9) 1, (10) 3 (ranges expanded). M1's prose list ("chiefly each place … ends (4), … strip (9) and … (10)")
  reads (4), (9), (10).
* **F3, "law n, in its order": 4 → 16** (base 12, V07 1, V09 3), each law 2.

**Result: 0 citations do not resolve.** Every cited law is one of 1–4, every clause exists for its law, and every head, term and
F6 pointer is defined. V11's "alignment law 0" values are content of its tables, not citations, and are passed over.

### 4.3 §2.7's two tables, cited by name (`tablerefs.py`)

**What the installed §2.7 defines** (unchanged): the four outcomes ***over the band***, ***down before the wall***, ***beneath***
and ***unchanged meeting***; the crossing table's rows W1–W14 and columns C1–C13; the way-and-channel table's rows (a)–(e).

**What the set cites** in the forms this script reads: 147 → 148 (outcome names after "crossing table" 33, cells `Wn·Cm` 107 —
V05's new W12·C8 —, "way-and-channel table, row(s) …" 8). **0 do not resolve.**

### 4.4 The citing forms: worked examples and the support step (`examples.py`)

`examples.py` checks each target named after "its / their worked example(s)" (a crossing-table row W*n* or cell C*m*, a
way-and-channel row, the lock, bent-group and fixed-place sentences with the bent-group sentence's items (i)–(iv), an italic name
among §2.7's 167), and every "support step (n)" against the step's items (0)–(7) as installed.

**Results** (untouched → installed):
* worked-example citations: 238 → 248 (base 127, V01 6, V04 13, V05 2, V06 48, V07 23, V09 24, V10 1, V11 4);
* their targets: rows W*n* 65, cells C*m* 13, way-and-channel rows 30 (35 in all forms), the lock sentence 31, the fixed-place
  sentence 25, the bent-group sentence 16 (its items 5: V9-1's (iv), V9-3's (ii)), italic names 119, "the crossing table" 81;
* "support step (n)" citations: 30 → 30;
* **0 do not resolve.**

One site the script cannot parse, V07 l. 1614 ("(their worked examples §2.7's crossing table)", l. 1612 before V7-2 (1) added
two lines), is untouched by this round. It resolves, as earlier assemblers read it.

### 4.5 Part H's ruled texts and the seats' sweep edits, installed (`partH.py`, `partH-hand.py`, `sweeps.py`)

`partH.py` reads adjudication-r7y's Part H unit by unit and checks each ruled text in the installed file of its unit (lines read
joined; an elided "…" text checked by its segments):
* **77 "old" → "new" pairs:** model 13, pipeline 27, determinism 12, scope 5, V06 5, V07 8, V09 7. **Every new text stands**, and
  every old text is gone, save four whose old text is the head of its own new text (M4's W1·C1 test, P7's S5 row, D3's
  `W_RAISED_MEETING` list, D7's DR2 cell).
* **11 insertions** ("after / before "…" insert / add "…""): pipeline 1 (P2), scope 5 (S2 (1), (3); S4 (1)–(3)), V05 1 (V5-1),
  V06 2 (V6-1 (1), (2)), V07 1 (V7-2 (4)), V09 1 (V9-1). Eight are read by `partH.py`'s pattern. Its look-ahead runs past the
  closing quote of three (S2 (3), S4 (1), V6-1 (2)), so `partH-hand.py` cuts each from the adjudication by its exact delimiters
  and checks it joined to its anchor: each stands exactly once in the installed unit and nowhere in the untouched one. **All 11
  stand.**

`sweeps.py` checks the seats' own class (A) sweep edits, which their headers name with old → new and Part H does not quote: the
model's X1–X5, pipeline's SW1 and V07's F-V-RAISED detection. **Each new text stands once and each old text is gone** (X4's old
text stood twice; M3 (b) rewrote the other).

So every FIX, END and CLASS line of this pass, and every sweep site its seats wrote, stands in its unit, and each two-ended fix
has both ends in.

### 4.6 This round's cross-unit anchors (`endrefs.py`, `endrefs.json`; ROUND-7 NOTES (9) (b))

Part H's END lines put one fix's two ends in two units' files. The resolver reads section numbers, so `endrefs.py` checks the named
things those citations point at. **77 anchors**, each defined at its home in the installed set (untouched → installed citations in
brackets where they changed):

* **Defined new this round, both ends now in:**
  * §2.7: row (b)'s gates cell in F6 (M8, X1) [3 → 4], row (d)'s re-route and (c) (M5), W14's event cell in law 2's order (M7),
    W1·C1's "T110-4 (c) (its shape-locked ring)" (M4) [0 → 1], the bent-group strip in F6 (M1) [21 → 24], the lock sentence's
    "else the soft things moved" (M2), *No gate and no tower*'s contraction (M6);
  * §4: §4.1's S5 row (P7), §4.1 *Declarations read ahead*'s refusal (P9), §4.2 S3 (6)'s cross wall (P2) [16 → 20], §4.2 S3 (7)'s
    merged-pair re-solve (P1) [32 → 37], §4.3 *Where it may not go* (P3) [7 → 8], §4.3 *Routes* (P3, P8), §4.4 S5a *Trace* (3)
    (P11), *Outer moats* (P8), S5d's kept arc (P6) [38 → 42], §4.8 *The harbour mouth* in F6 (P14) [0 → 1];
  * §5–§7: F-WALL's top-up exception (D1) [10 → 14], F-BUDGET-STAGE's kept arc (D2) [6 → 8], F-REDERIVE's detection in F6 (D4)
    [31 → 32], §5.4's `W_RAISED_MEETING` cross wall (D3) [10 → 14], §7.1 *Raised ways*' gate in law 2's order (D6), the
    `refuse.raised.meeting`, `bend.wall.raisedCrossing` and `bend.raised.underSpan` causes (D9, D8, D10), §7.3 (b) 3 (D5), §7.7's
    DR2 (D7);
  * §13: T110-4 (c)'s third run (S1) [2 → 3], T110-2 (2)'s twin-town runs (S2 (1)), T110-2 (6)'s moat deck, sixth, seventh and
    top-up runs (S2 (2), (3)), T110-2 (3)'s walled port (S4 (1)) and its ramp and castle clauses (S5), T110-2 (1)'s along-the-band
    stroke and under-deck tower (S4 (2), (3)), §13.8's T110 row (S3);
  * volumes: T-V5-14's locked-run sentence (V5-1), T-V6-47's far-ramp clause and F5 pointer (V6-1 (2), V6-2), T-V6-48's chain
    (V6-1 (1)), V06 §3.7.6 (3) and §3.19 (2), (5) in F6 (V6-3 – V6-5), V07 §3.5a (1), (4) (V7-2 (1), V7-4) [3 → 5], V07 §3.11's
    REPLACEMENT (V7-1), F-V-RAISED's detection (the V07 sweep site), V07 ## 4's lead (V7-2 (2)), T-V7-48's refused stroke (V7-2
    (4)), V07's `raised.deck` citing slot 19a (V7-3), V09 §4.9's `bend.wall.raisedCrossing` gate line "The gate for {road} stands
    {m} m along it, where a gate can stand; the wall passes through it." (V9-1), `bend.raised.underSpan`'s source cell (V9-4),
    V09 §4.20.2 (4) (V9-2, V9-4), T-V9-52's two clauses (V9-3).
* **Defined before and after, cited more:** row (e) [8 → 9], row W13 [5 → 6], W12·C8 [0 → 1], the bent-group sentence's (ii) and
  (iv) [0 → 2], the fixed-place sentence [28 → 30], law 2 *Entry* [27 → 28], *Carried way* [36 → 38], *Newer* [6 → 7], *Order*
  [14 → 15], §4.4 S5a *Trace* (2) [16 → 21] and its step (b) [0 → 2], the pull's search band [27 → 31], `contractWall`'s trace
  step [2 → 3], §7.1's dry-run outcomes [5 → 9], `refuse.raised.meeting` [33 → 35], slot 19a [8 → 9], T110-4 (a)'s T-V6-48
  variant [0 → 1], the c15 fixture [6 → 7], `wealthLevel` [53 → 54], `structure.span.deckDepthCm` [7 → 8], `walls.waited`
  [19 → 23], `absorbWall` [37 → 38], H-AQUA [24 → 25], `bend.raised.wall` [8 → 9].
* **Defined, citations unchanged:** row W2, ***beneath***, ***down before the wall***, these laws' *ends*, *Outer moats*, §7.3 (b)
  3, T110-2 (6), (3), (1), `structure.stripMarginM`, V06's E3, T-V5-14, T-V6-47, V06 §3.7.6 (3), §3.19 (2), (5), V07 §3.11,
  F-V-RAISED, T-V7-48, `raised.deck`, `bend.wall.raisedCrossing`, `bend.raised.underSpan`, V09 §4.20.2, T-V9-52.

**0 anchors are undefined at their homes.** One citation was read by hand: V6-1 (1)'s "on T110-4 (a)'s variant, whose declared
viaduct's fixed-place zone holds a head of the mouth" names T110-4 (a)'s T-V6-48 entry, "with a declared viaduct along its harbour's
shore whose fixed-place zone holds a head of its harbour mouth before the chain is laid" (installed l. 19684–19686), which stands.

## 5. Document checks (three-copy method, one corpus snapshot)

**The command.** `python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with
`docs/validation/doc-checks-allow.tsv`, run by `checks.py` on three copies against one corpus snapshot:
* **untouched** — the live base before this round, sha256 `03573b4f…`;
* **new** — the blocks applied, `c13613c5…`;
* **combined** — the installed text, `c13613c5…`. This round it equals *new*: the assembler changed nothing after the blocks.

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
| untouched (a) | first | 5 / 0 | 1 / 0 | 3448 / 0 | 12 / 0 | 0 / 0 | 317 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1780 / 0 | 6 / 0 | 0 / 0 | 317 / 0 | **0** |
| new = combined (a) | first | 5 / 0 | 1 / 0 | 3458 / 4 | 12 / 0 | 0 / 0 | 318 / 0 | 1 |
| new = combined (b) | first | 5 / 0 | 1 / 0 | 1785 / 2 | 6 / 0 | 0 / 0 | 318 / 0 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3448 / 0 | 12 / 0 | 0 / 0 | 317 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1780 / 0 | 6 / 0 | 0 / 0 | 317 / 0 | **0** |
| **new = combined** (a) | final | 5 / 0 | 1 / 0 | 3458 / 0 | 12 / 0 | 0 / 0 | 318 / 0 | **0** |
| **new = combined** (b) | final | 5 / 0 | 1 / 0 | 1785 / 0 | 6 / 0 | 0 / 0 | 318 / 0 | **0** |

(hits / unreviewed.)

**The final result.** The installed document's final run exits 0 on both key sets. Its total over the 34 keys is **3 794 hits** (C1
5, C2 1, C3 3 458, C4 12, S1 0, S2 318), 0 unreviewed.
* The untouched copy is round 7x's clean state: exit 0, with counts equal to assemble-r7x's combined run.
* S2 gains 1 hit, reviewed: P6's "V06 §2.10" in §4.4 S5d (installed l. 6728), a volume pointer whose text already has a row
  (found by diffing the S2 lists of the two copies with an empty allow file).

**Corrected by hand: none.** There was no S1 table fault, and no G-cite fix this round.

**The unreviewed hits, attributed.** The (b) set has 2 distinct C3 runs (2 sites). `attrib.py` attributed each
(`c3-attribution.tsv`), `c3runs.py` located each as a run by line in both copies (`c3runs.json`), and `hitctx.py` recovered its text
(`hitctx.tsv`). This seat read each in context:
* "law 1 2 3 7" (l. 6232, §4.2 S3 (6)): P2's citation "(§4.2 S3 (7); §4.3 *Where it may not go*; §2.7's laws, law 1 (2), (3))."
  running into the next list item "7. **Gates on the boundary.**" — numbered law pointers of the design's own citation form;
* "the boundary and the cross" (l. 6234, §4.2 S3 (7)): P1 item 4's "(the boundary and the cross wall counting as standing" —
  plain English.
Each is new text of a repair block on a line this round's blocks changed, no run of the untouched base, held whole by no corpus
file, free of any list, table, grammar, palette or identifier. They are false positives.

**The rows** (`allowrows.py`, one block `# block: coherence/assemble-r7y`): the two rows repair-r7y-pipeline proposed, each with its
re-check written into its reason.
* **Append only.** The script ran only after checking that the allow file's sha256 still equalled HEAD's.
* It stops unless every attributed hit is covered by exactly one rule, every site is new text, and no untouched run equals the hit.
* The allow file goes from 2 431 to 2 434 lines (a header and 2 rows), sha256 `7e8ad91c…` → `4530cf4f…`. Its first 2 431 lines are
  byte-identical to HEAD.

**Allow rows made stale by this round: 1, listed, not dropped.** `staleallow.py` finds one C3 row that matched the untouched set and
matches nothing in the installed set: l. 2428 "law 1 2 where the", assemble-r7x's review of §2.7's C5 column lead "(law 1 (2);
*Where the line crosses*)", which the model's X2 now writes in F6. It stays: the shared file is append-only for this seat
(ORCHESTRATION NOTES), and the close may drop it with the earlier assemblers' listed rows.

**Volume information runs** (`volchecks.sh`, `volsummary.py`, recorded in `volchecks-final.txt`). Each volume and INDEX was run as a
whole document, untouched against installed, with `--heads` the matching base. Volume runs carry hundreds of unreviewed runs from
before this pass, so they are not held to exit 0, as in rounds 0–7x.
* **The installed volumes add 1 new distinct unreviewed pair and drop none:** V09 + "and for a gate the" (V9-1's line form "— and,
  for a gate the stretch makes for a ground way …"). V09's header records no document-check run.
* V05, V06 and V07 (changed) and V01–V04, V08, V10–V12 and INDEX (unchanged): 0 new and 0 gone. This matches the V05, V06 and V07
  headers.
* No volume seat proposed a row in the allow file's tab form, so none is appended. The pair is listed for V09's seat or the close.

**The rationale** (information; not held to exit 0) is unchanged this round. It was run once, with `--heads` the installed base: C3
493 / 320 unreviewed and S2 17 / 15, equal to assemble-r7x's.

## 6. Bundle

Before the run, `--check` reported the bundle STALE. `python3 tools/bundle_architecture.py` then wrote `docs/ARCHITECTURE-FULL.md`:
* 72 975 lines reported from 14 sources;
* 10 185 553 → 10 197 497 bytes;
* sha256 `e0175f7592fcd615…` → `e48ece96e4bed638854cc3f6ee242756d15c3ac5e1dfc4e962b8c3299cc65464`.

`--check` now reports it UP TO DATE (exit 0). No live file changed after it.

## 7. Review ids and review markers in design text (ROUND-7 NOTES (9) (c), (e))

**Method.** `reviewids.py` counts citations of review-process ids in the live base, volumes and INDEX:
* the rulings `R<n>-nn`;
* every issue, conflict, wiring, inventory or probe id the coherence pass's own records define: 9 268 tokens, 233 of them `PRB…`
  ids. The records are `verify-*.md`, `adjudication-r*.md` (adjudication-r7y's among them), `famverify-*.md` (the `VF7x-…` ids),
  `inventory-*.md`, `probe-r*.md`, canon, agreement, edges and wiring;
* less any token the design itself defines, and the design id families.

A citation counts only outside the decision and request records: in the base, *Delegated decisions* and *Judgment calls*; in the
volumes, §9 Decisions, §10 Base change requests, §13 Fix list and Integration notes; anywhere, a J-, BCR-, X- or CVR- row.

**Separate counts for (9) (e)**, each over the whole set, records included: every `PRB…` token; every "(amended, …)" marker; every
parenthetical opening with a J144–J151 id; every END-line id; the narration forms of rounds 7v–7y ("adjudication-r7y", "r7y", "fix
pass", "root cause", "class sweep", "class (A) / (B)", "form Fn", `END-L`n, `VF7x-…`, `VPC-r6-…`, `R7-01`); Part H's line ids
`Vn-m`; and, per token, the short ids that collide with design ids — adjudication-r7y's M1–M10, P1–P14, D1–D10, S1–S5, the
seats' sweep ids X1–X5 and SW1, class (B)'s B1–B17 and the forms F1–F6 — untouched against installed, every growth read in
context. The census is read-only: nothing was edited, and the verifiers raise any site.

**Results** (untouched → installed):
* **Design-text sites of review ids: 0 → 0.** No site to list.
* **`PRB…` ids: 0 → 0.** "(amended, …)" markers: 0 → 0.
* **END-line ids: 2 → 2**, V09's "(Part II, E-S33, E-S34)", design ids of Part II that stood before.
* **Narration forms: 0 new.** The list is 104 → 104, the same texts: the design's own "field pass 1 / 2" and way-drawing passes,
  plus one record site, V09's BCR row. No "class (A)", "form F6", "adjudication-r7y", "r7y" or `VF7x-…` stands in the set.
* **Part H line ids: 1 → 1**, unchanged: V10's "V10-15", a site no block of this round touches.
* **Short ids: 5 182 → 5 198 tokens; the sixteen new are design ids**, each read: the stage S3 (+11, its "§4.2 S3 (6)", "S3
  (7)", "S3 (9)" and "S3 (10)" in the new texts of P1–P3, P7, P8, D3 and scope's S2), S4 (+1: P2's "S4's and S6's" stretches),
  S6 (+1, the same), S7 (+2: S4 (1)'s "S7's chain", S4 (3)'s "S7's spacing") and the crossing table's row W6 (+1: S3's §13.8 "W4,
  W5, W6, W8 and W10"). No form id, class (B) id or seat's sweep id stands in design text (the "pass n / round n" list holds only
  "pass 1" 39, "pass 2" 62, "pass 3" 1, "round 2" 1 and "adjudication-r2" 1, as before).
* **Inside the records, 25 citations stand**, kept as records and unchanged: V03 9, V09 15, V10 1.
* **Change markers: 0.** One new parenthetical opening with a J144–J151 id: base l. 19359, T110-2 (2), "and, from the milestone that
  carries the shape lock (J147, J150), on a variant whose declared aqueduct …" — scope S2 (1)'s ruled words. It cites owner
  decisions as the source of the schedule rule beside it, the form T110-4 (c) uses ("the shape-locked runs from the milestone that
  carries the shape lock, J147, J150") and ROUND-7 NOTES (9) (e) allows. The other parentheticals are the nine standing ones, one of
  them re-punctuated by V7-1 (V07 l. 2316, §3.11: "never moved for a meeting (J148);"). Listed for the verifiers. Every J144–J151
  mention in the set is in `reviewids-final.json` (26: base 22, V06 1, V07 2, V11 1; 24 before).

Full lists: `reviewids-final.tsv`, `.json` and `.out`; `reviewids-untouched.tsv`, `.json` and `.out`.

## 8. Not placed, and left for the verifier

* **Unplaced: none.** Every block of the eight files is applied. There is no RULING REQUEST, no ASSEMBLE NOTE, no swap and no double
  REPLACE, so there is no merge conflict and no lost hunk. No block targeted a missing or retitled heading.
* **Broken references: 0** (section 4). Every §2.7 table name; every law, clause, term, F6 pointer and F3 citation of §2.7's laws;
  every worked-example and support-step citation; every ruled text of Part H and every seat's sweep edit; and all 77 cross-unit
  anchors resolve.
* **Mechanical fixes: none** (section 4.1).
* **97 ambiguous-form references** (section 4.1, `ambiguous-refs.tsv`; unchanged). They read as the base's under S7; the verifier
  confirms each or prefixes it.
* **Pipeline's hand-off to the model seat, not written** (its header): §2.7's worked example *down before the wall* (installed
  l. 3035) reads "at S3 (7) the stage-1 boundary (from S3 (9) on, its trace)", while P3's §4.3 *Where it may not go* now counts "the
  stage-1 boundary and a merged pair's cross wall — from S3 (9) on, their trace". Pipeline grades the example non-normative (the
  laws and §4.3 govern), so a minor at most; proposed text for the model seat's next pass: "at S3 (7) the stage-1 boundary and a
  merged pair's cross wall (from S3 (9) on, their trace) and at S5b …".
* **V09's observation** (its header): T-V9-52's "a gate dropped on that wall inside the viaduct's under-deck strip moves along the
  trace clear of it" (installed V09 l. 4432) stays; no finding or ruling routes it.
* **The builders' choice VF7x-TBL-05** (*what stands of a wall*) is adjudication-r7y's listed choice for fix-list.md; no design text,
  by ruling.
* **Carried from assemble-r7x, untouched by this round:** §7.4's raised-way row (installed l. 12142) still reads "its deck and piers
  held, as every raised way is from its creation" (the old term); the hand castle siting is still quoted `setAttr(castle, 'site')`
  once and `setAttr(castle, 'site' \| 'baileyArea')` twice.
* **One new owner-id source parenthetical**, "(J147, J150)" in T110-2 (2) (section 7). Review ids, PRB ids, narration and change
  markers in design text: 0.
* **Hand-offs recorded in the repair files' headers** (section 2.5) are not assembly work. Each "both ends" claim is installed.
* **Volume document checks:** 1 new volume hit without a row in the allow file (V09 "and for a gate the"; section 5,
  `volchecks-final.txt`), for V09's seat or the close.
* **Allow rows made stale by this round: 1** (section 5), listed, not dropped.
* **The document checks are provisional** (section 5). Re-run them on the machine that holds the reference corpus. Both base rows
  were proposed by the seat that wrote the text.
* **Size:** the set is at +11.69 % words against the pre-coherence archive, outside the shrink band (section 3). Each repair file
  states what holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):**
* the 15 live files' sha256: before, each equal to its HEAD blob at `393c356`; after, each equal to its final copy, re-checked after
  the checks and the bundle;
* the eight repair files landed and committed;
* the routing of 27 blocks and the census: 0 missing, 0 ambiguous, 0 unclosed, 0 RULING REQUEST, 0 overlap, 0 double REPLACE, 0
  retitle;
* the model's block applied first;
* 27 applied, with audit not-OK 0 and balanced fences in every file;
* the volume outputs against their seats' records (V05, V06 by sha256; V07 by sha256 prefix, bytes, lines, touched ranges and `wc
  -w`; V09 by lines, per-section words and `wc -w`);
* the four base seats' stand-alone runs reproduced (scope by sha256 prefix too), their diffs disjoint, their union the combined
  diff, the line and byte growths summing;
* no heading added, removed or retitled;
* the reference counts of section 4: 0 broken, 0 FIX, every §2.7 law, clause, term, F6 pointer, F3 citation, table,
  worked-example and support-step citation resolving, every Part H ruled text and seat sweep edit installed, and 77 cross-unit
  anchors defined;
* every hand-off's two ends present in the installed text;
* the document checks' counts of section 5, the installed copy exiting 0 on both key sets against one corpus snapshot;
* the allow file appended only; the one row this round made stale listed;
* the bundle regenerated and `--check` clean;
* the sizes of section 3 and no duplicate id definition;
* the review-id and marker census of section 7.

**PLAUSIBLE:**
* **That the 2 reviewed rows are false positives.** Each was attributed and located by script and read in context by this seat; both
  were proposed by the seat that wrote the text.
* **That V07's and V09's outputs equal their seats' generators.** V07's seat records a sha256 prefix, V09's none; every count matches.
* **That the ambiguous-form references read as their authors meant.** S7 reads them as the base's; none is new this round.
* **That `lawrefs.py`, `f6refs.py`, `examples.py`, `partH.py`, `sweeps.py` and `endrefs.py` catch every citation of §2.7's laws,
  its worked examples, this pass's ruled texts and its anchors.** They read: a "law n" with the clause list right after it, a law-2
  head after "law 2", a term after "laws'"; "law n, read with its terms[;|,] chiefly …" to the next ";" or unbalanced ")", and "law
  n, in its order"; the text after "its / their worked example(s)" up to the next ";" or unbalanced ")"; "support step (n)"; Part
  H's quoted texts of the two forms named in section 4.5 (three more cut by hand); the seats' seven sweep pairs; the 77 anchors by
  the forms listed in the script. A citation in another form is not checked.
* **That the review-id census's token set is complete.** It reads the ids the coherence records define as headings, first table
  cells or bold labels; the `R<n>-nn` rulings; every `PRB…` token, every "(amended, …)" and J144–J151 parenthetical, every END-line
  id, the narration forms and the short ids named in section 7. An id cited only in running text of a record would be missed.
