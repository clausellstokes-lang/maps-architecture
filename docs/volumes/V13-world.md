# Design volume 13 — The world: the world regime, placement and hydrology

> PENDING FABLE REVIEW — written by the session's architect seat volumes/architect-V13 under the owner's delegation (J339; the owner, 2026-10-16: "i defer all decisiosn to you"); covered by the whole-design retrovalidation (J84).

> **Revision 1 — 2026-10-17** (lane volumes/revise-V13, against `docs/volumes/critique/V13.md`'s sixty findings; the
> disposition table is appended to the critique). Changed by finding: C13-01 the datum, wind and sun are derived
> readings through `worldRef`, no placement writes a hashed field (§2.2, §2.6, §2.7, §3.0, §3.11.5, BCR-V13-2, -13,
> T-V13-2); C13-02 §3.14.3 is the reference's eighteen model-drift rows, each an edit, a recomputation and an assertion
> (T-V13-21, T-V13-21b); C13-03 only a world-sourced charter enters `Recipe.charter` (§3.11.4, §2.6, BCR-V13-4); C13-04
> `requestCharter`, `frameOf(size, aspect)` and `bindPlacement` make world-first executable (§3.11, §4.1, §4.3); C13-05
> position-keyed noise on placed frames (BCR-V13-29), margins may overlap, the deviation recorded (§3.11.4, §12);
> C13-06 one import statement in §3.15, §2.8 pointing at it (J-V13.48); C13-07 one `ReasonRecord`, raster facts per
> chunk, `whyCell` on demand, the world's own commit record (§2.2, §2.7, §3.0, §4.7; J-V13.49); C13-08 dossier facts are
> hard placement constraints with `refuse.charter.dossier` (§3.11.1, §3.11.4; J-V13.50); C13-09 – C13-40 and the minors
> as the disposition table records, section by section; §5.7, §10.2 (requests to V14), §12's parity and deviation
> tables and §13's fix list are new.

> **Reconciliation r0 — 2026-10-17** (lane volumes/reconcile-V13-r0, against
> `docs/volumes/critique/seam-world-sites-r0.md`, under the session's rulings as chief architect, each a J-V13 row).
> Changed by seam id: SW-01 V13 owns the `SuitabilityTerm` slot and `terms.register`, keeps its eight generic terms,
> drops its copies of V14's purpose-term formulas; the term is `destination`, the cell `reach.siteKm` (§2.2, §2.3,
> §3.7, §1b.2, R-V14-3; J-V13.51); SW-02 §5.7 supplies the world's drawables with their `ZDecl` rows only (R-V14-7;
> J-V13.52); SW-03 no random or jitter term in siting; one deterministic tie-break stated in §3.7 (6) (`world.siting`
> reserved; J-V13.53); SW-05 the transient, record-less `charterFor` for a crop frame (§1b.2, §3.11.4, §6 `WORLD-9`,
> R-V14-9; J-V13.54); SW-06 `WaterSurface.kind 'site'`, the walk over `site` parts and vertical links, `setSurface`
> folding `floodSite`/`drainSite` (§2.2, §3.12.6, §3.13.1, §4.1, R-V14-10; J-V13.55); SW-07 the world event index
> `WorldEvent` from the host (§2.2, §2.4, §2.5, §2.6, §3.11.6, §4.1, BCR-V13-11; J-V13.56); SW-08 `Glyph` generalised,
> the site's marks through `glyphOf`/`world.glyph` (§2.2, §3.10, §5.1; J-V13.57); SW-09 culture from the host or the
> recipe, never V14 (§2.2, §2.6, §3.9, §1b.1; J-V13.58); SW-10 the `placed` outcome row, no call into V14 (§3.11,
> §3.11.5, §1b.2; J-V13.59); SW-11 a site's placement lives in the world document (§2.7, §3.11; J-V13.60); SW-12 world
> points are integer `WorldPointCm` everywhere (§2.1); SW-13 one union text for `Recipe.product` and
> `StrategyRegistry.products`, BCR-V13-7 fixed (J-V13.61); SW-14 M-W0h after M4 (§8.1, §8.2, BCR-V13-19, -21;
> J-V13.62); SW-16 W7 triangulates in integer metres (§2.1, §3.8, T-V13-39); SW-17, -18, -19, -20, -22, -23, -24, -25,
> -27, -29, -30, -31, -32, -33, -34 as the seam's resolutions read.

> **Realm review m — 2026-10-17** (`docs/AMENDMENTS-2026-10-17m.md`, items 659–779; the review of the host's
> simulator against this volume, `research/sf/fp-realm-review.md`, cited as evidence only). Changed: the port replaces the
> host's capture of the reference generator and never its frozen distance record; it has two feeds (the simulator's
> `canon`, the map's presentation products), recorded and presentation inputs, windowed replaces and one consumption law
> (§2.2, §3.11.6); the scale is a declaration (§2.1); time is effort under the host's travel law, never weeks (§2.2,
> §2.3); routes lay the host's genesis network and mirror its lived changes (§3.8); W8 is two partitions — W8a the seat
> territory, W8b the sway projected from the host's political facts under the owner's territory rules (T1)–(T3) and J382
> (§3.9); the forced-fact precedence by stamp and politics never re-emitting a charter (§3.11.4, §3.11.5); seasons on
> the host's calendar (§2.3); audience, places and edits under the host's decree law (§2.1, §2.2, §4.1); the import of
> the host's own snapshots (§2.8, §3.15); the host's track as an ordered list (§8.5); J-V13.63 – J-V13.82; Q1, Q2 and Q4.

> **Lens design n — 2026-10-17** (`docs/AMENDMENTS-2026-10-17n.md`, items 780–837; the session's rulings J384 and J385
> under the owner's "i leave all judgemtn to you"; `research/sf/lens-implications.md` and the six system reads cited as
> evidence only). Changed: the sway reads prosperity relative to the realm's held median rung, and its size and
> prosperity factors are log-linear (§2.3, §3.9 (7)); the push between adversaries defers to the host's own strength
> order (§2.2, §3.9 (8)–(9)); a raid carrying the host's outcome word is a verdict (§3.9 (11)); satellites arrive with the
> polity facts, drawn at their frozen site points and out of their parent's size (§2.2, §3.9 (12)); the lens mechanism
> (§5.8) and its eight lenses in the ruled build order, plague first (§5.9), with their records, rule table, plates
> (a cache of their own, BCR-V13-38), budgets, tests, codes and milestone M-W5; the host-change list made the design's one list and extended by a native
> world canonized at birth and the lenses' asks (§8.5's H22 – H30); the realm review critic's fifteen gaps closed
> (§2.2, §3.8, §3.9, §3.11.5, §3.11.6, §8.2, §8.5, §10, §11, §12); J-V13.83 – J-V13.99.

> **Lens completeness o — 2026-10-17** (`docs/AMENDMENTS-2026-10-17o.md`, items 838–877; the lens design critic's
> fourteen gaps, `docs/validation/coherence/lens-n-critic.md`; the session's rulings J386 under the owner's
> delegation). Changed: the trade lens draws each settlement's production, needs, exports, imports and services and its
> food coverage — the owner's own words (J380) — keyed by the host's goods catalog, with its finite stocks, throughput
> and entrepôt records on the canon (§2.2, §5.9 (4)); the religion lens draws each deity's local standing, the host's
> realm rank of its deities, suppressed creeds (the DM's only), patron falls with their cause, rank arcs, adopted and
> imposed rites and the pilgrim catchment (§2.2, §5.8 (7), §5.9 (6)); every host fact a lens leaves undrawn is listed
> under it with its reason (§5.9); culture, danger and calamity recorded as later lenses (D-V13.8); the host asked to
> canonize every new campaign on a world from this module at its birth, whatever its tier (§8.5's H22, §11; J386); a
> host fight verdict's hold band alone breaks a debatable tie while the military term is dark, a band crossing then
> widening the revision's dirty box (§3.9 (10), (11), (13), §4.3, §5.1, §5.9 (2); J386); the culture measure stated in
> its plain form (§3.9 (6)); the player picture's words (§5.1); the lens controls hosted by V09 (§5.8 (1),
> BCR-V13-39); M-W5 carrying the DM-placed site offers (§8.2); T-V13-7, T-V13-41, T-V13-47, T-V13-50, T-V13-54 and
> T-V13-55 extended and T-V13-56 added; J-V13.100 – J-V13.105 and D-V13.8.

**How to read this volume.** It builds, to implementation depth, the subject the base (`docs/ARCHITECTURE.md`, with files
f and g applied, and file j's items 131–141 as the owner's rules of 2026-10-16: `docs/AMENDMENTS-2026-10-16j.md`) carries
nowhere yet: a world regime of its own, the placement of settlement frames in it, and water as a consequence system at
both scales. The implementer holds the base and this volume and nothing else (§17.1): the three proposals of
`docs/design/` and the research under `research/fmg/` are SOURCES this volume restates in full and cites as evidence
only, never as an implementer's reference. Every fact the base or another volume states is cited, never restated; every
new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n` is a design volume's
section, this one included (`V13 §3.4`); `item n` is an amendment item — items below 200 the owner's rules (items
131–141 file j's), items 659–662 likewise the owner's rules (file m's head: the territory rules (T1)–(T3) and J382),
and every other item 200 and above an amendment file's change item (file f's onward); `J-VI.n` is a volumes-integration decision
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
| **W-ROUTES** W7 | `@plat/kernel`'s `delaunay` and path search (§3.1) | `WorldRoute` records: on a standalone world the Urquhart neighbourhood graph per landmass under the cost law, ports as the final reachable water body, sea routes; on a host-bound world exactly the host's genesis edges and lived changes laid as geometry, with time stations | 3.8 |
| **W-POLITY** W8 | — (new) | W8a the seat territory (`Territory`: the host's total nearest-seat partition with its crossings, frozen, in the canon) and W8b the sway (`Sway`, `Allegiance`, `MarchHold`, `PatrolCadence`, `SwayRevision`: the host's political facts projected over the terrain, revisioned only on dated host facts), normalized borders, poles of inaccessibility; provinces on a standalone world | 3.9 |
| **W-LABELS** W9 | §9's label records, S13b's placer | world label candidates and the `SettlementGlyph` with its level table | 3.10 |
| **P-PLACE** P1–P5 | §2.9's `Document`, §2.8's identity, §4.2 S1 (BCR-V13-2 – BCR-V13-5) | `Placement` records, the coherence cost and the nearest lawful placement, the blend band, the local drainage re-run, the `FrameCharter` emitted both ways, the precedence stamp, the mirror edit | 3.11 |
| **H-STATE** the water state | §2.3, §2.6's water-table paragraph (*Basements*), II.6's condition table, V04's closure states (BCR-V13-2, BCR-V13-3) | surfaces as dated records at settlement scale, the frame's groundwater field, flood as a stage on a surface with barrier tops, historical and seasonal surfaces, underground water by connectivity, the water class test as the shared classifier V14 and V04 call | 3.12–3.13 |
| **H-EDIT** the two verbs and the cascade | §7.1, §7.3, §7.4 (BCR-V13-9, BCR-V13-10) | `EditBase.verb`, the trace records, the dependency-ordered cascade, the counterfactual fork, the reason records the clerk reads | 3.14, 4 |
| **W-IMPORT** the adapter | `@plat/port`'s adapter folders (§14) | `MapImport`: one existing map read once as data, version-pinned, its loss reported | 3.15 |
| **W-PORT** the world port | §7.7's port, §11.4's fifth door, V08's host client (BCR-V13-11; 779) | `WorldPort`: the simulator feed (`canon`: the travel, water and sites slots, integer, versioned per slot) the host builds its own frozen record from at its receipted re-canonize; the map feed (the settlement map record, the drawn products, paths, places) for the host's map surfaces; recorded host inputs as windowed replaces; presentation inputs; the charter per campaign | 3.11.6, 5.4 |
| **W-VIEW** view, labels, exports | §8.1, §8.2, §8.4, §9, §11.1 (BCR-V13-12, BCR-V13-13) | the world map's styles and the glyph levels; the ecosystem-shaped full JSON, GeoJSON with the ecosystem's property names, the 16-bit heightmap image, CSV; the existing picture exports over the world | 5 |
| **W-LENS** the lenses | §8.4's layers (BCR-V13-13) and the base's live-layer registry; the world port's lens window (V13 §3.11.6) | one `LensLayer` per lens over the facts the host sends of its simulated systems — plague, the sway, patrols, trade, populations, religion, prosperity, alignment — each with its regime banner, legend, audience filter and time scrub; the plates in the world document's plate cache (BCR-V13-38) | 5.8, 5.9 |

### 1.2 The base hooks this volume consumes (cited, never restated)

| hook | where | how this volume uses it |
|---|---|---|
| `Terrain` (its `datumCm`, `heightCm`, `hydro`, `flowDir`, `flatRank`, `flowAccum`, `outfalls`, `seaLevelCm`, `wind`, `geology`, `mining`), `HydroGrid`, `TerrainSampler`, `WaterBody` (its `course`, `controls`, `widthProfile`, `depthCm`, `flowFrom`, `flowTo`, `spring`, `bankKinds`, `shoreClass`), `Outfall` | §2.3 | the frame's records the charter feeds and the water state reads; `datumCm` and `wind` go behind one accessor each (`datumOf`, `windOf`), whose placed reading is derived through `worldRef` and never written by a placement (BCR-V13-2; C13-01); the water bodies gain their `WaterSurface` (V13 §2.2) |
| the hydrology grid's mechanism — the bucket-queue priority flood with exact flats, the two-gradient flat resolution, D8 in the fixed neighbour order, accumulation | §2.3 *The hydrology grid*, *Flats*; §4.2 S1 (3) | run unchanged at the world cell size by W4 (V13 §3.5) and by the frame's local re-runs (P3, the cascade); lifted into `@plat/world/hydro` with its tests (BCR-V13-1) |
| the basement's water table — the nearest body's surface plus a freeboard, else the drainage line's height | §2.6 *Basements* (SW-23) | replaced by the groundwater accessor `waterTableAt` (BCR-V13-3; V13 §3.12.3); the freeboard and the three basement-gate cells stay §10.2's |
| S1's heightfield, coast routine, rivers by descent, the carve capped at `carveMaxCm`, mouths, islands, crossing sites, bank classes, land components, outfalls, resources, the geology flag and mining | §4.2 S1 (1)–(10) | S1 takes the charter as its one input record and refines inside it (BCR-V13-4; V13 §3.11.4): the edge profiles constrain (1), the water edges and crossings (2)–(3), the roads (S3 (4)'s requested bearings), the climate scalars S0's climate row; the carve keeps its delta (V13 §2.2); every other step is unchanged |
| S0's site request, auto features, the sewer feature; `Blueprint` | §4.2 S0 | a placed frame's S0 resolves `coast`, `river`, `lake`, `oasis`, `relief` and `geology` from the charter, never from the feature table, except that every dossier-tier value (DR1, DR29) wins and the placement is constrained to it (V13 §3.11.4; C13-08); S0's size step is the pure `frameOf(size, aspect)`; a standalone frame as before |
| the stage graph, `StageDecl`, `phase`, the tail, declarations read ahead | §4.1, §4.12 | the world pipeline is a product's stage set run on its own document (V13 §3.0); the placement step runs on the world document between the two regimes |
| `ProductDecl`, `StrategyRegistry.products`, `LadderRouter` | §4.12 (item 202), V07 §2.1 | the `world` product registers W0–W9 (W6a, W7a, W6b, W7b among them); the placement operators are §7.3 local operators under one stage id `WORLD_PLACE` (BCR-V13-7; C13-27) |
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
| the dossier contract, the derivation rows (DR1, DR3, DR19, DR29, DR40 among them), the port, `HostContext`, the never-read list | §7.7, §14 | the world port replaces the host's capture of the reference generator — never the host's frozen distance record, which stays the host's engine state, built by the host from the port's `canon` at its receipted adoption and read by nothing of the map (V13 §3.11.6's consumption law) — and the charter per campaign lands; the never-read list binds the dossier door, the world port's recorded inputs being §11.4's fifth door with their own closed key list (BCR-V13-11; 779, 777); DR1's site request reads the charter on a placed frame |
| layers, `LayerSpec`, the lighting model's slab list and sun | §8.4 | the `world` layer (BCR-V13-13); the sun's latitude and bearing from the placement (V13 §3.11.5) |
| style sheets, programs, the `states` rows | §8.2 | the world map's rows (V13 §5.1) |
| the display list, LOD, tiles, zoom stops | §8.1, §8.5, §8.8 | the world map's bands and the glyph's levels (V13 §5.2) |
| labels, candidates, S13b, furniture, the compass | §9.1–§9.5 | world labels (V13 §5.3); the compass derived from the placement (BCR-V13-16) |
| the export formats, the `.dd2vtt` profile, knowledge in exports | §11.1 | the ecosystem-shaped exports and the world's rows in the existing formats (V13 §5.4; BCR-V13-12) |
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
| V08's map record, host client, digest additions (`site.latitudeDeg`, `presentWeek`), `PortValues` | V08 §2.1, V08 §2.2, V08 §2.5 | the port's additions for the world (V13 §3.11.6); DR29's latitude stays the dossier's on a dossier-bound frame, the placement's a reported difference (V13 §3.11.4, C13-08) |
| V05's own `Terrain` per island | V05 §2.1 | a sky island's terrain takes no charter and no placement of its own (V13 §1.4) |
| V07's village rungs | V07 §2.1 | a village frame is placed as a town frame is; the glyph's tier rows cover THORP … METROPOLIS |
| V10's `WhyProvider`, `WhySectionProvider` | V10 §2.13, V10 §3.9 | V13 §4.7's providers over the reason records |
| V11's registry, the `ClimateTable`, `ClimateRow.seasons` | V11 §3.1, V11 §2.8, V11 §3.25.6 | the charter's climate scalars pick the frame's climate row (V13 §3.11.4); V13 §2.3's tables join V11's registry |
| V12's register, `CalibrationEntry`, the no-op pins | V12 §2.6, V12 §3.7.8, V12 §3.11 | every calibratable cell of V13 §2.3 registered at its step (V13 §8) |
| V14's `WorldSite`, `SiteAnchor`, the encounter crop, the 2.5D view | V14 (its §2, §3) | V14 consumes `FrameCharter`, `Placement`, the suitability score, the water class test and `ReasonRecord` (V13 §1b); 2.5D is V14's R1–R4 over V13 §5.7's drawables (SW-02) |

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
  position and the seed (V13 §3.11.4's refinement rule: on a placed frame S1's fBm lattice is position-keyed on the
  world's seed and the cell's world position, BCR-V13-29, and margins may overlap, so neighbouring frames agree in the
  margin they share — a declared deviation until that base request lands, V13 §12); (d) edits stored at the scale they were made (V13 §3.14's scale rule: a fine edit never
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
  T-V13-22); M5 "S1's terrain and water parameters as one input record (the charter's landing)" — the charter as
  `Recipe.charter` (BCR-V13-4; T-V13-23; the base's "site" and S1's `SiteRequest` are never redefined, SW-34); M6 "a placement record reserved per arena set" — `Placement` (V13 §2.2; T-V13-24). M1
  (the namespace segment) and M8 (a reason record per generated fact) are shared with V14 and declared here (V13 §2.5,
  V13 §2.2); M7 (the anchor record) is V14's. K12 (the commit journal records stage, concern and inputs read) is the
  primitive V13 §2.2's `ReasonRecord` reads.
* **Item 141 (2.5D)** is V14's (R1–R4); this volume adds the world map as a flat view and states in V13 §5.7 what the
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
* **The owner's territory rules (2026-10-17; file m items 659–662).** (T1) "also your thoughts on territory borders  which
  FMG does have some inclusion on inclusive and expanded with our new emergent persistent encounter map work where it is
  occupied by a settlement power or military, and vassals and the likes?" (T2) "and territory has an upper limit per
  individual settlement that expands bounded but exponential to the size, tier, prosperity, relative distance and dynamics
  of neighbors and contnious chain of vassals." (T3) "and of course military strenght to enforce. where two hostile
  neighbors fight regarding the march. still having the cieling that you described but where contested, this also becomes
  part of the tie breakeralso there should be patrols". And J382, the owner's "yes" to culture as a resistance and the
  sea as cheap carriage. Obeyed by W8's two partitions (V13 §3.9): W8a the **seat territory**, frozen, the host's own
  meaning of the word and the substrate of its distances; W8b the **sway**, a projection of the host's political facts
  (`PolityFacts`, V13 §2.2) over the terrain, never a fact the map owns — each seat's reach bounded but exponential in
  tier, size and prosperity (the rung read relative to the realm's median, J384 (1)), decaying with travel time and
  capped per tier (T2's limit; V13 §3.9 (6)–(7)); culture
  slowing the projection by the host's own culture distance, and water carrying it cheaply only along the host's lit
  water lanes, to a coastal lodgement and never the whole far shore (J382; (6)); neighbours weighed by class with a
  debatable land between adversaries, the push between them the host's own strength order (T2's dynamics; J384 (3);
  (8)); a bounded bonus along a continuous chain of vassals, with
  exclaves where the chain breaks (T2's chain; (9)); military strength the tie-breaker inside the debatable land only and
  never above the ceiling, garrisoned sites as held points, armies presence only (T1's "occupied by … military", T3;
  (10)); fights over the debatable land as dated hold bands and a fighting overlay (T3; (11)); occupation an overlay,
  never ownership (T1; (12)); patrols as a derived cadence per route segment and power (T3; (14)); and the encounter crop
  reading all of it at its point and week (T1's encounter clause; V14's E1 (4) and E4 (b)).
* **The owner's lens requests (2026-10-17; file n).** "can you also make a similar toggle lens regarding religion and
  religious conversion? what are your thoughts on that?" (J379); "note how we have local and global diety rankings and a
  global piety system and how religion conversions move between settlements" and "now can you also do the same for alignments; the
  flow of trade/caravans based on individual imports, exports, production, consumption, of goods and services; and flow
  of populations?" and "and prosperity" (J380); "and plague" (J381); and "i leave all judgemtn to you" (J384), the
  owner's answer to the thirteen lens and territory questions, ruled by the session and vetoable. Obeyed by one lens
  mechanism (V13 §5.8) — a derived layer with its regime banner, its legend, its audience filter and its time scrub over
  plates — and its eight lenses in the ruled build order (J384 (8); V13 §5.9): plague first, then the sway (the
  owner's territory) and patrols, trade and populations, religion, prosperity and alignment. No lens invents a fact
  (four classes of host mark, V13 §5.8 (4)); a lens in its still regime — as the prosperity and religion lenses are on
  a born campaign — shows still, with the regime and the reason, never hidden (J384 (13)); no
  player sees derived alignment (J384 (7)); holy places and hidden cult sites enter only as DM-placed world sites
  (J384 (10); V14 §2.2); the columns the host's own overlay hides are drawn, DM-only (J384 (12)); the scrub reads plates
  kept in the world document's plate cache (J384 (9)); faith gets no sea carrier (J382 (c)); and the sway takes J384 (1)–(5)
  and (11) (V13 §3.9). The trade lens's first rows are the owner's own words — each settlement's production, needs,
  exports, imports and services and its food coverage, as the host's dossier judges them (V13 §5.9 (4)) — and the
  religion lens draws the host's local and global rankings and its piety: each settlement's mixture with each deity's
  local standing, the realm's rank of its deities by tier and seats, and its realm piety (V13 §5.9 (6)).

### 1.4 Out of scope, with the reason

* **World sites, encounters and the 2.5D view** are V14's: the site card, the admissibility table, the request record,
  the unit graph and its embedding, the encounter crop, the VTT crop scope and grid origin, and the projection family.
  This volume gives V14 its hooks — the charter, the placement, the suitability score with its destination term, the
  water class test and `ReasonRecord` — and reads nothing of V14's but `WorldSite` positions as a suitability input
  (V13 §3.7) and a site's `Placement` as a world fact (`WorldFacts.sites`, V13 §2.4; SW-20).
* **The host's political facts** — factions, cultures, states' diplomacy and forms, religions, military, zones, the
  economy cycle, lore — are the host's (item 131 (b); item 138 (d)); this volume materializes their spatial footprint
  from the political facts the host sends per advance window (`polity(world, window, PolityFacts)`, V13 §3.11.6: seats
  with tier, size, prosperity and banded military; links in the host's subordinating words; occupations; pairwise
  relations; held sites; satellites at their frozen site points; its lineage claims while that lane is lit; its strength
  order; banded culture distances; lit water lanes; road watches) and invents none: no budget, cost
  vector or power key is asked of the host, no allegiance is an entity of the map (one is named only by the DM's
  christening, sent by the host), and on a standalone world the recipe's seats project at their tiers (V13 §3.9).
* **The host's simulated systems** — its plague, its trade, its populations, its faiths, its prosperity and its
  settlements' alignment, beside the political facts above — are the host's: this volume simulates none of them and
  draws them only as lenses over the facts the host sends each advance (V13 §5.8, §5.9), inventing none — no field over
  land, no motion without a host clock, no effect the host does not apply, no meaning it does not compute (J-V13.89).
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
* **The host's own changes** (item 138 (e); the proposal's §6, superseded) are the host's program: this volume states
  the contract the host implements (`WorldPort`, the charter per campaign, the settlement map record), the ordered list
  of what the host changes, each with the milestone it waits on (V13 §8.5), and the owner's questions (V13 §11 Q1, Q2,
  Q4); nothing of the host's code is designed here.
* **Label placement** (S13b), the font metrics and the knowledge filter are §9's; this volume adds the world's label
  candidates and the glyph (V13 §5.3).
* **The host's simulator and its program rules.** This volume is a map-family volume outside the host's own program
  corpus: it binds at the port what the host's rules require of a map engine — a stated tier line and degraded arm for
  every optional host read of a canon slot, measured bands or UNMEASURED cells, the canon's `causes` as parents the host
  may record, one word one meaning across the seam (V13 §3.11.6's law (9)), the lifecycle of the adopted canon and of
  every bound route record, the host's retention for host facts — and designs nothing of the simulator, which reads
  map-derived facts only from its own frozen record (V13 §3.11.6's consumption law). A **phantom** of the host (an actor
  with a home and a record but no simulated settlement) is never a seat, never placed, never projecting, patrolling or
  contesting; its acts arrive as off-stage events at its home. **Sight, air and teleport** are readers and marks, never
  edges the map invents: `@plat/world/sight` (a viewshed and intervisibility over the DEM with the earth's curvature and a
  refraction coefficient of 0.13; read by V14's site coverage, V13 §3.9 (14)'s detection and beacon chains),
  `aerialLegs(world, seats)` for named seats, fed only to a canon whose envelope names this world, and the host's
  teleport circles drawn as marks with no link.
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
| `WorldRaster` — `dem` (Int32 cm against the world datum), `carveDeltaCm` (sparse), `flowDir`, `flatRank`, `flowAccum`, `watershed`, `biome`, `landUse`, `geology`, the climate raster (`tempDeciC`, `seasonAmpDeciC`, `seasonPhaseWeek`, `precipMm`, `evapMm`, `windCdeg`, `windStrength`) and the fine→coarse index map | W1 (dem, carve delta, the index map), W4 (flow, accumulation, watershed), W3 (the climate raster), W5 (biome, land use), W1's geology op (`geology`); `culture` from the host's seats or the recipe, spread by W8 (SW-09) | W2, W4, W5, W6, W7 (the cost surface), W8, W9; P1–P4; the charter; the port; the view; the exports; V14's G3 siting and E1's `worldFactsAt` | V13 §2.2 |
| `WaterSurface` (sea · lake · reach; `elevationCm`; `date`; `open`; `subtype`; `outlet`; `body`) | W2 (sea, lakes), W4 (reaches' stage), `setSurface` edits (dated), V06's `terrainWater` ops at an epoch, the adapter | the water class test; W4 (lake levels as spill heights); the frame's surfaces (the charter's `waterEdges`); the view (water at its level); the exports; V04's `flood` reading; V14's G6 | V13 §2.2; the frame's `Terrain.surfaces` (BCR-V13-2) |
| `Reach` (a world river reach: course, discharge, width and depth profiles, stage, basin, navigability, mouth kind, exit head) | W4 | W6 (discharge term), W7 (navigable reaches, river crossings' cost), W9 (river labels), the charter's `riverCrossings`, the port, the exports, V14's E3 | V13 §2.2 |
| `Watershed` (basin id, outlet, area, the off-map `exitHeadCm`) | W4 | the charter's `downstreamHeadCm`; the cascade's dirty set (V13 §3.14.2); W6; the clerk | V13 §2.2 |
| `GroundwaterField` (the table per hydro cell, the springs, the recharge gradient) | W4's groundwater step at world scale; the frame's groundwater step (V13 §3.12.3) at frame scale | `waterTableAt` (BCR-V13-3: the basement gate, V04's floors, V14's G6), the water class test, W6's spring term, S12a's well yield (§4.2 S1 (10) reads the ground class; the yield's table reads the depth), the view's spring pins, the exports | V13 §2.2; the frame's `Terrain.groundwater` (BCR-V13-2) |
| `FrameCharter` (frame in cm, datum, edge elevation profiles, water edges, river crossings, downstream head, roads, climate scalars, water table, biome, resources, territory, sites, `source`) | P4 (both directions): from the world at a world-first placement, from the frame and the blend at a settlement-first one; `WorldPort` writes the host's copy | S0 and S1 as the one input record (BCR-V13-4); the frame's `Recipe.charter` (BCR-V13-5); V14's G3 and E1; the port's per-campaign charter; the clerk | V13 §2.2 |
| `Placement` (subject, origin, bearing, `mirrored`, `precedenceStamp`, `coherenceCost`, `since`) | P1 (proposed), the `placeFrame` / `setPlacement` / `mirrorFrame` / `worldWins` edits (V13 §4.1); V14's G8 adoption moves a site's placement into its settlement's | the world↔frame transform (`toWorld`, `toFrame`, V13 §2.2); P2–P5; the glyph (W9); DR29's latitude and the orientation-dependent terms (V13 §3.11.5); the compass (§9.5, BCR-V13-16); the port; V14's free-standing site (its card's `placementRef`, V14 §2.2; SW-11) | V13 §2.2 (item 140 M6) |
| `PlacementAnomaly` (a reported impossibility under a lock) | P5 and the cascade | the clerk, the report, V09's panel | V13 §2.2 |
| `WorldRoute` (a graph edge: ends, mode, class or the host's grade, polyline, time stations, lay version, origin; bound: the host's edge key) | W7 — on a standalone world by its own selection; on a host-bound world laying exactly the host's genesis edges and lived changes (V13 §3.8) | the charter's `roads`, the port's `routes`, `routeFacts` and `mapFeed`, W6's economic stage, W9's labels, the view, the exports; V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |
| `Territory` (the seat territory, W8a: seat, coarse cells, refined crossings, border, pole, neighbours; provinces on a standalone world) | W8a from the bound seats, or the recipe's seats standalone | the canon's travel slot; the charter's `territory`; W8b (the culture term's home seat); W9's labels; the diagnostic `seatTerritory` layer; the exports | V13 §2.2 |
| `Sway`, `Allegiance`, `MarchHold`, `SwayRevision`, `SwayTrace`, `PatrolCadence` and the fine rasters `sway`, `swayStatus`, `debatableSides` (W8b) | W8b at a `polityRevision`, at most one revision per week (V13 §3.9 (13)) | `worldFactsAt` (`polity`), the charter's `polityAtCharter`, `polityOf`, the view's sway, debatable, occupation, fighting and patrol layers, the port's `mapFeed` and `patrolOffer`, V13 §3.9 (16)'s border-post proposals, V14's `territoryBorder` term, E1 and E4 | V13 §2.2 |
| `SettlementGlyph` (the generalization by level) | W9 for every placed frame; re-made by the frame's commit hook (V13 §3.10) | the world view (V13 §5.2), the exports' world layer, the port's thumbnail | V13 §2.2 |
| `SitingProposal` (a scored candidate site with its reason and its `WaterAccess`) | W6; V13 §3.9 (16)'s transient border-post proposals | the host (the port), V14's G3, the clerk | V13 §2.2 |
| `ReasonRecord` (M8; shared with V14) | every stage of this volume, per generated fact; the cascade; V14's stages | the clerk's `why`, `whatCaused`, `whatChanged`, `whatIf` (V13 §4.7); T-V13-10's missing-chain test | V13 §2.2; §2.8 (BCR-V13-17) |
| `WorldEvent` (a dated host event: battle, plague, fire, siege, raid; a point, or a pair placed by `borderSegment`; its place `WorldWhere`, week, window and resolved audience; SW-07) | the host through `WorldPort.events`, a windowed replace keyed by host keys (a dossier-tier fact), or a user's `addEvent` edit; never a stage | `worldFactsAt.recent` (V14's E1 world crop, the clerk, V09's hover); the view's `events` layer; `MarchHold` (the verdicts, a raid's outcome word among them); the lenses, by the lens tags the adapter folder's event table gives each event at fold (V13 §5.8 (1)) | V13 §2.2 |
| `WorldHeader` (unit, axes, origin, extent, geometry version) | W0; an extent `adjust` | the canon's envelope, the host's scale stamp, the exports' settings block (the world dialog's travel span is the map feed's, never the header's) | V13 §2.2 |
| `WorldCanon` (the simulator feed: the travel, water and sites slots, the version vector, the input hashes, the causes, the skipped list) | `WorldPort.canon` at a named log head | the host's builder of its own frozen record (its own derivations) | V13 §2.2; never persisted in the world (re-built on request; its hashes logged) |
| `TravelLaw` (the host's travel law as data) | `WorldPort.travelLaw` (a recorded input, the `world.travel` host slice); the default row standalone | `derivedTime`, the time stations, `timeDelta`, the world dialog's span, W8b's foot and army paces, the patrol cadence | V13 §2.2, §2.3 |
| `RouteLayRule` (`world.routeLay`) | shipped defaults; `editTable` | W7 | V13 §2.3 |
| `PolityFacts` (seats with their strength bands, links, relations, held sites, satellites, claims, culture bands, water lanes, road watches, christenings per advance window) | `WorldPort.polity` (a recorded input, a windowed replace) | W8b; the patrol cadence; the sway, patrols, populations and prosperity lenses; the clerk | V13 §2.2 |
| `PolitySatellite` (a satellite of the host: its parent, tier and frozen site point) | `WorldPort.polity` | W8b's claim points (V13 §3.9 (12)); the sway layer's dots; the populations lens | V13 §2.2 |
| `LensLayer` (one per lens: identity, sources with their gates, regime words, elements with their fact classes, events, legend, refusals, why; V13 §5.8) | `world.lens`'s rows (V13 §2.3) and `@plat/world/lens`'s element functions | `lensAt`, `lensWhy`, the lens picker and the scrub bar (V09 hosts them; their behaviour V13 §5.8's, BCR-V13-39), the picture exports of a lens view | V13 §2.2 |
| `LensFacts` with `HostRegime`, `LensLink` and `LensGood` (the host's per-advance lens facts — among them each settlement's economy, its goods keyed by the host's catalog, and the realm's rank of its deities —, its resolved regime, each row's resolved audience; the DM's set and the party's believed set) | `WorldPort.lensWindow` (a presentation input kept as plates) | the plate fold; the lenses only — never a stage, the sway, an encounter or the clerk | V13 §2.2 |
| `LensPlate` (one per host advance: the window's lens facts and polity rungs, delta-coded) | the plate fold at each window; `pinPlate` (the DM's cache command) | `lensAt` at a week (the scrub) | the world document's plate cache (`Document.lensPlates`, beside `derived`: BCR-V13-38), outside every digest (V13 §2.7, §5.8 (8)) |
| `RouteGenesis`, `NetworkChange` | `WorldPort.genesis`, `WorldPort.network` (recorded inputs) | bound W7; the route layer; the frame's road rows at a week (`roadsAt`) | V13 §2.2 |
| `WaterAccess`, `SettlementPhysical` | W2–W5 sampled at a seat after the blend | the canon's water slot; the settlement map record; the host's own port verdict (its half) | V13 §2.2 |
| `WorldWhere` (a typed place) | the fold of a host event or a docket pin | `placeOf`, the hearing card's words, the `events` layer | V13 §2.2 |
| `TimeDeltaReceipt` | every dry run, route class edit and fork preview against the adopted canon; the next canon | the DM's dialog (`W_TRAVEL_BAND_CROSSED`), the host's re-canonize | V13 §2.2 |
| `HostGateRef` (an imported legacy world's host gates as world points) | the import (V13 §3.15 (3)) | `mapFeed`'s crossing holders for a legacy campaign | V13 §2.2 |
| `MapImport` (as data, from the ecosystem's full JSON export, version-pinned) | the adapter (V13 §3.15) | W0–W9 run over it as inputs; the import report | V13 §2.8 |
| the trace records `TerrainTrace` and `SurfaceTrace` (the old surface or ground under a *this happened* edit) | the two verbs (V13 §3.14) and V06's water ops | the view's trace projection (V13 §5.1), the clerk, `deleteTrace`; the history frames (V06 §3.15) | V13 §2.2 |
| `Terrain.carveDeltaCm` (sparse, per hydro cell) and `Terrain.surfaces` | S1 (3)'s carve, S1's water operator, the frame's W2-equivalent surface step (V13 §3.12.1) | the pre-carve heightfield reading (`preCarveHeightAt`), the re-route edit (bar 5), the water class test, the exports | §2.3 (BCR-V13-2) |
| `datumOf(doc)` (one accessor) and `Document.worldRef` | S1 (a standalone frame), P4 (a placed frame: `datumCm` = the world's DEM at the origin, V13 §3.11.4) | every reader of `Terrain.datumCm` (§2.3, §2.6, §8.4, §11.1); the world↔frame transform's z | §2.3, §2.9 (BCR-V13-2, BCR-V13-5) |
| `waterTableAt(doc, p, when?)` (one function) | the frame's `GroundwaterField` | §2.6's basement gate, V04's wet tests (`hallDryCm`, `flood` admission), V14's G6, the water class test, S12a's well yield | §2.6 *Basements* (BCR-V13-3) |
| the address namespace segment (item 140 M1) | the document's `namespace` at creation (V13 §2.5) | every address of a world, a frame or a site document; the merge rule (bar 7); V14's `SiteReach` (an access record's reach into a site document, V14 §2.3; SW-21) | §6.3 (BCR-V13-6) |
| `EditBase.verb` (`happened` · `alwaysSo`) | every terrain and water edit (V13 §4.1) | the fold (traces kept or the base rewritten), undo, the clerk | §7.1 (BCR-V13-9) |
| the tables `world.sizes`, `world.recipeOps`, `world.climate`, `world.hydro`, `world.groundwater`, `world.biomes`, `world.suitability`, `world.routes` (the host's cost law: a host slice and the default row), `world.routeLay` (the map's lay rules), `world.travel` (the host's travel law: a host slice and the default row), `world.polity`, `world.lens` (the lenses' rule), `world.labels`, `world.glyph`, `place.coherence`, `water.class`, `water.flood` (V13 §2.3) | shipped defaults; `editTable` (§7.6) | the stages named per table in V13 §2.3; V12's register | §7.6; V11's registry (new rows, V13 §2.3) |
| the stage warnings `W_WORLD_RECIPE_CLAMPED`, `W_WORLD_SINK_UNRESOLVED`, `W_WORLD_LAKE_BREACHED`, `W_PLACE_BENT`, `W_PLACE_NO_LAWFUL`, `W_PLACE_ANOMALY`, `W_BLEND_CLIPPED`, `W_SURFACE_NO_BODY`, `W_GW_PERCHED_IGNORED`, `W_IMPORT_LOSS`, `W_IMPORT_REPAIRED`, `W_CASCADE_TRUNCATED`, `W_TRAVEL_BAND_CROSSED`, `W_HOST_CANON_BEHIND`, `W_EDIT_DOSSIER`, `W_WORLD_HEMISPHERE`, `W_POLITY_CYCLE`, `W_POLITY_TWO_LIEGES`, `W_POLITY_CULTURE_ABSENT`, `W_POLITY_STRENGTH_ABSENT`, `W_POLITY_SATELLITE_UNPLACED`, `W_SWAY_LOCK_CONTRADICTED`, `W_IMPORT_SCALE_ASSUMED`, `W_IMPORT_LEGACY_BURG`, `W_IMPORT_PLACEMENT_UNVERIFIED` | the stages and steps named in V13 §3.16 and §7.5 | the report's `stages[].warnings` (§5.4), V10 | §5.4 (BCR-V13-18) |
| the lens warnings `W_LENS_REGIME_ABSENT`, `W_LENS_PLATE_GAP` | the lens fold and the scrub (V13 §5.8) | the lens legend, V10 — never the report's `stages[].warnings` (a lens is never a stage) | V13 §7.5 |
| the concerns `world.recipe`, `world.climate`, `world.resources`, `world.siting`, `world.polity` (reserved: W8a and W8b draw nothing), `world.patrol` (the patrol phase hash keyed by (segment, power), V13 §3.9 (14); no stream of draws; its row appended to the kernel's concern registry, BCR-V13-8), `world.labels`, `place.search`; the stage ids `W0` … `W9`, `P1` … `P5`, `WORLD_CASCADE` | the registry (BCR-V13-8) | every draw of V13 §3.17 | §6.1 |
| the view keys `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, `worldUnits` (the display unit of the scale bar and the distance labels; per viewer), `worldLens` (the lenses open and the picker's collapsed rows) and `lensWeek` (the week the lenses draw) | V09's controls | the world view's level (V13 §5.2), the trace projection, the dated surface drawn (V13 §5.1), the lenses at their week (V13 §5.8 (8)) | §2.9 (BCR-V13-5) |
| the register entries of this volume's calibratable columns (V12 §2.6's `CalibrationEntry`) | the seat landing each step of V13 §8 | V12's lint at each step's exit; the corpus stage at `M-CAL/world` (V12 §3.10.5) | §13.7, §13.9 |

### 1b.2 Stage outputs and interfaces

| output or interface | implementer | caller or consumer |
|---|---|---|
| `WorldStrategy.generate(recipe, ctx)` → the world's stage set W0–W9 | `@plat/world` (the `world` product's stages, each a `StageDecl`) | `generate` with a `WorldRecipe` (§11.2's `generate`, its `Blueprint` the world's, BCR-V13-5); the adapter after `MapImport`; a world `adjust`'s Re-derive from Wk |
| `WorldTerrainStrategy.terrain(recipe, ctx)` (W1) | `@plat/world/terrain` | W0's scheduler; the recipe-op edit's local re-run (V13 §4.3) |
| `HydroField` and `priorityFlood` (with its lake typing by threshold), `resolveFlats`, `d8`, `accumulate` (the lifted core, the site package's own names; C13-49) | `@plat/world/hydro` (lifted from `@plat/site/hydro`'s field, flood, flats, D8 and accumulation modules, same functions, same tests; the river's surface, trace, course and carve stay in `@plat/site/hydro` importing the field type; BCR-V13-1) | `@plat/site`'s S1 (3) unchanged in mechanism; W4; P3; the cascade's local re-runs at both scales |
| `groundwater.derive(field, surfaces, geology, precip, rules)` → `GroundwaterField` | `@plat/world/groundwater` | W4 (world scale); the frame's groundwater step after S1 (3) and after every water or terrain operator (V13 §3.12.3); `waterTableAt` |
| `classifyWater(unit, governing, thresholds)` → `WaterClass` and `routeClass(path, …)` → `RouteClass` (V13 §3.13) | `@plat/world/water` | V04 (every element's `flood` and the `hallDryCm` test, V04 §3.5.2, V04 §4.3's water-edit row), V14's G6 and E3, the frame's basement gate (§2.6), the flood overlay (V13 §5.1), the exports' `waterClass` property, the clerk |
| `charterFor(world, placement | transient)` → `FrameCharter` (P4, world-first; the transient, record-less form for a crop frame, V13 §3.11.4, SW-05) and `charterFrom(frame, blend)` (P4, settlement-first) | `@plat/world/place` | `requestCharter`, `setPlacement`, `worldWins`; the port's per-campaign charter; S0 and S1 through `Recipe.charter`; V14's E1 (4) (the transient form) |
| `surfaceSetDigest(doc, week)` → `Hash64` (V13 §2.7; SW-25) | `@plat/world/water` | V14's `waterStamp` and `WaterClassReport.stamp`; the flood overlay's cache key |
| the messages `world.glyph { doc; digest; marks }` (a frame's or a site's commit hook → the world) and `world.placed { placement; subject; extent; covers }` (P4/P5's outcome row → the application → `@plat/sites`; SW-10) | `@plat/api` | the world's glyph placing (V13 §3.10); V14's adoption (V14 §3.9 (e)) |
| `coherence(world, frame, origin, bearing)` → `CoherenceCost` and `nearestLawful(world, frame, origin)` → `Placement[]` (P1) | `@plat/world/place` | the `placeFrame` dry run; V09's placement tool; the clerk's `placeAt` proposal on the world |
| `blend(world, frame, placement)` (P2) and `localDrainage(world, box)` (P3) | `@plat/world/place` | the `placeFrame` / `setPlacement` fold; the cascade |
| `toWorld(placement, pCm)`, `toFrame(placement, wCm)`, `bearingToWorld(placement, cdeg)` | `@plat/world/place` | the glyph, the view (the frame drawn on the world), the sun and wind recomputation (V13 §3.11.5), V14's free-standing site (`placementRef`), the exports' world coordinates, the port |
| `glyphOf(doc, levels)` (the frame's marks, `@plat/layout`) and `placeGlyph(marks, placement)` (`@plat/world/glyph`: `toWorld` only; C13-35) | `@plat/layout`; `@plat/world/glyph` | the world view; the frame's commit hook (every commit that changes a frame's outline, enceinte, principal water or arterials re-makes its marks and posts `world.glyph`, V13 §3.10) |
| `score(cell, ctx, weights, hard?)` over the `terms` registry of `SuitabilityTerm`s, `terms.register(term)` (V13 §2.2, §3.7; SW-01) | `@plat/world/siting` (the slot and V13's eight terms; V14 registers its purpose terms) | W6a, W6b; V14's G3 (purpose weights, hard terms; no jitter, SW-03); the host through the port (its weights) |
| `RouteCostLaw` (the host's law as data: its values and version, each term tagged `time` or `choice`; the default row ours) and `RouteLayRule` (the map's network formation) | `@plat/tables` (`world.routes`, `world.routeLay`), the host through the port (`costLaw`) | W7; W8a; W8b's travel times; `derivedTime`; V14's E1 (the route at the point) |
| `TravelLaw` and `derivedTime(effort, mode, week, law)`, `pointAtTime(route, from, fraction, dispatchWeek, law)`, `timeDelta(world, edit)` — an **effort-metre** is one metre of level open ground at the cost law's base rate (effort = Σ step cost under the time terms ÷ (`landBase` × `perM`)); `derivedTime` is, by the law's `basis`, absolute: effort ÷ 1 000 ÷ `kmPerWeek[mode]` weeks; normalized: effort × the canon's `costUnitsPerMetre` × the law's `calibration` (weeks per cost unit); normalizedFrozen: the leg's frozen weeks; then the law's leg rounding, floor and cap and its season factor | `@plat/world/travel` | every time the map shows (labelled, stamped with the law's version); the host's movers and hearing positions (through the map feed); the dry runs |
| `WorldPort` — the simulator feed `canon(world, request)` → `WorldCanon`, with the optional `routeFacts` and `patrolOffer`; the map feed `derivedFacts(world, placement)` → `SettlementMapRecord`, `mapFeed(world, week, audience)`, `routes(world)`, `pathGeometry`, `borderSegment`, `placeOf`; `charter(world, campaign)`; `proposals(world, demand)`; inbound recorded `bindSeat`, `unbindSeat`, `importSeats`, `costLaw`, `travelLaw`, `hostRequires`, `genesis`, `network`, `polity`, `events`, `canonized`, `consumed`; inbound presentation `clock`, `hostOverlay`, `beliefView`, `audienceKnowledge` and `lensWindow` (kept as plates); the outbound offers `physicalChange` and the DM-placed site offers of the DM's map feed (V13 §3.11.6) | `@plat/port/world` (one adapter folder per host line, as `@plat/port`'s; its manifest names the closed key list of every recorded input) | the host, one way per message (BCR-V13-11; the base's fifth host door, 779); V08's host client gains the world's messages (V13 §3.11.6) |
| `MapImportAdapter.read(json | mapFile)` → `MapImport` and `WorldStrategy.fromImport(imp)` | `@plat/port/world/adapters/<ecosystem>/<version>/` | the import command (V09's dialog; the CLI) |
| the exporters `ecosystemJson`, `ecosystemGeoJson`, `heightmap16`, `worldCsv` | `@plat/export` (the shapes from the adapter folder's schema file; C13-50) | the user; the host's ecosystem tools |
| the cascade `cascade(doc, dirty, verb)` (V13 §3.14.2) | `@plat/edit` over `@plat/world`'s operators | every terrain and water edit at both scales; V06's `terrainWater` ops; `setSurface`; the placement edits |
| `ReasonRecord` writers and the readers `why`, `whatCaused`, `whatChanged`, `whatIf` | every stage (the writers); `@plat/world/why` (the readers) | V10's `why` query (V10 §3.9) and its three new modes (V13 §4.7); V14's stages write the same record |
| the world `WhyProvider` (kinds: `Reach`, `WaterSurface`, `Watershed`, `Territory`, `WorldRoute`, `SitingProposal`, `Placement`, `GroundwaterField`'s springs) and the `world` `WhySectionProvider` | `@plat/world` | V10's `why` query, V09's cards |
| `worldFactsAt(world, wCm, sinceWeek?, atWeek?)` → the facts at a point (terrain, surfaces, biome, route, the seat territory, the polity — holder, allegiance, status, sides, occupation, patrols, fighting — at the revision in force at `atWeek`, the site placements, the recent `WorldEvent`s and dated water events since `sinceWeek`; SW-07) | `@plat/world` | V14's E1 (the world-map encounter case, item 132 (e)) and E4; the clerk; V09's hover |
| `polityOf(doc, week)`, `frameStanding(doc, week)` (a placed frame's live political context: derived readings through `worldRef`, never written in the frame) | `@plat/model` over `@plat/world` | the frame's views, its glyph card, the clerk |
| `borderSegment(world, a, b, week)`, `placeOf(world, where)` | `@plat/world` | the port; the event fold (a pair-only host event); the hearing card's words |
| `@plat/world/sight` — `viewshed(world, at, heightM)`, `intervisible(world, a, b)` (the DEM with the earth's curvature and refraction); `aerialLegs(world, seats)` (straight legs between named seats, fed only to a canon whose envelope names this world) | `@plat/world/sight` | V14's site coverage; V13 §3.9 (14)'s detection; beacon chains; the host's air field |
| `roadsAt(placement, week)` (the frame's road rows at a week, from the lived network) | `@plat/world` | the frame's views; the charter's re-emission at a growth or a re-placement; the clerk |
| `patrolAt(world, segment, power, week)` → boolean (a patrol present that week on its fixed phase, V13 §3.9 (14)) | `@plat/world` | `worldFactsAt`, V14's E4, T-V13-42 |
| `lensAt(world, lens, week, audience)` → the lens's marks at a week: its regime banner, each element's marks with their class labels, its legend, its declared gaps (V13 §5.8) | `@plat/world/lens` | the world view's lens layers, the picture exports of a lens view, T-V13-47 – T-V13-56 |
| `lensWhy(world, lens, mark, week)` → the host facts a mark reads and the rule that drew it (the sway's `whyCell` generalised) | `@plat/world/lens` | V09's hover and card on a lens mark |
| `foldLensWindow(world, sets)` → one `LensPlate` in the plate cache (`Document.lensPlates`); `pinPlate(world, seq, pinned)` (a DM's cache command, never an edit) | `@plat/world/lens` | the port's `lensWindow`; V09's scrub bar |

Each stage's output is consumed: W1's rasters by W2–W9 and the charter; W2's surfaces by W4, the water class test and the
view; W3's climate by W4, W5, W6 and the charter; W4's reaches, watersheds and groundwater by W6, W7, the charter, the
port and V04; W5's biomes by W6, W7's cost, the charter and the view; W6's proposals by the host and V14; W7's routes by
the charter, the port and W6's second stage; W8a's seat territories by the canon, the charter, W8b and W9; W8b's sway by `worldFactsAt`, the map feed, the view and V14; W9's labels and glyphs by
the view and the exports; P1–P5's placement and charter by the frame's S0–S1, the glyph, the port and V14.

### 1b.3 Edit kinds (each with its tool, lifecycle row and undo)

| edit | the authoring tool (§7.1's binding table) | lifecycle row | undo |
|---|---|---|---|
| `worldRecipe` (append, replace, remove or reorder one op of the terrain recipe; `preview` first) | T2 `ground` on the world document | V13 §2.6's recipe row | the replaced op list and the re-derived scope |
| `setSurface` (a dated `WaterSurface` level: the sea, a lake, a reach's stage; with `verb`) | T2 `ground` (both documents) | V13 §2.6's surface row | the former surface list; the cascade's replaced scope |
| `setField(terrain)` on the world raster (with `verb`) | T2 `ground` on the world document | §7.4's `setField` row, the verb added | the stroke leaves the list; the trace removed |
| `rerouteReach` (a reach re-traced from the pre-carve ground between two of its knots; with `verb`) | T2 `ground` (both documents: the frame's form is `moveCourseKnot` with `verb`) | V13 §2.6's reach row | the former course, the former carve delta, the trace |
| `requestCharter` (world-first; the host's `charter(world, campaign)`), `bindPlacement` (author `world`), `placeFrame` (settlement-first), `setPlacement`, `mirrorFrame`, `worldWins` (whole or scoped by `ids`), `unplaceFrame`; the frame's own `charter` event (author `world`) | T6 `place` on the world document (the Place-a-settlement mode; *Charter here* for `requestCharter`); the frame's event has no tool | V13 §2.6's placement and charter rows | the former placement, blend and charter; `worldWins`'s re-derivation as a Re-derive from S1's undo |
| `deleteTrace` | T9 `shape` | V13 §2.6's trace row | the trace restored |
| `setAttr` on a `WaterSurface` (`subtype`, `open`, `date`), a `Reach` (`navigable` override, `name`), a `Territory` or an `Allegiance` (`name`, standalone only — a host-bound allegiance takes the DM's christening from the host), a `WorldRoute` (`class`, standalone only; a host route's grade is the host's), a `Placement` (`bearingCdeg`, `originCm`) | T9 `shape` | §7.4's setAttr row | the inverse |
| `setSeats` (a standalone world's `RecipeSeat`s; a Re-derive from W8) — refused on a host-bound world, whose seats arrive as `bindSeat` and `importSeats` | T6 `place` | V13 §2.6's seats row | the replaced W8 scope |
| `bindSeat` (the host's key on a placement; recorded input), `unbindSeat` (the host's removal of a seat: the key cleared, the seat territory's change offered to the host's re-canonize like an addition) and `importSeats` (the host's existing placements as a recorded import request) | the port (author `host`) | V13 §2.6's placement row | a host input is never a user's undo target |
| `setSwayLock` (cells or a sway held by a named holder or kept unclaimed against later revisions: the DM's word is canon on a standalone world; on a host-bound world a presentation lock the view and the clerk read and the map feed's crossing holders and `patrolOffer` never do) and `divide` (invented provinces on a standalone world) | T9 `shape` | V13 §2.6's sway row | the former lock; the replaced W8b scope |
| `adjust` of `world.size`, the pole inputs, the matrix choice (a Re-derive from Wk; the physical extent changes only through `world.size`, its travel delta reported) | T1 `intend` | §7.4's adjust row | the replaced scope |
| `fork` / `discardFork` / `commitFork` (the counterfactual fork) | T10 `hold` (Preview-on-a-copy) | V13 §2.6's fork row | a fork is never in the canonical log until committed (V13 §4.5) |
| `regenerate` on a world stage's scope (`EditScope { kind: 'world'; stage; box? }`, V13 §4.1: New random on W1's noise, W5's thinning, W6a's or W6b's tie-breaks) | T10 `hold` | §7.4's regenerate row | the replaced scope |

`worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, `worldLens` (the lenses open and the picker's collapsed rows)
and `lensWeek` (the week the lenses draw; default the document's week) are view keys (§2.9), set by V09's per-viewer
controls, never edits and never undone; `pinPlate` is the DM's command on the world document's plate cache (V13 §5.8
(8)) — never an edit, never undone, never in a digest or the log.

### 1b.4 Entity kinds (each rendered, labelled, exported, persisted)

| entity | rendered (V13 §5.1) | labelled (V13 §5.3) | exported (V13 §5.4) | persisted |
|---|---|---|---|---|
| the world raster (`dem`, `biome`, `landUse`, the climate) | the relief, biome and climate layers | none | the heightmap image, the ecosystem-shaped JSON's cell arrays, GeoJSON cells, CSV | the world's `fields` chunks |
| `WaterSurface` | the water at its level (sea, lakes), a reach's stage as its width | lakes and seas by name | GeoJSON features, the ecosystem-shaped JSON's lake features | entities block |
| `Reach` | the river by width class | named rivers | GeoJSON LineString, the ecosystem-shaped JSON's river entities, CSV | entities block |
| `Watershed` | the basin overlay (thematic) | none | GeoJSON (on request) | entities block |
| `GroundwaterField` | the water-table overlay (thematic); the springs as pins | springs by name | GeoJSON spring points; the table raster on request | the `fields` chunk (world) / `Terrain.groundwater` (frame) |
| `WorldRoute` | by class or the host's grade (a hidden host road a DM-only ghost) | none (a route takes its ends' names) | GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV | entities block |
| `Territory` (the seat territory) | the diagnostic `seatTerritory` layer | none | GeoJSON Polygon (on request) | entities block |
| `Sway`, `Allegiance` | the sway fill, the allegiance and member borders, the tributary band, the exclave halo, the occupation and debatable hatches, the fighting marks (V13 §5.1) | an allegiance at its root's sway's pole: the DM's christening or a descriptive label | GeoJSON MultiPolygon with `status`, `allegiance`, `swayRevision`; the ecosystem-shaped JSON's states and provinces (V13 §5.4) | headers, keyframes and traces in the entities and fields blocks; `Allegiance` derived on load |
| `PatrolCadence` | the `patrols` tints | none | GeoJSON LineString segments with power and cadence (DM export) | derived on load from the revision |
| a lens's marks (V13 §5.9) | the lens layers at `lensWeek` (V13 §5.8) | captions only (a realm arc, a hop's week, a derivation label) | the picture exports of the view as drawn; never the ecosystem-shaped exports | never as marks: re-drawn from the plates, the sway's revisions and the events |
| `SettlementGlyph` | by level | the settlement's name and tier | the ecosystem JSON's settlements (through the port's record), GeoJSON point with `tier` | the world document's `derived` cache, outside the model digest (re-made, see V13 §2.6; C13-21) |
| `Placement` | the frame's outline on the world; the glyph | none | GeoJSON (`placement` properties on the glyph feature), CSV | the world's entities block |
| `SitingProposal` | a candidate pin (while shown) | none | CSV, the port | entities block (W6b's last run); a demand proposal never (transient, C13-22) |
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
§2.9's *The week's source*; **the world document's week** (C13-23) is the greatest week its folded events carry — a
`setSurface` under `happened` dates at the world's `week` view key, an epoch's op at its epoch week — set standalone by the season control; on a host-bound world **the present week is the end of the latest window the
host sent**, which takes the place of the greatest folded week (a DM's *this happened* edit is dated at the host's next
tick head and waits for the next window) (`AdvanceWindow.toWeek`, V13 §2.2: every recorded host input arrives as a windowed replace after each
advance, undo and resume, so a rewind of the host moves the world's present back with it, and a consumed DM edit
inside a discarded window is unsealed), and `WorldPort.clock(world, week)` is a view command in §11.3's `view.set {
week }` form for the week drawn, never a model input; V13 §3.12.5). **Edits on a host-bound world follow the host's
decree law** (V13 §4.1; J-V13.80): held while the host advances or is parked; a *this happened* edit dated at the
host's next tick head and offered as `physicalChange`, which the host acknowledges (`consumed`, sealing the edit
against undo); a retcon, a regenerate, a size or climate `adjust` only as a geometry shift the host adopts by its own
receipted re-canonize; political and military event kinds are refused (`refuse.world.hostPolitical`), the world
editor opening the host's own command for them as for routes (V13 §3.8 (9)); no message proposes one.

**The two coordinate regimes (item 131 (a), (b); J-V13.2).** The **world regime** is a planar, bounded, axis-aligned
raster plus a graph, in **integer world centimetres** (`WorldCm`, an int32 lane as `Cm` is: x east, y north, from the
world's south-west corner; the largest world rung's far corner at 3 840 km lies at 3.84 × 10⁸ cm, inside the lane, and
no world coordinate reaches a kernel primitive except as integer metres inside §3.2 (1)'s range invariant, V13 §3.8 (3);
SW-16), with a `WorldPointCm = { x: WorldCm; y: WorldCm }` — **every world point in every record, message, event and
address of this volume and of V14 is an integer `WorldPointCm`; no world point is ever a double or a metre** (SW-12); its
elevations are integer centimetres against the **world datum** — mean sea level, 0 — and its rasters are typed arrays
with a cell size in cm. It holds no plat arena and runs no kernel transaction: its geometry is records (polylines and
rings of `WorldPointCm`), and the kernel's `delaunay`, `dmath`, `rng`, `index` and `noise` are the only kernel parts it
calls (§14). The **frame regime** is the base's: the cm planar kernel from settlement through interior and site scale,
unchanged. The **placement transform** joins them: a frame point `p` (frame cm, §2.1's frame, the frame's centre at
(0, 0), §3.2 (9)) maps to the world by `toWorld(pl, p) = pl.originCm + R(pl.bearingCdeg) · M(pl.mirrored) · p`, with
`R` the rotation by the bearing (clockwise, through `dmath`'s sine and cosine, the result rounded to the centimetre) and
`M` the reflection in the frame's y axis when `mirrored`; `toFrame` is its inverse. The frame's elevation `h` (cm above
`datumOf(doc)`) stands at `datumOf(doc) + h` against the world datum. An optional equirectangular latitude box
(`WorldRecipe.latBox`) exists only for climate (V13 §3.4): no coordinate is ever a degree. **The world header** (`WorldHeader`, V13 §2.2;
J-V13.72) declares the scale once: unit cm, x east, y north, origin the south-west corner, the extent in cm, a geometry
version bumped by every edit that changes the physical layers the canon reads (an extent adjust, a recipe op, a terrain
retcon). It is the scale every consumer reads: the host stamps its own map unit's kilometres from
it (0.001 for integer metres, 0.00001 for cm), never a default, carries a stamped value forward only within one
geometry version, and converts between this frame (y north) and its own render frame in one adapter in both directions;
no world carries a float scale or a unit slider. The world dialog shows the travel span (the map feed's, never the
canon's) under the travel law in force (the
default row standalone): "corner to corner about N weeks on foot; neighbouring towns about M days apart" — the
scale-against-mystery readout. `worldUnits` is a view key (the display unit of the world view's scale bar and
distance labels: km, mi, lg, nmi; seeded by an import from the file's unit), never a model input and never an `adjust`.

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
  calendarSouth?: boolean /* the calendar hemisphere is the south (V13 §2.3's phase rows swap); absent: the north; on a host-bound world the hemisphere the host's seasons name */;
  seats?: RecipeSeat[] /* standalone: the recipe's seats (W8); on a host-bound world the host's seats arrive through the port (`bindSeat`, `importSeats`) and this is empty */;
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
  landmass: Uint32Array /* fine; W2's land component per land cell (0 on water), read by W6–W8 (C13-32) */;
  discharge: Float32Array /* fine; W4's per-cell discharge in m³/s (the springs' flowM3s, the reaches' profiles) */;
  vegetation: Uint8Array; habitability: Uint8Array /* fine; W5's rows × 255 */;
  territory: Uint32Array /* COARSE; W8a's Territory id per coarse cell (the seat territory), 0 on water or with no seat (V13 §3.9 (2)) */;
  sway: Uint16Array /* fine; W8b's Sway id per cell through the world's id table, 0 none */; swayStatus: Uint8Array /* fine; 0 unclaimed · 1 held · 2 heldByForce · 3 debatable */;
  debatableSides: Map<number /* fine cell */, [number, number] /* the two allegiances' table ids */> /* sparse */;
  culture: Uint16Array /* fine; the culture id per cell from the host's seats (each seat's culture over its seat territory), the recipe's default culture, or the import (V13 §2.8); 0 none — read by W9's names; never by the sway, whose culture term is the host's own culture distance (V13 §3.9 (6); J382); never V14's (SW-09) */;
  routes: Map<number /* fine cell */, Id[]> /* the route ids crossing a cell (W7); sparse */;
  biome: Uint8Array; landUse: Uint8Array /* fine; W5's rows (world.biomes) */;
  climate: { tempDeciC: Int16Array; seasonAmpDeciC: Int16Array; seasonPhaseWeek: Uint8Array; precipMm: Uint16Array; evapMm: Uint16Array;
             windCdeg: Uint16Array; windStrength: Uint8Array /* 0–255 → 0–1 */; continentality: Uint8Array /* 0–255 → 0–1 */ } /* coarse; W3 */;
  distToShoreM: Float32Array; distToRiverM: Float32Array /* fine; true distance transforms (W4); computed on demand per query on the low tier (V13 §6) */ }
// companion records in the entities block: `coast: { landmass: number; rings: WorldPointCm[][] }[]` (W2's coast polylines, the view's and the charter's outlines source)

interface WaterSurface {                     // a surface record, separate from the ground (item 140 M2; proposal §3.3 restated here)
  id: Id; kind: 'sea'|'lake'|'reach'|'site';
  body: Id /* the feature or reach it is the surface of: a world feature id (W2), a Reach, on a frame a WaterBody (§2.3), or for kind 'site' a WorldSite card (V14) */;
  level?: number /* kind 'site': the site level whose units are the surface's cells (V14 §3.7; SW-06) */;
  elevationCm: Cm /* against the world datum; on a frame against datumOf(doc) */;
  date: Week | null /* null: the generation-time surface (the present until a dated one supersedes it); a dated surface is the present from its week on — the present is the latest surface of the body whose date ≤ the document's week (§2.9's `week`) */;
  season?: 'dry'|'wet' /* a seasonal pair beside the present (V13 §3.12.4): absent on the present itself */;
  open?: boolean /* a lake: inflow exceeds evaporation (W2) */; subtype?: 'fresh'|'brackish'|'salt'|'dry' /* a lake: one vocabulary at both scales by one precedence rule (V13 §3.3 (3)) */; iceWeeks?: number[] /* a lake or a reach: the weeks of the year (0–51 from spring, §4.11's calendar) its surface lies frozen, by the seasonal curve (V13 §3.4 (4)); ice is a season, never a subtype */;
  outlet?: Id /* a lake's outlet Reach; absent on a closed lake */;
  tidalRangeCm?: Cm /* a sea: the mudflat and harbour bands read it (V13 §3.12.5) */;
  cause: EditRef | RuleRef | 'generation' | `convert:${string}` /* who set it (§2.8's cause form); a dated surface names its event or epoch */;
  reason: Id /* its ReasonRecord */ }

interface Reach {                            // one world river reach, W4
  id: Id; basin: Id /* its Watershed */; from: Id | null /* the upstream Reach or lake; null at a source */; to: Id | null /* the downstream Reach, a lake, the sea feature, or null at an off-map exit */;
  course: WorldPointCm[] /* the D8 path's cell centres, smoothed by two Chaikin passes (V13 §3.5.3) */;
  dischargeM3s: Float32Array /* per course vertex */; widthCm: Int32Array; depthCm: Int32Array /* per vertex, by hydraulic geometry (V13 §3.5.3) */;
  stageSurface: Id /* its WaterSurface of kind 'reach' (the bankfull stage profile is the surface's elevation at each vertex: the carved bed + depthCm, V13 §3.5.3) */;
  navigable: boolean /* dischargeM3s at the downstream end ≥ world.hydro.navigableM3s: the reach's summary */; navigableFrom: number /* the first course vertex whose discharge ≥ world.hydro.navigableM3s: a main stem's headwater is not navigable because its mouth is */; navBand: Uint8Array /* per course vertex: 0 none, 1 boats (≥ ¼ navigableM3s), 2 barges (≥ navigableM3s), 3 ships (≥ 4 × navigableM3s) */;
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
  outlines: { coast: PolygonCm[] /* the world's coast polygon(s) clipped to the frame + margin, in frame cm: the base line S1 (2)'s routine displaces */;
    lakes: { body: Id; ring: PolygonCm; levelCm: Cm }[]; reaches: { reach: Id; course: PointCm[]; widthCm: Int32Array }[] /* the world's geometry inside the frame + margin: what the frame refines (item 135 (a); C13-13) */ };
  worldSeed: Seed; placement: { originCm: WorldPointCm; bearingCdeg: Cdeg; mirrored: boolean } /* for S1's position-keyed lattice (V13 §3.11.4; BCR-V13-29) */;
  roads: { route: Id; hostKey?: string /* the host's edge key when bound */; side: 'N'|'E'|'S'|'W'; atCm: Cm; bearingCdeg: Cdeg; class: WayClass /* a world class mapped to §2.4's: highway → through, road → primary, track → track, trail → path; capped in class and count by the dossier's access word */;
    toward: Id | null /* the next host settlement along the route, never a site, a proposal or a junction */; towardKey?: string /* its host key */; towardEffortM?: number /* the land effort from the edge station to it, for the leaf's walking-time annotation */;
    forced: boolean /* a highway or road crossing: a forced gate pick of S3 (4), routed through the margin to its station (BCR-V13-30) */; hidden?: boolean /* a road the host grades hidden: no public road, drawn DM-only */ }[];
  climate: { tempDeciC: DeciC; seasonAmpDeciC: DeciC; seasonPhaseWeek: number; precipMm: MmYr; evapMm: MmYr; windCdeg: Cdeg /* the bearing the prevailing wind blows FROM, in frame terms (the raster's `windCdeg` is the same from-bearing in world terms) */; windStrength: number; latitudeDeg: number; continentality: number };
  waterTable: { grid: { cellCm: Cm; cols: number; rows: number }; tableCm: Int32Array /* the world's groundwater sampled over the frame + margin, against the frame's datum */ };
  biome: { row: string /* a world.biomes row key */; climateRow: string /* V11's ClimateTable row the biome maps to (V13 §3.11.4) */; landUseShare: Record<string, number> };
  resources: { kind: string; at: PointCm; amount: number }[] /* W5's resource sites inside the frame + margin, in frame cm */;
  territory: { id: Id; name?: NameRef; seat: Id | null; seatKey?: string /* the host's settlement key */; province?: Id /* a standalone world only */ } | null /* the seat territory (W8a): changes only at a membership re-canonize */;
  polityAtCharter: { swayRevision: number; culture?: string } | null /* the culture id at the placement's origin and the sway revision in force, read ONCE by the placement edit that emitted this charter (S0 reads its culture); the holder, allegiance and status are never charter fields — the frame's live political context is the derived reading `polityOf` (V13 §1b.2) —, and a sway revision never re-emits it */;
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
  hostKey?: string /* the host's settlement key, written by `bindSeat` and cleared by `unbindSeat` (V13 §4.1); every port row names it */; hostLocked?: boolean /* the host's move-lock: an origin edit is refused (`refuse.place.hostLocked`) while it is set; the map additionally refuses a DM's unplacement of a host seat in the world editor (a map rule, not the host's: the host's own removal arrives as `unbindSeat`); bearing and mirror admitted */;
  since: { seq: number; week: Week } }
interface CoherenceCost { total: number; terms: { term: 'coastSide'|'riverCrossing'|'edgeElevation'|'relief'|'biome'|'territory'|'dossier'; cost: number; detail: string }[]; lawful: boolean /* total ≤ place.coherence.lawfulMax */; detail?: 'world-first' /* no P1 ran (V13 §3.11) */ }

interface WorldRoute { id: Id; a: Id; b: Id /* seat ids (the glyphs' settlements, or V14 sites standalone) */; hostKey?: string /* bound: the host's edge key, the pair and the mode */;
  mode: 'land'|'water'; waterRuns?: { from: number; to: number; kind: 'river'|'lake'|'coastal'|'open' }[] /* vertex spans of a water route */;
  class: 'highway'|'road'|'track'|'trail'|'sea'|'river' /* standalone: W7's rank class; bound: mapped from the host's grade */; grade?: string /* bound: the host's grade word, hidden among them */;
  origin: 'genesis'|'chartered'|'standalone'|'import'|'user'; layVersion: number /* bumped by every re-lay; a dated re-lay keeps the former course as a version */;
  polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative land effort-metres under the cost law's time terms; water vertices carry water metres in their own lane */; vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's table */;
  landEffortM: number; lengthM: number; coastalM: number; openSeaM: number; riverM: number; downstreamM: number; byClassM: Record<string, number>; crossings: Id[] /* integers, order-free: evaluated on the final polyline */;
  seasonal?: { iceWeeks?: number[]; highWaterWeeks?: number[]; snowWeeks?: number[] /* 52-week sets keyed to the host's week of year: ice on a water run, high water on a ford, snow on the route's highest segment */ };
  costTotal: number /* the undiscounted cost along the laid course: the clerk's "why this road", presentation only, never a time and never sent to the host's simulation */; landmass: number; reason: Id }
interface RecipeSeat { at: WorldPointCm; key: string /* a standalone name */; tier: Rung; culture?: string }   // a standalone world's seats (`WorldRecipe.seats`); budgets and cost vectors are retired (J-V13.63)
interface Territory { id: Id; key: string /* the seat's host key, or a standalone name */; seat: Id; cells: Uint32Array /* COARSE cell ids, sorted (W8a) */;
  crossings: { neighbour: Id; at: WorldPointCm; sides: [WorldPointCm, WorldPointCm]; classes: [string, string] /* the two crossing cells' terrain classes */; cost: [number, number] /* integer, from each seat under the cost law */ }[] /* refined on the fine grid within one coarse cell (V13 §3.9 (3)) */;
  border: WorldPointCm[][] /* rings, normalized (V13 §3.9 (15)) */; poleCm: WorldPointCm /* the pole of inaccessibility */; neighbours: Id[]; provinces?: Territory[] /* a standalone world's provinces, nested here when its sways are not drawn */; name?: NameRef; reason: Id }

interface Glyph {                            // W9's generalization of a placed subject, per level (V13 §3.10); SW-08: a frame's or a site's
  placement: Id; subject: 'frame'|'site'; kind?: string /* a site: its kind (the level-0 icon glyph's id) */; tier?: Rung; pop?: number /* a frame's */; name: NameRef | null;
  levels: { level: 0|1|2|3; marks: GlyphMark[] }[] /* the level table's rows (world.glyph): 0 a tier dot, 1 the enclosure, 2 the outline with principal water and walls, 3 the arterials and wards */;
  sourceDigest: Hash128 /* the frame's model digest the glyph was made from: a differing digest marks it stale (V13 §2.6) */ }
type GlyphMark = { kind: 'glyph'|'dot'|'ring'|'outline'|'water'|'wall'|'way'|'ward'; points: WorldPointCm[]; class?: string /* 'glyph': the icon glyph id at level 0 (a site's kind) */ };
type SettlementGlyph = Glyph & { subject: 'frame'; tier: Rung; pop: number };

interface SitingProposal { id: Id; at: WorldPointCm; cell: number; score: number; terms: Record<string, number>; harbourCandidate: boolean /* W6's promotion (V13 §3.7 (3)): standalone, or a suggestion to the host */; waterAccess: WaterAccess; reason: Id; demand?: string /* the host's demand key it answers; 'borderPost' for V13 §3.9 (16)'s transient border posts */; postKind?: 'bridgeFort'|'fort'|'watchpost'|'tollhouse' }
interface SuitabilityContext { raster: WorldRaster; coast: WorldRaster['coast']; reaches: Reach[]; surfaces: WaterSurface[]; routes: WorldRoute[]; placements: Placement[];
  sites: { placement: Id; at: WorldPointCm; attraction: number; routed: boolean }[] /* every Placement with a site subject, its card's attraction and routed read through the resolver (R-V14-1) */;
  resources: ResourceSite[]; springs: GroundwaterField['springs']; territories: Territory[]; sways: Sway[] /* SW-01: V14's territoryBorder reads the adversarial allegiance borders and the debatable cells of the sway in force, never the seat territory (V14 §2.5) */;
  wetStage(reach: Id): Int32Array /* the reach's wet-season stage profile by V13 §3.12.4's seasonal.wetShare, derived on demand (V14's floodSafe) */; stage: 'a'|'b' }
interface SuitabilityTerm { id: string; compute(cell: number, ctx: SuitabilityContext): number /* 0–1; pure, deterministic — no draw (SW-03) */ }   // V13 OWNS the slot (SW-01; J-V13.51): V13's eight generic terms live here; V14's purpose terms are V14's plug-ins
declare const terms: { register(term: SuitabilityTerm): void; get(id: string): SuitabilityTerm };   // @plat/world/siting's registry; a duplicate id is refused at registration
declare function score(cell: number, ctx: SuitabilityContext, weights: Record<string, number>, hard?: string[] /* a term whose value is 0 refuses the cell */): number;   // no random or jitter term anywhere in siting (item 132 (b) extended; SW-03; J-V13.53)
interface GoverningSurface { surface: Id | null; elevationCm: Cm; kind: 'table'|'open'|'stage'; via?: Id /* the passage the body reached through */ }   // V13 §3.13.1 (C13-20)

interface ReasonRecord {                     // item 140 M8; shared with V14, declared here ONCE (§2.8's sixth part; BCR-V13-17); V13 §4.7 and V14 cite this block
  id: Id; fact: Id | { chunk: ChunkRef } /* the entity or field value it explains, or a RASTER CHUNK: a stage writes one record per raster it writes, never one per cell (J-V13.49) */;
  path?: string /* the field of the fact, when not the whole record */; stage: StageId; concern?: ConcernId;
  event?: EditId /* the edit whose fold wrote it; absent at generation */;
  inputs: { fact: Id | { chunk: ChunkRef }; path?: string; value?: number | string }[] /* the facts read: from the kernel's commit journal (K12) for a frame stage that runs a kernel transaction, from the world's own `WorldCommitRecord` (V13 §3.0) for a world stage or cascade step */;
  rule: RuleRef /* the table, row and cells whose rule produced it */; values: Record<string, number | string> /* the numbers the rule read, in their units ("tableCm", "distanceM", "thresholdCm") */;
  text: MsgRef /* the sentence the clerk renders, per caller (§5.4's form; V13 §4.7) */;
  cause: EditRef | RuleRef | 'generation' | `convert:${string}`; verb?: 'happened'|'alwaysSo';
  supersedes?: Id /* the reason this one replaced (a cascade's re-derivation) */; week: Week }
  // persisted in the entities block, outside the model digest and inside the records digest (V13 §2.7): a reason explains a fact and never is one.
  // A cell's reason is COMPUTED ON DEMAND: `whyCell(raster, cell)` (`@plat/world/why`) re-evaluates the writing stage's rule function for that one cell
  // against the chunk record's inputs and slices (J-V13.49); records are bounded by entity count (≤ 10⁵ at the continent rung, V13 §2.7), never by cells.

interface TerrainTrace { id: Id; kind: 'oldBed'|'oldShore'|'oldGround'; cells: Uint32Array /* fine or hydro cells */; formerCm: Int32Array /* the former values */; event: EditRef; week: Week; reason: Id }
interface SurfaceTrace { id: Id; surface: Id /* the superseded WaterSurface */; event: EditRef; week: Week; reason: Id }
interface WorldEvent {                       // SW-07 (J-V13.56; J-V13.69): the world's event index — dated host events delivered as facts, stored and indexed, NEVER generated here
  id: Id; kind: string /* the host's word: battle, plague, fire, siege, raid, … */; at?: WorldPointCm /* absent exactly when `pair` is given and no point: placed by `borderSegment` at its week, the placement recorded in its reason */; where?: WorldWhere;
  pair?: [string, string] /* the two host seats of a fight over their border */; verdict?: string /* the host's outcome word, read only by `MarchHold` and the clerk (a raid's too, once the host sends one, V13 §3.9 (11)) */;
  sourceSeat?: string /* the seat the host names as the event's origin — a plague arrival's, a conversion's strongest carrier — only when sent (V13 §8.5); never `source`, the event's author */; deity?: string /* a faith event's deity key, when sent */; cause?: string /* the host's cause word — a patron fall's — by the adapter folder's vocabulary table, when sent */;
  seats?: string[] /* the seats a realm-wide event names (a realm arc) */; lenses?: LensId[] /* the lenses it moves, by the adapter folder's event table at fold (V13 §5.8 (1)) */; radiusM: number; week: Week; window?: AdvanceWindow;
  audience: 'public'|'dmOnly'|'local' /* the host's resolved audience (the knowledge paragraph below) */; source: 'host'|'user'; factTier: 'dossier'|'map' /* dossier when the host wrote it */; causedBy?: string[] /* the host's receipt ids */; detail?: string; reason: Id }
interface PlacementAnomaly { placement: Id; subject: Id /* the locked entity */; kind: 'riverUphill'|'coastInland'|'lockedBelowTable'|'lockedInWater'|'roadToNowhere'|'roadUnmatched'|'windSide'|'sunDiffers'; detail: string; reason: Id }   // derived, V13 §2.4; `roadToNowhere` (a charter road no exit meets) and `roadUnmatched` (a frame exit no charter road meets) are reported readings, never annotations
// The world port's records (V13 §3.11.6; J-V13.70 – J-V13.72). Host keys are opaque strings; every point a WorldPointCm; every length an integer with its unit.
interface WorldHeader { unit: 'cm'; axes: 'x-east,y-north'; origin: 'south-west'; extentCm: { w: WorldCm; h: WorldCm }; geometryVersion: number }   // the scale's declaration only: the travel span is the map feed's (`mapFeed`), never the canon's
interface CanonRequest { campaign: string; logHead: number; seats: string[] /* the host keys asked for */; costLawVersion: number; waterK: number /* the host's K */ }
interface WorldCanon { envelope: { schema: string; world: { doc: Uuid; namespace: string; logHead: number; modelDigest: Hash128 }; campaign: string; header: WorldHeader;
    versions: { geometry: { generator: string; inputHash: Hash128 }; costLaw: { host: number; lawHash: Hash64 }; travelLaw: number; vocabulary: { terrainClass: string; climateBand: string }; water: Hash128; sites: Hash128 };
    units: { coord: 'cm'; costUnitsPerMetre: number /* an integer */ }; causes: { seq: number; edit: Id; author: string }[]; skipped: { hostKey: string; reason: 'unbound'|'unplaced'|'phantom'|'offWorld' }[] };
  travel: { seats: CanonSeat[]; crossings: TravelEdge[] }; water: { candidates: WaterCandidate[]; access: { hostKey: string; access: WaterAccess }[] }; sites: { hostKey: string; ground: { at: WorldPointCm; terrainClass: string /* the adapter folder's class table */; stepCost: number /* integer, the host's cost units: the step cost at the point under its cost law */ }[] /* frozen candidate ground inside the seat's orbit */ }[] }
interface CanonSeat { hostKey: string; at: WorldPointCm; landmass: number; terrainClass: string /* the adapter folder's class table */; climateBand: string; elevationM: number }
interface TravelEdge { a: string; b: string /* host keys, codepoint-sorted */; cost: number /* integer, the host's cost units under its law */; crossStep: number; classA: string; classB: string /* the two crossing cells' classes: the host's receipt inputs */; crossingCm: WorldPointCm; sideA: WorldPointCm; sideB: WorldPointCm; landmass: number }
interface WaterCandidate { a: string; b: string; via: 'sea'|'lake'|'river'; body: Id; aCm: WorldPointCm; bCm: WorldPointCm; waterM: number }   // geography only: the host prices and adopts lanes under its own law
interface WaterAccess { cls: 'coast'|'lakeShore'|'navigableRiver'|'none'; eligible: boolean /* within the host's reach and band thresholds, in true metres */; fronts?: Id /* the sea or lake */; riverBand?: 0|1|2|3; body?: Id /* the sailing body */ }   // the geography half of the host's port rule; the host's verdict returns only as a view attribute
interface SettlementPhysical { elevationM: number; slopePct: number; terrainClass: string; climateBand: string; tempDeciC: DeciC; seasonAmpDeciC: DeciC; precipMm: MmYr; lake?: 'fresh'|'brackish'|'salt'|'dry'; floodSummary?: { wetSeasonShare: number } }   // sampled from the world after the blend
interface TravelLaw { version: number; baseMode: 'foot'; daysPerWeek: 7 /* a day is a week ÷ 7, never a clock of its own */; kmPerWeek: Record<'foot'|'cart'|'river'|'coastal'|'sea', number>; modesRead: string[];
  water: { costPerDistRatio: number; stormFactor: number[] /* per quarter */ }; leg: { floorWeeks: number; capWeeks: number; rounding: 'nearest' }; gradeLeg: Record<string, number>;
  army: { factor: number; readinessGain: number; neutralReadiness: number; rounding: 'ceil' }; news: { factor: number; rounding: 'floor' };
  season: { quarterWeeks: 13; startWeek: number; terrainFactor: Record<string, number[]> /* per host terrain class, per quarter */ }; reachBandEdgesWeeks: number[]; bandEdges: { key: string; weeks: number; read: 'foot'|'army' }[] /* the reinforcement band among them */;
  tiers: { order: Rung[]; popThresholds: number[] }; prosperityRungs: number; basis: 'absolute'|'normalized'|'normalizedFrozen' /* normalized: a native world on the host's per-map calibration until its band census lands */;
  calibration?: { weeks: number; perCost: number } /* integers: one cost unit is weeks ÷ perCost weeks — the host's calibration at its latest canonize (on its normalized arm its anchor weeks over its median tier-1 hop cost); sent at every canonize, on either arm */;
  legWeeks?: { a: string; b: string; weeks: number }[] /* a migrated campaign's frozen leg weeks */ }   // the host's law as data (`world.travel`'s host slice); a standalone world reads the default row (V13 §2.3); nothing derived from a default is ever sent
interface AdvanceWindow { fromWeek: Week; toWeek: Week; advanceNonce?: string /* when the host's advance epoch is lit */; hostSeq: number /* the host's pulse-history sequence of the window's final record: the window's key while the epoch is dark */; seq: number }
interface PolityFacts { window: AdvanceWindow; seats: PolitySeat[]; links: PolityLink[]; relations: PolityRelation[]; sites: PolitySite[]; satellites: PolitySatellite[] /* J384 (11) */;
  claims: { by: string; target: string }[] /* a seat's standing claim on another seat — on the host, its lineage claim of a founding parent on its child or the reverse, a war reason it computes only while its lineage lane is lit (dark in every shipped preset): a DM-view claim outline that moves no cell (V13 §3.9 (12)) */;
  culture: { a: string; b: string; band: 0|1|2|3|4|5; sampled?: Week /* the week the host sampled the band, where it records one */ }[] /* the host's own culture distance between two seats in fifths, in its plain form over its whole vector — no trade tie (J384 (2)) — for every pair within the host's reinforcement band or at its neighbour tier ≤ 2 — pairs the host can name itself; a pair not sent reads 0 (`W_POLITY_CULTURE_ABSENT`); J382 */;
  waterLanes: { lit: boolean; lanes: { a: string; b: string }[] } /* the host's adopted water lanes and whether its lane system is lit; J382 */;
  roadWatch: { edge: string; power: string; kind: 'closed'|'warden'; since: Week }[]; christened: { root: string; name: string }[] }
interface PolitySeat { seat: string; tier: Rung; sizeThird: 0|1|2 /* the third of the tier's population band the seat's own people fall in — its satellites' people never counted (J384 (11)) */;
  prosperity: number /* the host's rung, 0 lowest; the sway reads it relative to the realm's held median (V13 §3.9 (7); J384 (1)) */;
  strengthBand?: 0|1|2|3|4 /* the host's own settlement-strength comparator — the one its relationship drift reads to choose a raider and an overlord — in fifths by its own strength banding (the one its envoys read); the adversarial push defers to it (V13 §3.9 (8); J384 (3)); absent until the host sends it */;
  military?: { forceBand: 0|1|2|3|4 /* the host's capacity facets bar the economy facet (manpower, institutions, materiel, logistics, will — prosperity counted once, J384 (4)), renormalised and banded on its existing five latent-strength floors */; garrisonPresent: boolean /* its garrison institution present */ } /* absent until the host sends it (V13 §8.5) */;
  since?: Week /* the week the row's rungs last changed, where the host records it; absent: the window's start */;
  changes?: { field: 'tier'|'prosperity'|'force'|'strength'|'garrison'; value: number; week: Week }[] /* optional, the host's choice: the window's dated rung changes (V13 §3.9 (13)) */ }
interface PolityLink { from?: string /* absent: an occupation the host records with no occupier */; to: string;
  word: string /* the host's own word — a vassal label of its relationship-state plane (the plane its simulation reads; the regional plane is never sent), a subordinating treaty term's kind (tribute, compelled alliance, puppet seat, a treaty-held occupation) or an occupation's — mapped by the adapter folder's link table */;
  occupationRung?: number; heldByTreaty?: boolean /* an occupation the host holds by a treaty's ceded garrison: an overlay at its rung, never a member link (V13 §3.9 (12)) */; continuous?: boolean /* the host's own reach verdict, when it has one */; covert?: boolean; since: Week }
interface PolityRelation { a: string; b: string /* sorted */; word: string /* the host's relationship-state label (the plane its simulation reads; the regional plane is never sent), mapped to respect, neutral or adversarial by the adapter folder's class table */; atWar: boolean; stance?: string /* the host's dated trade-stance word, mapped by the adapter folder's stance table; dark until the host sends it */; since: Week }
interface PolitySite { site: Id; holder?: string; garrisonBand?: 0|1|2|3|4; status: string }
interface PolitySatellite { key: string; parent: string; tier: Rung; at?: WorldPointCm /* its frozen site's point (the canon's sites slot); absent: an orbit-only satellite, neither drawn nor projected (`W_POLITY_SATELLITE_UNPLACED`) */; since: Week }
interface Sway { id: Id; seat: string; allegiance: Id; cells: Uint32Array /* fine */; border: WorldPointCm[][]; poleCm: WorldPointCm; neighbours: { sway: Id; class: 'kin'|'respect'|'neutral'|'adversarial' }[]; exclave: boolean; reason: Id }
interface Allegiance { id: Id; root: string; members: { seat: string; word: string; depth: number; continuous: boolean; verdictSource: 'host'|'map' }[]; name?: NameRef /* the DM's christening only, on a host-bound world */; revision: number }
interface MarchHold { pair: [string, string]; segment: Id; side: string; band: 0|1|2|3; since: Week }
interface SwayRevision { rev: number; week: Week; causes: Id[]; dirtyBox: { c0: number; r0: number; c1: number; r1: number }; law: Hash64; keyframe: boolean; medianRung: number /* the realm's held median prosperity rung in force (V13 §3.9 (7)) */ }
interface SwayTrace { rev: number; cells: Uint32Array; former: Uint16Array; formerStatus: Uint8Array }   // between keyframes only (V13 §2.6)
interface PatrolCadence { route: Id; fromStation: number; toStation: number; power: string; everyWeeks: 1|4|13|null; basis: 'hostWatch'|'garrison'|'debatable'; rev: number }
interface RouteGenesis { lawVersion: string; edges: { hostKey: string; a: string; b: string; mode: 'land'|'water'; grade: string }[]; week: Week }
interface NetworkChange { hostKey: string; kind: string /* the host's word, mapped by the adapter folder's network table to chartered, promoted, demoted, abandoned, revived, facet, bypass or retract */; grade?: string; avoids?: string /* a bypass: the seat the host's detour avoids */; radiusM?: number /* a bypass: the host's avoidance radius, integer metres, the adapter converting the host's unit */; facet?: Record<string, string>; via?: WorldPointCm[] /* a charter's course hint */; week: Week; window: AdvanceWindow }
interface WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'; seat?: string; edge?: string; mode?: 'land'|'water'; fraction?: { num: number; den: number }; pair?: [string, string]; at?: WorldPointCm }   // resolved at fold, kept as a dated fact
interface TimeDeltaReceipt { baseline: number /* the canon version the host read (`canonized`) */; legs: { a: string; b: string; foot: [number, number]; army: [number, number]; bandsCrossed: string[]; fragile: boolean }[]; causes: Id[] }
interface HostGateRef { pairKey: string; cellA: number; cellB: number; atCm: WorldPointCm }   // an imported legacy world's host gates as world points (V13 §3.15 (3))
// @plat/world/lens — the lenses (V13 §5.8, §5.9; J-V13.87 – J-V13.95): derived layers over the facts the host sends of its simulated systems; never a stage, never in a digest
type LensId = 'plague'|'sway'|'patrols'|'trade'|'populations'|'religion'|'prosperity'|'alignment';   // `world.lens`'s order (J384 (8)): plague first, then the sway (the owner's territory) and patrols, trade and populations, religion, prosperity and alignment
type FactClass = 'hostStored'|'hostDerived'|'placement'|'mapDerived'|'dmPlaced';   // the four classes of host mark, and only four, beside the DM's own world sites (V13 §5.8 (4))
type GateExpr = { lane?: string /* a host lane lit, by the adapter folder's lane table */; canon?: boolean; slot?: 'seaLanes'|'teleport'|'seasonal'; beliefs?: boolean; deity?: boolean /* a deity seated anywhere */; plague?: boolean /* a plague live */;
  sent?: string /* a port field the host sent non-empty */; all?: GateExpr[]; any?: GateExpr[]; not?: GateExpr };
interface LensLayer {                         // one per lens: a row of `world.lens` (V13 §2.3) with its element functions; drawn by one code path (V13 §5.8 (1))
  id: LensId; asked: string /* the owner rule that asked for it */; subject: string /* the host system it draws, by the adapter folder's system table */; order: number;
  sources: { field: string /* a port field: `LensFacts.plague`, `PolityFacts.seats`, the `WorldEvent` kinds tagged with this lens … */; gate: GateExpr }[];
  regimes: { word: string; when: GateExpr; reason: string /* the banner's sentence in this volume's words */ }[] /* the first whose `when` holds names the regime; the last is the lens's still word */;
  elements: LensElement[]; events: string[] /* the event kinds it reads, by the adapter folder's event table */;
  legend: { vocabulary: string /* the adapter folder's word table for this lens */; polarity?: string /* the polarity table */; notes: string[] /* the bias and authorship notes (V13 §5.8 (3)) */ };
  refusals: { what: string; reason: string }[] /* V13 §5.9's refusals, enforced: a draw asked for one is refused (`refuse.lens.invented`) */ }
interface LensElement { key: string; class: FactClass; placed?: boolean /* a host fact positioned by map geometry (a seat area, a likely road, a site point), labelled */; grammar: 'glyph'|'link'|'routeFlow'|'movingMarker'|'catchment'|'areaFill'|'overlay'|'caption'; reads: string[]; gate: GateExpr;
  audience: 'dm'|'public'|'believed' /* the most it may reach; each row's own resolved audience narrows it */; scrub: 'hostDated'|'plate'|'swayRevision';
  label?: string /* the derivation label a host-derived, placement, placed, map-derived or DM-placed mark carries: "by the host's law", "likely road", "likely carriage", "projection", "DM-placed" */; style: string /* a `style.world` row */ }
interface HostRegime { born: boolean /* the campaign runs its birth defaults, no preset applied */; canon: boolean /* the host's canon marker */; slots: { seaLanes: boolean; teleport: boolean; seasonal: boolean } /* its frozen record's */;
  lanes: Record<string, boolean> /* each host lane, by the adapter folder's lane table */; deitySeated: boolean; plagueLive: boolean; beliefs: boolean /* it records per-observer belief */; intensity?: string /* the host's intensity word, by the adapter folder's lane table, when sent */ }
type Aud = 'public'|'dmOnly';   // a row's resolved audience; a row the host sends without one is folded dmOnly (V13 §5.8 (7))
type LensGood = { key: string /* the host's catalog key as its supply links key the good (`arrivals[].good`), never its label */; label: string /* the host's own label, as its dossier shows it */; loose?: boolean /* the host reached the key only by its loose reading, when sent */; category: string /* sent by the host with the good; its word drawn through the adapter folder's goods table */; ships: boolean /* sent by the host: whether its caravans ship the good — never derived here from the category */; transit?: boolean /* sent by the host: an entrepôt's transit good */ };   // a good or a service as the host's goods catalog keys it (J380; V13 §5.9 (4))
interface LensLink { lens: LensId; a: string; b: string; kind: string /* the host's word, by the adapter folder's link table */; status?: string; weight?: number /* a band the host computed by its own law: a host-derived mark */; deity?: string; since?: Week; audience: Aud }
interface LensFacts {                         // one set of the lens window (`WorldPort.lensWindow`, V13 §3.11.6): a presentation input kept as plates; the host's words through the adapter folder's tables
  window: AdvanceWindow; audience: 'dm'|'party' /* the DM's set, or the party's believed set where the host records belief */; regime?: HostRegime /* absent: `W_LENS_REGIME_ABSENT` */;
  plague?: { seat: string; phase?: string /* the host's phase word: its epidemic ledger's, on the canon only */; band?: 0|1|2|3 /* that ledger's level on the host's own edges */; source?: string; carrier?: string /* only from the host's per-hop receipt (V13 §8.5's H24) */; arrivedWeek?: Week; onsetWeek?: Week; clearWeek?: Week;
    footprint?: boolean /* a same-week spread (without the canon; on it, the migration and service joins the host keeps): no source, no time */; stage?: string /* a footprint row's stage word */; severity?: number /* a footprint row's band */; audience: Aud }[];
  faith?: { seat: string; patron?: string /* a deity key */; shares: { deity: string; pct: number; standing?: string /* the host's local rank word for the deity at the seat */ }[] /* integers, Σ 100; '' the unaffiliated */; piety?: number; contested?: boolean; rulerDiffers?: boolean; disorder?: number;
    suppressed?: string[] /* the deity keys the host holds suppressed at the seat — the DM's set only: a party set's are dropped at fold (V13 §5.8 (7); J379) */; audience: Aud }[];
  hierarchy?: { superior: string; member: string; deity?: string; audience: Aud }[]; faithPlaces?: { seat: string; word: string /* the host's held label */; deity?: string; audience: Aud }[];
  realmPiety?: number /* the host's realm piety, sent where its spread lane is lit */; fracture?: { seat: string; severity: number /* the host's band */; audience: Aud }[] /* its conversion-fracture stressor's affected seats */;
  realmRank?: { deity: string; tier: string /* the host's tier word, ordered, highest first, by the vocabulary table's tier order */; seats: number /* its patron seats: the only driver of its tier */; wins: number; losses: number; audience: Aud }[] /* the host's realm ranking of its deities (J380's "global diety rankings"); public where its allowlist has it */;
  catchments?: { seat: string /* the rite's own seat */; members: string[] /* the seats the host's draw read for that occurrence — a set it computes and today drops, sent once H23 surfaces it */; act?: string /* the rite's act word */; deity?: string /* the rite's deity, when it has one */; week: Week; audience: Aud }[] /* a grand rite's pilgrim catchment, only when sent: never recomputed here */;
  rites?: { seat: string /* the adopter, or the vassal */; origin: string /* the settlers' origin, or the overlord */; kind: string /* the host's word: adopted or imposed */; year: number /* the host's year: it keeps no week */; deity?: string; audience: Aud }[] /* the host's adopted and imposed rites with their origin, only when sent */;
  links?: LensLink[] /* channels, faith carriers and fronts, the plague forecast, faith pressure and prescription, tolerance pulls, the patrons' quadrant postures */;
  arrivals?: { consumer: string; source: string; good?: string /* the supply link's input good, by its catalog key (`LensGood.key`), when sent */; week: Week; load?: number; audience: Aud }[];
  economy?: { seat: string; produces: LensGood[]; needs: LensGood[] /* its necessity imports and trade dependencies */; exports: LensGood[]; imports: LensGood[]; services: LensGood[] /* its sellable services */;
    foodCoverage?: { pct: number /* the host's import coverage over its raw food deficit — both its dossier's per-day figures — computed by the host on send, integer percent; never its import-dependency percent, a different measure */; cut?: string /* the siege or occupation stressor whose import cut is in force — it removes the seat's import dependency, not this share — by the stressor's own word, never the war's besieged (V13 §5.8 (6)) */ };
    stocks?: { good: string; band: string /* the host's stock band word */ }[]; throughput?: { in: string; out: string } /* the host's inbound and outbound throughput words */;
    entrepot?: { centrality: number; toll: number /* both in hundredths: the adapter's integer rounding of the host's 0–1 values, the toll in the host's median-hop units */; since?: Week /* the week its sustained centrality began; absent when the host holds none */; audience: Aud } /* the host's entrepôt record for the seat */;
    audience: Aud }[] /* J380's "imports, exports, production, consumption, of goods and services": each settlement's economy as the host's dossier judges it at its last survey; stocks, throughput and the entrepôt only where the host's finite stocks run on the canon */;
  journeys?: { traveller: string; kind: string; path: string[] /* the host's frozen settlement path */; legs: { from: Week; to: Week }[] /* its leg clock */; audience: Aud }[];
  transfers?: { from: string; to: string; people: number; kind: string; week: Week; audience: Aud }[];
  columns?: { id: string; from: string; to: string; people: number; departWeek: Week; arriveWeek: Week; carriage?: 'road'|'sea'|'teleport' /* only when the host stores the dispatched route (H27) */; audience: Aud }[];
  sizes?: { seat: string; population: number; audience: Aud }[]; trend?: { seat: string; sign: -1|0|1 /* by the host's law */; audience: Aud }[];
  prosperity?: { seat: string; band: string /* the party's believed band word: rows of the party's set only — the DM's set reads `PolitySeat.prosperity`, whose public audience is the host's printed word (V13 §2.2's knowledge paragraph) */ }[];
  pulses?: { week: Week; deltas: { seat: string; delta: number }[]; outcomes: { seat: string; severity: number }[]; audience: Aud }[] /* once, at first bind: the host's kept per-advance records, at most its 80 (V13 §5.8 (8)) */;
  alignment?: { seat: string; law: 0|1|2; malice: 0|1|2 /* the host's own bands of its own reading, normalised by the polarity table */; aggression?: string /* its chip word; absent in the host's neutral band */; causes?: string[] }[] /* the DM's set only (J384 (7)) */ }
interface LensPlate { seq: number /* the window's */; week: Week /* its toWeek */; sets: LensFacts[] /* the DM's and the party's */; rungs: { seat: string; rung: number }[] /* the window's polity rungs */;
  key: boolean /* a whole plate; else a delta on the previous kept plate */; pinned: boolean }   // the world document's plate cache (`Document.lensPlates`, BCR-V13-38), outside every digest (V13 §2.7, §5.8 (8))
```

**The frame's side** (BCR-V13-2, BCR-V13-3, BCR-V13-5): `Terrain` gains `carveDeltaCm: Map<number, number>` (per hydro
cell, the delta S1 (3)'s carve lowered it by; `preCarveHeightAt(p)` = `heightAt(p)` + the cell's delta), `surfaces:
WaterSurface[]` (one generation-time surface per `WaterBody` — the sea at `seaLevelCm`, each lake at its spill height,
each reach's stage profile — and every dated surface after it) and `groundwater: GroundwaterField` (`grid: 'hydro'`);
`Terrain.datumCm` and `Terrain.wind` stay exactly what S1 wrote and are read only through the accessors `datumOf(doc)`,
`windOf(doc)` and `sunAt(doc, week, hour)` (`@plat/model`): on a standalone frame each returns S1's value (the datum,
`Terrain.wind`, the sun from the recipe's `Intent.latitudeDeg`, DR29); on a placed frame `datumOf` returns the world's
DEM at the placement's origin and `windOf` the charter's wind in frame terms, **each read through the world document
named by `worldRef` at call time — a derived reading, never stored in the frame** (Revision 1, C13-01: no placement
writes a field the model digest hashes; bar 3). The model-side sun (§4.5's daylight term, field pass 1) stays the
recipe's latitude until a `worldWins` re-derives the frame; a placement whose latitude differs from the recipe's is a
`PlacementAnomaly` kind `sunDiffers` (V13 §3.11.5). `Document` gains `worldRef?: { world: Uuid; placement: Id }`
(written only by the frame's own `charter` event, V13 §4.1) and `Recipe` gains `charter?: FrameCharter` (present exactly
when the frame was generated or re-derived from a **world-sourced** charter, `source: 'world'`; a settlement-first
placement's charter lives on the world's `Placement` alone, C13-03) and `product: 'world'` with `Recipe.world`. The base's water-table rule (§2.6 *Basements*; SW-23) is replaced by `waterTableAt(doc, p, when?)`
(V13 §3.12.3). A standalone frame — no `worldRef` — keeps every base behaviour: `datumOf` returns S1's value, the
surfaces are S1's at generation, the groundwater field is derived from them, and the charter is absent.

**Knowledge on world facts.** Every world entity above carries `knownTo` as §9.2's admission reads it on a frame's
entities (`'public'|'local'|'secret'`), default `public` for physical facts and `local` for a `SitingProposal`; V14's
five knowledge layers (exists, DM knows, players know, players reached, discoverable) are V14's reading of the same key
with its `SiteAnchor`'s flag, stated there; this volume adds no fourth tier. **Host facts carry the host's resolved
audience** (J-V13.77): a host fact the host resolves public is `public`; one it reserves for the DM is DM-only — V14
§2.3's `SecretState` state `dmOnly`, so its geometry is withheld with it; a fact the host hides is never sent; a host fact
arriving with no resolved audience is stored DM-only; `local` is admitted on a world only through the party's places. One
mapping serves world events and the dossier conditions a frame draws.

### 2.3 New rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

Every value below is **our own** (provenance `own`, `extension`), PLAUSIBLE until measured (V13 §12), calibratable
against the corpus when its stage comes (§13.9; the `M-CAL/world` run, V13 §8), save the cells marked *physics* — a
published physical constant (the lapse rate, the seconds in a year) — which carry provenance `physics` and are not
calibratable. Where a value leans on the reference generator's published behaviour the note names the research file and
section as evidence, never as a source of the number; every number is this volume's. The tables join V11's registry as
new rows (`world.*`, `place.*`, `water.*`; V11 §3.1's next free row numbers, assigned at W1's landing, V13 §8).

```ts
interface WorldSizeRow { rung: WorldSizeRung; widthKm: number; heightKm: number; fineCellM: number; coarseRatio: number;
  defaultLatBox: [number, number]; budgetMs: number /* V13 §6 */; reliefLimitM: number; docMb: number /* the gzipped document budget, V13 §2.7 */; exportStride: number /* the ecosystem export's cells per fine cell, V13 §5.4 */ }   // world.sizes
interface RecipeOpRow { op: RecipeOp['op']; params: Record<string, [number, number] /* the admitted range, metres or a share */>; cost: number | 'octaves×2' | 'passes×3' /* work units per touched fine cell (V13 §6): hill, pit, strait, mask, invert, add, multiply, image, geology 1; range, trough 2; noise octaves × 2; smooth 3 × passes */ }   // world.recipeOps
interface ClimateWorldRule {                                                                                   // world.climate — W3
  tropicsDeg: number; lapseDeciCPerKm: number; seasonAmpMaxDeciC: number; seasonContinentalShare: number; continentalityReachKm: number;
  phaseWeekNorth: number; phaseWeekSouth: number;
  winds: { fromDeg: number; toDeg: number; bearingCdeg: Cdeg; strength: number }[];
  moisture: { pickupPerCellOverWater: number; dropShare: number; orographicPerM: number; coastalBonus: number; barrierM: number; rainCapMm: MmYr };
  evap: { baseMm: MmYr; zeroAtDeciC: DeciC; fullAtDeciC: DeciC } }
interface HydroWorldRule {                                                                                      // world.hydro — W4
  lakeMinDepthCm: Cm; breachToleranceCm: Cm; runoffShare: number; riverMinM3s: M3s; navigableM3s: M3s;
  width: { a: number; b: number }; depth: { c: number; f: number }; chaikinPasses: number;
  mouth: { deltaSlopeMax: number; deltaReachKm: number; estuaryWidenShare: number; estuaryReachKm: number /* W6's coastType reads it */ }; exitDropCm: Cm;
  carveMaxCm: Cm /* the world's carve cap (V13 §3.5.2) */; maxReachCellsFactor: number /* a reach's trace cap, × the grid's longer side (V13 §3.16) */;
  tidalRangeCm: Cm /* every sea's default tidal range; a lake 0 (V13 §3.12.7) */; importSeaDepthM: number /* the import's bathymetry (V13 §3.15) */;
  secondsPerYear: number /* physics: 31 557 600 */ }
interface GroundwaterRule {                                                                                    // world.groundwater — W4 and the frame's step
  gradientBase: number /* m per m, at precipRefMm */; precipRefMm: MmYr; permeability: Record<'ordinary'|'soluble'|'volcanic'|'impermeable', number>;
  minDepthCm: Cm /* the table never rises above ground − minDepth except at a spring cell */; perchDepthCm: Cm; springMarginCm: Cm; springSpacingM: number;
  springMinAccumCells: number; liner: { headLimitCm: Cm } /* V13 §3.12.6 */; deepTableCm: Cm /* F-GW's dry table (V13 §3.16) */ }
interface BiomeRow { id: string; label: string; habitability: number /* 0–1 */; moveCost: number; landUse: 'ice'|'tundra'|'forest'|'grass'|'scrub'|'desert'|'wetland'|'alpine'; vegetation: number /* 0–1 */; climateRow: string /* one of V11 §2.8's ClimateRow.biome keys (the mapping table below; C13-16) */; colour: Color /* the view's fill (V13 §5.1) */ }
interface ResourceSite { id: Id; kind: string; at: WorldPointCm; cell: number; amount: number /* 0–1 */; reason: Id }   // W5's resource record (V13 §3.6)
interface BiomeMatrixRow { id: string; moistureBands: MmYr[] /* the upper bounds of the moisture columns */; tempBands: DeciC[] /* the upper bounds of the temperature rows */; cells: string[][] /* biome ids, [tempRow][moistureCol] */;
  overrides: { water: string; permafrostBelowDeciC: DeciC; wetlandAccumCells: number; alpineAboveM: number } }   // world.biomes
interface SuitabilityRule { weights: Record<'habitability'|'discharge'|'lowland'|'coastType'|'resource'|'spring'|'destination'|'connectivity', number>;
  discharge: { refM3s: M3s }; lowland: { refM: number }; coastType: Record<'none'|'open'|'bay'|'estuary'|'lake'|'saltLake', number>;
  spacing: { capitalKm: number; townKm: number; shrink: number; targetShare: number; capitalPerKm2: number; townPerKm2: number }; portPromote: number; minPortsPerBody: number;
  reach: { estuaryKm: number; resourceKm: number; siteKm: number; overlookKm: number; roadControlKm: number; settlementKm: number }; navigableBonus: number; coastalHabitabilityBonus: number;
  stage2: { connectivityRefRoutes: number } }   // world.suitability — W6a, W6b
interface RouteCostLaw { version: number /* the host's cost-law version; 0 the default row */; landBase: number; perM: number; slopePerPct: number; biomeFactor: Record<string, number> /* the default row: each biome's moveCost */;
  classFactor?: Record<string, number> /* the host's per-terrain-class factor through the adapter folder's class table; when present it replaces biomeFactor */; elevationKneeM?: number; elevationKneeFactor?: number /* the host's elevation knee: a step above it costs × the factor */; riverCellAdd?: number /* the host's add on a river cell */;
  riverCrossing: number; waterPerM: number; seaPerM: number; navigableRiverPerM: number;
  bears: Record<string, 'time'|'choice'> /* each term's tag: the base, the per-metre and slope terms, the knee, the river-cell add and the class factors bear time; riverCrossing bears choice; a host law carries its own tags */ }   // world.routes — the host's law as data (a host slice, `costLaw`; the default row ours): W7, W8a, W8b, derivedTime
interface RouteLayRule { existingRoute: number; portOnly: boolean; classes: { primaryShare: number }; routeToleranceM: number; maxCostFactor: number;
  sea: { trunk: boolean /* every well-ported landmass gets one sea trunk to the largest landmass */; gapFixRatio: number /* a port pair whose sea cost ≤ ratio × its land cost gets the sea leg too */ }; exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time
interface PolityRule {                                                                                       // world.polity — W8a, W8b (V13 §3.9); every cell {value, unit, provenance, calibratable}
  reach: { lambda: number; reachTierDays: Record<Rung, number> /* Λ·τTier in foot-days */; capFactor: number /* capTier = capFactor × reachTier */; kSize: [number, number, number] /* log-linear: 1.15^(third − 1) */; kProsperity: number[] /* by the relative rung −3 … +3 (V13 §3.9 (7)), lowest first; log-linear: 1.1^(relative rung) */ };
  culture: { phi: number /* the step slowing at a culture distance of 1 */; dwellWeeks: number }; water: { lodgementDays: number }; river: { crossingDays: number /* added to t at a step across a reach ≥ navigableM3s: the sway's own resistance, never a route time */ };
  margins: { civ: number /* L */; mil: number /* bands */; muPerBand: number /* L */; pushPerBand: number /* L per band of the host's strength order (V13 §3.9 (8)) */; strengthDwellWeeks: number };
  military: { tauMilDays: Record<'seat'|'fort'|'watchpost'|'bridgeFort'|'tollhouse'|'tower', number>; garrisonBonus: number /* bands added to a source's force band where a garrison is present */; offRoadFactor: number; dwellWeeks: number };
  chain: { delta: number; depthMax: number; bMax: number; wTier: Record<Rung, number>; wTributary: number; rho: number /* L */ };
  march: { halfLifeWeeks: number; bands: number; muHoldPerBand: number /* L */; fightingWeeks: number }; prosperityDwellWeeks: number; prosperityClamp: number /* the relative rung's bound (V13 §3.9 (7)) */;
  patrol: { cadenceWeeks: [1, 4, 13]; hostileDays: number; gradeShift: Record<string, -1|0|1>; forceShift: { denserFromBand: number; sparserToBand: number } };
  normalize: { enclaveMaxCells: number; spikeMaxCells: number; smoothPasses: number }; province: { perSeatCells: number; minCells: number }; polePrecisionM: number;
  retention: { keyframeEvery: number; thinAfterYears: number } }
interface WorldLabelRule { priority: Record<'sea'|'lake'|'river'|'range'|'territory'|'province'|'settlement'|'site', number>; zoomExtent: Record<string, [number, number]>; spreadPx: number; riverMinKm: number }   // world.labels — W9
interface GlyphLevelRow { level: 0|1|2|3; fromStop: number; toStop: number; marks: GlyphMark['kind'][]; toleranceM: number; minTier: Rung; fromStopByTier: Record<'THORP'|'HAMLET'|'VILLAGE'|'TOWN', number> /* the first stop a tier draws at this level (C13-52) */ }   // world.glyph — W9 and the view
interface CoherenceRule { weights: Record<CoherenceCost['terms'][number]['term'], number>; lawfulMax: number; bearingStepCdeg: Cdeg; originSearchM: number; originStepCells: number;
  blendBandM: number; blendBandMaxM: number; stationCm: Cm; edgeRmsRefCm: Cm; coastSearchM: number; riverMatchM: number; sunDiffersDeg: number; coarse: { bearings: number; stations: number; keep: number } /* nearestLawful's first tier (V13 §3.11.1) */ }   // place.coherence — P1, P2, P4
interface WaterClassRule { dampMarginCm: Cm; wadingMaxCm: Cm; floorSampleM: number; shareSubmerged: number; route: { wadeMaxCm: Cm; swimMinAirCm: Cm; diveMaxM: number } }   // water.class — the shared test (C13-48)
interface FloodRule { seasonal: { dryShare: number; wetShare: number }; eventStage: Record<'minor'|'moderate'|'major'|'catastrophic', number /* × the bankfull depth */>; barrierKinds: string[]; spreadMaxCells: number }   // water.flood — V13 §3.12.4
interface WorldStyleRule { riverDrawM3s: [M3s, M3s, M3s, M3s] /* per stop, V13 §5.1 */; ghostDepthCm: Cm /* a submerged ruin's ghost limit */; reliefBandsM: number[]; tableBandsM: number[] }   // style.world — the view (V11 writes the rows; C13-31)
interface LensRule {                                                                                         // world.lens — the lenses (V13 §5.8, §5.9); every cell {value, unit, provenance, calibratable}
  lenses: { id: LensId; order: number; asked: string; regimes: { word: string; when: GateExpr; reason: string }[] }[] /* V13 §5.9's regime words per lens, first match; the last the still word */;
  plates: { fullWeeks: number; compactWeeks: number; keyEvery: number; storeMbGz: number };
  collisions: { word: string; meanings: string[]; written: string }[]; polarity: { axis: string; high: string }[] /* the convention; the adapter folder's table names each host axis's own sign */;
  draw: { linksPerSeat: number; markersPerView: number } /* beyond a cap: the strongest by the host's own weight or the latest by week, ties by the lower seat key, then the lower id */ }
```

| `WorldSizeRow` | `widthKm × heightKm` | `fineCellM` | `coarseRatio` | `defaultLatBox` | `budgetMs` (V13 §6) | `reliefLimitM` | `docMb` | `exportStride` |
|---|---|---|---|---|---|---|---|---|
| `province` | 320 × 200 | 250 | 8 (2 km) | [40, 50] | 600 | 6 000 | 3 | 4 |
| `realm` | 1 280 × 800 | 500 | 8 (4 km) | [30, 55] | 1 800 | 8 000 | 11 | 7 |
| `continent` | 3 840 × 2 400 | 1 000 | 8 (8 km) | [15, 65] | 4 500 | 10 000 | 24 | 10 |

The `continent` extent is no host map's equal: the reference generator's scale is drawn per map (an integer about 3)
in the browser's unit (miles on a United States locale, kilometres elsewhere) over the window's own pixel extent, so an
imported map's width is its pixel width × its scale × its unit's metres (a 1 920 px map at 3 mi per pixel is 9 270 km,
UNMEASURED across the host's estate), and the import keeps the declared size, coarsening or cropping only with the DM's
consent (V13 §3.15 (2));
the cell sizes give 1.02 M, 4.1 M and 9.2 M fine cells and 16 k, 64 k and 144 k coarse cells. A request may give its own
extent inside [0.5, 2] × the row's.

| `ClimateWorldRule` | default | note |
|---|---|---|
| `tropicsDeg` | 16 | the band of constant sea-level temperature about the equator |
| `lapseDeciCPerKm` | 65 | physics: 6.5 °C per km, land only |
| `seasonAmpMaxDeciC` / `seasonContinentalShare` / `continentalityReachKm` | 300 / 0.4 / 500 | the annual amplitude at the pole on a continental interior; the share of amplitude continentality adds; the distance to sea at which continentality is 1 |
| `phaseWeekNorth` / `phaseWeekSouth` | 23 / 49 | the hottest week of the year (0–51 from spring, §4.11's calendar) in the calendar hemisphere and in the other: midsummer at week 19 plus four weeks of land lag (the coldest week 49 falls inside the host's winter quarter, 39–51); a southern-calendar world (`WorldRecipe.calendarSouth`) swaps the two; on a host-bound world the calendar hemisphere is the one the host's seasons name, and a seat across the equator keeps its physical truth and is reported `W_WORLD_HEMISPHERE` |
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
| `mouth.estuaryReachKm` | 10 | W6's `coastType` reads `estuary` within it of an estuary mouth |
| `carveMaxCm` / `maxReachCellsFactor` | 600 / 4 | the world's carve cap; a reach trace longer than 4 × the grid's longer side is cut (F-WORLD) |
| `tidalRangeCm` / `importSeaDepthM` | 200 / 20 | every sea's tidal range (a lake 0); the import's uniform bathymetry |
| `secondsPerYear` | 31 557 600 | physics |

| `GroundwaterRule` | default | note |
|---|---|---|
| `gradientBase` / `precipRefMm` | 0.005 / 800 | the table rises 5 m per km inland at 800 mm/yr, scaled linearly by precipitation ÷ 800 |
| `permeability` | ordinary 1.0 · soluble 0.4 · volcanic 0.7 · impermeable 1.6 | a factor on the gradient: karst drains deep, clay holds water high |
| `minDepthCm` / `perchDepthCm` / `springMarginCm` | 50 / 300 / 30 | the table's least depth below ground; a perched table over impermeable rock stands 3 m under the ground; a cell whose table is within 30 cm of its ground is a spring candidate |
| `springSpacingM` / `springMinAccumCells` | 400 / 4 | one spring per 400 m along a thinning pass; a spring needs 4 upstream cells of accumulation |
| `deepTableCm` | 3 000 | F-GW's dry table where no surface exists (V13 §3.16) |
| `liner.headLimitCm` | 150 | a lined cistern or sewer invert holds the table back up to 1.5 m of head (V13 §3.12.6) |

| `BiomeRow` id | habitability | moveCost | landUse | vegetation | V11 `ClimateRow.biome` key (V11 §2.8; C13-16) |
|---|---|---|---|---|---|
| `ice` | 0 | 5 | ice | 0 | `cold` |
| `tundra` | 0.1 | 2.5 | tundra | 0.2 | `cold` |
| `boreal` | 0.3 | 2 | forest | 0.8 | `temperate-coniferous` |
| `temperateForest` | 0.9 | 1.5 | forest | 0.9 | `temperate-deciduous` |
| `temperateGrass` | 1.0 | 1 | grass | 0.4 | `mixed` |
| `mediterranean` | 0.8 | 1.2 | scrub | 0.5 | `maritime` |
| `hotDesert` | 0.1 | 2 | desert | 0.05 | `arid` |
| `coldDesert` | 0.1 | 1.8 | desert | 0.1 | `arid` |
| `savanna` | 0.6 | 1 | grass | 0.4 | `tropical` (requested of V11, BCR-V13-26; `mixed` until it lands) |
| `tropicalSeasonal` | 0.7 | 1.5 | forest | 0.9 | `tropical` (BCR-V13-26; `temperate-deciduous` until it lands) |
| `rainforest` | 0.5 | 2.5 | forest | 1.0 | `tropical` (BCR-V13-26; `temperate-deciduous` until it lands) |
| `wetland` | 0.3 | 3 | wetland | 0.7 | `wetland` (requested of V11, BCR-V13-26; `maritime` until it lands) |
| `alpine` | 0.2 | 3 | alpine | 0.2 | `cold` |

The six keys are V11's (`temperate-deciduous`, `temperate-coniferous`, `mixed`, `maritime`, `arid`, `cold`); the two
rows the matrix needs and V11 lacks (`tropical`, `wetland`, with their dry, season and weather cells) are BCR-V13-26's
request, each with its stand-in key until it lands, so no biome ever resolves to nothing (T-V13-13's chartered S0).

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
| `weights` | habitability 1.0 · discharge 0.6 · lowland 0.4 · coastType 0.5 · resource 0.3 · spring 0.4 · destination 0.5 (the world-site term, `reach.siteKm`; SW-01) · connectivity 0.8 (stage 2 only) |
| `discharge.refM3s` / `lowland.refM` | 100 / 500 (the discharge and elevation at which the terms read 1) |
| `coastType` | none 0 · open 0.4 · bay 0.9 · estuary 0.8 · lake 0.7 · saltLake 0.2 |
| `spacing.capitalKm` / `townKm` / `shrink` / `targetShare` | 120 / 25 / 0.85 / 0.7 (a pass that places fewer than 0.7 × its target multiplies its spacing by `shrink` and repeats, V13 §3.7) |
| `spacing.capitalPerKm2` / `townPerKm2` | 60 000 / 1 500 (a continent of 6 M km² seats ~100 capitals) |
| `reach.estuaryKm` / `resourceKm` / `siteKm` / `overlookKm` / `roadControlKm` / `settlementKm` | 10 / 10 / 15 / 1 / 2 / 20 (the terms' reach radii, V13 §3.7) |
| `navigableBonus` / `coastalHabitabilityBonus` / `minPortsPerBody` | 0.2 / 0.1 / 2 (a water body with fewer than two port candidates gets none, V13 §3.7 (3)) |
| `portPromote` / `stage2.connectivityRefRoutes` | 1.5 / 3 |

| `RouteCostLaw` (`world.routes`: the host's law as data — a host-bound world reads only the host's slice; the default row ours, V13 §3.8) | default | bears |
|---|---|---|
| `landBase` / `perM` / `slopePerPct` | 1 / 0.001 / 0.15 (cost per metre of a level cell is 0.001 × (1 + 0.15 × slope %)) | time |
| `biomeFactor` (`classFactor` on a host's law) | each biome's `moveCost` (above) | time |
| `elevationKneeM` / `elevationKneeFactor` / `riverCellAdd` | absent in the default row (the host's law carries its own) | time |
| `riverCrossing` | 40 (a crossing of a reach ≥ `riverMinM3s`) | choice |
| `waterPerM` / `seaPerM` / `navigableRiverPerM` | ∞ on land (water impassable on land legs) / 0.0004 / 0.0006 | time |

| `RouteLayRule` (`world.routeLay`: the map's own, never the host's) | default |
|---|---|
| `existingRoute` / `portOnly` | 0.5 (× on a cell already carrying a route: choice only, never in a time) / true |
| `classes.primaryShare` | 0.3 (standalone: the first 30 % of edges by seat rank are `highway`, the rest `road`; trails join every remaining seat) |
| `routeToleranceM` / `maxCostFactor` | 60 / 6 (the polyline's simplification; a path over 6 × the straight cost is dropped) |
| `sea.trunk` / `sea.gapFixRatio` | true / 1.5 (standalone: every well-ported landmass gets a sea trunk to the largest landmass; a port pair whose sea cost ≤ 1.5 × its land cost also gets the sea leg) |
| `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |

| `TravelLaw` default row (`world.travel`; standalone only — a host-bound world reads the host's slice, and nothing derived from this row is ever sent) | default (own; the host's values as evidence) |
|---|---|
| `kmPerWeek` foot / cart / river / coastal / sea | 150 (21 km a day) / 120 / 250 / 600 / 900 |
| `leg.floorWeeks` / `leg.capWeeks` / `leg.rounding` | 1 / 52 / nearest |
| `army.factor` / `news.factor` | 1.5 (rounded up) / 0.5 (rounded down) |
| `season.quarterWeeks` / `reachBandEdgesWeeks` | 13 / 1, 4, 13, 52 |
| `bandEdges` | reinforcement 5 army weeks (`read: 'army'`) |
| `basis` | absolute |

| `PolityRule` (every own cell PLAUSIBLE, registered in V12 as UNMEASURED until the 300-year sweep of B-WORLD-lite under B-POLITY (V13 §7) measures it; a day is a week ÷ 7 at the travel law's foot speed) | default | anchor |
|---|---|---|
| `reach.lambda` / `reach.capFactor` | 4 / 1.5 | the floor at L = 0; capTier = 1.5 × the tier's reach |
| `reach.reachTierDays` THORP / HAMLET / VILLAGE / TOWN / CITY / METROPOLIS | 0.2 / 0.3 / 0.5 / 0.8 / 2.5 / 6 foot-days | a village's market reached in a third of a day; a market town's hinterland about a day's round trip; a city-state's two to three days; a capital's reach limited by days, a realm's by weeks of courier travel (the loss-of-strength gradient; central places) |
| `reach.kSize` (small, middle, large third of the tier's population band; the seat's own people, J384 (11)) | 0.87 / 1.00 / 1.15 (1.15^(third − 1)) | T2's "exponential to the size" (J385) |
| `reach.kProsperity` (the relative rung −3 … +3, lowest first; J384 (1)) | 0.75 / 0.83 / 0.91 / 1.00 / 1.10 / 1.21 / 1.33 (1.1^(relative rung)) | T2's "exponential to … prosperity" (J385); relative, so the host's realm-wide upward drift inflates no reach |
| `culture.phi` / `culture.dwellWeeks` | 0.5 (a step into land of the farthest culture takes 1.5 × the time) / 13 | J382: the host's culture distance, banded in fifths |
| `water.lodgementDays` | 0.5 | J382: across water a coastal lodgement, never the far shore |
| `river.crossingDays` | 0.25 | a big river is a border: two equal seats across a navigable river split at the river when one is nearer it by less than this |
| `margins.civ` / `margins.mil` / `margins.muPerBand` / `pushPerBand` / `strengthDwellWeeks` | 0.75 L / 1 band / 1 L / 0.5 L (a band of the host's strength order moves the line a quarter of the smaller τ of the two toward the weaker) / 13 weeks | the debatable width 0.75 τ between equal seats (T-V13-41 (e)): about a sixth of a foot-day between two towns, half a day between cities, a day between metropolises |
| `military.tauMilDays` seat / fort / watchpost / bridgeFort / tollhouse / tower; `garrisonBonus`; `offRoadFactor`; `dwellWeeks` | 0.5 / 1 / 0.4 / 0.5 / 0.3 / 0.3; 1 band; 2; 4 | a garrison's ride along its roads |
| `chain.delta` / `depthMax` / `bMax` / `wTributary` / `rho` | 0.25 / 2 / 0.5 / 0.5 / 1 L | diminishing returns on chain length: no snowball |
| `chain.wTier` THORP … METROPOLIS | 0.02 / 0.04 / 0.06 / 0.1 / 0.2 / 0.3 | — |
| the reinforcement band Treinf and the realm's cap | the largest seat-to-seat cost whose host hop weeks, run through the host's army arithmetic at neutral readiness, stay within the reinforcement band edge — in cost units under the calibration sent with the travel law; on the normalized arm a multiple of the realm's median tier-1 hop (under three and a half at the host's present values), never a day count; provenance host, never authored or calibrated here | the host's own reach law |
| `march.halfLifeWeeks` / `bands` / `muHoldPerBand` / `fightingWeeks`; `prosperityDwellWeeks` / `prosperityClamp` | 13 / 4 (none, slight, firm, dominant) / 0.5 L / 4; 13 / 3 | a season's memory of a won border fight; J384 (1)'s bound on the relative rung |
| `patrol.cadenceWeeks` / `hostileDays` / `gradeShift` / `forceShift` | 1, 4, 13 / 3 / highway +1, road 0, track −1 (hidden: none) / one rung denser from force band 3, one sparser at band 1 and below | a garrison's round trip at walking pace; T3's "military strenght to enforce" |
| `normalize` | enclaveMaxCells 12 · spikeMaxCells 3 · smoothPasses 2 (per class) | — |
| `province.perSeatCells` / `minCells` / `polePrecisionM` | 2 000 / 300 / 200 (standalone provinces) | — |
| `retention.keyframeEvery` / `thinAfterYears` | 52 revisions / 100 (then one keyframe per decade) | — |

| `LensRule` (own cells PLAUSIBLE, registered in V12 as UNMEASURED until `WORLD-14` and `WORLD-15` measure them) | default | anchor |
|---|---|---|
| `lenses` order | plague 1 · sway 2 · patrols 2 · trade 3 · populations 3 · religion 4 · prosperity 5 · alignment 5 | J384 (8): plague the proving lens |
| `lenses` regimes | V13 §5.9's words per lens, first match; the last the still word | J384 (13): still, never hidden |
| `plates.fullWeeks` / `compactWeeks` / `keyEvery` | 520 / 13 (the last plate of each host quarter kept) / 13 | J384 (9): ten years at full resolution, a season after |
| `plates.storeMbGz` | 4 at the realm rung after 300 years (`WORLD-14`) | — |
| `collisions` | monster threat · gate · toll · besieged · prosperity · temperament · alignment (V13 §5.8 (6)) | one word, one meaning |
| `polarity` | lawful high · malicious high · lenient high | — |
| `draw.linksPerSeat` / `markersPerView` | 12 / 2 000 (beyond: the strongest by the host's own weight or the latest by week, ties by the lower seat key, then the lower id, the rest counted in the legend) | — |

| `WorldLabelRule` | default |
|---|---|
| `priority` | sea 10 · territory 9 · settlement 8 (× the tier: THORP 1, HAMLET 2, VILLAGE 3, TOWN 4, CITY 5, METROPOLIS 6) · range 6 · river 5 · lake 5 · province 4 · site 3 |
| `zoomExtent` (stops of V13 §5.2's world band) | sea [0, 3] · territory [0, 2] · settlement [0, 3] (THORP from stop 2) · range [1, 3] · river [1, 3] · lake [1, 3] · province [2, 3] · site [2, 3] |
| `spreadPx` / `riverMinKm` | 12 / 30 |

| `GlyphLevelRow` | `fromStop`–`toStop` | marks | `toleranceM` | `minTier` | `fromStopByTier` (THORP / HAMLET / VILLAGE / TOWN+) |
|---|---|---|---|---|---|
| 0 | 0–3 | `dot` | — | THORP | 2 / 2 / 1 / 0 (the dot is the glyph of every tier below the level its stop admits) |
| 1 | 1–3 | `dot`, `ring` (the enclosure or the built extent's hull) | 400 | THORP | 2 / 2 / 1 / 1 |
| 2 | 2–3 | `outline`, `water`, `wall` | 120 | VILLAGE | — / — / 2 / 2 |
| 3 | 3–3 | `outline`, `water`, `wall`, `way` (arterials), `ward` (district hulls) | 40 | TOWN | — / — / — / 3 |

A glyph draws the highest level whose `fromStop`–`toStop` holds the stop, whose `minTier` its tier meets and whose
`fromStopByTier` for its tier is ≤ the stop; so a THORP shows a dot from stop 2 and a ring from stop 2, a VILLAGE a
dot from stop 1 and an outline from stop 2, a TOWN everything (C13-52).

| `CoherenceRule` | default |
|---|---|
| `weights` | coastSide 3 · riverCrossing 2 · edgeElevation 1 · relief 0.5 · biome 0.3 · territory 0.2 · dossier ∞ (a hard constraint, V13 §3.11.1) |
| `lawfulMax` / `bearingStepCdeg` / `originSearchM` / `originStepCells` | 4 / 100 (1°) / 20 000 / 2 |
| `blendBandM` / `blendBandMaxM` / `stationCm` / `edgeRmsRefCm` | 2 000 / 6 000 / 2 500 / 2 000 |
| `coastSearchM` / `riverMatchM` / `sunDiffersDeg` | 3 000 / 1 500 / 5 |
| `coarse.bearings` / `stations` / `keep` | 36 / 100 / 3 (`nearestLawful`'s first tier, V13 §3.11.1) |

| `WaterClassRule` | default | note |
|---|---|---|
| `dampMarginCm` | 50 | a surface within 50 cm under the floor is `damp` |
| `wadingMaxCm` | 100 | the waist: above it, swimming |
| `floorSampleM` / `shareSubmerged` | 2 / 0.95 | a unit with a floor range is sampled every 2 m; a share ≥ 0.95 reads as the whole |
| `route.wadeMaxCm` / `swimMinAirCm` / `diveMaxM` | 100 / 40 / 12 | `swimming` where the air above the water (clear − depth) ≥ 40 cm; `diving` where less, for a stretch ≤ 12 m; else `none` (C13-48) |

| `FloodRule` | default |
|---|---|
| `seasonal.dryShare` / `wetShare` | 0.6 / 1.3 (× the bankfull depth: the dry- and wet-season stages of a reach; a lake's seasonal pair ± 0.3 × its mean depth) |
| `eventStage` | minor 1.5 · moderate 2 · major 3 · catastrophic 4.5 (× the bankfull depth above the bed) |
| `barrierKinds` | `enceinte`, `retaining`, `quay`, `dyke`, `seaWall` (the entity kinds whose top blocks the spread) |
| `spreadMaxCells` | the height raster's cell count (a flood never leaves the grid; the spread runs on the height raster, V13 §3.12.4) |

### 2.4 Derived transients (never persisted)

```ts
interface Blend { box: { c0: number; r0: number; c1: number; r1: number }; weights: Float32Array /* per box cell: the frame's share, 1 at the edge, 0 at the band's outer edge (a smoothstep) */; targetCm: Int32Array /* the frame's edge profile continued outward by nearest station */ }   // P2's working record
interface FloodSpread { surface: Id; stageCm: Cm; cells: Uint32Array /* the HEIGHT-raster cells the stage reaches by the barrier-aware flood (V13 §3.12.4; C13-12) */; blockedBy: Id[] /* the barrier entities that stopped it */; overtopped: Id[] /* the barriers lower than the stage */ }
interface WaterClassResult { unit: Id; class: 'dry'|'damp'|'wading'|'swimming'|'submerged'; depthCm: Cm; share?: number /* a floor range's flooded share */; governing: { surface: Id; via?: Id /* the passage the body reached through */; kind: 'table'|'open'|'stage' }; thresholds: Hash64 /* the water.class slice */; reason: Id }
interface RouteClassResult { path: Id[]; class: 'walkable'|'wading'|'swimming'|'diving'|'none'; worst: Id }
interface WorldFacts { at: WorldPointCm; week: Week /* `atWeek`, default the world's present */; demCm: Cm; surfaces: WaterSurface[]; reach?: Id; biome: string; landUse: string; route?: Id; territory?: Id /* the seat territory */; sites: Id[] /* the site Placements at the cell */;
  polity: { swayRevision: number; sway?: Id; holder?: string; allegiance?: Id; status: 'held'|'heldByForce'|'debatable'|'unclaimed'; sides?: [string, string]; occupation?: { by: string | null; rung: number }; patrols: { power: string; everyWeeks: 1|4|13; present: boolean }[]; fighting?: { kind: string; since: Week } } /* the revision in force at `week` (past weeks from the keyframes and traces) */;
  recent: { kind: string; week: Week; event?: Id /* a WorldEvent within its radiusM */; reason: Id }[] /* every WorldEvent within its radius of the point and every dated surface or trace in the cell with week ≥ sinceWeek (SW-07) */ }   // worldFactsAt(world, wCm, sinceWeek?)'s answer (V14's E1)
```

Each is total over its inputs: a blend over an empty band writes nothing; a spread from a surface whose body holds no
cell reaches nothing and names no barrier; a unit with no floor sample reads `dry` with depth 0 and the reason
`noFloor`; `worldFactsAt` outside the world's extent answers the nearest edge cell with `recent` empty. Tested by
T-V13-30 (a).

### 2.5 Identity: lineage units, creation keys and the namespace segment (item 140 M1)

**The namespace segment** (BCR-V13-6; shared with V14, declared here once). Every address of §6.3 gains a leading
namespace `<ns>:` — the document's `namespace`, minted at creation as the base-32 form of the first 40 bits of
`H128(docId)` (8 characters) — written before the layer-and-part prefix: `w7k2m9x4:world/reach:…`,
`a1b2c3d4:under3/gallery:…`. A document's own addresses are written bare inside it and resolved under its namespace;
a reference across documents — a `Placement.subject`, a charter's `sites`, a `SiteReach` (V14 §2.3; the anchor's own references stay bare, SW-21) — is written whole. Two
packages merged into one world (bar 7) collide on no address because their namespaces differ by construction (two
documents with one `docId` are one document, §6.3's *Document identity*); the namespace is minted once and **kept on
clone and save-as** (the base's rule: addresses are document-scoped, so a clone keeps them; `Document.namespace`,
BCR-V13-5) — two clones share it, and bar 7's merge of two packages that share a namespace (only possible for clones)
re-mints the later one's as a `migration` event with the rewrite recorded (C13-24). A document written before the
segment existed reads `namespace` from its `docId` at load and writes it at the next save (§7.5's chain). `H128` is
§6.2's.

| entity | parent | creation key |
|---|---|---|
| the world root | — | (`world`, the recipe's seed) — the world's town-root equivalent: W0's and the recipe ops' draws key from it (§6.1's town root rule) |
| a feature (ocean, lake) | the world root | (`feature`, the lowest-then-leftmost fine cell of its flood-filled set) |
| a `WaterSurface` | its body | (`surface`, the body's lineage, the date or 0) — the seasonal pair is derived, never a record (V13 §3.12.4) |
| a `Reach` | the world root | (`reach`, the source cell, the confluence or mouth cell) — so a re-derived river finds its reaches again where its ends stand |
| a `Watershed` | the world root | (`basin`, its outlet cell) |
| a spring | the groundwater field | (`spring`, its cell) |
| a resource site | the world root | (`resource`, its kind, its cell) |
| a `SitingProposal` | the world root | (`proposal`, its cell, the W6 run's demand key or `auto`) |
| a `WorldRoute` | the world root | (`route`, the two seats' lineages sorted, the mode `land`\|`water`) — the class or grade an attribute, so a re-grade keeps the id and a land road and a sea leg between one pair keep two |
| a `Territory` (the seat territory) | its seat | (`territory`, the seat's key); a standalone province (`province`, the territory's lineage, its ordinal) — **membership follows the host's**: a seat's W8a membership is the host's digest membership exactly (a placement (`bindSeat`) and the host's graduation of a satellite add, the host's removal (`unbindSeat`) removes, each offered to the host's re-canonize; a death, a resettlement and a satellite never touch it) |
| a `Sway` | its seat | (`sway`, the seat's key) |
| an `Allegiance` | its root seat | (`allegiance`, the root seat's lineage) — a re-rooting folds it into the new root's and is reported |
| a `SwayRevision`, `SwayTrace` | the world root | (`swayRev`, the revision number) |
| a `MarchHold` | the world root | (`march`, the pair sorted, the segment, the side) |
| a `PatrolCadence` | its route | (`patrol`, the route's lineage, the station span, the power) |
| a `Placement` | the world root | (`placement`, the subject's docId or site lineage) — so re-placing a frame keeps its placement's address |
| a `WorldEvent` | the world root | (`event`, the host's event key, or the writing event's `seq` for a user's) |
| a `SettlementGlyph` | its placement | (`glyph`, the placement's lineage) |
| a `FrameCharter` | its placement | (`charter`, the placement's lineage, the emitting event's `seq`) — a new charter per re-placement, the old one a tombstone the frame's recipe may still cite |
| a `TerrainTrace`, `SurfaceTrace` | the event | (the event's `seq`, its ordinal) — user-created entities of their event (§6.3) |
| a `ReasonRecord` | the fact it explains | (`reason`, the fact's lineage, the path or `''`, the writing event's `seq`) |

Two entities whose keys collide take §6.3's ordinal suffix; a key whose source is gone keeps the entity by §6.3's anchor
carry-over. Anchors for §6.3's matching table: a reach by overlap ≥ 50 % of its course within one fine cell's width; a
territory by its seat; a placement by its subject; a surface by its body and date; a route by its ends and mode; a sway by its seat. Tested by
T-V13-30 (b).

### 2.6 The lifecycle of every state field this volume adds or gives a producer

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `Recipe.world` (`WorldRecipe`) and its `recipe` op list | W0 from the request; a `worldRecipe` edit appends, replaces or removes an op | W1; every stage reads the snapshot | the recipe | a `worldRecipe` edit re-derives from W1 with carry-over (§6.3) over the ops' touched cells (V13 §4.3) | the former op list; the replaced scope | the op schema versioned; an unknown op refused at load naming it |
| `WorldRaster.dem`, `carveDeltaCm`, `geology` | W1 (dem, geology); W4's carve (the delta) | W2–W9, P1–P4, the exports | the world's `fields` chunks: `dem` as a delta-coded Int32 stream, `carveDeltaCm` as a sparse (cell, delta) list, `geology` run-length | re-derived from W1; a terrain edit's stroke list composited as §7.2's | the stroke leaves the list; a trace removed | a document without `carveDeltaCm` reads an empty map (pre-carve = dem) and is reported (bar 5 cannot hold on it until re-derived) |
| the climate raster | W3 | W4, W5, W6, the charter | `fields` chunk | re-derived from W3 on a pole, wind or latitude-box adjust | the replaced scope | absent: re-derived on load |
| `landmass`, `discharge`, `vegetation`, `habitability`, `territory`, `culture`, `routes`, the `coast` record (C13-32) | W2 (landmass, coast), W4 (discharge), W5 (vegetation, habitability), W8a (territory, coarse), W7b (routes); `culture` from the host's seats or the recipe's default culture over the seat territories, or the import — never V14 (SW-09) | W6–W9, the charter, the view, the exports | `fields` chunks (run-length or sparse); `coast` and the id tables in the entities block | re-derived by their stage over the dirty set | the replaced scope | absent: re-derived on load; `culture` absent reads 0 |
| `flowDir`, `flatRank`, `flowAccum`, `watershed`, `distToShoreM`, `distToRiverM` | W4 | W5–W9, the charter, the cascade | `fields` chunk (recomputable; stored so a frozen view needs no pipeline) | the cascade's local re-run inside the dirty watershed (V13 §3.14.2) | the replaced scope | absent: recomputed on load |
| `WaterSurface` (generation-time) | W2 (sea, lakes), W4 (reaches); S1 on a frame | the water class test, the view, the exports, V04 | entities block | re-derived with its body; a user's `setSurface` on the generation-time surface is an edited attribute kept (§7.2) | the former surface | absent on an older frame: one surface per `WaterBody` made on load from `seaLevelCm`, the spill heights and the carved bed (V13 §4.6) |
| `WaterSurface` (dated, `date` set) | `setSurface` (verb `happened`), V06's `terrainWater` op at an epoch, a dossier calamity's flood (V13 §3.12.4), the adapter (none) | the present at a week; the historical class; the view under `surfaceDate` | entities block | kept through every re-derivation (an event's fact, as a drawn constraint is); re-applied at its log position | removed with its event; its trace with it | kept |
| `Reach` (course, profiles, `navigable`, `mouth`, `exitHeadCm`) | W4 | W6, W7, W9, the charter, the port, the exports | entities block | re-derived by the cascade inside its basin; a `rerouteReach` is an edited course held (§7.2) | the former reach, delta and trace | absent: W4 on load |
| `GroundwaterField` (world) / `Terrain.groundwater` (frame) | W4; the frame's step after S1 (3) and after every terrain or water operator | `waterTableAt`, the water class test, W6, the view | `fields` chunk / the terrain chunk | re-derived by the cascade over the dirty set | the replaced scope | absent on an older frame: derived on load from the surfaces (V13 §4.6), reported as the version's shift |
| `Terrain.carveDeltaCm`, `Terrain.surfaces` | S1 (3), S1's water operator | `preCarveHeightAt`, the water class test, the exports | the terrain chunk | re-derived with S1's water | the edit's replaced scope | absent: `carveDeltaCm` empty (reported), `surfaces` built on load |
| `datumOf(doc)`, `windOf(doc)`, `sunAt(doc, …)` (derived readings) | S1 writes `Terrain.datumCm` and `Terrain.wind` once; on a placed frame the accessors read the world through `worldRef` at call time (the DEM at the origin; the charter's wind; the view's sun) — nothing is written in the frame (C13-01) | every reader of §2.3's `datumCm` and `wind`; §8.4's sun | `Terrain.datumCm`, `Terrain.wind` (unchanged storage; never rewritten by a placement) | a placement edit changes the accessors' answer by changing the world, not the frame; `worldWins` re-derives the frame from S1 and S1 writes the fields anew | the world's placement undo | — |
| `Recipe.charter` (world-sourced only), `Document.worldRef` | the frame's own `charter` event (author `world`, V13 §4.1), emitted by the world's `requestCharter` / `bindPlacement` / `worldWins` / `unplaceFrame` folds; `generate` from a charter writes the recipe's copy at creation | S0, S1, S12a, V14 | the recipe (the charter as a recorded input, §2.8's derivation-record rule; V13 §2.7) | the charter is an input: Regenerate (keep settings) keeps it; `worldWins` replaces it and re-derives from S1; a settlement-first placement writes NO `Recipe.charter` (its charter stays on the world's `Placement`, C13-03), so Regenerate (keep settings) after such a placement is byte-identical to the same action before it (T-V13-13) | the frame's `charter` event is undone only by the world's undo of the placement edit that emitted it (the pair recorded in the world's undo record, V13 §4.4) | absent: a standalone frame |
| `Placement` | `placeFrame` (settlement-first) or `requestCharter` (world-first, bound to the frame's `docId` by `bindPlacement`); `setPlacement`, `mirrorFrame`, `worldWins`; V14's adoption | the transform, the glyph, the port, the compass, the sun and wind terms | the world's entities block | an input: kept by every world re-derivation; a world `adjust` that changes the extent re-validates every placement (one outside the new extent is reported and kept) | the former placement, blend and charter | the subject by `docId`; a subject the world cannot open stays placed and is reported |
| `WorldEvent` | `WorldPort.events` (the host; `factTier: 'dossier'`; a windowed replace), `addEvent` (the user) | `worldFactsAt`, the view, `MarchHold`, the clerk | the world's entities block | kept through every re-derivation (a fact, never derived); a dossier-tier event changes only by the host — a later window supersedes or retracts it (a forward event, never an undo target), and the host's own retention sends its removals and collapses | a user's event with its edit; a host's never by the user | kept; the map's own horizon covers user events only (V13 §2.7) |
| `Placement.blend`'s world cells | P2 | W4 (the band's drainage), the view | the blended cells are the `dem`'s own values; the band's former values a `TerrainTrace` of the placement event | re-blended by a placement edit; a world terrain re-derivation under a placed frame re-blends after it (V13 §4.3) | the trace restores them | — |
| `SettlementGlyph` | W9; the frame's commit hook (V13 §3.10: the frame makes its marks, the world transforms them) | the view, the exports, the port | the world document's `derived` cache (as §2.9's `elaborations`), keyed by (`placement`, `sourceDigest`) — OUTSIDE the model digest (C13-21) | re-made whenever the frame's digest differs (stale → re-made at the next world view or export; never a world edit, never a digest change) | with its placement | absent: made at the next view |
| `WorldRoute`, `Territory`, `SitingProposal` (W6's own) | W7, W8a, W6; on a host-bound world W7 lays only the edges `genesis` and `network` name | the charter, the port, W8b, W9, the view | entities block | standalone: re-derived from their stage (a `setSeats` from W8, a lay-rule change from W7); host-bound: a happened edit re-lays a route from its week as a dated lay version, an always-so edit, a regenerate or an adjust mints a lay version the host adopts by its re-canonize (`W_HOST_CANON_BEHIND` until then), a cost-law change is the host's own re-canonize | the replaced scope | absent: re-derived on load |
| `SwayRevision`, `SwayTrace`, the keyframes (the full `sway` and `swayStatus` rasters every `retention.keyframeEvery` revisions) | the `polityRevision` fold (V13 §3.9 (13)) | `worldFactsAt` at a week, the view's time scrub, the clerk's `whatChanged` | headers whole; keyframes and traces in the fields and entities blocks; traces only between keyframes, keyframes thinned to one per decade after `thinAfterYears` | a polity-law change replays every revision; a re-canonize replays the revision log over the new W8a | the host's window replace (a rewind drops the later revisions); a `setSwayLock` with its edit | revision 0 at the first polity window |
| `Allegiance`, `MarchHold`, `PatrolCadence` | W8b at a revision | the view, `worldFactsAt`, the port's `patrolOffer` | derived; rebuilt on load from the revision | with the revision | with the revision | — |
| `LensPlate` (one per host advance; V13 §5.8 (8)) | the fold of a `lensWindow` at its window | `lensAt` at a week (the scrub) | the world document's plate cache (`Document.lensPlates`, BCR-V13-38: kept across loads and saves, never rebuilt — unlike the glyphs' `derived` cache), outside the model and records digests, delta-coded with a whole plate every `plates.keyEvery` | never re-derived (a plate is what the host sent); a host rewind (a window replace) drops every plate after it, pinned ones included; past `plates.fullWeeks` compacted to one per `plates.compactWeeks`, pinned plates kept, each kept plate re-encoded against the previous kept plate (or whole) | not an event (a cache); `pinPlate` a cache command | absent: the scrub declares the gap (`W_LENS_PLATE_GAP`); the host's quota may drop the store whole |
| `WorldCanon` as the host adopts it | `canon` at a named log head, on the host's request | the host's builder of its own frozen record; nothing of the map's | never persisted in the world (re-built on request from the inputs its hashes name; the hashes logged) | the same log head re-builds it byte-identically; a later head is a new canon the host adopts only by its receipted re-canonize | the world's undo moves its log head, never an adopted canon | the envelope's version vector; **import:** an imported world's first canon is built only after the DM accepts the import's report; **dark-after-lit:** a host that stops reading canons keeps its last frozen record (absent ⇒ its prior bytes); **death:** a seat's death leaves the travel slot unchanged, a campaign's deletion is the host's; **veil:** the canon carries no audience-bound fact and is never shown to a player |
| `WorldRoute` on a host-bound world | W7 laying the edges `genesis` names and `network`'s `chartered` changes | the charter's `roads`, `routes`, `routeFacts`, `mapFeed`, the view | entities block, every lay version kept | never silently: a happened edit is a dated lay version; an always-so edit, a regenerate or an adjust a lay version the host adopts by its re-canonize | a host input is never a user's undo target; a user's dated re-lay goes with its edit | the record schema's chain; **import:** a legacy campaign's drawn roads stay presentation and become host routes only through the host's elective genesis; **dark-after-lit:** with the host's route lane dark its genesis still arrives as a presentation call and nothing is laid beyond it; **death:** a dead seat's routes keep the host's grades until the host's `network` demotes or abandons them, and a campaign's deletion takes them with the world; **veil:** a hidden host road is a DM-only ghost, a covert power's patrols omitted |
| the world document on a host-bound world | the host's new-world request (its seed minted by the host) or the DM's import on request | the module's world view, placement, charter and clerk | the host's per-campaign world record (snapshot, log, backups, quota) under the frames' store pattern (V13 §2.7) | a regenerate or a retcon only as a geometry shift the host adopts by its receipted re-canonize | the world's own undo for user edits; host inputs never | the world schema's chain; **import:** never on load; **dark-after-lit:** a campaign that stops using its world keeps the record read-only, its placed frames falling back to their recorded charter values; **death:** a campaign's deletion deletes the record with the campaign (the host's lifecycle); **veil:** pictures through the gallery's veil, players through the party picture set, a record whose existence is the secret omitted with its geometry |
| a demand proposal (`proposals(world, demand)`, V13 §3.7 (5)) | the port call | the caller (the host, V14's G3); drawn while shown | NEVER persisted: a transient answer with its weights in its reason (C13-22) | — | — | — |
| `ReasonRecord` | every stage; the cascade; V14 | the clerk's four readers | entities block (records digest only) | re-written by every derivation that re-derives its fact (`supersedes` the old) | the former record | absent on an older document: the generic provider answers from provenance (V10 §2.13) and the clerk says the chain is incomplete |
| `TerrainTrace`, `SurfaceTrace` | a `happened` edit; V06's water ops | the view, the clerk | entities block | kept | removed with the event; `deleteTrace` removes one alone, its own undo restoring it | kept |
| `EditBase.verb` | every terrain and water edit (`happened` by default) | the fold (V13 §3.14) | the event | — | — | an older event reads `alwaysSo` (no trace was ever kept) |
| the view keys `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, `worldLens`, `lensWeek` | V09's controls | the world view; the lenses | the viewer's view state, never a digest | view only | not an event | absent: stop 1, `relief`, `false`, the document's week, no lens open, the document's week |

### 2.7 The version table, the digests and the storage of the world

**The version table** (item 138 (c); J-V13.3) is `WorldRecipe.snapshot`: the generator's output version (§6.4's axis),
the file schema (`schemaVersion`, §2.9), the table versions W0–W9 read (`tables`, by `TableId`), the charter schema's
version (`FrameCharter.version`, bumped only when a charter field changes meaning), the adapter's pinned import version
(V13 §3.15) and the ecosystem-shaped export schema's version (V13 §5.4) — every world document names every version it depends
on (item 140 K10), and §6.4's retention window applies to the output version. A frame whose `Recipe.charter.version` is
older than the library's charter schema is migrated by the charter's own migration chain (a field added reads its
default, a field removed is dropped and reported), never by re-generating the frame. **The canon's versions** are per
slot, never the format version alone (J-V13.71): the geometry (the generator and the input hash over the physical layers
the slots read and the member seats' points), the cost law as the host handed it in (its version and hash), the
travel law's version, the adapter folder's vocabulary tables, and the water and sites slots' input hashes; a slot whose
inputs did not change is byte-identical. **The sway** has its own axis — `swayRevision` with `polityLaw`'s version —
beside them, never the canon's and never a geometry change. **On a host-bound world the host stores the world
document** per campaign beside its settlement map records (its snapshot, log and backups, under the frames' store
pattern and their lifecycle); a placed frame opened without its world falls back to its recorded charter values and
refuses placement edits.

**The model digest** (§6.2) gains a layer node `world` for a world document: the fine and coarse raster chunks' content
hashes (each raster a leaf whose bytes are its typed array in the canonical delta coding of V13 §2.6, so two worlds with
equal rasters hash alike), the surfaces, reaches, watersheds, routes, territories, W6's proposals, placements and
traces as leaves in schema order; the glyphs are a `derived` cache outside it (C13-21), and the lens plates a cache of their own outside it
(`Document.lensPlates`, BCR-V13-38; V13 §5.8 (8)) — outside the records digest too, kept across loads and budgeted
apart (`WORLD-14`). **A placement is in the world's
digest and in no arena's** (the brief's bar 3): a frame document's model digest reads neither `worldRef` nor
`Recipe.charter` (the charter is a recorded input in the records digest, as a `DerivationRecord` is, §6.2's *Excluded*;
the frame's rasters and arenas it refined from the charter are model data and change only when the frame re-derives),
and no placement edit writes any field the frame's model digest hashes (`datumCm`, `wind` and the sun are derived
readings, V13 §2.2), so moving a placement changes the world's digest and no arena digest — the frame's **model digest is
byte-equal** before and after every placement edit, only its records digest differing by the charter event (T-V13-2).
The same holds for a **site subject** (SW-11; J-V13.60): a free-standing world site's placement is a `Placement` of
the world document keyed by the subject id (V13 §2.5), never a field of the site document's hashed model — the site
document holds only a `placementRef` (`Document.worldRef`, mirrored on its card as a derived reading), and every
placement edit on a site subject leaves the site document's model digest byte-equal (T-V13-2 on a site subject).
`ReasonRecord`s, traces' `reason` references and the charter's bytes are in the records digest. **The surface-set
digest** (SW-25): `surfaceSetDigest(doc, week): Hash64` is the low 64 bits of `H128` over the canonical bytes of every
`WaterSurface` in force at `week` (V13 §3.12.5's rule), in id order — a derived reading V14's `waterStamp` and
`WaterClassReport.stamp` carry (V14 §2.4) and the flood overlay's cache key. **The record budget**
(C13-07): reason records are one per entity and one per raster chunk — reaches, surfaces, basins, territories, provinces,
routes, proposals, placements, resources, springs and the chunks: ≤ 10⁵ records at the continent rung, ≈ 120 B each
gzipped, inside the 2 MB of records below; a cell's reason is never stored (`whyCell`, V13 §2.2).

**Storage.** A world document is a `.plat` container (§2.9) whose `fields` chunks hold the rasters — `dem` second-order
delta-coded (the fallback §2.9 names, taken from the start for a raster: a world's dem is smooth, so the stream
compresses to ≈ 0.6 B per cell), `flowDir` and the class rasters run-length coded, the climate raster at its coarse
size, `carveDeltaCm` as a sparse list — and whose `entities` block holds the records. Budget: a `continent` world ≤ 24 MB
gzipped (9.2 M cells × ≈ 2.2 B gross across the rasters, plus ≤ 2 MB of records), a `realm` ≤ 11 MB, a `province` ≤ 3 MB;
measured at W1 (V13 §8); *pre-decided fallback:* the recomputable rasters (`flowDir`, `flatRank`, `flowAccum`,
`watershed`, the distance fields) are dropped from the file and rebuilt on load inside V13 §6's load budget. A frame's
document grows by its `groundwater` chunk (≤ 160 KB at CITY: 102 400 hydro cells × an Int16 delta stream) and its
surfaces (a few records), inside §2.9's size budget.

### 2.8 The `MapImport` mapping (as data, from the ecosystem's full JSON export, version-pinned)

`MapImport` is the adapter's neutral record — the module's own vocabulary, as `DossierDigest` is the dossier port's (§14)
— filled by one adapter folder `adapters/<ecosystem>/<format version>/` from the reference generator's **full JSON
export**, two admitted format versions, each a pinned adapter folder: **1.114**, the host's own fork's full JSON export — the
folder the host's stored snapshots are read through, once each, from the export the fork writes for the loaded snapshot
(V13 §8.5) — and **1.152**, users' own files; the full JSON export carries the grid-to-pack link at both versions
(`research/fmg/notes/fmg-data-model-and-io.md` §7b as evidence); 1.152 is the first whose `.map` settings are an object,
so a `.map` file of a version ≥ 1.152 is read by an adapter option (`mapFile: true`) and an older `.map` is refused with
the nearest supported version named (never by re-implementing the generator's migration chain, J-V13.46). The adapter folder declares its **key list** — every field name of the export
it reads — under §14's key-list lint, so no module of `plat/` outside it names one; **the import's one statement is V13
§3.15** (C13-06): this table names the export's parts by what they are, maps each to the `MapImport` field and the world
record it feeds, and its "rule" column points at §3.15's step; every row of the survey's 26-row field mapping
(`research/fmg/FMG-survey.md` §"The import-adapter field mapping", as evidence) appears here with its class — KEEP,
DERIVE, PROVENANCE or DROP with the reason (C13-38):

| the export's part (by meaning) | `MapImport` field | the world record it feeds | the rule (V13 §3.15's step) | class; loss reported |
|---|---|---|---|---|
| the map's creation timestamp, version and seed | `provenance: { created, version, seed }` | `WorldRecipe.snapshot.generator` (prefixed `import:`), the report | §3.15 (3): provenance only; the world's own seed is `H32("plat:import-seed" ‖ seed)` (one way, as item 85's) | PROVENANCE |
| the map's name and its calendar (the lore block) | `lore: { name; year? }` | the world's `Document.name`; the calendar's year as an edited attribute of the world | §3.15 (3) | KEEP |
| the extent in its units, the units-per-pixel scale and its unit, the latitude box | `extent: { widthPx, heightPx, unitsPerPx, unit, metresPerUnit, conversion: 'table'\|'typed'\|'assumed', latBox }` | `WorldRecipe.widthCm`, `heightCm` (= px × units per px × metres per unit × 100), `latBox`; the size rung = the smallest row whose band holds it; the display unit (the view key `worldUnits`) seeded from the file's unit | §3.15 (2): the unit table in the schema file (km 1 000 m · mi 1 609.344 · nmi 1 852 · vr 1 066.8 exact; lg 4 828.032 · nlg 5 556 PLAUSIBLE, shown and editable), a custom unit typed by the DM, an extent never rescaled silently | KEEP; `scale` in the report |
| the source lattice's points and each cell's integer height (0–100) and sea level | `grid: { points, heights }` | `WorldRaster.dem` through one `image` op over the rasterised asset (re-derivable, J-V13.6) | §3.15 (2): the schema file's height law (data); the sea at 0; bathymetry own (`importSeaDepthM`) — the reference's depth law never read | DERIVE; the height exponent read once for the conversion and dropped |
| the graph overrides (the edited-coastline hint) | `coastHint?: PolygonCm[]` | a `TerrainTrace`-like `importHint` record the view may show | §3.15 (3): shown, never a stage input | PROVENANCE |
| the features (ocean, lake, island) with their lake levels, open/closed flags and subtypes | `features[]` | `WaterSurface` of the lakes W2 re-derives, matched by cell-set overlap (§2.5's anchor); the import's level kept as an edited attribute where it differs by ≤ `lakeMinDepthCm`, `open` and `subtype` as edited attributes | §3.15 (3): W2 runs; matched lakes keep the import's attributes; an unmatched import lake is dropped and reported | DERIVE; `lakesDropped` in the report |
| the river entities (source, mouth, parent, basin, discharge, width, the meandered points) | `rivers[]` | `Reach` as W4 re-derives it, matched by mouth cell (within 2 fine cells) and source overlap; the import's name an edited attribute; its discharge and width kept as `imported` provenance values for the report's comparison | §3.15 (3): W4 runs; the meandered points are presentation, dropped | DERIVE; `riversUnmatched` in the report |
| the climate arrays (temperature °C per cell, precipitation 0–255 per cell) | `climate: { tempC, prec255 }` | the coarse climate raster: temperature × 10 as `tempDeciC`; precipitation 0–255 → 0–2 000 mm/yr; the seasonal curve, evaporation, wind and continentality derived by W3 | §3.15 (3): W3's derive-only mode | KEEP (the 0–255 scale is unspecified in the source: the mapping is ours, reported once) |
| the biome per cell and the biome table | `biomes: { ids[], perCell }` | `WorldRaster.biome` as an override layer by the schema's mapping table (the export's ids → V13 §2.3's rows); an unmapped id takes W5's own result | §3.15 (3): W5 runs; the override applies where mapped | KEEP; `biomesUnmapped` in the report |
| the routes (polylines, kinds) | `routes[]` | `WorldRoute` as W7 re-derives it over the import's seats; the import's routes matched by ends and kept as `imported` provenance | §3.15 (3): W7a/W7b run under the default cost law | DERIVE; unmatched routes in the report |
| the settlement list (position, name, population, port flag, capital flag, the city-generator flags, the seed link, the coat and the note) | `seats[]` | on a standalone import one `RecipeSeat` (tier by the travel law's population thresholds over the file's population at its own rate, default 1 000 per point) and one `SitingProposal` with `demand: 'import'` per settlement (position, name, `pop` and the flags as provenance values); on a host's own snapshot the list is **dropped as an input** — the campaign's settlements arrive as the host's `importSeats` request, a legacy settlement matching a placement folded into it, any other kept as an `importHint` (`W_IMPORT_LEGACY_BURG`) — never a frame: a frame exists only when the host's dossier makes one and it is placed | §3.15 (3) | KEEP (as data; the settlement's own map is the host's); a settlement the host does not know is reported as an unbound seat |
| the rural population per cell | `ruralPopPerCell?: Float32Array` | a provenance value on the nearest seat's record (`ruralPop`) | §3.15 (3) | PROVENANCE (no world stage reads population) |
| the states, provinces and their names | `polity: { states[], provinces[] }` | standalone: each state an `Allegiance` rooted at its capital, its other settlements `vassal` members unless the DM marks them satellites, a settlement of no state a seat with no allegiance; the file's diplomacy mapped by the schema file's table (vassal and suzerain → links; enemy → hostile; rival → rival; ally → allied; the rest neutral), every one a map fact with provenance; under a host, the host's polity facts replace them at its first window; a host's own snapshot's states are dropped | §3.15 (3): W8a and W8b run; `polityAgreement` (the sway against the file's state cells) in the report | DERIVE |
| the culture per cell | `cultures: { ids[], perCell }` | `WorldRaster.culture` (C13-32) on a standalone import, read by W9's names; dropped on a host's own snapshot (a culture the DM never authored never steers a border) | §3.15 (3) | KEEP (standalone) |
| the markers (position, type, legend) | `markers[]` | POI records like `SitingProposal` with `demand: 'import'`, handed to V14's G1 as site candidates (V13 §10.2's request) | §3.15 (3) | KEEP (as candidates) |
| the zones (painted cell sets with a kind) | `zones[]` | rasterised annotations: a `zone` record (cells, kind, name) the view draws and V14's G1 may read; no stage reads one | §3.15 (3) | KEEP (as annotation) |
| the religions | — | dropped | — | DROP: a host fact (item 138 (d)); the host's dossier carries religion |
| the emblems, military, economy, journeys, label positions, styles, layer order, relief icons, ice | — | dropped | — | DROP: presentation or host facts (item 138 (d)); each listed in the import report |

Integrity repairs the export's own loader applies at load (dangling references to the null entity, re-found cells,
de-duplicated ids) are applied by the adapter the same way, each reported `W_IMPORT_REPAIRED`; a tombstoned entity (the
export's removed flag) is skipped. The adapter's output is a `WorldDocument` whose recipe is one `image` op over the
rasterised asset, re-derivable like any other world (J-V13.48; V13 §3.15 (2)). Tested by T-V13-26.

## 3 Generation

### 3.0 The world pipeline: registration, order, the materializer contract

The world is a product (`ProductDecl` `world`, registered by `@plat/world` into `StrategyRegistry.products`; BCR-V13-7;
J-V13.4): its stage set is W0–W9 (W6 and W7 each split in two, V13 §3.7 and §3.8: `W6a`, `W7a`, `W6b`, `W7b`, C13-33),
each a `StageDecl` (§4.12) with `phase: 'main'`, `txForm: 'records'` (BCR-V13-7: a stage that writes records and rasters
and no arena — never a kernel transaction, so K12's journal does not see it; C13-28), `lineageUnit: 'town'` (the world
root) unless the table below names another, and the declared I/O that orders them topologically (§4.1). Each world
stage run writes the world's own commit record, `WorldCommitRecord { stage: StageId; concern?: ConcernId; inputsRead:
DataKey[]; chunksWritten: ChunkRef[]; recordsWritten: Id[]; seq: number }`, kept per run in the world document's
`derived` and read by the reason records as K12's analogue (V13 §2.2); a frame's stages keep K12's journal. `LadderRouter`
routes a `WorldRecipe` request to the product by `Recipe.product`, never by population. **The placement step P1–P5 is
not a stage**: its five parts are §7.3 local operators of the placement edits (`placeFrame`, `setPlacement`,
`mirrorFrame`, `worldWins`, `unplaceFrame`, `requestCharter`, `bindPlacement`; V13 §4.1, §4.3), run by those edits'
folds and by nothing else — never by `generate` or a Re-derive (C13-27); they share one stage id, `WORLD_PLACE`, for
their stream keys and their reason records (BCR-V13-8). Every stage obeys item 131 (c)'s **materializer contract**: it
declares its world-fact inputs (the data keys it reads), takes one context record (`StageContext`, §14; a `PlaceContext`
for the placement operators, V13 §3.11) and returns outputs as rasters, records (arenas, for a frame) and derived facts,
writing one `ReasonRecord` per record it creates or changes and one per raster chunk it writes (V13 §2.2; C13-07) — a
stage that writes a record or a chunk without a reason fails T-V13-10's chain test. Every stage declares its failure ladder (V13 §3.16) and its work
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
| W4 Hydrology | `W4` | `dem`, `geology`, the features, the surfaces, the climate | `flowDir`, `flatRank`, `flowAccum`, `watershed`, `discharge`, `carveDeltaCm`, `Reach`, `Watershed`, the reaches' surfaces, lake outlets and `open`, `GroundwaterField`, the distance fields | the base's `water.delta` (the distributary shares, keyed by the reach; C13-46) | the world root | F-WORLD (sink), F-GW | " |
| W5 Biomes | `W5` | the climate, `flowAccum`, `dem`, the surfaces | `biome`, `landUse`, the resource sites | `world.resources` (thinning) | the world root | F-WORLD (matrix) | " |
| W6a Suitability, stage 1 | `W6a` | everything above; V14's sites | `proposals.stage1`, the score raster (transient) | none (`world.siting` reserved; the tie-break is deterministic, V13 §3.7 (6)) | the world root | F-WORLD (none placed) | " |
| W7a Routes over the candidates | `W7a` | `proposals.stage1`, the placements and host seats, the surfaces, `dem`, `biome`, the reaches, the cost law | `routes.stage1` | none | the world root | F-WORLD (no path) | " |
| W6b Suitability, stage 2 | `W6b` | `proposals.stage1`, `routes.stage1` | `SitingProposal`s (the final) | none | the world root | F-WORLD (none placed) | " |
| W7b Routes | `W7b` | the final seats (proposals, placements, host seats, V14's routed sites), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s, the `routes` layer | none | the world root | F-WORLD (no path) | " |
| W8a Seat territory | `W8a` | the member seats, the coarse cost surface under the cost law's time terms, the landmasses | `Territory`s (coarse cells, crossings), the coarse `territory` raster, the canon's travel slot | none | each seat | F-WORLD (seat) | " |
| W8b Sway | `W8b` | W8a, the latest `PolityFacts` window, the travel law, the network at the week, the held sites | `Sway`, `Allegiance`, `MarchHold`, `PatrolCadence`, `SwayRevision`, `SwayTrace`, the `sway`, `swayStatus` and `debatableSides` rasters | none (`world.polity` reserved; `world.patrol` a fixed-key phase, never a stream) | each seat | F-WORLD (seat) | " |
| W9 Labels and glyphs | `W9` | every named record; the placements and their frames | the world's `LabelEntity` candidates (§9.1), `SettlementGlyph`s | `naming` (world names) | the world root; a glyph its placement | §9.6's naming ladder | " |
| the placement operators P1–P5 (not a stage: §7.3 local operators of the placement edits, one stage id `WORLD_PLACE`) | `WORLD_PLACE` | the world; the frame document (settlement-first) or the frame size (world-first); the edit | `Placement`, the blend, the charter, the frame's `charter` event, anomalies | none (`place.search` reserved, no draw) | the placement | F-PLACE | V13 §6's placement row |

**Where the stages run and what they may touch.** W0–W9 write the world document only. P1–P5 write the world document
(the placement, the blend's cells with their trace, the charter's world copy) and, in the frame document, exactly one
thing: the frame's own `charter` event (author `world`, V13 §4.1, §4.4 — C13-40), whose fold sets `Document.worldRef`
and, when the charter is world-sourced, `Recipe.charter` — both outside the model digest. **Nothing else in the frame
is written** (C13-01): the datum, the wind, the sun and every orientation-dependent term of V13 §3.11.5 are derived
readings through `worldRef`, and the anomaly list is derived — **never an arena, a plot, a building, a lock or a hashed
field** (bar 3; J-V13.5). A frame generated from a charter runs the base pipeline S0–S15 with the tail, S0 and S1 reading
`Recipe.charter` as V13 §3.11.4 states. Progress is posted per stage (§11.2's `Progress`), and a world generate past one second shows §12.1's progress
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
   ocean arm. The sea's `WaterSurface` is one record at 0 cm (`kind: 'sea'`, `tidalRangeCm` from `world.hydro`'s cell, V13
   §2.3), `cause: 'generation'`. The coast polylines (`coast`, V13 §2.2's companion record) are the marching-squares
   outline of each landmass's water boundary in world cm, one ring set per landmass, the view's and the charter's source.
3. **Open or closed, subtype.** After W3's climate and W4's accumulation (W2 writes the records; W4 fills these two
   fields in its lake step, V13 §3.5.2): a lake is `open` when its inflow (the accumulated runoff into its cells, W4)
   exceeds its evaporation (its area × `evapMm`); an open lake has its outlet reach at the spill cell; a lake's `subtype`
   is, by one precedence at both scales (the frame's V13 §3.12.1 reads this rule): `fresh` when open; `dry` (drawn as a
   flat) when closed and its evaporation ≥ 4 × its inflow; `salt` when closed and its climate arid (precipitation <
   evaporation); else `brackish`; its `iceWeeks` are the weeks whose temperature by the seasonal curve (V13 §3.4 (4))
   lies below −3 °C — ice is a season, never a subtype. The rules' shape is the reference's (`fmg-physical-pipeline.md` §3.14 as
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
   ((1 − `seasonContinentalShare`) + `seasonContinentalShare` × continentality); phase = `phaseWeekNorth` in the calendar
   hemisphere and `phaseWeekSouth` in the other (the calendar hemisphere is the north unless `WorldRecipe.calendarSouth`;
   on a host-bound world it is the one the host's seasons name, V13 §2.3). The temperature at week w is T + A × cos(2π (w − phase) ÷ 52) — the formula every reader of a
   seasonal state uses (V13 §3.12.4; the host's calendar reads `week` as §4.11's). Stored `seasonAmpDeciC`,
   `seasonPhaseWeek`.
5. **Winds.** Each coarse row takes the wind band holding its latitude (`winds`; a world's recipe may override):
   `windCdeg` the band's bearing (the bearing the wind blows from), `windStrength` its strength. The frame's `Terrain.wind` on a placed frame is this wind
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
the climate raster with one `ReasonRecord` per chunk (the rule, the slices, the winds read); a cell's reason — the band and the parcel's moisture at arrival — is `whyCell`'s on-demand re-evaluation (V13 §2.2). *Edges:* a world with no
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
descends to the outlet, capped at the row's `carveMaxCm`, here `world.hydro.carveMaxCm` (V13 §2.3); a cell that would
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
source at its surface's elevation; a multi-source Dijkstra (the lifted bucket queue of `@plat/world/hydro`, C13-44)
spreads outward over land cells with the edge cost = the step's length in m × g(cell), g = `gradientBase` × (`precipMm`
÷ `precipRefMm`) × `permeability[geology]`; the **uncapped table** at a cell = min over sources of (source elevation +
accumulated rise) — it may reach and exceed the ground (C13-47); the **stored** `tableCm` is min(the uncapped table,
dem − `minDepthCm`) — `minDepthCm` the basement reading's floor, never the spring test's; on an `impermeable` cell the
stored table is min(that, dem − `perchDepthCm`) (the perched table; a world
with no impermeable cell never reads it, and a frame whose charter's geology mode is not impermeable reports
`W_GW_PERCHED_IGNORED` when its own geology op says otherwise). `source[cell]` records the winning source cell (the
clerk's "set by the river's surface 40 m away"). **Springs:** a land cell that is no surface cell, whose **uncapped**
table ≥ dem − `springMarginCm`, whose `flowAccum` ≥ `springMinAccumCells` and whose `flowDir` leads downhill is a
candidate; candidates
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

### 3.6 W5 Biomes and resources

1. **The biome per fine cell.** For every land cell: the matrix row `Recipe.world.biomeMatrix` (V13 §2.3) is read with the
   cell's mean temperature (`tempDeciC`, bilinearly sampled from the coarse climate raster) as the row index (the first
   `tempBands` bound the value is under) and its precipitation (`precipMm`, sampled the same way) as the column index; the
   cell's biome is `cells[row][col]`. The overrides run after, in this order and each final: a water cell takes
   `overrides.water` (the empty biome: no habitability, no land use); a cell above `alpineAboveM` (dem ÷ 100 against the
   world datum) is `alpine`; a cell whose temperature is under `permafrostBelowDeciC` is `ice` unless the matrix already
   says `tundra`; a cell whose `flowAccum` ≥ `wetlandAccumCells`, whose dem slope (the max over the eight neighbours of
   |Δdem| ÷ distance) is under 0.5 % and whose biome is not a desert is `wetland`. Ties never arise: the bands are strict
   upper bounds. `landUse` is the biome row's. No stream is drawn: W5's biome is a pure function of W3 and W4.
2. **Vegetation and habitability rasters** are the biome row's cells copied per fine cell (`vegetation`, `habitability`),
   kept as Uint8 (× 255) for the view and W6. A cell adjacent (8-neighbour) to a sea or lake cell raises habitability by
   `coastalHabitabilityBonus` (V13 §2.3; clamped to 1) — the shore is where people live.
3. **Resource sites.** A resource is a `ResourceSite` record (V13 §2.2)
   placed by rule rows of `world.resources` (TS block: `ResourceRule { kind: 'timber'|'stone'|'ore'|'salt'|'clay'|'fish'|'peat'|'pasture'; where: { biome?: string[]; geology?: RecipeOp['geology']['kind'][]; landUse?: string[]; coastal?: boolean; minSlopePct?: number; maxSlopePct?: number; minAccum?: number }; density: number /* sites per 1 000 km² of eligible cells */; spacingKm: number }`).
   Default rows (own; calibratable): `timber` — forest land use, density 6, spacing 8 km; `stone` — slope ≥ 8 %, density
   3, spacing 12; `ore` — geology `volcanic` or slope ≥ 15 %, density 1.2, spacing 25; `salt` — coastal or a `saltLake`
   shore, density 1, spacing 30; `clay` — slope ≤ 1 % and `flowAccum` ≥ 50, density 2, spacing 10; `fish` — coastal or a
   lake shore with `open`, density 4, spacing 6; `peat` — `wetland`, density 2, spacing 10; `pasture` — grass land use,
   density 4, spacing 8. For each rule: the eligible cells are listed, the expected count is density × eligible area ÷
   1 000 km², candidates are drawn on `world.resources` (keyed by the world root and the rule's ordinal: a position-keyed
   draw per eligible cell, the lowest `count` draws kept, V13 §3.17) and thinned to one per `spacingKm` in draw order;
   `amount` is a second draw in [0.3, 1]. A resource's reason names the rule row, the eligibility terms that held and the
   draw key.
4. **The frame-scale projection.** A resource inside a placed frame's extent + margin enters the charter's `resources` in
   frame cm (V13 §3.11.4); the base's own siting term for resources (§4.2 S0's demand reading) reads them through the
   charter, never through the raster.

*Output:* `biome`, `landUse`, `vegetation`, `habitability` rasters; the resource sites. *Edges:* a world with one biome
(a matrix row of one cell) places every resource whose rule it satisfies; a rule with no eligible cell places none and is
not reported (an absence is a fact). The biome idea — a climate matrix with overrides — is the reference's as evidence
(V13 §2.3); the resource rule is own (the reference has no resources, `FMG-survey.md` §"The physical pipeline").

### 3.7 W6 Suitability and siting proposals

W6 answers three callers with one function: the standalone world (where do settlements belong), the host (a demand
for *n* sites of a kind — item 134 (c)'s site-makes-the-ground rule and the proposal's demand message) and V14's G3
(a site's purpose weights). It never creates a settlement; it writes `SitingProposal`s the user, the host or V14's G3
accept. **W6 is two stages** (C13-33: W6 and W7 read each other, so each is split and the four run W6a → W7a → W6b →
W7b in the declared I/O): **W6a** writes `proposals.stage1` from the raster below; **W7a** routes over them (V13 §3.8);
**W6b** reads `routes.stage1`, adds the `connectivity` term and writes `proposals`; **W7b** routes over the final seats.

**The plug-in** (C13-19; SW-01; V13 §2.2's `SuitabilityTerm`, `SuitabilityContext`, `terms.register`, `score`):
`@plat/world/siting` holds the registry `terms` of named terms, each a pure, deterministic function of a cell and the
context; W6a and W6b call `score(cell, ctx, weights, hard?)` with `world.suitability`'s weights; V14's G3 calls it
with its purpose row's weights and `hard` terms (a hard term's zero refuses the cell); the host calls it through
`proposals`. **The registry holds V13's eight generic terms (below); V14 registers its purpose terms (V14 §2.5)
through `terms.register(term)` and they are V14's to state** — this volume defines none of them (J-V13.51). The
context carries everything a plug-in may read (the rasters, the coast, the reaches and surfaces, the routes, the
placements, the site placements, the resources, the springs, the territories, the wet-season stage of a reach). No
term, V13's or V14's, draws: the score has no random or jitter term (item 132 (b)'s "derived, never random", extended
to siting; SW-03; J-V13.53).

1. **The score raster, stage 1 (W6a).** For every land cell `c`: `score1(c) = Σ_t w_t · term_t(c)` over the
   `SuitabilityRule.weights` terms except `connectivity`; every term in [0, 1]:
   - `habitability`: the biome row's.
   - `discharge`: min(1, Q ÷ `discharge.refM3s`) where Q is the largest reach discharge within one fine cell (0 off
     a reach); a cell *on* a navigable reach adds `navigableBonus` before the clamp.
   - `lowland`: 1 − min(1, (dem − the nearest surface's level) ÷ (`lowland.refM` × 100)) — low ground near water
     reads 1, a plateau 500 m above its river 0.
   - `coastType`: the rule's value for the cell's coast class: `none` if `distToShoreM` > one fine cell; else `bay` when
     the shore cell's feature is a bay (W2's enclosed-water class: a sea cell whose eight-neighbour land count ≥ 5, own),
     `estuary` when within `world.hydro.mouth.estuaryReachKm` of an estuary mouth, `lake` on an `open` lake, `saltLake`
     on a closed one, else `open`.
   - `resource`: min(1, Σ amount of resource sites within `reach.resourceKm` ÷ 2).
   - `spring`: 1 when a spring lies within one fine cell, 0.5 within three, else 0.
   - `destination` (the world-site term, named so everywhere — V13 §2.3's weight key and `reach.siteKm`; SW-01): the
     placed world sites' pull: Σ over site placements within `reach.siteKm` of the card's `attraction` (0–1, read
     through the resolver) × (1 − d ÷ reach), clamped — the owner's item 134 (c): a site makes the ground around it
     worth settling.
   A cell on water, on `ice`, or above the size row's `reliefLimitM` scores 0. The raster is transient (V13 §2.4).
2. **Spacing passes.** Two passes pick candidates from the raster in descending score, ties by cell index: the *capital*
   pass with `spacing.capitalKm` and a target count `capitals` = max(1, ⌊land km² ÷ `spacing.capitalPerKm2`⌋), then
   the *town* pass with `spacing.townKm` and target `towns` = ⌊land km² ÷ `spacing.townPerKm2`⌋. A pass that places
   fewer than `spacing.targetShare` × its target multiplies its spacing by `spacing.shrink` and repeats, at most four times;
   a pass that still places fewer reports `W_SITING_SPARSE`. A candidate is refused when any accepted candidate lies
   within the spacing (a Euclidean test over an accepted-cell grid bucketed at the spacing).
3. **Port promotion.** A candidate on an `open`, `bay` or `estuary` coast whose landmass has another candidate across
   water (a sea route would exist, W7's water legs) has its score × `portPromote`; the highest-scoring port candidate per
   landmass is a `harbourCandidate`, as is every candidate with a navigable reach whose coast type is not `none` (on a
   standalone world the harbour itself; on a host-bound world a suggestion — the host's port rule joins the geography
   half, every proposal's `WaterAccess`, to its own institution half and keeps the verdict; J-V13.74); **a water body
   with fewer than `minPortsPerBody` port candidates on its shores gets none** (a sea route needs two ends; the
   reference's two-ports rule kept, C13-51). This is the reference's idea of ports and the harbour score restated as our
   own law (`FMG-survey.md` §"Burgs and states", as evidence); the terms and the two-pass spacing are own.
4. **Stage 2 (W6b, connectivity).** After W7a has run over the stage-1 candidates, each candidate's `connectivity`
   term is min(1, routes of `routes.stage1` touching its cell ÷ `stage2.connectivityRefRoutes`) and `score2 = score1 +
   w_connectivity · connectivity`; candidates are re-ranked by `score2` and the spacing passes re-applied over the
   ranked list (never adding, only dropping a candidate now out-ranked within spacing); W7b then routes over the final
   list. One iteration only (J-V13.10: a second changes under 2 % of seats in the spike's trial, V13 §8.3).
5. **The host's demand.** `proposals(world, demand)` (the port, V13 §3.11.6) takes `{ kind: 'capital'|'town'|'port'|
   'site'; count; near?: WorldPointCm; withinKm?; weights?: Partial<SuitabilityRule['weights']>; exclude?: Id[] }`; it
   re-scores with the merged weights, restricts to the disc, drops `exclude` and the cells within the current placements'
   spacing, and returns the top `count` as proposals with `demand` set to the host's key. The default weights are the
   table's; a host's weights never persist (an input to one call, recorded in each proposal's reason).
6. **The proposal record.** Each `SitingProposal` carries its terms as `terms` (each term's value), its `score`, `port`,
   its `cell` and `at` (the cell centre) and a reason naming the pass, the spacing in force and the rule slice's digest.
   **The one tie-break of siting, stated once for every caller** (SW-03; V14 cites it): two candidates of equal
   score are ordered by the lowest cell index, then by the lexicographic order of their ids — no draw; `world.siting`
   is a reserved concern id with no stream.

*Output:* the proposals; the standalone world's seats are the capital-pass proposals (W8 reads them as
`Recipe.world.seats` when the recipe gave none). *Edges:* a world with one land cell proposes it; a world with no land
proposes none (F-WORLD rung "none placed": reported, every later stage runs empty); a host demand of `count` 0 returns
none and is not an error.

### 3.8 W7 Routes (W7a over the stage-1 candidates, W7b over the final seats; C13-33)

1. **The seats.** The route graph's nodes are the seats: every `Placement` (a placed frame's origin mapped to its fine
   cell), every host seat with a position (through the port), every stage-1 or final proposal when W7 runs for W6, and
   every site placement whose card is flagged `routed` (V14 §2.5's kind row, copied at the drop; SW-20). A seat's rank is its tier (a placement's frame tier; a proposal's pass:
   capital 2, town 1, port + 1; a site 0).
2. **The cost surface.** Per fine cell, the land step cost from cell `a` to its neighbour `b` over distance `d` m (the
   cell size, × √2 on a diagonal): `d × perM × (1 + slopePerPct × slope%) × biomeFactor[biome(b)]`, slope% = |dem(b) −
   dem(a)| ÷ d × 100; + `riverCrossing` when the step crosses a reach ≥ `riverMinM3s` that neither cell's reach carries
   (a crossing, not a run along the bank); × `existingRoute` when `b` already carries a route (the share of cells that
   gain a second route is what makes roads converge — the reference's idea, as evidence, `FMG-survey.md` §"Routes"; the
   law is the host's as data, V13 §2.3, our default rows); a water cell costs `waterPerM` (∞: impassable) on a land leg.
   A water leg (sea or navigable reach) costs `seaPerM` or `navigableRiverPerM` per metre over water cells only, and may
   start and end only at a harbour seat when `portOnly` — on a standalone world a W6 `harbourCandidate`, on a host-bound
   world the port seats the host's genesis water edges name — (a non-port seat reaches the sea by a land leg to the
   nearest port).
3. **The neighbour graph.** The seats of one landmass are joined by the Urquhart graph of their Delaunay triangulation
   (the longest edge of every triangle removed: own choice over the full triangulation — fewer, more plausible pairs;
   J-V13.11), computed by the kernel's deterministic triangulation (§5.1's primitive) over the seats' positions handed to
it in **integer metres** (`originCm ÷ 100`, rounded; the continent rung's far corner at 3.84 × 10⁶ m lies inside §3.2
(1)'s range invariant of 2²³ at every rung), the edges read back by seat id — no world cm reaches a kernel predicate
(SW-16). Pairs across
   water are joined only when both are ports (the sea graph: the same Urquhart rule over port seats, per sea), plus the
   reference's sea-route vocabulary kept as own rules (C13-51): when `sea.trunk`, every landmass with ≥ `minPortsPerBody`
   ports gets one **trunk** sea leg from its highest-ranked port to the nearest port of the largest landmass; and a port
   pair whose sea cost ≤ `sea.gapFixRatio` × its land cost gets the sea leg beside the land one (the **gap fix**).
4. **The paths.** Edges are processed in descending rank (the higher seat's rank first, ties by the pair's sorted
   lineage keys); each edge is one **A\*** run (the lifted bucket queue with integer costs — the cost × 1 000 rounded —
   and the straight-line cost at `landBase × perM` as the heuristic, admissible under the cost law since no cell is
   cheaper than level open ground; ties by (f, cell index), so deterministic; C13-36) from its lower seat to its higher
   over the cost surface, **confined to the ellipse** of cells whose straight cost from both seats ≤ `maxCostFactor` ×
   the pair's straight cost (the drop rule already bounds the answer), with the `existingRoute` discount applied against
   the routes already laid — so later roads ride earlier ones; the polyline is the cell-centre path simplified by
   Visvalingam's area rule at `routeToleranceM` (as the base simplifies its coast; C13-44) and never crossing a water
   cell on a land leg (the simplification rejects a shortcut that leaves land). A path whose cost exceeds `maxCostFactor`
   × the straight-line cost at `landBase` is dropped (F-WORLD rung "no path": the pair stays unjoined and is reported
   `W_ROUTE_NO_PATH`, never a route through the sea).
5. **Classes.** The first `classes.primaryShare` of land edges by the higher seat's rank are `highway`, the rest `road`;
   an edge both of whose seats are rank 0 is `track`; every seat still unjoined after the passes gets a `trail` to its
   nearest routed cell (one Dijkstra to the route set); water legs are `sea` or `river`. A cell's `route` layer is the
   set of route ids crossing it (the charter reads it at the frame's edge, V13 §3.11.4).
6. **The reason** per route names its ends, its class rule, the cost total and the three largest cost contributions
   (slope, biome, crossing) — the clerk's "the road bends here because the pass is 400 m lower".
7. **The host's law and the stations.** Under the host's cost law the step cost of (2) reads `classFactor` for
   `biomeFactor`, adds `riverCellAdd` on a river cell and multiplies a step above `elevationKneeM` by
   `elevationKneeFactor`; `existingRoute`, `maxCostFactor` and the classes are lay rules (`world.routeLay`) and never
   enter a time. After every pass each route's integer fields are evaluated on its final polyline, order-free:
   `landEffortM` under the time terms, `lengthM`, the water metres by kind, `byClassM`, the crossings, the per-vertex
   `stations` and `vertexClass`, and the 52-week seasonal sets (J-V13.73).
8. **Genesis at world birth (a host-bound world).** The host's generation path places its founding members through
   the port, derives its genesis network over the canon's products under its own law and sends one frozen
   `RouteGenesis` (V13 §3.11.6). W7 then lays **exactly those edges**, in host-key order, with the host's grades: no pair
   selection, no rank classes, no trails to host seats, a water edge as one water route between its two port seats;
   (1)–(5)'s own selection runs only on a standalone world, and a standalone world's routes among seats later bound to a
   host are tombstoned at binding. A campaign whose host has no genesis keeps its drawn roads as presentation only.
9. **The lived network, mirrored, never computed.** `network(world, window, changes)` folds the host's route changes
   by window: only `chartered` lays new geometry (its course hint honoured, the course correction a recorded geometry);
   a demotion keeps the polyline; a revival restores the hidden one; a `bypass` (the host's detour round a seat it
   avoids: the avoided seat and its radius) re-lays the route round that radius under the cost law as a dated lay
   version under the same host key, the former lay kept and the hysteresis the host's; a hidden land road is a DM-only
   ghost and a hidden
   water lane a quiet-quay mark; a grade edit on a host route is refused (`refuse.world.hostRoute`) — the DM charters
   through the host's own command from the world editor, the world offering a read-only path preview. The route layer,
   the frame's road rows (`roadsAt(placement, week)`) and siting read the network at the week; a hidden road counts as no
   public road.
10. **After birth nothing moves a bound route silently.** W7 on a host-bound world is incremental: it lays only edges a
   host change names; a *this happened* edit re-lays a route from its week as a dated lay version the host may adopt as
   a live overlay; an *always so* edit, a recipe op, an adjust or a regenerate mints a lay version adopted only by the
   host's re-canonize (`W_HOST_CANON_BEHIND` until then); every route outside the edit's transitive closure (the
   triangles a changed seat alters, then every route whose search ellipse meets a cell whose route layer changed, to a
   fixed point) stays byte-identical, and the dry run names the closure.
11. **Legs end at settlements.** On a host-bound world every host route ends at two host settlements; a site, a
   proposal or a junction is a position along a route, never an end, so dropping or removing a site changes a route's
   geometry and effort, never the number of legs. A placed frame's exits are W7's terminals: a highway or road meets
   the town at its gate station after `exitRunM` through the margin, and `requestCharter` lays the town's own links
   before the charter is emitted.

*Output:* `WorldRoute`s and the `route` layer. *Edges:* one seat: no route; two seats on separate landmasses, neither a
port: no route (reported); a seat on an island of one cell: a trail of length 0 is not made (the seat is its own route
end). W7 at the continent rung is the stage's cost driver (V13 §6).

### 3.9 W8 Polity — the seat territory (W8a) and the sway (W8b)

**Two partitions, never one** (J-V13.63; the owner's territory rules (T1)–(T3) and J382, V13 §1.3). W8 makes two things
that must not be confused. **W8a, the seat territory**, is the host's meaning of *territory*: every reachable land cell
belongs to the seat it is cheapest to reach, with no budget and no politics — the substrate of the host's distances,
frozen with them, in the canon's travel slot (V13 §3.11.6). **W8b, the sway**, is the picture of the host's political
facts over that ground: how far each settlement's reach runs before it fades, who holds which land, where two hostile
powers' reaches meet in a debatable land, which land no one holds. The sway is derived, revisioned and drawn; it is never
a fact of the map, never in the canon, and the host's crossings and distances never come from it.

**W8a — the seat territory.**
1. **Seeds.** One per member seat: every placed frame whose placement carries a `hostKey`, every host seat with a
   position (`bindSeat`, `importSeats`), on a standalone world every `RecipeSeat` (else the capital-pass proposals). A
   satellite of the host, a world site, a phantom and a dead settlement's remnant add nothing: W8a's membership follows
   the host's exactly (V13 §2.5).
2. **The flood.** One multi-source Dijkstra (the lifted bucket queue) over the **coarse** raster from every seed under
   the cost law's time terms (`RouteCostLaw`, the host's on a host-bound world), no budget, total over each landmass's
   reachable land; a cell goes to the seat that reaches it cheapest, ties by the lower cell index then the lower
   predecessor. A seed on water or ice moves to its nearest land cell (`W_POLITY_SEAT_MOVED`).
3. **Crossings.** For every pair of adjacent seat territories the cheapest crossing is found on the coarse boundary and
   refined on the fine grid inside its coarse cell: its world point, its two side points, the two crossing cells'
   terrain classes (the adapter folder's class table) and each side's integer cost from its seat — the canon's
   `TravelEdge`s. An imported legacy world keeps each of the host's own gates as a `HostGateRef` (V13 §3.15 (3)).
4. **Outputs and clock.** One `Territory` per seat (coarse cells, crossings, border, pole, neighbours), the coarse
   `territory` raster, the canon's travel slot. W8a changes only when its membership or the cost law changes — what the
   host adopts by its re-canonize (V13 §3.11.6) — and every sway revision, death, resettlement and satellite founding
   leaves it byte-identical (T-V13-41 (b)).

**W8b — the sway** (integer and draw-free; every coefficient a `world.polity` cell, V13 §2.3).
5. **Inputs.** The latest `PolityFacts` window of a host-bound world (V13 §2.2): seats with tier, size third,
   prosperity rung, force band, strength band and garrison presence; links in the host's subordinating words;
   pairwise relations; occupations; held sites; the host's satellites at their frozen site points; its lineage claims
   while that lane is lit; banded culture distances; the lit water lanes; the road watches; the DM's christenings. On a
   standalone world: the recipe's seats at their tiers, the middle prosperity rung, every pair neutral, links and
   relations only where the recipe gives them. No budget, cost vector or power key is ever asked of the host.
6. **Travel time, culture and water.** For each projecting seat s, one bounded Dijkstra over the fine raster from its
   cell under the cost law's time terms at the travel law's foot pace, season-neutral (borders do not breathe with the
   seasons), stopped at the seat's cap: t(s, c) in integer minutes, a step across a reach ≥ `navigableM3s` adding
   `river.crossingDays` (the sway's own resistance, never a route time: a big river is a border). **Culture resists**
   (J382): on a host-bound world a step into cell c takes × (1 + φ × cd(s, home(c))), home(c) the W8a seat whose
   territory holds c and cd the host's own
   culture distance between the two seats, banded in fifths and sent with the polity facts — a pair the host did not
   send reads 0, reported once per window (`W_POLITY_CULTURE_ABSENT`), and while an occupation stands on a seat the band
   between that seat and every seat of its occupier's allegiance is held at its value in the occupation's first window
   (held because an occupation may move its governance and alignment terms while no holder changes, (12); whether its
   governance term reads a shared sovereign or only a government label is H25's question); the map
   invents no culture measure, and on a standalone world cd is 0. **Water carries cheaply only along the host's lit
   water lanes** (J382):
   open water and lakes are a barrier to the sway, except that while the host's lane system is lit a seat at one end of
   an adopted lane reaches the other end at the travel law's water price; a reach that lands across water holds at most
   a **coastal lodgement** — the land within `lodgementDays` of its landing — never the far shore beyond. No water cell is
   ever held.
7. **Strength and reach (T2: "bounded but exponential").** L(s, c) = Λ − t(s, c) ÷ τ(s), with τ(s) = τTier[tier] ×
   kSize[size third] × kProsperity[r(s)] × (1 + B(s)), B the chain bonus of (9) and τTier = `reachTierDays` ÷ Λ. The
   size third counts the seat's own people only: a satellite projects itself ((12)) and is never counted in its
   parent's size (J384 (11)). **Prosperity is relative** (J384 (1)): r(s) is the seat's rung minus the realm's median
   rung (the realm here the campaign's seats on this world, never the `realm` size rung), clamped to ±`prosperityClamp`
   — the median the lower median of every projecting seat's rung (satellites, which send none, excluded), **held**: it moves
   only when a new value has stood `prosperityDwellWeeks`, and its move is one whole-world revision ((13)) recorded as
   `SwayRevision.medianRung`; on a standalone world every seat reads 0. τTier rises by rung by a factor of at least 1.5,
   kSize by 1.15 per third and kProsperity by 1.1 per relative rung (V13 §2.3's cells), so ln τ — and with it the log
   of a settlement's reach, where L falls to the floor 0, Λ·τ(s) — rises by at least ln 1.5 per tier rung and linearly
   in the size third and the relative rung: the reach grows at least exponentially with tier, size and prosperity, and
   it is bounded: reach(s) = min(Λ·τ(s), capTier[tier]).
   Every comparison is linear in t, in fixed-point
   thousandths; no exponential is evaluated. A cell no seat reaches is **unclaimed** and stays wild: the map never fills
   it.
8. **Neighbours (T2: "dynamics of neighbors").** Per cell the candidates are grouped by allegiance (9); an allegiance
   scores the greatest L of its members. The top two (ties by the root's key) are compared by the class of the **local
   pair** — never their roots' — read through the adapter folder's class table over the host's relationship-state
   labels (the plane its simulation reads): **kin** (one allegiance); **respect** (alliance and patron–client, and a
   compelled ally — a live compelled-alliance term); **neutral** (neutral, trade partnership and criminal network, and no
   relation); **adversarial** (rivalry, cold war, hostility and the legacy *tense*, and any pair at war); the vassal
   labels are member links (9), never a class. Kin and respect split at the travel-time
   midline, each within its own reach, and never push; neutral: the stronger holds; **adversarial: the push is the
   host's** (J384 (3)) — at a cell both reach (each with L > 0), the two local seats are compared on travel time alone
   at the steeper fade, P(x, c) = Λ − t(x, c) ÷ τmin + `margins.pushPerBand` × the host's strength band of x
   (`PolitySeat.strengthBand`), τmin the smaller of the two τ; the side whose lead in P is at least `margins.civ` holds,
   else the cell is **debatable** — the contested march, held by neither — unless (10) decides it; a cell only one of
   them reaches is that one's. So the map's projection keeps each side's reach, floor and ceiling, and the host's own
   strength order — the comparator its relationship drift reads to choose a raider and an overlord — decides which way
   the line is pushed: two systems never decide one contest, and the map's vassal reinforcement ((9)) stays out of the
   push. A strength band counts once it has stood `margins.strengthDwellWeeks`, the pair reading until then the last
   band it counted, level if none; while the host sends none for a pair, the pair reads level (no push), reported once
   per window (`W_POLITY_STRENGTH_ABSENT`). A third allegiance never holds a cell where it ranks third; the clerk names
   it **outranked** (never *claimant*, the host's word for an heir). **The seat
   rule:** a seat's own cell and a placed frame's extent are always held by their seat; only an occupation marks them.
9. **The continuous chain of vassals (T2).** The allegiance graph is built from the host's links: members are the seats
   the host subordinates as a polity — a vassal (its relationship-state plane's vassal labels), an occupation at its
   vassalized rung, a puppet seat. A **tributary** is a seat bound to another by a live tribute term (one of the host's
   four subordinating treaty terms), never by a relation label: it keeps its own sway outside the allegiance, drawn with
   its overlord's band; a compelled ally is respect (8); an occupation short of vassalage, a treaty-held one included, is
   an overlay (12); a satellite of the host projects inside its parent's allegiance as a claim point (12) but is never a chain member (no
   bonus, no continuity test). The host's
   own subordination set (tribute, compelled alliance, puppet seat, a treaty-held occupation) is so drawn three ways —
   member, band and relation, overlay — a divergence J-V13.67 records. The root is a seat with no member link upward; a
   cycle drops the later link (`W_POLITY_CYCLE`); a seat with two lieges ranks vassalized, vassal, puppet, then the
   earlier link, the other drawn as a claim (`W_POLITY_TWO_LIEGES`). **Continuity in two passes, never iterated.** Pass 1
   runs (7)–(8) with every chain bonus B = 0 and no reinforcement: a member is **continuous** when the host's own reach
   verdict for the link says so, else when its bonus-free sway shares a border with its overlord's or a continuous
   member's bonus-free sway, or a road the host does not grade hidden joins its seat to that sway within Treinf — the
   host's reinforcement band from the travel law, in cost units under the calibration sent with it (V13 §2.3), never
   authored here; otherwise it is an **exclave**: a member, drawn detached, with no reinforcement and no bonus. Pass 2
   applies the bonus and the reinforcement to the members pass 1 found continuous; its result is final. With T(a, b) the
   seat-to-seat cost under the cost law (Treinf's units), the chain bonus B(o) = min(`bMax`, Σ over o's continuous
   members m of wTier[m] × δ^(depth−1) × max(0, 1 − T(o, m) ÷ Treinf)), depth ≤ `depthMax`, each tributary of o, though
   outside the allegiance, counting in B at × `wTributary`; B grows the overlord's own reach and never passes its cap;
   each continuous member's τ takes (1 + B(root) × δ^depth); a continuous member's reinforcement — its root's
   ρ × δ^(depth−1) × max(0, 1 − T(root, v) ÷ Treinf) — is read only by (10)'s military tie-break inside debatable
   cells, added there to that member seat's μ (so it counts only while the host sends force bands), never by (8)'s push
   (J384 (3)). No cell beyond Treinf from the root is
   held through a bonus or reinforcement: the realm's own cap.
10. **Military enforcement, the tie-breaker only (T3).** M(a, c) is the greatest, over the allegiance's force sources f,
   of μ_f − t_army(f, c) ÷ τMil[kind_f], at the travel law's army pace, μ_f = `margins.muPerBand` × (the source's force
   band + `military.garrisonBonus` where a garrison is present): each member seat (its force band — the host's capacity facets bar the economy, renormalised on its existing
   latent-strength floors, whose manpower already carries tier and population — read here as the tie-break only, so
   neither tier nor prosperity counts twice in a reach), each continuous member's force (`memberForce`, × δ^depth) and each garrisoned site
   whose holder is in the allegiance (its `garrisonBand`). M
   enters **only cells (8) left debatable**: a lead of at least `margins.mil` makes the cell **held by force** by the
   stronger; a smaller lead leaves it debatable. M never extends a reach, never moves a decided line and never touches a
   seat cell (T3: "still having the cieling"). A garrisoned site's footprint is held by its holder even in wild or
   foreign sway — a claim point — except inside a seat's own cell or a placed frame's extent, where the seat rule of (8)
   holds and a foreign-held site is drawn as an occupation mark; a site with no holder projects nothing; a field army is presence only and moves no
   border until a dated outcome (11) or an occupation or transfer (12). While the host sends no force bands, M is dark
   and a debatable cell stays debatable unless a host fight verdict's hold band alone decides it ((11); J386).
11. **Fights over the debatable land (T3).** A `MarchHold` per (pair, debatable segment, side) is a band — none, slight,
   firm, dominant — moved only by the host's own engagement kinds that end there: a field battle, its winner +2 on the
   segment nearest the place its record names (the approaches of a settlement) or, when it names none, on the segment
   `borderSegment` places (V13 §3.11.6), the placement labelled a map reading in its reason; an intervention clash, its
   winner +1 at its contested seat's facing segments; a lifted siege or a liberated occupation, +1 to the relieving side
   at that town's facing segments; a conquest moves no band (it is an occupation, (12)); a sea battle or a blockade
   moves none (no water cell is held); a raid on a settlement is a `WorldEvent` at its victim (its place a settlement),
   moving no band and marking the victim's facing segments **fighting** for `fightingWeeks` (J384 (5)); once the host sends a raid's outcome
   word (V13 §8.5's H25), that raid is a verdict — its winner +1 at the victim's facing segments, the fighting mark
   kept — and only a host verdict ever moves a band; the host's embattlement phases are drawn only through its
   presentation overlay (`hostOverlay`, V13 §3.11.6), never as a march mover. A band decays one step per `march.halfLifeWeeks`; it enters (10) on its segment only as μHold per
   band; while M is dark (no force band sent) it enters alone: on the segment's debatable cells the side whose band
   leads the other side's by at least `margins.mil` bands (a lead of `margins.mil` × μHold in L) holds them by force,
   and a smaller lead leaves them debatable — so only a host verdict moves a march line in the civil regime too
   (J384 (5); J386), its threshold below the enforced regime's (`margins.mil` × `margins.muPerBand`), the first window
   carrying force bands a revision that re-reads every cell so held. A band crossing is a revision trigger. While an engagement there stands open, or within `fightingWeeks` of
   its climax, the segment is **fighting** — an overlay that never moves a line.
12. **Events.** Occupation is an overlay, never ownership, hatched by the host's rung (an occupation the host records
   without an occupier is hatched in neutral ink, "occupied, occupier unrecorded" — on a standalone world the DM may
   name the occupier, on a host-bound world only the host's facts name it); an occupation the host holds by a treaty (its
   ceded-garrison term) stays an occupation overlay at the host's rung, flagged `heldByTreaty`, and becomes a member
   link only when the host's occupation reaches its vassalized rung; a razing is an event at the town: the sway
   re-projects at the tier the host sends next (its own demotion) and the victor takes nothing by it — lost cells fall to
   neighbours by (8) or become unclaimed; a death stops the seat projecting (its seat territory
   unchanged; its frame or glyph drawn as a ruin by the host's remnant grade); a resettlement projects again at the
   smallest tier; a sovereignty transfer re-roots the link at its mint, the seller's link kept as a lineage claim (DM
   view); a satellite (sent with the polity facts; J384 (11)) is a claim point of its parent's allegiance, drawn at its
   frozen site's point and projecting its own small reach at its own tier from there — its τ = τTier[its tier] ×
   kSize[the middle third] × kProsperity[the relative rung 0] (both 1) with B = 0, no size third or rung of its own
   being sent; it scores inside its parent's allegiance in (8) and, in an adversarial comparison, takes its parent's
   strength band — never a seat, never a chain member and never in its parent's size third; a satellite the host has
   not placed at a site point is neither drawn nor projected (`W_POLITY_SATELLITE_UNPLACED`). A host's lineage claim of
   one seat on another (sent while its lineage lane is lit) is drawn as a DM-view claim outline of the target's sway in
   the claiming allegiance's colour, and moves no cell.
13. **Revisions, not ticks (THE TENSION ruled, J-V13.65).** A polity window is the host's end-of-window state, each
   fact with its since-week where the host records one (a link's, a relation's, an occupation's) and the window's start
   where it does not (a seat's rungs, absent the change log of V13 §2.2). The sway moves only on dated host facts — a seat projecting
   or ceasing, a tier change, a prosperity rung held `prosperityDwellWeeks`, the realm's median rung held as long (a
   whole-world revision, (7)), a strength band held `margins.strengthDwellWeeks`, a satellite founded, placed,
   graduated or dropped, a relation's class changing, a link made,
   broken or re-rooted, an occupation rung, a transfer at mint, a force band held `military.dwellWeeks`, a culture
   band held `culture.dwellWeeks`, a water lane lit or darkened, a `MarchHold` band crossing, a host road grade or a map
   route edit that flips a continuity, a DM's `setSwayLock` — the fold minting a revision at each standing fact's
   since-week plus its dwell and at the dated events the events window carries (as far back as the host's news
   retention reaches); a fact that rose and fell inside one window never reaches the sway, and until the host sends its
   per-tick change log a seat's rung dwell is measured at window resolution and declared so in the revision's reason.
   A trigger waiting on its dwell is shown at once in the `events` layer as a **planting line** — its fact, its week and
   the week it takes effect if it stands — so a change inside one advance is seen before it moves a border.
   Every trigger of one week is folded into one `polityRevision`, order-free, re-deriving W8b over its dirty box only —
   the closure of the seats whose τ, M, reinforcement, strength band or continuity changed (every continuous member of an allegiance
   whose root's B, links or tier changed), the two seats of a pair whose `MarchHold` band crossed on a segment while M is dark (J386), their cap discs and every cap disc meeting them, grown to whole
   normalization components — byte-identical to a whole-world W8b over the same facts, receipted as a `SwayRevision` with a sparse `SwayTrace`, on its own revision axis and law
   version. Between revisions the sway holds; a host reader may read it only as an advance-head overlay — fetched at the
   advance head (the revision in force then), fixed for the whole advance and sampled from that baked table at each
   hop, at most one advance stale, stamped with `swayRevision` and recorded on the host's overlay version axis, the
   host's own live occupation, relationship and closure reads overriding it at a hop where they disagree; a revision
   caused inside an advance takes effect from the next advance. The
   host's crossings and their politics stay the host's own live reads; the per-crossing holder the map feed offers
   (V13 §3.11.6) is a reading, never a gate.
14. **Patrols (T3).** Per (route segment, power): a cadence of one pass every 1, 4 or 13 weeks, or none. A road watch the
   host asserts comes first (a road the host closes: its closer every week while it stands; a warden's term: at least
   every four weeks; a road the host grades hidden: none). Elsewhere the cadence is the rung that holds the round trip at
   the travel law's foot pace from the power's nearest garrisoned seat, fort or watchpost along the segment, moved one
   rung by an adversarial neighbour within `patrol.hostileDays`, by the host's road grade (`gradeShift`) and by the
   force band of the source the round trip is measured from (`forceShift`: a seat's `military.forceBand`; a fort's or
   watchpost's `garrisonBand` where the host sends one, else its holder seat's force band — a band of `denserFromBand`
   or more one rung denser, of `sparserToBand` or less one rung sparser; no shift while the host sends none for that
   source); both sides
   patrol their own side of a debatable segment; an overlord patrols through a continuous chain. Coverage is revisioned
   with the sway, never weekly. A patrol is present in week w exactly when (w + phase) mod everyWeeks = 0, phase the
   `world.patrol` hash of (segment, power) mod everyWeeks — one fixed phase per segment and power, never per week and
   never a roll (`patrolAt`, V13 §1b.2) — a map-tier presentation, never a body the host conserves; the cadence rungs are
   the map's presentation, and the host never receives them as a time (`patrolOffer` sends the extent and its basis, V13
   §3.11.6); a fixed post's sight (`@plat/world/sight`) only sharpens what a patrol detects. Drawn
   as tints per segment (V13 §5.1), read by V14's encounters, offered to the host per host edge (`patrolOffer`) and
   consumed only by the host's choice; a covert power's patrols are DM-only.
15. **Normalization, borders and poles.** `normalize`'s passes per class (majority vote over the eight neighbours;
   enclaves ≤ `enclaveMaxCells` and spikes ≤ `spikeMaxCells` to the surrounding majority), never across an allegiance
   line and never removing a debatable cell, an exclave, a seat cell or a held site's footprint; each sway's and seat
   territory's `border` the marching-squares outline in world cm (outer rings clockwise, holes counter-clockwise, from
   the lowest (y, x) vertex), simplified at half a fine cell; `poleCm` by `@plat/world`'s quadtree over the
   distance-to-border field to `polePrecisionM` (no kernel primitive, C13-44).
16. **Border posts.** At each revision every route crossing of an allegiance border or a debatable band yields a
   transient `SitingProposal` of demand `borderPost` — a bridge fort at a river crossing, a fort at a pass, a watchpost on open ground, a
   toll house on a highway or road between allegiances that are not adversarial — drawn as a ghost pin the DM accepts (a
   V14 card, map tier) or leaves; nothing unaccepted persists (J-V13.38); an accepted border post projects nothing until
   the host names its holder and garrison.
17. **Names, provinces, reasons.** A host-bound allegiance takes the DM's christening as the host sends it, else a
   descriptive label from its root's name ("Thornwall and its vassals"); W9 names allegiances and provinces only on a
   standalone world, where a seat territory of ≥ 2 × `province.perSeatCells` cells is divided by a budget-free flood
   inside it (J-V13.30, standalone) or by the DM's `divide`; a host-bound world invents no province — a member's sway is
   the division. Every revision's reason names its causes, its dirty box, the law version and the cells each rule moved;
   `whyCell` answers per cell (the candidates, the class, the margins, the deciding rule).

*Output:* the seat territories and the coarse `territory` raster (W8a); the `sway`, `swayStatus` and `debatableSides`
rasters and the `Sway`, `Allegiance`, `MarchHold`, `PatrolCadence`, `SwayRevision` and `SwayTrace` records (W8b).
*Edges:* no seed — no territory, the whole world unclaimed, no report (a standalone world before siting); one seat — a
seat territory over its landmass and a sway to its reach; a host seat with no polity facts yet projects at its tier with
the middle prosperity rung until the host's first window.

### 3.10 W9 Labels and the settlement glyph

1. **Names.** Every named record (sea, lake, river ≥ `riverMinKm`, mountain range, territory, province, settlement
   without a name, site) draws a name on the `naming` stream through V11's naming service with the world's culture
   context (V11 §3's `NameRequest`, kind by record kind; the territory's culture when known, else the world's default
   culture — V11's table rows). A placed frame keeps its own name (the frame's `Document.name`); a glyph's name is the
   frame's. The name is stored as a `NameRef` on the record; a `setAttr` rename is an edited attribute (§7.2).
2. **Label candidates.** W9 writes the world's `LabelEntity` candidates in §9.1's form, one per named record, with the
   anchor: a sea or lake at its pole of inaccessibility; a river along its course (a path label over the longest reach's
   smoothed polyline, letters spaced by §9's placer); a range along its ridge line (the W2 feature's spine); a territory
   at `poleCm`; a province at its pole; a settlement at its glyph's dot; a site at its placement's origin. Priority and zoom extent
   are `world.labels`'s rows; the settlement's priority is `settlement × tier` (THORP 1 … CITY 5 in the rung's order).
   V13 §5.3 runs §9's placer over them per stop; W9 only writes the candidates.
3. **The settlement glyph — made by the frame, placed by the world** (C13-35: `@plat/world` may not read a frame's
   layout records, BCR-V13-1). The **frame** makes its own marks in frame cm: `glyphOf(doc, levels): { level; marks:
   GlyphMark[] }[]` in `@plat/layout`, reading its own records, writes per `world.glyph` row:
   - level 0: `dot` at the frame's centre;
   - level 1: `dot` + `ring`: the enceinte's outline if one exists, else the convex hull of the built extent (the union
     of plot footprints, V03's), simplified at the row's `toleranceM`;
   - level 2: `outline` (the built extent's concave hull: the kernel's `hull` over the plot centroids' Delaunay with an
     own edge-length cut at 3 × the median edge, C13-44), `water` (the frame's principal water: every `WaterBody` of
     kind sea, lake or a river reach ≥ `riverMinM3s` as a polyline or polygon), `wall` (every enceinte and gate as a
     polyline with `class` = the wall's kind);
   - level 3: the above + `way` (every `through` and `primary` way as a polyline, `class` the way class), `ward` (each
     district's hull, `class` the district kind);
   and stores them in the frame's `derived.glyph` with the frame's model digest. The **world** (`@plat/world/glyph`)
   only transforms marks by `toWorld(placement, ·)` into the `SettlementGlyph` of its `derived` cache (V13 §2.6), with
   the frame's `tier` and `pop` and `sourceDigest` = the digest the marks carry; it reaches a frame's marks through
   `@plat/api`'s document resolver (§11.5: the world asks for `derived.glyph` of `Placement.subject.doc`) or through the
   `world.glyph` message the frame's commit hook posts. A frame the world cannot open (a missing document) keeps its
   last glyph, marked stale, and is reported.
4. **The commit hook.** The frame's commit path (K12's journal commit) runs a `glyphDirty` check: when the commit's
   changed set touches an enceinte, a gate, a `through`/`primary` way, a district hull or a `WaterBody` of the glyph's
   kinds, the frame re-runs `glyphOf` into `derived.glyph` and posts `world.glyph { doc, digest, marks }` to its world
   (the world document, when open in the same host, re-places the glyph at its next render or export; when not open,
   the world reads `sourceDigest` ≠ the frame's digest at its next open and re-makes it then). A glyph re-make is never
   a world edit and never a digest change (V13 §2.6: the glyph is a `derived` cache; T-V13-11 asserts the world's model
   digest unchanged by a re-make). **The same path serves a world site** (SW-08; R-V14-8; J-V13.57): `@plat/sites` runs its own `glyphOf` over the site document — level 0 a `glyph` mark whose `class` is the kind's icon id, level 1 `dot` + `ring` (the envelope), level 2 `outline` (the envelope) and `wall` (the enclosure), level 3 the same — into its `derived.glyph` and posts `world.glyph`; the world places it as a `Glyph` with `subject: 'site'`; `GlyphLevelRow.minTier` and `fromStopByTier` are read for frames only, a site glyph drawing from the stop its `GlyphLevelRow` admits.
5. **Reason** per name: the request and the draw key; per glyph: the frame digest and the level rows applied.

*Output:* the names, the label candidates, the glyphs. *Edges:* a frame with no enceinte and no plots (an empty frame)
draws level 0 only; a mirrored placement transforms the glyph through the same `toWorld` (the marks mirror; no special
case); a frame whose outline is larger than the world cell at level 0 still draws a dot (the dot is tier, not size).

### 3.11 P1–P5 Placement

A placement is an edit of the world document (`requestCharter`, `bindPlacement`, `placeFrame`, `setPlacement`,
`mirrorFrame`, `worldWins`, `unplaceFrame`; V13 §4.1) whose fold runs the placement operators with a `PlaceContext {
world; frame: Document | null /* null in world-first mode before the frame exists */; frameSize: { widthCm; heightCm;
marginCm }; edit; rules: CoherenceRule; mode: 'worldFirst'|'settlementFirst' }`. The mode is a fact of the edit:
`worldFirst` for `requestCharter` (the frame does not exist yet; the charter will be its input) and for every later edit
of a placement whose frame carries a `Recipe.charter` from this world; `settlementFirst` for `placeFrame` of an existing
frame without one (a standalone frame placed later — the owner's settlement-first correction, V13 §1.3). **A
`Placement` whose subject is a site** (V14 §3.4 (a); SW-19) takes the site document as the frame through every edit
below; its placement lives in the world document and the site document holds only its `placementRef` (V13 §2.7;
SW-11). **The operators never call V14** (SW-10; J-V13.59): P4/P5 end by emitting the outcome row `placed { placement;
subject; extent; covers: Id[] /* the site placements the new extent covers */ }`, which the application layer
(`@plat/api`) publishes as the message `world.placed`; `@plat/sites` listens and runs its own adoption (V14 §3.9 (e)). **The
world-first order** (C13-04): `requestCharter` (the host's `WorldPort.charter(world, campaign)` is this event with
`author: 'host'`; a user's is T6 `place`'s *Charter here* action) creates the `Placement` with `precedenceStamp: 'world'`,
`subject: { kind: 'frame', pending: Uuid }` and `coherenceCost: { total: 0, terms: [], lawful: true, detail:
'world-first' }` — P1 is **not** run, there is no frame to measure — and runs P4 only; the frame size the charter needs
is `frameOf(size, aspect)`, §3.2 (9)'s rule applied to the request's `size` and `aspect` — on a dossier-bound frame the
size of the dossier's peak population, so a town that grows keeps meeting its charter, and a `growPlacement` edit
(V13 §4.1) re-emits the charter at the new ring under a `world` stamp or re-blends under a `settlement` stamp — before any generation (a pure
table reading, S0's size step made callable without a document; BCR-V13-4), carried in the event; `generate` with
`Recipe.charter` then creates the frame, whose creation prefix carries the frame's `charter` event, and the world's
`bindPlacement` (author `world`) sets `Placement.subject.doc` to the new `docId`; the glyph follows. **The
settlement-first order**: `placeFrame` runs P1, P2, P3, P4 (the settlement-sourced charter, stored on the `Placement`
only) and P5. Every later `setPlacement`, `mirrorFrame`, `worldWins` and `unplaceFrame` runs the operators V13 §4.3's
rows name.

**3.11.1 P1 — coherence and the bearing search.** `coherence(world, frame, origin, bearing)` returns the
`CoherenceCost` whose six terms are, each ≥ 0 before its weight:

| term | measures | the raw cost |
|---|---|---|
| `coastSide` | the frame's sea (the frame's `WaterBody` of kind sea, its shore's side in frame terms after `R(bearing)·M(mirrored)`) against the world's sea at the placement | 0 when the frame's sea side faces world water within `coastSearchM` (V13 §2.3) of the mapped shore; 2 when water lies on an adjacent side (a 90° error); 3 when opposite or absent; a frame with no sea and world water inside the frame's extent: 2 — so at weight 3 **any coast error is unlawful** (6 > `lawfulMax` 4; C13-26) and the port is first turned, never passed green |
| `riverCrossing` | each frame reach that reaches the frame's edge against the world's reaches at the mapped edge stations | per frame reach: 0 when a world reach crosses the same side within `riverMatchM` 1 500 (own) with the same direction (in/out), 0.5 when the side matches but not the station, 1 when absent; a world reach ≥ `navigableM3s` entering the frame's extent with no frame reach: 1 |
| `edgeElevation` | the RMS difference between the frame's edge profile (its outer ring, against its datum) and the world DEM along the mapped ring (against the world DEM at the origin), both at `stationCm` | RMS ÷ `edgeRmsRefCm` |
| `relief` | the frame's relief (its dem range) against the world's over the mapped extent | |Δ range| ÷ `edgeRmsRefCm` |
| `biome` | the frame's climate row (its blueprint's `circumstances.biome` resolved to V11's `ClimateRow`, §4.2 S0; C13-15) against the world's mode over the extent | 0 when the rows agree; 0.5 when adjacent in the matrix (one band apart); 1 otherwise |
| `territory` | the frame's host allegiance (from the polity facts) against the sway's holder at the origin, at the revision in force at the placement edit, computed **without** the frame's own seat | 0 when the land is unclaimed or of the same allegiance; 0.5 when debatable; 1 otherwise — evaluated once, stored in `Placement.coherenceCost`, never re-scored by a later sway revision (politics never re-opens a placement) |
| `dossier` (weight ∞) | on a dossier-bound frame (V08), every DR1 and DR29 site fact — `site.terrain`'s relief class, `site.access`'s coast and its side, river and inflow, the water deposits, `site.culture`'s latitude — against what the charter at this placement would say | 0 when every dossier fact holds at the placement; ∞ when any would be contradicted (an inland placement of a `coastal` site, a river side the charter cannot give, a latitude outside the culture's band): **the placement is unlawful whatever the other terms** — item 20's one-way rule applied: the dossier is the truth, a placement is a map fact (C13-08; J-V13.50) |

`total = Σ w_t · raw_t`; `lawful = total ≤ lawfulMax`. The weights are `place.coherence`'s (coast first, then the
river: the owner's correction (3), V13 §1.3 — a coast mismatch is resolved by the bearing first). The bearing search for a given origin
tries every bearing from 0 in steps of `bearingStepCdeg` (360 bearings) and, when `mirrorAllowed` (never by default:
the DM's explicit `mirrorFrame` only, V13 §3.11.5), the mirrored set too; the best is the least `total`, ties by the
smaller bearing, then unmirrored. `nearestLawful(world, frame, origin)` searches origins on a spiral over the fine
grid out to `originSearchM` in steps of `originStepCells` cells **in two tiers** (C13-37): the coarse pass, at 10 × the
step, evaluates 36 bearings (10°) with the two cheap, decisive terms only — `coastSide` from W2's coast index and
`riverCrossing` from the reach index — over 100 stations of the frame's ring (the frame's edge profile sampled once
per search, the world's ring samples cached per origin), and under the `dossier` term where one applies; only the three
best (origin, bearing) pairs take the full six terms at `bearingStepCdeg` (1°) over 400 stations with the fine step
around them; it returns up to three lawful placements by ascending `total`, ties by distance from the asked origin; none found → `F-PLACE` rung "no lawful placement within
reach" (the asked placement is kept, flagged unlawful, and the three least-cost unlawful ones are offered). The dry
run (`placeFrame` with `preview`) returns the cost and the offers without writing; V09's placement tool shows the cost
by term as the frame is dragged (V13 §4.2).

**3.11.2 P2 — the blend band (settlement-first).** With the placement fixed, the world's DEM around the frame is bent
to meet the frame's edge: the band is the ring of width `blendBandM` outside the frame's extent + margin (widened up
to `blendBandMaxM` when the edge RMS after the standard band would exceed `edgeRmsRefCm`: the width grows by 1 000 m
per retry, three retries, then the residual is reported as the cost's `edgeElevation` detail); `Blend.targetCm` per
band cell is the frame's edge profile (its outer ring, re-based to the world datum by + `datumCm`) continued outward by
the nearest station; `weights` is the smoothstep 3s² − 2s³ of s = 1 − (distance from the frame's outer ring ÷ band
width); the DEM inside the frame's extent + margin is **replaced** by the frame's dem re-based (the frame is the
truth inside its own ground — the owner's rule: the settlement never changes); the band's DEM becomes `w × target +
(1 − w) × dem`. The former values of the extent + margin + band are one `TerrainTrace` (`oldGround`) of the placement event (C13-55; a placement is always `happened`); a band widened to `blendBandMaxM` and still short reports `W_BLEND_CLIPPED` before the residual's `W_PLACE_BENT`; `Placement.blend`
records the width used and the cell count. Geology inside the extent takes the frame's `Terrain.geology` mode (C13-15); the band
keeps the world's. The coherence cost's `edgeElevation` is re-measured after the blend and reported as the *coherence
cost of this placement* with the band width — the owner's "the cost is reported, never hidden".

**3.11.3 P3 — local drainage re-run (settlement-first).** The dirty set is the frame's extent + margin + band, grown to
the watersheds it touches (every `Watershed` with a cell in the box); W4 §3.5.1–3.5.5 re-run over that set only, with
the set's border cells as fixed boundary (their `flowDir`, `flowAccum` and surfaces held; an inflow across the border
seeds the accumulation with its discharge); reaches re-traced inside the set keep their ids by §2.5's anchor rule (overlap
≥ 50 %) and new ones are created; a reach that now leaves the set with a different discharge marks every downstream
reach's discharge dirty (a scalar propagation, no re-trace); the groundwater field re-derives over the set; W5's biomes
re-read over the set (a new wetland may appear); W6's proposals inside the set are dropped (the frame is the settlement
here). Every re-derived fact's reason names the placement event. This is V13 §3.14.2's cascade with the placement as
the edit, run at world scale; the frame's own hydrology is untouched (P3 never writes the frame).

**3.11.4 P4 — the charter, emitted both ways.** `charterFor(world, placement)` (world-first; also after P2–P3 in
settlement-first, where it records what the world now says at the frame's edge) builds the `FrameCharter` of V13 §2.2:

1. `datumCm` = the world DEM at the placement's origin cell, after the blend when one ran (so the frame's 0 is the
   ground at its own corner); every elevation in the charter is world DEM − `datumCm`.
2. `edges`: for each side, the stations every `stationCm` along the arena's outer ring (frame + margin, in frame cm),
   each mapped by `toWorld` and sampled bilinearly from the DEM.
3. `waterEdges`: every run of consecutive stations whose mapped cell is a sea or lake cell, with the body, its surface
   and `levelCm` against the datum.
4. `riverCrossings`: every world reach whose course crosses the outer ring (the crossing station, the side, `direction`
   from the reach's flow against the ring's outward normal, the flow bearing turned into frame terms by
   `bearingCdeg − placement.bearingCdeg` (mirrored: reflected), the reach's discharge, width, depth, bed and stage at
   the crossing against the datum, its basin, `navigable`).
5. `downstreamHeadCm`: the lowest DEM on the outer ring − `exitDropCm`, against the datum — where every off-frame
   drainage leaves to (S1's priority flood seeds its border at this head; a frame on a plateau drains to its lowest
   edge, never to a false sea).
6. `roads`: every world route crossing the ring, with the class mapped to §2.4's `WayClass` as the record says and
   capped in class and count by the dossier's access word, the bearing in frame terms, `toward` the next host
   settlement along the route (never a site, a proposal or a junction) with its effort, a highway or road crossing
   `forced` — S3 (4) picks its gate there and routes it through the margin to its station (BCR-V13-30) — and a hidden
   host road marked `hidden`; sea and river routes bind to the harbour and the landings.
7. `climate`: the coarse climate sampled at the origin (`tempDeciC`, the seasonal amplitude and phase, precipitation,
   evaporation, the wind bearing in frame terms and strength, latitude, continentality).
8. `waterTable`: the world groundwater field sampled over the frame + margin on the frame's hydro grid (§2.3's hydro
   cell), against the datum.
9. `biome`: the world's biome mode over the extent, with its V11 climate row and the land-use shares.
10. `resources`, `sites`, `territory`, `polityAtCharter`: W5's resources and V14's sites inside or over the extent, in
    frame cm; W8a's seat territory at the origin; the culture id at the origin and the sway revision in force, read once
    (V13 §2.2).
11. `geology`: the mode of the world's geology over the extent (`impermeable` → `ordinary` for §2.3's flag; the world's
    perched rule still holds in the charter's `waterTable`).

`charterFrom(frame, blend)` (settlement-first) is the same record with `source: 'settlement'`, built from the frame's
own edge (its dem, its water bodies' edge crossings, its ways at the edge, the climate row of its blueprint's
`circumstances.biome`) — what the world now owes the frame — and is what P2 and P3 consumed. **Where a charter lives**
(C13-03): a charter with `source: 'world'` is stored on the world's `Placement` and, through the frame's `charter`
event, in the frame's `Recipe.charter`, because the frame was (or, after `worldWins`, is) generated from it; a charter
with `source: 'settlement'` is stored on the world's `Placement.charter` **only** — the frame's `Recipe.charter` stays
absent, S1 never reads it, and the frame's next Regenerate (keep settings) is byte-identical to the same action before
the placement (T-V13-13; the owner's correction (3): the settlement never changes but by `mirrorFrame` or `worldWins`).
A frame that needs the settlement-sourced charter's facts (the orientation terms of V13 §3.11.5, V14's site context)
reads them through `worldRef` as a derived reading.

**The dossier's precedence** (C13-08; item 20 (h): "only the dossier is the source of immutable truth"; V08's DR1 and
DR29). On a dossier-bound frame every DR1 and DR29 fact — the site's relief class, its coast and the coast's side, its
river and inflow, its water deposits (`site.terrain`, `site.access`), its latitude (`site.culture`) — is a **hard
constraint on the placement**, the `dossier` term of V13 §3.11.1: a placement whose charter would contradict one is
unlawful, `nearestLawful` searches under the constraint, and `requestCharter` (the host's `charter(world, campaign)`)
is **refused** with `refuse.charter.dossier` naming the fact and the nearest lawful origin — the host then moves its
placement or amends its dossier (J-V13.50: the map never silently amends a dossier fact; no owner question is needed,
since item 20's one-way rule decides it). The charter never rewrites a dossier-tier value: every `factTier: 'dossier'`
path (V08 §2.5) stays the dossier's, the charter fills `map`-tier inputs only (the edge profile, the water levels, the
crossings' discharge, the roads, the table, the biome's land-use shares, the resources, the territory). The sun's
latitude on a dossier-bound frame is DR29's; the placement's latitude is a reported difference (`sunDiffers`, V13
§3.11.5), never an input.

**The transient form** (SW-05; J-V13.54): `charterFor(world, pl: Placement | TransientPlacement)` with
`TransientPlacement { originCm: WorldPointCm; bearingCdeg: 0; mirrored: false; frame: { widthCm; heightCm; marginCm } }`
builds the `FrameCharter` of (1)–(11) from the world as it stands, with `placement` the transient value and `source:
'world'`, and **writes nothing** — no record, no event, no blend, no glyph, no reason record: a view read, as
`worldFactsAt` is. It is the form V14's E1 (4) calls for a world crop frame (100 m; the click as `originCm`), budgeted
at `WORLD-9` (V13 §6).

**How S0 and S1 read the charter** (the base's hooks, consumed here; the exact base-text changes are BCR-V13-3 and
BCR-V13-4):
- S0 (§4.2) reads `Recipe.charter.climate` as its climate row's inputs (temperature, precipitation; the wind bearing
  becomes the site request's wind that S1 stores as `Terrain.wind`; V11's `ClimateRow` by `biome.climateRow`, which is
  the blueprint's `circumstances.biome` on a chartered frame, V13 §2.3's mapping table), `charter.biome` as the terrain
  template's land-use shares, `charter.territory` as the seat territory and `charter.polityAtCharter` for its culture only, `charter.sites` as drawn constraints
  (V14's adoption) and `charter.resources` as the demand's resource terms; on a dossier-bound frame every dossier-tier
  value wins (the precedence paragraph above). S0's size step `frameOf(size, aspect)` is the pure function
  `requestCharter` called before S0 ran (V13 §3.11).
- S1 (1) builds its heightfield to meet `charter.edges` at the outer ring (the edge profile is the boundary condition
  of its noise: the field is blended to the profile over the margin by the same smoothstep as P2's, inward), with
  `charter.datumCm` as `Terrain.datumCm` (S1's own write, at generation); **its fBm lattice is position-keyed on the
  world** (BCR-V13-29; item 135 (c)): each octave's lattice value at a cell is the mixer's draw keyed by (`worldSeed`,
  the octave, the cell's world position through `toWorld`) with the world root as the derivation unit, the frame's seed
  keying only its authored primitives and its water draws — so two frames whose margins overlap sample one field and
  agree in the shared margin within 1 cm (T-V13-13's two-frame fixture); S1 (2) draws its shore from
  `charter.outlines.coast` (the world's coast polygon clipped to the frame + margin is the base line its closed-outline
  routine displaces — the routine's detail row only, never its own arms), its lakes from `charter.outlines.lakes` (the
  rings at their levels) and the sea's level from `charter.waterEdges`; its river inflows come from
  `charter.riverCrossings` with `direction: 'in'` (the priority flood's border head is `downstreamHeadCm` everywhere
  except at an `in` crossing, whose head is the crossing's stage; accumulation is seeded with `seedCells = round(Q ÷
  r_cell)`, `r_cell` the frame's per-cell runoff by V13 §3.5.2's law at the frame's hydro cell from the charter's
  `precipMm`, `evapMm` and `runoffShare` — a cell count, as `Terrain.flowAccum` is; C13-14) and its descent is guided by
  `charter.outlines.reaches` (the control knots seeded on the world's course, the descent constrained to a corridor one
  hydro cell about it); the width law on a chartered frame is calibrated per reach so that `w(inlet) = charter.widthCm`
  (`w0` solved from the inlet's seed; a value outside the law's band clamped and reported `W_CHARTER_WIDTH_CLAMPED`;
  BCR-V13-4); an `out` crossing is a required exit: the frame's reach must leave the ring at that station ±
  `riverMatchM` or S1 reports `W_CHARTER_RIVER_MISSED` (a coherence fact, never a failure); S1 (3)'s carve runs as today;
  S1's groundwater step (V13 §3.12.3) seeds from `charter.waterTable` at the margin; S1's ways-at-the-edge (S4's arterial
  seeds, §4.2) take `charter.roads`.
- **The deterministic refinement rule** (item 135 (b), (c)): the frame's S1 is a pure function of (`Recipe.seed`,
  `Recipe.charter` — which carries the world's seed and the placement for the position-keyed lattice —, the tables); the
  same charter and seed give the same frame; a changed charter (a `worldWins`) gives a Re-derive from S1 with §6.3's
  carry-over. The frame refines the world's facts inside its extent and never contradicts them at its edge: the charter
  is the contract, tested by T-V13-13 (the frame's edge profile against the charter's within `edgeRmsRefCm`; every
  `in` and `out` crossing honoured, the inlet's width within 10 % of the charter's and the accumulation at the inlet
  equal to the seed; the sea at its level; the frame's shore within one hydro cell of the world's inside the extent — a
  Hausdorff bar; two neighbouring frames equal within 1 cm in their shared margin). **Declared deviation until
  BCR-V13-29 is applied:** the base's `terrain.noise` is keyed by the town root (§6.1), so before that request lands
  neighbouring frames agree only at the charter's edge profile and outlines, not in their interiors' noise; recorded in
  V13 §12 as the one owner-rule deviation this volume carries (C13-05).

**3.11.5 P5 — the precedence stamp, mirror, world-wins and the orientation-dependent terms.**

1. **The stamp and the forced-fact precedence** (J-V13.75). `Placement.precedenceStamp` is `'world'` in `worldFirst`
   (the world's facts were the frame's inputs) and `'settlement'` in `settlementFirst` (the frame's facts bent the
   world). It is a recorded fact for the clerk and the view (the stamp shows on the placement card), and it chooses the
   frame's ladder of forced facts: **a frame generated from a placement** (`world`) ranks dossier-tier facts above the
   DM's locks and drawn constraints, above the charter's boundary facts, above the tier's priors, above terrain
   plausibility, above the draw; **a frame that predates its placement** (`settlement`) ranks dossier-tier facts above
   the frame whole, generated and edited, and reads the world's facts only as derived readings through `worldRef` — the
   world bends (P2–P3). `worldWins` is the only path from the second ladder to the first and keeps its first two rungs. It
   governs re-derivation: a world terrain re-derivation under a `settlement`-stamped placement re-blends after it (the
   frame wins again); under a `world`-stamped placement the frame's charter is marked stale and the DM is offered
   `worldWins` (V13 §4.3) — and a world edit whose cascade would contradict a dossier fact of a world-stamped frame
   raises `W_EDIT_DOSSIER` with three choices: `keepDossier` (the stamp becomes `settlement`, `Recipe.charter` kept as a
   recorded input, the mode keyed on the stamp from then on, the dossier's facts met bearing first and the world's
   blend second, as P1–P3 meet them), `moveTown` (the nearest lawful origin; not offered when `Placement.hostLocked`),
   `cancel`. No lawful origin leaves an unlocked frame standalone; on a `hostLocked` placement the edit is refused
   (`refuse.place.hostLocked`) unless the DM takes `keepDossier`. A dossier event that changes a DR1 or DR29 site fact
   of a placed frame — the host's labelled re-terrain or its world-fact card changing the frame's relief, coast or river
   — re-runs P1's bearing search at the fixed origin, then P2–P3, under the new fact (bearing first, the blend second;
   the origin never moved under `hostLocked`), logged as a dated re-blend whose cause is the dossier event; where no
   blend meets it, `W_PLACE_ANOMALY` is raised with the nearest lawful origin offered.
2. **Mirror.** `mirrorFrame` sets `Placement.mirrored` (P1's `M` is the reflection about the frame's vertical axis);
   the frame's arenas never change (bar 3: a mirror is presentation of the placement, not an edit of the settlement);
   every world-facing transform (`toWorld`, the glyph, the charter's bearings, the exports) applies `M`; the frame's own
   view is unchanged. The verb warns: "mirroring flips every bearing the settlement's history names (the sun, the wind,
   the sea side) — the clerk will report them as recomputed"; the DM confirms. The owner's rule (V13 §1.3's correction
   (3)): the coast mismatch is resolved by bearing first, the world's blend second, the settlement never unless the DM
   explicitly chooses the mirror or `worldWins`.
3. **World-wins.** `worldWins` replaces the frame's `Recipe.charter` with `charterFor(world, placement)` and schedules a
   Re-derive from S1 on the frame (the base's Re-derive from Sk with carry-over, §6.3; every drawn constraint and lock
   kept; every generated fact re-derived); the placement's stamp becomes `'world'`; the blend trace (if any) is restored
   (the world's ground returns) and P3 re-runs over the former band. It is the only verb that changes a settlement's
   generated facts from the world, and it is the DM's explicit choice with a confirmation naming the frames' change count
   (the dry run's §6.3 report).
4. **The orientation-dependent terms.** On every placement edit, P5 recomputes in the frame the terms that depend on
   where the frame sits and faces, through their one accessor each, and reports every anomaly against a lock:
   | term | recomputed from | the base's reader | lock behaviour |
   |---|---|---|---|
   | the view's sun (V09's shading, §8.4's path sun) | `charter.climate.latitudeDeg` and the placement's bearing: solar azimuth in frame terms = world azimuth − `bearingCdeg` (mirrored: reflected), read through `worldRef` at call time | `sunAt(doc, week, hour)` (BCR-V13-13: one accessor; the model-side daylight term of §4.5 keeps the recipe's `Intent.latitudeDeg` — DR29's on a dossier-bound frame — until a `worldWins` re-derives the frame, so no placement moves a model output, C13-01) | a placement whose latitude differs from the recipe's by more than `sunDiffersDeg` (V13 §2.3) is reported `sunDiffers`; nothing moves |
   | the prevailing wind (`Terrain.wind` through `windOf`; the smoke and smell terms, §4.2's wind-side siting) | `charter.climate.windCdeg` (already in frame terms), read through `worldRef` | `windOf(doc)` (C13-15: the base stores the wind in `Terrain.wind`; S1 wrote it, nothing rewrites it) | a locked industry placed "downwind" that is now upwind is a `PlacementAnomaly` kind `windSide` — reported, geometry held |
   | the sea side (the harbour's facing, the coastal road, the quay fronts) | the charter's `waterEdges` sides | §4.2's coast terms | a locked quay whose side now faces land: `coastInland`; held, reported |
   | seasonality (`seasonPhaseWeek`, the hemisphere's calendar) | `charter.climate.seasonPhaseWeek`, `seasonAmpDeciC` | §4.11's calendar and V11's climate row | none |
   | the compass rose | the placement's bearing (and mirror) | V09's compass (derived presentation: the arena's north stays the frame's +y; the rose turns) | — |
   | the river's flow direction labels and the "upstream/downstream" words of the clerk | the charter's `riverCrossings[].direction` | V10's narrative terms | a reach whose frame flow now runs uphill against the world's: `riverUphill`; held, reported |
   | the water table under locked basements | `charter.waterTable` through `waterTableAt` | V04's `hallDryCm` test | a locked cellar now below the table: `lockedBelowTable`; held, classified `damp`/`wading` by V13 §3.13, reported |
   | the territory and culture context | `charter.territory`, `charter.polityAtCharter` (read once); the live context `polityOf(doc, week)` and `frameStanding(doc, week)` through `worldRef` | S0's culture reading, V11's names; the frame's views and the clerk | a locked name of another culture: no anomaly (names are the DM's); a sway revision never re-emits the charter and never stales the frame |
   The terms are derived readings, never writes to the frame (the only event in the frame's log is its `charter` event,
   C13-40; its model digest never moves, T-V13-2). The anomaly list is `PlacementAnomaly[]` (V13 §2.4), shown on the placement card and in the
   clerk's `why placement`, with the DM's choices per anomaly: keep (default), or `worldWins { placement, ids: [the
   anomaly's subject] }` — the scoped form of the one verb (V13 §4.1: the named entities re-derived from the world's
   charter with §6.3's carry-over, confirmed with the change count) — so the owner's two verbs stay the only two ways a
   settlement changes (C13-25).

**3.11.6 The port, the canon, the map feed and the settlement map record.** `WorldPort` (V13 §1b.2) is the host's one
way in and out (BCR-V13-11; the base's fifth host door, §11.4). **The port consumption law** (J-V13.70): the port
replaces the host's capture of the reference generator, never the host's own frozen distance record, which stays the
host's engine state — built by the host from one `canon` at its receipted adoption, read every tick by the host and
never by the map; nothing the host simulates calls the port inside an advance; every answer the host consumes
mid-campaign (a founding's site, a resettlement's charter, a re-derived border, patrol coverage) is requested between
advances or at an advance head against a named world state and baked with its stamp; a new canon is adopted only by the
host's own receipted re-canonize, refused while an advance runs or is parked, and engagements already docketed keep the
place they baked. **Two feeds** (J-V13.71): the **simulator feed** (`canon`, and the optional `routeFacts` and
`patrolOffer`) admits integers with a stated unit, the host's closed vocabularies through the adapter folder's tables,
host keys and `WorldPointCm`s — no float, no prose, no cache, no echo of a host fact, no raster index; the **map feed**
(`derivedFacts`, `mapFeed`, `routes`, `pathGeometry`, `borderSegment`, `placeOf`) carries geometry and presentation for
the host's map surfaces, is never written into the host's world state and is never read by a step of its simulation.

*Outbound — the simulator feed.*
- `canon(world, request: CanonRequest)` → `WorldCanon` (V13 §2.2) at one log head, whole or refused, never partial: the
  **travel slot** — the bound seats with their points, landmass, terrain class and climate band, and W8a's crossings
  with the host's receipt inputs and integer costs under the host's cost law (V13 §3.9 (1)–(4)); the **water slot** —
  per sailing body (sea or lake) the latent water candidates (a minimum spanning tree plus each eligible seat's K nearest
  by water metres, K the host's; river candidates along reach courses), geography only, and each seat's `WaterAccess`;
  the **sites slot** — frozen candidate ground per seat inside its orbit, as points with their terrain class and step
  cost under the host's cost law, the slot's input hash covering the cost law's hash (a satellite founded on it never
  joins the travel slot). The envelope carries the world header, the per-slot version vector and input hashes (V13
  §2.7), the cost law as handed in, the causes since the prior canon (the world-log entries, which the host may record as
  the parents of its canonize receipt) and the skipped list (`unbound`, `unplaced`, `phantom`, `offWorld`). The canon is
  a pure function of the inputs its hashes name; no political, overlay, lived-route or belief input enters it (T-V13-7's
  lint). The host keeps its own all-pairs costs, neighbour tiers, candidate routes and water-lane law over it, and one
  fixture in two forms ties its two builders (V13 §8.5's H5).
- `routeFacts(world, request?: { limits?: string[] /* water edge keys */ })` → per host edge: the host key, integer land effort-metres, the water metres by kind, the per-class
  effort, the crossings and the 52-week seasonal sets — never `costTotal` — and, on request, a water edge's limits (the shallowest navigable depth
  and the narrowest width along it, and the quarters it freezes), offered for a lane capacity the host does not yet
  read (its lanes carry one fixed capacity no router consults). `patrolOffer(world, revision)` → per host
  edge and power: the extent (the station span), the basis (`hostWatch`, `garrison` or `debatable`) and the host key of
  the nearest garrisoned seat or site — never a time-derived cadence: the host prices any round trip through its own
  distance reader (V13 §3.9 (14)). Both optional; the host reads either only behind its own
  switch, with its tier line (it needs a canon from a placed world) and its degraded arm (absent ⇒ the prior bytes).

*Outbound — the map feed.*
- `derivedFacts(world, placement)` → `SettlementMapRecord { placement; hostKey; originCm; bearingCdeg; mirrored; glyph: {
  level: 0|1|2|3; marks }[]; charter: Id; waterAccess: WaterAccess; physical: SettlementPhysical; routes: string[] /* host
  edge keys */; territory: Id | null /* the seat territory */; polity: WorldFacts['polity'] /* at the record's week */;
  waterClassSummary?: { floodedShare; submergedShare; lowestDryCm; access } /* V13 §3.13's site summary when the host
  asks */; timeBasis: 'absolute'|'normalized'|'normalizedFrozen'; stamp; coherence: CoherenceCost }` — the settlement page's facts; the
  host reads derived facts and never an arena; tier, population and name are the host's and are never echoed back, and
  the host's own port verdict returns only as a view attribute.
- `mapFeed(world, week, audience)` → the drawn products for the host's map surfaces: route paths keyed by host edge, the
  sway's borders and hatches at the revision in force (the player picture for a player audience, V13 §5.1), the glyphs,
  the patrol tints, the travel span under the law in force (the world dialog's readout; never in the canon), and per
  crossing its holder at that revision (holder, status, the pair's trade stance when the host sent one) — which the host
  may read as an advance-head overlay: fetched at the advance head (the revision in force then), fixed for the whole
  advance and sampled from that baked table at each hop, at most one advance stale, stamped with `swayRevision` and
  recorded on the host's overlay version axis, its own live occupation, relationship and closure reads overriding it at a
  hop where they disagree; a revision caused inside an advance takes effect from the next advance (V13 §8.5's H16).
  Crossing holders and `patrolOffer` are computed from the sway without the DM's `setSwayLock`s, which are presentation
  only on a host-bound world. For an imported legacy campaign the holders are given per `HostGateRef`. The DM-placed
  devotion sites (V14 §2.2's `SiteDevotion`) ride the DM's map feed as offers — the card's world point, kind, deity
  key and role — which the host adopts only by its own command, binding the card's host element; never a player's
  feed while the card is DM-only.
- `routes(world)` → every `WorldRoute`'s polyline with its host key; `pathGeometry(world, hostPath)` → the path a host
  route takes through the seat territories' crossings, laid on demand under the cost law and frozen at its dispatch week
  (a derived path, never a `WorldRoute`); `borderSegment(world, a, b, week)` → the debatable or shared segment nearest
  the two seats' line (ties by segment id) with its point and status; `placeOf(world, where)` → the hearing card's
  words for a `WorldWhere`.
- `charter(world, campaign)` → the `FrameCharter` for a campaign's pending frame: the `requestCharter` event with
  `author: 'host'` (V13 §3.11, §4.1 — the host names the origin, bearing and the frame size from `frameOf(size, aspect)`;
  the fold creates the `Placement` with a pending subject and runs P4; the frame generated from the charter is bound to
  it by `bindPlacement`; a dossier contradiction refuses with `refuse.charter.dossier`, V13 §3.11.4) — the per-campaign
  charter is the frame's one input record, item 140 M5. For a settlement the host founds in a world-first campaign, the
  host derives its access word from the charter's road and water facts, and its terrain word from the charter's relief,
  biome and water facts by the inverse of DR1's relief-class row (the table the `dossier` term reads), before
  generation.
- `proposals(world, demand)` → V13 §3.7 (5), each proposal with its `WaterAccess`.

*Inbound — recorded inputs* (logged and replayable without the host; each a dossier-tier fact keyed by host keys; the
port's manifest names each message's closed key list, the base's never-read list binding the dossier door, §7.7 item 1;
every windowed message is a **windowed replace**: after each advance, undo and resume the host sends its live set for
the window `{ fromWeek; toWeek; advanceNonce?; hostSeq }` — keyed by the nonce while the host's advance epoch is lit,
else by its history sequence — and the fold adds, supersedes and retracts — a retraction is a forward
event, never an undo target, and caused facts retract as groups; J-V13.69):
- `bindSeat(world, { hostKey; placement })` (once per seat) and `importSeats(world, rows)` (the host's existing
  placements as a recorded import request: verified rows become seats at their exact points, a canonized row is never
  moved — the world bends locally around it, bearing first, the blend second —, unverified rows sited by W6 and offered,
  `W_IMPORT_PLACEMENT_UNVERIFIED`); `unbindSeat(world, { hostKey })` (the host's removal of a seat: its key cleared, the
  change to the seat territory offered to the host's re-canonize like an addition, `W_HOST_CANON_BEHIND` until adopted).
- `costLaw(world, law)` (the host's `RouteCostLaw`, a `world.routes` host slice) and `travelLaw(world, law)` (the host's
  `TravelLaw`, a `world.travel` host slice).
- `hostRequires(world, rows: { hostKey: string; requires: ('coast'|'river'|'navigable'|'lake')[] }[])` (the host's frozen
  per-settlement water verdicts): a world edit whose cascade would strand one is refused (`refuse.world.hostRequires`)
  unless the DM keeps the residual as a reported anomaly (`keepResidual`).
- `genesis(world, RouteGenesis)` (once, at world birth; V13 §3.8 (8)) and `network(world, window, changes)` (V13 §3.8 (9)).
- `polity(world, window, facts: PolityFacts)` (folded into dated events and at most one sway revision per week, V13 §3.9
  (13)).
- `events(world, window, events: WorldEvent[])` (the host's dated events with the host's resolved audience, V13 §2.2's
  knowledge paragraph; the host's own retention sends their removals and collapses); a host flood raises a world
  surface only when the DM attributes it (a `setSurface` the DM makes from the event), never by itself.
- `canonized(world, { worldVersion; canonVersion; lawVersion })` (the canon the host's record now reads: the baseline of
  `timeDelta`, V13 §4.1) and `consumed(world, editIds)` (the host applied the named `physicalChange` offers at its tick
  head; each is sealed against undo).

*Inbound — presentation inputs* (never logged, never in a digest, an export or a reason chain; read by no stage, no
encounter and not the clerk; drawn through the base's live-layer registry): `clock(world, week)` (the week drawn, §11.3's
`view.set`); `hostOverlay(world, view)` (movers on host edges by fraction and embattlement phases, projected by the host
for the audience before sending, with no destination and no arrival time); `beliefView(world, view)` (for the DM, where
the host records belief: the believed standing and danger of places and roads in banded words, "assumed safe" for what
the observer never heard; forecasts never enter the world); `audienceKnowledge(world, audience, week)` (optional: the
political event ids an audience knows; the player sway is then re-derived over the known subset);
`lensWindow(world, window, sets: LensFacts[])` (after every advance, undo and resume, beside the recorded windows: the
host's per-advance facts the lenses draw, with its resolved regime and each row's resolved audience — the DM's set,
and the party's believed set where the host records belief; the one presentation input the world keeps, folded into
one plate per advance in its plate cache (`Document.lensPlates`) outside every digest, V13 §5.8 (8); read by the lenses
only).

*Outbound offers* (the host decides): `physicalChange(world, edit)` — a world edit dated at the host's next tick head,
with the DM's attribution and its durability: `event` (a dated live overlay the host may read at the hop), `permanent`
or `retcon` (reaching the host's simulation only through its receipted re-canonize, as a geometry shift). No message
proposes a political or military fact: those kinds are refused on a host-bound world (`refuse.world.hostPolitical`),
the world editor opening the host's own command for them as for routes (V13 §3.8 (9)).

**The port's laws** (one statement; T-V13-7 extended): (1) genesis to lived only — a world edit reaches the host's simulation only through the canon's input hashes and
the host's own adoption; the canon's slots are pure functions
of the physical layers, the host's cost law and the member seats, and no lived host fact enters them; (2) the host
simulates only on its own frozen record; (3) truth only — no believed fact enters or leaves the canon, believed views
riding the presentation inputs; (4) the map feed is never persisted in the host's world state; (5) the dossier's
precedence holds at placement (J-V13.50); (6) every host reader of an optional product registers its switch, its tier
line and its degraded arm; (7) an adopted canon is never rewritten, and a value the host baked at a hop stays baked; (8)
a phantom of the host is never a seat, never placed, never projecting, patrolling or contesting — its acts arrive as
`WorldEvent`s whose place is `offStage` at its home — and every reader of neighbour rows accepts a phantom key without
failing; (9) one word, one meaning across the seam (J-V13.78): `territory` is the seat territory only; the political
picture is the **sway** of an **allegiance**, its contested land **debatable** ("the debatable land", never a bare
*march*), with `heldByForce`, `unclaimed`, `exclave`, `fighting` (never *embattled*), `swayRevision` (never *epoch*),
`memberForce` (a vassal's force, never *levy* or *contingent*), "road patrol" and `outranked` (a third allegiance at
a cell, never *claimant*, the host's word for an heir); a lens's per-advance record a *plate* (never *snapshot*, the
base's document snapshot, nor *frame*, the settlement frame); the lens over the sway the **sway lens**, never a
*territory lens* (the host's own territory lens stays on the seat territory, V13 §8.5's H19); the political boundary on a route is
a border crossing, never a *gate*, and a site posted there a **border post**; a sway retention snapshot a *keyframe*
and a cross-water hold a *lodgement*, never *checkpoint* or *foothold*; the advance's nonce is `advanceNonce`; the water-passage class of a path (V13 §3.13's `routeClass`) is never sent
as a route's class. **Scale:** the host stamps its own map unit's kilometres from the world header (V13 §2.1), never a default; the
reference generator's scale and unit are read only inside the import adapter (V13 §3.15). **Retention:** the host's
horizon governs host facts; the map's own horizons cover user events and the polity supersession chain only (V13 §2.6).
Messages carry the canon envelope's version vector; a host that speaks none of them reads the ecosystem-shaped export
(V13 §5.4).

*Output of P1–P5:* the placement, the blend and its trace, the charter (both copies), the frame's re-based terms and
anomalies, the glyph (W9 re-run for the placement), the world's routes and seat territories re-run when the placement adds a
seat (standalone: W7 and W8 over the dirty landmass only; host-bound: W7 lays the edges the host names for the new seat,
and the new seat territory and its crossings are offered to the host's re-canonize, `W_HOST_CANON_BEHIND` until
adopted; the sway re-derives at the next revision). *Edges:* a frame placed wholly in the sea: `coastSide` 2 on every bearing,
unlawful, `nearestLawful` offers the shore; a frame larger than the world: refused (`F-PLACE` rung "does not fit");
a placement at the world's edge: the ring's off-world stations read the edge cell (clamped) and `downstreamHeadCm` is
the world's edge head; two frames whose **extents** overlap: refused unless the DM accepts `W_PLACEMENT_OVERLAP` (the
later wins the blend; the earlier's charter is marked stale) — except where one subject is a **site** (SW-10): admitted, the
`placed` outcome row's `covers` names the site placement and `world.placed` is posted (V14 adopts); two frames whose
**margins** overlap (extents apart): admitted
— the shared margin's ground is the world's DEM, both charters sample the same world cells and both frames blend to one
profile, which is how neighbours meet at an edge they share (item 135 (c); C13-05).

### 3.12 Water state at settlement scale

The frame's hydrology is the base's S1 (§4.2 S1 (1)–(3)) in mechanism, unchanged; this section adds what item 137
asks around it — surfaces, boundary conditions, the groundwater field, flood stages, dated states, underground
connectivity and the coast scalars — as steps that run after S1 (3) and after every terrain or water operator, each a
pure function of (terrain, surfaces, seed) by V13 §1.3's rule.

**3.12.1 Surfaces at the frame.** After S1 (3), the frame's surface step writes `Terrain.surfaces` (BCR-V13-2): one
`WaterSurface` per `WaterBody` — the sea at `datumOf(doc)`'s sea level (§2.3's `seaLevelCm`, now read through the
accessor), each lake at its spill height (the priority flood's fill level), each river reach's stage profile (the
flooded surface S1 (3) traced on: the bed + the depth profile of §4.2 S1 (3)'s width law, sampled at the course's
knots). The carve's delta is kept per hydro cell as `Terrain.carveDeltaCm` and `preCarveHeightAt(doc, p)` returns
`heightAt(p) − carveDeltaCm[cell(p)]` (0 where the map has no entry). A lake's `open` is inflow (the accumulation
entering it × `runoffShare` of the charter's precipitation − evaporation, both per V13 §3.5.2's law at the frame's
cell size) against its evaporation over its area; its `subtype` is `fresh` when open, `salt` when closed and the
charter's climate is arid (precip < evap), else `brackish`; a user's `drawWater` lake with a `levelCm` form is a
surface at that level (an edited attribute). A standalone frame (no charter) reads its climate from its blueprint's `circumstances.biome` row
as today.

**3.12.2 Two scales, the boundary conditions.** With a charter, S1 (2)'s priority flood seeds its border at
`charter.downstreamHeadCm` everywhere except the `in` crossings' stations (their stage), and its accumulation is
seeded by each `in` crossing's `seedCells` (the discharge converted to the frame's cell count by V13 §3.11.4's rule,
C13-14) at its station, the width law calibrated so the inlet's width is the charter's; an `out` crossing is the
required exit of V13 §3.11.4. The frame's reaches so agree with the world's at the edge (the inlet's width within 10 %
of the charter's, the accumulation at the inlet equal to the seed, bed within `edgeRmsRefCm`) and the
frame's D8 agrees with its own terrain inside — the proposal's "take only what crosses the edge and re-derive inside"
restated here once. Without a charter the border head is §4.2 S1's edge rule unchanged. T-V13-13 holds both.

**3.12.3 The frame's groundwater step.** `groundwater.derive(field, surfaces, geology, precip, rules)` runs over
`Terrain.hydro` (§2.3's hydro cell) with the frame's surfaces as sources (V13 §3.5.4's law at the frame's cell size,
the permeability from `Terrain.geology` — the site request's toggle resolved by S1 (10), C13-15), the charter's
`waterTable` as the boundary condition at the margin (a margin cell's table is the charter's, fixed; a standalone frame
has no boundary and its table rises from its own surfaces only) and writes `Terrain.groundwater: GroundwaterField`,
whose `springs` are the field's own records (V13 §2.2) — read there by S12a's well yield, V06 §3.12.1's spring loss and
the view's pins; **no `WaterBody` is made by the groundwater step** (C13-17: `WaterBody.kind` has no spring; a spring
that feeds standing water is S1's oasis, `WaterBody.spring` set by the base's own rule). `waterTableAt(doc, p, when?)` reads the field at `p` (bilinear over the hydro grid) for the present, or for a
dated `when` the field derived under the surfaces in force at that week (V13 §3.12.5; cached per distinct surface set,
derived on first read). V04's nearest-body rule is replaced (BCR-V13-3 at the base, BCR-V13-21 at V04: V04 §3.4's "the water table is the nearest
body's surface" reads `waterTableAt`); the step costs what S1's accumulation costs (T-V13-20's budget row).

**3.12.4 Flood as a stage on a surface.** A flood is a `WaterSurface` with a raised `levelCm` or stage profile on an
existing body: *seasonal* stages from `water.flood`'s `seasonal` pair (a reach's dry- and wet-season stage = the
bankfull depth × `dryShare` / `wetShare` above the bed; a lake's ± 0.3 × its mean depth; the sea's a tidal pair, below)
and *event* stages from a dossier calamity, V06's `terrainWater` op or a `setSurface` (`eventStage[kind]` × the
bankfull depth). `FloodSpread` (V13 §2.4) is the set of **height-raster** cells (§2.3's 5 / 8 / 10 m cell, not the
hydro grid's 16–32 m — C13-12) the stage reaches: a breadth-first spread from the body's cells over 4-neighbours into
every cell whose ground (post-carve height) is below the stage, **not crossing a blocked cell edge** — every barrier
chain (an entity of `barrierKinds`: an enceinte, retaining wall, quay, dyke or sea wall) is rasterised onto the height
raster's cell edges by its arena chain through the kernel's edge index over L0–L3 (§3.3), each crossed edge carrying
the barrier's top at that point (`topCm` from the barrier's top profile; a retaining wall's high side), and an edge whose
top is above the stage blocks; a barrier lower than the stage is overtopped and recorded in `overtopped`, the blocking
ones in `blockedBy`. The spread is capped at `spreadMaxCells` (never reached: the grid) and costs ≤ the height raster's
cell count per spread (V13 §6). Flooded faces are the faces any of whose height cells the spread reached; their water
class is V13 §3.13's with the stage as the governing surface. The seasonal
pair is derived (never persisted; recomputed from the surfaces); an event stage is a dated surface record (`date` set)
and stays as history. No fluid dynamics (J-V13.43): the spread is a level set with barriers.

**3.12.5 Historical water states.** A `WaterSurface` with `date` is the state at and after that week until the next
dated record of the same body; the present is the latest. The evolution engine's epochs (V06 §3) read the surfaces in
force at their week: V06's `terrainWater` op writes a dated surface and, under the `happened` verb, a `TerrainTrace`
(`oldBed` for a re-routed reach, `oldShore` for a moved shore, `oldGround` for a filled or cut ground) and a
`SurfaceTrace` for the superseded surface; a drowned settlement is the water class test at the epoch's surface over
its buildings (V13 §3.13.4) with the lifecycle run to `submerged ruin` (BCR-V13-22: V06's ruin lifecycle gains the
waterlogged decay rate); a later exposure (a lowered surface) is the same test giving `dry` again with the ruin kept.
The history frames (V06 §3.15) draw the surface of their week. A dated surface is kept through every re-derivation as
an event's fact (V13 §2.6).

**3.12.6 Underground water by connectivity.** V04's elements (cellars, crypts, sewers, mines, caves, the undercity)
are units for V13 §3.13: the governing surface of an underground unit is the highest of the local table
(`waterTableAt` at the unit's floor sample) and the surface of any open-water body reached through a passage whose
floor lies below that surface (a connected-set flood: the void graph of V04's elements **and of V14's `site` parts —
every `Unit` with its `passages` and every `VerticalLink` as a passage whose `floorCm` is the lower end's (V14 §2.2;
SW-06)** — is walked from every element whose floor is below an adjacent body's surface, and the set floods to that
surface); a **liner** (a cistern's lining,
a sewer invert, V04's `lined` attribute — BCR-V13-21's second part) holds the table back: a lined unit's governing
surface from the table is `table − liner.headLimitCm` at most (a table more than 1.5 m above the floor overcomes the
liner). The test and its records are V13 §3.13's; V04 §3.5.2's `hallDryCm` test becomes one call of `classifyWater`
(V04's constants stay as V04's thresholds, mapped to the `water.class` cells in BCR-V13-21).

**3.12.7 The coast and climate scalars.** Each sea `WaterSurface` carries `tidalRangeCm` (from `world.hydro`'s
`tidalRangeCm` cell, V13 §2.3; a lake 0) — the mudflat band (the shore between the low
and high surfaces: land use `wetland` for the biome and a `tidal` flag the harbour reads, §4.2's harbour siting) and the
harbour's low-water depth; a **storm surge** is an event stage on the sea (`eventStage` × `tidalRangeCm` in place of a
bankfull depth); rainfall and evaporation are the charter's; the **seasonal pair** of every surface is V13 §3.12.4's.

### 3.13 The water class test (the one shared function)

`classifyWater(unit, governing, thresholds)` in `@plat/world/water`, called by V04, V14, the frame's basement gate, the
flood overlay, the exports and the clerk — one rule for every scale (the proposal's §4, stated here once in full as the
implementation).

**3.13.1 The unit.** `WaterUnit { id; floor: Cm | { samples: Cm[] } /* a value, or floor samples every floorSampleM over the unit's footprint */; clearCm: Cm | 'open' /* storey height, chamber height, 'open' for ground, the standing height from the damage layer for a ruin */; kind: 'underground'|'storey'|'ground'|'deck'|'street'|'plot'; passages?: { to: Id; floorCm: Cm }[] /* openings to adjacent units or bodies (underground only) */ }`.
**The signatures** (C13-20): `governingSurface(unit: WaterUnit, doc: Document, when?: Week): GoverningSurface` (V13
§2.2: `{ surface: Id | null; elevationCm; kind: 'table'|'open'|'stage'; via? }`), `classifyWater(unit: WaterUnit,
governing: GoverningSurface, thresholds: WaterClassRule): WaterClassResult` (V13 §2.4), `routeClass(path:
WaterUnit[], doc: Document, when?: Week): RouteClassResult`; V14's G6 stores `WaterClassResult` and `RouteClassResult`.
**The governing surface** (`governingSurface(unit, doc, when?)`): for an underground unit the highest of
`waterTableAt(floor sample)` (less a liner's head limit) and every body reached through a passage whose `floorCm` is
below that body's surface in force at `when`; for an above-ground unit (`storey`, `ground`, `deck`, `street`, `plot`)
open water or a flood stage only — the highest surface whose `FloodSpread` (or the body's own cells) covers the unit's
footprint cell — never the table; for a unit of a site level a `WaterSurface` of kind `site` on that level is an `open`
surface (SW-06). `depthCm = surface − floor`.

**3.13.2 The table.**

| class | condition (d = depthCm; m = `dampMarginCm`; w = `wadingMaxCm`; h = `clearCm`) |
|---|---|
| `dry` | d < −m (the surface is below the floor by more than the damp margin), or no governing surface |
| `damp` | −m ≤ d ≤ 0 |
| `wading` | 0 < d ≤ w |
| `swimming` | w < d < h (h = ∞ for `open`) |
| `submerged` | d ≥ h |

A unit with floor samples takes the class per sample and the **flooded share** = the share of samples with d > 0; the
unit's class is the class of the median sample, and a share ≥ `shareSubmerged` reads as the whole. The result is
`WaterClassResult` (V13 §2.4): the class, depth, share, the governing surface with `via` (the passage) and `kind`
(`table`, `open`, `stage`), the thresholds' slice digest and a reason ("flooded because the floor sits 212 cm below a
table set by the river's surface 40 m away, reached through the collapsed passage" is this record read by the clerk).
Every unit stores its last result (V04's elements on their record; a building's per storey, BCR-V13-23) so the clerk
reports and never infers.

**3.13.3 Routes and the site summary.** `routeClass(path, doc, when?)` walks a path of units from an entrance and
returns the worst class along it as a route class: `walkable` (every unit `dry` or `damp`), `wading` (a unit's depth ≤
`route.wadeMaxCm`), `swimming` (the air above the water, clear − depth, ≥ `route.swimMinAirCm`), `diving` (less air than
that for a stretch ≤ `route.diveMaxM`), `none` (a longer stretch); `worst` names the unit (C13-48).
A site's summary (V04's and V14's): `floodedShare` (units with d > 0 ÷ units), `submergedShare`, `lowestDryCm` (the
lowest floor of a `dry` unit), `access` (the best route class over its entrances; `none` closes the site to anyone
without another way in). The same test over the dry-season, wet-season and dated surfaces gives the seasonal and
historical classes (`classifyWater(unit, governingSurface(unit, doc, when))`).

**3.13.4 Surface things.** A building is a stack of `storey` units (floor = the storey's floor elevation from V02's
massing, clear = the storey height), wet from above by open water and flood stages (the governing surface) and, for
its basement, from below by the table (an `underground` unit); a ruin's units take the damage layer's standing height
as `clearCm` (so stubs submerge sooner); open ground, plots and fields are `plot` units with samples (the share rule);
streets are `street` units tested by `routeClass` over their way segments; bridges and piers are `deck` units tested at
the deck elevation; a submerged plot is the same plot with a class whose household is displaced by the existing flood
cause (§7.7's calamity row, through the dossier port when a host is bound) and whose fields stop yielding as a derived
fact (`yield: 0` in the port's derived facts); permanent submergence (the present surface `submerged` and no dated
surface below it later) runs the lifecycle to `submerged ruin` at the waterlogged rate (BCR-V13-22); the depth over a
submerged thing feeds V14's discoverability term. Rendering is V13 §5.1's (a waterline on walls, submerged ruins as
ghosts, the encounter crop's depth bands).

**3.13.5 Locks hold geometry; construction-time water.** A locked unit is never moved by water: its class is
reported (a `PlacementAnomaly` `lockedBelowTable` / `lockedInWater` when a placement or cascade puts it under a
surface; V04's `hallDryCm` refusal becomes a report when the cellar is locked). Built space obeys its construction
epoch: V04's cellar rules refuse to *generate* below the table of the construction week (`waterTableAt(doc, p,
constructionWeek(entity))`), and natural space (caves, the undercity's voids) is classified now — so "generate first,
water later" never makes the map lie (the proposal's construction-time row). `constructionWeek(entity)` is a derived
reading in `@plat/model` (C13-18): the week of the epoch named by the entity's `Lifecycle.since.epoch` (that
`EpochRecord.inputs.week`, §2.9), week 0 at generation; BCR-V13-21 names it. The base's and V04's hard invariants ("a
basement never below the water table", §5.3; V04's T-V4-12, T-V4-20, T-V4-23) read the table **at the construction
week** (BCR-V13-27); a present-week violation under a lawful `setSurface` or placement is a `lockedBelowTable` report,
never an invariant failure (C13-29).

### 3.14 Two verbs and the cascade

**3.14.1 The verbs.** Every terrain and water edit at both scales carries `EditBase.verb: 'happened' | 'alwaysSo'`
(BCR-V13-9; default `happened`): `setField(terrain)`, `terrace`, `warp` at level 0, `drawWater`, `moveCourseKnot`,
`rerouteReach`, `setSurface` and V06's `terrainWater` op (a placement is always `happened`, C13-55). **`happened`** writes a dated record:
the new surface and the traces dated at the event's `date` where given, else the document's week (SW-27), a `TerrainTrace` of the former ground or bed and a `SurfaceTrace` of
the superseded surface; descendants are re-derived by the cascade but every dated fact older than the edit is kept
(the old ford stays as a `trace` the clerk can name: "the ford is gone because the river was re-routed in year 412,
this happened"). **`alwaysSo`** is the retcon: the present surface is replaced, no trace is written, every descendant is
re-derived as if the edit had always been (the history frames show the new state in every epoch). A trace is deletable
alone (`deleteTrace`). An edit is stored at the scale it was made (a world edit in the world document; a frame edit in
the frame; the world never rewrites a frame's log, the frame never the world's).

**3.14.2 The cascade order.** `cascade(doc, dirty, verb)` runs after the edit's own batch, in the dry run first (§7.1),
over the dirty set only — at frame scale the hydro cells the edit's stroke or surface touched, grown to the frame
watersheds (the D8 basins) they drain to and from; at world scale the same over `Watershed`s — and in this order,
each step reading the previous's output:

| step | at the frame | at the world | reads | writes |
|---|---|---|---|---|
| 1 terrain or surface | the edit's own batch (S1's terrain or water operator, §7.3) | `setField`, `rerouteReach`, `setSurface`, the blend | — | the heightfield or the surface list, the trace |
| 2 flow, flats, accumulation | the lifted `hydro.*` over the dirty cells with the border fixed | V13 §3.5.1–3.5.2 over the dirty watersheds | 1 | `flowDir`, `flatRank`, `flowAccum`; the reaches re-traced inside (ids by anchor); the carve delta |
| 3 surfaces re-derived | lake spill heights, reach stages, `open` | the same, plus lake outlets | 2 | the generation-time surfaces (a dated or edited surface kept) |
| 4 the table | `groundwater.derive` over the dirty cells with the margin fixed | V13 §3.5.4 over the dirty set | 3 | `Terrain.groundwater` / `GroundwaterField` |
| 5 the consumers | water classes of every unit in the dirty set; flood classes (the seasonal pair); outfalls (V04's sewer network, its stage re-run where an outfall moved); fords and spans (S1's crossing sites, §4.3's decks: a deck no longer over water is F-REDERIVE's row); wells (V04's yields); the damp-ground term (§4.5's prosperity); the siting score; the open `Encounter`'s memo at every address whose rectangle the dirty set reaches (invalidated; V14 §3.10) and the `waterStamp` of every scene exported over it (V14 §2.4; SW-17); every site document whose anchor or placement lies in the dirty set (V14's G6 and the site's lifecycle); V05's fallen islands' decoration faces under a raised sea (V05 §3.16) | W5's biomes, W6's proposals, the charter's facts of every placement in the set (marked stale when changed), the glyphs' `water` marks, W7's crossings (a route crossing a moved reach re-costs its edge), W8a (a river border moved: re-run for the seat territories touching it — on a host-bound world an offer to the host's re-canonize), W8b at the next revision | 4 | each consumer's records, each with a reason naming the edit |
| 6 one level up | the frame posts `charter.stale` to its world when its edge facts changed (a reach now leaving at another station; a sea level changed by a world edit) | the world marks every placement whose charter facts moved (`Placement.charter` stale) and offers `worldWins` per frame; it never writes a frame | 5 | the stale flags, the clerk's notice |

Every step is a local operator in §7.3's sense with its boundary pinned (the dirty set's border cells and their
surfaces), so session and replay run the same chain at the same log position; a step's re-derived fact keeps its id by
§6.3's carry-over and §2.5's anchors. Preview is a counterfactual fork (V13 §4.5): the cascade runs on the fork,
the user sees the change list (units re-classed, reaches moved, outfalls lost), then commits under a verb or discards.

**3.14.3 The eighteen stale-data paths, each a test (item 138 (c); bar 13).** The owner's eighteen are the reference's
model-drift list — the places where that generator lets its map disagree with its own model (`research/fmg/FMG-survey.md`
§"Editing, regeneration and model drift", rows 1–18, cited as evidence of what must not happen here). Each row below
names the drift, the equivalent edit in this design, the stage or consumer the cascade (V13 §3.14.2) or the declared
I/O (§4.1) re-runs, and the assertion T-V13-21 makes, one test per row in the PR tier (BCR-V13-15). A row whose subject
this design does not have (a treasury, a military roster, goods production) is tested on its nearest equivalent and
says so (C13-02).

| # | the reference's drift (as evidence) | the equivalent edit here | what recomputes | T-V13-21's assertion |
|---|---|---|---|---|
| 1 | a terrain edit in "keep" mode leaves rivers, biomes, features and polities on the old ground | `setField(terrain)` on the world raster (either verb) | the cascade: flow, accumulation, surfaces, the table, then W5 biomes, W6a/W6b proposals, W7 crossings, W8a seat territories over the dirty watersheds (W8b at the next revision) | every reach, lake, biome cell and territory cell in the dirty set is re-derived; none outside it changes; the reasons name the edit |
| 2 | a terrain edit in "risk" mode re-derives physical layers but not territories, and moves seats by nearest land | the same `setField(terrain)` where a seat's cell becomes water | W8 re-runs over the landmass (the seat moved to its nearest land cell with `W_POLITY_SEAT_MOVED`), W7 re-routes it | the territory raster and the seat's routes change together; the seat's new cell is land |
| 3 | the wrap tool moves vertices only; settlements, rivers, routes and labels stay | a `setPlacement` of a placed frame (origin or bearing) | P1 → (P2, P3 settlement-first) → P4 → P5 → the glyph → W7 and W8 over the landmass → W9's label candidate | the glyph, the routes to the seat, the territory and the label anchor follow the placement; the frame's model digest is unchanged (T-V13-2) |
| 4 | river control-point edits update the river cells partially, never flux, basins or lakes | `rerouteReach` / `moveCourseKnot` (either verb) | the cascade from step 2: accumulation, the reach's discharge downstream (scalar propagation), the basin, the lakes' `open` and outlets | the downstream discharges, the `Watershed`, every lake the reach feeds and the old-bed trace are consistent with the new course |
| 5 | removing every river zeroes the river cells but leaves lakes, flux and biomes | `setAttr(navigable)`/a `worldRecipe` op that drains a basin (a `pit` removed) | the cascade over the basin: lakes re-filled or emptied, discharge recomputed, W5's wetland override re-read | no lake survives without inflow or a filled depression; no `wetland` cell survives without its accumulation |
| 6 | a feature's subtype or group change has no cascade | `setAttr(subtype)` / `setAttr(open)` on a `WaterSurface` | the consumers' step 5 for the body: W5 (a salt lake's shore biome), W6's `coastType` term, W7's water legs, the label kind | the proposals' `coastType` terms, the biome of the shore cells and the label candidate change with the attribute |
| 7 | a label's text override diverges from the entity's name | `setAttr(name)` on a reach, lake, sea or territory | the record's `NameRef`; the `LabelEntity` candidate (§9.1's rule: a label never carries text of its own) | the label reads the new name at the next placement; no label text differs from its entity's name (a grep over the display list) |
| 8 | zone painting writes cells directly; the zone's population is not re-derived | a polity window changing a seat's tier, a link or a relation (standalone: `setSeats`) | the `polityRevision` fold: W8b over its dirty box → W9's labels and anchors → `worldFactsAt` and the map feed; never a charter | every placement's `SettlementMapRecord.polity` and `worldFactsAt` equal the new revision; every charter, frame digest and seat territory is byte-identical |
| 9 | a marker's appearance edit applies to every marker of its type | `setAttr` on one `SitingProposal`/resource/spring (a POI record) | that record alone (V13 §4.3's `setAttr` row) | no other record of the kind changes (digest of the others byte-equal) |
| 10 | treasury, taxes and type edits do not recompute production or trade (no equivalent: the host's) | nearest equivalent: a polity window re-rooting a seat's link (a sovereignty transfer at mint) | W8b over the allegiance's dirty box, W9's labels; the map feed | the sway's allegiance and the map feed change at the revision; the row says "host-side fact: the map's part is the sway" |
| 11 | military unit-type edits need a whole regeneration (no equivalent: the host's) | nearest equivalent: `costLaw` through the port (W7's law changed) | W7a/W7b over every edge (declared whole-world) | every route's `costTotal` is re-derived under the new law; no stale polyline |
| 12 | manual goods placement does not affect production until regenerated (no equivalent) | nearest equivalent: a `regenerate` on W5's resource thinning (`EditScope { kind: 'world', stage: 'W5' }`) | W5's resources → W6a/W6b's `resource` term → the charters' `resources` | every proposal's `resource` term and every placement's charter `resources` read the new sites |
| 13 | removing or editing a route does not re-route journeys or trade | `setAttr(class)` on a `WorldRoute`, or a seat removed by `setSeats` | W7b over the landmass (the discount changes), the charter's `roads` of every placement the route crossed, W6b's `connectivity` term | the charters' `roads` and the proposals' `connectivity` terms change; no route touches a removed seat |
| 14 | a state's or culture's type and expansionism propagate only with a checkbox | a polity window changing a seat's prosperity rung or a culture band (held for its dwell), or a standalone `setSeats` | W8b at the revision, always (no option) | the sway changes without any flag once the dwell is met, and not before (T-V13-41 (c)) |
| 15 | regenerate commands redraw fixed layer lists (rivers without biomes or labels) | `regenerate` on W1's noise (`EditScope { kind: 'world', stage: 'W1', box }`) | the declared I/O: W2 → W3 → W4 → W5 → W6a → W7a → W6b → W7b → W8 → W9 over the dirty set — every downstream stage, never a hand-listed subset | every stage's output inside the box changes consistently; the stage set run equals the topological closure of W1's writers (a log assertion) |
| 16 | relocating a settlement does not re-route its roads | `setPlacement` of a seat's frame, or a standalone seat moved through `setSeats` (a host seat's origin is the host's, refused under its move-lock) | W7a/W7b over the landmass; the charter's `roads` of the moved frame | every route whose end is the seat ends at its new cell; the old polyline is gone |
| 17 | the height exponent regenerates temperature but not biomes; the world configurator regenerates biomes but not population or states | `adjust` of `world.poles`, `world.wind` or `world.latBox` (`fromStage: 'W3'`) | W3 → the cascade (discharge changes) → W5 → W6a → W7a → W6b → W7b → W8 → W9 | biomes, proposals and territories change with the climate; no stage is skipped (the log assertion of row 15) |
| 18 | relief icons are regenerated wholesale by a style effect, discarding manual edits | a view-key change (`worldLayer`, a style preset) | nothing in the model: the view re-renders from the model; an edited attribute (a renamed reach, a user's `setSurface`) survives every re-derivation (§7.2) | the model digest is byte-equal across the view change; every edited attribute survives a `regenerate` of its stage |

**The cascade's own consumer list** (T-V13-21b, the water readers of this design, one test each): (1) V04's cellar
`flood` attribute, (2) V04's sewer outfalls, (3) V04's well yields, (4) V04's crypt depth test, (5) the undercity's
lifeline (V04 §3.6), (6) §4.5's damp-ground prosperity term, (7) S3's site flood test, (8) S1's crossing sites, (9)
§4.3's deck spans, (10) the harbour's low-water depth, (11) the `Encounter` memo re-resolves after the cascade, (12) a scene re-exported after the cascade differs in `waterStamp` and the water fields alone (T-V14-11's clause),
(13) the world's charter facts per placement, (14) the glyph's water marks, (15) W7's river crossings, (16) W8's river
borders, (17) the flood overlay's spread cache, (18) the exports' `waterClass` property, (19) V14's G6 over every site
document whose anchor or placement lies in the dirty set, (20) V05's fallen islands' decoration faces under a raised
sea. Each test edits a surface, runs the cascade and asserts the reader's value changed as the law says.

### 3.15 The map-import adapter (the one statement; §2.8's table points here)

`@plat/port/world/adapters/<ecosystem>/<version>/` holds, per supported version (1.114, the host's fork's full JSON
export; 1.152, users' full JSON export or `.map` file — the formats V13 §2.8's mapping table names), the unit table and
the import request `MapImportRequest { source; origin: 'host-embedded'|'file'; hostPlacements?: { subject; xPx; yPx;
frame: 'verified'|'unverified'; locked: boolean }[] }` (a host's own snapshot is `host-embedded`; a shared or gallery
file is `file`, untrusted, its strict key list and refusals the geometry's scrub), a `schema.json` (the key list the adapter reads and the exporters
write: the only place the
reference's property names appear, J-V13.46; under §14's lint it is a data file, not source) and the adapter:

1. **Read.** `MapImportAdapter.read(json | mapFile)` validates the version against the folder (an unknown version:
   refused with the nearest supported named, `refuse.import.version`), checks every key of the schema's required list
   (`refuse.import.key` naming the first missing), and builds `MapImport` (V13 §2.8): the cell graph (vertices, cell centres, neighbours),
   per-cell height (the reference's 0–100 scale → metres by the schema's height law: ≤ 20 water, the height
   curve above — its numbers the schema file's, as data), the sea-level cell set, per-cell biome index with the biome
   name list, temperature and precipitation per cell, the river list (cells, discharge, width, source, mouth), the
   lake list (cells, height), the settlement list (cell, name, population, port, capital, state), the state and province
   lists (cells by membership, name, capital), the route list (cell sequences by kind), the culture per cell, the
   kilometre-per-unit datum, the culture per cell, the markers, the zones, the lore block, the rural population and the
   coastline hint (V13 §2.8's rows). Everything else is ignored and listed in the import report.
2. **Raster.** `WorldStrategy.fromImport(imp)`: the world's extent is the import's pixel extent × its units per pixel ×
   its unit's metres (a custom unit typed by the DM, else refused `refuse.import.unit`; a file with no scale at all takes 3 km
   per pixel, `W_IMPORT_SCALE_ASSUMED`); **one transform** maps every point the import converts — cell centres, river and
   route points, markers, zones and the host's placements: cmPerPx = units per pixel × metres per unit × 100 (a double,
   once), xCm = round(xPx × cmPerPx), yCm = round((heightPx − yPx) × cmPerPx) (y down in the file, y north in the world;
   rounding half away from zero), recorded in the report so the host can map its own pixel-keyed facts the same way;
   **no silent rescale**: an extent beyond the largest row's band is offered to the DM as a rescale (the ratio shown,
   the declared size becoming the rescaled one), a declared window crop or a coarser fine cell at the declared size, and
   refused (`refuse.import.extent`) only when all three are declined or the far corner leaves the int32 lane; the rung is
   the smallest whose band holds it; the DEM is the
   cell heights re-sampled from the cell graph to the fine grid by nearest cell centre then smoothed by one `smooth` op
   at 2 × the fine cell (own), sea cells at −`importSeaDepthM` (V13 §2.3, own) below the datum — the reference's depth
   law is never read; `Recipe.world.recipe` is one `image` op whose `ref` is the rasterised DEM asset (so the world is
   re-derived from its recipe like any other, J-V13.6; a `Re-derive from W1` runs the op again) followed by no further
   ops; `geology` ordinary everywhere.
3. **Stages** (J-V13.48: every stage re-derives; the import's drawn facts are matched and kept as edited attributes or
   provenance, never trusted as inputs). W0 writes the recipe and snapshot with `source: 'import'`; W1 runs (the image
   op); **W2 runs** over the DEM and its lakes are matched to the import's by cell-set overlap (§2.5's anchor): a
   matched lake keeps the import's `open`, `subtype` and name as edited attributes, and its level where the two differ
   by ≤ `lakeMinDepthCm`; an unmatched import lake is dropped and reported (`lakesDropped`); W3 runs in **derive-only
   mode** (V13 §3.4: the imported temperature and precipitation are taken per coarse cell as the climate raster; the
   winds and seasonal curve are derived from the latitude box the import's scale and map size give, or the rung's
   default box, reported); **W4 runs** fully, its reaches matched to the import's by mouth cell within 2 fine cells and
   source overlap, a matched reach taking the import's name as an edited attribute and its discharge and width as
   provenance values; an unmatched import river is reported (`riversUnmatched`); **W5 runs** with the import's biome per
   cell as an override layer (`biome` = the schema's biome name mapped to our row by the schema's mapping table — a name
   with no row takes W5's own result and is reported, `biomesUnmapped`); the import's settlements become,
   on a standalone import, `RecipeSeat`s (tier by the travel law's population thresholds) and `SitingProposal`s with
   `demand: 'import'`, and its states allegiances (V13 §2.8); on a host's own snapshot (`host-embedded`) the file's
   settlements, states, provinces and cultures are **dropped as inputs** — the host's placements arrive as `importSeats`,
   a legacy settlement matching a placement folded into it, any other kept as an `importHint`, the markers and zones kept
   flagged `unseenByDm` — and each of the host's own gates is carried from the file's cell centres as a `HostGateRef`
   (the one statement of these roles; **no frame is generated** by the
   import — a frame exists only when the host's dossier makes one and it is placed); **W6a, W7a, W6b and W7b run** over
   the seats under the default cost law, the import's routes matched by ends and kept as provenance; **W8a and W8b run** from
   the seats (standalone), the file's state membership compared (`polityAgreement`, the share of the sway's cells
   agreeing; not applicable on a host's own snapshot); W9 names only
   what the import left unnamed (the import's names are edited attributes); the markers become POI candidates for
   V14's G1, the zones annotation records, the lore the document's name and year, the rural population a provenance value
   on the nearest seat, the coastline hint an `importHint` record (V13 §2.8).
4. **The report.** `ImportReport { version; extent; rung; scale: { unitsPerPx; unit; metresPerUnit; conversion; rescale };
   transform: { cmPerPx; heightPx; flip: 'y' }; hemisphere: 'north'|'south'|'straddles'; keysIgnored; lakesDropped;
   riversUnmatched; biomesUnmapped; routesUnmatched; polityAgreement; placements: { converted; legacyFolded;
   unverifiedSited; unresolved }; warnings }`, shown by V09's dialog and kept on the world document as a
   `ReasonRecord` of the import.

The adapter is the one place the reference's format is read; nothing in `@plat/world` names it; the clean-room lint's
identifier list excludes the adapter folder's own name (C13-50). Tested by T-V13-26 (the fixture is a synthetic JSON in
the schema's shape made by our own script, never a captured export); its round trip (b) is over **the shared keys after
re-derivation** — the heights, the names, the seats' positions and attributes, the climate arrays — not the import's
river courses, lake sets or routes, which the stages re-derive (J-V13.48).

### 3.16 Failure handling (the ladders, in §5.2's form)

| class | where | detection | ladder (in order) | how it is tested |
|---|---|---|---|---|
| F-WORLD† the world pipeline cannot produce a stage's output as asked [V13 §3.1–3.10] | W0–W9 | **recipe:** a pinned table missing, an unknown op, a parameter outside its row's range; **clamp:** a DEM value outside ±`reliefLimitM`, a climate value outside its band; **lake:** a filled depression's spill cell ambiguous (two equal saddles); **sink:** the priority flood leaves a land cell with no descent (a bug: the flood is exact) or a reach's trace exceeds `maxReachCellsFactor` × the grid's longer side (V13 §2.3); **matrix:** a biome lookup outside the bands; **none placed:** W6 places no candidate; **no path:** W7's Dijkstra reaches no end or exceeds `maxCostFactor`; **seat:** a W8a seed on water or ice | recipe: take the table's default version / drop the op / clamp the parameter, each reported `W_WORLD_RECIPE_*`; clamp: clamp and report; lake: the saddle with the lower cell index spills (deterministic), reported; sink: `E_WORLD_SINK` is a bug abort (§5.1 (8)) — a reach over the cap is cut at the cap and reported `work_cut`; matrix: the nearest band, reported; none placed: lower every spacing by `shrink` once more → place the single best cell → report `W_SITING_NONE` and run W7–W9 empty; no path: the pair unjoined, reported; seat: the seed moved to its nearest land cell (`W_POLITY_SEAT_MOVED`) | T-V13-3 (the recipe ladder), T-V13-5 (clamp and sink: a flat world, a one-cell world, a world all water), T-V13-14 (siting none, no path, seat) over the corpus of V13 §7 |
| F-GW† the groundwater field cannot be derived [V13 §3.5.4, §3.12.3] | W4; the frame's groundwater step | no surface cell in the set (a frame with no water and no charter; a world with no sea and no lake); a charter's `waterTable` grid that does not cover the margin; a cell whose table exceeds the dem (a bug: the cap is applied) | no source: the table is `dem − deepTableCm` (V13 §2.3: a deep dry table) everywhere, reported `W_GW_NO_SOURCE`; a short grid: the missing margin reads the nearest covered cell, reported; a table above dem: `E_GW_CAP` is a bug abort | T-V13-22 (a dry frame; a charter with a short grid) |
| F-PLACE† a placement cannot be made as asked [V13 §3.11] | the placement operators P1–P5 | **does not fit:** the frame's extent + margin exceeds the world's at any bearing; **no lawful placement within reach:** `nearestLawful` returns none; **blend over band:** the edge RMS after `blendBandMaxM` exceeds `edgeRmsRefCm`; **overlap:** another placement's extent + margin intersects; **charter miss:** S1 reports `W_CHARTER_RIVER_MISSED` on a world-first frame; **anomaly:** V13 §3.11.5's locked-term anomalies | does not fit: refused (`refuse.place.fit`, the smallest fitting rung named); no lawful: the asked placement kept, flagged unlawful, the three least-cost offered (`W_PLACE_NO_LAWFUL`); blend over band: the residual accepted and reported `W_PLACE_BENT` as the cost's `edgeElevation` detail; overlap: refused unless accepted (`W_PLACEMENT_OVERLAP`, V13 §3.11's edges); charter miss: a coherence fact in the placement card, never a failure; anomaly: reported with the DM's two choices (keep, or the scoped `worldWins`; C13-25) | T-V13-23 (fit, unlawful, overlap), T-V13-24 (blend residual), T-V13-13 (charter honoured) |

The report codes are §5.4's form (`W_*` warnings with their arguments; the `E_*` bug aborts), listed in V13 §7.5's code table; refusals are §7.1 outcome keys (`refuse.*`), never report codes (C13-53).

### 3.17 Determinism

The world's streams are concerns of §6.1's `Stream` with the stage ids W0–W9 (W6a, W6b, W7a, W7b among them),
`WORLD_PLACE` and `WORLD_CASCADE`: `world.recipe` (W0's template draw, keyed by the world root and the op ordinal; W1's
noise op keyed by op index and **position**: the noise value at a fine cell is the low 64 bits of `H128` over the
structured components (the op's seed, the cell's world x and y) through the one mixer — never a string, §6.1; C13-43
— folded into the octave sum, so a changed extent changes only the new cells — position-keyed noise, V13 §3.2),
`world.climate` (W3's moisture start jitter per coarse row), `world.resources` (W5's per-cell draws), `world.siting`
(reserved: siting draws nothing, its tie-break deterministic, V13 §3.7 (6); SW-03), the base's `water.delta` (W4's distributary shares, keyed by
the reach's lineage — the base concern's registry row gains W4, BCR-V13-8; C13-46) and the base's `naming` (W9's names
through V11's service). `world.polity` and `place.search` are **reserved ids only**, not streams (W8 and P1 draw
nothing); `world.patrol` keys the patrol phase by (segment, power) through the one mixer — the entity key from the
segment's lineage, the power's host key hashed into the salt, epoch 0, attempt 0; the week never enters the key — a
fixed-key reading and never a stream (V13 §3.9 (14)); its row is appended to the kernel's concern registry
(BCR-V13-8). The comparator lint (no randomness in a comparator: every sort key is a value or an index, never a draw) runs
over `@plat/world` in T-V13-1's CI row (C13-51). Every floating
operation goes through the kernel's `dmath` (§6.5: the transcendental functions and the fixed summation order), every
raster pass runs in row-major order, every queue is the lifted bucket queue of `@plat/world/hydro` with integer keys and cell-index
tie-breaks, every Dijkstra and flood keyed on (cost × 1 000 rounded, cell index). A world generated twice from one
`Recipe.world` on every §13.2 platform is byte-identical per stage (T-V13-1); a frame generated from one charter and
seed likewise (T-V13-13); the cascade at the same log position in session and replay gives the same digest (T-V13-25).
Work limits are laws over `frameCells` (fine or coarse by stage): W1 ≤ Σ (op cost × touched cells) over the recipe
(the op costs V13 §2.3's); W3 ≤ 8 passes × coarse cells; W4 ≤ 12 × fine cells (the flood, the accumulation, the
Dijkstra); W6a, W6b ≤ 4 spacing retries × candidates; W7a, W7b ≤ Σ over edges of the search ellipse's cells; W8a ≤
3 × coarse cells (the flood, the crossings); W8b ≤ Σ over the revision's seats of their cap discs' fine cells +
`smoothPasses` passes over the dirty box; a limit reached is F-WORK's `work_cut` (never a timeout; reported
`W_CASCADE_TRUNCATED` when the cascade's step is the one cut): W7 drops the remaining lowest-rank edges, W8 stops
expanding (reported).

### 3.18 Edges

A stage's edge cases are its *Edges* paragraphs; the volume's cross-cutting ones: (1) a world with no land — every
stage runs over an empty land set, no reach, seat, route, territory or label; the view shows one sea; a placement on it
is unlawful everywhere (the shore offered is none: `W_PLACE_NO_LAWFUL` with no offer). (2) A world of one land cell — one
basin, one proposal, no route, one territory of one cell. (3) A frame placed at the world's edge or corner — the ring's
off-world stations clamp to the edge cell; the exit head is the edge's. (4) A frame larger than its rung's extent —
refused. (5) A placement whose frame document is later deleted — the placement stays with a stale glyph and a report;
`unplaceFrame` removes it. (6) An imported map at a scale smaller than `province` — placed on the province rung with
the extent clamped and reported. (7) Two worlds open at once — a frame belongs to one (`worldRef`); placing it in a
second refuses (`refuse.place.worldRef`) unless `unplaceFrame` ran first. (8) A dated surface in the future — refused
(`refuse.surface.date`). (9) A `setSurface` on a reach that lowers the stage under the bed — clamped to the bed, reported.
(10) A `happened` edit at the creation week — allowed; its trace is empty (nothing older exists) and reported.

## 4 Editing

### 4.1 The edit events (declared in §7.1's form; BCR-V13-9 adds them to `EditEvent`)

```ts
type WaterVerb = 'happened' | 'alwaysSo';                         // EditBase.verb (BCR-V13-9); default 'happened'
type EditEvent = EditBase & (
  // … the base's variants …
  | { t: 'worldRecipe'; action: 'append'|'replace'|'remove'|'reorder'; index: number; op?: RecipeOp; toIndex?: number }   // the world document only; a Re-derive from W1 over the op's touched cells (V13 §4.3)
  | { t: 'setSurface'; surface: Id | { kind: 'site'; body: Id; level: number } /* the body's present surface, a reach, or a site level's surface (V14's floodSite / drainSite fold to it; SW-06) */; levelCm?: Cm; stage?: { knot: number; stageCm: Cm }[] /* a reach's stage profile */; date?: Week /* absent: the document's week under 'happened'; forbidden under 'alwaysSo' */; cause?: string /* a calamity kind, an epoch's op, or free text */ }
  | { t: 'setField'; field: 'terrain'; key: PlatKey | 'world' /* the base's shape: one stroke; 'world' names the world raster (BCR-V13-9) */; stroke: FieldStroke; date?: Week /* ≤ the document's week; absent: the document's week; forbidden under 'alwaysSo' (refuse.surface.date); SW-27 */ }   // `verb` read
  | { t: 'rerouteReach'; reach: Id; fromKnot: number; toKnot: number; via?: WorldPointCm[] /* waypoints the re-trace must pass within one hydro cell of; absent: steepest descent on the pre-carve ground */; date?: Week /* as setField's */ }   // the frame's form is the base's moveCourseKnot with `verb` and `date?`
  | { t: 'requestCharter'; subject: { kind: 'frame'; pending: Uuid } | { kind: 'site'; site: Id }; originCm: WorldPointCm; bearingCdeg: Cdeg; frame: { widthCm: Cm; heightCm: Cm; marginCm: Cm } /* frameOf(size, aspect), V13 §3.11 */ }   // world-first (C13-04): creates the Placement (stamp 'world', cost 'world-first') and runs P4; author 'host' through WorldPort.charter, else 'user'
  | { t: 'bindPlacement'; placement: Id; doc: Uuid }   // author 'world': the frame generated from the charter now exists; emitted by `generate` with Recipe.charter (C13-04, C13-40)
  | { t: 'placeFrame'; frame: Uuid; originCm: WorldPointCm; bearingCdeg: Cdeg; preview?: true /* the dry run: the cost and the offers, no write */; accept?: ('overlap'|'unlawful')[] /* the warnings the DM accepted */ }   // settlement-first; always `happened` (`verb` ignored, C13-55)
  | { t: 'setPlacement'; placement: Id; originCm?: WorldPointCm; bearingCdeg?: Cdeg; accept?: ('overlap'|'unlawful')[] }
  | { t: 'mirrorFrame'; placement: Id; mirrored: boolean; confirmed: true /* the warning of V13 §3.11.5 (2) was shown */ }
  | { t: 'worldWins'; placement: Id; ids?: Id[] /* absent: the whole frame from S1; present: the named entities only (the scoped form, V13 §3.11.5 (4); C13-25) */; confirmed: true /* the §6.3 change count was shown */ }
  | { t: 'unplaceFrame'; placement: Id }
  | { t: 'setSeats'; seeds: RecipeSeat[] /* a standalone world's whole list; the fold diffs by seat; refused on a host-bound world (`refuse.world.hostSeats`) */ }
  | { t: 'bindSeat'; hostKey: string; placement: Id }   // author 'host' (WorldPort.bindSeat): writes Placement.hostKey once; a recorded input
  | { t: 'unbindSeat'; hostKey: string }   // author 'host' (WorldPort.unbindSeat): clears the key; the seat territory's change is offered to the host's re-canonize; a recorded input
  | { t: 'importSeats'; rows: { hostKey: string; at: WorldPointCm; frame: 'verified'|'unverified'; locked: boolean }[] }   // author 'host': the host's existing placements as a recorded import request (V13 §3.11.6)
  | { t: 'polityRevision'; week: Week; causes: Id[]; facts: Hash64 }   // author 'host' (the fold of a polity window or a dated trigger, V13 §3.9 (13)); verb happened
  | { t: 'setSwayLock'; cells?: Uint32Array; sway?: Id; holder: string | 'unclaimed' }   // the DM's word is canon on a standalone world: the cells are exempt from later revisions, and a revision that contradicts the lock raises W_SWAY_LOCK_CONTRADICTED (keep, release); on a host-bound world a presentation lock, never read by the map feed's crossing holders or `patrolOffer`
  | { t: 'divide'; territory: Id; seats: WorldPointCm[] }   // standalone provinces on the DM's request
  | { t: 'growPlacement'; placement: Id; size: { size: string; aspect: number } /* frameOf's two inputs */ }   // a placed town that grew: the charter re-emitted at the new ring (world stamp) or the band re-blended (settlement stamp), V13 §3.11
  | { t: 'deleteTrace'; trace: Id }
  | { t: 'addEvent'; event: Omit<WorldEvent, 'id' | 'reason' | 'source' | 'factTier'> }   // a user's dated world event (T9 `shape`; source 'user', factTier 'map'); the host's arrive through WorldPort.events as author 'host' (SW-07)
  | { t: 'fork'; name: string } | { t: 'discardFork'; fork: Id } | { t: 'commitFork'; fork: Id; verb: WaterVerb }   // V13 §4.5
  | { t: 'adjust'; param: 'world.size'|'world.poles'|'world.wind'|'world.latBox'|'world.biomeMatrix'; value: unknown; fromStage: 'W0'|'W3'|'W5'; fates: EditFate[] }   // the base's shape (§7.1) with the world params (BCR-V13-9; C13-34)
  // in the FRAME's log (C13-40):
  | { t: 'charter'; worldRef: { world: Uuid; placement: Id } | null; charter?: FrameCharter /* source 'world' only (C13-03) */ }   // author 'world', the reserved session 'world:place' with no group (as 'host:port'); emitted by the world's requestCharter / bindPlacement / worldWins / unplaceFrame folds; undone only by the world's undo of that edit
);
type EditScope = /* the base's forms */ | { kind: 'world'; stage: 'W1'|'W5'|'W6a'|'W6b'; box?: { c0: number; r0: number; c1: number; r1: number } };   // `regenerate` on a world stage's scope (BCR-V13-9; C13-34)
```

`setAttr` (the base's) admits the targets of V13 §1b.3's row (a surface's `subtype`, `open`, `date`; a reach's
`navigable`, `name`; a standalone territory's or allegiance's `name` (a host-bound allegiance takes the DM's christening from the host); a standalone route's `class` (a host route's grade is the host's: `refuse.world.hostRoute`); a placement's `bearingCdeg`,
`originCm` — the last two sugar for `setPlacement`). Every event's dry run (§7.1) runs the fold on the scratch overlay:
a placement's operators with the cost and anomalies as its outcome; a water edit's cascade with its change list (a `setSurface` whose body no longer exists is a no-op reported `W_SURFACE_NO_BODY`); a
`worldRecipe`'s W1 re-run over the touched cells with the downstream dirty set as its effective scope. The outcome
table's new rows (§7.1's catalogue; BCR-V13-9; the refusals are §7.1 outcome keys rendered by V09's catalogue, never
§5.4 `ReportCode`s — C13-53): `refuse.place.fit`, `refuse.place.worldRef`, `refuse.charter.dossier`,
`refuse.surface.date`, `refuse.world.recipeOp`, `refuse.world.tier`, `refuse.import.version`, `refuse.import.key`,
`refuse.import.extent`, `refuse.import.unit`, `refuse.place.hostLocked`, `refuse.world.hostSeats`, `refuse.world.hostRoute`,
`refuse.world.advancing` (a host-bound world's edit while the host advances or is parked), `refuse.world.hostRequires`
(`keepResidual`), `refuse.world.hostPolitical` (a political or military event kind on a host-bound world); the
warnings with their `ConflictAction`s — `W_TRAVEL_BAND_CROSSED` (`keep`, `cancel`: every dry run, route-class edit
and fork preview of a host-bound world carries `timeDelta` — each changed leg's foot and army weeks against the adopted
canon's baseline under the host's travel law, its band crossings and its fragility — and the committed edit's reason
keeps it for the next canon's `TimeDeltaReceipt`), `W_HOST_CANON_BEHIND` (`keep`), `W_SWAY_LOCK_CONTRADICTED` (`keep`, `release`), `W_EDIT_DOSSIER`
(`keepDossier`, `moveTown` where the placement is not host-locked, `cancel`; V13 §3.11.5 (1)), `W_PLACE_NO_LAWFUL` (`keep`, `takeOffer` with `offer: n`, `cancel`),
`W_PLACEMENT_OVERLAP` (`accept`, `cancel`), `W_CHARTER_RIVER_MISSED`, `W_SURFACE_BELOW_BED`, `W_PLACE_ANOMALY` (`keep`,
`worldWins` with `ids`) — `ConflictAction.kind` gaining `'keep'|'takeOffer'|'accept'|'cancel'` and `offer?: number`
(BCR-V13-9). The author of a port-driven `requestCharter` is `host`; of `bindPlacement` and the frame's `charter`
event `world` (`EditBase.author` gains `'world'`, BCR-V13-9); of an epoch's dated surface `epoch`; of an import's seeded
attributes `user` or `host` (whoever ran the import: a creation-prefix event, `creation: true`, never `migration` —
C13-34). A placement edit is always `happened` (`verb` ignored on it; its `oldGround` trace covers the extent + margin
+ band, C13-55).

### 4.2 The authoring tools (V09's binding table, BCR-V13-25)

| tool | mode on the world document | what it shows while the user works |
|---|---|---|
| T1 `intend` | the world dialog: size rung or extent, template, poles, winds, latitude box, matrix; the `adjust` keys | the extent's cell counts and V13 §6's budget for the rung |
| T2 `ground` | the terrain-recipe editor (an op list with an `append` brush: a hill, pit, range, trough, strait or noise at the pointer's extent, resolution-independent); `setField` strokes on the DEM; `setSurface` on a body (a level slider with the seasonal pair marked); `rerouteReach` by dragging a reach between two knots | the op's preview on the fork (W1–W4 re-run over the touched cells, ≤ V13 §6's edit budget); the cascade's change list (reaches moved, lakes opened or closed, placements whose charter goes stale) |
| T6 `place` | **Place a settlement**: a *Charter here* action (`requestCharter`: the frame size from the request's `size` and `aspect`, the outline shown before any generation; C13-04) and, for an existing frame, the frame's outline dragged over the world, the bearing by a rotation handle (steps of `bearingStepCdeg`), the coherence cost by term beside the pointer (V13 §3.11.1; green at lawful), the three offers as ghost outlines on request (`nearestLawful`), the mirror toggle (warned), the `worldWins` button on a stale charter; `setSeats` by dragging seat pins with a tier picker (a standalone world only; a host-bound world's seats are the host's) | the dry run's cost, offers, overlap warning, the blend band's outline (settlement-first) and the anomaly list |
| T9 `shape` | `setAttr` on a surface, reach, territory, route or placement; `deleteTrace` on a trace | the inverse |
| T10 `hold` | `fork` / `commitFork` / `discardFork` (the Preview-on-a-copy toolbar: "What if the sea rose 2 m?"); `regenerate` on W1's noise, W5's thinning, W6's tie-breaks | the fork's name in the title; the diff count against the canonical document |

On the frame document the base's tools gain the `verb` toggle on T2 (a two-state control, *this happened* default,
*this was always so*) and the water class overlay on T9's inspector (the unit's class, depth, governing surface and
reason). The compass rose turns with the placement (derived presentation, V13 §3.11.5); the frame's own arena never
rotates.

### 4.3 Locality (§7.3's form): effective scope, local operators, what is pinned

| edit reaches | local operator | pinned | beyond it (declared, never presented as local) |
|---|---|---|---|
| a `worldRecipe` op (W1) | W1 over the op's touched cells (its footprint + `smooth` radius, grown by one coarse cell), then the cascade (V13 §3.14.2) over the watersheds the touched cells belong to, then W5–W9 over the dirty set | every cell outside the dirty set; every placement (its blend re-applied after W1 under a `settlement` stamp; its charter marked stale under a `world` stamp, V13 §3.11.5 (1)); every dated surface; every edited attribute | an `image` op or a `mask`/`invert`/`add`/`multiply` op touches the whole extent: Re-derive from W1 (declared whole-world, with V13 §6's full budget) |
| `setField(terrain)` on the world | the cascade over the stroke's watersheds | as above | — |
| `setSurface` (world or frame) | the cascade from step 3 (surfaces) over the body's watershed | the body's identity; every other body; locks | a sea-level change touches every coastal watershed: declared as such; at the frame it is S1's water operator (§7.3) with the cascade |
| `rerouteReach` / `moveCourseKnot` with `verb` | the base's river operator (§7.3's S1 water row) at the frame; at the world the re-trace between the knots on the pre-carve ground, the old bed's cells un-carved (the delta restored), the new bed carved, then the cascade over the reach's basin | the knots outside [fromKnot, toKnot]; downstream reach ids (discharge re-propagated as scalars) | — |
| `placeFrame` / `setPlacement` (settlement-first) | P1 → P2 → P3 → P4 → P5 → W9 (the glyph) → W7–W8 over the landmass when the frame is a new seat | the frame's arenas, plots, buildings, locks (bar 3); every other placement's blend (an overlap is refused or accepted) | W7–W8 re-run over the landmass is declared |
| `requestCharter` (world-first; the host's `charter(world, campaign)`) | P4 only (the placement created with a pending subject, `precedenceStamp: 'world'`, cost `world-first`; no P1: there is no frame) | the world's DEM (no blend); every other placement | a dossier contradiction refuses the event (`refuse.charter.dossier`) |
| `bindPlacement` (author `world`, after `generate` from the charter) | the placement's subject bound → the frame's `charter` event → P5 → W9 (the glyph) → W7–W8 over the landmass (a new seat) | everything in the frame; the world's DEM | W7–W8 over the landmass is declared |
| `mirrorFrame`, `setPlacement` bearing only | P1 → P4 → P5 → W9 (settlement-first: P2–P3 re-run, the former band's trace restored first) | the frame | — |
| `setPlacement` (origin) of a world-first placement | P4 (the charter re-emitted, marked stale on the frame) → P5 → W9 → W7–W8 over the landmass | the frame | the frame's `worldWins` re-derivation: declared (SW-19) |
| `worldWins` | P4 (world-first charter) → the frame's Re-derive from S1 with §6.3's carry-over → P5 → W9; the blend trace restored and P3 re-run over the former band; on a **site** subject the re-derivation is V14's G5 (f) re-materialization under the new charter with §6.3's carry-over, run by `@plat/sites` on the `placed` row (SW-19) | every drawn constraint and lock in the frame; the world outside the band | the frame's re-derivation is whole-frame from S1: declared, with the base's Re-derive budget (§12.6) |
| `unplaceFrame` | the blend trace restored, P3 over the former band, the placement, charter and glyph tombstoned; W7–W8 over the landmass | the frame document (its `worldRef` cleared, `Recipe.charter` kept as a recorded input — the frame still knows where it was generated for) | — |
| `setSeats` (standalone) | W8a over the seats that changed (their former and new cells' bounding watersheds) → W8b over their caps → W9 names | territories and sways of unchanged seats outside the touched cells | a tier change on every seat is Re-derive from W8 (declared) |
| `polityRevision` (host-bound) | W8b over the revision's dirty box (the closure of the seats whose τ, M, reinforcement, strength band or continuity changed — every continuous member of an allegiance whose root's B, links or tier changed —, the two seats of a pair whose `MarchHold` band crossed while M is dark, their cap discs and every cap disc meeting them, grown to whole normalization components) | W8a; every charter; every frame; every cell outside the box | never W8a, never a charter (T-V13-41 (b), (i)) |
| `bindSeat`, `unbindSeat`, `importSeats`, `genesis`, `network` (host-bound) | the placement's key; W7 over the named edges only | every route the host did not name | a new seat territory is offered to the host's re-canonize (`W_HOST_CANON_BEHIND`) |
| `adjust` of a pole, wind or latitude box | W3 → the cascade (the climate changes discharge) → W5–W9 over the whole extent | the DEM; placements; dated surfaces | whole-world by nature: declared |
| `adjust` of `world.size` | Re-derive from W0 (the extent changes; position-keyed noise keeps the old cells' values, V13 §3.17) | placements inside the new extent; one outside is kept and reported | declared whole-world |
| `deleteTrace`, `setAttr` | the record alone; a `setAttr(open)` or `(navigable)` runs the consumers' step 5 for the body | everything else | — |

**Edit fates** (§7.3's `EditFate`) on a world re-derivation: a placement is `kept`; a proposal inside a changed
watershed `discarded`; a reach `carried` by its anchor or `orphaned` (its name kept on the tombstone for V11's reuse); a
territory `reshaped` with the cells moved; a dated surface `kept`. **Recorded inputs** of the world are its recipe,
its seats and every placement; of a frame its charter.

### 4.4 Undo

Every event's undo is V13 §1b.3's row: the replaced scope (for a re-derivation) or the inverse (for an attribute).
A placement edit's undo restores the former placement, its blend (the trace re-applied) and its charter copy, and emits
in the frame's log the inverse `charter` event (the former `worldRef` and `Recipe.charter`); the derived readings
(datum, wind, sun) follow the world; a `worldWins` undo is the frame's Re-derive from S1 undo (the base's: the replaced
scope restored byte-identical). A `happened` edit's undo removes its dated surface and traces together (the group);
`deleteTrace`'s undo restores the trace alone. The world and the frame have separate logs and separate undo stacks
(§7.4's per-document sessions): a placement edit is one group in the world's log; its fold writes the frame through
the frame's own `charter` event (author `world`, the reserved session `world:place` — §7.4's second reserved session
beside `host:port`, BCR-V13-9 — with no group, so it sits in no user's undo stack; C13-40), and the world's undo record
holds the pair (the world event, the frame event's `seq`) so the two are undone together and a bridged client of the
frame (§11.3) sees the change as an ordinary log event. The frame's user cannot undo the world's placement from the
frame; `unplaceFrame` on the world is the way. On a host-bound world a host input (a window, a seat binding, the
genesis, the laws) is never a user's undo target — the host's own undo arrives as a later window that retracts — and a
world edit the host has `consumed` is sealed: its undo is refused and its reversal is a new edit offered to the host.
T-V13-27 replays every edit kind forward and back.

### 4.5 The counterfactual fork

`fork` copies the document's current state into a fork (the base's Preview-on-a-copy, T10; the fork is a `Document`
with `forkOf: { doc; seq }` and no canonical log position); edits on the fork fold as usual, the cascade runs on it,
the view shows it (with the diff layer: changed units by class, moved reaches, flooded faces against the canonical
state); `commitFork` replays the fork's events onto the canonical log under the given verb as one group (each event
re-folded at its new log position — the fork's results are never copied; a conflict with an event committed since the
fork's `seq` is F-EDIT's outcome per event); `discardFork` drops it. Forks never persist in the canonical document
(a reload drops them; V13 §2.6's row). `forkAt(h, seq)` (§11.2) is the clerk's `whatIf` entry (V13 §4.7), the week mapped to the `seq` of the last event at
or before that week: a fork whose surfaces are those in force at `week` and whose cascade runs from there. A fork of a
host-bound world neither sends nor receives a port message; its preview shows `timeDelta` against the adopted canon.

### 4.6 Loading older documents

A frame saved before this volume loads with: `Terrain.surfaces` built from its water bodies (one surface per body
from `seaLevelCm`, the spill heights and the carved bed), `carveDeltaCm` empty and reported (`W_MIGRATE_NO_CARVE`:
`preCarveHeightAt` equals `heightAt` and bar 5's re-route reads the carved bed until a Re-derive from S1 re-makes the
delta), `Terrain.groundwater` derived on load from the surfaces (reported as the version's shift: cellar classes may
change — the base's migration rule shows the diff, §7.4), `EditBase.verb` read as `alwaysSo` on every older event,
`Document.worldRef` absent (standalone), `Recipe.charter` absent. The world document has no older form. The
migration is one `migration`-authored event group at the log's end (the base's rule), undoable as a group.

### 4.7 The clerk's view: reason records and the four readers

Every stage and every cascade step writes a `ReasonRecord` — the one declaration of V13 §2.2 (C13-07) — per record
and per raster chunk; a cell's reason is `whyCell(raster, cell)`, computed on demand from the chunk's record. The
readers in `@plat/world/why`, exposed through V10's `why` query (V10 §3.9) by a new field `ask` beside the existing
`mode: 'asPlaced'|'asNow'`, which the readers pass through to the kind's provider (BCR-V13-24; C13-39):

| reader | question | answer |
|---|---|---|
| `why(fact)` | "why is this so" | the fact's latest reason rendered (the `MsgRef` with its numbers: "flooded because the floor sits 212 cm below a table set by the river's surface 40 m away, reached through the collapsed passage"); the rule row named; the inputs listed as links |
| `whatCaused(fact)` | "what made this happen" | the chain: the fact's reason → each input's reason, depth-first to the recorded inputs (a recipe op, a placement, an edit event, a table cell), rendered as a tree with the event dates; a missing link is named ("the chain is incomplete at the sewer outfall: derived before this version") |
| `whatChanged(fact, since)` | "what changed here since week w" | every reason with `supersedes` written after `since` whose fact is the asked one or an input of it, with the event and verb ("the ford is gone because the river was re-routed in year 412, this happened") |
| `whatIf(edit)` | "what if …" | `forkAt` + the edit's dry run on the fork + the cascade's change list rendered: counts by consumer kind, the three largest changes named, the coherence cost for a placement |

The clerk's placement proposal (`placeAt`, V10 §3.9's proposal form) is `nearestLawful` rendered as a proposal the user
accepts (`proposedBy: 'clerk'`). A reason's `text` is a `MsgRef` (§5.4's form) so every rendering is per caller and
never carries a withheld name (V10's visibility rule applies: a reason whose input the viewer may not see renders the
input as "something you cannot see"). Reason records sit outside the model digest and inside the records digest (V13
§2.7); a fact without one fails T-V13-10.

## 5 Rendering, labels and exports

### 5.1 The world map: layers and styles (§8's pipeline, the world's rows; BCR-V13-13)

The world document renders through the base's tile pipeline (§8.1) with its own layer set, declared as `LayerSpec`
rows of the `world` product (C13-60 (e)) (the view's `worldLayer` key picks the thematic layer; the structural layers always draw):

| layer | kind | draws | style row (§8.3's style table, the world's rows in `@plat/tables` `style.world`) |
|---|---|---|---|
| `relief` (default thematic) | raster | the DEM as hypsometric tint × hillshade (the sun from §8.4's path sun at the world's default week and hour; the shade is the base's light pass at the vector rung — no light tiles at world scale, §8.4) | eight tint bands by elevation (our own ramp: shore green → upland ochre → alpine grey → ice white; the bands' bounds in metres as cells of the row) |
| `biome` | raster | `biome` per fine cell | one fill per `BiomeRow` (the row's `colour` cell, own palette) |
| `climate` | raster | `tempDeciC` or `precipMm` (a sub-key) | two diverging ramps |
| `watershed` | raster | `watershed` by id | a hashed categorical palette (`H32` of the id, no table; C13-44) |
| `waterTable` | raster | `tableCm − dem` depth bands | a six-band ramp (0–0.5, 0.5–1, 1–2, 2–5, 5–10, > 10 m) |
| `water` | vector | seas and lakes as polygons at their surface (the coast outline from W2 at the stop's tolerance); reaches as polylines with the width from the stage profile, drawn only when ≥ `style.world`'s `riverDrawM3s[stop]` cells (stop 0: 60, 1: 20, 2: 5, 3: 2 m³/s; own, calibratable, registered in the style table — C13-31) | the base's water style rows (the same blue family; §8.3) |
| `traces` (under `showTraces`) | vector | `oldShore` as a dashed line, `oldBed` as a hatched band, `oldGround` as a stippled fill; a `SurfaceTrace` as a dotted level line | the base's "former" style (the dashed grey of V06's history frames) |
| `routes` | vector | `WorldRoute` by class, or by the host's grade on a host-bound world, at the network in force at the view's week; a hidden host road a DM-only ghost, a hidden water lane a quiet-quay mark; lengths labelled in km (never a travel time on the world view: times are the host's, or `derivedTime` labelled with the law and "on foot") | highway 2 px solid, road 1.2 px, track 0.8 px dashed, trail 0.5 px dotted, sea 1 px dashed blue, river (navigable) a darker water line |
| `seatTerritory` (thematic, diagnostic) | vector | W8a's seat territories, borders 0.6 px, and the crossings as small ticks | hashed categorical palette |
| `sway` (with `allegianceBorder`, `memberBorder`) | vector | W8b at the revision in force at the view's `lensWeek` (the document's week unless the scrub sets it): fills at 18 % alpha in the allegiance's colour (`H32` of the root's key, or the host's colour when sent; stable while the root holds), unclaimed land unfilled; allegiance borders 2 px solid; member borders 0.8 px between member sways (stop ≥ 1); an exclave its own outer border with a 1 px dotted halo; satellites dots only, at their frozen site points; a tributary its own fill with its border doubled by an inner 1.5 px band in its overlord's colour; lineage claims — a sale's, and the host's own while its lineage lane is lit — DM-only as a dashed outline; standalone provinces at stop ≥ 2 as 0.6 px dashed | the allegiance palette |
| `occupation`, `debatable`, `fighting` | vector | occupation: a diagonal hatch in the occupier's colour over the occupied sway, dense to light by the host's rung (neutral ink when the occupier is unrecorded); debatable: a cross-hatch in the two sides' colours, no fill; held by force: the holder's fill with a single hatch in the other side's colour; fighting: a crossed-blades mark at each open engagement and a 2 px edge on its segment — no arrows, no animation | the sides' colours |
| `patrols` (a toggle) | vector | `PatrolCadence` per route segment at the revision in force at the view's `lensWeek`: tinted by cadence (weekly, monthly, seasonal), both colours striped on a debatable segment, no arrows or headings; a covert power's DM-only | the powers' colours |
| `events` (with a "this advance" filter) | pins | `WorldEvent`s by kind at their place up to the view's `lensWeek`, a glyph's lifecycle mark at once (razed, besieged, occupied), DM-only docket pins; a pending sway trigger as a planting line until it takes effect or lapses (V13 §3.9 (13)) | the notice style |
| `lens:<id>` (under `worldLens`, one per open lens) | vector and pins | V13 §5.9's elements at `lensWeek`, the regime banner first in the legend | `style.world`'s lens rows, one per element key (V11 writes them) |
| `settlements` | vector | every `Glyph` at the stop's level (V13 §5.2): a frame's `SettlementGlyph`; a site's drawn at level 0 by its `glyph` mark's `class` icon at the pin size (SW-08) | the glyph style rows (dot by tier size: 3–9 px; ring 1 px; outline fill at 60 % of the built colour; water, wall and way in the base's colours at world weight) |
| `resources`, `springs`, `proposals` | pins | W5's resources, W4's springs, W6's proposals (while shown) | the base's pin style, one icon kind per resource (own glyphs) |
| `placements` | vector | the placed frames' outlines (the arena's outer ring through `toWorld`) and the blend band's outline on hover | 1 px accent; the band dotted |
| `anomalies` | pins | `PlacementAnomaly` | the notice style |
| `labels` | the base's label layer | V13 §5.3 | §9's |

**The player picture** (J-V13.77): a player audience sees the sway re-derived at the head revision over the host's
whitelisted political facts — covert links, their exclaves and covert patrols omitted as entities, never greyed — or,
when the host sends `audienceKnowledge`, over the facts that audience knows (an unknown later fact absent, never
guessed), cached per (revision, known set); the player picture reads force, strength and culture bands only where the host's
whitelist admits them (absent, a debatable cell stays debatable unless a fight verdict the audience is shown decides it,
V13 §3.9 (11), an adversarial pair reads level and culture reads 0, and
its relative rungs read against the median of the rungs it is shown: fail-closed, J-V13.77); under an
omniscient regime (no belief recorded) the picture is the sway over the host's public facts; the DM always sees the
head revision. The layers above are the first rows of the lens mechanism (V13 §5.8): `seatTerritory`, `sway`,
`occupation`, `debatable` and `fighting` are the sway lens (the owner's territory rules) and `patrols` the patrols lens
(V13 §5.9), their scrub the sway's revision history; every other lens draws under its own layer key (`lens:<id>`), toggled by the view key
`worldLens`.

The world draws on the base's integer-cm viewport (§8.1) with the world's cm as the arena coordinate — the view's
transform is the same code with a larger extent; the tile cache is keyed by the world document's digest as a frame's
is. On the **frame** document this volume adds three overlays (`waterClass`: units tinted by class — dry none, damp a
hatched blue, wading light blue, swimming blue, submerged dark blue with a ghosted outline; `flood`: the spread at the
chosen stage with depth bands and the barrier edges that stopped it; `traces` as above) and the **waterline** on walls
(a building's elevation render draws a line at the governing surface's height on every storey the stage reaches), the
submerged ruin as a ghost at depth < `style.world.ghostDepthCm` (300) and withheld deeper (below the viewer's key, V10's
visibility), and the encounter crop reads `classifyWater` for every face of its resolved set and `routeClass` over its
ways (V14's E3 (7)); the crop's water rendering is V14 §5.3's (SW-18).

### 5.2 Zoom stops, the glyph levels and opening a settlement

The world band has four stops (`worldZoom` 0–3; the view's zoom is continuous and the stop is the floor): stop 0
shows the whole extent (a continent at ~0.25 px per fine cell), stop 1 is 4 ×, stop 2 is 16 ×, stop 3 is 64 × (a
fine cell at 16 px: the finest the world draws — beyond it the frame opens). At each stop every glyph draws its
`GlyphLevelRow` by V13 §2.3's rule (the highest level whose stop range holds the stop, whose `minTier` the tier
meets and whose `fromStopByTier` for the tier is ≤ the stop: a THORP or HAMLET draws from stop 2 only; C13-52). **Opening the settlement:** a click on a glyph at any stop (or the
`open` action on the placement card) opens the frame document as another page (V09's document router: a new page with
the frame's own view, the world page kept in its tab; the back action returns to the world at the same stop and
centre) — the owner's correction (2): the world map shows the generalization, the full settlement is another page,
never an in-place zoom into the arena. A stale glyph (`sourceDigest` ≠ the frame's) is re-made before it draws when the
frame is open in the same host, else drawn as is with a stale mark. A hover shows the placement card (name, tier,
population, the stamp, the coherence cost by term, anomalies, `open`, `worldWins` when stale).

### 5.3 Labels

W9's candidates (V13 §3.10 (2)) run through §9's placer per stop with `world.labels`'s rows: priority by kind (the
settlement's × tier), the zoom extent per kind, `spreadPx` 12 as the collision margin, a river label along its course
only when the reach's length ≥ `riverMinKm` 30 (shorter rivers unlabelled at every stop), a sea's label at its pole of
inaccessibility at the stop's largest size, an allegiance's at its root sway's `poleCm` in small capitals (the DM's christening, else a descriptive label from its root's name; never a W9 name on a host-bound world), a standalone province's at stop ≥ 2.
The placer's ladder is §9.4's (F-LABEL: view data, never a model change); label positions are cached per (document
digest, stop). A settlement's label is its name beside the dot (stop 0–1) or under the outline (stop 2–3), the tier
by the base's type scale.

### 5.4 Exports (§11.1's pipeline; the world's exporters in `@plat/export`; BCR-V13-12)

| export | shape | contents | source of the shape |
|---|---|---|---|
| `ecosystemJson` | the reference ecosystem's full-map JSON (version-pinned to the adapter folder) | the cell graph re-expressed from the fine raster (one cell per `exportStride` fine cells, the size row's: 10 at the continent rung, 7 at the realm, 4 at the province — ≤ 100 k cells, the range the ecosystem's tools were built for; the dialog shows the count and admits another stride; C13-57), heights on the reference's scale by the schema's inverse law, biomes by the schema's mapping, rivers from the reaches, lakes, settlements from the settlement map records (name, population, tier as the schema's size, port, capital), states from the allegiances (the schema file's neutral state for the unclaimed and debatable land), provinces from the member sways, zones for the debatable bands (the schema file's disputed kind) and the occupations, a diplomacy matrix only from the host's relations when sent (never invented), routes, cultures where the world has them, and the settings block's scale from the extent with the unit km and the scale in km per exported pixel (the inverse of the import's transform; the key names in the adapter folder's schema file) | `adapters/<ecosystem>/<version>/schema.json` (the key list and value laws; J-V13.46) — the exporter is written against the schema file, never against the reference's source |
| `ecosystemGeoJson` | GeoJSON FeatureCollection with the reference ecosystem's property names | cells (Polygon, on request), rivers (LineString with discharge, width, name), lakes (Polygon), settlements (Point with name, population, port, capital, `tier`, and `placement` properties: origin, bearing, mirrored, stamp), allegiances and member sways (MultiPolygon with `status`, `allegiance` and `swayRevision`), routes (LineString with class or grade), springs (Point), traces (kind `trace`) | the same schema file's `geojson` block |
| `heightmap16` | a 16-bit PNG (and raw `.r16` on request) | the fine DEM mapped linearly from `minCm` to `maxCm` (both in the sidecar JSON with the extent, the cell size and the datum) — a standard-looking image for terrain tools | own |
| `worldCsv` | CSV, one file per kind in a zip | reaches (id, name, discharge, length, navigable, mouth), lakes, territories (the seat territories: id, name, area, seat), sways (id, seat, allegiance, status, revision), routes, settlements (the map record's scalars), proposals, resources, springs | own |
| the picture exports | the base's (§11.1: PNG/SVG/PDF of the view at a stop, the A2 300-dpi still) | the world view with its layers and labels | §11.1 unchanged; the world is one more document kind |

Every export's provenance block (§11.1) names the world's digests, the snapshot's versions and the export's schema
version; `ecosystemJson` export → the adapter's import → export is byte-identical over the schema's canonical form on
the shared keys (T-V13-26 (b): the round trip over the fixture, the keys V13 §3.15 names); the heightmap's round trip through the `image` op
reproduces the DEM within one cm per `minCm..maxCm` ÷ 65 535 (T-V13-28). The frame's exports gain `waterClass` on
every unit's record and the surfaces list (the base's JSON schema version bumps, §11.1's rule).

### 5.5 The settlement's picture exports from the world

The base's picture exports are unchanged for a frame; the world's `settlements` layer exports the glyphs as drawn. A
frame's own still may carry the world context strip (its placement's world square at stop 3 as an inset, a dialog
option; own).

### 5.6 Accessibility and the clerk's rendering

Every layer has the base's high-contrast variant (§8.3); the water class overlay carries a pattern as well as a colour
(hatching by class) so it reads without colour; every reason the clerk renders is text (V13 §4.7). The world's
screen-reader summary (V09's) lists the extent, the seas, the named rivers and the settlements by tier.

### 5.7 What the world gives a 2.5D projection (item 141 (e); the renderer is V14's R1–R4 for every document, the world included)

V14's R1–R4 own the 2.5D view of every document, the world document among them (SW-02; J-V13.52); this section
supplies the world's drawables with their `ZDecl` rows (BCR-V13-28; SW-22) and nothing else. The world regime hands
that view exactly these: the fine DEM draped (the vertical exaggeration a view key, never in
any hash — M11); every `WaterSurface` a plane at its `elevationCm` (a lake's, the sea's, a reach's stage profile as a
ruled surface along its course); every trace a plane at its former level (`SurfaceTrace`) or the former ground
(`TerrainTrace`); the glyph marks at the DEM's height at each point; the routes, the seat territory and sway borders, the occupation and debatable hatches, the patrol tints and the event
pins draped on the DEM, and every lens's marks (V13 §5.9) with them; the labels upright at their anchors' heights. **The world's M9 row** (item 140 M9): every world kind declares base
= the DEM and top = the DEM (a raster, a route, a border, a glyph mark, a trace) or its surface (a `WaterSurface`: base
the bed, top the surface); none is flat — as `ZDecl` rows: `{ surface: 'dem' }` for the rasters, routes, borders,
hatches, patrol tints, event pins, lens marks, glyph marks and `TerrainTrace`; `{ base: 'bed', top: 'elevationCm' }` for `WaterSurface` and `SurfaceTrace`; `{ flat,
reason: 'furniture' }` for a label candidate. The projection family, the hit test, the per-stop `Lod25Row`s and the
vertical edit are V14's (R1–R4; V14 §5.6 (10) draws this list); nothing of the world's model changes under any
projection (bar 14's world half: the same document hashes identically under the flat view and every projection —
T-V13-40's row, harnessed on T-V14-14's fixture).

### 5.8 The lens mechanism (J379; J384; one derived layer for every host system the map draws)

A **lens** is a derived layer over the facts the host sends of one of its simulated systems — its plague, its politics
(the sway and patrols lenses, V13 §3.9), its trade, its populations, its faiths, its prosperity and its settlements'
alignment. Every one of those systems keeps its facts per settlement or per pair of settlements: none
is a field over land, links decide who is touched — save four places where nearness picks (a supply link's three
cheapest producers, the column pool's eight nearest, the pilgrim catchment's eight nearest, a satellite's site) — while
geometry otherwise only attenuates, delays or prices, and the host keeps
no history of most of them. So a lens draws marks at settlements, links between them, movers placed by a host clock
and uniform fills over a settlement's own seat area — never a surface interpolated between points — and keeps the
history it scrubs itself. Nothing of a lens is read by a stage, a sway revision, an encounter or the clerk; a lens draws
nothing at random, and sends the host nothing but the DM-placed site offers (V13 §3.11.6).

1. **One record.** Every lens is one `LensLayer` (V13 §2.2), a row of `world.lens` (V13 §2.3) with its element
   functions in `@plat/world/lens`, drawn by one code path: its **identity** (its id, the owner rule that asked for it,
   the host system it draws); its **sources**, each a port field with the **gate expression** that makes it live (a
   host lane lit, the canon, a slot of the host's frozen record, a seated deity, a live plague, belief recorded, a field
   sent); its **regime** words ((2)); its **elements**, each with its fact class ((4)), its drawing grammar (glyph, link,
   route flow, moving marker, catchment, area fill, overlay, caption), its gate, the most of the audience it may reach
   ((7)), its scrub source ((8)), its derivation label and its style row; its **events**, the `WorldEvent` kinds it reads
   — one shared store of dated events, each tagged at fold with the lenses it moves by the adapter folder's event table,
   so one occupation, conversion, boom or raid moves every lens it touches at one week and the scrub agrees across
   lenses; its **legend** ((6)); its **refusals** ((4)); and its **why** — `lensWhy` answers per mark with the host facts
   it read and the rule that drew it, the sway's `whyCell` generalised. A lens is added by a row and its element
   functions, never by a second mechanism. Its controls — the lens picker (a row per lens in `world.lens`'s order, a
   still lens collapsed, greyed and openable), the scrub bar with its declared gaps, `pinPlate` and the lens-mark card
   that answers `lensWhy` — behave as this section states; V09 hosts and draws them in the world view (BCR-V13-39) and
   decides none of their rows, gates, answers or audiences.
2. **The regime, before the picture.** The legend's first row is the **regime banner**, computed from the regime the
   host resolves and sends with each lens window (`HostRegime`: whether the campaign runs its birth defaults or an
   applied preset, the canon marker, its frozen record's sea-lane, teleport and seasonal slots, each of its lanes lit or
   dark, a deity seated anywhere, a plague live, belief recorded, its intensity) — never from a preset's name, which over-states what a
   born campaign runs. A lens's regime is the first of its regime words (V13 §5.9) whose gate holds; every regime
   word's gate includes its lens's source sent. A window with no regime raises `W_LENS_REGIME_ABSENT`: every banner reads "the host's regime not sent", and a gated element draws only
   the facts actually sent, labelled "regime unknown" — never a regime guessed from the facts.
3. **The honesty rule** (J384 (13)). An element whose gate is false draws as **still**; a lens whose every gate is false,
   or whose regime is its still word, opens in still mode with its banner and its reason in this volume's words ("no creed crosses a border: the host's
   faith spread is off"; "this band has not moved: the campaign runs no prosperity writer"), listed collapsed in the
   lens picker (greyed, openable) — **never hidden and never extrapolated**: no motion, trend, forecast or spread drawn
   beyond the host's facts. **The built bias said:** where a born campaign reads biased by the host's own tables (its
   alignment reading's malicious and belligerent lean, its prosperity's upward ratchet, its small seats that cannot
   grow), the legend says it is the host's arithmetic, not the realm's history. **The author said:** at the host's
   default tuning organic plague is silent and a born world seats no deity, so a lens that shows either shows the DM's
   authoring, and says so.
4. **No invented fact: four classes of host mark, and only four, beside the DM's own world sites.** (a)
   **host-stored** — a fact the host persists, drawn as stored; (b) **host-derived** — a value the host computes by its
   own law on the same window and sends (in the lens window or on request), labelled "by the host's law": the map never
   calls or re-implements a host law, whose own copies already disagree; (c) **placement** — the map's geometry used
   only to place a host fact (a settlement's seat area, W8a, for a uniform fill; a path laid by `pathGeometry` for a
   link's "likely road"; a frozen site's point), labelled where it is a guess — an element of another class so
   positioned is marked `placed`; (d) **owner-ruled map derivation** — the sway and the patrol cadence the owner's
   territory rules asked for, labelled "projection", reaching the host only as offers it may consume and never as its truth. A world site the DM
   placed (V14) is the map's own fact, class `dmPlaced`, labelled "DM-placed". Everything else is **refused** (`refuse.lens.invented`,
   with the refusal's reason): a quantity the host discards (a column's losses on the road, the share of a dispersal it
   loses, a conversion's source it did not send); a field interpolated from point facts; motion without a host clock (a
   caravan between its ends); an effect the host does not apply (a patrol lowering danger, a border stopping a plague,
   migrants carrying a faith); a meaning the host does not compute (a plague as a punishment, a god's region).
5. **Two grammars for movement.** Transfers the host nets within one week draw as **dated links** between the two
   settlements along the host's own links, never along a road; movers the host clocks draw as **moving markers** placed
   by that clock along a placed path; never one grammar for the other.
6. **The legend's words.** **Host vocabulary as data:** the host's band, phase and chip words travel in the adapter
   folder's vocabulary tables, one per lens, drawn as sent; this volume's own strings are its derivation labels, its
   still reasons and its notes. **One word, one meaning** (`world.lens`'s collision rows, as V13 §3.11.6's law (9) is
   for politics): the host's monster-threat word for a place and its colour are never the plague lens's; *gate* is
   written a border crossing, a route's intermediary settlement or a town gate, never bare; *toll* names which of its
   meanings it is; *besieged* is the war's, never a stressor's; *prosperity* is the host's rung only, never its economic
   capacity or a lifecycle's health; *temperament* is never a legend word; *alignment* is the moral reading, never a
   bloc. **Polarity normalised:** every axis the host sends is turned by the adapter folder's polarity table to one
   convention — lawful high, malicious high, lenient high — the table naming each host axis's own sign.
7. **The audience filter** (J-V13.77's rule for every lens). **The DM by default:** every lens opens DM-only; a row
   the host sends with no resolved audience is folded DM-only; covert links, columns and patrols fail closed — omitted,
   never greyed. **A player** sees only the rows the host resolved public and, where the regime records belief, the
   party's believed rows (`LensFacts` of audience `party`); under an omniscient regime the player picture is the public
   truth or nothing. **No player view of alignment** (J384 (7)): the alignment lens refuses every audience but the DM
   (`refuse.lens.audience`), and a party set's alignment rows are dropped at fold; the host's public chips stay where
   the host shows them. **Suppressed creeds and criminal trade DM-only** (J379; J-V13.77's fail-closed rule over the
   host's criminal flags): a party set's suppressed creeds are dropped at fold too, and the host's criminal channels
   and its criminal income never reach a player picture (the income mix is not drawn in this pass).
8. **The time scrub and the plates** (J384 (9)). Every lens draws at the view's `lensWeek` (default the document's week),
   reading, in order: host-dated facts (event weeks; a row's own weeks — an arrival, an onset, a departure, a founding,
   an occupation's start); the sway's revision history (the sway and patrols lenses); **plates** for every fact the host
   keeps no history of (bands, shares, phases, axes, trends); and, before the first plate, the host's own per-advance
   pulse records where it sends them once at first bind (`LensFacts.pulses`: their population deltas and outcome
   severities, at most its 80 advances), labelled with their horizon. A **plate** is written when a lens window folds,
   **one per host advance**: the window's `LensFacts` (both audiences) and its polity facts' seat rungs, delta-coded
   against the previous plate with a whole plate every `plates.keyEvery`, in the world document's plate cache
   (`Document.lensPlates`, BCR-V13-38) —
   outside the model digest, the records digest, the canon and every export's model (V13 §2.7). **The horizon in
   weeks:** full resolution for `plates.fullWeeks` (520) behind the present; older plates compacted to one per
   `plates.compactWeeks` (13), the last plate of each host quarter kept; a plate the DM pins (`pinPlate`, a cache
   command, never an edit) is never compacted, and compaction re-encodes each kept plate against the previous kept plate
   (or whole). A host rewind (a window replace) drops every plate after the rewound window, pinned ones included. Plates
   start at the first advance the map observes, and the scrub declares every gap — before the first plate, beyond what
   the pulse records hold; the interior weeks of a multi-week advance the host did not send; a store the host's quota dropped
   (`W_LENS_PLATE_GAP`) — and replays a decaying quantity only by the host's arithmetic as sent, never by a designed
   curve. A cache: dropping it loses only the scrub's past.

### 5.9 The lenses (J384 (8)'s order; each a row set of V13 §5.8's mechanism)

Each lens below gives its regime words (the first whose gate holds names the regime; the last is its still word), its
elements — *class* **S** host-stored, **D** host-derived, **P** placement, **M** owner-ruled map derivation,
**DM-placed** the DM's own world site; *placed* marks a host fact positioned by map geometry, labelled —, their
audience and scrub, and its refusals — with, under them, the host facts it does not draw in this pass and why, so an
omission is never silent. Every element reads the port's fields (V13 §2.2); every host word comes from the
adapter folder's table for the lens. Three further lenses — culture, danger and calamity — are recorded, not built:
each a later row set of this mechanism, outside J384 (8)'s eight (D-V13.8).

**1. Plague** (J381; the proving lens, first). *Regimes:* **front** (the canon marker set and a plague live: the
host's front walks hop by hop along its trade and shipment links, each hop at its own travel time; on the canon the
host still spreads it within the same week along its migration and service links, drawn as footprint marks beside the
front), **footprint** (a plague live without the canon and the host's same-week spread lit: the host spreads it within
the same week along its links, with no source and no time), **still** (no plague live; or, without the canon, the
host's same-week spread dark: "nothing moves between settlements"). *Notes:* the authorship note of V13 §5.8 (3); "a
border, a march, a patrol or an army neither stops nor slows it: the host's plague reads none of them"; the lens's hue
and words never the monster-threat chip's.

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| phase | `LensFacts.plague[].phase`, `.band` (the host's epidemic ledger, kept on the canon only) | a glyph at the seat in the host's phase words (approaching, active, receding), banded on the host's own edges | S | front | the host's banded fiction public where it so resolves; the truth DM | plate |
| stage | a footprint row's `.stage` and `.severity` as sent | a glyph by the host's stage word, no phase word | S | footprint; front (its same-week joins) | per row | plate |
| hop | `.source`, `.carrier`, `.arrivedWeek`; a plague arrival's `WorldEvent.sourceSeat`; with the host's front history (V13 §8.5's H24), each hop's weeks | a link from the source to the seat, its carrier named only when the host sends one (H24's per-hop receipt), never a carrier guessed; no road implied; captioned "arrived week n" | S | front, while the host names the source | DM; a player the arrival only | host-dated |
| approach | `.onsetWeek` | a ring at the seat with the weeks to onset ("word of plague has reached") | S | front | public where the host so resolves | host-dated |
| receding | `.clearWeek` | the glyph greyed until the week the seat may be struck again | S | front | DM | host-dated |
| next hop | the host's onset and care law, evaluated by the host and sent as `LensLink` weights (each carrier link's chance with the destination's onset chance) | dotted links labelled "projection by the host's law" | D | front, only when sent | DM | plate |
| footprint | `.footprint`, `.severity` | the affected seats as one same-week mark with the host's severity band — no arrow, no time; legend "spread in the same week along links" | S | footprint; front (the same-week joins the host keeps on the canon) | per row | plate |
| consequences | the host's dated regional-impact arrivals (`WorldEvent`s tagged plague) | the host's arrival rings at their weeks | S | front, footprint | DM | host-dated |
| aftermath | the host's echo at the origin (a dated event) | a fading ring at the origin | S | any | DM | host-dated |
| realm arc | the host's named realm arc (a `WorldEvent` with its `seats`) | a dated caption in the lens's timeline and a thin outline on the named seats' marks — never a region | S | any, a plague live | public where the host so resolves | host-dated |
| heard of plague | the party's believed rows | "heard of plague" at the seat | S | beliefs | party | plate |

*Refusals:* a field, gradient or region of disease; an arrow or a time on a footprint; a phase word on a footprint row;
a carrier the host did not send; deaths or losses estimated; a quarantine line; a border, march, patrol, army or
migrant drawn carrying or stopping it; a divine meaning; a merge with the calamity marks; the monster-threat word or
colour. *Not drawn in this pass:* the town's plague condition (a town-map row: the settlement frame draws it among the
dossier conditions it draws, V13 §2.2's knowledge paragraph; a plague arriving through the stressor alone shows
nothing there until H24 closes that gap).

**2. Sway** (the owner's territory: J377, J378, J382; V13 §3.9; second, with patrols). Its layers are V13 §5.1's
`seatTerritory`, `sway`, `occupation`, `debatable` and `fighting`; its scrub is the sway's revision history.
*Regimes:* **enforced** (a polity window carrying force bands: held by force drawn), **civil** (a polity window
without them: held by force only by a host fight verdict's hold band, V13 §3.9 (11) (J386), every other debatable cell
staying debatable, and the legend says the host's military reading is
not yet sent), **provisional** (a host-bound world before its first polity window: each seat projects at its tier with
the middle rung, V13 §3.9's edges, labelled "before the host's first polity window"), **recipe** (a standalone world:
the recipe's seats, links and relations, V13 §3.9 (5)), **still** (no seed: nothing to project). Two banner notes per
window: "the push between adversaries is the host's strength order" or "level: the host's strength order not sent";
"water carries the sway along the host's lanes" or "water bars the sway: the host's lanes are dark".

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| seat territory (diagnostic) | `Territory` (W8a) | thin borders and crossing ticks; legend "the host's own partition: total, no wild land" | P | the canon | DM | changes only at a re-canonize |
| sway | `Sway`, `Allegiance` | fill by allegiance; allegiance and member borders; unclaimed land unfilled | M "projection" | every | DM; V13 §5.1's player picture | revisions |
| debatable, held by force, fighting | `swayStatus`, `debatableSides`, `MarchHold`, raids and verdicts | V13 §5.1's hatches and marks | M | held by force: enforced; civil, by a host verdict's hold band alone (J386) | as the sway | revisions |
| occupation | `PolityLink` occupations at the host's rung | V13 §5.1's hatch on the occupied sway | S, placed | when sent | the host's resolution | revisions |
| tributary, exclave | links, continuity | the band, the halo | M | — | DM for covert links | revisions |
| claims | `claims` (the host's lineage claims) | the DM's claim outline of the target's sway | D, placed | while the host's lineage lane is lit | DM | revisions |
| satellites | `PolityFacts.satellites` | dots at their frozen site points | S, placed | when placed | as the host's | revisions |

Its why is the sway's `whyCell` through `lensWhy` (DM): the candidates, the class, the margins, the host's strength
order, the deciding rule. *Refusals:* the sway handed to the host as its territory; wild land presented as a host fact;
a debatable land drawn as a road hazard; a plague's or a caravan's danger drawn as a border's effect; a vassal's band
added to its overlord's.

**3. Patrols** (J378; second, with the sway). Its layer is V13 §5.1's `patrols`. *Regimes:* **watched** (the host's
road watches sent and drawn first), **derived** (the cadence from garrisons, hostility, grade and the force band only;
the garrison input a proxy until force bands are sent), **still** (no route laid, or no seed).

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| cadence | `PatrolCadence` | tints per segment by cadence, striped on a debatable segment | M "projection" | both | DM; a covert power's DM-only | revisions |
| a road the host closes | `roadWatch` (`closed`) | a closed-segment mark, legend "cut by the DM: the host names no closer and its caravans do not heed it (until H25)" | S | watched | DM | host-dated |
| a warden's term | `roadWatch` (`warden`) | the warden's colour on the segment | S | watched | DM | host-dated |
| a post's sight | `@plat/world/sight` | the post's viewshed on hover | P | — | DM | — |

*Refusals:* a patrol drawn lowering danger or holding a quarantine line; a cadence sent to the host as a time. *Not drawn
in this pass:* the character of a route's intermediary settlements (the host judges a caravan's route at its worst
intermediary and sends no verdict per settlement; drawing one from a settlement's alignment would re-read its law,
V13 §5.8 (4) — a later row, not yet asked of the host); a road's escort quality (the host stores an escort on each
named traveller's mission, banded in its own words — a property of the traveller, not of the road: a later caption on
the named traveller's marker once H23's journey rows carry it).

**4. Trade** (J380; third, with populations). *Regimes:* **loads** (on the canon, supply links carrying their load),
**arrivals** (on the canon, supply links carrying an arrival week only), **relations** (no canon: no supply link runs
between settlements; the channels only), **still** where the host sends no channel ("no goods move between
settlements"; each settlement's own production, need and food coverage still drawn, as V13 §5.8 (3) draws a host fact
in still mode). *Notes:* production, need, exports, imports, services and food coverage are the host's generation
economy as its dossier judges it at its last survey (J380's "imports, exports, production, consumption, of goods and
services"), drawn under every regime and never moved; "food never ships and a service never moves: the host's
caravans carry neither"; a good is the host's catalog key as its supply links key it, never its label — the host
reads one good under several labels, each kept on the good's card, and a service export it ships as a good is a good
here.

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| production and need | `.economy[].produces`, `.needs`, `.exports`, `.imports`, `.services` (each a `LensGood` as the host sends it — its key, label, category and shippable flag —, its words through the adapter folder's goods table) | a glyph at the seat by category — shippable goods, food (marked "never ships") and services (marked "never moves") drawn apart —, the glyph by the key, its card and caption the host's label, a key the host reached only by its loose reading marked "as the host's caravans read it"; its exports and imports as the seat's out and in lists, a transit good marked; no link, route or mover between settlements | S | every (still included) | public where the host's dossier shows it | plate |
| food coverage | `.economy[].foodCoverage` | a ring at the seat filled to the host's covered share of its food deficit, labelled "by the host's law", kept at its surveyed share while a cut is in force; the cut marked with the stressor's own word, apart from the war's siege mark | D | every (still included) | public where the host's dossier shows it | plate |
| channels | `LensFacts.links` of the trade lens | dated links styled as relations by kind and status (each from its `since` week when the host sends one), no road implied | S | every | per channel visibility | plate; host-dated where a week is sent |
| supply arrival | `.arrivals` | a dated glyph at the consumer with a link from its source, "arrived week n", captioned with its good (`.good`) where the host sends it and with none guessed where not, the load when sent | S | arrivals, loads | DM | host-dated |
| stocks and throughput | `.economy[].stocks`, `.throughput` | the host's stock band word per good at the seat and its inbound and outbound throughput words | S | loads | the seat's own bands public where the host so resolves; DM else | plate |
| entrepôt heat | `.economy[].entrepot` | a heat mark at the route's intermediary settlement by its stored centrality, with its entrepôt toll (a route cost: no goods taken, no coin moved) and its since week where the host holds one | S | loads | DM; a founded transshipment institution public where the host so resolves | plate |
| likely road | `pathGeometry` over the host's edges | a route flow labelled "likely road" | P | arrivals, loads, on the DM's request | DM | — |
| named traveller | `.journeys` (the frozen settlement path and its leg clock) | a moving marker at its leg's fraction of the leg's weeks along that leg's laid path | S, placed | when sent | DM unless resolved public | host-dated |
| trade war | dated events and channels | the prize glyph and the primacy link | S | the war lane | public | host-dated |
| relief and credit | dated events at the receiver, the giver as `sourceSeat` where sent | a dated link giver → receiver, instant and relational — never a shipment, and no link where the host names no giver | S | when the host's relief lane runs | the headline public where the host so resolves | host-dated |
| cut and chartered roads | the DM's road events | marks, legend as the patrols lens's | S | — | DM | host-dated |

*Refusals:* a caravan drawn between its ends without a host clock; food, service or channel "flows": a food good or a
catalog service drawn moving, on a route, a mover or a link styled as a shipment (a relation that names one — a
per-good trade link, a channel's goods, a relief — stays a relation, marked "does not ship"); a good keyed by its
label rather than the host's key; a supply link's good guessed; a criminal channel or the host's criminal income on a
player picture; a realm market or a price field. *Not drawn in this pass:* seizures at a route's worst intermediary
settlement (the host keeps them as no dated fact — they wait on H26's dated rows); the war lane's staged supply plans
(DM-only, dark in the default preset: a later row, not yet asked of the host); the income mix (a dossier card's
revenue rows, not a mark; the criminal rows the host flags the DM's once drawn).

**5. Populations** (J380; third, with trade). *Regimes:* **columns** (on the canon: refugees and emigrants travel as
columns with departure and arrival weeks), **netted** (no canon: people move between settlements as same-week
transfers); still where neither moves. *Notes:* where the host's resolved regime runs its conservative intensity (its
birth defaults and the default preset among others), the built bias of V13 §5.8 (3): "small seats here hold their
head count by the host's own arithmetic: below about a thousand people only a transfer, a promotion, or an influx,
recovery or crisis condition while it stands moves it".

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| size | the tier label; `.sizes` for the head count | a glyph by tier label | S | every | the label public; numbers DM | plate |
| trend | `.trend` | an arrow by the sign of the host's recent deltas, labelled "by the host's law" | D | every | DM; the party's believed trend where beliefs | plate |
| transfers | `.transfers` | dated links along the host's links, styled by kind | S | netted (and beside columns where the host serves both) | DM | host-dated |
| columns | `.columns` | a moving marker from its departure week toward its arrival along a likely road (labelled), styled by carriage where the host sends it — road; sea along the water lane's laid path; teleport a dashed arc with no path (the host's column between its two ends, never a teleport link of the map's: §1.4's circle marks stay linkless) — and where it does not, by the host's endpoint test (an end at a port or a circle holder), labelled "likely carriage"; port and teleport columns included, which the host's own overlay hides (J384 (12)) | S, placed | columns | DM-only by default | host-dated |
| satellites | `PolityFacts.satellites` | dots at their frozen site points | S, placed | when placed | as the host's | revisions |
| ruins and resettlement | dated events | a dimmed glyph; donor links legended "the realm's richest" | S | — | DM | host-dated |

*Refusals:* losses on the road or a column's toll estimated; the share of a dispersal the host loses; migrants drawn
carrying a faith or a plague; a column's carriage presented as the host's when it did not send one; a density field.
*Not drawn in this pass:* population pressure (the host measures a seat against its bound only in its dark
demographics lane — a value it does not hold while that lane is dark; its pressure index is nine social pressures,
food, disease, conflict and the rest, each scored with no band word, none of them a population's); the founding
ground and the settlement bound (the same lane, dark in every preset today: a later row once the host lights it).

**6. Religion** (J379, J380; fourth). Drawn in this order: **the host's own religious hierarchy first** (superior →
member links; its pilgrimage-centre, religious-superior and holy-site labels at their settlements), then the mixtures,
the pressure and the events. *Regimes:* **spread** (a deity seated and the host's faith spread lit; attenuated by
distance on the canon), **seated** (deities seated, spread dark: "pantheons still: no creed crosses a border (a
patron's moral prescription and a fracture's unrest still do)"), **none** (no deity seated anywhere: "a creed exists
only once the DM seats one" — a born world holds none).

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| hierarchy and places | `.hierarchy`, `.faithPlaces` (the host's derivation of its authored faith-place links) | links and labels at settlement grain | D | every | as the host's | plate |
| global rank | `.realmRank` (the host's realm ranking: tier, patron seats, wins, losses) | the legend's deity list in the host's tier order, highest first, then by patron seats, most first, ties by the deity key ascending, each with its seats, wins and losses; a deity's colour the same in every mark of the lens | S | seated, spread | public where the host's allowlist has it | plate |
| mixture | `.faith[].shares` (each deity's share with its local standing), `.patron` | a ring at the seat in its shares (Σ 100), each share with its local standing in the host's words; the patron's colour filling the seat's area uniformly, labelled "this settlement's patron over its seat area" | S, placed | spread, seated | public where the host has embedded the pantheon; DM else | plate |
| piety and contest | `.piety`, `.contested` | marks at the seat | S | spread, seated | DM | plate |
| suppressed creeds | `.faith[].suppressed` (the DM's set only) | the suppressed deities listed at the seat, greyed and labelled "suppressed" | S | spread, seated | DM-only: never a party set, never a player picture | plate |
| ruler and people at odds | `.rulerDiffers`, sent by the host | a mark at the seat, labelled "by the host's law" | D | spread, seated | DM | plate |
| pressure | `LensFacts.links` of the religion lens, with the host's weight | links by carrier kind (alliance, trade, patronage, vassalage, a war front — hostility carries hardest — a garrison, an authority), labelled "pressure by the host's law" | D | spread, only when sent | DM | plate |
| prescription | `LensFacts.links` of the religion lens of the prescription kind, with the host's weight (a seated patron pressing the moral institutions of carrier-linked neighbours) | links presser → target, labelled "pressure by the host's law" | D | seated, spread (the host's institution lane lit) | DM | plate |
| institution abolished or founded | dated events (the target; its presser when sent) | a dated glyph at the target, a link from its presser only when sent | S | seated, spread | the headline public where the host so resolves | host-dated |
| historic front | the same links, of the front kind | a link styled "historic front" (the host never retires one) | S | spread | DM; never on a published map | plate |
| conversion | a dated event | a glyph at the convert; a link from its source only when the host sends one | S | seated (local), spread | the headline public where the host so resolves | host-dated |
| patron fall | a dated event of the fall kind (its `deity` and `cause`) | a dated glyph at the seat with the cause, the fallen deity greyed | S | where the host's unseating lane runs | as the host resolves; DM where unresolved | host-dated |
| rank arc | the host's realm arcs of a deity's tier — reaching the top tier, falling to the lowest and, where its unseating lane runs, losing its last seat (no tier crossing) — in the host's arc words (dated events with their `deity`; they name no seat) | a dated caption in the lens's timeline and a thin outline on the seats the plates show the deity holding as patron at that week, labelled "its patron seats at that week" — none for a last seat — never a region | S | seated, spread | public where the host so resolves | host-dated |
| rite adoption | `.rites` of the adopted kind (its origin, the host's year); a dated event at the adopter, its origin as `sourceSeat`, once the host sends its week (H23) | a link origin → adopter captioned "in year n" | S | where the host's rite lanes run on the canon | DM | host-dated once the host sends the week; until then plate — drawn from the first plate that holds it, captioned with the host's year, never a week the host did not send |
| imposed rite | `.rites` of the imposed kind (its overlord as origin, the host's year); a dated event at the vassal — the host's imposition incident, or the week H23 asks for — where sent | a link overlord → vassal captioned "in year n", the rite's deity kept | S | the war lane | public where the host so resolves (its imposition incident is public); DM else | host-dated where the host sends the imposition's week; else as rite adoption |
| fracture | `.fracture` (the host's conversion-fracture stressor: its affected seats and severities) and its parked arrivals (dated events) | a same-week footprint; arrival rings | S | every, its same-week spread lit | DM | plate; arrivals host-dated |
| crisis disorder | `.faith[].disorder` | shading at the seat, labelled "by the host's law" | D | spread, seated | DM | plate |
| holy and hidden cult sites | V14's cards with a `devotion` (V14 §2.2) | the site's mark in its deity's colour, labelled "DM-placed" | DM-placed | every | DM-only by default (a hidden cult site until the DM reveals it) | the card's dates |
| believed faith | the party's believed rows | the believed label | S | beliefs | party | plate |
| realm piety | `.realmPiety` | a legend figure | S | spread | DM | plate |
| pilgrim catchment | `.catchments` (a grand rite's seat and the seats its draw read, its act word and its deity where it has one, as the host's law computes them) | a catchment: the rite's seat ringed and joined to each member seat, labelled "a grand rite's draw by the host's law" with the rite's act word — a market fair's as much as a procession's —, in its deity's colour only where the rite has one; the set as sent, never recomputed, and no pilgrim drawn along it | D | when sent (the canon, the host's rite lane) | DM | plate |

*Refusals:* a sea carrier (J382 (c)); pilgrims, missionaries or inquisitors drawn as movers; a holy place or cult site
the map generates or positions; a god's region or a border of faith; arrows from plague to conversion; a conversion's
source the host did not send; a latent deity named; suppressed creeds shown to players or kept in a party set; a
deity ranked by shares or adherents (the host ranks by patron seats only); a catchment the map computes, or coloured by
a deity its rite does not have; realm piety or movement where
the host's lane is dark.

**7. Prosperity** (J380; fifth). *Regimes:* **booming** (on the canon with the host's booms lit), **moving** (its
festival and purchase writers lit), **frozen** ("this band has not moved: the campaign runs no prosperity writer").
*Note (the upward drift):* where its writers are lit the host's band drifts upward realm-wide — the host's ratchet, not
the realm's history; the sway reads it relative to the realm's median (V13 §3.9 (7)).

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| the rung | `PolitySeat.prosperity`; the plates' rungs | a glyph in the host's band words, and the seat's area filled uniformly, labelled "this settlement's band over its seat area" | S, placed | every | public (the host prints the word); the party's believed band where beliefs | plate |
| boom and bust | dated events (mint, bust, the arteries when sent) | a dated marker; artery links ("fragile" under two) | S | booming | public at mint and bust | host-dated |
| festival stopped | dated events with their source | a mark linked to the overlord or raider | S | moving | DM | host-dated |
| purchases and ransoms | dated events | dated links | S | moving | the headline public | host-dated |
| donors | dated events | links legended "the realm's richest" | S | moving | DM | host-dated |
| a band's cause | the host's band-change receipt (V13 §8.5's H29) | the cause on the glyph | S | when sent | DM | host-dated |

*Refusals:* a wealth field, gradient or "hinterland wealth"; a cause for a band the host did not send; the economic
capacity or a lifecycle's health drawn as prosperity. *Not drawn in this pass:* the pilgrim catchment (one host fact,
drawn once, by the religion lens) and its lift (no row the host sends); the through-route mark (the entrepôt centrality a boom reads, drawn once,
by the trade lens's entrepôt heat); the district wealth word (a town-map row: the settlement frame's).

**8. Alignment** (J380; fifth; **DM-only**, J384 (7)). *Regimes:* **lived** (the host's reading sent, and a deity,
deeds or a war add their terms), **born** (the host's reading sent, resting on archetype, roster and legitimacy only),
**still** (the host sends no alignment reading, until V13 §8.5's H30). *Notes:* the polarity of V13 §5.8 (6); the
born-world bias ("on a born world the host's tables lean malicious and belligerent: a fill centred on the middle looks
tilted on every born world — the host's vocabulary, not the realm's history").

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| the two axes | `.alignment[].law`, `.malice` | a two-way fill over the seat's area, labelled "by the host's law" | D, placed | lived, born | DM | plate |
| aggression | `.aggression` | a glyph in the host's chip words, labelled "by the host's law"; none in its neutral band | D | lived, born | DM in the lens | plate |
| causes | `.causes` | a card of the host's named causes, labelled "by the host's law" | D | when sent | DM | plate |
| tolerance pull | `LensFacts.links` of the alignment lens of the tolerance kind | a link partner → seat, with no week (the host keeps none) | S | a deity seated | DM | plate |
| quadrant posture | `LensFacts.links` of the alignment lens of the posture kind (the host's class for a pair of patrons, by their good and evil only) | a link between two seats that both hold a patron, styled by the host's class word — three classes, the legend noting "the host's fourth class, a schism between kin, is never reached: a shared patron always reads kindred" —, labelled "by the host's law" | D | a deity seated, when sent | DM | plate |
| reckonings | dated events (actor, victim, week) | dated links actor → victim | S | when the host runs them | DM | host-dated |

*Refusals:* any player view (`refuse.lens.audience`); a believed alignment (the host keeps none); alignment flowing
between settlements; a map-side re-reading of the host's alignment. *Not drawn in this pass:* the character of a
route's intermediary settlements (as the patrols lens's: no verdict per settlement is sent); the town grain (a
town-map row: the settlement frame's).

## 6 Performance budgets (§12's form)

**Reference hardware and method** are §12.1's; the measure is the generation worker's wall clock at p95 over five seeds
per rung, nightly, with the work-limit laws of V13 §3.17 as the fitted measures (§13.2's cost-model test: log-log slope
≤ 1.15 for the raster stages (linear in cells) and ≤ 1.25 for W4, W7 and W8 (n log n in the queue)).

**The world's one-click path** (a `generate` with a `WorldRecipe`; the budgets are the size rows' `budgetMs`):

| stage | work measure | province (1.02 M fine, 16 k coarse) | realm (4.1 M / 64 k) | continent (9.2 M / 144 k) | law (p95) |
|---|---|---|---|---|---|
| W0 | ops | 1 ms | 1 ms | 2 ms | ≤ 2 ms |
| W1 | Σ (op cost × touched cells), the costs V13 §2.3's (`continent` template: one 6-octave `noise` = 12 units, two `range` = 4, three `hill` = 3, one `smooth` of one pass = 3, one `mask` = 1 — 23 units over the extent; C13-10) | 350 ms | 1 400 ms | 3 170 ms | ≤ 15 ns × Σ (op cost × touched cells) |
| W2 | fine cells | 25 ms | 100 ms | 230 ms | ≤ 25 ns × cells |
| W3 | passes × coarse cells | 4 ms | 16 ms | 36 ms | ≤ 30 ns × 8 × cells |
| W4 | fine cells × log | 180 ms | 760 ms | 1 800 ms | ≤ 10 ns × 12 × cells × (1 + log₂ cells ÷ 24) |
| W5 | fine cells | 20 ms | 80 ms | 180 ms | ≤ 20 ns × cells |
| W6a + W6b | fine cells + candidates × retries | 30 ms | 120 ms | 270 ms | ≤ 25 ns × cells + 2 µs × candidates |
| W7a + W7b | Σ over edges of the search ellipse's cells (A\*, V13 §3.8; C13-36) | 60 ms | 200 ms | 520 ms | ≤ 8 ns × Σ ellipse cells over edges (an edge's ellipse ≈ 2.4 × the pair's straight cost² ÷ the cell area at `maxCostFactor` 6; 300 edges at the continent rung ≈ 6 × 10⁷ cells) |
| W8a + W8b | coarse cells (W8a); Σ cap-disc fine cells (W8b) | 50 ms | 200 ms | 450 ms | W8a ≤ 30 ns × coarse cells × log; W8b ≤ 12 ns × 4 × the cap discs' cells — the row replaces W8's, not added to it |
| W9 | names + glyphs | 10 ms | 20 ms | 40 ms | ≤ 0.2 ms × names + 2 ms × glyphs |
| **total** | | **730 ms** (budget 600: **over** — the province row's budget is re-declared at 900 ms, V13 §2.3's cell is data) | **2 900 ms** (budget 1 800: **over** — re-declared at 3 000 ms) | **6 700 ms** (budget 4 500: **over** — re-declared at 7 000 ms) | |

The honest re-costing (C13-10) puts every rung over its first budget by W1's noise alone: the size rows' `budgetMs`
are re-declared at 900 / 3 000 / 7 000 ms (PLAUSIBLE until SP-W1 and SP-W6 measure), the realm rung the declared
target (`realm` is the campaign's default); the pre-decided fallback is the noise op's cap — the `continent` template's
noise at 4 octaves (8 units: −1 100 ms at the continent rung), the finer octaves added only inside a placed frame's
margin by S1's position-keyed lattice (V13 §3.11.4) — which brings the continent to ≈ 5 600 ms. A world past one
second shows §12.1's progress strip per stage. **Memory** (§12.8's counting; C13-11): the fine rasters at the
continent rung — dem Int32 37 MB, flowAccum Uint32 37 MB, flowDir Uint8 9 MB, flatRank Uint32 37 MB, watershed Uint32
37 MB, landmass Uint32 37 MB, discharge Float32 37 MB, biome/landUse/vegetation/habitability Uint8 37 MB, territory
Uint32 37 MB, culture Uint16 18 MB, table Int32 37 MB — 360 MB with every array resident, which is over §12.8's one
stated line (METROPOLIS ≤ 260 MB) and has no world line of its own; so (1) BCR-V13-14 requests a **world line** for
§12.8 (a `world` document's working set ≤ 300 MB on the high tier; the continent rung refused below it, J-V13.12 kept),
and (2) the two distance fields are computed on demand per query (never resident, −74 MB), `landmass` and `territory`
drop to Uint16 with a per-world id table (−37 MB), `discharge` is kept only on reach course cells as a sparse map
(−35 MB), and `flatRank` is dropped after W4 (−37 MB): **≈ 285 MB resident during W4, ≈ 180 MB after** — inside the
requested line; `WORLD-5` reads 285 MB. The document on disk: ≤ the size row's `docMb` (24 MB gzipped at the
continent rung, V13 §2.7).

**Edits** (§12.6's form: cost as a function of scope, flat across rungs): a `worldRecipe` op over a 50 km disc at any
rung ≤ 120 ms (W1 over the touched cells + the cascade over one watershed + W5–W9 over the dirty set); a `setSurface`
on a lake ≤ 60 ms; a sea-level change ≤ the full W4 + W5–W9 (declared whole-world); a placement edit (settlement-first,
a CITY frame) ≤ 250 ms: P1 ≤ 40 ms (360 bearings × the edge ring's 400 stations × 6 terms, integer, the frame's
profile sampled once), `nearestLawful` ≤ 600 ms by its two tiers (C13-37: the coarse pass of ~200 origins × 36 bearings
× 100 stations × 2 index lookups ≈ 1.4 × 10⁶ evaluations ≈ 150 ms; the fine pass over the three best pairs ≈ 3 × 40 ms;
shown as a progress strip), P2 ≤ 30 ms, P3 ≤ 120 ms (one watershed), P4 ≤ 10 ms, P5 ≤ 20 ms, the glyph ≤ 30 ms; a
`requestCharter` ≤ 30 ms; `worldWins` is the frame's Re-derive from S1 (§12.6's budget) + 150 ms; a flood spread on the
height raster ≤ 25 ns × the raster's cells (≤ 60 ms at METROPOLIS, C13-12); **a transient `charterFor`** for a 100 m
crop frame ≤ 10 ms (P4's cost; `WORLD-9`, SW-05); **a caller's score pass** (V14's G3, the host's `proposals`) ≤ W6a's
law over the disc asked — ≤ 230 ms over a continent, ≤ 30 ms over a 100 km disc (`WORLD-10`, SW-32).

**The frame's additions on the one-click path** (§12.3's laws unchanged — C13-09: the constants are **not** raised):
the surface step ≤ 3 ms and the groundwater step ≤ 30 ms at the METROPOLIS hydro grid (C13-54: the base measured the
flood, flats, D8 and accumulation together at 25–27 ms there and the Dijkstra shares the flood's queue) are budgeted
**inside S1's row** of §12.4; the water class test (≤ 10 µs per unit) runs in the tail with V04's elements, not on the
one-click path; reason records are per record and per chunk (≤ 1 µs each, allocation only). If M-W4's measurement puts
S1's row over its law, the pre-decided change is §12.3's own (the pooled law re-declared as a D-18 amendment), named in
`WORLD-4`'s register row — never a raise declared before the measurement; SP-W5's lazy-first-read fallback (the
groundwater step deferred to the first `waterTableAt`) is pre-decided for the low tier. A placement's derived readings
cost nothing on the frame (they are reads); the anomaly list ≤ 5 ms.

**The view**: the world's first frame at stop 0 ≤ 400 ms at the continent rung (the raster layers as one tile set
of 16 tiles, the vector layers simplified at the stop's tolerance), pan and zoom at §12.5's frame budget, the glyph
layer ≤ 2 ms per 100 glyphs; the exports: `ecosystemJson` at the continent rung ≤ 2 s (≤ 100 k cells), `heightmap16` ≤
1.5 s, `ecosystemGeoJson` ≤ 2 s, `worldCsv` ≤ 1 s — all on the export worker, never the generation worker.

**The budget register** (§12.10's form, the world's rows): `WORLD-1` the one-click totals above per rung (900 / 3 000
/ 7 000 ms; the noise cap pre-decided); `WORLD-2` the placement edit ≤ 250 ms; `WORLD-3` `nearestLawful` ≤ 600 ms;
`WORLD-4` the frame's additions inside S1's §12.4 row (the groundwater step ≤ 30 ms at METROPOLIS; the pooled-law
amendment pre-decided); `WORLD-5` memory ≤ 285 MB resident at the continent rung (the §12.8 world line requested);
`WORLD-6` the document ≤ the size row's `docMb`;
`WORLD-7` the cascade at a frame ≤ 1.5 × S1's water operator's budget (§12.6) for the same scope; `WORLD-8` the world's
first frame ≤ 400 ms; `WORLD-9` a transient `charterFor` ≤ 10 ms; `WORLD-10` a caller's score pass ≤ W6a's law over
its disc; `WORLD-11` a one-seat sway revision ≤ 60 ms at the realm rung and a whole-world W8b ≤ 450 ms at the continent
rung; `WORLD-12` the `canon` at the continent rung ≤ 2 s (coarse flood, refined crossings, the water and sites slots;
PLAUSIBLE until SP-W8); `WORLD-13` the sway's store (a Uint16 raster with an id table, a Uint8 status, keyframes every
`retention.keyframeEvery` revisions, sparse traces between) inside `docMb` after a 300-year run of B-WORLD-lite under
B-POLITY (V13 §7); `WORLD-14` the lens plate store ≤ `plates.storeMbGz` (4 MB gzipped at the realm rung) after a
300-year run of B-WORLD-lite under B-POLITY with a lens window per advance — outside `docMb`, a cache the host's quota
may drop — and a plate's fold ≤ 20 ms; `WORLD-15` a lens drawn at a scrub week ≤ 60 ms at the realm rung (the nearest
whole plate and its deltas decoded, the marks laid) and one scrub step ≤ 120 ms. Each has its T-V13 row in §7.

## 7 Tests and acceptance bars

Every test is a `T-V13-n` row of §13's suites (BCR-V13-15 adds them to §13.2's families); the fixtures are our own
(`fixtures/world/*.json`: synthetic recipes, a synthetic ecosystem-shaped JSON made by our script, three frame documents
from B-CITY-lite seeds), never a captured map. The corpus for the sweeps is **B-WORLD**: 200 seeds × the three rungs ×
the six templates, seed i `H32("bworld/<rung>/<template>/<i>")` by V12 §2.4's collision rule, B-WORLD-lite its first
10 per rung in the PR tier. **B-POLITY** drives the polity sweeps: a seeded scripted host — T-V13-37's mock host
extended — emitting 15 600 weekly `PolityFacts` windows (300 years) over B-WORLD-lite's seeds, with foundings, tier
steps, prosperity booms and busts, vassalage, wars, occupations, sales and razings at declared rates, its script
versioned with the fixtures; the polity cells of V13 §2.3, `WORLD-13` and T-V13-41 (d) and (n) are measured on
B-WORLD-lite under B-POLITY. B-POLITY is extended with a lens window per advance (plague, faith, realm-rank,
economy, columns, journeys and alignment rows at declared rates; a birth-defaults regime and a canon regime), and the
lens fixtures T-V13-47 – T-V13-56 name (the lens, all-dark, birth-defaults, audience, polarity, plague, movement, faith
and trade fixtures) are our own,
in `fixtures/world/`.

### 7.1 Determinism, identity, ladders

| id | what it asserts | how |
|---|---|---|
| T-V13-1 | a world generated twice from one `Recipe.world` is byte-identical per stage on every §13.2 platform, workers on and off; the comparator lint finds no draw inside a sort key in `@plat/world` (C13-51) | per-stage digests over B-WORLD-lite; the lint in CI |
| T-V13-2 (bar 3) | a placement positions an arena set in the world; every placement edit (`requestCharter`, `bindPlacement`, `placeFrame`, `setPlacement`, `mirrorFrame`, `unplaceFrame`) leaves the frame's **model digest byte-equal** — no arena, no `Terrain.datumCm`, no `Terrain.wind`, no model-side sun moves — and only the records digest differs, by the frame's `charter` event (C13-01, C13-40) | the frame's model digest before and after every placement edit, byte-compared; `datumOf`, `windOf` and `sunAt` asserted to change their answer without any frame field changing |
| T-V13-3 | F-WORLD's recipe ladder: a missing pinned table, an unknown op, an out-of-range parameter each take their rung and report | fixtures per rung; the report's codes |
| T-V13-5 | the edge worlds: all water, one land cell, one flat plateau, a world at ±`reliefLimitM` — every stage completes, the reports carry the right codes, no abort | the four fixtures |
| T-V13-10 (bar 10) | the clerk answers `why`, `whatCaused`, `whatChanged`, `whatIf` for a reach, a surface, a placement, a territory, a flooded unit and **a cell fact** (a biome cell through `whyCell`, C13-07) from reason chains alone; a fact whose reason is deleted in the fixture makes the chain test fail | the four readers over a B-WORLD-lite world with one placed frame; the deletion case asserts the "chain incomplete" answer and a failing CI row |
| T-V13-15 | the stage-end invariants: every land cell has a `flowDir` or a `flatRank`; `flowAccum` is monotone along D8 paths; every reach's discharge is non-decreasing downstream; no lake's spill cell is below its surface; every territory cell belongs to one territory; every route's polyline stays on land cells on land legs; every placement's extent lies inside the world | §5.3's suite over B-WORLD, hard = 0 |
| T-V13-25 | the cascade at the same log position gives the same digest in session and in replay; op-order permutation of a cascade's batches gives the same result | B-EDIT sequences over a frame and a world |
| T-V13-30 | (a) the namespace segment: two worlds with one placed frame each merged into one package have no address collision; (b) every record of V13 §2.5 keeps its address across a Regenerate (keep settings) and a `worldRecipe` op outside its watershed (bar 7's world half; the site half is V14's) | the merge fixture; the address diff |
| T-V13-31 | V13 §3.18's ten edge cases, each one test | fixtures |
| T-V13-32 | the clean-room lint: no file under `@plat/world`, `@plat/port/world` (outside the adapter folder's `schema.json`, V13 §3.15) or `@plat/export` contains a string from the reference's identifier list (§17.1's lint list, extended with the world's reserved words) | §14's lint, CI |

### 7.2 Hydrology and water state

| id | what it asserts | how |
|---|---|---|
| T-V13-4 (bar 4) | the sea level rises one metre (`setSurface` on the sea, both verbs): the heightfield is byte-identical (the DEM and `carveDeltaCm`); only surfaces, water classes, outfalls, crossings and the consumers of V13 §3.14.2 change; every change carries a reason the clerk reads naming the edit | a frame and a world fixture; the DEM digest; the change list against a golden |
| T-V13-6 (bar 5) | a reach is re-routed from the uncarved ground (`rerouteReach` / `moveCourseKnot` under `happened`): the new bed is traced on `preCarveHeightAt`, the old bed remains as a `TerrainTrace` (`oldBed`) with its cause (the event), the old carve delta is restored under it, the view's trace layer draws it, `whatChanged` names it | the frame fixture with a river; the trace's cells against the former course |
| T-V13-8 (bar 12's classifier clause; bar 12's owner is V14's T-V14-12) | one `classifyWater` over a crypt (underground: the table, a passage to the river), a site level under a `site` surface reached through a vertical link (SW-06), a drowned ruin (storeys with the damage layer's height), a flooded street (route class) and a plot (share): the classes follow V13 §3.13.2's table at every threshold boundary (±1 cm), and change under a dated surface with no identity changing | a V04 fixture with four units; the surfaces stepped through every class |
| T-V13-13 | the charter honoured, in the world-first order `requestCharter` → `generate` → `bindPlacement` → the glyph (C13-04): a frame generated from a charter meets the edge profile within `edgeRmsRefCm`, every `in` crossing enters at its station ± `riverMatchM` with its width within 10 % of the charter's and the accumulation at the inlet equal to the seed (C13-14), every `out` crossing leaves, the sea sits at its level, the frame's shore lies within one hydro cell of the world's inside the extent (the Hausdorff bar, C13-13), the table at the margin equals the charter's; the same charter and seed twice give the same frame (the deterministic refinement rule); two neighbouring frames with overlapping margins agree within 1 cm in the shared margin (C13-05; marked expected-fail until BCR-V13-29 lands); a changed charter (`worldWins`) gives a Re-derive from S1 whose locks and drawn constraints are kept; **on a settlement-first placed frame, Regenerate (keep settings) is byte-identical to the same action before the placement** (C13-03); a dossier-bound frame's `requestCharter` at a contradicting origin is refused with `refuse.charter.dossier` (C13-08) | the world-first fixture; the two-frame fixture; the settlement-first fixture; the dossier fixture |
| T-V13-21 (bar 13) | the eighteen model-drift rows of V13 §3.14.3's table: for each, the equivalent edit is made and the row's assertion holds (the recomputing stages ran, the values changed as the law says, nothing outside the dirty set moved) | one test per row, in the PR tier (BCR-V13-15); a row whose assertion fails names the drift it reproduces |
| T-V13-21b | the cascade's twenty consumers (V13 §3.14.3's second list): each re-reads after a surface edit's cascade and its value changes as the law says | one test per consumer; a reader whose value is unchanged after a change that must move it fails |
| T-V13-22 | F-GW: a frame with no water and no charter takes the deep dry table and reports; a charter with a short `waterTable` grid reads the nearest covered cell and reports; the perched table on `impermeable` stands at `perchDepthCm` | three fixtures |
| T-V13-33 | the flood spread with barriers on the height raster: a dyke **lying inside one hydro cell** and higher than the stage stops the spread (C13-12); one lower is overtopped and named in `overtopped`; the seasonal pair derives from the bankfull depth; an event stage is a dated surface | the frame fixture with a dyke and a quay |
| T-V13-34 | the groundwater field's law: the table at a cell equals the nearest source's elevation plus the gradient × distance within one cm on a fixture with uniform geology and precipitation; the permeability factors scale it; springs appear where the table meets the ground and are thinned to `springSpacingM` | an analytic fixture |
| T-V13-35 | the hydraulic geometry and discharge: a reach of known upstream area and precipitation carries `runoffShare` × (P − E) × area within 1 %; its width and depth follow the law's cells | an analytic fixture |

### 7.3 Placement, glyphs, ports, orientation

| id | what it asserts | how |
|---|---|---|
| T-V13-7 (bar 9) | every dependency arrow has one owner: `@plat/world` imports nothing from `@plat/site`, `@plat/layout`, `@plat/plots` or `@plat/content` (the glyph's marks are the frame's, C13-35); `@plat/site` imports `@plat/world/hydro`, `@plat/world/groundwater` and `@plat/world/water` only; the port is one-way per message (no `WorldPort` method takes a host fact as a write into the map except the recorded inputs of V13 §3.11.6 — `bindSeat`, `unbindSeat`, `importSeats`, `costLaw`, `travelLaw`, `hostRequires`, `genesis`, `network`, `polity`, `events`, `canonized`, `consumed` — each under its manifest's key list; the presentation inputs write nothing; no political, overlay, lived-route or belief input reaches a `canon` slot); no map-side write reaches a dossier fact except through the port as a derived fact; no stage (W0–W9, P1–P5), the sway's revision, V14's encounter crop or the clerk imports `@plat/world/lens` (J-V13.90) | §14's dependency lint; a test that greps the port's surface |
| T-V13-11 | the glyph: each level's marks are the frame's `glyphOf` marks through `toWorld` within the row's tolerance; a click on a glyph opens the frame as another page and the world keeps its stop and centre; a stale glyph is re-made on the frame's commit hook when a wall, way, district or water body of the glyph's kinds changes and not otherwise; **a re-make leaves the world's model digest byte-equal** (C13-21) | the placed frame; a commit that moves a plot (no re-make) and one that adds a gate (re-make); the digest before and after |
| T-V13-12 | the orientation-dependent terms: after a bearing change the sun's azimuth in frame terms, the wind bearing, the sea side and the river directions equal the world's turned by the bearing (mirrored: reflected); the compass rose turns; the arenas are unchanged (T-V13-2); each locked anomaly kind is reported on its fixture | four fixtures, one per anomaly kind |
| T-V13-14 | F-WORLD's siting, path and seat rungs: a world where no candidate scores places the best cell and reports; two seats on separate landmasses without ports stay unjoined; a seat on water moves to land | three fixtures |
| T-V13-23 | F-PLACE: a frame larger than the world is refused naming the rung; an unlawful placement keeps the asked one and offers three; an extent overlap is refused and accepted with the warning while a margin overlap is admitted; `nearestLawful` returns placements whose cost ≤ `lawfulMax` sorted by cost then distance; **no placement with a coast-side error is ever `lawful`** (C13-26) | the placement fixtures |
| T-V13-24 | the blend: after P2 the DEM inside the frame equals the frame's dem re-based within 1 cm, the band's weights are the smoothstep, the band's former values are an `oldGround` trace, the edge RMS is re-measured and reported; the band widens by the rule when the RMS exceeds the reference and the residual is reported; a dossier event changing a placed frame's relief (the host's labelled re-terrain) re-runs P1's bearing search at the fixed origin and then P2–P3, logged as a dated re-blend whose cause is the event, the origin unmoved under `hostLocked` (V13 §3.11.5) | the settlement-first fixture; a world-stamped fixture with a re-terrain event |
| T-V13-36 | P3: after a settlement-first placement, the world's D8 inside the dirty set agrees with the blended DEM, reach ids are kept by anchor, downstream discharge is propagated, nothing outside the dirty set changed | the digest of cells outside the set |
| T-V13-37 | the port: `canon` is whole or refused, its travel slot byte-identical across every sway revision, death, resettlement and satellite founding and across permuted inputs, with no float, prose, raster index or echo of a host fact (a schema lint); its version vector moves only the slot whose inputs moved; two builders of the host's record agree on one fixture in two forms (ids, crossings, costs, all-pairs costs, tiers); every row names a host key; a land road and a water leg between one pair keep two ids and a re-grade keeps the id; a phantom key is skipped, never a seat; `derivedFacts` returns the settlement map record with no arena field; `charter(world, campaign)` is a `requestCharter` whose charter equals `charterFor` at the recorded placement; `proposals` honours `count`, `withinKm`, `exclude` and merged weights and persists nothing (C13-22); (b) `score` called as V14's G3 calls it (purpose weights, hard terms over V14-registered plug-ins) refuses a cell whose hard term is 0 and is bit-identical across two calls (no draw, SW-03); `clock(world, week)` sets the world's week as a view command (C13-23); the messages carry the format version | a mock host |
| T-V13-38 | W6's spacing passes: no two capitals within `capitalKm`, no two towns within `townKm` after the passes; the shrink rule triggers on the sparse fixture; ports are promoted on coasts only; stage 2 drops, never adds | B-WORLD-lite statistics |
| T-V13-39 | W7 and W8: every coordinate passed to `delaunay` is an integer metre inside §3.2 (1)'s range invariant (a lint on the call; SW-16); no land leg crosses water; the `existingRoute` discount makes later roads share earlier cells (the shared-cell share ≥ 20 % on B-WORLD-lite, own bar); every member sway is one connected component after normalization or is flagged an exclave (enclaves ≤ `enclaveMaxCells` removed); every seat territory is one component; standalone provinces partition their seat territory | statistics and invariants |

### 7.4 Editing, view, exports, budgets

| id | what it asserts | how |
|---|---|---|
| T-V13-9 (bar 8) | a counterfactual fork is edited (a sea rise and a placement), its cascade inspected, and discarded: the canonical document is byte-identical; `commitFork` replays the events onto the log as one group and a conflicting event since the fork takes F-EDIT's outcome | the fork fixture |
| T-V13-16 | B-WORLD statistics inside their bands (own bars, calibratable at M-W1): land share 25–60 % on `continent`, reaches per 10 000 km² 2–12, lake count per 10 000 km² 0.5–6, settlement spacing's coefficient of variation ≤ 0.5, route length per seat 40–200 km, seat territory count = seat count, allegiance count ≤ seat count, the unclaimed share inside a band measured at M-CAL/world (it is an output of density under T2, never a bar of its own) | the nightly sweep |
| T-V13-17 | the cost-model slopes of V13 §6 (≤ 1.15 linear, ≤ 1.25 n log n) and the per-rung totals inside `budgetMs` at p95; the F-WORK hit rate flat across the extent band | nine sizes (the three rungs at 0.5 ×, 1 ×, 2 × extent), five seeds, nightly |
| T-V13-18 | labels: no two world labels overlap at any stop; a river under `riverMinKm` has none; the settlement's label priority scales with tier | B-ZOOM's placer test over a world |
| T-V13-19 | exports: `ecosystemJson` and `ecosystemGeoJson` validate against the adapter folder's schema; the provenance block names the digests; the frame's JSON carries `waterClass` per unit and the surfaces | schema validation |
| T-V13-20 | the frame's additions stay inside S1's §12.4 row: the surface step ≤ 3 ms and the groundwater step ≤ 30 ms at METROPOLIS (C13-54); the water class test ≤ 10 µs per unit in the tail; §12.3's laws hold unchanged (C13-09) | §12.1's timing phase |
| T-V13-26 | the adapter: the synthetic fixture imports with the report's counts as expected (lakes dropped, rivers unmatched, biomes unmapped, routes unmatched, polity agreement ≥ 0.8 on the fixture); (b) export → import → export is byte-identical over the schema's canonical form on the shared keys — heights, names, seats and their attributes, the climate arrays (V13 §3.15; the re-derived courses, lakes and routes are outside the round trip) | the fixture; the round trip |
| T-V13-27 | undo and redo of every edit kind of V13 §4.1 restores the digests (world and frame) and the undo stacks stay per document | B-EDIT over the world |
| T-V13-28 | the heightmap round trip reproduces the DEM within one quantum | the `image` op |
| T-V13-29 | an older frame loads with surfaces built, an empty carve delta reported, the table derived and the diff shown; every older event reads `alwaysSo` | the pre-V13 fixture |
| T-V13-41 | the sway (the owner's territory rules): (a) determinism and order-freedom — the same facts give a byte-identical sway, permuted inputs the same, batch and one-by-one triggers within a week one revision; (b) partition invariance — every sway revision and every death, resettlement and satellite founding leaves W8a's crossings and costs byte-identical; (c) no flicker — a prosperity rung alternating every 4 weeks for 2 years gives 0 revisions, a change held 13 weeks exactly 1, the realm's median rung moving and held 13 weeks exactly one whole-world revision in which a seat whose rung rose with it keeps its reach, a military or culture band oscillating inside its dwell 0, armies crossing with no outcome 0; (d) no snowball — 0 to 12 vassals give a monotone reach ≤ capTier, top-band military in uncontested land changes no cell, and in a 300-year soak under B-POLITY no allegiance exceeds its land-share band and no cell beyond Treinf is held through a bonus; (e) the debatable width between two adversarial towns of one strength band is `margins.civ` · τmin ± one cell on the travel-time midline (J384 (3)), a strength band one higher on one side moves it toward the other by `margins.pushPerBand` ÷ 2 · τmin and changes no cell beyond either side's reach, a continuous vassal's reinforcement moves no such line (it enters only (10)'s tie-break), a band not yet past its dwell leaves the pair at its last counted band, with no strength band sent the pair reads level and `W_POLITY_STRENGTH_ABSENT` is raised once per window, equal military stays debatable, a lead ≥ `margins.mil` holds by force, a neutral pair has no debatable cell, allies split at the midline; (f) exclaves — a vassal beyond Treinf is an exclave, a new road within it makes it continuous at the next revision, the host grading that road hidden makes it an exclave again, a host verdict overrides the map's; (g) a satellite on unclaimed land is a claim point of its parent's allegiance at its frozen site's point and never a seat, projecting at τTier × 1 × 1 with no bonus, its parent's strength band in an adversarial cell and absent from the held median, its people never in its parent's size third, an orbit-only satellite neither drawn nor projected (J384 (11)); (h) events — a razing transfers nothing and the reach follows the host's next tier, an occupation (with or without an occupier, and a treaty-held one) hatches, changes no holder and holds its culture bands, the occupation's vassalized rung changes the allegiance, a sale re-roots at mint, a death leaves W8a unchanged, a resettlement re-projects at the smallest tier; (i) charter invariance — a revision leaves every frame's model and records digests unchanged; (j) belief — a covert link never appears on a player surface, and with `audienceKnowledge` an unknown event is absent; (k) seat cells — no seat cell or placed frame's extent is ever debatable or held by force; (l) J382 — with culture bands sent, a seat's reach into land of the farthest culture is shorter by the `phi` law; with the water lanes dark no sway crosses water, lit a lodgement reaches no farther than `lodgementDays` inland; a culture pair the host did not send reads 0 and is reported; (m) history — a past week's sway from keyframes and traces equals its re-derivation, for revisions whose causes stand in a window or in its events; (n) retention — after 300 years of B-POLITY the store stays within `WORLD-13`; (o) continuity — a member made adjacent only by its own bonus stays an exclave, and the two-pass result is order-free; (p) incremental equals whole — a revision over its dirty box is byte-identical to a whole-world W8b over the same facts, on every fixture and on 1 000 random single-trigger revisions; (q) rivers — two equal seats across a navigable river, one nearer it by less than `river.crossingDays`, split at the river rather than at the travel-time midline; (r) the factors (J384 (1); J385) — ln reach rises by ln 1.15 per size third and ln 1.1 per relative rung, the relative rung clamped at ±3, a realm whose every rung rises by one changes no reach; (s) raids (J384 (5)) — a raid with no outcome word moves no band and marks its segments fighting for `fightingWeeks`, the same raid with the host's outcome word moves its winner's band by one, and with no force band sent (M dark) a verdict's band alone holds its segment's debatable cells by force for its winner while its lead is at least `margins.mil` bands — a raid's verdict (+1) for one half-life, a field battle's (+2) for two — the cells returning to debatable at the revision its decay crosses, that revision over its dirty box byte-identical to a whole-world W8b, and the first window carrying force bands re-reading every cell so held at the enforced threshold (J386); (t) a host lineage claim draws a DM-view outline and moves no cell; (u) a bypass — a host `network` change of kind bypass re-lays its route round the avoided seat's radius as a dated lay version under the same host key, the former lay kept; (v) a planting line — a trigger waiting on its dwell shows in the `events` layer in the window its fact arrives, and is gone at its effect week or when it lapses | the polity fixtures; B-WORLD-lite under B-POLITY |
| T-V13-42 | patrols: `patrolAt` is identical across runs and machines and follows the cadence exactly (a monthly patrol is present one week in four, on its fixed phase); coverage moves only at revisions; `patrolOffer` carries no time; a road the host closes is covered by its closer every week; a hidden road has none; both sides patrol a debatable segment; a patrol whose source (a seat by its force band, a fort or watchpost by its garrison band, else its holder's) is of band 3 or more runs one rung denser and of band 1 or less one rung sparser, and with no band sent for its source no shift | fixtures |
| T-V13-43 | time: two routes sharing a corridor report equal effort per shared metre whatever their laying order; a site dropped on a host route leaves the leg count unchanged and moves its effort by the detour only; after a seat is added every leg outside the closure keeps identical time fields and every changed leg appears in `timeDelta`; a band crossing raises `W_TRAVEL_BAND_CROSSED`; under every basis (absolute, normalized, normalized-frozen) a vassal drawn continuous passes the host's own band read at the week shown, its Treinf in cost units under the sent calibration | the travel-law fixture |
| T-V13-44 | the calendar: for every land cell beyond the tropics in the calendar hemisphere the coldest week of its curve lies in the host's winter quarter (39–51) and the hottest in its summer quarter (13–25) | V11's climate rows |
| T-V13-45 | the import of the host's estate: a synthetic 1.114-shape fixture made by our own script imports; a miles fixture beyond the continent band offers the rescale, crop or coarser cell and never clamps; a custom unit refuses until typed; a fixture whose only coast lies at the file's top edge lands on the world's north edge and its round trip restores the pixel row within one rounding unit; a host-embedded snapshot's states and cultures steer nothing | the import fixtures |
| T-V13-46 | the windows: (a) an advance, an undo and a re-advance send windows whose fold leaves the world equal to one that saw only the final window; a consumed edit is sealed; an edit while the host is parked is refused; a window keyed by its history sequence while the advance epoch is dark folds as one keyed by its nonce; (b) with the host's per-tick change log present, one lived history advanced weekly and as one year gives an identical revision list; without it, the revisions of facts standing at each window's end agree and the year's reasons declare window resolution | the mock host |
| T-V13-47 | the lens record and the honesty rule (J384 (13)): every lens of `world.lens` has a `LensLayer` whose sources carry gates, whose regime comes from the window's `HostRegime` and never a preset's name (a fixture named after a lit preset whose regime has every lane dark draws still), and whose legend's first row is the banner; on the all-dark fixture (no canon, every lane dark including relationship drift and stressor spread, no deity, no plague) every lens opens still with its reason, listed collapsed in the picker, none hidden, no element drawn beyond its gate; on the birth-defaults fixture (the host's birth rules, no preset applied, no canon, no deity) the prosperity lens reads frozen and the religion lens none, both in still mode and listed collapsed (a conversion fracture's footprint the host sends still drawn), while the sway reads civil, trade relations and populations netted, and plague reads footprint once a plague is live — none hidden; with no regime sent every banner reads "the host's regime not sent", `W_LENS_REGIME_ABSENT` is raised once and nothing gated draws but the facts sent, labelled; one dated event tagged for several lenses (an occupation tagged sway, prosperity and alignment) moves each lens at its week, and a scrub to any week draws them in agreement; every drawn mark answers `lensWhy` with the host rows it read and the element and rule that drew it; with a plague live the plague lens's legend carries the authorship note, with a deity seated on a born campaign the religion lens's, and where the regime runs the conservative intensity the populations lens carries the small-seat note | the lens fixtures |
| T-V13-48 | no invented fact: a lint over every `LensElement` — exactly one class, `placed` where a placement positions a host fact, a label on every host-derived, placement, placed, projection and DM-placed element, the classes as V13 §5.9's tables give them; `@plat/world/lens` computes no host-derived value (a call-graph lint: such a value is only read from the host's rows); every refusal of V13 §5.9 asked as a draw returns `refuse.lens.invented` with its reason; a supply arrival never draws between its ends; a footprint row never draws an arrow or a time; no lens draws an interpolated field | lint; the lens fixtures |
| T-V13-49 | the words: every word a lens draws is in the adapter folder's tables or this volume's legend strings; the collision lint finds no lens using another meaning's word or colour (the monster-threat chip's above all); every host axis of the polarity fixture lands on the convention (lawful, malicious and lenient high) | lint; the polarity fixture |
| T-V13-50 | the audience: a row with no resolved audience is DM-only; a player picture holds only the public rows and, where the regime records belief, the party's believed rows — under an omniscient regime none; covert links, columns and patrols are absent from it, not greyed; the alignment lens refuses every audience but the DM (`refuse.lens.audience`) and a party set's alignment rows are dropped at fold (J384 (7)); a player-audience picture export of a lens view (`lensAt` for the party) holds exactly the marks the player picture holds — never a historic front, a suppressed creed or a criminal channel | the audience fixtures |
| T-V13-51 | the plates (J384 (9)): one plate per host advance; a rewind drops every later plate; the world's model and records digests are byte-identical with the plate store full, empty or dropped; after 600 weekly advances the plates older than 520 weeks are one per 13 weeks (each quarter's last kept), every pinned plate survives and every kept plate, re-encoded against the previous kept plate, decodes to its former content; a rewind drops every later plate, pinned ones included; a scrub before the first plate or across interior weeks the host did not send declares the gap (`W_LENS_PLATE_GAP`); a host-dated fact scrubs to its exact week; before the first plate the host's pulse records, where sent, scrub with their horizon labelled; a capped draw is byte-identical across runs (ties by the lower seat key, then the lower id); the store stays within `WORLD-14` after 300 years and a lens draws at a scrub week within `WORLD-15` | B-POLITY's scripted host extended with a lens window per advance |
| T-V13-52 | the plague lens: on the canon fixture the front draws hop by hop, each hop's link from its source captioned with its arrival week and the approach ring with the weeks to onset; on the uncanonized fixture with the same-week spread lit the footprint draws as one same-week mark with no arrow, no time and no phase word, and with that spread dark a live plague reads still; with the canon and the same-week spread lit, a migration-channel join draws as a same-week mark beside the front; a hop names its carrier only when the host sent one; with no plague live the lens is still; a realm arc is a dated caption and an outline on its seats, never a region; no mark uses the monster-threat word or colour | the plague fixtures |
| T-V13-53 | movement: netted transfers draw as dated links and never as markers; a column draws from its departure week at its clock's fraction along a path labelled "likely road", a sea column along the water lane's laid path, a teleport column as an arc with no path, port and teleport columns DM-only by default (J384 (12)); a column with no sent carriage draws its likely carriage, labelled; a named traveller sits at its leg clock's fraction on its frozen path; a supply link with no clock draws only its arrival | the movement fixtures |
| T-V13-54 | the religion lens: the host's hierarchy draws before every other mark; a mixture ring sums 100; with spread dark the lens reads seated and draws no spread pressure, a seated patron's prescription still drawn where the host's institution lane is lit; no faith link crosses water as a carrier (J382 (c)); a conversion draws a source link only when the host sent one; a card with a `devotion` draws labelled "DM-placed" and DM-only until revealed; no holy place is generated (J384 (10)); the global rank legend lists the deities in the host's tier order, highest first, then by patron seats, most first, ties by the deity key ascending, and changes only at a plate; a suppressed creed draws on the DM's view and is absent from every party set (dropped at fold) and every player picture; a patron fall draws at its week with the host's cause word; a pilgrim catchment draws only the set the host sent, in a deity's colour only where the rite has one, and none where it sent none; the mixture's standing words are the host's; a rank arc is a dated caption and an outline on its deity's patron seats, never a region; a rite adoption or imposed rite draws its link only from a sent origin, captioned with the host's year and never a week it did not send | the faith fixtures; V14's devotion card |
| T-V13-55 | the prosperity and alignment lenses: the rung fills its seat area uniformly with no gradient across a border; booms and busts draw at their weeks; the upward-drift and born-world bias notes stand where their gates hold; the alignment lens is DM-only and still until the host sends its reading; a party set's alignment rows never draw; a quadrant posture links only two seats that both hold a patron, in three classes with the no-schism note | the lens fixtures |
| T-V13-56 | the trade lens's production and need (J380): every economy row's goods are keyed by the host's catalog key as its supply links key them — two labels the host keys alike draw as one good, each label kept on its card, a loosely read key marked — with the category and shippable flag the host sends, no flag derived from a category (a custom good the host sends shippable draws shippable); production, needs, exports, imports, services and food coverage draw under every regime, loads, arrivals, relations and still alike; a food good and a catalog service never draw moving (on a route, a mover or a shipment-styled link), while a service export the host ships as a good draws as a shippable good; a food coverage ring is filled to the share the host sent, kept at its surveyed share while a cut is in force, the cut marked by the stressor's word and never by the war's siege mark; a supply arrival captions the good its link names where the host sent one and guesses none where it did not; no criminal channel and none of the host's criminal income reaches a player picture; stocks, throughput (its inbound and outbound words) and the entrepôt heat draw in the loads regime only; relief and credit draw no link where the host names no giver | the trade fixtures |
| T-V13-40 | the view: each layer renders at each stop on the vector rung; the water class overlay reads by pattern without colour; the world's first frame ≤ 400 ms at the continent rung | §13.4's render tests |

### 7.5 The report codes (§5.4's form; BCR-V13-18)

| code | kind | emitted by | arguments |
|---|---|---|---|
| `W_WORLD_RECIPE_CLAMPED` | warning | W0 | the field, the asked and clamped values |
| `W_WORLD_RECIPE_OP_DROPPED` / `W_WORLD_RECIPE_TABLE_DEFAULTED` | warning | W0, W1 | the op index or table id |
| `W_HEIGHT_CLAMPED` | warning | W1 | the cell count clamped |
| `W_WORLD_LAKE_BREACHED` | warning | W2 | the lake, the saddle |
| `W_WORLD_SINK_UNRESOLVED` | warning | W4 (a reach cut at the cap) | the reach, the cell count |
| `W_GW_PERCHED_IGNORED`, `W_GW_NO_SOURCE` | warning | W4, the frame's step | the frame or world, the reason |
| `W_SITING_SPARSE`, `W_SITING_NONE` | warning | W6 | the pass, placed vs target |
| `W_ROUTE_NO_PATH` | warning | W7 | the two seats |
| `W_POLITY_SEAT_MOVED` | warning | W8a | the seat, from, to |
| `W_POLITY_CYCLE`, `W_POLITY_TWO_LIEGES` | warning | W8b | the link dropped or drawn as a claim |
| `W_POLITY_CULTURE_ABSENT` | warning | W8b, once per window | the seat pairs within reach the host sent no culture band for |
| `W_POLITY_STRENGTH_ABSENT` | warning | W8b, once per window | the adversarial pairs within reach the host sent no strength band for (read level) |
| `W_POLITY_SATELLITE_UNPLACED` | warning | W8b, once per window | the satellites with no frozen site point (neither drawn nor projected) — on an uncanonized campaign every satellite, so the code is raised once per window, never once per satellite |
| `W_LENS_REGIME_ABSENT` | warning | a lens window's fold | the window; every lens's banner reads the regime unknown |
| `W_LENS_PLATE_GAP` | warning | the scrub | the lens and the weeks with no plate (before the first observed advance; interior weeks the host did not send; a dropped store) |
| `W_SWAY_LOCK_CONTRADICTED` | warning | W8b on a standalone world | the lock, the revision, the facts it contradicts |
| `W_TRAVEL_BAND_CROSSED` | warning | a dry run, a route-class edit, a fork preview | the legs, their weeks before and after, the bands |
| `W_HOST_CANON_BEHIND` | warning | a lay version or a seat territory the host has not adopted | the version, the edits |
| `W_EDIT_DOSSIER` | warning | the cascade over a world-stamped frame | the frame, the dossier fact |
| `W_WORLD_HEMISPHERE` | warning | W3 on a host-bound world | the seats across the equator |
| `W_IMPORT_SCALE_ASSUMED`, `W_IMPORT_LEGACY_BURG`, `W_IMPORT_PLACEMENT_UNVERIFIED` | warning | the adapter | the unit, the settlement, the row |
| `W_PLACE_NO_LAWFUL`, `W_PLACE_BENT`, `W_PLACE_ANOMALY`, `W_PLACEMENT_OVERLAP`, `W_CHARTER_RIVER_MISSED`, `W_CHARTER_WIDTH_CLAMPED`, `W_BLEND_CLIPPED` | warning | the placement operators, S1 | the placement, the cost or residual, the anomaly, the other placement, the crossing |
| `W_SURFACE_NO_BODY`, `W_SURFACE_BELOW_BED` | warning | `setSurface` | the surface |
| `W_CASCADE_TRUNCATED` | warning | the cascade (a work cut) | the step, the count |
| `W_IMPORT_LOSS`, `W_IMPORT_REPAIRED` | warning | the adapter | the key or record, what was done |
| `W_MIGRATE_NO_CARVE` | warning | load | the document |
| `refuse.world.recipeOp`, `refuse.world.tier`, `refuse.place.fit`, `refuse.place.worldRef`, `refuse.charter.dossier`, `refuse.surface.date`, `refuse.import.version`, `refuse.import.key`, `refuse.import.extent`, `refuse.import.unit`, `refuse.place.hostLocked`, `refuse.world.hostSeats`, `refuse.world.hostRoute`, `refuse.world.advancing`, `refuse.world.hostRequires`, `refuse.world.hostPolitical` | refusal: a §7.1 outcome key rendered by V09's catalogue, never a `ReportCode` (C13-53) | the dry run, the adapter | the op, the rung, the frame and world, the dossier fact and the nearest lawful origin, the date, the version, the key |
| `refuse.lens.invented`, `refuse.lens.audience` | refusal: a query outcome rendered by V09's catalogue, never a `ReportCode` | `lensAt`, the lens picker | the lens, the element, the reason |
| `E_WORLD_SINK`, `E_GW_CAP` | bug abort (§5.1 (8)) | W4, the groundwater step | the cell |

**Bars carried as rows** (SW-33: one owner per bar, the other volume's row its named clause): bar 3 → T-V13-2; bar
4 → T-V13-4; bar 5 → T-V13-6; bar 7 → V14's T-V14-7 (its world clause T-V13-30 (a)); bar 8 → T-V13-9 (its site clause
V14's T-V14-23); bar 9 → T-V13-7; bar 10 → T-V13-10 (its site and encounter clause V14's T-V14-18); bar 12 → V14's
T-V14-12 (its classifier clause T-V13-8); bar 13 → T-V13-21. Bars 1 (V14's T-V14-32), 2, 6, 11, 14–17 are V14's or the
2.5D renderer's and are not carried here (V13 §1.4).

## 8 Build plan

### 8.1 Where it sits

The world milestones follow M-SF (§16: the SettlementForge connection, SF0–SF7) because the port, the charter per
campaign and the host's seats are the host-facing half of this volume and M-SF lands the host client they ride on
(BCR-V13-19). The frame-side water state (surfaces, the groundwater step, the water class test, the two verbs and the
cascade) has no host dependency and is its own milestone **M-W0h**, starting after M4 beside M5 and exiting before
M6-U's U3b, so V04 and V14 read one function from their first milestone (SW-14; J-V13.62); until it lands V04's readers
keep the base's nearest-body rule (BCR-V13-21). Order inside each milestone is the spine's: W0 → W9, then P1 → P5. Effort is in person-weeks (pw) on §16's
scale (one engineer, the reference hardware); estimates are PLAUSIBLE until the spikes report.

### 8.2 Milestones

| milestone | contents | gate (tests) | estimate |
|---|---|---|---|
| **M-W0 spikes** (before M-W1; after M0 closes) | SP-W1 the lifted priority flood and accumulation at 9.2 M cells; SP-W2 the two-tier coherence search's cost; SP-W3 W6's stage-2 iteration count (one or two); SP-W4 the adapter's round trip on the synthetic fixture; SP-W5 the frame's groundwater step against S1's row; SP-W6 W1 over the six templates at 9.2 M cells (C13-10); SP-W7 W7's A\* at the continent rung over B-WORLD-lite (C13-36) | each spike a pass/fail number (V13 §8.4) | 3 pw |
| **M-W0h the water state at the frame** (after M4, beside M5; before M6-U's U3b; SW-14) | the hydro lift (BCR-V13-1); `carveDeltaCm`, `Terrain.surfaces`, `datumOf` on a standalone frame; the groundwater step and `waterTableAt`; `classifyWater`, `governingSurface`, `routeClass`, `surfaceSetDigest`; the two verbs and the cascade at the frame; the counterfactual fork; `ReasonRecord` and its readers; V04's readers switched (BCR-V13-2, -3, -21, -23); its only new dependency M4's render tier for the overlays | T-V13-4, 6, 8, 9, 10, 20, 22, 25, 27, 29, 33–35 | ≈ 4 pw |
| **M-W1 the world** (the brief's W1) | `@plat/world` with the lifted hydro core (BCR-V13-1); W0 Blueprint, W1 Terrain recipe, W2 Features and surfaces, W3 Climate, W4 Hydrology with groundwater, W5 Biomes and resources, W6 Suitability (stage 1); the frame-side water state, the verbs, the cascade, the fork and `ReasonRecord` as M-W0h landed them (SW-14), the cascade now at both scales (BCR-V13-9, -10) and the four readers over the world's records (BCR-V13-17, -24); P1–P5 with the charter both ways and S0/S1 reading it (BCR-V13-4, -5); the port's `canon` (the travel, water and sites slots), `derivedFacts`, `charter`, `proposals`, the world header, `costLaw`, `travelLaw`, `bindSeat`, `unbindSeat`, `importSeats`, `hostRequires`, the `events` windows, `canonized` and `consumed`, and the `physicalChange` offer (BCR-V13-11); the world view's raster and water layers and the glyph (BCR-V13-13); the world dialog and the placement tool (BCR-V13-25) | T-V13-1 – T-V13-10, 12, 13, 15, 20 – 25, 27, 29 – 37, 44; bars 3, 4, 5, 9, 10, 13 | 14 pw |
| **M-W2 routes, polity, siting stage 2** (the brief's W2) | W7 Routes under the host's cost law with the time stations, the genesis lay and the lived network; W8a and W8b with the patrol step and the border-post proposals; W6 stage 2; the port's `routes`, `routeFacts`, `mapFeed`, `patrolOffer`, `pathGeometry`, `borderSegment`, `placeOf`, the recorded `genesis`, `network` and `polity` windows and the presentation inputs `clock`, `hostOverlay`, `beliefView`, `audienceKnowledge`; the routes, seat territory, sway, occupation, debatable, fighting, patrol and event layers; standalone `setSeats` | T-V13-14, 16, 17, 38, 39, 41 – 43, 46; the B-WORLD statistics bars | 8 pw |
| **M-W3 labels, exports, the adapter** (the brief's W3) | W9 Labels; the world's label placement; the four exporters and the frame's export additions (BCR-V13-12); the map-import adapter with its schema file; the picture exports' world rows; the retirement of the host's reference fork (the host's track, V13 §8.5) | T-V13-11, 18, 19, 26, 28, 40, 45; bar 7's world half | 6 pw |
| **M-W5 the lenses** (after M-W2, beside M-W3; before M-W4, whose gate covers it) | the lens mechanism (`LensLayer`, the regime banner, the four classes and the refusals, the vocabulary, collision and polarity tables, the audience filter, `lensAt`, `lensWhy`, the plate store and the scrub; V13 §5.8); the port's `lensWindow` and the events' lens tags; the lenses in the ruled order, each a step — plague; the sway (territory) and patrols (M-W2's layers reconciled to the record); trade and populations; religion (with V14's devotion cards and their offers on the DM's map feed, V13 §3.11.6); prosperity and alignment (V13 §5.9) | T-V13-47 – T-V13-56 | 7 pw |
| **M-W4 hardening** | the budgets' register rows measured (T-V13-17, 20), the memory test, the low-tier refusal, the migration of older frames at scale, the clean-room lint over the three packages | every T-V13 row green in the nightly tier | 3 pw |

The volume states no total of its own (§16's rule; C13-45): M-W0 – M-W5 is priced as one staged-milestone row in §16
with the estimate range 37–45 pw, each mechanism widening a named §16 line (BCR-V13-19) — O1 terrain and hydrology:
the lift, the groundwater step, the surfaces, the position-keyed lattice; O9: the verbs, the cascade, the fork, the
placement edits; O11: the four exporters, the adapter, the port's second door; O12: the world layers, the glyph and the lenses;
the rig: B-WORLD and the eighteen drift tests; V11's content line: the fourteen tables' rows and the two climate rows.
The frame-side water state alone (the part V04 and V14 wait on) is its own milestone M-W0h (≈ 4 pw) after M4, built before M-W1 (SW-14).

### 8.3 Order inside M-W0h and M-W1 (steps 1–4 are M-W0h's, SW-14)

1. The package and the lift (BCR-V13-1): `@plat/world/hydro` (the field, `priorityFlood`, `resolveFlats`, `d8`,
   `accumulate`) with the site's tests passing unchanged; `@plat/site` importing it; **the carve's delta map** as the
   new member of `carveCourse`'s result (today's carve writes the height raster and keeps no delta, C13-49). 2. The frame's water state: surfaces, the carve delta, `datumOf`, the groundwater step, `waterTableAt`,
   `classifyWater`, `routeClass`; V04's readers switched; T-V13-8, 20, 22, 29, 33–35. 3. The verbs, the traces, the
   cascade, the fork; T-V13-4, 6, 9, 21, 25, 27. 4. `ReasonRecord` and the readers; T-V13-10. 5. W0–W2; T-V13-1, 3, 5, 15.
   6. W3–W5; T-V13-16's hydrology and biome bars. 7. W6 stage 1. 8. P1–P5 with the charter, S0/S1's reading, the
   orientation terms; T-V13-2, 12, 13, 23, 24, 36. 9. The port: the canon and its envelope, the map feed's record, the charter, the proposals, the recorded inputs of M-W1 (V13 §8.2); T-V13-37, 43 (time), 45 (import fixtures only when M-W3's adapter lands). 10. The view and the tools;
   T-V13-40's M-W1 rows.

### 8.4 Risks and spikes

| risk | spike | pass bar | pre-decided fallback |
|---|---|---|---|
| W4 at the continent rung over budget (the flood's queue at 9.2 M cells) | SP-W1: the lifted flood + accumulation on a synthetic 9.2 M-cell DEM, five seeds | ≤ 1 800 ms p95 on the reference hardware | the continent rung's fine cell goes to 1 250 m (5.9 M cells; the size row's cell is data) and the rung's extent is kept; declared in the register |
| W1's noise over budget (C13-10) | SP-W6: W1 over the six shipped templates at 9.2 M cells, five seeds | ≤ 3 200 ms p95 at the continent rung | the `continent` template's noise capped at 4 octaves, the finer octaves added only inside a placed frame's margin by S1's position-keyed lattice (V13 §6) |
| W7's A\* over budget at the continent rung (C13-36) | SP-W7: W7a + W7b over B-WORLD-lite's continent seeds | ≤ 520 ms p95 | edges above a rank cut (the lowest 50 % by seat rank) routed on the coarse grid and refined through the fine cells of the coarse path's corridor |
| the coherence search too slow for a live drag | SP-W2: P1 over a CITY frame at 360 bearings; `nearestLawful`'s two tiers (V13 §3.11.1) | P1 ≤ 40 ms; `nearestLawful` ≤ 600 ms | the live drag evaluates 36 bearings (10°) and refines to 1° on release; the coarse tier only, the fine tier on request |
| W6's stage 2 oscillates | SP-W3: two iterations on B-WORLD-lite | the second iteration changes < 2 % of seats | one iteration fixed (J-V13.10 stands either way) |
| the export round trip loses keys the ecosystem reads | SP-W4: export → import → export on the synthetic fixture | byte-identical on the shared keys | the schema file gains the missing keys with their value laws; a key with no world fact exports its documented default |
| the frame's groundwater step breaks S1's §12.4 row | SP-W5: the step on the METROPOLIS hydro grid | ≤ 30 ms (C13-54) | the step runs lazily on first `waterTableAt` read after S1 (the one-click path pays 0; the first basement gate pays it) |
| the blend band cannot meet a frame whose edge relief exceeds the world's | — (a design fact: `blendBandMaxM`) | — | the residual is reported as cost; the DM takes an offer or `worldWins` |
| the host's schedule slips past M-W1 | — | — | the port's host side is mocked (T-V13-37's mock host); the standalone world ships without the host's seats |
| the canon over budget at the continent rung | SP-W8: the coarse flood, the refined crossings and the water and sites slots on B-WORLD-lite, five seeds | ≤ 2 s p95 (`WORLD-12`) | the crossings refined only for pairs the host asks; the water slot's K reduced to the host's minimum |

### 8.5 The host's parallel track (stated, not designed here)

This is the design's one host-change list: the realm review's list it was carried from and the proposal's former items
are superseded by it (items 817, 832). The host implements, in this order (each optional read dark and data-gated —
absent ⇒ the prior bytes — with its tier line, its degraded arm and its coupling row; each row also carrying its
first-visible line, or a planting line where its effect waits on a dwell, measured spreads or UNMEASURED for every
band it mints, and its felt sentence, and landing as a lazy leaf under the host's first-paint ratchet; H22 – H30 carry
the lenses' asks in their build order, none required for a lens to open (V13 §5.8 (3)); within H22 – H30 the exports
(the lens window, keys, receipts, news, stored paths) change no simulated byte, while the clauses that change simulated
behaviour — H22's birth canon (a declared shift for new campaigns only), a raid's outcome word, an arrived plague's
condition with its loop cap, the missing-settlement latency, the ledger's plague mapping, the one-service crisis fence,
the further column dispatches, the donor distance term, the town drawing's frozen band, the moral drift fix — are
offers the host may decline, each a declared shift for new campaigns or behind its own rules flag, and no lens waits on
any of them; the transition for existing campaigns in phases 0–5, of which phases 0–3 change no byte of a campaign's
simulated state):

| # | when | the host changes | waits on |
|---|---|---|---|
| H1 | now, on the fork | the capture carries the map's width and height, seed, kind, distance scale and unit; one read-only command returns the fork's full JSON export for the loaded snapshot; the world regenerate records its seed (phase 0) | — |
| H2 | now | every mover band derived from the realm's measured spectrum or justified, the reinforcement band first | — |
| H3 | now (documents) | the register rows mirroring this volume's words (V13 §3.11.6 (9)); the world scale's source dated: a world from the map module declares it, the reference generator's scale and unit read only by the import; and, a dated bracket on its own ruling, the absolute distance that ruling lights for new worlds waits, for a world from the map module, on the per-map band census (H2), by its own dead-band law | — |
| H4 | with M-W1 | the world port's messages in the host client (a seat's removal sent as `unbindSeat`, offered to its re-canonize like an addition); the port consumption law in code (no port call inside a tick; answers baked with their stamps; the client inside the host's own import scan for courts) | M-SF; M-W1 |
| H5 | with M-W1 | a second builder of its frozen record over the canon, the reader-facing shape unchanged, every sub-record sourced or declared absent; the conformance fixture; its cell-level readers moved to the canon's per-seat queries and points; a satellite's site a world point; its satellite-ground reader and that reader's certification row reading each ground point's terrain class and step cost from the sites slot | M-W1; V13 §11 Q4 (lit only after its answer) |
| H6 | with M-W1 | its cost law 2 in this volume's schema; its cost-units row; an explicit cost-law stamp on every native record; the scale stamped from the header (carried only within one geometry version); one coordinate adapter between this frame and its render frame | M-W1; H4; H5 |
| H7 | after H2 | a native world's seed minted at its store layer and kept with the campaign's; the first canonize stamps the scale only after H2 (until then the normalized arm over the canon's tier-1 adjacency, its calibration sent with the travel law, H8) | H2; M-W1; H4; H5 |
| H8 | with M-W1 | the travel law sent as data with its calibration (weeks per cost unit) at every re-canonize, normalized or absolute; `canonized` per re-canonize; the time-delta receipt stored; a migrated campaign's frozen leg weeks | M-W1; H4 |
| H9 | with M-W1 | the events window after every advance, undo and resume, committed facts only, keyed by the advance nonce when its advance epoch is lit, else by its pulse-history sequence, with the resolved audience (also applied to the conditions a frame draws) | M-W1; H4 |
| H10 | with M-W1 | a per-campaign world record beside the settlement map records (snapshot, log, backups, quota, lifecycle); the players' world view from its party picture set | M-W1; H4 |
| H11 | with M-W1 – M-W2 | its port verdict over the canon's water access, returned as a view attribute; its frozen per-settlement water verdicts sent as constraints; its water lanes over the canon's latent candidates under its own law; a lake vocabulary admitting salt and a climate-band version over the settlement's physical record | M-W1; M-W2; H4; H5 |
| H12 | with M-W2, as its genesis mount at world birth lands (its own schedule puts that after its release) | genesis at world birth over the canon with the founding members placed first, sent as one frozen record (even while dark); its render-tier roads retired; route changes and grades per window; genesis on a member's joining, with its ports' totality per evaluation; its charter command reachable from the world editor; the quiet-quay rule for a decayed water lane checked; the move-lock's release named per seat | M-W2; H4; H5; its genesis mount at world birth |
| H13 | with M-W2 | the polity facts per window: seats with tier, size third (its own people, its satellites' never counted, J384 (11)), prosperity rung, its strength order — its own settlement-strength comparator, banded in fifths by its own strength banding (the one its envoys read), the comparator its relationship drift reads to choose a raider and an overlord (J384 (3)) —, its force band (its capacity facets bar the economy facet, renormalised on its existing five floors) and garrison presence; links in the vassal labels of its relationship-state plane (the plane its simulation reads; merging its two planes is its owner's) and its four subordinating treaty terms — tribute and compelled alliance sent as live terms, a treaty-held occupation flagged —, the occupation's two records resolved to their union; relations pairwise in the same plane; held sites; its standing claims of one seat on another (its lineage claims, while that lane is lit); its satellites with their parent, tier and frozen site point (J384 (11)); its forced tributes as tribute links with their weeks; its culture distance in its plain form over its whole vector (no trade tie) for every pair within its reinforcement band or at its neighbour tier ≤ 2, banded in fifths with the week each band was sampled (J382; J384 (2)); whether its water-lane system is lit and its adopted lanes (J382); its road closures and wardens' terms; the DM's christenings; the per-link continuity verdict whenever its sovereignty market is lit (optional while it is dark); optionally, at its choice, a per-tick capture of its political deltas during an advance — the dated rung changes of tier, prosperity, force band and strength band — into the window | M-W2; H4; H9 |
| H14 | with M-W1 – M-W2 | for a settlement generated from a world charter, its access word derived from the charter's road and water facts, and its terrain word from the charter's relief, biome and water facts by the inverse of DR1's relief-class row (the table the `dossier` term reads), before generation; its terrain-agreement notice retired, its role taken by `refuse.charter.dossier`; existing campaigns' configurations stay canonical | M-W1; M-W2; H4 |
| H15 | with M-W2 | world edits held while an advance runs or is parked; `physicalChange` applied at the next tick head with the DM's attribution; `consumed` sent; geometry shifts and lay versions adopted only by its receipted re-canonize, after a dry run of the canon's diff | M-W2; H4; H5 |
| H16 | each optional | who keeps a gate is ruled (J385; V13 §11): the intermediary settlement whose territory the path crosses keeps it until the sway has passed its soak (T-V13-41 (d)'s 300-year soak under B-POLITY, the polity cells measured), and the crossing holder is then offered as a per-gate policy the host may adopt gate by gate, each with its own register row — until adopted a map-feed reading only; patrol coverage re-priced through its one distance reader, read by outcome rolls only, any route choice reading it through its belief (the known world), and the crossing holder likewise; the sway as an advance-head overlay (fixed for an advance, at most one advance stale, stamped with its revision on its overlay version axis, its own live occupation, relationship and closure reads overriding it at a hop); the border segment and the typed place as a hearing card's "where" — a field battle placed at the settlement its record names where it names one, and a border segment offered where it names none touching its owner-gated field-battle place question, lit only on its owner's word; the seasonal sets; route facts as overlays, with a water edge's limits on request (the shallowest navigable depth, the narrowest width, the freezing quarters; V13 §3.11.6), offered for a lane capacity the host does not yet read (its lanes carry one fixed capacity no router consults); flood exposure for a world from this module (its calamity exposure reading the terrain word H14 derives from the charter — a riverside or coastal word already weights it — and, only if the host chooses a finer reading, the settlement's physical record's wet-season flood share, a declared shift); aerial legs; the canon's causes as receipt parents; a hemisphere lag | M-W2; H12; H13 |
| H17 | with M-W2 | the presentation messages: movers and embattlement phases, projected for the audience; the DM's believed view where belief is recorded; optionally an audience's known political events | M-W2; H4 |
| H18 | before the fork retires | phase 1: every saved map's capture frozen with its export (on the owner's next open and by a headless batch to a published deadline, public gallery rows first; verdicts confirmed, absent with a witness, or changed); legacy re-canonize reads the stored capture; satellites' cells translated once to world points under a confirmed verdict | M-W3 (the 1.114 adapter); H1 |
| H19 | after M-W3 | phase 4: an elective, premium, receipted rebase per campaign with its forecast diff (V13 §11 Q1); share codes gain a geography-source axis; custom-backdrop campaigns an elective trace-a-world path; its map surfaces re-pointed (the territory lens stays on the seat territory, H5, and the sway is drawn by a new lens under its own registered name — the allegiance lens, its owner's choice; roads → the map feed's paths; travel rings → its own bands; travellers → the overlay; the charter road card → its edge's path) | M-W3; H5; H6; H18 |
| H20 | at H18's deadline | phase 5: the fork, its content-security policy, origin, hash manifests and validation gate retired; blobs and exports kept read-only for a stated retention; every geometry-1 record kept forever | H18 |
| H21 | any | the audit's unknowns: the modified upstream source, the missing design documents (among them its reference-map weave volume, its map program's generation specification and fabric charter, and its open-decisions register, none read by the map's reviews), the production frame size, other snapshot versions | — |
| H22 | with M-W2, for new campaigns only (after H7 and H12) | a world from this module **canonized at the campaign's birth** (J384 (6); J386): the first canon adopted as the campaign is created, its scale stamped by H7's rule and its genesis network laid at birth (H12), so the canon-gated lanes its rules light run from its first week — on the host's birth defaults the crisis columns, the plague front and the routed supply links; rite adoption, pilgrim catchments and booms only where its rules carry them (an applied preset, never the birth defaults alone); beliefs only where it records belief — and every lens's regime starts on the canon; **this module asks that every** new campaign on a world from this module be so born, whatever its tier (J386) — the host's canonize entitlement not gating the birth canon — while a re-canonize and a retcon stay the premium DM's act; whether to lift that entitlement for the birth canon remains the host's choice, stated with this row, and where it keeps it a campaign born without the entitlement opens its lenses in their uncanonized regimes, the banner saying why; every existing campaign untouched (its genesis kept; its own canonize stays the DM's act); until V13 §11 Q4 is answered, new campaigns are born uncanonized | H5; H7; H12; V13 §11 Q4 |
| H23 | with M-W5 (its first step) | the **lens window** after every advance, undo and resume (`lensWindow`, V13 §3.11.6), beside the events window: per advance, for each lens, the ledger rows it already keeps — its plague records, faith mixtures with each deity's local standing, each settlement's suppressed creeds (DM only), carriers, places and hierarchy, its realm piety, its realm ranking of its deities (tier, seats, wins, losses) and its conversion-fracture footprint, each settlement's economy as its dossier judges it (production, needs, exports, imports and services — each good by its catalog key as its supply links key it, with its own label and whether the key was read loosely, its category, its shippable flag and any transit flag — and its food import coverage (its import coverage over its raw deficit, as a percent it computes) with any stressor's cut in force; J380), each settlement's adopted and imposed rites with their origin and year, channels, supply arrivals with each link's input good, its finite stocks' bands, inbound and outbound throughput and entrepôt records where they run, named travellers' journeys, netted transfers, columns and its seats' head counts, and its alignment reading (H30) — and, where it chooses, the values its own laws compute on the window for the lenses' host-derived marks (each live plague node's next-hop chance per carrier link with the destination's onset chance; each carrier link's faith pressure per deity and each prescription's pressure; each settlement's population trend sign, ruler-and-people tension and crisis disorder; each grand rite's pilgrim draw (the seats it reads, which it computes and drops today); each pair of patrons' quadrant class), each labelled with the law that computed it; each row with its resolved audience (a row without one is folded DM-only), and a party set of believed rows where it records belief; its **resolved regime** with every window (born or applied, the canon marker, its frozen record's sea-lane, teleport and seasonal slots, each lane lit, a deity seated, a plague live, belief recorded, its intensity), so no lens reads a regime from a preset's name; the interior weeks of a multi-week advance, or a compact per-week delta log; once, at first bind, its kept per-advance pulse records (their population deltas and outcome severities); and, in the events window (H9), the dated events each lens reads — plague arrivals and realm arcs, conversions, booms and busts, stopped festivals, purchases and ransoms, resettlement donors, moral reckonings, column departures and arrivals, patron falls with the fallen deity and the cause, its deities' rank arcs, rite adoptions and imposed rites with their origin and the week each took effect (the host keeps the year only), relief and credit with their giver | M-W5; H4; H9 |
| H24 | with M-W5's plague step | the plague asks: the source seat's key on each materialized plague record and on its arrival event; a bounded front history (a receipt per hop: source, carrier, weeks, onset outcome); the road season read in its display's weeks-away; an arrived plague writing its condition where it lands (the condition gap closed), with its condition loop capped as its famine loop is; a settlement missing from its frozen record read as "no spatial delay known", never one week; its ledger's plague obligation mapped to its one plague type; each crisis served as netted transfers or as columns, never both | H23 |
| H25 | with M-W5's sway and patrols step | the sway and patrol asks: its strength order in the polity window (H13) and, where it chooses, per adversarial pair its stronger side or tie by its own comparator; a raid's outcome word and, where known, its place (or its pair, placed by `borderSegment`) — the word that makes a raid a verdict (V13 §3.9 (11)); tier changes as dated facts, and whether a promotion writes the settlement's tier label; patrol coverage given a host meaning (a producer for its road-warden and road-predation pair kinds, or coverage as its embattlement's security input, H16); a DM-cut road's closer named, and its caravans reading the cut or the cut labelled propagation-only in its own interface; whether a DM-confirmed war-front channel can embattle a settlement with its war layer dark; its sea-lanes switch's copy corrected (it governs fleets and blockades, while its caravans, its refugee pricing and its plague latency use the frozen record's lanes whatever the switch says); what its culture distance's "same governing name" term means — a government label or a real overlord — with its header corrected | H13; H16; H23 |
| H26 | with M-W5's trade and populations step | the trade asks: a shipment's path and departure week stored; caravan arrivals, starvations and entrepôt foundings emitted as news, and each seizure at a route's worst intermediary settlement (its gate, the good, the take) as a dated row of the events window (DM-only), not a world-news entry; settlement keys on purchase news (read by the prosperity lens too) | H23 |
| H27 | with M-W5's trade and populations step | the population asks: each column's dispatched route and its carriage (land, sea lane or circle) and its toll (departures, deaths at the origin and on the road) stored; the origin named on its arrival rows and each population delta's own reason kept in its history; columns dispatched when a queued emigration, a terminal death or a forced abandonment is approved | H23 |
| H28 | with M-W5's religion step | the faith asks: the deity key and the strongest carrier's source on each faith-front mint and each conversion receipt, and a mint retired when its carrier ends; a share history, or a dated share-change receipt, per settlement pantheon; its faith prescription's rows (presser, target, weight) and its moral institutions' abolition and founding news with the presser named; its own command adopting a DM-placed holy or hidden cult site (V14 §2.2's `devotion`; J384 (10)) | H23; V14 §11 Q2 (its site record) |
| H29 | with M-W5's prosperity and alignment step | the prosperity asks: a band-change receipt (settlement, from, to, writer, week), a boom's sustained rungs included; a distance term in its resettlement donor pool, or the honest word "the realm's richest" in its own text; the founding band frozen for town drawing (its town layout and district wealth word re-read the live band) | H23 |
| H30 | with M-W5's prosperity and alignment step | the alignment asks: a per-advance alignment reading in the lens window (both axes and their bands by its own law, the aggression chip word, the top constituent causes), published as its faith projection is; its moral drift's compounding decay, and its freeze outside belief worlds, fixed if the host so chooses (a defect its alignment read found; the lenses replay nothing, they scrub plates, V13 §5.8 (8)); a week on each tolerance offset's causes | H23 |

Phases 2–3 are the map's (the import on request, never on load; a legacy campaign's world view with no write to its
simulated state, its overlays converted through its stored capture and the import's transform). Its schedule is the
owner's question (V13 §11 Q2).

## 9 Decisions (J-V13.n; each "chose X over Y because Z"; vetoable under the delegation)

| id | decision |
|---|---|
| J-V13.1 | chose one package `@plat/world` between `@plat/tables` and `@plat/site` with the hydro core lifted into it over a package above `@plat/site` because the frame's water state must call the same flood, D8 and accumulation the world runs, and §14's dependency direction admits no cycle |
| J-V13.2 | chose two coordinate regimes (integer world cm on rasters and a graph; the frame's cm kernel unchanged) joined by a placement transform over one global arena because item 131 (b) rules the world is no plat arena and K13 keeps elevation out of the kernel |
| J-V13.3 | chose the version table as `WorldRecipe.snapshot` (every table version read, the generator's output version, the schema) over a per-stage version list because one frozen record is what a re-derivation and a migration diff read |
| J-V13.4 | chose a `world` product with stages W0–W9 and P1–P5 in the registry over a special-cased generator because §4.12's registration, §4.1's ordering and §6.1's streams then serve the world unchanged |
| J-V13.5 | chose that a placement writes nothing in a frame but `worldRef`, `Recipe.charter`, the datum and the orientation terms over re-basing the arena because bar 3 requires no arena digest to move and the owner's rule says the settlement never changes |
| J-V13.6 | chose the resolved op list as the world's authoring history (a world re-derives from its ops, never from its template name) over storing the template and re-drawing because an edit then appends an op and the recipe stays the one input |
| J-V13.7 | chose resolution-independent ops in metres with position-keyed noise over cell-count-keyed parameters because a world must give the same ground at every rung and after an extent change, which removes the reference's two cell-count-dependent decays (as evidence, `FMG-survey.md` §"The physical pipeline") |
| J-V13.8 | chose coastline fractalisation as a view-time displacement over geometry because the DEM is the one truth and a displaced coast would contradict the flood's sea cells |
| J-V13.9 | chose one priority-flood implementation for the world and the frame (lifted, same tests) over two tuned copies because the charter's boundary conditions only agree when both sides run one algorithm |
| J-V13.10 | chose one stage-2 iteration of W6 over iterating to convergence because the spike's bar (< 2 % of seats change) makes a second iteration cost without value, and determinism is simpler with a fixed count |
| J-V13.11 | chose the Urquhart graph over the full Delaunay triangulation for route pairs **on a standalone world** (a host-bound world lays the host's genesis edges, J-V13.79) because it drops the long edge of every triangle, which gives fewer and more plausible roads without a tuned cutoff |
| J-V13.12 | chose to refuse the continent rung on the low tier (the realm offered) over streaming rasters because §12.8's worker ceiling is a declared limit and a streamed DEM would make every stage's law non-linear |
| J-V13.13 | chose the coherence cost's weights with the coast first and the river second over an equal weighting because the owner's correction (3) (V13 §1.3) resolves a coast mismatch by the bearing first, so the coast must dominate the search (C13-41) |
| J-V13.14 | chose the blend band as a smoothstep ring with a widening rule over a global relaxation because the settlement's ground is replaced inside and the cost of the band is reported, never hidden |
| J-V13.15 | chose the charter emitted both ways with the frame storing only the one its generation used over one charter record because a frame's recipe must never name facts its own generation did not read |
| J-V13.16 | chose the groundwater field as a multi-source Dijkstra with a per-cell gradient over an analytic distance law because permeability varies per cell and the queue is the cost of accumulation, already paid |
| J-V13.17 | chose flood as a level-set spread with barrier edges over any flow model because walls, dykes and quays then behave and no fluid dynamics is needed (J-V13.43) |
| J-V13.18 | chose the water class test as one function over a per-volume rule because bar 12 asks for one test per storey, by share and by route, and the clerk reports from its stored result |
| J-V13.19 | chose two verbs on `EditBase` over a separate history edit kind because every terrain and water edit of the base already exists and gains the verb without a new tool |
| J-V13.20 | chose the cascade as a dependency-ordered chain of §7.3 local operators over a whole-document re-derivation because the dirty set is one watershed and the chain replays at the same log position |
| J-V13.21 | chose the counterfactual fork as a document copy with event replay on commit over a branch in the log because the canonical log must stay byte-identical when a fork is discarded (bar 8) |
| J-V13.22 | chose reason records persisted in the records digest over rebuilding them from provenance because the clerk's `whatChanged` needs the superseded chain, which provenance discards |
| J-V13.23 | chose the glyph as a per-level generalization re-made by the frame's commit hook over drawing the frame's arena at world scale because the world page must render a continent of glyphs and the settlement opens as another page (the owner's correction (2)) |
| J-V13.24 | chose the mirror as a placement flag applied by every world-facing transform over mirroring the arena because the arena never changes (bar 3) and the DM's explicit choice is warned once |
| J-V13.25 | *superseded by J-V13.63 – J-V13.65 (file m, 2026-10-17)*: chose W8's typed-cost flood with budgets from the host's seats over the host's own polygons because the host has none at the map's resolution and a flood from seats is one deterministic pass |
| J-V13.26 | chose the adapter's schema file as the one home of the reference's property names over naming them in the exporters because §17.1's clean room admits data, not source, that carries another product's vocabulary |
| J-V13.27 | chose the import's rivers, routes and lakes to be re-derived and matched over trusted because our hydrology is causal and the import's is drawn, and the match keeps the names |
| J-V13.28 | chose a five-by-five biome matrix with overrides, as data a world may replace, over a fixed biome list because our thirteen rows then map onto V11's `ClimateRow` keys through one table and a world's author may re-cell the matrix (C13-60 (c)) |
| J-V13.29 | chose the hydraulic geometry's public exponents with our own coefficients over the reference's width law because the exponents are physics and the coefficients are calibratable cells |
| J-V13.30 | chose a province partition by a second budget-free flood inside the territory over the reference's cell-count split, **on a standalone world only** (a host-bound world invents no province; its member sways are the divisions, J-V13.63), because provinces then follow the same cost law as their territory |
| J-V13.31 | chose per-document undo stacks with the world's placement writing the frame through a port-style session over one shared stack because a frame's user must not undo the world's placement from the frame |
| J-V13.32 | chose the sea's tidal range as a scalar on the surface over a tidal model because the mudflat band and the harbour depth are its only readers |
| J-V13.33 | chose a position-keyed fBm lattice on placed frames (the world's seed and the cell's world position; BCR-V13-29) over the town root's key because item 135 (c) asks that neighbours agree at a shared edge unseen, which only a field keyed by where a cell is can give (C13-05) |
| J-V13.34 | chose that the frame makes its own glyph marks (`glyphOf` in `@plat/layout`) and the world only transforms them over the world reading the frame's layout because §14's dependency rule forbids `@plat/world` importing the layout packages (C13-35) |
| J-V13.35 | chose A\* confined to a cost ellipse over a bounded-box Dijkstra for W7 because a Dijkstra explores by cost, not by box, and the drop rule already bounds the answer (C13-36) |
| J-V13.36 | chose the flood spread on the height raster with barrier chains rasterised onto cell edges over the hydro grid because a quay or dyke inside one hydro cell must still block (item 137 (g); C13-12) |
| J-V13.37 | chose a two-tier `nearestLawful` (36 bearings and the two decisive terms, then the full six on the three best) over the full search at every origin because 1.7 × 10⁸ station evaluations cannot meet 600 ms (C13-37) |
| J-V13.38 | chose that a host's demand proposals are transient answers over persisted entities because no log event creates them and a replay could not rebuild them (C13-22) |
| J-V13.39 | chose P1–P5 as §7.3 local operators of the placement edits with one stage id over stages of the product's set because `generate` runs every stage of the set and the base has no phase it skips (C13-27) |
| J-V13.48 | chose that every stage re-derives over an imported map (lakes, rivers, routes and territories matched to the re-derived ones and kept as edited attributes or provenance) over trusting the import's drawn facts because our hydrology is causal and the import's is drawn, and one statement of the adapter is the only buildable one (C13-06) |
| J-V13.49 | chose one reason record per raster chunk with cell reasons re-evaluated on demand (`whyCell`) over a record per cell because 9.2 M biome reasons would be a gigabyte against a 2 MB record budget, and the rule function is pure (C13-07) |
| J-V13.51 (SW-01) | chose that V13 owns the suitability slot (`SuitabilityTerm`, `SuitabilityContext`, `terms.register`, `score`) and its eight generic terms while V14 owns its purpose terms as plug-ins, over defining V14's seventeen formulas here, because one registry cannot hold two definitions of one id and the purpose rows are V14's domain; the world-site term is `destination` with `reach.siteKm` |
| J-V13.52 (SW-02) | chose that V14's R1–R4 own the 2.5D view of every document, the world included, with §5.7 supplying the world's drawables and their `ZDecl` rows, over a world-side projection, because item 141 (a) asks for one projection family over the whole architecture |
| J-V13.53 (SW-03) | chose no random or jitter term anywhere in siting, with one deterministic tie-break (lowest cell index, then lexicographic id), over a controlled jitter, because item 132 (b)'s "derived, never random" extends to siting and a draw inside a score is a comparator with randomness |
| J-V13.54 (SW-05) | chose a transient, record-less `charterFor(world, TransientPlacement)` over a recorded placement for a crop frame because a crop is a view read and must leave the world untouched |
| J-V13.55 (SW-06) | chose `WaterSurface.kind 'site'` with the connected-set walk over site parts and vertical links over a V14-side water model because one classifier serves every scale (bar 12) |
| J-V13.56 (SW-07) | chose a world event index of host-delivered `WorldEvent` facts (stored, indexed, never generated here; delivered as windowed replaces, J-V13.69) over generating events because the host owns its political and military facts (item 131 (b)) and item 132 (e) needs them at a point |
| J-V13.57 (SW-08) | chose a generalised `Glyph` with the site's marks made by `@plat/sites` and placed by the world over W9 reading a site document because §14's dependency rule forbids it (as for frames, J-V13.34) |
| J-V13.58 (SW-09) | chose culture from the host's seats or the recipe, spread by W8, over a V14 raster because V14 has none |
| J-V13.59 (SW-10) | chose a `placed` outcome row published as `world.placed`, which `@plat/sites` answers with its own adoption, over V13 calling V14, because `@plat/world` sits below `@plat/sites` |
| J-V13.60 (SW-11) | chose that a site's placement lives in the world document as a `Placement` keyed by the subject id, the site document holding only a `placementRef`, over a placement field on the card, because bar 3 holds for every subject |
| J-V13.61 (SW-13) | chose one merged union text for `Recipe.product` and `StrategyRegistry.products` (`'world'` and `'site'`) carried by BCR-V13-5 and -7 over two requests on one line because the coherence pass applies one text per line |
| J-V13.62 (SW-14) | chose a milestone M-W0h for the frame-side water state after M4 beside M5 and before M6-U, over keeping it inside M-W1 after M-SF, because V04 and V14 read the classifier from their first milestone |
| J-V13.50 | chose dossier facts as hard placement constraints (the `dossier` term at weight ∞; `refuse.charter.dossier`) over a precedence rule that lets the world amend a dossier fact because item 20 (h) makes the dossier the one source of truth and a placement a map fact; the host moves its placement or amends its dossier — vetoable, no owner question needed (C13-08) |
| J-V13.40 | rejected a re-sampled cell graph for the world (the reference's two-graph mesh) in favour of rasters and a graph because every stage's law is then linear in cells and the raster is what the heightmap and the DEM edits need (C13-50) |
| J-V13.41 | rejected tectonics because the recipe's ranges and troughs give the authored control the owner asked for; a tectonic pass may later be one op emitting them |
| J-V13.42 | rejected erosion over time (the `erode` op reserved, shipped absent) because causal necessity is not shown and a non-deterministic-looking valley would need its own tests |
| J-V13.43 | rejected fluid dynamics because every reader (flood, class, route) is served by a level set with barriers |
| J-V13.44 | rejected a sphere now because the campaign's extent is a bounded region and the latitude box gives climate its one spherical input |
| J-V13.45 | rejected an economy or military simulation in the map module because they are the host's (item 131 (b)); the map materializes their spatial footprint only |
| J-V13.46 | rejected FMG embedding or a second fork because item 138 (b) forbids it and the adapter plus the exports cover the ecosystem's needs |
| J-V13.47 | rejected placing a standalone neighbourhood document because it has no frame, no datum and no edge of its own (V01 §3.10.1) |
| J-V13.63 | chose **two partitions** — W8a the seat territory (the host's total nearest-seat partition, frozen, in the canon, changing only with the host's membership) and W8b the sway (the host's political facts projected over the terrain, revisioned, in the map feed) — over one partition, because the host's crossings, all-pairs costs and tiers ride the seat territory and politics would sever travel and move every week; budgets and cost vectors are retired from the port |
| J-V13.64 | chose **the strength law in the log domain, integer and draw-free** (L = Λ − t ÷ τ, τ growing at least ×1.5 per tier and scaled by size, prosperity and the chain bonus, the reach capped per tier; a navigable river adding its own crossing time; culture slowing the projection by the host's own culture distance in its plain form over its whole vector (no trade tie, J384 (2)) — a measure not purely cultural, held through an occupation — and water carrying it only along the host's lit lanes to a coastal lodgement, J382) over an exponential decay evaluated per cell (reach only linear in tier, and a transcendental per cell), budgets in cells (rung-dependent) or a filled partition (against the owner's upper limit) |
| J-V13.65 | chose, **on the tension between the host's frozen territory and live politics**, borders that move only on dated host facts through one receipted revision per week over a dirty box, with dwells against flicker, on their own axis, and the host's crossings left on the unweighted partition with an optional per-crossing holder reading — over crossings from the weighted partition (severs travel, re-tiers, re-pathfinds), crossings as live overlays (re-pathfinds the memoized graph), continuous re-derivation (flicker and per-tick cost), a host re-canonize per political event (re-freezes geometry for politics), and borders with crossings left alone and no holder reading (it gives no reading the host could adopt; whether enforcement reaches a toll is the host's own re-ruling of who keeps a gate); a host reads the sway only as an advance-head overlay |
| J-V13.66 | chose **patrols derived, never rolled** — a cadence of 1, 4 or 13 weeks per route segment and power, the host's road watches first, presence on a fixed phase per (segment, power) so a patrol passes exactly every 1, 4 or 13 weeks, map-tier presentation offered to the host as an extent and its basis, never as a time, and never imposed — over a float coverage, a weekly roll, a map mounted speed or patrols as host bodies |
| J-V13.67 | chose **neighbour classes from the host's relationship-state labels (the plane its simulation reads), decided by the local pair**, with a debatable land only between adversaries within the civil margin, and **the chain of vassals as an allegiance graph** (members its vassals, the occupation's vassalized rung and puppet seats; tributaries, bound by a live tribute term, outside; compelled allies respect; a treaty-held occupation an overlay — the host's own subordination set so drawn three ways, a divergence recorded and vetoable) with continuity in two passes from the host's verdict or the reinforcement band, a bounded chain bonus that grows the overlord's own reach, and exclaves kept — over the roots' relation (invents a vassal's war), one flood with relation-dependent costs, frontier-only reinforcement (misses the owner's chain clause) or unbounded summation (a snowball) |
| J-V13.68 | chose **military strength as the tie-breaker only** inside the debatable land, garrisoned sites as held points, field armies as presence, and fights as dated hold bands decaying by a season with a fighting overlay that never moves a line — over additive military everywhere (the owner's ceiling), live per-tick armies, or a re-derivation on every engagement (weekly flicker) |
| J-V13.69 | chose **the windowed replace** for every recorded host input (after every advance, undo and resume the host's live set for a window keyed by host keys with its nonce, or its history sequence while its advance epoch is dark) over per-key retraction (the host would have to remember what it sent) or rewinding the world's log (destroys the DM's edits) |
| J-V13.70 | chose **the port consumption law** — the port replaces the host's capture of the reference generator, never its frozen record; nothing the host simulates calls the port inside an advance; answers are baked with their stamps; a new canon is adopted only by the host's receipted re-canonize — over the port replacing the frozen record or live reads, because the record is the host's per-tick substrate and every lived ledger is keyed to it, and a live read would make a lived history depend on the world document |
| J-V13.71 | chose **two feeds and a canon of slots** (the simulator feed integer, closed-vocabulary and versioned per slot with input hashes and causes; the map feed geometry and presentation, never persisted by the host) with the host keeping its own all-pairs costs, tiers, candidates and water-lane law, over one record with optional presentation fields, the port emitting the all-pairs matrix (two implementations of one distance law, an N² product against the host's cap), a resampled pack in the reference's shape (a second lossy geometry whose cells would become lived keys) or the path-dependent `costTotal` |
| J-V13.72 | chose **the scale as a declaration** (the world header; the host stamps its own unit's kilometres) and **effort, never weeks** (integer land effort-metres with water metres apart; the host's travel law handed in as data; every map time labelled and stamped), over a per-world float scale, carrying the reference's slider, emitting weeks (a second clock) or a map speed table (two physics) |
| J-V13.73 | chose **the host's cost-law values in this volume's schema, tagged time or choice, split from the map's lay rules**, with time stations on every route, over the map owning the law (a library update would move the host's times) or porting the host's first law verbatim (its inputs do not exist natively) |
| J-V13.74 | chose **the world supplying the geography half of the host's port rule only** (`WaterAccess`; latent water candidates; W6's promotion a suggestion on a host-bound world) over the map computing the port verdict (a second writer of the host's fact) or a port boolean |
| J-V13.75 | chose **the forced-fact precedence by the placement's stamp** (world: dossier > the DM's locks > the charter's boundary facts > tier priors > terrain plausibility > the draw; settlement: dossier > the frame whole > world facts as derived readings), with `W_EDIT_DOSSIER`, over the fabric volume's ladder verbatim (world facts below tier priors break realm coherence) or one ladder for both stamps (existing towns re-derived) |
| J-V13.76 | chose **politics read once into the charter** (`polityAtCharter`: the culture and the revision only) and the frame's live political context as a derived reading, the coherence term scored once at the placement edit, over a live territory row in the charter (every border revision would stale world-stamped frames) |
| J-V13.77 | chose **host facts carrying the host's resolved audience** (DM-only withheld with its geometry; hidden never sent; unresolved DM-only) and a player picture re-derived over the whitelisted or known political facts, over a public default (leaks the DM's sieges) or a map-chosen secret default |
| J-V13.78 | chose **one word, one meaning across the seam** (territory the seat territory; sway, allegiance, debatable, held by force, unclaimed, exclave, fighting, sway revision, member force, road patrol, border post, lodgement, keyframe, outranked, a lens's per-advance record a plate and the lens over the sway the sway lens; no bare march, gate, embattled, epoch, levy, contingent, foothold, checkpoint or claimant as a token, no lens record called a snapshot or a frame, and no territory lens over the sway) over prose qualification (code reads records) or renaming the host's landed words |
| J-V13.79 | chose **the host owning the genesis network's topology and grades and the world its geometry** — W7 laying exactly the host's genesis edges at world birth and mirroring its lived changes, nothing moving a bound route silently — over W7 as the genesis (a rank law replacing the host's access-graded one) or two selections side by side |
| J-V13.80 | chose **edits on a host-bound world under the host's decree law** (held while it advances or is parked; dated at its next tick head and offered; sealed when consumed; retcons only as its receipted re-canonize; political and military kinds refused, the host's own command opened, no message proposing one; forks silent) over free retcons under a lived history or a shared undo stack |
| J-V13.81 | chose **the import reading what the host actually has** — a pinned adapter for the host's fork's own export beside users' files, the unit per file, no silent rescale, one stated y-flip, the host's placements as a recorded import request, the file's states and cultures never steering a host's snapshot — and **the transition in phases** (capture first, import on request, a legacy world view with no write, an elective rebase, retirement with every frozen record kept) over a version floor that refuses the host's whole estate, a clamp, an implicit flip, or forced migration under a geometry change (rewrites lived futures) |
| J-V13.82 | chose **the seasonal curve on the host's calendar** (the hottest week 23 in the calendar hemisphere, 49 in the other; seasonal states as 52-week sets keyed to the host's week of year, every multiplier the host's) over a January-first phase on a spring-first calendar (frost in the host's spring) or clamping southern cells (falsifies the climate) |
| J-V13.83 | chose **prosperity relative to the realm's held median rung** — clamped to ±3, read only at revisions with the 13-week dwell, the median itself held by its own dwell and moving the whole world in one revision (J384 (1)) — and **log-linear size and prosperity factors** (1.15 per size third, 1.1 per relative rung), so the reach is exponential in tier, size and prosperity as the owner's words ask (J385), over the absolute rung (the host's band ratchets upward realm-wide, so every reach would inflate together over the years), continuous re-reading (borders move only on dated facts) or arithmetic steps (exponential in tier only) |
| J-V13.84 | chose **the adversarial push deferring to the host's own strength order** — the two sides compared on travel time at the steeper fade (the smaller τ of the two), the host's stronger side gaining `margins.pushPerBand` per band of its order (its own fifths), level while the host sends none — with the map's projection keeping each side's reach, floor and ceiling and the map's vassal reinforcement moved out of the push into the military tie-break (J384 (3); the host's comparator has no chain term), over the map's τ or its reinforcement deciding the push (two systems deciding one contest, and the map giving a march to the side the host's own raids treat as the weaker) or showing the disagreement only in the cell's why (a pair inside one fifth reads level though the host may still rank it — its own tie margin is narrower; the host may send, per adversarial pair, its stronger side or tie, H25) |
| J-V13.85 | chose **satellites sent with the polity facts and drawn at their frozen site points**, projecting their own small reach inside their parent's allegiance, never chain members, their people out of their parent's size third (J384 (11)), over counting parent and satellites as one size (a satellite counted twice) or drawing them on an orbit ring (a cosmetic ring slot the host draws by, not the site it sampled) |
| J-V13.86 | chose **a raid without the host's outcome word as a fighting mark that moves no line, and a raid with one as a verdict** (its winner +1 at the victim's facing segments) (J384 (5)), with the host's embattlement phases drawn only through its presentation overlay, never as a march mover, over reading every raid as won by its aggressor (an outcome the host does not compute) or embattlement as a verdict (a pressure, not an outcome) |
| J-V13.87 | chose **one `LensLayer` record and one drawing path for every lens** (identity, sources with gates, regime, elements with fact classes, events, legend, scrub, refusals, why), the sway and patrol layers its first rows, over a code path per lens (eight legends, eight audience filters and eight scrubs that would drift apart) |
| J-V13.88 | chose **the honesty rule** — the regime banner from the host's resolved regime before the picture; a lens whose gates are false shown still with its reason, collapsed in the picker, never hidden or extrapolated; the host's built biases and the DM's authorship said (J384 (13)) — over hiding a dark lens (the DM could not learn why nothing moves) or extrapolating motion the host does not run |
| J-V13.89 | chose **four classes of host mark and only four** (host-stored; host-derived only as the host computes and sends it by its own law, labelled, never a host function the map calls; placement, labelled where it is a guess; the owner-ruled projections, labelled and offered, never the host's truth), the DM's own world sites beside them, and a refusal for everything else, over map-side recomputation of host laws (a fourth copy of readings whose host copies already disagree) or interpolated fields (every host system is settlement- or pair-grain) |
| J-V13.90 | chose **the lens window as a presentation input kept as plates** — never logged, never in a digest, the canon or a reason chain, read by no stage, sway, encounter or clerk — over a recorded input (the world's log and digests would move with presentation facts the host revises freely) or live reads only (no scrub: the host keeps no history) |
| J-V13.91 | chose **plates in a cache of the world document's own** (`Document.lensPlates`, BCR-V13-38) — one per host advance, delta-coded, 520 weeks at full resolution then one per 13 weeks, DM-pinned plates kept, dropped after a host rewind, a cache the host's quota may drop (J384 (9)) — over a store outside the world document (lost with the campaign's world), the base's `derived` caches (rebuilt from base + log on load, which a plate cannot be), every advance forever (unbounded) or plates in the model digest (a picture moving the world's identity) |
| J-V13.92 | chose **the audience filter fail-closed** (the DM by default; an unresolved row DM-only; a player sees the host's public rows and, only where the host records belief, its believed rows; covert things omitted, never greyed) and **no player view of the alignment lens** (J384 (7)), over a public default (leaks the DM's truth) or a believed view the host does not keep (any player alignment view would leak the truth) |
| J-V13.93 | chose **the build order plague, the sway (territory) and patrols, trade and populations, religion, prosperity and alignment** (J384 (8)) — plague the proving lens: one sparse ledger with phases, a source, two forward weeks and the host's own player and DM split — over the sway first (its layers exist, but the sway is the map's own projection and exercises the mechanism's honesty, audience and scrub least) |
| J-V13.94 | chose **two movement grammars** — dated links for netted same-week transfers, moving markers placed by a host clock for clocked movers — and **every column class drawn**, the port and teleport columns the host's own overlay hides included, styled by carriage where the host sends it (else by its endpoint test, labelled "likely carriage") and DM-only by default (J384 (12)), over one grammar for both (teleports drawn as walks, columns as jumps) or the host overlay's shortcuts (hidden classes, re-derived paths, positions by the current season) |
| J-V13.95 | chose **holy places and hidden cult sites only as DM-placed world sites tagged with a deity** — DM-only by default, offered to the host for adoption — beside the host's own faith-place labels at their settlements, with the host's religious hierarchy drawn first (J384 (10)), over generated holy sites, pilgrims or missionaries (no host fact) or no positioned faith places at all (the DM's campaign wants them, and the deity tag is a map fact the host may adopt) |
| J-V13.96 | chose, **on who keeps a gate under the sway**, the host's intermediary settlement until the sway has passed its soak, the crossing holder then offered as a per-gate policy the host may adopt (J385), over the crossing holder at once (a gate drives tolls, interception and contraband every tick, and the sway is a projection not yet soaked) or leaving it an open question (the owner's pass-and-trade principle is honoured by the later offer) |
| J-V13.97 | chose **the patrol cadence moved one rung by the force band of the source its round trip is measured from** (`forceShift`: a seat's force band, a fort's or watchpost's garrison band, else its holder's; none while the host sends none for it), carrying the owner's "military strenght to enforce" into the patrols, over a cadence from garrison distance, hostility and grade only |
| J-V13.98 | chose **the host's standing claims kept in the polity facts with a reader** (its lineage claims; a DM-view claim outline that moves no cell) and **`outranked` for a third allegiance at a cell**, the host's landed word for an heir left alone, over striking the field (the host computes seat-on-seat lineage claims as a war reason once its lineage lane is lit, and the DM wants to see them) or keeping *claimant* (one word with two meanings across the seam) |
| J-V13.99 | chose **a bypass mirrored in the lived network** (the host's detour round a seat it avoids, re-laid as a dated lay version under the same host key, the hysteresis the host's) over leaving bypass geometry to the host alone (its detour would have no world path) |
| J-V13.100 | chose **to ask for a world from this module canonized at the campaign's birth for every new campaign** (J384 (6); J386) — its genesis network laid at birth and its scale stamped by H7's rule, whatever the campaign's tier (the host deciding whether its premium canonize entitlement gates it; where it does, a campaign born without the entitlement opens its lenses in their uncanonized regimes, the banner saying why), every existing campaign untouched, a re-canonize and a retcon the premium DM's act — over asking only for a birth canon that follows that entitlement (every other new campaign's lenses would open in their uncanonized regimes — plague a footprint, populations netted, trade relations only — though the native world is the canon from its first week), the premium canonize as the only route to the canon, or a new owner question (the owner delegated it, J384) |
| J-V13.101 | chose, **while the host sends no force band, a host fight verdict's hold band alone breaking a debatable tie** — the side whose `MarchHold` band on the segment leads the other's by at least `margins.mil` bands holding the segment's debatable cells by force until the band's decay brings the lead below that (J386), a lead read in hold units, so the civil regime's threshold (0.5 L at the default cells) is below the enforced regime's (`margins.mil` × `margins.muPerBand`), the first window carrying force bands a revision that re-reads every verdict-held cell, and a band crossing while M is dark inside the revision's dirty box — so that only a host verdict moves a march line in the civil regime — every preset's until the host sends force bands — as in the enforced one (J384 (5)); in the default preset, whose war layer is dark, no host verdict exists until H25's raid outcome word, so there it changes nothing today — over stating that no line moves in the civil regime until force bands are sent (a field battle the host decides where its war layer runs would leave its march unmoved) or reading a raid without its outcome word as a verdict (an outcome the host does not compute, J-V13.86) |
| J-V13.102 | chose **the trade lens's first rows to be the owner's own words** (J380: "imports, exports, production, consumption, of goods and services") — each settlement's production, needs, exports, imports and services and its food coverage as the host's dossier judges them, every good keyed by the host's catalog key as its supply links key it, with its own label, its category and its shippable flag as the host sends them (`LensGood`, the adapter folder's goods table), drawn under every regime as glyphs and a ring at the seat, food never drawn moving and a service never moving, a supply arrival captioned with its good, public where the dossier shows them; the finite stocks, throughput and entrepôt records where the host runs them on the canon — over channels and arrivals alone (the lens would draw who trades with whom and never what), goods keyed by their labels (the host reads one good under several labels and ships some service exports as goods) or production drawn as flows (food and services never ship; the host keeps no flow of them) |
| J-V13.103 | chose **the religion lens drawing the host's two rankings and its piety** (J380: "local and global diety rankings and a global piety system") — each settlement's mixture with each deity's local standing; the realm's rank of its deities as the legend's order (the host's tier order, highest first, then patron seats, most first, with wins and losses), public where its allowlist has it; realm piety where its spread lane runs; patron falls and rank arcs as dated events — and **suppressed creeds on the DM's view only** (J379), dropped from every party set at fold, over shares alone (the host ranks a deity by its patron seats, never by adherents: a creed with large minorities and no seat ranks lowest) or suppressed creeds shown to players (the host keeps them as private engine state) |
| J-V13.104 | chose **the host's vocabulary as data and one polarity** (V13 §5.8 (6)) — the host's band, phase, chip, tier, standing, goods, class, cause, arc and act words in the adapter folder's tables, one per lens, drawn as sent, this volume's own strings only its derivation labels, still reasons and notes; every host axis turned by the polarity table to one convention, lawful, malicious and lenient high, the table naming each host axis's own sign — over this volume's own words for the host's bands (a second vocabulary drifting from the host's, and the host's words entering the volumes) or each axis in its host polarity (the host's own axes disagree in sign, so one fill would mean opposite things on two lenses) |
| J-V13.105 | chose **every host fact the lens design read either drawn or listed under its lens as not drawn, with its reason** — drawn: the pilgrim catchment as the host's own set in the catchment grammar, rite adoption and the imposed rite, relief and credit, the finite stocks, throughput and entrepôt records and the patrons' quadrant posture, each only as the host sends it; not drawn in this pass: town-map rows (the settlement frame's), a verdict per intermediary settlement or per traveller the host does not send, a fact another lens already draws (drawn once), population pressure, the founding ground and the settlement bound (values the host does not hold while its demographics lane is dark), the income mix (a card's rows, not a mark), the war lane's plans (not yet asked of the host) and the seizures awaiting their host rows (H26) (V13 §5.9) — over silent omission (an omission cannot be told from an oversight) or each recomputed on the map side (the four classes forbid it, V13 §5.8 (4)) |

**Deferred decisions** (recorded, not taken): D-V13.1 a second resolution rung for the frame's hydro grid under a
charter (finer than §2.3's) if T-V13-13's edge RMS bar fails on steep charters; D-V13.2 a world-scale `erode` op if
M-W2's statistics show valleys too shallow for the riverlands template; D-V13.3 a sea-route cost by wind (the climate's
belts) if the host asks for sailing times; D-V13.4 the sphere, if a campaign ever exceeds the continent rung's extent.
(D-V13.5 – D-V13.7 are §12's.) D-V13.8 **the culture, danger and calamity lenses**, each a later row set of V13 §5.8's
mechanism with its host facts and its gate, taken once the host sends those facts in the lens window and the eight of
J384 (8) have landed: **culture** — the pair's culture band as H13 sends it, shaded on the link between two seats within
reach (class D, the host's plain form over its whole vector; DM; never a culture region, an identity or a culture per
cell); **danger** — the host's embattlement per settlement as a ring (none in peace), its route danger per mover as the
host computes and sends it, labelled with the mover, and the party's believed danger where the host records belief,
gated on H17's presentation messages and the lens window (never a border's or a march's danger); **calamity** — strike
pins at their weeks and the host's relative exposure as shading, never a forecast and never merged with plague. Outside
J384 (8)'s order because J379's proposal named culture and danger as later lenses (trade since taken by J380), no one
asked for calamity, and J384 (8) ruled the order of the eight asked for.

## 10 Base change requests (BCR-V13-n)

Each request names the base's (or the volume's) exact heading, quotes the current text once, and gives the new text in
full; the volume is designed as if every request were applied. Requests to the base are the coherence pass's to admit
(the brief's Part D); requests to a volume (BCR-V13-21 – BCR-V13-25) are that volume's architect's to apply.

**BCR-V13-1 — §14 Package layout: `@plat/world` enters the chain; the hydro core is lifted.**
*Current text* (the package list):
> `@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces`
*New text* (inserted before that line, and the line amended):
> `@plat/world    the world regime (V13): W0–W9, the placement operators (`place/`), the world rasters and records, the lifted hydro core (`hydro/`: the site package's field module with `HydroField`, its priority flood with lake typing by threshold, `resolveFlats`, `d8` and `accumulate` — moved from @plat/site/hydro with their tests, the same names; C13-49), `groundwater/`, `water/` (the water class test), `siting/`, `glyph/` (the `toWorld` placing of marks only), `why/`; depends on @plat/tables and @plat/kernel`
> `@plat/site     S1 terrain, coast / lake / island outline routine, rivers by descent (its river surface, trace, course and carve stay here, importing @plat/world/hydro's field type; the carve gains its delta map, V13 §8.3), islands, bank classes, water faces, the surface and groundwater steps (V13 §3.12); depends on @plat/world`
The dependency rule gains: `@plat/world` imports nothing from `@plat/site`, `@plat/layout`, `@plat/plots` or
`@plat/content` (the glyph's marks are `@plat/layout`'s `glyphOf`, C13-35); `@plat/port/world` is one adapter folder of
`@plat/port`; `@plat/export` reads `@plat/world`'s records.

**BCR-V13-2 — §2.3 `Terrain`: the carve delta, the surfaces, the groundwater field, the datum behind one accessor.**
*Current text:*
> `datumCm: Cm /* the elevation that height 0 represents, relative to mean sea level; one per document (per island for sky terrain); set by S1 (§4.2) */;`
> `seaLevelCm: Cm /* in the datum frame */; wind: { bearingCdeg: number; strength: number }; features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine */;`
*New text:*
> `datumCm: Cm /* the elevation that height 0 represents, relative to mean sea level — the world datum (V13 §2.1); one per document (per island for sky terrain); set by S1 (§4.2) and by nothing else — a placement never writes it; READ ONLY THROUGH `datumOf(doc)` (item 140 M3; V13 §2.2), which on a placed frame answers the world's DEM at the placement's origin read through `Document.worldRef` at call time, a derived reading (C13-01) */;`
> `seaLevelCm: Cm /* in the datum frame; the sea's generation-time `WaterSurface` carries the same value (below) */; wind: { bearingCdeg: number; strength: number } /* S1's write from the site request; read only through `windOf(doc)`, which on a placed frame answers the charter's wind in frame terms through `worldRef` (V13 §3.11.5) */; features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine */;`
> `carveDeltaCm: Map<number, Cm> /* item 140 M2: per hydro cell, the depth S1 (3)'s carve (and every re-route) cut below the pre-carve ground; `preCarveHeightAt(doc, p) = heightAt(p) − carveDeltaCm[cell(p)]`; empty on a document saved before V13 (reported, V13 §4.6) */;`
> `surfaces: WaterSurface[] /* item 140 M2: one surface per WaterBody at generation (the sea at seaLevelCm, each lake at its spill height, each reach's stage profile) plus every dated surface an edit or an epoch wrote; never carved into the heightfield (V13 §2.2, V13 §3.12.1) */;`
> `groundwater: GroundwaterField /* item 140 M4: the frame's water table, derived by the groundwater step after S1 (3) and after every terrain or water operator (V13 §3.12.3); read only through `waterTableAt(doc, p, when?)` */;`

**BCR-V13-3 — §2.6 *Basements*: the water table is the groundwater function.**
*Current text:*
> The **water table** is the nearest water body's surface elevation — a moat's the one level §4.2 S3 (10) derives from its `flowFrom` source, every other body's shore terrain sample — plus the freeboard `freeboardCm` (default 50) for a plot within `waterTableM` (default 40 m) of a shore, and elsewhere the height of the drainage line: the `hydro` cell nearest the footprint's centroid whose `flowAccum` reaches `drainageAccumCells` (ties by cell index; where no cell reaches it, no water table limits the cellar) — the three values are §10.2's basement-gate row.
*New text:*
> The **water table** is `waterTableAt(doc, p, when?)` (V13 §3.12.3: the frame's groundwater field, derived from every surface — a moat's the level §4.2 S3 (10) derives from its `flowFrom` source, every other body's its `WaterSurface` — by the recharge-and-permeability rule, capped by the ground, perched where the geology says, bounded at the margin by the charter on a placed frame), sampled at the footprint's lowest terrain sample, plus the freeboard `freeboardCm` (default 50); `waterTableM` and `drainageAccumCells` are retired from the basement-gate row (§10.2's row keeps `freeboardCm` and gains none) — `when` is the building's construction week, so built space obeys its construction epoch (V13 §3.13.5). The cellar's class after construction is V13 §3.13's water class test on the cellar unit, stored on the building (BCR-V13-23).

**BCR-V13-4 — §4.2 S1 Site: S1 reads the charter as its one input record.**
*Current text:*
> (1) **Heightfield:** 5-octave fBm (VG's measured character, `_critic-vg-ng.md` V7) with a low base frequency and a relief-character amplitude (metres by S0's relief class), plus **authored site primitives** from the request (hill, spur, valley along the river bearing, terrace, cliff, ravine, hollow for a lake or an oasis — VG's idea of authored mount, hollow and ridge primitives). Heights are stored in §2.3's range and datum; S1 sets `datumCm` to sea level on a coastal site and to the site's base elevation otherwise (a 3 000 m relief is ordinary).
*New text* (the paragraph amended; (2) and (3) gain one sentence each):
> (1) **Heightfield:** 5-octave fBm (VG's measured character, `_critic-vg-ng.md` V7) with a low base frequency and a relief-character amplitude (metres by S0's relief class), plus **authored site primitives** from the request (hill, spur, valley along the river bearing, terrace, cliff, ravine, hollow for a lake or an oasis — VG's idea of authored mount, hollow and ridge primitives). **With `Recipe.charter` present and `source: 'world'` (item 140 M5; V13 §3.11.4; C13-03), the charter is S1's one input record beside the seed and the tables:** the field is blended inward over the margin to meet `charter.edges` at the arena's outer ring (the smoothstep of V13 §3.11.2), its fBm lattice is position-keyed on `charter.worldSeed` and the cell's world position (BCR-V13-29), the primitives are drawn inside it, and `datumCm` is `charter.datumCm`. Heights are stored in §2.3's range and datum; on a standalone frame S1 sets `datumCm` to sea level on a coastal site and to the site's base elevation otherwise (a 3 000 m relief is ordinary).
> (2) … With a charter, the coast polygon of `charter.outlines.coast` is the base line the closed-outline routine displaces (its detail row only), the lakes are `charter.outlines.lakes`' rings at their levels, the sea's level is `charter.waterEdges`', and the coast bearing is the water edge's side (C13-13).
> (3) … With a charter, the priority flood's border head is `charter.downstreamHeadCm` except at each `in` crossing (its stage), accumulation is seeded by each `in` crossing's `seedCells = round(Q ÷ r_cell)` (a cell count, V13 §3.11.4; C13-14), the descent is guided by `charter.outlines.reaches` (the control knots seeded on the course, the descent in a corridor one hydro cell about it), the width law is calibrated per reach so that the inlet's width equals the charter's `widthCm` (`w0` solved from the inlet's seed; outside the band clamped and reported `W_CHARTER_WIDTH_CLAMPED`), and an `out` crossing is a required exit (`W_CHARTER_RIVER_MISSED` when the reach leaves elsewhere). **S0's size step** `frameOf(size, aspect)` — §3.2 (9)'s rule over the request's `size` and `aspect` — is a pure table reading callable without a document, so `requestCharter` can carry the frame size before generation (V13 §3.11; C13-04). After (3): the **surface step** writes `Terrain.surfaces` and `carveDeltaCm`, and the **groundwater step** writes `Terrain.groundwater` (V13 §3.12.1, §3.12.3); both re-run after every terrain or water operator (§7.3).

**BCR-V13-5 — §2.9 `Document` and `Recipe`: the world document, `worldRef`, `charter`, the world product.**
*Current text:*
> `product?: 'town'|'hood' /* absent reads 'town'; 'hood' a standalone neighbourhood document (V01 §3.10.1) */; hood?: HoodRecipe /* present exactly when product is 'hood' (below; its rules V01 §3.10.1) */;`
*New text:*
> `product?: 'town'|'hood'|'world'|'site' /* absent reads 'town'; 'hood' a standalone neighbourhood document (V01 §3.10.1); 'world' a world document (V13); 'site' a world-site document (V14 §3.1) — the one merged union both volumes cite (SW-13) */; hood?: HoodRecipe /* present exactly when product is 'hood' (below; its rules V01 §3.10.1) */; world?: WorldRecipe /* present exactly when product is 'world' (V13 §2.2) */;`
> `charter?: FrameCharter /* a placed frame's one boundary record (item 140 M5; V13 §2.2): a recorded input of S0 and S1, in the records digest, never the model digest */;`
and `Document` gains, after `nextUndergroundPart`:
> `worldRef?: { world: Uuid; placement: Id } /* the world this frame is placed in and its placement there (V13 §2.2); absent on a standalone frame; written only by the frame's own `charter` event (author `world`, V13 §4.1, §4.4) */;`
> `namespace: string /* the address namespace segment (V13 §2.5; BCR-V13-6): minted once at creation, kept on clone and save-as (C13-24) */;`
A world document's `base` holds its rasters as `fields` chunks and its records in the entities block (V13 §2.7); its log
holds V13 §4.1's events. §2.9's per-viewer view keys gain `worldZoom` (0–3, default 1), `worldLayer` (V13 §5.1's
thematic layer, default `relief`), `showTraces` (default false), `surfaceDate` (a `Week`, default the document's
week), `worldLens` (the lenses open and the picker's collapsed rows, default none open; V13 §5.8) and `lensWeek` (a
`Week`, default the document's week); the world document's `week` key is set by the season control or `view.set
{ week }` (V13 §2.1; SW-24).

**BCR-V13-6 — §6.3 Identity: the namespace segment (item 140 M1).**
*Current text:*
> Every entity has two identities: an **address** that everything points at (edits, locks, assignments, pins, labels, households, exports, the host) and a **lineage** that keys its random streams. They start equal and separate only when an entity is re-derived.
*New text:*
> Every entity has two identities: an **address** that everything points at (edits, locks, assignments, pins, labels, households, exports, the host) and a **lineage** that keys its random streams. They start equal and separate only when an entity is re-derived. **Every address carries a leading namespace segment** — eight base-32 characters of the first 40 bits of `H128(docId)` at the document's creation, kept on clone and save-as (`Document.namespace`; V13 §2.5) — so the addresses of two documents merged into one package never collide (bar 7); a reference form without the segment resolves inside its own document (the base's forms unchanged), with it across documents (V14's `SiteReach`, the world's `Placement.subject`; SW-21).

**BCR-V13-7 — §4.12 Products: the `world` product.**
*Current text:*
> `→ { product: 'base' | 'village', rung }` to the village product registered in `StrategyRegistry.products` (§4.12;
*New text:*
> `→ { product: 'base' | 'village' | 'world' | 'site', rung }` to the village product, by `Recipe.product: 'world'` to the world product (V13 §3.0: stages W0–W9, each a `StageDecl` with `txForm: 'records'`; the placement operators P1–P5 are §7.3 local operators, not stages), or by `Recipe.product: 'site'` to the `site` product (V14 §3.1's G1–G8, registered by `@plat/sites`; never by population), all registered in `StrategyRegistry.products` (§4.12;
`ProductDecl` gains `coordinateRegime: 'frame'|'world'` (V13 §2.1), read by the view's transform and the exports;
`StageDecl.txForm` gains `'records'` (a stage that writes records and rasters and no arena: no kernel transaction, no
K12 entry; the world's own `WorldCommitRecord` stands in, V13 §3.0; C13-28). The placement operators P1–P5 are not
stages of the set (V13 §3.0; C13-27).

**BCR-V13-8 — §6.1 The concern registry: the world's concerns and stage ids.**
*Current text* (the concern table's header):
> `| concern | cap | keyed by — and read by |`
*New text* (rows appended):
> `| `world.recipe` | default | W0's template draw, keyed by the world root and the op ordinal; W1's noise, keyed by the op index and the cell position (V13 §3.17) |`
> `| `world.climate` | default | W3's moisture start jitter, keyed by the coarse row |`
> `| `world.resources` | default | W5's per-cell resource draws, keyed by the rule ordinal and the cell |`
> `| `world.siting` | — | a reserved id, not a stream: siting draws nothing; the tie-break is V13 §3.7 (6)'s (SW-03) |`
> `| `world.polity` | — | a reserved id, not a stream (W8a and W8b draw nothing) |`
> `| `world.patrol` | 0 | V13 §3.9 (14)'s patrol phase — a fixed-key reading, never a stream: keyed by the segment's lineage, the power's host key hashed into the salt, epoch 0; read by `patrolAt` |`
> `| `place.search` | — | a reserved id, not a stream (P1 draws nothing) |`
and two existing rows gain a reader: `water.delta`'s row appends "W4's distributary shares, keyed by the reach's
lineage" and `naming`'s row appends "W9's world names with the world's culture context" (C13-46; no `world.labels`
concern). The stage registry gains `W0` … `W9` (with `W6a`, `W6b`, `W7a`, `W7b`, `W8a`, `W8b`), `WORLD_PLACE` and `WORLD_CASCADE`
(appended; K6: no renumbering); no `P1` … `P5` ids (C13-27).

**BCR-V13-9 — §7.1 Edits: the verb on `EditBase`, the world's edit kinds, the outcome rows.**
*Current text:*
> `interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase; an event an epoch carries in `EpochInputs.dossier` takes its seq when the epoch is appended (§7.7 item 6; J-A22.76) */; author: 'user'|'host'|'epoch'|'migration';`
*New text:*
> `interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase; an event an epoch carries in `EpochInputs.dossier` takes its seq when the epoch is appended (§7.7 item 6; J-A22.76) */; author: 'user'|'host'|'epoch'|'migration'|'world' /* 'world': an event the world's placement fold writes into a frame's log (V13 §4.4; C13-40) */;`
> `  verb?: 'happened'|'alwaysSo' /* V13 §3.14.1: on every terrain and water edit — `happened` (default: a dated record, the traces kept) or `alwaysSo` (the retcon); an older event reads `alwaysSo`; ignored on every other kind, a placement included */;`
The `EditEvent` union gains V13 §4.1's variants (`worldRecipe`, `setSurface`, `rerouteReach`, `requestCharter`,
`bindPlacement`, `placeFrame`, `setPlacement`, `mirrorFrame`, `worldWins` with `ids?`, `unplaceFrame`, `setSeats`,
`deleteTrace`, `fork`, `discardFork`, `commitFork`, and the frame's `charter`), `setField.key` admits `'world'`,
`adjust.param` admits the world params with `fromStage` `'W0'|'W3'|'W5'`, `EditScope` gains `{ kind: 'world'; stage;
box? }`, `ConflictAction.kind` gains `'keep'|'takeOffer'|'accept'|'cancel'` with `offer?: number`, the dry-run outcome
table gains V13 §4.1's rows (the refusals as `refuse.*` outcome keys), and §7.4's sessions rule names the second
reserved session `world:place` beside `host:port` (C13-34, C13-40, C13-53).

**BCR-V13-10 — §7.3 Locality: the cascade's rows.**
*Current text* (the operator table's header):
> `| edit reaches | local operator | pinned | beyond it (declared, never presented as local) |`
*New text* (rows appended):
> `| a water surface, a terrain stroke or a reach course at either scale (with `verb`) | the cascade (V13 §3.14.2): terrain or surface → flow, flats, accumulation → surfaces → the table → the consumers → one level up, each a local operator over the dirty watersheds with the border pinned; S1's water and terrain operators are its first step at the frame | the dirty set's border cells and their surfaces; every dated surface; every lock | a sea-level change touches every coastal watershed: declared |`
> `| a placement (`placeFrame`, `setPlacement`, `mirrorFrame`, `worldWins`, `unplaceFrame`) | P1–P5 then W9, W7–W8 over the landmass (V13 §4.3) | the frame's arenas, plots, buildings and locks; other placements | `worldWins`'s Re-derive from S1 on the frame: declared |`

**BCR-V13-11 — §7.7's port and V08: the world port.**
*Current text* (§7.1, the port's door as the base states it):
> `dossier?: DossierRef /* set by the dossier port (`@plat/port`, §14) on every event a dossier change generates through the host door (§11.4): the element's binding key, opaque to the module (§7.7 item 12) */;`
*New text* (unchanged; the following added to §7.7's port paragraph, and the six methods to V08 §2.2's host → PLAT and PLAT → host unions, one type per method, with the world's format version in the envelope — C13-59):
> The **world port** (`@plat/port/world`, one adapter folder per host line, V13 §3.11.6) is the port's second door: outbound `derivedFacts(world, placement) → SettlementMapRecord`, `charter(world, campaign) → FrameCharter`, `proposals(world, demand) → SitingProposal[]`, `routes(world) → WorldRoute[]`; inbound `seats(world, seeds)` and `costLaw(world, law)` as recorded inputs. The host reads derived facts and never an arena; the map writes no dossier fact except through this door as a derived fact (bar 9); the seventh method, inbound `events(world, events: WorldEvent[])`, delivers the host's dated events as dossier-tier facts for the world's event index (V13 §2.2; SW-07). V08's host client carries the seven messages, versioned by the world's format version, plus the view command `clock(world, week)` (V13 §2.1; C13-23).
*Revised 2026-10-17 (file m):* the world port's messages, its two feeds and its consumption law are V13 §3.11.6's; the
base's port paragraph, its never-read list (scoped to the dossier door) and §11.4's fifth door carry them (file m items
778, 777, 779).
*Revised 2026-10-17 (file n):* the lens window joins the port's presentation inputs, kept only as plates (V13 §5.8 (8)),
and the DM-placed site offers join its map feed (V13 §3.11.6); the base's port paragraph and §11.4's fifth door carry them
(file n item 837).

**BCR-V13-12 — §11.1 Formats: the world's rows and the frame's water additions.**
*Current text* (the GeoJSON row's opening):
> `| **GeoJSON** (RFC 7946) | two declared variants (N-14, below):`
*New text* (rows added after the table; the GeoJSON row gains "a world document exports one FeatureCollection per world layer, V13 §5.4"):
> `| **ecosystem-shaped JSON** (world) | the reference ecosystem's full-map JSON by the adapter folder's version-pinned schema file (V13 §3.15, §5.4) | the one place its property names appear; export → import → export byte-identical on the shared keys |`
> `| **GeoJSON** (world) | one FeatureCollection per world layer with the ecosystem's property names from the same schema file | V13 §5.4 |`
> `| **16-bit heightmap** | PNG (and `.r16`) of the fine DEM with a sidecar of `minCm`, `maxCm`, the cell size and the datum | round-trips through the `image` op |`
> `| **world CSV** | one file per kind in a zip (reaches, lakes, territories, routes, settlements, proposals, resources, springs) | V13 §5.4 |`
The JSON schema's unit records gain `waterClass` (V13 §2.4's result) and the document's `surfaces`.

**BCR-V13-13 — §8.4 Layers and the sun: the world layers; the sun from the placement.**
*Current text:*
> `latitudeDeg: number /* path mode; the view's default is the latitude in force — the recipe's `Intent.latitudeDeg` (g item 102; DR29), else 50 — while the model-side sampler reads the recipe's latitude itself (§4.5) (file f items 296, 391) */ };`
*New text:*
> `latitudeDeg: number /* path mode; the view's default is the latitude in force — on a placed frame the placement's latitude and bearing (mirrored: reflected) through the one view-side accessor `sunAt(doc, week, hour)`, a derived reading through `worldRef` (V13 §3.11.5); else the recipe's `Intent.latitudeDeg` (g item 102; DR29), else 50 — while the model-side sampler keeps reading the recipe's latitude itself (§4.5) (file f items 296, 391): a placement never moves a model output (C13-01) */ };`
`LayerSpec` admits the `world` product's layers of V13 §5.1 (the raster layers as tile sets, the vector layers through
the display list) and the frame's three overlays (`waterClass`, `flood`, `traces`); the style table gains `style.world`.

**BCR-V13-14 — §12.4's S1 row, §12.8's world line, §12.10's world rows (the §12.3 laws unchanged; C13-09, C13-11).**
*Current text* (§12.3's laws, quoted to state that they stand):
> TOWN ≤ 20 ms + 60 µs × buildings; CITY ≤ 40 ms + 50 µs × buildings; METROPOLIS ≤ 100 ms + 52 µs × buildings
*New text:* the laws stand unchanged. §12.4's S1 row gains "+ the surface step (≤ 3 ms) and the groundwater step
(≤ 30 ms at METROPOLIS), V13 §3.12" inside its p95; §12.8 gains the line "**World document, all threads, excluding
canvases:** ≤ 300 MB on the high tier (the `continent` rung refused below it, V13 §6)"; §12.10's register gains
`WORLD-1` … `WORLD-8` (V13 §6) with their pass bars and pre-decided changes (V13 §8.4), `WORLD-4`'s being §12.3's own
pooled-law amendment should S1's row miss at M-W4.

**BCR-V13-15 — §13.2: the volume's test family and corpus.**
*Current text:*
> (T-V1-n … T-V12-n, each volume's §7), run by the same benches and tiers.
*New text:*
> (T-V1-n … T-V14-n, each volume's §7), run by the same benches and tiers; volume 13 adds the **B-WORLD** corpus (200 seeds × three rungs × six templates, B-WORLD-lite its first 10 per rung; V13 §7) and its eighteen model-drift tests (T-V13-21, one per row of V13 §3.14.3's table) to the PR tier; volume 14 adds the fixtures `B-SITE`, `B-CROP`, `B-25D` and the no-op pins `item132.none`, `item141.flat` (V14 §7) — the one merged text both volumes cite (SW-29).

**BCR-V13-16 — §9.5 Furniture: the compass derived from the placement.**
*Current text:*
> * **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per town:
*New text:*
> * **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per town, **whose north is the frame's +y on a standalone frame and the world's north on a placed one — the rose turned by the placement's bearing (mirrored: reflected), derived presentation that never rotates the arena (V13 §3.11.5)**:

**BCR-V13-17 — §2.8 Identity, lifecycle, provenance: the reason record.**
*Current text:*
> a **derivation record** (the inputs of its derivation — persisted for the kinds whose stage declares one, outside the model digest), and a **provenance** record (how it was last derived — rebuilt by every derivation, never persisted, never in the model digest; LC-25).
*New text:*
> a **derivation record** (the inputs of its derivation — persisted for the kinds whose stage declares one, outside the model digest), a **reason record** (item 140 M8; V13 §2.2: why the fact is so — the rule row, the inputs with their values, the numbers and a `MsgRef` — written by every stage of V13 and V14 and by the cascade for every fact it creates or changes, superseding the former; persisted outside the model digest and inside the records digest; read by the clerk's `why`, `whatCaused`, `whatChanged` and `whatIf`, V13 §4.7), and a **provenance** record (how it was last derived — rebuilt by every derivation, never persisted, never in the model digest; LC-25).

**BCR-V13-18 — §5.2 and §5.4: the world's failure classes and codes.**
*Current text* (§5.2, the staged layers' table intro):
> **The staged layers' classes** are rows of the same table, each built with its layer, marked † with the volume section that states its detection, rungs, report and tests (the rows here are its pointers):
*New text* (rows appended to that table):
> `| F-WORLD, F-GW, F-PLACE† [V13 §3.16] | W0–W9, the groundwater step at both scales, P1–P5 | V13 §3.16's | V13 §3.16's, each ending in a reported clamp, default, offer or refusal; `E_WORLD_SINK` and `E_GW_CAP` are bug aborts | T-V13-3, 5, 13, 14, 22, 23, 24 |`
§5.4's `warnings` comment gains the world's codes (V13 §7.5's table); `ReportCode` is untouched — the refusals are
§7.1 outcome keys (`refuse.*`, BCR-V13-9; C13-53).

**BCR-V13-19 — §16 Build plan: the world milestones.**
*Current text:*
> The design volumes' milestones follow in the order the owner's delegation fixed (J122): the village's tracker spike right after M0, the built-in clerk beside M3b, and after M4 four streams side by side.
*New text:*
> The design volumes' milestones follow in the order the owner's delegation fixed (J122): the village's tracker spike right after M0, the built-in clerk beside M3b, and after M4 four streams side by side; **the water state at the frame M-W0h after M4 beside M5 (V13 §8; SW-14), the world milestones M-W0 – M-W4 (V13 §8: 28–36 pw as one staged row) after M-SF, the encounter crop M-ENC after M1, the attached sites M-SITE-A after M6-U, the free sites M-SITE-F after M-W1 and the 2.5D renderer M-25D after M4 (V14 §8); the host's own changes a parallel track on the owner's schedule (V13 §11 Q2)** — the one merged text both volumes cite (SW-29).
§16's staged table gains the rows as this sentence places them; the volume states no total of its own.

**BCR-V13-20 — §1.1 What is built: the world row.**
*Current text:*
> `| the SettlementForge connection | the host client, the port leader and adapters, persistence in the host, the players' view | volume 8 (§7.7, §11.2–§11.4, §14's `@plat/port`) | M-SF (SF0 – SF7, VH) |`
*New text* (a row appended after it):
> `| the world: the world regime, placement and hydrology | the world document (W0–W9), the placement of settlements (P1–P5), the charter, the water state at both scales, the two verbs and the cascade, the world port, the ecosystem-shaped exports and the adapter | volume 13 (§2.3, §2.4, §2.8, §2.9, §4.2 S1, §6.1, §6.3, §7.1, §7.3, §7.7, §8.4, §9.5, §11.1, §14) | M-W0 – M-W4, after M-SF |`

**BCR-V13-21 — V04 §2.6 *Basements* and §3.5.2: the water readers call the shared function.**
*Current text* (V04's outfall rule and the cave hall's rule):
> water table reads it — a moat's the derived level of §4.2 S3 (10), every other body's terrain height at the shore,
> **its floor lies `hallDryCm` above the local water table**
*New text:*
> water table reads it — `waterTableAt(doc, at)` (V13 §3.12.3), a moat's level among the surfaces it derives from,
> **its floor lies `hallDryCm` above `waterTableAt(doc, hallCentre, constructionWeek(hall))`** (`constructionWeek` the derived reading of V13 §3.13.5: the week of the epoch named by `Lifecycle.since.epoch`, week 0 at generation; C13-18) — and every element's `flood` admission, its class after construction and its route from the entrance are V13 §3.13's `classifyWater` and `routeClass` over the element as a `WaterUnit` (floor, chamber height, passages), with the connected-set rule (a void below an adjacent body's surface floods to it) and the `lined` attribute (a cistern or sewer invert holds the table back to `liner.headLimitCm`) of V13 §3.12.6; V04's `hallDryCm`, `freeboardCm` and burial depths stay V04's cells, read as the unit's thresholds. **Third part** (C13-29): V04's T-V4-12, T-V4-20 and T-V4-23 read the table at the element's construction week (`waterTableAt(doc, p, constructionWeek(element))`); a present-week violation under a lawful `setSurface` or placement is a `lockedBelowTable` report, never a test failure. **The II.6 condition** (SW-31): an element's `flooded` holds exactly when its class is `wading`, `swimming` or `submerged` (`depthCm` > 0 at its floor sample); `damp` and `dry` leave it as it was. **Order** (SW-14): the readers switch at M-W0h; until it lands V04's readers keep the base's nearest-body rule, the switch reported as the version's shift at M-W0h's landing.

**BCR-V13-22 — V06 §3.23 (the decay ladder): the waterlogged rate.**
*Current text:*
> `r` is V11's decay rate per year for the building's walls material (`Building.material.walls`, read for time only, as §4.11's `WorksTable` reads it): timber and thatch faster than stone.
*New text:*
> `r` is V11's decay rate per year for the building's walls material (`Building.material.walls`, read for time only, as §4.11's `WorksTable` reads it): timber and thatch faster than stone, **or, for a world site's carved and natural units, the unit's material rate (`SiteDamageRow.ratePerYear`, V14 §2.5); a lineage whose ground storey or lowest unit is `submerged` or `swimming` under the present surface (V13 §3.13.4) decays at `r × waterloggedFactor` (V11's cell, default 3) toward the `submerged ruin` state, and one later exposed keeps its state and resumes `r`** — the one merged sentence both volumes cite (SW-30).

**BCR-V13-23 — V02 §2.2's building record: the per-storey water class.**
*Current text:*
> `storeys: { groundCm: Cm; upperCm: Cm };     // the class's HeightsRow storeyCm (massStepped, the tiers op, the mutator) or TierCells.heights (V04)`
*New text:*
> `storeys: { groundCm: Cm; upperCm: Cm };     // the class's HeightsRow storeyCm (massStepped, the tiers op, the mutator) or TierCells.heights (V04)`
> `waterClass?: WaterClassResult[]            // V13 §3.13.4: one per storey from the basement up, the last result of the shared test; re-written by the cascade; absent on a dry building`

**BCR-V13-24 — V10 §3.9 The oracle at depth: three modes.**
*Current text:*
> `query({ kind: 'why', id, path?, mode?, historyPage?, view? })`
*New text:*
> `query({ kind: 'why', id, path?, mode?, ask?: 'why'|'whatCaused'|'whatChanged'|'whatIf' /* default 'why' */, since?: Week, edit?: EditEvent, historyPage?, view? })` — `mode` (`'asPlaced'|'asNow'`) kept as it is and passed through to the kind's provider; the three new asks answered by `@plat/world/why`'s readers over the reason records (V13 §4.7) for every kind that carries one, with the generic provider's "chain incomplete" answer where a record is missing; the world's `WhyProvider` kinds and the `world` `WhySectionProvider` are V13 §1b.2's (C13-39).

**BCR-V13-25 — V09 §4.3 The tool binding table: the world's rows.**
*Current text* (the table's header):
> `| event kind (target) | the mode (§7.1's home tool) | the gesture | also from | source |`
*New text* (rows appended, one per V13 §4.1 event kind, with V13 §4.2's modes): `worldRecipe` → T2 `ground`'s
recipe editor; `setSurface` → T2 `ground`'s level slider; `setField(terrain)` on the world → T2's brush; `rerouteReach`
→ T2's reach drag; `placeFrame`, `setPlacement`, `mirrorFrame`, `worldWins`, `unplaceFrame` → T6 `place`'s Place-a-
settlement mode; `setSeats` → T6's seat pins; `deleteTrace`, the world `setAttr`s → T9 `shape`; `fork`, `commitFork`,
`discardFork`, the world `regenerate` → T10 `hold`; `adjust` of the world keys → T1 `intend`'s world dialog; the `verb`
toggle on T2's options strip; the water class overlay on T9's inspector. T-V9-12 checks the rows against the union.

**BCR-V13-26 — V11 §2.8 `ClimateRow`: two rows the biome matrix needs.**
*Current text* (V11's `ClimateRow.biome` keys):
> `temperate-deciduous`, `temperate-coniferous`, `mixed`, `maritime`, `arid`, `cold`
*New text:* the key set gains `tropical` (for `savanna`, `tropicalSeasonal` and `rainforest`: a long hot wet season, no
frost, the weather rows of a monsoon climate) and `wetland` (a `maritime` variant with standing water: a high damp
share, fog rows, a short dry season), each with its dry, season and weather cells as V11's table defines them; until
they land V13 §2.3's mapping table names each biome's stand-in key (C13-16).

**BCR-V13-27 — §5.3 The invariant suite: the basement row reads the construction week.**
*Current text* (§2.6 *Basements*' closing reference to §5.3's row; SW-23):
> §5.3's rows: a basement other than a crawl space or a raised crypt never under the flood band or below the water table
*New text:*
> §5.3's rows: a basement other than a crawl space or a raised crypt never under the flood band or below the water table **at its construction week** (`waterTableAt(doc, p, constructionWeek(building))`, V13 §3.13.5); a present-week violation under a lawful `setSurface` or placement is a `lockedBelowTable` report in the cascade's change list, never an invariant failure (item 137 (c); C13-29).

**BCR-V13-28 — §2.8 The entity registry and §6.3's anchor table: the world's kinds.**
*Current text* (§6.3, the lineage key's unit):
> the **derivation unit** is the entity whose derivation run created this one, declared per stage in the registry
*New text:* unchanged, with the registry gaining one row per world kind — `Reach`, `WaterSurface`, `Watershed`,
`Territory` (and its provinces), `WorldRoute`, `SitingProposal`, `ResourceSite`, the spring, `Placement`,
`FrameCharter`, `TerrainTrace`, `SurfaceTrace`, `ReasonRecord`, the `coast` record and the `zone` and `importHint`
records — each with every column the completeness test reads (its stage, its lineage unit, its anchor, its digest
encoding, its export mapping, its `WhyProvider`, its edit kinds, and `z: ZDecl` — BCR-V14-5's column: `{ surface: 'dem' }`
for the rasters, routes, borders, glyph marks and `TerrainTrace`, `{ base: 'bed', top: 'elevationCm' }` for `WaterSurface`
and `SurfaceTrace`, `{ flat, reason: 'furniture' }` for a label candidate (V13 §5.7; SW-22); V13 §2.5, §1b.4, §5.4);
`EntityKind` gains the
registered lineage units `'placement'` and `'territory'`; and §6.3's anchor table gains V13 §2.5's anchors as rows (a
reach by course overlap ≥ 50 % within one fine cell, a territory by its seat, a placement by its subject, a surface by
its body and date, a route by its ends) — C13-30.

**BCR-V13-29 — §6.1's `terrain.noise` row and §4.2 S1 (1): position-keyed noise on a placed frame (item 135 (c)).**
*Current text* (§6.1, the town-level draws):
> Town-level draws — S0's feature draws, terrain noise and the per-document furniture (the compass and the emblem, §9.5) — use the **town root's** entity key
*New text:*
> Town-level draws — S0's feature draws, terrain noise **on a standalone frame**, and the per-document furniture (the compass and the emblem, §9.5) — use the **town root's** entity key; **on a placed frame (`Recipe.charter` with `source: 'world'`) the fBm lattice of S1 (1) is position-keyed on the world**: each octave's lattice value at a cell is the mixer's draw keyed by (`charter.worldSeed`, the octave, the cell's world x and y through `toWorld(charter.placement, ·)`) with the world root as the derivation unit, while the frame's seed keys only its authored primitives and its water draws — so two frames whose margins overlap sample one field and agree there (V13 §3.11.4; T-V13-13's two-frame fixture; C13-05).
§4.2 S1 (1)'s sentence is BCR-V13-4's. **Until this request is applied** the base keys S1's noise by the town root and
neighbouring frames agree only at the charter's edge profile and outlines: V13 §12 records the deviation from item 135
(c) as such.

The requests below (2026-10-17, file m) are stated as substance; the coherence pass writes each one's exact base text
when it applies them, as file k did for this section's earlier requests. None touches the kernel or an M0 gate row.

**BCR-V13-30 — §4.2 S3 (4): roads meet the world at the gates.** On a placed frame every charter road of class
highway or road is a **forced gate pick**: S3 (4) places a gate where the road meets the enceinte and routes the road
through the margin to the charter's station, the dossier's access word capping the class and the count; sea and river
routes bind to the harbour and the landings; `roadToNowhere` (a charter road no exit meets) and `roadUnmatched` (a frame
exit no charter road meets) are reported readings, never annotations.

**BCR-V13-31 — §9.5 furniture: the leaf's neighbour edges, walking rings and the world-zoom scale bar.** A neighbour
edge annotation is drawn only where a dossier partner names the far settlement, labelled as walking time under the
travel law in force ("three days on foot": days under two weeks, weeks beyond, in the view week's season, stamped with
the law's version) or, for a campaign on the host's frozen weeks, those weeks; standalone, none. Walking rings are
isochrones of the frame's own terrain effort ("a day's walk", "a day's cart"), never circles and never an hour. At world
zoom the scale bar is drawn in the world's display unit (the view key `worldUnits`), with an optional time bar.

**BCR-V13-32 — §15: the fabric volume as evidence, not as this program's decision rule.** A crosswalk row per law of the
host's settlement-map fabric volume (its terrain-first, forced-fact, morphology, continuity and wall laws, its exit
bearings, true scale bar, arterial seeds and audience-surviving fork base), each with its status: met; met for the
host; conflict ruled (V13 J-V13.75, BCR-V13-33, -34, -35); realm seam open; not applicable. The rows:

| the fabric volume's law | status |
|---|---|
| terrain first | met (S1 inside the charter) |
| the forced fact | conflict ruled, J-V13.75 |
| morphology and its founding record | realm seam open (the host's founding record is prose) |
| the water mode | conflict ruled, BCR-V13-33 |
| terraforming and visible work | status owed by the base's epochs |
| the exit bearings and arterial meeting at the edge | met, BCR-V13-30 |
| neighbour edges on a standalone frame | met, BCR-V13-31 ("standalone, none") |
| integer-cm frames and the true scale bar | met (integer-cm frames; the base's scale bar, §9.5; the world bar, BCR-V13-31) |
| the arterial seeds | met for the auto forms, BCR-V13-36 |
| road drift | met for the host, `roadsAt` |
| the audience-surviving fork base | met (player views project the stored document, never re-derive behind the audience wall) |
| relief | conflict ruled, BCR-V13-34 |
| reroll | conflict ruled, BCR-V13-35 |
| the razing bearing | met, BCR-V13-36 |
| the wall trace | status owed |

**BCR-V13-33 — §4.2 S1 (3): a chartered frame whose dossier is not riverside is never bisected.** Its river runs in
`near` mode (beside the core, never through it); a riverside share is a table tendency; the parity presets keep
"through".

**BCR-V13-34 — §8.2's relief tier: relief on by default in hachure on the default preset only.**

**BCR-V13-35 — §6.1, §7.1 and §11.2: every user-facing generate and reroll mints entropy, recorded in its event.** Enter
and "Same kind, new seed" draw a fresh seed; New random and a layer reroll draw a fresh value into the event's recorded
field (in [1, 32 767] for the reroll and [1, 65 534] for the salt, the ranges the kernel packs); replay reads the record;
typing a seed is the address door; on a host-bound world the host mints the world's seed and keeps it with the
campaign's. The kernel is unchanged.

**BCR-V13-36 — §4.2 S3 and S4: two small world readings.** On a frame with two or more road entries a regional
skeleton is laid before the nuclei (the auto forms only); besiegers' camps and razing scars are oriented by the force's
direction through the world, a razing's bearing recorded once in its epoch.

**BCR-V13-37 — §16: the world's estimate.** The staged-milestone row for M-W0h and M-W0 – M-W5 reads 37–45 pw (M-W2
widened by 2 pw for the sway, the patrols and the windows; M-W5 the lenses, 7 pw; V13 §8.2), and the staged
milestones' total moves by 9 pw at both ends (2 for the sway, 7 for the lenses); wherever BCR-V13-19's sentence and
BCR-V13-20's row name the world milestones M-W0 – M-W4, they read M-W0 – M-W5 (M-W5 the lenses, after M-W2), and this
request's range stands for the staged row's estimate.

**BCR-V13-38 — §2.9 `Document`: the world document's plate cache.** `Document` gains, beside `derived`, `lensPlates?:
LensPlate[] /* a world document only (V13 §5.8 (8)): the host-fed lens plates — never canonical, outside every digest,
kept across loads and saves as `elaborations` is, never rebuilt or recomputed on load (a plate is what the host sent,
and the lens window is never logged), dropped only by the host's quota, a host rewind or compaction (pinned plates
kept by compaction) */`; the base's `derived` comment ("caches rebuilt from base + log") stays true of `derived`, and
no loader moves a plate into it.

**BCR-V13-39 — V09 §4.19 The base's view keys, notes, pins and the ruler on screen: the world view's lens controls.**
*Current text* (the table's header):
> `| control | where | writes | default |`
*New text* (rows appended): **Lenses** — the lens picker, one row per lens of `world.lens` in its order, a still lens
collapsed and greyed but openable, never hidden | the world view's Lens group | `worldLens` | none open; **the lens scrub
bar** — a week slider over the plates and the host-dated facts, its declared gaps shaded with their reasons
(`W_LENS_PLATE_GAP`), and "back to now" | the Lens group | `lensWeek` | the document's week; **Pin this plate** (the DM
only; the one row that is not view state: a cache command on the world document's plate cache, BCR-V13-38, shared,
outside every digest) | the scrub bar | `pinPlate`, a cache command — never an edit, never logged or undone | —; **the lens-mark card** —
a hover and a card on a lens mark answering `lensWhy` (the host rows it read, the element and rule that drew it, its
class label) | the map | — | —. Every row's behaviour — which lenses show, their gates and order, what the card answers
and which audience sees what — is V13 §5.8's; V09 hosts and draws them. V09 §4.9's catalogue gains
`refuse.lens.invented` and `refuse.lens.audience` (V13 §7.5) and the lens warnings `W_LENS_REGIME_ABSENT` and
`W_LENS_PLATE_GAP`, in V13 §5.8's words.

### 10.2 Requests to V14 (what V14 must supply; single source: these stay V14's facts)

| request | what V13 needs | where V13 reads it |
|---|---|---|
| R-V14-1 | every `Placement` with a `site` subject gives the site's `at` (`originCm`); its card's `attraction` (0–1) and `routed` are read through `@plat/api`'s resolver from the site document (V14 §2.2), cached per (placement, the card's digest) — for W6's `destination` term, W7's routed sites and the charter's `sites` (SW-20) | V13 §2.2, §3.7, §3.8, §3.11.4 |
| R-V14-2 | a site's `Placement` as a world fact (`WorldFacts.sites`); the `SiteReach` of an attached site's access record resolved across documents by the namespace segment (V13 §2.5) (SW-20, SW-21) | V13 §2.4, §2.5 |
| R-V14-3 | G3 calls `score(cell, ctx, weights, hard)` with its `SitePurposeWeightRow` over V14's own purpose-term plug-ins (registered through `terms.register`, V14's formulas) and V13's eight generic terms; the world-site term is `destination` (`reach.siteKm`); no jitter or random term anywhere — equal candidates take V13 §3.7 (6)'s deterministic tie-break (SW-01, SW-03) | V13 §2.2, §3.7 |
| R-V14-4 | G6 stores `WaterClassResult` and `RouteClassResult` (V13 §2.4) and re-runs on every cascade whose dirty set reaches the site's governing surface (V13 §3.14.2 step 5); E3 reads `routeClass` for swimming routes | V13 §3.13, §3.14.2 |
| R-V14-5 | the import's markers and zones handed to G1 as site candidates and annotations (V13 §2.8, §3.15): V14 states what G1 does with them | V13 §3.15 |
| R-V14-6 | every V14 stage writes V13 §2.2's `ReasonRecord` (the one declaration) and names its `WhyProvider` kinds | V13 §2.2, §4.7 |
| R-V14-7 | V14's R1–R4 own the 2.5D view of every document, the world included: R2–R3 draw V13 §5.7's drawables with their `ZDecl` rows (a `Lod25Row` per world stop) and nothing else of the world (SW-02) | V13 §5.7 |
| R-V14-8 | a site's glyph marks through the same `glyphOf`/`world.glyph` path as a frame's: `@plat/sites` runs `glyphOf` over the site document (the levels V13 §3.10 (4) names) and posts `world.glyph`; V13 places it as a `Glyph` with `subject: 'site'` (SW-08) | V13 §2.2, §3.10 |
| R-V14-9 | E1's world crop frame calls the transient `charterFor(world, TransientPlacement)` (V13 §3.11.4) and persists nothing (SW-05) | V13 §3.11.4, §6 `WORLD-9` |
| R-V14-10 | G6 hands a site level's units as `WaterUnit`s with `passages` from the unit graph and the vertical links; `floodSite`/`drainSite` fold to `setSurface` on the level's `site` surface (SW-06) | V13 §3.12.6, §3.13.1, §4.1 |
| R-V14-11 | a site subject goes through every placement edit as the frame does (`setPlacement`, `worldWins` as G5 (f)'s re-materialization, `unplaceFrame`); the site document holds only its `placementRef` (SW-11, SW-19) | V13 §2.7, §3.11, §4.3 |
| R-V14-12 | adoption is V14's own hook on the `world.placed` message (the `placed` outcome row of P4/P5); V13 calls nothing of V14 (SW-10) | V13 §3.11, §1b.2 |
| R-V14-13 | the card's `devotion` (V14 §2.2: a DM-placed holy or hidden cult site's deity key and role; stated only, never generated; DM-only by default) — read by the religion lens and offered in the DM's map feed (J384 (10)) | V13 §3.11.6, §5.9 |

## 11 Owner questions (true owner decisions only, each with a recommendation)

**Q1 — Existing campaigns: the elective rebase.** The transition is ruled (V13 §8.5's phases 0–5; J-V13.81): every
existing campaign keeps its frozen record forever and simulates on it; its world is imported on request through the
host's own export and drawn with no write to its simulated state; every time the map shows for it comes from the
host's frozen weeks; a settlement placed on it is placed settlement-first, the world bending to it, `worldWins` never
run automatically. What remains the owner's: whether a living campaign is offered the **elective rebase** onto a world
from this module — which moves its lived futures, a class of same-seed movement the owner reserves.
*Recommendation:* offer it per campaign, premium, default keep, with the full forecast diff (travel weeks, tiers,
crossings, ports, water lanes) shown before confirmation; never automatic.

**Q2 — The host's schedule and the launch classification.** The host's own changes (V13 §8.5's H1–H30) are the host's
program on the owner's schedule; and replacing the host's launch-core realm map is not covered by the owner's clearance
of the settlement-layer map module for after launch. The owner decides when the host's track runs against M-W1 – M-W3 and M-W5
and whether the realm map's replacement is part of the map module's post-launch disposition. *Recommendation:* class it
with the map module's post-launch disposition; the host launches on its fork with H1–H3 done; H4–H11 in step with M-W1,
H12–H17 and H22 with M-W2, H23–H30 with M-W5, H18–H20 after M-W3 (the standalone world ships either way: T-V13-37's mock host covers the map side);
the transition per campaign, opt-in and data-preserving.

**Q3 — Share codes and replay.** A world's share code (V12's replay of a recipe) replays W0–W9 from `Recipe.world`;
a placed settlement's share code must carry its charter (a recorded input) to replay identically, which makes the
code a few kilobytes rather than a line. The owner decides whether a placed settlement's share code **embeds the
charter** (replays alone) or **names the world** (replays only beside the world's code). *Recommendation:* embed the
charter; a settlement that cannot be replayed from its own code breaks V12's one-line rule in a way users will meet.

**Q4 — J86's door 1 and the world canon.** The base keeps J86's door 1 — the host's simulator reading the map's
geometry — closed until the owner's explicit word (§11.4). The world canon (V13 §3.11.6) replaces the capture of the
reference generator that the host's simulator already reads; it carries no frame or arena geometry and reaches the
simulation only through the DM-confirmed receipted re-canonize. The session reads it as outside door 1, which was ruled
for the settlement map's geometry, and the base's fifth door says so; the owner confirms, or opens door 1 for
world-scale derived facts only. Until the answer the host's builder over the canon (V13 §8.5's H5) stays dark,
and with it H22's birth canon (J384 (6); J386): until Q4 is answered, new campaigns are born uncanonized, their
lenses opening in their uncanonized regimes (V13 §5.8 (2), §5.9).
*Recommendation:* confirm; the settlement frame's geometry stays behind the closed door.

**Ruled — who keeps a gate under the sway** (J385; J-V13.96; recorded here as a ruling, not an open question). The
host's crossings stay on the seat territory; the choice between the host's intermediary settlement — the one whose
territory a path crosses, which keeps the gate today, with its tolls, its interception and its contraband — and the
political holder of the crossing — the owner's own principle that holding the pass holds the trade, against the sway's
enforcement — is ruled under the owner's delegation: the intermediary settlement keeps the gate until the sway has
passed its soak (T-V13-41 (d)'s 300-year soak under B-POLITY, with the polity cells measured); the crossing holder is
then offered to the host as a per-gate policy it may adopt gate by gate, each with its own register row (V13 §8.5's
H16). Vetoable.

**Ruled — the birth canon and a fight verdict while the military term is dark** (J386; J-V13.100, J-V13.101;
recorded here as rulings, not open questions). Every new campaign on a world from this module is asked to be
canonized at its birth (J384 (6)), whatever its tier — the host deciding whether its premium canonize entitlement
gates it —, while a re-canonize and a retcon stay the premium DM's act (V13 §8.5's H22, which Q4 above still gates).
And while the host sends no force band, a host fight verdict's hold band alone breaks a debatable tie (V13 §3.9
(11)), so only a host verdict moves a march line in the civil regime (every preset's until force bands are sent) as
in the enforced one (J384 (5)). Vetoable.

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read from the base, the volumes, the amendments, the proposals or the site package's code):
the base's heightfield, datum, hydro raster, priority flood with exact flats, D8, accumulation, outfalls, the carved
bed with its cap and re-route (§2.3, §4.2 S1; the site package's `terrain`, `hydro`, `water` modules as they stand);
the kernel's two-dimensional frame and K13; §4.12's product registration; §6.1's streams and the concern registry;
§6.3's identities and carry-over; §7.1's events, dry run and outcome table; §7.3's locality and operators; §7.4's undo;
§2.8's derivation and naming records and the records digest; §8's tile pipeline and §8.4's sun; §9's placer; §11.1's
formats; §12's budget method and §13.2's test families; the owner's rules of items 131–141 and the settlement-first
correction as quoted in V13 §1.3; the proposals' additions as the owner's directions; the reference's mechanisms as
evidence (the survey's sections named in V13 §3) — none of its numbers, names or code.

**PLAUSIBLE** (this volume's design, each with its measurement):
every constant marked own and calibratable in V13 §2.3 and §3 (the climate and hydrology laws, the groundwater
gradient and permeabilities, the hydraulic coefficients, the biome matrix, the suitability weights and spacings, the
route cost rows, the polity rule's cells (`world.polity`, V13 §2.3; measured on B-WORLD-lite under B-POLITY), the lens rule's plate horizon, store and draw caps (`world.lens`; measured by `WORLD-14` and `WORLD-15`), the coherence weights and the lawful bound, the blend band, the water
class thresholds, the flood shares and barrier kinds, the resource rules) — measured by T-V13-16's statistics bars at
M-W1 and M-W2 and re-cellled by `editTable`; the budgets of V13 §6 — measured by T-V13-17 and T-V13-20 at M-W4 with
V13 §8.4's fallbacks; the spikes' outcomes (V13 §8.4); the estimates of V13 §8.2; the deferred decisions; the glyph
tolerances; the export stride; the import's matching rules (T-V13-26 on the synthetic fixture only — a real
ecosystem file is the owner's to supply, never captured by this lane). The volume carries 2 CONFIRMED mechanisms
re-used (the flood and D8; the base's edit machinery) for every 1 PLAUSIBLE one it adds; the PLAUSIBLE ones are data
or measured.

**The owner-rule deviation this volume's design carries** (C13-05; the host's track carries one bounded deferral, below): item 135 (c) — "resolution is added deterministically
from the coarse fact, position and seed, so neighbouring frames agree at a shared edge unseen" — is met in the design
by BCR-V13-29 (the position-keyed lattice on placed frames) and the margin-overlap rule (V13 §3.11, §3.11.4); until
that base request is applied, the base keys S1's noise by the town root and neighbouring frames agree only at the
charter's edge profile and outlines, not in their interiors — T-V13-13's two-frame fixture is marked expected-fail
until BCR-V13-29 lands, and the coherence pass admits the request.

**One owner directive deferred, bounded and visible** (J385; V13 §8.5's H2, H3 and H7). The owner's directive of
2026-08-05 that the host's normalised spread of march weeks give way, for scaled worlds, to absolute distance is
deferred for a world from this module until the host's per-map band census lands (H2): until then a native world rides
the host's normalized arm (`TravelLaw.basis` `normalized`, its calibration sent with the travel law, H7, H8). The
deferral ends when H2 lands; it is recorded here so the owner sees it, and is not extended without the owner's word.

**Parity against the survey's decision matrix** (`research/fmg/FMG-survey.md` §"The consolidated decision matrix", as
evidence; C13-51): every KEEP or GENERALIZE row that touches the world regime, with V13's mechanism and whether it is
reached, improved or deviated from:

| matrix row (verdict) | V13's mechanism | reached / improved / deviated — reason |
|---|---|---|
| two-graph mesh (REPLACE; keep "sample where information lives") | a fine DEM raster and a coarse climate raster with a fine→coarse index map (V13 §2.2) | reached |
| heightmap template DSL (GENERALIZE) | resolution-independent ops in metres with position-keyed noise (V13 §3.2) | improved: no cell-count decay |
| height encoding (REPLACE) | integer cm on the world datum, bathymetry negative (V13 §2.1) | reached |
| real-world / PNG heightmaps (GENERALIZE) | the `image` op with an explicit tone curve; the 16-bit heightmap export (V13 §3.2, §5.4) | reached; a GeoJSON/DEM import is D-V13.5 (deferred) |
| features flood fill and distance field (KEEP) | W2's flood fill; true distance transforms in metres (V13 §3.3, §3.5.5) | improved |
| deep-depression lakes and breaching (REPLACE with priority flood) | W2's priority flood with the spill test and `breachToleranceCm` (V13 §3.3) | reached |
| lat/lon box (KEEP, climate only) | `latBox` read by W3 only (V13 §3.4) | reached |
| temperature with pole anchors (KEEP) | `poles` as explicit boundary inputs (V13 §3.1, §3.4) | reached |
| the per-settlement seasonal curve (GENERALIZE) | the per-cell (mean, amplitude, phase) contract of the climate raster and the charter (V13 §3.4) | improved |
| precipitation and winds (GENERALIZE) | the wind march with arbitrary bearings, mm/yr and a clamp (V13 §3.4) | reached |
| rivers with flux (KEEP the contract, REPLACE the mechanism) | W4's D8 reaches with discharge and hydraulic geometry (V13 §3.5) | improved: causal, not drawn |
| biomes matrix (KEEP, as data) | the five-by-five matrix with overrides (V13 §2.3, §3.6) | reached |
| ports: the two-ports rule (KEEP) | `minPortsPerBody` (V13 §3.7 (3)) | reached |
| routes: the cost law, the trunk, well-ported islands, the gap fix, cabotage (KEEP) | the host's law as data; `sea.trunk`, `sea.gapFixRatio` (V13 §3.8); cabotage not built | deviated on cabotage: no coastal chaining of short sea legs — D-V13.6 if the host asks |
| state expansion (REPLACE: a projection, not a flood) | W8b's sway: the host's political facts projected over the terrain, reach exponential in tier and capped, a debatable land between adversaries, unclaimed land kept wild (V13 §3.9) | improved: bounded, revisioned on dated facts, never filled |
| provinces: islands, colonies, the wild-province fill (GENERALIZE) | standalone only: a budget-free flood inside the seat territory; on a host-bound world the member sways are the divisions, an island member beyond reinforcement an exclave; no wild fill | deviated: provinces follow the territory's cost law only — a province across water or an unseated remnant is one province of its territory; D-V13.7 (island and colony provinces) if B-WORLD's statistics show the need |
| no randomness in comparators (the lint) | T-V13-1's CI row (V13 §3.17) | reached |
| the four ecosystem surfaces: full JSON, `.map`, GeoJSON, heightmap (KEEP) | the adapter's JSON and `.map` ≥ 1.152 readers; the four exporters (V13 §3.15, §5.4) | reached for ≥ 1.152; an older `.map` only through the fork's open-and-resave |
| GeoJSON / DEM import (GENERALIZE) | the `image` op only | deviated: D-V13.5 |

## 13 Fix list

Revision 1 (the minors deliberately left, each with its reason; the coherence pass records the seams pass's findings
below them):

| id | finding | why it is left | guard |
|---|---|---|---|
| C13-56 | an older frame's load derives `Building.waterClass` per storey (BCR-V13-23) as a persisted model field, which §6.4 reads as an undeclared shift | the class results move to a `derived` cache outside the model digest in the next revision of BCR-V13-23 (the cascade re-writes them; nothing reads them from the model); until then the migration writes them under a declared shift in `plat/goldens/shifts/` — the coherence pass chooses which of the two it admits | T-V13-29 asserts the model digest unchanged by the load, or the shift declared |
| C13-60 (f) | J-V13.33 – J-V13.39 were unused ids | filled in Revision 1 with the decisions C13-05, -35, -36, -12, -37, -22 and -27 forced (V13 §9); nothing left to fix — recorded here so the id gap is explained | — |

## Integration notes (for the coherence pass and V14)

* **What V14 reads from this volume, by name:** `FrameCharter` (`sites`, `resources`, `territory`, `outlines`),
  `Placement` and the transforms (`toWorld`, `toFrame`, `bearingToWorld`), `SitingProposal`, `SuitabilityTerm`,
  `SuitabilityContext` and `score` with the `terms` registry (the `destination` term among them), `classifyWater`,
  `governingSurface` and `routeClass` with `WaterUnit`, `GoverningSurface`, `WaterClassResult` and `RouteClassResult`
  (what G6 stores), `waterTableAt`, `constructionWeek`, `worldFactsAt`, the one `ReasonRecord` declaration and the
  four readers with `whyCell`, the namespace segment, the glyph's `glyphOf`/`world.glyph` path, `WorldPort.derivedFacts`'s
  record; the requests V13 makes of V14 are §10.2's. V14 writes
  `WorldSite` positions (read by W6 and the charter) and an attached site's `SiteReach` (resolved across documents by the segment; the anchor's own references bare, SW-21); nothing else of V14 is named here.
* **What the coherence pass must reconcile:** BCR-V13-6's segment against V14's own identity request (one segment
  rule, declared here); BCR-V13-17's reason record against V14's stages (one record, declared here); the report codes
  of V13 §7.5 against §5.4's catalogue and the `refuse.*` keys against §7.1's; the `product` union against V01's `hood`
  and V07's village rows; the style table `style.world` against V11's registry (V11 writes the rows; this volume names
  the cells — `riverDrawM3s`, `ghostDepthCm` among them); BCR-V13-26's two climate rows against V11 §2.8; BCR-V13-29
  against §6.1 (the one deviation, V13 §12); the twelve-tool binding against V09's generated table (T-V9-12).
* **Stand-ins to replace at Fable's review:** the stand-in notice; every PLAUSIBLE constant's first measurement;
  the estimates of V13 §8.2.
* **Lane facts:** the two proposals (`docs/design/proposal-world-native.md`, `docs/design/proposal-hydrology-water-state.md`)
  are restated once in V13 §0–§3 in this volume's words and are not implementer references; `research/fmg/**` is cited
  as evidence by file and section only; nothing under `captures/`, `reference/` or `partitioned/` was read; the site
  package's code was described, never quoted; no reference identifier, grammar, palette, word list or constant table
  appears in this volume (T-V13-32 guards the packages; the volume's own text was checked by the writing lane).

## Integration notes (2026-10-17)

> PENDING FABLE REVIEW — written by the session's integration seat volumes/_integrate-world-sites under the owner's delegation (J339); covered by the whole-design retrovalidation (J84). The record is `docs/volumes/_integrate-world-sites.md`.

* **IN-V13-1 (seam round 1, SW-23):** two stale section numbers corrected in place — §2.2's frame-side paragraph now
  reads "the base's water-table rule (§2.6 *Basements*)" and BCR-V13-27's current-text note "§2.6 *Basements*' closing
  reference to §5.3's row" (the base's sentence stands in §2.6, verified).
* **IN-V13-2 (SW-02):** §1.2's V14 row cites V13 §5.7 (R1–R4 over its drawables), not §5.6.
* **IN-V13-3 (SW-20, SW-11):** §1b.1's `Placement` row and §1b.2's transforms row feed "V14's free-standing site (its
  card's `placementRef`)" in place of a `SiteAnchor` — a free site has a placement, not an anchor.
* **IN-V13-4 (SW-21):** the cross-document reference form written whole is V14's `SiteReach` (an access record's reach
  into a site document); §1b.1's namespace row, §2.5, BCR-V13-6, R-V14-2 and the earlier Integration notes name it so,
  the anchor's own references staying bare as V14 §2.8 rules. The request's substance (the segment resolves it) is
  unchanged.
* **IN-V13-5 (SW-14):** §8.2's closing paragraph and §8.3's heading name M-W0h for the frame-side water state (it was
  still "inside M-W1"); the M-W1 row reads the water state, the verbs, the cascade, the fork and `ReasonRecord` "as
  M-W0h landed them" instead of repeating M-W0h's contents. The prices are unchanged (M-W0h ≈ 4 pw inside 28–36).
* **IN-V13-6 (clean-room):** §2.8's rural-population row renames the adapter's neutral field — its former name
  coincided with the reference export's field of the same role — to `ruralPopPerCell`; §5.4's `ecosystemJson` row and
  T-V13-32 write the adapter folder generically (`adapters/<ecosystem>/<version>/schema.json`, "the adapter folder's
  `schema.json`") as §2.8 and §3.15 do, so the product name appears only in research citations.
* **File k:** this volume's requests became `docs/AMENDMENTS-2026-10-16k.md` items — BCR-V13-1 → 634; -2 → 603; -3 →
  605; -4 → 610; -5 → 608 (the merged union); -6 → 616; -7 → 611 (the merged union); -8 → 615; -9 → 617, 619; -10 → 618;
  -11 → 621, 643; -12 → 628; -13 → 623, 624; -14 → 630, 631, 632; -15 → 633 (merged with BCR-V14-22); -16 → 627; -17 →
  607; -18 → 612, 614; -19 → 635 (merged with BCR-V14-20); -20 → 600; -21 → 640; -22 → 641 (merged with V14's material
  rate); -23 → 638; -24 → 645; -25 → 644; -26 → 646; -27 → 613; -28 → 607, 616; -29 → 610, 615. None is applied yet.
* **Open for reconciliation round 1 (R1-1):** the import's markers — this volume's `SitingProposal`s with `demand:
  'import'` (§2.8, §3.15 (3)) against V14 §3.2's `dropSite` per marker raised by the adapter; the integration lane
  recommends this volume's reading (`_integrate-world-sites.md` §1.4). Nothing here changes until that round rules.
