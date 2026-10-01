# edits_a: §0, §1 with §1b, §2.1, §2.4, §2.6, §2.8, §2.8b, §2.8c, §2.8d, §2.10
H0 = "## 0 In plain words"
H1 = "## 1 Scope, the base hooks consumed, and what is out of scope"
H21 = "### 2.1 The table registry"
H24 = "### 2.4 Relation families, signature pairs and the derived rows"
H26 = "### 2.6 Ladder steps (file f items 510, 520)"
H28 = "### 2.8 The row types the base names without declaring (file f items 400, 435)"
H28b = "### 2.8b The underground content rows (item 109): shapes cited, one cell added"
H28c = "### 2.8c Item 110's row types"
H28d = "### 2.8d The row types of items 113–119"
H210 = "### 2.10 Lifecycle of every new state field"

EDITS = [
# ---------------------------------------------------------------- §0
(H0,
 "many colours (item 117); and what a festival hangs in the streets at each size of settlement (item 118). Every one of\n"
 "these is a row the user can change, and with every one switched off the map is exactly what it was before.\n",
 "many colours (item 117); and what a festival hangs in the streets at each size of settlement (item 118). Every one of\n"
 "these is a row the user can change, and with every one switched off the map is exactly what it was before.\n"
 "\n"
 "The owner's rules of 1 October add three more, each a look or a drawing that never changes the map: what a\n"
 "SettlementForge crisis shows while it lasts — a siege's camps, a refugee camp by a gate, a quarantine camp, bare fields,\n"
 "ruined quarters — how large for the size of the place and the forces the dossier names, and in what turn camps take the\n"
 "outskirts (item 122); in what order a ruined building's doors, floors, walls and roof give way, and how fast each\n"
 "building material decays (item 123); and how often, through the year and by climate, a shower, a mist or a snowfall\n"
 "passes over the map — never snow where winter does not freeze, and rain rare in the desert (item 124).\n",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §1 (c)
(H1,
 "item 110's rows (V11 §3.24); the rows of items 111 and 113–119 (V11 §3.25); and the display words with Find's lexicon of",
 "item 110's rows (V11 §3.24); the rows of items 111, 113–119 and 122–124 (V11 §3.25); and the display words with Find's lexicon of",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
# the base hooks consumed: items 122-124
(H1,
 "| the gazetteer's class counts and match listing under knowledge admission (item 120) | §11.2 | Find's lexicon: the class rows' words and the profile families' groups (V11 §2.3, V11 §3.4) |\n",
 "| the gazetteer's class counts and match listing under knowledge admission (item 120) | §11.2 | Find's lexicon: the class rows' words and the profile families' groups (V11 §2.3, V11 §3.4) |\n"
 "| the crisis looks: `ConditionOverlay` read for a look, the derivation row, the crisis table's shape and placement rules, the look rows by band (item 122) | §2.7, §7.7's DR44, §10.2, §8.2 | the look, mapping and settings rows of `crisis.looks` and `crisis.map` (V11 §3.25.9) |\n"
 "| the damage layer over the one plan: one keyed threshold per plan element, compared with the decay level (item 123) | §2.6 step 7, §6.3; V06 §3.23 | the threshold ranges by element kind, the default age and the decay rates by material (V11 §3.25.10) |\n"
 "| the weather effects: the session-seeded weather stream, the effect marks and light terms (item 124) | §6.1, §8.2, §8.4 (i), §2.9 | the climate rows' weather cells and the `settings` row's weather block (V11 §3.25.11) |\n",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
# out of scope
(H1,
 "`tables/evolution.json`); the style sheets and palette values, the season, cover, `ice`, `snow` and decoration draw rows\n"
 "(§8.2); the prices,",
 "`tables/evolution.json`); the style sheets and palette values, the season, cover, `ice`, `snow`, decoration, crisis-look and\n"
 "weather-effect draw rows (§8.2); item 122's placement rules (§10.2); item 123's decay level and the damaged plans' drawings\n"
 "(V06 §3.23; V03, V02, V04); item 124's weather timeline (§6.1);\nthe prices,",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §1b
(H1,
 "with item 111's dry-country cells and item 117's season cells (V11 §3.25.1, V11 §3.25.6) | this volume | row 43 | §4.9; §4.2 S0, S1, S3 (6), §4.5, §4.7 S10b (item 111); §8.2 (item 117) |",
 "with the farm-mode override `farmLayout`, item 111's dry-country cells, item 117's season cells and item 124's weather cells, and the table's `settings` row (V11 §3.17.1, V11 §3.25.1, V11 §3.25.6, V11 §3.25.11) | this volume | row 43 | §4.9; §4.2 S0, S1, S3 (6), §4.5, §4.7 S10b (item 111); §8.2 (item 117); §6.1, §8.2, §8.4 (i) (item 124) |",
 1, ['VAF-R1T-02', 'G124-V11']),
(H1,
 "the climate word → biome by V08's `climates` row set; `oasis_water` → the oasis (DR1) |",
 "the terrain type → biome by V08's `climates` row set (§7.7's DR42; item 125 (b)); `oasis_water` → the oasis (DR1) |",
 1, ['G124-V11']),
(H1,
 "II.7.3 *Basement accesses*; V04 §2.3's `OpeningRow`, `DigRule` |",
 "II.7.3 *Basement accesses*; V04 §2.3's `UnderOpeningRow`, `DigRule` |",
 1, ['VPC-R1-07']),
(H1,
 "| the base (item 109); V11 §3.23.1 | rows 9, 59 | §4.2 S1 |",
 "| the base (item 109); V11 §3.23.1 | rows 9, 59 | §4.2 S1 (10) (`Terrain.mining`'s test) |",
 1, ['R2-28 (a)']),
(H1,
 "| the field's driver table; W4 | V10's `WhyPull.row` and `FieldDrivers`, V09's siting panel |",
 "| the field's driver table; W4 | §11.2's `WhyPull.row` and `FieldDrivers`, V09's siting panel |",
 1, ['VAH-r1-10']),
(H1,
 "| W50 | `raisedWays` with its `settings` and `structure` (V11 §3.24.2) | V11 §3.24.2 rows | row 80; V08's DR35 (its landmark threshold, W74) |",
 "| W50 | `raisedWays` with its `settings` and `structure` (V11 §3.24.2; `structure.stripMarginM` the under-deck strip's margin) | V11 §3.24.2 rows | row 80; V08's DR35 (its landmark threshold, W74); §4.6 S8's under-deck strip, V01 §3.17.3 (2), V06 §3.19's clearance (`stripMarginM`) |",
 1, ['R2-26 (d)']),
(H1,
 "| §2.7 `Enceinte.condition`, §7.1 `repairWall`, §7.7 |",
 "| §2.7 `Enceinte.condition`, §7.1 `repairWall`, §7.7's DR41 |",
 1, ['VAH-r1-19 (R2-11)']),
(H1,
 "| a dossier-bound record of a `grandClasses` class, or a seigneurial government's forced manor, specifies a grand building (V08 §3.16 (3)) |",
 "| 'specified' is V08 §3.16 (3)'s reading |",
 1, ['VV78-04']),
(H1,
 "| §2.9 view state, §7.7's calendar row, §8.2, §12.5 | the dossier's calendar week and season (V08), the climate by V08's `climates` row set |",
 "| §2.9 view state, §7.7's DR42, §8.2, §12.5 | the present week from the dossier's own stamped ticks and the climate by V08's `climates` row set (item 125) — §7.7's DR42 |",
 1, ['VAH-r1-19']),
(H1,
 "| §2.9, §7.7's `traditions` row, §8.2, §12.5 | `traditions[]` (window, staging, kind by V08's `festivals` row set), `culturalIdentity`, deities |",
 "| §2.9, §7.7's DR43, §8.2, §12.5 | `traditions[]` (window, staging, kind by V08's `festivals` row set) and `customContentRoster.traditions`; `site.culture` (from `config.cultureProfileKey`, V08 §2.4) and the deity — §7.7's DR43 |",
 1, ['VAH-r1-19', 'VAH-r1-21']),
(H1,
 "| §11.2's gazetteer (item 120) | — (the dossier's institution names are V08's list entries, never lexicon words) |",
 "| §11.2's gazetteer (item 120) | — (the dossier's institution names are V08's list entries, never lexicon words) |\n"
 "| W88 | item 122's crisis tables — `crisis.looks` with its `settings` row (item 122 (h)'s rates among its cells) and the closed mapping `crisis.map` (V11 §3.25.9) | V11 §3.25.9; the `map` rows' words from V08's census at the pinned baseline (C4b) | rows 107, 108; V09's Show crises preview list and Find's list of looks (by `label`), V10's explanations, V12's item-122 bars; T-V11-46 | §2.7 `ConditionOverlay`, §7.7's DR44, §10.2 *Crisis looks*, §8.2, §8.8, §12.5 | a standing condition's source — a stressor's `type`, an `activeConditions[]` archetype, a carried simulator event or calamity (V08) — → its `map` row (DR44); the forces', coalitions' and groups' headcounts, else `exodus` and arrivals (item 122 (h); V08) → the camp's size; a calamity's `targets` → its districts (V01) |\n"
 "| W89 | item 123's damage tables — `damage.elements` (the threshold ranges by plan element kind, the `settings` row's default age) and `damage.materials` (the decay rates by walls material) (V11 §3.25.10) | V11 §3.25.10 | rows 109, 110: §6.3's thresholds, V06 §3.23's `decayLevel`, V03's, V02's and V04's drawings, §11.1's battle maps; T-V11-47 | §2.6 step 7, §6.3 *Plan damage*, §8.6, §11.1 | — (the level reads the lineage's lifecycle events; a dossier calamity's ruin reaches them through the epoch path, DR28) |\n"
 "| W90 | item 124's weather cells — the climate rows' `weather` and the `settings` row's `weather` block (V11 §3.25.11) | V11 §3.25.11 | row 43: §6.1's weather stream (the spells), §8.2's effect marks, §8.4 (i)'s light terms, V09's Start a shower now; V12's item-124 bars; T-V11-48 | §6.1 *The weather stream*, §8.2, §8.4 (i), §2.9 | the climate from the dossier's terrain type (§7.7's DR42; item 125 (b)); the week as §2.9 takes it |",
 1, ['G122-V11', 'G122h-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §2.1
(H21,
 "type ColumnUnit = Extract<Unit, 'm'|'m2'|'ha'|'cm'|'cdeg'|'share'|'weight'|'people'|'yr'|'wk'|'m3'|'lvl'|'none'>",
 "type ColumnUnit = Extract<Unit, 'm'|'m2'|'ha'|'cm'|'cdeg'|'share'|'weight'|'people'|'count'|'yr'|'wk'|'s'|'m3'|'lvl'|'none'>",
 1, ['G124-V11']),
(H21,
 "step: switches at the cut; none: not band-keyed */;",
 "step: read by §4.5's discrete-cell rule (a band without a row reads the nearest rowed band below); none: not band-keyed */;",
 1, ['VAF-R0S-20 (R2-16)']),
(H21,
 "`history.events` 'none', `festival.motifs` 'mixed'; V11 §4.1 refuses its delete */;",
 "`history.events` 'none', `festival.motifs` 'mixed', `damage.materials` 'timber_frame'; V11 §4.1 refuses its delete */;",
 1, ['G123-V11']),
(H21,
 "rows 32, 35, 63–66, 76 and 106;",
 "rows 32, 35, 63–66, 76, 106 and 108;",
 1, ['G122-V11']),

# ---------------------------------------------------------------- §2.4
(H24,
 "which V10's `FieldDrivers` and the \"why is this quarter poor\" answer cite.",
 "which §11.2's `FieldDrivers` and the \"why is this quarter poor\" answer cite.",
 1, ['VAH-r1-10 (R2-10)']),
(H24,
 "Items 111–118 add `clim/<biome>/<cell>` (a dry-country or season cell of a\n"
 "climate row), `hist/<event>` (an event-to-epoch row), `wall/<cell>` and `patch/<row>` (a wall-condition cell and a patch\n"
 "material), `ceil/<rung>` (the grandeur ceiling), `fest/<table>/<row>` (a festival row). Each id resolves to its row's\n"
 "`says` sentence (V11 §3.24, V11 §3.25), its `reason` (signature pairs), its family's plain sentence (V11 §3.3.1's `says`)\n"
 "or the class row's note.",
 "Items 111–118 add `clim/<biome>/<cell>` (a dry-country or season cell of a\n"
 "climate row; item 124's weather cells too), `hist/<event>` (an event-to-epoch row), `wall/<cell>` and `patch/<row>` (a\n"
 "wall-condition cell and a patch material), `ceil/<rung>` (the grandeur ceiling), `fest/<table>/<row>` (a festival row);\n"
 "items 122 and 123 add `crisis/<table>/<row>` (a crisis look, named by its `label`, or a mapping row) and\n"
 "`dmg/<table>/<row>` (a damage range or a decay rate). Each id resolves to its row's `says` sentence or `label`\n"
 "(V11 §3.24, V11 §3.25), its `reason` (signature pairs), its family's plain sentence (V11 §3.3.1's `says`) or the class\n"
 "row's note.",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §2.6
(H26,
 "// item 108's step types; V08 §2.3, V08 §2.5, V10 §2.13 and V01 §2.3 type their fields by it",
 "// item 108's step types; V08 §2.3's `CarriedFact`, V08 §2.5's `DossierInstitution.step`, V01 §2.3's district view and §11.2's `WhyAnswer.members.step` type their fields by it",
 1, ['VV1112-r1-04 (R2-10)']),

# ---------------------------------------------------------------- §2.8
(H28,
 "  farmLayout: string /* a §4.9 farm-mode override key or 'none' */;",
 "  farmLayout: 'rows'|'perimeter'|'rivers' /* §4.9: the farm modes' climate override; 'rows' leaves the rung × landscape choice */;",
 1, ['VAF-R1T-02']),
(H28,
 "  dry: ClimateDryCells /* item 111, V11 §3.25.1 */; seasons: ClimateSeasonCells /* item 117, V11 §3.25.6 */ }",
 "  dry: ClimateDryCells /* item 111, V11 §3.25.1 */; seasons: ClimateSeasonCells /* item 117, V11 §3.25.6 */; weather: WeatherSpells /* item 124, V11 §3.25.11 */ }",
 1, ['G124-V11']),
(H28,
 "  grow: [number, number]; harvest: [number, number]; hay: [number, number] | null; ice: [number, number] | null; snow: [number, number] | null }\n",
 "  grow: [number, number]; harvest: [number, number]; hay: [number, number] | null; ice: [number, number] | null; snow: [number, number] | null }\n"
 "type WeatherKind = 'rain'|'drizzle'|'snow'|'mist'|'fog'|'leaves'|'cloudShadow'|'shimmer'|'dust'   // item 124 (a)'s effects in this order (V11 §3.25.11's ties); §8.2's marks and §8.4 (i)'s light terms draw them\n"
 "type WeatherSpells = Partial<Record<WeatherKind, {   // item 124 (c): a climate row's weather cells, values V11 §3.25.11; a kind absent never comes on the row\n"
 "  weeks: [number, number] /* wk: a band of weeks 0–51 (a > b wraps the year's end); two bands of one kind never share a week */;\n"
 "  perHour: number /* count: how often — the mean spells of the kind an hour of clear map */; lengthS?: [number, number] /* s: how long, where it differs from the kind's */ }[]>>\n"
 "interface ClimateSettings {   // the named row 'settings' of the climate table (V11 §2.1's settings form)\n"
 "  aridMin: number /* share: item 111's arid test, V11 §3.25.1 */;\n"
 "  weather: {   // item 124; values V11 §3.25.11\n"
 "    kinds: Record<WeatherKind, { lengthS: [number, number] /* s: a spell's length */; hours?: [number, number] /* the view's hour of day a spell may start in, read under `light: 'time'` (§2.9) */ }>;\n"
 "    sites: Record<'coast'|'riverside'|'hills'|'forest', Partial<Record<WeatherKind, number>>> /* × a live kind's perHour where the site applies; several: the largest */;\n"
 "    forestShareMin: number /* share: the woods' share of the frame's land that makes the `forest` site */;\n"
 "    aridRainMaxPerHour: number /* count: item 124 (c)'s cap on an arid row's rain and drizzle, after the largest site factor */; aridRainMaxWeeks: number /* wk: the weeks they may cover */ } }\n",
 1, ['G124-V11']),

# ---------------------------------------------------------------- §2.8b
(H28b,
 "`CultureRow` and `PersistenceClass` (`tables/under/ruin.json`), `OpeningRow` (`openings.json`),",
 "`CultureRow` and `PersistenceClass` (`tables/under/ruin.json`), `UnderOpeningRow` (`openings.json`),",
 1, ['VPC-R1-07 (R2-12)']),

# ---------------------------------------------------------------- §2.8c
(H28c,
 "  maxClearSpanM: { masonry: number; timber: number };             // m: §2.7's clear-span bound by material class; a generated course past it drops (raised_too_long), a declared one bends\n",
 "  maxClearSpanM: { masonry: number; timber: number };             // m: §2.7's clear-span bound by material class; a generated course past it drops (raised_too_long), a declared one bends\n"
 "  stripMarginM: number;                                           // m: the under-deck strip's margin each side of the deck's ground projection over its piers and spans (§4.6 S8's hole; V01 §3.17.3 (2))\n",
 1, ['R2-26 (d)']),

# ---------------------------------------------------------------- §2.8d
(H28d,
 "### 2.8d The row types of items 113–119\n",
 "### 2.8d The row types of items 113–119 and 122–124\n",
 1, ['G122-V11', 'G123-V11']),
(H28d,
 "Each table is our own and calibratable unless marked (rows 97 and 102–105 are not, in any column: V11 §3.25.4, V11 §3.25.7),\n"
 "its values in V11 §3.25, its switch in V11 §3.24.0.",
 "Each table is our own and calibratable unless marked (rows 97, 102–105 and 108 are not, in any column: V11 §3.25.4,\n"
 "V11 §3.25.7, V11 §3.25.9), its values in V11 §3.25, its switch in V11 §3.24.0. Item 124's weather cells are on\n"
 "`ClimateRow` and `ClimateSettings` (V11 §2.8).",
 1, ['G122-V11', 'G124-V11']),
(H28d,
 "interface GrandeurCeilingRow {      // table 'grandeur.ceiling' (registry row 97); key 'rung' (item 115)\n"
 "  rung: Rung; enabled: boolean /* false on every row = no ceiling (the no-op pin); the parity presets false */;\n"
 "  dwellingFamilies: string[] | 'all' /* V02's composition families a dwelling other than the manor may take */;\n"
 "  towers: boolean; turrets: boolean; gatehouse: boolean; courts: boolean /* on a dwelling other than the manor */;\n"
 "  manor: { max: number | 'unbounded'; requires: 'specified'|'lordOrSpecified'|'none' }; allManorsRow: boolean /* S10b's rich row \"all manors\" applies */ }\n"
 "interface GrandeurCeilingSettings { // the named row 'settings' of the same table (V11 §2.1's settings form)\n"
 "  grandClasses: string[] }          // the classes whose dossier-bound record SPECIFIES a grand building (V08 §3.16 (3)): live roster.classes keys, V11 §3.25.4\n",
 "// GrandeurCeilingRow and its named row 'settings' (GrandeurCeilingSettings, grandClasses): §10.2's shape (item 115 homes it there); table 'grandeur.ceiling' (registry row 97), rows V11 §3.25.4\n",
 1, ['VPC-R1-01 (R2-13)']),
(H28d,
 "  gainBar: string /* the bar id the gain is measured by (§13, V12) */; gain: number; run: string /* the CalibrationRun id that measured it */ }\n",
 "  gainBar: string /* the bar id the gain is measured by (§13, V12) */; gain: number; run: string /* the CalibrationRun id that measured it */ }\n"
 "// item 122: CrisisLookRow with its named row 'settings' (CrisisLookSettings) — table 'crisis.looks', registry row 107 — and CrisisMapRow —\n"
 "// table 'crisis.map', row 108 — are §10.2's shapes (item 122 homes them there); their rows V11 §3.25.9\n"
 "type DamageElementKind = 'furniture'|'door'|'window'|'partition'|'roofBay'|'upperFloor'|'stair'|'outerWall'|'groundFloor'\n"
 "  |'cellarVault'|'cellarWall'|'cryptTomb'|'cryptVault'|'cryptWall'   // item 123: a plan element's kind (§6.3 *Plan damage*); V03 gives each plan element its kind, V04 §5.6 the five below ground\n"
 "interface DamageElementRow {        // table 'damage.elements' (registry row 109); key 'kind' (item 123 (b), (c))\n"
 "  kind: DamageElementKind;\n"
 "  range: [number, number];          // share of the decay level, 0 ≤ lo < hi ≤ 1: the element's threshold is lo + u · (hi − lo), u its §6.3 draw\n"
 "  states: ('abandoned'|'decayed'|'ruined')[] }   // the existence states whose look item 123 (c) gives the kind; the range lies inside their shares (V06 §3.23 (2)); not calibratable\n"
 "interface DamageSettings {          // the named row 'settings' of the same table (V11 §2.1's settings form)\n"
 "  defaultAgeYears: number }         // yr: the age a building whose log holds no decay run reads (V06 §3.23 (4))\n"
 "interface DamageRateRow {           // table 'damage.materials' (registry row 110); key 'material' (item 123 (b))\n"
 "  material: string;                 // a walls material id of V11 §3.19.3 (`Building.material.walls`)\n"
 "  ratePerYear: number }             // share a year: V06 §3.23 (2)'s r, the level a decay run gains each year — timber faster than stone\n",
 1, ['G122-V11', 'G123-V11']),

# ---------------------------------------------------------------- §2.10
(H210,
 "| `RelationFamilyRow`, `SignaturePairRow`, `LadderStepRow`, `WallBarrierRow`, `WaterfrontThreatRow`, `EraRow`, `ClimateRow`, `HeightsRow`, `CompatibilityRow`, the typed §10.2 rows | compiled | their registry rows | table | table | table | table versions; a document without a table in its pinned set reads the parity-neutral default the schema declares (a family weight 0, no pair, no ladder step, the uniform wall profile — J-V11.12) |",
 "| `RelationFamilyRow`, `SignaturePairRow`, `LadderStepRow`, `WallBarrierRow`, `WaterfrontThreatRow`, `EraRow`, `ClimateRow`, `HeightsRow`, `CompatibilityRow`, the typed §10.2 rows | compiled | their registry rows | table | table | table | table versions; a document without a table in its pinned set reads the parity-neutral default the schema declares (a family weight 0, no pair, no ladder step, the uniform wall profile — J-V11.12); an absent `ClimateRow.farmLayout` reads `rows` (the rung × landscape choice, §4.9) |",
 1, ['VAF-R1T-02']),
(H210,
 "a `stateSnapCm` edit applies at the next re-derivation and moves no standing knot; a pinned version without them is upgraded by §7.5's event, reported, so the zeroing rule never supplies a foundation depth of 0 to a document holding raised ways ·",
 "a `stateSnapCm` edit applies at the next re-derivation and moves no standing knot; a pinned version without them is upgraded by §7.5's event, reported, so the zeroing rule never supplies a foundation depth of 0 to a document holding raised ways · `raisedWays.structure.stripMarginM`: shipped with item 110's rows at C3b (M3a); an edit re-cuts §4.6 S8's strip holes, S8 and the stages after it re-deriving the faces a strip crosses, a generated plot or building the widened strip now covers kept and listed with the relocate offer as the pattern keeps it; absent from a pinned version: 1 m, the value the cell ships with, so no strip moves ·",
 1, ['R2-26 (d)']),
(H210,
 "| the generation-time condition re-derives with its enceinte (§7.7's row); an epoch reads the cells in force at it; a hand repair's material is held (V06 §2.8) |",
 "| the generation-time condition is laid with its enceinte at generation (§7.7's DR41) and carried through every re-derivation by its knot profile (§2.2 rule 5; §7.4's wearWall / repairWall row), so a cell edit reaches a new generation and the epochs that read the cells in force; a hand repair's material is held (V06 §2.8) |",
 1, ['VDC1-11 (R2-27 (b))']),
(H210,
 "| item 119's `perf.qualitySpend` rows | a row lands with its measured gain (V11 §3.25.8) | row 106 | table | a row admits its stage's quality path from the next generation; its output shift is the row's declared shift | table | absent: every stage at its target path |\n",
 "| item 119's `perf.qualitySpend` rows | a row lands with its measured gain (V11 §3.25.8) | row 106 | table | a row admits its stage's quality path from the next generation; its output shift is the row's declared shift | table | absent: every stage at its target path |\n"
 "| item 122's `crisis.looks` (with its `settings` row) and `crisis.map` rows | compiled (V11 §3.25.9); the `map` rows' words from V08's census at the pinned baseline (C4b) | rows 107, 108 | table | a look only: an edit redraws the looks standing in the view, never the model, a digest or the hash (§10.2 *Crisis looks* (a)) | table | absent: no look drawn; absent `map` rows: every condition reads `none` (§10.2 (b)) |\n"
 "| item 123's `damage.elements` (with its `settings` row) and `damage.materials` rows | compiled (V11 §3.25.10) | rows 109, 110 | table | a drawing only: a range edit moves each element's threshold with it (its draw u fixed, §6.3), a rate or default-age edit each level (V06 §3.23); no plan, id, digest or hash moves | table | absent `damage.elements`: no element has a range, so none draws damaged; absent rates and age: V06 §3.23 (4)'s 0 (each level its state's floor) |\n"
 "| item 124's weather cells (the climate rows' `weather`, the `settings` row's `weather` block) | compiled (V11 §3.25.11) | row 43 | table | a look only: an edit takes effect from the next spell (§6.1 *The weather stream*), never a tile, the model or the hash | table | absent: no weather entries — no spell comes |\n",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H210,
 "| the display cells (`label`, `icon?`, `synonyms`, `commonness` on the class rows; `label`, `icon?` on the families, goods, district kinds, style sheets and patch materials; `findGroup` on the families) | the source (V11 §3.4, V11 §3.5.15, V11 §3.7.1, V11 §3.9, V11 §3.1's *Display cells*, V11 §3.25.3;",
 "| the display cells (`label`, `icon?`, `synonyms`, `commonness` on the class rows; `label`, `icon?` on the families, goods, district kinds, style sheets, patch materials and crisis looks; `findGroup` on the families) | the source (V11 §3.4, V11 §3.5.15, V11 §3.7.1, V11 §3.9, V11 §3.1's *Display cells*, V11 §3.25.3, V11 §3.25.9;",
 1, ['G122-V11']),
]
