# Assemble — coherence pass, round 7 (the fourteen repair-r7 block files applied to the base and the volumes)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r7 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r7`, 2026-10-02, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at dea06e07; base `f39f1c30…` as assemble-r6 installed it);
  untouched snapshot — done
- P2 block inventory and routing (14 files, 95 blocks: 92 REPLACE, 1 J-ROWS, 1 RATIONALE-A, 1 RULING REQUEST (E-D7, accepted,
  skipped); 0 missing heading, 0 overlap, 0 double REPLACE; the model's blocks first); ASSEMBLE NOTES census — done
- P3 apply (94 applied, 1 skipped = the RULING REQUEST, audit not-OK 0; the volume outputs equal their seats' records; the five
  base seats' stand-alone runs reproduced), scope's J-A110.01 swap (805 = 805), E-D7's names checked (one other site listed),
  headings unchanged, install (11 of 15 changed) — done
- P4 references: 57 275 checked, 0 broken, 1 mechanical G-cite fix, 95 ambiguous-form listed; §2.7's two tables' names and
  §2.7's laws' law, clause and term citations all resolve — done
- P5 document checks, three-copy method: 58 allow rows (15 proposed, 43 the assembler's review of the model's §2.7 text); the
  combined copy exits 0 on both key sets (PROVISIONAL: corpus incomplete); volume information runs — done
- P6 bundle and `--check` — done
- P7 review-id and PRB7 census (ROUND-7 NOTES (9) (c), (e)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r7/`. Most are assemble-r6's scripts with
the round label and the scratch folder (`scratchpad/coherence/asm7/`) changed: `snapshot.py`, `apply.py` (which runs
`docs/validation/amendments-b/apply-blocks.py` unchanged), `headings.py`, `install.py`, `mirror.sh` with `refs.py` and
`refsreport.py`, `fixrefs.py`, `checks.py`, `volchecks.sh` with `volsummary.py`, `sizes.py`.

These are this round's own or changed:
* `route.py`: the split files carry an order prefix (`a-` for the model's, `b-` for every other), so the applier's name order runs
  the model's blocks first (ROUND-7 NOTES (9) (e)).
* `handoff.py`: scope's J-A110.01 swap, the judgment tables' checks, and the reproduction of the five base seats' recorded dry runs.
* `swap_restated.py`: `work/repair-scope-r3/swap_restated.py` with `IDS = ['J-A110.01']`, as scope's note asks.
* `edfate.py` (new): ROUND-7 NOTES (9) (f)'s check of the E-D7 names.
* `tablerefs.py`: its header match widened to the installed crossing table's `| wall event (paths) |`.
* `lawrefs.py` (new): ROUND-7 NOTES (9) (e)'s check of every citation of §2.7's laws by law, clause and term.
* `attrib.py`: reads the prefixed split files.
* `hitctx.py` (new): each unreviewed run's original text.
* `allowrows.py`: this round's rows. A run several seats' text carries may be covered by its proposer's row.
* `unitsizes.py`: reads the prefixed split files.
* `reviewids.py`: counts the round-7 probe ids, the adjudication's markers, the END-line ids and the J144–J151 mentions.

No live text was edited by hand. Each script's records sit beside it (`snapshot.json`, `blocks.json`, `split/`, `logs/`, `apply.json`,
`handoff.json`, `edfate.json`, `headings.json`, `install.json`, `fixrefs.json`, `ref-fixes.tsv`, `refs-before.out`, `refs-final.out`,
`refs-summary.json`, `ambiguous-refs.tsv`, `external-refs.tsv`, `tablerefs.json`, `lawrefs.json`, `checks-first.json`, `checks.json`,
`c3-attribution.tsv`, `hitctx.tsv`, `volchecks-final.txt`, `sizes.json`, `unitsizes.json`, `reviewids-untouched.*`,
`reviewids-final.*`).

## Outcome

**All fourteen repair files had LANDED before this seat started** (ROUND-7 NOTES (9) (d)). Each has a
`coherence/repair-<unit>-r7 LANDED` line in the lane log and its result in `results/coherence_repair-<unit>-r7.json`. All fourteen are
committed at HEAD `dea06e07`. Kernel, V02, V03 and V08 had nothing to repair this round, so they have no file.

**Blocks: 95 found, 94 applied, 1 skipped.**
* The kinds: 92 REPLACE (base 27, volumes 65), 1 J-ROWS and 1 RATIONALE-A (both scope's), and 1 RULING REQUEST.
* The one skip is determinism's `=== RULING REQUEST E-D7 ===`. It is never applied (ROUND-7 NOTES (2), (9) (f)), and the orchestrator
  accepted it (lane log, 2026-10-02 16:19). Determinism's seven other blocks carry the accepted names, which agree at every site
  ROUND-7 NOTES (9) (f) names (section 2.3).
* No heading was missing or ambiguous, and no block was truncated.
* No two blocks touch one subsection (no double REPLACE, no nesting), so no three-way merge was needed.
* The audit finds every applied body exactly once, and the fences are balanced in every file.
* Every volume output equals its repair seat's recorded dry run: six by sha256, V01 by bytes and lines, V05 by lines, V09 by its
  recorded counts.
* Each of the five base seats' recorded stand-alone dry runs is reproduced, and their diffs are disjoint.

**The model's blocks were applied first** (ROUND-7 NOTES (9) (e)): the base run applies §2.2, §2.7 and §2.8 before any other base
block. Every citation of "§2.7's laws" by law, clause or term was then checked against what the installed laws define (section 5.2).
**All resolve.**

**The round's one note for Assemble is applied as written.** It is scope's NOTE FOR ASSEMBLE:
* (1) the restated J-A110.01 rows are swapped into their older rows' places;
* (2) the twelve proposed allow rows are reviewed and written.

Determinism's four proposed allow rows were reviewed and written too.

**Nothing is unplaced but the RULING REQUEST block**, skipped as instructed. The round adds, removes and retitles no heading.

**Size.** The set (base and volumes) goes from 9 704.0 KB to 9 878.2 KB (+1.8 % bytes, +1.9 % words). The base grows by 4.9 % in
words; the model's §2.7 (Part L's laws and R7-02's worked examples, J146) is 60 % of that growth.

**References.** 57 275 are checked and **none is broken**. One needed a mechanical fix: a G-cite prefix in the model's crossing table.
95 resolve but are ambiguous in form (85 before).

**Document checks.** The combined (installed) document exits 0 over every top-level key and over the eight `#` keys, against one
corpus snapshot. This needed 58 reviewed allow rows. The result is **provisional**, because the reference corpus is incomplete in
this checkout. The combined document's total is **3 756 hits** (C1 5, C2 1, C3 3 424, C4 12, S1 0, S2 314), 0 unreviewed.

**Bundle.** `docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes.

**Review ids and review markers in design text** (ROUND-7 NOTES (9) (c), (e)):
* **0** sites outside the decision and request records (0 before);
* **0** `PRB7…` ids and **0** "(amended, …)" or "(J146, PRB7…)" markers in the base, the volumes and INDEX;
* **0** bare "(J147)", "(J148)" or "(J149)" used as a change marker. The six bare or listed J144–J150 parentheticals the installed
  text carries each cite an owner decision as a rule's source, in the form the base already uses for "(J121)" and "(J122)" (section 8).

## 1. Live files — sha256 before and after

**Before:** the committed text at HEAD `dea06e07fcf5`. Each live file equalled its HEAD blob. These are assemble-r6's outputs; every
repair file was written against the base `f39f1c30126976c0…` (ROUND-7 NOTES (4)'s merge base).

**After:**
* `install.py` wrote them, only after confirming each live file still held its P1 sha256, and verified each written file
  byte-identical to its final copy.
* `fixrefs.py` then made the one G-cite fix (section 5) in the live base and the final copy together. It was guarded: the live file
  had to equal the copy the resolver read.
* After P5–P7, every live file was re-checked equal to its final copy.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 3 052 639 | 3 194 446 | `f39f1c30126976c0bd2afedd5f95a23d7e6c19e0a0e5ff4f8be49ca113bbb15b` | `14304a3da46127181e8274a87d3551e7b79e32a4e390389bdcd56bcfb491df2d` (installed `45a3f366a7ffa206…`, then the G-cite fix) |
| `docs/ARCHITECTURE-RATIONALE.md` | 704 813 | 704 813 | `a3f45a3f3ad67dc46ac506c244d2497775848195cdf2e0c022cd654f372f70f0` | `7e172500f6a791c5cf1e667c657309b6a49ee067dc130a05d82e605a06579c39` (J-A110.01's Part A entry restated, section 3) |
| `docs/volumes/V01-neighbourhoods.md` | 528 530 | 528 635 | `bd9b4cebbb04f88ea4df4a9469d76d065cc22195ebe2672490c4ed01859d1077` | `7b63780f96353d9aeb8cc64d5b5aa029af541968a0c65a87545da91ccd421778` |
| `docs/volumes/V02-buildings.md` | 565 121 | 565 121 | `c7fbb7055d776409fe0f906059fcf943198ecb81de065054674be4859cef4540` | unchanged (no block) |
| `docs/volumes/V03-interiors.md` | 467 810 | 467 810 | `894955c29098f435f9f483c2c0991fe7ebfc79b19d4dd0e0a2c078e676266792` | unchanged (no block) |
| `docs/volumes/V04-underground.md` | 530 264 | 535 373 | `fefd0cd444a1334e9b0fa67ccfd32ed44415409f4af0ad687ae523e9b37b6240` | `18b739064e67f21b49960a9a108a6ebecddc1d6d7ceb42c0931e3ebb8b594a71` |
| `docs/volumes/V05-sky.md` | 403 128 | 404 653 | `a0dd3b65e35edef258cb29209b22ae3f3868868e4b7bdb91e29272a4db7b5e77` | `618925836a8e0688ea01e3a9e542bfbcf06efea4f4177d4aac42c6ba4c404206` |
| `docs/volumes/V06-evolution.md` | 694 809 | 706 957 | `9653164ebb814d3a60a02a65e193161526ce98f15cd9c52ad5f9e75048dd470a` | `324609e5ef5b1ff164f56dfcd6edae152f043d6608bbd0ea4372100f1e402f4b` |
| `docs/volumes/V07-village.md` | 613 621 | 621 436 | `46dfede9907ee1a6602f79f10eadcd0f492c212bc16e3adc45ee15ddb5d28996` | `346c8b5a2dabff46a2bf52387a1a295d1fba91cd674ae308ea0066c8ba68ac3d` |
| `docs/volumes/V08-settlementforge.md` | 582 193 | 582 193 | `83382cac1e496ffb29d7ca1d9ea1ed3c7b37978ddedd915ee50f73c89ca1b491` | unchanged (no block) |
| `docs/volumes/V09-application.md` | 770 727 | 776 936 | `046b6610e47e621d6773d9a8646f4e528a2089299347c883db7a00ac24593b11` | `371946d55b244c26db9b4e433a885e8f63cde9f770563a688784bf0fd367585f` |
| `docs/volumes/V10-clerk.md` | 522 915 | 524 498 | `1014b64c7dc80feef334168db444130e22c8d25bf28c3787ca3e61798978c364` | `4988e5ae15e19a0e3b7977a673785d83cbd92e9e03d38ae93130511f0b65a019` |
| `docs/volumes/V11-content.md` | 679 521 | 681 412 | `0e2767c1b7ec2b438a3bd8e3027b67696791d9f3cf54757e8c89a0d520fec702` | `67c7c0b837e1c53a1c428d75485da9c5e54c193428a0c9ba86a36f71aae86dfc` |
| `docs/volumes/V12-calibration.md` | 525 576 | 525 763 | `006b8ef1d304cee55b9e0754a7c8d26fe3de43a65fd9e88eddcb5be0cd60a51d` | `66e2ca404b1f9d19f6f9d56beebd73445a9a0375992d45ea1c2b754083446eff` |
| `docs/volumes/INDEX.md` | 24 074 | 24 074 | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` | unchanged (no block routes to it) |

Also written:
* `docs/ARCHITECTURE-FULL.md`, the bundle (section 7);
* `docs/validation/doc-checks-allow.tsv`, one appended block (section 6).

## 2. Blocks — routing, application, audit

**The block files** are exactly `docs/validation/coherence/repair-r7-<unit>.md` for the fourteen units (ROUND-7 NOTES (1)):
model, scope, pipeline, determinism, rendering, V01, V04, V05, V06, V07, V09, V10, V11 and V12. `blocks.json` records each one's
sha256 as read. Everything under `work/` and the bench files is the repair seats' working material, never blocks.

**Routing** (`route.py`):
* Each file was cut at its `=== FILE <path> ===` lines. Every block went to the file its nearest FILE line above names, or the base
  when there is none (ROUND-7 NOTES (3)).
* Each volume file names one volume, and the five base files have no FILE line. No file carries blocks for more than one document,
  and none routes to INDEX.md.
* Scope's RATIONALE-A row goes to the rationale with the base run.
* **Order:** each split file keeps its repair file's basename behind an order prefix, `a-` for `repair-r7-model.md` and `b-` for
  every other. `apply-blocks.py` applies its files in name order, so the base run applies the model's three blocks first, then
  determinism's, pipeline's, rendering's and scope's (ROUND-7 NOTES (9) (e)). The base ran before the volumes.
* The FILE lines are left out (they are routing, not blocks); every other line is verbatim. The RULING REQUEST block stays in
  determinism's split file, so the applier's own MALFORMED rule is seen to skip it.
* Each volume ran with a throwaway rationale whose output equals its input.
* No text follows any file's last END.

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 1 RULING REQUEST, and 0
overlaps of any kind. No two blocks of the round, within one unit or across units, cover one subsection or nest. Two consequences:
* **No double REPLACE.** The brief's `git merge-file` step (merge base: the subsection as assemble-r6 installed it, base
  `f39f1c30126976c0…`) had nothing to merge, so there is no conflict or lost hunk to report (ROUND-7 NOTES (4)).
* **No retitled target.** Every block was found on the text as it stood, and no block body retitles its heading (ROUND-7 NOTES (5)).

| unit | blocks found | applied | skipped | target | covers | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|---|
| model | 3 | 3 | 0 | `ARCHITECTURE.md` (applied first) | §2.2, §2.7, §2.8 | 29 603 → 44 278 (+49.6 %) | 181.0 → 264.4 |
| determinism | 8 | 7 | 1: `=== RULING REQUEST E-D7 ===`, never applied (ROUND-7 NOTES (9) (f)) | `ARCHITECTURE.md` | §5.2, §5.3, §5.4, §7.1, §7.2, §7.3, §7.4 | 42 599 → 44 867 (+5.3 %) | 256.4 → 268.9 |
| pipeline | 10 | 10 | 0 | `ARCHITECTURE.md` | §4.1, §4.2, §4.3, §4.4, §4.5, §4.7, §4.8, §4.11, §4.13, II.7.6 | 74 121 → 76 025 (+2.6 %) | 447.3 → 457.6 |
| rendering | 3 | 3 | 0 | `ARCHITECTURE.md` | §8.4, §8.11, §11.1 | 18 018 → 18 214 (+1.1 %) | 105.1 → 106.1 |
| scope | 6 | 6 | 0 | `ARCHITECTURE.md`, `ARCHITECTURE-RATIONALE.md` | §0.2, §13.2, §13.8, §15.2, J-ROWS (J-A110.01), RATIONALE-A (J-A110.01) | 32 757 → 38 155 (+16.5 %) | 195.5 → 226.8 |
| V01 | 3 | 3 | 0 | `V01-neighbourhoods.md` | §1.2, §3.17.3, ## 7 | 10 506 → 10 530 (+0.2 %) | 61.6 → 61.7 |
| V04 | 16 | 16 | 0 | `V04-underground.md` | §1.2, §1b.2, §1b.3, §2.6, §3.1, §3.5, §3.10, §3.11, §4.1, §4.2, §4.3, §4.4, §4.6, ## 7, ## 8, ## 9 | 51 773 → 52 680 (+1.8 %) | 306.9 → 311.9 |
| V05 | 4 | 4 | 0 | `V05-sky.md` | §2.6, §3.16, §3.23, ## 7 | 15 981 → 16 241 (+1.6 %) | 90.7 → 92.2 |
| V06 | 13 | 13 | 0 | `V06-evolution.md` | ## 1b, §2.1, §2.8, §2.10, §3.1, §3.2, §3.7, §3.18, §3.19, §3.20, §3.21, ## 7, ## 8 | 53 316 → 55 478 (+4.1 %) | 324.4 → 336.2 |
| V07 | 10 | 10 | 0 | `V07-village.md` | ## 1, §3.4, §3.5a, §3.8a, §3.11, §3.12a, §3.13, §3.17, ## 7, ## 8 | 27 761 → 29 112 (+4.9 %) | 163.7 → 171.3 |
| V09 | 9 | 9 | 0 | `V09-application.md` | ## 1b, §2.5, §3.16, §4.3, §4.9, §4.20.2, §4.20.6, §5.5, §7.1 | 41 866 → 42 962 (+2.6 %) | 248.4 → 254.5 |
| V10 | 5 | 5 | 0 | `V10-clerk.md` | §2.6, §3.9, §3.16, §4.1, §7.1 | 16 701 → 16 992 (+1.7 %) | 100.9 → 102.5 |
| V11 | 4 | 4 | 0 | `V11-content.md` | §1b, §2.10, §3.1, §3.24 | 20 660 → 20 971 (+1.5 %) | 127.1 → 128.9 |
| V12 | 1 | 1 | 0 | `V12-calibration.md` | §3.11 | 7 017 → 7 052 (+0.5 %) | 43.6 → 43.8 |
| **total** | **95** | **94** | **1** | | | | |

**How "covered text" is measured.**
* For a REPLACE, it compares the section in the untouched file with the section of its body's heading in the installed file
  (whitespace-split words).
* For a J-ROWS or RATIONALE-A row, it compares the older row it restates with the new one; the two have the same length.
* The model's figure includes the one word ("V06") of section 5's G-cite fix.

**Each unit's block count matches its header and its result file:** model 3, scope 6, pipeline 10, determinism 7 (+1 request),
rendering 3, V01 3, V04 16, V05 4, V06 13, V07 10, V09 9, V10 5, V11 4, V12 1. This is the orchestrator's count of 94 blocks.

**Each unit's word change matches its header** (headers count with `wc`, so a few words can differ):

| unit | its header | here |
|---|---|---|
| model | §2.2 6 949 → 6 985, §2.7 16 809 → 31 413, §2.8 5 845 → 5 873 (+14 668) | +14 675 (+1 for the G-cite fix) |
| determinism | §5–§7 +2 268 | +2 268 |
| pipeline | +1 904 | +1 904 |
| rendering | +196 | +196 |
| scope | 32 705 → 38 108 (+5 403) | 32 757 → 38 155 (+5 398) |
| V01 | 85 091 → 85 115 (+24) | +24 |
| V04 | 86 354 → 87 261 (+907) | +907 |

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines (balanced) | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 30 | 29 | 1 (the RULING REQUEST) | 153 → 153 | 140 → 140 | `99242252fcbf9394` (before the swap and the G-cite fix) | equal to the five seats' joint run here; each seat's stand-alone run reproduced (below) |
| `V01-neighbourhoods.md` | 3 | 3 | 0 | 123 → 123 | 12 → 12 | `7b63780f96353d9a` | equal in bytes and lines — repair-r7-V01 l. 115: 528 530 → 528 635 bytes, 3 756 → 3 756 lines (no hash recorded) |
| `V04-underground.md` | 16 | 16 | 0 | 59 → 59 | 12 → 12 | `18b739064e67f21b` | equal — repair-r7-V04 l. 149 (sha256 `18b739064e67f21b…`, 535 373 bytes, 3 644 lines) |
| `V05-sky.md` | 4 | 4 | 0 | 62 → 62 | 14 → 14 | `618925836a8e0688` | equal in lines and headings — repair-r7-V05 l. 19–20 (4 applied, 3 089 → 3 096 lines; no hash recorded) |
| `V06-evolution.md` | 13 | 13 | 0 | 65 → 65 | 28 → 28 | `324609e5ef5b1ff1` | equal — repair-r7-V06 l. 18–19 (`324609e5…2f4b`, 706 957 bytes, 4 655 lines) |
| `V07-village.md` | 10 | 10 | 0 | 58 → 58 | 18 → 18 | `346c8b5a2dabff46` | equal — repair-r7-V07 l. 27 (`346c8b5a2dabff46…`, 621 436 bytes, 4 123 lines) |
| `V09-application.md` | 9 | 9 | 0 | 110 → 110 | 24 → 24 | `371946d55b244c26` | equal in its counts — repair-r7-V09's checks (9 of 9, audit 0 not OK, headings 110 → 110, fences 24 → 24; no hash recorded) |
| `V10-clerk.md` | 5 | 5 | 0 | 86 → 86 | 24 → 24 | `4988e5ae15e19a0e` | equal — repair-r7-V10 l. 125 (`4988e5ae15e1…`) |
| `V11-content.md` | 4 | 4 | 0 | 58 → 58 | 22 → 22 | `67c7c0b837e1c53a` | equal — repair-r7-V11 l. 99 (`67c7c0b837e1…`) |
| `V12-calibration.md` | 1 | 1 | 0 | 67 → 67 | 30 → 30 | `66e2ca404b1f9d19` | equal — repair-r7-V12 l. 120 (`66e2ca404b1f…`) |

**Audit, for each run:**
* every applied body is found exactly once in the output (not-OK 0);
* every title block is unchanged by the blocks;
* the PENDING FABLE REVIEW lines are unchanged in every file.

The applier printed two kinds of note:
* the base run's two expected "DUPLICATE ID inserted" notes for J-A110.01, from scope's restated J-ROWS and RATIONALE-A rows, which its
  swap resolves (section 3);
* the skip of the MALFORMED `=== RULING REQUEST E-D7 ===` header and its text.
There was no retitle and no supersession.

### 2.1 The base seats' dry runs, reproduced

`handoff.py` (`handoff.json` → `checks.alone` and `checks.combined_runs`) ran each seat's blocks alone on the untouched base and
rationale, and compared the result with what its header records:

| seat | alone: found / applied / skipped / audit not-OK | lines | its header's record, reproduced |
|---|---|---|---|
| model | 3 / 3 / 0 / 0 | 23 140 → 23 789 | headings 153 → 153, fences 140 → 140 balanced, title block unchanged, 23 140 → 23 789 lines |
| determinism | 8 / 7 / 1 / 0 | 23 140 → 23 167 | 7 REPLACE applied, audit OK ×7, its RULING REQUEST the one skip; with rendering: 11 / 10 / 1 / 0 ("10/10 applied, audit OK") |
| pipeline | 10 / 10 / 0 / 0 | 23 140 → 23 128 | 3 052 639 → 3 063 170 bytes; rationale unchanged (805 = 805, no duplicate); with determinism and rendering: 21 / 20 / 1 / 0 (every section block applied, the one skip determinism's request) |
| rendering | 3 / 3 / 0 / 0 | 23 140 → 23 140 | the rationale byte-identical; the diff touches exactly l. 13722–13723, 13947–13948, 14799, 16034, 16038–16039 of the live file |
| scope | 6 / 6 / 0 / 0 | 23 140 → 23 399 | its two DUPLICATE ID notes; rationale 2 386 → 2 387; its swap exactly as recorded — "index l. 23274 ← l. 23332; Part A l. 794 ← l. 852" — giving 23 398 lines, rationale 2 386, 805 = 805, one id set, no duplicate |

**All five equal their records.**

**The five diffs are disjoint.** The combined base grows by 923 lines, which is the sum of the five stand-alone growths
(649 + 27 − 12 + 0 + 259). The swap then removes one line: 23 140 → 24 063 → 24 062.

**The joint run equals `apply.py`'s base output** (model first): 30 / 29 / 1 / 0.

### 2.2 Headings, RULING REQUEST blocks

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents. Each count
is unchanged: base 153, INDEX 9, V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67.

**RULING REQUEST blocks — 1, skipped and listed** (ROUND-7 NOTES (2), (9) (f)).
* The block: determinism's `=== RULING REQUEST E-D7 ===` (repair-r7-determinism.md l. 1600–1619). Its request: the `reshaped` report
  entry's field is named `reshape`, of the named type `ReshapeChange` (§5.4), and `EditFate.change` takes that type.
* The orchestrator accepted it as a type-level correction with no behaviour change (lane log, 2026-10-02 16:19). Determinism's other
  blocks are applied as written.
* No other repair file carries one. The only other "RULING REQUEST" strings are header counts ("0 RULING REQUEST blocks").
* After installation, no live file contains a `=== ` header line of any kind or any "RULING REQUEST" text.

### 2.3 The E-D7 names (ROUND-7 NOTES (9) (f); `edfate.py`, `edfate.json`)

The check ran on the installed base. **The names agree:**
* **§5.4** (l. 9991): the variant `{ kind: 'reshaped'; entity: Id; met: Id; reshape: ReshapeChange }`. The variant carries no
  `change` field. `ReportEntry`'s common part (l. 9983–9984) keeps the dossier `change?: { changeId; reason? }`, the clash E-D7's
  request removes.
* **The type** (l. 9992): `type ReshapeChange = 'chamberRemoved'|'chamberLaid'|'gateMade'|'wayRerouted'|'merged'|'capped'`, defined
  once.
* **§7.1's `EditFate`** (l. 10970), read by §7.3 and §11.2: `met?: Id` and `change?: ReshapeChange`, its comment "as §5.4's
  `reshaped` entry's `reshape`". §7.3 names the fate *reshaped* and no field.
* **§2.7's law 4 (G2)** (l. 2868): "(`EditFate.fate` `'reshaped'`, with `met`, the structure it met, and `change`, as §5.4's `reshaped`
  entry's)". It stays as it is, because EditFate's field is `change`.

**One other site names the entry's field**, and it is listed for the verifiers (not edited):
* **V09 §4.9, the `fate.reshaped` row** (V09 l. 2033): "its change by the fate's `change` (§5.4's `reshaped` entry's)".
* The words "the fate's `change`" agree with `EditFate.change`.
* But the parenthetical "(§5.4's `reshaped` entry's)" reads as if the entry's field were also `change`. That field is now `reshape`.
* The six kinds the row then lists are `ReshapeChange`'s and agree.

### 2.4 NOTES FOR ASSEMBLE — the census (ROUND-7 NOTES (9) (a))

I read all fourteen preambles for every line that names Assemble or the assembler, a swap, a title block, a restated row, a J-ROWS or
RATIONALE-A row, a proposed allow row, a NOTE or a HAND-OFF.

**One note is addressed to Assemble, and it is applied as written:**
1. **Scope, NOTE FOR ASSEMBLE (1) — restated rows (assemble-r1's swap rule).** The J-ROWS block restates the judgment-index row of
   J-A110.01, and the RATIONALE-A block restates its Part A entry. The change is JUDGMENT 1: "T110-1 – T110-7" → "T110-1 – T110-8";
   nothing else changes. After every block file is applied, each appended row takes its older row's place and the older row is
   deleted, by "the logic of work/repair-scope-r3/swap_restated.py with `IDS = ['J-A110.01']`" (section 3).
2. **Scope, NOTE FOR ASSEMBLE (2) — twelve proposed allow rows** (C3 runs in §13.2's T110-2). Each was reviewed and written as
   proposed (section 6).

**Two lists are addressed to the assembler's review:**
* **Determinism's "Proposed allow rows (… for the assembler's review)"**: four C3 runs in §7.1 and §7.3. Each was reviewed and written
  (section 6).
* **The model's header lists its §2.7 runs** "for the assemble seat's allow file" and proposes no row (46 runs in its dry run over
  §2.2, §2.7 and §2.8). The 43 that the assembled document carries unreviewed were reviewed by this seat (section 6).

**Apart from these:**
* No header asks for a title-block change or any other restated row.
* Every volume unit records "title block untouched / unchanged". Determinism, model, pipeline and rendering write no J-ROWS or
  RATIONALE-A block.
* So `final/` is `apply.py`'s output plus scope's swap and section 5's one G-cite fix, with V02, V03, V08 and INDEX.md carried
  unchanged.

**HAND-OFFS in the headers** are for the adjudicator and round 8's verifiers, not assembly work. They stand in the repair files:
* **model → determinism:** §7.5's schema-transform row for `laidAt` and `courseAt`.
* **pipeline → model:** "held" → "kept" at the support step (6)'s bullet.
* **rendering → pipeline:** §4.5's daylight casters' cap clause, and an observation outside the round (`PreviewResult.alternatives`).
* **determinism → V09:** `spans/<n>/use` → `spans/<a>-<b>/use` at V09 §1b and §4.
* **scope's four:**
  * V02's T-V2-44 → T110-8;
  * determinism's E-D11 cell;
  * the canon's G-bend pattern, which flags `refuse.raised.meeting`;
  * the T110 names its seats write.
* **V05 → V06:** HAND-OFF (2).
* **V06's hand-offs.**
* **V11's observation for the adjudicator.**

ROUND-7 NOTES (9) (b) is met because all fourteen files were applied before the reference check (section 5).

## 3. The rationale and the judgment index (scope's swap)

`handoff.py` ran `swap_restated.py` once on the combined output (base and rationale). That script is scope-r3's, with
`IDS = ['J-A110.01']` and its docstring changed, nothing else (the diff is three lines). It stops unless the id occurs exactly twice in
the index and twice in Part A. Its printout:

```
judgment index: J-A110.01: l. 23938 <- l. 23996
Part A: J-A110.01: l. 794 <- l. 852
judgment index rows 805 duplicates []
Part A rows 805 duplicates []
ids in one and not the other []
```

The index line numbers differ from scope's stand-alone record (l. 23274 ← l. 23332) by the 664 lines the other four base seats add
above the index. Scope's own stand-alone swap reproduces its record exactly (section 2.1).

**Checks after the swap** (`handoff.json` → `checks.ids`):
* The index and Part A hold 805 entries each, one id set, no duplicate.
* The id set and both orders are unchanged (J-A110.01 stays at position 747 in each).
* Every index row except J-A110.01's is byte-identical to the untouched copy.
* The swapped index row and the swapped Part A entry each equal scope's J-ROWS and RATIONALE-A block rows byte for byte.

**The rationale** changes on exactly one line, l. 794 (J-A110.01's Part A entry, "T110-1 – T110-7" → "T110-1 – T110-8"). It has
2 386 lines and 704 813 bytes before and after, 119 127 words, and its sha256 goes `a3f45a3f…` → `7e172500…`.

## 4. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | lines before → after | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|---|
| base | 3 052 639 | 3 194 446 | +4.6 % | 495 305 | 519 746 | +4.9 % | 23 140 → 24 062 | 2981.1 → 3119.6 |
| V01 | 528 530 | 528 635 | +0.0 % | 86 759 | 86 783 | +0.0 % | 3 756 → 3 756 | 516.1 → 516.2 |
| V02 | 565 121 | 565 121 | 0.0 % | 94 571 | 94 571 | 0.0 % | 4 227 → 4 227 | 551.9 → 551.9 |
| V03 | 467 810 | 467 810 | 0.0 % | 79 495 | 79 495 | 0.0 % | 3 304 → 3 304 | 456.8 → 456.8 |
| V04 | 530 264 | 535 373 | +1.0 % | 86 354 | 87 261 | +1.1 % | 3 636 → 3 644 | 517.8 → 522.8 |
| V05 | 403 128 | 404 653 | +0.4 % | 68 130 | 68 390 | +0.4 % | 3 089 → 3 096 | 393.7 → 395.2 |
| V06 | 694 809 | 706 957 | +1.7 % | 113 594 | 115 756 | +1.9 % | 4 617 → 4 655 | 678.5 → 690.4 |
| V07 | 613 621 | 621 436 | +1.3 % | 101 591 | 102 942 | +1.3 % | 4 098 → 4 123 | 599.2 → 606.9 |
| V08 | 582 193 | 582 193 | 0.0 % | 92 453 | 92 453 | 0.0 % | 3 735 → 3 735 | 568.5 → 568.5 |
| V09 | 770 727 | 776 936 | +0.8 % | 127 176 | 128 272 | +0.9 % | 5 028 → 5 044 | 752.7 → 758.7 |
| V10 | 522 915 | 524 498 | +0.3 % | 84 620 | 84 911 | +0.3 % | 3 580 → 3 580 | 510.7 → 512.2 |
| V11 | 679 521 | 681 412 | +0.3 % | 113 537 | 113 848 | +0.3 % | 5 465 → 5 470 | 663.6 → 665.4 |
| V12 | 525 576 | 525 763 | +0.0 % | 85 264 | 85 299 | +0.0 % | 3 560 → 3 560 | 513.3 → 513.4 |
| INDEX | 24 074 | 24 074 | 0.0 % | 4 054 | 4 054 | 0.0 % | 202 → 202 | 23.5 → 23.5 |
| rationale | 704 813 | 704 813 | 0.0 % | 119 127 | 119 127 | 0.0 % | 2 386 → 2 386 | 688.3 → 688.3 |
| **base + volumes** | 9 936 854 | 10 115 233 | +1.8 % | 1 628 849 | 1 659 727 | +1.9 % | | **9704.0 → 9878.2** |
| **volumes** | 6 884 215 | 6 920 787 | +0.5 % | 1 133 544 | 1 139 981 | +0.6 % | | 6722.9 → 6758.6 |
| **base + volumes + INDEX** | 9 960 928 | 10 139 307 | +1.8 % | 1 632 903 | 1 663 781 | +1.9 % | | 9727.5 → 9901.7 |

Words are whitespace-split, as rounds 0–6 counted them; a seat's `wc -w` figure can differ by a few.

**Why every changed unit grows.** This round repairs round 6's findings under adjudication-r7's rulings, which are owner-bound:
* **J146** puts the raised-way × wall family's **laws** (Part L) at §2.7's support step (6) as normative text, with R7-02's worked
  examples after them. That is the model's +14 675 words: 5 887 words of laws, and 12 776 words of examples against the 4 902 they
  replace.
* The round also writes Part H's END lines in every unit. These add the rulings' cases, bars and fixtures, and both ends of
  cross-unit fixes. Scope's §13.2 item-110 bullet (the END texts' bars, the state sweep among them) is +5 054 of its +5 398, by its
  header's count.
* The assembler may not compress text.

**Where text is removed.** Several units replace restatements of the family's rules with citations of §2.7's laws: pipeline (§4.8's
fixed-place list and the `vault` reading's cases), determinism (the unwalled-stage list and pull list), rendering (six cap and `vault`
restatements), V04 and V09. The model compresses nothing this round: its header says the compression pass J145 (c) schedules once the
family closes will cut restatement.

**Against the shrink goal.** The band is 25–40 % fewer words than the pre-coherence archive, which held 1 491 685 words for base and
volumes. The set now stands at 1 659 727 words, +11.3 % against the archive. No unit shrank, so none shrank by more than half. Each
repair file states what holds its unit.

**Duplicate id definitions across the set** (principle (4)): **none** (`sizes.py`). The census covers the judgment index, Part A, D-n,
T-ER, every volume's T-Vn-m and J-Vn.m rows, and `_integrate.md`'s J-VI rows. The resolver's defined ids go from 3 467 to 3 468: scope's
T110-8, the stepped-building bar renumbered from T110-4 so that T110-4 is the laws' property bar alone (scope's JUDGMENT 1).

## 5. References

### 5.1 The resolver

**The resolver.** This is assemble-r0's `refs.py` (citation form canon S7: a bare `§x` is the base's; a volume's section is `Vnn §x`
everywhere), unchanged but for its root. It ran on two mirror trees (`mirror.sh`), the untouched set and the final set, each with
`_integrate.md`, files f and g, `research/` and `docs/volumes/critique/` linked in.

**What it checks.** Every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…`, with lines read joined,
against the headings and ids that now exist. The numbered targets are unchanged by the round: base 147, V01 121, V02 99, V03 53, V04
66, V05 60, V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8. Defined ids: 3 468.

**Ordering.** All fourteen files were applied before the run (ROUND-7 NOTES (9) (b)), the model's blocks first ((9) (e)). So every
cross-unit citation of Part H's END lines is read with both its ends in place. The untouched run's printout is identical to
assemble-r6's final run (`refs-before.out` = assemble-r6's `refs-final.out`).

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 56 332 | 57 042 | the target exists |
| external | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 85 | 95 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 (1 before the fix) | a bare `§x` that only one volume of its list has — the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 56 555 | 57 275 | |

**Broken: 0**, before and after.

**Mechanical fixes: 1** (`fixrefs.py`, assemble-r0's logic; `ref-fixes.tsv`).
* **The site.** The first run of the final set found one reference of class FIX, in the model's §2.7 block. It is the crossing
  table's row **W6** (base l. 3334): "(a palisade neglected or superseded, V06 §3.7.3, §3.7.6 (4))".
* **Why it is mechanical.** The bare `§3.7.6` continues a V06 list. No base heading has §3.7.6, and V06 does. This is the class
  assemble-r0 fixed mechanically (488 fixes) and assemble-r2 fixed in V12 (2): the G-cite rename every volume rewrite records (canon
  S7; V12's *Id rulings*: every section of a list carries its prefix).
* **The fix** inserts "V06 " before the `§`: "V06 §3.7.3, V06 §3.7.6 (4)". The table row keeps its cell count.
* **The result.** The base goes `45a3f366a7ffa206…` → `14304a3da4612718…`. The resolver's second run finds it resolved, and no other
  class moved.
* No repair file records a renumbering, and no heading moved (section 2.2).

**Ambiguous form: 95** (85 before), listed in `ambiguous-refs.tsv` with unit, line, reference, the list's head volume and context:
base 18, V01 15, V02 13, V03 12, V04 1, V05 4, V06 5, V07 2, V09 7, V10 6, V11 10, V12 2. Each resolves under S7 as the base's; the
verifier confirms each or prefixes it.

The round's changes to this list, all checked by reading:
* **Three sites gone**, rewritten by this round's blocks:
  * V06 l. 4060 ("§2.7's crossing table, *over the band*");
  * V11 l. 208 ("§2.7's crossing table at S5a and S7");
  * V11 l. 3962 ("§2.7's way-and-channel table, rows (a)–(b)").
* **Thirteen sites new.** Each is the base's as its words say — "§2.7's laws", "§2.7's support step" or "§4.3's crossing rule" after
  a volume list:
  * base l. 2303 (§2.7 after "V06 §2.13 and V11 §2.8c cite it");
  * base l. 3100 (§4.3 after a V09 list);
  * base l. 3102, 3103 (§2.7's laws after a V01 list);
  * V06 l. 1605, 4095, 4172;
  * V07 l. 1415, 3708;
  * V10 l. 1686;
  * V11 l. 208, 3959, 3965.

**External: 131** (bare 120, bare-cont 1, J 10), listed in `external-refs.tsv`.

### 5.2 §2.7's laws, cited by law, clause and term (ROUND-7 NOTES (9) (e); `lawrefs.py`, `lawrefs.json`)

The resolver reads section numbers, not the law, clause and term names the other units' blocks cite from §2.7's laws. `lawrefs.py`
therefore parses the installed laws — from "(0) **§2.7's laws**" (base l. 2578) to "**Worked examples**" (l. 2891), which the model's
block wrote first — and checks every citation of them in the installed base, volumes and INDEX, with lines read joined.

**What the laws define:**
* **law 1:** the clauses (1)–(11);
* **law 2:** the heads *Entry*, *Newer*, *Not yet built*, *The soft readings*, *Carried way* and *A warp*; the steps (a)–(c); and the
  labels (G1) and (G3) it writes;
* **law 3:** the keys (1)–(3);
* **law 4:** the label (G2);
* **the Terms:** 47 bold or italic terms, among them *meeting*, *what stands of a wall*, *the band*, *the wall's top*, *the strip*,
  *beyond the foot*, *the zone*, *the tiers*, *anything across a strip*, *held*, *placement*, *shape*, *the reach*, *Order* and
  *commit*, with *newly* and *deepens*; and *The check*.

**What is cited:**
* **776 citations of a law by number:** base 518, V01 4, V04 34, V06 97, V07 64, V09 34, V10 8, V11 16, V12 1.
* **783 clause citations**, numeric ranges expanded:
  * law 1 (1) 30, (2) 90, (3) 53, (4) 55, (5) 94, (6) 69, (7) 42, (8) 115, (9) 31, (10) 31, (11) 20;
  * law 2 (a) 69, (b) 14, (c) 59;
  * law 4's (G2) 11.
* **57 term citations:**
  * "law 2 *Entry*" 26, "law 2 *Carried way*" 20, "law 2 *Newer*" 5, "law 2 *Not yet built*" 5, "law 2 *A warp*" 1;
  * "laws' *Order*" 12, "*held*" 6, "*anything across a strip*" 2, and *Newer*, *The check*, *beyond the foot*, *meeting* and *the
    band* 1 each.

**Result: 0 citations do not resolve.**
* Every cited law is one of 1–4, every clause exists for its law, and every head and term is defined.
* V11's "alignment law 0" and "alignment sacred −, law 0" are content values of its tables, not citations, and are passed over.

The named worked examples that scope's hand-off lists all stand in the installed §2.7: *Strips, zones and nearest points*,
**Several raised ways**, *No gate and no tower*, the lock, bent-group and fixed-place sentences.

### 5.3 §2.7's two tables, cited by name (`tablerefs.py`, `tablerefs.json`)

**What the installed §2.7 defines:**
* the four outcomes ***over the band***, ***down before the wall***, ***beneath*** and ***unchanged meeting***;
* the crossing table's rows W1–W14 and columns C1–C13;
* the way-and-channel table's rows (a)–(e).

**What the set cites:**
* outcome names after "crossing table": base 24, V01 1, V04 1, V05 1, V06 6, V09 3;
* cells `Wn·Cm`: base 102, V04 1, V06 2;
* "way-and-channel table, row(s) …": base 10, V01 1, V09 3, V11 1.

**0 do not resolve.**

## 6. Document checks (three-copy method, one corpus snapshot)

**The command.** `python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with
`docs/validation/doc-checks-allow.tsv`, run by `checks.py` on three copies against one corpus snapshot:
* **untouched** — the live base before this round, sha256 `f39f1c30…`;
* **new** — the blocks applied, `99242252…`;
* **combined** — the installed text after scope's swap and the G-cite fix, `14304a3d…`.

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
| untouched (a) | first | 5 / 0 | 1 / 0 | 3298 / 0 | 12 / 0 | 0 / 0 | 298 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1705 / 0 | 6 / 0 | 0 / 0 | 298 / 0 | **0** |
| new (a) | first | 5 / 0 | 1 / 0 | 3424 / 128 | 12 / 0 | 0 / 0 | 314 / 0 | 1 |
| new (b) | first | 5 / 0 | 1 / 0 | 1768 / 64 | 6 / 0 | 0 / 0 | 314 / 0 | 1 |
| combined (a) | first | 5 / 0 | 1 / 0 | 3424 / 128 | 12 / 0 | 0 / 0 | 314 / 0 | 1 |
| combined (b) | first | 5 / 0 | 1 / 0 | 1768 / 64 | 6 / 0 | 0 / 0 | 314 / 0 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3298 / 0 | 12 / 0 | 0 / 0 | 298 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1705 / 0 | 6 / 0 | 0 / 0 | 298 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3424 / 2 | 12 / 0 | 0 / 0 | 314 / 0 | 1 |
| new (b) | final | 5 / 0 | 1 / 0 | 1768 / 1 | 6 / 0 | 0 / 0 | 314 / 0 | 1 |
| **combined** (a) | final | 5 / 0 | 1 / 0 | 3424 / 0 | 12 / 0 | 0 / 0 | 314 / 0 | **0** |
| **combined** (b) | final | 5 / 0 | 1 / 0 | 1768 / 0 | 6 / 0 | 0 / 0 | 314 / 0 | **0** |

(hits / unreviewed.)

**The final result.** The installed document's final run exits 0 on both key sets. Its total over the 34 keys is **3 756 hits** (C1 5,
C2 1, C3 3 424, C4 12, S1 0, S2 314), 0 unreviewed.
* The untouched copy is round 6's clean state: exit 0, its counts equal assemble-r6's combined run.
* The 16 new S2 hits are all matched by rows the allow file already holds; each resolves in the set (section 5).
* **The new copy's one remaining hit** is "3 7 3 3 7 6 4 and". This is the crossing table row W6's text *before* section 5's G-cite
  fix ("V06 §3.7.3, §3.7.6 (4)) and"), counted once in (b) and twice in (a). The installed text no longer carries it: it reads "V06
  §3.7.3, V06 §3.7.6 (4)) and", whose run "3 7 6 4 and" has a reviewed row. A row for text the design does not hold would only
  stand stale, so none is written.

**Corrected: none by hand.** There was no S1 table fault, and the only mechanical change is the G-cite fix of section 5.

**The 64 unreviewed hits of the (b) set are 58 distinct runs.** `attrib.py` attributed each (`c3-attribution.tsv`) and `hitctx.py`
recovered its original text at every site (`hitctx.tsv`). This seat read each in context. Every one is:
* new text of a repair block, absent from the untouched base;
* free of any list, table, grammar, palette or identifier;
* held whole by no corpus file (a chain of corpus 3-grams meeting by chance), but two — see the reviewed rows below.
They are false positives: our own plain English, our own law and section pointers, test ids and rung names.

**Fifteen proposed rows**, re-checked as carried by the proposing seat's block:
* **Twelve proposed by scope** (NOTE FOR ASSEMBLE (2)), all in §13.2's T110-2:
  * "a variant of the river", "clear of the building s", "clear of the ring s", "crossing of the ring s", "every point of the river",
    "one of the ring s", "the wall and the way" and "way the same on a" — plain English of the END texts E-S2–E-S7 and the F-WALL
    rung's table-edit run;
  * "law 1 2 5 6", "law 1 2 5 the same", "law 1 2 7 8" and "law 1 2 7 then" — numbered law pointers of Part H's citation form.
* **Four proposed by determinism:**
  * "law 1 2 5 6" — §7.1 *Raised ways*, E-D2. It is the same run scope proposed, so one row names both proposers.
  * "or on the path it" — §7.1's lock row, E-D1.
  * "moved to the edge a" — `bend.wall.raisedCrossing`'s row, E-D3.
  * "changes and the dry run" — §7.3 item 4, E-D6.
* **Two runs also stand in the model's §2.7 text**, and this seat read those sites too. Both are our own words:
  * "law 1 2 7 8" at l. 3370 — the support step (7);
  * "the wall and the way" at l. 2912 — the way-and-channel table's row (b), "clear the gate and the wall and the way passes".

**Forty-three rows in the model's §2.7 block — the assembler's own review.** The model's header lists its runs for this seat (its
dry run counted 46 unreviewed hits over §2.2, §2.7 and §2.8) and proposes no row. The assembled document carries 45 distinct runs in
the model's text: 43 no seat proposed, and 2 that also stand in scope's proposed rows. These follow the
assemble-r3, -r5 and -r6 precedent for hits no seat proposed. Each is the laws' or the worked examples' ruled text:
* **Law, clause and test pointers (12):**
  * "1 3 and a road", "1 4 is a gate and", "1 5 6 4 3", "b from the first point", "band law 1 2 4 6", "entry and the other side",
    "law 1 2 4 9", "law 1 2 4 of", "law 1 2 and a" — numbered law pointers of the citation form;
  * "2 1 3 5 6" — T110-2's clause numbers;
  * "raised at a village and" — F-V-RAISED, a rung name;
  * "to it 0 2 7" — (6)'s lead "gives way to it:" and the bullet "(0) **§2.7's laws**".
* **Volume section pointers with their item numbers (5):** "3 19 2 2 the", "3 7 2 3 and" (rows W7, W8), "3 7 6 1 and", "3 7 6 4 and"
  (row W6, after the G-cite fix), and "3 where the wall is".
* **Our own plain English (26):**
  * "along a line at the", "as they are drawn a", "at the point of the", "clear it is placed along the", "edge is the union s
    boundary", "footprint of the gate or", "gate at the midpoint of the";
  * "inserted on the wall s", "is at the end of every", "line at the dry run", "of the wall and the", "on it and a deck", "once as
    a function of", "only on the axis the";
  * "part of the other side", "passage and a gate with no", "passing through it in the", "point is the first point", "point of the
    edge on the side", "the entrance and the tower";
  * "the gate and the wall and", "the gate and the wall and the way", "them and the other side", "to the shape of a";
  * and the two read in context below.
* **Two held whole by a corpus file, read in context** (assemble-r1's precedent). Each is ordinary English of another subject in a
  reader-tier findings note written in our own words:
  * "at the end of every" — law 1's lead and *The check*, "At the end of every commit". It is held by
    `research/findings/code-village.md`'s "at the end of every approach trail".
  * "is a part of the" — the bent-group sentence's "A **lawful crossing** is a part of the line". It is held by
    `research/findings/watabou-extra-a.md`'s "it is a part of the forest".

**Reviewed allow rows: 58**, in one block `# block: coherence/assemble-r7` appended by `allowrows.py`.
* **Append only.** Assemble-r6's two rules are unchanged but for two widenings:
  * a run several seats' text carries may take its proposer's row, every proposer being among its carriers;
  * the quoted text is matched case aside.
* The script stops unless every attributed hit is covered by exactly one rule:
  * a proposed row only where a proposing seat carries the text;
  * a reviewed row only where the named seat carries it, no seat proposed it, and every line the run starts on carries the quoted
    text;
  * both only for text absent from the untouched base and held whole by no corpus file, but the two runs above, each named with its
    corpus file.
* It ran only after checking that the allow file's sha256 still equalled HEAD's.
* The allow file goes from 2 350 to 2 409 lines (a header and 58 rows), sha256 `02ad22b0…` → `e272a355…`. Its first 2 350 lines are
  byte-identical to HEAD.

**Allow rows not dropped.** The brief allows dropping rows that point at text this pass removed, "with a note". Five of assemble-r6's
C3 rows now match text that was in the untouched base but is in neither the installed base nor any volume. Each was rewritten by the
model's §2.7 block (the crossing table's *beneath* and its note):
* "0 clear of the ramp";
* "clear of the towers and gates";
* "s or the edge of";
* "state and the test that";
* "the foot of the ramp".

They are **kept and listed here for the close**, beside the six assemble-r6 listed. The file is shared, and the orchestration notes
forbid this seat to rewrite or truncate a shared file, so this seat only appends, as in rounds 0–6. A kept row hides no new hit,
because review is by exact text.

**Volume information runs** (`volchecks.sh`, `volsummary.py`, recorded in `volchecks-final.txt`). Each volume, INDEX and the
rationale was run as a whole document, untouched against installed, with `--heads` the matching base. Volume runs carry hundreds of
unreviewed runs from before this pass and are not held to exit 0, as in rounds 0–6.

The installed volumes add 15 new distinct unreviewed pairs and drop 2. All are C3 runs of this round's block text (law-number and
section pointers or ordinary words):
* V04: +2 / −1. Added: `between two of them that`, `one of the wall s`. Gone: `between two of them 2`.
* V06: +5 / −1. Added: `3 19 2 1 the`, `3 7 6 2 and`, `clears it and the wall`, `gate and the castle s`, `the wall and the same with`.
  Gone: `3 7 1 and it`.
* V07: +2: `1 5 and 0 on a`, `crossing of the palisade s`. V07's header records both.
* V09: +2: `law 1 2 5 6 10`, `law 1 2 with no`. V09's header records its law-number runs.
* V11: +3: `4 2 s3 4 4`, `law 1 2 5 7 10`, `law 1 2 5 7 the`.
* V12: +1: `law 1 2 5 7`.
* V01, V02, V03, V05, V08, V10 and INDEX: 0.

No volume seat proposed a row in the allow file's tab form, so none is appended. They are listed for those volumes' seats or the close.

**The rationale** (information; not held to exit 0) changed this round in one row. It was run untouched and installed: C3 493 / 320
unreviewed and S2 17 / 15 on both. The swapped row adds no hit.

## 7. Bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md`: 72 761 lines reported from 14 sources, 9 982 400 → 10 160 779
bytes, sha256 `af068f6d25eb10db…` → `43b2acf26728f90c…`. `--check` reports it UP TO DATE (exit 0).

## 8. Review ids and review markers in design text (ROUND-7 NOTES (9) (c), (e))

**Method.** `reviewids.py` counts citations of review-process ids in the live base, volumes and INDEX:
* the rulings `R<n>-nn`;
* every issue, conflict, wiring, inventory or probe id the coherence pass's own records define (`verify-*.md`, `adjudication-r*.md`,
  `inventory-*.md`, `probe-r*.md` — this round's `probe-r7*.md` among them; canon, agreement, edges, wiring) — 9 130 tokens, 233 of
  them `PRB…` ids;
* less any token the design itself defines, and the design id families.

A citation counts only outside the decision and request records. Those are, in the base, *Delegated decisions* and *Judgment calls*;
in the volumes, §9 Decisions, §10 Base change requests, §13 Fix list and Integration notes; anywhere, a J-, BCR-, X- or CVR- row.

**Four separate counts for (9) (e)**, each over the whole set, records included:
* every `PRB…` token (`PRB7-nn`, `PRB7B-nn`, `PRB7C-LCK-nn` …);
* every "(amended, …)" marker;
* every parenthetical opening with a J144–J151 id ("(J146, PRB7…)", a bare "(J147)" …);
* every END-line id of Part H (`E-M1`, `E-D7`, `E-S0`, `E-V6-20` …), which the design-id family rule would pass over.

The census is read-only: nothing was edited, and the verifiers raise any site.

**Results** (untouched → installed):
* **Design-text sites of review ids: 0 → 0.**
* **`PRB…` ids: 0 → 0.**
* **"(amended, …)" markers: 0 → 0.**
* **Change markers "(J147)", "(J148)", "(J149)": 0.** The installed text carries six parentheticals opening with a J144–J150 id
  (0 before). Each cites an owner decision as the source of the rule beside it — the form the base already uses for its J rows
  ("(J121)", "(J122)", "(the owner's rule, J148)"), which ROUND-7 NOTES (9) (e) allows:
  * base l. 2578, the laws' head: "the raised-way × wall family's laws, normative (J146)" — E-M1's words;
  * base l. 2653, *held in placement*: "its shape still changing at a meeting (J144)";
  * base l. 2738, law 1 (10): "a meeting changing a placement-held thing's shape alone (J144)";
  * base l. 19245, §13.2's T110-2: "from the milestone that carries the shape lock (J147, J150)";
  * base l. 19538, §13.2's T110-4: "nothing held because it was drawn or declared (J147)";
  * V07 l. 2312, §3.11: "its gates kept — never moved for a meeting (J148)".
  Every J144–J151 mention in the set is listed in `reviewids-final.json` (23: base 19, V06 1, V07 2, V11 1) for the verifiers.
* **END-line ids: 2 → 2**, both V09 l. 4628's "(Part II, E-S33, E-S34)". These are design ids of Part II that stood before this round,
  not Part H's END lines.
* **No ruling id and no verifier issue id stands in design text.**
* **Inside the records, 25 citations stand**, kept as records and unchanged: V03 9, V09 15, V10 1.

Full lists: `reviewids-final.tsv` and `.json`, `reviewids-untouched.tsv` and `.json`.

## 9. Not placed, and left for the verifier

* **Unplaced: the RULING REQUEST block only.** Determinism's `=== RULING REQUEST E-D7 ===` was skipped, as ROUND-7 NOTES (2) and (9) (f)
  require. The orchestrator accepted it, and determinism's other blocks carry its names (section 2.3).
  * Every other block of the fourteen files is applied.
  * Scope's NOTE FOR ASSEMBLE is applied as written: the J-A110.01 swap and the twelve rows.
  * There is no double REPLACE, so no merge conflict and no lost hunk.
  * No block targeted a missing or retitled heading.
* **The E-D7 names — one other site** (section 2.3): V09 §4.9's `fate.reshaped` row says "(§5.4's `reshaped` entry's)" after "the
  fate's `change`". The entry's field is now `reshape`.
* **Broken references: 0** (section 5). There was one mechanical G-cite fix (base l. 3334, row W6's `V06 §3.7.6`). §2.7's table names
  and every law, clause and term citation of §2.7's laws resolve.
* **95 ambiguous-form references** (section 5, `ambiguous-refs.tsv`; 13 new, 3 gone). They read as the base's under S7; the verifier
  confirms each or prefixes it.
* **Review ids and review markers in design text: 0.** Six owner-decision citations of a rule's source (J144, J146, J147, J148, J150)
  are listed (section 8).
* **Hand-offs between units recorded in the repair files' headers** (section 2.4) are not assembly work.
* **Volume document checks:** 15 new volume hits without a row in the allow file (section 6, `volchecks-final.txt`), for those
  volumes' seats or the close.
* **Eleven allow rows now match nothing** in the set: five of assemble-r6's (section 6) and the six assemble-r6 listed. They are kept,
  since the shared file is append-only for this seat; the close may drop them.
* **The document checks are provisional** (section 6). Re-run them on the machine that holds the reference corpus. Of the 58 base rows,
  15 were proposed by the seats that wrote the text and 43 were reviewed by this seat alone. Two of the 43 are held whole by a
  findings note and were read in context.
* **Size:** the set is at +11.3 % words against the pre-coherence archive, outside the shrink band (section 4). Each repair file
  states what holds its unit. The model's header names the compression pass J145 (c) schedules for the family.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):**
* the 15 live files' sha256:
  * before: each equal to its HEAD blob at `dea06e07`;
  * after: each equal to its final copy, re-checked after the checks and the bundle;
* the fourteen repair files landed and committed;
* the routing of 95 blocks and the census: 0 missing, 0 ambiguous, 0 unclosed, 1 RULING REQUEST (skipped), 0 overlap, 0 double REPLACE,
  0 retitle;
* the model's blocks applied first;
* 94 applied, with audit not-OK 0 and balanced fences in every file;
* the volume outputs against their seats' records:
  * six equal to their recorded sha256 (V04, V06, V07, V10, V11, V12);
  * V01 equal to its recorded bytes and lines, V05 to its recorded lines;
  * V09 equal to its recorded counts;
* the five base seats' stand-alone runs and their recorded combined runs reproduced, the five diffs disjoint;
* scope's swap: 805 = 805, one id set, orders unchanged, the rows equal to its blocks, the rationale changed on one line;
* the E-D7 names at §5.4, §7.1's `EditFate` and §2.7's law 4 (G2), and the one other site;
* no heading added, removed or retitled;
* the reference counts of section 5: 0 broken, the one G-cite fix, every §2.7 table name and every §2.7 law, clause and term citation
  resolving;
* the document checks' counts of section 6, the installed copy exiting 0 on both key sets against one corpus snapshot;
* the allow file appended only;
* the bundle regenerated and `--check` clean;
* the sizes of section 4 and no duplicate id definition;
* the review-id and marker census of section 8.

**PLAUSIBLE:**
* **That the 58 reviewed rows are false positives.** Each was attributed by script and read in context by this seat. Fifteen were
  proposed by the seats that wrote the text; 43 have no second reader.
* **That V01's, V05's and V09's outputs equal their seats' generators.** Those seats record counts but no hash, and all the counts
  match.
* **That the ambiguous-form references read as their authors meant.** S7 reads them as the base's. The new ones were checked by
  reading, the rest not one by one.
* **That `lawrefs.py` catches every citation of §2.7's laws.** It reads:
  * a "law n" or "laws n–m", with the clause list right after it;
  * a law-2 head right after "law 2";
  * a term after "laws'".
  A term cited in another form (a bare *Order* in running text) is not checked.
* **That the review-id census's token set is complete.** It reads:
  * the ids the coherence records define as headings, first table cells or bold labels;
  * the `R<n>-nn` rulings;
  * every `PRB…` token, every "(amended, …)" and J144–J151 parenthetical, and every END-line id.
  An id cited only in running text of a record would be missed.
