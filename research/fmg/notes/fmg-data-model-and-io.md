# FMG (Azgaar's Fantasy Map Generator) — data model, file formats, IO, URL parameters, integrations

Scope: FMG source at v1.154.1 (package.json:4; src/services/versioning.ts:23), docs/architecture, the wiki clone, read 2026-10-16.

Path prefixes used in citations:
- `SRC` = `/home/user/maps-architecture/reference/fmg-src`
- `WIKI` = `/home/user/maps-architecture/reference/fmg-wiki`

Claim tags: **[OBSERVED]** read in source/types/tests; **[STATED]** docs/wiki/creator say so; **[INFERRED]** my reconstruction with reasoning. Clean-room: identifiers are named for citation only; nothing is quoted verbatim.

---

## 1. Summary

### Takeaway
FMG keeps a world as two structure-of-arrays Voronoi graphs (`grid`, the jittered-square source graph; `pack`, a denser re-triangulation of land and coast) plus ~20 entity arrays, and persists it as a single CRLF-delimited text file of 53 positional fields (`.map`, optionally gzip-wrapped on read) whose second field is the whole map-config object and whose sixth field is the rendered SVG. Identity is mostly "array index = id" with tombstone `removed` flags; unordered arrays carry their own `i`. Geometry is **not** stored: pack cells and vertices are rebuilt from grid points on load, which is what makes the stored per-cell arrays meaningful. Files from v0.70.0 onward are migrated forward in-process by a long version-gated migration chain; older files are refused. Exports are SVG/PNG/JPEG/tiles, GeoJSON (5 layers, equirectangular lon/lat), plain JSON (4 flavours), many CSVs, an OBJ from the 3D view, emblem images, and an icons zip. Imports are `.map/.gz`, images as heightmaps (by palette quantisation), heightmap templates, name bases, notes/burg-name/culture CSVs, style presets, icon archives and fonts; there is no GeoJSON import. Determinism is seed + requested options + canvas size + generator version; a different version yields a different world.

### Cited findings (headline)
- Two meta-objects, `grid` (pre-repack) and `pack` (post-repack); `pack` is the primary store, `grid` holds square-grid data (heights, climate) — [STATED] `SRC/docs/architecture/data-model.md:7-12`; [OBSERVED] `SRC/src/types/GridGraph.ts:14-24`, `SRC/src/types/PackedGraph.ts:22-78`.
- The `.map` file is the project's "public API" under semver: major = breaks maps, minor = needs auto-update, patch = no format change — [STATED] `SRC/src/services/versioning.ts:1-15`.
- Files older than 0.70.0 are "ancient" and refused; newer-than-app files are refused; equal loads directly; older runs auto-update — [OBSERVED] `SRC/src/services/io/load.ts:153-166`; [STATED] `WIKI/Changelog.md:5`.
- Pack geometry is regenerated from grid points at load (`Grid.rebuildGraph`, `Pack.generate`, `Features.markupPack`), then per-cell arrays are overlaid from the file — [OBSERVED] `SRC/src/services/io/load.ts:302-312, 341-368`.
- The future model moves to one JSON object with `meta`, `facts` (= `options.map`), `layers`, `style`, `data` — [STATED] `SRC/docs/architecture/future-data-model.md:1-204`.

### Gaps
- No printing/PDF export exists in the source; "printing" is covered only by SVG/PNG export — [OBSERVED absence] (grep over `SRC/src` for print/pdf export in `SRC/src/services/io/export.ts:987-999` lists no such function).
- No Foundry VTT or other VTT export exists in FMG itself — [OBSERVED absence] (grep for `foundry|vtt` over `SRC/src`, `SRC/docs`, `SRC/README.md` returned nothing). Third-party importers exist (see §6).

---

## 2. The data model

### 2.1 Graph objects (`grid` and `pack`)

#### Takeaway
`grid` is a jittered square lattice (`cellsX × cellsY` points, spacing derived from the requested cell count) with its Voronoi diagram; `pack` is a second Voronoi diagram built from grid points that matter (deep-ocean points dropped, coast split) and carries a parent pointer `g` back to the grid. All world data except heights/climate lives on `pack`.

#### Grid fields (`SRC/src/types/GridGraph.ts:5-24` [OBSERVED]; `SRC/docs/architecture/data-model.md:20-37, 87-93` [STATED])

| Field | Type / width | Meaning, unit, range | Citation |
|---|---|---|---|
| `spacing` | number | distance between lattice points before jittering, derived from requested cell count | GridGraph.ts:16; data-model.md:23 |
| `cellsX`, `cellsY` | number | lattice columns / rows | GridGraph.ts:17-18 |
| `boundary` | Point[] | off-canvas pseudo-points that clip the diagram at the canvas edge; integers | GridGraph.ts:19; data-model.md:27 |
| `points` | Point[] | one jittered `[x,y]` per cell, map px, rounded to 2 decimals | GridGraph.ts:20; data-model.md:26 |
| `cells.i` | Uint32Array (type) | cell indices | `SRC/src/generators/voronoi.ts:7-12` (docs say Uint16/Uint32 by count, data-model.md:29) |
| `cells.c` | number[][] | neighbour cell ids | voronoi.ts:9 |
| `cells.v` | number[][] | vertex ids of the cell polygon | voronoi.ts:8 |
| `cells.b` | number[] | 1 if the cell touches the map border, else 0 (integers, not booleans) | voronoi.ts:10; data-model.md:32 |
| `cells.h` | Uint8Array | elevation 0–100; **20 = sea level** (≥20 land) | GridGraph.ts:7; data-model.md:89 |
| `cells.t` | Int8Array | distance field: 1 land coast, 2+ inland, −1 water coast, −2 and below deeper water, 0 unmarked | GridGraph.ts:8; data-model.md:91 (docs say Uint8; type file says Int8; load uses Int8 at load.ts:309) |
| `cells.f` | Uint16Array | feature id (island/lake/ocean) | GridGraph.ts:9 |
| `cells.temp` | Int8Array | temperature in °C, clamped −128..127 | GridGraph.ts:10; `SRC/src/generators/temperature-generator.ts:58` |
| `cells.prec` | Uint8Array | precipitation on an unspecified scale; UI displays value × 100 mm | GridGraph.ts:11; `SRC/src/utils/unitUtils.ts:74-77`; data-model.md:93 |
| `vertices.p` | Point[] | vertex coordinates, integers | voronoi.ts:6; data-model.md:35 |
| `vertices.v` | number[][] | 3 adjacent vertices (border vertices have 2 plus a −1) | data-model.md:37 |
| `vertices.c` | number[][] | 3 adjacent cells | data-model.md:36 |
| `features` | GridFeature[] | index 0 placeholder; `{i, land, border, type}` with type ocean/lake/island | GridGraph.ts:23; `SRC/src/generators/features-generator.ts:52-57` |

Requested cell count ("points"): stored as `options.map.graph.points`; the Points slider maps density steps 1..13 to 1 000, 2 000, 5 000, 10 000, 20 000 … 100 000 cells, default step 4 = 10 000 — [OBSERVED] `SRC/src/data/graph-density.ts:3-22`; [STATED] data-model.md:22 (default 10 000, max 100 000, min 1 000).

#### Pack fields (`SRC/src/types/PackedGraph.ts:22-58` [OBSERVED]; `SRC/docs/architecture/data-model.md:39-52, 95-116` [STATED]; widths from load code `SRC/src/services/io/load.ts:341-368` and `SRC/src/generators/pack-generator.ts:52-60` [OBSERVED])

Caveat [OBSERVED]: the inline comments in `PackedGraph.ts` are partly wrong/stale (e.g. `g` described as "ground type", `conf` as "water confidence", `p` as "polygon points", `b` typed boolean[]); the generator code and data-model.md are authoritative. I note where they disagree.

| Field | Width (as loaded/built) | Meaning, unit, range | Citation |
|---|---|---|---|
| `cells.i` | Uint32Array | cell ids | voronoi.ts:11 |
| `cells.p` | [x,y][] | cell centre point in map px (2 decimals) — repacked positions | pack-generator.ts:55; data-model.md:43 |
| `cells.c`, `cells.v`, `cells.b` | arrays | as grid | PackedGraph.ts:25-28 |
| `cells.g` | Uint32Array | **parent grid cell id** — the only link from pack to grid | pack-generator.ts:56; data-model.md:47 |
| `cells.h` | Uint8Array | elevation 0–100, copied from the parent grid cell (20 = sea level) | pack-generator.ts:57 |
| `cells.area` | Uint16Array | polygon area in px², capped at 65535 | pack-generator.ts:58-60; data-model.md:109 |
| `cells.f` | Uint16Array | feature id | data-model.md:98 |
| `cells.t` | typed | distance field as grid | data-model.md:99 |
| `cells.s` | Uint16Array | suitability score for settlement placement | load.ts:349; data-model.md:100 |
| `cells.pop` | Float32Array | rural population in population points (1 point = `units.population.scale` people, default 1000); saved rounded to 4 decimals | load.ts:346; `SRC/src/services/io/save.ts:136`; data-model.md:110 |
| `cells.biome` | Uint8Array | biome id into `pack.biomes` | load.ts:341 |
| `cells.burg` | Uint16Array | burg id (one burg per cell; 0 none) | load.ts:342 |
| `cells.culture` | Uint16Array | culture id | load.ts:344 |
| `cells.state` | Uint16Array | state id (0 = neutral) | load.ts:350 |
| `cells.province` | Uint16Array | province id (0 none) | load.ts:354-356 |
| `cells.religion` | Uint16Array | religion id (0 = none) | load.ts:351-353 |
| `cells.r` | Uint16Array | river id passing through the cell (0 none) | load.ts:347 |
| `cells.fl` | Uint16Array | water flux through the cell; seeded from the parent grid cell's precipitation and accumulated downstream | load.ts:345; `SRC/src/generators/river-generator.ts:85,110-116,209` |
| `cells.conf` | **Uint8Array at load** (docs say Uint16) | flux at confluences | load.ts:343; data-model.md:113 |
| `cells.harbor` | Uint8Array | count of adjacent water cells (scoring) | data-model.md:114 |
| `cells.haven` | Uint16/Uint32 | id of the adjacent water cell used as the harbour for coastal cells | data-model.md:115 |
| `cells.good` | Uint16Array | bonus-good id placed on the cell (0 none) | load.ts:361; data-model.md:107 |
| `cells.market` | Uint16Array | market territory id (0 unassigned) | load.ts:365; data-model.md:108 |
| `cells.routes` | object: cell → {neighbourCell: routeId} | route adjacency; e.g. cell 8 linked to 9 and 10 via route 306 | data-model.md:116; PackedGraph.ts:49 |
| `vertices.p/v/c` | arrays | as grid; `x`,`y` arrays also declared | PackedGraph.ts:51-58 |

Repacking rule [OBSERVED] `SRC/src/generators/pack-generator.ts:15-50`: every grid cell that is land or coastal water (t = −1 or −2) is kept; deep ocean is dropped; of the t = −2 ring every fourth point and all non-coastal lake points are dropped; along the coast (t = ±1) an extra midpoint is inserted between same-type neighbours farther apart than the spacing, so the packed diagram is denser at coastlines. Hence pack cell ids are **not stable** across any re-run of regraph (confirmed by generation-pipeline.md:68 "invalidates every earlier pack cell index" [STATED]).

#### Unit conversions that give the arrays physical meaning
- **Elevation → length**: for h ≥ 20, height = (h − 18)^exponent in metres; for 0 < h < 20, depth = ((h − 20)/h)·50 (negative); h = 0 → −990; then scaled by unit ratio (m 1, ft 3.281, fathom 0.5468). Exponent default 2, user range 1.5–2.2 — [OBSERVED] `SRC/src/utils/unitUtils.ts:59-72`; [STATED] `WIKI/Scale-and-distance.md:46-50` (examples: exp 2.2 high mountain → 16 233 m).
- **Temperature**: sea-level temperature interpolated by latitude between equator/pole settings, minus 6.5 °C per 1 000 m of the same (h−18)^exponent height; Int8 — [OBSERVED] `SRC/src/generators/temperature-generator.ts:43-58`.
- **Precipitation**: wind-driven humidity model, six wind directions, bands per 5° latitude, max passable elevation 85 — [OBSERVED] `SRC/src/generators/precipitation-generator.ts:1-87`.
- **Horizontal scale**: `options.map.units.distance.scale` = distance units per map px, default 3, range 0.01–20, unit-agnostic (km/mi/league/versta/nmi/custom) — [STATED] `WIKI/Scale-and-distance.md:17-34`; serialised in the JSON export as `distanceScale` [OBSERVED] `SRC/src/services/io/export-json.ts:109-110`.
- **Population**: people = ruralPoints·scale + urbanPoints·scale·urbanization.rate; scale default 1000 (10–10000), urbanization rate default 1 (0.01–5), urban density default 10 people/building (for Watabou) — [OBSERVED] `SRC/src/utils/unitUtils.ts:91-105`; [STATED] `WIKI/Scale-and-distance.md:66-71`. Rural pop per cell = (score/5)·area/meanArea — [OBSERVED] `SRC/src/generators/population-generator.ts:49-59`.
- **Rivers**: `discharge` = flux at the mouth cell, labelled m³/s; minimum flux to form a river 30, navigable 100; `sourceWidth` = min(flux^0.9/500, 1); `width` (km) = (offset/1.5)^1.8 where offset grows along the course; `length` = polyline length of the meandered points **in px** (rounded 2 dp) despite the docs saying km — [OBSERVED] `SRC/src/generators/river-generator.ts:10-11, 157, 559-561, 624-633`; [STATED] data-model.md:289-291. **Discrepancy**: data-model.md calls `length` km; the function sums pixel distances; treat as px and multiply by distanceScale [INFERRED].
- **Geographic projection**: equirectangular/linear: lon = lonW + (x/width)·lonT; lat = latN − (y/height)·latT — [OBSERVED] `SRC/src/utils/commonUtils.ts:249-263`. The box is derived: latT = mapSize%·180; latN = 90 − (180 − latT)·latitude%; latS = latN − latT; lonT = min(aspect·latT, 360); lonE = 180 − (360 − lonT)·longitude% — [OBSERVED] `SRC/src/generators/coordinates.ts:71-80`; schema bounds latT 0–180, lonT 0–360 [OBSERVED] `SRC/src/components/options-schema.ts:112-124`.

### 2.2 Entity records

All [STATED] from `SRC/docs/architecture/data-model.md` with [OBSERVED] interfaces from generators. "Index-keyed" = array index equals `i`, element 0 reserved, removal sets `removed: true` without deleting.

| Entity (store) | Keying | Fields (prose) | Citation |
|---|---|---|---|
| **Feature** (`pack.features`) | index-keyed, 0 empty | id; type ocean/lake/island; land flag; border flag; cell count; polygon area (px²; oceans sum cell areas); first (top-left) cell; perimeter vertex ids; shoreline cell ids; height; subtype (land: continent/island/isle/lake_island; lake: freshwater/salt/dry/sinkhole/frozen/lava; ocean: ocean/sea/gulf) — closed sets; rendering group; optional per-feature coastline settings; temp; flux; evaporation; name; lake-river fields inlets/outlet/river/enteringFlux/closed/outCell; note | `SRC/src/generators/features-generator.ts:22-64`; data-model.md:68-81 |
| **Culture** (`pack.cultures`) | index-keyed, 0 = wildlands | id; nameBase id; name; origins (ids, first = main parent); shield type; centre cell; code; colour (hex or hatch url); expansionism; type (Generic/Hunting/Highland/River/Lake/Naval/Nomadic); derived area/cells/rural/urban; lock; removed; note | `SRC/src/generators/cultures-generator.ts:25-52`; data-model.md:122-142 |
| **Burg** (`pack.burgs`) | index-keyed, element 0 is the number 0 | id; name; cell (one burg per cell); x,y (2 dp); culture; state; feature; population (points); type (culture type); group (classification + render group); label override; coa (Armoria COA or picture emblem); MFCG seed / link; capital 0/1; port = water-body feature id or 0; market id; production records; product; treasury; citadel/plaza/shanty/temple/walls 0/1 (Watabou inputs); lock; removed; note | `SRC/src/generators/burgs-generator.ts:25-56`; data-model.md:144-176 |
| **State** (`pack.states`) | index-keyed, 0 = neutrals | id; name; form (Monarchy/Republic/Theocracy/Union/Anarchy); formName; fullName; colour; centre cell; pole (visual centre px); culture; type; expansionism; area/burgs/cells/rural/urban; neighbours; provinces; diplomacy (relation string per state id; neutrals slot holds war stories); campaigns (attacker, defender, name, start, end); alert; military (regiments); label; coa; salesTax 0..1; pollTax; treasury; lock; removed; note | `SRC/src/generators/states-generator.ts:35-77`; data-model.md:178-211 |
| **Regiment** (`state.military[]`) | index within the state; unique key is `stateId-regimentId` | i; total troops; name; army; separate flag; cell; x,y; base bx,by; unit composition record; naval flag; type; icon; children (merged); state; angle; battle-screen transient fields | `SRC/src/generators/military-generator.ts:11-33`; data-model.md:213-227 |
| **Province** (`pack.provinces`) | index-keyed, 0 unused (stored as the number 0) | id; state; name; formName; fullName; colour; centre; capital burg; pole; coa; label; derived area/rural/urban/burgs; lock; removed; note | `SRC/src/generators/provinces-generator.ts:16-36`; data-model.md:229-250; `load.ts:336` (default `[0]`) |
| **Religion** (`pack.religions`) | index-keyed, 0 = "No religion" | id; name; type Folk/Organized/Cult/Heresy; form; deity; colour; code; origins; centre; culture; expansionism; expansion global/state/culture; derived stats; lock; removed; note | `SRC/src/generators/religions-generator.ts:23-52`; data-model.md:252-274 |
| **River** (`pack.rivers`) | unordered, own `i` | id; name; type; source cell; mouth cell; parent river; basin (main stem id); cells (path, may repeat; −1 = off-canvas); optional points (manual rivers); discharge; length; width; widthFactor; sourceWidth; label; note | `SRC/src/generators/river-generator.ts:13-30`; data-model.md:276-293 |
| **Route** (`pack.routes`) | unordered, own `i`; **id 0 is a valid route** | id; points as [x,y,cellId]; feature id (one landmass/water body per auto route); group (roads/trails/searoutes default); optional cells; merged; length; name; lock; label; note | `SRC/src/generators/routes-generator.ts:176-188`; data-model.md:390-401 |
| **Marker** (`pack.markers`) | unordered, own `i`; SVG id `marker{i}` | id; type; icon ref; x,y; cell; dx/dy %; px; size; pin style; fill/stroke; iconFill/iconStroke; hidden; pinned; lock; name; note | `SRC/src/generators/markers-generator.ts:75-97`; data-model.md:295-316 |
| **Zone** (`pack.zones`) | own `i`, array order = draw order | id; name; type; cells list; colour; hidden; lock; note | `SRC/src/generators/zones-generator.ts:11-19`; data-model.md:403-414 |
| **Ice** (`pack.ice`) | own `i`, order = draw order | glacier {points, offset} or iceberg {points, cellId, size, offset} | `SRC/src/generators/ice-generator.ts:11-27` |
| **Relief icon** (`pack.relief`) | none (array order = z-order) | {type, variant?, set?} or {icon}, plus x, y, base size s | `SRC/src/generators/relief-generator.ts:39-42`; data-model.md:425-448 |
| **Measurer** (`pack.measurers`) | none | type Ruler/Opisometer/RouteOpisometer/Planimeter; points | `SRC/src/generators/measurers-generator.ts:3-8` |
| **Good** (`pack.goods`) | own `i` from 1, not index | name; tags; base value; unit label; icon; colour; placement chance; distribution JS expression; biomeOutput; recipes; multipliers; demandCoverage; visible; note | `SRC/src/generators/goods-generator.ts:10-44`; data-model.md:457-474 |
| **Market** (`pack.markets`) | own `i` from 1 | centreBurgId; colour; name; per-good stock/price | `SRC/src/generators/markets-generator.ts:16-23` |
| **Deal** (`pack.deals`) | own `i` | seller/buyer ids and types burg/market; good; units; price; tax | markets-generator.ts:25-35 |
| **Biome** (`pack.biomes`) | index-keyed | id; name; colour; habitability; movement cost; relief pool (weighted icon entries); iconsDensity 0–250; removed; note. Stats stripped at load | `SRC/src/generators/biomes-generator.ts:7-17`; load.ts:313-330 |
| **AddedLabel** (`pack.addedLabels`) | own `i` | x,y; label record; note | `SRC/src/generators/added-labels.ts:9-15` |
| **Label** (on states/provinces/burgs/rivers/routes/addedLabels) | n/a | text (pipe = line break); group; hidden; dx/dy px; fontSize %; letterSpacing; pathPoints (undefined = default, [] = plain text, points = own path); startOffset % | `SRC/src/generators/labels-generator.ts:27-37`; data-model.md:318-345 |
| **Journey** (`pack.journeys`) | own `i` | name; type; colour; segments (i, name, colour, from/to cells, transport **name**, speed km/h, distance px, points [x,y,cell], avoidRoads, duration h, custom, visible); visible; lock; note | `SRC/src/types/Journey.ts:1-28` |
| **Emblem** (`coa` on burg/state/province) | n/a | heraldic: t1 tincture, division, ordinaries, charges, inscriptions, diaper, zoom, shield; picture: icon id (+shield); both: size, x, y placement | `SRC/src/types/emblems.ts:1-76` |
| **Notes** | n/a | since 1.152 a `note` HTML string on each entity, not a separate array | load.ts (slot 4 deprecated), auto-update.ts:1850 |
| **Name bases** (`Names.nameBases`) | index-keyed | name; comma-joined training names; min/max length; duplicable letters; multi-word ratio | data-model.md:555-565; save.ts:127-133 |
| **GraphOverrides** (`GraphOverride.state`) | vertex id | per vertex `[originalPoint, editedPoint]` pairs under pack.vertices.p | `SRC/src/generators/graph-override.ts:7-14`; data-model.md:18 |

Definition sets stored in `options.map` (not pack) because entities reference them by name/id: burg groups, label groups, military unit types, transports, custom icons, coastline settings, relief rules — [STATED] `SRC/docs/architecture/configuration.md:123-134`; schema [OBSERVED] `SRC/src/components/options-schema.ts:156-172`. Burg group record: name, order, active, isDefault, min/max/percentile population filters, feature/biome/state/culture/religion filters, preview generator — [OBSERVED] `SRC/src/types/burg-groups.ts:1-16`. Military unit type: icon, name, rural/urban draft rates, crew, power, type, separate, optional biome/state/culture/religion filters — [OBSERVED] `SRC/src/types/Military.ts:1-14`.

### 2.3 What `options.map` holds (the file's settings block)
[OBSERVED] `SRC/src/components/options-schema.ts:112-172`: seed (string); graph {width, height, points}; geography {mapSize %, latitude %, longitude %, coordinates {latT, latN, latS, lonT, lonW, lonE}}; climate {temperature {equator, northPole, southPole}, precipitation, winds[6] degrees}; cultures {set}; lore {name, description, calendar {year, era, eraShort}}; units (distance unit+scale, area unit, height unit+exponent, temperature unit, population scale + urbanization rate/density); style {preset}; burgs.groups; labels.groups; military.units; transports; customIcons; coastline; relief.rules. [STATED] `configuration.md:3-24, 80-99`: `options.generation` (requests) and `options.app` (browser prefs) never enter the file.

### 2.4 What `future-data-model.md` plans
[STATED] `SRC/docs/architecture/future-data-model.md:1-204`: a single valid-JSON `.map` with sections `meta` (copyright, license, source, initial {timestamp, version, userAgent}, current {timestamp, version, userAgent, revision}), `facts` (= `options.map` exactly: seed, graph, geography, climate, cultures.set, lore, units, style.preset, burg/label groups, military units, transports, coastline), `layers` {order, active}, `style` (the store record), and `data` with `topology.grid/pack` (typed arrays as JSON arrays), `geography.biomes`, `states`, `cultures`, `religions`, `settlements.{burgs,routes}`, `annotations.{notes,rulers}` — entity collections keyed by id as object maps rather than positional arrays. The doc explicitly says the current model is "inconsistent and not well-documented" and is not a reliable reference (line 1). architecture.md:56-57 [STATED]: all map state should become one `map` object serialised to one JSON.

### Gaps
- `pack.cells.conf` width: docs Uint16 vs load Uint8 — unresolved which is intended.
- `PackedGraph.ts` comments are unreliable; no authoritative typed widths exist for `t`, `f`, `s`, `haven`, `harbor` beyond load code and docs.

---

## 3. Identity and migration

### Takeaway
Identity is positional for the political/cultural entities (index = id with tombstones), self-carried `i` for geometry-ish entities, and absent for relief/measurers. Nothing survives a regraph except via `cells.g` and the "risk" remap; locked burgs are renumbered on regeneration. A map's identity is its creation timestamp. Migration is a forward-only, in-process chain gated by `isOlderThan(version)` from 0.70.0 to the current version.

### Cited findings
- Index-keyed arrays never shrink; removal adds `removed` — [STATED] data-model.md:124, 146, 180, 231, 254.
- Burg regeneration keeps locked burgs but **assigns them new ids** (new index in the rebuilt array), re-pointing their cell and their state's capital/center — [OBSERVED] `SRC/src/generators/burgs-generator.ts:842-852`; market centres on unlocked burgs are also remapped (857-862).
- Routes may share an id with a broken route that is dropped; route id 0 is valid — [OBSERVED] load.ts:602-607; data-model.md:394.
- Duplicate marker ids are repaired at load by assigning the next free id and sorting markers by id — [OBSERVED] load.ts:630-650.
- Load-time integrity repairs: cells pointing at removed/missing states, provinces, cultures (note: the culture branch zeroes `cells.province`, apparently a bug), religions, burgs, rivers are reset to 0; burgs without cell/x/y are removed; out-of-range burg cells are re-found from x,y; capital duplication fixed; provinces of removed states removed; dangling cell-route links dropped — [OBSERVED] load.ts:414-628.
- Map id = creation timestamp stored as the 7th pipe field of the header and carried through `mapHistory`; a `map:generated` DOM event exposes seed and mapId for automation/external integrations — [OBSERVED] save.ts:64; load.ts:683-684; `SRC/src/components/lifecycle.ts:160-178`.
- Graph overrides (Wrap Tool vertex moves) are restored only if the rebuilt vertex still has the recorded original coordinate; otherwise discarded — [OBSERVED] graph-override.ts:42-57; [STATED] data-model.md:18.
- Pack cell indices are invalidated by any regraph; the heightmap editor's "risk" path snapshots per-cell arrays against grid indices, rebuilds, then re-locates burg/culture/province centres; the "resample" path restores per cell by parent-quadtree lookup — [STATED] `SRC/docs/architecture/generation-pipeline.md:68, 180-202`.
- Version parsing accepts legacy compact forms like `1.732` (→ 1.73.2) and `0.7b` — [OBSERVED] versioning.ts:40-56.
- Migration chain: `resolveVersionConflicts` runs ~55 gates from `<1.0.0` to `<1.154.1`, after the data is parsed and the SVG inserted; `migrateLegacySettings` runs before, converting the pre-1.152 pipe-delimited settings string (plus old header fields and the old separate coordinates slot) into the settings object with hard-coded defaults, inferring the requested cell count from the stored spacing against the frozen density table — [OBSERVED] auto-update.ts:94-100, 2214-2391; list of gates at auto-update.ts:100-2198. Notable format changes [OBSERVED from gate comments]: 1.21 rivers to pack (364); 1.5 emblems and relief data (456-465); 1.6 rivers/lakes data (478-493); 1.7 markers (640); 1.99 routes algorithm and format (942); 1.100 zones to pack (1007); 1.109 burg groups (1069); 1.111 ice from SVG to data (1133); 1.124 goods/markets/deals (1208); 1.138 measurers from rulers string (1249); 1.139 biomes from pipe string to `pack.biomes` (101); 1.140 labels/styles flat model (1288); 1.142 relief from SVG to `pack.relief` (1529); 1.144 layer ids and layers state into slot 50 (1565-1578); 1.146 feature subtype/group split and vertex edits preserved (1681-1695); 1.150 styles store becomes source of truth (1836); 1.152 settings object and notes onto entities (2226, 1850); 1.154 relief/icon id formats and string attr formats (1998-2109).
- Migrations must carry their own copy of the old world and never lean on the live schema; validation repairs rather than rejects; unknown keys are stripped — [STATED] configuration.md:214-246.
- Semver policy: the `.map` format is the public API — [STATED] versioning.ts:1-15.

### Inferences
- Because pack geometry is recomputed at load from grid points with the same algorithm, the stored per-cell pack arrays are only valid if `Pack.generate` is bit-for-bit stable across versions; the integrity check (cells count vs state array length, feature vertices existing) is the guard, and the suggested fix is to re-run the erase pipeline — [INFERRED from load.ts:302-312, 418-423].
- Stable cross-session addressing in FMG therefore reduces to: (map creation timestamp, entity kind, entity id as of that save) plus, for cell-level facts, the grid cell id (which is stable for a given seed/size/version) rather than the pack cell id — [INFERRED].

### Gaps
- Whether `Pack.generate`'s Delaunator triangulation is numerically identical across Delaunator versions is not documented; the repo pins delaunator ^5.0.1 (package.json:62) [OBSERVED] but the public builds' exact versions vary.

---

## 4. Formats, exports and imports

### 4.1 The `.map` container

#### Takeaway
A `.map` is plain text: 53 CRLF-separated positional fields; a `.gz` is the same text gzip-compressed (read only); a base64 variant is also accepted on read. Everything the app needs to reopen a world identically is in the file, including the rendered SVG, the style record, layer state and `options.map`.

#### Cited findings
- Field layout [OBSERVED] `SRC/src/services/io/save.ts:139-193` (index → content): 0 header `version|license-note|YYYY-M-D|seed|width|height|mapId`; 1 `options.map` JSON; 2 empty (deprecated separate coordinates); 3 biomes JSON; 4 empty (deprecated notes array); 5 serialized SVG of `#map`; 6 grid general JSON {spacing, cellsX, cellsY, boundary, points, features}; 7 grid.h; 8 grid.prec; 9 grid.f; 10 grid.t; 11 grid.temp; 12 pack features; 13 cultures; 14 states; 15 burgs; 16 cells.biome; 17 cells.burg; 18 cells.conf; 19 cells.culture; 20 cells.fl; 21 cells.pop (4 dp); 22 cells.r; 23 empty (deprecated road); 24 cells.s; 25 cells.state; 26 cells.religion; 27 cells.province; 28 empty (deprecated crossroad); 29 religions; 30 provinces; 31 name bases (slash-separated records `name|min|max|d|m|names`, names omitted when equal to the default base at that index); 32 rivers; 33 empty (deprecated rulers); 34 fonts used; 35 markers; 36 cells.routes; 37 routes; 38 zones; 39 ice; 40 cells.good; 41 goods; 42 markets; 43 deals; 44 cells.market; 45 empty (deprecated custom good icons); 46 measurers; 47 added labels; 48 styles record; 49 relief; 50 layers state; 51 graph overrides; 52 journeys. Typed arrays are joined by comma when stringified (read back with `split(",")` at load.ts:306-368 [OBSERVED]).
- Before serialising the SVG, the save clones the DOM, resets width/height and viewbox transform, empties relief, emblem, ruler and trade-animation groups and removes transient journey overlays — [OBSERVED] save.ts:79-102.
- Read path: decode as UTF-8; if the first 10 chars contain `|` treat as delimited, else base64-decode; normalise CRLF inside the SVG; split on CRLF; version from header; on any failure try gzip decompression (`DecompressionStream`) and retry — [OBSERVED] load.ts:172-218. Valid iff ≥10 fields, valid version, SVG present — load.ts:153.
- Save destinations: File System Access API picker (remembers the handle until a new map is generated) with download fallback; IndexedDB `lastMap` (autosave every N minutes when enabled, polled every 30 s); Dropbox — [OBSERVED] `SRC/src/services/io/save-to-file.ts:14-67`; save.ts:198-234; `SRC/src/services/autosave.ts:98-122`; cloud.ts:54-79. The file picker accepts `.map` under `application/octet-stream` (save-to-file.ts:41); the open dialog accepts `.map,.gz` (`SRC/src/components/options/io-panes.ts:206`).
- There is no gzip **writer** in the app (CompressionStream not used; only DecompressionStream in load) — [OBSERVED] grep result over `SRC/src`.
- Styles: field 48 is the full `styles` zod-schema record (attrs/options/groups tree per layer); preset name lives in `options.map.style.preset`; legacy selector-keyed presets and SVG-harvested styles are converted by `styles-legacy.ts` only inside migrations — [STATED] `SRC/docs/architecture/style.md:182-238`; [OBSERVED] load.ts:384-386.
- Layers (visibility + order) are application state saved in field 50 and restored tolerantly (unknown ids ignored, missing layers slotted by registration order) — [STATED] architecture.md:530-547; [OBSERVED] load.ts:390.
- Fonts used (family, unicodeRange, variant, src) are listed in field 34 and re-declared at load — [OBSERVED] save.ts:70-75; load.ts:275-286.
- What is lossy or derived on save/load [OBSERVED]: population rounded to 4 dp (save.ts:136); default-identical name bases dropped (127-133); pack geometry (`cells.p/c/v`, vertices) is **not saved**, it is rebuilt (load.ts:302-312); biome statistics stripped (313-330); relief/emblem SVG content emptied and redrawn (save.ts:89-93); `options.generation`/`options.app` excluded (save.ts:67); SVG retains the saving browser's performance attributes which are reapplied (load.ts:672).
- Version gating on load — [OBSERVED] load.ts:153-166; dialog texts 224-241. Ancient = older than 0.70.0; the wiki points such users at the archived old generator — [STATED] `WIKI/Changelog.md:5-7`.

### 4.2 Exports and imports — one table

| Direction | Format / channel | What it contains; coordinates/units | Citation |
|---|---|---|---|
| Export | **SVG** (full map) | clone of the live SVG at canvas size, transform reset, zoomed layers at scale-1 font sizes, scale bar drawn, unused defs/filters/patterns/symbols removed, emblems and icon symbols inlined, ocean pattern/texture/custom images embedded as base64, used web fonts embedded as data-URI `@font-face`, symbols flattened to groups and label case/multiline/blur rewritten for Inkscape, href normalised. Map px coordinates. | `SRC/src/services/io/export.ts:65-82, 359-579, 604-692`; `svg-export.ts:7-108` |
| Export | **PNG** | viewport raster at `options.app.export.pngResolution` × viewport size | export.ts:84-124 |
| Export | **JPEG** | same, quality = min(1 − res/20, 0.92) | export.ts:152-192 |
| Export | **PNG tiles (zip)** | `schema.png` overview plus `A1…` tiles (rows lettered, columns numbered) at `options.app.export.tiles` cols/rows/scale, via JSZip | export.ts:194-294 |
| Export | **Region image** (API) | data URL of a map-space box at a given pixel size, used by 3D view/Assistant | export.ts:126-150 |
| Export | **GeoJSON Cells** | Polygon per pack cell from its vertices; properties id, height (unit-converted integer), biome id, feature type, population (people), state, province, culture, religion ids, neighbours. lon/lat 4 dp, equirectangular from `options.map.geography.coordinates`. Known gaps/overlaps per wiki. | export.ts:40-41, 768-806; `WIKI/GIS-data-export.md:30-46` |
| Export | **GeoJSON Routes** | LineString per route from its control points; id, group, name | export.ts:808-823 |
| Export | **GeoJSON Rivers** | LineString of meandered points; id, source, mouth, parent, basin, widthFactor, sourceWidth, discharge, name, type | export.ts:825-842 |
| Export | **GeoJSON Markers** | Point; id, type, icon, x, y (px), name, note, size, fill, stroke | export.ts:844-860 |
| Export | **GeoJSON Zones** | Polygon or MultiPolygon traced from zone cell boundaries (inner lake holes skipped); id, name, type, colour, cell list; hidden/empty zones excluded | export.ts:862-978 |
| Export | **JSON Full** | info (version, exportedAt, mapName, width, height, seed, mapId), settings (unit fields + whole `options` object + preset), mapCoordinates, pack (per-cell objects with v,c,p,g,h,area,f,t,haven,harbor,fl,r,conf,biome,s,pop,culture,burg,routes,state,religion,province; vertices; all entity arrays), grid (per-cell v,c,b,f,t,h,temp,prec; vertices; spacing, cellsX/Y, points, boundary, seed, features), nameBases | `SRC/src/services/io/export-json.ts:36-50, 94-240` |
| Export | **JSON Minimal** | info, settings, mapCoordinates, entity arrays only, nameBases | export-json.ts:52-80 |
| Export | **JSON PackCells / GridCells** | info + the respective cells block | export-json.ts:82-92 |
| Export | **CSV** | Burgs (id, name, province, state, fullName, culture, religion, group, population people, x, y, lat, lon, elevation, temperature, likeness, capital/port/citadel/walls/plaza/temple/shanty flags, emblem, preview link); Markers (Id, Type, Icon, Name, Note, State, Culture, X, Y, Latitude, Longitude); also States, Provinces, Cultures, Religions, Biomes, Zones, Routes, Notes, market deals, elevation profile | `SRC/src/controllers/burgs-overview.ts:679-712`; `markers-overview.ts:393-417`; grep hits in states/provinces/cultures/religions/biomes/zones/routes/notes/market-deals/elevation-profile editors |
| Export | **3D OBJ** | Three.js OBJExporter mesh of the 3D view | `SRC/src/renderers/view-3d-renderer.ts:336-339, 1190-1197` |
| Export | **Heightmap preview PNG** | greyscale cellsX×cellsY image: land h → h/100·255, water h → (h/1.5)/100·255, upscaled to canvas size on download | `SRC/src/controllers/heightmap-editor.ts:2172-2200` |
| Export | **Emblem SVG/PNG** | self-contained emblem with referenced defs inlined | `SRC/src/services/io/emblem-image.ts:17-75` |
| Export | **Custom icons zip** | `icons.json` manifest + one picture file per icon | `SRC/src/services/io/icons-archive.ts:1-29` |
| Export | **Style preset JSON** | the styles record | style.md:214-217 |
| Export | **Map URL** | seed + width + height (+ `options=default` when nothing pinned) | `SRC/src/services/url-params.ts:173-182` |
| Import | **.map / .gz** (file, URL `maplink`, Dropbox, IndexedDB) | see §4.1 | load.ts:27-170; io-panes.ts:206 |
| Import | **Image → heightmap (Image Converter)** | any `image/*`; drawn to canvas size, downsampled to cellsX×cellsY, quantised to N colours (default 100) with RgbQuant; user assigns a height to each palette colour (or auto by luminosity/hue/scheme); unassigned colours become ocean. Grid heights are zeroed on open. | heightmap-editor.ts:1819-1960; `WIKI/Heightmap-customization.md:154-186`; `WIKI/Dependencies.md:31` |
| Import | **Precreated heightmap PNGs** (gallery) | red-channel lightness → height 0–100 through a curve (linear below 0.2, then (l−0.2)^0.8 offset); author guidance: tangrams heightmapper, −500..2000 m, auto-exposure off | `SRC/src/generators/heightmap-generator.ts:583-621`; `SRC/public/heightmaps/import-rules.txt` |
| Import | **Heightmap template .txt** | CRLF-separated step lines | heightmap-editor.ts:1796-1809 |
| Import | **Names base .txt** | one base per line | `SRC/src/controllers/namesbase-editor.ts:347-360` |
| Import | **Notes CSV** | rows `type,id,note` resolved to entity refs | `SRC/src/controllers/notes-editor.ts:372-387` |
| Import | **Burg names .txt/.csv** | one name per line, bulk rename | burgs-overview.ts:742-759 |
| Import | **Cultures .csv** | d3 csvParse with a Name column etc. | `SRC/src/controllers/cultures-editor.ts:939-953` |
| Import | **Style preset JSON** | legacy selector-keyed or store-shaped | `SRC/src/controllers/style-preset.ts:201`; style.md:204-211 |
| Import | **Custom icons zip** | manifest-driven, conflicts reported | icons-archive.ts:35-68 |
| Import | **Icons/pictures** (icon picker) | SVG ≤200 KB / raster ≤2 MB, side 256 for icons; SVG ≤1 MB / raster ≤10 MB, side 1024 for emblems; SVG, PNG, JPEG, WebP; or a pasted image link | `SRC/src/controllers/icon-picker/pictures.ts:10-42`; `WIKI/Emblems.md:17` |
| Import | **Fonts** | Google font by family (fetched from gstatic), local installed font by name, web font by URL; bundled list is 40+ Google fonts | `SRC/src/services/fonts.ts:299-411` |
| Import | **Armoria COA** | edit link / API link / COA JSON string pasted; live session updates | `SRC/src/controllers/emblems/armoria.ts:10-55`; `WIKI/Emblems.md:9-13` |
| Import | **Overlay image** | texture layer from a CORS-enabled URL for tracing | `WIKI/Heightmap-image-overlay.md:1-39` |
| Import | **GeoJSON / shapefile / DEM** | **none** | [OBSERVED absence] no reader in `SRC/src/services/io/` or controllers (createFileInput list) |

### Gaps
- No documented spec of the tile naming beyond the code; no PDF/print path.

---

## 5. URL parameters and host-embedding controls

### Takeaway
A host can make FMG open a specific hosted `.map` (CORS required), or generate a reproducible world from `seed` + `width` + `height` + `options=default`, choose the layer preset/visible layers, and focus the viewport on coordinates, a cell or a burg. Watabou's MFCG uses a back-link protocol to re-select the burg it was opened from.

### Cited findings ([OBSERVED] `SRC/src/services/url-params.ts`; [STATED] `WIKI/URL-parameters.md`)
- `maplink` — fetch a `.map` from a URL (must match a URL regex, CORS, 120 s timeout); on failure a random map is generated — url-params.ts:16, 27-35; load.ts:98-120; wiki:4.
- `seed` — generate from this seed on first load — url-params.ts:38-42; wiki:5 (reproducible only with `options=default` and `width`/`height`, and only on the same generator version).
- `options=default` — ignore the user's pinned options (not a reset of stored requests) — wiki:6; configuration.md:149-151.
- `width`, `height` — canvas size in px, applied before generation — `SRC/src/services/map-size.ts:82-89`; url-params.ts:25.
- `scale`, `x`, `y` — zoom level (0.5 = 50 %) and focus point; default zoom 8 if only x/y — url-params.ts:87-111; wiki:8-9.
- `burg` — id or name to focus — url-params.ts:100-104; wiki:10.
- `cell` — pack cell id to focus — url-params.ts:94-98; wiki:11.
- `preset` — layers preset key or displayed name; `layers` — comma list of layer ids (wins over preset) — wiki:12-13; url-params.ts:75 (applyURLLayers).
- `from=MFCG` with `size`, `coast`, `port`, `river`, `name` (+ referrer): if the seed is 13 chars its last 4 digits are the burg id; else pick the burg best matching coast/port/river and closest population, then adopt the referrer's name/size/seed/shantytown etc. onto that burg — url-params.ts:77-85, 115-170; wiki:15-23.
- Copy-link writes `?seed=…&width=…&height=…[&options=default]` — url-params.ts:173-182.
- Load order on start-up: maplink → seed → last saved map (if `options.app.onLoad` is lastSaved) → random — url-params.ts:21-59.

### Gaps
- No URL parameter sets template, cultures set, cell density or any other generation option; those come only from this browser's stored `options.generation` — [INFERRED from url-params.ts and configuration.md:94-99].

---

## 6. Integrations and runtime dependencies

### Takeaway
FMG is a static browser app; every integration is a direct browser call to a third-party endpoint, keyed in localStorage, except the Azgaar Assistant server which works only on the official origin. The desktop app is Electron serving the same build over a privileged `app://` scheme; Nix wraps nixpkgs Electron.

### Cited findings
- **Armoria**: GUI `https://azgaar.github.io/Armoria/`, API `https://armoria.herokuapp.com/` (render URL with size 1024, format svg, COA JSON); FMG accepts edit links, API links or COA strings and keeps unknown COA fields; live edits in Armoria propagate back via a session; art FMG lacks is stored as one Custom icon — [OBSERVED] `SRC/src/controllers/emblems/armoria.ts:4-55`; [STATED] `WIKI/Emblems.md:9-13`. Heraldry renderer is ported from Armoria; `public/charges/` is a verbatim copy — [STATED] architecture.md:296-299.
- **Watabou generators** (burg previews/links): city-generator with name, population (people), size (2.13·(pop·scale/density)^0.385 clamped 6–100), seed (burg.MFCG or map seed + 4-digit burg id), river, coast, farms, citadel, urban_castle, hub, plaza, greens, temple, walls, shantytown, style natural, sea direction; village-generator with pop, name, seed, width/height by population, style, tags (estuary/coast/river/confluence/highway/…); dwellings with pop, seed, tags; `&preview=1` for the preview — [OBSERVED] `SRC/src/generators/burgs-generator.ts:607-768`. Choice per burg group `preview` — `SRC/src/types/burg-groups.ts:15`; `SRC/src/controllers/burg-group-editor.ts:128-130`.
- **AI text generator** (Notes editor): OpenAI chat completions, Anthropic messages, or Ollama at `http://localhost:11434/api/generate` where the "key" field is the model name; keys stored in localStorage — [OBSERVED] `SRC/src/controllers/ai-generator.ts:57-124, 267`; [STATED] `WIKI/Ollama-text-generation.md:79-88, 110-112`.
- **Azgaar Assistant**: Guest/Member tier via `https://ask.azgaarsfmg.com` only from `https://azgaar.github.io`, Discord OAuth sign-in, 90-day retention; Key tier talks directly to Anthropic (native), OpenAI, Gemini (OpenAI-compatible), DeepSeek, Mistral, Qwen or a local server defaulting to `http://localhost:11434/v1`; `read_map` runs model-written JS in page scope (disclosed risk) — [OBSERVED] `SRC/src/services/assistant/azgaar-server/api.ts:3-4`; `provider/providers.ts:81-192`; `provider/connection.ts:10-32`; [STATED] `WIKI/Policy.md:22-56`; architecture.md:488-503.
- **Dropbox**: SDK loaded on demand, app client id in source, tokens in localStorage, shareable `maplink` via `dl.dropboxusercontent.com` — [OBSERVED] cloud.ts:46-79; load.ts:44-61.
- **Fonts**: Google Fonts from `fonts.gstatic.com`; offline needs them embedded — [OBSERVED] fonts.ts:31-265; [STATED] `WIKI/Working-offline.md:5`.
- **PWA/offline**: service worker registered only in production and not in Electron; Workbox 6.2.0 loaded from the Google storage CDN; precache manifest built by `scripts/pwa-precache.mjs`; a `CACHE_OFFLINE` message downloads the full app when installed/standalone; manifest scope `/Fantasy-Map-Generator/` — [OBSERVED] `SRC/src/services/platform.ts:42-66`; `SRC/public/sw.js:1-60`; `SRC/public/manifest.webmanifest`; package.json:19; [STATED] Working-offline.md:6-7.
- **Electron**: serves `dist` over `app://fmg/` (modules can't load from file://; a real origin is needed for localStorage/IndexedDB); CSP allows `unsafe-eval` because goods distribution formulas compile with `new Function`; userData folder `fantasy-map-generator`; contextIsolation + sandbox, preload exposes only `isElectron`, platform, versions; self-update via electron-updater against GitHub releases, self-install only on Windows and AppImage, checks 30 s after start then every 6 h; window-state file; installers for win x64/arm64, mac arm64/x64, linux AppImage/deb — [OBSERVED] `SRC/electron/main.ts:10-128, 268-296`; `SRC/electron/updater.ts:7-98`; `SRC/electron/preload.ts`; `SRC/src/services/app-offer.ts:174-192`.
- **Nix**: flake exposes a Linux-only package wrapping nixpkgs `electron_43`, no self-update, maps in `~/.config/fantasy-map-generator`; `nix develop` gives Node — [OBSERVED] `SRC/flake.nix:1-39`; [STATED] `WIKI/Install-with-Nix.md:88-113`.
- **Deploy**: Netlify (Node 24, SPA redirect) and a Docker image (node:24-alpine build → nginx) — [OBSERVED] `SRC/netlify.toml`, `SRC/Dockerfile`.
- **Analytics**: Google Analytics on the official site only — [STATED] Policy.md:70-72.
- **Runtime npm dependencies** (package.json:58-68 [OBSERVED]; roles from `WIKI/Dependencies.md:5-15` [STATED]): alea (seeded PRNG), d3 ^7.9 (geometry, scales, quadtree, Voronoi helpers), delaunator ^5 (Delaunay → Voronoi), driver.js (UI tour), lineclip (line clipping), polylabel (pole of inaccessibility), quill (notes editor), three ^0.184 (3D view), zod ^4 (options/style schemas). Dev: vite 8, typescript 5.9, vitest 4, playwright, biome, electron 43, electron-builder, electron-updater; Node ≥ 24.
- **Vendored classic bundles** `SRC/public/libs/` (listing [OBSERVED]; roles [STATED] Dependencies.md:18-38): d3 v5 global, jQuery 3.1.1 + jQuery UI + touch-punch (dialogs), flatqueue (priority queue), delaunator/alea/polylabel browser builds, indexedDB.js wrapper, simplify.js (coastline simplification), rgbquant (image converter); on demand: three + orbitControls/mapControls/loopsubdivision/objexporter (3D), jszip (tiles/icons zip), dropbox-sdk.
- **Third-party importers found on the web** (web search, 2 of 5 budget used): Foundry VTT module "azgaar-foundry" by Ethck consumes the **Full JSON export plus a picture of the map**, builds linked Journal entries, supports markers; listings show Foundry 9–11 compatibility and a known mismatch when the picture is a zoomed viewport rather than the full map — [STATED] https://foundryvtt.com/packages/azgaar-foundry, https://github.com/Ethck/azgaar-foundry, https://ethck.itch.io/azgaar. An npm package `azgaar-fmg-parser` (v1.2.2, MIT) parses cultures, provinces, states, religions and burgs out of `.map` files — [STATED] https://www.jsdelivr.com/package/npm/azgaar-fmg-parser. "mono-azgaar" renders FMG maps in MonoGame with its own parser — [STATED] https://github.com/diogo-strube/mono-azgaar. QGIS workflow: load the Cells GeoJSON as a vector layer, dissolve by `state`/`culture`/…; burg/marker CSVs as delimited-text layers; a community `.qml` biome style exists — [STATED] `WIKI/GIS-data-export.md:30-71`.

### Determinism and reproducibility
- Generators must be deterministic from a seed set once up front; the seed drives `Math.random` via Alea — [STATED] architecture.md:120, 385-387; migration-guide.md:130-139.
- A URL seed reproduces a map only with the same options, canvas size and generator version; to share exactly, send the `.map` — [STATED] `WIKI/URL-parameters.md:5`.
- Generation resolves "requests" into `options.map` at the commit point; a saved file then reproduces its rendering identically on reload (round-trip invariants) — [STATED] configuration.md:193-262.
- Benchmark uses seed `benchmark`, 10k cells, 1280×720 — [STATED] benchmark.md:17.

### Performance / lazy loading
- Targets: responsive at 100k cells; structure-of-arrays typed arrays; derived data disposable; quadtree lookups and FlatQueue growth; one-string DOM injection; hidden layers drop content — [STATED] architecture.md:9-10, 551-600.
- Lazy registries: `Controllers` and `Services` buckets of dynamic-import thunks; every call returns a Promise; `Save` is eager because the file picker needs user activation — [STATED] lazy-loading.md:1-90; [OBSERVED] `SRC/src/services/index.ts:9-17`.
- Benchmark harness: six totals (generate, draw, zoom page/paint, pan page/paint), 3 rounds alternating order, flag at >10 % median change on totals, >25 % and ≥10 ms on parts; sensitivity table: +5 ms script per zoom frame → +18 % pan page work; +30 ms → +62 %/+88 %; a coastline drop-shadow → +12 % pan painting; monitor, not gate — [STATED] benchmark.md:17-67. No absolute timings are documented.
- Load logs total load time to console; generation pipeline records per-step `performance.measure` — [OBSERVED] load.ts:679; [STATED] generation-pipeline.md:38-42.

### Gaps
- No published absolute benchmark numbers (ms) for generation or load.

---

## 7. Implications for SettlementForge

### 7a. Field-by-field mapping to a native world model
Target native model: raster heightfield in metres against one datum; explicit water-surface records (sea, lakes, river reaches); flow/accumulation raster; routes graph; political facts owned by the host. Classification: IMPORT-DIRECT (copy with unit conversion), IMPORT-DERIVE (recompute from FMG inputs), IMPORT-DROP (reason), NOT-APPLICABLE.

| FMG field | Class | Mapping / reasoning | Basis |
|---|---|---|---|
| `grid.points`, `spacing`, `cellsX/Y` | IMPORT-DERIVE | Define the raster lattice: use the jittered grid as scattered samples and resample to a regular raster at ≈ spacing px · distanceScale metres; grid cell id → raster cell is a stable key per (seed,size,version) | GridGraph.ts:16-20; unitUtils; §3 inferences |
| `grid.cells.h` (0–100) | IMPORT-DIRECT (with transform) | metres = (h−18)^exponent for h≥20; depth = ((h−20)/h)·50 for 0<h<20; −990 for h=0; datum = sea level (h=20 ⇒ 2^exp ≈ 4 m above datum at exponent 2 — note the formula never yields 0 at the coast) | unitUtils.ts:59-72 |
| `pack.cells.h` | IMPORT-DROP | duplicate of the parent grid height (pack-generator.ts:28-35,57); coast-split points carry the parent height | pack-generator.ts |
| `grid.cells.t` / `pack.cells.t` | IMPORT-DERIVE | distance-to-shore field; recompute from the native water mask | GridGraph.ts:8 |
| `grid.cells.f`, `pack.features` (type ocean/lake/island, subtype, border, area, shoreline, vertices, height, inlets/outlet/evaporation/flux) | IMPORT-DIRECT → water-surface records | each lake feature becomes a lake record (surface elevation = metres of its `height`; subtype freshwater/salt/dry/sinkhole/frozen/lava; closed flag; outlet cell; evaporation/flux as provenance); ocean features become the sea record (one datum); islands are derived from the heightfield and can be dropped | features-generator.ts:22-50 |
| `grid.cells.temp` (°C Int8), `grid.cells.prec` (×100 mm) | IMPORT-DIRECT | climate rasters if the host keeps them; else NOT-APPLICABLE | GridGraph.ts:10-11; unitUtils.ts:75-77 |
| `pack.cells.fl`, `conf`, `pack.cells.r` | IMPORT-DERIVE | accumulation on the native raster from precipitation + D8/D∞ flow; keep FMG flux only as a cross-check (its units are "precipitation units summed", discharge label m³/s is nominal) | river-generator.ts:85-142, 356 |
| `pack.rivers` (cells path, discharge, width km, sourceWidth, length px, parent, basin, source, mouth, name, type) | IMPORT-DIRECT as river-reach records + IMPORT-DERIVE geometry | reaches keyed by FMG river id; polyline from `cells` centres (or stored `points`) in px → metres; mouth width km; length recomputed (FMG's is px); parent/basin give the tree; rename later via host | river-generator.ts:13-30, 624-633 |
| `pack.cells.p/c/v`, `pack.vertices`, `cells.area` | IMPORT-DROP | regenerated geometry, replaced by raster + PLAT exact geometry; keep only as a transient to rasterise per-cell attributes | load.ts:302-312 |
| `pack.cells.g` | IMPORT-DIRECT (transient) | the join key from every pack-indexed array to the raster cell | pack-generator.ts:56 |
| `pack.cells.biome`, `pack.biomes` | IMPORT-DIRECT (optional) | categorical raster + lookup (name, habitability, cost); relief icon pools IMPORT-DROP (rendering) | biomes-generator.ts:7-17 |
| `pack.cells.pop`, `cells.s` | IMPORT-DIRECT (pop) / IMPORT-DROP (s) | rural population raster in people = pop·scale; score is FMG-internal | unitUtils.ts:98-105 |
| `pack.cells.harbor`, `haven` | IMPORT-DROP | derivable from the water mask | data-model.md:114-115 |
| `pack.burgs` | IMPORT-DIRECT → host settlement facts | id, name, position (px→metres), population people, capital, port (water body feature id → native water record id), culture/state/feature refs, Watabou flags (citadel/plaza/walls/temple/shanty), MFCG seed/link, coa (opaque JSON), notes; `type`, `group`, `label`, production/treasury/market IMPORT-DROP (FMG economy/rendering) | burgs-generator.ts:25-56 |
| `pack.states`, `provinces`, `cultures`, `religions` + per-cell id arrays | IMPORT-DIRECT → political facts owned by host | territories as rasterised id layers via `cells.g`; records keep name/form/full name/colour/centre/capital/diplomacy/campaigns/neighbours; derived stats (area/cells/rural/urban) IMPORT-DROP (recompute); `military` regiments IMPORT-DIRECT if the host models forces, else DROP; taxes/treasury DROP | states-generator.ts:35-77; provinces-generator.ts:16-36 |
| `pack.routes`, `pack.cells.routes` | IMPORT-DIRECT → routes graph | each route: polyline of [x,y,cellId] → metres; group (roads/trails/searoutes) → edge class; `cells.routes` adjacency gives graph edges keyed by route id; `feature` constraint DROP (derivable) | routes-generator.ts:176-188; data-model.md:116 |
| `pack.markers`, `zones`, `addedLabels`, `measurers`, `journeys` | IMPORT-DIRECT (markers, zones as annotations with cell sets rasterised) / IMPORT-DROP (measurers, addedLabels = cartographic; journeys optional) | markers-generator.ts:75-97; zones-generator.ts:11-19 |
| `pack.ice`, `pack.relief` | IMPORT-DROP | rendering artefacts (polygons/icons) | ice-generator.ts; relief-generator.ts:42 |
| `pack.goods/markets/deals`, `cells.good/market` | IMPORT-DROP or NOT-APPLICABLE | FMG's own economy; SettlementForge simulates its own | goods-generator.ts; markets-generator.ts |
| `options.map.seed`, `graph.{width,height,points}` | IMPORT-DIRECT (provenance) | needed to reason about determinism and to key the source | options-schema.ts:157-158 |
| `options.map.geography.coordinates`, `mapSize/latitude/longitude` | IMPORT-DIRECT | georeference: equirectangular box; convert to the host CRS (a planar metric frame is fine for settlement scale; lon/lat only for export) | commonUtils.ts:249-263; coordinates.ts:71-80 |
| `options.map.units` (distance scale+unit, height exponent+unit, population scale/urbanization) | IMPORT-DIRECT (as conversion constants, then discarded) | fixes px→m, h→m, points→people | options-schema.ts:141-151 |
| `options.map.climate`, `cultures.set`, `lore`, `style`, label/burg groups, military units, transports, custom icons, coastline, relief rules | IMPORT-DROP (lore name/calendar optional IMPORT-DIRECT) | generator/rendering configuration | configuration.md:82-85, 123-134 |
| SVG (field 5), styles (48), layers (50), fonts (34), graph overrides (51) | IMPORT-DROP | presentation; overrides are vertex nudges of regenerated geometry (keep as "edited coastline" hint only) | save.ts:102-124 |
| Name bases (31) | NOT-APPLICABLE / optional | name generation training data | save.ts:127-133 |
| Header mapId (creation timestamp), version, date | IMPORT-DIRECT (provenance) | the only cross-save identity FMG offers | save.ts:53-65 |

### 7b. What a format-version-pinned import adapter must handle
- Parse: UTF-8 text split on CRLF, with the base64 and gzip variants; the SVG can contain CRLF that must be normalised before splitting; validate ≥10 fields and the header version — load.ts:172-218.
- Pin to a version window: the adapter either (a) accepts only files already at a known minor (e.g. ≥1.152 where settings are JSON and notes live on entities, ≥1.144 layers slot, ≥1.139 biomes JSON) and tells users to open-and-resave in FMG, or (b) reimplements the relevant subset of the ~55 migrations — recommended (a), because the migrations manipulate the SVG DOM and generators (e.g. 1.0 regenerates religions; auto-update.ts:133-137) and cannot be run headless without the app — [INFERRED from auto-update.ts:94-2198].
- Geometry must be rebuilt: the adapter needs Delaunator + the same Voronoi/boundary clipping and the same `Pack.generate` filtering to reconstruct pack cell order; the pack-indexed arrays are meaningless otherwise. Alternative that avoids reimplementation: map every pack-indexed value to its grid cell through `cells.g` — but `g` is **not saved** either (not in save.ts:139-193), so at least `Pack.generate`'s point selection must be replicated to recover `g`; simplest is to run FMG's own JSON Full export (which includes `g`, `p`, `v`, `c`) as the adapter input instead of `.map` — [OBSERVED] export-json.ts:124-199; [INFERRED].
- Treat arrays as sparse with tombstones: skip `removed` entries, element 0 placeholders (burgs[0] is a number, provinces default `[0]`), rivers/routes/markers by `i` not index; route id 0 valid.
- Apply the same integrity repairs FMG applies at load (dangling state/province/culture/religion/burg/river ids → 0) — load.ts:414-628.
- Unit constants come from `options.map.units`; height uses the exponent at save time.
- Coordinates: lon/lat only via the equirectangular box; FMG offers no projection choice — commonUtils.ts:249-263.
- Watch the documented discrepancies: `conf` width, river `length` in px, `PackedGraph.ts` comments.
- Prefer the JSON "Full" export as the adapter's canonical input (versioned by `info.version`, includes `mapId`, `options`, pack cells with `g`/`p`/`v`/`c`, vertices, all entities, grid cells with heights/temp/prec and points) and keep `.map` support as a fallback that shells out to FMG (headless Chromium/Electron) to open-and-export — [INFERRED].

### 7c. What FMG's identity model teaches
- Positional ids with tombstones keep references valid cheaply but leak forever and force "element 0 is special" rules; the future model moves to id-keyed object maps — adopt id-keyed maps from day one (future-data-model.md:161-200).
- Regeneration renumbers even locked entities (burgs-generator.ts:842-852); references held outside the file (host facts) must therefore key on a stable surrogate (FMG map creation timestamp + entity kind + id at import time) and never on live FMG ids after a regenerate.
- Cell-level identity should be anchored to the deterministic source lattice (grid cell id from seed/size/version), not the derived mesh (pack); FMG's own "risk" and "resample" paths remap through grid ids and quadtree lookups (generation-pipeline.md:192-202).
- User edits that must survive regeneration are stored as deltas against the generated baseline with a validity check (graph overrides keep `[original, edited]` and drop when the baseline changed) — a good pattern for host-owned edits over a regenerable heightfield (graph-override.ts:42-57).
- Config split: "what happened" (`options.map`) is saved; "what to ask next" and browser prefs are not; derived values are stored but must be re-derivable (configuration.md:35-48, 87-92).

---

## 8. Sources read

Read in full [OBSERVED]:
- `SRC/docs/architecture/data-model.md`, `future-data-model.md`, `architecture.md`, `configuration.md`, `lazy-loading.md`, `migration-guide.md`, `benchmark.md`, `style.md`, `generation-pipeline.md`
- `SRC/src/types/GridGraph.ts`, `PackedGraph.ts`, `Journey.ts`, `Military.ts`, `burg-groups.ts`, `emblems.ts`, `icons.ts`, `styles.ts`, `global.ts`
- `SRC/src/services/io/save.ts`, `save-to-file.ts`, `load.ts`, `export.ts`, `export-json.ts`, `svg-export.ts`, `emblem-image.ts`, `icons-archive.ts`
- `SRC/src/services/versioning.ts`, `url-params.ts`, `platform.ts`, `map-size.ts`, `autosave.ts`, `app-offer.ts`, `index.ts`
- `SRC/electron/main.ts`, `updater.ts`, `preload.ts`; `SRC/public/manifest.webmanifest`; `SRC/netlify.toml`; `SRC/Dockerfile`; `SRC/package.json`; `SRC/public/heightmaps/import-rules.txt`; `SRC/src/data/graph-density.ts`
- `WIKI/URL-parameters.md`, `GIS-data-export.md`, `Working-offline.md`, `Run-FMG-locally.md`, `Install-with-Nix.md`, `Dependencies.md`, `Ollama-text-generation.md`, `Emblems.md`, `Heightmap-image-overlay.md`, `Policy.md`, `Scale-and-distance.md`

Read in part (targeted ranges/greps) [OBSERVED]:
- `SRC/src/services/io/auto-update.ts` (lines 1-140, all version-gate lines and comments, 2214-2391); `cloud.ts` (1-80); `SRC/src/services/fonts.ts` (function list, font URLs)
- `SRC/src/generators/`: `features-generator.ts` 1-70, `voronoi.ts` 1-20, `river-generator.ts` 10-40/145-180/559-633, `burgs-generator.ts` 20-60/600-775/834-862, `states-generator.ts` 30-80, `cultures-generator.ts` 20-55, `provinces-generator.ts` 12-40, `religions-generator.ts` 18-60, `routes-generator.ts` 170-195, `zones-generator.ts` 8-22, `markers-generator.ts` 70-100, `ice-generator.ts` 8-30, `measurers-generator.ts` 1-12, `goods-generator.ts` 8-60, `markets-generator.ts` 12-40, `relief-generator.ts` 20-50, `biomes-generator.ts` 5-25, `added-labels.ts` 5-20, `graph-override.ts` 1-130, `notes.ts` 1-20, `military-generator.ts` 11-33, `labels-generator.ts` 27-41, `pack-generator.ts` 1-60, `heightmap-generator.ts` 583-632, `coordinates.ts` (grep), `temperature-generator.ts`, `precipitation-generator.ts`, `population-generator.ts` (greps)
- `SRC/src/components/options-schema.ts` 71-85, 100-180; `lifecycle.ts` 129-188; `SRC/src/utils/unitUtils.ts` 59-105; `commonUtils.ts` 249-283
- `SRC/src/controllers/`: `heightmap-editor.ts` 1819-1960, 2172-2200 (+greps); `burgs-overview.ts` 679-759; `markers-overview.ts` 393-417; `emblems/armoria.ts` 1-55; `icon-picker/pictures.ts` 10-42; `ai-generator.ts`, `notes-editor.ts`, `namesbase-editor.ts`, `cultures-editor.ts`, `burg-group-editor.ts` (greps)
- `SRC/src/services/assistant/provider/providers.ts`, `connection.ts`, `azgaar-server/api.ts` (greps); `SRC/public/sw.js` 1-60; `SRC/flake.nix` 1-39
- `WIKI/Changelog.md` 1-30; `WIKI/Heightmap-customization.md` 154-186 (+grep)

Not read: `SRC/docs/architecture/icons.md`; test files; `SRC/src/services/ui-tour.ts`, `logging.ts`, `style-presets.ts`; the bodies of most auto-update migrations; renderer code; `SRC/public/libs/*` library code (listed only, per instructions). Nothing requested was unreachable.

Web sources (2 WebSearch calls of the 5 allowed): https://foundryvtt.com/packages/azgaar-foundry ; https://github.com/Ethck/azgaar-foundry ; https://ethck.itch.io/azgaar ; https://www.jsdelivr.com/package/npm/azgaar-fmg-parser ; https://github.com/diogo-strube/mono-azgaar
