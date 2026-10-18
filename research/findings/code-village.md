# code-village — the Village Generator read from its compiled bundle

> READER-TIER — behind the implementer firewall (owner directive 2026-09-27); logic in our own words; no code or assets copied.

> PENDING FABLE REVIEW — class B (Opus reader lane code/village; no Fable critic has checked it). Queue row B-code/village in
> docs/FABLE-REVIEW-QUEUE.md. Fable retrovalidation should check the §0 overturns and the §6 corrections (C1–C40) against the
> bundle before any of them is carried into docs/ARCHITECTURE.md; the firewall (no code, no asset copied, identifiers
> citation-only), including a ruling on §5's call that the tag-roll probabilities, exclusion groups and other numeric tables in §2
> are logic, not content; and the PLAUSIBLE items of §9. The scratchpad cited below is mirrored (ephemeral) at
> `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/454522d3-02d4-4290-bb60-ba2f045c687d/scratchpad/code/village/`.

**Lane** `code/village` · **written** 2026-09-27 · **bundle** `captures/village/2026-09-25T19-07-16/coverage/network/bodies/0003-b921e835.js`
(1 353 915 B, sha256 `77d7e359d6c32f61…`, byte-identical to `0020-b921e835.js` of the same capture) · **build** itch `html/19365073`
= **VG 1.6.9** by the bundle's own metadata (the capture's `meta.json` baseUrl — the same build as the profile's part 2 and
new-build addenda; *not* the 09-21 build 19251041 of the profile's body) · **class map** `scratchpad/code/village/classes.tsv` · **per-class extracts** `scratchpad/code/village/classes/`
(scratchpad = `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/`).

**Grades.** `[READ]` = seen in the bundle (class and method named, bundle as above); `[INFERRED]` = our reconstruction or a
consequence we derived; `[STATED]` = the author's words elsewhere. **CONFIRMED** = read on disk; **PLAUSIBLE** = reasoning only.
Constants below are facts about the reference, stated as numbers; nothing here is code, and the data assets are named, never
reproduced. Reference identifiers are citations only: "VG's region builder (its `Region`)" once, our words after.

---

## §0 Headline — the ten things the code settles

1. **One PRNG, seven streams, and a successor seed that depends on the renderer.** `[READ]` The generator's only randomness is a
   Park–Miller "minimal standard" Lehmer generator (multiplier 48 271, modulus 2³¹−1; each draw divides the new state by the
   modulus), in its `Random`. The compiler **inlined every draw** at its call site, so profilers that counted calls to the draw
   function saw only the draws made through the array helpers; "no Random call inside `River.new`" was an inlining artefact. The
   stream is re-seeded at six points per village (seven on a cold load, the first from the wall clock) — this is exactly the
   profile's `Random.reset = 6 / 7` count, now identified (§4). The next village's seed and its random tags are the *next states
   of the stream the renderer leaves behind*, so what the Enter key produces depends on everything drawn since the naming stream
   was reset, including the whole view (§4.4). A failed build is retried with **one Lehmer step of the failed seed**; this
   reproduces all three recorded failure pairs exactly (2087232953 → 1479091611, 801393661 → 1450476720, 9191 → 443658761).
   The tree seed is not advanced by the retry, which is the whole reason `trees=` appears in retried URLs.
2. **The request-tag roll and the exclusion table are explicit** (§2.1): 20 request tags; eight Bernoulli rolls with fixed
   probabilities (district 0.05, density 0.2, water 0.666 with weights river 3 : coast 2 : island 1 : pond 1 : confluence 0.5 :
   estuary 0.5, …); seven mutually exclusive groups; `isolated` is appended whenever no road tag is present. Seven
   **character parameters** are drawn per seed in the blueprint (house widths, aspect ratio, block length, road "rigidness",
   field factor) and drive every later stage.
3. **Terrain is a 128² fBm plus one authored primitive; water is its level set; the famous hot loop is not bank-shaping.**
   `[READ]` 5 octaves of 4-direction Perlin gradient noise, persistence 0.30–0.45, plus exactly one primitive chosen by the
   water type (sloping circle for a coast, Gaussian hollow for a pond, Gaussian mount for an island, a logarithmic valley carved
   along one or two river courses, a circle slope plus a widening carve for an estuary) or, with no water, by a 1/3 : 1/3 : 1/6 :
   1/6 roll among plain, hill, ridge and valley. Water is every cell below a level; its outline is the **staircase of cell edges**,
   chained, relaxed twice and resampled at three cells. `Water.createDeflection` — the 50–87 ms routine the profile could not
   explain — computes an **inverse-distance repulsion vector from all water within 16 cells of each land cell**: it steers roads
   and places the highway entrance; it does not shape banks.
4. **The river course is a meander spline** (§2.3): entry and exit on a circle just outside the view, 90°–270° apart, through the
   map centre; Chaikin-cut twice; knots at half-wavelength stations, pushed sideways by a cosine of wavelength
   width·2^(3.5…4.5) with a per-knot amplitude of 2 or 5 river widths times a random factor; a cubic spline at 8 points per span;
   resampled at half the river width. River width is 20 to a quarter of the half-view, skewed small.
5. **The population-density map is a closed formula** (§2.6): a smoothstep of the clamped sum of an *elevation-band* term (how
   close each cell's height is to the height at a random reference point — the shoreline height if that point is in water) and a
   *radial* term that falls from 1.5 at the map centre to 0 at the view edge, scaled by the density tag (×0.5 sparse, ×2 dense).
   `district` drops the radial term. The "heart" is the densest *building*, used only by the spotlight.
6. **Roads are agents on a 5-unit step with a fully stated steering law** (§2.10): each step adds to the unit heading the best
   aligned of four terrain vectors (uphill, downhill, and the two contour directions, the slope pair damped on steep ground) times a
   per-type flexibility (highway 0.5, road 1, trail 2), a water term, a pull toward a target and a push through the palisade;
   ordinary roads turn only when the sideways push exceeds the blueprint's rigidness (0.05–0.25; 0 for `organic`). Branching
   happens as soon as no junction lies within minBlock ÷ density; roads leaving populated ground become trails; trails end at a
   random length and grow a farmstead there.
7. **The square is sized in house widths** (§2.11): circumference = (12…19) × the largest house width; round with probability 0.7
   (0.9 with water) else a square; stretched along the contour by 2^slope; aligned to the highway when it snaps onto it; its
   centrepiece is a tower (0.1 round / 0.5 square), else a tree or a well (even odds), and nothing when the square touches water.
8. **Houses are frontage draws, not rejection sampling of free candidates** (§2.12): along both sides of every street, one
   candidate per frontage interval (its own width plus a gap of minWidth × a Bates-3 draw), accepted with probability equal to the
   density at the frontage midpoint (×2 on the square), set back by the road offset × (1 + a folded draw), large with
   probability 0.15 ÷ (large houses so far). **Population = houses × U(3, 7), one draw per village**; settlement class is a
   count threshold (<20 hamlet, or roadhouse if a highway; <200 village; <1000 town; else city) and "riverside/coastal" needs a
   **wharf**; the number of points of interest is a stochastic rounding of ln(houses ÷ 5).
9. **Fields are Voronoi seeds on the highway, the shores and a ring, bisected with right-angled cuts** (§2.14): seed spacing
   120 → 50 units as density rises; cells clipped to land and to the two sides of the highway; recursive bisection whose cut leaves
   the first edge at a right angle and meets the far edge at the foot of a perpendicular (bent once if needed, the bend rounded by
   an arc); lots inset by half a road, kept only if ≥ 0.55 rectangular and ≥ 0.4 aspect; **picked by greedy growth outward from the
   houses' centroid until 1 000 area units per house** (×4 `farmland`, ×0 `uncultivated`); lots that touch a house become orchards
   with probability √density.
10. **Trees are the cells of one cached, periodic Voronoi tile** (§2.15): a toroidal Poisson pattern (distance 12, 50 candidates in
    an annulus 1.0–1.1 r, then jittered by up to 0.8 r) on a 96 × 96 tile, repeated over the map; a cell carries a tree if it is dry,
    passes a density test (√(1 − density), or density > 0 under `grove`), a **domain-warped 6-octave noise > 0**, and clearances
    (6 + 0.5–1.5 house radii from houses, 12 from roads, the palisade band, piers, not in a field or orchard). The tile is built
    **once per map size per session from whatever stream state is current** — a session-history dependence (§4.4).

**Profile claims the code overturns** (details and design sections in §6): the successor/retry model ("sometimes seed + 1,
sometimes a fresh draw"; `trees` as a deliberate vegetation stream); `createDeflection` as bank meandering and `linkSegments` as
marching squares; population as per-house household draws; the roadhouse/hamlet split as a size band; `spawnAt` as special
buildings at the square; `getBuildingsAround` as the placement query (it is the tree and orchard clearance query); `Bloater` as
inflation until contact (it is a billowing-outline generator for crowns and thickets); shading normals computed in the view (they
are the model's gradient field); "a bridge is one tracker step"; "the square's tower is not a counted building"; relief drawn at
fixed iso-levels (walkers start at Poisson seeds); the tide-line count; the population label's rounding; the outline formula's
exact form; Perlin tables "pooled at start-up".

---

## §1 Class map by package

**Entry point and call order** `[READ]`: `Main` (constructor) time-seeds the stream, then starts the scene framework on
`VillageScene`. The scene's first layout calls `restoreVillage` → `Blueprint.fromURL` (or `Blueprint.random`) → `createVillage`,
which loops *construct `Region` → on any thrown error log "ERROR: …" (VillageScene.hx:275) and `Blueprint.adjust` → retry*, then
`recreateView` → `VillageView`. `Region`'s constructor runs, in order: `createElevation` (River or Confluence first, then
Elevation) → `createWater` → `createDensity` → `Water.findDockable` → `initHighway` (unless `isolated`) → `Palisade` (if tagged)
→ `roll` → `Blueprint.updateURL`. `roll` runs: stream reset → `buildNetwork` (`Network.build`) → `placeBuildings` →
`spawnFields` (`Farmland`) → `rollForest` (`Forest`, which lazily completes the fields) → `updateTags` → grammar init → stream
reset → name → population → `Legend`.

Counts from the class map: `com.watabou.village` 70 entries (68 classes + 2 enums), `geom` 25, `utils` 19, `coogee` 57; plus
`tracery` 10, `nlp` 2, `system` 3, `formats` 4, `processes` 2 (extracted for the naming stream). Byte sizes are in `classes.tsv`.

### 1.1 `com.watabou.village` (root, 4) and `scenes` (1)
| class | role |
|---|---|
| `Main` | app start: time-seeds the stream, sets the permalink base, launches the scene |
| `VillageScene` | the controller: build/retry loop, keyboard and menu actions, rerolls, layer toggles, exports, marking houses |
| `VillageGrammar` | naming: loads the grammar asset, deck selector, tag flags, "shrink" long one-word names, doubled-letter fixes |
| `Names` | person/fantasy first names and invented syllables from Markov chains over the two given-name lists |
| `JSONExporter` | GeoJSON export at 0.7 m per unit (earth, buildings, prisms, trees, roads with widths, planks, water, squares, palisade, fields) |

### 1.2 `village.model` (22 + 2 enums) and `model.props` (4)
| class | role |
|---|---|
| `Blueprint` | the request: seed, tags, size, tree/road seeds, name/pop overrides, marked houses; draws the seven character parameters; retry rule; URL |
| `Params` | the request-tag vocabulary, the random tag roll, the exclusion groups, one-line tag descriptions |
| `Tags` | the descriptive tag names the grammar reads (21 constants) |
| `Region` | the model and the pipeline: frame and grid, density, highway entrance, houses along roads, wharf and piers, tags, name, population |
| `River` | the meander course (skeleton → Chaikin → sinusoid knots → cubic spline → resample) and its width |
| `Confluence` | a River plus a tributary course and width joining the main course |
| `Elevation` | the 128² height field: fBm, the relief/water primitives, river carving, and the four-vector gradient field |
| `Water` | the level set, the repulsion field, shore chains, water patches and land patches, dockable shore, wharf line |
| `Network` | the road builder: highway, crossroads, square roads, wharf road, isolated start, the tracker rounds, merges, bridges |
| `Tracker` | one road agent: position, heading, type, trail, length limit, bridge state, branching, flexibility |
| `Junction`, `JunctionType` | junction records; kinds branch, highway, merge, square, highway-square, bridge, wharf |
| `RoadType` | highway, regular, trail, square |
| `SquareBuilder` | square placement, shape, orientation, centrepiece, radial roads |
| `Building` | a rectangle with front edge, width/depth, radius, large flag, road test, the Dwellings hand-off |
| `Bridge`, `Gate`, `Note` | small records (bridge span; palisade gate; legend note) |
| `Legend` | settlement class, points of interest, the two console lines |
| `Farmland` | field seeds, Voronoi regions, land clipping, bisection, lot filter, orchard/field choice, field picking, trail repair |
| `Forest` | the cached tree-cell mesh, the per-cell tree test, patches and outlines |
| `Palisade` | the wall: populated lattice → hull → clean → closed spline → resample; raster band; gates; wall segments; gatehouses |
| `props.Prop` / `Tower` / `Tree` / `Well` | square centrepieces; the tower wraps a real, counted Building |

### 1.3 `village.utils` (6)
| class | role |
|---|---|
| `Bisector` | recursive polygon bisection with right-angled, optionally bent cuts (fields) |
| `PolyUtils` | polyline segment-at-distance, resampling, Laplacian smoothing, offsets, miter inset, vertex jitter, shape/curve overlap |
| `BitMap` | rasterises a drawn shape 1 unit per pixel into a boolean mask (the palisade band) |
| `Bloater` | turns a polygon into a billowing outline by recursive perpendicular midpoint bumps (cloud crowns, thickets) |
| `Spiker` | spiky (conifer) and frond (palm) outlines |
| `Outline` | bitmap outline effect for the view |

### 1.4 `village.mapping` (23) and `mapping.buildings` (4) — the renderer
| class | role |
|---|---|
| `VillageView` | layer stack and draw order, exports (PNG ≈ 16.7 M pixel budget, SVG), plate placement, persisted layer toggles |
| `ReliefLayer`, `LevelsView`, `NewGrass`, `Hachures`, `Contours` | relief: contour-following walkers from Poisson seeds; three mark styles |
| `Shading` | hillshade from the model's gradient field (two 128² bitmaps, multiply and add, blurred) |
| `DramaticLight` | the spotlight: two radial gradients centred on the heart (or centre / sun edge) |
| `WaterView` | stone rim, deep fill, shallow bands, tide lines, bridges and piers |
| `RoadsView` | roads by type (trails dotted), junction corner fills ("merges"), driveways |
| `FarmlandView` | field fills, bowed dashed furrows, orchard rows or Poisson orchards |
| `ForestView`, `TreeType` | tree rings and thicket fill, crown prototypes (cloud, pine, palm) cached by radius, tree shadows |
| `BuildingView`, `FlatRoof`, `GableRoof`, `HipRoof`, `RuinRoof` | roof colour draw and roof styles; entrances; lit windows; towers on large houses |
| `Style`, `RandomStyle` | the palette-backed style state (~40 keys, outline/detail colour rules); a random palette generator |
| `BridgeView`, `PalisadeView`, `ShadowLayer`, `LightLayer` | planks/piers; posts and gate shadows; cast shadows; night lights |
| `MapPlate`, `GridLayer`, `NumbersLayer` | title plate (population to two significant figures); grid (auto-sized); house numbers |

### 1.5 `village.ui` (6)
`DramaticForm`, `GridForm`, `PlateForm`, `TagsForm` (tag editor and predefined sets), `TreesForm`, `URLForm` — dialogs only.

### 1.6 `com.watabou.geom` (19) and `geom.polygons` (6)
| class | role |
|---|---|
| `PoissonPattern` | toroidal dart-throwing: 50 candidates per active point in an annulus [r, 1.1 r]; optional jitter; tiling fill |
| `VoronoiPattern` | periodic Voronoi of a seed tile (8 translated copies) with seam vertices shared; tiled over a rectangle |
| `Delaunator` | Delaunay triangulation (Mapbox algorithm) and Voronoi cells as circumcentre loops |
| `DCEL`, `HalfEdge`, `Face`, `Vertex`, `EdgeChain` | half-edge mesh of cells; flood fill, interior/border sets, components, outlines |
| `ConvexHull` | Melkman hull of a simple polyline; hull of a point set via extreme-point culling and angular sort about the origin |
| `Cubic` | cubic Bézier smoothing of open (with mirrored ghost ends) and closed polylines |
| `Chaikin` | corner cutting at ¼ and ¾, open or closed, with pinned points |
| `PathTracker` | arc-length walker over a polyline |
| `GeomUtils` | line–line intersection parameters; point interpolation |
| `Circle`, `Segment`, `FillablePoly`, `FillableRect`, `IFillableShape`, `Color` | small types; colour arithmetic (scale, multiply, hard light, HSV lerp) |
| `PolyCore` | area, perimeter, length, vertex mean, area centroid, least-significant vertex, tangent |
| `PolyBounds` | bounding rect/box, enclosing circle, minimum-area oriented box, point-in-polygon (with a parity flag), shape overlap |
| `PolyBool` | intersection/difference of two simple polygons returning a single ring |
| `PolyCut` | line–polygon crossings; cutting a polygon by a line |
| `PolyCreate` | rectangle, regular polygon, buffered stripe around a polyline |
| `PolyTransform` | translate / scale / rotate, copying or in place |

### 1.7 `com.watabou.utils` (17 + 2)
| class | role |
|---|---|
| `Random` | the Lehmer generator and its reset |
| `ArrayExtender` | uniform pick, weighted pick, insertion shuffle, fall-off pick, set helpers (draws through the generator) |
| `Noise`, `Perlin` | fBm of Perlin octaves; 2-D gradient noise with a seed-rotated permutation and a quintic fade table |
| `MathUtils` | clamp, wrap, signed power |
| `BinGrid` | fixed-bin spatial index with clamped bins (20-unit bins here) |
| `PointExtender`, `SetUtils`, `StringUtils` | projection parameter and copy; object sets; capitalisation |
| `Palette`, `ColorNames`, `ParamType`, `GradUtils`, `GraphicsExtender` | palette storage and weighted colour pick; colour names; drawing helpers (dashed lines, polygons) |
| `Updater`, `_Updater.*`, `RecurringEventDispatcher`, `LongPresser` | frame/timer plumbing; long-press detection |

### 1.8 `com.watabou.coogee` (57) — the UI framework
`Game`, `Scene`, and the `ui` tree (View, buttons, forms, menus, dialogs, sliders, text inputs, swatches, palette/colour/font
forms, tag views, layout boxes, tabs). Grep-verified: no generator draw, no clock read, no model access. Not read in full (§9).

### 1.9 Also extracted
`tracery` (Grammar, Tracery, RuleSet, RuleSelector, DeckRuleSelector, Symbol, ExtSymbol, TraceryNode, NodeAction, ModsEngBasic),
`nlp` (Markov, Syllables), `system` (URLState, State, Exporter), `formats` (GeoJSON, SVG, SVGPath, Sprite2SVG), `processes`.

---

## §2 The pipeline as coded, stage by stage

Notation used below (our names for the reference's recurring draws): **u** = one uniform draw in (0, 1); **B3** = the mean of three
uniforms (a Bates-3 bump on [0, 1], mean ½); **F4** = |(sum of four uniforms) ÷ 2 − 1|, a *folded* draw on [0, 1] piled toward 0
(mean ≈ 0.28); **S** = B3 × 2 − 1, a signed bump on [−1, 1]. Units are map units; the default map is 500 × 500 view units
(`Blueprint` default size), so the half-view is 250 and the **real frame** adds a 48-unit margin on each side (half-width 298,
width 596). The **grid** is always 128 × 128 over the real frame (cell ≈ 4.66 units at the default size). Every "per cell" lookup
converts a point to a cell by truncation; points outside the real frame are guarded explicitly at every lookup.

### 2.0 The build loop and the retry — `VillageScene.createVillage`, `Blueprint.adjust` `[READ]`
A village is built by constructing the region; **any exception thrown anywhere in the construction** is caught, printed as
"ERROR: <message>", and the blueprint's seed is replaced by one Lehmer step of itself (reset to the seed, draw once, keep the new
state as the seed); then the whole region is rebuilt. Nothing else in the blueprint changes (tags, size, tree seed, road seed).
Reroll (Shift+Enter) rebuilds with the same blueprint but a road seed taken from the millisecond timer; Enter makes a fresh
blueprint; Ctrl+T sets the tree seed from the timer and re-runs only the forest; Shift+T toggles trees; the tags dialog builds a
blueprint from the chosen tags and size. There is **no bound on retries** (the loop runs until a build succeeds).

### 2.1 Blueprint — the request and the character parameters (`Blueprint` constructor, `Params`) `[READ]`
* **Seed.** Given (URL/dialog) or, for a new village, the **next state of the running stream** (the raw integer state is the seed).
* **Tags.** Given, or rolled from the running stream by `Params.randomTags`, in this order: `district` p 0.05; a density tag p 0.2
  (sparse or dense, even odds); a water tag p 0.666 (weights river 3, coast 2, island 1, pond 1, confluence 0.5, estuary 0.5);
  `grove` p 0.5 with a pond else 0.1; `organic` p 0.1; `no square` p 0.4 on an island, 0.8 with other water, 0.6 dry; then, unless
  island: p 0.3 a through road (`crossroads` p 0.3 else `highway`), otherwise p 0.2 `dead end` (which removes `no square`);
  finally, unless `district` or water, `palisade` p 0.3 if dense else 0.2.
* **Resolve.** `Params.resolve` appends `isolated` when no road tag (isolated / highway / dead end / crossroads) is present. When a
  tag is *added in the dialog*, the same routine removes the other members of its exclusion groups: {sparse, dense}; the six water
  tags; the four road tags; {farmland, uncultivated, no orchards}; {island, highway, dead end, crossroads}; {no square, dead end};
  {palisade, district}. The 20 request tags are farmland, uncultivated, no orchards, district, organic, no square, grove, palisade,
  sparse, dense, river, coast, island, pond, confluence, estuary, isolated, highway, dead end, crossroads.
* **Derived fields.** density factor 0.5 / 1 / 2 (sparse / none / dense); water type = the first water tag; size sticky across
  villages. Then the stream is **reset to the seed** and seven parameters are drawn (in this order):
  minWidth = 8 + 2·B3 · maxWidth = 10 + 4·B3 · ratio = 1.2 + 0.6·B3 ·
  minBlock = ½(minWidth + maxWidth) · (4 + 8·B3^1.5) · rigidness = 0.05 + 0.2·F4 · minRoad = 8 and maxRoad = 10 (constants) ·
  fieldFactor = 1, ×4 with `farmland`, 0 with `uncultivated`; `organic` sets rigidness to 0.
* **URL.** `seed`, `tags`, and when they differ from defaults `width`, `height`, `trees` (tree seed), `roads` (road seed), `name`,
  `pop`, `marked` (numbered houses); `style` is read on load. The tree seed defaults to the seed.

### 2.2 The region frame (`Region` constructor) `[READ]`
Logs the seed and tags, **resets the stream to the seed** (the terrain stream), computes the half-view, the real frame (+48), the
`size` = 2·√(half-view W · half-view H) (500 by default), the aspect ratio, and the 128² grid. Stage order is as in §1.

### 2.3 River course and confluence (`River`, `Confluence`) — first draws of the terrain stream `[READ]`
* width = 20 + (¼ · min half-view − 20) · B3² (20 to 62.5 at the default size, median ≈ 31).
* r = the half-view diagonal + width. Entry angle a = π·u; entry point at (r, a); exit point at (r, a + π·(0.5 + u)) — entry and exit
  are 90°–270° apart around the centre, so the course bends at the centre by up to 90° either way from a straight crossing.
* Axis = Chaikin cutting, two passes, of the three points entry → **map centre** → exit (3 → 4 → 6 points).
* phase g = u; wavelength λ = width · 2^(3.5 + B3²) (≈ 11–23 widths).
* A knot at arc length s on the axis is the axis point pushed along the axis normal by
  width · (2 or 5, even odds) · √B3 · cos(2π(s/λ + g)).
* Knots: one at s = 0; then from s₀ = λ·(½ − g) if g < ½ else λ·(1 − g) — the first cosine extremum — every λ/2 while inside the
  axis; one at 0.999 of the axis length. Consecutive knots therefore alternate sides with independent amplitudes (the profile's
  observed "1/6, 5/2 …" branch splits are the 2-or-5 choice).
* Course = cubic smoothing of the knots at 8 points per span (`Cubic.smoothOpen`), then resampled every **½ width**.
* **Confluence:** tributary width = main width · (1 − ½·F4). Its source point lies at radius r opposite the midpoint of the main
  course's chord, rotated by ±60°·S; its axis = Chaikin (two passes) of source → half-way point → the main course vertex nearest
  the source, resampled at the tributary width; each vertex is pushed along its normal by a sine of wavelength
  trWidth·2^(3.5 + B3²) shaped by a signed power, with an amplitude 5·trWidth·√u that decays linearly to zero at the junction;
  then Chaikin (two passes) and a resample at the tributary width.
* `estuary` uses the plain River course; `wetland` exists in the code but is not reachable (not in the water-tag list).

### 2.4 Elevation (`Elevation`) `[READ]`
* **Base field.** persistence p = 0.30 + 0.15·F4; fBm of **5 octaves**, base frequency 1, lacunarity 2, amplitudes 1, p, p², …
  Each octave is a Perlin instance whose permutation is the reference 256-table **rotated by (new stream state mod 256)** — one draw
  per octave. Sampled at cell (col, row) as noise(col/128 · 2√ratio, row/128 · 2/√ratio) — i.e. a 2 × 2 noise domain over the map
  (×3 for the unreachable wetland).
* **One primitive** (grid-fraction coordinates; "mount" = a Gaussian bump amplitude·exp(−(sharpness·ρ)²) with anisotropic ρ):
  * no water: type ∈ {plain, plain, hill, hill, ridge, valley} uniformly. Hill = a mount at (B3, B3), sharpness 1 + B3, amplitude
    2 + 2·B3. Ridge / valley = a Gaussian ridge (±) along a line through the centre at angle π·u, sharpness 1 + B3, amplitude
    ±(2 + 2·B3).
  * coast: a signed smoothstep ramp across a circle of radius b = 2^(2·F4) (1–4 half-map units) whose centre lies at distance b from
    the map centre in a random direction — so the ramp's zero line is a circular arc **through the map centre**; amplitude 2^(1+S)
    (1–4), sign flipped with p 0.3.
  * pond: a negative mount (amplitude −1.5 − B3) whose centre is offset from the map centre by up to half the grid in a random
    direction (a Bates-distributed radius, so usually near the centre), sharpness 1 + 2·F4.
  * island: a positive mount at the centre, sharpness 1 + 2·F4, amplitude 2 + F4.
  * river: **carve** — for each cell, d = the exact distance from the cell centre to the course polyline (a linear scan of all
    segments); bank radius R = ½·width·(2 − h), h = the cell's normalised height; new level = min + (d − R) inside the channel
    (below the old minimum) or min + (level − min)·ln(d/R)/2 outside — a logarithmic valley whose floor widens where the land is low.
    The old minimum is kept as the river's water level.
  * confluence: the same with two distances blended into each other near the junction (each pulled toward the other by the square
    of its share), the tributary's radius ½·trWidth·(1.5 − ½h), water cells set to exactly one below the old minimum, and a /4
    logarithm outside.
  * estuary: a coast-like circle ramp (circle toward the river's entry side, radius 2^(2·F4), amplitude 2^(1+S)) plus, wherever
    the ramped level stays above the minimum, a carve whose half-width is multiplied by 1 + (k − 1)·(1 − ramp)², k = 2^(2·B3) —
    up to 1 + 4(k − 1) on the sea side — and a /10 logarithm outside.
* **Vertical scale.** height = ½·size/(max − min) × (0.1 + 0.9·X), X = B3 for hills and islands, F4 otherwise.
* **Gradient field** (`createGradient`): for each of the 127² interior cells, the surface normal from the two forward
  differences (scaled by the vertical scale) — this is where the profile's 16 129 cross products happen, in the model, once.
  Each cell stores **four vectors**: uphill and downhill (the normal's horizontal part scaled by the square of its vertical part,
  so they shrink on steep ground) and the two contour directions (the horizontal part turned ±90°, unscaled). The last row and
  column are copies. Roads, the square, relief marks and hillshade all read this array; nothing samples the noise again.
* Descriptive terrain tags come from the type: plain → PLAIN, hill or ridge → HILL, valley → VALLEY; water maps get none.

### 2.5 Water (`Water`) `[READ]`
* **Level** (the water mask = cells whose level is below it): coast min + (0.3…0.5)·range; island min + 0.6·range (the sea
  surrounds the mount); pond min + 0.2·range; river, confluence, estuary: the pre-carve minimum.
* **Flags and sizes.** Coast and island: navigable, not fordable. Pond: neither. River, confluence, estuary: both. shallowSize
  (used for bands, bridges, piers) = river 20 + √(width − 20); coast/estuary 40·(1 + F4); island ⁴√(half-W·half-H)·(2 + F4);
  pond ⁴√(…)·(1.5 + B3). Max pier length = ½ river width on rivers, unlimited otherwise.
* **Repulsion field** (`createDeflection`, radius 16 cells = grid/8): for each *land* cell, the sum over every water cell within
  16 cells (disc) of the unit vector from the water cell to this cell divided by the distance, normalised by π·16²·cell size;
  null when no water is in range. It is used by the highway entrance (§2.7), bridge headings and every road's water term (§2.10).
* **Shore chains** (`buildCurves`, `linkSegments`): every water-cell side that faces an in-grid land cell becomes a directed
  segment on the cell lattice (sides on the grid border are not emitted, so chains end on the frame); segments are chained by
  shared lattice points (closed rings for enclosed water, open chains otherwise), relaxed twice (once for ≤ 4 points) by the
  ¼–½–¼ Laplacian that keeps both ends fixed, then resampled every **3 cells** (kept only if the result has > 4 points).
* **Patches** (`createPatches`): closed chains become polygons; open chains are closed by walking the frame border clockwise from
  a chain's end to the next chain start (adding the frame corners passed). Land patches are the same walk on the reversed chains
  (positive area kept). For an island whose shore never touches the frame, the frame rectangle is added as a water patch.
* **Dockable shore** (`findDockable`): on the longest chain, the maximal run of consecutive in-frame vertices with positive density
  that contains the densest vertex.

### 2.6 Density (`Region.createDensity`) `[READ]`
* Reference point c: polar(min half-view · S, π·u) — anywhere in the inscribed disc, concentrated at the centre.
* Reference height d: the level at c; **if c lies in water**, the highest level found on any in-frame shore-chain vertex (this is
  the profile's rare "273-B arm": its loop visits every vertex of the chains, and the 138-of-142 inner count is the in-frame
  test failing on the four chain ends that lie exactly on the frame).
* Per cell: q = clamp(1 − 2·|d − level| / (max − min), 0, 1) — an elevation band.
  Default: q′ = clamp(popFactor · (q + 1.5·(1 − ρ/(64·f)) − 1), 0, 1), ρ = the cell's distance from the centre cell, f = half-view ÷
  real half-width (so 64·f cells = the view's half-width); **density = smoothstep(q′)**. `district`: density = q^(1/popFactor)
  (no radial term — the whole frame is town).
* Consequences `[INFERRED]`: with q = 1 the centre reaches smoothstep(min(1, 1.5·popFactor)) — 1 by default and when dense, ≈ 0.84
  when sparse; density reaches 0 at or before the view edge; the
  band term makes villages follow the contour through the reference point (along a shore when that point is wet).
* Related: `Region.getPopulated` walks outward from the centre on a spiral of random angles, radius ×1.1 per step from half a cell,
  skipping water, and returns the densest point seen before density first reaches 0 or the frame ends. It seeds the dead-end
  highway, the square and the isolated village. `Region.getHeart` = the centre of the densest house; only the spotlight uses it.

### 2.7 Highway entrance and palisade (constructor tail) `[READ]`
* Entrance (`initHighway`, `randomEdge`): a random direction, stretched by the aspect ratio, pierces the **view** rectangle from the
  centre; on water maps it is re-drawn until the point one unit inward is neither water nor inside the repulsion field's reach.
* Palisade (`Palisade`, only with the tag; it is built **before any road**): lattice step = size/20 (25 units), a lattice of
  round(half-view/step) = 10 × 10 points over the view, each jittered inside its cell by 0.1 + 0.8·B3 per axis, kept with probability
  density − 0.1; fewer than 3 kept → error "Not enough population density to build a palisade". Convex hull of the kept points;
  then repeatedly drop the flattest vertex while its triangle's 2·area / (neighbour distance)² < 0.1; closed cubic smoothing at
  12 points per span; resampled every 24 units (the last point dropped if within 12 of the first). The **overlap test** rasterises
  the wall line drawn 24 units wide (1 unit per pixel) and looks up the pixel — i.e. "within 12 units of the wall".

### 2.8 Roll and the road network (`Region.roll`, `Network.build`, `Tracker`) `[READ]`
The **roads stream** is reset to the road seed if set, else the seed. The network holds every tracker's trail as a road.
* **Highway** (unless isolated). Start at the entrance, heading toward the opposite side of the map, target = the point opposite the
  entrance; with `dead end` the start is `getPopulated` instead (and the square is built there). Step 5. Each step:
  leaving the frame with an open bridge → error "Unfinished bridge on the highway"; entering water → if bridges are allowed (fordable
  water) open a bridge heading into the water against the repulsion vector, else error "The highway is terminated by water"; on
  land → close any bridge (a bridge junction at its middle), error "The highway intersects itself" if its own trail lies within 5
  units ahead, then steer: best-aligned gradient vector × 0.5, water term while heading toward water (repulsion × 50 if bridges are
  not allowed, × −200 — an *attraction* — if they are), target pull 0.2·√(distance ÷ size), a push of 1 along the wall normal while inside the palisade band;
  add to the heading and renormalise.
* **Crossroads**: at the dry highway point nearest the centre, one or two perpendicular branches (see branching below) typed as
  highways.
* **Square** (§2.11) — before the highway's side roads.
* **Highway side roads**: every interior highway vertex, in shuffled order, with density > 0, dry, outside the square and with no
  junction within minBlock ÷ density, gets perpendicular regular branches.
* **Palisade gates on the highway**: at every crossing of the finished highway with the wall, a gate (shifted ≤ 1 unit along the wall).
* **Wharf road** (`spawnWharf`, §2.13; only with a dockable shore), then the square if none exists yet. **Isolated start** (`spawnIsolated`, only if isolated and
  no tracker exists yet): a square if possible; otherwise, at `getPopulated` (error "*** Failed to find an place for an isolated
  village!" if none), two opposite regular roads along one of the four gradient vectors chosen at random, plus each of the two
  perpendiculars with probability ½·density.
* **Rounds.** Every live tracker advances 5 units per round, in list order:
  * off the frame → stop (an open bridge is cancelled);
  * on water → without an open bridge, record the previous point as a landing; with an open bridge longer than 3·shallowSize → cancel and stop; without a
    bridge → if the tracker may ford (roads may, trails may not) and no bridge end lies within shallowSize·(1 + bridges so far),
    open a bridge heading against the repulsion vector at the previous point (stop if there is none); else stop;
  * on land → close an open bridge if its end passes the same landing test (else roll the trail back and stop); stop if the wall
    blocks (below); if any road point lies within 5 units ahead (this includes the tracker's own trail), **merge**: snap the last
    point onto it, smooth the previous vertex, record a merge junction, stop; otherwise **steer**: best-aligned gradient vector ×
    flexibility (highway 0.5, road 1, trail 2), water term (+50 if repelled, −100 if attracted), pull 0.1·distance/max(frame) toward
    a target if any (none in practice: the wharf road is spawned without one), ±0.5 along the wall normal inside the palisade band. A regular road applies the sum only if its component across
    the heading exceeds **rigidness**; trails and highways always apply it;
  * then, by density at the new point: a regular road on density ≤ 0 stops and a **trail** continues from there; a regular road with
    no junction within minBlock ÷ density **branches** (stops; one side, both sides or the other side with thirds each, plus a
    continuation with probability 0.9 if one side, 0.1 if two); otherwise a trail longer than its limit stops and is marked an
    **approach** (a farmstead goes at its end, §2.12). Square trackers are registered as roads but never advance.
  * Water behaviour alternates by generation: a tracker created by branching gets the opposite water flag of its parent; after
    completing a bridge a tracker is repelled from water. Trails' length limit = minBlock ÷ F4 (never below minBlock, heavy-tailed).
* **Wall gates for roads** (`Palisade.blocks`): if the wall crosses the next 5 units of the heading, a road (not a highway) needs the
  crossing to be at least max(perimeter/6, ½π·minBlock) along the wall from every existing gate; if so a gate is added (and the
  wall polygon gets the gate point), else the road stops at the wall.
* **Finish.** Where a branch produced exactly one road (a single side road and no continuation — a right-angled turn), the corner
  is cut: the new road's first point moves toward the midpoint of its neighbours. **Streets** = every road that is not a trail, ordered by creation; all roads enter a 20-unit bin index. The wall is split at
  its gates into segments (error "Palisade has no gates" if none); on water maps the wet parts are cut out and pieces that touch no
  gate are dropped.

### 2.9 Validation failures — every throw site in the build `[READ]`
Highway: unfinished bridge, terminated by water, intersects itself. Region: "No buildings"; "Palisade sourrounds no buildings" (no
ordinary house inside the wall). Network: "Square is not completely inside the palisade"; the isolated-start failure. Palisade:
too few populated samples; no gates. Bisector: "CRITICAL: A bad poly was provided for besecting". Each is caught by the scene loop
and retried with the next Lehmer seed (§2.0). (The spelling slips are the reference's.)

### 2.10 The square (`SquareBuilder.build`, `place`, `addCenterpiece`) `[READ]`
* Radius = maxWidth · n / 2π with n ∈ {12, …, 19} uniform — the rim holds 12–19 of the widest ordinary houses.
* Centre: with `dead end`, the highway's start (the populated point), oriented along the highway tangent there. Otherwise
  `getPopulated`; if a highway exists and passes within two radii of that point, the square moves to the **densest dry highway
  vertex** (when its density is positive) and takes the highway's tangent as its orientation.
* Shape: round with probability 0.9 on water maps, 0.7 otherwise — a regular polygon with one vertex per ~5 units of
  circumference and a random rotation (the recorded 44-gon = radius ≈ 35); else a square of side 2·radius resampled every 5 units.
  It is **stretched by 2^|contour vector|** along its x-axis (up to ×2 on steep ground), then rotated to the contour direction at the
  centre — or to the highway tangent when one was taken — and moved to the centre.
* Water: if the shape intersects any water patch there is **no centrepiece**; otherwise a centrepiece at the centre: with
  probability 0.1 (round) / 0.5 (square) a **tower** — a square footprint maxWidth·(1 + F4)·ratio on a side, turned by a random
  multiple of 90° from the orientation, a real house marked large with triple height; else even odds between a **tree** of radius
  6·(2 − F4) and a **well** of radius 3.
* The square is registered as a road of its own type; where its rim comes within 5 units of the highway, highway-square
  junctions are recorded. Its vertices, in shuffled order, each start an outward regular road (along the rim normal) when dry and
  no junction lies within minBlock·min(1, perimeter/(5·minBlock)) ÷ density.
* "Not completely inside the palisade" is an error, not a clip.

### 2.11 Houses (`Region.placeBuildings`, `buildAlong`, `spawnAt`, `validateBuilding`, `Building`) `[READ]`
* Order of insertion: palisade gatehouses (minWidth × (minRoad + 2·minWidth), across each gate) and, on water maps, wall-end towers
  (minWidth square) — all height 15; the square's tower; farmsteads; houses along the wharf; houses along streets.
* **House sizes.** "Large" draw: width = maxWidth·(1 + 3·F4), depth = width·ratio·2^S. Ordinary: width uniform in
  [minWidth, maxWidth], depth = width·(1 + 2(ratio − 1)·u). A running `largeCount` starts at 3 and grows with each large house.
  (Separately, a house is flagged *large* for roofs and the wall test when both sides exceed 2·maxWidth.)
* **Farmsteads** (`spawnAt`): at the end of every approach trail, a house (large with probability 1/largeCount) whose front edge is
  centred ½·minRoad beyond the trail's last point, facing along the trail. Accepted → it becomes the trail's destination.
* **Frontage** (`buildAlong`): along a polyline, starting maxRoad + minWidth·B3 from its start: draw large (p 0.15/largeCount) or
  ordinary dimensions; take the chord of the polyline from the current arc length to arc length + width (stop past the end); accept
  with probability density(chord midpoint) × multiplier (2 on the square's rim, else 1); the house's front edge is centred on the
  chord midpoint pushed along the left normal by offset·(1 + F4) (offset 10 on highways, 8 otherwise), its width along the chord, its
  depth away from the road; if valid, keep it, and give it a **driveway** to the road with probability ((width − minWidth) /
  (maxWidth − minWidth))² (not on the wharf); advance by width + minWidth·B3 whether or not a house was placed. Every street is
  walked in both directions (both sides); the square's rim only outward.
* **Validity**: no overlap with a house whose centre is closer than the sum of radii (true polygon overlap, via the 20-unit bins); no
  crossing of any road's polyline near the house (the square as a polygon); at most 1 corner in water on fordable water (2 for
  farmsteads), 0 otherwise; no corner within the palisade band, and a large house's centre not in it either. **No field test** —
  fields are built later and give way to houses.
* **Errors**: no house at all; a palisade with no ordinary house inside.
* Hand-off to the house generator (`Building.open`): seed = village seed + house index; plan 1–11 × 1–11 cells at 4 units per
  cell; "tall" only for the tower.

### 2.12 Wharf and piers (`Region.buildWharf`, `buildPiers`, `buildOrphanPier`, `Water.getWharf`) `[READ]`
* Only on navigable water with a dockable shore. pierLength = shallowSize·1.5^S; the wharf line is the dockable run, Chaikin-cut
  twice and resampled at an even step near pierLength·(1 + F4), with the part within that step of any bridge end removed (the
  longer remainder kept). **No wharf if pierLength exceeds the maximum pier length — on rivers ½·width**, so narrow rivers never get
  one; coasts, islands and estuaries have no maximum; ponds are not navigable.
* The wharf road starts where the inland normal at the densest wharf vertex leaves the water.
* Piers (after houses): target count = 1 + stochastic rounding of √(5·houses / (4·pierLength)); the wharf is trimmed from a random
  end (never the densest vertex) down to that count; each remaining vertex gets a pier of pierLength along the outward normal when
  the point 1.5 pier-lengths out is water, it crosses no earlier pier, and no bridge end is within shallowSize. Without a wharf,
  every landing point (where a road met water) that is clear of bridges gets one pier of shallowSize·(1 − ½F4) if within the maximum.

### 2.13 Fields (`Farmland`, `Bisector`) — fields stream, finished lazily in the forest stream `[READ]`
Constants: fieldSize 120, croftSize 50, minimum region area 50², 1 000 area units per house.
* **Seeds** (spacing = 120 + (50 − 120)·√min(density, 1), a seed kept only if farther than that from every kept seed): along the
  highway (resampled at 16, simplified keeping 99.9 % of its length, resampled at 120); along every shore chain (at 120); and,
  except on islands, a ring of ⌈2π·250/120⌉ = 14 points of radius size/2 around the **houses' centroid** (rotation u radians).
* **Regions**: Voronoi cells of the seeds (a 9-gon frame at twice their enclosing radius closes the outer cells); ponds are
  subtracted; the cells are intersected with the land (the two half-planes of the highway — a 12-gon split along it — and the land
  patches); regions under 50² dropped; with a palisade, cut at ±minRoad around the wall.
* **Lots**: each region is bisected (§3.10) with a minimum area of (120 + (50 − 120)·√density)²·2^S, variance 3, and bends rounded
  by circular arcs with ~minRoad segments; each piece is inset by ½·minRoad; kept if it has ≥ 4 vertices, an in-frame centroid,
  area ≥ 0.55 of its oriented box and box aspect ≥ 0.4.
* **Choice** (first read of the fields — inside the forest stage, after the tree-seed reset): lots touching the square or containing a
  street vertex are dropped; lots overlapping an ordinary house (not a farmstead) become **orchards** with probability
  √density(centroid) (never with `uncultivated` or `no orchards`) or are dropped; the rest are candidates. Fields are then **picked
  by greedy growth** from the houses' centroid — repeatedly the candidate minimising (key of a picked lot + the smallest
  vertex-to-vertex gap to it), a picked lot's key being its centroid's distance to the centre — until the picked area reaches
  houses × fieldFactor × 1 000.
* **Trail repair** (`fixTrails`): every trail is cut at its first vertex inside a picked field; its farmstead is rebuilt with the same
  size where the trail meets the field edge, facing the edge.

### 2.14 Forest (`Forest`) — forest stream `[READ]`
* **Mesh** (cached per real-frame size for the session): a Poisson tile (distance 12, 96 × 96, jitter 0.8·12 after generation) →
  periodic Voronoi → cells tiled over the real frame; cells whose vertex-mean lies inside the frame kept, each with its centre and
  its **inscribed radius** (the distance from the centre to the nearest cell vertex); rebuilt until the half-edge mesh has no
  degenerate edge. The draws come from whichever stream is current when the first village of that size is built (§4.4).
* **Roll** (reset to the tree seed): complete the fields (above); a 6-octave fBm (persistence ½) and four offsets S/2. For each
  cell centre: dry; density test — `grove`: density > 0, else a draw below √(1 − density); in the default "some trees" mode,
  **domain-warped noise** > 0 (the noise read at the point displaced by half of two other noise reads, each at its own offset;
  coordinates normalised to [0, 1] over the larger frame half); **clearances** — every house within 6: distance − 6 must exceed
  (0.5 + B3)·house radius; not inside any field or orchard; not inside the square; no vertex of a non-trail road within 12; not
  within pierLength of a pier root; not in the palisade band. Kept cells are shuffled. Modes: none / some / many (many skips the
  noise); the mode is a per-browser setting, not part of the permalink.
* Patches = connected kept cells (flood fill over twins); their outlines are the view's thicket edges.

### 2.15 Descriptive tags, name, population, legend (`updateTags`, `VillageGrammar`, `Names`, `Legend`) `[READ]`
* Tags for the grammar: NO_WATER or WATER (+ WHARF, + BRIDGE), per water type SHORE / RIVER / FORK / MOUTH / ISLAND / POND;
  HIGHWAY (+ JUNCTION with crossroads); PALISADE; SQUARE; PLAIN / HILL / VALLEY (dry maps only); FOREST unless trees are off;
  **LARGE above 20 houses, else SMALL**; DISTRICT. The grammar receives them upper-cased. The shipped grammar gates one rule on a
  misspelled junction flag, so that rule can never be chosen (the grammar asset in this capture, checked by search).
* Naming stream: reset to the seed; name (grammar symbol "village"; a one-word name longer than 12 letters or 3 syllables loses a
  random interior syllable until it fits, then ten doubled-letter clean-ups); population = **round(houses × (3 + 4u))**; then the
  legend.
* Legend: class = hamlet (< 20 houses, no highway) / roadhouse (< 20 with a highway) / village (< 200) / town (< 1 000) / city;
  qualifier "island", or with a **wharf** "coastal" (shore) or "riverside" (river; wins if both). Candidate places by class (village:
  an inn if highway; a tavern, a second with p ½; basic shop p 0.2; smithy p 0.7; temple p 0.1; a special; towns add more), plus
  ⌊u·⌈log₁₀ pop⌉⌋ persons; a random subset of **stochastic-round(ln(houses/5))** places (at least 1 unless a hamlet), each named by
  the grammar and pinned to a random house. Names are drawn without replacement per symbol within a village (deck selector);
  invented names come from order-2 phoneme Markov chains over the two given-name lists.
* The plate prints population rounded to two significant figures (zero shows a random 1–9).

### 2.16 The view, as far as it shapes what a map shows (`VillageView` and the mapping classes) `[READ]`
* **Layer order** (bottom → top): relief, roads, fields, hillshade, water, cast shadows, night lights, houses (palisade first, then
  houses, then square props), orchards, trees, spotlight, grid, numbers; the title plate sits on the screen, placed in whichever
  corner covers the fewest roads. The ground colour (the palette's first ground entry) is the stage background and the PNG fill —
  there is no ground polygon.
* **Relief** (`ReliefLayer` + one walker class): seeds from a Poisson tile (distance 20 per 250 units of half-view, tile 100) tiled
  over the view, visited in random order; from each dry seed a walker steps 2 units along the local contour direction (both ways),
  deleting every seed within 20 of it, until it leaves the frame, meets water, revisits a cell or the slope test fails. Marks: *grass*
  — a slope-aligned tick at each step, alternately longer/shorter, length ∝ slope × |cos(slope, light)| × 2^(random), light or dark
  by facing; *hachures* — a tick uphill of 10 × the uphill vector (so longer on steeper ground) with alpha = the facing factor (skipped
  below 0.1); *contours* — the walked line
  itself with the same alpha. Grass and hachures need slope > 0.1 per unit (contours 0.1 ÷ scale).
* **Hillshade** (`Shading`): per cell, the dot of the (unscaled) horizontal part of the surface normal with the light direction →
  a shadow pixel (alpha 256·(−dot))
  or a light pixel (alpha 128·dot); both 128² bitmaps blurred and stretched over the real frame (multiply / add).
* **Spotlight** (`DramaticLight`): radial gradients centred on the heart by default (or the centre, or the edge opposite the sun),
  radius = the farthest view corner: a light core (opacity 0.2 to half radius) and a darkening rim (0 at half radius to 0.8).
* **Water** (`WaterView`): a stone rim of two jittered, Chaikin-cut strokes (16 wide at half alpha, 8 wide) along every chain; the
  deep fill (patches, one Chaikin pass, frame corners and chain ends pinned); N shallow bands — with L = shallowSize·(8/9 + N/9), pass k (k = 0…N−1)
  resamples the previous pass's lines (the chains for k = 0) at step L·(k + 1)/N and Chaikin-cuts them; the strokes have widths
  2L·((N − h)/N)^1.5 for h = 0…N−1 (hence 3^1.5 : 2^1.5 : 1 for N = 3), the widest drawn on the coarsest lines, colours
  HSV-interpolated from deep toward shallow as they narrow — which is why each band has its own segment count; all masked by the
  water; a shore outline; **one** tide line
  offset 6 (fordable water) or **two** (offset 6, and offset 9 on a 30-unit resample) on coasts, islands and ponds; bridges; piers.
* **Roads** (`RoadsView`): highways wide, roads narrow, trails as dots (dash 1 % of the width, gap 2 widths); the square filled;
  "merges" are corner fills at junctions wherever two joining roads meet at more than ~26°; driveways as flared patches.
* **Fields** (`FarmlandView`): each field resampled at minRoad, jittered, Chaikin-cut, filled with a weighted palette colour
  varied by 2^(variance·S); furrows every ½·minRoad across the short axis of its oriented box, bowed by the offset between the box
  centre and the centroid, drawn with dash patterns from a cache of 20 random ones. Orchards: rows along the box when the lot is
  more than 0.7 rectangular, else a Poisson fill; spacing 6·(2.6 − 0.6·density); tree radius 6·(1 − 0.4·F4); trees too close to
  houses skipped.
* **Trees** (`ForestView`, `TreeType`): up to three rings of individual crowns peeled from each patch's border (radius × 1.2 or 1.5 for
  inner rings), the rest filled as a billowed thicket; crowns are prototypes cached per 0.1 unit of radius (cloud = billowed 12-gon,
  pine = spiked, palm = fronds).
* **Colour rules** (`Style`): outline colour = the fill interpolated toward hard-light(fill, ink) by the outline pressure, and pure
  ink at pressure ≥ 1; detail colour = the fill interpolated toward the outline colour by the detail factor.
* **The view draws from the naming stream**: relief seeds and marks, stone rims, field jitter and colours, furrow patterns, roof
  colours and doors, tree colours and sizes all advance the stream after the legend (§4.4).

### 2.17 What the profile's block-level measurements were (P1–P4, N1–N5), now identified `[READ]`
| measurement | what it is in the code |
|---|---|
| `River.new`: two polar points + one new point; Chaikin 3 → 6; k knots; `Cubic.cubic` = 7(k − 1); resample ≈ 93 points | entry/exit on the circle and the map centre; two Chaikin passes; knots every λ/2 plus both ends; 8 samples per span; resample at ½ width |
| the knot closure's two-way split (1/6, 1/5, 5/2, 5/1) | the per-knot amplitude choice 2 or 5 widths |
| "no Random call in the constructor" | all draws inlined |
| `createDensity` 99-B block iff water | the "is the reference point wet?" test |
| the rare 273-B arm, loops 2 × 71, inner 138 | the reference point was wet: scan both shore chains for the highest in-frame vertex |
| the in-loop 24-B branch that never fires | the `district` formula |
| `PoissonPattern.warp` two mirrored if/else-ifs | toroidal wrap of each coordinate |
| `fill` 6 × 6 × ~20 | the relief seed tile (100 units) tiled over the 500-unit view |
| `Tracker.flexibility` four arms, arm 4 never | highway / road / trail / square (squares never advance) |
| `Network.avoidWater` 12-B early exit on dry maps | no water object |
| `endBridge` body = `startBridge` count | each opened bridge is closed once, at the first land step — bridges span as many 5-unit steps as the water needs |
| `findRoadAhead` hit arm = `shortcut` count | merges |
| `Palisade.getPopulated` 10 × 10, kept 13–20 | the jittered lattice kept with probability density − 0.1 |
| `ConvexHull` closure 13–22 | the angular-sort comparator |
| `blocks` = `endBridge` calls; `getClosestSeg` in a 209-B per-step arm | the wall is consulted every step; the closest segment gives the push normal for steps inside the band |
| wall ≈ 0.13 vertices per √pixel | resample every 24 units |
| `BitMap` pixels 284 × 274 … | the wall's bounding box plus the 24-unit line width, 1 unit per pixel |
| gen-3 of `19-03-50`: `getTrackersAround` and `getBuildingsAround` 0 | both are only called by the forest's clearance test (and the orchard tree test); zero calls mean no cell reached that test — `[INFERRED]` the noise test rejected every cell, or trees were switched off in that browser profile |

---

## §3 The geometry toolkit — what each primitive really does `[READ]`

**3.1 Poisson sampling** (`PoissonPattern`). Dart throwing on a **torus** of the given width and height: a background grid of cell
r/√2; the first point uniform; each step picks a random point from the active list and throws **exactly 50** candidates at
distance r·(1 + 0.1u) (an annulus 1.0–1.1 r, much narrower than the textbook 1–2 r) and uniform angle; each candidate is wrapped
into the tile (once per axis) and accepted if no point lies closer than r in the 5 × 5 neighbourhood, distances measured on the
torus; a point with no accepted candidate leaves the active list. Optional "uneven" jitter moves every point afterwards by up to
k·r in a random direction (wrapped), so the minimum distance is no longer guaranteed. `fill` repeats the tile over a shape's
bounds, keeping points inside (a rectangle shape keeps whole tiles). **Edge cases**: the narrow annulus makes the pattern close to
a jittered hexagonal packing; wrap assumes displacements under one tile.

**3.2 Periodic Voronoi** (`VoronoiPattern`). The seeds plus their 8 translated copies are triangulated; each original seed's cell
is kept; cell vertices outside the tile are mapped to the nearest vertex inside it (so a seam vertex is one shared object);
`getRect` instantiates the tile over a rectangle, reusing vertex objects between neighbouring tiles, so the resulting cells form
one consistent mesh suitable for the half-edge structure.

**3.3 Delaunay / Voronoi** (`Delaunator`): the Mapbox sweep-hull algorithm (orientation and in-circle predicates, a 2⁻⁵² epsilon,
edge-flip legalisation); a Voronoi cell = the loop of circumcentres around a point, each circumcentre one shared point object;
cells of hull points are open — every caller adds a frame (copies, a 9-gon, a 12-gon) to avoid them.

**3.4 Half-edge mesh** (`DCEL`): built from polygons that share vertex objects; twins matched through each vertex's outgoing list;
flood fill over twins with a predicate; "shrink" = faces whose every neighbour is in the set; "shrinkExcl" = faces with no
neighbour outside the set (border edges allowed); components; outline = boundary loops (the positive-area loop first, holes after);
a boundary walk that throws after more than three hops around one vertex (a debug guard).

**3.5 Convex hull** (`ConvexHull`, `PolyBounds.convexHull`): Melkman's deque algorithm, valid for a *simple* polyline. The point-set
version first discards points strictly inside the quadrilateral of the four axis extremes, then **sorts the rest by angle about the
coordinate origin**, not about their centroid. `[INFERRED]` edge case: when the origin lies outside the points' hull the angular
order need not be a simple polyline and the result can be wrong; the palisade calls it on lattice samples that normally surround
the map centre.

**3.6 Oriented box** (`PolyBounds.obb`): the minimum-area rectangle over the hull's edge directions (exhaustive over edges), returned
rotated back; the field code re-orders its corners so the first side is the short one.

**3.7 Point in polygon** (`PolyBounds.containsPoint`): crossing parity with a starting flag — called with the flag set it returns the
**complement**, which is how the boolean below tests "outside B".

**3.8 Booleans** (`PolyBool.and`): both polygons are augmented with every edge–edge crossing (shared point objects, sorted along each
edge); with no crossings the containment cases decide (A inside B → A, B inside A → B, disjoint → nothing). Otherwise it starts at
the first crossing on A, checks whether the next edge's midpoint is inside B (else starts on B), and walks, switching polygon at
every crossing, until it closes. **It returns one ring only.** Difference A − B is the same walk with B reversed and the flag set;
with no crossing the difference returns A unchanged when A contains B (a hole cannot be represented) and nothing when B contains A.
`[INFERRED]` edge cases: results with several components lose all but one; touching vertices and collinear overlaps are not
special-cased.

**3.9 Cutting and piercing** (`PolyCut`): `pierce` returns every crossing of the infinite line through two points with the polygon's
edges, sorted by line parameter (negative parameters included — the highway entrance takes the smallest, i.e. the side *behind* the
drawn direction); `cut` splits a polygon by a line at its first two crossings, with optional snapping to vertices and an optional gap
(peeling a strip off each side).

**3.10 Bisection** (`Bisector`) — the right-angle question settled. To split a polygon larger than its minimum area:
1. Box: the oriented box on the first attempt; on attempt k ≥ 1 the axis-aligned box of the polygon rotated by k·36°.
2. Position: the centroid's projection onto the box's long axis (as a fraction of it — this is the only use of the projection helper
   the critics discussed), **averaged with a B3 draw**; the cut line crosses the long axis there, parallel to the short axis.
3. Start: among the polygon edges crossed by that line, the one **most parallel to the long axis**; the cut starts at the crossing
   and leaves **perpendicular to that edge**.
4. If the perpendicular ray meets the far side at an angle within ~5.7° of a right angle (sin² > 0.99), the cut is that straight
   segment.
5. Otherwise (or when the straight cut fails the balance test in 7) a **bent cut**: a bend point on the ray at distance f·t, where
   t = ½ if minOffset/f > ½, else minOffset/f + (1 − 2·minOffset/f)·B3 (minOffset = √minArea, f = the ray's length to the far side); from the bend, the cut goes to the **foot of the perpendicular** on the far edge that is most squarely
   facing the ray and reachable without crossing another edge. So **both ends meet their edges at right angles by construction**.
6. The optional post-processor may replace the bend (fields: a circular arc tangent to both legs, ~minRoad segments; default:
   straighten it when the bend point lies less than 2 units off the chord); if the processed cut leaves the polygon, the raw cut is used.
7. Accept if the larger piece is less than 2 × variance times the smaller (6 for fields); else retry with the next rotation; give up
   after 10 attempts and keep the polygon whole. Degenerate edges (< 10⁻¹⁰) are skipped; a start edge with no reachable far side
   throws the "bad poly" error (a retry of the whole village).
Minimum area: the callback's value, or minArea·variance^F4 when none is set.

**3.11 Smoothing** — three different operators, not interchangeable:
* `Chaikin.render`: corner cutting at ¼ and ¾ of each edge, n passes, open (ends kept) or closed, with an optional list of
  pinned points that are kept as-is.
* `Cubic.smoothOpen / smoothClosed`: a cubic Bézier per span; the tangent at a vertex is the normalised sum of its incoming and
  outgoing unit directions; the handle length is span length ÷ (1 + the two tangents' alignment with the span) — one third on a
  straight line; open curves get mirrored ghost points at both ends that continue the end turn; each span is sampled at n points
  (start plus n − 1 interior; the last point appended once).
* `PolyUtils.smoothOpen`: Laplacian — each interior vertex moves to ½ itself + ¼ each neighbour; ends fixed; vertex count unchanged.
  (The profile's "midpoint-inserting smoothing" does not exist; vertex counts change only through resampling.)

**3.12 Resampling and offsets** (`PolyUtils`): `resample` emits a point every `step` of arc length from the first vertex and appends
the last vertex (replacing the final emitted point if they coincide), so the last segment may be short; the closed variant closes,
resamples and drops the duplicate. `getSegment` returns the chord between two arc lengths. `offsetOpen / offsetClosed` push each
vertex along the normal of the chord between its neighbours by a fixed distance (not miter-correct). `simpleInset` is the proper
per-vertex intersection of the two offset edge lines (collinear vertices are skipped). `warpOpen / warpClosed` jitter each vertex by
up to k × the shorter adjacent edge in a random direction (the stone rim, the field outlines). `testShapeVsShape` / `testShapeVsCurve`:
either polygon contains the other's first vertex, or any two edges cross.

**3.13 Billow and spikes** (`Bloater`, `Spiker`): billow replaces each edge longer than a tenth of the scale by two edges meeting at a
point displaced perpendicular from its midpoint by ½·min(length/scale, 1)·length, recursively — a cauliflower outline; spikes put a
triangle tip outward on every edge (length ∝ √(edge/scale)); fronds do the same with two Chaikin-cut sides.

**3.14 Raster mask** (`BitMap`): draws a display object into a bitmap at 1 unit per pixel and stores "pixel non-zero" per pixel;
lookups round to the nearest pixel and answer false outside.

**3.15 Spatial bins** (`BinGrid`): fixed square bins over a box; objects are inserted into every bin their box touches; indices
outside the box are **clamped to the edge bins**; a query touching one bin returns that bin's own list (not a copy), several bins a
de-duplicated union (linear-time membership test per insert).

**3.16 Noise** (`Noise`, `Perlin`): gradient noise with only the four diagonal gradients (±x ± y), Perlin's quintic fade taken from a
4 096-entry table (so the fade is quantised to 1/4096), the reference permutation rotated by the seed mod 256 — **only 256 distinct
octaves exist** — and negative coordinates shifted by 256 once. fBm sums octaves at doubling frequency and geometric amplitude.

**3.17 Array draws** (`ArrayExtender`): uniform pick; weighted pick by cumulative sums; **insertion shuffle** (each element inserted at a
uniformly random position of the growing output — a uniform permutation, one draw per element); fall-off pick (index ∝ u^k);
subset = shuffle then take. `SetUtils` iterates objects in id order, so iteration is deterministic.

**3.18 Line intersection** (`GeomUtils.intersectLines`): returns both line parameters, or nothing for parallel lines (exact zero test
only). Tolerances across the toolkit are exact-zero or tiny constants (10⁻¹⁰ in the bisector, 10⁻⁴ duplicate vertices in fields,
2⁻⁵² in the triangulator); there is no global snapping.

---

## §4 Randomness `[READ]` unless marked

**4.1 The generator.** One global 31-bit state; a draw multiplies the state by 48 271 modulo 2³¹ − 1 and returns state ÷ (2³¹ − 1)
(never 0 or 1 unless the state degenerates). The product fits a double exactly, so the arithmetic is exact in every JavaScript
engine. Reset with a value sets the state; reset without one uses the wall clock (milliseconds mod 2³¹ − 1). Every draw in the model
is inlined; draws through the array helpers and the grammar go through the function (the only draws a call profiler could see).

**4.2 Draw shapes used everywhere** (our names): u; B3 = mean of 3 (Bates, mean ½, sd ≈ 0.17); F4 = |sum of 4 ÷ 2 − 1| (folded,
mean ≈ 0.28, mode 0); S = 2·B3 − 1; stochastic rounding (integer part + 1 with probability = the fraction).

**4.3 Reset points and streams** (one village; a retry adds one reset in `adjust` and repeats the five from `Region`):
| # | where | reset to | what draws from it, in order |
|---|---|---|---|
| 0 | `Main` (cold load only) | wall clock | the first village's seed and random tags |
| 1 | `Blueprint` | seed | minWidth, maxWidth, ratio, minBlock, rigidness |
| 2 | `Region` constructor | seed | river / confluence course, elevation (5 octave seeds, primitive, scale), water level and sizes, density reference point, highway entrance, palisade lattice |
| 3 | `Region.roll` | road seed, else seed | network (square, branches, trail limits, bridges), wharf, houses, piers |
| 4 | `Farmland` | seed | ring rotation and jitter, lot minimum areas, bisection positions and bends |
| 5 | `Forest.roll` | tree seed | orchard/field choice (the lazy first read of the fields), 6 octave seeds, 4 warp offsets, per-cell tree tests |
| 6 | `Region.roll` (end) | seed | name, population, legend — **and then the whole render**, then the **next village's seed and tags** |
By default **all six streams start from the same state** — the road and tree seeds default to the seed — so their first draws
coincide `[READ]`: on a river map the river width and minWidth are monotone functions of the same three draws; on a dry map the
elevation persistence reuses minWidth's draws plus maxWidth's first; the fields' ring rotation is the same first draw. `[INFERRED]` this couples house size to river width (wider rivers come with wider houses) — a quirk to avoid, not to copy.

**4.4 What depends on interaction history.**
* **The Enter successor** = the next state after stream 6 has served the name, population, legend *and every view draw* (relief
  seeds and marks, stone rims, field jitter and colours, furrow patterns, roof colours, doors, lights, tree sizes and colours). It is
  therefore reproducible across sessions only while the style, the toggled layers and the canvas-independent draw counts are equal
  `[INFERRED]` (the recorded "seed 3131 → 1198911812" on build 19365073 is the default-style value). Every re-render (a style change,
  toggling orchards or buildings, which re-create the view) advances the stream again, changing what the next Enter yields.
* **The tree mesh is cached per real-frame size for the session** and generated from the stream state current at the first build of
  that size (stream 4 after the fields). A permalink therefore reproduces its trees exactly on a cold load, but after other villages
  of the same size have been generated in the session, the same permalink can place different tree cells `[INFERRED from the cache
  rule]`.
* **Reroll** (Shift+Enter) and **tree reroll** (Ctrl+T) take the millisecond timer as the road / tree seed; both are written into the
  URL (`roads=`, `trees=`), so the result is shareable though not repeatable by keystroke.
* **Retry** changes only the seed; the tree seed keeps the requested seed (hence `trees=<requested>` in retried permalinks) and
  the road seed, if set, stays.
* The trees mode (none/some/many), layer toggles, tree shading and the spotlight position are per-browser settings, not in the
  permalink. The name override and population override are in the permalink.
* **Cross-browser** `[INFERRED]`: every draw is exact, but the model also uses `Math.pow`, `exp`, `log`, `sqrt`, `sin`, `cos`,
  `atan2`; only `sqrt` is required to be correctly rounded, so bit-identical geometry across engines is not guaranteed.

**4.5 Not random.** No stage uses `Math.random` (the grammar's default is replaced by the seeded draw at first use); the clock is read
only at start-up, by the two rerolls and by the timer-based UI.

---

## §5 Data assets present — named and shaped, never reproduced

| asset | where | shape, ranges, a few facts |
|---|---|---|
| name grammar | text asset `grammar` (8 220 B JSON in this capture) | a Tracery grammar (the profile counts 69 symbols) with two local rule prefixes — a tag gate and a probability gate — plus inline alternation; place symbols inn, tavern, smithy, person, temple, basic_shop, special_shop, special, and "village"; one rule is gated on a misspelled junction flag and is unreachable |
| given names | text assets `givenMale`, `givenFemale` | two space-separated lists; used verbatim for 80 % of person first names and as training text for order-2 phoneme Markov chains (20 % of names, and the invented "syllable" words) |
| phoneme lists | `Syllables` statics (vowels, consonants) | used for syllable splitting and Markov tokenising (longest match from the word end) — not read |
| name clean-ups | `VillageGrammar.fix` | ten case-insensitive substitutions collapsing doubled letters and two clusters (e.g. a doubled "h" to one, a tripled letter to two) |
| palettes | six preset JSON assets (default, sand, cold, night, bw, minimal) + a random-palette generator (`RandomStyle`) | ~40 keys: colour arrays with weights (ground, field backgrounds, roof backgrounds, tree colours) and single colours (ink, road, stone, water deep/shallow/tide, shadow, light, lights, gloom, thicket, text), widths (large/small road, strokes), factors (outline pressure, detail and variance factors, roof slope), modes (relief Grass / Hachures / Contours; roof Flat / Gable / Hip, anything else drawn as ruins; tree shape Cotton / Conifer / Palm), shadow direction and length, shallow-band count, merge-roads flag, fonts and number formats |
| noise permutation | `Perlin` static | the public 256-entry reference permutation of Perlin's improved noise; the fade curve tabulated at 4 096 steps |
| tag descriptions | `Params.getInfo` | 20 one-line UI descriptions, one per request tag |
| crown band tables | `TreeType` statics | shading bands per crown type (cloud 2 bands, cone 2 or 3, palm 2), values between 0.1 and 0.8 |
| fonts | embedded assets | Cinzel (title; linked from Google Fonts in SVG exports), Share Tech, Share Tech Mono |
| endpoints | `Blueprint`/`Main`/`Building` statics | the permalink base and the house-generator URL for the hand-off |

Numeric tables that are *logic* (tag-roll probabilities, water weights, class thresholds, place probabilities, field constants,
square and centrepiece odds) are stated as facts in §2 — they are behaviour, not content.

---

## §6 Corrections — profile claim | what the code says | where it matters

"pv" = `research/findings/profile-village.md`; "conf" = `docs/confidence/vg.md`; "V#" = `_critic-vg-ng.md` rows. ARCH § numbers
refer to `docs/ARCHITECTURE.md`. All code facts `[READ]`, CONFIRMED unless marked.

| # | profile claim | what the code says | matters for |
|---|---|---|---|
| C1 | pv §3.2: a retry re-rolls "sometimes seed + 1, sometimes a fresh random draw" | always one Lehmer step of the failed seed; reproduces 3 recorded pairs (the "4242 → 4243" row is not this rule — PLAUSIBLE: build 19251041 or a hand-typed URL) | ARCH §5.1 (the "silent seed swap" we reject), §6.1; pv §3.2 |
| C2 | pv §3.2, H9: `trees` is a deliberate independent vegetation stream "carrying the failed seed" | the tree seed defaults to the seed and a retry simply does not advance it; the tree stream also decides orchards vs fields (lazy field completion); the tree mesh is session-cached | ARCH §6.1–§6.2 (stream design), §13.5 (reference stamping); pv §3.2 |
| C3 | pv §3.1/§10.7: resolve is a dependency table (confluence ⇒ river, coast excludes pond) | seven exclusion groups applied only when a tag is added in the dialog; at build time resolve only appends `isolated`; at most one water type exists | ARCH §4.2 S0; pv §3.1 |
| C4 | pv §3.3/§10.13: roadhouse ≲ 17, hamlet 18–20 houses | < 20 houses → roadhouse if a highway exists, else hamlet; < 200 village; < 1 000 town; else city; "riverside/coastal/island" needs a wharf (island excepted) | ARCH §9.6, §10.2; pv §3.3 |
| C5 | pv §3.3/§10.8: a household size is drawn per building | population = round(houses × U(3, 7)), one draw per village | ARCH §10.3; pv §3.3 |
| C6 | pv §3.3: the plate rounds population to the nearest 10 | two significant figures | ARCH §9.4; pv §3.3 |
| C7 | pv §4.1, H1: shores by marching squares, or a deflected primitive | the staircase of water-cell sides, chained, Laplacian-relaxed twice, resampled every 3 cells | ARCH §3.1 (marching-squares row), §2.3; pv §4.1 |
| C8 | pv §4.1, §10.1, conf §6 #3: `createDeflection` perturbs the field so banks meander; its window semantics unknown | a land-cell repulsion vector: Σ over water cells within a 16-cell disc of (away-unit-vector ÷ distance), normalised; it steers roads, orients bridges and keeps the highway entrance off the water; banks come from the carved height field | ARCH §3.1 ("hot spot avoided by construction" — the rationale changes: it is a steering field), §4.3; pv §4.1 |
| C9 | pv §10.2: river, pond and coast go through `setLevel` differently | only the level differs (pre-carve minimum for rivers; 0.3–0.5 / 0.6 / 0.2 of the range for coast / island / pond); cost differences follow land area | ARCH §4.2 S1; pv §10.2 |
| C10 | pv §4.2: Perlin tables pooled at start-up (11) | 5 terrain + 6 forest octave instances per build, each a rotation of one table by the new state mod 256 (256 possible octaves) | ARCH §3.1 noise row; pv §4.2 |
| C11 | pv §4.2 body: `digRiver` subtracts a function of the distance to the water polygon | exact distance to the *course*; channel = distance − R below the old minimum; outside, height × ln(d/R)/2; R = ½·width·(2 − normalised height) | ARCH §4.2 S1 (1)–(3); pv §4.2 (addenda already had the operand right) |
| C12 | pv §4.4, §10.5: flexibility = how much a tracker may turn, varying with rank/length/terrain | a constant per type (highway 0.5, road 1, trail 2) that scales only the terrain vector; turning of ordinary roads is gated by the blueprint's rigidness; water, target and wall terms are added unscaled | ARCH §4.3, §4.4; pv §4.4 |
| C13 | pv N4: "a bridge is one tracker step" | a bridge stays open over as many 5-unit steps as the water needs; it is cancelled beyond 3·shallowSize; the "one closing per opening" identity is what was measured | ARCH §4.8 (bridges); pv N4 |
| C14 | pv §4.4: trackers stop at water; bridges only where roads happen to cross | roads are alternately *attracted to* and *repelled from* water by generation (a branch flips its parent's flag; a finished bridge repels); the highway is attracted on fordable water; bridges are spaced by shallowSize × (1 + existing bridges) | ARCH §4.3, §4.8; pv §4.4 |
| C15 | pv §4.5: three square morphologies (circle, blob with well, irregular with sub-areas) | two shapes — a ~5-unit-sided regular polygon (p 0.7 dry, 0.9 wet) or a resampled square — both stretched up to ×2 along the contour and turned to the contour or the highway; the "sub-areas" are other layers | ARCH §4.2 S3 (squares); pv §4.5 |
| C16 | pv §4.5 / V26: centrepiece is a well or a large tree ("none" by water) | tower p 0.1 (round) / 0.5 (square), else tree or well at even odds; none when the square meets water (confirmed) | ARCH §4.8, §4.9; pv §4.5 |
| C17 | pv R3 / V16: the square's tower is a prop, not counted among buildings | its building is inserted into the house list (counted, numberable, handed to Dwellings as "tall", triple height) | ARCH §2.6, §10.2; pv R3 |
| C18 | pv §4.6: forest = noise-labelled cells flood-filled into patches, outlines shrunk to planting polygons; `shrinkExcl` keeps patches off roads/fields | a per-cell test (density odds, warped-noise sign, clearances); patches exist only for drawing; shrink/shrinkExcl peel the drawn rings | ARCH §4.9 S12b, §8.10; pv §4.6 |
| C19 | pv §4.6: `Forest.H` a per-patch density/height parameter | no such method in 1.6.9 (old-build fact) | pv §4.6 |
| C20 | pv §4.6: `grove` = tight clusters between radial roads | `grove` replaces the density odds by "density > 0", so trees fill populated ground wherever clearances allow | ARCH §4.9 S12b; pv §4.6 |
| C21 | pv §4.6, V15: the Poisson sampler works in a warped domain | toroidal wrap; the domain warp is on the forest's noise (confirmed V15/N6); the annulus is 1.0–1.1 r | ARCH §3.1 Poisson row; pv §4.6, N3 |
| C22 | pv N3: `PoissonPattern.fill` 6 × 6 tiling is the forest's | it is the relief seed tile (100 units over the 500-unit view); a second fill is an irregular orchard; the forest uses the periodic Voronoi tile (96) | ARCH §8.10; pv N3 |
| C23 | pv §4.7: pick/filter decide ploughed vs pasture; `reroll` from `Forest.roll` = fields and forest negotiating | filter = shape tests; pick = greedy growth from the houses' centroid up to 1 000 area units per house × fieldFactor; unpicked lots are not drawn; reroll is the lazy first read of the fields | ARCH §4.5 S6, §4.9 S12a; pv §4.7 |
| C24 | pv §4.8, H4: rejection sampling of candidates tested against roads, buildings, water **and fields**, 33–43 neighbour queries each | frontage intervals with density acceptance; tests: houses, road polylines, water corners, palisade band — **no field test**; the neighbour-query counts belong to the tree and orchard clearance tests | ARCH §4.7 S10/S10b; pv §4.8 |
| C25 | pv §4.8: `spawnAt` places special buildings at the square | farmsteads at the ends of approach trails (moved to field edges by `fixTrails`); points of interest are random existing houses | ARCH §4.9 (farmsteads, "lonely houses"); pv §4.8 |
| C26 | pv §4.10: shading normals and a Lambert term computed in the view | normals computed once in `Elevation.createGradient`; the view dots the horizontal normal with the light into two blurred bitmaps (multiply / add) | ARCH §8.2 (relief tier), §12 budgets; pv §4.10 |
| C27 | pv §6: `LevelsView` traces ~114 iso-level polylines | walkers start at Poisson seeds 20 apart and follow the local contour both ways, erasing nearby seeds; no preset levels | ARCH §8.2, §8.3; pv §6 |
| C28 | pv §6: every grass mark is a 4-point, 3-segment 0.5 px stroke | in 1.6.9 one straight tick per step (a single move + line) — PLAUSIBLE: the recorded shape is build 19251041's or the recorder's | ARCH §8.3; pv §6 |
| C29 | pv §4.3: `shallowBands − 1` pale tide lines | one tide line on fordable water, two on coasts, islands and ponds | ARCH §8.2 bands law; pv §4.3 |
| C30 | pv §10.4: why band strokes have different segment counts | each band is a successive resample at step L·(k + 1)/N of the previous band, then Chaikin-cut | ARCH §8.2; pv §10.4 |
| C31 | pv §7.4: outline = blend(fill, ink, factor × pressure) (fit to ±0.005) | outline = fill → hard-light(fill, ink) by pressure, pure ink at pressure ≥ 1; detail = fill → outline by the detail factor (vpb's hard-light form and the discontinuity, V13) | ARCH §8.2; pv §7.4 |
| C32 | pv §8, §10.9: `Bloater` inflates a polygon until it hits something (forest patches, palisade) | a recursive perpendicular-midpoint "billow" for cloud crowns and thicket edges, view only | ARCH §8.10; pv §8 |
| C33 | pv P4 [INFERRED]: interior skeleton point unknown; knots pushed along the normal | the interior point is the map centre; knot offsets follow a cosine of wavelength width·2^(3.5…4.5) with per-knot amplitude 2 or 5 widths × √B3 | ARCH §4.2 S1 (rivers); pv P4 |
| C34 | pv P6, conf §6 #4: where the seed enters `River.new` is open | every draw is inlined; the terrain stream is reset to the seed in the region constructor just before | ARCH §6.1; pv P6 |
| C35 | pv N1/N6 D1–D2, conf §6 #1: density form unknown; the rare arm adjusts the centre against the shoreline | the closed formula of §2.6; the arm replaces the reference *height* by the highest in-frame shore vertex when the random reference point is wet; the heart is only the spotlight's centre | ARCH §4.2, §4.5 (density/field bands); pv N1 |
| C36 | conf §6 #1: density fixes heart, packing, field sizes, palisade extent, spotlight | density drives frontage acceptance, junction spacing, field-seed spacing and lot sizes, orchard odds, tree odds and the palisade lattice; the spotlight centre is the densest house | ARCH §4.5; conf G6 |
| C37 | V3: the slope preference reads the gradient array or lives in flexibility | both, precisely: the best-aligned of four stored vectors per cell, × flexibility | ARCH §4.3; V3 |
| C38 | V5 / C13: `project` is the OBB-axis position step, not the right angle | confirmed; both right angles are constructed (perpendicular start, perpendicular foot at the end) | ARCH §3.4 / §4.6 (bent cut); V5 |
| C39 | V17: JSON export at 0.7 m per unit | confirmed: GeoJSON scale 0.7, road width = maxRoad × 0.7, wall thickness 0.7 | ARCH §11.1, §2.1; V17 |
| C40 | critic §6 item 1: which VG version build 19365073 is | the bundle's metadata says **1.6.9** | ARCH §13.5 (referenceBuild); `_critic-vg-ng.md` §6 |

---

## §7 The critics' open questions, answered from the code

**`_critic-vg-ng.md` §6 (remaining gaps, VG):**
1. *Two builds; which VG version is 19365073?* — **1.6.9** (the bundle's application metadata). This document describes 1.6.9 only;
   the 09-21 build's code is not in this bundle, so its recorded facts (curvature pass, 51-segment course, `Forest.H`, the old tree
   closure) stay recorded behaviour. ANSWERED.
2. *`createDensity` form* — §2.6: elevation band × radial falloff from the map centre, scaled by the density tag, smoothstepped;
   `district` drops the radial term. ANSWERED.
3. *Palisade point set and `getPopulated`'s selection* — a jittered 10 × 10 lattice over the view (step size/20), each point kept with
   probability density − 0.1; not building corners and not a contour. ANSWERED (§2.7).
4. *`warp`, `createDeflection`, band resampling, round-vs-rectangular squares, pier suppression* — torus wrap (§3.1); the water
   repulsion field (§2.5); successive per-band resampling (§2.16); round with probability 0.9 on any water map, 0.7 dry — ponds are
   not special (§2.10); a wharf or pier needs pierLength ≤ ½ river width on rivers and confluences, ponds get none (§2.12). ANSWERED.
5–7. NG items — outside this lane (the NG bundle is not read here).
*Most valuable next measurement (VG)* — superseded: each of its targets (course, density loop, palisade point set) is read.

**`docs/confidence/vg.md` §6 — the ten riskiest unknowns:**
1. density form — ANSWERED (§2.6). 2. tracker steering law — ANSWERED (§2.8: flexibility per type, the four-vector terrain term, water,
target and wall terms, rigidness gate, branching by junction spacing ÷ density, trail conversion and random trail length, merge
radius 5, T-corner cut). 3. `createDeflection` — ANSWERED (a steering field). 4. seed entry and the six streams — ANSWERED (§4.3).
5. square sizing, distortion, round/rectangular, heart ↔ wharf coupling — ANSWERED: rim = 12–19 widest house widths; stretch up to
×2 along the contour; 0.7 / 0.9 round; there is no direct heart–wharf coupling — the wharf sits at the densest dockable shore
vertex and the square at the populated point (or the densest highway vertex); both follow the density field. 6. palisade — ANSWERED.
7. forest constants — ANSWERED (Poisson 12 on a 96 tile, jitter 0.8 r, warp = wrap, noise threshold 0 on a domain-warped 6-octave
fBm with offsets ±½, clearances 6 + (0.5–1.5)·house radius and 12 from roads; `Forest.H` absent in 1.6.9; `Bloater` draws crowns).
8. house constants and special buildings — ANSWERED for setback, spacing, size law, large-house odds, farmsteads, points of interest
(random houses), the tower, per-house weighted roof colour, the household law and class thresholds; the flat-roof dome trigger is
in a class not read (§8). 9. build drift — the bundle is stamped (1.6.9, sha256 above). 10. never-recorded render modes — PARTLY:
relief modes, hillshade composite (multiply + add, blurred), the stone rim ("beach strip") and the ground colour are read; roof
geometries (Flat / Hip / ruins), conifer and palm crown details and night lights are not read in full.

**pv §10 — the thirteen unknowns:** 1 `createDeflection` ANSWERED · 2 per-type `setLevel` ANSWERED · 3 where ground[0] is painted
ANSWERED (stage background and PNG fill) · 4 band segment counts ANSWERED · 5 flexibility ANSWERED · 6 density ANSWERED · 7 the
resolve table ANSWERED · 8 population ANSWERED · 9 `Bloater`'s rule ANSWERED (recursion stops below a tenth of the scale; no contact
test) · 10 building type assignment ANSWERED (points of interest are random houses; roof colour an independent weighted pick per
house) · 11 grid / numbers / plate PARTLY (grid step = a power of ten near one eighth of the frame, ×5 above 50 steps, ×2 above 20;
the plate avoids roads; the numbers layer not read) · 12 hachure and contour marks ANSWERED · 13 class thresholds ANSWERED.

**pv N6 hypotheses:** D1 CONFIRMED (one analytic per-cell pass, parameters fixed before the loop, a water-dependent set-up). D2
REFUTED in purpose (the arm sets the reference *height* from the shore; it does not move a centre). P1 CONFIRMED with one change (the
"threshold" is a probability, density − 0.1). W1 CONFIRMED (wrap). N1 CONFIRMED for the highway arm and the per-step wall query;
"a bridge is one step" REFUTED.

**pv §9 H1–H10:** H1 REFUTED (staircase + relaxation, not marching squares). H2 CONFIRMED (a grid loop; cost ∝ land cells ×
disc). H3 CONFIRMED (fixed 5-unit steps). H4 REFUTED in form (frontage intervals with density acceptance, not free candidates). H5
CONFIRMED (plus the right-angled, bend-capable bisector). H6 CONFIRMED (masked strokes). H7 CONFIRMED (crowns cached per 0.1 unit of
radius). H8 CONFIRMED (the whole region is rebuilt). H9 PARTLY (trees follow the tree seed, but so do the orchard/field choice, and
the tree mesh is session-cached). H10 CONFIRMED (colour by facing).

---

## §8 What remains unknown

* **The 09-21 build (19251041).** Its bundle is not the one read here; facts the profile body recorded for it (a curvature pass,
  Chaikin-after-resample, 51-segment course, `Forest.H`, the tree closure) are unverified against code. The 09-21 captures' own
  bodies could be diffed class-by-class with the same script (a separate lane).
* **Classes not read in full** (§9): the UI framework, roof geometries (flat with domes, gable, hip, ruins), bridge and palisade
  drawing, shadow and light layers, the numbers layer, the random-palette generator, the triangulator's internals, colour
  arithmetic, palette storage, the grammar engine and English modifiers, syllable splitting, the SVG/GeoJSON writers. Grep shows
  that none of them resets the stream or reads the clock; those that draw (roofs, palette pick, grammar) only advance the naming
  stream, so they cannot change a village's geometry — they can change what the next Enter produces `[INFERRED]`.
* **Reachability.** The `wetland` water type (height ×3 domain, half-range level) is unreachable from any tag. Town and city
  classes need ≥ 200 houses — not seen at the default size `[INFERRED]`; reachable with large maps from the size dialog. The
  "many trees" mode and the sun/centre spotlight positions are reachable only from dialogs.
* **Engine arithmetic.** `Math.pow`, `exp`, `log`, `sin`, `cos`, `atan2` are not required to be correctly rounded; cross-browser
  bit-identity is unproven. OpenFL's rasteriser (the palisade band's pixel coverage) and blur kernel are engine code, not read.
* **Server side:** none — generation is entirely in the page; the only fetches are assets.
* **Obfuscation:** none beyond minification; class names are preserved in the runtime registry, so every citation above is exact.
* **Content:** the grammar and name lists are assets and stay untranscribed by rule.

---

## §9 Reading record

* **Method.** `scratchpad/code/village/extract.py` (an adapted copy of the `code/mfcg` lane's script: finds every `__name__` and enum
  marker, anchors each at its constructor, cuts byte ranges to the next marker, collects static initialisers from the boot region,
  prettifies at `;`, `{`, `}`) → `classes.tsv` (581 markers; 192 classes extracted for the app, geometry, utility, UI, naming,
  system and format packages) → `annotate.py` (a legend of the minified class identifiers at the top of each file). Every file
  named below was read from its extract; long single-line bodies were read in full except where "partly" is stated.
* **Read in full — 80 of 171 app classes** (village 49/70, geom 22/25, utils 9/19, coogee 0/57):
  *village* — Main, VillageScene, VillageGrammar, Names, JSONExporter; model: Blueprint, Params, Tags, Region, River, Confluence,
  Elevation, Water, Network, Tracker, Junction, JunctionType, RoadType, SquareBuilder, Building, Bridge, Gate, Note, Legend, Farmland,
  Forest, Palisade, props.Prop, props.Tower, props.Tree, props.Well; utils: Bisector, PolyUtils, BitMap, Bloater, Spiker, Outline;
  mapping: VillageView, ReliefLayer, LevelsView, NewGrass, Hachures, Contours, Shading, DramaticLight, WaterView, RoadsView,
  FarmlandView, BuildingView. *geom* — Chaikin, Circle, ConvexHull, Cubic, DCEL, EdgeChain, Face, FillablePoly, FillableRect, GeomUtils, HalfEdge,
  PathTracker, PoissonPattern, Segment, Vertex, VoronoiPattern, PolyBool, PolyBounds, PolyCore, PolyCreate, PolyCut, PolyTransform.
  *utils* — Random, ArrayExtender, MathUtils, Noise, Perlin, BinGrid, PointExtender, SetUtils, StringUtils. Also *tracery*
  DeckRuleSelector, RuleSelector and *nlp* Markov (naming-stream behaviour).
* **Read in part — 8:** ForestView (constructor, tree drawing, shadows; not its last 19 lines), TreeType (crown construction and tables), Style (outline/detail rules, key list), MapPlate (population label), GridLayer (auto
  size), Delaunator (method set, Voronoi extraction, epsilon), Palette and Updater (draw/clock usage by search).
* **Method lists or searches only:** the other 16 village classes (LightLayer, ShadowLayer, BridgeView, PalisadeView, NumbersLayer,
  RandomStyle, the four roofs, the six UI forms), IFillableShape, Color, the remaining
  utils (GradUtils, GraphicsExtender, LongPresser, ColorNames, ParamType, RecurringEventDispatcher, two timer dispatchers) and all
  57 coogee classes (searched for generator draws, clock reads and model access: none).
* **Executed checks** (receipts in this lane's shell): the retry rule against the profile's recorded seed pairs (three exact
  matches, one non-match discussed in C1); the grammar asset searched for the junction flag spelling (one gated rule, misspelled);
  the bundle searched for its version string (1.6.9); the capture's two copies of the bundle compared (identical).
* **CONFIRMED vs PLAUSIBLE.** Everything tagged `[READ]` in §2–§5 was read on disk and is CONFIRMED for build 19365073 (1.6.9);
  statements tagged `[INFERRED]` (the Enter-successor dependence on rendering, the session-cached tree mesh's effect on permalinks,
  the hull edge case, cross-engine arithmetic, reachability of town/city, the zero-call forest run, the 4242 → 4243 row, the
  grass-mark shape of the old build) are PLAUSIBLE.

## Fable review (2026-09-27) — B-code/village

Verdict **CORRECTED** (Fable 5.1, lane fable-review/main/code; `docs/fable-review/main/code.md`, receipts VG 1–17). Read whole.
Firewall: clean — identifiers, source locators and console strings citation-only (J-Fcode-1); the request-tag and descriptive-tag
names are a vocabulary that never enters the design as a list; the roll odds, exclusion groups, thresholds and field constants are
logic (critic R5, J-Fcode-8 — the ruling §5 asked for); grammar, name lists, palettes and clean-ups shaped only. Re-derived on the
per-class extracts of this bundle (mirror `…/454522d3…/scratchpad/code/village/classes/`): the retry as one generator step
(`Blueprint.adjust`; the three recorded pairs recomputed — and 4242 steps to 204765582, so that row is not this rule); the
successor seed as the NEXT stream state; the seven blueprint parameters; the tag roll, its odds and the seven exclusion groups
(`Params`); the density formula and its wet-reference arm (`Region.createDensity`); the six resets and what draws from each; the
highway's and the roads' steering terms, the rigidness gate, branching, trails, merges, bridges and the T-corner cut (`Network`,
`Tracker`); the square's 12–19 widths, round odds, contour stretch and centrepiece odds (`SquareBuilder`); frontage placement,
set-back, driveways and validity with no field test (`Region`); the field seeds, frames, lot filter, orchard odds and the greedy
outward pick (`Farmland`); the repulsion field, the staircase shores and the patches (`Water`); the palisade lattice, hull clean,
band and gate rules (`Palisade`); the river course (`River`); the terrain primitives, the three carves and the four-vector
gradient (`Elevation`); the forest tile, its cache and the per-cell tests (`Forest`); the straight-first bisector
(`village.utils.Bisector`); the Poisson annulus and torus (`PoissonPattern`); the export scale (`JSONExporter`); the boolean's
no-crossing cases on the parity flag (`PolyBool`, `PolyBounds`). All CONFIRMED as written except the corrections below.

Corrections (this section supersedes the passages named):
1. **§2 notation and §4.2** (critic R1): the folded draw F4 = |(sum of four uniforms) ÷ 2 − 1| has mean exactly 7/30 ≈ 0.233 (recomputed:
   0.2335 by 4·10⁵ draws), not ≈ 0.28.
2. **§3.8's no-crossing clause** (critic R2, re-derived): the point-in-polygon flag is the starting parity and every crossing toggles
   it, so with the subtraction flag the second containment test reads "A's first vertex lies outside B". Difference A − B with no
   edge crossing therefore returns A when A contains B (a hole cannot be represented), A when A lies wholly inside B, and nothing
   when they are disjoint — which every caller reads as "keep A". A subtraction that crosses no edge never alters the piece.
3. **Cross-references** (critic R3, widened): §0 item 6 → §2.8 (roads), item 7 → §2.10 (square), item 8 → §2.11 (houses), item 9 →
   §2.13 (fields), item 10 → §2.14 (trees); in §2.8, "Square (§2.11)" → §2.10, "spawnWharf, §2.13" → §2.12, and "a farmstead goes at
   its end, §2.12" → §2.11.
4. **§3.10, build line** (critic R8): this bisector is the straight-first version shared with MFCG itch 12710731 (a straight cut when
   the first leg meets the far edge at sin² > 0.99 and the halves balance, else the bend); NG 1.2.2's copy has no straight test and
   flattens shallow bends afterwards. Any sentence "the reference bisector does X" names the build.
5. **§1.1 and C39, "0.7 m per unit"** (J-Fcode-9): the export scale 0.7 is read in code; the metre unit is an inference — the class
   holds no unit word — on the same footing as NG's 0.35 (J-Fcode-2), consistent with the dimensions it yields (houses and roads
   5.6–7 m). The design does not depend on it.
6. Addendum (no claim changes): §2.13's ring seeds are each nudged by one unit at an angle drawn in [0, 1) radians before the
   spacing filter.

The PLAUSIBLE items of §9 stay PLAUSIBLE; none is carried into the design. The design changes this reading requires are items 51,
53, 57 (VG half) and 61 of `docs/AMENDMENTS-2026-09-27c.md`, all CONFIRMED on the receipts above.

## Fable review (2026-09-27) — B-code/village (critic)

Verdict **CONFIRMED**. R-V1–R-V7 stand: R-V1, R-V2, R-V3, R-V4, R-V6 and R-V7 re-derived by this seat with the critic's results;
R-V5 accepted on its quoted class. X1, X2, X3, X6 and X7's VG half re-derived; I1 stands and is widened (correction 3 above). P5's
"OPEN (version)" is a research gap about an unread old build with a named method (G3/G5), not a design deferral: no design claim
rests on build 19251041 beyond §13.5's drift sentence, which item 61 rewrites. The critic's list of what it did not re-derive is
accurate, and this review closed all of it but the confluence course and the crown tables.

## Fable review (2026-09-27) — B-code/village (impact)

Verdict **CONFIRMED**. Every claim items 51, 53, 57 and 61 rest on that no seat had re-derived — the field sectors' outward claim
and shape filters (§2.13), the density formula (§2.6), the tracker law's terms and gates (§2.8), the square sizing (§2.10), the
successor-seed step (X7), the shore staircase and the deflection field (§2.4–§2.5) — is re-derived above. The editor texts carry
no reference identifier, code, grammar, palette or word list; "claimed outward from the settlement's centre" (item 57) is the
greedy pick keyed on the houses' centroid; the §13.5 stamp "19365073 = VG 1.6.9" matches the bundle's single version string.
