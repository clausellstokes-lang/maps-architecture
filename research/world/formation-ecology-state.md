# Formation, climate, ecology, generation options, placement, the dossier seam, the atlas and the host — what the design and the host hold today

> Provenance: written by Opus 5.5 under the Fable manager (docs/PROGRESS.md J392's model ruling); read and validated by the Fable design and critic seats of the same pass.

## PROGRESS ledger (this file is written incrementally)

| part | subject | state |
|---|---|---|
| 0 | how to read; the rows J384–J392 read whole | done |
| A | V13 as it stands (pipeline, W0–W6, placement, the port, cascade, editing, lenses, rendering, budgets, records, milestones, host list, decisions, owner questions, BCR ids) | done |
| B | the base: HistoryHint, S1/S2, II.7.6 buried town, DR rows, §4.11, §2.9, §7.1, §11.1, §11.3–§11.4, V04's buried kind | pending |
| C | V09 (world dialog, placement tool, generate flow, presets, view keys, saves) and V14 (section ids) | pending |
| D | the host at 81f1cd96 | pending |
| E | gaps the owner's rules F1–F16 must fill | pending |

## 0 How to read this file, and the rows it serves

**Sources and pins.** The design repository is read at the branch `claude/focused-cray-qhz855`, head `5a627a9`
(J392's row). The host is read at `/home/user/clausellstokes-lang/settlement-engine`, origin/master `81f1cd96`, read-only.
Every citation is `file:line` at those heads. Tags: **[STATED]** a document says it; **[OBSERVED]** read in code;
**[INFERRED]** my reasoning, with the reason given. Quotations are exact current text (the designer amends against
them); where a quotation is long I quote the clause a designer would replace and give the line.

**The rows read whole** (`docs/PROGRESS.md:443–451`, J384–J392) [STATED]:
- J384 (`:443`) — thirteen session rulings on the lens design; (6) "A NATIVE WORLD IS CANONIZED AT BIRTH for new
  campaigns"; (9) plates "one frame per host advance … full resolution for 520 weeks"; (13) "still" mode, never hidden.
- J385–J389 (`:444–448`) — the realm review m, lens files n, o, p, q applied; the additive re-canonize (J388) and its
  correction (J389: "the host does NOT re-canonize on a settlement founding … every host canonize is the DM's explicit
  premium act and rebuilds the whole digest"). V13 §11 Q4 still waits on the owner.
- J390 (`:449`) — F1, F2, F3 verbatim (tectonic formation then deleted; biomes simulated "but have dynamism"; "a let
  physics pass again option … The DM always wins. A painted biome is a "this was always so" override … A painted fire is
  a "this happened" event … settlement age (generation only) also determines if and how large an underlying ruins
  would be"). The session's reading: an optional FORMATION step, baked and deleted; LIVING PHYSICS re-derived on every
  edit "its dirty set extended downwind for rain shadows (a V13 gap)"; CAMPAIGN-TIME ECOLOGY "only from dated host facts
  and DM events, never random"; LET-PHYSICS-PASS-AGAIN at three depths; UNDERLYING RUINS by age at generation only.
  "RUNNING: workflows/44-formation-ecology (amendments r)".
- J391 (`:450`) — F4 (ocean currents price sail routes): directional, seasonal sea effort by vessel kind; "today its sea
  lane and V13's TravelEdge are symmetric".
- J392 (`:451`) — F5–F16 verbatim (preconfiguration "random all, basic, advanced"; organic biome inclusions; "based off
  of my settlements"; best placement; organic self-correction, "shouldn't just be a random arid dot"; dossier changed
  "only after user approval from the warning"; "One requirement solver … one process"; the historical relational style
  with embellishments; a fourth "world map" layer "derived from completed region, realm maps stitched together. Isolated
  in everything but image"; seams between sizes; user arrangement; continuation into a void; "Edits after generation
  should not carry over, every map is effectively its own microcosm on different literal times"; "world maps are
  individual saves"). The session's reading names "the full statement is docs/design/spine-world-growth-2026-10-23.md".

**State of the in-flight work** [OBSERVED in the repository]:
- `docs/design/spine-world-growth-2026-10-23.md` **does not exist** at this head (`find . -name "*spine*"` returns
  nothing). J392's "full statement" is therefore not on disk; the design seats have only J392's row.
- `docs/AMENDMENTS-2026-10-22r.md` (amendments r, F1–F4) **does not exist**; the last file is
  `docs/AMENDMENTS-2026-10-17q.md`. The git log reads `fb89309 handoff: formation and ecology run stopped on the owner's
  word; nothing written`. `workflows/44-formation-ecology.js` is present (its research targets
  `research/world/formation-ecology-science.md` and this file's path); `research/world/` held nothing before this file.
  So F1–F4 are, like F5–F16, carried in no applied text yet.
- The last applied item is 925 (file q); V13's revision notes end at "Lens q — 2026-10-17" (`V13-world.md:83–96`).

## A V13 — the world volume as it stands (`docs/volumes/V13-world.md`, 4 438 lines)

### A.1 §3.0 The pipeline and registration (`:1348–1397`)

- **Product and stages** [STATED] `:1350–1354`: "The world is a product (`ProductDecl` `world`, registered by
  `@plat/world` into `StrategyRegistry.products`; BCR-V13-7; J-V13.4): its stage set is W0–W9 (W6 and W7 each split in
  two … `W6a`, `W7a`, `W6b`, `W7b`, C13-33), each a `StageDecl` (§4.12) with `phase: 'main'`, `txForm: 'records'` …
  `lineageUnit: 'town'` (the world root)". Each run writes a `WorldCommitRecord` (`:1355–1357`).
- **Placement is not a stage** `:1358–1362`: "**The placement step P1–P5 is not a stage**: its five parts are §7.3 local
  operators of the placement edits … run by those edits' folds and by nothing else — never by `generate` or a Re-derive
  (C13-27); they share one stage id, `WORLD_PLACE`".
- **Materializer contract** `:1362–1367` (item 131 (c)): declared inputs, one `StageContext`, one `ReasonRecord` per
  record and per chunk; every stage declares its ladder and work limits over `frameCells`.
- **Order against frames** `:1368–1370`: "it runs **before** any settlement frame of its campaign is generated from a
  charter and **after** every settlement generated standalone that is later placed; the two orders meet at P1–P5."
- **The registration table** `:1372–1387` — one row per stage with reads, writes, streams, lineage unit, ladder, budget.
  The rows a formation or ecology design would amend or add to:
  - `:1374` W0 writes "`Recipe.world` (the snapshot, the resolved extent, cells, poles, winds, matrix, the recipe op list
    with seed indices)"; stream `world.recipe` (the template draw).
  - `:1375` W1 reads `world.recipe`, writes "`WorldRaster.dem`, `geology`, the coarse grid and index map".
  - `:1377` W3 reads "`dem`, the coarse grid, `latBox`, `poles`, `wind`; the features (water cells)", writes "the
    climate raster", stream `world.climate` "(the moisture start jitter)".
  - `:1379` W5 reads "the climate, `flowAccum`, `dem`, the surfaces", writes "`biome`, `landUse`, the resource sites",
    stream `world.resources` (thinning).
  - `:1380–1383` W6a/W7a/W6b/W7b; `:1384–1385` W8a/W8b; `:1386` W9; `:1387` the placement operators `WORLD_PLACE`.
  There is **no stage after W5 and before W6 for soil, land cover or ecology**, **no formation stage before W1**, and
  **no stage that reads a host fact other than seats, polity and the network** [OBSERVED in the table].
- **Where stages may write** `:1389–1395`: "W0–W9 write the world document only. P1–P5 write the world document … and,
  in the frame document, exactly one thing: the frame's own `charter` event".

### A.2 §3.1 W0 Blueprint (`:1399–1422`)

- **The request** `:1401–1404` [STATED], exact: "`WorldRequest { seed; size: WorldSizeRung | { widthKm; heightKm };
  template?: string; latBox?; poles?; wind?; biomeMatrix?; seats?; options? }` — V09's world dialog, the API (`generate`
  with a world blueprint) or the clerk. Absent fields take the size row's defaults (V13 §2.3); `poles` default equator
  270 deci-°C, pole −300 (own; a temperate planet); `template` default `'continent'`." — `options?` is untyped and
  nowhere defined [OBSERVED: no `WorldRequest.options` shape in §2.2]. There is no field for a formation scenario, a
  required-biome list, a settlement set ("based off of my settlements"), a preset tier (random all/basic/advanced), a
  neighbour or seam context (F13), or a style.
- **The extent** `:1405–1407`: the size row's extent, "clamped to [0.5, 2] × the row's, reported
  `W_WORLD_RECIPE_CLAMPED`".
- **Templates** `:1408–1412`: "shipped: six rows — `continent`, `archipelago`, `peninsula`, `highland`, `riverlands`,
  `coast` — each a list of op *generators* with parameter ranges in metres and placement windows as shares of the
  extent; our own rows, calibratable); W0 draws each generator's parameters uniformly in its range on `world.recipe`".
- **The op list as authoring history** `:1412–1415` (J-V13.6), exact: "the resolved ops are the world's authoring
  history and the one input W1 reads (J-V13.6), so a world is re-derived from its recipe, never from its template name,
  and an edit appends ops." J-V13.6 at `:3763`: "chose the resolved op list as the world's authoring history (a world
  re-derives from its ops, never from its template name) over storing the template and re-drawing because an edit then
  appends an op and the recipe stays the one input". [INFERRED] A baked formation payload must therefore be an op (or
  op-shaped record) in this list, or J-V13.6 must be amended to admit a second input.
- **The snapshot** `:1416–1418`: "`Recipe.world.snapshot` is written with every table version the product's stages will
  read … W0 refuses a request whose pinned table is missing (F-WORLD recipe rung …)".
- **Edges** `:1420–1422`: an empty op list is "a flat world at 0 cm — the sea everywhere".

### A.3 §3.2 W1 Terrain recipe (`:1424–1448`) and the `RecipeOp` record (`:630–640`)

- **Resolution independence** `:1428–1431`: "Every op is **resolution-independent**: its parameters are metres … nothing
  of an op depends on the cell count (J-V13.7 …)".
- **The op kinds** (table `:1433–1444`; record `:630–640`) [STATED]: `hill`/`pit` (`:1435`, radius 20–600 km, height
  50–4 000 m, × (1 + 0.1·n(p))); `range`/`trough` (`:1436`, spurs every `widthM`, width 10–200 km, height 300–6 000 m);
  `strait` (`:1437`, "the ground inside is set, not added"); `mask` (`:1438`, `edgeFade`, `disc`, `ring`); `invert`,
  `add`, `multiply` (`:1439`); `smooth` (`:1440`, box blur, three passes); `noise` (`:1441`, fBm, 2–8 octaves,
  wavelength 20–2 000 km, amplitude 10–1 500 m, "each octave's lattice position-keyed on `world.recipe` by `seedIx` and
  the octave index"); `image` (`:1442`, a packed greyscale asset through an explicit `toneCurve`); `geology` (`:1443`,
  "writes `WorldRaster.geology` inside its disc or band", record `:639` kinds `'ordinary'|'soluble'|'volcanic'|
  'impermeable'`).
- **The reserved erode op**, exact `:1444`: "| `erode` | reserved (J-V13.42): shipped absent from every template; when
  present, refused at W0 with `refuse.world.op` until the pass lands | — |"; record `:640`: "`{ op: 'erode'; passes:
  number /* reserved, shipped absent from every template (J-V13.42) */ }`". **Naming defect** [OBSERVED]: §4.1's outcome
  list names the refusal `refuse.world.recipeOp` (`:2859`), §3.2 names it `refuse.world.op` — one of them must be
  chosen when the op is un-reserved.
- **Op costs** (`RecipeOpRow`, `:921`): "hill, pit, strait, mask, invert, add, multiply, image, geology 1; range, trough
  2; noise octaves × 2; smooth 3 × passes" — no row for `erode`.
- **Coarse grid, preview** `:1446–1448`: "The coarse grid is the fine grid's 8 × 8 block mean … **Preview before
  commit:** a `worldRecipe` edit runs W1 over the op's touched cells on the fork (V13 §4.5) … undoing an op is removing
  it (V13 §4.1)."
- **Raster fields today** (`WorldRaster`, `:642–662`): `dem` Int32, `carveDeltaCm` sparse, `geology` Uint8 (four
  classes), `flowDir`, `flatRank`, `flowAccum`, `watershed`, `landmass`, `discharge`, `vegetation`, `habitability`,
  `territory` (coarse), `sway`, `swayStatus`, `debatableSides`, `culture`, `routes`, `biome`, `landUse`, `climate`
  (coarse: `tempDeciC`, `seasonAmpDeciC`, `seasonPhaseWeek`, `precipMm`, `evapMm`, `windCdeg`, `windStrength`,
  `continentality`), `distToShoreM`, `distToRiverM`. **Absent** [OBSERVED]: bedrock beyond the four geology classes, a
  soil layer, monthly climate, ocean currents, land cover, a disturbance or succession layer, named landform entities
  (ranges, volcanoes, rifts are not records — W9's `range` label priority `:1121` names a label kind without a record
  that produces it [INFERRED: no W-stage writes a range entity]).

### A.4 §3.3 W2 Features and surfaces (`:1450–1478`)

Flood fill into ocean, lake candidates and landmasses (`:1452–1454`); lakes by spill height with the lifted priority
flood, `lakeMinDepthCm`, breach within `breachToleranceCm` (`:1455–1463`); `open` and `subtype` filled by W4 (`:1464–
1471`: fresh/dry/salt/brackish; "`iceWeeks` are the weeks whose temperature by the seasonal curve (V13 §3.4 (4)) lies
below −3 °C — ice is a season, never a subtype"); the coast outline (`:1472–1475`: "Coastline fractalisation is a
view-time displacement (V13 §5.1), never geometry (J-V13.8)"). W2 draws nothing (stream "none", `:1376`).

### A.5 §3.4 W3 Climate (`:1480–1516`) — the seven steps, the wind march, the units

Header `:1482`: "On the coarse raster; every value integer (deci-°C, mm/yr, cdeg), every transcendental through `dmath`
(§6.5)." The steps, exact where a designer amends:
1. **Latitude** `:1484–1485`: "(an equirectangular box; the only use of degrees)".
2. **Temperature** `:1486–1488`: "(annual mean at sea level, then the lapse): T_sea(lat) = `equatorDeciC` for |lat| ≤
   `tropicsDeg`; beyond it linear in |lat| … on land T = T_sea − `lapseDeciCPerKm` × (dem ÷ 1 000 m); on water T =
   T_sea. Stored `tempDeciC`." — annual mean only; **no ocean-current or warm/cold-coast term**.
3. **Continentality** `:1489–1490`: clamp(distance to ocean ÷ `continentalityReachKm`, 0, 1).
4. **The seasonal curve** `:1491–1496`: one sinusoid per cell — "The temperature at week w is T + A × cos(2π (w − phase)
   ÷ 52) — the formula every reader of a seasonal state uses". Precipitation has **no** seasonal curve.
5. **Winds** `:1497–1499`: exact, "Each coarse row takes the wind band holding its latitude (`winds`; a world's recipe
   may override): `windCdeg` the band's bearing (the bearing the wind blows from), `windStrength` its strength." — one
   annual bearing per latitude band; **no seasonal shift, no monsoon, no pressure or land-sea term**.
6. **Precipitation by the wind march** `:1500–1510`, exact core: "For each band, parcels march along the wind's direction
   across the coarse raster: a parcel starts at the upwind edge with moisture m = 0 plus a jitter drawn once per start
   row on `world.climate` (keyed by the row; ± 10 %); at each water cell m += `pickupPerCellOverWater`; at each land cell
   the drop is d = `dropShare` × m + `orographicPerM` × max(0, rise) × m … plus `coastalBonus` at the first land cell
   after water; a rise of `barrierM` or more in one step dumps the whole parcel … Results clamped to `rainCapMm`." Annual
   mm/yr only. [INFERRED] the march is the one place a rain shadow arises, and it is global per band (the whole row).
7. **Evaporation** `:1511`: linear in mean temperature between `zeroAtDeciC` and `fullAtDeciC`.
- *Derive-only mode* `:1513`: with `tempDeciC` and `precipMm` given (the import) W3 runs steps 1, 3, 4, 5, 7.
- *Edges* `:1514–1516`: no water ⇒ a desert, reported.
- **Units and tables** (`ClimateWorldRule`, `:923–928`; defaults `:990–998`): `tropicsDeg` 16; `lapseDeciCPerKm` 65
  ("physics"); `seasonAmpMaxDeciC`/`seasonContinentalShare`/`continentalityReachKm` 300/0.4/500; `phaseWeekNorth`/`South`
  23/49; `winds` "[0, 30) 7 000 cdeg (from the ENE), 0.6 · [30, 60) 25 000 (from the WSW), 0.8 · [60, 90] 9 000 (from
  the E), 0.5; the same mirrored south" (`:996`); moisture 12/0.08/0.012/60/2 500/4 000 (`:997`); evap 1 400/−100/300
  (`:998`). Stored climate raster fields `:658–659`.
- **The stream** `world.climate` (`:2779`): "W3's moisture start jitter per coarse row" — the climate's only draw.

### A.6 §3.5 W4 Regional hydrology (`:1518–1583`)

The lifted site core (`:1520–1522`, BCR-V13-1, J-V13.9: "the world's flood and the frame's are one implementation").
3.5.1 flow (`:1524–1528`: priority flood, two-gradient flats, D8 order E, NE, N, NW, W, SW, S, SE; "The filled levels go
into the drainage arrays only, never into `dem`"); 3.5.2 accumulation, discharge, lakes, **the carve** (`:1530–1539`:
"where a reach (below) runs, the dem under its course is lowered to a monotone bed … capped at … `world.hydro.carveMaxCm`
… each cell's cut recorded in `carveDeltaCm`") — [INFERRED] the carve is the only erosion-like write in the design and
is reach-local and capped at 6 m (`:1010`); 3.5.3 reaches (`:1541–1553`: `riverMinM3s` 2, hydraulic geometry, delta
split on `water.delta`, estuary widening); 3.5.4 groundwater and springs (`:1555–1572`, permeability by the four geology
classes `:1017`); 3.5.5 distance fields and watersheds (`:1574–1577`). W4's one draw is the distributary shares
(`:1378`). Runoff is annual (`:1530`); there is no seasonal discharge beyond `FloodRule.seasonal` (`:1153`).

### A.7 §3.6 W5 Biomes and resources (`:1585–1617`)

1. **The biome per fine cell** `:1587–1595`, exact: "the matrix row `Recipe.world.biomeMatrix` (V13 §2.3) is read with
   the cell's mean temperature … as the row index … and its precipitation … as the column index; the cell's biome is
   `cells[row][col]`. The overrides run after, in this order and each final: a water cell takes `overrides.water` …; a
   cell above `alpineAboveM` … is `alpine`; a cell whose temperature is under `permafrostBelowDeciC` is `ice` unless the
   matrix already says `tundra`; a cell whose `flowAccum` ≥ `wetlandAccumCells`, whose dem slope … is under 0.5 % and
   whose biome is not a desert is `wetland`. … No stream is drawn: W5's biome is a pure function of W3 and W4."
   **There is no DM biome override, no painted biome, no "always so" biome record, and no soil input** [OBSERVED: W5
   reads only climate, `flowAccum`, `dem`, surfaces, `:1379`].
2. **Vegetation and habitability** `:1596–1598`: copied from the biome row, + `coastalHabitabilityBonus`.
3. **Resource sites** `:1599–1609`: `ResourceRule { kind: 'timber'|'stone'|'ore'|'salt'|'clay'|'fish'|'peat'|'pasture';
   where: {biome?, geology?, landUse?, coastal?, minSlopePct?, maxSlopePct?, minAccum?}; density; spacingKm }`; default
   rows `:1601–1605`; "candidates are drawn on `world.resources` … the lowest `count` draws kept … thinned to one per
   `spacingKm` in draw order; `amount` is a second draw in [0.3, 1]".
4. **Frame projection** `:1610–1612`: resources enter the charter's `resources`.
- **The matrix** (`BiomeMatrixRow`, `:931–932`; default `:1043–1052`): five temperature bands [−100, 0, 100, 200, ∞]
  deci-°C × five moisture bands [200, 400, 800, 1 600, ∞] mm/yr; cells "[`ice`, `ice`, `tundra`, `tundra`, `tundra`] ·
  [`coldDesert`, `tundra`, `boreal`, `boreal`, `boreal`] · [`coldDesert`, `temperateGrass`, `temperateForest`,
  `temperateForest`, `temperateForest`] · [`hotDesert`, `mediterranean`, `temperateGrass`, `temperateForest`, `wetland`] ·
  [`hotDesert`, `savanna`, `savanna`, `tropicalSeasonal`, `rainforest`]"; overrides permafrost −80, wetland 400 cells,
  alpine 2 500 m. "Thirteen biomes, five by five".
- **Biome rows** (`BiomeRow`, `:929`; table `:1023–1037`): habitability, moveCost, landUse ∈ `'ice'|'tundra'|'forest'|
  'grass'|'scrub'|'desert'|'wetland'|'alpine'`, vegetation, V11 `climateRow` key (six keys plus `tropical`, `wetland`
  requested by BCR-V13-26, `:1039–1041`). **`landUse` is the biome's potential cover, not a human use**: there is no
  cleared/field/pasture/settled class [OBSERVED in the enum at `:929`].
- **`adjust` of the matrix** (`:2845`: `'world.biomeMatrix'` with `fromStage: 'W5'`) is the only biome control.

### A.8 §3.7 W6 Suitability and siting proposals (`:1619–1690`)

- Three callers, one function (`:1621–1623`); W6a → W7a → W6b → W7b (`:1624–1626`).
- **The plug-in** `:1628–1637`: `terms.register`; "No term, V13's or V14's, draws: the score has no random or jitter term
  (item 132 (b)'s "derived, never random", extended to siting; SW-03; J-V13.53)".
- **The eight generic terms** `:1639–1655`: `habitability`, `discharge`, `lowland`, `coastType`, `resource`, `spring`,
  `destination` (+ `connectivity` at stage 2, `:1671–1675`). Weights `:1055`.
- **Spacing passes** `:1657–1662` (capital pass, town pass, `shrink` retries ×4, `W_SITING_SPARSE`).
- **Port promotion** `:1663–1670`; **the host's demand** `:1676–1680`, exact: "`proposals(world, demand)` (the port, V13
  §3.11.6) takes `{ kind: 'capital'|'town'|'port'|'site'; count; near?: WorldPointCm; withinKm?; weights?:
  Partial<SuitabilityRule['weights']>; exclude?: Id[] }`; it re-scores with the merged weights, restricts to the disc,
  drops `exclude` and the cells within the current placements' spacing, and returns the top `count`". **[INFERRED] This
  is the nearest existing mechanism to F7's "automatically place a settlement into a preexisting map in a best
  placement"**, but it scores by generic terms only: it does not read a dossier (biome, terrain word, coast, river,
  culture latitude), which is what `nearestLawful`'s `dossier` term does (A.11) — the two are separate today.
- **Tie-break** `:1681–1685`: lowest cell index, then ids; `world.siting` reserved, no stream.
- *Output* `:1687–1690`: "the standalone world's seats are the capital-pass proposals".

### A.9 §3.14 The two verbs and the cascade (`:2620–2688`)

- **The verbs** `:2622–2631`, exact: "Every terrain and water edit at both scales carries `EditBase.verb: 'happened' |
  'alwaysSo'` (BCR-V13-9; default `happened`): `setField(terrain)`, `terrace`, `warp` at level 0, `drawWater`,
  `moveCourseKnot`, `rerouteReach`, `setSurface` and V06's `terrainWater` op (a placement is always `happened`, C13-55).
  **`happened`** writes a dated record: … a `TerrainTrace` of the former ground or bed and a `SurfaceTrace` of the
  superseded surface; descendants are re-derived by the cascade but every dated fact older than the edit is kept … .
  **`alwaysSo`** is the retcon: the present surface is replaced, no trace is written, every descendant is re-derived as if
  the edit had always been". [OBSERVED] The verbs cover **terrain and water only**: no biome, land-cover, fire or
  disturbance edit carries a verb; there is no biome edit at all (§4.1 below).
- **The cascade order** `:2633–2645`. The dirty-set rule, exact (`:2633–2636`): "`cascade(doc, dirty, verb)` runs after
  the edit's own batch, in the dry run first (§7.1), over the dirty set only — at frame scale the hydro cells the edit's
  stroke or surface touched, grown to the frame watersheds (the D8 basins) they drain to and from; at world scale the
  same over `Watershed`s — and in this order". The steps (table `:2638–2645`): 1 terrain or surface; 2 flow, flats,
  accumulation; 3 surfaces re-derived; 4 the table; 5 the consumers (world column: "W5's biomes, W6's proposals, the
  charter's facts of every placement in the set …, the glyphs' `water` marks, W7's crossings …, W8a …, W8b at the next
  revision"); 6 one level up. **W3 is not a step of the cascade** [OBSERVED: no row reads or writes the climate].
- **Does a terrain edit re-run W3? No.** Drift row 1 (`:2662`), exact: "| 1 | a terrain edit in "keep" mode leaves
  rivers, biomes, features and polities on the old ground | `setField(terrain)` on the world raster (either verb) | the
  cascade: flow, accumulation, surfaces, the table, then W5 biomes, W6a/W6b proposals, W7 crossings, W8a seat
  territories over the dirty watersheds (W8b at the next revision) | every reach, lake, biome cell and territory cell in
  the dirty set is re-derived; none outside it changes; the reasons name the edit |". Locality row (`:2896`): "|
  `setField(terrain)` on the world | the cascade over the stroke's watersheds | as above | — |". So a new mountain range
  painted by `setField` changes neither temperature (lapse) nor precipitation (orographic drop, rain shadow) anywhere.
- **Does any terrain path re-run W3? Yes, two, neither downwind-bounded.** (a) A `worldRecipe` op (`:2895`): "W1 over the
  op's touched cells (its footprint + `smooth` radius, grown by one coarse cell), then the cascade (V13 §3.14.2) over the
  watersheds the touched cells belong to, then W5–W9 over the dirty set" — the row names **no W3**; but drift row 15
  (`:2676`), exact: "| 15 | regenerate commands redraw fixed layer lists … | `regenerate` on W1's noise (`EditScope {
  kind: 'world', stage: 'W1', box }`) | the declared I/O: W2 → W3 → W4 → W5 → W6a → W7a → W6b → W7b → W8 → W9 over the
  dirty set — every downstream stage, never a hand-listed subset | every stage's output inside the box changes
  consistently; the stage set run equals the topological closure of W1's writers (a log assertion) |" — W3 runs, **over
  the box**, not along the wind. [INFERRED] the two statements disagree: by the declared I/O (`:1377`, W3 reads `dem`) a
  recipe op's closure includes W3, while the locality row (`:2895`) skips it. (b) `adjust` of a pole, wind or latitude
  box (`:2909`: "W3 → the cascade (the climate changes discharge) → W5–W9 over the whole extent | … | whole-world by
  nature: declared"; drift row 17 `:2678`). **No row's dirty set includes the downwind strip** [OBSERVED]: the rain
  shadow of an edited range falls outside every dirty set except a whole-world `adjust` — the gap J390 names.
- **The eighteen drift rows** `:2652–2679` (one test each, T-V13-21); **the cascade's consumer list** `:2681–2688`
  (twenty readers, T-V13-21b).
- **Preview** `:2649–2650`: "Preview is a counterfactual fork (V13 §4.5): the cascade runs on the fork, the user sees the
  change list …, then commits under a verb or discards."

### A.10 §3.17 Determinism and streams (`:2772–2799`)

Exact `:2774–2786`: streams "`world.recipe` (W0's template draw, keyed by the world root and the op ordinal; W1's noise
op keyed by op index and **position** …), `world.climate` (W3's moisture start jitter per coarse row), `world.resources`
(W5's per-cell draws), `world.siting` (reserved: siting draws nothing …), the base's `water.delta` (W4's distributary
shares …) and the base's `naming` (W9's names …). `world.polity` and `place.search` are **reserved ids only**, not
streams (W8 and P1 draw nothing); `world.patrol` keys the patrol phase … a fixed-key reading and never a stream". Every
float through `dmath`, row-major passes, the lifted bucket queue with integer keys (`:2787–2790`); T-V13-1
byte-identity per stage across platforms (`:2790–2792`). **Work limits** `:2793–2799`: "W1 ≤ Σ (op cost × touched cells)
…; W3 ≤ 8 passes × coarse cells; W4 ≤ 12 × fine cells …; a limit reached is F-WORK's `work_cut` (never a timeout …)".
[INFERRED] A formation step (plates, stream-power iterations) or a monthly climate (12 × the march) has no stream id and
no work law here; a monthly W3 breaks "W3 ≤ 8 passes × coarse cells".

### A.11 §4 Editing (`:2815–2956`)

- **§4.1 the edit events** (`:2817–2874`; the `EditEvent` union `:2819–2848`), the full list [STATED]: `worldRecipe`
  (`action: 'append'|'replace'|'remove'|'reorder'`), `setSurface`, `setField` (`field: 'terrain'`, `key: PlatKey |
  'world'`), `rerouteReach`, `requestCharter`, `bindPlacement`, `placeFrame` (`preview?`, `accept?`), `setPlacement`,
  `mirrorFrame`, `worldWins` (`ids?`), `unplaceFrame`, `setSeats`, `bindSeat`, `unbindSeat`, `importSeats`,
  `polityRevision`, `setSwayLock`, `divide`, `growPlacement`, `deleteTrace`, `addEvent`, `fork`/`discardFork`/
  `commitFork` (`verb`), `adjust` (`param: 'world.size'|'world.poles'|'world.wind'|'world.latBox'|'world.biomeMatrix';
  fromStage: 'W0'|'W3'|'W5'`), and in the frame's log `charter`. `EditScope` gains `{ kind: 'world'; stage:
  'W1'|'W5'|'W6a'|'W6b'; box? }` (`:2849`) — the `regenerate` scope. `setAttr` targets (`:2852–2854`). **Absent**
  [OBSERVED]: any biome or land-cover paint, a disturbance (fire, clearing, flood-as-cover), a physics-pass command, a
  formation or weather command, a dossier-changing world edit, a "place from dossier" or "auto-place" edit (only
  `placeFrame` with a given origin and `nearestLawful`'s offers).
- **Outcome rows** `:2857–2869`: refusals `refuse.place.fit`, `refuse.place.worldRef`, `refuse.charter.dossier`,
  `refuse.surface.date`, `refuse.world.recipeOp`, `refuse.world.tier`, `refuse.import.*`, `refuse.place.hostLocked`,
  `refuse.world.hostSeats`, `refuse.world.hostRoute`, `refuse.world.advancing`, `refuse.world.hostRequires`,
  `refuse.world.hostPolitical`; warnings `W_TRAVEL_BAND_CROSSED`, `W_HOST_CANON_BEHIND`, `W_SWAY_LOCK_CONTRADICTED`,
  `W_EDIT_DOSSIER` "(`keepDossier`, `moveTown` where the placement is not host-locked, `cancel`; V13 §3.11.5 (1))",
  `W_PLACE_NO_LAWFUL` (`keep`, `takeOffer`, `cancel`), `W_PLACEMENT_OVERLAP`, `W_CHARTER_RIVER_MISSED`,
  `W_SURFACE_BELOW_BED`, `W_PLACE_ANOMALY`.
- **§4.2 the authoring tools** (table `:2878–2884`), exact rows: "| T1 `intend` | the world dialog: size rung or extent,
  template, poles, winds, latitude box, matrix; the `adjust` keys | the extent's cell counts and V13 §6's budget for the
  rung |"; T2 `ground` (op list with an append brush; `setField`; `setSurface`; `rerouteReach`); "| T6 `place` | **Place a
  settlement**: a *Charter here* action … the frame's outline dragged over the world, the bearing by a rotation handle …,
  the coherence cost by term beside the pointer …, the three offers as ghost outlines on request (`nearestLawful`), the
  mirror toggle (warned), the `worldWins` button on a stale charter; `setSeats` … |"; T9 `shape`; "| T10 `hold` | `fork`
  / `commitFork` / `discardFork` (the Preview-on-a-copy toolbar: "What if the sea rose 2 m?"); `regenerate` on W1's
  noise, W5's thinning, W6's tie-breaks | …". The frame gains the verb toggle "*this happened* default, *this was always
  so*" (`:2886–2887`). **No biome brush, no preset picker, no "based off my settlements" entry, no auto-place button.**
- **§4.3 locality** (`:2891–2916`): rows quoted in A.9; `adjust` of size "Re-derive from W0 (… position-keyed noise keeps
  the old cells' values)" (`:2910`).
- **§4.4 undo** (`:2918–2934`): "a world edit the host has `consumed` is sealed: its undo is refused and its reversal is a
  new edit offered to the host."
- **§4.5 the counterfactual fork** (`:2936–2946`), exact: "`fork` copies the document's current state into a fork (the
  base's Preview-on-a-copy, T10; the fork is a `Document` with `forkOf: { doc; seq }` and no canonical log position);
  edits on the fork fold as usual, the cascade runs on it, the view shows it (with the diff layer …); `commitFork`
  replays the fork's events onto the canonical log under the given verb as one group (each event re-folded at its new
  log position — the fork's results are never copied; …); `discardFork` drops it. Forks never persist in the canonical
  document … A fork of a host-bound world neither sends nor receives a port message; its preview shows `timeDelta`
  against the adopted canon." [INFERRED] This is the one preview-and-commit mechanism a "let physics pass again"
  command and a self-correction preview would reuse; note "the fork's results are never copied" — a non-replayable
  step (a baked simulation) committed from a fork must be an event whose fold is deterministic, or it re-runs.
- **Regenerate** is T10's `regenerate` on `EditScope { kind:'world'; stage: 'W1'|'W5'|'W6a'|'W6b'; box? }` (`:2849`,
  `:2884`); drift row 15 (`:2676`) and row 12 (`:2673`) are its tests. There is no "regenerate the whole world keeping my
  settlements" verb [OBSERVED]; `adjust` of `world.size` is the closest (Re-derive from W0, placements kept).
- **§4.6 older documents** `:2948–2956`: "The world document has no older form."

### A.12 §3.11 P1–P5 Placement (`:2042–2464`)

**The frame.** `PlaceContext { world; frame: Document | null …; frameSize: { widthCm; heightCm; marginCm }; edit; rules:
CoherenceRule; mode: 'worldFirst'|'settlementFirst' }` (`:2045–2047`). World-first: `requestCharter` creates the
`Placement` with `precedenceStamp: 'world'`, cost `'world-first'` — "P1 is **not** run, there is no frame to measure —
and runs P4 only" (`:2056–2060`); the frame size is `frameOf(size, aspect)`, "on a dossier-bound frame the size of the
dossier's peak population, so a town that grows keeps meeting its charter, and a `growPlacement` edit … re-emits the
charter" (`:2060–2063`). Settlement-first: "`placeFrame` runs P1, P2, P3, P4 (the settlement-sourced charter, stored on
the `Placement` only) and P5" (`:2065–2067`). [INFERRED] The world-first path places at an origin the caller names —
**nothing chooses that origin from the dossier**; `nearestLawful` searches around a given origin only.

**P1 — the six coherence terms and the dossier term** (table `:2073–2081`) [STATED]:
| term | raw cost (abridged; exact text at the line) | weight (`:1138`) |
|---|---|---|
| `coastSide` `:2075` | 0 facing world water within `coastSearchM`; 2 adjacent side; 3 opposite or absent; "so at weight 3 **any coast error is unlawful**" | 3 |
| `riverCrossing` `:2076` | per frame reach 0 / 0.5 / 1; a navigable world reach entering with no frame reach: 1 | 2 |
| `edgeElevation` `:2077` | RMS ÷ `edgeRmsRefCm` | 1 |
| `relief` `:2078` | \|Δ range\| ÷ `edgeRmsRefCm` | 0.5 |
| `biome` `:2079` | exact: "the frame's climate row (its blueprint's `circumstances.biome` resolved to V11's `ClimateRow`, §4.2 S0; C13-15) against the world's mode over the extent | 0 when the rows agree; 0.5 when adjacent in the matrix (one band apart); 1 otherwise" | 0.3 |
| `territory` `:2080` | 0 / 0.5 / 1 against the sway's holder; "evaluated once … never re-scored" | 0.2 |
| `dossier` `:2081` | exact: "on a dossier-bound frame (V08), every DR1 and DR29 site fact — `site.terrain`'s relief class, `site.access`'s coast and its side, river and inflow, the water deposits, `site.culture`'s latitude — against what the charter at this placement would say | 0 when every dossier fact holds …; ∞ when any would be contradicted (an inland placement of a `coastal` site, a river side the charter cannot give, a latitude outside the culture's band): **the placement is unlawful whatever the other terms**" | ∞ |

[OBSERVED] **The dossier term does not include the biome**: a dossier's arid climate against a temperate world costs the
`biome` term at weight 0.3 (raw ≤ 1, so ≤ 0.3 of `lawfulMax` 4) — an arid town in a forest is *lawful*. This is the
precise seam F7 ("if we place a settlement with dossier arid biome into a map that doesn't have an arid biome, the map
has to self correct") and F8 meet.
- **The bearing search and `nearestLawful`** `:2083–2096`: 360 bearings at `bearingStepCdeg` (1°), mirror only by the DM;
  exact: "`nearestLawful(world, frame, origin)` searches origins on a spiral over the fine grid out to `originSearchM` in
  steps of `originStepCells` cells **in two tiers** (C13-37): the coarse pass, at 10 × the step, evaluates 36 bearings
  (10°) with the two cheap, decisive terms only — `coastSide` … and `riverCrossing` … and under the `dossier` term where
  one applies; only the three best (origin, bearing) pairs take the full six terms …; it returns up to three lawful
  placements by ascending `total`, ties by distance from the asked origin; none found → `F-PLACE` rung "no lawful
  placement within reach"". `originSearchM` is 20 000 (20 km, `:1139`) — a local search, not a whole-map best placement.
  "The dry run (`placeFrame` with `preview`) returns the cost and the offers without writing" (`:2094–2096`).
- **P2 — the blend band** `:2098–2109`: band `blendBandM` 2 000 m widened by 1 000 m per retry up to `blendBandMaxM` 6 000
  (`:1140`); smoothstep weights; "the DEM inside the frame's extent + margin is **replaced** by the frame's dem re-based
  (the frame is the truth inside its own ground — the owner's rule: the settlement never changes)"; the former values
  one `TerrainTrace` (`oldGround`); "Geology inside the extent takes the frame's `Terrain.geology` mode (C13-15); the
  band keeps the world's". [OBSERVED] **Biome is not blended**: P2 bends the DEM and geology only; the biome follows
  only through P3's W5 re-read over the set (`:2116–2117`: "W5's biomes re-read over the set (a new wetland may
  appear)") — i.e. the climate is not changed, so an arid frame in a wet world stays wet-biomed around it.
- **P3 — local drainage** `:2111–2119`: dirty set "the frame's extent + margin + band, grown to the watersheds it
  touches"; W4 re-run; W5 re-read; W6 proposals inside dropped.
- **P4 — the charter, both ways** `:2121–2162`: `charterFor(world, placement)` items 1–11 (`:2124–2151`: datum, edges,
  waterEdges, riverCrossings, downstreamHeadCm, roads, **climate** `:2142–2143`, waterTable, **biome** `:2146` "the
  world's biome mode over the extent, with its V11 climate row and the land-use shares", resources/sites/territory/
  polityAtCharter, geology). `charterFrom(frame, blend)` (`:2153–2155`). **Where a charter lives** (`:2155–2162`): a
  `source: 'world'` charter in the `Placement` and the frame's `Recipe.charter`; a `source: 'settlement'` charter "on the
  world's `Placement.charter` **only** — the frame's `Recipe.charter` stays absent … the frame's next Regenerate (keep
  settings) is byte-identical".
- **The dossier's precedence** `:2164–2175`, exact core: "On a dossier-bound frame every DR1 and DR29 fact … is a **hard
  constraint on the placement** … `requestCharter` (the host's `charter(world, campaign)`) is **refused** with
  `refuse.charter.dossier` naming the fact and the nearest lawful origin — the host then moves its placement or amends
  its dossier (J-V13.50: the map never silently amends a dossier fact; no owner question is needed, since item 20's
  one-way rule decides it). The charter never rewrites a dossier-tier value … the charter fills `map`-tier inputs only".
  [INFERRED] F8's "changes the dossier fact only after user approval from the warning" is a new, third path beside
  "the host moves its placement or amends its dossier": an approval the map asks for and the host executes.
- **The transient form** `:2177–2182`: `charterFor(world, TransientPlacement)` writes nothing (`WORLD-9`).
- **How S0 and S1 read the charter** `:2184–2213`: S0 reads `charter.climate`, `charter.biome` ("as the terrain
  template's land-use shares"), territory, culture, sites, resources; "on a dossier-bound frame every dossier-tier value
  wins"; S1 meets `charter.edges` with the position-keyed lattice (BCR-V13-29; the declared deviation `:2221–2224`).
- **P5 — the stamp and the forced-fact precedence** `:2228–2247` (J-V13.75), exact: "a world edit whose cascade would
  contradict a dossier fact of a world-stamped frame raises `W_EDIT_DOSSIER` with three choices: `keepDossier` (the stamp
  becomes `settlement`, `Recipe.charter` kept as a recorded input, the mode keyed on the stamp from then on, the
  dossier's facts met bearing first and the world's blend second, as P1–P3 meet them), `moveTown` (the nearest lawful
  origin; not offered when `Placement.hostLocked`), `cancel`. No lawful origin leaves an unlocked frame standalone; on a
  `hostLocked` placement the edit is refused (`refuse.place.hostLocked`) unless the DM takes `keepDossier`. A dossier
  event that changes a DR1 or DR29 site fact of a placed frame — the host's labelled re-terrain or its world-fact card
  changing the frame's relief, coast or river — re-runs P1's bearing search at the fixed origin, then P2–P3, under the
  new fact … logged as a dated re-blend whose cause is the dossier event". [OBSERVED] **None of the three choices
  changes the dossier**; the DM-approved dossier amendment F8 asks for is absent; and the dossier-event path is
  host-initiated (the host's re-terrain), never map-initiated.
- **`hostLocked`** (record `:727`): "the host's move-lock: an origin edit is refused (`refuse.place.hostLocked`) while it
  is set; the map additionally refuses a DM's unplacement of a host seat …; bearing and mirror admitted".
- **Mirror** `:2248–2254`; **world-wins** `:2255–2260` ("the only verb that changes a settlement's generated facts from
  the world, and it is the DM's explicit choice with a confirmation naming the frames' change count"); **the
  orientation-dependent terms** table `:2263–2272` (sun, wind, sea side, seasonality, compass, river labels, water table,
  territory and culture); "the owner's two verbs stay the only two ways a settlement changes (C13-25)" (`:2277–2278`).
- *Edges* `:2456–2464`: frame wholly in the sea; larger than the world refused; at the edge; extents overlapping refused
  unless `W_PLACEMENT_OVERLAP`; "two frames whose **margins** overlap (extents apart): admitted".

### A.13 §3.11.6 The port (`:2280–2450`)

- **Consumption law** `:2281–2289` (J-V13.70): the port "replaces the host's capture of the reference generator, never
  the host's own frozen distance record"; nothing the host simulates calls the port inside an advance; "a new canon is
  adopted only by the host's own receipted canonize — H22's birth canon as the campaign is created, or a re-canonize
  (V13 §8.5), the additive one below included —".
- **Two feeds** `:2289–2293` (J-V13.71): the simulator feed (`canon`, optional `routeFacts`, `patrolOffer`) — integers,
  host vocabularies, `WorldPointCm`s, "no float, no prose, no cache, no echo of a host fact"; the map feed
  (`derivedFacts`, `mapFeed`, `routes`, `pathGeometry`, `borderSegment`, `placeOf`) — "never written into the host's world
  state and is never read by a step of its simulation".
- **Outbound, simulator feed** — `canon(world, request: CanonRequest)` (`:2296–2308`): travel slot (seats with "terrain
  class and climate band", W8a crossings, costs), water slot (latent candidates, `WaterAccess`), sites slot; envelope
  with versions and causes; "a pure function of the inputs its hashes name; no political, overlay, lived-route or belief
  input enters it". **The additive canon** `:2308–2337` (J388/J389): on a campaign born canonized, the last adopted canon
  plus "only the seats added to the host's membership since on a founding event — a placement (`bindSeat`) or a
  satellite's graduation …, never an `importSeats` row"; steps per-slot versions, carries a `TimeDeltaReceipt`;
  "The host adopts it by a receipted re-canonize it runs itself, unasked, at the first point between advances after
  the founding … a new host behaviour (its canonize is otherwise the DM's explicit premium act)". `routeFacts`
  (`:2338–2341`: "the 52-week seasonal sets — never `costTotal`"); `patrolOffer` (`:2341–2345`).
- **Outbound, map feed** — `derivedFacts` → `SettlementMapRecord` (`:2348–2354`: `physical: SettlementPhysical` — record
  `:794` `{ elevationM; slopePct; terrainClass; climateBand; tempDeciC; seasonAmpDeciC; precipMm; lake?; floodSummary? }`
  — "tier, population and name are the host's and are never echoed back"); `mapFeed` (`:2355–2367`); `routes`,
  `pathGeometry`, `borderSegment`, `placeOf` (`:2368–2372`); `charter(world, campaign)` (`:2373–2380`, exact tail: "For a
  settlement the host founds in a world-first campaign, the host derives its access word from the charter's road and
  water facts, and its terrain word from the charter's relief, biome and water facts by the inverse of DR1's
  relief-class row (the table the `dossier` term reads), before generation."); `proposals` (`:2381`).
- **Inbound, recorded inputs** `:2383–2407` (each "a dossier-tier fact keyed by host keys"; every windowed message a
  **windowed replace** `{ fromWeek; toWeek; advanceNonce?; hostSeq }`): `bindSeat`, `importSeats`, `unbindSeat`
  (`:2389–2393`); `costLaw`, `travelLaw` (`:2394–2395`); **`hostRequires`** (`:2396–2398`), exact: "`hostRequires(world,
  rows: { hostKey: string; requires: ('coast'|'river'|'navigable'|'lake')[] }[])` (the host's frozen per-settlement
  water verdicts): a world edit whose cascade would strand one is refused (`refuse.world.hostRequires`) unless the DM
  keeps the residual as a reported anomaly (`keepResidual`)." — water only, **no biome or climate requirement**;
  `genesis`, `network` (`:2399`); `polity` (`:2400–2401`); `events` (`:2402–2404`: "a host flood raises a world surface
  only when the DM attributes it … never by itself"); `canonized` and **`consumed`** (`:2405–2407`), exact: "`consumed(world,
  editIds)` (the host applied the named `physicalChange` offers at its tick head; each is sealed against undo)".
- **Inbound, presentation inputs** `:2409–2420`: `clock`, `hostOverlay`, `beliefView`, `audienceKnowledge`,
  **`lensWindow`** (exact core `:2416–2420`: "after every advance, undo and resume, beside the recorded windows: the
  host's per-advance facts the lenses draw, with its resolved regime and each row's resolved audience … folded into one
  plate per advance in its plate cache (`Document.lensPlates`) outside every digest … read by the lenses only").
- **Outbound offers** `:2422–2426`, exact: "`physicalChange(world, edit)` — a world edit dated at the host's next tick
  head, with the DM's attribution and its durability: `event` (a dated live overlay the host may read at the hop),
  `permanent` or `retcon` (reaching the host's simulation only through its receipted re-canonize, as a geometry shift).
  No message proposes a political or military fact". [INFERRED] A land-cover or biome change offered to the host (F2/F3)
  would ride `physicalChange`; there is **no message that offers a dossier-fact change** (F8) and none that carries a
  settlement's climate, biome or required-biome set inbound.
- **The port's laws** `:2428–2450` (nine laws; (1) "genesis to lived only"; (5) "the dossier's precedence holds at
  placement (J-V13.50)"; (9) one word, one meaning).
- *Output* `:2452–2456`: a placement that adds a seat re-runs W7–W8 over the landmass; host-bound: offered to the host's
  re-canonize.

### A.14 §5.8 The lens mechanism and §5.9's list (`:3099–3422`)

- **What a lens is** `:3101–3110`, exact core: "A **lens** is a derived layer over the facts the host sends of one of its
  simulated systems … none is a field over land … So a lens draws marks at settlements, links between them, movers placed
  by a host clock and uniform fills over a settlement's own seat area — never a surface interpolated between points — and
  keeps the history it scrubs itself. Nothing of a lens is read by a stage, a sway revision, an encounter or the clerk; a
  lens draws nothing at random, and sends the host nothing but the DM-placed site offers". [INFERRED] A campaign-time
  land-cover layer (F2/F3: fields by population, succession after razing) **is** a field over land read by stages (W5,
  W6, the cost law) — it cannot be a lens under this text; it needs its own layer, though it may borrow the plate scrub.
- **`LensLayer`** (record `:836–842`): `id; asked; subject; order; sources: { field; gate: GateExpr }[]; regimes: { word;
  when: GateExpr; reason }[]; elements: LensElement[]; events: string[]; legend: { vocabulary; polarity?; notes }; refusals`.
  **`GateExpr`** (`:834–835`): `{ lane?; canon?; slot?: 'seaLanes'|'teleport'|'seasonal'; beliefs?; deity?; plague?;
  born?; intensity?; sent?; all?; any?; not? }`. **`LensElement`** (`:843–845`): `grammar: 'glyph'|'link'|'routeFlow'|
  'movingMarker'|'catchment'|'areaFill'|'overlay'|'caption'`; `audience: 'dm'|'public'|'believed'`; `scrub: 'hostDated'|
  'plate'|'swayRevision'`. **`HostRegime`** (`:846–847`). `Aud` (`:848`).
- **Plates** (`:3182–3199`): "one per host advance … in the world document's plate cache (`Document.lensPlates`,
  BCR-V13-38) — outside the model digest …. **The horizon in weeks:** full resolution for `plates.fullWeeks` (520) …
  compacted to one per `plates.compactWeeks` (13) … `pinPlate` … never compacted … A cache: dropping it loses only the
  scrub's past." `LensPlate` record `:876`.
- **Audience** (`:3173–3181`): "every lens opens DM-only … covert links, columns and patrols fail closed"; "No player view
  of alignment".
- **Scrub** `:3182–3187`: every lens draws at `lensWeek`, reading host-dated facts, the sway's revisions, plates, pulse
  records.
- **The four fact classes** `:3148–3160` (`FactClass` `:833`: `'hostStored'|'hostDerived'|'placement'|'mapDerived'|
  'dmPlaced'` — "four classes of host mark, and only four, beside the DM's own world sites"): host-stored; host-derived
  ("by the host's law"); placement (map geometry placing a host fact, labelled `placed`); owner-ruled map derivation (the
  sway and patrol cadence, "projection"); plus `dmPlaced`. "Everything else is **refused** (`refuse.lens.invented` …)".
- **§5.9's lens list** (`LensId` `:832`, order `:1111`): 1 Plague (`:3211`), 2 Sway (`:3241`), 3 Patrols (`:3267`), 4
  Trade (`:3285`), 5 Populations (`:3319`), 6 Religion (`:3346`), 7 Prosperity (`:3384`), 8 Alignment (`:3404`, DM-only).
  Deferred lenses culture, danger, calamity are D-V13.8 (J387). **No ecology, land-cover, climate-season, or
  sea-current lens** exists.

### A.15 §5.1–§5.7 Rendering, labels, exports, picture exports (`:2978–3097`)

- **§5.1 layers** (table `:2985–3005`): `relief` (default; hypsometric tint × hillshade, "eight tint bands … shore green →
  upland ochre → alpine grey → ice white"), `biome`, `climate` (`tempDeciC` or `precipMm`), `watershed`, `waterTable`,
  `water`, `traces`, `routes`, `seatTerritory`, `sway`, `occupation`/`debatable`/`fighting`, `patrols`, `events`,
  `lens:<id>`, `settlements`, `resources`/`springs`/`proposals`, `placements`, `anomalies`, `labels`. One style table
  `style.world` (`WorldStyleRule` `:943`: `riverDrawM3s`, `ghostDepthCm`, `reliefBandsM`, `tableBandsM`). The player
  picture `:3007–3018`. [OBSERVED] **No style axis beyond the base's style presets and `style.world`'s rows**: no
  projection or distortion of position (F10's relational scale), no cartouche or marginalia, no sea monster or
  embellishment layer; §5.3's labels place a sea label "at its pole of inaccessibility" (`:3048`) — the only placed
  decoration. The world draws "on the base's integer-cm viewport (§8.1) … the view's transform is the same code with a
  larger extent" (`:3020–3021`) — a single affine transform.
- **§5.2 zoom stops and opening a settlement** `:3032–3042`: four stops (0–3); "**Opening the settlement:** a click on a
  glyph at any stop … opens the frame document as another page (V09's document router …) — the owner's correction (2):
  the world map shows the generalization, the full settlement is another page, never an in-place zoom into the arena."
  [INFERRED] This is the precedent for F11's "click deeper … in reverse order": an atlas opening a member world as
  another page.
- **§5.3 labels** `:3046–3052`; **§5.4 exports** (table `:3056–3062`): `ecosystemJson`, `ecosystemGeoJson`, `heightmap16`,
  `worldCsv`, the picture exports ("§11.1 unchanged; the world is one more document kind"); provenance `:3064–3068`.
- **§5.5** `:3070–3074`: "A frame's own still may carry the world context strip (its placement's world square at stop 3 as
  an inset, a dialog option; own)."
- **§5.6** accessibility `:3076–3080`; **§5.7** the 2.5D drawables `:3082–3097` (`ZDecl` rows).

### A.16 §2.2 The records a new design would extend, and §2.3's rule tables

Records (`:612–906`) with line numbers [STATED]: `WorldRecipe` (`Recipe.world`) `:619–629` — fields `size`, `widthCm`,
`heightCm`, `fineCellCm`, `coarseCellCm`, `latBox?`, `poles`, `wind`, `recipe: RecipeOp[]`, `biomeMatrix: string`,
`calendarSouth?`, `seats?: RecipeSeat[]`, `snapshot` — **no formation payload, no requirement set, no preset tier, no
seam/continuation context, no "based on" campaign key**; `RecipeOp` `:630–640`; `WorldRaster` `:642–662`; `WaterSurface`
`:664`; `Reach` `:677`; `Watershed` `:686`; `GroundwaterField` `:688`; `FrameCharter` `:694–719` (its `climate` `:713`,
`biome` `:715`: `{ row; climateRow; landUseShare }`); `Placement` `:720–728`; `CoherenceCost` `:729`; `WorldRoute` `:731`;
`RecipeSeat` `:739` (`{ at; key; tier; culture? }` — standalone seats carry **no biome, climate or terrain requirement**);
`Territory` `:740`; `Glyph`/`GlyphMark`/`SettlementGlyph` `:744–749`; `SitingProposal` `:751`; `SuitabilityContext`
`:752`; `SuitabilityTerm` `:756`; `GoverningSurface` `:759`; `ReasonRecord` `:761`; **`TerrainTrace`** `:774` (`kind:
'oldBed'|'oldShore'|'oldGround'` — no cover or biome trace); `SurfaceTrace` `:775`; **`WorldEvent`** `:776–781` (exact
head: "the world's event index — dated host events delivered as facts, stored and indexed, NEVER generated here";
`kind: string /* the host's word: battle, plague, fire, siege, raid, … */`; `source: 'host'|'user'`; `factTier:
'dossier'|'map'`) — [INFERRED] the store a dated DM fire or clearing would join, but today it moves lenses and
glyph marks only, never terrain or cover; `PlacementAnomaly` `:782`; `WorldHeader` `:784`; `CanonRequest` `:785`;
`WorldCanon` `:786`; `CanonSeat` `:790` (`terrainClass`, `climateBand`); `TravelEdge` `:791` ("`a: string; b: string /*
host keys, codepoint-sorted */; cost: number`" — symmetric, J391's gap); `WaterCandidate` `:792`; `WaterAccess` `:793`;
`SettlementPhysical` `:794`; `TravelLaw` `:795–801` (`kmPerWeek` foot/cart/river/coastal/sea; `water: { costPerDistRatio;
stormFactor: number[] /* per quarter */ }`; `season.terrainFactor` per quarter); `AdvanceWindow` `:802`; `PolityFacts`
and its rows `:803–819`; sway records `:820–825`; `RouteGenesis` `:826`; `NetworkChange` `:827`; `WorldWhere` `:828`;
`TimeDeltaReceipt` `:829`; lens records `:832–876`.
**The two verbs' records:** `EditBase.verb: 'happened' | 'alwaysSo'` (`:2820`, BCR-V13-9); the traces `:774–775`; the
fork `Document.forkOf` (`:2939`).

**§2.3's rule tables** (`:907–1156`; every cell `{value, unit, provenance, calibratable}`) [STATED]: `world.sizes`
(`WorldSizeRow` `:919`; rows `:976–980`); `world.recipeOps` (`RecipeOpRow` `:921`) with `world.templates` (`:1408`);
`world.climate` (`ClimateWorldRule` `:923–928`; defaults `:990–998`); `world.hydro` (`:929`…`:1000–1012`);
`world.groundwater` (`:1014–1021`); `world.biomes` (`BiomeRow` `:929`, rows `:1023–1037`; `BiomeMatrixRow` `:931–932`,
default `:1043–1052`); `world.resources` (`ResourceRule`, `:1600`); `world.suitability` (`:933–937`, `:1053–1062`);
`world.routes` (`RouteCostLaw` `:938–941`, `:1064–1070`); `world.routeLay` (`:1072–1078`); `world.travel` (`:1080–1087`);
`world.polity` (`:1089–1107`); `world.lens` (`:1109–1117`); `world.labels` (`:1119–1123`); `world.glyph` (`:1125`…);
`place.coherence` (`CoherenceRule` `:1136–1142`); `water.class` (`:1144–1149`); `water.flood` (`:1151–1156`);
`style.world` (`:943`). **Absent**: any formation, soil, land-cover, succession, disturbance-recovery, current, sail
polar, preset, requirement or style-distortion table.

### A.17 §6 Budgets, the WORLD-n rows, memory and the size rows

- **The size rows** `:976–980` (exact): "| `province` | 320 × 200 | 250 | 8 (2 km) | [40, 50] | 600 | 6 000 | 3 | 4 |",
  "| `realm` | 1 280 × 800 | 500 | 8 (4 km) | [30, 55] | 1 800 | 8 000 | 11 | 7 |", "| `continent` | 3 840 × 2 400 | 1 000 |
  8 (8 km) | [15, 65] | 4 500 | 10 000 | 24 | 10 |" (columns: extent km, `fineCellM`, `coarseRatio`, `defaultLatBox`,
  `budgetMs`, `reliefLimitM`, `docMb`, `exportStride`). Cells `:987–988`: "1.02 M, 4.1 M and 9.2 M fine cells and 16 k,
  64 k and 144 k coarse cells". **There is no rung between province and frame, and no rung above continent** — F11's
  stitched "world map" over realm/region maps has no row; F11's "region" is not one of the three rung names [OBSERVED].
- **The one-click table** `:3432–3444`: W1 350/1 400/3 170 ms; W3 4/16/36 ms ("≤ 30 ns × 8 × cells"); W4 180/760/1 800
  ms; W5 20/80/180 ms; totals 730/2 900/6 700 ms, "re-declared at 900 / 3 000 / 7 000 ms" (`:3446–3447`); the noise cap
  fallback (`:3448–3450`). [INFERRED] W3 is the cheapest stage (36 ms at the continent rung) — a 12-month W3 is within a
  realistic margin; a formation step has no row.
- **Memory** `:3451–3461` (exact head): "**Memory** (§12.8's counting; C13-11): the fine rasters at the continent rung …
  360 MB with every array resident, which is over §12.8's one stated line (METROPOLIS ≤ 260 MB) and has no world line of
  its own; so (1) BCR-V13-14 requests a **world line** for §12.8 (a `world` document's working set ≤ 300 MB on the high
  tier; the continent rung refused below it, J-V13.12 kept), and (2) …: **≈ 285 MB resident during W4, ≈ 180 MB
  after**". [INFERRED] every added fine raster (soil, cover, bedrock beyond Uint8) costs 9.2 MB per byte per cell at the
  continent rung against a 15 MB headroom.
- **Edits** `:3463–3473`: a recipe op over a 50 km disc ≤ 120 ms; a placement edit ≤ 250 ms; `nearestLawful` ≤ 600 ms;
  a transient `charterFor` ≤ 10 ms.
- **The register** `:3490–3504`: `WORLD-1` one-click per rung; `WORLD-2` placement ≤ 250 ms; `WORLD-3` `nearestLawful`
  ≤ 600 ms; `WORLD-4` the frame's groundwater inside S1; `WORLD-5` memory ≤ 285 MB; `WORLD-6` document ≤ `docMb`;
  `WORLD-7` cascade at a frame; `WORLD-8` first frame ≤ 400 ms; `WORLD-9` transient charter ≤ 10 ms; `WORLD-10` score
  pass; `WORLD-11` sway revision; `WORLD-12` canon ≤ 2 s; `WORLD-13` sway store; `WORLD-14` plate store ≤ 4 MB gz;
  `WORLD-15` lens draw ≤ 60 ms. **Next free: `WORLD-16`.**
- **Storage** (§2.7 `:1293–1300`): "a `continent` world ≤ 24 MB gzipped …, a `realm` ≤ 11 MB, a `province` ≤ 3 MB".
  On a host-bound world "the host stores the world document per campaign beside its settlement map records"
  (`:1265–1267`) — [INFERRED] one world per campaign, the opposite of F15's many world saves per user unless the atlas is
  a separate document.

### A.18 §8 Milestones and §8.5's host-change list

- **§8.1** `:3643–3649`: world milestones follow M-SF; M-W0h "after M4, beside M5 … before M6-U's U3b".
- **§8.2 milestones** (table `:3653–3661`): **M-W0 spikes** (`:3655`; SP-W1 flood at 9.2 M cells, SP-W2 coherence search,
  SP-W3 stage-2 iteration, SP-W4 adapter round trip, SP-W5 frame groundwater, SP-W6 W1 templates, SP-W7 W7's A\*; 3 pw);
  **M-W0h** the water state at the frame (`:3656`; ≈ 4 pw); **M-W1** the world (`:3657`; W0–W6a, P1–P5, the canon);
  **M-W2** routes, polity, siting stage 2 (`:3658`); **M-W3** labels, exports, the adapter (`:3659`; 6 pw); **M-W5** the
  lenses (`:3660`); **M-W4** hardening (`:3661`; 3 pw). Total priced in §16 at "37–45 pw" (`:3663–3667`). [INFERRED] A
  formation spike (SP-W9?), a monthly-climate spike, a soil/cover spike and a requirement-solver spike have no row; the
  next free spike id is **SP-W9** (SP-W8 is the canon, `:3694`).
- **§8.3** order inside M-W0h/M-W1 `:3670–3679` (step 6 "W3–W5; T-V13-16's hydrology and biome bars").
- **§8.4 risks and spikes** table `:3683–3694` (SP-W1 … SP-W8).
- **§8.5 the host's parallel track** `:3696–3752` — "the design's one host-change list" (`:3698`). Row ids and titles
  (abridged from `:3719–3748`): H1 the fork's capture carries extent, seed, kind, scale and unit, a read-only export
  command (`:3719`); H2 mover bands from the realm's measured spectrum (`:3720`); H3 register rows mirroring V13's words,
  the world scale's source dated (`:3721`); H4 the world port's messages in the host client (`:3722`); H5 a second
  builder of its frozen record over the canon (`:3723`); H6 cost law 2 in V13's schema, stamps (`:3724`); H7 a native
  world's seed minted at its store layer (`:3725`); H8 the travel law sent as data with its calibration (`:3726`); H9 the
  events window (`:3727`); **H10 a per-campaign world record beside the settlement map records** (`:3728`, "(snapshot,
  log, backups, quota, lifecycle); the players' world view from its party picture set"); H11 the port verdict over the
  canon's water access; frozen per-settlement water verdicts as constraints (`:3729`); H12 genesis at world birth
  (`:3730`); H13 the polity facts per window (`:3731`); **H14 a chartered settlement's access and terrain words derived
  from the charter** (`:3732`); H15 world edits held during an advance, `physicalChange` applied, `consumed` sent
  (`:3733`); H16 who keeps a gate (`:3734`); H17 the presentation messages (`:3735`); H18 phase 1: every saved map's
  capture frozen with its export (`:3736`); H19 phase 4: the elective premium rebase; share codes gain a geography-source
  axis (`:3737`); H20 phase 5: the fork retired (`:3738`); H21 the audit's unknowns (`:3739`); **H22 the birth canon**
  (`:3740`); H23 the lens window (`:3741`); H24 plague asks (`:3742`); H25 sway and patrol asks (`:3743`); H26 trade asks
  (`:3744`); H27 population asks (`:3745`); H28 faith asks (`:3746`); H29 prosperity asks (`:3747`); H30 alignment asks
  (`:3748`). **Next free: H31.** [OBSERVED] No row asks the host for: a settlement's climate or biome in its dossier
  sent to the map; a DM-approved dossier-fact change from a map warning (F8); the host's settlement set per campaign as
  the input of a world generation (F7); directional sea legs (F4); land-cover facts; a "save a world map" store separate
  from a campaign (F15).

### A.19 §9 Decisions J-V13.40–45 verbatim (`:3812–3817`), with J-V13.6, .12, .50, .75

- `:3812` "| J-V13.40 | rejected a re-sampled cell graph for the world (the reference's two-graph mesh) in favour of
  rasters and a graph because every stage's law is then linear in cells and the raster is what the heightmap and the DEM
  edits need (C13-50) |"
- `:3813` "| J-V13.41 | rejected tectonics because the recipe's ranges and troughs give the authored control the owner
  asked for; a tectonic pass may later be one op emitting them |"
- `:3814` "| J-V13.42 | rejected erosion over time (the `erode` op reserved, shipped absent) because causal necessity is
  not shown and a non-deterministic-looking valley would need its own tests |"
- `:3815` "| J-V13.43 | rejected fluid dynamics because every reader (flood, class, route) is served by a level set with
  barriers |"
- `:3816` "| J-V13.44 | rejected a sphere now because the campaign's extent is a bounded region and the latitude box gives
  climate its one spherical input |"
- `:3817` "| J-V13.45 | rejected an economy or military simulation in the map module because they are the host's (item
  131 (b)); the map materializes their spatial footprint only |"
- Related: J-V13.6 `:3763` (quoted in A.2); J-V13.12 `:3769` "chose to refuse the continent rung on the low tier (the
  realm offered) over streaming rasters …"; J-V13.50 `:3811` (quoted in A.12's dossier paragraph's source); J-V13.75
  `:3832` "chose **the forced-fact precedence by the placement's stamp** (world: dossier > the DM's locks > the charter's
  boundary facts > tier priors > terrain plausibility > the draw; settlement: dossier > the frame whole > world facts as
  derived readings), with `W_EDIT_DOSSIER` …".
- **The owner rule behind J-V13.40–45** [STATED]: item 138 (d), `docs/AMENDMENTS-2026-10-16j.md:187–190`: "**(d) NOT
  BUILT** (the session's recommendation, the owner: "gotcha"): tectonics, erosion over time, fluid dynamics, a sphere in
  the first version, an economy or military simulation in the map module; a tectonic pass may later be one recipe
  operation emitting ranges and troughs." Quoted in V13 §1.3 `:297–299` and §1.4 `:381–385` (exact `:381–385`:
  "**Tectonics, erosion over time, fluid dynamics, a sphere, an economy or military simulation** (item 138 (d)): not built
  (J-V13.40 – J-V13.45); a tectonic pass may later be one recipe operation emitting ranges and troughs (J-V13.41), and one
  optional deterministic stream-power pass at world scale is reserved as a recipe operation (`erode`, V13 §3.2) and
  shipped absent."). [INFERRED] F1 is the owner's own later word and supersedes item 138 (d)'s first two clauses; §1.3,
  §1.4 and J-V13.41/42 must all be amended together, and the "may later be one recipe operation" sentence is the hinge
  the amendment uses.
- **Next free decision: J-V13.107** (J-V13.106 is file q's, `V13-world.md:96`).

### A.20 §11 Owner questions (`:4254–4311`)

Q1 the elective rebase (`:4256–4263`); Q2 the host's schedule and the launch classification (`:4265–4273`); **Q3 share
codes and replay** (`:4275–4280`, exact: "A world's share code (V12's replay of a recipe) replays W0–W9 from
`Recipe.world`; a placed settlement's share code must carry its charter (a recorded input) to replay identically … The
owner decides whether a placed settlement's share code **embeds the charter** (replays alone) or **names the world**
(replays only beside the world's code). *Recommendation:* embed the charter"); Q4 J86's door 1 and the world canon
(`:4282–4293`, still open — J388/J389); then two **Ruled** paragraphs (`:4295–4311`). [INFERRED] F15 (world maps as
individual saves, many per user) and F11 (an atlas by reference) bear directly on Q3: a world's share code replaying
W0–W9 cannot replay a baked formation (A.2/A.10) unless the payload rides the code, and an atlas code must name or embed
its members.

### A.21 §10 The BCR ledger ids (`:3880–4252`)

BCR-V13-1 (§14 package layout, the hydro lift) · -2 (§2.3 `Terrain` water fields) · -3 (§2.6) · -4 (§4.2 S1 reads the
charter) · -5 (§2.9 `Document`/`Recipe`: world document, `worldRef`, `charter`) · -6 (§6.3 namespace segment) · -7 (§4.12
the `world` product) · -8 (§6.1 concern registry: the world's concerns and stage ids) · -9 (§7.1 the verb on `EditBase`,
the world's edit kinds) · -10 (§7.3 the cascade's rows) · -11 (§7.7 the world port) · -12 (§11.1 the world's formats) ·
-13 (§8.4 layers and the sun) · -14 (§12.4/§12.8/§12.10 the world line) · -15 (§13.2 tests) · -16 (§9.5 compass) · -17
(§2.8 reason record) · -18 (§5.2/§5.4 codes) · -19 (§16 milestones) · -20 (§1.1 the world row) · -21 (V04 §2.6) · -22 (V06
§3.23 waterlogged rate) · -23 (V02 per-storey water class) · -24 (V10 oracle) · -25 (V09 §4.3 tool binding) · -26 (V11
§2.8 two `ClimateRow`s) · -27 (§5.3 basement row) · -28 (§2.8 entity registry) · -29 (§6.1/§4.2 S1 position-keyed
noise) · -30 (§4.2 S3 (4) roads at the gates) · -31 (§9.5 furniture) · -32 (§15 fabric volume as evidence) · -33 (§4.2 S1
(3) non-riverside never bisected) · -34 (§8.2 relief tier) · **-35 (§6.1, §7.1, §11.2: "every user-facing generate and
reroll mints entropy, recorded in its event", `:4188`)** · -36 (§4.2 S3/S4 two small world readings) · -37 (§16 the
world's estimate) · -38 (§2.9 the plate cache) · -39 (V09 §4.19 the lens controls) · -40 (§7.7, §11.4 door 1 and the
fifth door). Pending per J389: BCR-V13-30 – -36 and -39 (no admission item yet). **Next free: BCR-V13-41.**

