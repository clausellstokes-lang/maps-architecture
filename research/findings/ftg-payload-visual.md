# FTG — payload & visual language (slice `ftg-payload-visual`)

Subject: Thomas Allerton's **Fantasy Town Generator** (fantasytowngenerator.com), settlement
**"Galeiaward"** — size `CITY`, Medieval-Europe preset, coastal + river + farms + forests +
reserved natural area + walled.

## 0. Sources read for this slice

| source | what it is |
|---|---|
| `research/ftg-capture/layout-structure.md` | schema-less field tree of the 593,263-byte protobuf the server returned |
| `captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin` | that protobuf (the whole settlement) |
| `research/ftg-capture/create-request.json` | the **full parameter object** POSTed to create Galeiaward (432 KB) |
| `research/ftg-capture/presets.json` | server-supplied preset catalogue (sizes, 209 building types, 299 professions, item/service price list) |
| `captures/ftg/2026-09-21T05-23-58/steps/*.png` (7, 5 distinct) | overview → building-level zoom of Galeiaward |
| `captures/ftg/2026-09-21T05-08-07/steps/001-landing.png`, `013-after-create.png` | FTG landing hero; the same Galeiaward right after creation |
| `captures/ftg/*/report.md`, `steps/steps.jsonl` | CPU profiles + step trace |
| `reference/towngenerator-foundrymodule/**` (MIT, by FTG's author) | entity model + iframe event protocol; `docs/*.png` show an **older** FTG render + the entity UI |

Scripts written for this slice (re-runnable, stdlib only):
* `research/ftg-capture/analyse_layout.py` — decodes the blob and prints the full statistics block.
* `research/ftg-capture/probe_layout.py` — follow-up probes (imports the first).

**Not opened:** any `captures/**/network/bodies/*.js`. Nothing below comes from the live bundle.

---

## 1. Where generation happens, and how big it is  [SHOWN]

`captures/ftg/2026-09-21T05-08-07/steps/steps.jsonl`: clicking *Create Temporary Settlement*
returned after **300,667 ms** (and 301,197 ms on the second run) — **~5 minutes of wall time with the
client essentially idle** (`012-create-settlement.cpuprofile`: wall 296,325 ms, **busy 4,612 ms**).

**Generation is entirely server-side.** The client receives one protobuf and builds a scene from it.
Loading the finished settlement (`001-load-settlement.cpuprofile`): wall 31,770 ms, **busy 2,045 ms**,
GC 155 ms.

Client scene-build hot spots (minified, attributed only to chunk names — coarse facts only):
`ThreeJsPages-hfS3aH0a` supplies `mergeGeometries$1`, `mergeAttributes`, `buildingBufferToGeometry`,
`getBounds`, `computeTriangleBounds`, `partition` / `partition_indirect`,
`getColorArrayForThreeColor`; `index-t5dnCmDj` supplies `applyMatrix4`, `computeVertexNormals`,
`setXYZ`, `getX/getY/getZ`, `fromBufferAttribute`.

→ **Three.js, vertex-coloured merged BufferGeometry, with a `three-mesh-bvh`-style spatial
partition for picking.** One `Worker` frame appears (1.2 ms). **No WebAssembly frames anywhere in
either profile.** [SHOWN]

The only console message in the whole capture is a cosmetic SVG warning
(`preserveAspectRatio: Trailing garbage, "xMidYMid none"`). FTG emits **no stage trace** — unlike
watabou's generators, there is nothing to read off the console. [SHOWN]

---

## 2. Coordinate system and units  [INFERRED → then CONFIRMED three ways]

All positions are **unsigned integer varints**; polygons are **packed varint arrays of interleaved
`x,y`, stored as CLOSED rings (first vertex repeated as last)** — 2798/2798 building polygons
satisfy `poly[0] == poly[-1]`.

Unit derivation:
1. `presets.json` → `sizes`: `CITY` has `width: 5000` (metres) and `roughPopulation: 9500`.
   (The `blankSettlementWidth: 3500` in the create request applies only to size `BLANK`; the CITY
   preset overrides it. **This is a trap — 3500 is not the map width here.**)
2. Node/extent coordinates saturate at exactly **500000**, and field 5 is
   `[500000, 500000, 500000, 499999, 499999, 499999, 499999, 500000, 500000, 500000]` — the map
   corner ring.
3. → **1 unit = 1 cm; the map is a 5000 m × 5000 m square, 0..500000 in both axes.**

Independently confirmed by three parameter matches (§4.1): the stage-1 `roadLength: 50`, stage-2
`roadLength: 60` and suburb `roadLength: 30` reproduce as edge-length modes at 50.5 m, 60 m and
29.4 m; and by the on-screen scale bar (in `007-building-level.png`, 100 m = 134 px, and a
building measures ~27 px ≈ 20 m, matching the decoded OBB median of 22.98 × 18.82 m).

`+y` is **south-ish on screen** — the settlement's centre of mass is at (441 m, 681 m) and the sea
lies toward low x/low y, which is the upper-left of the render. A re-implementer should treat the
axis mapping as an open detail (§11).

---

## 3. The wire data model

Field numbers only; names are not on the wire. "n=" is the occurrence count in Galeiaward.
Proto3 default-omission is in force, so **an absent scalar means 0** — several enums genuinely use 0.

### 3.1 Top level

| field | n | meaning | evidence |
|---|---|---|---|
| 1 | 1 | settlement id, varint `18446744073233774842` = **signed −475776774** (an `int32`/`sint` hash, not a UUID) | [INFERRED] two's-complement read |
| 2 | 1 | settlement name `"Galeiaward"` | [SHOWN] matches the UI title plaque |
| 3 | 1 | **road graph** (3.1 edges, 3.2 nodes) | [INFERRED] structure |
| 4 | 1 | empty message (feature present but unused) | [SHOWN] |
| 5 | 1 | map-extent ring, 10 varints ≈ 5 corner points at 499999/500000 | [INFERRED] |
| 6 | 4 | **water bodies** — coast + river system polygons | [INFERRED] §5.4 |
| 7 | 17 | **wall towers** — `{id, {x,y}, f32 scale=1.0, kind=7}` | [INFERRED] §5.5 |
| 8 | 2798 | **buildings** | [SHOWN]+[INFERRED] §5.2 |
| 9 | 11 groups / 1176 lots | **land-use lots** (blocks, plazas, fields, forest, reserve) | [INFERRED] §5.3 |
| 10 | 4 | **districts** | [SHOWN] labels on the map |
| 11 | 1 | **decorations** (sprite layers + forest polygons) | [INFERRED] §5.6 |
| 13 | 9 | races | [STATED] mirrors `create-request.raceParameters` |
| 14 | 45 | race-partner matrix | [STATED] mirrors `racePartners` (9×9 upper triangle = 45) |
| 15 | 4 | genders | [STATED] mirrors `genders` |
| 16 | 16 | gender-partner matrix (4×4) | [STATED] |
| 17 | 3 | religions (`the good gods` / `the neutral gods` / `the evil gods`, 35 named gods) | [STATED] |
| 18 | 4 | factions (name, type, roles) | [STATED] `numberOfRandomFactions: 4` |
| 19 | 1 | stat block: 6 stat names, `2` (=`HALF_PER_BASELINE_DIFF`?), `10` (baseline) | [STATED] |
| 20 | 1 | `{1: 6}` — unknown single scalar | [NAMED-ONLY] |
| 22 | 1 | calendar: start day `Monday`, `9` (start hour), `24` hours/day, 7 weekday names, rest days `[12,14]`… | [STATED] mirrors `calendar` |
| 23 | 1 | `{2:3, 4:5, 5:21}` — likely `placeInWorld` (season=3 SUMMER, sunrise 5, sunset 21) | [INFERRED] the 5/21 match `sunriseHour:5, sunsetHour:21` exactly |
| 27 | 1 | empty | [SHOWN] |

Note **field 22.5 = `[12, 14]`** while the request said `restDaysInWeek: [6,7]`. Unexplained; possibly
a packed pair of bit-flags or a zigzag encoding. [NAMED-ONLY]

### 3.2 Road graph (field 3)

```
3.1  edge  { 1: id, 2: nodeA, 3: nodeB, 4: type (enum, 0 is a real value) }   n = 5326
3.2  node  { 1: id, 2: { 1: x, 2: y }, 3: packed varint adjacency[] }          n = 4303
```
The adjacency list is **redundant but exactly consistent** with the edge list:
`sum(len(adjacency))/2 = 5326.0`, and **0 nodes** disagree with their edge-incidence count. One node
has no `3.2.2` at all → its position is (0,0) by proto3 default.

### 3.3 Buildings (field 8)

```
8.1  id                     1..2798
8.2  packed ring x,y        CLOSED (first==last)
8.3  name                   "Ives School", "The Fey's Rooster", …
8.4  category enum          1..16  (see the colour legend mapping below)
8.5  category label         "school", "middle class home", "brothel", …
8.6  { 1: x, 2: y }         ENTRANCE point, n=2689 (109 buildings have none)
8.7  map-symbol flag        n=6 only: 1 = temple (×4), 2 = market square (×2)
8.8  sub-type / roof index  0..14 ; 0 and 1 split ~50/50 over ordinary buildings
8.9  sub-location count     0,5,6,10,12,20
8.10 constant 2             every building
```

**8.4 → the client's "Building type" legend** (read straight off
`reference/towngenerator-foundrymodule/docs/layers.png`, cross-checked against the 8.5 label sets):

| 8.4 | legend name | n | representative 8.5 labels |
|---|---|---|---|
| 1 | Residence | 2039 | middle/lower/upper class home, house share, abandoned squat, mansion |
| 2 | Tavern | 24 | tavern, quiet bar, gambling den, casino, members only club, brothel, raucous dive |
| 3 | Shop | 88 | general store, grain shop, greengrocer, fiber shop, farmers market, spice merchant (26 distinct) |
| 4 | Religious | 4 | temple |
| 5 | Warehouse | 17 | general warehouse, specific warehouse |
| 6 | Farm | 5 | farm |
| 7 | Educational | 4 | school |
| 8 | Service | 34 | doctor, money lender, notary, messenger, seer, undertaker, bank, lawyer |
| 9 | Government | **0** | — (`governmentParameters: []` in the request) |
| 10 | Cultural | 1 | theatre |
| 11 | Law enforcement | 6 | barracks |
| 12 | Artisan | 505 | spinner, carder, herbalist, bathhouse, launderer, barber, blacksmith, weaver (74 distinct) |
| 13 | Industrial | 56 | fishery, mill, shipyard, tanner, hunters lodge, lumber yard, sawmill, harbourmaster |
| 14 | Market | 2 | market square |
| 15 | Inn | 9 | small / medium / large inn |
| 16 | Faction | 4 | adventurers guild, gang hangout, merchant guild HQ, community hall |

Category 9 being empty while every other value 1..16 is used is strong evidence the enum is a
fixed 16-value list and category 9 is Government. [INFERRED, high confidence]

**8.9 = number of sub-locations (rooms).** Confirmed by the Foundry building dialog
(`docs/buildings_people.png`), which lists a tavern's sub-locations as *Bar / Office / Service door /
Kitchen / Table 1 / Table 2 …*, each with the people currently in it:

| 8.9 | n | what has it |
|---|---|---|
| 0 | 2 | market square (an open space — no rooms) |
| 5 | 2464 | every ordinary home, shop and workshop |
| 6 | 114 | house share (110), temple (4) |
| 10 | 210 | fishery, mill, warehouse, brewery, larger homes |
| 12 | 6 | large house share |
| 20 | 2 | mansion |

**8.8** is *not* a room count. For ordinary buildings it is 0 or 1 in a 1377/1395 split; for special
buildings it takes distinct values per label (temples get 9/10/11, market squares both get 2, farms
get 4/5/13/14, inns 5/13/14, hunters lodges 4/5). Best reading: **a per-category art/variant index —
roof-ridge orientation for ordinary buildings (the 50/50 split), sprite/plan variant for special
ones.** [INFERRED]

### 3.4 Districts (field 10)

```
10.1 id      10.2 long name      10.3 short/display name (absent for one)
10.4 { x, y } label anchor
10.5 { 1: packed ring }  the district BOUNDARY (closed)
10.6 prose summary
```

| id | 10.2 | 10.3 | ring verts | 10.6 |
|---|---|---|---|---|
| 1 | Beer Forest | *(absent)* | 45 | "Overall, is a waterfront district, but also contains industrial and park areas." |
| 2 | Rustic Village | Ticwick | 43 | "Overall, is a market district, but also contains residential (middle class) areas." |
| 3 | Ash Town | Ashton | 56 | "Overall, is a residential (middle class) district." |
| 4 | Green Wood | Greenwood | 41 | "Overall, is a residential (middle class) district." |

On the map the labels rendered are **Beer Forest, Ticwick, Ashton, Greenwood** — i.e. **10.3 is drawn,
falling back to 10.2 when 10.3 is absent.** [SHOWN] 10.2 is a two-word "poetic" name; 10.3 is its
contracted toponym (Rustic Village→Ticwick, Ash Town→Ashton, Green Wood→Greenwood) — a deliberate
"folk-contraction" name generator. [INFERRED]

### 3.5 Decorations (field 11)

Two shapes share field 11:

* **Shape A** (11.8, 11.9, 11.10, 11.11): `{1: repeated string asset key ×7, 2: repeated
  {1: variant index 0..6, 2:{x,y}, 3: f32 scale}, 3: repeated {1: packed ring, 2: f32}}`
* **Shape B** (11.2, 11.4, 11.5): `{1:{x,y}, 2: f32 scale}` — a single standalone decoration,
  14 occurrences each.

| sub | assets | instances | variant split | extent | reading |
|---|---|---|---|---|---|
| 11.2 | — | 14 | — | x 5–791 m, y 148–996 m | standalone decoration kind A [NAMED-ONLY] |
| 11.4 | — | 14 | — | x 3–1108, y 162–942 | standalone kind B [NAMED-ONLY] |
| 11.5 | — | 14 | — | x 36–1273, y 14–1190 | standalone kind C [NAMED-ONLY] |
| 11.8 | `U8Vi jvx8 xuYQ imri Zf3M ROgD T2BD` | 240 | 40/40/32/32/32/32/32 | **x 437–653, y 10–233 m only**; NN spacing median **3.0 m** | **harbour breakwater rubble** [INFERRED] |
| 11.9 | `n9mq f0KH 801A NnLD CDrn ivrI v20k` | 4125 | 590/590/589/589/589/589/589 | whole 5 km map; NN median 14.1 m; **+2 polygons (7.27 km², 6.35 km²)** | **deciduous trees + the two forest outlines** |
| 11.10 | `zfMH 4b7I 7ozN hUjk p12U ipCl 0jVV` | **0** | — | — | **coniferous trees** |
| 11.11 | `zSMB 5MgD w4qh Knaw 7OJb aFSI pjgc` | **0** | — | — | **palm trees** |

The 11.9/11.10/11.11 reading is strong: the create request set
`deciduousTreeProportion: 100, coniferousTreeProportion: 0, palmTreeProportion: 0`, and exactly one
of the three sprite groups has instances. **Each group carries 7 asset keys (4-char opaque ids) and
the instance's `variant` indexes into them.** The variant split is dead even (590/590/589×5 for
4125), i.e. sprites are assigned **round-robin, not randomly** — a cheap, seed-free way to keep the
mix uniform. [INFERRED from the exact counts]

11.8's tight 216 × 222 m bbox sits exactly over the harbour, 235/240 of its instances fall inside a
block-lot, and the render shows both harbour moles lined with dense small rock sprites at roughly
1–3 m spacing — hence "breakwater rubble". [INFERRED]

The three 14-instance groups resist identification. They sit **0.7–14 m from the nearest road**
(median ≈ 2 m) and 55–103 m from water, scattered across the whole town, 2–4 of each inside a
plaza-type lot. Plausible: wells / statues / bandstands / fountains / monuments from the district
`plotDecorationOptions` lists. That three unrelated kinds each have **exactly 14** instances is
suspicious and suggests a "one per N of something" rule, not independent Poisson placement.
**UNKNOWN.** [NAMED-ONLY]

---

## 4. The parameter surface (from `create-request.json`)

This is the most valuable artefact in the slice: FTG's entire tuning surface is client-visible
because the client POSTs it. Everything here is **[STATED]** — these are the creator's own names.

### 4.1 Layout

```jsonc
layoutParameters: {
  customStages: false,
  stages: [
    { key: "dense", buildingPlacement: "DENSE", proportionOfBuildings: 0.2,
      placeWallAfter: true, wallPlacement: "AROUND_ALL_LOTS", buildingMaterial: "WOOD",
      maxMainRoadAngle: 15, maxNormalRoadAngle: 15,
      spokeStaySpokeProbability: 0.5, maxSpokesInStage: 1, branchType: "CONTINUE",
      minDistrictArea: 100000, roadLength: 50,
      verticalBranchSegments: 4, horizontalBranchSegments: 4 },
    { key: "2", buildingPlacement: "GAPS", proportionOfBuildings: 0.5,
      placeWallAfter: false, wallPlacement: "AROUND_ALL_LOTS", buildingMaterial: "WOOD",
      maxMainRoadAngle: 15, maxNormalRoadAngle: 15,
      spokeStaySpokeProbability: 0.1, maxSpokesInStage: 1, branchType: "CONTINUE",
      minDistrictArea: 70000, roadLength: 60,
      verticalBranchSegments: 3, horizontalBranchSegments: 3 }
  ],
  wallType: "STONE_WALL",
  initialRoadsType: null,
  suburb: { density: 0.8, buildingPlacement: "GAPS", buildingMaterial: "WOOD",
            minOffshootSectionLength: 1, maxOffshootSectionLength: 2,
            mainRoadBranchProbability: 0.75, offshootBranchProbability: 0.75,
            roadLength: 30, maxMainRoadAngle: 15, maxOffshootRoadAngle: 15,
            backgroundTexture: "LAWN_TEXTURE_TYPE", roundedEdges: true,
            spokePriorityChange: 1, placeWallAfter: false,
            createPerimeterSpokes: true, perimeterSpokeDistanceMultiplier: 5 }
}
```

Read as a growth model: the town is built in **ordered stages**, each consuming a
`proportionOfBuildings` of the target population (0.2 dense core + 0.5 second ring + the remaining
0.3 into the suburb). Each stage grows roads by **extending "spokes"** (radial trunks) which either
stay a spoke or demote to a normal road (`spokeStaySpokeProbability`), with at most
`maxSpokesInStage: 1` new spoke per stage and `branchType: "CONTINUE"`. `verticalBranchSegments` /
`horizontalBranchSegments` (4,4 then 3,3) are the number of cross-street segments generated per
branch — this is a **rectangular sub-lattice grown off each spoke**, not a Voronoi or
straight-skeleton subdivision. `minDistrictArea` (100000 then 70000 cm² = 10 ha then 7 ha) is the
area threshold at which a district gets split off. The wall is placed **after stage 1**, tracing
`AROUND_ALL_LOTS` — i.e. around the union of stage-1 lots. [INFERRED reading of STATED names]

### 4.2 Landscape

```jsonc
landscapeParameters: {
  coastType: "COASTAL", rivers: true,
  generateRiverParameters: { maxConvergences: null, maxDivergences: null, width: null,
                             minDistanceBetweenBridges: 40, generationShape: null },
  waterDirection: null, forests: true, fertileLand: true, farmOption: null,
  reserveAreaForNaturalLandscape: true, mines: false, quarries: false,
  decorations: { stoneCircleCount: null, copseCount: null, pondCount: null, ruinsCount: null },
  climate: { climatePreset: "TEMPERATE_DECIDUOUS", naturalBackgroundTexture: "GRASS",
             individualTreesMultiplier: 1, forestTreesMultiplier: 1,
             deciduousTreeProportion: 100, coniferousTreeProportion: 0, palmTreeProportion: 0,
             outerDeciduousTreeProportion: 100, outerConiferousTreeProportion: 0,
             outerPalmTreeProportion: 0 },
  availableRawResources: ["FISH","LOGS","GRAIN","SHEEP","CATTLE","PIGS"]
}
```

Note the **inner/outer tree proportion split** — trees inside the settlement and trees in the
surrounding landscape are drawn from separate mixes. `decorations` names four landscape furniture
kinds (stone circles, copses, ponds, ruins) whose counts were left to the preset — candidates for
the unidentified 14-instance groups, though "exactly 14 of each" argues against it.

### 4.3 Districts

17 district archetypes, each with a `decoration` block of
`backgroundTextures / lotDecorationOptions / plotDecorationOptions[] / lotEdgeOptions /
waterfrontEdgeOptions / waterfrontEdgeBackground`:

`shantyTown, residentialLowerClass, residentialMiddleClass, residentialUpperClass, market,
highStreet, highEndServices, leisure, redLight, industrial, waterfront, castle, keep, university,
cathedral, smallSettlementCenter, fallbackGeneral` — plus `residentialDistrictOrder: "MOST_POPULOUS"`.

The decoration vocabulary is explicit:
* `backgroundTextures`: `DIRT_TEXTURE_TYPE` (shanty), `ROAD_TEXTURE_TYPE` (industrial, waterfront), else the default.
* `lotDecorationOptions`: `PARK`, `PLAZA`, `PLAZA_WITH_WELL`, `PLAZA_WITH_FOUNTAIN`, `DIRT`.
* `plotDecorationOptions`: weighted key→options rows, e.g. upper-class residential is
  `0.5 {GRASS,TREES,FENCES}`, `0.3 {GRASS,TREES}`, then `0.1` each of
  `{BANDSTAND} {STATUE} {MONUMENT} {FOUNTAIN}` and those four again `+{TREES}`;
  middle-class is `1.0 {}`, `1.0 {TREES}`, then `0.5` each of `{TREES,WELL} {TREES,BANDSTAND}
  {TREES,STATUE} {WELL} {BANDSTAND} {STATUE}`; shanty is `1.0 {}` and `1.0 {FIRE}`.
* `lotEdgeOptions` / `waterfrontEdgeOptions`: `TREES`; `waterfrontEdgeBackground`: `GRASS`, `ROAD_TEXTURE_TYPE`.
* `shantyTownDistrictConfig.tentPlacement: "INDIVIDUALLY_PLACED"`.

Note a **duplicate `key: 9`** in `highStreetDistrictConfig.plotDecorationOptions` (and the same in
`highEndServices`) — a latent data bug in the preset. [SHOWN]

### 4.4 Population / economy (not this slice's focus, but it constrains the map)

* `size: CITY`, `lifestyleDistribution: {SQUALID 1, POOR 1, MODEST 20, COMFORTABLE 40, WEALTHY 20, ARISTOCRATIC 10}`
* `militaryParameters: { configuration: "NORMAL", militaryTargetPercentage: 0.0067 }`
* `religionParameters: { religionTargetPercentage: 0.01, practiceReligionPercentage: 90 }` over 3 religions / 35 gods
* `factionsParameters: { numberOfRandomFactions: 4 }`
* `buildingsParameters`: **209 building types**, each with
  `providesResources / usesResources / items / services / minimumSize / requiresCoast /
  requiresRiver / requiresRawResources / poolTags / outsideSettlement / initialNumber / limit`;
  plus a **`dependencyGraph`** keyed by resource-provider role, e.g.
  `GRAIN_PROVIDER → coreDistribution [GRAIN_FARM] → shopDistribution [GRAIN_SHOP],
  oneBuildingForNumberOfPeople: 250, placeFirstAfterSettlementReachesPopulation: 0`;
  `defaultInsideSettlementShopProbability: 0.1`, `defaultOutsideSettlementShopProbability: 0.5`,
  `alwaysPlaceWorkplace: true`.
  `poolTags` are the placement pools: `RESIDENTIAL_COMMERCIAL`, `CRAFTS_COMMERCIAL`,
  `HIGH_END_SERVICES`, `COMMERCIAL_LEISURE`.
* `placeInWorld: { hemisphere: NORTHERN, maxSunHeight: HIGH, sunriseDirection: EAST,
  sunriseHour: 5, sunsetHour: 21, weather: CLEAR, season: SUMMER }`
* `calendar: { hoursInDay: 24, daysInWeek: [Mon..Sun], restDaysInWeek: [6,7] }`
* `statsGenerationParameters: { minStat 0, maxStat 20, baseline 10,
  statGenerationType: CONSTANT, statModifierType: HALF_PER_BASELINE_DIFF }`
* Size ladder (`presets.json → sizes`): METROPOLIS 49500 pop / 6000 m, BIG_CITY 24500/5500,
  **CITY 9500/5000**, SMALL_CITY 7600/4500, BIG_TOWN 5600/4000, TOWN 3625/3500, SMALL_TOWN 2400/3000,
  BIG_VILLAGE 900/2500, VILLAGE 450/2000, HAMLET 90/1500, BLANK 0/−1.
  **Population scales ~550× while width scales only 4×** — density, not extent, carries size.

---

## 5. Measured statistics

All numbers below were computed by `research/ftg-capture/analyse_layout.py` /
`probe_layout.py` from the captured blob. **CONFIRMED** = executed against the real payload.

### 5.1 Road network

* **5326 edges, 4303 nodes**, total length **361.0 km** over the 25 km² map.
* Degree histogram: **deg 1 = 83 (1.9 %), deg 2 = 2678 (62.2 %), deg 3 = 969 (22.5 %),
  deg 4 = 561 (13.0 %), deg 5 = 10, deg 6 = 2, deg 0 = 0.** No node exceeds degree 6.
  The 83 degree-1 nodes are cul-de-sacs (suburb offshoots) — FTG tolerates dead ends.
* **Degree-2 nodes dominate (62 %)** — the graph stores polylines as chains of 2-valent nodes, so
  "road" is an emergent run of edges, not a first-class object.

**Edge types (field 3.1.4), with length signature:**

| type | n | total km | median length | reading |
|---|---|---|---|---|
| 0 | 1214 | 59.3 | 50.5 m (modes 60 m ×385, 29 m ×239, 51 m, 100 m, 200 m) | **stage-1/2 core streets** — matches `roadLength: 50` / `60` |
| 1 | 207 | 19.4 | 65.5 m (mode 200 m ×46) | secondary trunk |
| 2 | 19 | 1.5 | 100 m | minor |
| 3 | 14 | 20.2 | 1123 m (max **3544 m**) | **outer world roads** leaving the map |
| 4 | 2575 | 83.3 | **29.4 m** (modes 29 m ×690, 30 m ×209) | **suburb streets** — matches `suburb.roadLength: 30` |
| 6 | 853 | 134.4 | 111 m | **farm tracks / rural lanes** (longest total) |
| 7 | 25 | 1.2 | 48 m | minor |
| 10 | 59 | 9.1 | 200 m (mode 200 m ×37) | rural grid line |
| 12 | 12 | 1.8 | **151.12 m ×10** | a fixed-length structure — bridge approach or pier spine? |
| 14 | 348 | 30.8 | **100.0 m** (modes 100 ×145, 99 ×54, 101 ×48) and almost perfectly straight (deg-2 deviation p99 = 3.26°) | **field-boundary / hedgerow lattice** |

Type 14's signature — 100 m segments, near-zero curvature — is the outer agricultural lattice you
can see as hedgerow lines in the render. [INFERRED]

**Turn angle at degree-2 nodes — the `maxMainRoadAngle: 15` / `maxNormalRoadAngle: 15` cap is real
and hard.** Per-type 1-degree bins of deviation-from-straight, restricted to <45°:

| type | 10° | 11° | 12° | 13° | 14° | **15°** | 16° | 17° | 18° | 19° | 20° |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | 11 | 19 | 24 | 20 | 16 | **0** | 0 | 1 | 0 | 0 | 1 |
| 1 | 5 | 3 | 5 | 2 | 6 | **0** | 0 | 0 | 0 | 0 | 1 |
| 10 | 3 | 3 | 2 | 6 | 3 | **0** | 0 | 0 | 0 | 0 | 0 |

Types 0, 1, 2 and 10 fall off a cliff at exactly 15°. **CONFIRMED.** Types 4 (suburb) and 6 (rural)
do not — they run to ~43–45°, so either the suburb cap is applied differently or those 2-valent
nodes are junctions between two independently grown runs.

The full deg-2 distribution is **bimodal**: 30.5 % within 2.5° of straight, then a second mass at
**exactly 90°** (p75 = 89.99°). Degree-2 nodes therefore serve two roles: mid-run curvature vertices
and **right-angle corners of the block lattice**.

**Junction geometry:** 5213 adjacent-arm angles at degree ≥ 3 — **p50 = 90.02°**, with 56 % of arms
in the 80–100° band and a second peak at 170–190° (a straight road with a side street). FTG's street
pattern is **locally orthogonal**.

**Global heading spectrum is flat** (8.0 % / 5.6 % / 5.1 % … across 18 ten-degree bins, max 8.0 % at
0–10°): there is **no single global grid axis** — each district/branch carries its own local
orthogonal frame, and the frames are rotated arbitrarily with respect to each other. This is the
visual signature of the render: locally rectilinear blocks, globally organic. [CONFIRMED]

### 5.2 Buildings

* **2798 buildings**, total footprint **1,213,721 m²**.
* Rings are closed; **true vertex counts: 3 → 9, 4 → 2514 (90 %), 5 → 188, 6 → 54, 7 → 15, 8 → 14,
  9 → 1, 12 → 2, 14 → 1.**
* Footprint area: mean **433.8 m²**, median 406 m², p5 198, p95 613, max 6399.
  Modal band 450–500 m² (15.2 %).
* Min-area-rectangle: **long side median 22.98 m, short side median 18.82 m**, aspect median 1.21
  (p95 = 2.01). **Rectangularity (area / OBB area) median 0.98; 50.4 % of buildings are ≥ 0.98.**
* Among the 2514 true quads, the **worst corner's deviation from 90°** has median **0.91°**
  (50.8 % under 1°), but a long tail: p95 = 27.5°, p99 = 68.5°. So most buildings are true
  rectangles, and a minority are deliberately sheared into parallelograms/trapezoids to fill
  awkward plots. Quad side lengths: median **20.66 m**, p5 12.0, p95 27.2.

**Takeaway for a re-implementer: FTG's "building" is a large compound structure (~20 × 20 m,
~400 m², ~5 sub-locations), not a single medieval cottage.** This is a modelling choice, not a bug —
the entity model needs rooms.

**Special footprints** (these are the map's landmarks):

| label | verts | area | bbox | note |
|---|---|---|---|---|
| temple ×2 | **12** | 371 m², 1401 m² | 52×30 m, 53×56 m | **6-pointed star**: alternating radii 6.7/28.0 and 16.4/28.5 m |
| temple | 14 | 1702 m² | 61×56 m | 7-pointed star, radii 11.4–34.2 m |
| temple | 8 | 2645 m² | 78×69 m | near-regular octagon, radii 33.8–40.0 m |
| theatre | 9 | 3866 m² | 123×97 m | elongated, radii 25.7–81.9 m |
| market square ×2 | 5 / 4 | 3769 m², 4672 m² | 54×118 m, **102×102 m** | a plain open square; 8.9 = 0 rooms |
| homes ×9 | 3 | 140–307 m² | — | triangles wedged into leftover plots |

The grey star visible in the render at street-level zoom is a **temple**, measured at ~25–30 m
across on screen — matching the 12-vertex temple's 28 m outer radius. [CONFIRMED]

**Entrances (8.6).** Distance from the entrance point to the building's own outline: **median 0.01 m,
p95 0.02 m** → the entrance is a point **exactly on the perimeter**. Distance from the entrance to
the nearest road: **median 4.56 m, p95 8.84 m** — entrances sit a doorstep's width off the street.
The angle between the *centroid→entrance* direction and the nearest road's direction is
**median 77.9°, with 38.9 % in the 85–90° bin** → **the entrance is placed on the building face that
points at the road, i.e. FTG picks the frontage edge and puts the door on it.** [CONFIRMED]

**Setback.** Centroid → nearest road: median **5.61 m**, p95 12.8 m, max 39.7 m.
Nearest polygon vertex → road: median **1.46 m**, and **82.2 % of buildings have a corner within 2 m
of a road centreline.** Buildings are pushed hard against the street edge.

**Alignment.** |OBB axis − nearest-road heading| is bimodal: **31.8 % within 5°** and **16.4 % in
85–90°** — about **48 % of buildings are axis-locked to their street** (parallel or perpendicular);
the rest are free. A pure "rotate to the road" rule would show ~100 %, so FTG either aligns only in
certain placement modes (`DENSE` vs `GAPS`) or aligns to the *plot* rather than the road, and plots
are not always road-parallel. [CONFIRMED measurement, INFERRED cause]

**Terracing.** Only **241 / 2798 (8.6 %)** buildings share a vertex (within 0.5 m) with another
building. The terraced-row look in the render is produced by **tight packing with small gaps**, not
by shared walls. [CONFIRMED]

### 5.3 Lots / blocks (field 9) — 11 groups, 1176 lots

| 9.1 | lots | total | median area | verts (med/max) | extent | buildings inside | trees inside* | reading |
|---|---|---|---|---|---|---|---|---|
| **18** | **901** | 243.5 ha | **1764 m²** | 6 / 275 | x 2–1850, y 1–2559 m | **1863 (66.6 %)** | 27.6 % | **BUILDING BLOCK** (the unit buildings are packed into) |
| 2 | 51 | 4555 ha | 1710 m² *(17 lots sit at ~1700 m²)*; max **12.47 km²** | 6 / 281 | whole map | 868 (31 %) | 76.8 % | mixed: small in-town parcels **+ huge background regions** (sea/land masks) |
| 8 | 15 | 18.1 ha | 1666 m² (7 big: 14.7–31.1 k m²) | 7 / 25 | x 0–772, y 0–768 m | 417 | 2.2 % | **PLAZA / public open space** — only group with `9.2.4=1, 9.2.5=1` |
| 11 | 34 | 332.6 ha | 101,595 m² | 7 / 17 | whole map | 153 | 11.4 % | **farm field, crop A** |
| 1 | 31 | 276.4 ha | 89,550 m² | 7 / 42 | whole map | 254 | 12.8 % | farm field, crop B |
| 0 | 33 | 322.1 ha | 95,939 m² | 7 / 28 | whole map | 33 | 9.7 % | farm field, crop C |
| 13 | 30 | 304.4 ha | 99,275 m² | 7 / 39 | whole map | 194 | 10.7 % | farm field, crop D |
| 3 | 40 | 404.2 ha | 107,335 m² | 7 / 41 | whole map | 109 | 12.6 % | farm field, crop E |
| 12 | 35 | 326.1 ha | 99,845 m² | 8 / 21 | whole map | 135 | 9.2 % | farm field, crop F |
| **4** | **2** | 1362.4 ha | 6.35 / 7.27 km² | 179 | x 83–4303, y 714–4996 | 93 | 16.7 % | **FOREST** — the identical two polygons also appear as `11.9.3` |
| 20 | 4 | 152.9 ha | 60.7 k / 63.5 k / 660.6 k / 744.5 k m² | 115 | whole map | 113 | 6.3 % | **reserved natural area** (`reserveAreaForNaturalLandscape: true`) |

\* trees sampled 1-in-10 (413 of 4125). Lot sets overlap (a tree can be in a field *and* a
background region), so the columns do not sum to 100 %.

The sub-field `9.2.5` cleanly separates three render classes: **0** for groups 2 and 18 (in-town
blocks/parcels), **1** for group 8 (plazas), **2** for every outside-settlement group (fields,
forest, reserve). `9.2.3` always equals the group's `9.1`, so the type is duplicated per lot. Six
field groups match the six `availableRawResources` slots (`FISH, LOGS, GRAIN, SHEEP, CATTLE, PIGS`)
in count, and the render shows ploughed-brown / wheat-cream / pasture-green / olive field textures.
[INFERRED]

**Blocks are the faces of the road graph.** Block-lot edge lengths (5910 of them) cluster hard:
**43 % fall in the 30 m bin** (matching `suburb.roadLength: 30`) and a second peak at **60 m**
(matching stage-2 `roadLength: 60`); median 29.4 m, p90 60.0 m. Blocks contain **mean 3.39 buildings**
(median 2, p95 7, max 133); **116 / 901 blocks (12.9 %) are empty**. Occupied blocks average
2977 m² and 3.89 buildings = **766 m² of block per building against a 433 m² footprint → ~57 % block
coverage.** [CONFIRMED]

### 5.4 Water (field 6) — 4 polygons

| id | pts | bbox | closed area | segment length | touches map edge |
|---|---|---|---|---|---|
| 1 | 9 | x 272–649, y 22–347 m | 58,848 m² | mean 133.9 m, **median 100.0 m** | 0 |
| 2 | 102 | x 1096–4010, y 1091–5000 m | 305,912 m² | mean 98.1, median 99.9 | 3 |
| 3 | 133 | x 15–5000, y 343–3023 m | 286,199 m² | mean 99.3, median 99.9 | 2 |
| 4 | 129 | x 20–5000, y 22–5000 m | **5,589,977 m²** | mean 118.3, median 100.0 | 5 |

Polygon 4 (5.59 km² of the 25 km² map, touching five map-edge points) is **the sea**; 2 and 3 are
**river reaches**; 1 is a small closed water body (the harbour basin or a pond).

**Every water outline is resampled to a uniform 100 m step** (median segment 99.9–100.0 m on all
four). FTG generates water as a coarse path and then walks it at a fixed arc-length — a re-implementer
should expect to smooth it at draw time, because 100 m chords would look faceted, and the render
shows smooth curves. [CONFIRMED measurement, INFERRED smoothing]

### 5.5 Wall (field 7) — 17 towers

17 objects `{id, {x,y}, scale 1.0, kind 7}`. Ordered by id they form an **open polyline** with
segment lengths **37.9 – 101.3 m** (median ≈ 75 m) and smoothly varying headings
(210° → 212° → 213° → 268° → 275° → 145° → 56° → 58° → 60° → 60° → 58° → 56° → 53° → 47° → 39° → 26°).

All 17 points are **also vertices of the "Beer Forest" district ring**; 11 of them are vertices of
"Rustic Village" and 6 of "Ash Town". The render confirms it directly: in
`007-building-level.png` a **slate-grey crenellated band with round tower discs at intervals** runs
along the inland edge of the walled waterfront district, and the same structure in
`reference/towngenerator-foundrymodule/docs/map_view.png` is drawn as a dark polyline with round
nodes, with roughly 16–17 nodes around the circuit.

→ **Field 7 = wall towers; the wall polyline is the tower chain; the wall is routed along
district/lot boundaries** (consistent with `wallPlacement: "AROUND_ALL_LOTS"` after stage 1).
The wall band geometry itself is not in the payload — the client must draw it by stroking the
tower polyline. [INFERRED, high confidence]

### 5.6 Trees and forests

* **4125 tree instances**, 7 sprite variants assigned round-robin (590/590/589×5).
* Nearest-neighbour spacing: mean **15.94 m**, median **14.14 m**, p5 3.6, p95 33.5, min 0.28 m.
* **There is no hard minimum distance** (min 0.28 m), so this is **not Poisson-disc**. The
  distribution is a broad unimodal hump peaking at 10–12 m — consistent with **independent random
  placement inside region polygons at a density target**, plus deliberate overlap for canopy clumps.
  [CONFIRMED measurement; the negative result is the load-bearing part]
* The two `11.9.3` polygons (7.27 km² with 61 verts, 6.35 km² with 179 verts) are **byte-identical in
  area to the two `9.1 = 4` lots** — the forest exists twice in the payload, once as a land-use lot
  and once as a tree-layer region.
* 11.8's 240 rubble sprites have NN median **3.0 m** (p95 5.6, max 7.6) in a 216 × 222 m box — a
  much tighter, bounded scatter than the trees.

### 5.7 Districts — measured

| district | ring verts | shoelace area | **rasterised area (5 m grid)** | ratio | buildings inside | perimeter | compactness 4πA/P² |
|---|---|---|---|---|---|---|---|
| Beer Forest | 45 | 187,895 m² | 194,150 | 1.03 | 464 | 2492 m | 0.38 |
| Rustic Village | 43 | 42,494 m² | **189,850** | **4.47** | 613 | 2687 m | 0.074 |
| Ash Town | 56 | 233,781 m² | 235,700 | 1.01 | 616 | 3518 m | 0.24 |
| Green Wood | 41 | 195,083 m² | 195,025 | 1.00 | 290 | 2430 m | 0.42 |

**Rustic Village's ring is self-intersecting** — its shoelace area is 4.47× smaller than the true
rasterised area. This is a **real generator failure mode that ships in the payload**: the district
boundary is a vertex ring that is not guaranteed simple. A re-implementer who fills district rings
with a non-zero winding rule will see a hole/inversion there; even-odd or a rasterised fill is
required, or the ring must be repaired. [CONFIRMED]

Ring boundary segment lengths: mean 55–63 m, median 50–62 m, with **minimum 0.0 m** in every
district — i.e. the rings contain **duplicate consecutive vertices**. Another robustness hazard.
[CONFIRMED]

1983 of 2798 buildings (71 %) fall inside some district ring; the remaining 29 % are suburb/outskirt
buildings that belong to no district. Across the four rings that is 814,725 m² of rasterised district
area for 1983 buildings = **411 m² of district land per building** against a 433 m² mean footprint —
i.e. the rings hug the built area so tightly that they nominally under-cover it by ~5 %, because
boundary buildings overhang the ring and a few are counted by two overlapping rings. [CONFIRMED]

### 5.8 Settlement footprint

* Building centroids span **x 6 – 3904 m, y −39 – 4518 m** (note the **negative y** — at least one
  building sits outside the declared 0..5000 extent; outlying farms are placed without clamping).
* Centre of mass **(440.7, 680.5) m**; radius from it: **p50 = 487 m, p90 = 954 m, p99 = 1524 m,
  max 5169 m.**
* So the **core is ~1.9 km across**, with a long tail of isolated farmsteads out to the map edge.
  Inside p90 the built density is ~1000 buildings/km² ≈ 43 % ground coverage.
* 2798 buildings for a `roughPopulation` of 9500 → **~3.4 people per building**, and ~5 rooms each.

---

## 6. Inferred generation pipeline

Assembled from the parameter names (STATED), the measured geometry (CONFIRMED), and the render
(SHOWN). Every step is **[INFERRED]** as a whole; the citations say which part is grounded.

1. **Pick size** → `width` and `roughPopulation` from the size ladder (`presets.json/sizes`).
   Lay down a 5000 m square map.
2. **Landscape first.** Coast (`coastType: COASTAL`), river system (`rivers: true`, with
   `maxConvergences/maxDivergences/width/generationShape` knobs and
   `minDistanceBetweenBridges: 40`), forests, fertile land, `reserveAreaForNaturalLandscape`.
   All water outlines are emitted **resampled to a uniform 100 m step** (§5.4).
3. **Seed the settlement** at a site on the coast/river and grow it in **ordered stages**, each
   taking `proportionOfBuildings` of the target population (0.2 → 0.5 → remainder to the suburb).
4. **Within a stage, grow roads as spokes + branches.** A spoke is a radial trunk; at each step it
   either remains a spoke (`spokeStaySpokeProbability` 0.5 then 0.1) or demotes; at most
   `maxSpokesInStage: 1` new spoke per stage; `branchType: "CONTINUE"`. Off each spoke, a local
   rectangular lattice of `verticalBranchSegments × horizontalBranchSegments` (4×4, then 3×3) cross
   streets is grown at `roadLength` (50 m, then 60 m). **Direction changes between consecutive
   collinear segments are clamped to `maxMainRoadAngle` / `maxNormalRoadAngle` = 15°**
   (CONFIRMED: hard cutoff at 15° in the 1-degree histogram for edge types 0/1/2/10).
   Junctions are predominantly orthogonal (median arm angle 90.02°) but each lattice carries its own
   rotation, so the **global heading spectrum is flat** (CONFIRMED).
5. **Blocks = the faces of the road graph.** Block edge lengths reproduce the stage `roadLength`
   values exactly (43 % at 30 m, second peak at 60 m — CONFIRMED). Median block 1764 m²;
   a strong mode near 1700 m² suggests blocks are further split toward a target area.
6. **Districts** are split off when a region exceeds `minDistrictArea` (100000 then 70000 cm²
   = 10 ha then 7 ha) and are typed from the 17 archetypes; `residentialDistrictOrder:
   "MOST_POPULOUS"` orders the residential assignment. District boundaries are emitted as vertex
   rings that **are not guaranteed simple** (CONFIRMED failure, §5.7).
7. **Wall after stage 1** — `placeWallAfter: true`, `wallPlacement: "AROUND_ALL_LOTS"`,
   `wallType: "STONE_WALL"`. The wall traces lot/district boundary vertices; only its **tower chain**
   is serialised (§5.5).
8. **Buildings are packed into blocks.** `buildingPlacement: "DENSE"` in stage 1 and `"GAPS"` in
   stage 2 and the suburb (`suburb.density: 0.8`). Footprints are **rectangles by default**
   (median corner error 0.91°, rectangularity 0.98) that get **sheared into parallelograms /
   trapezoids / triangles when the plot demands it** (p99 corner error 68°, 9 triangles).
   ~48 % end up axis-locked to their street. 82 % have a corner within 2 m of a road centreline.
   Buildings do **not** share walls (8.6 % vertex contact).
9. **An entrance is stamped on the road-facing edge** — exactly on the outline, median 4.6 m from
   the road, at ~78° to the road direction (CONFIRMED).
10. **Function assignment** runs off the `dependencyGraph` (§4.4): resource-provider roles emit one
    core building per `oneBuildingForNumberOfPeople: 250`, gated by
    `placeFirstAfterSettlementReachesPopulation`, `minimumSize`, `requiresCoast`, `requiresRiver`,
    `requiresRawResources`, with shops attached at `defaultInsideSettlementShopProbability: 0.1` /
    `defaultOutsideSettlementShopProbability: 0.5`. `poolTags` pick which district pools a type may
    land in. Landmark types (temple, market square, theatre) get **bespoke footprints** — star and
    octagon plans rather than rectangles (§5.2).
11. **Outside the walls**: farm fields cut on a ~100 m lattice (edge type 14, near-perfectly straight,
    100 m segments), six crop groups of ~30–40 fields at ~10 ha each; forest polygons; a reserved
    natural area; and a rural road/track web (edge type 6 — the single longest class at 134 km).
12. **Decorate**: trees (round-robin over 7 sprites, random placement to a density target, **no
    Poisson-disc minimum**), harbour rubble, plot furniture (wells/statues/bandstands/fountains/
    fences/grass) drawn from the district's weighted `plotDecorationOptions`.
13. **Populate**: races × genders × partner matrices → households → jobs → schedules; the whole
    person model ships in the same blob (fields 13–19).

---

## 7. Foundry VTT module — entity model & event protocol

`reference/towngenerator-foundrymodule/` (MIT, Thomas Allerton, v2.0.4, Foundry 12–13).
Everything in this section is **[STATED]** — it is the author's own code.

### 7.1 Architecture

The module does **not** re-render the map. `src/canvas.js` injects a **full-window iframe** of
`https://www.fantasytowngenerator.com` over Foundry's board and hides `#ui-left-column-1`:

```
GM:      {ORIGIN}/user/settlements/{settlementId}?context=foundryvtt{majorVersion}[&loginCode=true]
Players: {ORIGIN}/public-settlements/{settlementId}?context=foundryvtt{majorVersion}
+ &external_calendar={hour}-{dayOfTheWeek}-{weekdayName}   (when Simple Calendar is active)
```

The Foundry scene is a fixed **5000 × 5000** empty scene (`src/ImporterForm.js`), grid type 0,
padding 0, `tokenVision: false`, `globalLight: true` — the scene exists only to host the iframe.
**5000 is exactly the CITY map width in metres** (§2): the scene is 1 Foundry unit per metre.

Import payload is a two-field JSON: `{ "id": "<uuid>", "name": "<settlement name>" }`.
The settlement id is stored as scene flag `fantasy-town-generator-import.settlementId`.
FTG must whitelist the Foundry origin ("iframe origins" setting, per-settlement for free users).

### 7.2 Event protocol (`postMessage`, JSON-stringified `{type, data}`, origin-checked)

**FTG → module** (`src/listener.js`, `FtgEvent`):

| type | payload |
|---|---|
| `BUILDING` | full building details **+ the people currently there** |
| `DISTRICT` | full district details |
| `FACTIONS` | all factions incl. leaders and members |
| `BUILDINGS` | favourite buildings |
| `PEOPLE` | favourite people |
| `NEW_PLAYER_CURRENT_LOCATION` | `{ stateId, buildingId \| null }` |
| `NEW_SETTLEMENT_TIME` | `{ stateId, newTime }` |
| `BUILDING_UPDATE` / `PERSON_UPDATE` | `{ data, stateId }` |
| `PEOPLE_UPDATE` / `BUILDINGS_UPDATE` | `{ stateId }` (favourites changed) |
| `PIN` / `PIN_UPDATED` / `PIN_DELETED` | full pin / pin id |
| `OPEN_EXTERNAL_CALENDAR` | none |
| `MOUSE_MOVE` | mouse coords — re-dispatched as `mousemove`/`pointermove` on the parent window so Foundry's drag controls keep working under the iframe |

**module → FTG** (`src/notifier.js`):
`NEW_PLAYER_CURRENT_LOCATION`, `NEW_SETTLEMENT_TIME`, `UPDATE_BUILDING`, `UPDATE_PERSON`,
`UPDATE_PEOPLE`, `UPDATE_BUILDINGS`, `PIN_UPDATED`, `PIN_DELETED`, `SIMULATE_TIME`,
`CREATE_EVENT` (building id), `PLAYER_CURRENT_LOCATION` (`{newLocation}`),
`FAVOURITE_BUILDING` (`{buildingId, favourite}`), `FAVOURITE_PERSON` (`{personId, favourite}`),
`BUILDING_NOTE` (`{buildingId, notes, publicNotes}`), `PERSON_NOTE` (`{personId, …}`).

**`stateId`** accompanies every mutation and is relayed to other clients over Foundry's socket —
it is FTG's **optimistic-concurrency / state-version token**: the module never holds settlement
state, it just fans the `stateId` out so every client's iframe re-syncs to the same version.

`SIMULATE_TIME` is throttled by the module (`previousSimulateHour` / `previousSimulateDayOfWeek`)
and carries `{hourInDay, dayInWeek, dayInWeekName}`. Per `README.md`, **FTG matches the weekday by
*name* first and falls back to weekday *index*; an unmatched day is simulated as "unknown", which
generally means everybody has a clear schedule and relaxes.**

### 7.3 Entity fields exposed (from the Handlebars templates — these are FTG's own field names)

**Building** (`handlebars/building.hbs`): `id, name, time, description, openStatus (enum,
`NOT_APPLICABLE` means no hours), openingTimes.{openHour,closeHour}, stock[{item, price}],
services[{service, price}], notes, publicNotes, publicCanWriteNotes, favourite,
isPlayerCurrentLocation, subLocationsSummary.{numberOfPeople, subLocations[{name, currentPeople[]}]}`.

**Person** (`handlebars/person.hbs`, `src/PersonDialog.js`): `id, firstName, lastName, age, gender,
race, job.title, currentStatus, appearanceLines[], personality, customPersonality, hobbies,
interactionMannerism, religionFormat, goal, stats[{name, value}], notes, publicNotes,
publicCanWriteNotes, favourite`, plus a skin descriptor `{vlsNumber}` and a height in cm.

`currentStatus` enum (icon mapping in `src/BuildingDialog.js`):
`WORKING` (briefcase), `STUDYING` (book), `SLEEPING` (sleeping face), `RELAXING` (mug),
`RELAXING_AT_HOME` (house), `AT_EVENT` (bolt).

Skin tone from `vlsNumber` (Von Luschan scale), bucketed 0–6 pale, 7–12 light, 13–19 light tan,
20–26 dark tan, 27–33 brown, 34–35 dark brown.

**Faction** (`handlebars/faction.hbs`): `id, name, description, goals, goalCompletionMethods,
operatesSecretly, roles[{title, people[]}], notes`.

**District** (`handlebars/district.hbs`, `src/DistrictDialog.js`): `id, name, description`
(whitespace-preserved). District *type* enum used by the module:
`SQUALID, POOR, MODEST, COMFORTABLE, WEALTHY, ARISTOCRATIC, INDUSTRIAL` — note this is the
**lifestyle** axis, orthogonal to the 17 district archetypes in §4.3.

**Price** is a coin bundle `{pp, gp, ep, sp, cp}`.

Journal linking is module-side only (`src/journalSettings.js`): a world setting maps
`settlementId → {people, buildings, factions} → entityId → {documentUuid, pageUuid,
openAutomatically}`. Note `getPinJournalSettings` reads a `pins` key that
`defaultSettlementSettings()` never creates — a latent bug in the module.
`ClientNotifications.PEOPLE_UPDATE` is also set to the string `'PERSON_UPDATE'`, colliding with
`PERSON_UPDATE` — a second latent bug. [SHOWN]

### 7.4 What the module's screenshots show about FTG's own UI

`docs/layers.png` — the **"Building type" layer** with a full categorical legend
(Government, Artisan, Cultural, Educational, Farm, Residence, Tavern, Inn, Shop, Service, Religious,
Warehouse, Law enforcement, Industrial, Market, Faction) — this is the key that decodes field 8.4.
Also a breadcrumb bar of visited entities (`Forest | ◎ Marlton | Shop | Tavern | Tralienmyr`), a
"Search buildings" box, `Building type ▾` / `Districts ▾` dropdowns, a clock `19:00 3/7` with
*Next Hour* / *Time Skip*.

`docs/map_view.png` — the **older FTG render** (pre-2026): buildings are brown on explicit pale
grey plot polygons, fields are flat pale blocks with no hedgerows, no beach/foam, no field textures,
no dock piers. Useful as an **iteration baseline** against Galeiaward.

`docs/buildings_people.png` — the entity dialogs; source for the sub-location reading of 8.9.

---

## 8. Visual specification (Galeiaward render, Sept 2026)

Colours sampled directly from `001-load-settlement.png` and `007-building-level.png`.
Scale bars measured: 100 m = 134 px (007), 250 m = 273 px (006), 250 m = 181 px (004),
500 m = 295 px (001).

### 8.1 Palette

| feature | hex | note |
|---|---|---|
| open sea | `#67819c` | flat, very slightly noisy |
| nearshore sea | `#7795b3` | lightens toward the shore |
| harbour water (inside the moles) | `#7a99b8` | lighter still — sheltered water is a distinct tone |
| beach / sand | warm tan strip | a 1–3 px cream band plus a soft white **foam line** exactly on the waterline |
| grass / pasture | `#a4c28e` | the default land background |
| ploughed field | `#a08d7f` | grey-brown |
| wheat / fallow field | `#efdfa7` | pale cream-yellow |
| forest canopy | `#849c6b` | darker, with dense tree sprites on top |
| in-town lawn / garden plot | `#adb69d` – `#aeb79e` | paler, greyer green than open pasture |
| road & plaza paving | `#c6c2bb` | warm light grey |
| road edge / shading | `#bbb7b1` | 1 px darker rim; roads read as slightly raised slabs |
| building — wood | `#81695b` / `#846a5a` | mid warm brown |
| building — wood, shaded face | `#745d4f` | |
| building — stone | `#686a6e` / `#787a7e` | temples, civic halls, big warehouses |
| town wall band | `#6f7276` with `#535659` / `#38393b` edging | |
| wall tower | `#6f7276` filled disc, slightly wider than the band | |
| pier / jetty bar | `#bcb8b2` | |

### 8.2 Terrain

* **Ground is a painted raster, not flat fill**: fine per-pixel noise everywhere, different grain for
  grass vs ploughed vs paving.
* **Fields** are irregular convex-ish quadrilaterals/pentagons (median 7 verts, ~10 ha) in four to six
  tones. Adjacent fields are separated by **hedgerows** — dotted lines of small tree sprites laid
  along the field boundary, matching the perfectly straight 100 m edge-type-14 lattice.
* **Forest** is a filled darker-green polygon with tree sprites scattered densely on top; the
  polygon edge is soft, not a hard outline.
* **Coast**: sea → nearshore lightening → a thin white **foam** line on the waterline → a tan beach
  strip → grass. No cliffs in this preset.
* **River**: a light blue-grey ribbon, smoothly curved (despite 100 m source vertices), narrowing
  upstream, with a **bridge** rendered where a road crosses (the road runs straight over a small
  pale deck).

### 8.3 Roads

* Drawn as **filled bands** (not strokes over a fill) in `#c6c2bb`, with a slightly darker 1 px rim.
* Widths are hierarchical: main streets ≈ 2× the width of alleys; rural tracks outside the town are
  thinner and slightly warmer in tone.
* Corners are **mitred**, junctions are filled polygons — no visible stroke caps.
* Outside the settlement the same tone thins to a dusty track.

### 8.4 Blocks, plots, plazas

* Plazas and market squares are **large paved voids** in the same `#c6c2bb` as the roads — the
  102 × 102 m market square reads as a big blank square in the street fabric.
* Residential block interiors are **pale sage lawn** (`#adb69d`) with tree sprites and occasional
  furniture (a grey **well** disc; small blue points at low zoom).
* The waterfront/industrial district's background is the **road texture** (per
  `waterfrontDistrictConfig.backgroundTextures: ["ROAD_TEXTURE_TYPE"]`) — visibly a pale paved
  ground under the warehouses, unlike the green residential ground. [SHOWN, matching STATED config]

### 8.5 Buildings

* Flat-filled polygons with a **diagonal tonal split** across the footprint — a light half and a
  dark half meeting on a ridge line, giving a cheap pitched/hipped-roof read at every zoom.
* Each building casts a **soft offset drop shadow** toward the lower-right; the shadow is what
  separates adjacent buildings in a terrace (they do not share walls, §5.2).
* No outlines, no windows, no per-building detail at any captured zoom.
* Stone buildings use the grey ramp instead of the brown ramp — the material comes from
  `buildingMaterial` (`WOOD` for both stages here; the grey ones are type-driven: temples, civic and
  warehouse structures).
* Landmarks are **shape-coded, not icon-coded**: temples are 6- or 7-pointed stars or octagons,
  the theatre is a 9-gon, market squares are large plain quads.

### 8.6 Wall, towers, harbour

* Wall: a **slate-grey crenellated band** (a run of small merlon squares along the outer edge), with
  **round tower discs** at ~40–100 m intervals, drawn on top of the band.
* The wall passes over streets without a drawn gate in this render.
* Harbour: two **breakwater moles** — narrow pale causeways edged on both sides with a dense,
  irregular scatter of small rock sprites (the 240 `11.8` instances); the lower mole has an L-kink.
* Inside them, ~14 **piers**: uniform grey bars (`#bcb8b2`) projecting perpendicular from the quay
  at even spacing and varying lengths.
* The sheltered water between the moles is drawn one step lighter than the open sea.

### 8.7 Trees

* 7 sprite variants. Each is a cluster of 4–7 overlapping green blobs with a darker outline and a
  lighter highlight, plus a soft lower-right shadow — matching the building shadow direction, so the
  whole map has one consistent light source (upper-left).
* Sizes vary per instance even though every serialised `scale` is exactly `1.0` — **the size
  variation is in the sprite art, not in the payload.** [CONFIRMED: all 4125 scales are 1.0]

### 8.8 Labels

* **District labels**: serif, **Title Case**, black glyphs with a thick cream/white outline halo,
  **set along a curve** (per-glyph rotation following a spine through the district). Size scales with
  district importance/area — "Beer Forest" and "Ticwick" are large, "Ashton" is small and nearly
  hidden. The label is placed inside the district, anchored near `10.4`.
  (The older render in `docs/map_view.png` used white-with-black-outline small-caps set
  horizontally — so the curved-label treatment is a newer iteration.)
* No street names, no building labels on the map — building names live in the search box and dialogs.

### 8.9 UI chrome

* **Top-left**: a cream plaque with a thin border and the settlement name in navy **serif small
  caps** (`GALEIAWARD`); above it a row of 11 dark circular icon buttons (regenerate, journal,
  tools, people, buildings, bookmark, settings, download/export, gear, add, save).
* **Top-right**: a rounded "Search buildings" input with a red magnifier; below it two dropdowns,
  `▧ Satellite ▾` (layer style) and `Tt Districts ▾` (label layer).
* **Bottom-right**: `+` / `−` zoom buttons and a re-centre button; a scale bar that steps
  500 m → 250 m → 100 m with the zoom; a unit toggle (`m`); a grid toggle and a pencil (draw/pins)
  button.
* **Bottom-right panel**: the clock — `9:00 Monday` in a large light serif, with red-iconed
  *Next Hour* and *Time Skip* buttons and a sun/moon indicator.
* **Brand** (landing page): navy serif small caps `FANTASY TOWN GENERATOR` on a cream plaque, a
  logo of four brown quads crossed by street lines, tagline
  *"Every street, building, and resident - ready in seconds."*, CTAs in brick red
  (`Sign In`, `Create Free Account`, `Create one-time settlement`).
* The landing hero shows a **much larger, denser city** with a pronounced **concentric-radial**
  street pattern in the core — noticeably more "wheel-like" than Galeiaward, which reads as
  spoke-and-lattice. Either a METROPOLIS preset or a different `initialRoadsType`. [SHOWN]

---

## 9. Failure modes and robustness hazards observed in the shipped payload

1. **Non-simple district rings.** Rustic Village's ring self-intersects (shoelace area is 4.47×
   too small). [CONFIRMED]
2. **Duplicate consecutive vertices** in every district ring (min segment length 0.0 m). [CONFIRMED]
3. **Degenerate roads**: shortest edge is **0.01 m**; 157 edges (2.9 %) are under 5 m. One edge type-3
   segment has length 0.0 m. [CONFIRMED]
4. **Buildings outside the declared extent**: at least one centroid at **y = −39 m** against a
   declared 0..5000 range. [CONFIRMED]
5. **Degenerate footprints**: smallest building is 2.51 m²; 12 buildings are under 50 m²; one OBB
   short side is 1.06 m with aspect 17.76. [CONFIRMED]
6. **109 of 2798 buildings have no entrance point** (field 8.6 absent) — 3.9 %. [CONFIRMED]
7. **Preset data bug**: duplicate `key: 9` rows in `highStreetDistrictConfig` and
   `highEndServicesDistrictConfig` `plotDecorationOptions`. [SHOWN]
8. **Generation is slow enough to be a product constraint**: ~5 minutes server-side for a CITY, and
   the client shows nothing but a spinner. Two consecutive creates both took ~300 s. [SHOWN]
9. FTG emits **no stage/progress trace at all** — nothing to reverse-engineer from the console,
   unlike watabou's generators. [SHOWN]

---

## 10. What this slice tells an original implementation

* The **payload is the contract**: roads (typed edge graph with adjacency), buildings (closed ring +
  entrance + category + label + room count), land-use lots in typed groups, district rings + label
  anchors, water outlines, wall tower chain, and sprite layers with asset keys + variant indices.
  That set is sufficient to draw everything in the render **except the wall band and the piers**,
  which the client must synthesise.
* **Integers in centimetres** over a fixed square extent is a good, compact serialisation choice
  (593 KB for 2798 buildings + 4303 nodes + 4125 trees + the whole population model).
* The **15° max-turn clamp** is the single most identifiable geometric signature of FTG's road
  generator and is directly measurable. An original generator should pick a *different* mechanism
  (e.g. curvature-continuous splines, or a tensor field) rather than a per-vertex angle clamp.
* **Blocks-as-road-graph-faces** with a ~1750 m² target and ~3.4 buildings each, at ~57 % coverage,
  is the density recipe.
* Trees are **not** Poisson-disc, sprites are **round-robin**, and scale is always 1.0 — three cheap
  choices that are visible in the statistics and worth deliberately improving on.
* Population scales 550× across the size ladder while width scales 4× — so **the map is a fixed
  canvas and size is expressed as density**, which caps the largest settlement's legibility.

---

## 11. Open questions a re-implementer must decide

1. **What are the three 14-instance decoration groups (11.2 / 11.4 / 11.5)?** Near roads, scattered
   town-wide, exactly 14 each. Wells / statues / bandstands / fountains / monuments are the
   candidates from `plotDecorationOptions`, but the equal counts suggest a per-something rule.
2. **Where are the piers?** ~14 uniform pier bars are clearly drawn, but no field in the payload has
   14 harbour-local geometries. Candidates: lot group `9.1 = 8` (15 lots, harbour-area bbox), or
   edge type 12 (12 edges, all **151.12 m**). Unresolved.
3. **Axis orientation.** Is `+y` south or north on screen? The render's sea is at low x/low y but the
   render is also panned/rotated by the camera. Needs a direct pixel↔coordinate calibration.
4. **`8.8` semantics.** Roof-ridge/variant index is the best reading of the 0/1 split, but the
   per-label values (temples 9/10/11, farms 4/5/13/14) are unexplained.
5. **`field 20 = {1:6}`** and **`field 22.5 = [12,14]`** (vs `restDaysInWeek: [6,7]`).
6. **Lot group `9.1 = 2`** mixes ~1700 m² town parcels with multi-km² background regions — is it one
   type with a flag, or does `9.2.3` carry a distinction the payload doesn't expose here?
7. **Why is only ~48 % of buildings axis-locked to its street?** Is alignment a property of
   `buildingPlacement: DENSE` vs `GAPS`, or of the plot rather than the road?
8. **How is the wall band drawn** from a 17-point tower chain — fixed offset polygon, or a stroked
   polyline with crenellation tiling? And where are gates?
9. **Which of the 209 building types map to the grey (stone) material** vs the brown (wood) one —
   `buildingMaterial` is per-stage (`WOOD` for both here) yet stone buildings exist.
10. **Seeding.** `seed: null` was sent; FTG chose its own. Whether the same seed reproduces the map
    byte-for-byte is untested.
11. **`initialRoadsType`** was null. The landing hero's concentric-radial core suggests at least one
    alternative initial-road topology exists that Galeiaward did not use.
12. **Rustic Village's self-intersecting ring** — is that a generic hazard or specific to districts
    that wrap around a coastline? One sample is not enough.

---

## Critic addendum (2026-09-21) — identifying the three 14-instance decoration groups (fields 11.2 / 11.4 / 11.5)

§3.5 leaves the three "Shape B" standalone decoration kinds `[NAMED-ONLY]`. A second available source narrows
them to a specific triple. `research/ftg-capture/create-request.json` → `districtsParameters.*.decoration
.plotDecorationOptions` (enumerated programmatically for all 17 district configs; schema documented in
`ftg-docs-params.md` §4.10) lists exactly **six singleton decoration options** — the ones the guide says are
placed as "exactly one instance in one of the unused plots": `WELL, FOUNTAIN, BANDSTAND, STATUE, MONUMENT, FIRE`.

* Field 11 has exactly **six** sub-field numbers below the sprite groups (11.2 … 11.7; 11.8–11.11 are the
  rubble / deciduous / coniferous / palm sprite groups). Six singleton kinds ↔ six field numbers. `[INFERRED]`
* In the request that produced Galeiaward, **`WELL`, `BANDSTAND` and `STATUE` are the only singleton options that
  appear across the common district types with identical weights** (upper class alone omits `WELL`): `0.5 / 0.5 / 0.5` (alone) and `0.5 / 0.5 / 0.5`
  (with `TREES`) in *residential middle class*; `0.1` each (alone and with `TREES`) in *market, leisure, castle,
  keep, university, cathedral, small-settlement-centre* and *fallback-general*. `FOUNTAIN` and `MONUMENT` occur
  only in *upper class / high street / high-end services* at weight 0.1; `FIRE` only in *shanty town*. `[SHOWN]`
* Three kinds present, each with the **same** instance count (14 / 14 / 14), scattered town-wide, 0.7–14 m from a
  road, 2–4 of each inside plaza-type lots — that is what three equal-weight plot-decoration options produce, and
  it is what the rarer three (fountain / monument / fire) would *not* produce.

⇒ **11.2, 11.4, 11.5 = `WELL`, `BANDSTAND`, `STATUE`** (if the wire enum follows the documented option order
`WELL, FOUNTAIN, BANDSTAND, STATUE, MONUMENT, FIRE` → fields 2..7, then 11.2 = well, 11.4 = bandstand,
11.5 = statue, and the absent 11.3 / 11.6 / 11.7 = fountain / monument / fire). `[INFERRED]`, moderate-high
confidence for the set, moderate for the per-field assignment. The *exactly equal* counts are better explained
by a rotation/deck draw among equal-weight rows than by independent weighted sampling — the same seed-free
round-robin habit §3.5 already documents for tree sprites (590/590/589×5). Discriminating test: generate a
settlement whose only district type is *upper class* and check that fields 11.3 and 11.6 appear; zoom the
render on three 11.2 coordinates and look for the well sprite.

## Critic-2 addendum (FTG seat, 2026-09-25)

Rulings from `research/findings/_critic-ftg.md` (§1 F1–F13, §4); scripts and outputs in `research/ftg-capture/critic2/`.

**A. The coordinates are zig-zag `sint32`, not unsigned (§2 is refuted).** The creator states it (164816716: "the FTG
map is centered around 0,0 … Switching to the sint32 type"), and the payload proves it: field 5 decodes to
`(250000,250000) (250000,−250000) (−250000,−250000) (−250000,250000) (250000,250000)` — the four corners of a ±2500 m
square (unsigned it is five points 1 cm apart in one corner, which no "extent ring" is); field 22.5 `[12,14]` decodes to
`[6,7]` = `restDaysInWeek`; all four district rings become simple polygons; the decoded map
(`critic2/map_zigzag.png`) reproduces `001-load-settlement.png` (sea west, NW–SE coast, harbour on the Beer Forest
waterfront, river forking from the NE, Greenwood on the northern spit, Ash Town south-east), the unsigned one
(`critic2/map_raw_folded.png`) does not. 1 unit = 1 cm still holds (±250000 = the 5000 m CITY width).
**Axis: `+x` east, `+y` north** (label anchors decode to Greenwood (−475, 418), Ticwick (24, 178), Ashton (77, −237),
matching their screen positions); §2's "+y south-ish" and §11.3 are closed.

**B. Every length in §5 is 2× too large and every area 4× (the unsigned reading is an exact 2× dilation inside one
quadrant, plus folding across the axes).** Corrected values (CONFIRMED by re-running the same statistics on the
decoded payload; counts, degree histogram, the 15° cap, the 90° junction median, the flat heading spectrum and the
round-robin sprite split are decoding-invariant and reproduce):

| quantity | §5 value | correct |
|---|---|---|
| edge-length modes | type 0: 60/29/51 m; type 4: 29–30 m; type 14: 100 m | type 0: **30 ×481, 15 ×254, 25 ×50**; type 4: **15 ×943**; type 14: **50 ×204**; type 10: 100; type 12: **75.6 ×12** |
| total road length | 361 km | **192 km** |
| building footprint | mean 434, median 406, p95 613, max 6399 m² | **mean 110, median 103, p95 154, max 1600 m²** |
| quad side | median 20.7 m | **median 10.3 m (p5 6.2, p95 13.6)** |
| landmarks | temples 371–2645 m²; market square 102 × 102 m; theatre 123 × 97 m | temples **350–661 m²**; market square **51 × 51 m**; theatre **62 × 49 m** |
| entrance → road / centroid → road | 4.56 m / 5.61 m; 82 % of buildings with a vertex within 2 m | **2.99 m / 6.23 m; vertex → road median 1.99 m, 53 % within 2 m** |
| district rings | Rustic Village self-intersecting; 0.0 m segments; 71 % of buildings inside | **all simple; 9.6 / 8.0 / 10.1 / 4.9 ha; min segment 3.3 / 3.9 / 4.3 / 0.87 m; 51 % inside** |
| block lots (9.1 = 18) | median 1764 m²; 3.39 buildings/block; 12.9 % empty; 57 % coverage | **median 441 m²; 1.52 buildings/lot; 22.9 % empty; 271 m² per building = 38 % coverage; only 1487/2798 buildings lie inside any serialised lot** |
| fields / forests | ~10 ha; 7.27 / 6.35 km² | **~2.5 ha; 1.82 / 1.59 km²** |
| water | 100 m step; sea 5.59 km² | **50 m step on all four; sea 11.0 km² (44 % of the map); rivers ≈ 31 m mean width; harbour basin 188 × 208 m** |
| wall towers | segments 38–101 m | **19–72 m, median 39 m**; still 17/17 on the Beer Forest ring; open chain 473 m end-to-end |
| trees NN | median 14.1 m, min 0.28 m | **median 9.7 m, min 0.14 m** (the "no minimum distance" result stands) |
| settlement footprint | CoM (441, 681) m; radius p90 954 m | **CoM (4, 212) m ≈ map centre; p50 399, p90 715, p99 906 m** |

Corollary: "FTG's building is a large compound structure (~20 × 20 m, ~400 m²)" is withdrawn — ordinary buildings are
≈10 × 10 m, consistent with the creator's real-world re-sizing after the 3× scale bug (`ftg-posts-b.md` §T-18).
Independent check: the decoded Ticwick→Greenwood anchor distance is 554 m; on `001-load-settlement.png` the two labels
are 327 px apart at 295 px = 500 m → 554 m (the folded reading gives 1024 m).

**C. Hazards §9.1, §9.2, §9.4 are decoding artefacts and are retracted** (self-intersection, "duplicate consecutive
vertices" — that was the ring-closure vertex counted as a segment by `analyse_layout.py` — and the y = −39 m
building). §9.3 (0.01 m edges), §9.5 (2.5 m² footprints), §9.6 (109 buildings without an entrance) and §9.7 (duplicate
`key: 9`) stand.

**D. Edge types identified.** Type **3** (14 edges) is the **map border** — the four sides of the ±2500 m square, one of
them exactly (−2500,−2500)–(−2500,2500), split where rivers and the coast reach the edge — not "outer world roads".
Type **14** (348 edges) is the **water outline**: 340/348 have an endpoint on a water-polygon vertex, 122 lie on the river
outlines (99 with both endpoints exact river vertices), 106 within 3 m of the coast, 120 double as lot edges; the
50 m mode is the water resampling step — not a hedgerow lattice. Type **12** (12 edges, each 75.6 m, parallel, 15 m
apart, inside the harbour basin bbox x −324..−136, y −34..174 m) is the **piers** (§11.2 closed; the render count "~14"
was a miscount). Type 6 (median 56 m; nearest building p10 20 m, p90 943 m) remains "rural lanes".

**E. Parameter readings corrected to the documented ones** (`createSettlement__settlement_layout.md`, verified):
`minDistrictArea` is in **m²** (100000 m² = 10 ha; §4.1's "cm²" is a slip) and is a **merge floor** ("if a district lot
is created with an area less than this, it will be merged into an adjacent district"), not a split trigger;
`verticalBranchSegments`/`horizontalBranchSegments` = "how many segments of a road to create **before** proposing a
left and right branch", not cross-streets per branch; `spokeStaySpokeProbability` = "chance of creating a new main
road when branching from an existing main road", not a per-step demotion. Field 22.2 = 9 is the current hour (the
clock reads 9:00 Monday), 22.1 the current day.

**F. Open, and important: persisted segments are half the configured `roadLength`.** Stage-2 `roadLength: 60` →
30 m mode, suburb 30 → 15 m, stage-1 50 → 25 m. It is not a collinear midpoint split (1 % of type-0 and 19 % of type-4
degree-2 nodes are straight; junction-to-junction runs are mostly single 15/30 m edges), and "branch after N
segments" evidently counts the half-length segments (suburb junction spacing modes 15/30/45 m for
`minOffshootSectionLength` 1–2). §2's "the stage roadLength values reproduce as edge-length modes" was the 2×
decoding error cancelling this. Discriminating test: one more capture with stage-1 `roadLength = 100` — persisted modes
at 50 m mean the generator halves (and every "(m)" in the layout form is 2 wire-metres); at 100 m the effect was
stage-specific.

## Critic-2 addendum, part 2 (2026-09-25) — roadLength=100 capture

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B17.

**F is closed.** One new temporary settlement (Nevervalley, PUT 2026-09-25 10:21:43 UTC) was created on Galeiaward's
exact base with a single change: Stage 2 "Road segment length (m)" went from 60 to 100. The recorded PUT differs from
Galeiaward's in that one semantic leaf, `layoutParameters.stages[1].roadLength: 60 → 100`, plus 45 client-random
partner UUIDs. Both payloads were decoded identically (zig-zag sint32, 1 unit = 1 cm). Full record, scripts and
outputs: `research/ftg-capture/roadlength100/README.md`. Capture: `captures/ftg/2026-09-25T10-13-51/`, layout payload
`session/network/bodies/intercept-0054-b39aab95.bin`.

| class (p10 / p50 / p90, or collinear runs rejoined across junctions) | configured | Galeiaward (Stage 2 = 60) | Nevervalley (Stage 2 = 100) |
|---|---|---|---|
| Stage-2 normal streets (type 0 inside district rings) | 60 → 100 | 30.25 / 30.25 / 30.26 m (n 177) | **49.90 / 50.25 / 50.26 m** (n 119); 30.25 class gone |
| Stage-2 main roads (type 1 runs) | 60 → 100 | 60.5 m ×31 | **100.5 m ×19** |
| Stage-1 normal streets / main roads | 50 | 25.25 / 50.5 m | 25.25 / 50.5 m (unchanged) |
| suburb streets (type 0 outside rings) | 30 | 30.00 m (n 313) | 30.00 m (n 215) (unchanged) |
| suburb lot outlines (type 4) | – | 14.70 m | 14.70 m (unchanged) |
| outer main-road extension (type 1) | – | 100.00 m | 100.00 m (unchanged) |

**Verdict.** The form's "(m)" is real metres; it is not a doubled unit. The configured `roadLength` is the persisted
main-road step (+0.5 m: 50.5 / 60.5 / 100.5), and suburb streets persist at exactly the configured 30 m. The generator
halves only the **normal streets of district stages**, which are laid at half the main-road step, (L + 0.5)/2 =
25.25 / 30.25 / 50.25 m.

Evidence that these are placed segments, not midpoint splits:
- Consecutive half-length edges are independently jittered. In the ring zone, 50+50 pairs are 30 bent vs 9 exactly
  straight; Galeiaward's 30+30 pairs are 68 vs 6. This test examined junction nodes too, and the 15° cap holds.
- The new 50 m class lies in the district-ring zone: midpoint radius p50 466 m, 86 % inside rings. The Stage-1 25 m
  class sits in the walled core (p50 203 m), and the 30 m class entirely in the suburbs (p50 822 m, 1.8 % inside rings).

**Corrections to part 1:**
- B's "type 4: 15 ×943" and F's "suburb 30 → 15 m" describe suburb **lot outlines**, not streets. Of out-of-ring
  building entrances, 68–69 % face type-0 edges and 10–11 % face type-4 edges. D's reading should be: 0 = district and
  suburb streets; 1 = main roads (stage steps L + 0.5 m from the centre, then 100 m steps to the border; the label is
  inferred); 4 = suburb lot outlines.
- F's "every stage halves" is replaced by: "district-stage normal streets halve; main roads and suburb streets do not".

**Side finding (CONFIRMED): server generation takes seconds, not ≈ 300 s.** The PUT is answered within 2.90 s
(2026-09-25) and 3.23 s (2026-09-21, in that session's own network index). The client is already building the scene
from the full layout 6.4 s / 7.0 s after the click. §1's "300,667 ms" and §9's "~300 s" were the profiler's 300 s wait
cap on a step that never became "ready"; its timeline shows the client busy only in the first ~16 s. The same ≈ 300 s citation appears in `_critic-ftg.md` F20/F27, `ftg-docs-params.md` §5.7 and the
posts files. `customStages: false` in the request is not a gate: the server used the sent stages under the Custom preset.

CONFIRMED (executed on both payloads): all lengths, counts, locations, the bent-pair test, the entrance test and the
request diff. PLAUSIBLE: the reasons for the +0.5 m and the /2, and the "main road" label for type 1.

## Fable review (2026-09-27) — B17

**Verdict: CONFIRMED** (`docs/fable-review/main/evidence-captures.md`, row B17; the full receipts are appended to
`research/ftg-capture/roadlength100/README.md`). Both payload scripts re-run byte-identically; the PUT-to-layout times (2.90 s
and 3.23 s) re-derived from the two sessions' network indexes; the corrections to part 1 (type 4 = suburb lot outlines;
only district-stage normal streets halve) stand.
