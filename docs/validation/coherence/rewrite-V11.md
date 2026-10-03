# Rewrite — design volume V11 (the content system)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V11; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V11`; started 2026-10-03 in the cloud checkout — no prior V11 rewrite files on disk)
- P1 inputs gathered (canon unit V11, conflicts, elegance, ids, wiring, g 111/113, landed base parts, landed volumes): done
- P2 volume read completely: done
- P3 parts written (`work/rewrite-V11/parts/00-head.md` … `23-s10-13.md`; edit scripts `work/rewrite-V11/edits/p05.py` … `p22.py`): done
- P4 assembled (`edits/assemble.py`: citation form, DR ids, retired shorthand, narration and validation ids, exact fix-ups); ids, references, terms and sizes verified: done
- P5 report, result file, LANDED: done

Source: `docs/volumes/V11-content.md` (5 411 lines; copied to `work/rewrite-V11/V11-source.md`). Output:
`docs/validation/coherence/new/volumes/V11-content.md` (4 750 lines). Same title line; one marker line; the section
structure kept (§0–§13), with two subsections added — V11 §3.25 (item 113's history rows) and V11 §3.26 (the edges and
combinations) — and the integration notes, the eleven reconciliation and finalization records, the revision note and
the PROGRESS ledgers removed (their normative content folded into its home; their history is the validation records').

## 1 Sizes and the shrink goal

| measure | before | after | change |
|---|---|---|---|
| bytes | 650 238 (635.0 KB) | 573 137 (559.7 KB) | −11.9 % |
| words | 106 185 | 95 884 | −9.7 % |
| prose words (outside tables and code) | 41 906 | 29 494 | −29.6 % |
| table words (every table's rows; the decisions, wiring and tests included) | 59 458 | 61 186 | +2.9 % |
| code words (the TypeScript declarations) | 4 821 | 5 228 | +8.4 % |

| section | before (words) | after (words) |
|---|---|---|
| title, marker, revision note, ledgers | 1 669 | 183 |
| §0 In plain words | 913 | 1 050 |
| §1 scope, hooks, out of scope; §1b wiring | 5 553 | 5 463 |
| §2 Data model | 10 056 | 10 358 |
| §3 Generation — catalogue, compiler, rows (with the new §3.25, §3.26) | 55 503 | 61 180 |
| §4 Editing | 1 298 | 1 382 |
| §5 Rendering, labels, exports | 416 | 408 |
| §6 Performance budgets | 487 | 482 |
| §7 Tests | 2 772 | 3 086 |
| §8 Build plan | 2 780 | 2 871 |
| §9 Decisions | 6 801 | 7 381 |
| §10 Base change requests (with §10b) | 6 055 | 1 716 |
| §11 Owner questions | 126 | 47 |
| §12 CONFIRMED versus PLAUSIBLE | 3 480 | 211 |
| §13 Fix list | 415 | 66 |
| integration notes, reconciliation rounds 1–6, finalization | 7 861 | 0 |

**Why the volume shrinks less than the band (63 711–79 639 words).** The prose is cut by 29.6 %, inside the band's
range; the volume as a whole is not, for two reasons. (1) **The required additions** — ≈ 9 200 words of new design at
build depth: item 111's dry-country cells per climate row with ranges and readers, the `garden` row and the well yields
(≈ 900); item 113's history rows — settings, the burial threshold, seventeen event-to-epoch rows (≈ 1 130); the edges and
combinations of V11 §3.26 (≈ 2 390); the owner items' off-form table (E-20, ≈ 260); the sensitive kinds' rows (J122,
≈ 150); the closed hand-off tables of V11 §10b (≈ 1 140); thirteen new decisions (≈ 900); three new tests (≈ 260); the
wiring rows W79–W85, registry rows 92–93 with the base settings values, the new row types and lifecycle rows, the
underground naming slices, the span, slide and snap values and the build rows C1b and C9 (≈ 2 000). (2) **What remains
is row content** — 61 % of the volume is table rows: the 280-kind institution map, the 181-class ladder and its
display-word table, the keyword table, the 35 template families, the 94-row registry, the 85 wiring rows, the 41 tests
and the 109 reasoned decisions. Without the additions the volume would stand at ≈ 86 700 words (−18 %). No rule, row,
value, case, bar, lifecycle row, test or decision was thinned to meet the goal; the volume shrinks by less than half, so
no nuance audit is required by the half rule.

## 2 Decisions taken by this editor (each for the adjudicator to confirm)

* **Item 111 at build depth (V11-MISSING-2).** The climate rows carry the dry-country cells — `arid`, `aridChance` (river
  · lake · coast), `oasisChance` and `oasisNoWaterFactor`, `oasisAreaHa`, `gardenFactor`, `channelReachM`, `groveBandM`,
  `grove`, `w_water` and `pullRadiusM`, `w_waterP`, `sunlight` (a multiplier of `w_sun`: 1 in the temperate and cold rows,
  so item 102 holds as filed at the effective 0.02 the finding names; −0.5 in the arid row), `wellYieldWeight`,
  `wellCoverageFactor` — with values and ranges (V11 §3.17.1); the `garden` land use provides `herbs` (V11-BREF-1, valid
  now that the model's `LandUse.kind` holds `garden`); the water table's `wellYield`, `geologyYield`, `topYield` (V11
  §3.24.6); the off form in V11 §3.24.0; registry row 43's readers; lifecycle rows (V11 §2.10); W79–W81; T-V11-38; build
  row C1b; J-V11.98.
* **Item 113 at build depth (V11-MISSING-3).** Table `history` (registry row 92): `history.settings` — `replay` (a
  switch, true; false in the parity presets), `epochYears` 10, `symbolicQuantile` 0.25, `defaultAgeYears` per rung (the
  cell V06 §3.20.2 (2) names), `burialYears` 100 with the factors flood 0.7, silt 0.8, rebuilt 0.6, bare rock 1.5 and the
  clamp [30, 400], `reuseCost` 0.6; the burial formula (V11 §3.25.2); seventeen event-to-epoch rows — one per event
  family and nine template refinements — mapping all 29 templates through the family rows (V11 §3.25.3); W82; T-V11-39;
  build row C9; J-V11.99.
* **The sensitive kinds (V11-MISSING-1; Q-V11-1 answered by J122).** Concealment rows with `none` 0 for `slave_market`,
  `trafficking_den` and `kidnap_den` (the latter two from 0.05 to 0, their `front` 0.5 to 0.55), a cover row for the slave
  market, the dossier's own mode or knowledge resolved first by §4.7's order, so SettlementForge's settings decide what a
  player sees (V11 §3.14; J-V11.101).
* **The base settings row (DXC-05; W-SET-01).** Registry row 93 `base.settings`: `index.gridCellM` L0 25, L1 25, L2 10,
  L3 5, L4 5 m; `reroll.maxAdvance` 3; `crossing.searchBandM` 120 m — the values the base calls table values (J-V11.102).
* **One off-form table (E-20).** V11 §3.24.0 holds every owner item's off form with its base bar and this volume's test —
  items 102, 103, 105 and 107, 106, 109, 110, 111, 113 (J-V11.103).
* **The span, slide and snap values stated here (J-V11.104).** The landed base (§2.2, §2.7) names `span.*`,
  `slideMaxFactor` and `retaining.settings.stateSnapCm` as this volume's cells and states no value; V11 §3.24.1–§3.24.2
  state them — `span.vaultShare` 0.6 / 0.7 / 0.15, `maxHeightCm` 900, `minHeadroomCm` 250, `maxFallCm` 150, `vaultCap` 10
  at each village rung / 40 / 120 / 240, `deckDepthCm` 150, `supportFoundationCm` 400, `slideMaxFactor` 1.5,
  `stateSnapCm` 100 cm — unchanged from items 244's and 245's text.
* **`access.ruinGain` 1.5 (J-V11.109).** The base names the cell as this volume's (II.7.3) without a value; item 109 (d)
  raises the access chance over a ruin.
* **A cart crossing beyond 1.5 × `rampMaxGrade` (V11-EDGE-1; J-V11.107).** The levelling lowers the wall's step inside
  the way's corridor (`W_STEP_LOWERED`), never a stair, never a gap; T-V11-32 (h).
* **The specialisation ids as designations (V10's CVR-V10-12).** A class slot naming `stepped_temple`,
  `terraced_palace` or `tiered_tower` places the specialisation's first carrier with the specialisation held, and their
  plain words are given; the terrace rows gained `says` (V11 §3.24.1, §3.24.3).
* **The underground naming slices (IN-V11-3; item 445).** `naming.sewer`, `.catacomb`, `.cavern`, `.quarry`, `.vaults`
  ("the ⟨way⟩ Arches"), `.buried` ("Old ⟨settlement⟩" for item 113's former settlement), `.undercity.plaza`, with their
  corpora (V11 §3.20.1, §3.20.5; W84); V02 X6's "the seating" and "a gate passage" in `building.wingRole`.
* **The edges and combinations (J-V11.97).** Five rules and two tables in V11 §3.26 define every one of the 64 routed
  edges (52 UNDEFINED, 12 UNTESTED) and the 21 owned combinations with outcome, failure rung and test (T-V11-40).
* **The coverage edge (V11-EDGE-2).** `per` [1, 100 000] (a `walk` unit at least 10 m), `target` [0.01, 100], and a
  district with no residential plot giving r = 0 and satisfaction 0 (V11 §2.3; T-V11-3).
* **Readers by StageId (V11-ICONF-1; J-V11.100).** A read is recorded under the stage function's StageId (S8, S5b),
  never under a calling epoch phase; rows 62, 80, 81 list S8 and S5b with no conditional clause.

## 3 Conflicts resolved (20)

| ruling | applied at |
|---|---|
| DXC-05 | registry row 93 `base.settings` (V11 §3.1, its closing paragraph with the values); W83; §7.6 cites the registry (base) |
| MC-11 | `TableId` is §7.6's; V11 §2.1 cites it (cross-part note 3) |
| CF-PIPE-10 | V11 §3.15's infrastructure links: walls, towers, the toll house and the customs house taxes 1; gates, bridges, roads 0.7 + trade 0.3 — every class's weights sum to 1 (checked, already so) |
| RIC-01 | `parchment` one status: a shipping ink-family variant (V11 §3.1's style-sheet display words) |
| V08-XCONF-9 | V11 §3.19.2 cites V08 §2.6's era row (culture → era), the tier not named |
| V09-XAGREE-1 | V11 §4.2: key forms `uid:`, `cat:`, `cls:`, `use:` with the union of cells; `linkEdits` `{ bindTo?, avoid?, cut? }` with the three meanings; §4.4's row; J-V11.108 |
| V11-ICONF-1 | registry rows 62, 80, 81 (S8, S5b), V11 §3.1's *Readers*; J-V11.90 and J-V11.92 marked amended by J-V11.100 |
| V11-ICONF-2 | V11 §3.7.2: the second "lumber camp logs" deleted |
| V11-ICONF-3 | V11 §3.13.3: "for every non-alias profile family" |
| V11-ICONF-4 | V11 §6: `resolveSiting`'s count read from `REGISTRY` |
| V11-ICONF-5 | J-V11.8 reads 181 and cites V11 §3.5.14; J-V11.94 cites it |
| V11-ICONF-6 | §12's stale counts removed with the narration |
| V11-ICONF-7 | V11 §3.12's `mages_guild` cell: "the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)" |
| V11-XCONF-1 | V11 §3.24.1: `stateSnapCm`'s entry on V12 §3.11's default line, restated by V06 §8's line from V6-E2; no "until" |
| V11-XCONF-2 | registry row 87: `MsgRow` for `en.json`, `{ key; text }` for other locales; V11 §3.2.2's loader refusal; T-V11-1 |
| V11-XCONF-3 | V11 §3.24.1: the three bend cells "written at M3a, calibrated by V12 §3.11's terrace line" |
| V11-XCONF-4 | V11 §8 C0's exit: "`register --check` joins CI at M1 (V12's T-V12-20)" |
| V12-XCONF-2 | V11 §3.2.1 step 7: the pinning hash is §7.6's — value, unit, `calibratable`, `extension`, `presets`; the whole provenance block excluded |
| CANON-C03 | V11 §11 is the table of decisions (Q-V11-1, J122) |
| CANON-C04 | V11 §13 holds no open item; the INDEX §7 items routed here (SR6-09 (a), (c), (d); SR6-08) are fixed (V11 §3.2.1 step 5a's `v.` rows, the seam id corrected out of the text, the `mages_guild` cell, row 87) |

## 4 Open findings closed

Every finding of the canon's V11 unit is closed in the text: the 10 VOL-V11-V12 restatements and V11-RESTATE-1…7
(citations in place of the restated base text: the compiled cell and preset resolution at §7.6, the range comment at V11
§4.1, the crypt column at §10.2, the village crypt rows at V07 §2.4, the absent bend cells at V11 §3.24.1), V11-DUP-1…3
(one statement of the derived-row reading, of the singular and district-defining competition override, of the editor's
clamp), the seven ICONF and four XCONF rulings (§3 above), V11-ELEG-1 (E-34), V11-EDGE-1, V11-EDGE-2, V11-WGAP-1 (row 50
lists VS8 and EVO_FORT), V11-MISSING-1…6 (§2 above; MISSING-4's notes folded — IN-V11-1 into V11 §3.2.1 step 4 and
§3.24.2, IN-V11-2 into V11 §3.24.1 and §3.20.1, IN-V11-3 into §3.20.1, IN-V11-4 into §3.23.8, IN-V11-5 into §3.24.7 (1),
IN-V11-6 into §3.16.1 and §3.24.4, IN-V11-7 into §10's BCR-V11-26 row and V11 §3.13, IN-V11-8 into W21 (`site.terrain`,
`site.culture` → biome), IN-V11-9 into §3.24.2, IN-V11-10 into §10's BCR-V11-31 row; MISSING-5 in V11 §3.5.1, step 5a and
T-V11-4; MISSING-6 in V11 §3.2.1 steps 4 and 7), V11-TERM-1 (one citation form `Vnn §x.y`, by script), V11-DEFER-1…4
(revision note gone; "calibrate-later" replaced by the register form; the catalogue's source the committed manifest;
the fix list emptied — F-V11-1 and F-V11-2 as J-V11.105 and J-V11.106, F-V11-3 closed at V04 §2.3 and V06 §2.2),
V11-NARR-1…18 (ledgers, round prefixes, seam and critique ids, owner time stamps stripped — the `sanitize.py` pass and the
per-part scripts), V11-BREF-1…3 (`garden` valid; own sections qualified `V11 §`; every BCR cited as its item),
V11-HANDOFF-1 (V11 §10b), and the INDEX items SR6-09 and SR6-08.

**Wiring (4):** DWG-03 and KWG-06 and W-SET-01 by registry row 93 (W83); V11-WGAP-1 by row 50's readers.
**Hand-offs:** the 40 routed to this volume (V02 X2, X3, X5, X9, X13, X26, X32; V06 X1, X8, X20, X31, X35, X43, X45; V07
FL-2, FL-3; V08 X1, X2, X4, X5, X6, X9, X14, X19, X22, X25; V09 XV-V9-1, -2, -13, -31; V10 CVR-V10-6, -12, -16; V12 X-V12-1,
-3, -9, -11, -15, -16, -18) are answered in the text and listed in V11 §10b's second table; this volume's own X-V11-1…17
are closed at their destinations (the first table), each checked against the landed text of V01–V09 and V12 (V10 at its
source text, its rewrite not yet landed).
**Edges:** 64 (52 UNDEFINED, 12 UNTESTED, among them EI-V11-EDGE-1 and -2) and 21 owned combinations (C-cliff … C-dossier
× tables) — V11 §3.26 and T-V11-40.

## 5 Elegance rulings applied (E-05, E-20, E-24, E-30, E-34, E-37, E-38)

* **E-05 (the registry is V11 §3.1).** [x] every table §7.6 names has a registry row (T-V11-1 (a)); [x] the readers per
  table are the union of V11 §3.1's, §7.6's and V11 §1b's (rows 15, 17, 19, 21, 22, 26, 29, 33, 43, 49, 50, 52, 57, 59, 62,
  76, 80, 81, 85, 87 widened); [x] the base values the base calls table values have a row (row 93).
* **E-20 (one convention; every no-op pin a `NoOpPin` reading V11 §3.24.0's off form).** [x] the convention is §13.2's
  (5), cited; [x] the declared-shift clause for goldens stays §13.2's (4), cited; [x] each item's off-form cell values and
  its bar id — V11 §3.24.0's off-form table (items 102, 103, 105/107, 106, 109, 110, 111, 113), the web's off form at V11
  §3.7.4 cited from it.
* **E-24 (one mark per amended decision).** [x] no row dropped (J-V11.1–96 kept, J-V11.97–109 added); [x] the governing
  row keeps the reason: J-V11.50 amended by J-V11.71; J-V11.77 amended by J-V11.91; J-V11.90 and J-V11.92 amended by
  J-V11.100; J-V11.96 amended by J-V11.104; J-V11.48's inline revision note removed (its row states the rule).
* **E-30 (one reference-cell form).** [x] the compile check: V11 §3.2.1 step 4 resolves `{ ref: { table, row, cell } }`,
  a dangling reference or a unit mismatch stopping the build naming both cells; T-V11-3; [x] `editTable`'s inverse and
  undo row are §7.6's, read by V11 §4.4's cell-edit row; [x] V07's references to V11 §3.6.1, §3.24.1, §3.24.4 in the one
  form (V07 §2.2a; `SourceCell`'s `ref` variant, V11 §2.2).
* **E-34 (readers stated once; one item-110 lifecycle pattern).** [x] the union of every reader listed before (W19's V07
  pump date on row 50, V11-WGAP-1); W rows and §2.10's rows cite "registry row N"; [x] each table's exceptions to the
  item-110 pattern row kept as exception rows (V11 §2.10).
* **E-37 (one unit vocabulary).** [x] V11 types `ColumnSpec.unit` as `ContentUnit = Extract<Unit, 'm'|'m2'|'ha'|'cm'|
  'cdeg'|'share'|'weight'|'people'|'yr'|'wk'|'m3'|'lvl'|'none'>`, exactly its former list; [x] `cdeg` kept (no `deg` in
  V11); [x] `people` kept (no `count` in V11).
* **E-38 (the territory per head derived).** [x] the farm rows' values unchanged (V07's); [x] A_T = households × the
  per-head sum (V07 §3.9 (1)); [x] the register: registry row 41 records the per-head value as derived, never a cell.

## 6 Renumberings

None of an existing id. Added: T-V11-38, -39, -40; J-V11.97 – J-V11.109; W79 – W85; registry rows 92 (`history`) and 93
(`base.settings`); V11 §3.25 and §3.26. ID rulings: **ID-BCR** — every BCR cited as its file f item (V01's BCR-4, -6,
-31, -32, -46 → items 294, 207, 345, 301, 584; V04's BCR-14, -45 → items 386, 244; BCR-V3-12, -26, -32 → items 233, 230
and 241, 578; BCR-V6-26 → item 291; BCR-V7-13, -20, -21, -36, -38 → items 376–377, 312, 430, 576, 579; BCR-V2-26, -39 →
items 427, 229; BCR-V5-6 → item 213; BCR-V9-8, -30 → items 516 and V09's slot; BCR-V10-2 → item 311; BCR-V12-5 → V12's
stamp); this volume's BCR-V11-n kept as §10's pointer rows. **ID-WX** — other volumes' local rows cited with their
volume (`V02 X6`, `V12 X-V12-15`); this volume's X-V11-n defined in V11 §10b. **ID-DR** — DR-V8.4 → DR32, DR-V8.8 → DR35.
**ID-DUPDEF** — BCR-V11-1's amendment notes folded into its one pointer row.

## 7 Cross-part notes

1. **One rank, two names (base II.7.5 and V04 §2.3).** The landed base declares the undercity's void-source rank as
   `UndercityRule.sourceRank` (II.7.5); the landed V04 types the same rank as `RuinRule.sourceWeight`. V11 §3.23.6 states
   the values once under the base's name and names V04's field; the Assemble seat should make V04 §2.3 (its interface
   comment and §3.5.1) read `UndercityRule.sourceRank` (registry row 59), or the base adopt V04's name.
2. **`garden_irrigated` versus `garden`.** Pipeline §4.9 (*An oasis's gardens*) writes `garden_irrigated` land-use
   faces; the model's `LandUse.kind` (§2.7) and V11 §3.17.2 name the kind `garden`. Pipeline §4.9 should read `garden`.
3. **`TableId`'s declaration (MC-11).** The ruling homes `type TableId` at §7.6; the landed determinism part names
   `TableId` but holds no declaration line. V11 §2.1 cites §7.6.
4. **`ClassMixRow.sun`.** The base's §10.2 row states the sunlit prestige weight (0.3, J-A102.41); V11 formerly wrote
   0.15. V11 §3.3.5 now states no value and cites §10.2 (registry row 27); the base value governs.
5. **Base restatements of V11's rows.** §10.2's crypt comment and the underground access probabilities restate V11
   §3.5.8's and §3.5.1's values; the base should cite those sections.
6. **`history.defaultAgeYears` (V06 §3.20.2 (2)).** Now defined at V11 §3.25.1 (THORP 160 … METROPOLIS 500); a dossier's
   absent age stays V08's `historyAge` row's.
7. **The burial threshold's bare-rock reading.** V06 §3.20.5 (3) reads bare rock by `site.terrain`; V11 §3.25.2 uses
   `site.terrain` on a dossier map and the region's ground class `rock` on a standalone map. V06 should confirm the
   standalone reading.
8. **§13.2 convention (5).** It lists off forms at "V11 §3.24.0 for item 110, V11 §3.7.4 for items 105 and 107, the cells
   the bar names otherwise"; V11 §3.24.0 now holds every owner item's off form (E-20), so the convention may cite V11
   §3.24.0 alone.
9. **The span, slide and snap values.** The base (§2.2, §2.7) names the cells as V11's without values; V11 §3.24.1–§3.24.2
   now state them (J-V11.104), unchanged from items 244 and 245.
10. **The well decoration rule.** §4.7's "a well or pump the decoration rows place sits on the unused plot of highest
    well yield" runs whatever item 111's cells hold; T111-5's off form compares against the base with that rule in it.
11. **V12's register lines for items 111 and 113.** V11 §8's build rows C1b and C9 land the cells with their entries;
    V12 §3.11 should list the item-111 and item-113 lines if its rewrite lacks them.
12. **V10 (not yet landed).** X-V11-3 (`WhyPull.row`, `query row`, `query profile`) and CVR-V10-12's designation
    mechanism (V11 §3.24.3's *As a designation*) are read from V10's source text; V10's rewrite should cite V11 §3.24.3.
13. **V08 §2.3's `knownTo`.** V11 §3.14 relies on the port carrying a record's own mode or knowledge (V08 §2.3's
    `knownTo`) for the sensitive kinds' "shown as SettlementForge's settings show them".
14. **The base settings values.** Kernel §3.3, §5.1 (6), §4.2 S1 (5) and §6.3 should cite registry row 93 for
    `index.gridCellM`, `reroll.maxAdvance` and `crossing.searchBandM` (DXC-05).
15. **doc_checks.** Its S2 check does not follow the "a list after a volume prefix stays in that volume" convention, so
    the volume's own section lists (`V11 §3.3, §3.4, …`) read as base pointers (327 hits, before 439).

## 8 Verification

* **Ids** (by script): T-V11-0 – T-V11-40 each defined once, none missing; J-V11.1 – J-V11.109 each once; W1 – W85 each
  once; no cited T, J or W id undefined.
* **References** (by script, `edits/refcheck.py`): every `Vnn §x.y` resolves in the landed volume (V10 in its source),
  every bare `§x.y` in the base parts, the own-section lists inside volume-prefixed lists; every `V11 §x.y` cited by the
  landed base parts and volumes resolves in the new text.
* **Terms**: no retired term (G-lot, G-strike, G-unitinput, G-DR, G-panelgroup, G-fallbackclass, G-digest) and no
  narration or validation id (seam, critique, round, finding, conflict or elegance ids) left in the volume.
* **doc_checks (provisional)**: `python3 docs/validation/bench/doc_checks.py --doc docs/validation/coherence/new/volumes/V11-content.md --heads docs/ARCHITECTURE.md`
  — C1 0, C2 0, C4 3 hits (0 unreviewed), S1 0; C3 293 (before 346; digit runs and ordinary phrasing, the marker line and
  the citation paragraph, none a list, grammar or table); S2 327 (before 439; cross-part note 15). Exit 1 on the
  unreviewed C3 and S2 classes, as before.

## 9 Mapping table (inventory V11-0001 – V11-0647 → new location)

All 647 ids mapped by `edits/mapping.py`; 0 unmapped. *change* names the ruling that altered the fact, where one did.

| id | kind | old § | role | new location | change |
|---|---|---|---|---|---|
| V11-0001 | summary | 0 | home | V11 §0 |  |
| V11-0002 | summary | 0 | home | V11 §0 |  |
| V11-0003 | summary | 0 | home | V11 §0 |  |
| V11-0004 | summary | 0 | home | V11 §0 |  |
| V11-0005 | summary | 0 | home | V11 §0 |  |
| V11-0006 | summary | 0 | home | V11 §0 |  |
| V11-0007 | scope | 0 | home | V11 §0 |  |
| V11-0008 | scope | 1 | home | V11 §1 |  |
| V11-0009 | interface | 1 | reference | V11 §1; reference, cites §7.6 |  |
| V11-0010 | interface | 1 | reference | V11 §1; reference, cites §10.2 |  |
| V11-0011 | interface | 1 | reference | V11 §1; reference, cites §4.2 |  |
| V11-0012 | interface | 1 | reference | V11 §1; reference, cites §4.7 |  |
| V11-0013 | interface | 1 | reference | V11 §1; reference, cites §4.7 |  |
| V11-0014 | interface | 1 | reference | V11 §1; reference, cites §4.5 |  |
| V11-0015 | interface | 1 | reference | V11 §1; reference, cites §4.9 |  |
| V11-0016 | interface | 1 | reference | V11 §1; reference, cites §4.11 |  |
| V11-0017 | interface | 1 | reference | V11 §1; reference, cites §2.6 |  |
| V11-0018 | interface | 1 | reference | V11 §1; reference, cites §10.4 |  |
| V11-0019 | interface | 1 | reference | V11 §1; reference, cites §7.1 |  |
| V11-0020 | interface | 1 | reference | V11 §1; reference, cites V08 §9 |  |
| V11-0021 | interface | 1 | reference | V11 §1; reference, cites §17.1 |  |
| V11-0022 | interface | 1 | reference | V11 §1; reference, cites §14 |  |
| V11-0023 | interface | 1 | reference | V11 §1; reference, cites §13.2 |  |
| V11-0024 | interface | 1 | reference | V11 §1; reference, cites §2.6 |  |
| V11-0025 | interface | 1 | reference | V11 §1; reference, cites II.7 |  |
| V11-0026 | interface | 1 | reference | V11 §1; reference, cites V10 §1b.2 |  |
| V11-0027 | interface | 1 | reference | V11 §1; reference, cites §2.2 |  |
| V11-0028 | scope | 1 | home | V11 §1 |  |
| V11-0029 | wiring | 1b | home | V11 §1b |  |
| V11-0030 | wiring | 1b | home | V11 §1b |  |
| V11-0031 | wiring | 1b | home | V11 §1b |  |
| V11-0032 | wiring | 1b | home | V11 §1b |  |
| V11-0033 | wiring | 1b | home | V11 §1b |  |
| V11-0034 | wiring | 1b | home | V11 §1b |  |
| V11-0035 | wiring | 1b | home | V11 §1b |  |
| V11-0036 | wiring | 1b | home | V11 §1b |  |
| V11-0037 | wiring | 1b | home | V11 §1b |  |
| V11-0038 | wiring | 1b | home | V11 §1b |  |
| V11-0039 | wiring | 1b | home | V11 §1b |  |
| V11-0040 | wiring | 1b | home | V11 §1b |  |
| V11-0041 | wiring | 1b | home | V11 §1b |  |
| V11-0042 | wiring | 1b | home | V11 §1b |  |
| V11-0043 | wiring | 1b | home | V11 §1b |  |
| V11-0044 | wiring | 1b | home | V11 §1b |  |
| V11-0045 | wiring | 1b | home | V11 §1b | strike pool (G-strike) |
| V11-0046 | wiring | 1b | home | V11 §1b |  |
| V11-0047 | wiring | 1b | home | V11 §1b |  |
| V11-0048 | wiring | 1b | home | V11 §1b |  |
| V11-0049 | wiring | 1b | home | V11 §1b |  |
| V11-0050 | wiring | 1b | home | V11 §1b |  |
| V11-0051 | wiring | 1b | home | V11 §1b |  |
| V11-0052 | wiring | 1b | home | V11 §1b |  |
| V11-0053 | wiring | 1b | home | V11 §1b |  |
| V11-0054 | wiring | 1b | home | V11 §1b |  |
| V11-0055 | wiring | 1b | home | V11 §1b | DR26–DR35 (ID-DR) |
| V11-0056 | wiring | 1b | home | V11 §1b | DR26–DR35 (ID-DR) |
| V11-0057 | wiring | 1b | home | V11 §1b |  |
| V11-0058 | wiring | 1b | home | V11 §1b |  |
| V11-0059 | wiring | 1b | home | V11 §1b |  |
| V11-0060 | wiring | 1b | index-row | V11 §1b; index row |  |
| V11-0061 | wiring | 1b | home | V11 §1b |  |
| V11-0062 | wiring | 1b | home | V11 §1b |  |
| V11-0063 | wiring | 1b | home | V11 §1b |  |
| V11-0064 | wiring | 1b | home | V11 §1b |  |
| V11-0065 | wiring | 1b | home | V11 §1b |  |
| V11-0066 | wiring | 1b | index-row | V11 §1b; index row |  |
| V11-0067 | wiring | 1b | home | V11 §1b |  |
| V11-0068 | wiring | 1b | home | V11 §1b |  |
| V11-0069 | wiring | 1b | home | V11 §1b |  |
| V11-0070 | wiring | 1b | home | V11 §1b | union key forms (V09-XAGREE-1) |
| V11-0071 | wiring | 1b | home | V11 §1b |  |
| V11-0072 | wiring | 1b | home | V11 §1b |  |
| V11-0073 | wiring | 1b | home | V11 §1b |  |
| V11-0074 | wiring | 1b | home | V11 §1b |  |
| V11-0075 | wiring | 1b | home | V11 §1b |  |
| V11-0076 | wiring | 1b | home | V11 §1b |  |
| V11-0077 | wiring | 1b | home | V11 §1b | calibrated by V12 §3.11's terrace line (V11-XCONF-3) |
| V11-0078 | wiring | 1b | home | V11 §1b | DR26–DR35 (ID-DR) |
| V11-0079 | wiring | 1b | home | V11 §1b |  |
| V11-0080 | wiring | 1b | home | V11 §1b |  |
| V11-0081 | wiring | 1b | home | V11 §1b |  |
| V11-0082 | wiring | 1b | home | V11 §1b |  |
| V11-0083 | wiring | 1b | home | V11 §1b |  |
| V11-0084 | wiring | 1b | home | V11 §1b |  |
| V11-0085 | wiring | 1b | index-row | V11 §1b; index row |  |
| V11-0086 | wiring | 1b | home | V11 §1b | span values stated (J-V11.104) |
| V11-0087 | wiring | 1b | home | V11 §1b |  |
| V11-0088 | wiring | 1b | home | V11 §1b |  |
| V11-0089 | wiring | 1b | home | V11 §1b |  |
| V11-0090 | wiring | 1b | home | V11 §1b |  |
| V11-0091 | wiring | 1b | home | V11 §1b |  |
| V11-0092 | wiring | 1b | home | V11 §1b |  |
| V11-0093 | wiring | 1b | home | V11 §1b |  |
| V11-0094 | wiring | 1b | home | V11 §1b |  |
| V11-0095 | wiring | 1b | home | V11 §1b |  |
| V11-0096 | wiring | 1b | home | V11 §1b |  |
| V11-0097 | wiring | 1b | home | V11 §1b |  |
| V11-0098 | wiring | 1b | home | V11 §1b |  |
| V11-0099 | wiring | 1b | home | V11 §1b |  |
| V11-0100 | wiring | 1b | home | V11 §1b |  |
| V11-0101 | wiring | 1b | home | V11 §1b |  |
| V11-0102 | wiring | 1b | home | V11 §1b | DR26–DR35 (ID-DR) |
| V11-0103 | wiring | 1b | home | V11 §1b |  |
| V11-0104 | wiring | 1b | home | V11 §1b |  |
| V11-0105 | wiring | 1b | home | V11 §1b | v. rows compiled (V11-MISSING-5) |
| V11-0106 | wiring | 1b | home | V11 §1b | register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104) |
| V11-0107 | rule | 2 | home | V11 §2 | union key forms (V09-XAGREE-1) |
| V11-0108 | rule | 2 | reference | V11 §2; reference, cites §2.1 |  |
| V11-0109 | type | 2.1 | home | V11 §2.1 | declared at §7.6 (MC-11) |
| V11-0110 | type | 2.1 | home | V11 §2.1 | declared at §7.6 (MC-11) |
| V11-0111 | rule | 2.1 | reference | V11 §2.1; reference, cites §7.1 |  |
| V11-0112 | rule | 2.1 | home | V11 §2.1 |  |
| V11-0113 | type | 2.1 | home | V11 §2.1 | declared at §7.6 (MC-11) |
| V11-0114 | type | 2.1 | home | V11 §2.1 | readers by StageId (V11-ICONF-1) |
| V11-0115 | rule | 2.1 | home | V11 §2.1 |  |
| V11-0116 | interface | 2.1 | home | V11 §2.1 | declared at §7.6 (MC-11) |
| V11-0117 | rule | 2.1 | home | V11 §2.1 |  |
| V11-0118 | rule | 2.1 | home | V11 §2.1 |  |
| V11-0119 | type | 2.2 | home | V11 §2.2 |  |
| V11-0120 | type | 2.2 | home | V11 §2.2 |  |
| V11-0121 | type | 2.2 | home | V11 §2.2 |  |
| V11-0122 | type | 2.2 | reference | V11 §2.2; reference, cites §17.1 |  |
| V11-0123 | rule | 2.2 | reference | V11 §2.2; reference, cites §7.6 |  |
| V11-0124 | rule | 2.2 | home | V11 §2.2 |  |
| V11-0125 | rule | 2.2 | home | V11 §2.2 |  |
| V11-0126 | rule | 2.2 | home | V11 §2.2 | pinning hash per §7.6 (V12-XCONF-2) |
| V11-0127 | type | 2.3 | home | V11 §2.3 |  |
| V11-0128 | type | 2.3 | home | V11 §2.3 |  |
| V11-0129 | type | 2.3 | home | V11 §2.3 |  |
| V11-0130 | rule | 2.3 | home | V11 §2.3 | ranges and a_res = 0 stated (V11-EDGE-2) |
| V11-0131 | type | 2.3 | home | V11 §2.3 |  |
| V11-0132 | rule | 2.3 | home | V11 §2.3 |  |
| V11-0133 | rule | 2.3 | home | V11 §2.3 |  |
| V11-0134 | rule | 2.3 | home | V11 §2.3 |  |
| V11-0135 | rule | 2.3 | reference | V11 §2.3; reference, cites V07 §2.4 |  |
| V11-0136 | rule | 2.3 | home | V11 §2.3 | v. rows compiled (V11-MISSING-5) |
| V11-0137 | rule | 2.3 | home | V11 §2.3 |  |
| V11-0138 | type | 2.4 | home | V11 §2.4 |  |
| V11-0139 | type | 2.4 | home | V11 §2.4 |  |
| V11-0140 | rule | 2.4 | home | V11 §2.4 |  |
| V11-0141 | type | 2.5 | home | V11 §2.5 |  |
| V11-0142 | type | 2.6 | home | V11 §2.6 |  |
| V11-0143 | type | 2.7 | home | V11 §2.7 |  |
| V11-0144 | type | 2.7 | home | V11 §2.7 |  |
| V11-0145 | rule | 2.8 | home | V11 §2.8 |  |
| V11-0146 | type | 2.8 | home | V11 §2.8 |  |
| V11-0147 | type | 2.8 | home | V11 §2.8 |  |
| V11-0148 | type | 2.8 | home | V11 §2.8 |  |
| V11-0149 | type | 2.8 | home | V11 §2.8 |  |
| V11-0150 | type | 2.8 | home | V11 §2.8 |  |
| V11-0151 | type | 2.8 | home | V11 §2.8 |  |
| V11-0152 | type | 2.8 | home | V11 §2.8 |  |
| V11-0153 | type | 2.8 | home | V11 §2.8 |  |
| V11-0154 | type | 2.8 | home | V11 §2.8 |  |
| V11-0155 | rule | 2.8b | reference | V11 §2.8b; reference, cites V04 §1b.1 |  |
| V11-0156 | rule | 2.8b | home | V11 §2.8b |  |
| V11-0157 | rule | 2.8b | home | V11 §2.8b |  |
| V11-0158 | rule | 2.8c | home | V11 §2.8c |  |
| V11-0159 | type | 2.8c | home | V11 §2.8c | calibrated by V12 §3.11's terrace line (V11-XCONF-3) |
| V11-0160 | type | 2.8c | home | V11 §2.8c | register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104) |
| V11-0161 | type | 2.8c | home | V11 §2.8c |  |
| V11-0162 | type | 2.8c | home | V11 §2.8c | DR26–DR35 (ID-DR) |
| V11-0163 | type | 2.8c | home | V11 §2.8c | span values stated (J-V11.104) |
| V11-0164 | type | 2.8c | home | V11 §2.8c |  |
| V11-0165 | type | 2.8c | home | V11 §2.8c |  |
| V11-0166 | type | 2.8c | home | V11 §2.8c |  |
| V11-0167 | type | 2.8c | home | V11 §2.8c |  |
| V11-0168 | rule | 2.8c | home | V11 §2.8c | union key forms (V09-XAGREE-1) |
| V11-0169 | rule | 2.9 | home | V11 §2.9 | declared at §7.6 (MC-11) |
| V11-0170 | rule | 2.9 | home | V11 §2.9 |  |
| V11-0171 | rule | 2.9 | home | V11 §2.9 | pinning hash per §7.6 (V12-XCONF-2) |
| V11-0172 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0173 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0174 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0175 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0176 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0177 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0178 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0179 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0180 | lifecycle | 2.10 | reference | V11 §2.10; reference, cites V04 §9 |  |
| V11-0181 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0182 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0183 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0184 | lifecycle | 2.10 | reference | V11 §2.10; reference, cites V01 §2.7 |  |
| V11-0185 | lifecycle | 2.10 | reference | V11 §2.10; reference, cites V01 §2.7 |  |
| V11-0186 | lifecycle | 2.10 | reference | V11 §2.10; reference, cites V09 §2.3 |  |
| V11-0187 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0188 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0189 | lifecycle | 2.10 | home | V11 §2.10 | union key forms (V09-XAGREE-1) |
| V11-0190 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0191 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0192 | lifecycle | 2.10 | home | V11 §2.10 | register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104) |
| V11-0193 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0194 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0195 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0196 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0197 | lifecycle | 2.10 | home | V11 §2.10 | v. rows compiled (V11-MISSING-5) |
| V11-0198 | lifecycle | 2.10 | home | V11 §2.10 |  |
| V11-0199 | rule | 2.10 | home | V11 §2.10 |  |
| V11-0200 | rule | 3 | home | V11 §3 |  |
| V11-0201 | rule | 3.1 | home | V11 §3.1 |  |
| V11-0202 | rule | 3.1 | home | V11 §3.1 | readers by StageId (V11-ICONF-1) |
| V11-0203 | rule | 3.1 | home | V11 §3.1 |  |
| V11-0204 | table | 3.1 | reference | V11 §3.1; reference, cites §1.1 |  |
| V11-0205 | table | 3.1 | reference | V11 §3.1; reference, cites §4.2 |  |
| V11-0206 | table | 3.1 | reference | V11 §3.1; reference, cites §4.3 |  |
| V11-0207 | table | 3.1 | reference | V11 §3.1; reference, cites §4.7 |  |
| V11-0208 | table | 3.1 | home | V11 §3.1 |  |
| V11-0209 | table | 3.1 | reference | V11 §3.1; reference, cites §4.5 |  |
| V11-0210 | table | 3.1 | reference | V11 §3.1; reference, cites §4.2 |  |
| V11-0211 | table | 3.1 | reference | V11 §3.1; reference, cites §5.1 |  |
| V11-0212 | table | 3.1 | home | V11 §3.1 | readers by StageId (V11-ICONF-1) |
| V11-0213 | table | 3.1 | home | V11 §3.1 |  |
| V11-0214 | table | 3.1 | home | V11 §3.1 |  |
| V11-0215 | table | 3.1 | home | V11 §3.1 |  |
| V11-0216 | table | 3.1 | home | V11 §3.1 |  |
| V11-0217 | table | 3.1 | home | V11 §3.1 |  |
| V11-0218 | table | 3.1 | reference | V11 §3.1; reference, cites §10.2 |  |
| V11-0219 | table | 3.1 | reference | V11 §3.1; reference, cites §10.2 |  |
| V11-0220 | table | 3.1 | home | V11 §3.1 |  |
| V11-0221 | table | 3.1 | reference | V11 §3.1; reference, cites §10.2 |  |
| V11-0222 | table | 3.1 | home | V11 §3.1 |  |
| V11-0223 | table | 3.1 | reference | V11 §3.1; reference, cites V03 §1b | readers by StageId (V11-ICONF-1) |
| V11-0224 | table | 3.1 | reference | V11 §3.1; reference, cites V02 |  |
| V11-0225 | table | 3.1 | home | V11 §3.1 |  |
| V11-0226 | table | 3.1 | reference | V11 §3.1; reference, cites §4.9 |  |
| V11-0227 | table | 3.1 | home | V11 §3.1 |  |
| V11-0228 | table | 3.1 | reference | V11 §3.1; reference, cites §4.11 | strike pool (G-strike) |
| V11-0229 | table | 3.1 | reference | V11 §3.1; reference, cites §4.11 |  |
| V11-0230 | table | 3.1 | home | V11 §3.1 |  |
| V11-0231 | table | 3.1 | home | V11 §3.1 |  |
| V11-0232 | table | 3.1 | reference | V11 §3.1; reference, cites §4.7 |  |
| V11-0233 | table | 3.1 | reference | V11 §3.1; reference, cites V05 §1b |  |
| V11-0234 | table | 3.1 | reference | V11 §3.1; reference, cites II.7.1 |  |
| V11-0235 | table | 3.1 | reference | V11 §3.1; reference, cites V04 §2.3 |  |
| V11-0236 | table | 3.1 | home | V11 §3.1 |  |
| V11-0237 | table | 3.1 | reference | V11 §3.1; reference, cites §3.23.1 |  |
| V11-0238 | table | 3.1 | reference | V11 §3.1; reference, cites V06 §1b | readers by StageId (V11-ICONF-1) |
| V11-0239 | table | 3.1 | reference | V11 §3.1; reference, cites V07 §1b W28 | readers by StageId (V11-ICONF-1) |
| V11-0240 | table | 3.1 | reference | V11 §3.1; reference, cites V01 §2.2 | readers by StageId (V11-ICONF-1) |
| V11-0241 | table | 3.1 | reference | V11 §3.1; reference, cites V08 §2.6 |  |
| V11-0242 | table | 3.1 | home | V11 §3.1 |  |
| V11-0243 | table | 3.1 | home | V11 §3.1 |  |
| V11-0244 | table | 3.1 | home | V11 §3.1 |  |
| V11-0245 | table | 3.1 | reference | V11 §3.1; reference, cites §4.5 |  |
| V11-0246 | table | 3.1 | home | V11 §3.1 |  |
| V11-0247 | table | 3.1 | home | V11 §3.1 |  |
| V11-0248 | table | 3.1 | home | V11 §3.1 |  |
| V11-0249 | table | 3.1 | home | V11 §3.1 |  |
| V11-0250 | table | 3.1 | reference | V11 §3.1; reference, cites §3.15 |  |
| V11-0251 | table | 3.1 | home | V11 §3.1 |  |
| V11-0252 | table | 3.1 | home | V11 §3.1 | union key forms (V09-XAGREE-1) |
| V11-0253 | table | 3.1 | reference | V11 §3.1; reference, cites V08 §2.4 |  |
| V11-0254 | table | 3.1 | home | V11 §3.1 |  |
| V11-0255 | table | 3.1 | home | V11 §3.1 | register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104) |
| V11-0256 | table | 3.1 | home | V11 §3.1 | readers by StageId (V11-ICONF-1) |
| V11-0257 | table | 3.1 | home | V11 §3.1 | readers by StageId (V11-ICONF-1) |
| V11-0258 | table | 3.1 | home | V11 §3.1 |  |
| V11-0259 | table | 3.1 | home | V11 §3.1 |  |
| V11-0260 | table | 3.1 | reference | V11 §3.1; reference, cites V09 §2.3 |  |
| V11-0261 | table | 3.1 | reference | V11 §3.1; reference, cites V09 §7.1 | row types by locale (V11-XCONF-2) |
| V11-0262 | table | 3.1 | reference | V11 §3.1; reference, cites V10 §2.10 |  |
| V11-0263 | table | 3.1 | reference | V11 §3.1; reference, cites V01 §2.2 |  |
| V11-0264 | table | 3.1 | reference | V11 §3.1; reference, cites §2.2 |  |
| V11-0265 | number | 3.1 | home | V11 §3.1 |  |
| V11-0266 | rule | 3.1 | home | V11 §3.1 |  |
| V11-0267 | rule | 3.1 | home | V11 §3.1 |  |
| V11-0268 | rule | 3.1 | home | V11 §3.1 | v. rows compiled (V11-MISSING-5) |
| V11-0269 | rule | 3.1 | home | V11 §3.1 |  |
| V11-0270 | mechanism | 3.2.1 | home | V11 §3.2.1 |  |
| V11-0271 | mechanism | 3.2.1 | home | V11 §3.2.1 |  |
| V11-0272 | mechanism | 3.2.1 | home | V11 §3.2.1 |  |
| V11-0273 | mechanism | 3.2.1 | home | V11 §3.2.1 |  |
| V11-0274 | mechanism | 3.2.1 | home | V11 §3.2.1 |  |
| V11-0275 | mechanism | 3.2.1 | home | V11 §3.2.1 |  |
| V11-0276 | mechanism | 3.2.1 | home | V11 §3.2.1 | v. rows compiled (V11-MISSING-5) |
| V11-0277 | mechanism | 3.2.1 | home | V11 §3.2.1 |  |
| V11-0278 | mechanism | 3.2.1 | home | V11 §3.2.1 | pinning hash per §7.6 (V12-XCONF-2) |
| V11-0279 | mechanism | 3.2.2 | home | V11 §3.2.2 | pinning hash per §7.6 (V12-XCONF-2) |
| V11-0280 | rule | 3.2.3 | home | V11 §3.2.3 |  |
| V11-0281 | rule | 3.2.4 | home | V11 §3.2.4 |  |
| V11-0282 | rule | 3.2.5 | home | V11 §3.2.5 |  |
| V11-0283 | rule | 3.2.6 | reference | V11 §3.2.6; reference, cites §17.1 |  |
| V11-0284 | table | 3.3.1 | home | V11 §3.3.1 |  |
| V11-0285 | table | 3.3.1 | home | V11 §3.3.1 |  |
| V11-0286 | table | 3.3.1 | home | V11 §3.3.1 |  |
| V11-0287 | table | 3.3.1 | home | V11 §3.3.1 |  |
| V11-0288 | table | 3.3.1 | home | V11 §3.3.1 | ranges and a_res = 0 stated (V11-EDGE-2) |
| V11-0289 | rule | 3.3.2 | home | V11 §3.3.2 |  |
| V11-0290 | rule | 3.3.3 | home | V11 §3.3.3 |  |
| V11-0291 | rule | 3.3.3 | home | V11 §3.3.3 |  |
| V11-0292 | mechanism | 3.3.4 | home | V11 §3.3.4 |  |
| V11-0293 | number | 3.3.5 | home | V11 §3.3.5 |  |
| V11-0294 | rule | 3.4 | home | V11 §3.4 |  |
| V11-0295 | table | 3.4 | home | V11 §3.4 |  |
| V11-0296 | table | 3.4 | home | V11 §3.4 |  |
| V11-0297 | table | 3.4 | home | V11 §3.4 |  |
| V11-0298 | table | 3.4 | home | V11 §3.4 |  |
| V11-0299 | table | 3.4 | home | V11 §3.4 |  |
| V11-0300 | table | 3.4 | home | V11 §3.4 |  |
| V11-0301 | table | 3.4 | home | V11 §3.4 |  |
| V11-0302 | rule | 3.4 | home | V11 §3.4 |  |
| V11-0303 | rule | 3.4 | home | V11 §3.4 |  |
| V11-0304 | table | 3.5.1 | home | V11 §3.5.1 |  |
| V11-0305 | table | 3.5.1 | home | V11 §3.5.1 |  |
| V11-0306 | rule | 3.5.1 | home | V11 §3.5.1 |  |
| V11-0307 | rule | 3.5.1 | home | V11 §3.5.1 |  |
| V11-0308 | number | 3.5.1 | home | V11 §3.5.1 |  |
| V11-0309 | rule | 3.5.1 | home | V11 §3.5.1 |  |
| V11-0310 | rule | 3.5.1 | home | V11 §3.5.1 | v. rows compiled (V11-MISSING-5) |
| V11-0311 | number | 3.5.1 | home | V11 §3.5.1 | register form (V11-DEFER-2) |
| V11-0312 | rule | 3.5.1 | home | V11 §3.5.1 |  |
| V11-0313 | rule | 3.5.2 | home | V11 §3.5.2 |  |
| V11-0314 | rule | 3.5.2 | home | V11 §3.5.2 |  |
| V11-0315 | rule | 3.5.2 | home | V11 §3.5.2 |  |
| V11-0316 | table | 3.5.3 | home | V11 §3.5.3 |  |
| V11-0317 | table | 3.5.4 | home | V11 §3.5.4 |  |
| V11-0318 | table | 3.5.4 | home | V11 §3.5.4 |  |
| V11-0319 | table | 3.5.5 | home | V11 §3.5.5 |  |
| V11-0320 | table | 3.5.5 | home | V11 §3.5.5 |  |
| V11-0321 | table | 3.5.5 | home | V11 §3.5.5 | one status (RIC-01) |
| V11-0322 | table | 3.5.6 | home | V11 §3.5.6 |  |
| V11-0323 | table | 3.5.6 | home | V11 §3.5.6 | answered J122 (V11-MISSING-1) |
| V11-0324 | table | 3.5.6 | home | V11 §3.5.6 |  |
| V11-0325 | table | 3.5.7 | home | V11 §3.5.7 |  |
| V11-0326 | table | 3.5.7 | home | V11 §3.5.7 |  |
| V11-0327 | table | 3.5.8 | home | V11 §3.5.8 |  |
| V11-0328 | table | 3.5.8 | home | V11 §3.5.8 |  |
| V11-0329 | table | 3.5.8 | home | V11 §3.5.8 | register form (V11-DEFER-2) |
| V11-0330 | rule | 3.5.8 | home | V11 §3.5.8 | DR26–DR35 (ID-DR) |
| V11-0331 | rule | 3.5.8 | home | V11 §3.5.8 |  |
| V11-0332 | rule | 3.5.8 | reference | V11 §3.5.8; reference, cites V07 §2.4 |  |
| V11-0333 | table | 3.5.9 | home | V11 §3.5.9 |  |
| V11-0334 | table | 3.5.10 | home | V11 §3.5.10 |  |
| V11-0335 | table | 3.5.11 | home | V11 §3.5.11 | re-designation in place (V11-ICONF-7) |
| V11-0336 | table | 3.5.11 | home | V11 §3.5.11 |  |
| V11-0337 | table | 3.5.12 | home | V11 §3.5.12 |  |
| V11-0338 | table | 3.5.13 | reference | V11 §3.5.13; reference, cites V05 §3.10 |  |
| V11-0339 | number | 3.5.14 | home | V11 §3.5.14 |  |
| V11-0340 | table | 3.5.15 | home | V11 §3.5.15 | v. rows compiled (V11-MISSING-5) |
| V11-0341 | rule | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0342 | rule | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0343 | table | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0344 | table | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0345 | table | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0346 | table | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0347 | table | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0348 | table | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0349 | table | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0350 | rule | 3.6.1 | home | V11 §3.6.1 |  |
| V11-0351 | table | 3.6.2 | home | V11 §3.6.2 |  |
| V11-0352 | table | 3.6.3 | home | V11 §3.6.3 |  |
| V11-0353 | table | 3.6.4 | home | V11 §3.6.4 |  |
| V11-0354 | table | 3.6.5 | home | V11 §3.6.5 |  |
| V11-0355 | table | 3.7.1 | home | V11 §3.7.1 |  |
| V11-0356 | table | 3.7.1 | home | V11 §3.7.1 |  |
| V11-0357 | table | 3.7.1 | home | V11 §3.7.1 | positive form (V11-NARR-10) |
| V11-0358 | rule | 3.7.1 | home | V11 §3.7.1 |  |
| V11-0359 | table | 3.7.2 | home | V11 §3.7.2 | duplicate entry removed (V11-ICONF-2) |
| V11-0360 | table | 3.7.2 | home | V11 §3.7.2 |  |
| V11-0361 | rule | 3.7.3 | home | V11 §3.7.3 |  |
| V11-0362 | table | 3.7.4 | home | V11 §3.7.4 |  |
| V11-0363 | rule | 3.7.4 | home | V11 §3.7.4 |  |
| V11-0364 | rule | 3.7.4 | home | V11 §3.7.4 |  |
| V11-0365 | table | 3.8 | home | V11 §3.8 |  |
| V11-0366 | table | 3.8 | home | V11 §3.8 |  |
| V11-0367 | table | 3.8 | home | V11 §3.8 | re-designation in place (V11-ICONF-7) |
| V11-0368 | rule | 3.8 | home | V11 §3.8 |  |
| V11-0369 | table | 3.9 | home | V11 §3.9 |  |
| V11-0370 | table | 3.9 | home | V11 §3.9 |  |
| V11-0371 | rule | 3.9 | home | V11 §3.9 |  |
| V11-0372 | table | 3.10 | home | V11 §3.10 |  |
| V11-0373 | table | 3.10 | home | V11 §3.10 | answered J122 (V11-MISSING-1) |
| V11-0374 | rule | 3.10 | home | V11 §3.10 |  |
| V11-0375 | rule | 3.11 | home | V11 §3.11 |  |
| V11-0376 | rule | 3.11 | home | V11 §3.11 |  |
| V11-0377 | rule | 3.11 | home | V11 §3.11 |  |
| V11-0378 | table | 3.11 | home | V11 §3.11 |  |
| V11-0379 | table | 3.11 | home | V11 §3.11 |  |
| V11-0380 | table | 3.11 | home | V11 §3.11 |  |
| V11-0381 | table | 3.11 | home | V11 §3.11 |  |
| V11-0382 | table | 3.11 | home | V11 §3.11 |  |
| V11-0383 | table | 3.11 | home | V11 §3.11 |  |
| V11-0384 | table | 3.11 | home | V11 §3.11 |  |
| V11-0385 | table | 3.11 | home | V11 §3.11 | answered J122 (V11-MISSING-1) |
| V11-0386 | table | 3.11 | home | V11 §3.11 |  |
| V11-0387 | table | 3.11 | home | V11 §3.11 |  |
| V11-0388 | table | 3.11 | home | V11 §3.11 |  |
| V11-0389 | table | 3.11 | home | V11 §3.11 |  |
| V11-0390 | table | 3.11 | home | V11 §3.11 | re-designation in place (V11-ICONF-7) |
| V11-0391 | table | 3.11 | home | V11 §3.11 |  |
| V11-0392 | table | 3.11 | home | V11 §3.11 |  |
| V11-0393 | rule | 3.12 | home | V11 §3.12 |  |
| V11-0394 | rule | 3.12 | home | V11 §3.12 |  |
| V11-0395 | rule | 3.12 | home | V11 §3.12 |  |
| V11-0396 | rule | 3.12 | home | V11 §3.12 |  |
| V11-0397 | rule | 3.12 | home | V11 §3.12 | re-designation in place (V11-ICONF-7) |
| V11-0398 | rule | 3.12 | home | V11 §3.12 |  |
| V11-0399 | table | 3.12 | home | V11 §3.12 |  |
| V11-0400 | table | 3.12 | home | V11 §3.12 |  |
| V11-0401 | table | 3.12 | home | V11 §3.12 | re-designation in place (V11-ICONF-7) |
| V11-0402 | table | 3.12 | home | V11 §3.12 | re-designation in place (V11-ICONF-7) |
| V11-0403 | table | 3.12 | home | V11 §3.12 |  |
| V11-0404 | table | 3.12 | home | V11 §3.12 |  |
| V11-0405 | table | 3.12 | home | V11 §3.12 |  |
| V11-0406 | rule | 3.13 | home | V11 §3.13 |  |
| V11-0407 | table | 3.13.1 | home | V11 §3.13.1 | union key forms (V09-XAGREE-1) |
| V11-0408 | table | 3.13.2 | home | V11 §3.13.2 |  |
| V11-0409 | table | 3.13.2 | home | V11 §3.13.2 |  |
| V11-0410 | table | 3.13.2 | home | V11 §3.13.2 |  |
| V11-0411 | table | 3.13.2 | home | V11 §3.13.2 |  |
| V11-0412 | table | 3.13.2 | home | V11 §3.13.2 |  |
| V11-0413 | rule | 3.13.2 | home | V11 §3.13.2 |  |
| V11-0414 | rule | 3.13.3 | home | V11 §3.13.3 | non-alias families (V11-ICONF-3) |
| V11-0415 | table | 3.13.4 | home | V11 §3.13.4 |  |
| V11-0416 | table | 3.13.4 | home | V11 §3.13.4 |  |
| V11-0417 | rule | 3.13.5 | home | V11 §3.13.5 | positive form (V11-NARR-10) |
| V11-0418 | table | 3.14.1 | home | V11 §3.14.1 |  |
| V11-0419 | table | 3.14.2 | home | V11 §3.14.2 |  |
| V11-0420 | table | 3.15 | home | V11 §3.15 |  |
| V11-0421 | table | 3.15 | home | V11 §3.15 |  |
| V11-0422 | table | 3.16.1 | home | V11 §3.16.1 |  |
| V11-0423 | rule | 3.16.1 | home | V11 §3.16.1 |  |
| V11-0424 | number | 3.16.1 | home | V11 §3.16.1 |  |
| V11-0425 | table | 3.16.2 | home | V11 §3.16.2 |  |
| V11-0426 | table | 3.17.1 | home | V11 §3.17.1 | register form (V11-DEFER-2) |
| V11-0427 | table | 3.17.2 | home | V11 §3.17.2 |  |
| V11-0428 | table | 3.18 | home | V11 §3.18 |  |
| V11-0429 | table | 3.18 | home | V11 §3.18 | register form (V11-DEFER-2) |
| V11-0430 | rule | 3.18 | home | V11 §3.18 | strike pool (G-strike) |
| V11-0431 | table | 3.19.1 | home | V11 §3.19.1 |  |
| V11-0432 | rule | 3.19.2 | reference | V11 §3.19.2; reference, cites V08 | era cites V08 §2.6 (V08-XCONF-9) |
| V11-0433 | table | 3.19.3 | home | V11 §3.19.3 |  |
| V11-0434 | rule | 3.19.3 | home | V11 §3.19.3 |  |
| V11-0435 | rule | 3.20 | reference | V11 §3.20; reference, cites §10.4 |  |
| V11-0436 | table | 3.20.1 | home | V11 §3.20.1 |  |
| V11-0437 | table | 3.20.1 | home | V11 §3.20.1 |  |
| V11-0438 | table | 3.20.1 | home | V11 §3.20.1 |  |
| V11-0439 | rule | 3.20.2 | home | V11 §3.20.2 |  |
| V11-0440 | rule | 3.20.3 | home | V11 §3.20.3 |  |
| V11-0441 | table | 3.20.3 | home | V11 §3.20.3 | register form (V11-DEFER-2) |
| V11-0442 | rule | 3.20.4 | home | V11 §3.20.4 |  |
| V11-0443 | table | 3.20.5 | home | V11 §3.20.5 |  |
| V11-0444 | rule | 3.20.6 | home | V11 §3.20.6 |  |
| V11-0445 | table | 3.21.1 | home | V11 §3.21.1 |  |
| V11-0446 | table | 3.21.2 | home | V11 §3.21.2 |  |
| V11-0447 | rule | 3.21.3 | home | V11 §3.21.3 |  |
| V11-0448 | rule | 3.21.4 | home | V11 §3.21.4 |  |
| V11-0449 | table | 3.22 | home | V11 §3.22 |  |
| V11-0450 | rule | 3.23 | reference | V11 §3.23; reference, cites V04 §1b.1 |  |
| V11-0451 | number | 3.23.1 | home | V11 §3.23.1 |  |
| V11-0452 | table | 3.23.2 | home | V11 §3.23.2 |  |
| V11-0453 | rule | 3.23.3 | reference | V11 §3.23.3; reference, cites V04 §3.5.0a |  |
| V11-0454 | table | 3.23.4 | home | V11 §3.23.4 | register form (V11-DEFER-2) |
| V11-0455 | rule | 3.23.4 | home | V11 §3.23.4 |  |
| V11-0456 | table | 3.23.5 | home | V11 §3.23.5 |  |
| V11-0457 | number | 3.23.6 | home | V11 §3.23.6 |  |
| V11-0458 | number | 3.23.7 | home | V11 §3.23.7 |  |
| V11-0459 | number | 3.23.7 | home | V11 §3.23.7 |  |
| V11-0460 | table | 3.23.8 | home | V11 §3.23.8 |  |
| V11-0461 | rule | 3.23.8 | home | V11 §3.23.8 |  |
| V11-0462 | rule | 3.23.9 | home | V11 §3.23.9 |  |
| V11-0463 | rule | 3.24 | home | V11 §3.24 |  |
| V11-0464 | table | 3.24.0 | home | V11 §3.24.0 |  |
| V11-0465 | table | 3.24.1 | home | V11 §3.24.1 | calibrated by V12 §3.11's terrace line (V11-XCONF-3) |
| V11-0466 | rule | 3.24.1 | home | V11 §3.24.1 | calibrated by V12 §3.11's terrace line (V11-XCONF-3) |
| V11-0467 | rule | 3.24.1 | home | V11 §3.24.1 |  |
| V11-0468 | table | 3.24.1 | home | V11 §3.24.1 |  |
| V11-0469 | rule | 3.24.1 | home | V11 §3.24.1 | register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104) |
| V11-0470 | table | 3.24.2 | home | V11 §3.24.2 |  |
| V11-0471 | number | 3.24.2 | home | V11 §3.24.2 | DR26–DR35 (ID-DR) |
| V11-0472 | rule | 3.24.2 | home | V11 §3.24.2 |  |
| V11-0473 | number | 3.24.2 | home | V11 §3.24.2 |  |
| V11-0474 | rule | 3.24.2 | home | V11 §3.24.2 | register form (V11-DEFER-2) |
| V11-0475 | rule | 3.24.2 | home | V11 §3.24.2 |  |
| V11-0476 | table | 3.24.3 | home | V11 §3.24.3 |  |
| V11-0477 | rule | 3.24.3 | home | V11 §3.24.3 | union key forms (V09-XAGREE-1) |
| V11-0478 | rule | 3.24.3 | home | V11 §3.24.3 |  |
| V11-0479 | table | 3.24.4 | home | V11 §3.24.4 |  |
| V11-0480 | rule | 3.24.4 | home | V11 §3.24.4 | DR26–DR35 (ID-DR) |
| V11-0481 | table | 3.24.4 | home | V11 §3.24.4 |  |
| V11-0482 | table | 3.24.5 | home | V11 §3.24.5 | outcome beyond 1.5× (V11-EDGE-1) |
| V11-0483 | rule | 3.24.6 | home | V11 §3.24.6 |  |
| V11-0484 | rule | 3.24.7 | home | V11 §3.24.7 |  |
| V11-0485 | rule | 3.24.7 | home | V11 §3.24.7 | DR26–DR35 (ID-DR) |
| V11-0486 | rule | 4.1 | reference | V11 §4.1; reference, cites §7.1 |  |
| V11-0487 | rule | 4.2 | home | V11 §4.2 |  |
| V11-0488 | type | 4.2 | home | V11 §4.2 | union key forms (V09-XAGREE-1) |
| V11-0489 | type | 4.2 | home | V11 §4.2 | union key forms (V09-XAGREE-1) |
| V11-0490 | rule | 4.2 | reference | V11 §4.2; reference, cites V09 |  |
| V11-0491 | rule | 4.3 | home | V11 §4.3 | union key forms (V09-XAGREE-1) |
| V11-0492 | lifecycle | 4.4 | home | V11 §4.4 | union key forms (V09-XAGREE-1) |
| V11-0493 | interface | 4.5 | home | V11 §4.5 |  |
| V11-0494 | rule | 5 | home | V11 §5 |  |
| V11-0495 | rule | 5 | home | V11 §5 |  |
| V11-0496 | rule | 5 | home | V11 §5 |  |
| V11-0497 | number | 6 | home | V11 §6 | pinning hash per §7.6 (V12-XCONF-2) |
| V11-0498 | rule | 6 | home | V11 §6 |  |
| V11-0499 | test | 7.1 | home | V11 §7.1 |  |
| V11-0500 | test | 7.1 | home | V11 §7.1 | register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104) |
| V11-0501 | test | 7.1 | home | V11 §7.1 |  |
| V11-0502 | test | 7.1 | home | V11 §7.1 |  |
| V11-0503 | test | 7.1 | home | V11 §7.1 | v. rows compiled (V11-MISSING-5) |
| V11-0504 | test | 7.1 | home | V11 §7.1 |  |
| V11-0505 | test | 7.1 | home | V11 §7.1 |  |
| V11-0506 | test | 7.1 | home | V11 §7.1 |  |
| V11-0507 | test | 7.1 | home | V11 §7.1 | calibrated by V12 §3.11's terrace line (V11-XCONF-3) |
| V11-0508 | test | 7.1 | home | V11 §7.1 |  |
| V11-0509 | test | 7.2 | home | V11 §7.2 |  |
| V11-0510 | test | 7.2 | home | V11 §7.2 |  |
| V11-0511 | test | 7.2 | home | V11 §7.2 |  |
| V11-0512 | test | 7.2 | home | V11 §7.2 |  |
| V11-0513 | test | 7.2 | home | V11 §7.2 |  |
| V11-0514 | test | 7.2 | home | V11 §7.2 |  |
| V11-0515 | test | 7.2 | home | V11 §7.2 |  |
| V11-0516 | rule | 7.3 | home | V11 §7.3 |  |
| V11-0517 | table | 8 | home | V11 §8 | joins CI at M1 (V11-XCONF-4) |
| V11-0518 | table | 8 | home | V11 §8 |  |
| V11-0519 | rule | 8 | home | V11 §8 | joins CI at M1 (V11-XCONF-4) |
| V11-0520 | decision | 9 | home | V11 §9 J-V11.1 |  |
| V11-0521 | decision | 9 | home | V11 §9 J-V11.2 | count read from REGISTRY (V11-ICONF-4) |
| V11-0522 | decision | 9 | home | V11 §9 J-V11.3 |  |
| V11-0523 | decision | 9 | home | V11 §9 J-V11.4 |  |
| V11-0524 | decision | 9 | home | V11 §9 J-V11.5 |  |
| V11-0525 | decision | 9 | home | V11 §9 J-V11.6 |  |
| V11-0526 | decision | 9 | home | V11 §9 J-V11.7 |  |
| V11-0527 | decision | 9 | home | V11 §9 J-V11.8 | 181 (V11-ICONF-5) |
| V11-0528 | decision | 9 | home | V11 §9 J-V11.9 |  |
| V11-0529 | decision | 9 | home | V11 §9 J-V11.10 |  |
| V11-0530 | decision | 9 | home | V11 §9 J-V11.11 |  |
| V11-0531 | decision | 9 | home | V11 §9 J-V11.12 |  |
| V11-0532 | decision | 9 | home | V11 §9 J-V11.13 |  |
| V11-0533 | decision | 9 | home | V11 §9 J-V11.14 |  |
| V11-0534 | decision | 9 | home | V11 §9 J-V11.15 |  |
| V11-0535 | decision | 9 | home | V11 §9 J-V11.16 |  |
| V11-0536 | decision | 9 | home | V11 §9 J-V11.17 |  |
| V11-0537 | decision | 9 | home | V11 §9 J-V11.18 |  |
| V11-0538 | decision | 9 | home | V11 §9 J-V11.19 |  |
| V11-0539 | decision | 9 | home | V11 §9 J-V11.20 |  |
| V11-0540 | decision | 9 | home | V11 §9 J-V11.21 |  |
| V11-0541 | decision | 9 | home | V11 §9 J-V11.22 |  |
| V11-0542 | decision | 9 | home | V11 §9 J-V11.23 | register form (V11-DEFER-2) |
| V11-0543 | decision | 9 | home | V11 §9 J-V11.24 |  |
| V11-0544 | decision | 9 | home | V11 §9 J-V11.25 |  |
| V11-0545 | decision | 9 | home | V11 §9 J-V11.26 |  |
| V11-0546 | decision | 9 | home | V11 §9 J-V11.27 |  |
| V11-0547 | decision | 9 | home | V11 §9 J-V11.28 | committed manifest the source (V11-DEFER-3) |
| V11-0548 | decision | 9 | home | V11 §9 J-V11.29 |  |
| V11-0549 | decision | 9 | home | V11 §9 J-V11.30 |  |
| V11-0550 | decision | 9 | home | V11 §9 J-V11.31 |  |
| V11-0551 | decision | 9 | home | V11 §9 J-V11.32 |  |
| V11-0552 | decision | 9 | home | V11 §9 J-V11.33 |  |
| V11-0553 | decision | 9 | home | V11 §9 J-V11.34 |  |
| V11-0554 | decision | 9 | home | V11 §9 J-V11.35 |  |
| V11-0555 | decision | 9 | home | V11 §9 J-V11.36 |  |
| V11-0556 | decision | 9 | home | V11 §9 J-V11.37 |  |
| V11-0557 | decision | 9 | home | V11 §9 J-V11.38 |  |
| V11-0558 | decision | 9 | home | V11 §9 J-V11.39 |  |
| V11-0559 | decision | 9 | home | V11 §9 J-V11.40 |  |
| V11-0560 | decision | 9 | home | V11 §9 J-V11.41 |  |
| V11-0561 | decision | 9 | home | V11 §9 J-V11.42 |  |
| V11-0562 | decision | 9 | home | V11 §9 J-V11.43 |  |
| V11-0563 | decision | 9 | home | V11 §9 J-V11.44 |  |
| V11-0564 | decision | 9 | home | V11 §9 J-V11.45 |  |
| V11-0565 | decision | 9 | home | V11 §9 J-V11.46 |  |
| V11-0566 | decision | 9 | home | V11 §9 J-V11.47 |  |
| V11-0567 | decision | 9 | home | V11 §9 J-V11.48 |  |
| V11-0568 | decision | 9 | home | V11 §9 J-V11.49 |  |
| V11-0569 | decision | 9 | home | V11 §9 J-V11.50 |  |
| V11-0570 | decision | 9 | home | V11 §9 J-V11.51 |  |
| V11-0571 | decision | 9 | home | V11 §9 J-V11.52 |  |
| V11-0572 | decision | 9 | home | V11 §9 J-V11.53 |  |
| V11-0573 | decision | 9 | home | V11 §9 J-V11.54 |  |
| V11-0574 | decision | 9 | home | V11 §9 J-V11.55 |  |
| V11-0575 | decision | 9 | home | V11 §9 J-V11.56 |  |
| V11-0576 | decision | 9 | home | V11 §9 J-V11.57 |  |
| V11-0577 | decision | 9 | home | V11 §9 J-V11.58 |  |
| V11-0578 | decision | 9 | home | V11 §9 J-V11.59 |  |
| V11-0579 | decision | 9 | home | V11 §9 J-V11.60 |  |
| V11-0580 | decision | 9 | home | V11 §9 J-V11.61 |  |
| V11-0581 | decision | 9 | home | V11 §9 J-V11.62 |  |
| V11-0582 | decision | 9 | home | V11 §9 J-V11.63 |  |
| V11-0583 | decision | 9 | home | V11 §9 J-V11.64 |  |
| V11-0584 | decision | 9 | home | V11 §9 J-V11.65 |  |
| V11-0585 | decision | 9 | home | V11 §9 J-V11.66 |  |
| V11-0586 | decision | 9 | home | V11 §9 J-V11.67 |  |
| V11-0587 | decision | 9 | home | V11 §9 J-V11.68 |  |
| V11-0588 | decision | 9 | home | V11 §9 J-V11.69 |  |
| V11-0589 | decision | 9 | home | V11 §9 J-V11.70 |  |
| V11-0590 | decision | 9 | home | V11 §9 J-V11.71 | strike pool (G-strike) |
| V11-0591 | decision | 9 | home | V11 §9 J-V11.72 |  |
| V11-0592 | decision | 9 | home | V11 §9 J-V11.73 |  |
| V11-0593 | decision | 9 | home | V11 §9 J-V11.74 |  |
| V11-0594 | decision | 9 | home | V11 §9 J-V11.75 |  |
| V11-0595 | decision | 9 | home | V11 §9 J-V11.76 |  |
| V11-0596 | decision | 9 | home | V11 §9 J-V11.77 |  |
| V11-0597 | decision | 9 | home | V11 §9 J-V11.78 |  |
| V11-0598 | decision | 9 | home | V11 §9 J-V11.79 |  |
| V11-0599 | decision | 9 | home | V11 §9 J-V11.80 |  |
| V11-0600 | decision | 9 | home | V11 §9 J-V11.81 |  |
| V11-0601 | decision | 9 | home | V11 §9 J-V11.82 |  |
| V11-0602 | decision | 9 | home | V11 §9 J-V11.83 |  |
| V11-0603 | decision | 9 | home | V11 §9 J-V11.84 |  |
| V11-0604 | decision | 9 | home | V11 §9 J-V11.85 |  |
| V11-0605 | decision | 9 | home | V11 §9 J-V11.86 | DR26–DR35 (ID-DR) |
| V11-0606 | decision | 9 | home | V11 §9 J-V11.87 |  |
| V11-0607 | decision | 9 | home | V11 §9 J-V11.88 |  |
| V11-0608 | decision | 9 | home | V11 §9 J-V11.89 |  |
| V11-0609 | decision | 9 | home | V11 §9 J-V11.90 | readers by StageId (V11-ICONF-1) |
| V11-0610 | decision | 9 | home | V11 §9 J-V11.91 |  |
| V11-0611 | decision | 9 | home | V11 §9 J-V11.92 |  |
| V11-0612 | decision | 9 | home | V11 §9 J-V11.93 |  |
| V11-0613 | decision | 9 | home | V11 §9 J-V11.94 | v. rows compiled (V11-MISSING-5) |
| V11-0614 | decision | 9 | home | V11 §9 J-V11.95 |  |
| V11-0615 | decision | 9 | home | V11 §9 J-V11.96 | span values stated (J-V11.104) |
| V11-0616 | rule | 8 | home | V11 §8 |  |
| V11-0617 | table | 8 | home | V11 §8 | register form (V11-DEFER-2) |
| V11-0618 | table | 8 | home | V11 §8 |  |
| V11-0619 | rule | 8 | home | V11 §8 |  |
| V11-0620 | rule | 8 | home | V11 §8 |  |
| V11-0621 | rule | 8 | home | V11 §8 | register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104) |
| V11-0622 | rule | 8 | home | V11 §8 |  |
| V11-0623 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-1); BCR pointer to §10.2 | v. rows compiled (V11-MISSING-5) |
| V11-0624 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-2); BCR pointer to §10.2 |  |
| V11-0625 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-4); BCR pointer to §14 |  |
| V11-0626 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-7); BCR pointer to §7.7 |  |
| V11-0627 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-10); BCR pointer to §7.6 | 181 (V11-ICONF-5) |
| V11-0628 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-13); BCR pointer to §10.2 |  |
| V11-0629 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-16); BCR pointer to §10.2 |  |
| V11-0630 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-18); BCR pointer to §4.2 |  |
| V11-0631 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-21); BCR pointer to §17.1 |  |
| V11-0632 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-24); BCR pointer to §10.2 |  |
| V11-0633 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-27); BCR pointer to §2.7 |  |
| V11-0634 | bcr | 10 | bcr-pointer | V11 §10 (pointer row BCR-V11-31); BCR pointer to §7.6 |  |
| V11-0635 | xreq | 10b | handoff | V11 §10b (X-V11-1, closed); hand-off, closed |  |
| V11-0636 | xreq | 10b | handoff | V11 §10b (X-V11-2, closed); hand-off, closed |  |
| V11-0637 | xreq | 10b | handoff | V11 §10b (X-V11-3, closed); hand-off, closed |  |
| V11-0638 | xreq | 10b | handoff | V11 §10b (X-V11-8, closed); hand-off, closed | span values stated (J-V11.104) |
| V11-0639 | xreq | 10b | handoff | V11 §10b (X-V11-12, closed); hand-off, closed | calibrated by V12 §3.11's terrace line (V11-XCONF-3) |
| V11-0640 | xreq | 10b | handoff | V11 §10b (X-V11-14, closed); hand-off, closed | DR26–DR35 (ID-DR) |
| V11-0641 | xreq | 10b | handoff | V11 §10b (X-V11-16, closed); hand-off, closed | register by V12 §3.11 (V11-XCONF-1); 100 cm stated (J-V11.104) |
| V11-0642 | question | 11 | answer-J121-J122 | V11 §11 (answered, J122), §3.14 | answered J122 (V11-MISSING-1) |
| V11-0643 | rule | 12 | home | V11 §12 | readers by StageId (V11-ICONF-1) |
| V11-0644 | rule | 13 | home | V11 §13 (empty): F-V11-1 → J-V11.105, F-V11-2 → J-V11.106, F-V11-3 closed at V04 §2.3, V06 §2.2 |  |
| V11-0645 | rule | IN | home | V11 §3.2.1 step 4 (the ownerRule stamp), §3.24.2 (the calibration minima) (note folded) |  |
| V11-0646 | rule | IN | home | V11 §3.24.1 (the three bend cells), §3.20.1 (the wingRole words) (note folded) | calibrated by V12 §3.11's terrace line (V11-XCONF-3) |
| V11-0647 | rule | IN | home | V11 §3.16.1 (arcKind), §3.24.4 (bridgeMid minSpanM) (note folded) |  |
