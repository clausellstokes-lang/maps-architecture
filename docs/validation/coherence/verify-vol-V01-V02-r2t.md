# Verify V01 and V02 — round 2 (after repair round 2 / assemble-r2)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V01-V02-r2t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V01-V02-r2t`, 2026-10-01)
- P1 brief read whole; inputs located (r1t findings, adjudication-r2 R2-04 – R2-42 and Part H V01/V02, assemble-r2, repair-r2-V01/V02); pre-r2 volumes extracted from 682e8e9 (V01 1480993b…, V02 a11f04cc… = assemble-r2's before column): done
- P2 round-1 findings (VV12-08, VV12-r1-01 – -09, G122-V01, G122-V02, G123-V02) re-checked on the live text: done (9 FIXED, VV12-08 CLOSED by R2-04, the three G parts PRESENT)
- P3 V01 round-2 blocks read whole (pre → live diff), new problems: done (28 sections)
- P4 V02 round-2 blocks read whole (pre → live diff), new problems: done (31 sections)
- P5 g items 120–126 parts in V01 and V02 as new design (wiring, lifecycle, edges, agreement, owner's words); phone clauses (R2-41): done
- P6 references, ids, doc checks, words: done (0 broken; ids unique; doc checks provisional)
- P7 report and result: done — 7 issues (0 blocker, 4 major, 3 minor): V01 3, V02 2, rendering 1, scope 1

## Inputs

* Live: `docs/volumes/V01-neighbourhoods.md` `fb2d1496…`, `docs/volumes/V02-buildings.md` `c4d39837…` (assemble-r2's after column; V02 with assemble's R2-07 line-7 hand-off).
* Before: the same files at commit 682e8e9 (`1480993b…`, `a11f04cc…`).
* Rulings: `adjudication-r2.md` R2-04 – R2-42; Part H · V01 and · V02.

## Part 1 — round-1 findings re-checked

| id | owner | ruling | verdict on the live text |
|---|---|---|---|
| VV12-08 | V02 | CLOSED per R2-04 | CLOSED. J-V2.109 stands (V02 l.1297, §9 l.3920); the canon's E-27 gained the shed clause (canon, adjudication-round-2 entry). Not re-raised. |
| VV12-r1-01 | model | ONE FIX with VM-R1T-01 (R2-13) | FIXED. Base l.3041 is the comment "// OutlineTemplateId is §4.2 S1 (2)'s …"; the one declaration is §4.2 S1 (2) (l.5013); V01 §2.1 (l.362) points at it. |
| VV12-r1-02 | pipeline | ONE FIX with VAF-R0S-08 | FIXED. II.1 l.20135 reads "DistrictContext is V01 §2.3's and TypedBoundary §2.5's". (l.19120's "(V01 §2.3)" names where the view is assembled, which V01 §2.3 l.453 states: no finding.) |
| VV12-r1-03 | V01 | FIX per R2-34 | FIXED. V01 §3.16 `catchmentOf` reads `walk`, `households`, `parish`, `district`, `settlement` as V11 §2.3's `CoverageSpec`, cited (checked against V11 l.379–388), keeping only `neighbourhood` → `district`, `underDistance` underground, the island one `walk` unit, and no unit in a district with no residential plot. Dependents: V01 §5.4 (3) *Evaluation* (one pass per member and radius over the 16 m raster; symmetric disc, each district's own `households` radius), §6's services and Show-gaps lines with fallbacks, J-V1.102's reason, T-V1-42 and T-V1-59 (b) plot by plot on all four units. |
| VV12-r1-04 | V01 | FIX | FIXED. §0 l.89 "making a standalone neighbourhood document"; a joined-line scan finds no bare "standalone neighbourhood" in V01 or V02. |
| VV12-r1-05 | V02 | FIX (second option) | FIXED. V02 §6.4 l.3210 reads exactly Part H's text; §6.2 gains no figure. |
| VV12-r1-06 | V02 | FIX per R2-07 | FIXED. V02 l.7 "owner items 1–101, file g, file f 200–585" (assemble-r2's hand-off). |
| VV12-r1-07 | V11 | ONE FIX with VAF-R0S-13 (R2-15) | FIXED. No `X-V11-7`, `fallbackM2`, `fallbackFloors` or "stopgap band" anywhere in the base or the volumes. |
| VV12-r1-08 | V12 | FIX per R2-15 | FIXED. V12 l.2177's `deck` line ends "the panel rule \|". |
| VV12-r1-09 | scope | FIX | FIXED. §14's `@plat/hood` (l.18986–18994) lists catchmentOf / districtsAbove / fabricSignature / skyDistrictCount / findAreas / gapUnits / disasterSource with disasterDistricts / campLand and the writer plantRimWalk (V01 §3.16, V01 §5.4), with the M3b note for `campLand`. |
| G122-V01 | V01 | NEW DESIGN per R2-37 (4)–(5), R2-36 | PRESENT (see Part 3): `disasterSource` / `disasterDistricts` and `campLand` (V01 §3.16), §2.3's `DisasterUnit` / `DisasterSource`, §1–§1b wiring, §3.18 rows, §5.4 (6), §6's line, T-V1-60, J-V1.104/105. New findings on it in Part 2. |
| G122-V02 | V02 | NEW DESIGN per R2-37 (4), (7), R2-36 | see Part 3 |
| G123-V02 | V02 | NEW DESIGN per R2-38 (4), R2-35 (T123-5) | see Part 3 |

## Part 2 — new findings (round-2 ids `VV12-r2-nn`)

Every changed subsection of both volumes was read as a word diff, pre (682e8e9) → live. That is 28 sections in V01 (= its 28 blocks) and 31 in V02 (its 28 blocks plus the head text of `## 6`, the parent sections of the four APPEND blocks, and the title line). V01 §3.16, §5.4, §3.18's new rows, T-V1-42, T-V1-59 and T-V1-60 were also read whole, as were V02 §3.11, §5.7, §3.18's new rows, T-V2-59 and T-V2-60. Every claim was checked at the unit it cites (base §2.6 step 7, §2.7, §2.8, §2.9, §4.5, §8.2, §8.8, §10.2, II.1, DR44; V03 §3.11 and §5.6; V06 §2.4, §3.22 and §3.23; V07 §5.6; V08 §2.3, §3.6 and §3.16 (7); V11 §2.3 and registry row 62).

### VV12-r2-01 — major — CONFLICT — owner V01
**Claim.** Two units pick a disaster overlay's calamity by different rules:
* V01 §3.16 (2) takes the latest `CalamityRef` among the committed `epoch` events whose week lies inside the overlay's weeks [`sinceWeek`, `untilWeek`), ties by severity band, then id. J-V1.104 records this "over a new field on `ConditionOverlay`"; §1b's dossier row and §3.18 (e)'s "no calamity in the overlay's weeks" follow it.
* V08 §3.16 (7) (d) — the port's home for the condition's crisis fields (V08 §2.3's carried `condition` fact `calamity`, W97, its field-table row for `calamityHistory[]`) — links a condition to "the carried calamity whose week equals its `triggeredAt.tick`, else … the latest carried calamity in the 52 weeks up to its `sinceWeek`". It states that DR44 reads that calamity's `targets`, "which V01's `disasterDistricts` takes first", and its `type` for the pattern.

The two rules disagree in two ways. V08's fallback window lies before `sinceWeek`, where V01 never looks. And where a disaster condition's weeks also hold a later calamity (a plague, a war, a second fire), V01 takes that later one: its targets are struck first, and its hazard's pattern is drawn (a plague's `null` hazard reads `scatter` for a great fire's look). Which districts look ruined then depends on which unit's rule is built.
**Required change.** V01 §3.16 (2) reads: "**The calamity.** The overlay's calamity is the carried calamity its condition's `calamity` crisis field names (V08 §2.3's `condition` fact under the overlay's key; V08 §3.16 (7) (d)), read as the `CalamityRef` of that id among the committed `epoch` events' `calamity` entries (§4.11; V08 §3.6). An overlay whose condition carries no `calamity`, a named calamity no committed event holds, and a preview give no calamity." The pattern sentence is kept.

J-V1.104's clause from "to find the overlay's calamity" to "the port carries" reads: "to take the overlay's calamity from its condition's carried `calamity` field (V08 §3.16 (7) (d)) and read its pattern through V06 §2.4's calamity table, over an association of this volume's own by week or a second table of calamity words, because the port alone reads the condition's trigger tick, item 122 adds nothing to the model (§2.7) and V06's table already types every calamity word the port carries".

The dependents follow:
* §1b's dossier row names "`activeConditions[]`' crisis field `calamity` (V08 §3.16 (7) (d))" beside `calamityHistory[]`.
* §3.18 (e)'s case "no calamity in the overlay's weeks" reads "no calamity linked to the condition".
* T-V1-60 (d) adds a disaster condition whose weeks also hold a later calamity of another type: the linked calamity's targets are struck, with its pattern.

### VV12-r2-02 — major — CONFLICT (owner's words) — owner V01
**Claim.** Item 122 (b), approved by the owner, places mass immigration's look as "a tent and shanty camp on common or fallow land along the main approach road by a gate". V01 §3.16 `campLand` (2) counts as "verges of the approach roads" every `meadow`, `pasture`, `arable` and `strip_field` face bordering an arterial within `camp.reachM`. That includes arable and strip fields in crop, outside their fallow course. §10.2 (d)'s `approachByGate` (the refugee camp), `approachRoads`' fallback, `outside` and `gatesAndKeep`'s camp take those faces, so a refugee camp may stand on a field in crop, against the owner's words. J-V1.105 ("the open verges of the arterials") and T-V1-60 (e) carry V01's reading.
**Required change.** V01 §3.16 `campLand` (2) reads: "the **verges of the approach roads** — the `commons` faces, and the `arable` and `strip_field` faces in their rotation's fallow course (§4.9), bordering an arterial that leaves the settlement, within `camp.reachM` of where it leaves (its gate, else the built edge)". Its "Never a face of another kind" sentence adds "nor a field in crop". The dependents follow:
* J-V1.105 adds "and to take the land beside the road only where it is common or fallow, because the owner's camps stand on common or fallow land (item 122 (b))".
* T-V1-60 (e) asserts 0 `arable` or `strip_field` faces outside their fallow course and 0 `meadow` or `pasture` faces in `campLand`.
* §3.18 (e)'s outskirts row gains the case "neither common nor fallow land within reach", whose outcome is the empty list (§10.2 (h)'s ring marks).

### VV12-r2-03 — minor — CONFLICT (a test bar against its rule) — owner V01
**Claim.** V01 §3.16 (4) opens the strike order with every matched unit, by ascending `u`, then grows by the pattern. A fire whose calamity names two districts that are not adjacent therefore strikes a set that is not connected. T-V1-60 (a) nonetheless asserts "a fire's set connected over district adjacency, each unit after the first the frontier's farthest downwind of the seed". T-V1-60 (d)'s own fixture (a calamity naming a district's institution) can break that bar as soon as it names two.
**Required change.** T-V1-60 (a)'s fire clause reads: "a fire's units after its matched ones each adjacent to a unit before it in the order and each the frontier's farthest downwind of the seed (nearest under calm); with at most one matched unit, the set connected over district adjacency".

### VV12-r2-04 — minor — WIRING — owner V02
**Claim.** V02 §5.7 (4), §2.4's `ExteriorDamage.look.kind` comment and X35 take the disaster's kind from "the calamity's type V01's `disasterDistricts` reads for its pattern". But `disasterDistricts` returns only `Id[]` (V01 §2.3; R2-37 (4)). The calamity and the pattern are `disasterSource(doc, overlay, key)`'s `calamity` and `pattern` (V01 §2.3, whose comments name V02 §5.7 (4) as their reader), and §1b's input cell does not name `disasterSource`. A raw `type` word also leaves the fire flavour undefined for "blaze", "conflagration" or "burning", which V06 §2.4's table reads as `fire` and V01's `pattern` already classifies.
**Required change.** V02 §5.7 (4) reads: "Its kind — V01's `disasterSource(doc, overlay, key).pattern` (V01 §2.3, V01 §3.16 (2): the calamity's type through V06 §2.4's calamity table; `scatter` for a preview) — adds one flavour: a `fire` pattern blackens, …; a `flood` and a `scatter` (an earthquake, every other kind, a preview) draw the damage alone". §2.4's `look.kind` becomes `pattern: 'fire'|'flood'|'scatter'` with the comment "V01's `DisasterSource.pattern`". §1b's input cell and X35 name `disasterSource` beside `disasterDistricts`.

### VV12-r2-05 — major — WIRING — owner V02
**Claim.** `exteriorDamage(doc, b, view, opts)` (V02 §2.4) reads state that lives only in the generation worker:
* the document;
* V06's `decayLevel` and `decayPeak`, over the lineage's lifecycle events;
* the plan in force, from the elaboration cache (§2.8: the document's non-canonical blocks);
* V01's `disasterDistricts` and V06's `crisisLookYields`.

Its consumer, though, is "V02 §5.7's drawing in the tile rasteriser" (V02 §1b). Its holes and gaps are "memoised beside its roofscape" (V02 §5.7 (8), §6.6), which the tile worker derives from the display list (V02 §3.1's roofscape row: "the tile worker (drawing)"; V02 §6.3). The tile worker holds no document, cache or lifecycle block.

V02 names no path by which a building's damage reaches the tile worker (no mark, column or `DisplayDelta` group). Nor does it say when the damage is sent again: the drawn week crossing an element's threshold or a look's week edge, `crises` or the viewer's effective key changing, a plan coming into force (a click, `elaborate: 'view'`) or leaving it (eviction), a restoration. §8.1 item 7 re-emits only Works targets' marks on a week change. The interface has a producer and a consumer in two workers with no wire between them.
**Required change.** V02 §5.7 (8) and §2.4 state:
* **Where it runs.** `exteriorDamage` runs in the generation worker, where its inputs live, over the buildings of the tiles the view requests.
* **How it travels.** Its result reaches the tile worker as the building's damage marks — `level`, `reading`, the hole and patched rings, the gap spans, and the look's tone, dash and fire flags — in the building's group of a `DisplayDelta` (§8.1, §8.9).
* **When it is re-sent.** It is re-emitted for exactly the buildings whose `ExteriorDamage` changes: when the drawn week moves (beside §8.1 item 7's Works re-emission), when `crises` or the effective knowledge key changes, when a plan enters or leaves force, and after a commit that moves a level or a look's units.
* **In the tile worker.** The tile worker clips the marks against the roofscape it memoises (V02 §6.3), the tile keyed as VV12-r2-06 states.

V02 §1b's row names this path. V02 §6.6 adds the generation-worker cost per changed building. T-V2-59 (e) and T-V2-60 (g) add an eviction of the plan in force and a `crises` toggle, the tile redrawn after each.

### VV12-r2-06 — major — WIRING (a hand-off one end wrote) — owner rendering
**Claim.** V02 §13's X37 (V02 §5.7 (2), (8)) asks the base for two ends, and neither is written:
1. §8.2's Works `decaying` row still reads "override: the roof with gaps along its ridge, the outline dashed at 30 %", with no word that, where the building's plan is in force, its ridge gaps are V02 §5.7's holes. A `decaying` building whose plan is in force would draw two different sets of roof gaps.
2. §8.8's tile key carries the drawn week for "a building drawn under item 123's damage layer", but not `crises` or the effective knowledge key for a tile holding a building under a disaster look. At the district band the `disaster` row draws no `live.crises` mark ("— (its buildings' damage, below)", §8.2's *Crisis looks* table), so `live.crises`' share of the key does not move when Show crises turns `off`, a preview starts or View as withholds the condition. The cached tile keeps drawing ruined roofs the view has switched off.

**Required change.**
* §8.2's Works `decaying` row reads "override: the roof with gaps along its ridge — where the building's plan is in force, V02 §5.7's holes in their place — the outline dashed at 30 %".
* §8.8's tile-key list reads "… the drawn week where the tile holds a Works mark (§8.1 item 7) or a building drawn under item 123's damage layer, whose decay level is read at it (§2.6 step 7; §8.6), and `crises` and the effective knowledge key where it holds a building under a disaster look (V02 §5.7 (8)) …".
* §8.1 item 7's week re-emission adds the buildings whose damage marks differ between the two weeks (V02 §5.7).
* T-ER-27 gains a case: Show crises toggled, and View as changed, over a cached district-band tile of a struck district, with the tile redrawn each time.

### VV12-r2-07 — minor — COHESION — owner scope
**Claim.** R2-36 (a canon change) places item 122's disaster units "with V01's W10 at M5", and V01 §8.2's W10 builds them (`disasterSource`, `disasterDistricts`; within V01's 27.5–36.75 pw). §16's M5 row lists item 120's Find with "volume 1's area and gap services `findAreas` and `gapUnits` (W10–W11)" but not item 122's part. Its M3b row (`campLand`) and M6 row (V02 §8.6's ruined look) both name their item-122 parts, so this placement is the one §16 leaves out.
**Required change.** §16's M5 row, after "volume 1's area and gap services `findAreas` and `gapUnits` (W10–W11)", adds "; item 122's disaster units — volume 1's `disasterSource` and `disasterDistricts` (W10; V01 §3.16)".

### Considered and not raised
* **§5.7's element reading depends on which plans are in force.** It depends on clicks, `elaborate` and eviction, so one ruined building can show holes in one session and only the massing reading in another. This follows the base's owner-ruled elaboration design: item 28's per-viewer `elaborate` key, with `click` the default, already makes dormers and porches depend on the same state. J-V2.112 records the choice, with V03's 3 ms plan cost as the reason, and §3.18's "no plan in force" row defines the outcome. Not a defect.
* **`disasterSource`'s units are those the key admits.** A withheld district or target changes the set a player sees. This is DR44's admission (a look never points at what the viewer does not know), recorded in J-V1.104. Not a defect.
* **Registry row 62 does not name `campLand` among `hood.constants`' readers.** The row's module-reader list is already not exhaustive (it omits V05's `sky.plotShare` reads), and the new column is carried by its citation of V01 §3.14's column table. Not raised.

## Part 3 — owner items 120–126 in V01 and V02

| item, part | routed (canon) | live text | verdict |
|---|---|---|---|
| 120, V01 (areas and Show gaps' units) | J133 | V01 §5.4 (1)–(5); `findAreas` / `gapUnits` at V01 §3.16; served counted only by V11 §2.3 (R2-34); T-V1-59 takes T120-2 and T120-4's town clauses (R2-35, R2-08) at M5 (R2-32); §2.9's `find` key and `FindChip` now stand in the base (l.3042), so round 1's pending pointers resolve | PRESENT, agrees |
| 122, V01 (disaster targets; outskirts land) | J135, R2-37 (4)–(5), R2-36 | `disasterSource` / `disasterDistricts` and `campLand` (V01 §3.16), `DisasterUnit` / `DisasterSource` (§2.3), §0, §1.1 item 14, §1.2, §1.3, §1b, §2.7, §3.12, §3.14 `camp.reachM`, §3.18 (b), (c), (e), (f), §5.1.4, §5.3, §5.4 (6), §6, T-V1-60, §8.1–§8.3, J-V1.104, J-V1.105, §11, §12. Whole districts, no per-building share; at the village rungs V07's units (V07 §5.6 (3), `villageDisasterUnits`, closed); the base's `neighbourhoods`, `affectedQuarter` and camp places read it (§10.2 (d)); §14 lists both services | PRESENT; VV12-r2-01, -02, -03, -07 |
| 122, V02 (the ruined look of a disaster's buildings) | J135, R2-37 (4), (6), (7), R2-36 | V02 §5.7 (1)–(8) with `ExteriorDamage` (§2.4): the higher of the decay level and the `lookLevel`; every building of `disasterDistricts`' units (V07's ends); `crises` follow/off/preview; DR44 admission; the hand-over by V06's `crisisLookYields` (matches V06 §3.22 (3) word for word); §3.18 rows; §6.6; T-V2-60; §8.6 (M6b, R2-36); J-V2.113; X35 and X36 closed (V01, V07, V06) | PRESENT; VV12-r2-04, -05, -06 |
| 123, V02 (the exterior agrees with the plan) | J136, R2-38 (4), R2-35 T123-5 | V02 §5.7 (2)–(3): V03's thresholds and states only; a roof bay over a room as a hole, a lowest-storey outer run as a gap; patches by V06's `decayPeak`; the `rooms` rung kept `current` through decline (§3.11, §3.8, matching V03 §3.11 *Decay re-cuts no plan* and §2.6 step 7); exports (§5.5, J-V2.112); T-V2-59 takes T123-5, with `item123.damage` the pin of V12 (R2-09); X34 closed at V03 (V03 l.3265) | PRESENT; VV12-r2-05, -06 |
| 121, 124, 125, 126 | no V01 or V02 part routed | — | none due |
| 126 (a2), R2-41 | — | no phone, narrow-class or bottom-sheet clause in V01 or V02 | CLEAN |

## Part 4 — references, ids, checks, words

* **References** (`work/assemble-r2/refs.py` over the live set): 54 113 references, **0 broken**. V01 has 3 291 resolved, 15 ambiguous-form and 17 external; V02 has 2 574 resolved, 12 ambiguous-form and 11 external. Each of the 27 ambiguous forms was read in context. All are range ends ("V02 §5.2–§5.3", "V01 §2–§5") or base citations meant as the base; the round-2 ones are V01 l.3594 (§2.7) and l.3680–3682 (§2.7, §10.2, §2.3), all base. None needs a prefix.
* **Ids**: T-V1-60, J-V1.104, J-V1.105, T-V2-59, T-V2-60, J-V2.112, J-V2.113 and X34–X37 are each defined once. V02's census line (J-V2.1 – J-V2.113, T-V2-1 – T-V2-60, X1 – X37) matches.
* **Nuance audit of the round's cuts.** Each cut was checked against its base home, field by field:
  * V01 §2.6's `HoodRecipe` against §2.9 (identical, presence rule at `Recipe.hood`).
  * V01 §2.4's request and result rules against II.1 (presence, derived mode, `SkyIsland.reason`, `hoodPins`, `districts`, `landingsReached`).
  * V01 §2.2's `SquareQuotaRow` against §10.2.
  * V02 §2.2's `DormerRow` and `DormerKind` against §2.6, and V02 §2.6's `TierLay` and `LaidWing` against §2.7 (identical with comments).
  * V01's `raised.stripMarginM` (1 m) against V11 §3.24.2's `stripMarginM` 1 m (R2-26 (d)).
  * V02 §3.10.1's withdrawn upper-half rule against §4.5's discrete-cell rule (R2-16).

  **Nothing lost.**
* **Doc checks** (`docs/validation/bench/doc_checks.py`, `--heads docs/ARCHITECTURE.md`). They are PROVISIONAL: "WARNING: reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative".

  | check | V01 (hits / unreviewed) | V02 (hits / unreviewed) |
  |---|---|---|
  | C1 | 0 | 0 |
  | C2 | 0 | 0 |
  | C3 | 401 / 345 | 586 / 528 |
  | C4 | 2 / 0 | 1 / 0 |
  | S1 | 0 | 0 |
  | S2 | 255 / 3 | 156 / 9 |

  C3 in round-2 text: 9 runs in V01 and 26 in V02, every one generic English or a number run ("a building with no roof", "units in the same shape"), with no identifier, table or list. S2's unreviewed hits are false positives: V01's three `§2.0` (as in round 1), and V02's own nine "V02 §6.6" pointers read against base headings.
* **Deferral and narration.** No deferral word, review id or round narration appears in the round-2 text. V02 §8.6's "**M6b**, added" is §8.5's established row form.
* **Prices** (ROUND-2 NOTE (6)): V01 §8.2's total is 27.5–36.75. V02 §8.3's is 23–33.5, which is M6 18.75–28.5 + M3a 2–2.75 + 2.25 of spikes, and M6's inner sum 15–22.5 + 3–4.5 + 0.5–1 + 0.25–0.5 checks. Both agree with §16 (l.19778: 27.5–36.75; l.19780: 21–30.75 staged), INDEX §1 (27.5–36.75; "23–33.5 (M6 21–30.75 with spikes; 2–2.75 at M3a)") and J-A568.01.
* **Words** (`wc -w`, pre-r2 → live):

  | volume | before | after | change |
  |---|---|---|---|
  | V01 | 79 160 | 83 025 | +3 865 (+4.9 %) |
  | V02 | 84 018 | 89 697 | +5 679 (+6.8 %) |

  The growth is owner-item new design (items 122 and 123), which the brief's NEW DESIGN rule adds. The round's removals are RESTATEMENT: V01 §2.4 −85 words, V01 §2.6 −188, V02 §2.2 −124, V02 §2.6 −78. Neither unit shrank, so the over-half nuance audit does not apply.
* **Design files** untouched by this seat.
