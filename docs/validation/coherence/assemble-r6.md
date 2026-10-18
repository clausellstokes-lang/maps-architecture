# Assemble — coherence pass, round 6 (the seventeen repair-r6 block files applied to the base and the volumes)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r6 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r6`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at b3f83a0d, the base 2d84eac2… assemble-r5 installed); untouched snapshot — done
- P2 block inventory and routing (17 files, 142 blocks: 140 REPLACE, 1 J-ROWS, 1 RATIONALE-A; 0 RULING REQUEST, 0 missing heading,
  0 double REPLACE); ASSEMBLE NOTES census (scope's NOTE FOR ASSEMBLE: the J-A67.45 swap and six proposed allow rows) — done
- P3 apply (142 applied, 0 skipped, audit not-OK 0; the twelve volume outputs equal their seats' recorded dry runs; the five
  base seats' stand-alone dry runs reproduced), scope's J-A67.45 swap (805 = 805, one id set), headings unchanged, install (14 of
  15 changed) — done
- P4 references: 56 555 checked, 0 broken, 0 mechanical fixes, 85 ambiguous-form listed; §2.7's two tables' citations by
  name (outcomes, cells, rows) all resolve — done
- P5 document checks, three-copy method: 18 reviewed base rows (6 proposed by scope, 12 the assembler's own review of model's §2.7
  text), exit 0 on every copy and key set (PROVISIONAL: corpus incomplete); volume information runs — done
- P6 bundle and `--check` — done
- P7 review-id and PRB6 census (ROUND-6 NOTES (9) (c), (e)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r6/`: `snapshot.py`, `route.py`, `apply.py`
(which runs `docs/validation/amendments-b/apply-blocks.py` unchanged), `handoff.py` with `swap_restated.py`, `headings.py`, `install.py`,
`mirror.sh` with `refs.py` and `refsreport.py`, `fixrefs.py` (no fix to make), `tablerefs.py`, `checks.py`, `attrib.py`, `allowrows.py`,
`volchecks.sh` with `volsummary.py`, `sizes.py`, `unitsizes.py` and `reviewids.py`. They are assemble-r5's scripts with the round label
and the scratch folder (`scratchpad/coherence/asm6/`) changed. Five are this round's own or changed:
* `handoff.py`: scope's swap; the checks of the judgment tables; the reproduction of the five base seats' recorded dry runs.
* `swap_restated.py`: `work/repair-scope-r3/swap_restated.py` with `IDS = ['J-A67.45']`, as scope's note asks.
* `tablerefs.py`: ROUND-6 NOTES (9) (e)'s check that the names other units cite from §2.7's two tables resolve.
* `reviewids.py`: reads `probe-r*.md` too and counts `PRB6-nn` ids and "(amended, PRB6-nn)" markers.
* `volsummary.py`: pairs the rationale's untouched and installed runs, since the rationale changed this round.
No live text was edited by hand. Each script's records sit beside it (`snapshot.json`, `blocks.json`, `split/`, `logs/`,
`apply.json`, `handoff.json`, `headings.json`, `install.json`, `fixrefs.json`, `ref-fixes.tsv`, `refs-before.out`, `refs-final.out`,
`refs-summary.json`, `ambiguous-refs.tsv`, `external-refs.tsv`, `tablerefs.json`, `checks-first.json`, `checks.json`,
`c3-attribution.tsv`, `volchecks-final.txt`, `sizes.json`, `unitsizes.json`, `reviewids-untouched.*`, `reviewids-final.*`).

## Outcome

**All seventeen repair files had LANDED before this seat started.** Each has a `coherence/repair-<unit>-r6 LANDED` line in the lane
log and its result in `results/coherence_repair-<unit>-r6.json`, each recording `ruling_requests: 0`. All seventeen are committed at
HEAD `b3f83a0d` (ROUND-6 NOTES (9) (d)). Kernel had nothing to repair this round, so it has no file.

**Blocks: 142 found, 142 applied, 0 skipped.**
* The kinds: 140 REPLACE, 1 J-ROWS and 1 RATIONALE-A (both scope's).
* No file carries a RULING REQUEST. The three "RULING REQUEST" strings in the seventeen files are header counts ("0 RULING REQUEST
  blocks").
* No heading was missing or ambiguous, and no block was truncated.
* No two blocks touch one subsection (no double REPLACE, no nesting), so no three-way merge was needed.
* The audit finds every applied body exactly once, and the fences are balanced in every file.
* All twelve volume outputs equal the results their repair seats recorded for their own dry runs: ten by sha256, V01 and V04 by
  bytes and lines.
* Each of the five base seats' recorded stand-alone and combined dry runs is reproduced.

**The round's one note for Assemble is applied as written.** It is scope's NOTE FOR ASSEMBLE:
* (1) the restated J-A67.45 rows are swapped into their older rows' places;
* (2) the six proposed allow rows are reviewed and written.

**Nothing is unplaced.** The round adds, removes and retitles no heading.

**Size.** The set (base and volumes) goes from 9 649.1 KB to 9 704.0 KB (+0.6 % bytes, +0.6 % words).

**References.** 56 555 are checked and **none is broken**. None needed a mechanical fix. 85 resolve but are ambiguous in form (85
before). Every name the round's blocks cite from model's §2.7 tables also resolves: the four outcomes, the cells `Wn·Cm` and the
way-and-channel table's rows (a)–(e).

**Document checks.** They exit 0 on the untouched, new and combined copies, over every top-level key and over the eight `#` keys,
against one corpus snapshot. This needed 18 reviewed allow rows. The result is **provisional**, because the reference corpus is
incomplete in this checkout. The combined document's total is **3 614 hits**, 0 unreviewed.

**Bundle.** `docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes.

**Review ids in design text** (ROUND-6 NOTES (9) (c)): **0 sites** outside the decision and request records (0 before). **PRB6 ids
and "(amended, PRB6-nn)" markers** ((9) (e)): **0** anywhere in the base, the volumes or INDEX (0 before).

## 1. Live files — sha256 before and after

**Before:** the committed text at HEAD `b3f83a0d428d`. Each live file equalled its HEAD blob. These are assemble-r5's outputs; every
repair file was written against the base `2d84eac2…`.

**After:** written by `install.py`. It ran only after confirming each live file still held its P1 sha256, and it verified each
written file byte-identical to its final copy. This was re-checked after P5–P6 and still holds. No reference fix followed (section 5),
so the installed files are the final ones. The orchestrator's checkpoint commit `6a2dd56`, made while this seat was
still running, holds these installed files; the live files equal it at landing.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 3 019 440 | 3 052 639 | `2d84eac2d8a379d11bc55e5490700cf812075d40a774a88a624e116886d638e0` | `f39f1c30126976c0bd2afedd5f95a23d7e6c19e0a0e5ff4f8be49ca113bbb15b` |
| `docs/ARCHITECTURE-RATIONALE.md` | 704 770 | 704 813 | `a480f02e58a893fea57cacc5977b83489f633ced23901f578adbcfbd8059c52a` | `a3f45a3f3ad67dc46ac506c244d2497775848195cdf2e0c022cd654f372f70f0` (J-A67.45's Part A entry restated, section 3) |
| `docs/volumes/V01-neighbourhoods.md` | 527 808 | 528 530 | `4585e1a59d0e499ab46301fdaa6dd5b5cc13d781474dc88202b2dff2b3e4972a` | `bd9b4cebbb04f88ea4df4a9469d76d065cc22195ebe2672490c4ed01859d1077` |
| `docs/volumes/V02-buildings.md` | 564 391 | 565 121 | `fb46c67694cfe88d0691ec57c5cedcbfde0c263b994018dfeb38a4a2c83302c7` | `c7fbb7055d776409fe0f906059fcf943198ecb81de065054674be4859cef4540` |
| `docs/volumes/V03-interiors.md` | 467 516 | 467 810 | `3fe82c822e32b703769d0c1b56510405a1b35f32854b723d77de854541b1f373` | `894955c29098f435f9f483c2c0991fe7ebfc79b19d4dd0e0a2c078e676266792` |
| `docs/volumes/V04-underground.md` | 526 488 | 530 264 | `b79fd29048f06a90b564e0145b489e6fba68c407e9dfdbec99bbe627795a697e` | `fefd0cd444a1334e9b0fa67ccfd32ed44415409f4af0ad687ae523e9b37b6240` |
| `docs/volumes/V05-sky.md` | 401 879 | 403 128 | `171db6516974533d3e0aef4492f0bfbbae2f7a7c04b7a778ab19a11a14ee098e` | `a0dd3b65e35edef258cb29209b22ae3f3868868e4b7bdb91e29272a4db7b5e77` |
| `docs/volumes/V06-evolution.md` | 694 375 | 694 809 | `6fb1f6417fc1dfc886677f260dce1d38219ebd7a848d959a85260bf7792fc9e1` | `9653164ebb814d3a60a02a65e193161526ce98f15cd9c52ad5f9e75048dd470a` |
| `docs/volumes/V07-village.md` | 610 850 | 613 621 | `7747179dc9854aa6d319fc1a4db579a19f9ed694d36a9cb353e88dabb4750284` | `46dfede9907ee1a6602f79f10eadcd0f492c212bc16e3adc45ee15ddb5d28996` |
| `docs/volumes/V08-settlementforge.md` | 579 431 | 582 193 | `8b5b52439f96a352d878de641d3311f2ab8db1deee01cc1983f740036ded4f7d` | `83382cac1e496ffb29d7ca1d9ea1ed3c7b37978ddedd915ee50f73c89ca1b491` |
| `docs/volumes/V09-application.md` | 766 888 | 770 727 | `7c91d3bff549344b72ad0615b9362249269b2fd786e724b340c9afe50cd98253` | `046b6610e47e621d6773d9a8646f4e528a2089299347c883db7a00ac24593b11` |
| `docs/volumes/V10-clerk.md` | 518 300 | 522 915 | `847b3189f56daf453a5741f5077631f3be30c301acc85cf89190896116247f08` | `1014b64c7dc80feef334168db444130e22c8d25bf28c3787ca3e61798978c364` |
| `docs/volumes/V11-content.md` | 679 224 | 679 521 | `b1445a5ff552c7cba3ef9f35f39f48ea9586c8e97845cefa3dd9e4dca6e7ffae` | `0e2767c1b7ec2b438a3bd8e3027b67696791d9f3cf54757e8c89a0d520fec702` |
| `docs/volumes/V12-calibration.md` | 524 105 | 525 576 | `1e305ebe07843db09c56f838d12143ffb521538339239c838a45ad875e85e9a5` | `006b8ef1d304cee55b9e0754a7c8d26fe3de43a65fd9e88eddcb5be0cd60a51d` |
| `docs/volumes/INDEX.md` | 24 074 | 24 074 | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` (unchanged: no block routes to it) |

Also written:
* `docs/ARCHITECTURE-FULL.md`, the bundle (section 7);
* `docs/validation/doc-checks-allow.tsv`, one appended block (section 6).

## 2. Blocks — routing, application, audit

**The block files.** `blocks.json` records each one's sha256 as read. They are exactly `docs/validation/coherence/repair-r6-<unit>.md`
for the seventeen units (ROUND-6 NOTES (1)). Everything under `work/` and the bench files is the repair seats' working material, never
blocks.

| file | sha256 (16) | lines | FILE lines |
|---|---|---:|---|
| `repair-r6-V01.md` … `repair-r6-V12.md` | `658c474945a0787b`, `24fa09d2e6edee59`, `7aea4b547b52921b`, `bb43437f005eccbf`, `6980ed1537bce097`, `08b4edb354d03e1d`, `9cc5a8c6007827e7`, `fb4317fee78a6899`, `32f89c2a2155bfe0`, `76452c02700620d4`, `3c568ed1f657299f`, `eb14b36f3bebb9a9` | 859, 133, 332, 1 881, 672, 2 098, 715, 1 039, 1 743, 1 384, 1 583, 1 225 | one each, naming its volume |
| `repair-r6-determinism.md`, `-model`, `-pipeline`, `-rendering`, `-scope` | `89b8696ce8ffebee`, `88552b3a51df012f`, `05f4362aa3b1bcca`, `dffa38a809ccc176`, `cf07dc4681012240` | 2 038, 1 232, 2 794, 2 414, 1 965 | none (the base; scope's RATIONALE-A row goes to the rationale with the base run) |

**Routing** (`route.py`):
* Each file was cut at its `=== FILE <path> ===` lines. Every block went to the file its nearest FILE line above names, or the base
  when there is none (ROUND-6 NOTES (3)).
* No file carries blocks for more than one document this round, and none routes to INDEX.md.
* The split block files keep their repair file's basename, so `apply-blocks.py` applies them in the round's name order: V01 … V12,
  determinism, model, pipeline, rendering, scope.
* The FILE lines are left out (they are routing, not blocks); every other line is verbatim.
* The base ran with the rationale. Each volume ran with a throwaway rationale whose output equals its input.
* No text follows any file's last END.

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST, and 0 overlaps
of any kind. No two blocks of the round, within one unit or across units, cover one subsection or nest. Two consequences:
* **No double REPLACE.** The brief's `git merge-file` step (merge base: the subsection as assemble-r5 installed it, base
  `2d84eac2d8a379d1…`) had nothing to merge, so there is no conflict or lost hunk to report (ROUND-6 NOTES (4)).
* **No retitled target.** Every block was found on the text as it stood, and no block body retitles its heading (ROUND-6 NOTES (5)).

The kinds: 142 blocks — 140 REPLACE (base 29, volumes 111), 1 J-ROWS, 1 RATIONALE-A; no INSERT AFTER or APPEND TO SECTION.

| unit | blocks found | applied | skipped | target | covers | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|---|
| V01 | 11 | 11 | 0 | `V01-neighbourhoods.md` | §3.4.2, §3.6, §3.16, §3.17.3, §3.17.4, §3.18, §4.2, §5.1.3, ## 7, §8.2, ## 9 | 27 923 → 28 052 (+0.5 %) | 161.2 → 161.9 |
| V02 | 1 | 1 | 0 | `V02-buildings.md` | §8.6 | 192 → 308 (+60.4 %) | 1.1 → 1.8 |
| V03 | 4 | 4 | 0 | `V03-interiors.md` | §3.13, §5.2, ## 7, ## 8 | 12 666 → 12 717 (+0.4 %) | 73.6 → 73.9 |
| V04 | 17 | 17 | 0 | `V04-underground.md` | ## 0, §1.2, §1b.2, §1b.3, §2.6, §3.5, §3.10, §3.11, §4.1, §4.2, §4.3, §4.4, §4.6, §5.2, §5.6, ## 7, ## 9 | 50 477 → 51 134 (+1.3 %) | 296.6 → 300.3 |
| V05 | 3 | 3 | 0 | `V05-sky.md` | §3.16, ## 7, ## 8 | 11 333 → 11 562 (+2.0 %) | 66.1 → 67.4 |
| V06 | 17 | 17 | 0 | `V06-evolution.md` | ## 1b, §2.1, §2.8, §2.10, §2.12, §3.2, §3.6, §3.7, §3.11, §3.17, §3.19, §3.21, §3.22, §4.4, ## 7, ## 8, ## 9 | 64 406 → 64 476 (+0.1 %) | 385.7 → 386.1 |
| V07 | 7 | 7 | 0 | `V07-village.md` | ## 1b, §3.5a, §3.12a, §3.17, §4.5, ## 7, ## 12 | 23 443 → 23 915 (+2.0 %) | 137.9 → 140.6 |
| V08 | 11 | 11 | 0 | `V08-settlementforge.md` | ## 1b, §2.3, §2.7, §3.2, §3.6, §3.8, §3.17, §4.6, ## 6, §7.1, ## 9 | 40 339 → 40 790 (+1.1 %) | 238.6 → 241.3 |
| V09 | 13 | 13 | 0 | `V09-application.md` | §2.7, §2.12, §3.16, §4.3, §4.5, §4.9, §4.20.2, §4.20.6, §4.21, §5.7, §5.8, §5.15, §7.1 | 53 934 → 54 565 (+1.2 %) | 318.8 → 322.5 |
| V10 | 12 | 12 | 0 | `V10-clerk.md` | §1.2, §1b.1, §2.12, §2.13, §3.3, §3.5, §3.9a, §3.9b, §3.17, §3.23, §7.1, ## 8 | 31 862 → 32 590 (+2.3 %) | 193.2 → 197.7 |
| V11 | 6 | 6 | 0 | `V11-content.md` | §1b, §3.1, §3.24, §3.25, §3.26, ## 9 | 38 585 → 38 631 (+0.1 %) | 228.5 → 228.8 |
| V12 | 9 | 9 | 0 | `V12-calibration.md` | ## 0, ## 1b, §2.13, §3.4, §3.7, §3.12, §3.15, §7.1, §8.2 | 30 799 → 31 050 (+0.8 %) | 183.7 → 185.1 |
| determinism | 6 | 6 | 0 | `ARCHITECTURE.md` | §5.3, §5.4, §7.1, §7.3, §7.4, §7.7 | 51 779 → 51 803 (+0.0 %) | 316.7 → 316.9 |
| model | 3 | 3 | 0 | `ARCHITECTURE.md` | §2.1, §2.7, §2.9 | 21 935 → 25 923 (+18.2 %) | 136.7 → 158.3 |
| pipeline | 9 | 9 | 0 | `ARCHITECTURE.md` | §4.1, §4.3, §4.4, §4.5, §4.8, §4.9, §4.11, §4.13, II.7.6 | 51 589 → 51 655 (+0.1 %) | 310.9 → 311.4 |
| rendering | 8 | 8 | 0 | `ARCHITECTURE.md` | §8.2, §8.4, §8.9, §8.11, §9.5, §11.1, §11.2, §11.6 | 50 787 → 51 300 (+1.0 %) | 300.7 → 303.7 |
| scope | 5 | 5 | 0 | `ARCHITECTURE.md`, `ARCHITECTURE-RATIONALE.md` | §13.2, §13.8, ## §14, J-ROWS (J-A67.45), RATIONALE-A (J-A67.45) | 33 685 → 34 949 (+3.8 %) | 212.7 → 219.9 |
| **total** | **142** | **142** | **0** | | | | |

**How "covered text" is measured.** For a REPLACE, it compares the section in the untouched file with the section of its body's
heading in the installed file (whitespace-split words). For a J-ROWS or RATIONALE-A row, it compares the older row it restates with the
new one. Each unit's block count matches its header's and its result file's: V01 11, V02 1, V03 4, V04 17, V05 3, V06 17, V07 7, V08 11,
V09 13, V10 12, V11 6, V12 9; determinism 6, model 3, pipeline 9, rendering 8, scope 5.

**Each unit's word change matches its own header.**

| unit | words, its header | words, here |
|---|---|---|
| determinism | +24 | 51 779 → 51 803 |
| model | +3 988 | 21 935 → 25 923 |
| pipeline | +66 | 51 589 → 51 655 |
| rendering | +513 | 50 787 → 51 300 |
| scope | 33 551 → 34 804, plus its two rows 26 → 30 and 108 → 115 | 33 685 → 34 949 |
| V04 | +657 | +657 |
| V05 | +229 | +229 |
| V06 | +70 | +70 |
| V07 | +472 | +472 |
| V08 | +451 | +451 |

The other volumes' headers count with `wc` and differ from this whitespace count by a few words. V02's +60 % is its single §8.6
subsection; the whole volume grows by 0.1 %.

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines before → after | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 31 | 31 | 0 | 153 → 153 | 140 → 140 (balanced) | `fd59b92600b30e41` (before the swap) | equal to determinism's recorded combined run (31 blocks, audit OK) and to the five files' joint run here; each seat's stand-alone run reproduced (below) |
| `V01-neighbourhoods.md` | 11 | 11 | 0 | 123 → 123 | 12 → 12 (balanced) | `bd9b4cebbb04f88e` | equal in bytes and lines — repair-r6-V01 l. 28, 128: 527 808 → 528 530 bytes, 3 758 → 3 756 lines (no hash recorded) |
| `V02-buildings.md` | 1 | 1 | 0 | 77 → 77 | 16 → 16 (balanced) | `c7fbb7055d776409` | equal — repair-r6-V02 l. 26 (565 121 bytes, 4 227 lines) |
| `V03-interiors.md` | 4 | 4 | 0 | 48 → 48 | 14 → 14 (balanced) | `894955c29098f435` | equal — repair-r6-V03 l. 23 (467 810 bytes) |
| `V04-underground.md` | 17 | 17 | 0 | 59 → 59 | 12 → 12 (balanced) | `fefd0cd444a1334e` | equal in bytes and lines — repair-r6-V04 l. 122: 526 488 → 530 264 bytes, 3 626 → 3 636 lines (no hash recorded) |
| `V05-sky.md` | 3 | 3 | 0 | 62 → 62 | 14 → 14 (balanced) | `a0dd3b65e35edef2` | equal — repair-r6-V05 l. 98 (403 128 bytes, 3 089 lines) |
| `V06-evolution.md` | 17 | 17 | 0 | 65 → 65 | 28 → 28 (balanced) | `9653164ebb814d3a` | equal — repair-r6-V06 l. 179 (694 809 bytes) |
| `V07-village.md` | 7 | 7 | 0 | 58 → 58 | 18 → 18 (balanced) | `46dfede9907ee1a6` | equal — repair-r6-V07 l. 25 (613 621 bytes, 4 098 lines) |
| `V08-settlementforge.md` | 11 | 11 | 0 | 63 → 63 | 18 → 18 (balanced) | `83382cac1e496ffb` | equal — repair-r6-V08 l. 132 (582 193 bytes, 3 735 lines) |
| `V09-application.md` | 13 | 13 | 0 | 110 → 110 | 24 → 24 (balanced) | `046b6610e47e621d` | equal — repair-r6-V09 l. 96 |
| `V10-clerk.md` | 12 | 12 | 0 | 86 → 86 | 24 → 24 (balanced) | `1014b64c7dc80fee` | equal — repair-r6-V10 l. 112 |
| `V11-content.md` | 6 | 6 | 0 | 58 → 58 | 22 → 22 (balanced) | `0e2767c1b7ec2b43` | equal — repair-r6-V11 l. 26, 126 (679 521 bytes, 5 465 lines) |
| `V12-calibration.md` | 9 | 9 | 0 | 67 → 67 | 30 → 30 (balanced) | `006b8ef1d304cee5` | equal — repair-r6-V12 l. 130 |

**Audit, for each run:**
* every applied body is found exactly once in the output (not-OK 0);
* every title block is unchanged by the blocks;
* the PENDING FABLE REVIEW lines are unchanged in every file.

The applier printed one kind of note: the base run's two expected "DUPLICATE ID inserted" notes for J-A67.45. They come from scope's
restated J-ROWS and RATIONALE-A rows, which its swap resolves (section 3). There was no retitle and no supersession.

**The base seats' dry runs, reproduced** (`handoff.py`; `handoff.json` → `checks.alone` and `checks.combined_runs`). Each seat's blocks
were run alone on the untouched base and rationale and compared with what its header records:

| seat | alone: found / applied / skipped / audit not-OK | lines | its header's record, reproduced |
|---|---|---|---|
| determinism | 6 / 6 / 0 / 0 | 23 029 → 23 031 | headings 153 → 153, 14 hunks; the diff falls within its recorded lines "9244, 9247, 9257, 9289, 10357, 10443–10460, 10587, 10630–10633, 10708–10719, 10883, 11228, 11825, 12068–12069"; its combined run with the other four: 31 / 31, audit 0 |
| model | 3 / 3 / 0 / 0 | 23 029 → 23 128 | headings and fences (140) unchanged; the diff falls within its recorded "l. 556, 2292, 2317, 2503–2523, 2537–2628, 2638–2649, 3140" |
| pipeline | 9 / 9 / 0 / 0 | 23 029 → 22 972 | 3 019 440 → 3 019 888 bytes, 25 hunks, rationale unchanged (805 = 805); its combined run with model and rendering: 20 / 20, audit 0 |
| rendering | 8 / 8 / 0 / 0 | 23 029 → 23 039 | the rationale byte-identical; with pipeline and scope: 22 / 22, audit 0 |
| scope | 5 / 5 / 0 / 0 | 23 029 → 23 087 | its two DUPLICATE ID notes; rationale 2 386 → 2 387; its swap exactly as recorded — "index l. 22799 ← l. 23020; Part A l. 631 ← l. 852" — giving 23 086 lines, rationale 2 386, 805 = 805, one id set, no duplicate |

All five equal their records. The five diffs are disjoint: the combined base grows by 112 lines, which is the sum of the five
stand-alone growths (2 + 99 − 57 + 10 + 58). The swap then removes one line: 23 029 → 23 141 → 23 140.

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents. Each count is
unchanged: base 153, INDEX 9, V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67. The
numbered targets the resolver reads are unchanged (section 5), and the defined ids stay at 3 467.

**RULING REQUEST blocks — 0.** No repair-r6 file carries one (ROUND-6 NOTES (2)). The only "RULING REQUEST" strings are the
determinism, model and pipeline header counts ("0 RULING REQUEST blocks"), and `route.py`'s header regex matched none, so none is listed
or skipped. After installation, no live file contains a `=== ` header line of any kind or any "RULING REQUEST" text.

### 2.1 NOTES FOR ASSEMBLE — the census (ROUND-6 NOTES (9) (a))

I read all seventeen preambles for every line that names Assemble or the assembler, a swap, a title block, a restated row, a J-ROWS or
RATIONALE-A row, a proposed allow row, a NOTE or a HAND-OFF. **One** note is addressed to Assemble:

1. **Scope, NOTE FOR ASSEMBLE (1) — restated rows (assemble-r1's swap rule).** The J-ROWS block restates the judgment-index row of
   J-A67.45, and the RATIONALE-A block restates its Part A entry. This is the END of VEL5-r5-01 under R6-03: "(the last folded event's)"
   becomes "(the greatest folded week, §4.11 *The clock* (1))", and Part A's "— the last folded event's —" becomes "— the greatest week
   the folded events carry (§4.11 *The clock* (1)) —". After every block file is applied, each appended row takes its older row's place
   and the older row is deleted, by "the logic of work/repair-scope-r3/swap_restated.py with `IDS = ['J-A67.45']`". **Applied as
   written** (section 3).
   * **Pipeline's HAND-OFF 1** asks for this same Part A entry, "swapped into the older row's place as assemble-r1's rule does, with the
     index row's END". It is closed by scope's RATIONALE-A row, which equals pipeline's wording word for word. Pipeline writes no
     rationale row of its own.
2. **Scope, NOTE FOR ASSEMBLE (2) — six proposed allow rows** (C3 runs in §13.2's T110-2 and T114-3 and §13.8's T110 row). Each was
   reviewed and written as proposed (section 6).

Apart from these:
* No header asks for a title-block change or any other restated row.
* Every volume unit records "title block untouched / unchanged", and determinism, model, pipeline and rendering write no J-ROWS or
  RATIONALE-A block.
* The other mentions of the assembler are the seats' descriptions of their own dry runs ("the FILE line dropped, as Assemble routes
  it") and of the resolver they borrowed (`work/assemble-r5/refs.py`).

So `final/` is apply.py's output plus scope's swap, with INDEX.md carried unchanged. The only change outside the blocks is the allow
file's appended block (section 6).

**HAND-OFFS lists in the headers.** These are for the adjudicator and for round 7's verifiers, not assembly work, and they stand in the
repair files:
* **V04's one hand-off, "left open for a ruling; nothing written for it":** a locked arch vault in a `vault` span that a wall comes to
  stand over, at an epoch (V04 §3.11's UC18 against the crossing table's *beneath*). Owner: model with V04. Two candidate wordings are
  given.
* **V02's observation for the adjudicator to route:** T-V3-40's timing cell names no exit after V06's E2 for its hand-over clause.
* **Scope's hand-offs:**
  * V06 §7's lead restates the take-over row. Scope conformed the take-over row; this lead still needs the matching words.
  * Its own END citations are for a verifier to check.
* **V06's hand-offs to scope, V04, model and pipeline.**
* **Model's citation-form hand-offs to pipeline and V11.** Both landed this round, in pipeline's §4.3 sweep and V11's §3.24 block.
* **Determinism's hand-offs:** to V09 (taken whole by V09's §4.9 block), and to pipeline §4.2 S3 (10) with determinism §5.4. The latter
  is not written by either seat this round.

ROUND-6 NOTES (9) (b) is met because all seventeen files were applied before the reference check (section 5).

## 3. The rationale and the judgment index (scope's swap)

`handoff.py` ran `swap_restated.py` once on the combined output (base and rationale). That script is scope-r3's, with
`IDS = ['J-A67.45']` and its docstring changed, nothing else. It stops unless the id occurs exactly twice in the index and twice in
Part A. Its printout:

```
judgment index: J-A67.45: l. 22853 <- l. 23074
Part A: J-A67.45: l. 631 <- l. 852
judgment index rows 805 duplicates []
Part A rows 805 duplicates []
ids in one and not the other []
```

The index line numbers differ from scope's stand-alone record (l. 22799 ← l. 23020) by the 54 lines the other four base seats add
above the index. Scope's own stand-alone swap reproduces its record exactly (section 2).

**Checks after the swap** (`handoff.json` → `checks.ids`):
* The index and Part A hold 805 entries each, one id set, no duplicate.
* The id set and both orders are unchanged (J-A67.45 stays at position 585 in each).
* Every index row except J-A67.45's is byte-identical to the untouched copy.
* The swapped index row and the swapped Part A entry each equal scope's J-ROWS and RATIONALE-A block rows byte for byte.

**The rationale** changes on exactly one line, l. 631 (J-A67.45's Part A entry): 2 386 lines before and after, 704 770 → 704 813 bytes,
119 120 → 119 127 words, `a480f02e…` → `a3f45a3f…`.

## 4. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | lines before → after | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|---|
| base | 3 019 440 | 3 052 639 | +1.1 % | 489 457 | 495 305 | +1.2 % | 23 029 → 23 140 | 2948.7 → 2981.1 |
| V01 | 527 808 | 528 530 | +0.1 % | 86 630 | 86 759 | +0.1 % | 3 758 → 3 756 | 515.4 → 516.1 |
| V02 | 564 391 | 565 121 | +0.1 % | 94 455 | 94 571 | +0.1 % | 4 221 → 4 227 | 551.2 → 551.9 |
| V03 | 467 516 | 467 810 | +0.1 % | 79 444 | 79 495 | +0.1 % | 3 304 → 3 304 | 456.6 → 456.8 |
| V04 | 526 488 | 530 264 | +0.7 % | 85 697 | 86 354 | +0.8 % | 3 626 → 3 636 | 514.1 → 517.8 |
| V05 | 401 879 | 403 128 | +0.3 % | 67 901 | 68 130 | +0.3 % | 3 078 → 3 089 | 392.5 → 393.7 |
| V06 | 694 375 | 694 809 | +0.1 % | 113 524 | 113 594 | +0.1 % | 4 616 → 4 617 | 678.1 → 678.5 |
| V07 | 610 850 | 613 621 | +0.5 % | 101 119 | 101 591 | +0.5 % | 4 095 → 4 098 | 596.5 → 599.2 |
| V08 | 579 431 | 582 193 | +0.5 % | 92 002 | 92 453 | +0.5 % | 3 730 → 3 735 | 565.9 → 568.5 |
| V09 | 766 888 | 770 727 | +0.5 % | 126 545 | 127 176 | +0.5 % | 5 021 → 5 028 | 748.9 → 752.7 |
| V10 | 518 300 | 522 915 | +0.9 % | 83 892 | 84 620 | +0.9 % | 3 558 → 3 580 | 506.2 → 510.7 |
| V11 | 679 224 | 679 521 | +0.0 % | 113 491 | 113 537 | +0.0 % | 5 464 → 5 465 | 663.3 → 663.6 |
| V12 | 524 105 | 525 576 | +0.3 % | 85 013 | 85 264 | +0.3 % | 3 558 → 3 560 | 511.8 → 513.3 |
| INDEX | 24 074 | 24 074 | 0.0 % | 4 054 | 4 054 | 0.0 % | 202 → 202 | 23.5 → 23.5 |
| rationale | 704 770 | 704 813 | +0.0 % | 119 120 | 119 127 | +0.0 % | 2 386 → 2 386 | 688.3 → 688.3 |
| **base + volumes** | 9 880 695 | 9 936 854 | +0.6 % | 1 619 170 | 1 628 849 | +0.6 % | | **9649.1 → 9704.0** |
| **volumes** | 6 861 255 | 6 884 215 | +0.3 % | 1 129 713 | 1 133 544 | +0.3 % | | 6700.4 → 6722.9 |
| **base + volumes + INDEX** | 9 904 769 | 9 960 928 | +0.6 % | 1 623 224 | 1 632 903 | +0.6 % | | 9672.6 → 9727.5 |

Words are whitespace-split, as rounds 0–5 counted them; a seat's `wc -w` figure can differ by a few.

**Why every changed unit grows.** This round repairs round 5's findings under adjudication-r6's rulings. R6-02 replaces the crossing
station, raised gate, wall opening and held stretch with model's crossing table and way-and-channel table; R6-03 replaces the held late
calamity. The round also writes the END lines of Part H, adding the rulings' cases, bars and fixtures and both ends of cross-unit fixes.
The assembler may not compress text.

**Where the growth sits.** The base's growth is mostly model's §2.7: +3 988 words, of which the two tables are 4 111 + 673 words of
R6-02's ruled text. Several units remove the superseded machinery and restatements:
* pipeline: −41 and −274 of restatement, now citations of §2.7's tables;
* determinism: the held row and field;
* V06: 1 605 words removed against 1 675 added;
* V08: −211 for the held list.
Each repair file states its words by source and what holds its growth.

**Against the shrink goal.** The band is 25–40 % fewer words than the pre-coherence archive, which held 1 491 685 words for base and
volumes. The set now stands at 1 628 849 words, +9.2 % against the archive. No unit shrank by more than half; none shrank at all.

**Duplicate id definitions across the set** (principle (4)): **none** (`sizes.py`). The census covers the judgment index, Part A, D-n,
T-ER, every volume's T-Vn-m and J-Vn.m rows, and `_integrate.md`'s J-VI rows.

## 5. References

**The resolver.** This is assemble-r0's `refs.py` (citation form canon S7: a bare `§x` is the base's; a volume's section is `Vnn §x`
everywhere), unchanged but for its root. It ran on two mirror trees (`mirror.sh`), the untouched set and the final set, each with
`_integrate.md`, files f and g, `research/` and `docs/volumes/critique/` linked in.

**What it checks.** Every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…`, with lines read joined, against
the headings and ids that now exist. The numbered targets are unchanged by the round: base 147, V01 121, V02 99, V03 53, V04 66, V05 60,
V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8; 3 467 defined ids.

**Ordering.** All seventeen files were applied before the run (ROUND-6 NOTES (9) (b)), model's §2.7 block among them ((9) (e)). So every
cross-unit citation of Part H's END lines is read with both its ends in place. The untouched run's printout is identical to
assemble-r5's final run (`refs-before.out` = assemble-r5's `refs-final.out`).

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 55 946 | 56 332 | the target exists |
| external | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 85 | 85 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` that only one volume of its list has — the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 56 169 | 56 555 | |

**Broken: 0**, before and after.

**Mechanical fixes: 0.** The resolver found no reference of class FIX, and no repair file records a renumbering (no heading moved,
section 2). `fixrefs.py` ran and found nothing to change: `fixrefs.json` is empty and `ref-fixes.tsv` holds its header only.

**Ambiguous form: 85** (85 before), listed in `ambiguous-refs.tsv` with unit, line, reference, the list's head volume and context: base
14, V01 15, V02 13, V03 12, V04 1, V05 4, V06 3, V09 7, V10 5, V11 9, V12 2. Each resolves under S7 as the base's; the verifier confirms
each or prefixes it.

The round's changes to this list, all checked by reading:
* **Five sites gone.** V04 l. 1342, V06 l. 1616, 4477 and 4503 (the old support step's sites, rewritten by this round's blocks), and
  V01 l. 3627 (J-V1.104's row, whose `§2.7` now follows a closed `V08 §2.7)` and resolves plainly).
* **Five sites new**, each the base's as its words say:
  * base l. 2582: "§4.6's lane ladder", after a V01 list, in model's way-and-channel table row (a). The base's §4.6 is S8 infill; V01's
    §4.6 is "Hosts and shared documents".
  * V01 l. 978: "§2.7's crossing table".
  * V05 l. 2559: "§2.7's crossing table, *unchanged meeting*".
  * V06 l. 4060: "§2.7's crossing table, *over the band*".
  * V11 l. 208: "§2.7's crossing table at S5a and S7".
* **One site reworded and still ambiguous:** V11 l. 3962, now "§2.7's way-and-channel table, rows (a)–(b)".

**External: 131** (bare 120, bare-cont 1, J 10), listed in `external-refs.tsv`.

**Citations by name of model's §2.7 tables** (ROUND-6 NOTES (9) (e); `tablerefs.py`, `tablerefs.json`). The resolver reads section
numbers, not the names other units' blocks cite from §2.7's two tables, so these were checked separately on the installed set.

What the installed §2.7 defines:
* the four outcomes ***over the band***, ***down before the wall***, ***beneath*** and ***unchanged meeting***;
* the crossing table's rows W1–W13 and columns C1–C13;
* the way-and-channel table's rows (a)–(e).

What the set cites, and with what result:
* Outcome names after "crossing table": base 12, V01 4, V04 2, V05 1, V06 11, V07 2, V09 5.
* Cells `Wn·Cm`: base 8, V04 1.
* "way-and-channel table, row(s) …": base 8, V01 1, V09 3, V11 1.
* **0 do not resolve.**
* Every italic phrase within 100 characters of a "crossing table" citation was also listed: the only outcome-like ones are the four
  defined names (*beneath* 36, *over the band* 6, *down before the wall* 6, *unchanged meeting* 4).

## 6. Document checks (three-copy method, one corpus snapshot)

**The command.** `python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with
`docs/validation/doc-checks-allow.tsv`, run by `checks.py` on three copies against one corpus snapshot:
* **untouched** — the live base before this round, sha256 `2d84eac2…`;
* **new** — the blocks applied, `fd59b926…`;
* **combined** — the installed text after scope's swap, `f39f1c30…`.

**Two key sets:**
* (a) the 34 top-level heading keys `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.7,PART III,Delegated
  decisions,Judgment calls,Staged,Appendix A`. This is the brief's command. The parent keys span their children, so their C3 and C4
  hits count twice.
* (b) the eight `#` keys, which partition the document.

The corpus fingerprint (path, size and mtime of the 128 files doc_checks reads) is equal before and after every run
(`b2f7e5c5fd256d59…`).

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon,
research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the
corpus before any freeze". Every count below is PROVISIONAL (ROUND-6 NOTES (6)).

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 1 / 0 | 3266 / 0 | 12 / 0 | 0 / 0 | 287 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1689 / 0 | 6 / 0 | 0 / 0 | 287 / 0 | **0** |
| new (a) | first | 5 / 0 | 1 / 0 | 3298 / 38 | 12 / 0 | 0 / 0 | 298 / 0 | 1 |
| new (b) | first | 5 / 0 | 1 / 0 | 1705 / 19 | 6 / 0 | 0 / 0 | 298 / 0 | 1 |
| combined (a) | first | 5 / 0 | 1 / 0 | 3298 / 38 | 12 / 0 | 0 / 0 | 298 / 0 | 1 |
| combined (b) | first | 5 / 0 | 1 / 0 | 1705 / 19 | 6 / 0 | 0 / 0 | 298 / 0 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3266 / 0 | 12 / 0 | 0 / 0 | 287 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1689 / 0 | 6 / 0 | 0 / 0 | 287 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3298 / 0 | 12 / 0 | 0 / 0 | 298 / 0 | **0** |
| new (b) | final | 5 / 0 | 1 / 0 | 1705 / 0 | 6 / 0 | 0 / 0 | 298 / 0 | **0** |
| **combined** (a) | final | 5 / 0 | 1 / 0 | 3298 / 0 | 12 / 0 | 0 / 0 | 298 / 0 | **0** |
| **combined** (b) | final | 5 / 0 | 1 / 0 | 1705 / 0 | 6 / 0 | 0 / 0 | 298 / 0 | **0** |

(hits / unreviewed.)

**The final result.** The combined document's final run exits 0 on both key sets. It does so again under `PYTHONHASHSEED` 0, 1, 2 and
12345, with the same counts. Its total over the 34 keys is **3 614 hits** (C1 5, C2 1, C3 3298, C4 12, S1 0, S2 298), 0 unreviewed.
* The untouched copy is round 5's clean state: exit 0, its counts equal assemble-r5's combined run.
* Scope's swap touches no hit, so new and combined count alike.
* The 11 new S2 hits are all matched by rows the allow file already holds; each resolves in the set (section 5).

**Corrected: none.** There was no S1 table fault and no mechanical hit.

**The eighteen unreviewed hits.** The (b) set lists 19 sites; "3 7 6 3 s" stands at two lines, and the (a) set counts each twice
through its parent key. `attrib.py` attributed each one (`c3-attribution.tsv`), and this seat read each in context. Every one is:
* new text of a repair block, absent from the untouched base;
* held whole by no corpus file (a chain of corpus 3-grams meeting by chance);
* free of any list, table, grammar, palette or identifier.
They are false positives.

**Six proposed by scope (NOTE FOR ASSEMBLE (2))**, re-checked as carried by scope's block. All are binding texts of adjudication-r6
written as given:
* "and on the second run" — final base l. 18530, T110-2's frame-growth clause, VAT5-r5-02's END text;
* "no reading of the wall" — l. 18542, T110-2 (1), R6-02 (S1);
* "and none in the band" — l. 18584, T110-2 (5), (S1);
* "re derived from the new" — l. 18602, T110-2 (6), (S1);
* "waiting on the other the" — l. 18672, T114-3, (S3);
* "of 1 2 4 5 7 and" — l. 19455, §13.8's T110 row, (S4), numbered clause pointers.

**Twelve in model's §2.7 block — the assembler's own review.** Model's header records no doc_checks run and proposes no row, so these
follow the assemble-r3 and assemble-r5 precedent for hits no seat proposed. Each is R6-02's ruled text:
* "a ring is a standing" — l. 2577, the way-and-channel table's lead;
* "so it crosses the boundary" — l. 2585, row (d);
* "a wall and a raised" — l. 2591, the support step (6) (d), "*a wall and a raised way*";
* "0 clear of the ramp" — l. 2621, *beneath*, "on ground part 0 clear of the ramp";
* "3 7 6 3 s" — l. 2628 and 2698, *beneath* and row W1, "V06 §3.7.6 (3)'s";
* "the foot of the ramp" — l. 2631, *beneath*;
* "s or the edge of" — l. 2633, *beneath*, "a road deck's, or the edge of";
* "on either side of the way" — l. 2651, *beneath*;
* "no crossing of the gate law" — l. 2653, *beneath*;
* "state and the test that" — l. 2683, the table note;
* "clear of the towers and gates" — l. 2691, the table note;
* "3 19 2 1 and" — l. 2719, the support step (7), "V06 §3.19.2 (1)) and".

**Reviewed allow rows: 18**, in one block `# block: coherence/assemble-r6` appended by `allowrows.py`.
* Append only: assemble-r5's two rules, unchanged. The script stops unless every attributed hit is covered by exactly one rule:
  * a proposed row only where the proposing seat carries the text;
  * a reviewed row only where the named seat carries it, no seat proposed it, and every line the run starts on carries the quoted text;
  * both only for text absent from the untouched base and held whole by no corpus file.
* It ran only after checking that the allow file's sha256 still equalled HEAD's.
* The allow file goes from 2 331 to 2 350 lines (a header and 18 rows), sha256 `fc5117d5…` → `02ad22b0…`. Its first 2 331 lines are
  byte-identical to HEAD.

**Allow rows not dropped.** The brief allows dropping rows that point at text this pass removed, "with a note". Six C3 rows now match
text that was in the untouched base but is in neither the installed base nor any volume:
* assemble-r5's "5 and the hand off", "junction with a ring road", "4 3 s for a" and "3 3 s for a" (the old support step, rewritten by
  model's §2.7 block);
* assemble-r5's "3 on the city and" (T110-2's old item (3), rewritten by scope's (S1));
* an older row, "on both sides of the" (the old crossing station's text).

They are **kept and listed here for the close**. The file is shared, and the orchestration notes forbid this seat to rewrite or
truncate a shared file, so this seat only appends, as in rounds 0–5. A kept row hides no new hit, because review is by exact text.

**Volume information runs** (`volchecks.sh`, `volsummary.py`, recorded in `volchecks-final.txt`). Each volume, INDEX and the rationale
was run as a whole document, untouched against installed, with `--heads` the matching base. Volume runs carry hundreds of unreviewed
runs from before this pass and are not held to exit 0, as in rounds 0–5.

The installed volumes add 8 new distinct unreviewed pairs and drop 9. All are C3 runs of this round's block text (section-pointer digits
or ordinary words), and each matches its seat's own record:
* V02: +1 (`3 8 2 2 and`).
* V04: +2 (`a b the same element`, `between two of them 2`). The third run V04 records, `3 7 6 3 s`, is now covered by this round's
  reviewed base row.
* V06: +5 / −5. Added: `1 2 4 5 7 and`, `3 7 1 and it`, `just outside the ring s`, `rests on a wall the`, `rule for the wall s`. Gone:
  four `3 7 6 5 …` runs and `leaving the gate to the`.
* V07: −2.
* V09: −1.
* V01, V03, V05, V08, V10, V11, V12 and INDEX: 0.

No volume seat proposed a row, so none is appended; they are listed for those volumes' seats or the close.

**The rationale** (information; not held to exit 0) changed this round in one row. It was run untouched and installed: C3 493 / 320
unreviewed and S2 17 / 15 on both. The swapped row adds no hit.

## 7. Bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md`: 71 740 lines reported from 14 sources, 9 926 241 → 9 982 400
bytes, sha256 `f573c910a54abfbf…` → `af068f6d25eb10db…`. `--check` reports it UP TO DATE (exit 0).

## 8. Review ids and probe markers in design text (ROUND-6 NOTES (9) (c), (e))

**Method.** `reviewids.py` counts citations of review-process ids in the live base, volumes and INDEX:
* the rulings `R<n>-nn`;
* every issue, conflict, wiring, inventory or probe id the coherence pass's own records define (`verify-*.md`, `adjudication-r*.md`,
  `inventory-*.md`, and this round also `probe-r6.md`; canon, agreement, edges, wiring), 8 827 tokens, among them the probe's 19
  `PRB6-nn` ids;
* less any token the design itself defines, and the design id families.

A citation counts only outside the decision and request records. Those are, in the base, *Delegated decisions* and *Judgment calls*;
in the volumes, §9 Decisions, §10 Base change requests, §13 Fix list and Integration notes; anywhere, a J-, BCR-, X- or CVR- row.

**Two separate counts for (9) (e):** every `PRB<n>-nn` token, and every "(amended, PRB<n>-nn)" marker, anywhere in the set, records
included. The census is read-only: nothing was edited, and the verifiers raise any site.

**Results:**
* **Design-text sites: 0**, before and after (assemble-r5 had already brought them to 0, and this round's blocks add none).
* **PRB6 ids and "(amended, PRB6-nn)" markers: 0** in the base, the volumes and INDEX, before and after. The seats that took Part P's
  amended texts stripped the markers, as their headers record.
* **No ruling id and no verifier issue id stands in design text.** A direct grep finds the set's only `R<n>-nn` tokens (`R2-22`,
  `R2-41`, `R2-42` ×2) in V09's §9 Decisions rows J-V9.144, J-V9.147 and J-V9.149 and its §10 row BCR-V9-37.
* **Inside the records, 25 citations stand**, kept as records and unchanged: V03 9, V09 15, V10 1.

Full lists: `reviewids-final.tsv` and `reviewids-untouched.tsv`.

## 9. Not placed, and left for the verifier

* **Unplaced: nothing.**
  * Every block of the seventeen files is applied.
  * Scope's NOTE FOR ASSEMBLE is applied as written: the J-A67.45 swap and the six rows.
  * No RULING REQUEST exists this round.
  * There is no double REPLACE, so no merge conflict and no lost hunk.
  * No block targeted a missing or retitled heading.
* **Broken references: 0** (section 5). No mechanical fix was needed, and §2.7's table names all resolve.
* **85 ambiguous-form references** (section 5, `ambiguous-refs.tsv`; 5 new, 5 gone, 1 reworded). They read as the base's under S7; the
  verifier confirms each or prefixes it.
* **0 review-id sites and 0 PRB6 ids or markers in design text** (section 8).
* **Hand-offs between units recorded in the repair files' headers** (section 2.1) are not assembly work. They include V04's open case
  for a ruling (a locked arch vault under a wall at an epoch) and V02's T-V3-40 timing observation for the adjudicator.
* **Volume document checks:** 8 new volume hits without a proposed row (section 6, `volchecks-final.txt`), for those volumes' seats or
  the close.
* **Six allow rows now match nothing** (section 6). They are kept, since the shared file is append-only for this seat; the close may
  drop them.
* **The document checks are provisional** (section 6). Re-run them on the machine that holds the reference corpus. The 18 base rows were
  reviewed against this checkout's smaller corpus, twelve of them by this seat alone (no seat proposed them).
* **Size:** the set is at +9.2 % words against the pre-coherence archive, outside the shrink band (section 4). Each repair file states
  what holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):**
* the 15 live files' sha256 before (each equal to its HEAD blob at `b3f83a0d`) and after (each equal to its final copy, re-checked after
  the checks and the bundle);
* the seventeen repair files landed and committed;
* the routing of 142 blocks and the census: 0 missing, 0 ambiguous, 0 unclosed, 0 RULING REQUEST, 0 overlap, 0 double REPLACE,
  0 retitle;
* 142 applied, with audit not-OK 0 and balanced fences in every file;
* ten volume outputs equal to their seats' recorded sha256, and V01 and V04 to their recorded bytes and lines;
* the five base seats' stand-alone runs and their recorded combined runs reproduced, the five diffs disjoint;
* scope's swap: 805 = 805, one id set, orders unchanged, the rows equal to its blocks, the rationale changed on one line;
* no heading added, removed or retitled;
* the reference counts of section 5, with 0 broken, 0 fixes and every §2.7 table name resolving;
* the document checks' counts of section 6, exit 0 on every copy and key set and under four hash seeds, against one corpus snapshot;
* the allow file appended only;
* the bundle regenerated and `--check` clean;
* the sizes of section 4 and no duplicate id definition;
* the review-id and PRB6 census of section 8.

**PLAUSIBLE:**
* That the eighteen reviewed rows are false positives. Each was attributed by script and read in context by this seat; six were
  proposed by the seat that wrote the text, and twelve have no second reader.
* That V01's and V04's outputs equal their seats' generators. Those seats record bytes and lines but no hash; both match.
* That the ambiguous-form references read as their authors meant. S7 reads them as the base's; the new ones were checked by reading,
  the rest not one by one.
* That `tablerefs.py`'s patterns catch every citation of the two tables by name. It reads an outcome named after "crossing table", a
  `Wn·Cm` cell and a "way-and-channel table, row(s) …" letter. Every italic phrase near a citation was also listed, and only the four
  outcome names occur.
* That the review-id census's token set is complete. It reads the ids the coherence records define as headings, first table cells or
  bold labels, plus the `R<n>-nn` rulings and every `PRB<n>-nn` token. An id cited only in running text of a record would be missed.
