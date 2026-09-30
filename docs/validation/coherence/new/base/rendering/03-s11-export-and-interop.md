## §11 Export and interop

*In plain words.* One saved file holds everything (the recipe, the edits, the town); every other format — SVG with
layers, PNG at print size, GeoJSON for GIS tools, virtual-tabletop scenes with walls and doors, 3-D models — is a view of
that file. The generator runs without a screen (for tests and batch work) and can be embedded in another web page: the
page keeps the town in a background worker and receives finished pictures, so it never stalls. When several people share
one town — a game master and players — the host program keeps the one true copy and each generator only proposes changes
to it, so everyone sees the same town. Nothing depends on a server of ours.

### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment; a `plan` block per building whose plan rung is not `absent`, its state (§2.8) recorded on the block (§2.6; items 28 and 28 (f); J-A28.84): storeys, each with its rooms (address, ring in integer cm, role, `scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit`, the address of the household whose dwelling unit it belongs to), walls by kind, openings (kind, width, and the entrance of §2.6's set an `entrance` opening serves) and windows; the plan's `units` (each household's address, its unit form and its entry opening), stair cores and chimneys; with the output version and the supersedes table, so an exported plan says who lives where and the room graph follows from the openings; a `massing` block per building and a `composition` block with its state where the `wings` rung is current or stored (V02 §5.5; M6, file f item 449); every record's fields with their tier (*Authorship and tiers*, below) and each event's authorship with the log; each district's character vector, identity, band range and name history (item 72); each `Works` with its stage at the export's drawn week (§4.11; item 67); each `LightSource` (item 68); a clandestine building's concealed use and its concealed parts (item 63), the document formats being admitted whole (*Knowledge*, below); our own schema, never a cell grid | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer (*Layers*, below); one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7), each enceinte's wall LineStrings split per run of equal `condition` (§2.7), each run carrying the enceinte's `id` and `run` (its ordinal from the trace's first vertex in vertex order), `condition` absent when standing (file f item 575) — an enceinte closed by `shore` or `barrier` adding its closing edges as LineStrings of kind `closure` carrying the barrier kind (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`; J-VI.3), every enceinte its enclosure as one Polygon of kind `enclosure`, each gate carrying its kind (`land` or `water`, §2.7) (g item 106; M2b, file f item 447); **item 110's entities (M3a, file f item 447; one text for both variants):** every way carries `part` (0 the ground); a raised way's LineString adds `raisedKind` (`viaduct` · `elevated` · `aqueduct`), `source` (`generated` · `declared`, item 244's derived reading), `reason` (`drop` · `link` · `water`, absent when declared; J-VI.2), `deckMinCm`, `deckMaxCm` and `underuseSince` (a week, absent when in use); each support a Polygon of kind `raisedSupport` (`way`, `key`, `state`); each span a Polygon of kind `span` (`use`, `state` — item 244's, absent when standing); an aqueduct's channel is its way's LineString (class `aqueduct`); a retaining wall one LineString of kind `retaining` per run of equal state along its chain (`wall` its id, `run` the run's ordinal from the chain's first vertex in vertex order, `highSide` of the vertex order, `stepMinCm` and `stepMaxCm` over the run, `material`, `state` — absent when standing); stairs and ramps as `stair` and `ramp` flags on the way segments they occupy; a plot or building on a deck `onDeck` (its deck kind) and `deck` (the host's id), a deck host's feature `plat:deckState` (`decayed` · `ruined`, absent when standing); a stepped building `tiers` (the count); features on a raised part stay in the ground layer's collection with their `part`; boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths; public attributes include the lifecycle states (`existence`, `condition`, a wall's `supersededBy`, a tunnel's `closure`, an island's `state`; items 8, 11, 31), a plot's `exposure` and `knownTo`, a building's `knownTo`, and an institution's `knownTo` on the features of its buildings (item 30), a building's `entrances` as points with their roles (item 29), an underground building's `baseCm` as its depth below the datum and `eaveCm` as its ceiling and a tunnel's invert profile (II.7), a market reservation's `rank` (§4.2); also each building's `worksStage` at the export's drawn week (item 67), an access point's `state` (item 64), each gallery, chamber and link of the underground systems with its `system`, `kind` and `depthBand` (II.7.6; item 65), a district's `identity` and band range (item 72), each lit `LightSource` whose host draws for the export's key (§8.1 item 7) as a Point with `kind`, `heightM`, `intensityCd`, `radiusM` and `colour` (item 68), and every property's tier as `plat:tier` — `dossier`, `declared` or `map` (item 20 (h)); the `name` and the purpose of a place (its `use`, or an institution's kind) the export's knowledge key does not admit (*Knowledge*, below) are withheld, the feature staying in the file, and a concealed use's features — its rooms, its concealed entrance, its way down (item 63) — and a secret access or link are left out for such a key, their lights with them; a fallen island's archived arena is not exported (II.6); an oasis's water body carries `oasis: true` and its spring a Point of kind `spring` (g item 111); a land-use feature's `deposit` and `depositState`, one `condition` feature per overlay (no geometry of its own; its `targets`) and one `supplyChain` LineString per active chain whose every joined node the key admits (V08 §5.2; SettlementForge stage, file f item 410); the history properties of V06 §5.3 — for raised ways the properties above plus `plat:why`, no second `reason` meaning (M6-E, file f item 409); the sky content of V05 §5.5 (M6-sky, file f item 415); the optional `wings` layer of V02 §5.5 (M6); with the option `exportWhy` (default false; M3a, file f item 456) each use's `cls`, `family`, `specialisation`, `significance` and its top three siting row ids (V11 §2.4; a raised way's `rw/<kind>` id travels there, never as its `reason`) | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the light (item 68) as the vector rung's shadows in `<g id="layer.shadow">` and glow sprites, or, with the export option `lighting: 'raster'`, one embedded raster lighting layer from the CPU reference (§8.4 (f)) in `<g id="layer.light">`, multiplied over the base groups; the colour-matrix post operations (§8.2) as one filter on a wrapper group `<g id="lit">` that holds every base layer group, `layer.shadow`, the glow sprites and `layer.light`, under the label groups, so they act after the light as §8.4 (f) orders and never on a label; raised parts in their own group `layer.ground.raised` above ground part 0 (item 110; M3a); with stage 3 registered, at the district band and finer the roofscape's facets in the semantics `sem.building.roof`, `sem.building.roof.dormer`, `sem.building.roof.porch`, `sem.building.roof.tower` and `sem.building.roof.cupola` and its lines in `sem.building.roofline` (V02 §5.5), the map naming each facet's subpath range by its wing address `wing:<building>/<key>` (M6, file f item 449); the sky content of V05 §5.5 (M6-sky) | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below) and lit by §8.4's CPU reference at the request's light setting — the fixed or path sun by day, the moon and the lights at night, since an export has no pointer (item 68); transparent background; per-layer transparent PNGs (the largest MFCG ask; raised parts their own PNG, item 110); print presets A4…A2 at 300 dpi; the animated history (APNG over history frames; V06 §5.3, M6-E) | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer — the ground; the sky per island (its content V05 §5.5's; M6-sky); the underground one scene per depth band (`depthBandCm`, II.7.3) at that band's depth, every system of the layer in it (II.7.6; item 65) — with its elevation, plus one scene for each storey of a building whose plan rung exists (the profile below; item 28) and one deck scene per raised way crossing the scope (the profile below); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing, each wing that spans a passage also extruded over its span ring from the passage's `headroomCm` above that wing's base to its eave (a stepped front's quads each), the passage left open beneath (§8.5 (2); `Passage`, §2.5; `BaseWing.spans`, §2.6), a basement (§2.6; item 29) extruded down from `baseCm` by its storeys inside its inset ring, an underground cell or vault (II.7.3) at its own depth — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6, or from the building's roofscape (V02 §5.2) with stage 3 registered, the export option `compositions: 'asDrawn' | 'derive' | 'none'` choosing (M6, file f item 449) — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases, a curtain wall's top carrying its walk (`Enceinte.walkCm` wide); bridge and pier decks at `deckCm`; a raised way a deck mesh swept at its deck height with its parapets, its supports extruded from the ground to the soffit, each `vault` span closed by its end walls; a retaining wall extruded between the ground heights on its two sides; glTF nodes carrying `extras.part` (item 110; M3a, file f item 447); the `interiors` option (default off) adding each plan's walls, floors, stairs and columns per V03 §5.3 (M6-P, file f item 450); the sky content of V05 §5.5 (M6-sky); trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32); a building under a Works at the export's drawn week (§4.11's *Which week is drawn*) extruded at its stage heights (`heightsAt`, §4.11; item 67); lights (item 68) as `KHR_lights_punctual` — a point light per lit `LightSource` (its position, colour, intensity in candela and `range` its radius) and one directional light for the fixed sun, the lights of an underground layer in that layer's node, each light only where its host draws for the export's key (§8.1 item 7). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces — the roofscape's facets, with dormers and porches when compositions are exported (V02 §5.5; M6); over a passage the solid takes each spanning wing's span-ring prism, from the passage's `headroomCm` above that wing's base to its eave, the passage open beneath), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses; a retaining wall with `function: 'retainingWall'`), `Tunnel` (II.7's tunnels, swept from the invert profile and the bore), `Bridge` (and a viaduct, a raised road and an aqueduct each a `Bridge` with `function` `viaduct` · `raisedRoad` · `aqueduct`, an arch vault a `BridgeRoom`; item 110, M3a), `TINRelief` (terrain); a basement as a `BuildingPart` below `baseCm` — and, for a building whose plan rung is not `absent`, `BuildingStorey`, `BuildingUnit` and `BuildingRoom` children as V03 §5.3 states (M6-P, file f item 450) — and an underground cell as a `Building` whose base lies below the datum (items 12, 29); the sky content of V05 §5.5, PLAT's extension gaining `+FloatingIsland` and `+SkyAccess` (M6-sky, file f item 415); with `exportWhy`, the uses' siting fields as GeoJSON's; a building under a Works at its stage heights (`heightsAt`) at the export's drawn week (§4.11; item 67); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots; `chronicle.csv` and `uses-history.csv` (V06 §5.3; M6-E) | the corpus-calibration input |
| **permalinks** | §6.4's format and refusal rule; `&doc=` references resolve through §11.5's `DocResolver` | a document format (*Knowledge*) |
| **skeleton** (item 101) | the document's **declared subset**: a `.plat` document with no model, whose log is the recipe's intent and, in log order, every event whose entities §2.8's `factTier` reads `declared` — the author's declarations, the sugar events among them (§7.1) — and every author's `delete` of generated content, by its address, and a suppressing delete (item 110 (b)) with the key the fold recorded, written by the skeleton writer as `delete { id, suppress }` (the one place an event carries a suppression key; never written by a client), whose import suppresses the key whether or not the address arises — a removal whose address or key does not arise in the new document reported as applied with nothing to remove, never as a failure (file f item 455); each marked `creation`, each keeping its `proposedBy` on its line (file f item 365), so importing makes them the creation prefix of a new document, whose stages read its drawn declarations ahead (§4.1, §7.7); the declared subset adds the `history` block (a `Trajectory`; V06 §5.3, M6-E) | with the same seed, a skeleton exported and imported again reproduces the city byte for byte, removals included (§6.5 (9)'s skeleton round trip); a clerk's transcript of tool calls is itself a valid skeleton, re-importing with every clerk event still marked (T-V10-12); a document format (*Knowledge*) |

**Rotation.** Picture exports (SVG, PNG, VTT) use the view's rotation (§9.5); GeoJSON keeps model coordinates and records
the rotation.

**Layers.** `LayerSpec.exportSeparately` (§8.4) is read by the layered exports: where it is
true, SVG writes the layer as its own top-level group `layer.<id>`, the per-layer PNG zip its own PNG, GeoJSON its own
FeatureCollection and glTF its own node; where false, the layer's features join the ground layer's group, PNG, collection
or node, each keeping its `layer` attribute. VTT writes one scene set per model layer whatever it says (a scene is one
elevation).

**Knowledge (item 30; J-A30.83, J-A30.85).** Every picture and interchange export takes the requesting viewer's
knowledge key with the view state (§11.3), or a lower admission the request names (`ExportOpts.knowledge`: §11.2's
`Admission` — a tier, or a key form `{ tier, places }` — admitting exactly what both it and the caller's key admit, so
never above the caller's; the bridge's `export.request` carries the same field; an application passes the view's
effective key there by default, V09 §5.10; file f item 453), and reads it through §9.2's admission function at its band —
an SVG its declared band, a raster the band of its export stop, a storey's scene the building band, a file without a
band (GeoJSON, CityJSON, glTF extras, CSV, a scene's journal entries) as at the city band — so a shared SVG, PNG, VTT
scene or GeoJSON carries no name and no purpose of a local or secret place the key does not admit — the place itself,
its faces and its doors, stays in the file (§9.2) — and none of a concealed use's concealed parts (its rooms, its
concealed door, its way down; item 63) or of a secret access or link (items 64, 65), which §9.2's refinement withholds as
marks too (J-A63.81), nor the lights, glows and shafts those hosts carry (§8.1 item 7). An unexcavated cavern or ruin
element (V04's excavation reading), its label, its links and its lights are admitted only at tier `secret`: a picture
draws them only when the request's view has `showUnexcavated` on, GeoJSON and glTF carry them only at `secret`, and a VTT
scene never (M6-U, file f item 278). **The document formats** — `.plat`, the compact twin, the JSON schema, a permalink
(its recipe and log, or the document a `&doc=` link names, rebuild every name, §6.4) and the skeleton — are the model and
carry every name, so they are admitted whole or not at all: `export` offers them
only to a key of tier `secret` (the `owner` and `editor` roles by default, §11.3; a script's by-value `exportDocument`
runs as the owner) and refuses any other key with the API error `E_KNOWLEDGE_TIER`, naming the tier the format needs (RIC-04).
The key governs what the module shows and writes; it does not hide what a client that loads the document holds, so a
host that keeps a place secret from a client sends that client pictures and interchange exports, never the document.

**Authorship and tiers in every export (items 20 (h), 101 R19; J-A101.82).** Every model and interchange format carries,
per record or feature, the tier of each fact by §2.8's `factTier` (GeoJSON as `plat:tier`) — and every format that carries the log (`.plat`,
the compact twin, the JSON schema, a skeleton) carries each event's author, its `proposedBy: 'clerk'` where a clerk
proposed it (§7.1) and its `dossierChange` where the dossier caused it (§7.7 item 13); a picture's metadata (SVG
`<metadata>`, the PNG's text chunk, the VTT scene's `plat` object) states the share of its entities in each tier and
whether any clerk-proposed event made them. The hobby reads what was hand-declared, what the rules derived and what an
AI clerk proposed from the file itself.

**Inert exports (item 85 (c); J-A85.81).** Every text node, attribute value and metadata string an exporter writes is
escaped by its format's own rule — XML escaping in SVG and every XML text, JSON string escaping, the VTT formats' JSON —
so a name from a dossier or from another user's edit can never become active content; the SVG writer emits no script
element, no event attribute, no `foreignObject` and no external reference (its fonts and images are data URIs, §17.2), and
§9.5's emblem imports stay sanitised. The bar — CI runs hostile names through every exporter and asserts inert,
well-formed output — is §13.2's. **Display names (item 85 (b)).** A host may pass `HostContext.displayNames` (dossier key
→ text; §14) with one export request: the exporter draws those texts for that request only and writes them nowhere else —
never into the document, a cache or a later export.

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§2.9), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never mistaken
for a real place. For a dossier-bound map whose host supplies the optional realm block (item 77; §14), the port's realm
fit sets the anchor's `bearingDeg` — the turn of model north that fits the derived gates to the partners' true
bearings (§7.7 layer 2) — as the key's documented default; no geometry moves for it. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator easting
and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted to WGS84
latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with `dmath`
so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §3.2 (9)). A foreign member `plat` records the anchor, whether it is the default,
the document id and the output version. The **metric** variant — offered "by prior arrangement" (RFC 7946 §4) for tools
that want the model's own metres — writes x east and y north in metres from the settlement centre with 2 decimals (the
centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar `<name>.metric.json` giving
the origin, the unit, the axes, the document id and the anchor if one is set (J-R31). The metric variant's features also
carry, beside their public attributes, `use` (the class family key), `district` (the id of the district the feature lies
in) and, on plots and buildings, `prosperity` (the field's value, 3 decimals) — V12 §2.2's measurement profile — its
schema version bumped once for them; the strict variant is unchanged (M2b, file f item 447).

**Where exports run.** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9). *Model
formats* — `.plat`, the JSON schema, the compact twin, the skeleton, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks — read the model
and §8.10's instance function (`Exporter.write(doc, null, opts)`) — except the JSON schema's `plan` blocks, which
carry every stored plan and the derived plans the exporting session's elaboration cache holds, each with its rung state
(§2.8), so which derived plans a JSON export carries depends on what was clicked, the cache being non-canonical (§2.9;
J-A28.86). *SVG* needs a display list and label placement at the export's own stop (§8.7): the SVG exporter builds the
export's transient list (§8.1 item 6) for its band and frame with `DisplayListBuilder.build(model, band)`
(≈ 4 µs per building at the city band), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s
`ObstacleSource` and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible
region of §9.2's scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement
digests test the code both run — and writes the file (time: §12.7; the list is §12.8's export-time peak). A
district-band SVG's list is counted in the size estimate shown before writing (J-R41). *Raster formats* — PNG,
print and the `.dd2vtt` scene image — use a transient list too: the generation worker builds it the same way for the
export's band and frame (including the live layers the export's layer set names, as their providers stand at the
request) and transfers it with the raster-export request (§8.9), which also carries the look and view state as they
stood at the request — the sheet, §8.8's view-state switches, the shadow sun and the light step. In its queue's export
class (§8.9) the tile worker runs S13b at the export stop over the list, with the export frame as the visible region; in
`lit` with a `path` sun it bakes the request's crown set when it is not cached and holds it until the export completes;
it rasters every tile with the request's look and view state by §8.8's band-streamed assembly and streams the encoded
bytes and a progress message per band back; the generation worker wraps the VTT scene around the image. A lit export's transient list also
carries what its light reads beyond the frame (§8.8): its band's marks over the frame dilated by one export tile side (its
tiles' first rings) and by the largest light radius, and the city band's casters (§8.1 item 2) over the frame dilated by
§8.4 (c)'s largest window R, which its ring blocks read. That R takes Z from the city band's surface tops (the
`DisplayList` comment) with the frame's lowest terrain sample and the export's sun, so a caster beyond the frame's edge still shades it; the casters'
rows, at most a whole city band's (≈ 1.9 KB per building), count in the export-time peak and its size estimate (§12.8).
The export therefore shows the model, its look and its view state as they stood when it was requested, whatever is
edited, restyled or animated while its bands are rastered; the export dialog shows the bands done out of the bands total
(J-R47).

**The CityJSON extension.** By the CityJSON 2.0 convention a root property outside the core schema is named with a
leading `+` and defined by an Extension listed in the file's `extensions` member; whether a validator rejects an
undeclared one was not executed (PLAUSIBLE), so PLAT declares its one. `@plat/export` ships
`schemas/cityjson/plat.ext.json`, a CityJSON Extension (`type: "CityJSONExtension"`, name `Plat`, its own version,
`versionCityJSON: "2.0"`) whose `extraRootProperties` define `+platGeoAnchor` as an object of exactly three numbers —
`latDeg` in [−90, 90], `lonDeg` in [−180, 180) and `bearingDeg` in [0, 360) — and whose `extraAttributes`,
`extraCityObjects` and `extraSemanticSurfaces` are empty. A file with an anchor lists
`"extensions": { "Plat": { "url": …, "version": … } }`, the url being the address at which each release publishes the
schema beside the package; a file without an anchor — the default — has neither the property nor the member and is
plain CityJSON. CI validates both kinds with the extension schema supplied from the repository, so no check fetches
anything. A change to the property bumps the extension's version with the exporter's output version (§6.4).
**Measurement** at the CityJSON exporter's milestone (M3b, D-8): the anchored file passes the CityJSON validator with the
extension. **Pre-decided fallback:** the anchor moves to a sidecar `<name>.geoanchor.json` beside `<name>.city.json` —
the three numbers, the document id and the output version, checked against its own JSON schema like the metric
GeoJSON's sidecar — the CityJSON file carries neither the property nor the member, and the report says so (J-R43).
CityJSON is built for its lossless integer-vertex encoding (J-R14).

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares.
  One scene image is ≤ 8 192 px on a side at the declared grid (default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m);
  a larger scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) —
  the export dialog shows the choice before writing. Output is exact pixels per cell (grid alignment error 0 px per
  cell, O11 g).
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces, yard
  walls and hedges from boundary treatments (fences and railings do not block sight), cliffs, retaining walls whose
  derived step (`stepProfile`, §2.7) is at least `vtt.retainingMinCm` (150 cm, a cell of the VTT export settings) as
  polylines along the wall broken over every stair or ramp interval (an opening, not a portal), and a raised part's
  supports' footprints as closed polylines as cliffs are (one rule, V01-XCONF-2; M3a, file f items 447, 448); no portal
  where a raised way crosses a street; `objects_line_of_sight`
  empty; `portals` — doors at every entrance of a building's entrance set (§2.6; item 29: `main`, `side`, `rear`, `yard`
  and `service`, each the width of its plan opening where the plan rung exists (V03 §3.6 O3; M6-P, file f item 451), else
  1.2 m) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }` — a concealed door only for a key
  that admits its use (item 63); a window, where a storey's scene writes one, a portal written `closed: false`, since the
  format has no window flag and importers read an open portal as a window (file f item 454); `lights` — the model's
  lights in the scope (item 68): every `LightSource` lit at the export's drawn week and every lit window at the export's
  hour (§10.3), `{ position, range in squares (its radius), intensity: 1, color, shadows: true }` with `color` as eight
  hexadecimal digits, alpha first (`AARRGGBB`), and on the underground layer its shafts — each by §8.1 item 7; `environment { baked_lighting: true,
  ambient_light }` with the ambient of the export's light setting; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in, lit by §8.4's CPU reference at the export's light setting (a day or a
  night scene).
* **Per layer:** one file per model layer — the underground one per depth band (II.7.3) — its elevation in the file name
  and in a `plat` extension object; coordinates exact to the grid (O11 g). An underground band's scene (M6-U, file f
  item 452 as corrected by V04-ICONF-3) takes `line_of_sight` from every void kerb and chamber wall and every underground
  building's footprint less its doors; `portals` only at openings in a wall line — a door access, a door or breach link,
  an underground building's entrances, each tunnel grille (closed when locked, bricked, gated or secret); every vertical
  access (stair, shaft, ladder, hatch, well, grating, mouth, sinkhole) a shaft light plus a `plat` extension object; and
  `lights` the band's lights and shafts — each only where the export's key admits it (§8.1 item 7).
* **Per raised way (item 110 (b); M3a):** each raised way crossing the scope adds one deck scene at its mean deck
  elevation, named as a storey scene is, its parapet edges `line_of_sight`, its end stairs or ramps open portals
  (`closed: false`) and the ground beneath drawn dimmed — at most 8 per export, the longest first, the dialog saying so;
  a Foundry scene writes each deck as one more level with its elevation band.
* **Per storey (item 28):** a building whose plan rung exists exports one scene for each storey, at that storey's elevation:
  `line_of_sight` from its walls minus their openings, `portals` from every opening and every entrance, the stair core a
  named portal on both storeys' scenes; `lights` — one per lit room (`Room.lit`, §2.6) that draws for the export's key (a concealed room's only for a key that admits it, §8.1 item 7) at its spine summit (§3.8's
  `spine` reader, its sampled medial axis on a downgrade; §8.5), `{ position, range, intensity: 1, color, shadows: true }`
  as the scene-level `lights` above, `range` being the room's diameter in squares and `color` the `glow` role's; the
  walls keep their centimetre positions and only the scene's grid snaps.
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units — written before the walls — and journal
  entries from the gazetteer.
* **Plain scene PNG:** on request a plain PNG of the scene named `{cols}x{rows}` is written beside the file, for
  tabletops that read the grid from the file name (file f item 454).

### 11.2 The embedding API and the worker boundary (SCL-6)

```ts
type DocHandle = { readonly id: string };            // the document lives in the generation worker
interface PlatApi {
  generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void;
    docId?: Uuid /* a host-minted id, e.g. a SettlementForge map record's mapId; else minted here (SettlementForge stage; file f item 459) */;
    prefix?: EditEvent[] /* the port's creation prefix, written at positions 0…k with `creation` set */;
    scratch?: boolean /* a scratch document, as `scratch` below (M3c; file f item 469) */ }): Promise<DocHandle>;
  scratch(h: DocHandle): Promise<DocHandle>;   // the committed state of h at its logHead, written to its snapshot form in the generation worker and opened as a new handle by §2.9's reader: never saved, never bridged, never resolved by a DocResolver; its session 'clerk:<n>', its role and knowledge key h's; an editing role's call (a viewer's refused 'role'); its memory a session line (§12.8; V10 §6.2) (M3c)
  open(bytes: ArrayBuffer, opts?: { readOnly?: boolean; session?: string /* a host-assigned session (§11.3); otherwise the document's stored session, minted on first edit (§7.4) */ }): Promise<DocHandle>;             // .plat or CBOR twin; bytes transferred in
  edit(h: DocHandle, e: EditEvent | EditEvent[], opts?: { filtered?: boolean; admitAs?: Admission }): Promise<ApplyResult>;   // an event may arrive with its `fates` filled (below); `filtered` and `admitAs`: *Knowledge*, below (file f items 470, 572)
  regenerate(h: DocHandle, scope: Scope, mode: 'keep'|'newRandom', opts?: { discardEdits?: boolean }): Promise<ApplyResult>;   // §7.1's Regenerate (keep settings) and New random
  adjust(h: DocHandle, param: string, value: unknown): Promise<ApplyResult>;                          // §7.1's Adjust, or Re-derive from Sk for a parameter consumed early
  confirm(h: DocHandle, token: string, fates: EditFate[], renames?: Rename[]): Promise<ApplyResult>;                     // completes an action that returned `confirm` (below)
  cancel(h: DocHandle, token: string): void;                                                         // drops it; nothing was committed
  preview(h: DocHandle, e: EditEvent | EditEvent[], opts?: { view?: ViewHandle; filtered?: boolean; admitAs?: Admission;
    variations?: 3; page?: number; focus?: number }): Promise<PreviewResult>;   // item 101: the dry run alone — nothing committed; with a view, its ghost drawn as `live.ghost` (§8.2); an editing role's call (*Knowledge*, below); `variations`: *Variations*, below (file f item 461)
  thumbnail(h: DocHandle, req: { previewId: string; variation: number; box: BoxCm; px: [number, number] }): Promise<ImageBitmap>;   // the tile worker's export-class raster of a preview's overlay ghost marks, ≤ 160 × 120 CSS px at the view's DPR, transferred
  undo(h: DocHandle, of?: number): Promise<ApplyResult>;   // appends an `undo` event for the handle's session (§7.4); `of` only for the `owner` role; a conflict lists the dependent events
  redo(h: DocHandle): Promise<ApplyResult>;                  // appends a `redo` event for the handle's session (§7.4)
  query(h: DocHandle, q: Query, opts?: { admitAs?: Admission }): Promise<QueryResult>;   // ≤ 64 KB per page, paginated (kinds below); admitted by the knowledge key (below)
  view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?: ViewOpts): Promise<ViewHandle>;   // tiles flow from the tile worker
  setView(v: ViewHandle, patch: Partial<ViewState>): void;
  setViewOpts(v: ViewHandle, patch: Partial<ViewOpts>): void;   // an `undefined` viewAs clears it (file f item 464)
  export(h: DocHandle, fmt: Format, opts?: ExportOpts): Promise<ArrayBuffer>;              // transferred out
  report(h: DocHandle): Promise<GenerationReport>;
  advance(h: DocHandle, req: AdvanceRequest, opts?: { onProgress?: (p: { epoch: number; of: number }) => void }): Promise<ApplyResult>;   // refused on a dossier-bound document; V06 §4 (M6-E; file f item 458)
  cancelAdvance(h: DocHandle): void;
  forkAt(h: DocHandle, seq: number): Promise<DocHandle>; rerunFrom(h: DocHandle, seq: number): Promise<DocHandle>;   // each an editing role's call
  subscribe(h: DocHandle, handler: (e: ApiEvent) => void): Unsubscribe;
  close(h: DocHandle): void;
  registerProvider(p: { id: string; version: string; moduleUrl: string }): Promise<{ status: 'ok' } | { status: 'refused'; reason: 'nondeterministic'|'origin' }>;
    // §11.4's door (4): the provider's module loaded into the generation worker, the derivation pool and the double-run check's two fresh workers
    // (§6.5 (8)) — refused `nondeterministic` when the two runs differ, `origin` when its URL's origin is neither the embedding page's nor one the
    // embed's origin allowlist admits (§11.3); a call of the page's own or a script's, which no bridge message makes (§11.3, §11.4; J-A85.83)
}
interface ViewOpts { viewAs?: Admission /* a display filter: this view's drawing, labels and reads admit exactly what both the view's knowledge key and viewAs admit (§9.2's admission function) — a tier alone is read with the key's places; a key form is a key in its own right, so when its tier is the lower its places stand in for the key's, a place the key withholds staying withheld (a host's party key: V08's players' view); the knowledge key itself is unchanged, so the document formats stay available to the role (file f item 464) */ }
type Admission = 'public'|'local'|'secret'|{ tier: 'public'|'local'; places: Id[] };   // a lowering of a caller's key (file f item 572); `public` below `local` below `secret`
type MsgRef = { key: string; args?: Record<string, string | number | { id: Id }> };   // declared in @plat/model: a catalogue key with arguments; an address argument rendered under the caller's key (a withheld place as its kind); its English text the application's catalogue's (V09 §2.9) (file f item 463)
type Effect = { kind: 'added'|'removed'|'rerouted'|'joined'|'lost'|'displaced'|'rebuilt'|'moved'; msg: MsgRef; targets: Id[] };   // a consequence to something not held (the held ones are `fates`), filled from the dry run's touched set by the owning volumes' rows — V02's deck buildings, V03's stored plans, V04's arch vaults, V06's generated routes, the base's junctions, water and households (file f item 465)
type ApplyResult =
  | { status: 'ok'; logHead: string /* §11.3 */; changed: number /* addresses whose records changed */; created: Id[] /* the addresses the committed events minted, address order, the first 256 (file f item 470) */ }
  | { status: 'conflict'; actions: ConflictAction[] }                // §7.1's dry run: the nearest valid position, the blocking lock, a stale base …
  | { status: 'confirm'; token: string; fates: EditFate[] /* the first 1 000; the rest by query 'fates' */; renames: Rename[] /* the case-(4) renames the dry run listed (§6.3, §7.3 item 4); the rest by query 'fates' */;
      counts: Record<EditFate['fate'], number>; scope: EditScope /* resolved */; effects?: Effect[]; effectsMore?: number; holds?: MsgRef };   // §7.3 item 4: nothing is committed until confirmed
type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'reroute'|'stale'|'invalid'; target?: Id; at?: PointCm; message: string /* the English default */; msg: MsgRef };
type PreviewResult =
  | { status: 'refused'; reason: 'role' }   // a viewer's preview (*Knowledge*, below): nothing computed, so no list, count or shape
  | { status: 'ok'|'conflict'; actions?: ConflictAction[] /* on conflict */; fates: EditFate[] /* the first 1 000 */; renames: Rename[];
      counts: { plots: number; households: number; buildings: number; byFate: Record<EditFate['fate'], number> } /* §9.5's count badge */;
      created: Id[] /* the addresses the events would mint, from the document's `nextSeq` (§6.3) */;
      shape?: PolygonCm | PointCm[] /* a points form's derived shape, resolved as the event would store it (§7.1) */;
      arcs?: { kind: 'walled'|'barrier'; grade?: 'full'|'light'|'closure'; barrier?: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' /* J-VI.3 */; points: PointCm[] }[];   // a `drawWall` or `placeGate` preview: the derived circuit's arcs, typed by g item 106 (a)'s closure and (c)'s grade (file f item 462)
      anchors?: PointCm[] /* each anchor tower's point */;
      bent?: MsgRef /* the reason a declaration was bent to the nearest lawful one (R2) */;
      alternatives?: Id[] /* a placement's (placeAt, assign, roster line) top three plots: the first three `SiteCandidate`s the `sites` query returns for its class at its anchor or locus; for a dwelling closure bent to a dug access (§7.3 item 9 (d)), the further qualifying buildings in that rule's order, at most three (file f items 463, 372) */;
      effects?: Effect[] /* at most 50, in the order of `kind` then of the targets' size */; effectsMore?: number /* the rest */;
      holds?: MsgRef /* a removal whose fold records a suppression or a removed slot: `info.remove.holds` with its verb (`rebuild` · `raise`) and kind */;
      previewId?: string; variations?: { event: EditEvent /* resolved, with its absolute reroll map */; result: PreviewResult; page?: number }[] /* *Variations*, below */ };
type Query =
  | { kind: 'gazetteer'; text?: string; kinds?: string[]; page?: number }
  | { kind: 'people'; type?: string; race?: string; gender?: string; profession?: string; workplace?: Id; ageRange?: [number, number]; household?: Id; district?: Id; page?: number }   // COV-FTG-C13
  | { kind: 'hit'; view: ViewHandle; x: number; y: number; radiusPx?: number /* default 10; 22 under a coarse pointer */ }   // answered by HitAnswer (file f item 466)
  | { kind: 'whereIs'; person: Id; day: string; hour: number }
  | { kind: 'relations'; person: Id; up: number; down: number }   // the family-tree view (COV-FTG-C11), from the relation store
  | { kind: 'inView'; view: ViewHandle }                          // the "features in view" list (COV-FTG-A24; the non-visual route, J-S19)
  | { kind: 'fates'; token: string; page: number }                // the full fate list of a pending confirmation, then its renames
  | { kind: 'why'; id: Id; path?: string; mode?: 'asPlaced'|'asNow'; historyPage?: number }   // item 101: the oracle — the rule, its inputs and the alternatives it weighed, from provenance and §2.8's derivation records; filtered under the caller's key (*Knowledge*, below); answered as `WhyAnswer` by the kind's `WhyProvider` and the registered section providers (§2.8)
  | { kind: 'brief' } | { kind: 'entity'; id?: Id; at?: PointCm; layer?: Layer; below?: boolean; dossierKey?: string } | { kind: 'sites' } | { kind: 'measure' }
  | { kind: 'frame' } | { kind: 'rule' } | { kind: 'profile' }   // each member's fields and its answer type (MapBrief, EntityCard, SiteCandidate, MeasureAnswer, FrameAnswer, RuleAnswer, ProfileAnswer, WhyAnswer, WhySection, WhyCause, WhyFamily, WhyPull, WhyLink, FieldDrivers) exactly as V10 §2.13's `ClerkQuery` gives them (M3a; file f item 468; `dossierKey` file f item 583)
  | { kind: 'links'; ids?: Id[]; region?: Box; good?: string; page?: number }   // g item 105 (j): the supply links bound by S10a/S10b's binding function, read from the generation worker's link cache (V09 §3.15), recomputed and never stored — `LinkRow`s (V09 §2.7) with each link's orientation, its declared link-edit row and a SettlementForge chain's status (file f item 460)
  | { kind: 'plan'; building: Id; storey?: number } | { kind: 'planReport'; building: Id }   // V03 §4.6: derives an absent or stale plan into the cache as a click does, logs nothing (M6-P; file f item 457)
  | { kind: 'history.index' } | { kind: 'history.frame'; week: number /* a view state, not a model change */ } | { kind: 'history.diff'; w1: number; w2: number } | { kind: 'history.chronicle'; page?: number };   // V06 §4 (M6-E; file f item 458)
interface HitAnswer { ids: Id[] /* every mark under the point within the radius, top first by §8.2's draw order — a raised part above ground part 0 — one entry per entity */;
  sub?: { id: Id; path: string /* the sub-part under the point: 'spans/<ordinal>' of a raised way, 'crossings/<retaining wall id>' of a way, 'tiers/<k>' of a stepped building */ } }   // computed on the main thread from the hit-test slices (§8.9) within 1 ms
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

**Knowledge (item 30; J-A30.83, J-A30.85).** `query` answers of every kind — `gazetteer`, `people`, `whereIs`,
`relations`, `hit`, `inView`, `why`, `brief`, `entity`, `sites`, `measure`, `frame`, `rule`, `profile`, `links`, `plan`,
`planReport` and the `history` kinds — and hover content list every entity in scope with its kind, address and geometry, but
withhold the `name` and the purpose of a place (its `use`, or an institution's kind) that §9.2's admission function does
not admit, marking the row `withheld: true`; a person's workplace or
household that is a withheld place is given by its address only, and the person's profession is withheld with it where
that profession is the place's use. A view-bound reader (`hit`, `inView`, hover) admits at its view's band; every
band-less one — the gazetteer, `people`, `whereIs`, `relations`, `why`, `brief`, `entity`, `sites`, `measure`, `frame`,
`rule`, `profile`, `links` — as at the city band, whatever the caller's zoom (a view gives `inView` its box only). A
`gazetteer` row of kind `customChain` lists each ACTIVE `CustomChainRecord` with its label only when the key admits
every joined node (a relation, never a `withheld: true` row); an inactive one is not listed (V08 §5.2; file f item 410).
A `links` answer gives a withheld end by address and kind and leaves a concealed use's links out. A withheld entity
carries no purpose: its `kind` is its §2.8 registry kind, its attributes only the readable paths whose `purpose` flag is
false, a use of it has no `cls`, a row id authored on its class and a hard-fail naming it become `fam/<family>` with the
family's sentence, and a link to it carries no good. An element of a cavern or ruin cluster whose excavation reading is
`unexcavated` is absent — not withheld — for every key below `secret`, from every answer, count and list.
`EntityCard.anchor`, `bounds` and `groundCm` are for the caller's own geometry: a client that forwards answers to a model
strips them, and in host mode the module strips them before an answer leaves the frame (§11.3). An address whose entity
a live `delete` tombstoned answers `why` with its registry kind, a `removed` cause and `removed { seq, week, by }`, and
`entity` from §2.8's `Tombstone.last` — the record's kind, name and shape, and the fields a re-declaration reads (a
way's class, width and `raised`; a wall's kind and `closed`, a retaining wall's `highSide`; a gate's enceinte; a
building's class and its plot; a deck plot's deck host and slot ordinal) with `removed: { seq }` (file f item 467) — to a
key that admitted it before; to any other key it is an unknown address. `entity { at }` answers the top of the hit stack
at the point (`HitAnswer.ids[0]`; a raised part above ground part 0) and, with `below`, the next one down;
`entity { dossierKey }` answers the address of the `DossierBinding.rows` row whose `dossierKey` it is (§7.7 item 12), at
the query's seq, as that address's `EntityCard`, `withheld` as for any address, and `null` when no row holds the key or
the document has no binding (file f item 583). **Lowering (file f item 572).** `admitAs` only lowers: an answer, and a
filtered dry run's fates, renames, actions, bend lines, created addresses and effects, admit exactly what both the
caller's key and `admitAs` admit — a tier given alone is read with the caller key's `places`, a key form `{ tier, places }`
is a key in its own right — so a client never raises what its key admits (J-A30.82). A view's `ViewOpts.viewAs` is the
same lowering for that view's own reads; a client that speaks for a view passes the view's effective key as `admitAs`
(`'secret'` at that tier, else its key form) — the built-in clerk on its band-less reads and its dry runs, an application
on its band-less reads; an application's own dry runs, which its user confirms, stay at the role's key (V09 §2.7).
**`filtered` (file f item 470).** With `filtered`, a dry run's fates, renames, conflict actions, closest options, bend
lines, created addresses and effects are rendered under the caller's key by these rows (a withheld place by address and
kind, a concealed use and an unexcavated element absent, an effect left with no admitted target dropped); its messages
are `MsgRef`s, so a filtered result never carries a withheld name. **The oracle under the key (items 63 (c), 101 (d); J-A101.85).** A `why` answer is filtered by the same function
and never says more than the rows above: (1) a `why` on a place whose name or
purpose the key does not admit gives its address and kind only, marked `withheld: true`, with no rule, input or
alternative; (2) in any other answer, a rule, input or alternative that is such a place — a relation row's target, a
supply edge's end, an alternative site — is given by its address and kind only, marked `withheld: true`; (3) a concealed
use the key does not admit is left out of every answer, as §9.2 leaves it out of the drawing and §11.1 out of every file:
its relation and supply rows, its lineage's draws, its concealed parts and the alternative sites its pair was scored at
name nothing and are not counted, and a `why` on one of its parts answers empty, as for an address the document does not
hold; (4) a front's `why`, for such a key, is the front's own — the oracle's answer for the front's class alone at that
plot: its hard rows, which the site passes, its soft rows scored there and the closest acceptable sites that class alone
would take, evaluated by the oracle from the same tables over the committed model, read-only, as it finds any building's
alternatives — so the answer has the form of every other building's and the front reads as the front (item 63 (c)); a
key that admits the concealed use reads the pair's own derivation whole. **`preview` is an editing role's call**, as
`edit` is (§11.3's roles): a viewer's `preview` is refused (`status: 'refused'`, `reason: 'role'`) with nothing computed,
since an unfiltered preview returns the dry run's fates, renames, counts and shape. `fates` pages and a `confirm` result go only to an editing role and are not filtered: `confirm` needs the
lists back unchanged (*Confirming fates*, below), and an editing client holds the document it loaded (`open`, above,
or §11.3's `doc.load`), for which the key is no secrecy boundary (§11.1). A content provider (§14) answering through
`query` gets the same filtered
rows. A host that holds the dossier knows every place already (§11.4); a viewer learns one only by
the host raising its key (§11.3), never by asking. A concealed use (item 63) is left out for a key that does not admit it — its
rows, its rooms and its way down, in every kind of answer, by (3) above — and the front's rows stand. **Tiers (item 20
(h)).** Every row of every answer marks each fact it gives with its tier by §2.8's `factTier`, and a `why` answer names,
for a derived fact, the derivation table's row that made it (§7.7 item 10); a label's display text is given beside the name (§9.1).

**Variations (file f item 461).** With `variations: 3` a derived fill's dry run returns §7.3 item 10's three overlays in
the `ok` branch as `previewId` and `variations`, `page` advancing past the rerolls used (§5.1 (6), within
`reroll.maxAdvance`) and `focus` choosing the overlay drawn as `live.ghost`; the overlays are held in the generation
worker until the draft commits or cancels, and `thumbnail` rasters one. A clerk's alternatives are separate `preview`
calls, one per variation. The committed form of each source is §7.3 item 10's.

**Confirming fates.** An action whose dry run (§7.1) must be confirmed under §7.3 item 4 — protected entities in
its effective scope (Re-derive from Sk, Adjust of an early parameter, a regeneration over locked, pinned, edited or
assigned entities, "discard edits in scope"), or case-(4) renames (§6.3), including an `unlock`, `unassign`, `undo`,
`redo` or `revert` that frees a name — returns `confirm` with the fate of every protected entity, every listed rename
and a **token** = H128(the document's `logHead` ‖ the canonical bytes of the event without its fates and renames).
Nothing is committed. `confirm(h, token, fates, renames)` commits the event with those fates and renames when the token
is still current (the `logHead` has not moved) and the fates and the renames equal the dry run's lists; if the state
moved it re-runs the dry run and returns a fresh `confirm`, and a changed list is never committed silently. Resubmitting
the event through `edit` with its `fates` and `renames` filled is the same operation — the engine commits when a fresh dry
run computes the same fates and renames and otherwise returns `confirm` — which is how a host bridge carries a confirmed
action (§11.3). "Discard edits in scope" is a new request (`regenerate` with `discardEdits: true`) with its own
confirmation. `cancel` drops the token (J-R33).

**The clerk's tool API (item 101 (b), (d); R10, R19; J-A101.83, J-V10.39).** The tool API a clerk — SettlementForge's
assistant driving it (V10 Q2: J121, J122) or the built-in clerk (M3c) — drives is this API and the reader kinds, scratch
documents and dry-run options added for any client (the `why` extension and the seven reader kinds, `scratch`,
`filtered` and `variations`; file f item 471): the declarations
are §7.1's events and sugar events through `edit`; the reader is `query`; the **oracle** is `query({ kind: 'why' })`,
answered from provenance and §2.8's derivation records — the rule, its inputs and the alternatives it weighed (the
closest acceptable sites of §4.7 S10b, the rows a derivation fell back through, §7.7 item 10); and a proposal is a
`preview` — the dry run's fates, renames, counts and derived shape, drawn as a ghost in the viewer's view (§8.2's
`live.ghost`), nothing committed — which the user accepts as an `edit` carrying `proposedBy: 'clerk'` or drops (J-A101.74,
§7.1); a bridged host's clerk asks for it by §11.3's `preview` message (J-A101.86). A clerk is a client like any other: it holds a role and a knowledge key given by its host (§11.3), so it never
bypasses the dry run or the undo, never writes a dossier fact (a `dossier-owned` refusal stands, §5.2) and reads and says
only what its viewer's key admits — its `why` answers and its `preview`s by *Knowledge* above (§9.2). Its transcript of `edit` calls is a skeleton (§11.1).

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint; out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes | transfer | the document's size |
| `edit`, `regenerate`, `adjust`, `confirm`, `undo`, `redo` | in: events or a token with fates and renames; out: `ApplyResult` — `ok` (the new `logHead`, count of changed addresses), `conflict` (actions) or `confirm` (token, the first 1 000 fates, the renames, counts per fate, the resolved scope) | copy | < 64 KB per batch; longer fate lists by `query({ kind: 'fates' })` pages |
| `preview` | in: events; out: `PreviewResult` (the ghost reaches the view as a `live.ghost` delivery, §8.9) | copy | < 64 KB; the preview's time §12.6's |
| `thumbnail` | in: a preview id, a variation, a box, a size; out: an `ImageBitmap` | transfer | ≤ 160 × 120 CSS px at the view's DPR; an export-class job (§8.9) |
| `scratch`, `forkAt`, `rerunFrom` | out: a new handle | copy | < 1 KB; the document stays in the generation worker |
| `advance` | in: an `AdvanceRequest`; out: `ApplyResult`, progress per epoch | copy | < 64 KB; V06 §6's time |
| `setViewOpts` | in: a `ViewOpts` patch | copy | < 1 KB |
| `registerProvider` | in: the provider's id, version and module URL; out: `ok` or `refused` with its reason | copy | < 1 KB; the module loaded once per worker, the check's two runs §6.5 (8)'s |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: composed tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes | transfer | the format's size |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, `report.changed` — the `changes` entries of §5.4's `GenerationReport` appended since the last delivery, a dossier event's entries naming its `changeId` and reason (§5.4; item 75); items 17–22) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1);
ids cross this boundary as `<docId>/<id>` (§6.3). The derivation pool uses transferred copies, never `SharedArrayBuffer`
(§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional shared columns
(§8.9) remain the only use of shared memory. **Engine (§3.7, SCL-22):** the product bundle has no WebAssembly dependency;
if M0 triggers the kernel's pre-decided fallback (Clipper2-WASM as the single engine), WebAssembly becomes an embed
requirement and a host without it receives the API error `E_ENGINE_UNAVAILABLE` from `generate` and `open` (not a kernel
result, §3.1).

### 11.3 The host bridge — the host is the store (FTG-12)

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the
  embed's allowlist, and — item 85 (d) — the message's source window checked to be the embedding window it was bound to,
  so a second frame of the same origin cannot speak for the host) and `MessagePortTransport` (any relay — a
  browser-extension content script, a SharedWorker, a chat-bus relay; COV-FTG-N06). Envelope:
  `{ plat: 1, type, session, seq, re?, logHead?, body }` — `re` on every reply (`query.result`, `preview.result`, `export.ready` /
  `export.refused`, `doc.applied` / `doc.rejected`) is the `seq` of the request it answers, so a host with several
  requests in flight matches each answer to its question (item 85 (d)); host messages that arrive before the module has
  sent `ready` are queued and delivered in order after it, never dropped. **SettlementForge's configuration** is the module
  in an iframe on its own origin — which origin follows SettlementForge's own hosting decision, read as an input (J121;
  V08 Q1) — speaking through `WindowPostMessageTransport` (item 85 (e)); a worker or a service
  remains the configuration for other hosts (J-A85.82). The bridge is the module's
  boundary with a host program, SettlementForge in its owner-staged phase included: its messages carry data only — a
  dossier's events in, the map document and its report out — and never code, so no message registers a content provider
  (§11.4's door (4); J-A85.83), and the module stays a separate program in its own bundle,
  loaded in a worker, an iframe or a service (item 21 (d): a design choice that keeps the seams clean and every later
  licensing choice open, §17.3; J-A21.81).
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role, session }`,
  `doc.apply { baseLogHead, events }`, `view.set { patch }`, `export.request { fmt, opts }`, `query { q }`,
  `preview { events, view?: boolean }` (item 101 (b): a clerk's proposal; J-A101.86) — `true` draws the ghost as
  `live.ghost` in this client's own view (§8.2), which stands for §11.2's `ViewHandle` since a bridged host holds none,
  and `false` or absent computes the dry run alone. PLAT → host:
  `ready { outputVersions, schemaVersion }`, `doc.changed { baseLogHead, events }` (a local user's proposed events),
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`,
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }` or `export.refused { error, message }`
  (an API error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them), `query.result`, `preview.result { result }` (§11.2's
  `PreviewResult`: the dry run of the events for an editing role, nothing committed, the ghost drawn as `live.ghost` in the
  requesting client's view when `view` is `true`; a viewer's answered `refused`),
  `report.changed { entries }` (§11.2's report event; a dossier event's entries name the `changeId` and the reason of the
  change that caused them, so the host sees why — never a request back; item 75). **The port's vocabulary (SettlementForge
  stage; file f item 472; the types are V08 §2.2's).** Host → PLAT gains `dossier.offer { dossier, dossierHash, host?,
  create? }` and `doc.snapshot {}` (owner or editor only; a viewer's either answered `doc.rejected { reason: 'role' }`),
  `host.state { party?, backups?, partyPicturesAt?, playersView? }` (owner or editor sessions only; kept in the
  session's memory — never in the document, its view state or a save; `playersView` sets the frame's `ViewOpts.viewAs` to
  the party key, never the view's knowledge key) and `party.render { party, since? }` (owner or editor only; not an
  export: the module resolves `party` to a key form, draws the party picture set under it as `knowledge` and lists its
  gazetteer under it as `admitAs`, V08 §3.14); `doc.load` becomes `doc.load { bytes | ref, role, session, audience? }` —
  the module derives role and key from the audience word by §14's table and takes the LOWER of that and `role`;
  `export.request` becomes `export.request { fmt, opts, displayNames?, knowledge?: Admission }` (§11.1's *Knowledge*:
  `knowledge` lowers the requester's key for that export only; `displayNames` as §11.1's *Display names*); in host mode
  the module answers an `export.request` for any format other than `png`, `svg` and `print` with `export.refused { error:
  'E_HOST_FORMAT' }` (V08 §5.4), which never applies to `doc.snapshot`. PLAT → host gains `dossier.result { status,
  dossierHash, baseLogHead?, events?, encoded?, seqAfter?, logHeadAfter?, created?, factHash?, week?, report, held? }` (a
  reply carrying `re`; `held` is `{ code, message, reason }`, a `host.held.*` row of V08 §3.9), `doc.snapshot.ready {
  bytes, logHead, lastSeq, outputVersion, schemaVersion, documentDigest }` (a reply), `module.status { phase, detail?,
  progress?, outputVersion? }` (a push; `detail` a `host.*` catalogue key), `host.action { action: 'refresh' | 'restore'
  | 'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings', args?: { places?, undo?, tier? } }` (a push from an
  owner's or editor's frame only, which the host runs as V08 §4.2's row says) and `party.rendered { status: 'rendered',
  set } | { status: 'unchanged' }` (a reply; the set V08 §2.1's `PartyPictureSet`, stored as handed); `ready` becomes
  `ready { outputVersions, schemaVersion, protocol, adapters: { line, version }[] }` and `doc.changed` becomes
  `doc.changed { baseLogHead, events, encoded, seqAfter, logHeadAfter }` — each event's canonical CBOR in order, the last
  seq and the head after them — so the host stores what it is handed and computes nothing. **The clerk's configuration
  (M3c; file f item 473).** Host → PLAT gains `clerk.config { mode: 'off'|'builtin'|'host'; transport?: { baseURL: string;
  token: string; expiresAt: number; fallbacks?: 'server'|'client'|'none' /* absent: server */ }; capUsd?: number }` (V10
  §3.17: `off` — the default until one arrives — hides the built-in clerk, `builtin` shows it on the user's key or,
  with a transport, through the host's proxy, `host` hides it because the host's own clerk drives the map; the
  transport's address must be `https`, on the embed's origin allowlist and in the page's `connect-src`, else
  `clerk.config.refused { reason: 'origin' }`; the token is held in memory only), and `preview` gains `proposal?: { id:
  string; reason: string; variations?: { label: string; events: EditEvent[] }[] }` — shown as a proposal card in the
  frame, one waiting proposal per session, a viewer's `preview` still refused; PLAT → host gains `clerk.needsToken {}`
  (sent before the token expires or when it is refused; the host answers with a new `clerk.config`) and `clerk.proposal
  { id, status: 'accepted'|'dropped'|'stale'|'failed', seqs? }`. In host mode the module applies the **host projection**
  to every `query.result` and `preview.result` before it leaves the frame — V08 §5.4 (3)'s rows for the base's kinds and
  the preview reply, V10 §3.17's rows for `brief`, `entity`, `sites`, `why`, `frame` (without `near` and `radiusM`),
  `rule` and `profile`; `measure`, `hit` and `inView` are answered `query.result { error: 'E_HOST_KIND' }` (correlated
  by `re`) — so no length, bearing, extent or coordinate reaches a host (door 1, J86). The AI key or relay, the assistant
  and its model tier follow SettlementForge's own decisions, read as inputs (J121; V10 Q1–Q3). **One way (items 20, 22; J-A20.81).** No PLAT → host message writes,
  patches or proposes a change to the host's dossier: `doc.changed` carries map-document events only, `report.changed` the
  map's report, and the vocabulary has no message that addresses the dossier; a dossier change reaches the map as
  `doc.apply` events with `author: 'host'` and `EditBase.dossier` set (§7.1, §7.7, §11.4), in the host's order — the ordered
  dossier history of item 22 (c) — and the host stores the returned document as an opaque artifact of the map (item 20 (d)).
* **logHead** = a 128-bit hash of (document id, edit-log length, hash of the last event), in hex (our own term, FTG-22).
* **Convergence.** The host holds the canonical document and log. A client sends its user's edit as `doc.changed` against
  its `baseLogHead`; the host accepts only when that base is the current `logHead` — it appends the events, advances the
  `logHead` and fans `doc.apply` out to every client, the sender included — and otherwise answers
  `doc.rejected { stale }`; the client then applies the host's pending `doc.apply` messages, re-runs its own events
  through the dry run (§7.1) on the new state and sends them again, or shows its user the conflicts. An action that needs
  its fates confirmed (§7.3 item 4, §11.2) is sent only after the local user confirmed them, as an event carrying its
  `fates` and `renames`; if the state moved underneath it, the client's re-run returns a fresh confirmation for its user
  instead of resending, and every other client replays the event with those fates, reporting a mismatch if it computes
  different ones. A dossier offer's commit follows the same rule: the host appends a `dossier.result`'s encoded events
  only when its `baseLogHead` is the current head (V08 §3.3); the host verifies that one equality and stores the rest as
  handed. Every client applies the same events in the host's order on the same output version, so every client's
  model hash is the same (§6.2) — after a load mismatch, once the owner has chosen (§2.9 step 4). **Test (M3a):** a host
  and three headless clients applying 1 000 interleaved random events — undo and redo from every client and one owner
  undo through a chain among them — converge to one model hash with 0 lost accepted events; and one forced load mismatch
  settled by an owner's keep while two editors edit on the replayed town: all four converge to one model hash, the
  editors' events re-applied on the saved town.
* **Version handshake.** On `doc.load` the client compares the document's **`outputVersion`** (§6.4) — not the generator
  version — with the output versions it can replay (announced in `ready`); when it cannot, it opens the snapshot
  read-only (its role drops to viewer, and it says so) as §2.9 step 2's frozen view does — checked by its chunks' content
  hashes only and labelled "made with o<k>; not verified by this version", never reported as a mismatch — and it never
  replays under another version silently.
* **View state.** Every view key of §2.9 (its view section, outside the model hash; each last-writer-wins by (Lamport
  counter, session id)), the per-viewer keys among them, travels as `view.set` / `view.changed`, except the pointer that
  moves the cursor sun and the `underlay` image (§9.5), which never cross the bridge (E-19). The key `time` is set by
  `view.set { time }` and advanced by the module-tier message `sim.advance { hours }` (§10.3). **The host's clock (item 67; J-A67.82).** The clock the design calls
  "the simulator's" — the one whose weeks move the map's history — is the host's: its advance reaches the map only as
  dossier events and epochs, which the port dates and groups by §4.11's week and cadence (§7.7 items 1 and 6; §11.4),
  and a host shows its campaign's current week by `view.set { week }`; the module's `time` key counts hours and never
  moves the map (§10.3). A viewer's `knowledge` defaults from its role — `owner` and `editor`
  `secret`, `viewer` `public` — the host may set any viewer's key by `view.set`, and a client never raises its own tier
  above the one its role or the host gave it, so a player learns a secret place when the game master says so (J-A30.82).
* **Style is canonical; the preset a viewer looks through is not (N-15).** The document's style (§2.9 `style`: the sheet
  and version, its row operations, the ground-cover regions) changes only through logged `setStyle` events, which the
  bridge carries in `doc.changed` / `doc.apply` like any edit and which only the `owner` and `editor` roles may send. The
  view key `stylePreset` is a per-viewer choice of preset (for example a player looking at the `lit` family while the
  document is drawn in `ink`): it never writes `setStyle`; the chosen preset replaces the document's sheet for that viewer
  only, and the document's own rows (thematic overrides, ground-cover regions) apply on top where the preset has the roles
  they name, the rest listed in that viewer's style dialog (J-R34).
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load` — for SettlementForge by the audience table of the port's
  host glue (DM, co-DM, player, anonymous; §14, item 85 (f)), SettlementForge's accounts and audiences read as inputs
  (J121), never a rule of the model. A viewer's client never emits `doc.changed` (model edits
  are disabled in the UI and dropped by the bridge) and emits only the view changes the host allows; the host enforces
  the roles as well. The host assigns one session per user and document and passes it on every load; a bridged client
  never mints a session or writes the `session` view key (§7.4). **Bridged load verification.** Load verification
  (§2.9 step 3) runs while the client's user edits; on a mismatch only an `owner` client may keep the saved town (a
  `rebase` sent like any event; J-DET-42); every other client takes the replayed town for its own working state,
  reports the mismatch, records its root at `h₀` and keeps the `doc.load` bytes (≤ 3 MB at CITY, §2.9's size budget;
  counted in §12.8) until the mismatch is settled or its session ends; when the owner's `keptSnapshot` rebase arrives it
  installs the saved town from them and re-applies the events after `h₀` (the install mechanics: §2.9 step 4); under
  §6.2 (iii) its comparison of its own root with the owner's `stateDigest` waits for its load's recomputation, a client
  still verifying stops, and a client that loads after the owner's choice takes the saved town as its base without
  asking — so every client converges on the owner's choice.
* **Logging (LC-31).** Every model change over the bridge is a `doc.apply` of `EditEvent`s, logged one to one — a host's
  own commands with `author: 'host'` (§7.1's `EditBase`); no bridge command changes the model any other way. Undo and
  redo are `EditEvent`s (§7.4): they travel as `doc.changed` and `doc.apply` like any other event, the envelope's
  `session` is their `EditBase.session`, and a client never truncates a bridged log. A provider output refused at §2.9's
  cap returns the requesting edit as `doc.rejected { reason: 'invalid', conflicts }`.

### 11.4 Host inputs (DEF-11)

A host may supply input only through these doors: (1) blueprint fields — seed, rung, population, intent, the district intents (`districtIntent`, §7.7 layer 2),
circumstances, assignments — to `generate`; (2) edit events through the API or `doc.apply`, which are logged — a dossier change arrives as such events with
`author: 'host'` and `EditBase.dossier` set (§7.1), in the host's order, and mutates the current map under §7.7's dossier
contract (items 20, 22); a dossier's designation of a place as `local` or `secret` is one such input
(`Assignment.knownTo`, §7.7, which §9.2's label policy reads), and the module never writes to the dossier (§11.3's
*One way*); (3) tables,
presets and styles as `editTable`, `editPreset` or `setStyle` events, whose content is copied into the document with
provenance `host` (source, date, version), so the document replays without the host; (4) a `ContentProvider` (§14)
registered by `registerProvider` (§11.2) — the embedding page's own call or a script's, the bridge carrying data and never
code (§11.3; item 21 (d); J-A85.83) — accepted only after a **double-run check** (at registration it runs twice on the same input and stream; the two
outputs must be byte-identical, else it is refused), with every output it produces for a document recorded in the
document's `hostContent` block, keyed by (provider id, version, input hash), and read from there on replay; an output
that would pass §2.9's cap on pack data and host content is refused at the call as §2.9 states. So a document never needs
its host to replay, and host code — which the model packages' lint (§6.5) cannot reach — is made deterministic by the
check and the record.

**A dossier comes through the port (items 73–87; §14).** For a dossier, door (1)'s blueprint and the log's creation
prefix, and door (2)'s events and epochs, are produced by `@plat/port` (§14, item 73): the host passes the whole dossier
and, when it has them, the optional fields of `HostContext` — the week, the realm block, the audience, display names, the
product line — and nothing else; SettlementForge's map comes through doors (1) and (2), which the port produces;
door (3) stays open to it as to any host — logged table, preset and style events over the bridge — and door (4) is the
in-page embedders' and scripts': `registerProvider` loads a provider's code into the module's workers, while the bridge
through which SettlementForge's configuration speaks — the module in an iframe on its own origin (§11.3) — carries data
and never code (J-A85.83). The port's refusals by population and its routing to a registered village product are §7.7
item 15's and §1.1's (item 81; file f item 202); §1.1's clamp serves only a request that carries no dossier. Door (2)'s
events carry §7.7 items 12–13's binding key and change envelope (items 74, 75), dated and grouped into epochs by §4.11's
week and cadence.
**Optional only (item 20 (h) (iv); J-A20.79):** every field these doors accept beyond what the dossier holds today is
optional — a stable id, a location hint, a class; whatever the dossier does not give, the map derives by §7.7's
derivation table; no door, message or report asks the host for a fact. What a host's data the module never reads is
§7.7 item 1's list (item 86), and the port's adapter reports every key it dropped. A host's own undo arrives as a
dossier change like any other and converges by the solver's order; the port's report names the earlier absorbed state
the dossier now equals, `state_matches_absorbed` (§7.7 item 5; item 87). **No door opens the other way (owner, J86 Q2;
J-A73.81):** the host's simulator never reads the map's geometry — the module writes no geometry, layout or district
read for the host (door 1 stays closed); because the map follows purely from its seed and the ordered dossier history
(§7.7 item 6), opening it would need no redesign, and it opens only on the owner's explicit word. **The export bundle
(V08 Q3: J122; V08-XCONF-5).** From M-SF the host client gains one call returning the user's chosen scene exports
(§11.1's `.dd2vtt` and Foundry scenes, rendered at the export's knowledge tier and admitted by the calling key) as
opaque byte blobs for SettlementForge's export bundle, which SettlementForge packages unread; before M-SF maps export on
their own. No call returns a structured format — the bundle call returns opaque blobs only — so door 1 stays closed
(J86); V08 §5.4 states the call and V08 §7 its test. The port's wiring to a live host bridge is built with the
SettlementForge stage (SF0–SF7, V08 §8); the port itself is §14's, its creation half built at M1 and its absorb half at M3a (§16).

### 11.5 Sharing and multi-client use without a hosted service (DEF-12, COV-FTG-N07)

* **Decision:** the product contains no hosted service. For multi-client use a host — a VTT module, a web page, or
  SettlementForge — is the store (§11.3) and owns accounts and access (J-R15, J-R16); SettlementForge's accounts, plans,
  save limits and backups follow its own decisions, read as inputs (J121; V08 Q2).
* `interface DocResolver { resolve(ref: string): Promise<ArrayBuffer>; publish?(bytes: ArrayBuffer, access: 'private'|'link'|'public'): Promise<string> }`
  is configured by the embedding app. `&doc=<ref>` links are produced only when a resolver with `publish` is configured;
  otherwise the app offers the `.plat` file and, for a small edit log, the inline compressed log of §6.4. Access levels
  are the resolver's; the reference app ships a file resolver (local files and inline logs) and no network resolver.

### 11.6 Edges (principle (11))

| id | mechanism at its limit | defined outcome and rung | test |
|---|---|---|---|
| T-ER-19 | every format (§11.1) at every rung, THORP to the cap; degenerate geometry (none in the model, §3.1; faces written without antennae, §3.6 (6)); the `.dd2vtt` scope over 8 192 px | each row's mapping; a larger VTT scope split into a grid of scenes or the pixels per square lowered (≥ 50), the dialog showing the choice | each format at THORP, TOWN, CITY, the METROPOLIS target and the cap: validators pass, sizes within §12.7 and §12.8 |
| T-ER-20 | the API's caps (§11.2): a page over 64 KB, more than 1 000 fates, 256 created addresses, 50 effects, three alternatives, three variations; every rung | paginated (`query` pages, `fates` pages); the counts beyond the first given (`effectsMore`); the API identical at every rung | a scripted client at each rung: every list complete across its pages, the counts correct |
| T-ER-21 | host inputs (§11.4): a host passing nothing beyond the dossier; one event; a provider output over §2.9's cap; contradictory dossier data; every rung; save and replay | derived by §7.7's table; applied as any event; refused as `doc.rejected { reason: 'invalid' }`; §7.7's contract; the port's refusals and routing (§7.7 item 15); door (3)'s events replay without the host | a host fixture of each: the document replays byte-identically without the host; the refusals as stated; a provider failing the double run refused `nondeterministic` |
