# Assemble — coherence pass, round 7 fix pass (the twelve repair-r7v block files applied to the base and the volumes)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r7v (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r7v`, 2026-10-02, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at d92c074; base `14304a3d…` as assemble-r7 installed it);
  untouched snapshot — done
- P2 block inventory and routing (12 files, 40 REPLACE: base 17, volumes 23; 0 missing, 0 ambiguous, 0 unclosed, 0 overlap,
  0 double REPLACE, 0 RULING REQUEST; the model's block first); ASSEMBLE NOTES census — done
- P3 apply (40 applied, audit not-OK 0; volume outputs equal their seats' records; the five base seats' stand-alone runs
  reproduced, disjoint, their union the combined diff), headings unchanged, install (8 of 15 changed) — done
- P4 references: 57 340 checked, 0 broken, 0 mechanical fixes, 97 ambiguous-form listed; §2.7's laws (law, clause, term), its
  two tables' names and this round's worked-example and support-step citations all resolve — done
- P5 document checks, three-copy method: 6 allow rows (5 proposed, 1 the assembler's review); the combined copy exits 0 on
  both key sets (PROVISIONAL: corpus incomplete); volume information runs — done
- P6 bundle and `--check` — done
- P7 review-id and marker census (ROUND-7 NOTES (9) (c), (e)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r7v/`. Most are assemble-r7's scripts with
the round label and the scratch folder (`scratchpad/coherence/asm7v/`) changed: `snapshot.py`, `route.py`, `apply.py` (which runs
`docs/validation/amendments-b/apply-blocks.py` unchanged), `headings.py`, `install.py`, `mirror.sh` with `refs.py` and `refsreport.py`,
`lawrefs.py`, `tablerefs.py`, `checks.py`, `attrib.py`, `hitctx.py`, `volchecks.sh` with `volsummary.py`, `sizes.py`, `unitsizes.py`.

These are this round's own or changed:
* `alone.py` (new): each base seat's stand-alone dry run reproduced, the five diffs checked disjoint and their union checked equal
  to the combined diff. It replaces assemble-r7's `handoff.py`, whose swap and judgment-table checks have nothing to do this round.
* `examples.py` (new): ROUND-7 NOTES (9) (e)'s check widened to the citation forms this round's blocks write beside "law n (m)":
  "its worked example …" (rows W*n*, cells C*m*, way-and-channel rows, the named sentences, italic names) and "support step (*n*)".
  It also lists every site still naming the support step (6)'s old term after the model's M6 rename.
* `allowrows.py`: this round's rows, the same two rules, plus one asserted exception (section 5).
* `staleallow.py` (new): allow rows that matched the untouched set and match nothing now.
* `reviewids.py`: also reads `famverify-*.md` (round 7's family checks define the `VF7-…` ids) and counts the round-7v narration
  forms ("adjudication-r7v", "fix pass", `END-L`n, `VF7-…`, `VPC-r6-…`) and Part H's line ids (`V6-7` …).

No live text was edited by hand, and no assembler change followed the blocks. Each script's records sit beside it (`snapshot.json`,
`blocks.json`, `split/`, `logs/`, `apply.json`, `alone.json`, `headings.json`, `install.json`, `refs-before.out`, `refs-final.out`,
`refs-summary.json`, `ambiguous-refs.tsv`, `ambiguous-diff.txt`, `external-refs.tsv`, `lawrefs.json`, `tablerefs.json`,
`examples.json`, `checks-first.json`, `checks.json`, `c3-attribution.tsv`, `hitctx.tsv`, `staleallow.json`, `volchecks-final.txt`,
`sizes.json`, `unitsizes.json`, `reviewids-untouched.*`, `reviewids-final.*`).

## Outcome

**All twelve repair files had LANDED before this seat started** (ROUND-7 NOTES (9) (d)). Each has a
`coherence/repair-<unit>-r7v LANDED` line in the lane log and its result in `results/coherence_repair-<unit>-r7v.json`. All twelve are
committed at HEAD `d92c074`. Kernel, V02, V03, V08, V10 and V11 had nothing to repair this pass, so they have no file.

**Blocks: 40 found, 40 applied, 0 skipped.**
* All 40 are REPLACE blocks: 17 for the base, 23 for seven volumes. There is no J-ROWS, RATIONALE-A or RULING REQUEST block.
* No heading was missing or ambiguous, no block was truncated, and no two blocks touch one subsection (no double REPLACE, no
  nesting). So no three-way merge was needed and no heading was retitled.
* The audit finds every applied body exactly once, and the fences are balanced in every file.
* Every volume output equals its repair seat's recorded dry run: V05, V06 and V12 by sha256; V01 and V07 by bytes and lines; V04 on
  exactly the three lines its header names; V09 by its recorded counts.
* Each of the five base seats' recorded stand-alone dry runs is reproduced. Their diffs are pairwise disjoint, and their union is the
  combined run's diff.

**The model's block was applied first** (ROUND-7 NOTES (9) (e)). This round the model has one block, §2.7 (its §2.2 and §2.8 are
untouched). Every citation of "§2.7's laws" by law, clause or term was then checked against what the installed laws define, and so
was every worked-example and support-step citation this round writes (section 4). **All resolve.**

**No header carries an ASSEMBLE NOTE, a swap or a restated row this round** (section 2.4). Five proposed allow rows were reviewed and
written (scope four, determinism one).

**Nothing is unplaced.** The round adds, removes and retitles no heading.

**Size.** The set (base and volumes) goes from 9 878.2 KB to 9 890.9 KB (+0.1 % bytes and words). The base grows by 1 294 words
(+0.2 %) and the volumes by 1 011 (+0.1 %). Every added word is ruled FIX or END text.

**References.** 57 340 are checked and **none is broken**. None needed a mechanical fix. 97 resolve but are ambiguous in form (95
before).

**Document checks.** The combined (installed) document exits 0 over every top-level key and over the eight `#` keys, against one
corpus snapshot. This needed 6 reviewed allow rows. The result is **provisional**, because the reference corpus is incomplete in this
checkout. The combined document's total is **3 768 hits** (C1 5, C2 1, C3 3 436, C4 12, S1 0, S2 314), 0 unreviewed.

**Bundle.** `docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes.

**Review ids and review markers in design text** (ROUND-7 NOTES (9) (c), (e)):
* **0** review-id sites outside the decision and request records (0 before);
* **0** `PRB7…` ids, **0** "(amended, …)" markers and **0** "(J146, PRB7…)" markers in the base, the volumes and INDEX;
* **0** owner-id parentheticals used as change markers. The model's M1 writes four owner-decision citations at the laws in Part L's
  words (adjudication-r7v's VF7-TBL-01 FIX). Each cites the rule's source, which (9) (e) allows. Two of them, "(J147)" and "(J149)",
  are bare in form, so all are listed (section 7).

## 1. Live files — sha256 before and after

**Before:** the committed text at HEAD `d92c0744a518`. Each live file equalled its HEAD blob. These are assemble-r7's outputs, and
every repair file was written against the base `14304a3da4612718…` (ROUND-7 NOTES (4)'s merge base).

**After:**
* `install.py` wrote them, only after confirming each live file still held its P1 sha256. It verified each written file
  byte-identical to its final copy.
* No later step changed a live design file (there was no mechanical reference fix). After P5–P7, every live file was re-checked
  equal to its final copy.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 3 194 446 | 3 201 924 | `14304a3da46127181e8274a87d3551e7b79e32a4e390389bdcd56bcfb491df2d` | `2612044ee57e7324f1e40e0b5329d1f55360ce9b95a8c70c7d30969a0299b9d0` |
| `docs/ARCHITECTURE-RATIONALE.md` | 704 813 | 704 813 | `7e172500f6a791c5cf1e667c657309b6a49ee067dc130a05d82e605a06579c39` | unchanged (no block) |
| `docs/volumes/V01-neighbourhoods.md` | 528 635 | 529 041 | `7b63780f96353d9aeb8cc64d5b5aa029af541968a0c65a87545da91ccd421778` | `b8430af89b39c5933d50eb939d806e43a348e7b9d34ebce9ba1701e7fa5a1bb4` |
| `docs/volumes/V02-buildings.md` | 565 121 | 565 121 | `c7fbb7055d776409fe0f906059fcf943198ecb81de065054674be4859cef4540` | unchanged (no block) |
| `docs/volumes/V03-interiors.md` | 467 810 | 467 810 | `894955c29098f435f9f483c2c0991fe7ebfc79b19d4dd0e0a2c078e676266792` | unchanged (no block) |
| `docs/volumes/V04-underground.md` | 535 373 | 535 894 | `18b739064e67f21b49960a9a108a6ebecddc1d6d7ceb42c0931e3ebb8b594a71` | `c9c990b288b0e66f000127acf79ed94ab10551921737512b56eb728fa75cafd2` |
| `docs/volumes/V05-sky.md` | 404 653 | 404 696 | `618925836a8e0688ea01e3a9e542bfbcf06efea4f4177d4aac42c6ba4c404206` | `1931fec160a4b146d1778deac28413dc329bae2868d8542f4967116a695e671f` |
| `docs/volumes/V06-evolution.md` | 706 957 | 708 994 | `324609e5ef5b1ff164f56dfcd6edae152f043d6608bbd0ea4372100f1e402f4b` | `132b96bbcd7239eeee139171bedcec11695e69e9e509695d4753e76a447b2824` |
| `docs/volumes/V07-village.md` | 621 436 | 621 938 | `346c8b5a2dabff46a2bf52387a1a295d1fba91cd674ae308ea0066c8ba68ac3d` | `a8cb10b027f8c04e79f9a9c6472c0cf2b3d64d45c4a3bc92b6f17b64b3db2d7d` |
| `docs/volumes/V08-settlementforge.md` | 582 193 | 582 193 | `83382cac1e496ffb29d7ca1d9ea1ed3c7b37978ddedd915ee50f73c89ca1b491` | unchanged (no block) |
| `docs/volumes/V09-application.md` | 776 936 | 778 754 | `371946d55b244c26db9b4e433a885e8f63cde9f770563a688784bf0fd367585f` | `bf6d52c1fbb76402b2c4db6306a635458a3151e1a3839245ecdf44a34874aced` |
| `docs/volumes/V10-clerk.md` | 524 498 | 524 498 | `4988e5ae15e19a0e3b7977a673785d83cbd92e9e03d38ae93130511f0b65a019` | unchanged (no block) |
| `docs/volumes/V11-content.md` | 681 412 | 681 412 | `67c7c0b837e1c53a1c428d75485da9c5e54c193428a0c9ba86a36f71aae86dfc` | unchanged (no block) |
| `docs/volumes/V12-calibration.md` | 525 763 | 526 016 | `66e2ca404b1f9d19f6f9d56beebd73445a9a0375992d45ea1c2b754083446eff` | `3f20cb1fbf132b75ffdbd881b97084797c8203a63355587d1de977315f792b89` |
| `docs/volumes/INDEX.md` | 24 074 | 24 074 | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` | unchanged (no block routes to it) |

Also written:
* `docs/ARCHITECTURE-FULL.md`, the bundle (section 6);
* `docs/validation/doc-checks-allow.tsv`, one appended block (section 5).

## 2. Blocks — routing, application, audit

**The block files** are exactly `docs/validation/coherence/repair-r7v-<unit>.md` for the twelve units (ROUND-7 NOTES (1)): model,
pipeline, determinism, rendering, scope, V01, V04, V05, V06, V07, V09 and V12. `blocks.json` records each one's sha256 as read.
Everything under `work/` and the bench files is the repair seats' working material, never blocks.

**Routing** (`route.py`):
* Each file was cut at its `=== FILE <path> ===` lines. Every block went to the file its nearest FILE line above names, or the base
  when there is none (ROUND-7 NOTES (3)).
* Each volume file names one volume, and the five base files have no FILE line. No file carries blocks for more than one document,
  and none routes to INDEX.md or the rationale.
* **Order:** each split file keeps its repair file's basename behind an order prefix, `a-` for `repair-r7v-model.md` and `b-` for every
  other. `apply-blocks.py` applies its files in name order, so the base run applies the model's §2.7 block first, then determinism's,
  pipeline's, rendering's and scope's (ROUND-7 NOTES (9) (e)). The base log's first audit entry is the model's block. The base ran
  before the volumes.
* The FILE lines are left out (they are routing, not blocks); every other line is verbatim.
* Each volume ran with a throwaway rationale whose output equals its input.
* No text follows any file's last END.

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST, and 0 overlaps
of any kind. No two blocks of the round, within one unit or across units, cover one subsection or nest. Two consequences:
* **No double REPLACE.** The brief's `git merge-file` step (merge base: the subsection as assemble-r7 installed it, base
  `14304a3da4612718…`) had nothing to merge, so there is no conflict or lost hunk to report (ROUND-7 NOTES (4)).
* **No retitled target.** Every block was found on the text as it stood, and every body opens with its own target heading (ROUND-7
  NOTES (5)).

| unit | blocks found | applied | skipped | target | covers | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|---|
| model | 1 | 1 | 0 | `ARCHITECTURE.md` (applied first) | §2.7 | 31 420 → 31 657 (+0.8 %) | 184.2 → 185.5 |
| determinism | 6 | 6 | 0 | `ARCHITECTURE.md` | §5.2, §5.3, §5.4, §6.2, §7.1, §7.3 | 35 573 → 35 795 (+0.6 %) | 214.9 → 216.2 |
| pipeline | 5 | 5 | 0 | `ARCHITECTURE.md` | §4.1, §4.2, §4.4, §4.5, §4.8 | 31 374 → 31 512 (+0.4 %) | 188.3 → 189.0 |
| rendering | 2 | 2 | 0 | `ARCHITECTURE.md` | §8.11, §11.1 | 11 085 → 11 113 (+0.3 %) | 64.6 → 64.8 |
| scope | 3 | 3 | 0 | `ARCHITECTURE.md` | §13.2, §13.5, §13.8 | 34 959 → 35 628 (+1.9 %) | 208.9 → 212.7 |
| V01 | 4 | 4 | 0 | `V01-neighbourhoods.md` | §1.2, §3.4.2, §3.6, §3.17.3 | 4 419 → 4 497 (+1.8 %) | 26.8 → 27.2 |
| V04 | 1 | 1 | 0 | `V04-underground.md` | ## 7 | 8 813 → 8 912 (+1.1 %) | 51.5 → 52.0 |
| V05 | 1 | 1 | 0 | `V05-sky.md` | ## 7 | 8 285 → 8 293 (+0.1 %) | 47.8 → 47.8 |
| V06 | 9 | 9 | 0 | `V06-evolution.md` | ## 1b, §2.10, §3.6, §3.7, §3.17, §3.19, §3.21, ## 7, ## 9 | 51 115 → 51 471 (+0.7 %) | 303.1 → 305.0 |
| V07 | 3 | 3 | 0 | `V07-village.md` | ## 1, ## 7, ## 8 | 15 722 → 15 807 (+0.5 %) | 92.3 → 92.8 |
| V09 | 3 | 3 | 0 | `V09-application.md` | §4.9, §4.20.2, §7.1 | 25 725 → 26 062 (+1.3 %) | 154.2 → 156.0 |
| V12 | 2 | 2 | 0 | `V12-calibration.md` | §3.4, §3.11 | 13 574 → 13 622 (+0.4 %) | 80.9 → 81.1 |
| **total** | **40** | **40** | **0** | | | | |

"Covered text" compares each REPLACE target's section in the untouched file with the section of its body's heading in the installed
file (whitespace-split words).

**Each unit's block count matches its header and its result file:** model 1, pipeline 5, determinism 6, rendering 2, scope 3, V01 4,
V04 1, V05 1, V06 9, V07 3, V09 3, V12 2. This is the orchestrator's count of 40 blocks.

**Each unit's word change matches its header** (headers count with `wc` or by whitespace, so a few words can differ):
* equal: model +237, determinism +222 (its §5–§7.4 count), rendering +28, scope +669, V04 +99, V05 +8, V06 +356, V07 +85, V12 +48
  (its whitespace-token count);
* within a few words: pipeline +138 (its header +136, over the same five subsections), V01 +78 (+77 by `wc -w`), V09 +337 (+330,
  its per-section sum).

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines (balanced) | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 17 | 17 | 0 | 153 → 153 | 140 → 140 | `2612044ee57e7324` | each seat's stand-alone run reproduced (below); index 805 rows and Part A 805 rows, no duplicate id |
| `V01-neighbourhoods.md` | 4 | 4 | 0 | 123 → 123 | 12 → 12 | `b8430af89b39c593` | equal in bytes and lines: 528 635 → 529 041 bytes, 3 756 → 3 759 lines (no hash recorded) |
| `V04-underground.md` | 1 | 1 | 0 | 59 → 59 | 12 → 12 | `c9c990b288b0e66f` | equal: the diff touches exactly l. 3163, 3164 and 3181 (T-V4-62, T-V4-63, T-V4-80), 3 644 → 3 644 lines (no hash recorded) |
| `V05-sky.md` | 1 | 1 | 0 | 62 → 62 | 14 → 14 | `1931fec160a4b146` | equal: sha256 `1931fec160a4b146…`, 404 696 bytes, 3 096 lines |
| `V06-evolution.md` | 9 | 9 | 0 | 65 → 65 | 28 → 28 | `132b96bbcd7239ee` | equal: sha256 `132b96bb…a447b2824`, 708 994 bytes, 4 667 lines |
| `V07-village.md` | 3 | 3 | 0 | 58 → 58 | 18 → 18 | `a8cb10b027f8c04e` | equal in bytes and lines: 621 436 → 621 938 bytes, 4 123 → 4 125 lines (no hash recorded) |
| `V09-application.md` | 3 | 3 | 0 | 110 → 110 | 24 → 24 | `bf6d52c1fbb76402` | equal in its counts: 3 found, 3 applied, 0 skipped, audit OK, headings and fences unchanged (no hash recorded) |
| `V12-calibration.md` | 2 | 2 | 0 | 67 → 67 | 30 → 30 | `3f20cb1fbf132b75` | equal: sha256 `3f20cb1fbf13…`, 3 560 → 3 561 lines |

**Audit, for each run:**
* every applied body is found exactly once in the output (not-OK 0);
* every title block is unchanged by the blocks;
* the PENDING FABLE REVIEW lines are unchanged in every file;
* the applier printed no note: no duplicate id, no retitle, no supersession, no malformed header.

### 2.1 The base seats' dry runs, reproduced (`alone.py`, `alone.json`)

`alone.py` ran each base seat's split file alone on the untouched base and rationale, and compared the result with its header:

| seat | alone: found / applied / skipped / audit not-OK | lines | old lines its diff touches | its header's record, reproduced |
|---|---|---|---|---|
| model | 1 / 1 / 0 / 0 | 24 062 → 24 074 | 30 lines, all inside §2.7 (l. 2303–3394) | headings 153 → 153, fences 140 → 140, title block unchanged, rationale unchanged, 24 062 → 24 074, every line outside §2.7 byte-identical |
| determinism | 6 / 6 / 0 / 0 | 24 062 → 24 067 | l. 9840, 9857, 9938, 9991, 10030–10042, 10370–10371, 10384–10402, 11133–11152, 11323, 11325–11326, 11676–11677 | exactly its hunk list; with the other four base files, 17 / 17 (the combined run here) |
| pipeline | 5 / 5 / 0 / 0 | 24 062 → 24 062 | l. 5700, 6214, 6231, 6267, 6285, 6589, 6638, 6873, 8378 | exactly 9 lines changed, rationale byte-identical |
| rendering | 2 / 2 / 0 / 0 | 24 062 → 24 062 | l. 15463, 16703 | exactly those two lines, rationale byte-identical |
| scope | 3 / 3 / 0 / 0 | 24 062 → 24 099 | 25 lines in §13.2, §13.5, §13.8 (20 hunks) | 3 audit OK, headings 153 → 153, fences 140 → 140, 24 062 → 24 099 lines, 20 hunks, rationale unchanged; with the other four, 17 / 17 |

**All five equal their records.**

**The five diffs are disjoint.** No old line is touched by two seats. The union of the five touched-line sets (129 old lines) equals the
combined run's touched set. The combined base grows by 54 lines, which is the sum of the five stand-alone growths (12 + 5 + 0 + 0 + 37):
24 062 → 24 116.

### 2.2 Headings, RULING REQUEST blocks

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents. Each count is
unchanged: base 153, INDEX 9, V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67.

**RULING REQUEST blocks: 0** (ROUND-7 NOTES (2), (9) (f)). Each repair header and result records 0, and no `=== RULING REQUEST` line
stands in any of the twelve files. After installation, no live file contains a `=== ` header line or any "RULING REQUEST" text.

### 2.3 The model's laws applied first, and the other units' citations of them

ROUND-7 NOTES (9) (e) names the model's blocks "§2.2, §2.7, §2.8". This round the model writes §2.7 alone; its header says so (1
REPLACE, the live §2.7 with the adjudication's 24 count-asserted substitutions). It was applied first, and every citation of it was
checked after all twelve files were in (section 4).

### 2.4 NOTES FOR ASSEMBLE — the census (ROUND-7 NOTES (9) (a))

I read all twelve preambles for every line that names Assemble or the assembler, a swap, a title block, a restated row, a J-ROWS or
RATIONALE-A row, a proposed allow row, a NOTE or a HAND-OFF.

**No header carries an ASSEMBLE NOTE, a swap instruction or a restated J-ROWS or RATIONALE-A row.** Every volume unit records "title
block untouched / unchanged", and no base unit writes a J-ROWS or RATIONALE-A block. So `final/` is `apply.py`'s output, with the
rationale, V02, V03, V08, V10, V11 and INDEX.md carried unchanged.

**Two lists of proposed allow rows are addressed to the assembler** (tab form; the allow file is the assembler's to write):
* **Scope's four** (its CHECKS (3)): "the gate and the wall", "a run of the ring", "byte identical in the model digest", "6 2 the ring s"
  — all in §13.2's T110-2 (5), (6).
* **Determinism's one** (its CHECKS): "at a gate and a" — §7.3 (b) 3.
Each was reviewed and written (section 5).

**One run is recorded but not proposed.** The model's header records "fields outside the model digest and inside the records digest"
(M11's adjudicated words) and proposes no row. This seat reviewed it (section 5).

**The volume headers record their new volume hits** and propose no tab-form row: V04 "s level and the hand", V06 "over it and the
same", V07 "under the deck and the one", V12 "1 1 3 5 3". As in rounds 0–7, no row is appended for them (section 5).

**HAND-OFFS and observations in the headers** are for the adjudicator and round 8's verifiers, not assembly work. They stand in the
repair files:
* **scope → V06:** T-V6-47's circuit cells'-order clause needs ", both its spans fallen first". **Closed in the installed text.** V06's
  conformance 8 writes it, and both T-V6-47 clauses now read "both its spans fallen first", as base T110-2 (7) does (V06 l. 4220).
* **V04 → V06:** V06 l. 1049 (§3.2, the reconcile's epoch-side guarantee) restates law 1 (8)'s replaced chamber clause: "read `vault`
  has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says)". The law at its home now reads "has the chamber V04 §3.5.4 (d) lays"
  (base l. 2734). No r7v block writes V06 §3.2. **Open, listed for the verifiers** (section 8).
* **model → adjudicator:** §2.8's lead names the records digest's members without the order fields M11 and D8 add, as a candidate
  conform at §2.8.
* **pipeline (noted, not edited):** §4.4 S5b's closing "(§2.7's way-and-channel table, row d)" and bare way-and-channel citations at
  §4.3, §4.4, §4.11 and §4.13, which use the citation form only.
* **V12, observation for the adjudicator:** `wall.ungated` is also computed under the default preset, so its part-0 reading matters
  beyond the P rows.

ROUND-7 NOTES (9) (b) is met because all twelve files were applied before the reference check (section 4).

## 3. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | lines before → after | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|---|
| base | 3 194 446 | 3 201 924 | +0.2 % | 519 746 | 521 040 | +0.2 % | 24 062 → 24 116 | 3119.6 → 3126.9 |
| V01 | 528 635 | 529 041 | +0.1 % | 86 783 | 86 861 | +0.1 % | 3 756 → 3 759 | 516.2 → 516.6 |
| V02 | 565 121 | 565 121 | 0.0 % | 94 571 | 94 571 | 0.0 % | 4 227 → 4 227 | 551.9 → 551.9 |
| V03 | 467 810 | 467 810 | 0.0 % | 79 495 | 79 495 | 0.0 % | 3 304 → 3 304 | 456.8 → 456.8 |
| V04 | 535 373 | 535 894 | +0.1 % | 87 261 | 87 360 | +0.1 % | 3 644 → 3 644 | 522.8 → 523.3 |
| V05 | 404 653 | 404 696 | +0.0 % | 68 390 | 68 398 | +0.0 % | 3 096 → 3 096 | 395.2 → 395.2 |
| V06 | 706 957 | 708 994 | +0.3 % | 115 756 | 116 112 | +0.3 % | 4 655 → 4 667 | 690.4 → 692.4 |
| V07 | 621 436 | 621 938 | +0.1 % | 102 942 | 103 027 | +0.1 % | 4 123 → 4 125 | 606.9 → 607.4 |
| V08 | 582 193 | 582 193 | 0.0 % | 92 453 | 92 453 | 0.0 % | 3 735 → 3 735 | 568.5 → 568.5 |
| V09 | 776 936 | 778 754 | +0.2 % | 128 272 | 128 609 | +0.3 % | 5 044 → 5 045 | 758.7 → 760.5 |
| V10 | 524 498 | 524 498 | 0.0 % | 84 911 | 84 911 | 0.0 % | 3 580 → 3 580 | 512.2 → 512.2 |
| V11 | 681 412 | 681 412 | 0.0 % | 113 848 | 113 848 | 0.0 % | 5 470 → 5 470 | 665.4 → 665.4 |
| V12 | 525 763 | 526 016 | +0.0 % | 85 299 | 85 347 | +0.1 % | 3 560 → 3 561 | 513.4 → 513.7 |
| INDEX | 24 074 | 24 074 | 0.0 % | 4 054 | 4 054 | 0.0 % | 202 → 202 | 23.5 → 23.5 |
| rationale | 704 813 | 704 813 | 0.0 % | 119 127 | 119 127 | 0.0 % | 2 386 → 2 386 | 688.3 → 688.3 |
| **base + volumes** | 10 115 233 | 10 128 291 | +0.1 % | 1 659 727 | 1 662 032 | +0.1 % | | **9878.2 → 9890.9** |
| **volumes** | 6 920 787 | 6 926 367 | +0.1 % | 1 139 981 | 1 140 992 | +0.1 % | | 6758.6 → 6764.0 |
| **base + volumes + INDEX** | 10 139 307 | 10 152 365 | +0.1 % | 1 663 781 | 1 666 086 | +0.1 % | | 9901.7 → 9914.4 |

Words are whitespace-split, as rounds 0–7 counted them; a seat's `wc -w` figure can differ by a few.

**Why every changed unit grows.** This pass repairs round 7's family findings under adjudication-r7v's Part H. Each FIX or END line adds
a citation, a case or a bar clause that its finding requires. The largest are scope's §13.2 fixtures and runs (+554), V06's H-AQUA foot
condition and take-over clauses (## 7 +205) and the model's laws' citations and examples (+237, the laws themselves −5 words). The
only removal is pipeline's P7, a restated law written as its citation (−3). The assembler may not compress text.

**Against the shrink goal.** The band is 25–40 % fewer words than the pre-coherence archive, which held 1 491 685 words for base and
volumes. The set now stands at 1 662 032 words, +11.4 % against the archive (+11.3 % before this round). No unit shrank, so none
shrank by more than half. Each repair file states what holds its unit; several cite the pass's note that this family fix pass should
be small.

**Duplicate id definitions across the set** (principle (4)): **none** (`sizes.py`). The census covers the judgment index, Part A, D-n,
T-ER, every volume's T-Vn-m and J-Vn.m rows, and `_integrate.md`'s J-VI rows. The resolver's defined ids are unchanged at 3 468: no
id was added, removed or renumbered.

## 4. References

### 4.1 The resolver

**The resolver.** This is assemble-r0's `refs.py` (citation form canon S7: a bare `§x` is the base's; a volume's section is `Vnn §x`
everywhere), unchanged but for its root. It ran on two mirror trees (`mirror.sh`), the untouched set and the final set, each with
`_integrate.md`, files f and g, `research/` and `docs/volumes/critique/` linked in.

**What it checks.** Every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…`, with lines read joined,
against the headings and ids that now exist. The numbered targets are unchanged by the round: base 147, V01 121, V02 99, V03 53, V04 66,
V05 60, V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8. Defined ids: 3 468.

**Ordering.** All twelve files were applied before the run (ROUND-7 NOTES (9) (b)), the model's block first ((9) (e)). So every
cross-unit citation of Part H's END lines is read with both its ends in place. The untouched run's printout is identical to
assemble-r7's final run (`refs-before.out` = assemble-r7's `refs-final.out`).

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 57 042 | 57 105 | the target exists |
| external | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 95 | 97 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` that only one volume of its list has — the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 57 275 | 57 340 | |

**Broken: 0**, before and after.

**Mechanical fixes: 0.** The resolver found no reference of class FIX. No repair file records a renumbering, and no heading moved
(section 2.2).

**Ambiguous form: 97** (95 before), listed in `ambiguous-refs.tsv` with unit, line, reference, the list's head volume and context: base
19, V01 15, V02 13, V03 12, V04 1, V05 4, V06 6, V07 2, V09 7, V10 6, V11 10, V12 2. Each resolves under S7 as the base's; the
verifier confirms each or prefixes it.

The round's changes to this list, all checked by reading (`ambiguous-diff.txt`):
* **Two sites new.** Each is the base's, as its own words say:
  * base l. 2303, "§2.7's laws' *Newer*" after a V11 list (the `Order` type's `seq` comment, the model's M11);
  * V06 l. 1628, "(§2.7's laws, law 4; its worked example *unchanged meeting*)" after a V06 list (V06's conformance 3).
* **Two sites rewritten in place**, still after a volume list:
  * V01 l. 978, "§2.7's crossing table" → "§2.7's laws, law 1 (1)";
  * V05 l. 2565, "§2.7's crossing table, *unchanged meeting*" → "§2.7's laws, law 4; its worked example *unchanged meeting*".

**External: 131** (bare 120, bare-cont 1, J 10), listed in `external-refs.tsv`.

### 4.2 §2.7's laws, cited by law, clause and term (ROUND-7 NOTES (9) (e); `lawrefs.py`, `lawrefs.json`)

The resolver reads section numbers, not the law, clause and term names the other units cite from §2.7's laws. `lawrefs.py` parses the
installed laws, from "(0) **§2.7's laws**" (base l. 2579) to "**Worked examples**" (l. 2893). It then checks every citation of them in
the installed base, volumes and INDEX, with lines read joined.

**What the laws define** (unchanged by this round):
* **law 1:** the clauses (1)–(11);
* **law 2:** the heads *Entry*, *Newer*, *Not yet built*, *The soft readings*, *Carried way* and *A warp*; the steps (a)–(c); the labels
  (G1) and (G3);
* **law 3:** the keys (1)–(3);
* **law 4:** the label (G2);
* **the Terms:** 47 bold or italic terms, with *newly*, *deepens*, *The check* and *Show me why*.

**What is cited** (untouched → installed):
* **citations of a law by number: 776 → 853.** By unit: base 554, V01 9, V04 36, V05 1, V06 115, V07 67, V09 44, V10 8, V11 16, V12 3.
* **clause citations, numeric ranges expanded: 783 → 877.**
  * law 1: (1) 43, (2) 100, (3) 62, (4) 61, (5) 104, (6) 72, (7) 45, (8) 127, (9) 33, (10) 33, (11) 20;
  * law 2: (a) 77, (b) 15, (c) 70;
  * law 4's (G2): 15.
* **term and head citations: 82 → 93.**
  * law 2 heads: *Entry* 26, *Carried way* 23, *Newer* 6, *Not yet built* 6, *A warp* 1;
  * "laws' *x*": *Order* 14, *held* 6, *what stands of a wall* 3, *Newer* 2, *anything across a strip* 2, and *The check*, *beyond the
    foot*, *meeting* and *the band* 1 each.

**Result: 0 citations do not resolve.** Every cited law is one of 1–4, every clause exists for its law, and every head and term is
defined. V11's "alignment law 0" values are content of its tables, not citations, and are passed over.

### 4.3 §2.7's two tables, cited by name (`tablerefs.py`, `tablerefs.json`)

**What the installed §2.7 defines** (unchanged): the four outcomes ***over the band***, ***down before the wall***, ***beneath*** and
***unchanged meeting***; the crossing table's rows W1–W14 and columns C1–C13; the way-and-channel table's rows (a)–(e).

**What the set cites** in the forms this script reads (untouched → installed):
* outcome names after "crossing table": 36 → 32;
* cells `Wn·Cm`: 105 → 106;
* "way-and-channel table, row(s) …": 15 → 12.

The drop is this round's rewriting of table-alone citations ("§2.7's crossing table, *x*") into the citing form ("§2.7's laws, law
n; its worked example *x*"), which section 4.4 checks. **0 do not resolve.**

### 4.4 This round's citing forms: worked examples and the support step (`examples.py`, `examples.json`)

Adjudication-r7's Part H head binds every unit to cite "§2.7's laws, law n; its worked example …". This round's blocks write many such
citations, and several cite "§2.7's support step (n)". `examples.py` checks each target named after "its / their worked example(s)":
* a crossing-table row W*n* (in 1–14) or cell C*m* (in 1–13);
* a way-and-channel row (*x*) (in (a)–(e)), including "that table's row (*x*)";
* a named sentence (the lock, bent-group and fixed-place sentences, all three standing), with the bent-group sentence's items
  (i)–(iv);
* an italic name, which must be one of the 164 bold or italic names of §2.7 from the support step to its end.
It also checks every "support step (n)" against the step's items (0)–(7) as installed.

**Results** (untouched → installed):
* worked-example citations: 192 → 224 (base 116, V01 5, V04 13, V05 1, V06 46, V07 22, V09 16, V10 1, V11 4);
* their targets: rows W*n* 59, cells C*m* 12, way-and-channel rows 20, the lock sentence 31, the fixed-place sentence 18, the
  bent-group sentence 12 (its item (i) 2), italic names 114, "the crossing table" 79;
* "support step (n)" citations: 29 → 30.
* **0 do not resolve.**

One site the script could not parse was read by hand: V07 l. 1612, "(their worked examples §2.7's crossing table)". It resolves.

**The support step (6)'s renamed term** (the model's M6: "**Kept from its creation; later work gives way.**", "it is **kept**"):
* no "(6)'s held" form remains in the set;
* one restatement of (6) still uses "held": §7.4's raised-way row (base l. 12126), "its deck and piers held, as every raised way is
  from its creation (§2.7's support step (6))". The model's sweep names it as kept until round 8 by the adjudication (M6's note).
  It is listed (section 8).

## 5. Document checks (three-copy method, one corpus snapshot)

**The command.** `python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with
`docs/validation/doc-checks-allow.tsv`, run by `checks.py` on three copies against one corpus snapshot:
* **untouched** — the live base before this round, sha256 `14304a3d…`;
* **new** — the blocks applied, `2612044e…`;
* **combined** — the installed text, `2612044e…`. It is byte-identical to *new*, because no assembler change followed the blocks.

**Two key sets:**
* (a) the 34 top-level heading keys `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.7,PART III,Delegated
  decisions,Judgment calls,Staged,Appendix A`. This is the brief's command. The parent keys span their children, so their C3 and C4
  hits count twice.
* (b) the eight `#` keys, which partition the document.

The corpus fingerprint (path, size and mtime of the 128 files doc_checks reads) is equal before and after every run
(`b2f7e5c5fd256d59…`).

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon,
research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the
corpus before any freeze". Every count below is PROVISIONAL (ROUND-7 NOTES (6)).

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 1 / 0 | 3424 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1768 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |
| new = combined (a) | first | 5 / 0 | 1 / 0 | 3436 / 12 | 12 / 0 | 0 / 0 | 314 / 0 | 1 |
| new = combined (b) | first | 5 / 0 | 1 / 0 | 1774 / 6 | 6 / 0 | 0 / 0 | 314 / 0 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3424 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1768 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |
| **new = combined** (a) | final | 5 / 0 | 1 / 0 | 3436 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| **new = combined** (b) | final | 5 / 0 | 1 / 0 | 1774 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |

(hits / unreviewed.)

**The final result.** The installed document's final run exits 0 on both key sets. Its total over the 34 keys is **3 768 hits** (C1 5,
C2 1, C3 3 436, C4 12, S1 0, S2 314), 0 unreviewed.
* The untouched copy is round 7's clean state: exit 0, with counts equal to assemble-r7's combined run.
* S2 is unchanged at 314 hits, 0 unreviewed: the blocks add no S2 hit.

**Corrected: none by hand.** There was no S1 table fault and no mechanical change.

**The 6 unreviewed hits of the (b) set are 6 distinct C3 runs.** `attrib.py` attributed each (`c3-attribution.tsv`), and `hitctx.py`
recovered its original text at every site (`hitctx.tsv`). This seat read each in context. Every one is:
* new text of a repair block;
* free of any list, table, grammar, palette or identifier;
* held whole by no corpus file (a chain of corpus 3-grams meeting by chance).
They are false positives: our own plain English, our own design terms and section pointers.

**Five proposed rows**, re-checked as carried by the proposing seat's block:
* **Scope's four**, all in §13.2's T110-2:
  * "a run of the ring" (l. 19486, (5), S11's text);
  * "byte identical in the model digest" and "6 2 the ring s" (l. 19498, (6), S13's text, "byte-identical in the model digest
    (§6.2), the ring's `laidAt`");
  * "the gate and the wall" (l. 19477, (5), S9's text, "an aqueduct's arch that clears the gate and the wall, square to the deck").
    The untouched base carries this run only inside longer runs that already have reviewed rows, and its copy exits 0. Scope's
    proposal states it ("the run already stands twice in the untouched base (§2.7)"). So the hit is its new occurrence in scope's
    text. The two other sites (l. 2914, the way-and-channel table's row (b); l. 3352, row W13) were read: each is a byte-identical
    line of the untouched base. `allowrows.py` asserts all of this before writing the row.
* **Determinism's one:** "at a gate and a" (l. 11691, §7.3 (b) 3, D3's binding text "every way but a kept way at a gate and a standing
  raised way").

**One row by this seat's own review**, following the precedent of assemble-r3 to -r7 for hits no seat proposed. It is "fields outside the
model digest and inside the records digest" (l. 2304, §2.7's `Order` type, the comment on `Enceinte.laidAt` and
`RaisedWayRecord.courseAt`; the model's M11 with E-M2's sentence).
* The model's header records the run and proposes no row.
* The run is our own design terms (§6.2's model digest and records digest) in plain English.
* Its 3-grams meet only the program's own `research/findings/dwellings-synthesis.md`, which uses this design's digest terms (its
  l. 383, "outside the model digest and inside the records digest").

**Reviewed allow rows: 6**, in one block `# block: coherence/assemble-r7v` appended by `allowrows.py`.
* **Append only.** The script ran only after checking that the allow file's sha256 still equalled HEAD's.
* It stops unless every attributed hit is covered by exactly one rule:
  * a proposed row only where a proposing seat carries the text;
  * a reviewed row only where the named seat carries it, no seat proposed it, and the line the run starts on carries the quoted text;
  * both only for text held whole by no corpus file and absent from the untouched base, except the one run asserted above.
* The allow file goes from 2 409 to 2 416 lines (a header and 6 rows), sha256 `e272a355…` → `29300cf8…`. Its first 2 409 lines are
  byte-identical to HEAD.

**Allow rows not dropped.** The brief allows dropping rows that point at text this pass removed, "with a note". `staleallow.py` finds
**no** C3 row that matched the untouched set and matches nothing in the installed set: this round's blocks removed no reviewed text.
The eleven coherence-pass rows assemble-r7 listed as matching nothing still match nothing and stay, since the shared file is
append-only for this seat; the close may drop them. (In all, 360 C3 rows of the shared file match nothing in the base, the volumes,
INDEX or the rationale: 325 written before the coherence pass's first block, at file l. 1710, and 35 in the pass's own blocks,
assemble-r7's eleven among them. None was made stale by this round.)

**Volume information runs** (`volchecks.sh`, `volsummary.py`, recorded in `volchecks-final.txt`). Each volume and INDEX was run as a
whole document, untouched against installed, with `--heads` the matching base. Volume runs carry hundreds of unreviewed runs from
before this pass and are not held to exit 0, as in rounds 0–7.

The installed volumes add 5 new distinct unreviewed pairs and drop 1. All are C3 runs of this round's block text, ordinary words or a
law-number pointer:
* V04: +1, `s level and the hand` (V4-1's words). V04's header records it.
* V06: +1 / −1. Added: `over it and the same` (T-V6-11's seed condition). Gone: `just outside the ring s` (H-AQUA's old phrase).
  V06's header records both.
* V07: +1, `under the deck and the one` (V7-2's words). V07's header records it.
* V09: +1, `the gate and the wall a` (V9-8's §4.20.2 (4) text). V09's header records no doc-check run.
* V12: +1, `1 1 3 5 3` (V12-1's "law 1 (1), (3); §5.3's gate row"). V12's header records it.
* V01, V02, V03, V05, V08, V10, V11 and INDEX: 0.

No volume seat proposed a row in the allow file's tab form, so none is appended. They are listed for those volumes' seats or the close.

**The rationale** (information; not held to exit 0) is unchanged this round. It was run once, with `--heads` the installed base: C3
493 / 320 unreviewed and S2 17 / 15, equal to assemble-r7's.

## 6. Bundle

Before the run, `--check` reported the bundle STALE. `python3 tools/bundle_architecture.py` then wrote `docs/ARCHITECTURE-FULL.md`:
72 834 lines reported from 14 sources, 10 160 779 → 10 173 837 bytes, sha256 `43b2acf26728f90c…` → `ad01c5e7c6f23bbf…`. `--check` now
reports it UP TO DATE (exit 0).

## 7. Review ids and review markers in design text (ROUND-7 NOTES (9) (c), (e))

**Method.** `reviewids.py` counts citations of review-process ids in the live base, volumes and INDEX:
* the rulings `R<n>-nn`;
* every issue, conflict, wiring, inventory or probe id the coherence pass's own records define. These are `verify-*.md`,
  `adjudication-r*.md` (adjudication-r7v's among them), `famverify-*.md` (the `VF7-…` ids; read from this round on), `inventory-*.md`,
  `probe-r*.md`, canon, agreement, edges and wiring: 9 179 tokens, 233 of them `PRB…` ids;
* less any token the design itself defines, and the design id families.

A citation counts only outside the decision and request records. Those are, in the base, *Delegated decisions* and *Judgment calls*;
in the volumes, §9 Decisions, §10 Base change requests, §13 Fix list and Integration notes; anywhere, a J-, BCR-, X- or CVR- row.

**Separate counts for (9) (e)**, each over the whole set, records included:
* every `PRB…` token;
* every "(amended, …)" marker;
* every parenthetical opening with a J144–J151 id;
* every END-line id (`E-M2`, `E-S0`, `E-V6-20` …), which the design-id family rule would pass over;
* this round's narration forms ("adjudication-r7v", "fix pass", `END-L1`, `VF7-…`, `VPC-r6-…`) and Part H's line ids (`V6-7`,
  `V12-1` …).

The census is read-only: nothing was edited, and the verifiers raise any site.

**Results** (untouched → installed):
* **Design-text sites of review ids: 0 → 0.**
* **`PRB…` ids: 0 → 0.** "(amended, …)" markers: 0 → 0.
* **END-line ids: 2 → 2.** Both are V09 l. 4629's "(Part II, E-S33, E-S34)", design ids of Part II that stood before this round.
* **Round-7v narration forms: 0 new.** The "pass n / round n / Part H" list (104 → 104) is unchanged. It is the design's own "field
  pass 1 / 2" and way-drawing passes, plus one record site, V09 l. 4938 in its records.
* **Part H line ids: 1 → 1**, unchanged: V10 l. 1745 "V10-15", a site no block of this round touches.
* **Inside the records, 25 citations stand**, kept as records and unchanged: V03 9, V09 15, V10 1.
* **Change markers: 0.** The installed text carries nine parentheticals opening with a J144–J150 id (six before). Each cites an owner
  decision as the source of the rule beside it, the form the base already uses for its J rows. The three new ones are the model's M1:
  the laws' citations "in Part L's words" (adjudication-r7v's VF7-TBL-01 FIX, "No law changed"). All nine are listed for the
  verifiers:
  * base l. 2579, the laws' head: "normative (J146)";
  * **base l. 2653, *Held*: "Held is locked, on the axis named, and nothing else (J147)"** — new, bare in form;
  * base l. 2655, *held in placement*: "its shape still changing at a meeting (J144)";
  * **base l. 2706, law 1 (2): "nothing of either record written (J149)"** — new, bare in form;
  * base l. 2740, law 1 (10): "a placement-held thing's shape alone (J144)";
  * **base l. 2743, law 1 (10): "a gate made in it (J147, J150)"** — new;
  * base l. 19264, §13.2's T110-2: "(J147, J150), on a second run shape-locked";
  * base l. 19590, §13.2's T110-4: "nothing held because it was drawn or declared (J147)";
  * V07 l. 2314, §3.11: "its gates kept — never moved for a meeting (J148)".
  The model's fourth M1 citation, *The tiers* (base l. 2635), reads "(J148: the owner's rule and choice; the tier texts the
  program's)". Every J144–J151 mention in the set is listed in `reviewids-final.json` (24: base 20, V06 1, V07 2, V11 1).

Full lists: `reviewids-final.tsv`, `.json` and `.out`; `reviewids-untouched.tsv`, `.json` and `.out`.

## 8. Not placed, and left for the verifier

* **Unplaced: none.** Every block of the twelve files is applied. There is no RULING REQUEST, no ASSEMBLE NOTE, no swap and no double
  REPLACE, so there is no merge conflict and no lost hunk. No block targeted a missing or retitled heading.
* **Broken references: 0** (section 4), and no mechanical fix. Every §2.7 table name; every law, clause and term citation of §2.7's
  laws; and every worked-example and support-step citation resolves.
* **97 ambiguous-form references** (section 4.1, `ambiguous-refs.tsv`; 2 new, 2 rewritten in place). They read as the base's under S7;
  the verifier confirms each or prefixes it.
* **V04's hand-off to V06, open:** V06 l. 1049 (§3.2) still restates law 1 (8)'s replaced chamber clause — "has its chamber
  (`collapsed` where V04 §3.5.4 (d) (2) says)" — where the law now reads "has the chamber V04 §3.5.4 (d) lays" (section 2.4).
* **The support step (6)'s old term "held"** stands at one site, §7.4's raised-way row (base l. 12126). The model's sweep says it is
  kept until round 8 (section 4.4).
* **Owner-decision citations of a rule's source:** nine parentheticals (three new from the model's M1, two of them bare in form) and
  *The tiers*' "(J148: …)" (section 7). Review ids, PRB ids and change markers in design text: 0.
* **Hand-offs and observations recorded in the repair files' headers** (section 2.4) are not assembly work. Scope's to V06 is closed
  in the installed text.
* **Volume document checks:** 5 new volume hits without a row in the allow file (section 5, `volchecks-final.txt`), for those volumes'
  seats or the close.
* **No allow row is made stale by this round.** The eleven coherence-pass rows assemble-r7 listed as matching nothing still do. They
  are kept, since the shared file is append-only for this seat; the close may drop them (section 5).
* **The document checks are provisional** (section 5). Re-run them on the machine that holds the reference corpus. Of the 6 base rows,
  5 were proposed by the seats that wrote the text and 1 was reviewed by this seat alone.
* **Size:** the set is at +11.4 % words against the pre-coherence archive, outside the shrink band (section 3). Each repair file states
  what holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):**
* the 15 live files' sha256:
  * before: each equal to its HEAD blob at `d92c074`;
  * after: each equal to its final copy, re-checked after the checks and the bundle;
* the twelve repair files landed and committed;
* the routing of 40 blocks and the census: 0 missing, 0 ambiguous, 0 unclosed, 0 RULING REQUEST, 0 overlap, 0 double REPLACE, 0 retitle;
* the model's block applied first;
* 40 applied, with audit not-OK 0 and balanced fences in every file;
* the volume outputs against their seats' records:
  * three equal to their recorded sha256 (V05, V06, V12);
  * V01 and V07 equal to their recorded bytes and lines;
  * V04 on exactly its three recorded lines;
  * V09 equal to its recorded counts;
* the five base seats' stand-alone runs reproduced, their diffs disjoint, their union the combined diff, the growths summing;
* no heading added, removed or retitled;
* the reference counts of section 4: 0 broken, 0 FIX, every §2.7 table name, law, clause, term, worked-example and support-step
  citation resolving;
* scope's hand-off to V06 closed in the installed text, and V04's hand-off to V06 open;
* the document checks' counts of section 5, the installed copy exiting 0 on both key sets against one corpus snapshot;
* the allow file appended only, with no row made stale;
* the bundle regenerated and `--check` clean;
* the sizes of section 3 and no duplicate id definition;
* the review-id and marker census of section 7.

**PLAUSIBLE:**
* **That the 6 reviewed rows are false positives.** Each was attributed by script and read in context by this seat. Five were proposed
  by the seats that wrote the text; one has no second reader.
* **That V01's, V04's, V07's and V09's outputs equal their seats' generators.** Those seats record counts or lines but no hash, and
  every count matches.
* **That the ambiguous-form references read as their authors meant.** S7 reads them as the base's. The new and rewritten ones were
  checked by reading, the rest not one by one.
* **That `lawrefs.py` and `examples.py` catch every citation of §2.7's laws and worked examples.** They read:
  * a "law n" or "laws n–m", with the clause list right after it;
  * a law-2 head right after "law 2", and a term after "laws'";
  * the text after "its / their worked example(s)" up to the next ";" or unbalanced ")";
  * "support step (n)".
  A citation in another form (a bare *Order* in running text, a worked example named without "worked example") is not checked.
* **That the review-id census's token set is complete.** It reads:
  * the ids the coherence records define as headings, first table cells or bold labels;
  * the `R<n>-nn` rulings;
  * every `PRB…` token, every "(amended, …)" and J144–J151 parenthetical, every END-line id, and this round's narration forms.
  An id cited only in running text of a record would be missed.
