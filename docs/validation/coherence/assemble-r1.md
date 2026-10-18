# Assemble — coherence pass, round 1 (the eighteen repair-r1 block files applied to the base, the volumes, INDEX and the rationale)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r1 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r1`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob); untouched snapshot — done
- P2 block inventory and routing (18 files, 308 blocks, 3 RULING REQUEST, 0 missing heading, 0 double REPLACE) — done
- P3 apply (305 applied, 3 skipped = the RULING REQUESTs, audit not-OK 0), the scripted hand-offs (J-A73.06 swap; three title-block range widenings), install (15 of 15) — done
- P4 references: 49 788 checked, 0 broken, 0 mechanical fixes needed, 82 ambiguous-form listed — done
- P5 document checks, three-copy method: 55 reviewed base rows, exit 0 on every copy and key set; the volume seats' 73 proposed rows (+1 correction) — done
- P6 bundle and `--check` — done
- P7 this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r1/` (`snapshot.py`, `route.py`,
`apply.py` — which runs `docs/validation/amendments-b/apply-blocks.py` unchanged —, `handoff.py`, `install.py`, `mirror.sh` with
assemble-r0's `refs.py` (root parameterised), `refsreport.py`, `checks.py`, `attrib.py`, `allowrows.py`, `volchecks.sh`, `volrows.py`,
`sizes.py`, `unitsizes.py`, `report.py`); no live text was hand-edited. Their records sit beside them (`snapshot.json`, `blocks.json`,
`split/`, `logs/`, `apply.json`, `handoff.json`, `install.json`, `refs-summary.json`, `ambiguous-refs.tsv`, `external-refs.tsv`,
`checks.json`, `c3-attribution.tsv`, `vol-attribution.tsv`, `volrows.json`, `volchecks-final.txt`, `sizes.json`, `unitsizes.json`).

## Outcome

All eighteen repair files are applied: **308 blocks found, 305 applied, 3 skipped** — the three
RULING REQUEST blocks (V07 VV78-21, V10 VAT-20, determinism VDC0-33), which `apply-blocks.py` reads as MALFORMED headers and skips
with their text (confirmed: no `=== ` line and no request text reaches a live file). No heading was missing, none ambiguous, no block
truncated, and no two blocks REPLACE one heading, so no three-way merge was needed. The audit finds every applied body exactly once,
fences balanced in every file, and every output byte-identical to the result each repair seat recorded for its own dry run (V01, V02,
V04, V05, V06, V07, V10, V11, V12 state a hash; all match). Two scripted hand-offs the repair files address to the assembler follow:
scope's restated Part A row J-A73.06 swapped into its older row's place (Part A 788 rows = the judgment index's 788, no duplicate id),
and the one-token range widening '119' → '120' in the title blocks of V10, V11 and V12, each asked for by that volume's own repair.
**Nothing is unplaced.** The set (base and volumes) goes from 8 368.9 KB to 8 810.3 KB (+5.3 % bytes,
+5.3 % words): the repairs add design (owner items 114–120 at build depth, the round-0 findings' fixes) and
remove little. Of 49 788 references checked, **none is broken** (round 0's one broken pointer, PART III's "V07 §15", is
gone with pipeline's PART III block), none needs a mechanical fix, and 82 resolve but are ambiguous in form
(down from 456). The document checks exit 0 on the untouched, new and combined copies over every top-level key and over the eight `#`
keys, against one corpus snapshot, after 55 reviewed allow rows — **provisional**, because the reference corpus is incomplete in this
checkout; the combined document's total is 3 403 hits, 0 unreviewed. The bundle `docs/ARCHITECTURE-FULL.md` is regenerated and
`--check` passes.

## 1. Live files — sha256 before and after

Before: the committed text at HEAD `3f0e02b2d7b9` (each live file equal to its HEAD blob; the base's sha256 is the design sha
`484af066…` the repairs were written against). After: written by `install.py`, guarded on each live file still holding its P1 sha256,
each verified byte-identical to its final copy.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 2 615 627 | 2 787 468 | `484af066f0115b1d19ba3a44af4388c9e069e90eb7630ad6ee218476c9b59173` | `137ecc0e4fe12c4408eacf842770d1c428e5031cd8faad18e0a3f37b57d7d9b5` |
| `docs/ARCHITECTURE-RATIONALE.md` | 685 208 | 688 889 | `adebaafcfd89def12553256f75108264cffe35a93a9b71c9318ff1989a440564` | `630da95935076a85bca38148d5c07208f6e3bf61c9648eefb15967351a8a2928` |
| `docs/volumes/V01-neighbourhoods.md` | 464 158 | 492 604 | `8ced48409fb352ce54c62113e09d52cbcf28b09c0b8000e10066b88d40f009d8` | `1480993bec654309ab5bddc9186d5d0fc9d67d912d4dbdf08e95668161c826de` |
| `docs/volumes/V02-buildings.md` | 494 200 | 513 788 | `2eeb80e045fd1a928a0e90b190bb75b4c20a58a157349024e72a5892af11676a` | `a11f04ccc93d0fcefbef0e58fd633b75a237db3ee1ed2186daf7f15534980a6d` |
| `docs/volumes/V03-interiors.md` | 388 143 | 413 070 | `23cc83c40b021f207817cd889b8de98140d823ee214395f78720c37a4ca02418` | `eda87a1c8cf0e84bca1431d21b30a948c4f35bddbc95c7cf2e25e2f4b009baeb` |
| `docs/volumes/V04-underground.md` | 460 463 | 488 215 | `5de75b277413666f7171ddf65c70e0c0608cafa6ae1cfca87317938c04e21caf` | `47c144776d2085a0bbc3b0f1c4dc89dfd4411dfef3d0faa9f9c035611a1ae856` |
| `docs/volumes/V05-sky.md` | 360 317 | 394 900 | `1326b372a0f6783705b3705c60108902a1e14e9dda190b6bf550d3dad203394f` | `b5f310b6269b2897d64e5688bab5415faaa691b88cfd62770d5f9a7945c4a84a` |
| `docs/volumes/V06-evolution.md` | 593 982 | 629 860 | `b0d5102f368752dc0f28e352599753eece2e6bb6401e51a70a52a9d332319535` | `771887caa2d6ff6c8d815dc8200d0dd474c85e82f23f33d16ec05448922c88a3` |
| `docs/volumes/V07-village.md` | 561 556 | 580 760 | `4c802a4660cfb3ed63dda1c2c1bc1a5d22a17b107088ca6e23c59ad23a839ef8` | `02f8dbb439bce4ae73e010022fc29a93e71f3e8944e0a6b3fbf8df01c8e2d6f8` |
| `docs/volumes/V08-settlementforge.md` | 489 825 | 505 231 | `5a91bfa890058f8ac00e9e34fa971a37067fc3a96ee90fa92622e7c8ee37f46e` | `b96e79d8a7d84deb5c04fce37bd5cbb29e606f104d0ca9d14488f6b0b46df2d2` |
| `docs/volumes/V09-application.md` | 635 793 | 659 614 | `c63e7235cd37aa6e4096699ecd3486525997bc018558cad0a4c97af9f33b7051` | `c2dc5b806ac1fedf542478dfea7bfd2967c7bf63037448496fd301b0a147fe94` |
| `docs/volumes/V10-clerk.md` | 466 617 | 476 312 | `f6bbead79b5ed17788b8c27dfd152e475fd4e5fb407e01cf661bbebdcd209192` | `f8f591b329d79c6f8cf5bec915aeed5f5f56a59b9b0a7b4b20c1ffaff60eff29` |
| `docs/volumes/V11-content.md` | 608 701 | 626 514 | `3e4febee75c66eb17c600c26b1dc5568477596fd2bcd39df120927d4b02f4a45` | `9481453bcd0fd7577c4d0ac5b9766587adc01316a433c7ddce123ebf2539549d` |
| `docs/volumes/V12-calibration.md` | 430 397 | 453 363 | `70d691f5152b5a6078128856bea49ece640a6bba1180a1f2725cf4c675db679b` | `996dee3b5baba28b5658b300f85c0550adb5d798a00f353e28c51f4e755d6fa4` |
| `docs/volumes/INDEX.md` | 25 407 | 23 960 | `49e81c84134e0840e28b401d272894d466df416f8f05ea6e8ec59788fab20615` | `9efc19e34883b52103ee7614578339544676ba8c17c45c9e9ecebd44d4927d8a` |

## 2. Blocks — routing, application, audit

**Routing** (`route.py`). Each `repair-r1-<unit>.md` was cut at its `=== FILE <path> ===` lines; every block went to the file its
nearest FILE line above names, the base when none (13 FILE lines: one per volume file, and scope's INDEX.md after its base blocks).
The split block files keep their repair file's basename, so `apply-blocks.py` applies them in the round's name order (V01 … V12,
determinism, kernel, model, pipeline, rendering, scope); the FILE lines are left out (routing, not blocks) and every other line is
verbatim, the RULING REQUEST blocks included, so the applier's own rule is seen to skip them. The base ran with the rationale; each
volume and INDEX with a throwaway rationale whose output equals its input (no J-ROWS or RATIONALE-A block routes to them).

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed; overlaps: one, inside one
unit — V03 #16 REPLACE `### 5.2 Picture exports` and V03 #23 APPEND TO SECTION `## 5 Rendering, labels, exports`, applied in order
(the APPEND lands after §5.4 as the new §5.5; V03's own two-pass dry run did the same). **No double REPLACE**, so the brief's
`git merge-file` step had nothing to merge and no conflict to report.

| unit | blocks found | applied | skipped (reason) | target | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|
| V01 | 34 | 34 | 0 | `V01-neighbourhoods.md` | 46 278 → 49 416 (+6.8 %) | 275.4 → 294.0 |
| V02 | 1 | 1 | 0 | `V02-buildings.md` | 82 668 → 85 913 (+3.9 %) | 482.6 → 501.7 |
| V03 | 23 | 23 | 0 | `V03-interiors.md` | 50 387 → 54 619 (+8.4 %) | 289.8 → 314.1 |
| V04 | 1 | 1 | 0 | `V04-underground.md` | 74 624 → 79 203 (+6.1 %) | 449.7 → 476.8 |
| V05 | 1 | 1 | 0 | `V05-sky.md` | 60 743 → 66 710 (+9.8 %) | 351.9 → 385.6 |
| V06 | 1 | 1 | 0 | `V06-evolution.md` | 96 675 → 102 706 (+6.2 %) | 580.1 → 615.1 |
| V07 | 2 | 1 | 1 — #2 RULING REQUEST VV78-21, never applied | `V07-village.md` | 92 729 → 96 143 (+3.7 %) | 548.4 → 567.1 |
| V08 | 1 | 1 | 0 | `V08-settlementforge.md` | 77 159 → 79 800 (+3.4 %) | 478.3 → 493.4 |
| V09 | 56 | 56 | 0 | `V09-application.md` | 90 896 → 94 566 (+4.0 %) | 532.4 → 555.7 |
| V10 | 41 | 40 | 1 — #41 RULING REQUEST VAT-20, never applied | `V10-clerk.md` | 65 825 → 67 751 (+2.9 %) | 400.6 → 410.0 |
| V11 | 29 | 29 | 0 | `V11-content.md` | 80 470 → 83 289 (+3.5 %) | 469.4 → 486.8 |
| V12 | 25 | 25 | 0 | `V12-calibration.md` | 50 565 → 54 276 (+7.3 %) | 299.4 → 321.8 |
| determinism | 14 | 13 | 1 — #14 RULING REQUEST VDC0-33, never applied | `ARCHITECTURE.md` | 62 568 → 66 244 (+5.9 %) | 381.6 → 404.2 |
| kernel | 5 | 5 | 0 | `ARCHITECTURE.md` | 14 494 → 14 561 (+0.5 %) | 87.4 → 87.9 |
| model | 9 | 9 | 0 | `ARCHITECTURE.md` | 54 002 → 58 351 (+8.1 %) | 334.7 → 361.6 |
| pipeline | 26 | 26 | 0 | `ARCHITECTURE.md` | 101 399 → 107 019 (+5.5 %) | 620.5 → 654.5 |
| rendering | 20 | 20 | 0 | `ARCHITECTURE.md` | 66 931 → 77 116 (+15.2 %) | 390.3 → 450.6 |
| scope | 19 | 19 | 0 | `ARCHITECTURE.md`, `INDEX.md` | 82 570 → 87 309 (+5.7 %) | 493.1 → 521.0 |
| **total** | **308** | **305** | **3** | | | |

"Covered text": a REPLACE's section in the untouched file against the section of its body's heading in the installed file (a
level-1 REPLACE of a volume's title — V02, V04, V05, V06, V07, V08 — is the whole volume); an APPEND counts its body; J-ROWS and
RATIONALE-A count their rows. Scope covers the base's title block to §0, §1.1, §13.1–§13.5, §13.7–§13.9, §14, §15.1, §16, Delegated
decisions, Judgment calls, Appendix A, its index and Part A rows, and INDEX.md (whole file).

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines before → after | output sha256 (16) |
|---|---:|---:|---:|---|---|---|
| `ARCHITECTURE.md` | 92 | 91 | 1 | 153 → 153 | 132 → 140 (balanced) | `137ecc0e4fe12c44` |
| `INDEX.md` | 1 | 1 | 0 | 9 → 9 | 2 → 2 (balanced) | `9efc19e34883b521` |
| `V01-neighbourhoods.md` | 34 | 34 | 0 | 122 → 123 | 14 → 14 (balanced) | `1480993bec654309` |
| `V02-buildings.md` | 1 | 1 | 0 | 73 → 73 | 14 → 14 (balanced) | `a11f04ccc93d0fce` |
| `V03-interiors.md` | 23 | 23 | 0 | 46 → 47 | 12 → 12 (balanced) | `eda87a1c8cf0e84b` |
| `V04-underground.md` | 1 | 1 | 0 | 58 → 58 | 12 → 12 (balanced) | `47c144776d2085a0` |
| `V05-sky.md` | 1 | 1 | 0 | 61 → 62 | 14 → 14 (balanced) | `b5f310b6269b2897` |
| `V06-evolution.md` | 1 | 1 | 0 | 63 → 63 | 26 → 26 (balanced) | `771887caa2d6ff6c` |
| `V07-village.md` | 2 | 1 | 1 | 56 → 57 | 14 → 16 (balanced) | `02f8dbb439bce4ae` |
| `V08-settlementforge.md` | 1 | 1 | 0 | 63 → 63 | 20 → 20 (balanced) | `b96e79d8a7d84deb` |
| `V09-application.md` | 56 | 56 | 0 | 110 → 110 | 24 → 24 (balanced) | `c2dc5b806ac1fedf` |
| `V10-clerk.md` | 41 | 40 | 1 | 86 → 86 | 24 → 24 (balanced) | `887b1031b59d114a` |
| `V11-content.md` | 29 | 29 | 0 | 58 → 58 | 22 → 22 (balanced) | `7f3ee85ebbddb200` |
| `V12-calibration.md` | 25 | 25 | 0 | 67 → 67 | 30 → 30 (balanced) | `a5e98d8add156a46` |

Audit (each run): every applied body found exactly once in the output, not-OK 0. Notes, all expected and named by their repair
files: the base's title retitled by scope (VCS-17: "… and the hooks the village product (volume 7) builds on"; `bundle_architecture.py`,
`doc_checks.py` and the resolver key on the "ARCHITECTURE" prefix or on other headings, so none needs to follow it), §0.2 retitled
(item ranges) and §12.10 retitled ("(E-18)" dropped, VRC0S-16); V07 §3.5a, V08 §3.16, V10 §3.9a and §3.9b, V12 §3.15 retitled with
their numbers kept; new headings V01 §5.4, V03 §5.5, V05 §5.6, V07 §5.5 (item 120's Find); the J-ROWS / RATIONALE-A note "DUPLICATE
ID inserted: J-A73.06" (scope's restated row, swapped below). Recorded seat hashes matched: V01 `1480993b…`, V02 `a11f04cc…`, V04
`47c14477…`, V05 `b5f310b6…`, V06 `771887ca…`, V07 `02f8dbb4…`, V10 `887b1031…`, V11 `7f3ee85e…`, V12 `a5e98d8a…` (before the
title-block hand-off below, which changes V10, V11 and V12 by one token each).

**RULING REQUEST blocks — 3, never applied** (addressed to the adjudicator; `apply-blocks.py` reports each "malformed `=== ` header
line; its text skipped"; the first line of each request's text is absent from its live target):

| unit | issue id | repair file line | first line of the reason |
|---|---|---:|---|
| V07 | VV78-21 | 4049 | Requested ruling: INVALID — rule V07-RESTATE-1 INVALID under item 202's applied text (an f item over a base home, principle |
| V10 | VAT-20 | 3041 | Issue VAT-20 (minor, owner V10) is fixed in text but for one clause, its rung clause: "The `rule` row drops 'the rung' … |
| determinism | VDC0-33 | 2693 | Requested ruling: INVALID for unit determinism (its required change cannot be made without breaking another round-0 |

**Scripted hand-offs** (`handoff.py`, `handoff.json`) — the only changes outside the blocks, each addressed to the assembler by the
repair file that owns the text, each count-asserted:
1. **Scope's note (1):** RATIONALE-A's J-A73.06 restates the existing Part A entry (VCS-15); the appended row (rationale l. 835)
   replaces the older row in place (l. 791) and is deleted from the end — the precedent of amendments-b/-c's assemblers
   (`swap_restated`). The script stops unless the duplicate ids are exactly {J-A73.06} in Part A and none in the judgment index (whose
   row scope's REPLACE changes in place). Result: Part A 788 rows, index 788 rows, the same id set, no duplicate.
2. **Title-block range widenings** (the level-1 subsection a REPLACE reaches only by replacing the whole volume), each old string
   exactly once above the volume's first `## ` heading:
   * `docs/volumes/V10-clerk.md` l. 12: "items 1–119 the owner's instructions and file g's rules" → "items 1–120 the owner's instructions and file g's rules" — asked by repair-r1-V10.md preamble, HAND-OFFS: "Title block (assembler or close): 'items 1–119' → 'items 1–120'."
   * `docs/volumes/V11-content.md` l. 11: "items 1–101 the owner's instructions, 102–119" → "items 1–101 the owner's instructions, 102–120" — asked by repair-r1-V11.md preamble: "The preamble under the volume's title … still reads '102–119' … The assembler may widen the preamble's range to '102–120' by hand."
   * `docs/volumes/V12-calibration.md` l. 8: "1–101 the owner's instructions, 102–119 file g's owner and program rules" → "1–101 the owner's instructions, 102–120 file g's owner and program rules" — asked by repair-r1-V12.md preamble, note (8) ASSEMBLE NOTE: "it should read '102–120'. One token; assemble applies it in place (no other text there changes)."

Other notes to the assembler, checked: scope's (2) (the retitle; see the audit notes), (3) (INDEX routed by its FILE line) and (5)
(its allow rows, §6); scope's (4) is conditional on V09's VAP-06 repair — it landed (V09 §8.1: AP5 on M6-E, base line 16.25–24.0),
so §16 stands as written. Nothing else in the eighteen preambles asks anything of the assembler.

## 3. The rationale

Scope's RATIONALE-A block appended 8 Part A entries (J-A114.01 – J-A119.01, J-A568.04, and the restated J-A73.06, swapped into
place as above); its J-ROWS block appended the 7 matching judgment-index rows. `docs/ARCHITECTURE-RATIONALE.md`: 685 208 → 688 889
bytes, 115 671 → 116 315 words; Part A and the index both hold 788 entries with one id set and no duplicate. No
other block routes to the rationale; each volume run's throwaway rationale output is byte-identical to its input.

## 4. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|
| base | 2 615 627 | 2 787 468 | +6.6 % | 422 575 | 450 409 | +6.6 % | 2554.3 → 2722.1 |
| V01 | 464 158 | 492 604 | +6.1 % | 76 024 | 80 754 | +6.2 % | 453.3 → 481.1 |
| V02 | 494 200 | 513 788 | +4.0 % | 82 668 | 85 913 | +3.9 % | 482.6 → 501.7 |
| V03 | 388 143 | 413 070 | +6.4 % | 65 917 | 70 149 | +6.4 % | 379.0 → 403.4 |
| V04 | 460 463 | 488 215 | +6.0 % | 74 624 | 79 203 | +6.1 % | 449.7 → 476.8 |
| V05 | 360 317 | 394 900 | +9.6 % | 60 743 | 66 710 | +9.8 % | 351.9 → 385.6 |
| V06 | 593 982 | 629 860 | +6.0 % | 96 675 | 102 706 | +6.2 % | 580.1 → 615.1 |
| V07 | 561 556 | 580 760 | +3.4 % | 92 729 | 96 143 | +3.7 % | 548.4 → 567.1 |
| V08 | 489 825 | 505 231 | +3.1 % | 77 159 | 79 800 | +3.4 % | 478.3 → 493.4 |
| V09 | 635 793 | 659 614 | +3.7 % | 105 485 | 109 155 | +3.5 % | 620.9 → 644.2 |
| V10 | 466 617 | 476 312 | +2.1 % | 75 073 | 76 999 | +2.6 % | 455.7 → 465.1 |
| V11 | 608 701 | 626 514 | +2.9 % | 101 973 | 104 792 | +2.8 % | 594.4 → 611.8 |
| V12 | 430 397 | 453 363 | +5.3 % | 69 784 | 73 495 | +5.3 % | 420.3 → 442.7 |
| INDEX | 25 407 | 23 960 | -5.7 % | 4 250 | 4 026 | -5.3 % | 24.8 → 23.4 |
| rationale | 685 208 | 688 889 | +0.5 % | 115 671 | 116 315 | +0.6 % | 669.1 → 672.7 |
| **base + volumes** | 8 569 779 | 9 021 699 | +5.3 % | 1 401 429 | 1 476 228 | +5.3 % | 8368.9 → 8810.3 |
| **volumes** | 5 954 152 | 6 234 231 | +4.7 % | 978 854 | 1 025 819 | +4.8 % | 5814.6 → 6088.1 |
| **base + volumes + INDEX** | 8 595 186 | 9 045 659 | +5.2 % | 1 405 679 | 1 480 254 | +5.3 % | 8393.7 → 8833.7 |

Every unit grows but INDEX: this round adds the owner rules that reached the program after the canon (items 114–120, J133) at build
depth and the round-0 findings' fixes; the assembler may not compress text, and each repair file states its words by source and what
the growth carries. Against the shrink goal's band (25–40 % fewer words than the pre-coherence archive, 1 491 685 words for base and
volumes), the set now stands at 1 476 228 words (-1.0 %). No unit shrank by more than half.
Duplicate id definitions across the set (principle (4); the judgment index, Part A, D-n, T-ER, every volume's T-Vn-m and J-Vn.m rows,
`_integrate.md`'s J-VI rows): **none**.

## 5. References

assemble-r0's resolver (`refs.py`, citation form canon S7: a bare `§x` is the base's, a volume's section `Vnn §x` everywhere), unchanged
but for its root, run on two mirror trees (`mirror.sh`): the untouched set and the final set, each with `_integrate.md`, files f and
g, `research/` and `docs/volumes/critique/` linked in. Every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and
`T-…`, lines read joined, against the headings and ids that now exist (base 147 numbered headings; volumes
V01 121, V02 95, V03 52, V04 65, V05 60, V06 132, V07 55, V08 61, V09 123, V10 84, V11 150, V12 121; INDEX 8; 3 311 defined ids, up from 3 218).

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 45 734 | 49 569 | the target exists |
| external | 132 | 130 | a § list headed by another document, or a J-id of another record |
| ambiguous | 456 | 82 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 9 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` only one volume of its list has — assemble-r0's mechanical G-cite prefix |
| BROKEN | 1 | 0 | no target |
| **total** | 46 333 | 49 788 | |

**Broken: 0.** Round 0's one (the base's PART III "(the parity judge's 44 / 44; V07 §15)", base l. 19 218 before) is gone: pipeline's
REPLACE of PART III rewrites the line. **Mechanical fixes: 0** — no `FIX`-class reference remains, and no repair file records a
renumbering (the retitles listed in section 2 of this report keep their numbers; V06's "renamed" is a field, `epoch.costMs`; the model's "renumbering order"
is a design term). **Ambiguous form: 82** (from 456), listed in `ambiguous-refs.tsv` (unit, line, reference, the list's head volume,
context): base 24, V01 11, V02 12, V03 11, V04 1, V05 3, V06 2, V09 7, V10 3, V11 6, V12 2 — each resolves under S7; the verifier
confirms each or prefixes it. **External: 130** (bare 119, bare-cont 1, J 10), listed in `external-refs.tsv`.

## 6. Document checks (three-copy method, one corpus snapshot)

`python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with `docs/validation/doc-checks-allow.tsv`, on three
copies against one corpus snapshot (`checks.py`): **untouched** (the live base before this round, sha256 `484af066…`), **new** (the
blocks applied, before the assembler's own changes) and **combined** (the installed text; the hand-offs touch only the rationale and
three volumes, so for the base new = combined, byte for byte). Two key sets: (a) the 34 top-level heading keys `ARCHITECTURE,The whole
design,0,PART I,1,…,17,PART II,II.1,…,II.7,PART III,Delegated decisions,Judgment calls,Staged,Appendix A` — the brief's command; the
parent keys span their children, so their C3 and C4 hits count twice — and (b) the eight `#` keys, which partition the document. The
corpus fingerprint (path, size and mtime of the 128 files doc_checks reads) is equal before and after every run.

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any freeze". The snapshot: colour_files=102, json_files=6, c3_corpus_3grams=426823, c4_lists=148. Every count below is PROVISIONAL.

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 1 / 0 | 3116 / 0 | 8 / 0 | 0 / 0 | 139 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1614 / 0 | 4 / 0 | 0 / 0 | 139 / 0 | **0** |
| new (a) | first | 5 / 0 | 1 / 0 | 3202 / 112 | 12 / 0 | 0 / 0 | 183 / 1 | 1 |
| new (b) | first | 5 / 0 | 1 / 0 | 1657 / 56 | 6 / 0 | 0 / 0 | 183 / 1 | 1 |
| combined (a) | first | 5 / 0 | 1 / 0 | 3202 / 112 | 12 / 0 | 0 / 0 | 183 / 1 | 1 |
| combined (b) | first | 5 / 0 | 1 / 0 | 1657 / 56 | 6 / 0 | 0 / 0 | 183 / 1 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3116 / 0 | 8 / 0 | 0 / 0 | 139 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1614 / 0 | 4 / 0 | 0 / 0 | 139 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3202 / 0 | 12 / 0 | 0 / 0 | 183 / 0 | **0** |
| new (b) | final | 5 / 0 | 1 / 0 | 1657 / 0 | 6 / 0 | 0 / 0 | 183 / 0 | **0** |
| **combined (a)** | final | 5 / 0 | 1 / 0 | 3202 / 0 | 12 / 0 | 0 / 0 | 183 / 0 | **0** |
| **combined (b)** | final | 5 / 0 | 1 / 0 | 1657 / 0 | 6 / 0 | 0 / 0 | 183 / 0 | **0** |

(hits / unreviewed.) The combined document's final run exits 0 on both key sets, and again under `PYTHONHASHSEED` 0, 1, 2 and 12345
(the same counts); its total over the 34 keys is **3 403 hits** (C1 5, C2 1, C3 3202, C4 12, S1 0, S2 183), 0 unreviewed. The untouched
copy is round 0's clean state (exit 0 before and after). The first run's 112 unreviewed C3 lines under (a) (56 under (b)) and 1 S2 are
55 distinct hits, all new text of this round's base blocks; none is in the untouched base.

* **Corrected: none** (no S1 table fault, no mechanical hit).
* **Reviewed allow rows: 55**, one block `# block: coherence/assemble-r1` appended to the allow file (C3 54, S2 1). Each hit is new text
  carried by the repair block of the seat that wrote it, and each has the reviewed row that seat proposed in its preamble (model 19,
  scope 11, rendering 26 — scope's and rendering's "a change of the map" coincide). `attrib.py` re-checked each (`c3-attribution.tsv`:
  the final base line and subsection, absence from the untouched base, the carrying repair file, the corpus files holding the run
  whole): 53 C3 runs are held whole by no corpus file (chains of 3-grams: section-pointer digits, person-week figures, ordinary words);
  2 were read in context — "10 2 the room programme" is held whole only by the program's own design page
  `research/findings/dwellings-synthesis.md`, which quotes the design, and "dormer set back from the eave" by
  `research/findings/code-manor.md`, a reader-tier note in our own words: the run is our `DormerKind` comment, in V02 since the
  pre-coherence archive and moved verbatim to §2.6 (MC-11), an ordinary description of a dormer. The S2 `§2.12` is the one pointer
  "(V10 §2.12)" in §11.2: volume-prefixed at its only occurrence, resolved by `refs.py` in V10. None is a reference list, table,
  grammar, palette or identifier.
* **The volume seats' proposed rows** (V01, V02, V03, V04, V07, V08 and V11 wrote reviewed rows "for the assembler" — "this lane writes
  no shared file"). Information runs (`volchecks.sh`: each volume and INDEX, whole document, `--heads` the matching base, untouched
  against installed) give 136 new unreviewed hits; 75 match a proposed row (`volrows.py`, `vol-attribution.tsv`), and the 73 not
  already reviewed are appended as a second block `# block: coherence/assemble-r1 (volumes)`, each new text of that volume's block,
  absent from the untouched volume, held whole by no corpus file — or read in context (five, their reasons say so: two V03 runs held
  only by `dwellings-synthesis.md`; V01's size chips "small / medium / large", a generic three-step scale with our own keys, held by
  `profile-dwellings.md`; V01's pointer run spanning two adjacent blocks; V08's W86 pointer run whose ends the prefix pass moved). One
  appended row, V03's C4 `castle cathedral keep mill temple` (J-V3.135's own reasoning on our `BuildingClass` ids), carried C3 wording
  in its tail; a correcting row for the same key follows it (the file is shared and append-only). The other 61 new volume hits
  have no proposed row and stay unreviewed: V05 21, V06 17, V09 14, V10 9 (C3 runs of the new text and the S2 pointers
  V05 §6.8, V06 §5.12/§6.8, V09 §3.23, volume-qualified pointers read against the base's headings).
  Volume runs are information: they carry hundreds of unreviewed runs from before this pass and are not held to exit 0 (as in
  round 0, which ran none). Installed volumes' counts are in `volchecks-final.txt`.
* **Allow rows not dropped.** As in round 0: with an incomplete corpus a row matching nothing here may still be needed on the machine
  that holds the corpus, and the allow file is shared, so this seat only appends; a kept row hides no new hit (review is by exact text).
* **The rationale (information; not held to exit 0):** C3 481 / 309 unreviewed before, 484 / 311 after (two runs in scope's new Part A
  entries: "8 in the base s", "a line of its own"); S2 17 / 15 before and after (`--heads` the base).

## 7. Bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md` (66 881 lines from 14 sources; 8 616 624 → 9 067 131 bytes);
`--check` reports it up to date (exit 0), and again after the last check of this report.

## 8. Not placed, and left for the verifier

* **Unplaced: nothing.** Every block of the eighteen files is applied but the three RULING REQUEST blocks, which no assembler applies:
  V07 VV78-21, V10 VAT-20 and determinism VDC0-33 wait for the adjudicator (§2).
* **Broken references: 0** (§5).
* **82 ambiguous-form references** (§5, `ambiguous-refs.tsv`): read as the base's under S7; the verifier confirms each or
  prefixes it.
* **Hand-offs between units** that the repair files record as another unit's text (each preamble's HAND-OFFS list: for instance
  kernel's note that §5.2 F-RIVER's "(E_NO_PATH, …)" clause is to be dropped, V12's §13.2 item-120 bars for scope, rendering's §12.10
  row citations) are not assembly work: they stand in the repair files for the next verify and repair rounds.
* **Volume document checks:** 61 new volume hits without a proposed row (V05, V06, V09, V10; §6) — for those volumes' seats or the close.
* **The document checks are provisional** (§6): re-run them on the machine that holds the reference corpus; the 55 base rows and the 73 volume rows (and the one correcting row)
  were reviewed against this checkout's smaller corpus, and a fuller corpus can lengthen or split runs.
* **Size:** the set at -1.0 % words against the pre-coherence archive, outside the shrink band (§4); each repair file
  states what holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the 15 live files' sha256 before (each equal to its HEAD blob) and after (each equal to its final copy); the
routing of 308 blocks and the census (0 missing, 0 double REPLACE); 305 applied with audit not-OK 0 and balanced fences in every
file; the three RULING REQUEST blocks skipped with their text absent from every live file; the outputs equal to the nine hashes the
repair seats recorded; the J-A73.06 swap (788 = 788, no duplicate) and the three title-block substitutions; the reference counts of
§5 with 0 broken; the document checks' counts of §6, exit 0 on every copy and key set and under four hash seeds, one corpus snapshot;
the bundle regenerated and `--check` clean; the sizes of §4; no duplicate id definition.
**PLAUSIBLE:** that each of the 55 base rows and 73 volume rows is a false positive (each attributed by script and proposed by the
seat that wrote the text; the runs a corpus file holds whole read once in context by this seat, no second reader), and that the 82
ambiguous-form references read as their authors meant (S7 reads them as the base's; not checked one by one).
