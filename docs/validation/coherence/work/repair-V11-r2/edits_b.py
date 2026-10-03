# edits_b: §3.1, §3.5, §3.6, §3.17, §3.18, §3.23, §3.24
H31 = "### 3.1 The complete catalogue of tables"
H35 = "### 3.5 The class ladder (`roster.classes`) — every town and city class"
H36 = "### 3.6 Designation templates, the compatibility table and heights"
H317 = "### 3.17 Climate and land use"
H318 = "### 3.18 Decline, ruin and salvage by material"
H323 = "### 3.23 The underground's content rows (item 109; J111)"
H324 = "### 3.24 Item 110's rows — terraces, raised ways, stepped massing, decks and their landmarks"

EDITS = [
# ---------------------------------------------------------------- §3.1
(H31,
 "| `castle.minInnerM`, `wall.smoothPasses`, gates' waterfront share, spacing |",
 "| `castle.minInnerM`, `wall.smoothPasses`, gates' waterfront share, spacing, `moat.waterReachM`, `moat.maxFallCm` (§4.2 S3 (10)) |",
 1, ['VPC-R1-15 (a)']),
(H31,
 "| one row: `rosterMode`, the unemployment threshold, the propagation depth, `placement.extensionWeight`, `detourFactor`, `crypt.rankShare`, `coverage.rosterWeight` |",
 "| `RosterSettings` (§10.2; its one row `settings`, cells V11 §3.5.1) |",
 1, ['VAF-R1T-06 (R2-13)']),
(H31,
 "| `ClimateRow` (with `rainMmPerYear`, the dry-country cells of item 111 and the season cells of item 117) | V11 §3.17; `dry` V11 §3.25.1; `seasons` V11 §3.25.6 | S0 (the arid water chances, P(oasis)), S1 (the oasis site and area band, the well-yield raster), S3 (S3 (6)'s water pull),",
 "| `ClimateRow` (with `farmLayout`, `rainMmPerYear`, the dry-country cells of item 111, the season cells of item 117 and the weather cells of item 124) and its named row `settings` (`ClimateSettings`: `aridMin`, item 124's weather block) | V11 §3.17; `dry` and `aridMin` V11 §3.25.1; `seasons` V11 §3.25.6; `weather` and the weather block V11 §3.25.11 | S0 (the arid water chances, P(oasis)), S1 (the oasis site and area band, the well-yield raster), S2 (the farm mode, which §4.9 reads with `farmLayout` before S2 demands the farm plots), S3 (S3 (6)'s water pull),",
 1, ['VAF-R1T-02', 'G124-V11']),
(H31,
 "S12a (§4.9's field system; the oasis gardens)",
 "S12a (§4.9's field system and farm modes — the climate override `farmLayout`; the oasis gardens)",
 1, ['VAF-R1T-02']),
(H31,
 "the renderer (§8.2's season rows, item 117); modules: `@plat/app` (V09's season control), the clerk (V10) |",
 "the renderer (§8.2's season rows, item 117; the weather effects — §6.1's weather stream, §8.2's effect marks and §8.4 (i)'s light terms, item 124); modules: `@plat/app` (V09's season control and Start a shower now), the clerk (V10) |",
 1, ['G124-V11']),
(H31,
 "`RuinRule` (with `CultureRow`), `OpeningRow`, `DigRule`, `CatacombRule`",
 "`RuinRule` (with `CultureRow`), `UnderOpeningRow`, `DigRule`, `CatacombRule`",
 1, ['VPC-R1-07 (R2-12)']),
(H31,
 "| `RaisedWayRow`, `RaisedWaySettings`, `RaisedWayStructure` (with `span`, `slideMaxFactor` and `maxClearSpanM`) | V11 §3.24.2 (the `span` values, `slideMaxFactor` and `maxClearSpanM`; the rules file f item 244's, §2.7) |",
 "| `RaisedWayRow`, `RaisedWaySettings`, `RaisedWayStructure` (with `span`, `slideMaxFactor`, `maxClearSpanM` and `stripMarginM`) | V11 §3.24.2 (the `span` values, `slideMaxFactor`, `maxClearSpanM` and `stripMarginM`; the rules file f item 244's, §2.7, and §4.6 S8's strip) |",
 1, ['R2-26 (d)']),
(H31,
 "`S8` and `S8.seed` (V01's seeds, fans and bent-cut lanes crossing under an arch read `structure.clearanceCm`, V01 §3.17.3 (3)),",
 "`S8` and `S8.seed` (V01's seeds, fans and bent-cut lanes crossing under an arch read `structure.clearanceCm`, V01 §3.17.3 (3); S8 cuts the under-deck strip at `structure.stripMarginM`, §4.6, V01 §3.17.3 (2)),",
 1, ['R2-26 (d)']),
(H31,
 "EVO_RAISED (V06 §3.19's epoch pass), U-SYS and U-FADE",
 "EVO_RAISED (V06 §3.19's epoch pass and its strip clearance), U-SYS and U-FADE",
 1, ['R2-26 (d)']),
(H31,
 "S4, S5b, S6 and EVO_RAISED (the raised ways' ends); S13a and S14",
 "S4, S5b, S6 and EVO_RAISED (the raised ways' ends); S3 (5), S4, S5b and S5c (the class grade limit on routed edges, §4.3 *Lattice and costs*), §7.3 (a) 5 (the steepness report); S13a and S14",
 1, ['VPC-R1-15 (b)']),
(H31,
 "| `SquareQuotaRow` (V01 §2.2: `band`, `haPer1000`, the `kind` factors; key `band`) |",
 "| `SquareQuotaRow` (§10.2; key `band`) |",
 1, ['VAF-R1T-06 (R2-13)']),
(H31,
 "S3 and S7 (§7.7's generation-time condition row, item 114 (d),",
 "S3 and S7 (§7.7's DR41, item 114 (d),",
 1, ['VAH-r1-19 (R2-11)']),
(H31,
 "| the renderer (§8.2's per-crown autumn colour by a keyed draw on `render.instances`) |",
 "| the renderer (§8.2's per-crown autumn colour by a keyed draw on `render.instances`; the colours of item 124's `leaves` effect marks) |",
 1, ['G124-V11']),
(H31,
 "| row | staged (shipped empty; a row lands with its measured gain) |\n",
 "| row | staged (shipped empty; a row lands with its measured gain) |\n"
 "| 107 | `crisis.looks` | `crisis/looks.json` | `CrisisLookRow` and its named row `settings` (`CrisisLookSettings`) — §10.2's shapes | V11 §3.25.9 | the renderer (§7.7's DR44, §8.2's crisis look rows, §8.8's massed ring marks, and §10.2's placement over V01's `campLand` and `disasterDistricts` and V06's `frontierFor`); exports (§11: pictures, and a battle map's image only); modules: `@plat/app` (V09's Show crises preview list and Find's list of looks by `label`, §2.9's framing, the panel's headcount line), the clerk (V10), the bench (V12) | row | written here |\n"
 "| 108 | `crisis.map` | `crisis/map.json` | `CrisisMapRow` (§10.2; key `from/key`) | V11 §3.25.9 (a dossier row set; the words V08's census at the pinned baseline) | the renderer (§7.7's DR44: each standing overlay's look); port.digest (V08's baseline totality check and its `unmapped_word` notes); the compiler (T-V11-46 (a)'s totality over registry row 77's lists); modules: the clerk (V10) | match | written here |\n"
 "| 109 | `damage.elements` | `damage/elements.json` | `DamageElementRow` and its named row `settings` (`DamageSettings`) | V11 §3.25.10 | §6.3's `plan.damage` thresholds wherever a plan is drawn — modules: the plan rung (V03: the damaged plan, its exports and panel lines), the wings rung (V02's ruined exterior), `@plat/under` (V04 §5.6's kinds below ground), `@plat/evolve` (V06 §3.23's default age), the renderer (§8.6, §11.1's battle maps), the clerk (V10), the bench (V12) | row | written here |\n"
 "| 110 | `damage.materials` | `damage/materials.json` | `DamageRateRow` | V11 §3.25.10 | modules: `@plat/evolve` (V06 §3.23's `decayLevel`, read by every damage drawer of row 109), the clerk (V10), the bench (V12) | row | written here |\n",
 1, ['G122-V11', 'G122h-V11', 'G123-V11']),
(H31,
 "**The count.** One hundred and seven catalogue rows (1–106 and 58a;",
 "**The count.** One hundred and eleven catalogue rows (1–110 and 58a;",
 1, ['G122-V11', 'G123-V11']),
(H31,
 "row 106 (measured costs, each row its own\nevidence). Every other row of items 111–119 is calibratable, its register entry V12\n§3.11's.",
 "row 106 (measured costs, each row its own\nevidence); row 108 (`crisis.map`: SettlementForge's words onto our looks, a dossier row set, V11 §3.25.9). Every other\nrow of items 111–119 and 122–124 is calibratable but for its enumeration columns (V11 §3.25.9, V11 §3.25.10), its register\nentry V12 §3.11's.",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H31,
 "the patch materials (row 96), V11 §3.25.3; the style sheets (row 52), here —",
 "the patch materials (row 96), V11 §3.25.3; the crisis looks (row 107), V11 §3.25.9; the style sheets (row 52), here —",
 1, ['G122-V11']),
(H31,
 "the goods,\ndistrict kinds, patch materials and style sheets ship none,",
 "the goods,\ndistrict kinds, patch materials, crisis looks and style sheets ship none,",
 1, ['G122-V11']),

# ---------------------------------------------------------------- §3.5: the stale "§10.2's example" annotations
(H35, "supply `flour` 600 m street hard (§10.2's example) |", "supply `flour` 600 m street hard |", 1, ['VAF-R0S-23', 'VPC-R1-14']),
(H35, "`nearWater` soft (§10.2's example);", "`nearWater` soft;", 1, ['VAF-R0S-23', 'VPC-R1-14']),
(H35, "supply `grain` 3 000 m road (§10.2's example) |", "supply `grain` 3 000 m road |", 1, ['VAF-R0S-23', 'VPC-R1-14']),
(H35, "`nearWater` hard with a fall (§10.2's example; its outside row §4.9) |", "`nearWater` hard with a fall (its outside row §4.9) |", 1, ['VAF-R0S-23', 'VPC-R1-14']),
(H35, "`extramural` soft (§10.2's example as file f item 440 rewrites it);", "`extramural` soft (file f item 440);", 1, ['VAF-R0S-23', 'VPC-R1-14']),
(H35, "`nearMarket` 60 hard (§10.2's example) |", "`nearMarket` 60 hard |", 1, ['VAF-R0S-23', 'VPC-R1-14']),
(H35, "supply `import` by sea (§10.2's example) — at a port;", "supply `import` by sea — at a port;", 1, ['VAF-R0S-23', 'VPC-R1-14']),
(H35, "`nearGate` 150 soft (§10.2's example as file f item 440 rewrites it);", "`nearGate` 150 soft (file f item 440);", 1, ['VAF-R0S-23', 'VPC-R1-14']),

# ---------------------------------------------------------------- §3.6.1
(H36,
 "the poor, modest, prosperous and rich rows (§4.5's four-row tables: `squalid` reads the poor row, `comfortable` the\n"
 "interpolation), continuous columns interpolated along the value, discrete columns switching at the cut (§4.7 S11). A\n"
 "class may override any cell.",
 "the poor, modest, prosperous and rich rows (§4.5's four-row tables: continuous columns interpolated along the value —\n"
 "`comfortable` the interpolation of modest and prosperous, `squalid`, an end band, the poor row's —, discrete columns read\n"
 "by §4.5's discrete-cell rule: `squalid` the poor row's, `comfortable` the modest row's). A\nclass may override any cell.",
 1, ['VAF-R0S-20 (R2-16)']),

# ---------------------------------------------------------------- §3.17
(H317,
 "V11 §3.25.1, and item\n117's season cells, V11 §3.25.6):",
 "V11 §3.25.1, item\n117's season cells, V11 §3.25.6, and item 124's weather cells, V11 §3.25.11; `farm layout` is §4.9's farm modes' climate\n"
 "override — `rows` leaves the rung × landscape choice, the `arid` row's `rivers` and the `cold` row's `perimeter` are\n"
 "`ref:FTG Desert and Polar presets` —, an enumeration, not calibratable):",
 1, ['VAF-R1T-02', 'G124-V11']),
(H317,
 "| biome | ground role | woods (inner / outer shares; leaf) | field system | roof form · pitch | scatter per ha | rain mm a year |\n|---|---|---|---|---|---|---|",
 "| biome | ground role | woods (inner / outer shares; leaf) | field system | farm layout | roof form · pitch | scatter per ha | rain mm a year |\n|---|---|---|---|---|---|---|---|",
 1, ['VAF-R1T-02']),
(H317, "(deciduous) | openStrip |", "(deciduous) | openStrip | rows |", 1, ['VAF-R1T-02']),
(H317, "birch 0.1 / 0.4 | enclosed |", "birch 0.1 / 0.4 | enclosed | rows |", 1, ['VAF-R1T-02']),
(H317, "birch 0.3 / 0.4 | openStrip |", "birch 0.3 / 0.4 | openStrip | rows |", 1, ['VAF-R1T-02']),
(H317, "thorn 0.3 / 0.5 | enclosed |", "thorn 0.3 / 0.5 | enclosed | rows |", 1, ['VAF-R1T-02']),
(H317, "(evergreen) | irrigated |", "(evergreen) | irrigated | rivers |", 1, ['VAF-R1T-02']),
(H317, "larch 0.2 / 0.2 | infieldOutfield |", "larch 0.2 / 0.2 | infieldOutfield | perimeter |", 1, ['VAF-R1T-02']),

# ---------------------------------------------------------------- §3.18
(H318,
 "`cob` (it melts to a bank), `timber_crib` as `timber_frame`.",
 "`cob` (it melts to a bank), `timber_crib` as `timber_frame`. Item 123's decay rate by walls material — how fast a ruin's\n"
 "damage layer advances, a drawing only — is V11 §3.25.10's `damage.materials`, kept apart from these rows, which model\n"
 "phases read (J-V11.119).",
 1, ['G123-V11']),

# ---------------------------------------------------------------- §3.23
(H323,
 "The schemas are V04 §2.3's (`RuinRule` with `CultureRow` and `PersistenceClass`, `OpeningRow`, `DigRule`,",
 "The schemas are V04 §2.3's (`RuinRule` with `CultureRow` and `PersistenceClass`, `UnderOpeningRow`, `DigRule`,",
 1, ['VPC-R1-07 (R2-12)']),
(H323,
 "leaves open: **`miningCellShare` 0.02** — the site \"holds mining\" when at least this share\n"
 "of the frame's land cells carry `SiteResources.ore` ≥ 0.5 (besides a roster mining class or a dossier mining deposit, item\n"
 "109 (a) (2)); own. Caverns exist at every rung (item 109 (j) (1)); no cavern row reads the rung.",
 "leaves open: **`miningCellShare` 0.02** — the share of the frame's land cells with `SiteResources.ore` ≥ 0.5 that §4.2 S1\n"
 "(10)'s mining test (`Terrain.mining`; item 109 (a) (2)) reads; own. Caverns exist at every rung (item 109 (j) (1)); no\n"
 "cavern row reads the rung.",
 1, ['R2-28 (a)']),
(H323,
 "Scattered\nvoid dwellings (`voidDwellings`), the forecast floor (`accessForecastMin`) and the ruin's magic lights\n"
 "(`magicLightChance`, V04 §3.9) are V04's cells, cited.",
 "Scattered\nvoid dwellings (`voidDwellings`) and the ruin's magic lights (`magicLightChance`, V04 §3.9) are V04's cells, and the\n"
 "forecast floor `accessForecastMin` II.7.4's `UndergroundRule` cell (V04 §3.3 P7 reads it), each cited.",
 1, ['VV34-r1-06 (R2-28 (b))']),
(H323,
 "`OpeningRow` chances: `sinkhole`",
 "`UnderOpeningRow` chances: `sinkhole`",
 1, ['VPC-R1-07 (R2-12)']),

# ---------------------------------------------------------------- §3.24
(H324,
 "Items 116–119 add no switch here: item 116's margin is a view cell of the base settings row (V11 §3.1 row 92); the season\n"
 "and festival tables of items 117 and 118 are looks that never enter the model or its hash (with no season and no festival\n"
 "chosen, the base's view draws); item 119's `perf.qualitySpend` ships empty.",
 "Items 116–119 and 122–124 add no switch here: item 116's margin is a view cell of the base settings row (V11 §3.1 row\n"
 "92); the season and festival tables of items 117 and 118 are looks that never enter the model or its hash (with no season\n"
 "and no festival chosen, the base's view draws); item 119's `perf.qualitySpend` ships empty; item 122's crisis looks are\n"
 "switched per viewer by §2.9's `crises` key and item 124's weather effects by V09's device switch, both looks only, their\n"
 "`scale`, `lookLevel` and `perHour` cells `extension` (the parity presets draw neither); item 123's damage has no switch —\n"
 "a building never decayed draws its plan unchanged (`item123.damage`).",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H324,
 "V01's seeds, fans and lanes crossing under an arch (`clearanceCm`, V01 §3.17.3 (3)),",
 "V01's seeds, fans and lanes crossing under an arch (`clearanceCm`, V01 §3.17.3 (3)), S8's under-deck strip\n(`stripMarginM`, §4.6),",
 1, ['R2-26 (d)']),
(H324,
 "reach is clamped, T-V11-32 (h); J-V11.116);\n",
 "reach is clamped, T-V11-32 (h); J-V11.116);\n"
 "  `stripMarginM` 1 m (the under-deck strip's margin each side of the deck's ground projection over its piers and spans —\n"
 "  §4.6 S8's hole, V01 §3.17.3 (2)'s strip, V06 §3.19's clearance; range [0, 3] m; `own`, `extension`, calibratable, its entry\n"
 "  V12 §3.11's `raisedWays.structure` line; shipped with item 110's rows at M3a);\n",
 1, ['R2-26 (d)']),
(H324,
 "village rungs read V07's cells (J-V7.41). The\n"
 "footprints bracket V02's stopgap band ([20, 60] m²), and V02's T-V2-47 reads whichever row is loaded. A plot's `says`: \"on\n"
 "the {deck}: at most {n} storeys, about {a} m²\" (id `deck/<kind>/<band>`).",
 "village rungs read V07's cells (J-V7.41). A\n"
 "plot's `says`: \"on the {deck}: at most {n} storeys, about {a} m²\" (id `deck/<kind>/<band>`).",
 1, ['VAF-R0S-13', 'VV12-r1-07']),
]
