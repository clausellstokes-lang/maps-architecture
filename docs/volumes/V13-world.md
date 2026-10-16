# Design volume 13 — The world: the world regime, placement and hydrology

> PENDING FABLE REVIEW — written by the session's architect seat volumes/architect-V13 under the owner's delegation (J339; the owner, 2026-10-16: "i defer all decisiosn to you"); covered by the whole-design retrovalidation (J84).

<!-- PROGRESS ledger (the writing lane's own; removed at landing's revision)
0 In plain words — done
1 Scope, hooks, owner rules, out of scope — done
1b Wiring table — done
2 Data model — done
3 Generation — planned
4 Editing — planned
5 Rendering, labels, exports — planned
6 Performance budgets — planned
7 Tests and acceptance bars — planned
8 Build plan — planned
9 Decisions — planned
10 Base change requests — planned
11 Owner questions — planned
12 CONFIRMED versus PLAUSIBLE — planned
13 Fix list — planned
Integration notes — planned
-->

**How to read this volume.** It builds, to implementation depth, the subject the base (`docs/ARCHITECTURE.md`, with files
f and g applied, and file j's items 131–141 as the owner's rules of 2026-10-16: `docs/AMENDMENTS-2026-10-16j.md`) carries
nowhere yet: a world regime of its own, the placement of settlement frames in it, and water as a consequence system at
both scales. The implementer holds the base and this volume and nothing else (§17.1): the three proposals of
`docs/design/` and the research under `research/fmg/` are SOURCES this volume restates in full and cites as evidence
only, never as an implementer's reference. Every fact the base or another volume states is cited, never restated; every
new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n` is a design volume's
section, this one included (`V13 §3.4`); `item n` is an amendment item — items below 200 the owner's rules (items
131–141 file j's), items 200 and above file f's; `J-VI.n` is a volumes-integration decision
(`docs/volumes/_integrate.md`). Decisions are `J-V13.n` (V13 §9), tests `T-V13-n` (V13 §7), base change requests
`BCR-V13-n` (V13 §10). The stage names are the spine's — `W0` … `W9` the world pipeline, `P1` … `P5` the placement
step — and the base's word **site** keeps its base meaning (S1 Site, `@plat/site`); the owner's persistent sites are
**world sites** and volume 14's (`V14`), which consumes this volume's hooks. The owner's words that bind this volume
are quoted in V13 §1.3.

## 0 In plain words

Until now every town this program makes stands alone on a patch of ground it invents for itself: it draws its own
hills, its own river, its own coast, and nothing lies beyond the edge of its map. This volume gives it a **world** to
stand in — a whole region, realm or continent made by the same program from the same kind of seed, with its sea and
its lakes, its rivers running from the hills to the coast, its weather, its forests and deserts, its roads, and the
borders the campaign's powers hold. The town's river is then the world's river: it arrives at the town's edge with the
water the world gave it, and leaves toward the sea the world drew.

**Two scales, one truth.** The world is drawn in metres on a grid of cells, like a relief map; a town is drawn in
centimetres on a flat sheet, as it always was. Each town sits on the world by a **placement** — where its sheet is pinned
and which way it faces. Nothing of the town is redrawn when it is placed or moved: the sheet keeps every address, every
lock and every edit, and only the pin moves. What the world hands down to a town is a short **charter** — the height of
the ground along each edge of the sheet, which edges touch water and at what level, where the rivers cross in and out
and how much water they carry, which roads arrive, how wet and warm the year is, how high the water stands in the ground,
what grows here, what lies under the soil, and whose land it is. The town's own generator reads that charter as its site
and refines inside it, so a town made by the world agrees with the world at its every edge, and two towns side by side
agree with each other at the edge they share without ever having seen each other.

**The other way round.** A town made before its world — as every town made so far was — can be dropped on a world
later. The world then bends itself to the town, never the town to the world: it turns the town's sheet until its coast
faces the world's sea and its river meets the world's river as well as it can, blends the ground in a band around the
sheet so the hills meet without a step, re-runs the drainage there so the town's river finds its way on into the world's,
and says plainly how well they fit and what it had to do. If the spot the game master chose cannot be made coherent — a
port dropped inland — the world offers the nearest spot that can. A port facing the wrong way is first turned, then the
world around it is blended; the town itself is mirrored only if the game master asks for it, with a warning, or the game
master says the world wins, in which case the town re-reads the charter and re-derives its site like a new town would.
Whatever the fit, the things that depend on which way the town faces — where the sun stands, which way the wind blows,
which side is the sea, when the seasons turn — are recomputed from the placement; what the game master has locked stays
locked, and anything that no longer makes sense is reported, never silently changed. The compass is only a drawing.

**Water as a system.** The sea, every lake and every river reach now has a **surface** of its own, a level with a date,
separate from the ground. Raise the sea a metre and no hill moves: the shore moves, a cellar floods, a marsh becomes a
bay, and every one of those changes carries the reason it happened. Re-route a river and the old bed stays as a fact of
the ground with its cause. Under the ground the **water table** is no longer "the nearest river's level": it rises
inland from the rivers and lakes by how wet the country is and what the rock lets through, and where it meets the
surface there is a spring — the first thing a village is sited by. One **test** decides, for any room, cellar, street,
crypt, cave or ruin, whether it is dry, damp, flooded to the knees, flooded to the neck or under water, from one
governing water level against its floor and its ceiling; the same test with last century's level says what it was then,
and with the wet-season level what it is in spring. Every terrain or water change has two verbs: *this happened* (dated,
the old state kept as a trace you can see or delete) and *this was always so* (the past rewritten). You see the whole
consequence of a change on a side copy before you commit it.

**What the world is not.** It does not move continents, erode valleys over ages, simulate currents or wrap round a
globe; it does not run the campaign's wars, trade or religions — the host does that and the world only draws where
those facts fall. Maps made with the old generator can be brought in once as data, and the world can be written out in
the shapes that generator's tools expect, so nothing the campaign already has is lost.

## 1 Scope, the base hooks consumed, the owner rules obeyed, and what is out of scope

### 1.1 What this volume builds

One package, `@plat/world`, between `@plat/tables` and `@plat/site` in §14's chain (J-V13.1; BCR-V13-1), holding the
world regime, the placement step and the water-state machinery, and the base changes those need (V13 §10):

| engine | the base's slot | what it makes | V13 § |
|---|---|---|---|
| **W-BLUEPRINT** W0 | a `ProductDecl` of its own, `world` (§4.12's `products`; BCR-V13-7) | the `WorldDocument`'s recipe: seed, extent, units, the terrain recipe, the frozen option snapshot, the version table | 3.1 |
| **W-TERRAIN** W1 | `TerrainStrategy`'s world form (`WorldTerrainStrategy`) | the fine `WorldRaster.dem` in integer cm against the world datum, the carve delta, the coarse climate raster and the fine→coarse index map; image import with a tone curve | 3.2 |
| **W-FEATURES** W2 | — (new) | ocean and lake features by flood fill, `WaterSurface` records (sea, lakes with spill height, open/closed, subtype, outlet), the coast outline | 3.3 |
| **W-CLIMATE** W3 | — (new) | temperature (annual mean, seasonal curve), precipitation, evaporation, wind on the coarse raster | 3.4 |
| **W-HYDRO** W4 | the site package's priority flood, flats and D8, lifted into `@plat/world/hydro` (BCR-V13-1) | watersheds, `Reach` records with discharge in m³/s, width and depth profiles, mouths, off-map exits, lake inlets and outlets, navigability; the `GroundwaterField` and its springs | 3.5 |
| **W-BIOME** W5 | — (new) | the biome raster from the moisture × temperature matrix, the land-use class per cell, resource sites by distribution expressions | 3.6 |
| **W-SUIT** W6 | — (new) | the pluggable suitability score, two-stage scoring, `SitingProposal` records for the host | 3.7 |
| **W-ROUTES** W7 | `@plat/kernel`'s `delaunay` and path search (§3.1) | `WorldRoute` records: the Urquhart neighbourhood graph per landmass, Dijkstra under the host's cost law, ports as the final reachable water body, sea routes | 3.8 |
| **W-POLITY** W8 | — (new) | `Territory` records by budgeted typed-cost floods from host seats, provinces, normalized borders, poles of inaccessibility | 3.9 |
| **W-LABELS** W9 | §9's label records, S13b's placer | world label candidates and the `SettlementGlyph` with its level table | 3.10 |
| **P-PLACE** P1–P5 | §2.9's `Document`, §2.8's identity, §4.2 S1 (BCR-V13-2 – BCR-V13-5) | `Placement` records, the coherence cost and the nearest lawful placement, the blend band, the local drainage re-run, the `FrameCharter` emitted both ways, the precedence stamp, the mirror edit | 3.11 |
| **H-STATE** the water state | §2.3, §2.4's water-table paragraph, II.6's condition table, V04's closure states (BCR-V13-2, BCR-V13-3) | surfaces as dated records at settlement scale, the frame's groundwater field, flood as a stage on a surface with barrier tops, historical and seasonal surfaces, underground water by connectivity, the water class test as the shared classifier V14 and V04 call | 3.12–3.13 |
| **H-EDIT** the two verbs and the cascade | §7.1, §7.3, §7.4 (BCR-V13-9, BCR-V13-10) | `EditBase.verb`, the trace records, the dependency-ordered cascade, the counterfactual fork, the reason records the clerk reads | 3.14, 4 |
| **W-IMPORT** the adapter | `@plat/port`'s adapter folders (§14) | `FmgImport`: one existing map read once as data, version-pinned, its loss reported | 3.15 |
| **W-PORT** the derived-facts port | §7.7's port, V08's host client (BCR-V13-11) | `WorldPort`: per-settlement derived facts and routed polylines to the host, one way, versioned; the charter per campaign | 3.11.6, 5.4 |
| **W-VIEW** view, labels, exports | §8.1, §8.2, §8.4, §9, §11.1 (BCR-V13-12, BCR-V13-13) | the world map's styles and the glyph levels; the FMG-shaped full JSON, GeoJSON with the ecosystem's property names, the 16-bit heightmap image, CSV; the existing picture exports over the world | 5 |

### 1.2 The base hooks this volume consumes (cited, never restated)

| hook | where | how this volume uses it |
|---|---|---|
| `Terrain` (its `datumCm`, `heightCm`, `hydro`, `flowDir`, `flatRank`, `flowAccum`, `outfalls`, `seaLevelCm`, `wind`, `geology`, `mining`), `HydroGrid`, `TerrainSampler`, `WaterBody` (its `course`, `controls`, `widthProfile`, `depthCm`, `flowFrom`, `flowTo`, `spring`, `bankKinds`, `shoreClass`), `Outfall` | §2.3 | the frame's records the charter feeds and the water state reads; `datumCm` goes behind one accessor and gains its placement derivation (BCR-V13-2); the water bodies gain their `WaterSurface` (V13 §2.2) |
| the hydrology grid's mechanism — the bucket-queue priority flood with exact flats, the two-gradient flat resolution, D8 in the fixed neighbour order, accumulation | §2.3 *The hydrology grid*, *Flats*; §4.2 S1 (3) | run unchanged at the world cell size by W4 (V13 §3.5) and by the frame's local re-runs (P3, the cascade); lifted into `@plat/world/hydro` with its tests (BCR-V13-1) |
| the basement's water table — the nearest body's surface plus a freeboard, else the drainage line's height | §2.4 *Basements* | replaced by the groundwater accessor `waterTableAt` (BCR-V13-3; V13 §3.12.3); the freeboard and the three basement-gate cells stay §10.2's |
| S1's heightfield, coast routine, rivers by descent, the carve capped at `carveMaxCm`, mouths, islands, crossing sites, bank classes, land components, outfalls, resources, the geology flag and mining | §4.2 S1 (1)–(10) | S1 takes the charter as its one input record and refines inside it (BCR-V13-4; V13 §3.11.4): the edge profiles constrain (1), the water edges and crossings (2)–(3), the roads (S3 (4)'s requested bearings), the climate scalars S0's climate row; the carve keeps its delta (V13 §2.2); every other step is unchanged |
| S0's site request, auto features, the sewer feature; `Blueprint` | §4.2 S0 | a placed frame's S0 resolves `coast`, `river`, `lake`, `oasis`, `relief` and `geology` from the charter, never from the feature table (V13 §3.11.4); a standalone frame as before |
| the stage graph, `StageDecl`, `phase`, the tail, declarations read ahead | §4.1, §4.12 | the world pipeline is a product's stage set run on its own document (V13 §3.0); the placement step runs on the world document between the two regimes |
| `ProductDecl`, `StrategyRegistry.products`, `LadderRouter` | §4.12 (item 202), V07 §2.1 | the `world` product registers W0–W9 and P1–P5 (BCR-V13-7) |
| the document, the recipe, the log, view state, the canonical form and digests | §2.9 | the `WorldDocument` is a `Document` whose model is the world's records and rasters (V13 §2.2); the frame's `Recipe.charter` and `Document.worldRef` (BCR-V13-5) |
| identity, lineage, addresses, anchors, carry-over | §6.3 | every world entity's lineage unit and creation key (V13 §2.5); the namespace segment (item 140 M1; V13 §2.5) |
| the RNG, stream keys, the concern registry, fixed-key draws | §6.1 | the world's concerns and stage ids (BCR-V13-8; V13 §3.17) |
| the model digest and the records digest | §6.2 | the world's layer nodes (V13 §2.7); a placement never enters an arena digest |
| edit events, the named actions, the dry-run outcomes, the toolkit binding | §7.1 | the edit kinds of V13 §4 (BCR-V13-9); the verb on `EditBase` |
| locks, pins, declared-means-held, field brushes, the terrain brush's water modes | §7.2 | locks hold geometry, physics decides state (item 137 (c)); the world's recipe ops are declarations |
| locality: the effective scope, the local operators, S1's terrain and water operators, fates, the oracle, closure edits | §7.3 | the cascade's rows (V13 §4.3; BCR-V13-10); the counterfactual fork reuses `forkAt` (§11.2) |
| the lifecycle table, replay semantics, undo, sessions | §7.4 | V13 §2.6's rows and V13 §4.4 |
| migration | §7.5 | the version table (V13 §2.7) and the upgrade of a pre-world document (V13 §4.6) |
| the override layer, editable tables, slices | §7.6 | every table of V13 §2.3 |
| the dossier contract, the derivation rows (DR1, DR3, DR19, DR29, DR40 among them), the port, `HostContext`, the never-read list | §7.7, §14 | the derived-facts port replaces the host's capture and digest and the charter per campaign lands (BCR-V13-11; V13 §3.11.6); DR1's site request reads the charter on a placed frame |
| layers, `LayerSpec`, the lighting model's slab list and sun | §8.4 | the `world` layer (BCR-V13-13); the sun's latitude and bearing from the placement (V13 §3.11.5) |
| style sheets, programs, the `states` rows | §8.2 | the world map's rows (V13 §5.1) |
| the display list, LOD, tiles, zoom stops | §8.1, §8.5, §8.8 | the world map's bands and the glyph's levels (V13 §5.2) |
| labels, candidates, S13b, furniture, the compass | §9.1–§9.5 | world labels (V13 §5.3); the compass derived from the placement (BCR-V13-16) |
| the export formats, the `.dd2vtt` profile, knowledge in exports | §11.1 | the FMG-shaped exports and the world's rows in the existing formats (V13 §5.4; BCR-V13-12) |
| the embedding API, `forkAt`, `Progress`, the reader kinds | §11.2 | the counterfactual fork (V13 §4.5); the world's reader kinds (V13 §4.7) |
| the host bridge, the port's halves, the audience table | §11.3, §14 | the `WorldPort` beside `DossierPort` (V13 §3.11.6) |
| performance budgets, the comfort level, the register | §12.1, §12.3–§12.4, §12.10 | V13 §6's rows per regime |
| the failure principles, the classes, the invariant suite, the report | §5.1–§5.4 | V13 §3.16's ladders in §5.2's form (BCR-V13-18) |
| the test families, B-EDIT, goldens, CI tiers | §13.1–§13.3, §13.8 | V13 §7's bars |
| the package layout and the dependency rules | §14 | `@plat/world`'s place (BCR-V13-1) |
| the build plan and its two totals | §16 | V13 §8 after M-SF, the host's track parallel (BCR-V13-19) |
| the clean-room chain | §17.1 | every FMG mechanism adopted is restated in V13's words with V13's constants (V13 §12) |
| `EpochScope`, the participants, `terrainWater`'s ops, springs over epochs, the history replay | V06 §2.1, V06 §3.12, V06 §3.20 | the dated surfaces an epoch writes (V13 §3.12.4); the world clock is the host's (item 138 (c)) |
| `HistoryRecord`, `HistoryHint` | §2.7, §4.11 | a flood or sea-level event in the history as a dated surface (V13 §3.12.4) |
| V04's closure states, the condition table, `excavation`, the underground parts, `flood` on an element below the water table | II.6, II.7, V04 §2.2, V04 §3.5.7, V04 §4.3 | the water class test classifies V04's elements (V13 §3.13); V04's `flood` reads the governing surface |
| V08's map record, host client, digest additions (`site.latitudeDeg`, `presentWeek`), `PortValues` | V08 §2.1, V08 §2.2, V08 §2.5 | the port's additions for the world (V13 §3.11.6); DR29's latitude from the placement on a placed frame |
| V05's own `Terrain` per island | V05 §2.1 | a sky island's terrain takes no charter and no placement of its own (V13 §1.4) |
| V07's village rungs | V07 §2.1 | a village frame is placed as a town frame is; the glyph's tier rows cover THORP … METROPOLIS |
| V10's `WhyProvider`, `WhySectionProvider` | V10 §2.13, V10 §3.9 | V13 §4.7's providers over the reason records |
| V11's registry, the `ClimateTable`, `ClimateRow.seasons` | V11 §3.1, V11 §2.8, V11 §3.25.6 | the charter's climate scalars pick the frame's climate row (V13 §3.11.4); V13 §2.3's tables join V11's registry |
| V12's register, `CalibrationEntry`, the no-op pins | V12 §2.6, V12 §3.7.8, V12 §3.11 | every calibratable cell of V13 §2.3 registered at its step (V13 §8) |
| V14's `WorldSite`, `SiteAnchor`, the encounter crop, the 2.5D view | V14 (its §2, §3) | V14 consumes `FrameCharter`, `Placement`, the suitability score, the water class test and `ReasonRecord` (V13 §1b); 2.5D is V14's (V13 §5.6) |

### 1.3 The owner rules obeyed (file j; quoted by item)

The owner's words bind; each item below names the mechanism that obeys it, so a reader can hold the mechanism against
the words.

* **Item 131 (the brief and the identity ruling).** "whether SettlementForge is a city generator, a world generator,
  or a general procedural spatial/world engine capable of materializing worlds … from one coherent world-state
  architecture"; the ruling (131 (b)): "a persistent world-state materializer with scale-partitioned representations —
  one world state, several materializers, two coordinate regimes … with an explicit placement transform". Obeyed by the
  two regimes of V13 §2.1 (the world in metres on a raster plus a graph, the frame on the cm kernel), the placement
  transform (V13 §2.2 `Placement`, V13 §3.11) and the materializer contract (131 (c)) every stage of V13 §3 declares:
  world-fact inputs, a context record, outputs as arenas or rasters, derived facts and reason records.
* **Item 132 (encounter maps)** is V14's; its (e) — "the world-map case is derived from the world regime's facts at the
  point (terrain, biome, route, territory, recent events)" — names the facts V13 §4.7's `worldFactsAt` reader gives.
* **Item 133 (editable sites)** is V14's; its (f) "terrain shaping is a terrain edit run before siting" is V13 §4's
  terrain edit under the two verbs.
* **Item 134 (sites and settlements).** "certain generated locations from the country persisted category can be prime
  locations for a new settlement based off of the simulator … a thorpe that establishes itself in front of or
  surrouding and abandoned or occupied fort." Obeyed by V13 §3.7's suitability score, which admits a world site as a
  destination term (134 (c)), and by the charter's `territory` and `sites` rows, which a settlement founded there reads
  so the site claims its ground first; the both-way flow — a settlement generated standalone and placed later, or
  founded on a site — is V13 §3.11's P1–P5 with the charter emitted both ways (134 (d)'s adoption is V14 §3's G8 over
  V13's placement).
* **Item 135 (scale coherence).** "make sure that scaling is completely scaled according to encounter, city, and world
  generating processes". Obeyed by (a) one chain of refinement — the world's reach, the frame's river and a crop's bank
  are one geometry refined three times (V13 §3.11.4, V14's E3); (b) the handoff downward as boundary conditions, the
  charter of V13 §2.2 with every row 135 (b) lists; (c) resolution added deterministically from the coarse fact, the
  position and the seed (V13 §3.11.4's refinement rule: the frame's S1 reads position-keyed noise, so neighbouring frames
  agree at a shared edge); (d) edits stored at the scale they were made (V13 §3.14's scale rule: a fine edit never
  rewrites a coarse fact; a coarse edit invalidates the frames it touches, V13 §4.3); (e) extent, detail, exaggeration
  and budgets per regime by table (V13 §2.3 `WorldSizeRow`, V13 §5.1, V13 §6).
* **Item 136 (time of day; VTT).** "time of day is not a parameter." No record of this volume carries an hour; the
  seasonal and dated surfaces are keyed by week and date (V13 §2.2), never by an hour. VTT's crop scope and stable grid
  origin are V14's; this volume adds the world map to no VTT scene (V13 §5.4).
* **Item 137 (edits react; the classification).** (a) "two verbs for every terrain and water edit … 'this happened'
  … and 'this was always so' … the default is 'this happened'": V13 §3.14 and V13 §4.1's `verb`. (b) "the cascade
  recomputes in dependency order within the affected watershed and dirty set only": V13 §3.14.2. (c) "locks hold
  geometry, physics decides state: a locked cellar lowered below the table stays where drawn and is flooded with a
  reason; an impossible locked thing is kept as a reported anomaly with the DM's choice": V13 §3.13.5 and V13 §4.2's
  anomaly records. (d) "preview before commit on a counterfactual fork": V13 §4.5. (e) "a trace is deletable on its own
  without deleting the event": V13 §4.1's `deleteTrace`. (f) "the water class test … one governing surface against a
  unit's floor and ceiling, read through a table of dry / damp / partially flooded (wading, swimming) / completely
  submerged; a floor range gives a flooded share; accessibility is a route class computed on the path; the site's state is
  an aggregate; the same test on dated and seasonal surfaces gives historical and seasonal classes" — the owner's own
  question "how do you determine partially flooded vs competely submerged?" and "surface levels ruins and buildings can
  also be submerged": V13 §3.13, one function with one table. (g) "surface things": V13 §3.13.4 — buildings per storey, a
  ruin's ceiling the standing height from the damage layer, open water spreading from the body by priority flood with
  barrier tops blocking it, groundwater never flooding above-ground units, streets as route classes, bridges by deck
  elevation, submergence feeding discoverability.
* **Item 138 (FMG native).** (b) "the physical world and the materializer in our representation, bounded by the host
  on one side and the settlement frame on the other, with the charter as the contract and a version-pinned import adapter
  for existing maps; not feature parity": V13 §3 whole, V13 §3.15. (c) the refinements, each at its home: metres
  against a datum (V13 §2.1); surfaces as dated records with the carve kept (V13 §2.2); priority flood and D8 with
  discharge in real units (V13 §3.5); namespaced addresses with field locks and validated deltas (V13 §2.5, V13 §4.1);
  dependency-driven recomputation with the eighteen stale-data paths as tests (V13 §3.14.2, T-V13-13); an id-keyed
  versioned format (V13 §2.7); determinism as a rule (V13 §3.17); two-scale coherence (V13 §3.11); groundwater and
  springs (V13 §3.5.4); history as an axis (V13 §3.12.4); reason chains (V13 §2.2 `ReasonRecord`); knowledge layers
  (V13 §2.2 `knownTo` on world facts); preview-and-commit editing (V13 §4.5); a world that explains its towns (V13 §4.7);
  sites as world facts (V14); water as a consequence system (V13 §3.12–§3.14); siting that answers the host's demand
  (V13 §3.7); level of detail by the hierarchy (V13 §5.2). (d) "NOT BUILT: tectonics, erosion over time, fluid dynamics, a
  sphere in the first version, an economy or military simulation in the map module": J-V13.40 – J-V13.45. (e) the host
  changes: V13 §3.11.6 and V13 §11 Q2.
* **Item 139 (fold these in).** This volume is the fold of items 131, 135, 137, 138 and 140's model rows M2–M6; the
  base change requests of V13 §10 are the record the coherence pass applies (139 (d)).
* **Item 140 (the M0 gate).** The model rows: M2 "the carve delta or pre-carve heightfield recoverable, water surfaces
  separate from the heightfield" — `Terrain.carveDeltaCm` and `WaterSurface` (V13 §2.2; T-V13-20); M3 "the datum behind
  one accessor" — `datumOf` (V13 §2.2; T-V13-21); M4 "the water table behind one function" — `waterTableAt` (V13 §3.12.3;
  T-V13-22); M5 "S1's terrain and water parameters as one input record (the charter's landing)" — `SiteInput` = the
  charter (BCR-V13-4; T-V13-23); M6 "a placement record reserved per arena set" — `Placement` (V13 §2.2; T-V13-24). M1
  (the namespace segment) and M8 (a reason record per generated fact) are shared with V14 and declared here (V13 §2.5,
  V13 §2.2); M7 (the anchor record) is V14's. K12 (the commit journal records stage, concern and inputs read) is the
  primitive V13 §2.2's `ReasonRecord` reads.
* **Item 141 (2.5D)** is V14's (R1–R4); this volume adds the world map as a flat view and states in V13 §5.6 what the
  world regime gives a 2.5D projection (the draped DEM, the surfaces as planes) and nothing else — "i'm not replacing 2d
  with 2.5d. i want both."
* **The owner's settlement-first correction and the port question** (the lane's brief): "(1) a settlement generated
  standalone is placed on a world later and the world autocorrects to the bare coherent minimum (blend band, local
  drainage re-run, coherence cost reported, nearest lawful placement offered); (2) the world map shows a scaled-down
  generalization of the settlement (the settlement glyph with its level table), the full settlement opening on click as
  another page; (3) a mismatch of coast orientation is resolved by the bearing first, the world's blend second, and the
  settlement never unless the DM explicitly chooses mirror (warned) or the world-wins verb; orientation-dependent derived
  terms (sun, wind, sea side, seasonality) recompute from placement with locks holding geometry and anomalies reported;
  the compass is derived presentation." Obeyed by P1–P5 in that order (V13 §3.11), the glyph (V13 §3.10, V13 §5.2), the
  precedence stamp with its two explicit verbs (V13 §3.11.5, V13 §4.1) and the compass rule (V13 §5.3; BCR-V13-16).

### 1.4 Out of scope, with the reason

* **World sites, encounters and the 2.5D view** are V14's: the site card, the admissibility table, the request record,
  the unit graph and its embedding, the encounter crop, the VTT crop scope and grid origin, and the projection family.
  This volume gives V14 its hooks — the charter, the placement, the suitability score with its destination term, the
  water class test and `ReasonRecord` — and reads nothing of V14's but `WorldSite` positions as a suitability input
  (V13 §3.7) and a `SiteAnchor`'s address as a world fact to answer `worldFactsAt` (V13 §4.7).
* **The host's political facts** — factions, cultures, states' diplomacy and forms, religions, military, zones, the
  economy cycle, lore — are the host's (item 131 (b); item 138 (d)); this volume materializes their spatial footprint
  from host-supplied seats, budgets and cost vectors (W8) and invents none standalone beyond one default territory per
  seat the recipe lists.
* **Tectonics, erosion over time, fluid dynamics, a sphere, an economy or military simulation** (item 138 (d)): not
  built (J-V13.40 – J-V13.45); a tectonic pass may later be one recipe operation emitting ranges and troughs
  (J-V13.41), and one optional deterministic stream-power pass at world scale is reserved as a recipe operation
  (`erode`, V13 §3.2) and shipped absent.
* **FMG embedding or a second fork** (item 138 (b); the brief's Part C): no code of the reference generator is run,
  ported or read for identifiers; the adapter reads its full JSON export as data by a version-pinned schema held in one
  adapter folder (V13 §3.15), and the exports write its ecosystem's shapes from a schema file in the same folder, the
  one place that names them (J-V13.46).
* **The evolution engine's scheduling** of dated surfaces (a flood epoch, a sea-level change over a history) is V06's;
  this volume states what a dated surface is, how it is read at a week, and the cascade an epoch's water op runs
  (V13 §3.12.4, V13 §3.14).
* **The village product's** rungs, trackers and fields are V07's; a village frame is placed as a town frame is and its
  glyph rows are V13 §5.2's.
* **The sky layer's** terrain is V05's own: an island takes no charter, no placement of its own and no groundwater
  field (its water is V05's, §2.3's oasis paragraph); the world knows an island only through its settlement's glyph.
* **The host's own changes** (item 138 (e); the proposal's §6) are SettlementForge's program: this volume states the
  contract the host implements (`WorldPort`, the charter per campaign, the settlement-map record) and the owner's
  schedule question (V13 §11 Q2); nothing of the host's code is designed here.
* **Label placement** (S13b), the font metrics and the knowledge filter are §9's; this volume adds the world's label
  candidates and the glyph (V13 §5.3).
* **Nothing else is out of scope**: a world exists at one size rung or another for every campaign that asks for one,
  and a settlement document of any rung — THORP to METROPOLIS, a standalone neighbourhood document (V01 §3.10.1) excepted,
  which is never placed (J-V13.47) — may be placed, blended and chartered.

## 1b Wiring table — every new piece, what feeds it and what it feeds

Every record, field, table, stage output, interface, edit kind and entity kind this volume adds, with its producer and
its consumer, and its home. A piece the base carries names its base home and the request that changes it. No piece is
listed without a consumer.

### 1b.1 Records, fields and tables

| piece | fed by (producer) | feeds (consumers) | home |
|---|---|---|---|
| `WorldDocument` (a `Document` of product `world`; V13 §2.2) | W0 at creation; every world edit's fold | every world stage; the placement step; the port; the world view; the adapter writes one | §2.9 (BCR-V13-5); `Recipe.product: 'world'` (BCR-V13-7) |
| `WorldRecipe` (extent, units, the terrain recipe's op list, the options snapshot, the version table) | W0 from the request; `worldRecipe` edits (V13 §4.1) | W1 (the op list), W3 (the pole inputs, the wind), W5 (the matrix choice), every stage (the snapshot); the report's recipe line | V13 §2.2 |
| `WorldRaster` — `dem` (Int32 cm against the world datum), `carveDeltaCm` (sparse), `flowDir`, `flatRank`, `flowAccum`, `watershed`, `biome`, `landUse`, `geology`, the climate raster (`tempDeciC`, `seasonAmpDeciC`, `seasonPhaseWeek`, `precipMm`, `evapMm`, `windCdeg`, `windStrength`) and the fine→coarse index map | W1 (dem, carve delta, the index map), W4 (flow, accumulation, watershed), W3 (the climate raster), W5 (biome, land use), W1's geology op (`geology`) | W2, W4, W5, W6, W7 (the cost surface), W8, W9; P1–P4; the charter; the port; the view; the exports; V14's G3 siting and E1's `worldFactsAt` | V13 §2.2 |
| `WaterSurface` (sea · lake · reach; `elevationCm`; `date`; `open`; `subtype`; `outlet`; `body`) | W2 (sea, lakes), W4 (reaches' stage), `setSurface` edits (dated), V06's `terrainWater` ops at an epoch, the adapter | the water class test; W4 (lake levels as spill heights); the frame's surfaces (the charter's `waterEdges`); the view (water at its level); the exports; V04's `flood` reading; V14's G6 | V13 §2.2; the frame's `Terrain.surfaces` (BCR-V13-2) |
| `Reach` (a world river reach: course, discharge, width and depth profiles, stage, basin, navigability, mouth kind, exit head) | W4 | W6 (discharge term), W7 (navigable reaches, river crossings' cost), W9 (river labels), the charter's `riverCrossings`, the port, the exports, V14's E3 | V13 §2.2 |
| `Watershed` (basin id, outlet, area, the off-map `exitHeadCm`) | W4 | the charter's `downstreamHeadCm`; the cascade's dirty set (V13 §3.14.2); W6; the clerk | V13 §2.2 |
| `GroundwaterField` (the table per hydro cell, the springs, the recharge gradient) | W4's groundwater step at world scale; the frame's groundwater step (V13 §3.12.3) at frame scale | `waterTableAt` (BCR-V13-3: the basement gate, V04's floors, V14's G6), the water class test, W6's spring term, S12a's well yield (§4.2 S1 (10) reads the ground class; the yield's table reads the depth), the view's spring pins, the exports | V13 §2.2; the frame's `Terrain.groundwater` (BCR-V13-2) |
| `FrameCharter` (frame in cm, datum, edge elevation profiles, water edges, river crossings, downstream head, roads, climate scalars, water table, biome, resources, territory, sites, `source`) | P4 (both directions): from the world at a world-first placement, from the frame and the blend at a settlement-first one; `WorldPort` writes the host's copy | S0 and S1 as the one input record (BCR-V13-4); the frame's `Recipe.charter` (BCR-V13-5); V14's G3 and E1; the port's per-campaign charter; the clerk | V13 §2.2 |
| `Placement` (subject, origin, bearing, `mirrored`, `precedenceStamp`, `coherenceCost`, `since`) | P1 (proposed), the `placeFrame` / `setPlacement` / `mirrorFrame` / `worldWins` edits (V13 §4.1); V14's G8 adoption moves a site's placement into its settlement's | the world↔frame transform (`toWorld`, `toFrame`, V13 §2.2); P2–P5; the glyph (W9); DR29's latitude and the orientation-dependent terms (V13 §3.11.5); the compass (§9.5, BCR-V13-16); the port; V14's `SiteAnchor` for a free-standing site | V13 §2.2 (item 140 M6) |
| `PlacementAnomaly` (a reported impossibility under a lock) | P5 and the cascade | the clerk, the report, V09's panel | V13 §2.2 |
| `WorldRoute` (a graph edge: ends, class, polyline, cost, `sea`) | W7 | the charter's `roads`, the port's routed polylines, W6's economic stage, W9's labels, the view, the exports; V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |
| `Territory` (seat, cost vector, budget, cells, border polygon, pole, neighbours; provinces) | W8 from host seats, or the recipe's default seats standalone | the charter's `territory`; the port; W9's labels; the view; the exports; V14's G1 (context) | V13 §2.2 |
| `SettlementGlyph` (the generalization by level) | W9 for every placed frame; re-made by the frame's commit hook (V13 §3.10) | the world view (V13 §5.2), the exports' world layer, the port's thumbnail | V13 §2.2 |
| `SitingProposal` (a scored candidate site with its reason) | W6 | the host (the port), V14's G3, the clerk | V13 §2.2 |
| `ReasonRecord` (M8; shared with V14) | every stage of this volume, per generated fact; the cascade; V14's stages | the clerk's `why`, `whatCaused`, `whatChanged`, `whatIf` (V13 §4.7); T-V13-10's missing-chain test | V13 §2.2; §2.8 (BCR-V13-17) |
| `FmgImport` (as data, from the full JSON export, version-pinned) | the adapter (V13 §3.15) | W0–W9 run over it as inputs; the import report | V13 §2.8 |
| the trace records `TerrainTrace` and `SurfaceTrace` (the old surface or ground under a *this happened* edit) | the two verbs (V13 §3.14) and V06's water ops | the view's trace projection (V13 §5.1), the clerk, `deleteTrace`; the history frames (V06 §3.15) | V13 §2.2 |
| `Terrain.carveDeltaCm` (sparse, per hydro cell) and `Terrain.surfaces` | S1 (3)'s carve, S1's water operator, the frame's W2-equivalent surface step (V13 §3.12.1) | the pre-carve heightfield reading (`preCarveHeightAt`), the re-route edit (bar 5), the water class test, the exports | §2.3 (BCR-V13-2) |
| `datumOf(doc)` (one accessor) and `Document.worldRef` | S1 (a standalone frame), P4 (a placed frame: `datumCm` = the world's DEM at the origin, V13 §3.11.4) | every reader of `Terrain.datumCm` (§2.3, §2.6, §8.4, §11.1); the world↔frame transform's z | §2.3, §2.9 (BCR-V13-2, BCR-V13-5) |
| `waterTableAt(doc, p, when?)` (one function) | the frame's `GroundwaterField` | §2.4's basement gate, V04's wet tests (`hallDryCm`, `flood` admission), V14's G6, the water class test, S12a's well yield | §2.4 (BCR-V13-3) |
| the address namespace segment (item 140 M1) | the document's `namespace` at creation (V13 §2.5) | every address of a world, a frame or a site document; the merge rule (bar 7); V14's `SiteAnchor` | §6.3 (BCR-V13-6) |
| `EditBase.verb` (`happened` · `alwaysSo`) | every terrain and water edit (V13 §4.1) | the fold (traces kept or the base rewritten), undo, the clerk | §7.1 (BCR-V13-9) |
| the tables `world.sizes`, `world.recipeOps`, `world.climate`, `world.hydro`, `world.groundwater`, `world.biomes`, `world.suitability`, `world.routes`, `world.polity`, `world.labels`, `world.glyph`, `place.coherence`, `water.class`, `water.flood` (V13 §2.3) | shipped defaults; `editTable` (§7.6) | the stages named per table in V13 §2.3; V12's register | §7.6; V11's registry (new rows, V13 §2.3) |
| the stage warnings `W_WORLD_RECIPE_CLAMPED`, `W_WORLD_SINK_UNRESOLVED`, `W_WORLD_LAKE_BREACHED`, `W_PLACE_BENT`, `W_PLACE_NO_LAWFUL`, `W_PLACE_ANOMALY`, `W_BLEND_CLIPPED`, `W_SURFACE_NO_BODY`, `W_GW_PERCHED_IGNORED`, `W_IMPORT_LOSS`, `W_IMPORT_REPAIRED`, `W_CASCADE_TRUNCATED` | the stages and steps named in V13 §3.16 | the report's `stages[].warnings` (§5.4), V10 | §5.4 (BCR-V13-18) |
| the concerns `world.recipe`, `world.climate`, `world.resources`, `world.siting`, `world.polity`, `world.labels`, `place.search`; the stage ids `W0` … `W9`, `P1` … `P5`, `WORLD_CASCADE` | the registry (BCR-V13-8) | every draw of V13 §3.17 | §6.1 |
| the view keys `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate` (per viewer) | V09's controls | the world view's level (V13 §5.2), the trace projection, the dated surface drawn (V13 §5.1) | §2.9 (BCR-V13-5) |
| the register entries of this volume's calibratable columns (V12 §2.6's `CalibrationEntry`) | the seat landing each step of V13 §8 | V12's lint at each step's exit; the corpus stage at `M-CAL/world` (V12 §3.10.5) | §13.7, §13.9 |

### 1b.2 Stage outputs and interfaces

| output or interface | implementer | caller or consumer |
|---|---|---|
| `WorldStrategy.generate(recipe, ctx)` → the world's stage set W0–W9 | `@plat/world` (the `world` product's stages, each a `StageDecl`) | `generate` with a `WorldRecipe` (§11.2's `generate`, its `Blueprint` the world's, BCR-V13-5); the adapter after `FmgImport`; a world `adjust`'s Re-derive from Wk |
| `WorldTerrainStrategy.terrain(recipe, ctx)` (W1) | `@plat/world/terrain` | W0's scheduler; the recipe-op edit's local re-run (V13 §4.3) |
| `hydro.floodFill`, `hydro.resolveFlats`, `hydro.d8`, `hydro.accumulate` (the lifted core) | `@plat/world/hydro` (lifted from `@plat/site/hydro`, same functions, same tests; BCR-V13-1) | `@plat/site`'s S1 (3) unchanged in mechanism; W4; P3; the cascade's local re-runs at both scales |
| `groundwater.derive(field, surfaces, geology, precip, rules)` → `GroundwaterField` | `@plat/world/groundwater` | W4 (world scale); the frame's groundwater step after S1 (3) and after every water or terrain operator (V13 §3.12.3); `waterTableAt` |
| `classifyWater(unit, governing, thresholds)` → `WaterClass` and `routeClass(path, …)` → `RouteClass` (V13 §3.13) | `@plat/world/water` | V04 (every element's `flood` and the `hallDryCm` test, V04 §3.5.2, V04 §4.3's water-edit row), V14's G6 and E3, the frame's basement gate (§2.4), the flood overlay (V13 §5.1), the exports' `waterClass` property, the clerk |
| `charterFor(world, placement)` → `FrameCharter` (P4, world-first) and `charterFrom(frame, blend)` (P4, settlement-first) | `@plat/world/place` | `placeFrame`, `setPlacement`, `worldWins`; the port's per-campaign charter; S0 and S1 through `Recipe.charter` |
| `coherence(world, frame, origin, bearing)` → `CoherenceCost` and `nearestLawful(world, frame, origin)` → `Placement[]` (P1) | `@plat/world/place` | the `placeFrame` dry run; V09's placement tool; the clerk's `placeAt` proposal on the world |
| `blend(world, frame, placement)` (P2) and `localDrainage(world, box)` (P3) | `@plat/world/place` | the `placeFrame` / `setPlacement` fold; the cascade |
| `toWorld(placement, pCm)`, `toFrame(placement, wCm)`, `bearingToWorld(placement, cdeg)` | `@plat/world/place` | the glyph, the view (the frame drawn on the world), the sun and wind recomputation (V13 §3.11.5), V14's `SiteAnchor`, the exports' world coordinates, the port |
| `SettlementGlyph.materialize(frame, placement, levels)` (W9) | `@plat/world/glyph` | the world view; the frame's commit hook (every commit that changes a frame's outline, enceinte, principal water or arterials re-makes its glyph, V13 §3.10) |
| `SuitabilityScore.score(cell, weights, stage)` with `SuitabilityTerm` plug-ins | `@plat/world/siting` | W6; V14's G3 (purpose weights); the host through the port (its weights) |
| `RouteCostLaw` (the host's law as data; the default rows ours) | `@plat/tables` (`world.routes`), the host through the port | W7; V14's E1 (the route at the point) |
| `WorldPort` — `derivedFacts(world, placement)` → `SettlementMapRecord`; `charter(world, campaign)`; `proposals(world, demand)`; `routes(world)` | `@plat/port/world` (one adapter folder per host line, as `@plat/port`'s) | the host, one way (BCR-V13-11); V08's host client gains the world's messages (V13 §3.11.6) |
| `FmgImportAdapter.read(json)` → `FmgImport` and `WorldStrategy.fromImport(imp)` | `@plat/port/world/adapters/fmg/<version>/` | the import command (V09's dialog; the CLI) |
| the exporters `fmgJson`, `fmgGeoJson`, `heightmap16`, `worldCsv` | `@plat/export` (the shapes from the adapter folder's schema file) | the user; the host's ecosystem tools |
| the cascade `cascade(doc, dirty, verb)` (V13 §3.14.2) | `@plat/edit` over `@plat/world`'s operators | every terrain and water edit at both scales; V06's `terrainWater` ops; `setSurface`; the placement edits |
| `ReasonRecord` writers and the readers `why`, `whatCaused`, `whatChanged`, `whatIf` | every stage (the writers); `@plat/world/why` (the readers) | V10's `why` query (V10 §3.9) and its three new modes (V13 §4.7); V14's stages write the same record |
| the world `WhyProvider` (kinds: `Reach`, `WaterSurface`, `Watershed`, `Territory`, `WorldRoute`, `SitingProposal`, `Placement`, `GroundwaterField`'s springs) and the `world` `WhySectionProvider` | `@plat/world` | V10's `why` query, V09's cards |
| `worldFactsAt(world, wCm)` → the facts at a point (terrain, surfaces, biome, route, territory, recent dated events) | `@plat/world` | V14's E1 (the world-map encounter case, item 132 (e)); the clerk; V09's hover |

Each stage's output is consumed: W1's rasters by W2–W9 and the charter; W2's surfaces by W4, the water class test and the
view; W3's climate by W4, W5, W6 and the charter; W4's reaches, watersheds and groundwater by W6, W7, the charter, the
port and V04; W5's biomes by W6, W7's cost, the charter and the view; W6's proposals by the host and V14; W7's routes by
the charter, the port and W6's second stage; W8's territories by the charter, the port and W9; W9's labels and glyphs by
the view and the exports; P1–P5's placement and charter by the frame's S0–S1, the glyph, the port and V14.

### 1b.3 Edit kinds (each with its tool, lifecycle row and undo)

| edit | the authoring tool (§7.1's binding table) | lifecycle row | undo |
|---|---|---|---|
| `worldRecipe` (append, replace, remove or reorder one op of the terrain recipe; `preview` first) | T2 `ground` on the world document | V13 §2.6's recipe row | the replaced op list and the re-derived scope |
| `setSurface` (a dated `WaterSurface` level: the sea, a lake, a reach's stage; with `verb`) | T2 `ground` (both documents) | V13 §2.6's surface row | the former surface list; the cascade's replaced scope |
| `setField(terrain)` on the world raster (with `verb`) | T2 `ground` on the world document | §7.4's `setField` row, the verb added | the stroke leaves the list; the trace removed |
| `rerouteReach` (a reach re-traced from the pre-carve ground between two of its knots; with `verb`) | T2 `ground` (both documents: the frame's form is `moveCourseKnot` with `verb`) | V13 §2.6's reach row | the former course, the former carve delta, the trace |
| `placeFrame`, `setPlacement`, `mirrorFrame`, `worldWins`, `unplaceFrame` | T6 `place` on the world document (the Place-a-settlement mode) | V13 §2.6's placement row | the former placement, blend and charter; `worldWins`'s re-derivation as a Re-derive from S1's undo |
| `deleteTrace` | T9 `shape` | V13 §2.6's trace row | the trace restored |
| `setAttr` on a `WaterSurface` (`subtype`, `open`, `date`), a `Reach` (`navigable` override, `name`), a `Territory` (`name`, `budget`, the cost vector), a `WorldRoute` (`class`), a `Placement` (`bearingCdeg`, `originCm`) | T9 `shape` | §7.4's setAttr row | the inverse |
| `setSeats` (the host's or the user's territory seats and budgets; a Re-derive from W8) | T6 `place` | V13 §2.6's seats row | the replaced W8 scope |
| `adjust` of `world.size`, `world.units`, the pole inputs, the matrix choice (a Re-derive from Wk) | T1 `intend` | §7.4's adjust row | the replaced scope |
| `fork` / `discardFork` / `commitFork` (the counterfactual fork) | T10 `hold` (Preview-on-a-copy) | V13 §2.6's fork row | a fork is never in the canonical log until committed (V13 §4.5) |
| `regenerate` on a world stage's scope (New random on W1's noise, W5's thinning, W6's tie-breaks) | T10 `hold` | §7.4's regenerate row | the replaced scope |

`worldZoom`, `worldLayer`, `showTraces` and `surfaceDate` are view keys (§2.9), set by V09's per-viewer controls, never
edits and never undone.

### 1b.4 Entity kinds (each rendered, labelled, exported, persisted)

| entity | rendered (V13 §5.1) | labelled (V13 §5.3) | exported (V13 §5.4) | persisted |
|---|---|---|---|---|
| the world raster (`dem`, `biome`, `landUse`, the climate) | the relief, biome and climate layers | none | the heightmap image, the FMG-shaped JSON's cell arrays, GeoJSON cells, CSV | the world's `fields` chunks |
| `WaterSurface` | the water at its level (sea, lakes), a reach's stage as its width | lakes and seas by name | GeoJSON features, the FMG-shaped JSON's lake features | entities block |
| `Reach` | the river by width class | named rivers | GeoJSON LineString, the FMG-shaped JSON's river entities, CSV | entities block |
| `Watershed` | the basin overlay (thematic) | none | GeoJSON (on request) | entities block |
| `GroundwaterField` | the water-table overlay (thematic); the springs as pins | springs by name | GeoJSON spring points; the table raster on request | the `fields` chunk (world) / `Terrain.groundwater` (frame) |
| `WorldRoute` | by class | none (a route takes its ends' names) | GeoJSON LineString, the FMG-shaped JSON's routes, CSV | entities block |
| `Territory` | the fill and border | the territory's name at its pole | GeoJSON Polygon, the FMG-shaped JSON's states and provinces | entities block |
| `SettlementGlyph` | by level | the settlement's name and tier | the FMG-shaped JSON's burgs (through the port's record), GeoJSON point with `tier` | entities block (re-made, see V13 §2.6) |
| `Placement` | the frame's outline on the world; the glyph | none | GeoJSON (`placement` properties on the glyph feature), CSV | the world's entities block |
| `SitingProposal` | a candidate pin (while shown) | none | CSV, the port | entities block (W6's last run) |
| `TerrainTrace`, `SurfaceTrace` | the trace projection (dashed old shore, the dry bed hatch) under `showTraces` | none | GeoJSON (kind `trace`) | entities block |
| `ReasonRecord` | never | never | the JSON schema's `why` block (on request) | entities block (outside the model digest, inside the records digest; V13 §2.7) |
| `PlacementAnomaly` | a notice pin | its line | none | derived; never persisted (V13 §2.4) |

## 2 Data model

### 2.1 What the base already declares (read as declared), and the two regimes

`Terrain`, `HydroGrid`, `TerrainSampler`, `WaterBody`, `Outfall`, `OutfallInto` (§2.3); `Blueprint` and the site
request (§4.2 S0); `Document`, `Recipe`, `Base`, `Snapshot`, `ChunkRef`, `ViewState` (§2.9); `Identity`, `Lifecycle`,
`LifecycleEvent`, `DerivationRecord`, `Provenance`, `SliceRef` (§2.8); `EditBase`, `EditEvent`, `PointsForm`,
`FieldStroke`, `EditScope`, `EditFate` (§7.1); `ClosureRecord` (§7.3); `StageDecl`, `StageContext`, `Scope`,
`ProductDecl`, `StrategyRegistry` (§4.12, §14); `Progress`, `PlatApi`, `ExportOpts`, `Query`, `Admission` (§11.2);
`DossierPort`, `DossierDigest`, `HostContext` (§14); `EpochScope`, `EpochParticipant` (V06 §2.1); `LayerSpec` (§8.4);
`LabelEntity` (§9.1). Units, ids and addresses are §2.1's and §6.3's; every length below is an integer centimetre (`Cm`)
or a metre field named `…M`; a temperature is tenths of a degree Celsius (`DeciC`); a precipitation or evaporation is
millimetres per year (`MmYr`); a discharge is cubic metres per second as a double (`M3s`); a bearing is centidegrees
clockwise from north (`Cdeg`); a date is §4.11's week (`Week`, an integer; the host's clock on a dossier-bound document,
§2.9's *The week's source*; the world document's clock is its campaign's, V13 §3.12.4).

**The two coordinate regimes (item 131 (a), (b); J-V13.2).** The **world regime** is a planar, bounded, axis-aligned
raster plus a graph, in **integer world centimetres** (`WorldCm`, an int32 lane as `Cm` is: x east, y north, from the
world's south-west corner; the largest world rung's far corner at 3 840 km lies at 3.84 × 10⁸ cm, inside the lane, and
§3.2's lattice bounds are never read for a world coordinate), with a `WorldPointCm = { x: WorldCm; y: WorldCm }`; its
elevations are integer centimetres against the **world datum** — mean sea level, 0 — and its rasters are typed arrays
with a cell size in cm. It holds no plat arena and runs no kernel transaction: its geometry is records (polylines and
rings of `WorldPointCm`), and the kernel's `delaunay`, `dmath`, `rng`, `index` and `noise` are the only kernel parts it
calls (§14). The **frame regime** is the base's: the cm planar kernel from settlement through interior and site scale,
unchanged. The **placement transform** joins them: a frame point `p` (frame cm, §2.1's frame, the frame's centre at
(0, 0), §3.2 (9)) maps to the world by `toWorld(pl, p) = pl.originCm + R(pl.bearingCdeg) · M(pl.mirrored) · p`, with
`R` the rotation by the bearing (clockwise, through `dmath`'s sine and cosine, the result rounded to the centimetre) and
`M` the reflection in the frame's y axis when `mirrored`; `toFrame` is its inverse. The frame's elevation `h` (cm above
`datumOf(doc)`) stands at `datumOf(doc) + h` against the world datum. An optional equirectangular latitude box
(`WorldRecipe.latBox`) exists only for climate (V13 §3.4): no coordinate is ever a degree.

### 2.2 New records

```ts
// @plat/world — the world document (a Document of product 'world', §2.9; BCR-V13-5, BCR-V13-7)
type WorldCm = number /* int32 centimetres from the world's south-west corner */; type WorldPointCm = { x: WorldCm; y: WorldCm };
type DeciC = number; type MmYr = number; type M3s = number; type Week = number;
type WorldSizeRung = 'province'|'realm'|'continent';   // world.sizes rows (V13 §2.3)
interface WorldRecipe {                      // Recipe.world, present exactly when Recipe.product is 'world'
  size: WorldSizeRung; widthCm: WorldCm; heightCm: WorldCm /* the extent, from the size row unless the request gives them (clamped to the row's band) */;
  fineCellCm: Cm; coarseCellCm: Cm /* the two rasters' cells, from the size row; coarse = fine × the row's ratio (an integer) */;
  latBox?: { southDeg: number; northDeg: number } /* climate only (V13 §3.4); absent: the size row's default box */;
  poles: { equatorDeciC: DeciC; poleDeciC: DeciC } /* explicit boundary inputs (V13 §3.4) */;
  wind: { bands: { fromDeg: number; toDeg: number; bearingCdeg: Cdeg; strength: number }[] } /* the prevailing winds by latitude band (V13 §3.4); default the climate table's */;
  recipe: RecipeOp[] /* the terrain recipe, W1 (V13 §3.2): the world's authoring history, every op seeded and stored */;
  biomeMatrix: string /* a world.biomes matrix row key */;
  seats?: TerritorySeed[] /* standalone: the recipe's default seats (W8); on a host-bound world the host's seats arrive through the port and this is empty */;
  snapshot: { tables: Record<TableId, string>; generator: string; format: string } /* the frozen option snapshot: every table version W0–W9 read, the generator's output version, the file schema (V13 §2.7) */ }
type RecipeOp =                                // resolution-independent, in metres; each carries its own seed index (V13 §3.2)
  | { op: 'hill'|'pit'; at: WorldPointCm; radiusM: number; heightM: number; seedIx: number }
  | { op: 'range'|'trough'; from: WorldPointCm; to: WorldPointCm; widthM: number; heightM: number; roughness: number; seedIx: number }
  | { op: 'strait'; from: WorldPointCm; to: WorldPointCm; widthM: number; depthM: number; seedIx: number }
  | { op: 'mask'; shape: 'edgeFade'|'disc'|'ring'; marginM: number; strength: number }
  | { op: 'invert'|'add'|'multiply'; value: number }
  | { op: 'smooth'; radiusM: number }
  | { op: 'noise'; octaves: number; baseWavelengthM: number; amplitudeM: number; seedIx: number }
  | { op: 'image'; ref: string /* a document asset's content hash (§2.9's packs rule: carried in `packs`) */; toneCurve: [number, number][] /* input 0–1 → metres */; fitTo: 'extent' }
  | { op: 'geology'; shape: 'disc'|'band'; at: WorldPointCm; radiusM: number; kind: 'ordinary'|'soluble'|'volcanic'|'impermeable' }
  | { op: 'erode'; passes: number /* reserved, shipped absent from every template (J-V13.42) */ };

interface WorldRaster {                      // the world's `fields` chunks (§2.9's ChunkRef block 'fields'); every array row-major from the south-west
  fine: { cellCm: Cm; cols: number; rows: number } /* the DEM grid */;
  coarse: { cellCm: Cm; cols: number; rows: number; fineToCoarse: Uint32Array /* per fine cell its coarse cell's index (the index map) */ };
  dem: Int32Array /* fine; cm against the world datum; bathymetry negative; clamped to ±reliefLimitCm (V13 §2.3) */;
  carveDeltaCm: Map<number /* fine cell */, number /* cm lowered by W4's carve; the pre-carve height is dem + delta */> /* item 140 M2; stored sparse (V13 §2.7) */;
  geology: Uint8Array /* fine; 0 ordinary, 1 soluble, 2 volcanic, 3 impermeable — written by the recipe's geology ops, default 0 */;
  flowDir: Uint8Array; flatRank: Uint32Array; flowAccum: Uint32Array /* fine; §2.3's three arrays at the world cell size (W4) */;
  watershed: Uint32Array /* fine; the Watershed id per land cell (W4) */;
  biome: Uint8Array; landUse: Uint8Array /* fine; W5's rows (world.biomes) */;
  climate: { tempDeciC: Int16Array; seasonAmpDeciC: Int16Array; seasonPhaseWeek: Uint8Array; precipMm: Uint16Array; evapMm: Uint16Array;
             windCdeg: Uint16Array; windStrength: Uint8Array /* 0–255 → 0–1 */; continentality: Uint8Array /* 0–255 → 0–1 */ } /* coarse; W3 */;
  distToShoreM: Float32Array; distToRiverM: Float32Array /* fine; true distance transforms (W4) */ }

interface WaterSurface {                     // a surface record, separate from the ground (item 140 M2; proposal §3.3 restated here)
  id: Id; kind: 'sea'|'lake'|'reach';
  body: Id /* the feature or reach it is the surface of: a world feature id (W2), a Reach, or on a frame a WaterBody (§2.3) */;
  elevationCm: Cm /* against the world datum; on a frame against datumOf(doc) */;
  date: Week | null /* null: the generation-time surface (the present until a dated one supersedes it); a dated surface is the present from its week on — the present is the latest surface of the body whose date ≤ the document's week (§2.9's `week`) */;
  season?: 'dry'|'wet' /* a seasonal pair beside the present (V13 §3.12.4): absent on the present itself */;
  open?: boolean /* a lake: inflow exceeds evaporation (W2) */; subtype?: 'fresh'|'salt'|'frozen'|'dry' /* a lake (W2) */;
  outlet?: Id /* a lake's outlet Reach; absent on a closed lake */;
  tidalRangeCm?: Cm /* a sea: the mudflat and harbour bands read it (V13 §3.12.5) */;
  cause: EditRef | RuleRef | 'generation' | `convert:${string}` /* who set it (§2.8's cause form); a dated surface names its event or epoch */;
  reason: Id /* its ReasonRecord */ }

interface Reach {                            // one world river reach, W4
  id: Id; basin: Id /* its Watershed */; from: Id | null /* the upstream Reach or lake; null at a source */; to: Id | null /* the downstream Reach, a lake, the sea feature, or null at an off-map exit */;
  course: WorldPointCm[] /* the D8 path's cell centres, smoothed by two Chaikin passes (V13 §3.5.3) */;
  dischargeM3s: Float32Array /* per course vertex */; widthCm: Int32Array; depthCm: Int32Array /* per vertex, by hydraulic geometry (V13 §3.5.3) */;
  stageSurface: Id /* its WaterSurface of kind 'reach' (the bankfull stage profile is the surface's elevation at each vertex: dem + depthCm) */;
  navigable: boolean /* dischargeM3s at the downstream end ≥ world.hydro.navigableM3s */;
  mouth?: 'plain'|'estuary'|'delta' /* at a sea or lake (V13 §3.5.3) */;
  exitHeadCm?: Cm /* an off-map exit's downstream head: the dem at the exit cell less world.hydro.exitDropCm */;
  name?: NameRef; reason: Id }
interface Watershed { id: Id; outletCell: number; outlet: 'sea'|'lake'|'edge'; areaKm2: number; exitHeadCm?: Cm /* outlet 'edge' */; reason: Id }

interface GroundwaterField {                 // derived at world scale by W4 (over the fine grid) and at frame scale over Terrain.hydro (V13 §3.12.3); persisted as a fields chunk
  grid: 'fine'|'hydro'; tableCm: Int32Array /* per cell: the water table against the datum of its regime */;
  source: Uint32Array /* per cell: the surface cell it rose from */;
  springs: { cell: number; at: WorldPointCm | PointCm; flowM3s: M3s; reason: Id }[];
  rules: Hash64 /* the world.groundwater slice hash it was derived under */ }

interface FrameCharter {                     // the boundary record a frame receives (item 135 (b)); persisted in the frame's Recipe.charter and in the world's placement
  version: string /* the charter schema's version (V13 §2.7) */; world: Uuid; placement: Id;
  source: 'world'|'settlement' /* P4's direction (V13 §3.11.4) */;
  frame: { widthCm: Cm; heightCm: Cm; marginCm: Cm } /* §3.2 (9)'s frame and context margin */;
  datumCm: Cm /* the frame's datum against the world datum: the world DEM at the placement's origin (V13 §3.11.4) */;
  edges: { side: 'N'|'E'|'S'|'W'; profileCm: Int32Array /* elevation against the frame's datum at frame-cm stations every `charter.stationCm` along the arena's outer ring (frame + margin) */ }[];
  waterEdges: { side: 'N'|'E'|'S'|'W'; fromCm: Cm; toCm: Cm /* the station interval the water touches */; body: Id /* the world surface's body */; surface: Id; levelCm: Cm /* against the frame's datum */; kind: 'sea'|'lake' }[];
  riverCrossings: { reach: Id; side: 'N'|'E'|'S'|'W'; atCm: Cm /* the station */; direction: 'in'|'out'; bearingCdeg: Cdeg /* the flow's bearing in frame terms */;
    dischargeM3s: M3s; widthCm: Cm; depthCm: Cm; bedCm: Cm /* against the frame's datum */; stageCm: Cm; basin: Id; navigable: boolean }[];
  downstreamHeadCm: Cm /* the head every off-frame drainage leaves to: the lowest world DEM on the margin's outer ring, against the frame's datum, less world.hydro.exitDropCm */;
  roads: { route: Id; side: 'N'|'E'|'S'|'W'; atCm: Cm; bearingCdeg: Cdeg; class: WayClass /* a world class mapped to §2.4's: highway → through, road → primary, track → track, trail → path */; toward: Id | null /* the far seat */ }[];
  climate: { tempDeciC: DeciC; seasonAmpDeciC: DeciC; seasonPhaseWeek: number; precipMm: MmYr; evapMm: MmYr; windCdeg: Cdeg /* in frame terms */; windStrength: number; latitudeDeg: number; continentality: number };
  waterTable: { grid: { cellCm: Cm; cols: number; rows: number }; tableCm: Int32Array /* the world's groundwater sampled over the frame + margin, against the frame's datum */ };
  biome: { row: string /* a world.biomes row key */; climateRow: string /* V11's ClimateTable row the biome maps to (V13 §3.11.4) */; landUseShare: Record<string, number> };
  resources: { kind: string; at: PointCm; amount: number }[] /* W5's resource sites inside the frame + margin, in frame cm */;
  territory: { id: Id; name?: NameRef; seat: Id | null; province?: Id } | null;
  sites: { site: Id; at: PointCm; kind: string; footprint?: PolygonCm }[] /* V14's world sites inside the frame + margin (item 134 (c)) */;
  geology: 'ordinary'|'soluble'|'volcanic' /* the mode over the frame of the world's geology, 'impermeable' read as 'ordinary' for §2.3's flag */;
  reason: Id }

interface Placement {                        // item 140 M6: one per placed arena set, in the WORLD document
  id: Id; subject: { kind: 'frame'; doc: Uuid } | { kind: 'site'; site: Id /* V14's WorldSite: a free-standing site before adoption */ };
  originCm: WorldPointCm /* where the frame's (0, 0) lies */; bearingCdeg: Cdeg /* the frame's north turned clockwise to the world's */; mirrored: boolean;
  precedenceStamp: 'settlement'|'world' /* which regime's facts won the last placement (V13 §3.11.5) */;
  coherenceCost: CoherenceCost /* as computed at the last placement edit (V13 §3.11.1) */;
  charter: Id /* the FrameCharter emitted at this placement (the world's copy) */;
  blend: { bandM: number; cells: number } | null /* P2's record: the band width used and the world cells it wrote (settlement-first only) */;
  since: { seq: number; week: Week } }
interface CoherenceCost { total: number; terms: { term: 'coastSide'|'riverCrossing'|'edgeElevation'|'relief'|'biome'|'territory'; cost: number; detail: string }[]; lawful: boolean /* total ≤ place.coherence.lawfulMax */ }

interface WorldRoute { id: Id; a: Id; b: Id /* seat ids (the glyphs' settlements, or V14 sites) */; class: 'highway'|'road'|'track'|'trail'|'sea'|'river';
  polyline: WorldPointCm[]; costTotal: number; landmass: number; reason: Id }
interface TerritorySeed { seat: Id /* a settlement's placement, or a host seat with a position */; at: WorldPointCm; key: string /* the host's power or state key, or a standalone name */;
  budget: number /* cells × cost the flood may spend (V13 §3.9) */; costVector: Record<'water'|'mountain'|'forest'|'desert'|'river'|'foreignCulture', number>; culture?: string }
interface Territory { id: Id; key: string; seat: Id; cells: Uint32Array /* fine cell ids, sorted */; border: WorldPointCm[][] /* rings, normalized (V13 §3.9) */;
  poleCm: WorldPointCm /* the pole of inaccessibility: the label anchor */; neighbours: Id[]; provinces?: Territory[]; name?: NameRef; reason: Id }

interface SettlementGlyph {                  // W9's generalization of a placed frame, per level (V13 §3.10)
  placement: Id; tier: Rung; name: NameRef | null; pop: number;
  levels: { level: 0|1|2|3; marks: GlyphMark[] }[] /* the level table's rows (world.glyph): 0 a tier dot, 1 the enclosure, 2 the outline with principal water and walls, 3 the arterials and wards */;
  sourceDigest: Hash128 /* the frame's model digest the glyph was made from: a differing digest marks it stale (V13 §2.6) */ }
type GlyphMark = { kind: 'dot'|'ring'|'outline'|'water'|'wall'|'way'|'ward'; points: WorldPointCm[]; class?: string };

interface SitingProposal { id: Id; at: WorldPointCm; cell: number; score: number; terms: Record<string, number>; port: boolean; reason: Id; demand?: string /* the host's demand key it answers */ }

interface ReasonRecord {                     // item 140 M8; shared with V14, declared here once (§2.8's sixth part for world facts; BCR-V13-17)
  id: Id; fact: Id /* the entity or field value it explains */; stage: StageId; concern?: ConcernId;
  inputs: { fact: Id; path?: string }[] /* the facts read, from the commit journal (K12) */;
  rule: RuleRef /* the section whose rule produced it */; values: Record<string, number | string> /* the numbers the rule read, in their units ("tableCm", "distanceM", "thresholdCm") */;
  cause: EditRef | RuleRef | 'generation' | `convert:${string}`; verb?: 'happened'|'alwaysSo';
  supersedes?: Id /* the reason this one replaced (a cascade's re-derivation) */; week: Week }
  // persisted in the entities block, outside the model digest and inside the records digest (V13 §2.7): a reason explains a fact and never is one

interface TerrainTrace { id: Id; kind: 'oldBed'|'oldShore'|'oldGround'; cells: Uint32Array /* fine or hydro cells */; formerCm: Int32Array /* the former values */; event: EditRef; week: Week; reason: Id }
interface SurfaceTrace { id: Id; surface: Id /* the superseded WaterSurface */; event: EditRef; week: Week; reason: Id }
interface PlacementAnomaly { placement: Id; subject: Id /* the locked entity */; kind: 'riverUphill'|'coastInland'|'lockedBelowTable'|'lockedInWater'|'roadToNowhere'; detail: string; reason: Id }   // derived, V13 §2.4
```

**The frame's side** (BCR-V13-2, BCR-V13-3, BCR-V13-5): `Terrain` gains `carveDeltaCm: Map<number, number>` (per hydro
cell, the delta S1 (3)'s carve lowered it by; `preCarveHeightAt(p)` = `heightAt(p)` + the cell's delta), `surfaces:
WaterSurface[]` (one generation-time surface per `WaterBody` — the sea at `seaLevelCm`, each lake at its spill height,
each reach's stage profile — and every dated surface after it) and `groundwater: GroundwaterField` (`grid: 'hydro'`);
`datumCm` is read only through `datumOf(doc)`; `Document` gains `worldRef?: { world: Uuid; placement: Id }` and
`Recipe` gains `charter?: FrameCharter` (present exactly when the frame was generated or re-derived from a charter) and
`product: 'world'` with `Recipe.world`. The base's water-table rule (§2.4) is replaced by `waterTableAt(doc, p, when?)`
(V13 §3.12.3). A standalone frame — no `worldRef` — keeps every base behaviour: `datumOf` returns S1's value, the
surfaces are S1's at generation, the groundwater field is derived from them, and the charter is absent.

**Knowledge on world facts.** Every world entity above carries `knownTo` as §9.2's admission reads it on a frame's
entities (`'public'|'local'|'secret'`), default `public` for physical facts and `local` for a `SitingProposal`; V14's
five knowledge layers (exists, DM knows, players know, players reached, discoverable) are V14's reading of the same key
with its `SiteAnchor`'s flag, stated there; this volume adds no fourth tier.

### 2.3 New rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

Every value below is **our own** (provenance `own`, `extension`), PLAUSIBLE until measured (V13 §12), calibratable
against the corpus when its stage comes (§13.9; the `M-CAL/world` run, V13 §8), save the cells marked *physics* — a
published physical constant (the lapse rate, the seconds in a year) — which carry provenance `physics` and are not
calibratable. Where a value leans on the reference generator's published behaviour the note names the research file and
section as evidence, never as a source of the number; every number is this volume's. The tables join V11's registry as
new rows (`world.*`, `place.*`, `water.*`; V11 §3.1's next free row numbers, assigned at W1's landing, V13 §8).

```ts
interface WorldSizeRow { rung: WorldSizeRung; widthKm: number; heightKm: number; fineCellM: number; coarseRatio: number;
  defaultLatBox: [number, number]; budgetMs: number /* V13 §6 */; reliefLimitM: number }                       // world.sizes
interface RecipeOpRow { op: RecipeOp['op']; params: Record<string, [number, number] /* the admitted range, metres or a share */>; cost: number /* work units per fine cell */ }   // world.recipeOps
interface ClimateWorldRule {                                                                                   // world.climate — W3
  tropicsDeg: number; lapseDeciCPerKm: number; seasonAmpMaxDeciC: number; seasonContinentalShare: number; continentalityReachKm: number;
  phaseWeekNorth: number; phaseWeekSouth: number;
  winds: { fromDeg: number; toDeg: number; bearingCdeg: Cdeg; strength: number }[];
  moisture: { pickupPerCellOverWater: number; dropShare: number; orographicPerM: number; coastalBonus: number; barrierM: number; rainCapMm: MmYr };
  evap: { baseMm: MmYr; zeroAtDeciC: DeciC; fullAtDeciC: DeciC } }
interface HydroWorldRule {                                                                                      // world.hydro — W4
  lakeMinDepthCm: Cm; breachToleranceCm: Cm; runoffShare: number; riverMinM3s: M3s; navigableM3s: M3s;
  width: { a: number; b: number }; depth: { c: number; f: number }; chaikinPasses: number;
  mouth: { deltaSlopeMax: number; deltaReachKm: number; estuaryWidenShare: number }; exitDropCm: Cm;
  secondsPerYear: number /* physics: 31 557 600 */ }
interface GroundwaterRule {                                                                                    // world.groundwater — W4 and the frame's step
  gradientBase: number /* m per m, at precipRefMm */; precipRefMm: MmYr; permeability: Record<'ordinary'|'soluble'|'volcanic'|'impermeable', number>;
  minDepthCm: Cm /* the table never rises above ground − minDepth except at a spring cell */; perchDepthCm: Cm; springMarginCm: Cm; springSpacingM: number;
  springMinAccumCells: number; liner: { headLimitCm: Cm } /* V13 §3.12.6 */ }
interface BiomeRow { id: string; label: string; habitability: number /* 0–1 */; moveCost: number; landUse: 'ice'|'tundra'|'forest'|'grass'|'scrub'|'desert'|'wetland'|'alpine'; vegetation: number /* 0–1 */; climateRow: string /* V11's ClimateTable row */ }
interface BiomeMatrixRow { id: string; moistureBands: MmYr[] /* the upper bounds of the moisture columns */; tempBands: DeciC[] /* the upper bounds of the temperature rows */; cells: string[][] /* biome ids, [tempRow][moistureCol] */;
  overrides: { water: string; permafrostBelowDeciC: DeciC; wetlandAccumCells: number; alpineAboveM: number } }   // world.biomes
interface SuitabilityRule { weights: Record<'habitability'|'discharge'|'lowland'|'coastType'|'resource'|'spring'|'site'|'connectivity', number>;
  discharge: { refM3s: M3s }; lowland: { refM: number }; coastType: Record<'none'|'open'|'bay'|'estuary'|'lake'|'saltLake', number>;
  spacing: { capitalKm: number; townKm: number; shrink: number }; portPromote: number; stage2: { connectivityRefRoutes: number } }   // world.suitability — W6
interface RouteCostLaw { landBase: number; perM: number; slopePerPct: number; biomeFactor: Record<string, number>; riverCrossing: number; existingRoute: number; waterPerM: number; portOnly: boolean;
  seaPerM: number; navigableRiverPerM: number; classes: { primaryShare: number } }                              // world.routes — W7 (the host's law as data; the default rows ours)
interface PolityRule { normalize: { enclaveMaxCells: number; spikeMaxCells: number; smoothPasses: number }; province: { perSeatCells: number; minCells: number }; budgetDefault: number; costDefault: TerritorySeed['costVector'] }   // world.polity — W8
interface WorldLabelRule { priority: Record<'sea'|'lake'|'river'|'range'|'territory'|'province'|'settlement'|'site', number>; zoomExtent: Record<string, [number, number]>; spreadPx: number; riverMinKm: number }   // world.labels — W9
interface GlyphLevelRow { level: 0|1|2|3; fromStop: number; toStop: number; marks: GlyphMark['kind'][]; toleranceM: number; minTier: Rung }   // world.glyph — W9 and the view
interface CoherenceRule { weights: Record<CoherenceCost['terms'][number]['term'], number>; lawfulMax: number; bearingStepCdeg: Cdeg; originSearchM: number; originStepCells: number;
  blendBandM: number; blendBandMaxM: number; stationCm: Cm; edgeRmsRefCm: Cm }                                 // place.coherence — P1, P2, P4
interface WaterClassRule { dampMarginCm: Cm; wadingMaxCm: Cm; floorSampleM: number; shareSubmerged: number; route: { wadeMaxCm: Cm; swimMaxCm: Cm } }   // water.class — the shared test
interface FloodRule { seasonal: { dryShare: number; wetShare: number }; eventStage: Record<'minor'|'moderate'|'major'|'catastrophic', number /* × the bankfull depth */>; barrierKinds: string[]; spreadMaxCells: number }   // water.flood — V13 §3.12.4
```

| `WorldSizeRow` | `widthKm × heightKm` | `fineCellM` | `coarseRatio` | `defaultLatBox` | `budgetMs` (V13 §6) | `reliefLimitM` |
|---|---|---|---|---|---|---|
| `province` | 320 × 200 | 250 | 8 (2 km) | [40, 50] | 600 | 6 000 |
| `realm` | 1 280 × 800 | 500 | 8 (4 km) | [30, 55] | 1 800 | 8 000 |
| `continent` | 3 840 × 2 400 | 1 000 | 8 (8 km) | [15, 65] | 4 500 | 10 000 |

The `continent` extent equals the host's realm at its default scale (3 km per unit over 1 280 × 800 units;
`research/fmg/notes/sf-host-fmg-integration-audit.md` §4.2's `kmScale` datum), so an imported map lands at full size;
the cell sizes give 1.02 M, 4.1 M and 9.2 M fine cells and 16 k, 64 k and 144 k coarse cells. A request may give its own
extent inside [0.5, 2] × the row's.

| `ClimateWorldRule` | default | note |
|---|---|---|
| `tropicsDeg` | 16 | the band of constant sea-level temperature about the equator |
| `lapseDeciCPerKm` | 65 | physics: 6.5 °C per km, land only |
| `seasonAmpMaxDeciC` / `seasonContinentalShare` / `continentalityReachKm` | 300 / 0.4 / 500 | the annual amplitude at the pole on a continental interior; the share of amplitude continentality adds; the distance to sea at which continentality is 1 |
| `phaseWeekNorth` / `phaseWeekSouth` | 30 / 4 | the hottest week of the year (0–51 from spring, §4.11's calendar) by hemisphere |
| `winds` | [0, 30) 7 000 cdeg (from the ENE), 0.6 · [30, 60) 25 000 (from the WSW), 0.8 · [60, 90] 9 000 (from the E), 0.5; the same mirrored south | the three public wind belts; a world's recipe may override |
| `moisture.pickupPerCellOverWater` / `dropShare` / `orographicPerM` / `coastalBonus` / `barrierM` / `rainCapMm` | 12 / 0.08 / 0.012 / 60 / 2 500 / 4 000 | per coarse cell: the moisture a parcel gains over water, the share it drops over land, the extra share per metre of rise, the bonus at the first land cell, the rise that dumps the parcel, the clamp |
| `evap.baseMm` / `zeroAtDeciC` / `fullAtDeciC` | 1 400 / −100 / 300 | potential evaporation, linear in the mean temperature between −10 °C (none) and 30 °C (full) |

| `HydroWorldRule` | default | note |
|---|---|---|
| `lakeMinDepthCm` / `breachToleranceCm` | 300 / 200 | a filled depression deeper than 3 m is a lake; a saddle within 2 m of the sea surface is breached to the sea |
| `runoffShare` | 0.45 | the share of (precipitation − evaporation) that reaches the channel |
| `riverMinM3s` / `navigableM3s` | 2 / 60 | a reach exists from 2 m³/s; navigable from 60 |
| `width.a`, `.b` / `depth.c`, `.f` | 7.2, 0.5 / 0.27, 0.4 | hydraulic geometry: w = a · Q^b m, d = c · Q^f m — the exponents of the public downstream relations, the coefficients ours (a 100 m³/s reach: 72 m wide, 1.7 m deep) |
| `chaikinPasses` | 2 | the course's smoothing |
| `mouth.deltaSlopeMax` / `deltaReachKm` / `estuaryWidenShare` | 0.0005 / 20 / 2.5 | a mouth is a delta where the bed slope over the last 20 km is below 0.05 %, an estuary where a sea's tidal range ≥ 200 cm, else plain; an estuary widens to 2.5 × over its last reach |
| `exitDropCm` | 200 | an off-map exit's head below the exit cell |
| `secondsPerYear` | 31 557 600 | physics |

| `GroundwaterRule` | default | note |
|---|---|---|
| `gradientBase` / `precipRefMm` | 0.005 / 800 | the table rises 5 m per km inland at 800 mm/yr, scaled linearly by precipitation ÷ 800 |
| `permeability` | ordinary 1.0 · soluble 0.4 · volcanic 0.7 · impermeable 1.6 | a factor on the gradient: karst drains deep, clay holds water high |
| `minDepthCm` / `perchDepthCm` / `springMarginCm` | 50 / 300 / 30 | the table's least depth below ground; a perched table over impermeable rock stands 3 m under the ground; a cell whose table is within 30 cm of its ground is a spring candidate |
| `springSpacingM` / `springMinAccumCells` | 400 / 4 | one spring per 400 m along a thinning pass; a spring needs 4 upstream cells of accumulation |
| `liner.headLimitCm` | 150 | a lined cistern or sewer invert holds the table back up to 1.5 m of head (V13 §3.12.6) |

| `BiomeRow` id | habitability | moveCost | landUse | vegetation | V11 climate row |
|---|---|---|---|---|---|
| `ice` | 0 | 5 | ice | 0 | `cold` |
| `tundra` | 0.1 | 2.5 | tundra | 0.2 | `cold` |
| `boreal` | 0.3 | 2 | forest | 0.8 | `cold` |
| `temperateForest` | 0.9 | 1.5 | forest | 0.9 | `temperate` |
| `temperateGrass` | 1.0 | 1 | grass | 0.4 | `temperate` |
| `mediterranean` | 0.8 | 1.2 | scrub | 0.5 | `warm` |
| `hotDesert` | 0.1 | 2 | desert | 0.05 | `arid` |
| `coldDesert` | 0.1 | 1.8 | desert | 0.1 | `arid` |
| `savanna` | 0.6 | 1 | grass | 0.4 | `warm` |
| `tropicalSeasonal` | 0.7 | 1.5 | forest | 0.9 | `warm` |
| `rainforest` | 0.5 | 2.5 | forest | 1.0 | `warm` |
| `wetland` | 0.3 | 3 | wetland | 0.7 | `temperate` |
| `alpine` | 0.2 | 3 | alpine | 0.2 | `cold` |

The matrix row `default`: `moistureBands` [200, 400, 800, 1 600, ∞] mm/yr (five columns), `tempBands` [−100, 0, 100,
200, ∞] deci-°C (five rows); `cells` by row (cold → hot) and column (dry → wet): [`ice`, `ice`, `tundra`, `tundra`,
`tundra`] · [`coldDesert`, `tundra`, `boreal`, `boreal`, `boreal`] · [`coldDesert`, `temperateGrass`,
`temperateForest`, `temperateForest`, `temperateForest`] · [`hotDesert`, `mediterranean`, `temperateGrass`,
`temperateForest`, `wetland`] · [`hotDesert`, `savanna`, `savanna`, `tropicalSeasonal`, `rainforest`]; `overrides`:
water (a water cell takes none), `permafrostBelowDeciC` −80, `wetlandAccumCells` 400 (a low cell whose accumulation
passes it and whose slope is under 0.5 % is `wetland`), `alpineAboveM` 2 500. Thirteen biomes, five by five: our own
vocabulary and bounds; the idea of a configurable two-axis matrix with overrides is the reference's
(`research/fmg/FMG-survey.md` §"The physical pipeline", *Biomes, ice, decoration*, as evidence).

| `SuitabilityRule` | default |
|---|---|
| `weights` | habitability 1.0 · discharge 0.6 · lowland 0.4 · coastType 0.5 · resource 0.3 · spring 0.4 · site 0.5 · connectivity 0.8 (stage 2 only) |
| `discharge.refM3s` / `lowland.refM` | 100 / 500 (the discharge and elevation at which the terms read 1) |
| `coastType` | none 0 · open 0.4 · bay 0.9 · estuary 0.8 · lake 0.7 · saltLake 0.2 |
| `spacing.capitalKm` / `townKm` / `shrink` | 120 / 25 / 0.85 (a pass that places too few halves its spacing by `shrink` and repeats, V13 §3.7) |
| `portPromote` / `stage2.connectivityRefRoutes` | 1.5 / 3 |

| `RouteCostLaw` (default rows; a host supplies its own through the port, V13 §3.8) | default |
|---|---|
| `landBase` / `perM` / `slopePerPct` | 1 / 0.001 / 0.15 (cost per metre of a level cell is 0.001 × (1 + 0.15 × slope %)) |
| `biomeFactor` | each biome's `moveCost` (above) |
| `riverCrossing` / `existingRoute` / `waterPerM` / `portOnly` | 40 (a crossing of a reach ≥ `riverMinM3s`) / 0.5 (× on a cell already carrying a route) / ∞ on land (water impassable on land legs) / true |
| `seaPerM` / `navigableRiverPerM` / `classes.primaryShare` | 0.0004 / 0.0006 / 0.3 (the first 30 % of edges by seat rank are `highway`, the rest `road`; trails join every remaining seat) |

| `PolityRule` | default |
|---|---|
| `normalize` | enclaveMaxCells 12 · spikeMaxCells 3 · smoothPasses 2 |
| `province.perSeatCells` / `minCells` | 2 000 / 300 |
| `budgetDefault` / `costDefault` | 40 000 / water 8 · mountain 6 · forest 2 · desert 3 · river 1.5 · foreignCulture 4 |

| `WorldLabelRule` | default |
|---|---|
| `priority` | sea 10 · territory 9 · settlement 8 (× the tier) · range 6 · river 5 · lake 5 · province 4 · site 3 |
| `zoomExtent` (stops of V13 §5.2's world band) | sea [0, 3] · territory [0, 2] · settlement [0, 3] (THORP from stop 2) · range [1, 3] · river [1, 3] · lake [1, 3] · province [2, 3] · site [2, 3] |
| `spreadPx` / `riverMinKm` | 12 / 30 |

| `GlyphLevelRow` | `fromStop`–`toStop` | marks | `toleranceM` | `minTier` |
|---|---|---|---|---|
| 0 | 0–0 | `dot` | — | THORP (a THORP or HAMLET draws from stop 2 only) |
| 1 | 1–1 | `dot`, `ring` (the enclosure or the built extent's hull) | 400 | VILLAGE |
| 2 | 2–2 | `outline`, `water`, `wall` | 120 | TOWN |
| 3 | 3–3 | `outline`, `water`, `wall`, `way` (arterials), `ward` (district hulls) | 40 | TOWN |

| `CoherenceRule` | default |
|---|---|
| `weights` | coastSide 3 · riverCrossing 2 · edgeElevation 1 · relief 0.5 · biome 0.3 · territory 0.2 |
| `lawfulMax` / `bearingStepCdeg` / `originSearchM` / `originStepCells` | 4 / 100 (1°) / 20 000 / 2 |
| `blendBandM` / `blendBandMaxM` / `stationCm` / `edgeRmsRefCm` | 2 000 / 6 000 / 2 500 / 2 000 |

| `WaterClassRule` | default | note |
|---|---|---|
| `dampMarginCm` | 50 | a surface within 50 cm under the floor is `damp` |
| `wadingMaxCm` | 100 | the waist: above it, swimming |
| `floorSampleM` / `shareSubmerged` | 2 / 0.95 | a unit with a floor range is sampled every 2 m; a share ≥ 0.95 reads as the whole |
| `route.wadeMaxCm` / `swimMaxCm` | 100 / the clear height (a passage under its ceiling by more than this is `diving`) |

| `FloodRule` | default |
|---|---|
| `seasonal.dryShare` / `wetShare` | 0.6 / 1.3 (× the bankfull depth: the dry- and wet-season stages of a reach; a lake's seasonal pair ± 0.3 × its mean depth) |
| `eventStage` | minor 1.5 · moderate 2 · major 3 · catastrophic 4.5 (× the bankfull depth above the bed) |
| `barrierKinds` | `enceinte`, `retaining`, `quay`, `dyke`, `seaWall` (the entity kinds whose top blocks the spread) |
| `spreadMaxCells` | the hydro grid's cell count (a flood never leaves the grid) |

### 2.4 Derived transients (never persisted)

```ts
interface Blend { box: { c0: number; r0: number; c1: number; r1: number }; weights: Float32Array /* per box cell: the frame's share, 1 at the edge, 0 at the band's outer edge (a smoothstep) */; targetCm: Int32Array /* the frame's edge profile continued outward by nearest station */ }   // P2's working record
interface FloodSpread { surface: Id; stageCm: Cm; cells: Uint32Array /* the hydro cells the stage reaches by the barrier-aware flood (V13 §3.12.4) */; blockedBy: Id[] /* the barrier entities that stopped it */ }
interface WaterClassResult { unit: Id; class: 'dry'|'damp'|'wading'|'swimming'|'submerged'; depthCm: Cm; share?: number /* a floor range's flooded share */; governing: { surface: Id; via?: Id /* the passage the body reached through */; kind: 'table'|'open'|'stage' }; thresholds: Hash64 /* the water.class slice */; reason: Id }
interface RouteClassResult { path: Id[]; class: 'walkable'|'wading'|'swimming'|'diving'|'none'; worst: Id }
interface WorldFacts { at: WorldPointCm; demCm: Cm; surfaces: WaterSurface[]; reach?: Id; biome: string; landUse: string; route?: Id; territory?: Id; sites: Id[]; recent: { kind: string; week: Week; reason: Id }[] }   // worldFactsAt's answer (V14's E1)
```

Each is total over its inputs: a blend over an empty band writes nothing; a spread from a surface whose body holds no
cell reaches nothing and names no barrier; a unit with no floor sample reads `dry` with depth 0 and the reason
`noFloor`; `worldFactsAt` outside the world's extent answers the nearest edge cell with `recent` empty. Tested by
T-V13-30 (a).

### 2.5 Identity: lineage units, creation keys and the namespace segment (item 140 M1)

**The namespace segment** (BCR-V13-6; shared with V14, declared here once). Every address of §6.3 gains a leading
namespace `<ns>:` — the document's `namespace`, minted at creation as the base-32 form of the first 40 bits of
`H128(docId)` (8 characters) — written before the layer-and-part prefix: `w7k2m9x4c:world/reach:…`,
`a1b2c3d4e:under3/gallery:…`. A document's own addresses are written bare inside it and resolved under its namespace;
a reference across documents — a `Placement.subject`, a charter's `sites`, a `SiteAnchor` — is written whole. Two
packages merged into one world (bar 7) collide on no address because their namespaces differ by construction (two
documents with one `docId` are one document, §6.3's *Document identity*); a clone or save-as re-mints `docId` and so the
namespace, every internal reference rewritten by the save (§6.3). A document written before the segment existed reads
`namespace` from its `docId` at load and writes it at the next save (§7.5's chain). `H128` is §6.2's.

| entity | parent | creation key |
|---|---|---|
| the world root | — | (`world`, the recipe's seed) — the world's town-root equivalent: W0's and the recipe ops' draws key from it (§6.1's town root rule) |
| a feature (ocean, lake) | the world root | (`feature`, the lowest-then-leftmost fine cell of its flood-filled set) |
| a `WaterSurface` | its body | (`surface`, the body's lineage, the date or 0, the season or `present`) |
| a `Reach` | the world root | (`reach`, the source cell, the confluence or mouth cell) — so a re-derived river finds its reaches again where its ends stand |
| a `Watershed` | the world root | (`basin`, its outlet cell) |
| a spring | the groundwater field | (`spring`, its cell) |
| a resource site | the world root | (`resource`, its kind, its cell) |
| a `SitingProposal` | the world root | (`proposal`, its cell, the W6 run's demand key or `auto`) |
| a `WorldRoute` | the world root | (`route`, the two seats' lineages sorted, the class) |
| a `Territory` | its seat | (`territory`, the seat's key); a province (`province`, the territory's lineage, its ordinal) |
| a `Placement` | the world root | (`placement`, the subject's docId or site lineage) — so re-placing a frame keeps its placement's address |
| a `SettlementGlyph` | its placement | (`glyph`, the placement's lineage) |
| a `FrameCharter` | its placement | (`charter`, the placement's lineage, the emitting event's `seq`) — a new charter per re-placement, the old one a tombstone the frame's recipe may still cite |
| a `TerrainTrace`, `SurfaceTrace` | the event | (the event's `seq`, its ordinal) — user-created entities of their event (§6.3) |
| a `ReasonRecord` | the fact it explains | (`reason`, the fact's lineage, the path or `''`, the writing event's `seq`) |

Two entities whose keys collide take §6.3's ordinal suffix; a key whose source is gone keeps the entity by §6.3's anchor
carry-over. Anchors for §6.3's matching table: a reach by overlap ≥ 50 % of its course within one fine cell's width; a
territory by its seat; a placement by its subject; a surface by its body and date; a route by its ends. Tested by
T-V13-30 (b).

### 2.6 The lifecycle of every state field this volume adds or gives a producer

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `Recipe.world` (`WorldRecipe`) and its `recipe` op list | W0 from the request; a `worldRecipe` edit appends, replaces or removes an op | W1; every stage reads the snapshot | the recipe | a `worldRecipe` edit re-derives from W1 with carry-over (§6.3) over the ops' touched cells (V13 §4.3) | the former op list; the replaced scope | the op schema versioned; an unknown op refused at load naming it |
| `WorldRaster.dem`, `carveDeltaCm`, `geology` | W1 (dem, geology); W4's carve (the delta) | W2–W9, P1–P4, the exports | the world's `fields` chunks: `dem` as a delta-coded Int32 stream, `carveDeltaCm` as a sparse (cell, delta) list, `geology` run-length | re-derived from W1; a terrain edit's stroke list composited as §7.2's | the stroke leaves the list; a trace removed | a document without `carveDeltaCm` reads an empty map (pre-carve = dem) and is reported (bar 5 cannot hold on it until re-derived) |
| the climate raster | W3 | W4, W5, W6, the charter | `fields` chunk | re-derived from W3 on a pole, wind or latitude-box adjust | the replaced scope | absent: re-derived on load |
| `flowDir`, `flatRank`, `flowAccum`, `watershed`, `distToShoreM`, `distToRiverM` | W4 | W5–W9, the charter, the cascade | `fields` chunk (recomputable; stored so a frozen view needs no pipeline) | the cascade's local re-run inside the dirty watershed (V13 §3.14.2) | the replaced scope | absent: recomputed on load |
| `WaterSurface` (generation-time) | W2 (sea, lakes), W4 (reaches); S1 on a frame | the water class test, the view, the exports, V04 | entities block | re-derived with its body; a user's `setSurface` on the generation-time surface is an edited attribute kept (§7.2) | the former surface | absent on an older frame: one surface per `WaterBody` made on load from `seaLevelCm`, the spill heights and the carved bed (V13 §4.6) |
| `WaterSurface` (dated, `date` set) | `setSurface` (verb `happened`), V06's `terrainWater` op at an epoch, a dossier calamity's flood (V13 §3.12.4), the adapter (none) | the present at a week; the historical class; the view under `surfaceDate` | entities block | kept through every re-derivation (an event's fact, as a drawn constraint is); re-applied at its log position | removed with its event; its trace with it | kept |
| `Reach` (course, profiles, `navigable`, `mouth`, `exitHeadCm`) | W4 | W6, W7, W9, the charter, the port, the exports | entities block | re-derived by the cascade inside its basin; a `rerouteReach` is an edited course held (§7.2) | the former reach, delta and trace | absent: W4 on load |
| `GroundwaterField` (world) / `Terrain.groundwater` (frame) | W4; the frame's step after S1 (3) and after every terrain or water operator | `waterTableAt`, the water class test, W6, the view | `fields` chunk / the terrain chunk | re-derived by the cascade over the dirty set | the replaced scope | absent on an older frame: derived on load from the surfaces (V13 §4.6), reported as the version's shift |
| `Terrain.carveDeltaCm`, `Terrain.surfaces` | S1 (3), S1's water operator | `preCarveHeightAt`, the water class test, the exports | the terrain chunk | re-derived with S1's water | the edit's replaced scope | absent: `carveDeltaCm` empty (reported), `surfaces` built on load |
| `datumOf(doc)`'s value | S1 (standalone); P4 (placed: the world DEM at the origin) | every reader of §2.3's `datumCm` | `Terrain.datumCm` (unchanged storage) | a placement edit re-derives it and runs V13 §3.11.5's re-basing | the former datum | — |
| `Recipe.charter`, `Document.worldRef` | P4 at a placement; `generate` from a charter | S0, S1, S12a, V14 | the recipe (the charter as a recorded input, §2.8's derivation-record rule; V13 §2.7) | the charter is an input: Regenerate (keep settings) keeps it; `worldWins` replaces it and re-derives from S1 | the former charter and `worldRef` | absent: a standalone frame |
| `Placement` | `placeFrame`; `setPlacement`, `mirrorFrame`, `worldWins`; V14's adoption | the transform, the glyph, the port, the compass, the sun and wind terms | the world's entities block | an input: kept by every world re-derivation; a world `adjust` that changes the extent re-validates every placement (one outside the new extent is reported and kept) | the former placement, blend and charter | the subject by `docId`; a subject the world cannot open stays placed and is reported |
| `Placement.blend`'s world cells | P2 | W4 (the band's drainage), the view | the blended cells are the `dem`'s own values; the band's former values a `TerrainTrace` of the placement event | re-blended by a placement edit; a world terrain re-derivation under a placed frame re-blends after it (V13 §4.3) | the trace restores them | — |
| `SettlementGlyph` | W9; the frame's commit hook (V13 §3.10) | the view, the exports, the port | the world's entities block, with `sourceDigest` | re-made whenever the frame's digest differs (stale → re-made at the next world view or export; never a world edit) | with its placement | absent: made at the next view |
| `WorldRoute`, `Territory`, `SitingProposal` | W7, W8, W6 | the charter, the port, W9, the view | entities block | re-derived from their stage; a `setSeats` or a cost-law change re-derives from W8 or W7 | the replaced scope | absent: re-derived on load |
| `ReasonRecord` | every stage; the cascade; V14 | the clerk's four readers | entities block (records digest only) | re-written by every derivation that re-derives its fact (`supersedes` the old) | the former record | absent on an older document: the generic provider answers from provenance (V10 §2.13) and the clerk says the chain is incomplete |
| `TerrainTrace`, `SurfaceTrace` | a `happened` edit; V06's water ops | the view, the clerk | entities block | kept | removed with the event; `deleteTrace` removes one alone, its own undo restoring it | kept |
| `EditBase.verb` | every terrain and water edit (`happened` by default) | the fold (V13 §3.14) | the event | — | — | an older event reads `alwaysSo` (no trace was ever kept) |
| the view keys `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate` | V09's controls | the world view | the viewer's view state, never a digest | view only | not an event | absent: stop 1, `relief`, `false`, the document's week |

### 2.7 The version table, the digests and the storage of the world

**The version table** (item 138 (c); J-V13.3) is `WorldRecipe.snapshot`: the generator's output version (§6.4's axis),
the file schema (`schemaVersion`, §2.9), the table versions W0–W9 read (`tables`, by `TableId`), the charter schema's
version (`FrameCharter.version`, bumped only when a charter field changes meaning), the adapter's pinned import version
(V13 §3.15) and the FMG-shaped export schema's version (V13 §5.4) — every world document names every version it depends
on (item 140 K10), and §6.4's retention window applies to the output version. A frame whose `Recipe.charter.version` is
older than the library's charter schema is migrated by the charter's own migration chain (a field added reads its
default, a field removed is dropped and reported), never by re-generating the frame.

**The model digest** (§6.2) gains a layer node `world` for a world document: the fine and coarse raster chunks' content
hashes (each raster a leaf whose bytes are its typed array in the canonical delta coding of V13 §2.6, so two worlds with
equal rasters hash alike), the surfaces, reaches, watersheds, routes, territories, proposals, placements, glyphs and
traces as leaves in schema order. **A placement is in the world's digest and in no arena's** (the brief's bar 3): a frame
document's model digest reads neither `worldRef` nor `Recipe.charter` (the charter is a recorded input in the records
digest, as a `DerivationRecord` is, §6.2's *Excluded*; the frame's rasters and arenas it refined from the charter are
model data and change only when the frame re-derives), so moving a placement changes the world's digest and no arena
digest (T-V13-3). `ReasonRecord`s, traces' `reason` references and the charter's bytes are in the records digest.

**Storage.** A world document is a `.plat` container (§2.9) whose `fields` chunks hold the rasters — `dem` second-order
delta-coded (the fallback §2.9 names, taken from the start for a raster: a world's dem is smooth, so the stream
compresses to ≈ 0.6 B per cell), `flowDir` and the class rasters run-length coded, the climate raster at its coarse
size, `carveDeltaCm` as a sparse list — and whose `entities` block holds the records. Budget: a `continent` world ≤ 24 MB
gzipped (9.2 M cells × ≈ 2.2 B gross across the rasters, plus ≤ 2 MB of records), a `realm` ≤ 11 MB, a `province` ≤ 3 MB;
measured at W1 (V13 §8); *pre-decided fallback:* the recomputable rasters (`flowDir`, `flatRank`, `flowAccum`,
`watershed`, the distance fields) are dropped from the file and rebuilt on load inside V13 §6's load budget. A frame's
document grows by its `groundwater` chunk (≤ 160 KB at CITY: 102 400 hydro cells × an Int16 delta stream) and its
surfaces (a few records), inside §2.9's size budget.

### 2.8 The `FmgImport` mapping (as data, from the full JSON export, version-pinned)

`FmgImport` is the adapter's neutral record — the module's own vocabulary, as `DossierDigest` is the dossier port's (§14)
— filled by one adapter folder `adapters/fmg/<format version>/` from the reference generator's **full JSON export**, the
earliest admitted format version 1.152 (the first that carries the grid-to-pack link beside the geometry and every entity;
`research/fmg/notes/fmg-data-model-and-io.md` §7b as evidence); a `.map` file is admitted only after an open-and-resave in
the generator (never by re-implementing its migration chain, J-V13.46). The adapter folder declares its **key list** —
every field name of the export it reads — under §14's key-list lint, so no module of `plat/` outside it names one; this
table names the export's parts by what they are, never by their names:

| the export's part (by meaning) | `FmgImport` field | the world record it feeds | the rule | loss reported |
|---|---|---|---|---|
| the map's creation timestamp, version and seed | `provenance: { created, version, seed }` | `WorldRecipe.snapshot.generator` (prefixed `fmg:`), the report | kept as provenance only; the world's own seed is `H32("plat:fmg-seed" ‖ seed)` (one way, as item 85's) | — |
| the extent in its units, the units-per-pixel scale, the latitude box | `extent: { widthPx, heightPx, kmPerUnit, latBox }` | `WorldRecipe.widthCm`, `heightCm` (= px × km × 10⁵), `latBox`; the size rung = the nearest row by area | the fine cell = the row's | an extent outside [0.5, 2] × every row's is clamped to the nearest, `W_IMPORT_LOSS` |
| the source lattice's points and each cell's integer height (0–100), the sea level 20 and the height exponent | `grid: { points, heights, exponent }` | `WorldRaster.dem`: each fine cell takes the height of the nearest source point (the lattice is the import's own index, so identity is anchored to it) converted by the export's own metre formula at the saved exponent, then re-based so that the sea level's height maps to 0 cm; water cells take a bathymetry of −(20 − h) × 50 m ÷ 20 (the export's depth formula) | the exponent is read once for the conversion and dropped (`research/fmg/FMG-survey.md` §"The physical pipeline", *Grid and height*: the coupling to avoid) |
| the features (ocean, lake, island) with their lake levels, open/closed flags and subtypes | `features[]` | `WaterSurface` (kind `sea` at 0; a lake at its exported level converted as above; `open`, `subtype` mapped `freshwater → fresh`, `salt → salt`, `frozen → frozen`, `dry → dry`, any other `fresh` with `W_IMPORT_REPAIRED`) | W2 is **not** re-run: the import's features are the world's | a lake whose level lies below its basin's spill is raised to it, reported |
| the river entities (source, mouth, parent, basin, discharge, width, the meandered points) | `rivers[]` | `Reach` keyed by the export's river id (the creation key's source cell from its source point); the course **re-derived** by W4's D8 over the imported dem (the meandered points are presentation, dropped); discharge, width and depth recomputed by W4 | the exported discharge and width are kept beside the record as `imported` provenance values for the report's comparison, never read by a stage | a river whose re-derived course finds no outlet is reported `W_IMPORT_LOSS` and kept as a trace |
| the climate arrays (temperature °C per cell, precipitation 0–255 per cell) | `climate: { tempC, prec255 }` | the coarse climate raster: temperature × 10 as `tempDeciC`; precipitation mapped linearly 0–255 → 0–2 000 mm/yr; the seasonal curve, evaporation, wind and continentality **derived** by W3 from the imported temperature and the recipe's poles | W3 runs in its *derive-only* mode (V13 §3.4) | the 0–255 scale is unspecified in the source (`fmg-physical-pipeline.md` §3.13): the mapping is ours, reported once |
| the biome per cell and the biome table | `biomes: { ids[], perCell }` | `WorldRaster.biome` by a mapping table in the adapter folder (the export's 13 ids → V13 §2.3's rows); unmapped → W5's matrix result, `W_IMPORT_REPAIRED` | W5 runs over the imported climate for every unmapped cell | — |
| the routes (polylines, kinds) | `routes[]` | `WorldRoute` with class by the adapter's mapping (its main roads → `road`, trails → `trail`, sea routes → `sea`); the polyline kept | W7 runs only to add missing links after the host's seats arrive | — |
| the burgs (position, name, population, port flag, capital flag, the city-generator flags) | `seats[]` | the host's settlement facts, handed through `WorldPort` as `SettlementMapRecord`s (V13 §3.11.6) — never a frame: a frame exists only when the host's dossier makes one and it is placed | the position becomes a `Placement` candidate origin for the host's settlement of that key | a burg the host does not know is reported as an unbound seat |
| the states, provinces, cultures, religions (their cells and names) | `polity: { states[], provinces[], cultures[] }` | `Territory` by rasterising each entity's cell set through the grid link (its pack cell → source cell → fine cells); religions dropped (host facts, item 138 (d)) | W8 is not re-run; the borders are normalized by V13 §3.9's rule | religions, zones, markers' legends, lore |
| the markers, zones, emblems, military, economy, journeys, labels' positions, styles, layers, overrides, relief, ice | — | dropped | — | each listed in the import report |

Integrity repairs the export's own loader applies at load (dangling references to the null entity, re-found cells,
de-duplicated ids) are applied by the adapter the same way, each reported `W_IMPORT_REPAIRED`; a tombstoned entity (the
export's removed flag) is skipped. The adapter's output is a `WorldDocument` whose recipe holds no terrain op but one
`image`-like `imported` marker (the dem is data, never re-derivable from a recipe): a world `Re-derive from W1` on an
imported world is refused with the reason (`refuse.world.imported`, V13 §4.1), every later stage re-derivable. Tested by
T-V13-26.

## 3 Generation

### 3.0 The world pipeline: registration, order, the materializer contract

The world is a product (`ProductDecl` `world`, registered by `@plat/world` into `StrategyRegistry.products`; BCR-V13-7;
J-V13.4): its stage set is W0–W9, each a `StageDecl` (§4.12) with `phase: 'main'`, `txForm: 'declared'` (a world stage
writes records and rasters, never a kernel transaction; its "batch" is one commit of the world document's records,
§3.3's commit record kept for K12's journal), `lineageUnit: 'town'` (the world root) unless the table below names
another, and the declared I/O that orders them topologically (§4.1). `LadderRouter` routes a `WorldRecipe` request to
the product by `Recipe.product`, never by population. The placement step P1–P5 is one more stage of the product, run
not by `generate` but by the placement edits' folds (V13 §4.1), with its own stage id and streams. Every stage obeys
item 131 (c)'s **materializer contract**: it declares its world-fact inputs (the data keys it reads), takes one context
record (`StageContext`, §14; a `PlaceContext` for P1–P5, V13 §3.11) and returns outputs as rasters, records (arenas, for
a frame) and derived facts, writing one `ReasonRecord` per fact it creates or changes (V13 §2.2) — a stage that writes a
fact without a reason fails T-V13-10's chain test. Every stage declares its failure ladder (V13 §3.16) and its work
limits as laws over the extent's cell counts (§5.1 (5): the unit `frameCells` reads the fine or coarse grid). The world
runs on the generation worker as a settlement does (§4.1), its stages serial; it runs **before** any settlement frame
of its campaign is generated from a charter and **after** every settlement generated standalone that is later placed;
the two orders meet at P1–P5.

| stage | id | reads (data keys) | writes | streams (§6.1) | lineage unit | ladder (V13 §3.16) | budget (V13 §6) |
|---|---|---|---|---|---|---|---|
| W0 Blueprint | `W0` | the request; the tables | `Recipe.world` (the snapshot, the resolved extent, cells, poles, winds, matrix, the recipe op list with seed indices) | `world.recipe` (the template draw) | the world root | F-WORLD (recipe) | ≤ 2 ms |
| W1 Terrain | `W1` | `world.recipe` | `WorldRaster.dem`, `geology`, the coarse grid and index map | `world.recipe` keyed by op index | the world root | F-WORLD (clamp) | the size row's |
| W2 Features | `W2` | `dem` | the features, `WaterSurface` (sea, lakes), the coast outline | none | the world root | F-WORLD (lake) | " |
| W3 Climate | `W3` | `dem`, the coarse grid, `latBox`, `poles`, `wind`; the features (water cells) | the climate raster | `world.climate` (the moisture start jitter) | the world root | F-WORLD (clamp) | " |
| W4 Hydrology | `W4` | `dem`, `geology`, the features, the surfaces, the climate | `flowDir`, `flatRank`, `flowAccum`, `watershed`, `carveDeltaCm`, `Reach`, `Watershed`, the reaches' surfaces, lake outlets and `open`, `GroundwaterField`, the distance fields | none | the world root | F-WORLD (sink), F-GW | " |
| W5 Biomes | `W5` | the climate, `flowAccum`, `dem`, the surfaces | `biome`, `landUse`, the resource sites | `world.resources` (thinning) | the world root | F-WORLD (matrix) | " |
| W6 Suitability | `W6` | everything above; the routes (stage 2); V14's sites; the host's demand | `SitingProposal`s, the score raster (transient) | `world.siting` (tie-breaks) | the world root | F-WORLD (none placed) | " |
| W7 Routes | `W7` | the seats (placements and host seats), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s | none | the world root | F-WORLD (no path) | " |
| W8 Polity | `W8` | the seats, the cost surface, the reaches, the features | `Territory`s with provinces | none | each seat | F-WORLD (budget) | " |
| W9 Labels and glyphs | `W9` | every named record; the placements and their frames | the world's `LabelEntity` candidates (§9.1), `SettlementGlyph`s | `naming` (world names) | the world root; a glyph its placement | §9.6's naming ladder | " |
| P1–P5 Placement | `P1` … `P5` | the world; the frame document; the edit | `Placement`, the blend, the charter, the frame's re-based terms, anomalies | `place.search` (none: deterministic; reserved) | the placement | F-PLACE | V13 §6's placement row |

**Where the stages run and what they may touch.** W0–W9 write the world document only. P1–P5 write the world document
(the placement, the blend's cells with their trace, the charter's world copy) and, in the frame document, exactly:
`Document.worldRef`, `Recipe.charter`, `Terrain.datumCm` (through its accessor), the orientation-dependent terms of
V13 §3.11.5 and their anomaly reports — **never an arena, a plot, a building or a lock** (bar 3; J-V13.5). A frame
generated from a charter runs the base pipeline S0–S15 with the tail, S0 and S1 reading `Recipe.charter` as V13 §3.11.4
states. Progress is posted per stage (§11.2's `Progress`), and a world generate past one second shows §12.1's progress
strip naming the stage (item 119).

### 3.1 W0 Blueprint

1. **The request.** `WorldRequest { seed; size: WorldSizeRung | { widthKm; heightKm }; template?: string; latBox?;
   poles?; wind?; biomeMatrix?; seats?; options? }` — V09's world dialog, the API (`generate` with a world blueprint)
   or the clerk. Absent fields take the size row's defaults (V13 §2.3); `poles` default equator 270 deci-°C, pole −300
   (own; a temperate planet); `template` default `'continent'`.
2. **The extent and cells.** The size row's `widthKm × heightKm` unless given (clamped to [0.5, 2] × the row's, reported
   `W_WORLD_RECIPE_CLAMPED`); `fineCellCm` = the row's `fineCellM` × 100; `coarseCellCm` = fine × `coarseRatio`; the
   grid counts follow (cols = ⌈width ÷ cell⌉).
3. **The template draw.** A template is a row of `world.recipeOps`'s companion table `world.templates` (shipped: six
   rows — `continent`, `archipelago`, `peninsula`, `highland`, `riverlands`, `coast` — each a list of op *generators*
   with parameter ranges in metres and placement windows as shares of the extent; our own rows, calibratable); W0 draws
   each generator's parameters uniformly in its range on `world.recipe` (keyed by the world root and the op's ordinal)
   and writes the resolved `RecipeOp` list, each op with its `seedIx` (the ordinal), into `Recipe.world.recipe`. The
   template idea is the reference's (`research/fmg/FMG-survey.md` §"The physical pipeline", *Heightmap templates*, as
   evidence); the resolved ops are the world's authoring history and the one input W1 reads (J-V13.6), so a world is
   re-derived from its recipe, never from its template name, and an edit appends ops.
4. **The snapshot.** `Recipe.world.snapshot` is written with every table version the product's stages will read (the
   registry's pinned versions, §7.6), the generator's output version and the schema; W0 refuses a request whose pinned
   table is missing (F-WORLD recipe rung: the table's default version is taken and reported).

*Output:* `Recipe.world`. *Edges (V13 §3.18):* an empty op list is a flat world at 0 cm — the sea everywhere — which W2
types one ocean and every later stage runs over (no land: no reach, no seat, no route; reported); one op is a world of
one hill.

### 3.2 W1 Terrain recipe

The ops run in order over a Float32 working raster in metres on the fine grid, then the result is rounded to the
centimetre, clamped to ± the size row's `reliefLimitM` (every write through §2.3's range check, `W_HEIGHT_CLAMPED` with
the cell count) and stored as `dem`. Every op is **resolution-independent**: its parameters are metres, so the same
recipe at another fine cell gives the same relief sampled finer or coarser (T-V13-5); nothing of an op depends on the
cell count (J-V13.7 — the reference's two cell-count-dependent decays are what this rule removes;
`research/fmg/FMG-survey.md` §"The physical pipeline", *Heightmap templates*, as evidence).

| op | mechanism | constants (world.recipeOps' admitted ranges; own, calibratable) |
|---|---|---|
| `hill` / `pit` | a smooth mound (pit: negative) of `heightM` at `at`, falling to nothing at `radiusM`: H · (1 − t²)² with t the distance over the radius — the base's hill primitive at world scale (§4.2 S1 (1)) — multiplied by (1 + 0.1 · n(p)) with n a two-octave position-keyed noise on `world.recipe` keyed by `seedIx`, so a hill is never a perfect dome | radius 20–600 km, height 50–4 000 m |
| `range` / `trough` | a ridge (trough: negative) along the segment `from`–`to`, its crest line displaced by a one-octave noise of amplitude `roughness` × `widthM` (position-keyed), its cross-section H · (1 − t²)² over `widthM` ÷ 2, its height tapering over the last 15 % of its length; spurs: every `widthM` along the crest a side ridge of 0.4 × the height and 0.3 × the length, alternating sides | width 10–200 km, height 300–6 000 m, roughness 0–0.5 |
| `strait` | a trough along the segment whose floor is −`depthM` and whose section is a smoothstep over `widthM`; the ground inside is set, not added | width 5–120 km, depth 20–3 000 m |
| `mask` | `edgeFade`: the ground multiplied by a smoothstep from 0 at the extent's edge to 1 at `marginM` inward (a continent surrounded by sea); `disc` and `ring`: the same about the centre | margin 0–500 km, strength 0–1 |
| `invert`, `add`, `multiply` | the ground negated; a constant added in metres; scaled | add ±2 000 m, multiply 0.1–3 |
| `smooth` | a box blur of `radiusM` (three passes, a Gaussian's approximation) | radius 1–100 km |
| `noise` | fBm of `octaves` octaves from `baseWavelengthM` with amplitude `amplitudeM`, each octave's lattice position-keyed on `world.recipe` by `seedIx` and the octave index, through the kernel's `noise` (§14) at the cell's world position in metres, so a cell's noise is a function of where it is | 2–8 octaves, wavelength 20–2 000 km, amplitude 10–1 500 m |
| `image` | a greyscale image asset (carried in `packs`, §2.9) resampled to the extent by bilinear interpolation (never by a browser's canvas: the decoder is `@plat/world`'s own PNG and 16-bit reader under §6.5's lint, so an import is byte-stable), its sample mapped through the explicit `toneCurve` (input 0–1 → metres, piecewise linear) — the reference's soft curve is one row of the curve table, not a hidden step (`fmg-physical-pipeline.md` §3.2 as evidence) | the curve's metres inside ± the relief limit |
| `geology` | writes `WorldRaster.geology` inside its disc or band | radius 10–400 km |
| `erode` | reserved (J-V13.42): shipped absent from every template; when present, refused at W0 with `refuse.world.op` until the pass lands | — |

The coarse grid is the fine grid's 8 × 8 block mean (`coarseRatio`), `fineToCoarse` the block index. **Preview before
commit:** a `worldRecipe` edit runs W1 over the op's touched cells on the fork (V13 §4.5) and shows the relief before
the commit; the op list is the world's history, so undoing an op is removing it (V13 §4.1).

### 3.3 W2 Features and surfaces

1. **Flood fill.** Cells with `dem` < 0 are water, else land; connected water components by 4-neighbour flood fill in
   canonical cell order; a water component that touches the extent's border is an **ocean** feature, any other a **lake**
   candidate; a land component is a **landmass** (its id by its lowest-then-leftmost cell), the index W7 and W8 read.
2. **Lakes by spill height.** W2 runs the priority flood (the lifted core, §2.3's mechanism) over the fine dem with the
   ocean cells as the queue's seeds and the border cells at their own height: a depression whose fill depth (spill height
   − floor) ≥ `lakeMinDepthCm` becomes a **lake** feature whose cells are those filled, with a `WaterSurface` of kind
   `lake` at the spill height (`elevationCm`); a saddle within `breachToleranceCm` of the sea surface is **breached**: the
   depression joins the ocean feature, its cells read water at 0, reported `W_WORLD_LAKE_BREACHED`. A water component of
   step 1 that lies in no filled depression (a sunken plain the recipe dug below 0 but which drains to the border) is an
   ocean arm. The sea's `WaterSurface` is one record at 0 cm (`kind: 'sea'`, `tidalRangeCm` from the size row's default,
   150 cm; own), `cause: 'generation'`.
3. **Open or closed, subtype.** After W3's climate and W4's accumulation (W2 writes the records; W4 fills these two
   fields in its lake step, V13 §3.5.2): a lake is `open` when its inflow (the accumulated runoff into its cells, W4)
   exceeds its evaporation (its area × `evapMm`); an open lake has its outlet reach at the spill cell; a closed lake's
   `subtype` is `salt`, a lake whose mean `tempDeciC` < −30 `frozen`, a closed lake whose evaporation ≥ 4 × its inflow
   `dry` (drawn as a flat), else `fresh`. The rules' shape is the reference's (`fmg-physical-pipeline.md` §3.14 as
   evidence); the thresholds are ours.
4. **The coast outline.** The ocean feature's boundary, traced as rings along cell edges and simplified by
   Visvalingam at 0.5 × the fine cell, is the world's coast polyline set (`WorldRaster`'s companion record
   `coast: WorldPointCm[][]`, in the entities block), the view's and the exports' line and P1's coast-side test input.
   Coastline fractalisation is a view-time displacement (V13 §5.1), never geometry (J-V13.8).

*Output:* the features, the sea and lake surfaces, the coast outline. The reason record of each lake names its spill
cell, fill depth and threshold.

### 3.4 W3 Climate

On the coarse raster; every value integer (deci-°C, mm/yr, cdeg), every transcendental through `dmath` (§6.5).

1. **Latitude.** Row r's latitude is `latBox.south + (latBox.north − south) × (r + 0.5) ÷ rows` (an equirectangular
   box; the only use of degrees).
2. **Temperature** (annual mean at sea level, then the lapse): T_sea(lat) = `equatorDeciC` for |lat| ≤ `tropicsDeg`;
   beyond it linear in |lat| from `equatorDeciC` at the tropic to `poleDeciC` at 90° (the explicit pole input, item
   138 (c)); on land T = T_sea − `lapseDeciCPerKm` × (dem ÷ 1 000 m); on water T = T_sea. Stored `tempDeciC`.
3. **Continentality:** `continentality` = clamp(distance to the nearest ocean cell ÷ `continentalityReachKm`, 0, 1)
   (the coarse grid's true distance transform, V13 §3.5.5).
4. **The seasonal curve** (per cell: mean, amplitude, phase): amplitude A = `seasonAmpMaxDeciC` × sin(|lat|) ×
   ((1 − `seasonContinentalShare`) + `seasonContinentalShare` × continentality); phase = `phaseWeekNorth` for lat ≥ 0,
   `phaseWeekSouth` below. The temperature at week w is T + A × cos(2π (w − phase) ÷ 52) — the formula every reader of a
   seasonal state uses (V13 §3.12.4; the host's calendar reads `week` as §4.11's). Stored `seasonAmpDeciC`,
   `seasonPhaseWeek`.
5. **Winds.** Each coarse row takes the wind band holding its latitude (`winds`; a world's recipe may override):
   `windCdeg` the band's bearing, `windStrength` its strength. The frame's `Terrain.wind` on a placed frame is this wind
   rotated into frame terms (V13 §3.11.5).
6. **Precipitation by the wind march.** For each band, parcels march along the wind's direction across the coarse
   raster: a parcel starts at the upwind edge with moisture m = 0 plus a jitter drawn once per start row on
   `world.climate` (keyed by the row; ± 10 %); at each water cell m += `pickupPerCellOverWater`; at each land cell the
   drop is d = `dropShare` × m + `orographicPerM` × max(0, rise) × m (rise the dem gain from the previous cell, in m),
   plus `coastalBonus` at the first land cell after water; a rise of `barrierM` or more in one step dumps the whole
   parcel; a cell with `tempDeciC` below the permafrost threshold (V13 §2.3's matrix override) receives half its drop; the
   cell's `precipMm` += d; m −= d. A diagonal wind marches along the nearer axis then the other, alternating, so every
   cell is visited once per band. Results clamped to `rainCapMm`. The march with an orographic drop and a rain shadow is
   the reference's mechanism in its own words (`research/fmg/FMG-survey.md` §"The physical pipeline", *Climate*, as
   evidence; its axis-aligned winds and unspecified 0–255 scale are what the arbitrary bearing and the mm/yr unit
   replace).
7. **Evaporation:** `evapMm` = `evap.baseMm` × clamp((T − `zeroAtDeciC`) ÷ (`fullAtDeciC` − `zeroAtDeciC`), 0, 1).

*Derive-only mode* (the import): with `tempDeciC` and `precipMm` given, W3 runs steps 1, 3, 4, 5 and 7 only. *Output:*
the climate raster; each cell's reason names the band and the parcel's moisture at arrival. *Edges:* a world with no
water cell receives only the start jitter's moisture — a desert — and is reported; a `latBox` crossing the equator gives
both hemispheres' phases.

### 3.5 W4 Regional hydrology

The site package's mechanism (§2.3's *The hydrology grid* and *Flats*, §4.2 S1 (3)) run at the world cell size on the
fine dem — the lifted core of `@plat/world/hydro` (BCR-V13-1), the same functions `@plat/site` calls, so the world's
flood and the frame's are one implementation (J-V13.9).

**3.5.1 Flow.** The priority flood fills every depression not a lake (lakes keep their surface as a flat at the spill
height), the two-gradient flat resolution writes `flatRank`, D8 in the fixed neighbour order E, NE, N, NW, W, SW, S, SE
writes `flowDir` on every land cell (frame and margin have no meaning here: the extent is the world), ties broken as
§2.3 states; the border is an outlet (an off-map exit). The filled levels go into the drainage arrays only, never into
`dem` (§7.3 (a) 2's rule), so a hollow the recipe dug stays a hollow and drains to its spill.

**3.5.2 Accumulation, discharge, lakes.** Runoff per cell r = `runoffShare` × max(0, `precipMm` − `evapMm`) × cell area
÷ `secondsPerYear` ÷ 1 000 (m³/s; a 1 km cell at 800 − 500 mm gives 0.0043 m³/s); `flowAccum` is the cell count and the
discharge the running sum of r downstream along D8 in descending `flatRank`-ordered height (one pass). A lake's inflow
is the sum of the discharge entering its cells; its `open` and `subtype` are V13 §3.3 (3)'s; an open lake passes its
inflow less evaporation on from its spill cell (the outlet), a closed lake passes nothing. The **carve**: where a reach
(below) runs, the dem under its course is lowered to a monotone bed by the site package's rule (§4.2 S1 (3): the bed
descends to the outlet, capped at the row's `carveMaxCm`, here `world.hydro`'s companion cell 600 cm; a cell that would
need more keeps the flood's level and is reported `W_WORLD_SINK_UNRESOLVED`), each cell's cut recorded in
`carveDeltaCm` (item 140 M2); D8 is recomputed on the corridor cells and their neighbours and accumulation once, as S1 (3)
does.

**3.5.3 Reaches.** A **reach** is a maximal D8 chain of cells whose discharge ≥ `riverMinM3s`, cut at every confluence
(a cell receiving two such chains: the larger-discharge chain continues, the smaller ends into it as `to`), at a lake
(the chain ends `to` the lake; the lake's outlet starts a new reach `from` the lake) and at the sea or the border (an
exit). Its `course` is the cell centres smoothed by `chaikinPasses` Chaikin passes (the ends fixed); its per-vertex
`dischargeM3s` the cell's; `widthCm` = 100 × `width.a` × Q^`width.b`, `depthCm` = 100 × `depth.c` × Q^`depth.f`
(hydraulic geometry: the downstream relations' exponents are public, the coefficients ours); its `stageSurface` a
`WaterSurface` of kind `reach` whose `elevationCm` at each vertex is the carved bed + `depthCm` (bankfull); `navigable`
by `navigableM3s` at its downstream end; `mouth` by V13 §2.3's rule where it ends at a sea or lake; `exitHeadCm` at a
border exit. A **delta** splits the last `deltaReachKm` of the course into 2–3 distributaries by the site package's
delta rule at world scale (§4.2 S1 (3) *Mouths*; the shares drawn on `water.delta` keyed by the reach, the one draw of
W4); an **estuary** widens the width profile linearly over the last reach to `estuaryWidenShare` ×. Names come from W9.
The reach's reason names its source cell, its discharge inputs (precipitation, evaporation, runoff share, area) and the
width law's cells.

**3.5.4 The groundwater field and springs.** Over the fine grid: every surface cell (sea, lake, reach course cell) is a
source at its surface's elevation; a multi-source Dijkstra (the kernel's bucket queue) spreads outward over land cells
with the edge cost = the step's length in m × g(cell), g = `gradientBase` × (`precipMm` ÷ `precipRefMm`) ×
`permeability[geology]`; the table at a cell = min over sources of (source elevation + accumulated rise), capped at
dem − `minDepthCm`; on an `impermeable` cell the table is min(that, dem − `perchDepthCm`) (the perched table; a world
with no impermeable cell never reads it, and a frame whose charter's geology mode is not impermeable reports
`W_GW_PERCHED_IGNORED` when its own geology op says otherwise). `source[cell]` records the winning source cell (the
clerk's "set by the river's surface 40 m away"). **Springs:** a land cell that is no surface cell, whose table ≥ dem −
`springMarginCm`, whose `flowAccum` ≥ `springMinAccumCells` and whose `flowDir` leads downhill is a candidate; candidates
are thinned to one per `springSpacingM` in descending (table − dem), ties by cell index; each spring's `flowM3s` is the
discharge of its cell. The field costs what accumulation costs (one queue pass over the land cells). The frame-scale
field is the same function over `Terrain.hydro` (V13 §3.12.3). The rule — a table rising inland from the nearest
surface by recharge and permeability, capped by the ground, perched where the rock says — is the proposal's
(`proposal-hydrology-water-state.md` §2 (3)) stated here once in full; the reference has no groundwater
(`fmg-physical-pipeline.md` §3.12 as evidence of the gap).

**3.5.5 Distance fields and watersheds.** `distToShoreM` and `distToRiverM` are true Euclidean distance transforms
(the two-pass method over the fine grid, in metres); `watershed` labels every land cell with the id of the `Watershed`
whose outlet its D8 path reaches (a sea cell, a lake, or a border cell — an `edge` basin with `exitHeadCm`), its
`areaKm2` the cell count × the cell area.

*Output:* the drainage arrays, `carveDeltaCm`, the reaches and their surfaces, the lakes' `open`, `subtype` and
`outlet`, the watersheds, the groundwater field, the distance fields. *Edges:* a world with no land has no reach and no
spring; one land cell is one basin draining to the sea; a reach of one cell (a spring at the shore) exists when its
discharge passes the threshold; a dem all at one height (a flat) resolves by `flatRank` to its border, as §2.3's flats
do; the ladders are V13 §3.16's.
