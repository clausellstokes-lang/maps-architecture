# FTG — user guide + generation parameter space (slice: `ftg-docs-params`)

Extraction target: Thomas Allerton's **Fantasy Town Generator** (FTG, fantasytowngenerator.com).
Sources used (all local):

| Source | Path | Notes |
|---|---|---|
| User guide, 36 pages | `research/ftg-docs/*.md` | scraped from docs.fantasytowngenerator.com; every page read in full |
| Guide images, 167 files | `research/ftg-docs/images/` | every image on every `createSettlement/*` page opened; GIFs decomposed to 3×3 contact sheets with ffmpeg |
| Create-settlement request body | `research/ftg-capture/create-request.json` (432 KB) | exact JSON PUT by the client for our captured settlement (`CITY`, "Medieval europe" preset) |
| Server presets | `research/ftg-capture/presets.json` (433 KB) | buildings, dependency graph, professions, items/services, size table |
| Decoded settlement payload (protobuf field map) | `research/ftg-capture/layout-structure.md` | used only for scale/graph-shape corroboration |
| Creation-form screenshots + step log | `captures/ftg/2026-09-21T05-08-07/steps/` | `steps.jsonl` contains `document.body.innerText` dumps = **verbatim `<select>` option lists** |

**No captured JavaScript bundle was opened.** Everything below comes from the creator's own documentation text, the public request/preset JSON, rendered output, and form DOM text.

Evidence tags used throughout: **[STATED]** creator explicitly describes it · **[SHOWN]** visible in an image/recording/JSON but not explained · **[INFERRED]** my reconstruction, reasoning given · **[NAMED-ONLY]** feature named with no method.

---

## 0. Global frame: coordinates, scale, and the two-phase pipeline

### 0.1 Units

- **[STATED]** `useSettlements__export.md`: GeoJSON export "coordinate system used is the internal one in FTG, where **1 unit = 1 meter**."
- **[STATED]** Form labels confirm metric units on the generation parameters themselves: "Road segment length **(m)**", "Minimum district area **(m²)**", "Controls the width of the river **(in meters)**", "Required distance between bridges … **(in meters)**" (`007-stage1-edit.png`, `createSettlement__water.md`).
- **[SHOWN]** `presets.json.sizes[]` gives each settlement size a `width` in metres (table §3.1).
- **[INFERRED]** The wire format stores **centimetres**: `layout-structure.md` shows vertex coordinates spanning `101..500000` for a settlement whose size is `CITY`, and `sizes[CITY].width = 5000` m. 500000 / 5000 = **100 units per metre**. The map render in `013-after-create.png` carries a 500 m scale bar consistent with a ~5 km map. So: internal API/GeoJSON = metres; persisted protobuf = integer centimetres.

### 0.2 Two phases [STATED] (`createSettlement__algorithm.md`)

> "At the highest level, the generation can be broken into two phases: **the buildings and people**, and then **drawing the map**."

This is the single most important architectural fact and it **inverts** the watabou approach: FTG decides *what buildings must exist* (from a socio-economic simulation) **before** any geometry exists, then lays out a road network large enough to hold them. Watabou's generators do the opposite (geometry first, semantics assigned to wards afterwards).

Phase ordering [STATED]:

1. **Buildings & people**
   1. Initial state — forced buildings from factions, government, religion/military, individual-building settings.
   2. Loop: ask dependency graph for next building → create it (+ its residents, + fill job postings) → repeat until population target.
   3. Post-process: assign faction membership, friendship groups, rivalries.
2. **Map**
   1. Generate/import water bodies.
   2. Road network & districts, run in **configured stages** (district stages, then suburb stage).
   3. **Outer settlement**: extend main roads to the map border, subdivide the resulting outside lots, place farms/forests/landscape features.

---

## 1. Complete layout-generation parameter schema

### 1.1 Where the parameters live

`create-request.json` → `layoutParameters`:

```
layoutParameters
├── customStages   : bool
├── stages[]       : district stage configs (ordered)
├── wallType       : enum
├── initialRoadsType : enum | null
└── suburb         : suburb stage config (exactly one)
```

Captured values ("Medieval europe" preset, `CITY`, walled, coastal):

```json
{"customStages": false,
 "stages": [
  {"key":"dense","buildingPlacement":"DENSE","proportionOfBuildings":0.2,
   "placeWallAfter":true,"wallPlacement":"AROUND_ALL_LOTS","buildingMaterial":"WOOD",
   "maxMainRoadAngle":15,"maxNormalRoadAngle":15,
   "spokeStaySpokeProbability":0.5,"maxSpokesInStage":1,
   "branchType":"CONTINUE","minDistrictArea":100000,"roadLength":50,
   "verticalBranchSegments":4,"horizontalBranchSegments":4},
  {"key":"2","buildingPlacement":"GAPS","proportionOfBuildings":0.5,
   "placeWallAfter":false,"wallPlacement":"AROUND_ALL_LOTS","buildingMaterial":"WOOD",
   "maxMainRoadAngle":15,"maxNormalRoadAngle":15,
   "spokeStaySpokeProbability":0.1,"maxSpokesInStage":1,
   "branchType":"CONTINUE","minDistrictArea":70000,"roadLength":60,
   "verticalBranchSegments":3,"horizontalBranchSegments":3}],
 "wallType":"STONE_WALL","initialRoadsType":null,
 "suburb":{"density":0.8,"buildingPlacement":"GAPS","buildingMaterial":"WOOD",
   "minOffshootSectionLength":1,"maxOffshootSectionLength":2,
   "mainRoadBranchProbability":0.75,"offshootBranchProbability":0.75,
   "roadLength":30,"maxMainRoadAngle":15,"maxOffshootRoadAngle":15,
   "backgroundTexture":"LAWN_TEXTURE_TYPE","roundedEdges":true,
   "spokePriorityChange":1,"placeWallAfter":false,
   "createPerimeterSpokes":true,"perimeterSpokeDistanceMultiplier":5}}
```

### 1.2 Settlement-level layout parameters

All option lists below are **verbatim** from the form's `document.body.innerText` (`steps.jsonl`, 2026-09-21T05:09:11.921Z) — i.e. the complete enumerations, not a sample. **[SHOWN]**

| UI label | JSON field | Values (complete) | Default in capture | Meaning |
|---|---|---|---|---|
| **Layout preset** | *(expands into `stages`+`suburb`)* | `Custom`, `Medieval europe`, `Medieval europe (more twisty)`, `American`, `Ringed`, `Ringed (no suburbs)` | Medieval europe | Macro-shape preset. "American" ⇒ near-grid; "Ringed" ⇒ concentric; "(more twisty)" ⇒ raises max road angles. **[INFERRED]** from the branch-type/angle images (§2.4). |
| **Default building material** | `stages[].buildingMaterial` | `Wood`, `Stone brick`, `Pavement`, `Light thatch`, `Thatch`, `Red tile`, `Blue tile`, `Orange tile`, `Slate`, `Wall`, `Sandstone` (11) | Wood | Pure **render** attribute — the three "dense buildings" images (`de69a082f4`/`d530d35956`/`168b52d968`) are **pixel-identical geometry** in three colours. **[SHOWN]** Overridden per-district and per-building (temples always stone brick) **[STATED]**. |
| **Walled** | *(drives `stages[].placeWallAfter`)* | bool | true | When on, the preset sets `placeWallAfter` on (at least) the first stage. |
| **Wall type** | `layoutParameters.wallType` | `Wall`, `Stone wall`, `Sandstone wall`, `Wood wall` (4) | STONE_WALL | "the type of wall that is used, wherever walls are configured to be placed … including walls at the end of a generation stage, as well as walls in **castle districts**" **[STATED]**. |
| **Initial roads** | `layoutParameters.initialRoadsType` | `Random`, `Dead-end`, `Single through-road`, `Three-way crossroad`, `Four-way crossroad`, `Five-way crossroad`, `Six-way crossroad` (7) | null (= Random) | **The seed pattern at the settlement centre.** Determines how many main-road spokes leave the origin: 1 (dead-end), 2 (through-road), 3/4/5/6 (crossroads). **[INFERRED]** but strongly corroborated: the first frame of `33e8cfb4da.gif` is a 3-armed green "Y" and of `dbdbfac184.gif` a 5–6-armed green asterisk. |
| **Number of districts** | *(not in `layoutParameters`; likely scales `minDistrictArea`)* | `Less`, `Normal`, `More` (3) | Normal | **[INFERRED]** a multiplier on `minDistrictArea` and/or on the branch-segment counts; "Less"⇒bigger lots⇒fewer districts. No method stated. |
| **Stages table** | `stages[]` + `suburb` | rows, each `Name` + `Percentage`, with `+ Add stage` | `Stage 1` 50.00 / `Suburb stage` 50.00 (default form); capture: 0.2 / 0.5 / (0.3 implied) | The **Percentage** column is `proportionOfBuildings × 100`: the share of the settlement's total building stock this stage must place. Stages are ordered; a stage runs until its building quota is met. **[INFERRED]** from field name + doc text "Roads will continually expand and branch at random points **until the desired area for the stage is met**" **[STATED]**. |

Important: in the captured city the stage proportions are 0.2 + 0.5 = 0.7, so the **suburb stage absorbs the remaining 30%** — consistent with **[STATED]** "This stage takes **any remaining unplaced buildings**". The suburb stage has no `proportionOfBuildings` field; it is the remainder.

### 1.3 District-stage parameters (per stage)

Verbatim option lists from `007-stage1-edit.png` + `steps.jsonl` (2026-09-21T05:09:55.637Z).

| UI label | JSON field | Type / values | Capture values | Doc meaning |
|---|---|---|---|---|
| Building material | `buildingMaterial` | `Default` + the 11 materials | WOOD | "The building material used **by default** during this stage. May be overridden by districts and individual buildings." **[STATED]** |
| **Building placement** | `buildingPlacement` | `Dense` \| `Gaps` \| `Individually placed` | stage1 DENSE, stage2 GAPS, suburb GAPS | **[STATED]** — *Dense*: "compact, wall-to-wall arrangement". *Gaps*: "compact, wall-to-wall arrangement, **and then shrunk** so that the buildings do not touch." *Individually placed*: "**specific building shapes** (e.g. L shaped, rectangle) are **fitted** into the available plots." |
| Place wall after | `placeWallAfter` | bool | stage1 **true**, stage2 false | "If a wall should be created around the lots generated in the stage." **[STATED]** |
| Where to place wall | `wallPlacement` | `Around all lots` \| `Around stage lots` | AROUND_ALL_LOTS | Wall traces the outline of *everything built so far* vs *only this stage's lots*. **[INFERRED]** from the two label strings. |
| **Road branch type** | `branchType` | `Continue` \| `Curve around origin` | CONTINUE | **[STATED]** — *Continue*: "roads will be created at **right angles to the origin road**, and then continue in a straight line (with random bends according to the max angle)". *Curve around origin*: "roads pointing away from the center will branch left and right, and the branched roads will **stay a fixed distance away from the center** of the settlement … resulting in **ringed** settlements." |
| Max main road angle | `maxMainRoadAngle` | degrees, slider | 15 | "How much a road can be rotated in one direction when placing. If 0, will result in straight lines, and the higher this is, the more the roads wiggle." **[STATED]** Doc example image is "Max angle of 30". |
| Max normal road angle | `maxNormalRoadAngle` | degrees, slider | 15 | Same, applied to normal (non-main) roads. |
| **Road segment length (m)** | `roadLength` | metres | stage1 **50**, stage2 **60**, suburb **30** | "How long each individual road segment is. A road segment is a line with a start and an end, and is what you interact with when editing roads." **[STATED]** |
| Branch after # of segments (**vertical**) | `verticalBranchSegments` | integer | 4 / 3 | "How many segments of a road to create before **proposing a left and right branch**. This (in combination with the road segment length) affects how big the created district lots are." **[STATED]** Doc examples: `Branch segments = 2` vs `= 5`; "On average, more segments will create larger lots — **but as you can see … this isn't guaranteed**." |
| Branch after # of segments (**horizontal**) | `horizontalBranchSegments` | integer | 4 / 3 | Second, independent counter. **[INFERRED]** the generator tracks two orientation classes of road (roughly radial vs roughly tangential relative to the parent) so that blocks can be made non-square — e.g. 2 vertical × 5 horizontal ⇒ long thin blocks. No doc text distinguishes them; the doc's single "Branch after # of segments" section covers both. |
| **Minimum district area (m²)** | `minDistrictArea` | m² | stage1 **100000**, stage2 **70000**; default-form value **25000** | "If a district lot is created with an area **less than this, it will be merged into an adjacent district**." **[STATED]** Note these are *district-lot* areas — 10 ha and 7 ha — not building plots. |
| Create new main road percentage | `spokeStaySpokeProbability` | 0..1 in JSON, 0..100 in UI | stage1 **0.5**, stage2 **0.1** | "You can configure the **chance of creating a new main road when branching from an existing main road**" **[STATED]**. The JSON name reveals the mechanic: when a *spoke* (main road) proposes a branch, this is P(the branch is itself a spoke). **[SHOWN]** UI label/value pairing: form shows `Create new main road percentage = 10.00` in the same stage where the JSON default would be 0.1. |
| Max number of new main roads | `maxSpokesInStage` | integer | 1 | "as well as **limit the number of new main roads in the stage**" **[STATED]** |

### 1.4 Suburb-stage parameters

| UI label | JSON field | Capture value | Doc meaning |
|---|---|---|---|
| Building material | `buildingMaterial` | WOOD | as district |
| Building placement | `buildingPlacement` | GAPS | as district |
| **Density** | `density` | **0.8** | "The **percentage chance that a plot will be used to place a building**." **[STATED]** — i.e. plots are generated first, then Bernoulli-sampled. |
| Offshoot section length | `minOffshootSectionLength` / `maxOffshootSectionLength` | **1 … 2** | "How many road segments to place while placing an offshoot. **Branches will be proposed after this many segments.**" **[STATED]** (JSON reveals it is a *range*, sampled per offshoot; the UI exposes it as one control.) |
| Branch probability | `mainRoadBranchProbability`, `offshootBranchProbability` | **0.75 / 0.75** | "The percentage chance to create a new offshoot (**from a main road**, or **after processing a section of an offshoot**)." **[STATED]** — the JSON confirms these are two separate probabilities. |
| Road segment length | `roadLength` | **30** m | shorter than district roads ⇒ finer suburban grain |
| Max road angle | `maxMainRoadAngle`, `maxOffshootRoadAngle` | 15 / 15 | as district |
| **Main road priority increase** | `spokePriorityChange` | **1** | **[STATED], verbatim and unusually precise:** "When a main road spoke completes, this is the priority increase of the next main road spoke to propose. e.g. `nextSegmentPriority = currPriority + mainSpokePriorityIncrease`. **Offset roads always increase by 1**, and **the element with the lowest priority will be processed next.** Increasing this number makes suburbs **wider** (more offshoots processed than main roads); decreasing makes the settlement **longer and narrower** (more buildings along the main road)." |
| Decoration / background | `backgroundTexture` | `LAWN_TEXTURE_TYPE` | "the type of background that should be placed behind the lots created during this stage" **[STATED]**. Overview adds: "by default, it'll use the same texture as the natural background." |
| *(not exposed in the guide)* | `roundedEdges` | **true** | **[INFERRED]** rounds the outer corners of suburb lots — visible in `84bb563900.png` where the suburb boundary is a smoothly-filleted outline rather than a hard polygon. |
| *(not exposed in the guide)* | `createPerimeterSpokes` | **true** | **[SHOWN]** In the suburb animation `238a34b238.gif` frame 3, a road **encircling the whole existing settlement** appears first, studded with green proposal ticks. This field names that behaviour: spokes are seeded around the perimeter, not only from main roads. |
| *(not exposed in the guide)* | `perimeterSpokeDistanceMultiplier` | **5** | **[INFERRED]** spacing of those perimeter spokes = 5 × `roadLength` = **150 m**. |
| Place wall after | `placeWallAfter` | false | as district |

### 1.5 Wall / rock / tree settlement-level extras [STATED]

`createSettlement__settlement_layout.md` §"Rocks, wall type": tree settings "allow you to enable and disable trees in **specific parts** of the settlement, as well as controlling how many are generated":

- **In the main settlement** — "trees are generated **next to roads** in certain districts" (this is `lotEdgeOptions: ["TREES"]` in the district configs).
- **In farmland** — "trees are generated **between fields**" (the hedgerow dotted lines in `09fb1e926d.png`).
- **In forests** — "trees are generated **randomly in the forest lots**".

---

## 2. Reconstructed generation algorithm

### 2.1 Road network: the core data structure

**[STATED]** (`createSettlement__algorithm.md`):

> "**Lots**: An area of land surrounded by roads is called a lot, and buildings are placed in these."
> "The road algorithm essentially **places one road at a time, optimising it** (e.g. making it longer / moving it so it **snaps to an intersection**), and makes sure that the road is **legal** (e.g. roads aren't too close together / roads don't end in bodies of water). When we create a road, **if it intersects with another road, we run lot detection**. This will find the newly created lots (**and potentially the one that was just split in two**). We keep track of the lots as we go through generation, with some metadata like **has the lot already been used** to create buildings."

**[STATED]** (`editSettlement__map.md`): "Roads **can't overlap** — they must have **properly defined intersections** (so filling works as expected)." and "invisible edges help **guide the fill features**".

**[INFERRED]** ⇒ The substrate is a **planar straight-line graph (PSLG) with incrementally maintained faces**. Insert an edge → split it at every intersection → re-walk the face cycles touching the new edge to produce the new bounded faces. The "potentially the one that was just split in two" phrasing is exactly the incremental-face-split case. This is *not* Voronoi/Delaunay and *not* a subdivision-of-a-polygon scheme; it is an agent-grown road graph with planar-face extraction — architecturally closest to Parish & Müller's CityEngine road growth (proposal queue + local constraints + global goals), but with lots recovered as graph faces rather than by polygon splitting.

**[SHOWN]** corroboration from `layout-structure.md`: the settlement payload carries field 3.1 = **5326 edges**, each `{id, nodeA(1..4301), nodeB(1..4303), edgeType(1..14)}`, and field 3.2 = **4303 vertices**, each `{id, {x,y}, packed list of incident ids}`. An explicit node/edge graph with adjacency lists, and **14 edge types**. The edit UI exposes 5 road-ish ones — `Road`, `Main road`, `Small road`, `Dirt road`, `Invisible` — plus walls and stone fences placed with "the same controls as roads" **[STATED]**, which accounts for the rest.

### 2.2 The proposal queue (this is the load-bearing mechanism)

**[STATED]** `createSettlement__settlement_layout.md`: "In the animation above we see **three types of roads**: main roads (in black), normal roads (in grey), and **proposed roads (in green). Proposed roads are roads that haven't been placed, but are in the queue waiting to be processed.**"

**[STATED]** suburb section: "`nextSegmentPriority = currPriority + mainSpokePriorityIncrease` … the element with the **lowest priority** will be processed next."

**[INFERRED]** ⇒ A **priority queue of road proposals**, popped lowest-priority-first, each proposal carrying `{startPoint, direction, type(main|normal), priority, remainingSegments, branchCounter}`. Processing a proposal:
1. Rotate direction by `U(-maxAngle, +maxAngle)` (per-type angle limit).
2. Extend `roadLength` metres.
3. Apply **local constraints / "optimisation"**: extend to reach a nearby edge, or translate to snap onto an existing intersection, or reject if it runs too close/parallel to an existing road, or if the endpoint lands in water **[STATED]** — "making it longer / moving it so it snaps to an intersection … roads aren't too close together / roads don't end in bodies of water."
4. Insert edge into the PSLG, run incremental lot detection.
5. Decrement the branch counter; when it hits `verticalBranchSegments`/`horizontalBranchSegments`, **push a left and a right proposal** (this is exactly the green "+"/"⊤" tick marks seen at every road tip and at intervals along roads in `33e8cfb4da`/`dbdbfac184`/`f7e42dc607` contact sheets — a proposal renders as a short perpendicular cross).
6. Push the continuation proposal with priority `curr + 1` (offshoot) or `curr + spokePriorityChange` (main spoke).

**[SHOWN]** In the `f7e42dc607.gif` (branch type = Continue) sheet the proposals are visibly *always perpendicular pairs*, and the resulting mesh is a warped quadrilateral grid. In `03310f4eb6.gif` (Curve around origin) the grey roads form **3–4 concentric closed rings** joined by radial black spokes, producing annular-sector lots.

### 2.3 Stage boundaries

**[STATED]**: "Between each stage, any **unconnected normal roads are pruned**, and **main roads are trimmed back to the current perimeter** of the settlement."

**[SHOWN]** `dbdbfac184.gif` frames 119→136: all green proposals vanish, dangling grey stubs disappear, and the black main roads are cut back to the edge of the built blob. Then in `33e8cfb4da.gif` frame ~55 the main roads are re-extended outward as long smooth curves reaching off-screen (that is the *outer settlement* step, §2.7).

**[INFERRED]** the prune is: delete every edge that is not on the boundary of at least one bounded face (i.e. every bridge/degree-1 chain) among normal roads; then clip main roads to the outer boundary of the union of used lots.

### 2.4 Branch-type geometry

- **Continue [STATED]**: branch perpendicular to parent, then continue straight with per-segment jitter ≤ maxAngle. Yields the deformed-grid look of `f7e42dc607.gif`.
- **Curve around origin [STATED]**: "roads **pointing away from the center** will branch left and right, and the branched roads will **stay a fixed distance away from the center** of the settlement". **[INFERRED]** implementation: for a branch proposal at point *p*, compute *r* = |p − origin|; each subsequent segment direction is re-projected onto the tangent of the circle of radius *r* (then jittered by maxAngle). That is what produces the near-perfect concentric rings in `03310f4eb6.gif`.

### 2.5 District assignment and district → lot subdivision

**[STATED]**:

> "In these stages, we create large lots which form the outline of districts. When one of these lots is created, we **decide what kind of district to place in it (based on criteria like the remaining unplaced buildings, and what the lot is next to)**. Each district type has its own placement logic, but most essentially do:
> 1. Place **large landmark buildings** (e.g. market / temple)
> 2. **Divide the lot into smaller ones**
> 3. **Place buildings** into the lot
> 4. **Decorate**"

**[STATED]** and this is the key recovery of step 2, from the *Regenerate area* tool which exposes the same machinery: "**Divide lots to area** determines the **maximum area of lots** in the district. **New roads will be created, splitting the current areas into two until all areas are less than this area.** The **dividing road type** option determines what road type will be used to split the district." Default shown: **10000 m²**, road type `Road` (`2277c9f518.png`).

**[INFERRED]** ⇒ lot subdivision is **recursive binary splitting by inserted road edges** until every face is under a target area. The split line is almost certainly across the longer axis (OBB-style bisection) with jitter — the images (`5e6c0dd2e9.png`, `463835ad4e.png`) show sub-lots that are convex-ish quads of similar area, and `createSettlement__settlement_layout.md` notes "the district added **more roads** to divide the district lot further". Since the splitter inserts *roads* into the same PSLG, the lot detection machinery is reused unchanged.

**[STATED]** merging: "If a district lot is created with an area **less than [`minDistrictArea`], it will be merged into an adjacent district." **[SHOWN]** `463835ad4e.png` renders districts as translucent colour regions that are clearly **unions of several lots** with curved outer boundaries, exactly as merging would produce.

**[SHOWN]** district ordering: `districtsParameters.residentialDistrictOrder = "MOST_POPULOUS"` (UI: "Most populous"). **[INFERRED]** controls which residential class claims the inner (earlier, larger) district lots.

**[STATED]** shanty towns: "These **replace residential (lower class) districts** when the average lifestyle is **squalid or poor**. They will **only be placed after the first half of the settlement has been created**." — an explicit staging rule.

### 2.6 Lot → plots → buildings

**[STATED]** (suburb density): "The percentage chance that **a plot** will be used to place a building" ⇒ there is an explicit **plot** level between lot and building.

**[STATED]** (`createSettlement__districts.md` plot decoration): "These settings control how **unused plots (in a lot with buildings)** are decorated… Note how **the outline isn't decorated** (which would be controlled by the building background textures options above), **only the area in between the buildings**."

**[SHOWN]** — `d49fce3c95.png` is the single most informative image in the whole guide for this: a large lot with buildings around the *outer ring*, and the *interior* partitioned by thin blue-grey outlines into **elongated rectangular plots**, some empty and decorated with trees. `0e37876594/7447d96160/a70e55dd16.png` (grass/lawn/dirt) show the same structure on a square lot: buildings occupy a closed ring of plots around the lot boundary, leaving an L-shaped interior court.

**[STATED]** (`editSettlement__regenerate_area.md`): "If **anywhere in lot** is false, buildings will only be placed **next to roads**. If it is true, they will be placed **along all edges, including the interior of the lot**."

**[INFERRED]** ⇒ plot generation is an **edge-driven strip subdivision**: walk each boundary edge of the lot, offset inward by a plot depth, and cut the resulting band into plots of a target frontage. Interior leftovers become unused plots. Strong supporting evidence: in `98325b3298.png` (Dense) every building is a quadrilateral with one side exactly on the road and the opposite side on a common inward offset line; in `73f0d98edd.png` (Gaps) the *same* tiling appears with a uniform inset on every building — consistent with "compact wall-to-wall arrangement, **and then shrunk**" **[STATED]**, i.e. a per-polygon negative offset, not a re-layout.

**Building placement modes [STATED] + [SHOWN]:**

| Mode | Mechanism | Visual signature |
|---|---|---|
| **Dense** | plots tile the frontage band with no gap; the building *is* the plot | `98325b3298.png`: contiguous quads sharing edges, zero gap |
| **Gaps** | same tiling, then each footprint shrunk (inset) | `73f0d98edd.png`: identical tiling with ~1–2 m light gap everywhere |
| **Individually placed** | "**specific building shapes** (e.g. L shaped, rectangle) are **fitted** into the available plots" | `7a223a347b.png`: distinct L-, T- and I-shaped footprints at varied orientations with large open ground between |

**Size modifiers [STATED]** (exposed in Regenerate area → Building style → *Modifier*): `None`, `Small tents` ("this is what **shanty town districts do internally**"), `Smaller` ("**halves** the size of buildings"), `Bigger` ("**double** the size").

**Landmark buildings [SHOWN]**: keeps render as a fixed **cruciform footprint with corner projections** (`6fa2157c41.png`, `32c70755aa.png`) — a template shape, not a generated one. Market squares render as large light polygons with a star icon (`c8b81a2503.png`, `013-after-create.png`).

### 2.7 Suburb stage

**[STATED]**:
> "buildings can only be placed in lots — but we want to place buildings on the fringes… To get around this limitation, we just **sidestep it — we still place buildings in lots — but we make some of the lot edges invisible**."
> "Unlike the district stages, the suburb stage **creates small lots from the outset**, and places buildings **immediately** in those lots."
> Two lot kinds: **Main road lots** — "created **parallel to main roads**"; **Offshoot lots** — "roads are created that '**offshoot**' from the **perimeter**, as well as main road / other offshoots."

**[SHOWN]** `238a34b238.gif` sheet, in order: (f0) district core with main roads already extended; (f3) a **perimeter ring road** appears wrapping the whole core, dotted with green proposals; (f6–f12) short offshoots grow outward from that ring and from the main roads, each immediately flanked by small lots; (f15–f27) the fringe thickens irregularly. `a72a11c41e.png` shows main-road lots: a double file of narrow lots perpendicular to a road, each holding one building, with a grass strip. `84bb563900.png` shows offshoot lots and, crucially, the **outer boundary drawn as a single thin outline** rather than a road — the "invisible edges".

**[SHOWN]** the priority knob's effect is dramatic and is the main shape control for small settlements: `1cf7030dc5.png` (increase = 0) is a **long ribbon settlement** strung along its roads; `5aba8d7537.png` (increase = 10) is a **compact radial blob**.

### 2.8 Outer settlement

**[STATED]**:
> "At the start of this step, we **extend the existing main roads until they hit the map border**. At this point, we know the lots of land we have outside the main settlement. We then **estimate how many lots we need** for the number of buildings + landscape features, and then **divide the lots into smaller ones until we hit that number**. We then place each of the landscape features, putting the relevant buildings on them, **trying to place similar features next to each other** on the map."

**[SHOWN]** `09fb1e926d.png` (Farmsteads) shows the result at full map scale: the entire map outside the settlement is a patchwork of field polygons formed by recursive subdivision of the big road-bounded outside lots, with hedgerow tree lines along every boundary, radial strip-fields near the village, and ponds/copses in leftovers.

**[INFERRED]** the same binary-split-to-target-count routine as §2.5, just with a *count* target instead of an *area* target, plus a clustering pass ("similar features next to each other") that is effectively a greedy adjacency-preference assignment of feature types to the resulting faces.

### 2.9 Rendering conventions (relevant to output parity)

- **Roof rendering modes [STATED]**: `Flat` (plain polygon), `Flat – roof shape texture` (a lighting texture; "for buildings with bends the texture **might not be shaped appropriately**" — visibly wrong on the L-shape in `4beebe52be.png`), `3D roofs` ("roofs **generated at render time** … roofs that **appropriately bend to follow the shape of a building** … your device has to **calculate the roof shape every render, it is not stored in the server**"), `Flattened 3D`.
  **[INFERRED]** the 3D roof in `01b4ed592d.png` is a textbook **straight-skeleton roof**: the L-shaped footprint gets a ridge that follows the L, 45° hip ends, and a valley at the reflex corner. Cost per render also matches straight-skeleton computation.
- **Shadows** cast as a soft offset silhouette under buildings/trees/walls, direction driven by sun position (`aaa7c7496c.png`).
- **Roads** drawn as a filled band with a darker casing line either side (all map images).
- **District labels [STATED]**: `Flat` / `Rotated across districts` / `Arced across districts`, optional zoom-invariant scaling; rendered in serif small-caps with a white halo (`0f86ea314e`, `7873b170af`, `9708b72928`).
- **Background layer order [STATED]**: "background, water, below road, above road" (bottom→top).
- **Decorations** exist in two forms **[STATED]**: *individual* (saved with explicit coordinates, higher detail) and *decoration areas* (saved as a shape + density, "randomly filled with decorations **when the map is rendered**", lower detail for performance).
- **Export**: PNG (respects layers + render settings), **SVG** ("rendering mode changes, so you lose certain details — trees are simplified and texture detail is lost"), **GeoJSON** ("all the backgrounds, edges, buildings, and their outlines as coordinates").

---

## 3. Socio-economic model schema

### 3.1 Size → population → map width

`presets.json.sizes[]` **[SHOWN]** (UI labels round the population, e.g. `City (~10000 people)` for 9500):

| size | roughPopulation | width (m) |
|---|---|---|
| METROPOLIS | 49500 | 6000 |
| BIG_CITY | 24500 | 5500 |
| CITY | 9500 | 5000 |
| SMALL_CITY | 7600 | 4500 |
| BIG_TOWN | 5600 | 4000 |
| TOWN | 3625 | 3500 |
| SMALL_TOWN | 2400 | 3000 |
| BIG_VILLAGE | 900 | 2500 |
| VILLAGE | 450 | 2000 |
| HAMLET | 90 | 1500 |
| BLANK | 0 | −1 (uses `blankSettlementWidth`, 3500 in capture) |

Note the **highly non-linear density**: HAMLET 90 people in 1500 m vs METROPOLIS 49500 in 6000 m — a 550× population range across a 4× linear range. METROPOLIS is premium-only **[STATED]**.

### 3.2 Lifestyle

Six tiers, ordered: `SQUALID, POOR, MODEST, COMFORTABLE, WEALTHY, ARISTOCRATIC`. **[STATED]** "Lifestyle is essentially the class that a building (& its residents) will have… This will affect the **districts that are created / how they are decorated**." and "When requesting a new building, its lifestyle will be determined by **taking a random value from the distribution**."

Captured distribution (`Average Lifestyle = Comfortable`): `{SQUALID:1, POOR:1, MODEST:20, COMFORTABLE:40, WEALTHY:20, ARISTOCRATIC:10}` (weights, sum 92).

### 3.3 Dependency graph

**[STATED]** (`createSettlement__dependency_graph.md`): nodes are **resources/services**, not buildings. Each node declares either `oneBuildingForNumberOfPeople` or `perOtherBuildingConfig {otherBuildings[], onePerNumberOfOtherBuildings}`. "Internally, FTG **converts both of these nodes into a ratio per person**" — the worked example: Hops 1/200 people, Brewery 1 per 5 hops providers ⇒ brewery 1/1000 people.

**[STATED]** the scheduling loop, verbatim, and it is unusual enough to quote:

> 1. Settlement empty, create new jobs, look at dependency nodes, see that hops is next on the list, use that.
> 2. Internally, **pretend (only for the sake of the dependency graph) that the population is now 200**
> 3. Create residents to fill jobs
> 4. Need new jobs, there is nothing available, see that the next building to place (if there were more people) is a hops provider. Place that
> 5. repeat steps 2–4 until the pretend population is 1000.
> 6. Look at the dependency graph, next building is brewery, place that.
> 7. repeat until settlement population target is reached.

i.e. the generator runs a **virtual population counter** that races ahead of the real one, because "**FTG prioritises minimising the unemployment**". The toggle `alwaysPlaceWorkplace` (default **true**) governs this; **[STATED]** "If you would like the generation to **match the specified ratios**, you can **disable 'Always place workplace'**."

**Node shape** (`presets.json.buildingsParameters.dependencyGraph`, 80 nodes) **[SHOWN]**:

```json
"HOPS_PROVIDER": {
  "coreDistribution":[{"distribution":[{"specificBuildingType":"HOP_FARM","proportion":1.0}],
                       "applicableLifestyles":["SQUALID","POOR","MODEST","COMFORTABLE","WEALTHY","ARISTOCRATIC"]}],
  "shopDistribution":[{"specificBuildingType":"GRAIN_SHOP","proportion":1.0}],
  "shopProportion": null,
  "oneBuildingForNumberOfPeople": 250,
  "perOtherBuildingConfig": null,
  "placeFirstAfterSettlementReachesPopulation": 0 }
```

**[STATED]** core vs shop: "**core buildings** that actually produce the resource, and **shops** that import the resource and then sell it… If the core buildings pool is **empty** (e.g. if the buildings can't be created, for example **if there is no farmland farms won't be created**), **shops will always be placed**. Otherwise, there is a **percent chance** for shops to be created over the other buildings." Global defaults **[SHOWN]**: `defaultInsideSettlementShopProbability = 0.1`, `defaultOutsideSettlementShopProbability = 0.5`.

**[STATED]** lifestyle banding: "The core building pool can also be separated into **multiple pools based on the lifestyle**." `bfc60f1fdd.png` shows the tavern pool banded Squalid+Poor / Modest+Comfortable / Wealthy+Aristocratic; the JSON matches exactly.

**All 80 nodes** (`P` = one per N people, `O` = one per N of other nodes):

*People-driven:* HOPS_PROVIDER P250, GRAIN_PROVIDER P250, BEE_PRODUCE_PROVIDER P250, HERB_AND_SPICE_PROVIDER P250, GRAPE_PROVIDER P250, FLAX_PROVIDER P250, COTTON_PROVIDER P250, SHEEP_PRODUCE_PROVIDER P250, CATTLE_PRODUCE_PROVIDER P250, PIG_PRODUCE_PROVIDER P250, HUNTED_ANIMALS_PROVIDER P250, CONSTRUCTION_PROVIDER P250, MINE P1000, QUARRY P1000, LOG_PROVIDER P1000, FINANCIAL P1000, STABLE P1000, INN P1000, BARBER P350, GENERAL_STORE P350, LAUNDRY P350, SCRIBE_AND_LEGAL P300, BATHHOUSE P300, SMITH P500, WAREHOUSE P500, POTTERY_PROVIDER P500, FISH_PROVIDER P400, HEALTHCARE P1200, TAVERN P200, SEER P2000, UNDERTAKER P2000, MESSENGER P2000, THEATRE P8000, RELIGIOUS P0, MILITARY P0, RESIDENTIAL P0.

*Derived (selected ratios, all [SHOWN]):* WOOD_PROVIDER O(LOG)1 · FUR_PROVIDER O(HUNTED)2 · SMELTED_METAL_PROVIDER O(MINE)3, first at pop 200 · BREWERY O(HOPS,GRAIN,BEE)12 · DISTILLERY O(GRAPE,GRAIN)16 · PROCESSED_HERBS O(HERB)4 · GEMS O(MINE)1.2 · MAGIC_ITEMS O(HERB,GEMS,SMELTED)7.75 · INK O(MINE,HERB)10 · CARDED_TEXTILES O(FLAX,COTTON,SHEEP)3.6 · YARN O(CARDED)1 · WEAVED O(YARN)1 · BLEACHED O(YARN)6.66 · DYED O(BLEACHED)1 · WICKER O(WOOD)0.5 · CHEESE O(CATTLE)3.2 · ANIMAL_PRODUCE O(CATTLE,PIG,SHEEP)7.2 · LEATHER O(ANIMAL_PRODUCE)3.33, first at pop 300 · PAPER O(WEAVED,LEATHER)5.75 · FLOUR O(GRAIN)2 · BOOK O(INK,PAPER)2.91 · CARPENTRY O(WOOD)0.5 · SPECIALTY_CARPENTRY O(WOOD)1.5 · ILLUSTRATED_BOOKS O(BOOK,INK)2.25 · TATTOO O(INK)0.5 · ARTIST O(PAPER,INK)2.9 · LEATHER_WORKER O(LEATHER)0.25 · SHOE O(LEATHER)0.25 · SPECIALTY_SMITH O(SMELTED)0.5 · BOW_AND_ARROW O(WOOD)2 · ROPE O(WEAVED)5 · LANTERNMAKER O(CANDLE)1 · TEXTILES O(WEAVED,FUR,DYED)2.91 · OUTFIT O(TEXTILES)3 · BAKED_GOODS O(FLOUR,HERB)4.2 · CUT_STONE O(QUARRY)1 · STONEWORK O(CUT_STONE)1.5 · CANDLE O(BEE,ANIMAL_PRODUCE)5.66 · SHARPENER O(QUARRY)1 · SOAP O(BATHHOUSE,LAUNDRY,ANIMAL_PRODUCE,HERB)17.78 · PERFUMER O(HERB)8 · ENTERTAINER O(TAVERN)5 · MAP O(PAPER,INK)2.33 · HARBOUR O(WOOD)1.

Residential pools by lifestyle **[SHOWN]** — note the deliberate rare-outlier weights:
- SQUALID: ABANDONED_SQUAT 10, LOWER_CLASS_HOME 40, LOWER_CLASS_HOME 30
- POOR: ABANDONED_SQUAT 5, LOWER_CLASS_HOME 60, LOWER_CLASS_HOME 35
- MODEST: MIDDLE_CLASS_HOME 85, HOUSE_SHARE 10, **HIDDEN_SLAVERS_DEN 0.02, SECRET_CULT_FRONT 0.02**
- COMFORTABLE: MIDDLE_CLASS_HOME 85, HOUSE_SHARE 10, HIDDEN_SLAVERS_DEN 0.01, SECRET_CULT_FRONT 0.01
- WEALTHY: UPPER_CLASS_HOME 100
- ARISTOCRATIC: UPPER_CLASS_HOME 99.5, **MANSION 0.5** (with a hard `limit: 2`)

RELIGIOUS pool: TEMPLE 25, CATHEDRAL 1, ASCETICS_TEMPLE 1, ABANDONED_SHRINE 1, RELIGIOUS_LIBRARY 1, HIDDEN_SHRINE 1.

### 3.4 Buildings

209 building types (`presets.json.buildingsParameters.buildings`). Per-building schema **[SHOWN]**:

```json
{"initialNumber":0, "limit":null,
 "providesResources":["BEER"], "usesResources":["HOPS","GRAIN","BARRELS"],
 "items":[], "services":[],
 "minimumSize":"SMALL_TOWN",
 "requiresCoast":false, "requiresRiver":false, "requiresRawResources":[],
 "poolTags":["CRAFTS_COMMERCIAL"], "outsideSettlement":false}
```

- `minimumSize` gate distribution: BLANK 64, VILLAGE 65, BIG_VILLAGE 29, SMALL_TOWN 33, TOWN 14, BIG_TOWN 2, SMALL_CITY 2.
- `outsideSettlement: true` (15): SHEEP_FARM, HUNTERS_LODGE, APIARY, FLAX_FARM, HOP_FARM, FARM, VINEYARD, LUMBER_YARD, SAWMILL, MINE, QUARRY, CATTLE_FARM, GRAIN_FARM, COTTON_FARM, PIG_FARM.
- `requiresCoast: true`: SHIPYARD, HARBOURMASTER. `requiresRiver`: none in the default set.
- `requiresRawResources` vocabulary (13): BEES, CATTLE, COTTON, FISH, FLAX, GRAIN, GRAPE, HOPS, LOGS, ORE, PIGS, SHEEP, STONE. The capture's `availableRawResources` was `[FISH, LOGS, GRAIN, SHEEP, CATTLE, PIGS]` — set by the landscape parameters **[STATED]**: "Under the hood, these change the **available raw resources**, which is used by the dependency graph."
- Hard limits: UNIVERSITY 1, HARBOURMASTER 1, MANSION 2.
- `items[]` carry `minimumQuality`/`maximumQuality` from `{AWFUL, POOR, AVERAGE, GOOD, GREAT, MASTER}`.

**`poolTags` = the 13 district-affinity classes** (the guide's "overall type" list adds *Residential* as a 14th, which comes from the RESIDENTIAL dependency node rather than a tag) **[STATED]** with the creator's own glosses from `editSettlement__regenerate_area.md`:

| Tag | Count | Creator's gloss |
|---|---|---|
| CRAFTS_COMMERCIAL | 129 | "all the other artisans and shops" |
| LUXURY_COMMERCIAL | 34 | "businesses you'd find on high street / mall, e.g. tailors, armours, jewellers" |
| RESIDENTIAL_COMMERCIAL | 25 | "shops you'd likely find in a residential area, e.g. greengrocers, blacksmiths" |
| HIGH_END_SERVICES | 16 | "Services you'd find in a professional working district, e.g. banks / lawyers" |
| COMMERCIAL_LEISURE | 15 | "larger taverns, bathhouses, and theatres" |
| RESIDENTIAL_SERVICES | 7 | "e.g. barbers, doctors" |
| INDUSTRIAL | 4 | "warehouses and other industry you don't want in the settlement center, e.g. tanners" |
| RELIGIOUS | 4 | "smaller religious buildings, e.g. abandoned shrines, religious libraries" |
| RESIDENTIAL_LEISURE | 4 | "small taverns" |
| WATERFRONT | 3 | "buildings you'd expect in a harbour, e.g. fisheries, harbourmaster, ship builders" |
| INN | 3 | "inns" |
| GUARD | 1 | "barracks" |
| RED_LIGHT_DISTRICT | 1 | "brothels" |

**[INFERRED]** the district-type decision in §2.5 ("based on criteria like the **remaining unplaced buildings**") is a match between the outstanding pool of tagged buildings and the district types that consume those tags. The 17 district configs in `districtsParameters` map ~1:1 onto these tags plus the forced ones (castle/keep/university/cathedral/shantyTown/smallSettlementCenter/fallbackGeneral).

**Resource vocabulary** (from `473e7875cb.png` and the JSON): 82 `providesResources` values / 66 `usesResources` values, e.g. BASIC_FOOD, TOOLS, CLOTHING, FINERY, COTTON→CARDED_COTTON→COTTON_YARN→COTTON_CLOTH→BLEACHED_COTTON→DYED_COTTON, the parallel FLAX→LINEN and FLEECE→WOOL chains, LOGS→FIREWOOD/WOOD→BARRELS, HIDE→LEATHER→SHOES/SADDLE/SCABBARD/BAGS, GRAIN→FLOUR→BAKED_GOODS, ORE→SMELTED_METAL→WEAPONS/ARMOR/LIGHT_ARMOR, STONE→CUT_STONE, PAPER_SHEETS+INK→UNBOUND_BOOKS→BOOKS→ILLUSTRATED_BOOKS, UNPROCESSED_GEMS→GEMS→MAGIC_ITEMS, HOPS/GRAIN→BEER, GRAPE→WINE, HONEY→MEAD, plus MILK, EGGS, FEATHERS, HAY, GALLNUTS, GUM, ANIMAL_FAT, SOAP, CANDLES, BEESWAX, HEALING_SALVE, RUGS, HATS, GLOVES, BUCKLES, ROPE, GLASS, POTS, GOLD, GOLD_FURNISHINGS, WARM_CLOTHING, WORK_CLOTHING.
**[STATED]** resources do **not** affect generation: "This doesn't affect generation, but does affect the **settlement simulation**."

### 3.5 Buildings → people

**[STATED]**: "When buildings are created in this phase, we generate the building name and description, as well as any people who live there. When the building is created, **it may have a list of job postings** — if it does, we **fill as many of those postings with the available unemployed people**, and keep track of any **unfilled postings** for later… **Each building has its own internal settings for how it should generate residents** — for example residences will generate **a family or a house-share**, and **temples will generate individual people who don't have partners**. When creating buildings we keep track of **people who have moved out of their parents home**, as well as **people who are looking for a partner**."

Post-processing **[STATED]**: add people to factions by membership criteria; generate friendship groups **based on interests**; generate rivalries.

### 3.6 Races

9 races in the "Generic fantasy" preset, all `proportion: 50` (equal) **[SHOWN]**:

| Race | schoolAge | youngAdult | settledAdult | elderly | maxAge | name generator | avg adult height f/m (cm) |
|---|---|---|---|---|---|---|---|
| Human | 6 | 18 | 30 | 65 | 90 | GENERIC | 163 / 177 |
| Elf | 6 | 100 | 450 | 650 | 750 | FAIR | 163 / 177 |
| Dwarf | 6 | 18 | 50 | 200 | 350 | TOUGH | 130 / 135 |
| Halfling | 6 | 20 | 40 | 150 | 250 | HOMELY | 100 / 100 |
| Gnome | 6 | 20 | 40 | 200 | 400 | TOUGH_HOMELY_MIX | 100 / 100 |
| Half-Orc | 1 | 14 | 45 | 60 | 75 | ROUGH | 163 / 177 |
| Dragonkin | 1 | 15 | 20 | 50 | 80 | DRACONIC | 180 / 190 |
| Demonkin | 6 | 18 | 40 | 70 | 100 | INFERNAL | 163 / 177 |
| Half-Elf | 6 | 20 | 50 | 150 | 180 | FAIR | 163 / 177 |

Also per race: `maxBabyHeight`, `maxSchoolChildHeight`, `allGenders`/`specificGenders`, `appearanceTemplate`, `customNameGenerators`.

**Age groups [STATED]**: Baby (dependants, "need to be constantly looked after"), School ("attempt to go to school **if they are in an applicable lifestyle class**, otherwise may do an **apprenticeship**, or just live at home"), Young adult, Adult ("older adults have a **higher likelihood of having a partner + children**"), Elderly ("retired, no longer work").

**Name generators [STATED]**, 15 with example output: Generic, Rough, Draconic, Fair, Homely, Infernal, Tough, Tough/homely mix, Old English, Old French, Old German, Old Russian (+ premium custom lists, `name,f|m|n` per line).

**Appearance template [STATED]**: template lines with `$optionN` substitution variables, each backed by a weighted random table; lines can be **conditional** on gender/age/another variable's value, with a **fallback (`Else`) line**. `4c88ab7324.png` shows the editor: `Else template`, `Minimum age`, `Hide for genders`, `Randomly hide for genders`, `Conditional on value` / `Conditional type` (e.g. *Not equals*) / `Value`. The decoded payload confirms 53 template lines with 80 option tables and 882 option values (`layout-structure.md` 13.10.*).

**Race relations [STATED]**: a 45-row matrix (9 races, unordered pairs) of `partnerProportion`; "When picking the race for a partner of a person, we randomly pick from all the races, **weighed by the proportion**… A proportion of **0 means that the race will not couple**." Each pair also configures `biologicalChildRaces[{raceId, proportion}]` ("If this is empty, this race will **not reproduce biologically**") and `adopt: bool`. Default: same-race 100, cross-race 0, but every cross pair pre-seeded with 50/50 child races and `adopt: true`.

### 3.7 Genders

4 defaults **[SHOWN]**: male (47%, MASCULINE names, MALE heights), female (47%, FEMININE, FEMALE), non-binary (5%, NEUTRAL, RANDOM), agender (1%, NEUTRAL, RANDOM); each with subject/object/possessive pronouns. `genderPartners` is a full 16-cell directed matrix; e.g. male→female 92, male→male 4, male→non-binary 3, male→agender 1.

### 3.8 Education, stats

- `educationParameters.lifestylesEligibleForEducation = [COMFORTABLE, WEALTHY, ARISTOCRATIC]` **[SHOWN]** — school access is class-gated.
- Stats **[SHOWN/STATED]**: 6 D&D stats mapped via `correspondsTo` (STRENGTH…CHARISMA), `minStat 0`, `maxStat 20`, `baseline 10`, `statGenerationType: CONSTANT`, `statModifierType: HALF_PER_BASELINE_DIFF`. **[STATED]** "FTG has internal configuration to **modify the stats based on the profession** (e.g. blacksmiths have an increased strength stat). The '**corresponds to**' column lets you map your own custom stat to a known FTG one."

### 3.9 Government, factions, religion, military

- **Feudal [STATED]** — title → forced building: King/Queen ⇒ **Castle**; Lord/Lady ⇒ **Keep**; Count/Countess/Viscount/Viscountess/Baron/Baroness/Knight ⇒ **Manor house**; Reeve/Sheriff/Bailiff ⇒ **Feudal office**. Landowner family name configurable. These directly drive the Castle/Keep district types.
- **Democratic [STATED]** — generates a place of assembly (village/town/city hall), optionally public; generates representatives who "regularly meet"; optional leader + family name.
- **Factions**: `numberOfRandomFactions` (4 in capture; "a certain number … based on the size of the settlement" **[STATED]**) + manual list. Faction fields: name, type, secret flag, goals, goal-completion methods, members/leaders, **meetings** (`start hour`, `end hour`, days-of-week bitmask, building, sub-location). "Faction buildings are just buildings where faction meetings regularly take place." **[STATED]** Observed types: Merchants guild, Adventurers guild, Crime gang, Community council, Hatmakers guild, Assassins.
- **Religion [STATED]**: "each religion is modelled as a **pantheon of god(s)**. People don't worship gods, they worship a pantheon." Capture: 3 religions (`the good gods` d=60 with 13 gods, `the neutral gods` d=20 with 9, `the evil gods` d=10 with 13), each god with its own weight; `religionTargetPercentage = 0.01` (1% of population work in a religious role), `practiceReligionPercentage = 90`. "Temples are generated for **specific religions**, and only people practicing that religion will regularly go to that temple."
- **Military**: `configuration: NORMAL`, `militaryTargetPercentage: 0.0067` (~0.67% of the population are town guard).

### 3.10 Calendar and simulation

- `calendar`: `hoursInDay 24`, `daysInWeek [Monday…Sunday]`, `restDaysInWeek [6,7]` — all configurable (the payload shows a settlement with a **9-day** week configured, `layout-structure.md` 22.2).
- **Schedules [STATED]**: lives split into sleeping / primary schedule / leisure. Person types: **Working**, **Unemployed**, **Retired**, **Studying**, **Delegating** ("used to model people who cannot be independent (like babies). They need a **caregiver to follow at every hour of the day**").
- Schedule entries are hour blocks with a **Primary behaviour** and a **Default behaviour** plus a criteria gate; each behaviour = `{Action (free text), Building matcher, Sub-location matcher}` where matchers include `Random`, `Place of work`, `Exact sub-location`, `Default`. `3833ac849e.png` shows an entry: 0:00–1:00, Status *Working*, criteria *Eighty percent chance*, primary `patrolling`/Random building, default `training`/Place of work/Training ground.
- **Guest workers vs leisure visitors [STATED]**: "People can work at **only their primary building**, or they can **roam the settlement** doing their work in multiple buildings (also referred to as a **guest worker**)." Buildings gate entry by opening hours and minimum age; residents & primary workers are never gated.
- **Sub-locations [SHOWN]** (`6fbcac0efe.png`): `Name`, `Leisure people limit`, `Temporary residential limit`, `Guest worker limit`, `Studying people limit`, `Relaxing options (comma separated)` (e.g. `drinking,chatting`), `Residents can relax here`, and tags `Room / Table / Sell goods / Pickup goods / Deliver goods / Performance / Bath / Custom 1-5`. **[STATED]** "tables in taverns have the '**table**' tag, which allows servers to have a specific action related to serving tables."
- **Personality [SHOWN]** (`bea9dc808b.png`): Big-Five axes (Extroversion, Openness, Conscientiousness, Agreeableness, Neuroticism) as graded sentences, plus Core motivation, Interaction mannerism, Goal completion methods (`Lie / Steal / Sabotage / Hurt / Murder`), Hobbies (multi), Relaxing trait.
- **Relations [STATED]**: **family nodes** (`{parents[], children[]}`) from which arbitrary kinship is derived ("we can derive that John is Bruce's great-grandfather"), plus 1-1 relations and **friend groups** (two kinds: friends, housemates) — "more efficient to store and process than a 1-1 relation between each individual person."
- **Lazy person generation [STATED]**, important for anyone copying the storage model: "In the settlement file, **only a few key details are saved per person. The rest is generated when the person is selected.** When a person is manually edited, those generated details are **locked in**." Consequence documented at length: editing a race retroactively changes un-persisted attributes of existing people, and appearance options are stored **by index**, so renaming option 2 from 'brown' to 'red' turns brown-haired edited people red.
- **Items & services**: 323 items and 21 services with `{cp, sp, ep, gp, pp}` prices (D&D coinage). Prices are globally editable and per-building overridable.
- **Professions**: 299 known professions (KING, QUEEN, LORD, …) used for job titles and stat modifiers.

---

## 4. Water, coast, river, farm, forest, natural area

### 4.1 Water configuration

**[STATED]** Two body types with different road semantics: "**Rivers can be crossed by a bridge, while oceans are an obstacle that cannot be bypassed**" / "roads will be **extended to create bridges** across rivers, while they will **terminate** if they hit an ocean." This is the only place where water feeds back into road generation, and it is a hard constraint in the road legality check (§2.2 step 3).

`landscapeParameters` (capture):
```json
{"coastType":"COASTAL","rivers":true,
 "generateRiverParameters":{"maxConvergences":null,"maxDivergences":null,"width":null,
                            "minDistanceBetweenBridges":40,"generationShape":null},
 "waterDirection":null,"forests":true,"fertileLand":true,"farmOption":null,
 "reserveAreaForNaturalLandscape":true,"mines":false,"quarries":false,
 "coastOptions":null, ... }
```

`Water configuration` ∈ {`Generated`, `Manually drawn`} **[SHOWN]**.

### 4.2 Coast generation

**[STATED]**, and this is the clearest algorithmic statement in the entire guide:

> "Coastlines are generated **in two arms — each arm starts near the center of the map, and then grows outwards until it hits the edge of the map**. Each arm can be configured with different options."
> "The coast generation algorithm **first creates the overall shape for the coast, and then etches details into it**, adding additional details based on **if that section of coastline is a bay or a headland**."

Parameters (`4e4a8bf0d9.png` + doc):

| Control | Values | Capture/default | Meaning |
|---|---|---|---|
| Coastal | bool | true | |
| Random coast | bool | false in the custom example | picks one of the three presets at random |
| Configure each side | bool | false | lets the two arms differ |
| Overall config | `Long beach` \| `Rocky coastline` \| `Cliffs` \| `Custom` (+ **More extreme** flag) | Custom | preset bundles. "More extreme" ⇒ "**more bendy**, and **bays and inlets tend to be deeper**" **[STATED]** |
| **Overall coast shape** | `Smooth` \| `Gentle curves` \| `Sharp curves` | Gentle curves | **[STATED]** *Smooth*: "a single long gentle curve." *Gentle curves*: "multiple gentle curves, which can create **large-scale bays and headlands**." *Sharp curves*: "longer headlands, larger bays." **[SHOWN]** `ec77273d75.png` is a perfectly **straight** diagonal; `b74d66e058.png` is a single long **S-curve**; `8f4f6001f7.png` is a large **peninsula**. **[INFERRED]** a spline (low control-point count) through points offset from a base line, with amplitude/frequency per option. |
| **Detail coast shape** | `None` \| `Bays` \| `Deep bays` \| `Rough` \| `Jagged` | Rough | **[STATED]** "**runs after the overall shape generation**, and essentially '**erodes**' the coastline… *Bays*: smooth, rounded bays are **carved out**. *Deep bays*: deeper bays and more **pointy headlands**. *Rough*: **rougher** bays, for a more rocky feel. *Jagged*: deeper bays, **sharper edges**." **[SHOWN]** `34716397f1` shallow rounded scallops of fairly uniform wavelength; `e1d900d7b6` deeper scallops with pointy headlands; `4221375b3f` high-frequency small irregularity; `bec29a19a8` large angular notches. **[INFERRED]** recursive midpoint-displacement / subdivision along the base polyline with a roughness exponent, rounded (Chaikin-smoothed) for Bays and left angular for Rough/Jagged. |
| **Ease into detail shape** | bool | true | **[STATED]** "the detail shape will be **less pronounced near the centre of the settlement**, which usually means the **harbour is in a less extreme looking position**." **[SHOWN]** `38845402e9` (on) vs `a9525409c0` (off): with it off the town wraps a violently irregular promontory. **[INFERRED]** an amplitude envelope ∝ distance from the settlement centre. |
| **Bay options** | 4 weights: `Empty`, `Sandy beach`, `Pebble beach`, `Only rocks` | 0 / 50 / 50 / 50 (custom example); 30/30/30/0 (manual example) | **[STATED]** "the sliders configure the **proportion of a bay having a texture placed (or nothing placed)**". Per-bay categorical choice. |
| Bay rocks | bool | false | "determines if rocks should be placed in bays (like in the cliffs preset)" |
| **Inset texture** | `Inset position` ∈ {`Headland only`, *entire edge*, *none*}; `Texture type` ∈ {`Cliff`, `Forest`, …} | Headland only / Cliff | "If a texture should be placed **alongside the coast edge**… **entire edge or just the headlands** (or not at all)." **[SHOWN]** the grey cliff band in `b4661d989d.png`. |
| **Headland rocks** | bool | true | "If rocks should be placed **around headlands**, like in the rocky or cliff presets." |

So the coast pipeline **[INFERRED]** is: base line → overall-shape spline → detail erosion (with distance envelope) → **classify each stretch as bay or headland** (sign of local curvature / deviation from the convex hull) → per-classification decoration (bay texture roll, headland rocks, inset texture band).

Harbours are configured separately in the **waterfront district** (§4.3).

### 4.3 Harbours (waterfront district)

`districtsParameters.waterfrontDistrictConfig`: `harbourShape`, `harbourWallType`, `harbourWallShape`, `harbourPierOption`, `pierMaterial`, `oceanPierOption` (`NONE` in capture).

**[STATED]** "The shape to **carve out of a waterfront district area** to form a harbour."

| Control | Values | Evidence |
|---|---|---|
| **Harbour shape** | `No harbour`, `Rectangle`, `Semi-octagon`, `Semi-hexagon`, `L shaped (wide opening)`, `L shaped (narrow opening)` | `27c4851c02`, `e6b4b691d8`, `36436b3ea1`, `875d60b483`, `1c5a4f9cc0`, `b0c4fde360` — each a template polygon **subtracted** from the land, with a paved quay band around the water edge **[SHOWN]** |
| **Wall shape** | `Single arm, follow coast`, `Single arm, stick out`, `Two arm, follow coast`, `Two arm, stick out` | `1d8130e6f6`, `6d02735800`, `a9c1ba8560`, `38f46f37f4` — moles springing from the harbour-mouth corners, tapered tips, leaving an entrance gap **[SHOWN]** |
| **Wall type** | `Wall`, `Wall & rocks`, `Breakwater` | `ddc3416fc8` (plain band), `27e37480e6` (band + rock sprites), `ac44808f8d` (**rubble line only, no band, detached from shore**) **[SHOWN]** |
| **Harbour pier shape / Ocean pier shape** | `No piers`, `No branches`, `Branching` | `a4b2ebd69c`, `e5b036bb91` (evenly spaced straight jetties ⟂ to the quay, identical length), `0ee2a67638` (fishbone: spine + 2–3 pairs of cross-arms) **[SHOWN]** |
| **Pier material** | `Wood`, `Stone` | `f4dd2f7e05` (brown), `e5b580ee50` (grey) **[SHOWN]** |

Ocean piers use the same generator along open coastline (`c8b81a2503.png`).

### 4.4 Rivers

**[STATED]**:

| Control | Values / meaning |
|---|---|
| **Shape** (`generationShape`) | `Straight`, `Gentle curves`, `Sharp curves`. "if generating a coastline, it's **recommended to use straight or gentle curves**, otherwise the river may **end up bending back around into the ocean**" — an acknowledged failure mode with no automatic fix. |
| **Branches** (`maxConvergences`, `maxDivergences`) | "Initially, **a single river path is generated**. Once this is done, additional branches can be created. When a branch is being created, it can **start from any existing stretch of river**… the first branch will only branch from the original chain, while the second can start from the original **as well as the first branch**." *Convergent* = "point **upstream** when they start generating" (multiple rivers merging); *Divergent* = "point **downstream**" (a river splitting). |
| **Island rule** | "**If a branch hits an existing river while processing, it will connect the two sections to form an island, and will then stop.**" **[SHOWN]** the lens-shaped island in `8e450eb8b7.png`. |
| **Width** | metres. "with many branches, a **thinner river tends to work better**." |
| **Required distance between bridges** (`minDistanceBetweenBridges`) | metres; capture **40**; manual-draw default **40.00**. Gates how often road proposals crossing the river are allowed to become bridges. |

### 4.5 Manually drawn water

**[STATED]/[SHOWN]** (`13b15e2013.gif`, `443a1af7e0.gif`, `6a2329cac3.gif`, `76215972fe.gif`):

- Mode `Manually drawn`; tools **Draw river shape / Draw river path / Draw ocean shape / Demolish**; state reported as "Current draw state: **1 rivers, 1 oceans**."
- The canvas shows the **settlement bounding rectangle** and a **red circle at the centre**, with the note: "changing the size of the settlement changes the border size, so **set the size before drawing water**. You **cannot draw water bodies that intersect with the red circle**." ⇒ there is a **protected exclusion disc at the settlement origin**. **[SHOWN]** — this is a genuine, non-obvious invariant a re-implementer needs.
- "Bridges cannot be created over **oceans**" / "Bridges can be created over **rivers**" — restated at draw time.
- **Draw river path** produces a centreline; the user then sets **River width** (observed 40→75) and **Smoothness** (observed **0 → 3**), and the polyline visibly turns from hard-cornered to smoothly rounded. **[INFERRED]** `Smoothness` is an iteration count of corner-cutting (Chaikin) or equivalent subdivision, applied before offsetting to a band of `width`.
- Map-edit water fill: clicking inside any road-enclosed face floods that face — direct confirmation that the PSLG's bounded faces are first-class, addressable objects (`e5b33855dc.gif` last row: three adjacent lots filled independently).
- Edit tools expose a **Snapping distance** slider (observed 5.00 → 15.2, metres) governing vertex/intersection snapping.

### 4.6 Farmland

**[STATED]** `Farmland layout` ∈ {`Default`, `Farmsteads`, `Around perimeter`, `Around rivers`}:

- **Farmsteads** — "farmsteads are created, **with families that live on them**, and who work a **large area of land**. **All available space will be used** (after forests and other landscape features have been placed)." **[SHOWN]** `09fb1e926d.png`: the whole map is fields, hedgerow tree-lines on every boundary, radial strip-fields fanning out beside the village, ponds and copses in the leftovers.
- **Around perimeter** — "**no farmsteads – farmers live in the settlement**. Fields are **smaller** and are only placed in areas **closer to the settlement**." **[SHOWN]** `67e5e23be0.png`: a small collar of fields around a linear village, the rest bare natural ground with scattered trees.
- **Around rivers** — "no farmsteads… fields are only placed in areas **next to a river**. **If no rivers are available, this behaves the same as the around perimeter option**." **[SHOWN]** `337e87f50d.png`: a desert map where fields form a ribbon hugging the river's meander on both banks.
- **Default** — "will change the layout of the farms based on a variety of factors, such as the **size of the settlement and the natural landscape type**"; climate presets override (Temperate ⇒ farmsteads unless hamlet; Desert ⇒ around rivers; Polar ⇒ around perimeter). **[STATED]**

Farm *types* are separately configurable; enabling farms adds GRAIN/SHEEP/CATTLE/PIGS/etc. to `availableRawResources`, which is what actually lets the dependency graph create farm buildings. `fertileLand: true` in the capture.

### 4.7 Forests, mines, quarries, reserved natural landscape

- Booleans in `landscapeParameters`: `forests`, `mines`, `quarries`, `fertileLand`, `reserveAreaForNaturalLandscape`.
- **[STATED]** "**Reserving natural landscape** means that some of the available space will **not be used for farmland or forests**, and will be kept natural."
- Forests are decoration **areas** (shape + density, filled at render time) **[STATED]**; `forestTreesMultiplier` controls density, `individualTreesMultiplier` controls scattered trees in natural areas (and "**does not affect forests**").
- Mines/quarries gate ORE/STONE raw resources and the MINE/QUARRY dependency nodes (P1000 each).

### 4.8 Climate

`landscapeParameters.climate` (capture):
```json
{"climatePreset":"TEMPERATE_DECIDUOUS","naturalBackgroundTexture":"GRASS",
 "individualTreesMultiplier":1,"forestTreesMultiplier":1,
 "deciduousTreeProportion":100,"coniferousTreeProportion":0,"palmTreeProportion":0,
 "outerDeciduousTreeProportion":100,"outerConiferousTreeProportion":0,"outerPalmTreeProportion":0}
```

Presets **[STATED]**: `Temperate (deciduous / coniferous / mix)` — grass backgrounds, farmsteads default; `Desert` — sand backgrounds, palm trees, around-rivers farms; `Polar` — snow backgrounds, trees only in forests and only coniferous, around-perimeter farms. Note the **separate inner/outer tree-type proportions** — the settlement and its hinterland can have different tree mixes. **[SHOWN]** `0e6327e620` / `27c6f85505` / `bc9804b68a`.

### 4.9 Natural-area decorations

`landscapeParameters.decorations = {stoneCircleCount, copseCount, pondCount, ruinsCount}` (all null ⇒ "a **random number** of decorations based on other parameters (like the climate and size of the settlement)") **[STATED]**.

**[SHOWN]**: *Stone circle* — a ring of ~12 standing stones on a light clearing (`dcf89a1dfa`); *Copse* — an irregular cluster of ~20 tree sprites (`d28bd8a3e9`); *Pond* — an irregular blue polygon ringed with trees (`9c3a7fbfd7`); *Ruins* — broken wall segments outlining a partial rectangular footprint (`d724d8a207`).
**[STATED]** "**Depending on the type of decoration, trails will be placed to connect the decoration to the road network.**" — visible as thin paths in all four images.

### 4.10 District decoration schema (shared by districts and the regenerate tool)

```
decoration
├── backgroundTextures[]        : GRASS | LAWN | DIRT | ROAD_TEXTURE_TYPE   (behind buildings on built plots)
├── lotDecorationOptions[]      : PARK | PARK_WITH_FOUNTAIN | PLAZA | PLAZA_WITH_FOUNTAIN | PLAZA_WITH_WELL | DIRT
├── plotDecorationOptions[]     : [{key, distribution(weight), options[]}]
│                                 options ⊂ {TREES, GRASS, FENCES, WELL, FOUNTAIN, BANDSTAND, STATUE, MONUMENT, FIRE}
├── lotEdgeOptions[]            : TREES        (trees along the lot's road frontage)
├── waterfrontEdgeOptions[]     : TREES
└── waterfrontEdgeBackground[]  : GRASS | ROAD_TEXTURE_TYPE
```

**[STATED]** lot decoration applies to *lots with no buildings*; plot decoration applies to *unused plots inside a lot that has buildings*; "**The chosen row will have all of its selected decoration options applied to all the plots in the lot**" and one row is picked at random (weighted by `distribution`). Singleton options (WELL/FOUNTAIN/BANDSTAND/STATUE/MONUMENT/CAMPFIRE) place exactly one instance "**in one of the unused plots**".

Observed per-district profiles **[SHOWN]** — the class gradient is explicit and worth copying:
- *Lower class*: PARK/PLAZA, a single plot row `[TREES]`.
- *Middle class*: adds PLAZA_WITH_WELL and 8 plot rows (TREES / WELL / BANDSTAND / STATUE combos, weights 1.0 down to 0.5).
- *Upper class*: PLAZA_WITH_FOUNTAIN, `lotEdgeOptions:[TREES]`, and 10 plot rows led by `[GRASS, TREES, FENCES]` @0.5 — i.e. **garden fences and lawns are the upper-class tell**.
- *Industrial* & *waterfront*: `backgroundTextures:[ROAD_TEXTURE_TYPE]`, no lot decoration, one row `[FENCES]` @0.5.
- *Shanty town*: `backgroundTextures:[DIRT]`, `lotDecorationOptions:[DIRT]`, rows `[]` and `[FIRE]`, `tentPlacement: INDIVIDUALLY_PLACED`. **[SHOWN]** `bd9f407300.png`: dirt ground, dirt roads, dense small square tents in saturated mixed colours with pyramidal shading.

---

## 5. Open questions a re-implementer must decide

1. **Vertical vs horizontal branch segments.** The JSON has two independent counters; the guide documents one. What distinguishes "vertical" from "horizontal" — orientation relative to the parent road, relative to the settlement origin, or a global axis? With `Curve around origin` the natural reading is radial vs tangential, but that is unconfirmed.
2. **Lot-split geometry.** "Splitting the current areas into two" is stated, but not *where* the split line goes (OBB long-axis bisection? longest-edge midpoint to opposite edge? jitter amount?) nor how the split road connects to existing intersections.
3. **Plot generation.** The lot→plot subdivision is visible but never described. Target frontage width, plot depth, how corners are resolved, and what happens to the residual interior are all unknown. The "Individually placed" shape catalogue (which L/T/rectangle templates, at what sizes) is entirely unspecified.
4. **`Number of districts` (Less/Normal/More).** Not present in `layoutParameters`; it must be folded into the preset expansion. Which field(s) it scales is unknown.
5. **District-type selection function.** "criteria like the remaining unplaced buildings, and what the lot is next to" — the actual scoring/ordering (and how `residentialDistrictOrder: MOST_POPULOUS` interacts with it) is not given. Nor is how district *names* are produced (payload shows both a descriptive name "Beer Forest"/"Ash Town" and a contracted form "Ashton"/"Greenwood").
6. **Road legality thresholds.** "roads aren't too close together" — the minimum separation/parallelism test and the snap radius used during generation (as opposed to the editor's user-facing `Snapping distance`) are unstated.
7. **Failure handling.** The guide names exactly one failure mode with a stated non-fix (rivers bending back into the ocean) and one soft failure ("more segments will create larger lots — but this isn't guaranteed"). Whether the generator retries/discards failed road proposals, and whether whole stages can be restarted, is unknown. The 300-second wall time observed for a CITY generation (`steps.jsonl`, `wallMs: 300667` / `301197`) suggests either a very expensive loop or a server-side retry budget.
8. **Coast detail algorithm.** Whether "erodes" is midpoint displacement, a noise function sampled along arclength, or explicit bay-template stamping. The bay/headland classifier's definition is unstated.
9. **Overall coast shape control points.** Number, placement, and how the two arms are made to meet at the centre without a seam.
10. **Wall geometry.** How `AROUND_ALL_LOTS` traces a wall around a union of lots — offset polygon? lot-edge following? — and where gates/towers are placed. Castle `moat` and `cliff` options are present in the JSON but null and undocumented.
11. **Perimeter spoke placement.** `perimeterSpokeDistanceMultiplier: 5` — multiplied by what exactly (suburb `roadLength`? district `roadLength`? a derived perimeter length?), and how the perimeter polyline itself is derived from the built lots.
12. **`roundedEdges`.** Fillet radius and whether it is a render-time or geometry-time operation.
13. **Building name/description generation** and the mapping from building type → sub-location set → job postings: named everywhere, method given nowhere.
14. **Seeding.** `create-request.json` has `"seed": null`. Whether a supplied seed makes generation fully deterministic (including the client-side render-time roof and decoration-area fills, which are explicitly *not* stored) is unknown — and the fact that decoration areas are "randomly filled **when the map is rendered**" implies at least some randomness is *not* reproducible from the saved file.

---

## Appendix: coverage log

**Read in full:** all 36 `research/ftg-docs/*.md` pages; `research/ftg-capture/create-request.json` (traversed programmatically, with `layoutParameters`, `districtsParameters`, `landscapeParameters`, `raceParameters`, `genders`, `genderPartners`, `racePartners`, `religionParameters`, `statsGenerationParameters`, `educationParameters`, `militaryParameters`, `factionsParameters`, `calendar`, `placeInWorld`, `governmentParameters` dumped verbatim, plus a full enum sweep over all string leaves); `research/ftg-capture/presets.json` (`sizes`, all 80 dependency-graph nodes, all 209 buildings' tags/gates/resources, professions & items/services sampled); `research/ftg-capture/layout-structure.md`; `captures/ftg/2026-09-21T05-08-07/steps/steps.jsonl`.

**Images opened:** every image on `createSettlement/{overview, algorithm, dependency_graph, districts, races, settlement_layout, water, save_settings}` (59 files, 5 GIFs decomposed to 9-frame contact sheets); `editSettlement/{map, regenerate_area, buildings, people, factions}` (3 GIFs + 20 stills); `useSettlements/{map(subset), buildings, people, factions, districts, daynightcycle(subset)}`; creation-form screenshots `001, 002, 003, 004, 005, 007, 008, 009, 013`.

**Deliberately skipped, with reason** (recorded, not lost): the pure colour/post-process filter samples on `useSettlements/map` (greyscale, sepia, green tint, pixelation, vignette, dot screen, scanline, MSAA/hardware AA comparisons — 9 files) and the FoundryVTT/Roll20 installation screenshots (15 files). These are UI/post-processing illustrations with no bearing on generation geometry or the parameter space; the crosshatch sample *was* opened because it is a genuine alternative rendering style. Two daynightcycle stills (cloudy, snowy-cloudy) and two season stills (summer, spring) were skipped as near-duplicates of the clear/snow/autumn/winter samples that were opened.

## Critic-2 addendum (FTG seat, 2026-09-25)

Rulings from `research/findings/_critic-ftg.md` (§1 F1, F3, F12, F19, F21, F26; §3 #34).

1. **§0.1 wire format — signed and centred, not 0..500000.** The persisted protobuf uses zig-zag `sint32` coordinates
   (creator, 164816716; proven on the payload: field 5 decodes to the four corners of a ±250000 square, field 22.5 to
   `[6,7]` = `restDaysInWeek`). The "vertex coordinates spanning 101..500000" quoted from `layout-structure.md` is the
   zig-zag-encoded range; the true range is **−250000..+250000 cm = ±2500 m**, so **1 unit = 1 cm** still holds and the
   CITY width 5000 m is the full width. `+x` east, `+y` north. Every distance in `ftg-payload-visual.md` §5 must be
   halved (see its addendum).
2. **§3.10 "a settlement with a 9-day week configured (22.2)" is wrong.** Field 22.4 carries exactly seven weekday names;
   22.2 = 9 is the *current hour* (the captured clock reads "9:00 Monday") and 22.1 = "Monday" the current day. The
   captured calendar is the request's 24 h × 7 days with rest days 6–7.
3. **§1.3 "Road segment length (m)" vs the payload.** The persisted edge-length modes are exactly **half** the
   configured values (stage 1 50 → 25 m, stage 2 60 → 30 m, suburb 30 → 15 m), not a midpoint split (see
   `ftg-payload-visual.md` addendum F). Until a second capture settles it, treat the layout form's "(m)" for
   `roadLength` as possibly 2 wire-metres; all other lengths (map width, bridge distance, buildings, scale bar) agree
   with 1 wire unit = 1 cm.
4. **§4.5 tag corrections.** "You cannot draw water bodies that intersect with the red circle" and the snapping-distance
   values are on-screen text inside the GIFs, not guide prose (no page contains "circle" except the stone-circle caption
   or "snapping distance") → `[SHOWN]`; the snapping unit "metres" is an inference, not stated anywhere. The
   `editSettlement__map.md` sentences ("Roads can't overlap – they must have properly defined intersections", "invisible
   edges help guide the fill features") are verified `[STATED]` (L21–23, L14–15).
5. **§2.1 edge types, now identified on the wire:** 0/1/2/10 streets and main roads (0 = proto3 default), 4 = suburb
   streets (15 m), 6 = rural lanes, 7 = minor, **3 = the map border**, **12 = harbour piers** (12 × 75.6 m), **14 = the water
   outline** (river banks, coast, harbour — the shoreline is inserted into the road graph so that lot detection treats
   water as a boundary, which is what "roads don't end in bodies of water" needs). The `Invisible` edit type is the
   most likely name for 14.
6. **§2.9 GeoJSON** still lists no districts (the January 2025 to-do in `ftg-posts-b.md` §T-33 is unresolved in the
   2026-09 guide).
7. **§4.1 / §4.4 bridge distance:** the December 2022 UI default was 100 (`ftg-posts-a.md` §2.15); the current default is
   40 m — a version change, units metres (`createSettlement__water.md` L209).
8. **§5.7 "300-second wall time"** is confirmed by `ftg-payload-visual.md` §1 (client busy 4.6 s of 300 s): generation is
   server-side and slow; this answers `ftg-posts-c.md` §7.18.
