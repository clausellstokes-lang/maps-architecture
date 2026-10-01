# Assemble — coherence pass, round 2 (the eighteen repair-r2 block files applied to the base, the volumes, INDEX and the rationale)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r2 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r2`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob at 682e8e99); untouched snapshot — done
- P2 block inventory and routing (18 files, 410 blocks, 0 RULING REQUEST, 0 missing heading, 0 double REPLACE; the ASSEMBLE NOTES census) — done
- P3 apply (410 applied, 0 skipped, audit not-OK 0, every output = its seat's recorded dry run), the scripted hand-offs (scope's six Part A swaps and R25; ten R2-07 title-block substitutions in nine volumes), install (15 of 15) — done
- P4 references: 54 113 checked, 0 broken, 2 mechanical fixes (G-cite), 77 ambiguous-form listed — done
- P5 document checks, three-copy method: 21 reviewed base rows, exit 0 on every copy and key set; the volume seats' proposed rows (61) — done
- P6 bundle and `--check` — done
- P7 this report, the result file, LANDED — done

Status: COMPLETE. Every step ran as a script under `docs/validation/coherence/work/assemble-r2/` (`snapshot.py`, `route.py`, `apply.py` —
which runs `docs/validation/amendments-b/apply-blocks.py` unchanged —, `handoff.py`, `headings.py`, `install.py`, `mirror.sh` with
`refs.py` and `refsreport.py` (assemble-r1's, unchanged in logic), `fixrefs.py`, `checks.py`, `attrib.py`, `allowrows.py`, `volchecks.sh`,
`volrows.py`, `sizes.py`, `unitsizes.py`, `report.py`), most of them assemble-r1's with the round label and the scratch folder
(`scratchpad/coherence/asm2/`) changed; no live text was hand-edited. Their records sit beside them (`snapshot.json`, `blocks.json`,
`split/`, `logs/`, `apply.json`, `handoff.json`, `headings.json`, `install.json`, `fixrefs.json`, `ref-fixes.tsv`, `refs-summary.json`,
`ambiguous-refs.tsv`, `external-refs.tsv`, `checks.json`, `c3-attribution.tsv`, `vol-attribution.tsv`, `volrows.json`,
`volchecks-final.txt`, `vol-unreviewed-new.tsv`, `sizes.json`, `unitsizes.json`).

## Outcome

All eighteen repair files are applied: **410 blocks found, 410 applied, 0 skipped**. No file carries a
RULING REQUEST (none was expected, ROUND-2 NOTES (9) (b); 0 `=== RULING REQUEST` lines in the eighteen files), no heading was missing or
ambiguous, no block truncated, and no two blocks REPLACE one heading, so no three-way merge was needed. The audit finds every applied body
exactly once and fences balanced in every file, and every output is byte-identical to the result its repair seat recorded for its own dry run
(all twelve volumes, INDEX, and the base as scope's combined dry run of the six base files built it). The ASSEMBLE NOTES are applied as
written, each count-asserted: scope's six restated Part A rows swapped into place and its R25 sentence (the rationale then equals scope's
simulated `dd2bfafa…`; Part A 797 rows = the judgment index's 797, no duplicate id), and R2-07's owner-item range in the title blocks of V02, V04, V06,
V07, V08 (with R2-11's `DR44`), V09, V10, V11 and V12. **Nothing is unplaced.** The round adds nine headings (V02 §5.7, §6.6, §7.8,
§8.6; V03 §5.6; V04 §5.6; V06 §3.22, §3.23; V07 §5.6) and retitles twelve. The set (base and volumes) goes from 8 810.3 KB to 9 383.7 KB
(+6.5 % bytes, +6.6 % words): the repairs add owner items 120–126 at build depth and the round-1
findings' fixes. Of 54 113 references checked, **none is broken**; 2 were fixed mechanically (V12's two range ends, the G-cite
prefix); 77 resolve but are ambiguous in form (down from 82). Every forward citation of scope's round-2 bars (T120-n – T126-n,
T20-14 – T20-16) resolves. The document checks exit 0 on the untouched, new and combined copies over every top-level key and over the
eight `#` keys, against one corpus snapshot, after 21 reviewed allow rows — **provisional**, the reference corpus being incomplete in this
checkout; the combined document's total is 3 469 hits, 0 unreviewed. The bundle `docs/ARCHITECTURE-FULL.md` is regenerated and `--check` passes.

## 1. Live files — sha256 before and after

Before: the committed text at HEAD `682e8e998e4f` (each live file equal to its HEAD blob; assemble-r1's outputs, the base `137ecc0e…`
every repair file was written against). After: written by `install.py`, guarded on each live file still holding its P1 sha256 and each
verified byte-identical to its final copy; V12 then takes the two G-cite fixes of section 5 (`fixrefs.py`, guarded the same way).

| file | bytes before | bytes after | sha256 before | sha256 after |
|---|---:|---:|---|---|
| `docs/ARCHITECTURE.md` | 2 787 468 | 2 934 933 | `137ecc0e4fe12c4408eacf842770d1c428e5031cd8faad18e0a3f37b57d7d9b5` | `4ed292e94f2442e5db7cb25e3da110806f5c5e7ccb9037d6fe32375a51504f76` |
| `docs/ARCHITECTURE-RATIONALE.md` | 688 889 | 697 152 | `630da95935076a85bca38148d5c07208f6e3bf61c9648eefb15967351a8a2928` | `dd2bfafa96aba31b89a5f1a1afba6b48261653c0e889ed40e48a3155599a5ed0` |
| `docs/volumes/V01-neighbourhoods.md` | 492 604 | 516 483 | `1480993bec654309ab5bddc9186d5d0fc9d67d912d4dbdf08e95668161c826de` | `fb2d14965bdcae74be2f7d138804e64aafe2ed5569e53f1aeb5d07ed52ac1901` |
| `docs/volumes/V02-buildings.md` | 513 788 | 547 395 | `a11f04ccc93d0fcefbef0e58fd633b75a237db3ee1ed2186daf7f15534980a6d` | `c4d398371f6549f3c3b538ba0771170eb344e899f945f167cd5a29e23acca9a3` |
| `docs/volumes/V03-interiors.md` | 413 070 | 459 238 | `eda87a1c8cf0e84bca1431d21b30a948c4f35bddbc95c7cf2e25e2f4b009baeb` | `b015fd004576b4c1469fa91f4d40dc027c2842b5995aa06c9d52093129a6a157` |
| `docs/volumes/V04-underground.md` | 488 215 | 514 605 | `47c144776d2085a0bbc3b0f1c4dc89dfd4411dfef3d0faa9f9c035611a1ae856` | `2786cc53670c4db923fc1607e6b958a6ee9c8790d9fd075b76dcb3db1c7fb905` |
| `docs/volumes/V05-sky.md` | 394 900 | 398 211 | `b5f310b6269b2897d64e5688bab5415faaa691b88cfd62770d5f9a7945c4a84a` | `7617d87cff90221648d3152f847bad8a9c3926683066543ab69331edd764bf95` |
| `docs/volumes/V06-evolution.md` | 629 860 | 665 608 | `771887caa2d6ff6c8d815dc8200d0dd474c85e82f23f33d16ec05448922c88a3` | `d12c382be27e78351c5b0c020b8aae7432f888f6d67f5c32ec0571f31aa10e52` |
| `docs/volumes/V07-village.md` | 580 760 | 602 961 | `02f8dbb439bce4ae73e010022fc29a93e71f3e8944e0a6b3fbf8df01c8e2d6f8` | `8a4302dc1cd9f98d2cf06aa96aa3f4470f2fee6717c7af96ab6804b5bca28394` |
| `docs/volumes/V08-settlementforge.md` | 505 231 | 545 798 | `b96e79d8a7d84deb5c04fce37bd5cbb29e606f104d0ca9d14488f6b0b46df2d2` | `f92c2a85e2d098627d608acbe5c5d35414046ea3bf5ae5a8c4038b5b81854a47` |
| `docs/volumes/V09-application.md` | 659 614 | 738 871 | `c2dc5b806ac1fedf542478dfea7bfd2967c7bf63037448496fd301b0a147fe94` | `23398a30e3926569be252c029e1c11593c91e76d091977e6c262f71eee6c91ef` |
| `docs/volumes/V10-clerk.md` | 476 312 | 503 127 | `f8f591b329d79c6f8cf5bec915aeed5f5f56a59b9b0a7b4b20c1ffaff60eff29` | `6efb987b252f4536fdbed4aa8a30c8665543d8af4716f7635285f9866d39c993` |
| `docs/volumes/V11-content.md` | 626 514 | 668 876 | `9481453bcd0fd7577c4d0ac5b9766587adc01316a433c7ddce123ebf2539549d` | `7842179aaa80abfcf1e85dda0ab46c2fa6555b24c874527c2833c02a832b67b4` |
| `docs/volumes/V12-calibration.md` | 453 363 | 512 846 | `996dee3b5baba28b5658b300f85c0550adb5d798a00f353e28c51f4e755d6fa4` | `74a4bfb3b0a3841da8e40b2326f9bd336a75d665edd8680a476149bb5ff6f02a` |
| `docs/volumes/INDEX.md` | 23 960 | 24 049 | `9efc19e34883b52103ee7614578339544676ba8c17c45c9e9ecebd44d4927d8a` | `1774db18eb14cd3179d29569dc876b00b0d8ae1b603169e1dfa507bec88e83f0` |

Also written: `docs/ARCHITECTURE-FULL.md` (the bundle, section 7) and `docs/validation/doc-checks-allow.tsv` (two appended blocks, section 6).

## 2. Blocks — routing, application, audit

**Routing** (`route.py`). Each `repair-r2-<unit>.md` was cut at its `=== FILE <path> ===` lines; every block went to the file its
nearest FILE line above names, the base when none (13 FILE lines: one in each volume file, and scope's INDEX.md after its base blocks;
determinism, kernel, model, pipeline and rendering carry none). The split block files keep their repair file's basename, so
`apply-blocks.py` applies them in the round's name order (V01 … V12, determinism, kernel, model, pipeline, rendering, scope); the FILE
lines are left out (routing, not blocks) and every other line is verbatim. The base ran with the rationale; each volume and INDEX with a
throwaway rationale whose output equals its input (no J-ROWS or RATIONALE-A block routes to them). Everything under `work/` and the
bench files are working material, never blocks (ROUND-2 NOTES (1)).

**Census on the pre-round text** (`blocks.json`): 0 headings missing, 0 ambiguous, 0 blocks unclosed, 0 RULING REQUEST. Overlaps: only
nested pairs inside one unit — a child subsection's REPLACE followed, later in the same file, by an APPEND TO SECTION on its parent
that adds a new subsection at the parent's end (V02 #17–#19 with #20 on `## 5`, #22 with #23 on `## 7`, #24 with #25 on `## 8`; V03
#14–#17 with #25 on `## 5`; V04 #13–#15 with #16 on `## 5`; V06 #11–#22 with #23 on `## 3`; V07 #12–#15 with #16 on `## 5`), applied in
order, as each seat's own dry run did. **No double REPLACE**: the brief's `git merge-file` step (merge base: the live subsection
assemble-r1 installed) had nothing to merge and no conflict to report. No block named a heading that an earlier block of this round had
retitled (ROUND-2 NOTES (5)): every block was found on the text as it stood.

| unit | blocks found | applied | skipped | target | words of the covered text, before → after | KB before → after |
|---|---:|---:|---|---|---|---|
| V01 | 28 | 28 | 0 | `V01-neighbourhoods.md` | 44 910 → 48 826 (+8.7 %) | 267.7 → 291.0 |
| V02 | 28 | 28 | 0 | `V02-buildings.md` | 48 416 → 54 200 (+11.9 %) | 282.4 → 315.2 |
| V03 | 25 | 25 | 0 | `V03-interiors.md` | 49 069 → 56 998 (+16.2 %) | 279.9 → 325.0 |
| V04 | 24 | 24 | 0 | `V04-underground.md` | 57 801 → 62 258 (+7.7 %) | 344.3 → 370.1 |
| V05 | 10 | 10 | 0 | `V05-sky.md` | 24 898 → 25 435 (+2.2 %) | 141.2 → 144.4 |
| V06 | 33 | 33 | 0 | `V06-evolution.md` | 76 891 → 82 852 (+7.8 %) | 462.7 → 497.6 |
| V07 | 21 | 21 | 0 | `V07-village.md` | 60 581 → 64 220 (+6.0 %) | 357.1 → 378.8 |
| V08 | 38 | 38 | 0 | `V08-settlementforge.md` | 68 647 → 75 337 (+9.7 %) | 424.8 → 464.4 |
| V09 | 52 | 52 | 0 | `V09-application.md` | 98 042 → 110 885 (+13.1 %) | 577.3 → 654.7 |
| V10 | 28 | 28 | 0 | `V10-clerk.md` | 54 001 → 58 414 (+8.2 %) | 322.5 → 348.7 |
| V11 | 27 | 27 | 0 | `V11-content.md` | 72 109 → 79 183 (+9.8 %) | 423.4 → 464.7 |
| V12 | 24 | 24 | 0 | `V12-calibration.md` | 47 680 → 57 401 (+20.4 %) | 283.1 → 341.2 |
| determinism | 10 | 10 | 0 | `ARCHITECTURE.md` | 59 919 → 61 987 (+3.5 %) | 365.4 → 377.6 |
| kernel | 2 | 2 | 0 | `ARCHITECTURE.md` | 10 680 → 10 686 (+0.1 %) | 63.8 → 63.8 |
| model | 7 | 7 | 0 | `ARCHITECTURE.md` | 56 870 → 59 689 (+5.0 %) | 352.1 → 368.9 |
| pipeline | 18 | 18 | 0 | `ARCHITECTURE.md` | 93 348 → 96 768 (+3.7 %) | 570.7 → 591.9 |
| rendering | 19 | 19 | 0 | `ARCHITECTURE.md` | 58 873 → 69 884 (+18.7 %) | 347.6 → 408.6 |
| scope | 16 | 16 | 0 | `ARCHITECTURE.md`, `INDEX.md` | 73 692 → 81 730 (+10.9 %) | 442.0 → 488.9 |
| **total** | **410** | **410** | **0** | | | |

"Covered text": a REPLACE's section in the untouched file against the section of its body's heading in the installed file; an APPEND
counts its body; J-ROWS and RATIONALE-A count their rows (scope's 9 index rows and 15 Part A rows, 6 of them restated). Scope covers
the summary, §0.2, §1.1, §13.1, §13.2, §13.4, §13.8, §14, §16, Delegated decisions, Judgment calls, Staged, Appendix A, its index and
Part A rows, and INDEX.md (whole file: its level-1 REPLACE). The volume figures include the title-block substitutions inside covered
text only where a level-1 section is covered (none this round); V12's include the two G-cite fixes.

**Application** (`apply.py`, logs in `logs/`):

| target | found | applied | skipped | headings before → after | fence lines before → after | output sha256 (16) | the seat's recorded dry run |
|---|---:|---:|---:|---|---|---|---|
| `ARCHITECTURE.md` | 71 | 71 | 0 | 153 → 153 | 140 → 140 (balanced) | `4ed292e94f2442e5` | equal — scope's combined dry run of the six base files (`work/repair-scope-r2/dryrun.json`: `4ed292e94f2442e5`) |
| `INDEX.md` | 1 | 1 | 0 | 9 → 9 | 2 → 2 (balanced) | `1774db18eb14cd31` | equal — scope's dry run (`1774db18eb14cd31`) |
| `V01-neighbourhoods.md` | 28 | 28 | 0 | 123 → 123 | 14 → 12 (balanced) | `fb2d14965bdcae74` | equal — repair-r2-V01 l. 129 |
| `V02-buildings.md` | 28 | 28 | 0 | 73 → 77 | 14 → 16 (balanced) | `dad2b5bce0a72f00` | equal — repair-r2-V02 l. 113 |
| `V03-interiors.md` | 25 | 25 | 0 | 47 → 48 | 12 → 14 (balanced) | `b015fd004576b4c1` | equal — repair-r2-V03 l. 132 |
| `V04-underground.md` | 24 | 24 | 0 | 58 → 59 | 12 → 12 (balanced) | `a6647acf2da8a172` | equal — repair-r2-V04 l. 138 |
| `V05-sky.md` | 10 | 10 | 0 | 62 → 62 | 14 → 14 (balanced) | `7617d87cff902216` | equal — repair-r2-V05 l. 13, 74 |
| `V06-evolution.md` | 33 | 33 | 0 | 63 → 65 | 26 → 28 (balanced) | `03d1130a03035895` | equal — repair-r2-V06 l. 30, 86 |
| `V07-village.md` | 21 | 21 | 0 | 57 → 58 | 16 → 18 (balanced) | `cb663d471ad61b32` | equal — repair-r2-V07 l. 13 |
| `V08-settlementforge.md` | 38 | 38 | 0 | 63 → 63 | 20 → 18 (balanced) | `3d235466c526cd5c` | equal — repair-r2-V08 l. 33 |
| `V09-application.md` | 52 | 52 | 0 | 110 → 110 | 24 → 24 (balanced) | `cab49ee7245d6263` | equal — the seat's generator output (scratch `rV09r2/dry/V09.final.md`, byte-identical) |
| `V10-clerk.md` | 28 | 28 | 0 | 86 → 86 | 24 → 24 (balanced) | `6c871dc4d98a528e` | equal — repair-r2-V10 l. 100 |
| `V11-content.md` | 27 | 27 | 0 | 58 → 58 | 22 → 22 (balanced) | `db2ccf012142718e` | equal — repair-r2-V11 l. 193 |
| `V12-calibration.md` | 24 | 24 | 0 | 67 → 67 | 30 → 30 (balanced) | `5285ff5bdbe28e2e` | equal — repair-r2-V12 l. 34 |

Audit (each run): every applied body found exactly once in the output, not-OK 0. Fence lines fall in V01 (14 → 12) and V08 (20 → 18):
each a code block replaced by its citation, as the seat states (V01 §2.6's; V08 §3.15 (2)'s ts block, VM-R1T-07). INDEX's title block
changes: its one block is a level-1 REPLACE of the whole file (scope NOTE (4): the intro's R2-07 range, intended). The applier's
other notes, all expected and named by their repair files: the twelve retitles below, and the RATIONALE-A note "DUPLICATE ID inserted"
for scope's six restated rows (swapped below).

**New headings (ROUND-2 NOTES (9) (c))** — every heading this round adds, placed where its block puts it (`headings.py`, `headings.json`):

* `V02-buildings.md` l. 3016: `### 5.7 Ruin and disaster on the exterior (items 123 (d), 122)`
* `V02-buildings.md` l. 3242: `### 6.6 Ruin and disaster on the exterior (items 123 (d), 122)`
* `V02-buildings.md` l. 3669: `### 7.8 Ruin and disaster on the exterior`
* `V02-buildings.md` l. 3795: `### 8.6 Ruin and disaster in the build (items 123, 122)`
* `V03-interiors.md` l. 2638: `### 5.6 The damage layer — a decayed or ruined plan, and a disaster's look in it (items 123, 122 (d); J-V3.136 – J-V3.139)`
* `V04-underground.md` l. 2865: `### 5.6 Damage below ground — cellars, crypts and underground buildings (g item 123; J-V4.130)`
* `V06-evolution.md` l. 3286: `### 3.22 Crisis looks and the epoch path — the hand-over (item 122)`
* `V06-evolution.md` l. 3346: `### 3.23 The decay level of a building lineage (item 123)`
* `V07-village.md` l. 3387: `### 5.6 Crisis looks at the village rungs (item 122, the village's part; J-V7.146)`

**Retitled headings** (numbers kept; each by its own unit's REPLACE):

* `ARCHITECTURE.md`: "0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), 8–31 (`AMENDMENTS-2026-09-25b`), 32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`), 102–119 (file g) and the base change requests 200–585 (file f)" → "0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), 8–31 (`AMENDMENTS-2026-09-25b`), 32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`), file g's items and the base change requests 200–585 (file f)"
* `V08-settlementforge.md`: "2.8 Custom content — the records, the chains and the optional library input (item 104's host side)" → "2.8 Custom content — the records, the chains and the definition fields (item 104's host side)"
* `V08-settlementforge.md`: "3.11 The staged records, the per-settlement values, the realm block and the audience in use" → "3.11 The staged records, the per-settlement values and the audience in use"
* `V08-settlementforge.md`: "3.13 Custom content's arrival — records, keywords, chains, services and the library (item 104's host side)" → "3.13 Custom content's arrival — records, keywords, chains, services and the definition fields (item 104's host side)"
* `V08-settlementforge.md`: "3.16 The port side of items 111, 114, 115, 117, 118 and 120" → "3.16 The port side of items 111, 114, 115, 117, 118, 120, 122, 125 and 126"
* `V09-application.md`: "4.12 Touch, pen and small screens — decided" → "4.12 Touch, pen and window sizes — decided"
* `V09-application.md`: "4.21 Items 111–119 on screen" → "4.21 Items 111–126 on screen"
* `V10-clerk.md`: "3.9a The underground, the crypt and a plan's causes, explained (items 109, 110; J-V10.40)" → "3.9a The underground, the crypt, a plan's causes and its damage, explained (items 109, 110, 123; J-V10.40)"
* `V10-clerk.md`: "3.9b Water, a past, walls, grandeur, seasons, festivals and Find, explained (items 111, 113–118, 120)" → "3.9b Water, a past, walls, grandeur, seasons, festivals, Find and crises, explained (items 111, 113–118, 120, 122)"
* `V11-content.md`: "2.8d The row types of items 113–119" → "2.8d The row types of items 113–119 and 122–124"
* `V11-content.md`: "3.25 The rows of the owner's rules of 29 and 30 September (items 111, 113–119)" → "3.25 The rows of the owner's rules of 29 September to 1 October (items 111, 113–119, 122–124)"
* `V12-calibration.md`: "3.15 The owner rules 111–120 on the harness" → "3.15 The owner rules 111–126 on the harness"

No heading was removed. New numbered paragraphs the blocks add without a markdown heading (for instance V09 §4.21.12 – §4.21.14, V11
§3.25.9 – §3.25.11, V12 §3.15.12 – §3.15.16) are counted by the resolver: the set's numbered targets go from 1 274 to 1 298 and its defined ids
from 3 311 to 3 452 (section 5).

**RULING REQUEST blocks — 0.** No repair-r2 file carries one (`grep -c '^=== RULING REQUEST'` is 0 in all eighteen), so none is listed or
skipped; no `=== ` header line of any kind and no "RULING REQUEST" text is present in any live file after installation.

### 2.1 ASSEMBLE NOTES — the scripted hand-offs (`handoff.py`, `handoff.json`)

Each note a repair file addresses to Assemble, applied mechanically as written (ROUND-2 NOTES (9) (a)), count-asserted on the applied
copy (`asm2/out` → `asm2/final`; `out/` stays the "new" copy of the three-copy method). These are the only changes outside the blocks
besides section 5's two G-cite fixes.

1. **Scope, NOTE FOR ASSEMBLE (1)** — RATIONALE-A's last six rows restate existing Part A entries: each appended row takes its older row's
   place and the older row is deleted (assemble-r1's `swap_restated`, logic unchanged; the script stops unless the duplicate ids are
   exactly these six in Part A and none in the judgment index, whose rows scope's REPLACE changes in place). Swapped (older line ←
   appended line in the rationale): J-DET-11 (l. 111 ← l. 844); J-A20.71 (l. 327 ← l. 845); J-A113.61 (l. 805 ← l. 846); J-A114.01 (l. 828 ← l. 847); J-A568.01 (l. 802 ← l. 848); J-A76.41 (l. 635 ← l. 849).
   Result: Part A 797 rows, index 797 rows, the same id set (equal), no duplicate in either.
2. **Scope, NOTE FOR ASSEMBLE (2)** — R2-18 (e) / VEL0-01: the quoted sentence under "#### R25 — §7.7 → J-DET-11" in the rationale's Part F
   (rationale l. 1895), replaced once by the exact strings of `work/repair-scope-r2/dryrun.py` (`R25_OLD` → `R25_NEW`, imported, not
   retyped): "… a host that must override a lock sends an unlock first, and the log records it." → "… a host's map event that must override
   a lock sends an unlock first, which the log records; a dossier event is never refused by a lock — it supersedes the lock on what it
   changes, the lock reported orphaned (§7.7's precedence; items 20, 22)." With 1 and 2 the rationale's sha256 is `dd2bfafa96aba31b…`, the
   value scope's dry run simulated (`rationale_sha_after_swap`).
3. **Scope, NOTES (3)–(5)** — information, checked: (3) the §0.2 REPLACE retitles its heading (listed above; nothing cites the heading's
   text); (4) the INDEX block replaces INDEX.md's level-1 section, i.e. the whole file (applied; title block changed as intended); (5) its
   19 reviewed C3 rows — appended in section 6, each matched to a hit.
4. **R2-07 title blocks** — text inside a volume title's level-1 subsection, which R2-07 gives to Assemble to set in place (adjudication-r2
   R2-07: "A list that means *every* owner item of file g states no upper number"; not a marker line, principle (8) untouched). Each old
   string exactly once in the title block (the text above the first `## `), the new one absent there before; a string crossing a hard
   line break keeps the break before the same word; no line added or removed:

| volume | line | old | new | asked by |
|---|---:|---|---|---|
| `V02-buildings.md` | 7 | owner items 1–101, file g 102–120, file f 200–585 | owner items 1–101, file g, file f 200–585 | repair-r2-V02.md header, ASSEMBLE NOTE (R2-07; VV12-r1-06): line 7 — replace the one occurrence of 'owner items 1–101, file g 102–120, file f 200–585' with 'owner items 1–101, file g, file f 200–585' |
| `V04-underground.md` | 9–10 | items 1–120 the ⏎ owner's rules (item 112 the program's, under J122), items 200 and above file f's | items numbered below 200 the ⏎ owner's rules (item 112 the program's, under J122), items 200 and above file f's | repair-r2-V04.md header, HAND-OFFS, 'Assemble (R2-07 …)': the reading note's 'items 1–120 the owner's rules (item 112 the program's, under J122), items 200 and above file f's' in R2-07's form reads 'items numbered below 200 the owner's rules (item 112 the program's, under J122), items 200 and above file f's' |
| `V06-evolution.md` | 10 | items 1–119 the owner's | items below 200 the owner's | repair-r2-V06.md header, ASSEMBLE NOTE (R2-07): l. 10's 'items 1–119 the owner's' reads 'items below 200 the owner's' |
| `V07-village.md` | 10 | items 1–120 the owner's, items 200 and | items below 200 the owner's, items 200 and | repair-r2-V07.md header, NOTE FOR ASSEMBLE (R2-07): head l. 10, 'items 1–120 the owner's, items 200 and' → 'items below 200 the owner's, items 200 and' |
| `V08-settlementforge.md` | 10 | items 1–120 the owner's | items below 200 the owner's | repair-r2-V08.md header, ASSEMBLE NOTE (R2-07): l. 10–11's 'items 1–120 the owner's' reads 'items below 200 the owner's' |
| `V08-settlementforge.md` | 15 | `DR1`–`DR43` | `DR1`–`DR44` | repair-r2-V08.md header, ASSEMBLE NOTE (R2-07, R2-11): l. 15's '`DR1`–`DR43`' reads '`DR1`–`DR44`' (R2-11's DR44) |
| `V09-application.md` | 11 | 102–119 file g's owner and program rules, | file g's items, from 102, its owner and program rules, | repair-r2-V09.md header, HAND-OFFS, 'Assemble (R2-07)': the title block's '… 102–119 file g's owner and program rules, 200 and above file f's'; in R2-07's form the g clause states no upper number ('file g's items, from 102, its owner and program rules') |
| `V10-clerk.md` | 12 | items 1–120 the owner's instructions and file g's rules | items below 200 the owner's instructions and file g's items | repair-r2-V10.md header, ASSEMBLE NOTE (R2-07): l. 12's 'items 1–120 the owner's instructions and file g's rules'; in R2-07's form it names no upper number for file g (the note's own wording: 'items below 200 the owner's instructions and file g's items') |
| `V11-content.md` | 11–12 | items 1–101 the owner's instructions, 102–120 ⏎ file g's owner and program rules | items 1–101 the owner's instructions, ⏎ file g's items the owner's and program rules | repair-r2-V11.md header, ASSEMBLE NOTE (R2-07): l. 12's 'items 1–101 the owner's instructions, 102–120 file g's owner and program rules' reads 'items 1–101 the owner's instructions, file g's items the owner's and program rules' |
| `V12-calibration.md` | 8 | 1–101 the owner's instructions, 102–120 file g's owner and program rules, 200 and | 1–101 the owner's instructions, file g's items, from 102, its owner and program rules, 200 and | repair-r2-V12.md header, ASSEMBLE NOTE (R2-07): line 8's '1–101 the owner's instructions, 102–120 file g's owner and program rules, 200 and above file f's' reads '1–101 the owner's instructions, file g's items, from 102, its owner and program rules, 200 and above file f's' |

   V10's note gives its new wording as an example ("e.g. …"); it is the only wording the note gives, applied verbatim. V04's and V09's
   requests stand in their HAND-OFFS lists, addressed "Assemble (R2-07 …)", and are applied the same way. V01's header records
   "ASSEMBLE NOTE: none"; V03, V05 and the base units other than scope address nothing to Assemble beyond their proposed allow rows
   (pipeline's and rendering's S2 rows, V03's, V07's, V08's and V10's rows; section 6).

## 3. The rationale

Scope's RATIONALE-A block appended 15 Part A entries (9 new: J-A116.02, J-A120.01 – J-A126.01 and J-A568.05; 6 restated: J-DET-11, J-A20.71, J-A113.61, J-A114.01, J-A568.01, J-A76.41,
swapped into place as above); its J-ROWS block appended the 9 matching judgment-index rows, and its REPLACE of the judgment index changed
the restated ids' rows in place. `docs/ARCHITECTURE-RATIONALE.md`: 688 889 → 697 152 bytes, 116 315 → 117 741 words;
Part A and the index both hold 797 entries with one id set and no duplicate. No other block routes to the rationale; each volume
run's throwaway rationale output is byte-identical to its input.

## 4. Sizes

| unit | bytes before | bytes after | change | words before | words after | change | KB before → after |
|---|---:|---:|---:|---:|---:|---:|---|
| base | 2 787 468 | 2 934 933 | +5.3 % | 450 409 | 475 256 | +5.5 % | 2722.1 → 2866.1 |
| V01 | 492 604 | 516 483 | +4.8 % | 80 754 | 84 670 | +4.8 % | 481.1 → 504.4 |
| V02 | 513 788 | 547 395 | +6.5 % | 85 913 | 91 696 | +6.7 % | 501.7 → 534.6 |
| V03 | 413 070 | 459 238 | +11.2 % | 70 149 | 78 078 | +11.3 % | 403.4 → 448.5 |
| V04 | 488 215 | 514 605 | +5.4 % | 79 203 | 83 662 | +5.6 % | 476.8 → 502.5 |
| V05 | 394 900 | 398 211 | +0.8 % | 66 710 | 67 247 | +0.8 % | 385.6 → 388.9 |
| V06 | 629 860 | 665 608 | +5.7 % | 102 706 | 108 668 | +5.8 % | 615.1 → 650.0 |
| V07 | 580 760 | 602 961 | +3.8 % | 96 143 | 99 783 | +3.8 % | 567.1 → 588.8 |
| V08 | 505 231 | 545 798 | +8.0 % | 79 800 | 86 491 | +8.4 % | 493.4 → 533.0 |
| V09 | 659 614 | 738 871 | +12.0 % | 109 155 | 122 001 | +11.8 % | 644.2 → 721.6 |
| V10 | 476 312 | 503 127 | +5.6 % | 76 999 | 81 413 | +5.7 % | 465.1 → 491.3 |
| V11 | 626 514 | 668 876 | +6.8 % | 104 792 | 111 867 | +6.8 % | 611.8 → 653.2 |
| V12 | 453 363 | 512 846 | +13.1 % | 73 495 | 83 219 | +13.2 % | 442.7 → 500.8 |
| INDEX | 23 960 | 24 049 | +0.4 % | 4 026 | 4 049 | +0.6 % | 23.4 → 23.5 |
| rationale | 688 889 | 697 152 | +1.2 % | 116 315 | 117 741 | +1.2 % | 672.7 → 680.8 |
| **base + volumes** | 9 021 699 | 9 608 952 | +6.5 % | 1 476 228 | 1 574 051 | +6.6 % | 8810.3 → 9383.7 |
| **volumes** | 6 234 231 | 6 674 019 | +7.1 % | 1 025 819 | 1 098 795 | +7.1 % | 6088.1 → 6517.6 |
| **base + volumes + INDEX** | 9 045 659 | 9 633 001 | +6.5 % | 1 480 254 | 1 578 100 | +6.6 % | 8833.7 → 9407.2 |

Every unit grows: this round writes the owner rules that reached the program after the canon (items 120–126, routed by the dated
rulings) at build depth as new design, and the round-1 findings' fixes; the assembler may not
compress text, and each repair file states its words by source and what holds its growth (owner-item design, the guard of principle (9)).
Against the shrink goal's band (25–40 % fewer words than the pre-coherence archive, 1 491 685 words for base and volumes), the set
now stands at 1 574 051 words (+5.5 % against the archive). No unit shrank by more than half (none shrank).
Duplicate id definitions across the set (principle (4); the judgment index, Part A, D-n, T-ER, every volume's T-Vn-m and J-Vn.m rows,
`_integrate.md`'s J-VI rows): **none**.

## 5. References

assemble-r0's resolver (`refs.py`, citation form canon S7: a bare `§x` is the base's, a volume's section `Vnn §x` everywhere), unchanged
but for its root, run on two mirror trees (`mirror.sh`): the untouched set and the final set, each with `_integrate.md`, files f and
g, `research/` and `docs/volumes/critique/` linked in. Every `§x`, `§x.y`, `§x.y.z`, `Vnn §x`, `INDEX §n`, `II.n`, `D-n`, `J-…` and
`T-…`, lines read joined, against the headings and ids that now exist (numbered targets: base 147, V01 121, V02 99, V03 53, V04 66, V05 60, V06 135, V07 56, V08 61, V09 128, V10 84, V11 153, V12 127, INDEX 8; 3 452 defined ids, up from 3 311). All eighteen files were applied before the run (ROUND-2 NOTES (9) (d)).

| class | untouched set | final set | meaning |
|---|---:|---:|---|
| resolved | 49 569 | 53 898 | the target exists |
| external | 130 | 131 | a § list headed by another document, or a J-id of another record |
| ambiguous | 82 | 77 | a bare `§x` continuing a volume's list where both the base and that volume have §x: resolves as the base's under S7; listed |
| resolved-form | 6 | 6 | resolves; written `volume n §x` or `V6 §x` (INDEX §8 quotes the old forms) |
| resolved-generic | 1 | 1 | INDEX §2's "each volume's §1b" |
| FIX | 0 | 0 | a bare `§x` only one volume of its list has — the mechanical G-cite prefix |
| BROKEN | 0 | 0 | no target |
| **total** | 49 788 | 54 113 | |

**Broken: 0** (before and after). Every citation of the round-2 bar ids scope writes — T120-n … T126-n and T20-14 – T20-16, which the
volume and base repair files cite forward (R2-35) — resolves: 644 citations of 46 distinct ids, base 345, V01 4, V02 4, V03 21, V04 25,
V05 9, V06 9, V07 8, V08 29, V09 47, V10 2, V11 11, V12 130.

**Mechanical fixes: 2** (`fixrefs.py`, assemble-r0's logic; `ref-fixes.tsv`). The first run of the final set found 2 references
of class FIX, both in V12's new text: the second end of the range "V12 §3.15.11 – §3.15.16" (X-V12-20, V12 l. 3402, and V12 §12's last
paragraph, l. 3504), a bare `§3.15.16` that no base heading has and only V12 (the range's head volume) has. The rename every volume
rewrite records (G-cite, canon S7; V12's *Id rulings*: every section of a list carrying its prefix, self-references included) is the
class assemble-r0 fixed mechanically (488) under this same brief wording and assemble-r1 counted as its mechanical class; each fix
inserts "V12 " before the `§` ("V12 §3.15.11 – V12 §3.15.16"). Scope's header had recorded both ("2 FIX are V12's own"). After the fixes
the resolver finds both resolved and no other class moved. V12: `1428f0ef5e147158…` → `74a4bfb3b0a3841d…`. No repair file records a renumbering.

**Ambiguous form: 77** (from 82), listed in `ambiguous-refs.tsv` (unit, line, reference, the list's head volume, context): base 14, V01 15, V02 12, V03 12, V04 1, V05 3, V06 3, V09 6, V10 3, V11 6, V12 2 — each resolves under S7; the verifier confirms each or prefixes it.
**External: 131** (bare 120, bare-cont 1, J 10), listed in `external-refs.tsv`.

## 6. Document checks (three-copy method, one corpus snapshot)

`python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "<keys>"` with `docs/validation/doc-checks-allow.tsv`, on three
copies against one corpus snapshot (`checks.py`): **untouched** (the live base before this round, sha256 `137ecc0e…`), **new** (the
blocks applied, before the assembler's own changes) and **combined** (the installed text; the hand-offs and fixes touch only the rationale
and volumes, so for the base new = combined, byte for byte). Two key sets: (a) the 34 top-level heading keys `ARCHITECTURE,The whole
design,0,PART I,1,…,17,PART II,II.1,…,II.7,PART III,Delegated decisions,Judgment calls,Staged,Appendix A` — the brief's command; the
parent keys span their children, so their C3 and C4 hits count twice — and (b) the eight `#` keys, which partition the document. The
corpus fingerprint (path, size and mtime of the 128 files doc_checks reads) is equal before and after every run (`b2f7e5c5fd256d59…`).

**The corpus is incomplete here.** doc_checks prints: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any freeze". Every count below is PROVISIONAL (ROUND-2 NOTES (6)).

| copy | run | C1 | C2 | C3 | C4 | S1 | S2 | exit |
|---|---|---|---|---|---|---|---|---|
| untouched (a) | first | 5 / 0 | 1 / 0 | 3202 / 0 | 12 / 0 | 0 / 0 | 183 / 0 | **0** |
| untouched (b) | first | 5 / 0 | 1 / 0 | 1657 / 0 | 6 / 0 | 0 / 0 | 183 / 0 | **0** |
| new (a) | first | 5 / 0 | 1 / 0 | 3243 / 38 | 12 / 0 | 0 / 0 | 208 / 4 | 1 |
| new (b) | first | 5 / 0 | 1 / 0 | 1677 / 19 | 6 / 0 | 0 / 0 | 208 / 4 | 1 |
| combined (a) | first | 5 / 0 | 1 / 0 | 3243 / 38 | 12 / 0 | 0 / 0 | 208 / 4 | 1 |
| combined (b) | first | 5 / 0 | 1 / 0 | 1677 / 19 | 6 / 0 | 0 / 0 | 208 / 4 | 1 |
| untouched (a) | final | 5 / 0 | 1 / 0 | 3202 / 0 | 12 / 0 | 0 / 0 | 183 / 0 | **0** |
| untouched (b) | final | 5 / 0 | 1 / 0 | 1657 / 0 | 6 / 0 | 0 / 0 | 183 / 0 | **0** |
| new (a) | final | 5 / 0 | 1 / 0 | 3243 / 0 | 12 / 0 | 0 / 0 | 208 / 0 | **0** |
| new (b) | final | 5 / 0 | 1 / 0 | 1677 / 0 | 6 / 0 | 0 / 0 | 208 / 0 | **0** |
| **combined** (a) | final | 5 / 0 | 1 / 0 | 3243 / 0 | 12 / 0 | 0 / 0 | 208 / 0 | **0** |
| **combined** (b) | final | 5 / 0 | 1 / 0 | 1677 / 0 | 6 / 0 | 0 / 0 | 208 / 0 | **0** |

(hits / unreviewed.) The combined document's final run exits 0 on both key sets, and again under `PYTHONHASHSEED` 0, 1, 2 and 12345
(the same counts); its total over the 34 keys is **3 469 hits** (C1 5, C2 1, C3 3243, C4 12, S1 0, S2 208), 0 unreviewed. The untouched
copy is round 1's clean state (exit 0 before and after). The first run's 38 unreviewed C3 lines under (a) (19 under (b)) and 4 S2 lines are
21 distinct hits, all new text of this round's base blocks; none is in the untouched base.

* **Corrected: none** (no S1 table fault, no mechanical hit).
* **Reviewed allow rows (base): 21**, one block `# block: coherence/assemble-r2` appended to the allow file (C3 19, S2 2). Each hit is
  new text carried by the repair block of the seat that wrote it, each with the reviewed row that seat proposed in its header: scope's 19
  `# ALLOW C3` rows (its NOTE (5)), each a chain of our own section-pointer digits, item, volume and person-week numbers with an ordinary
  word, held whole by no corpus file; and the S2 pointers `§6.8` (pipeline §4.11 *The clock* (4), rendering §12.1 ×2; proposed by
  pipeline and rendering) and `§4.19` (rendering §11.3; proposed by rendering) — the script checked that every occurrence of each in the
  base carries its volume prefix ("V06 §6.8", "V09 §4.19"); S2 reads the base's headings only, and `refs.py` resolves both in their
  volumes. `attrib.py` re-checked each (`c3-attribution.tsv`: the final base line and subsection, absence from the untouched base, the
  carrying repair file, the corpus files holding the run whole — none). None is a reference list, table, grammar, palette or identifier.
* **The volume seats' proposed rows.** V03, V07, V08 and V10 proposed reviewed rows "for the assembler" (V03 and V07 as rows; V08 and
  V10 as listed runs with a shared reason). Information runs (`volchecks.sh`: each volume and INDEX, whole document, `--heads` the matching
  base, untouched against installed) give the new unreviewed hits; every new hit of V03 (33), V07 (9), V08 (13) and V10 (7) matches a
  proposed row (`volrows.py`, `vol-attribution.tsv`), and the 61 distinct rows (V07's and V08's shared run "stands in the view s" once)
  are appended as a second block `# block: coherence/assemble-r2 (volumes)` — each new text of that volume's block, absent from the
  untouched volume, held whole by no corpus file, or read in context: three runs span a pointer and the next heading's number or sit in
  a code comment (V03 "5 6 5 5 5", l. 2575; V08 "5 1 2 3 the", l. 494; V10's own "§10.2 … §2.9's", "10 2 2 9 s", l. 1002), their reasons
  say so. The other 144 new volume hits have no proposed row and stay unreviewed, listed in `vol-unreviewed-new.tsv`: V01 15, V02 27,
  V04 18, V06 18, V09 32, V11 20, V12 14 (C3 runs of the new text, each seat's header recording them as reviewed ordinary words or
  pointer digits without proposing rows). Volume runs are information: they carry hundreds of unreviewed runs from before this pass and
  are not held to exit 0 (as in rounds 0 and 1). Installed volumes' counts are in `volchecks-final.txt`.
* The allow file: 2 234 → 2 318 lines (two appended blocks, 21 + 61 rows), sha256 `6f49c459…` → `21f20148…`.
  **Allow rows not dropped.** As in rounds 0 and 1: with an incomplete corpus a row matching nothing here may still be needed on the
  machine that holds the corpus, and the file is shared, so this seat only appends; a kept row hides no new hit (review is by exact text).
* **The rationale (information; not held to exit 0):** C3 484 / 311 unreviewed before, 493 / 320 after (nine runs in scope's Part A
  rows); S2 17 / 15 before and after (`--heads` the base).

## 7. Bundle

`python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md` (70 299 lines from 14 sources; 9 067 131 → 9 654 473 bytes, sha256 `3fa0d8490a914f53…`); `--check` reports it up to date (exit 0), and again
after the last check of this report.

## 8. Not placed, and left for the verifier

* **Unplaced: nothing.** Every block of the eighteen files is applied and every ASSEMBLE NOTE is applied as written; no RULING REQUEST
  exists this round.
* **Broken references: 0** (section 5); 2 mechanical G-cite fixes in V12.
* **77 ambiguous-form references** (section 5, `ambiguous-refs.tsv`): read as the base's under S7; the verifier confirms each or prefixes it.
* **Hand-offs between units** that the repair files record for round 3's verifiers (each header's HAND-OFFS list: for instance
  rendering's note that `ExportOpts` is declared nowhere in the set, V07's note on §10.2 (d)'s carriageway exception, scope's note that
  rendering's round-2 judgments 1–11 may take index rows) are not assembly work: they stand in the repair files for the next verify round.
* **Volume document checks:** 144 new volume hits without a proposed row (V01, V02, V04, V06, V09, V11, V12; section 6,
  `vol-unreviewed-new.tsv`) — for those volumes' seats or the close.
* **The document checks are provisional** (section 6): re-run them on the machine that holds the reference corpus; the 21 base rows and
  61 volume rows were reviewed against this checkout's smaller corpus, and a fuller corpus can lengthen or split runs.
* **Size:** the set at +5.5 % words against the pre-coherence archive, outside the shrink band (section 4); each repair file
  states what holds its unit (owner items 120–126 at build depth).

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the 15 live files' sha256 before (each equal to its HEAD blob) and after (each equal to its final copy); the
routing of 410 blocks and the census (0 missing, 0 ambiguous, 0 unclosed, 0 RULING REQUEST, 0 double REPLACE); 410 applied with audit
not-OK 0 and balanced fences in every file; the outputs equal to the fourteen results the repair seats recorded (twelve volumes, INDEX,
the base); the six Part A swaps (797 = 797, no duplicate) and the R25 substitution (rationale = scope's simulated `dd2bfafa…`); the ten
title-block substitutions, each old string once and the new absent before; the nine new and twelve retitled headings; the reference
counts of section 5 with 0 broken and the two G-cite fixes; the document checks' counts of section 6, exit 0 on every copy and key set
and under four hash seeds, one corpus snapshot; the bundle regenerated and `--check` clean; the sizes of section 4; no duplicate id
definition.
**PLAUSIBLE:** that each of the 21 base rows and 61 volume rows is a false positive (each attributed by script and proposed by the seat
that wrote the text; the three boundary runs read once in context by this seat, no second reader); that V10's example wording ("e.g.") is
the form its seat meant (it is the only one the note gives); and that the ambiguous-form references read as their authors meant (S7 reads
them as the base's; not checked one by one).
