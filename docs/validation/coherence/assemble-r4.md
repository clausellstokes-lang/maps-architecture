# Assemble — coherence pass, round 4 (the eighteen repair-r4 block files applied to the base, the volumes and the rationale)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r4 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r4`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at 96bdae26); untouched snapshot — done
- P2 block inventory and routing (18 files, 189 blocks, 0 RULING REQUEST, 0 missing heading, 0 double REPLACE); NOTES FOR
  ASSEMBLE census (pipeline's and rendering's restated-row swaps; scope's and rendering's proposed allow rows) — done
- P3 apply (189 applied, 0 skipped, audit not-OK 0, every recorded volume dry run reproduced), the two swaps (index 805 =
  Part A 805), every base seat's stand-alone dry run reproduced, headings unchanged, install (14 of 15 changed) — done
- P4 references: 55 885 checked, 0 broken, 0 mechanical fixes, 84 ambiguous-form listed — done
- P5 document checks, three-copy method: 4 reviewed base rows (the seats' proposals), exit 0 on every copy and key set;
  volume information runs — done
- P6 bundle and `--check` — done
- P7 review-id census (ROUND-4 NOTES (9) (c)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r4/` (`snapshot.py`, `route.py`, `apply.py` —
which runs `docs/validation/amendments-b/apply-blocks.py` unchanged —, `handoff.py` — which runs pipeline's and rendering's own
`swap_restated.py` unchanged —, `headings.py`, `install.py`, `mirror.sh` with `refs.py` and `refsreport.py`, `fixrefs.py`, `checks.py`,
`attrib.py`, `allowrows.py`, `volchecks.sh`, `sizes.py`, `unitsizes.py`, `reviewids.py`), assemble-r3's with the round label and the
scratch folder (`scratchpad/coherence/asm4/`) changed; `handoff.py` is this round's (the round's two swaps, and the six base seats'
stand-alone dry runs reproduced), `attrib.py` reads rendering's bullet form of proposed rows, and `allowrows.py` knows `§5.15`'s volume.
No live text was hand-edited. Their records sit beside them (`snapshot.json`, `blocks.json`, `split/`, `logs/`, `apply.json`,
`handoff.json`, `headings.json`, `install.json`, `fixrefs.json`, `ref-fixes.tsv`, `refs-before.out`, `refs-final.out`,
`refs-summary.json`, `ambiguous-refs.tsv`, `external-refs.tsv`, `checks.json`, `c3-attribution.tsv`, `volchecks-final.txt`,
`sizes.json`, `unitsizes.json`, `reviewids-untouched.*`, `reviewids-final.*`).

## Outcome

All eighteen repair files had LANDED before this seat started (each a `coherence/repair-<unit>-r4 LANDED` line in the lane log and its
result in `results/coherence_repair-<unit>-r4.json`; all eighteen committed, HEAD `96bdae26`; ROUND-4 NOTES (9) (d)). They are applied:
**189 blocks found, 189 applied, 0 skipped**. No file carries a RULING REQUEST (0 `=== RULING REQUEST` lines in the eighteen), no heading
was missing or ambiguous, no block truncated, and no two blocks touch one subsection (no double REPLACE, no nesting), so no three-way merge
was needed. The audit finds every applied body exactly once and fences balanced in every file; eleven volume outputs are byte-identical
to the result their repair seats recorded for their own dry runs (ten by sha256, V10 by line count; V09 records neither), and each of the
six base seats' recorded stand-alone dry runs is reproduced exactly. The two NOTES FOR ASSEMBLE that change text are applied as written by
the seats' own scripts, count-asserted: pipeline's (J-A81.41's Part A entry restated) and rendering's (J-A121.02's index row; J-A68.85,
J-A68.89 and J-A68.90's Part A entries) — the judgment index and Part A both 805 rows, one id set, no duplicate, no id added or removed.
The two notes that propose allow rows (scope 1, rendering 3) are reviewed and written. **Nothing is unplaced.** The round adds, removes
and retitles no heading. The set (base and volumes) goes from 9 510.9 KB to 9 604.8 KB (+1.0 % bytes, +1.0 % words). Of 55 885
references checked, **none is broken**; none needed a mechanical fix; 84 resolve but are ambiguous in form (80 before). The document checks
exit 0 on the untouched, new and combined copies over every top-level key and over the eight `#` keys, against one corpus snapshot,
after 4 reviewed allow rows — **provisional**, the reference corpus being incomplete in this checkout; the combined document's total is
3 546 hits, 0 unreviewed. The bundle `docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes. Review ids in design text (ROUND-4
NOTES (9) (c)): **4 sites** outside the decision and request records (14 before), none an `R2-nn` / `R3-nn` / `R4-nn` ruling or a
verifier issue id (section 8).

## 1. Live files — sha256 before and after

Before: the committed text at HEAD `96bdae2608a9` (each live file equal to its HEAD blob; assemble-r3's outputs, the base `593c657d…`
every repair file was written against). After: written by `install.py`, guarded on each live file still holding its P1 sha256 and each
verified byte-identical to its final copy. No reference fix followed (section 5), so the installed files are the final ones.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 2 974 590 | 3 003 627 | `593c657d34849302d1e4bd2355149b6606b2ed1c10c9ea2ca03746d78c9a7fe3` | `5f34cceb61432ac420f375d84296f6d154dad2af6a1fbcdf329763425784334c` |
| `docs/ARCHITECTURE-RATIONALE.md` | 704 669 | 704 770 | `e7b59eac90a75327c91ec60a281e34b9c14919b5208f282d48b7026bf1324b5c` | `a480f02e58a893fea57cacc5977b83489f633ced23901f578adbcfbd8059c52a` |
| `docs/volumes/V01-neighbourhoods.md` | 523 442 | 526 767 | `8260b2a828b75099869def006f4d621ec063c5bb0f47526162e9942a4a81becc` | `a0c15b713802a1ed08037da66475e87d2abfaf07c3a111182c85ed210cc02ce5` |
| `docs/volumes/V02-buildings.md` | 561 207 | 563 512 | `4696951caa15e7ffe32522c2f5159b676a8c0da14ad45a4f10d2febe45d82e40` | `2579cb1696f494b6b265f13a6d4e649a0fbbe111b54f7b6d2f196a56b2d67da4` |
| `docs/volumes/V03-interiors.md` | 464 396 | 466 833 | `f4458cf438971b111959196b5ae575b36ea6da248a5e72289c45dc565d80c2e3` | `9af5ffd5d8aa2fa9298cef3a5541bdb6ad03b5a2c578c145684b1b8136ccb2c4` |
| `docs/volumes/V04-underground.md` | 520 064 | 527 003 | `0e3bcacd8f5cc61680509b213757a3cc3a94252d6647acd26938bce7b263f162` | `6aebc1e136c8778c9fcac983b98590a4ef3e74b5daf5dd036edd09b82505dff1` |
| `docs/volumes/V05-sky.md` | 398 194 | 401 398 | `cc1dfa61fe882bcb8767901e0d5624fcfc7776d6cc1a4256d6eca269a89aad28` | `ef99abd9b5a84c8aa4530a2f318c45618f66959571fb6d9836847c509c68f031` |
| `docs/volumes/V06-evolution.md` | 680 177 | 691 243 | `8f92dd3809e03132e1d710d49e11ccf8ccce394b5dd7ceb8b7d73e2234299feb` | `ef22171ae7b0d296b1a71ea88b0765541a2616f3a76ba445960830cbb8eff474` |
| `docs/volumes/V07-village.md` | 603 780 | 605 033 | `285e2f6fe9dd744be31d1d5db7073d16c958cd2f67d956e9a6da935b091a0b5a` | `a55c4d0803b7a755922816fc0eacbf8f8a962395fc8e9a73c889a62190d2ba2b` |
| `docs/volumes/V08-settlementforge.md` | 559 089 | 572 529 | `bf9fa7be4ae8c3b9977d0b2e9a6938a0be34b43df607d10c9364c64c6d0a47fe` | `4675c05ecf19eb56966b4dbaeb69e70ac4af690b7fbd6f0c9cf651127006b7bd` |
| `docs/volumes/V09-application.md` | 749 608 | 760 527 | `cfe4df195892ff4f0943cf98764a0b4d36d22af02f11d51d4eeed6acf3675b04` | `b49c6014c7b8e61dce1100beb580323a12fbd43da1d73e035723f2d2e767eee2` |
| `docs/volumes/V10-clerk.md` | 510 631 | 515 733 | `382ea60eedc48fa960654297ec9d6d9ffdecf80a608b3a656fc8ea93d1ea75e7` | `3fd16e696cb259f51f1c17f72618d1193e7e594d672ce12c8a1b11422761f7fa` |
| `docs/volumes/V11-content.md` | 674 664 | 678 595 | `1671da41b1f28eeda542e2946004dd94ccdc424dde2c940c16d87619a1a790d9` | `47b14d9f67f451fd5194c62fff07a543037dde36078fb54eb74ed894fddb0c20` |
| `docs/volumes/V12-calibration.md` | 519 356 | 522 516 | `90a61a9c9232f349e475123a98d52d43a5827823622b66a4434e85cb90c897b5` | `2db3c8c9664844a3e15570bee237d12b0e4a2eea95ca7c56612b73f037cf879b` |
| `docs/volumes/INDEX.md` | 24 074 | 24 074 | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` (unchanged: no block routes to it) |

Also written: `docs/ARCHITECTURE-FULL.md` (the bundle, section 7) and `docs/validation/doc-checks-allow.tsv` (one appended block, section 6).

## 2. Blocks — routing, application, audit

**The block files** (`blocks.json` records each one's sha256 as read): exactly `docs/validation/coherence/repair-r4-<unit>.md` for the
eighteen units (ROUND-4 NOTES (1)); everything under `work/` and the bench files are the repair seats' working material, never blocks.

| file | sha256 (16) | lines | FILE lines |
|---|---|---:|---|
| `repair-r4-V01.md` … `repair-r4-V12.md` | `0ad2d963af2ebc92`, `a2541c39600b5836`, `b205f8d2df32fcea`, `4fb213a9b3b785c8`, `ac36a3d30d4c43ed`, `2fc62f8e39156fb2`, `c5312279c8b49425`, `08a019e68e7abdd9`, `1662a75c21c50565`, `08c5ef5c248d273a`, `1d94de751daf84c1`, `e1e083f473de92ac` | 1 090, 862, 1 090, 1 997, 1 147, 2 470, 515, 1 950, 1 810, 1 593, 1 883, 1 331 | one each, naming its volume |
| `repair-r4-determinism.md`, `-kernel`, `-model`, `-pipeline`, `-rendering`, `-scope` | `c200aca799e1e19f`, `246d6cad1d28e0ae`, `d6c484a42e1a7941`, `478450b143921f7e`, `d37be318a3d82665`, `3c5f6712ac839dd5` | 2 855, 247, 2 035, 2 461, 3 282, 2 277 | none (the base) |

**Routing** (`route.py`). Each file was cut at its `=== FILE <path> ===` lines; every block went to the file its nearest FILE line above
names, the base when none (ROUND-4 NOTES (3)). No file carries blocks for more than one document this round, and none routes to INDEX.md.
The split block files keep their repair file's basename, so `apply-blocks.py` applies them in the round's name order (V01 … V12,
determinism, kernel, model, pipeline, rendering, scope); the FILE lines are left out (routing, not blocks) and every other line is
verbatim. The base ran with the rationale; each volume with a throwaway rationale whose output equals its input (no J-ROWS or
RATIONALE-A block routes to them). No text follows any file's last END.

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST, 0 overlaps of any
kind — no two blocks of the round (within one unit or across units) cover one subsection or nest. Hence **no double REPLACE**: the brief's
`git merge-file` step (merge base: the subsection as assemble-r3 installed it, base `593c657d34849302…`) had nothing to merge and no
conflict to report (ROUND-4 NOTES (4)); and no block named a heading that an earlier block of this round had retitled (ROUND-4 NOTES (5)):
every block was found on the text as it stood. The kinds: 186 REPLACE (base 41, volumes 145 — every volume block a REPLACE), 1 J-ROWS
(rendering) and 2 RATIONALE-A (pipeline, rendering).

| unit | blocks found | applied | skipped | target | covers | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|---|
| V01 | 11 | 11 | 0 | `V01-neighbourhoods.md` | §1.2, §1b, §2.3, §3.14, §3.16, §3.17.3, §3.18, §5.4, ## 6, ## 7, ## 12 | 30 313 → 30 900 (+1.9 %) | 179.4 → 182.6 |
| V02 | 8 | 8 | 0 | `V02-buildings.md` | §1b, §1d, §3.18, §5.7, §7.8, §8.6, ## 9, ## 13 | 24 811 → 25 174 (+1.5 %) | 145.0 → 147.3 |
| V03 | 10 | 10 | 0 | `V03-interiors.md` | ## 1, ## 1b, §2.5, §3.13, §5.6, ## 6, ## 7, ## 8, ## 9, ## 13 | 35 677 → 36 068 (+1.1 %) | 206.6 → 209.0 |
| V04 | 18 | 18 | 0 | `V04-underground.md` | §1.2, §1.3, §1b.1 – §1b.3, §2.6, §3.5, §3.10, §3.11, §4.1, §4.3, §5.1, §5.4, §5.6, ## 6, ## 7, ## 9, ## 13 | 52 661 → 53 799 (+2.2 %) | 311.1 → 317.8 |
| V05 | 11 | 11 | 0 | `V05-sky.md` | ## 1b, §3.16, §3.23, §5.1 – §5.4, §5.6, ## 6, ## 7, ## 9 | 27 926 → 28 485 (+2.0 %) | 157.1 → 160.2 |
| V06 | 17 | 17 | 0 | `V06-evolution.md` | §1.1, ## 1b, §2.1, §2.8, §2.10, §3.5 – §3.7, §3.11, §3.19 – §3.21, §3.23, ## 6, ## 7, ## 9, ## 12 | 64 501 → 66 381 (+2.9 %) | 384.1 → 394.9 |
| V07 | 4 | 4 | 0 | `V07-village.md` | ## 1b, §4.5, §5.6, ## 7 | 18 405 → 18 593 (+1.0 %) | 108.9 → 110.1 |
| V08 | 17 | 17 | 0 | `V08-settlementforge.md` | ## 1b, §2.2, §2.4, §2.7, §3.5, §3.6, §3.9, §3.15 – §3.17, §4.6, §5.4, ## 6, §7.1, §8.2, ## 9, ## 12 | 54 790 → 57 047 (+4.1 %) | 332.0 → 345.1 |
| V09 | 12 | 12 | 0 | `V09-application.md` | ## 1b, §2.6, §2.7, §2.12, §3.16, §4.2, §4.9, §4.20.2, §4.21, §5.4, §5.8, §7.1 | 50 563 → 52 391 (+3.6 %) | 299.7 → 310.3 |
| V10 | 15 | 15 | 0 | `V10-clerk.md` | §1.2, §1b.1, §2.3, §2.12, §2.13, §3.3, §3.5, §3.9, §3.9a, §3.9b, §3.17, §3.23, §7.1, ## 8, §10.2 | 35 351 → 36 175 (+2.3 %) | 215.2 → 220.2 |
| V11 | 10 | 10 | 0 | `V11-content.md` | §1b, §2.8, §2.8c, §2.10, §3.1, §3.24 – §3.26, ## 7, ## 8 | 43 344 → 43 956 (+1.4 %) | 262.4 → 266.3 |
| V12 | 12 | 12 | 0 | `V12-calibration.md` | §2.7b, §2.13, §3.4, §3.7, §3.12, §3.15, §3.16, ## 6, §7.1, §8.1, §8.2, §10.2 | 34 671 → 35 119 (+1.3 %) | 203.7 → 206.8 |
| determinism | 10 | 10 | 0 | `ARCHITECTURE.md` | §5.1, §6.1, §6.3, §6.5, §7.1, §7.3 – §7.7 | 63 909 → 64 449 (+0.8 %) | 391.3 → 394.3 |
| kernel | 1 | 1 | 0 | `ARCHITECTURE.md` | §3.2 | 2 215 → 2 288 (+3.3 %) | 13.0 → 13.4 |
| model | 3 | 3 | 0 | `ARCHITECTURE.md` | §2.6, §2.7, §2.9 | 40 021 → 41 121 (+2.7 %) | 245.9 → 252.2 |
| pipeline | 8 | 8 | 0 | `ARCHITECTURE.md` (+ rationale) | §4.1, §4.3, §4.4, §4.8, §4.11, §4.13, §10.2; RATIONALE-A (J-A81.41, restated) | 43 525 → 44 602 (+2.5 %) | 266.1 → 272.3 |
| rendering | 16 | 16 | 0 | `ARCHITECTURE.md` (+ rationale) | §8.1, §8.2, §8.4, §8.6, §8.8, §8.11, §9.1, §9.2, §11.1 – §11.3, §11.6, §12.5, §12.10; J-ROWS (J-A121.02), RATIONALE-A (J-A68.85, .89, .90), all restated | 67 540 → 68 902 (+2.0 %) | 395.7 → 403.8 |
| scope | 6 | 6 | 0 | `ARCHITECTURE.md` | §0.2, §13.1, §13.2, §13.8, ## 14, ## 16 | 48 439 → 49 209 (+1.6 %) | 301.3 → 305.8 |
| **total** | **189** | **189** | **0** | | | | |

"Covered text": a REPLACE's section in the untouched file against the section of its body's heading in the installed file; J-ROWS and
RATIONALE-A count their rows, a restated row against the older row it replaces. Each unit's count matches its header's (V01 12 found less
its FILE line, V04 19 less its FILE line; V02 8, V03 10, V05 11, V06 17, V07 4, V08 17, V09 12, V10 15, V11 10, V12 12; determinism 10,
kernel 1, model 3, pipeline 7 + 1, rendering 14 + 1 + 1, scope 6). Scope's and kernel's figures equal their headers' (48 439 → 49 209;
2 215 → 2 288).

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines before → after | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 44 | 44 | 0 | 153 → 153 | 140 → 140 (balanced) | `2370248e8cc888df` (before the swaps) | no seat records the six files' combined output (kernel's combined run: "44 found, 44 applied … audit not-OK 0", no hash); each seat's stand-alone run reproduced (below) |
| `V01-neighbourhoods.md` | 11 | 11 | 0 | 123 → 123 | 12 → 12 (balanced) | `a0c15b713802a1ed` | equal — repair-r4-V01 l. 110 (`a0c15b713802a1ed…`, 526 767 bytes) |
| `V02-buildings.md` | 8 | 8 | 0 | 77 → 77 | 16 → 16 (balanced) | `2579cb1696f494b6` | equal — repair-r4-V02 l. 25, 141 |
| `V03-interiors.md` | 10 | 10 | 0 | 48 → 48 | 14 → 14 (balanced) | `9af5ffd5d8aa2fa9` | equal — repair-r4-V03 l. 24 (466 833 bytes) |
| `V04-underground.md` | 18 | 18 | 0 | 59 → 59 | 12 → 12 (balanced) | `6aebc1e136c8778c` | equal — repair-r4-V04 l. 136 (527 003 bytes) |
| `V05-sky.md` | 11 | 11 | 0 | 62 → 62 | 14 → 14 (balanced) | `ef99abd9b5a84c8a` | equal — repair-r4-V05 l. 117 (401 398 bytes) |
| `V06-evolution.md` | 17 | 17 | 0 | 65 → 65 | 28 → 28 (balanced) | `ef22171ae7b0d296` | equal — repair-r4-V06 l. 209 (691 243 bytes) |
| `V07-village.md` | 4 | 4 | 0 | 58 → 58 | 18 → 18 (balanced) | `a55c4d0803b7a755` | equal — repair-r4-V07 l. 91 – 92 (605 033 bytes) |
| `V08-settlementforge.md` | 17 | 17 | 0 | 63 → 63 | 18 → 18 (balanced) | `4675c05ecf19eb56` | equal — repair-r4-V08 l. 190 – 191 (572 529 bytes) |
| `V09-application.md` | 12 | 12 | 0 | 110 → 110 | 24 → 24 (balanced) | `b49c6014c7b8e61d` | the seat records "12 of 12 applied … audit 0 not OK; headings 110 → 110", no hash or size |
| `V10-clerk.md` | 15 | 15 | 0 | 86 → 86 | 24 → 24 (balanced) | `3fd16e696cb259f5` | equal in lines — repair-r4-V10 l. 111: "3533 → 3555 lines" (no hash) |
| `V11-content.md` | 10 | 10 | 0 | 58 → 58 | 22 → 22 (balanced) | `47b14d9f67f451fd` | equal — repair-r4-V11 l. 138 – 139 (678 595 bytes) |
| `V12-calibration.md` | 12 | 12 | 0 | 67 → 67 | 30 → 30 (balanced) | `2db3c8c9664844a3` | equal — repair-r4-V12 l. 108 |

Audit (each run): every applied body found exactly once in the output, not-OK 0; every title block unchanged by the blocks; PENDING FABLE
REVIEW lines unchanged in every file. The applier's only notes are the three expected "DUPLICATE ID inserted" notes of the restated rows
(J-A81.41 in Part A; J-A121.02 in the index; J-A68.85, J-A68.89, J-A68.90 in Part A), each settled by its NOTE FOR ASSEMBLE below.

**The base seats' stand-alone dry runs, reproduced** (`handoff.py`, `handoff.json` → `checks.alone`; each seat's blocks alone on the
untouched base and rationale): determinism 10/10, base `6f7048f1a2f9f949…` = recorded; kernel 1/1, base `2ecdccd9…` = recorded, rationale
unchanged; model 3/3, 22 731 → 22 781 lines = recorded, rationale byte-identical; pipeline 8/8, 22 731 → 22 788 lines, then its swap
"J-A81.41: l. 639 <- l. 852", Part A 805 = recorded; rendering 16/16, then its swap "J-A121.02: l. 22706 <- l. 22714", Part A J-A68.85,
J-A68.89, J-A68.90 at l. 685, 689, 772 ← l. 852, index 805, Part A 805 = recorded; scope 6/6, audit 0, headings 153 → 153, rationale
untouched = recorded. All six equal their records.

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents (base 153, INDEX 9,
V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67, each unchanged). The numbered targets the
resolver reads are unchanged (section 5); the defined ids go from 3 465 to 3 467 (V08's new `T-V8-63` and `J-V8.137`).

**RULING REQUEST blocks — 0.** No repair-r4 file carries one (ROUND-4 NOTES (2)), so none is listed or skipped; no `=== ` header line of
any kind and no "RULING REQUEST" text is present in any live file after installation.

### 2.1 NOTES FOR ASSEMBLE — the scripted hand-offs (`handoff.py`, `handoff.json`)

The census of the eighteen headers (every line naming Assemble or the assembler, a swap, a title block, a restated row or a proposed allow
row) finds three notes addressed to Assemble; ROUND-4 NOTES (9) (a) has each applied mechanically as written and listed here. The two
swaps run on a copy of the applied text (`asm4/out` → `asm4/final`; `out/` stays the "new" copy of the three-copy method); they and the
allow rows of section 6 are the only changes outside the blocks.

1. **Pipeline, NOTE FOR ASSEMBLE** — "The RATIONALE-A block's row restates J-A81.41's Part A entry (its judgment-index row is unchanged).
   After every block file is applied, run `python3 docs/validation/coherence/work/repair-pipeline-r4/swap_restated.py RATIONALE_IN
   RATIONALE_OUT` — the appended row takes the older row's place (rationale l. 639 on the live file) and the older row is deleted; it stops
   unless J-A81.41 occurs exactly twice in Part A. Independent of any other seat's swap." Run unchanged. Result: J-A81.41 l. 639 ← l. 852.
2. **Rendering, NOTE FOR ASSEMBLE** — "The J-ROWS block restates the judgment-index row of J-A121.02 and the RATIONALE-A block the Part A
   entries of J-A68.85, J-A68.89 and J-A68.90 (VCS-r3-07: 'reference view' → 'reference viewport'; nothing else changes). After the blocks
   apply, each appended row takes its older row's place and the older row is deleted: `python3 work/repair-rendering-r4/swap_restated.py
   BASE RATIONALE BASE_OUT RATIONALE_OUT`." Run unchanged, after pipeline's (the two touch disjoint ids, and each replaces in place and
   deletes the appended row, so the order changes nothing). Result: index J-A121.02 l. 22860 ← l. 22868 (its older row's line l. 22657 in
   the untouched base, moved only by the base REPLACE blocks above it); Part A J-A68.85 l. 685, J-A68.89 l. 689, J-A68.90 l. 772, each
   ← l. 852.
   After the two: **the judgment index 805 rows = Part A 805 rows** (805 each before), one id set, no duplicate in either, no id added or
   removed, both orders unchanged; each restated id stands on its older row's line carrying the block's row (asserted: the old row differed,
   the final row equals the block's); the rationale differs from the untouched one on exactly four lines (639, 685, 689, 772). Each
   script stops unless its ids occur exactly twice; neither stopped.
3. **Scope, NOTE FOR ASSEMBLE** — one proposed allow row (C3 `1 2 3 4 6 7 8 9`); with **rendering's** "Proposed allow rows" list (S2
   `§5.15`, C3 `layer that is not the`, C3 `it at the view s`) it is reviewed and written in section 6.

No other header addresses Assemble: every volume unit records "title block untouched / unchanged", and no volume seat proposes an allow
row. The headers' HAND-OFFS lists (for instance rendering's "reference view(s)" sites in §13.8's T121-3 and V12, V08 §5.4 (2)'s bridge form
and pipeline's §10.2 (d) phrase; model's and determinism's notes on §5.4's warning codes; V07's and V11's notes on texts landing in this
same assemble; V11's on V12 §2.13's B-CITY cell) are addressed to round 5's verifiers, not to Assemble, and stand in the repair files.

## 3. The rationale

Pipeline's RATIONALE-A block appended one restated Part A entry (J-A81.41); rendering's appended three (J-A68.85, J-A68.89, J-A68.90) and
its J-ROWS block one restated index row (J-A121.02). After the two swaps (section 2.1): `docs/ARCHITECTURE-RATIONALE.md` 704 669 →
704 770 bytes, 119 102 → 119 120 words; Part A and the index both hold 805 entries with one id set and no duplicate. No other block routes
to the rationale; each volume run's throwaway rationale output is byte-identical to its input.

## 4. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|
| base | 2 974 590 | 3 003 627 | +1.0 % | 481 868 | 486 772 | +1.0 % | 2904.9 → 2933.2 |
| V01 | 523 442 | 526 767 | +0.6 % | 85 852 | 86 439 | +0.7 % | 511.2 → 514.4 |
| V02 | 561 207 | 563 512 | +0.4 % | 93 940 | 94 303 | +0.4 % | 548.1 → 550.3 |
| V03 | 464 396 | 466 833 | +0.5 % | 78 943 | 79 334 | +0.5 % | 453.5 → 455.9 |
| V04 | 520 064 | 527 003 | +1.3 % | 84 623 | 85 761 | +1.3 % | 507.9 → 514.7 |
| V05 | 398 194 | 401 398 | +0.8 % | 67 249 | 67 808 | +0.8 % | 388.9 → 392.0 |
| V06 | 680 177 | 691 243 | +1.6 % | 111 109 | 112 989 | +1.7 % | 664.2 → 675.0 |
| V07 | 603 780 | 605 033 | +0.2 % | 99 932 | 100 120 | +0.2 % | 589.6 → 590.9 |
| V08 | 559 089 | 572 529 | +2.4 % | 88 612 | 90 869 | +2.5 % | 546.0 → 559.1 |
| V09 | 749 608 | 760 527 | +1.5 % | 123 687 | 125 515 | +1.5 % | 732.0 → 742.7 |
| V10 | 510 631 | 515 733 | +1.0 % | 82 629 | 83 453 | +1.0 % | 498.7 → 503.6 |
| V11 | 674 664 | 678 595 | +0.6 % | 112 787 | 113 399 | +0.5 % | 658.9 → 662.7 |
| V12 | 519 356 | 522 516 | +0.6 % | 84 312 | 84 760 | +0.5 % | 507.2 → 510.3 |
| INDEX | 24 074 | 24 074 | 0.0 % | 4 054 | 4 054 | 0.0 % | 23.5 → 23.5 |
| rationale | 704 669 | 704 770 | +0.0 % | 119 102 | 119 120 | +0.0 % | 688.2 → 688.3 |
| **base + volumes** | 9 739 198 | 9 835 316 | +1.0 % | 1 595 543 | 1 611 522 | +1.0 % | 9510.9 → 9604.8 |
| **volumes** | 6 764 608 | 6 831 689 | +1.0 % | 1 113 675 | 1 124 750 | +1.0 % | 6606.1 → 6671.6 |
| **base + volumes + INDEX** | 9 763 272 | 9 859 390 | +1.0 % | 1 599 597 | 1 615 576 | +1.0 % | 9534.4 → 9628.3 |

(Words: whitespace-split, as rounds 0–3 counted them; a seat's `wc -w` figure can differ by a few.) Every changed unit grows a little: this
round repairs round 3's findings and writes the END lines of adjudication-r4's Part H — the rulings' new cases, readers, fixtures and bars,
and both ends of cross-unit fixes — and the assembler may not compress text; each repair file states its words by source and what holds
its growth. Against the shrink goal's band (25–40 % fewer words than the pre-coherence archive, 1 491 685 words for base and volumes), the
set now stands at 1 611 522 words (+8.0 % against the archive). No unit shrank by more than half (none shrank in words). Duplicate id
definitions across the set (principle (4); the judgment index, Part A, D-n, T-ER, every volume's T-Vn-m and J-Vn.m rows, `_integrate.md`'s
J-VI rows): **none** (`sizes.py`).

## 5. References

assemble-r0's resolver (`refs.py`, citation form canon S7: a bare `§x` is the base's, a volume's section `Vnn §x` everywhere), unchanged
but for its root, run on two mirror trees (`mirror.sh`): the untouched set and the final set, each with `_integrate.md`, files f and g,
`research/` and `docs/volumes/critique/` linked in. Every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…`,
lines read joined, against the headings and ids that now exist (numbered targets, unchanged by the round: base 147, V01 121, V02 99, V03 53,
V04 66, V05 60, V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8; 3 467 defined ids, up from 3 465). All eighteen files
and the two swaps were applied before the run (ROUND-4 NOTES (9) (b)), so every cross-unit citation of Part H's END lines is read with
both its ends in.

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 54 980 | 55 663 | the target exists |
| external | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 80 | 84 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` only one volume of its list has — the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 55 198 | 55 885 | |

**Broken: 0** (before and after). **Mechanical fixes: 0**: the resolver found no reference of class FIX, and no repair file records a
renumbering (no heading moved; section 2), so `fixrefs.py` changed nothing (`fixrefs.json` empty, `ref-fixes.tsv` header only).
**Ambiguous form: 84** (from 80), listed in `ambiguous-refs.tsv` (unit, line, reference, the list's head volume, context): base 14, V01 15,
V02 13, V03 12, V04 1, V05 3, V06 5, V09 7, V10 5, V11 7, V12 2 — each resolves under S7 as the base's; the verifier confirms each or
prefixes it. The four new ones sit in this round's text, none left the set: base l. 2597 `§3.2` ("… a frame growth's extension of its
deck, §3.2 (9))", after a V06 list), V06 l. 4462 and l. 4488 `§2.7` ("(§2.7's support step (3)" after a V06 list), V11 l. 1006 `§4.3`
("V01 §3.17.3 (3), §4.3; S8 cuts the under-deck strip …"). **External: 131** (bare 120, bare-cont 1, J 10), listed in
`external-refs.tsv`.

## 6. Document checks (three-copy method, one corpus snapshot)

`python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with `docs/validation/doc-checks-allow.tsv`, on three
copies against one corpus snapshot (`checks.py`): **untouched** (the live base before this round, sha256 `593c657d…`), **new** (the blocks
applied, before the swaps, `2370248e…`) and **combined** (the installed text, `5f34cceb…`; it differs from new only by the restated index
row J-A121.02: the block's row on the older row's line, the appended copy removed). Two key sets: (a) the 34 top-level heading keys `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.7,PART
III,Delegated decisions,Judgment calls,Staged,Appendix A` — the brief's command; the parent keys span their children, so their C3 and C4
hits count twice — and (b) the eight `#` keys, which partition the document. The corpus fingerprint (path, size and mtime of the 128 files
doc_checks reads) is equal before and after every run (`b2f7e5c5fd256d59…`).

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon,
research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the
corpus before any freeze". Every count below is PROVISIONAL (ROUND-4 NOTES (6)).

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 1 / 0 | 3254 / 0 | 12 / 0 | 0 / 0 | 251 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1683 / 0 | 6 / 0 | 0 / 0 | 251 / 0 | **0** |
| new (a) | first | 5 / 0 | 1 / 0 | 3256 / 6 | 12 / 0 | 0 / 0 | 272 / 1 | 1 |
| new (b) | first | 5 / 0 | 1 / 0 | 1684 / 3 | 6 / 0 | 0 / 0 | 272 / 1 | 1 |
| combined (a) | first | 5 / 0 | 1 / 0 | 3256 / 6 | 12 / 0 | 0 / 0 | 272 / 1 | 1 |
| combined (b) | first | 5 / 0 | 1 / 0 | 1684 / 3 | 6 / 0 | 0 / 0 | 272 / 1 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3254 / 0 | 12 / 0 | 0 / 0 | 251 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1683 / 0 | 6 / 0 | 0 / 0 | 251 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3256 / 0 | 12 / 0 | 0 / 0 | 272 / 0 | **0** |
| new (b) | final | 5 / 0 | 1 / 0 | 1684 / 0 | 6 / 0 | 0 / 0 | 272 / 0 | **0** |
| **combined** (a) | final | 5 / 0 | 1 / 0 | 3256 / 0 | 12 / 0 | 0 / 0 | 272 / 0 | **0** |
| **combined** (b) | final | 5 / 0 | 1 / 0 | 1684 / 0 | 6 / 0 | 0 / 0 | 272 / 0 | **0** |

(hits / unreviewed.) The combined document's final run exits 0 on both key sets, and again under `PYTHONHASHSEED` 0, 1, 2 and 12345 (the
same counts); its total over the 34 keys is **3 546 hits** (C1 5, C2 1, C3 3256, C4 12, S1 0, S2 272), 0 unreviewed. The untouched copy is
round 3's clean state (exit 0 before and after). Of the 21 new S2 hits, 20 are matched by rows the allow file already holds.

* **Corrected: none** (no S1 table fault, no mechanical hit).
* **The four unreviewed hits** (distinct; the (a) set counts the three C3 runs twice through their parent keys), each attributed by
  `attrib.py` (`c3-attribution.tsv`): new text of the proposing seat's block, absent from the untouched base, held whole by no corpus file
  (each C3 run a chain of 3-grams meeting the corpus by chance), and each proposed by that seat — and each read in context by this seat:
  * C3 `1 2 3 4 6 7 8 9` — final base l. 261, §0.2's item-122 row "volumes 1, 2, 3, 4, 6, 7, 8, 9, 10, 11 and 12" (repair-r4-scope; the
    reviewed run `1 2 3 6 7 8 9` of assemble-r2's row with volume 4 added): volume numbers.
  * C3 `layer that is not the` — final base l. 14798 – 14799, §9.2's candidate set ("a hidden underground or sky layer that is / not the
    working layer", repair-r4-rendering): ordinary English.
  * C3 `it at the view s` — final base l. 16325, §11.2's `LooksAnswer.crises[].over` comment ("whether this disaster look stands over it at
    the view's week", repair-r4-rendering): ordinary English.
  * S2 `§5.15` — final base l. 16228, §11.2's `ExportOpts.links` comment "GeoJSON (V09 §5.15)": a volume-prefixed pointer; its one
    occurrence in the base carries the prefix `V09` (checked by script), S2 reads the base's headings only, and the resolver resolves it in
    V09 (`### 5.15 Every new thing: drawn, labelled, exported, persisted`).
  No list, table, grammar, palette or identifier in any: false positives.
* **Reviewed allow rows: 4**, one block `# block: coherence/assemble-r4` appended by `allowrows.py` (append only; it stops unless each hit
  is attributed as above, and for S2 unless every occurrence carries its volume prefix). The allow file: 2 320 → 2 325 lines (header and
  four rows), sha256 `cc5afc8b…` → `c1bc497a…`, its first 2 320 lines byte-identical. **Allow rows not dropped**: as in rounds 0–3, with
  an incomplete corpus a row matching nothing here may still be needed on the machine that holds the corpus, and the file is shared, so
  this seat only appends; a kept row hides no new hit (review is by exact text).
* **Volume information runs** (`volchecks.sh`: each volume and INDEX, whole document, `--heads` the matching base, untouched against
  installed; `volchecks-final.txt`): volume runs carry hundreds of unreviewed runs from before this pass and are not held to exit 0 (as in
  rounds 0–3). The installed volumes add 16 new distinct unreviewed pairs, all C3 runs of this round's block text (section-pointer digits
  or ordinary words), each the run its seat's header reports: V01 4 (`5 4 1 3 6`, `5 4 1 and 3`, `and of the model the`, `s at the view
  s`), V02 1 (`5 7 8 and the`), V04 1 (`re read in the same`), V06 3 (`3 5 1 1 the`, `3 6 4 and every`, `3 7 6 5 2 7`), V09 6 (`4 2 8 4
  the live`, `5 6 4 the plan`, `and for a building a`, `and for a building the`, `it 4 3 2 7`, `never the ground storey s`), V11 1 (`s 2 7 4
  6 s8`); V03, V05, V07, V08, V10, V12 and INDEX 0. No volume seat proposed a row, so none is appended; they are listed for those
  volumes' seats or the close.
* **The rationale (information; not held to exit 0):** C3 494 / 321 unreviewed before, 493 / 320 after (one old run, "view and a far
  field", left with rendering's restated Part A wording, "reference view" → "reference viewport"; none added); S2 17 / 15 before and after (`--heads` the base).

## 7. Bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md` (71 346 lines from 14 sources; 9 784 744 → 9 880 862 bytes,
sha256 `61d107d7…` → `acee60dc5e654286…`); `--check` reports it UP TO DATE (exit 0).

## 8. Review ids in design text (ROUND-4 NOTES (9) (c))

`reviewids.py` counts, in the live base, volumes and INDEX, the citations of review-process ids — the rulings `R<n>-nn` and every issue,
conflict, wiring or inventory id the coherence pass's own records define (`verify-*.md`, `adjudication-r*.md` — adjudication-r4
included —, `inventory-*.md`, canon, agreement, edges, wiring; 8 623 tokens), less any token the design itself defines and the design id
families — outside the decision and request records (base: *Delegated decisions*, *Judgment calls*; volumes: §9 Decisions, §10 Base change
requests, §13 Fix list, Integration notes; anywhere: a J-, BCR-, X- or CVR- row). One design name is excluded by hand: `M4-110`, V12
§3.9.1's named panel group (J-V12.45). Read-only: nothing was edited; the verifiers raise the sites.

**Design-text sites: 4** (14 in the untouched set: base 8, V05 2, V09 4). This round's blocks removed 10 (base 6 — DWG-01, DIC-02, DWG-02,
MC-11 twice, V12-XCONF-2 —, V09 4 — V09-XAGREE-1, V06-AGREE-1, V09-ICONF-4 twice) and added none. **No `R2-nn` / `R3-nn` / `R4-nn` ruling
id and no verifier issue id stands in design text** (a direct grep finds the four `R2-nn` tokens of the set only in V09's §13 Fix list
and Integration notes records). The 4 left are canon conflict and inventory ids, present before this round:

| unit | line | id | context |
|---|---:|---|---|
| base | 6784 | DXC-06, KXC-02 | §4 plot rules: "… without values; DXC-06, KXC-02).** Every plot: `minPlotWidth` 2.5 m …" |
| V05 | 313 | MC-07 | V05 §2: "(file f item 251; MC-07: the island arena's own ring, no stored position)" |
| V05 | 685 | MC-05 | V05 §2 table: "`ContextVector.arena 'sky'` (§2.5, file f item 213; MC-05)" |

Inside the records 25 citations stand, kept as records (V03 9, V09 15, V10 1). Full lists: `reviewids-final.tsv` and
`reviewids-untouched.tsv`.

## 9. Not placed, and left for the verifier

* **Unplaced: nothing.** Every block of the eighteen files is applied and every NOTE FOR ASSEMBLE is applied as written; no RULING
  REQUEST exists this round; no double REPLACE, so no merge conflict and no lost hunk.
* **Broken references: 0** (section 5); no mechanical fix was needed.
* **84 ambiguous-form references** (section 5, `ambiguous-refs.tsv`; 4 new): read as the base's under S7; the verifier confirms each or
  prefixes it.
* **4 review-id sites in design text** (section 8): canon conflict and inventory ids, all from before this round; for the verifiers
  under R3-02 (not edited here, as the brief directs).
* **Hand-offs between units** that the repair files record for round 5's verifiers (each header's HAND-OFFS list) are not assembly work.
* **Volume document checks:** 16 new volume hits without a proposed row (section 6, `volchecks-final.txt`) — for those volumes' seats or
  the close.
* **The document checks are provisional** (section 6): re-run them on the machine that holds the reference corpus; the four base rows
  were reviewed against this checkout's smaller corpus.
* **Size:** the set at +8.0 % words against the pre-coherence archive, outside the shrink band (section 4); each repair file states what
  holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the 15 live files' sha256 before (each equal to its HEAD blob at `96bdae26`) and after (each equal to its final
copy); the eighteen repair files landed and committed; the routing of 189 blocks and the census (0 missing, 0 ambiguous, 0 unclosed, 0
RULING REQUEST, 0 overlap, 0 double REPLACE); 189 applied with audit not-OK 0 and balanced fences in every file; ten volume outputs equal
to their seats' recorded sha256 and V10 to its recorded line count; the six base seats' stand-alone dry runs reproduced; the two swaps by
the seats' own scripts (805 = 805, one id set, no duplicate, each restated row on its older row's line carrying the block's row, the
rationale changed on four lines only); no heading added, removed or retitled; the reference counts of section 5 with 0 broken and 0
fixes; the document checks' counts of section 6, exit 0 on every copy and key set and under four hash seeds, one corpus snapshot; the allow
file appended only; the bundle regenerated and `--check` clean; the sizes of section 4; no duplicate id definition; the review-id census
of section 8.
**PLAUSIBLE:** that the four reviewed rows are false positives (attributed by script, read in context by this seat, each proposed by the
seat that wrote the text; no second reader); that V09's output equals its generator's (the seat records no hash; its 12 blocks applied
with audit 0, as its header records); that the ambiguous-form references read as their authors meant (S7 reads them as the base's; not
checked one by one); and that the review-id census's token set is complete (it reads the ids the coherence records define as headings,
first table cells or bold labels, plus the `R<n>-nn` rulings; an id cited only in running text of a record would be missed).
