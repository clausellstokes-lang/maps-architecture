# profile-village — Village Generator (watabou) 1.6.x, live-recording extraction

Slice: `captures/village/2026-09-21T05-04-05` (cold load + 3 regenerations × 3 passes = 12 generated villages).
Supplementary cross-checks (console only): `captures/village/2026-09-21T05-37-29`, `captures/village/2026-09-21T05-38-17`.

**Evidence tags** used throughout: `[STATED]` = the generator's own console/asset data says it; `[SHOWN]` = visible in a recording/image/draw-record but not explained; `[INFERRED]` = my reconstruction, reasoning given; `[NAMED-ONLY]` = a class/method name exists with no recoverable behaviour.

**Hard constraint honoured:** no captured JavaScript bundle was opened. `bin/Village.js` (1.35 MB) was listed in the network index and deliberately **not** read. Everything below comes from: the generator's own `console.jsonl` stage trace, the non-code assets it fetched (`grammar.json`, six palette JSONs, two name lists), the V8 coverage call counts (`gen-N.calls.json`), the CPU profiles/call trees, the Canvas2D draw record (`gen-N.draw.json`), and pixel measurements on the 12 PNG screenshots.

---

## 0. Headline findings (the things a re-implementer most needs)

1. **The whole visual style is data-driven by a ~40-key palette JSON.** Six themes ship (`village_default`, `village_night`, `village_cold`, `village_bw`, `village_minimal`, `village_sand`). Three of the keys are *mode switches* that change the algorithm, not just colour: `relief ∈ {Grass, Hachures, Contours}`, `roofType ∈ {Gable, Hip, Flat}`, `treeShape ∈ {Cotton, Conifer, Palm}`. Full schema in §7.1. `[STATED]` (the JSON was fetched by the app)
2. **Every outline and every hatch colour is a closed formula:** `outlineColour = blend(fillColour, ink, outlineFactor × pressure)` and `detailColour = blend(fillColour, ink, detailFactor × pressure)`. Verified to ±0.005 against four independent measured colours (§7.4).
3. **Water is a base fill + `shallowBands` nested shore-parallel strokes**, each narrower and lighter, clipped by the water polygon used as a mask. The band widths are in exact ratio **3^1.5 : 2^1.5 : 1^1.5 = 5.196 : 2.828 : 1**, identical in three different recordings. Colours are `lerp(waterDeep, waterShallow, k/shallowBands)`. Plus `shallowBands − 1` pale `waterTide` lines (§4.3, §7.3).
4. **Roads are grown by agent "Trackers"** that `advance()` step by step, each step calling `flexibility()`, `findRoadAhead()`, `avoidWater()`, `endBridge()`; they `branch()`/`branchFrom()` to spawn side roads. ~200 steps per village from 4–11 trackers (§4.4).
5. **Relief is a contour engine.** `LevelsView` walks ~114 iso-level polylines; at each step `NewGrass.verifySlope` decides whether/what mark to emit; `NewGrass.draw` emits a 4-point, 0.5 px tuft in one of two ground colours. On a sparse map (`profile/gen-3.png`, "Lost Pit") the full topographic contour structure is plainly visible as nested closed loops (§4.2, §6).
6. **Poisson-disc sampling uses exactly k = 50 candidate attempts per step** — `PoissonPattern.validate / PoissonPattern.step = 50.00` exactly in all four coverage runs (12500/250, 14900/298, 13050/261, 8150/163) (§4.6).
7. **The heightmap is 128 × 128** (`setPixel32` = 16384 = 128², `dist2poly` = 16384) and **shading normals are computed on the 127 × 127 interior** (`Vector3D.crossProduct` = `normalize` = `get_length` = 16129 = 127²). The shading bitmap is stack-blurred and composited as a full-map light layer (§4.2, §4.10).
8. **Generation can fail and is retried with a new seed.** Three distinct validation failures were captured verbatim: `ERROR: The highway intersects itself`, `ERROR: The highway is terminated by water`, `ERROR: Unfinished bridge on the highway` — all from `VillageScene.hx:275`. The rejected seed is carried into the final URL as `&trees=<failed seed>` (§3.2).
9. **Water generation dominates cost** (50–87 ms of a 40–160 ms model build). With no water the entire model is ~14 ms. Rendering is 27–95 ms (§5).
10. **VG shares the whole `com.watabou.geom`, `com.watabou.utils`, `com.watabou.tracery`, `com.watabou.nlp` and `com.watabou.coogee` substrate with MFCG** — Delaunator, DCEL/HalfEdge/Face/Vertex, PolyBool/PolyBounds/PolyCore/PolyCut/PolyTransform/PolyCreate, Chaikin, ConvexHull, Perlin/Noise, Palette, GradUtils, GraphicsExtender, BinGrid, Random, ArrayExtender (§8).

---

## 1. Evidence base

### 1.1 What the capture contains

| Pass | Runs | Seeds / tags (from `meta.json` final URLs) |
|---|---|---|
| profile | gen-0 cold, 1–3 regen | `1607431423 pond,grove,isolated` · `71764218 river,grove,no square,isolated` · `1479091611 pond,grove,dead end &trees=2087232953` · `255956923 sparse,grove,dead end` |
| coverage | gen-0 cold, 1–3 regen | `107406699 river,no square,highway` · `1781041559 dead end` · `176877720 no square,palisade,isolated` · `1202977223 river,isolated` |
| draw | gen-0 cold, 1–3 regen | `1011425987 confluence,no square,isolated` · `745978388 river,no square,isolated` · `4010513 coast,no square,isolated` · `1450476720 highway &trees=801393661` |

Base URL `https://html-classic.itch.zone/html/19251041/bin/index.html`. Canvas 1500 × 1100. Regeneration is bound to **Enter** (`VillageScene.onKey` → `newVillage` → `createVillage`). Host: Apple M1.

### 1.2 The app's own console trace `[STATED]`

The generator logs its own stage markers. Exact lines observed:

```
Source/com/watabou/village/model/Region.hx:81: 107406699          <- the seed
Source/com/watabou/village/model/Region.hx:82: [array Array]      <- the tag array
Source/com/watabou/village/VillageGrammar.hx:50: shrinking amelriceing
Source/com/watabou/village/model/Legend.hx:77: *** Daisy Hole (riverside village) ***
Source/com/watabou/village/model/Legend.hx:78: Buildings: 29, population: 113
Source/com/watabou/village/model/Legend.hx:82: 1. Town Hall (special)
Source/com/watabou/village/model/Legend.hx:82: 2. Berta's Grocery (basic_shop)
Source/com/watabou/village/scenes/VillageScene.hx:275: ERROR: The highway intersects itself
Source/com/watabou/village/scenes/VillageScene.hx:275: ERROR: The highway is terminated by water
Source/com/watabou/village/scenes/VillageScene.hx:275: ERROR: Unfinished bridge on the highway
```

This gives us, for free: the source-tree layout (`Source/com/watabou/village/...`), the exact file each stage lives in, the fact that `Region` is constructed from `(seed, tags[])`, and the retry contract.

### 1.3 Assets the app fetched (non-code) `[STATED]`

```
Assets/grammar.json            8220 B   tracery grammar, 69 symbols
Assets/given_female.txt         665 B   space-separated given names
Assets/given_male.txt           808 B   space-separated given names
Assets/village_default.json    ~1.4 kB  palette
Assets/village_night.json      ~1.3 kB  palette
Assets/village_cold.json       ~1.4 kB  palette
Assets/village_bw.json         ~1.3 kB  palette
Assets/village_minimal.json    ~1.3 kB  palette
Assets/village_sand.json       ~1.4 kB  palette
Assets/Cinzel-Bold.woff                 title face
Assets/ShareTech-Regular.woff           UI face
Assets/ShareTechMono-Regular.woff       "_typewriter" face
```

All six palettes are loaded eagerly at start-up (all six XHRs complete before the first village).

---

## 2. Class inventory (`com.watabou.*` only)

522 distinct `com.watabou.*` functions executed across the four coverage runs, in **105 classes / 15 packages**. Full per-method call counts are in **§A (appendix)**. Package-level summary:

| package | classes | role |
|---|---|---|
| `com.watabou.coogee` | Game, Scene, ui.UI, ui.UIStyle, ui.View, ui.elements.DropDownButton, ui.utils.Text | the shared app/scene framework (also used by MFCG/NG) |
| `com.watabou.geom` | Chaikin, Circle, Color, ConvexHull, DCEL, Delaunator, EdgeChain, Face, FillablePoly, FillableRect, GeomUtils, HalfEdge, PoissonPattern, Segment, Vertex, VoronoiPattern | computational geometry substrate |
| `com.watabou.geom.polygons` | PolyBool, PolyBounds, PolyCore, PolyCreate, PolyCut, PolyTransform | polygon toolkit split into mixins |
| `com.watabou.nlp` | Markov, Syllables | name morphology |
| `com.watabou.system` | State, URLState | URL/query-string state |
| `com.watabou.tracery` | Grammar, RuleSet, Symbol, Tracery, TraceryNode, RuleSelector, DeckRuleSelector, ExtSymbol, ModsEngBasic | Tracery text generation (with a *deck* selector = draw-without-replacement) |
| `com.watabou.utils` | ArrayExtender, BinGrid, GradUtils, GraphicsExtender, LongPresser, MathUtils, Noise, Palette, Perlin, PointExtender, Random, SetUtils, StringUtils, Updater | general utilities |
| `com.watabou.village` | Main, Names, VillageGrammar | app + naming |
| `com.watabou.village.model` | Blueprint, Bridge, Building, Elevation, Farmland, Forest, Gate, Junction, Legend, Network, Note, Palisade, Params, Region, River, SquareBuilder, Tags, Tracker, Water, props.Tower | **the generator** |
| `com.watabou.village.mapping` | BridgeView, BuildingView, DramaticLight, FarmlandView, ForestView, GridLayer, LevelsView, MapPlate, NewGrass, NumbersLayer, PalisadeView, ReliefLayer, RoadsView, Shading, ShadowLayer, Style, TreeType, VillageView, WaterView, buildings.GableRoof | **the renderer** |
| `com.watabou.village.scenes` | VillageScene | orchestration + validation/retry |
| `com.watabou.village.utils` | Bisector, BitMap, Bloater, PolyUtils | village-specific geometry helpers |

Classes present in the binary but **not exercised** in these 12 runs (so `[NAMED-ONLY]` at best): none observed beyond what is listed — but note `PalisadeView`, `Palisade`, `Gate`, `BitMap`, `ConvexHull`, `Syllables`, `Markov.generate`, `SquareBuilder`, `River`, `Bridge`, `Tower`, `WaterView` only fire when the corresponding tag is present, which is itself a finding (§3.1).

---

## 3. Top-level control flow

### 3.1 Blueprint / tags / URL

```
Main.new → coogee.Game.new → switchScene → VillageScene
VillageScene.restoreVillage()            (cold load)
VillageScene.newVillage()   (Enter key)  → createVillage()
createVillage():
    Blueprint.fromURL()   (cold load, reads ?seed & ?tags & ?trees)
    Blueprint.random()    (regenerate)
    Params.randomTags(); Params.resolve()
    Tags.new()
    Region.new(seed, tags)        ← the model
    Blueprint.updateURL()         → history.replaceState (seen as `replaceState` in the profile)
    Legend.new(); Legend.village()
    recreateView() → VillageView.new()   ← the render
```

`[SHOWN]` `Blueprint.is(tag)` is queried 63–92 times during one generation — the tag set is consulted throughout the model, not just at the start.

**URL format** `[STATED]` (from `meta.json` hrefs): `?seed=<uint32>&tags=<comma-separated>&trees=<uint32>`.

**Tag vocabulary observed in URLs** (11): `river`, `pond`, `coast`, `confluence`, `grove`, `isolated`, `dead end`, `highway`, `palisade`, `no square`, `sparse`.

**Tag vocabulary used by the naming grammar** (21, a different and larger space, derived from the finished model by `Region.updateTags`): `WATER`, `NO_WATER`, `SHORE`, `RIVER`, `PLAIN`, `HILL`, `VALLEY`, `FOREST`, `ISLAND`, `POND`, `FORK`, `MOUTH`, `HIGHWAY`, `BRIDGE`, `WHARF`, `SMALL`, `LARGE`, `PALISADE`, `JUCTION` *(sic — the typo is in the shipped grammar)*, `SQUARE`, `DISTRICT`.

`[INFERRED]` Two tag layers exist: *request* tags (what the URL asks for / what `Params.randomTags` rolls) and *descriptive* tags (what the finished map actually contains, written back by `Region.updateTags` and consumed by the name grammar). The presence of `Params.resolve` (1 call, right after `randomTags`) indicates a dependency/exclusion resolution pass — e.g. `confluence` implies `river`, `coast` excludes `pond`. **Test:** request mutually exclusive tags in the URL (`?tags=coast,pond`) and see which survives in the rewritten URL.

### 3.2 Validation and retry `[STATED]` — a first-class failure mode

`VillageScene.hx:275` prints `ERROR: <reason>` and the generator immediately starts over with a different seed. Captured reasons (all highway-related):

* `The highway intersects itself`
* `The highway is terminated by water`
* `Unfinished bridge on the highway`

Observed traces:

| requested seed | error | seed actually used | `trees` in final URL |
|---|---|---|---|
| 2087232953 | highway terminated by water | 1479091611 | 2087232953 |
| 801393661 | highway intersects itself | 1450476720 | 801393661 |
| 4242 | unfinished bridge on the highway | 4243 | 4243 carried to next gen |
| 9191 | highway intersects itself | 9192 / 443658761 | 9191 |

`[INFERRED]` The retry re-rolls `Region` from a new seed (sometimes `seed+1`, sometimes a fresh random draw — both were observed) and **keeps the previous seed as the tree-scatter seed**, so `trees` is a *second, independent RNG stream* for the forest layer. This is why the URL carries a separate `trees` parameter at all: it lets you keep a layout and re-roll only the vegetation (or vice versa). **Test:** load `?seed=X&tags=...` twice with different `trees` values and diff the two PNGs — only tree positions should move.

`[INFERRED]` the validator only ever complained about the *highway*, which suggests the highway is the one element generated by an unconstrained global process (a line crossing the whole map) that the local, incremental processes cannot repair. A re-implementation needs the same escape hatch: generate → validate → discard whole map → retry.

### 3.3 Seed → settlement class `[STATED]`

`Legend.hx:77` prints `*** <name> (<type>) ***`. Types observed: `roadhouse`, `hamlet`, `riverside hamlet`, `village`, `riverside village`, `coastal village`.

| buildings | population | type |
|---|---|---|
| 5 | 21 | roadhouse |
| 14 | 47 | roadhouse |
| 17 | 59 | roadhouse |
| 19 | 72 | riverside hamlet |
| 24 | 165 | riverside village |
| 25 | 157 | riverside village |
| 29 | 113 | riverside village |
| 30 | 157 | riverside village |
| 34 | 179 | village |
| 35 | 151 | riverside village |
| 37 | 209 | riverside village |
| 40 | 213 | village |
| 41 | 277 | village |
| 42 | 150 | village |
| 50 | 323 | village |
| 56 | 279 | coastal village |

`[INFERRED]` size class is a threshold on building count (roadhouse ≲ 17, hamlet ≈ 18–20, village above), with a water qualifier prefixed (`riverside` / `coastal`). Population is **not** a fixed multiple of buildings: pop/building ranges **3.6 – 6.9** (mean 5.1), so a household size is drawn per building (`Region.rollPopulation`, 1 call). The **printed label rounds population to the nearest 10** (113→"Pop. 110", 165→"Pop. 170", 279→"Pop. 280", 323→"Pop. 320", 151→"Pop. 150"). `[SHOWN]`

---

## 4. The generation pipeline, stage by stage

Reconstructed from the CPU call trees (which give true parentage) plus call counts. The `Region.new` call tree, verbatim from `profile/gen-1.cpuprofile`:

```
VillageScene.createVillage
├── Region.new                                    95.4 ms
│   ├── Region.createWater        53.4
│   │   └── Water.river           53.2
│   │       └── Water.setLevel    53.1
│   │           ├── Water.createDeflection  50.3 (self)
│   │           └── Water.buildCurves        1.9
│   │               └── Water.linkSegments   1.3
│   ├── Region.roll               26.1
│   │   ├── Region.rollForest     18.9
│   │   │   └── Forest.new        18.5
│   │   │       ├── VoronoiPattern.poisson  4.1
│   │   │       │   ├── VoronoiPattern.new  2.6 → Delaunator.new 1.4
│   │   │       │   └── PoissonPattern.new  1.4
│   │   │       ├── Forest.roll   3.7
│   │   │       │   ├── Farmland.getFields 1.8 → Farmland.reroll 1.8
│   │   │       │   └── Noise.get 1.5
│   │   │       ├── DCEL.new      3.6 → DCEL.addVertex 1.3
│   │   │       └── VoronoiPattern.getRect 3.5
│   │   └── Region.spawnFields    5.1
│   │       └── Farmland.new      5.1
│   │           ├── Farmland.buildRegions 2.9
│   │           │   └── Farmland.intersect 2.3 → PolyBool.and 2.3 → augmentPolygons 2.0
│   │           └── Farmland.cut  1.3 → Bisector.partition → Bisector.subdivide
│   └── Region.createElevation    14.7
│       └── Elevation.new         14.4
│           ├── Elevation.digRiver 9.0 → dist2poly 6.6 → dist2segment2 2.9
│           ├── Noise.getMap       3.1 → Noise.get 2.4 → Perlin.get 2.1
│           └── Elevation.createGradient 1.7
└── VillageScene.recreateView     44.0
    └── VillageView.new           43.5
        ├── ForestView.new        12.9 → drawTree 11.5 → {drawPolygonAt, drawLongShadow→ShadowLayer.drawPoly, TreeType.drawShaded1, TreeType.getCloudCrown→PolyTransform.scale}
        ├── ReliefLayer.new       12.4 → {NewGrass.draw 3.3, Point.distance 2.6}
        ├── Shading.update        11.7 → BitmapData.applyFilter → BlurFilter → ImageDataUtil.gaussianBlur → StackBlur.blur
        └── VillageView.drawFields 2.3 → FarmlandView.drawOrchard 1.4
```

The cold-load tree (`profile/gen-0`) additionally shows `Region.buildNetwork 5.3 → Network.build 4.5` and `Region.rollName 5.3 → VillageGrammar.village 5.3 → VillageGrammar.get 4.3 → Grammar.flatten 4.3`, and `ReliefLayer.new 11.4`, `VillageView.drawFields 9.5 → FarmlandView.drawOrchard 5.9`.

### 4.0 Stage order (canonical)

`[INFERRED, high confidence]` from call-tree ordering and data dependencies:

```
1  Blueprint / Params.randomTags / Params.resolve / Tags
2  Region.new(seed, tags)
2a   Region.createWater      → Water.river() | Water.pond() | (coast)
2b   Region.createElevation  → Elevation.new (Perlin field, gradient, mount/ridge/crack, digRiver)
2c   Region.createDensity    (settlement density field)
2d   Region.getHeart         (the settlement centre)
2e   Region.buildNetwork     → Network.build (trackers → roads, junctions, square, wharf)
2f   Region.roll
        rollForest   → Forest.new (Poisson → Voronoi → DCEL → flood-fill patches)
        spawnFields  → Farmland.new (Voronoi ∩ land → recursive OBB bisection → lot pick)
2g   Region.placeBuildings / buildAlong / addBuilding / validateBuilding
2h   Region.buildPiers / buildWharf                   (water only)
2i   Palisade.new … finalize / addGate                (palisade tag only)
2j   Region.rollPopulation, Region.updateTags, Region.rollName
3  Legend.new / Legend.village    (names + numbered points of interest)
4  VillageView.new  (render, §6)
```

Note `createElevation` appears in the call tree **after** `createWater` and `roll` in profile gen-1 but `digRiver` needs the water polygon, so water genuinely precedes elevation. In profile gen-0 `createElevation` is also listed after `roll`. `[INFERRED]` order is water → (forest/fields/network) → elevation-with-river-carving, i.e. elevation is finalised late because it must incorporate the river.

### 4.1 Water — `Region.createWater` → `com.watabou.village.model.Water`

Methods: `new, river, pond, setLevel, createDeflection, buildCurves, linkSegments, createPatches(×2), getGrid, getLand, getWharf, findDockable, (anon@399654 ×3)`.
Companions: `com.watabou.village.model.River {new, calculateCurvature}`, `Bridge {new, get_center, get_vector}`.

`[SHOWN]` Water exists only when a water tag is present: all 12 `Water.*` counts are `1` for the river/pond runs and `0` for `dead end` / `palisade` runs.

`[SHOWN]` cost: `setLevel` 53–87 ms, of which `createDeflection` is 50–73 ms **self time with no children** — a tight numeric loop, by far the hottest code in the generator.

`[INFERRED]` `setLevel` computes a scalar field (a signed distance / level function) over a grid and thresholds it to get the water body; `createDeflection` perturbs that field so the banks meander; `linkSegments` stitches the resulting boundary segments into chains (a marching-squares-style contour extraction, which is exactly what "link segments" means); `buildCurves` smooths the chains (`Chaikin.render` fires 163–215 times per map).
  *Supporting numbers:* the finished water polygon in `draw/gen-0` has **313 segments** and is split into exactly **3 open chains of 87 / 117 / 111 segments (= 315 ≈ 313)** — three chains for a `confluence`, two for a plain `river`, one for a `coast`. So the water boundary is kept as a set of chains, not one ring.
  *Alternative hypothesis:* a base curve (straight line for a river, circle for a pond) is radially deflected by fractal noise and the polygon is built by offsetting it. This is simpler and matches the very smooth, lobed pond outlines in `profile/gen-0.png` and `profile/gen-2.png`. **Test to discriminate:** generate a `pond` at high zoom and look for grid-quantised staircase artefacts on the bank (marching squares) vs pure smooth curvature (deflected primitive).

`[SHOWN]` `River.calculateCurvature` is called once per river — used by `Region` to decide bank suitability / meander insets (the settlement in `profile/gen-1.png` sits inside a meander loop).

`[SHOWN]` Piers/wharf: `Water.findDockable` + `Water.getWharf` + `Region.buildPiers` + `Region.buildWharf` + `Network.spawnWharf`, all 1 call each, only with water. `draw/gen-2.png` (coastal) shows **four plank piers** projecting into the sea; `coverage/gen-3.png` shows none (river too narrow). `Network.validateLanding` 1/0/0/4.

### 4.2 Elevation — `com.watabou.village.model.Elevation`

Methods: `new, createGradient, createMount, createRidge, createCrack, digRiver, dist2poly, dist2segment2, updateMinMax, g, (anon@338001), (anon@338022)`.

`[SHOWN]` **Grid size is 128 × 128.** `Elevation.dist2poly` = **16384** calls, `BitmapData.setPixel32` = **16384**, and the first painted canvas is **128 × 128**. 16384 = 128².

`[SHOWN]` **River carving cost is linear in the water polygon's segment count.** `dist2segment2 / dist2poly` = 671744/16384 = **41.0** (gen-0) and 589824/16384 = **36.0** (gen-3) — i.e. for every one of the 16384 cells, the distance to all 41 (resp. 36) segments of the water polygon is evaluated. Naïve O(cells × segments); no acceleration structure. This is also why `MathUtils.gate` (713 470) and `GeomUtils.lerp` (702 339) spike in exactly the runs that have a river and are ~40 000 in the runs that do not.

`[SHOWN]` **Base field is fractal Perlin with ~5 octaves.** `Noise.getMap` = 1 call → `Noise.get` = 21 022 (16384 grid samples + ~4 600 elsewhere) → `Perlin.get` = 109 748. 109748 / 21022 = **5.22** Perlin evaluations per Noise sample. `Noise.fractal` is called twice and `Perlin.new` 11 times at start-up (a pool of 11 permutation tables).

`[SHOWN]` Optional terrain features, tag-gated: `createGradient` (1 every run — a global tilt), `createMount` (gen-2 only), `createRidge` / `createCrack` (gen-1 only). `updateMinMax` normalises the field.

`[INFERRED]` `Elevation.g(x,y)` is the sampler (5 calls per run = a handful of point queries by other subsystems). `digRiver` subtracts a function of `dist2poly` from the height so the river sits in a valley — which is what makes the contour rings in the screenshots bend around the water.

### 4.3 Water rendering (measured precisely) — `WaterView`, `Style`

The `draw/gen-0.draw.json` water layer, verbatim:

```
[863, 'fill',   '1313x1236', '#ff0000',                313]        <- MASK (OpenFL draws masks in flat red)
[887, 'fill',   '1511x1367', '#4c8699',                313]        <- waterDeep
[892, 'stroke', '1511x1367', '#508c9d', 147, 59.188]               <- band 1
[892, 'stroke', '1511x1367', '#5592a1', 219, 32.218]               <- band 2
[892, 'stroke', '1511x1367', '#5a99a6', 439, 11.391]               <- band 3 (= waterShallow)
[892, 'stroke', '1511x1367', 'rgba(31, 54, 77, 0.5)', 3, 8]        <- bridge shadow on water
[892, 'stroke', '1511x1367', 'rgba(31, 54, 77, 0.5)', 4, 8]
```

**Band-width law `[SHOWN]`** — identical ratios in three independent runs:

| run | w1 | w2 | w3 | w1/w2 | w2/w3 | w1/w3 |
|---|---|---|---|---|---|---|
| draw gen-0 (confluence) | 59.188 | 32.218 | 11.391 | 1.8371 | 2.8284 | 5.196 |
| draw gen-1 (river) | 51.696 | 28.140 | 9.949 | 1.8371 | 2.8284 | 5.196 |
| draw gen-2 (coast) | 110.025 | 59.890 | 21.174 | 1.8371 | 2.8284 | 5.196 |

5.196 = 3^1.5, 2.8284 = 2^1.5, 1.8371 = (3/2)^1.5. So `width(k) = W · k^1.5` for k = shallowBands … 1. With `shallowBands = 3` in `village_default`, and `shallowBands` = 0/2/3/5/10 across the six palettes, the general rule is `width(k) = W · k^1.5, k = 1..shallowBands`, drawn widest-first.

**Band-colour law `[SHOWN]`**: `waterDeep #4C8699` → `waterShallow #5B99A6`. Computed `lerp(deep, shallow, k/3)` = `#518C9D`, `#5693A2`, `#5B99A6`; recorded `#508c9d`, `#5592a1`, `#5a99a6`. Match to within 1/255 (rounding).

**Verified against pixels.** Vertical scan through the pond in `profile/gen-0.png` at x = 380 (shore at y = 666):

```
y=666  #3b3a39   shore outline (ink-ish)
y=668  #5a99a6   band 3  (waterShallow)
y=678  #a3c9cc   TIDE LINE  (= palette waterTide exactly)
y=688  #5592a1   band 2
y=710  #7cadb5   TIDE LINE (antialiased)
y=740  #4f8a9b   band 1
y=804  #4a8395…  base fill, fading with the light overlay
```

**Tide lines `[SHOWN]`**: `shallowBands − 1 = 2` pale `waterTide` lines. In the draw record they appear as strokes with `2N − 3` segments where N is the chain length (171/231/219 against 87/117/111) — i.e. two offset copies of each bank chain in a single stroke call.

**Direction of shading `[SHOWN]`**: lightest at the shore, darkest offshore — confirmed on a coast (`draw/gen-2.png`, x=450 vertical scan: discrete steps at ~20/65/135 px from the beach, ratios ≈ 1 : 3.3 : 6.8) *and* on a river (`draw/gen-0.png`, y=200 horizontal scan across a 144 px river: symmetric `#5a99a6`(12 px) → `#5592a1`(24 px) → `#508c9d`(centre 64 px) → mirror). The measured boundary ratios exceed the nominal 1 : 2.83 : 5.20 on concave shores, which is exactly what you expect when the scan line is oblique and the shore is curved.

`[INFERRED]` implementation: stroke the water **boundary** chains with `lineWidth = W·k^1.5`, round join/cap, from k = shallowBands down to 1, with a mask set to the water polygon so the outer half of every stroke is clipped away on land. Net result is a discrete "depth" ramp keyed on distance-to-shore. This is a very cheap substitute for a real distance transform and is trivially re-implementable.

**Beach/sand `[SHOWN]`** — drawn *before* the water, in its own layer:

```
[861, 'stroke', '1365x1271', 'rgba(197, 190, 172, 0.5)', 87, 16]   <- sand #C5BEAC at 50 %, w16
[861, 'stroke', '1365x1271', '#c5beac',                  87,  8]   <- sand solid, w8
   … repeated per bank chain (3 chains for the confluence)
```

So each bank chain gets a soft 16 px halo plus a solid 8 px core in `sand`; the water fill then covers the wet half, leaving a sand fringe on land.

**Water outline + bridges `[SHOWN]`** — drawn *after* the water:

```
[893, 'stroke', '1323x1250', '#3b3a39', 87,  1]   <- dark shore outline, one per chain
[893, 'stroke', '1323x1250', '#a3c9cc', 171, 1]   <- tide lines (2N-3)
[893, 'stroke', '1323x1250', '#bd9d86',  3,  8]   <- bridge deck, colour = palette `plank`
[893, 'stroke', '1323x1250', '#39302c', 161, 0.5] <- plank hatching (≈54 planks)
[893, 'stroke', '1323x1250', '#39302c',  6,  1]   <- bridge railings/ends
```

`BridgeView {draw, drawPlanks, drawShadow, plankWidth}` — a bridge is a straight 3-segment deck stroked at `w8` in `plank` colour, with ~54 hatch lines for planks and a 50 %-alpha navy shadow cast onto the water.

### 4.4 Road network — `Region.buildNetwork` → `Network`, `Tracker`, `Junction`

Methods: `Network {new, build, createSquare, spawnIsolated, spawnWharf, findRoadAhead, avoidWater, getTrackers, getTrackersAround, registerTrackers, validateJunctions, validateLanding, (anon ×4)}`; `Tracker {new, advance, branch, branchFrom, prev, shortcut, flexibility, startBridge, endBridge}`; `Junction {new}`; `Region {initHighway, randomEdge, buildAlong}`.

Call counts (gen-0 / 1 / 2 / 3):

| method | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| `Tracker.new` | 4 | 6 | 11 | 5 |
| `Tracker.advance` | 211 | 189 | 340 | 164 |
| `Tracker.flexibility` | 200 | 186 | 334 | 145 |
| `Network.findRoadAhead` | 200 | 186 | 335 | 146 |
| `Network.avoidWater` | 200 | 186 | 334 | 145 |
| `Tracker.endBridge` | 200 | 186 | 337 | 146 |
| `Network.getTrackersAround` | 996 | 1326 | 976 | 870 |
| `Network.validateJunctions` | 93 | 145 | 237 | 110 |
| `Junction.new` | 3 | 5 | 4 | 5 |
| `Tracker.branchFrom` / `branch` | 2/0 | 0/0 | 2/2 | 0/0 |
| `Tracker.startBridge` | 1 | 0 | 0 | 2 |
| `Region.buildAlong` | 7 | 7 | 16 | 6 |

`[INFERRED, high confidence]` **Roads are grown by agents.** 4–11 `Tracker`s are created and each is stepped ~30–40 times; the per-step counts `flexibility ≈ findRoadAhead ≈ avoidWater ≈ endBridge ≈ advance` mean every step does, in order:
1. `flexibility()` — how much this tracker may turn this step (probably decreasing with road rank/length);
2. `findRoadAhead()` — is there an existing road in front? (→ merge / make a `Junction`);
3. `avoidWater()` — is there water in front? (→ steer around, or `startBridge`/`endBridge` to cross);
4. `advance()` — commit the step.
`getTrackersAround` (≈ 5 per step) is the neighbour query that keeps roads from running into each other; `validateJunctions` runs ~0.5–0.7 per step.

`[SHOWN]` `Tracker.startBridge` fires only where the road actually crosses water (1, 0, 0, 2) while `endBridge` fires every step — so `endBridge` is a *test* ("am I finishing a bridge?") rather than an action. The `Unfinished bridge on the highway` validation error is the failure of that test at the end of the walk.

`[SHOWN]` `Network.spawnIsolated` and `Network.spawnWharf` are each called exactly once per village regardless of tags — they are unconditional stages whose *body* is tag-gated.

`[SHOWN]` **Highway** = `Region.initHighway` + `Region.randomEdge`, present in the runs tagged `highway` / `no square,highway` and absent otherwise. `randomEdge` picks a start point on a random map edge. In `draw/gen-3.png` the highway is a single 150-segment polyline crossing the whole frame, rendered at `largeRoad = 6` core (see §7.2) versus `smallRoad = 2` for local roads.

`[SHOWN]` **Dead end** tag: the incoming road simply terminates at the settlement (`coverage/gen-1.png`, `profile/gen-2.png`, `profile/gen-3.png`).

`[SHOWN]` **Trails** — a second, unpaved road class drawn as dotted polylines (`GraphicsExtender.dashedPolyline`, 141–203 calls/run) in `road` colour. Visible as dotted curves leaving the settlement and threading between fields in every screenshot. `Farmland.fixTrails` (1 call) suggests trails are repaired against the field partition.

### 4.5 The square — `Network.createSquare`, `SquareBuilder`

`SquareBuilder {build, place, addCenterpiece, (anon@388412)}` — fires only when `no square` is absent.

`[SHOWN]` Three square morphologies were captured:
* a **circle**: `draw/gen-3.png` (Astjohn) — the draw record contains `fill #c5beac (segs 44)`, i.e. a 44-gon disc, with the highway passing straight through it;
* a **rounded blob** with a well at the centre: `profile/gen-0.png`, `profile/gen-2.png`;
* an **irregular polygon with sub-areas**: `coverage/gen-3.png` (Whispervik) — a cream plaza plus a grey paved patch and a small green patch.

`[SHOWN]` `addCenterpiece` produces either a **well** (small concentric circles — the `arc` Canvas2D call, 1–4 per run) or a **single large tree** (`profile/gen-2.png`).

`[SHOWN]` Buildings fan out around the square, long-axis roughly tangential, in `draw/gen-3.png` — i.e. buildings are oriented to the square's rim as well as to roads.

### 4.6 Forest — `Region.rollForest` → `Forest`, and `PoissonPattern` / `VoronoiPattern` / `DCEL`

`Forest {new, roll, createPatches, getPatches, H, (anon@349301)}`.

Pipeline from the call tree: `Forest.new` → `VoronoiPattern.poisson` → (`PoissonPattern.new`, `VoronoiPattern.new` → `Delaunator.new`) → `DCEL.new` → `VoronoiPattern.getRect` → `Forest.roll`.

**Poisson-disc constant recovered exactly `[SHOWN]`:**

| run | `PoissonPattern.step` | `.validate` | validate/step | `.emit` | emit/step |
|---|---|---|---|---|---|
| gen-0 | 250 | 12 500 | **50.00** | 161 | 0.64 |
| gen-1 | 298 | 14 900 | **50.00** | 193 | 0.65 |
| gen-2 | 261 | 13 050 | **50.00** | 171 | 0.66 |
| gen-3 | 163 | 8 150 | **50.00** | 110 | 0.67 |

So: **k = 50 candidate samples per active point**, all 50 always evaluated (no early exit), ~65 % of steps emit a point. `PoissonPattern.warp` ≈ `validate + step` — every candidate is passed through a warp function before validation, i.e. **the sampler works in a warped domain** (domain-warped Poisson-disc), which is what gives the tree scatter its organic, non-uniform look. Other methods: `fill`, `rect`, `uneven` (2/3/1/1 — an "uneven" density mode).

**Voronoi `[SHOWN]`**: `Delaunator` is Mapbox's Delaunator ported to Haxe (methods `link, legalize, inCircle, orient, orientIfSure, pseudoAngle, hashKey, circumradius2, triangleCenter, triCircumcenter, addTriangle, edgesAroundPoint, getVoronoi, update, dist, circumcenter`). `Face.new` = 1 897 – 5 910 per run = the number of Voronoi cells. `DCEL.addVertex` = `HalfEdge.new` exactly (11 413 / 23 155 / 35 454 / 11 586) — a textbook doubly-connected edge list.

**Patches `[INFERRED]`**: `DCEL.floodFill` (33–53), `DCEL.split` (25–45), `DCEL.outline` (20–40), `DCEL.shrink` (4–7), `DCEL.shrinkExcl` (21–41), `DCEL.circumference` (23–48). Read together: cells are labelled forest/not-forest by a noise threshold (`Forest.roll` calls `Noise.get`), contiguous labelled cells are flood-filled into patches, each patch's outline is extracted and then shrunk (inset) to get the planting polygon, with `shrinkExcl` used to keep a patch away from something (roads/fields/water). `Forest.H` (2–4 calls) is probably a per-patch density/height parameter. `ArrayExtender.difference` count equals `shrinkExcl` count exactly in all four runs — the exclusion set is computed as a set difference.

**Tree instances `[SHOWN]`**: `Forest.(anon@349301)` = 1 199–1 633 per run (candidate trees) against `ForestView.drawTree` = 546–751 (drawn trees) — roughly half the candidates survive. `Farmland.getFields` is called from inside `Forest.roll`, so the forest is aware of the field partition (trees are excluded from ploughed land — visible in every screenshot).

`[SHOWN]` the `grove` tag produces tight clusters of trees *inside* the settlement between the radial roads (`profile/gen-0.png`, `profile/gen-2.png`), as opposed to the continuous forest mass at the map edges.
`[SHOWN]` the `sparse` tag thins both buildings and trees dramatically (`profile/gen-3.png`, 5 buildings).

### 4.7 Fields — `Region.spawnFields` → `Farmland`, `Bisector`

`Farmland {new, buildRegions, getVoronoi, intersect, cut, pickLots, filterLots, fixTrails, getLandSegments, reroll, getFields, getMinArea, obb, centroid, area, semiSmooth, getArc, getCircle, (anon@341827)}`
`Bisector {new, partition, subdivide, makeCut, split}`

Exact correspondences across all four runs:

| pair | equal? |
|---|---|
| `Farmland.cut` ↔ `Bisector.new` ↔ `Bisector.partition` | 27/18/28/23 — identical |
| `Farmland.getMinArea` ↔ `Bisector.subdivide` | 71/98/120/79 — identical |
| `Bisector.makeCut` ↔ `Bisector.split` | 22/41/46/28 — identical |
| `Farmland.getArc` ↔ `Farmland.getCircle` ↔ `Circle.new` | 20/29/42/26 (Circle.new 21/30/43/27) — identical +1 |
| `PolyBounds.obb` ↔ `PolyBounds.convexHull` | 71/94/104/79 — identical |

`[INFERRED, high confidence]` **Recursive OBB bisection, exactly as in MFCG's ward subdivision:**
1. `getVoronoi` — a Voronoi partition of the land;
2. `intersect` → `PolyBool.and` (+`augmentPolygons`) — clip the cells against the land/settlement region;
3. for each region, `cut` → `Bisector.partition` → recursive `subdivide`: compute the **oriented bounding box** (`PolyBounds.obb`, itself built on `convexHull` — rotating-callipers), cut perpendicular to the long axis (`makeCut`/`split`), recurse while `area > getMinArea`;
4. `pickLots` / `filterLots` — decide which resulting lots become ploughed fields (the rest stay pasture);
5. `semiSmooth` + `getArc`/`getCircle` — round the field corners with circular arcs (this is why field corners in the screenshots are soft, not mitred);
6. `fixTrails` — reconcile the trail network with the new field boundaries.

`Farmland.reroll` is called from `Forest.roll` — fields and forest negotiate.

**Orchards `[SHOWN]`**: `FarmlandView {drawOrchard, getOrchardTrees, getPoisson, validateTree, getRows, drawField, drawFurrow, getPattern}`. 3–6 orchards per map, rendered as a **regular grid of trees on a field** (clearly visible in `coverage/gen-1.png` beside the square and in `draw/gen-0.png` top-left). `getRows` (1–4) lays out rows; `validateTree` (16–55) rejects trees that fall outside the field or on a trail.

**Furrows `[SHOWN]`**: `FarmlandView.drawFurrow` = 139–201 and `GraphicsExtender.dashedPolyline` = 141–203 in every run — **one dashed polyline per furrow** (1 : 1 correspondence, offset by the handful of trail dashes). `getPattern` is called once per furrow, so the dash pattern is per-furrow (varying phase/length — the furrows in the screenshots are visibly broken and irregular, not ruled). ~18 furrows per field.

### 4.8 Buildings — `Region.placeBuildings` / `buildAlong` / `addBuilding`, `Building`, `Blueprint`

| method | 0 | 1 | 2 | 3 | reading |
|---|---|---|---|---|---|
| `Region.buildAlong` | 7 | 7 | 16 | 6 | one pass per road/street |
| `Building.new` | 38 | 50 | 79 | 37 | candidates constructed |
| `Region.validateBuilding` | 38 | 49 | 76 | 35 | candidates tested |
| `Building.testVsRoad` | 48 | 56 | 105 | 40 | road-overlap tests |
| `Region.getBuildingsAround` | 1258 | 1711 | 1269 | 1033 | neighbour queries |
| `BinGrid.get` | 2370 | 3174 | 2417 | 2000 | ≈ 2 × the above |
| `Region.addBuilding` | 29 | 41 | 50 | 26 | accepted |
| `Region.removeBuilding` | 0 | 0 | 0 | 1 | |
| final buildings (console) | 29 | 41 | 50 | 25 | ✔ matches add − remove |

`[INFERRED]` **Rejection sampling along road frontages.** For each street, candidate buildings are proposed at intervals along the frontage; each candidate is rejected if it overlaps the road (`testVsRoad`), another building (`getBuildingsAround`, accelerated by a `BinGrid` spatial hash with ~33–61 inserts), water, or a field. Acceptance rate **63 – 82 %**. ~33–43 neighbour queries per candidate.
`[SHOWN]` `Region.spawnAt` (gen-3 only) — a targeted placement, probably the "special" buildings (town hall / temple) at the square.
`[SHOWN]` `com.watabou.village.model.props.Tower` (0/1/0/1) and `GableRoof.drawTower` (0/2/1/2) — a minority of large buildings get a round tower, visible as concentric circles on the roof in `coverage/gen-1.png`, `coverage/gen-2.png`, `coverage/gen-3.png`, `draw/gen-2.png`.

### 4.9 Palisade — `com.watabou.village.model.Palisade` (only the `palisade` tag; `coverage/gen-2.png`)

Methods and counts (gen-2 only): `new 1, getPopulated 1, getBuildings 1, poly2smooth 1, cubic 32, clean 1, contains 1, finalize 1, blocks 337, overlaps 1463, getClosestSeg 20, addGate 3, validateGate 5, c 3`.
Companions: `com.watabou.village.utils.BitMap {new 1, check 1463}`, `ConvexHull {ofPoly 1, ofSet 1, (anon@162117) 91}`, `Gate {new 3}`, `PalisadeView {draw 1, drawPassageShadow 3}`.

`[INFERRED, high confidence]`:
1. `getPopulated` / `getBuildings` collect the buildings to enclose;
2. `ConvexHull.ofSet` over their 91 corner points gives a starting ring;
3. `poly2smooth` → **32 cubic Bézier segments** (`cubic` = 32) — so the palisade is a closed 32-segment cubic spline, which is why it renders as a clean ellipse-ish loop;
4. `overlaps` = `BitMap.check` = **1463** exactly — a rasterised occupancy mask is consulted 1463 times to push the wall off buildings (`blocks` 337 = the positions that were blocked);
5. `addGate` × 3 where roads cross the wall; `validateGate` 5 (2 rejected); `getClosestSeg` 20 snaps gates to wall segments;
6. `clean` + `finalize`.

`[SHOWN]` rendering: the wall is a **bead of individual round posts** along the curve (each post a small filled circle with a dark outline), with `PalisadeView.drawPassageShadow` (3 = one per gate) darkening the gate passages. Gates read as small hatched gatehouse rectangles straddling the wall.

### 4.10 Shading / lighting — `Shading`, `DramaticLight`

`[SHOWN]` `Shading {new, update}` → `BitmapData.setPixel32` **16384** times (128 × 128) → `BitmapData.applyFilter` → `BlurFilter.__applyFilter` → `ImageDataUtil.gaussianBlur` → `StackBlur.blur` (3.6 – 31 ms).
`[SHOWN]` `Vector3D.new / crossProduct / normalize / get_length` = **16129 / 16129 / 16129 / 16137** = 127² — a surface **normal per interior grid cell, computed as the cross product of the two tangent vectors**, then normalised. `[INFERRED]` the dot product with a light direction gives a Lambert term written into the 128 × 128 bitmap, which is stack-blurred and composited over the whole map. This is the soft green light/shade modulation visible everywhere (most obvious in `profile/gen-3.png`).
`[SHOWN]` `DramaticLight {new, update, calcLight ×2, (anon) ×4}` and the final painted layer is `1101 × 1101` with **two `CanvasGradient` fills** and `createRadialGradient` 4–6 times per run — a two-gradient "dramatic light" overlay that brightens a band across the map and darkens the corners. The direction varies per map (`draw/gen-3.png` is dark at all corners with a bright NE–SW band; `profile/gen-1.png` is bright top-left).

### 4.11 Naming and legend — `VillageGrammar`, `Names`, `tracery`, `nlp`, `Legend`

`[STATED]` The shipped `grammar.json` has **69 symbols**. Key structure:

```
village      = [#personsNoun#, #twoWords#, #twoWords#, #oneWord#, #oneWord#, #oneWord#, DISTRICT?-#district#]
oneWord      = [#simpleName# ×3, #suffixName# ×2, #prefixName#]
suffixName   = {#adj#|#syll#}#suffix#      prefixName = #prefix##syll#
simpleName   = [#adj##genericNoun#, #genericAdj##noun#]
personsNoun  = [#proper.possessive# #noun# ×2, "st #proper#"]
adj          = [#genericAdj#, #specificAdj#]        specificAdj = [#terrAdj#, 0.5?-#sizeAdj#]
terrAdj      = [WATER?-…, SHORE?-…, RIVER?-…, PLAIN?-…, HILL?-…, VALLEY?-…, FOREST?-…]
terrNoun     = [NO_WATER?-…, WATER?-…, FOREST?-…, RIVER?-…, SHORE?-…, ISLAND?-…, POND?-…,
                FORK?-…, MOUTH?-…, PLAIN?-…, HILL?-…, VALLEY?-…]
featNoun     = [HIGHWAY?-…, BRIDGE?-…, WHARF?-…, SMALL?-…, LARGE?-…, PALISADE?-…, JUCTION?-…, SQUARE?-…]
```

Two custom Tracery extensions, both readable from the data alone:
* **`TAG?-rule`** — the rule is only eligible when `TAG` is present in the model's tag set. (`PALISADE?-{burgh|bury|borough|burg}`, `HILL?-fell`, `VALLEY?-dale`, `WATER?-vik`, `BRIDGE?-{ford|forth}`, `SHORE?-ness`, `ISLAND?-holm`, `FORK?-{inver|inner}` …)
* **`0.5?-rule` / `0.1?-rule`** — a probability weight on the rule.
* **`{a|b|c}`** — inline alternation; **`hay{es}`**, **`rock{s}`**, **`cot{t}`** — optional letters.

`DeckRuleSelector` (`clearState`, `select`) is a **draw-without-replacement** selector — rules are dealt from a shuffled deck and the deck is reset by `clearState`, which is why repeated names within one map are rare.

`[STATED]` **Building categories** (grammar symbol names, echoed by `Legend.hx:82`): `inn`, `tavern`, `smithy`, `person`, `temple`, `basic_shop`, `special_shop`, `special`. Examples from the console: `Town Hall (special)`, `Berta's Grocery (basic_shop)`, `The Coin And Snake (tavern)`, `Isabel Portshield's Home (person)`, `Gam's Temple (temple)`, `Yrian's Inn (inn)`, `Blackroad Blades (smithy)`, `Archive (special)`, `Cups (tavern)`, `The Hero And Thief (tavern)`.
`special = [guild{ }{house|hall}, town hall, archive, library, SHORE?-lighthouse]` — note the lighthouse is coast-gated.
Person names come from `given_female.txt` / `given_male.txt` (medieval English/Norse given names: Ada, Adelina, Agnes, Albreda… / Adam, Adalwolf, Agnar, Ailwin…) plus `surname = #sur1##sur2#` from two 13–14-word lists (`iron|strong|brave|storm|copper|…` × `hand|head|fist|shield|field|grass|road|man|wood|son|spear|staff|lock`).

`[STATED]` **Name shrinking.** `VillageGrammar.hx:50: shrinking amelriceing` → the printed name was `Amelceing`; `shrinking hunterborough` → `Hunborough`. So when a generated name exceeds a length budget, `VillageGrammar.shrink` → `Syllables.splitWord` / `Syllables.pinch` removes interior syllables. `Markov {new ×3, split ×418}` is built once at start-up from the name lists and `Markov.generate` supplies the `#syll#` symbol for invented syllables.

`[SHOWN]` `Legend {new, village}` + `Note.new ×2` — exactly two numbered points of interest are emitted per village in these captures. `NumbersLayer` exists to draw the numbers on the map but painted nothing in these runs (the legend is console-only unless enabled in the UI).

---

## 5. Cost model

### 5.1 Per-run totals

| run | wall | busy JS | idle | GC | samples |
|---|---|---|---|---|---|
| gen-0 (cold load) | 2453.8 ms | 1058.3 ms | 1395.6 | 17.6 | 18 473 |
| gen-1 (regen, river) | 1511 ms | 326.4 ms | 1184.6 | 7.5 | 11 757 |
| gen-2 (regen, pond) | 1488 ms | 303.7 ms | 1184.4 | 6.8 | 10 982 |
| gen-3 (regen, no water) | 1431.8 ms | 244 ms | 1187.8 | 2.4 | 10 200 |

Cold load is dominated by the engine, not the generator: `Shader.__createGLShader` 356 ms, `Shader.__createGLProgram` 85 ms, `AudioContext.new` 129.5 ms, `HTML5Window.createContext` 26 ms, font loading 242 ms. **A regenerate is 240–330 ms of JS, of which the village itself is 40–160 ms.**

### 5.2 Per-stage (inclusive ms, from the call trees)

| stage | gen-0 (pond) | gen-1 (river) | gen-2 (pond) | gen-3 (no water) |
|---|---|---|---|---|
| `createVillage` total | 237.3 | 139.4 | 157.1 | 40.5 |
| `Region.new` | 143.0 | 95.4 | 125.8 | 13.6 |
| ├ `createWater` | 82.2 | 53.4 | 87.1 | — |
| │  └ `setLevel`→`createDeflection` | 73.4 | 50.3 | 86.5 | — |
| ├ `roll` | 44.7 | 26.1 | 27.7 | 8.8 |
| │  ├ `rollForest`→`Forest.new` | 19.7 | 18.5 | 21.3 | 6.2 |
| │  └ `spawnFields`→`Farmland.new` | 9.6 | 5.1 | 3.9 | 1.4 |
| ├ `createElevation` | 9.9 | 14.7 | 9.4 | 3.1 |
| │  └ `digRiver` | — | 9.0 | — | — |
| ├ `buildNetwork` | 5.3 | <0.4 | <0.4 | <0.4 |
| └ `rollName` | 5.3 | <0.4 | <0.4 | <0.4 |
| `recreateView`→`VillageView.new` | 94.4 / 92.6 | 44.0 / 43.5 | 30.6 / 30.3 | 26.9 / 26.8 |
| ├ `Shading.update` (blur) | 36.6 (31.3) | 11.7 (8.6) | 6.7 (4.0) | 6.0 (3.6) |
| ├ `ForestView.new` | 20.4 | 12.9 | — | 2.7 |
| ├ `ReliefLayer.new` | 11.4 | 12.4 | 15.7 | 14.9 |
| └ `drawFields` | 9.5 | 2.3 | 2.1 | 1.3 |

**Cost profile of the generator, ranked:** water level-set ≫ forest (Poisson+Voronoi+DCEL) > elevation (128² noise + river distance field) > fields (Voronoi ∩ land + bisection) > road network ≈ naming. On the render side: shading blur > tree drawing > relief hachure > fields.

`[SHOWN]` `Region.new` is **10× cheaper with no water** (13.6 ms vs 95–143 ms). Any re-implementation should budget accordingly and consider a cheaper distance field (a JFA/EDT or a coarse grid) — the shipped code is O(cells × boundary segments).

### 5.3 Per-run call volume

| run | functions executed | total calls |
|---|---|---|
| gen-0 | 1352 / 3893 | 10 383 468 |
| gen-1 | 910 / 921 | 7 241 914 |
| gen-2 | 957 / 972 | 7 591 675 |
| gen-3 | 961 / 976 | 8 484 036 |

~85 % of all calls are OpenFL vector-graphics plumbing (`Point.distance` 1.3–2.1 M, `Graphics.__inflateBounds` 1.0–1.3 M, `DrawCommandBuffer.prepareWrite` 0.86–1.09 M, `DrawCommandBuffer.lineTo` 0.66–0.87 M). **The actual algorithm is a few hundred thousand calls.** A re-implementation that batches paths instead of using a retained-mode display list would be far cheaper than the original.

---

## 6. Relief — the contour engine (`ReliefLayer`, `LevelsView`, `NewGrass`)

| method | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| `LevelsView.init` | 114 | 79 | 92 | 103 |
| `LevelsView.update` | 7386 | 7557 | 11049 | 6775 |
| `LevelsView.makeStep` | 7272 | 7478 | 10957 | 6672 |
| `NewGrass.init` | 114 | 79 | 92 | 103 |
| `NewGrass.verifySlope` | 7335 | 7515 | 11003 | 6734 |
| `NewGrass.draw` | 7186 | 7408 | 10875 | 6588 |

`[INFERRED, high confidence]` `LevelsView` traces **iso-level polylines** through the 128² height field; `init` is called once per level-polyline (79–114 of them), then the polyline is walked in `makeStep` increments (≈ 64–120 steps each). At each step `NewGrass.verifySlope` decides whether the local gradient permits a mark (97–98 % pass) and `NewGrass.draw` emits it. `ReliefLayer` owns both.

`[SHOWN]` **The mark.** Every relief stroke in the draw record is identical in shape: `stroke, lineWidth 0.5, exactly 3 segments` (i.e. a 4-point polyline), round cap and join, in one of **two colours only**: `#687F64` and `#A0B78D` = palette `ground[1]` and `ground[2]`. 1008–10 714 marks per map.

`[SHOWN]` **Colour is chosen by terrain, not randomly.** Dark : light ratios per run: 1029:1008, 5614:5100, **1176:31**, 1753:1563. The coastal map (`draw/gen-2.png`, flat coastal plain) is almost entirely the *light* colour — so `verifySlope` selects the colour from the slope/aspect relative to the light.

`[SHOWN]` **The contour structure is directly visible** in `profile/gen-3.png` ("Lost Pit", `sparse`): nested closed loops covering the whole map, exactly like a topographic map. This is the single most distinctive visual signature of VG and it falls straight out of drawing hachure marks along iso-lines.

`[STATED]` `relief` is a palette-level mode: `Grass` (default, minimal), `Hachures` (sand, night), `Contours` (bw, cold). So the same level-walker drives three different mark styles — grass tufts, hachure ticks, or a plain contour line.

---

## 7. Rendering: palette, layer order, primitives

### 7.1 Palette schema `[STATED]` — the complete key list, with all six shipped values

| key | default | cold | night | sand | bw | minimal |
|---|---|---|---|---|---|---|
| `relief` | Grass | Contours | Hachures | Hachures | Contours | Grass |
| `roofType` | Gable | Gable | Hip | Flat | Flat | Gable |
| `treeShape` | Cotton | Conifer | Cotton | Palm | Conifer | Cotton |
| `ink` | #010206 | #475666 | #171B27 | #3F2636 | #000000 | #000000 |
| `pressure` | 0.7 | 1.0 | 0.8 | 0.9 | 1.0 | 1.0 |
| `ground[]` | #85A478,#687F64,#A0B78D | #F4F6F8,#C5D3E5,#FFFFFF | #3E546C,#344359,#587489 | #FFE69B,#E5A577,#FFF6CC | #FFFFFF | #FFFFFF,#DDDDDD |
| `road` | #C5BEAC | #C3C7CC | #63717F | #F2C88E | #FFFFFF | #FFFFFF |
| `sand` | #C5BEAC | #C1C5CB | #5E7080 | #F5C887 | #FFFFFF | #FFFFFF |
| `plank` | #BD9D86 | #999391 | #5F6C7F | #CBA57A | #000000 | #FFFFFF |
| `waterDeep` | #4C8699 | #ADC5D8 | #0E1119 | #78B9A1 | #AAAAAA | #FFFFFF |
| `waterShallow` | #5B99A6 | #D0DFE2 | #1D2133 | #ECFFC7 | #AAAAAA | #FFFFFF |
| `waterTide` | #A3C9CC | #D0DFE2 | #6B7B99 | #F2FFF2 | #AAAAAA | #CCCCCC |
| `shallowBands` | **3** | 2 | 5 | 10 | 0 | 0 |
| `tree[]` | #4F6B65,#5B7F6B | #EAF7FF,#DBEAF9 | #273344 | #7CA85A,#6D936E,#AFCC5B | #CCCCCC | #FFFFFF |
| `thicket` | #4F6B65 | #F9FDFF | #1E2533 | #7CA85A | #CCCCCC | #FFFFFF |
| `treeVariance` | 0.2 | 0.1 | 0.2 | 0.2 | 0.0 | 0.0 |
| `roofLight[]` | #BD9D86,#BD9D86,#95A5A5 | #FFFFFF | #546B8B | #FFF9BC,#F7E4AD | #000000 | #FFFFFF |
| `roofVariance` | 0.2 | 0.1 | 0.1 | 0.1 | 0.0 | 0.0 |
| `roofSlope` | 0.5 | 0.3 | 0.4 | 0.0 | 0.0 | 0.5 |
| `fieldLight[]` | #8C7A70,#7F716D | #CCCCCC | #364759 | #A2BF69,#D2E064 | #EEEEEE | #FFFFFF |
| `fieldVariance` | 0.2 | 0.25 | 0.1 | 0.1 | 0.0 | 0.0 |
| `detailRoof` | 1.0 | 0.0 | 0.6 | 0.8 | 0.0 | 0.4 |
| `detailField` | 0.6 | 0.4 | 0.8 | 0.4 | 0.0 | 0.6 |
| `detailTree` | 0.8 | 0.7 | 0.9 | 0.9 | 0.0 | 0.6 |
| `outlineRoads` | 0.2 | 0.0 | 0.3 | 0.0 | 1.0 | 1.0 |
| `outlineFields` | 0.3 | 0.2 | 0.0 | 0.0 | 1.0 | 0.0 |
| `strokeThin` | 0.5 | 0.6 | 0.5 | 0.5 | 0.6 | 0.5 |
| `strokeNormal` | 1.0 | 1.2 | 1.0 | 1.0 | 0.6 | 1.0 |
| `smallRoad` | 2.0 | 2.0 | 3.0 | 2.0 | 0.0 | 0.0 |
| `largeRoad` | 6.0 | 5.0 | 6.0 | 6.0 | 0.0 | 6.0 |
| `mergeRoads` | true | true | true | true | true | **false** |
| `shadowColor` | #9699AE | #8EA5CC | #545054 | #D8C5D6 | #FFFFFF | #FFFFFF |
| `shadowAngle` | 30 | 60 | 60 | 30 | 0 | 60 |
| `shadowLength` | 1.0 | 1.2 | 1.6 | 1.2 | 0.0 | 0.0 |
| `lights` | #000000 | #000000 | **#B29A23** | #000000 | #000000 | #000000 |
| `textColor` | #010206 | #475666 | #B2AB8E | #4C263F | #000000 | #000000 |
| `textOutline` | #C5BEAC | #F4F6F8 | #171B27 | #FFF9BC | #FFFFFF | #FFFFFF |
| `fontHeader` | 48 px | 48 | 48 | 48 | 48 `_typewriter` | 48 |
| `fontPopulation` / `fontNumber` | 24 px | 24 | 24 | 24 | 24 `_typewriter` | 24 |

Notes: `roofLight` is a **weighted list** — `village_default` has `[#BD9D86, #BD9D86, #95A5A5]`, i.e. a 1-in-3 chance of a **slate-blue roof**, which is exactly the minority of blue-roofed buildings visible in every screenshot. `lights: #B29A23` in the night palette means lit windows. `mergeRoads: false` in `minimal` disables `RoadsView.buildMerges`. Everything is stored as *strings* including numbers and booleans, and `Palette.getFloat/getInt/getBool/getColor/getMulti/getFont` parse them.

### 7.2 Layer order `[SHOWN]` — from the paint order of each cached layer

Reconstructed by grouping the draw log by the backing canvas (each display object flushes to its own cached bitmap). Bottom → top:

| # | layer | contents |
|---|---|---|
| 0 | offscreen 128 × 128 | shading bitmap: `fillRect #ffffff`, 16384 `setPixel32`, stack-blur, 2 × `drawImage` |
| 1 | `ReliefLayer` / `LevelsView` / `NewGrass` | 1008–10 714 × `stroke w0.5`, 3 segments, `ground[1]`/`ground[2]` |
| 2 | `RoadsView` | per road: `stroke #728D67 w(core+2)` casing, then `stroke road w(core)`; per building: a 6-segment apron blob (fill + stroke) in both colours; the square as a 44-gon `fill road` |
| 3 | `FarmlandView` | per field: `fill fieldLight'`, `stroke outline w1`, `stroke furrows w0.5` (124–666 segments, dashed) |
| 4 | water bank | per bank chain: `stroke rgba(sand,0.5) w16`, `stroke sand w8` |
| 5 | **mask** | `fill #ff0000` = the water polygon (313 segments) |
| 6 | `WaterView` | `fill waterDeep`, then `shallowBands` nested strokes, then bridge shadows `rgba(31,54,77,0.5) w8` |
| 7 | `BridgeView` + shore | `stroke ink-ish #3b3a39 w1` per chain, `stroke waterTide w1` (2N−3 segs), bridge decks + plank hatching |
| 8 | `ShadowLayer` | 453–1108 × `fill shadowColor #9699AE`, 153–189 segments each (tree crowns) + `drawPrism` for buildings |
| 9 | `BuildingView` / `GableRoof` | per building: 3 quad faces (fill + 0.5 stroke), 3 pairs of hatch lines, 8-segment footprint outline w1, 3-segment entrance mark |
| 10 | `ForestView` (one layer per forest patch) | per tree: `fill CanvasGradient` (153–189 segs), `stroke outline w1`, `stroke detail w0.5` (~120–160 segs) |
| 11 | `DramaticLight` | 1101 × 1101, two `CanvasGradient` fills |
| 12 | labels | `fillText` × 2 |

`[SHOWN]` Canvas2D verbs used, whole map: `lineTo` 250 k–515 k, `moveTo` 63 k–131 k, `beginPath` 6.7 k–17 k, `closePath` 6.1 k–16 k, `stroke` 4.3 k–14 k, `translate` 1.9 k–3.6 k, `fill` 0.9 k–1.8 k, `createLinearGradient` 0.7 k–1.5 k, `quadraticCurveTo` 0–52, `arc` 0–4, `fillText` 2. **No `bezierCurveTo` at all** — every curve is pre-tessellated into line segments before it reaches the canvas.
`[SHOWN]` `lineJoin` is `round` for **100 %** of strokes; `lineCap` is `round` for 99.8 % (`butt` 2–21 times, for the dashes).
`[SHOWN]` line widths used: `0.5` (3085–12 753), `1` (872–1469), `2`, `4`, `3`, `5`, `6`, `8`, `16`, plus the three computed water band widths. I.e. everything is `strokeThin`, `strokeNormal`, or a road/water width.

### 7.3 Primitive geometry `[SHOWN]`

**Tree crown.** Fill segment counts are always ≡ 1 (mod 4): observed 153, 161, 165, 169, 177, 181, 185, 189 → base polygons of **38–47 vertices**, ×4 (two Chaikin passes, each doubling) + 1 closing point. `TreeType.getCloudCrown` is called only 0–51 times per map against 546–751 trees, so **crowns are prototypes**: a few are built and then `PolyTransform.scale` / `translate` place instances (`GraphicsExtender.drawPolygonAt` = 1208–1509 ≈ 2 × trees, i.e. crown + shadow). Each tree draws exactly six ops: gradient fill, outline stroke w1, two empty strokes (style-change artefacts), a `detail` stroke w0.5 with ~85 % of the crown's segment count, and a 2-segment style-carrier stroke.

**Tree fill is a linear gradient.** `GradUtils.beginLinearFill` = 546–751 = one per tree, `createLinearGradient` 694–1496 — every crown is filled with a 2-stop linear gradient, giving the lit/shaded look. `GradUtils.beginRadialFill` = 2 (the `DramaticLight` overlay). `FillableRect.validate` (684–1072) is the helper that computes each gradient's bounding box.

**Tree shadow.** `ShadowLayer.drawPoly` (602–877) fills the *same* crown polygon (segment counts match the crown sequence exactly: 169, 165, 181, 177, 153 …) flat in `shadowColor`, offset by `shadowAngle`/`shadowLength`. No hull sweep — a plain translated copy. `ForestView.drawLongShadow` 539–742 and `drawSimpleShadow` 3–9 (two shadow modes).

**Building.** Per building, verbatim from the record:
```
fill   #ba9b85  5 segs     roof plane A  (roofLight + roofVariance jitter)
stroke #ba9b85  6 segs w0.5   (same colour, closes the plane)
stroke #39302c  5 segs w1     outline
fill   #73615e  5 segs     roof plane B (shaded)
stroke #73615e  6 segs w0.5
fill   #b99a84  5 segs     roof plane C
stroke #b99a84  6 segs w0.5
stroke #382f2b  5 segs w0.5 ┐
stroke #221d1f  5 segs w0.5 │ 3 hatch lines, each crossing the ridge so the
stroke #382f2b  5 segs w0.5 │ colour alternates between the lit and shaded plane
stroke #221d1f  5 segs w0.5 │
stroke #382f2b  5 segs w0.5 │
stroke #221d1f  5 segs w0.5 ┘
stroke #39302c  8 segs w1     footprint outline (rectangle + ridge)
stroke #39302c  3 segs w0.5   entrance mark
```
matching `BuildingView {draw 25–50, drawEntrance 25–47, shadedFace 87–179 (= 3 × buildings), hatchLine 130–282}` and `GableRoof.draw` = building count exactly. `roofSlope = 0.5` sets the ridge position.

**Field.** Per field: `fill fieldLight'` (37–111 segs), `stroke outline w1` (same segs), `stroke furrows w0.5` (124–666 segs). 8–15 fields per map.

**Road.** casing width = core + 2 (`smallRoad 2 → w4/w2`; `largeRoad 6 → w8/w6`), casing colour `#728D67` = `lerp(ground[0], ink, 0.14)`.

**Grass tuft.** 4 points, w0.5, round caps.

**Palisade post.** small circle, filled + outlined, repeated along the spline.

### 7.4 The colour formulas — recovered and verified `[INFERRED, verified to ±0.005]`

> `outlineColour = lerp(fillColour, ink, outlineFactor × pressure)`
> `detailColour  = lerp(fillColour, ink, detailFactor  × pressure)`
> where `outlineFactor` defaults to **1.0** and is overridden by `outlineRoads` / `outlineFields`.

With `village_default` (`ink #010206`, `pressure 0.7`):

| element | fill | recorded outline/detail | implied t | predicted t | ✔ |
|---|---|---|---|---|---|
| road casing | `ground[0] #85A478` | `#728D67` | 0.145 | `outlineRoads 0.2 × 0.7 = 0.14` | ✔ |
| field outline | `#8D7B71` | `#6F615A` | 0.212 | `outlineFields 0.3 × 0.7 = 0.21` | ✔ |
| field furrow | `#8D7B71` | `#524743` | 0.425 | `detailField 0.6 × 0.7 = 0.42` | ✔ |
| roof outline | `#BA9B85` | `#39302C` | 0.699 | `1.0 × 0.7 = 0.70` | ✔ |
| roof hatch (lit plane) | `#B99A84` | `#382F2B` | 0.700 | `detailRoof 1.0 × 0.7 = 0.70` | ✔ |
| roof hatch (shaded plane) | `#73615E` | `#221D1F` | 0.70 | same | ✔ |
| tree outline | `tree[1] #5B7F6B` | `#1B2524` | 0.711 | `1.0 × 0.7 = 0.70` | ✔ |
| tree detail | `#5B7F6B` | `#263630` | 0.586 | `detailTree 0.8 × 0.7 = 0.56` | ✔ (gradient fill, so base colour is approximate) |

`Style {getOutline 1355–1674, getDetail 960–1227, drawDetails 851–1158, outline 380–458, setPalette, restorePalette}` and `Color.hardLight` is called **exactly as often as `Style.getOutline`** (1674/1627/1361/1355 vs 1674/1627/1361/1355) — so the blend is implemented as a hard-light composite, which for a near-black `ink` is numerically indistinguishable from the lerp above. Also present: `Color.lerp` (3064–3781), `lerpf`, `lerpHSV`, `lerpHue`, `rgb2hsv`, `hsv`, `multiply`, `scale`, `brightness`, `rgbf`, `rgbfSafe`.

**Per-instance colour jitter** `[INFERRED]`: `roofVariance 0.2`, `fieldVariance 0.2`, `treeVariance 0.2` — observed roof fills `#BA9B85, #B99A84, #B1937E, #B2947F, #B3957F` around `roofLight #BD9D86`, i.e. ±~5 % multiplicative. `Color.multiply` (1005–1296) and `Color.scale` (606–792) are the mechanism; `Palette.weighted` / `ArrayExtender.weighted` (597–776, ≈ the tree count) pick the base colour from the list.

### 7.5 Labels `[SHOWN]`

Exactly two `fillText` calls per map:
```
"Godaton"   48px "Cinzel Bold"  #010206   on a 248×70 canvas
"Pop. 150"  24px "Cinzel Bold"  #010206   on a 102×38 canvas
```
Colour = `textColor`; the light halo around the title is `textOutline` applied as a filter (not `strokeText` — no stroke-text call appears). Population is rounded to the nearest 10 (§3.3).
**Title placement is content-aware** `[SHOWN]`: top-left (`draw/gen-0`, `draw/gen-2`, `coverage/gen-0/1/2/3`, `profile/gen-2/3`), top-right (`draw/gen-3`, `profile/gen-0`), **bottom-left** (`profile/gen-1` — the top of that map is full of forest and river). `VillageView.measureRect` (4–8 calls) and `layoutPlate` are the likely mechanism — measure the label box and place it in the emptiest corner.

---

## 8. What VG shares with MFCG / NG

Everything below `com.watabou.village.*` is shared substrate and should be treated as one library when comparing the generators:

* **`com.watabou.geom`** — `Delaunator` (Mapbox algorithm, 18 methods), `VoronoiPattern`, `PoissonPattern`, `DCEL` / `HalfEdge` / `Face` / `Vertex` / `EdgeChain`, `Chaikin`, `ConvexHull`, `Circle`, `Segment`, `Color` (13 methods incl. `hardLight`, `lerpHSV`, `rgb2hsv`), `GeomUtils {lerp, intersectLines}`, `FillableRect` / `FillablePoly`.
* **`com.watabou.geom.polygons`** — a mixin-style polygon toolkit: `PolyCore {area, center, centroid, perimeter, rectArea, simplify, tangent, $length}`, `PolyBounds {aabb, obb, circle, rect, convexHull, containsPoint, testShapeVsShape}`, `PolyBool {and, augmentPolygons}`, `PolyCut {cut, pierce}`, `PolyTransform {translate, scale, rotateYX, asTranslate, asScale, asRotateYX}`, `PolyCreate {rect, regular, stripe}`. **`PolyBounds.obb` built on `convexHull` is the same OBB-bisection primitive MFCG uses for wards** — here it subdivides farmland instead.
* **`com.watabou.utils`** — `Perlin`, `Noise {get, getMap, getRange, fractal}`, `Random`, `MathUtils {gate, gatei, pow}`, `ArrayExtender` (18 methods incl. `weighted`, `pick`, `shuffle`, `difference`, `subset`), `SetUtils`, `BinGrid` (spatial hash), `Palette` (20 methods — the palette loader/serialiser), `GradUtils`, `GraphicsExtender {drawPolygon, drawPolygonAt, drawPolyline, dashedPolyline, drawArc}`, `PointExtender`, `StringUtils`, `Updater`, `LongPresser`.
* **`com.watabou.tracery` + `com.watabou.nlp`** — the Tracery engine with the `TAG?-` / `p?-` extensions, `DeckRuleSelector`, `ModsEngBasic` (English morphology: `.possessive`, `.s`, `.capitalize`), `Markov`, `Syllables`.
* **`com.watabou.coogee`** — the Game/Scene/UI framework (`Game.switchScene`, `Scene.onKeyDown`, `ui.View`, `ui.elements.DropDownButton`, `msignal.Signal2` for events).
* **`com.watabou.system.URLState`** — the `?seed=…&tags=…` state round-trip, `history.replaceState`.
* **Engine**: Haxe → OpenFL/Lime, WebGL renderer with `cacheAsBitmap` layers rendered through `CanvasGraphics` into per-layer bitmaps, then composited. `openfl.filters.BlurFilter` → `lime StackBlur` for the shading.

**VG-only**: `com.watabou.village.model.*` (Region/Water/Elevation/Network/Tracker/Farmland/Forest/Palisade/…), `com.watabou.village.mapping.*` (the whole renderer), `com.watabou.village.utils.{Bisector, Bloater, BitMap, PolyUtils}`.

`com.watabou.village.utils.Bloater {bloat, extrude, extrudeEx}` — `extrude` and `extrudeEx` are called *exactly the same number of times* (38840 / 29539 / 17129 / 9733) from 6–165 `bloat` calls, i.e. **235–1622 extrusion steps per bloat**. `[INFERRED]` this is an iterative polygon inflation/relaxation (grow a polygon outward until it hits something), probably used for forest patches and the palisade. It is the second-hottest `com.watabou.village.*` code after the water level-set.

---

## 9. `[INFERRED]` hypotheses, each with a discriminating test

| # | hypothesis | test |
|---|---|---|
| H1 | Water body = threshold of a deflected distance field, contour-extracted by `linkSegments` (marching-squares-like) | zoom a `pond` map; look for axis-aligned staircase micro-artefacts on the bank vs pure smooth curvature |
| H2 | `createDeflection` is a grid-sized loop (its 50–73 ms self time with zero children implies ~10⁶ ops) | compare `Water` cost between a small pond and a map-spanning river; grid-based cost is constant, curve-based scales with length |
| H3 | Roads are agent walkers with per-step steering (`flexibility`→`findRoadAhead`→`avoidWater`→`advance`) | count `advance` vs total road length across seeds; a constant ratio confirms fixed-length steps |
| H4 | Buildings are rejection-sampled along road frontages with a `BinGrid` neighbour test | acceptance rate should fall as density rises — observed 82 % (41 bldgs) vs 63 % (50 bldgs) ✔ already weakly confirmed |
| H5 | Fields = Voronoi ∩ land, then recursive OBB bisection to a minimum area | `getMinArea` calls (71–120) should be ≈ 2× `cut` calls + leaves; observed 71 vs 27, 98 vs 18, 120 vs 28 — consistent with a binary recursion tree |
| H6 | Water bands are strokes of the boundary clipped by a mask | render a map with `shallowBands = 10` (`village_sand`) and count distinct depth steps; should be 10 with widths ∝ k^1.5 |
| H7 | Tree crowns are a small set of prototypes scaled/translated per instance | check whether two trees of the same size in one map are pixel-identical up to translation |
| H8 | The retry loop discards the whole `Region`, not just the highway | a failed seed should produce a *completely* different map from the successful one, not a repaired version — confirmed by the distinct seeds in the URL |
| H9 | `trees` is an independent RNG stream for vegetation only | hold `seed`, vary `trees`; only the forest should move |
| H10 | Relief colour is picked from slope aspect vs the light direction | on a flat coastal map the dark colour should nearly vanish — observed 1176 light : 31 dark ✔ |

---

## 10. UNKNOWNS a re-implementer must decide

1. **`Water.createDeflection`'s actual algorithm.** The single hottest routine and the one with the least evidence: 1 call, 50–73 ms self, no children, no distinctive call signature. Everything about its shape (grid vs curve, noise vs relaxation, number of iterations) is unrecovered.
2. **How `setLevel` differs for `river` vs `pond` vs `coast`.** All three go through `setLevel`, but `Water.river` and `Water.pond` are distinct entry points and the pond path spends its time differently (86.5 ms in `setLevel` self vs 6.3 ms with 73.3 ms in `createDeflection`).
3. **Where the base ground colour `ground[0] #85A478` is painted.** No path fill of that colour appears in the draw record; it is probably the stage background or a `Bitmap` (`MapPlate`). The whole light/dark modulation on top of it comes from the shading bitmap + `DramaticLight`, but the exact composite/blend mode is not recoverable from a Canvas2D trace of the *sources*.
4. **Why the three water-band strokes have different segment counts (147/219/439 for one map)** when they nominally follow the same boundary. Candidates: per-band resampling with spacing ∝ width; per-band inward offsetting (which changes vertex count); or per-chain splitting. This matters for exact visual fidelity on complex shorelines.
5. **`Tracker.flexibility`'s actual curve** — how turn freedom varies with road rank, distance from the heart, and terrain.
6. **`Region.createDensity`** — a density field is built (1 call) and clearly drives where buildings go, but nothing in the trace reveals its form (noise? distance-to-heart? distance-to-road?).
7. **The `Params.resolve` tag dependency/exclusion table.**
8. **Population model** — pop/building 3.6–6.9, but whether that is per-building household draws, a per-settlement multiplier, or a function of building size is unrecovered.
9. **`Bloater`'s step rule** — 235–1622 extrusion steps per bloat, but the stopping condition and step size are unknown.
10. **Building type assignment** — which building becomes the tavern/smithy/temple, and the tower/slate-roof selection rule (the palette says 1-in-3 slate, but whether that is independent per building or correlated with building type is untested).
11. **`GridLayer` / `NumbersLayer` / `MapPlate`** — constructed and updated every run but painted nothing; they are UI/export affordances whose behaviour is unrecorded.
12. **`relief: Hachures` and `relief: Contours` mark geometry** — the default palette only exercises `Grass`. The level-walking machinery is shared, but the marks themselves were never drawn in this capture.
13. **The exact size thresholds** for `roadhouse` / `hamlet` / `village` and the `riverside` / `coastal` qualifier rules.

---

## Appendix A — full `com.watabou.*` call counts

Columns are coverage runs gen-0 / gen-1 / gen-2 / gen-3, i.e. seeds
`107406699 (river,no square,highway)` · `1781041559 (dead end)` · `176877720 (no square,palisade,isolated)` · `1202977223 (river,isolated)`.
Generated from `coverage/gen-N.calls.json`.

```
### com.watabou.coogee.Game
   (anon@56569)                              1         0         0         0
   getScale                                  2         0         0         0
   layout                                    2         0         0         0
   mobile                                    1         0         0         0
   new                                       1         0         0         0
   prepareStage                              1         0         0         0
   switchScene                               1         0         0         0
   switchSceneImp                            1         0         0         0
### com.watabou.coogee.Scene
   __hitTest                                 0         1         1         1
   activate                                  1         0         0         0
   new                                       1         0         0         0
   onKeyDown                                 0         1         1         1
   onKeyUp                                   0         1         1         1
   onUpdate                                 75        77        76        77
   setSize                                   2         0         0         0
### com.watabou.coogee.ui.UI
   hideMenu                                  1         0         0         0
   wipe                                      1         0         0         0
### com.watabou.coogee.ui.UIStyle
   useDefault                                1         0         0         0
### com.watabou.coogee.ui.View
   layout                                    2         0         0         0
   new                                       8         7         6         6
   setSize                                   4         1         1         1
### com.watabou.coogee.ui.elements.DropDownButton
   new                                       2         2         2         2
### com.watabou.coogee.ui.utils.Text
   get                                       2         2         2         2
### com.watabou.geom.Chaikin
   render                                  215       211       205       163
### com.watabou.geom.Circle
   new                                      21        30        43        27
### com.watabou.geom.Color
   brightness                                2         2         2         2
   d                                         9         0         0         9
   hardLight                              1674      1627      1361      1355
   hsv                                       3         0         0         3
   lerp                                   3781      3696      3091      3064
   lerpHSV                                   3         0         0         3
   lerpHue                                   3         0         0         3
   lerpf                                   514       483       409       406
   multiply                               1296      1221      1005      1033
   rgb2hsv                                   6         0         0         6
   rgbf                                   1296      1221      1005      1033
   rgbfSafe                               2983      2860      2376      2399
   scale                                   792       750       606       635
### com.watabou.geom.ConvexHull
   (anon@162117)                             0         0        91         0
   ofPoly                                    0         0         1         0
   ofSet                                     0         0         1         0
### com.watabou.geom.DCEL
   (anon@163807)                          1969      3445      2078      1898
   addVertex                             23155     35454     11413     11586
   circumference                            48        24        36        23
   floodFill                                53        33        46        33
   new                                       2         3         1         1
   outline                                  40        22        35        20
   shrink                                    7         6         7         4
   shrinkExcl                               41        21        32        27
   split                                    45        25        37        29
### com.watabou.geom.Delaunator
   (anon@169141)                          6656     10118      3287      3330
   addTriangle                            1827      2744       917       932
   circumcenter                              3         4         2         2
   circumradius2                           934      1403       469       477
   dist                                   1877      2818       944       960
   edgesAroundPoint                        940      1411       473       481
   getVoronoi                                3         4         2         2
   hashKey                                1871      2810       940       956
   inCircle                               6037      8923      2997      3003
   legalize                               1824      2740       915       930
   link                                  11802     17508      5874      5907
   new                                       3         4         2         2
   orient                                 3742      5650      1880      1934
   orientIfSure                           3759      5674      1888      1942
   pseudoAngle                            1871      2810       940       956
   triCircumcenter                        1827      2744       917       932
   triangleCenter                         1827      2744       917       932
   update                                    3         4         2         2
### com.watabou.geom.EdgeChain
   toPoly                                   96        48        72        46
### com.watabou.geom.Face
   getNeighbours                           730       657       536       584
   new                                    3856      5910      1897      1928
### com.watabou.geom.FillablePoly
   getBounds                                 2         1         1         2
   new                                       2         1         1         2
   validate                                 96        76        21       164
   validateRect                              5         4         1         8
### com.watabou.geom.FillableRect
   getBounds                                 1         1         2         1
   new                                       1         1         2         1
   validate                                756       720      1072       684
   validateRect                             36        36        40        36
### com.watabou.geom.GeomUtils
   intersectLines                        34836     26881     29059     52390
   lerp                                 702339     22994     17838    605154
### com.watabou.geom.HalfEdge
   new                                   23155     35454     11413     11586
### com.watabou.geom.PoissonPattern
   emit                                    161       193       171       110
   fill                                      3         2         3         3
   new                                       5         5         4         4
   rect                                      0         0         1         0
   step                                    250       298       261       163
   uneven                                    2         3         1         1
   validate                              12500     14900     13050      8150
   warp                                  12601     15054     13100      8200
### com.watabou.geom.Segment
   new                                       0         0         0         1
### com.watabou.geom.Vertex
   new                                    8054     12298      3992      4054
### com.watabou.geom.VoronoiPattern
   getRect                                   2         3         1         1
   new                                       2         3         1         1
   poisson                                   2         3         1         1
### com.watabou.geom.polygons.PolyBool
   (anon@180263)                             5         1         0         9
   (anon@180424)                            11         4         0         3
   and                                      92        32        28        45
   augmentPolygons                          92        32        28        45
### com.watabou.geom.polygons.PolyBounds
   aabb                                      0         1         0         0
   circle                                    1         1         1         1
   containsPoint                         24891     30364     22919     13186
   convexHull                               71        94       104        79
   obb                                      71        94       104        79
   rect                                     42        42        36        31
   testShapeVsShape                          0         5         0        15
### com.watabou.geom.polygons.PolyCore
   $length                                   2         1         0         1
   area                                    327       367       525       321
   center                                 3951      6034      2029      2013
   centroid                                 82       110       129        86
   perimeter                                 0         1         1         1
   rectArea                                  6         5         3         3
   simplify                                 24        19         0         0
   tangent                                   0         1         0         0
### com.watabou.geom.polygons.PolyCreate
   rect                                      1         2         3         2
   regular                                   3         6         3         4
   stripe                                    0         3         1         2
### com.watabou.geom.polygons.PolyCut
   (anon@186298)                           190       213       202       146
   (anon@186718)                             1         1         0         0
   cut                                       1         1         0         0
   pierce                                  190       213       199       142
### com.watabou.geom.polygons.PolyTransform
   (anon@188503)                           163         0         0         0
   asRotateYX                              122       110       115        81
   asScale                                  51        15         7         1
   asTranslate                             104        34        20         6
   rotateYX                                 51        16         7         0
   scale                                   102        28        15         0
   translate                              1502      1394      1092      1204
### com.watabou.nlp.Markov
   generate                                  0         0         1         0
   new                                       3         0         0         0
   split                                   418         0         0         0
### com.watabou.nlp.Syllables
   (anon@189802)                             0         0       229        72
   pinch                                     0         0        10         3
   splitWord                                 0         0         3         1
### com.watabou.system.State
   get                                      14         2         2         2
   init                                     14         2         2         2
### com.watabou.system.URLState
   get                                       1         0         0         0
   getFlag                                   1         0         0         0
   getInt                                    2         0         0         0
   getParams                                 3         3         3         3
   init                                      5         2         2         2
   reset                                     1         1         1         1
   set                                       2         2         2         2
   update                                    3         3         3         3
### com.watabou.tracery.DeckRuleSelector
   clearState                                8        11        19        20
   new                                       8         3         8         1
   select                                    8         7        11        13
### com.watabou.tracery.ExtSymbol
   new                                       3         0         0         0
   selectRule                                1         2         2         1
### com.watabou.tracery.Grammar
   addAutoRules                             35         0         0         0
   addExternal                               3         0         0         0
   addModifiers                              1         0         0         0
   clearState                                0         1         1         1
   createRoot                                3         3         3         3
   eval                                      0         0         1         2
   expand                                    3         3         3         3
   flatten                                   3         3         3         3
   loadFromRawObj                            1         0         0         0
   new                                       1         0         0         0
   pushRules                                35         0         0         0
   selectRule                                9         9        12        13
   unwrap                                   69         0         0         0
   validateRule                              8         7        11        13
### com.watabou.tracery.ModsEngBasic
   get                                       1         0         0         0
   possessive                                1         1         1         1
### com.watabou.tracery.RuleSelector
   new                                       8         3         8         1
### com.watabou.tracery.RuleSet
   clearState                              107       107       107       107
   new                                     107         0         0         0
   process                                 699         0         0         0
   selectRule                                8         7        10        12
### com.watabou.tracery.Symbol
   clearState                              107       107       107       107
   new                                     107         0         0         0
   selectRule                                8         7        10        12
   top                                       8         7        10        12
### com.watabou.tracery.Tracery
   l                                        25        27        32        34
   parse                                    21        21        27        29
   parseTag                                  9         9        12        13
### com.watabou.tracery.TraceryNode
   clearEscapeChars                          3         3         3         3
   expand                                   19        21        23        24
   expandChildren                           12        12        15        16
   new                                      19        21        23        24
### com.watabou.utils.ArrayExtender
   add                                    7365     12244      7239      6937
   addAll                                 6932      8805      6969      5755
   difference                               41        21        32        27
   every                                    47        19        24        41
   intersect                                 2         2         2         2
   intersects                                3         3         3         3
   isEmpty                                  88        46        71        43
   max                                     203       188       336       148
   min                                       2         2         1         1
   pick                                    108        44       367        98
   random                                  253       303       274       166
   removeAll                               222        82       130       228
   revert                                   29        48        69        37
   shuffle                                   3         4         2         3
   some                                      1         0         0         0
   subset                                    1         1         1         1
   sum                                     776       713       597       619
   weighted                                776       713       597       619
### com.watabou.utils.BinGrid
   add                                      33        47        61        31
   get                                    2370      3174      2417      2000
   new                                       2         2         2         2
   remove                                    0         0         0         1
### com.watabou.utils.GradUtils
   beginGradientFill                       753       699       548       604
   beginLinearFill                         751       697       546       602
   beginRadialFill                           2         2         2         2
   gradient                                753       699       548       604
   linearGrad                              751       697       546       602
   radialGrad                                2         2         2         2
### com.watabou.utils.GraphicsExtender
   dashedPolyline                          180       203       197       141
   drawArc                                   0         8         6         9
   drawPolygon                             248       388       451       271
   drawPolygonAt                          1509      1400      1433      1208
   drawPolyline                             56        47        63        43
### com.watabou.utils.LongPresser
   new                                       1         0         0         0
### com.watabou.utils.MathUtils
   gate                                 713470     41348     40811    629798
   gatei                                  9612     12884      9912      8128
   pow                                      29         0         0        30
### com.watabou.utils.Noise
   fractal                                   2         2         2         2
   get                                   21022     21487     21577     21286
   getMap                                    1         1         1         1
   getRange                                  1         0         1         1
   new                                       2         2         2         2
### com.watabou.utils.Palette
   font2format                               3         0         0         0
   fromAsset                                 1         0         0         0
   fromData                                  1         0         0         0
   fromJSON                                  1         0         0         0
   getBool                                   1         0         0         0
   getColor                                 12         0         0         0
   getFloat                                 15         0         0         0
   getFont                                   3         0         0         0
   getInt                                    2         0         0         0
   getMulti                                  4         0         0         0
   getString                                 3         0         0         0
   new                                       1         0         0         0
   setBool                                   1         0         0         0
   setColor                                 12         0         0         0
   setFloat                                 15         0         0         0
   setFont                                   3         0         0         0
   setInt                                    2         0         0         0
   setMulti                                  4         0         0         0
   setString                                 3         0         0         0
   weighted                                775       713       597       618
### com.watabou.utils.Perlin
   get                                  109748    112538    113078    111332
   new                                      11        11        11        11
### com.watabou.utils.PointExtender
   project                                  22        41        46        28
   set                                       0         0         1         1
### com.watabou.utils.Random
   float                                  2254      2461      2109      1803
   reset                                     7         6         6         6
### com.watabou.utils.SetUtils
   fromArray                               182        99       148       104
   isEmpty                                  99        59        84        63
   pick                                     28        10        21        14
   removeArr                                53        33        46        33
### com.watabou.utils.StringUtils
   capitalize                                7        10         7         6
   capitalizeAll                             3         3         3         3
### com.watabou.utils.Updater
   fire                                     75        77        76        77
   get_tick                                  1         0         0         0
   useEnterFrame                             1         0         0         0
### com.watabou.utils._Updater.FrameEventDispatcher
   new                                       1         0         0         0
   onEnterFrame                             75        77        76        77
### com.watabou.village.Main
   layout                                    2         0         0         0
   new                                       1         0         0         0
   switchSceneImp                            1         0         0         0
### com.watabou.village.Names
   init                                      1         2         2         1
   personFirst                               1         2         1         1
   word                                      0         0         1         0
### com.watabou.village.VillageGrammar
   fix                                       0         0         1         1
   get                                       3         3         3         3
   init                                      1         1         1         1
   proper                                    1         2         1         1
   shrink                                    0         0         2         1
   syll                                      0         0         1         0
   village                                   1         1         1         1
### com.watabou.village.mapping.BridgeView
   draw                                      1         0         0         2
   drawPlanks                                1         0         0         2
   drawShadow                                1         0         0         2
   plankWidth                                1         0         0         2
### com.watabou.village.mapping.BuildingView
   draw                                     29        41        50        25
   drawEntrance                             29        41        47        25
   hatchLine                               130       244       282       146
   shadedFace                               87       173       179       125
### com.watabou.village.mapping.DramaticLight
   (anon@235747)                             4         4         4         4
   calcLight                                 2         2         2         2
   new                                       1         1         1         1
   update                                    1         1         1         1
### com.watabou.village.mapping.FarmlandView
   drawField                                10        10         8         6
   drawFurrow                              179       201       194       139
   drawOrchard                               6         5         3         3
   getOrchardTrees                           6         5         3         3
   getPattern                              179       201       194       139
   getPoisson                                2         1         1         2
   getRows                                   4         4         2         1
   validateTree                             41        55        16        24
### com.watabou.village.mapping.ForestView
   drawLongShadow                          742       693       539       599
   drawSimpleShadow                          9         4         7         3
   drawTree                                751       697       546       602
   new                                       1         1         1         1
   updateCache                               1         0         0         0
### com.watabou.village.mapping.GridLayer
   new                                       1         1         1         1
   update                                    1         1         1         1
### com.watabou.village.mapping.LevelsView
   init                                    114        79        92       103
   makeStep                               7272      7478     10957      6672
   new                                       1         1         1         1
   update                                 7386      7557     11049      6775
### com.watabou.village.mapping.MapPlate
   new                                       1         1         1         1
   update                                    1         1         1         1
### com.watabou.village.mapping.NewGrass
   draw                                   7186      7408     10875      6588
   init                                    114        79        92       103
   new                                       1         1         1         1
   verifySlope                            7335      7515     11003      6734
### com.watabou.village.mapping.NumbersLayer
   new                                       1         1         1         1
   update                                    1         1         1         1
### com.watabou.village.mapping.PalisadeView
   draw                                      0         0         1         0
   drawPassageShadow                         0         0         3         0
### com.watabou.village.mapping.ReliefLayer
   new                                       1         1         1         1
### com.watabou.village.mapping.RoadsView
   addMerge                                  4         4        14         4
   buildDriveways                            1         1         1         1
   buildMerges                               1         1         1         1
   draw                                      1         1         1         1
   drawPatches                               2         2         2         2
   drawThick                                 1         1         1         1
### com.watabou.village.mapping.Shading
   new                                       1         1         1         1
   update                                    1         1         1         1
### com.watabou.village.mapping.ShadowLayer
   drawLightPoly                             0         0         3         0
   drawPoly                                751       697       877       602
   drawPolyPoly                              1         1         1         1
   drawPrism                                29        41        50        25
   new                                       1         1         1         1
### com.watabou.village.mapping.Style
   drawDetails                            1158      1074       851       916
   getDetail                              1227      1167       960       973
   getOutline                             1674      1627      1361      1355
   outline                                 446       458       399       380
   restorePalette                            1         0         0         0
   setPalette                                1         0         0         0
### com.watabou.village.mapping.TreeType
   drawShaded1                            1514      1406      1106      1210
   getCloudCrown                            51        14         7         0
   new                                       3         0         0         0
### com.watabou.village.mapping.VillageView
   (anon@243919)                             8         4         4         4
   drawBuildings                             1         1         1         1
   drawFields                                1         1         1         1
   drawRoads                                 1         1         1         1
   drawWater                                 1         1         1         1
   layout                                    2         1         1         1
   layoutPlate                               2         1         1         1
   measureRect                               8         4         4         4
   new                                       1         1         1         1
   restoreState                              1         0         0         0
### com.watabou.village.mapping.WaterView
   (anon@306247)                             3         0         0         2
   (anon@306266)                             6         0         0         4
   draw                                      1         0         0         1
### com.watabou.village.mapping.buildings.GableRoof
   draw                                     29        41        50        25
   drawTower                                 0         2         1         2
### com.watabou.village.model.Blueprint
   fromURL                                   1         0         0         0
   is                                       92        91        75        63
   new                                       1         1         1         1
   random                                    1         1         1         1
   updateURL                                 1         1         1         1
### com.watabou.village.model.Bridge
   get_center                                1         0         0         2
   get_vector                                1         0         0         2
   new                                       1         0         0         2
### com.watabou.village.model.Building
   at                                       38        49        76        36
   new                                      38        50        79        37
   testVsRoad                               48        56       105        40
### com.watabou.village.model.Elevation
   (anon@338001)                            47        19        14        38
   (anon@338022)                           398        64         0       196
   createCrack                               0         1         0         0
   createGradient                            1         1         1         1
   createRidge                               0         1         0         0
   digRiver                                  1         0         0         1
   dist2poly                             16384         0         0     16384
   dist2segment2                        671744         0         0    589824
   g                                         5         2         1         3
   new                                       1         1         1         1
   updateMinMax                              1         0         1         1
### com.watabou.village.model.Farmland
   (anon@341827)                            41        48        43        39
   area                                     59        64        66        57
   buildRegions                              1         1         1         1
   centroid                                 73        84        90        64
   cut                                      27        18        28        23
   filterLots                                1         1         1         1
   fixTrails                                 1         1         1         1
   getArc                                   20        29        42        26
   getCircle                                20        29        42        26
   getFields                                 2         2         2         2
   getLandSegments                           1         1         1         1
   getMinArea                               71        98       120        79
   getVoronoi                                1         1         1         1
   intersect                                 1         1         0         1
   new                                       1         1         1         1
   obb                                      69        73        71        61
   pickLots                                  1         1         1         1
   reroll                                    1         1         1         1
   semiSmooth                               21        30        44        27
### com.watabou.village.model.Forest
   (anon@349301)                          1380      1633      1201      1199
   H                                         2         2         4         3
   createPatches                             1         1         1         1
   getPatches                                1         1         1         1
   new                                       1         1         1         1
   roll                                      1         1         1         1
### com.watabou.village.model.Gate
   new                                       0         0         3         0
### com.watabou.village.model.Junction
   new                                       3         5         4         5
### com.watabou.village.model.Legend
   new                                       1         1         1         1
   village                                   1         1         1         1
### com.watabou.village.model.Network
   (anon@355415)                           520       300         0         0
   (anon@358426)                            70       111       334       145
   (anon@358445)                           280       444      1336       580
   (anon@360089)                             2         4        13         2
   avoidWater                              200       186       334       145
   build                                     1         1         1         1
   createSquare                              2         1         1         1
   findRoadAhead                           200       186       335       146
   getTrackers                              38        48        62        34
   getTrackersAround                       996      1326       976       870
   new                                       1         1         1         1
   registerTrackers                          3         5         6         4
   spawnIsolated                             1         1         1         1
   spawnWharf                                1         1         1         1
   validateJunctions                        93       145       237       110
   validateLanding                           1         0         0         4
### com.watabou.village.model.Note
   new                                       2         2         2         2
### com.watabou.village.model.Palisade
   addGate                                   0         0         3         0
   blocks                                    0         0       337         0
   c                                         0         0         3         0
   clean                                     0         0         1         0
   contains                                  0         0         1         0
   cubic                                     0         0        32         0
   finalize                                  0         0         1         0
   getBuildings                              0         0         1         0
   getClosestSeg                             0         0        20         0
   getPopulated                              0         0         1         0
   new                                       0         0         1         0
   overlaps                                  0         0      1463         0
   poly2smooth                               0         0         1         0
   validateGate                              0         0         5         0
### com.watabou.village.model.Params
   randomTags                                1         1         1         1
   resolve                                   1         1         1         1
### com.watabou.village.model.Region
   (anon@387470)                            29        41        50        25
   addBuilding                              29        41        50        26
   buildAlong                                7         7        16         6
   buildNetwork                              1         1         1         1
   buildPiers                                1         0         0         1
   buildWharf                                1         0         0         1
   createDensity                             1         1         1         1
   createElevation                           1         1         1         1
   createWater                               1         1         1         1
   getBuildings                             78        89       110        63
   getBuildingsAround                     1258      1711      1269      1033
   getHeart                                  1         1         1         1
   getPopulated                              0         1         1         1
   initHighway                               1         1         0         0
   new                                       1         1         1         1
   placeBuildings                            1         1         1         1
   randomEdge                                1         1         0         0
   removeBuilding                            0         0         0         1
   roll                                      1         1         1         1
   rollForest                                1         1         1         1
   rollName                                  1         1         1         1
   rollPopulation                            1         1         1         1
   spawnAt                                   0         0         0         1
   spawnFields                               1         1         1         1
   updateTags                                1         1         1         1
   validateBuilding                         38        49        76        35
### com.watabou.village.model.River
   calculateCurvature                        1         0         0         1
   new                                       1         0         0         1
### com.watabou.village.model.SquareBuilder
   (anon@388412)                             0        77         0         0
   addCenterpiece                            0         1         0         1
   build                                     0         1         0         1
   place                                     0         1         0         1
### com.watabou.village.model.Tags
   new                                       1         1         1         1
### com.watabou.village.model.Tracker
   advance                                 211       189       340       164
   branch                                    0         0         2         0
   branchFrom                                2         0         2         0
   endBridge                               200       186       337       146
   flexibility                             200       186       334       145
   new                                       4         6        11         5
   prev                                      2         0         0         4
   shortcut                                  0         0         1         1
   startBridge                               1         0         0         2
### com.watabou.village.model.Water
   (anon@399654)                             3         0         0         2
   buildCurves                               1         0         0         1
   createDeflection                          1         0         0         1
   createPatches                             2         0         0         2
   findDockable                              1         0         0         1
   getGrid                                   1         0         0         1
   getLand                                   1         0         0         1
   getWharf                                  1         0         0         1
   linkSegments                              1         0         0         1
   new                                       1         0         0         1
   river                                     1         0         0         1
   setLevel                                  1         0         0         1
### com.watabou.village.model.props.Tower
   draw                                      0         1         0         1
   new                                       0         1         0         1
### com.watabou.village.scenes.VillageScene
   activate                                  1         0         0         0
   createVillage                             1         1         1         1
   layout                                    3         1         1         1
   new                                       1         0         0         0
   newVillage                                0         1         1         1
   onKey                                     0         2         2         2
   recreateView                              1         1         1         1
   restoreVillage                            1         0         0         0
### com.watabou.village.utils.Bisector
   makeCut                                  22        41        46        28
   new                                      27        18        28        23
   partition                                27        18        28        23
   split                                    22        41        46        28
   subdivide                                71        98       120        79
### com.watabou.village.utils.BitMap
   check                                     0         0      1463         0
   new                                       0         0         1         0
### com.watabou.village.utils.Bloater
   (anon@242289)                             1         1         1         1
   bloat                                   165        54        35         6
   extrude                               38840     29539     17129      9733
   extrudeEx                             38840     29539     17129      9733
### com.watabou.village.utils.PolyUtils
   getSegment                              121       101       154        72
   offsetOpen                                3         0         0         2
   resample                                 42        24        26        26
   resampleClosed                           13        10         9         9
   simpleInset                              49        58        76        51
   simplify                                  1         1         0         0
   smoothOpen                                3         0         0         2
   testShapeVsCurve                          1         3         5         2
   testShapeVsShape                         47        97        72        64
   warpClosed                               10        10         8         6
   warpOpen                                  6         0         0         4
```

---

## Critic addendum (2026-09-21) — the true stage chronology, from CPU-profile sample timestamps

**What was wrong.** §4.0 orders the stages from the *call-tree listing* in `report.md` and then, in its closing
note, infers "water → (forest/fields/network) → elevation … elevation is finalised late". A call tree in a CPU
profile is an aggregation (children are listed by cost, not by time), so it cannot give order. The
`.cpuprofile` files themselves can: each carries `samples[]` + `timeDeltas[]`, so the first and last sample
under any function are recoverable. Method: for every sample, walk the node's ancestor chain and record the
first/last timestamp at which each stage function is on the stack. Files:
`captures/village/2026-09-21T05-04-05/profile/gen-{0,1,2,3}.cpuprofile`. (Recorded behaviour only; no
JavaScript read.)

**Result `[SHOWN]` — identical order in all four profiles** (ms from the first stage sample; `first .. last`):

| stage (parent chain) | gen-0 | gen-1 | gen-3 (no water) |
|---|---|---|---|
| `createElevation` (← `Region.new`) | 0.0 .. 12.7 | 0.0 .. 15.4 | 0.0 .. 3.0 |
| &nbsp;&nbsp;`digRiver` → `dist2poly` / `dist2segment2` (inside `createElevation`) | — | 3.5 .. 13.4 | — |
| `createWater` (← `Region.new`) → `river` | 12.8 .. 98.0 | 15.6 .. 68.9 | — |
| `createDensity` (← `Region.new`) | 98.2 .. 99.8 | 69.0 .. 69.9 | 3.6 .. 4.2 |
| `buildNetwork` (← **`Region.roll`**) incl. `createSquare`, `spawnWharf → buildWharf` | 100.1 .. 105.4 | 69.9 .. 70.9 | 4.3 .. 4.6 |
| `placeBuildings` (← `Region.roll`) | 105.9 .. 107.4 | 71.1 .. 71.4 | 4.8 |
| `spawnFields` (← `Region.roll`) | 107.6 .. 117.7 | 71.5 .. 78.6 | 4.9 .. 6.3 |
| `rollForest` (← `Region.roll`) | 117.8 .. 139.8 | 78.8 .. 99.5 | 6.5 .. 12.9 |
| `rollName` (← `Region.roll`) | 141.4 .. 146.6 | — | — |

(gen-2 shows `createElevation` and `createDensity` each appearing twice, interleaved with `createWater` — that is
the validation-failure retry of §3.2 running the whole sequence a second time; within each attempt the order is
the same.)

**Corrected canonical order:**

```
Region.new:   createElevation (Perlin field + gradient; digRiver carves along the river course)
           →  createWater     (the expensive water-geometry stage, 53–85 ms)
           →  createDensity
Region.roll:  buildNetwork (trackers, junctions, square, wharf)
           →  placeBuildings
           →  spawnFields
           →  rollForest
           →  rollName / rollPopulation
```

Three things this changes relative to §4.0:

1. **Elevation is first, not last.** This agrees with the creator's launch description ("First, a height map is
   created, from which a gradient vector field is derived. Then a set of 'trackers' are run…", post 35854256,
   `vg-posts-a.md` §3.1) and with 1.5.4's "roads … preferring isohypses" (post 104226049, `vg-posts-b.md` §2.22):
   the trackers *must* have the gradient before they run.
2. **`digRiver` runs inside `createElevation`, before the `createWater` stage.** So the river *course* already
   exists when relief is built (the relief is carved to the river — "relief follows rivers", post 89314043 /
   `vg-posts-b.md` §2.4), and `createWater` afterwards builds the water *polygons* (banks, widths, smoothing,
   booleans — the 50–85 ms). `[SHOWN]` for the order; where the course polyline is produced ahead of `digRiver`
   is `[UNKNOWN]` (it costs too little to be sampled). A re-implementer should therefore split "river" into
   *centreline* (early, cheap) and *water body geometry* (after relief).
3. **Buildings are placed before fields, and fields before forest** — §4.0 lists forest and fields (2f) ahead of
   `placeBuildings` (2g). The recorded order is network → buildings → fields → forest, which is the dependency
   order the creator's prose implies: fields are discarded/truncated against houses and trails
   (`vg-posts-a.md` §3.10), and trees are grown "away from houses and busy roads" (post 88749133), so both need
   the buildings to exist first. `Farmland.reroll` being called from `Forest.roll` (§4.7) is then the forest stage
   asking farmland to give ground, not the other way round.

Also note `buildNetwork` is a child of `Region.roll`, not a sibling that precedes it.

**Cross-file note on §4.7 (fields).** `vg-posts-b.md` §2.11 infers field groups are "an annular sector around the
settlement, then subdivided". The recorded call set (`Farmland.getVoronoi → intersect (PolyBool.and) → cut →
Bisector.partition`, with `semiSmooth`/`getArc`/`getCircle` for the curved edges) supports a different
construction: **Voronoi regions clipped to the available land, each recursively OBB-bisected into lots, corners
rounded with arcs**. Voronoi cells of seeds ringed round the settlement heart *look* like "sectors centred on the
village" (the creator's words), which reconciles the two. Prefer the recorded construction.

**Cross-file note on roads.** `vg-posts-b.md` §2.22 infers the isohypse preference is "a least-cost path
(A*/Dijkstra) over the height field". No graph-search class executes in any VG recording (no `Graph`, `Topology`
or `aStar` in §2's class inventory; roads are `Tracker.advance` loops). The slope preference must therefore live
in the tracker's per-step steering (`Tracker.flexibility` + the `Elevation` gradient sampler), not in a path
search.

---

## River-course addendum (2026-09-25) — captures/village/2026-09-21T11-25-55

**Scope.** Closes (or narrows) `_critic.md` §6 item 3 / row C8: *what produces the river course before
`createWater`, and in what order*. Source recording: `captures/village/2026-09-21T11-25-55/` — passes `profile`
(CPU sampling interval **20 µs**, five times finer than the 100 µs base captures) and `coverage`. **There is no
draw pass in this capture**, so nothing below comes from a Canvas2D record; colours/geometry claims come from the
PNGs only. Recorded behaviour only — no captured JavaScript bundle was opened (`coverage/network/bodies/*.js`,
`profile/network/bodies/*.js` deliberately unread).

| run | how | seed | URL tags (final) | village (console) |
|---|---|---|---|---|
| gen-0 | cold load | 3131 | `river,isolated` (requested `tags=river`; app appended `isolated`) | see §R6 |
| gen-1 | Enter-key regeneration | 202429973 | `island,no square,isolated` | see §R6 |

Both passes produced the same two seeds (`meta.json` hrefs), so the profile and coverage runs of each gen are the
same village. Evidence tags as in the body of this file.

*Completion marker: this addendum is complete only when it ends with the "What changes for a re-implementer"
paragraph and `docs/lane-events.log` carries the `profile-village-river LANDED` line.*

### R1. River-course order — settled from sample timestamps

**How the samples were labelled (re-checkable; no bundle text read).** V8 names the River constructor by its
mangled variable (`kg`), so a search for "River" in a profile finds nothing. Labels were attached by joining three
recorded artefacts: `coverage/gen-{0,1}.coverage.json` (per-function start offset, V8 name, call count, byte length)
↔ `coverage/gen-{0,1}.calls.json` (the analyzer's `pkg.Class.method` label + calls + bytes), matched on
(name, count, bytes); cpuprofile `(line, column)` → offset through line starts reconstructed from 476 anchor lines
that contain a uniquely named function (`lineStart = coverageOffset − column`; 0 inconsistent anchors). Result:
`kg` = `River.new` (1 call, 1 890 B), `ve` = `Elevation.new`, `we` = `Water.new`, `Ij` = `Region.new`. The labelling
reproduces `report.md`'s inclusive times to 0.1 ms (gen-0: `Region.new` 121.3, `createWater` 66.0,
`createElevation` 15.4, `recreateView` 98.8 ms; gen-1: 45.6 / 19.4 / 5.9 / 36.6 ms). Scripts:
scratchpad `py/labeler.py`, `py/labeler2.py`, `py/tracesess.py` (session-local; the method above is sufficient to redo it).

**Two independent samplers observed the same run.** (1) the requested 20 µs Inspector profile
`profile/gen-0.cpuprofile` — achieved median interval **33 µs** (mean 34.7; 62 037 samples), versus a median
**129–130 µs** in the base captures' "100 µs" profiles, so the effective gain is ≈ 4×, not 5×; (2) a second
CPU-profile session embedded in `profile/gen-0.trace.json` (`ProfileChunk` id `0x3`; id `0x5` in
`gen-1.trace.json`), median 153 µs, 15 352 samples, same clock — its stage boundaries coincide with the
cpuprofile's to ≤ 0.1 ms. The second sampler is the only one that caught `River.calculateCurvature`.

**gen-0 (river, cold load, seed 3131) `[SHOWN]`** — ms after the first 20 µs sample inside `Region.new`;
parent chains are below `VillageScene.restoreVillage › createVillage`:

| # | routine | parent chain | first .. last sample (ms) | samples 20 µs / 2nd |
|---|---|---|---|---|
| 1 | `Region.createElevation` | `Region.new` | 0.415 .. 17.607 | 484 / 118 |
| 2 | **`River.new`** | `Region.new › createElevation` | **0.511 .. 0.854** (2nd: 0.596 .. 0.871) | 11 / 3 |
| 2a | `PolyUtils.resample` | `… › River.new` | 0.605 | 1 / 0 |
| 2b | `Chaikin.render` | `… › River.new` | 0.793 | 1 / 0 |
| 2c | **`River.calculateCurvature`** | `… › River.new` | — / **0.871** | 0 / 1 |
| 3 | `Elevation.new` | `Region.new › createElevation` | 1.037 .. 17.607 | 465 / 113 |
| 3a | `Noise.fractal` → `Perlin.new` | `… › Elevation.new` | 1.070 .. 1.403 | 11 / 3 |
| 3b | `Noise.getMap` → `Noise.get` | `… › Elevation.new` | 1.496 .. 5.911 | 119 / 28 |
| 4 | **`Elevation.digRiver`** | `… › Elevation.new` | **6.006 .. 14.414** | 225 / 57 |
| 4a | `Elevation.updateMinMax` → `Noise.getRange` | `… › digRiver` | 6.006 .. 6.257 | 9 / 2 |
| 4b | `Elevation.dist2poly` → `dist2segment2` → {`GeomUtils.lerp`, `MathUtils.gate`} | `… › digRiver` | 6.320 .. 14.414 | 192 / 45 |
| 5 | `Elevation.createGradient` | `… › Elevation.new` | 14.539 .. 17.581 | 62 / 16 |
| 6 | `Region.createWater` | `Region.new` | 17.695 .. 85.830 | 2 614 / 1 050 |
| 6a | `Water.new` | `Region.new › createWater` | 17.695 | 1 / 1 |
| 7 | `Water.river` | `Region.new › createWater` | 17.728 .. 85.830 | 2 613 / 1 049 |
| 8 | `Water.setLevel` | `… › Water.river` | 17.756 .. 85.830 (own samples 17.756 .. 19.1 first) | 2 611 / 1 048 |
| 9 | `Water.createDeflection` | `… › setLevel` | 19.128 .. 81.132 | 2 107 / 820 |
| 10 | `Water.buildCurves` | `… › setLevel` | 81.258 .. 85.830 | 271 / 172 |
| 10a | `Water.getGrid` | `… › buildCurves` | 81.284 .. 82.107 | 18 / 5 |
| 10b | `Water.linkSegments` | `… › buildCurves` | 82.682 .. 85.345 | 179 / 150 |
| 10c | `PolyUtils.smoothOpen`, then `PolyUtils.resample` | `… › buildCurves` | 85.462 .. 85.602, 85.527 | 3 + 1 / 1 |
| 11 | `Water.createPatches` (call 1 of 2) | `… › buildCurves` | 85.758 .. 85.830 | 2 / 1 |
| 12 | `Region.createDensity` | `Region.new` | 85.954 .. 87.189 | 24 / 6 |
| 13 | `Water.findDockable` | `Region.new` (between createDensity and roll) | 87.265 .. 87.294 | 2 / 0 |
| 14 | `Region.roll` | `Region.new` | 87.356 .. 128.245 | 1 135 / 309 |
| 11′ | `Water.createPatches` (call 2 of 2) | `Region.roll › spawnFields › Farmland.new › buildRegions › getLandSegments › Water.getLand` | 96.462 .. 96.495 | 2 / 0 |

(`Water.createPatches` = 2 calls in coverage; the two calls sit in different stages, as shown.)

**gen-1 (island, Enter regeneration, seed 202429973) `[SHOWN]`** — same convention:

| routine | parent chain | first .. last (ms) | samples |
|---|---|---|---|
| `Region.createElevation` › `Elevation.new` | `Region.new` | 0.183 .. 6.279 | 159 |
| `Noise.fractal` → `Perlin.new`; `Noise.getMap` | `… › Elevation.new` | 0.183 .. 0.221; 0.256 .. 2.895 | 2; 73 |
| **`Elevation.createIsland` → `Elevation.createMount`** | `… › Elevation.new` | **2.961 .. 3.861** (mount 3.017 .. 3.861) | 21 (16) |
| `Elevation.createGradient` | `… › Elevation.new` | 3.926 .. 6.248 | 47 |
| `Region.createWater` › **`Water.island`** › `setLevel` | `Region.new` | 6.311 / 6.375 / 6.436 .. 25.848 | 547 |
| `Water.createDeflection` | `… › setLevel` | 6.812 .. 24.293 | 476 |
| `Water.buildCurves` › `getGrid`, `linkSegments`, `smoothOpen`, `resample` | `… › setLevel` | 24.323 .. 25.848 (24.707; 25.730; 25.782 .. 25.818; 25.848) | 35 |
| `Region.createDensity` | `Region.new` | 26.076 .. 27.129 | 16 |
| `Region.roll` (› buildNetwork › `Network.spawnWharf › Region.buildWharf` 27.300; › placeBuildings › **`Region.buildPiers`** 28.578) | `Region.new` | 27.176 .. 48.081 | 529 |

No `River.*`, `digRiver` or `dist2*` in gen-1 (coverage 0). The second sampler (`gen-1.trace.json`, id `0x5`)
agrees (`createIsland` › `createMount` 2.996 .. 3.779 ms).

**Result — the river course is produced by `River.new`, inside `Region.createElevation`, before the height field
exists `[SHOWN]`.** Order: `River.new` (course: own work → `PolyUtils.resample` → own work → `Chaikin.render` →
`River.calculateCurvature` as its last act; ≈ 0.35 ms cold) → `Elevation.new` (5-octave noise map → `digRiver`
carves it to the course → gradient) → `createWater` → `Water.new` → `Water.river` → `setLevel` →
`createDeflection` → `buildCurves` (`getGrid` → `linkSegments` → `smoothOpen`/`resample` → `createPatches`) →
`createDensity` → `findDockable` → `roll` (the second `createPatches` builds land patches during field layout).
The first noise object is constructed at 1.07 ms, after `River.new` has returned (≤ 0.885 ms), so the course
cannot be traced over the terrain: **the terrain is carved to a course generated independently** — the mechanism
behind the creator's "relief follows rivers" (post 89314043, `vg-posts-b.md` §2.4), and the answer to the
UNKNOWNs in `vg-posts-a.md` §3.8 and `vg-ng-devlogs.md` A2.7 ("traced downhill or drawn top-down") = drawn first.

**The same slot holds every water type's shape `[SHOWN, 6 profiles]`.** Inside `Elevation.new`, between
`Noise.getMap` and `createGradient`, the per-type height-field primitive runs: `digRiver` (river; this capture
gen-0 and base `05-04-05/profile/gen-1`), `createIsland → createMount` (island; gen-1), `createHollow →
createMount` (pond; base `05-04-05/profile/gen-0` at 6.38 .. 7.90 ms into `Elevation.new`, and `gen-2`); with no
water, `updateMinMax` alone (base `gen-3`). Confluences use `Elevation.digFork` (coverage only, `05-37-29`).

**Cross-checks.** (a) Base `captures/village/2026-09-21T05-04-05/profile/gen-1.cpuprofile` (river, 100 µs):
`River.new` has **one sample at 0.29 ms, inside `createElevation`, before `Elevation.new` (0.43 ms)** — the same
order, already recorded at the coarse interval but never labelled because of the mangled name. (b) `report.md`'s
call trees print only nodes ≥ 0.4 % of busy time (≥ 2.5 ms in gen-0), so `River.new` (0.35 ms) cannot appear
there, and they order children by cost, not time — the artefact behind the base §4.0 ordering. Every edge
`report.md` does print agrees with the tables above. (c) Console clocks (`profile/console.jsonl`):
`Region.hx:81` → `Legend.hx:77` = 127 ms (gen-0) and 48 ms (gen-1), matching the `Region.new` windows (128.8 /
48.4 ms) — consistent with R4's finding that the legend is produced inside `Region.new`.

**Contradictions resolved.** `_critic.md` C8 / §6 item 3 said the course was "too cheap to be sampled" — it was
sampled once at 100 µs and eleven times at 20 µs; it was unlabelled, not unsampled. Body §4.1 of this file says
`calculateCurvature` is "used by Region" — its caller is `River.new` itself `[SHOWN]`. Body §4.2 says
`dist2segment2 / dist2poly` counts "the segments of the water polygon" — no water polygon exists yet when
`digRiver` runs (`createWater` starts ≈ 3 ms after `digRiver` ends; the outline is extracted by `buildCurves`
≈ 67 ms after it, at 81.3 ms); the polyline measured is the River course `[SHOWN by order]`.


### R2. Arithmetic identities, and what `River.new` / `calculateCurvature` do

**Point-to-polyline carving `[SHOWN arithmetic]`** (`coverage/gen-{0,1}.calls.json`; earlier runs from
`05-04-05/coverage`, `05-37-29/coverage`, `05-38-17/coverage`). Visible course length = sum of skeleton-component
diameters of the water mask (pixels with B−R ≥ 35 and G−R ≥ 28, map square only; bridges break the skeleton, so
lengths are slight underestimates); sinuosity = that length ÷ straight distance between the edge entry and exit.

| run | tags | height-field primitive | `dist2poly` | ÷ 16 384 | `dist2segment2` | ÷ 16 384 | visible course | px / segment | sinuosity |
|---|---|---|---|---|---|---|---|---|---|
| **this gen-0** | river, isolated | `digRiver` | 16 384 | **1** | 835 584 | **51** | 2 140 px | 42.0 | 2.03 |
| 05-04-05 cov gen-0 | river, no square, highway | `digRiver` | 16 384 | 1 | 671 744 | 41 | 1 604 px | 39.1 | 1.57 |
| 05-04-05 cov gen-3 | river, isolated | `digRiver` | 16 384 | 1 | 589 824 | 36 | 1 452 px | 40.3 | 1.32 |
| 05-37-29 cov gen-0 | confluence, palisade, highway | `digFork` | 32 768 | 2 | 770 048 | 47 | — | — | — |
| 05-37-29 cov gen-1 (2 attempts) | same | `digFork` × 2 | 65 536 | 4 | 1 753 088 | 107 | — | — | — |
| **this gen-1** | island, no square, isolated | `createIsland → createMount` | 0 | — | 0 | — | — | — | — |
| 05-38-17 cov gen-0/1 | pond, grove, dead end, sparse | `createHollow → createMount` | 0 | — | 0 | — | — | — | — |

* `dist2poly` = 128² × (polylines measured): one call per heightmap cell per polyline — 1 for a river, 2 for a
  confluence (so a forked River carries two polylines), none for islands and ponds, whose shape enters the height
  field as a radial "mount"/"hollow" with no polygon distance at all `[SHOWN]`. The base file's 41 and 36 reproduce.
* `dist2segment2` ÷ 16 384 = total segments measured: **the gen-0 course has 51 segments** (52 vertices if open).
* **One clamp and one lerp per point–segment test.** `MathUtils.gate − dist2segment2` = 41 045 (this gen-0),
  41 726, 39 974, 39 374 in the other single-attempt carving runs, versus 33 809–41 348 `gate` calls in runs with no
  carving (05-04-05 gen-1/2, 05-38-17 gen-1, this gen-1); `GeomUtils.lerp − dist2segment2` = 15 330–32 972 versus
  6 482–22 994. The profile shows `dist2segment2`'s only callees are `GeomUtils.lerp` (→ `Point.new`) and
  `MathUtils.gate`. `[SHOWN]` → `[INFERRED]` the textbook clamped projection: `t = clamp(((p−a)·(b−a))/|b−a|², 0, 1)`,
  `q = lerp(a, b, t)`, return `|p−q|²`; `dist2poly` = minimum over segments; naïve O(cells × segments).
* **Constant vertex spacing.** Across three rivers whose visible lengths differ by 47 %, visible length per segment
  stays at 39–42 px (±4 %) of the 1 100 px map (≈ 4.7 heightmap cells). `[INFERRED]` a fixed-step resample is
  the last count-setting step of the course (the sampled order below agrees), so vertex count ∝ course length;
  the more a river meanders, the more segments `digRiver` pays for.

**Noise bookkeeping — an exact identity in all 10 VG coverage runs `[SHOWN]`.** With `E` = `Elevation.new` calls:
`Noise.get = a + b`, `Perlin.get = 5a + 6b`, and solving gives **`a = 16 384 × E` exactly** in every run (e.g. this
gen-0: Noise.get 20 944, Perlin.get 109 280 → a = 16 384, b = 4 560; this gen-1: 17 044 / 85 880 → 16 384 / 660);
`Perlin.new = 5E + 6`; `Noise.fractal = E + 1`. So the heightmap is a **5-octave** fBm sampled exactly once per
128² cell and nowhere else; a second, **6-octave** fBm (its `Noise.fractal → Perlin.new` is sampled under
`Forest.roll` at 118.5 ms) serves the forest; nothing else samples noise; a retry adds 5 Perlin tables and 16 384
samples. This sharpens body §4.2 ("~5 octaves", "5.22 per sample", "pool of 11"): 11 = 5 + 6.

**What `River.new` does.** Facts `[SHOWN]`: 1 890 B; exactly one call per waterway (`River.new = Water.river =
digRiver = 1` in all three river runs; in confluence runs `River.new = Water.confluence = digFork` per attempt,
plus a River callback `(anon@328119)` 30 / 74 calls); parent `Region.createElevation`; it runs before any noise
object exists and creates none (`Noise.new` 2, `Noise.fractal` 2, `Perlin.new` 11 are identical in river and
non-river runs, and the identity above closes with zero residual in all five river/confluence runs); of its 14
samples (both samplers) 11 are its own code, one is `PolyUtils.resample`, then one `Chaikin.render`, and the last
is `calculateCurvature`; its output is the 36–51-segment polyline `digRiver` measures.

| hypothesis for the raw course | prediction | status |
|---|---|---|
| **H-R1** random polyline from `Random` draws (a heading random walk, or random control points with alternating lateral offsets between an entry and an exit edge point) → fixed-step `resample` → `Chaikin.render` → per-vertex curvature | no noise calls; count ∝ length; callees resample → Chaikin → curvature | **favoured** `[INFERRED]` — every prediction met |
| H-R2 Perlin / fBm-warped line | extra `Noise.get`/`Perlin.get` (or extra `Noise.fractal`/`Perlin.new`) in river runs | **refuted for this build** by the exact noise identity and by the order (no noise object exists when `River.new` runs) |
| H-R3 recursive midpoint displacement | a recursive River method, or nested loops with trip counts 1, 2, 4, … | no recursive River method executes (River runs only `new`, `calculateCurvature`, and in confluences one callback); an in-constructor iterative version is **not excluded** by function-level counts |
| H-R4 spline through control points | a spline/Bezier evaluator under `River.new` | none executes anywhere in VG; `Chaikin.render` is the only smoother seen — **disfavoured** |

**Discriminating test (H-R1 vs H-R3, and random-walk vs control-point variants of H-R1):** record a coverage
pass on a `tags=river` seed with `Profiler.startPreciseCoverage({callCount: true, detailed: true})` and read only
the block counts inside `River.new`'s range (start offset 325 196, 1 890 B): one loop with k iterations and ~k
`Random.float` calls = random walk / control points (k = raw vertex count); nested loops whose trip counts double
= midpoint displacement. No source text is needed — offsets and counts only. Secondary check: VG's JSON export
(posts 50688261, 88749133) — if it carries the river centreline, its vertices should come in Chaikin corner-cut
pairs along a constant-step polyline.

**What `River.calculateCurvature` does.** Facts `[SHOWN]`: 280 B, one call per River, the **last step of
`River.new`** (second sampler, 0.871 ms; the 20 µs profile shows `River.new` own code at 0.854 and
`createElevation` at 0.885, so it lasts < ~30 µs — a single pass over ~52 vertices). `[INFERRED]` it stores a
per-vertex (signed) curvature on the River for later consumers — the only ones that run afterwards are
`digRiver` (carve depth/width could vary with bend curvature), the water extraction, and the bridge logic
(creator: crossings are "as right as possible", 89314043, which a curvature minimum would serve). **Test:** on
several river maps measure channel width on inner vs outer bends and the local curvature at each bridge; a
curvature-driven carve predicts systematically wider or deeper outer bends, a curvature-driven bridge rule
predicts bridges only on low-curvature reaches. (My width scan of this gen-0 — 65–90 px along the course — is
too noisy to decide.)


### R3. Executed-set diff against every earlier VG coverage run

Reference set: all eight earlier `calls.json` files — `05-04-05/coverage/gen-0…3` (the body appendix),
`05-37-29/coverage/gen-0,1` (confluence, palisade, highway) and `05-38-17/coverage/gen-0,1` (pond, grove, dead end,
sparse). `com.watabou.*` routines only.

**Executed here, never in any of the eight earlier runs `[SHOWN]` — exactly three:**

| routine | bytes | gen-0 | gen-1 | reading |
|---|---|---|---|---|
| `mapping.BridgeView.drawPier` | 391 | 0 | 2 | the two piers on the island's NE shore (R5); no earlier *coverage* run had a pier (the base's four-pier coast map was a draw-only run) |
| `model.Elevation.createIsland` | 479 | 0 | 1 | calls `createMount` (profile parentage, R1): the island is a mount in the height field |
| `model.Water.island` | 544 | 0 | 1 | island entry point into the shared `setLevel` path |

No coast/dock/bridge routine is new: `Water.findDockable` / `getWharf`, `Region.buildPiers` / `buildWharf`,
`Network.spawnWharf`, `Bridge.*`, `Tracker.startBridge` all ran before. Bridges: gen-0 has `Tracker.startBridge`
= `Bridge.new` = `BridgeView.draw` = `drawShadow` = **4**; gen-1 has none. Piers: `Region.buildPiers` = 1 in both
runs, but only the island produced piers (`drawPier` 2; `drawPlanks` 2 in gen-1 = the piers reuse the bridge
plank routine; `drawShadow` 0, so piers cast no shadow). There is no ford routine in any run.

**Executed here but absent from the body appendix (05-04-05 only) — they occur in 05-38-17 and/or 05-37-29
`[SHOWN]`:** `props.Well.new`/`draw` (gen-0 1/1; 05-38-17 gen-1), `Elevation.createMount` (gen-1 1; ponds; body A2),
`Region.normalFromPoly` (gen-1 3; ponds 1/1), `Region.(anon@382738)` (gen-1 27; ponds 8/4), `PolyUtils.offsetClosed`
(gen-1 2; ponds 2/2), `WaterView.(anon@306186)` / `(anon@306205)` (gen-1 1/3; ponds 1/3), `Tracker.clone` (gen-1 2;
05-38-17 gen-1 1), `URLState.(anon@192366)` (gen-0 2).

**Open versus closed water — two code paths `[SHOWN co-occurrence, all 10 runs]`.** Open-chain waters (river,
confluence) run `PolyUtils.offsetOpen` and `WaterView.(anon@306247)` / `(anon@306266)`, with `offsetOpen` =
`(anon@306247)` = number of shoreline chains (2 in this gen-0 and 05-04-05 gen-3; 3 in 05-04-05 gen-0 and both
confluence runs) and `(anon@306266)` = 2 × that; closed waters (pond, island) run `PolyUtils.offsetClosed`,
`WaterView.(anon@306186)` / `(anon@306205)`, `Region.normalFromPoly` and `Region.(anon@382738)`. In every run
`Water.(anon@399654)` = `PolyUtils.smoothOpen` (= chains extracted, per attempt): 2 here for the river's two banks,
1 for the island's single coast — and in both new profiles `smoothOpen` sits under `Water.buildCurves`, so even the
closed island coast leaves extraction as one chain smoothed with the open-chain smoother.

**Reverse diff — in all eight earlier runs, absent here `[SHOWN]`:** gen-0: none. gen-1: `geom.Color.lerpf`
(233 B), `geom.DCEL.(anon@163807)` (48 B), `geom.polygons.PolyCreate.rect` (80 B). Against the four appendix runs
only, gen-1 also lacks `DCEL.shrink`, `FillablePoly.{new, getBounds, validate, validateRect}` and
`FarmlandView.getPoisson`, and gen-0 lacks `Blueprint.random` and `Params.randomTags` (the cold load took its
tags from the URL: `Blueprint.fromURL` 1, `Params.resolve` 1 — see R6). None of the gen-1 absences is a water
routine. `[INFERRED]` the vegetation-side ones (DCEL patch helpers, FillablePoly, `lerpf`, `getPoisson`)
reflect the island's tiny forest — `Forest.(anon@349301)` 87 candidates vs 115–1 633 in every other run, 62 drawn
trees vs 68–751 — not an island rule; `PolyCreate.rect` is unexplained.

**What `no square` removes (gen-1) `[SHOWN]`:** `SquareBuilder.build` / `place` / `addCenterpiece` and its
callbacks, `Region.getPopulated` (sampled under `SquareBuilder.build` in gen-0), `props.Well`, and
`PolyBounds.testShapeVsShape` — the last executes in all seven square runs among the ten (4–15 calls) and in none
of the three square-less ones, a clean square signature. `Network.createSquare` still runs (1 call): an
unconditional stage whose body is tag-gated, as the body file found for `spawnWharf`/`spawnIsolated`.
Side finding `[SHOWN co-occurrence, 6 of 6]`: every `SquareBuilder.addCenterpiece` call is matched by exactly one
`props.*.new` — `Tower` (05-04-05 gen-1, gen-3), `Tree` (05-37-29 gen-0, 05-38-17 gen-0), `Well` (05-38-17 gen-1,
this gen-0). `props.Tower` is therefore a square centrepiece, independent of the roof towers drawn by
`GableRoof.drawTower` (which also fire in 05-04-05 gen-2, a run with neither a square nor `props.Tower`); body §4.8
conflates the two.


### R4. Stage timings at 20 µs versus the body's 100 µs numbers

Inclusive ms (sum of sample intervals with the routine on the stack, the same convention as `report.md` and body
§5.2). Achieved sampling: this capture median 33 µs; base `05-04-05` median 129–130 µs. Cold = first generation
after page load (unoptimised code); warm = Enter regeneration. `Shading.update` from `report.md` / body §5.2.

| stage | **this gen-0** river, cold | **this gen-1** island, warm | base gen-0 pond, cold | base gen-1 river, warm | base gen-3 no water, warm |
|---|---|---|---|---|---|
| `createVillage` | 220.3 | 82.2 | 237.3 | 139.4 | 40.5 |
| `Region.new` | 121.3 | 45.6 | 143.0 | 95.4 | 13.6 |
| ├ `createElevation` | 15.4 | 5.9 | 9.9 | 14.7 | 3.1 |
| │ ├ `River.new` | **0.35** | — | — | 0.15 (1 sample) | — |
| │ ├ `Noise.getMap` | 3.6 | 2.4 | 4.6 | 3.1 | ≈ 1.6 (frame partly inlined away) |
| │ ├ shape primitive | `digRiver` 7.4 (`dist2poly` 6.4) | `createIsland` 0.8 | `createHollow` 1.3 | `digRiver` 9.0 | — |
| │ └ `createGradient` | 2.0 | 1.9 | 2.5 | 1.7 | 0.8 |
| ├ `createWater` | 66.0 | 19.4 | 82.2 | 53.4 | — |
| │ ├ `createDeflection` | 57.4 | 16.8 | 73.4 | 50.3 | — |
| │ └ `buildCurves` | 4.4 (`linkSegments` 2.3) | 1.2 | 2.5 | 1.9 | — |
| ├ `createDensity` | 0.8 | 0.7 | 1.1 | 0.7 | 0.6 |
| ├ `roll` | 37.5 | 18.5 | 44.7 | 26.1 | 8.8 |
| │ ├ `buildNetwork` | 5.3 | 0.8 | 5.3 | 1.1 | 0.4 |
| │ ├ `placeBuildings` | 1.4 | 0.4 | 1.7 | 0.4 | 0.2 |
| │ ├ `spawnFields` | 8.2 | 1.9 | 9.6 | 5.1 | 1.4 |
| │ ├ `rollForest` | 17.5 | 15.0 | 20.1 | 18.9 | 6.5 |
| │ ├ `rollName` | 3.1 | 0.1 | 5.3 | < 0.4 | < 0.4 |
| │ └ `Legend.new` | 0.4 | 0.2 | 0.7 | 0.4 | 0.3 |
| └ `Blueprint.updateURL` | 0.5 | 0.3 | 0.5 | 0.2 | 0.3 |
| `recreateView` | 98.8 | 36.6 | 94.4 | 44.0 | 26.9 |
| ├ `Shading.update` | 23.7 | 17.0 | 36.6 | 11.7 | 6.0 |
| ├ `ForestView.new` | 40.8 | 1.5 | 20.4 | 12.9 | 2.7 |
| ├ `ReliefLayer.new` | 13.2 | 10.6 | 11.4 | 12.4 | 14.9 |
| └ `VillageView.drawFields` / `WaterView.draw` | 8.2 / 2.0 | 3.6 / 0.6 | 9.5 / 1.3 | 2.3 / 1.0 | 1.3 / — |

**No stage's cost changes materially at the finer interval `[SHOWN]`**: runs of the same kind agree across the
two captures (river `createElevation` 15.4 vs 14.7 ms, `createGradient` 2.0 vs 1.7, cold `buildNetwork` 5.3 vs
5.3, cold `rollName` 3.1 vs 5.3 — cold-load JIT inflation, not algorithm). The island is the cheapest watered map
recorded (`createWater` 19.4 ms, `Region.new` 45.6 ms). `[INFERRED, weak]` `createDeflection` cost tracks land
area: 16.8 ms with 28 % land (island) versus 50–87 ms with 87–91 % land (the four river/pond maps, land fraction
measured on the PNGs), but two maps at the same 90.6 % land cost 50.3 and 86.5 ms, so land area is not the whole
story.

**Newly visible (all below `report.md`'s 0.4 % tree threshold) `[SHOWN]`:** `River.new` with `resample`,
`Chaikin.render` and `calculateCurvature` (R1); `Water.new`; `Water.getGrid`; the `buildCurves` tail
`smoothOpen → resample → createPatches`; `Water.findDockable` as a direct child of `Region.new` between
`createDensity` and `roll`; `Region.buildWharf → Water.getWharf` under `Network.spawnWharf`; `Region.buildPiers`
under `placeBuildings` (gen-1); `updateMinMax → Noise.getRange` as the first act of `digRiver`;
`createIsland → createMount`; `Region.getPopulated` under `SquareBuilder.build`; the second `Water.createPatches`
under `Farmland.getLandSegments → Water.getLand` (the land "earth bounds" of `vg-posts-a.md` §3.8 are built lazily
during field layout, as patches).

**Attributions that change `[SHOWN in all six profiles — 4 base + 2 new; inlining can only drop intermediate
frames from a sampled stack, never add a caller, so these parent edges cannot be artefacts]`:** `Legend.new`, `VillageGrammar.init` and `Region.updateTags` are children of **`Region.roll`**
(after `rollForest`/`rollName`), and `Blueprint.updateURL` (→ `URLState` → `history.replaceState`) is the **last
child of `Region.new`**. Body §3.1 draws both as `createVillage`-level steps after `Region.new`; the model names,
legends and rewrites the URL itself. Also: `Network.createSquare` is reached through `Network.spawnWharf` in both
new runs (isolated + river / island), through `Network.spawnIsolated` in base gen-0 (isolated + pond — ponds never
get piers) and directly from `Network.build` in the two dead-end runs `[SHOWN]` — `[INFERRED]` the square is made
by whichever seeding routine fixes the village heart, so on dockable water the heart is tied to the wharf.


### R5. Screenshots

`profile/gen-0.png` ≡ `coverage/gen-0.png` (MD5 `07830ecff9696589c447669a1514c921`) and `profile/gen-1.png` ≡
`coverage/gen-1.png` (MD5 `c2da81b85b6a519dd9528ff5b9e1658a`): the four files are two byte-identical images —
same seed, same pixels in separate browsers `[SHOWN]`. Canvas 1500 × 1100; the map is the central 1100 × 1100
square (x 200–1300) with black bars left and right. Counts below were made by a roof-colour component detector
(tan or slate roof pixels, 2 px dilation, ≥ 40 px cores) and then checked by eye on annotated crops.

**gen-0 — "LETTICE'S WATER", "POP. 200" (plate top-left) `[SHOWN]`.**
* **River course:** enters the east edge at y ≈ 150–230, turns south down an east arm (x ≈ 900–1040,
  y ≈ 200–520), swings west along a middle reach (y ≈ 600–740), makes a hairpin loop in the west (x ≈ 380–520,
  y ≈ 560–900) and leaves through the south edge at x ≈ 640–740 — a double S / omega meander. Visible centreline
  ≈ 2 140 px against 1 054 px straight edge-to-edge (sinuosity ≈ 2.0); water ≈ 12.9 % of the map; mean width
  ≈ 72 px (≈ 6.5 % of the map width; measurement method in R2).
* **Banks:** a cream sand strip on the land side of both banks and a dark shoreline stroke; inside the water,
  three tones with the lightest at the shore, and one thin pale tide line ≈ 13–15 px from each bank (vertical
  scans at x = 560 and x = 700). No single central white line in this style.
* **Bridges:** four straight plank decks, each roughly perpendicular to the channel — ≈ (977, 438) on the east
  arm, (631, 619) and (787, 700) on the middle reach, (498, 901) on the western loop — matching
  `Bridge.new` = `BridgeView.draw` = `Tracker.startBridge` = 4. All four decks look alike; the village is
  `isolated` (no highway), so all are secondary bridges ("simpler and narrower", post 89314043). No ford.
* **Wharf / piers:** none drawn (`Region.buildPiers` ran, `drawPier` 0) — the stated narrow-river suppression
  (89314043).
* **Settlement:** a cream square with a well at its centre (≈ 752, 553 — `props.Well`) on the neck of land
  between the east arm and the middle reach; houses on the neck, on the far bank of the east arm and inside the
  southern loop, land pieces linked only by the four bridges. **Buildings: 29** (32 detected components: 4 are
  bridges, one holds two houses) = legend "Buildings: 29"; 2 slate-blue roofs.
* **Fields / forest:** five ploughed fields with furrows (two large at top centre, one west, one east, and a small
  one inside the middle bend clipped to the bank); forest masses along the west edge and the south-east quadrant;
  tree belts on the banks.
* **Relief:** grass-mode tufts are sparse; a few dotted iso-lines show in the south-east open ground and on the
  west slope, but none can be followed to a bank, so this image neither confirms nor refutes contours running
  parallel to the river.

**gen-1 — "TURTLE HALL", "POP. 180" `[SHOWN]`.**
* **Island:** one island, land 27.8 % of the map (title plate excluded), bounding box x 350–1028, y 303–1011,
  centroid (692, 652), long axis running NW–SE (48° below the +x axis on screen), axis ratio 1.49. The coast is a
  smooth rounded quadrilateral with low-amplitude undulations — no bays, headlands or islets.
* **Coast rendering:** sand rim, dark shoreline, two thin white tide lines ≈ 13 and ≈ 31 px offshore, then band
  edges ≈ 18, 47 and 88 px from the shore (east-coast scan at y = 560): 1 : 2.61 : 4.89, against the body's
  `k^1.5` band law 1 : 2.83 : 5.20 on an oblique scan — consistent.
* **Piers:** two parallel plank piers on the north-east shore, ≈ (823, 369) and (885, 401), ≈ 75 px long,
  perpendicular to the shore, with no shadow band (`drawShadow` 0); the western pier's root meets the end of a
  road.
* **No square:** a curving main road SW→NE, a loop in the east and short branches, no plaza anywhere.
  **Buildings: 36** (38 components − 2 piers − 1 false positive, sand under trees, + 1 component holding two
  houses) = legend "Buildings: 36"; 2 slate roofs, one a large hall.
* **Fields / trees:** three small ploughed fields in the north-west, one in the south-east corner, a gridded
  orchard west of centre, and only small clumps of trees (62 drawn trees against 696 in gen-0).
* **Relief:** in a high-pass-filtered view, dotted iso-lines form nested rings in the island's interior, running
  parallel to the coast (clearest in the south). The coast reads as the lowest ring of the island's "mount".


### R6. Legend and console

The generator's own trace is identical in both passes (`profile/console.jsonl`, `coverage/console.jsonl`)
`[STATED]`:

```
gen-0  Region.hx:81: 3131             Legend.hx:77: *** Lettice's Water (riverside village) ***
       Legend.hx:78: Buildings: 29, population: 196
       Legend.hx:82: 1. The Nothern Bard (tavern)      Legend.hx:82: 2. Lora's (tavern)
gen-1  Region.hx:81: 202429973        Legend.hx:77: *** Turtle Hall (island village) ***
       Legend.hx:78: Buildings: 36, population: 178
       Legend.hx:82: 1. Guildhouse (special)           Legend.hx:82: 2. Felicia's Brewery (basic_shop)
```

(each gen also prints `Region.hx:82: [array Array]`). There are no `VillageScene.hx:275: ERROR` or
`VillageGrammar.hx:50: shrinking` lines, and `Region.new` = 1 in both coverage runs: both maps were first-attempt
generations with unshortened names.

**Name derivations from the shipped grammar** (`coverage/network/bodies/0010-eda47b10.json` = `grammar.json`,
69 symbols; `0010-2bb722bf.bin` = `given_female.txt`, 92 names) `[STATED data]`:

| printed | rule path | gate / source |
|---|---|---|
| Lettice's Water | `village → personsNoun "#proper.possessive# #noun#" → noun → specificNoun → terrNoun "WATER?-#waterNoun#" → "water"` | needs the descriptive `WATER` tag (the only route to `waterNoun`); Lettice = female list entry 62 |
| Turtle Hall | `village → twoWords "#adj# #genericNoun#" → adj → specificAdj → terrAdj "SHORE?-#shoreAdj#" → "turtle"` + `genericNoun "hall"` | `shoreAdj` is reachable only through `SHORE?-`, so the island's descriptive tags include `SHORE` `[INFERRED]` |
| The Nothern Bard (tavern) | `tavern "the #estAdj# #est_noun#"` | "nothern" is a misspelling inside the shipped `estAdj` list (like `JUCTION`) |
| Lora's (tavern) | `tavern "#proper.possessive#"` | female list entry 66 |
| Guildhouse (special) | `special "guild{ }{house\|hall}"`, optional space dropped | — |
| Felicia's Brewery (basic_shop) | `basic_shop "#proper.possessive# {…\|brewery}"` | female list entry 40 |

Both numbered notes of gen-0 are taverns; `Note.new` = 2 in both runs, as in the body.

**Population and type `[SHOWN]`.** 196 / 29 = 6.76 persons per building (top of the body's 3.6–6.9 range) and
178 / 36 = 4.94; two more points do not recover the model. The plate rounds to the nearest 10 (196 → "POP. 200",
178 → "POP. 180"), confirming body §3.3. The type strings are "riverside village" and a qualifier the body had not
seen, "**island** village", so the water qualifier set is at least {riverside, coastal, island}; both maps are
"village" at 29 and 36 buildings, consistent with the body's thresholds. The type strings do not occur in
`grammar.json`, so they are produced by code, not by Tracery.

**URL and tags `[SHOWN counts + URLs]`.** The requested `tags=river` came back as `river,isolated`: in gen-0
`Blueprint.fromURL` = 1, `Params.randomTags` = 0, `Params.resolve` = 1, so tag parsing/resolution fills the
mandatory road slot (creator: exactly one road tag is always selected, `vg-posts-b.md` §2.1); which of the two
routines adds `isolated` is `[INFERRED]`. gen-1 (Enter) ran `Blueprint.random` and `Params.randomTags` (1 each) and
rolled `island,no square,isolated`. Cold load with seed 3131 followed by Enter produced the same next seed,
202429973, in two separate browsers — the "random" next village is reproducible from the starting seed.
Retry hook: `Blueprint.adjust` runs in exactly the two earlier coverage runs whose `Region.new` = 2
(05-37-29 gen-1, 05-38-17 gen-0) and in no other run. Console clocks: `Region.hx:81` → `Legend.hx:77` takes
127 / 48 ms in the profile pass and 514 / 140 ms in the coverage pass (coverage instrumentation costs 3–4×).

### What changes for a re-implementer

Treat a river as three stages at three different times. **(1) Course first, before any terrain:** a River
object built from plain random draws — no noise — resampled to a fixed step (vertex count grows with length:
36–51 segments here), Chaikin-smoothed, with per-vertex curvature stored; about 0.1–0.35 ms. **(2) Terrain
second:** a 5-octave fBm on the 128² grid, carved by the exact minimum distance from each cell to the course
(16 384 × 36–51 clamped point-to-segment tests, 7–9 ms — no distance transform needed at this size), then the
gradient field. **(3) Water body last:** extracted from the carved field by the shared `setLevel → createDeflection
→ getGrid → linkSegments → smooth → resample → createPatches` path (a level-set contour extraction `[INFERRED]`);
the same machinery later yields the land patches that fields are clipped to. Author every water type the same way:
a height-field primitive (`digRiver`, `digFork`, `createHollow → createMount`, `createIsland → createMount`) plus a
thin `Water` entry point into one extraction path. "Relief follows rivers", contours that never cross a shore, and
the concentric rings inside an island then come for free. Budget the extraction, not the course:
`createDeflection` (17–87 ms) is the only expensive water step. Keep open-chain (river, confluence) and
closed-ring (pond, island) shore handling separate; make bridges where road trackers cross water, and draw piers
with the bridge plank routine but no shadow. Put naming, the legend and the URL rewrite inside the model build,
not after it.

## Critic-2 addendum (VG/NG seat, 2026-09-25)

Rulings from `research/findings/_critic-vg-ng.md` (§1 rows V3–V5, V12, V14, V15, V23, V25; §4). Recorded
behaviour only; no bundle read. Scripts: that seat's scratchpad `rederive.py`.

1. **Two builds are now recorded, and this file describes only the first.** Every capture of 2026-09-21 loaded
   `html-classic.itch.zone/html/19251041/bin/index.html`; the four captures of 2026-09-25 (`10-14-02`, `10-19-31`,
   `10-27-25`, `10-28-58`, cited by no findings file) loaded `html/19365073/bin/index.html` `[SHOWN, meta.json]`.
   Seed 3131 `river,isolated` on both: same name "Lettice's Water", same two POIs, but **29 → 24 buildings,
   population 196 → 162, `dist2segment2 ÷ 16 384` 51 → 94, `River.calculateCurvature` 1 → 0,
   `Forest.(anon@349301)` 1 464 → 0, `ForestView.drawTree` 696 → 798**, and `Region.spawnAt`, `Building.a`,
   `GableRoof.drawTower` newly executing `[SHOWN, calls.json]`. So the name/POI streams are seed-stable across
   builds and the geometry is not; R2's "51 segments" and the curvature step are build-19251041 facts. The gen-1..3
   coverage of `10-19-31` and `10-27-25` is **partial** (`dist2poly` 26–34, `Noise.fractal` 0, `Random.reset` 0)
   and must not be used for counts; `10-28-58` (seeds 3131–3134, courses 94/91/84/64 segments) and `10-14-02` are
   clean.
2. **`Bisector.makeCut = Bisector.split = PointExtender.project`** exactly in all 21 clean VG runs (22/41/46/28 …)
   — the same identity as NG's plain `Bisector` and MFCG's, omitted from §4.7. Since NG's `BisectorEx` makes no
   `project` call yet meets its boundaries at right angles (`profile-neighbourhood.md` RA-9 item 7), the projection
   is not the right-angle construction; `_critic.md` C13 stays OPEN without its "perpendicular-foot" narrowing.
3. **Trackers do not sample the elevation through `Elevation.g`:** `g` = 1–5 calls per village against
   `Tracker.advance` 130–372 in all 24 runs. Slope preference (post 104226049) must read the `createGradient` array
   inline or sit in `Tracker.flexibility` (≈ 1 per step). C10 stands with that qualification.
4. **`Random.reset` = 6 per regeneration, 7 on cold load,** in every clean run: at least six (re)seed points per
   village, consistent with the stated per-subsystem rerolls (`trees`, Shift+T) — which streams they are is open.
5. **Palisade (§4.9):** the recorded construction is hull-based (`ConvexHull.ofSet`, closure × 91 → `poly2smooth`
   → 32 `cubic` → `overlaps = BitMap.check` 1 463 → `addGate`); no `Noise`/`Elevation` call is attributable to it.
   The creator's "shape depends on the population density map" (104796798) therefore enters through
   `Palisade.getPopulated`'s selection, not through a level set as `vg-posts-b.md` §2.25 infers. Whether the 91
   hulled points are building corners (this file's reading) or a contour polyline is undetermined.
6. **Roof multiplier (§7.4):** the stated rule "unlit = colour × shadow colour" (71653886) is approximate here:
   the one clean pair in `draw/gen-1` gives dark ÷ lit = (0.621, 0.629, 0.708) against `shadowColor/255` =
   (0.588, 0.600, 0.682); `dark = lit × lerp(white, shadow, t)` closes with t ≈ 0.92 on all three channels.
7. **`PoissonPattern.warp` (§4.6):** the creator's "domain warping" (88749133) is applied to the fractal noise that
   drives tree density (`Forest.roll → Noise.get`, the 6-octave fBm of R2), not to the sampler. `warp` is 1 : 1 with
   candidates and tracks `openfl.geom.Point.polar` (13 930 ≥ 12 601 etc.), so it is at least the annulus-offset
   step of dart throwing; whether it also warps the domain is unrecovered. Do not attribute the ragged wood edges
   to it.


## River-course addendum, part 2 (2026-09-25) — block-level coverage, captures/village/2026-09-25T10-14-02

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B07.

**Scope.** Part 1 (above) asked for block-level coverage of `River.new`. This part records it, and a finer measurement
that part 1 did not anticipate: coverage windows between consecutive call sites inside `River.new`. Clean-room as
before: no captured JavaScript bundle was opened (`captures/**/network/bodies/*.js` unread); everything below comes
from V8 block ranges (start/end offsets and execution counts), V8 function names, the analyzer's labels, V8
break-location positions and types, console lines and PNGs. Tags as in the body of this file. **Build stamp:** every
capture of this part is itch build **`html/19365073`** (live on 2026-09-25); part 1, the 09-21 captures and the base
findings are build **`html/19251041`**. Where the two differ this part says so as **version drift**, not as a
contradiction of part 1 (P0, and the per-build list in P6).

| capture | build | recorded with | runs | use |
|---|---|---|---|---|
| **`2026-09-25T10-14-02`** (requested run) | 19365073 | `record.mjs --target village --runs 1 --passes coverage --seed 3131 --query "tags=river" --detailed` | gen-0 cold load, seed 3131, `river,isolated`, "Lettice's Water (riverside village)", 24 buildings; gen-1 Enter, seed 1198911812, `no square,isolated`, "St Hilda (village)", 38 buildings, **no water** | block tables P1 |
| `2026-09-25T10-28-58` | 19365073 | same with `--runs 3 --regen reload` | seeds 3131–3134, all `river,isolated` (Lettice's Water, Masci's Court, Leofwin's Song, John's Wall) | four-seed table P3 |
| `2026-09-25T10-14-02/river-windows/` | 19365073 | debugger-driven coverage windows (method in P2; script, JSON and rendering saved there) | seed 3131: `River.new` (31 windows), `Region.createElevation` (4), `Region.new` (14), each a separate cold load | P2 |
| `2026-09-25T10-19-31`, `2026-09-25T10-27-25` | 19365073 | reload runs made before the profiler fix in P5 | gen-0 valid; later gens invalid (`INVALID.txt` in each) | P5 only |

*Completion marker: this part is complete only when it ends with its "What changes for a re-implementer"
paragraph and `docs/lane-events.log` carries the `profile-village-river-blocks LANDED` line.*

### P0. Version drift `html/19251041` → `html/19365073` — part 1's River facts describe the old build

Part 1's capture ran build `html/19251041`; the live Village Generator is now `html/19365073` (`meta.json` baseUrl
of both captures). Same seed 3131, same tags, same name and taverns, but `[SHOWN]`:

| gen-0, seed 3131 | 09-21 (`19251041`, part 1) | 09-25 (`19365073`, this part) |
|---|---|---|
| `River.new` size | 1 890 B | 1 350 B |
| `River.calculateCurvature` | 1 call (280 B) | **not executed** |
| course segments (`dist2segment2` ÷ 16 384) | 51 | **94** |
| `geom.Cubic.*` / `geom.PathTracker.*` | not executed | `smoothOpen` 1, `build` 1, `c` 2, `cubic` 42 / `new` 1, `reset` 1, `length` 6, `getPos` 7, `get_tangent` 7 |
| `Chaikin.render` calls | 180 | 134 |
| shoreline chains (`smoothOpen` = `offsetOpen`) | 2 | 3 |
| buildings / bridges | 29 / 4 | 24 / 3 |
| screenshot MD5 | `07830ecf…` | `5a7f6bc8…` (identical in `10-14-02` and `10-28-58`) |
| seed after one Enter | 202429973 | 1198911812 |

Also new in 09-25 gen-0: `PolyCreate.stripe`, `GraphicsExtender.drawArc`, `Region.spawnAt`, `GableRoof.drawTower`,
openfl `Graphics.curveTo` (40); gone: `GradUtils.beginLinearFill`/`linearGrad`, `MathUtils.pow`, `PolyCreate.rect`.
So part 1's statements that the course is resampled and then Chaikin-smoothed, that `calculateCurvature` is
`River.new`'s last step, and that seed 3131 has 51 segments (≈ 40 px each) hold for `19251041` only. Part 1's claim
that the Enter successor seed is reproducible from the starting seed holds per build: the successor changed with
the build `[INFERRED: it is drawn from the same seeded stream, and gen-0's consumption changed]`. Everything below
describes `19365073`.

### P1. Block trees — build 19365073, `10-14-02` gen-0 (seed 3131, river)

Each first row is the whole function (count = calls); indented rows are V8 blocks, nested by containment. V8 drops
a block whose count equals its parent's, so an absent stretch ran as often as its parent. A block run k times
inside a single call is a loop of k; count 0 is an untaken branch; "÷ enclosing" is the per-parent trip count.
The analyzer labels `River.new`'s inner closure `Building.a`: it sits inside `River.new`'s range (offset 328 636 in
327 882 .. 329 232) `[SHOWN by offsets]`, so the label is wrong; `[INFERRED]` cause: the constructor precedes its
class's `__name__` marker, and the analyzer's class-by-marker rule then falls back to the preceding class. The
"`Building.a` newly executing" of the Critic-2 addendum above (item 1) is this closure.

**Course routines** (`River.new` and its callees that nothing else calls in this run):

| routine (start offset) | block (bytes rel. to start) | bytes | count | ÷ enclosing |
|---|---|---|---|---|
| `River.new` @327,882 | +0..+1350 | 1350 | 1 |  |
|  | ··+212..+220 | 8 | 0 | 0 |
|  | ··+1154..+1157 | 3 | 0 | 0 |
|  | ··+1167..+1201 | 34 | 5 | 5 |
| `River.new › inner closure (analyzer label "Building.a")` @328,636 | +0..+370 | 370 | 7 |  |
|  | ··+95..+97 | 2 | 1 | 0.143 |
|  | ··+97..+99 | 2 | 6 | 0.857 |
| `geom.PathTracker.getPos` @175,488 | +0..+379 | 379 | 7 |  |
|  | ··+29..+43 | 14 | 0 | 0 |
|  | ··+74..+280 | 206 | 4 | 0.571 |
|  | ····+107..+132 | 25 | 0 | 0 |
| `geom.Cubic.smoothOpen` @162,285 | +0..+774 | 774 | 1 |  |
|  | ··+21..+28 | 7 | 0 | 0 |
|  | ··+228..+237 | 9 | 0 | 0 |
|  | ··+357..+728 | 371 | 6 | 6 |
| `geom.Cubic.build` @163,554 | +0..+198 | 198 | 1 |  |
|  | ··+21..+28 | 7 | 0 | 0 |
|  | ··+55..+178 | 123 | 6 | 6 |
|  | ····+136..+177 | 41 | 42 | 7 |

`River.new`'s own body is straight-line code except one 34-byte block run 5 times — a loop of 5 inside the single
call — and two short untaken blocks (8 B at +212, 3 B at +1154). **No loop in `River.new` has a trip count near the
94 segments or the 95 vertices `[SHOWN]`.** The vertex-producing loops are in callees: `Cubic.build` (6 spans × 7
samples = 42 `Cubic.cubic` calls), `Cubic.smoothOpen` (6), `PathTracker.getPos` (4 segment advances over 7 calls).
`Chaikin.render` and `PolyUtils.resample` also serve roads, fields and shores (134 and 36 calls), so their whole-run
block counts mix callers; P2 isolates the River's call.

**Terrain and water routines:**

| routine (start offset) | block (bytes rel. to start) | bytes | count | ÷ enclosing |
|---|---|---|---|---|
| `Region.createElevation` @374,828 | +0..+183 | 183 | 1 |  |
|  | ··+37..+100 | 63 | 0 | 0 |
| `Elevation.digRiver` @336,604 | +0..+350 | 350 | 1 |  |
|  | ··+125..+349 | 224 | 128 | 128 |
|  | ····+160..+349 | 189 | 16,384 | 128 |
|  | ······+325..+329 | 4 | 1,799 | 0.11 |
|  | ······+329..+347 | 18 | 14,585 | 0.89 |
| `Elevation.dist2poly` @332,760 | +0..+148 | 148 | 16,384 |  |
|  | ··+72..+128 | 56 | 1,540,096 | 94 |
|  | ····+120..+127 | 7 | 600,923 | 0.39 |
| `Elevation.dist2segment2` @332,538 | +0..+208 | 208 | 1,540,096 |  |
|  | ··+58..+93 | 35 | 0 | 0 |
| `Water.river` @397,003 | +0..+141 | 141 | 1 |  |
| `Water.setLevel` @398,618 | +0..+201 | 201 | 1 |  |
|  | ··+46..+134 | 88 | 128 | 128 |
|  | ····+87..+124 | 37 | 16,384 | 128 |
| `Water.createDeflection` @398,838 | +0..+467 | 467 | 1 |  |
|  | ··+97..+449 | 352 | 128 | 128 |
|  | ····+138..+439 | 301 | 16,384 | 128 |
|  | ······+167..+180 | 13 | 1,799 | 0.11 |
|  | ······+180..+438 | 258 | 14,585 | 0.89 |
|  | ········+206..+208 | 2 | 2,048 | 0.14 |
|  | ········+208..+212 | 4 | 12,537 | 0.86 |
|  | ········+229..+239 | 10 | 1,876 | 0.129 |
|  | ········+239..+245 | 6 | 12,709 | 0.871 |
|  | ········+251..+253 | 2 | 2,022 | 0.139 |
|  | ········+253..+257 | 4 | 12,563 | 0.861 |
|  | ········+274..+284 | 10 | 1,871 | 0.128 |
|  | ········+284..+290 | 6 | 12,714 | 0.872 |
|  | ········+296..+399 | 103 | 448,081 | 30.7 |
|  | ··········+323..+399 | 76 | 13,769,048 | 30.7 |
|  | ············+359..+365 | 6 | 13,754,463 | 0.999 |
|  | ············+365..+381 | 16 | 10,330,605 | 0.75 |
|  | ············+381..+398 | 17 | 901,825 | 0.0655 |
|  | ········+410..+416 | 6 | 7,787 | 0.534 |
|  | ········+416..+431 | 15 | 6,835 | 0.469 |
|  | ········+431..+436 | 5 | 7,750 | 0.531 |
| `Water.getGrid` @396,384 | +0..+269 | 269 | 1 |  |
|  | ··+164..+247 | 83 | 129 | 129 |
|  | ····+199..+237 | 38 | 16,641 | 129 |
| `Water.linkSegments` @396,051 | +0..+321 | 321 | 1 |  |
|  | ··+37..+312 | 275 | 3 | 3 |
|  | ····+78..+302 | 224 | 149 | 49.7 |
|  | ······+108..+259 | 151 | 35,048 | 235 |
|  | ········+134..+143 | 9 | 268 | 0.00765 |
|  | ········+144..+175 | 31 | 0 | 0 |
|  | ········+187..+216 | 29 | 268 | 0.00765 |
|  | ········+216..+258 | 42 | 34,780 | 0.992 |
|  | ··········+225..+258 | 33 | 289 | 0.00831 |
|  | ······+273..+291 | 18 | 146 | 0.98 |
|  | ······+291..+301 | 10 | 3 | 0.0201 |
| `Water.buildCurves` @399,318 | +0..+825 | 825 | 1 |  |
|  | ··+81..+576 | 495 | 128 | 128 |
|  | ····+116..+576 | 460 | 16,384 | 128 |
|  | ······+145..+575 | 430 | 1,799 | 0.11 |
|  | ········+208..+253 | 45 | 145 | 0.0806 |
|  | ········+277..+312 | 35 | 1,776 | 0.987 |
|  | ········+312..+361 | 49 | 122 | 0.0678 |
|  | ········+420..+465 | 45 | 152 | 0.0845 |
|  | ········+508..+524 | 16 | 1,788 | 0.994 |
|  | ········+524..+574 | 50 | 141 | 0.0784 |
|  | ··+681..+768 | 87 | 3 | 3 |
|  | ····+722..+724 | 2 | 0 | 0 |
|  | ····+764..+766 | 2 | 0 | 0 |
| `Water.createPatches` @400,158 | +0..+1050 | 1050 | 2 |  |
|  | ··+46..+125 | 79 | 6 | 3 |
|  | ····+81..+106 | 25 | 0 | 0 |
|  | ··+296..+336 | 40 | 256 | 128 |
|  | ··+361..+409 | 48 | 256 | 128 |
|  | ··+434..+492 | 58 | 256 | 128 |
|  | ··+517..+567 | 50 | 256 | 128 |
|  | ··+624..+708 | 84 | 6 | 3 |
|  | ··+725..+1041 | 316 | 6 | 3 |
|  | ····+787..+1040 | 253 | 512 | 85.3 |
|  | ······+843..+860 | 17 | 4 | 0.00781 |
|  | ······+860..+885 | 25 | 508 | 0.992 |
|  | ······+885..+990 | 105 | 655 | 1.28 |
|  | ········+912..+989 | 77 | 2 | 0.00305 |
|  | ··········+933..+954 | 21 | 82 | 41 |
|  | ······+990..+995 | 5 | 508 | 0.992 |
|  | ······+995..+1001 | 6 | 2 | 0.00391 |
|  | ······+1001..+1028 | 27 | 506 | 0.988 |
|  | ······+1028..+1039 | 11 | 4 | 0.00781 |

(`Elevation.new`, gen-0: five untaken blocks — +413..+426, +496..+674, +689..+895, +931..+958, +1036..+1178 —
`[INFERRED]` the unused per-water-type arms; `Elevation.createGradient`: 127 × 127 = 16 129 cell pairs plus a
trailing loop of 127 `[SHOWN]`.)

Loop structure `[SHOWN counts]` and reading:
* **Every grid pass is a 128 × 128 double loop** (128 then 16 384) — `digRiver`, `setLevel`, `createDeflection`,
  `buildCurves` — and `getGrid` is 129 × 129 = 16 641, a lattice one larger than the cell grid `[INFERRED: contour
  vertices on cell corners]`.
* **1 799 cells** take the short arm in `digRiver` (4 B vs 18 B), the 13-B early exit in `createDeflection`, and
  the 430-B body in `buildCurves`; the other 14 585 take the complements. The same split in three routines means
  one per-cell class `[SHOWN]` — `[INFERRED]` the cells carved into the river bed, i.e. water (11.0 % of the grid).
* **`dist2poly` scans all 94 segments for every cell** (1 540 096 = 16 384 × 94) and lowers its running minimum
  600 923 times (36.7 per cell) `[SHOWN]` — a plain linear scan with no early exit or spatial index `[INFERRED]`.
  `dist2segment2`'s only branch (35 B) never runs in 1.54 M calls `[SHOWN]` — `[INFERRED]` the zero-length-segment
  guard: resampled segments are never degenerate.
* **`createDeflection` behaves like a windowed search around every land cell.** Each of the 14 585 land cells runs four
  two-way tests, then a double loop of 448 081 outer (30.7 per land cell) × 13 769 048 inner iterations (30.7 per
  outer, 944 per land cell) `[SHOWN]`. Over the four seeds of P3 the inner count per land cell is 944, 946, 948,
  946 `[SHOWN]` — `[INFERRED]` a fixed window of about 31 × 31 = 961 cells, clipped at the map edge. This
  13.8–14.5 M-step loop is the cost part 1 timed at 57 ms (build 19251041, whose `Water.*` routines have exactly the
  same byte sizes, P6), and it turns part 1's weak "cost tracks land area" into a proportionality for build 19365073:
  cost = land cells × ≈ 945 inner steps. The first of the four tests fires exactly 2 048 =
  16 × 128 times in all four seeds `[SHOWN]` (meaning unknown).
* **`buildCurves`**: inside the 1 799 water cells, six edge arms fire 122–1 788 times `[SHOWN]` — `[INFERRED]`
  per-side boundary tests that emit a shore segment where a neighbour is land; then a loop over chains (3 here, 2 at
  seeds 3132–3134) = the `smoothOpen` count. **`linkSegments`** chains 149 segments over 3 chains with 35 048
  inner search steps (≈ 235 per step) `[SHOWN]` — quadratic linking `[INFERRED]`. **`createPatches`** (2 calls):
  four loops of 256 = 128 per call per map side `[SHOWN]` — `[INFERRED]` walks along the four map borders to close
  the patches.

**gen-1 (Enter, seed 1198911812, no water) `[SHOWN]`:** `River.*`, `digRiver`, `dist2*`, `Water.river`, `setLevel`,
`createDeflection`, `getGrid`, `linkSegments`, `buildCurves`, `createPatches` all 0 calls (`Region.createWater` runs
once and builds nothing). `Region.createElevation` leaves +37..+136 untaken, against +37..+100 in the river run, so
the river's call site lies in +100..+136 `[INFERRED]`. The waterless map's shape primitive is `Elevation.createHill →
createMount` (a 128 × 128 pass with arms of 94 and 350 cells); `createHill` executed in none of the 09-21 runs, where
a waterless map ran `updateMinMax` alone — `[INFERRED]` a hill feature that is new in 19365073 or was not sampled
before. The keep-coverage-running method works across an Enter regeneration: 848 of 857 functions carry block ranges.

| routine (start offset) | block (bytes rel. to start) | bytes | count | ÷ enclosing |
|---|---|---|---|---|
| `Region.createElevation` @374,828 | +0..+183 | 183 | 1 |  |
|  | ··+37..+136 | 99 | 0 | 0 |
| `Elevation.new` @331,007 | +0..+1418 | 1418 | 1 |  |
|  | ··+413..+426 | 13 | 0 | 0 |
|  | ··+581..+673 | 92 | 0 | 0 |
|  | ··+674..+959 | 285 | 0 | 0 |
|  | ··+1022..+1036 | 14 | 0 | 0 |
|  | ··+1178..+1378 | 200 | 0 | 0 |
| `Elevation.createMount` @333,797 | +0..+261 | 261 | 1 |  |
|  | ··+51..+260 | 209 | 128 | 128 |
|  | ····+106..+260 | 154 | 16,384 | 128 |
|  | ······+219..+233 | 14 | 94 | 0.00574 |
|  | ······+244..+259 | 15 | 350 | 0.0214 |

### P2. `River.new` call by call — build 19365073, seed 3131 (`10-14-02/river-windows/River.new.seed3131.*`)

**Method (re-runnable from `profiler/`: `node ../captures/village/2026-09-25T10-14-02/river-windows/river-windows.mjs
<build index URL> 3131 jg 327882 <out.json>`; render with `winreport.py`).** Detailed coverage runs from the first
load. The debugger pauses the running page, evaluates the constructor's V8 name (`jg`) in a bundle frame, checks
its Haxe `__name__` (`com.watabou.village.model.River`) and reads its `[[FunctionLocation]]` (line 643, column
440 = offset 327 882). A URL breakpoint there catches the constructor on a reload of the same seed; V8's
`getPossibleBreakpoints(restrictToFunction)` lists the constructor's own break locations (43, of which 18 are
`call`/`return`), each gets a breakpoint, and at every pause `Profiler.takePreciseCoverage` returns exactly what ran
since the previous pause. No source text is requested. Columns on line 643 convert to function offsets; lines
644–646 do not (line starts are not read), so steps are named by V8 line:column.

| step | break location | hits | Village.js calls in the window | reading |
|---|---|---|---|---|
| 0 | entry 643:450 → first call | 1 | none | set-up |
| 1, 2 | 643:462 (+22), 644:205 | 1 each | none | native calls (Math/Array) |
| 3, 4 | 644:292, 644:312 | 1 each | `Point.polar` 1 (+ `Point.new` 1) each | skeleton points A, B |
| 5 | 644:410 | 1 | `Point.new` 1 | skeleton point C (an argument of step 6) |
| 6 | 644:400 | 1 | **`Chaikin.render` 1: outer loop (+51..+460) 2, inner loop (+95..+211) 3**; `GeomUtils.lerp` 6, `Point.new` 6 | 3 points → 6 |
| 7 | 645:142 | 1 | none | native |
| 8 | 645:159 | 1 | `PathTracker.new` 1 (+ `reset` 1) | tracker on the base curve |
| 9 | 646:60 | 1 | closure 1 → `PathTracker.getPos` 1, `get_tangent` 1, `lerp` 1, `Point.new` 2; `River.new` block +1157..+1159 1, loop block +1167..+1201 1 | knot 1; the two-way choice before the loop |
| 10–12 | 646:91, 646:108, 646:133 | **5 each** | 91: closure 1 (`getPos`, `get_tangent`, `lerp`); 108: none; 133: `PathTracker.length` 1 → `PolyCore.$length` loop **5** (`Point.distance` 5) | loop: knots 2–6, a native call, re-measure the 5-segment (6-vertex) base curve |
| 13–15 | 646:169, 646:160, 646:155 | 1 each | 169: `PathTracker.length` 1 (loop 5) and `River.new` post-loop block +1201..+1349; 160: closure 1; 155: none | knot 7 at the end (nested call; 169 evaluates first) |
| 16 | 646:195 | 1 | **`Cubic.smoothOpen` 1 (loop 6), `Cubic.c` 2, `Cubic.build` 1 (loop 6, inner 42), `Cubic.cubic` 42**; `Point.new` 99, `normalize` 30, `subtract` 22, `add` 14, `clone` 7, `distance` 6 | cubic spline through 7 knots, 7 samples per span |
| 17 | 646:236 | 1 | **`PolyUtils.resample` 1: loop (+77..+183) 141 = emit arm (+86..+120) 93 + advance arm (+120..+183) 48 [end +142..+148: 1, next segment +148..+183: 47]**; `lerp` 93, `Point.new` 93, `Point.distance` 49 | 48-segment spline polyline → 93 new points |
| 18 | return 646:271 | 1 | — | — |

**No `com.watabou.utils.Random.*` call runs in any of the 30 windows `[SHOWN]`**, nor in `Region.createElevation`
before the River call (`Region.createElevation.seed3131.json`: window 1 holds all of `River.new`, window 2
`Elevation.new`), nor in `Region.new` before `createElevation` apart from one `Random.reset`
(`Region.new.seed3131.json`: the first `Random.float` calls — 1 149 — come inside `Region.roll`). No noise routine
runs in the windows either.

### P3. Four river seeds — build 19365073, `2026-09-25T10-28-58` (`--regen reload`)

| seed, village | knots k (closure = `getPos` = `get_tangent`) | `River.new` loop | `PathTracker.length` | Cubic spans × samples | course segments | arm taken before the loop | closure branch +95 / +97 | river cells (short arm) | `createDeflection` inner ÷ land cell | shore chains |
|---|---|---|---|---|---|---|---|---|---|---|
| 3131 Lettice's Water | 7 | 5 | 6 | 6 × 7 = 42 | 94 | +1157 | 1 / 6 | 1 799 | 944.1 | 3 |
| 3132 Masci's Court | 6 | 4 | 5 | 5 × 7 = 35 | 91 | +1154 | 1 / 5 | 1 404 | 946.1 | 2 |
| 3133 Leofwin's Song | 7 | 5 | 6 | 6 × 7 = 42 | 84 | +1154 | 5 / 2 | 1 116 | 947.6 | 2 |
| 3134 John's Wall | 6 | 4 | 5 | 5 × 7 = 35 | 64 | +1154 | 5 / 1 | 1 360 | 945.7 | 2 |

Identities in all four `[SHOWN]`: closure = `getPos` = `get_tangent` = k; `River.new` loop = k − 2;
`PathTracker.length` = k − 1; `Cubic.smoothOpen` loop = `Cubic.build` outer loop = k − 1; `Cubic.cubic` = 7(k − 1);
`Cubic.c` = 2; `PathTracker.new` = `reset` = 1. The segment count is not a function of k (91 segments with k = 6
against 84 with k = 7). Seed 3131 gives the same counts and the same screenshot in `10-14-02` and `10-28-58`, and
the same `dist2segment2` and `digRiver` split in the gen-0 of all four 09-25 captures: the course is deterministic
per seed `[SHOWN]`. The noise identity of part 1 (`a = 16 384 × Elevation.new` exactly, `Perlin.new = 5E + 6`,
`Noise.fractal = E + 1`) holds in all six runs of this part `[SHOWN]` — also a check that the detailed counts are exact.

### P4. The river course in build 19365073 — refined construction

1. **Skeleton:** two `Point.polar` points and one `new Point` `[SHOWN]` — `[INFERRED]` entry and exit on a circle
   round the map centre plus one interior point; which point is the middle one is not in the counts.
2. **Base curve:** one `Chaikin.render` call, outer loop 2, inner loop 3 in total, 6 lerps, 6 new points `[SHOWN]` →
   **2 passes, 3 → 4 → 6 points** `[INFERRED from the arithmetic: an open-curve pass cuts the n − 2 interior corners,
   1 then 2]`, confirmed by the tracked path having 6 vertices (`PolyCore.$length` loops 5 per call) `[SHOWN]`.
3. **Control points (knots): k = 6–7** — one at the start, k − 2 in a loop that re-measures the base curve each
   time, one at the end `[SHOWN]`; each knot is `getPos` + `get_tangent` on the base curve plus one lerp and two new
   points `[SHOWN]` — `[INFERRED]` a point on the base curve pushed sideways along its normal, at even arc-length
   stations, so k grows with the base curve's length. The closure's two-way branch splits 1/6, 1/5, 5/2, 5/1
   `[SHOWN]`: not a strict alternation, so not a plain ± zigzag `[INFERRED]`.
4. **Spline:** `Cubic.smoothOpen` through the k knots; `Cubic.build` evaluates 7 points per span `[SHOWN]` → a
   polyline of 8k − 7 vertices (49 at k = 7) `[INFERRED formula; SHOWN for seed 3131 as resample's 48 input segments]`.
5. **Resampling:** one `PolyUtils.resample` call emits 93 points `[SHOWN]` → 95 vertices with the two ends
   `[INFERRED]` = **94 segments** `[SHOWN: dist2segment2 ÷ 16 384]`; 91, 84, 64 segments at seeds 3132–3134. The walk
   emits a point whenever the accumulated length reaches a step `[INFERRED: fixed step]`; the step in px is not in
   the counts.
6. **No curvature pass** — `calculateCurvature` does not execute, and nothing in the windows computes one `[SHOWN]`.
7. **No shared-RNG call inside the constructor** `[SHOWN]`, yet the course varies with the seed and is identical
   across sessions `[SHOWN]` — `[INFERRED]` the seed arrives through an RNG step the Haxe compiler inlined (an
   inlined step leaves no call to count) or through state prepared earlier; open (P6).

Part 1's hypothesis table, re-scored for **build 19365073**: H-R1 (random polyline from `Random` draws → resample →
Chaikin → curvature) is refuted in every specific (no `Random` call; Chaikin before, on a 3-point skeleton; a
cubic spline; no curvature) `[SHOWN]`; H-R2 (noise-warped) stays refuted `[SHOWN]`; H-R3 (midpoint displacement) is
refuted — one loop of k − 2, no doubling nests `[SHOWN]`; **H-R4 (spline through control points) holds**
`[SHOWN]`. For build 19251041 part 1's scoring stands (no spline evaluator executed there): version drift, not a
correction.

### P5. Profiler: `--detailed`, and three hazards of block coverage across generations

`record.mjs --detailed` passes `detailed: true` to `Profiler.startPreciseCoverage`; without the flag the coverage
pass issues exactly the calls it did before. `analyze.mjs` needed no change: it reads only `ranges[0]`, the
whole-function range, which detailed coverage keeps (reports and `calls.json` of all captures here were produced by
it). Three hazards, each measured:
* **Stop/start drops blocks `[SHOWN, scratch test page]`.** V8 puts block counters only into code compiled while
  detailed coverage runs, and `stopPreciseCoverage` removes them: a function that reported blocks 10/4/6 in gen-0
  reported only its whole-function range after stop → start. So with `--detailed` coverage stays on for the pass and
  each generation starts with a discarded `takePreciseCoverage` (a counter reset). Verified on an Enter regeneration
  (`10-14-02` gen-1: 848 of 857 functions carry blocks).
* **Reloads reuse the compiled script `[SHOWN, 10-19-31]`.** With `--regen reload`, V8's in-memory compilation cache
  hands the new document gen-0's script (same scriptId in every generation): hot functions go almost uncounted
  (`dist2poly` 26–34 instead of 16 384) and blocks vanish. An enabled debugger (all pauses skipped) turns that
  cache off.
* **…and Chrome's code cache `[SHOWN, 10-27-25]`.** With the debugger on but the HTTP cache on, the third and fourth
  loads consumed Chrome's code cache — the same breakage — and the second lost V8's inferred function names: read by
  offset, its counts equal `10-28-58` gen-1 exactly (`Noise.fractal` 2, `Random.reset` 7, `dist2poly` 16 384), but
  its analyzer labels degrade to `(anon@offset)`, so label-based reads see 0 — the reading behind Critic-2 item 1's
  "partial" for that generation. `--detailed` now also sets `Network.setCacheDisabled`. With both
  (`10-28-58`): a fresh scriptId per load, 1 346–1 359 block-covered functions per generation, 91 anonymous labels
  in every generation as on a cold load, exact identities (P3).

Side effect of reload captures in general `[SHOWN]`: each later generation's coverage also lists the previous
document's script (43 functions, 88 calls of teardown), which `analyze.mjs` merges by label into `calls.json`.

### P6. What is open, the discriminating tests, and which claims hold for which build

* **Where the seed enters `River.new`.** Test: pause at its entry and its return (the P2 script's optional probe
  argument) and read the numeric state of the class whose Haxe `__name__` is `com.watabou.utils.Random`; a changed
  state means an inlined RNG step. (A first probe failed: the V8-name path `A.m` does not resolve from `River.new`'s
  frame; locate the class by its `__name__` instead.)
* **What the knot branch decides and how far knots move.** Read the closure's returned points (runtime values) at the
  seven knot pauses: sign-and-amplitude per knot, and whether the push is along the normal.
* **The resample step in px.** Visible course length on the four `10-28-58` PNGs ÷ 94/91/84/64; a fixed step predicts
  a constant px per segment (part 1: 39–42 px on the old build).
* **The knot-count rule (6 vs 7).** Read `PathTracker.length`'s return value at the loop pauses; k − 1 =
  ⌊length ÷ spacing⌋ with a constant spacing would confirm arc-length stations.
* **Part 1's questions for build 19251041** (raw vertex count, Chaikin passes, curvature per vertex) can no longer
  be measured live: replay `captures/village/2026-09-21T11-25-55` offline by serving its saved network bodies
  through request interception, with `--detailed`.

**Build 19251041 only (part 1, 09-21 captures):** `River.new` 1 890 B; resample → Chaikin → `calculateCurvature` as
the constructor's last step; 51/41/36 segments in its three river runs, ≈ 40 px per segment; successor seed
202429973 after seed 3131. **Both builds `[SHOWN in each]`:** the course is made inside `createElevation` before any
noise object; one `River.new` per river; `dist2poly` = 16 384 × polylines with `dist2segment2` = 16 384 × segments;
the exact noise identity; the extraction path `Water.river → setLevel → createDeflection → getGrid → linkSegments →
buildCurves → createPatches` (every `Water.*` routine that ran in both gen-0s keeps its exact byte size,
`Region.createElevation`/`createWater` too, `Elevation.*` within 1 B `[SHOWN]` — so the extraction code is probably
unchanged `[INFERRED]`). **Build 19365073 only (this part):** everything in P1–P4 —
Chaikin on a 3-point skeleton, PathTracker knots, the cubic spline, no curvature, no shared-RNG call inside the
constructor, 94/91/84/64 segments, and the block-level loop structure (block counts did not exist for the old build).

### What changes for a re-implementer

Stamp every reference output with the generator build: VG's live build changes without notice, and seed-for-seed
outputs change with it. For the current build (19365073), replace part 1's course recipe with a spline recipe:
two points on a circle and one interior point, Chaikin-cut twice into a 6-point base curve; 6–7 knots at even
stations along that curve, each pushed sideways along the local normal (the per-knot choice is the only per-river
decision inside the constructor); a cubic spline through the knots at 8 sub-segments per span; then a fixed-step
resample (64–94 segments on these maps). No curvature pass, no noise, and no call to the shared RNG in the
constructor — which values carry the seed is still open. The terrain and water stages keep their structure and
their costs: carve by the exact distance from each of the 128² cells to every course segment (a linear scan,
1.0–1.5 M point–segment tests), treat the carved cells (7–11 % of the grid here) as water, and budget the
extraction by land area — `createDeflection` spends about 945 inner steps per land cell (a window of about 31 × 31
cells), 13.8–14.5 M steps per map, while the whole course is a few hundred point operations (0.35 ms cold on the old
build; not timed on this one).

## New-build block-coverage addendum (2026-09-25) — captures/village/2026-09-25T19-03-50

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B08.

**Scope.** This addendum answers the third critic seat's request (`_critic-vg-ng.md` §6 items 2–4 and its "most
valuable next measurement — VG"): block coverage on the new build of `Region.createDensity`, `Palisade.new` and its
callees, `PoissonPattern.warp`, the `Network`/`Tracker` routines and `River.new`. It is clean-room as in part 2: no
captured bundle was opened. Everything comes from V8 block ranges (offsets and counts), analyzer labels, console
lines, `meta.json` hrefs and PNGs. Block trees were extracted with `captures/village/2026-09-25T19-03-50/blocks/blocktree2.py`,
which matches each label to its V8 function by call count and byte length and resolves ties by the class's own offset
span. `blocks/cmp.py` then lays the runs side by side. Outputs: `blocks/blocks-<capture>-gen<N>.{txt,json}`, plus the
side-by-side tables `blocks/cmp-density-poisson.txt`, `cmp-network.txt`, `cmp-river.txt` and `pal-cmp.txt`. In those
tables "=" means that V8 dropped the block because it ran as often as its parent.

**Build stamp `[SHOWN, meta.json baseUrl]`:** all four captures ran **`html/19365073`**. That is the same build as part 2,
not a newer one.

| capture | recorded with | runs: seed, tags (meta.json href), buildings (console) |
|---|---|---|
| **`2026-09-25T19-03-50`** (requested) | `record.mjs --target village --runs 3 --passes coverage --seed 3131 --query "tags=river" --detailed` | gen-0 cold, 3131 `river,isolated`, 24 · gen-1 Enter, 1198911812 `no square,isolated`, 38 · gen-2 Enter, 2037831868 `river,organic,no square,crossroads`, 10 · gen-3 Enter, 594377153 `sparse,river,no square,crossroads`, 22 ("Beatle Rest") |
| `2026-09-25T19-04-26` | same, with `--runs 2 --regen reload --query "tags=palisade"` | 3131, 3132, 3133 `palisade,isolated`: 35, 58, 29 |
| `2026-09-25T19-07-01` | same, with `--runs 3 --regen reload --query "tags=sparse,river"` | 3131–3134 `sparse,river,isolated`: 9, 12, 16, 20 |
| `2026-09-25T19-07-16` | same, with `--runs 1 --regen reload --query "tags=sparse"` | 3131, 3132 `sparse,isolated`: 19, 10 |

*Lane decision (recorded so it can be vetoed):* none of the three Enter regenerations rolled `palisade`, so
`Palisade.new` did not execute in the requested capture. I therefore added `19-04-26`. I added `19-07-01` and
`19-07-16` to test whether `sparse` gates the createDensity arm found in gen-3 (N1). All three are reload captures
with a fresh scriptId per load (4/16/30, 4/18/30/43, 5/18) and 761–807 block-covered functions per generation, so
part 2's P5 guards held `[SHOWN]`.

### N0. Reproducibility on 19365073

`19-03-50` gen-0 and gen-1 reproduce `10-14-02` gen-0 and gen-1. Every `village.model.*`, `geom.*` and `utils.*`
call count is equal. The only differences are frame-timer counts (`Updater.fire`) and label moves from the analyzer
label fix: the River closure is now labelled **`River.a`** (previously `Building.a`, as part 2 P1 predicted), and the
counts previously labelled `Elevation.g` / `Elevation.(anon@339846|339867)` now carry `Farmland.*` labels with the
same counts `[SHOWN, calls.json]`. A reader who cites `Elevation.g` (for example `docs/confidence/vg-challenge-under.md`
§4.2) should identify it by offset. The Enter successor of seed 3131 is again 1198911812.

### N1. `Region.createDensity` (@375 026, 1 208 B), 13 runs (with the 6 of `vg-challenge-under` §4.1: 19)

| block | bytes | river runs (19-03-50 g0, g2; 19-07-01 ×4) | **19-03-50 g3** | dry runs (19-03-50 g1; 19-04-26 ×3; 19-07-16 ×2) |
|---|---|---|---|---|
| +309..+408 | 99 | 1 | 1 | **0** |
| +409..+682 | 273 | 0 | **1** | 0 |
| ··+469..+681 | 212 | – | **2** | – |
| ····+509..+680 | 171 | – | **142** (71 ÷ outer) | – |
| ······+577..+679 | 102 | – | **138** (0.972) | – |
| +682..+774 | 92 | 1 | **0** | 1 |
| +909..+1193 | 284 | 128 | 128 | 128 |
| ··+954..+1183 | 229 | 16 384 | 16 384 | 16 384 |
| ····+1034..+1058 | 24 | 0 | 0 | 0 |

* **The per-cell pass is the same in 13/13 runs** `[SHOWN]`: one 128 × 128 double loop with a 229-B body that contains
  no loop, and a 24-B in-loop branch that never fires. `Region.getHeart` (260 B) has no block in 13/13.
* **+309..+408 (99 B, no loop) runs if and only if the map has water**: 1 in 7/7 river runs and 0 in 6/6 dry runs `[SHOWN]`.
  A water term is therefore set up once before the cell loop, not searched per cell.
* **The 273-B arm runs in 1 of the 19 recorded runs of this build** (gen-3, seed 594377153) `[SHOWN]`. There its complement
  +682..+774 (92 B, no loop) is untaken, so the two are the arms of one if/else before the cell loop. Inside the arm,
  a loop of 2 contains an inner loop of 142 in total (71 per outer iteration), and a 102-B branch inside that runs 138 times.
* **Identity with the shoreline chains** `[SHOWN, same run]`: `PolyUtils.offsetOpen` is called 2 times with a vertex loop
  of 142, two end arms of 2 each and an interior arm of 138. In the same run `PolyUtils.smoothOpen` = 2,
  `Water.buildCurves`' chain loop = 2 and `Water.linkSegments` = 2 chains of 35 segments. So the arm walks two open
  polylines with 142 vertices in total and acts on their 138 interior vertices (142 − 2 × 2): the same counts as the
  two smoothed shoreline chains `[INFERRED: the same data; 2 × (2·36 − 1) = 142 fits a midpoint-inserting smoothing of
  36-vertex chains]`. The 102-B body has no rarer nested block, so it is not a running argmin with an `if`.
* **What does not gate the arm** `[SHOWN]`: the `sparse` tag (4 `sparse,river` and 2 `sparse` runs leave it untaken),
  `crossroads` (gen-2 has it, untaken), and water alone (6 other river runs, untaken). Whatever gates it is a per-map
  condition or roll that is not visible in the tags `[INFERRED]`.

### N2. Palisade: first block-level record (seeds 3131–3133, `palisade,isolated`; `pal-cmp.txt`)

| quantity `[SHOWN counts]` | 3131 | 3132 | 3133 |
|---|---|---|---|
| buildings (console) | 35 | 58 | 29 |
| `Palisade.getPopulated` (841 B): outer × inner loop | 10 × 10 | 10 × 10 | 10 × 10 |
| … second loop over the 100 values / kept (+820..+831) | 100 / **19** | 100 / **20** | 100 / **13** |
| `ConvexHull.ofSet` loops 1 / 2 / 3 | 18 / **19** / 9 | 19 / **20** / 10 | 12 / **13** / 7 |
| `ConvexHull` closure (the old build's "91") | 18 | 22 | 13 |
| `ConvexHull.ofPoly` loop | 7 | 8 | 5 |
| `Palisade.clean`: outer loop / inner / removal arm | 2 / 15 / 1 | 5 / 35 / 10 | 1 / 7 / 0 |
| `Cubic.smoothClosed` spans = `Cubic.build` outer | 7 | 5 | 7 |
| `Cubic.cubic` = build inner (per span) | 77 (11) | 55 (11) | 77 (11) |
| `Palisade.blocks` calls = `Tracker.endBridge` calls = `Network.build` +3141..+5400 | 213 | 303 | 230 |
| `blocks` inner loop (÷ call) | 7 179 (33.7) | 13 031 (43.0) | 6 743 (29.3) |
| `getClosestSeg` calls = `Network.build` +4550..+4730 | 15 | 19 | 15 |
| `getClosestSeg` inner loop (÷ call) | 505 (33.7) | 822 (43.3) | 430 (28.7) |
| `finalize` loop 1 / loop 2 | 3 / 35 | 4 / 45 | 3 / 30 |
| `addGate` = `Gate.new` = `getBuildings` loops = `PalisadeView.draw` pieces = `drawPassageShadow` | 3 | 4 | 3 |
| `validateGate` calls | 4 | 5 | 3 |
| `overlaps` = `BitMap.check` | 1 626 | 1 134 | 1 587 |
| `BitMap.new` loop = a `lime ImageDataUtil.getPixels` block = `ByteArrayData.readUnsignedInt` calls | 77 816 | 117 633 | 54 846 |
| `PalisadeView.draw` inner loop (posts; two equal blocks) | 242 | 316 | 206 |

1. **The hull is built over lattice samples, not over building corners** `[SHOWN identity 3/3]`. `getPopulated` loops over
   a 10 × 10 lattice and keeps 19/20/13 samples. `ConvexHull.ofSet`'s second loop equals that kept count and its
   first loop is kept − 1. Building corners would number 140/232/116. No label is called 100 times in these runs, so
   the lattice reads a grid inline, without a call per sample `[SHOWN]`. The "91 hulled points" of §4.9 (build 19251041)
   was the call count of the hull's closure. On this build that closure runs 18/22/13 times, which is not the point
   count `[SHOWN]`; that the same held on 19251041 is `[INFERRED]`. It is most likely a sort comparator `[INFERRED]`.
2. **The hull is cleaned, then drawn as a closed spline** `[SHOWN]`. `ofSet`'s third loop is 9/10/7 (= h, the hull size
   `[INFERRED]`), and `ofPoly`'s loop is h − 2 in 3/3. `clean` runs, and then `Cubic.smoothClosed` passes through
   7/5/7 control points with 11 samples per span, so `clean` removes 2/5/0 hull vertices `[INFERRED]`.
3. **The palisade exists before the roads** `[SHOWN identities 3/3]`. `Palisade.blocks` is called once per tracker step
   (= `Tracker.endBridge` = `Network.build`'s per-step block). `getClosestSeg` is called exactly as often as a
   `Network.build` block (+4550..+4730). That block sits inside a 209-B per-step arm (+4521..+4730) that runs on the
   3 palisade maps and on none of the 10 others. So every tracker step asks the wall whether it blocks, and 15/19/15
   steps snap to the closest wall segment, which gives the gate candidates (3/4/3 gates, 4/5/3 validations).
   **§4.0's stage 2i (palisade after `placeBuildings`) is wrong for this build.** The palisade precedes `Network.build`,
   and so precedes every building `[INFERRED from the identities; the order has not been timed]`.
4. **Wall resolution** `[INFERRED]`. `blocks` and `getClosestSeg` both loop about 33.7/43/29 times per call, and
   `finalize`'s second loop is 35/45/30, so the wall polygon has about 34–35/43–45/29–30 vertices. That count is
   neither h nor the spline sample count (77/55/77). It tracks size instead: vertices ÷ √(BitMap pixels) =
   0.125/0.131/0.128. This fits a fixed-step resample of the smoothed ring. The posts come to 6.9–7.0 per wall vertex
   (242/35, 316/45, 206/30).
5. **The BitMap is a read-back raster** `[SHOWN identity 3/3]`. The pixels are read back from something drawn with
   OpenFL (its fill loop equals a `getPixels` block and the `readUnsignedInt` calls). The near-square factorisations are
   284 × 274, 339 × 347 and 198 × 277 `[arithmetic; that these are W × H is INFERRED]`. `overlaps` tests against this
   raster 1 134–1 626 times.
6. `Palisade.new` (377 B) is straight-line code. Its 68-B arm is never taken, and its 18-B arm is untaken in 3131 only. `getBuildings` loops once per gate,
   and its 528-B arm is never taken. `finalize`'s 360-B tail arm is never taken `[SHOWN]`.

### N3. `PoissonPattern.warp` (@177 275, 130 B), 13 runs (`cmp-density-poisson.txt`)

* **Call identity in 13/13 runs** `[SHOWN]`: `warp` = `validate` + `uneven`'s loop. For example 6 851 = 6 800 + 51,
  5 299 = 5 250 + 49, and 9 501 = 9 400 + 101 for two `uneven` calls. So each of `uneven`'s about 50 initial points
  and each of `step`'s candidates passes through `warp` once. `emit` = accepted candidates (`validate`'s true exit) + 1
  per `PoissonPattern.new`, and `step` always runs all 50 candidates, in 13/13.
* **Shape** `[SHOWN]`: two mirrored if/else-if pairs, one per coordinate. Per run, the first arms fire 177–434 times
  and the nested arms 192–475 times, which is about 3–7 % of calls per side. There is no loop and no call.
* **`PoissonPattern.fill`** `[SHOWN]`: in the 10 runs with 1 call, a 6 × 6 double loop (36 = 6 per outer) around an
  inner loop of 18–21 per cell. In the 3 runs with 2 calls, the second call adds a smaller grid (3 × 3, 2 × 2 or 1 × 2).

### N4. `Network` / `Tracker`, 13 runs (`cmp-network.txt`)

* `Tracker.flexibility` is a four-way switch `[SHOWN]`. Arm 1 (+39..+55) fires only on the two maps that run
  `Region.initHighway`: 129 of 246 steps in gen-2, and all 275 in gen-3, where arms 2–3 never run. Arm 4 never fires
  in 13 runs. Arm 1 is therefore the highway class `[INFERRED from co-occurrence, 2/2 against 0/11]`.
* `Network.build`'s 2 755-B arm (+109..+2864) runs on the same two maps only. Its step loop is 138/147, which is
  `Network.(anon@357887)` − 1. The general round loop runs 59–108 rounds `[SHOWN]`.
* `Network.avoidWater` takes a 12-B early exit on 6/6 dry maps and runs its 140-B body on 7/7 water maps `[SHOWN]`.
* The body of `Tracker.endBridge` (+31..+150) runs exactly `Tracker.startBridge` times in 13/13
  (3/0/2/3/0/0/0/1/1/1/2/0/0) `[SHOWN]`. Each bridge therefore closes at the first check after it opens: a bridge is
  one tracker step `[INFERRED]`.
* `Network.findRoadAhead`'s 130-B hit arm (+321..+451) equals `Tracker.shortcut` calls (3, 1, and 0 elsewhere) in
  13/13 `[SHOWN]`.
* Gen-3 (the all-highway map) runs `Network.getTrackersAround` 0 times and `Region.getBuildingsAround` 0 times
  `[SHOWN]`. This is unexplained.

### N5. `River.new` on 19365073, 7 river runs (`cmp-river.txt`)

* Part 2's identities hold in 7/7 `[SHOWN]`: closure (`River.a`) = `getPos` = k; `River.new` loop = k − 2;
  `PathTracker.length` = k − 1; `Cubic.smoothOpen` loop = `Cubic.build` outer = k − 1; `Cubic.cubic` = 7(k − 1).
* `PathTracker.getPos`'s segment-advance block is **4 in 7/7 runs, whatever k is** `[SHOWN]`, so the knots always
  traverse all 5 segments of the 6-vertex base curve `[INFERRED]`.
* **`sparse` does not touch the course** `[SHOWN]`. `sparse,river` seeds 3131–3134 give part 2's courses exactly:
  94/91/84/64 segments, closure splits 1/6, 1/5, 5/2, 5/1, and pre-loop arms +1157/+1154/+1154/+1154.
* New seeds `[SHOWN]`: 2037831868 has k = 6 and 77 segments, with arm +1154. 594377153 has k = 7 and 96 segments,
  with arm +1157 and closure split 3/4. The segment count is still not a function of k.

### N6. Refined hypotheses, each with its discriminating test

| # | hypothesis | status | discriminating next test |
|---|---|---|---|
| D1 | `createDensity` = one analytic per-cell expression, with parameters (heart, radius, and a water term from the 99-B block) fixed before the 128² loop | loop shape `[SHOWN]`, 19/19 runs; the formula `[INFERRED]` | part 2 P2's debugger windows at +909 (loop entry) and at the return: read the finished density array (runtime values) and fit radial falloff against distance-to-heart, adding a water-distance term on river maps |
| D2 | the rare 273-B arm adjusts the density centre against the shoreline, by walking the interior vertices of the two smoothed shore chains, when a per-map condition holds (for example the heart falls in or too near water) | walk and identity `[SHOWN]`; purpose `[INFERRED, weak]` | record 30–40 `river` seeds (`--regen reload --detailed`), list the arm-takers, and measure centre-to-bank distance on each PNG; or pause at +409 and read `getHeart`'s point together with the nearest shore vertex |
| P1 | palisade = hull of the density-lattice samples above a threshold (10 × 10 lattice) → clean → closed cubic spline (11 samples per span) → fixed-step resample (≈ 0.13 vertices per √pixel) → raster BitMap; built before the roads; gates where trackers meet the wall | lattice, hull input, spline and before-roads identities `[SHOWN]`; "density" and "threshold" `[INFERRED]` | window on `getPopulated`'s return: the kept points should sit on a regular 10 × 10 lattice inside the high-density area; a `--vertices` draw pass on one palisade seed then checks the post spacing and the wall's convex, smoothed shape against the building positions |
| W1 | `warp` wraps each coordinate into the pattern period (x < 0 → +w; x ≥ w → −w): a toroidal Poisson pattern that `fill` tiles 6 × 6. It is not a domain warp and not a clamp | branch shape, 1 call per point, 6 × 6 tiling `[SHOWN]`; wrap rather than clamp `[INFERRED]` | `--vertices` draw pass: tree centres inside forest patches should repeat by exact translations at the tile period. A clamp would pile points on the tile borders, and a reflection would give mirror-image repeats at the seams |
| N1 | `flexibility`'s arm 1 = the highway tracker class; a bridge = one step; the palisade is consulted on every step | `[SHOWN counts]`, `[INFERRED]` readings | a CPU-profile pass on a `palisade,highway` seed to time `Palisade.new` against `Network.build` (the chronology method of the 09-21 critic addendum) |

### What changes for a re-implementer

For build 19365073, build the palisade before the roads. Sample the density field on a 10 × 10 lattice, keep the
populated samples (13–20 here), take their convex hull, drop short or degenerate hull vertices, and run a closed cubic
spline through the rest at 11 samples per span. Resample that ring at a fixed step (29–45 vertices on these maps),
rasterise it for overlap tests, and let the road trackers stop at it and open 3–4 gates. Buildings come later and do
not shape the wall. Build the density as a single per-cell pass over 128² cells with a set-up that fixes all
parameters, including a water term. Keep a rare shoreline branch as an open item rather than as a default. Treat the
forest's Poisson sampler as a periodic tile with coordinate wrap-around (`warp`), not as a warped domain. The river
course recipe of part 2 stands and is unaffected by `sparse`.

## Fable review (2026-09-27) — B07

**Verdict: CONFIRMED** (`docs/fable-review/main/evidence-captures.md`, row B07). Re-derived from
`captures/village/2026-09-25T10-14-02`: `meta.json` baseUrl is build 19365073; gen-0 `Elevation.dist2segment2` 1 540 096 =
94 × 16 384 (`dist2poly` 16 384), `Cubic.cubic` 42 = 7 × 6, `Cubic.smoothOpen` 1, `Cubic.build` 1, `PathTracker.getPos` 7,
`get_tangent` 7, `length` 6, `Chaikin.render` 134, `PolyUtils.resample` 36, `River.calculateCurvature` absent; gen-1 (no
water) has none of them; `river-windows/River.new.seed3131.json` contains no `Random` label in any window. `profiler/record.mjs
--detailed` was read: coverage stays on for the pass with a discarded take per generation, the debugger is enabled with pauses
skipped and the cache disabled — the three hazards P5 measured. P1's label diagnosis was right (the closure reads `River.a`
after the label fix, N0). The design keeps the village staged (PART III) and its own river model (§4.2 S1's control knots);
`docs/CONFIDENCE.md` §3.2 G2/G3 rightly hold the seed path and the knot law open.

## Fable review (2026-09-27) — B08

**Verdict: CONFIRMED** (`docs/fable-review/main/evidence-captures.md`, row B08). Re-derived from
`captures/village/2026-09-25T19-04-26` gen-0/1/2: `Palisade.getPopulated` 1, `ConvexHull.ofSet` 1, `ofPoly` 1, `clean` 1,
`Cubic.smoothClosed` 1 with `Cubic.cubic` 77 / 55 / 77, `Palisade.blocks` = `Tracker.endBridge` 213 / 303 / 230,
`getClosestSeg` 15 / 19 / 15, `addGate` = `Gate.new` 3 / 4 / 3, `validateGate` 4 / 5 / 3, `overlaps` = `BitMap.check`
1 626 / 1 134 / 1 587, `BitMap.new` 1. `19-03-50` gen-0 against `10-14-02` gen-0 differs only in `Updater.fire` (75 vs 88)
and the label-fix moves. The before-the-roads order is tagged INFERRED here and confirmed by the 2026-09-27 code reading
(`docs/AMENDMENTS-2026-09-27c.md` item 61: VG 1.6.9 = build 19365073; the palisade point set is a jittered 10 × 10 lattice
kept with probability density − 0.1); `docs/ARCHITECTURE.md` PART III item 2 already says "a palisade before its roads". W1's
wrap reading agrees with the code (a torus, item 53). One consumer is stale: `docs/CONFIDENCE.md` §3.2 G6 F says the
`createDensity` alternative arm is "untaken in 6/6 runs"; N1 finds it taken in 1 of 19 (recorded as a design impact).
