# Proposal — the native world regime (replacing the FMG integration)

Status: a design proposal written by the session on 2026-10-16 from the FMG survey (`research/fmg/notes/*.md`, ten
researcher notes, the blog and Patreon corpora read in full once the network admitted them; `research/fmg/FMG-survey.md`, the synthesis) and the SettlementForge host audit
(`research/fmg/notes/sf-host-fmg-integration-audit.md`). It is the "FMG/world proposal" column of the decision matrix
the owner's brief of 2026-10-16 requires, and an input to the world-and-sites design volume. It is a research-side
document: implementer seats do not read it; the design volume restates what it adopts. Every mechanism below is
described in our own words; no FMG code, data table, palette or name list is reproduced or to be ported. Evidence
labels follow the program's rule: CONFIRMED (read in source or a host document, cited in the notes), PLAUSIBLE
(the session's inference), or an owner question.

## 0 The decision in one paragraph

SettlementForge's world generator becomes native: a world regime owned by the map module, in metres on a raster plus
a graph, whose physical facts (terrain, water surfaces, hydrology, climate, biomes, resources, distance fields,
suitability) are canonical world state; whose political facts (factions, cultures, settlements' existence,
institutions, events) stay the host's and are only materialized; and whose output to every settlement frame is a
boundary record the frame refines, so that a town's river is the world's river. The vendored FMG fork, the iframe
bridge, the one-shot capture and the frozen spatial digest are retired in favour of one versioned, one-way,
derived-facts port. Existing FMG maps are imported once as data through a version-pinned adapter. Nothing of FMG's
rendering, save format, cell mesh, economy, military, religion, zone or assistant machinery is carried over.

## 1 What the survey established (CONFIRMED unless marked)

1. **What FMG is.** A decade of accreted features on a Voronoi cell mesh: a jittered lattice grid repacked into a
   land-and-coast mesh; heights as 0–100 with sea level at 20 and metres by an exponent that also feeds temperature
   and evaporation; climate by latitude bands and a wind march; rivers by iterative depression relaxation and
   single-flow descent with a flux threshold; lakes open or closed by inflow against evaporation; a 5×26 biome
   matrix; then cultures, burgs, states, provinces, religions, routes, military, markers, zones, an economy, journeys,
   labels, emblems and an in-page assistant, in a declared pipeline (`fmg-physical-pipeline.md`, `fmg-human-layers.md`).
2. **Its two primitives.** Spaced greedy placement over a suitability score, and budgeted typed-cost floods. Nearly
   every human layer is one of the two (`fmg-human-layers.md` §5).
3. **Its weaknesses are stated by its author.** The save format is "a stack of accidents" of positional slots with
   about fifty-five ordered migrations; the data model is "poorly defined, inconsistent"; graphics are SVG with "no
   room for improvement"; locked entities are renumbered on regeneration; eighteen editing paths leave derived data
   stale; determinism bugs were still being found in 2026; there is no groundwater, no datum, no history
   (`fmg-data-model-and-io.md`, `fmg-editing-and-rendering.md` §7, `fmg-releases-and-changelog.md`).
4. **Its direction.** "FMG 2.0" is an incremental refactor to a single state object with deterministic generators and
   a preserved file format, not a rewrite; the most-wished capability in its community is history and war
   simulation, triaged "too broad"; level of detail is "not planned" (`fmg-roadmap-and-ecosystem.md`).
5. **What SettlementForge does with it today.** The host vendors the built output of upstream v1.114.2 with a
   rebuilt bundle whose modified source is not in the repository; runs it in an iframe in a geography-only mode;
   talks to it over a typed postMessage bridge; takes a one-shot capture of a few cell arrays; freezes an integer
   spatial digest that stores no cell coordinates; and places settlements in a nominal box the host refuses to
   trust as a frame. **No settlement generation input comes from the map**: terrain type is minted from
   trade-route access or a random pool, and map facts enter only afterwards as an advisory agreement check. The
   host's own documents call the map a first-class engine input, keep the integration deliberately small, flag the
   fork as a risk, and nowhere state an intent to replace FMG (`sf-host-fmg-integration-audit.md` §4–§7).
6. **The author's own boundaries and refusals** (`fmg-patreon-posts.md`, `fmg-blog-history.md`). He refused to build
   a city generator and kept Watabou's generators as the city layer by a deliberate seven-year decision; he tried "a
   full economical simulation" and dropped it; the economy's one-good-per-cell granularity was chosen for cell size
   five years before it shipped and reader critiques of the single-cycle economy went unanswered; authored rivers are
   "responsibility of users", unvalidated against heights; the retreat of data out of the drawing began in 2021 with
   rulers and rivers; heightmap generation was budgeted at about 300 ms, which is why tectonics were rejected; the
   2017 biome and wind-marched precipitation models were fully stated in the blog and deployed only in 2019.
7. **The ecosystem expects four surfaces**: an FMG-shaped full JSON, GeoJSON with FMG's property names, reading of
   `.map` files, and a raster heightmap image (`fmg-roadmap-and-ecosystem.md` §5, §7).

## 2 Principles the design is held to

- One truth. The world regime's physical facts are canonical; the host's political facts are canonical; the map at
  every scale is derived from both and never writes back except through the port as derived facts.
- Causality over decoration. Every physical fact carries its derivation; every political materialization carries
  the host fact it realizes.
- Derive before invent, at every scale. A frame takes its boundary from the world; a world import takes what the
  file says and derives the rest; a host constraint (a settlement is riverside) is satisfied by the materializer,
  never contradicted and never silently ignored.
- Addresses outlive regeneration. Nothing is renumbered; authored edits are deltas over a regenerable baseline with a
  validity check; locks are per field.
- Determinism by construction. Per-stage seeding from the world seed and the stage name; frozen option snapshot;
  a version table; no randomness in comparators; position-keyed noise for sub-cell detail.
- Nothing from FMG's rendering or storage is a model. Data is typed arrays and records; SVG is an export.

## 3 The world model

### 3.1 Frame, units, placement
Planar and bounded, in metres, with integer-centimetre storage where the kernel will consume it. An optional
equirectangular latitude box exists only for climate. A world holds placements: each settlement frame and each
free-standing site is an arena set positioned in the world by a placement record (origin, bearing); moving a
placement changes no arena digest. A sphere or seamless wrap is not foreclosed by the raster (PLAUSIBLE: an owner
question for later, requested by FMG's community, out of scope now).

### 3.2 Terrain
Two rasters with a fine-to-coarse index map: a fine elevation raster in integer centimetres above the datum, with
bathymetry negative and a declared elevation cap, and a coarse climate raster. Resolution is chosen per world size,
with extra resolution near coasts and rivers supplied by the settlement frame's own refinement rather than by a
repack. Terrain is authored by a declarative recipe: a resolution-independent operation set in metres (hill, pit,
range, trough, strait, mask, invert, add, multiply, smooth, noise, image import with an explicit tone curve), each
operation seeded, previewed before commit, stored as the world's authoring history. FMG's template idea survives;
its cell-count-dependent decay and its exponent-as-unit do not.

### 3.3 Water surfaces as records
The sea is the datum. Lakes are records with a spill-height surface, an open or closed flag from inflow against
evaporation, a subtype rule (frozen, salt, dry) and an outlet. River reaches are records with a stage profile.
Every surface record can carry a date, so the world holds a list of dated surfaces and the present is the latest
(the historical-water-state requirement of the brief). Surfaces are never carved into terrain; the riverbed is
terrain and its carve delta is kept.

### 3.4 Hydrology
The same priority-flood and D8 implementation the site package already has, run at the world cell size with an
epsilon gradient on flats, so sinks never remain unresolved and every land cell has one outlet. Features by flood
fill: ocean touches the border, a basin whose fill depth exceeds a threshold is a lake, a saddle within a breach
tolerance of sea level is breached. Accumulation becomes discharge in cubic metres per second from precipitation
minus evaporation over area; the river threshold is a discharge; width per vertex by hydraulic geometry; mouths
typed by archetype (delta, estuary) from slope and discharge; off-map exits carry an explicit downstream head; lake
inlets and outlets are graph edges; navigability is a discharge threshold. Groundwater is a derived field: the
table rises inland from the nearest surface by a recharge-and-permeability rule, capped by terrain, with perched
tables where geology says so; springs are where it meets the ground. No erosion model; a single deterministic
stream-power pass is optional later. A seasonal pair of surfaces (dry, wet) comes from the climate seasonality
curve.

### 3.5 Climate and biomes
Temperature by latitude band and a lapse rate on the coarse raster, in tenths of a degree, with explicit pole
temperatures as boundary inputs and a derived seasonal curve (mean, amplitude, phase) per cell as part of the climate
contract, since the host's calendar and the brief's seasonal water states both read it. Precipitation by a
moisture march along an arbitrary wind vector with orographic drop, coastal bonus and evaporation from water, in
millimetres per year, seeded and clamped. Biomes from a configurable moisture-by-temperature matrix with overrides,
as a typed land-use class carrying habitability and movement cost as editable attributes. Vegetation and relief
decoration are render-time derivations from slope, altitude and biome, never data.

### 3.6 Distance fields, suitability, resources
True distance transforms to shore and to river in metres. A pluggable suitability score (habitability, discharge,
lowland, coast type, resource bonus) as the root input of every placement, exposed to the host with its weights.
Resource sites placed by a distribution expression over physical fields with caps and deterministic thinning; the
catalogue of goods is host content.

### 3.7 Routes
A neighbourhood graph (Urquhart over the Delaunay of settlements) per landmass, with primary settlements joined
first and the rest by trails; Dijkstra over a cost surface whose law is the host's existing one (the host already
ported its own cost law and is the authority for it); ports are "the final reachable water body" so river towns
share the sea network; sea routes follow navigable reaches. Routes are stored as polylines plus a graph keyed by
stable ids, and they exist before any connectivity-dependent fact is computed.

### 3.8 Political materialization
Territories grown by budgeted typed-cost floods from host-supplied seats with host-supplied cost vectors, then
normalized borders, poles of inaccessibility for labels, neighbours. Provinces the same inside a territory.
Cultures as cost profiles the host supplies. Religions, states' diplomacy and forms, military, zones, the economy
cycle and lore are not generated here; where the host wants their spatial footprint, the same flood serves.

### 3.9 Settlement siting and the settlement-map record
The host decides a settlement exists. The engine proposes and validates sites by two-stage scoring (geographic
suitability, then economic suitability once routes exist) with spacing and port promotion, and returns the
settlement-map record the settlement frame consumes: geography computed by the engine (water adjacency, estuary
or passing river, sea side, arable hinterland, connectivity, elevation, biome, climate band) and institution facts
owned by the host (citadel, walls, plaza, temple, shanty, population). This generalizes FMG's burg-to-city-generator
handoff and matches what the existing V08 port already takes.

### 3.10 Markers, labels, notes
Point-of-interest candidates by physical predicates; content from the host. Labels as groups with zoom extents and
a deterministic spread solver, presentation only. Notes as fields on entities, never a side table.

## 4 Identity, determinism, editing, history

- Id-keyed records with surrogate keys (world id, kind, id); cell identity anchored to the deterministic source
  lattice; no positional ids, no tombstones, no renumbering of locked entities.
- Per-stage seeding; a frozen snapshot of the options that generated the world; a version table naming the
  generator, the tables and the format; a declared pipeline with per-step timing from which erase-and-regenerate
  slices are derived, never maintained as parallel lists.
- Authored edits are deltas over the regenerable baseline with a validity check against the baseline they were made
  on, and an authored river or water surface is validated against the canonical heights at authoring time with a
  receipt, never accepted unchecked as FMG does; locks are per field; an edit is a transaction with before-and-after rows, a staleness check, apply, undo and
  redo, which generalizes the only true undo FMG has (its assistant's proposals) into the universal edit path.
- Dependency-driven invalidation: what changed decides what recomputes; FMG's eighteen stale-data paths
  (`fmg-editing-and-rendering.md` §7) are the anti-checklist, each one a test.
- Terrain and water edits take one of two verbs, "this happened" (a dated record, traces kept) or "this was always
  so" (a retcon, descendants re-derived), previewed on a forked world and committed whole.
- Time: the host's world clock is the clock. The world regime stores dated physical facts (surfaces, terrain
  events); political history is the host's.

## 5 The boundary record a settlement frame receives

A charter per frame, persisted beside the frame's seed and placement: the frame in integer centimetres; the datum;
an elevation profile along each edge; which edges touch water, with the water body's id and level; for every river
crossing the boundary, the crossing point, direction, discharge, width profile, bed and stage, basin id and
navigability; the downstream head for off-map drainage; roads entering with their class; annual precipitation,
temperature and evaporation; the water-table field; biome and vegetation; resource sites; territory and culture
ids. The frame's S1 takes this as its input record and refines inside it; today S1 invents these from its own
parameters, which is the model-level M0 gate row already identified.

## 6 What the host must change (from the audit)

1. Replace the iframe, bridge, capture and digest with the port: the world regime runs in the map module, and the
   host receives derived facts (per-settlement cell, coast, river, port truth, biome, climate band, elevation,
   territory, gates, distances, routed polylines) through a versioned one-way port, keeping the digest's immutable
   canon-version semantics as the port's versioning.
2. Add the per-campaign map charter (§5) and emit river and coast requirements per settlement as constraints.
3. Stop routing in the iframe; consume routed polylines and the genesis network from the port.
4. Persist coordinates; drop live-pack reads in territory and autoplacement layers.
5. Re-version the biome and climate vocabularies, or have the port emit the host's current ones.
6. Flip the coherence direction for new campaigns: settlement terrain inputs derive from the world. For existing
   campaigns the frozen settlement config stays canonical ("genesis is sacred") and the world is fitted to it: a
   riverside settlement gets a river, a port fronts the sea, exactly as the existing port satisfies dossier
   constraints today. The advisory terrain-agreement toast becomes a hard contract or a receipt.
7. Retire the fork, its content-security policy, separate origin, hash manifests and validation gate; migrate the
   existing snapshot blobs through the import adapter (§7) under a declared geometry-version bump.
8. Settle the audit's unknowns: where the modified upstream source lives; the missing design documents; the
   production frame size; whether any snapshot was saved under another version.

## 7 Import adapter for existing FMG maps

Canonical input is FMG's full JSON export (version-pinned, at least 1.152, carrying the grid-to-pack link, the
geometry and all entities); `.map` files are accepted by open-and-resave in FMG, never by reimplementing its
migrations, which need the live application. Mapping: grid heights by the saved exponent to metres against the
datum; lake features to surface records; rivers to reach records keyed by FMG id with geometry re-derived; flow and
accumulation recomputed; routes to the graph; burgs to host settlement facts with their Watabou flags; states,
provinces, cultures, religions to host political facts rasterized through the grid link; climate rasters kept;
mesh geometry, SVG, styles, layers, overrides, relief, ice, economy dropped; the creation timestamp, version and
seed kept as provenance. Integrity repairs as FMG applies them at load; tombstones skipped; the loss reported
(`fmg-data-model-and-io.md` §7).

## 8 Export compatibility

An FMG-shaped full JSON export so the Foundry importer and converters work unchanged; GeoJSON of cells, routes,
rivers, markers and zones with FMG's property names; a 16-bit heightmap image; CSV tables; plus the existing SVG,
PNG, GeoJSON, VTT and 3-D exports of §11.

## 9 Rendering and performance

Render from data (canvas or WebGL) with SVG as an export; styles as a schema-validated store with declared effects
and presets; viewport reconciliation with overscan and zoom curves; level of detail by settlement tier designed in
from the start; relief by rules at render time. Budgets per regime as the design already sets them for settlements.

## 10 What is rejected from FMG, with the reason

| Rejected | Reason |
|---|---|
| The Voronoi repack as truth | invalidates every index on regeneration; the raster plus the frame's own refinement gives the resolution where it matters |
| Heights 0–100 with an exponent as a unit | couples display to physics; metres against a datum instead |
| Carving rivers by cosmetic downcut | the carve delta is kept and the bed is physical |
| The positional save format and its migration chain | its author is replacing it; versioned JSON with typed migrations from day one |
| Renumbering locked entities | breaks persistent addresses |
| Per-controller redraw lists, direct state mutation, session-only undo | the sources of its stale-data paths |
| SVG and DOM as state | the author's own 2026 work is undoing it |
| In-page execution of model-written scripts | the policy page documents the risk; the clerk uses typed tools |
| States' diplomacy and forms, religions, military and battles, zones, the economy cycle, lore | the host owns them |
| Ice, relief icons, ocean rings as data | render-time derivations |
| Presentation-only 3-D | the design's 3-D export is from the model |
| Coastline fractalisation as geometry | a view-time displacement of a canonical outline; kept as a renderer detail layer with position-keyed seeds, never as canonical geometry |
| Authored rivers accepted unchecked | validated against heights at authoring time with a receipt |
| Depopulating port-less islands as a siting rule | a 2017 expedient; islands get routes or stay sparse by the suitability score, not by fiat |

## 11 Phasing

1. Before M0 commits: the S1 input record (the charter), the carve delta, the address namespace (gate rows).
2. World volume design after M0 (with the sites volume, sharing the charter).
3. Build W1: terrain, water surfaces, hydrology, climate, biomes, suitability, the charter output; the port.
   Build W2: routes and siting with the host's cost law; political materialization. Build W3: labels, exports,
   the import adapter, retirement of the fork. World-scale editing and history ride on the existing edit model.

## 12 Owner questions

1. The boundary: this proposal assumes option (a), the host owns political facts and the map module owns the world
   regime, with the digest replaced by the port. The audit supports it: the host already treats the map as an
   engine input and wants a frame stamp it refuses to invent.
2. Planar bounded worlds now; wrap or sphere later or never.
3. Whether the host's existing campaigns are migrated (import adapter and geometry-version bump) or frozen on the
   fork until they end.

## 13 Decision-matrix rows contributed by this proposal

| Question | Existing architecture | This proposal | Site proposal | Reconciled decision | Reason |
|---|---|---|---|---|---|
| Where does the world regime live | map module takes a dossier; no world | map module, `@plat/world` beneath site | pending | map module, with the host owning political facts | one hydrology implementation, one datum, one port |
| Terrain representation at world scale | cm heightfield per frame | raster in cm against a datum, coarse climate raster | pending | as proposed | reuses the site hydrology code unchanged |
| Water surfaces | implied by terrain and datum | explicit dated surface records | pending | as proposed | sea-level and lake changes without re-terraining; history |
| Groundwater | nearest water body's surface | derived field with springs | pending | as proposed | wrong in valleys today; needed by sites |
| Frame inputs | S1 invents them | the charter | pending | as proposed | world-to-town coherence |
| Routes cost law | destination-driven roads in town | the host's cost law at world scale | pending | as proposed | the host is the authority for its law |
| Settlement siting | dossier says where | engine proposes, host decides | pending | as proposed | demand is the host's, geography the engine's |
| FMG | an integration hook | retired; import adapter | pending | as proposed | the survey's verdicts, every one with a reason |
