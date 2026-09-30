# code-ftg-client — Fantasy Town Generator's browser client read from its compiled bundles

> READER-TIER — behind the implementer firewall (owner directive 2026-09-27); logic in our own words; no code or assets copied.

> PENDING FABLE REVIEW — class B (Opus reader lane code/ftg-client; no Fable critic has checked it). Queue row
> B-code/ftg-client in docs/FABLE-REVIEW-QUEUE.md. Fable retrovalidation should check the §0 overturns and the §6
> corrections against the bundles before any of them is carried into docs/ARCHITECTURE.md, and the firewall (no code, no
> asset copied; identifiers citation-only; the edge widths, layer heights and lighting breakpoints of §2.5 are stated as
> dimensional facts — rule on whether that is logic or content).

**Lane** `code/ftg-client` · **written** 2026-09-27 · **bundles** (capture `captures/ftg/2026-09-25T10-13-51/session/network/bodies/`)
`0020-c9d002ab.js` = `assets/ThreeJsPages-hfS3aH0a.js` (4 131 620 B, sha256 `ba0f710b6b9593d4…`; byte-identical to `0048-c9d002ab.js`),
`0005-21550787.js` = `assets/index-t5dnCmDj.js` (2 078 075 B, sha256 `4c21992cc53faf7f…`; identical to `0039-21550787.js`),
`0013-f1a86b06.js` = `assets/PatreonButton-vVrZuuWv.js` (232 028 B), `0013-9397ff07.js` = `assets/Landing-ff1f-WIo.js` (18 732 B) ·
**toolchain** a Vite/Rollup ES-module build (not webpack): the entry chunk `index` is fully identifier-minified; the lazily
loaded map chunk `ThreeJsPages` keeps its own top-level identifiers (functions, constants, components, and the local names
it gives to what it imports from `index`) · **symbol maps** `scratchpad/code/ftg/sym-*.tsv` · **extraction scripts**
`scratchpad/code/ftg/jstok.py`, `symmap.py`, `extract.py`, `region.py` (scratchpad = `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/454522d3-02d4-4290-bb60-ba2f045c687d/scratchpad/`;
the first seat's scratchpad `…/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/` was copied there; prettified regions
read for §2.4–§2.6 are in `scratchpad/code/ftg/regions/`). The shared UI chunk `0013-f1a86b06.js` (`PatreonButton`) also
holds the edge helpers and palettes the map chunk imports (bytes 35 300–39 800; join in `patreon-import-map.json`).

**Grades.** `[READ]` = seen in the bundle (symbol named, bundle cited); `[INFERRED]` = our reconstruction; `[STATED]` = the
author's words elsewhere (posts, guide). **CONFIRMED** = read on disk or executed; **PLAUSIBLE** = reasoning only.
Constants are facts about the reference, stated as numbers; nothing here is code; data assets are named and shaped, never
reproduced. Reference identifiers are citations only and are never adopted by the design.

STATUS: COMPLETE (2026-09-27; first seat §0–§4 partial to a checkpoint at ≈ 280k context, continued by a second seat
for §2.4–§2.6, §3.4–§3.9, §5–§9).

---

## §0 Headline — the ten things the code settles

1. **The wire format is now named, field by field.** `[READ]` The map chunk carries protobuf.js static code for the
   package `com.fantasytowngenerator.api.protobuf` (43 messages) plus `…persistence.protobuf` (3 export messages) and 54
   enums (the `com` constant of the protobuf module, `0020` bytes 1 048 447–1 348 884). The layout message
   (`SettlementLayoutResponse`) has 27 fields; every coordinate list is `repeated sint32` (zig-zag), every point message is
   two `sint32`, and the client divides by 100 (its `mapPositionArray`, `convertPosition`), so 1 unit = 1 cm, centred —
   the critic's F1 ruling is CONFIRMED by the code. §2.1 gives the whole model.
2. **The fourteen edge types have names, and two of the program's labels were wrong.** `[READ]` The edge enum
   (`IntersectionEdgeType`) runs ROAD 0, MAIN_ROAD 1, DIRT_ROAD 2, BORDER 3, INVISIBLE 4, WALL 5, STONE_FENCE 6,
   STONE_WALL 7, SANDSTONE_WALL 8, WOOD_WALL 9, SMALL_ROAD 10, WOOD_PIER 11, STONE_PIER 12, TRAIL 13, WATERFRONT 14.
   Type 6 — the program's "rural lanes, the longest class" — is the **stone fence** round the fields (853 edges in
   Galeiaward); type 7 is the **town wall itself** (25 STONE_WALL edges, the 17 towers are typed STONE_WALL too), so the
   wall *is* serialised in the graph, not only its tower chain. Types 3/4/12/14 match the critic's readings
   (border, invisible lot edges, piers, water outline). §6 rows C1–C3.
3. **Payload field 9 is ground-cover texture, not "lots".** `[READ]` Field 9 is `groupedBackgroundTextures`: polygons
   grouped by a 25-value texture enum (six farm textures, forest, quarry, mine, main town, road paving, lawn, dirt, sand,
   pebble beach, cliff, light grass, snow, custom colour …) with a draw height (background / above roads / below roads)
   and a raised flag. The "901 block lots" are the 901 **lawn** patches (texture 18), the "15 plazas" are paved-road
   texture patches (8, drawn above roads, raised), the "4 reserved natural areas" are **sand** (20, beaches), the six
   "field groups" are wheat / tilled / grain / pigs / sheep / cattle. FTG never sends its lots or plots; the lot
   structure is not in the client at all. §6 row C4.
4. **Payload 8.6 is the building's light position, not its entrance; 8.8 is a roof-shape enum; 8.9 is height.**
   `[READ]` Building fields: id, outline, name, category (17-value enum), specific type (string), `lightPosition`,
   material (11-value enum), `roofShape` (15-value enum), `height`, version, note/favourite flags, colour. The point the
   program measured as "the entrance, on the frontage, 3 m from the road, absent on 109 buildings" is where the client
   draws the building's night light (it falls back to the first outline vertex pair's midpoint when absent). The
   "ridge-orientation 50/50" of 8.8 is **gable 0 vs hip 1** (1 377 / 1 395 in Galeiaward); temples carry church
   star / steeple / cross roofs, the market squares a flat roof, keeps and large works L, U and rectangle roofs.
   Heights take a handful of values (5, 6, 10, 12, 20). §6 rows C5–C7.
5. **Two WebAssembly libraries run in the client.** `[READ]` The CGAL straight skeleton (the `straight-skeleton`
   package: a webpack UMD with an Emscripten module inlined as base64, API `SkeletonBuilder.buildFromPolygon` →
   vertices with a time coordinate plus faces) and the WASM build of the Clipper polygon library (`requireClipperWasm`,
   with an asm.js fallback `requireClipper`). The program's "no WebAssembly frames" (confidence D1) is overturned: the
   roofs are computed by CGAL in WASM, and every inset/offset goes through Clipper at 1 cm integer precision.
6. **The simulation is server-side; the client only paints its answer.** `[READ]` Advancing time is a server call
   (`updateSettlementTimePath` → POST `…/time`) that returns a new state id, the list of buildings with lights on
   (payload field 26) and the calendar; the client stores the lit set and re-renders. No schedule, behaviour or
   person-placement logic runs in the browser.
7. **The client has one seeded generator, and forests are filled deterministically at render time.** `[READ]` The
   client PRNG is sfc32 (four 32-bit words of state) seeded by the cyrb128 string hash (the index chunk's `Mit` and
   `qet`). Forest polygons (payload 11.9–11.11 `areas`) are inset 5 m with Clipper, then filled by a **jittered grid**
   (one uniformly jittered point per square cell; cell side √(area / ⌈area·rate⌉)), rate 0.005 trees/m² × the user's
   tree-percentage × the area's density, seeded by settlement id + decoration kind — so the same forest appears on every
   load. Persisted trees (the 4 125) are separate instances; neither is Poisson-disc. §4.
8. **The "seven sprite variants round-robin" are seven seed strings.** `[READ]` Each templated decoration kind (rocks,
   deciduous, coniferous, palm) carries a list of template strings (payload `templates`, 7 each); each string seeds
   sfc32 to build one procedural tree/rock mesh at load (`createTreeGeom`, `createRockGeom`, …); instances point at a
   template by index. New templates made in the editor are random base-36 strings from the unseeded browser random, up to
   seven per kind. §4, §5.
9. **The create form does expose a seed.** `[READ]` The create-settlement form has a seed field whose help text says a
   blank seed means a random one and that changing settings can change the result even with the same seed
   (`seedHelpText`, `mapFormValues`) — the program's "no seed model in the product" (confidence A4) must be reworded: the
   request carries an optional seed, whose server-side reach is untested. §6 row A4.
10. **The client stores what the server tells it and edits by sending requests.** `[READ]` The layout loader
    (`getSettlementLayoutPath`) fetches `layout?asPublic=…` as a binary blob, decodes it with the generated reader in the
    main thread (`protoToJson$1`; no WASM decoder), converts it to plain objects and fans it out to stores (buildings,
    races, genders, religions, factions, access, custom layers); edits go back as JSON posts. **The editor is a
    client-side diff sent once** (§2.4): new/removed lists per entity class, posted to `layout?confirmedActions=…`; the
    server may demand confirmation of the people it will evict, and on success the client reloads the whole layout.
    Snapping is in **world metres, default 5 m**, never less than half the target edge's width; a new road segment is
    **stopped at the first road it would cross and splits that road**; the only validity checks are zero-length edges and
    self-intersecting drawn polygons — **no road-legality threshold exists in the client**. The fill tool's face walk is
    the posts' "leftmost path" plus a ray-parity inside test, spur removal and a 2 000-step cap. "Fill dense" and
    "regenerate area" are **server calls on road-graph faces** (`tools/layout/fill-plot`, `regenerate`): plot and lot
    subdivision never run in the browser. The create form sends `roadLength` **verbatim** (30–100 m, default 50) — the
    critic's factor-of-two question is a server-side matter.

**Also settled by the renderer (§2.5), overturning the screenshot-based spec:** building colour is **material only**
(a short list of near-identical shades per material, picked by building id), not type or wealth; road joins are **round
discs** at intersections, not mitres; the lower-right building "drop shadow" is a real shadow map cast by invisible
extruded proxies; water depth and foam come from a **CPU-built 1 024² distance field** (500 m cap; foam 12 m at sea,
20 m inland; a body is "sea" if ≥ 400 m of its outline runs along the map border); `matrix-green` is the LUT of the
green-tint effect only, `edges_alpha` the across-band alpha of every edge ribbon, `circle_alpha` the window-light glow.

## §1 Symbol map by package

**Why "package" means something different here.** FTG's client is a React + three.js single-page app built with Vite
(Rollup), not a Haxe program: there are no class markers. The unit of the map is the **top-level symbol** (a function,
class, constant or component) with its byte range, found by our tokenizer (`jstok.py`, which tracks strings, template
literals, regex literals and brackets and checks that every chunk balances to depth 0 — all four did). `symmap.py` then
splits multi-declarator statements into one row per name.

| chunk | bytes | top-level statements | symbols | identifiers |
|---|---|---|---|---|
| `ThreeJsPages` (map page, lazily loaded) | 4 131 620 | 2 299 | 4 409 | **kept** (own and imported names readable) |
| `index` (entry: React, MUI, router, auth, shared utils) | 2 078 075 | 4 259 | 6 866 | minified (2–3-letter names) |
| `PatreonButton` (shared UI) | 232 028 | — | 1 044 | minified |
| `Landing` | 18 732 | — | 19 | minified |

The entry chunk's own utilities are readable anyway, because `ThreeJsPages` imports 361 of them under their source names
(its import clause maps each exported key to a local name; `index-import-map.json` in the scratchpad joins that to the
entry chunk's minified symbol, e.g. `sfc32` = `Mit`, `evenlyDistributedRandomPointsInLayout` = `Nit`,
`lineIntersectionPoint` = `Wet`, `getRandomArbitrary` = `T6`).

**What occupies `ThreeJsPages`** (by byte range; vendor code identified by its own names and strings):

| range (bytes) | content | kind |
|---|---|---|
| 2 530 872–3 566 846 (1.04 MB) | the `straight-skeleton` package: webpack UMD wrapping an Emscripten build of CGAL's straight skeleton (base64 WASM) with a `SkeletonBuilder` class | vendor (WASM) |
| 614 981–945 051 and 420 762–614 937 | Clipper polygon library: asm.js build (`requireClipper`) and WASM build (`requireClipperWasm`) | vendor (WASM) |
| 1 048 447–1 348 884 | protobuf.js generated schema (`com`), plus the runtime (`$Reader`, `$Writer`, `$util`) | generated from the app's .proto |
| scattered | three.js examples (orbit and pointer-lock controls, fonts, fat lines), `three-mesh-bvh`, the pmndrs `postprocessing` effects, troika SDF text (with Typr and bidi), a markdown stack (unified/micromark/hast) for notes, MUI components, `seedrandom` | vendor |
| the rest | the app: map scene components, geometry builders, editor tools and stores, forms and modals, API wrappers | **app** |

App symbols by topic (name-pattern counts over the 4 409 symbols; a symbol can fall in two topics): editor tools 212,
district/labels 302, textures/backgrounds 228, persons/factions/religions 200, buildings 176, geometry 167, API paths
137, roads/edges 85, decorations 72, light/sun/shadow 44, water/coast 43, schedule/time 40, trees/forests 40, exports
35, roofs 30, walls/towers 22, randomness 16, regenerate 13.

**Entry point and call order for a map view** `[READ]`: the layout fetch (`getSettlementLayoutPath`, via the blob
helper, path `layout?asPublic=…`) → `protoToJson$1` (decode with the generated `SettlementLayoutResponse.decode`, then
per-field converters `convertEdgeNetwork`, `convertSimpleBuilding`, `convertGroupedTextures`, `convertDistrict`,
`convertDecorations`, `convertCalendar`, `convertPlaceInWorld` …) → the stores (`useSettlementLayoutStore` and
per-entity stores) → the WebGL scene (`WebGlSettlement`) or the SVG renderer (`SvgRender`), both reading the same plain
objects. Inside `WebGlSettlement` (§2.5.1) the mount order is: camera controls → effect composer → sun → buildings
(geometry from a pool of web workers, `useAsyncRenderBuildings`) → districts → ground textures → decorations and window
lights → building shadow proxies → map background and border → water → building outlines → editor overlays →
intersections → wall towers → edge shadow proxies → selection → pins → ruler, scale, grid → edges → edge shadow meshes;
draw order is enforced by per-layer heights, not by mount order. The editor (§2.4) is mounted inside the same canvas
(`EditingLayout`, `CurrentEditControls`) with its own stores; saving goes through `EditSettlementLayoutControls`.

**App symbols read by topic for the continuation** (prettified regions in `scratchpad/code/ftg/regions/`, one file per
byte range): editor store and tools `r950000.js` (bytes 950 000–992 000); edge picking, snapping, face walk, polygon
checks, intersection hash `r340000.js`; edge rendering, heights, snapping during draw, edit components `r2488000.js`;
request mapping, confirm-actions, edit controls, building render workers `r1995000.js`; SVG writer, regenerate area
`r2108000.js`; sun and camera `r1815000.js`; effects `r1807300.js`, `r1909800.js`, crosshatch shader (bytes 1 905 358–
1 909 842); water `r1837000.js`; ground textures `r3593900.js`, `r3598000.js`, texture configuration `r284000.js`; towers,
PNG, shadow proxies `r3945400.js`; districts and colour rule `r3933700.js`; JSON/CSV `r2078900.js`; GeoJSON `r2092000.js`;
decorations, lights, scale `r4010000.js`; the create-form mappers `mapFormValues.js`, `createDefaultGenerationStage.js`,
`GenerationStageField.js`, `SuburbStageField.js`.

## §2 The pipeline as coded, stage by stage

The browser does **not** generate a settlement. What runs client-side is: decode → store → render → edit (edits are
requests) → export. The generation pipeline itself is server-side and stays `[INFERRED]` from the guide (§8).

### 2.1 The settlement data model on the wire (`SettlementLayoutResponse`) `[READ]` + measured on our two captures

Schema recovered by `scratchpad/code/ftg/pbschema.py` (reads each generated `decode` switch: case number → property →
reader call; packed repeated fields read their element reader); full listing `pb-all.txt`. Counts in the last column are
from our own decoder `sim/decode_layout.py` run on Galeiaward (2026-09-21) / Nevervalley (2026-09-25) — CONFIRMED.

| # | field (their name, cited) | type | meaning as the client uses it | Galeiaward / Nevervalley |
|---|---|---|---|---|
| 1 | `stateId` | int32 | optimistic-concurrency token; every edit/time call returns a new one | 1 / 1 |
| 2 | `name` | string | settlement name | |
| 3 | `edgeNetwork` | message | `edges` (id, start, end intersection ids, edge type) + `intersections` (id, position, packed int32 neighbour ids) | 5 326 edges |
| 4 | `initialCameraPosition` | point | camera start | |
| 5 | `settlementBorder` | sint32 list | the settlement border polygon; for both CITY captures it is the map square ±2 500 m | 5 points |
| 6 | `waterBodies` | list | id + outline (sint32 list) | 4 / 4 |
| 7 | `wallTowers` | list | position, scale (float), type (an edge type: which wall) | 17 / 29, all STONE_WALL, scale 1 |
| 8 | `buildings` | list | see below | 2 798 / 2 813 |
| 9 | `groupedBackgroundTextures` | list | ground-cover polygons grouped by texture type: id, outline, texture type, raised flag, draw height, optional colour | 11 / 13 groups |
| 10 | `districts` | list | id, `name`, `nickname`, label point, `layouts` (outline **with holes**), prose description | 4 / 3 |
| 11 | `decorations` | message | fountains, wells, fires, bandstands, statues, monuments, tall stones (point + scale each); rocks, deciduous, coniferous, palm trees as templated sets (template strings, instances with template index + point + scale, fill areas with density) | wells 14, bandstands 14, statues 14; rocks 240; trees 4 125 + 2 areas / wells 15, bandstands 6, statues 13, tall stones 10, rocks 4 161, trees 3 844 + 1 area |
| 12 | `pins` | list | map pins: label, note, public flag, colour, point, text scale, scale, anchor flag | |
| 13–18 | race, race-partner, gender, gender-partner, religion, faction summaries | lists | the append-only dictionaries the UI needs without loading people | 9, 45, 4, 16, 3, 4 |
| 19 | `statInformation` | message | stat definitions | |
| 20 | `userAccess` | message | access level (read map / partial buildings / full buildings / people / partial people) and public-write flags | |
| 21 | `playerCurrentBuilding` | int32 | the VTT player marker | |
| 22 | `calendar` | message | current day name, current hour, hours per day, day names, rest days (sint32 list), manual day override | Monday, 9, 24, 7 names, [6,7], NONE |
| 23 | `placeInWorld` | message | hemisphere, max sun height (4 steps), sunrise direction, sunrise and sunset hour, weather (4), season (4) | sun HIGH, 5 h, 21 h |
| 24–25 | allowed iframe origins (global, per settlement) | strings | embedding allow-list | |
| 26 | `buildingsWithLightsOn` | int32 list | the server's answer to "which buildings have an awake adult now" | 0 at 09:00 |
| 27 | `customLayers` | message | user thematic layers: name, entries (label, colour, matchers by building id / category / specific type), public flag | |

**Buildings (field 8).** `id`; `buildingLayout` (closed outline, sint32 list); `name`; `buildingType` — a 17-value
category enum (government, residence, tavern, shop, religious, warehouse, farm, educational, service, guild, cultural,
law enforcement, artisan, industrial, market, inn, faction); `specificBuildingType` — free string (144 / 147 distinct);
`lightPosition` (point; present on 2 689 / 2 532 buildings); `buildingMaterial` — the 11-value material enum (wood,
stone brick, pavement, light thatch, red / blue / orange tile, slate, wall, thatch, sandstone); `roofShape` — 15 values
(gable, hip, flat, circle, left L, right L, shallow U, U, towered keep, church cross, church steeple, church star, tent
diamond, rectangle hip, rectangle gable); `height` (integer; observed 0, 5, 6, 10, 12, 20); `buildingVersion` (unknown /
"under roads" / current — all current in both captures); `hasNote`, `favourite`, `colour` (unset in both).
Measured roof split in Galeiaward: residences gable 1 008 / hip 1 029 (+2 shallow U); artisans 260 / 245; the four
religious buildings church star ×2, steeple, cross; the two markets flat; farms L and rectangle roofs; factions U /
shallow U. Material: wood 2 792, stone brick 4 (the temples), pavement 2 (the market squares).

**Texture groups (field 9), Galeiaward** — group type = texture type, n polygons, draw height: grassy field 51
(background), **lawn 901** (background), **road paving 15 (above roads, raised)**, pigs 34, tilled 31, wheat 33, cattle
30, grain 40, sheep 35 (all below roads), forest 2 (below roads), **sand 4** (below roads). Nevervalley adds light grass
1 and pebble beach 6.

**Enumerations that are content, not structure** (named here, never reproduced): 308 items, 86 resources, 299 known
professions, 52 hobbies, 64 interaction mannerisms, 24 mannerisms, 19 core motivations, 12 name generators, 18
sub-district kinds, 7 overall district classes (squalid → aristocratic …), 13 sub-location tags, 8 building matchers,
7 sub-location matchers, 8 schedule-criteria matchers, 6 person types (studying, working, unemployed, delegating,
**visiting**, retired), 4 schedule statuses.

**The client's converters** (`protoToJson$1` and friends) turn each list into plain objects in metres (÷100), index
edges and intersections by id into dictionaries, map every enum to a string, and default absent fields (proto3 omits
zeros) to 0, empty, or 1 for scales. Districts arrive without their class and sub-districts (the converter sets the
overall type to null and an empty sub-district list; `[INFERRED]` they come from the district detail request).

### 2.2 Time and lights `[READ]`

The clock is advanced by the server (`updateSettlementTimePath`: POST `time` → new `stateId`, the lit-building list,
the new calendar), after which the client soft-clears its caches. Lights: `BuildingLights` places each lit building's light at its
`lightPosition` (`lightPositionsForBuildings`; the light itself is an 8 m glow disc, §2.5.6) (fallback: the midpoint of the outline's first edge, `lightPositionForBuilding`). No
schedule evaluation exists in the bundle.

### 2.3 Render-time fills (forests) `[READ]` (`TemplateDecorationAreas`, `0020` bytes 4 038 892–4 040 763)

For each fill area of a templated decoration kind: inset the polygon by 5 m (Clipper, square joins; if the inset
vanishes, use the original), sample points by the jittered grid of §3 at 0.005 per m² × tree-percentage/100 × the area's
density, seeded by (settlement id + kind); per instance draw, in order, a height offset inside the kind's height range
(2-D mode), a planar scale in [0.75, 1], a vertical scale in [0.75, 1.25] (3-D mode only), a rotation in [0, 2π) and a
colour index into the kind's colour list (2-D mode). Instances go into one instanced mesh with four level-of-detail
meshes switching at 2 000 / 3 000 / 5 000 units and matching shadow LODs; the whole area layer hides while the editor is
open.

### 2.4 The layout editor `[READ]` (store `useEditSettlementLayoutStore` and its actions, `0020` bytes 952 618–989 597; picking, snapping, face walk and polygon checks bytes 341 462–351 735; edit components bytes 2 504 790–2 529 469; request mapping and confirmation bytes 2 004 725–2 040 130; regenerate area bytes 2 112 401–2 129 848)

**The model: an edit is a client-side diff, submitted once.** The editor store holds an editing state of paired lists —
"new" and "to remove" — per entity class: buildings, edges (removals keyed by id; new edges and new intersections live
in two companion stores, `useEdgeBoundingBoxStore` and `useIntersectionCacheStore`, whose intersection map is a deep copy
taken when editing starts), towers, water bodies, ground-texture polygons, the seven point decorations (fountain, well,
fire, bandstand, statue, monument, tall stone), and, for each of the four templated kinds (deciduous, coniferous, palm,
rocks), new instances (position, scale, seed string), new fill areas (polygon + density) and removals. Nothing touches the
stored layout until **save**, which maps the whole diff into one request. Existing objects carry integer ids and new ones
UUIDs; the id's type is how the client tells a new object from a moved or repainted one (`getBuildingEditType`). A
state machine (`currentEditType`, about forty states such as edge start / edge end, building position / rotation, draw
polygon, fill, demolish, river path, confirm river) drives the tools; undo steps back one state or removes the last drawn
vertex (`undoCurrentAction`); cancelling with unsaved changes asks for confirmation and discards the diff.

**Tools, grouped as the UI groups them** (`EditSettlementLayoutControls`, `CurrentEditControls`, `RoadEditControls`,
`WallEditControls`, `BuildingEditControls`, `BackgroundEditControls`, `WaterEditControls`, `DecorationEditControls`,
`NaturalDecorationEditControls`):

| group | tools and what they create |
|---|---|
| roads | two-click segments chained end-to-start (`completeEditEdge`); types road, main road, small road, dirt road, trail, invisible, waterfront, wood pier, stone pier; demolish by click or ctrl-hover |
| walls | the same segment tool with a wall-type selector (wall, stone wall, sandstone wall, wood wall, stone fence; default stone wall) and a tower tool (position, scale, wall type); demolish walls and towers |
| buildings | place a shape from a small shape library (`buildingShapes`; default "Rectangle", initial scale 3.5, ctrl-wheel rescales; click position then click rotation, or ctrl-click keeps the orientation); draw a free polygon (always stored with a flat roof); move; swap two buildings' details (footprints stay); paint brush (material / custom colour / roof shape over existing buildings, ctrl-hover paints); **fill dense** (server call, below); options height (default 5 m, `DEFAULT_BUILDING_HEIGHT`), material (11 + custom colour; default wood), roof shape |
| backgrounds | draw a polygon, fill a road-graph face, or restyle an existing polygon; 24 texture types + custom colour; draw height background / below roads / above roads (default below roads) |
| water | draw a polygon, fill a face, or the river-path tool (below) |
| decoration | point decorations placed singly with a scale; templated trees and rocks placed singly, by brush (radius default 100 m, 5 instances per click, `randomDecorationsAroundPoint`: uniform point in the disc, scale uniform 0.8–1.2, unseeded), as a drawn area or as a face-fill area (density default 1) |
| pins | place a pin (label, note, colour, scales) |

**The face walk behind every "fill" tool** (`extractFromLayoutSurroundingPoint` with `getFirstEdge`,
`getNextIntersection`, `removeBacktracks`, bytes 345 203–346 929). From the click, cast a ray toward +x and list the
edges it crosses, nearest first (picking through the edge BVH of §3.4). For each candidate: project the hit onto the
edge, snap to an endpoint if one is close, choose the starting direction, then walk the graph: at every intersection
take, among the neighbours other than the one just left, the one with the **largest turning angle** as measured by the
entry chunk's `angleBetweenPoints` — the author's "always take the leftmost path". While walking, count how many walked
segments cross the horizontal ray from the click. The walk ends when it returns to its first edge in the first direction,
or fails after **2 000 steps**. The loop is accepted only if the crossing count is **odd** (a point-in-polygon parity
test — the click is inside); otherwise the next ray hit is tried. Dead-end spurs are then cut out of the accepted loop
(any vertex whose predecessor equals its successor is removed with the doubled-back stretch, repeatedly). The polygon is
the loop of intersection positions; failure shows "did not find surrounding layout … create a new surrounding layout
with roads / invisible edges" — so **invisible edges are how a user (and, by the same message, the generator's lot
structure) closes a face**. `[READ]` for the walk; `[INFERRED]` for the reading of invisible edges as lot boundaries.

**Snapping** (`getSnapDistanceForEdge`, `determineFinalPosition`, `snapPositionToEdgeIntersection`,
`snapToEdgeOrIntersection`, `snapStartPositionToEdgeOrIntersection`, `getIntersectionNearForEdit`):
* **Unit and default.** World metres (the client's coordinates, wire ÷ 100): default **5 m** (squared 25 kept alongside),
  set by a slider (`SnappingControls`); not scaled by zoom. When the target is an edge, the effective radius is the larger
  of the snap distance and **half that edge's drawn width** (so a 5 m main road is always caught within 2.5 m of its axis,
  a 6 m wall within 3 m).
* **Finding intersections** uses a uniform spatial hash: 100 m buckets over a ±10 000 m range; the nearest intersection
  in the 3 × 3 neighbouring buckets within the radius wins.
* **Priority for a segment's end** (start fixed): (1) test the straight segment from the start toward the cursor against
  every existing edge except those incident to the start; if it would cross one, the end is **forced to the first
  crossing** — placed on the crossed edge at the closest point, unless an existing intersection within the snap radius
  (of that crossing point, else of the cursor) is nearer to the start, which then wins; (2) if nothing is crossed and an
  edge lies within the radius of the cursor, project onto it (re-running the crossing test from the start); (3)
  otherwise the free cursor point. A **start** point snaps first to an intersection within the radius, else onto the
  nearest edge within the radius (that edge is split at the start when the segment is placed), else stays free.
* **Consequences.** A new road cannot cross a road in one segment: it stops at the crossing and the crossed edge is
  **split in two** there (`splitEdge`; both halves keep type and width) with a new intersection; placing a segment
  between two already-connected intersections replaces the edge(s) between them; a segment whose ends are the same
  intersection is dropped. New intersection positions are rounded to 1 cm (`snapPositionTo2dp`); a debug check
  (`validatePoint`) logs points with more than two decimals but tests x twice and never y.
* **No road legality in the client.** No minimum segment length, minimum junction angle, parallel-road separation or
  spacing rule is checked anywhere in the editor.

**Polygon validity** (`newPointSelfIntersects`, `polygonSelfIntersects`): every drawn polygon (water, building,
background, decoration area, river path) refuses a new vertex whose segment crosses an earlier non-adjacent segment or
folds straight back on the previous one; a finished river outline is tested pair by pair (collinear neighbours running
the same way allowed). No minimum area, angle or length. (`isValidDiagonal`, which the first seat's plan listed, is the
vendored earcut triangulator's own test, not an editor rule.)

**River path tool** (`fillRiverFromPath`, `smoothLine`, `confirmRiverPath`): click a polyline, then tune width
(default **40 m**) and smoothness (default 0 passes) live. Smoothing is corner cutting: each pass replaces every segment
by its quarter and three-quarter points, keeping the two ends. The outline is the Clipper offset (square joins) of the
path run out and back, by half the width; a two-point path becomes a plain rectangle; an offset that comes back as
several pieces or with holes is marked invalid, and confirm refuses self-intersecting outlines.

**Server-assisted tools.** *Fill dense* posts the face polygon to `tools/layout/fill-plot` and receives the lot's id
plus building outlines with roof shapes; the client adds them as new, empty buildings (current material and height) and
refuses to fill the same lot twice (`startFillBuilding`). **Plot subdivision into footprints is therefore a server
service that accepts any face polygon** — the browser never subdivides.

**Saving** (`EditSettlementLayoutControls`, `postSettlementLayoutUpdate`, `handleEditSettlementLayoutResponse`,
`EditLayoutConfirmActionsModal`). `POST settlements/{id}/layout?confirmedActions=false` carrying: new intersections (id,
position); new edges (id, each end as either an existing integer id or a new UUID, edge type — **no width**); removed edge
ids; new buildings (outline, material, colour, roof shape, height; the id only when an existing building was moved or
repainted); removed building ids; new and removed towers, water bodies and ground polygons; per templated kind the new
instances (with seed string), new areas (with density) and removals; the point decorations (new ones with position and
scale, **removals by position**, not id). The shared post helper adds the `stateId` query parameter only when asked,
and none of the editor's calls (layout, regenerate, bulk update, fill-plot) ask. The server may refuse with
per-building "actions to confirm" (for each building to be deleted: each affected person, the proposed action and a reason) or an aggregate summary (action type, reason, number of people); the client lists them and, on "Confirm
actions", re-sends the same diff with `confirmedActions=true`. On success the client stores the returned `stateId`,
leaves editing and **reloads the whole layout** (caches cleared) — no client-side merge.

**Regenerate area** (`RegenerationModal`, `RegenerateAreaFormFields`, `mapRegenerationFormState`, `postRegenerateArea`).
The area is never a free polygon: the user selects one or more **road-graph faces** as "lots" with the same face walk
(`LotFieldRender`; a lot = its loop of intersection ids and positions). `POST settlements/{id}/regenerate` sends:
regeneration type (inner settlement or farmland); lifestyle; building density (0.4–1, default 1); distribution type
(preset, overall pool, specific buildings) and the resulting weights over **14 building pools** (a preset expands to a
fixed weight table — 7 presets; e.g. "residential" puts ≈ 90 % on the residential pool) or specific-building weights;
create residences for the unemployed / create schools / use existing schools (default on); placement (default dense);
district modifier; material option; **"anywhere in lot"** (allow plots that touch no visible road; default off);
decoration options (ground textures, lot decorations, plot decorations, lot-edge options); climate tree proportions
(deciduous 1, coniferous 0, palm 0; step 0.05); **re-roll roads** and **remove main roads** (default off); **divide lots
to area** (1 000–100 000 m², step 100, default 10 000) with a dividing road type (default road); farmland options (natural
texture, farmstead multiplier, farm types); a re-roll flag. The answer returns the lots and whether the population cap
was reached (50 000; 100 000 with the premium tier); the client reloads, then offers accept, re-roll (re-send with the
returned lots and the flag set) or edit options. The form warns that all buildings, decorations and residents in the area
are destroyed, people are re-created, and nothing can be undone.

**Bulk edit** (`BulkEditBuildingsModal`, `getRequestForFormState`): `POST settlements/{id}/bulk-building-update` with the
selected ids and either shared details (name, category, specific type, description, stock, services, opening times,
public flag, sub-locations, demanded and provided resources, minimum public relaxing age, religion) or a redistribution
(lifestyle, pool or specific weights, the three residence/school flags) that re-rolls contents inside the kept
footprints.

**The create form's mapping** (`mapFormValues`, `mapGenerationStageParams`, `mapSuburbParams`, `putNewSettlement`):
`PUT settlements` (optionally replacing one) with the form values passed through. Per stage the only change is filling
a missing building material with the form default; **`roadLength` goes out exactly as the slider shows it** —
"Road segment length (m)", 30–100, step 1, default 50 (`createDefaultGenerationStage`, `GenerationStageField`,
`SuburbStageField`); the seed goes out as entered. Stage defaults: main and normal road angle caps 15° (slider 0–30),
branch after 4 segments vertically and horizontally (1–5), minimum district area 10 000, spoke-stay probability 0.1, at
most 1 spoke per stage, branch type "continue", proportion of buildings 0.1, wall "around all lots", dense placement,
wood. The client also derives the "available raw resources" list from landscape flags — fish with a coast, rivers or
drawn water; logs with forests; the chosen farm types with fertile land; ore with mines; stone with quarries
(`extractLandscapeParameters`).

### 2.5 The WebGL scene `[READ]`

#### 2.5.1 Composition, camera, draw order (`WebGlSettlement` bytes 4 053 801–4 059 409; `Controls$1` bytes 1 818 508–1 820 169)

One react-three-fiber canvas: **perspective** camera, field of view 50°, far plane 8 000, placed 2 000 m above payload
field 4; logarithmic depth buffer; soft PCF shadow maps; no tone mapping; **render on demand** (a frame is drawn only when
something invalidates it). Orbit controls: left-drag pans, middle dollies, right-drag rotates (rotation only in 3-D
mode), zoom speed 2, distance 20–6 000 m, no damping. "Street view" (3-D mode only): eye at 1.6 m, field of view 60°,
pointer-lock controls, fog from 1 to 2 000 m (dark blue at night, light grey otherwise) and a physical sky whose
scattering parameters switch for day, sunrise/sunset and night. Render options (`useRenderOptions`): antialiasing
(hardware, or 8× MSAA through the composer), shadows and shadow resolution, roof mode (§3.1), full 3-D, day/night cycle,
"material multiple colours", textures, field fade, water effects, tree percentage, district text style, distance
scaling and custom text scale, colour effects. Templated trees and rocks, point decorations and window lights mount only
on WebGL2 (`WebGl2Wrapper`, whose warning says textures degrade too).

**Draw order is by per-layer heights**, not by render order (`COMMON_HEIGHTS`, entry chunk `C$`, 19 levels, metres):
map background and map border −0.5 < ground textures (background) −0.1 < water −0.05 < ground textures (below roads)
0.004 < road rims 0.008 < lower edges (dirt road, trail, invisible, waterfront) 0.009 < roads and piers 0.01 < ground
textures (above roads) and zero-height buildings 0.015 < decorations 0.025 < light discs 0.028 < fences 0.04 < walls 0.07
< towers 0.08 < border line 0.1. Buildings, trees and district overlays take one of three height sets by mode
(`FLAT_HEIGHTS`, `ROOF_THREE_D_HEIGHTS`, `THREE_D_HEIGHTS`): flat — buildings 0.03, trees 1–2 m, district tint 7 m, its
text 7.1 m; 3-D roofs — trees 4.5–5 m, districts 15 m; full 3-D — districts 25 m. The result is the guide's order
"background, water, below road, above road", with plazas (above-road paving) over roads and buildings over both.

#### 2.5.2 Roads, walls, fences, piers, towers (`EdgesRender`, `MergedLinesMeshRender`, `IntersectionsRender`, `WallTower`, `EdgeShadows`, `ShadowEdgesRender`; the width, colour and height helpers are in the shared chunk `0013` bytes 35 300–38 200)

* **Ribbon construction.** Each graph edge is one flat rectangle centred on the segment (length + 0.1 m of overlap);
  all edges merge into one vertex-coloured mesh, drawn twice — a wider rim band just below, the coloured band above. At
  every intersection a 16-sided **disc** (and a rim disc) of the joining edge's width fills the joint; counting only
  fully opaque types, the disc takes the widest type that meets there at least twice, else the narrowest type present. **Joins are round, never mitred.**
* **Widths (band / rim band, metres)** (`getWidth`, `getBackgroundWidth`): main road 5 / 5.5; road 2.5 / 3; small road
  and dirt road 1.25 / 1.75; trail 1.25 / —; wood and stone pier 3 / 2.25; wall, stone wall, sandstone wall 6 / 6.5; wood
  wall 3 / 3.5; stone fence 0.5 / —; invisible and waterfront 1 / —; border 0. Roads and walls thus carry a 0.25 m rim
  per side. Widths are a function of the type only; the wire carries none.
* **Visibility.** Invisible and waterfront edges have alpha 0 (drawn, magenta and violet, only while the editor's road
  group is open); trails alpha 0.2; the map border is a separate black line on the top layer (`Border`).
* **Texture.** One alpha map, `edges_alpha` (a ramp), across the band: every edge type samples the lower 40 % of it,
  trails the upper band (0.6–1) — the soft edge of every ribbon, with a different profile for trails.
* **Colour.** One table of 15 edge-type colours: the three street types share one pale beige-grey, dirt roads a warmer
  brown, the generic wall and the border near-black, stone walls and stone fences one mid grey, sandstone a tan, wood
  walls and wood piers browns, stone piers a light grey (e.g. roads `#beb6aa`, dirt road `#ae9c87`); the rim is black
  under wall types and one warm grey elsewhere.
* **Height in 3-D.** A per-type depth (`edgeTypeToShadowDepth`): walls 10 m, fences 1 m, piers 1 m, all other types 0.
  In full 3-D these become extruded boxes; in 2-D with shadows on, **invisible** boxes of those heights cast shadows onto
  the flat map.
* **Towers** (payload field 7): radius = scale × 0.75 × the wall type's width — 4.5 m for a stone-wall tower at scale 1;
  in 2-D a 16-sided disc in the wall's colour over a disc 0.25 m wider in the rim colour; in 3-D a 15 m cylinder; the
  shadow proxy is a 20 m cylinder.
* **Bridges.** Nothing special: roads simply lie above water in the layer order (0.01 over −0.05). The client has no
  bridge, deck or abutment geometry.

#### 2.5.3 Water (`Water` bytes 1 838 389–1 845 828, `determineWaterBodyType`)

* **Fill.** All bodies are triangulated into one mesh at the water layer, in one blue-grey (`#6f89a0`); with textures on,
  a water image tiled every 200 m (UV scale 0.005) instead.
* **Water effects** (a render option). (1) Each body with at least four points is made counter-clockwise and grown by
  0.1 m unless it touches the map border (Clipper at cm integers); all are united. The union's outline segments, minus
  those lying along the map border, are the **shore**. (2) A **1 024 × 1 024 half-float distance field** over the water's
  bounding box is filled on the CPU: for every shore segment, each texel within 500 m of it takes the minimum
  point-to-segment distance; 500 m is the cap. (3) Per fragment: depth factor = smoothstep over 0–500 m of the distance
  plus simplex noise (200 m scale, amplitude 20 m); the colour blends from 1.25× (shallow) to 0.85× (deep) of the base.
  **Foam** = white mixed in by (1 − smoothstep(0, threshold, distance))², threshold = foam distance + simplex noise
  (3 m scale) × strength: **sea** 12 m, strength 2, intensity 0.7; **inland** (rivers, lakes) 20 m, strength 0.5,
  intensity 0.15.
* **Sea or inland** (`determineWaterBodyType`): a body is sea when the part of its outline running along the map border
  totals at least **400 m**; otherwise inland.
* Beaches, pebble beaches and cliffs are ground textures (§2.5.4), not water effects.

#### 2.5.4 Ground (`BackgroundTexture` bytes 3 594 198–3 597 028, `typeToTextureDetails` bytes 284 676–290 639, `handleBlurEdges`, `handleShadowNoise`)

* The map square (payload field 5) is filled in one town-ground colour (snow white under snow) at the lowest layer.
* Each texture group becomes one merged, vertex-coloured mesh with the type's image, tiled (base repeat 3 × 3, then the
  type's UV scale where set: 0.01 — a 100 m tile — for grass, lawn, light grass, dirt, sand, snow and the livestock
  types, 0.005 forest, 0.03 bees, 0.05 pebble beach, 0.1 cliff; crops use the helper's default, not read) and a normal
  map where the type has one (pebble beach). **Crop and livestock fields, forests and pebble beaches rotate their UVs to
  the polygon's longest edge** (rows follow the field); grass, lawn, sand, quarry and snow stay axis-aligned. Cliffs use a dedicated strip
  geometry (`createCliffGeometryWithUvs`, not read in detail).
* Draw height per polygon (`BackgroundTextureHeightConfig`): background −0.1, below roads 0.004, above roads 0.015. The
  wire's "raised" flag drives only the SVG writer's two passes.
* **Field fade** (`handleBlurEdges`; the "field fade" option on types flagged to blur — wheat, tilled, grain, flax, hops,
  vineyard, cotton, light grass): alpha rises from 0 at the polygon's outline to 1 at **5 m** inside, the distance
  perturbed by simplex noise (4 m scale, up to −1 m) so the edge is ragged; computed per fragment against the outline
  held in a data texture.
* **Ground mottling** (`handleShadowNoise`; types with a noise pair — grass, sand, snow): the image is blended with a
  darker grass image by a mask from 5-octave value noise at 300 m scale plus a 50 m detail term, then lightened toward
  white where the noise is high; the pair (0.1 / 0.9 for grass and sand, 0.07 / 0.93 for snow) sets mask strength and
  floor; the noise origin is shifted by a value drawn from sfc32 seeded with the settlement id. This is the "painted
  raster noise" of the screenshots.

#### 2.5.5 Buildings (`useAsyncRenderBuildings`, `buildingBufferToGeometry`, `AllBuildingsRender`, `BuildingsRender`; colour functions bytes 3 936 368–3 938 842)

* **Geometry is built in web workers**: a pool of ⌊cores / 2⌋ workers (2 if fewer than 4 cores, at most 24) receives each
  building as roof-shape enum, height (0 unless full 3-D) and outline, and returns positions and indices. The worker
  script (`/assets/buildingGeometryWorker-…js`) was **not captured**; §3.1's roof builders are the main chunk's copies,
  used for the editor's new buildings `[INFERRED: the worker bundles the same builders]`.
* The main thread computes normals; **flattened 3-D** keeps those normals and sets every height to 0 (facet shading
  survives flattening); **flat with roof texture** assigns roof-shape UVs (per-shape UV templates, `getUvsForBuilding`)
  and uses a normal map at strength 0.5 — the "roof-lighting texture" is a normal map. Zero-height buildings go to a
  separate flat mesh; buildings flagged "under roads" drop to the lowest building layer.
* All buildings merge into one vertex-coloured mesh with a per-face building id for picking; 0.1 m dark-grey outlines
  are drawn in the flat modes only.
* **Colour rule** (`getBuildingColorForBuildingAndLayer`, `getBuildingColorForMaterial`, `colorForWeather`). In the
  normal ("satellite") layer: under snow weather, snow white (one of six near-whites by building id when "multiple
  colours" is on); else the building's own colour if set; else its **material's** colour list — the first entry, or entry
  (building id mod list length) when "material multiple colours" is on. There is no wealth or category term and no random
  jitter: the brown-to-grey range of the screenshots is wood browns against stone-brick, slate and wall greys, and civic
  buildings are grey because temples are stone brick and markets pavement (the road colour). Other layers colour by
  category (a 16-entry table over the 17 categories — guild has no entry), by shop type, favourites, favourite people's buildings, custom layer (first matching entry,
  else white) or search match.
* **Shadows in 2-D**: invisible extrusions of every footprint to its height cast real shadow-map shadows onto the flat
  map (`ShadowBuildingsRender`) — the soft offset shadow of the screenshots, whose direction follows the sun.

#### 2.5.6 Sun, sky, season, weather, window lights (`Sun`, `useSunPosition`, `sunDirection`, `sunRange`, `getColourForTime` bytes 1 815 376–1 818 508; `BuildingLights` bytes 4 026 238–4 027 386)

* **Lights.** One ambient and one directional light. The directional light exists only in clear or snow weather —
  cloudy weathers have ambient light only, hence no shadows. Shadow camera ±3 100 m, far 100 000; shadow maps 2 048 to
  32 768 px square (five options, clamped to the GPU's maximum); no shadows while editing. The dark UI theme halves both
  intensities.
* **Sun path.** The hour is placed on the day span (sunrise → sunset) or the night span (sunset → next sunrise). With
  φ = π × (hours elapsed in the span) / (span length), the light sits on a 5 500 m horizontal circle: x ∝ cos φ (sign by
  sunrise direction), y ∝ sin φ (negative in the northern hemisphere) shifted 500 m, height = peak × sin φ + 600 m, the
  peak set by the max-sun-height step — very low 0, low 1 000, medium 9 000, high 19 000. At night the same path carries a
  0.1-intensity "moon". With the day/night cycle off, a fixed light at (3 000, ∓3 000, peak).
* **Colour and intensity.** Six key states — night, deep night, dawn/dusk, day, bright day, sunrise/sunset — each an
  ambient colour and intensity plus a directional colour and intensity. The span fraction picks a segment with
  breakpoints **0.2, 0.5, 0.8** and interpolates linearly: by day dawn/dusk → day → bright day (noon) → day → dawn/dusk;
  by night dawn/dusk → night → deep night (midnight) → night → dawn/dusk; the exact sunrise and sunset hours use the
  sunrise/sunset state. Ambient intensities run 2.1–3, directional 0.1–1.5 (e.g. day ambient `#e5f0ff`, sunset
  directional `#ff8c42`).
* **Season and weather.** Snow weathers swap every ground texture for its snow variant, the map ground and buildings to
  snow white, deciduous trees to a snow list and conifers to their own snow list; autumn and winter swap deciduous colours
  (winter trees are bare-branch meshes); conifers otherwise never change. Season presets fill sunrise, sunset and sun
  height in the place-in-world form (`seasonDefaultMutator`).
* **Window lights.** For each building in the lit set (payload field 26), one flat **8 m-radius** disc (8 sides; 6
  beyond 2 000 m, 4 beyond 3 000 m) at the light layer, 40 % opacity, golden emissive, alpha-masked by `circle_alpha`; all
  in one instanced mesh; mounted only with the day/night cycle on. Position: `lightPosition` (§2.2).

#### 2.5.7 Post-process effects (`effectComposer`, `EffectComposer`, `CustomEffects`, `CrosshatchEffect`; shader builder bytes 1 905 358–1 909 842)

The pmndrs `postprocessing` composer (half-float buffers, 8× multisampling): a render pass, then one effect pass holding
any of greyscale (colour average), sepia, **green tint = a 3-D colour lookup table loaded from `matrix-green`** (the
256 × 16 strip is that LUT), crosshatch, pixelation, vignette (offset 0.5, darkness 0.8), dot screen, scanlines
(multiply, density 1.25, 50 % opacity). The same composer renders PNG exports, so effects apply there. **Crosshatch**
is screen-space: luminance (Rec. 709 weights) picks one of eleven bands — five diagonal line spacings (7, 14, 20, 27,
40 px), each as a cross-hatch (both diagonals) or a single hatch, with thresholds 0.12, 0.2, 0.3 … 0.9 and plain paper
above 0.95; a Sobel edge detector on 0.6-scaled luminance adds outlines; the line colour is the original colour,
near-black, dark blue, or "add" (lines over the original picture); the paper is white or a parchment image; the noise
option jitters the sample point and drops 10 % of edge pixels.

#### 2.5.8 District labels (`DistrictRender`, `MapTextOverLayout`, `RotatedText`; bytes 3 930 232–3 935 719)

* Optional district tint: colour by district id from a fixed list, 60 % opacity, over the district's outline(s) with
  holes. Label: nickname or name, SDF text (troika), bold, font size 25, cream outline at 6 %, placed at the label point
  (payload 10.4) over the district's **largest** outline part.
* **Direction**: along the bounding box's width when width × 1.5 > height, or when the box's top-to-bottom diagonal lies
  within 77°–103° of horizontal; otherwise along that diagonal. **Length** L = the smaller of 400 m and twice the distance
  from the label point to the outline in each direction along that axis, but at least 200 m.
* **Styles**: flat; rotated along the direction; **arced** — glyphs bent onto a circular arc whose chord is L and whose
  half-angle is **0.26 rad (≈ 15°)**, the centre offset perpendicular to the axis; and uniform-size variants (× 2). The
  text is scaled so its width ≈ L/2 × the custom scale; with distance scaling on, a stepped factor by camera height
  applies. No collision handling. A flat fallback label at the box centre is used when SDF text fails.

#### 2.5.9 Trees and rocks — the procedural meshes (`createTreeGeom`, `createRockGeom` and siblings; rendering and fill in §2.3)

* **Deciduous crown**: 5–8 points on a ring of radius 0.6–0.8 × the point count (≈ 3–6 m) at a random phase, each
  jittered ±1 m, joined by cubic Bézier bulges whose control points are pushed outward 0.4–0.7 × the chord, with a 10 %
  chance per side of one extra outward lobe; 1–3 inner contour rings (each 0.93 of the last) drawn as dark lines; white
  vertices tinted per instance from the kind's colour list; shadow proxy = the crown extruded 5 m.
* **Rock**: 10–19 points on a 1.4 m ring jittered ±0.25 m, straight-sided, 2–4 contour rings, 0.5 m extrusion proxy.
* Conifer, palm, winter and 3-D variants follow the same pattern (read by name and size, not in full). Every draw comes
  from the template's own sfc32 stream (§4). Hedgerows are not a render feature: they are persisted tree instances along
  the stone-fence field edges `[INFERRED from §2.1 counts]`.

### 2.6 Exports `[READ]`

**GeoJSON is written in the browser** from the stored layout (`downloadMapAsGeoJson`, `0020` bytes 2 093 778–2 094 122):
one FeatureCollection, pretty-printed, named after the settlement, holding (in this order) every building as a Polygon
(properties: id, kind "BUILDING", name, category, material), **every edge of the graph as its own two-point
LineString** (id, kind "EDGE", edge type — so invisible edges, the map border, water outlines and fences are exported
too), every water body as a Polygon (id, "WATER"), and every ground-texture polygon (id, "BACKGROUND", texture group,
raised flag). Coordinates are metres rounded to two decimals, +y north as stored. **Not exported:** districts, towers,
decorations and trees, roof shape and height, pins, labels, lights.

**SVG is also written in the browser** (`SvgRender`, `ExportToSvgModal`, bytes 2 108 705–2 112 401): the view box is the
border square; layers in order — ground polygons not raised, water, raised ground polygons, buildings (flat polygons in
their material's first colour; no roofs, no shading), every edge except invisible ones as a stroked line of its type's
colour and width (so walls, fences, piers and waterfront outlines appear as lines), and **only deciduous trees**, as
circles of radius 10 × scale; conifers, palms, rocks, point decorations, towers, districts, labels and lights are
omitted; y is flipped and coordinates rounded to 3 decimals; the file is the live element's markup.

**PNG** (`takePngScreenshot`, `Screenshot`, `PngHelper`): a square image of the chosen pixel size, rendered through the
same effect composer by a perspective camera 500 m above the centre whose field of view spans the border square minus a
crop percentage; layers, render settings and effects are those on screen.

**JSON and CSV** (`exportSettlement`, `protoToJson`, `mapPeopleToCsv`, `mapBuildingsToCsv`): the server serves a binary
export (`…/export`, the `SettlementExport` message of the persistence package), decoded in the browser into buildings (id,
name, category, specific type, description, opening times, notes) and people (id, names, gender, age, height, appearance
template values, race, five core personality values, personality text, relaxing trait, religion, stats, job, work /
residence / study building ids, notes, family links), then written as one JSON file or two CSVs. **No geometry** is in
either. (A Foundry appearance export, `exportAppearanceForFoundry`, exists; read by name only.)

## §3 The geometry toolkit

### 3.1 Roofs — computed in the browser on every render `[READ]` (`createRoofGeometry` and builders, `0020` bytes 3 574 401–3 579 418)

* **Render modes** (`buildingRoofOptionHelp`): flat polygons; flat with a roof-lighting texture; 3-D roofs generated at
  render time (not applied while editing the layout); flattened 3-D (same roofs without depth).
* **Dispatch by the stored roof shape.** Flat modes, the flat shape and the church-star shape draw the footprint flat;
  hip → straight skeleton as is; gable → straight skeleton + gable post-process; circle → a circular roof; left/right L,
  U / shallow U, towered keep, church steeple, church cross, rectangle hip, rectangle gable, tent diamond → dedicated
  template builders; anything else flat.
* **Straight skeleton.** The footprint is made counter-clockwise and handed to CGAL's straight skeleton (WASM); the
  result is a vertex list with a third coordinate = the skeleton's time (perpendicular distance to the eaves) and one face
  per footprint edge. **Pitch rule:** vertex height = eave height + 0.5 × time (`ROOF_SCALING_FACTOR` 0.5), i.e. every
  roof plane rises at atan(0.5) ≈ 26.6°, whatever the footprint. A skeleton failure or empty result falls back to the
  flat footprint.
* **Gable post-process.** Mark the footprint vertices (time 0). For every skeleton face that is a triangle made of
  exactly two footprint vertices and one interior vertex — a hip end — move that interior vertex to the midpoint of the
  two footprint vertices, keeping its height. The hip end becomes a vertical gable end and the adjoining faces stretch to
  meet it; faces that are not hip-end triangles are untouched, so complex footprints keep hips where they have no simple
  end.
* **Rectangle gable template** (a 4-corner footprint only; otherwise flat): ridge from the midpoint of the first edge to
  the midpoint of the third, ridge height = half the first edge's length × 0.5 (the same 26.6° pitch); two slopes and two
  gable triangles written directly as a fixed-index mesh.

### 3.2 Point sampling — the jittered grid `[READ]` (`evenlyDistributedRandomPointsInLayout`, entry chunk `Nit`)

Given a polygon and a rate per m²: n = ⌈area × rate⌉, cell side ℓ = √(area / n); walk the bounding box in ℓ × ℓ cells,
put one point uniformly inside each cell (two draws), keep it if it lies inside the polygon. The expected count is n
(boundary cells lose points), spacing is quasi-regular (never two points in one cell, but neighbours can touch across a
cell border). Draws come from the supplied generator, or the unseeded browser random by default.

### 3.3 Offsets and booleans — Clipper at centimetre integers `[READ]` (`offset`, `0020` bytes 952 276–952 618)

Coordinates are multiplied by 100 and rounded (cm integers), offset as a closed polygon with **square** joins by
distance × 100, and divided back; an empty result means the polygon vanished. The same library backs the other polygon
operations of the client (the loaded instance is shared, `getLoadedClipper`).

### 3.4 Edge picking — a BVH over edge boxes `[READ]` (`EdgesBoundingBoxInternal`, `useEdgeBoundingBoxStore`, `closestEdgeToPoint`, bytes 341 462–344 955, 2 510 511–2 511 046)

Every edge becomes a box of its drawn width (1 m for zero-width types) × its length × 50 m tall, spanning 25 m above
and below the map plane so rays at map height pass through it; all boxes merge into one mesh indexed by `three-mesh-bvh`, each face
tagged with its edge id. Queries: ray casts (crossing tests, the face walk's +x ray), and "closest point on the mesh" for
cursor snapping, accepted within max(snap distance, width / 2). Edges added during the edit get their own box meshes,
tested alongside; edges marked for removal are skipped.

### 3.5 Intersection lookup — a uniform hash `[READ]` (`useIntersectionCacheStore`, `convertDimensionToIndex`, bytes 348 649–351 735)

Buckets 100 m square, indices counted from −10 000 m; a query scans the 3 × 3 buckets around the point and returns the
nearest intersection (other than an excluded id) if its squared distance is within the squared snap radius. New
intersections enter the hash at creation; an intersection whose last connection is removed is deleted.

### 3.6 Segment and polygon tests `[READ]` (`newPointSelfIntersects`, `polygonSelfIntersects`, entry-chunk `lineIntersectionPoint` = `Wet`, `unitGradient`, `equalsEpsilon`)

The segment test returns a point, nothing, or a "collinear" marker. Polygon self-intersection is the plain all-pairs
check: adjacent segments may touch at their shared vertex and may be collinear only if they run the same way (equal unit
directions within an epsilon); any other contact fails. The inside test of the face walk is ray parity with a 10⁻⁶
tolerance on the crossing's x.

### 3.7 Line smoothing and ribbons from a path `[READ]` (`smoothLine`, `fillRiverFromPath`)

Corner cutting at ¼ and ¾ per pass (ends kept); a path is widened by offsetting the out-and-back polyline by half the
width with square joins (Clipper, §3.3) — the same routine gives river outlines; a two-point path is widened by its
perpendicular.

### 3.8 The shore distance field `[READ]` (`Water`)

A CPU brute force: for each shore segment, the texels of its bounding box grown by 500 m receive min(current, exact
point-to-segment distance) in half-float precision; 1 024² texels over the water's bounding box, linearly filtered, so
the field's resolution is the water extent / 1 024 (≈ 5 m for a 5 km map).

### 3.9 Triangulation and text `[READ]` (vendor)

Polygons with holes are triangulated by three.js's shape triangulation (the vendored earcut, bytes 3 570 025–3 574 131);
district text is troika SDF text; the 3-D text fonts (Garamond, Cinzel) are JSON glyph fonts.

## §4 Randomness

**Generator.** `[READ]` sfc32 — four 32-bit state words, one add-rotate-xor-counter step per draw, output = the sum word
as an unsigned fraction of 2³² (the entry chunk's `Mit`, imported as `sfc32`). **Seeding:** a string is hashed by
cyrb128 (four multiply-xor lanes with the well-known constants, the entry chunk's `qet`) into the four state words. Draw
helpers: uniform in [a, b) from a given generator (`getRandomArbitrary`, `T6`); the unseeded helpers
(`getRandomInRange`, `randomStr`, `getRandomInArray`) use the browser's `Math.random`.

**Streams** `[READ]`: (1) one stream per fill area layer, seeded by settlement id + decoration kind, created once per
mount (§2.3); (2) one stream per decoration template, seeded by the template string, used to build that template's
procedural mesh (`createTreeGeom`, `createConiferousTreeGeom`, `createPalmTreeGeom`, `createWinterTreeGeom`,
`createRockGeom` and their 3-D and simplified variants — 15 call sites of the generator in total); (3) a shadow-noise
stream (`handleShadowNoise`). **Unseeded:** new template strings in the editor, UUIDs, and random placements from the
editor's brushes (`randomDecorationsAroundPoint`: uniform point in a circle, scale in [0.8, 1.2]).

**What depends on interaction history** `[READ]`: nothing in the rendered map, except edits the user saves (templates
created in the editor persist as new strings). Tree meshes, forest fills and rock meshes are pure functions of stored
strings — the map re-renders identically on every load. **Server side:** the create form sends an optional integer
`seed` (null = random, per the form's own help text); nothing in the client shows how the server uses it (§8).

**Continuation (§2.4–§2.5)** `[READ]`: the ground-mottling shader's noise origin is one draw of sfc32 seeded by the
settlement id, × 10 000 (`handleShadowNoise`) — deterministic per settlement; the crosshatch "noise" option hashes the
screen coordinate (deterministic per pixel, not per map). The editor's own randomness is all unseeded browser random:
brush placements (uniform in the brush disc, scale 0.8–1.2), new template strings (random base-36 until a kind holds
seven, then a uniform pick among the existing seven, `getTemplateSeed`), UUIDs for new objects. The create form passes
`seed` through untouched; regenerate area and fill-plot send no seed at all, so **every server-side re-roll is unseeded
from the client's point of view** — whether the server derives one is unknown (§8).

## §5 Data assets present — named and shaped, never reproduced

* **Wire schema** — 46 messages, 54 enums (§2.1). Structural enums are described in §2.1; content enums (items,
  professions, hobbies, mannerisms, motivations, name generators …) are counted there and not listed.
* **Farm and ground textures** — image imports named for their crop or ground (wheat, snow field, tilled, grass, grain,
  cattle, sheep, flax, hop, pig, snow dirt, vineyard …; `wheatTextureImg` and siblings in the colour-picker module) and
  tree-area textures (deciduous, coniferous, palm, rock area). Captured as PNGs in the network bodies; not reproduced.
* **Decoration templates** — seven seed strings per templated kind in each settlement (§4); the meshes are procedural.
* **Fonts** — Garamond and Cinzel as JSON glyph fonts for 3-D text (`garamondFont`, `cinzelFont`), plus SDF text via troika.
* **Help texts and form option lists** — the create form's labels and help strings live in the chunk (e.g. the seed's
  help text); they are UI copy, not generation data.
* **Palettes and tables named and shaped (none reproduced).** Where each lives, its shape, and at most a few examples:

| asset | shape | range / examples | where |
|---|---|---|---|
| edge-type colours | 15 entries keyed by edge type (+ 1 rim colour rule) | pale beige-greys to near-black; roads `#beb6aa` | `edgeTypeToColor`, chunk `0013` ≈ byte 35 400 |
| edge widths and rim widths | 2 × 15 metres by type | 0–6.5 m (§2.5.2, stated as dimensions) | `getWidth`, `getBackgroundWidth`, `0013` ≈ 37 300 |
| edge 3-D depths | 15 by type | 0, 1 or 10 m | `edgeTypeToShadowDepth` |
| layer heights | 19 named levels + three 16-entry mode sets | −0.5 to 25 m (§2.5.1) | entry `C$`; `FLAT_HEIGHTS` etc. |
| material colours | 11 materials → lists of 1–7 near-identical shades (pavement and wall reuse the road and wall colours) | wood ≈ seven browns, stone brick three greys | `BUILDING_MATERIAL_COLOURS`, `0013` ≈ 38 200 |
| material icon filters | 11 CSS filter strings (UI swatches) | — | `BUILDING_MATERIAL_IMG_FILTER` |
| category colours | 16 of 17 categories (a standard 20-colour categorical palette) | residence green, government black | `BUILDING_TYPE_COLOURS` |
| shop colours / layer colours | 12 specific shop types; 21 default layer colours | — | `USEFUL_SHOP_COLOURS`, `DEFAULT_LAYER_COLOURS` |
| district tint colours | one list, indexed by district id | — | `districtColours` |
| ground textures | 24 types + custom: image, optional normal map, default colour, UV scale, rotate-to-edge, blur flag, noise pair, snow overrides | e.g. wheat's default colour a pale yellow | `typeToTextureDetails`, bytes 284 676–290 639 |
| snow shades | 6 near-whites | — | `SNOW_COLORS` |
| lighting states | 6 states × (ambient colour, ambient intensity, directional colour, directional intensity) + breakpoints 0.2 / 0.5 / 0.8 | intensities 0.1–3 | `NIGHT`, `DEEP_NIGHT`, `DAWN_DUSK`, `DAY`, `BRIGHT_DAY`, `SUNRISE_SUNSET` |
| tree and rock colour lists | 8 lists of 4–6 shades (deciduous, autumn, winter, snow, conifer, snow conifer, palm, rock) | — | `TREE_COLORS` and siblings |
| water base colour | 1 | `#6f89a0` | `WATER_COLOR` |
| building-pool presets | 7 presets × 14 pool weights (percent) | "residential" ≈ 90 % residential pool | `DISTRIBUTION_PRESETS` |
| texture images | about 30 image imports by name (crops, animals, grass, lawn, sand, pebble + normal, cliff, snow variants, tree-area icons, water, parchment, `edges_alpha`, `circle_alpha`, `matrix-green`) | captured in the network bodies | image imports |

  The two tables stated in full in §2.5 (edge widths, layer heights) are geometry of the rendering, given as the numbers
  a designer compares against; the colour and content tables are shaped only. PENDING FABLE REVIEW flags this split.

## §6 Corrections — profile claim | what the code says | where it matters

| id | profile / critic / confidence claim | what the code says | matters for |
|---|---|---|---|
| C1 | edge type 6 = "rural lanes, the longest class" (confidence §1.1, §1.2, C4, C14) | 6 = STONE_FENCE (field walls; 853 edges in both captures) | ARCHITECTURE §4.9 (fields and their boundaries), §8 symbolisation; confidence C4/C14 |
| C2 | "only the tower chain is serialised — the client strokes the band" (confidence §1.2, C11; `_critic-ftg` F15) | the wall is in the edge graph as STONE_WALL edges (25 in Galeiaward, 44 in Nevervalley); towers are a separate list typed by wall kind with a scale; the wall kinds are WALL / STONE_WALL / SANDSTONE_WALL / WOOD_WALL, fences STONE_FENCE | §4 walls (the wall as typed graph edges), §8; confidence C11 |
| C3 | types 2 / 10 / 7 were "streets / minor" (payload-visual §5.1) | 2 = DIRT_ROAD, 10 = SMALL_ROAD, 7 = STONE_WALL; 13 = TRAIL (outside-decoration paths, 15 in Nevervalley); 11 = WOOD_PIER | §2 road classes; confidence C4 |
| C4 | field 9 = "lots / blocks": 901 block lots, 1.52 buildings per lot, 22.9 % empty, 38 % coverage; "15 plazas"; "4 reserved natural areas"; "district-stage lots are not serialised" (`_critic-ftg` F13, confidence §1.2, C7) | field 9 = ground-cover textures grouped by texture type; the 901 are LAWN patches, the 15 are paved ROAD-texture patches drawn above roads, the 4 are SAND (beaches); **no lots or plots of any stage are serialised** — the per-"lot" statistics measure lawn patches | §4.5–4.7 (lot/plot statistics must not be calibrated on lawn patches), §8 ground treatment; confidence C7, C17 |
| C5 | 8.6 = "entrance, on the outline, on the road-facing edge, 3 m from the road; 109 without" (payload-visual §3.3, §5.2; confidence C9) | 8.6 = `lightPosition`, the building's night-light anchor; the geometric measurements stand, the name does not; a door is not transmitted | §2.8 entrance set (do not cite FTG as evidence of a stored door), §8.5 |
| C6 | 8.8 = "variant index, ridge orientation ~50/50" (payload-visual §3.3; confidence C9, D3) | 8.8 = roof shape enum: gable vs hip ≈ 50/50 for ordinary buildings; church star / steeple / cross, flat, L, U, towered keep, tent diamond, rectangle roofs for special buildings | §8.5 roof treatment; confidence D3 |
| C7 | building height unknown / not on the wire (confidence D3 "heights") | 8.9 = integer height (5 for most, 6, 10, 12, 20 for some) | §2 height fields (owner's shadow hook) |
| C8 | "no WebAssembly frames" (confidence §1.2, D1) | two WASM modules: CGAL straight skeleton and Clipper | §8 renderer; confidence D1, D3 |
| C9 | 11.2 / 11.4 / 11.5 "WELL / BANDSTAND / STATUE by the critic's argument" (payload-visual addendum) | CONFIRMED by name: `wells`, `bandstands`, `statues`; 11.1 fountains, 11.3 fires, 11.6 monuments, 11.7 tall stones (stone circles), 11.8 rocks | confidence C16/C17 |
| C10 | "the 7 sprite variants assigned round-robin" (confidence C15) | the 7 are template **seed strings** for procedural meshes; the assignment of instances to templates is server-side | §8.7 trees |
| C11 | forests "filled at render, seeding untested/unseeded" (confidence A4, C15; ftg-posts-c §7.5) | filled by a jittered grid at 0.005/m² × density × tree %, seeded by settlement id + kind (deterministic per settlement) | §6 determinism (FTG's render fills are reproducible), §8.7 |
| C12 | "no seed model in the product" (confidence §1, A4) | the create form sends an optional integer `seed` (blank = random) | confidence A4 wording |
| C13 | "window lights only for buildings with an awake adult" decided by a client query model (confidence F1 `[INFERRED]` deterministic query) | the lit set is computed by the server and shipped as field 26 on load and on every time step | confidence F1, D5 |
| C14 | "the layout body is consumed as a stream into a WASM decoder" (memory, profiler hazard) | the layout is read as one array buffer and decoded by generated JavaScript in the main thread (`protoToJson$1`); the interception hazard itself stands | profiler notes |
| C16 | GeoJSON property schema "never captured"; districts absent (confidence G1, `_critic-ftg` F26) | schema read (§2.6): buildings, one feature per graph edge, water, ground textures; districts **and** towers, trees, decorations, roofs, heights absent | §11.1 export parity (our export exceeds FTG's) |
| C15 | "Delegating" and four other person types (F18, F23) | six person types: studying, working, unemployed, delegating, **visiting**, retired | confidence F1 |

| C17 | roads drawn "with mitred corners", "a 1 px rim" (visual-spec §4.4; confidence D2) | per-edge rectangles with **round discs** at intersections; the rim is a band 0.25 m wider per side (roads, walls), not a pixel stroke | ARCHITECTURE §8.2 symbolisation, §8.4; visual-spec §4.4 |
| C18 | building colour "a wealth/type-driven ramp", mapping unverified (visual-spec §4.3, open question 9; confidence D2 "must invent the building-colour rule from type/wealth") | colour = the building's override, else its **material**'s shade list (entry = id mod length when the multi-colour option is on, else the first); snow overrides all; no wealth or category term | §2.6 materials, §8.2; confidence D2 |
| C19 | "soft dark drop shadow to the lower-right" as a painted feature (visual-spec §4.4) | a real shadow map: invisible extrusions of footprints (to their height), walls (10 m), fences and piers (1 m), towers (20 m) cast onto the flat map by the directional sun; none under cloudy weather | §8.4 layers, shadows, heights |
| C20 | `matrix-green` = "a colour LUT atlas", `edges_alpha` = "edge-fade alpha", `circle_alpha` = "soft round mask (shadows / glows)", roles inferred (visual-spec §4.2, open question 8; confidence D1 "must invent the material/LUT setup") | `matrix-green` is the 3-D LUT of the **green-tint effect only** (no role in base shading); `edges_alpha` is the across-width alpha of every edge ribbon (trails use the other half of the image); `circle_alpha` masks the **window-light discs** | §8.2 paint programs; visual-spec §7.8 |
| C21 | water depth and foam from "distance-from-shore functions (SDF or blurred mask)" `[INFERRED]`; band widths unknown (confidence D4; ftg-posts-c §7.10) | a CPU-built 1 024² half-float distance field, capped at 500 m; depth ramp over 0–500 m with 20 m noise; foam 12 m (sea) / 20 m (inland) with 3 m noise; sea = ≥ 400 m of outline along the map border | §2.3 water, §8.2; confidence D4 |
| C22 | light-colour curves and the day/night maths "must be invented" (confidence D5) | six key lighting states, breakpoints 0.2 / 0.5 / 0.8 of the day or night span, sun on a 5 500 m circle with a four-step peak height (0, 1 000, 9 000, 19 000 m) + 600 m; cloudy = no directional light | §8.2 presets; confidence D5 |
| C23 | effects = three.js `EffectComposer` stock passes + a custom `ShaderPass` `[INFERRED]` (confidence D6) | the pmndrs `postprocessing` composer with one `EffectPass`; greyscale, sepia, LUT green tint, pixelation, vignette, dot screen, scanline, and a custom crosshatch `Effect` (5 spacings × 2 diagonals by luminance band + Sobel outlines) | §8.2 (effects are ours to design); confidence D6 algorithm identity |
| C24 | district arc "spine through the district polygon?" must be invented (confidence D7; ftg-posts-b §T-30) | no spine: the label runs along the bounding box's long axis (or its diagonal), its length set by rays to the outline (200–400 m), bent onto a fixed 0.26-rad half-angle arc; no collision handling | §9.3 spines and candidates |
| C25 | snapping distance "11", unit unstated (confidence E1; `_critic-ftg` §6.4) | world metres; default 5; user slider; per-edge floor of half the edge width; not zoom-scaled (the 11 was a user setting) | §7.1 edits, §3.6 insertion semantics |
| C26 | "self-intersection prevention and layout validation at the authoring boundary"; road-legality thresholds sought (confidence E1; `_critic-ftg` §6.2) | the client checks only zero-length edges and polygon self-intersection; **no road-legality threshold exists client-side** (the server may validate on save — its errors are only the eviction confirmations) | §7.1 dry-run validation; confidence C5 unknowns |
| C27 | fill tool: raycast to a road, "always taking the leftmost path" (confidence E1; ftg-posts-a §2.3) | confirmed, plus: an odd-crossings inside test that rejects outer loops and tries the next hit, spur removal, a 2 000-step cap | §7.2 field brushes; §3.4 kernel face queries |
| C28 | "`roadLength` factor of two" — does the form double or the generator halve? (`_critic-ftg` §6.1, F3) | the client sends the slider value unchanged (30–100 m, default 50) — any halving is server-side | §4.4 S5 growth constants; ftg-docs-params §5 |
| C29 | regenerate area: "must invent how the drawn polygon is registered into the road graph" (confidence E2) | the area is never a free polygon: the user selects existing **road-graph faces** by the face walk; the server returns the lots; "divide lots to area" 1 000–100 000 m² (default 10 000) with a dividing road type | §4.11 incremental mode, §7.3 locality |
| C30 | "Fill dense" among the building tools, mechanism unknown (confidence E1) | a server call (`tools/layout/fill-plot`) taking a face polygon and returning footprints with roof shapes: FTG's plot subdivision is a reusable server service | §4.7 S10 plots (FTG's plotter is callable per polygon) |
| C31 | SVG export: "trees are simplified and texture detail is lost" (confidence G1) | SVG keeps only deciduous trees (circles r = 10 × scale), buildings in flat first material colour, edges as stroked lines (walls and fences included); no districts, labels, towers, decorations, conifers, palms or rocks | §11.1 formats (our SVG must exceed it) |
| C32 | "JSON of buildings" (confidence G1) | JSON and CSV are formatted in the browser from a server-side binary export: buildings (no geometry) and people | §11.1 |
| C33 | bridges "could not be isolated" (`_critic-ftg` §6.5) | the client has no bridge concept: roads are drawn above water by layer height; a bridge exists only as road edges over a water polygon | §2.7 bridges (ours are explicit) |
| C34 | the layout edit is guarded by `stateId` optimistic concurrency (confidence G2, payload field 1 note in §2.1) | the editor's calls do not send `stateId`; the server returns a new one after a successful edit, which the client stores | §11.3 host bridge (FTG's edit path is last-writer-wins from the client's side) |
| C35 | hedgerows "rows of small tree blobs along every field boundary" as a render texture (visual-spec §4.4) | no hedgerow renderer exists; field boundaries are stone-fence edges (0.5 m, 1 m shadow depth) and trees are persisted instances `[READ]` for the renderer, `[INFERRED]` for the server's placement | §4.9 S12b greenery |

## §7 The critic's open questions, answered from the code

`_critic-ftg.md` §6 and the ten riskiest unknowns of `docs/confidence/ftg.md` §4. The client answers the questions about
the renderer, the editor and the wire; it cannot answer generation-side ones, because generation runs on the server.

| question | answer | grade |
|---|---|---|
| critic §6.1 — the `roadLength` factor of two | the client sends the slider value unchanged (30–100 m, default 50, per stage and for the suburb stage); the factor, if real, is applied by the server — the proposed VILLAGE capture at 100 m remains the test | CONFIRMED (client side); server side still unknown |
| critic §6.2 — road-legality thresholds, snap radius | editor snap radius: 5 m default, world metres, user-set, floored at half the edge width; the editor enforces **no** separation, angle or length rule; the generator's legality rules are server-side | CONFIRMED (editor); generator unknown |
| critic §6.2 — district-type scoring, plot rule, number of districts | server-side; the client only exposes the plotter as a callable service (`tools/layout/fill-plot`: face polygon in, footprints out) and the district regeneration inputs (§2.4) | unknown (server) |
| critic §6.3 — district-stage lots are not serialised; block structure only as road-graph faces | confirmed from the other side: the client holds no lots at all; every lot-level operation (fill, fill dense, regenerate) recomputes a **face of the edge graph including invisible edges** by the face walk, and the fill-failure message tells users to close faces with roads or invisible edges — so computing faces of the full typed graph (invisible edges included) is the faithful way to recover FTG's lots from a payload | CONFIRMED (client); PLAUSIBLE that server lots = graph faces |
| critic §6.4 — determinism; snapping unit | render-time fills, rock and tree meshes and ground mottling are deterministic per settlement (sfc32 seeded by settlement id or template string); the snapping unit is metres; the create `seed` is passed through, regeneration sends none | CONFIRMED (client); server determinism unknown |
| critic §6.5 — bridges | the client has no bridge concept; roads are drawn over water by layer height | CONFIRMED (client); server placement (`minDistanceBetweenBridges`) unknown |
| critic §6.6 — images not re-read | not a code question | — |
| confidence §4.1 district-type selection | server | unknown |
| confidence §4.2 road legality, jitter, stage termination | server; stage defaults read (angle caps 15°, branch after 4, minimum district area 10 000, spoke-stay 0.1, roadLength 50) — they are the form's defaults, not the generator's rules | defaults CONFIRMED; rules unknown |
| confidence §4.3 district-lot division | the regenerate call carries the division target explicitly ("divide lots to area" 1 000–100 000 m², default 10 000, dividing road type); the division itself is server-side | parameter CONFIRMED; algorithm unknown |
| confidence §4.4 plot constants | server (fill-plot) | unknown |
| confidence §4.5 wall tracing, towers | server; client facts: the wall is typed edges, towers carry a scale and a wall type, tower radius = 0.75 × wall width × scale | render CONFIRMED; tracing unknown |
| confidence §4.6 coast and river curves | server; the client's own river tool is corner-cutting smoothing + an offset ribbon (default 40 m), which may or may not mirror the server's rivers | client tool CONFIRMED; generator unknown |
| confidence §4.7 farmland | server; regenerate-as-farmland inputs are natural texture, farmstead multiplier and farm types | unknown |
| confidence §4.8 suburbs | server; the suburb stage form has its own road-length slider (same 30–100 range) | unknown |
| confidence §4.9 castle, harbour, decorations | server; the client only draws what arrives (piers as 3 m ribbons, waterfront outlines invisible) | unknown |
| confidence §4.10 determinism and content generators | see §6.4 row; content generation is server-side | unknown (server) |
| visual-spec open question 8 — how `matrix-green`, `edges_alpha`, `circle_alpha` are sampled | §6 row C20 | CONFIRMED |
| visual-spec open question 9 — building-colour rule | material only, shade by id (§6 row C18) | CONFIRMED |

## §8 What remains unknown

* **Everything the server does**: the whole generation pipeline (roads, districts, lots, plots, walls, coast, rivers,
  bridges, farmland, decorations, names, people), the simulation behind the lit-building list and the calendar, the
  use of the create `seed`, whether `roadLength` is halved, what the layout save validates beyond the eviction
  confirmations, what fill-plot and regenerate do with a face. All `[INFERRED]` from the guide and posts only.
* **The building-geometry worker** (`buildingGeometryWorker-….js`) was not captured; the main chunk's roof builders
  (§3.1) are assumed to be what it runs.
* **Read by name or in part only**: the create-form field components beyond the stage sliders, the bulk-edit and
  regenerate form bodies (their field names, ranges and defaults were extracted by pattern, not read line by line), the
  cliff strip geometry, conifer / palm / winter / 3-D tree builders, point-decoration meshes (`Decoration`,
  `DecorationToGeometries`), pins, the map scale bar and grid (`MapScale`, `GridRender`), custom-layer matching details,
  the Foundry appearance export, the street-view walking controls, and the minified entry chunk beyond the ≈ 15 helpers
  named in this file.
* **Not answerable from any client**: why a stage's output differs from its settings (the Galeiaward half-length
  segments), the 15° cap's distribution, district scoring — these need further server captures, and any probing of
  the `tools/layout/fill-plot` service would be a new request to the author's server, which is the owner's call.

## §9 Reading record

* **First seat (checkpoint at ≈ 280k context), read in full** (extracts in `scratchpad/code/ftg/classes/`,
  `classes-index/`): the layout loader and converters (`getSettlementLayoutPath`, `protoToJson$1`, `mapPositionArray`,
  `convertPosition`, `convertEdgeNetwork`, `convertWaterBody`, `convertTower`, `convertGroupedTextures`,
  `convertDistrict`, `convertDecorations`, `convertCalendar`, `convertSimpleBuilding`, `lightPositionForBuilding`,
  `mapBuilding`), the time call (`updateSettlementTimePath`), the fill (`TemplateDecorationAreas`,
  `VALUE_PER_UNIT_AREA`, `offset`, `randomDecorationsAroundPoint`, `getTemplateSeed`), the GeoJSON writer, the roof
  builders, the entry-chunk helpers `sfc32` (`Mit`), cyrb128 (`qet`), `T6`, `Nit`, `ire`, `Iit`, `Rit`, the vendor
  straight-skeleton wrapper's public class, and every generated `decode` switch of the schema (by script, 46 messages) —
  ≈ 35 app symbols + 7 entry helpers.
* **Second seat (this continuation), read in full or line by line** (prettified byte ranges in
  `scratchpad/code/ftg/regions/`, listed in §1): the editor store and every tool action; edge picking, snapping, the face
  walk, polygon tests and the intersection hash; the edge renderer, height tables, snapping during drawing and the edit
  components; the save request, confirmation flow and cache reset; the SVG writer, regenerate-area modal and presets; the
  bulk-edit request; the create-form mappers and stage defaults; sun, lighting states and camera controls; water; ground
  textures, field fade and mottling shaders; building workers, colour rule and shadow proxies; towers, PNG, JSON and CSV
  writers; district labels; the effect composer and the crosshatch shader; tree and rock builders; the edge helpers,
  palettes and post helpers of the shared chunk `0013`; the layer-height table of the entry chunk. By range count
  ≈ 365 top-level symbols fall in the ranges read, plus ≈ 50 separately extracted symbols (the two overlap; form and
  icon components inside the ranges were skimmed, not studied). Total: **≈ 400 of ≈ 2 000 app symbols** of
  `ThreeJsPages` (4 409 symbols with vendor code), chosen as the FOCUS subset (data model, editor, renderer, exports,
  randomness); the rest are forms, modals, people / faction / religion UI and vendor code.
* **Scripts:** `jstok.py` (tokenizer; all four chunks balance), `symmap.py` (symbol maps), `extract.py` (per-symbol
  prettified extracts), `region.py` (prettified byte ranges with a marker per symbol), `pbschema.py` (schema from
  generated code → `pbschema.json`, `pb-all.txt`), `sim/decode_layout.py` (our decoder of the two captured payloads with
  the recovered names → `sim/*.out.txt`); joins `index-import-map.json`, `patreon-import-map.json`.
* **CONFIRMED:** everything tagged `[READ]` (read on disk) and every count in §2.1 (executed on both captures).
  **PLAUSIBLE:** the district detail-request inference in §2.1; that the uncaptured worker runs the main chunk's roof
  builders; that FTG's server lots are faces of the full typed edge graph (invisible edges included); that hedgerows are
  server-placed tree instances; the byte offsets quoted as "≈" in the §5 table.

## Fable review (2026-09-27) — B-code/ftg-client

Verdict **CORRECTED** (Fable 5.1, lane fable-review/main/code; `docs/fable-review/main/code.md`, receipts FTG 1–11). Read whole.
Firewall: no fenced code; five distinct colour literals — at R5's limit, KEEP; API path templates, UI and help strings are
identifiers used to locate code paths (J-Fcode-1); the §2.5 edge widths, layer heights and lighting breakpoints the header asks
about are LOGIC (dimensions that parameterise the renderer, J-Fcode-8), admissible here and entering the design only as
reference observations attached to a decision; the enum value lists are vocabularies, citation-only, never a list in the
design (the §17.1 identifier check already names the payload identifiers). Re-derived on the bundles by symbol name (`0020`,
`0013`; the reader's `code/ftg` scratchpad schema listing): the 15-value edge enum with STONE_FENCE 6 and STONE_WALL 7; the
25-value texture enum with road paving 8, lawn 18 and sand 20; positions ÷ 100; `lightPositionForBuilding` = the stored light
position else the midpoint of the outline's first two vertices, the building message's field 6 being `lightPosition` and no
field a door; 27 fields in the layout message and no lot or plot in any of the 46 messages; the 400 m sea rule; the 0.5 roof
pitch factor; the shared chunk's width, rim, depth and alpha tables and its two quoted road colours; the snap floor max(snap,
width ÷ 2); the stage mapper passing `roadLength` through (default 50, slider 30–100); the fill-plot service returning a lot id
and roofed footprints; the regenerate post on the settlement path; the +x ray of the face walk; `edges_alpha` per edge type,
`circle_alpha` in the window lights, `matrix-green` in the green-tint hook; per-intersection discs of the edge's width with a
wider rim (the 16 sides accepted on the reading).

Corrections (critic R4; this section supersedes the passages named): §0 #2 — "fifteen edge-type values (0–14)", not
"fourteen"; §6 — the table is one table (the blank line before C17 removed) and C15 precedes C16. PLAUSIBLE stays PLAUSIBLE:
the uncaptured geometry worker; server lots as faces of the typed graph including invisible edges; hedgerows as persisted trees;
the district detail-request inference. The design changes this reading requires are items 49 (re-sourced in the evidence
gate, J-Fcode-4) and 50 of `docs/AMENDMENTS-2026-09-27c.md`, both CONFIRMED on the receipts above.

## Fable review (2026-09-27) — B-code/ftg-client (critic)

Verdict **CONFIRMED**. R-T1–R-T6 stand, all six re-derived here; R4 applied above; R10 stands as carved by J-Fcode-4 (F13's lot
figures withdrawn; F4's 49 % ring figure survives with its own source); I3 and I4 stand; P2 and P3 stand. The coverage row
(≈ 400 of ≈ 2 000 app symbols, PLAUSIBLE as a range count) is the right grade for a client bundle without class markers.

## Fable review (2026-09-27) — B-code/ftg-client (impact)

Verdict **CONFIRMED**. Item 50 rests on the light-position field and its fallback and on the absence of any door field —
re-derived above; item 49 rests on the texture enum and on the absence of lots and plots from the wire and on the two server
services — re-derived above. The editor texts carry no reference identifier, code, grammar, palette or word list.
