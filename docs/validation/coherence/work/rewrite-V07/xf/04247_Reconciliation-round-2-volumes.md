## Reconciliation round 2 (volumes/reconcile-V07-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V07-r2; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against its seventeen round-1 seam issues (`docs/volumes/critique/seam-time-r1.md`
TR-01, TR-02, TR-21; `docs/volumes/critique/seam-settlements-r1.md` SR1-01, SR1-02, SR1-04, SR1-09 – SR1-18, SR1-31): 1
blocker, 4 majors, 12 minors, all **fixed**, none invalid, none on the Fix list. Decisions J-V7.101 – J-V7.110
(vetoable). What changed, by issue:

| issue | severity | what changed (where) |
|---|---|---|
| SR1-01 | blocker | V07 §2.4's class table restated as typed rows in V11 §3.5's notation, in two tables: the class columns (family, template family with the church's plot-area and cellar overrides, `disp`/`sing` and significance, the `presence` column, powers and sectors, `deckOk` — `v.chapel` `[bridge]`, `v.landing` `[pier, quay]`, every other `[]` — and balance) and the profile deltas with the authored rows (the village signature pairs as `RelationRule`s; "the heart" as `nearCentre`); the word translation (J-V7.102); the presence reading and its `PresenceWhen` conditions; forced seats; the supply table's cells compile to `SupplyEdge`s and its balance and spacing columns moved into the class rows; BCR-V7-36 ((a) `presence`, `PLaw`, `PresenceWhen` on `BuildingClassRow`; (b) `dist.centre` at the heart and `dist.gate` at the gates or the perimeter's road crossings); `rules.presence` and `rules.longhouse` (V07 §2.2a); a lifecycle row (V07 §2.6); W18; T-V7-56 (V-M2's exit); J-V7.82 amended (a `templateFamily` for the budget rows), J-V7.101, J-V7.102, J-V7.108; V07 §1's dependency (3). |
| TR-01 | major | V07 §2.1: the product and rung of the fold choose an epoch's phases; V07 §3.12's *Which path runs*; BCR-V7-18's mechanism "by the product the epoch's fold gives (BCR-V7-26; file f item 322)", noting file f item 317's absorption into BCR-V6-1; J-V7.3 amended; J-V7.109. |
| TR-02 | major | `VillageRungRow.epoch` = `encroachShareMax`, `newNucleusShare` and `rows: ProductEpochRows` (V06 §2.1): persistence keyed by class id (the nine `church-family` classes × 0.3; `v.manor_house`, `manor`, `tower_house` × 0.5), street (eight land classes; `retireWay`, again `effaceWay`, reopen `reopenWay`), hinterland (slack 0.2, `perimeterPoorest`, `greatFieldPerEpoch`); V07 §2.2's rows; `ProductDecl.rows`'s comment; V07 §3.12's persistence, way and land-use citations; J-V7.109. |
| SR1-02 | major | V07 §3.11 step 1: `@absent` at a village rung through each class's village form — `@absent:church` zeroes `v.parish_church`, and with it `v.parsonage` and `v.tithe_barn`; the chapel of ease's entry stands; W56 and V07 §1b's trace gain `access_to_parish_church`; T-V7-13 and T-V7-42's clauses; J-V7.103. |
| SR1-04 | major | V07 §3.0's VS1 row, V07 §3.2 (4) and W42 read the latitude in force by V08 §2.5's rule (`CircumstanceSlice.port.latitudeDeg`, else `Intent.latitudeDeg`, else 50) as recorded inputs; `site.latitude` removed; J-V7.110. |
| TR-21 | minor | (a) `ProductDecl.participants`: `village.plan` at `afterField`, order 10, and `village.density` at `afterField`, order 20 (V06 §3.2), echoed in V07 §3.12; (b) V07 §1's dependency (1) and FL-2 read "V04 §3.5.1 (3)'s counted classes include `v.parish_church` (V11 §3.23.8)". |
| SR1-09 | minor | W1, W30 and V-M2 read "the port's consultation of `LadderRouter` (V08 §3.10; file f item 202)"; BCR-V7-17's title follows. |
| SR1-10 | minor | V07 §2.4's stepped-massing paragraph: the chance is V11 §3.24.3's row's (no rung column; no row for the European cultures, so 0); the one village cell is `tiers.capPerSettlement`; V07 §1's dependency (7) names the `deckOk` cells; J-V7.94. |
| SR1-11 | minor | IN-V07-2 gains the note that its `villageCap` clause is superseded by round 1's SS-31. The same note on `_integrate.md` J-VI.16 is the integration lane's (not edited here). |
| SR1-12 | minor | V07 §1's hook paragraph cites V11 §3.24.1's TOWN `terrace` row without its numbers; V07 §3.16 (1), (3), (4) cite V11 §3.23.1, V11 §3.23.2 and V11 §3.23.7 (and file g item 109 (a) as V11 registers it) for the mine boost and cap, the ruin chances, `DigRule.reachM`, the opening chances and `breachM`, and V11 §3.23.1's mining rule for the ore test; T-V7-44's scan covers V07 §1. |
| SR1-13 | minor | T-V7-42: "(176 at the pinned line: 97 kinds of tiers T, H and V and 85 of W, six in both)". |
| SR1-14 | minor | V07 §3.11 DR11 and V07 §2.4's presence cells: a dossier government's `villageSeat` class (or an `@seat` record's) is forced present with one member at every village rung; T-V7-13 and T-V7-56's seat clauses; J-V7.104. |
| SR1-15 | minor | V07 §3.11's burial paragraph reads `parish_burial_grounds` as V11 §3.12's COUNT over the standing churches' `churchyard` parts, none enlarged, an edge `cemetery` only without a church; W56 and the trace; T-V7-45; J-V7.107. |
| SR1-16 | minor | `rules.ladders.ranges` keyed by step type (`COUNT`, `GUILD`, `QUARTER`, `SIZE`) with the qualifier as label; V07 §2.4's range table and prose; J-V7.105. V08 §3.5.1 (b) (l. 1495) and V11 §3.12 (l. 2157) still read "for its qualifier and member class": the one-word companion is left to their open rounds by lane note. |
| SR1-17 | minor | V07 §2.4's namespace sentence: "a town class that has a village form reaches a village rung only through it; every other class plays itself once a dossier names it (V07 §3.11 step 3)". |
| SR1-18 | minor | V07 §3.11 step 4's fallback keys on V11 §3.13.2's keyword families (`food-works` or `lodging` for a drink, `food` with `mill`, `port`, `timber-yard`, `industry` with `kiln`); J-V7.106. |
| SR1-31 | minor | BCR-V7-37 on PART III's *Placement and designation (items 16–19)*: the solver's rows gain the village classes as their own `v.` keys. |

Also in this round: V07 §1's dependency (9) lists the round-2 companions other volumes own (V06 TR-03; V11 SR1-03, SR1-07,
SR1-08; V02 SR1-05; V03 SR1-06; V04 SR1-24; V08 SR1-16's wording, SR1-27) with their fallbacks — at this round's close V06,
V02, V03 and V04 had landed theirs and V11's and V08's rounds were open with SR1-03, SR1-07, SR1-08 and SR1-27 written (V06's
`street` row names `again` and `reopen` exactly as V07 §2.2 fills them); V07 §10's quotes re-checked (receipt
`scratchpad/volumes/rcV7r2/quotes.out`); V07 §12 records the reads; V07 §13 gains FL-4, an observation outside the seventeen (the
volume's remaining critique-id citations). Checks: every table's column count by script; every `v.` id used is one of the
25 rows; doc_checks against the pre-round copy — C1, C2, S1 0; C4 the same two hits as before the round, at shifted lines; S2
no new pointer target; 20 new unreviewed C3 runs (376 against 356), all number runs from section and table numbers or generic phrases (none from the
reference corpus's content).


