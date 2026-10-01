# Assemble — coherence pass, round 3 (the eighteen repair-r3 block files applied to the base, the volumes, INDEX and the rationale)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r3 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r3`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at 920d280d); untouched snapshot — done
- P2 block inventory and routing (18 files, 202 blocks, 0 RULING REQUEST, 0 missing heading, 0 double REPLACE; the ASSEMBLE NOTES census) — done
- P3 apply (202 applied, 0 skipped, audit not-OK 0, every volume output = its seat's recorded dry run), the scripted hand-offs (rendering's, scope's and kernel's restated-row swaps; V05's title block), install (15 of 15) — done
- P4 references: 55 198 checked, 0 broken, 0 mechanical fixes, 80 ambiguous-form listed — done
- P5 document checks, three-copy method: 1 reviewed base row, exit 0 on every copy and key set; volume information runs — done
- P6 bundle and `--check` — done
- P7 review-id census (ROUND-3 NOTES (9) (c)), sizes, this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r3/` (`snapshot.py`, `route.py`, `apply.py` —
which runs `docs/validation/amendments-b/apply-blocks.py` unchanged —, `handoff.py` — which runs the three repair seats' own
`swap_restated.py` unchanged —, `headings.py`, `install.py`, `mirror.sh` with `refs.py` and `refsreport.py`, `fixrefs.py`, `checks.py`,
`attrib.py`, `reviewrows.py`, `volchecks.sh`, `sizes.py`, `unitsizes.py`, `reviewids.py`), most of them assemble-r2's with the round label and
the scratch folder (`scratchpad/coherence/asm3/`) changed; `handoff.py`, `reviewrows.py` and `reviewids.py` are this round's, and
`unitsizes.py` now counts a restated row against the older row it replaces. No live text was hand-edited. Their records sit beside them
(`snapshot.json`, `blocks.json`, `split/`, `logs/`, `apply.json`, `handoff.json`, `headings.json`, `install.json`, `fixrefs.json`,
`ref-fixes.tsv`, `refs-before.out`, `refs-final.out`, `refs-summary.json`, `ambiguous-refs.tsv`, `external-refs.tsv`, `checks.json`,
`c3-attribution.tsv`, `volchecks-final.txt`, `sizes.json`, `unitsizes.json`, `reviewids-untouched.*`, `reviewids-final.*`).

## Outcome

All eighteen repair files had LANDED before this seat started (each a `coherence/repair-<unit>-r3 LANDED` line in the lane log and its
result in `results/coherence_repair-<unit>-r3.json`; all eighteen committed at HEAD `920d280d`; ROUND-3 NOTES (9) (d)). They are applied:
**202 blocks found, 202 applied, 0 skipped**. No file carries a RULING REQUEST (0 `=== RULING REQUEST` lines in the eighteen), no heading
was missing or ambiguous, no block truncated, and no two blocks touch one subsection (no double REPLACE, no nesting), so no three-way merge
was needed. The audit finds every applied body exactly once and fences balanced in every file; every volume's output is byte-identical
to the result its repair seat recorded for its own dry run (nine by sha256, V10 and V11 by byte count — their headers record no hash;
V09's header records neither), and kernel's recorded stand-alone dry run is reproduced exactly. The four ASSEMBLE NOTES are applied as written, each count-asserted:
rendering's (J-A68.89), scope's (J-A120.01) and kernel's (J-A81.31) restated rows swapped into their older rows' places by the seats'
own scripts — the judgment index and Part A both 805 rows, one id set, no duplicate — and V05's title-block reading guide (R2-07's form).
**Nothing is unplaced.** The round adds, removes and retitles no heading. The set (base and volumes) goes from 9 383.7 KB to
9 510.9 KB (+1.4 % bytes, +1.4 % words). Of 55 198 references checked, **none is broken**; none needed a mechanical fix; 80 resolve but
are ambiguous in form (77 before). The document checks exit 0 on the untouched, new and combined copies over every top-level key and over
the eight `#` keys, against one corpus snapshot, after 1 reviewed allow row — **provisional**, the reference corpus being incomplete in
this checkout; the combined document's total is 3 523 hits, 0 unreviewed. The bundle `docs/ARCHITECTURE-FULL.md` is regenerated and
`--check` passes. Review ids in design text (ROUND-3 NOTES (9) (c)): **14 sites** outside the decision and request records (79 before),
none an `R2-nn` / `R3-nn` ruling or a verifier issue id (section 8).

## 1. Live files — sha256 before and after

Before: the committed text at HEAD `920d280d5e58` (each live file equal to its HEAD blob; assemble-r2's outputs, the base `4ed292e9…`
every repair file was written against). After: written by `install.py`, guarded on each live file still holding its P1 sha256 and each
verified byte-identical to its final copy. No reference fix followed (section 5), so the installed files are the final ones.

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 2 934 933 | 2 974 590 | `4ed292e94f2442e5db7cb25e3da110806f5c5e7ccb9037d6fe32375a51504f76` | `593c657d34849302d1e4bd2355149b6606b2ed1c10c9ea2ca03746d78c9a7fe3` |
| `docs/ARCHITECTURE-RATIONALE.md` | 697 152 | 704 669 | `dd2bfafa96aba31b89a5f1a1afba6b48261653c0e889ed40e48a3155599a5ed0` | `e7b59eac90a75327c91ec60a281e34b9c14919b5208f282d48b7026bf1324b5c` |
| `docs/volumes/V01-neighbourhoods.md` | 516 483 | 523 442 | `fb2d14965bdcae74be2f7d138804e64aafe2ed5569e53f1aeb5d07ed52ac1901` | `8260b2a828b75099869def006f4d621ec063c5bb0f47526162e9942a4a81becc` |
| `docs/volumes/V02-buildings.md` | 547 395 | 561 207 | `c4d398371f6549f3c3b538ba0771170eb344e899f945f167cd5a29e23acca9a3` | `4696951caa15e7ffe32522c2f5159b676a8c0da14ad45a4f10d2febe45d82e40` |
| `docs/volumes/V03-interiors.md` | 459 238 | 464 396 | `b015fd004576b4c1469fa91f4d40dc027c2842b5995aa06c9d52093129a6a157` | `f4458cf438971b111959196b5ae575b36ea6da248a5e72289c45dc565d80c2e3` |
| `docs/volumes/V04-underground.md` | 514 605 | 520 064 | `2786cc53670c4db923fc1607e6b958a6ee9c8790d9fd075b76dcb3db1c7fb905` | `0e3bcacd8f5cc61680509b213757a3cc3a94252d6647acd26938bce7b263f162` |
| `docs/volumes/V05-sky.md` | 398 211 | 398 194 | `7617d87cff90221648d3152f847bad8a9c3926683066543ab69331edd764bf95` | `cc1dfa61fe882bcb8767901e0d5624fcfc7776d6cc1a4256d6eca269a89aad28` |
| `docs/volumes/V06-evolution.md` | 665 608 | 680 177 | `d12c382be27e78351c5b0c020b8aae7432f888f6d67f5c32ec0571f31aa10e52` | `8f92dd3809e03132e1d710d49e11ccf8ccce394b5dd7ceb8b7d73e2234299feb` |
| `docs/volumes/V07-village.md` | 602 961 | 603 780 | `8a4302dc1cd9f98d2cf06aa96aa3f4470f2fee6717c7af96ab6804b5bca28394` | `285e2f6fe9dd744be31d1d5db7073d16c958cd2f67d956e9a6da935b091a0b5a` |
| `docs/volumes/V08-settlementforge.md` | 545 798 | 559 089 | `f92c2a85e2d098627d608acbe5c5d35414046ea3bf5ae5a8c4038b5b81854a47` | `bf9fa7be4ae8c3b9977d0b2e9a6938a0be34b43df607d10c9364c64c6d0a47fe` |
| `docs/volumes/V09-application.md` | 738 871 | 749 608 | `23398a30e3926569be252c029e1c11593c91e76d091977e6c262f71eee6c91ef` | `cfe4df195892ff4f0943cf98764a0b4d36d22af02f11d51d4eeed6acf3675b04` |
| `docs/volumes/V10-clerk.md` | 503 127 | 510 631 | `6efb987b252f4536fdbed4aa8a30c8665543d8af4716f7635285f9866d39c993` | `382ea60eedc48fa960654297ec9d6d9ffdecf80a608b3a656fc8ea93d1ea75e7` |
| `docs/volumes/V11-content.md` | 668 876 | 674 664 | `7842179aaa80abfcf1e85dda0ab46c2fa6555b24c874527c2833c02a832b67b4` | `1671da41b1f28eeda542e2946004dd94ccdc424dde2c940c16d87619a1a790d9` |
| `docs/volumes/V12-calibration.md` | 512 846 | 519 356 | `74a4bfb3b0a3841da8e40b2326f9bd336a75d665edd8680a476149bb5ff6f02a` | `90a61a9c9232f349e475123a98d52d43a5827823622b66a4434e85cb90c897b5` |
| `docs/volumes/INDEX.md` | 24 049 | 24 074 | `1774db18eb14cd3179d29569dc876b00b0d8ae1b603169e1dfa507bec88e83f0` | `90e2844ab4c9884d0af4105af4eb9301c78848e44c372b526eb99754a07181c3` |

Also written: `docs/ARCHITECTURE-FULL.md` (the bundle, section 7) and `docs/validation/doc-checks-allow.tsv` (one appended block, section 6).

## 2. Blocks — routing, application, audit

**The block files** (`blocks.json` records each one's sha256 as read): exactly `docs/validation/coherence/repair-r3-<unit>.md` for the
eighteen units (ROUND-3 NOTES (1)); everything under `work/` and the bench files are the repair seats' working material, never blocks.

| file | sha256 (16) | lines | FILE lines |
|---|---|---:|---|
| `repair-r3-V01.md` … `repair-r3-V12.md` | `72bf589952de140e`, `ed52f0b667dbc471`, `09a8cca982cffbb9`, `c90f96f1a12c0424`, `fdc839fc31ffe7c6`, `685a050a5143b708`, `6c4a570b2644b4e4`, `f4aea293eb27065a`, `635dde793fe4af66`, `35f67b462e648a13`, `3a93ab65fd072011`, `77a11c8b96aa0a85` | 1 214, 1 102, 1 005, 1 151, 241, 2 416, 1 182, 1 891, 2 376, 1 651, 2 198, 1 688 | one each, naming its volume |
| `repair-r3-determinism.md`, `-kernel`, `-model`, `-pipeline`, `-rendering` | `f4068f7d6760f1a8`, `76e407e908844844`, `254e3280e5509510`, `32564d99b03135f0`, `18635562e370f48e` | 1 842, 346, 2 255, 4 192, 2 980 | none (the base) |
| `repair-r3-scope.md` | `25d6a2aec3af1a1c` | 2 186 | l. 2155, `docs/volumes/INDEX.md` (its last block) |

**Routing** (`route.py`). Each file was cut at its `=== FILE <path> ===` lines; every block went to the file its nearest FILE line above
names, the base when none (ROUND-3 NOTES (3)). The split block files keep their repair file's basename, so `apply-blocks.py` applies them
in the round's name order (V01 … V12, determinism, kernel, model, pipeline, rendering, scope); the FILE lines are left out (routing, not
blocks) and every other line is verbatim. The base ran with the rationale; each volume and INDEX with a throwaway rationale whose output
equals its input (no J-ROWS or RATIONALE-A block routes to them).

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST, 0 overlaps of any
kind — no two blocks of the round (within one unit or across units) cover one subsection or nest. Hence **no double REPLACE**: the brief's
`git merge-file` step (merge base: the subsection as assemble-r2 installed it, base `4ed292e94f2442e5…`) had nothing to merge and no
conflict to report (ROUND-3 NOTES (4)); and no block named a heading that an earlier block of this round had retitled (ROUND-3 NOTES (5)):
every block was found on the text as it stood. The kinds: 196 REPLACE (base 41, INDEX 1, volumes 154 — every volume block a REPLACE), 3
J-ROWS and 3 RATIONALE-A (rendering, kernel, scope).

| unit | blocks found | applied | skipped | target | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|
| V01 | 12 | 12 | 0 | `V01-neighbourhoods.md` | 35 110 → 36 292 (+3.4 %) | 209.1 → 215.9 |
| V02 | 14 | 14 | 0 | `V02-buildings.md` | 21 442 → 23 686 (+10.5 %) | 127.3 → 140.8 |
| V03 | 10 | 10 | 0 | `V03-interiors.md` | 31 873 → 32 738 (+2.7 %) | 183.3 → 188.4 |
| V04 | 10 | 10 | 0 | `V04-underground.md` | 36 077 → 37 038 (+2.7 %) | 211.9 → 217.3 |
| V05 | 3 | 3 | 0 | `V05-sky.md` | 2 897 → 2 898 (+0.0 %) | 17.2 → 17.1 |
| V06 | 16 | 16 | 0 | `V06-evolution.md` | 64 802 → 67 243 (+3.8 %) | 385.6 → 399.9 |
| V07 | 8 | 8 | 0 | `V07-village.md` | 40 900 → 41 049 (+0.4 %) | 238.5 → 239.3 |
| V08 | 19 | 19 | 0 | `V08-settlementforge.md` | 52 966 → 55 087 (+4.0 %) | 321.9 → 334.9 |
| V09 | 18 | 18 | 0 | `V09-application.md` | 70 678 → 72 364 (+2.4 %) | 415.5 → 426.0 |
| V10 | 18 | 18 | 0 | `V10-clerk.md` | 44 126 → 45 342 (+2.8 %) | 262.9 → 270.2 |
| V11 | 14 | 14 | 0 | `V11-content.md` | 52 629 → 53 549 (+1.7 %) | 317.2 → 322.8 |
| V12 | 12 | 12 | 0 | `V12-calibration.md` | 48 154 → 49 247 (+2.3 %) | 284.6 → 291.0 |
| determinism | 5 | 5 | 0 | `ARCHITECTURE.md` | 38 803 → 39 476 (+1.7 %) | 240.6 → 244.5 |
| kernel | 4 | 4 | 0 | `ARCHITECTURE.md` (+ rationale) | 3 998 → 4 445 (+11.2 %) | 24.3 → 26.7 |
| model | 4 | 4 | 0 | `ARCHITECTURE.md` | 45 228 → 45 866 (+1.4 %) | 279.8 → 283.4 |
| pipeline | 11 | 11 | 0 | `ARCHITECTURE.md` | 74 810 → 75 983 (+1.6 %) | 453.9 → 460.7 |
| rendering | 14 | 14 | 0 | `ARCHITECTURE.md` (+ rationale) | 57 185 → 61 614 (+7.7 %) | 337.7 → 363.1 |
| scope | 10 | 10 | 0 | `ARCHITECTURE.md` (+ rationale), `INDEX.md` | 46 390 → 47 008 (+1.3 %) | 289.7 → 293.8 |
| **total** | **202** | **202** | **0** | | | |

"Covered text": a REPLACE's section in the untouched file against the section of its body's heading in the installed file; J-ROWS and
RATIONALE-A count their rows, a restated row against the older row it replaces (kernel's J-A81.31 index row and Part A entry; rendering's
J-A68.89 Part A entry; scope's J-A120.01 index row and Part A entry). Each unit's count matches its header's (V01 12, V02 14, V03 10, V04 10,
V05 3, V06 16, V07 8, V08 19, V09 18, V10 18, V11 14, V12 12; determinism 5, kernel 4, model 4, pipeline 11, rendering 14, scope 9 + 1).
Kernel's figures equal its header's (§3.1 1 507 → 1 544, §3.2 1 977 → 2 215, index row 22 → 49, Part A 492 → 637 words). Scope covers §1.1,
§13.2, §13.4, §13.8, §14, §16, Appendix A, its index and Part A rows and INDEX.md's §1 (a level-2 REPLACE; INDEX's title block unchanged).

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines before → after | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 47 | 47 | 0 | 153 → 153 | 140 → 140 (balanced) | `e849c43589789bbe` (before the swaps) | no seat records the six files' combined output; kernel's stand-alone run reproduced (below) |
| `INDEX.md` | 1 | 1 | 0 | 9 → 9 | 2 → 2 (balanced) | `90e2844ab4c9884d` | scope: "INDEX alone: 1/1 applied, audit 0, headings 9 → 9" (no hash recorded) |
| `V01-neighbourhoods.md` | 12 | 12 | 0 | 123 → 123 | 12 → 12 (balanced) | `8260b2a828b75099` | equal — repair-r3-V01 l. 24 |
| `V02-buildings.md` | 14 | 14 | 0 | 77 → 77 | 16 → 16 (balanced) | `4696951caa15e7ff` | equal — repair-r3-V02 l. 26, 153 |
| `V03-interiors.md` | 10 | 10 | 0 | 48 → 48 | 14 → 14 (balanced) | `f4458cf438971b11` | equal — repair-r3-V03 l. 22 |
| `V04-underground.md` | 10 | 10 | 0 | 59 → 59 | 12 → 12 (balanced) | `0e3bcacd8f5cc616` | equal — repair-r3-V04 l. 91 |
| `V05-sky.md` | 3 | 3 | 0 | 62 → 62 | 14 → 14 (balanced) | `a9cfb0a37d01a465` | equal — repair-r3-V05 l. 62 (before its ASSEMBLE NOTE, section 2.1) |
| `V06-evolution.md` | 16 | 16 | 0 | 65 → 65 | 28 → 28 (balanced) | `8f92dd3809e03132` | equal — repair-r3-V06 l. 23 |
| `V07-village.md` | 8 | 8 | 0 | 58 → 58 | 18 → 18 (balanced) | `285e2f6fe9dd744b` | equal — repair-r3-V07 l. 80 |
| `V08-settlementforge.md` | 19 | 19 | 0 | 63 → 63 | 18 → 18 (balanced) | `bf9fa7be4ae8c3b9` | equal — repair-r3-V08 l. 26 |
| `V09-application.md` | 18 | 18 | 0 | 110 → 110 | 24 → 24 (balanced) | `cfe4df195892ff4f` | the seat records "byte-identical to the generator's applied text", no hash or size |
| `V10-clerk.md` | 18 | 18 | 0 | 86 → 86 | 24 → 24 (balanced) | `382ea60eedc48fa9` | equal in size — repair-r3-V10 l. 132: "output 510 631 bytes" |
| `V11-content.md` | 14 | 14 | 0 | 58 → 58 | 22 → 22 (balanced) | `1671da41b1f28eed` | equal in size — repair-r3-V11 l. 101: "Output 668 876 → 674 664 bytes" |
| `V12-calibration.md` | 12 | 12 | 0 | 67 → 67 | 30 → 30 (balanced) | `90a61a9c9232f349` | equal — repair-r3-V12 l. 23, 120 |

Audit (each run): every applied body found exactly once in the output, not-OK 0; every title block unchanged by the blocks. The applier's
only notes are the five expected "DUPLICATE ID inserted" notes of the three restated rows (J-A81.31 in the index and Part A; J-A68.89 in
Part A; J-A120.01 in the index and Part A), each settled by its ASSEMBLE NOTE below.

**Headings (`headings.py`, `headings.json`): none added, none removed, none retitled** in any of the fourteen documents (base 153, INDEX 9,
V01 123, V02 77, V03 48, V04 59, V05 62, V06 65, V07 58, V08 63, V09 110, V10 86, V11 58, V12 67, each unchanged). The numbered targets the
resolver reads are unchanged (section 5); the defined ids go from 3 452 to 3 465 (rendering's eight new J rows and five new bars).

**RULING REQUEST blocks — 0.** No repair-r3 file carries one (ROUND-3 NOTES (2)), so none is listed or skipped; no `=== ` header line of
any kind and no "RULING REQUEST" text is present in any live file after installation.

### 2.1 ASSEMBLE NOTES — the scripted hand-offs (`handoff.py`, `handoff.json`)

The census of the eighteen headers (every line naming Assemble or the assembler, a swap, a title block or a proposed allow row) finds four
notes addressed to Assemble; each is applied mechanically as written (ROUND-3 NOTES (9) (a)), on a copy of the applied text (`asm3/out` →
`asm3/final`; `out/` stays the "new" copy of the three-copy method). These are the only changes outside the blocks.

1. **Rendering, NOTE FOR ASSEMBLE** — "RATIONALE-A's last row restates the existing Part A entry J-A68.89 (… its judgment-index row is
   unchanged): after the blocks apply, the appended row takes the older row's place (rationale l. 689 on the live file) and the older row
   is deleted." Run: `work/repair-rendering-r3/swap_restated.py RATIONALE_IN RATIONALE_OUT`, unchanged. Result: J-A68.89 l. 689 ← l. 853.
2. **Scope, NOTE FOR ASSEMBLE** — J-A120.01 restated in the judgment index and Part A (VCS-r2-01). Run:
   `work/repair-scope-r3/swap_restated.py BASE RATIONALE BASE_OUT RATIONALE_OUT`, unchanged. Result: index l. 22649 ← l. 22666; Part A
   l. 836 ← l. 853.
3. **Kernel, NOTE FOR ASSEMBLE** — J-A81.31 restated in both (VKr2-01). Run: `work/repair-kernel-r3/swap_restated.py BASE RATIONALE
   BASE_OUT RATIONALE_OUT`, unchanged, in the order its note gives ("run in rendering, scope, kernel order"). Result: index l. 22566 ←
   l. 22657; Part A l. 753 ← l. 844.
   After the three: **the judgment index 805 rows = Part A 805 rows** (797 each before; + rendering's eight new ids J-A121.02 – J-A121.07,
   J-A122.02, J-A124.02), one id set, no duplicate in either, no id removed; each restated id stands on its older row's line (Part A l. 689,
   753, 836 as before; the index rows where they stood, moved only by the rows the base's REPLACE blocks above them add). Each script stops
   unless its id occurs exactly twice; none stopped.
4. **V05, ASSEMBLE NOTE — the title block** (R2-07: text inside a title's level-1 subsection is Assemble's to set in place; Part H · V05's
   note on VAL-R2-04): "docs/volumes/V05-sky.md l. 11, 'amendment item — items 1–120 the owner's, items 200 and above file f's, each the
   applied text of a volume's base change': 'items 1–120 the owner's' reads 'items below 200 the owner's' … No other text of the title
   block changes." Applied once in the title block (the text above V05's first `## `), the old string there exactly once and the new one
   absent before, no line added or removed. V05 l. 11 now reads "amendment item — items below 200 the owner's, items 200 and above file
   f's, each the applied text of a volume's base change". V05: `a9cfb0a37d01a465…` (the blocks) → `cc1dfa61fe882bcb…`.

**A check, no output:** kernel's header records its stand-alone dry run (its four blocks alone on the live base and rationale, then its
swap) as base `590e3def…`, rationale `ac868127…`; `handoff.py` reproduces both exactly.
No other header addresses Assemble: the other units record "title block untouched / unchanged", and no seat proposes an allow row this
round. The headers' HAND-OFFS lists (for instance kernel's two notes on pipeline §4.11 and J-A81.41, rendering's on §10.2's `CrisisLookRow`
`label`, scope's on T-V2-60, T-V8-59, T-V10-45, T-V11-38 – T-V11-41 and T-V6-73, V07's on view pins) are addressed to round 4's
verifiers, not to Assemble, and stand in the repair files.

## 3. The rationale

Rendering's RATIONALE-A block appended 9 Part A entries (8 new: J-A121.02 – J-A121.07, J-A122.02, J-A124.02; J-A68.89 restated) and its
J-ROWS block the 8 matching index rows; scope's and kernel's blocks each appended one restated index row and one restated Part A entry
(J-A120.01, J-A81.31). After the three swaps (section 2.1): `docs/ARCHITECTURE-RATIONALE.md` 697 152 → 704 669 bytes, 117 741 → 119 102
words; Part A and the index both hold 805 entries with one id set and no duplicate. No other block routes to the rationale; each volume
run's throwaway rationale output is byte-identical to its input.

## 4. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|
| base | 2 934 933 | 2 974 590 | +1.4 % | 475 256 | 481 868 | +1.4 % | 2866.1 → 2904.9 |
| V01 | 516 483 | 523 442 | +1.3 % | 84 670 | 85 852 | +1.4 % | 504.4 → 511.2 |
| V02 | 547 395 | 561 207 | +2.5 % | 91 696 | 93 940 | +2.4 % | 534.6 → 548.1 |
| V03 | 459 238 | 464 396 | +1.1 % | 78 078 | 78 943 | +1.1 % | 448.5 → 453.5 |
| V04 | 514 605 | 520 064 | +1.1 % | 83 662 | 84 623 | +1.1 % | 502.5 → 507.9 |
| V05 | 398 211 | 398 194 | −0.0 % | 67 247 | 67 249 | +0.0 % | 388.9 → 388.9 |
| V06 | 665 608 | 680 177 | +2.2 % | 108 668 | 111 109 | +2.2 % | 650.0 → 664.2 |
| V07 | 602 961 | 603 780 | +0.1 % | 99 783 | 99 932 | +0.1 % | 588.8 → 589.6 |
| V08 | 545 798 | 559 089 | +2.4 % | 86 491 | 88 612 | +2.5 % | 533.0 → 546.0 |
| V09 | 738 871 | 749 608 | +1.5 % | 122 001 | 123 687 | +1.4 % | 721.6 → 732.0 |
| V10 | 503 127 | 510 631 | +1.5 % | 81 413 | 82 629 | +1.5 % | 491.3 → 498.7 |
| V11 | 668 876 | 674 664 | +0.9 % | 111 867 | 112 787 | +0.8 % | 653.2 → 658.9 |
| V12 | 512 846 | 519 356 | +1.3 % | 83 219 | 84 312 | +1.3 % | 500.8 → 507.2 |
| INDEX | 24 049 | 24 074 | +0.1 % | 4 049 | 4 054 | +0.1 % | 23.5 → 23.5 |
| rationale | 697 152 | 704 669 | +1.1 % | 117 741 | 119 102 | +1.2 % | 680.8 → 688.2 |
| **base + volumes** | 9 608 952 | 9 739 198 | +1.4 % | 1 574 051 | 1 595 543 | +1.4 % | 9383.7 → 9510.9 |
| **volumes** | 6 674 019 | 6 764 608 | +1.4 % | 1 098 795 | 1 113 675 | +1.4 % | 6517.6 → 6606.1 |
| **base + volumes + INDEX** | 9 633 001 | 9 763 272 | +1.4 % | 1 578 100 | 1 599 597 | +1.4 % | 9407.2 → 9534.4 |

(Words: whitespace-split, as rounds 0–2 counted them; a seat's `wc -w` figure can differ by a few.) Every unit but V05 grows a little:
this round repairs round 2's findings and writes the END lines of adjudication-r3's Part H — missing edges, readers, bars and both ends
of cross-unit fixes — and the assembler may not compress text; each repair file states its words by source and what holds its growth.
V05 shrinks by 17 bytes (two citation forms shortened) and gains 2 words. Against the shrink goal's band (25–40 % fewer words than the
pre-coherence archive, 1 491 685 words for base and volumes), the set now stands at 1 595 543 words (+7.0 % against the archive). No unit
shrank by more than half (none shrank in words). Duplicate id definitions across the set (principle (4); the judgment index, Part A, D-n,
T-ER, every volume's T-Vn-m and J-Vn.m rows, `_integrate.md`'s J-VI rows): **none** (`sizes.py`).

## 5. References

assemble-r0's resolver (`refs.py`, citation form canon S7: a bare `§x` is the base's, a volume's section `Vnn §x` everywhere), unchanged
but for its root, run on two mirror trees (`mirror.sh`): the untouched set and the final set, each with `_integrate.md`, files f and g,
`research/` and `docs/volumes/critique/` linked in. Every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and `T-…`,
lines read joined, against the headings and ids that now exist (numbered targets, unchanged by the round: base 147, V01 121, V02 99, V03 53,
V04 66, V05 60, V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8; 3 465 defined ids, up from 3 452). All eighteen files
and the four hand-offs were applied before the run (ROUND-3 NOTES (9) (b)), so every cross-unit citation of Part H's END lines is read
with both its ends in.

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 53 898 | 54 980 | the target exists |
| external | 131 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 77 | 80 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` only one volume of its list has — the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 54 113 | 55 198 | |

**Broken: 0** (before and after). **Mechanical fixes: 0**: the resolver found no reference of class FIX, and no repair file records a
renumbering (no heading moved; section 2), so `fixrefs.py` changed nothing (`fixrefs.json` empty, `ref-fixes.tsv` header only).
**Ambiguous form: 80** (from 77), listed in `ambiguous-refs.tsv` (unit, line, reference, the list's head volume, context): base 13, V01 15,
V02 13, V03 12, V04 1, V05 3, V06 3, V09 7, V10 5, V11 6, V12 2 — each resolves under S7 as the base's; the verifier confirms each or
prefixes it. The nine new ones sit in this round's text (base l. 4984 `§11`, l. 11981 `§8.2`; V01 l. 966 `§4.6`, l. 3696 `§2.7`, l. 3698
`§2.3`; V02 l. 4177 `§8.2`; V09 l. 3697 `§2.9`; V10 l. 289 `§2.9` twice); six of the old ones left with the text the blocks replaced.
**External: 131** (bare 120, bare-cont 1, J 10), listed in `external-refs.tsv`.

## 6. Document checks (three-copy method, one corpus snapshot)

`python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with `docs/validation/doc-checks-allow.tsv`, on three
copies against one corpus snapshot (`checks.py`): **untouched** (the live base before this round, sha256 `4ed292e9…`), **new** (the blocks
applied, before the swaps, `e849c435…`) and **combined** (the installed text, `593c657d…`; it differs from new only by the two restated
index rows' positions). Two key sets: (a) the 34 top-level heading keys `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,
II.7,PART III,Delegated decisions,Judgment calls,Staged,Appendix A` — the brief's command; the parent keys span their children, so their C3
and C4 hits count twice — and (b) the eight `#` keys, which partition the document. The corpus fingerprint (path, size and mtime of the 128
files doc_checks reads) is equal before and after every run (`b2f7e5c5fd256d59…`).

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon,
research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the
corpus before any freeze". Every count below is PROVISIONAL (ROUND-3 NOTES (6)).

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 1 / 0 | 3243 / 0 | 12 / 0 | 0 / 0 | 208 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1677 / 0 | 6 / 0 | 0 / 0 | 208 / 0 | **0** |
| new (a) | first | 5 / 0 | 1 / 0 | 3254 / 1 | 12 / 0 | 0 / 0 | 251 / 0 | 1 |
| new (b) | first | 5 / 0 | 1 / 0 | 1683 / 1 | 6 / 0 | 0 / 0 | 251 / 0 | 1 |
| combined (a) | first | 5 / 0 | 1 / 0 | 3254 / 1 | 12 / 0 | 0 / 0 | 251 / 0 | 1 |
| combined (b) | first | 5 / 0 | 1 / 0 | 1683 / 1 | 6 / 0 | 0 / 0 | 251 / 0 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3243 / 0 | 12 / 0 | 0 / 0 | 208 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1677 / 0 | 6 / 0 | 0 / 0 | 208 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3254 / 0 | 12 / 0 | 0 / 0 | 251 / 0 | **0** |
| new (b) | final | 5 / 0 | 1 / 0 | 1683 / 0 | 6 / 0 | 0 / 0 | 251 / 0 | **0** |
| **combined** (a) | final | 5 / 0 | 1 / 0 | 3254 / 0 | 12 / 0 | 0 / 0 | 251 / 0 | **0** |
| **combined** (b) | final | 5 / 0 | 1 / 0 | 1683 / 0 | 6 / 0 | 0 / 0 | 251 / 0 | **0** |

(hits / unreviewed.) The combined document's final run exits 0 on both key sets, and again under `PYTHONHASHSEED` 0, 1, 2 and 12345 (the
same counts); its total over the 34 keys is **3 523 hits** (C1 5, C2 1, C3 3254, C4 12, S1 0, S2 251), 0 unreviewed. The untouched copy is
round 2's clean state (exit 0 before and after). The 43 new S2 hits are all matched by rows the allow file already holds (0 unreviewed).

* **Corrected: none** (no S1 table fault, no mechanical hit).
* **The one unreviewed hit** — C3 `in 8 8 2 9`, final base l. 22663 (the judgment index, *Judgment calls*): a run across two cells of
  rendering's new index row J-A122.02 — the last word of its choice cell ("… the camps the crisis framing takes in") and its where cell
  "§8.8, §2.9". `attrib.py` (`c3-attribution.tsv`): new text of repair-r3-rendering's J-ROWS block, absent from the untouched base, held
  whole by no corpus file (its 3-grams `in 8 8`, `8 8 2`, `8 2 9` stand in different findings files, meeting by chance), no row proposed
  by any seat (no repair-r3 header proposes one; rendering's own checks ran on keys 8, 9, 11, 12, not on *Judgment calls*). Our own
  section-pointer digits after an ordinary word — no list, table, grammar, palette or identifier: a false positive.
* **Reviewed allow rows: 1**, one block `# block: coherence/assemble-r3` appended by `reviewrows.py` (it asserts the attribution and that the
  final base line carries "| §8.8, §2.9 |" before writing). The allow file: 2 318 → 2 320 lines (header and row), sha256 `21f20148…` →
  `cc5afc8b…`. **Allow rows not dropped**: as in rounds 0–2, with an incomplete corpus a row matching nothing here may still be needed on
  the machine that holds the corpus, and the file is shared, so this seat only appends; a kept row hides no new hit (review is by exact text).
* **Volume information runs** (`volchecks.sh`: each volume and INDEX, whole document, `--heads` the matching base, untouched against
  installed; `volchecks-final.txt`): volume runs carry hundreds of unreviewed runs from before this pass and are not held to exit 0 (as in
  rounds 0–2). The installed volumes add 35 new distinct unreviewed pairs, all C3 runs of this round's block text (ordinary words, or
  section-pointer and item digits): V01 3, V02 7, V03 1, V04 4, V05 1, V06 8, V07 1, V09 7, V10 1, V11 2; V08, V12 and INDEX 0. No volume
  seat proposed a row, so none is appended; they are listed in `volchecks-final.txt` for those volumes' seats or the close.
* **The rationale (information; not held to exit 0):** C3 493 / 320 unreviewed before, 494 / 321 after (one run, "too large for the frame
  and", in rendering's new Part A entry J-A122.02, rationale l. 850);
  S2 17 / 15 before and after (`--heads` the base).

## 7. Bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md` (70 904 lines from 14 sources; 9 654 473 → 9 784 744 bytes,
sha256 `3fa0d849…` → `61d107d78ed868e8…`); `--check` reports it UP TO DATE (exit 0).

## 8. Review ids in design text (ROUND-3 NOTES (9) (c))

`reviewids.py` counts, in the live base, volumes and INDEX, the citations of review-process ids — adjudication-r3's R3-02 class: the
rulings `R<n>-nn` and every issue, conflict, wiring or inventory id the coherence pass's own records define (`verify-*.md`,
`adjudication-r*.md`, `inventory-*.md`, canon, agreement, edges, wiring; 8 465 tokens), less any token the design itself defines and the
design id families — outside the decision and request records (base: *Delegated decisions*, *Judgment calls*; volumes: §9 Decisions,
§10 Base change requests, §13 Fix list, Integration notes; anywhere: a J-, BCR-, X- or CVR- row). One design name is excluded by hand:
`M4-110`, V12 §3.9.1's named panel group (J-V12.45), which a record also uses as an id. Read-only: nothing was edited; the verifiers raise
the sites.

**Design-text sites: 14** (79 in the untouched set: base 8, V05 2, V08 6, V09 63). This round's blocks removed 65 (64 `R2-nn` citations
and one verifier id, in V08 and V09) and added none. **No `R2-nn` / `R3-nn` ruling id and no verifier issue id remains in design text**
(adjudication-r3's R3-02 "none" holds for those). The 14 left are the canon's and the inventories' conflict and wiring ids, all present
before this round:

| unit | line | id | context |
|---|---:|---|---|
| base | 6708 | DXC-06, KXC-02 | §4 plot rules: "… without values; DXC-06, KXC-02).** Every plot: `minPlotWidth` 2.5 m …" |
| base | 8972 | DWG-01 | §5: "8. **A bug abort ends in a defined state** (DWG-01)." |
| base | 9299 | DIC-02 | §6: "its own cap overrides the default (DIC-02: no concern's number of draws changes)" |
| base | 11348 | DWG-02 | §7 code comment: "shown before commit, recomputed on demand, never stored (DWG-02)" |
| base | 11419 | MC-11 | §7: "'roster.classes', 'siting.families', 'dossier.kinds', 'era' … (MC-11)" |
| base | 11460 | V12-XCONF-2 | §7: "never moves an output version (V12-XCONF-2; V11 §3.2.1 step 7 computes it so)" |
| base | 11644 | MC-11 | §7 code comment: "typed in §2.6 (MC-11) */" |
| V05 | 313 | MC-07 | V05 §2: "(file f item 251; MC-07: the island arena's own ring, no stored position)" |
| V05 | 685 | MC-05 | V05 §2 table: "`ContextVector.arena 'sky'` (§2.5, file f item 213; MC-05)" |
| V09 | 598 | V09-XAGREE-1 | V09 §2: "**The tables' shape** is V11 §4.2's (V09-XAGREE-1)" |
| V09 | 2120 | V06-AGREE-1 | V09 §4 table: "… V06 §3.19.3 (6) and V06 §4.2 (V06-AGREE-1)" |
| V09 | 3283 | V09-ICONF-4 | V09 §4: "one channel per cue (V09-ICONF-4's rule)" |
| V09 | 3844 | V09-ICONF-4 | V09 §5: "carries the goods family only (V09-ICONF-4)" |

(The base's line ranges: l. 6708 in §4, l. 8972 in §5, l. 9299 in §6, l. 11348 – 11644 in §7.) Inside the records 25 citations stand,
kept as records (V03 9, V09 15, V10 1). Full lists: `reviewids-final.tsv` and `reviewids-untouched.tsv`.

## 9. Not placed, and left for the verifier

* **Unplaced: nothing.** Every block of the eighteen files is applied and every ASSEMBLE NOTE is applied as written; no RULING REQUEST
  exists this round; no double REPLACE, so no merge conflict and no lost hunk.
* **Broken references: 0** (section 5); no mechanical fix was needed.
* **80 ambiguous-form references** (section 5, `ambiguous-refs.tsv`): read as the base's under S7; the verifier confirms each or prefixes it.
* **14 review-id sites in design text** (section 8): conflict and wiring ids of the canon and the inventories, all from before this round;
  for the verifiers under R3-02 (not edited here, as the brief directs).
* **Hand-offs between units** that the repair files record for round 4's verifiers (each header's HAND-OFFS list) are not assembly work.
* **Volume document checks:** 35 new volume hits without a proposed row (section 6, `volchecks-final.txt`) — for those volumes' seats or
  the close.
* **The document checks are provisional** (section 6): re-run them on the machine that holds the reference corpus; the one base row was
  reviewed against this checkout's smaller corpus.
* **Size:** the set at +7.0 % words against the pre-coherence archive, outside the shrink band (section 4); each repair file states what
  holds its unit.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the 15 live files' sha256 before (each equal to its HEAD blob at `920d280d`) and after (each equal to its final
copy); the eighteen repair files landed and committed; the routing of 202 blocks and the census (0 missing, 0 ambiguous, 0 unclosed, 0
RULING REQUEST, 0 overlap, 0 double REPLACE); 202 applied with audit not-OK 0 and balanced fences in every file; nine volume outputs equal to
their seats' recorded sha256 and two (V10, V11) to their recorded sizes, and kernel's stand-alone dry run reproduced; the three swaps by the
seats' own scripts (805 = 805, one id set, no duplicate) and V05's title-block substitution (old string once, new absent before); no heading
added, removed or retitled; the reference counts of section 5 with 0 broken and 0 fixes; the document checks' counts of section 6, exit 0
on every copy and key set and under four hash seeds, one corpus snapshot; the bundle regenerated and `--check` clean; the sizes of section
4; no duplicate id definition; the review-id census of section 8.
**PLAUSIBLE:** that the one reviewed C3 row is a false positive (attributed by script, read in context by this seat, no second reader);
that V09's output equals its generator's (the seat records no hash; its 18 blocks applied with audit 0 and its header's checks name no
other text); that the ambiguous-form references read as their authors meant (S7 reads them as the base's; not checked one by one); and
that the review-id census's token set is complete (it reads the ids the coherence records define as headings, first table cells or bold
labels, plus the `R<n>-nn` rulings; an id cited only in running text of a record would be missed).
