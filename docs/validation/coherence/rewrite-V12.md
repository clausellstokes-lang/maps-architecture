# Rewrite — design volume V12 (calibration)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V12; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V12`, 2026-09-30, cloud)
- P1 inputs gathered (canon unit V12, conflicts, f/g routing, wiring, elegance, ids, hand-offs, edges, inventory): done
- P2 head, §0, §1, §1b: done
- P3 §2 (records; §2.11 one table; §2.13 the pins; §2.14 the trial): done
- P4 §3 (with §3.15 items 111–119 and §3.16 edges and combinations): done
- P5 §4–§6: done
- P6 §7–§8: done
- P7 §9–§13 and the Integration notes: done
- P8 assemble, verify ids, references, terms, sizes: done
- P9 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V12-calibration.md` (3,566 lines, md5 0cada4c8472afcff2ab3181cf5a99dc9). Output:
`docs/validation/coherence/new/volumes/V12-calibration.md` (3,106 lines, md5 d4d94c1e98f84310b7f4e2afd1ca4944), assembled from the 25 parts in
`docs/validation/coherence/work/rewrite-V12/parts/` in name order (`cat parts/*.md`). Scripts: `work/rewrite-V12/mapping.py`
(the mapping table below), `work/rewrite-V12/report.py` (this report). Same title line and section structure (§0, §1, §1b,
§2 – §13, the Integration notes); one marker line under the title; the ledgers, banners and the finalization ledger removed.

## 1 Sizes and the shrink goal

| | words (whitespace split) | bytes | KB |
|---|---|---|---|
| source | 76,414 | 482,479 | 471.2 |
| rewrite | 69,784 | 430,397 | 420.3 |
| change | -6,630 (-8.7 %) | -52,082 (-10.8 %) | |

The canon's goal band (45 848 – 57 310 words) is **not reached**: the net change is -8.7 %. This is irreducible content,
not a defect, for two reasons, each measured below.

1. **What was cut is about 22 % of the source** (≈ 17 000 words, PLAUSIBLE estimate from the per-section counts): narration
   ≈ 9 300 (the eight banners and six ledgers of the head; §12's per-round CONFIRMED paragraphs with other volumes' md5s;
   §13's round dispositions by seam id; round headers, SCC ids and superseded wordings in rows, comments and decisions);
   restatement ≈ 5 500 (§10's 22 request bodies → one pointer table, 4 576 words; §1's §13.5 and §17.1 restatements →
   pointers; the off values of the pins (E-20); the raised-way minima; item 500's `D5Pair` variants; §17.1 (8)'s method
   citations); duplicated mechanisms ≈ 650 (E-35: §1b's producer and consumer lists); verbose prose ≈ 1 500. The canon's
   own counts bound what is reducible: narration ranges 8 203 words, 2 restatements to references and 10 BCR blocks. The
   rest of the source is the harness's types, rules, bar map, register lines, tests and decisions, each stated once.
2. **New design had to be added (≈ 10 200 words)** — the canon routes it here: file g items 111–119 at build depth
   (§3.15, 1 922 words; their metric, register-line, pin, budget and build rows across §2.13, §3.4, §3.11, §6 and §8,
   ≈ 2 500; T-V12-42 – T-V12-51, 875; J-V12.84 – J-V12.96, 864; §2.14, 197), the edge and combination catalogue
   (§3.16, 1 956; 51 edges and 17 combinations), the hand-off closures (the *closed at* column of §10.2 and §10.3, ≈ 1 400)
   and J122's sittings and build order (≈ 400).

Per top-level section (words):

| section | source | rewrite | change |
|---|---|---|---|
| the head (title, banners, ledgers / marker line, How to read) | 1,548 | 224 | -1,324 |
| §0 In plain words | 1,050 | 925 | -125 |
| §1 Scope and the base hooks | 1,423 | 1,207 | -216 |
| §1b Wiring table | 2,486 | 1,509 | -977 |
| §2 Data model | 10,754 | 11,465 | +711 |
| §3 The harness pipeline (incl. new §3.15, §3.16) | 27,852 | 33,028 | +5,176 |
| §4 Editing | 1,099 | 1,159 | +60 |
| §5 Rendering, labels, exports | 931 | 1,108 | +177 |
| §6 Performance budgets | 1,092 | 1,300 | +208 |
| §7 Tests and acceptance bars | 4,620 | 5,693 | +1,073 |
| §8 Build plan | 1,643 | 1,843 | +200 |
| §9 Decisions | 7,628 | 7,216 | -412 |
| §10 Base change requests (pointer table and hand-offs) | 6,489 | 1,913 | -4,576 |
| §11 Owner questions | 357 | 211 | -146 |
| §12 CONFIRMED versus PLAUSIBLE | 2,918 | 769 | -2,149 |
| §13 Fix list | 4,113 | 73 | -4,040 |
| Integration notes | 191 | 141 | -50 |
| the finalization ledger | 220 | 0 | -220 |

## 2 Inputs and routing

The canon's unit V12 (`canon.md` *### V12*), the conflict rulings it names, the file f items that concern it, the dated
rulings routing file g items 111–119 (J130), the wiring rows W-IF-04 and W-IF-05, the elegance rulings E-20, E-24, E-35,
E-37 and E-38, the id rulings ID-BCR, ID-JT and ID-WX, the agreement matrix rows (T-V6-62, T-V11-18), the 11 hand-offs
to close, the edge catalogue (40 UNDEFINED, 11 UNTESTED) and 17 combinations, and the 34 open findings. Base sections
were read at their text with files f and g applied; the sibling volumes as landed in `new/volumes/` (V11 from
`docs/volumes/`, its rewrite still running). Working notes: `work/rewrite-V12/routing.md`.

## 3 File f and g items (cited as base text, never restated)

**File f items cited** (34): 229, 291, 376, 377, 381, 382, 447, 456, 488, 489, 491, 492, 493, 495, 496, 497, 498, 499, 500,
501, 502, 503, 504, 521, 522, 529, 533, 535, 536, 537, 568, 569, 575, 584 — every one named at the place that reads it
(e.g. 496 at `Baseline`, 500 at the panel engine, 447 at the export reading rule, 568 at §8.1 where the volume states no
total of its own; the source's "base-side total" row is removed by item 568). **BCR-V12-1 – BCR-V12-22** → V12 §10.1's
pointer table, each to its applied item (496, 497, 503, 504, 381, 500, 491, 535, 533, 521, 569, 501, 488, 502, 447, 489,
447, 536, 492, 493, 537, 382); none is superseded; BCR-V12-4's row cites J122's adoption rule (V12-XCONF-5).

**File g items written here** (the NEW OWNER RULES 111–119, by the dated rulings; V12's part is "the bars and how each is
measured"):

| item | where | what V12 writes | test / decision |
|---|---|---|---|
| 111 | V12 §3.15.1; §3.6b bar map; §3.11; §2.13 | `T111d.walk` (`higherWith` on a per-household walk-to-water indicator, deflated per instance), `T111d.water.<kind>` (rate rows per water kind), `T111d.rich` (`most`); metrics `water.kinds`, `water.walkShare`, `water.distByBand`; the register lines of the oasis, grove and garden rows and the arid chances; item 111's `NoOpPin` | T-V12-44; J-V12.90 |
| 112 | V12 §2.14; §3.15.2; §3.11 | the game-master trial's findings entered through V09 §7.6's `TrialRecord` (`plat calibrate register --trial`, `trial` history rows; never a second record type); the style check's register line (T112-1 at M3b) | T-V12-45; J-V12.88 |
| 113 | V12 §3.15.3; §3.6b (`exactScript`); §6; §3.11 | `T113e.lost` (the LOST / refound property as a step script with author steps); the item-113 register line (`measure` at `V6-E9`, then `corpus` E4); the history replay's budget row; T113-7 as a `NoOpPin` | T-V12-46; J-V12.89 |
| 114 | V12 §3.15.4 | `T114g.oldestFirst`, `.sustained`, `.greyscale`, `.generation`; metric `wall.condition`; the register lines of the decay and recovery rows | T-V12-47; J-V12.89, J-V12.91 |
| 115 | V12 §3.15.5; §2.13 | `bldg.grandeur`; the `rungScope` pin `item115.ceiling` | T-V12-48 |
| 116 | V12 §3.15.6 | `view.limitStop` | T-V12-48 |
| 117 | V12 §3.15.7; §2.13 | `T117i.crowns`, `.leafCover`, `.arid`, `.ice`, `.styles`; `season.*` metrics; the `view` pin `item117.season` | T-V12-49 |
| 118 | V12 §3.15.8; §2.13 | `T118h.window`, `.stable`, `.tier`, `.stage`; `festival.*` metrics; the `view` pin `item118.festival` | T-V12-49 |
| 119 | V12 §3.15.9; §6; §8.3 risk 14 | the `wait.*` timings click to complete (p95 ≤ 10 s comfort level at every rung's top and the cap), progress within one second, the measured-gain check over §12.10's register rows, the interaction rows unchanged; §12's laws stay the targets | T-V12-50; J-V12.92 |

Base bar ids exist for items 111–113 (T111-1 – T111-5, T112-1 – T112-2, T113-1 – T113-7, `new/base/scope`); V12 cites
them. Items 114–119 have none in the base yet, so V12 cites their clauses ("item 114 (g)") and gives its own spec ids
(`T114g.*` …, as `T110b.*`).

## 4 Conflicts resolved (10)

| conflict | ruling applied | where |
|---|---|---|
| SCOPE-C14 | no premium FTG capture (J122); METROPOLIS stays compared with MFCG size 130 | V12 §11 (Q-V12-1); V12 §3.4.4 (FTG's metropolis pictures an unscored card) |
| V12-ICONF-1 | the raised bump's records read the water-system record's met need, cap step and cistern terminal (V11 §3.24.7 (3)), never a chance factor | V12 §3.7.6; V12 §1b's dossier table |
| V12-ICONF-2 | the §13 "factor" sentence removed with the narration | V12 §13 (none open) |
| V12-XCONF-1 | J122's sittings: only M1 (the look check), M2b, M4 and M5, batched, about an hour; staged panels join the next gating sitting once built, else *provisional — not rated* | V12 §0; V12 §2.8 (`PanelSpec.sitting`); V12 §3.9.1 (the sitting table, *Batching and re-offers*); V12 §6; V12 §8.1; V12 §8.3 risk 6; V12 §11 (Q-V12-2); J-V12.84; T-V12-51 |
| V12-XCONF-2 | the pinning hash is §7.6's; the whole provenance block (evidence and `ownerRule` among it) lies outside it | V12 §2.10 (cites §7.6) |
| V12-XCONF-3 | metric stages are registered StageIds (S5a – S5d, S12a – S12c); no bare `S5`, no `S12` | V12 §3.4.2 (`stages`); V12 §3.7.4 (the TOWN guard); V12 §3.10.5; V12 §3.12; T-V12-11; T-V12-37 |
| V12-XCONF-4 | `servedShare` measures every district as V11 §2.3 defines the unit; the ≥ 30-households filter only for T-V11-18's 105 (k) reading (`minHouseholds`) | V12 §2.7 (`NullModelSpec`); V12 §3.6; J-V12.86 |
| V12-XCONF-5 | BCR-V12-4 / item 504's adoption rule is J122's per-frame sitting rule, never "Q-V12-3" | V12 §10.1; V12 §3.10.6 |
| CANON-C03 | §11 is the table of decisions (question, answer) | V12 §11 |
| CANON-C04 | §13 holds no open item; the reconciliation history is left to the validation records | V12 §13 |

Agreement-matrix subjects: **T-V6-62** (V11-XCONF-1) — `stateSnapCm`'s register entry lives at V12 §3.11 (its own line,
`measure` at `V6-E2` on `bar.T-V6-62`; J-V12.82), as V06 §8 writes it; **T-V11-18** (V12-XCONF-4) — above.

## 5 Elegance rulings applied, with their equivalence lists

**E-20 — one no-op pin engine** (V12 §2.13's `NoOpPin` with kinds `offForm`, `rungScope`, `view`; V12 §3.7.8; J-V12.87).
- [x] the owner-rules copy's registry path-test list — kept at its home, §13.2's convention (5), which V12 §3.7.8 cites
- [x] the declared-shift clause for goldens — V12 §3.7.8 (3) (the off-state set re-recorded on a declared shift of another cause, its stage list matched)
- [x] each item's off-form cell values (V11 §3.24.0) and its bar id — V12 §2.13's table: one row per pin with its bar and kind; the off form read from V11 §3.24.0 (or V11 §3.7.4, or the cells the bar names), never restated

**E-24 — one mark on amended decisions** (V12 §9's head; 12 rows marked: J-V12.10, .11, .21, .43, .55, .60, .63, .71, .72, .74, .77, .79).
- [x] no row dropped — J-V12.1 – J-V12.83 all present, J-V12.84 – J-V12.96 added (96 rows)
- [x] the governing row keeps the reason — each amending row states its reason; the amended row carries only "*Amended by J-V12.n.*"

**E-35 — one lifecycle table** (V12 §2.11 with producer and consumers columns; V12 §1b keeps the engines, commands, profiles and metric families and cites it; J-V12.85).
- [x] every producer and consumer listed today — each of §1b's 46 rows mapped (MAPPING TABLE, V12-0012 – V12-0057): records to §2.11's rows, engines kept in §1b

**E-37 — one unit vocabulary** (V12 §2.1: `MetricUnit = Extract<Unit /* §2.1 */, …>`).
- [x] deg and cdeg both kept — `deg` in the subset (cdeg is V11's)
- [x] count and people both kept — `count` in the subset (people is V11's)
- [x] each volume's subset exactly its current list — the 17 units of the source's `Unit`, unchanged

**E-38 — `territory.haPerHead` leaves the register** (V12 §3.11's default line).
- [x] the farm rows' values unchanged — no value restated here
- [x] A_T = households × the per-head sum — cited to V07 §3.9 (1)
- [x] V12's register: the farm rows are the calibratable cells; `haPerHead` leaves the register — "the `FarmTable` village rows among them, while `territory.haPerHead`, derived as their sum, takes no entry"

## 6 Id rulings, renumberings, renames and terms

| ruling | old | new |
|---|---|---|
| ID-JT | `J-T` (the tendency letter) | `JT` (§13.7) |
| G-DR | DR-V8.2, DR-V8.3, DR-V8.4, DR-V8.5, DR-V8.7, DR-V8.8 | DR30, DR31, DR32, DR33, DR34, DR35 |
| ID-BCR | V01's bare BCR-n; V04's bare BCR-n | BCR-V1-n; BCR-V4-n (and the applied f item where the text needs the base text) |
| ID-WX | IN-V12-1 – IN-V12-4 in the body | folded at their homes; the Integration notes kept as a map (ruling → where it lives) |
| G-lot (metric ids) | `lots.r4.*`, `lots.wallAlign` | `bldg.r4.*`, `bldg.wallAlign` (J-V12.96) |
| G-cite | V1-3.8.7, V4 §3.5, bare § into this volume, … | `Vnn §x.y` for volumes, `V12 §x.y` for this volume, bare `§x.y` for the base only |
| G-M6U | M6 for the underground | M6-U |
| new ids | — | T-V12-42 – T-V12-51; J-V12.84 – J-V12.96; milestone step `V6-E9` in the due table (V06's history-replay step); spec ids `T111d.*`, `T113e.lost`, `T114g.*`, `T117i.*`, `T118h.*`; metrics `water.kinds`, `water.walkShare`, `water.distByBand`, `wall.condition`, `bldg.grandeur`, `view.limitStop`, `season.*`, `festival.*`, `wait.*`, `time.*` |
| terms | "the M4-110 panel"; `GmTrialRecord` (a first draft) | "the M4 panel's M4-110 group" (V12-TERM-1); V09 §7.6's `TrialRecord` (one record) |

No existing T-V12 or J-V12 id was renumbered; X-V12-1 – X-V12-19 keep their ids.

## 7 Wiring gaps, hand-offs and findings closed

**Wiring.** W-IF-04 — V09 §4.14's cell inspector reads each cell's register entry through `dist/evidence.json` (V12 §2.10;
X-V12-6), as V09 writes it. W-IF-05 — V10 §2.13's `RuleAnswer.register` (`entry`, `status`, `method`, `due`) is filled from
the same shipped file, which now carries `method` and uses `CalibrationEntry['status']`'s vocabulary (V12 §2.10; X-V12-7);
see CROSS-PART NOTE 2.

**Hand-offs to this volume (11), closed in V12 §10.3:** V02 X33 → V12 §2.1 (J-V12.65); V06 X9 → V12 §3.6b's bar map
(109 (k), 109 (j) (5)); V06 X19 → V12 §3.4.2, §3.7.4, §3.7.6, §3.7.8, §3.4.4; V06 X31 → V12 §3.11's `decline` line;
V06 X38 → V12 §2.1, §3.11 (J-V12.66); V06 X49 → V12 §2.8, §3.11 (J-V12.82; `V6-E7`, `V6-E8`, `V6-E9`); V11 X-V12-1 → V12
§2.10; V11 X-V11-12 → V12 §3.11 (*Items 109 and 110 by column*), §2.10; V11 X-V11-14 (c) → V12 §3.7.2 (4), §3.7.7,
`PresetArm`; V11 X-V11-16 (b) → V12 §2.1; V11 X-V11-17 (f) → V12 §3.11 (J-V12.82).

**Hand-offs from this volume (19), each closed at its destination** (V12 §10.2's *closed at* column): X-V12-1 V11 §2.2,
§3.2.1; X-V12-2 V02 §7.5, V07 §8; X-V12-3 V11 §8, §3.23.4; X-V12-4 V03 §8, V04 §7, V05 §7, V06 §12; X-V12-5 V08 §7;
X-V12-6 V09 §4.14; X-V12-7 V10 §2.13; X-V12-8 V09 §7.2, V10 §7; X-V12-9 V11 §3.24.0, §3.24.2, §2.2; X-V12-10 V06 §3.19.1,
V09 §4.20; X-V12-11 V02, V04, V05, V06, V07, V11 §7; X-V12-12 §16, §13.2; X-V12-13 V04 §7; X-V12-14 V07 §7; X-V12-15 V02
§3.10.10, V03 §2.4, V06 §8, V11 §8, §13.2; X-V12-16 V01 §8.1, V03 §2.4 and §8, V04 §8, V05 §8, V07 §8; X-V12-17 (the
command refuses any other id form; V04 §8, V06 §8); X-V12-18 (V04 §8's span row; SCC-109's clause); X-V12-19 V06 §8, V04 §8,
items 244 and 245. The deferral wordings ("the next round may …") are gone (V12-HANDOFF-1).

**The 34 open findings, each fixed in the text:**

| finding | fixed at |
|---|---|
| VOL-V11-V12-RESTATEMENTS-011, V12-RESTATE-1 | V12 §2.13 (`overlay` comment and the table's off-form column cite V11 §3.24.0); V12 §3.7.8 (1) |
| VOL-V11-V12-RESTATEMENTS-012, V12-RESTATE-2 | "the owner-stamped minimum of the column" (V11 §3.24.2 states the values): V12 §2.10, §3.7.2 (5), §3.11, J-V12.42, T-V12-39 |
| V12-ICONF-1, V12-ICONF-2 | see §4 |
| V12-XCONF-1 – V12-XCONF-5 | see §4 |
| V12-ELEG-1 | E-35 (§5) |
| V12-MISSING-1 | V12 §3.10.6 (J122's rule; "default until ruled" removed); V12 §11 |
| V12-MISSING-2 | V12 §3.11's order rule cites §16's starts-after chains (J122's combined order: M5, V-M, M6-E and the plan rung's P0 – P1 parallel after M4; M6 and M6-U after M5; M6-sky; M-CAL; M-SF; M3c after M3a, beside M3b); J-V12.95 |
| V12-MISSING-3 | V12 §11 (every question answered, J122); V12 §0, §3.9.1, §6, §8.3 risk 6; BCR-V12-6's sitting list at item 500 via §10.1 |
| V12-MISSING-4 | item 111 (§3 above) |
| V12-MISSING-5 | item 112 (§3 above) |
| V12-MISSING-6 | item 113 (§3 above) |
| V12-MISSING-7, V12:IN-V12-3 | V12 §3.6b (bends counted, each with its line); the note removed |
| V12-TERM-1 | "the M4 panel's M4-110 group" throughout (V12 §3.9.1, §7, §8.2) |
| V12-TERM-2 | E-37 (§5) |
| V12-NARR-1 – V12-NARR-5 | one marker line; ledgers, banners, round headers, SCC ids and superseded wordings removed; §12 current lists; §13 none open; decisions in current form with E-24 marks |
| V12-BREF-1 | every self-reference `V12 §x`; bare § only for the base (verified: 0 unresolved) |
| V12-BREF-2 | BCR-V1-n and BCR-V4-n |
| V12-HANDOFF-1 | §7 above; X-V12-17 – X-V12-19 closed |
| SCC-109's X-V12-18 clause | X-V12-18 (V04 §8's span row takes the order M4, `V4-U3`, `V4-U5`) |
| V12:IN-V12-1 | V12 §3.11 (the default line: V05's `IslandRule` cells its own, never V11 rows) |
| V12:IN-V12-2 | V12 §10.2 X-V12-9; V12 §3.7.2 (5); V12 §3.4.4 |
| V12:IN-V12-4 | V12 §2.2 (item 447's one text, the six barrier kinds, `span` read by no metric); V12 §10.1 |

**Owner questions:** Q-V12-1, Q-V12-2, Q-V12-3 answered (J122) in V12 §11, each decision read in the body.

## 8 Edges and combinations (principle (11))

Every catalogue edge (40 UNDEFINED, 11 UNTESTED) is a row of V12 §3.16.1 with its outcome's home, its failure rung (§5.1's
ladder) and its test; four rules stated once (degenerate geometry, every rung, every toggle and preset, the lifecycle)
carry what the rows share. The edge suite is T-V12-42 (one fixture per row). The 17 feature × parity-preset combinations
are V12 §3.16.2's table, one rule (a preset is cell values, never a stage) and one row per feature with its rungs, its
reading under the preset and T-V12-43's fixture. The full map is §13 below.

## 9 Judgment calls (vetoable; new decision rows)

J-V12.84 (J122's sittings as `PanelSpec.sitting`), J-V12.85 (E-35), J-V12.86 (V12-XCONF-4), J-V12.87 (E-20), J-V12.88 (the
trial through V09's `TrialRecord`), J-V12.89 (`exactScript` with author steps for items 113 (e) and 114), J-V12.90 (item
111 (d) as `higherWith` with per-instance deflation), J-V12.91 (item 114's greyscale bar on luma against §8.2's threshold),
J-V12.92 (item 119 measured click to complete, p95 ≤ 10 s, five seeds per wait kind), J-V12.93 (`dist/evidence.json`
carries the register fields), J-V12.94 (a parity preset is cell values), J-V12.95 (§16's starts-after chains), J-V12.96
(`bldg.*` metric ids). Each is a reading of a canon ruling or a g item at build depth; none changes another decision.

## 10 CROSS-PART NOTES

1. **scope (§16):** the rig line cites "V12 §8.2; 6–9" with items 102–113's bars absorbed. V12 §8.2 now adds **W7
   (0.75–1.25 pw)** — items 114–119's specs and pins, the `exactScript` author steps, the `rungScope` and `view` pin kinds,
   the wait timer and budget-register check, and the edge suite; items 111–113's registrations stay absorbed. The rig
   line's V12 share should read 6.75–10.25 (W1 – W7), or scope states W7 absorbed. Also: the carried row counts "volume 12's
   register share built at M6-U's U3–U5" (W6, 0.25–0.5) while the rig line's 6–9 already includes W6 — check for a double
   count. V12 states no total of its own (item 568; the source's "base-side total" row removed).
2. **V10 (§2.13, §1b.1):** `RuleAnswer.register`'s comment names "V12 §2.6's `plat/calibration/register.json`, where one
   exists". The register is repository data that never ships (J-V12.93); the shipped copy of each cell's entry is
   `dist/evidence.json` (V12 §2.10), which now carries `entry`, `status` (`CalibrationEntry['status']`), `method` and `due`.
   The Assemble seat (or V10's owner) should make V10's comment and its §1b.1 input name `dist/evidence.json` (V12 §2.10),
   as V09 §4.14 already does; the fields match unchanged (`id` ← `entry`).
3. **scope (§13.2):** base bar ids exist for items 111–113 only. When ids T114-n … T119-n are issued, V12 §3.15's clause
   citations ("item 114 (g)", …) map to them one to one; V12's own spec ids (`T114g.*`, `T117i.*`, `T118h.*`) stay.
4. **rendering (§12.10):** V12 §3.15.9, §6 and T-V12-50 read §12.10's budget-register rows (the steps declared slower than
   their target with their measured gain, and the interaction rows); §12.10 exists in `new/base/rendering` (E-18). The
   landed `docs/ARCHITECTURE.md` has no §12.10 yet, so doc_checks' S2 lists it until the Assemble seat lands the base.
5. **V11 (rewrite running):** V12 cites V11 §3.24.0 (switch table), §3.24.2 (raised-way minima, the `ownerRule: '110 (b)'`
   stamp), §3.24.7 (3) (the water-system record's met need), §3.7.4 (the web off form), §2.2 and §3.2.1 steps 4 and 7 (the
   compiler; the pinning hash per §7.6, V12-XCONF-2), §2.3 (the district unit; T-V11-18's `minHouseholds` 30, V12-XCONF-4),
   §3.18, §3.23.4, §8 and rows 63–66, 79, 80, 82. Keep these numbers or tell the Assemble seat the renumbering.
6. **V06:** V12's due table uses `V6-E9` for item 113's history replay (`measure` there, then `corpus` E4 at M-CAL), beside
   `V6-E7` and `V6-E8`; V06's rewrite names E9 as the history-replay step — agreed.
7. **V09:** the game-master trial has one record, V09 §7.6's `TrialRecord`; V12 enters its findings with
   `plat calibrate register --trial` (V12 §2.14; T-V12-45). Agreed with V09's lifecycle row.
8. **V07:** `territory.haPerHead` takes no register entry (E-38); V12 cites V07 §3.9 (1) for A_T.

## 11 Checks run (provisional where noted)

- **Ids:** T-V12-1 – T-V12-51 and J-V12.1 – J-V12.96 each defined once; every T-V12 and J-V12 reference resolves.
- **References:** every `V12 §x` resolves to a heading or numbered paragraph of the new volume; every `Vnn §x` to that
  volume's headings (new where landed, else the source); every bare `§x` to the base's headings, except §12.10, which is
  the rendering unit's new section (CROSS-PART NOTE 4).
- **Terms and narration:** no `J-T`, `DR-V8.n`, `lots.*` metric, bare `M6` for the underground, bare `S5` or `S12` stage,
  canon conflict id, wiring id, SCC id or round header in the volume's text (E-nn provenance marks kept, as the base does).
- **Mapping:** 403 of 403 inventory ids mapped, 0 unmapped (`mapping.py`).

- **doc_checks.py** (`--doc <file> --heads docs/ARCHITECTURE.md`), **PROVISIONAL**: it warned "reference corpus INCOMPLETE
  (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT
  authoritative; re-run on the machine that holds the corpus before any freeze".

| check | source | rewrite |
|---|---|---|
| C1 | 9 (0 unreviewed) | 8 (0 unreviewed) |
| C2 | 0 (0 unreviewed) | 0 (0 unreviewed) |
| C3 | 189 (180 unreviewed) | 124 (119 unreviewed) |
| C4 | 0 (0 unreviewed) | 1 (0 unreviewed) |
| S1 | 0 (0 unreviewed) | 0 (0 unreviewed) |
| S2 | 169 (169 unreviewed) | 155 (155 unreviewed) |

  C3's hits are 3-gram overlaps of ordinary phrases and section-number runs with the corpus index (fewer than the source's);
  S2 reads every `Vnn §x` and `V12 §x` pointer as a base pointer (the checker does not parse the volume prefix), so its
  hits are this volume's own and other volumes' sections plus §12.10 — all resolved by the reference check above.

## 12 MAPPING TABLE — every inventory id of the volume → where it now lives

Roles are the canon's (`canon.json` by_inventory_id): home 384, reference 2, bcr-pointer 10, handoff 6, answer 1 — 403 in all, 0 unmapped.

| inventory id | kind | source § | role | where it now lives |
|---|---|---|---|---|
| V12-0001 | rule | conv | home | the head's *How to read this volume* (the base read with files f and g applied; citations, ids, the clean room) |
| V12-0002 | summary | 0 | home | V12 §0 |
| V12-0003 | summary | 0 | home | V12 §0 |
| V12-0004 | summary | 0 | home | V12 §0 |
| V12-0005 | summary | 0 | home | V12 §0 (*How it feels to the owner* and loop 4: J122's four gating sittings, V12-XCONF-1) |
| V12-0006 | scope | 1 | home | V12 §1 |
| V12-0007 | interface | 1 | reference | reference → §13.5, §13.6, §13.7, §13.9, §13.3 (V12 §1's hooks table: pointers only) |
| V12-0008 | interface | 1 | reference | reference → §17.1 (1)–(8), §7.6, §6.4, §11.1, §14 (V12 §1's hooks table: pointers only) |
| V12-0009 | rule | 1 | home | V12 §1 |
| V12-0010 | rule | 1 | home | V12 §1 |
| V12-0011 | scope | 1 | home | V12 §1 |
| V12-0012 | wiring | 1b | home | V12 §2.11 (`MetricDef` and `dist/metrics.json`, E-35) |
| V12-0013 | wiring | 1b | home | V12 §2.11 (`MeasureInput`, E-35) |
| V12-0014 | wiring | 1b | home | V12 §1b (`plat measure`) |
| V12-0015 | wiring | 1b | home | V12 §1b (`plat baselines aggregate`) |
| V12-0016 | wiring | 1b | home | V12 §2.11 (`BaselinesFile` header, E-35) |
| V12-0017 | wiring | 1b | home | V12 §2.11 (`Baseline` row, item 496; E-35) |
| V12-0018 | wiring | 1b | home | V12 §1b (the crossing check) |
| V12-0019 | wiring | 1b | home | V12 §1b (the seed families) |
| V12-0020 | wiring | 1b | home | V12 §1b (the capture plan) |
| V12-0021 | wiring | 1b | home | V12 §2.11 (`ParityReport`, item 497; E-35) |
| V12-0022 | wiring | 1b | home | V12 §1b (the parity dashboard) |
| V12-0023 | wiring | 1b | home | V12 §1b (the correlation harness) and V12 §2.11 (`NullModelSpec`, E-35) |
| V12-0024 | wiring | 1b | home | V12 §2.11 (`CalibrationRun`, E-35) |
| V12-0025 | wiring | 1b | home | V12 §2.11 (`CalibrationEntry`, E-35; its consumers V09 §4.14 and V10 §2.13 through `dist/evidence.json`, W-IF-04, W-IF-05) |
| V12-0026 | wiring | 1b | home | V12 §2.11 (evidence ids, stamps, `dist/evidence.json`, E-35) |
| V12-0027 | wiring | 1b | home | V12 §1b (the panel engine) and V12 §2.11 (`PanelSpec`, E-35) |
| V12-0028 | wiring | 1b | home | V12 §1b (the sitting page) |
| V12-0029 | wiring | 1b | home | V12 §1b (the drift watch) |
| V12-0030 | wiring | 1b | home | V12 §1b (the corpus adapter) |
| V12-0031 | wiring | 1b | home | V12 §2.11 (`SampleFrame`, E-35) |
| V12-0032 | wiring | 1b | home | V12 §2.11 (`ReconciliationRecord`, E-35) |
| V12-0033 | wiring | 1b | home | V12 §2.11 (the historical pack, E-35) |
| V12-0034 | wiring | 1b | home | V12 §1b (the tendency harness) and V12 §2.11 (`StatBarSpec`, E-35) |
| V12-0035 | wiring | 1b | home | V12 §1b (the seed families row: `sweep/…`) |
| V12-0036 | wiring | 1b | home | V12 §1b (the enclosure profile) |
| V12-0037 | wiring | 1b | home | V12 §1b (the underground profile) |
| V12-0038 | wiring | 1b | home | V12 §2.11 (`CalibrationEntry`'s producers, E-35) |
| V12-0039 | wiring | 1b | home | V12 §2.11 (`ownerRule` stamps, E-35) |
| V12-0040 | wiring | 1b | home | V12 §2.11 (`ReconciliationRecord`'s consumers: `ownerExcluded` rows as owner questions, E-35) |
| V12-0041 | wiring | 1b | home | V12 §2.11 (`FramesFile`, E-35) |
| V12-0042 | wiring | 1b | home | V12 §1b (the model metrics row) |
| V12-0043 | wiring | 1b | home | V12 §1b (the tendency harness with the step-script runner) |
| V12-0044 | wiring | 1b | home | V12 §1b (the guards) |
| V12-0045 | wiring | 1b | home | V12 §1b (the structure engine) and V12 §2.11 (`KnownCityFixture`, E-35) |
| V12-0046 | wiring | 1b | home | V12 §2.11 (`NoOpPin`, E-35) |
| V12-0047 | wiring | 1b | home | V12 §1b (V11 §3.24.0's switch table — each owner item's off form, E-20) |
| V12-0048 | wiring | 1b | home | V12 §1b (the switch-on bumps) |
| V12-0049 | wiring | 1b | home | V12 §1b (the profile's item-110 kinds) |
| V12-0050 | wiring | 1b | home | V12 §1b (the model metrics row) |
| V12-0051 | wiring | 1b | home | V12 §1b (the model metrics row) |
| V12-0052 | wiring | 1b | home | V12 §1b (the metric families) |
| V12-0053 | wiring | 1b | home | V12 §2.11 (`BenchBarDef`, E-35) |
| V12-0054 | wiring | 1b | home | V12 §1b (the four raised-way bars) |
| V12-0055 | wiring | 1b | home | V12 §1b (the M4 panel's M4-110 group) |
| V12-0056 | wiring | 1b | home | V12 §2.11 (`history.jsonl`, E-35) |
| V12-0057 | wiring | 1b | home | V12 §2.11 (`known-defects.json` entries, E-35) |
| V12-0058 | rule | 1b | home | V12 §1b (*The dossier*) |
| V12-0059 | table | 1b | home | V12 §1b (the dossier table; DR30–DR35 for the DR-V8 names, G-DR; the water-system row worded to the met need, V12-ICONF-1) |
| V12-0060 | rule | 2 | home | V12 §2 |
| V12-0061 | type | 2.1 | home | V12 §2.1 |
| V12-0062 | type | 2.1 | home | V12 §2.1 |
| V12-0063 | rule | 2.1 | home | V12 §2.1 |
| V12-0064 | rule | 2.1 | home | V12 §2.1 |
| V12-0065 | rule | 2.1 | home | V12 §2.1 |
| V12-0066 | type | 2.1 | home | V12 §2.1 |
| V12-0067 | type | 2.1 | home | V12 §2.1 |
| V12-0068 | type | 2.2 | home | V12 §2.2 |
| V12-0069 | type | 2.2 | home | V12 §2.2 |
| V12-0070 | rule | 2.2 | home | V12 §2.2 |
| V12-0071 | rule | 2.2 | home | V12 §2.2 |
| V12-0072 | rule | 2.2 | home | V12 §2.2 |
| V12-0073 | rule | 2.2 | home | V12 §2.2 |
| V12-0074 | rule | 2.2 | home | V12 §2.2 |
| V12-0075 | rule | 2.2 | home | V12 §2.2 |
| V12-0076 | type | 2.3 | home | V12 §2.3 |
| V12-0077 | type | 2.4 | home | V12 §2.4 |
| V12-0078 | table | 2.4 | home | V12 §2.4 |
| V12-0079 | rule | 2.4 | home | V12 §2.4 |
| V12-0080 | type | 2.5 | home | V12 §2.5 |
| V12-0081 | type | 2.5 | home | V12 §2.5 |
| V12-0082 | type | 2.6 | home | V12 §2.6 |
| V12-0083 | rule | 2.6 | home | V12 §2.6 |
| V12-0084 | rule | 2.6 | home | V12 §2.6 |
| V12-0085 | type | 2.7 | home | V12 §2.7 |
| V12-0086 | type | 2.7 | home | V12 §2.7 |
| V12-0087 | rule | 2.7 | home | V12 §2.7 |
| V12-0088 | type | 2.7b | home | V12 §2.7b |
| V12-0089 | type | 2.7b | home | V12 §2.7b |
| V12-0090 | type | 2.7b | home | V12 §2.7b |
| V12-0091 | type | 2.8 | home | V12 §2.8 |
| V12-0092 | type | 2.8 | home | V12 §2.8 |
| V12-0093 | rule | 2.8 | home | V12 §2.8 |
| V12-0094 | type | 2.9 | home | V12 §2.9 |
| V12-0095 | type | 2.9 | home | V12 §2.9 |
| V12-0096 | rule | 2.10 | home | V12 §2.10 |
| V12-0097 | rule | 2.10 | home | V12 §2.10 |
| V12-0098 | lifecycle | 2.11 | home | V12 §2.11 |
| V12-0099 | lifecycle | 2.11 | home | V12 §2.11 |
| V12-0100 | lifecycle | 2.11 | home | V12 §2.11 |
| V12-0101 | lifecycle | 2.11 | home | V12 §2.11 |
| V12-0102 | type | 2.12 | home | V12 §2.12 |
| V12-0103 | type | 2.13 | home | V12 §2.13 |
| V12-0104 | mechanism | 3.1 | home | V12 §3.1 |
| V12-0105 | rule | 3.2.1 | home | V12 §3.2.1 |
| V12-0106 | rule | 3.2.1 | home | V12 §3.2.1 |
| V12-0107 | rule | 3.2.2 | home | V12 §3.2.2 |
| V12-0108 | rule | 3.2.3 | home | V12 §3.2.3 |
| V12-0109 | rule | 3.2.4 | home | V12 §3.2.4 |
| V12-0110 | mechanism | 3.3 | home | V12 §3.3 |
| V12-0111 | rule | 3.3 | home | V12 §3.3 |
| V12-0112 | rule | 3.4.1 | home | V12 §3.4.1 |
| V12-0113 | rule | 3.4.2 | home | V12 §3.4.2 |
| V12-0114 | rule | 3.4.2 | home | V12 §3.4.2 |
| V12-0115 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0116 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0117 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0118 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0119 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0120 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0121 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0122 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0123 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0124 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0125 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0126 | table | 3.4.2 | home | V12 §3.4.2 |
| V12-0127 | rule | 3.4.2 | home | V12 §3.4.2 |
| V12-0128 | rule | 3.4.2 | home | V12 §3.4.2 |
| V12-0129 | rule | 3.4.3 | home | V12 §3.4.3 |
| V12-0130 | table | 3.4.4 | home | V12 §3.4.4 |
| V12-0131 | rule | 3.4.4 | home | V12 §3.4.4 |
| V12-0132 | rule | 3.5.1 | home | V12 §3.5.1 |
| V12-0133 | rule | 3.5.2 | home | V12 §3.5.2 |
| V12-0134 | rule | 3.5.3 | home | V12 §3.5.3 |
| V12-0135 | rule | 3.5.4 | home | V12 §3.5.4 |
| V12-0136 | mechanism | 3.5.5 | home | V12 §3.5.5 |
| V12-0137 | rule | 3.5.6 | home | V12 §3.5.6 |
| V12-0138 | rule | 3.6 | home | V12 §3.6 |
| V12-0139 | mechanism | 3.6 | home | V12 §3.6 |
| V12-0140 | rule | 3.6 | home | V12 §3.6 |
| V12-0141 | number | 3.6 | home | V12 §3.6 |
| V12-0142 | rule | 3.6 | home | V12 §3.6 |
| V12-0143 | rule | 3.6 | home | V12 §3.6 |
| V12-0144 | rule | 3.6 | home | V12 §3.6 |
| V12-0145 | rule | 3.6 | home | V12 §3.6 |
| V12-0146 | mechanism | 3.6b | home | V12 §3.6b |
| V12-0147 | rule | 3.6b | home | V12 §3.6b |
| V12-0148 | rule | 3.6b | home | V12 §3.6b |
| V12-0149 | rule | 3.6b | home | V12 §3.6b |
| V12-0150 | rule | 3.6b | home | V12 §3.6b |
| V12-0151 | rule | 3.6b | home | V12 §3.6b |
| V12-0152 | rule | 3.6b | home | V12 §3.6b |
| V12-0153 | rule | 3.6b | home | V12 §3.6b |
| V12-0154 | rule | 3.6b | home | V12 §3.6b |
| V12-0155 | table | 3.6b | home | V12 §3.6b |
| V12-0156 | table | 3.6b | home | V12 §3.6b |
| V12-0157 | table | 3.6b | home | V12 §3.6b |
| V12-0158 | table | 3.6b | home | V12 §3.6b |
| V12-0159 | rule | 3.6b | home | V12 §3.6b |
| V12-0160 | rule | 3.6b | home | V12 §3.6b |
| V12-0161 | rule | 3.7.1 | home | V12 §3.7.1 |
| V12-0162 | rule | 3.7.2 | home | V12 §3.7.2 |
| V12-0163 | rule | 3.7.2 | home | V12 §3.7.2 |
| V12-0164 | rule | 3.7.3 | home | V12 §3.7.3 |
| V12-0165 | rule | 3.7.4 | home | V12 §3.7.4 |
| V12-0166 | rule | 3.7.5 | home | V12 §3.7.5 |
| V12-0167 | mechanism | 3.7.6 | home | V12 §3.7.6 |
| V12-0168 | rule | 3.7.6 | home | V12 §3.7.6 |
| V12-0169 | rule | 3.7.7 | home | V12 §3.7.7 |
| V12-0170 | rule | 3.7.8 | home | V12 §3.7.8 |
| V12-0171 | rule | 3.8 | home | V12 §3.8 |
| V12-0172 | table | 3.9.1 | home | V12 §3.9.1 |
| V12-0173 | rule | 3.9.1 | home | V12 §3.9.1 |
| V12-0174 | mechanism | 3.9.2 | home | V12 §3.9.2 |
| V12-0175 | rule | 3.9.3 | home | V12 §3.9.3 |
| V12-0176 | rule | 3.9.4 | home | V12 §3.9.4 |
| V12-0177 | rule | 3.9.5 | home | V12 §3.9.5 |
| V12-0178 | rule | 3.10.1 | home | V12 §3.10.1 |
| V12-0179 | rule | 3.10.2 | home | V12 §3.10.2 |
| V12-0180 | rule | 3.10.3 | home | V12 §3.10.3 |
| V12-0181 | rule | 3.10.3 | home | V12 §3.10.3 |
| V12-0182 | rule | 3.10.4 | home | V12 §3.10.4 |
| V12-0183 | rule | 3.10.5 | home | V12 §3.10.5 |
| V12-0184 | rule | 3.10.6 | home | V12 §3.10.6 |
| V12-0185 | rule | 3.10.7 | home | V12 §3.10.7 |
| V12-0186 | rule | 3.11 | home | V12 §3.11 |
| V12-0187 | rule | 3.11 | home | V12 §3.11 |
| V12-0188 | table | 3.11 | home | V12 §3.11 |
| V12-0189 | table | 3.11 | home | V12 §3.11 |
| V12-0190 | table | 3.11 | home | V12 §3.11 |
| V12-0191 | table | 3.11 | home | V12 §3.11 |
| V12-0192 | table | 3.11 | home | V12 §3.11 |
| V12-0193 | table | 3.11 | home | V12 §3.11 |
| V12-0194 | table | 3.11 | home | V12 §3.11 |
| V12-0195 | table | 3.11 | home | V12 §3.11 |
| V12-0196 | table | 3.11 | home | V12 §3.11 |
| V12-0197 | table | 3.11 | home | V12 §3.11 |
| V12-0198 | table | 3.11 | home | V12 §3.11 |
| V12-0199 | table | 3.11 | home | V12 §3.11 |
| V12-0200 | table | 3.11 | home | V12 §3.11 |
| V12-0201 | table | 3.11 | home | V12 §3.11 |
| V12-0202 | table | 3.11 | home | V12 §3.11 |
| V12-0203 | table | 3.11 | home | V12 §3.11 |
| V12-0204 | table | 3.11 | home | V12 §3.11 |
| V12-0205 | table | 3.11 | home | V12 §3.11 |
| V12-0206 | table | 3.11 | home | V12 §3.11 |
| V12-0207 | table | 3.11 | home | V12 §3.11 |
| V12-0208 | table | 3.11 | home | V12 §3.11 |
| V12-0209 | table | 3.11 | home | V12 §3.11 |
| V12-0210 | table | 3.11 | home | V12 §3.11 |
| V12-0211 | table | 3.11 | home | V12 §3.11 |
| V12-0212 | table | 3.11 | home | V12 §3.11 |
| V12-0213 | table | 3.11 | home | V12 §3.11 |
| V12-0214 | table | 3.11 | home | V12 §3.11 |
| V12-0215 | table | 3.11 | home | V12 §3.11 |
| V12-0216 | table | 3.11 | home | V12 §3.11 |
| V12-0217 | table | 3.11 | home | V12 §3.11 |
| V12-0218 | table | 3.11 | home | V12 §3.11 |
| V12-0219 | table | 3.11 | home | V12 §3.11 |
| V12-0220 | table | 3.11 | home | V12 §3.11 |
| V12-0221 | table | 3.11 | home | V12 §3.11 |
| V12-0222 | table | 3.11 | home | V12 §3.11 |
| V12-0223 | rule | 3.11 | home | V12 §3.11 |
| V12-0224 | rule | 3.11 | home | V12 §3.11 |
| V12-0225 | rule | 3.11 | home | V12 §3.11 |
| V12-0226 | rule | 3.11 | home | V12 §3.11 |
| V12-0227 | rule | 3.11 | home | V12 §3.11 |
| V12-0228 | rule | 3.11 | home | V12 §3.11 |
| V12-0229 | rule | 3.11 | home | V12 §3.11 |
| V12-0230 | rule | 3.11 | home | V12 §3.11 |
| V12-0231 | rule | 3.11 | home | V12 §3.11 |
| V12-0232 | rule | 3.11 | home | V12 §3.11 |
| V12-0233 | rule | 3.12 | home | V12 §3.12 |
| V12-0234 | rule | 3.12 | home | V12 §3.12 |
| V12-0235 | rule | 3.12 | home | V12 §3.12 |
| V12-0236 | rule | 3.12 | home | V12 §3.12 |
| V12-0237 | rule | 3.13 | home | V12 §3.13 |
| V12-0238 | rule | 3.14.1 | home | V12 §3.14.1 |
| V12-0239 | rule | 3.14.2 | home | V12 §3.14.2 |
| V12-0240 | rule | 3.14.3 | home | V12 §3.14.3 |
| V12-0241 | table | 3.14.5 | home | V12 §3.14.5 |
| V12-0242 | rule | 3.14.6 | home | V12 §3.14.6 |
| V12-0243 | rule | 3.14.7 | home | V12 §3.14.7 |
| V12-0244 | rule | 4.1 | home | V12 §4.1 |
| V12-0245 | rule | 4.1 | home | V12 §4.1 |
| V12-0246 | table | 4.2 | home | V12 §4.2 |
| V12-0247 | rule | 4.3 | home | V12 §4.3 |
| V12-0248 | rule | 4.4 | home | V12 §4.4 |
| V12-0249 | rule | 5.1 | home | V12 §5.1 |
| V12-0250 | rule | 5.2 | home | V12 §5.2 |
| V12-0251 | rule | 5.3 | home | V12 §5.3 |
| V12-0252 | rule | 5.5 | home | V12 §5.5 |
| V12-0253 | number | 6 | home | V12 §6 |
| V12-0254 | number | 6 | home | V12 §6 |
| V12-0255 | test | 7.1 | home | V12 §7.1 (T-V12-1) |
| V12-0256 | test | 7.1 | home | V12 §7.1 (T-V12-2) |
| V12-0257 | test | 7.1 | home | V12 §7.1 (T-V12-3) |
| V12-0258 | test | 7.1 | home | V12 §7.1 (T-V12-4) |
| V12-0259 | test | 7.1 | home | V12 §7.1 (T-V12-5) |
| V12-0260 | test | 7.1 | home | V12 §7.1 (T-V12-6) |
| V12-0261 | test | 7.1 | home | V12 §7.1 (T-V12-7) |
| V12-0262 | test | 7.1 | home | V12 §7.1 (T-V12-8) |
| V12-0263 | test | 7.1 | home | V12 §7.1 (T-V12-9) |
| V12-0264 | test | 7.1 | home | V12 §7.1 (T-V12-10) |
| V12-0265 | test | 7.1 | home | V12 §7.1 (T-V12-11) |
| V12-0266 | test | 7.1 | home | V12 §7.1 (T-V12-12) |
| V12-0267 | test | 7.1 | home | V12 §7.1 (T-V12-13) |
| V12-0268 | test | 7.1 | home | V12 §7.1 (T-V12-14) |
| V12-0269 | test | 7.1 | home | V12 §7.1 (T-V12-15) |
| V12-0270 | test | 7.1 | home | V12 §7.1 (T-V12-16) |
| V12-0271 | test | 7.1 | home | V12 §7.1 (T-V12-17) |
| V12-0272 | test | 7.1 | home | V12 §7.1 (T-V12-18) |
| V12-0273 | test | 7.1 | home | V12 §7.1 (T-V12-19) |
| V12-0274 | test | 7.1 | home | V12 §7.1 (T-V12-20) |
| V12-0275 | test | 7.1 | home | V12 §7.1 (T-V12-21) |
| V12-0276 | test | 7.1 | home | V12 §7.1 (T-V12-22) |
| V12-0277 | test | 7.1 | home | V12 §7.1 (T-V12-23) |
| V12-0278 | test | 7.1 | home | V12 §7.1 (T-V12-24) |
| V12-0279 | test | 7.1 | home | V12 §7.1 (T-V12-25) |
| V12-0280 | test | 7.1 | home | V12 §7.1 (T-V12-26) |
| V12-0281 | test | 7.1 | home | V12 §7.1 (T-V12-27) |
| V12-0282 | test | 7.1 | home | V12 §7.1 (T-V12-28) |
| V12-0283 | test | 7.1 | home | V12 §7.1 (T-V12-29) |
| V12-0284 | test | 7.1 | home | V12 §7.1 (T-V12-30) |
| V12-0285 | test | 7.1 | home | V12 §7.1 (T-V12-31) |
| V12-0286 | test | 7.1 | home | V12 §7.1 (T-V12-32) |
| V12-0287 | test | 7.1 | home | V12 §7.1 (T-V12-33) |
| V12-0288 | test | 7.1 | home | V12 §7.1 (T-V12-34) |
| V12-0289 | test | 7.1 | home | V12 §7.1 (T-V12-35) |
| V12-0290 | test | 7.1 | home | V12 §7.1 (T-V12-36) |
| V12-0291 | test | 7.1 | home | V12 §7.1 (T-V12-37) |
| V12-0292 | test | 7.1 | home | V12 §7.1 (T-V12-38) |
| V12-0293 | test | 7.1 | home | V12 §7.1 (T-V12-39) |
| V12-0294 | test | 7.1 | home | V12 §7.1 (T-V12-40) |
| V12-0295 | test | 7.1 | home | V12 §7.1 (T-V12-41) |
| V12-0296 | rule | 7.2 | home | V12 §7.2 |
| V12-0297 | rule | 8.1 | home | V12 §8.1 |
| V12-0298 | table | 8.2 | home | V12 §8.2 |
| V12-0299 | table | 8.2 | home | V12 §8.2 |
| V12-0300 | rule | 8.3 | home | V12 §8.3 |
| V12-0301 | decision | 9 | home | V12 §9 (J-V12.1 — its current form, E-24 mark where amended) |
| V12-0302 | decision | 9 | home | V12 §9 (J-V12.2 — its current form, E-24 mark where amended) |
| V12-0303 | decision | 9 | home | V12 §9 (J-V12.3 — its current form, E-24 mark where amended) |
| V12-0304 | decision | 9 | home | V12 §9 (J-V12.4 — its current form, E-24 mark where amended) |
| V12-0305 | decision | 9 | home | V12 §9 (J-V12.5 — its current form, E-24 mark where amended) |
| V12-0306 | decision | 9 | home | V12 §9 (J-V12.6 — its current form, E-24 mark where amended) |
| V12-0307 | decision | 9 | home | V12 §9 (J-V12.7 — its current form, E-24 mark where amended) |
| V12-0308 | decision | 9 | home | V12 §9 (J-V12.8 — its current form, E-24 mark where amended) |
| V12-0309 | decision | 9 | home | V12 §9 (J-V12.9 — its current form, E-24 mark where amended) |
| V12-0310 | decision | 9 | home | V12 §9 (J-V12.10 — its current form, E-24 mark where amended) |
| V12-0311 | decision | 9 | home | V12 §9 (J-V12.11 — its current form, E-24 mark where amended) |
| V12-0312 | decision | 9 | home | V12 §9 (J-V12.12 — its current form, E-24 mark where amended) |
| V12-0313 | decision | 9 | home | V12 §9 (J-V12.13 — its current form, E-24 mark where amended) |
| V12-0314 | decision | 9 | home | V12 §9 (J-V12.14 — its current form, E-24 mark where amended) |
| V12-0315 | decision | 9 | home | V12 §9 (J-V12.15 — its current form, E-24 mark where amended) |
| V12-0316 | decision | 9 | home | V12 §9 (J-V12.16 — its current form, E-24 mark where amended) |
| V12-0317 | decision | 9 | home | V12 §9 (J-V12.17 — its current form, E-24 mark where amended) |
| V12-0318 | decision | 9 | home | V12 §9 (J-V12.18 — its current form, E-24 mark where amended) |
| V12-0319 | decision | 9 | home | V12 §9 (J-V12.19 — its current form, E-24 mark where amended) |
| V12-0320 | decision | 9 | home | V12 §9 (J-V12.20 — its current form, E-24 mark where amended) |
| V12-0321 | decision | 9 | home | V12 §9 (J-V12.21 — its current form, E-24 mark where amended) |
| V12-0322 | decision | 9 | home | V12 §9 (J-V12.22 — its current form, E-24 mark where amended) |
| V12-0323 | decision | 9 | home | V12 §9 (J-V12.23 — its current form, E-24 mark where amended) |
| V12-0324 | decision | 9 | home | V12 §9 (J-V12.24 — its current form, E-24 mark where amended) |
| V12-0325 | decision | 9 | home | V12 §9 (J-V12.25 — its current form, E-24 mark where amended) |
| V12-0326 | decision | 9 | home | V12 §9 (J-V12.26 — its current form, E-24 mark where amended) |
| V12-0327 | decision | 9 | home | V12 §9 (J-V12.27 — its current form, E-24 mark where amended) |
| V12-0328 | decision | 9 | home | V12 §9 (J-V12.28 — its current form, E-24 mark where amended) |
| V12-0329 | decision | 9 | home | V12 §9 (J-V12.29 — its current form, E-24 mark where amended) |
| V12-0330 | decision | 9 | home | V12 §9 (J-V12.30 — its current form, E-24 mark where amended) |
| V12-0331 | decision | 9 | home | V12 §9 (J-V12.31 — its current form, E-24 mark where amended) |
| V12-0332 | decision | 9 | home | V12 §9 (J-V12.32 — its current form, E-24 mark where amended) |
| V12-0333 | decision | 9 | home | V12 §9 (J-V12.33 — its current form, E-24 mark where amended) |
| V12-0334 | decision | 9 | home | V12 §9 (J-V12.34 — its current form, E-24 mark where amended) |
| V12-0335 | decision | 9 | home | V12 §9 (J-V12.35 — its current form, E-24 mark where amended) |
| V12-0336 | decision | 9 | home | V12 §9 (J-V12.36 — its current form, E-24 mark where amended) |
| V12-0337 | decision | 9 | home | V12 §9 (J-V12.37 — its current form, E-24 mark where amended) |
| V12-0338 | decision | 9 | home | V12 §9 (J-V12.38 — its current form, E-24 mark where amended) |
| V12-0339 | decision | 9 | home | V12 §9 (J-V12.39 — its current form, E-24 mark where amended) |
| V12-0340 | decision | 9 | home | V12 §9 (J-V12.40 — its current form, E-24 mark where amended) |
| V12-0341 | decision | 9 | home | V12 §9 (J-V12.41 — its current form, E-24 mark where amended) |
| V12-0342 | decision | 9 | home | V12 §9 (J-V12.42 — its current form, E-24 mark where amended) |
| V12-0343 | decision | 9 | home | V12 §9 (J-V12.43 — its current form, E-24 mark where amended) |
| V12-0344 | decision | 9 | home | V12 §9 (J-V12.44 — its current form, E-24 mark where amended) |
| V12-0345 | decision | 9 | home | V12 §9 (J-V12.45 — its current form, E-24 mark where amended) |
| V12-0346 | decision | 9 | home | V12 §9 (J-V12.46 — its current form, E-24 mark where amended) |
| V12-0347 | decision | 9 | home | V12 §9 (J-V12.47 — its current form, E-24 mark where amended) |
| V12-0348 | decision | 9 | home | V12 §9 (J-V12.48 — its current form, E-24 mark where amended) |
| V12-0349 | decision | 9 | home | V12 §9 (J-V12.49 — its current form, E-24 mark where amended) |
| V12-0350 | decision | 9 | home | V12 §9 (J-V12.50 — its current form, E-24 mark where amended) |
| V12-0351 | decision | 9 | home | V12 §9 (J-V12.51 — its current form, E-24 mark where amended) |
| V12-0352 | decision | 9 | home | V12 §9 (J-V12.52 — its current form, E-24 mark where amended) |
| V12-0353 | decision | 9 | home | V12 §9 (J-V12.53 — its current form, E-24 mark where amended) |
| V12-0354 | decision | 9 | home | V12 §9 (J-V12.54 — its current form, E-24 mark where amended) |
| V12-0355 | decision | 9 | home | V12 §9 (J-V12.55 — its current form, E-24 mark where amended) |
| V12-0356 | decision | 9 | home | V12 §9 (J-V12.56 — its current form, E-24 mark where amended) |
| V12-0357 | decision | 9 | home | V12 §9 (J-V12.57 — its current form, E-24 mark where amended) |
| V12-0358 | decision | 9 | home | V12 §9 (J-V12.58 — its current form, E-24 mark where amended) |
| V12-0359 | decision | 9 | home | V12 §9 (J-V12.59 — its current form, E-24 mark where amended) |
| V12-0360 | decision | 9 | home | V12 §9 (J-V12.60 — its current form, E-24 mark where amended) |
| V12-0361 | decision | 9 | home | V12 §9 (J-V12.61 — its current form, E-24 mark where amended) |
| V12-0362 | decision | 9 | home | V12 §9 (J-V12.62 — its current form, E-24 mark where amended) |
| V12-0363 | decision | 9 | home | V12 §9 (J-V12.63 — its current form, E-24 mark where amended) |
| V12-0364 | decision | 9 | home | V12 §9 (J-V12.64 — its current form, E-24 mark where amended) |
| V12-0365 | decision | 9 | home | V12 §9 (J-V12.65 — its current form, E-24 mark where amended) |
| V12-0366 | decision | 9 | home | V12 §9 (J-V12.66 — its current form, E-24 mark where amended) |
| V12-0367 | decision | 9 | home | V12 §9 (J-V12.67 — its current form, E-24 mark where amended) |
| V12-0368 | decision | 9 | home | V12 §9 (J-V12.68 — its current form, E-24 mark where amended) |
| V12-0369 | decision | 9 | home | V12 §9 (J-V12.69 — its current form, E-24 mark where amended) |
| V12-0370 | decision | 9 | home | V12 §9 (J-V12.70 — its current form, E-24 mark where amended) |
| V12-0371 | decision | 9 | home | V12 §9 (J-V12.71 — its current form, E-24 mark where amended) |
| V12-0372 | decision | 9 | home | V12 §9 (J-V12.72 — its current form, E-24 mark where amended) |
| V12-0373 | decision | 9 | home | V12 §9 (J-V12.73 — its current form, E-24 mark where amended) |
| V12-0374 | decision | 9 | home | V12 §9 (J-V12.74 — its current form, E-24 mark where amended) |
| V12-0375 | decision | 9 | home | V12 §9 (J-V12.75 — its current form, E-24 mark where amended) |
| V12-0376 | decision | 9 | home | V12 §9 (J-V12.76 — its current form, E-24 mark where amended) |
| V12-0377 | decision | 9 | home | V12 §9 (J-V12.77 — its current form, E-24 mark where amended) |
| V12-0378 | decision | 9 | home | V12 §9 (J-V12.78 — its current form, E-24 mark where amended) |
| V12-0379 | decision | 9 | home | V12 §9 (J-V12.79 — its current form, E-24 mark where amended) |
| V12-0380 | decision | 9 | home | V12 §9 (J-V12.80 — its current form, E-24 mark where amended) |
| V12-0381 | decision | 9 | home | V12 §9 (J-V12.81 — its current form, E-24 mark where amended) |
| V12-0382 | decision | 9 | home | V12 §9 (J-V12.82 — its current form, E-24 mark where amended) |
| V12-0383 | decision | 9 | home | V12 §9 (J-V12.83 — its current form, E-24 mark where amended) |
| V12-0384 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-1 → file f item 496) |
| V12-0385 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-2 → file f item 497; BCR-V12-3 → file f item 503) |
| V12-0386 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-4 → file f item 504) |
| V12-0387 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-5 → file f item 381; BCR-V12-6 → file f item 500) |
| V12-0388 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-7 → file f item 491; BCR-V12-8 → file f item 535) |
| V12-0389 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-9 → file f item 533; BCR-V12-10 → file f item 521; BCR-V12-11 → file f item 569) |
| V12-0390 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-12 → file f item 501) |
| V12-0391 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-13 → file f item 488; BCR-V12-14 → file f item 502) |
| V12-0392 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-15 → file f item 447; BCR-V12-16 → file f item 489; BCR-V12-17 → file f item 447) |
| V12-0393 | bcr | 10 | bcr-pointer | V12 §10.1 pointer table (BCR-V12-18 → file f item 536; BCR-V12-19 → file f item 492; BCR-V12-20 → file f item 493; BCR-V12-21 → file f item 537; BCR-V12-22 → file f item 382) |
| V12-0394 | xreq | 10 | handoff | V12 §10.2 (X-V12-1 – X-V12-5 — each closed at its destination) |
| V12-0395 | xreq | 10 | handoff | V12 §10.2 (X-V12-6 – X-V12-10 — each closed at its destination) |
| V12-0396 | xreq | 10 | handoff | V12 §10.2 (X-V12-11 – X-V12-14 — each closed at its destination) |
| V12-0397 | xreq | 10 | handoff | V12 §10.2 (X-V12-15, X-V12-16 — each closed at its destination) |
| V12-0398 | xreq | 10 | handoff | V12 §10.2 (X-V12-17 — each closed at its destination) |
| V12-0399 | xreq | 10 | handoff | V12 §10.2 (X-V12-18, X-V12-19 — each closed at its destination) |
| V12-0400 | question | 11 | answer-J121-J122 | V12 §11 (every question answered: Q-V12-1, Q-V12-2, Q-V12-3 — J122) |
| V12-0401 | rule | 12 | home | V12 §12 (the current CONFIRMED and PLAUSIBLE lists; the round histories left to the validation records) |
| V12-0402 | rule | 13 | home | V12 §13 (none open); its variations folded at their homes (J-V12.55, J-V12.43, J-V12.56, J-V12.42); the water-system "factor" sentence removed with the narration (V12-ICONF-2) |
| V12-0403 | rule | IN | home | the Integration notes' map: IN-V12-1 → V12 §3.11; IN-V12-2 → V12 §10.2 (X-V12-9); IN-V12-3 → V12 §3.6b; IN-V12-4 → V12 §2.2, V12 §10.1 |


## 13 EDGES MAP — every catalogue edge and combination → its V12 §3.16 row

| edge | status in the catalogue | mechanism | where it is now defined and tested |
|---|---|---|---|
| M-V12-531-E5-data | UNDEFINED | V12 §2.3 (source) | V12 §3.16.1 row 1 |
| M-V12-588-E5-data | UNDEFINED | V12 §2.5 (source) | V12 §3.16.1 row 2 |
| M-V12-624-E5-data | UNTESTED | V12 §2.6 (source) | V12 §3.16.1 row 3 |
| M-V12-684-E5-data | UNDEFINED | V12 §2.7 (source) | V12 §3.16.1 row 4 |
| M-V12-733-E5-data | UNDEFINED | V12 §2.7b (source) | V12 §3.16.1 row 5 |
| M-V12-793-E5-data | UNTESTED | V12 §2.8 (source) | V12 §3.16.1 row 6 |
| M-V12-849-E5-data | UNDEFINED | V12 §2.9 (source) | V12 §3.16.1 row 7 |
| M-V12-880-E5-data | UNDEFINED | V12 §2.10 (source) | V12 §3.16.1 row 8 |
| M-V12-924-E5-data | UNDEFINED | V12 §2.12 (source) | V12 §3.16.1 row 9 |
| M-V12-957-E5-data | UNDEFINED | V12 §2.13 (source) | V12 §3.16.1 row 10 |
| M-V12-974-E1-none | UNDEFINED | V12 §3.1 (source) | V12 §3.16.1 row 11 |
| M-V12-974-E5-data | UNDEFINED | V12 §3.1 (source) | V12 §3.16.1 row 11 |
| M-V12-974-E7-toggles | UNDEFINED | V12 §3.1 (source) | V12 §3.16.1 row 11 |
| M-V12-996-E4-degenerate | UNDEFINED | V12 §3.2 (source) | V12 §3.16.1 row 12 |
| M-V12-1060-E2-one | UNDEFINED | V12 §3.3 (source) | V12 §3.16.1 row 13 |
| M-V12-1060-E5-data | UNDEFINED | V12 §3.3 (source) | V12 §3.16.1 row 13 |
| M-V12-1293-E4-degenerate | UNDEFINED | V12 §3.6 (source) | V12 §3.16.1 row 14 |
| M-V12-1399-E4-degenerate | UNDEFINED | V12 §3.6b (source) | V12 §3.16.1 row 15 |
| M-V12-1568-E4-degenerate | UNDEFINED | V12 §3.7 (source) | V12 §3.16.1 row 16 |
| M-V12-1709-E1-none | UNTESTED | V12 §3.8 (source) | V12 §3.16.1 row 17 |
| M-V12-1709-E2-one | UNTESTED | V12 §3.8 (source) | V12 §3.16.1 row 17 |
| M-V12-1709-E8-lifecycle | UNDEFINED | V12 §3.8 (source) | V12 §3.16.1 row 17 |
| M-V12-1722-E4-degenerate | UNDEFINED | V12 §3.9 (source) | V12 §3.16.1 row 18 |
| M-V12-1798-E4-degenerate | UNDEFINED | V12 §3.10 (source) | V12 §3.16.1 row 19 |
| M-V12-1949-E4-degenerate | UNDEFINED | V12 §3.11 (source) | V12 §3.16.1 row 20 |
| M-V12-2221-E5-data | UNDEFINED | V12 §3.12 (source) | V12 §3.16.1 row 21 |
| M-V12-2221-E8-lifecycle | UNDEFINED | V12 §3.12 (source) | V12 §3.16.1 row 21 |
| M-V12-2252-E1-none | UNDEFINED | V12 §3.13 (source) | V12 §3.16.1 row 22 |
| M-V12-2252-E6-rungs | UNDEFINED | V12 §3.13 (source) | V12 §3.16.1 row 22 |
| M-V12-2265-E4-degenerate | UNDEFINED | V12 §3.14 (source) | V12 §3.16.1 row 23 |
| M-V12-2265-E8-lifecycle | UNDEFINED | V12 §3.14 (source) | V12 §3.16.1 row 23 |
| M-V12-2350-E1-none | UNDEFINED | V12 §4.1 (source) | V12 §3.16.1 row 24 |
| M-V12-2350-E6-rungs | UNDEFINED | V12 §4.1 (source) | V12 §3.16.1 row 24 |
| M-V12-2371-E1-none | UNTESTED | V12 §4.2 (source) | V12 §3.16.1 row 25 |
| M-V12-2371-E5-data | UNTESTED | V12 §4.2 (source) | V12 §3.16.1 row 25 |
| M-V12-2371-E8-lifecycle | UNTESTED | V12 §4.2 (source) | V12 §3.16.1 row 25 |
| M-V12-2386-E1-none | UNDEFINED | V12 §4.3 (source) | V12 §3.16.1 row 26 |
| M-V12-2386-E2-one | UNTESTED | V12 §4.3 (source) | V12 §3.16.1 row 26 |
| M-V12-2395-E1-none | UNDEFINED | V12 §4.4 (source) | V12 §3.16.1 row 27 |
| M-V12-2395-E5-data | UNDEFINED | V12 §4.4 (source) | V12 §3.16.1 row 27 |
| M-V12-2408-E1-none | UNDEFINED | V12 §5.1 (source) | V12 §3.16.1 row 28 |
| M-V12-2408-E5-data | UNDEFINED | V12 §5.1 (source) | V12 §3.16.1 row 28 |
| M-V12-2408-E6-rungs | UNDEFINED | V12 §5.1 (source) | V12 §3.16.1 row 28 |
| M-V12-2408-E7-toggles | UNTESTED | V12 §5.1 (source) | V12 §3.16.1 row 28 |
| M-V12-2421-E1-none | UNDEFINED | V12 §5.2 (source) | V12 §3.16.1 row 29 |
| M-V12-2421-E2-one | UNDEFINED | V12 §5.2 (source) | V12 §3.16.1 row 29 |
| M-V12-2421-E4-degenerate | UNDEFINED | V12 §5.2 (source) | V12 §3.16.1 row 29 |
| M-V12-2421-E5-data | UNTESTED | V12 §5.2 (source) | V12 §3.16.1 row 29 |
| M-V12-2421-E8-lifecycle | UNDEFINED | V12 §5.2 (source) | V12 §3.16.1 row 29 |
| M-V12-2454-E1-none | UNDEFINED | V12 §5.5 (source) | V12 §3.16.1 row 30 |
| M-V12-2454-E2-one | UNTESTED | V12 §5.5 (source) | V12 §3.16.1 row 30 |

| combination | status | where it is now defined and tested |
|---|---|---|
| C-cliff-presets | UNDEFINED | V12 §3.16.2 row "cliff"; T-V12-43 |
| C-steep-presets | UNDEFINED | V12 §3.16.2 row "steep ground"; T-V12-43 |
| C-river-presets | UNDEFINED | V12 §3.16.2 row "river"; T-V12-43 |
| C-coast-presets | UNDEFINED | V12 §3.16.2 row "coast"; T-V12-43 |
| C-harbour-presets | UNDEFINED | V12 §3.16.2 row "harbour"; T-V12-43 |
| C-moat-presets | UNDEFINED | V12 §3.16.2 row "moat"; T-V12-43 |
| C-bridge-presets | UNDEFINED | V12 §3.16.2 row "bridge"; T-V12-43 |
| C-retaining-presets | UNDEFINED | V12 §3.16.2 row "retaining wall"; T-V12-43 |
| C-oasis-presets | UNDEFINED | V12 §3.16.2 row "oasis"; T-V12-43 |
| C-frame-presets | UNDEFINED | V12 §3.16.2 row "the frame"; T-V12-43 |
| C-terraced-ward-presets | UNDEFINED | V12 §3.16.2 row "terraced ward"; T-V12-43 |
| C-crypt-presets | UNDEFINED | V12 §3.16.2 row "crypt"; T-V12-43 |
| C-catacomb-presets | UNDEFINED | V12 §3.16.2 row "catacomb"; T-V12-43 |
| C-vault-presets | UNDEFINED | V12 §3.16.2 row "vault"; T-V12-43 |
| C-shade-presets | UNDEFINED | V12 §3.16.2 row "island shade"; T-V12-43 |
| C-landfall-presets | UNDEFINED | V12 §3.16.2 row "island landfall"; T-V12-43 |
| C-history-presets | UNDEFINED | V12 §3.16.2 row "history"; T-V12-43 |
