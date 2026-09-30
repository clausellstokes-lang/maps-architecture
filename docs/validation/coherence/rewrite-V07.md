# Rewrite report — V07 (the village product)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V07; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V07`)
- inputs gathered (canon unit, conflicts, elegance, g items, wiring, hand-offs, edges, inventory) — done
- volume rewritten part by part (`work/rewrite-V07/parts/`, assembled by `scripts/assemble.sh`) — done
- checks (references resolve, ids unique, retired terms, provenance tags) — done
- this report, the result file, LANDED — done

Output: `docs/validation/coherence/new/volumes/V07-village.md` (title line and section structure kept, one marker line).

## Sizes

| measure | before | after | change |
|---|---|---|---|
| words (`wc -w`) | 102 339 | 88 879 | −13.2 % |
| words (the canon's count) | 104 422 | — | — |
| bytes | 648 060 (632.9 KB) | 546 969 (534.1 KB) | −15.6 % |

Removed ≈ 20 000 words, added ≈ 6 500 words of routed new content. Shares of the removal: **narration** ≈ 13 300 (the
22 stacked banner and revision lines, the PROGRESS and eight lane ledgers, the reading record, §12's per-lane reading
records, §10's preamble, the eleven reconciliation, integration-continuation and finalization appendices, §1's landing
history — NARR-1 … NARR-10); **restatement** ≈ 5 400 (§10's full request texts → the pointer table, RESTATE-3; §4.2's
event forms → §7.1, RESTATE-6; the records-placement contract written once at V07 §2.1, DUP-1; the grow-path call points →
file f item 202; the LadderRouter and `villageForm` sentences; the church-family list → V11 §3.5.1; V06's street rate);
**duplicated mechanisms** ≈ 400 (E-30's reference cell → §7.6; E-38's stored `haPerHead`; DUP-2's factor rows); **verbose
prose** ≈ 900 (§9's twelve longest rows restating their mechanisms, cut to the choice, the alternative and every reason).
Added: g item 111's village part (≈ 900), g item 113's V07 §3.12a (≈ 1 050), the edge catalogue V07 §3.17 (≈ 2 150), the
why provider (≈ 450), T-V7-58 – T-V7-61 (≈ 650), J-V7.134 – J-V7.140 (≈ 750), W74 – W76 and the lifecycle row (≈ 450).

**Below the band (25–40 %), and why.** Net −13.2 %; without the routed additions the removal is −19.6 %. What holds the
rest is irreducible build-depth content that is this volume's own and stated once: the 25 typed `v.` class rows with
their profile and authored rows and supply table (V07 §2.4, ≈ 6 700 words), the village table and its typed rule cells with
every default row (V07 §2.2–§2.2a, ≈ 5 400), the 75 wiring rows and the dossier trace (V07 §1b, ≈ 5 900), the 61 bars
(V07 §7, ≈ 6 700), the 140 reasoned decisions (V07 §9, ≈ 10 300), the epoch and hand-off rules (V07 §3.12, ≈ 6 100) and
the dossier rows (V07 §3.11, ≈ 3 500). The canon found only 10 restatements of base facts in this volume; no rule, case,
value, bar, record field, lifecycle row, test, owner rule or reasoned decision was thinned to meet the goal (the guard).

## Conflicts resolved (13, as the canon rules)

| conflict | ruling applied | where |
|---|---|---|
| DIC-06 | tools T1–T12 always with their word at first use (T8 `fill`, T10 `hold`); bars always numbered; the mapping tables cited by row-set name | V07 §3.9 (2), §3.11 DR11, DR16–DR18, §4.1 |
| MC-11 | `Rung` is §1.1's type, `TableId` §7.6's; V07 cites both (`ProductDecl.rows?: TableId`, V07 §2.1) | V07 §1, §2.1 |
| V02-ICONF-1 | `composition.classFamily` (V02 §3.10.5) the one source of the village classes' composition keys; V07 names no second source | V07 §1 item 3, §2.4, J-V7.82 |
| V07-ICONF-1 | `neighbourTracks` "4 from about 227 people" | V07 §2.2 |
| V07-ICONF-2 | the centrepiece pond is never "the village pond" (VS1's carved L0 pond) | V07 §3.6 (5) |
| V07-ICONF-3 | the ends cap "6 from about 563 people" | V07 §3.10 |
| V07-ICONF-4 | (9v) spaced by the polyfocal rule, `max(polyfocal.spacingMinM, spacingShareRs · R_s)` | V07 §3.12 (9v) |
| V07-ICONF-5 | the stale "pending" sentences left with the §12/§13 narration; §1 states current facts only | V07 §1, §12, §13 |
| V07-XCONF-1 | Q1 decided (a), J122; V-M0 right after M0 on M0's kernel, tables and its own fixtures; V-M1 – V-M4 after M4 beside M5; V-M3's epoch clauses with M6-E | V07 §8, §11 |
| V07-XCONF-2 | the span rule's `country` reason (J-C4, file f item 244) cited; the fallback and IN-V07-2's stale reason dropped | V07 §1 item 1, §3.5a (7), §3.16 (1), T-V7-48 |
| CANON-C01 | as V07-XCONF-1 | V07 §8 |
| CANON-C03 | §11 holds the decision, not a recommendation | V07 §11 |
| CANON-C04 | the INDEX §7 items routed here (TX-04, SR6-04 (b)-(c), SR6-08) fixed | V07 §6, §12, §13, §2.4 |

## Elegance rulings applied (equivalence lists ticked)

**E-01 (UNIFY, stretch-state profiles; home §2.2 rule 5).** V07 applies the one profile to its house-platform walls and
cites it (V07 §1, §3.8a (9)); the palisade's graded stretches keep item 106 (c)'s stretch profile (V07 §3.4 step 6).
- [x] canonical form, write, read, regenerate, cut/join, undo, migrate — at §2.2 rule 5, cited
- [x] RetainingWall's values, knot role, writers (V07's house-platform walls through V06's pool; restoration over the re-levelled length, V07 §3.12, §3.8a (9)) and readers — unchanged, cited
- [x] Enceinte's values and lifecycle — unchanged; V07's palisade and remnant walls read `Enceinte.condition` (V07 §3.12a (2) a, §5.1)

**E-24 (UNIFY, one mark on a superseded or amended decision).**
- [x] no row dropped (J-V7.1 – J-V7.140, all present)
- [x] the governing row keeps the reason: J-V7.30 carries "*superseded by J-V7.115*" with its surviving clauses; J-V7.10, .19, .20, .42, .45, .82 carry "(amended by …)" with the final choice written in the row

**E-30 (UNIFY, the reference cell; home §7.6).**
- [x] the compile check (a missing row fails the build) — §7.6 and T-V7-44, cited in V07 §2.2a
- [x] `editTable`'s inverse and undo row — §7.6, cited
- [x] V07's references to V11 §3.6.1 (`claimArea.cloister.footprintM2`), §3.24.1 (`terrace` cells), §3.24.4 (`minPlotDepthM`, read, no cell) in the one form (V07 §2.2a)

**E-31 (UNIFY, the toll-bridge watercourse rule; home V08 §2.6b (3)).**
- [x] village geometry (the course between the frame arcs the through road's entries divide, the topology raised to `through`) — cited at its village row (V07 §3.1 (1))
- [x] coastal dry site at village rungs: an estuary — cited
- [x] failure → `toll_bridge_dry` on the union of conditions (a desert with no `oasis_water` and no river the arid row draws; relief that cannot carry the brook; a fixed `isolated` or `none` access word) — cited (V07 §3.1 (1), §3.11 DR1, T-V7-13, V07 §3.17)

**E-38 (UNIFY / declared change, the territory per head; home V07 §3.9 (1)).**
- [x] the farm rows' values unchanged (1.2, 0.15, 0.6, 0.25, 0.075)
- [x] A_T from the per-head sum: `A_T = max(minKm2, a_head · P ÷ usableShare ÷ 100)`, `a_head` = 2.275 ha derived (V07 §3.2 (1)); the ladder rows' areas restated (1.1, 5.7, 20 km²); J-V7.139 records the −1.1 % change
- [x] V12's register: the farm rows are the calibratable cells; `haPerHead` leaves `village.json` (no cell, no entry)
- *Note for the adjudicator:* the canon's list reads "A_T = households × the per-head sum"; the cell is per head (per inhabitant, `arableHaPerCapita`), so V07 keeps `P` — a households factor would shrink every territory 4.5-fold, which is no part of the ruling's declared −1.1 %.

No other unification was made.

## Renumberings and id rulings

- **G-dwell / V07-TERM-2:** the dwelling count `D`, `D_b`, `D_v`, `D_o` → `N`, `N_b`, `N_v`, `N_o` everywhere (V07 §1b, §3.2 (3), §3.8, §3.10, §3.11 DR7, §3.12 (9v), §3.15, §6, §7); `D(x)` stays item 102's daylight share.
- **ID-DR:** DR-V8.1 → DR29 (V07 §1b W42); no other alias occurred.
- **ID-TOOL / V07-TERM-4:** mapping tables T14, T16 → V08 §2.6's `government` and `conditions` row sets; `(T10)` → T10 `hold`.
- **ID-WX / V07-TERM-3:** other volumes' rows written `V06 X43`, `V02 X13`, `V11 X-V11-14`, `V11 W68`; V06's build steps E1–E8 written `V6-E1` – `V6-E8` (V12 §2.8's form); X16, X17 and critique ids replaced by the sections they name.
- **ID-BCR:** V04's bare BCR ids do not occur; every BCR-V7-n is a pointer row of V07 §10 (V07-RESTATE-3).
- **ID-DUPDEF:** T-V7-1 – T-V7-61, J-V7.1 – J-V7.140 and W1 – W76 (W40 withdrawn) each defined once (script check).
- **G-cite / V07-TERM-1:** every self-reference `V07 §x.y`, every base reference bare `§x.y`; the volume's former convention paragraph removed. A script resolved all 2 400-odd section citations against the base, V01–V05's new texts, V06's parts in progress and V07–V12 (0 unresolved at section level).
- New ids: T-V7-58 – T-V7-61; J-V7.134 – J-V7.140; W74 – W76; report keys `W_POLYFOCAL_FEWER`, `W_PERIMETER_DISC`.

## Terms replaced

G-firstmap (all "first paint" → "first map"); G-cite; G-dwell; G-DR; G-digest (already `site.deposits`); G-portpath (no hit
left); G-floorvault ("floor vaults" → "no crypt; ledger slabs in the chancel floor (V03 §3.7.4)", V07 §2.4); G-strike
("the engine's lottery" → "the strike pool", V07 §3.12); 0 hits left for every retired term (script grep).

## File f items cited as base text

201, 202, 209, 214, 215, 244, 245, 255, 267, 268, 276, 279, 283, 287, 290, 292, 310, 312, 314, 315, 316, 317, 322, 326,
344, 357, 377, 378, 413, 418, 424, 430, 431, 436, 495, 505, 506, 516, 527, 528, 565, 568, 576, 577, 579 — plus 270 (the
why interface), 291 (the decks' states), 399 (the `kinds` row) and 496, 500 (V12's baseline and panel types). Every
BCR-V7-n and the two V06 requests V07 carried are rows of V07 §10's pointer table.

## File g parts written at build depth

- **Item 111 — the village crowding map's water pull and oasis villages:** the dry-country water draw and the oasis
  (V07 §3.1 (1)); the heart's `oasis` term and the climate cell on every village sun term (V07 §3.2 (4), §3.9 (2) `D_c`);
  the water pull `w_water · p(x)` in VS2's `w(x)` (V07 §3.3); the oasis's gardens as irrigated `garden` crofts (V07 §3.8);
  the arid wells (V07 §3.10); DR1's `desert` and `oasis_water` (V07 §3.11); the painterly dry-country looks (V07 §5.1);
  VS2's cost (V07 §6); the `VG` preset's neutral rows (V07 §3.15); cells `heart.oasis`, `heart.oasisM` (V07 §2.2a); W75;
  T-V7-59 (with its `NoOpPin`); J-V7.135; edge rows (V07 §3.17).
- **Item 113 — a village over a former city and refounding at village rungs:** V07 §3.12a (1) which product runs the
  replay, (2) the remnants (the remnant-wall rule, old streets, old quarters, buried remnants, the story), (3) refounding
  (foundations first, old roads by merge and `existingFabricCost`, gate gaps and bridges, salvage, walls), (4) edges; cells
  `formerCity.wallAreaShare`, `formerCity.gateSnapM`; the painterly remnant looks (V07 §5.1); the why rows (V07 §4.5);
  W76; T-V7-60 (with its `NoOpPin`); J-V7.136; V-M3's price (V07 §8).

## Wiring gaps closed

| gap | closure |
|---|---|
| W-IF-02 | V07 §4.5 *The why provider*: one `WhyProvider` for `VillagePlan`, `VillageField`, `VillageEnd` and a section provider, answers keyed `info.village.*`; W74; V07 §2.6's row; T-V7-58; J-V7.134 |
| W-FLD-08 | `VillagePlan.formSource`, `roadsSource` read by V07 §4.5's provider (the source line of the form and road answers), tested by T-V7-58 (V07 §2.3) |
| V07-WGAP-1 | cells added: `palisade.denseDialFrom`, `palisade.pullM`, `palisade.section`, `formRules.organicDialFrom`, `formRules.districtDensity`, `perimeter.closeM`; the grade guard reads `rules.grade` and `grade.maxTurnCdeg`; the moat, fishpond, warren, gallows and close-join values read their cells; (9v) reads the polyfocal rule (V07 §2.2, §2.2a, §3.1, §3.4, §3.5, §3.7, §3.8, §3.9 (6), §3.12) |
| V07-WGAP-2 | `density.bandWeight` written into VS2's formula (`bandWeight · q`); `network.trailMinShare` into step 6's track limit; `network.slack` and `network.emptyDensity` withdrawn from the interface, the defaults and the `VG` column (no step read them; J-V7.140) |

## Open findings routed here (54) — each FIXED or marked

| finding | disposition |
|---|---|
| VOL-V07-V08-RESTATEMENTS-001, V07-RESTATE-1 | **Marked for the adjudicator (INVALID proposed):** `ProductDecl`'s interface stays at V07 §2.1 — file f item 202's own text names "V07 §2.1's type", and the applied base (pipeline §4.12, scope §14) cites V07 §2.1 as its home and declares no interface; moving it would leave the type undeclared. Its `records` member's comment now cites *The records placement* (one statement). |
| VOL-V07-V08-RESTATEMENTS-002 | FIXED: V07 §2.1 "`LadderRouter.route` reads this registration (§1.1; file f item 202)" |
| VOL-V07-V08-RESTATEMENTS-003, V07-RESTATE-2 | FIXED: the persistence row cites V11 §3.5.1's `church-family` tag, the member list V11's, compiled from the tag (T-V7-56) |
| VOL-V07-V08-RESTATEMENTS-004 | FIXED: V07 §2.7 cites `villageForm` at §10.2 (file f items 430, 432) |
| VOL-V07-V08-RESTATEMENTS-005, V07-RESTATE-4 | FIXED: V07 §3.12 cites V06 §3.5.2's street rate, no number |
| VOL-V07-V08-RESTATEMENTS-006 | FIXED: V07 §4.2 cites §7.1's `EditEvent` |
| VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3, V07-NARR-8 | FIXED: V07 §10 is the pointer table |
| V07-DUP-1 | FIXED: one home, V07 §2.1 *The records placement*; W70, the `ProductDecl` comment and V07 §3.12 cite it |
| V07-DUP-2 | FIXED: the factor and decoration values live in V07 §2.2a; V07 §2.4 and §3.9 (3), (6) cite the cells |
| V07-ICONF-1 … -5, V07-XCONF-1, -2 | FIXED as ruled (table above) |
| V07-ELEG-1 | FIXED by E-30 |
| V07-ELEG-2 | FIXED by E-38 |
| V07-ELEG-3 | FIXED: IN-V07-3, -4, -5 folded into V07 §3.1 (1), §3.4, §5.1 and §4 (the `walls.barriers` rows with `WallBarrierRow.arcKind`, `LayerSpec.showCircuit`) |
| V07-WGAP-1, -2 | FIXED (wiring table above) |
| V07-TERM-1 … -4 | FIXED (renumberings above) |
| V07-DEFER-1 | FIXED: dependencies restated as current facts at their homes (V04 §2.2, §3.5.4 (d); V06 §3.19.2); fallbacks cut |
| V07-DEFER-2 | FIXED: the item-110 roles are this volume's role names for §8.2's semantics, drawn by the base's `retaining`, `way.stair` and `raisedWay` programs (V07 §5.1); no conditional parenthesis |
| V07-DEFER-3 | FIXED: FL-1 — the reference trace cites row D5 alone (V07 §2.2a, T-V7-44); FL-4 — every critique id replaced by its section |
| V07-DEFER-4 | FIXED: SR6-04 (b)-(c), SR6-08, TX-04 closed (below) |
| V07-NARR-1 … -10 | FIXED: one marker line; ledgers, reading record, landing history, W40, the "23:23 note" sentence, the rows' amendment history, §10's preamble, the appendices and §12's lane records removed |
| V07-BREF-1 | FIXED: `v.smithy` gains `K spread 200`, the spacing its COUNT row reads (V07 §2.4; J-V7.138) |
| TX-04 | FIXED: V07 §6 prices `village.density` at a base-product epoch (≤ 6 ms p95); V06 §6.2's row cites it (cross-part note) |
| SR6-04 (b)-(c) | FIXED: the round-6 sentences left with the narration (V07 §12, §13) |
| SR6-08 | FIXED: V07 §2.4 names V11's compiler (step 5a) as the producer of `commonness`, no script (W18, J-V7.133) |
| IN-V07-1 … -7 | FIXED: folded into the body; the *Integration notes* table says where each lives |

## Hand-offs closed at this volume (26)

V02:X13, V02:X26 (V07 §2.4); V06:X4 (V07 §10 BCR-V7-18 → items 202, 317), V06:X22 (V07 §1 item 5, §3.12), V06:X27
(V07 §2.1, §2.2, §3.12), V06:X32 (V07 §2.2, §3.12), V06:X34 (the base, items 268, 209, 574), V06:X36 (V07 §3.12 *Village
siting*), V06:X43 (V07 §2.1, §3.12); V08:X7 (V07 §3.1 (1), E-31), V08:X14, X22, X23 (V07 §2.4, §3.10, §3.11, §3.12);
V09:XV-V9-9 (V07 §3.4 step 7, §5.1); V10:CVR-V10-14 (V07 §4.5); V11:X-V11-2 (V07 §2.4, §3.4), X-V11-8 (V07 §2.2a
`terrace`), X-V11-14 (V07 §2.1), X-V11-15, X-V11-17 (V07 §2.4, T-V7-56); V12:X-V12-2 (V07 §8 V-M4), X-V12-11 (T-V7-52),
X-V12-14 (V07 §8 V-M4), X-V12-15, X-V12-16, X-V12-17 (V07 §8 *The register at the exits*, `--milestone`). The volume's
own dependency rows V07-0014 … V07-0018 are V07 §1's *What this volume reads*, every item current; §13's hand-off table
is the one live list.

## Owner question

Q1 marked **decided (a), J122**; V07 §8 and §11 read it (V-M0 right after M0; V-M1 – V-M4 after M4 beside M5).

## Edges (38 UNDEFINED, 44 UNTESTED routed) → V07 §3.17

Every routed edge has a row in V07 §3.17's table (66 rows) with its defined outcome, its failure rung (V07 §3.13's
classes; two new report keys) and its test (T-V7-61, the edge suite, plus the bar each row names). The mapping is in the
appendix below. No named combination is owned by V07 (the canon lists 0 UNDEFINED combinations it owns).

## Cross-part notes

1. **pipeline §4.12, scope §14 (ProductDecl):** both cite V07 §2.1 as the type's home, as file f item 202 does; V07 keeps the declaration (RESTATE-1 marked above). No base edit needed.
2. **V06 §3.20.4 (4):** "At village rungs V07's product phases do this (V07 §3.12)" should read "(V07 §3.12a (3))", the refounding's home.
3. **V06 §6.2:** its `village.density` base-epoch row cites V07 §6's ≤ 6 ms p95 (TX-04).
4. **V06 §8 / V12 §2.8:** V07 now writes V06's steps as `V6-E2` – `V6-E4`.
5. **V08 §2.6b (3) (E-31):** the rule's village-rung row must state the estuary on a coastal dry site, the raise to `through`, and the failure union including "a desert with no `oasis_water` and no river the arid row draws" (V07 §3.1 (1) cites it).
6. **V08 §2.6 (`desert` row):** with item 111 it must admit rivers, lakes and coasts at the arid row's chances (the current row reads "open water only with an `oasis_water` deposit"); V07 §3.11 DR1 cites the row.
7. **V10 §3.9 and V09's message rows:** add the `info.village.*` keys V07 §4.5 lists (heart, form, roads, field, end, market, pin, closure, ladder, platformWall, scarp, hollowWay, carriedArches, pierHead, waterPull, oasis, formerCity); V10's owed-table row for V07 is met by T-V7-58.
8. **V11:** V07 reads the climate row's arid water chances, oasis chance, water-pull weight and radius, sunlight cell and walking-coverage factor (item 111) and `history.reuseCost` (item 113); no V11 cell is restated.
9. **V12:** the new calibratable `village.json` cells (`heart.oasis`, `heart.oasisM`, `palisade.denseDialFrom`, `palisade.pullM`, `palisade.section`, `formRules.organicDialFrom`, `formRules.districtDensity`, `perimeter.closeM`, `formerCity.*`) take the default line at V-M0; the `NoOpPin`s of T-V7-59 and T-V7-60 register on V12 §3.7.8; `network.slack` and `network.emptyDensity` leave the register.
10. **scope §13.2, §16 and INDEX §4:** V07's bars read T-V7-1 – T-V7-61; its price 27.25–37.25 pw (items 111 and 113 + 0.75 pw); the slot as J122 gives it (INDEX's new §4 already agrees).
11. **rendering §8.2:** the base names programs (`retaining`, `raisedWay`, `way.stair`) but no item-110 role names; V07 §5.1 names its roles for those semantics. If the base adds role names, V07 cites them.
12. **canon E-38:** its equivalence item "A_T = households × the per-head sum" is read as per head (population), as the cell's own definition gives (marked above).
13. **V04 §3.5.5 (b):** the buried former settlement at village rungs is read by V07 §3.16's access rows (V07 §3.12a (2) d); nothing owed.

## Appendix A — the mapping table (every inventory id of V07 → where it now lives)

Roles are the canon's (`canon.json → by_inventory_id`): 309 home (stated once at V07's own section), 10 reference (cited at their homes), 7 BCR pointers, 5 hand-offs, 1 glossary, 1 owner answer.

| inventory id | role | was | now lives |
|---|---|---|---|
| V07-0001 | home | 0 | V07 §0 |
| V07-0002 | home | 0 | V07 §0 |
| V07-0003 | home | 0 | V07 §0 |
| V07-0004 | home | 0 | V07 §0 |
| V07-0005 | home | 0 | V07 §0 |
| V07-0006 | home | 0 | V07 §0 |
| V07-0007 | home | 0 | V07 §0 |
| V07-0008 | reference | header Reading | head paragraph (provenance form, §17.1 (6)) — REFERENCE to §17.1; the reading list cut (NARR-3) |
| V07-0009 | home | 1 | V07 §1 |
| V07-0010 | home | 1 | V07 §1 |
| V07-0011 | reference | 1 | V07 §1 *Base hooks consumed* — REFERENCE (cites §1.1, §4.2 …); kept as the cited list |
| V07-0012 | reference | 1 | V07 §1 *Item 110's base side* — REFERENCE (§2.7, §2.2, §4.3, §4.7, §5.3, §7.1) |
| V07-0013 | home | 1 | V07 §1 |
| V07-0014 | handoff | 1 (1) | V07 §1 *What this volume reads* item 1 (V04 §2.2) — closed; fallback cut (DEFER-1) |
| V07-0015 | handoff | 1 (2)-(3) | V07 §1 *What this volume reads* items 2–3 (V11, V02) — closed |
| V07-0016 | handoff | 1 (4)-(7) | V07 §1 *What this volume reads* items 1, 5 and V07 §4.5 (V09/V10) — (5) closed by J-C4 at §2.7; (6) fallback cut |
| V07-0017 | handoff | 1 (8)-(13) | V07 §1 *What this volume reads* items 2, 5, 6, 8 — landing history cut (NARR-4, ICONF-5) |
| V07-0018 | handoff | 1 (14) | V07 §1 item 5 last sentence; V07 §8 *Where it slots* (V-M3 with M6-E) |
| V07-0019 | home | 1b W1 | V07 §1b W1 |
| V07-0020 | home | 1b W2 | V07 §1b W2 |
| V07-0021 | home | 1b W3 | V07 §1b W3 |
| V07-0022 | home | 1b W4 | V07 §1b W4 |
| V07-0023 | home | 1b W5 | V07 §1b W5 |
| V07-0024 | home | 1b W6 | V07 §1b W6 |
| V07-0025 | home | 1b W7 | V07 §1b W7 |
| V07-0026 | home | 1b W8 | V07 §1b W8 |
| V07-0027 | home | 1b W9 | V07 §1b W9 |
| V07-0028 | home | 1b W10 | V07 §1b W10 |
| V07-0029 | home | 1b W11 | V07 §1b W11 |
| V07-0030 | home | 1b W12 | V07 §1b W12 |
| V07-0031 | home | 1b W13 | V07 §1b W13 |
| V07-0032 | home | 1b W14 | V07 §1b W14 |
| V07-0033 | home | 1b W15 | V07 §1b W15 |
| V07-0034 | home | 1b W16 | V07 §1b W16 |
| V07-0035 | home | 1b W17 | V07 §1b W17 |
| V07-0036 | home | 1b W18 | V07 §1b W18 |
| V07-0037 | home | 1b W19 | V07 §1b W19 |
| V07-0038 | home | 1b W20 | V07 §1b W20 |
| V07-0039 | home | 1b W21 | V07 §1b W21 |
| V07-0040 | home | 1b W22 | V07 §1b W22 |
| V07-0041 | home | 1b W23 | V07 §1b W23 |
| V07-0042 | home | 1b W24 | V07 §1b W24 |
| V07-0043 | home | 1b W25 | V07 §1b W25 |
| V07-0044 | home | 1b W26 | V07 §1b W26 |
| V07-0045 | home | 1b W27 | V07 §1b W27 |
| V07-0046 | home | 1b W28 | V07 §1b W28 |
| V07-0047 | home | 1b W29 | V07 §1b W29 |
| V07-0048 | home | 1b W30 | V07 §1b W30 |
| V07-0049 | home | 1b W31 | V07 §1b W31 |
| V07-0050 | home | 1b W32 | V07 §1b W32 |
| V07-0051 | home | 1b W33 | V07 §1b W33 |
| V07-0052 | home | 1b W34 | V07 §1b W34 |
| V07-0053 | home | 1b W35 | V07 §1b W35 |
| V07-0054 | home | 1b W36 | V07 §1b W36 |
| V07-0055 | home | 1b W37 | V07 §1b W37 |
| V07-0056 | home | 1b W38 | V07 §1b W38 |
| V07-0057 | home | 1b W39 | V07 §1b W39 |
| V07-0058 | home | 1b W40 | deleted (NARR-5); its clause (no village split switch; item 105 (h) with V11 §3.7.4's splitEnabled) lives at V07 §2.1 |
| V07-0059 | home | 1b W41 | V07 §1b W41 |
| V07-0060 | home | 1b W42 | V07 §1b W42 |
| V07-0061 | home | 1b W43 | V07 §1b W43 |
| V07-0062 | home | 1b W44 | V07 §1b W44 |
| V07-0063 | home | 1b W45 | V07 §1b W45 |
| V07-0064 | home | 1b W46 | V07 §1b W46 |
| V07-0065 | home | 1b W47 | V07 §1b W47 |
| V07-0066 | home | 1b W48 | V07 §1b W48 |
| V07-0067 | home | 1b W49 | V07 §1b W49 |
| V07-0068 | home | 1b W50 | V07 §1b W50 |
| V07-0069 | home | 1b W51 | V07 §1b W51 |
| V07-0070 | home | 1b W52 | V07 §1b W52 |
| V07-0071 | home | 1b W53 | V07 §1b W53 |
| V07-0072 | home | 1b W54 | V07 §1b W54 |
| V07-0073 | home | 1b W55 | V07 §1b W55 |
| V07-0074 | home | 1b W56 | V07 §1b W56 |
| V07-0075 | home | 1b W57 | V07 §1b W57 |
| V07-0076 | home | 1b W58 | V07 §1b W58 |
| V07-0077 | home | 1b W59 | V07 §1b W59 |
| V07-0078 | home | 1b W60 | V07 §1b W60 |
| V07-0079 | home | 1b W61 | V07 §1b W61 |
| V07-0080 | home | 1b W62 | V07 §1b W62 |
| V07-0081 | home | 1b W63 | V07 §1b W63 |
| V07-0082 | home | 1b W64 | V07 §1b W64 |
| V07-0083 | home | 1b W65 | V07 §1b W65 |
| V07-0084 | home | 1b W66 | V07 §1b W66 |
| V07-0085 | home | 1b W67 | V07 §1b W67 |
| V07-0086 | home | 1b W68 | V07 §1b W68 |
| V07-0087 | home | 1b W69 | V07 §1b W69 |
| V07-0088 | home | 1b W70 | V07 §1b W70 |
| V07-0089 | home | 1b W71 | V07 §1b W71 |
| V07-0090 | home | 1b W72 | V07 §1b W72 |
| V07-0091 | home | 1b W73 | V07 §1b W73 |
| V07-0092 | home | 1b dossier trace | V07 §1b *The dossier facts … traced* |
| V07-0093 | home | 2 | V07 §2 |
| V07-0094 | home | 2.1 | V07 §2.1 |
| V07-0095 | home | 2.1 | V07 §2.1 |
| V07-0096 | reference-owner-rule | 2.1 | V07 §2.1 (REFERENCE to owner item 105 (h); V11 §3.7.4) |
| V07-0097 | home | 2.1 | V07 §2.1 |
| V07-0098 | home | 2.1 | V07 §2.1 |
| V07-0099 | home | 2.1 | V07 §2.1 |
| V07-0100 | reference | 2.1 | V07 §2.1 `ProductDecl` (kept: file f item 202 names V07 §2.1 its home; §4.12 and §14 cite it) |
| V07-0101 | reference | 2.1 | V07 §2.1 — the routing sentence cites §1.1 / file f item 202 |
| V07-0102 | home | 2.1 | V07 §2.1 |
| V07-0103 | home | 2.2 | V07 §2.2 |
| V07-0104 | home | 2.2 | V07 §2.2 |
| V07-0105 | home | 2.2 | V07 §2.2 |
| V07-0106 | home | 2.2 | V07 §2.2 |
| V07-0107 | home | 2.2 | V07 §2.2 default rows (territory per head now derived, E-38) |
| V07-0108 | home | 2.2 | V07 §2.2 |
| V07-0109 | home | 2.2 | V07 §2.2 |
| V07-0110 | home | 2.2 | V07 §2.2 |
| V07-0111 | home | 2.2 | V07 §2.2 `epoch.rows` (church-family members cited from V11 §3.5.1, RESTATE-2) |
| V07-0112 | home | 2.2 | V07 §2.2 |
| V07-0113 | home | 2.2a | V07 §2.2a |
| V07-0114 | home | 2.2a | V07 §2.2a |
| V07-0115 | home | 2.2a | V07 §2.2a |
| V07-0116 | home | 2.2a | V07 §2.2a |
| V07-0117 | home | 2.2a | V07 §2.2a |
| V07-0118 | home | 2.2a | V07 §2.2a |
| V07-0119 | home | 2.2a | V07 §2.2a |
| V07-0120 | reference | 2.2a | V07 §2.2a *The reference trace* — rows D5/P17 cited alone (FL-1) |
| V07-0121 | home | 2.3 | V07 §2.3 |
| V07-0122 | home | 2.3 | V07 §2.3 |
| V07-0123 | reference | 2.3 | V07 §2.3 *Base records read with village values* — REFERENCE (§2.5, §2.7 cited) |
| V07-0124 | home | 2.3 | V07 §2.3 |
| V07-0125 | home | 2.3 | V07 §2.3 |
| V07-0126 | home | 2.3 | V07 §2.3 |
| V07-0127 | home | 2.4 | V07 §2.4 |
| V07-0128 | home | 2.4 | V07 §2.4 |
| V07-0129 | home | 2.4 | V07 §2.4 |
| V07-0130 | home | 2.4 | V07 §2.4 |
| V07-0131 | home | 2.4 | V07 §2.4 |
| V07-0132 | home | 2.4 | V07 §2.4 |
| V07-0133 | home | 2.4 | V07 §2.4 |
| V07-0134 | home | 2.4 | V07 §2.4 |
| V07-0135 | home | 2.4 | V07 §2.4 |
| V07-0136 | home | 2.4 | V07 §2.4 |
| V07-0137 | home | 2.4 | V07 §2.4 |
| V07-0138 | home | 2.4 | V07 §2.4 |
| V07-0139 | home | 2.4 | V07 §2.4 |
| V07-0140 | home | 2.4 | V07 §2.4 |
| V07-0141 | home | 2.4 | V07 §2.4 |
| V07-0142 | home | 2.4 | V07 §2.4 |
| V07-0143 | home | 2.4 | V07 §2.4 |
| V07-0144 | home | 2.4 | V07 §2.4 |
| V07-0145 | home | 2.4 | V07 §2.4 |
| V07-0146 | home | 2.4 | V07 §2.4 |
| V07-0147 | home | 2.4 | V07 §2.4 |
| V07-0148 | home | 2.4 | V07 §2.4 |
| V07-0149 | home | 2.4 | V07 §2.4 |
| V07-0150 | home | 2.4 | V07 §2.4 |
| V07-0151 | home | 2.4 | V07 §2.4 |
| V07-0152 | home | 2.4 | V07 §2.4 |
| V07-0153 | home | 2.4 | V07 §2.4 |
| V07-0154 | home | 2.5 | V07 §2.5 |
| V07-0155 | home | 2.5 | V07 §2.5 |
| V07-0156 | home | 2.6 | V07 §2.6 |
| V07-0157 | home | 2.6 | V07 §2.6 |
| V07-0158 | home | 2.6 | V07 §2.6 |
| V07-0159 | home | 2.6 | V07 §2.6 |
| V07-0160 | home | 2.6 | V07 §2.6 |
| V07-0161 | home | 2.6 | V07 §2.6 |
| V07-0162 | home | 2.6 | V07 §2.6 |
| V07-0163 | home | 2.6 | V07 §2.6 |
| V07-0164 | home | 2.7 | V07 §2.7 |
| V07-0165 | home | 2.7 | V07 §2.7 |
| V07-0166 | home | 2.7 | V07 §2.7 |
| V07-0167 | home | 2.7 | V07 §2.7 |
| V07-0168 | reference | 2.7 | V07 §2.7 — `villageForm` cited as file f items 430/432 (§10.2) |
| V07-0169 | home | 3.0 | V07 §3.0 |
| V07-0170 | home | 3.0 | V07 §3.0 |
| V07-0171 | home | 3.0 | V07 §3.0 |
| V07-0172 | home | 3.0 | V07 §3.0 |
| V07-0173 | home | 3.0 | V07 §3.0 |
| V07-0174 | home | 3.0 | V07 §3.0 |
| V07-0175 | glossary | 3.1 | V07 §3.1 *Named draw shapes* (glossary: u, B3, F4, S) |
| V07-0176 | home | 3.1 | V07 §3.1 |
| V07-0177 | home | 3.1 | V07 §3.1 |
| V07-0178 | home | 3.2 (1) | V07 §3.2 (1) |
| V07-0179 | home | 3.2 (2) | V07 §3.2 (2) |
| V07-0180 | home | 3.2 (2) | V07 §3.2 (2) |
| V07-0181 | home | 3.2 (3) | V07 §3.2 (3) |
| V07-0182 | home | 3.2 (3) | V07 §3.2 (3) |
| V07-0183 | home | 3.2 (4) | V07 §3.2 (4) |
| V07-0184 | home | 3.2 (4) | V07 §3.2 (4) |
| V07-0185 | home | 3.2 (5) | V07 §3.2 (5) |
| V07-0186 | home | 3.2 (6) | V07 §3.2 (6) |
| V07-0187 | home | 3.2 (7) | V07 §3.2 (7) |
| V07-0188 | home | 3.2 (8) | V07 §3.2 (8) |
| V07-0189 | home | 3.3 | V07 §3.3 |
| V07-0190 | home | 3.3 | V07 §3.3 |
| V07-0191 | home | 3.4 | V07 §3.4 |
| V07-0192 | home | 3.4 | V07 §3.4 |
| V07-0193 | home | 3.4 | V07 §3.4 |
| V07-0194 | home | 3.4 | V07 §3.4 |
| V07-0195 | home | 3.5 | V07 §3.5 |
| V07-0196 | home | 3.5 | V07 §3.5 |
| V07-0197 | home | 3.5 | V07 §3.5 |
| V07-0198 | home | 3.5 | V07 §3.5 |
| V07-0199 | home | 3.5 | V07 §3.5 |
| V07-0200 | home | 3.5 | V07 §3.5 |
| V07-0201 | home | 3.5 | V07 §3.5 |
| V07-0202 | home | 3.5a | V07 §3.5a |
| V07-0203 | home | 3.5a (3) | V07 §3.5a (3) |
| V07-0204 | home | 3.5a (4)-(6) | V07 §3.5a (4)-(6) |
| V07-0205 | home | 3.5a (7)-(9) | V07 §3.5a (7)-(9) |
| V07-0206 | home | 3.5a (10)-(11) | V07 §3.5a (10)-(11) |
| V07-0207 | home | 3.6 | V07 §3.6 |
| V07-0208 | home | 3.6 (4) | V07 §3.6 (4) |
| V07-0209 | home | 3.6 (4a) | V07 §3.6 (4a) |
| V07-0210 | home | 3.6 (4b) | V07 §3.6 (4b) |
| V07-0211 | home | 3.6 (5)-(7) | V07 §3.6 (5)-(7) |
| V07-0212 | home | 3.7 | V07 §3.7 |
| V07-0213 | home | 3.8 | V07 §3.8 |
| V07-0214 | home | 3.8 | V07 §3.8 |
| V07-0215 | home | 3.8 | V07 §3.8 |
| V07-0216 | home | 3.8 | V07 §3.8 |
| V07-0217 | home | 3.8 | V07 §3.8 |
| V07-0218 | home | 3.8 | V07 §3.8 |
| V07-0219 | home | 3.8 | V07 §3.8 |
| V07-0220 | home | 3.8a (1)-(2) | V07 §3.8a (1)-(2) |
| V07-0221 | home | 3.8a (3)-(9) | V07 §3.8a (3)-(9) |
| V07-0222 | home | 3.9 (1) | V07 §3.9 (1) — farm rows are the calibratable cells; `a_head` derived (E-38) |
| V07-0223 | home | 3.9 (2) | V07 §3.9 (2) |
| V07-0224 | home | 3.9 (3) | V07 §3.9 (3) |
| V07-0225 | home | 3.9 (4)-(6) | V07 §3.9 (4)-(6) |
| V07-0226 | home | 3.10 | V07 §3.10 |
| V07-0227 | home | 3.10 | V07 §3.10 |
| V07-0228 | home | 3.10 | V07 §3.10 |
| V07-0229 | home | 3.10 | V07 §3.10 |
| V07-0230 | home | 3.10 | V07 §3.10 |
| V07-0231 | home | 3.10 | V07 §3.10 |
| V07-0232 | home | 3.10a | V07 §3.10a |
| V07-0233 | home | 3.11 | V07 §3.11 |
| V07-0234 | home | 3.11 | V07 §3.11 |
| V07-0235 | home | 3.11 DR1 | V07 §3.11 DR1 |
| V07-0236 | home | 3.11 DR2 | V07 §3.11 DR2 |
| V07-0237 | home | 3.11 DR3-DR6 | V07 §3.11 DR3-DR6 |
| V07-0238 | home | 3.11 DR7 | V07 §3.11 DR7 |
| V07-0239 | home | 3.11 DR9/DR24 | V07 §3.11 DR9/DR24 |
| V07-0240 | home | 3.11 burial | V07 §3.11 burial |
| V07-0241 | home | 3.11 DR11-DR19 | V07 §3.11 DR11-DR19 |
| V07-0242 | home | 3.11 landmarks | V07 §3.11 landmarks |
| V07-0243 | home | 3.11 item 108 | V07 §3.11 item 108 |
| V07-0244 | home | 3.11 chains | V07 §3.11 chains |
| V07-0245 | home | 3.11 absorb | V07 §3.11 absorb |
| V07-0246 | home | 3.11 palisade REPLACEMENT | V07 §3.11 palisade REPLACEMENT |
| V07-0247 | home | 3.12 | V07 §3.12 |
| V07-0248 | home | 3.12 siting | V07 §3.12 siting |
| V07-0249 | home | 3.12 markets | V07 §3.12 markets |
| V07-0250 | home | 3.12 markets | V07 §3.12 markets |
| V07-0251 | home | 3.12 records | V07 §3.12 records |
| V07-0252 | home | 3.12 records | V07 §3.12 records |
| V07-0253 | home | 3.12 pins | V07 §3.12 pins |
| V07-0254 | home | 3.12 decline | V07 §3.12 decline |
| V07-0255 | home | 3.12 decline | V07 §3.12 decline |
| V07-0256 | home | 3.12 hand-off up | V07 §3.12 hand-off up |
| V07-0257 | home | 3.12 hand-off down | V07 §3.12 hand-off down |
| V07-0258 | home | 3.12 item 110 and 102-108 | V07 §3.12 item 110 and 102-108 |
| V07-0259 | home | 3.13 | V07 §3.13 |
| V07-0260 | home | 3.13 | V07 §3.13 |
| V07-0261 | home | 3.14 | V07 §3.14 |
| V07-0262 | home | 3.14 | V07 §3.14 |
| V07-0263 | home | 3.14 | V07 §3.14 |
| V07-0264 | home | 3.15 | V07 §3.15 |
| V07-0265 | home | 3.15 | V07 §3.15 |
| V07-0266 | home | 3.16 (1) | V07 §3.16 (1) |
| V07-0267 | home | 3.16 (2)-(4) | V07 §3.16 (2)-(4) |
| V07-0268 | home | 3.16 (5)-(8) | V07 §3.16 (5)-(8) |
| V07-0269 | home | 4 | V07 §4 |
| V07-0270 | home | 4.1 | V07 §4.1 |
| V07-0271 | home | 4.1 | V07 §4.1 |
| V07-0272 | home | 4.1 | V07 §4.1 |
| V07-0273 | reference | 4.2 | V07 §4.2 — cites §7.1's `EditEvent` (file f item 357); only the village reading stated (RESTATE-6) |
| V07-0274 | home | 4.3 | V07 §4.3 |
| V07-0275 | home | 4.4 | V07 §4.4 |
| V07-0276 | home | 4.5 | V07 §4.5 |
| V07-0277 | home | 5.1 | V07 §5.1 |
| V07-0278 | home | 5.1 | V07 §5.1 |
| V07-0279 | home | 5.1 | V07 §5.1 |
| V07-0280 | home | 5.1 | V07 §5.1 |
| V07-0281 | home | 5.1 | V07 §5.1 |
| V07-0282 | home | 5.2 | V07 §5.2 |
| V07-0283 | home | 5.3 | V07 §5.3 |
| V07-0284 | home | 5.4 | V07 §5.4 |
| V07-0285 | home | 6 | V07 §6 |
| V07-0286 | home | 6 | V07 §6 |
| V07-0287 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0288 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0289 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0290 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0291 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0292 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0293 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0294 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0295 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0296 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0297 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0298 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0299 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0300 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0301 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0302 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0303 | home | 7 | V07 §7 (its T-V7 bar) |
| V07-0304 | home | 8 | V07 §8 |
| V07-0305 | home | 8 | V07 §8 |
| V07-0306 | home | 8 | V07 §8 |
| V07-0307 | home | 8 | V07 §8 |
| V07-0308 | home | 8 | V07 §8 |
| V07-0309 | home | 8 | V07 §8 |
| V07-0310 | home | 8 | V07 §8 |
| V07-0311 | home | 8 | V07 §8 |
| V07-0312 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0313 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0314 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0315 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0316 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0317 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0318 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0319 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0320 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0321 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0322 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0323 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0324 | home | 9 | V07 §9 (its J-V7 row) |
| V07-0325 | bcr-pointer | 10 | V07 §10 pointer rows BCR-V7-1 … -6 → items 201, 287, 267, 214, 215, 255 |
| V07-0326 | bcr-pointer | 10 | V07 §10 pointer rows BCR-V7-7 … -12 → items 314, 315, 418, 505, 202, 276 |
| V07-0327 | bcr-pointer | 10 | V07 §10 pointer rows BCR-V7-13 … -18 → items 377, 378, 344, 527, 202/528, 202/317 |
| V07-0328 | bcr-pointer | 10 | V07 §10 pointer rows BCR-V7-19 … -24 → items 357, 312, 430, 209, 495, 310 |
| V07-0329 | bcr-pointer | 10 | V07 §10 pointer rows BCR-V7-25 … -30 → items 292, 322, 565, 316, 283, 279 |
| V07-0330 | bcr-pointer | 10 | V07 §10 pointer rows BCR-V7-31 … -35 → items 424, 268, 290, 506, 290 |
| V07-0331 | bcr-pointer | 10 | V07 §10 pointer rows BCR-V7-36 … -38 → items 576, 577, 579 |
| V07-0332 | answer-J121-J122 | 11 | V07 §11 Q1 — decided (a), J122; V07 §8 slot |
| V07-0333 | home | Integration notes | V07 *Integration notes* table (IN-V07-1 … -7 folded; where each lives) |

## Appendix B — the routed edges → V07 §3.17

| edge id | status | where | class | now defined and tested |
|---|---|---|---|---|
| M-V07-833-E5-data | UNTESTED | V07 §2.3 | E5-data | V07 §3.17 row(s) for V07 §2.3 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-1235-E5-data | UNTESTED | V07 §2.7 | E5-data | V07 §3.17 row(s) for V07 §2.7 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-1281-E1-none | UNDEFINED | V07 §3.0 | E1-none | V07 §3.17 row(s) for V07 §3.0 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-1281-E4-degenerate | UNDEFINED | V07 §3.0 | E4-degenerate | V07 §3.17 row(s) for V07 §3.0 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-1354-E1-none | UNTESTED | V07 §3.1 | E1-none | V07 §3.17 row(s) for V07 §3.1 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-1354-E2-one | UNTESTED | V07 §3.1 | E2-one | V07 §3.17 row(s) for V07 §3.1 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-1354-E5-data | UNTESTED | V07 §3.1 | E5-data | V07 §3.17 row(s) for V07 §3.1 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-1354-E6-rungs | UNTESTED | V07 §3.1 | E6-rungs | V07 §3.17 row(s) for V07 §3.1 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-1354-E8-lifecycle | UNDEFINED | V07 §3.1 | E8-lifecycle | V07 §3.17 row(s) for V07 §3.1 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-1395-E4-degenerate | UNDEFINED | V07 §3.2 | E4-degenerate | V07 §3.17 row(s) for V07 §3.2 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-1395-E8-lifecycle | UNDEFINED | V07 §3.2 | E8-lifecycle | V07 §3.17 row(s) for V07 §3.2 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-1512-E3-cap | UNDEFINED | V07 §3.3 | E3-cap | V07 §3.17 row(s) for V07 §3.3 (E3); tested by T-V7-61 and the row's named bar |
| M-V07-1544-E1-none | UNTESTED | V07 §3.4 | E1-none | V07 §3.17 row(s) for V07 §3.4 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-1544-E2-one | UNTESTED | V07 §3.4 | E2-one | V07 §3.17 row(s) for V07 §3.4 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-1544-E4-degenerate | UNDEFINED | V07 §3.4 | E4-degenerate | V07 §3.17 row(s) for V07 §3.4 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-1544-E5-data | UNTESTED | V07 §3.4 | E5-data | V07 §3.17 row(s) for V07 §3.4 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-1544-E6-rungs | UNTESTED | V07 §3.4 | E6-rungs | V07 §3.17 row(s) for V07 §3.4 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-1604-E4-degenerate | UNDEFINED | V07 §3.5 | E4-degenerate | V07 §3.17 row(s) for V07 §3.5 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-1604-E8-lifecycle | UNDEFINED | V07 §3.5 | E8-lifecycle | V07 §3.17 row(s) for V07 §3.5 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-1722-E4-degenerate | UNDEFINED | V07 §3.5a | E4-degenerate | V07 §3.17 row(s) for V07 §3.5a (E4); tested by T-V7-61 and the row's named bar |
| M-V07-1807-E1-none | UNTESTED | V07 §3.6 | E1-none | V07 §3.17 row(s) for V07 §3.6 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-1807-E2-one | UNTESTED | V07 §3.6 | E2-one | V07 §3.17 row(s) for V07 §3.6 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-1807-E4-degenerate | UNDEFINED | V07 §3.6 | E4-degenerate | V07 §3.17 row(s) for V07 §3.6 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-1807-E5-data | UNTESTED | V07 §3.6 | E5-data | V07 §3.17 row(s) for V07 §3.6 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-1807-E6-rungs | UNTESTED | V07 §3.6 | E6-rungs | V07 §3.17 row(s) for V07 §3.6 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-1807-E8-lifecycle | UNDEFINED | V07 §3.6 | E8-lifecycle | V07 §3.17 row(s) for V07 §3.6 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-1869-E1-none | UNTESTED | V07 §3.7 | E1-none | V07 §3.17 row(s) for V07 §3.7 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-1869-E2-one | UNTESTED | V07 §3.7 | E2-one | V07 §3.17 row(s) for V07 §3.7 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-1869-E4-degenerate | UNDEFINED | V07 §3.7 | E4-degenerate | V07 §3.17 row(s) for V07 §3.7 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-1869-E6-rungs | UNTESTED | V07 §3.7 | E6-rungs | V07 §3.17 row(s) for V07 §3.7 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-1896-E1-none | UNTESTED | V07 §3.8 | E1-none | V07 §3.17 row(s) for V07 §3.8 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-1896-E2-one | UNTESTED | V07 §3.8 | E2-one | V07 §3.17 row(s) for V07 §3.8 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-1896-E3-cap | UNTESTED | V07 §3.8 | E3-cap | V07 §3.17 row(s) for V07 §3.8 (E3); tested by T-V7-61 and the row's named bar |
| M-V07-1896-E4-degenerate | UNTESTED | V07 §3.8 | E4-degenerate | V07 §3.17 row(s) for V07 §3.8 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-1896-E5-data | UNTESTED | V07 §3.8 | E5-data | V07 §3.17 row(s) for V07 §3.8 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-1896-E6-rungs | UNTESTED | V07 §3.8 | E6-rungs | V07 §3.17 row(s) for V07 §3.8 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-1973-E4-degenerate | UNDEFINED | V07 §3.8a | E4-degenerate | V07 §3.17 row(s) for V07 §3.8a (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2035-E4-degenerate | UNDEFINED | V07 §3.9 | E4-degenerate | V07 §3.17 row(s) for V07 §3.9 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2108-E1-none | UNTESTED | V07 §3.10 | E1-none | V07 §3.17 row(s) for V07 §3.10 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-2108-E2-one | UNTESTED | V07 §3.10 | E2-one | V07 §3.17 row(s) for V07 §3.10 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-2108-E3-cap | UNTESTED | V07 §3.10 | E3-cap | V07 §3.17 row(s) for V07 §3.10 (E3); tested by T-V7-61 and the row's named bar |
| M-V07-2108-E4-degenerate | UNDEFINED | V07 §3.10 | E4-degenerate | V07 §3.17 row(s) for V07 §3.10 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2108-E5-data | UNTESTED | V07 §3.10 | E5-data | V07 §3.17 row(s) for V07 §3.10 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-2108-E6-rungs | UNTESTED | V07 §3.10 | E6-rungs | V07 §3.17 row(s) for V07 §3.10 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-2108-E8-lifecycle | UNTESTED | V07 §3.10 | E8-lifecycle | V07 §3.17 row(s) for V07 §3.10 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-2185-E4-degenerate | UNDEFINED | V07 §3.10a | E4-degenerate | V07 §3.17 row(s) for V07 §3.10a (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2217-E4-degenerate | UNDEFINED | V07 §3.11 | E4-degenerate | V07 §3.17 row(s) for V07 §3.11 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2411-E4-degenerate | UNDEFINED | V07 §3.12 | E4-degenerate | V07 §3.17 row(s) for V07 §3.12 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2746-E1-none | UNDEFINED | V07 §3.13 | E1-none | V07 §3.17 row(s) for V07 §3.13 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-2746-E4-degenerate | UNDEFINED | V07 §3.13 | E4-degenerate | V07 §3.17 row(s) for V07 §3.13 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2746-E5-data | UNDEFINED | V07 §3.13 | E5-data | V07 §3.17 row(s) for V07 §3.13 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-2770-E1-none | UNDEFINED | V07 §3.14 | E1-none | V07 §3.17 row(s) for V07 §3.14 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-2858-E1-none | UNDEFINED | V07 §3.16 | E1-none | V07 §3.17 row(s) for V07 §3.16 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-2858-E2-one | UNDEFINED | V07 §3.16 | E2-one | V07 §3.17 row(s) for V07 §3.16 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-2858-E4-degenerate | UNDEFINED | V07 §3.16 | E4-degenerate | V07 §3.17 row(s) for V07 §3.16 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2950-E4-degenerate | UNDEFINED | V07 §4.1 | E4-degenerate | V07 §3.17 row(s) for V07 §4.1 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-2987-E2-one | UNDEFINED | V07 §4.2 | E2-one | V07 §3.17 row(s) for V07 §4.2 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-2987-E6-rungs | UNTESTED | V07 §4.2 | E6-rungs | V07 §3.17 row(s) for V07 §4.2 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-2987-E8-lifecycle | UNTESTED | V07 §4.2 | E8-lifecycle | V07 §3.17 row(s) for V07 §4.2 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-3007-E4-degenerate | UNDEFINED | V07 §4.3 | E4-degenerate | V07 §3.17 row(s) for V07 §4.3 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-3007-E6-rungs | UNTESTED | V07 §4.3 | E6-rungs | V07 §3.17 row(s) for V07 §4.3 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-3007-E8-lifecycle | UNTESTED | V07 §4.3 | E8-lifecycle | V07 §3.17 row(s) for V07 §4.3 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-3036-E1-none | UNTESTED | V07 §4.4 | E1-none | V07 §3.17 row(s) for V07 §4.4 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-3036-E2-one | UNTESTED | V07 §4.4 | E2-one | V07 §3.17 row(s) for V07 §4.4 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-3036-E4-degenerate | UNDEFINED | V07 §4.4 | E4-degenerate | V07 §3.17 row(s) for V07 §4.4 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-3036-E5-data | UNTESTED | V07 §4.4 | E5-data | V07 §3.17 row(s) for V07 §4.4 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-3036-E6-rungs | UNTESTED | V07 §4.4 | E6-rungs | V07 §3.17 row(s) for V07 §4.4 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-3036-E8-lifecycle | UNTESTED | V07 §4.4 | E8-lifecycle | V07 §3.17 row(s) for V07 §4.4 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-3052-E4-degenerate | UNDEFINED | V07 §4.5 | E4-degenerate | V07 §3.17 row(s) for V07 §4.5 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-3052-E5-data | UNDEFINED | V07 §4.5 | E5-data | V07 §3.17 row(s) for V07 §4.5 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-3052-E6-rungs | UNTESTED | V07 §4.5 | E6-rungs | V07 §3.17 row(s) for V07 §4.5 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-3052-E8-lifecycle | UNDEFINED | V07 §4.5 | E8-lifecycle | V07 §3.17 row(s) for V07 §4.5 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-3084-E1-none | UNDEFINED | V07 §5.1 | E1-none | V07 §3.17 row(s) for V07 §5.1 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-3084-E4-degenerate | UNDEFINED | V07 §5.1 | E4-degenerate | V07 §3.17 row(s) for V07 §5.1 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-3084-E8-lifecycle | UNDEFINED | V07 §5.1 | E8-lifecycle | V07 §3.17 row(s) for V07 §5.1 (E8); tested by T-V7-61 and the row's named bar |
| M-V07-3179-E6-rungs | UNTESTED | V07 §5.2 | E6-rungs | V07 §3.17 row(s) for V07 §5.2 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-3189-E5-data | UNTESTED | V07 §5.3 | E5-data | V07 §3.17 row(s) for V07 §5.3 (E5); tested by T-V7-61 and the row's named bar |
| M-V07-3189-E6-rungs | UNTESTED | V07 §5.3 | E6-rungs | V07 §3.17 row(s) for V07 §5.3 (E6); tested by T-V7-61 and the row's named bar |
| M-V07-3207-E1-none | UNDEFINED | V07 §5.4 | E1-none | V07 §3.17 row(s) for V07 §5.4 (E1); tested by T-V7-61 and the row's named bar |
| M-V07-3207-E2-one | UNTESTED | V07 §5.4 | E2-one | V07 §3.17 row(s) for V07 §5.4 (E2); tested by T-V7-61 and the row's named bar |
| M-V07-3207-E4-degenerate | UNDEFINED | V07 §5.4 | E4-degenerate | V07 §3.17 row(s) for V07 §5.4 (E4); tested by T-V7-61 and the row's named bar |
| M-V07-3207-E6-rungs | UNTESTED | V07 §5.4 | E6-rungs | V07 §3.17 row(s) for V07 §5.4 (E6); tested by T-V7-61 and the row's named bar |
