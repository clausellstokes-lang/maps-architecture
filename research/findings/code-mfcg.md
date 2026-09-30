# code-mfcg — Medieval Fantasy City Generator, read from its compiled bundle

> READER-TIER — behind the implementer firewall (owner directive 2026-09-27); logic in our own words; no code or assets copied.

> PENDING FABLE REVIEW — class B (Opus reader lane code/mfcg; no Fable critic has checked it). Queue row B-code/mfcg in
> docs/FABLE-REVIEW-QUEUE.md. Fable retrovalidation should check the §0 overturns and the §6 corrections against the bundle
> before any of them is carried into docs/ARCHITECTURE.md, and the firewall (no code, no asset copied; identifiers citation-only).

**Lane:** code/mfcg (workflow 11, 2026-09-27). **Bundle read:** `captures/mfcg/2026-09-25T10-38-58/session/network/bodies/0002-40db3788.js`
(1 311 915 bytes; Haxe → closure-minified JavaScript; itch build 12710731, the same build every MFCG capture since 2026-09-21
used — the anonymous-closure byte offsets the profile quotes, e.g. `City.(anon@239186)`, land on the same closures in this file).
**Evidence grades:** [READ] seen in the bundle, class and method cited (all citations are to this one bundle); [INFERRED] our
reconstruction; [STATED] the author's words elsewhere. **CONFIRMED** = read on disk; **PLAUSIBLE** = reasoning only.
Reference identifiers appear only as citations (the design must never adopt them). Notation used throughout: *u* = one draw from
the global uniform stream; *m3* = the mean of three draws (a bell on [0,1] centred on ½); *t4* = the absolute value of (sum of four
draws ÷ 2 − 1) (a value on [0,1] peaked at 0); lengths are in the generator's internal units (**1 unit = 4 m**, §2.14).

STATUS: COMPLETE (all sections written; see §9 for what was read in full and what was only skimmed).

## §0 Headline findings — the ten things the code settles

1. **The whole nine-stage build is one retry unit.** `City` (constructor) loops *try `build()` / catch anything → trace
   "*** <message>" / try again* until an attempt succeeds; `build()` runs all nine stages (patches → junctions → domains → walls →
   streets → canals → wards → city towers → geometry) under `Stopwatch.measure`. The random stream is **not** reset between
   attempts, so a retry continues the stream. Seven distinct throw sites feed this loop: no river course, horizon under 6 edges,
   required water not touching the map edge, no gate candidates, no gates made, a citadel whose regularisation stalls
   ("Bad citadel shape!"), and a polygon the bisector cannot cut. [READ `City.new`, `City.build`] **Overturns** the profile's §3.1
   tree, which put `createWards`/`buildCityTowers`/`buildGeometry` outside the loop.
2. **Seeding is the 2017 spiral, unchanged, plus a bounding hexagon.** Exactly 8·size points (origin + 8·size−1 spiral points at
   radius 10 + k(2+u), angle base + 5√k), plus 6 points of a regular hexagon at twice the spiral's radius; the recorded
   "8·size + 4" is the Delaunay seed test (n − 2 calls); the recorded triangle count 2n − 2 − 6 confirms n = 8·size + 6 with the
   hexagon as hull. Voronoi regions with any vertex beyond the spiral radius are dropped; the city is the **size + 1 land cells
   nearest the centre**. [READ `City.buildPatches`, `Delaunator.update`] Settles profile §4.1's "+4" and hypothesis table row 1.
3. **Randomness is one Lehmer stream with two isolation devices** (§4): a single save slot that makes *optional* features
   stream-neutral (plaza shape, coast shape, the whole wall stage, the whole canal stage run between save and restore), and a
   **per-cell seed** drawn when each mesh cell is created, which every ward's geometry re-seeds from (`WardGroup`, `Castle`,
   `Cathedral`, `Market`, `Farm`). Local rerolls and mesh warps therefore regenerate only what they touch. The next Enter seed is
   the raw stream state after the last ward's geometry **and after render-time draws** (roofs, weathering, trees, compass,
   label-skeleton jitter), so the Enter chain depends on display settings; the Enter size is drawn with the unseeded browser
   random inside the current size band. [READ `Random`, `Cell.new`, `WardGroup.createGeometry`, `ViewScene.buildNew`,
   `BuildingPainter.drawRoof`]
4. **Districts are grown, and their count is ~√(city cells).** Seeds are the features (castle gate, plaza or centre, each park,
   each city gate, each bridge, two random bank cells per river, the first dock cell) plus as many random cells; a random subset
   of ⌊√cells⌋ is kept (padded with random cells if short). Growth is round-robin in shuffled order; each grower skips a turn with
   probability 1 − rate (castle, gate, bridge 0.1; bank 0.5; others 1), collects every unassigned neighbour across each boundary
   edge with probability = cell compatibility × edge permeability (walls and canals 0, roads 0.9, else 1; dock and non-dock cells
   never mix), and absorbs one at random. Leftover cells seed new districts. [READ `DistrictBuilder.build/growAll/getType`,
   `Grower.grow/validatePatch/validateEdge`] Settles confidence unknown #2 and the growth half of B9.
5. **The 2017 chaos parameters survive, per district, and drive a fully specified bent bisection.** Each district draws
   minSq 15–55, gridChaos 0.2–1.0, sizeChaos 0.4–1.0, blockSize 4–14, shapeFactor 0.25–2.25, inset 0–0.6, greenery.
   The bisector's rule (§2.11.3): cut across the long side of the oriented box at the average of the centroid's position and a
   bell draw; start on the crossed edge most parallel to that side; run **perpendicular to that edge**; if the far edge is met
   within ~5.7° of square, cut straight, otherwise **bend** at a random fraction (kept at least √minArea from both ends) and drop a
   **perpendicular foot** onto the best-facing visible edge; accept only if the two areas differ by less than 2×variance, else
   retry in frames rotated by 36° (≤10 retries). Blocks: target minSq×blockSize, variance 16×gridChaos, 1.2-unit alleys cut as
   boolean stripes, bends sometimes rounded into arcs. Lots: target minSq, variance max(4×sizeChaos, 1.2), no gap, shallow bends
   straightened. [READ `District.createParams`, `Bisector.*`, `WardGroup.createAlleys/semiSmooth`, `TwistedBlock.createLots`]
   Settles critic C13 (both readings were half right) and confidence unknown #1 except the author's intent behind the constants.
6. **Lots, frontage and outskirts are rule-based, not ad hoc.** A lot survives only with ≥4 corners, area ≥ minSq/4, both box sides
   ≥ 1.2 and ≥ 50 % box fill; lots touching no block edge become the courtyard (trees). The default "Offset" processing clips
   each lot by the block outline shifted inward by up to min(√area/3, 1.2)·u (applied only when ≥ 0.5) — uneven façades, not a
   uniform setback. Outside the walls a lot survives with a probability interpolated over the ward group's triangulation from
   vertex weights 1 (inner vertex), 0.5 (wall), 0.3 (road), 0.1 (canal), 0 (else), sharpened by group size. [READ `TwistedBlock`,
   `Block.filterInner/indentFronts`, `WardGroup.filter/interpolate`] Settles B11/B12 mechanisms.
7. **Gates, walls and towers have exact rules.** Gate candidates are wall vertices touching ≥2 inner cells and not on the water
   edge or citadel; the count is the URL's N, or every vertex ("hub" = Maximum), or **2 + ⌊inner cells/12 × (0.75 with a coast)⌋**;
   picks are weighted, each pick zeroing its neighbours and multiplying every other weight by (cyclic distance − 1); the outside
   cell in front of a gate is split so a mesh edge leaves the gate as directly outward as that cell allows; the gate vertex is moved to its neighbours'
   midpoint. The city wall is the inner cells' outline smoothed by 3 Laplacian passes with water and citadel vertices pinned.
   `buildCityTowers` (the "always 0 ms" stage) switches off wall segments along the coast and against the citadel and places the
   towers. [READ `CurtainWall.*`, `City.buildCityTowers`] Overturns the ≈0.8·√size gate fit and the 2017 smoothing factor.
8. **The citadel repair is a mesh warp plus a regular-polygon projection.** "Bloat": while the citadel's nearest vertex is < 10
   units from its centroid, every mesh vertex within 2·max(15, far radius) is pushed radially by (d/k)^−¼. "Equalize": with the
   castle gate pinned, move each vertex 20 % toward the best-fitting regular polygon (its first Fourier component) while
   compactness < 0.75; if one pass gains < 0.001 the attempt throws and the city restarts. [READ `Castle.adjustShape/equalize`]
   Both earlier readings (angles vs edge lengths) were halves of this.
9. **Streets are breadth-first, rivers are one constant-width channel.** The street search named "aStar" is a FIFO
   label-correcting search with no heuristic and no priority, over unlabelled mesh edges, from each gate to the plaza's nearest
   vertex (or the centre); roads leave each city gate for the map-edge vertex most aligned with the gate direction; arteries are
   smoothed by **moving the shared mesh vertices** (2 passes, gates pinned). The river: coastless = random edge vertex → a
   neighbour of the centre → the most opposite edge vertex; coastal = the shore vertex nearest the centre → the edge vertex most
   straight inland; valid if ≥ 1/5 of the land-boundary vertex count long, touching the shore only at its mouth, and crossing
   walls and streets transversally; one try per candidate (hence the recorded 35–41 discards before failure); width
   (3 + inner cells/5)·(0.8–1.2)·(1.5 when no course vertex borders an inner cell) for the whole course. [READ `Graph.aStar`, `City.buildStreets`,
   `Canal.*`] Overturns "per-node width", "priority open set unknown" and "a 40–50 try cap".
10. **Scale, exports and population are fixed facts.** 1 internal unit = 4 m (`UnitSystem`; the JSON export multiplies by 4):
    roads 8 m, alleys 4.8 m, wall thickness 7.6 m, drawn tower radius 7.6 m on the city wall and 10 m on the castle wall (the
    buildable-area reserve uses 10 m for every tower). The JSON export is a GeoJSON feature collection (§2.14); the SVG export
    converts the display list; `export=json|png|svg` in the URL triggers an export on load. The displayed population is
    **6 × lot count, rounded up to two significant figures** — which reproduces "856 → ~5200" and "3423 → ~21000" exactly and
    overturns critic C1's constant in [6.12, 6.13). [READ `TownInfo.update`, `JsonExporter.export`, `ViewScene.activate`]

**Profile claims the code overturns (details in §6):** retry-loop boundary (§3.1); where farms, shanty towns and district growth
run (§3.1/§4.7/§4.9: farms and shanty towns end `createWards`, districts are built inside `buildGeometry`); the third topology
(§4.5: it is the outside-road graph); street search internals (§4.5, §12.2); variable-width river (§4.6); the canal try cap
(§4.6); `buildCityTowers` as free-standing towers (§4.8); wall smoothing and gate count (§4.4, EG-series fit); equalize semantics
(§4.4b, critic C5); `Bisector` as "OBB-only" and `indentFronts` as a uniform setback (§4.9); `Building` as landmarks only (§4.9:
it also makes farmhouses, and every house in Complex mode); `PoissonPattern` "warp" as a domain warp (§6.1, critic C2: it is a
torus wrap for a tileable pattern) and its consumer (it is the tree scatter); naming as "Tracery + 4 Markov corpora" (§0 #9: the
four Markov models are built but this grammar never calls them); the `farms` URL key (§2: the blueprint neither reads nor writes
it); population constant (critic C1); buildings as "footprint + offset roof" (§0 #7: the offset is the *Raised* elevation, the roof
is the straight-skeleton line work, and roofs are off by default).

## §1 Class map by package

Counts from the class-marker map (`classes.tsv`, §9): **232 `com.watabou.*` entries** = 228 classes/interfaces + 4 enums, in
nine top-level packages. The brief's "105 classes" for `com.watabou.mfcg` undercounted: three markers are split by a line break
in the minified text (`ToolForm`, `Marker`, `ScaleBarOverlay`); the true figure is **108 classes + 3 enums**.

**Entry point and call order.** Page boot runs static initialisers with the stream at seed 1 (the tree pattern and its noise mask
are built here) → `Main` (constructor): clock-seed the stream, load stored settings (first-run defaults from `Values.prepare`),
restore the palette, read the blueprint from the URL or make a size-25 one from the clock seed, **construct `City` (the whole
generation)**, then start the view scene → `ViewScene`/`TownScene` build overlays and `FormalMap` (all drawing, including the
render-time random draws of §4). Regeneration: Enter → `ViewScene.buildNew`; Generate window → `GenerateForm.build/rebuild`;
permalink → `URLForm.generate`; per-cell reroll → `Cell.reroll`; warp tools → `WarpScene.submit` → `City.updateGeometry`.

### §1.1 `com.watabou.mfcg` (root)
| class | role |
|---|---|
| `Main` | application entry: seeds the stream from the clock, loads settings and palette, builds the first city, starts the view scene |
| `Values` | first-run setting defaults and the option lists (display modes, roof styles, tower shapes, field modes, label modes) |
| `Buffer` | clipboard write for the permalink |

### §1.2 `com.watabou.mfcg.model` (the generator) — 16 classes + 2 enums
| class | role |
|---|---|
| `City` | the model and the pipeline: retry loop, nine stages, harbours, farms, shanty towns, city towers, ocean outline, edits, landmarks, counts |
| `Blueprint` | the parameter set: URL read/write, random-mode feature draws, "similar" rebuild |
| `Cell` | one mesh face with its flags (in city, in walls, water, landing), its ward, district and **own seed**; reroll |
| `Edge` (enum) | edge labels HORIZON, COAST, ROAD, WALL, CANAL — the permeability vocabulary of every later stage |
| `DistrictType` (enum) | CENTER, CASTLE, DOCKS, BRIDGE, GATE, BANK, PARK, SPRAWL, REGULAR |
| `District` | a grown set of cells: per-district subdivision parameters, ward groups, border, label ridge, tint |
| `DistrictBuilder` | district seeding, round-robin growth, leftovers, spatial ordering, colours |
| `Grower`, `DocksGrower`, `ParkGrower` | growth rates and cell/edge admissibility for district growth |
| `CurtainWall` | a wall ring: gate selection and outside-cell splitting, castle gate, towers, segments, watergates, tower radii |
| `Canal` | the river: search graph, coastless and coastal course search, validation, crossing test, width, bridges, watergates |
| `Topology` | a search graph over unlabelled mesh edges of a cell set, with point and polyline exclusion |
| `Building` | footprint plans on a grid inside a quad: random polyomino, full-front, mirrored; outline union |
| `Landmark` | a user pin stored in barycentric coordinates of a cell fan so it follows mesh warps |
| `Forester` | tree scatter: tiled blue-noise pattern masked by fractal noise; points along lines |
| `UnitSystem` | metric/imperial units; 1 internal unit = 4 m; scale-bar tick choice |
| `ModelDispatcher` | model change signals (new model, title, geometry, districts, landmarks, units) |

### §1.3 `com.watabou.mfcg.model.wards` — 11 classes
| class | role |
|---|---|
| `Ward` | base: cell link, buildable-area inset rules per edge label and per vertex (towers, canal points) |
| `Alleys` | any built-up cell; only the group's core cell builds; context menu "Open in Dwellings" |
| `WardGroup` | 1..~7 adjacent built-up cells merged into one polygon: blocks, alleys, church, outskirts thinning |
| `Castle` | citadel: its wall, bloat and equalize repair, keep footprint |
| `Cathedral` | temple: one mirrored footprint in the largest inscribed rectangle |
| `Market` | plaza: open space plus a statue or a well/fountain |
| `Farm` | fields: recursive split with 2-unit paths, rounded corners, furrows, farmhouses, hedgerow trees |
| `Harbour` | a water cell next to docks: piers |
| `Park` | green: rounded available area, trees by district greenery |
| `Wilderness` | empty land (forests are drawn from these by the renderer) |
| `Mansion` (+ `_Mansion.Rect`) | bridge to the Dwellings generator: rasterise a footprint to a ≤11×11 grid and open it with a seed |

### §1.4 `com.watabou.mfcg.model.blocks` — 2 classes
| `Block` | a block: lots, courtyard, Offset clipping, rectangles (Simple mode), footprints (Complex mode), courtyard trees |
|---|---|
| `TwistedBlock` | lot subdivision of a block with the bisector and the lot filter |

### §1.5 `com.watabou.mfcg.utils` — 6 classes
| `Bisector` | the recursive bent bisection (both levels) |
|---|---|
| `PolyUtils` | Laplacian smoothing (closed/open, pinned points), stripe-subtraction inset, area-preserving simplify, Visvalingam, resample, fractalize |
| `Cutter` | bilinear grid of a quad with jittered lines |
| `PathTracker` | arc-length walker along a polyline |
| `Bloater` | recursive edge bulging (tree crown outlines) |
| `GraphicsUtils` | largest drawn area (export sizing) |

### §1.6 `com.watabou.mfcg.mapping` — 11 classes (all drawing)
| `FormalMap` | assembles the map in layer order: water, roads, rivers, cells, trees, walls, focus outline |
|---|---|
| `Style` | palette roles, stroke widths, district tint methods, weathering |
| `PatchView` | per-cell drawing by ward type and display mode |
| `BuildingPainter` | footprints, Raised elevation faces, weathering, skeleton roof lines, solids |
| `RoadsView` | casing + core roads, outside-city smoothing, alleys layer, market fill |
| `WallsView` | wall segments, gaps, towers (round/square/open), gatehouses |
| `RiverView` | the channel, footbridges and road bridges, the flared mouth |
| `FarmPainter` | furrows or plain fields, farm buildings |
| `TreesLayer` | tree crowns (a 20-shape cache), forests from Wilderness cells |
| `Focus`, `FocusView` | district zoom subset and its dashed outline |

### §1.7 `com.watabou.mfcg.scenes` (3), `.tools` (9), `.overlays` (20 + `_Legend` 6 + `_CurvedLabel` 1 + `Marker` + `ScaleBarOverlay`; 1 enum `Position`)
| class | role |
|---|---|
| `TownScene` | map scale, overlays, map recreation, palette presets, district zoom |
| `ViewScene` | keys, clicks (reroll, zoom), context menu, Enter = new city, URL-triggered export |
| `WarpScene` | mesh editing mode: vertex→cells index, snapshot for discard, tool dispatch, submit → regenerate geometry |
| `WarpTool` + `Displace`, `Rotate`, `Liquify`, `Relax`, `Bloat`, `Pinch`, `Measure`, `Equalize` tools | brush-based vertex edits (§2.13) |
| `Overlay` | base overlay (margin 10) |
| `LabelsOverlay`, `CurvedLabel`, `_CurvedLabel.Letter` | district labels set letter by letter along the ridge |
| `Legend`, `LegendOverlay`, `_Legend.{Legendary, LegendItem, TitleView, SeparatorView, ScaleBarView, EmblemView}` | legend box: auto-placed in the least busy corner |
| `PinsOverlay`, `Pin` | numbered district pins (legend mode) |
| `MarkersOverlay`, `Marker` | lettered landmark markers, draggable |
| `ScaleBar`, `ScaleBarOld`, `ScaleBarNew`, `ScaleBarOverlay` | scale bars (two styles) |
| `Compass`, `CompassOverlay` | a procedurally styled compass rose (its style draws from the main stream once per page) |
| `Emblem`, `EmblemOverlay` | coat of arms from the external Armoria service |
| `Title`, `TitleOverlay`, `Frame`, `GridOverlay`, `Position` (enum) | title, frame, grid, corner positions |

### §1.8 `com.watabou.mfcg.ui` (4) and `.ui.forms` (8)
`Text` (font roles and sizes), `Outline` (bitmap halo), `Tooltip`, `EditInPlace`; `GenerateForm` (features, gates mode, size
buttons), `TownForm` (name, counts, POIs, warp, overworld link, permalink, export), `StyleForm` (all display options), `TownInfo`
(buildings and population), `URLForm` (permalink), `EmblemForm`, `MarkerForm`, `ToolForm` (window persistence).

### §1.9 `com.watabou.mfcg.linguistics`, `.annotations`, `.export`
`Namer` (grammar setup, city and district naming, direction words, the merge rule); `Equator` (straight label chord), `Ridge`
(skeleton label path); `Export` (PNG/SVG/JSON entry), `JsonExporter` (GeoJSON writer), `SvgExporter` (display list → SVG).

### §1.10 `com.watabou.geom` (20) and `.geom.polygons` (7), with private helpers `_SkeletonBuilder.{Node,Segment}`, `_Triangulation.Node`
`Delaunator` (sweep-hull Delaunay + Voronoi regions), `DCEL`/`HalfEdge`/`Face`/`Vertex`/`EdgeChain` (half-edge mesh and chain
helpers), `Graph`/`Node` (search graph), `SkeletonBuilder`/`Rib` (edge-event straight skeleton, gables), `Triangulation` (ear
clipping), `PoissonPattern`/`FillablePoly`/`IFillableShape` (tileable blue noise and filling), `Chaikin`, `Cubic`, `Circle`,
`Color` (HSV), `Segment`, `GeomUtils` (line intersection, lerp, collinearity, barycentric); `PolyCore` (area, centroid,
compactness, one-step simplify), `PolyBounds` (boxes, OBB, convex hull, largest inscribed rectangle, point-in-polygon), `PolyCut`
(line cut, peel, shrink), `PolyBool` (single-loop intersection/subtraction), `PolyCreate` (rect, regular, stripe), `PolyTransform`,
`PolyAccess`.

### §1.11 `com.watabou.utils` (15 + 1 enum + `_Updater` 2), `nlp` (2), `tracery` (10), `system` (3), `formats` (4), `processes` (2), `coogee` (52)
`Random` (the stream), `Noise`/`Perlin` (fractal gradient noise), `ArrayExtender` (random pick/shuffle/weighted and set helpers),
`Palette` (typed colour-scheme bag), `ColorNames` (nearest named colour, used by the palette editor), `PointExtender`,
`MathUtils`, `SetUtils`, `Stopwatch`, `StringUtils`, `GraphicsExtender`, `DisplayObjectExtender`, `Updater` and its dispatchers,
`ParamType` (enum); `Markov` (phoneme-cluster chain of order 2), `Syllables` (syllable splitter); `Tracery`, `Grammar`,
`RuleSet`, `Symbol`, `ExtSymbol`, `RuleSelector`, `DeckRuleSelector`, `TraceryNode`, `NodeAction`, `ModsEngBasic` (an extended
Tracery with flag- and probability-guarded rules); `State` (local settings store), `URLState` (query string), `Exporter` (file
save); `GeoJSON`, `SVG`, `SVGPath`, `Sprite2SVG`; `Process`, `Tweener`; `coogee` = the author's UI framework (game/scene loop,
views, menus, dialogs, forms, layouts, widgets) — no generation logic and no random draws (grep-verified).

## §2 The pipeline as coded

### §2.0 Control, parameters and the retry loop [READ `Main.new`, `Blueprint.*`, `City.new`, `City.build`]

* **Parameters.** The blueprint carries size, seed, name, population override, the flags citadel, urban castle ("inner"),
  plaza, temple, walls, shanty town, river, coast, greens, "hub", a gate count (−1 = automatic), the sea direction, and optional
  export and palette-asset requests. From a URL: missing flags default to citadel/plaza/temple/walls/coast **on** and urban
  castle/shanty/river/greens/hub **off**; a missing sea direction is 0. A URL with size 0 or seed 0 is ignored. Written back after
  every generation in a fixed key order; "hub" replaces the gate count when set; the sea direction is written only with a coast.
  **There is no `farms` key** anywhere in the blueprint (only a dead first-run default in `Values`). CONFIRMED.
* **Random mode** (the Generate window's "Random", on by default): eight draws from the live stream, in this order, decide
  walls (u < (size+30)/80), shanty town (u < size/80), citadel (u < ½ + size/100), urban castle (u < size/(size+30) with walls,
  else ½), plaza (u < 0.9), temple (u < size/18), river (u < ⅔), coast (u < ½). Greens is never randomised. With random mode off
  the flags come from the stored settings.
* **Sizes.** The Generate window's buttons draw a size from the main stream: Small 10–19, Medium 20–39, Large 40–79; a typed size
  must be 5–200. The model keeps three size bands (small 10–20, medium 20–40, large 40–80); after reading a size inside a band
  it picks the **next** Enter's size uniformly in that band with the browser's unseeded random. A size of −1 means "use that
  next size".
* **Retry loop.** If the seed is positive the stream is reset to it; then *attempt = build()* repeats until no exception escapes.
  Each attempt traces "-->> seed:<current stream state> size:<n>", so the printed seed of a retry is the stream state reached by
  the failed attempt. After success the URL is rewritten and the new-model signal fires. `build()` clears streets, roads, walls,
  landmarks and the compass north, runs the nine stages in order under the stopwatch (source lines 183–191), then recomputes
  the bounds from every block and the castle wall.
* **Derived limits.** Maximum dock cells = ⌊√(size/2)⌋ + (2 with a river).

### §2.1 Patches (`City.buildPatches`)

1. A base angle = 2π·u. Points: the origin, then for k = 1 … 8·size−1 a point at radius 10 + k·(2 + u) and angle base + 5·√k
   (the 2017 constants, untouched). The largest radius reached is kept as the **spiral radius R**.
2. **Plaza shaping** (plaza on; inside a save/restore, so it does not shift the stream): f = 8 + 8u, g = f·(1+u); R grows to
   at least g; points 1–4 are replaced by a rhombus around the centre — radius f on the base angle and its opposite, g on the
   two perpendiculars — so the central cell is bounded by the four perpendicular bisectors and comes out as a roughly
   f × g rectangle turned to the base angle (8–16 by 8–32 units).
3. Delaunay of the points plus a **regular hexagon of radius 2R** (the "+6"; the Delaunay seed test then makes the 8·size + 4
   calls the profile counted). Voronoi regions are built by walking the triangles around each point; circumcentres are shared
   point objects, so neighbouring regions share vertices exactly.
4. Every region with any vertex farther than R from the origin is dropped; the rest become the faces of a half-edge mesh; each
   face becomes a cell (which **draws its own seed** here — one draw per cell, in face order); cells are sorted by the squared
   distance of their centroid from the origin.
5. **Coast** (inside a save/restore): a 6-octave fractal noise; an offset f = 20 + 40u; a lateral shift k = 0.3·R·(2·m3 − 1);
   a sea radius n = R·(0.2 + t4); the sea direction, if not given, is ⌊20u⌋/10 (0.0–1.9, in
   units of π). Each cell centroid is rotated by the sea angle; the sea is a disc of radius n centred n + f out along the sea
   direction (shifted k sideways), extended outward as a strip of half-width n beyond its centre; a cell is water when its signed
   distance to that shape plus noise·n·√(|p|/R) is negative. The shoreline therefore starts 20–60 units from the centre, and the
   noise amplitude grows with distance from the centre (a clean near shore, a ragged far shore).
6. **The city**: walk the sorted cells, skip water, and mark the first size + 1 land cells as within the city (and within walls
   when walls are on). The **centre** is the vertex of the nearest cell closest to the origin.
7. Plaza on → the nearest cell becomes a Market ward. Citadel on → urban castle: a random inner cell (not the plaza) all of whose
   vertex-neighbours are city or water; if none, it traces an "unable to build the urban castle" warning (misspelt in the source, `City.hx:332`) and falls back; non-urban → the
   **farthest** inner cell (so a non-urban castle sits on the edge of the city). The citadel leaves the inner list but stays
   within city and walls.

### §2.2 Junctions (`City.optimizeJunctions`)
Repeat until nothing changes: for each face with more than 4 vertices, the threshold is max(7.5, ⅓ of the face's mean edge
length) (7.5 = 3 × the large tower radius); collapse the first edge shorter than that, unless it is a map-edge edge, its other
face has ≤ 4 vertices, or it straddles the citadel outline (one end on it, one off). A collapse merges the two vertices at their
midpoint and restarts the scan. If the centre vertex vanished, pick it again. So cells never drop below four corners, and short
edges are judged against their own cell's scale. CONFIRMED.

### §2.3 Domains (`City.buildDomains`)
The map edge ("horizon") is the outline of all faces, walked from the first boundary half-edge in the edge list (the kept
regions form a disc without holes); fewer than 6 edges throws. With a
coast: faces split into land and water; the **largest connected land component** is the "earth", the **largest water
component** is the sea; if no sea edge reaches the map edge the attempt throws (a "required water does not reach the horizon" error). The
sea outline is smoothed by 1–3 Laplacian passes (a main-stream draw) and **written back into the mesh vertices**. The shore is
the single contiguous run of earth edges that face water, labelled COAST. Without a coast, earth = horizon and the shore is empty.
Other land components (islands) and small lakes stay ordinary cells. This answers profile open question 4: a domain is simply
"the land mass and the sea", used for the shore, harbours, wall reservations and the river's mouth.

### §2.4 Walls and gates (`City.buildWalls`, `CurtainWall`, `Castle` — the whole stage inside a save/restore)
* **Reserved vertices** = the sea outline (+ the citadel's outline). The **border** ring is built around the inner cells even
  when walls are off (it supplies the gates for streets); with walls on it is labelled WALL and **smoothed by 3 Laplacian passes
  with the reserved vertices pinned**, written into the mesh.
* **City gates** (`buildCityGates`): candidate weight 1 for ring vertices touching ≥ 2 inner cells and not reserved, else 0; none
  → trace the counts and throw. Count = explicit N (≥ 0), else every vertex when "hub" (the UI's "Maximum"), else
  2 + ⌊(inner cells ÷ 12) × (0.75 if there is a coast, else 1)⌋. Loop while fewer than the count and some weight remains:
  weighted pick; with walls on, if exactly one outside cell touches the gate, split that cell from the gate to its own vertex
  that lies most along the gate's outward bulge (two new cells, each drawing a fresh seed; edges facing the wall re-labelled WALL);
  then zero the weights of the pick and its ring neighbours and multiply every other weight by (cyclic index distance − 1). No
  gate made when one was required → throw. With walls on, every gate vertex is moved to the midpoint of its ring neighbours.
  **Check against the recordings** (profile EG-1…EG2): the count law reproduces all seven recorded automatic counts — size 25 →
  4 (coastless), 26 → 3, 39 → 4, 51 → 5, 80 → 7/7/7 (all with a coast) — where the ≈ 0.8·√size fit was only approximate; the
  stored setting (not the previous blueprint) supplies the gate mode on Enter, which is why Enter "forgets" an explicit count.
  CONFIRMED (formula read; match computed from the profile's counts and flags).
* **Castle** (`Castle.new`): its reserved vertices are those touching any cell outside the city; its own ring always counts as a
  wall. Castle gate: split the edge facing the plaza if there is one; otherwise use the unreserved vertex nearest the origin
  (moved to its neighbours' midpoint); if every vertex is reserved, split the city-facing edge whose midpoint is nearest the
  origin (if no edge faces the city either, a "no suitable edge" trace and the shortest edge's origin). Then the repair (§0 #8):
  **Bloat** while min vertex distance from the centroid < 10: every mesh vertex within k = 2·max(15, max distance) moves to
  centroid + offset·(d/k)^−0.25 ("Bloating the citadel...", `Castle.hx:60`). **Equalize** while compactness 4πA/P² < 0.75: trace
  the value ("Equalizing...", `Castle.hx:84`), compute the polygon's first Fourier coefficient about the centroid, move every
  non-pinned vertex 20 % toward its place on that best-fit regular polygon (pinned: the gate, plus the two neighbours when the gate
  is a split midpoint); if compactness rose by < 0.001, throw "Bad citadel shape!". The castle wall's towers are built, and the
  castle gate joins the gate list.
* **Towers** (`buildTowers`): every ring vertex that is not a gate and has an active segment on either side; where a tower meets
  two COAST edges a coast-end record is kept for drawing. **Radii:** tower 2.5 for insets (drawn 1.9 on the city wall, 2.5 on the
  castle), gate 1 + 2×1.9 = 4.8 for insets, wall thickness 1.9.

### §2.5 Streets and roads (`City.buildStreets`, `City.tidyUpRoads`)
1. Two search graphs (`Topology`): **streets** over cells within the city, **roads** over land cells outside it (the canal builds
   a third). Links are only the half-edges **without a label** (so no street runs along a wall, coast or map edge); a boundary
   edge of the cell set is traversable only in its inner face's direction. Shore vertices and every wall vertex except gates are
   cut out of both graphs.
2. For every gate (city gates first, then the castle gate): target = the plaza vertex nearest the gate, or the centre; search the
   street graph from gate to target (`Graph.aStar`, §3.3: FIFO, no heuristic). Success → a street chain. Failure → trace
   "Unable to build a street!" (`City.hx:591`) and continue (non-fatal).
3. For a **city** gate that is also on the road graph: candidate far ends are the land-edge vertices (earth outline minus shore)
   present in the road graph, tried in order of how far they lie along the gate's direction from the centre; the first that
   connects becomes a **road**, and its edges are removed from the road graph so later roads cannot run along it (they may cross
   it). If no road can be built and there is a wall, the outside cells at the gate that touch the shore become **landing** cells
   within the city (a waterfront suburb, each an Alleys ward, spending the dock budget).
4. **Tidy-up** collects the distinct half-edges of all streets and roads and greedily chains them into **arteries** by matching
   endpoints (no de-duplication beyond the set union, no plaza trimming as in 2017).
5. Every artery is labelled ROAD and smoothed by two open Laplacian passes (gates pinned when walls exist), **written back into
   the mesh** — which is why block edges follow smooth streets.

### §2.6 The river (`City.buildCanals` inside a save/restore; `Canal`)
* **Search graph** (built once per mesh): all land cells' unlabelled edges, minus wall edges, minus the castle ring's vertices,
  minus the gates, minus every artery's edges (it may cross them).
* **Coastless course** (`regularRiver`): candidates = map-edge vertices touching > 1 cell. Repeat while ≥ 2 remain: source =
  random candidate; far end = the candidate most opposite it (minimum dot product with the source direction); via = a random
  neighbour of the centre vertex; search far end → via and via → source, splice at their first common vertex (cutting the loop),
  validate; on failure trace "discard" (`Canal.hx:216`) and remove both ends from the candidates.
* **Coastal course** (`deltaRiver`): mouth candidates = interior shore vertices touching > 1 land cell, **sorted nearest to the
  centre first**; for each, the source is the land-edge vertex lying most along the shore's inward normal at that mouth; search,
  validate, else "discard" (`Canal.hx:268`). The try budget is the candidate list itself — at size 80 the shore has ~35–41 such
  vertices, which is exactly the recorded discard count before "Unable to build a canal!" (PLAUSIBLE identity; the loop is READ).
* **Validation**: length ≥ (earth outline vertex count ÷ 5) edges; no interior vertex on the shore; at every interior vertex shared
  with a wall or an artery the course must **cross** it (a rotational order test around the shared vertex), not touch or run along.
* **Shaping** (`Canal.new`): with a coast, the mouth vertex moves halfway up the first edge and its two shore neighbours are pulled
  toward it (an estuary notch); one open smoothing pass is written into the mesh; where the course crosses the wall the vertex is
  pulled halfway toward the intersection of the local course chord and wall chord (a square crossing). Edges labelled CANAL.
* **State** (`Canal.updateState`, run at the start of `buildGeometry`): watergates at every interior course vertex on the wall
  (the tower there is removed); bridges wherever an artery starts on or crosses the course; bridge-site candidates = course
  vertices from the third to the second-last whose side cells are inner; "rural" = no candidates; **width** = (3 + inner cells/5)
  × (0.8 + 0.4u) × (1.5 if rural) — one number for the whole river; extra **footbridges** are added while u < 1 − 2·(bridges ÷
  candidates), each at a candidate weighted by 1/(vertex degree).

### §2.7 Wards (`City.createWards`, `City.buildShantyTowns`, `City.buildFarms`, `City.addHarbour`)
In this order: (1) **Parks** (greens on): if the castle gate vertex has exactly three cells, with probability 1 − 2/(size−1) the
unwarded ones become parks (an esplanade); then ⌊(size−10)/20⌋ + (1 with the fractional probability) − (already placed) random
unwarded inner cells become parks. (2) **Docks**: inner cells in distance order that border the shore become landings until the
dock budget runs out. (3) **Temple**: the unwarded inner cell whose vertex-average is nearest the origin becomes the Cathedral.
(4) Every other inner cell becomes **Alleys**. (5) With a wall, each gate, with probability 1 − 1/(size − 5), turns its unwarded
outside cells into within-city Alleys (**gate suburbs**; shore ones may become landings). (6) **Shanty town** (flag on): score
d(p) = min(3·|p − centre|, 2·distance to any road vertex, distance to any shore vertex, distance to any river vertex)²;
candidates are non-city, non-water, non-map-edge neighbours of city cells that touch > 1 city cell, weighted k²/d (k = number of
city neighbours, weight fixed when first added); about size·(1 + u³)/2 cells (rounded up) are picked by weighted draw, each becoming a
within-city Alleys (maybe a landing) and adding its own neighbours as candidates. (7) **Landing gaps**: a city cell at a shore
vertex whose two shore-side neighbours are landings becomes a landing. (8) **Harbours**: every unwarded **water** cell next to a
landing becomes a Harbour ward (piers). (9) **Farms**: lobes a = 2·m3, b = m3 and two random phases; R_city = the farthest inner
vertex from the centre; every unwarded cell: water → plain ward; shore → Wilderness; otherwise Farm if its distance from the
centre is below (1 + a·sin(θ + φ₁) + b·sin(2θ + φ₂))·R_city, else Wilderness. Farms are therefore always generated; the "Farm
fields" display option only changes their drawing.

### §2.8 City towers (`City.buildCityTowers`)
With a wall: switch off every wall segment whose edge is COAST or whose outside face is the citadel, then build the towers and
remove any tower shared with the castle. That is the whole stage (hence 0 ms). CONFIRMED.

### §2.9 Geometry (`City.buildGeometry`)
River state (§2.6) → naming reset → city name (the blueprint's, else the grammar's) → **districts** (`DistrictBuilder.build`,
§2.10) → district names → every cell's `createGeometry` in cell order (§2.11). Because each geometry routine re-seeds the stream
from its cell, the stream state after this stage is whatever the last randomised ward left.

### §2.10 Districts (`DistrictBuilder`, `Grower`, `District`)
* **Seeding** (§0 #4): the list order is castle, centre, parks, gates, bridges, banks, docks, then as many random city cells as
  there were feature seeds; a shuffled subset of ⌊√(city cells)⌋ is kept, padded with random cells; if several dock seeds survive
  only one random one is kept. Patch seeds make a one-cell district if the cell is free; vertex seeds (castle gate, gates, bridges,
  a plaza-less centre) take all free city cells around the vertex, and fail if any of them is already taken.
* **Types** (`getType`): castle cell → CASTLE; park → PARK; landing Alleys → DOCKS; inner → REGULAR; any other city cell (gate
  suburbs, shanties) → **SPRAWL**. Feature seeds carry their own type (CENTER, GATE, BRIDGE, BANK).
* **Growth** (§0 #4) then leftovers; then each district computes its border, builds ward groups, and the list is **ordered**:
  the district containing the first cell first, then repeatedly the nearest remaining district (by label-chord midpoint),
  jumping back to the one nearest the centre when that is closer than the nearest neighbour. Tints follow that order (§2.12).
* **Per-district parameters** (`createParams`, drawn in this order at creation): minSq = 15 + 40·t4; gridChaos = 0.2 + 0.8·m3;
  sizeChaos = 0.4 + 0.6·m3; shapeFactor = 0.25 + 2·m3; inset = 0.6·(1 − t4); blockSize = 4 + 10·m3; minFront = √minSq;
  greenery = m3 (squared unless a park). SPRAWL halves gridChaos, doubles blockSize and lifts greenery to (1 + g)/2.
* **Ward groups** (`District.createGroups/pickFaces`): the district's Alleys faces are clustered: start from a random face; while
  more faces remain, stop with probability (c − 3)/c (c = faces so far; never before 4); otherwise add a random neighbour across an
  **unlabelled** edge. A cluster with a hole is traced (a "hole in a group" warning, `District.hx:175`) and cut back to its first face.
  Multi-face groups get their outline smoothed by two Laplacian passes, pinned wherever a labelled non-edge-of-map edge or a
  non-Alleys cell touches, written into the mesh.

### §2.11 Ward geometry (all re-seeded from the cell's own seed unless noted)

#### §2.11.1 Buildable area (`Ward.getAvailable`, `WardGroup.getAvailable`, `Ward.inset`)
Per-edge inset: unlabelled (interior) 0.6, or 1 against the plaza — so neighbouring wards leave a **1.2 alley**, 2 against the
square; ROAD 1 (the road is 2 wide); WALL 0.95 + 1.2; CANAL width/2 + 1.2; COAST 1.2, or 2 for a landing; map edge 0. Per vertex:
the largest tower/gate radius at it (+1.2 in ward groups) and, on the river, width/2 + 1.2 (+1.2 more at the river's first
vertex). The inset is done by **subtracting a stripe polygon along each run of equally-inset edges** (§3.4), and every vertex
whose radius exceeds both adjacent insets gets a 9-gon of that radius (random rotation) subtracted — rounded clearance around
towers and bridge heads.

#### §2.11.2 Ward groups (`WardGroup.createGeometry`)
Re-seed from the core cell; up to 21 tries until at least one block exists: if the area exceeds minSq·2^(sizeChaos·(2u−1))·
blockSize, cut **blocks** (below); otherwise the whole area is one block; outside the walls apply the outskirts filter (§0 #6);
failing all tries, trace "Failed to create a non-empty alleys group". A vertex is **inner** when its face is within walls or every
face around it is city or water; the group is urban when all its vertices are inner. **Blocks**: bisector target
minSq·blockSize, variance 16·gridChaos, alley gap 1.2, cut rounding by `semiSmooth`, and outside the walls an extra stop test —
area < target × the barycentric blend of vertex multipliers (1 inner, 9 outer), so outer blocks come out up to 9× larger. Each
piece: area below minSq·2^(sizeChaos·(2u−1)) → a **single-lot block**; the first piece up to 4× that (while no church yet) → the
**church** (`createChurch`: cut across the oriented box's long side at minFront/length, or a bell position in the middle when
there is room; keep the more compact half as a single-lot block, drawn solid); otherwise a normal block.
**Cut rounding** (`semiSmooth`): nearly straight bends are straightened; otherwise the bend is kept with probability
(1 − cos turn)/2, or with probability minFront/shorter leg; else it is replaced by a circular arc tangent to both legs, sampled every
minFront — the source of the curved streets inside large wards.

#### §2.11.3 The bisector (`Bisector.partition/subdivide/isSmallEnough/makeCut/split/detectStraight`)
Recursive: a polygon stops when the stop test holds (default: area < minArea·variance^t4) or no cut can be made. **makeCut**
(attempt a = 0…10): frame = the minimum-area oriented box (a = 0) or the axis box after rotating by a·36° (a > 0); long side h,
short side k. Position along h = (the centroid's fractional projection + m3)/2. The line through that point parallel to k
crosses several edges; the **start edge** is the crossed edge most parallel to h; the cut starts at the crossing, heading along
the start edge's inward normal. The ray's nearest other hit gives the far edge and distance. If the ray meets the far edge within
sin² > 0.99 of square and the two halves' area ratio is below 2·variance → **straight cut**. Otherwise a **bent cut**: the bend sits at
the middle of the ray when the ray is shorter than 2·√minArea, else at √minArea + (length − 2·√minArea)·m3 from the start; among the other edges, choose the one whose perpendicular foot from the bend point lies on the edge, is not hidden behind any
third edge, and whose direction best faces the ray (largest signed sine); cut = start → bend → foot. The cut is post-processed
(straightening or rounding), reverted if any interior point left the polygon, and accepted if the area ratio ≤ 2·variance, else
the next attempt. No far edge → trace "(a) Failed to make a cut" (`Bisector.hx:281`) and next attempt. With a gap, a stripe of
the gap width (ends extended by half a width) is subtracted from both halves; every accepted cut is kept as an alley polyline.

#### §2.11.4 Lots (`TwistedBlock.createLots`, `Block`)
Bisector target minSq, variance max(4·sizeChaos, 1.2), bends shallower than 0.5 (triangle area ÷ base) straightened. Lots whose
corners all avoid the block outline (1e-9 tolerance) become the **courtyard**. A lot is kept when it has ≥ 4 corners, area ≥
minSq/4, both oriented-box sides ≥ 1.2 and area ≥ half its box — which removes triangles and slivers. **Processing "Offset"**
(first-run default; not in preview): per lot, h = min(√area/3, 1.2)·u; if h ≥ 0.5, intersect the lot with the block outline
shifted by h toward the block centroid (the street front recedes a little, differently per lot). **Display modes** decide what
is drawn and exported: *Lots* (default) the lots; *Block* the block outlines; *Simple* one rectangle per lot — a rectangle-like
lot as is, a lot with two or more frontages as is, else the largest rectangle standing on its single street frontage (or the
largest overall when it has none), used only if both sides ≥ max(1.2, √area/2); *Complex* one footprint plan per lot (§2.11.6) from the simple rectangle with cell area
minSq/4 × shapeFactor, a full street front and 0.6 grid jitter. A legacy "Shrink" processing (inset × (1 − t4) on non-frontage
sides) is still coded but not offered.

#### §2.11.5 Special wards
* **Castle** (`Castle.createGeometry`): shrink the cell by 3.9 on every side, take the largest inscribed rectangle, and plan a keep
  on it with cell area = cell area ÷ 25 and jitter 0.4 (fallback: the rectangle).
* **Cathedral**: largest inscribed rectangle of the buildable area; a **mirror-symmetric** plan with cell area 20, jitter 0.2.
* **Market**: the space is the cell inset only at canals; with probability 0.6 a statue (a 1–2 × 1–2 rectangle aligned with the
  space's longest edge), else an octagon of radius 1–2 (a well/fountain); placed at the centroid, or pulled 20–60 % toward the
  longest edge's midpoint (always for a statue, 30 % of the time otherwise).
* **Farm**: insets 1 toward another farm, 0 to other unlabelled neighbours, 3 to roads, 3.8 to walls, width/2 + 1.2 to the river,
  2 otherwise. Fields: recursive split while area ≥ 400·(1 + t4): across the oriented box's long side at 0.5 ± 0.2·(2·m3 − 1),
  square with probability ½ or skewed by up to ±22.5°, with a **2-unit gap** (field paths); sub-plots touching a water edge are
  dropped; corners chamfered by 1.3; furrows every ≤ 1.3 across the box, kept if longer than 1.2; each sub-plot gets a
  farmhouse with probability 0.2 (a 4–5 × 2–3 house at one end of its longest edge, planned with cell area 4–5, jitter 0.4).
* **Harbour**: on the longest edge facing a landing (half of it at the river mouth), piers every 6 units, 8 long, perpendicular.
* **Park**: buildable area with edge midpoints inserted, three corner-cutting passes (a rounded lawn). Not re-seeded.

#### §2.11.6 Footprint plans (`Building.create/getPlan/getPlanFront/getPlanSym/circumference`)
Grid the quad into ⌈shorter opposite side ÷ √cellArea⌉ cells each way (fails if either count ≤ 1). *Random plan*: grow a
4-connected polyomino from a random cell by random admissible cells until its bounding box spans the whole grid, then keep
growing with probability ½ per step. *Front plan*: the first row fully built, growth into the back rows until the back row is
reached, then ½. *Symmetric plan*: a random plan grown only to the full span, OR-ed with its mirror image. A fully built grid
returns nothing (use the rectangle). The cells are cut with a jittered bilinear grid and unioned into one outline with collinear
corners removed (cos > 0.999).

### §2.12 Drawing-time generation (`FormalMap`, `PatchView`, `BuildingPainter`, `RoadsView`, `WallsView`, `RiverView`, `TreesLayer`, `Style`, `LabelsOverlay`, `CurvedLabel`, `Ridge`, `Equator`)
* **Layer order**: sea (Chaikin ×3 of the sea outline, pinned at map edge, landings and convex city corners, clipped to the view),
  roads (outline sprite under fill sprite), rivers, cells (by ward), trees, walls (city, then castle), district zoom outline;
  overlays above. Stroke widths are specified in screen pixels (normal 1.6, thin ⅓ of it by default, thick 3.2) and converted
  by the map scale, so the map is rebuilt at every zoom change.
* **Buildings**: fill in the roof colour (or the district tint with "Tint districts"), outline in ink. **Raised** (default on):
  every right-to-left edge run is extruded 1.2 × raise upward in the wall colour (raise 0.5 houses, 1 keeps and cathedrals, 0.3
  farmhouses) and the roof polygon is drawn shifted up — the "offset roof" of the profile. **Weathered roofs** (off by default):
  each building's colour scaled by 2^((2·m3 − 1)·weathering%) — main-stream draws at draw time. **Roofs** Hip/Gable (default
  Plain): per building, jitter each corner by ≤ 0.1 (main stream), build the straight skeleton (Gable: convert end triangles to
  gables; skip the building if the skeleton failed) and draw every bone whose speed factor exceeds 1.2 (i.e. from corners sharper
  than ~113°), shifted up by the raise plus a third of the skeleton height when raised. Churches, keeps, cathedrals and monuments are drawn **solid** in the wall colour.
* **Roads**: core 2 units in the road colour over a casing 2 + 2×stroke in ink; the casing is drawn only for stretches outside
  the city (inside, block edges form the street edge); outside the city the polyline is Chaikin-smoothed ×3 (city vertices pinned)
  with 1-unit corner cuts. Alleys layer (off by default): the cut polylines and group seams at 0.6.
* **Walls**: segments of thickness 1.9 in the wall colour with an ink casing; gaps at gates (2 wide) and watergates (river width);
  towers round (default), square or open-backed; gatehouses = two 3.8-unit squares flanking the gap.
* **River**: Chaikin ×3 pinned at bridges; constant width with an ink casing; a flared mouth drawn with two cubic curves out to the
  shore midpoints; footbridges 1.2 wide, road bridges 2 wide.
* **Trees** (show trees, off by default): parks, courtyards (greenery × 0.1 outside the walls) and field edges (hedgerows,
  density falling with distance from the centre) get points from the tree pattern (§3.9); each point gets a crown from a cache of
  at most 20 crown shapes (after 20, crowns are reused at random) — a crown is an irregular hexagon of radius 1–2.25 bulged by
  recursive edge extrusion. **Forests** (show forests, needs trees): connected Wilderness cells (joined across unlabelled and road
  edges), inset 10 (canal: (20 + width)/2), resampled every 20, fractalised two levels, cubic-smoothed, filled in the tree colour,
  and edged with crowns every ~3 units (jittered 1.5).
* **Tints** (`Style.getTint`, by district order i of n): Spectrum (default) shifts hue by −360·(n−1)/n·strength%·(i/(n−1) − ½);
  Brightness shifts value by min(v, 1−v)·strength/50·(i/(n−1) − ½); Overlay blends toward hue + 360·i/n by strength%. Because i
  follows the spatial chain of §2.10, **neighbouring districts get neighbouring hues** under Spectrum/Brightness (no repulsion).
* **Labels**: default "Curved": the district outline is simplified (area-preserving, 1 % tolerance), a straight skeleton is built
  (retrying with every vertex jittered 1 unit in a random direction until it closes — main-stream draws), and the label path is the
  skeleton path between the **pair of outline vertices maximising distance + horizontal separation**. "Straight": the longest
  horizontal chord at ½, ⅓ or ⅔ of the height. The label uses the central part of the path (up to 80 % of it), Visvalingam-simplified
  (≥ 3 points, 1.2 tolerance), cubic-smoothed, read left to right; letters scale up to 1.5× (√ of the spare ratio) and spread evenly.
  Font sizes: title 72, labels 36, legend/pins/elements 28, × 0.5/0.75/1 by the text-size setting (default 0.75).

### §2.13 Editing (`WarpScene`, tools, `City.updateGeometry`, `Cell.reroll`, `Landmark`)
Warp mode snapshots every vertex, edits vertices in place and regenerates the geometry of the touched cells from their stored
seeds (so lots re-cut identically on the new shape); Discard restores the snapshot. Tools: Displace (move by the drag × weight),
Liquify (half the drag, weight 1 − d/r, re-sampled as the brush moves), Relax (toward the neighbour average, interior vertices
only), Bloat/Pinch (radial scaling by (d/r)^∓b, b ≤ 1 from drag length), Equalize (the castle routine on the hovered cell, no
pins), Rotate (the whole mesh about the origin), Measure. Brush radius 2–100 (×1.05 per step), softness ½. **Reroll** (Ctrl-click
or menu) replaces the group core's seed with the current stream state and regenerates that group only. Landmarks keep
barycentric coordinates in a cell's triangle fan and follow warps.

### §2.14 Exports and scale (`Export`, `JsonExporter`, `SvgExporter`, `GeoJSON`, `Sprite2SVG`, `UnitSystem`, `TownInfo`)
* **Scale**: metres = 4 × units (kilometre = 250 units; imperial via yards 0.2286 and miles 402.336 units).
* **JSON** (coordinates × 4, y flipped, rounded to 0.001): a feature collection of — a *values* feature (road width 8, tower
  radius 7.6, wall thickness 7.6, generator and version, river width when present), *earth* polygon, *roads* (every artery as a
  line with width 8; alleys with width 4.8 if the alleys layer is on), *walls* (ring polygons, width), *rivers* (course line,
  width), *planks* (piers and footbridges, width 4.8), *buildings* (per display mode, plus keeps, cathedrals and farmhouses),
  *prisms* (monuments), *squares* (market spaces), *greens*, *fields* (sub-plots), *trees* (points, only if trees are shown),
  *districts* (outlines with names), *water* (sea outline, if any). Streets are not exported separately from roads.
* **SVG**: the rendered display list converted node by node (groups, transforms, fills/strokes, masks → clip paths, glow → an
  underlay stroke, text), with the title font imported from a web-font URL and the emblem embedded as SVG. **PNG**: rendered at
  a size capped near 16.7 M pixels. A URL with `export=json|png|svg` performs that export once on load (`ViewScene.activate`).
* **Population** (`TownInfo.update`): the blueprint's population if set, else 6 × the number of lots, **rounded up** to two
  significant figures; "Number of buildings" is the lot count regardless of display mode.
* **Links out**: "Open in Dwellings" rasterises a footprint on a 1.5-unit grid (≤ 11×11) into a hex bitmask and opens the
  Dwellings generator with seed = city seed + cell index (+ block and lot index) and a "tall" tag for houses; "Overworld" opens
  Azgaar's map generator with size, seed, name, coast, port, river and sea direction.

## §3 Geometry toolkit — what each primitive really does

### §3.1 Delaunay and Voronoi (`Delaunator`)
A faithful port of the sweep-hull method: seed triangle = the point nearest the bounding-box centre, its nearest neighbour, and
the point giving the smallest circumcircle with them (one circumradius test per remaining point — the profile's "8·size + 4"
count); points sorted by distance from that circle's centre; a hull with an angular hash (√n buckets, pseudo-angle key) finds
the visible edge; new triangles are legalised by edge flips with an explicit stack (512 entries). Orientation uses a
floating-point filter (relative error bound ≈ 3.3·10⁻¹⁶) with a fallback to the other two vertex orders. Voronoi regions are
gathered per point by walking its incident triangles and taking circumcentres (cached per triangle, so shared). Points on the
hull get open fans — harmless here because the hull is the bounding hexagon, whose regions are discarded. Edge cases: collinear
or duplicate points are not specially handled (the spiral jitter makes them improbable).

### §3.2 Half-edge mesh (`DCEL`, `EdgeChain`)
Built from polygons whose vertices are shared point objects (identity, not coordinates, decides sharing); twins are matched by
scanning the edges leaving the destination vertex. Operations: flood fill over faces (stack-based, predicate on faces or on
crossed edges); connected components of a face set; **outline of a face set** starting from a given edge or from the leftmost
boundary edge (so the outer boundary, not a hole); all outlines (positive-area one first); add/remove face; split a face along
two of its vertices; split an edge at its midpoint (both sides); **collapse an edge** to its midpoint (the far vertex's edges
are re-attached); vertex list → edge chain. Edge labels are assigned to both twins, optionally without overwriting.

### §3.3 Search (`Graph`, `Node`, `Topology`)
`Graph.aStar` keeps an **array used as a FIFO queue**: take the first node; stop when it is the goal; close it; for each open
neighbour relax its tentative cost, appending it to the queue if new. There is no heuristic and no priority ordering; closed
nodes are never reopened; the path is returned goal-first. The result is a few-hops path with length tie-breaks among nodes still
queued, and deterministic insertion-order tie-breaking (the order cells were sorted and their edges walked). `Topology` builds
the node graph from unlabelled half-edges (weights = edge length), and cuts nodes (all links) or polylines (consecutive links).

### §3.4 Boolean operations and cutting (`PolyBool`, `PolyCut`, `PolyUtils.inset`, `PolyCreate.stripe`)
* **Intersection** (`PolyBool.and`): insert every proper edge–edge intersection into both rings (O(n·m), shared point objects),
  start at the first inserted point, choose which ring to follow by testing the midpoint of the next segment against the other
  polygon, and walk, switching rings at every shared point, until the start recurs. Only **one loop** is returned (multi-part
  results lose all but one part); with no intersections it returns the contained polygon or nothing. A flag inverts the
  containment test — with a reversed ring that turns intersection into **subtraction** (used for alleys, insets, tower
  clearances, lot clipping).
* **Stripe** (`PolyCreate.stripe`): a band of given width around a polyline, with mitred joins (offset scaled by √(2/(1+cos))) and
  ends extended by half the width — so subtracting it cuts cleanly through a boundary.
* **Inset by stripes** (`PolyUtils.inset`): consecutive edges with the same inset distance are grouped into runs; each non-zero run's
  stripe (width 2·inset) is subtracted. Robust on concave cells, unlike offsetting, but a subtraction that splits the polygon keeps
  one piece.
* **Line cut** (`PolyCut.cut`): intersect the infinite line with every edge; use the **first two** crossings along the line
  (a concave polygon crossed four times is cut at the first pair); optional snapping of the crossings to nearby vertices and a gap
  (peel both halves). `peel` removes a strip along one edge by a parallel cut; `shrink` applies per-edge parallel cuts in turn
  (convex-safe only).

### §3.5 Boxes and rectangles (`PolyBounds`)
Convex hull by the linear-time deque method (valid for simple polygons, assumes the input is simple); **oriented box** = for each
hull edge direction, project all hull points and keep the smallest box (O(h²)); corners returned in order (min,min), (max,min),
(max,max), (min,max) of that frame. **Largest inscribed rectangle on an edge** (`lir`): rotate the polygon so the edge is
horizontal, split the outline into rising and falling runs, and for each run segment compute the tallest rectangle standing on the
edge that the opposite run allows, keeping the largest area — a heuristic, not an exact maximum. `lira` tries every edge.
Point-in-polygon is an even-odd crossing test.

### §3.6 Smoothing and simplification (`PolyUtils`, `Chaikin`, `Cubic`, `PolyCore.simplifyClosed`)
* Laplacian pass: each free vertex → (previous + 2·self + next)/4; pinned vertices stay; open version keeps the ends.
* Chaikin: each free vertex replaced by the two points ¼ of the way toward its neighbours; pinned vertices kept.
* Cubic: Bézier segments through the points with tangents along the bisector of the adjacent unit directions and handle length
  = segment length ÷ (1 + the two tangent cosines); ends extended by reflecting the turn; sampled 4–5 times per segment.
* Area-preserving simplify: drop vertices whose triangle is small while the total area stays within 1 % (closed rings).
* Visvalingam (open polylines): drop the least-area vertex while the length ratio stays within the tolerance (1.1 default, 1.2 for
  labels) and more than the minimum count remain.
* One-step closed simplify: drop the single vertex with the smallest triangle (used to reduce lots to quads for Complex plans).
* Resample (even spacing), fractalise (recursive midpoint displacement along the normal by amplitude·(2·m3 − 1)·length).

### §3.7 Straight skeleton (`SkeletonBuilder`, `Rib`)
An **edge-event-only** wavefront: one ray per vertex along the angle bisector with speed 1/sin(½ interior angle) (reflex vertices
flip their ray; parallel neighbours give a perpendicular); repeatedly find, over all rays, the earliest intersection with a
neighbouring ray (height = distance travelled + node height), merge the two rays into a node and a new ray between the outer
edges; stop at two rays, which form the root bone. **Split events are not handled**, so concave outlines can fail to close (rays
left over); callers detect that and retry with jittered vertices (labels) or skip (Gable roofs). Gables: for an edge whose two end
leaves meet at one node, move that node onto the edge. Paths between leaves are read through the parent chain. O(n²) per step.

### §3.8 Triangulation and interpolation (`Triangulation`, `GeomUtils.barycentric`)
Ear clipping on a circular linked list (no hole handling, no z-order hashing); an ear is convex and contains no other vertex that
is reflex; a full pass without an ear stops the clipping (a degenerate outline can stay partly untriangulated). Used once per
ward group; interpolation walks the triangles for the one containing the point (all barycentric weights
≥ 0) and blends per-vertex values; outside every triangle → no value (the lot is dropped by the outskirts filter).

### §3.9 Blue noise and trees (`PoissonPattern`, `FillablePoly`, `Forester`)
A **periodic** Poisson-disc tile: width × height, minimum distance d, grid cells d/√2; start from one random point; each step takes a
random active point and tries **50** candidates in the thin annulus [d, 1.1·d] at random angles; a candidate is **wrapped into the
tile** (this is the "warp" the profile counted — a torus wrap, not a domain warp) and accepted if no point lies within d in the
5×5 neighbouring cells (distances measured on the torus); every accepted candidate is emitted (not only the first); a point with no
success is retired. Filling a shape tiles the pattern over its bounding box and keeps the points inside. The city uses one pattern,
30 × 30 units with d = 2.25 (≈ 9 m between trees), built at page boot from seed 1 — identical on every load — and a 5-octave noise
mask (base frequency 0.05) that keeps a point where (noise + 1)/2 < density. Lines get a point every ~3 units, jittered along the
line, masked the same way.

### §3.10 Noise (`Noise`, `Perlin`)
Fractal sum of gradient-noise octaves; each octave takes one main-stream draw to rotate its permutation table, doubles frequency and
halves amplitude (persistence ½). The noise uses the classic 256-entry permutation, four diagonal gradients and a tabulated quintic
fade (4096 samples); negative coordinates are shifted by 256.

### §3.11 Other primitives
Line–line intersection returns both parameters and fails only on an exactly zero determinant (callers check ranges); collinearity
(`converge`) is an absolute 1e-9 test on unnormalised cross products (scale-dependent); degenerate edges are skipped below 1e-10;
a "straight" bisector cut needs sin² > 0.99; ribs treat directions as parallel above cos 0.99999; plan outlines drop corners above
cos 0.999; compactness uses the signed area (a clockwise ring would read negative). Bilinear grid cutting jitters interior lines by
(m3 − ½)/(cells − 1)·jitter. Crown bulging extrudes an edge's midpoint by ½·min(1, length/size) of the edge rotated 90°, recursively
while the edge is longer than 0.3·size.

## §4 Randomness

* **Generator** [READ `Random`]: Lehmer / MINSTD, state ← 48271·state mod (2³¹ − 1), value = state/(2³¹ − 1). The draw is
  **inlined at every call site** (hence the profile's low `Random.float` counts). Reset with a value, or from the clock
  (milliseconds since 1970 mod 2³¹ − 1) with none. One **save slot** (not a stack): save copies the state; restore with no
  argument returns to it once and clears the slot; restore with an argument simply sets the state (used as "re-seed").
* **Seeding points.** Page boot: state 1, then static initialisers draw (the tree pattern, its noise mask) — the same on every load.
  `Main`: clock seed. A URL seed resets the stream at `City.new`; Enter passes the **current state** as the new seed; the Generate
  window passes the current state too (after its size draw); "Rebuild" reuses the old seed.
* **Stream structure of one generation** (attempt order): [random-mode flag draws — taken from the stream at the new seed *before*
  the city resets to that same seed, so flags and geometry share the stream start] → base angle, spiral radii → (plaza: shadow
  draws, restored) → one draw per cell (the **per-cell seeds**) → (coast: shadow draws incl. 6 noise-octave draws and the sea
  direction, restored) → junction collapse (no draws) → sea-outline smoothing count → walls, gates, castle, bloat/equalize
  (**shadow**: the whole stage restored; but the new cells created by gate splits keep seeds drawn inside the shadow) → streets (no
  draws) → canal (**shadow**, except when it throws: then the retry starts from the advanced state) → parks, gate suburbs, shanty
  picks, farm lobes → river width and footbridges → naming (the grammar draws from the main stream through its deck selectors and
  probability guards) → district seeding, growth and **per-district parameters** → per-ward geometry, each **re-seeded from its
  cell's seed** (groups, castle, cathedral, market, farms; parks and the stripe-corner rotations draw from whatever state the
  previous ward left).
* **What depends on interaction history.** (a) The next Enter seed = the state after the last randomised ward **plus every
  render-time draw since**: first-time compass styling (≈ 10 draws, once per page), Hip/Gable roof jitter (per building per
  redraw), weathered roofs (3 per building per redraw), tree crowns until the cache holds 20, forest edge jitter, label-skeleton
  retries. So the same map viewed with different styles, or redrawn, hands a different seed to Enter. (b) The Enter size comes
  from the unseeded browser random. (c) Toggling plaza, coast, walls or river leaves the other stages' draws in place (shadowed);
  toggling random-mode features does not (they change which cells are city/water and hence counts of later draws).
  (d) A per-cell reroll replaces that group's seed with the live state; warps keep seeds. (e) Retries continue the stream.
* **Reproduction consequence.** A URL (size, seed, every flag, sea direction) reproduces a city exactly on the same build; an
  Enter chain reproduces only under identical display settings and identical interaction history. [INFERRED from the READ
  structure; consistent with the dwellings lane's measured "Enter seed = raw state after k draws".]

## §5 Data assets present (named and shaped; nothing copied)

| asset | where | shape | notes |
|---|---|---|---|
| naming grammar | `Assets/grammar.json` (captured body `0014-5ba58ea2.json`), loaded by `Namer.reset` | 36 symbols, 279 rule strings; guards on the flags CASTLE, WALLS, TEMPLE, PLAZA, COAST, RIVER, UNIQUE, COMPACT (and negations of the last two), probability guards 0.05–0.5; 9 district symbols (one generic, eight per type) | no references to the Markov externals; SHANTY is set by the namer but unused by this grammar |
| word corpora | `english.txt` (989 words), `given_male.txt` (117), `given_female.txt` (92), `elven.txt` (43) | space-separated lowercase words | tokenised into phoneme-cluster chains at load; never sampled by this grammar |
| colour schemes | `default`, `ink`, `bw`, `vivid`, `natural`, `modern` JSON presets (keys 1–6 in the view) | 13 keys each: ten colour roles (paper, light/elements, ink, roof, water, greens, roads, walls, trees, labels) + tint method, tint strength, weathering | the built-in default scheme is also compiled into `Style`'s initial values |
| syllable tables | `Syllables` | an ordered list of 23 vowel groups (digraphs first) and 26 consonant groups | generic English orthography; drive the merge rule and word splitting |
| named colours | `ColorNames` | ~141 named colours with RGB values | used only by the palette editor to name a colour |
| plural exceptions | `ModsEngBasic` | 2 irregular plurals | Tracery English modifiers |
| gradient-noise permutation | `Perlin` | the standard 256-entry table | public-domain classic |
| fonts | `IMFellGreatPrimer-Regular`, `ShareTech-Regular`, `ShareTechMono-Regular` (woff) | title/labels use the first; UI the others | SVG export imports the first from a web-font service |
| option lists and sizes | `Values`, `City` statics, `Text` statics | display modes 4, roof styles 3, tower shapes 3, field modes 3, label modes 4, landmark modes 3; size bands 10–20/20–40/40–80; font sizes 72/36/28 | first-run defaults: Lots, Offset, Round towers, Icon landmarks |
| external services | Armoria (emblems, 200 and 800 px, SVG), Dwellings (footprint hand-off), Azgaar's map generator (overworld) | URLs with seed/size parameters | emblems are not generated in-app |

## §6 Corrections — profile claim | what the code says | where it matters

"ARCH" = `docs/ARCHITECTURE.md`; "prof" = `research/findings/profile-mfcg.md`; "conf" = `docs/confidence/mfcg.md`. All code facts [READ], CONFIRMED unless marked.

| # | profile / critic / confidence claim | what the code says | matters for |
|---|---|---|---|
| 1 | The retry loop wraps stages 1–6; wards, city towers and geometry run once per city (prof §3.1, §3.2) | All nine stages sit inside one try; any exception anywhere restarts from the patches; the stream is not reset (`City.new`, `City.build`) | ARCH §5.1–5.2 (our tiered failure policy contrasts with a whole-city restart), §6.1; prof §3.1, §11 |
| 2 | "8·size + 4" seed points; the +4 "most likely 4 far bounding points" (prof §0 #2, §4.1, §13) | 8·size spiral points + a 6-point hexagon at twice the spiral radius; +4 = the Delaunay seed test's n − 2 calls; recorded triangle counts equal 2n − 8 for n = 8·size + 6 | ARCH §4.2 S1, §15.1 row B1; prof §4.1; conf §4 #4 |
| 3 | Junction threshold and absoluteness unknown (prof §4.2) | Collapse edges shorter than max(7.5, ⅓ of the face's mean edge); faces of ≤ 4 corners and the citadel outline protected; repeat to fixpoint | ARCH §4.3–4.4 (backbone faces); prof §4.2; conf B2 |
| 4 | Domains = two splits "sea/land and an offshore component" [INFERRED] (prof §4.3) | Largest land component = earth, largest water component = sea; throw if the sea misses the map edge; sea outline smoothed 1–3 passes into the mesh | ARCH §2.3, §4.2 S1; prof §4.3, §14 q4 |
| 5 | Wall smoothing kept the 2017 factor min(1, 40/n) (prof §4.4, §12.1, §12.3) | Three Laplacian passes with the sea outline and the citadel pinned, written into the mesh | ARCH §4.8 S7; prof §4.4 |
| 6 | Auto gate count ≈ 0.8·√size, weighted pick of unknown weights (conf §4 #5; EG series) | 2 + ⌊inner cells ÷ 12 × (0.75 with a coast)⌋; explicit N; "hub" = every eligible vertex; weights zero the pick and its neighbours and multiply the rest by (cyclic distance − 1); the outside cell is split to give a straight exit | ARCH §4.4 (gate count), §4.8; prof §4.4, EG-1…EG2-7, §14 q12 |
| 7 | `getTowerRadius` is queried "while choosing tower placement" (prof §4.4) | It is the per-vertex clearance used by every buildable-area inset (2.5 tower, 4.8 gate) | ARCH §4.7 (buildable area), §4.8; prof §4.4 |
| 8 | Equalize relaxes edge lengths (prof §4.4b) / equalizes angles (critic C5); bloat trigger unknown | Each pass moves free vertices 20 % toward the best-fit regular polygon (first Fourier component) with the gate pinned; a pass gaining < 0.001 throws "Bad citadel shape!"; bloat = radial warp of **all** mesh vertices within 2·max(15, far radius) while the nearest vertex is < 10 from the centroid | ARCH §4.8 (castle band and repair), §7.1 (warp edits); prof §4.4b; `_critic.md` C5; conf §4 #8 |
| 9 | The third `Topology` is unknown (prof §4.5, §14 q5) | Streets (city cells), roads (outside land cells), river (all land cells) | ARCH §4.3; prof §4.5 |
| 10 | Street search = the 2017 A* with a linear min over `keys()` (prof §4.5, §12.2; corrected in part by Critic-2) | A FIFO label-correcting search, no heuristic, no priority, stop at first dequeue of the goal | ARCH §3.1 (already notes FIFO), §4.3; prof §4.5, §12.2; conf §4 #7 |
| 11 | Tidy-up cuts streets into unique segments and drops plaza-side segments, as in 2017 (prof §4.5) | Set-union of half-edges then greedy endpoint chaining; no plaza trimming | ARCH §4.3; prof §4.5 |
| 12 | The river is a variable-width ribbon widening downstream (`getCanalWidth` per node) (prof §4.6) | One width for the whole course, (3 + inner/5)·(0.8–1.2)·(1.5 rural); the renderer adds a flared mouth only | ARCH §2.3 (width law), §8.2; prof §4.6; `_critic.md` C15 |
| 13 | Canal course search has a try budget of "roughly 40–50" (prof §4.6, §11) | One try per candidate: coastal = each interior shore vertex (nearest the centre first); coastless = pairs of edge vertices; failure when the list is exhausted | ARCH §5.1 (restart tier), §4.2; prof §4.6, §11; conf §4 #3 |
| 14 | `createWards` holds `DistrictBuilder`; farms and shanty towns run in `buildGeometry` (prof §3.1, §4.7, §4.9) | Farms and shanty towns end `createWards`; districts are built at the start of `buildGeometry` | ARCH §4.5 (S6 order); prof §3.1, §4.7, §4.9 |
| 15 | `buildCityTowers` = free-standing towers or landmarks (prof §4.8, §14 q2) | Switches off coast and citadel wall segments and places the city wall's towers | ARCH §4.8; prof §4.8 |
| 16 | Bisector: OBB-driven, stop on OBB dimensions, cut ⟂ the OBB long axis, `detectStraight` snaps to a frontage (prof §4.9, §13); bent-cut construction open (critic C13) | Stop on **area** (minArea·variance^t4); position from the OBB; start on the crossed edge most parallel to the long side and run ⟂ **that edge**; straight if square to the far edge, else bend and perpendicular foot; balance test with rotated retries; `detectStraight` straightens shallow bends | ARCH §4.6 (S8 bent cut); prof §4.9; `_critic.md` C13; conf §4 #1 |
| 17 | `indentFronts` = inset copy for a uniform setback (prof §4.9); critic: probably the Offset option | The "Offset" processing (first-run default): per lot a random recession ≤ min(√area/3, 1.2), applied only when ≥ 0.5 | ARCH §4.7 (S11 site plans, frontage); prof §4.9 |
| 18 | Outskirts density = the 2017 per-vertex density (1 at gates, 2·u inside, else 0) (prof §4.9) | Vertex weights 1 inner, 0.5 wall, 0.3 road, 0.1 canal, 0 other; keep probability = weight·√F − (½√F − ½) for an F-cell group | ARCH §4.6–4.7 (edge thinning), §4.4 (sprawl); prof §4.9; conf §4 #6 |
| 19 | `Building` = special landmark buildings only (prof §4.9) | Also every farmhouse (20 % of sub-plots) and every house in "Complex" mode; plans are grid polyominoes (random, full-front, mirrored) | ARCH §2.6, §4.7 (S11 footprints); prof §4.9 |
| 20 | Farms are grid-cut by `Cutter.grid`, "roughly one per farm" (prof §4.9) | Fields split recursively (≥ 400·(1+t4) area, ±22.5° skew half the time, 2-unit paths); `Cutter.grid` belongs to building plans | ARCH §4.9 (S12a fields); prof §4.9 |
| 21 | `PoissonPattern.warp` = an anisotropic/domain warp; consumer unknown (prof §6.1, §14 q1; critic C2 "domain-warped") | A torus wrap making a **tileable** 30×30 pattern (annulus d to 1.1·d, d = 2.25, 50 tries all evaluated), built at boot from seed 1; consumer = the tree scatter (`Forester`) | ARCH §3.1 (Poisson row), §8.10 (stamp tiles); prof §6.1; `_critic.md` C2 |
| 22 | Label ridge = the skeleton's longest root-to-leaf path (prof §6.2) | The skeleton path between the outline vertex pair maximising distance + horizontal separation; skeleton is edge-event only and retried with 1-unit jitter; central ≤ 80 % used | ARCH §3.8, §9.3; prof §6.2; conf §4 #10 |
| 23 | Naming = Tracery + 4 Markov corpora (prof §0 #9, §9) | The four chains are built but this grammar never calls them; UNIQUE = only district of its type, COMPACT = one-cell district, merge joins words when the phrase has ≤ 2 syllables | ARCH §9.6, §10.4; prof §9, §14 q9–q10 |
| 24 | `farms=0|1` is a blueprint URL key (prof §2) | Not read or written by the blueprint; farms always generate; display option "Farm fields" controls drawing | ARCH §4.2 S0, §11.1 (permalink); prof §2 |
| 25 | Population ≈ 6.29 (devlogs) → 6.12–6.13 (critic C1) | 6 × lot count, **rounded up** to two significant figures | ARCH §1.4 content row, §13.5 parity row; `_critic.md` C1 |
| 26 | Buildings = dark footprint + roof polygon at a constant offset (prof §0 #7, §10.4) | The offset is the default "Raised" elevation (front faces extruded, roof drawn lifted); roof line work is the per-building skeleton, off by default | ARCH §8.2, §8.4 (heights), §8.10; prof §0 #7, §10.4 |
| 27 | Weathering and tint entry points unexplained (prof §14 q8, q11) | Weathering = per-building roof brightness jitter when "Weathered roofs" is on; `getTint` dispatches to Spectrum/Brightness/Overlay; tint index follows the spatial district chain (neighbours get neighbouring hues) | ARCH §8.2; prof §14 q8, q11; conf §4 #10 |
| 28 | `City.(anon@239186)` is the per-cell noise closure (prof §4.1) | It is the cells' sort-by-distance key (same per-cell count); the noise call is inline | prof §4.1 (minor) |
| 29 | `GeomUtils.converge` is an iterative relaxation helper (prof §6.5) | A collinearity test (absolute 1e-9) used by field and rectangle routines | prof §6.5, §14 q7 |
| 30 | Scale unstated | 1 unit = 4 m (units system and JSON export ×4) | ARCH §2.1 (units), §12.2 (matched sizes), §13.5; prof §2 |
| 31 | Gates: "entrances with > 1 adjacent inner ward, random pick, neighbour exclusion, retained" (prof §4.4, §12.3) | Retained in spirit but with multiplicative distance repulsion, reserved-vertex exclusion, the outside-cell split and a gate-vertex straightening | ARCH §4.8; prof §4.4, §12.3 |
| 32 | `City.f` (3 840) and `City.d` (76) unknown (prof §14 q6) | `f` ≈ the bounds accumulator in `updateDimensions` (one call per block — 3 835 blocks in B1); `d` = the shanty-town distance score (PLAUSIBLE attribution by count) | prof §14 q6 |

## §7 The critics' and the profile's open questions, answered

**From `_critic.md`.**
* **C13 (bisector cut rule, OPEN)** — answered (§2.11.3): both constructions are true at once; the oriented box picks the side and
  position, the stated right-angle-with-a-bend construction is the cut; `makeCut = project` 1:1 is the cut-position projection.
* **§6 gap 1 (default-style captures only)** — answered from code: roofs (§2.12), trees and forests (§2.12, §3.9), alleys layer,
  district view (focus zoom), tints, explicit gates (§2.4) are all read.
* **§6 gap 4 (twisted-bisection parameters)** — answered: bend position, start-edge choice, stop predicate, street/alley widths
  (roads 2, alleys 1.2, plaza edge 2), reject filter (≥ 4 corners, ≥ minSq/4, box sides ≥ 1.2, fill > ½) (§2.11). The *second
  alley type* is the ward-group seam (unlabelled cell edges drawn at 0.6 in the alleys layer). Still unknown: why these constants.
* **§6 gaps 5–6 (external posts, version 0.11.3)** — not answerable from code; the bundle is one build.
* **Critic addendum 1 (PoissonPattern consumer)** — answered: trees (`Forester`), static at boot. **Addendum 2 (equalize/bloat)**
  — answered (§2.4). **Addendum 3 (bisector vs bent cut)** — answered (C13). **Addendum 4 (coverage gap)** — answered (above).
* **Critic-2 addendum 1 (aStar internals)** — answered: FIFO, no priority (§3.3).
* **C15 (deltaRiver)** — confirmed: a river ending at the shore with a drawn flared mouth; no braided delta exists in code.

**From `profile-mfcg.md` §14.**
1 PoissonPattern consumer — trees. 2 `buildCityTowers` — segment switch-off + towers. 3 bisector stop and chaos — per-district
minSq/gridChaos/sizeChaos/blockSize, stop on area (§2.10–2.11). 4 domains — land mass and sea (§2.3). 5 third topology — roads
outside (§2.5). 6 `City.f`/`d` — §6 row 32 (PLAUSIBLE). 7 `converge` — collinearity. 8 weathering — roof brightness jitter.
9 merge rule — ≤ 2 syllables join. 10 UNIQUE/COMPACT — only-of-its-type / one-cell. 11 spectrum vs getTint — dispatch.
12 gate policy — §2.4.

**From `docs/confidence/mfcg.md` §4 (the ten riskiest unknowns).**
1 bisection — answered (§2.11.3–2.11.4). 2 district growing — answered (§2.10). 3 river course and acceptance — answered (§2.6;
tributaries and islets: **none in this build's code** — the model holds at most one course; whether the coast shape of §2.1 is
the "0.11.2 bay rework" is not stated in code).
4 live seeding — answered (§2.1; spiral constants unchanged, no relaxation pass, junction collapse §2.2). 5 gate policy —
answered. 6 outskirts and sprawl — answered (§2.7 shanty growth, §2.11.2 outer blocks ×9, §0 #6 thinning); there is **no
VG-style rectangle placer** in this bundle. 7 street search — answered (FIFO; cost = edge length only for relaxation; smoothing
parameters §2.5, §2.12). 8 castle internals — answered (§2.4, §2.11.5: keep = largest inscribed rectangle after a 3.9 shrink,
random plan with cell area = cell area/25). 9 coast field — answered (§2.1: a sea disc plus an outward strip, perturbed by noise growing with distance; cells are
classified whole by their centroid, never split at the shoreline; the shoreline is then smoothed as a mesh edge chain). 10 label ridge, font sizes, tint repulsion —
answered (§2.12). Honourable mentions: elevation field — **there is none** in MFCG's model; framing — map fit with a 40-unit
margin (10 when zoomed to a district), legend auto-placed in the corner covering the fewest blocks/towers; forest amplitudes —
§2.12; `Syllables.pinch` — §1.11/§7 q9; church placement — §2.11.2.

## §8 What remains unknown or unreachable

* **Intent and history of the constants** — the code gives values, not reasons (e.g. why 0.75 compactness, why 16·gridChaos).
* **Dead or unreachable paths** (present, never taken in normal use): the "Shrink" processing (not offered by the UI); the
  `no_triangles` and `lots_method` settings (read, ignored); `Values`' `farms` default; the wall's `real` flag (never cleared by any
  app class); the grammar's SHANTY flag (set, unused); the Markov externals (registered, unused); Tracery's "clear" action (it adds
  flags instead of removing them — a latent bug, unused by this grammar).
* **Server side** — none: MFCG generates entirely in the browser; only emblems (Armoria) and the Dwellings/overworld links leave it.
* **Obfuscation** — local names are minified; semantics above are reconstructed from structure. Two attributions rest on call-count
  matches only (§6 row 32). No code was executed in this lane; the discard-count identity (§2.6) and the equalize contraction are
  PLAUSIBLE consistency checks against the profile's recorded numbers.
* **Floating-point replay** — exact reproduction depends on the browser's double arithmetic and sort stability (the district and
  sortBy orderings use the engine's sort); not examined.

## §9 Reading record

* **Class map:** `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/code/mfcg/classes.tsv`
  (609 markers: every `__name__` and enum marker, with byte ranges; validated — every one of the 228 app classes starts at its own
  constructor and is registered immediately after it). **Extraction script:** `…/scratchpad/code/mfcg/extract.py` (marker map,
  line-break-tolerant marker and constructor regexes, static-initialiser statements attached from the boot region, prettifier
  breaking at `;` `{` `}`); `annotate.py` adds a legend of referenced minified class identifiers. One file per class under
  `…/scratchpad/code/mfcg/classes/` (232 files). Scratch notes: `…/code/mfcg/notes.md`.
* **App classes: 232 `com.watabou.*` entries (228 classes + 4 enums). Read in full: 180** — all of `mfcg` (111), `geom` (30),
  `utils` (18), `tracery` (10), `nlp` (2), `system` (3), `formats` (4), `processes` (2). **Skimmed: 52** `coogee` UI-framework
  classes (the eight core ones in full; the widgets at 700–1 400 characters each, enough to confirm they are widgets), plus a grep
  proving no random draws or model access in `coogee`.
* **Assets examined for shape only** (never reproduced): the grammar, six palettes and four word lists in the same capture's bodies
  (§5).
* **CONFIRMED** (read on disk): every [READ] statement — the pipeline order, every stage's rule and constant, the RNG and its
  isolation devices, the exports, units and population formula; the anonymous-closure identities (byte offsets match); the absence
  of Markov calls (grammar has zero references; the recorded coverage shows no `Markov.generate`). **PLAUSIBLE**: the 35–41
  discard identity, the `City.f`/`City.d` attributions, the equalize-contraction match to recorded traces, and every statement
  marked [INFERRED].

## Fable review (2026-09-27) — B-code/mfcg

Verdict **CORRECTED** (Fable 5.1, lane fable-review/main/code; `docs/fable-review/main/code.md`). Read whole. Firewall: clean
(identifiers and source locators citation-only; console strings are identifiers under R5 as sharpened by J-Fcode-1; the
grammar and palettes shaped only). Re-derived on the per-class extracts of this bundle: the castle repair's order and
constants (`Castle.adjustShape`: bloat while the nearest vertex is under 10 units, then equalise 20 % toward the first
Fourier component's regular polygon while compactness < 0.75, a pass gaining under 0.001 throws); the Offset recession
(`Block.indentFronts`: min(√area ÷ 3, 1.2) × u, skipped under 0.5); the raise (1.2 × a raise of 0.5 by default, 1 at the ward
view's landmark calls, 0.3 in the farm painter); the farm split (`Farm`: 400 × (1 + t4), cut at 0.5 ± 0.2·bell, square half
the time else ±22.5°·bell, 2-unit gap, farmhouse 0.2); the label path (`Ridge.build`: jittered skeleton retries; the pair
maximising distance + horizontal separation; `CurvedLabel` 80 %); the Markov question (three externals registered, none
referenced by the captured grammar body, none called directly); the grower rates (0.1 for castle, bridge and gate seeds,
0.5 for bank, 1 otherwise; skip with probability 1 − rate) and ⌊√cells⌋ seeds; the three pinned wall passes and the gate law
2 + ⌊inner ÷ 12 × (0.75 with a shore)⌋; two artery passes and 1–3 sea-outline passes. All CONFIRMED as written.

Corrections (this section supersedes the passages named): (1) **§0 #9's rural rule** reads as the critic's R-M8 / R6: the
river is rural when it has no bridge-site candidate — a candidate is a course vertex from the third to the second-last with
an inner cell on either side, the watergate vertices excluded — which is what §2.6 already says. (2) **§9's scratchpad path**
names the reader session (`3fbc58a0…`); the extracts this review used are the mirror at
`/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/454522d3-02d4-4290-bb60-ba2f045c687d/scratchpad/code/mfcg/classes/`.
The PLAUSIBLE items of §8–§9 stay PLAUSIBLE and none is carried into the design.

## Fable review (2026-09-27) — B-code/mfcg (critic)

Verdict **CONFIRMED**. R-M1–R-M8 stand; R-M4 re-derived independently with the same result; the critic's list of what it did
not re-derive is accurate, and this review closed eight of its items (above). No replay ran in MFCG (critic G6 stands).

## Fable review (2026-09-27) — B-code/mfcg (impact)

Verdict **CONFIRMED**. Every claim the amendments rest on that no seat had re-derived — district growth rates and the skip law
(item 47), the castle repair's order, target and stall (45), the three smoothing passes and the coastal factor (46), the
Offset recession (43), the farm split (57), the raise ratios (54), the label path (55), the unused Markov models (56) — is
re-derived above. Item 46's editor text is corrected in `docs/AMENDMENTS-2026-09-27c.md` (evidence gate, J-Fcode-6): the
metric coastal rule approximates the coded cell-count law rather than reproducing 4 / 7 / 10 / 14.
