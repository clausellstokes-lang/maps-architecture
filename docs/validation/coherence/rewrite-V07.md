# Rewrite — design volume V07 (the village product)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V07; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V07`, started 2026-09-30 15:47 in the cloud, paused 16:26, resumed 19:15)
- P1 inputs gathered (canon unit V07; routing in work/rewrite-V07/routing.md, unit.json, f-items.md, handoffs*.md, edges-v07.md; src/transformed.md is the volume with G-cite applied mechanically): done
- P2 head, §0, §1: done (parts/00-head-s0-s1.md; one marker line; the citation form and symbols note; §1's dependencies (1)–(14) as current facts at their homes)
- P3 §1b: done (parts/01-s1b.md; W40 deleted; W74 WhyProvider, W75 item 111, W76 item 113 added; W70 cites V07 §3.12)
- P4 §2: done (parts/02-s2-1to3.md, 03-s2-4.md, 04-s2-5to7.md; E-38 haPerHead derived; WGAP-1 cells added; WGAP-2 bandWeight wired, slack/emptyDensity removed; E-30 reference cells cited at §7.6; D5.n sub-keys → row D5; item 115's manor row)
- P5 §3.0–§3.8a: done (parts/05-s3-0to3.md, 06-s3-4to8a.md; g 111 (arid water, oasis, water pull, climate cell), g 114 palisade patches (V07 §3.4 (8)), g 115 ceiling (V07 §3.8), E-31 toll bridge cited at V08 §2.6b (3), XCONF-2 country span)
- NEW (coordinator 2026-09-30): g items 114–116 routed to V07 (canon.md dated ruling): 114 palisade patch rows and decay under V06 §3.7; 115 the village class mix under the ceiling; 116 §5.2's township view = the zoom-out limit's view less its margin
- P6 §3.9–§3.11: done (parts/07-s3-9to11.md; E-38 home V07 §3.9 (1); ICONF-3 ends gloss; DUP-2 values cited to §2.2a; mapping tables by row-set names)
- P7 §3.12–§3.16 and the edges section: §3.12 and new §3.12a done (parts/08-s3-12.md; DUP-1 one home for the records placement; ICONF-4 (9v); RESTATE-4; g 113 village part; g 114/115 over epochs); §3.13–§3.16 and the new §3.17 edges done (parts/09-s3-13to17.md; 22 mechanism rows over the 82 routed edges, 14 combination rows; T-V7-60)
- P8 §4–§6: done (parts/10-s4.md, 11-s5-s6.md; W-IF-02 WhyProvider in §4.5; DEFER-2 item-110 roles at §8.2; TX-04 priced in §6; g 116 §5.2; g 117 (f2) and 118 in §5.1)
- NEW (coordinator 2026-09-30, later): g items 117 (seasons, with (f2) autumn) and 118 (festivals) routed to V07; W77–W81 added
- P9 §7: done (parts/12-s7.md; T-V7-1 – T-V7-57 kept, seam ids dropped; T-V7-58 item 111, -59 item 113, -60 the edge suite, -61 the WhyProvider, -62 item 114, -63 item 115, -64 item 116, -65 item 117, -66 item 118)
- P10 §8–§13, Integration notes: done (parts/13-s8.md; J122 slot in §8; price 29.75–41.75 pw (V-M3 9–13.5, the sum of the item parts); J-V7.134 – J-V7.143 added; E-24 marks on superseded decisions; §10 pointer table to items and base homes; Q1 decided (a), J122; §13 closed)
- P11 assemble, checks (ids, references, terms, sizes): done (new/volumes/V07-village.md assembled from parts 00–13; seam and canon ids swept; tool words, retired terms, citation forms, self-references checked; T-V7-1 – T-V7-66, J-V7.1 – J-V7.143, W1 – W81 less W40 unique and resolving; every Vnn § and bare § resolves; doc_checks provisional)
- P12 report body, mapping table, result file, LANDED: done (this file §1–§13; results/coherence_rewrite-V07.json; LANDED line)

Source: `docs/volumes/V07-village.md`. Output: `docs/validation/coherence/new/volumes/V07-village.md`. Working parts:
`docs/validation/coherence/work/rewrite-V07/parts/` (concatenated in order).

## 1 Sizes

| | words (whitespace-split, the canon's count) | bytes | KB (÷ 1 024) | lines |
|---|---|---|---|---|
| before — `docs/volumes/V07-village.md` | 104 422 | 648 060 | 632.9 | 4 520 |
| after — `docs/validation/coherence/new/volumes/V07-village.md` | 92 648 | 561 232 | 548.1 | 3 809 |
| change | −11 774 (−11.3 %) | −86 828 (−13.4 %) | −84.8 | −711 |

**Below the band (25–40 %), and what holds it.** The net figure hides two movements. About 10 600 words are NEW DESIGN at build depth that this seat had to add: the village parts of g items 111 and 113–118 (§3.12a ≈ 1 200 words; §3.4 (8) item 114; §3.8's ceiling and §2.4's manor row item 115; §5.2 item 116; §5.1's season, autumn and festival bullets items 117/118; item 111 in §3.1–§3.3; their wiring rows W75–W81, tests T-V7-58/59/62–66, decisions J-V7.134–138/141/142, §6 costs and §8 prices) and the principle-(11) work (§3.17's edges section ≈ 2 300 words, T-V7-60, J-V7.143), plus the village `WhyProvider` (§4.5, W74, T-V7-61, J-V7.140) and J-V7.139. The words removed, about 22 400 gross, came only from the four allowed sources (estimated from each section's before/after counts):

| source | ≈ words | ≈ share | where |
|---|---|---|---|
| NARRATION | 15 500 | 69 % | the stacked banners and eight lane ledgers (lines 2–178); the reconciliation-round and finalization appendix (lines 4210–4520, 8 875 words); §12's per-lane reading records (3 047 → 653); §13's history (808 → ≈ 150); §10's preamble and receipts; §1 (8)–(13)'s landing history; the decision rows' superseded values (NARR-7); every critique and seam id used as a reference |
| RESTATEMENT | 5 300 | 24 % | §10's full request texts replaced by the pointer table (5 627 → 651); `ProductDecl`'s routing, `LadderRouter`'s route, the `villageForm` column, the `declareEnd` / `walk` forms, the church-family list, V06's street rate, the base hooks index — each now cited at its home |
| DUPLICATED MECHANISMS | 900 | 4 % | the records placement written four times → one home (V07 §3.12; DUP-1); the factor and decoration rows written twice → V07 §2.2a (DUP-2); the reference cell → §7.6 (E-30); the toll-bridge rule → V08 §2.6b (3) (E-31); `haPerHead` → derived (E-38) |
| VERBOSE PROSE | 700 | 3 % | the same content in fewer words (§0, §1, §3.5a, §3.16, §5.1) |

The volume's content is otherwise almost wholly its own homes (309 of 333 inventory facts are STATE facts of V07), so little restatement was available to cut; no rule, case, value, bar, record field, lifecycle row, test or reasoned decision was dropped or thinned.

## 2 The f and g items applied

**File f items this volume cites as base text** (never restated; V07 §10's pointer table): 201, 202, 209, 214, 215, 244, 245, 255, 267, 268, 276, 279, 283, 287, 290, 292, 310, 312, 314, 315, 316, 317, 322, 326, 344, 357, 377, 378, 413, 418, 424, 430, 431, 432, 436, 495, 505, 506, 516, 527, 528, 565, 568, 576, 577, 579 (and, where read, 270 — the explainer registry, 291 — the retaining member, 575 — the wall's condition profile). Item 202's applied text names V07 §2.1 as `ProductDecl`'s type home; the rewritten base (§4.12) cites it there.

**G items at build depth (new design, the village's part):**

| item | where it now lives in V07 | wiring | test | decision |
|---|---|---|---|---|
| 111 water in dry country | §3.1 (1) (arid re-weighting, the oasis village via `oasis_water`, DR40), §3.2 (4) (the climate cell on the sun readings), §3.3 (`wp(x) = w_water · pw(x)`, `s(x) = sunTerm · c_sun · (D(x) − D̄)`), §3.10 (the wells' arid coverage) | W75 | T-V7-58 (T111-1 – T111-5's village clauses; the no-op clause at temperate weights) | J-V7.134 |
| 113 history at generation (village part) | §3.12a (a village over a former town; refounding by four draw-free reuse rules; the `refound.*` cells in §2.2a); §3.12 over epochs | W76 | T-V7-59 (the village halves of T113-1, T113-3) | J-V7.138 |
| 114 walls decay into gaps and patchwork | §3.4 (8) (run condition and material on `Enceinte.condition`, the village kinds' patch rows, V06 §3.7's need and means, §7.7's generation row), §3.12 (epochs), §4.1/§4.4 (`repairWall`'s material), §5.1 (the looks) | W77 | T-V7-62 | J-V7.135 |
| 115 small settlements are not grand | §2.4 (the manor row's presence law: 0 at THORP and HAMLET, `gov seigneurial` at VILLAGE), §3.8 (the grandeur ceiling by rung; "specified" defined; wealth moves only along capped rows; the manor count never rises with wealth), §3.11 DR6, DR11 | W78 | T-V7-63 | J-V7.136 |
| 116 the zoom-out limit | §5.2 (the township view = the limit's view less its one-stop margin; the limit is §8.8's; the first view unchanged) | W79 | T-V7-64 | J-V7.137 |
| 117 seasons, with (f2) autumn | §5.1 (fields, strips, commons, green and pond through the year; the pond and millpond freeze while the mill race stays open; per-tree keyed crown colours, fallen-leaf cover on green, lanes, tofts, churchyard and roofs deepening through the leaf-fall weeks, red creepers, rust bracken on the commons, gold stubble; LOOK only) | W80 | T-V7-65 | J-V7.141 |
| 118 festival decorations | §5.1 (THORP garland or bonfire at the heart; HAMLET maypole or bonfire on the green, garlands on doors; VILLAGE maypole, bunting along the church lane, stalls and tables on the green; shown while the view's week lies inside a SettlementForge festival window, staged where its prose names, else by the festival kind's fallback; LOOK only) | W81 | T-V7-66 | J-V7.142 |

Items 111 and 113–118 are priced in V07 §8 (V-M1 + 0.25–0.5; V-M2 + 0.5–0.75; V-M3 + 2.5–4), so the product's total is 29.75–41.75 pw (was 26.5–36.5).

**J121 / J122.** V07 §11 Q1 is marked **Decided (a), J122**, with the combined order written into V07 §8 (V-M0 right after M0; V-M1 – V-M4 after M4, parallel with M5; V-M2u after M6-U's tail). The volume holds no J121 subject.

## 3 Conflicts resolved (13)

| conflict | ruling applied | where |
|---|---|---|
| DIC-06 | bare T1–T12 are item 101's tools, written with their word at first use (T8 `fill`, T9 `shape`, T10 `hold`, T11 `name`, T6 `place`'s `placeAt`); base bar groups with their number (T8-1) | throughout; the head's *How to read* |
| MC-11 | base types cited at their base declarations (`Rung` §1.1, `TableId` §7.6) | V07 §2.1 |
| V02-ICONF-1 | `composition.classFamily` (V02 §3.10.5) is the one source of the village classes' composition keys, read first | V07 §1 (3), §2.4, J-V7.82 |
| V07-ICONF-1 | `neighbourTracks` gloss "4 from about 227" (the law governs) | V07 §2.2; §12 |
| V07-ICONF-2 | the centrepiece pond is not "the village pond"; the term names only VS1's carved pond | V07 §3.6 (5), §2.4 |
| V07-ICONF-3 | the ends' cap gloss "6 from about 563" | V07 §3.10; §12 |
| V07-ICONF-4 | (9v) spaced by the polyfocal rule, the 250 m floor at epochs as at creation | V07 §3.12 (9v) |
| V07-ICONF-5 | the stale "pending" sentences left with the narration; §1 (13) states current facts | V07 §1 |
| V07-XCONF-1 | J122's slot in §8; Q1 decided | V07 §8, §11 |
| V07-XCONF-2 | the span rule's `country` reason at §2.7 (item 244; J-C4); fallback deleted | V07 §1 (5), §3.5a (7), §3.16 (1), §13 |
| CANON-C01 | as V07-XCONF-1 | V07 §8 |
| CANON-C03 | §11 is a table of decisions | V07 §11 |
| CANON-C04 | the INDEX §7 items routed here closed (TX-04, SR6-04 (b)–(c), SR6-08) | V07 §6, §1, §2.4 |

## 4 Elegance rulings applied, with their equivalence lists ticked

**E-01 — one stretch-state profile (§2.2 rule 5).** V07 states only its writers and readers: the house-platform walls' `RetainingWall.state` (written through V06's pool) and the palisade's `Enceinte.condition` (item 114's runs), both cited as "a stretch-state profile, §2.2 rule 5" (V07 §1b W57, W77; §2.3, §2.6, §3.4 (8)).
- [x] canonical form, write, read, regenerate, cut or join, undo, migrate — the base's, cited, never restated
- [x] RetainingWall keeps its values, knot role and writers (V07's platform walls through V06's pool) — V07 §2.3, §2.6
- [x] Enceinte keeps its values and lifecycle (item 114 adds `worn` and `patched` at §2.7) — V07 §3.4 (8), §3.12

**E-24 — one mark on superseded or amended decisions.** V07 §9's intro states the form; the marked rows: J-V7.4 (amended by J-V7.137), J-V7.7 (amended by V07 §3.9 (1)), J-V7.10 (amended by J-V7.55), J-V7.19 (amended by J-V7.53), J-V7.30 (superseded by J-V7.115), J-V7.34 (amended by J-V7.134), J-V7.47 (amended by J-V7.136), J-V7.82 (amended by J-V7.101), J-V7.97 (amended by V08 §2.6b (3)).
- [x] no row dropped — J-V7.1 – J-V7.143 all present (143 rows)
- [x] the governing row keeps the reason

**E-30 — the reference cell at §7.6.** V07 §2.2a cites §7.6's `{ref:{table,row,cell}}`; the definition, compile check and undo are no longer written here.
- [x] the compile check (a reference to a missing row fails the build) — §7.6, V11's compiler; cited in V07 §2.2a
- [x] `editTable`'s inverse and undo row — §7.6; cited
- [x] V07's references to V11 §3.6.1, §3.24.1 and §3.24.4 expressed in the one form — V07 §2.2a, §3.8a, §3.10a, J-V7.96

**E-31 — one toll-bridge rule at V08 §2.6b (3).** V07 §3.1 (1) and §3.11 DR1 cite the rule at its village rung; J-V7.97 marked "amended by V08 §2.6b (3)".
- [x] geometry by rung (village: the course between the two frame arcs the through road's entries divide, the topology raised to `through`) — at V08 §2.6b (3)'s village column, cited in V07 §3.1 (1) (cross-part note to V08)
- [x] coastal dry site by rung (village: an estuary) — same
- [x] failure `toll_bridge_dry` on the union of conditions (desert without `oasis_water` and no arid-drawn river; relief that cannot carry the brook; a fixed `isolated` or `none` access) — same; V07 §3.17's S0 row and T-V7-13

**E-38 — the area per head derived.** `territory.haPerHead` removed from V07 §2.2; V07 §3.9 (1) derives 2.275 ha from the farm rows when the tables load, never stored; the territory at 700 people is 19.9 km² (−1.1 %), recorded as a declared change (J-V7.7 amended; §7's golden restatement note).
- [x] the farm rows' values unchanged — V07 §3.9 (1) (the base's `FarmTable` village rows, item 314)
- [x] A_T = households × the per-head sum — V07 §3.2 (1), §3.9 (1)
- [x] V12's register: the farm rows are the calibratable cells; `haPerHead` leaves the register — V07 §8 *The register at the exits* (cross-part note to V12)

No other unification was made.

## 5 Id rulings, renumberings and new ids

- **ID-TOOL / DIC-06:** tools with their words; research mapping tables T14/T16 cited by their row-set names (V07 §3.11; V07-TERM-4).
- **ID-WX:** V07's W, FL and IN ids are its own; another volume's rows are written "V06 W75"; the IN-V07 notes folded into the body and their ids left in the validation records; `X-V12-16` and `BCR-V10-3` no longer cited bare (the latter now item 270).
- **ID-DR:** DR29 and DR35 cited by number; DR36, DR38, DR39 (item 113) and DR40 (item 111's oasis) as the determinism part numbers them; no `DR-V8.x` alias remains.
- **ID-BCR:** V07 cites no bare BCR-n; V04's span-rule request is cited as item 244.
- **G-terms:** "first paint" → first map; `D`/`D_b`/`D_v`/`D_o` for dwellings → `N` (`N_b`, `N_v = N − N_o`), `D(x)` only the daylight share; `nearbyResources[]` → `site.deposits`; `PortRungPath` → `ProductDecl`; floor vaults → no crypt, ledger slabs (V03 §3.7.4); citation form `Vnn §x.y` everywhere, self-references included; bare `§x.y` only for the base.
- **Deleted:** W40 (its one fact at V07 §2.1 and J-V7.115); `territory.haPerHead`, `network.slack`, `network.emptyDensity` cells.
- **New ids** (unique across the set, all resolving): §3.12a, §3.17; W74 – W81; T-V7-58 – T-V7-66; J-V7.134 – J-V7.143; cells `palisade.denseDialFrom`, `palisade.pullM`, `palisade.section`, `palisade.reachedCloseHa`, `formRules.organicDialFrom`, `formRules.districtDensity`, `perimeter.closeM`, `refound.traceWeight`, `refound.traceReachM`, `refound.foundationSlot`. No renumbering of an existing id.

## 6 Wiring closed

| gap | closure |
|---|---|
| W-IF-02 (V10 §3.9's owed explainers for `VillagePlan`, `VillageField`, `VillageEnd`) | V07 §4.5's village `WhyProvider` with its `info.village.*` rows (heart, form, roads, end, field, platformWall, raisedCarried, belowCity, palisadeRun, unwalled, ceiling, remnant, superseded, season, festival); W74; T-V7-61; J-V7.140 |
| W-FLD-08 (the recorded sources' readers) | V07 §2.3's `formSource`, `roadsSource`, `heartSource` read by the `WhyProvider` and T-V7-61 |
| V07-WGAP-1 (constants in prose alone) | the seven cells above added to V07 §2.2a and read by §3.1, §3.4, §3.7, §3.12; T-V7-44's scan covers them |
| V07-WGAP-2 (three cells no step read) | `density.bandWeight` wired as `q`'s weight (1 everywhere: no output moves); `network.slack` and `network.emptyDensity` removed (a reader added now would change the network); J-V7.139 |
| items 111, 113–118 | W75 – W81, each with producer, consumer and test |

## 7 Hand-offs closed (26)

| hand-off | closed at |
|---|---|
| V02 X13 (`templateFamily` on the `v.` rows, budget rows only) | V07 §2.4 (every `v.` row names its V11 §3.6.1 family), J-V7.82, J-V7.101 |
| V02 X26 (tiers only through V11's specialisations under the village cap) | V07 §2.4 (`rules.tiers.capPerSettlement`, V11 §3.24.3) |
| V06 X4 (`phases` as registered phase ids; the clamp with the village registered) | V07 §2.1 `ProductDecl.phases`; §2.1's band and fold |
| V06 X22 (hand-offs carry suppressions and carried ways; `raisedWays` lapse and repair at village rungs, never founding) | V07 §3.12 (hand-offs), §3.5a |
| V06 X27 (the fold is V07 §2.1's; `ProductEpochRows` from `epoch.rows`) | V07 §2.1, §2.2 `epoch.rows`, §3.12 |
| V06 X32 (`retireWay` / `effaceWay` / `reopenWay` on `epoch.rows.street`) | V07 §2.2, §3.12, J-V7.98 |
| V06 X34 (items 268 and 209) | V07 §10 (items 268, 431 → 209), §3.12 |
| V06 X36 (placement on a hollow-way toft only after `reopenWay`) | V07 §3.12 (6v)–(8v), house-platform rebuild |
| V06 X43 (participants' stages VS1, VS2, VS8) | V07 §2.1 `participants` |
| V08 X7 (toll-bridge births) | V07 §3.1 (1) → V08 §2.6b (3) (E-31) |
| V08 X14, X22, X23 (closed companions) | V07 §1 (8)–(13) state the current facts; §3.10's pin-record rule; item 4 (V07 §3.11) |
| V09 XV-V9-9 (`LayerSpec.showCircuit`) | V07 §3.4, §5.1 (item 413) |
| V10 CVR-V10-14 (the village words) | V07 §4.5 (`belowCity`, `platformWall`, `raisedCarried` rows) |
| V11 X-V11-2 (`walls.barriers` and `arcKind`; the village cap) | V07 §3.4 steps 1 and 5; §2.4 |
| V11 X-V11-8 (the terrace slope as a share) | V07 §3.8a (`slopeMin` read as a share) |
| V11 X-V11-14 (participants register their stages) | V07 §2.1 |
| V11 X-V11-15 (the writer of a village-read table's `presets.VG` entries) | V07 §3.15 *The preset file and its entries* (3), W67, W68 |
| V11 X-V11-17 (label and synonyms; §1 (13) landed) | V07 §2.4's label column; §1 (13); T-V7-56 |
| V12 X-V12-2 (panels as `PanelSpec`, `D5Pair`, `VG` baselines) | V07 §3.15, §7 (T-V7-23, T-V7-29), §8 V-M4 |
| V12 X-V12-11 (the village pin on V12 §3.7.8) | V07 §7 |
| V12 X-V12-14 (item 109's bars join at V-M4, `notApplicable` before) | V07 §7, §8 |
| V12 X-V12-15 (bars a register line names) | V07 names no bar in a register line — its one named entry is `rules.race.densityPower@VG` (V07 §3.15, W68) — so no bar registration is owed; V07 §8 *The register at the exits* |
| V12 X-V12-16 (the register at the exits) | V07 §8 *The register at the exits*, J-V7.124 |
| V12 X-V12-17 (the `--milestone` flag) | V07 §8 (`--milestone V-M0 – V-M4, V-M2u`) |
| FL-1 – FL-4 (the volume's own fix list) | V07 §13: row D5 cited alone; critique ids replaced by their homes; V04's items at V04 §2.2, §3.5.1, §3.1; the `country` reason at §2.7 |

## 8 Open findings closed (54 of 54)

Disposition: **FIX** (fixed in the text) unless marked. One finding is marked for the adjudicator with its reason (V07-RESTATE-1 and its restatement twin -001); none is left open.

| finding | disposition |
|---|---|
| VOL-V07-V08-RESTATEMENTS-001 | FIX in form, **marked for the adjudicator** as V07-RESTATE-1 (below) |
| VOL-V07-V08-RESTATEMENTS-002 | FIX — V07 §2.1 cites §1.1's `LadderRouter` (item 202); the route is not restated |
| VOL-V07-V08-RESTATEMENTS-003 | FIX — `epoch.rows.persistence` is keyed by the members of V11 §3.5.1's church-family tag, the list's home cited; T-V7-44 checks the agreement (V07 §2.2) |
| VOL-V07-V08-RESTATEMENTS-004 | FIX — V07 §2.7 cites §10.2's `villageForm` (items 430, 432) |
| VOL-V07-V08-RESTATEMENTS-005 | FIX — V06 §3.5.2's street rate cited without its number (V07 §3.12) |
| VOL-V07-V08-RESTATEMENTS-006 | FIX — V07 §4.2 cites §7.1's `declareEnd` and `walk` forms (item 357) |
| VOL-V07-V08-RESTATEMENTS-007 | FIX — V07 §10 is a pointer table (request → item → base home) |
| V07-RESTATE-1 | FIX in form, **marked for the adjudicator**: the canon asks `ProductDecl`'s interface to live in the base, but item 202 as applied reads "`ProductDecl` in `StrategyRegistry.products` … (V07 §2.1's type)" and the rewritten base cites it there (§4.12: "(`ProductDecl`, V07 §2.1) registers in `StrategyRegistry.products` (item 202)"; §4.11, §7.7 likewise). By principle (3)'s precedence (an f item over a base home) the type keeps its one home at V07 §2.1 and every base use cites it; V07 no longer restates the registry, the router or the call points (cited at §1.1, §4.12, §14). If the adjudicator moves the type to §4.12, V07 §2.1's block becomes a citation with no other change. |
| V07-RESTATE-2 | FIX — as -003 |
| V07-RESTATE-3 | FIX — as -007 |
| V07-RESTATE-4 | FIX — as -005 |
| V07-DUP-1 | FIX — one home: V07 §3.12 *Records at a village epoch*; W70 and `ProductDecl.records` cite it |
| V07-DUP-2 | FIX — values in V07 §2.2a; §2.4, §3.9 (3), (4)–(6) cite |
| V07-ICONF-1 – -5 | FIX — see §3 above |
| V07-XCONF-1, -2 | FIX — see §3 above |
| V07-ELEG-1 | FIX — E-30 |
| V07-ELEG-2 | FIX — E-38 |
| V07-ELEG-3 | FIX — IN-V07-3, -4, -5 folded into V07 §3.1 (1), §3.4 steps 1 and 5, §4.1, §5.1 (`walls.barriers`, `WallBarrierRow.arcKind`, `LayerSpec.showCircuit`); the notes deleted |
| V07-WGAP-1, -2 | FIX — see §6 above |
| V07-TERM-1 | FIX — one citation form: base bare `§x.y`, volumes `Vnn §x.y`, self-references included (the head's *How to read*) |
| V07-TERM-2 | FIX — `N` for dwellings, `D(x)` only the daylight share |
| V07-TERM-3 | FIX — another volume's rows written "V06 W75" (ID-WX) |
| V07-TERM-4 | FIX — tools with their words; mapping tables by row-set names |
| V07-DEFER-1 | FIX — fallbacks deleted; V04 §2.2, §3.5.1 and V06 §3.19.2 cited as current facts (V07 §1 (1), (6)) |
| V07-DEFER-2 | FIX — the item-110 roles are §8.2's names; the parenthesis dropped (V07 §5.1) |
| V07-DEFER-3 | FIX — FL-1: row D5 cited alone; FL-4: every critique and seam id replaced by the section it landed in (V07 §13) |
| V07-DEFER-4 | FIX — TX-04, SR6-04 (b)–(c) and SR6-08 closed here (below) |
| V07-NARR-1 | FIX — one marker line under the title |
| V07-NARR-2 | FIX — ledgers removed |
| V07-NARR-3 | FIX — one provenance sentence citing §17.1 (6) (the head's *Provenance*) |
| V07-NARR-4 | FIX — §1 (8)–(13) state current facts at their homes |
| V07-NARR-5 | FIX — W40 deleted; its one fact at V07 §2.1 |
| V07-NARR-6 | FIX — sentence deleted (V07 §3.5a (7)) |
| V07-NARR-7 | FIX — every decision row states its final choice; E-24's marks |
| V07-NARR-8 | FIX — §10's preamble is one sentence |
| V07-NARR-9 | FIX — the appendix removed after folding IN-V07-3/-4/-5 |
| V07-NARR-10 | FIX — §12 is one CONFIRMED and one PLAUSIBLE list, each value with its measuring milestone |
| V07-BREF-1 | FIX — `v.smithy` carries `K spread 200` in the profile table (V07 §2.4) |
| TX-04 | FIX — V07 §6 prices `village.density` at a base-product epoch (a superseded plan's raster, ≤ 6 ms) and states that V06 §6.2's participant row cites it (cross-part note to V06) |
| SR6-04 (b)–(c) | FIX — the round-6 sentences left with the §12/§13 narration (V07-ICONF-5) |
| SR6-08 | FIX — V07 §2.4 cites V11's compiler at step 5a as the one producer of the `v.` rows' `commonness`; no script named (cross-part note to V11) |
| IN-V07-1 | FIX — folded: `arableFactor` at V07 §2.7 (the former name not repeated) |
| IN-V07-2 | FIX — folded: V04's items as current facts (V07 §1 (1), §3.12, §3.16) |
| IN-V07-3 | FIX — folded: V07 §3.1 (1) (then E-31) |
| IN-V07-4 | FIX — folded: V07 §3.4, §5.1 |
| IN-V07-5 | FIX — folded: V07 §4.1 (no village tool refuses a declaration that contradicts no dossier fact and no lock; the rung gate binds generation only) |
| IN-V07-6 | FIX — validation records only (the rename note had no design content) |
| IN-V07-7 | FIX — folded: §1b's dossier trace reads `site.deposits` (V08 §2.6's digest field) → DR19 → W20 |

## 9 Edges defined (82 of 82)

Every routed edge now has a defined outcome, its failure rung and a test in V07 §3.17's mechanism table; T-V7-60 runs every row at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo, redo, regenerate and migrate. At a base rung no village stage runs (the product's stage set decides), stated once in §3.17. Fourteen combination rows (§3.17 (b)) cover the principle-(11) examples that reach a village (a village over a sealed void, a raised way over the palisade, a deck plot on a bridge over a moat — none at a village rung, a retaining wall on a cliff edge, a dossier removing a pinned edit, an epoch undone after a save) and the new items' meetings (an oasis in the palisade's reach, a patched palisade at the hand-off up, a manor specified at a HAMLET, a refounding over a ruined town wall, the zoom-out limit on a growing frame).

| edge | status | V07 §3.17 (a) row (outcome, rung, test) |
|---|---|---|
| M-V07-833-E5-data | UNTESTED → defined and tested | the records (V07 §2.3); T-V7-60 |
| M-V07-1235-E5-data | UNTESTED → defined and tested | the request block and `villageForm` (V07 §2.7); T-V7-60 |
| M-V07-1281-E1-none | UNDEFINED → defined and tested | the pipeline (V07 §3.0); T-V7-60 |
| M-V07-1281-E4-degenerate | UNDEFINED → defined and tested | the pipeline (V07 §3.0); T-V7-60 |
| M-V07-1354-E1-none | UNTESTED → defined and tested | S0's draws (V07 §3.1); T-V7-60 |
| M-V07-1354-E2-one | UNTESTED → defined and tested | S0's draws (V07 §3.1); T-V7-60 |
| M-V07-1354-E5-data | UNTESTED → defined and tested | S0's draws (V07 §3.1); T-V7-60 |
| M-V07-1354-E6-rungs | UNTESTED → defined and tested | S0's draws (V07 §3.1); T-V7-60 |
| M-V07-1354-E8-lifecycle | UNDEFINED → defined and tested | S0's draws (V07 §3.1); T-V7-60 |
| M-V07-1395-E4-degenerate | UNDEFINED → defined and tested | VS1 (V07 §3.2); T-V7-60 |
| M-V07-1395-E8-lifecycle | UNDEFINED → defined and tested | VS1 (V07 §3.2); T-V7-60 |
| M-V07-1512-E3-cap | UNDEFINED → defined and tested | VS2's density (V07 §3.3); T-V7-60 |
| M-V07-1544-E1-none | UNTESTED → defined and tested | VS3's palisade (V07 §3.4); T-V7-60 |
| M-V07-1544-E2-one | UNTESTED → defined and tested | VS3's palisade (V07 §3.4); T-V7-60 |
| M-V07-1544-E4-degenerate | UNDEFINED → defined and tested | VS3's palisade (V07 §3.4); T-V7-60 |
| M-V07-1544-E5-data | UNTESTED → defined and tested | VS3's palisade (V07 §3.4); T-V7-60 |
| M-V07-1544-E6-rungs | UNTESTED → defined and tested | VS3's palisade (V07 §3.4); T-V7-60 |
| M-V07-1604-E4-degenerate | UNDEFINED → defined and tested | VS4's network (V07 §3.5); T-V7-60 |
| M-V07-1604-E8-lifecycle | UNDEFINED → defined and tested | VS4's network (V07 §3.5); T-V7-60 |
| M-V07-1722-E4-degenerate | UNDEFINED → defined and tested | a raised way on a village map (V07 §3.5a); T-V7-60 |
| M-V07-1807-E1-none | UNTESTED → defined and tested | the open space (V07 §3.6); T-V7-60 |
| M-V07-1807-E2-one | UNTESTED → defined and tested | the open space (V07 §3.6); T-V7-60 |
| M-V07-1807-E4-degenerate | UNDEFINED → defined and tested | the open space (V07 §3.6); T-V7-60 |
| M-V07-1807-E5-data | UNTESTED → defined and tested | the open space (V07 §3.6); T-V7-60 |
| M-V07-1807-E6-rungs | UNTESTED → defined and tested | the open space (V07 §3.6); T-V7-60 |
| M-V07-1807-E8-lifecycle | UNDEFINED → defined and tested | the open space (V07 §3.6); T-V7-60 |
| M-V07-1869-E1-none | UNTESTED → defined and tested | VS5's perimeter (V07 §3.7); T-V7-60 |
| M-V07-1869-E2-one | UNTESTED → defined and tested | VS5's perimeter (V07 §3.7); T-V7-60 |
| M-V07-1869-E4-degenerate | UNDEFINED → defined and tested | VS5's perimeter (V07 §3.7); T-V7-60 |
| M-V07-1869-E6-rungs | UNTESTED → defined and tested | VS5's perimeter (V07 §3.7); T-V7-60 |
| M-V07-1896-E1-none | UNTESTED → defined and tested | VS6 and the slot race (V07 §3.8); T-V7-60 |
| M-V07-1896-E2-one | UNTESTED → defined and tested | VS6 and the slot race (V07 §3.8); T-V7-60 |
| M-V07-1896-E3-cap | UNTESTED → defined and tested | VS6 and the slot race (V07 §3.8); T-V7-60 |
| M-V07-1896-E4-degenerate | UNTESTED → defined and tested | VS6 and the slot race (V07 §3.8); T-V7-60 |
| M-V07-1896-E5-data | UNTESTED → defined and tested | VS6 and the slot race (V07 §3.8); T-V7-60 |
| M-V07-1896-E6-rungs | UNTESTED → defined and tested | VS6 and the slot race (V07 §3.8); T-V7-60 |
| M-V07-1973-E4-degenerate | UNDEFINED → defined and tested | levelling (V07 §3.8a); T-V7-60 |
| M-V07-2035-E4-degenerate | UNDEFINED → defined and tested | the hinterland (V07 §3.9); T-V7-60 |
| M-V07-2108-E1-none | UNTESTED → defined and tested | the wharf, ends and pins (V07 §3.10); T-V7-60 |
| M-V07-2108-E2-one | UNTESTED → defined and tested | the wharf, ends and pins (V07 §3.10); T-V7-60 |
| M-V07-2108-E3-cap | UNTESTED → defined and tested | the wharf, ends and pins (V07 §3.10); T-V7-60 |
| M-V07-2108-E4-degenerate | UNDEFINED → defined and tested | the wharf, ends and pins (V07 §3.10); T-V7-60 |
| M-V07-2108-E5-data | UNTESTED → defined and tested | the wharf, ends and pins (V07 §3.10); T-V7-60 |
| M-V07-2108-E6-rungs | UNTESTED → defined and tested | the wharf, ends and pins (V07 §3.10); T-V7-60 |
| M-V07-2108-E8-lifecycle | UNTESTED → defined and tested | the wharf, ends and pins (V07 §3.10); T-V7-60 |
| M-V07-2185-E4-degenerate | UNDEFINED → defined and tested | deck plots (V07 §3.10a); T-V7-60 |
| M-V07-2217-E4-degenerate | UNDEFINED → defined and tested | the dossier readings (V07 §3.11); T-V7-60 |
| M-V07-2411-E4-degenerate | UNDEFINED → defined and tested | epochs and the hand-offs (V07 §3.12, §3.12a); T-V7-60 |
| M-V07-2746-E1-none | UNDEFINED → defined and tested | the failure ladders (V07 §3.13); T-V7-60 |
| M-V07-2746-E4-degenerate | UNDEFINED → defined and tested | the failure ladders (V07 §3.13); T-V7-60 |
| M-V07-2746-E5-data | UNDEFINED → defined and tested | the failure ladders (V07 §3.13); T-V7-60 |
| M-V07-2770-E1-none | UNDEFINED → defined and tested | determinism (V07 §3.14); T-V7-60 |
| M-V07-2858-E1-none | UNDEFINED → defined and tested | the underground at village rungs (V07 §3.16); T-V7-60 |
| M-V07-2858-E2-one | UNDEFINED → defined and tested | the underground at village rungs (V07 §3.16); T-V7-60 |
| M-V07-2858-E4-degenerate | UNDEFINED → defined and tested | the underground at village rungs (V07 §3.16); T-V7-60 |
| M-V07-2950-E4-degenerate | UNDEFINED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-2987-E2-one | UNDEFINED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-2987-E6-rungs | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-2987-E8-lifecycle | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3007-E4-degenerate | UNDEFINED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3007-E6-rungs | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3007-E8-lifecycle | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3036-E1-none | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3036-E2-one | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3036-E4-degenerate | UNDEFINED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3036-E5-data | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3036-E6-rungs | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3036-E8-lifecycle | UNTESTED → defined and tested | editing (V07 §4.1–§4.4); T-V7-60 |
| M-V07-3052-E4-degenerate | UNDEFINED → defined and tested | the clerk (V07 §4.5); T-V7-60 |
| M-V07-3052-E5-data | UNDEFINED → defined and tested | the clerk (V07 §4.5); T-V7-60 |
| M-V07-3052-E6-rungs | UNTESTED → defined and tested | the clerk (V07 §4.5); T-V7-60 |
| M-V07-3052-E8-lifecycle | UNDEFINED → defined and tested | the clerk (V07 §4.5); T-V7-60 |
| M-V07-3084-E1-none | UNDEFINED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3084-E4-degenerate | UNDEFINED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3084-E8-lifecycle | UNDEFINED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3179-E6-rungs | UNTESTED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3189-E5-data | UNTESTED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3189-E6-rungs | UNTESTED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3207-E1-none | UNDEFINED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3207-E2-one | UNTESTED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3207-E4-degenerate | UNDEFINED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |
| M-V07-3207-E6-rungs | UNTESTED → defined and tested | rendering, labels, exports (V07 §5); T-V7-60 |

## 10 Judgment calls of this seat

1. **`ProductDecl`'s type stays at V07 §2.1** (V07-RESTATE-1): item 202 and the rewritten base place it there; marked for the adjudicator (§8).
2. **WGAP-2 split** (J-V7.139): `density.bandWeight` wired at its neutral value (no output moves); `network.slack` and `network.emptyDensity` deleted rather than given readers, since a reader added now would change the network (the empty-road prune reads `populated`).
3. **E-38's value change** (the territory 1.1 % smaller) is recorded as a declared change: J-V7.7 amended, the goldens restated once with the cause named (V07 §7's golden note), the register losing `haPerHead`.
4. **Item 115's "specified"** means a dossier manor or hall record, a dossier government's `villageSeat` naming the manor, or the author's placement; a specified manor keeps its design at any rung and is never refused (item 101 R2); the manor's presence law is the rung-stepped reading under the ceiling (J-V7.136).
5. **Item 116 keeps the first view** (J-V7.4's district-band framing) and moves only the township view to the zoom-out limit less its one-stop margin (J-V7.137).
6. **Items 117 and 118's fallback** until §8.2's season, festival and zoom rows land: one default season (midsummer), no decorations, the base's zoom-out range; their tests exit at the first V07 exit after the rows land (V07 §8 risk (12)).
7. **V-M3's price** is the sum of the item parts (9–13.5 pw), so the total is 29.75–41.75 pw.
8. **The `WhyProvider`** (W-IF-02) is one provider over the three village kinds answering from committed records, cited as item 270's registry (was cited by its request id BCR-V10-3).
9. **§3.17's base-rung clause**: every edge row's rungs clause is THORP–VILLAGE plus the statement that no village stage runs from TOWN to the cap (the product's stage set decides), rather than one row per base rung.
10. **The toll-bridge rule** (E-31) is cited at V08 §2.6b (3) with its village column; until the V08 rewrite writes that column, V07 §3.1 (1) states the village geometry by reference only — the column is a cross-part note, not a restatement here.

## 11 Checks run

- **Ids:** T-V7-1 – T-V7-66, J-V7.1 – J-V7.143 and W1 – W81 (less W40) each defined once; every T-V7 and J-V7 reference resolves; no bare W row of another volume.
- **References:** every `Vnn §x.y` (list continuations included) resolves to a heading or numbered paragraph of that volume; every bare `§x.y` resolves to a heading of the rewritten base (`new/base/*`), with PART III, II.n and DEFINITION §n as named.
- **Terms:** no retired glossary term remains (the only hits, "stepped", are V02's building family and the rung-stepped cells, not the way state).
- **Narration:** no critique, seam, canon or review-round id in the volume; `_integrate.md` is cited only as the J-VI rows' file.
- **Tools:** every "Tn `word`" matches item 101's binding.
- **`docs/validation/bench/doc_checks.py --doc <new volume>`** (provisional — the reference corpus is absent: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative"): C1 0, C2 0, C3 386 hits (368 unreviewed), C4 1 hit (0 unreviewed), S1 0, S2 444 (unreviewed). The original volume under the same run: C3 503 (484 unreviewed), C4 4, S1 0, S2 429. C3's hits are common English and number runs (section-number sequences, "in our own words and"); S2 counts the bare base pointers, which resolve against the base, not the volume — its rise follows the self-references now written `V07 §x.y` beside the base ones.

## 12 CROSS-PART NOTES

1. **scope §1.1** — the village rows' frame values follow E-38's derived 2.275 ha per head (at their targets THORP 1.2 → 1.1 km², HAMLET 5.8 → 5.7 km²; VILLAGE's 20 km² unchanged, 19.9 exactly); the rows cite V07 §3.9 (1).
2. **scope §16 and INDEX §4** — the village line is **29.75–41.75 pw** (V-M0 1.25–1.75, V-M1 9–11.25, V-M2 7.5–10.75, V-M2u 1–1.5, V-M3 9–13.5, V-M4 2–3), in J122's slot: V-M0 right after M0; V-M1 – V-M4 after M4, parallel with M5; V-M2u after M6-U's tail; V-M3's volume-6 clauses with M6-E.
3. **scope §13** — the take-over row reads T-V7-1 – T-V7-66 (T-V7-59 carries T113-1 and T113-3's village halves; T-V7-58 and T-V7-62 – T-V7-66 the village bars of items 111 and 114–118; T-V7-60 the edge suite).
4. **model §2.7** — `Enceinte.condition`'s value set gains item 114's `worn` and `patched` and each run's material (the rewritten model text still reads `standing|breached|dismantled`); V07 §3.4 (8) cites §2.7 and §2.2 rule 5.
5. **V08 §2.6b (3)** — the toll-bridge rule carries its village column (E-31): the course between the two frame arcs the through road's entries divide with the topology raised to `through`; an estuary on a coastal site; `toll_bridge_dry` on the union of failure conditions (desert without `oasis_water` and no arid-drawn river; relief that cannot carry the brook; a fixed `isolated` or `none` access). V07 §3.1 (1), §3.11 DR1 and J-V7.97 cite it.
6. **determinism §7.1/§7.7** — the tool binding reads `rerollLayer('forest')` under T10 `hold` and `placeAt` under T6 `place`; §7.7 carries the rows V07 reads for items 114 (readiness and wealth → generation-time condition), 117 (the calendar row) and 118 (the `traditions` row: window and staging), and DR40 (the oasis) as V07 §3.1 reads it.
7. **rendering §8.2 and §8.8** — the item-110 role names (`retaining`, `raisedWay`, `way.stair`, …), the season and festival rows and the per-map zoom-out limit are the base's; V07 §5.1 and §5.2 cite them.
8. **V11** — (a) the village kinds' patch-material rows (odd stakes, hurdles, brush; brush and turf on a bank; timber hoarding and dry-stone infill on a stone circuit); (b) the ceiling rows by rung (THORP and HAMLET: no `H`, `U`, court, tower or turret; VILLAGE: every dwelling ≤ `L` or `T` save at most one manor); (c) the season, leaf-fall and festival tables with the village rows (maypole, bunting, stalls and tables, bonfire, garlands; per-tree crown colours, leaf cover, red creepers, rust bracken, gold stubble); (d) step 5a states the `v.`-row case of `commonness` (SR6-08); (e) the village keyword staging readings for item 118; (f) the farm rows are the calibratable cells behind the derived area per head.
9. **V12** — `territory.haPerHead` leaves the register (E-38); V07's exits register with `--milestone V-M0 – V-M4, V-M2u`; V07 names no bar in a register line (its one named entry `rules.race.densityPower@VG`).
10. **V10** — the catalogue carries V07's `info.village.*` rows (heart, form, roads, end, field, platformWall, raisedCarried, belowCity, palisadeRun, unwalled, ceiling, remnant, superseded, season, festival) for the village `WhyProvider` (W74; item 270).
11. **V06** — §6.2's participant row cites V07 §6's `village.density` at a base-product epoch (≤ 6 ms p95; TX-04); §3.7's walls step writes the palisade's run conditions at village rungs (item 114; V07 §3.4 (8)); the replay engine runs V07 §3.12a's village part (item 113); §3.5.2's street rate is cited by V07 without its number.
12. **V09** — `repairWall`'s material choice at a village palisade, the season and festival view controls, and the history option on T1 `intend` (item 113) as V07 §4.1 lists them.
13. **V04** — the span rule's `country` reason stands at §2.7 (item 244; J-C4) with T-V4-62's clause; V07 §1 (5) and §3.16 (1) cite it. A buried former settlement under a village runs in maintenance mode — no V04 change beyond item 113's.
14. **V02** — `composition.classFamily` stays the one source of the village classes' composition keys (V02-ICONF-1), and V02's ceiling by rung agrees with V07 §3.8 (item 115).
15. **assemble / INDEX** — V07 §11 Q1 decided (a), J122; V07 shrinks 104 422 → 92 648 words (−11.3 %, below the band: ≈ 10 600 words of new design for items 111, 113–118, the edges and the `WhyProvider`); doc_checks provisional (C1 0, C2 0, C4 0 unreviewed, S1 0; C3 368 and S2 444 unreviewed, the corpus absent).

## 13 MAPPING TABLE — every inventory id of V07 → where it now lives

333 facts (309 STATE, 9 REFERENCE, 7 BCR pointers, 5 hand-offs, 1 owner-rule reference, 1 glossary, 1 owner answer) and the volume's 33 defined terms; 0 unmapped. Generated by `docs/validation/coherence/work/rewrite-V07/mapping.py` (also at `work/rewrite-V07/mapping.md`). A bare "V07 §x" means the fact stands at that section's same place in the new text.

| inventory id | old section | canon role | now lives |
|---|---|---|---|
| V07-0001 | 0 | home | V07 §0 |
| V07-0002 | 0 | home | V07 §0 |
| V07-0003 | 0 | home | V07 §0 |
| V07-0004 | 0 | home | V07 §0 |
| V07-0005 | 0 | home | V07 §0 |
| V07-0006 | 0 | home | V07 §0 |
| V07-0007 | 0 | home | V07 §0 |
| V07-0008 | header Reading | reference | the head's *Provenance* sentence (cites §17.1 (6), item 62; trace key row D5 / P17) |
| V07-0009 | 1 | home | V07 §1 |
| V07-0010 | 1 | home | V07 §1 |
| V07-0011 | 1 | reference | V07 §1 *Base hooks consumed* (cited, never restated) |
| V07-0012 | 1 | reference | V07 §1 *Base hooks consumed* (item 110's base side cited at §2.7, §4.7, §4.3; items 244, 245, 290, 309) |
| V07-0013 | 1 | home | V07 §1 |
| V07-0014 | 1 (1) | handoff | V07 §1 (1) as a current fact at its home (V04 §2.2, §3.5.1; V07-DEFER-1 closed, fallback removed) |
| V07-0015 | 1 (2)-(3) | handoff | V07 §1 (2)–(3) |
| V07-0016 | 1 (4)-(7) | handoff | V07 §1 (4)–(7) (V04's arch-vault source and the span rule's `country` reason at §2.7, item 244, J-C4; V07-XCONF-2, V07-DEFER-1) |
| V07-0017 | 1 (8)-(13) | handoff | V07 §1 (8)–(13) as current facts at their homes (V11, V08 §3.5.1, V06 §2.1; landing history removed, V07-NARR-4, V07-ICONF-5) |
| V07-0018 | 1 (14) | handoff | V07 §1 (14); V07 §8 risk (10) |
| V07-0019 | 1b W1 | home | V07 §1b W1 |
| V07-0020 | 1b W2 | home | V07 §1b W2 |
| V07-0021 | 1b W3 | home | V07 §1b W3 |
| V07-0022 | 1b W4 | home | V07 §1b W4 |
| V07-0023 | 1b W5 | home | V07 §1b W5 |
| V07-0024 | 1b W6 | home | V07 §1b W6 |
| V07-0025 | 1b W7 | home | V07 §1b W7 |
| V07-0026 | 1b W8 | home | V07 §1b W8 |
| V07-0027 | 1b W9 | home | V07 §1b W9 |
| V07-0028 | 1b W10 | home | V07 §1b W10 |
| V07-0029 | 1b W11 | home | V07 §1b W11 |
| V07-0030 | 1b W12 | home | V07 §1b W12 |
| V07-0031 | 1b W13 | home | V07 §1b W13 |
| V07-0032 | 1b W14 | home | V07 §1b W14 |
| V07-0033 | 1b W15 | home | V07 §1b W15 |
| V07-0034 | 1b W16 | home | V07 §1b W16 |
| V07-0035 | 1b W17 | home | V07 §1b W17 |
| V07-0036 | 1b W18 | home | V07 §1b W18 |
| V07-0037 | 1b W19 | home | V07 §1b W19 |
| V07-0038 | 1b W20 | home | V07 §1b W20 |
| V07-0039 | 1b W21 | home | V07 §1b W21 |
| V07-0040 | 1b W22 | home | V07 §1b W22 |
| V07-0041 | 1b W23 | home | V07 §1b W23 |
| V07-0042 | 1b W24 | home | V07 §1b W24 |
| V07-0043 | 1b W25 | home | V07 §1b W25 |
| V07-0044 | 1b W26 | home | V07 §1b W26 |
| V07-0045 | 1b W27 | home | V07 §1b W27 |
| V07-0046 | 1b W28 | home | V07 §1b W28 |
| V07-0047 | 1b W29 | home | V07 §1b W29 |
| V07-0048 | 1b W30 | home | V07 §1b W30 |
| V07-0049 | 1b W31 | home | V07 §1b W31 |
| V07-0050 | 1b W32 | home | V07 §1b W32 |
| V07-0051 | 1b W33 | home | V07 §1b W33 |
| V07-0052 | 1b W34 | home | V07 §1b W34 |
| V07-0053 | 1b W35 | home | V07 §1b W35 |
| V07-0054 | 1b W36 | home | V07 §1b W36 |
| V07-0055 | 1b W37 | home | V07 §1b W37 |
| V07-0056 | 1b W38 | home | V07 §1b W38 |
| V07-0057 | 1b W39 | home | V07 §1b W39 |
| V07-0058 | 1b W40 | home | row deleted (V07-NARR-5); its one fact at V07 §2.1 (item 105 (h)'s threshold at village rungs; V11 §3.7.4's one off switch) and J-V7.115 |
| V07-0059 | 1b W41 | home | V07 §1b W41 |
| V07-0060 | 1b W42 | home | V07 §1b W42 |
| V07-0061 | 1b W43 | home | V07 §1b W43 |
| V07-0062 | 1b W44 | home | V07 §1b W44 |
| V07-0063 | 1b W45 | home | V07 §1b W45 |
| V07-0064 | 1b W46 | home | V07 §1b W46 |
| V07-0065 | 1b W47 | home | V07 §1b W47 |
| V07-0066 | 1b W48 | home | V07 §1b W48 |
| V07-0067 | 1b W49 | home | V07 §1b W49 |
| V07-0068 | 1b W50 | home | V07 §1b W50 |
| V07-0069 | 1b W51 | home | V07 §1b W51 |
| V07-0070 | 1b W52 | home | V07 §1b W52 |
| V07-0071 | 1b W53 | home | V07 §1b W53 |
| V07-0072 | 1b W54 | home | V07 §1b W54 |
| V07-0073 | 1b W55 | home | V07 §1b W55 |
| V07-0074 | 1b W56 | home | V07 §1b W56 |
| V07-0075 | 1b W57 | home | V07 §1b W57 |
| V07-0076 | 1b W58 | home | V07 §1b W58 |
| V07-0077 | 1b W59 | home | V07 §1b W59 |
| V07-0078 | 1b W60 | home | V07 §1b W60 |
| V07-0079 | 1b W61 | home | V07 §1b W61 |
| V07-0080 | 1b W62 | home | V07 §1b W62 |
| V07-0081 | 1b W63 | home | V07 §1b W63 |
| V07-0082 | 1b W64 | home | V07 §1b W64 |
| V07-0083 | 1b W65 | home | V07 §1b W65 |
| V07-0084 | 1b W66 | home | V07 §1b W66 |
| V07-0085 | 1b W67 | home | V07 §1b W67 |
| V07-0086 | 1b W68 | home | V07 §1b W68 |
| V07-0087 | 1b W69 | home | V07 §1b W69 |
| V07-0088 | 1b W70 | home | V07 §1b W70 (cites V07 §3.12, the records placement's one home; V07-DUP-1) |
| V07-0089 | 1b W71 | home | V07 §1b W71 |
| V07-0090 | 1b W72 | home | V07 §1b W72 |
| V07-0091 | 1b W73 | home | V07 §1b W73 |
| V07-0092 | 1b dossier trace | home | V07 §1b (the dossier trace paragraph) |
| V07-0093 | 2 | home | V07 §2 |
| V07-0094 | 2.1 | home | V07 §2.1 |
| V07-0095 | 2.1 | home | V07 §2.1 |
| V07-0096 | 2.1 | reference-owner-rule | V07 §2.1 (item 105 (h) cited as an owner rule) |
| V07-0097 | 2.1 | home | V07 §2.1 |
| V07-0098 | 2.1 | home | V07 §2.1 |
| V07-0099 | 2.1 | home | V07 §2.1 |
| V07-0100 | 2.1 | reference | V07 §2.1 `ProductDecl` type (item 202 names V07 §2.1 as the type's home; routing, registry and call points cited at §1.1, §4.12, §14; V07-RESTATE-1) |
| V07-0101 | 2.1 | reference | V07 §2.1 cites §1.1's `LadderRouter` (D-33; item 202) — the routing no longer restated |
| V07-0102 | 2.1 | home | V07 §3.12 *Records at a village epoch* (`village.records`, the records placement's one home; type cited at V06 §2.1; V07-DUP-1) |
| V07-0103 | 2.2 | home | V07 §2.2 |
| V07-0104 | 2.2 | home | V07 §2.2 |
| V07-0105 | 2.2 | home | V07 §2.2 anchor law; the `neighbourTracks` row reads "4 from about 227" (V07-ICONF-1) |
| V07-0106 | 2.2 | home | V07 §2.2 |
| V07-0107 | 2.2 | home | V07 §2.2 default rows (`territory.haPerHead` removed: derived at V07 §3.9 (1), E-38) |
| V07-0108 | 2.2 | home | V07 §2.2 default rows (ICONF-1 gloss fixed; `network.slack`, `network.emptyDensity` removed, J-V7.139, V07-WGAP-2) |
| V07-0109 | 2.2 | home | V07 §2.2 default rows (`network.slack`, `network.emptyDensity` removed; J-V7.139) |
| V07-0110 | 2.2 | home | V07 §2.2 |
| V07-0111 | 2.2 | home | V07 §2.2 `epoch.rows` (persistence keyed by V11 §3.5.1's church-family members, checked by T-V7-44; the street rate cited at V06 §3.5.2; V07-RESTATE-2, V07-RESTATE-4) |
| V07-0112 | 2.2 | home | V07 §2.2 |
| V07-0113 | 2.2a | home | V07 §2.2a (the reference cell is §7.6's `{ref:{table,row,cell}}`, E-30; V07-ELEG-1) |
| V07-0114 | 2.2a | home | V07 §2.2a |
| V07-0115 | 2.2a | home | V07 §2.2a |
| V07-0116 | 2.2a | home | V07 §2.2a |
| V07-0117 | 2.2a | home | V07 §2.2a |
| V07-0118 | 2.2a | home | V07 §2.2a factor rows (one home; V07 §3.9 (3) cites; V07-DUP-2) |
| V07-0119 | 2.2a | home | V07 §2.2a |
| V07-0120 | 2.2a | reference | V07 §2.2a *reference trace*: row D5 of `research/findings/code-impact.md` §(d) (sub-keys dropped; FL-1) |
| V07-0121 | 2.3 | home | V07 §2.3 |
| V07-0122 | 2.3 | home | V07 §2.3 |
| V07-0123 | 2.3 | reference | V07 §2.3 (base records cited at §2.5, §2.7; items 214, 215) |
| V07-0124 | 2.3 | home | V07 §2.3 |
| V07-0125 | 2.3 | home | V07 §2.3 |
| V07-0126 | 2.3 | home | V07 §2.3 |
| V07-0127 | 2.4 | home | V07 §2.4 |
| V07-0128 | 2.4 | home | V07 §2.4 |
| V07-0129 | 2.4 | home | V07 §2.4 |
| V07-0130 | 2.4 | home | V07 §2.4 |
| V07-0131 | 2.4 | home | V07 §2.4 |
| V07-0132 | 2.4 | home | V07 §2.4 |
| V07-0133 | 2.4 | home | V07 §2.4 |
| V07-0134 | 2.4 | home | V07 §2.4 |
| V07-0135 | 2.4 | home | V07 §2.4 |
| V07-0136 | 2.4 | home | V07 §2.4 |
| V07-0137 | 2.4 | home | V07 §2.4 |
| V07-0138 | 2.4 | home | V07 §2.4 |
| V07-0139 | 2.4 | home | V07 §2.4 |
| V07-0140 | 2.4 | home | V07 §2.4 |
| V07-0141 | 2.4 | home | V07 §2.4 |
| V07-0142 | 2.4 | home | V07 §2.4 |
| V07-0143 | 2.4 | home | V07 §2.4 |
| V07-0144 | 2.4 | home | V07 §2.4 |
| V07-0145 | 2.4 | home | V07 §2.4 decorations (values at V07 §2.2a; the village pond one term, V07-ICONF-2, V07-DUP-2) |
| V07-0146 | 2.4 | home | V07 §2.4 |
| V07-0147 | 2.4 | home | V07 §2.4 |
| V07-0148 | 2.4 | home | V07 §2.4 |
| V07-0149 | 2.4 | home | V07 §2.4 |
| V07-0150 | 2.4 | home | V07 §2.4 |
| V07-0151 | 2.4 | home | V07 §2.4 |
| V07-0152 | 2.4 | home | V07 §2.4 item-108 table (`v.smithy` gains `K spread 200`; V07-BREF-1) |
| V07-0153 | 2.4 | home | V07 §2.4 |
| V07-0154 | 2.5 | home | V07 §2.5 |
| V07-0155 | 2.5 | home | V07 §2.5 |
| V07-0156 | 2.6 | home | V07 §2.6 |
| V07-0157 | 2.6 | home | V07 §2.6 |
| V07-0158 | 2.6 | home | V07 §2.6 |
| V07-0159 | 2.6 | home | V07 §2.6 |
| V07-0160 | 2.6 | home | V07 §2.6 |
| V07-0161 | 2.6 | home | V07 §2.6 |
| V07-0162 | 2.6 | home | V07 §2.6 |
| V07-0163 | 2.6 | home | V07 §2.6 |
| V07-0164 | 2.7 | home | V07 §2.7 |
| V07-0165 | 2.7 | home | V07 §2.7 |
| V07-0166 | 2.7 | home | V07 §2.7 |
| V07-0167 | 2.7 | home | V07 §2.7 |
| V07-0168 | 2.7 | reference | V07 §2.7 cites §10.2's `villageForm` (items 430, 432; VOL-V07-V08-RESTATEMENTS-004) |
| V07-0169 | 3.0 | home | V07 §3.0 |
| V07-0170 | 3.0 | home | V07 §3.0 |
| V07-0171 | 3.0 | home | V07 §3.0 |
| V07-0172 | 3.0 | home | V07 §3.0 |
| V07-0173 | 3.0 | home | V07 §3.0 |
| V07-0174 | 3.0 | home | V07 §3.0 |
| V07-0175 | 3.1 | glossary | V07 §3.1 *named draw shapes* (glossary home) |
| V07-0176 | 3.1 | home | V07 §3.1 (the dials' cells at V07 §2.2a: `formRules.organicDialFrom`, `formRules.districtDensity`; V07-WGAP-1) |
| V07-0177 | 3.1 | home | V07 §3.1 (1) cites V08 §2.6b (3)'s toll-bridge rule at its village column (E-31; IN-V07-3 folded) |
| V07-0178 | 3.2 (1) | home | V07 §3.2 (1) |
| V07-0179 | 3.2 (2) | home | V07 §3.2 (2) |
| V07-0180 | 3.2 (2) | home | V07 §3.2 (2) |
| V07-0181 | 3.2 (3) | home | V07 §3.2 (3) (dwelling count `N`, G-dwell; V07-TERM-2) |
| V07-0182 | 3.2 (3) | home | V07 §3.2 (3) |
| V07-0183 | 3.2 (4) | home | V07 §3.2 (4) (`D(x)` only the daylight share; climate cell sign; V07-TERM-2) |
| V07-0184 | 3.2 (4) | home | V07 §3.2 (4) heart (epoch nuclei spaced by the polyfocal rule at V07 §3.12 (9v); V07-ICONF-4) |
| V07-0185 | 3.2 (5) | home | V07 §3.2 (5) |
| V07-0186 | 3.2 (6) | home | V07 §3.2 (6) |
| V07-0187 | 3.2 (7) | home | V07 §3.2 (7) |
| V07-0188 | 3.2 (8) | home | V07 §3.2 (8) |
| V07-0189 | 3.3 | home | V07 §3.3 |
| V07-0190 | 3.3 | home | V07 §3.3 (`density.bandWeight` wired as `q`'s weight; J-V7.139; V07-WGAP-2) |
| V07-0191 | 3.4 | home | V07 §3.4 (cells `palisade.denseDialFrom`, `palisade.pullM`, `palisade.reachedCloseHa` at V07 §2.2a; V07-WGAP-1) |
| V07-0192 | 3.4 | home | V07 §3.4 steps 1 and 5 (`walls.barriers`, `WallBarrierRow.arcKind` named; IN-V07-4 folded; V07-ELEG-3) |
| V07-0193 | 3.4 | home | V07 §3.4 (sections from `palisade.section` at V07 §2.2a; V07-WGAP-1); condition and patches V07 §3.4 (8) (item 114) |
| V07-0194 | 3.4 | home | V07 §3.4 |
| V07-0195 | 3.5 | home | V07 §3.5 |
| V07-0196 | 3.5 | home | V07 §3.5 (no `slack` or `emptyDensity` reader; V07-WGAP-2) |
| V07-0197 | 3.5 | home | V07 §3.5 |
| V07-0198 | 3.5 | home | V07 §3.5 |
| V07-0199 | 3.5 | home | V07 §3.5 |
| V07-0200 | 3.5 | home | V07 §3.5 |
| V07-0201 | 3.5 | home | V07 §3.5 |
| V07-0202 | 3.5a | home | V07 §3.5a |
| V07-0203 | 3.5a (3) | home | V07 §3.5a (3) |
| V07-0204 | 3.5a (4)-(6) | home | V07 §3.5a (4)–(6) |
| V07-0205 | 3.5a (7)-(9) | home | V07 §3.5a (7)–(9) (the span rule's `country` reason at §2.7, item 244, J-C4; narration removed; V07-XCONF-2, V07-NARR-6) |
| V07-0206 | 3.5a (10)-(11) | home | V07 §3.5a (10)–(11) |
| V07-0207 | 3.6 | home | V07 §3.6 |
| V07-0208 | 3.6 (4) | home | V07 §3.6 (4) |
| V07-0209 | 3.6 (4a) | home | V07 §3.6 (4a) |
| V07-0210 | 3.6 (4b) | home | V07 §3.6 (4b) |
| V07-0211 | 3.6 (5)-(7) | home | V07 §3.6 (5)–(7) (the centrepiece pond is not "the village pond"; V07-ICONF-2) |
| V07-0212 | 3.7 | home | V07 §3.7 (`perimeter.closeM` cell; V07-WGAP-1) |
| V07-0213 | 3.8 | home | V07 §3.8 |
| V07-0214 | 3.8 | home | V07 §3.8 |
| V07-0215 | 3.8 | home | V07 §3.8 |
| V07-0216 | 3.8 | home | V07 §3.8 |
| V07-0217 | 3.8 | home | V07 §3.8 |
| V07-0218 | 3.8 | home | V07 §3.8 |
| V07-0219 | 3.8 | home | V07 §3.8 |
| V07-0220 | 3.8a (1)-(2) | home | V07 §3.8a (1)–(2) |
| V07-0221 | 3.8a (3)-(9) | home | V07 §3.8a (3)–(9) |
| V07-0222 | 3.9 (1) | home | V07 §3.9 (1) (the area per head derived from the farm rows, 2.275 ha, never stored; E-38; V07-ELEG-2) |
| V07-0223 | 3.9 (2) | home | V07 §3.9 (2) |
| V07-0224 | 3.9 (3) | home | V07 §3.9 (3) (factor rows cited at V07 §2.2a; V07-DUP-2) |
| V07-0225 | 3.9 (4)-(6) | home | V07 §3.9 (4)–(6) (values cited at V07 §2.2a; V07-DUP-2) |
| V07-0226 | 3.10 | home | V07 §3.10 |
| V07-0227 | 3.10 | home | V07 §3.10 ends (cap gloss "6 from about 563"; V07-ICONF-3) |
| V07-0228 | 3.10 | home | V07 §3.10 |
| V07-0229 | 3.10 | home | V07 §3.10 |
| V07-0230 | 3.10 | home | V07 §3.10 |
| V07-0231 | 3.10 | home | V07 §3.10 |
| V07-0232 | 3.10a | home | V07 §3.10a |
| V07-0233 | 3.11 | home | V07 §3.11 |
| V07-0234 | 3.11 | home | V07 §3.11 |
| V07-0235 | 3.11 DR1 | home | V07 §3.11 DR1 |
| V07-0236 | 3.11 DR2 | home | V07 §3.11 DR2 |
| V07-0237 | 3.11 DR3-DR6 | home | V07 §3.11 DR3–DR6 |
| V07-0238 | 3.11 DR7 | home | V07 §3.11 DR7 |
| V07-0239 | 3.11 DR9/DR24 | home | V07 §3.11 DR9/DR24 |
| V07-0240 | 3.11 burial | home | V07 §3.11 (*burial*) |
| V07-0241 | 3.11 DR11-DR19 | home | V07 §3.11 DR11–DR19 (mapping tables by their row-set names; V07-TERM-4) |
| V07-0242 | 3.11 landmarks | home | V07 §3.11 (*landmarks*) |
| V07-0243 | 3.11 item 108 | home | V07 §3.11 (*item 108*) |
| V07-0244 | 3.11 chains | home | V07 §3.11 (*chains*) |
| V07-0245 | 3.11 absorb | home | V07 §3.11 (*absorb*) |
| V07-0246 | 3.11 palisade REPLACEMENT | home | V07 §3.11 (*palisade REPLACEMENT*) |
| V07-0247 | 3.12 | home | V07 §3.12 |
| V07-0248 | 3.12 siting | home | V07 §3.12 *siting* (cells at V07 §2.2a; (9v) reads the polyfocal rule; V07-WGAP-1, V07-ICONF-4) |
| V07-0249 | 3.12 markets | home | V07 §3.12 (*markets*) |
| V07-0250 | 3.12 markets | home | V07 §3.12 (*markets*) |
| V07-0251 | 3.12 records | home | V07 §3.12 (*records*) |
| V07-0252 | 3.12 records | home | V07 §3.12 (*records*) |
| V07-0253 | 3.12 pins | home | V07 §3.12 (*pins*) |
| V07-0254 | 3.12 decline | home | V07 §3.12 *decline and desertion* (V06 §3.5.2's street rate cited without the number; V07-RESTATE-4) |
| V07-0255 | 3.12 decline | home | V07 §3.12 (*decline*) |
| V07-0256 | 3.12 hand-off up | home | V07 §3.12 (*hand-off up*) |
| V07-0257 | 3.12 hand-off down | home | V07 §3.12 *hand-off down* (current facts: V04 §2.2 `blockedBy 'rung'`; V07-DEFER-1) |
| V07-0258 | 3.12 item 110 and 102-108 | home | V07 §3.12 (*item 110 and 102-108*) |
| V07-0259 | 3.13 | home | V07 §3.13 |
| V07-0260 | 3.13 | home | V07 §3.13 |
| V07-0261 | 3.14 | home | V07 §3.14 |
| V07-0262 | 3.14 | home | V07 §3.14 |
| V07-0263 | 3.14 | home | V07 §3.14 |
| V07-0264 | 3.15 | home | V07 §3.15 |
| V07-0265 | 3.15 | home | V07 §3.15 |
| V07-0266 | 3.16 (1) | home | V07 §3.16 (1) (the span rule's `country` reason at §2.7; V07-XCONF-2) |
| V07-0267 | 3.16 (2)-(4) | home | V07 §3.16 (2)–(4) |
| V07-0268 | 3.16 (5)-(8) | home | V07 §3.16 (5)–(8) |
| V07-0269 | 4 | home | V07 §4 |
| V07-0270 | 4.1 | home | V07 §4.1 (tools with their words, T1 `intend` … T12 `dress`; V07-TERM-4) |
| V07-0271 | 4.1 | home | V07 §4.1 (V07-TERM-4) |
| V07-0272 | 4.1 | home | V07 §4.1 |
| V07-0273 | 4.2 | reference | V07 §4.2 cites §7.1's `declareEnd` and `walk` forms (item 357; VOL-V07-V08-RESTATEMENTS-006) |
| V07-0274 | 4.3 | home | V07 §4.3 |
| V07-0275 | 4.4 | home | V07 §4.4 |
| V07-0276 | 4.5 | home | V07 §4.5 |
| V07-0277 | 5.1 | home | V07 §5.1 |
| V07-0278 | 5.1 | home | V07 §5.1 (`LayerSpec.showCircuit` named; IN-V07-4, -5 folded; V07-ELEG-3) |
| V07-0279 | 5.1 | home | V07 §5.1 |
| V07-0280 | 5.1 | home | V07 §5.1 |
| V07-0281 | 5.1 | home | V07 §5.1 (the item-110 roles are §8.2's; V07-DEFER-2) |
| V07-0282 | 5.2 | home | V07 §5.2 |
| V07-0283 | 5.3 | home | V07 §5.3 |
| V07-0284 | 5.4 | home | V07 §5.4 |
| V07-0285 | 6 | home | V07 §6 |
| V07-0286 | 6 | home | V07 §6 |
| V07-0287 | 7 | home | V07 §7  (seam ids dropped) |
| V07-0288 | 7 | home | V07 §7 T-V7-1, T-V7-2, T-V7-3 (seam ids dropped) |
| V07-0289 | 7 | home | V07 §7 T-V7-4, T-V7-5, T-V7-6, T-V7-7, T-V7-8, T-V7-9 (seam ids dropped) |
| V07-0290 | 7 | home | V07 §7 T-V7-13 (seam ids dropped) |
| V07-0291 | 7 | home | V07 §7 T-V7-13 (seam ids dropped) |
| V07-0292 | 7 | home | V07 §7 T-V7-14, T-V7-15, T-V7-16, T-V7-17, T-V7-18 (seam ids dropped) |
| V07-0293 | 7 | home | V07 §7 T-V7-19, T-V7-20, T-V7-21, T-V7-22, T-V7-23, T-V7-24 (seam ids dropped) |
| V07-0294 | 7 | home | V07 §7 T-V7-25, T-V7-26, T-V7-27, T-V7-28, T-V7-29, T-V7-30 (seam ids dropped) |
| V07-0295 | 7 | home | V07 §7 T-V7-31, T-V7-32, T-V7-33, T-V7-34 (seam ids dropped) |
| V07-0296 | 7 | home | V07 §7 T-V7-35, T-V7-36, T-V7-37 (seam ids dropped) |
| V07-0297 | 7 | home | V07 §7 T-V7-38, T-V7-39, T-V7-40, T-V7-41 (seam ids dropped) |
| V07-0298 | 7 | home | V07 §7 T-V7-42 (cells named; V07-WGAP-1) |
| V07-0299 | 7 | home | V07 §7 T-V7-45, T-V7-46, T-V7-47 (seam ids dropped) |
| V07-0300 | 7 | home | V07 §7 T-V7-48, T-V7-49, T-V7-50, T-V7-51 (seam ids dropped) |
| V07-0301 | 7 | home | V07 §7 T-V7-52, T-V7-53, T-V7-54, T-V7-55, T-V7-56 (seam ids dropped) |
| V07-0302 | 7 | home | V07 §7 T-V7-57 (seam ids dropped) |
| V07-0303 | 7 | home | V07 §7 T-V7-52 (seam ids dropped) |
| V07-0304 | 8 | home | V07 §8 opening paragraph (built on the finished base; V-M0 on M0's kernel, M0 (b)'s tables and its own fixtures; V07-XCONF-1) |
| V07-0305 | 8 | home | V07 §8 |
| V07-0306 | 8 | home | V07 §8 |
| V07-0307 | 8 | home | V07 §8 |
| V07-0308 | 8 | home | V07 §8 |
| V07-0309 | 8 | home | V07 §8 |
| V07-0310 | 8 | home | V07 §8 opening paragraph (J122's slot: V-M0 right after M0; V-M1 – V-M4 after M4, parallel with M5; V-M2u after M6-U's tail; V07-XCONF-1) |
| V07-0311 | 8 | home | V07 §8 |
| V07-0312 | 9 | home | V07 §9 J-V7.1, J-V7.2, J-V7.3, J-V7.4, J-V7.5, J-V7.6, J-V7.7, J-V7.8 (final choice; E-24 marks); history removed (V07-NARR-7) |
| V07-0313 | 9 | home | V07 §9 J-V7.11, J-V7.12, J-V7.13, J-V7.14, J-V7.15, J-V7.16, J-V7.17, J-V7.18 (final choice; E-24 marks); history removed (V07-NARR-7) |
| V07-0314 | 9 | home | V07 §9 J-V7.21, J-V7.22, J-V7.23, J-V7.24, J-V7.25, J-V7.26, J-V7.27, J-V7.28 (final choice; E-24 marks); history removed (V07-NARR-7) |
| V07-0315 | 9 | home | V07 §9 J-V7.31, J-V7.32, J-V7.33, J-V7.34, J-V7.35, J-V7.36, J-V7.37, J-V7.38 (final choice; E-24 marks) |
| V07-0316 | 9 | home | V07 §9 J-V7.41, J-V7.42, J-V7.43, J-V7.44, J-V7.45, J-V7.46, J-V7.47, J-V7.48 (final choice; E-24 marks); history removed (V07-NARR-7) |
| V07-0317 | 9 | home | V07 §9 J-V7.51, J-V7.52, J-V7.53, J-V7.54, J-V7.55, J-V7.56, J-V7.57, J-V7.58 (final choice; E-24 marks) |
| V07-0318 | 9 | home | V07 §9 J-V7.61, J-V7.62, J-V7.63, J-V7.64, J-V7.65, J-V7.66, J-V7.67, J-V7.68 (final choice; E-24 marks) |
| V07-0319 | 9 | home | V07 §9 J-V7.71, J-V7.72, J-V7.73, J-V7.74, J-V7.75, J-V7.76, J-V7.77, J-V7.78 (final choice; E-24 marks) |
| V07-0320 | 9 | home | V07 §9 J-V7.81, J-V7.82, J-V7.83, J-V7.84, J-V7.85, J-V7.86, J-V7.87, J-V7.88 (final choice; E-24 marks); history removed (V07-NARR-7) |
| V07-0321 | 9 | home | V07 §9 J-V7.91, J-V7.92, J-V7.93, J-V7.94, J-V7.95, J-V7.96, J-V7.97, J-V7.98 (final choice; E-24 marks) |
| V07-0322 | 9 | home | V07 §9 J-V7.101, J-V7.102, J-V7.103, J-V7.104, J-V7.105, J-V7.106, J-V7.107, J-V7.108 (final choice; E-24 marks); history removed (V07-NARR-7) |
| V07-0323 | 9 | home | V07 §9 J-V7.111, J-V7.112, J-V7.113, J-V7.114, J-V7.115, J-V7.116, J-V7.117, J-V7.118 (final choice; E-24 marks); history removed (V07-NARR-7) |
| V07-0324 | 9 | home | V07 §9 J-V7.121, J-V7.122, J-V7.123, J-V7.124, J-V7.125, J-V7.126, J-V7.127, J-V7.128 (final choice; E-24 marks); history removed (V07-NARR-7) |
| V07-0325 | 10 | bcr-pointer | V07 §10 pointer rows: BCR-V7-1 → item 201 → §1.1; BCR-V7-2 → item 287 → §4.2 S0; BCR-V7-3 → item 267 → §2.8; BCR-V7-4 → item 214 → §2.5; BCR-V7-5 → item 215 → §2.5; BCR-V7-6 → item 255 → §2.7 (the request text is file f's; VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3) |
| V07-0326 | 10 | bcr-pointer | V07 §10 pointer rows: BCR-V7-1 → item 201 → §1.1; BCR-V7-7 → item 314 → §4.9; BCR-V7-8 → item 315 → §4.9; BCR-V7-9 → item 418 → §8.5; BCR-V7-10 → item 505 → §14; BCR-V7-11 → item 202, 326 → §1.1, §4.12, §14, PART III; BCR-V7-12 → item 276 → §2.9 (the request text is file f's; VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3) |
| V07-0327 | 10 | bcr-pointer | V07 §10 pointer rows: BCR-V7-13 → item 377 → §7.6; BCR-V7-14 → item 378 → §2.5; BCR-V7-15 → item 344 → §6.1; BCR-V7-16 → item 527 → §16; BCR-V7-17 → item 202, 528 → §1.1, §7.7, §16; BCR-V7-18 → item 202, 317 → §4.11, §7.7; BCR-V7-26 → item 322 → §4.11 (the request text is file f's; VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3) |
| V07-0328 | 10 | bcr-pointer | V07 §10 pointer rows: BCR-V7-19 → item 357 → §7.1; BCR-V7-20 → item 312 → §4.8; BCR-V7-21 → item 430 (carried by 432) → §10.2; BCR-V7-22 → item 431 (absorbed into 209) → §4.11, §7.4; BCR-V7-23 → item 495 → §13.5; BCR-V7-24 → item 310 → §4.7 (the request text is file f's; VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3) |
| V07-0329 | 10 | bcr-pointer | V07 §10 pointer rows: BCR-V7-25 → item 292 → §4.3; BCR-V7-26 → item 322 → §4.11; BCR-V7-27 → item 565 → II.7.6, PART III; BCR-V7-28 → item 316 → §4.9; BCR-V7-29 → item 283 → §4.1; BCR-V7-30 → item 279 → §3.2 (the request text is file f's; VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3) |
| V07-0330 | 10 | bcr-pointer | V07 §10 pointer rows: BCR-V7-31 → item 424 → §9.5; BCR-V7-32 → item 268 → §2.8, §4.11; BCR-V7-33 → item 290 → §4.3; BCR-V7-34 → item 506 → §14; BCR-V7-35 → item 290 → §4.3, §2.7 (the request text is file f's; VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3) |
| V07-0331 | 10 | bcr-pointer | V07 §10 pointer rows: BCR-V7-36 → item 576 → §10.2, §2.5; BCR-V7-37 → item 577 → PART III; BCR-V7-38 → item 579 → §4.7 (the request text is file f's; VOL-V07-V08-RESTATEMENTS-007, V07-RESTATE-3) |
| V07-0332 | 11 | answer-J121-J122 | V07 §11 Q1 **Decided (a), J122** (V07-XCONF-1) |
| V07-0333 | Integration notes | home | folded into the body at its homes (IN-V07-1 V07 §2.7 `arableFactor`; IN-V07-2 V07 §1 (1), §3.12, §3.16; IN-V07-3 V07 §3.1 (1); IN-V07-4 V07 §3.4, §5.1; IN-V07-5 V07 §4.1; IN-V07-6 validation records; IN-V07-7 V07 §1b dossier trace); V07 *Integration notes* keeps the map of J-VI rows to homes |
| term: THORP, HAMLET, VILLAGE (village rungs, bands [1, 80), [80, 400), [400, 1 500)) | term | glossary | defined at V07-0094 → V07 §2.1 |
| term: village product | term | glossary | defined at V07-0001 → V07 §0 |
| term: township / territory frame | term | glossary | defined at V07-0178 → V07 §3.2 (1) |
| term: density raster (village.density, bands empty/scattered/close/dense) | term | glossary | defined at V07-0190 → V07 §3.3 (`density.bandWeight` wired as `q`'s weight; J-V7.139; V07-WGAP-2) |
| term: tracker (tracker-steered network; road, track, approach) | term | glossary | defined at V07-0196 → V07 §3.5 (no `slack` or `emptyDensity` reader; V07-WGAP-2) |
| term: toft, croft, frontage run, back close | term | glossary | defined at V07-0213 → V07 §3.8 |
| term: slot race | term | glossary | defined at V07-0035 → V07 §1b W17 |
| term: palisade, palisade section, light stretch | term | glossary | defined at V07-0193 → V07 §3.4 (sections from `palisade.section` at V07 §2.2a; V07-WGAP-1); condition and patches V07 §3.4 (8) (item 114) |
| term: neck (river-bend fencing) | term | glossary | defined at V07-0003 → V07 §0 |
| term: reached (village.reached face) | term | glossary | defined at V07-0165 → V07 §2.7 |
| term: hand-off band (handoff.band, 5 %) | term | glossary | defined at V07-0099 → V07 §2.1 |
| term: PLaw (the anchor law) | term | glossary | defined at V07-0104 → V07 §2.2 |
| term: VillageRungRow | term | glossary | defined at V07-0103 → V07 §2.2 |
| term: VillageRuleCells | term | glossary | defined at V07-0114 → V07 §2.2a |
| term: reference cell ({ref: {table, row, cell}}) | term | glossary | defined at V07-0113 → V07 §2.2a (the reference cell is §7.6's `{ref:{table,row,cell}}`, E-30; V07-ELEG-1) |
| term: VillageRequest | term | glossary | defined at V07-0022 → V07 §1b W4 |
| term: VillagePlan | term | glossary | defined at V07-0025 → V07 §1b W7 |
| term: VillageField (great field, furlong, meadow, commons) | term | glossary | defined at V07-0224 → V07 §3.9 (3) (factor rows cited at V07 §2.2a; V07-DUP-2) |
| term: VillageEnd (ends, declareEnd) | term | glossary | defined at V07-0042 → V07 §1b W24 |
| term: EpochPlacement (place, remove) | term | glossary | defined at V07-0102 → V07 §3.12 *Records at a village epoch* (`village.records`, the records placement's one home; type cited at V06 §2.1; V07-DUP-1) |
| term: village.records | term | glossary | defined at V07-0088 → V07 §1b W70 (cites V07 §3.12, the records placement's one home; V07-DUP-1) |
| term: village.pins | term | glossary | defined at V07-0090 → V07 §1b W72 |
| term: v. namespace (25 village classes) | term | glossary | defined at V07-0127 → V07 §2.4 |
| term: PresenceWhen (presence column) | term | glossary | defined at V07-0142 → V07 §2.4 |
| term: RaisedRead | term | glossary | defined at V07-0166 → V07 §2.7 |
| term: named draw shapes u, B3, F4, S | term | glossary | defined at V07-0175 → V07 §3.1 *named draw shapes* (glossary home) |
| term: settlement radius R_s | term | glossary | defined at V07-0186 → V07 §3.2 (6) |
| term: VS1-VS8 village stages | term | glossary | defined at V07-0169 → V07 §3.0 |
| term: F-V-* failure ladders (F-V-PAL, F-V-ANCHOR, F-V-GATE, F-V-FAIR, ...) | term | glossary | defined at V07-0259 → V07 §3.13 |
| term: VG parity preset | term | glossary | defined at V07-0265 → V07 §3.15 |
| term: outlying farmsteads | term | glossary | defined at V07-0040 → V07 §1b W22 |
| term: model time law | term | glossary | defined at V07-0285 → V07 §6 |
| term: deserted village (desertion) | term | glossary | defined at V07-0255 → V07 §3.12 (*decline*) |
