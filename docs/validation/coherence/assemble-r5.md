# Assemble — coherence pass, round 5 (the eighteen repair-r5 block files applied to the base and the volumes)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r5 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r5`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at 3310b538); untouched snapshot — done
- P2 block inventory and routing (18 files, 133 REPLACE blocks, 0 RULING REQUEST, 0 missing heading, 0 double REPLACE);
  NOTES FOR ASSEMBLE census (scope's one proposed allow row; no swap, no restated row) — done
- P3 apply (133 applied, 0 skipped, audit not-OK 0; twelve volume outputs equal their seats' recorded dry runs; the six base
  seats' stand-alone dry runs reproduced), headings unchanged, install (13 of 15 changed) — done
- P4 references: 56 169 checked, 0 broken, 0 mechanical fixes, 85 ambiguous-form listed — done
- P5 document checks, three-copy method: 5 reviewed base rows (1 proposed by scope, 4 the assembler's own review of model's §2.7
  text), exit 0 on every copy and key set; volume information runs — done
- P6 bundle and `--check` — done
- P7 review-id census (ROUND-5 NOTES (9) (c)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r5/` (`snapshot.py`, `route.py`, `apply.py` —
which runs `docs/validation/amendments-b/apply-blocks.py` unchanged —, `handoff.py`, `headings.py`, `install.py`, `mirror.sh` with
`refs.py` and `refsreport.py`, `fixrefs.py` (not needed), `checks.py`, `attrib.py`, `allowrows.py`, `volchecks.sh` with `volsummary.py`,
`sizes.py`, `unitsizes.py`, `reviewids.py`), assemble-r4's with the round label and the scratch folder (`scratchpad/coherence/asm5/`)
changed. Three are this round's: `handoff.py` (no swap this round: it builds the final copies, checks the judgment tables untouched and
reproduces the six base seats' recorded stand-alone dry runs), `allowrows.py` (assemble-r4's proposed-row rule and assemble-r3's
`reviewrows.py` rule for the assembler's own review, in one block) and `volsummary.py` (the volume runs' summary, inline in round 4).
No live text was hand-edited. Their records sit beside them (`snapshot.json`, `blocks.json`, `split/`, `logs/`, `apply.json`,
`handoff.json`, `headings.json`, `install.json`, `fixrefs.json`, `ref-fixes.tsv`, `refs-before.out`, `refs-final.out`,
`refs-summary.json`, `ambiguous-refs.tsv`, `external-refs.tsv`, `checks-first.json`, `checks.json`, `c3-attribution.tsv`,
`volchecks-final.txt`, `sizes.json`, `unitsizes.json`, `reviewids-untouched.*`, `reviewids-final.*`).

## Outcome

All eighteen repair files had LANDED before this seat started (each a `coherence/repair-<unit>-r5 LANDED` line in the lane log and its
result in `results/coherence_repair-<unit>-r5.json`; all eighteen committed, HEAD `3310b538`; ROUND-5 NOTES (9) (d)). They are applied:
**133 blocks found, 133 applied, 0 skipped**, every one a REPLACE. No file carries a RULING REQUEST (the two "RULING REQUEST" strings
in the eighteen are header counts, "0 RULING REQUEST blocks"), no heading was missing or ambiguous, no block truncated, and no two blocks
touch one subsection (no double REPLACE, no nesting), so no three-way merge was needed. The audit finds every applied body exactly once
and fences balanced in every file; all twelve volume outputs equal the result their repair seats recorded for their own dry runs (eleven
by sha256, V09 by line count), and each of the six base seats' recorded stand-alone dry runs is reproduced. The round's one NOTE FOR
ASSEMBLE (scope's proposed allow row) is applied as written; no header asks for a swap, and no block is a J-ROWS or RATIONALE-A block, so
the rationale is unchanged. **Nothing is unplaced.** The round adds, removes and retitles no heading. The set (base and volumes) goes from
9 604.8 KB to 9 649.1 KB (+0.5 % bytes, +0.5 % words). Of 56 169 references checked, **none is broken**; none needed a mechanical fix; 85
resolve but are ambiguous in form (84 before). The document checks exit 0 on the untouched, new and combined copies over every top-level
key and over the eight `#` keys, against one corpus snapshot, after 5 reviewed allow rows — **provisional**, the reference corpus being
incomplete in this checkout; the combined document's total is 3 571 hits, 0 unreviewed. The bundle `docs/ARCHITECTURE-FULL.md` is
regenerated and `--check` passes. Review ids in design text (ROUND-5 NOTES (9) (c)): **0 sites** outside the decision and request records
(4 before), 25 kept inside records (section 8).

## 1. Live files — sha256 before and after

Before: the committed text at HEAD `3310b538fd96` (each live file equal to its HEAD blob; assemble-r4's outputs, the base `5f34cceb…`
every repair file was written against). After: written by `install.py`, guarded on each live file still holding its P1 sha256 and each
verified byte-identical to its final copy (re-checked after P5–P6: still identical). No reference fix followed (section 5), so the installed
files are the final ones.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 3 003 627 | 3 019 440 | `5f34cceb61432ac420f375d84296f6d154dad2af6a1fbcdf329763425784334c` | `2d84eac2d8a379d11bc55e5490700cf812075d40a774a88a624e116886d638e0` |
| `docs/ARCHITECTURE-RATIONALE.md` | 704 770 | 704 770 | `a480f02e58a893fea57cacc5977b83489f633ced23901f578adbcfbd8059c52a` | `a480f02e58a893fea57cacc5977b83489f633ced23901f578adbcfbd8059c52a` (unchanged: no J-ROWS or RATIONALE-A block) |
| `docs/volumes/V01-neighbourhoods.md` | 526 767 | 527 808 | `a0c15b713802a1ed08037da66475e87d2abfaf07c3a111182c85ed210cc02ce5` | `4585e1a59d0e499ab46301fdaa6dd5b5cc13d781474dc88202b2dff2b3e4972a` |
| `docs/volumes/V02-buildings.md` | 563 512 | 564 391 | `2579cb1696f494b6b265f13a6d4e649a0fbbe111b54f7b6d2f196a56b2d67da4` | `fb46c67694cfe88d0691ec57c5cedcbfde0c263b994018dfeb38a4a2c83302c7` |
| `docs/volumes/V03-interiors.md` | 466 833 | 467 516 | `9af5ffd5d8aa2fa9298cef3a5541bdb6ad03b5a2c578c145684b1b8136ccb2c4` | `3fe82c822e32b703769d0c1b56510405a1b35f32854b723d77de854541b1f373` |
| `docs/volumes/V04-underground.md` | 527 003 | 526 488 | `6aebc1e136c8778c9fcac983b98590a4ef3e74b5daf5dd036edd09b82505dff1` | `b79fd29048f06a90b564e0145b489e6fba68c407e9dfdbec99bbe627795a697e` |
| `docs/volumes/V05-sky.md` | 401 398 | 401 879 | `ef99abd9b5a84c8aa4530a2f318c45618f66959571fb6d9836847c509c68f031` | `171db6516974533d3e0aef4492f0bfbbae2f7a7c04b7a778ab19a11a14ee098e` |
| `docs/volumes/V06-evolution.md` | 691 243 | 694 375 | `ef22171ae7b0d296b1a71ea88b0765541a2616f3a76ba445960830cbb8eff474` | `6fb1f6417fc1dfc886677f260dce1d38219ebd7a848d959a85260bf7792fc9e1` |
| `docs/volumes/V07-village.md` | 605 033 | 610 850 | `a55c4d0803b7a755922816fc0eacbf8f8a962395fc8e9a73c889a62190d2ba2b` | `7747179dc9854aa6d319fc1a4db579a19f9ed694d36a9cb353e88dabb4750284` |
| `docs/volumes/V08-settlementforge.md` | 572 529 | 579 431 | `4675c05ecf19eb56966b4dbaeb69e70ac4af690b7fbd6f0c9cf651127006b7bd` | `8b5b52439f96a352d878de641d3311f2ab8db1deee01cc1983f740036ded4f7d` |
| `docs/volumes/V09-application.md` | 760 527 | 766 888 | `b49c6014c7b8e61dce1100beb580323a12fbd43da1d73e035723f2d2e767eee2` | `7c91d3bff549344b72ad0615b9362249269b2fd786e724b340c9afe50cd98253` |
| `docs/volumes/V10-clerk.md` | 515 733 | 518 300 | `3fd16e696cb259f51f1c17f72618d1193e7e594d672ce12c8a1b11422761f7fa` | `847b3189f56daf453a5741f5077631f3be30c301acc85cf89190896116247f08` |
| `docs/volumes/V11-content.md` | 678 595 | 679 224 | `47b14d9f67f451fd5194c62fff07a543037dde36078fb54eb74ed894fddb0c20` | `b1445a5ff552c7cba3ef9f35f39f48ea9586c8e97845cefa3dd9e4dca6e7ffae` |
| `docs/volumes/V12-calibration.md` | 522 516 | 524 105 | `2db3c8c9664844a3e15570bee237d12b0e4a2eea95ca7c56612b73f037cf879b` | `1e305ebe07843db09c56f838d12143ffb521538339239c838a45ad875e85e9a5` |
| `docs/volumes/INDEX.md` | 24 074 | 24 074 | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` (unchanged: no block routes to it) |

Also written: `docs/ARCHITECTURE-FULL.md` (the bundle, section 7) and `docs/validation/doc-checks-allow.tsv` (one appended block,
section 6).

## 2. Blocks — routing, application, audit

**The block files** (`blocks.json` records each one's sha256 as read): exactly `docs/validation/coherence/repair-r5-<unit>.md` for the
eighteen units (ROUND-5 NOTES (1)); everything under `work/` and the bench files are the repair seats' working material, never blocks.

| file | sha256 (16) | lines | FILE lines |
|---|---|---:|---|
| `repair-r5-V01.md` … `repair-r5-V12.md` | `e1a1bc7ee3dbfa5e`, `39654fd7612f1f90`, `86c5685a62d5e983`, `95d62711f557c98f`, `4a8e28649d8b3c97`, `1007b389eb884b47`, `16807b657551fa88`, `a6102c8fbf1ec503`, `a07c903c6a0847d0`, `c461b370afb62e77`, `c9670d7dda6fc7ac`, `6d6a53d0a2661cbe` | 546, 466, 548, 1 514, 718, 1 750, 1 251, 1 790, 1 773, 989, 1 155, 1 169 | one each, naming its volume |
| `repair-r5-determinism.md`, `-kernel`, `-model`, `-pipeline`, `-rendering`, `-scope` | `7c5c8e7cf5c93b83`, `49babe924ac99461`, `79293c058db36b66`, `9bb13db4e98e6ab6`, `5db58298dd2ac11b`, `caf1e319c036a6e0` | 2 414, 244, 1 057, 3 994, 2 830, 2 195 | none (the base) |

**Routing** (`route.py`). Each file was cut at its `=== FILE <path> ===` lines; every block went to the file its nearest FILE line above
names, the base when none (ROUND-5 NOTES (3)). No file carries blocks for more than one document this round, and none routes to INDEX.md.
The split block files keep their repair file's basename, so `apply-blocks.py` applies them in the round's name order (V01 … V12,
determinism, kernel, model, pipeline, rendering, scope); the FILE lines are left out (routing, not blocks) and every other line is
verbatim. The base ran with the rationale; each volume with a throwaway rationale whose output equals its input. No text follows any
file's last END.

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST, 0 overlaps of any
kind — no two blocks of the round (within one unit or across units) cover one subsection or nest. Hence **no double REPLACE**: the brief's
`git merge-file` step (merge base: the subsection as assemble-r4 installed it, base `5f34cceb61432ac4…`) had nothing to merge and no
conflict or lost hunk to report (ROUND-5 NOTES (4)); and no block named a heading that an earlier block of this round had retitled
(ROUND-5 NOTES (5)): every block was found on the text as it stood, and no block body retitles its heading. The kinds: 133 REPLACE
(base 37, volumes 96); no INSERT AFTER, APPEND TO SECTION, J-ROWS or RATIONALE-A.

| unit | blocks found | applied | skipped | target | covers | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|---|
| V01 | 5 | 5 | 0 | `V01-neighbourhoods.md` | §3.18, §5.4, ## 6, ## 7, §8.2 | 17 833 → 18 024 (+1.1 %) | 100.8 → 101.8 |
| V02 | 3 | 3 | 0 | `V02-buildings.md` | §3.18, §5.7, §7.8 | 7 822 → 7 974 (+1.9 %) | 44.5 → 45.4 |
| V03 | 5 | 5 | 0 | `V03-interiors.md` | ## 1, §4.5, §4.6, ## 7, ## 8 | 15 000 → 15 110 (+0.7 %) | 90.1 → 90.7 |
| V04 | 10 | 10 | 0 | `V04-underground.md` | §1b.2, §1b.3, §2.6, §3.5, §3.10, §3.11, §4.3, ## 6, ## 7, ## 8 | 37 918 → 37 854 (−0.2 %) | 224.9 → 224.4 |
| V05 | 4 | 4 | 0 | `V05-sky.md` | §2.1, §2.6, ## 7, ## 8 | 13 503 → 13 596 (+0.7 %) | 79.1 → 79.6 |
| V06 | 9 | 9 | 0 | `V06-evolution.md` | ## 1b, §2.1, §2.10, §3.6, §3.7, §3.19, ## 6, ## 7, ## 9 | 51 109 → 51 644 (+1.0 %) | 303.9 → 306.9 |
| V07 | 12 | 12 | 0 | `V07-village.md` | ## 1b, §2.2a, §3.5, §3.5a, §3.13, §3.17, §4.5, §5.5, §5.6, ## 6, ## 7, ## 8 | 33 762 → 34 761 (+3.0 %) | 198.9 → 204.5 |
| V08 | 14 | 14 | 0 | `V08-settlementforge.md` | ## 1b, §2.2, §2.3, §2.4, §2.7, §3.5, §3.6, §3.16, §3.17, §4.6, §5.5, ## 6, §7.1, ## 9 | 53 173 → 54 306 (+2.1 %) | 320.9 → 327.6 |
| V09 | 12 | 12 | 0 | `V09-application.md` | ## 1b, §2.12, §3.16, §4.2, §4.9, §4.20.2, §4.21, §5.8, §5.10, §5.15, §6.4, §7.1 | 51 931 → 52 961 (+2.0 %) | 307.1 → 313.3 |
| V10 | 10 | 10 | 0 | `V10-clerk.md` | §1.2, §1b.1, §1b.2, §2.13, §3.5, §3.9, §3.9b, §3.23, §7.1, ## 8 | 25 729 → 26 168 (+1.7 %) | 156.3 → 158.8 |
| V11 | 6 | 6 | 0 | `V11-content.md` | §3.1, §3.2, §3.24, §3.26, ## 8, ## 9 | 30 274 → 30 366 (+0.3 %) | 182.9 → 183.5 |
| V12 | 6 | 6 | 0 | `V12-calibration.md` | §2.13, §3.4, §3.11, §3.15, §7.1, §10.2 | 29 583 → 29 836 (+0.9 %) | 177.4 → 179.0 |
| determinism | 8 | 8 | 0 | `ARCHITECTURE.md` | §5.3, §5.4, §6.3, §6.5, §7.1, §7.3, §7.4, §7.7 | 58 348 → 58 713 (+0.6 %) | 356.5 → 358.6 |
| kernel | 1 | 1 | 0 | `ARCHITECTURE.md` | §3.2 | 2 288 → 2 407 (+5.2 %) | 13.4 → 14.1 |
| model | 2 | 2 | 0 | `ARCHITECTURE.md` | §2.7, §2.9 | 20 984 → 21 209 (+1.1 %) | 130.6 → 132.0 |
| pipeline | 10 | 10 | 0 | `ARCHITECTURE.md` | §4.1, §4.3, §4.4, §4.5, §4.7, §4.8, §4.11, §4.13, §10.2, II.7.3 | 71 912 → 72 409 (+0.7 %) | 439.9 → 442.7 |
| rendering | 11 | 11 | 0 | `ARCHITECTURE.md` | §8.2, §8.4, §8.6, §8.8, §8.11, §9.5, §11.1, §11.2, §11.6, §12.5, §12.10 | 59 305 → 60 103 (+1.3 %) | 345.2 → 349.7 |
| scope | 5 | 5 | 0 | `ARCHITECTURE.md` | §13.1, §13.2, §13.8, ## §14, ## §16 | 46 049 → 46 730 (+1.5 %) | 288.1 → 292.0 |
| **total** | **133** | **133** | **0** | | | | |

"Covered text": a REPLACE's section in the untouched file against the section of its body's heading in the installed file (whitespace-split
words). Each unit's count matches its header's and its result file's (V01 5, V02 3, V03 5, V04 10, V05 4, V06 9, V07 12, V08 14, V09 12,
V10 10, V11 6, V12 6; determinism 8, kernel 1, model 2, pipeline 10, rendering 11, scope 5). Determinism's, kernel's and scope's figures
equal their headers' (58 348 → 58 713; 2 288 → 2 407; 46 049 → 46 730).

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines before → after | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 37 | 37 | 0 | 153 → 153 | 140 → 140 (balanced) | `2d84eac2d8a379d1` | no seat records the six files' combined output (kernel's combined run: "37 found, 37 applied … §3 of the combined output identical to §3 alone", no hash — reproduced); each seat's stand-alone run reproduced (below) |
| `V01-neighbourhoods.md` | 5 | 5 | 0 | 123 → 123 | 12 → 12 (balanced) | `4585e1a59d0e499a` | equal — repair-r5-V01 l. 109 (`4585e1a59d0e499a…`, 527 808 bytes) |
| `V02-buildings.md` | 3 | 3 | 0 | 77 → 77 | 16 → 16 (balanced) | `fb46c67694cfe88d` | equal — repair-r5-V02 l. 26, 105 |
| `V03-interiors.md` | 5 | 5 | 0 | 48 → 48 | 14 → 14 (balanced) | `3fe82c822e32b703` | equal — repair-r5-V03 l. 26 (467 516 bytes) |
| `V04-underground.md` | 10 | 10 | 0 | 59 → 59 | 12 → 12 (balanced) | `b79fd29048f06a90` | equal — repair-r5-V04 l. 117 (526 488 bytes) |
| `V05-sky.md` | 4 | 4 | 0 | 62 → 62 | 14 → 14 (balanced) | `171db6516974533d` | equal — repair-r5-V05 l. 89 (401 879 bytes) |
| `V06-evolution.md` | 9 | 9 | 0 | 65 → 65 | 28 → 28 (balanced) | `6fb1f6417fc1dfc8` | equal — repair-r5-V06 l. 189 (694 375 bytes) |
| `V07-village.md` | 12 | 12 | 0 | 58 → 58 | 18 → 18 (balanced) | `7747179dc9854aa6` | equal — repair-r5-V07 l. 116 – 117 (610 850 bytes) |
| `V08-settlementforge.md` | 14 | 14 | 0 | 63 → 63 | 18 → 18 (balanced) | `8b5b52439f96a352` | equal — repair-r5-V08 l. 160 (579 431 bytes) |
| `V09-application.md` | 12 | 12 | 0 | 110 → 110 | 24 → 24 (balanced) | `7c91d3bff549344b` | equal in lines — repair-r5-V09 l. 143: "4 993 → 5 021 lines" (no hash) |
| `V10-clerk.md` | 10 | 10 | 0 | 86 → 86 | 24 → 24 (balanced) | `847b3189f56daf45` | equal — repair-r5-V10 l. 98 |
| `V11-content.md` | 6 | 6 | 0 | 58 → 58 | 22 → 22 (balanced) | `b1445a5ff552c7cb` | equal — repair-r5-V11 l. 24, 123 |
| `V12-calibration.md` | 6 | 6 | 0 | 67 → 67 | 30 → 30 (balanced) | `1e305ebe07843db0` | equal — repair-r5-V12 l. 27, 135 |

Audit (each run): every applied body found exactly once in the output, not-OK 0; every title block unchanged by the blocks; PENDING FABLE
REVIEW lines unchanged in every file. The applier printed no note (no duplicate id inserted, no retitle, no supersession).

**The base seats' stand-alone dry runs, reproduced** (`handoff.py`, `handoff.json` → `checks.alone`; each seat's blocks alone on the
untouched base and rationale, compared with what its header records): determinism 8/8, audit 0, headings 153 → 153, its diff within the
recorded lines "9208, 9221, 9253, 9971–9973, 10180–10183, 10319, 10592–10595, 10845, 11190, 11365, 11786, 11873, 11978" of the live base
(13 hunks); kernel 1/1, 2 hunks exactly as recorded (l. 3562 changed; 5 lines added after l. 3655), index 805 = Part A 805, rationale
unchanged, and §3 of the combined base identical to §3 of kernel's alone run (its "combined" record); model 2/2, its diff within the
recorded "l. 2292, 2315–2317, 2535–2540, 2546–2615, 3392–3393"; pipeline 10/10, 22 934 → 22 950 lines, rationale unchanged = recorded;
rendering 11/11, audit 0, headings 153 → 153, index 805 and Part A 805, no duplicate = recorded; scope 5/5, 22 934 → 22 967 lines,
rationale untouched, 805 = 805 = recorded. All six equal their records. The six diffs are disjoint: the combined base grows by 95 lines,
the sum of the six stand-alone growths (4 + 5 + 15 + 16 + 22 + 33).

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents (base 153, INDEX 9,
V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67, each unchanged). The numbered targets the
resolver reads are unchanged (section 5); the defined ids stay at 3 467.

**RULING REQUEST blocks — 0.** No repair-r5 file carries one (ROUND-5 NOTES (2)): the only "RULING REQUEST" strings are model's and
pipeline's header counts ("0 RULING REQUEST blocks"), and `route.py`'s header regex matched none; so none is listed or skipped. No `=== `
header line of any kind and no "RULING REQUEST" text is present in any live file after installation.

### 2.1 NOTES FOR ASSEMBLE — the census (ROUND-5 NOTES (9) (a))

The census of the eighteen headers (every line naming Assemble or the assembler, a swap, a title block, a restated row, a J-ROWS or
RATIONALE-A row, or a proposed allow row) finds **one** note addressed to Assemble:

1. **Scope, NOTE FOR ASSEMBLE (one proposed allow row; "the shared allow file is the assembler's to write")** — C3 `3 on the city and`,
   from T110-2's item "(3) on the CITY and METROPOLIS fixtures" (adjudication-r5 R5-02 (S1) text). Reviewed and written as proposed in
   section 6.

No header asks for a swap, a restated J-ROWS or RATIONALE-A row, or a title-block change: rendering records "No J-ROWS or RATIONALE-A"
and "no row restated" (§8.8 now agrees with J-A121.07's index row and Part A entry), and states "no allow row is proposed"; every volume
unit records "title block untouched / unchanged". The other mentions of the assembler are the seats' descriptions of their own dry runs
("the FILE line dropped, as Assemble routes it"). So `final/` is apply.py's output unchanged (INDEX.md carried unchanged), and the only
change outside the blocks is the allow file's appended block (section 6). The headers' HAND-OFFS lists (for the round's verifiers: for
instance scope's on kernel's §3.2 (9) text read by §13.1 and V06's T-V6-73 regrowth clause on H-AQUA; V07's on texts landing in this same
assemble) are not assembly work and stand in the repair files; ROUND-5 NOTES (9) (b) is met by applying all eighteen files before the
reference check (section 5).

## 3. The rationale

No block of the round is a J-ROWS or RATIONALE-A block and no header restates a row: `docs/ARCHITECTURE-RATIONALE.md` is byte-identical
before and after (704 770 bytes, 119 120 words, `a480f02e…`); the judgment index (in the base) and Part A hold 805 entries each, one id set,
no duplicate, both orders unchanged, every index row byte-identical (`handoff.json` → `checks.ids`). Each volume run's throwaway rationale
output is byte-identical to its input.

## 4. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|
| base | 3 003 627 | 3 019 440 | +0.5 % | 486 772 | 489 457 | +0.6 % | 2933.2 → 2948.7 |
| V01 | 526 767 | 527 808 | +0.2 % | 86 439 | 86 630 | +0.2 % | 514.4 → 515.4 |
| V02 | 563 512 | 564 391 | +0.2 % | 94 303 | 94 455 | +0.2 % | 550.3 → 551.2 |
| V03 | 466 833 | 467 516 | +0.1 % | 79 334 | 79 444 | +0.1 % | 455.9 → 456.6 |
| V04 | 527 003 | 526 488 | −0.1 % | 85 761 | 85 697 | −0.1 % | 514.7 → 514.1 |
| V05 | 401 398 | 401 879 | +0.1 % | 67 808 | 67 901 | +0.1 % | 392.0 → 392.5 |
| V06 | 691 243 | 694 375 | +0.5 % | 112 989 | 113 524 | +0.5 % | 675.0 → 678.1 |
| V07 | 605 033 | 610 850 | +1.0 % | 100 120 | 101 119 | +1.0 % | 590.9 → 596.5 |
| V08 | 572 529 | 579 431 | +1.2 % | 90 869 | 92 002 | +1.2 % | 559.1 → 565.9 |
| V09 | 760 527 | 766 888 | +0.8 % | 125 515 | 126 545 | +0.8 % | 742.7 → 748.9 |
| V10 | 515 733 | 518 300 | +0.5 % | 83 453 | 83 892 | +0.5 % | 503.6 → 506.2 |
| V11 | 678 595 | 679 224 | +0.1 % | 113 399 | 113 491 | +0.1 % | 662.7 → 663.3 |
| V12 | 522 516 | 524 105 | +0.3 % | 84 760 | 85 013 | +0.3 % | 510.3 → 511.8 |
| INDEX | 24 074 | 24 074 | 0.0 % | 4 054 | 4 054 | 0.0 % | 23.5 → 23.5 |
| rationale | 704 770 | 704 770 | 0.0 % | 119 120 | 119 120 | 0.0 % | 688.3 → 688.3 |
| **base + volumes** | 9 835 316 | 9 880 695 | +0.5 % | 1 611 522 | 1 619 170 | +0.5 % | 9604.8 → 9649.1 |
| **volumes** | 6 831 689 | 6 861 255 | +0.4 % | 1 124 750 | 1 129 713 | +0.4 % | 6671.6 → 6700.4 |
| **base + volumes + INDEX** | 9 859 390 | 9 904 769 | +0.5 % | 1 615 576 | 1 623 224 | +0.5 % | 9628.3 → 9672.6 |

(Words: whitespace-split, as rounds 0–4 counted them; a seat's `wc -w` figure can differ by a few.) Every changed unit but V04 grows a
little: this round repairs round 4's findings and writes the END lines of adjudication-r5's Part H — the rulings' new cases, readers,
fixtures and bars, and both ends of cross-unit fixes — and the assembler may not compress text; each repair file states its words by
source and what holds its growth. V04 shrinks by 64 words: its seat removed the superseded design R5-02 rules out (the later trace's crossing station at six homes and its test words; principle (3) (b), not a shrink source) and added the design its issues and END lines require (its header: −67 by `wc -w`). Against the shrink goal's band (25–40 % fewer
words than the pre-coherence archive, 1 491 685 words for base and volumes), the set now stands at 1 619 170 words (+8.5 % against the
archive). No unit shrank by more than half (none shrank by more than 0.2 %). Duplicate id definitions across the set (principle (4); the
judgment index, Part A, D-n, T-ER, every volume's T-Vn-m and J-Vn.m rows, `_integrate.md`'s J-VI rows): **none** (`sizes.py`).

## 5. References

assemble-r0's resolver (`refs.py`, citation form canon S7: a bare `§x` is the base's, a volume's section `Vnn §x` everywhere), unchanged
but for its root, run on two mirror trees (`mirror.sh`): the untouched set and the final set, each with `_integrate.md`, files f and g,
`research/` and `docs/volumes/critique/` linked in. Every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…`,
lines read joined, against the headings and ids that now exist (numbered targets, unchanged by the round: base 147, V01 121, V02 99, V03 53,
V04 66, V05 60, V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8; 3 467 defined ids). All eighteen files were applied
before the run (ROUND-5 NOTES (9) (b)), so every cross-unit citation of Part H's END lines is read with both its ends in. The untouched
run's printout is identical to assemble-r4's final run (`refs-before.out` = assemble-r4's `refs-final.out`).

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 55 663 | 55 946 | the target exists |
| external | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 84 | 85 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` only one volume of its list has — the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 55 885 | 56 169 | |

**Broken: 0** (before and after). **Mechanical fixes: 0**: the resolver found no reference of class FIX, and no repair file records a
renumbering (no heading moved; section 2), so `fixrefs.py` was not needed (`fixrefs.json` empty, `ref-fixes.tsv` header only).
**Ambiguous form: 85** (from 84), listed in `ambiguous-refs.tsv` (unit, line, reference, the list's head volume, context): base 13, V01 15,
V02 13, V03 12, V04 2, V05 3, V06 5, V09 7, V10 5, V11 8, V12 2 — each resolves under S7 as the base's; the verifier confirms each or
prefixes it. Two new ones sit in this round's text: V04 l. 1342 `§2.7` ("… its old stations kept (§2.7's support step (7)))", after a V06
list) and V11 l. 3962 `§2.7` ("… a hand way (§2.7's support step (6) (a))", after a V07 list) — both the base's model §2.7, as their words
say; one left the set: base l. 2597 `§3.2` (model's §2.7 block rewrote its sentence). **External: 131** (bare 120, bare-cont 1, J 10),
listed in `external-refs.tsv`.

## 6. Document checks (three-copy method, one corpus snapshot)

`python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with `docs/validation/doc-checks-allow.tsv`, on three
copies against one corpus snapshot (`checks.py`): **untouched** (the live base before this round, sha256 `5f34cceb…`), **new** (the blocks
applied, `2d84eac2…`) and **combined** (the installed text, `2d84eac2…`; equal to new this round: no swap, no reference fix). Two key sets:
(a) the 34 top-level heading keys `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.7,PART III,Delegated decisions,Judgment
calls,Staged,Appendix A` — the brief's command; the parent keys span their children, so their C3 and C4 hits count twice — and (b) the
eight `#` keys, which partition the document. The corpus fingerprint (path, size and mtime of the 128 files doc_checks reads) is equal
before and after every run (`b2f7e5c5fd256d59…`).

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon,
research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the
corpus before any freeze". Every count below is PROVISIONAL (ROUND-5 NOTES (6)).

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 1 / 0 | 3256 / 0 | 12 / 0 | 0 / 0 | 272 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1684 / 0 | 6 / 0 | 0 / 0 | 272 / 0 | **0** |
| new (a) | first | 5 / 0 | 1 / 0 | 3266 / 10 | 12 / 0 | 0 / 0 | 287 / 0 | 1 |
| new (b) | first | 5 / 0 | 1 / 0 | 1689 / 5 | 6 / 0 | 0 / 0 | 287 / 0 | 1 |
| combined (a) | first | 5 / 0 | 1 / 0 | 3266 / 10 | 12 / 0 | 0 / 0 | 287 / 0 | 1 |
| combined (b) | first | 5 / 0 | 1 / 0 | 1689 / 5 | 6 / 0 | 0 / 0 | 287 / 0 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3256 / 0 | 12 / 0 | 0 / 0 | 272 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1684 / 0 | 6 / 0 | 0 / 0 | 272 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3266 / 0 | 12 / 0 | 0 / 0 | 287 / 0 | **0** |
| new (b) | final | 5 / 0 | 1 / 0 | 1689 / 0 | 6 / 0 | 0 / 0 | 287 / 0 | **0** |
| **combined** (a) | final | 5 / 0 | 1 / 0 | 3266 / 0 | 12 / 0 | 0 / 0 | 287 / 0 | **0** |
| **combined** (b) | final | 5 / 0 | 1 / 0 | 1689 / 0 | 6 / 0 | 0 / 0 | 287 / 0 | **0** |

(hits / unreviewed.) The combined document's final run exits 0 on both key sets, and again under `PYTHONHASHSEED` 0, 1, 2 and 12345 (the
same counts); its total over the 34 keys is **3 571 hits** (C1 5, C2 1, C3 3266, C4 12, S1 0, S2 287), 0 unreviewed. The untouched copy is
round 4's clean state (exit 0 before and after; its counts equal assemble-r4's combined run). The 15 new S2 hits are all matched by rows
the allow file already holds.

* **Corrected: none** (no S1 table fault, no mechanical hit).
* **The five unreviewed hits** (distinct; the (a) set counts each twice through its parent key), each attributed by `attrib.py`
  (`c3-attribution.tsv`): new text of a repair block, absent from the untouched base, held whole by no corpus file (each a chain of
  3-grams meeting the corpus by chance) — and each read in context by this seat:
  * C3 `3 on the city and` — final base l. 18487, §13.2's T110-2 item "(3) on the CITY and METROPOLIS fixtures" (repair-r5-scope;
    **proposed by scope's NOTE FOR ASSEMBLE**): ordinary English after an item number.
  * C3 `5 and the hand off` — final base l. 2562, §2.7 (repair-r5-model): "(§4.11; V06 §3.7.6 (5)) and the hand-off down that makes the
    enceinte the village's palisade": a section pointer's item number, then ordinary words.
  * C3 `junction with a ring road` — final base l. 2564, §2.7 (repair-r5-model): "with no gate law and no junction with a ring road":
    ordinary English (the base's own ring road, on 15 lines of the base).
  * C3 `4 3 s for a` and C3 `3 3 s for a` — final base l. 2593, §2.7's under-deck strip clause (a) (repair-r5-model): "(§4.3's for a
    route; … V01 §3.17.3 (3)'s for a stage-2 seed's way …": section-pointer digits with their possessive.
  No list, table, grammar, palette or identifier in any: false positives. Model's header records no doc_checks run and proposes no row, so
  its four are the assembler's own review (assemble-r3's `reviewrows.py` precedent: "no repair seat proposed a row, so each row is the
  assembler's own review").
* **Reviewed allow rows: 5**, one block `# block: coherence/assemble-r5` appended by `allowrows.py` (append only; it stops unless every
  attributed hit is covered by exactly one rule: a proposed row only where the proposing seat carries the text, a reviewed row only where
  the named seat carries it, no seat proposed it, and every line it stands on carries the quoted text; both only for text absent from the
  untouched base and held whole by no corpus file). The allow file: 2 325 → 2 331 lines (header and five rows), sha256 `c1bc497a…` →
  `fc5117d5…`, its first 2 325 lines byte-identical to HEAD. **Allow rows not dropped**: as in rounds 0–4, with an incomplete corpus a row
  matching nothing here may still be needed on the machine that holds the corpus, and the file is shared, so this seat only appends; a
  kept row hides no new hit (review is by exact text).
* **Volume information runs** (`volchecks.sh`, `volsummary.py`: each volume and INDEX, whole document, `--heads` the matching base,
  untouched against installed; `volchecks-final.txt`): volume runs carry hundreds of unreviewed runs from before this pass and are not held
  to exit 0 (as in rounds 0–4). The installed volumes add 8 new distinct unreviewed pairs and drop 1, all C3 runs of this round's block text
  (section-pointer digits or ordinary words): V01 2 (`5 4 1 3 4 6`, `a change of the drawn`; `5 4 1 3 6` gone), V02 1 (`3 8 2 2 its`), V07 1
  (`the palisade is a wall`), V09 2 (`a change of the drawn`, `field groups at the same`), V10 2 (`a field and a building`, `or a field or
  a`); V03, V04, V05, V06, V08, V11, V12 and INDEX 0. No volume seat proposed a row, so none is appended; they are listed for those
  volumes' seats or the close.
* **The rationale (information; not held to exit 0):** unchanged this round; one run, `--heads` the installed base: C3 493 / 320
  unreviewed, S2 17 / 15 (equal to assemble-r4's after-run).

## 7. Bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md` (71 563 lines reported from 14 sources; 9 880 862 → 9 926 241
bytes, sha256 `acee60dc…` → `f573c910a54abfbf…`); `--check` reports it UP TO DATE (exit 0).

## 8. Review ids in design text (ROUND-5 NOTES (9) (c))

`reviewids.py` counts, in the live base, volumes and INDEX, the citations of review-process ids — the rulings `R<n>-nn` and every issue,
conflict, wiring or inventory id the coherence pass's own records define (`verify-*.md`, `adjudication-r*.md` — adjudication-r5
included —, `inventory-*.md`, canon, agreement, edges, wiring; 8 724 tokens), less any token the design itself defines and the design id
families — outside the decision and request records (base: *Delegated decisions*, *Judgment calls*; volumes: §9 Decisions, §10 Base change
requests, §13 Fix list, Integration notes; anywhere: a J-, BCR-, X- or CVR- row). One design name is excluded by hand: `M4-110`, V12
§3.9.1's named panel group (J-V12.45). Read-only: nothing was edited; the verifiers raise any site.

**Design-text sites: 0** (4 in the untouched set: base 2, V05 2). This round's blocks removed all four and added none: base l. 6784's
`DXC-06, KXC-02` (pipeline's §4.7 block), V05 l. 313's `MC-07` (V05's §2.1 block) and V05 l. 685's `MC-05` (V05's §2.6 block). **No
`R2-nn` – `R5-nn` ruling id and no verifier issue id stands in design text** (a direct grep finds the `R2-nn` tokens of the set only in
V09's §9 Decisions rows J-V9.144, J-V9.147, J-V9.149 and its §10 row BCR-V9-37). Inside the records 25 citations stand, kept as records
(V03 9, V09 15, V10 1), unchanged. Full lists: `reviewids-final.tsv` and `reviewids-untouched.tsv`.

## 9. Not placed, and left for the verifier

* **Unplaced: nothing.** Every block of the eighteen files is applied and the one NOTE FOR ASSEMBLE is applied as written; no RULING
  REQUEST exists this round; no double REPLACE, so no merge conflict and no lost hunk; no block targeted a missing or retitled heading.
* **Broken references: 0** (section 5); no mechanical fix was needed.
* **85 ambiguous-form references** (section 5, `ambiguous-refs.tsv`; 2 new, 1 gone): read as the base's under S7; the verifier confirms
  each or prefixes it.
* **0 review-id sites in design text** (section 8).
* **Hand-offs between units** that the repair files record for the round's verifiers (each header's HAND-OFFS list) are not assembly work.
* **Volume document checks:** 8 new volume hits without a proposed row (section 6, `volchecks-final.txt`) — for those volumes' seats or
  the close.
* **The document checks are provisional** (section 6): re-run them on the machine that holds the reference corpus; the five base rows
  were reviewed against this checkout's smaller corpus, four of them by this seat alone (no seat proposed them).
* **Size:** the set at +8.5 % words against the pre-coherence archive, outside the shrink band (section 4); each repair file states what
  holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the 15 live files' sha256 before (each equal to its HEAD blob at `3310b538`) and after (each equal to its final
copy, re-checked after the checks and the bundle); the eighteen repair files landed and committed; the routing of 133 blocks and the census
(0 missing, 0 ambiguous, 0 unclosed, 0 RULING REQUEST, 0 overlap, 0 double REPLACE, 0 retitle); 133 applied with audit not-OK 0 and
balanced fences in every file; eleven volume outputs equal to their seats' recorded sha256 and V09 to its recorded line count; the six
base seats' stand-alone dry runs reproduced (and kernel's combined §3 record); the rationale and the judgment index untouched (805 = 805,
one id set, no duplicate); no heading added, removed or retitled; the reference counts of section 5 with 0 broken and 0 fixes; the document
checks' counts of section 6, exit 0 on every copy and key set and under four hash seeds, one corpus snapshot; the allow file appended only;
the bundle regenerated and `--check` clean; the sizes of section 4; no duplicate id definition; the review-id census of section 8.
**PLAUSIBLE:** that the five reviewed rows are false positives (attributed by script, read in context by this seat; one proposed by the
seat that wrote the text, four with no second reader); that V09's output equals its generator's (the seat records no hash; its 12 blocks
applied with audit 0 and the line count it records); that the ambiguous-form references read as their authors meant (S7 reads them as the
base's; the two new ones checked by reading, the rest not one by one); and that the review-id census's token set is complete (it reads the
ids the coherence records define as headings, first table cells or bold labels, plus the `R<n>-nn` rulings; an id cited only in running
text of a record would be missed).
