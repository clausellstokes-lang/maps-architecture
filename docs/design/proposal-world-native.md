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
bridge and the one-shot capture are retired in favour of one versioned, one-way world port; the host's frozen spatial
digest stays the host's engine state, built by the host from the port's canon at its receipted canonize (every new campaign's birth canon, or a re-canonize), and every
existing campaign's digest is kept forever (`research/sf/fp-realm-review.md` J-RR.1, J-RR.45). Existing FMG maps are imported once as data through a version-pinned adapter. Nothing of FMG's
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
its cell-count-dependent decay and its exponent-as-unit do not. *Added 2026-10-23 (the owner's rule F1; file r;
V13 §3.2.1):* a world may begin with a **formation op** — a scenario row (a young collision range, a rifting
interior, an island arc, an old shield, a rifted coast) run once on its own grid: crust blocks and uplift, a
steady-state stream-power erosion to a fixed point, talus, glacial carve, two sea-level stands and soils — whose
results are baked as content-hashed fields the recipe's later operations edit like any other; the block model is
deleted at the bake and the op is never re-run, under any later version. The templates stay as the authored path.

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
tables where geology says so; springs are where it meets the ground. Erosion is the formation op's steady-state
stream-power fixed point over this same flood-and-D8 core, once at generation and baked (2026-10-23, F1; superseding
"no erosion model; a single deterministic stream-power pass is optional later"); a later `weather` op runs a bounded
number of implicit steps once, on a side copy, and is carried by its commit. A seasonal pair of surfaces (dry, wet) comes from the climate seasonality
curve.

### 3.5 Climate and biomes
Temperature by latitude band and a lapse rate on the coarse raster, in tenths of a degree, with explicit pole
temperatures as boundary inputs and a derived seasonal curve (mean, amplitude, phase) per cell as part of the climate
contract, since the host's calendar and the brief's seasonal water states both read it. Precipitation by a
moisture march along an arbitrary wind vector with orographic drop, coastal bonus and evaporation from water, in
millimetres per year, seeded and clamped. Biomes from a configurable moisture-by-temperature matrix with overrides,
as a typed land-use class carrying habitability and movement cost as editable attributes. Vegetation and relief
decoration are render-time derivations from slope, altitude and biome, never data. *Added 2026-10-23 (F2, F4; file
r; V13 §3.4–§3.6):* the climate is **monthly** — twelve values per coarse cell from the belts' seasonal shift, a
thermal term over large land (a monsoon; a world-context knob below the continent rung), the maritime fraction by
upwind fetch, the march run once per month, and the ocean currents by a gyre solve per basin with the coastal
anomaly they bring; a relief edit re-runs the whole march, so a raised range dries its lee however far. The biome
is a published climate-class scheme mapped to **potential natural vegetation** (the matrix kept for annual
imports); what grows at a week — fields, pasture, coppice, fallow, regrowth, a burn scar — is **land cover**, a
derived layer folded from potential vegetation and the campaign's dated facts (populations, razings, plagues,
abandonments, the DM's disturbances) into a cover cache outside every digest, read by no stage. Sea legs are priced
by direction, month and vessel from the winds and currents, the host offered them and their mean behind its own
switch, its lanes unchanged until it adopts them. The DM's two verbs reach every physical layer: an always-so paint is an override the physics derives against;
a this-happened disturbance recovers; a physics pass re-derives, releases or weathers a region on a side copy. Every
run is one requirement solver — the pipeline itself, each stage meeting the rows it can and verifying as it goes,
one bounded back-step — so a request "a desert the size of a province", or a campaign's own settlements included,
is met by causes, never painted first; the generation surface is a world generated first with every option random,
set or locked; a change that would contradict a placed settlement's dossier asks before it commits, and a dossier
changes only by the host's own command on the map's request.

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
Two partitions (refined 2026-10-17, `research/sf/fp-realm-review.md` J-RR.48, J-RR.49): the seat territory — every
reachable land cell to the seat cheapest to reach under the host's cost law, no budget, frozen with the host's
distances — and the sway, the host's political facts (tiers, prosperity, links, relations, occupations, culture
distances) projected over the terrain with a reach bounded but exponential in tier, a debatable land between
adversaries and unclaimed land left wild; normalized borders, poles of inaccessibility for labels, neighbours.
Provinces only on a standalone world. Culture resists through the host's own culture distance, never a cost profile.
Religions, states' diplomacy and forms, military, zones, the economy cycle and lore are not generated here. The host's
relations, vassal links and military strength are the political facts the sway and its patrols project (V13 §3.9);
the other lenses draw them only as the host's own links and dated events between settlements (V13 §5.9); the spatial
footprint of its religions, its economy cycle and its other simulated systems is drawn by V13 §5.8's lenses over the
facts the host sends — never projected by the sway, which reads of them only the prosperity rung and the culture
distance, as reach and resistance — and never generated (J379, J380, J384).

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
temperature and evaporation; the water-table field; biome and vegetation; resource sites; the seat territory (the host's own
meaning of territory) and a political snapshot read once at the placement (culture for names; never re-emitted by a
border revision); roads crossing the edge as forced gate picks toward the next settlement along them. Which facts win is
the placement's stamp: on a frame generated from the world, the dossier, then the DM's locks, then the charter's boundary
facts, then tier priors; on a frame that predates its placement, the dossier and the frame whole, the world reading
only as derived readings (`research/sf/fp-realm-review.md` J-RR.24, J-RR.25, J-RR.30; V13 §2.2, §3.11.5). The frame's S1 takes this as its input record and refines inside it; today S1 invents these from its own
parameters, which is the model-level M0 gate row already identified.

## 6 What the host must change (superseded 2026-10-17)

The eight items that stood here are superseded by V13 §8.5, the design's one host-change list (H1 – H30): the ordered
list of `research/sf/fp-realm-review.md` §5 (H1 – H21) was carried into it and is itself superseded by it (a dated
bracket there, 2026-10-17), and amendments n (`docs/AMENDMENTS-2026-10-17n.md`, items 817–818) restored the clauses
the carry dropped and added the lens asks and a native world canonized at birth (H22 – H30). The old items map: 1 → H4, H5 (the port replaces the capture, never the
frozen digest, which stays the host's engine state); 2 → H11 (the per-settlement water verdicts sent as constraints) and
V13 §3.11.6's charter; 3 → H12 (genesis at world birth; the render tier's roads retired); 4 → H5, H18, H19 (world points
for the host's cell-keyed facts, translated once under a confirmed capture); 5 → H11 (the lake and climate laws
re-versioned over the settlement's physical record); 6 → H14 (a world-first settlement's access word and its terrain word from its charter, the terrain-agreement notice
retired, its role taken by `refuse.charter.dossier`; existing configurations canonical); 7 → H18, H19, H20 (the transition in phases 0–5: capture first, import on request,
an elective rebase, retirement with every frozen digest kept — never a forced migration under a geometry bump); 8 → H21.

## 7 Import adapter for existing FMG maps

Canonical input is FMG's full JSON export, read by two pinned adapter folders: 1.114 for the host's own fork's
export (the host's whole estate, read once per snapshot) and 1.152 for users' files; both carry the grid-to-pack link;
a `.map` below 1.152 is refused with the nearest supported version named, never migrated by reimplementing FMG's chain.
The unit is read per file (FMG's unit follows the browser locale), the extent is never rescaled silently, and one
stated y-flip transform maps pixels to world centimetres (`research/sf/fp-realm-review.md` J-RR.43). Mapping: grid heights by the saved exponent to metres against the
datum; lake features to surface records; rivers to reach records keyed by FMG id with geometry re-derived; flow and
accumulation recomputed; routes to the graph; on a user's file, burgs to standalone seats with their Watabou flags as provenance and states to allegiances; on the
host's own snapshot, burgs, states, provinces and cultures are dropped as inputs (the campaign's settlements arrive
as the host's placements; a culture the DM never authored never steers a border); religions are the host's; climate rasters kept;
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
| A heightmap template as the only way a world's ground arises | kept for authored control; joined (2026-10-23, F1) by the formation op's scenarios — a scenario is an option of the world dialog, `none` by default (the authored path, which the one-click world takes); when asked, tectonics and erosion run once and are baked, never re-run (V13 §3.2.1, §3.1 (1)) |

## 11 Phasing

1. Before M0 commits: the S1 input record (the charter), the carve delta, the address namespace (gate rows).
2. World volume design after M0 (with the sites volume, sharing the charter).
3. Build W1: terrain, water surfaces, hydrology, climate, biomes, suitability, the charter output; the port.
   Build W2: routes and siting with the host's cost law; political materialization. Build W3: labels, exports,
   the import adapter, retirement of the fork. World-scale editing and history ride on the existing edit model.
4. (2026-10-23; the owner's rules F1–F9; V13 §8.2's M-W6 – M-W9.) Build W6: the requirement solver, the
   generated-first dialog, the conflict list and the dossier request. Build W7: the formation op and the monthly
   climate with its currents, gated by their spikes. Build W8: land cover and the physics pass, the weather depth
   last. Build W9: sail routing. Ruins by settlement age are the base's own, at generation only.

## 12 Owner questions

1. The boundary: this proposal assumes option (a), the host owns political facts and the map module owns the world
   regime, with the host's capture replaced by the port and its frozen digest kept as its engine state. The audit supports it: the host already treats the map as an
   engine input and wants a frame stamp it refuses to invent.
2. Planar bounded worlds now; wrap or sphere later or never.
3. Ruled 2026-10-17 (`research/sf/fp-realm-review.md` J-RR.45, J-RR.46; V13 §8.5, §11 Q1): neither — existing
   campaigns keep their frozen digests forever, are imported on request and drawn with no write, and may elect a
   receipted rebase; what remains the owner's is whether to offer that rebase.

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
