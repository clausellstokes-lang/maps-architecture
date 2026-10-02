# Assemble — coherence pass, round 7 second fix pass (the eleven repair-r7w block files applied to the base and the volumes)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r7w (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r7w`, 2026-10-02, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at c330616; base `2612044e…` as assemble-r7v installed
  it); untouched snapshot — done
- P2 block inventory and routing (11 files, 31 REPLACE: base 13, volumes 18; 0 missing, 0 ambiguous, 0 unclosed, 0 overlap,
  0 double REPLACE, 0 RULING REQUEST; the model's block first); ASSEMBLE NOTES census — done
- P3 apply (31 applied, audit not-OK 0; volume outputs equal their seats' records; the five base seats' stand-alone runs
  reproduced, disjoint, their union the combined diff), headings unchanged, install (7 of 15 changed) — done
- P4 references: 57 399 checked, 0 broken, 3 mechanical G-cite fixes (base 1, V06 2), 98 ambiguous-form listed; §2.7's laws
  (law, clause, term), its two tables, the worked-example and support-step citations, and 35 cross-unit anchors of this
  round's END lines all resolve — done
- P5 document checks, three-copy method: 2 allow rows (both proposed by the seats that wrote the text; scope's proposed row
  not written, see section 5); the combined copy exits 0 on both key sets (PROVISIONAL: corpus incomplete); volume
  information runs — done
- P6 bundle and `--check` — done
- P7 review-id and marker census (ROUND-7 NOTES (9) (c), (e)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r7w/`. Most are assemble-r7v's scripts
with the round label and the scratch folder (`scratchpad/coherence/asm7w/`) changed: `snapshot.py`, `route.py`, `apply.py` (which
runs `docs/validation/amendments-b/apply-blocks.py` unchanged), `headings.py`, `install.py`, `mirror.sh` with `refs.py` and
`refsreport.py`, `lawrefs.py`, `tablerefs.py`, `examples.py`, `checks.py`, `attrib.py`, `hitctx.py`, `staleallow.py`, `volchecks.sh`
with `volsummary.py`, `sizes.py`.

These are this round's own or changed:
* `alone.py`: its records are this round's five base headers (section 2.1).
* `volrec.py` (new): each volume output against its seat's recorded dry run (section 2.2).
* `fixrefs.py`: assemble-r3's (assemble-r0's logic), its paths changed. This round it has three fixes to make (section 4.1).
* `endrefs.py` (new): the named things this round's cross-unit citations point at, each checked defined at its home (section
  4.5). ROUND-7 NOTES (9) (b) asks for this once both ends are in.
* `allowrows.py`: this round's two proposed rows, the same two rules. It also asserts that scope's proposed run stands nowhere in
  the installed set (section 5).
* `reviewids.py`: it also counts the round-7w narration forms ("adjudication-r7w", "r7w", `VF7v-…`, `R7-01`).
* `unitsizes.py`: it measures each unit's covered text in the blocks' output, so the assembler's three prefixes are counted
  apart.
* `after.py` (new): the final sha256 of every live file, each checked equal to its final copy.

No live text was edited by hand. The only assembler change after the blocks is the three mechanical G-cite prefixes. Each
script's records sit beside it:
* routing and application: `snapshot.json`, `blocks.json`, `split/`, `logs/`, `apply.json`, `alone.json`, `volrec.json`,
  `headings.json`, `install.json`, `after.json`;
* references: `refs-before.out`, `refs-first.out`, `refs-final.out`, `refs-summary.json`, `ref-fixes.tsv`, `fixrefs.json`,
  `ambiguous-refs.tsv`, `ambiguous-diff.txt`, `external-refs.tsv`;
* the laws, tables, examples and anchors: `lawrefs-*.out` and `.json`, `tablerefs-*`, `examples-*`, `endrefs.out`, `endrefs.json`;
* document checks: `checks-first.json`, `checks.json`, `c3-attribution-new.tsv`, `c3-attribution.tsv`, `hitctx.tsv`,
  `staleallow.json`, `volchecks-final.txt`;
* sizes and census: `sizes.json`, `unitsizes.json`, `reviewids-untouched.*`, `reviewids-final.*`.

## Outcome

**All eleven repair files had LANDED before this seat started** (ROUND-7 NOTES (9) (d)). Each has a
`coherence/repair-<unit>-r7w LANDED` line in the lane log and its result in `results/coherence_repair-<unit>-r7w.json`. All eleven
are committed at HEAD `c330616`. Kernel, V02, V03, V05, V08, V11 and V12 had nothing to repair this pass, so they have no file.

**Blocks: 31 found, 31 applied, 0 skipped.**
* All 31 are REPLACE blocks: 13 for the base, 18 for six volumes. There is no J-ROWS, RATIONALE-A or RULING REQUEST block.
* No heading was missing or ambiguous, and no block was truncated.
* No two blocks touch one subsection: there is no double REPLACE and no nesting. So no three-way merge was needed, and no heading
  was retitled.
* The audit finds every applied body exactly once, and the fences are balanced in every file.
* Every volume output equals its repair seat's recorded dry run:
  * V06 by sha256;
  * V01, V04 and V07 by bytes, lines and the exact live lines changed;
  * V10 by lines and the one changed line;
  * V09 by its counts and per-section words.
* Each of the five base seats' recorded stand-alone dry runs is reproduced (model and scope by sha256 prefix as well). Their diffs
  are pairwise disjoint, and their union is the combined run's diff.

**The model's block was applied first** (ROUND-7 NOTES (9) (e)). This round the model writes §2.7 alone (one REPLACE: 14
count-asserted substitutions, all inside the support step (6)'s worked examples; no law changed). After all eleven files were in,
every citation of "§2.7's laws" by law, clause or term was checked against what the installed laws define. So was every table,
worked-example and support-step citation. **All resolve.** The 35 cross-unit anchors this round's END lines name are each
defined at their homes (section 4.5).

**ASSEMBLE NOTES and swaps: none** (section 2.5). No header carries an ASSEMBLE NOTE, a swap or a restated row.
* Three proposed allow rows were reviewed. Two were written (determinism's, rendering's).
* Scope's row was not written: the installed text no longer holds its run (section 5).

**Nothing is unplaced.** The round adds, removes and retitles no heading.

**Size.** The set (base and volumes) goes from 9 890.9 KB to 9 900.5 KB (+0.1 % in bytes and in words):
* the base grows by 1 144 words (+0.2 %): 1 143 of them block text, plus one "V06" of the G-cite fix;
* the volumes grow by 571 words (+0.05 %): 569 of them block text, plus two "V06" of the G-cite fix.
Every block word is ruled FIX, END or CLASS text.

**References.**
* 57 399 references are checked. **None is broken**, before or after.
* **3 needed a mechanical fix**, all of the class FIX: a bare `§x` continuing a V06 list that only V06 has. The canon's S7 G-cite
  prefix was inserted, as assemble-r0 and assemble-r2 did. There is 1 in the base and 2 in V06.
* 98 references resolve but are ambiguous in form (97 before).

**Document checks.** The installed document exits 0 over every top-level key and over the eight `#` keys, against one corpus
snapshot.
* This needed 2 reviewed allow rows.
* The result is **provisional**, because the reference corpus is incomplete in this checkout.
* The installed document's total is **3 770 hits** (C1 5, C2 1, C3 3 438, C4 12, S1 0, S2 314), 0 unreviewed.

**Bundle.** `docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes.

**Review ids and review markers in design text** (ROUND-7 NOTES (9) (c), (e)):
* **0** review-id sites outside the decision and request records (0 before);
* **0** `PRB7…` ids, **0** "(amended, …)" markers and **0** "(J146, PRB7…)" markers in the base, the volumes and INDEX;
* **0** round-7w narration forms ("adjudication-r7w", "r7w", `VF7v-…`, `R7-01`, "family fix pass") in the base, the volumes and
  INDEX;
* **no new owner-id parenthetical.** The nine standing ones are unchanged; each cites a rule's source (section 7).

## 1. Live files — sha256 before and after

**Before:** the committed text at HEAD `c330616dfded`. Each live file equalled its HEAD blob. These are assemble-r7v's outputs:
* the base is `2612044ee57e7324…`, ROUND-7 NOTES (4)'s merge base;
* every repair file was written against them.

**After:**
* `install.py` wrote the blocks' outputs, only after confirming each live file still held its P1 sha256. It verified each written
  file byte-identical to its final copy.
* `fixrefs.py` then wrote the three G-cite prefixes (section 4.1) into the base and V06. It wrote the live file and the final copy
  alike, guarded by their equality.
* No later step changed a live design file. After P5–P7, `after.py` re-checked every live file equal to its final copy.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 3 201 924 | 3 208 376 | `2612044ee57e7324f1e40e0b5329d1f55360ce9b95a8c70c7d30969a0299b9d0` | `561d554110258e3bef6f756b46200b8a3d8b2f00f3c4c72853e33c9fde678f77` (blocks alone: `fe67093c3f28a6e4aa356c514de9d041d8f7f2545ca958a375f3aac584d10896`) |
| `docs/ARCHITECTURE-RATIONALE.md` | 704 813 | 704 813 | `7e172500f6a791c5cf1e667c657309b6a49ee067dc130a05d82e605a06579c39` | unchanged (no block) |
| `docs/volumes/V01-neighbourhoods.md` | 529 041 | 529 232 | `b8430af89b39c5933d50eb939d806e43a348e7b9d34ebce9ba1701e7fa5a1bb4` | `5c0ea6757d0cb7cc3a866131961f817cb031919d1276b0dc33def3e95c3b9b1a` |
| `docs/volumes/V02-buildings.md` | 565 121 | 565 121 | `c7fbb7055d776409fe0f906059fcf943198ecb81de065054674be4859cef4540` | unchanged (no block) |
| `docs/volumes/V03-interiors.md` | 467 810 | 467 810 | `894955c29098f435f9f483c2c0991fe7ebfc79b19d4dd0e0a2c078e676266792` | unchanged (no block) |
| `docs/volumes/V04-underground.md` | 535 894 | 536 408 | `c9c990b288b0e66f000127acf79ed94ab10551921737512b56eb728fa75cafd2` | `caf4af3c0221629dbbec859d06a8542e60db394b8b3d751e74700449ee12a43a` |
| `docs/volumes/V05-sky.md` | 404 696 | 404 696 | `1931fec160a4b146d1778deac28413dc329bae2868d8542f4967116a695e671f` | unchanged (no block) |
| `docs/volumes/V06-evolution.md` | 708 994 | 710 871 | `132b96bbcd7239eeee139171bedcec11695e69e9e509695d4753e76a447b2824` | `f829ee6a91265e76b508310705167c8a27eb05a1a96cd2394401cfe567f187c1` (blocks alone: `abce709f7c49a3a0d29edfd48aaada44dbf7a40bdd43298cd9bd3c86a0264455`) |
| `docs/volumes/V07-village.md` | 621 938 | 622 153 | `a8cb10b027f8c04e79f9a9c6472c0cf2b3d64d45c4a3bc92b6f17b64b3db2d7d` | `4e2b51c8632803a3d101e0d41263552fea84617478014f65194c63b6c95aa343` |
| `docs/volumes/V08-settlementforge.md` | 582 193 | 582 193 | `83382cac1e496ffb29d7ca1d9ea1ed3c7b37978ddedd915ee50f73c89ca1b491` | unchanged (no block) |
| `docs/volumes/V09-application.md` | 778 754 | 779 271 | `bf6d52c1fbb76402b2c4db6306a635458a3151e1a3839245ecdf44a34874aced` | `e76c3c2ccc6b600e2b592311ebde61b995c5f25398700174ba7a89188bc1be1e` |
| `docs/volumes/V10-clerk.md` | 524 498 | 524 582 | `4988e5ae15e19a0e3b7977a673785d83cbd92e9e03d38ae93130511f0b65a019` | `cb4d9cffb49f1bc3cb489a515a316f2e7046f6c44a4116cd895d891022762bc0` |
| `docs/volumes/V11-content.md` | 681 412 | 681 412 | `67c7c0b837e1c53a1c428d75485da9c5e54c193428a0c9ba86a36f71aae86dfc` | unchanged (no block) |
| `docs/volumes/V12-calibration.md` | 526 016 | 526 016 | `3f20cb1fbf132b75ffdbd881b97084797c8203a63355587d1de977315f792b89` | unchanged (no block) |
| `docs/volumes/INDEX.md` | 24 074 | 24 074 | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` | unchanged (no block routes to it) |

Also written:
* `docs/ARCHITECTURE-FULL.md`, the bundle (section 6);
* `docs/validation/doc-checks-allow.tsv`, one appended block (section 5).

## 2. Blocks — routing, application, audit

**The block files** are exactly `docs/validation/coherence/repair-r7w-<unit>.md` for the eleven units (ROUND-7 NOTES (1)): model,
pipeline, determinism, rendering, scope, V01, V04, V06, V07, V09 and V10. `blocks.json` records each one's sha256 as read.
Everything under `work/` and the bench files is the repair seats' working material, never blocks.

**Routing** (`route.py`):
* Each file was cut at its `=== FILE <path> ===` lines. Every block went to the file its nearest FILE line above names, or the base
  when there is none (ROUND-7 NOTES (3)).
* Each volume file has one FILE line naming its own volume, and the five base files have none. No file carries blocks for more
  than one document, and none routes to INDEX.md or the rationale.
* **Order:** each split file keeps its repair file's basename behind an order prefix: `a-` for `repair-r7w-model.md`, `b-` for
  every other. `apply-blocks.py` applies its files in name order. So the base run applies the model's §2.7 block first, then
  determinism's, pipeline's, rendering's and scope's (ROUND-7 NOTES (9) (e)). The base log's first audit entry is the model's
  block, and the base ran before the volumes.
* The FILE lines are left out (they are routing, not blocks); every other line is verbatim.
* Each volume ran with a throwaway rationale whose output equals its input.
* No text follows any file's last END.

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST, and 0
overlaps of any kind. No two blocks of the round, within one unit or across units, cover one subsection or nest. Two consequences:
* **No double REPLACE.** The brief's `git merge-file` step had nothing to merge (its merge base: the subsection as assemble-r7v
  installed it, base `2612044ee57e7324…`). So there is no conflict and no lost hunk to report (ROUND-7 NOTES (4)).
* **No retitled target.** Every block was found on the text as it stood, and every body opens with its own target heading (ROUND-7
  NOTES (5)).

| unit | blocks found | applied | skipped | target | covers | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|---|
| model | 1 | 1 | 0 | `ARCHITECTURE.md` (applied first) | §2.7 | 31 657 → 31 663 (+0.0 %) | 185.5 → 185.5 |
| determinism | 4 | 4 | 0 | `ARCHITECTURE.md` | §5.2, §5.4, §7.1, §7.4 | 31 578 → 31 800 (+0.7 %) | 189.3 → 190.6 |
| pipeline | 4 | 4 | 0 | `ARCHITECTURE.md` | §4.1, §4.2, §4.4, II.7.6 | 25 507 → 25 685 (+0.7 %) | 152.9 → 153.8 |
| rendering | 2 | 2 | 0 | `ARCHITECTURE.md` | §8.2, §8.3 | 23 572 → 23 662 (+0.4 %) | 135.0 → 135.5 |
| scope | 2 | 2 | 0 | `ARCHITECTURE.md` | §13.2, §13.8 | 31 194 → 31 841 (+2.1 %) | 187.6 → 191.3 |
| V01 | 4 | 4 | 0 | `V01-neighbourhoods.md` | §3.17.3, §5.1.1, §5.1.2, §5.1.3 | 3 254 → 3 289 (+1.1 %) | 18.5 → 18.7 |
| V04 | 1 | 1 | 0 | `V04-underground.md` | ## 7 | 8 912 → 9 005 (+1.0 %) | 52.0 → 52.5 |
| V06 | 6 | 6 | 0 | `V06-evolution.md` | §2.10, §3.2, §3.7, §3.19, ## 7, ## 8 | 33 317 → 33 623 (+0.9 %) | 199.2 → 201.1 |
| V07 | 2 | 2 | 0 | `V07-village.md` | §3.13, ## 7 | 11 349 → 11 386 (+0.3 %) | 64.7 → 64.9 |
| V09 | 4 | 4 | 0 | `V09-application.md` | §4.9, §4.20.2, §5.5, §7.1 | 26 368 → 26 451 (+0.3 %) | 157.8 → 158.3 |
| V10 | 1 | 1 | 0 | `V10-clerk.md` | §7.1 | 6 457 → 6 472 (+0.2 %) | 38.4 → 38.5 |
| **total** | **31** | **31** | **0** | | | | |

"Covered text" compares, for each REPLACE, two sections:
* its target's section in the untouched file;
* the section of its body's heading in the blocks' output (before the assembler's three prefixes, which add 1 word to scope's
  §13.2 and 2 to V06's ## 7).

**Each unit's block count matches its header, its result file and the orchestrator's count of 31:** model 1, pipeline 4,
determinism 4, rendering 2, scope 2, V01 4, V04 1, V06 6, V07 2, V09 4, V10 1.

**Each unit's word change matches its header.** Headers count with `wc` or by whitespace, so a few words can differ.
* **Equal:**
  * model +6 (31 657 → 31 663);
  * determinism +222;
  * pipeline +178;
  * rendering +90 (§8.2 +82, §8.3 +8);
  * scope +647 (§13.2 +641, §13.8 +6);
  * V04 +93;
  * V06 +306;
  * V07 +37.
* **V09: +83, its per-section counts reproduced exactly.** They are §4.9 13 149 → 13 199, §4.20.2 1 329 → 1 339, §5.5 306 → 306
  and §7.1 11 584 → 11 607. Its volume figure, "126,174 to 126,256 words (wc)" (+82), is another count: the volume's `wc -w` is
  128 609 → 128 692.
* **V10: +15**, equal to its §7.1 change. Its absolute counts (6,405 → 6,420; volume 83,569 → 83,584) are another count method,
  and its delta is reproduced.
* **V01: +35.** Its header says +34; its absolute 85 192 is another count, and `wc -w` gives 86 861 → 86 896.

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines (balanced) | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 13 | 13 | 0 | 153 → 153 | 140 → 140 | `fe67093c3f28a6e4` | each seat's stand-alone run reproduced (section 2.1); index 805 rows and Part A 805 rows, no duplicate id |
| `V01-neighbourhoods.md` | 4 | 4 | 0 | 123 → 123 | 12 → 12 | `5c0ea6757d0cb7cc` | equal: 529 041 → 529 232 bytes, 3 759 → 3 762 lines; the diff touches exactly l. 2473–2474, 2905, 2976–2977, 3024 and inserts one row after 3029 |
| `V04-underground.md` | 1 | 1 | 0 | 59 → 59 | 12 → 12 | `caf4af3c0221629d` | equal: 535 894 → 536 408 bytes, 3 644 → 3 644 lines; the diff touches exactly l. 3164 and 3181 |
| `V06-evolution.md` | 6 | 6 | 0 | 65 → 65 | 28 → 28 | `abce709f7c49a3a0` | equal: sha256 `abce709f7c49a3a0d29edfd48aaada44dbf7a40bdd43298cd9bd3c86a0264455`, 710 863 bytes, 4 676 lines |
| `V07-village.md` | 2 | 2 | 0 | 58 → 58 | 18 → 18 | `4e2b51c8632803a3` | equal: 621 938 → 622 153 bytes, 4 125 → 4 125 lines; the diff touches exactly l. 2770 and 3710 |
| `V09-application.md` | 4 | 4 | 0 | 110 → 110 | 24 → 24 | `e76c3c2ccc6b600e` | equal in its counts (4 / 4 / 0, audit OK, headings and fences unchanged, title block unchanged) and its per-section words; the word diff shows exactly V9-1 – V9-4's texts (no hash recorded) |
| `V10-clerk.md` | 1 | 1 | 0 | 86 → 86 | 24 → 24 | `cb4d9cffb49f1bc3` | equal: 3 580 → 3 580 lines, the only changed line l. 3156 (no hash recorded) |

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
| model | 1 / 1 / 0 / 0 | 24 116 → 24 117 | 29 lines, all inside §2.7 (l. 2249–3519): 2914, 3061–3062, 3076–3085, 3158–3159, 3184–3185, 3188–3189, 3260–3261, 3331–3332, 3340–3341, 3347, 3353, 3369–3370 | headings 153 → 153, fences 140 → 140, title block unchanged, rationale byte-identical, 24 116 → 24 117, sha256 `406b4779366…`, every line outside §2.7 byte-identical |
| determinism | 4 / 4 / 0 / 0 | 24 116 → 24 120 | l. 9852–9853, 9869, 9982, 11145–11150, 11306, 11338, 12022 | exactly its hunk list (§7.1 *Raised ways* re-wrapped to two more lines, §7.4 *Independence* to three lines) |
| pipeline | 4 / 4 / 0 / 0 | 24 116 → 24 118 | l. 5710, 5962, 6226, 6297, 6601–6602, 6633–6636, 22795 | exactly its 12 edits' lines, the four l. 6633–6636 becoming six; rationale byte-identical |
| rendering | 2 / 2 / 0 / 0 | 24 116 → 24 118 | l. 14147, 14176–14177, 14198, 14307, plus row 19a inserted after l. 14153 | exactly its recorded lines, rationale byte-identical |
| scope | 2 / 2 / 0 / 0 | 24 116 → 24 154 | 36 lines in §13.2 and §13.8 (20 hunks) | 2 audit OK, headings 153 → 153, fences 140 → 140, 24 116 → 24 154 lines, 3 201 924 → 3 205 750 bytes, sha256 `507ecda2…`, 20 hunks, rationale unchanged |

**All five equal their records.**

**The five diffs are disjoint.** No old line is touched by two seats. The union of the five touched-line sets (94 old lines) equals the
combined run's touched set. The combined base grows by 47 lines, which is the sum of the five stand-alone growths
(1 + 4 + 2 + 2 + 38): 24 116 → 24 163.

### 2.2 The volume seats' dry runs, reproduced (`volrec.py`, `volrec.json`)

Each volume output was compared with what its seat's header records:
* V06's sha256 is equal.
* V01's, V04's and V07's bytes, lines and the exact live lines the diff touches are equal.
* V10's lines and its one changed line are equal.
* V09's per-section word counts are equal (section 2's table). Its header records no hash and no line list.

### 2.3 Headings, RULING REQUEST blocks

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents. Each count is
unchanged: base 153, INDEX 9, V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67.

**RULING REQUEST blocks: 0** (ROUND-7 NOTES (2), (9) (f)):
* each repair header and result file records 0;
* no `=== RULING REQUEST` line stands in any of the eleven files.

### 2.4 The model's block applied first, and the other units' citations of the laws

ROUND-7 NOTES (9) (e) names the model's blocks "§2.2, §2.7, §2.8". This round the model writes §2.7 alone, as its header says: 1
REPLACE, the live §2.7 with 14 count-asserted substitutions (M1–M7 and the sweep's SW1–SW3). Every edit is inside the support step
(6)'s worked examples, and no law changed.

It was applied first. Every citation of it was checked after all eleven files were in (section 4).

### 2.5 NOTES FOR ASSEMBLE — the census (ROUND-7 NOTES (9) (a))

I read all eleven preambles. I looked for every line that names Assemble or the assembler, a swap, a title block, a restated row, a
J-ROWS or RATIONALE-A row, a proposed allow row, a NOTE or a HAND-OFF.

**No header carries an ASSEMBLE NOTE, a swap instruction or a restated J-ROWS or RATIONALE-A row.**
* Every volume unit records its title block untouched.
* No base unit writes a J-ROWS or RATIONALE-A block.
* So `final/` is `apply.py`'s output plus the three G-cite prefixes. The rationale, V02, V03, V05, V08, V11, V12 and INDEX.md are
  carried unchanged.

**Three proposed allow rows are addressed to the assembler** (tab form; the allow file is the assembler's to write):
* **Determinism's:** "law 1 2 5 6 10", in §7.1 *Raised ways*, D3's citation "(item 363; §2.7's laws, law 1 (2), (5), (6), (10);
  …)".
* **Rendering's:** "law 1 2 3 5", in §8.2's row 19a, R1's citation "(§2.7's laws, law 1 (2), (3), (5))".
* **Scope's:** "3 1 3 2 3 7", in §13.2's T110-2 (1), S9's "V06 §3.1, §3.2, §3.7.5".
Each was reviewed. The first two were written; scope's was not, since the G-cite fix leaves its run nowhere in the installed set
(section 5).

**The volume headers record their volume doc-check results** and propose no tab-form row:
* V06 records three new C3 runs: "3 1 3 2 3 7", "3 2 3 19 2" and "law 1 2 4 6 10". After the G-cite fix, only the third stands.
* V01, V04, V07 and V10 record none.
As in rounds 0–7v, no row is appended for volume runs (section 5).

**HAND-OFFS and observations in the headers** are for the adjudicator and the next verifiers, not assembly work. They stand in the
repair files. Each "both ends" claim was checked in the installed text.

Every hand-off has both ends installed:
* **V06 ↔ scope:**
  * S9 / V6-1, the ring "placement-locked by the script": T110-2 (1) and T-V6-73.
  * S6 / V6-7, the founded viaduct's "epoch walled stage's spawned primary": base 2 sites, V06 2 sites.
* **V06 ↔ pipeline:** P7 / V6-2. II.7.6 holds "finds too small, reported". V06 §3.2 now reads "has the chamber V04 §3.5.4 (d) lays
  (law 1 (8))".
* **V06 ↔ V07 and determinism:** V6-3 / V7-2 / D5, a shape-locked raised way's `vault`-use span's strip. It stands in V06 §3.7.1,
  V07 §3.13's F-V-RAISED and §5.2's F-WALL and F-REDERIVE.
* **determinism ↔ V09:** D3 / V9-3, the placement-locked fate *reshaped*, in §7.1 and V09 §4.20.2. D6 / V9-1, the castle sited or
  resized by hand, in §7.1 and V09 §4.9.
* **determinism ↔ scope:** D2 / S10, `refuse.undo.dependent` naming the `drawWall`; law 4 in §7.4 *Independence*.
* **model ↔ determinism:** M7 / D4, the hand op's own pull "within its own search band", at W1 and §5.2's F-WALL.
* **model ↔ pipeline:** M6 / P1–P2, *beneath* citing "the one list" of §4.4 S5a *Trace* (2).
* **rendering ↔ V01:** R1 / V1-2, slot 19a. It is defined in §8.2's layer-order table and V01 §5.1.3's table.
* **V04 ↔ scope:** V4-1 / S7, S11, the fixture seed conditions.

**The round-7v hand-off that was open is closed.** That is V04's to V06 at V06 §3.2, the restated chamber clause. V6-2 wrote it, and
the old text ("has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says)") no longer stands.

**Observations for the adjudicator, listed in section 8:**
* **model → adjudicator:** three §2.7 examples restate S5a's narrower pin trigger, which pipeline's P3 widens. They are *beneath*
  (installed l. 3082–3083), the way-and-channel table's row (d) gates cell (l. 2916) and row W1's last column (l. 3340). The model
  calls this a candidate citation conform.
* **pipeline:** P2's "each widened all round by the wall strips' width there" reads over the `vault`-use spans' strips. Also,
  §4.11's `carve` way rule keeps its words.

ROUND-7 NOTES (9) (b) is met: all eleven files were applied before the reference check (section 4).

## 3. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | lines before → after | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|---|
| base | 3 201 924 | 3 208 376 | +0.2 % | 521 040 | 522 184 | +0.2 % | 24 116 → 24 163 | 3126.9 → 3133.2 |
| V01 | 529 041 | 529 232 | +0.0 % | 86 861 | 86 896 | +0.0 % | 3 759 → 3 762 | 516.6 → 516.8 |
| V02 | 565 121 | 565 121 | 0.0 % | 94 571 | 94 571 | 0.0 % | 4 227 → 4 227 | 551.9 → 551.9 |
| V03 | 467 810 | 467 810 | 0.0 % | 79 495 | 79 495 | 0.0 % | 3 304 → 3 304 | 456.8 → 456.8 |
| V04 | 535 894 | 536 408 | +0.1 % | 87 360 | 87 453 | +0.1 % | 3 644 → 3 644 | 523.3 → 523.8 |
| V05 | 404 696 | 404 696 | 0.0 % | 68 398 | 68 398 | 0.0 % | 3 096 → 3 096 | 395.2 → 395.2 |
| V06 | 708 994 | 710 871 | +0.3 % | 116 112 | 116 420 | +0.3 % | 4 667 → 4 676 | 692.4 → 694.2 |
| V07 | 621 938 | 622 153 | +0.0 % | 103 027 | 103 064 | +0.0 % | 4 125 → 4 125 | 607.4 → 607.6 |
| V08 | 582 193 | 582 193 | 0.0 % | 92 453 | 92 453 | 0.0 % | 3 735 → 3 735 | 568.5 → 568.5 |
| V09 | 778 754 | 779 271 | +0.1 % | 128 609 | 128 692 | +0.1 % | 5 045 → 5 045 | 760.5 → 761.0 |
| V10 | 524 498 | 524 582 | +0.0 % | 84 911 | 84 926 | +0.0 % | 3 580 → 3 580 | 512.2 → 512.3 |
| V11 | 681 412 | 681 412 | 0.0 % | 113 848 | 113 848 | 0.0 % | 5 470 → 5 470 | 665.4 → 665.4 |
| V12 | 526 016 | 526 016 | 0.0 % | 85 347 | 85 347 | 0.0 % | 3 561 → 3 561 | 513.7 → 513.7 |
| INDEX | 24 074 | 24 074 | 0.0 % | 4 054 | 4 054 | 0.0 % | 202 → 202 | 23.5 → 23.5 |
| rationale | 704 813 | 704 813 | 0.0 % | 119 127 | 119 127 | 0.0 % | 2 386 → 2 386 | 688.3 → 688.3 |
| **base + volumes** | 10 128 291 | 10 138 141 | +0.1 % | 1 662 032 | 1 663 747 | +0.1 % | | **9890.9 → 9900.5** |
| **volumes** | 6 926 367 | 6 929 765 | +0.05 % | 1 140 992 | 1 141 563 | +0.05 % | | 6764.0 → 6767.3 |
| **base + volumes + INDEX** | 10 152 365 | 10 162 215 | +0.1 % | 1 666 086 | 1 667 801 | +0.1 % | | 9914.4 → 9924.0 |

Words are whitespace-split, as rounds 0–7v counted them; a seat's `wc -w` figure can differ by a few. The base's +1 144 is the
blocks' +1 143 plus the one "V06" of the G-cite fix. V06's +308 is its blocks' +306 plus two.

**Why every changed unit grows.** This pass repairs round 7's second family findings under adjudication-r7w's Part H. Each FIX, END
or CLASS line adds a citation, a case, a fixture's seed condition or a bar clause that its finding requires.
* The largest is scope's §13.2: the class rule, fixtures' seed conditions, runs and take-overs (+641).
* Next come V06's T-V6-73 lock and take-overs, T-V6-47's seed conditions and the harbour-mouth chain's laws (+306), then
  determinism's §5.2, §7.1 and §7.4 (+222), and pipeline's widened impassables, S5a's pin trigger and the carried way's gate (+178).
* The only removals are restatements:
  * the model's M6 strikes *beneath*'s restated impassables list (−119), for a citation of §4.4 S5a *Trace* (2);
  * row 14's reason in V01 and the base moves whole to row 19a.
* The assembler may not compress text.

**Against the shrink goal.** The band is 25–40 % fewer words than the pre-coherence archive, which held 1 491 685 words for base and
volumes.
* The set now stands at 1 663 747 words: +11.5 % against the archive (+11.4 % before this round).
* No unit shrank, so none shrank by more than half.
* Each repair file states what holds its unit; several cite the brief's note that this family fix pass should be small.

**Duplicate id definitions across the set** (principle (4)): **none** (`sizes.py`). The census covers the judgment index, Part A,
D-n, T-ER, every volume's T-Vn-m and J-Vn.m rows, and `_integrate.md`'s J-VI rows. The resolver's defined ids are unchanged at
3 468: no id was added, removed or renumbered.

## 4. References

### 4.1 The resolver and the mechanical fixes

**The resolver.** This is assemble-r0's `refs.py` (citation form canon S7: a bare `§x` is the base's; a volume's section is `Vnn
§x` everywhere), unchanged but for its root. It ran on two mirror trees (`mirror.sh`), the untouched set and the final set. Each
tree had `_integrate.md`, files f and g, `research/` and `docs/volumes/critique/` linked in.

**What it checks.**
* **The forms:** every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…`, with lines read joined.
* **The targets:** the headings and ids that now exist. The numbered targets are unchanged by the round: base 147, V01 121, V02 99,
  V03 53, V04 66, V05 60, V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8. Defined ids: 3 468.

**Ordering.**
* All eleven files were applied before the run (ROUND-7 NOTES (9) (b)), the model's block first ((9) (e)). So every cross-unit
  citation of Part H's END lines is read with both its ends in place.
* The untouched run's printout is byte-identical to assemble-r7v's final run (`refs-before.out` = assemble-r7v's `refs-final.out`).

| class | untouched set | final set, first run | final set, after the fixes | meaning |
|---|---:|---:|---:|---|
| resolved | 57 105 | 57 160 | 57 163 | the target exists |
| external | 131 | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 97 | 98 | 98 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 3 | 0 | a bare `§x` that only one volume of its list has: the mechanical G-cite prefix |
| BROKEN | 0 | 0 | 0 | no target |
| **total** | 57 340 | 57 399 | 57 399 | |

**Broken: 0**, before and after.

**Mechanical fixes: 3** (`fixrefs.py`, assemble-r0's logic, as assemble-r2 applied it; `ref-fixes.tsv`, `fixrefs.json`).

**What the first run of the final set found.** Three references of class FIX, all in this round's block text. Each is a bare `§x`
continuing a V06 list that no base heading has and only V06 has:
* **base l. 19310**, §13.2's T110-2 (1), scope's S9 text: "repairs no run of it: V06 §3.1, §3.2, §3.7.5" → "V06 §3.1, §3.2, V06
  §3.7.5";
* **V06 l. 4255**, T-V6-73, V6-1's text in the same words: "V06 §3.1, §3.2, §3.7.5" → "V06 §3.1, §3.2, V06 §3.7.5";
* **V06 l. 4193**, T-V6-11, V6-8 · C12's text: "(V06 §3.2, §3.19 (2))" → "(V06 §3.2, V06 §3.19 (2))".

**Why these are mechanical.** This is the class assemble-r0 fixed mechanically (488) and assemble-r2 fixed (2) under the same brief
wording: the rename every volume rewrite records (G-cite, canon S7: every section of a list carries its prefix, self-references
included). Each fix inserts "V06 " before the `§`.

**Guards and results.**
* `fixrefs.py` wrote each file only where the live file equalled the final copy the resolver read. It wrote both alike.
* The base and V06 texts of T110-2 (1) and T-V6-73 stay word-identical in their list.
* After the fixes, the resolver finds all three resolved, and no other class moved.
* Base: `fe67093c3f28a6e4…` → `561d554110258e3b…`. V06: `abce709f7c49a3a0…` → `f829ee6a91265e76…`.
* No repair file records a renumbering.

**What the fixes do not touch.** The bare `§3.2` in the same two "V06 §3.1, §3.2, …" lists is **ambiguous**, not FIX: the base too
has a §3.2. Under S7 it reads as the base's, and the assembler may not choose (assemble-r0). Both sites are new in the ambiguous
list (below). The sense of each clause (the epoch's phase order, `fortification` before `raisedWays`) points at V06 §3.2. The
verifier confirms each or prefixes it.

**Ambiguous form: 98** (97 before), listed in `ambiguous-refs.tsv` with unit, line, reference, the list's head volume and context:
base 20, V01 15, V02 13, V03 12, V04 1, V05 4, V06 6, V07 2, V09 7, V10 6, V11 10, V12 2. Each resolves under S7 as the base's; the
verifier confirms each or prefixes it.

The round's changes to this list (`ambiguous-diff.txt`), all checked by reading:
* **Two sites new.** Both are the bare `§3.2` of "V06 §3.1, §3.2, V06 §3.7.5":
  * base l. 19310, T110-2 (1);
  * V06 l. 4255, T-V6-73.
* **One site gone.** V06 l. 4193 (formerly l. 4184), T-V6-11's "(§2.7's support step (3))". It now follows the closed list "(V06
  §3.2, V06 §3.19 (2))" that C12 inserts before it, and resolves plainly as the base's.

**External: 131** (bare 120, bare-cont 1, J 10), listed in `external-refs.tsv`.

### 4.2 §2.7's laws, cited by law, clause and term (ROUND-7 NOTES (9) (e); `lawrefs.py`, `lawrefs-*.json`)

The resolver reads section numbers, not the law, clause and term names that the other units cite from §2.7's laws. `lawrefs.py`
does that:
* it parses the installed laws, from "(0) **§2.7's laws**" to "**Worked examples**";
* it then checks every citation of them in the installed base, volumes and INDEX, with lines read joined.

**What the laws define** (unchanged by this round):
* **law 1:** the clauses (1)–(11);
* **law 2:** the heads *Entry*, *Newer*, *Not yet built*, *The soft readings*, *Carried way* and *A warp*; the steps (a)–(c); the labels
  (G1) and (G3);
* **law 3:** the keys (1)–(3);
* **law 4:** the label (G2);
* **the Terms:** 47 bold or italic terms, with *newly*, *deepens*, *The check* and *Show me why*.

**What is cited** (untouched → installed):
* **citations of a law by number: 853 → 914.** By unit: base 597, V01 10, V04 39, V05 1, V06 122, V07 69, V09 49, V10 8, V11 16,
  V12 3.
* **clause citations, numeric ranges expanded: 877 → 939.**
  * law 1: (1) 45, (2) 106, (3) 63, (4) 70, (5) 110, (6) 76, (7) 45, (8) 136, (9) 34, (10) 43, (11) 20;
  * law 2: (a) 89, (b) 15, (c) 72;
  * law 4's (G2): 15.
* **term and head citations: 93 → 96.**
  * law 2 heads: *Entry* 28, *Carried way* 24, *Newer* 6, *Not yet built* 6, *A warp* 1;
  * "laws' *x*": *Order* 14, *held* 6, *what stands of a wall* 3, *Newer* 2, *anything across a strip* 2, and *The check*, *beyond the
    foot*, *meeting* and *the band* 1 each.

**Result: 0 citations do not resolve.**
* Every cited law is one of 1–4, every clause exists for its law, and every head and term is defined.
* V11's "alignment law 0" values are content of its tables, not citations, and are passed over.

### 4.3 §2.7's two tables, cited by name (`tablerefs.py`, `tablerefs-*.json`)

**What the installed §2.7 defines** (unchanged):
* the four outcomes ***over the band***, ***down before the wall***, ***beneath*** and ***unchanged meeting***;
* the crossing table's rows W1–W14 and columns C1–C13;
* the way-and-channel table's rows (a)–(e).

**What the set cites** in the forms this script reads (untouched → installed):
* outcome names after "crossing table": 32 → 32;
* cells `Wn·Cm`: 106 → 106;
* "way-and-channel table, row(s) …": 12 → 11.

The drop is V01's V1-1, which rewrote "§2.7's way-and-channel table, row a" into the citing form ("§2.7's laws, law 1 (1), (8);
its worked example the way-and-channel table's row (a)"). Section 4.4 checks that form. **0 do not resolve.**

### 4.4 The citing forms: worked examples and the support step (`examples.py`, `examples-*.json`)

`examples.py` checks each target named after "its / their worked example(s)":
* a crossing-table row W*n* (in 1–14) or cell C*m* (in 1–13);
* a way-and-channel row (*x*) (in (a)–(e)), including "that table's row (*x*)";
* a named sentence (the lock, bent-group and fixed-place sentences, all three standing), with the bent-group sentence's items
  (i)–(iv);
* an italic name, which must be one of the 166 bold or italic names of §2.7 from the support step to its end.

It also checks every "support step (n)" against the step's items (0)–(7) as installed.

**Results** (untouched → installed):
* worked-example citations: 224 → 232 (base 119, V01 6, V04 13, V05 1, V06 47, V07 23, V09 18, V10 1, V11 4);
* their targets: rows W*n* 59, cells C*m* 12, way-and-channel rows 22, the lock sentence 31, the fixed-place sentence 22, the
  bent-group sentence 12 (its item (i) 2), italic names 116, "the crossing table" 79;
* "support step (n)" citations: 30 → 30;
* **0 do not resolve.**

One site the script cannot parse, V07 l. 1612 ("(their worked examples §2.7's crossing table)"), is untouched by this round. It
resolves, as assemble-r7v read it.

**The support step (6)'s term:** no "(6)'s held" form stands in the set.

### 4.5 This round's cross-unit anchors (`endrefs.py`, `endrefs.json`; ROUND-7 NOTES (9) (b))

Part H's END lines put one fix's two ends in two units' files. The resolver reads section numbers, so `endrefs.py` checks the named
things those citations point at. **35 anchors**, each defined at its home in the installed set, untouched → installed:

* **New this round, both ends now in:**
  * §8.2's **slot 19a**: the layer-order row "| 19a | raised decks …", rendering's R1;
  * V01 §5.1.3's **row 19a**, V1-2;
  * "slot 19a" is cited 0 → 8 times (base 3, V01 5).
* **Defined before and after, cited more:**
  * §4.4 S5a *Trace* (2): 10 → 12;
  * V04 §3.5.4 (d) (1) (the lay rule: "an inset rectangle below `minEdge` on a side is no chamber"): 67 → 69;
  * V06 §3.7.5: 23 → 26;
  * V06 §3.19 (2): 6 → 7;
  * `refuse.undo.dependent`: 5 → 6;
  * F-CASTLE: 11 → 12;
  * `raisedWays.structure.span.deckDepthCm`: 16 → 17;
  * the fixed-place sentence: 22 → 26;
  * `walls.waited` (V06 §2.10's report, `walls: { … waited }`): 14 → 15;
  * T-V6-47: 27 → 29;
  * T110-2: 124 → 127;
  * T110-4: 10 → 11;
  * §4.2 S3 (10): 26 → 27;
  * §4.2 S3 (8): 12 → 14;
  * `undo(h, of)`: 6 → 7.
* **Defined, citations unchanged:**
  * §7.4 *Independence*;
  * `refuse.raised.meeting`;
  * `bend.wall.raisedCrossing` (§7.1 and V09 §4.9);
  * `bend.wall.aqueductArch`;
  * `bend.raised.underSpan`;
  * `W_RAISED_MEETING`;
  * F-WALL, F-REDERIVE, F-V-RAISED;
  * **the edge**;
  * the bent-group sentence;
  * `raised.waited`;
  * T-V6-73, T-V6-48, T-V6-11, T-V10-41;
  * §2.7's support step (6).

**0 anchors are undefined at their homes.**

## 5. Document checks (three-copy method, one corpus snapshot)

**The command.** `python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with
`docs/validation/doc-checks-allow.tsv`, run by `checks.py` on three copies against one corpus snapshot:
* **untouched** — the live base before this round, sha256 `2612044e…`;
* **new** — the blocks applied, `fe67093c…`;
* **combined** — the installed text, `561d5541…`. This round it differs from *new* by the one G-cite prefix in §13.2 (section 4.1).

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
| untouched (a) | first | 5 / 0 | 1 / 0 | 3436 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1774 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |
| new (a) | first | 5 / 0 | 1 / 0 | 3440 / 6 | 12 / 0 | 0 / 0 | 314 / 0 | 1 |
| new (b) | first | 5 / 0 | 1 / 0 | 1776 / 3 | 6 / 0 | 0 / 0 | 314 / 0 | 1 |
| combined (a) | first | 5 / 0 | 1 / 0 | 3438 / 4 | 12 / 0 | 0 / 0 | 314 / 0 | 1 |
| combined (b) | first | 5 / 0 | 1 / 0 | 1775 / 2 | 6 / 0 | 0 / 0 | 314 / 0 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3436 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1774 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3440 / 2 | 12 / 0 | 0 / 0 | 314 / 0 | 1 |
| new (b) | final | 5 / 0 | 1 / 0 | 1776 / 1 | 6 / 0 | 0 / 0 | 314 / 0 | 1 |
| **combined** (a) | final | 5 / 0 | 1 / 0 | 3438 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| **combined** (b) | final | 5 / 0 | 1 / 0 | 1775 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |

(hits / unreviewed.)

**The final result.** The installed document's final run exits 0 on both key sets. Its total over the 34 keys is **3 770 hits** (C1
5, C2 1, C3 3 438, C4 12, S1 0, S2 314), 0 unreviewed.
* The untouched copy is round 7v's clean state: exit 0, with counts equal to assemble-r7v's combined run.
* S2 is unchanged at 314 hits, 0 unreviewed: the blocks add no S2 hit.

**Why the *new* copy keeps one unreviewed run** ("3 1 3 2 3 7", §13.2's T110-2 (1)). The run is "§3.1, §3.2, §3.7" of scope's S9
text "V06 §3.1, §3.2, §3.7.5", which the installed text no longer carries. The G-cite fix made it "V06 §3.1, §3.2, V06 §3.7.5", whose
tokens break the run. The installed (combined) copy has no such hit, and no row is written for text that does not stand.

**Corrected by hand: none.** There was no S1 table fault. The G-cite fix of section 4.1 is the only change after the blocks.

**The unreviewed hits, attributed.** In the *new* copy, the (b) set has 3 distinct C3 runs; in the installed copy, 2.
`attrib.py` attributed each (`c3-attribution-new.tsv`, `c3-attribution.tsv`), and `hitctx.py` recovered its original text at
every installed site (`hitctx.tsv`). This seat read each in context. Every one is:
* new text of a repair block;
* a run of the design's own numbered law or section pointers, free of any list, table, grammar, palette or identifier;
* held whole by no corpus file;
* absent from the untouched base.
They are false positives.

**The proposed rows, re-checked as carried by the proposing seat's block:**
* **Determinism's**, "law 1 2 5 6 10": l. 11154, §7.1 *Raised ways*, D3's "(item 363; §2.7's laws, law 1 (2), (5), (6), (10); law 2
  (a), (c); …)". It extends the reviewed run "law 1 2 5 6".
* **Rendering's**, "law 1 2 3 5": l. 14161, §8.2's row 19a, R1's "(§2.7's laws, law 1 (2), (3), (5))".
* **Scope's**, "3 1 3 2 3 7": not written. `allowrows.py` asserts that the run is no hit of the installed base and stands, tokenised
  as doc_checks does, in neither the installed base nor any installed volume.

**Reviewed allow rows: 2**, in one block `# block: coherence/assemble-r7w` appended by `allowrows.py`.
* **Append only.** The script ran only after checking that the allow file's sha256 still equalled HEAD's.
* It stops unless every attributed hit is covered by exactly one rule. It found no hit without a proposing seat, so there is no row
  of the assembler's own review.
* The allow file goes from 2 416 to 2 419 lines (a header and 2 rows), sha256 `29300cf8…` → `bc418ce0…`. Its first 2 416 lines are
  byte-identical to HEAD.

**Allow rows not dropped.** The brief allows dropping rows that point at text this pass removed, "with a note".
* `staleallow.py` finds **no** C3 row that matched the untouched set and matches nothing in the installed set: this round's blocks
  and fixes removed no reviewed text.
* The coherence-pass rows that earlier assemblers listed as matching nothing still do, and stay: the shared file is append-only for
  this seat, and the close may drop them.

**Volume information runs** (`volchecks.sh`, `volsummary.py`, recorded in `volchecks-final.txt`). Each volume and INDEX was run as a
whole document, untouched against installed, with `--heads` the matching base. Volume runs carry hundreds of unreviewed runs from
before this pass, so they are not held to exit 0, as in rounds 0–7v.
* **The installed volumes add 1 new distinct unreviewed pair and drop none.** It is in V06: `law 1 2 4 6 10`, the citation "law 1
  (2), (4)–(6), (10)" of V6-4's §2.10 `raised.waited`.
* **V06's header records three new runs; the other two do not stand.** They are "3 1 3 2 3 7" and "3 2 3 19 2", which the G-cite fix
  splits.
* V06's C3 goes 296 / 270 → 297 / 271, and its S2 431 / 16 → 432 / 16 (no new unreviewed S2).
* V01, V02, V03, V04, V05, V07, V08, V09, V10, V11, V12 and INDEX: 0 new and 0 gone. This matches the V01, V04, V07 and V10 headers.
* No volume seat proposed a row in the allow file's tab form, so none is appended. The V06 pair is listed for that volume's seat or
  the close.

**The rationale** (information; not held to exit 0) is unchanged this round. It was run once, with `--heads` the installed base: C3
493 / 320 unreviewed and S2 17 / 15, equal to assemble-r7v's.

## 6. Bundle

Before the run, `--check` reported the bundle STALE. `python3 tools/bundle_architecture.py` then wrote `docs/ARCHITECTURE-FULL.md`:
* 72 893 lines reported from 14 sources;
* 10 173 837 → 10 183 687 bytes;
* sha256 `ad01c5e7c6f23bbf…` → `2c0068b41d8a21d37d84fe29f8a1983d1a98fcd7df30121b2d4fa0f0f16b6485`.

`--check` now reports it UP TO DATE (exit 0). The bundle was built after the G-cite fixes, and no live file changed after it.

## 7. Review ids and review markers in design text (ROUND-7 NOTES (9) (c), (e))

**Method.** `reviewids.py` counts citations of review-process ids in the live base, volumes and INDEX:
* the rulings `R<n>-nn` (R7-01 among them);
* every issue, conflict, wiring, inventory or probe id the coherence pass's own records define: 9 217 tokens, 233 of them `PRB…` ids.
  The records are `verify-*.md`, `adjudication-r*.md` (adjudication-r7w's among them), `famverify-*.md` (the `VF7v-…` ids),
  `inventory-*.md`, `probe-r*.md`, canon, agreement, edges and wiring;
* less any token the design itself defines, and the design id families.

A citation counts only outside the decision and request records:
* in the base, *Delegated decisions* and *Judgment calls*;
* in the volumes, §9 Decisions, §10 Base change requests, §13 Fix list and Integration notes;
* anywhere, a J-, BCR-, X- or CVR- row.

**Separate counts for (9) (e)**, each over the whole set, records included:
* every `PRB…` token;
* every "(amended, …)" marker;
* every parenthetical opening with a J144–J151 id;
* every END-line id (`E-M2`, `E-S0`, `E-V6-20` …);
* the narration forms of rounds 7v and 7w ("adjudication-r7v", "adjudication-r7w", "r7v", "r7w", "fix pass", `END-L`n, `VF7-…`,
  `VF7v-…`, `VPC-r6-…`, `R7-01`);
* Part H's line ids (`V6-7`, `V9-1`, `V10-1` …).

The census is read-only: nothing was edited, and the verifiers raise any site.

**Results** (untouched → installed):
* **Design-text sites of review ids: 0 → 0.**
* **`PRB…` ids: 0 → 0.** "(amended, …)" markers: 0 → 0.
* **END-line ids: 2 → 2.** Both are V09 l. 4629's "(Part II, E-S33, E-S34)", design ids of Part II that stood before this round.
* **Round-7v and round-7w narration forms: 0 new.**
  * The "pass n / round n / Part H" list is 104 → 104, unchanged but for line numbers. It is the design's own "field pass 1 / 2" and
    way-drawing passes, plus one record site, V09 l. 4938, a BCR row.
  * A direct grep of the base, volumes and INDEX for "r7w", `VF7v`, `VF7-`, `R7-01`, "family fix pass", "adjudication-r" and
    "(amended," finds only that BCR row.
* **Part H line ids: 1 → 1**, unchanged: V10 l. 1745 "V10-15", a site no block of this round touches.
* **Inside the records, 25 citations stand**, kept as records and unchanged: V03 9, V09 15, V10 1.
* **Change markers: 0.** The installed text carries the same nine parentheticals opening with a J144–J150 id as before, only renumbered
  by the round's added lines. Each cites an owner decision as the source of the rule beside it, the form the base already uses for
  its J rows. No block adds or edits one. All nine are listed for the verifiers:
  * base l. 2579, the laws' head: "normative (J146)";
  * base l. 2653, *Held*: "Held is locked, on the axis named, and nothing else (J147)" — bare in form;
  * base l. 2655, *held in placement*: "its shape still changing at a meeting (J144)";
  * base l. 2706, law 1 (2): "nothing of either record written (J149)" — bare in form;
  * base l. 2740, law 1 (10): "a placement-held thing's shape alone (J144)";
  * base l. 2743, law 1 (10): "a gate made in it (J147, J150)";
  * base l. 19280, §13.2's T110-2: "(J147, J150), on a second run shape-locked";
  * base l. 19636, §13.2's T110-4: "nothing held because it was drawn or declared (J147)";
  * V07 l. 2314, §3.11: "its gates kept — never moved for a meeting (J148)".
  Every J144–J151 mention in the set is listed in `reviewids-final.json` (24: base 20, V06 1, V07 2, V11 1, as before).

Full lists: `reviewids-final.tsv`, `.json` and `.out`; `reviewids-untouched.tsv`, `.json` and `.out`.

## 8. Not placed, and left for the verifier

* **Unplaced: none.** Every block of the eleven files is applied. There is no RULING REQUEST, no ASSEMBLE NOTE, no swap and no double
  REPLACE, so there is no merge conflict and no lost hunk. No block targeted a missing or retitled heading.
* **Broken references: 0** (section 4). Every §2.7 table name; every law, clause and term citation of §2.7's laws; every
  worked-example and support-step citation; and all 35 cross-unit anchors resolve.
* **Mechanical fixes: 3 G-cite prefixes** (section 4.1): base l. 19310, V06 l. 4193 and V06 l. 4255. The second item of
  the same two lists, a bare `§3.2`, is ambiguous in form and left for the verifier. It reads as the base's under S7, while the
  clause's sense (the epoch's phase order) is V06 §3.2's.
* **98 ambiguous-form references** (section 4.1, `ambiguous-refs.tsv`; 2 new, 1 gone). They read as the base's under S7; the
  verifier confirms each or prefixes it.
* **The model's observation for the adjudicator:** pipeline's P3 widens S5a's pin trigger. Three §2.7 examples restate the narrower
  trigger as a subset, none saying "only", and the model names this a candidate citation conform:
  * *beneath*, l. 3082–3083;
  * the way-and-channel table's row (d) gates cell, l. 2916;
  * row W1's last column, l. 3340.
* **Pipeline's notes** (not edits): P2's "each widened all round by the wall strips' width there" reads over the `vault`-use spans'
  strips. A held building's strip is widened by the same width by its own definition, "never twice". §4.11's `carve` way rule keeps
  its words.
* **The support step (6)'s old term "held"** still stands at one site, §7.4's raised-way row (base l. 12133): "its deck and piers
  held, as every raised way is from its creation (§2.7's support step (6))". Assemble-r7v listed it as kept until round 8; no block
  of this round touches it.
* **Owner-decision citations of a rule's source:** nine parentheticals, unchanged (section 7). Review ids, PRB ids, narration and
  change markers in design text: 0.
* **Hand-offs recorded in the repair files' headers** (section 2.5) are not assembly work. Each "both ends" claim is installed. The
  round-7v hand-off from V04 to V06 is closed.
* **Volume document checks:** 1 new volume hit without a row in the allow file (V06 `law 1 2 4 6 10`, section 5,
  `volchecks-final.txt`), for that volume's seat or the close.
* **Scope's proposed allow row, not written** (section 5). Its run stands in no installed file after the G-cite fix.
* **No allow row is made stale by this round.**
* **The document checks are provisional** (section 5). Re-run them on the machine that holds the reference corpus. Both base rows
  were proposed by the seats that wrote the text.
* **Size:** the set is at +11.5 % words against the pre-coherence archive, outside the shrink band (section 3). Each repair file
  states what holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):**
* the 15 live files' sha256:
  * before: each equal to its HEAD blob at `c330616`;
  * after: each equal to its final copy, re-checked after the checks and the bundle;
* the eleven repair files landed and committed;
* the routing of 31 blocks and the census: 0 missing, 0 ambiguous, 0 unclosed, 0 RULING REQUEST, 0 overlap, 0 double REPLACE, 0
  retitle;
* the model's block applied first;
* 31 applied, with audit not-OK 0 and balanced fences in every file;
* the volume outputs against their seats' records:
  * V06 equal to its recorded sha256;
  * V01, V04 and V07 equal in bytes, lines and touched lines;
  * V10 equal in lines and its one changed line;
  * V09 equal in its counts and per-section words;
* the five base seats' stand-alone runs reproduced (model and scope by sha256 prefix too), their diffs disjoint, their union the
  combined diff, the growths summing;
* no heading added, removed or retitled;
* the reference counts of section 4: 0 broken, 3 FIX fixed and re-resolved, every §2.7 law, clause, term, table, worked-example and
  support-step citation resolving, and 35 cross-unit anchors defined;
* every hand-off's two ends present in the installed text, and the round-7v V04 → V06 hand-off closed;
* the document checks' counts of section 5, the installed copy exiting 0 on both key sets against one corpus snapshot;
* the allow file appended only, with no row made stale;
* the bundle regenerated and `--check` clean;
* the sizes of section 3 and no duplicate id definition;
* the review-id and marker census of section 7.

**PLAUSIBLE:**
* **That the 2 reviewed rows are false positives.** Each was attributed by script and read in context by this seat, and each was
  proposed by the seat that wrote the text.
* **That V01's, V04's, V07's, V09's and V10's outputs equal their seats' generators.** Those seats record counts or lines but no
  hash, and every count matches.
* **That the G-cite prefixes are what S7 asks.** They are the resolver's FIX class, fixed as assemble-r0 and assemble-r2 did. The
  bare `§3.2` beside each is left ambiguous, for the verifier.
* **That the ambiguous-form references read as their authors meant.** S7 reads them as the base's. The new ones were checked by
  reading, the rest not one by one.
* **That `lawrefs.py`, `examples.py` and `endrefs.py` catch every citation of §2.7's laws, its worked examples and this round's
  anchors.** They read:
  * a "law n" or "laws n–m", with the clause list right after it;
  * a law-2 head right after "law 2", and a term after "laws'";
  * the text after "its / their worked example(s)" up to the next ";" or unbalanced ")";
  * "support step (n)";
  * the 35 anchors by the forms listed in the script.
  A citation in another form is not checked.
* **That the review-id census's token set is complete.** It reads:
  * the ids the coherence records define as headings, first table cells or bold labels;
  * the `R<n>-nn` rulings;
  * every `PRB…` token, every "(amended, …)" and J144–J151 parenthetical, every END-line id, and the narration forms named in
    section 7.
  An id cited only in running text of a record would be missed.
