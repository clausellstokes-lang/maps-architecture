## Reconciliation round 6 (volumes/reconcile-V11-r6, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r6; covered by the whole-design retrovalidation (J84).

Five seam issues: **SR5-03** (major), **SR5-08**, **SR5-09** and **SR5-11** (minors) of `seam-settlements-r5.md`, and
**SCC-104** (major) of `seam-content-calibration-r5.md`. **5 FIXED, 0 INVALID, 0 on the fix list.** The pre-round text is
kept at `scratchpad/volumes/rcV11r6/V11-before.md` (md5 08213668…).

| id | severity | disposition | where |
|---|---|---|---|
| SR5-03 | major | FIXED — `BuildingClassRow` gains `label`, `icon?`, `synonyms`, `commonness` (own, not calibratable, read by no model stage; BCR-V11-1 amended); `label` and `synonyms` written for all 181 authored town-and-city classes and V05's 2 sky rows in the new V11 §3.5.15 (the class count corrected from 179, which predated item 110's `fort` and `lighthouse`); `commonness` the compiled roster share at TOWN (V11 §3.5.1; the same meaning as V07's at VILLAGE, J-V7.133); `icon` compiled from the family, whose 45 `fam.<key>` glyphs X-V11-17 (a) asks of V09's sprite; the same `label` and `icon?` on the profile families (V11 §3.4), goods (§2.5, V11 §3.7.1), district kinds (§3.9) and the shipped style sheets (V11 §3.1's *Display cells*); T-V11-4 refuses a row without its `label`; registry rows 17, 18, 19, 33, 52. **One deviation, vetoable:** a generic class's label is its family's `label` cell, not the `trade.noun` corpus entry the finding named — the corpus is authored at C5, after the generic rows first compile, and is a naming word list (J-V11.95); the finding's mechanism (compiler-written label, `synonyms` [], `commonness` 0) is kept | V11 §2.3, §2.5, §3.1 (rows 17–19, 33, 52; *Display cells*), V11 §3.2.1 steps 5–5a, §3.4, V11 §3.5.1, V11 §3.5.14, V11 §3.5.15, V11 §3.7.1, §3.9, V11 §3.13.3, V11 §3.20.5, T-V11-4, V11 §2.10, W77, §8, §10's BCR-V11-1 amendment, J-V11.93–J-V11.95, X-V11-17 (a)–(c) |
| SCC-104 | major | FIXED as required (the seam's mapping, not its alternative row, J-V11.96) — `RaisedWayStructure` gains `span` {`vaultShare` by kind, `maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `vaultCap` by all six rungs, `deckDepthCm`, `supportFoundationCm`} and `slideMaxFactor`; `retaining` gains the named row `settings` with `stateSnapCm`; each own, calibrate-later, `extension`, calibratable, its value stated once in V04 BCR-45 or file f items 244–245 and written by the seat landing BCR-45 at M3a; the settings form the finding cites is now defined (V11 §2.1, `ColumnSpec.row`); rows 79–80's rows home and readers (row 80 already had U-SYS; U-CITY, U-ACCESS and U-LINK added for `foundationObstacles`; row 79's S10 and S11 carry the state knots); T-V11-1 (a)'s name map; V11 §3.24.2's old "stays V04's cell" sentence replaced | V11 §2.1, V11 §2.8c, §2.8's `EraRow` comment, §3.1 rows 79–80, V11 §3.24.1, V11 §3.24.2, T-V11-1, V11 §2.10, W78, §8, J-V11.96, X-V11-17 (d)–(f) |
| SR5-08 | minor | FIXED as required — row 87's source adds V10 §3.11, V11 §3.12, V11 §3.13 and §4.4, V08's `host.*` rows (V08 §13 X12) and V06's `info.copy.condensed` line (V06 §3.15.5), as V09 §1b's messages row lists them | V11 §3.1 row 87 |
| SR5-09 | minor | FIXED as required — (a) §12's round-5 clause "that V07's text lands as read" moved to CONFIRMED, citing V07 §3.10 and J-V7.127; (b) row 61's gloss adds `village.pins` (VS8), `village.records` (S10b) and the siting step (m) (EVO_SITING), V07 W70–W72 | V11 §12, §3.1 row 61 |
| SR5-11 | minor | FIXED as required — (a) the `mercantile-market` cell reads "placed with its stalls by V07 §3.10's pin-record rule"; (b) the `parish_church` row names the rule at generation, when either record arrives, or at the shrine's promotion (V07 §3.12 *Records at a village epoch*), its binding as V08 §3.5.1 (c)–(d) now state it (V08's round 6, landed 14:12: a promotion by receipt re-points the one key to the church and lays the cross unbound, J-V8.114 — so "the shrine record binds it" holds where two keys meet, not at every promotion); and, by the same class, §3.11's `@pin:<kind>` sentence names the rule's three moments instead of "VS8's pins" | V11 §3.13.2, V11 §3.12, §3.11 |

**Also in this round.** The round-6 ledger (RH1–RH4); wiring W77 (the display cells) and W78 (the span and snap cells);
two V11 §2.10 lifecycle rows; decisions J-V11.93 – J-V11.96; X-V11-17; the §8 paragraph on when the new cells land (no
estimate moves); the §12 paragraph; the §13 preamble.

**Other volumes' halves** (X-V11-17; no other volume was edited by this round). V07's SR5-10 (its round-6 lane, landed
14:05) already reads V11 §2.3's cells as written — its §1 (13) "V11 — pending" may read landed once this line lands.
V08's SR5-07 (its round-6 lane, landed 14:12) already cites V11 §2.3's `label` in §4.6's `unmapped_kind` row and its
wiring rows. File f's item 516 already names V11;
items 244 and 245 take V11's cell names in file f's next round. V04's BCR-45, J-V4.93 and V04 §8 take the name
`raisedWays.structure.span` in its next round (reconcile-V04-r6 landed 13:52, before this finding reached it). V12's
span-rule, `raisedWays.structure` and `retaining` lines take X-V11-17 (f)'s wording in its next round. V09's sprite and
roster reader take X-V11-17 (a). Until each lands, single source keeps V11's cells authoritative and T-V11-1 (a) and
T-V11-4 catch a miss.

**Document checks** (`docs/validation/bench/doc_checks.py --doc … --heads docs/ARCHITECTURE.md`), the backup measured now →
this round's text before this paragraph: C1 0 → 0, C2 0 → 0, S1 0 → 0; C4 0 → 1, reviewed (the six rung names on
`span.vaultCap`'s key line, the allow row "the rung names of the owner's two size ladders"); C3 324 → 358 (the two new
stand-in lines, digit runs of section numbers in the new pointers and ordinary phrases — "and the", "for the town and
city", "a line of its own", V08's quoted "so it is built as a"; none a list, grammar or table, and no line of V11 §3.5.15's words) and S2 403 → 430 (this
volume's own V11 §2.10, §3.11, V11 §3.12 and V11 §3.13 pointers and V09's §4.16 and §5.7, which the base's headings do not hold). By
script: every J-V11 (to J-V11.96), W (to W78), X-V11 (to X-V11-17), T-V11 (38 rows) and BCR-V11 (31) id cited is defined;
ninety-two catalogue rows in §3.1's table; every table's rows have their header's column count.


