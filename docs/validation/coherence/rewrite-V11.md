# Rewrite — design volume V11 (the content system)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V11; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V11`, started 2026-09-30 21:15 in the cloud; continued after a context compaction from
part 18)
- P1 inputs gathered (canon unit V11: 554 STATE, 70 REFERENCE, 12 BCR blocks → 31 pointers, 7 hand-off blocks, 3 index
  rows, 20 conflicts, 53 f items, g items 111 and 113 plus the dated rulings for 114–119, 4 wiring gaps, E-05/E-20/E-24/
  E-30/E-34/E-37/E-38, ID-BCR/-WX/-DR/-DUPDEF, 40 hand-offs to V11, 52 UNDEFINED + 12 UNTESTED edges and 21 combinations,
  80 open findings): done (src/stripped.md by transform.py + strip.py)
- P2 head, §0, §1, §1b: done (parts 00, 01; E-34 applied to §1b's *consumed by* column at assembly)
- P3 §2: done (part 02; §2.8d new)
- P4 §3.1–§3.4: done (parts 03, 04; registry rows 92–106)
- P5 §3.5: done (part 05)
- P6 §3.6–§3.12: done (parts 06, 07)
- P7 §3.13–§3.22: done (parts 08, 09; §3.14.3 new)
- P8 §3.23–§3.24, the new §3.25 (items 111, 113–119) and §3.26 (edges): done (parts 10–13)
- P9 §4–§8: done (parts 14–16; T-V11-38 – T-V11-45)
- P10 §9–§13, Integration notes: done (parts 17, 18; J-V11.97 – J-V11.111; §10 pointers, §10b, §10c)
- P11 assemble, checks: done (ids, references, retired terms, deferral words, mapping probe, doc_checks provisional)
- P12 report body, mapping table, result file, LANDED: done

Source: `docs/volumes/V11-content.md` (5 411 lines, md5 0b37bab07c43b60155a76eaa87b228af). Output:
`docs/validation/coherence/new/volumes/V11-content.md` (5 069 lines; the same title line and section structure, one merged
marker line; new §2.8d, §3.14.3, §3.25, §3.26, §10c and an Integration-notes map). Working parts:
`docs/validation/coherence/work/rewrite-V11/parts/` (00 … 18, concatenated in that order); scripts beside them:
`transform.py` (citation forms, DR aliases, request ids, own-section refs) and `strip.py` (review-round ids, logged in
`src/strip-log.tsv`).

## 1 Sizes and the shrink goal

| measure | before | after |
|---|---|---|
| words (`str.split`, the canon's measure) | 106 185 | 101 965 (−4.0 %; the canon's band 63 711 – 79 639) |
| words (`wc -w`) | 103 331 | 99 176 |
| bytes | 650 238 (635.0 KB) | 608 669 (594.4 KB) |
| sections | §0–§13, Integration notes and its continuation, eleven reconciliation, continuation and finalization records | §0–§13 with new §2.8d, §3.14.3, §3.25, §3.26, §10c; an Integration-notes map |

| section | words before | words after |
|---|---|---|
| title, banners, *How to read* | 1 669 | 321 |
| §0 | 913 | 848 |
| §1 | 1 270 | 1 473 |
| §1b | 4 283 | 4 183 |
| §2 (without §2.8d) | 10 056 | 10 075 |
| §2.8d (new: items 113–119's row types) | 0 | 867 |
| §3 (without §3.25, §3.26) | 55 503 | 56 890 |
| §3.25 (new: items 111, 113–119) | 0 | 5 080 |
| §3.26 (new: edges and combinations) | 0 | 2 583 |
| §4 | 1 298 | 1 432 |
| §5 | 416 | 434 |
| §6 | 487 | 546 |
| §7 (with T-V11-38 – T-V11-45) | 2 772 | 3 863 |
| §8 | 2 780 | 2 919 |
| §9 (with J-V11.97 – J-V11.111) | 6 801 | 7 641 |
| §10 | 3 674 | 840 |
| §10b | 2 381 | 656 |
| §10c (new: the 40 requests made of V11) | 0 | 560 |
| §11 | 126 | 59 |
| §12 | 3 480 | 419 |
| §13 | 415 | 55 |
| Integration notes | 473 | 241 |
| reconciliation rounds, continuations, finalization | 7 388 | 0 |

**The four sources of the removed words** (≈ 20 200 removed, ≈ 16 000 added):
* **Narration** ≈ 13 100 — the eleven reconciliation, continuation and finalization records (7 388), §12's per-round
  CONFIRMED/PLAUSIBLE paragraphs, md5s, lane times and doc-check counts (≈ 3 060), the stacked banners and revision
  ledgers (≈ 1 350), §13's per-round disposition sentence and its closed F-V11-4 row (≈ 360), the Integration notes' prose
  (≈ 230), the review-round, seam and critique ids and "round N" clauses in the body (≈ 700, `strip-log.tsv`).
* **Restatement** ≈ 5 900 — §10's 31 request texts as a pointer table to the applied file f items (≈ 2 830); §10b's
  per-round companion narratives as one closure row per request (≈ 1 730); the base's cell shape, clamp rule, preset
  order, unit list and list-hit rule cited instead of restated (V11-RESTATE-1, -2, -4; RESTATEMENTS-001 – -006, ≈ 450);
  V07's village crypt cells, V09's bend constants, V04's span values and the other volumes' readings cited at their
  homes (≈ 300); readers restated in §1b cited by registry row (E-34, ≈ 860 net).
* **Duplicated mechanisms** ≈ 500 — V11-DUP-1/-2/-3 (the T-V11-5 rule, the competition override, the clamp rule each
  stated once), E-24 (four amendment marks), item 110's lifecycle as one pattern row with exceptions (E-34).
* **Verbose prose** ≈ 700 — the round-by-round rewording of §3.24's headings and §3.21.1's history, the conditional reader
  clauses (V11-ICONF-1), the "until … lands" phrasings.

**What holds the volume above the band** (principle (9): a goal, not a defect). The additions are mandated new design:
items 111 and 113–119's parts at build depth (§3.25 5 080 words and §2.8d 867, with their rows elsewhere — registry rows
92–106, W79–W86, lifecycle rows, the base hooks, T-V11-38 – T-V11-44, J-V11.97 – J-V11.107, ≈ 3 500 more); the edge
catalogue's 64 edges and 21 combinations (§3.26 2 583, T-V11-45); the 40 requests made of this volume (§10c 560); the
decisions closing the fix list (J-V11.108 – J-V11.111). In all ≈ 12 500 words of new design (an upper bound by line
markers is 15 300). Without them the carried text stands ≈ 16 % below its source. The irreducible remainder is content
at build depth that is this volume's own and no reference can replace: the class ladder's nine tables (§3.5, 11 800
words), the 280-kind institution map and the ladder types (§3.11–§3.12, 5 550), the registry (§3.1, 6 330), the goods,
templates, custom-content and item-109/110 rows (§3.6–§3.7, §3.13, §3.23–§3.24, ≈ 20 000), and the typed row shapes
(§2, 10 900). Every unit that shrank by more than half moved its content to a pointer or a map (§10, §10b, §12, §13, the
records), each audited in §11's mapping table.

## 2 File f and g items (cited as base text, never restated)

* **File f items that concern V11 (53):** 213, 226, 229, 238, 244, 246, 258, 259, 288, 289, 291, 297, 301, 311, 376, 377,
  379, 380, 381, 400, 401, 412, 425, 426, 427, 430, 432–442, 446, 456, 477, 501, 510, 516, 520, 532, 534, 553, 560, 564,
  566, 568, 576, 584 — each cited where the text reads it ("file f item N"), its text living in the base.
* **V11's own requests (31 + 1):** BCR-V11-1 → 432 (display cells 516); -2 → 433; -3 → 434; -4 → 510, 520; -5 → 258;
  -6 → 379; -7 → 400; -8 → 435; -10 → 380; -11 → 532, 568; -12 → 446; -13 → 436; -14 → 566; -15 → 553; -16 → 437;
  -17 → 438; -18 → 288; -19 → 439; -20 → 440; -21 → 534; -22 → 477; -23 → 456; -24 → 441; -25 → 442; -26 → 425; -27 →
  259; -28 → 289; -29 → 401; -30 → 412; -31 → 581 (with 377). BCR-V11-9, addressed to V08, is closed at V08 §2.6 and
  V08 §3.5 (no file f item). V11 §10 is the pointer table; each row names the base section.
* **File g, from item 111 onward (V11's parts at build depth):**
  * **item 111** — V11 §3.25.1 (dry-country cells per climate row: aridity, water chances as the feature table's by
    default, oasis chance and area band, grove and garden rows, the water-pull and water-term weights, the sun cell, the
    wells' factor), §3.17.2's `garden` land use, rows 43–44, W80, T-V11-38, J-V11.98.
  * **item 113** — V11 §3.25.2 (history settings: replay, epoch length, symbolic quantile, burial years and factors,
    reuse cost; the event-to-epoch rows by V08's neutral event key), rows 93–94, W81, T-V11-39, J-V11.99.
  * **item 114** (dated ruling) — V11 §3.25.3 (`walls.condition` cells, the generation shares by readiness × means, ten
    patch-material rows), rows 95–96, W82, T-V11-40, J-V11.100.
  * **item 115** (dated ruling) — V11 §3.25.4 (the grandeur ceiling by rung, the owner rows stamped `115 (b)`), row 97,
    W83, T-V11-41, J-V11.101.
  * **item 116** (dated ruling) — V11 §3.25.5 (`view.zoomOutMarginStops` 1 in the base settings row), row 92, W79,
    T-V11-44 (a), J-V11.102.
  * **item 117** (dated ruling; look only) — V11 §3.25.6 (season bands per climate row, surfaces, water lags, leaf
    palettes, leaf cover), rows 43, 98–101, W84, T-V11-42, J-V11.103.
  * **item 118** (dated ruling; look only) — V11 §3.25.7 (decorations by rung, staging keywords and fallback, motifs,
    generic festivals), rows 102–105, W85, T-V11-43, J-V11.104.
  * **item 119** (dated ruling) — V11 §3.25.8 (`perf.qualitySpend`, shipped empty; V11 §6's targets), row 106, W86,
    T-V11-44 (b), J-V11.105.

## 3 Conflicts resolved (20, plus two confirmations)

| conflict | ruling applied | where |
|---|---|---|
| DXC-05 | the registry's one home is V11 §3.1; the base's table values `reroll.maxAdvance` 3 and `crossing.searchBandM` 120 m (with KWG-06's `index.gridCellM`) are cells of the registered base settings row | V11 §3.1 row 92; §2.1's settings form; W79; J-V11.106 |
| MC-11 | `TableId` is §7.6's declaration; V11 cites it | V11 §2.1 |
| CF-PIPE-10 | each class's sector weights sum to 1 (walls, toll houses, customs house taxes 1.0) — V11 §3.15 already states it | V11 §3.15 (confirmed) |
| RIC-01 | `parchment` is a shipping ink-family variant | V11 §3.1's *Display cells* |
| V08-XCONF-9 | the era default is V08 §2.6's era row, culture alone | V11 §3.19.2 |
| V09-XAGREE-1 | the union key forms `uid:`, `cat:`, `cls:`, `use:`; `familyWeights` 0 · 0.5 · 1 · 2 · 3; `linkEdits` `{ bindTo?, avoid?, cut? }` with the three meanings | V11 §4.2 |
| V11-ICONF-1 | reads recorded under the reading stage function's StageId (S8, S8.seed, S5b); the conditional clauses gone | V11 §3.1 rows 62, 80, 81; J-V11.109 (J-V11.90, J-V11.92 amended by it) |
| V11-ICONF-2 | the duplicate lumber-camp produces entry deleted | V11 §3.7.2 |
| V11-ICONF-3 | "for every non-alias profile family" | V11 §3.13.3 |
| V11-ICONF-4 | `resolveSiting`'s count read from `REGISTRY` | V11 §6 |
| V11-ICONF-5 | 181 authored town and city classes, citing V11 §3.5.14 | J-V11.8, J-V11.94 |
| V11-ICONF-6 | the stale counts left with §12's narration; §12 states the live counts (107 rows, 181 classes) | V11 §12 |
| V11-ICONF-7 | "the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)" | V11 §3.12 |
| V11-XCONF-1 | `stateSnapCm`'s register entry is V12 §3.11's | V11 §3.24.1 |
| V11-XCONF-2 | row 87: `MsgRow` for `en.json`, `{ key; text }` for other locales; the loader refuses a locale file with `buttons`, `tone` or `codes` | V11 §3.1 row 87 |
| V12-XCONF-2 | the pinning hash is §7.6's (value, unit, `calibratable`, `extension`, `presets`; provenance excluded) | V11 §2.2; §3.2.1 step 7; T-V11-10 |
| V11-XCONF-3 | the bend cells "written at M3a; calibrated by V12 §3.11's terrace line" | V11 §3.24.1 |
| V11-XCONF-4 | "`register --check` joins CI at M1 (T-V12-20)" | V11 §8 C0 |
| CANON-C03 | Q-V11-1 answered by J122 | V11 §11; J-V11.107; V11 §3.14.3 |
| CANON-C04 | the fix list holds no open item | V11 §13; J-V11.110, J-V11.111 |
| V12-XCONF-4 (confirmation) | V12 §3.6's `servedShare` reads V11 §2.3's coverage units | V11 §1b W37 |
| SR6-08, SR6-09 (a), (c), (d) (INDEX §7) | row 87's row type; step 5a's `v.`-row case; the mages_guild cell | V11 §3.1 row 87; V11 §3.2.1 step 5a; V11 §3.12 |

## 4 Elegance rulings applied, with their equivalence lists

* **E-05 (the registry).** V11 §3.1 is the one registry; §7.6 cites it (file f item 379). ☑ every table §7.6 named has a
  row (T-V11-1); ☑ readers as V11 §3.1 states them, unioned with §7.6's and §1b's; ☑ the base's table values have a row
  (row 92, W-SET-01).
* **E-20 (no-op pins).** V11 §3.24.0 names every owner item's off form and says each no-op pin is a `NoOpPin`
  registration on V12 §3.7.8's engine reading it. ☑ the owner-rules copy's path-test list stays §13.2's; ☑ the
  declared-shift clause for goldens kept (V11 §3.2.5); ☑ each item's off-form values (items 110, 111, 113, 114, 115) and
  its bar id (T-V11-31, T-V11-38 – T-V11-41).
* **E-24 (one mark).** J-V11.50 amended by J-V11.71; J-V11.77 amended by J-V11.91; J-V11.90 and J-V11.92 amended by
  J-V11.109; J-V11.96 amended by J-V11.97. ☑ no row dropped; ☑ the governing row keeps the reason.
* **E-30 (reference cells).** V11 §3.2.1 step 6 resolves §7.6's reference cells for every table. ☑ the compile check (a
  reference to a missing row fails the build); ☑ `editTable`'s inverse and undo row are §7.6's; ☑ V07's references to
  V11 §3.6.1, §3.24.1, §3.24.4 read in the one form.
* **E-34 (readers once; one lifecycle pattern).** V11 §3.1's readers are the single list; §1b's *consumed by* cites the
  row and adds only non-table consumers (tests, exports, the clerk, the application where the row does not name them);
  §2.10's *read* column cites row numbers; item 110's tables share one lifecycle pattern row with per-table exceptions.
  ☑ the union of every reader listed before (W19's VS8 pump date in row 50, V11-WGAP-1; the V01, V05, V06, V07, V09,
  V10 and V12 consumers kept in §1b where no row names them); ☑ each table's exceptions to the pattern.
* **E-37 (one unit vocabulary).** V11 §2 cites §2.1's vocabulary; `ColumnUnit = Extract<Unit, …>` is V11's subset.
  ☑ `deg` and `cdeg` both kept; ☑ `count` and `people` both kept; ☑ V11's subset exactly its former list.
* **E-38 (`haPerHead`).** V11 states no `haPerHead`; registry row 41 (`farm`) keeps its rows unchanged. ☑ the farm rows'
  values unchanged; ☑ `A_T` is V07's; ☑ the register's farm lines are V12's.

## 5 Id rulings, renumberings and renames

* **ID-BCR / G-cite:** every bare `BCR-n` rewritten volume-qualified (`BCR-V4-45`); every short cite (`V6 §`, `V1-3.15`,
  `V4 §2.3a` …) rewritten `V0n §x.y` (transform.py, 256 hits); every bare own-section ref qualified `V11 §` (V11-BREF-2),
  including the ten in §9 found at assembly.
* **ID-WX:** W, X and IN rows are volume-local; other volumes' rows are cited "V02 X2", "V09 XV-V9-13".
* **ID-DR:** `DR-V8.n` and the other aliases → DR26–DR35 (19 hits).
* **ID-DUPDEF:** no id defined twice (script: 0 duplicates over W1–W86, T-V11-0 – T-V11-45, J-V11.1 – J-V11.111,
  X-V11-1 – X-V11-17, BCR-V11-1 – BCR-V11-31, registry rows 1–106 and 58a).
* **New ids:** registry rows 92–106; W79–W86; T-V11-38 – T-V11-45; J-V11.97 – J-V11.111; the why-id forms `clim/`,
  `hist/`, `wall/`, `patch/`, `ceil/`, `fest/`; §2.8d, §3.14.3, §3.25, §3.26, §10c.
* **Retired terms replaced:** G-lot (`lot-mix` → plot-mix), G-strike (strike pool), G-unitinput, G-panelgroup (the M4
  panel's M4-110 group), G-fallbackclass (item 104 (a)'s resolution), G-digest (`site.terrain`), `calibrate-later` →
  "provisional (V12 §3.11's register entry)" (V11-DEFER-2); grep count 0 for each.

## 6 Wiring gaps, hand-offs and open findings closed

* **Wiring gaps:** DWG-03 and W-SET-01 (the base settings row, row 92); KWG-06 (`index.gridCellM` 25 / 10 / 5 m in row
  92); V11-WGAP-1 (VS8 in row 50's readers).
* **Hand-offs to V11 (40):** each closed in V11's text and listed with its home in V11 §10c (V02 X2, X3, X5, X9, X13, X26,
  X32; V06 X1, X8, X20, X31, X35, X43, X45; V07 FL-2, FL-3; V08 X1, X2, X4, X5, X6, X9, X14, X19, X22, X25; V09 XV-V9-1,
  -2, -13, -31; V10 CVR-V10-6, -12, -16; V12 X-V12-1, -3, -9, -11, -15, -16, -18). X-V12-18 gained its sentence in V11 §8.
* **Hand-offs from V11 (X-V11-1 – X-V11-17):** each verified at its destination in the rewritten volumes and the new base
  and marked closed in V11 §10b (V11-HANDOFF-1).
* **Fix list:** V11-0635 – V11-0641 and V11-0644 closed: F-V11-1 by J-V11.110 (T-V11-2), F-V11-2 by J-V11.111
  (V11 §3.20.6), F-V11-3 at V04 §2.3 and V06 §3.18–§3.19 (they cite V11's rows), F-V11-4 already closed; V11 §13 reads
  "None open" (V11-DEFER-4, V11-DEFER-1).
* **Open findings routed to V11 (80):** all closed — the 18 narration and 10 integration-note findings by removal and
  folding (Integration notes map); the 17 restatement findings by citation; the 7 internal and 4 cross-volume conflicts
  by §3's rulings; V11-DUP-1 – -3; V11-MISSING-1 (Q-V11-1, J122; V11 §3.14.3), -2 (item 111), -3 (item 113), -4 (IN
  notes folded: V11 §3.2.1 step 4's `ownerRule` stamps and minima, V11 §3.24.1's bend cells, V11 §3.20's slices, V11
  §3.24.7 (1), V11 §3.16.1, V11 §3.24.2's pier cells), -5 (a `v.` row's commonness is V07 §2.4's rule, V11 §3.5.1), -6
  (`ownerRule` stamp and `dist/evidence.json` `{status, lines}`, V11 §3.2.1 steps 4, 7); V11-TERM-1; V11-DEFER-1 – -4
  (DEFER-3: the kind rows cite `research/sf` and the committed catalogue manifest); V11-BREF-1 (`garden` is the model's
  `LandUse` kind; V11 §3.17.2), -2, -3; V11-ELEG-1 (E-34); V11-EDGE-1 (the steep crossing: re-cut, else no levelling at
  the way, `W_UNLEVELLED_AT_WAY`, J-V11.108, T-V11-45), -2 (coverage ranges `target > 0`, `per > 0`, and the empty
  residential district, V11 §2.3); V11-WGAP-1; V11-HANDOFF-1; SR6-08, SR6-09.

## 7 Edges (principle (11))

All 64 catalogue edges (52 UNDEFINED, 12 UNTESTED; `M-V11-…-E1` – `-E8`, `EI-V11-EDGE-1`, `-2`) and the 21 UNDEFINED
combinations are closed in V11 §3.26 — each with its outcome, its rung on §5's ladder and its test (T-V11-45's clauses
(a)–(r) or the test named in the row); script check: 0 edge ids and 0 combination ids missing. Two general rules carry
most rows: the compile refuses a table breaking a declared range, `ref`, key or totality rule (V11 §3.2.1 steps 4–6),
and a run-time reader meeting an absent row reads the declared default, reported (V11 §3.2.3 (c)–(d)); geometry is the
kernel's (E-GEN-1).

## 8 Judgment calls (vetoable)

* J-V11.97 – J-V11.111 (V11 §9): the span values' home (V11 §3.24.2, since V04 §10 is a pointer table); items 111,
  113–119's table shapes; the base settings row; Q-V11-1's rows; the steep crossing; reads under the stage function's id;
  the ladder lessers and the vocabularies as decisions.
* Interpretations recorded here: the canon's "sun cell temperate value 0.02" is read as `w_sun` 0.02 × a cell of 1 (the
  arid cell −0.5 inverts the term); V08's `climates` targets are V11's six biome keys with winter severity as a column
  (not new biomes); the arid row's water chances default to the feature table's own (`null`), so item 111's no-op pin
  holds with every other cell at its neutral value (J-V11.98); the oasis gardens use the model's `LandUse` `garden`, not
  the pipeline's `garden_irrigated`.

## 9 CROSS-PART NOTES

For the seats of the other units and the assembler (each is V11's reading; none is edited from here):
1. **pipeline §4.9 / S12a (item 111):** the oasis and irrigated gardens are the model's `LandUse` kind `garden` (V11
   §3.17.2's row, V11 §3.25.1); the pipeline's `garden_irrigated` should read `garden` (V11-BREF-1).
2. **determinism §7.6:** declares `type TableId = string` (MC-11), the pinning hash (value, unit, `calibratable`,
   `extension`, `presets`; provenance excluded — V12-XCONF-2) and the one reference-cell form (E-30), which V11 §3.2.1
   steps 6–7 compute and resolve; §5.1 (6), §4.2 S1 (5), §6.3 and §3.3 cite V11 §3.1 row 92's cells (DXC-05, W-SET-01,
   KWG-06).
3. **V08 §2.6:** the `climates` row set targets V11's six biome keys (winter severity a column, V11 §3.25.6); the
   `historyEvents` rows target V11 §3.25.2's event keys; `readiness` V11 §3.25.3's bands; `festivals` V11 §3.25.7's
   kinds (sowing, midsummer and midwinter words → `harvest`); a record's `knownTo: 'public'` places a sensitive kind
   openly, concealed otherwise (J122; V11 §3.14.3).
4. **V06 §2.14, §3.20 (item 113):** `HistoryEventRow.type` is V08's neutral key and its destroy threshold is read as V11
   §3.25.2 states; V06's replay records its reads of rows 93–94 under EVO_PRELUDE, EVO_SITING and EVO_TERRAIN (row 93's
   readers).
5. **determinism §7.7 (item 114):** the generation-time condition row runs where the enceinte and its stretches are laid
   (S3, S7; row 95's readers).
6. **rendering §8.8 (item 116):** the zoom-out limit reads `base.settings.view.zoomOutMarginStops` (row 92).
7. **pipeline §4.1 and rendering §12 (item 119):** a stage above its target cites its `perf.qualitySpend` row (row 106);
   the targets and the comfort level stay §12's.
8. **V12 §3.11:** register lines for the calibratable cells of rows 93–105 (items 111, 113–118), rows 92 and 106 taking no
   entry; T-V11-38 – T-V11-43 register as `NoOpPin` suites on V12 §3.7.8; a several-method line is one staged entry
   (X-V12-18); V12 §3.6's `servedShare` over V11 §2.3's units (V12-XCONF-4).
9. **scope §16 and INDEX:** V11's content row prices 13.0–18.25 pw with the g rows +4.75–7.5 pw (items 103–119; file f
   items 532, 568).
10. **V07 §3.8, §5.1:** the village grandeur ceiling, seasons and festivals read V11 §3.25.4, §3.25.6, §3.25.7 (V07
    W75–W81); V07 §2.4 remains the one home of the `v.` rows' crypt cells (V11 §3.5.8 cites it).
11. **V04 §3.5.5 (b):** the burial depth factors are row 93's history cells (V11 §3.25.2).
12. **V09 §4.21:** the History chip's `history.defaultAgeYears` is V09's; the Material chip reads
    `walls.patchMaterials.label`; the season control reads row 43's season anchors.
13. **model §2.1 (E-37):** the one unit vocabulary includes V11's `lvl` and `weight`; V11 types its columns by
    `ColumnUnit = Extract<Unit, …>`.

## 10 Checks run (provisional where noted)

* **Ids:** 0 duplicate definitions; every cited J-V11, T-V11, X-V11, BCR-V11 and W id defined (script over the assembled
  file); J-V11.1 – J-V11.111, T-V11-0 – T-V11-45, W1–W86, X-V11-1 – X-V11-17, BCR-V11-1 – BCR-V11-31 without gaps.
* **References:** every `Vnn §x.y` resolves against the rewritten volumes (V11 against itself), and every bare `§x.y`
  against the new base and ARCHITECTURE.md headings; the one script hit, "V04 §1b.1", is a heading the script's pattern
  misses (V04 has `### 1b.1`).
* **Terms and wording:** 0 hits for the retired glossary terms (G-lot, G-strike, G-unitinput, G-panelgroup,
  G-fallbackclass, G-digest and the rest of the glossary), `calibrate-later`, review-round, seam and critique ids, bare
  `BCR-n`, "next round/revision", "TBD"; "later" and "until" read by hand (none a deferral).
* **Mapping probe:** for each of the 647 inventory statements, the identifiers and numbers it shares with the source were
  searched in the new text; 21 statements flagged, each explained in §11 (a retired term, a superseded price or count,
  a withdrawn cell, a narration id, or a value now cited at its home); three restored during the probe (W30, W31, W49's
  bar and field names; row 63's "twelve split from `relations`"; X-V11-7's and X-V11-12's cell names).
* **Edges:** 64 of 64 edge ids and 21 of 21 combinations present in V11 §3.26.
* **doc_checks (provisional):** `docs/validation/bench/doc_checks.py --doc <new V11> --heads docs/ARCHITECTURE.md` —
  WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external) — clean-room results are NOT authoritative. C1 0, C2 0, C4 3 (0 unreviewed), S1 0; C3 279 (268
  unreviewed; runs of section numbers and ordinary phrasing such as "which side of the law", "the parts of the map that"),
  S2 340 (this volume's own `V11 §` pointers, which the base's headings do not hold). The source volume under the same
  run: C3 346, C4 1, S2 439.

## 11 MAPPING TABLE — every inventory id of the volume → where it now lives

647 ids (554 home, 70 reference, 12 BCR blocks, 7 hand-off blocks, 3 index rows, 1 owner answer); 0 unmapped. Generated
from the canon's inventory extract of V11 (`inventory-vol-V11-V12.json`) and `canon.json`'s roles; a note after "—" says
why an identifier of the source statement is no longer in the text.

| inventory id | kind | source § | role | where it now lives |
|---|---|---|---|---|
| V11-0001 | summary | 0 | home | V11 §0 |
| V11-0002 | summary | 0 | home | V11 §0 |
| V11-0003 | summary | 0 | home | V11 §0 |
| V11-0004 | summary | 0 | home | V11 §0 |
| V11-0005 | summary | 0 | home | V11 §0 |
| V11-0006 | summary | 0 | home | V11 §0 |
| V11-0007 | scope | 0 | home | V11 §0 |
| V11-0008 | scope | 1 | home | V11 §1 |
| V11-0009 | interface | 1 | reference | V11 §1 cites determinism §7.6 |
| V11-0010 | interface | 1 | reference | V11 §1 cites pipeline §10.2 |
| V11-0011 | interface | 1 | reference | V11 §1 cites pipeline §4.2 |
| V11-0012 | interface | 1 | reference | V11 §1 cites pipeline §4.7 |
| V11-0013 | interface | 1 | reference | V11 §1 cites pipeline §4.7 |
| V11-0014 | interface | 1 | reference | V11 §1 cites pipeline §4.5 |
| V11-0015 | interface | 1 | reference | V11 §1 cites pipeline §4.9 |
| V11-0016 | interface | 1 | reference | V11 §1 cites pipeline §4.11 |
| V11-0017 | interface | 1 | reference | V11 §1 cites model §2.6 |
| V11-0018 | interface | 1 | reference | V11 §1 cites pipeline §10.4 |
| V11-0019 | interface | 1 | reference | V11 §1 cites determinism §7.1 |
| V11-0020 | interface | 1 | reference | V11 §1 cites V08 V08 §9 |
| V11-0021 | interface | 1 | reference | V11 §1 cites scope §17.1 |
| V11-0022 | interface | 1 | reference | V11 §1 cites scope §14 |
| V11-0023 | interface | 1 | reference | V11 §1 cites scope §13.2 |
| V11-0024 | interface | 1 | reference | V11 §1 cites model §2.6 |
| V11-0025 | interface | 1 | reference | V11 §1 cites pipeline II.7 |
| V11-0026 | interface | 1 | reference | V11 §1 cites V10 V10 §1b.2 |
| V11-0027 | interface | 1 | reference | V11 §1 cites model §2.2 |
| V11-0028 | scope | 1 | home | V11 §1 |
| V11-0029 | wiring | 1b | home | V11 §1b |
| V11-0030 | wiring | 1b | home | V11 §1b |
| V11-0031 | wiring | 1b | home | V11 §1b |
| V11-0032 | wiring | 1b | home | V11 §1b |
| V11-0033 | wiring | 1b | home | V11 §1b |
| V11-0034 | wiring | 1b | home | V11 §1b |
| V11-0035 | wiring | 1b | home | V11 §1b |
| V11-0036 | wiring | 1b | home | V11 §1b |
| V11-0037 | wiring | 1b | home | V11 §1b |
| V11-0038 | wiring | 1b | home | V11 §1b |
| V11-0039 | wiring | 1b | home | V11 §1b |
| V11-0040 | wiring | 1b | home | V11 §1b |
| V11-0041 | wiring | 1b | home | V11 §1b |
| V11-0042 | wiring | 1b | home | V11 §1b |
| V11-0043 | wiring | 1b | home | V11 §1b |
| V11-0044 | wiring | 1b | home | V11 §1b |
| V11-0045 | wiring | 1b | home | V11 §1b |
| V11-0046 | wiring | 1b | home | V11 §1b |
| V11-0047 | wiring | 1b | home | V11 §1b |
| V11-0048 | wiring | 1b | home | V11 §1b |
| V11-0049 | wiring | 1b | home | V11 §1b |
| V11-0050 | wiring | 1b | home | V11 §1b |
| V11-0051 | wiring | 1b | home | V11 §1b |
| V11-0052 | wiring | 1b | home | V11 §1b |
| V11-0053 | wiring | 1b | home | V11 §1b |
| V11-0054 | wiring | 1b | home | V11 §1b |
| V11-0055 | wiring | 1b | home | V11 §1b |
| V11-0056 | wiring | 1b | home | V11 §1b |
| V11-0057 | wiring | 1b | home | V11 §1b |
| V11-0058 | wiring | 1b | home | V11 §1b |
| V11-0059 | wiring | 1b | home | V11 §1b |
| V11-0060 | wiring | 1b | index-row | V11 §1b — retired G-digest → `site.terrain` |
| V11-0061 | wiring | 1b | home | V11 §1b |
| V11-0062 | wiring | 1b | home | V11 §1b |
| V11-0063 | wiring | 1b | home | V11 §1b |
| V11-0064 | wiring | 1b | home | V11 §1b |
| V11-0065 | wiring | 1b | home | V11 §1b |
| V11-0066 | wiring | 1b | index-row | V11 §1b |
| V11-0067 | wiring | 1b | home | V11 §1b |
| V11-0068 | wiring | 1b | home | V11 §1b |
| V11-0069 | wiring | 1b | home | V11 §1b |
| V11-0070 | wiring | 1b | home | V11 §1b |
| V11-0071 | wiring | 1b | home | V11 §1b |
| V11-0072 | wiring | 1b | home | V11 §1b |
| V11-0073 | wiring | 1b | home | V11 §1b |
| V11-0074 | wiring | 1b | home | V11 §1b |
| V11-0075 | wiring | 1b | home | V11 §1b |
| V11-0076 | wiring | 1b | home | V11 §1b |
| V11-0077 | wiring | 1b | home | V11 §1b — written "S10 and S11" |
| V11-0078 | wiring | 1b | home | V11 §1b |
| V11-0079 | wiring | 1b | home | V11 §1b |
| V11-0080 | wiring | 1b | home | V11 §1b |
| V11-0081 | wiring | 1b | home | V11 §1b |
| V11-0082 | wiring | 1b | home | V11 §1b |
| V11-0083 | wiring | 1b | home | V11 §1b |
| V11-0084 | wiring | 1b | home | V11 §1b |
| V11-0085 | wiring | 1b | index-row | V11 §1b |
| V11-0086 | wiring | 1b | home | V11 §1b |
| V11-0087 | wiring | 1b | home | V11 §1b |
| V11-0088 | wiring | 1b | home | V11 §1b |
| V11-0089 | wiring | 1b | home | V11 §1b |
| V11-0090 | wiring | 1b | home | V11 §1b |
| V11-0091 | wiring | 1b | home | V11 §1b |
| V11-0092 | wiring | 1b | home | V11 §1b |
| V11-0093 | wiring | 1b | home | V11 §1b |
| V11-0094 | wiring | 1b | home | V11 §1b |
| V11-0095 | wiring | 1b | home | V11 §1b |
| V11-0096 | wiring | 1b | home | V11 §1b |
| V11-0097 | wiring | 1b | home | V11 §1b |
| V11-0098 | wiring | 1b | home | V11 §1b |
| V11-0099 | wiring | 1b | home | V11 §1b |
| V11-0100 | wiring | 1b | home | V11 §1b |
| V11-0101 | wiring | 1b | home | V11 §1b |
| V11-0102 | wiring | 1b | home | V11 §1b |
| V11-0103 | wiring | 1b | home | V11 §1b |
| V11-0104 | wiring | 1b | home | V11 §1b |
| V11-0105 | wiring | 1b | home | V11 §1b |
| V11-0106 | wiring | 1b | home | V11 §1b |
| V11-0107 | rule | 2 | home | V11 §2 |
| V11-0108 | rule | 2 | reference | V11 §2 cites model §2.1 |
| V11-0109 | type | 2.1 | home | V11 §2.1 |
| V11-0110 | type | 2.1 | home | V11 §2.1 |
| V11-0111 | rule | 2.1 | reference | V11 §2.1 cites determinism §7.1 |
| V11-0112 | rule | 2.1 | home | V11 §2.1 |
| V11-0113 | type | 2.1 | home | V11 §2.1 |
| V11-0114 | type | 2.1 | home | V11 §2.1 |
| V11-0115 | rule | 2.1 | home | V11 §2.1 |
| V11-0116 | interface | 2.1 | home | V11 §2.1 |
| V11-0117 | rule | 2.1 | home | V11 §2.1 |
| V11-0118 | rule | 2.1 | home | V11 §2.1 |
| V11-0119 | type | 2.2 | home | V11 §2.2 |
| V11-0120 | type | 2.2 | home | V11 §2.2 |
| V11-0121 | type | 2.2 | home | V11 §2.2 |
| V11-0122 | type | 2.2 | reference | V11 §2.2 cites scope §17.1 |
| V11-0123 | rule | 2.2 | reference | V11 §2.2 cites determinism §7.6 — V01 §3.15 cited |
| V11-0124 | rule | 2.2 | home | V11 §2.2 |
| V11-0125 | rule | 2.2 | home | V11 §2.2 |
| V11-0126 | rule | 2.2 | home | V11 §2.2 |
| V11-0127 | type | 2.3 | home | V11 §2.3 |
| V11-0128 | type | 2.3 | home | V11 §2.3 |
| V11-0129 | type | 2.3 | home | V11 §2.3 |
| V11-0130 | rule | 2.3 | home | V11 §2.3 |
| V11-0131 | type | 2.3 | home | V11 §2.3 |
| V11-0132 | rule | 2.3 | home | V11 §2.3 |
| V11-0133 | rule | 2.3 | home | V11 §2.3 |
| V11-0134 | rule | 2.3 | home | V11 §2.3 |
| V11-0135 | rule | 2.3 | reference | V11 §2.3 cites V07 V07 §2.4 |
| V11-0136 | rule | 2.3 | home | V11 §2.3 |
| V11-0137 | rule | 2.3 | home | V11 §2.3 |
| V11-0138 | type | 2.4 | home | V11 §2.4 |
| V11-0139 | type | 2.4 | home | V11 §2.4 |
| V11-0140 | rule | 2.4 | home | V11 §2.4 |
| V11-0141 | type | 2.5 | home | V11 §2.5 |
| V11-0142 | type | 2.6 | home | V11 §2.6 |
| V11-0143 | type | 2.7 | home | V11 §2.7 |
| V11-0144 | type | 2.7 | home | V11 §2.7 |
| V11-0145 | rule | 2.8 | home | V11 §2.8 |
| V11-0146 | type | 2.8 | home | V11 §2.8 |
| V11-0147 | type | 2.8 | home | V11 §2.8 |
| V11-0148 | type | 2.8 | home | V11 §2.8 |
| V11-0149 | type | 2.8 | home | V11 §2.8 |
| V11-0150 | type | 2.8 | home | V11 §2.8 |
| V11-0151 | type | 2.8 | home | V11 §2.8 |
| V11-0152 | type | 2.8 | home | V11 §2.8 |
| V11-0153 | type | 2.8 | home | V11 §2.8 |
| V11-0154 | type | 2.8 | home | V11 §2.8 |
| V11-0155 | rule | 2.8b | reference | V11 §2.8b cites V04 V04 §1b.1 |
| V11-0156 | rule | 2.8b | home | V11 §2.8b |
| V11-0157 | rule | 2.8b | home | V11 §2.8b |
| V11-0158 | rule | 2.8c | home | V11 §2.8c |
| V11-0159 | type | 2.8c | home | V11 §2.8c |
| V11-0160 | type | 2.8c | home | V11 §2.8c |
| V11-0161 | type | 2.8c | home | V11 §2.8c |
| V11-0162 | type | 2.8c | home | V11 §2.8c |
| V11-0163 | type | 2.8c | home | V11 §2.8c |
| V11-0164 | type | 2.8c | home | V11 §2.8c |
| V11-0165 | type | 2.8c | home | V11 §2.8c |
| V11-0166 | type | 2.8c | home | V11 §2.8c |
| V11-0167 | type | 2.8c | home | V11 §2.8c |
| V11-0168 | rule | 2.8c | home | V11 §2.8c |
| V11-0169 | rule | 2.9 | home | V11 §2.9 |
| V11-0170 | rule | 2.9 | home | V11 §2.9 |
| V11-0171 | rule | 2.9 | home | V11 §2.9 |
| V11-0172 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0173 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0174 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0175 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0176 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0177 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0178 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0179 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0180 | lifecycle | 2.10 | reference | V11 §2.10 cites V04 V04 §9 |
| V11-0181 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0182 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0183 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0184 | lifecycle | 2.10 | reference | V11 §2.10 cites V01 V01 §2.7 |
| V11-0185 | lifecycle | 2.10 | reference | V11 §2.10 cites V01 V01 §2.7 |
| V11-0186 | lifecycle | 2.10 | reference | V11 §2.10 cites V09 V09 §2.3 |
| V11-0187 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0188 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0189 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0190 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0191 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0192 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0193 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0194 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0195 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0196 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0197 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0198 | lifecycle | 2.10 | home | V11 §2.10 |
| V11-0199 | rule | 2.10 | home | V11 §2.10 |
| V11-0200 | rule | 3 | home | V11 §3 |
| V11-0201 | rule | 3.1 | home | V11 §3.1 |
| V11-0202 | rule | 3.1 | home | V11 §3.1 |
| V11-0203 | rule | 3.1 | home | V11 §3.1 |
| V11-0204 | table | 3.1 | reference | V11 §3.1 cites scope §1.1 |
| V11-0205 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.2 |
| V11-0206 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.3 |
| V11-0207 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.7 |
| V11-0208 | table | 3.1 | home | V11 §3.1 |
| V11-0209 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.5 |
| V11-0210 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.2 |
| V11-0211 | table | 3.1 | reference | V11 §3.1 cites determinism §5.1 |
| V11-0212 | table | 3.1 | home | V11 §3.1 |
| V11-0213 | table | 3.1 | home | V11 §3.1 |
| V11-0214 | table | 3.1 | home | V11 §3.1 |
| V11-0215 | table | 3.1 | home | V11 §3.1 |
| V11-0216 | table | 3.1 | home | V11 §3.1 |
| V11-0217 | table | 3.1 | home | V11 §3.1 |
| V11-0218 | table | 3.1 | reference | V11 §3.1 cites pipeline §10.2 |
| V11-0219 | table | 3.1 | reference | V11 §3.1 cites pipeline §10.2 |
| V11-0220 | table | 3.1 | home | V11 §3.1 |
| V11-0221 | table | 3.1 | reference | V11 §3.1 cites pipeline §10.2 |
| V11-0222 | table | 3.1 | home | V11 §3.1 |
| V11-0223 | table | 3.1 | reference | V11 §3.1 cites V03 V03 §1b |
| V11-0224 | table | 3.1 | reference | V11 §3.1 cites V02 None |
| V11-0225 | table | 3.1 | home | V11 §3.1 |
| V11-0226 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.9 |
| V11-0227 | table | 3.1 | home | V11 §3.1 |
| V11-0228 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.11 |
| V11-0229 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.11 |
| V11-0230 | table | 3.1 | home | V11 §3.1 |
| V11-0231 | table | 3.1 | home | V11 §3.1 |
| V11-0232 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.7 |
| V11-0233 | table | 3.1 | reference | V11 §3.1 cites V05 V05 §1b |
| V11-0234 | table | 3.1 | reference | V11 §3.1 cites pipeline II.7.1 — V04 §1.1 cited |
| V11-0235 | table | 3.1 | reference | V11 §3.1 cites V04 V04 §2.3 |
| V11-0236 | table | 3.1 | home | V11 §3.1 |
| V11-0237 | table | 3.1 | reference | V11 §3.1 cites kernel §3.23.1 |
| V11-0238 | table | 3.1 | reference | V11 §3.1 cites V06 V06 §1b |
| V11-0239 | table | 3.1 | reference | V11 §3.1 cites V07 V07 §1b W28 |
| V11-0240 | table | 3.1 | reference | V11 §3.1 cites V01 V01 §2.2 |
| V11-0241 | table | 3.1 | reference | V11 §3.1 cites V08 V08 §2.6 — V09's why card cited |
| V11-0242 | table | 3.1 | home | V11 §3.1 |
| V11-0243 | table | 3.1 | home | V11 §3.1 |
| V11-0244 | table | 3.1 | home | V11 §3.1 |
| V11-0245 | table | 3.1 | reference | V11 §3.1 cites pipeline §4.5 |
| V11-0246 | table | 3.1 | home | V11 §3.1 |
| V11-0247 | table | 3.1 | home | V11 §3.1 |
| V11-0248 | table | 3.1 | home | V11 §3.1 |
| V11-0249 | table | 3.1 | home | V11 §3.1 |
| V11-0250 | table | 3.1 | reference | V11 §3.1 cites kernel §3.15 |
| V11-0251 | table | 3.1 | home | V11 §3.1 |
| V11-0252 | table | 3.1 | home | V11 §3.1 |
| V11-0253 | table | 3.1 | reference | V11 §3.1 cites V08 V08 §2.4 |
| V11-0254 | table | 3.1 | home | V11 §3.1 |
| V11-0255 | table | 3.1 | home | V11 §3.1 |
| V11-0256 | table | 3.1 | home | V11 §3.1 |
| V11-0257 | table | 3.1 | home | V11 §3.1 |
| V11-0258 | table | 3.1 | home | V11 §3.1 |
| V11-0259 | table | 3.1 | home | V11 §3.1 |
| V11-0260 | table | 3.1 | reference | V11 §3.1 cites V09 V09 §2.3 |
| V11-0261 | table | 3.1 | reference | V11 §3.1 cites V09 V09 §7.1 |
| V11-0262 | table | 3.1 | reference | V11 §3.1 cites V10 V10 §2.10 |
| V11-0263 | table | 3.1 | reference | V11 §3.1 cites V01 V01 §2.2 |
| V11-0264 | table | 3.1 | reference | V11 §3.1 cites model §2.2 |
| V11-0265 | number | 3.1 | home | V11 §3.1 |
| V11-0266 | rule | 3.1 | home | V11 §3.1 |
| V11-0267 | rule | 3.1 | home | V11 §3.1 |
| V11-0268 | rule | 3.1 | home | V11 §3.1 |
| V11-0269 | rule | 3.1 | home | V11 §3.1 |
| V11-0270 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0271 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0272 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0273 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0274 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0275 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0276 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0277 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0278 | mechanism | 3.2.1 | home | V11 §3.2.1 |
| V11-0279 | mechanism | 3.2.2 | home | V11 §3.2.2 |
| V11-0280 | rule | 3.2.3 | home | V11 §3.2.3 |
| V11-0281 | rule | 3.2.4 | home | V11 §3.2.4 |
| V11-0282 | rule | 3.2.5 | home | V11 §3.2.5 |
| V11-0283 | rule | 3.2.6 | reference | V11 §3.2.6 cites scope §17.1 |
| V11-0284 | table | 3.3.1 | home | V11 §3.3.1 |
| V11-0285 | table | 3.3.1 | home | V11 §3.3.1 |
| V11-0286 | table | 3.3.1 | home | V11 §3.3.1 |
| V11-0287 | table | 3.3.1 | home | V11 §3.3.1 |
| V11-0288 | table | 3.3.1 | home | V11 §3.3.1 |
| V11-0289 | rule | 3.3.2 | home | V11 §3.3.2 |
| V11-0290 | rule | 3.3.3 | home | V11 §3.3.3 |
| V11-0291 | rule | 3.3.3 | home | V11 §3.3.3 |
| V11-0292 | mechanism | 3.3.4 | home | V11 §3.3.4 |
| V11-0293 | number | 3.3.5 | home | V11 §3.3.5 |
| V11-0294 | rule | 3.4 | home | V11 §3.4 |
| V11-0295 | table | 3.4 | home | V11 §3.4 |
| V11-0296 | table | 3.4 | home | V11 §3.4 |
| V11-0297 | table | 3.4 | home | V11 §3.4 |
| V11-0298 | table | 3.4 | home | V11 §3.4 |
| V11-0299 | table | 3.4 | home | V11 §3.4 |
| V11-0300 | table | 3.4 | home | V11 §3.4 |
| V11-0301 | table | 3.4 | home | V11 §3.4 |
| V11-0302 | rule | 3.4 | home | V11 §3.4 |
| V11-0303 | rule | 3.4 | home | V11 §3.4 |
| V11-0304 | table | 3.5.1 | home | V11 §3.5.1 |
| V11-0305 | table | 3.5.1 | home | V11 §3.5.1 |
| V11-0306 | rule | 3.5.1 | home | V11 §3.5.1 |
| V11-0307 | rule | 3.5.1 | home | V11 §3.5.1 |
| V11-0308 | number | 3.5.1 | home | V11 §3.5.1 |
| V11-0309 | rule | 3.5.1 | home | V11 §3.5.1 |
| V11-0310 | rule | 3.5.1 | home | V11 §3.5.1 |
| V11-0311 | number | 3.5.1 | home | V11 §3.5.1 |
| V11-0312 | rule | 3.5.1 | home | V11 §3.5.1 |
| V11-0313 | rule | 3.5.2 | home | V11 §3.5.2 |
| V11-0314 | rule | 3.5.2 | home | V11 §3.5.2 |
| V11-0315 | rule | 3.5.2 | home | V11 §3.5.2 |
| V11-0316 | table | 3.5.3 | home | V11 §3.5.3 |
| V11-0317 | table | 3.5.4 | home | V11 §3.5.4 |
| V11-0318 | table | 3.5.4 | home | V11 §3.5.4 |
| V11-0319 | table | 3.5.5 | home | V11 §3.5.5 |
| V11-0320 | table | 3.5.5 | home | V11 §3.5.5 |
| V11-0321 | table | 3.5.5 | home | V11 §3.5.5 |
| V11-0322 | table | 3.5.6 | home | V11 §3.5.6 |
| V11-0323 | table | 3.5.6 | home | V11 §3.5.6 |
| V11-0324 | table | 3.5.6 | home | V11 §3.5.6 |
| V11-0325 | table | 3.5.7 | home | V11 §3.5.7 |
| V11-0326 | table | 3.5.7 | home | V11 §3.5.7 |
| V11-0327 | table | 3.5.8 | home | V11 §3.5.8 |
| V11-0328 | table | 3.5.8 | home | V11 §3.5.8 |
| V11-0329 | table | 3.5.8 | home | V11 §3.5.8 |
| V11-0330 | rule | 3.5.8 | home | V11 §3.5.8 |
| V11-0331 | rule | 3.5.8 | home | V11 §3.5.8 |
| V11-0332 | rule | 3.5.8 | reference | V11 §3.5.8 cites V07 V07 §2.4 |
| V11-0333 | table | 3.5.9 | home | V11 §3.5.9 |
| V11-0334 | table | 3.5.10 | home | V11 §3.5.10 |
| V11-0335 | table | 3.5.11 | home | V11 §3.5.11 |
| V11-0336 | table | 3.5.11 | home | V11 §3.5.11 |
| V11-0337 | table | 3.5.12 | home | V11 §3.5.12 |
| V11-0338 | table | 3.5.13 | reference | V11 §3.5.13 cites V05 V05 §3.10 |
| V11-0339 | number | 3.5.14 | home | V11 §3.5.14 |
| V11-0340 | table | 3.5.15 | home | V11 §3.5.15 |
| V11-0341 | rule | 3.6.1 | home | V11 §3.6.1 |
| V11-0342 | rule | 3.6.1 | home | V11 §3.6.1 |
| V11-0343 | table | 3.6.1 | home | V11 §3.6.1 |
| V11-0344 | table | 3.6.1 | home | V11 §3.6.1 |
| V11-0345 | table | 3.6.1 | home | V11 §3.6.1 |
| V11-0346 | table | 3.6.1 | home | V11 §3.6.1 |
| V11-0347 | table | 3.6.1 | home | V11 §3.6.1 |
| V11-0348 | table | 3.6.1 | home | V11 §3.6.1 |
| V11-0349 | table | 3.6.1 | home | V11 §3.6.1 |
| V11-0350 | rule | 3.6.1 | home | V11 §3.6.1 |
| V11-0351 | table | 3.6.2 | home | V11 §3.6.2 |
| V11-0352 | table | 3.6.3 | home | V11 §3.6.3 |
| V11-0353 | table | 3.6.4 | home | V11 §3.6.4 |
| V11-0354 | table | 3.6.5 | home | V11 §3.6.5 |
| V11-0355 | table | 3.7.1 | home | V11 §3.7.1 |
| V11-0356 | table | 3.7.1 | home | V11 §3.7.1 |
| V11-0357 | table | 3.7.1 | home | V11 §3.7.1 |
| V11-0358 | rule | 3.7.1 | home | V11 §3.7.1 |
| V11-0359 | table | 3.7.2 | home | V11 §3.7.2 |
| V11-0360 | table | 3.7.2 | home | V11 §3.7.2 |
| V11-0361 | rule | 3.7.3 | home | V11 §3.7.3 |
| V11-0362 | table | 3.7.4 | home | V11 §3.7.4 |
| V11-0363 | rule | 3.7.4 | home | V11 §3.7.4 |
| V11-0364 | rule | 3.7.4 | home | V11 §3.7.4 |
| V11-0365 | table | 3.8 | home | V11 §3.8 |
| V11-0366 | table | 3.8 | home | V11 §3.8 |
| V11-0367 | table | 3.8 | home | V11 §3.8 |
| V11-0368 | rule | 3.8 | home | V11 §3.8 |
| V11-0369 | table | 3.9 | home | V11 §3.9 |
| V11-0370 | table | 3.9 | home | V11 §3.9 |
| V11-0371 | rule | 3.9 | home | V11 §3.9 |
| V11-0372 | table | 3.10 | home | V11 §3.10 |
| V11-0373 | table | 3.10 | home | V11 §3.10 |
| V11-0374 | rule | 3.10 | home | V11 §3.10 |
| V11-0375 | rule | 3.11 | home | V11 §3.11 |
| V11-0376 | rule | 3.11 | home | V11 §3.11 |
| V11-0377 | rule | 3.11 | home | V11 §3.11 |
| V11-0378 | table | 3.11 | home | V11 §3.11 |
| V11-0379 | table | 3.11 | home | V11 §3.11 |
| V11-0380 | table | 3.11 | home | V11 §3.11 |
| V11-0381 | table | 3.11 | home | V11 §3.11 |
| V11-0382 | table | 3.11 | home | V11 §3.11 |
| V11-0383 | table | 3.11 | home | V11 §3.11 |
| V11-0384 | table | 3.11 | home | V11 §3.11 |
| V11-0385 | table | 3.11 | home | V11 §3.11 |
| V11-0386 | table | 3.11 | home | V11 §3.11 |
| V11-0387 | table | 3.11 | home | V11 §3.11 |
| V11-0388 | table | 3.11 | home | V11 §3.11 |
| V11-0389 | table | 3.11 | home | V11 §3.11 |
| V11-0390 | table | 3.11 | home | V11 §3.11 |
| V11-0391 | table | 3.11 | home | V11 §3.11 |
| V11-0392 | table | 3.11 | home | V11 §3.11 |
| V11-0393 | rule | 3.12 | home | V11 §3.12 |
| V11-0394 | rule | 3.12 | home | V11 §3.12 |
| V11-0395 | rule | 3.12 | home | V11 §3.12 |
| V11-0396 | rule | 3.12 | home | V11 §3.12 |
| V11-0397 | rule | 3.12 | home | V11 §3.12 |
| V11-0398 | rule | 3.12 | home | V11 §3.12 |
| V11-0399 | table | 3.12 | home | V11 §3.12 |
| V11-0400 | table | 3.12 | home | V11 §3.12 |
| V11-0401 | table | 3.12 | home | V11 §3.12 |
| V11-0402 | table | 3.12 | home | V11 §3.12 |
| V11-0403 | table | 3.12 | home | V11 §3.12 |
| V11-0404 | table | 3.12 | home | V11 §3.12 |
| V11-0405 | table | 3.12 | home | V11 §3.12 |
| V11-0406 | rule | 3.13 | home | V11 §3.13 |
| V11-0407 | table | 3.13.1 | home | V11 §3.13.1 |
| V11-0408 | table | 3.13.2 | home | V11 §3.13.2 |
| V11-0409 | table | 3.13.2 | home | V11 §3.13.2 |
| V11-0410 | table | 3.13.2 | home | V11 §3.13.2 |
| V11-0411 | table | 3.13.2 | home | V11 §3.13.2 |
| V11-0412 | table | 3.13.2 | home | V11 §3.13.2 |
| V11-0413 | rule | 3.13.2 | home | V11 §3.13.2 |
| V11-0414 | rule | 3.13.3 | home | V11 §3.13.3 |
| V11-0415 | table | 3.13.4 | home | V11 §3.13.4 |
| V11-0416 | table | 3.13.4 | home | V11 §3.13.4 |
| V11-0417 | rule | 3.13.5 | home | V11 §3.13.5 |
| V11-0418 | table | 3.14.1 | home | V11 §3.14.1 |
| V11-0419 | table | 3.14.2 | home | V11 §3.14.2 |
| V11-0420 | table | 3.15 | home | V11 §3.15 |
| V11-0421 | table | 3.15 | home | V11 §3.15 |
| V11-0422 | table | 3.16.1 | home | V11 §3.16.1 |
| V11-0423 | rule | 3.16.1 | home | V11 §3.16.1 |
| V11-0424 | number | 3.16.1 | home | V11 §3.16.1 |
| V11-0425 | table | 3.16.2 | home | V11 §3.16.2 |
| V11-0426 | table | 3.17.1 | home | V11 §3.17.1 |
| V11-0427 | table | 3.17.2 | home | V11 §3.17.2 |
| V11-0428 | table | 3.18 | home | V11 §3.18 |
| V11-0429 | table | 3.18 | home | V11 §3.18 |
| V11-0430 | rule | 3.18 | home | V11 §3.18 |
| V11-0431 | table | 3.19.1 | home | V11 §3.19.1 |
| V11-0432 | rule | 3.19.2 | reference | V11 §3.19.2 cites V08 None |
| V11-0433 | table | 3.19.3 | home | V11 §3.19.3 |
| V11-0434 | rule | 3.19.3 | home | V11 §3.19.3 |
| V11-0435 | rule | 3.20 | reference | V11 §3.20 cites pipeline §10.4 |
| V11-0436 | table | 3.20.1 | home | V11 §3.20.1 |
| V11-0437 | table | 3.20.1 | home | V11 §3.20.1 |
| V11-0438 | table | 3.20.1 | home | V11 §3.20.1 |
| V11-0439 | rule | 3.20.2 | home | V11 §3.20.2 |
| V11-0440 | rule | 3.20.3 | home | V11 §3.20.3 |
| V11-0441 | table | 3.20.3 | home | V11 §3.20.3 |
| V11-0442 | rule | 3.20.4 | home | V11 §3.20.4 |
| V11-0443 | table | 3.20.5 | home | V11 §3.20.5 |
| V11-0444 | rule | 3.20.6 | home | V11 §3.20.6 |
| V11-0445 | table | 3.21.1 | home | V11 §3.21.1 |
| V11-0446 | table | 3.21.2 | home | V11 §3.21.2 |
| V11-0447 | rule | 3.21.3 | home | V11 §3.21.3 |
| V11-0448 | rule | 3.21.4 | home | V11 §3.21.4 |
| V11-0449 | table | 3.22 | home | V11 §3.22 |
| V11-0450 | rule | 3.23 | reference | V11 §3.23 cites V04 V04 §1b.1 |
| V11-0451 | number | 3.23.1 | home | V11 §3.23.1 |
| V11-0452 | table | 3.23.2 | home | V11 §3.23.2 |
| V11-0453 | rule | 3.23.3 | reference | V11 §3.23.3 cites V04 V04 §3.5.0a |
| V11-0454 | table | 3.23.4 | home | V11 §3.23.4 |
| V11-0455 | rule | 3.23.4 | home | V11 §3.23.4 |
| V11-0456 | table | 3.23.5 | home | V11 §3.23.5 |
| V11-0457 | number | 3.23.6 | home | V11 §3.23.6 |
| V11-0458 | number | 3.23.7 | home | V11 §3.23.7 |
| V11-0459 | number | 3.23.7 | home | V11 §3.23.7 |
| V11-0460 | table | 3.23.8 | home | V11 §3.23.8 |
| V11-0461 | rule | 3.23.8 | home | V11 §3.23.8 |
| V11-0462 | rule | 3.23.9 | home | V11 §3.23.9 |
| V11-0463 | rule | 3.24 | home | V11 §3.24 — written "S10 and S11" |
| V11-0464 | table | 3.24.0 | home | V11 §3.24.0 |
| V11-0465 | table | 3.24.1 | home | V11 §3.24.1 |
| V11-0466 | rule | 3.24.1 | home | V11 §3.24.1 |
| V11-0467 | rule | 3.24.1 | home | V11 §3.24.1 |
| V11-0468 | table | 3.24.1 | home | V11 §3.24.1 |
| V11-0469 | rule | 3.24.1 | home | V11 §3.24.1 |
| V11-0470 | table | 3.24.2 | home | V11 §3.24.2 |
| V11-0471 | number | 3.24.2 | home | V11 §3.24.2 |
| V11-0472 | rule | 3.24.2 | home | V11 §3.24.2 |
| V11-0473 | number | 3.24.2 | home | V11 §3.24.2 |
| V11-0474 | rule | 3.24.2 | home | V11 §3.24.2 |
| V11-0475 | rule | 3.24.2 | home | V11 §3.24.2 |
| V11-0476 | table | 3.24.3 | home | V11 §3.24.3 |
| V11-0477 | rule | 3.24.3 | home | V11 §3.24.3 |
| V11-0478 | rule | 3.24.3 | home | V11 §3.24.3 |
| V11-0479 | table | 3.24.4 | home | V11 §3.24.4 |
| V11-0480 | rule | 3.24.4 | home | V11 §3.24.4 |
| V11-0481 | table | 3.24.4 | home | V11 §3.24.4 |
| V11-0482 | table | 3.24.5 | home | V11 §3.24.5 |
| V11-0483 | rule | 3.24.6 | home | V11 §3.24.6 |
| V11-0484 | rule | 3.24.7 | home | V11 §3.24.7 |
| V11-0485 | rule | 3.24.7 | home | V11 §3.24.7 |
| V11-0486 | rule | 4.1 | reference | V11 §4.1 cites determinism §7.1 |
| V11-0487 | rule | 4.2 | home | V11 §4.2 |
| V11-0488 | type | 4.2 | home | V11 §4.2 |
| V11-0489 | type | 4.2 | home | V11 §4.2 |
| V11-0490 | rule | 4.2 | reference | V11 §4.2 cites V09 None |
| V11-0491 | rule | 4.3 | home | V11 §4.3 |
| V11-0492 | lifecycle | 4.4 | home | V11 §4.4 |
| V11-0493 | interface | 4.5 | home | V11 §4.5 |
| V11-0494 | rule | 5 | home | V11 §5 |
| V11-0495 | rule | 5 | home | V11 §5 |
| V11-0496 | rule | 5 | home | V11 §5 |
| V11-0497 | number | 6 | home | V11 §6 — count read from REGISTRY (V11-ICONF-4) |
| V11-0498 | rule | 6 | home | V11 §6 |
| V11-0499 | test | 7.1 | home | V11 §7.1 |
| V11-0500 | test | 7.1 | home | V11 §7.1 |
| V11-0501 | test | 7.1 | home | V11 §7.1 |
| V11-0502 | test | 7.1 | home | V11 §7.1 |
| V11-0503 | test | 7.1 | home | V11 §7.1 |
| V11-0504 | test | 7.1 | home | V11 §7.1 |
| V11-0505 | test | 7.1 | home | V11 §7.1 |
| V11-0506 | test | 7.1 | home | V11 §7.1 |
| V11-0507 | test | 7.1 | home | V11 §7.1 |
| V11-0508 | test | 7.1 | home | V11 §7.1 |
| V11-0509 | test | 7.2 | home | V11 §7.2 |
| V11-0510 | test | 7.2 | home | V11 §7.2 |
| V11-0511 | test | 7.2 | home | V11 §7.2 |
| V11-0512 | test | 7.2 | home | V11 §7.2 |
| V11-0513 | test | 7.2 | home | V11 §7.2 |
| V11-0514 | test | 7.2 | home | V11 §7.2 |
| V11-0515 | test | 7.2 | home | V11 §7.2 |
| V11-0516 | rule | 7.3 | home | V11 §7.3 |
| V11-0517 | table | 8 | home | V11 §8 |
| V11-0518 | table | 8 | home | V11 §8 — price superseded by V11 §8's totals; price superseded by V11 §8's totals with the g rows; superseded by V11 §8's totals |
| V11-0519 | rule | 8 | home | V11 §8 |
| V11-0520 | decision | 9 | home | V11 §9 |
| V11-0521 | decision | 9 | home | V11 §9 — count read from REGISTRY (V11-ICONF-4) |
| V11-0522 | decision | 9 | home | V11 §9 |
| V11-0523 | decision | 9 | home | V11 §9 |
| V11-0524 | decision | 9 | home | V11 §9 |
| V11-0525 | decision | 9 | home | V11 §9 |
| V11-0526 | decision | 9 | home | V11 §9 |
| V11-0527 | decision | 9 | home | V11 §9 — 181 (V11-ICONF-5) |
| V11-0528 | decision | 9 | home | V11 §9 |
| V11-0529 | decision | 9 | home | V11 §9 |
| V11-0530 | decision | 9 | home | V11 §9 |
| V11-0531 | decision | 9 | home | V11 §9 |
| V11-0532 | decision | 9 | home | V11 §9 |
| V11-0533 | decision | 9 | home | V11 §9 |
| V11-0534 | decision | 9 | home | V11 §9 |
| V11-0535 | decision | 9 | home | V11 §9 |
| V11-0536 | decision | 9 | home | V11 §9 |
| V11-0537 | decision | 9 | home | V11 §9 |
| V11-0538 | decision | 9 | home | V11 §9 |
| V11-0539 | decision | 9 | home | V11 §9 |
| V11-0540 | decision | 9 | home | V11 §9 |
| V11-0541 | decision | 9 | home | V11 §9 |
| V11-0542 | decision | 9 | home | V11 §9 |
| V11-0543 | decision | 9 | home | V11 §9 |
| V11-0544 | decision | 9 | home | V11 §9 |
| V11-0545 | decision | 9 | home | V11 §9 |
| V11-0546 | decision | 9 | home | V11 §9 |
| V11-0547 | decision | 9 | home | V11 §9 |
| V11-0548 | decision | 9 | home | V11 §9 |
| V11-0549 | decision | 9 | home | V11 §9 |
| V11-0550 | decision | 9 | home | V11 §9 |
| V11-0551 | decision | 9 | home | V11 §9 |
| V11-0552 | decision | 9 | home | V11 §9 |
| V11-0553 | decision | 9 | home | V11 §9 |
| V11-0554 | decision | 9 | home | V11 §9 |
| V11-0555 | decision | 9 | home | V11 §9 |
| V11-0556 | decision | 9 | home | V11 §9 |
| V11-0557 | decision | 9 | home | V11 §9 |
| V11-0558 | decision | 9 | home | V11 §9 |
| V11-0559 | decision | 9 | home | V11 §9 |
| V11-0560 | decision | 9 | home | V11 §9 |
| V11-0561 | decision | 9 | home | V11 §9 |
| V11-0562 | decision | 9 | home | V11 §9 |
| V11-0563 | decision | 9 | home | V11 §9 |
| V11-0564 | decision | 9 | home | V11 §9 |
| V11-0565 | decision | 9 | home | V11 §9 |
| V11-0566 | decision | 9 | home | V11 §9 |
| V11-0567 | decision | 9 | home | V11 §9 — withdrawn cell; the final form stated |
| V11-0568 | decision | 9 | home | V11 §9 |
| V11-0569 | decision | 9 | home | V11 §9 |
| V11-0570 | decision | 9 | home | V11 §9 |
| V11-0571 | decision | 9 | home | V11 §9 |
| V11-0572 | decision | 9 | home | V11 §9 |
| V11-0573 | decision | 9 | home | V11 §9 |
| V11-0574 | decision | 9 | home | V11 §9 |
| V11-0575 | decision | 9 | home | V11 §9 |
| V11-0576 | decision | 9 | home | V11 §9 |
| V11-0577 | decision | 9 | home | V11 §9 — seam id dropped (narration) |
| V11-0578 | decision | 9 | home | V11 §9 — seam id dropped (narration) |
| V11-0579 | decision | 9 | home | V11 §9 |
| V11-0580 | decision | 9 | home | V11 §9 |
| V11-0581 | decision | 9 | home | V11 §9 |
| V11-0582 | decision | 9 | home | V11 §9 |
| V11-0583 | decision | 9 | home | V11 §9 |
| V11-0584 | decision | 9 | home | V11 §9 |
| V11-0585 | decision | 9 | home | V11 §9 |
| V11-0586 | decision | 9 | home | V11 §9 |
| V11-0587 | decision | 9 | home | V11 §9 |
| V11-0588 | decision | 9 | home | V11 §9 |
| V11-0589 | decision | 9 | home | V11 §9 |
| V11-0590 | decision | 9 | home | V11 §9 |
| V11-0591 | decision | 9 | home | V11 §9 |
| V11-0592 | decision | 9 | home | V11 §9 |
| V11-0593 | decision | 9 | home | V11 §9 |
| V11-0594 | decision | 9 | home | V11 §9 |
| V11-0595 | decision | 9 | home | V11 §9 |
| V11-0596 | decision | 9 | home | V11 §9 |
| V11-0597 | decision | 9 | home | V11 §9 |
| V11-0598 | decision | 9 | home | V11 §9 |
| V11-0599 | decision | 9 | home | V11 §9 |
| V11-0600 | decision | 9 | home | V11 §9 |
| V11-0601 | decision | 9 | home | V11 §9 |
| V11-0602 | decision | 9 | home | V11 §9 |
| V11-0603 | decision | 9 | home | V11 §9 |
| V11-0604 | decision | 9 | home | V11 §9 |
| V11-0605 | decision | 9 | home | V11 §9 |
| V11-0606 | decision | 9 | home | V11 §9 |
| V11-0607 | decision | 9 | home | V11 §9 |
| V11-0608 | decision | 9 | home | V11 §9 |
| V11-0609 | decision | 9 | home | V11 §9 |
| V11-0610 | decision | 9 | home | V11 §9 |
| V11-0611 | decision | 9 | home | V11 §9 |
| V11-0612 | decision | 9 | home | V11 §9 |
| V11-0613 | decision | 9 | home | V11 §9 |
| V11-0614 | decision | 9 | home | V11 §9 |
| V11-0615 | decision | 9 | home | V11 §9 |
| V11-0616 | rule | 8 | home | V11 §8 |
| V11-0617 | table | 8 | home | V11 §8 |
| V11-0618 | table | 8 | home | V11 §8 |
| V11-0619 | rule | 8 | home | V11 §8 |
| V11-0620 | rule | 8 | home | V11 §8 |
| V11-0621 | rule | 8 | home | V11 §8 |
| V11-0622 | rule | 8 | home | V11 §8 |
| V11-0623 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-1 → file f item 432; BCR-V11-13 → file f item 436 |
| V11-0624 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-2 → file f item 433; BCR-V11-3 → file f item 434 |
| V11-0625 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-4 → file f item 510, 520; BCR-V11-5 → file f item 258; BCR-V11-6 → file f item 379 |
| V11-0626 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-7 → file f item 400; BCR-V11-8 → file f item 435; BCR-V11-9 → V08 §2.6 (no file f item) — withdrawn cell (base text in the file f item) |
| V11-0627 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-10 → file f item 380; BCR-V11-11 → file f item 532, 568; BCR-V11-12 → file f item 446 — price superseded by V11 §8's totals; price superseded by V11 §8's totals with the g rows; superseded by V11 §8's totals |
| V11-0628 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-13 → file f item 436; BCR-V11-14 → file f item 566; BCR-V11-15 → file f item 553 |
| V11-0629 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-16 → file f item 437; BCR-V11-17 → file f item 438 — in file f item 437 |
| V11-0630 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-18 → file f item 288; BCR-V11-19 → file f item 439; BCR-V11-20 → file f item 440 |
| V11-0631 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-21 → file f item 534; BCR-V11-22 → file f item 477; BCR-V11-23 → file f item 456 |
| V11-0632 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-24 → file f item 441; BCR-V11-25 → file f item 442; BCR-V11-26 → file f item 425 — retired G-fallbackclass → item 104 (a)'s resolution |
| V11-0633 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-27 → file f item 259; BCR-V11-28 → file f item 289; BCR-V11-29 → file f item 401; BCR-V11-30 → file f item 412 |
| V11-0634 | bcr | 10 | bcr-pointer | V11 §10 rows BCR-V11-31 → file f item 581 |
| V11-0635 | xreq | 10b | handoff | V11 §10b rows X-V11-1, X-V11-6 (each closed at its destination) — retired G-fallbackclass → item 104 (a)'s resolution; the manifest path at V11 §3.1 row 77 and W46 |
| V11-0636 | xreq | 10b | handoff | V11 §10b rows X-V11-2 (each closed at its destination) |
| V11-0637 | xreq | 10b | handoff | V11 §10b rows X-V11-3, X-V11-4, X-V11-5, X-V11-6, X-V11-7 (each closed at its destination) |
| V11-0638 | xreq | 10b | handoff | V11 §10b rows X-V11-8, X-V11-9, X-V11-10, X-V11-11 (each closed at its destination) — withdrawn cell; the final form stated |
| V11-0639 | xreq | 10b | handoff | V11 §10b rows X-V11-12, X-V11-13 (each closed at its destination) — withdrawn cell; the final form stated |
| V11-0640 | xreq | 10b | handoff | V11 §10b rows X-V11-14, X-V11-15 (each closed at its destination) |
| V11-0641 | xreq | 10b | handoff | V11 §10b rows X-V11-16, X-V11-17 (each closed at its destination) |
| V11-0642 | question | 11 | answer-J121-J122 | V11 §11 (Q-V11-1 answered, J122; J-V11.107) |
| V11-0643 | rule | 12 | home | V11 §12 (current CONFIRMED/PLAUSIBLE) |
| V11-0644 | rule | 13 | home | V11 §13 (none open; J-V11.110, J-V11.111) |
| V11-0645 | rule | IN | home | Integration notes map → body home |
| V11-0646 | rule | IN | home | Integration notes map → body home |
| V11-0647 | rule | IN | home | Integration notes map → body home — retired G-fallbackclass → item 104 (a)'s resolution |
