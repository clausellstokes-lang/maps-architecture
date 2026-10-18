# Agreement check, round 2 — the fabric chain (model, pipeline, V01, V02, V03, V11) after assemble-r2

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-fabric-r2t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole (ROUND-2 NOTES (1)–(6), items 114–126 with 122 (h)–(i) and 126 (a2), ORCHESTRATION NOTES) · [x] inputs (round-1 report and result; adjudication-r2's rulings R2-01 – R2-42 and Part H for the six members; assemble-r2; file g items 120–126; the canon's dated routings of items 120–126) · [x] live = assemble-r2's after-hashes · [x] VAF-R0S-03 … VAF-R1T-07 re-checked on the live text · [x] the eighteen owner-item parts (G120 … G125) re-checked as new design · [x] the members' round-2 hunks read at every shared item (pre 682e8e9 → live) · [x] matrix gaps and residues of the round's rulings hunted · [x] ids · [x] peers' eleven r2t results read (no duplicate raised) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

Members: **model** (§2), **pipeline** (§4, §10, PART II, PART III), **V01**, **V02**, **V03**, **V11** — the live
`docs/ARCHITECTURE.md` (sha256 `4ed292e9…`) and `docs/volumes/V01/V02/V03/V11-*.md` (`fb2d1496…`, `c4d39837…`,
`b015fd00…`, `7842179a…`), each equal to assemble-r2's after-hash; the pre-round text is the committed `682e8e9` (base
`137ecc0e…`, the text every repair-r2 file was written against). What was done:

* **Round-1 findings.** Each of the 33 ids re-read at every site its claim and its required change name, under the
  disposition Part H gives it (FIX, FIX per R2-nn, ONE FIX, NEW DESIGN per R2-nn): the fifteen agreement findings and the
  eighteen owner-item parts (below: all closed).
* **The owner items as new design** (ROUND-2 NOTE (3)). Items 120, 122 with (h)–(i), 123, 124 and 125 in the six members
  — model §2.6 step 7, §2.7's `ConditionOverlay` and *The dossier's staged records*, §2.9's `find`, `crises`, *The week's
  source*, *Weather effects*, *The crisis framing*; pipeline §4.11 *The clock* (1)–(2), §10.2's `RosterTables.crisis`
  with *Crisis looks* (a)–(i), EP-27; V01 §2.3's `DisasterUnit`, `DisasterSource`, §3.16's `disasterSource`,
  `disasterDistricts`, `campLand`, §5.4 (6), T-V1-60, §8.1–§8.2; V02 §2.4's `ExteriorDamage`, §5.7, §6.6, §7.8 (T-V2-59,
  T-V2-60), §8.6, X34–X37; V03 §3.11 *Decay re-cuts no plan*, §5.1 *The plan in ruin*, §5.5, §5.6, T-V3-38 – T-V3-40, §8;
  V11 §2.8 (`farmLayout`, `WeatherSpells`, `ClimateSettings`), §2.8d, §3.1 rows 43, 107–110, §3.17.1, §3.25.9 – §3.25.11,
  T-V11-46 – T-V11-48, §8 — each read whole and checked against the item's text, the canon's routing and R2-30 – R2-41:
  its producer and readers, lifecycle, edges and their tests, and agreement with every other member's part. Items 121 and
  126 name none of the six; no phone clause stands in the six (R2-41).
* **Repaired subsections.** A line diff pre → live (base 326 hunks, of them model's §2.1–§2.9 48 and pipeline's §4, §10.2
  and PART II–III 65; V01 69; V02 43; V03 56; V11 99), every hunk read in its subsection where it touches a subject
  another member states: R2-13's moved types and their citations, R2-14's "specified", R2-16's discrete-cell rule, R2-15's
  deck stand-in, R2-26 (d)'s `stripMarginM`, R2-28's `miningCellShare` and `accessForecastMin`, VEW-r1-04's
  `platformSteps`, R2-18 (a)'s emptied dwelling (§2.6's clamp, `relet`, the strike pool), the grandeur table's new shape
  (`{ ceiling, settings }`), `farmLayout`, `HoodRecipe`'s `size.*` and `green.leafyCourt` cells, `OutlineTemplateId`'s
  `d_shape`, R2-10's §11.2 types and `LadderStep`'s users.
* **Ids.** Every `T-Vn-m`, `J-Vn.m` and `J-VI.n` the six members cite is defined (V02's bar-registration table repeats
  ids beside their definitions by design; `T-V2-31` is defined in bold form); §13.2 defines T120-1 – T120-6, T121-1 –
  T121-8, T122-1 – T122-7, T123-1 – T123-7, T124-1 – T124-9, T125-1 – T125-3 and T126-1 – T126-3 as R2-35 fixes them, and
  the members' tests that take them name them (T-V1-59, T-V2-59, T-V3-38 – T-V3-40, T-V11-46, T-V11-48).
* **Peers.** The eleven round-2 results landed (verify-model, -pipeline, -kernel, -determinism, -rendering, -scope,
  -vol-V01-V02, -vol-V03-V04, -vol-V05-V06, -vol-V07-V08, -vol-V09-V10) were read; a defect a peer raised is not raised
  again: among them the comparison's "above 0" (VDC2-07, VDC2-08, VRC2T-14, VM-R2T-02, VV34-r2-04), the plan in force
  under decay (VM-R2T-01), `regional_migration_pressure` (VPC-R2-01, VDC2-09/10, VV56-r2-08), the disaster's calamity pick
  (VV12-r2-01), `campLand`'s verges in crop (VV12-r2-02), the camps on approach roads (VPC-R2-14), the village units
  (VV78-r2-05, VV78-r2-06), the inputs before their milestones (VPC-R2-11), `CrisisLookRow`'s `label` (VPC-R2-12), the
  crypt's roof bay (VV34-r2-08), V02's disaster kind (VV12-r2-04), V07's Find key (VM-R2T-11, VV78-r2-04).

## Round-1 findings re-checked

| id | disposition (Part H) | state | where it stands now |
|---|---|---|---|
| VAF-R0S-03 | ONE FIX with VM-R1T-05 (R2-13) | FIXED | V02 §2.2 l.434 "`DormerRow`, `DormerKind` and `PorchKind` are §2.6's"; V02 §2.6 l.682 "`TierLay` and `LaidWing` are §2.7's"; each declared once (§2.6 l.1403, 1411; §2.7 l.2406–2407). |
| VAF-R0S-04 | FIX per R2-13 | FIXED | V01 §2.3 l.476 `kind: RaisedKind /* §2.7 */`, l.560 `raised?: RaisedKind /* §2.7 … */`. |
| VAF-R0S-08 | ONE FIX with VPC-R1-09, VV12-r1-02 | FIXED | II.1 l.20135 "DistrictContext is V01 §2.3's and TypedBoundary §2.5's". |
| VAF-R0S-13 | ONE FIX with VV12-r1-07 (R2-15) | FIXED | V11 §3.24.4 (l.4034–4035) without the stopgap sentence; X-V11-7 gone from §10b; no `fallbackM2`/`fallbackFloors` in the set's six members. |
| VAF-R0S-15 | ONE FIX with VPC-R1-11 (R2-13) | FIXED | V01 §2.2 l.408 cites §10.2's `SquareQuotaRow` (declared once, l.15003). |
| VAF-R0S-19 | ONE FIX with VPC-R1-22 | FIXED | §4.7 S11 l.7012–7014 "exempt from the chance and the cap, is not counted toward the cap, and is never overwritten (item 101 R13)"; V11 §3.24.3 l.3999–4006 agrees. |
| VAF-R0S-20 | FIX per R2-16 | FIXED | V11 §3.6.1 l.1956–1958 and §2.1 l.271 cite §4.5's discrete-cell rule (`squalid` the poor row's, `comfortable` the modest row's). |
| VAF-R0S-23 | ONE FIX with VPC-R1-14 | FIXED | No "§10.2's example" left; `tannery` and `inn` read "(file f item 440)". |
| VAF-R1T-01 | FIX per R2-16 | FIXED | V02 §3.10.1 l.1532–1535 reads §4.5's rule; the upper-half rule is gone; V02 l.469 and l.847 cite the rule. Every member now states one rule (§4.5 l.6041–6045 the home). |
| VAF-R1T-02 | FIX | FIXED | V11 §2.8 l.582 `farmLayout: 'rows'|'perimeter'|'rivers'`; §3.17.1's `farm layout` column (arid `rivers`, cold `perimeter`, the rest `rows`); row 43 names S2's farm mode; §2.10's absent reading `rows`; the arid-without-river edge (M-V11-3289-E5) `perimeter` by §4.9. |
| VAF-R1T-03 | FIX | FIXED | §2.5 l.1123 "village (… PART III (4), V07 §3.7; its row V11 §3.9's)"; `DistrictKind` declared (l.1141). |
| VAF-R1T-04 | FIX per R2-14 | FIXED | §4.2 S2 l.5214–5216 and §4.7 S10b (3) l.7421–7424 carry R2-14's gloss exactly. A fifth restatement outside the six members persists: VAF-R2T-05. |
| VAF-R1T-05 | FIX per R2-13 | FIXED | V01 §2.4 l.587–588 cites II.1 for the request, result, report, presence rules and mode. |
| VAF-R1T-06 | FIX per R2-13 | FIXED | V11 row 24 "`RosterSettings` (§10.2; …)" (l.945); row 91 "`SquareQuotaRow` (§10.2; key `band`)" (l.1013). |
| VAF-R1T-07 | FIX per R2-32 | FIXED | V01 §8.2's W11 (l.3419) "T-V1-59 Find's, at M5 (Find's milestone)"; V03 §8 lands T-V3-38 at the later of P5 and M5. |
| G120-model | NEW DESIGN per R2-33 (a) | WRITTEN | §2.9 l.3042 `FindChip`; l.3357–3365 `find: { chips: FindChip[]; gaps: boolean }` with R2-33 (a)'s lifecycle, writers and readers; `thematic` loses `coverage` (l.3313–3315). Agrees with V01 §5.4 (`FindArea.id`, kind chips' `gapUnits`) and V03 §5.5 (`findRooms`). |
| G122-model | NEW DESIGN per R2-37 (1), (2) | WRITTEN | §2.7 l.2424's reader comment (R2-37 (1)'s standing rule, never `yearWeek`); l.2664–2670 a look adds nothing to the model; §2.9 l.3349–3356 `crises` with R2-37 (2)'s shape. |
| G122h-model | NEW DESIGN per R2-37 (8) | WRITTEN | §2.9 *The crisis framing* l.3388–3397 (R2-30's stop 0; a moved view never re-framed). Its export-frame clause is VM-R2T-08's. |
| G123-model | NEW DESIGN per R2-38 (1) | WRITTEN | §2.6 step 7 l.2072–2096. Its wording of the level and the comparison is VM-R2T-02's and VDC2-07's; the roofless case it omits is VAF-R2T-01. |
| G124-model | NEW DESIGN per R2-39 (f); MOOT in part | WRITTEN | §2.9 *Weather effects* l.3378–3387; no phone clause. |
| G125-model | NEW DESIGN per R2-40 (1) | WRITTEN | §2.9 *The week's source* l.3372–3377; `yearWeek`'s and `seasonFollow`'s defaults (l.3329–3331, 3339–3341). |
| G122-pipeline | NEW DESIGN per R2-37 (3) | WRITTEN | §10.2 l.15012–15027 (`CrisisLookKind`, `CrisisPlace`, `CrisisLookRow` with `lookLevel?`, `CrisisMapRow`, `CrisisLookSettings` with `previewSeverity`); `RosterTables.crisis` (l.14935); *Crisis looks* (a)–(i) l.15342–15425; EP-27. Its `beyondWalls` place is VAF-R2T-04. |
| G122h-pipeline | NEW DESIGN per R2-37 (3) | WRITTEN | `areaPerHeadM2`, `enginesPerBesiegers`, (c)'s headcount rule, (f)'s coalition spread, (e)/(h)'s ring marks. |
| G125-pipeline | ONE FIX with VPC-R1-27 (R2-40 (1)) | WRITTEN | §4.11 *The clock* (1) l.8271–8276, (2) without the `HostContext.week` rung (l.8281–8286); `EpochInputs.week` (l.8181). No `HostContext.week` in the six members. |
| G122-V01 | NEW DESIGN per R2-37 (4)–(5), R2-36 | WRITTEN | V01 §2.3 l.529–550, §3.16 l.2315–2371, §5.4 (6), §3.18's rows, T-V1-60, §8.1 (M3b `campLand`), §8.2 (W10), J-V1.104, J-V1.105. |
| G122-V02 | NEW DESIGN per R2-37 (4), (7), R2-36 | WRITTEN | V02 §2.4's `ExteriorDamage`, §5.7 (1)–(8): every building of a returned unit, no per-building share; §8.6. |
| G122-V03 | NEW DESIGN per R2-37 (7), R2-38, R2-36 | WRITTEN | V03 §5.6 (4): `lookLevel` by severity, the drawn level the greater; T-V3-40. |
| G122-V11 | NEW DESIGN per R2-37 (3), R2-35 | WRITTEN | V11 §3.25.9 (look rows, `settings`, `map` rows), registry rows 107–108, T-V11-46 (takes T122-4), C4b/C9. |
| G122h-V11 | NEW DESIGN per R2-37 (3) | WRITTEN | V11 §3.25.9's `settings`: `areaPerHeadM2` 45, `enginesPerBesiegers` 1 500 with ranges and provenance. |
| G123-V02 | NEW DESIGN per R2-38 (4), R2-35 | WRITTEN | V02 §5.7 (2) reads V03's thresholds only; T-V2-59 takes T123-5. Its roofless scope differs from V03's: VAF-R2T-03. |
| G123-V03 | NEW DESIGN per R2-38 (1)–(4), R2-35, R2-36 | WRITTEN | V03 §3.11 *Decay re-cuts no plan*, §5.1 *The plan in ruin*, §5.6 (1)–(8); T-V3-39 takes T123-1, -2, -4, -6, -7. Roofless scope: VAF-R2T-03. |
| G123-V11 | NEW DESIGN per R2-38 (2), (3) | WRITTEN | V11 §3.25.10 (`damage.elements` ranges by kind, `defaultAgeYears` 40, `damage.materials`), §2.8d's types, rows 109–110, T-V11-47. |
| G124-V11 | NEW DESIGN per R2-39 (e), R2-35 | WRITTEN | V11 §2.8's `WeatherSpells`, `ClimateSettings`; §3.25.11's cells, sites and the two hard rules (owner-stamped caps); T-V11-48 takes T124-3's and T124-4's clauses. |

All 33 round-1 ids are closed: 15 FIXED and 18 owner-item parts WRITTEN. What the round-2 text newly gets wrong is
below under fresh ids.

## Issues (7: 0 blockers, 6 major, 1 minor)

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VAF-R2T-01 | major | DISAGREE | model | The damage layer has two rules for a roofless wing's roof bays. §2.6 step 7 (l.2085–2086) calls the threshold test "the one comparison every reader makes": an element is damaged when the level reaches its t, otherwise not. V03 §5.6 (2) (c) (l.2697–2702) and V02 §5.7 (2) (l.3064–3066; X34, T-V2-59 (b)) also mark every roof bay over a room of a roofless wing (`RoofSpec.kind 'none'`: the decline's `decayed` and `ruined` states, a fire's `charred` shell) as damaged, whatever its threshold. That is what keeps the inside and the outside in agreement (item 123 (d)): V06 §3.23 (2) starts a `decayed` building at level 1/3, and V11's `roofBay` range is 0.40–0.66 (l.4596). So a newly roofless building has no roof over it on the exterior, while under §2.6's one comparison every roof bay in its plan stays intact. The rule is shared by two volumes but stated only in them, and the base's home denies it. | §2.6 step 7, after the comparison sentence: "One case has no threshold: while a building is `decayed` or `ruined` — in a decay run, or read at V11's default age with no run in the log (V06 §3.23 (4)) — every roof bay over a room of a wing whose `RoofSpec.kind` is `none` (the decline's roofless state, a fire's charred shell) is damaged whatever its t, so the plan's open ceilings are the roof the exterior lacks (item 123 (d)); nesting holds, the state only climbing while the run lasts; a standing wing an author roofed `none` keeps its plan unchanged. V03 §5.6 (2) (c) and V02 §5.7 (2) cite this." Rendering writes §8.6's end in the same round (VAF-R2T-02; R2-05). |
| VAF-R2T-02 | major | DISAGREE | rendering | §8.6 *The damaged plan* (l.13839–13841) draws "each plan element whose threshold t … its decay level reaches … damaged, every other element as built". That forbids V03 §5.6 (2) (c)'s and V02 §5.7 (2)'s roofless rule: a roof bay of a roofless wing below its threshold is drawn as built (a ceiling) by §8.6 and open by V03, under an exterior V02 draws with no roof. Same defect as VAF-R2T-01, at the drawing's base home. | §8.6: "… is drawn damaged — and every roof bay over a room of a roofless wing of a `decayed` or `ruined` building, whatever its t (§2.6 step 7's one case without a threshold; V03 §5.6 (2) (c)) — every other element as built." |
| VAF-R2T-03 | major | DISAGREE | V03 | V02 and V03 scope the roofless rule differently. V02 §5.7 (2), X34 (l.4095) and T-V2-59 (b) (l.3686) apply it to every roofless building — "roof kind `none`, the model's `decayed`, `ruined` and `charred` states" — so its plan's every roof bay is open. V03 §5.6 (2) (c) (l.2697) and its hand-off row to V02 (l.3236, "a wing a decay run leaves roofless") apply it only "in a decay run". V06 §3.23 (4) puts several buildings in no run: those generated `decayed` or `ruined`, those first met so in item 113's replay, and every building before M6-E. Each reads at V11's default age (`defaultAgeYears` 40). A masonry one then lands below the `roofBay` range: ashlar 0.008 × 40 → 1/3, rubble 0.44, brick 0.48, against 0.40–0.66, and before V11's rows ship every `decayed` building sits at 1/3. For such a building, V03 leaves roof bays intact in the plan where V02's exterior shows no roof, and T-V2-59 (b) fails on the fixture V03 draws. | V03 §5.6 (2) (c): "**(c) Roofless** — while the building is `decayed` or `ruined` (in a decay run, or read at V11's default age with no run in the log, V06 §3.23 (4)) and a wing's roof kind is `none` (§2.6's `RoofSpec`: …), every roof bay over a room of that wing is damaged whatever its threshold (§2.6 step 7) …; once the building's state is `decayed`, each such bay counts as reached for (b) …". V03 §13's V02 row (l.3236): "every roof bay of a roofless wing of a `decayed` or `ruined` building damaged". V03 §3.13's damage-layer row adds the edge "a building generated `decayed` in masonry, and every `decayed` building before M6-E: every roof bay of its roofless wings damaged". T-V3-39 (b) adds that fixture. |
| VAF-R2T-04 | major | DISAGREE | pipeline | Two units disagree on what land a camp may take. V01 §3.16 calls `campLand` "the outskirts' land a camp look may take" (l.2360–2371). It is never wood, marsh, quarry, garden or orchard, and lies within `camp.reachM`. V01 §1b's wiring row (l.283) names `beyondWalls` among its readers, and R2-37 (5) rules "The outskirts' land is V01's `campLand` … §10.2's placement rules rank them". But §10.2 *Crisis looks* (d)'s `beyondWalls` (l.15376–15378) takes "the land faces at least `siegeStandoffM` beyond … (`campLand`'s **and the hinterland's land-use faces** there)": any wood, orchard, quarry, marsh or crop field, at any distance. `approachRoads` (l.15379) defines a second, unbounded set of "verges of each arterial" beside `campLand` (2)'s. (e)'s cap, "`densityCap` of the outskirts' free land" (l.15399), then has no single denominator. So the siege camps stand on land V01 says no camp takes, and the cap's base differs with the reader. | §10.2 *Crisis looks* (d): "`beyondWalls` — the `campLand` faces (V01 §3.16) lying at least `siegeStandoffM` beyond the outermost standing enceinte's outer strip along its walled arcs; a closure arc with no wall draws none"; "`approachRoads` — `campLand`'s verges of each arterial leaving the settlement (V01 §3.16 (2)), one camp per road; a road with none, and a place no road reaches (…), take the `campLand` nearest its boundary"; (e): "together at most `densityCap` of `campLand`'s free land". (f)'s trenches, earthworks and burned farmsteads, which are no camp, keep their own places. V01 §1b's `campLand` row then reads "`approachRoads`" for "`approachRoads`' fallback" (V01's end, R2-05). |
| VAF-R2T-05 | major | DISAGREE | V09 | R2-14's class persists outside the six members. V09 §1b's table *The dossier facts this volume shows* (l.409) still reads "a building specified as grand · a dossier record naming a manor, hall or similar (V08's "specified", item 115 (c)) · §4.7 S10b's ceiling, lifted for it". R2-14 retires "hall or similar record" as vaguer than the home: a `town_hall` or `guildhall` record specifies nothing. Both readers of the fact read the home: §4.7 S10b (3), where the ceiling is lifted, and V09 §4.21.5 (2), which shows `info.grand.dossier`. The table row claims the ceiling is lifted, and the why fact "Named in SettlementForge's record" shown, for records S10b does not lift. | V09 l.409's second cell: "a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1) — V08 §3.16 (3)'s "specified", item 115 (c)". |
| VAF-R2T-06 | major | DUPLICATE-HOME | rendering | §11.2's `MapBrief` writes `raised[].kind: 'viaduct'|'elevated'|'aqueduct'` inline (l.15965). §2.7 declares `type RaisedKind = 'viaduct'|'elevated'|'aqueduct'` (l.2283), and V01, V06 and V11 cite it. The enumeration has two homes, the class R2-13 closes ("a type the base declares is cited by the volumes, never declared twice"). Noted for other seats in round 1 and raised by none. | §11.2 l.15965: `kind: RaisedKind /* §2.7 */`. |
| VAF-R2T-07 | minor | BROKEN-REFERENCE | V09 | V09 §4.20.6's raised-way card (l.3145) reads "V06's `RaisedKind` `viaduct` · `elevated` · `aqueduct`". `RaisedKind` is §2.7's (l.2283: "declared here — V06 §2.13 and V11 §2.8c cite it"). Noted for other seats in round 1 and raised by none. | V09 l.3145: "(viaduct, raised road, aqueduct; §2.7's `RaisedKind`)". |

## Checked and agreeing (round 2)

* **The crisis-look chain** (R2-37) across the four members that hold it.
  * §2.9's `crises`, §2.7's standing rule (`week` in [`sinceWeek`, `untilWeek`), never `yearWeek`), and §10.2's shapes
    with their V11 rows. `kind`, `place`, `band`, `scale` as `Record<Rung, …>` over six rungs, `priority`, `lookLevel`
    on the `disaster` row inside [2/3, 1], `CrisisMapRow`'s three sources and the five `settings` cells agree by name,
    type and value. That holds for the readers too.
  * V01's `disasterSource` and `disasterDistricts`. Whole districts at TOWN and above, V07's units below. Targets first,
    then fire, flood or scatter, with earthquake as scatter. The share is round(s × n), kept at least as large as the
    matched set. `previewSeverity` for a preview.
  * V02's level and V03's `PlanDamage.level`. Both take the higher of the own level and the look's, with no
    per-building share.
  * The camps' framing between §2.9 and §10.2 (g).
* **The damage chain** (R2-38).
  * V11's `DamageElementKind` holds fourteen kinds. V03 §5.6 (1) maps every plan element to one of them, with V04's five
    below ground, and the base's §6.3 element list agrees.
  * V11's `range` lies inside V06 §3.23 (2)'s thirds, and `lookLevel` lies inside `ruined`'s third.
  * `defaultAgeYears` and the material rates are read by V06 §3.23 (2)–(4).
  * V02 reads V03's thresholds only, never its own. "No re-cut under decay" agrees across §2.6, V02 §3.11 and §3.18, and
    V03 §3.11. Which plan stands is VM-R2T-01's.
* **Weather** (R2-39).
  * §2.9's cover rule (an arid row, or a winter that does not freeze, draws `snow` as `clear`) agrees with §8.2 and with
    V11 §3.25.11's hard rules.
  * The arid row's cells keep within the owner-stamped caps under the largest site factor: rain 0.3 × 1.3 ≤ 0.5, over
    6 weeks ≤ 8.
  * `light: 'time'` gates the kinds' hours.
* **Find** (R2-32 – R2-34).
  * `FindChip`'s kind chip `{ classes }` is what V01's `gapUnits` takes. Its address chip's `FindArea.id` is V01 §5.4's.
  * V03's `findRooms` targets cover the address chips.
  * "Served" is counted once, by V11 §2.3, through `catchmentOf`.
  * Find lands at M5 in V01 and V03.
* **The week** (R2-40). It reads the same in §2.9, §4.11 *The clock* (1)–(2), `EpochInputs.week` and V11 W84/W90. No
  `HostContext.week` or `.realm` is left in the six members.
* **R2-13's moved types.**
  * `DormerRow`, `DormerKind`, `PorchKind`, `TierLay`, `LaidWing`, `HoodRecipe`, `RaisedKind`, `SquareQuotaRow`,
    `RosterSettings`, `NeighbourhoodRequest`/`Result`/`SeamReport`, `GrandeurCeilingRow`/`Settings` and `BuildingClass`
    are each declared once, and the six members cite them.
  * `Use.cls`, `Designation.use` and `PlacementItem.cls` are typed `BuildingClass`.
  * V11 §2.8d holds a citation comment only.
* **R2-26 (d), R2-28, R2-18 (a).**
  * `raisedWays.structure.stripMarginM` (1 m) is in V11 §3.24.2, row 80, T-V11-1 and the C3b line. §4.6 S8 and V01
    §3.17.3 (2) read it, and V01 §3.14 has no `raised.stripMarginM`.
  * `miningCellShare` is stated once, valueless in §4.2 S1 (10) and 0.02 in V11 §3.23.1, and `Terrain.mining`'s comment
    cites S1 (10).
  * `accessForecastMin` 0.5 is II.7.4's, and V11 cites it.
  * The emptied protected dwelling is one wording at §2.6's clamp, §4.11's `relet`, the strike pool and the decline
    ladder.
* **The model's other hunks.**
  * `HoodRecipe`'s `size.small`/`.medium`/`.large` and `green.leafyCourt` are V01 §3.14's cells.
  * `OutlineTemplateId`'s `d_shape` is the key of V01 §3.10.1's weights.
  * `Plot`/`Block.platformSteps` are read by §4.7's step regions. Their edge is VPC-R2-06's.
* **`camp.reachM`.** V01's `hood.constants` row ships whole at M1 (V01 §8.1), so `campLand` at M3b reads a shipped cell.

Noted for other seats (outside the six members): V06 §3.23's lead sentence ("each element shown damaged when the
building's decay level reaches its keyed threshold") will want the roofless case's pointer once VAF-R2T-01 lands.

## Counts

Member texts read at their shared items: model §2 (48 hunks) and the new §2.6 step 7, §2.7, §2.9 paragraphs whole;
pipeline §4.1–§4.13, §10.2, §10.3, II.1–II.7, PART III (65 hunks) and §10.2 *Crisis looks* whole; V01 (69 hunks; §2.3,
§3.16, §5.4 whole); V02 (43 hunks; §2.4, §5.7, §7.8, §8.6 whole); V03 (56 hunks; §5.1, §5.5, §5.6 whole); V11 (99 hunks;
§2.8, §2.8d, §3.25.9 – §3.25.11 whole). Round-1 findings: 33 re-checked — 15 FIXED, 18 owner-item parts WRITTEN, none
persisting. Issues: 7 — 0 blocker, 6 major, 1 minor; by owner: model 1, rendering 2, pipeline 1, V03 1, V09 2.
