from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))
# §2.4
r("""`deckok/<class>` for a deck plot's budget and a class's admission; `slot/<slot>` for a landmark slot's row;
`spec/<culture>/<cls>/<specialisation>` for a stepped specialisation; `cross/<class>` for a way's stair or ramp. Item
109's rows add `under/<table>/<row>` (for example `under/catacomb/count`, `under/dig/classRow`). Each id resolves to the
row's `says` sentence (V11 §3.24) or its note. The solver's read-only explanation
(`PlacementSolver.explain`, V10's BCR-V10-2) reports these ids in `WhyPull.row`, and V06's `UseMove.why` reports them; the clerk (V10) and the siting
panel (V09) resolve each id to its row's `reason` (signature pairs), its family's plain sentence (V11 §3.3.1's `says`
column) or the class row's note.""",
"""`deckok/<class>` for a deck plot's budget and a class's admission; `slot/<slot>` for a landmark slot's row;
`spec/<culture>/<cls>/<specialisation>` for a stepped specialisation; `cross/<class>` for a way's stair or ramp. Item
109's rows add `under/<table>/<row>` (for example `under/catacomb/count`, `under/dig/classRow`); item 111's add
`clim/<biome>` for a climate row's dry-country cell (the oasis chance, the water pull, the sunlight cell), cited with
`drv/water` and `drv/sun`; item 113's add `hist/<type>/<template>` for an event-to-epoch row and `hist/settings` for the
burial threshold and the epoch length. Each id resolves to the row's `says` sentence (V11 §3.24, §3.25) or its note. The
solver's read-only explanation (`PlacementSolver.explain`, §4.7 S10b; item 311) reports these ids in `WhyPull.row`, and
V06's `UseMove.why` reports them; the clerk (V10) and the siting panel (V09) resolve each id to its row's `reason`
(signature pairs), its family's plain sentence (V11 §3.3.1's `says` column) or the class row's note.""")
r("""for a term of §4.5's prosperity field (`drv/sun` for item 102's daylight term, `drv/water`, …), which V10's
`FieldDrivers` and the "why is this quarter poor" answer cite. Item 110's rows add (V11C-44 (3)): `rw/<kind>` for a""",
"""for a term of §4.5's prosperity field (`drv/sun` for item 102's daylight term, `drv/water` for item 111's water term,
…), which V10's `FieldDrivers` and the "why is this quarter poor" answer cite. Item 110's rows add `rw/<kind>` for a""")
# §2.5
r("### 2.5 The goods columns on `ResourceRow` (BCR-V11-3)", "### 2.5 The goods columns on `ResourceRow`")
r("interface ResourceRow {   // §10.2's resources, typed here (the base names it inline); the goods table of g items 105 (b) and 107 (b)",
  "interface ResourceRow {   // §10.2's resources, declared here (item 434); the goods table of items 105 (b) and 107 (b)")
r("label: string; icon?: string /* the display cells (BCR-V9-8; V11 §2.3): its words V11 §3.7.1's; no shipped row states an icon */;",
  "label: string; icon?: string /* the display cells (V11 §2.3): its words V11 §3.7.1's; no shipped row states an icon */;")
r("a hinterland face of `landUse` is a provider of the good (BCR-V11-18) */;", "a hinterland face of `landUse` is a provider of the good (§4.2 S2, §4.7 S10b; item 288) */;")
# §2.6
r("### 2.6 Ladder steps (BCR-V11-4)", "### 2.6 Ladder steps")
r("for a METROPOLIS kind (V11C-13) */;", "for a METROPOLIS kind */;")
# §2.7
r("### 2.7 Walls on natural barriers (BCR-V11-5)", "### 2.7 Walls on natural barriers")
r("""    the class as its grade and this kind as the barrier it stands on; 'enceinte' is V06's later-ring rule, never a row
    (V11 §3.16.1; SS-15, SCC-01) */ }""", """    the class as its grade and this kind as the barrier it stands on; 'enceinte' is V06's later-ring rule, never a row
    (V11 §3.16.1) */ }""")
r("`raider` is a standalone and pack key only — the line has no raid or piracy word (V11C-10 (3)) */;", "`raider` is a standalone and pack key only — the line has no raid or piracy word */;")
r("rule?: 'islandRim' /* an arc of a sky island's rim chain, by rule (V05 §3.21) */ }", "rule?: 'islandRim' /* an arc of a sky island's rim chain, by rule (V05 §3.21) */ }", 1)
# §2.8
r("""### 2.8 The row types the base names without declaring (BCR-V11-7, BCR-V11-8)

The base names these types or rows but types none of them; they are declared here once and added to §10.2 (or §2.6,
§4.9) by the change requests.""", """### 2.8 The row types this volume declares for the base

§10.2 names these row types and cites their declarations here (items 400, 435); §7.7's `CircumstanceSlice.era` names an
`EraRow` key.""")
r("""  rainMmPerYear: number /* mm a year: the aqueduct's water balance (V11 §3.24.6) */ }""",
"""  rainMmPerYear: number /* mm a year: the aqueduct's water balance (V11 §3.24.6) */;
  // item 111's dry-country cells (V11 §3.17.1; their readers registry row 43):
  arid: boolean /* the base's "arid row": S0's water rows read aridChance and P(oasis) is oasisChance (§4.2 S0); false: P(oasis) 0 */;
  aridChance: { river: number; lake: number; coast: number } /* × the rung feature table's P(river), P(lake), P(coast) on an arid row, each [0, 1] */;
  oasisChance: number /* share: P(oasis) on an arid row */; oasisNoWaterFactor: number /* × oasisChance when no river, lake or coast was drawn; the product capped at 1 */;
  oasisAreaHa: [number, number] /* the oasis water body's area band (§4.2 S1 (2)) */; gardenFactor: number /* the irrigated gardens' area ÷ the oasis water area (§4.9) */;
  channelReachM: number /* m: the gardens lie within this of the water */; groveBandM: number /* m: the grove's shore band */;
  grove: { species: string; share: number }[] /* the grove's trees (§4.9's oasis grove row), shares summing to 1 */;
  w_water: number /* the growth field's water-pull weight, [0, 0.9] (§4.2 S3 (6): below 1) */; pullRadiusM: number /* m: q(x) falls to 0 here */;
  w_waterP: number /* the prosperity field's water weight (§4.5) */;
  sunlight: number /* item 111 (c), [−1, 1]: × w_sun (§4.5), × ClassMixRow.sun (§4.7 S10b) and × V07's village sun terms; 1 is item 102 as filed */;
  wellYieldWeight: number /* weight: the well and public-fountain classes' extra term on the plot's well yield (§4.7 S10b) */;
  wellCoverageFactor: number /* (0, 1]: × the water-supply family's walking-coverage radius (§4.7 S10b) */ }""")
r("""  attic: boolean; parapetCm: number /* cm */; towerStoreyCm?: number /* cm: a tower storey; absent reads storeyCm.upper */ /* the three columns of V02's BCR-V2-26 (V2 §3.10.6), read by V02's M11 */ }""",
"""  attic: boolean; parapetCm: number /* cm */; towerStoreyCm?: number /* cm: a tower storey; absent reads storeyCm.upper */ /* the three columns V02 §3.10.6 reads */ }""")
r("""  role: string /* the structure name the template families use; V02's `composition.roleKeys` maps it to a composition key (V2 §3.10.4) */; footprintShare: number /* share of the footprint budget */; houses: boolean }""",
"""  role: string /* the structure name the template families use; V02's `composition.roleKeys` maps it to a composition key (V02 §3.10.4) */; footprintShare: number /* share of the footprint budget */; houses: boolean }""")
r("""interface DistrictKindAffinity { tag: string /* a class tag (V11 §3.5.1) */; band?: [string, string] /* the classes' band within */; weight: number }   // BCR-V11-17's DistrictKindRow.affinity entry""",
"""interface DistrictKindAffinity { tag: string /* a class tag (V11 §3.5.1) */; band?: [string, string] /* the classes' band within */; weight: number }   // §10.2's DistrictKindRow.affinity entry (item 438)""")
r("""  villageSeat: string /* the seat's v.<id> class at village rungs (V07 §3.11 DR11; V11 §3.21.1): `@seat` binds it there (SS-06) */;""",
"""  villageSeat: string /* the seat's v.<id> class at village rungs (V07 §3.11 DR11; V11 §3.21.1): `@seat` binds it there */;""")
r("""interface GoodWordRow {   // table 'dossier.goodWords' (registry row 65) — V11's own shape, as LadderStepRow is (SS-25); its reader is V11 §3.13.5's matching rule, applied by V08's adapter""",
"""interface GoodWordRow {   // table 'dossier.goodWords' (registry row 65) — V11's own shape, as LadderStepRow is; its reader is V11 §3.13.5's matching rule, applied by V08's adapter""")
r("""interface ArchetypeVillageCell {   // the optional `village` cell of a dossier.archetypes row (V08's shape carries it, V11 §10b X-V11-6); read at village rungs BEFORE villageForm (V11 §3.13.2; V07 §2.4, J-V7.78; SS-09)""",
"""interface ArchetypeVillageCell {   // the optional `village` cell of a dossier.archetypes row (V08 §2.6's shape carries it); read at village rungs BEFORE villageForm (V11 §3.13.2; V07 §2.4, J-V7.78)""")
r("""  yard: { part: string; share: number }[] /* the yard parts and their shares (V11 §3.6.1; the `churchyard` part of a church or cathedral plot and the `burial` part of a cloister or burial ground are the burial faces, V04 §3.5.1 (1) (a) and (d); SR1-03) */;""",
"""  yard: { part: string; share: number }[] /* the yard parts and their shares (V11 §3.6.1; the `churchyard` part of a church or cathedral plot and the `burial` part of a cloister or burial ground are the burial faces, V04 §3.5.1 (1) (a) and (d)) */;""")
r("""interface TemplateDef { id: string /* 'desc.district', 'desc.building', 'chronicle.wallToWay' … */; lines: { text: string; weight: number; when?: GrammarDef['rules'][string][number]['when'] }[]; fallback: string }
```""",
"""interface TemplateDef { id: string /* 'desc.district', 'desc.building', 'chronicle.wallToWay' … */; lines: { text: string; weight: number; when?: GrammarDef['rules'][string][number]['when'] }[]; fallback: string }
interface HistorySettings {   // table 'history' (registry row 92), its named row 'settings' (item 113; V11 §3.25.1)
  replay: boolean /* the history-first path's switch: false = generation as without replay (§4.11's no-op pin); a switch, not calibratable */;
  epochYears: number /* yr: a coarse epoch's span */; symbolicQuantile: number /* share: where in the tier's population range the effective peak is sized */;
  burialYears: number /* yr: ruins older than burialYears_eff lie buried */;
  burialFactor: { flood: number; silt: number; rebuilt: number; bareRock: number } /* × burialYears for each condition that holds (V11 §3.25.2) */;
  burialBoundsYears: [number, number] /* the clamp on burialYears_eff */;
  reuseCost: number /* × a lattice edge's cost along a ruined way's trace (§4.3's existingFabricCost) */ }
interface HistoryEventRow {   // table 'history' (registry row 92), keyed 'type/template': the event-to-epoch rows (item 113 (a) (2); V11 §3.25.3)
  type: string /* a history event's type word as V08 reads it (economic, political, disaster, religious, magical, demographic, occupation_infiltration, exile_return) */;
  template: string /* the event's templateType, or '*' for the type's default row */;
  words?: string[] /* name or description words that select this row when the event carries no templateType */;
  effects: EventEffectRow[]; says: string }
type EventEffectRow =   // each becomes one of V06 §2.14's ReplayEffects; severity s ∈ [0, 1] is the event's (V08's severity words)
  | { kind: 'hazard'; hazard: string /* a V06 HazardRow kind */; minSeverity: number }
  | { kind: 'condition'; archetype: string /* a ConditionOverlay archetype */; weeksAtFull: number /* × s */ }
  | { kind: 'slice'; threatStep?: number; disorderStep?: number; wealthStep?: number /* each × s, signed, the result clamped to [0, 1] */ }
  | { kind: 'request'; cls: string /* a roster class */; count: Partial<Record<'TOWN'|'CITY'|'METROPOLIS', number>>; minSeverity: number }
  | { kind: 'population'; factorAtFull: number /* the epoch's target × (1 − (1 − factorAtFull) × s) */ }
  | { kind: 'destroy'; minSeverity: number };
interface BaseSettings {   // table 'base.settings' (registry row 93), one row 'settings' (W-SET-01; V11 §3.1)
  index: { gridCellM: { L0: number; L1: number; L2: number; L3: number; L4: number } } /* m: the dynamic uniform grid's cell per level (§3.3) */;
  reroll: { maxAdvance: number } /* New random's advance bound (§5.1 (6)) */;
  crossing: { searchBandM: number } /* m: the crossing-site search band (§4.2 S1 (5); §6.3's bridge anchor) */ }
```""")
# §2.8b
r("""### 2.8b The underground content rows (item 109): shapes cited, one cell added

The schemas of the four underground tables whose ROWS this volume writes are V04 §2.3's — `RuinRule` with its
`CultureRow` and `PersistenceClass` (`tables/under/ruin.json`), `OpeningRow` (`openings.json`), `DigRule` (`dig.json`)
and `CatacombRule` (`catacomb.json`) — cited, never restated (single source; V4C-63). The values are V11 §3.23's, and
V04's defaults table reads them. This volume needs one cell V04's shape lacks, requested in V11 §10b (to V04):

```ts
// CatacombRule gains (V11 §10b X-V11-4):
order: Record<'TOWN'|'CITY'|'METROPOLIS', ('network'|'burial'|'quarryOssuary')[]>   /* the candidate classes in the order they are tried; inside a class, V04 §3.5.1 (2)'s rank by the burials served (J-V11.36) */
```

`growthCapShare` is read as a share PER YEAR compounded over an epoch's span (V06's J-V6.53 reading, V11 §3.23.8), so
V04's field needs no second cell. Two cells of `roster.settings` (V11 §3.5.1) join them: `crypt.rankShare` (the
crypt rank, read by V03 §3.7.4 and V06 §3.18.3) and `coverage.rosterWeight` (V11C-07). The cavern cell g leaves open,
`miningCellShare`, is a cell of `under.systems`' cavern row (II.7.6; registry row 59).""",
"""### 2.8b The underground content rows (item 109): shapes cited

The schemas of the four underground tables whose ROWS this volume writes are V04 §2.3's — `RuinRule` with its
`CultureRow` and `PersistenceClass` (`tables/under/ruin.json`), `OpeningRow` (`openings.json`), `DigRule` (`dig.json`)
and `CatacombRule` (`catacomb.json`, its `order` cell holding V11 §3.23.8's candidate order) — cited, never restated. The
values are V11 §3.23's; V04 §2.3's defaults table cites them. `growthCapShare` is read as a share PER YEAR compounded over
an epoch's span (V06's J-V6.53 reading, V11 §3.23.8), so V04's field needs no second cell. Two cells of
`roster.settings` (V11 §3.5.1) join them: `crypt.rankShare` (the crypt rank, read by V03 §3.7.4 and V06 §3.18.3) and
`coverage.rosterWeight`. Three cells of base tables take V11's values: `miningCellShare` of `under.systems`' cavern row
(II.7.6; registry row 59), `access.ruinGain` of `under.rule` (II.7.3; registry row 57) and `UndercityRule.sourceRank`
(II.7.5; registry row 59), the void-source rank V04 §2.3 reads (V11 §3.23.1, §3.23.6, §3.23.7).""")
# §2.8c
r("""### 2.8c Item 110's row types (owner ~23:30 "they go in", (b) as revised ~23:40; V11C-33 – V11C-45)

The base mechanisms (the `RetainingWall` record and its levelling, the raised parts and their course solver, the deck
plots and their cutter, the stepped massing) are file g item 110's, applied by the coherence pass, and V02's tiers
(J-V2.62); these are the ROWS those mechanisms read, declared once here and written in V11 §3.24 (BCR-V11-8's declared
types gain them).""", """### 2.8c Item 110's row types

The base mechanisms (the `RetainingWall` record and its levelling, the raised parts and their course solver, the deck
plots and their cutter, the stepped massing) are item 110's, and V02's tiers (J-V2.62); these are the ROWS those
mechanisms read, declared once here and written in V11 §3.24 (§10.2 cites them, item 435).""")
r("""  coverShare: number }              // share: V09 §4.20.1 (3)'s flat test — the least share of the stroke's stations below stepMinCm and slopeMin for the run to be flat (IN-V11-2; SCC-19)""",
"""  coverShare: number }              // share: V09 §4.20.1 (3)'s flat test — the least share of the stroke's stations below stepMinCm and slopeMin for the run to be flat""")
r("""interface RetainingSettings {       // one row 'settings' of the same entry (V11 §2.1's settings form; reconciliation round 6, SCC-104)""",
"""interface RetainingSettings {       // one row 'settings' of the same entry (V11 §2.1's settings form)""")
r("""    landmarkMinSignificance: number /* the least class significance (§10.2; item 72) of a dossier-bound institution that counts as a landmark, V11 §3.24.7 (4), DR-V8.8; SCC-R2C-10 */ };""",
"""    landmarkMinSignificance: number /* the least class significance (§10.2; item 72) of a dossier-bound institution that counts as a landmark, V11 §3.24.7 (4), DR35 */ };""")
r("""  span: {                                                          // V04 BCR-45's span rule (reconciliation round 6, SCC-104; J-V11.96)""",
"""  span: {                                                          // item 244's span rule (J-V11.96)""")
r("""  capShare: number; capMin: number } // share of S2's building count, ≤ 0.001 (V02 X17); the cap is at least capMin where chance > 0;
                                    // at village rungs the cap is V07's rules.tiers.capPerSettlement, per settlement (V11 §3.24.3; SS-31)""",
"""  capShare: number; capMin: number } // share of S2's building count, ≤ 0.001; the cap is at least capMin where chance > 0;
                                    // at village rungs the cap is V07's rules.tiers.capPerSettlement, per settlement (V11 §3.24.3)""")
r("""  minSpanM?: number }               // bridgeMid: the least span that has a mid-bridge slot (V09's constant, moved here)""",
"""  minSpanM?: number }               // bridgeMid: the least span that has a mid-bridge slot (V09 §4.20 reads it)""")
r("""interface WaterNeedRow {            // table 'water' (row 85); one row 'default'
  perHeadL: number;                 // litres a day a head drinks, cooks and washes with
  wellsPerHa: Record<'alluvial'|'default'|'soluble'|'volcanic', number>; wellYieldM3: number;
  roofShare: number; captureShare: Record<'arid'|'maritime'|'other', number> }""",
"""interface WaterNeedRow {            // table 'water' (row 85); one row 'default'
  perHeadL: number;                 // litres a day a head drinks, cooks and washes with
  wellsPerHa: Record<'alluvial'|'default'|'soluble'|'volcanic', number>; wellYieldM3: number;
  roofShare: number; captureShare: Record<'arid'|'maritime'|'other', number>;
  wellYield: Record<'alluvial'|'gravel'|'lowGround'|'default'|'rock', number>;   // item 111 (b): the well-yield raster's value by ground class, [0, 1] (§4.2 S1 (10); V11 §3.24.6)
  geologyYield: Record<'ordinary'|'soluble'|'volcanic', number>;                 // × wellYield by the site's geology flag
  topYield: number }                                                            // share: the least yield of "the top well-yield class" (§4.2 S3 (6), §4.5)""")
r("""`BuildingClassRow` gains (BCR-V11-1 amended) the compiled column `deckOk: DeckKind[]` (absent = `[]`, never on a deck;
V11 §3.24.4), and `siting.declared`'s `use:` rows gain the cell `specialisation?` (V11 §4.2). The culture rows gain the
`building` block (V11 §3.20.3), `EraRow` the two factors and `ClimateRow` `rainMmPerYear` (V11 §2.8).""",
"""`BuildingClassRow` carries the compiled column `deckOk: DeckKind[]` (§10.2; absent = `[]`, never on a deck; V11
§3.24.4), and `siting.declared`'s `use:` rows the cell `specialisation?` (V11 §4.2). The culture rows carry the `building`
block (V11 §3.20.3), `EraRow` the two factors and `ClimateRow` `rainMmPerYear` (V11 §2.8).""")
# §2.9
r("""V07's `v.chapel` a crypt-less chapel of ease, V11's `chapel` a `basement` one (J-V11.58; SS-01). A `villageForm` names a""",
"""V07's `v.chapel` a crypt-less chapel of ease, V11's `chapel` a `basement` one (J-V11.58). A `villageForm` names a""")
build('05-s2b', [(513, 777)], R)
