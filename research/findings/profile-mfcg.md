# profile-mfcg — Medieval Fantasy City Generator (watabou), live build 0.11.x, reconstructed from recordings

**Slice:** recordings of the *live* MFCG only. No proprietary JavaScript was read. Evidence used:

| kind | path |
|---|---|
| random-city run (cold load + 3 × Enter) | `captures/mfcg/2026-09-21T05-03-24/` |
| seeded run (`size=80`, seeds 777001..777003, reload each time) | `captures/mfcg/2026-09-21T05-06-58/` |
| per-pass artefacts | `{profile,coverage,draw}/{gen-N.cpuprofile, gen-N.calls.json, gen-N.draw.json, gen-N.png, console.jsonl}` |
| digested report | `report.md` in each capture dir (read in full, both) |
| non-JS network bodies (permitted: JSON / TXT / SVG / HTML only) | `.../profile/network/bodies/*.json`, `*.bin` (plain text), `*.svg`, `*.html` |
| 2017 open-source ancestor | `reference/TownGeneratorOS/Source/com/watabou/**` |

**Tag key:** `[STATED]` the build's own trace/asset says it · `[SHOWN]` visible in an image or recorded call/draw data · `[INFERRED]` my reconstruction, reasoning given · `[NAMED-ONLY]` a symbol executed but nothing reveals its method.

Everything below that quotes a call count is exact, taken from `coverage/gen-N.calls.json` (a full census of every executed function, labelled `package.Class.method`). "B1" = `2026-09-21T05-06-58/coverage/gen-1` (size 80, exactly **one** city build attempt — the cleanest single-build sample). "A0" = `2026-09-21T05-03-24/coverage/gen-0` (size 25, one attempt).

---

## 0. Headline findings (the ten things that matter most)

1. **The pipeline is `City.build()` = a nine-stage sequence wrapped in a whole-city retry loop.** The build's own `Stopwatch` prints each stage name and its milliseconds, with the original Haxe file:line. `[STATED]`
2. **Patch seeding is still the 2017 formula, scaled: exactly `8·size + 4` points** — verified to the unit across all 7 recorded builds (size 25→204, 26→212, 39→316, 80→644). The ancestor used `nPatches * 8`. `[SHOWN]`
3. **Voronoi is no longer hand-rolled.** `com.watabou.geom.Delaunator` (a Haxe port of mapbox/delaunator) + `getVoronoi()` + a real **DCEL / HalfEdge / Face / Vertex** half-edge mesh replaced the 2017 `Voronoi.hx`. `[SHOWN]`
4. **Lot subdivision moved from area-driven to OBB-driven.** `Bisector.subdivide` calls `PolyBounds.obb` (convex hull + `PolyTransform.asRotateYX`) on ~80 % of recursion nodes; the ancestor used `poly.square` and the longest edge. This is the single biggest visual change (far more rectangular lots). `[SHOWN]` + `[INFERRED]`
5. **Rivers can fail and cost whole cities.** `Canal` discards candidate courses; after ~35–41 discards `City.hx:156` throws `*** Unable to build a canal!` and the **entire city is regenerated with a fresh internal seed**. On `size=80&river=1&coast=1` this happened on **7 of 10** attempts. `[STATED]`
6. **The citadel is repaired, not rejected.** The 2017 code threw `"Bad citadel shape!"` when `compactness < 0.75`; the live build runs `Castle.equalize()` in a loop, tracing `Equalizing... <compactness>` — and **every traced value is strictly below 0.75**, in monotonically rising sequences. `[STATED]` + `[INFERRED]`
7. **Buildings are drawn as footprint + offset roof.** `BuildingPainter.g` → `GraphicsExtender.drawPolygon` in `colorDark`; `BuildingPainter.drawRoof` → `GraphicsExtender.drawPolygonAt` in `colorRoof` — counts match 1:1 (B1: 36 480 roofs = 36 480 `drawPolygonAt`). `[SHOWN]`
8. **The palette is data, not code.** Six JSON colour schemes ship as assets (`default/ink/bw/vivid/modern/natural.json`), each with 13 keys including `tintStrength`, `tintMethod` ∈ {Brightness, Spectrum, Overlay} and `weathering`. Every colour seen in the draw record is literally one of `default.json`'s values. `[STATED]`
9. **Naming is Tracery + 4 Markov corpora, and the grammar ships verbatim** (`grammar.json`, 4 401 bytes, reproduced in §9). It is *conditioned on the city's own features* via `CASTLE?-`, `WALLS?-`, `COAST?-`, `RIVER?-`, `PLAZA?-`, `TEMPLE?-`, `UNIQUE?-`, `COMPACT?-` guards. `[STATED]`
10. **Generation is cheap; rendering and text are not.** For size 80 the model costs 125–260 ms while a single frame's OpenFL/Canvas replay costs 100–230 ms and shader/texture work another ~60 ms. Generation for size 25 is 11–82 ms. `[STATED]` + `[SHOWN]`

---

## 1. Build identity and harness facts

* URL: `https://html-classic.itch.zone/html/12710731/bin/index.html` (itch.io HTML wrapper). `bin/mfcg.js`, one 1 311 915-byte bundle (not read).
* Runtime stack: **Haxe → OpenFL → Lime**, HTML5 target, rendering through `openfl.display.OpenGLRenderer` with a **Canvas2D fallback path inside `CanvasGraphics`** used for all vector art (`Context3DGraphics.render → CanvasGraphics.render → playCommands`). Every vector shape is rasterised into a bitmap and uploaded with `texImage2D`.
* The build still logs with `haxe.Log.trace`, so the console carries **original source paths and line numbers** — the single richest artefact in this slice:
  | line | message |
  |---|---|
  | `model/City.hx:124` | `>> seed:<S> size:<N>` (outer entry) |
  | `model/City.hx:151` | `-->> seed:<S> size:<N>` (one build attempt) |
  | `model/City.hx:156` | `*** Unable to build a canal!` |
  | `model/City.hx:183..191` | `buildPatches/optimizeJunctions/buildDomains/buildWalls/buildStreets/buildCanals/createWards/buildCityTowers/buildGeometry <ms>` |
  | `model/City.hx:591` | `Unable to build a street!` |
  | `model/Canal.hx:216` | `discard` (regular-river variant) |
  | `model/Canal.hx:268` | `discard` (delta-river variant) |
  | `model/wards/Castle.hx:60` | `Bloating the citadel...` |
  | `model/wards/Castle.hx:84` | `Equalizing... <float>` |
  | `model/wards/WardGroup.hx:107` | `Failed to create a non-empty alleys group` |
  | `utils/Bisector.hx:281` | `(0) Failed to make a cut` |
  Source: `captures/mfcg/*/[pass]/console.jsonl`, also transcribed in `report.md` §"Console output".
* Canvas is a fixed **1500 × 1100** (`meta.json → canvases`). Screenshots are 1500 × 1100.
* Fonts (from `bin/index.html`, captured as `network/bodies/0001-7110ba7c.html`): `IM FELL Great Primer Roman`, `Share Tech Regular`, `Share Tech Mono`, each as eot/woff/ttf/svg. Under headless Chrome Lime logged `WARNING: Could not load web font` for all three, yet the draw record still shows the correct `font` strings — Lime falls back to the browser's `@font-face` registration. `[STATED]`
* Emblem/coat of arms is **not generated in-app**: `Emblem.loadLo/loadHi/loadSvg` fetch `https://armoria.herokuapp.com/png/200/1`, `/svg/200/1`, `/png/800/1` (Azgaar's Armoria service). The captured SVG is a heater-shield with a `sickle` charge. `[SHOWN]` — `network/index.jsonl`, `bodies/0021-8dd24759.svg`

---

## 2. The Blueprint: the exact parameter set

`com.watabou.mfcg.model.Blueprint.{new, fromURL, create, updateURL}` reads/writes the query string through `com.watabou.system.URLState.{getInt,getFlag,get,set,setFlag,update}`. Observed keys, in the order the build emits them (`meta.json → passes[*].href`):

```
size=<int>  seed=<uint32>  citadel=0|1  urban_castle=0|1  plaza=0|1  temple=0|1
walls=0|1   shantytown=0|1 coast=0|1    river=0|1         greens=0|1 gates=-1
sea=<float 0..2>   farms=0|1
```

Evidence for semantics (all `[SHOWN]` from the flag→call-count correspondence, which is exact):

| param | proof |
|---|---|
| `size` | `Delaunator.circumradius2` == `8·size + 4` in all 7 builds (§4.1) |
| `seed` | printed verbatim by `City.hx:124` |
| `citadel` | `Castle.new` = 0 when `citadel=0` (A-coverage gen-1, gen-3), ≥1 otherwise |
| `urban_castle` | 1 → castle sits **inside** the curtain wall (Feygate, Brightwood); 0 → castle is a **separate walled annex outside** (Candlesoul Market, Deeplake). 4/4 images agree |
| `walls` | `WallsView.drawTower/drawGate` = 0 when `walls=0` (A gen-1) |
| `shantytown` | `City.buildShantyTowns` = 1 iff `shantytown=1` — exact across all 7 runs |
| `coast` | `City.getOcean`, `FormalMap.drawWaterbody`, `PatchView.drawPier`, `DocksGrower.*`, `Harbour.*`, `City.addHarbour`, `utils.Noise.get`, `utils.Perlin.get` are **all zero** when `coast=0` and non-zero when `coast=1` |
| `river` | `Canal.createRiver` = 1 per attempt |
| `greens` | `ParkGrower.new` and `PatchView.drawGreen` occur only in the `greens=1` capture; `drawGreen` count == `fill #a59f93` count exactly (4/3/3) |
| `farms` | `Farm.*`/`FarmPainter.paint` present; hatched fields visible outside walls |
| `gates` | always `-1` in every recorded URL → sentinel for "auto / let the generator choose" `[INFERRED]` |
| `sea` | **direction of the open sea, in units of π radians, CCW from screen-East** `[INFERRED]` — see §2.1 |

### 2.1 `sea` is an angle (five independent confirmations)

| capture | `sea` | sea in the image | π·sea, CCW from East |
|---|---|---|---|
| B draw gen-0 "Great Market" | 0 | E / ESE | 0° = East ✓ |
| A cov gen-2 "Candlesoul Market" | 0.3 | N / NE | 54° ✓ |
| A draw gen-1 "Brightwood" | 0.6 | N / NNW | 108° ✓ |
| A draw gen-0 "Feygate" | 1 | W | 180° ✓ |
| A draw gen-3 "Deeplake" | 1.8 | E / SE | 324° ✓ |

Test: load `…&coast=1&sea=0.5` repeatedly and check the sea is always due north on screen.

---

## 3. The live pipeline, reconstructed

### 3.1 Top-level control flow `[STATED]` + `[SHOWN]`

From the call tree (`report.md` → "Call tree", e.g. B profile gen-2 lines 3847–3937) and the fact that some functions run once **per attempt** while others run once **per finished city**:

```
ApplicationMain.start
└ DocumentClass.new
  └ com.watabou.mfcg.Main.new
    ├ Blueprint.fromURL                              ← read query string
    ├ City.new                                       (City.hx:124  ">> seed:S size:N")
    │ └ City.build                                   ← RETRY LOOP LIVES HERE
    │   │  repeat {                                  (City.hx:151  "-->> seed:S size:N")
    │   │    Stopwatch.measure( buildPatches )       :183
    │   │    Stopwatch.measure( optimizeJunctions )  :184
    │   │    Stopwatch.measure( buildDomains )       :185
    │   │    Stopwatch.measure( buildWalls )         :186
    │   │    Stopwatch.measure( buildStreets )       :187   (calls tidyUpRoads)
    │   │    Stopwatch.measure( buildCanals )        :188   ← may throw (:156)
    │   │  } until success, re-rolling the seed on each failure
    │   ├ Stopwatch.measure( createWards )           :189
    │   ├ Stopwatch.measure( buildCityTowers )       :190
    │   └ Stopwatch.measure( buildGeometry )         :191
    │      ├ buildFarms / buildShantyTowns
    │      ├ Namer.reset → Markov.new ×4 → Namer.cityName / nameDistricts
    │      └ per ward: Ward.createGeometry  (Alleys→WardGroup→Block→TwistedBlock→Bisector)
    ├ City.updateDimensions / rerollName / Blueprint.updateURL
    └ coogee.Game.new → Game.switchScene → Main.switchSceneImp → Game.switchSceneImp
      ├ Type.createInstance(ViewScene) → TownScene.new → createOverlays / updateOverlays
      └ Main.layout → Game.layout → Scene.setSize → ViewScene.layout → TownScene.layout
        └ TownScene.layoutMap → TownScene.recreateMap → FormalMap.new  ← ALL DRAWING
```

**Proof that the loop boundary is exactly where I place it.** In B coverage gen-2 there were **7** attempts (7 `-->>` lines, 6 canal failures). Functions that ran 7× : `City.buildPatches/optimizeJunctions/buildDomains/buildWalls/buildStreets/tidyUpRoads/buildCanals`, `Delaunator.new`, `DCEL.new`, `Topology.new` (×3 each), `Castle.new`, `Noise.new`, `Perlin.get` (3 616/attempt). Functions that ran **once**: `createWards`, `buildCityTowers`, `buildGeometry`, `buildFarms`, `buildShantyTowns`, `Ward.new` (620 ≈ one per cell), `District.new`, `WardGroup.new`, `Block.new`, `Bisector.new`, `SkeletonBuilder.run`, `Namer.*`, `Blueprint.updateURL`. `[SHOWN]`

Regeneration by **Enter** goes `coogee.Scene.onKeyDown → ViewScene.onKeyEvent → ViewScene.buildNew → City.new …` (A profile gen-1/2/3 call trees). `[SHOWN]`

### 3.2 Per-attempt vs per-city, tabulated

| runs **per build attempt** | runs **once per finished city** |
|---|---|
| Delaunator, DCEL, Cell, Face, Vertex, HalfEdge, Perlin/Noise, Topology, Graph.aStar, Canal, CurtainWall, Castle(+equalize), Grower validation | District, DistrictBuilder, WardGroup, Ward + subclasses, Block/TwistedBlock, Bisector, PolyBounds.obb, SkeletonBuilder, Namer/Tracery/Markov, all `mapping.*` |

---

## 4. Stage-by-stage algorithm reconstruction

### 4.1 `buildPatches` (City.hx:183) — 1–10 ms

**Problem:** produce the irregular cellular substrate of the city.

* **Seed points: exactly `8·size + 4`.** `Delaunator.circumradius2` is called once per input point and equals 204 / 204 / 316 / 212 / 644 / 644 / 644 for sizes 25 / 25 / 39 / 26 / 80 / 80 / 80. `[SHOWN]` The 2017 ancestor wrote `for (i in 0...nPatches * 8)` with `a = sa + sqrt(i)*5; r = (i==0 ? 0 : 10 + i*(2 + Random.float()))` — a Fermat/Vogel spiral with jittered radius. The `+4` is new; most likely 4 far bounding points so the hull cells are unbounded-but-clipped. `[INFERRED]`
* **Delaunay: `com.watabou.geom.Delaunator`** — methods executed: `new, update, link, legalize, inCircle, orient, orientIfSure, addTriangle, triangleCenter, triCircumcenter, circumcenter, circumradius2, dist, pseudoAngle, hashKey, edgesAroundPoint, getVoronoi`. That name set (`pseudoAngle`, `hashKey`, `legalize`, `orientIfSure`, `link`) is **mapbox/delaunator verbatim** — a hashed-sweep incremental Delaunay with a hull hash and edge-flip legalisation. `[SHOWN]`
  * Empirical: `addTriangle` = `2n − 4` exactly (404/628/420/1284). `legalize` = `addTriangle − 1`. `inCircle` ≈ `2.2·n`, `link` ≈ `4.0·n` (size 25) rising to `13·n` (size 80 seed 777003 — degenerate distributions cost more flips).
  * `getVoronoi()` is called **once per build** → the dual is built in one pass from the triangulation.
* **Half-edge mesh:** `DCEL.new` once per build; `DCEL.addVertex` ≈ 5.1 × #cells; `HalfEdge.new` ≈ 3 × `Vertex.new` (each Voronoi vertex has degree 3 — consistent with a non-degenerate Voronoi). `Face.new` == `Cell.new` exactly (183 / 174 / 289 / 185 / 615), i.e. `n − |hull|` cells survive (21–29 hull points are dropped). `[SHOWN]`
* **Water field:** with `coast=1` only, `utils.Noise.get` is called **once per cell** (603 for 615 cells; 281 for 289; 181 for 185) and each `Noise.get` calls `Perlin.get` **exactly 6 times** (3618/603 = 1686/281 = 1086/181 = 6.000). ⇒ **fractal Perlin, 6 octaves, sampled per cell, only when a coast exists.** `City.(anon@239186)` has the identical count to `Noise.get`, so it is the per-cell closure that queries it. `[SHOWN]` + `[INFERRED]` The `sea` angle (§2.1) presumably supplies a directional gradient that the noise perturbs, giving the wiggly but globally-planar coastlines in the screenshots.
* No `PoissonPattern` here — see §6.1.

**Unknown:** the exact spiral constants in 0.11.x (2017 used `sqrt(i)*5`, `10 + i*(2+rand)`), and how `+4` points are placed. Test by measuring the ratio of city radius to `size` across many seeds against the ancestor formula.

### 4.2 `optimizeJunctions` (City.hx:184) — 0–3 ms

2017: merge any pair of consecutive patch vertices closer than **8 units**, average them, and de-duplicate. Live: the call tree shows `City.optimizeJunctions → DCEL.collapseEdge` (B profile gen-2: 7.8 ms total, `collapseEdge` 3.9 ms). `collapseEdge` runs 300 ×/build (B1) vs 615 cells — i.e. roughly one collapse per two cells. `[SHOWN]` This is the same idea done properly on the half-edge mesh: **short-edge collapse**, which automatically fixes both incident faces instead of the ancestor's ad-hoc "wards2clean" fixup.

**Unknown:** the length threshold, and whether it is absolute or relative to the mean edge.

### 4.3 `buildDomains` (City.hx:185) — 0–4 ms — **new since 2017**

* `DCEL.split` and `DCEL.floodFill` are called exactly **2× per build** when `coast=1` and **0×** when `coast=0` (A gen-0/1 = 0; A gen-2/3 = 2; B = 2 per attempt). `splitFace`/`removeFace` 6, `addFace` 12 per build. `[SHOWN]`
* `City.splitEdge` also only fires with a coast.
* ⇒ **`buildDomains` cuts the cell mesh along the water boundary and flood-fills the resulting connected land components ("domains").** The two splits are most plausibly (a) sea/land and (b) separating an offshore or across-water component. `[INFERRED]`
* `City.cellsByVertex` (464 B1 / 234 A0) is the live replacement for the ancestor's `patchByVertex`.

**Unknown:** whether "domain" also covers river-separated banks (it cannot — canals are built later), and what a domain is used for downstream (most likely: keeping the walled area simply-connected and telling `Namer` which bank a district is on, cf. `bankDistrict` in the grammar).

### 4.4 `buildWalls` (City.hx:186) — 0–2 ms

`com.watabou.mfcg.model.CurtainWall` executed methods: `new, buildCityGates, buildCastleGate, buildTowers, getTowerRadius, addWatergate, splitSegment, G, splitSegment` + 3 closures.

* **Two `CurtainWall` objects per build** (`CurtainWall.new` = 2 per attempt): the city border and the castle enclosure — exactly the ancestor's `border` + `Castle.wall`. `[SHOWN]`
* `buildCityGates` 1× and `buildCastleGate` 1× per attempt. `buildTowers` 2×.
* `getTowerRadius` is called **366–1140 ×** (far more than the ~21–23 towers drawn) ⇒ it is a query used while *choosing* tower placement/spacing, not just when emitting them. `[INFERRED]`
* **`addWatergate` is new** and fires exactly once, only when a river crosses the wall (`coast`/`river` combos: A gen-2, A gen-3, all B). `splitSegment` accompanies it — the wall ring is split where the water passes. `[SHOWN]` Visible in "Brightwood": the wall meets the river and the river passes beneath it.
* Ancestor behaviour retained: gates are wall vertices with >1 adjacent inner ward, chosen randomly with neighbour-exclusion so no two gates are adjacent; the wall polyline is smoothed with `smoothFactor = min(1, 40/|patches|)`.
* `WallsView` draw counts (A0): `draw` 2, `drawTower` = `drawNormalTower` 21, `drawGate` 9/5. Towers are rendered with Canvas `arc()` (18–25 arcs per map) ⇒ **circular towers**; gates are solid dark rectangles straddling the wall. `[SHOWN]` — matches every screenshot.

### 4.4b The citadel repair loop — `Castle.adjustShape` `[STATED]` + `[INFERRED]`

Methods: `Castle.{new, adjustShape, equalize, createGeometry, h}`. Traces:

```
Castle.hx:60  Bloating the citadel...
Castle.hx:84  Equalizing... 0.5408360777729796
Castle.hx:84  Equalizing... 0.5996488485798054
...
Castle.hx:84  Equalizing... 0.7498778609336121
```

* `Castle.equalize` call count == number of `Equalizing...` lines, exactly (A0: 9 and 9). `[SHOWN]`
* **Every traced value across all 57 traced lines in the B captures is strictly < 0.75**, sequences are monotonically increasing and converge toward ~0.75, and sequence lengths vary 1…20. The only loop shape that produces this is

  ```haxe
  while (shape.compactness < 0.75) { trace("Equalizing... " + shape.compactness); shape = equalize(shape); }
  ```

  i.e. the value is traced **before** each fix-up, so the terminating (≥0.75) value is never printed, and a citadel that already has compactness ≥ 0.75 prints nothing. `[INFERRED]` — falsifiable: any observed `Equalizing...` value ≥ 0.75 refutes it.
* **0.75 is the ancestor's constant.** `Model.buildWalls` (2017) did `if (citadel.shape.compactness < 0.75) throw new Error("Bad citadel shape!")`. The live build kept the threshold and replaced *reject-and-retry* with *repair*. `[SHOWN]` (ancestor source) + `[INFERRED]` (live)
* `equalize` almost certainly equalises edge lengths (a constrained Laplacian/centroidal relaxation of the ring), which monotonically raises `compactness = 4πA/P²`. Observed increments fall off smoothly (0.0588, 0.0449, 0.0333, 0.0244, 0.0177, 0.0130, 0.0096, 0.0072), consistent with a fixed-point iteration with contraction ≈ 0.7. `[INFERRED]`
* `Bloating the citadel...` is a separate repair at `Castle.hx:60`, before the equalize loop, fired in ~1 of 6 cities — most plausibly "the citadel patch is too small for the required keep, grow it" (offset the ring outward / absorb a neighbour). `[INFERRED]` `[NAMED-ONLY]` for the exact rule.

### 4.5 `buildStreets` (City.hx:187) + `tidyUpRoads` — 1–28 ms

* `Topology.new` = **3 per build attempt** (one per `Graph.new`). One is for streets; `Canal.buildTopology` builds another; the third is `[NAMED-ONLY]` (likely the outside-the-wall road network). `[SHOWN]`
* `Topology.{getNode, buildPath, excludePolygon, excludePoints}` — `getNode` 5 024 (B1) ≈ 8 × cells, `buildPath` 10, `excludePolygon` 1, `excludePoints` 6. `excludePolygon`/`excludePoints` replace the ancestor's `blocked` array (shore + wall minus gates): the live version masks out a whole polygon or point set from the pathfinding graph. `[SHOWN]` + `[INFERRED]`
* `Graph.aStar` → `Graph.buildPath` — literally the 2017 `Graph.aStar(start, goal, exclude)`. Cost: `ObjectMap.set` + `ObjectMap.keys` dominate (the 2017 A* uses `Map` for `openSet`/`cameFrom`/`gScore` and a linear `min` over `keys()` — that `keys()` scan is 15.8 ms of a 44.2 ms A* in B profile gen-2). `[SHOWN]` This is an un-optimised O(V) open-set scan, still, in 2026.
* Failure: `City.hx:591 "Unable to build a street!"` — the ancestor threw an `Error` here; the live build **logs and continues** (a city with 8 such messages still completed: B profile, seed 777002). ⇒ **street failures are now non-fatal; only canal failures restart the city.** `[STATED]`
* `tidyUpRoads` still runs once per attempt (same name and position as 2017): cut streets into unique segments, drop segments running along the plaza, re-chain segments into `arteries`.
* Rendering shows streets are drawn as **casing + core**: a dark stroke of width `core + 2·t` then a paper-coloured stroke of width `core`, where `t` is the global outline width (§10.3).

### 4.6 `buildCanals` (City.hx:188) — the river — 0–10 ms, or a restart

`com.watabou.mfcg.model.Canal` executed: `new, createRiver, regularRiver, deltaRiver, buildTopology, validateCourse, intersect, updateState, deltaRiver` + 2 closures.

* **Two river modes, selected by whether there is a sea** — exact correspondence: `regularRiver` ran in A-coverage gen-0/gen-1 (`coast=0`), `deltaRiver` in A-coverage gen-2/gen-3 and all B runs (`coast=1`). The two `discard` trace sites confirm it: `Canal.hx:216` appears only in the passes where `regularRiver` ran, `Canal.hx:268` only where `deltaRiver` ran. `[SHOWN]`
  * `regularRiver` = a river that enters and leaves the map (Stormway's meander, Feygate's north–south channel).
  * `deltaRiver` = a river that terminates in the sea, with `RiverView.drawMouth` (1× whenever a delta exists) and a widening estuary — see "Great Market", where the channel fans out into the bay.
* **Course search is generate-and-test with a hard cap.** `Canal.createRiver` → `deltaRiver` → `Topology.buildPath` → `Graph.aStar`. Each rejected course logs `discard`. Recorded per-attempt discard counts:
  * succeeded: **1, 8, 11**
  * failed with `*** Unable to build a canal!`: **35, 35, 35, 37, 39, 40, 41**
  ⇒ the cap is a *try* budget of roughly 40–50, not a discard budget (some tries fail before reaching the discard log). `[SHOWN]` + `[INFERRED]`
* `Canal.validateCourse` (2 per successful build, 138 over 7 attempts in B2) is the acceptance test; `Canal.intersect` checks the course against existing geometry.
* `City.getCanalWidth` (5–62 calls) supplies a per-node width ⇒ the river is a **variable-width ribbon**, widening downstream — exactly what the "Great Market" and "Stormway" images show. `[SHOWN]`
* `RiverView.drawBridge` 1–4 per city (`drawBridge` count == number of street/river crossings). `[SHOWN]`
* `City.(anon@250342)` (961 B1) and `Canal.(anon@230136)` (217 B1) are the per-vertex course closures. `[NAMED-ONLY]`

**Failure mode of record.** `size=80&river=1&coast=1&walls=1&citadel=1&shantytown=1&greens=1&farms=1` needed **10 attempts to produce 3 cities**. Every extra attempt costs a full Delaunay + DCEL + walls + streets (~15–25 ms), which is why the seeded run's `readyAt` is 3.7–4.0 s vs 0.2–1.2 s for a cold small city. `[STATED]`

### 4.7 `createWards` (City.hx:189) — 0–4 ms

* `DistrictBuilder.{new, build, growAll, sort, getType, getGrower, fromPatch, fromVertex, d, k}` — one `DistrictBuilder` per city.
* **District seeding then region growing.** `fromPatch` (12 B1 / 5 A0) and `fromVertex` (3 / 4) create seeds; `getType` picks a district class; `getGrower` returns a `Grower` (15 B1 = one per district); `growAll` runs them; `sort` orders them. `[SHOWN]`
* `Grower.{new, grow, validatePatch, validateEdge}` — `grow` 466 (B1) with `validatePatch` 1 142 and `validateEdge` 1 146 ⇒ **a frontier/flood growth that tests each candidate cell and each candidate boundary edge before absorbing it** (≈2.5 validations per accepted growth). `[INFERRED]`
* Specialised growers: `DocksGrower.validatePatch` (coast only — a docks district may only absorb waterfront cells) and `ParkGrower.validatePatch` (`greens=1` only). `[SHOWN]` These replace the ancestor's static `WARDS[]` deck + `rateLocation` scoring; districts are now *grown regions of cells*, not single patches.
* `District.{new, createParams, createGroups, updateGeometry, pickFaces, check4holes, getRidge, updateColors}` — `check4holes` (33 B1) proves the grown region is repaired when growth encloses an unabsorbed cell. `[SHOWN]`
* District counts observed: size 25→7, 25→5, 26→6, 39→9, 80→17/15/14. Sub-linear in `size`. `[SHOWN]`
* `City.buildShantyTowns` and `City.buildFarms` run here-or-later, once per city (§4.9).

Ward classes instantiated (`model.wards.*`): `Ward` (base), `Alleys`, `Wilderness`, `Farm`, `Harbour`, `Market`, `Cathedral`, `Castle`, `Park`, `WardGroup`. A0 decomposition is exact: `Ward.new` 180 = `Wilderness` 135 + `Alleys` 31 + `Farm` 11 + `Market` 1 + `Cathedral` 1 + `Castle` 1. `[SHOWN]` Compare 2017's 13 ward classes (CraftsmenWard, MerchantWard, PatriciateWard, AdministrationWard, MilitaryWard, Slum, GateWard, Park, Market, Cathedral, Castle, Farm, Ward) — **the ward taxonomy collapsed into "Alleys" (any built-up ward) plus a handful of specials, and the flavour moved up into `District`.**

### 4.8 `buildCityTowers` (City.hx:190) — always 0 ms — **new since 2017**

Always 0 ms in all 11 successful builds. No dedicated class executed. `[NAMED-ONLY]` Most plausibly free-standing towers/landmarks placed on the city outline (the "WOOL TOWER" district label in Candlesoul Market suggests towers exist as named features). `[INFERRED]`

### 4.9 `buildGeometry` (City.hx:191) — 9–276 ms — **80–95 % of all generation time**

This is where every building is created. Chain (from the call tree, B profile gen-0 lines 3156–3189):

```
City.buildGeometry
├ Namer.reset → Markov.new ×4 → (cityName, nameDistricts)
├ DistrictBuilder.build
├ per urban ward: Alleys.createGeometry
│  └ WardGroup.createGeometry
│     ├ WardGroup.createAlleys           ← level 1: ward → blocks
│     │  ├ Bisector.partition → subdivide* → makeCut/split      (recursion depth ≥ 9)
│     │  └ WardGroup.createBlock
│     │     └ Block.new
│     │        ├ TwistedBlock.createLots
│     │        │  └ Bisector.partition → subdivide* → makeCut   ← level 2: block → lots
│     │        │     └ PolyBounds.obb (convexHull + PolyTransform.asRotateYX)
│     │        ├ Block.filterInner
│     │        └ Block.indentFronts → PolyBool.and → PolyBool.augmentPolygons
│     ├ WardGroup.filter → WardGroup.interpolate → GeomUtils.barycentric
│     ├ WardGroup.semiSmooth / getGap / isBlockSized / getCircle / getArc / createChurch
│     └ WardGroup.getTris (ear-clip via geom.Triangulation)
├ Farm.createGeometry (splitField / round / getHousing) via utils.Cutter.grid
├ Castle.createGeometry, Market.createGeometry, Cathedral.createGeometry, Harbour.createGeometry, Park.createGeometry
└ District.getRidge → SkeletonBuilder.run  (label spine, §8)
```

**The two-level bisector.** `Bisector.new == Bisector.partition` (one object per partition) ≈ `Block.new + WardGroup.createAlleys` (B1: 3 846 ≈ 3 835 + 41). So the *same* recursive splitter runs twice: once to cut a ward into blocks separated by alleys (with a gap), once to cut each block into building lots. That is the ancestor's `Ward.createAlleys` recursion, promoted to a class. `[SHOWN]` + `[INFERRED]`

**Bisector internals** (B1 exact counts):

| method | count | reading |
|---|---|---|
| `partition` | 3 846 | entry point, 1 per polygon |
| `subdivide` | 143 498 | recursion nodes (37.3 per partition) |
| `isSmallEnough` | 139 210 | stop test, 97 % of nodes |
| `split` | 69 939 | internal nodes that actually split |
| `makeCut` | 69 916 | == `PointExtender.project` 1:1 |
| `detectStraight` | 7 044 | 1.83 per partition |
| `PolyBounds.obb` | 115 518 | 0.80 per `subdivide` |
| `PolyBounds.convexHull` | 115 518 | 1:1 with `obb` |
| `PolyTransform.asRotateYX` | 115 518 | 1:1 with `obb` |

Reading: a binary recursion with ≈ 71 750 leaves (lots) from 3 846 partitions ⇒ **≈ 18.6 lots per block**. `[SHOWN]`

**The big algorithmic change vs 2017** `[INFERRED]`, high confidence:
* 2017 `Ward.createAlleys` chose the **longest edge**, a random ratio in `[(1−spread)/2, (1+spread)/2]` with `spread = 0.8·gridChaos`, a random angular jitter `±π/12 · gridChaos` (suppressed when `square < minSq·4`), and stopped on `half.square < minSq · 2^(4·sizeChaos·(rand−0.5))`.
* Live: `subdivide` computes the polygon's **oriented bounding box** (convex hull → rotating-calipers → `asRotateYX` to bring the polygon into OBB axes) on 80 % of nodes. `isSmallEnough` is then a test on the OBB *dimensions*, not on area, and the cut direction is derived from the OBB axes rather than from an arbitrary longest edge. `detectStraight` (new) finds runs of near-collinear vertices so a cut can be aligned to an existing straight frontage.
* Consequence, visible in every screenshot: lots are near-rectangular with consistent frontage depth even in chaotic wards — the 2017 output had many wedge-shaped slivers.
* **Test:** re-implement both and compare the distribution of `min(OBB.w, OBB.h) / max(OBB.w, OBB.h)` over lots; MFCG 0.11 should be tightly clustered near 0.5–0.8, the 2017 version long-tailed toward 0.

**`Block.filterInner`** runs exactly once per `TwistedBlock.createLots` (3 805 B1 / 54 A0): it removes lots with no street frontage, which is why block interiors are empty courtyards in all the screenshots. `[SHOWN]` + `[INFERRED]`

**`Block.indentFronts`** runs exactly once per `Block.new` and calls `PolyBool.and` → `PolyBool.augmentPolygons` ≈ 8.8 ×/block. `PolyBool.and` is a **polygon boolean intersection**; `augmentPolygons` is the classic "insert every intersection point into both rings" pre-pass of a Greiner–Hormann / Weiler–Atherton clipper. ⇒ **the block is intersected with an inset copy of itself to push building fronts back from the street**, giving the visible thin gap between the building row and the street casing. `[INFERRED]` It is the single hottest self-time function in the model (`augmentPolygons` 31.8 ms self of 963 ms busy, B profile gen-1).

**`WardGroup.interpolate` + `GeomUtils.barycentric`.** `getTris` == `interpolate` exactly (34 235 B1 / 194 A0); `barycentric` / `interpolate` = 8.47, and `Triangulation.earcut` runs once per `WardGroup.filter`. ⇒ the ward polygon is **ear-clipped into ~9 triangles once**, then every candidate building's centre is located by walking those triangles and its attribute (density / height / keep-probability) is **barycentrically interpolated from per-vertex values**. `[INFERRED]` — this is the direct descendant of 2017's `Ward.filterOutskirts`, which built a per-vertex `density` array (1 at gates, `2·rand` if all adjacent patches are in the city, else 0) and used `patch.shape.interpolate(c)` to get the survival probability. The live version is the same idea with a proper triangulation. It is what produces the beautiful density falloff at the city edge (thick core → scattered outlying houses) visible in "Great Market" and "Stormway".

**`Building` class** (`create`, `getPlan`, `getPlanSym`, `circumference`): only 2–19 calls per city ⇒ **special landmark buildings only** (keep, cathedral, church), not ordinary houses. `WardGroup.createChurch` 22–27 per city. The solid-black rectangles in the screenshots are these. `BuildingPainter.drawSolids` 5–30 per city matches. `[SHOWN]`

**Farms.** `Farm.{new, getAvailable, createGeometry, splitField, round, getHousing}` + `utils.Cutter.grid`. `Cutter.grid` vs `Farm.new` per sample: 11/11, 8/15, 10/14, 14/16, 2/1, 2/0, 28/16 — so grid-cutting is **roughly, not exactly, one per farm** (it is also used elsewhere, and some farms are too small to grid). `splitField` recurses (139 splits for 11 farms ≈ 12.6/farm), `round` (45) softens corners, `getHousing` (12 ≈ 1/farm) places the farmstead. `FarmPainter.paint` then hatches the fields — `PolyCreate.stripe` (112–3 887 calls) generates parallel furrow strips. `[SHOWN]` + `[INFERRED]` Visible as the faint hatched quadrilaterals outside the walls in Candlesoul Market, Deeplake and Brightwood.

---

## 5. Complete inventory of executed `com.watabou.*` classes

138 classes, 638 distinct methods executed across the 7 coverage samples. Full per-method, per-run table: regenerate with the script logic in §14.3. Summary by package (total calls over all 7 samples):

| package | calls | classes |
|---|---|---|
| `com.watabou.geom` | 7 785 261 | `GeomUtils, Delaunator, PoissonPattern, Node, DCEL, HalfEdge, Face, Graph, Vertex, SkeletonBuilder, EdgeChain, Segment, Triangulation, Cubic, Rib, Circle, Color, Chaikin` |
| `com.watabou.geom.polygons` | 1 923 150 | `PolyCore, PolyBounds, PolyTransform, PolyBool, PolyCut, PolyCreate, PolyAccess` |
| `com.watabou.mfcg.utils` | 822 219 | `Bisector, PathTracker, PolyUtils, Cutter` |
| `com.watabou.utils` | 587 936 | `ArrayExtender, GraphicsExtender, PointExtender, Perlin, Noise, MathUtils, Updater, Random, SetUtils, Stopwatch, StringUtils, DisplayObjectExtender` |
| `com.watabou.mfcg.model` | 210 448 | `City, Topology, Grower, Cell, District, CurtainWall, Canal, DistrictBuilder, Building, DocksGrower, UnitSystem, Blueprint, ParkGrower` |
| `com.watabou.mfcg.mapping` | 176 993 | `BuildingPainter, Style, PatchView, RoadsView, WallsView, FarmPainter, RiverView, FormalMap` |
| `com.watabou.mfcg.model.wards` | 153 994 | `WardGroup, Ward, Farm, Alleys, Wilderness, Harbour, Castle, Market, Park, Cathedral` |
| `com.watabou.system` | 57 047 | `State, URLState` |
| `com.watabou.mfcg.model.blocks` | 27 556 | `Block, TwistedBlock` |
| `com.watabou.tracery` | 17 886 | `RuleSet, Tracery, Symbol, TraceryNode, Grammar, DeckRuleSelector, RuleSelector, NodeAction, ExtSymbol, ModsEngBasic` |
| `com.watabou.nlp` | 6 004 | `Markov, Syllables` |
| `com.watabou.coogee(.ui…)` | 6 719 | `Scene, Game, View, ButtonBase, Button, UIStyle, SolidRect, Menu, VBox, Text, CloseButton, DropDownButton` |
| `com.watabou.mfcg.scenes(.overlays)` | 3 884 | `TownScene, ViewScene, WarpScene` + `Overlay, CurvedLabel(+Letter), LabelsOverlay, LegendOverlay, Pin, PinsOverlay, MarkersOverlay, ScaleBar, ScaleBarOld, ScaleBarOverlay, Compass, CompassOverlay, Frame, Legend(+ScaleBarView,TitleView), Emblem, EmblemOverlay, GridOverlay, TitleOverlay, Title` |
| `com.watabou.mfcg.linguistics` | 1 156 | `Namer` |
| `com.watabou.mfcg` / `.ui` / `.ui.forms` | 1 464 | `Main, Values, Text, Tooltip, ToolForm` |
| `com.watabou.mfcg.annotations` | 438 | `Equator, Ridge` |
| `com.watabou.processes` | 14 | `Tweener` |

### 5.1 Method rosters worth recording verbatim

```
geom.GeomUtils        intersectLines, lerp, barycentric, converge, triArea
geom.Delaunator       new, update, getVoronoi, circumcenter, triCircumcenter, triangleCenter,
                      addTriangle, legalize, link, inCircle, orient, orientIfSure, dist,
                      pseudoAngle, hashKey, hashKey, edgesAroundPoint, circumradius2
geom.DCEL             new, addVertex, addFace, removeFace, splitFace, split, splitEdge,
                      collapseEdge, getEdge, floodFill, vertices2chain, circumference
geom.EdgeChain        indexByOrigin, edgeByOrigin, toPoly, toPolyline, assignData, vertices, prev
geom.SkeletonBuilder  new, run, step, merge, intersect, getPath, getPath2Root  (+_SkeletonBuilder.Node/Segment)
geom.Triangulation    earcut, linkedList, earcutLinked, isEar, pointInTriangle (+_Triangulation.Node)
geom.Cubic            build, smoothOpen, cubic, c
geom.Chaikin          render
geom.Color            hsv, rgb2hsv, rgbfSafe, d
geom.PoissonPattern   new, step, emit, warp, validate
polygons.PolyCore     area, centroid, center, perimeter, compactness, set, $length
polygons.PolyBounds   obb, convexHull, aabb, rect, containsPoint, lir, lira, c
polygons.PolyBool     and, augmentPolygons (+2 closures)
polygons.PolyCut      cut, pierce, peel, shrink, shrinkEq (+2 closures)
polygons.PolyCreate   rect, regular, stripe
polygons.PolyTransform translate, rotateYX, asRotateYX, asTranslate, asAdd
polygons.PolyAccess   longest, isConvexVertexi
mfcg.utils.Bisector   new, partition, subdivide, split, makeCut, isSmallEnough, detectStraight
mfcg.utils.PolyUtils  inset, smooth, smoothOpen, simplify, visvalingam, lerpVertex
mfcg.utils.PathTracker new, reset, length, getSegment, getPos, get_tangent
mfcg.utils.Cutter     grid
utils.Perlin/Noise    Perlin.get ; Noise.new/fractal/get      (Noise = 6-octave fractal Perlin)
utils.Random          reset, save, restore, float
utils.MathUtils       gate
model.City            (see §3.1) + cellsByVertex, getNeighbour, getOcean, getCanalWidth,
                      addHarbour, splitEdge, getDetails, getViewport, updateDimensions, rerollName
```

Notable absences from the executed set (announced or expected, never called in these recordings): **`Forester`** — no class of that name executed in any of the 7 samples, and no tree glyphs appear in the screenshots; trees/`colorTree` exist in the palette JSON but were not exercised (`greens=1` produced flat `colorGreen` park polygons only). `[NAMED-ONLY]`/absent.

---

## 6. Geometry toolkit — techniques catalogue

### 6.1 `PoissonPattern` — a precomputed blue-noise pattern, built once per page load `[SHOWN]`

Counts are **identical in every cold load and zero on Enter-regeneration** (A gen-0 has them, A gen-1..3 have 0; every B gen is a reload so all three have them):

```
PoissonPattern.new 1 · step 230 · emit 140 · warp 11 500 · validate 11 500
```

`warp / step = validate / step = 11 500 / 230 = 50.000` exactly.

⇒ **Bridson-style Poisson-disc sampling with k = 50 candidate attempts per step; 230 steps produced 140 accepted points.** `warp` transforms a candidate before `validate` tests it against the existing set (a warped/anisotropic disc rather than a circular one). It runs in a **static initialiser** (call tree: `?.E → ?.(anon@6305) → PoissonPattern.new`, 6–11 ms, before `Main.new`), so the 140-point pattern is a **reusable constant**, not per-city. `[SHOWN]` + `[INFERRED]`

Its consumer is not visible in these recordings (nothing calls it during a build). Most plausible uses: stipple/texture placement, tree scatter, or jitter for shantytown/farm placement. **Test:** dump the 140 points and compare against the visible scatter in a `greens=1&farms=1` map.

### 6.2 Straight skeleton — `SkeletonBuilder` `[SHOWN]` + `[INFERRED]`

`SkeletonBuilder.run` count tracks `District.new` count: 7/8/9/6/17/15/16 vs 7/5/9/6/17/15/14 — equal in 4 of 7 samples and 1–3 higher in the rest (a couple of extra skeletons, probably for the castle/market wards or for a district whose ridge is recomputed). Methods `step`, `merge`, `intersect`, `getPath`, `getPath2Root`, with helper types `_SkeletonBuilder.Node` and `_SkeletonBuilder.Segment` and `geom.Rib`. `intersect` 2 116 for 15 districts (~140/district) — the classic event-queue straight-skeleton: offset every edge inward at unit speed, compute edge/split events, merge nodes.

Its output feeds `District.getRidge` (2 × per district) → `annotations.Ridge.build` → `annotations.Equator.build` + `Equator.largestSpan` → `CurvedLabel`. ⇒ **the straight skeleton's longest root-to-leaf path is the "ridge"/medial spine of the district, and the district's name is set along it.** This is exactly what the screenshots show: "C L E A R  P A S S", "M O O N W E L L  W E L L" etc. follow the long axis of their district, curving with it. `[INFERRED]`, very high confidence.

### 6.3 Curve smoothing

* `geom.Chaikin.render` — 14–56 calls per city. Chaikin corner-cutting. `[SHOWN]`
* `geom.Cubic.{build, smoothOpen, cubic, c}` — `build` == `smoothOpen` == 2 × #districts; `cubic` = 12 × `build`. Cubic spline through the ridge polyline, sampled 12 × per segment, so letters sit on a smooth curve. `[INFERRED]`
* `PolyUtils.{smooth, smoothOpen, simplify, visvalingam, inset, lerpVertex}` — `simplify` == `visvalingam` 1:1 (28–34/city, 2 per district) ⇒ **Visvalingam–Whyatt area-based simplification** of the ridge before smoothing. `[SHOWN]`
* `RoadsView.{smoothRoad, cutCorner}` — `cutCorner` 34–223 per city, `smoothRoad` 6–16: roads get corner-cut (Chaikin-like) before drawing. `[SHOWN]`

### 6.4 Polygon module split (2017 `Polygon.hx` → 7 modules)

| 2017 `Polygon` method | live home |
|---|---|
| `square/centroid/center/perimeter/compactness` | `PolyCore.{area, centroid, center, perimeter, compactness}` |
| `getBounds` | `PolyBounds.{aabb, rect}` |
| — (new) | `PolyBounds.{obb, convexHull, lir, lira}` — oriented bbox, convex hull, **largest inscribed rectangle** |
| `contains` | `PolyBounds.containsPoint` |
| `cut/split/peel` | `PolyCut.{cut, pierce, peel}` |
| `shrink/shrinkEq/inset/insetAll/buffer` | `PolyCut.{shrink, shrinkEq}` + `PolyUtils.inset` |
| `offset/rotate` | `PolyTransform.{translate, rotateYX, asRotateYX, asTranslate, asAdd}` |
| `rect/regular/circle` | `PolyCreate.{rect, regular, stripe}` — `stripe` is new (hatching / field furrows) |
| `isConvexVertexi` | `PolyAccess.isConvexVertexi` |
| — (new) | **`PolyBool.{and, augmentPolygons}`** — true boolean intersection |
| `interpolate` | `WardGroup.interpolate` + `GeomUtils.barycentric` + `Triangulation.earcut` |

`PolyBounds.lir`/`lira` ("largest inscribed rectangle", 4–12 calls per city) are new and almost certainly used to place the castle keep and the big solid landmark buildings — the black keep in Feygate/Deeplake is a single large rectangle inscribed in the castle ward. `[INFERRED]`

### 6.5 Miscellaneous

* `GeomUtils.converge` (0–5 071 calls, present only in some builds) — `[NAMED-ONLY]`; in context most likely an iterative relaxation helper.
* `utils.MathUtils.gate` (30–1 584) — a clamp/threshold.
* `utils.Random.{reset, save, restore, float}` — **`save`/`restore` are new**: the RNG state is checkpointed (3–28 saves, 33–89 restores per run). This is how a sub-generator can be retried without desynchronising the rest of the stream, and how `Tracery` can be re-rolled deterministically. The 2017 `Random` was a bare Lehmer generator `seed = (seed · 48271) mod 2147483647` with no save/restore. `[SHOWN]` + `[INFERRED]`
* `utils.ArrayExtender` has 22 executed methods (`revert` alone 81 578 in B1 — reversing point arrays inside the bisector), up from the 2017 helper set.

---

## 7. Cost model

### 7.1 Model generation, per stage (ms, from the build's own `Stopwatch`)

Profile-pass numbers (CPU profiler attached, no coverage instrumentation) — `captures/*/profile/console.jsonl`:

| seed / size | patches | optJunc | domains | walls | streets | canals | wards | towers | **geometry** | total |
|---|---|---|---|---|---|---|---|---|---|---|
| 1797499862 / **24** | 2 | 1 | 0 | 0 | 2 | 0 | 0 | 0 | **11** | 16 |
| 783571982 / **33** | 5 | 1 | 0 | 2 | 5 | 5 | 0 | 0 | **21** | 39 |
| 1781764160 / **32** | 5 | 1 | 3 | 0 | 2 | 0 | 1 | 0 | **55** | 67 |
| 1113130424 / **25** | 9 | 1 | 0 | 2 | 4 | 2 | 4 | 0 | **60** | 82 |
| 985148067 / **80** | 2 | 1 | 2 | 0 | 3 | 7 | 1 | 0 | **125** | 141 |
| 2128702816 / **80** | 5 | 2 | 3 | 0 | 5 | 7 | 3 | 0 | **162** | 187 |
| 777002 / **80** | 5 | 3 | 2 | 1 | 3 | 3 | 1 | 0 | **260** | 278 |

Under **coverage instrumentation** the same size-80 cities cost `buildGeometry` 602–1 426 ms — i.e. coverage inflates the model ~4–6 ×. Use the profile column.

Shape of the curve: everything except `buildGeometry` is ≲ 10 ms and essentially flat in `size`; `buildGeometry` goes 11 ms → 60 ms → 260 ms for size 24 → 25 → 80. `buildGeometry` is **80–93 % of generation**. `[STATED]`

Failed attempts cost `buildPatches..buildStreets` ≈ 10–30 ms each and are pure waste; the worst recorded run burned 7 attempts.

### 7.2 Where the *wall-clock* goes (B profile gen-0, size 80, cold load: wall 2 891 ms, busy 1 087 ms, idle 1 804 ms)

| bucket | ms | notes |
|---|---|---|
| `lime.media.AudioContext.new` | **136.6** | pure startup tax, no audio is used |
| OpenFL shader compile (`Shader.__createGLShader/__createGLProgram`) | 46 + 11 (and **89.5 ms** on A gen-0) | first-frame only |
| `HTML5Window.createContext` | 44.5 | first-frame only |
| `lime.text.Font.__loadFromName` | 13.3 | first-frame only |
| **`City.build` (model)** | **203.6** | of which `buildGeometry` 143.3 |
| `TownScene.recreateMap → FormalMap.new` (vector emit) | 34.6 | `PatchView.draw` 26.4, `BuildingPainter.paint` 26.2 |
| **OpenFL/Canvas rasterisation of one frame** (`Context3DGraphics.render → CanvasGraphics.render`) | **170–230** | `playCommands` 50–57 self, `closePath` 25–30 self, `endStroke` 66, `endFill` 51 |
| texture upload `RenderContext.texImage2D` | 11–38 | per cached-bitmap layer |
| text (`Context3DTextField`, cache-bitmap + filter pass) | 40–73 | district labels have an **outline filter** (`__renderFilterPass` → shader init 19–37 ms) |

⇒ **Rendering one size-80 map costs as much as generating it, and the Canvas2D path replay dominates.** For a 36 480-building map the draw record shows **345 944 `lineTo`, 209 672 `beginPath`, 174 686 `closePath`, 104 728 `stroke`, 34 950 `fill`, 69 900 `translate`** — ~140 000 draw log entries per frame. `[SHOWN]`

### 7.3 Draw-call scaling

| capture | size | buildings (`drawRoof`) | `lineTo` | `stroke` | `fill` |
|---|---|---|---|---|---|
| A draw gen-0 (Feygate) | 25 | 600 | 15 137 | 4 063 | 1 368 |
| B draw gen-0 (Great Market) | 80 | 15 367† | 345 944 | 104 728 | 34 950 |
| B draw gen-1 | 80 | 36 480 | — (log truncated) | 247 300 strokes | 46 009 |

†B gen-0's count is the log-truncated figure; the coverage census for the same parameters gives 36 480.

---

### 7.4 Verified 1:1 call-count identities (the backbone of every inference above)

Checked across all 7 coverage samples; **OK** = identical in all seven.

| identity | result |
|---|---|
| `Style.getTint` == `District.new` | OK (7,5,9,6,17,15,14) |
| `PolyUtils.simplify` == `PolyUtils.visvalingam` | OK (14,5,9,6,34,30,28) |
| `GraphicsExtender.drawPolygonAt` == `BuildingPainter.drawRoof` | OK (600,761,1548,704,15367,36480,13349) |
| `Triangulation.earcut` == `WardGroup.filter` | OK (7,8,8,5,18,18,13) |
| `PolyBounds.convexHull` == `PolyBounds.obb` == `PolyTransform.asRotateYX` | OK (1855,3452,3895,2045,48039,115518,40889) |
| `PointExtender.project` == `Bisector.makeCut` | OK (1027,2128,2074,1086,29271,69916,24220) |
| `WardGroup.getTris` == `WardGroup.interpolate` | OK (194,1014,223,221,12343,34235,8783) |
| `Circle.new` == `WardGroup.getCircle` == `WardGroup.getArc` | OK (7,15,18,11,265,496,246) |
| `Cell.new` == `Face.new` | OK (183,174,289,185,1221,615,4283) |
| `Bisector.new` == `Bisector.partition` | OK (67,82,184,80,1457,3846,1335) |
| `Delaunator.circumradius2` == `(8·size+4) × attempts` | OK (204,204,316,212,1288,644,4508) |
| `Perlin.get` == `6 × Noise.get` | OK wherever `coast=1` (6.000 exactly, 5 samples) |
| `PoissonPattern.warp / step` == `validate / step` == 50 | OK (every cold load) |
| `PatchView.new` == `Ward.new` | 5/7 exact; off by 2–12 in B0/B2 (some wards get no view) |
| `SkeletonBuilder.run` vs `District.new` | 4/7 exact, +1..+3 otherwise |
| `Cutter.grid` vs `Farm.new` | 1/7 exact — **not** a 1:1 relationship |

---

## 8. Labels, overlays, legend

* `LabelsOverlay.{update, recreateLabels, updateDistrict, layoutDistrict, layout, exportPNG, onDestroy}` — `updateDistrict` == `District.new` count; `layoutDistrict` == 2 × districts.
* `CurvedLabel.{new, setText, arrange, getRidgeSegment, removeOutline}` + `_CurvedLabel.Letter.new` — **one `Letter` per character**, placed along the ridge spline with `PathTracker.{getPos, get_tangent}`. `Letter.new` 59–188 per city; `PathTracker.getPos` 71–444. `removeOutline` once per label ⇒ the label is rendered with an outline/glow filter and then the outline is stripped from the inner glyphs (the halo effect visible around every district name). `[SHOWN]` + `[INFERRED]`
* The draw record proves the letter-by-letter rendering: 117–189 separate `fillText` calls of single characters at `27px "IM FELL Great Primer Roman"`.
* `Compass.{new, update, drawStar, updateLabel, updateNorth, reroll}` — an 8-point star drawn as a dark polygon + a `colorPaper` polygon (two `fill`s on a 164×163 canvas) plus an `N`. `reroll` once per page ⇒ the compass rose style is randomised per session. `[SHOWN]`
* `ScaleBar`/`ScaleBarOld`/`ScaleBarOverlay` + `UnitSystem.{get_current, getPlank}` — the scale bar renders `0 / 100 / 200 / m` (size 25) or `0 / 500 / 1000 / m` (size 80) at `21px`. `getPlank` suggests non-metric unit support. `[SHOWN]`
* `GridOverlay` — a single `stroke #1a1917 w0.267` over the whole 1504×1103 canvas: the faint graticule visible in every screenshot.
* `Frame`, `Legend`, `LegendOverlay.getAutoPos/pos2point`, `TitleOverlay`, `Title.filterOn`, `EmblemOverlay`, `PinsOverlay`+`Pin.number`, `MarkersOverlay` — the printable-map furniture. `Title` uses `54px "IM FELL Great Primer Roman"`; the Menu button uses `18px "Share Tech Regular"` on a `#3d3940` rect.

---

## 9. Naming — Markov + Syllables + Tracery `[STATED]`

* **Corpora** (four `Markov.new` calls per page, matching four text assets):
  `Assets/english.txt` (6 166 B, ~900 common English words), `Assets/given_male.txt` (808 B, medieval given names: Adam, Adalwolf, Agnar, Ailwin, Alan, Alard, Albert, Aldred…), `Assets/given_female.txt` (665 B: Ada, Adelina, Agnes, Albreda…), `Assets/elven.txt` (332 B: aegnor, amarie, amdir, amras, amroth, anaire, angrod, annael, aredhel, argon, arwen, beleg, caranthir, celeborn…). `Markov.split` 1 241 calls at load = tokenising the corpora. `[STATED]`
* **`nlp.Syllables.{split, splitWord, pinch}`** — `pinch` is the syllable-elision used by the `.merge` modifier so `candle`+`soul` → *Candlesoul*, `ash`+`rise` → *Ashrise*, `dawn`+`ford` → *Dawnford*, `fey`+`gate` → *Feygate*. `[INFERRED]`
* **`com.watabou.tracery.*`** is a Haxe port of Kate Compton's Tracery with extensions: `Grammar.{loadFromRawObj, addAutoRules, addExternal, addModifiers, pushRules, popRules, selectRule, validateRule, eval, createRoot, expand, flatten, clearState}`, `Symbol`, `RuleSet`, `TraceryNode`, `NodeAction` (with `createUndo` — rules can be pushed and undone), `DeckRuleSelector` (draw-without-replacement selection, so a name isn't repeated), `ExtSymbol`, `ModsEngBasic`.
* **`Namer.{reset, cityName, nameDistricts, getDistrictNoun, getDirection, merge}`** — `nameDistricts` once per city; `getDistrictNoun`/`getDirection` once per district.

### 9.1 `Assets/grammar.json` — the complete naming grammar, verbatim

Captured at `captures/mfcg/2026-09-21T05-06-58/profile/network/bodies/0015-5ba58ea2.json` (4 401 bytes). Syntax extensions beyond stock Tracery: `{a|b|c}` inline choice, `{suffix}` optional suffix, `0.5?-x` probability guard, `FLAG?-x` / `!FLAG?-x` feature guard, `@sym` alias, `#[_:…]_.merge#` merge modifier, `#x.s#` plural modifier.

```json
{
  "city": ["#proper#{ #feature#}", "#[_:#adjPlace# #feature#]_.merge#"],
  "feature": ["{hill|mount|rock}", "{wood|grove}", "field", "cliff{s}", "vale",
    "CASTLE?-{castle|keep|tower|hold}", "WALLS?-{wall|gate}", "TEMPLE?-church",
    "PLAZA?-{market|fair}", "RIVER?-{river|falls|water|0.5?-ford}",
    "COAST?-{sea|lake|coast|shore|beach|strand|wharf|port}"],
  "district": ["{0.5?-#proper#|#adjPlace#} #place#", "{0.2?-#proper#|#adjObj#} #obj#",
    "0.2?-{#adj#|#proper#} #districtNoun#", "0.1?-#proper#",
    "0.1?-the {#obj#|0.3?-#obj.s#}", "0.05?-#number# #obj.s#",
    "0.05?-#color# #obj.s# #districtNoun#"],
  "centralDistrict": ["old #cityName#", "old #districtNoun#", "{trade|merchants|market} #districtNoun#"],
  "castleDistrict": ["COMPACT?-{castle|0.5?-citadel|0.2?-fortress}",
                     "!COMPACT?-{castle|military|upper} #districtNoun#"],
  "docksDistrict": ["UNIQUE?-the #docksNoun#", "UNIQUE&0.5?-#docksNoun# #districtNoun#",
                    "!UNIQUE?-{#adj#|#dir#} docks"],
  "parkDistrict": ["UNIQUE?-the #parkNoun#", "{#adj#|#proper#} #parkNoun#"],
  "bridgeDistrict": ["#[_:#adj# #bridgeNoun#]_.merge#", "0.5?-#proper# #bridgeNoun#"],
  "gateDistrict": ["#[_:#adj# #gateNoun#]_.merge#", "0.5?-#proper# #gateNoun#"],
  "bankDistrict": "#adj# #bankNoun#",
  "sprawlDistrict": ["UNIQUE?-new #cityName#", "UNIQUE?-the slums",
                     "#dir# {#cityName#|slums}", "#district#", "#district#"],
  "docksNoun": ["docks","port","harbour"],
  "bridgeNoun": ["bridge","0.2?-ford","0.2?-crossing","0.1?-ferry"],
  "gateNoun": ["gate","0.5?-road","0.1?-way"],
  "bankNoun": ["bank","side","0.2?-wharf"],
  "parkNoun": ["green","hill","0.5?-garden{s}","0.2?-park","0.1?-grove"],
  "adj": ["@adjObj","@adjPlace"],
  "adjObj": ["new","old","free","iron","silver","golden","copper","stone","timber","silk","wool",
    "cotton","{char|ember|ash}","pearl","clay","bone","glass","egg","milk","bread","salt","spice",
    "{beer|ale|mead}","wine","honey","cattle","fish","chicken","cherry","apple","oak","ivy","elm",
    "rose","#occupation.s#","@color"],
  "adjPlace": ["#dir#","new","old","free","far","high","low","middle","long","deep",
    "{spirit|ghost}","{fairy|fey}","haunted","night","noon","dawn","dusk","twilight","misty",
    "clear","rainy","forest","COAST?-sea","great","little","#occupation.s#","#occupation.s#","@color"],
  "color": ["white","black","green","grey","red","purple","blue","light","dark","bright","{pale|ashen}"],
  "occupation": ["tanner","cobbler","barber","carpenter","mason","merchant","tailor","artist","smith",
    "potter","hermit","bard","hunter","fool","weaver","artisan","baker","butcher","brewer","scholar",
    "scribe","witch","shepherd","farmer","murderer","beggar","thief","smuggler","cutter",
    "WALLS?-{king|lord}","CASTLE?-{knight|soldier|archer}","TEMPLE?-{priest|nun|pilgrim|prophet}",
    "COAST?-{fisher|sailor}"],
  "noun": ["@obj","@place"],
  "obj": ["{spring|brook}","{orchard|garden}","heath","rock","cliff","tower","{hall|lodge}","mill",
    "{church|chapel|shrine|temple}","well","{market|fair}","wall","court","forge","crown","cross",
    "crest","shade","star","ring","stair","arch","horn","knot"],
  "place": ["town","sprawl","village","side","end","reach","point","borough","edge","mile","yard",
    "water","street{s}","square","{walk|row}","steps","pass","{valley|vale}","ridge","hill","mire",
    "field","{wood|grove|park}","hook","market"],
  "number": ["{two|twin}","three","four","@0.1?-rareNumber"],
  "rareNumber": ["five","six","seven","ten"],
  "proper": "#prop1##prop2#",
  "prop1": ["amber","ash","black","candle","cloud","dagger","dark","down","dragon","ever","fen",
    "frost","green","grey","grim","mist","moon","red","sky","star","stone","storm","under","wolf"],
  "prop2": ["bark","bloom","crest","church","fall","fire","heart","hill","key","light","rise","soul",
    "tide","way","well","wind","wood"],
  "compound": "#adjNoun.merge#",
  "adjNoun": "#adj# #noun#",
  "dir": ["#north#","#south#","#east#","#west#"],
  "north": "north{ern}", "south": "south{ern}", "east": "east{ern}", "west": "west{ern}"
}
```

### 9.2 Every district type has its own rule — and this maps 1:1 onto the model

`centralDistrict`, `castleDistrict`, `docksDistrict`, `parkDistrict`, `bridgeDistrict`, `gateDistrict`, `bankDistrict`, `sprawlDistrict` ⇒ `DistrictBuilder.getType` returns one of ≥8 district types. Observed names confirm each:

| rule | observed label (capture) |
|---|---|
| `centralDistrict` | OLD FEYGATE, MERCHANTS DISTRICT, STONE TOWN |
| `castleDistrict` (COMPACT) | CASTLE |
| `docksDistrict` | THE DOCKS, NORTH DOCKS, SEA DOCKS, LIGHT DOCKS, PEARL DOCKS, EASTERN DOCKS, SOUTH DOCKS, DUSK DOCKS |
| `parkDistrict` | MERCHANTS GREEN |
| `bridgeDistrict` | FROSTWAY BRIDGE, HONEY BRIDGE, GREENWOOD BRIDGE, BLUEBRIDGE (merged) |
| `gateDistrict` | IVY GATE, DUSKGATE (merged), STONEBARK ROAD |
| `bankDistrict` | BLACK SIDE, BLUE BANK, PALE SIDE, CLAY WHARF |
| `sprawlDistrict` | GHOST SPRAWL, WESTERN SLUMS, NORTH SLUMS, EAST BRIGHTWOOD, WESTERN CITY, SOUTHERN CITY |
| `district` (generic) | CLEAR PASS, WOOL CROSS, SKYRISE SHADE, STONEHEART EDGE, ASHRISE KNOT, CLOUDRISE BOROUGH, MOONWELL WELL, EGG WELL, BRIGHTYARD, DRAGONSOUL REACH, CHICKEN SHADE, GOLDEN MILLS, WOOL TOWER, PURPLE SHADE, FREE VILLAGE, LONG TOWN, DAGGERSOUL RIDGE, SKYTIDE TOWN, DUSK POINT, GHOST FIELD, BRIGHT CREST, FROSTFIRE |

City names observed: **Feygate** (`adjPlace fey` + `WALLS?-gate`, merged), **Brightwood** (`color bright` + `{wood|grove}`, merged), **Deeplake** (`deep` + `COAST?-lake`, merged), **Candlesoul Market** (`proper candle+soul` + `PLAZA?-market`), **Stormway** (`proper storm+way`, no feature), **Great Market** (`great` + `PLAZA?-market`, **not** merged — so `.merge` declines to join when `Syllables.pinch` finds no elision). `[INFERRED]`

**`UNIQUE` and `COMPACT` are runtime feature flags fed into the grammar** (`Grammar.addExternal`, 3 calls/page): `UNIQUE` = "this is the only district of its kind", `COMPACT` = the castle ward is compact enough to be named bare "Castle". `[INFERRED]`

---

## 10. Drawing record — palette, widths, fonts, layer order

### 10.1 Colour schemes ship as JSON assets `[STATED]`

Six files, identical key set. `default.json` (the one active in every recording):

```json
{ "colorGreen":"#A59F93", "colorLabel":"#1A1917", "colorTree":"#7F7A71", "colorDark":"#1A1917",
  "colorPaper":"#CCC5B8", "colorLight":"#CCC5B8", "colorRoad":"#CCC5B8", "tintStrength":"30",
  "tintMethod":"Brightness", "colorWater":"#7F7A71", "colorWall":"#1A1917", "weathering":"20",
  "colorRoof":"#A5A095" }
```

| scheme | paper | dark | roof | water | green | tree | wall | label | tintStrength | tintMethod | weathering |
|---|---|---|---|---|---|---|---|---|---|---|---|
| default | `#CCC5B8` | `#1A1917` | `#A5A095` | `#7F7A71` | `#A59F93` | `#7F7A71` | `#1A1917` | `#1A1917` | 30 | Brightness | 20 |
| ink | `#CCCAC2` | `#130F26` | `#9A979B` | `#6C6974` | `#A5A2A2` | `#47454C` | `#130F26` | `#150C3F` | 40 | Brightness | 30 |
| bw | `#FFFFFF` | `#000000` | `#DDDDDD` | `#FFFFFF` | `#EEEEEE` | `#EEEEEE` | `#000000` | `#000000` | 0 | Brightness | 0 |
| vivid | `#FFF2C8` | `#4C5950` | `#D6A36E` | `#779988` | `#C3CC99` | `#667755` | `#606661` | `#2D3D4C` | 20 | Spectrum | 25 |
| modern | `#E5E5DA` | `#333333` | `#E5B75B` | `#59A3B2` | `#CCCCA3` | `#777F66` | `#666660` | `#222222` | 25 | Overlay | 25 |
| natural | `#BFBFB5` | `#3F322C` | `#66707F` | `#8F9997` | `#8D927B` | `#777F66` | `#4C4C4C` | `#662C28` | 20 | Spectrum | 30 |

`mapping.Style.{getTint, spectrum, getStrokeWidth, restore}` consume these: `getTint` and `spectrum` are called **once per district** (7/5/9/6/17/15/14 — exactly `District.new`) ⇒ **each district gets one tint colour derived from the scheme by `tintMethod`, applied at `tintStrength`.** `weathering` is a further per-object randomisation not separable in these recordings. `[SHOWN]` + `[INFERRED]`

Direct proof of the mapping (B draw gen-1/2): `fill #a59f93` count == `PatchView.drawGreen` count, exactly (4 / 3 / 3). `fill #a5a095` count == `BuildingPainter.drawRoof` count, exactly (15 367 / 36 480 / 13 349). `[SHOWN]`

Two more colours appear that are **not** in the JSON: `#d9d5c3` (the page background behind the map sheet, one `fillRect` 1×1) and `#3d3940` (the Menu chrome). `#ff0000`/`#000000` 1×1 fillRects are OpenFL preloader internals.

### 10.2 Fonts

| font string | count per map | use |
|---|---|---|
| `27px "IM FELL Great Primer Roman"` | 117–189 | district labels — one `fillText` per **character** |
| `21px "IM FELL Great Primer Roman"` | 4 | scale bar `0`, `100/500`, `200/1000`, `m` |
| `54px "IM FELL Great Primer Roman"` | 1 | city title |
| `18px "Share Tech Regular"` | 1 | "Menu" button |

`lineJoin: round` on essentially everything (104 727 of 104 728 in B gen-0; exactly one `miter`). `lineCap: round` on 104 647, `butt` on 81 — the `butt` caps are the scale bar, grid and a handful of structural lines. `[SHOWN]`

### 10.3 Stroke widths — two families

All widths are the values passed to `ctx.lineWidth` *in the shape's local space*, before OpenFL's `setTransform`.

**Scale-invariant (constant screen px, so constant local units too because these are drawn on unscaled layers):**

| width | element | evidence |
|---|---|---|
| `1.9` | **curtain wall**, exactly 2 strokes per map (city wall + castle wall) | present in every one of the 7 draw records at count 2 |
| `0.267` | grid overlay, 1 stroke on a 1504×1103 canvas | count 1 everywhere |
| `0.533` | scale bar + compass | count 6–8 |
| `2.0` | outer roads (core) in `colorRoad` | count 4–8 |
| `1.067` | 1 stroke (compass/legend) | count 1 |

**Scale-dependent (one "outline width" `t` per map, from `Style.getStrokeWidth`):**

| capture | size | `t` (building outline, count) | street core(s) | road casing / core | river casing / core |
|---|---|---|---|---|---|
| A draw gen-0 | 25 | **0.119** (×4 011) | 1.081, 1.881 | 2.237 / 2 | 7.375 / 7.138 |
| A draw gen-1 | 24 | **0.121** (×3 852) | 1.079, 1.879 | 2.242 / 2 | 7.096 / 6.854 |
| A draw gen-2 | 31 | **0.245** (×12 467) | 1.755 | 2.489 / 2 | 13.501 / 13.012 |
| A draw gen-3 | 31 | **0.143** (×4 950) | 1.057 | 2.285 / 2 | — (`river=0`) |
| B draw gen-0 | 80 | **0.556** (×104 624) | 0.644, 1.444 | 3.112 / 2 | 20.052 / 18.940 |
| B draw gen-1 | 80 | **0.905** (×247 265) | 0.295 (core of 2.105) | — (no roads) | 15.358 / 13.548 |
| B draw gen-2 | 80 | **0.578** (×91 128) | 0.622, 1.422 | 3.156 / 2 | 15.535 / 14.379 |

**The casing/core rule is exact: `casing = core + 2·t`.** Checks, one per record: `7.375−7.138 = 0.237 = 2×0.1185`; `2.242−2 = 0.242 = 2×0.121`; `2.489−2 = 2.245−1.755 = 13.501−13.012 = 0.489 = 2×0.2445`; `2.285−2 = 1.343−1.057 = 0.286 = 2×0.143`; `3.112−2 = 2.556−1.444 = 1.756−0.644 = 20.052−18.940 = 1.112 = 2×0.556`; `2.105−0.295 = 1.810 = 2×0.905`; `3.156−2 = 1.778−0.622 = 15.535−14.379 = 1.156 = 2×0.578`. Across **all seven** records, every casing/core pair differs by exactly `2·t`. `[SHOWN]`

⇒ **Every linear water/road/street feature is drawn as a two-pass "casing + core" ribbon: stroke the polyline in `colorDark` at `core + 2t`, then stroke the same polyline in `colorWater`/`colorRoad` at `core`.** This gives a perfectly uniform outline without any polygon offsetting. It is the technique behind the crisp river banks and street edges. `[INFERRED]`, but the arithmetic is exact in every sample.

Note `t` grows with city size (0.119 at size 25 → 0.556 at size 80) while street cores shrink (1.081 → 0.644): outlines are specified in **screen pixels** (converted into local units by dividing by the map scale), while street/river widths are in **world metres** (multiplied by the map scale). `[INFERRED]`

### 10.4 Building rendering `[SHOWN]`

Per building, in order:
1. `BuildingPainter.g` → `GraphicsExtender.drawPolygon(footprint)` filled `colorDark` `#1a1917` (count `g` 804 ↔ fills 786 at size 25; 45 954 ↔ 46 009 at size 80).
2. `BuildingPainter.drawRoof` → `GraphicsExtender.drawPolygonAt(sameOrOffsetPoly, offset)` filled `colorRoof` `#a5a095` (counts identical, 600 ↔ 577, 36 480 ↔ 36 480).
3. 3 `stroke`s at width `t` in `colorDark` (the run pattern is invariably `fill, stroke, stroke, stroke`).

⇒ **a dark footprint with a lighter roof polygon drawn at a small constant offset** — a cheap, uniform faux-extrusion that reads as a drop shadow at small zoom and as a 3-D roof at large zoom. Path complexity confirms the shape: 33 746 of 34 950 fills have **5–8 segments** (i.e. quadrilateral-ish lots), 1 177 have 9–16, only 6 have 1. `[SHOWN]`

### 10.5 Layer order (complete, from `draw/gen-0.draw.json`, A capture, run-length compressed)

```
 1  fillRect #ff0000 1×1, fillRect #000000 1×1 ×2        OpenFL preloader internals
 2  fillRect #3d3940 ×2, fillRect #d9d5c3                page background / UI chrome
 3  fill   #7f7a71 (159 segs) + 2 strokes #1a1917 w t    WATERBODY (sea)  FormalMap.drawWaterbody
 4  stroke #1a1917 w 2+2t  ×N                            ROADS casing     RoadsView.drawOutline
 5  stroke #ccc5b8 w 2     ×N                            ROADS core       RoadsView.drawFill
 6  stroke #1a1917 w W+2t                                RIVER casing     RiverView.drawCourse
 7  stroke #7f7a71 w W  +  fill #7f7a71 (mouth)          RIVER core + delta mouth  drawMouth
 8  [ per urban ward, repeated ]
       stroke #1a1917 w mainCore+2t / stroke #ccc5b8 w mainCore     STREET casing+core
       stroke #1a1917 w minorCore+2t / stroke #ccc5b8 w minorCore   ALLEY  casing+core
       { fill #1a1917 ; stroke×3 w t }  ×(lots)                     building footprints
       { fill #a5a095 ; stroke×3 w t }  ×(lots)                     building roofs
 9  stroke #1a1917 w 1.9 ×2                              CURTAIN WALLS (city + castle)
10  arc-based fills (19×19, 24×24 canvases) ×~20         WALL TOWERS (circles) + GATES (dark rects)
11  stroke #1a1917 w 0.267 on 1504×1103                  GRID overlay
12  stroke #1a1917 w 0.533 (229×15) + fillText 0/100/200/m   SCALE BAR (21px)
13  fill #1a1917 + fill #ccc5b8 + strokes w0.533 on 164×163 + fillText "N"   COMPASS rose
14  fillText ×1 per character, 27px                      DISTRICT LABELS along ridges
15  fillText city name, 54px                             TITLE
16  fill #3d3940 (53×36) + fillText "Menu", 18px Share Tech   UI
```

Farms/greens sit inside step 8 (they are ward geometry: `FarmPainter.paint` hatches with `PolyCreate.stripe`; `PatchView.drawGreen` fills `#a59f93`). Piers (`PatchView.drawPier`) are the thin radiating lines into the water, drawn with the ward that owns them. `[SHOWN]`

**Everything is re-emitted from scratch on every regeneration** — `TownScene.recreateMap → FormalMap.new` constructs a brand new display tree; there is no incremental update. `[SHOWN]`

---

### 10.6 Screenshot evidence — what each image demonstrates

Five screenshots were opened and read in full. Each is 1500 × 1100, `default` colour scheme.

**`2026-09-21T05-03-24/draw/gen-0.png` — "Feygate"** (`size=25, citadel=1, urban_castle=1, plaza=0, temple=1, walls=1, shantytown=0, coast=1, river=1, sea=1`).
The canonical small walled town. Shows: the curtain wall as a single smooth polyline with **filled circular towers at its vertices** and **solid dark rectangles at its gates**; the castle as a small walled **diamond inside the city** containing one large solid-black keep (the `PolyBounds.lir` hypothesis); the sea to the **west** (`sea=1` = 180°); a river running north–south through the town with a bridge; **piers** as thin straight lines radiating into the water at LIGHT DOCKS and SOUTHERN DOCKS; a white plaza blob; small solid-black squares = churches (`WardGroup.createChurch`); blocks as grey (`colorRoof`) building clusters separated by paper-coloured streets with visible dark casings; a few outlying buildings east of the wall (LONG TOWN) showing the density falloff; four roads leaving the map. District labels curve along their district's long axis.

**`2026-09-21T05-03-24/coverage/gen-2.png` — "Candlesoul Market"** (`size=39, citadel=1, urban_castle=0, coast=1, river=1, sea=0.3`).
Demonstrates the **detached citadel**: `urban_castle=0` puts CASTLE in its own separately walled enclosure *outside* the main ring, connected by a gate. Sea to the **north** (`sea=0.3` = 54°). Shows **farms** as faint hatched quadrilaterals outside the walls (the `PolyCreate.stripe` furrows), **shantytown** as sparse irregular buildings beyond the gates (GHOST SPRAWL, WESTERN CITY), the river passing through a **watergate** in the wall, and nine gates each spawning a road. The wall is noticeably rounder here than Feygate's — consistent with the `smoothFactor = min(1, 40/|patches|)` rule.

**`2026-09-21T05-03-24/draw/gen-1.png` — "Brightwood"** (`size=24, urban_castle=1, coast=1, river=1, sea=0.6`).
Sea to the **north-north-west** (108°). Best view of the **river-through-wall** case: the wall crosses the river twice and the enclosed area is split into two lobes joined at a bridge, with EAST/WEST bank districts (WEST DOCKS / EASTERN DOCKS, and the `bankDistrict` naming rule). Also the clearest view of **piers** and of the tight cluster of solid-black landmark buildings around MERCHANTS DISTRICT.

**`2026-09-21T05-03-24/draw/gen-3.png` — "Deeplake"** (`size=31, citadel=1, urban_castle=0, coast=1, river=0, sea=1.8`).
Sea to the **east/south-east** (324°). No river. Shows the castle annex attached to the *south* wall; a very regular near-circular wall; large hatched **farm** blocks north-west and east; two roads; the docks quarter with piers; and — importantly — that with `river=0` the `buildCanals` stage costs 0 ms and no `Canal.hx` traces appear.

**`2026-09-21T05-06-58/draw/gen-0.png` — "Great Market"** and **`.../draw/gen-2.png` — "Stormway"** (`size=80`, everything on).
The stress cases. Show: a **meandering river with a widening delta mouth** into the sea (`deltaRiver`); ~36 000 buildings rendered at a scale where the footprint/roof pair reads as texture rather than as individual houses; **parks** as flat `#a59f93` polygons inside the urban fabric (MERCHANTS GREEN, and several unnamed ones in Stormway); farms as very faint field groups at the city's edge; the **castle reduced to a tiny walled parcel** relative to the city; a **wall that no longer encloses the city** (the shantytown/sprawl has long outgrown it); the scale bar reading 0–1000 m versus 0–200 m for the small towns; and the density falloff producing the characteristic ragged, organic city outline. These are the images that show MFCG's signature look most clearly: a dense grain of tiny quadrilateral lots, white street voids, curved all-caps district labels with a paper-coloured halo, and a hairline graticule.

---

## 11. Failure modes and how the build handles them

| symptom | site | handling | frequency observed |
|---|---|---|---|
| `Unable to build a street!` | `City.hx:591` | **logged, ignored** (a city with 8 completed fine). 2017 threw here. | 11 in 10 attempts (size 80) |
| `discard` (canal course rejected) | `Canal.hx:216` regular / `Canal.hx:268` delta | retry the course | 282 in 10 attempts (size 80); 1–11 on success |
| `*** Unable to build a canal!` | `City.hx:156` | **abort the whole city, re-roll the seed, restart at `buildPatches`** | **7 of 10 attempts** at size 80 with river+coast; 2 of 6 at size 24–31 |
| citadel compactness < 0.75 | `Castle.hx:84` | **repair**: iterate `equalize()` (1–20 iterations) | 57 traces in 10 attempts |
| citadel too small | `Castle.hx:60` "Bloating the citadel..." | **repair**: grow it | ~1 in 6 cities |
| `Failed to create a non-empty alleys group` | `WardGroup.hx:107` | logged, that group produces nothing | 1–2 per capture |
| `(0) Failed to make a cut` | `Bisector.hx:281` | logged with a counter `(0)`; the recursion node yields no split | 2 per capture |

**Design lesson for an original generator:** watabou's failure policy is tiered — *repair* for shape-quality problems (citadel), *local retry* for path search (canal course), *silent skip* for local geometry (streets, alley groups, cuts), and *full restart with a new seed* only for the one condition that would leave the city structurally wrong (no river when a river was requested). The 70 % restart rate at size 80 shows the cost of putting a hard constraint in the restart tier.

---

## 12. Diff vs `reference/TownGeneratorOS` (2017, Haxe, GPL-3)

### 12.1 Pipeline

| 2017 `Model.build()` | live `City.build()` | change |
|---|---|---|
| `buildPatches` | `buildPatches` | **replaced**: own `Voronoi.hx` (Bowyer–Watson + `relax` ×3 on 4 chosen points + `partioning`) → **Delaunator** + `getVoronoi` + DCEL; per-cell 6-octave fractal Perlin water field added |
| `optimizeJunctions` | `optimizeJunctions` | **replaced**: ad-hoc 8-unit vertex merge + duplicate cleanup → `DCEL.collapseEdge` |
| — | **`buildDomains`** | **NEW**: `DCEL.split` + `floodFill`, coast only |
| `buildWalls` | `buildWalls` | kept (`CurtainWall`, gates via entrance filtering + neighbour exclusion, `buildTowers`, smoothing `min(1,40/n)`); **added** `addWatergate`, `splitSegment`, `getTowerRadius`; **citadel repair replaced the `throw "Bad citadel shape!"`** |
| `buildStreets` (+`tidyUpRoads`) | `buildStreets` (+`tidyUpRoads`) | kept name-for-name, incl. `Topology`+`Graph.aStar`; failure downgraded from `throw` to `trace`; `Topology.excludePolygon/excludePoints` added |
| — | **`buildCanals`** | **NEW**: `Canal` with `regularRiver`/`deltaRiver`, `validateCourse`, `getCanalWidth`, bridges, watergates, delta mouths |
| `createWards` (deck of 36 `WARDS` + `rateLocation`) | `createWards` | **replaced** by `DistrictBuilder` + `Grower`/`DocksGrower`/`ParkGrower` region growing over cells; ward taxonomy collapsed from 13 classes to `Alleys`+specials, flavour moved to `District` |
| — | **`buildCityTowers`** | **NEW** (always 0 ms) |
| `buildGeometry` (per-patch `createGeometry`) | `buildGeometry` | **rewritten**: `WardGroup` → `Block`/`TwistedBlock` → `Bisector` (OBB-driven); `Block.filterInner`, `Block.indentFronts` with real polygon booleans; `Farm` via `Cutter.grid`; names via Tracery; district ridges via straight skeleton |
| — | `buildFarms`, `buildShantyTowns` | **NEW** as explicit stages (2017 had a `Farm` ward and a `Slum` ward but no shantytown belt) |

### 12.2 Libraries and utilities

| 2017 | live | note |
|---|---|---|
| `geom.Voronoi` (Triangle/Region, `relax`, `partioning`) | `geom.Delaunator` + `geom.DCEL`/`HalfEdge`/`Face`/`Vertex`/`EdgeChain` | complete replacement |
| `geom.Polygon` (one 540-line class) | `geom.polygons.{PolyCore,PolyBounds,PolyBool,PolyCut,PolyCreate,PolyTransform,PolyAccess}` | modularised; **`PolyBool`, `obb`, `convexHull`, `lir`, `stripe` are new** |
| `geom.Spline` | `geom.Cubic` + `geom.Chaikin` + `PolyUtils.{smooth,simplify,visvalingam}` | new smoothing/simplification stack |
| `geom.Graph.aStar` | `geom.Graph.aStar` | **unchanged**, including the O(V) `keys()` open-set scan that still shows up as 15.8 ms in profiles |
| `geom.GeomUtils` (5 fns) | `geom.GeomUtils` (`intersectLines, lerp, barycentric, converge, triArea`) | `interpolate`→`lerp`; `barycentric`, `converge`, `triArea` new |
| `building.Cutter.{bisect,radial,semiRadial,ring}` | `mfcg.utils.Bisector` (7 methods) + `PolyCut.peel` + `mfcg.utils.Cutter.grid` | `bisect`→`Bisector`, `ring`→`peel`, `radial`/`semiRadial` not observed, `grid` new |
| `utils.MarkovChain` | `nlp.Markov` + `nlp.Syllables` + `com.watabou.tracery.*` + `linguistics.Namer` | whole naming subsystem is new; 4 external corpora + a grammar asset |
| `utils.PerlinNoise` | `utils.Perlin` + `utils.Noise` (6-octave fractal wrapper) | wrapper is new |
| `utils.Random` (Lehmer 48271) | `utils.Random` + **`save`/`restore`** | RNG checkpointing is new |
| — | `geom.SkeletonBuilder` (straight skeleton) | **NEW** |
| — | `geom.PoissonPattern` (Bridson, k=50) | **NEW** |
| — | `geom.Triangulation` (earcut) | **NEW** |
| — | `system.State` / `system.URLState` / `model.Blueprint` | **NEW** — the shareable-URL parameter system |
| `coogee.{Game,Scene,Atlas,BitmapText,MovieClip,NinePatch}` | `coogee.{Game,Scene}` + `coogee.ui.{View,Button,Menu,VBox,UIStyle,SolidRect}` | the in-house framework grew a UI layer |
| `mapping.{Palette,Brush,CityMap,PatchView}` | `mapping.{Style,FormalMap,PatchView,RoadsView,WallsView,RiverView,BuildingPainter,FarmPainter}` + 6 JSON schemes | palette moved from code constants to data; renderer split per feature |
| — | `scenes.overlays.*` (19 classes) | **NEW** — printable-map furniture: legend, frame, compass, scale bar, grid, pins, markers, emblem, curved labels |

### 12.3 What survived unchanged

* `8 × size` seed points (now `+4`).
* `CurtainWall`'s gate-selection algorithm (entrances = wall vertices with >1 adjacent inner ward; random pick; splice out neighbours so gates are never adjacent; smooth the gate vertex afterwards).
* `Topology` + A* for streets, and `tidyUpRoads`' segment-dedup-then-rechain.
* The **0.75 citadel compactness threshold**.
* The palette anchors: 2017 `Palette.DEFAULT = (paper 0xccc5b8, light 0x99948a, medium 0x67635c, dark 0x1a1917)`; live `default.json` keeps `colorPaper #CCC5B8` and `colorDark #1A1917` **exactly**, and 2017's `INK` palette `(0xcccac2, 0x9a979b, 0x6c6974, 0x130f26)` is live `ink.json` **verbatim** (`colorPaper #CCCAC2`, `colorRoof #9A979B`, `colorWater #6C6974`, `colorDark #130F26`). Nine years of visual continuity, in the data.
* The density-falloff idea for outskirts (2017 `Ward.filterOutskirts` with per-vertex density + `interpolate`) → live `WardGroup.filter/interpolate/getTris` + `GeomUtils.barycentric`.

---

## 13. Per-subsystem `[INFERRED]` hypotheses with tests

| subsystem | hypothesis | how to falsify |
|---|---|---|
| `buildPatches` | Vogel/Fermat spiral of `8n+4` points, `a = sa + √i·5`, `r = 10 + i·(2+rand)`, then Delaunay→Voronoi, hull cells dropped | re-implement and compare the distribution of cell areas vs radius against the screenshots' visible cell sizes; check `#cells == 8n+4 − |hull|` |
| coast | per-cell 6-octave fractal Perlin, thresholded, with a directional bias given by `sea·π` | sweep `sea` from 0 to 2 in 0.1 steps with a fixed seed; the water mass centroid should rotate uniformly CCW |
| `buildDomains` | `DCEL.split` along the land/water boundary + `floodFill` to label connected land components | set `coast=0`: `DCEL.split`/`floodFill` must be 0 (**already confirmed**) |
| `Bisector` | OBB-driven recursive binary subdivision; stop when the OBB's short side < a target; cut perpendicular to the OBB long axis, with `detectStraight` snapping the cut to an existing collinear run | compare lot aspect-ratio histograms against 2017's implementation (§4.9) |
| `Block.indentFronts` | intersect each block with an inset copy (`PolyBool.and`) to set back building fronts | count `PolyBool.and` per block: should be ~1 per lot-row, and the visible street-to-building gap should equal the inset |
| `WardGroup.interpolate` | ear-clip the ward once, then barycentrically interpolate a per-vertex density to get each building's survival probability | `Triangulation.earcut` count should equal `WardGroup.filter` count (**already confirmed**), and building density should fall off toward non-urban neighbours |
| `Castle.equalize` | `while (compactness < 0.75) { trace(c); equalize(); }`, edge-length equalisation | any traced `Equalizing...` value ≥ 0.75 refutes it |
| `Canal` | A*-routed course with a validity test and a ~40-try budget; `deltaRiver` when a sea exists, `regularRiver` otherwise; per-node width | `coast=0` must never log `Canal.hx:268`; `coast=1` must never log `Canal.hx:216` (**already confirmed 4/4**) |
| `District` ridges | straight skeleton → longest root-to-leaf path → Visvalingam simplify → cubic smooth → letters placed by `PathTracker` arc-length | `SkeletonBuilder.run` must track `District.new` (**confirmed: equal in 4/7 samples, +1..+3 otherwise**); `PolyUtils.simplify == PolyUtils.visvalingam` 1:1 (**confirmed 7/7**) |
| casing+core strokes | every linear feature stroked twice, `casing = core + 2·t` | measured exactly in all 7 draw records |
| buildings | dark footprint + `colorRoof` polygon at a constant offset | `drawPolygonAt` count must equal `drawRoof` count (**already confirmed**) |
| `PoissonPattern` | Bridson k=50, 140 points, static, reused | `warp/step == validate/step == 50` (**already confirmed**); consumer still unknown |
| `Style` tint | one tint per district from `tintMethod`/`tintStrength` | `getTint` count must equal `District.new` count (**already confirmed 7/7**) |

---

## 14. Open questions a re-implementer must decide

1. **What consumes `PoissonPattern`?** 140 static blue-noise points, built at class-init, never touched during a build in these recordings. Candidates: texture stipple, tree scatter, shantytown jitter.
2. **What is `buildCityTowers`?** Always 0 ms, no dedicated class executed. Free-standing watchtowers? Wall towers pre-pass?
3. **Exact `Bisector` stop criterion and chaos parameters.** The 2017 `minSq`, `gridChaos`, `sizeChaos`, `emptyProb=0.04` are gone from view; the live version's OBB thresholds are unobservable.
4. **What a "domain" is used for.** `buildDomains` runs for every city but only splits the mesh when there is a coast.
5. **The third `Topology`.** Three `Topology`/`Graph` instances are built per attempt; only the street one and the canal one are accounted for.
6. **`City.f` (3 840 calls B1), `City.d` (76), `City.(anon@238866)` (3 712), `City.(anon@242488)` (2 380)** — high-traffic private helpers with no recoverable semantics.
7. **`GeomUtils.converge`** — appears in some builds and not others (0 in B1, 5 071 in B2).
8. **`weathering`** (20–30 in the schemes) — a per-building colour jitter? a paper texture? Not separable in the draw record.
9. **How `.merge` decides** to join words (*Feygate*) or keep a space (*Great Market*) — `Syllables.pinch` is involved but the rule is unknown.
10. **`UNIQUE` / `COMPACT` grammar flags** — set by `Grammar.addExternal` (3 calls/page); the predicates behind them are not observable.
11. **`Style.spectrum` vs `getTint`** — both called once per district; the relationship between `tintMethod` and the two entry points is unclear.
12. **Gate count policy** (`gates=-1` in every recorded URL) — the ancestor's rule was "splice out neighbours until fewer than 3 entrances remain"; whether 0.11.x still does that, or honours an explicit `gates=N`, is untested.

---

## 15. Reproduction notes

* Every count cited is reproducible from `captures/mfcg/*/coverage/gen-*.calls.json` (`[{label, calls, bytes}]`).
* Every millisecond figure is from `captures/mfcg/*/[pass]/console.jsonl` (the build's own `Stopwatch`) or `report.md`'s cpuprofile digests.
* Every colour, width, font and layer-order claim is from `captures/mfcg/*/draw/gen-*.draw.json` (`rec.log = [[t_ms, op, "WxH", style, segs, lineWidth?]]`).
* Ancestor claims are from `reference/TownGeneratorOS/Source/com/watabou/towngenerator/building/{Model,CurtainWall,Topology,Cutter,Patch}.hx`, `wards/{Ward,Castle,Farm,Market}.hx`, `geom/{Polygon,Voronoi,Graph,GeomUtils}.hx`, `utils/Random.hx`, `mapping/{Palette,PatchView}.hx`.
* The four asset files quoted in full (`grammar.json`, `default.json`, and the five other schemes) are at `captures/mfcg/2026-09-21T05-06-58/profile/network/bodies/`; `network/index.jsonl` maps URL → body file. **No `*.js` body was opened.**

---

## Critic addendum (2026-09-21) — items in this file that other findings files resolve or qualify

1. **§6.1 "PoissonPattern's consumer is not visible" — resolved by the sibling recordings.** The same class
   (`new/step/emit/warp/validate`, **exactly 50 `warp`+`validate` per `step`** in every recorded run across the
   three generators) is consumed in VG by `Forest.new → VoronoiPattern.poisson` (tree/forest scatter,
   `profile-village.md` §4.6) and in NG by `BlockContent.getPattern → PoissonPattern.fill` (trees inside
   courtyard greens and manor groves, `profile-neighbourhood.md` §3.8 + its critic addendum CA-4). In MFCG its
   consumer is therefore almost certainly the tree layer (`Style > Misc` trees/forests, devlogs 345262 and 817711,
   `mfcg-devlogs-b.md` §2.9–2.10), which **was never switched on in these recordings** — see item 4. Note NG builds
   the pattern lazily on first use whereas MFCG builds it in a static initialiser.
2. **§4.4b `Castle.equalize` / "Bloating the citadel..." — the creator defines both operations.** They are the
   Warp tools of the same names (Patreon post 40345972, `mfcg-posts-a.md` §T4): *Equalize* = "Makes a single cell
   more regular in shape **equalizing its angles**. Use it to automatically fix weird shapes"; *Bloat* = "make
   individual cells or groups of cells larger" (the creator shows a patron resizing a castle by bloating its cell).
   So `equalize` is an **angle** equaliser on one mesh cell (not an edge-length/Laplacian relaxer), and the
   `:60` trace is "citadel cell too small → enlarge the cell", both `[STATED]` at the operation level; the
   trigger threshold for bloating remains `[UNKNOWN]`.
3. **§4.9 "OBB-driven bisector" must be read together with the creator's stated construction.** `Bisector` +
   `TwistedBlock` is "twisted bisection" / "bisection with a bend" (adopted in 0.9.0, post 61026228,
   `mfcg-posts-b.md` §2.3): a cut **leaves and meets the polygon's edges at right angles, with a bend added in the
   middle** (post 49191011, `watabou-extra-a.md` §2.1; FTG's author describes the identical three-step
   construction in post 164816716, `ftg-posts-c.md` §2.2). The 1 : 1 `makeCut = PointExtender.project` recorded
   here is the perpendicular-foot step of that construction. The OBB (`PolyBounds.obb`, 0.80 per `subdivide`) is
   best read as choosing *where and across which axis* to cut and as the `isSmallEnough` measure — not as the
   whole cut rule. The reported crash ("the variable `rect` ends up null", 61026228 comments) confirms a per-polygon
   rectangle is computed in exactly this path. `Block.indentFronts → PolyBool.and` most plausibly `[INFERRED]` implements the stated
   `Processing: Offset` option ("shifts the front side of every lot to make lines of facades uneven",
   61026228) rather than to a uniform setback.
4. **Recording coverage gap (not a defect of this file, but a limit on what it can show).** Both captures used
   default style options. Never exercised, and therefore absent from every table above: **Hip/Gable roofs built
   on `SkeletonBuilder` per building** (0.11.0; here `SkeletonBuilder.run` ≈ one per *district*, i.e. labels
   only), **trees and forests** (0.9.1 / 0.11.4, `Forester`-type classes), the **alleys layer** (0.10.2),
   **district view**, tints other than the default, and `gates ≠ −1`. A third MFCG capture with
   `Style → Roofs: Hip`, trees and forests enabled would close the largest remaining `[NAMED-ONLY]` cluster for
   MFCG.
5. **§2 parameter semantics are corroborated by creator text**: size is "in 'wards'", "minimum size is 5 and the
   maximum is 200" (post 47063541 + comments, `mfcg-posts-a.md` §T20) — consistent with `8·size + 4` seed points
   (≈ 8 Voronoi cells per ward-unit, as in the 2017 `nPatches * 8`).

## Critic-2 addendum (OS seat, 2026-09-25)

From the second critic seat on the 2017 sources (`research/findings/_critic-os.md`); only the sentences that lean on
`reference/TownGeneratorOS` are touched, nothing above is edited.

1. **§4.5 and §12.2 misdescribe the 2017 `Graph.aStar`.** The 2017 open set is an `Array<Node>` popped FIFO
   (`geom/Graph.hx:27` `openSet:Array<Node> = [start]`, `:33` `openSet.shift()`); there is no `min` over anything, no
   heuristic, and a node is closed on first pop (`:38`). `cameFrom` and `gScore` *are* `Map`s (`:28, 30`). The only
   `keys()` call is the neighbour iteration `for (neighbour in current.links.keys())` (`:41`), which runs once per
   expansion — enough on its own to make `ObjectMap.keys` hot in a profile. So the recorded `ObjectMap.set/keys`
   cost is consistent with the 2017 breadth-first search and does **not** evidence "a linear `min` over `keys()`";
   whether the live open set is FIFO or priority-ordered is OPEN from call counts alone, and "unchanged" in §12.2
   should read "same name, same signature; internals unverified". Consequence for `os-model.md` §6.2/§13.5: the
   `[INFERRED]` claim that the live street meander comes from FIFO expansion is neither supported nor refuted here.
2. **§4.1 cross-check numbers for the ancestor's seed spiral** (executed in this pass, MINSTD in double precision,
   seed 682063530, `nPatches = 15`): `sa = 0.187173`, r₁ = 12.97, r₂ = 14.75, r₃ = 17.49, r₁₁₉ = 283.2, cloud
   half-extent ≈ 346; over ten seeds the 16th-nearest seed sits 42.5–48.8 units from the origin. Any test of
   "`8·size + 4` with the 2017 constants" against the live build should use these as the 2017 side.
3. **§4.7 "2017's 13 ward classes"** — the tree has 14 files under `wards/`: the 13 listed plus the intermediate
   `CommonWard` (parametric base of Craftsmen/Merchant/Patriciate/Administration/Slum/Gate). Cosmetic.
4. **§12.3 "0.75 citadel compactness threshold" and the palette anchors** re-verified at `Model.hx:165-166` and
   `Palette.hx:17, 20` (DEFAULT and INK values match the live `default.json`/`ink.json` quoted in §12.3).

---

## Explicit-gates addendum (2026-09-25) — captures/mfcg/2026-09-21T11-25-32

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B01.

**Why this capture exists.** It closes critic gap `_critic.md` §6 item 1 / Critic addendum item 4 (“`gates ≠ −1` never
executed”) and open question 12 above (gate count policy). Passes: `coverage` and `draw` only. There is no `profile`
pass, so no CPU-profile call tree; the `draw` pass instruments only Canvas2D and stands in for un-instrumented stage
timings (EG-3). No JavaScript body was opened; evidence is `meta.json`,
`report.md` (read in full), `coverage/gen-{0,1}.calls.json`, `coverage/gen-{0,1}.coverage.json`, `draw/gen-{0,1}.draw.json`,
both `console.jsonl`, and the four `gen-{0,1}.png` screenshots (opened and read).

Run key used below (every href verbatim from `captures/mfcg/2026-09-21T11-25-32/meta.json`):

| run | how | href parameters | role |
|---|---|---|---|
| **G0c** = `coverage/gen-0` | cold load | `size=40&seed=555001&citadel=1&urban_castle=0&plaza=1&temple=1&walls=1&shantytown=0&coast=0&river=0&greens=0&gates=4` | **the controlled run** |
| **G0d** = `draw/gen-0` | cold load | identical to G0c | same city, draw record |
| **G1c** = `coverage/gen-1` | Enter | `size=51&seed=2029853968&citadel=1&urban_castle=0&plaza=1&temple=1&walls=1&shantytown=1&coast=1&river=1&greens=0&gates=-1&sea=0` | uncontrolled extra sample |
| **G1d** = `draw/gen-1` | Enter | `size=71&seed=2029853968&citadel=1&urban_castle=1&plaza=1&temple=1&walls=1&shantytown=1&coast=1&river=1&greens=0&gates=-1&sea=1.6` | uncontrolled extra sample, **different city from G1c** |

"Earlier seven" = the seven coverage samples of §0–§15: A0–A3 = `2026-09-21T05-03-24/coverage/gen-{0..3}`, B0–B2 =
`2026-09-21T05-06-58/coverage/gen-{0..2}`, all `gates=-1`.

### EG-1. `gates=4`: 4 city gates plus 1 castle gate, counted three independent ways

**Three counts for the controlled run (G0).**

| source | what was counted | G0 result | tag |
|---|---|---|---|
| (a) `coverage/gen-0.calls.json` | `WallsView.drawGate` (= its 1:1 helper `WallsView.k`, 369/365 bytes) | **5** | [SHOWN] |
| | `CurtainWall.buildCityGates` / `buildCastleGate` / `addWatergate` / `splitSegment` | 1 / 1 / 0 / 0 | [SHOWN] |
| | `RoadsView.drawRoad` (= `drawOutline` = `drawFill`) | 5 | [SHOWN] |
| (b) `draw/gen-0.draw.json` | road casings `stroke #1a1917 w2.327` (= 2 + 2t, t = 0.163) on long road canvases | **4** (plus 5 cores `#ccc5b8 w2`; the 5th core has no casing, 11 segs, 314×47 canvas) | [SHOWN] |
| | the gate blocks themselves | **0 Canvas2D ops** (they are drawn by another path, EG-4) | [SHOWN] |
| (c) `coverage/gen-0.png` = `draw/gen-0.png` (byte-identical, md5 `27a9379b…`) | passages through the curtain wall, each with a square block on either side | **4 city gates**: NNW ≈(581,272), NNE ≈(925,237) (its left block is under the "SPICE ROAD" label), SSW ≈(662,832), S ≈(896,877). **1 castle gate**: ≈(481,523), in the citadel's east wall, facing the city | [SHOWN] |

So 5 = 4 city gates + 1 castle gate. A watergate is impossible here (`river=0`, `coast=0`, `addWatergate` = 0). The
rewritten href keeps `gates=4`. The URL read is the same as for the B reloads: `URLState.getInt` 15, `getFlag` 11 and
`get` 4 in both. So `gates` is read on every URL load; the explicit value does not open a separate parsing path. [SHOWN]

**`utils.MathUtils.gate` has nothing to do with city gates.** [SHOWN] Its counts: G0 54; A0 42; **A1 30** (the
unwalled city); A2 462, A3 354; B 1 562 / 1 366 / 1 584; G1c 550. That is ≥ 354 in every `coast=1` run and 30–54
without a coast, regardless of walls or gate count. It is a numeric step/threshold helper used mostly by the water
code. Its integer twin, `gatei`, never ran (EG-6).

**The accounting identity across all nine coverage runs.** Castle = 1 if `citadel=1`. Water = `addWatergate`. A
castle counts as "outside" when `urban_castle=0`.

| run | size | walls / citadel / castle | water crossing the wall | `gates` | bCG | bCaG | `addWatergate` | `splitSegment` | `lerpVertex` | `drawGate` | ⇒ city gates (= drawGate − castle − water) | `drawRoad` | check: roads = city gates + (castle outside ? 1 : 0) | `drawTower` |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A0 | 25 | 1/1/inside | none (the river stays outside) | −1 | 1 | 1 | 0 | 0 | 5 | 5 | 4 | 4 | 4+0 ✓ | 21 |
| A1 | 25 | 0/0/– | – | −1 | 1 | 0 | 0 | 0 | 0 | 0 | not drawn | 5 | (unwalled: 5 road entries) | 0 |
| A2 | 39 | 1/1/outside | river | −1 | 1 | 1 | 1 | 1 | 4 | 6 | 4 | 5 | 4+1 ✓ | 20 |
| A3 | 26 | 1/0/– | river | −1 | 1 | 0 | 1 | 0 | 3 | 4 | 3 | 3 | 3+0 ✓ | 15 |
| B0 | 80 | 1/1/outside | river | −1 | 2 (2 att.) | 2 | 1 | 1 | 15 | 9 | 7 | 8 | 7+1 ✓ | 20 |
| B1 | 80 | 1/1/outside | river | −1 | 1 | 1 | 1 | 0 | 8 | 9 | 7 | 0 | streets failed (8× `City.hx:591`) | 23 |
| B2 | 80 | 1/1/outside | river | −1 | 7 (7 att.) | 7 | 1 | 1 | 55 | 9 | 7 | 8 | 7+1 ✓ | 23 |
| **G0** | 40 | 1/1/outside | none | **4** | 1 | 1 | 0 | 0 | 5 | 5 | **4** | 5 | 4+1 ✓ | 29 |
| G1c | 51 | 1/1/outside | river | −1 | 1 | 1 | 1 | 0 | 6 | 7 | 5 | 6 | 5+1 ✓ | 19 |

(bCG = `CurtainWall.buildCityGates`, bCaG = `buildCastleGate`. Counts come from each run's `coverage/gen-N.calls.json`.)

* The drawGate decomposition is definitional here. It is checked independently in two ways. First, the road count
  agrees in all 7 runs where streets succeeded (A0, A2, A3, B0, B2, G0, G1c). Second, the passages were counted in
  three screenshots of the same cities: A0 "Red River" (4 city + 1 castle), A2 "Candlesoul Market" (4 city + 1 castle
  + 1 river passage), and G0 (4 + 1). G1c is consistent: 4 city gates are visible, the fifth is presumably under a label
  [INFERRED], and 5 outer roads leave the map (EG-5). [SHOWN]
* **Every castle has exactly one gate.** `buildCastleGate` runs once per attempt, and each of the 4 castles opened
  (A0, A2, G0, G1c) has one passage, on its city-facing side. The 2017 loop could give a castle several gates.
  [SHOWN] + [INFERRED]
* **Roads match gates 1:1.** Each city gate gets one cased outer road. A castle outside the wall (`urban_castle=0`)
  adds one more road, drawn as core only. In G0 that extra road is the 11-seg, 314×47 `#ccc5b8 w2` stroke with no
  casing. Its box matches the wide street running from the castle gate to the plaza in the screenshot. [SHOWN for
  counts; INFERRED for the identification]
* **Land gates per attempt = `PolyUtils.lerpVertex` + `CurtainWall.splitSegment`.** This holds in 8/8 walled runs:
  A0 5+0, A2 4+1, A3 3+0, B0 15+1 = 2×8, B1 8+0, B2 55+1 = 7×8, G0 5+0, G1c 6+0. [SHOWN] It also corrects §4.4:
  `splitSegment` does **not** always accompany `addWatergate` (A3, B1 and G1c have a watergate and no
  `splitSegment`). [SHOWN]

**Where a gate goes: the midpoint rule.** [SHOWN] Blob centres were measured on the screenshots with a 7×7
dark-core component finder (`scratchpad/mfcg-gates/blobs.py`). In every measurable case the two blocks of a land gate
sit symmetrically about the exact midpoint of the two neighbouring tower centres (±1 px):

* G0: NNW (581,272) vs the midpoint of towers (537,305)/(625,238) = (581,271.5). SSW (662.5,832) vs (663,831.5).
  S (896,876.5) vs (896,877). Castle (481,523.5) vs the midpoint of castle towers (478,456)/(484,591) = (481,523.5).
  For NNE, the visible block lies where the rule predicts. **5/5.**
* A2: the NW, W, S, E and castle gates. **5/5.**
* A0: the NW, NE and W gates. **3/3** (its S gate is under a label).
* The A2 river passage is *not* at a midpoint (10 px off). Watergates sit where the river crosses.

[INFERRED] A chosen gate vertex is moved to `lerp(prev, next, ½)`. That is 2017's `smoothVertex(gate, f)` with f = 0
instead of f = 1 (os-model §5.3, "Smooth further sections of the wall with gates"), and `PolyUtils.lerpVertex` is the
operation (count identity above). The consequence, visible in every map: **the wall runs straight through each gate,
and each gate is exactly halfway between its two flanking towers.**

**Towers.** [SHOWN] G0: `drawTower` = `drawNormalTower` = 29. That is 24 city towers (24 `fill #1a1917`, 2 path ops =
moveTo + arc, on 14×14 canvases) plus 5 castle towers (18×18 canvases). The screenshot count agrees exactly: 24 small
and 5 large dots. City towers stand on every non-gate city-wall vertex **except the two vertices shared with the
citadel**, which carry only the larger castle tower. Across the complete draw records the castle/city tower canvas
ratio is 18/14, 24/19, 23/18, 12/10 and 20/16, so castle towers are ≈1.3× city towers (2017 constant: 1.5×).

* **`buildCityTowers` resolved (open question 2).** `CurtainWall.buildTowers` = attempts × (citadel ? 1 : 0) +
  (walls ? 1 : 0) in all 9 runs: B0 2+1 = 3, B2 7+1 = 8, A3 0+1 = 1, A1 0. So the `City.hx:190` stage (always 0 ms)
  most plausibly is the **city wall's `buildTowers`**, run once per finished city after the river exists. The
  castle's towers are built per attempt inside `buildWalls`. [INFERRED] The reverse assignment (city per attempt,
  castle once) fits the counts equally well but contradicts the stage name.
* Raw counts in run order A0 A1 A2 A3 B0 B1 B2 G0 G1c: `buildTowers` 2 0 2 1 3 2 8 2 2; `getTowerRadius` 366 0 494 196
  1 102 944 1 140 516 698; `drawTower` 21 0 20 15 20 23 23 29 19. [SHOWN]
* `getTowerRadius` = 516 in G0, against 29 towers. It is a repeated query, as §4.4 says. All 24 city towers share
  one canvas size, and so do all 5 castle towers, so the radius is constant per wall in this render. [SHOWN]

**The outer-ward split at gates survives, as a DCEL face split.** [SHOWN counts] In all 9 runs,
`CurtainWall.(anon@256564)` = `DCEL.splitFace` = `DCEL.removeFace` = `ArrayExtender.replace` = ½ × `DCEL.addFace`
(G0: 4/4/4/4/8). One face is removed and two are added per call. This is the 2017 rule "if there is no road leading
from the walled patches, split an outer ward" (os-model §5.3, `patches.replace(outer, halves)`). G0 needed it for 4
of its 5 gates. [INFERRED mapping] **Correction to §4.3:** §4.3 files `splitFace`/`removeFace`/`addFace` under
`buildDomains`/coast. They run in every run except the unwalled, castle-less A1, including the coast-less A0 and G0,
so they belong to the walls. Only `DCEL.split`/`floodFill` are coast-specific.

**What changes when `gates` is explicit.** [SHOWN]
* **Nothing at routine level.** No `com.watabou.*` routine executed in G0 that had not already executed in the 7
  auto samples (EG-2). The call shapes are the same (`buildCityGates` and `buildCastleGate` once per attempt), and the
  per-gate machinery scales with the gate count.
* **The value persists through `Blueprint.updateURL` but is dropped by Enter.** `Blueprint.create` ran in G1, and
  both G1 hrefs say `gates=-1`. The 2020 report "pressing Enter … forgets the number of roads" (Patreon 47063541,
  `mfcg-posts-a.md` T10) still describes Enter in 2026, now as part of a full re-roll.
* **Auto city-gate counts** (`gates=-1`): size 25→4, 26→3, 39→4, 51→5, 80→7/7/7. The unwalled size-25 city has 5
  road entries. That is roughly 0.8·√size (4.0 / 4.1 / 5.0 / 5.7 / 7.2). [SHOWN counts; INFERRED fit]

**Does the 2017 rule still describe it?** The 2017 rule (os-model §5.3): candidates are wall vertices shared by more
than one inner patch; pick one at random, splice out the pick and both ring neighbours, repeat while at least 3
candidates remain (≈ |candidates|/3 gates), then `smoothVertex(gate)`.

* **Kept.** Gates start as wall vertices and are then moved. Gates lacking an outward road get a face split. The
  castle gate is on the city-facing side (4/4 castles). [SHOWN] + [INFERRED]
* **Changed.** The gate moves to the exact chord midpoint instead of a ⅓ smoothing. There is exactly one castle gate.
  Roads = gates. An explicit count is accepted: devlog 112574 (0.7.3) says the URL key lets you "specify the exact
  number of gates", and that `gates=0` gives a city with none. [SHOWN] + [STATED]
* **Unknown: the auto rule.** The creator says the gate generator was reworked in 0.5.1 (devlog 19034, Dec 2017).
  That is *after* the ancestor was published (devlog 6592, Aug 2017), and its README says the ancestor lacks
  waterbodies and the options UI. He also names three road-count modes: "Default", "Maximum" and "Number" (Patreon
  47063541, 0.8.1). [STATED] The exhaustive neighbour-splice loop looks like "Maximum". The default observed here
  (3–7 city gates at sizes 25–80) follows a rule these recordings cannot show. [INFERRED]
* **Limit of this capture.** gates=4 produced 4, but the auto rule gave 4 at size 39 (A2). **This run alone does not
  prove that the parameter changed the count.** The evidence that it is honoured is the STATED semantics, the URL
  echo, and a result consistent with it. **Discriminating test:** `seed=555001&size=40` with `gates=1`, `gates=9`,
  and `gates=0` (the stated "no gates" case).

### EG-2. Executed-set diff against the seven earlier samples

**Headline: nothing new ran.** [SHOWN] G0 executed 565 distinct `com.watabou.*` routines and G1c executed 579 (625
distinct between them). **Every one of them had already executed in at least one of the 7 earlier samples.** The
union stays at exactly **638 routines in 138 classes**, the §5 figures. The explicit `gates=4` and the gen-1 option
mixes opened no new code at routine level. `Canal.deltaRiver`, `Canal.validateCourse`, `CurtainWall.addWatergate`,
`RiverView.drawMouth` and `DocksGrower.*` all ran in G1c, but all had already run in A2/A3/B. (Every `calls.json` entry
has calls > 0, so "listed" = "executed". Script output: `scratchpad/mfcg-gates/diff.txt`, `signatures.txt`.)

**The reverse diff: absent from G0 although present in all 7 earlier samples.** These 13 routines are exactly the
river family. G0 is the first recorded city with `river=0`.

| routine | bytes | A0 A1 A2 A3 B0 B1 B2 | G1c |
|---|---|---|---|
| `Canal.new` / `Canal.updateState` | 629 / 1402 | 1 each | 1 / 1 |
| `Canal.createRiver` / `Canal.buildTopology` | 165 / 428 | 1 1 1 1 2 1 7 (per attempt) | 1 / 1 |
| `Canal.validateCourse` | 554 | 2 2 1 1 21 2 138 | 2 |
| `Canal.intersect` | 196 | 4 3 1 1 9 1 53 | 5 |
| `City.getCanalWidth` | 40 | 5 36 20 16 51 62 59 | 32 |
| `RiverView.new` / `update` / `drawCourse` | 25 / 1669 / 259 | 1 each | 1 each |
| `RiverView.drawBridge` | 321 | 1 3 3 1 4 3 3 | 2 |
| `EdgeChain.edgeByOrigin` / `EdgeChain.prev` | 91 / 61 | 220–1096 / 2–106 | 380 / 10 |

The last row is new information: `EdgeChain.edgeByOrigin`/`prev` belong to the river. G0 also has 2 `Topology.new`
where every other run has 3 per attempt. So **the canal's graph is exactly one of the three Topologies**, which
narrows §14 question 5 to one unexplained Topology. [SHOWN]

**Which routines belong to which option: presence signatures over the 9 runs.** Run order is A0 A1 A2 A3 B0 B1 B2
G0 G1c; `1` = executed. [SHOWN counts; option attribution INFERRED from the parameter table in EG-1]

| signature | runs lacking it | option | routines (count) |
|---|---|---|---|
| `1.1111111` | A1 only (unwalled and castle-less) | walls / citadel | `WallsView.{draw, drawGate, k, drawTower, drawNormalTower}`, `CurtainWall.{buildTowers, getTowerRadius, (anon@256564), (anon@256585)}`, `DCEL.{splitFace, removeFace, addFace}`, `ArrayExtender.replace`, `PolyUtils.lerpVertex`, `Noise.{new, fractal}`, `Perlin.new` (17). The noise objects are built per attempt whenever there is a wall or citadel, but `Noise.get`/`Perlin.get` are only *sampled* with `coast=1`. |
| `1.1.11111` | A1, A3 (`citadel=0`) | citadel | `CurtainWall.buildCastleGate`, `Castle.{new, adjustShape, h, createGeometry}`, `PolyCut.{shrink, shrinkEq}`, `Alleys.(anon@284885)` (8) |
| `..11111.1` | A0, A1, G0 (`coast=0`) | coast | the 26-routine coast family of §2/§4 (`City.getOcean`, `FormalMap.drawWaterbody`, `PatchView.drawPier`, `DocksGrower.*`, `Harbour.*`, `Canal.deltaRiver`, `RiverView.drawMouth`, `CurtainWall.addWatergate`, `DCEL.split`/`floodFill`, `Noise.get`, `Perlin.get`, `SetUtils.isEmpty`/`removeArr` …). Every coast run here also had a river, so the river-mouth, delta and watergate members really need coast and river. |
| `1111111.1` | G0 (`river=0`) | river | the 13 above |
| `11.......` | all but A0, A1 | river without sea | `Canal.regularRiver` |
| `.1..111.1` | A0, A2, A3, G0 (`shantytown=0`) | shantytown | `City.buildShantyTowns`, `City.d`, `City.(anon@250342)` |
| `....111..` | all but B (`greens=0`) | greens | `Park.{new, createGeometry}`, `PatchView.drawGreen` (+ `ParkGrower.*` in B0/B1) |
| `11111.111` | B1 only (the city whose streets failed: 0 roads, 0 farms) | roads + farms | `RoadsView.{drawRoad, drawOutline, drawFill, smoothRoad, cutCorner}`, `Farm.{new, getAvailable, createGeometry, round, splitField}`, `FarmPainter.paint`, `PolyCut.peel`, `PolyAccess.longest`, `PolyCreate.rect`, **`GeomUtils.converge`**, `City.(anon@244906/244925)` (17) |
| `..1.1.1..` | all but A2, B0, B2 | wall-segment split | `CurtainWall.splitSegment`, `CurtainWall.(anon@257836)`, `City.splitEdge`, `DCEL.splitEdge` (1 each). Not the same as the watergate (EG-1). |
| `1...1111.` | the Enter runs A1–A3, G1c | page start | `PoissonPattern.*`, `Markov.new/split`, `Grammar.*`, `Emblem.load*`, `Compass.reroll`, `Blueprint.fromURL`, `Main.new` … (43) |
| `.111....1` | the cold loads | Enter | `Scene.onKeyDown/onKeyUp`, `ViewScene.{onKeyEvent, buildNew, deactivate}`, overlay `onDestroy`/`onNewModel`, `Updater.cancel` (15) |
| `1111....1` | the URL-seeded loads B0–B2, G0 | new random blueprint | `Blueprint.create` (Enter and the seedless cold load A0) |
| `....1111.` | all but URL-parameter loads | URL parsing | `URLState.get`, `URLState.(anon@486392)` |

Two open items from the base file close here:
* **§14 question 7 (`GeomUtils.converge`).** It is zero in exactly one of nine runs, B1, the city with no roads and
  no farms. It belongs to the roads/farms cluster; G0 (18 farms) called it 2 725 times. [SHOWN]
* **Farms are generated with no `farms` key at all.** None of the 25 hrefs recorded in the three captures contains
  `farms=`, yet `City.buildFarms` runs in every run (G0: 18 `Farm.new`, hatched fields NW of the wall). The `farms`
  row of §2 most plausibly comes from the Patreon example URL (61026228), not from this build's own hrefs. [SHOWN]
  absence; [INFERRED] source

### EG-3. Console trace: stage timings, repair messages, and the seed chain

**Stage timings** (the build's own `Stopwatch`, ms; `coverage/console.jsonl`, `draw/console.jsonl`). Roofs = the exact
`fill #a5a095` count of the draw record, or `BuildingPainter.drawRoof` for coverage runs; the two agree 1:1 wherever
the same city has both (G0 1 292, B 15 367 / 36 480 / 13 349).

| run | pass | size | attempts | patches | optJ | domains | walls | streets | canals | wards | towers | **geometry** | total | roofs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G0c | coverage | 40 | 1 | 4 | 1 | 0 | 1 | 2 | 0 | 1 | 0 | **67** | 76 | 1 292 |
| G0d | draw | 40 | 1 | 4 | 1 | 0 | 1 | 2 | 0 | 1 | 0 | **36** | 45 | 1 292 |
| G1c | coverage | 51 | 1 | 8 | 3 | 1 | 1 | 3 | 3 | 2 | 0 | **271** | 292 | 5 644 |
| G1d | draw | 71 | 1 | 10 | 2 | 3 | 1 | 7 | 3 | 2 | 0 | **83** | 111 | 7 815 |
| B (§7.1), profile | profile | 80 | 2 / 1 / 7 | 5 / 5 / 2 | … | | | | | | 0 | **162 / 260 / 125** | 187 / 278 / 141 | 15 367 / 36 480 / 13 349 |
| B, draw (same seeds) | draw | 80 | 2 / 1 / 7 | 5 / 4 / 3 | … | | | | | | 0 | **161 / 276 / 134** | 179 / 287 / 151 | same |

* **The draw pass can stand in for un-instrumented timing.** It wraps only Canvas2D. For the three seeded B cities its
  totals are within ±7 % of the profile pass (179 vs 187, 287 vs 278, 151 vs 141). [SHOWN]
* **Coverage inflation depends on city size.** Same-city ratios of `buildGeometry`, coverage ÷ draw: **1.86×** at
  size 40 (67/36), versus 4.05×, 5.17× and 4.49× at size 80 (652/161, 1426/276, 602/134). §7.1's "coverage inflates
  the model ~4–6×" holds only for large cities. [SHOWN]
* **Scaling fit** over the nine draw-pass cities (A draw ×4, B draw ×3, G0d, G1d): **`buildGeometry` ≈ 19.5 ms +
  7.5 µs × buildings, R² = 0.974.** The new points fit the line: size 40 → 36 ms (predicted 29), size 71 → 83 ms
  (predicted 78). Measured against size instead, `buildGeometry` ≈ 0.012·size^2.16 and the total model ≈
  0.028·size^2.0 (R² 0.87 in log space). Building count grows ≈ size^2.9 across these mixed-option cities, because
  shantytown and sprawl dominate the large ones. **So cost is linear in buildings, and buildings grow faster than
  size.** [SHOWN points; INFERRED fit; the one JIT-cold outlier, A profile size 25 at 60 ms, is excluded because it
  has no roof count]
* **Everything before `buildGeometry`** costs 9 ms at size 40, 28 ms at 71 and 11–18 ms at 80 (final attempt).
  `buildPatches` (4 → 10 ms) and `buildStreets` (2 → 7 ms) dominate it. `buildCityTowers` = 0 ms in **all 25** recorded
  builds (18 distinct cities). [SHOWN]

**Repair and retry messages in this capture.**

| run | message (file:line) | n | what it means for robustness | tag |
|---|---|---|---|---|
| G0c / G0d | *none* | 0 | **The controlled run has no repairs.** `Castle.adjustShape` = 1, `Castle.equalize` = 0: the citadel met the 0.75 test straight away. No river, so no `Canal` search. | [SHOWN] |
| G1c | `wards/Castle.hx:84: Equalizing... 0.733007837327698` | 1 | citadel repair, one iteration (`Castle.equalize` = 1). The value is < 0.75, as the §4.4b loop predicts. The operation equalises the cell's **angles** (Critic addendum item 2, `_critic.md` C4/C5). Local shape repair; the city is not rebuilt. | [STATED] + [SHOWN] |
| G1d | `Equalizing... 0.683504224962497`, `… 0.7277296022605115` | 2 | two iterations, rising by +0.0442. Both < 0.75 (the §4.4b falsification test survives: 3 new values, none ≥ 0.75). Same local repair. | [STATED] |
| G1c | `Canal.hx:268: discard` | 1 | one delta-river candidate course rejected; `Canal.validateCourse` = 2 (1 rejected + 1 accepted). A local retry of the path search, well below the ~40-try cap that forces `City.hx:156` (§4.6). | [STATED] + [SHOWN] |
| G1c | `District.hx:175: Hole in a group, we need to split it` | 1 | **New message: no earlier console contains it.** Printed after `buildCityTowers`, i.e. inside `buildGeometry`. A cell group of a district, the unit that becomes one `WardGroup`, encloses a cell not in the group, and the group is split rather than built with a hole. `District.check4holes` is 20 in G1c (10 districts) vs 9 in G0 (9 districts). Local topological repair. | [STATED] message; [INFERRED] reading |
| G1c | `utils/Bisector.hx:281: (0) Failed to make a cut` | 1 | one subdivision node found no valid cut; logged with the counter "(0)", and that node stays uncut. The live answer to the 2017 infinite-recursion hazard (os-model §13.4). Local. | [STATED] |

**Robustness after this capture.** All four message types are *local* repairs: iterate a citadel shape, retry a river
course, split a hole-enclosing group, skip a cut. The only whole-city restart is still `City.hx:156 *** Unable to build
a canal!`. There were **0 restarts in all four builds here** (at size 80 with river and coast: 7 of 10 attempts). That
fits §11's tiered policy, and §11's table gains one row: `District.hx:175`, repaired in place, 1 of 18 distinct recorded cities.

**The seed chain: the RNG is still the 2017 Lehmer generator, and retries do *not* reseed.** [SHOWN arithmetic] Every
consecutive pair of printed seeds in all 9 console logs of the three captures was tested (`>>` = new city, `-->>` =
attempt; C search in `scratchpad/mfcg-gates/lehmer2.c`). **Each of the 34 transitions not typed in by the harness is
the previous attempt's seed advanced k steps by `seed ← seed·48271 mod (2³¹−1)`**, the 2017 `Random.hx` generator
(os-model §9–§10). The chance of that happening by accident for even one pair with k ≤ 1 359 is ≈ 6·10⁻⁷. The only
exceptions are the 6 transitions into the harness-typed reload seeds 777002/777003 (2 per B pass).

* **Retry after a canal failure: k = 1 239–1 248 at size 80** (7 retries per B pass, the same 7 values in all three
  passes) **and k = 357 / 361 at size 24** (A draw). The retry's
  "new seed" is simply the generator state where the failed attempt stopped. `Random.reset` does not grow with
  attempts: B2 has 7 attempts and 2 resets.
  **Refines os-model §11/§14/§15-8.** Those sections say the live build "reseeds per attempt / draws a fresh internal
  seed". It does not: the live build *continues the stream exactly like the 2017 loop* and merely prints the state, so
  any attempt can be replayed from its printed seed.
* **Enter:** the new city's seed is the stream state after the previous city. **555001 → 2029853968 is k = 585, the
  same in both passes.** Earlier Enters: k = 331–1 359.
  - **Size and flags do not come from this stream.** They differ between the two passes (51 vs 71, `urban_castle`,
    `sea`) while the seed is identical. They also do not come from `Math.random`: the draw recorder logs 1 call per Enter (G1d, A draw gen-1..3),
    the same single call on plain URL reloads (B gen-1/2), and 1–2 on cold loads. That is too few for size + 9 flags +
    `sea`. [SHOWN] The source is therefore some other
    non-seeded input, time-based or similar. [INFERRED]
  - **Enter keeps the size band.** In the three chains that began at size 25, all 9 Enters gave 24–39; starting from 40 it gave 51 and 71.
    That is consistent with the stated "Enter (regenerate at same size group)" (devlog 7063) and bands of
    [24, 40) and [40, 80). [STATED] + [SHOWN]; band edges [INFERRED]
* **The whole size-40 city advanced the main stream only 585 steps,** yet its geometry performed 1 727
  `Bisector.makeCut`s. So **building geometry does not consume the main stream net**, most plausibly because each
  sub-generator runs between `Random.save` and `restore` (G0: 3 saves, 46 restores). That isolation is what makes a
  per-ward reroll possible without moving anything else. [INFERRED]
* **A cold load with no seed uses the clock.** The three seedless cold-load seeds of capture A minus the harness's
  millisecond timestamp (mod 2³¹) are 824, 822 and 831: seed = wall-clock ms mod 2³¹ plus a constant. [SHOWN
  arithmetic; INFERRED mechanism]
* **Same URL, same pixels.** G0c and G0d printed identical traces and produced byte-identical screenshots. [SHOWN]

### EG-4. Draw record: how a gate is drawn, and three corrections to §10

**Frame.** The canvas is 1500×1100 in both runs (`meta.json` canvases, draw-record DOM), as are the screenshots.
G0d's log is complete (12 162 entries, 0 dropped, 121 distinct canvas sizes). G1d's log is truncated (60 000 +
11 434 dropped), but its counters are complete. `Math.random`: 2 calls in G0d, 1 in G1d. [SHOWN]

**The gate layer, in order** (`draw/gen-0.draw.json` → `rec.log`):

```
idx 12018  stroke #1a1917 w1.9  on 841x708  path ops 59   city curtain wall   (one path for the whole wall)
idx 12019  stroke #1a1917 w1.9  on 841x708  path ops 13   castle wall        (same canvas = same display object)
idx 12020-12043  24x fill #1a1917  on 14x14  path ops 2 (moveTo+arc)   city towers
idx 12044-12048   5x fill #1a1917  on 18x18  path ops 2                castle towers
idx 12049  stroke #1a1917 w0.267 on 1504x1103                          grid (the next layer)
```

That is everything. **There is no Canvas2D op for the gate blocks.** Every small-canvas paint op in G0d is one of the 29
towers, one 6×6 five-op dark fill (the plaza's monument dot [INFERRED]), or the six 1×1 `fillRect`s. Yet the screenshot
shows ten blocks: sharp-cornered, ≈12×13 px, against a wall ≈5–6 px wide and a passage ≈7 px wide (S gate, measured
pixel by pixel; between the blocks the wall pixels are paper-coloured, so the stroke really is interrupted). [SHOWN]

* The gate is therefore a **gap in the single 1.9-wide `colorDark` wall stroke plus two square blocks drawn outside
  Canvas2D.** The blocks are most plausibly plain rectangles rendered by OpenFL's hardware path. That path also paints
  the Menu button, whose `#3d3940` body appears in the log only as a 1×1 `fillRect`. [INFERRED]
* **Method consequence:** gates can be counted from `WallsView.drawGate` or from pixels, never from a Canvas2D record.
  This is why §4.4/§10.5 could only describe gates from screenshots.
* **The wall path's op count** follows exact arithmetic over the five complete draw records. [SHOWN]
  - Castle wall: ops = **2 × castle towers + 3** in 5/5 (11/4, 9/3, 11/4, 13/5, 13/5).
  - City wall: ops = 2 × city towers + 7 or + 11 (33/13, 39/16, 43/16, 31/12, 59/24).
  - Reading [INFERRED]: each tower-to-tower or tower-to-gate span is its own moveTo+lineTo pair, plus one initial
    pen move, so a gate is simply a missing span. A castle is then 2 × (towers + 1 gate) + 1. G0's city wall is
    2 × (24 + 4) + 1 + 2, where the +2 are two tower-less vertices; the screenshot shows exactly two, the vertices
    shared with the citadel.
  - This reading is not verified for coastal open chains: Feygate fits only if its river passage counts as two
    breaks.

**Correction 1 — §10.3's "street core(s)" and §10.5's layer-8 "STREET/ALLEY casing+core" are piers and bridges.**
[SHOWN] The 3-op casing+core stroke pairs match two routines exactly in the two seeded cities whose coverage and draw
passes are the same city:
* B0: 33 pairs on small per-ward canvases = `PatchView.drawPier` 33, and 4 pairs on the river's canvas =
  `RiverView.drawBridge` 4.
* B2: 22 = 22 and 3 = 3.
* B1: 19 + 3 = 22 pairs, all one width.
* G0, the first city without water, has **zero** such strokes, although its streets are plainly visible.

**Ordinary streets and alleys inside the city are unstroked gaps between blocks**, as the creator states ("inside a
city they are just gaps between buildings", `mfcg-posts-a.md` T10). Alleys are drawn explicitly only with the 0.10.2
alleys layer, which no recording enabled. Whether the long outer-road strokes (canvases up to 843×2251) continue inside
the wall to the plaza cannot be told from a record without coordinates.

**Correction 2 — the width rule for piers and bridges.** [SHOWN arithmetic, every record with water] These two
features are drawn as nominal width W with **casing W + t and core W − t**:
* Piers and small bridges: W = 1.2. Casing/core 1.319/1.081 (t .119), 1.343/1.057 (.143), 1.756/0.644 (.556),
  2.105/0.295 (.905), 1.778/0.622 (.578), 1.686/0.714 (.486).
* Main bridges: W = 2.0, the road core. 2.119/1.881, 2.245/1.755, 2.556/1.444, 2.578/1.422, 2.486/1.514.

Roads instead have core = W = 2 and casing W + 2t. So §10.3's "casing = core + 2t" holds for every feature, but a
pier's or bridge's outline straddles its nominal edge (half inside), while a road's lies wholly outside it. Two bridge
widths can occur in one city: A draw gen-0 has one of each, and G1d has 7 main and 1 narrow on its river canvas. This
fits the stated "more 'secondary' bridges" (Patreon 40345972). [SHOWN] + [STATED]

**Correction 3 — every draw record that has roads (8 of 9) has one or two core-only roads.** These are `#ccc5b8 w2` strokes with no casing,
3–13 ops, on small canvases. G0d has one (314×47, 11 ops), which accounts for `drawRoad` = 5 against 4 casings. In G0
it is the castle-gate street (EG-1). [SHOWN counts; INFERRED identity] The others: A draw ×4: 2/1/1/2; B0d 1, B2d 1,
G1d 1.

**Also seen in G0d.** [SHOWN]
* **Farm furrows:** 30 `stroke #a59f93` at width t with up to 209 ops per path (e.g. a 128×272 canvas). They sit among
  the ward strokes, for 18 `Farm.new`. This confirms `_critic.md` C14 (colorGreen doubles as the furrow ink) in a
  greens-free city.
* **Widths:** `0.163` = t (×8 996), `2.327`/`2` roads, `1.9` walls ×2, `0.533` scale bar/compass ×6, `0.267` grid ×1.
* **Joins and caps:** `round` join ×9 013, `miter` ×1; caps `round` 8 979, `butt` 35.

**Label texts** (`rec.texts`; district labels one `fillText` per letter at `27px "IM FELL Great Primer Roman"`):
* **G0d:** GREEN ROCK, FREE SPRAWL, TIMBER WALL, DAGGERCREST HILL, IVY WARD, CITADEL, THE HORN, NORTH OLDVALE, SPICE
  ROAD. That is 9, matching `District.new` = 9. Title "Oldvale" (54px); compass "N" (27px); scale bar 0 / 100 / 200 / m
  (21px); "Menu" (18px Share Tech).
* **G1d:** TRADE DISTRICT, STONEHEART VILLAGE, MILITARY DISTRICT, MEAD CLIFF, THE DOCKS, BARBERS BRIDGE, EGG CROSSING,
  TIMBER SIDE, BEERGATE, WOLFHILL FERRY, WEST CITY, MILK TOWN. Title "Mistfire Church"; scale 0 / 500 / 1000 m.
* **G1c** (screenshot only): REDHILL ROAD, TRADE TOWN, NORTH DOCKS, CLEAR BANK, ASHEN DOCKS, GREENBRIDGE, BONEGATE,
  FORTRESS, GOLDENSIDE, TIMBER RING. Title "Lowford".

How these fit the grammar of §9.1 [INFERRED]:
* **Gate districts** (`gateDistrict`) sit at gates: SPICE ROAD (G0, at the NNE gate), REDHILL ROAD and BONEGATE (G1c),
  BEERGATE (G1d).
* **Titles:** "Oldvale" = old + vale, merged. "Lowford" = low + `RIVER?-ford`. "Mistfire Church" = proper +
  `TEMPLE?-church`.
* **The castle districts narrow §14 question 10.** CITADEL (G0, no equalize) and FORTRESS (G1c) come from the
  `COMPACT` branch. G1d's castle district is "MILITARY DISTRICT", which only the `!COMPACT` branch can produce, even
  though its equalize loop ran until compactness passed 0.75. So **the `COMPACT` flag is not the 0.75 compactness
  test.**

### EG-5. The four screenshots (all opened and read; 1500×1100, `default` scheme)

**`coverage/gen-0.png` and `draw/gen-0.png` — "Oldvale"** (G0, size 40). The two files are byte-identical. [SHOWN]
* **Wall:** a near-circular closed curtain wall about 830×700 px. **24 small round towers** and **4 gates**: NNW,
  NNE, SSW and S. Each gate is a gap with a dark square on either side, at the midpoint between its two flanking
  towers (EG-1). Seen from the town centre (≈824,529), the gates sit at ≈71°, 133°, 242° and 282°, leaving a ≈150° gateless arc on the east side.
* **Citadel** (label CITADEL, `urban_castle=0`): a walled pentagon outside the wall on the west. **5 larger towers**,
  two of them on the vertices where it meets the city wall. **One gate**, at the midpoint of its city-facing east side.
  Inside, a large dark cross-shaped keep in open ground.
* **Plaza:** an irregular open space east of centre, with a dark landmark at its edge and a monument dot. A wide
  street (the core-only road of EG-4) runs from the citadel gate to the plaza.
* **Solids:** four more dark solids inside the wall (churches and the temple), `BuildingPainter.drawSolids` = 7.
* **Roads:** 4 roads leave the map, two north and two south, one per city gate.
* **Beyond the wall:** extramural buildings only in short ribbons outside the NNW (NORTH OLDVALE), NNE (SPICE ROAD) and
  S (DAGGERCREST HILL) gates; no shantytown (`shantytown=0`).
* **Farms:** hatched fields fill the NW quadrant and trail off to the W and SW; 18 `Farm.new`.
* No water, no greens, no trees. Scale bar 0–100–200 m, compass rose bottom right, graticule.

**`coverage/gen-1.png` — "Lowford"** (G1c, size 51, `coast=1 river=1 shantytown=1 sea=0`). [SHOWN]
* **Sea:** fills the east, as `sea=0` (screen-East) predicts. The §2.1 table gains its sixth agreeing sample.
* **Wall:** an **open chain from shore to shore**. It starts at the north shore, runs west along the north side (2
  gates), turns south along the west side (1 gate, then the citadel), reaches the river, and continues east along the
  south side (1 visible gate, at BONEGATE) back to the south shore.
* **Citadel:** FORTRESS, `urban_castle=0`. A walled quadrilateral annex on the west side, with 4 towers and one gate on
  its east side, into the city.
* **River passage:** the river enters from the west edge and crosses the wall. There the wall **ends in a square block
  on each bank**, so a watergate is drawn like a gate whose passage is the river. The river then crosses the town
  (GREENBRIDGE, CLEAR BANK) and enters the bay through a widened mouth (`deltaRiver`, `drawMouth` 1).
* **Docks:** NORTH DOCKS and ASHEN DOCKS, with piers on the bay shore (`drawPier` 20).
* **Shantytown:** large extramural sprawl south of the wall (TIMBER RING, GOLDENSIDE) and north (REDHILL ROAD).
* **Roads:** 5 outer roads leave the map (two top, one left edge, two bottom).
* **Farms:** one faint hatched field south of TIMBER RING (`Farm.new` 2).
* **Counts:** `drawGate` 7 = 5 city + 1 castle + 1 river. 4 city passages are visible; the fifth is most plausibly
  under a label, given 5 outer roads and 6 `drawRoad`. [INFERRED] `drawTower` 19.

**`draw/gen-1.png` — "Mistfire Church"** (G1d, size 71, `urban_castle=1 coast=1 river=1 shantytown=1 sea=1.6`).
[SHOWN]
* **Sea:** fills the south-east. `sea=1.6` = 288°, i.e. SSE, so this agrees with §2.1 too.
* **River:** enters at the top left, runs south, makes a large meander loop around MEAD CLIFF / TRADE DISTRICT, and
  enters the sea at THE DOCKS.
* **Wall:** at this scale a hairline with dot towers. It arcs from the east shore over the north (BEERGATE) and down
  the west side to the river, then resumes south of the river to the shore. Gates are pairs of tiny blocks; 6 cased
  roads leave the map, so there are presumably 6 city gates. [INFERRED from the roads = gates identity]
* **Urban castle:** a small walled polygon with a dark keep on the south-east shore, inside the wall, under the label
  MILITARY DISTRICT. Its one gate faces north-east, into the town.
* **Plaza:** holds the temple (a "C"-shaped dark solid) and a monument dot.
* **Sprawl:** huge extramural fans N (MILK TOWN) and W/SW (WEST CITY), a few hatched fields W. Scale bar 0–500–1000 m.
* The draw record can count its bridges (8: 7 main + 1 narrow) and piers (19 pairs), but not its gates.

**Common to all four:** no trees or forests, no pitched/hip/gable roof shading (flat footprint + offset roof only),
no alley lines, no district colouring, default palette. [SHOWN]

### EG-6. The "never executed" list after this capture

**Closed or narrowed by this capture:**
* **`gates ≠ −1`: executed and consistent with being honoured.** `gates=4` gave 4 city gates through the same routines
  as auto (EG-1, EG-2). Still unrecorded: `gates=0` (stated to give a city without gates), a count above the auto value,
  and the "Maximum" mode.
* **The first `river=0` city,** and the first walled city with no water at all. It shows exactly which 13 routines
  belong to the river (EG-2).
* **`buildCityTowers`** (open question 2) is most plausibly the city wall's `buildTowers` (EG-1).
* **`GeomUtils.converge`** (open question 7) belongs to the roads/farms cluster (EG-2).
* **`COMPACT`** (open question 10) is not the 0.75 test (EG-4).
* **A new repair site,** `District.hx:175` (EG-3).

**Still never executed in any of the nine MFCG coverage runs.** Method: every `functionName` in the nine
`captures/mfcg/*/coverage/gen-*.coverage.json` files (V8's own report; all runs load the same build `12710731`) was
keyed by byte range, and the maximum count was taken across runs. 2 554 of 4 113 functions have count 0 everywhere, most
of them OpenFL/Lime. Class names exist only for executed functions, so the rows below are method names without their
class. [SHOWN for the names and zero counts; INFERRED for the feature each maps to]

| feature (creator's option) | never-executed functions (bytes) |
|---|---|
| trees and forests (0.9.1 / 0.11.4, `Style > Misc`) | `addTrees` 108, `addCityTrees` 208, `addForests` 893, `spawnTrees` ×5 (23–504), `updateTrees` 171, `getTree` 273, `resetForests` 29, `getForestFaces` 221, `getForestOutlines` 269, `getForestInsets` 148. So the tree/forest code **is** in the build, under these names rather than a class called `Forester`. It is also the consumer of `PoissonPattern` (Critic addendum item 1), which explains why the pattern is built and never read here. |
| gable/hip roofs (0.11.0) | `addGables` 511. `SkeletonBuilder.run` = `District.new` in G0 (9/9) and G1c (10/10); over the 9 runs it is equal 7 times and at most 3 above (§6.2). That is one skeleton per district label ridge, not one per building. |
| alleys layer (0.10.2) | `toggleAlleys` 81. No alley stroke in any of the 9 draw records (EG-4, correction 1). |
| district view | `toggleDistricts` 313, `toggleView` 43, `rerollDistricts` 76 |
| wall/outline style (`Style > Outline`, Patreon 102377277) | `addOutline` 168, `showOutlines` 32, `outline` 986 / 332 |
| landmarks (0.7.6) | `addLandmark` ×2, `addLandmarks` 385, `removeLandmark` 71, `removeLandmarks` 60, `updateLandmarks` 81 |
| warp tools | `bloat` ×3 (49 / 153 / 201), `onWarp` ×2, and a second `equalize` (430 B; the executed `Castle.equalize` is 390 B) |
| export (`export=` URL key, 0.7.3) | `export` 430 / 3 382, `onExport` 103 |
| Generate > Roads tab ("Default / Maximum / Number") | `createRoadsTab` 782, `updateRoads` 41. The gate count was only ever set through the URL, never through this UI. |
| misc | `gatei` 37, the integer twin of the executed `MathUtils.gate` |
| non-default schemes and tints | every fill and stroke colour in all 9 draw records is a `default.json` value, plus page, UI and preloader colours |

`treeMake`/`treeWalk`/`treeDepth`/`treeCompress` also have zero counts, but those are Huffman-tree names from a
compression routine, not vegetation, and are excluded. Other states never recorded: a `farms`-off city (there is no URL
key, so it needs the Generate UI), `walls=0` with `citadel=1`, an urban castle in a dry city, and an Enter that keeps
the options (the stated Rebuild path).

**The capture that would close most of this list:** load `size=40&seed=555001&gates=0`, then open the canvas menu and
set `Roofs: Gable/Hip`, trees and forests on, the alleys layer, district view, and a non-default scheme. Record coverage
and draw. After that, only the warp, landmark and export UI would remain.

### EG-7. Where this capture corrects or confirms the base file, `os-model.md` and `_critic.md`

| # | claim as written | what the evidence shows | tag |
|---|---|---|---|
| 1 | §10.6 "Candlesoul Market" (A2): "nine gates each spawning a road" | **6 passages**: 4 city gates, 1 castle gate, 1 river passage. `drawGate` 6, `drawRoad` 5; the screenshot shows 6 pairs of blocks and 4 outer roads (EG-1). | [SHOWN] — contradiction |
| 2 | §10.3 "street core(s)" column; §10.5 layer 8 "STREET … ALLEY casing+core" | These are **piers and bridges** (exact count matches in B0/B2). Ordinary streets are not stroked (EG-4). | [SHOWN] — contradiction |
| 3 | §4.4 "`splitSegment` accompanies" `addWatergate` | Only in 3 of the 6 watergate runs. `lerpVertex` + `splitSegment` = land gates per attempt in 8/8 (EG-1). | [SHOWN] |
| 4 | §4.3 `splitFace`/`removeFace` 6, `addFace` 12, under `buildDomains`/coast | They follow the **walls** (present with `coast=0` in A0 and G0): the outer-ward split at gates (EG-1). | [SHOWN] counts; mapping [INFERRED] |
| 5 | §7.4 `convexHull` == `obb` == `asRotateYX` "OK (7/7)" | `convexHull` == `obb` holds 9/9. **`asRotateYX` = `obb` + `PolyCreate.rect`** in 9/9, e.g. G0 3 330 + 20 = 3 350. The three are equal only in B1, where `rect` = 0; B1 is also the §4.9 table's sample. | [SHOWN] |
| 6 | §2 `farms=0\|1` listed among "keys the build emits" | None of the 25 recorded hrefs contains `farms`; farms are built in every run (EG-2). | [SHOWN] |
| 7 | §7.1 coverage inflates the model "~4–6×" | Size-dependent: 1.86× at size 40, 4.0–5.2× at size 80 (EG-3). | [SHOWN] |
| 8 | §0 item 5, §4.6: a failed city is "regenerated with a fresh internal seed"; os-model §11/§14/§15-8: "the live retry reseeds" | **No reseed.** The printed attempt seed is the Lehmer state where the failed attempt stopped. `Random.reset` does not grow with attempts, and 34/34 seed transitions sit on the 48271 orbit (EG-3). | [SHOWN] arithmetic |
| 9 | §12.3 "survived unchanged: `CurtainWall`'s gate-selection algorithm … smooth the gate vertex afterwards"; §4.4 "Ancestor behaviour retained" | Only partly. The gate is moved to the **exact chord midpoint** (not the f = 1 smoothing); castles get exactly one gate; roads = gates; explicit counts exist; the creator states a 0.5.1 rework that post-dates the ancestor (EG-1). "Unchanged" is not supported. | [SHOWN] + [STATED] |
| 10 | §4.4 "gates are solid dark rectangles straddling the wall" | Refined: a gap in the single wall stroke plus two square blocks. The blocks are absent from Canvas2D (EG-4). | [SHOWN] |
| 11 | §4.8 / §14 Q2 `buildCityTowers` [NAMED-ONLY] | Most plausibly the city wall's `buildTowers` (count identity, 9/9) (EG-1). | [INFERRED] |
| 12 | §6.5 / §14 Q7 `GeomUtils.converge` [NAMED-ONLY] | Member of the roads/farms cluster; zero only in the road-less, farm-less B1 (EG-2). | [SHOWN] |
| 13 | §9 / §14 Q10 `COMPACT` | Not the 0.75 compactness test (G1d: equalized castle named "MILITARY DISTRICT") (EG-4). | [INFERRED] |
| 14 | `_critic.md` §6 item 1 / Critic addendum item 4: `gates ≠ −1` never executed | Executed. Same routines; count consistent. The remaining test is gates = 0/1/9 (EG-1). | [SHOWN] |

**Confirmed again on the new runs** (all [SHOWN]):
* `Delaunator.circumradius2` = 8·size+4 (G0 324, G1c 412).
* `Cell.new` = `Face.new` (297 / 378).
* `Perlin.get` = 6 × `Noise.get` (2 244 / 374).
* `drawPolygonAt` = `drawRoof` (1 292 / 5 644).
* `makeCut` = `project` (1 727 / 11 878).
* `getTris` = `interpolate`, `earcut` = `WardGroup.filter`, `simplify` = `visvalingam`, `Circle.new` = `getCircle` =
  `getArc`, `Bisector.new` = `partition`.
* `Style.getTint` = `District.new` (now 9/9).
* `PoissonPattern` warp/step = 50 (G0).
* The §4.4b "value < 0.75 before each equalize" loop: 3 new values, all < 0.75.
* The §2.1 `sea` angle: 2 new agreeing screenshots.

**Reproduction.**
* Counts: `captures/mfcg/*/coverage/gen-*.calls.json`.
* Never-executed names: maximum `ranges[0].count` per byte range over the nine `coverage/gen-*.coverage.json`.
* Draw ops: `draw/gen-*.draw.json` → `rec.log` rows `[t, op, canvasWxH, style, pathOps, lineWidth]`. `pathOps` counts
  moveTo/lineTo/arc/… since the last `beginPath`; the recorder is `profiler/lib/instrument.js`.
* Screenshot blobs: dark = every RGB channel < 70; a pixel is "core" when its 7×7 window has ≥ 48 dark pixels; core
  pixels are grouped into 4-connected components.
* Seed chain: iterate `s ← s·48271 mod 2147483647` from each printed seed until the next one appears (≤ 4·10⁸ steps).
* The session scripts lived in the scratchpad `mfcg-gates/`, which is not kept; the rules above are all that is needed
  to rerun them. No `*.js` body was opened.

### EG-8. What changes for a re-implementer

1. **Gate count is a parameter.** Treat `gates` as "number of city gates": N ≥ 0 exact, −1 = auto (≈0.8·√size, 3–7
   for sizes 25–80).
   - Every citadel gets **exactly one** gate on its city-facing side.
   - Watergates are extra and sit wherever a river crosses the wall.
   - Roads are 1:1 with city gates, plus one core-only street when the castle sits outside the wall.
2. **Gate placement.** Pick gates among wall vertices that a street can reach. Then move each gate to the **exact
   midpoint of its two neighbours**, so the wall runs straight through every gate and each gate is equidistant from its
   flanking towers. If a gate has only one outer cell, split that cell so a road can leave; the reference does this in
   the mesh (a face split).
3. **Towers** go on every non-gate wall vertex except those shared with the citadel. Castle towers are about 1.3× city
   towers. City towers are placed once, after rivers exist; castle towers are placed with the castle.
4. **Drawing.**
   - The wall is one stroke per wall, broken at gates; the reference emits each span between towers separately.
   - A gate is that gap plus two square blocks about 2× the wall width; the passage is about road width.
   - Streets are negative space. Only roads, piers and bridges are stroked, as casing + core. Piers and bridges use
     casing W + t and core W − t (W = 1.2 or 2.0), so their outline straddles the nominal edge.
   - Verify gates from pixels or model counts: the reference's gate blocks never appear in a Canvas2D recording.
5. **Robustness and determinism.**
   - Keep every repair local (shape iteration, course retry, group split, skipped cut). Restart only for a missing
     river.
   - On retry, *continue* the RNG stream and log the state as the attempt seed, so any attempt can be replayed.
   - Run sub-generators between `save` and `restore`, so geometry never moves the main stream. Per-ward rerolls
     depend on this.
   - The reference derives the Enter successor seed from the stream but rolls the new options from a non-seeded
     source. An original generator should derive both from the seed, or say explicitly that it does not.
6. **Budget by building count, not size.** Geometry costs about 20 ms + 7.5 µs per building; everything else is
   ≤ 30 ms up to size 80.
7. **Still unobserved.** Trees and forests, gable/hip roofs, the alleys layer, district view, landmarks, warp and export
   exist in the reference build (named functions) but have never run in a recording. Design them from the creator's
   posts, not from behaviour.

---

## Explicit-gates addendum, part 2 (2026-09-25) — captures/mfcg/2026-09-25T10-05-{23,38,44}

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B02.

**Why these captures exist.** They run the discriminating test that EG-1 asked for ("`seed=555001&size=40` with
`gates=1`, `gates=9`, and `gates=0`"). Together with the `gates=4` run of part 1 they give four cities with the same seed
and options, differing only in `gates`. Passes: `coverage` and `draw`, cold load, gen-0 only. No JavaScript body was
opened. The evidence is `meta.json`, `report.md`, `coverage/gen-0.{calls,coverage}.json` (V8's own per-function records),
`draw/gen-0.draw.json`, both `console.jsonl`, and the screenshots. All four distinct screenshots were opened and read;
each run's `coverage/gen-0.png` and `draw/gen-0.png` are byte-identical (md5 `6b1ada2f…`, `1c92e014…`, `27a9379b…`,
`de3bb0ae…`).

| run | capture | `gates` in the href | shared href (verbatim from each `meta.json`) |
|---|---|---|---|
| **N0** | `2026-09-25T10-05-23` | `0` | `size=40&seed=555001&citadel=1&urban_castle=0&plaza=1&temple=1&walls=1&shantytown=0&coast=0&river=0&greens=0` |
| **N1** | `2026-09-25T10-05-38` | `1` | same |
| **N4** | `2026-09-21T11-25-32` gen-0 (= G0 of part 1) | `4` | same |
| **N9** | `2026-09-25T10-05-44` | `9` | same |

All 8 passes printed one attempt, `seed:555001 size:40`, and **no repair or retry message**. The draw logs are complete
(0 dropped). `Math.random` was called 2 times in each. The URL read is identical in all four (`URLState.getInt` 15,
`getFlag` 11, `get` 4). [SHOWN]

### EG2-1. Per-run counts

| quantity | source | N0 | N1 | N4 | N9 | law |
|---|---|---|---|---|---|---|
| `WallsView.drawGate` = `WallsView.k` = `PolyUtils.lerpVertex` | calls | 1 | 2 | 5 | 10 | N + 1 |
| `WallsView.drawTower` = `drawNormalTower` | calls | 33 | 32 | 29 | 24 | 33 − N |
| `CurtainWall.buildCityGates` / `buildCastleGate` / `buildTowers` / `CurtainWall.new` / `WallsView.draw` | calls | 1/1/2/2/2 | same | same | same | constant |
| `CurtainWall.getTowerRadius` | calls | 452 | 472 | 516 | 554 | irregular |
| `utils.MathUtils.gate` | calls | 30 | 30 | 54 | 66 | irregular (not a gate counter; EG-1) |
| `ArrayExtender.weighted` | calls | **0** | **1** | **4** | **9** | N |
| `DCEL.splitFace` = `removeFace` = `ArrayExtender.replace` = `CurtainWall.(anon@256564)` | calls | 0 | 1 | 4 | 8 | S (face splits) |
| `Graph.aStar` = `Topology.buildPath` = `RoadsView.smoothRoad` = `GraphicsExtender.drawPolyline` | calls | 1 | 3 | 9 | 19 | 2N + 1 |
| `RoadsView.drawRoad` = `drawOutline` = `drawFill` | calls | 1 | 2 | 5 | 10 | N + 1 |
| cased roads: `stroke #1a1917` at width 2 + 2t | draw | **0** | **1** | **4** | **9** | N |
| road cores: `stroke #ccc5b8 w2` | draw | 1 | 2 | 5 | 10 | N + 1 |
| castle street: the core-only stroke, 11 ops, canvas scaled to N4 | draw | 313×46 | 314×46 | 314×47 | 314×47 | identical |
| wall stroke `w1.9` path ops, city / castle | draw | 59 / 13 | 59 / 13 | 59 / 13 | 59 / 13 | constant |
| tower fills: city (canvas) + castle (canvas) | draw | 28 (18²) + 5 (23²) | 27 (16²) + 5 (21²) | 24 (14²) + 5 (18²) | 19 (14²) + 5 (18²) | (28 − N) + 5 |
| thin stroke t | draw | 0.122 | 0.14 | 0.163 | 0.164 | the view is refitted |
| screenshot: city towers + castle towers | png | 28 + 5 | 27 + 5 | 24 + 5 | 19 + 5 | = draw |
| screenshot: city gates + castle gate | png | **0** + 1 | **1** + 1 | **4** + 1 | **9** + 1 | = drawGate |
| screenshot: roads leaving the map | png | **0** | **1** (north) | **4** | **9** | N |
| screenshot: vertices on the city-wall chain | png | 30 | 30 | 30 | 30 | 2 shared + (28 − N) towers + N gates |

Screenshot method: the 7×7 dark-core blob finder of EG-7, with an 11×11 (N0) or 9×9 (N1) window for the zoomed-in runs so
the thicker wall stroke does not pass. A few blocks are hidden by labels. In N0, the castle gate's upper block is under
the "U" of UPPER DISTRICT. In N1, the city gate is under the NIGHTGATE label (its road visibly crosses the wall there) and
the castle gate's upper block is under "MILITARY". In N9 all 10 block pairs are visible. [SHOWN]

### EG2-2. The rule: `gates=N` gives exactly N city gates

[SHOWN] In all four runs:

* **City gates = N** (0, 1, 4 and 9). Three independent counts agree: `drawGate` − 1, the cased outer roads in the draw
  record, and the wall passages in the screenshots. `ArrayExtender.weighted` = N as well: it is called once per city
  gate and never at N = 0.
* **Castle gate = 1**, always in the same place: the midpoint of the citadel's city-facing east side.
* **Roads = N cased outer roads plus 1 core-only castle street.** The castle street is the same stroke in all four runs
  (11 ops, 314×47 at N4 scale). `aStar` = 2N + 1: most plausibly one inward street and one outward road per city gate,
  plus one street for the castle gate. [INFERRED split]
* **The gate sets are nested.** Number the 30-vertex city-wall chain clockwise from the northern citadel-shared vertex
  (0) to the southern one (29). The gate vertices are then:

  | N | gate vertices |
  |---|---|
  | 0 | none |
  | 1 | 10 |
  | 4 | 4, 10, 22, 25 |
  | 9 | 4, 8, 10, 13, 16, 20, 22, 25, 28 |

  Named by direction, N1's gate is the NNE gate, and N4's four are NNW, NNE, S and SSW. N9 adds N, ENE, E, SE and W.
  The roads confirm the nesting. N1's only road is N4's NNE road: its casing is 816×2411 with 77 ops (697.8×2061.6 at N4
  scale), against 700×2066 with 77 ops in N4; its core is 912×2704 with 87 ops (779.9×2312.2), against 782×2316 with 87
  ops. N4's four casings reappear in N9 within 2.4 px with the same op counts (77, 93, 109, 77).
* **Spacing.** No two gates are ever adjacent vertices; the closest pairs have one tower between them (N9: 8/10,
  20/22). A gate may sit next to a citadel-shared vertex (N9, vertex 28).
* **Face splits** S = 0/1/4/8. Every city gate got one, except one of N9's nine. The castle gate never does (as in G0).

[INFERRED] This is a sequential pick loop that stops after N picks. The first k picks do not depend on the target, so a
smaller N gives a subset of a larger N. It matches the 2017 loop (pick a candidate, splice out its ring neighbours,
repeat) with the stop condition replaced by the requested count. The one `weighted` call per gate suggests the live pick
is weighted rather than 2017's uniform `Random.int`. The weights are unknown. `City.(anon@244906)` = N and
`City.(anon@244925)` = 42·N, so each gate scans a fixed 42-element set, but whether that scan serves the gate pick or the
outward road's destination is not decidable from counts. (In part 1's A0, `(anon@244906)` is 3 for 4 city gates, so the
1:1 mapping holds only in this series.)

### EG2-3. The tower identity: a gate takes its own vertex's tower, and nothing else

[SHOWN] **towers + gates = 34 in every run** (33 + 1, 32 + 2, 29 + 5, 24 + 10), and

  `drawTower(N) = (V_city − R − N) + (V_castle − 1) = (30 − 2 − N) + (6 − 1) = 33 − N`

where V_city = 30 is the city-wall chain, R = 2 is the number of citadel-shared vertices (they carry only the castle
tower), and V_castle = 6 is the castle ring (5 towers and 1 gate).

* **The wall vertices do not move with N.** The chain has 30 vertices in all four screenshots. Fit scale and translation
  on the 5 castle towers (residuals ≤ 0.25 / 0.39 / 0.20 px; scale 0.7462 / 0.8551 / 1.0016, against the t ratios
  0.7485 / 0.8589 / 1.0061). After that fit, every tower of N0, N1 and N9 lands within 1.4 px of an N4 tower, or
  4–10.5 px from an N4 gate, which is where that gate's vertex stood before it moved onto the chord. Every N9 gate
  lands on an N4 gate (≤ 1.1 px) or on an N4 tower (1.3–12 px away, which is the midpoint displacement).
* So **a gate replaces exactly the tower of its own vertex.** The flanking towers are not consumed, tower spacing does
  not change, and no vertex is added or moved except the gate vertex itself. This is the 2017 `buildTowers` rule (a tower
  on every non-gate vertex with a live segment), plus the live exception for the two citadel-shared vertices.
* **The flanking-tower midpoint claim (EG-1) holds on the new runs.**
  - N9: all 10 gates (9 city + castle) sit at the midpoint of their two neighbouring vertices, within 0.36 px, and
    ≤ 0.17 px off the chord. The block half-separation is 9.6–10.5 px whether the span is 110 or 172 px, so the passage
    has a fixed width.
  - N0 and N1: the visible castle-gate block is 12.9 / 12.7 px from the castle midpoint, which is 9.6 / 10.9 px at N4
    scale. That is consistent.
  - N1's city gate is hidden by its label and cannot be tested.
  - A vertex that is a tower at one N and a gate at another is displaced 1.3–12 px (N4 scale) onto the chord of its
    neighbours. This confirms that the gate *is* the moved vertex (EG-1 `lerpVertex` reading).
* **The wall path does not depend on gates** (a correction to the EG-4 reading). The city wall takes 59 ops and the
  castle wall 13 at every N. That is 2 ops per wall edge plus 1: 29 edges of the 30-vertex open chain, and 6 castle
  edges. A gate therefore does not remove a path segment. The gap is made some other way, most plausibly by pulling back
  the two segment ends next to the gate vertex, or by painting over the gap outside Canvas2D like the blocks
  (EG-4). [SHOWN counts; INFERRED mechanism]
  - Pixels: along each N9 gate's chord the pattern is dark block, a light gap of ≈ 7 px, dark block, for 10/10 gates.
  - In N0, all 29 wall edges are dark along their whole interior.

### EG2-4. What else changes with N: the town inside is re-rolled

**Executed sets** (V8 per-function records for `mfcg.js` with count > 0, keyed by byte range): **N0 ⊂ N1 = N4 ⊂ N9** (+25, +0, +1).
No function in the three new runs is outside the union of the nine earlier coverage runs. [SHOWN]

* **The 25 present only when N ≥ 1** fall into two groups:
  - **Gate machinery (11):** `DCEL.{splitFace, removeFace, addFace}`, `ArrayExtender.{replace, weighted}`,
    `CurtainWall.(anon@256564)`, `(anon@256585)` (0/2/8/15), one 97-byte `CurtainWall.G` (@259904, = N),
    `City.(anon@244906)` (N), `City.(anon@244925)` (42·N) and `Topology.excludePolygon` (N).
  - **The outskirts filter (14):** `WardGroup.filter` (0/2/6/14) = `Triangulation.{earcut, earcutLinked, linkedList}`,
    `WardGroup.getTris` = `interpolate` (0/90/192/413), `WardGroup.{isBlockSized, isInnerVertex, (anon@303106)}`,
    `GeomUtils.barycentric` and `Triangulation.{isEar, pointInTriangle}`, `_Triangulation.Node.{new, remove}`.
    [INFERRED] This is the live form of 2017's `filterOutskirts` (os-model §8.5: vertex density 1 at a gate, interpolated
    per building). Here the interpolation is barycentric over earcut triangles (`getTris` = `interpolate`). It runs only
    for extramural ward groups, and with no gates there are none.
* **N9's +1** is `tracery.ModsEngBasic.s` (2 calls), the plural modifier ("Scribes Grove", "BEGGARS TOWN"). It is naming,
  not geometry.
* **Label-merge caveat for `calls.json`.** At N0 the calls list shows `CurtainWall.G` as "197 B, 2 calls", as if a
  gates-0-only routine ran. It did not. `calls.json` merges the four distinct 97–100-byte functions that all minify to
  `G` (V8 offsets 259341 / 259496 / 259748 / 259904) and sums their bytes. The per-function counts are 1/1/0/0 (N0),
  1/1/0/1 (N1), 1/2/0/4 (N4) and 1/2/0/9 (N9). The varying `G` byte sizes (197/198/294/295/394) in the earlier runs have
  the same cause.

**Count classes over the 567 `com.watabou.*` labels** (keyed by label and bytes). [SHOWN]

| class | n | members |
|---|---|---|
| identical in all four | 272 | `Delaunator.*` (`circumradius2` 324 = 8·40 + 4), `buildPatches`, `optimizeJunctions`, `Castle.*`, `buildCastleGate`, `CurtainWall.new`, `buildTowers`, `Topology.new` 2, `Random.save` 3 / `reset` 2, URL parsing, `PoissonPattern.*`, `Namer.reset` |
| exactly affine in N | 27 | the EG2-1 rows; `EdgeChain.{indexByOrigin, toPolyline}`, `PolyUtils.smoothOpen`, `ArrayExtender.sortBy`, `DistrictBuilder.k`, `City.(anon@244587)` (all N + 1); `City.(anon@244606)` 4(N + 1); `EdgeChain.assignData` N + 4; `ArrayExtender.sum`, `DCEL.vertices2chain` 2N + 1; `City.(anon@244906)` N; `City.(anon@244925)` 42N; `Topology.excludePolygon` N |
| exactly affine in S | 16 | the split itself (`DCEL.{splitFace, removeFace}`, `ArrayExtender.replace`, `CurtainWall.(anon@256564)` = S; `addFace` 2S) and the mesh growth it causes: `Cell.new` = `Face.new` = 289 + 2S; `Ward.new` = `PatchView.{new, draw}` = 289 + S; `Graph.add` = `Node.new` = 451 + S; `Node.link` 1324 + 2S; `Face.getPoly` 802 + 2S; `Topology.getNode` 2648 + 4S; `Cell.bordersInside` 248 + S |
| zero in some run, not affine | 18 | the 14 outskirts-filter routines, `CurtainWall.(anon@256585)` (0/2/8/15), the two merged `CurtainWall.G` labels (caveat above), and `ModsEngBasic.s` |
| irregular | 234 | everything downstream (next table) |

The irregular class is everything downstream of the gates:

| item | N0 | N1 | N4 | N9 |
|---|---|---|---|---|
| districts (`District.new` = labels) | 5 | 5 | 9 | 11 |
| ward groups (`WardGroup.new`) | 11 | 17 | 22 | 30 |
| blocks (`Block.new`) | 92 | 155 | 130 | 106 |
| buildings (roofs: `drawRoof` = `fill #a5a095`) | 832 | 1 504 | 1 292 | 1 222 |
| `Bisector.makeCut` | 956 | 1 938 | 1 727 | 2 032 |
| fields (`Farm.new`) | 17 | 17 | 18 | 12 |
| farmhouses (`Farm.getHousing`) | 15 | 13 | 19 | 7 |
| dark solids (`drawSolids`) | 6 | 9 | 7 | 5 |
| `Random.float` | 38 | 43 | 69 | 113 |
| `Random.restore` | 34 | 40 | 46 | 48 |
| city name | Redchurch | Littlerock | Oldvale | Scribes Grove |

* **Screens.** After scale normalisation, the wall polygon and the castle outline with its towers and gate are
  identical. The plaza landmark sits in the same spot: ≤ 1 px for N0/N1, and ≈ 4 px for N9, whose landmark outline
  differs. [SHOWN] The keep's visible parts look alike, but labels cover different parts of it, so its identity is not
  established.
* **Buildings are not the same.** Apart from ≤ 2 small canvases per pair, no roof-bearing ward canvas is shared by any
  two runs (matched on size ±4 px after scale normalisation and on roof count). N4 against N9, at the same scale, shares
  0 of 34/37. [SHOWN]
* **Districts and labels.**
  - N0: OLD DISTRICT, TIMBER TOWN, CHICKEN RING, ASHWOOD SPRAWL, UPPER DISTRICT.
  - N1: MARKET TOWN, CANDLETIDE POINT, ELM LODGE, MILITARY WARD, NIGHTGATE.
  - N4: the nine of EG-4.
  - N9: WOOL ROCK, BEGGARS TOWN, GREYWOOD VALE, BLUE MIRE, WHITE ORCHARD, FROSTHILL GATE, RED HEATH, FORTRESS, WESTERN
    CITY, CANDLECHURCH MARKET, MOONBLOOM WARD.
  - Labels standing outside or across the wall: none in N0. In N1, NIGHTGATE straddles its gate. N4 has 3 (NORTH
    OLDVALE, SPICE ROAD, DAGGERCREST HILL). N9 has 5, plus RED HEATH on the wall line. So the extra districts are mostly
    gate districts outside the wall. [SHOWN positions; INFERRED role] The castle's district is renamed in every run.
* **Extramural building ribbons** appear only along gate roads: N1 one, N4 three, N9 around most gates. N0 has none, only
  farmhouses in its eastern fields. The fields move too: east of the wall in N0, north-west in N4.
* **Road cores.** Two of N4's four road cores reappear in N9 unchanged (103 and 111 ops). The other two change extent
  while their casings stay the same. [INFERRED] The core runs the whole route including the street inside the wall; the
  casing covers only the part outside, whose inner street is re-routed once more gates exist.
* **The view is refitted.** The same wall is drawn at 1.34× (N0), 1.17× (N1), 1.00× (N4) and 1.00× (N9); t and every
  canvas size scale with it. Screenshots of the same seed must be scale-normalised before comparing. [SHOWN] Most
  plausibly the fit follows the extent of roads and extramural development. [INFERRED]

**Conclusion.** The gate count is applied **after the patch mesh and the wall polygon are final and before streets and
wards**. Patches, wall vertices, the tower-or-gate slots, the castle and the plaza position do not change. Streets, wards,
districts, buildings, fields and every name are re-rolled. The same seed therefore gives *the same wall with a different
town inside* for each `gates` value. [SHOWN] Most plausibly the gate picks and face splits consume RNG draws and add cells,
so every later draw shifts, and the street graph changes as well. [INFERRED mechanism]

### EG2-5. `gates=0`: a sealed city, with no fallback

* **No city gate.** [SHOWN] `drawGate` = 1 (the castle), `lerpVertex` 1, `weighted` 0, `splitFace` 0. In the
  screenshot the wall is closed and unbroken: 29 of 29 edges are dark along their whole interior, with 28 city towers.
  The only passage is the castle gate on the citadel's city-facing side.
* **No road leaves the city.** [SHOWN] There are 0 casings and 1 core (the castle street to the plaza), with `aStar` 1 and
  `drawRoad` 1. No road reaches the map edge. Outside the wall there are only fields east of the city and 15 farmhouses
  (`Farm.getHousing`), and nothing connects them to it.
* **No fallback routine.** [SHOWN] N0's executed set is a strict subset of N1's, and nothing runs only at N0. There is no
  console message. `buildCityGates` still runs once and simply makes no pick. This agrees with the stated semantics:
  `gates=0` gives a city without gates (devlog 112574). [STATED + SHOWN]

### EG2-6. EG-1's caveat, updated

**Resolved: the parameter is honoured, exactly.** With the same seed and options, `gates` = 0/1/4/9 gave 0/1/4/9 city
gates by three independent counts, with outer roads and gate districts following. If the key were ignored, all four
would share one count; they share none. N is an exact count, not a target or a cap. The picks are nested, so raising N
adds gates without moving existing ones. It does re-roll the town inside the wall (EG2-4). [SHOWN]

Still unrecorded:
* `gates=-1` for this seed, so whether auto would also give 4 here is unknown. It no longer matters for this question.
* N larger than the number of eligible vertices. The 30-vertex chain has 28 non-reserved vertices, and N9 still has runs
  of three towers between gates, so 9 is not obviously the ceiling.
* The "Maximum" mode.

Corrections to part 1:
* EG-4's "a gate is simply a missing span": the op count is gate-independent (EG2-3).
* EG-6's "Still unrecorded: `gates=0`": now recorded.
* EG-1's `MathUtils.gate` range "30–54 without a coast" becomes 30–66 (it varies with N but is not per gate).

### EG2-7. What changes for a re-implementer

Treat `gates=N` as an exact city-gate count, chosen after the wall polygon is final.

* **Picking.** Pick gates one at a time from the eligible wall vertices (2017: non-reserved vertices shared by two inner
  cells), never adjacent to an earlier pick, and stop after N picks. A smaller N is then a prefix of a larger one, and the gates a user already has survive when they raise
  the count.
* **Placing.** Move each picked vertex onto the chord of its two neighbours. It keeps no tower, but both neighbours
  keep theirs, so `city towers = wall vertices − citadel-shared vertices − N` and `towers + gates` is constant.
* **Splitting.** Split the outer cell at any gate that has only one.
* **Roads.** Give every city gate one outward road and one inward street. Give the castle gate only a street. At N = 0
  the city is sealed: it has no outer roads and no roadside sprawl, only fields.
* **Wall stroke.** Draw one wall stroke per edge whatever N is. Make the gate gap and its two blocks a fixed-width
  feature, independent of the span.
* **Determinism.** Decide whether changing N should keep the town inside the wall. The reference re-rolls everything
  after the gate stage, including the city name. A generator that wants "same town, more gates" must draw the gate picks
  (and the face splits) from a sub-stream isolated by `save`/`restore`, like the per-ward geometry of EG-3.
* **Screenshots.** Refit and scale-normalise before comparing screenshots of one seed.

**CONFIRMED vs PLAUSIBLE.**
* CONFIRMED by executed counts, the complete draw records and measured screenshot pixels: every count and law above,
  the nesting, the tower identity, the midpoint check, the invariant wall and castle, the re-rolled wards and buildings,
  and the absence of any gates-0 routine.
* PLAUSIBLE, from reasoning only: that `weighted` is the gate pick; the 2N + 1 street/road split; the outskirts-filter
  reading; the core/casing extent; the RNG-shift mechanism of the re-roll; and how the view fit is computed.

**Reproduction.** Session scripts are in the scratchpad `gp2/` (not kept):
* Counts: `calls.json` keyed by (label, bytes). The `G` split and the executed-set diff use the V8 `coverage.json`
  ranges.
* Draw: `rec.log` rows as in EG-7.
* Blobs: the EG-7 finder, with the window noted in EG2-1.
* Scale: a least-squares scale-and-translate fit on the five castle towers.
* Wall continuity: pixel sampling along each chord between consecutive chain vertices, skipping 9 px at each end.

---

## Styles addendum (2026-09-25) — captures/mfcg/2026-09-25T10-38-58

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B03.

**Why this capture exists.** It closes `_critic.md` §6.1 and Critic addendum item 4: every recording before it used the
default style, so trees, forests, Hip/Gable roofs, the alleys layer, district legend/straight labels, district tints, a
non-default palette, weathered roofs and the Complex/Block/Processing options had never run. It is one driven session on
the same build (`12710731`), with 16 Enter regenerations and 17 option clicks, each with its own V8 call census, draw
record and screenshot. No JavaScript body was opened. Evidence read: `README.md` (in full), `steps/steps.jsonl`,
`session/console.jsonl`, all 33 `steps/*.calls.json`, all 33 `steps/*.draw.json`, the 33 `*.coverage.json` (byte-range
check only), `key-counts.tsv`, `executed-set-diff.txt`, and the screenshots cited below (opened, cropped and zoomed).

**How to read the steps.** [SHOWN] `steps.jsonl` + README.
* Options **accumulate**: from `015` every city has trees, from `017` forests, from `020` Hip, from `022` Gable, from `023`
  alleys, from `027` the Legend label mode (until `046` switches to Straight), from `028` district tints, from `035`
  Overlay, from `039` the Vivid palette (Spectrum), from `041` Brightness, from `045` weathered roofs, from `050` Complex,
  from `051` Block, and `054`–`055` Processing = None.
* A **toggle step** (click) re-renders the city already on screen, so it is a same-city A/B against the preceding regen
  step. A **regen step** (Enter) builds a new random city (size and flags change; hrefs in `steps.jsonl`).
* Run key used below: `013` = the in-session default-style baseline (size 73, coast + river + shantytown).
* Draw logs of 13 steps hit the recorder's 60 000-entry cap. Their counters (`fillStyles`, `strokeStyles`,
  `lineWidths`, `canvas2d`, `pathSegs`) are complete, and the first 60 000 entries are in paint order, so same-city pairs
  can still be compared entry by entry.
* `calls.json` merges same-named minified functions (EG2-4 caveat). The never-executed check below therefore also uses
  the V8 byte ranges.

### ST-0. The default Style state, read off the survey shots

[SHOWN] `steps/008`–`012`, `018`, `025`, `048`, `053` (Style window crops). This is what every earlier MFCG recording ran
with.

| tab | controls and default values |
|---|---|
| Graphics | Color scheme (button), Thin lines ☐, Tint districts ☐, Weathered roofs ☐ |
| Elements | Font size = Medium, Districts = Hidden (sic, see below), Landmarks = Icon; Title ☑, Scale bar ☑, Emblem ☐, Grid ☑, Compass ☑ |
| Buildings | Display mode = Lots, Processing = Offset, Roofs = Plain, **Raised ☑**, **Solids ☑** |
| Outline | Buildings ☑, Solids ☐, Water ☑, Roads ☑, Trees ☑, Fields ☐, "Toggle all" |
| Misc | Show alleys ☐, Show trees ☐, Show forests (greyed out until trees are on), Towers = Round, Farm fields = Furrows |
| Text | exists; never opened (`012-tab-text.png` actually shows Graphics) |

Dropdown value lists [SHOWN]: Roofs = Plain / Hip / Gable; Districts = Hidden / Straight / Curved / Legend; Display
mode = Block / Lots / Complex / Hidden; Processing = None / Offset; tint Method = Spectrum / Brightness / Overlay
(`032`); the Color scheme window has tabs Colors / Tints, fields Strength(%) and Weathering(%), and buttons Preset▾,
Load, Apply, Save (`034`).

* **Raised is on by default.** So the dark polygon under every roof (§10.4 "faux-extrusion", visual-spec §1.4 "drop
  shadow") is the stated `Raised` fake-3D option (devlogs-b §2.8, 0.7.2), not a fixed part of the building style.
  [SHOWN state; INFERRED identification]
* **The default Districts value reads "Hidden" while curved labels are drawn** (README "UI oddity"). The label code that
  runs by default is the curved one (`Ridge.build` = districts, ST-4). [SHOWN]
* Processing lists only None / Offset. The stated `Shrink` value was removed in 0.11.1 (posts-b §2.4), and so were Lots
  method, Filter lots and Display mode Simple. [SHOWN + STATED]

### ST-1. Executed-set headline and per-option first appearance

[SHOWN] `executed-set-diff.txt`, re-derived from the 33 `calls.json` (script logic in "Reproduction"). Against the 12
earlier samples (1 544 labels, 638 `com.watabou.*`), the style steps add **128 `com.watabou.*` labels in 46 classes**.
19 classes are wholly new: 13 are UI (`coogee.ui.*`, `ui.forms.StyleForm`, `PaletteForm`, `ColorItem`), and 6 are map
code: `mfcg.model.Forester`, `mfcg.mapping.TreesLayer`, `mfcg.utils.Bloater`, `geom.FillablePoly`,
`scenes.overlays._Legend.LegendItem` and `utils.Palette`. The in-session default regen `013` adds only 4 UI/keyboard
labels, so a label that first appears at a later step belongs to that step's option. By V8 byte range the style steps
execute 213 functions (all packages) that never ran before.

Per option, map-code routines only (bytes from `calls.json`; count = toggle step / first regen step):

| option (toggle, regen) | first-time routines (bytes): count | previously executed routines whose count changes |
|---|---|---|
| Show trees (`014`, `015`) | `Forester.fillArea` (153) 3 842 / 881; `Forester.fillLine` (213) 120 / 476; `PoissonPattern.fill` (457) = `FillablePoly.new` (45) = `.getBounds` (28) = `fillArea`; `FillablePoly.validateRect` (27) 5 589 / 1 260; `FillablePoly.validate` (49) 782 460 / 176 400; `Block.spawnTrees` (243) 948 / 213; `Alleys.spawnTrees` (244) 130 / 68; `Farm.spawnTrees` (504) 2 / 12; `Ward.spawnTrees` (23) 425 / 350; `TreesLayer.new` (735) 1, `.addLayer` (65) 1, `.addCityTrees` (208) 1, `.addTrees` (108) 557 / 430, `.getTree` (273) 779 / 698, `.getCrown` (477) 20 / 0; `Bloater.bloat` (153) 20 / 0, `.extrude` (155) = `.extrudeEx` (107) 1 532 / 0; `Style.a` (425) 1 / 1 | `ArrayExtender.random` +759 in the toggle |
| Show forests (`016`, `017`) | `TreesLayer.addForests` (893) 1, `.getForestFaces` (221) 1, `.getForestOutlines` (269) 1, `.getForestInsets` (148) 2, `.(anon@217006)` (80) 387 / 572; `DCEL.floodFillEx` (262) 1 / 2, `DCEL.outline` (332) 1 / 2; `PolyUtils.resampleClosed` (206) 4, `.simpleInset` (291) 2, `.fractalizeClosed` (429) 2, `.f` (276) 4 221 / 8 638; `Cubic.smoothClosed` (468) 2 | `TreesLayer.getTree` 698 → 1 309 on the same city |
| Roofs = Hip (`019`, `020`) | none | `SkeletonBuilder.run` (31) = `.new` (343) 13 → 9 222; `.intersect` 2 702 → 157 546; `.step` 30 331; `.merge` 21 109; `_SkeletonBuilder.Node.new` = `Rib.new` 60 675; `.Segment.new` 39 566 |
| Roofs = Gable (`021`, `022`) | `SkeletonBuilder.addGables` (511) 7 133 / 3 724 | skeleton counts ≈ Hip |
| Show alleys (`023`, `024`) | `FormalMap.updateRoads` (41) 1 / 0 | `RoadsView.drawOutline` = `drawRoad` + 1 from here on |
| Districts = Legend (`026`, `027`) | `Legend.addItem` (58) = `_Legend.LegendItem.new` (632) = `LegendOverlay.(anon@403130/403226/403321)` (51/49/106) 14 / 30 (= 3 × 10 districts; a regen rebuilds the legend 3 times, `Legend.wipe` = 3) | `Ridge.build`, `SkeletonBuilder.getPath/getPath2Root` drop to 0 |
| Tint districts (`028`, `029`) | `Ward.getColor` (72) 83 / 84; `geom.Color.lerp` (218) 83 / 84 | none |
| Tint method = Overlay (`034`, `035`) | `Style.overlay` (101) 8 / 12; `Style.setPalette` (668) 1; `TownScene.applyPalette` (89) 1; `utils.Palette.*`, `PaletteForm.*`; `MathUtils.gatei` (37) 2 | `Style.spectrum` 0 |
| Preset = Vivid (`037`, `039`, `040`) | `Palette.fromJSON` (50), `.fromData` (733), `PaletteForm.loadPreset/loadPalette` (select step only) | `Style.spectrum` back (12 / 9) |
| Tint method = Brightness (`041`, `042`) | `Style.brightness` (110) 9 / 10 | `Style.spectrum` 0 |
| Weathered roofs (`044`, `045`) | `geom.Color.scale` (147) 11 120 / 10 023 | `geom.Color.rgbfSafe` = `scale` + `getTint` |
| Districts = Straight (`046`, `047`) | none | `Ridge.build` stays 0 |
| Display mode = Complex (`049`, `050`) | `Block.createBuildings` (430) = `.createRects` (1 098) 510 / 674; `Block.isRectangle` (92) = `.(anon@279789)` (93) 4 738 / 5 897; `.(anon@279808)` (73) 4 737 / 5 896; `Building.getPlanFront` (433) 3 835 / 4 619; `PolyCore.rectArea` (63) 3 460 / 4 444; `PolyCore.simplifyClosed` (195) 871 / 1 003 | `Building.create` 29 → 4 737; `Building.circumference` 21 → 3 153; `SkeletonBuilder.intersect` 84 586 → 161 408 |
| Display mode = Block (`051`, `052`) | none | `BuildingPainter.drawRoof` 0; every `TreesLayer.*`, `Forester.*` 0 |
| Processing = None (`054`, `055`) | `City.updateLots` (144) 1 / 0 | `Block.indentFronts` 493 → 0; `PolyBool.and` 4 705 → 1 134 |

### ST-2. Trees and forests

**Model side: where trees come from.** [SHOWN counts, all exact]
* **One `spawnTrees` call per ward.** `Ward.spawnTrees` (23 B, the base-class no-op) + `Alleys.spawnTrees` (244 B) +
  `Farm.spawnTrees` (504 B) = `PatchView.new` = `TreesLayer.addTrees` in all 23 steps with trees (e.g. 425 + 130 + 2 =
  557 in `014`; 350 + 68 + 12 = 430 in `015`). A built-up ward then calls `Block.spawnTrees` per block (948 in `014`,
  slightly below `Block.new` in the regens, e.g. 873 of 896 in `017`). A fifth `spawnTrees` (122 B) never ran; it most
  plausibly belongs to `Park` (every run had `greens=0`). [INFERRED owner]
* **`PoissonPattern.fill` = `Forester.fillArea` = `FillablePoly.new` = `FillablePoly.getBounds`** in all 14 steps that
  build trees (3 842 / 881 / 4 380 / 3 300 / 2 903 / 998 / 1 704 / 2 490 / 1 957 / 670 / 5 493 / 7 124 / 2 801 / 2 719).
* **`FillablePoly.validate` = 140 × `FillablePoly.validateRect`, exactly, in the same 14 steps** (782 460 = 140 × 5 589;
  176 400 = 140 × 1 260; 859 040 = 140 × 6 136; …). 140 is the point count of the start-up pattern (§6.1: 230 steps,
  140 emitted). So `fill` tiles the 140-point blue-noise pattern over the area's bounding box. For every tile that passes
  `validateRect` (≈ 1.4 tiles per area), all 140 points are tested against the polygon. **This settles §6.1/§14 Q1: the
  consumer of `PoissonPattern` is the tree scatter,** as the Critic addendum predicted from VG and NG. [SHOWN identity;
  INFERRED reading of "tile"]
* `Forester.fillLine` (120–4 279 per city) is a second placement mode. Screenshots put trees in chains along field edges
  (hedgerows) as well as in courtyards, so `fillLine` is most plausibly the line/hedgerow placer. [INFERRED]
* **Tree positions are model data, cached per city.** On a toggle re-render `Forester.*`, `PoissonPattern.fill` and
  `Block.spawnTrees` are 0, yet the same number of trees is drawn (e.g. `019`: 2 802 tree fills, as in `017`). [SHOWN]

**Render side: glyphs.** [SHOWN]
* **A library of 20 crowns, built once per session.** `TreesLayer.getCrown` = `Bloater.bloat` = 20 and
  `Bloater.extrude` = `extrudeEx` = 1 532 run only in `014`, the first render with trees, and never again (not in
  later regens either). In `014`, `getTree` − `ArrayExtender.random` = 779 − 759 = 20. In every later toggle
  `getTree` = `ArrayExtender.random` exactly (1 309, 1 558, 1 246, 338, 239, 130, 265, 894, 185). [SHOWN counts] So
  the first 20 `getTree` calls build a crown by bloating a seed polygon, and every later call picks one of the 20 at
  random. [INFERRED] The 153-byte `bloat` that EG-6 listed under "warp tools" is `mfcg.utils.Bloater.bloat`, the crown
  builder; the other two `bloat`s (49 B, 201 B) are still unexecuted.
* **City-tree crowns are re-picked on every render; forest trees are not.** In the toggles after the forest exists,
  `getTree` equals the city-tree count only (`028`: 338 = the 338 fills on the city-tree canvas; `034` 239; `039` 130;
  `041` 265). The forest canvases keep the canvas sizes, stroke op counts and fill counts of the preceding regen. The re-pick is visible: crowns on
  the same trees change shape between `020` and `021`. The draw recorder logs 0 `Math.random` calls in every toggle, so
  the pick comes from the seeded stream, which is not reset for a re-render. [SHOWN; INFERRED stream]
* **Each tree is one filled polygon in `colorTree`, 17–64 path ops** (typically 33–57), with no stroke of its own
  (`014`: exactly 779 new `fill #7f7a71` = `getTree` 779). [SHOWN]

**Render side: the layer.** [SHOWN op order, `015`/`016`/`022` complete logs]
1. The city trees get their own canvas covering the town (845×943 in `015`). It holds **one `stroke colorDark` at
   width 2t whose single path contains every crown (29 593 ops for 698 trees)**, followed by one `fill colorTree` per
   crown.
2. The forest gets a second canvas, much larger than the viewport (6133×5988 in `016`). It holds one 2t stroke
   (37 962 ops: forest outline + its edge trees), then **one forest fill of 257+ ops (12 062)**, then one fill per forest
   tree (611 in `016`).
3. Then the walls (1.9), towers and overlays. Trees and forests are drawn **after the wards and fields and before the
   walls**, and after the roads, so the forest covers roads. That matches the stated "roads going 'under' the forest"
   (posts-b §2.14). [SHOWN order + STATED]

Reading [INFERRED, from the op order]: stroking every outline at 2t and then filling every crown on top leaves a t-wide
outline only on the outer boundary of each overlapping cluster, because each fill covers the inner half of its
neighbours' outlines. That is the creator's "single trees get merged together" (devlogs-b §2.10) done without any
polygon union. The forest edge is scalloped by the same mechanism, since its edge trees share the forest's stroke pass.
Count check: tree-coloured fills = `getTree` + forest polygons in every regen step (e.g. `017`: 2 804 = 2 802 + 2;
`042`: 2 668 = 2 663 + 5). [SHOWN]

**Forest geometry.** [SHOWN counts; order INFERRED from names, there is no call tree]
`addForests` → `getForestFaces` (`DCEL.floodFillEx`, one per forest region) → `getForestOutlines` (`DCEL.outline`) →
per outline `getForestInsets` (`PolyUtils.simpleInset`), `resampleClosed` ×2, `fractalizeClosed`, `Cubic.smoothClosed`.
In all 13 forest-building steps, `DCEL.floodFillEx` = `DCEL.outline` = the number of forest fills in the draw record =
`TreesLayer.addLayer` − 1 = `Style.a` − 1 (1–5 forests per map). Also in all 13, `getForestInsets` = `fractalizeClosed`
= `smoothClosed` = ½ `resampleClosed`. That count equals the forest count in 8 steps and is one higher in 5 (a single
forest with 2 insets), most plausibly one per outline ring when the forest ring has a hole. [INFERRED] `PolyUtils.f`
(3 038–8 638 per city) is the per-vertex helper of that chain. The stated rule "forests fill all available space (i.e. not occupied by the city, farmland or
water)" (posts-b §2.14) fits a flood fill over the free DCEL cells followed by an inset, fractal edge and smoothing.
[STATED rule + SHOWN routines; INFERRED link]

**Cost.** [SHOWN counts; no CPU profile exists] Trees cost about 200 `FillablePoly.validate` point tests per filled
area: 0.13–1.37 M per city, the largest count in any step. Forests add under 10 k helper calls. The wall-ms column
cannot separate them, because the draw recorder inflates every step.

**Screenshots.** [SHOWN]
* `014-01-trees-on.png` ("Downwood", same city as `013`): grey `#7f7a71` lobed blobs with a thin dark rim. They appear
  singly and in merged amoeboid clusters, inside courtyard voids of blocks (WESTERN SLUMS, STONEHILL), in the gaps between
  hatched fields north of the city, and as a few isolated blobs outside. Never on buildings or roads. The Misc tab shows
  Show trees ☑, Show forests ☐.
* `016-03-forests-on.png` ("Forest Market", size 58): everything outside an irregular clearing is flat `#7f7a71` forest,
  the same grey as water in the default scheme. The clearing hugs the walled town, the north fields and the extramural
  houses. It sends narrow lobes out along the outer roads, which stop at the forest edge. The edge is a fine scalloped
  line of crown bumps. The grid runs over the forest. The Misc tab shows both boxes ticked.
* `017`/`019` ("Darkbloom Wood", size 79) and `020`–`022`: the same forest frame; in the Vivid steps it is dark green
  `#667755`.
* **Block display mode has no trees or forest at all** (`051`–`055`, every `TreesLayer.*` = 0, no tree-colour fill,
  paper everywhere in `051-29-display-block.png`), although both options are still on. [SHOWN]

### ST-3. Roofs: Hip and Gable on a per-building straight skeleton

**Identities.** [SHOWN]
* **Hip: one straight skeleton per building.** `019` (Hip toggle on `017`'s city): `SkeletonBuilder.run` = `.new` =
  `BuildingPainter.drawRoof` = 9 222, against 13 (= the district ridges) in `017`. Regens: `run` = `drawRoof` + ridges
  while labels are curved (`020`: 7 150 = 7 139 + 11; `022`: 3 736 = 3 727 + 9; `024`: 3 966 = 3 952 + 14). From `027`
  on (Legend, then Straight labels) no ridge skeleton is built and `run` = `drawRoof` exactly (2 767, 3 199, 2 959,
  2 106, 11 127, 10 025, 4 734, 5 880).
* **Per-roof skeleton cost** (`019`): 17.1 `intersect`, 3.3 `step`, 2.3 `merge`, 6.6 `Node`/`Rib`, 4.3 `Segment` per
  roof, against ~200 `intersect` per district ridge. Complex footprints (ST-7) roughly double it (84 586 → 161 408 on
  the same 4 734 roofs).
* **Gable = the Hip skeleton plus `addGables` on almost every roof.** `addGables` = `drawRoof` − 1…16 (0.01–0.2 %) in
  all 17 Gable steps (e.g. 7 133 of 7 139; 3 724 of 3 727). In `021`'s logged part, the 6 roofs without a ridge path equal
  `drawRoof − addGables` = 6. So a roof that skips `addGables` is drawn with no ridge lines at all (plain), not as a hip.
  [SHOWN for this sample]
* **Not bit-stable between renders of one city.** In 4 of 6 same-city Gable pairs, `addGables` and the skeleton internals
  differ by a few units while `run` and `drawRoof` are equal: `027`/`028` 2 762 vs 2 765 (`intersect` 50 716 vs 50 722);
  `042`/`044` 11 119 vs 11 111 (`intersect` 189 622 vs 189 636); `040`/`041` 2 103 vs 2 105; `035`/`039` 2 957 vs
  2 956. [SHOWN] Most plausibly the roof pass draws from the same un-reset seeded stream as the tree crowns. [INFERRED]

**Draw record.** [SHOWN]
* Plain: per roof `fill colorRoof`, `stroke(0)`, `stroke(n + 1 ops, t)`, `stroke(0)`. Hip and Gable append
  `stroke(0)` + **one more `colorDark` hairline at width t: the ridge/hip path**, drawn straight after that roof's
  outline. `017` → `019`: `#1a1917` strokes 63 030 → 81 467 (+18 437 ≈ 2 × 9 222). Fills are unchanged.
* **Ridge-path ops = 2 × (roof fill ops) + 1 for 96 % of roofs** (`020`'s logged 5 385 roofs: quads 5 → 11 ops ×4 075,
  pentagons 6 → 13 ×995, 7 → 15 ×78, 8 → 17 ×24). The rest have fewer ops. That is about two ops per footprint corner
  plus a short ridge. The corner-to-ridge lines are separate moveTo/lineTo pieces: `017` → `019` adds ≈ 5.8 `moveTo`
  + 5.2 `lineTo` per roof (canvas totals, which count two replay passes, halved). [SHOWN arithmetic; INFERRED geometry]
* Gable vs Hip on the same city (`020` vs `021`): the per-roof op signatures are identical for 3 725 of 5 385 logged
  roofs; the rest differ by ±2 ops. Gable therefore keeps the same number of skeleton pieces and moves their endpoints.
  It does not add or delete lines. [SHOWN; INFERRED]
* With **district tints on**, roof outlines and ridge lines switch from `colorDark` to a per-ward colour, lerp(dark,
  roof, 0.30) (ST-5).

**Screenshots** [SHOWN, 8× zoom crops of the same city]:
* `020` Hip ("Greatfair", size 69): every roof shows diagonals from its corners meeting a short central ridge, a small
  "envelope" per building.
* `021` Gable: the diagonals are gone. One ridge runs the full length of each roof to its gable ends. Short buildings
  in a row show ridges across the row.
* At city scale (`019`, "Darkbloom Wood", size 79) the ridge hairlines turn the flat grey roofs into a darker, busier
  texture.
* In every case the `Raised` dark band under each roof is still there.
* This matches the stated construction (0.11.0, "Hip and Gable make the generation a little slower", line work only;
  devlogs-b §2.6, posts-b §2.10). [STATED + SHOWN]

### ST-4. The alleys layer

[SHOWN] `023-09-alleys-on.draw.json` (complete, 12 entries) and the `022` → `023` pixel diff (same city, "Newvale", size
50, `shantytown=1`, `plaza=0`).

**The toggle redraws only the roads layer.** `FormalMap.updateRoads` runs once. The draw record holds 5 road casings
(`#1a1917`, 2 + 2t = 2.563), then **one `#1a1917` stroke at width t (0.282) with 518 path ops on a 1323×993 canvas**,
then 6 road cores (`#ccc5b8` w2, the last being the 7-op castle street).

**Where it sits.** The alley hairline is drawn **under** the road cores and under every ward canvas. It is not drawn over
the gaps. `RoadsView.drawOutline` = `drawRoad` + 1 in all 19 later steps that redraw roads, and in none before `023`.

**Where it shows.**
* 10 194 pixels change, all of them darker. Their bounding box is x 105–1421, y 57–1045, which is the stroke's own canvas
  extent. They form ≈ 130 separate pieces.
* Only one piece lies inside the wall ring. In the walled core no pixel changes (8× crops).
* The lines run through the extramural sprawl (NORTHERN NEWVALE, AMBERFALL FIELD, STORMCHURCH GATE, SALT WELL): along the
  gaps between the sprawl's houses and across open ground.
* Arithmetic, assuming one subpath per road stroke: ≈ 137 subpaths with ≈ 2.8 segments each (148 `moveTo` per replay pass
  − 11 roads; 381 `lineTo`). No model count equals 137.

**It appears only with a shanty town.** "Show alleys" stays on from `023`, and the hairline is present in all 10 later
cities with `shantytown=1`. It is absent in both cities with `shantytown=0` (`024`, `040`), although those cities do
have alleys (`WardGroup.createAlleys` 44 and 30).

**Reading.** [INFERRED] The layer draws centrelines for the sprawl's alleys only, and intramural alleys stay unstroked
gaps (EG-4). This is plausibly one of the creator's "two types of alleys which are quite different" (posts-b, 100431269).
* Not excluded: intramural centrelines are in the path but hidden under the ward bitmaps. The piece count (≈ 130 visible
  against ≈ 137 subpaths) leaves little room for that.
* The creator's 0.10.2 street-map image with alleys everywhere used Display mode Hidden, which was not recorded.
* The 2–3-segment pieces fit the stated "twisted bisection" cut with a bend (Critic addendum item 3).

### ST-5. District labels: Legend and Straight

**Legend** (`026` toggle; "Redwind Church", size 69). [SHOWN draw record + screenshot]
* The curved labels and the map title are replaced by numbered markers and a bordered legend panel at the top right.
* Each marker is two 2-op fills (moveTo + arc) on a 43×43 canvas: a paper `#ccc5b8` disc, then a `colorDark` disc. The
  numeral is 21 px, in paper colour.
* The panel holds the title at **36 px** (the map title is 54 px), the scale bar (0 / 250 / 500 m, moved in from the
  bottom-left corner), and 14 entries, each a "1." + name pair at 21 px ("Market District … Ashchurch Road").
* In Vivid (`045`) the numerals are paper `#fff2c8` on `colorLabel` `#2d3d4c` discs, while the legend text is
  `colorDark` `#4c5950`. That is the stated role split: Labels colour for map labels and pins, not legend text (posts-b
  §2.19). [SHOWN + STATED]
* `Legend.addItem` = `LegendItem.new` = districts × 1 on a style toggle, and × 3 on a regen or palette Apply
  (`Legend.wipe` = 3).

**Ridges are built only for curved labels.** [SHOWN]
* From `027` on, `annotations.Ridge.build` = `SkeletonBuilder.getPath` = `getPath2Root` = 0.
* `Equator.build` = `District.new` and `District.getRidge` = `CurvedLabel.getRidgeSegment` = the district count keep
  running in every step. `CurvedLabel.new` also still runs.
* So the straight-skeleton "ridge" of §6.2 is computed only in Curved mode, while the "equator" (largest span) is
  computed for every district. Straight labels most plausibly sit on it. [INFERRED]

**Straight** (`046` toggle; "Daggerchurch", Vivid). [SHOWN]
* District names are horizontal, all caps and haloed, and still sized per district (UNDERWAY STREETS large, PALE HALL
  small).
* They are still set **one `fillText` per character** (168 × 27 px, in `colorLabel`).
* No map routine runs for the first time.

### ST-6. Colour: tints, tint methods, the Vivid palette, weathering

**Tint districts** (`028`, same city as `027`). [SHOWN]
* The 2 767 roof fills split into 10 colours, one per district, summing exactly to 2 767 (`#a59595` 789, `#a59895` 644,
  `#a2a595` 392, `#a5a195` 329, `#9da595` 230, `#a59b95` 199, `#a59596` 115, `#9fa595` 40, `#a5a095` 15, `#a59e95` 14).
* **Outlines are tinted too.** Whenever tints are on, each roof's outline and ridge lines become lerp(colorDark, tint,
  0.30). k = 0.29–0.30 in every channel, over 24 fill/outline pairs in 4 steps (e.g. `#a59595` → `#433e3c`). The Raised
  under-polygons keep their colour.
* **Which wards.** `Ward.getColor` = the built-up wards (Alleys + Castle + Cathedral + Market; Wilderness, Farm and
  Harbour are excluded) in 4 of 4 checkable steps (`028` 83 = 80 + 3; `035` 79; `052` 116; `055` 91).
* **Tint identities.** `Color.lerp` = `getColor` + `Style.overlay` in 33 of 33 steps. `Style.getTint` = `Color.rgb2hsv`
  = `Color.hsv` in 33 of 33, so every method goes through HSV.
* **When tints are computed.** Once per district at creation, and again on palette Apply (`034`: `getTint` 8 =
  `overlay` 8, `District.new` 0). Never per render (`028`: `getTint` 0).

**The three methods, from the colours.** [SHOWN arithmetic]

| method (step) | hue | saturation | value | reading |
|---|---|---|---|---|
| Spectrum, default roof, strength 30 (`028`, 10 tints) | varies −4° to 90° around the base 41° | kept, 0.097 | kept, 0.647 | hue rotation |
| Spectrum, Vivid roof, strength 20 (`039`, 11 tints) | varies −3° to 64° around the base 31° | kept, 0.491 | kept, 0.839 | hue rotation |
| Brightness (`041`, 10 tints) | kept, 30°–31° | kept, 0.486–0.491 | varies 0.804–0.871 | uniform RGB scale |
| Overlay (`034`, 8 tints) | varies 18°–67° | varies 0.044–0.097 | varies 0.627–0.647 | blend toward a per-district hue |

This fits the stated Spectrum / Brightness / Overlay + Strength model (posts-b §2.19) and the stated random per-district
assignment (devlogs-b §2.11). [STATED + SHOWN]

**The in-app default method is Spectrum, not the Brightness of `Assets/default.json`.** [SHOWN]
* `Style.spectrum` = `getTint` = `District.new` in every default-style regen here and in all 12 earlier samples.
* The default scheme's Tints tab shows Spectrum (README, `031`).
* `028` is pure hue rotation.
* Strength 30 and Weathering 20 (`034` dialog) do match `default.json`.
* So the §10.1 default row has the right numbers and the wrong method.

**Vivid palette** (`037` select, `039` apply, `040` regen). [SHOWN]
* Selecting a preset only refills the form: `037`'s draw record is 7 UI ops.
* After Apply every map colour is a `vivid.json` value: paper `#fff2c8`, dark `#4c5950`, roof `#d6a36e` (tinted), tree
  and forest `#667755`, wall `#606661`, label `#2d3d4c`, furrows `#c3cc99` (colorGreen), water `#779988`.
* **Roles that `default.json` collapses become visible:**
  - The Raised under-polygons (`BuildingPainter.g`) are filled in **colorWall**: `040` has `#606661` fills 2 791 against
    `g` 2 739.
  - Building outlines stay colorDark.
  - The curtain wall, a single 1.9 colorDark stroke in default, is drawn span by span as a colorDark casing at 1.9 + t
    and a colorWall core at 1.9 − t (31 pairs, 3 ops each, in `039`). That is EG-4's W ± t rule for piers and bridges.
  - Legend discs use colorLabel.
  - 2 122 extra 3-op colorDark hairlines appear inside the building runs. Their role is not resolved.
* Screenshot `039` ("Everkey"): cream paper, a dark-green forest frame, a teal river, ochre roofs, red-pink and
  yellow-green district tints, dark-blue legend discs.

**Weathered roofs** (`044`, same city as `042`). [SHOWN + STATED]
* `geom.Color.scale` runs once per roof, minus 2–9 (11 120 of 11 127; 10 023 of 10 025; 4 727 of 4 734; 5 871 of
  5 880).
* Roof fills go from 9 district colours to 290+ distinct colours (`fillStyles` 18 → 303). Strokes are unchanged: 14
  colours before and after.
* Each weathered colour is a uniform RGB scaling of its ward's tint (e.g. `#e2ac74` = 1.055 × `#d6a36e` in all three
  channels).
* Within one ward canvas the factor spans 0.86–1.18 (p5–p95 0.91–1.10; 4 551 roofs; Weathering 25).
* This is the stated "each roof is drawn in its own slightly different colour … but without shadows" (posts-b §2.19).
* It answers §14 Q8: weathering is a per-roof brightness jitter. It is not paper texture.
* Screenshot `044` ("Whitewood") shows the mottled roof grain.

### ST-7. Display modes and Processing

**Complex** (`049`, same city as `047`). [SHOWN]
* Per block: `Block.createBuildings` → `createRects` (510, the same blocks that spawn trees). Per lot: `Building.create`
  (4 737 ≈ `drawRoof` 4 734 + 3), `Block.isRectangle` (4 738), `Building.getPlanFront` (3 835), `PolyCore.rectArea`
  (3 460), `simplifyClosed` (871).
* §4.9's `Building` class, which in Lots mode builds only the 2–19 landmarks per city, here builds every house.
* The roof count is unchanged, but the Raised under-polygons rise from 6 073 to 7 882 and skeleton `intersect` doubles:
  the footprints have more corners.
* Zoom (`047` vs `049`): in Lots, lots fill each block's perimeter edge to edge. In Complex each lot holds a smaller
  building assembled from rectangles (stepped L/T shapes), with ground between neighbours.
* Matches the stated Buildings Off / Simple / **Complex** (0.5.3, devlogs-a table). [STATED + SHOWN]

**Block** (`051`, same city as `050`). [SHOWN]
* `drawRoof` = 0. `BuildingPainter.g` 887 plus 651 roof-coloured fills: every block is one flat polygon (roof colour,
  still tinted and weathered) over its colorWall under-polygon.
* Trees and forest disappear (ST-2). Fields, roads, walls, water and labels stay.
* The screenshot shows solid orange blocks between street gaps. The sprawl blocks are large and irregular.

**Processing = None** (`054`, same city as `052`, still in Block mode). [SHOWN + STATED]
* `City.updateLots` re-runs lot generation for every built-up ward with the same RNG states: `Alleys.createGeometry` 113
  = 113, `WardGroup.createAlleys` 36 = 36, `Block.new` 493 = 493, `Bisector.makeCut` 9 176 = 9 176, `split`/`subdivide`
  within 0.1 %.
* **`Block.indentFronts` drops from 493 to 0**, and `PolyBool.and` from 4 705 to 1 134. The `055` regen has 0
  `indentFronts` for 716 blocks.
* So **Processing = Offset is `Block.indentFronts` → `PolyBool.and`**, as the Critic addendum inferred from the stated
  "shifts the front side of every lot to make lines of facades uneven" (61026228). None removes that pass and nothing
  else. It cannot be seen in Block mode (`054` ≈ `052`).
* The 3 "Failed to make a cut" lines in `054` come from the re-run bisection.

### ST-8. Side finding (not a style effect): a geometry failure also restarts the whole city

[SHOWN] `session/console.jsonl`. Three builds (the cities of `013`, `029`, `047`) print
`model/City.hx:156: *** CRITICAL: A bad poly was provided for besecting` followed at once by a new `-->> seed:…` attempt.
* Each failed attempt had already printed `createWards` and `buildCityTowers`, and in `013` also `Bisector.hx:281` and
  `WardGroup.hx:107`. None printed a `buildGeometry` time.
* Coverage agrees: `buildGeometry` = `buildCityTowers` = 2 in those steps, and model counts span both attempts (`013`:
  `District.new` = `getTint` = `spectrum` = 23 = 12 discarded + 11 final; README's "23 = District.new" is exact but
  spans two geometry builds).
* No earlier MFCG console contains the message.

This **contradicts** three places:
* §3.1's diagram and §3.2's "once per finished city" column: `createWards`, `buildCityTowers` and `buildGeometry` sit
  inside the attempt loop. Earlier failures just never reached them.
* EG-3 ("The only whole-city restart is still `City.hx:156 *** Unable to build a canal!`").
* §11's failure table.

`City.hx:156` is a catch-all. A geometry exception costs a whole new city attempt, as a canal failure does. That happened
in 3 of 16 Enter cities here, alongside 12 canal restarts in 4 cities.

### ST-9. The "never executed" list after this capture (corrects §5 "Notable absences" and EG-6)

**Now executed.** [SHOWN] `calls.json` + V8 byte ranges.
* The tree/forest code: `Forester`, `TreesLayer`, `Bloater`, `FillablePoly`, `PoissonPattern.fill`, and 4 of the 5
  `spawnTrees`. §5's "no class of that name executed … no tree glyphs appear" was true only because trees were off.
* `SkeletonBuilder.addGables`, and the per-building skeleton.
* The legend (`Legend.addItem`, `_Legend.LegendItem`).
* The non-default tints and palette (`Style.overlay/brightness/setPalette`, `utils.Palette`, `TownScene.applyPalette`).
* `Color.lerp/scale`, `Ward.getColor`, `City.updateLots`, and the Complex-mode `Block`/`Building` methods.

**Three EG-6 rows were mis-filed.**
* `updateRoads` (41 B) is `FormalMap.updateRoads`, the roads-layer redraw that the alleys toggle calls. It is not the
  Generate > Roads tab.
* The 153-B `bloat` is `mfcg.utils.Bloater.bloat`, the tree-crown builder. It is not a warp tool.
* The 332-B `outline` is `DCEL.outline`, the forest-outline tracer. It is not the Outline tab.
* `MathUtils.gatei` also runs now, in the Color scheme form.

**Still never executed in any of the 45 samples.** 2 369 of 4 141 V8 functions have count 0 everywhere (EG-6: 2 554 of
4 113 over 9 runs). The named ones:
* `toggleAlleys` 81, `toggleDistricts` 313, `rerollDistricts` 76 (keyboard/menu paths; this run used the Style window)
* `updateTrees` 171, `resetForests` 29, the fifth `spawnTrees` 122 (most plausibly `Park`; every run had `greens=0`)
* the Outline-tab code: `addOutline` 168, `showOutlines` 32, `outline` 986
* landmarks: `addLandmark` ×2, `addLandmarks` 385, `removeLandmark` 71, `removeLandmarks` 60, `updateLandmarks` 81
* warp: `bloat` 49 / 201, `onWarp` ×2, the second `equalize` 430
* export: `onExport` 103
* `createRoadsTab` 782

**Options never driven** (README "Not reached").
* **The Text and Outline tabs** were not driven. The Outline tab was only photographed (`010`).
* The Elements toggles (Title, Scale bar, Emblem, Grid, Compass), Font size and Landmarks.
* The Towers and Farm-fields dropdowns.
* Thin lines, and Raised and Solids *off*.
* Display mode Hidden and Districts Hidden.
* The Ink, B&W, Natural and Modern presets.
* Warp and Cmd-click reroll.

**The capture that would close most of the rest:** `greens=1` with trees on (`Park.spawnTrees`), Raised off (to confirm
the under-polygon role), Display mode Hidden with alleys on, the Outline tab's toggles, and one landmark list.

### ST-10. Where this capture corrects or confirms earlier text

| # | claim as written | what the evidence shows | tag |
|---|---|---|---|
| 1 | §5 "Notable absences": no `Forester`, no tree glyphs | Trees and forests run `Forester` + `TreesLayer` + `Bloater` + `FillablePoly` when switched on (ST-2) | [SHOWN] |
| 2 | §6.1 / §14 Q1: `PoissonPattern`'s consumer unknown | The tree scatter: `validate` = 140 × `validateRect` exactly, in 14 of 14 steps | [SHOWN] |
| 3 | §6.2: `SkeletonBuilder.run` tracks `District.new`, labels only | With Hip/Gable, one skeleton per roof (`run` = `drawRoof`), plus ridges only in Curved label mode. `Equator.build` = `District.new` always | [SHOWN] |
| 4 | §10.1: default `tintMethod` Brightness | The in-app default runs Spectrum (hue rotation at fixed S and V). The JSON's strength and weathering match | [SHOWN] |
| 5 | §10.4 "faux-extrusion" / visual-spec §1.4 "drop shadow" | It is the `Raised` option, on by default. In Vivid it is filled with colorWall | [SHOWN state + colours; INFERRED identity] |
| 6 | §14 Q8 `weathering` unknown; Q11 `spectrum` vs `getTint` | Weathering is a per-roof uniform RGB scale (`Color.scale`, ≈ ±10 %). `getTint` dispatches 1 : 1 to `spectrum`/`brightness`/`overlay` by method | [SHOWN] |
| 7 | §3.1 / §3.2, §11, EG-3: only canal failures restart; `createWards`… once per city | A bisector exception at geometry time also restarts the city (ST-8) | [SHOWN] — contradiction |
| 8 | EG-4 correction 1: alleys are drawn only with the alleys layer | True, but the layer draws only the sprawl's alleys in every recorded city, under wards and road cores (ST-4) | [SHOWN; reading INFERRED] |
| 9 | EG-6 table: `updateRoads`, `bloat` 153, `outline` 332 | Roads redraw, tree crowns, forest outline (ST-9) | [SHOWN] — mis-filed |
| 10 | README: "`Ward.getColor` = `Color.lerp` … one per ward" | Built-up wards only, and `lerp` = `getColor` + `overlay` (overlay steps +8 / +12) | [SHOWN] |
| 11 | README: "`run` = `drawRoof` + the district ridges" in regens | Only while labels are Curved (`020`/`022`/`024`). Exact `run` = `drawRoof` from `027` | [SHOWN] |
| 12 | README: the alley stroke is "drawn over the already-computed alley gaps" | It is drawn under the ward canvases and the road cores | [SHOWN] |
| 13 | devlogs-b §2.10: tree merging is "a union of overlapping circles" | No union routine. One 2t outline pass under per-crown fills gives the merged look | [SHOWN order; INFERRED effect] |
| 14 | posts-b §2.4: `Processing: Offset` = front shift; Critic addendum: = `indentFronts` | Confirmed. None removes exactly `Block.indentFronts` (ST-7) | [SHOWN + STATED] |
| 15 | README headline counts (128 labels / 46 classes / 6 map classes; fill = fillArea; Hip `run` = `drawRoof` 9 222; `addGables` 7 133; alley stroke 518 segs at 0.282) | All re-derived and confirmed | [SHOWN] |

### ST-11. Tooling (pointer only)

`drive.mjs` gained `--coverage <name>`, `--draw` and `--marker <regex>`. `analyze.mjs` lets `steps/` borrow
`session/network` for class attribution. The capture also ships `diff-executed-set.mjs` and `key-counts.tsv`. See
`profiler/README.md` and this capture's README.

**Hazard** (README, [SHOWN] there): `profiler/.profiles/mfcg` now holds this run's non-default style in localStorage.
Reset it before any default-style `session.mjs` run.

Analysis scripts for this addendum lived in the session scratchpad (`styles/`, not kept). The rules are in
"Reproduction" below.

### ST-12. What changes for a re-implementer

**Trees and forests.**
* Keep one precomputed blue-noise tile (MFCG: 140 points) and stamp it over each empty area (courtyards, gaps between
  fields). Test every point against the area polygon, and add a line mode for hedgerows.
* Store the positions in the model, per city.
* Build a small library of crown shapes once (MFCG: 20, by bloating a seed polygon), and pick one per tree at draw time.
  Make the pick deterministic if re-renders must match; MFCG's does not.
* Draw all outlines at 2t in one path, then fill every crown. Clusters then merge visually for free.
* Forests are the flood-filled free cells, inset, fractalised and smoothed into one fill, with trees along the edge that
  share the outline pass.
* Draw them after roads and wards and before walls. Skip them in block mode.

**Roofs.**
* Run a straight skeleton per footprint. MFCG averages about 17 `intersect` events per roof, so the pass scales with
  building count.
* Hip draws every skeleton edge as a hairline over the roof fill. Gable is a post-pass on the same skeleton that moves
  the ridge ends to the end walls. A roof whose gable pass fails is drawn plain, not hipped.
* With tints on, draw roof lines in lerp(dark, roof, 0.3).

**Alleys.**
* The reference draws a single t-wide hairline path under the wards and under the road cores, and only for the
  shanty-town sprawl. Intramural alleys remain negative space.
* Decide deliberately whether to draw core alleys; the reference's "two types of alleys" is still unexplained.

**Tints and palettes.**
* Compute one tint per district at creation, in HSV. Spectrum rotates hue at fixed S and V, Brightness scales V, and
  Overlay blends toward a random hue, all at a strength percentage.
* Recompute on palette change, not per render. Apply the tint to roofs only; derive outline colours by a 0.3 lerp toward
  dark.
* Weathering is an independent per-roof RGB scale of about ±10 % at 25.
* Keep colorWall, colorLabel and colorDark as separate roles: the building "raised" sides and the wall core use the wall
  colour. Do not trust the shipped default JSON's `tintMethod`; the app defaults to Spectrum.

**Display modes.**
* Lots draws lots edge to edge. Complex replaces each lot by a rectangle-composed building. Block draws one polygon per
  block and drops trees.
* Processing Offset is a per-block front-indent boolean pass; None skips it.

**Robustness.** Any exception in an attempt, including in geometry, restarts the city from the continued RNG stream.
Budget for it.

**CONFIRMED vs PLAUSIBLE.**
* CONFIRMED by executed counts, draw records and measured pixels: every count, identity and colour value above (the
  140 × tile identity; `spawnTrees` = wards; the crown library; `run` = `drawRoof` (+ Curved-mode ridges); `addGables`
  coverage; ridge-path op law; alley placement; tint identities and colour arithmetic; weathering spread; Complex/Block
  counts; `indentFronts` = Offset; the bad-poly restarts).
* PLAUSIBLE, from reasoning only:
  - the tile reading of `PoissonPattern.fill` and `fillLine` as hedgerows;
  - the crown-builder role of `Bloater`, and the seeded-stream re-pick;
  - the stroke-then-fill merge effect;
  - the forest pipeline order and ring count;
  - the skeleton-geometry reading of the ridge ops;
  - that the alleys layer covers only sprawl alleys rather than hiding core ones;
  - `Raised` as the under-polygon;
  - the Overlay blend model;
  - the owner of the fifth `spawnTrees`.

**Reproduction.**
* Counts: `steps/*.calls.json` keyed by label (bytes shown). "Never executed": maximum `ranges[0].count` per
  (functionName, start, length) over all 45 `coverage.json`.
* Draw: `rec.log` rows `[t, op, canvas, style, pathOps, lineWidth]`, with counters from `rec.fillStyles/strokeStyles/lineWidths/canvas2d`.
* Same-city pairs: toggle vs the preceding regen.
* Pixels: `abs(ΔR)+abs(ΔG)+abs(ΔB) > 20` diffs outside the Style window, components with 2-px gap tolerance.
* Colours: HSV from the hex fills. The lerp factor is `(stroke − dark)/(fill − dark)` per channel. The weathering ratio
  is roof R over the median R of its ward canvas.

## Fable review (2026-09-27) — B01

**Verdict: CONFIRMED** (`docs/fable-review/main/evidence-captures.md`, row B01). Every count of EG-1's accounting table was
re-derived from the twelve `coverage/gen-N.calls.json` files; the Lehmer chain reproduces (555001 → 2029853968 in 585 steps;
the canal retry 777001 → 2128702816 in 1 242 steps, inside EG-3's 1 239–1 248), so EG-7 row 8 stands and os-model §11 /
§14 / §15-8 are superseded. Three notes, none a correction of the text as written:
1. After the analyzer label fix of 2026-09-25 07:19 (`captures/README-labelfix-2026-09-25.md`), the citadel-signature
   member `Alleys.(anon@284885)` in EG-2's table reads `Castle.(anon@284885)` in re-analysed captures (it is the castle
   constructor's closure); this capture's `calls.json` was not re-analysed and keeps the old label.
2. EG-8 (1)'s auto-count fit "≈ 0.8·√size" holds for sizes 25–80 as stated; the 2026-09-25 size sweep
   (`captures/mfcg/exports-sweep-2026-09-25/README.md`) gives 12 gates at size 130 and 18 at 200 where the fit gives 9 and 11,
   and the design's gate law is fitted on walled area instead (`docs/ARCHITECTURE.md` §4.2 S3 (4)). The coded rule read on
   2026-09-27 counts mesh cells (`docs/AMENDMENTS-2026-09-27c.md` item 46).
3. The midpoint rule is exact in the exported geometry (`captures/mfcg/exports-2026-09-25/s555001-size40-gates*.json`):
   every city gate vertex lies 0.000–0.001 m from the chord midpoint of its two neighbours (chords 136–211 m), the castle
   gate 0.000 m; the pixel method's ± 1 px is superseded by exact coordinates.

## Fable review (2026-09-27) — B02

**Verdict: CONFIRMED** (`docs/fable-review/main/evidence-captures.md`, row B02). N0 / N1 / N4 / N9 counts re-derived
(`drawGate` N + 1; `drawTower` 33 − N; `weighted` N; `splitFace` 0/1/4/8; `aStar` 2N + 1; `Random.float` 38/43/69/113;
`Block.new` 92/155/130/106; `District.new` 5/5/9/11). From the exported rings: the non-gate city-wall vertices and the castle
ring are identical to 0.000 m across N = 0/1/4/9 and each gate vertex moved 1.2–14.1 m onto its chord, so EG2-3's tower
identity and EG2-4's invariant wall are exact. The JSON ring has 32 vertices of which four are castle-shared; EG2-3's
30-vertex chain with two shared vertices is the same chain without the castle's own two, and both give 33 − N. The 2N + 1
street/road split tagged INFERRED is the ancestor's arithmetic (`docs/CONFIDENCE.md` §0.2 #2).

## Fable review (2026-09-27) — B03

**Verdict: CONFIRMED** (`docs/fable-review/main/evidence-captures.md`, row B03). Re-derived from the 33 `steps/*.calls.json`:
`PoissonPattern.fill` = `Forester.fillArea` and `FillablePoly.validate` = 140 × `validateRect` in every trees step; Hip
`SkeletonBuilder.run` = `drawRoof` 9 222 in `019` and `run` = `drawRoof` + ridges in `020` / `022` (7 150 = 7 139 + 11;
3 736 = 3 727 + 9); `addGables` 7 133 of 7 139; the crown library `getTree` − `ArrayExtender.random` = 779 − 759 = 20 =
`getCrown` = `Bloater.bloat` in `014` and `getTree` = `random` in every later toggle; `Ward.getColor` = `Color.lerp` 83 in
`028` and `lerp` 92 = `getColor` 84 + `overlay` 8 in `034`; `Color.scale` 11 120 in `044`; `drawOutline` = `drawRoad` + 1
from `023`; `Block.createBuildings` 510 in `049`; `City.updateLots` 1 and `indentFronts` 0 in `054`. The executed-set
headline (128 new `com.watabou.*` labels in 46 classes, 19 classes wholly new) reproduces. ST-8's three `bad poly` restarts and
twelve canal restarts re-counted in `session/console.jsonl`; `docs/ARCHITECTURE.md` §5.1 (1) and §1.4 consume ST-8 as the
removed restart tier (D-9), and the 2026-09-27 code reading confirms the retry wraps all nine stages
(`docs/AMENDMENTS-2026-09-27c.md` item 51).
