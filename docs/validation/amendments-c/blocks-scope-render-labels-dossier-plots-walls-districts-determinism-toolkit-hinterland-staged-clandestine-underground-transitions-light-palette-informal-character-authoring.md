=== REPLACE ### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked ===
### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked

Tags: **BASE** (delivered by stage 1), **STAGE-2** (delivered by the neighbourhood stage through an interface the base
carries), **VILLAGE-LATER** (the separate product staged by the owner; checked as not precluded, hooks in PART III),
**module** (the optional `@plat/sim`, milestone M4b), **hook**. "Beyond" marks rows where the base deliberately exceeds
the reference's recorded weakness. Rows whose id starts `a:` come from the coverage audits' rows, so the matrix is no
coarser than the findings.

**MFCG (40 rows) — all BASE**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §4.2 S0, §6.4 permalinks, §7.7 intent (MFCG's flags kept as intent toggles and the features strip, §7.8) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1 keyed sub-streams (beyond: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (beyond: no whole-city restart; every requested feature counted by delivery tier) | BASE |
| B1 | patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | replaced by the plat and backbone faces (§2.2, §4.3); Delaunator kept for site sampling; the "denser, regular centre" look carried by the stage regimes | BASE |
| B2 | junction optimisation | §3.6 attraction + §4.3 junction merge (8 m), Y → T | BASE |
| B3 | coast / water field / `sea` | §4.2 S1 closed-outline coast at the request's bearing | BASE |
| B4 | land components (MFCG 12710731's domain pass) | §4.2 S1 flood fill of L0 | BASE |
| B5 | curtain wall, gates, towers, watergate | §4.2 S3 gate sites; §4.4 trace before the stage's growth; §4.8 gates at arterials with exact N by the measured gate law with its waterfront reduction (P11, item 46), water gates, towers by rule | BASE |
| B6 | citadel / castle (repair loop, placement, keep) | §4.2 S3 castle reservation by score (inside / on-enceinte / outside); §4.8 keep by `lir`, bailey, and the 0.75 compactness gate kept as a shape check, repaired in place in MFCG's order, then re-sited, then a keep without a bailey — never a restart (F-CASTLE) | BASE |
| B7 | streets and roads (MFCG 12710731's street graph, its path search and its road tidying) | §4.3 routed arterials, destinations = gates / markets / bridges / harbour | BASE |
| B8 | rivers / canals (regular, delta, bridges, mouth) | §4.2 S1 rivers by descent, distributaries (a delta), estuary as a width rule, islands; §4.8 bridges, canals as an intent flag | BASE |
| B9 | districts (seeded region growing, types, holes) | §4.5 grower over coarse faces with MFCG 12710731's per-kind growth rates (P13, item 47), a hole split, feature-named kinds, quarters; each district's identity read from its derived character after placement (§4.5, item 72) | BASE |
| B10 | ward → blocks (alleys by twisted bisection) | §4.6 bent-cut infill of each district polygon: the intramural secondary network and its lanes as spines | BASE |
| B11 | block → lots (twisted bisection, OBB, front recession) | §4.7 S10 per-frontage plots + §4.7 S11's front-line jitter (construction replaced by ruling O5; statistics matched, §13.5) | BASE |
| B12 | outskirts density falloff | §4.4 ribbon regime with the distance-to-gate kernel; §4.5 density field | BASE |
| B13 | shanty town / ribbon sprawl | §4.5 the shanty kind by FTG's trigger — the roster's average band `poor` or `squalid`, after the first half of the stages — its extramural placement a soft relation row (J-A27.43), the S0 `shanty` toggle forcing it on; its informal plots built as clusters of shacks, tents or lean-tos, each with its own door (§4.7 S11's `cluster` arrangement, item 70; FTG's tents row under the parity presets); §4.4 ribbon regime; the suburb regime on the shanty toggle | BASE |
| B14 | plaza, temple, churches, gate plazas | §4.2 S3 plaza reservation sized per rung and the principal market's trade-convergence site (S3 (12)); secondary markets as S7b claims, never touching another (§4.5 S7b (3)); §4.7 S9 `square` faces; §4.8 gate plazas and church forecourts (G-R1); institutions via claims | BASE |
| B15 | landmark / solid buildings, keep plan | §4.7 S11 institution site plans; §2.6 landmark footprint templates and OutlineBuildingGenerator; `lir` keep; solid-ink landmarks in `ink` | BASE (+ stage-3 hook) |
| B16 | greens / parks | §4.9 greenery rule table | BASE |
| B17 | farms and fields | §4.9 hinterland presets incl. the furrow style | BASE |
| B18 | harbour, docks, piers | §4.8 water furniture (basin, moles, quays, piers) | BASE |
| B19 | trees and forests | §4.9 forests as faces; §8.10 stamped ranked tiles (Poisson k = 50, shipped with the product) | BASE |
| B20 | elevation field (`Apply elevation`) | §4.2 S1 real heightfield feeding S4 / S5 costs (beyond) | BASE |
| C1 | display modes (Lots / Complex / Block / Hidden) | §8.5 LOD bands + the plot model: the Lots look = footprint masses over the `ground` role at the city band; Hidden = a layer toggle; cadastral layer optional (beyond: no global switch) | BASE |
| C2 | roofs Plain / Hip / Gable, Raised, Solids | §3.8 straight skeleton with the plain-roof downgrade; §8.2 `roof` program; §2.6 roof spec + heights; Raised = `ink`'s offset under-copy with per-class raise ratios (P15, item 54), on by default (§1.2) | BASE |
| C3 | lot post-processing (the front recession, P9) | §4.7 S11 front-line jitter — the area-scaled, floored recession (item 43) | BASE |
| D1 | naming (a feature-conditioned deck grammar; the Markov models MFCG 12710731 builds go unused) | §10.4 own engine and grammar | BASE |
| D2 | district labels (curved / straight / legend / hidden) | §9 hole-aware spines, quarter labels at city zoom, OBB-arc / straight / legend fallbacks (beyond: protected features) | BASE |
| D3 | map furniture (title, legend, scale bar, grid, compass, emblem, pins) | §9.5 (emblem slot with import and a minimal own generator; compass reroll) | BASE |
| E1 | colour system (schemes, roles, tints, weathering) | §8.2 roles, the contrast matrix, per-entity tints, thematic overrides; the role values on the palette targets (§8.2, item 69) | BASE |
| E2 | stroke discipline, layer order, caching | §8.2–§8.3 (casing idiom, round joins, order parity, world-aligned tiles) | BASE |
| E3 | alleys layer | §4.6 lanes / alleys are ways; §8.5 access-critical lanes drawn at the city band, the rest by LOD | BASE |
| E4 | district view, framing, no-zoom, thin lines | §8.8 continuous zoom on 2^¼ stops + the district band (beyond "no zoom"); framing §9.5; hairline mode (key **N**, §14) | BASE |
| F1 | warp tools (8) | §3.4 `warp` + §7.1 `warp` event with dry-run and whole-step validation | BASE |
| F2 | rerolls, renames, landmarks | §7.1 the named actions, `setAttr`, `assign` (beyond: persisted, undoable) | BASE |
| F3 | UI / hotkeys / size bands | `@plat/app` input scheme in `keymap.json` (§14); the measure tool (§9.5); the size ladder as data (§1.1) | BASE |
| G1 | export PNG / SVG / JSON | §11 (beyond: round-trip import, layered SVG) | BASE |
| G2 | integrations (FMG, Armoria, PS, Procgen Mansion) | §11 API, host bridge and static exports serve any host; the emblem is our own generator (§9.5); no third-party service is called (standalone) | BASE (hook) |
| H1 | population and scale model | §10.2 population as input; §2.1 metres (beyond the multiplier) | BASE |
| H2 | performance envelope | §12 (matched sizes 40 / 80 / 130; §12.9's declared trade) | BASE |

**FTG (46 rows + 9 audit rows) — BASE unless noted**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §4.2 S0, §7.6 presets as data, §2.9 document | BASE |
| A2 | two-phase pipeline, staging, failure policy | §4.1 (programme before layout, two-way), §5 | BASE |
| A3 | coordinate system, units, wire format | §2.1 integer cm centred; §2.9 binary blocks / CBOR twin | BASE |
| A4 | determinism, seeding, regeneration of old settlements | §6, §6.4 retention, §7.5 migrate (beyond: FTG has none) | BASE |
| A5 | server/client split, persistence, lazy person generation | §11.2 handle API and workers; §2.9 document; §10.3 lazy people | BASE |
| a:A24 | app accessibility; list and search views reaching buildings and people without the map | §14 `@plat/app` accessibility contract, the gazetteer and "features in view" lists; §13.4 tests | BASE |
| a:A25 | user guide, context-aware documentation links, release notes naming defects | §14 `@plat/docs` and context help; §7.8 anchors; §13.2 coverage and link checks | BASE |
| B1 | size ladder, population and area budget | §1.1 ladder and rung profiles; §4.2 S2 stage quotas; §12.2 | BASE |
| B2 | dependency-graph building selection | §10.2 sequential roster (own tables) | BASE |
| B3 | residents, job postings, backfill, matching | §10.3 households (base); postings and re-matching in the module | BASE + module |
| B4 | people model | §10.3 derived people with ancestry rows (own tables) | BASE + module (data depth) |
| B5 | government, religion, factions, military | §2.7 Faction / Institution entities with seats, `Faction.kind`'s military and arcane powers and `Institution.powers` (item 79); the power standings among §7.7's circumstances; §10.2 government and religion rows (base); meetings, roles and goals in the module | BASE + module |
| B6 | relations, friend groups, rivalries, events | the relation store — schema in the base (§10.1), materialised by `@plat/sim` | module |
| a:B10 | economy: resource chains, items and services with prices, stock per building, global price edits | D-32: `@plat/sim` over the base schema stub (§10.3); roster rows' provides / uses edges (§10.2) | module |
| a:C03 | personality, education gated by class, stat block with profession modifiers | D-32: `@plat/sim`, derived from the person key; the stat block a named game-system pack, off by default | module |
| a:C11 | family-tree view (layered generations, elided expansion, re-root) | §14 `@plat/app` family-tree view over the relation store | module |
| C1 | coast generation, islands, ponds | §4.2 S1 closed-outline routine, bank classes (also sky islands) | BASE |
| C2 | rivers, branches, bridges, classification, direction | §4.2 S1 hydrology, tributaries, distributaries, river islands, crossing sites; §4.8 bridges | BASE |
| C3 | manually drawn water | §7.1 `drawWater` | BASE |
| C4 | road-graph substrate (PSLG, incremental faces, edge types) | §2.2 the plat (beyond: attraction policy, levels as views of one arena, role sets on edges) | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages, initial roads) | §4.4 S5 outside the walls (mean-reverting curvature walk, destination-biased, explicit legality; per-preset growth rules for `american` / `ringed`); travel-cost stage boundaries with the anisotropy row (FTG's spoke priority) | BASE |
| C6 | district lots: creation, merge floor, type selection, order | §4.5 grower and typing, merge floor; S7b allocation | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings), placement modes, modifiers | §4.7 claims first → S8 → S10 → S11; Dense / Gaps / Individually placed ≈ row / detached / compound; the `cluster` arrangement of informal plots — shacks, tents or lean-tos, each with its own door (§4.7 S11, item 70), FTG's tents row under the parity presets — and the building-scale multiplier (§2.5) | BASE |
| C8 | lot → plot subdivision geometry | §4.7 S10 per-frontage regions (replaces recursive random cuts by ruling O5) | BASE |
| C9 | building footprints, landmark templates, entrances | §4.7 S11; entrance rule kept; non-rectangular landmark footprint templates in the base (§2.6) | BASE |
| C10 | suburb stage | §4.4 suburb regime (offshoots, cul-de-sacs, small lots from the outset, density Bernoulli) by preset or the shanty toggle | BASE |
| C11 | walls and towers | §4.8 | BASE |
| C12 | castle district | §4.2 S3 castle reservation + §4.8 | BASE |
| C13 | harbours and waterfront districts | §4.8 water furniture; §4.5 docks | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §4.9 S12a count-driven outside land, farmsteads, outside buildings on their resources (§10.2 `outside` rows) | BASE |
| C15 | forests, tree areas, trees, hedgerows | §4.9; §8.2 hedgerow instances in `lit` | BASE |
| a:I11 | tree species | §2.7 `Greenery.species` from the climate table; §4.9 inner and outer shares for woods | BASE |
| C16 | landscape decorations, reserve, climate presets | ponds carved at S3 (§4.2 S3 (10)); the rest of the decoration table is S12a's sites, built by the hinterland unit (§4.9); `reserve` land use; climate as a circumstance + style preset | BASE (should-have) |
| a:I05 | feathered field edges | §8.2 `feather` program (vector bands), on in `lit` | BASE |
| C17 | perimeter expand + round; decoration system | §4.5 S6's settlement perimeter, offset and rounded; §4.7 furniture pins (per-block weighted rows, per-district singletons) and plot boundary treatments (§2.5) | BASE |
| a:J05 | market stalls | §4.7 furniture pins: stalls on each market square's edge band, by its rank, and round its market hall | BASE |
| C18 | district and building naming, erosion | §10.4 (contraction as an EVO event) | BASE |
| D1 | renderer architecture | §8.1 columnar display list + tile backends (batched; picking through hit-test slices) | BASE |
| D2 | palette and feature treatment | §8.2 `lit` preset on Canvas2D with our procedural texture set, its palette aimed at §8.2's targets (item 69) | BASE |
| D3 | roofs (straight skeleton) | §3.8, §8.2 (roofs cached per entity revision, not per render) | BASE |
| D4 | water rendering and coast decoration | §8.2 bands, depth ramp, foam, bank classes | BASE |
| D5 | day/night, weather, seasons, window lights | §8.4's lighting model — the day view under the cursor, fixed or path sun, the night view under the moon with the placed `LightSource`s (§2.7, placed by §4.7's light rows), height-aware shadows; window lights derived from occupancy and the view's hour (§10.3); the season and weather rows (§8.2); the `FTG` parity preset's lighting at §13.5's row (item 68) | BASE |
| D6 | post-process effects | §8.2 post operations per tile | BASE (should-have) |
| D7 | labels, scale bar, grid, units, legend, thematic layers | §9; thematic layers = style overrides keyed by attributes (§8.2) | BASE |
| a:L08 | ruler (distance measuring) | §9.5 measure tool | BASE |
| D8 | 3-D view, street view, height maps | §11 glTF and CityJSON exports; heights in the model; no 3-D default view (R13 restraint) | BASE (export) |
| E1 | layout editor | §7.1 draw / move / warp events with split-on-cross and dry-run validation | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.1 the named actions with scope; `setAttr` batches; faithful regeneration (beyond: undoable) | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §7.1 `setAttr`, data dictionaries by id (§10.3), annotation layer (§9.5), view notes (§11.3), `LayerSpec` | BASE |
| F1 | schedules, behaviours, sub-locations | §10.3 module; sub-locations with capacities (§2.6) | module |
| F2 | clock, calendar, external time sync | §10.3 module; the time view state and the module's command over the bridge (§11.3) | module |
| G1 | export | §11 (beyond: districts in GeoJSON; per-layer VTT; CityJSON) | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §11 VTT exports (Foundry-class, dd2vtt) + the host bridge over any transport; no hosted service — the host is the store (§11.5) | BASE |
| H1 | data scale | §12.8 memory; lazy people | BASE |
| H2 | performance envelope | §12 (beyond: client-side, no server round trip; the first-map and model laws with their declared misses, §12.3, §12.5, D-18) | BASE |

**NG (31 rows) — STAGE-2 unless the base already delivers it**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, the per-map settings, URL state | PART II request (fabric id, params, character); §6.4 permalinks | STAGE-2 (request shape in BASE) |
| A2 | RNG engine, one stream, successor seed | §6.1 per-district sub-seed (beyond) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (NG's local retries are the F-CUT ladder) | BASE |
| B1 | hood outline (the NG 1.2.2 outline routine) | the district's typed boundary (II.1); standalone and sky outlines from §4.2 S1 (2)'s closed-outline routine with an outline template (II.1 rule (5)) | STAGE-2 |
| B2 | templates area / street / square | `FabricStrategy` registrations selected per district (II.2) | STAGE-2 |
| B3 | street network by bent recursive bisection | §4.6 (the base's infill primitive; NG signature as regression) | BASE |
| B4 | hole-aware bisection of annuli (the NG 1.2.2 hole-aware bisector) | §4.6 slit routing — the primitive `RingFabric` needs | BASE (primitive), STAGE-2 (ring) |
| B5 | street finishing: extend, fillet, width, corridor | §4.6; §4.7 S9 corridors | BASE |
| B6 | block content dispatch (ordinary, manor, empty and green blocks) | §4.6 the deep-interior choice by band shares; §4.7 S10 residue typing; §4.9 greens; the weighted, area- and spacing-conditioned choice as a stage-2 table (II.3) | BASE + STAGE-2 |
| B7 | square-template plaza | `SquareFabric`; §4.7 `square` faces | STAGE-2 |
| B8 | ring-template seed geometry | `RingFabric` (II.2) | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §4.7 S10 (construction: every plot with an access edge; the frontage-less leaves of NG 1.2.2 are its courts, item 42) | BASE |
| C2 | buildings, wings, compound plans, roof kinds, landmarks | §2.6 wings in the base + stage-3 hook; roof kinds in the base | BASE (+ stage 3) |
| C3 | manor compounds (walls, hall, grove) | §4.7 S11 set-back compound site plan with boundary treatments (the enclosure is ours, item 44 — NG 1.2.2 draws none) + §4.9 grove rule | BASE |
| C4 | greens, groves, shared Poisson field | §4.9 greenery rules; §8.10 stamped tiles | BASE |
| C5 | trees (crown construction, colour, shading, draw order) | §8.2 lobed crowns and the `hatched` tree order (large-tree pins under the buildings, block trees above them; item 58); §8.10 crown library | BASE symbol, STAGE-2 tier |
| C6 | pins: wells, fountains, large trees | §2.7 `Pin` kinds; §4.7 furniture pins in yards and squares; close-up density by the stage-2 table (II.3) | BASE (pins), STAGE-2 (close-up density) |
| C7 | uneven streetwall | §4.7 S11 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | the per-district intent (`DistrictIntent`, layer 2 of §7.7) with each district's derived character (§2.5, §4.5; item 72); metric scale (beyond) | BASE |
| D1 | naming | §10.4 | BASE |
| D2 | title layout (corner choice) | §9.5 emptiest-corner rule | BASE |
| E1 | palette / style schema, presets, multi-colour | §8.2 (`hatched` / `graphic` presets; multi-colour roles; palettes aimed at §8.2's targets, item 69) | BASE |
| E2 | canvas, layer order, stroke discipline, tree order (NG 1.2.2: large-tree pins under the buildings, block trees above them — no depth sort; item 58) | §8.2–§8.3 | BASE |
| E3 | roads rendering (Plain + five modes) | §8.2 programs in `hatched` (the road programs II.4 adds) | STAGE-2 tier |
| E4 | roof rendering: fake gables, colour law, hatching | §8.2 `roof` + `hatch(taper)`; §8.6 | STAGE-2 tier (programs in BASE) |
| E5 | shadows (prism quads, tree shadows) | §8.4's lighting model — height-aware shadows from stored heights, the vector shadow pass its fallback rung; the `hatched` family's prism pass its parity rendering (§13.5; item 68) | BASE, STAGE-2 tier |
| E6 | unrecorded style features (night lights, presets) | §8.2 presets as data; night lights by §8.4's night view and the placed lights (§2.7, §4.7; item 68) | BASE (lights), STAGE-2 tier (presets) |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | `@plat/app` (keymap, §14); rotation = view (§7.1); `setAttr` rename persists | BASE (app) |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations (Procgen Mansion hand-off) | the stage-3 `BuildingGenerator` takes the plot and entrance directly (beyond the rasterised hand-off: Dwellings itch 17195045 replaces any plan over 11 cells wide that arrives that way by a random house; ours has no such limit, item 60) | hook |
| H1 | performance envelope | §12 (opening a district and per-district regeneration: §15.2 S5, S6 and §16 M5) | STAGE-2 |

**VG (44 rows) — VILLAGE-LATER: not-precluded checks, hooks in PART III**

| rows | capability group | not precluded because |
|---|---|---|
| G1, G20 | tags, descriptive tags | the intent layer and presets are data (§7.7); tags derivable from the statistics record |
| G2 | seed / RNG / retry | §6 streams; §5 no whole-build retry (item 51) |
| G3–G5 | river course before terrain, height field, water extraction | S1 shares level-set water and a carved field; VG's course-first, terrain-independent spline is a `RiverStrategy` the village registers, which S1's carve step serves (PART III) |
| G6, G7 | density map, heart | the density field is the same field type (§4.5); a village registers a density `StageDecl` ahead of its network (§4.12) and seeds one heart (§4.2 S3) |
| G8, G9 | tracker roads, bridges | a village registers a tracker-steered `NetworkStrategy` that receives the traced enceintes (§4.12); bridges §4.8 |
| G10, G11 | square + centrepieces, wharf / piers | `square` faces + pins; `quay` / `pier` ways |
| G12–G16 | buildings + population, fields, orchards, forest, palisade | detached / farmstead site plans (§4.7); hinterland presets and orchards (§4.9); forests; the palisade built before the roads by the village's `EnceinteStrategy` (PART III) |
| G17–G19 | naming, legend / POIs, population class | §10.4, §9.5 annotation layer, §10.2; the ladder's village rows (PART III) |
| R1–R17 | rendering (palette, layers, relief, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | style sheets + programs (§8.2: bands, contour and hachure marks, outline mix, vignette; the palettes on §8.2's targets); the lighting model with its placed lights (§8.4, §4.7; item 68); the relief tier (hillshade, contours, hachures) is an optional base program, off by default; VG's grass-tuft and spotlight looks stay with the village product |
| E1–E6, D1 | export, JSON, permalinks, editing, integrations, performance, scale | §11, §7, §12, §2.1 (metres everywhere; VG's 0.7 m / unit ambiguity removed) |

All 44 rows are not precluded; the base pays for none of them beyond what it needs itself (the relief tier is a base
should-have in its own right, O12 extras). Caution from the parity judge: the five-level plat is the least
village-shaped model — a village with houses along ways leaves L2 / L3 nearly empty — admissible, since a village is one
district and nothing assumes walls or a market (PART III).
=== REPLACE ## §14 Package and module layout, key interfaces, dependency rules, extension points ===
## §14 Package and module layout, key interfaces, dependency rules, extension points

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17). A host's settlement record — SettlementForge's dossier —
enters through one package, the port, and only one folder inside it knows the host's field names; a person with the
canvas tools, an AI clerk through the tool API and a skeleton file all make and change a town with one set of twelve tools.

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (the stamped ranked tiles' construction from a constant
               stream key, run at build time by `plat/tools/stamptiles/` and in a worker only as the fallback rebuild, §8.10), curves, index
               (flatbush / rbush / grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured
               stream mixer of §6.1), concern registry, the composition rungs' transient arenas (a stage-3 `compose()` and the plan rung's
               storeys; `transientArena`, `readBack`, `release`, §3.4)
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest, the core statistics record, the control registry; the
               label records `LabelEntity` and `QuarterNode` (§9.1); the shared view vocabulary `LodBand`, `Role`, `ZoomStop` and the
               label-row tables `LabelTable`, `StringTable`, `GeomTable` with §9.2's `LabelRows` view (§8.1); the records amendments b
               add — `Use`, `Passage`, `Entrance`, `Basement`, `MaterialLedger`, `ElaborationRecord` and the plan records
               (§2.5–§2.8), `Rejection` (§7.7), `DossierRef` (§7.1) and `AccessPoint` (II.7.4); the records amendments c adds (§2.5–§2.9) —
               `Works`, `LightSource`, `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink` (§2.7; their rules §4.11, §4.7 and
               II.7.6), the tier marker (§2.8), the staged `ConditionOverlay`, `DepositSite`, `HistoryHint`, `PowerRelation` and the dossier-backed `Person`
               (schema-complete and empty) — and the document's `dossier` block (§2.9; its `DossierBinding` and `CarriedFacts` are §7.7's)
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), the wealth ladder (`wealthLadder.json`, §4.11) and beside it the Works table (`works.json`: `WorksTable` with its
               calendar row, §4.11), the room programmes and the interior ladder (`roomProgram.json`: `RoomProgramRow` and the
               `interiorLadder` table of `InteriorLadderRow`s, §2.6, §10.2), the roster tables with the basement gate (`RosterTables`,
               `basementGate`, §10.2) with amendments c's rows in them (the class mix, the cluster rows, the quarter identities, the
               power and sector links, the band ranges and the cover table `RosterTables.covers`), the disruption budget
               rows (`DisruptionBudgetRow`, §7.7), the band set (`prosperity.bands`, §4.5), the light rules (`lights.json`, §4.7), the
               underground layer's `undercity`, `underground-systems` and `links` rows (II.7.5, II.7.6), the sugar expansion table
               (`sugar.json`, §7.1), the dossier row sets `tables/dossier/*` (below), the parity presets `MFCG` and `FTG` (§7.6), setting
               packs (§10.4) and the default keymap as versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand and its propagation through the supply edges, government and religion rows, S7b / S10a
               allocation, households and people derivation, the relation-store schema, the economy and personality schema stubs
               (D-32), naming engine + grammar   [S10b placement moved to @plat/plots with the solver, item 16]
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree,
               S7 fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the
               hinterland unit, S12b greenery, S12c the district character step (§4.5, item 72); the StrategyRegistry and the ordering of
               registered StageDecls, the staged network, underground, system, undercity and link registrations included (II.7.2,
               II.7.4–II.7.6)
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys and passages, boundary treatments, the incremental re-cut
               with fixed neighbours (§4.7 S10 (7), §4.11); S11 site plans, packer, heights, footprint templates, the entrance set and the
               basement decision (§2.6); the one placement solver with its relation and supply scoring (§4.7 S10b) and the designation
               mutator (§4.7 S11) with the class mix, the concealed pair and the `cluster` arrangement (§4.7 S10b, S11; items 63, 70, 71)
               and S11's light placement (§4.7, item 68); the BuildingGenerator interface (`outline` / `compose` / `plan`) +
               OutlineBuildingGenerator and the default implementation of `BuildingGenerator.plan` (§2.6)
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator; the knowledge filter over the label rows' `knownTo` (§9.2)
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), the light
               pass — §8.4's lighting model as a post operation over the base raster, its CPU implementation the reference and a WebGL2
               (WebGPU where available) accelerator that draws no marks — with the vector shadow pass as its fallback rung, decoration
               stamps over the bundled stamp-tile asset (§8.10), live layers (`live.stale` and the dry run's ghost `live.ghost` among them)
               and the `states` rows' programs (§8.2), the tile worker's queue of resumable raster jobs (§8.9)
@plat/edit     edit events — the plan events and rung re-rolls, the dossier events with rejections and positive placements, the
               wealth-ladder and passage kinds, the underground tools, the Works and light kinds, the closure edits and the authoring
               toolkit's sugar events and points forms among them (§7.1, §7.3 and §7.7) — dry-run validation, undo and redo records,
               scoped regeneration, rebase, the dependency audit, event migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks, the
               skeleton file (the declared subset, §11.1)
@plat/port     the one door for dossier facts (item 73): `DossierPort` — `digest`, `creation` (door 1's blueprint and the log's
               creation prefix) and `absorb` (door 2's events and epochs), §11.4 — over one adapter folder per SettlementForge product
               line, `adapters/sf/<line>/` (the first `fp-integration-2026-09-23`, pinned at commit `5d699cc68`), each a pure function
               from a host's whole dossier to the neutral `DossierDigest`; the host glue's audience table (below)
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge with its `report.changed`
               event (§11.3) and DocResolver (§11.5), the elaboration cache (`Document.elaborations`, held in the generation worker, §2.9), the clerk's
               tool API over the facade (§11.2, item 101), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3) and the one `WaterSetting` type every record uses, the O9 (c) faithfulness campaign (§13.2), the boolean
               and buffer oracles (Clipper2-WASM in Node, polygon-clipping; §3.7), the clean-room scanner (§17.1 (5)), the D-5 seed list by
               `H32` and the export command (`plat d5 seeds`, PNGs for §13.6), which read only the committed `ftg-captures.json` and
               `ng-counts.json` (§13.6 (2)); the frozen dossier fixtures `plat/tests/fixtures/dossier/` with their `manifest.json` and the
               B-DOSSIER-lite bench (§13.2, items 83, 84)
```

Each stage's declared inputs and outputs are its `StageDecl` registration (§4.1–§4.12); the record types a registration
names are declared at their homes (§2.5–§2.7, §3.4, §4.8, §10.4, II.1, II.6, II.7.4).

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← labels ← render
← edit ← export ← port ← api ← app`; **labels ← render**: the tile worker in `render` runs S13b from `labels`, and the drawn
symbol extents and the display-list index that S13b reads reach it only as the parameters `ObstacleSource` and
`RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports `render`, and the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`, the label-row tables and `LabelRows`) come from `model`; `docs`
reads the registries of `model` and `tables` only; `hood` depends on `layout` / `plots` only through their interfaces;
`sim` depends on `content` and `model` only; `port` depends on `model`, `tables`, `content` and `edit` only
and is imported only by `api` and the reference app's host glue; `render` never imports `layout`; nothing depends on `app`; no package
imports a backend it does not need; every adopted runtime library is imported in exactly one adapter file of the one
package that uses it. Model packages, `@plat/labels` and the renderer code that feeds S13b obey §6.5 (3)'s allowlist
lint, which also scans the vendored dependency sources (§6.5 (4)); it scans the dossier port's adapter boundary too: each adapter
folder declares its **key list** — the host keys it reads, less the field names of `DossierDigest` below, which are the
module's own vocabulary even where one coincides with a host key — and no module of `plat/` outside the adapter folders
names a key on any adapter's list (§6.5 (3); J-A73.02). No import, fixture or script path may resolve outside `plat/`
(§17.1 (3)).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {   // StageDecl (§4.12): id, I/O, stream keys, invariants, ladder, workLimits, budgetMs, batch, lineageUnit, lazy, txForm
  version: string; inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
type ConcernId = number & { readonly __brand: 'ConcernId' };   // u16 from the concern registry (§6.1), generated as typed constants — never a string
interface StreamOpts { reroll: number /* the derivation unit's reroll (§6.1) */; attempt: number /* ladder retry, ≤ the concern's registered cap: 3 for geometric ladders, 8 for naming (§6.1, §9.6) */;
  epoch: number; salt: number /* the concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns */ }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>;
  stream(concern: ConcernId, entity: Handle /* its entity key is cached in the arena beside its lineage hash (§6.1); TOWN_ROOT for town-level draws (§6.1) */, opts: StreamOpts): Stream;
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts /* the defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document */;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy>;
  underground: Map<string, UndergroundStrategy | UndergroundSystemStrategy | UndercityStrategy | UndergroundLinkStrategy> /* II.7.4–II.7.6: registered after the network stage by declared I/O — the systems (catacomb, cavern, quarry, vaults), II.7.3's sewer-front neighbourhoods, the undercity, then the connection stage — their outputs under.blocks, under.plots, under.buildings and under.access placed before the display list by §4.1's order */ }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6); the rows are keyed by §4.5's band set (item 27) and read at the plot's manifested band (§4.11)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: PlatKey): Plat; view(key: ArenaKey, level: Level): LevelView /* a transient arena has level 0 only */; resolve(ref: GeomRef, key: ArenaKey): Resolved; geom: GeomOps; index: SpatialIndex;
  // transientArena(owner, seed, fixed, workLimit), readBack(key) and release(key) are §3.4's — the composition rungs' transient arenas (a stage-3 `compose()` and the plan rung's storeys); ArenaKey = PlatKey | TransientKey (§3.4);
  // a transient arena is read through `readBack` and `view`, never as a `Plat` (§3.4)
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, economy: EconomyShares /* the town-level character, §4.2 S2 (J-A72.43, J-A72.01); never item 72's district CharacterVector */, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/port — the one door for dossier facts (item 73). The contract's own records — DossierBinding, CarriedFacts, DossierChange and the rows
// DerivationRow, ReceiptRow and StatusRow — are §7.7's; the port fills them. Nothing outside the adapter folders reads a host's JSON.
interface DossierPort {
  readonly adapter: { id: 'sf'; line: string /* the SettlementForge product line, e.g. 'fp/integration-2026-09-23' */; version: string };
  digest(raw: unknown, host?: HostContext): PortResult<DossierDigest>;   // the adapter's only job: one whole dossier normalised; an unknown shape refused
  creation(d: DossierDigest, host?: HostContext): PortResult<{ blueprint: Blueprint /* §4.2 S0 */; prefix: EditEvent[] /* the `assign` events at log positions 0…k,
    `creation` and EditBase.dossier set (§7.7 One path) */; binding: DossierBinding; carried: CarriedFacts }>;
  absorb(doc: Document, d: DossierDigest, host?: HostContext): PortResult<{ changes: DossierChange[]; events: EditEvent[] /* dossier events at their weeks, in the
    host's order, decrees first */; epochs: EpochInputs[] /* by §4.11's cadence */; binding: DossierBinding; carried: CarriedFacts; report: PortReport }> }
type PortResult<T> = { status: 'ok'; value: T; notes: PortNote[] }
  | { status: 'refused'; code: 'E_RUNG_UNAVAILABLE' /* a population below 1 500 while no village product is registered (§7.7 item 15) */ | 'E_UNKNOWN_SHAPE' | 'E_LINE_UNSUPPORTED';
      message: string; notes: PortNote[] };
interface PortNote { kind: 'unmapped_kind'|'unmapped_word'|'ignored_key'|'unreceipted_change'|'rename_without_receipt'|'duplicate_key'|'state_matches_absorbed'|'realm_block_used';
  detail: string }
interface HostContext {   // every field optional: used when present, never required (item 20 (h) (iv))
  week?: number /* the campaign's elapsed weeks at delivery: §4.11's last dating rung */; realm?: RealmBlock;
  audience?: { role: 'owner'|'editor'|'viewer'; knowledge?: 'public'|'local'|'secret' } /* set by the host glue's audience table, below */;
  displayNames?: Record<string /* binding key */, string> /* applied inside ONE export request, never stored (item 85) */;
  line?: string /* the SettlementForge line the host runs: picks the adapter, or E_LINE_UNSUPPORTED */ }
interface RealmBlock {   // optional realm data (item 77), filled by the host glue from the campaign's frozen spatial digest — the one campaign fact it may carry (§7.7 item 1)
  partners?: { key: string /* the partner's binding key */; bearingCdeg: Cdeg; distanceM?: M; weight?: number }[];
  cell?: { terrain?: string; river?: boolean; coast?: { sideCdeg: Cdeg } }; mPerRealmUnit?: M /* the realm map's scale */;
  gates?: { toward: string /* a partner's key */; bearingCdeg: Cdeg }[] }
// the neutral digest — the module's own vocabulary; the adapter fills it, and every other module reads only this
interface DossierDigest {
  settlement: { key: string /* `settlement:<id>`, the dossier's own id (§7.7 item 12) */; name: string; tierWord: string /* the map's title word (§7.7 item 15) */;
    population: number /* persons */; seed: Seed /* H32("plat:sf-seed" ‖ the dossier's seed): one-way (below) */; line: string; versions: Record<string, string> };
  site: { terrain: string; access: string; threat: string; magic: string; culture: string /* the profile key */;
    deposits: { key: string; state: 'available'|'depleted'|'removed'|'discovered'; custom?: boolean }[]; isolation?: { status: string; paths: string[] } };
  walls: { records: string[] /* binding keys of the wall institutions */; citadel: boolean; flagged: boolean };
  wealth: { label: string /* the dossier's seven-step prosperity word */ };
  economy: { incomeSources: { source: string; percentage: number /* % of income */ }[]; exports: string[]; imports: string[]; transit: string[]; entrepot: boolean;
    foodImportPct?: number /* % */; foodChains: Record<string, boolean>; chains: { key: string; processors: string[]; status: string }[];
    dependencies: { institution: string; resource: string; severity: number }[];
    tradeLinks: { good: string; goodId: string; flow: 'import'|'export'; partner: string }[]; partners: { key: string; name: string; relationship: string }[] };
  government: { name: string; governingPower?: string; previous: { label: string; cause: string; week?: number }[] };
  powers: { key: string; name: string; category: string; standing: number /* power ÷ Σ power */; governing: boolean;
    controlled: string[] /* binding keys, resolved through the line's stable part (§7.7 item 12) */; relations: { with: string; kind: string }[] }[];
  institutions: DossierInstitution[];
  quarters: { name: string; phrase: string; landmarks: string[] }[];
  notables: { key: string; name: string; role: string; category: string; power?: string; institution?: string; importance?: string; status?: string; replaced?: string }[];
  conditions: { key: string; archetype: string; severity: number; status: string; sinceWeek?: number; untilWeek?: number }[];
  stressors: string[]; religion?: { deityKey?: string; deityName?: string };
  history: { ageYears: number; events: { type: string; yearsAgo: number; severity: string; name: string; week?: number }[] };
  receipts: Record<string /* binding key */, { field: string /* a receipt field of §7.7's receipt table */; week?: number /* its own week */; ref?: string /* its event, outcome or decree id */ }[]>;
  custom: { definitions: { key: string; category: string; name: string }[] };
  ignored: string[] /* the top-level keys the adapter dropped by §7.7 item 1's never-read list, for the report */ }
interface DossierInstitution { key: string /* the binding key (§7.7 item 12) */; name: string; kindLabel: string /* the name without its numeric count range */;
  kind?: string /* the catalogue kind, when present */; category: string; tags: string[]; count?: [number, number] /* a collective record's range */;
  districtScale: boolean; facets: { clandestine?: boolean; subterranean?: boolean }; forbidden: string[];
  state: 'active'|'impaired'|'remnant'|'ruined'|'removed'|'destroyed'|'vacant'; fate?: string; inactive: boolean /* the fate read first (§7.7 item 14) */;
  impairments: { type: string; severity: number; cause?: string; covert?: boolean }[]; knownTo?: 'public'|'local'|'secret'; founded?: { week: number };
  renamedFrom?: { name: string; receipt: 'demoted_by_disaster'|'upgraded_by_reconstruction' }; custom?: { uid: string }; receipts: string[];
  order: number /* the record's position in the dossier: the tie-break of two records of one key */ }
interface PortReport { changes: number; events: number; epochs: number; unreceipted: number; renamesRebound: number; renamesAsRemoveAdd: number;
  ignoredKeys: string[]; stateMatchesAbsorbed?: number /* the index of the earlier absorbed state the incoming dossier equals (§7.7 item 5) */ }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod); plan(…, prior?) } is §2.6's; PlacementSolver and DesignationMutator are §4.7's, RelationRule and SupplyEdge §10.2's
// @plat/labels — S13b's inputs from the renderer, declared here and implemented by @plat/render (labels never imports render)
interface ObstacleSource { protectedExtents(stop: ZoomStop, box: Box): { box: Box; entity: Handle; kind: 'gate'|'castle'|'plaza'|'bridge'|'wall' }[] /* drawn symbol extents at the stop, §9.2 */;
  coverage(stop: ZoomStop, box: Box): { labels: number; protected: number; buildings: number; ways: number; water: number } /* mark cover, for furniture placement, §9.5 */ }
interface RoleIndex { roleAt(p: Point, band: LodBand): Role /* the area mark under a point: halos, §9.4 */; snap(p: Point, radiusPx: number, stop: ZoomStop): Point | null /* the measure tool, §9.5 */ }
// both are implemented by @plat/render over a display list: in the tile worker for S13b, furniture placement and the ruler (the main thread reaches coverage and snap
// through §8.9's queries), in the generation worker over an SVG export's transient list, and in the tile worker over a raster export's (§11.1); every implementation is under §6.5 (3)'s lint
// @plat/labels — LabelPlacer and PlacementJob, which take §9.2's LabelRows view: §9.2
// @plat/model — LabelEntity, QuarterNode: §9.1; LodBand, Role, ZoomStop, LabelTable, StringTable, GeomTable: §8.1, §8.2, §8.8; LabelRows: §9.2
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                backends, threads, TileAddress, TileRasterOpts, TileBackend, RasterJob, VectorBackend: §8.9
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates, renames) — an event carrying fates and renames commits only when a fresh dry run computes the same fates and renames (§11.2) */;
  undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event for the session, §7.4; `of` only for the owner role */;
  redo(doc: Document, session: string): ApplyResult /* appends a redo event */;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff };
  rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's model.seq — when the saved town is kept after
    edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds materialised */): ApplyResult /* as apply, undo and
    redo report: 'ok' when the rebase event is appended at the head; any other `at` returns { status: 'conflict', actions: [{ kind: 'invalid', message:
    'E_REBASE_AT: at must be the log head or h₀' }] }, appends nothing and rebases nothing, on every host alike (§7.1, §11.2) */ }
// the event kinds amendments b add — rejectSite, placeAt, setEntrance, drawPassage, drawTunnel, placeAccess, sealPassage, openPassage, relet, densify, thin, the seven plan events and setRoomUnit, regenerate.rung and §4.11's convert kinds — and those amendments c adds — addUndergroundAccess (a closure edit, §7.3 item 9), drawChamber, addLink, startWorks, cancelWorks, placeLight, the sugar events placeGate, quarter, roster and group, and the points forms of drawBoundary, drawWater, drawWall, drawWay and placeAt — are §7.1's, each with its inverse, its fates and its migration (§7.4, §7.5)
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
  /* runs in the generation worker (§11.1): list = the transient export list for SVG and for raster formats (a raster format transfers it to the tile worker with its
     raster-export request, §8.9, §11.1); null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) */
// @plat/testkit — Baseline, ParityReport: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord, WaterSetting: §13.3; D5Record, D5Pair, FtgCapture, H32: §13.6; CorpusAdapter, CalibrationRun: §13.9;
//                 the dossier fixtures' manifest (DossierFixtureRow) and B-DOSSIER-lite: §13.2
```

**The dossier port (items 73–88; owner: "it is one directional"; J86).** The port is the one producer of dossier facts
on the map: §11.4's door 1 receives its blueprint and creation prefix, door 2 its events and epochs, and no door opens
the other way (door 1 closed to the host's simulator, J86, §11.4). Its parts:

1. **Two halves and the wiring** (J-A73.03). *Digest and creation* are the base's from M1, exercised test-side only by
   B-DOSSIER-lite on the frozen fixtures (§13.2, items 83–84); *absorb* lands at M3a with §7.7's dossier contract; the
   wiring to a live host bridge is the owner's SettlementForge stage (*Staged by the owner's roadmap*). The first
   adapter is `adapters/sf/fp-integration-2026-09-23/`, pinned at SettlementForge commit `5d699cc68` (owner, J86 Q1;
   J-A73.01); a later SettlementForge line is one more adapter folder and a re-cut of the fixtures by the same scripts —
   a registration, never a rewrite.
2. **`digest`** normalises one whole dossier — SettlementForge sends whole dossiers, never a change list. Its first act
   is the ONE-WAY SEED (item 85 (a); J-A85.01): `settlement.seed = H32("plat:sf-seed" ‖ the dossier's seed)` (§13.6's
   `H32`), written into the recipe once at creation; the host's own seed never enters a document, a digest, a link or an
   export (§6.2), and nothing reverses the derivation. It then applies §7.7's key law and class rule (item 12, row DR24)
   — a kind without a class row falls to its category's generic class, noted `unmapped_kind`, a word without a table row
   `unmapped_word`, two records of one key `duplicate_key` —, resolves each power's controlled institutions through the
   line's stable part, and drops every key of §7.7 item 1's never-read list into `ignored` with an `ignored_key` note. A
   shape its adapter does not know is refused `E_UNKNOWN_SHAPE` (a hand-made teaching file among them), a line no
   adapter serves `E_LINE_UNSUPPORTED`.
3. **`creation`** derives the blueprint (§4.2 S0) and the creation prefix — one `assign` per institution record, with
   `existence: 'dossier'`, `creation` and `EditBase.dossier` set — together with the binding and the carried facts, by
   §7.7's derivation table (item 10): the population chooses the rung, the wealth word the wealth level, the access,
   walls and threat rows the gates, walls and defence, the typed slices the trade partners, the sector shares and the
   power standings (§7.7 item 2). A population below 1 500 is refused `E_RUNG_UNAVAILABLE`, naming the village
   product, while none is registered (§7.7 item 15; §1.1).
4. **`absorb`** diffs the incoming digest against `Document.dossier.carried` by binding key — the map's own carried facts
   are the previous dossier, so no host history is needed — into one `DossierChange` per changed element (§7.7 item 13),
   dates each by §4.11's rungs (`HostContext.week` the last; an undated change applies finished, noted
   `unreceipted_change`), groups them by §4.11's cadence into standalone dossier events and `EpochInputs`, re-binds only
   on a receipt of §7.7's key-law table (else `rename_without_receipt`: a removal plus an addition), and returns its
   `PortReport`; a dossier that equals an earlier absorbed state is converged forward, never rewound
   (`state_matches_absorbed`, §7.7 item 5; item 87). The events enter through door 2 as `doc.apply` with `author: 'host'`.
5. **`HostContext`** is optional in every field (item 20 (h) (iv)): `week` the last dating rung; `realm` the realm
   block, whose true bearings turn the map's north first and move gates only for the residual (§7.7 item 2; noted
   `realm_block_used`); `audience` set by the table below; `displayNames` — dossier key → text — applied inside ONE
   export request and never stored, the document keeping the dossier's names (item 85 (b); J-A85.02); `line` choosing
   the adapter.
6. **The audience table** (item 85 (f); J-A85.03) is host glue in this package, never a model rule — the module's roles
   stay §11.3's and a viewer never raises its own knowledge tier (J-A30.82):

| the host's audience | role (§11.3) | knowledge key (§9.2) | what it may receive |
|---|---|---|---|
| the game master | `owner` | `secret` | the document, every export |
| a co-game-master | `editor` | `secret` | the document, every export |
| a player | `viewer` | `public`, raised place by place as the host records what the party learns | views and picture exports under its key |
| an anonymous or gallery viewer | none (no session) | `public` | picture exports (PNG, SVG, print) only |
| a full share by the game master | none (no session) | `secret` | picture exports only — never the document |

7. **The dossier row sets** `tables/dossier/*` in `@plat/tables` — `tiers`, `site`, `access`, `threat`, `deposits`,
   `quarters`, `landmarks`, `distribution`, `kinds`, `status`, `wealth`, `sectors` (the income categories' sector rows;
   the sector set itself is §10.2's `RosterTables.sectors`), `government`, `powers`, `conditions`, `calendar` (the
   `sf445` year: 52 weeks, 13-week seasons from spring), `receipts` and `derivation` — are versioned tables like every
   other (§7.6), provenance `own`, the SettlementForge line named in each table's header and SettlementForge's own words
   in the left column; §7.7 states the rules that read them. The inert-export bar is §11.1's and the bridge's reply
   correlation, source-window check and before-`ready` queue are §11.3's (item 85 (c)–(e)).

**The authoring surfaces and the clerk (item 101; owner: "an elegant set of tools for both an ai clerk and a user where
a dedicated user can build it or emulate it"; J-A101.02).** The three surfaces of §7.1's toolkit — the canvas tools of
`@plat/app` (below), the clerk's tool API (`@plat/api`, over §11.2's facade) and the skeleton file (`@plat/export`, and
§11.1's import as the log's creation prefix, §7.7) — emit the same events; no surface has a declaration the others lack.
A **clerk** is any program that drives the map through the tool API alone — the host's own (SettlementForge's, through
the bridge, §11.3) or the built-in one, which is staged (*Staged by the owner's roadmap*). Its four roles are calls the
API already has (§11.2): it READS through `query` and explains any element through the oracle, `query({ kind: 'why' })`
— the rule, the inputs and the alternatives read from the element's provenance and derivation record; it AUTHORS by
sending declarations to `preview` — the dry run alone, nothing committed — each shown to the user as a ghost
(`live.ghost`, §8.2) with its one-line reason and three variations, and committed only when the user accepts, as an
`edit` carrying `proposedBy: 'clerk'` with the user as its author (§7.1); it CRITIQUES a skeleton ahead of its application
by previewing it as a creation prefix and reporting the dry run's refusals and bends, the requested features the
generation report counts below full delivery (§5.4) and each declared quarter whose placed classes do not meet its
kind's identity row (§4.5) — a temple quarter without a temple, a harbour quarter without a quay, a quarter without road
access (a declared road through a declared wall is no finding: S7's operator makes the gate, §7.3); and it ITERATES on
instructions as further declarations. Its limits are the module's, not the clerk's courtesy: every call passes the dry
run and the undo as the canvas's do; a declaration that would contradict a dossier fact is refused `dossier-owned`
(§7.7 item 11), so no clerk invents or writes one; every read is filtered by the caller's knowledge key (§9.2, §11.2), so
a clerk reads only what its viewer may know; the API carries declarations and reads, never an image, so a clerk never
draws pixels; the only prose it receives from a dossier is the description seed (§7.7 item 1). In the standalone
product the built-in clerk is opt-in and labelled as AI in its drawer.

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the authoring tools — §7.1's twelve, each over the editing events (draw, move, warp, brushes, the four actions, lock,
assign; a dossier element placed here or its site rejected, a passage sealed or opened, plots fused or split, the plan
tools at the building band — §7.1 and §7.7), with the interactions and the contract below; the history panel; the tables
editor and the style dialog; the ruler (§9.5); the gazetteer and the "features in view" list, both withholding the names and
purposes of local and secret places the viewer's knowledge key does not hold (§9.2, §11.2); context help; the family-tree
view (module).

* **The authoring tools as interactions (item 101 (g), (i); J-A101.01).** Each tool is one declaration kind with one
  dry run and one undo (§7.1); its gesture yields a ghost — the dry run's `preview` (§11.2), drawn as `live.ghost` (§8.2) — with
  its handles and counts before commit, and its first-use hint closes once the user has made the gesture:

| tool (layer) | gesture | live feedback | preview and undo | first-use hint |
|---|---|---|---|---|
| T1 `intend` (L0) | pick a site card and a size; drag the wealth and walls sliders (§7.8's basic panel) | the whole town regenerates under the hand within §12's budget | each change one undo step | "Change anything: click it." |
| T2 `ground` (L1) | brush strokes (raise, lower, cliff, flatten); a coast or a river drawn as a knotted curve, a river by its source and mouth; a lake by one point and a level | terrain shades and water reflows live; roads and plots on the stroke re-derive on release | ghost, then commit; handles on knots, level and rim | "Paint hills; drag the river." |
| T3 `wall` (L1) | two or more points, or a drawn line; it snaps to crests and road crossings and closes when its ends meet | towers and gates appear as ghosts at the crossings; the enclosed quarters tint | commit on release; gates are grips that slide | "Roads through the wall become gates." |
| T4 `road` (L1) | two points, or a drawn line, with a class from a short ring of chips (main, street, lane, pier, bridge) | magnetism to roads and gates; a road over water shows a bridge ghost | commit on release | "Drag a road; it snaps." |
| T5 `quarter` (L1) | a kind card, then one seed point, two to four far-edge points, a lasso or a brush; a name | the area tints; the count badge shows the plots, households and buildings it will hold at its band, with plus and minus | ghost with counts and four to eight corner handles, then commit; the handles stay | "Paint a district, pick what it is." |
| T6 `place` (L2) | drop a class stamp on a spot, a quarter or a road, or type a locus; name it | a ghost footprint at the best lawful site with a one-line reason; the alternatives faint | accept or nudge; one undo step | "Drop a tavern near the gate." |
| T7 `roster` (L2) | paste or dictate a list of places | the map fills with ghost sites in one pass; the lines the rules cannot honour listed with their nearest options | accept all, or card by card | "Paste your list of places." |
| T8 `fill` (L3) | brush a density or a class mix over a quarter or a block | buildings re-derive under the brush; three variations in a tray and one density dial | reroll without limit; accept one | "Denser here; more gardens there." |
| T9 `shape` (L3) | click into a plot or a building: split, join, drag corners, set storeys, move the door | the site plan re-derives live inside the plot only | one undo step | shown only after a click: "Shape this one." |
| T10 `hold` (L3) | a lock on any thing, a pin on any placed thing; "keep this, re-roll the rest" on a lasso | locked and declared things dim under the reroll brush; a fates list shows what would move | one undo step | "Lock what you love." |
| T11 `name` (L4) | click a label to rename it, drag it to move it; group quarters under a region name; the leader-line switch (§9.4) | labels re-flow around the change | one undo step | "Names are yours." |
| T12 `dress` (L4) | a style card; the quarter tint; compass, scale bar and cartouche from a tray; an image under the map to trace (§9.5's underlay) | the map restyles live | one undo step | "Make it yours; export." |
| the clerk | a chat drawer beside the map | every reply that changes the map is a ghost with three variations and accept / try again; "why?" on any element answers from the rules | nothing applies silently | "Ask for a walled harbour town with a temple quarter." |

* **The interaction contract (item 101 (f) as corrected by (f′); R1–R19).** The rules the reference UI keeps; their
  evidence is the breadth survey `research/ux/tool-survey.md`, and only the rules are stated here:
  R1 one gesture, one visible consequence, at once — a ghost while the hand moves, the real thing on release, never a
  dialog first; R2 no wrong answers — a declaration is bent to the nearest lawful one and the bend named in one line,
  and refused only against a dossier fact or a lock, always with the closest alternatives (§7.1); R3 preview the
  derived, adjust after — the ghost shows what a declaration will hold and what moves, and everything stays resizable,
  movable and re-rollable after commit; R4 paint, do not parametrise — areas are brushes and lassos with named presets,
  numbers behind "more", and lengths, areas and counts shown while drawing (R17 folded here and into R14); R5
  variations, one dial, reroll — three variations per derived fill, one density dial, every re-roll scoped ("this
  block", "this quarter", "trees only"; §7.3), an unscoped new city only the empty state's action; R6 layers the user
  never manages — draw order is §8.2's semantic order; R7 start from a finished town — the empty state is a generated
  town and the words "change anything"; R8 direct manipulation, no command grammar — pick and act in one motion; R9
  progressive depth — the first screen holds `intend`, `quarter`, `place` and `dress`, while `shape` and `hold` appear
  when a thing is clicked into; R10 the clerk speaks in previews (above); R11 undo is total and cheap, and no action is
  labelled "cannot be undone" (§7.4); R12 learn by doing — no manual needed, one-time first-use hints, tooltips on
  hover; R13 declared means held — what the author declared is pinned by its declaring event and no re-roll moves it
  (§7.2), the fates list saying so; R14 the count badge — every area declaration (quarter, fill, roster) previews its
  plots, households and buildings, with plus and minus; R15 never lose work — every declaration is in the log at once
  (the log is the document, §2.9), the history panel restores any earlier log position by logged undo events (§7.4),
  and the skeleton exports and re-opens at any time; R16 everything derived has a handle and move is first-class, singly
  and in groups (`moveFootprint`, `moveVertex`, `moveLabel`, instance moves, a multi-select move over any scope); R18
  hand off data, not a picture — a virtual-tabletop user gets one file, walled, lit and on the grid (§11.1); R19 the
  clerk is optional, labelled as AI and preview-first, never draws pixels, and every export carries which elements were
  declared, derived by rule or proposed by a clerk (§11.1). The three questions the survey left open are measured by
  §13.4's first-five-minutes test, each with its pre-decided fallback (J-A101.03).
* **Input scheme** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like every table).
  Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a district fills the
  view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind (MFCG's ward reroll);
  *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of the entity's own
  edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4); dragging a selected
  vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus: **A** alleys at
  the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T** trees, **M** ruler,
  **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New random on the
  selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit, **?** the
  keymap overlay. Bindings are active only while the map region has focus; an embedding host can switch global bindings
  off; every bound action is also on a menu or a button.
* **Accessibility** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the tables editor)
  meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description
  come from the control registry (its label and documentation anchor); every icon button has a text label. Every action
  is reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map
  region takes arrow-key panning and **+ / −** zoom; every authoring gesture has a keyboard form — a points form's points
  placed at the focus with the arrow keys and Enter, handles cycled with Tab, a brush applied to the focused entity's
  scope. **The non-visual route to the map** is the gazetteer (list and
  search over districts, quarters, streets, buildings, institutions and pinned people through `query`) and the "features
  in view" list (the entities whose marks are visible, grouped by kind, ordered by distance from the view centre, each
  announcing its name, kind and district); selecting in either list selects on the map and the reverse. UI text
  contrast ≥ 4.5 : 1 and UI components ≥ 3 : 1 (the map follows §8.2's contrast matrix); the reduced-motion preference
  turns off animated zoom; the UI scales 100–200 % without loss. Tests: §13.4.
* **Context help and the guide** — every control and panel carries a help link to its anchor in `@plat/docs` (§7.8's
  documentation anchor), opened in a side panel. The guide's reference pages are generated from the control registry
  (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table schemas
  (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and the
  tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json` (id,
  symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view** (module tier, M4b) — reads `query(h, { kind: 'relations', person, up: n, down: m })` over the
  relation store (§10.3): generations in rows by birth epoch, partners side by side and children below; branches beyond
  two generations elided into a count that expands on click; re-root on any person; opening a person never pins it
  (§10.3); keyboard-operable as a tree grid.

**Extension points:** every `Map` in `StrategyRegistry` (stage 2 registers the three template fabrics; a village product
registers a tracker `NetworkStrategy`, a palisade `EnceinteStrategy`, a density `StageDecl` and a "houses along ways"
`FabricStrategy`; the owner-staged layers register `SkyStrategy`, `SewerStrategy`, `UndergroundStrategy`, `UndergroundSystemStrategy`,
`UndercityStrategy` and `UndergroundLinkStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3) and the default implementation of its `plan` step (§2.6); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver` and the `DesignationMutator` (§4.7 S10b, S11); `CorpusAdapter` (§13.9);
an adapter folder per SettlementForge product line in `@plat/port` (item 73); the light rules and the sugar expansion
table (data); and any clerk, through the tool API (§11.2) — the host's own or the staged built-in one.
=== APPEND TO SECTION ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
* **Amendments c's owner rules (items 20 (h), 63–72): hook tests and acceptance bars.** They are stated once, here (R9);
  the mechanisms they prove are at the homes §0.2 names (the character at §4.5, placement at §4.7, Works at §4.11, the closure at
  §7.3, the dossier at §7.7, light at §8.4, the underground at II.7.3, II.7.5 and II.7.6), and
  the rules of the amendments-b group above apply to them: a bar is hard — 0 violations, or 100 % — unless it names a
  band; each runs in the CI tier §13.8 names, from the milestone §16 names; the bars of a staged engine (the underground
  layer, the evolution engine) run on hook fixtures with its conversions applied by hand until the engine lands, when the
  same bars bind it (J-A63.01). The entity registry's path test covers the records and attributes §2.8's registry lists
  for amendments c — `Works`, `LightSource`, `UndergroundSystem`, `Gallery`, `Chamber`, `UndergroundLink`, the tier marker,
  `Plot.tenure`, `District.character`, `identity`, `pressure` and `nameHistory`, `Assignment.state`, `Institution.powers`
  and the staged records, schema-complete and empty — and the enumeration test the event kinds amendments c adds (§14's
  list); a bar that meets a golden follows §13.3's declared-shift rule.
  * *Clandestine institutions (item 63; §4.7).* (T63-1) every clandestine institution is placed in one of its allowed
    modes — front, hidden or underground — or in its reported fallback (underground → front → hidden); (T63-2) at the
    `public` tier every view, label, query answer and export shows only the front — the true function, its concealed
    rooms, door and link withheld (T30-5's enumeration, run on a fixture holding a front with its hidden function) — and
    at `secret` both; (T63-3) the B-PLAN fixtures confirm that a front's concealed rooms are reachable only from its
    concealed entrance or its service side (from stage 3's intake; in the base the schema fixture carries the flag and the door);
    (T63-4) over 1 000 seeds the `underground` mode is never chosen without an underground allocation (II.7.3), and the
    parity presets place no concealment.
  * *Basement access (item 64; II.7.3).* (T64-1) an access point stands only where a basement lies within the access reach
    of a tunnel or a sewer dwelling; (T64-2) over 500 CITY seeds on the layer's hook fixture the access rate of each class lies
    within its row's probability ± 3 s.e.; (T64-3) clandestine buildings over a network carry an access at least at their
    row's rate times the concealment multiplier. T12-1's clause on where an access point stands is the amendments-b
    group's (public ground, a yard or a building's basement).
  * *The underground family and the undercity (item 65; II.7.5, II.7.6).* (T65-1) an undercity exists only where a void
    source exists and at least one lifeline reaches it; (T65-2) on 500 seeds per rung its neighbourhoods stay within
    `RungProfile.layers.undercity` (§1.1) — none on the village rungs, at most one at TOWN and only above that row's
    population floor, at most two at CITY and three at METROPOLIS — and the circumstance `require` gives one at TOWN and
    above while `forbid` gives none; (T65-3) every building under a ceiling is capped by it (its eave below the chamber's
    ceiling less the row's clearance); (T65-4) every connection link is typed (open, gated, secret, collapsed, flooded)
    and knowledge-gated; (T65-5) the population stays whole — the settlement's households are the same set with and
    without an undercity; (T65-6) U1–U3 hold on the sewer's part with an undercity present, and re-deriving one
    underground system leaves the ground and every other part byte-identical (the per-part twin of T12-1's reroll
    isolation; §3.10's row).
  * *The closure rule (item 66; §7.3 item 9).* (T66-1) `addUndergroundAccess` on a building without a basement gives a
    lawful basement — full, half or a hatch to a crawl space, by the terrain gate — or a stated refusal, never a silent
    change; (T66-2) every generated connector is reachable end to end and lies inside its depth band; (T66-3) its undo
    restores the document byte for byte; (T66-4) a second access sharing a connector survives the first one's deletion,
    and the last one's deletion removes only the pieces nothing else uses.
  * *Works and the weekly clock (items 67, 76; §4.11).* (T67-1) the stage drawn at week w is a pure function of the
    Works record and w: reached directly or by scrubbing forward and back, every drawing is byte-identical and no model
    digest moves; (T67-2) no Works leaves a plot without an access edge at any week; (T67-3) a merge or a split shows the
    old boundary until its clearing stage; (T67-4) a demolition's households are rehoused (item 17) before its first
    stage; (T67-5) no Works at generation and none under the parity presets, the goldens unchanged; (T67-6) on the hook
    fixture an epoch's share of buildings in works lies within ± 3 s.e. of growth × mean duration ÷ span, and a decay
    Works within its dwell band; (T76-1) an epoch folds at each 52-week boundary and at a population move past the roster
    tolerance, none on a 2 % drift, with `years` = Δweeks ÷ 52, and per-year rates give equal expected firings under a
    weekly and a decade cadence.
  * *Light (item 68; §8.4, §4.7).* (T68-1) a spot lit from every side by several point lights carries no shadow;
    (T68-2) no shadow climbs a taller roof; (T68-3) a shadow falling on a lower roof is shortened by that roof's height
    and continues beyond that roof onto the next building or the ground; (T68-4) on the CPU reference the lighting is
    byte-identical for the same model, lights, view and time on the five engines (§6.5 (9)); (T68-5) at night every way
    class × band reaches its light rows' target minimum illuminance on the CPU reference, interpolated along the value;
    (T68-6) no light stands on a hidden, sealed or clandestine plot unless a row places one; (T68-7) the GPU pass lies
    within §13.4's tolerance of the CPU reference; (T68-8) with the GPU lighting unavailable (no GPU, a lost context) the
    next rung of §8.4's ladder is drawn and reported, never an error (§5.2); (T68-9) no light on a building in Works
    before it is finished (item 67).
  * *Informal clusters (item 70; §4.7 S11).* (T70-1) every structure has its own door on a footpath that reaches an access
    edge of its plot; (T70-2) the fire-gap minimum holds between structures; (T70-3) the households per structure
    lie within the row and within each structure's capacity; (T70-4) no cluster stands on a standing plot whose geometry
    floor is the middle band or above, none in a district whose band range excludes the squalid band, and no structure in
    a wall strip; (T70-5) under the parity presets the shanty districts draw FTG's tents row and MFCG's hovel (T27-2's
    shanty fixture extended).
  * *The class mix inside a band (item 71; §4.7 S10b).* (T71-1) inside a band row the manor share rises monotonically
    with the prosperity value, reaching 1 at the extreme of the table; (T71-2) at equal relative position a wealthier town shifts
    the share in the declared direction; (T71-3) in mixed blocks the largest classes stand on the highest-prestige
    frontages at a share above a shuffled-placement baseline by §13.7's margin; (T71-4) manors on joined plots and houses
    on standard ones within one block.
  * *The neighbourhood's character (item 72; §4.5).* (T72-1) the character vector is a pure function — recomputed from a
    saved model it is equal; (T72-2) a district's name changes only past the hysteresis or by a rename; (T72-3) value,
    not volume — the owner's fixture: many lodgings never outweigh a few churches, and three churches or one cathedral
    alone make the religious quarter; (T72-4) one district per district-defining dossier instance, its defining trade at
    the row's share and not on every lot; (T72-5) dispersed classes spread, none gathered into one district by rule;
    (T72-6) every building's prosperity-driven state lies inside its district's band range, an institution's excess
    raising the district's pressure; (T72-7) a shared building's total amplification and contribution never exceed a
    single-power building's of equal significance; (T72-8) the economy dial is proportional to the sector's share with no
    rank bonus, and an even mix is neutral.
  * *Derivation fills every gap (item 20 (h); §7.7 items 9–11).* On the dossier fixtures of the port's group below and,
    standalone, on blueprints (J-A20.06): (T20-7) no derived fact contradicts a dossier fact — every derivation row's bar
    holds, counted by §5.3's coherence rows; (T20-8) a dossier change re-derives exactly its disruption set — the rows
    whose inputs it changed — and nothing else; (T20-9) a map edit of a dossier-owned value (a dossier name or kind, a
    dossier-set `knownTo`, concealment, front or state, a count outside its range, the population) returns F-EDIT
    `dossier-owned` and changes nothing; (T20-10) the totality test — every map-fact family of §2.8's registry is covered
    by a derivation row, and every row's chance is a registered §6.1 concern or none (one test with T73-10; J-A83.01);
    (T20-11) a schema test that every door and `HostContext` field beyond the dossier's content is optional; (T20-12) from
    M1 the rows run on the frozen fixtures and, as the stand-in dossier, on a blueprint's own roster, T20-7 and T20-10
    holding on both (T22-1's purity and T20-5's one-way bar stand).
* **The dossier port (items 73–88): B-DOSSIER-lite and the port's bars.** The frozen dossier fixtures (item 84; J-A84.01,
  J-A84.02) live in `plat/tests/fixtures/dossier/` — inside `plat/` by §17.1 (3)'s path rule, and never under `research/`
  or `captures/`, whose JSON the document checks read as corpus. They are cut only from runs of the named SettlementForge
  line — the first `fp/integration-2026-09-23` at commit `5d699cc68` (J86 Q1) — never from an on-disk working tree, and
  are re-cut by the same scripts when the owner names another line; the build copies them at M1. Their `manifest.json`
  holds one row per file:

```ts
// @plat/testkit — the dossier fixtures' manifest (items 83, 84)
interface DossierFixtureRow { file: string; sfLine: string; commit: string; generatorVersion: string; seed: string /* the synthetic seed the file was generated from */;
  config: string; generatedBy: { lane: string; date: string }; kind: 'birth'|'after-events'|'after-ticks'|'world-state'; pairsWith?: string /* the file it pairs with */;
  population: number /* persons */; tierWord: string; ourRung: Rung | 'refused'; notes: string;
  neverPublish: ('seed'|'config')[] /* the host's seed and config fields inside the file: kept for re-cutting, never carried by an export or a document (item 85) */ }
```

  The set: nine at-rung births — town-1 Berghafen (2 130 people, TOWN), town-2 Novaorum (3 174), town-3 Glenford
  (2 492), sample-mossgate (4 155), town-nb-1 Novasaltus (4 921; the one set of partner-level trade links), town-cc-1
  Großmark (4 196; a custom-content record keyed by its local uid), city-1 Pianopagus (23 178, CITY), sample-blackcrag
  (18 911, CITY) and metropolis-2 Ventovicus (47 734, METROPOLIS); three refusal births — culture-latin Collevilla
  (1 287), sample-cnocby (767) and village-1 Lipopol (782); the totality-only files — the twelve culture towns,
  metropolis-1 and metropolis-3; and the pairs for the absorb half — the probe town before and after seven events with
  its per-event record; town-1 and city-1 after one week, one season and one year under the birth default and after a
  lit year, each with its world state; the probe town after a plain and a lit year; village-1 after its years.
  **B-DOSSIER-lite** runs each at-rung birth × 5 seeds (the fixture's derived seed, then four `rerollLayer` salts) through
  `digest`, `creation` and `generate`, and holds:
  * *the creation bars* (M1): (T73-1) every dossier record placed — 0 tier-6 omissions; (T73-2) the population within
    ± 5 %; (T73-3) the residential building count inside the housing record's range; (T73-4) every collective record's
    count inside its range; (T73-5) walls exactly when the walls bucket holds a record, the number of gates inside the access
    row's range; (T73-6) every quarter name on exactly one district, or reported waiting (§7.7 item 16); (T73-7) the
    population-weighted mean household band within one band of the wealth row's mapped band; (T73-8) the cross-engine
    digest, stated in §6.5 (9) and scheduled here; (T73-9) the three refusal fixtures refused with `E_RUNG_UNAVAILABLE`
    naming the village product, at birth and after their ticks; (T73-10) the vocabulary totality — every enumeration
    value of the fixtures has a table row or the declared fallback, the port's `unmapped_word` notes 0 and its
    `unmapped_kind` notes equal to the M1 class gap, listed (one test with T20-10; J-A83.01);
  * *the absorb bars* (M3a), on the pairs: (T75-1) every `DossierChange` dated by a rung of §4.11 or reported
    `unreceipted_change`; (T75-2) every removed element's plot vacant and every ruined one present as its ruin; (T75-3)
    the seven-event pair's disruption within its budget or reported over it; (T75-4) the host's undo — the before-dossier
    fed after the after-dossier — converging with `state_matches_absorbed`, its residue reported; (T75-5) a rename with
    a receipt re-bound, one without reported as a removal plus an addition;
  * *the typed slices and the rung* (M1, M2b and M4): (T77-1) `TradeFlow`'s gate weights sum to one, a harbour town's
    harbour carries the sea share, a way's trade weight equals the sum of the gate weights routed over it, and a partner's
    bearing does not move when an unrelated fact changes; (T81-1) an epoch whose population target crosses a band upward
    changes the rung's row and grows the frame (§3.2 (9)), every entity inside the old frame keeping its address and
    geometry;
  * *the seam's bars* (item 85; M1): (T85-1) CI runs hostile names — markup, script, event attributes, entities and
    control characters, very long and right-to-left strings — through every exporter as dossier names, display names and
    user renames, and every output is well-formed and inert by §11.1's bar; (T85-2) a dossier-bound document, its
    snapshot, its permalinks and every export hold no occurrence of the host's seed, and the recipe's seed equals
    `H32("plat:sf-seed" ‖ that seed)`; (T85-3) from M3a, display names reach only the export they were given to — the
    document and the next export are unchanged.
* **The authoring toolkit (item 101; §7.1, §14): elegance bars and fixtures.** (T101-1) at most twelve tools — a
  registry test that every tool maps to its declaration kinds in §7.1's table, so a thirteenth tool fails it (a new
  capability is a parameter of a tool); (T101-2) each tool is one declaration kind with one dry run, one fate report and
  one undo step (an enumeration over the table); (T101-3) the same declaration made on the canvas (a scripted gesture),
  through the tool API and in a skeleton file gives one event, byte for byte; (T101-4) a map's declared subset exported
  as a skeleton and re-imported under its seed reproduces its model digest, and a clerk's transcript of tool calls,
  replayed, gives the session's digest (§6.5 (9)); (T101-5) no declaration contradicts a dossier fact or a lock without
  a refusal carrying its reason and at least one closest alternative; (T101-6) J78's acceptance fixture (M3a) — an
  original skeleton with a known city's structure and our own names (`docs/experiments/known-city-authoring.md`; J78) —
  authored three ways: as a skeleton file, by hand through the scripted canvas, and through the tool API from a clerk's
  recorded transcript made from the fixture's description and roster; the skeleton file and the hand-authored map share one model digest under
  one seed, and all three meet the fixture's structure list (every declared quarter by kind and name, both enceintes with
  their gates, every named place in its declared quarter); (T101-7) points in, shape out — a two-point wall over the
  ridge fixture follows the ridge and closes when its ends meet; a seed quarter never crosses a block and its boundary
  lies on street centre-lines, water, walls or ridges; a level lake's shoreline equals the terrain's contour at that
  level; (T101-8) declared means held — a scoped re-roll over a quarter holding declared entities moves no declared entity,
  the fates list naming each one held; (T101-9) the count badge of a quarter, a fill or a roster equals the plots,
  households and buildings its committed event makes.
=== APPEND TO SECTION ### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===
**Fixtures added by amendments c (items 45, 53 and 65; the kernel seat's own rows stand in §3).** *The regular
fit* (item 45's castle repair): regular n-gons (n = 3 … 12, radius ≥ 5 m), rotated and snapped, return every target
within 1 cm of its vertex and a compactness within 10⁻³ of that n-gon's own; every rotation of a ring's vertex order
and its reversal (clockwise input) return identical targets bit for bit; a thin rectangle (sides 1 : 3 or thinner) falls
below compactness 0.75, its targets lying on a square; a side split into many short edges leaves the centre unchanged; fewer
than three vertices, a zero-area ring and a vanishing first component return `E_DEGENERATE` (detail `fit`); the
service's doubles are identical under §6.5 (10)'s cross-implementation test. *The sampler* (item 53): every accepted
point lies within [r₀, (1 + a) r₀] of the active point it was drawn from, beside the existing Poisson minimum distance
≥ r. *The underground parts* (item 65): two systems crossing in plan without meeting commit in two parts with no vertex
at the crossing in either, each part passing every hard invariant; a link record resolves one vertex in each part; a
transaction on one part handed a slot of another asserts in a debug build; `corridorUnion` over a gallery chain gives
its kerb at `widthCm ÷ 2 + wallCm`; a chamber outline at L1 separates floor from rock, and S10's frontage cut lands on
the floor.
=== APPEND TO SECTION ### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1 ===
**Amendments c in the goldens.** The nightly cross-platform run also holds §6.5 (9)'s *session-history independence*
test (item 52) — for 20 golden seeds, a seed's model digest generated first in a fresh process equals its digest after
50 other maps and after every view toggle and zoom stop — and B-DOSSIER-lite's fixture digests (T73-8, §13.2). The
mechanisms amendments c adds reach the goldens by the declared-shift rule above, never silently: the milestone that
first places `LightSource` records (§4.7; item 68) writes a shift record for S11 with cause `feature`, because the
records join every golden's model digest (§6.2); the class mix (item 71), the informal clusters (item 70), the concealed
pairs (item 63) and the character step S12c (item 72) write theirs at the milestones that land them (§16); generation
makes no `Works` (§13.2 T67-5), so the transitions move no golden. Lighting, its buffers and its light maps are in no
model digest (§6.2): changing the light pass is a paint-program change — it bumps the style version of every sheet it
draws (§6.4) and its PNGs are re-signed through visual regression (§13.4), never a model shift (J-A68.01).
=== APPEND TO SECTION ### 13.4 Visual regression, B-ZOOM and the app harness ===
* **The light pass (item 68; §8.4).** The GPU pass is held to the CPU reference: on the golden suite's day and night
  stills with the cursor sun at nine fixed pointer positions, per pixel of each lit tile the absolute difference per
  8-bit channel is ≤ 2 at the 99.9th percentile and ≤ 0.5 on average (provenance "architecture 2026-09-28"; J-A68.02), from M2b
  for the day view and from M3b for the night view; **pre-decided fallback** — a tier whose GPU pass misses runs the pass
  at full float precision with the march step halved and is re-measured; still missing, that tier draws rung 3 of §8.4's
  ladder and the miss enters `known-defects.json`. B-ZOOM runs its legibility floors, §9.4's label checks and §8.2's
  contrast matrix on the night view as well as the day view, every label composed after the pass (§9.4), and checks that
  each rung of the fallback ladder draws a legible map (a forced rung-3 run per preset).
* **The palette acceptance bar (item 69; §8.2; J-A69.01).** On §8.2's fixed measurement render, every shipped family
  lies inside its targets — paper luma and warmth, darkest-ink luma and warmth, and plate chroma (`ink` 20–30, the other
  families inside the band at §8.2's scale) — measured by our own code from §8.2's definitions, no corpus instrument in
  `plat/`; it runs in B-ZOOM from the milestone that ships each family's bands (`ink` from M1, where its values ship;
  `lit` at M2b; the ink-family variants at M3b; `hatched` at M5). A family outside a target fails the bar; §8.2's
  scripted chroma sweep re-finds that family's scale on the render and the bar repeats — a re-signing of role values by
  their own rule, never of the targets, which are the owner's (§13.7).
* **The first-five-minutes test (item 101 (f′); J-A101.03).** At the M2a exit and again at the M3a exit, five to eight
  casual game masters who have never seen the product each receive a generated town and complete, without help, a
  *quarter* task (declare a named quarter of a given kind), a *place* task (put a named place near a named landmark), a
  *dress* task (change the style and add a compass) and one *scoped re-roll* that keeps what they declared, within their
  first five minutes with the product; the test passes when every participant, or all but one, completes all four, each
  failure recorded with its task and the step where it stuck. The result is an exit criterion of the milestone's
  `MilestoneRecord` (§13.3); no amount of review reading replaces it. **Pre-decided fallback:** a task two or more
  participants fail gets its tool's first-screen placement and first-use hint revised (§14's contract) and is re-run
  with new participants before the milestone exits. The same sessions measure the three questions the UX survey left
  open, each with its pre-decided fallback: *touch editing* — two participants per session work on a tablet; every tool
  takes touch, and if they fail where the pointer users pass, touch is kept for L0–L2 (intend, ground, wall, road,
  quarter, place, roster) and L3–L4 become pointer-only, stated in the guide; *a preview-first clerk* — where a clerk is
  connected, its proposals arrive as previews, and if participants find them slow an apply-then-undo mode is offered as a
  user setting (each applied proposal shown with its one undo; never silent), off by default; *declared means held* —
  if the re-roll task surprises participants who expected everything to change, each re-roll shows a visible
  "keep / change" toggle on the declared entities in its scope.
=== APPEND TO SECTION ### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30) ===
**Rows added by amendments c.** One threshold no reference can set joins the tables above under J-T (J-A71.01):

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| item 71 prime frontages | in mixed blocks, the largest class's share of plots on prime frontages (tier-1 ways, squares, park edges, corners, water) exceeds a shuffled-placement baseline — the same plots with their classes permuted inside each block, 20 permutations — by ≥ 0.15 (provenance "architecture 2026-09-28"; §13.2 T71-3) | M2b | the frontage-prestige weight of S10b's score doubles once and the measurement repeats; if still failing, the margin becomes the measured p10 — **not achieved** |

The palette targets of item 69 are neither reference-settable nor ours: they are owner-set numbers — the corpus bands
the owner released on 2026-09-27 (§8.2; provenance `corpus`, "owner-opened corpus palette exception") — like an owner
pick on the threshold panel, so no fallback moves them; §13.4's bar confirms that each family lands inside them, and only
the reconciliation stage may re-sign them (§13.9).
=== APPEND TO SECTION ### 13.8 CI tiers and compute budgets (SCL-18; D-34) ===
**Amendments c in the tiers (J-A83.02).** The owner-rule hook tests of §13.2 (T20-7 – T20-12, T63 – T72, T76-1) run in
the PR tier on the golden TOWN and CITY fixtures and their hook fixtures — T63-4's 1 000 seeds and T64-2's and T65-2's
500-seed sweeps nightly — and nightly on B-CITY-lite; the light bars T68-1 – T68-6, T68-8 and T68-9 in the PR tier on the
golden fixtures, T68-4 and T68-7 nightly on the five engines. **B-DOSSIER-lite** runs its nine at-rung births × 5 seeds
with the creation bars, T77-1 and T85-1 – T85-2 in the PR tier from M1 (≈ 45 generations beside B-CITY-lite's 600); the
totality files and the culture towns (T20-10, T73-10) nightly; the absorb bars on the pairs and T85-3 nightly from M3a;
T73-8's digest in the nightly five-engine run; T81-1 in the milestone tier from M4. The toolkit's bars T101-1 – T101-5 and
T101-7 – T101-9 run in the PR tier from the milestone that lands each tool (§16), T101-6's three-way fixture in the
milestone tier from M3a; the palette bar with visual regression nightly. The first-five-minutes test (§13.4) is a human
session at the M2a and M3a exits, outside the CI budget. The budgets above do not change: the PR tier's added work is
measured at M0 with the tiers, and this section's fallback applies to it like any other over-run.
=== APPEND TO SECTION ### 13.9 The corpus-calibration interface (staged by the owner; DEF-9) ===
6. The owner released the corpus's palette bands on 2026-09-27 (item 69; §8.2): they are the one corpus content in
   this design, arriving as numbers the owner stated in item 69, so the program still reads no corpus file; every other corpus
   fact stays with this staged phase, and a definitional mismatch between our measurement and the corpus's own is
   re-signed here, at the reconciliation stage, never by opening the corpus earlier.
7. Amendments c's tables join the first re-signing (items 67, 68, 70–72): the class-mix and prestige rows (§4.7 S10b,
   §10.2), the cluster rows and tenure defaults (§4.7 S11, §10.2), the quarter identities, significance, band ranges and
   the dials' weights (§4.5, §10.2), the Works durations (§4.11), the light rules (§4.7) and the underground layer's
   system and undercity rows (II.7.5, II.7.6) — every cell `{value, unit, provenance, calibratable}`, as (2) requires.
   The dossier row sets (§14) are not re-signed by the corpus: they map a host's vocabulary, not a measured quantity.
=== REPLACE ### 1.1 What is built, in what order; the two size ladders ===
### 1.1 What is built, in what order; the two size ladders

| stage | what | depth in this document |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator on the ladder **TOWN → CITY → METROPOLIS**, fusing MFCG-class and FTG-class generation plus O1–O19 (§15.2): the plot model, plot granularity, the prosperity field, greenery, heights, editability, permanent addresses, layers, drainage, every owner hook, and the optional content module `@plat/sim` (its own milestone, M4b) | build-ready: §2–§14, §16 |
| **STAGE 2** (built in this program at M5, after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds and one style system | interface depth: PART II; what the base must already carry is a base requirement (§2.5, §4.12) |
| the later stages of the owner's roadmap | stage-3 building compositions with their floor plans elaborated by click (the plan rung, §2.6), the village product, the underground layer — the sewers with their neighbourhoods, catacombs, caverns, quarries and the undercity (II.7) — and floating islands (II.6), the evolution engine — decline and regrowth, use relocation, the wealth ladder, the works on the weekly clock, slow terrain change (§4.11) — corpus calibration, SettlementForge inputs (the dossier port's wiring to a live host; the port and the dossier contract are the base's, §14, §7.7, §11.4) | hooks only — the one list is *Staged by the owner's roadmap* |

**The two ladders.** The town/city generator scales **TOWN → CITY → METROPOLIS**; the village product scales
**THORP → HAMLET → VILLAGE** (PART III). The ladders meet without a gap or an overlap: the village ceiling and the base
floor are both **1 500 inhabitants** (D-33). **Size within a rung follows population:** the request's population
chooses the rung whose band contains it — bands include their lower bound and exclude their upper one: TOWN [1 500,
10 000), CITY [10 000, 30 000), METROPOLIS [30 000, 120 000] — and every quantity below it (roster, stage budgets,
district count, frame, plots) is computed from that population, never from the rung's target; a request that names a
rung without a population takes the rung's target. All three rungs generate from M1 — a rung is a `ladder.json` row on
the one pipeline, not a separate build — so M1's goldens, B-CITY runs, determinism tests and diagnostic side-by-side
include METROPOLIS; M2b measures and tunes it (§16).

**The rung profile.** Everything the owner's rule defines per rung lives in one versioned data table, `ladder.json` in
`@plat/tables`, one `RungProfile` row per rung, calibratable like every table (§7.6) and refined by the corpus phase
(§13.9):

```ts
interface RungProfile {
  rung: 'TOWN'|'CITY'|'METROPOLIS' /* the base's rows; the village product adds 'THORP'|'HAMLET'|'VILLAGE' rows of this type (PART III (5)), their layers 'none' and 'never' */;
  populationBand: [number, number]; populationTarget: number;           // the band chooses the rung; the target is the default request
  frameAreaKm2AtTarget: number; aspect: [number, number] /* 0.5–2; square by default */;   // the frame scales with the requested population (§3.2 (9))
  stageRows: StageRowRef;                                               // stage count, regimes and walled shares (§4.2 S2)
  budgets: BudgetRef;                                                   // model, first-map and memory budgets (§12.3, §12.5, §12.8)
  granularity: { frontageScale: number; depthScale: number; joinMaxDelta: Record<ProsperityBand, number> };   // scales the §4.7 rows
  greenery: { parkPer1000Scale: number; edgeGreenProb: number; privateGreenShift: number /* points */ };       // scales the §4.9 rows
  districtCountLaw: LawRef; gateLaw: LawRef;                            // §4.5, §4.8
  matched: { mfcgSize: number; ftgSize?: 'BIG_TOWN'|'BIG_CITY'|'METROPOLIS' };   // the side-by-side references (§13.6)
  layers: { islands: 'none'|'possible'; sewers: SewerExistenceRow; undercity: UndercityExistenceRow };   // the sky layer's rung gate (II.6 (2), item 13), the sewer layer's existence by tier (II.7.1, II.7.4, item 14) and the undercity's (II.7.5, item 65); the village rows read 'none', 'never' and 'never' (PART III)
}
```

| rung | population band (default target) | buildings at the target | frame at the target (area; side at the default aspect 1, §3.2 (9); + 30 % margin per side) | stage rows (§4.2 S2) | granularity (frontage × / depth × / rich join max +) | greenery (parks per 1 000 × / edge green or orchard probability / private green shift) | matched references (§13.6) | layers: islands / sewers / undercity (II.6 (2), II.7.1, II.7.5) |
|---|---|---|---|---|---|---|---|---|
| TOWN | 1 500–10 000 (5 000) | 1 200–1 500 | 4 km² (2.0 km) | 2 stages; walled core 0.90 of buildings, ribbon 0.10 | 1.10 / 1.10 / 0 | 0.8 / 1.0 / +5 points | MFCG size 40; FTG BIG_TOWN (≈ 5 600) | none / `law` (II.7.1's defaults) / `law`: at most 1, above 6 000 people, chance 0.2 |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 25 km² (5.0 km) | 3 stages; 0.55 / 0.33 walled, ribbon 0.12 | 1.00 / 1.00 / 0 | 1.0 / 0.6 / 0 | MFCG size 80; FTG BIG_CITY (24 500) | possible / `always` / `law`: at most 2 |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 64 km² (8.0 km) | 4 stages; 0.30 / 0.30 / 0.28 walled, ribbon 0.12 | 0.90 / 0.95 / +1 | 1.2 / 0.4 / −3 points | MFCG size 130; FTG METROPOLIS per D-31 | possible / `always` / `law`: at most 3 |

**The layers column** (items 13, 14 and 65; J-A13.01, J-A65.01). `layers.islands` is the gate II.6 (2) reads at generation and again at
every epoch: islands are possible at CITY and METROPOLIS and never at TOWN or on any village rung, and inside the gate
II.6's supply and count laws decide whether any exist. `layers.sewers` is II.7.1's existence row: a TOWN draws its sewers
at S0 by a law of its population and wealth, never certain; a CITY or METROPOLIS always has its network, its toggle
showing or hiding it; the village rows carry `never`. `layers.undercity` is II.7.5's existence row (item 65; owner: "the
undercity is at most 1-3 neighborhoods"): `never` on the village rungs; `law` at TOWN with at most one neighbourhood, and
there only above 6 000 inhabitants and by a draw of 0.2; at most two at CITY and three at METROPOLIS — II.7.5's rule
deciding inside that bound whether a void, a demand and lifelines allow one, and the dossier's `undercity` circumstance
requiring or forbidding it (§7.7). All three are per-rung data of `ladder.json`, where D-33 keeps every per-rung fact.

**Budgets inside a rung.** Because size follows population, a rung's budgets are laws of its building count, never
one number per rung: model time §12.3 (with where O3 (d)'s bars hold and the declared miss above), the first map
§12.5, memory §12.8, the ratios to MFCG at matched sizes §12.9; the misses are declared for the owner's veto (D-18).

**The rung modifiers** — wider and deeper plots and more private green in a town; narrower frontages, larger joined
rich plots and more public parks in a metropolis — are PLAUSIBLE defaults with provenance "architecture 2026-09-25"
(J-S13). **Confirmation (M2b, B-CITY):** the modest band's median frontage orders TOWN > CITY > METROPOLIS and park
area per 1 000 inhabitants orders TOWN < CITY < METROPOLIS. **Pre-decided fallback:** if an ordering fails, that
modifier's distance from 1 is doubled once and re-measured; if it still fails, the modifier is set to neutral (1.0 / 0)
and the ordering is reported as not produced.

**Requests at the ends of the ladder.** A request below 1 500 inhabitants is routed by `LadderRouter.route(population)
→ { product: 'base' | 'village', rung }` to the village product (PART III); while no village product is registered the
base builds a 1 500-person TOWN and `requestedVsBuilt` reports the clamp — for a request that carries no dossier: a
dossier whose population lies below 1 500 is refused by the dossier port (`E_RUNG_UNAVAILABLE`, naming the village
product), because a dossier's population is a dossier fact that a clamped town would contradict (§7.7 item 15, §14;
owner, J80 Q3; J-A81.71). A dossier's rung follows its population by these bands, at creation and at each epoch's target
(§4.11), while its own tier word titles the map (§9.5). A request above 120 000 is clamped to 120 000
and reported. A request that names both a rung and a population outside that rung's band is an F-EDIT conflict whose
dry run offers the rung the population belongs to.
=== REPLACE ### 1.2 The one-click default, stated once ===
### 1.2 The one-click default, stated once

`generate({seed})` → a TOWN of 5 000 people whose complete city band — every block in its ground tone, every footprint
mass, street, wall, gate and quarter label — is on screen within 150 ms of the click on the reference machine
(124–145 ms across the target's building range, §1.1; §12.1); a CITY's and a METROPOLIS's default requests take
≈ 0.33–0.42 s and ≈ 0.86–1.05 s, and every size follows §12.5's laws of the building count. The first paint is the
finished picture (§8.5). Defaults: the `ink` style with MFCG's raised under-copy on; the day view (`light: 'day'`) with the
cursor sun and cast shadows on in every shipped family (§8.4, §8.2; J-A68.81) — the first map composed unlit, its light
following centre-out within §12.5's settle bound, lit by the sheet's fixed sun (upper left, 45°) until the pointer moves
and wherever no pointer exists (touch, exports, stills), then by the sun standing over the pointer, every shadow turning
away from it (J-A68.88); only the `MFCG` parity preset draws no cast shadow; walls
on at every rung (R6); the sky layer's model setting off and the underground layer hidden — a CITY or METROPOLIS resolves
`Features.sewers` on by tier, its historical network built once the staged network stage exists and drawn only when its toggle is on (D-3, II.6 (1), II.7.1); first-level features at *auto*, drawn per seed from S0's feature-probability table and reported
(§7.8); coast or river by the site model's request defaults; curved quarter labels at city zoom and district names from
district zoom, in IM FELL Great Primer (§9.4, §17.2); scale bar and compass; buildings composed on click and, once stage 3 brings the plan rung, their plans on a second click (`elaborate: 'click'`, a per-viewer view
key, §4.1, §2.9); no questionnaire, no hidden state. Every
improvement ships behind the defaults (R8): the fast path never pays for the simulation module, the light pass before the
first map, relief, thumbnails or the advanced panel.
=== REPLACE ### 1.7 Tech stack (reasons; no dependence on any existing project) ===
### 1.7 Tech stack (reasons; no dependence on any existing project)

| choice | decision | why | rejected |
|---|---|---|---|
| language | **TypeScript** (strict), ES2022 modules, no DOM in model packages | browser-first embeddable library (D-4); one language for kernel, pipeline, renderer and app; the reference evidence is JavaScript-shaped (call censuses), so budgets transfer | Rust → WASM core (two languages, slower iteration while constants are still tuned); a WASM kernel — none: a measured hot loop may get a byte-identical WebAssembly accelerator behind the kernel façade (§3.7); Haxe (the references' tool, no advantage); C++/CGAL desktop (GPL, not browser-first) |
| runtime targets | browser: main-thread UI, **one generation worker** plus a **derivation pool** of up to three workers for the per-district stages (§4.1, §12.3) and a **tile worker** (§8.9), behind a handle-based API (§11.2); Node 24 LTS (CLI, tests, research-side baseline scripts, headless goldens; the CLI's PNG export uses `@napi-rs/canvas` as an optional dependency); an embed bundle (ESM or iframe) | the headless API reproduces the UI's model hash (O11 f); B-CITY runs without a browser | server-side generation (FTG's 3–7 s round trip is the thing to beat) |
| numeric core | integer centimetres in `Int32Array` arenas; exact `orient2d` in doubles under a derived range bound; `robust-predicates` for `incircle`; **booleans, buffers and bands built on the kernel's own arrangement — one engine on every host**, with Clipper2 and `polygon-clipping` as CI oracles (§3.7 states the one case in which Clipper2 ships); `dmath`, our own TypeScript port of the fdlibm 5.3 routines the model needs (§17.4) | integers remove float non-determinism and epsilon geometry (FTG's own lesson); one engine means one hash on every host | doubles with epsilons (the references' whole failure class); exact rationals everywhere (10–100× slower); a runtime boolean fallback (a second engine with different hashes) |
| rendering backends | **Canvas2D — the reference backend of every preset including `lit`**, with a world-aligned tile pyramid (§8.8); **SVG** (layered, ids preserved); **PNG and print** by band-streamed tiles at any DPI; the **light pass** (§8.4, item 68) a post operation over the Canvas2D base raster — its CPU implementation the reference for every export, still and golden, a WebGL2 accelerator (WebGPU where available) lighting the interactive view as the pointer moves and drawing no marks (J-A68.82); WebGL2 otherwise only as the pre-decided tile-compositor fallback (§8.9) | one drawing path keeps screen, PNG and print identical (O12 c) and avoids the duplicate render path both creators warned about; MFCG proves per-group caching keeps 46 000 fills at 590 uploads; NG proves per-primitive canvases do not; lighting as one post operation keeps every mark on that path while a per-pixel light follows the pointer at frame rate | three.js as the primary (textures and lighting are one *style*); WebGPU-only (too new for the embed target); a WebGL2 reference backend for `lit` (a second drawing path); a GPU-only light pass (exports and goldens would differ by device) |
| text | Canvas2D glyphs from the bundled OFL fonts, composed onto the tiles in the tile worker (§8.8–§8.9); widths from the fonts' own metric tables, parsed by our code (§9.2); no SDF text | the same glyph positions on every output and in every engine | the host text engine for metrics (engines shape differently) |
| build and test | pnpm workspaces monorepo, `tsc` project references, `esbuild` for library bundles, Vite for the app, `vitest` + `fast-check` property tests, Playwright visual regression with `pixelmatch` / SSIM, axe-core for accessibility, a `bench/` package that runs B-CITY / B-EDIT / B-FUZZ / B-REF / B-ZOOM in the three CI tiers of §13.8 | conventional, permissive (the dev-only exceptions are §17.4's), fast | — |
| data | rule tables, presets, style sheets and the rung profiles (`ladder.json`, §1.1) as versioned JSON with a schema (`zod`) and `{value, unit, provenance, calibratable}` per cell | everything editable; corpus calibration through §13.9 | — |
| persistence | a self-contained `.plat` document (JSON manifest + binary blocks); no hosted service — for multi-client use the host is the store (§11.3, §11.5) | O9; embedding needs no backend | a sync service of our own |
| repository | the product lives in its own repository, `plat/`, at the root of this folder, outside `research/`, `captures/` and `reference/`, under §17.1 (3)'s path rule | the clean room (D-29): the product can never read reference material by accident | the product inside the research tree |
| dependencies | permissive licences only, checked over the transitive production closure, pinned exactly and credited in a generated notices file (§17.4); every third-party routine behind our own adapter | clean room, swap-ability and an open licence choice for the owner (D-22) | — |
=== REPLACE ### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5 ===
### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5

Every acceptance letter carries its class: **[C] conformance** — it holds by construction once the rule is built, so it
proves the implementation follows the design and is never cited as evidence that an improvement was achieved; **[P]
parity** — compared with a measured reference number in `baselines.json` by §13.5's band rule; **[O] outcome** — it can
show that the result is better than the references, for a user or for realism. Thresholds without a reference source
have their numbers in §13.7. Every letter is stated here in full, stage-2 letters included — or, where another section
owns the letter's number, by a pointer to it: implementers read this matrix, never `docs/IMPROVEMENTS.md`, which is cited
for traceability only (§17.1 (1)).

**The first-weighted improvements (D-7) and the evidence their own rules cannot fake.**
* *Plot texture* (O5, O17, O18): §13.5's figure-ground and streetwall rows against MFCG's exports at the matched rung,
  with the intended direction of each difference declared; the plots, party-wall and MFCG street-signature rows; the
  within-district plot-area CV floor [P / O].
* *Editability* (O9, O16-core, O2 c): the thirteen MFCG asks as measured scenarios; locality outside the scope;
  faithfulness against from-scratch generations; carry-over rates of edited entities [O].
* *Legibility and charm*: the §13.6 protocol's legibility and charm questions; street-edge recoverability [O / P].
* *Realism*: the §13.6 protocol's realism question and the P rows of §13.5 — realism against real towns is the corpus
  phase's measurement (§13.7, §13.9), and this matrix makes no realism claim beyond those two.

| id | tier | mechanism in this design | acceptance (class of each letter) |
|---|---|---|---|
| O2 deterministic recipe | must | §6.1 keyed streams with the concern registry; §6.3 addresses and lineage; seeded decoration; epoch components | (a) identical model digest on two machines and three browsers, 100 % [O — FTG has no seed; VG drifts between builds]; (b) the scope of stability as §6.3 states it — grammar, decoration and block-reroll perturbations change 0 other entities [C]; (c) per parameter class: entities outside the stage-k closure byte-identical 100 %, the seam exception of §4.6 / II.4 excepted — computed by the oracle from the batches' commit records and checked (§7.3) [C]; edited entities kept or carried at §13.7's O2 (c) rates, measured at M3a with its fallback [O]; (d) addresses 100 % stable outside the scope on B-EDIT [C]; (e) stage-isolated goldens: only declared stages move (§13.3) [C] |
| O6 metric units, furniture, statistics | must | §2.1 cm + unit lint; §1.1 ladder; §9.5 furniture; §13.2 core statistics record | (a) 100 % of length fields carry a unit (lint) [C]; (b) ordinary-house footprint median 60–160 m², p95 < 400 m² [P — FTG 103 / 154 m²; MFCG's footprints are lots, descriptive only]; (c) scale bar and grid within 0.5 % [C]; (d) 100 % of generations emit the core statistics record with provenance, the bench metrics on demand (§13.2) [C] |
| O3 robust kernel, typed ladders, report | must | §3, §5 | (a) B-FUZZ on random inputs and constructive degeneracies: 0 crash / hang / invalid output [O — all four references crash or retry on degenerate input]; (b) hard invariant violations 0 / 1 000 cities [O]; "no restart path" is a design property, not an acceptance number (D-9); (c) B-EDIT 0 planarity violations [C]; (d) model time within §12.3's per-rung laws of the building count and its max clause, so the bars 100 ms / 300 ms / 1 s hold up to the sizes §12.3 states and are missed above them, a miss declared for the owner's veto (D-18) [P — MFCG at matched sizes, with §12.9's declared trade]; (e) identical digest across platforms [O]; (f) the seed never swapped; ladder uses ≤ 2 % of transactions, p99 ≤ 3 attempts [C]; (g) p95 per delivered town on the MFCG-worst configuration set ≤ 1.0 s against MFCG's 3.7–4.0 s (§13.5) [O] |
| O11 schema, registry, exports, API | must | §2 schema + registry with the CI path test, §11, §14 | (a) registry round-trip 100 %, no type missing from any path [C]; (b) containment 100 % [C]; (c) export → import → export identical [C]; (d) GeoJSON validates and loads in QGIS with districts [P — FTG omits districts]; (e) 0 dangling references [C]; (f) headless digest = UI digest [C]; (g) VTT grid 0 px [C]; (h) layered SVG separable and opening in Inkscape within 120 s at METROPOLIS [O] |
| O1 terrain and hydrology first | must | §4.2 S1 | (a) requested water features counted by delivery tier: tier-6 omissions 0, degraded ≤ 5 % (§13.7) [O — MFCG fails a requested river in 7 of 10 attempts at size 80]; (b) 0 non-monotonic beds; every river has an outfall; width never decreases downstream; every terrain cell has a defined flow path to an outfall (100 %); contours cross water 0 times [C]; (c) 10 / 10 configurations on 100 seeds each — coast, estuary, confluence, river island, lake shore, delta (distributaries), moat, island city, hill town, cliff or ravine [O]; (d) building ∩ water = 0 [O — MFCG's buildings over its river]; (e) the water stage linear in cell count, ≤ 5 ms at a 128²-cell equivalent and inside §12.4's S1 budget [P — VG 17–87 ms for one 128² village]; (f) site classifier ≥ 90 % [O]; (g) unused eligible land components 0 [C]; R11: river within the core when requested = 100 % [C] |
| O4 two-tier street network | must | §4.3, §4.4, §4.6 | (a) 100 % of through-roads reach destinations, bearings ± 10° [C]; (b) detour ≤ 1.4; junction p5 ≥ 30°; no turn cliff (10 m resampling); 4-way share per preset — organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % [P]; (c) width ~ betweenness [C]; (d) slope p95 within class [C]; (e) 0 edges below `minEdge` and 0 clearance violations [C]; (f) network + infill ≤ 100 ms at CITY with block statistics in the NG bands — the fusion gate, at M0 on a flat site and at M1 on river, coast and relief configurations [P]; the MFCG street signature inside the walls (§13.5) [P]; (g) N external connections exactly, island towns counting their shore landings [C]; (h) between-seed dispersion of the signature vector ≥ the larger of MFCG's and FTG's at the matched rung, from M1 [O] |
| O5 frontage-first plots | must | §4.7 S10 | (a) access edge 100 %, and every hidden plot reachable by a chain of access edges from a public way (§13.2 T30-1) [C]; (b) 0 plots < 3 m, wedges < 0.5 % [C]; (c) side walls ± 5° ≥ 90 % [C]; (d) typed coverage 100 %, discard ≤ 0.05 [C]; (e) plot and block distributions by §13.5's band rule [P]; (f) 0 self-intersecting, duplicate or doorless buildings — exactly one main entrance per building facing its street or court, side, rear and yard doors by §2.6's rules (§13.2 T29-1, T29-2) [O — FTG's hourglasses and ≈ 10 % doorless]; (g) streetwall gap ≤ 1 m [C]; streetwall continuity on dense frontages ≥ MFCG's at the matched rung [P] |
| O18 prosperity field + granularity law | must | §4.5 field; §4.7 S10 joins / splits / alleys; §4.6 deep interiors; §4.7 S10b's class mix (item 71); §4.5's character, band range and dials (item 72) | (a) Spearman(prosperity, plot area) ≥ 0.8 and Spearman(prosperity, plots per ha) ≤ −0.8 [C]; (b) Moran's I of plot area > 0 [C]; (c) detached, yard, attached and coverage shares, and the class mix inside a band row (§13.2 T71-1, T71-2), monotone in prosperity [C]; (d) alley length per ha ~ −prosperity (Spearman ≤ −0.7), 0 alleys below the class minimum, the dead-end share in band [C]; the court share of deep blocks within band per class [P]; the hidden-plot share per district within its §4.6 target ± 0.03 (§13.7, T30-2) [C]; (e) access 100 % [C]; (f) institutions placed 100 %, never gives up [C]; (g) provenance, and the perturbation test ≥ 95 % outside; under a band change the wealth ladder's bars of §13.2 (T31-1 – T31-12) — no occupied building removed, a plot's geometry at or above its floor, granularity within the band's target after a re-cut [C]; (h) soft-seam jumps within §13.7's bands [O]; (i) a smooth field — §13.7's gradient threshold — whose edits replay [C]; (j) within-district plot-area CV ≥ 0.25 (§13.7) [O — FTG's 441 m² in every class]; (k) gap-width modes [C]; (l) mixed blocks put their largest classes on prime frontages above a shuffled baseline by §13.7's margin (§13.2 T71-3) [O]; (m) the neighbourhood bounds its buildings — every prosperity-driven state inside its district's band range, an institution's excess its district's pressure, identities and dials weighed by value, not volume (§13.2 T72-3, T72-6 – T72-8) [C] |
| O17 plot model, site plans, heights | must | §2.5–§2.6, §4.7 S11, §8.4; the informal clusters of §4.7 S11 (item 70); the Works of §4.11 (item 67) | (a) coverage within the table [C]; (b) multi-footprint plots > 0 for institutions, manors, inns and farms [C]; (c) party-wall share by band, attached ≥ 90 % in dense bands [P — NG 39–43 %, 95–99 %]; (d) streetwall continuity ≥ MFCG's Lots mode, walled or fenced frontage counted [P]; (e) yards owned 100 % [C]; (f) footprints fit 100 % [C]; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 [C]; (h) ≤ 5 µs per plot median for site plans (§12.4) [C]; (i) footprint hash identical across LOD [C]; (j) entrances and basements by §2.6's rules — no cellar under the flood band, every basement inside and smaller than its ground floor (§13.2 T29-3, T29-4) [C]; (k) every structure of an informal cluster with its own door on a footpath reaching an access edge, the fire gap held (§13.2 T70-1 – T70-4) [C]; (l) a building in transition drawn at its Works stage, which depends on nothing but its record and the week, never leaving its plot without access (§13.2 T67-1 – T67-4) [C] |
| O7 content-first land use | must | §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2 | (a) every building has a function and an occupancy (100 %); requested population ± 5 % on ≥ 95 % of seeds [O — MFCG's multiplier]; every person a home (100 %) [C]; every person a work or role (100 %) — a module letter, measured at M4b [C]; (b) hard relation rows satisfied 100 % and soft-row satisfaction ≥ 95 % reported per city — noxious trades downstream or extramural, water trades within 100 m of water, the market hall at a tier-1 junction or gate, inns at gates (§13.2 T16-1) [C]; (c) Moran's I (wealth) > 0 and monotone in the requested gradient [C]; (d) 0 constraint violations; per-capita ratio error against the tables reported; no occupation above its per-capita maximum [O — FTG's "20 adventurers" per 100 people]; (e) reconciliation ≤ 3 rounds [C]; (f) seam discontinuity within §13.7's bands [O]; (g) lazy people stable 100 %; opening a person writes nothing [C]; (h) gazetteer 100 % [C]; block-level use mix within §13.7's bands [O] |
| O19 greenery by prosperity | must | §4.9 rule table | §4.9's acceptance (a)–(g); classes: (a) [C — NG's 23–58 % at identical tags is the weakness]; (b) [C]; (c) [O — MFCG and NG green is leftover space]; (d) at §13.7's canopy threshold [O — FTG minimum 0.14 m]; (e) [P — VG P1; the frame budget is §12.7's]; (f) [C]; (g) at §13.7's city-zoom check [O] |
| O8 fortification network | must | §4.2 S3, §4.4, §4.8, §4.11 | (a) gates at 100 % of arterial crossings, count exact [C]; (b) 0 buildings in the setback band on both faces [C]; (c) tower spacing in band, 0 sawtooth [P — FTG 39 m]; (d) defensible-ground share; castle ≥ p80 among candidates [C]; castle area and compactness in MFCG's band [P]; (e) walled share in MFCG's band (§13.5) [P]; outer curtain on request [C]; (f) 4 / 4 circuit configurations, including two independent enceintes (polycentric nuclei, §4.2 S3) [O]; (g) wall → road keeps plot ids [C]; (h) the wall an entity in every export [C] |
| O12 display list, LOD, style as data, layers | must | §8 | (a) continuous zoom, footprint hash identical per LOD, minimum drawn feature ≥ 2 px, labels above §9.4's floors at every level, no feature pops more than once [O — MFCG has no zoom]; (b) pan and zoom ≥ 60 fps at 40 000 buildings and 200 000 trees on the reference machine and ≥ 30 fps on the low-end device; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; ≤ 80 draw calls per tile (≤ 80 × P per view) and ≤ 4 uploads per frame during gestures, every ready tile at first paint and settle (§12.5) [P — NG 528 uploads per hood; FTG's roofs recomputed every render]; (c) screen = PNG = SVG within threshold, 0 silent couplings [C]; (d) glyph ambiguity 0, legend 100 % of the places the viewer's knowledge key admits (§9.2), every visible feature hit-testable [C]; (e) 300 dpi A2 [O]; (f) §8.2's contrast matrix on the rendered city band [C]; (g) first map by §12.5's laws of the building count, the miss above its knee declared for the owner's veto [P]; street-edge recoverability ≥ MFCG − 0.03 (§8.5) [P] |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | (a) save / load / save identical [C]; (b) locked preserved 100 %; outside the effective scope byte-identical (§7.3 item 7 ii) [C]; (c) faithfulness = §7.3 item 7 (iv): Regenerate (keep settings) byte-identical [C]; New random judged by §13.2's calibrated rank campaign, whose design and executed calibration are stated there [O — FTG's "too snug" regeneration]; (d) every operation undoable (enumeration test) [C]; (e) an upgrade keeps 100 % of edited entities or reports each orphan [O — FTG cannot regenerate old towns]; (f) the thirteen MFCG edit asks of §7.4 as scripted B-EDIT scenarios, each reporting its locality share, invariants and re-run cost (§13.2) [O — MFCG: "no way to save those changes"] |
| O16-core report and honest controls | must | §5.4, §7.1, §7.8 | (a) report 100 %; the requested-vs-built diff and every requested feature's delivery tier shown when non-empty [O — MFCG's 28 silent street failures]; (b) auto-resolved values reported 100 % [C]; (d) hidden couplings 0 [C]; (f) every numeric control monotone and continuous by §7.8's statistical rule [C]; (h) seed → map identity 100 % [C] |
| O13-core labels and names | must | §9, §10.4 | (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %, curvature within §13.7's limit, 0 labels crossing holes [O — MFCG covers gates and the keep]; quarter labels at MFCG's count at matched sizes [P]; (c) name–feature consistency 100 % within 250 m [C]; (e) edited names persist 100 % [C] |
| O14-core hinterland and margin | must | §4.9 | (a) farmland per capita ± 20 % [C]; (b) field access 100 %; every farmstead within 300 m of one of its fields and 1 500 m of all; land-use overlaps 0; unused components 0 [C]; (d) roads leave to destinations 100 %, rivers enter and exit [C]; (e) built / map area 0.06–0.25 at every rung (§13.7) [O — FTG's fixed canvas per class]; (h) woods sized to the fuel and timber rows with the import share reported, the farmland mode by size and landscape (§13.2 T26-1, T26-2) [C] |
| O10 intent, constraints, assignment, forms | should (input schema + drift bounds: must hook) | §7.7; §14's dossier port (items 73–88); §4.5's district-defining and dispersed classes (item 72) | (a) 10 / 10 scripted intent tasks without URL editing [O]; (b) hard targets 100 %, achieved-vs-requested reported [C]; (c) monotonicity [C]; (d) pins 100 % [C]; (e) assignments ≥ 99 % within drift, placed by the one solver under the hard relation rows, infeasibility reported with the nearest count and the closest options (§13.2 T16-1, T16-3) [C]; (f) size error p90 ≤ 10 % [C]; (g) the forms classifier ≥ 90 % over the forms catalogue, `linear-street`, `island-city` and `twin-town` included [C]; (h) edited tables versioned, default path byte-identical [C]; (i) the dossier contract — a map delete of a dossier-backed element re-placed from the same seed, a dossier change mutating the map that exists, one history one digest (§13.2 T20-1 – T20-6, T22-1 – T22-4) [O — no reference has a host contract]; derivation before invention — no derived fact contradicting a dossier fact, a dossier-owned value refused, the derivation table total (T20-7 – T20-12) [C]; (j) the dossier port on real dossiers — B-DOSSIER-lite's creation bars from M1 and its absorb bars from M3a (§13.2 T73-1 – T73-10, T75-1 – T75-5), the seam's inert exports and one-way seed (T85-1 – T85-3) [O — no reference reads a host's settlement record]; (k) a district-defining dossier institution shapes one district at its row's share, never every lot, and dispersed classes spread across districts (T72-4, T72-5) [C] |
| O13 full (street names, addresses, annotation) | should | §9 | (b) ≥ 90 % of named streets labelled at neighbourhood LOD [O — no reference names its streets]; (d) 0 spelling errors [C]; (f) annotation layer [C]; (g) addresses 100 % [C] |
| O14 full (rings, presets, wildness, feasibility) | should | §4.9 | (c) wood-edge straightness median ≤ 0.90, canopy monotone in wildness (§13.7) [O — VG's "Some" ≈ "Many"]; (f) ≥ 95 % of the map land-classed [C]; (g) scatter statistics [P] |
| O16 full (thumbnails, drafts, discoverability, responsive, accessible) | should | §7.8 (S0–S4 proxy thumbnails, G-R4), `@plat/app` (§14); §7.1's authoring toolkit with §14's interaction contract (item 101) | (c) the scripted tasks of §13.4, each in one action where a reference needs a detour, every response ≤ 1 s (replaces "≥ 90 % of testers") [O]; (e) six thumbnails < 1 s at TOWN [P]; (g) editor usable at 768 px [C]; the accessibility contract (§14, §13.4) [C]; (i) the authoring toolkit — at most twelve tools, one event from every surface, a skeleton that reproduces its city, a clerk's transcript that replays (§13.2 T101-1 – T101-9) [C] — and the first-five-minutes test at M2a and M3a (§13.4) [O] |
| O12 extras (relief tier, tiled export, low-end tier) | should | §8.2 relief tier; §8.8 tiled export; the low tier (§12) | as O12 (b), (e); the relief tier renders at every rung and is off by default [C] |
| owner rule: light (item 68) | must (owner rule) | §8.4's lighting model; §4.7's light placement; §2.7 `LightSource` | (a) height-aware shadows — a spot lit from every side has none, no shadow climbs a taller roof, a lower roof shortens a shadow that continues beyond it (§13.2 T68-1 – T68-3) [C]; (b) after sunset every way class × band reaches its light rows' target minimum illuminance, and concealed and clandestine plots stay unlit unless a row places a light there (T68-5, T68-6) [C]; (c) the CPU reference byte-identical on the five engines and the GPU pass within §13.4's tolerance (T68-4, T68-7) [C]; (d) the fallback ladder draws a legible map on every device, never an error (T68-8, §13.4) [C]; (e) O12 (b)'s pan-and-zoom frame budget holds with the cursor sun on (§12.5) [P] |
| O7 simulation module | should | §10.1, §10.3 `@plat/sim` (M4b) | the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported; every person a work or role (100 %); the economy and personality content of D-32 derived deterministically from its keys [C] |
| O11 extras (VTT native, per-layer, binary, 3-D, GIS profile) | should | §11 | (g), (h); format validators, CityJSON's included [C] |
| O9 extras (upgrade replay with diff) | should | §7.5, §6.4 retention | the upgrade test; goldens replay under N−1 and N−2 [C] |
| O2 / O6 extras (golden suite, calibration interface) | should | §13.3, §7.6, §13.9 | the declared-shift protocol in CI from M1; every table value replaceable with provenance; the corpus interface of §13.9 present [C] |
| hooks 1–8 (§5.4) | must | 1 addresses + sub-seeds §6.3 / §6.1; 2 lifecycle + edit log + incremental pipeline + conversions — the decline ladders, the use step, the wealth ladder with its floor, the terrain-water and passage kinds, the Works records with their derivation rule and the weekly clock (item 67) and the closure edits (item 66) §2.8 / §7 / §4.11; 3 assignment input + the one placement solver and the designation mutator + the dossier contract with its two tiers of fact and its derivation table (item 20 (h)) and the port (items 73–88) §7.7 / §4.7 S10b, S11 / §14; 4 context vector + rules as data §2.5 / §7.6; 5 building-generator interface (`outline` / `compose` / `plan`) + heights + the entrance set and basement + shadow hook §2.6 / §8.4; 6 layers + drainage + any-boundary neighbourhood + island outlines + the island rule, the sewer tier rows and the underground arena's hooks — the underground systems, the undercity's existence row and the connection graph (item 65), the basement access rows (item 64) and the concealed modes (item 63) included — §2.1 / §2.3 / PART II / II.6 / II.7 / §4.2; 7 editable versioned tables + preference layer + the emulation marker and parity presets §7.6; 8 circumstances timeline — its trade, economy and power slices typed (items 77–79) — + stored editable field + the built band and geometry floor + the staged records the port will fill (item 88) §7.7 / §4.5 / §4.11 / §2.7 | every hook field declared in the schema of every entity type and populated when used (registry test, 100 %) [C]; zero cost when unused — with every hook unused, the one-click model time and document size equal a build with the hook fields removed within 2 % (a CI comparison) [C] |
| S1 boundary and seam contract | STAGE-2 (must in base) | §2.5 `SeamContract` from M1, §4.12, PART II | 100 % of districts carry a complete contract; portals 100 %; misalignment 0; Hausdorff 0 for shared entities [C]; at M1 the check is schema completeness only (the field is flat until M2b, so its samples are constants) [C] |
| S3 seam-continuous fields | STAGE-2 (must in base) | §4.5 fields with `hard` flags per seam edge | Δ frontage, area and storeys within §13.7's bands on soft seams [O — NG's hoods cannot share a street] |
| S2 context features inside the neighbourhood | STAGE-2 | II.1 (the request's context), II.3 (context features as constraints), §4.8 water furniture, §4.4 intervallum | (a) a context coverage matrix — district context (waterfront, wall-side, slope, bridgehead, gate approach, sky) × generated feature — with no empty cell: every waterfront district has a quay or bank path, every wall-side district an intervallum or a rear-plot rule [C]; (b) 0 buildings in water; bridges within ± 10° of the channel normal [C]; (c) 0 fragments cut at the close-up frame — the surroundings continue at lower LOD to the frame [C]; (d) S2's blind preference test, run as §13.6's protocol against NG at M5 with the owner as the declared rater [O] |
| S4 composable context templates, functional squares, landmark-centred neighbourhoods | STAGE-2 | II.2 template fabrics, II.3 dispatch table, §4.7 claims, §2.6 footprint templates | (a) every base district kind has ≥ 1 template [C]; (b) the templates' morphologies are separable by generated statistics — a nearest-centroid classifier over §7.7's signature vector, computed per district, assigns ≥ 90 % of template districts to their template [C]; (c) ≥ 90 % of squares on a tier-1 junction or in front of a landmark [C]; (d) typed-square area per 1 000 inhabitants within §13.7's band [C]; (e) a requested landmark delivered ≥ 99 % [C]; (f) rule satisfaction ≥ 95 % [C] |
| S5 NG-class close-up render tier | STAGE-2 | II.4, §8.2 `hatched`, §8.6, §8.4 shadow pass | (a) opening one district at neighbourhood LOD ≤ NG's 10–96 ms at comparable building counts [P]; (b) generation ≤ NG's 64–75 µs and rendering ≤ ≈ 85 µs per building [P]; (c) draw operations per frame and uploads within §12.5's budgets, against NG's 528 uploads per hood and 55–80 % hatch share of operations [P]; (d) the `hatched` style regression — per-wing operation mix and the roof colour law (§8.3) [P]; (e) shadow length ∝ stored height, r ≥ 0.99 [C]; (f) footprint hash identical to the city LOD [C]; (g) city-zoom legibility unchanged with the tier on (B-ZOOM) [C] |
| S6 stage-2 workflow | STAGE-2 | II.4 workflow, §7.1 named actions, §6.1 per-district streams | (a) five variants of one template in five actions, where NG needs a tags dialog or a URL detour [O]; (b) the default path one action with p95 ≤ 0.5 s for a medium neighbourhood [P — NG]; (c) rerolling one district or block leaves 100 % of entities outside it identical in address and geometry, the seam exception of II.4 excepted [C]; (d) addresses, names and footprints preserved across levels, 100 % [C]; (e) 0 hand-offs to another tool [C] |
=== REPLACE # Staged by the owner's roadmap (this document defers nothing) ===
# Staged by the owner's roadmap (this document defers nothing)

The owner ruled on 2026-09-25: "I would prefer if there is no defer and everything is fixed as soon as possible." This
document defers nothing: every former deferral — the numeric targets, the boolean library, the skeleton, the dd2vtt
profile, CityJSON, SDF text, setting packs, host inputs, a sync service, a WASM kernel, the owner's licence and the
worker pools — is a decision in the body, with its confirming measurement and pre-decided fallback where only an
experiment can confirm it (the entry-by-entry record is `docs/ARCHITECTURE-VALIDATION.md`). This is the one list of
subjects the owner's roadmap places after the base, with the two parts the owner's authoring item stages (item 101):
stage 2 is built in this program at M5 (§16); the others are staged by the owner. For each, the base carries concrete hooks now, in the sections named; they are staged by the owner, not
deferred (documented, not bugs to re-find).

| subject (the owner's roadmap stage) | the hooks the base carries now | where |
|---|---|---|
| stage 2 — neighbourhood composition (built in this program at M5, after the base) | `SeamContract` on every district from M1; one shared `Seam` record per boundary run with its `baseLane` portals and the seam exception to locality; every seam edge typed, a way-less reservation boundary two districts share as `reserve`; II.1 (3)'s neighbour step, one `corridor_split` edge in a finished neighbour's strip, reversed exactly by demotion whatever edit removes the street (§2.2 rule 3); the `FabricStrategy` slot; the neighbourhood band; the `hatched` programs | PART II, §3.7, §4.6, §4.12, §7.3 |
| stage 3 — manor-style building compositions (after stage 2) | `BuildingGenerator.outline` / `compose` with a cost contract (the base outline inside S11's geometry share; a stage-3 `outline()` admitted at ≤ 10 µs with a declared re-budget); wings (`BaseWing.kind` `rect` / `quad` / `polygon`, a `quad` wing's recorded `corners`, `BuildingInput.fixedWings`), `carryWings`, which keeps every stored wing, and a stored composition's rings and tower centres, on its footprint through every move — the union test a stage-3 `compose()` must pass, run at the stage-3 intake on stored compositions — and heights in the base; the stage-3 intake measurement; item 28's hooks for the plan rung: `'plan'` in `Composition.lod` and `BuildingGenerator.plan`, the plan records with the room's household unit, the interior ladder's rows read at the occupants' band (item 28 (f)), `ElaborationRecord` per rung with the `elaborate` view key and the cache, the `plan.*` concerns keyed by the rung's reroll, the seven plan events, `setRoomUnit` and the rung re-roll of `regenerate`, the transient arena, F-PLAN, §8.5's change markers and storey view, §11.1's plan block and storey scenes, §12.7's row, §12.8's cache line and §13.2's B-PLAN bars that run from stage 3's intake (T28-1 – T28-8, T28-10, T28-12's `plan` clause, T28-13 – T28-15, T28-17's F-PLAN clause, T28-18's `setRoomUnit` clause, T28-19); the entrance set and basement the plan consumes (item 29); the passage room (item 30); the five layout families of the Fantasy Manor generator (build 890 of its 1.0.0 release) as rows of path shapes — regular rings, star-shaped closed plans, arcs of equal chords, rectangles and grid snakes, each keeping our additions — wings that collide with towers and blocks, the main door facing the street, metric scale (item 59); a clandestine front's concealed programme flag, its concealed rooms and door (item 63); a building in transition drawn at the plan rung as walls without doors or furniture (item 67); the plan rung's room lights (J-A28.32) lit by the light pass (item 68) | §2.6 beside §2.8's record and §2.9's cache; the kernel's §3.3, §3.4, §3.7, §3.8 and §3.10; the policy §4.1; the streams §6.1; the events of §7.1; the draw of §8.5 and §8.6, the export of §11.1, the budgets of §12.7 and §12.8; the bars of §13.2 |
| the village product (after the town / city) | stages ordered by declared I/O; `EnceinteStrategy` and the enceinte input of every network strategy; tracker-network and houses-along-ways registrations; a village as one district; the ladder rows and the 1 500 boundary; the not-precluded checks of §15.1's VILLAGE-LATER rows; the village rung rows carrying `layers.islands = none`, `layers.sewers = never`, `layers.undercity = never` and a 0 hidden share (items 13, 14, 30, 65), item 66's dug passage the one village underground; a dossier below 1 500 people refused by the port, naming the village product, until that product registers its own port path (item 81) | PART III, §1.1, §1.6, §4.12, §7.7, §14, §15.1, D-33 |
| the underground layer — the sewers, their neighbourhoods, catacombs, caverns, quarries and the undercity — and floating islands (toggles, after the city is mastered) | one arena per layer and per sky island; `LayerSpec`; drainage queryable per cell over frame and margin; `SkyIsland` and `Tunnel` records (the tunnel's invert as a knot profile); the sky pseudo-districts' allocations created by S7b before any island exists; `SkyStrategy`, `IslandRule` and `SewerStrategy` registrations; the sky close-up call; shadows onto the ground layer; the island rule — the rung gate `RungProfile.layers.islands`, the model setting, the count law and the two-supply size law — with `SkyIsland.supply`, `areaHa` and `state` (items 10, 13, 15); the tunnel lifecycle (item 11); the underground tools `drawTunnel` and `placeAccess` (J-A12.71); the sewer tier rows — `RungProfile.layers.sewers`, `Features.sewers` with S0's draw (item 14) — the underground `LayerSpec` hidden by default with §8.4's depth-band view key and §8.2's `states` rows, the class table's `drain`, `underground` and `undergroundAccess` columns, `Tunnel.navigable` and `headroomCm`, the tunnel's condition read from `existence` and `closure` (J-A11.21), the tunnel profile table, `AccessPoint`, `ContextVector.arena`, `UndergroundRule`'s depth scale, vacancy share, crowding share and arrangement restriction, the `UndergroundStrategy` slot, the U1–U3 invariants, F-UNDER and §13.2's fixture (item 12); the underground family's records `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink`, schema-complete and empty, the system rows and `LinkRule`, the undercity's existence row `RungProfile.layers.undercity` and `UndercityRule`, the `raiseGrade` kind for a buried old town, and the `UndergroundSystemStrategy`, `UndercityStrategy` and `UndergroundLinkStrategy` slots (item 65); the basement access row — a probability by class × band with the concealment multiplier — and `AccessPoint`'s state and `knownTo` (item 64); the concealed institutions' `underground` mode (item 63); the closure rule and `addUndergroundAccess` (§7.3 item 9; item 66); the underground light rows, the light shafts at the lifelines and the hand lantern, and the islands' magical lights and floating-caster shadows (item 68); §13.2's T63–T66 | II.6 and II.7; the ladder §1.1; the records of §2.1 (the arena), §2.3 (drainage) and §2.7 (tunnels and access); the kernel's arena isolation (§3.4, §3.10) and tunnel kerb (§3.7); the stages §4.2 then §4.5; the ladders of §5.2 and the invariants of §5.3; the edits of §7.1, §7.3 and §7.4; the layer and the lighting model §8.4 and the `states` rows of §8.2; the registry §14 |
| the evolution engine (much later) | epoch events and key components; `EpochInputs`, `EvolutionStrategy`; the `ConversionOp` kinds, decline included; the one built growth path, whose epochs use the crossing sites generation left unused; the decline table with its exposure lottery, the persistence order, the salvage ledger and the dwell lag, and the regrowth-first siting, which binds the built path now (item 8); the tunnel and island decline kinds (items 10, 11); the use step with `UseConversionOp` and pinned assignments (item 17); the epoch-spread mutation (item 18 (c)); the terrain-water kinds (item 25); the wealth ladder — the due mark, the ladder table's durations, churn caps and orderings, the replaceability column, `builtBand` and the floor applied at epochs (item 31); the densification, clearance, sealing and reopening of hidden plots (item 30); the lapse of a rejection, *Dossier content across epochs* (J-A20.43) and the folding of a dossier event at an epoch (items 20, 22 (e)); `relet` and the interior re-cut (item 28 (f)); the `Works` record with its derivation rule, `WorksTable` and the stage and drawing rows on the weekly clock (item 67) with the week, the dating rungs and the cadence (item 76); the accretion, fire, clearance and formalisation of informal clusters (item 70); each district's character recomputed at every epoch, its renames past the hysteresis and its pressure (item 72); the buried old town from the evolution log (item 65); a light following its host (item 68) | §4.11 and §1.5, D-25; §4.5; the layers II.6 and II.7; the plot record §2.5; the dossier §7.7; the tables §10.2 |
| calibration against the historical corpus (after the standalone generators) | `CorpusAdapter`; corpus rows in `baselines.json`; `CalibrationRun` as table-version bumps with declared shifts; provenance on every table cell; the tables amendments b and c add, listed at §13.9 (5) and (7); the palette bands the owner released now, the one early exception (§8.2, §13.9 (6); item 69) | §13.9, §7.6 |
| SettlementForge inputs (after the generators are mastered) | the dossier port (§14; item 73) — its creation half built at M1 and exercised by the frozen dossier fixtures, its absorb half at M3a, over the one adapter for `fp/integration-2026-09-23` at commit `5d699cc68` (J86) —, the host-input contract and the host bridge; the dossier contract (items 20, 22): dossier-backed existence, the rejection record and its lapse, positive placement, re-application and the disruption report, the two tiers of fact, the derivation table and the coherence bars, the optional-only rule (item 20 (h)) and the binding with its key law (item 74) — a data-only, one-way door, the module a separate program at arm's length (§11.3, J-A21.81; the licence §17.3, D-22), door 1 closed to the host's simulator (J86); `knownTo`, concealment and the front as dossier facts (items 30, 63); the undercity's `require` and `forbid` and the `disorder` circumstance (item 65); the typed slices — trade partners, sector shares, power standings — and the district-defining institutions (items 72, 77–79). The staged part: the port's wiring to a live host bridge; the realm block's supply (item 77); the audience table and the display names in use (item 85); `PowerRelation` and the legitimacy scalar (item 79); the staged records `ConditionOverlay`, `DepositSite`, `HistoryHint` and the dossier-backed `Person` with their rows (item 88); the village product's port path | §14, §7.7, §11.4, §11.3, §2.7, §10.2 |
| the authoring toolkit's staged parts (the owner's item 101; J78 (c)) | the tool API every clerk drives (§11.2), the twelve tools with the events they emit (§7.1), with the skeleton file (§11.1), are the base's; the built-in clerk comes after the API — the same API, opt-in and labelled as AI (§14); plots on a bridge deck need no hook beyond the `Bridge` and way records, the stage adding a frontage rule on a deck (J-A101.04) | §14, §11.2 (the tool API), §7.1 (the events), §2.7 (the records) |
=== J-ROWS ===
| J-A56.01 | MFCG's naming row corrected — a feature-conditioned deck grammar, the Markov models MFCG 12710731 builds going unused — and our own engine kept, its syllable and Markov generators serving user corpora | §15.1 (with §10.4) |
| J-A20.06 | (h) the coherence bars T20-7 – T20-12 stated in §13.2's owner-rule group and run from M1 on the frozen dossier fixtures and, standalone, on a blueprint's own roster as the stand-in dossier | §13.2 |
| J-A63.01 | the owner-rule items' hook tests and bars (T20-7 – T20-12, T63 – T72, T76-1) stated once, as one §13.2 group; a staged engine's bars run on hook fixtures, its conversions applied by hand, until the engine lands | §13.2 |
| J-A65.01 | the undercity's existence a third column of `RungProfile.layers` — `never` on the village rungs, `law` with at most one neighbourhood at TOWN (only above 6 000 people, by a 0.2 draw), two at CITY, three at METROPOLIS — per-rung data kept in the ladder (D-33) | §1.1 |
| J-A68.01 | changing the light pass is a paint-program change — a style-version bump, its PNGs re-signed through visual regression — never a model shift; the milestone that first places `LightSource` records writes a declared S11 shift | §13.3 |
| J-A68.02 | the GPU light pass held to the CPU reference at ≤ 2 per 8-bit channel at the 99.9th percentile and ≤ 0.5 on average, a tier that misses re-run at full precision and then drawn on the vector rung, the miss a known defect | §13.4 |
| J-A69.01 | the palette acceptance bar in §13.4's B-ZOOM, not a §13.5 row, measured by our own code on §8.2's measurement render; the targets owner-set numbers that no fallback moves, re-signed only at reconciliation | §13.4, §13.7 |
| J-A71.01 | the prime-frontage margin a §13.7 threshold — ≥ 0.15 above a 20-permutation shuffled baseline, confirmed at M2b; the prestige weight doubled once as its fallback, then the measured p10, not achieved | §13.7 |
| J-A72.01 | `ContentProvider.roster` takes the economy slice's shares as the town-level character, never item 72's district `CharacterVector` (J-A72.41, J-A72.43) | §14 |
| J-A73.01 | owner Q1 (J86): the port's first adapter serves `fp/integration-2026-09-23` pinned at commit `5d699cc68`; a later line is one more adapter folder and a re-cut of the fixtures by the same scripts | §14 |
| J-A73.02 | the port's types split by subject — §14 declares `DossierPort` and the port-side types, §7.7 the contract's records the port fills, §11.4 what the doors receive; each adapter's key list, the lint's input, excludes the digest's own field names | §14 |
| J-A73.03 | the port's creation half built at M1 and exercised test-side only by B-DOSSIER-lite, its absorb half at M3a, its wiring to a live host staged (the plan's J-P1) | §14, *Staged* |
| J-A83.01 | the derivation table's totality (T20-10) and the port's vocabulary totality (T73-10) run as one test over the registry and the fixtures | §13.2 |
| J-A83.02 | B-DOSSIER-lite's creation bars in the PR tier (≈ 45 generations) inside §13.8's existing budget, its fallback applying; the absorb bars nightly from M3a | §13.8 |
| J-A84.01 | the dossier fixtures at `plat/tests/fixtures/dossier/`, inside the product (the plan's J-P4), never under `research/` or `captures/` | §13.2, §14 |
| J-A84.02 | the fixtures cut only from runs of the named SettlementForge line and re-cut by the same scripts for another; each file's host seed and config fields marked never to be published | §13.2 |
| J-A85.01 | the one-way seed — `H32("plat:sf-seed" ‖ the dossier's seed)` — as the port's first act; the host's seed in no document, digest, link or export | §14 |
| J-A85.02 | display names applied inside the one export request they came with and never stored | §14 |
| J-A85.03 | the seam's security rules each at its subject — the seed, the display names and the audience table with the port (§14), the inert-export bar at §11.1, reply correlation, the source check and the before-ready queue at §11.3 — the audience table host glue, never a model rule | §14 |
| J-A101.01 | the UX rules (R1–R19, (f′) superseding (f)'s wording) and the twelve tools' interactions stated as §14's reference-UI interaction contract, the evidence by pointer to the survey; every gesture with a keyboard form | §14 |
| J-A101.02 | a clerk is any program that drives the map through the tool API alone: its four roles are existing calls, its limits the module's (dry run and undo, the `dossier-owned` refusal, the knowledge filter, declarations only); the built-in clerk staged, opt-in and labelled as AI | §14 |
| J-A101.03 | the first-five-minutes test at the M2a and M3a exits — five to eight casual game masters new to the product, four tasks, passing when all or all but one complete them — with the survey's three open questions measured in the same sessions, each with a pre-decided fallback | §13.4 |
| J-A101.04 | plots on a bridge deck staged with no hook beyond the `Bridge` and way records | *Staged* |
=== RATIONALE-A ===
| J-A56.01 | Chose to correct §15.1's MFCG naming row to "a feature-conditioned deck grammar; the Markov models MFCG 12710731 builds go unused" and to keep our own naming engine, over adding Markov naming because the old row named it, because the code reading shows MFCG's names come from its grammar alone while our syllable and Markov generators serve a user's own corpora (§10.4), so the row now states what MFCG does and the design keeps what serves the owner (item 56; §15.1). |
| J-A20.06 | (h) Chose to state the coherence bars of item 20 (h) as T20-7 – T20-12 in §13.2's owner-rule group and to run them from M1 both on the frozen dossier fixtures and, standalone, on a blueprint's own roster as the stand-in dossier, over running them only once a host is wired, because the owner's rule that the dossier is the sole immutable truth binds every map the base makes, and a bar that runs from M1 on real dossiers and on blueprints is the proof that connecting SettlementForge later changes inputs, not rules (§13.2). |
| J-A63.01 | Chose to state the owner-rule items' hook tests and bars (T20-7 – T20-12, T63 – T72, T76-1) once, as one §13.2 group with the amendments-b group's rules — a bar hard unless it names a band, a staged engine's bars run on hook fixtures with its conversions applied by hand until the engine lands — over scattering them across the sections that state the mechanisms, because §13 is the one home of every test (R9) and the same rule already governs items 8–31 (§13.2). |
| J-A65.01 | Chose to carry the undercity's existence as a third column of `RungProfile.layers` — `never` on the village rungs, `law` with at most one neighbourhood at TOWN and there only above 6 000 people and by a 0.2 draw, at most two at CITY and three at METROPOLIS — over a separate table or a constant in II.7.5, because D-33 keeps every per-rung fact in the ladder, the owner's bound ("at most 1-3 neighborhoods") is a per-rung fact, and the islands and sewers columns set the precedent (J-A13.01) (§1.1). |
| J-A68.01 | Chose to treat a change to the light pass as a paint-program change — a style-version bump with its PNGs re-signed through visual regression — and the first placement of `LightSource` records as a declared shift of S11, over a new view-shift stage for lighting or letting lit PNGs drift under a threshold, because lighting is in no model digest (§6.2) while the lights are model records, so each half follows the rule its kind already has (§13.3, §6.4). |
| J-A68.02 | Chose to hold the GPU light pass to the CPU reference at ≤ 2 per 8-bit channel at the 99.9th percentile and ≤ 0.5 on average, a missing tier re-run at full float precision and then drawn on the vector rung with the miss recorded as a known defect, over byte identity for the GPU or no stated tolerance, because GPUs round differently while the CPU reference already guarantees byte identity for every export, still and golden (§6.5 (9)), and a tolerance without a number and a fallback would be an assertion (D-30) (§13.4). |
| J-A69.01 | Chose to place the palette acceptance bar in §13.4's B-ZOOM on §8.2's fixed measurement render, measured by our own code, and to class the targets as owner-set numbers that no fallback moves, over a §13.5 parity row or a threshold of §13.7's kinds, because §13.5 reads only the references' `baselines.json`, the bands are neither a reference's measurement nor ours but the owner's released corpus figures, and only the reconciliation stage may re-sign them (§13.4, §13.7, §13.9). |
| J-A71.01 | Chose to make the prime-frontage margin a §13.7 threshold — the largest class's share of prime frontages at least 0.15 above a 20-permutation shuffled baseline within each block, confirmed at M2b, the frontage-prestige weight doubled once as the fallback and then the measured p10 marked not achieved — over asserting "larger classes take the prime frontages" without a number, because no reference places a class mix to measure against and D-30 admits no threshold without a number and a fallback (§13.7). |
| J-A72.01 | Chose to give `ContentProvider.roster` the economy slice's shares as its town-level character input, over keeping its old `character: CharacterVector` parameter, because the pipeline seat gave "character" one meaning — the district's derived five-component profile (J-A72.41) — and reads the roster's town-level character from the sector shares (J-A72.43), so a host roster must receive the same input the built-in roster reads (§14). |
| J-A73.01 | Chose, as the owner ruled under delegation (J86 Q1), to bind the port's first adapter to SettlementForge's `fp/integration-2026-09-23` line pinned at commit `5d699cc68`, a later line adding one adapter folder and re-cutting the fixtures by the same scripts, over the deployed master or the on-disk working tree, because every survey, the mapping, its verification and the fixtures describe that line, the other two give a different settlement for the same seed, and a per-line adapter makes a change of line a registration (§14). |
| J-A73.02 | Chose to split the port's types by subject — §14 declares `DossierPort`, `PortResult`, `PortNote`, `HostContext`, `RealmBlock`, `DossierDigest`, `DossierInstitution` and `PortReport`, §7.7 the contract's records the port fills (`DossierBinding`, `CarriedFacts`, `DossierChange`, the row types), §11.4 only what the doors receive — and to define each adapter's key list, the input of §6.5 (3)'s scan, as the host keys it reads less the digest's own field names, over declaring every type beside the port or the lint flagging the neutral digest where a field name coincides with a host key, because an interface belongs where its package is declared (R12, the `ContentProvider` precedent) while a contract's records belong with its rules, and the digest is the module's vocabulary by declaration (§14). |
| J-A73.03 | Chose to build the port's creation half at M1 and exercise it test-side only on the frozen fixtures, its absorb half at M3a with §7.7's contract, and its wiring to a live host at the owner's SettlementForge stage, over the whole port at that stage as item 20 (h)'s scope sentence reads literally, because a dossier fixture that generates a town at M1 is the one executable proof that the later connection is a registration, it costs about a person-week, and the roadmap's staged line — the live wiring — is kept (the plan's J-P1; §14, *Staged by the owner's roadmap*). |
| J-A83.01 | Chose to run the derivation table's totality (T20-10: every map-fact family of the registry covered by a row, every row's chance a registered concern or none) and the port's vocabulary totality (T73-10: every enumeration value of the fixtures a row or the declared fallback) as one test, over two tests that could disagree about what "total" means, because both prove the same promise — no gap in the dossier becomes a request or a crash — from its two sides (§13.2). |
| J-A83.02 | Chose to run B-DOSSIER-lite's creation bars in the PR tier (nine births × 5 seeds, about 45 generations beside B-CITY-lite's 600) inside §13.8's existing budget with its pre-decided fallback, and the absorb bars nightly from M3a, over a new tier or a raised cap, because §13.8's rule is that a budget changes only by a recorded decision and the added work is measured at M0 with the tiers (§13.8). |
| J-A84.01 | Chose to keep the frozen dossier fixtures at `plat/tests/fixtures/dossier/` inside the product repository, over a Maps-root `tests/` folder as the brief's wording suggested or a place under `research/` or `captures/`, because §17.1 (3) lets no fixture path resolve outside `plat/` and the document checks read JSON under `research/` and `captures/` as corpus (the plan's J-P4; §13.2, §14). |
| J-A84.02 | Chose to cut the fixtures only from runs of the named SettlementForge line — never from an on-disk working tree — re-cut by the same scripts when the owner names another line, and to mark each file's host seed and config fields never to be published, over storing whatever dossiers exist or stripping the seeds, because the working tree is an older product whose same seed gives a different settlement, while the synthetic seeds are needed to re-cut the files and SettlementForge keeps its seed and config secret on every shared surface (§13.2). |
| J-A85.01 | Chose to derive a dossier-bound document's seed one way — `H32("plat:sf-seed" ‖ the dossier's seed)` — as the port's first act, so the host's seed enters no document, digest, link or export, over carrying SettlementForge's seed as ours, because SettlementForge keeps its own seed secret on every shared or gallery surface and the host may store our document beside the dossier, so our file format must not undo its seed posture, while the derived seed replays exactly like any seed (item 85 (a); §14, §6.2). |
| J-A85.02 | Chose to apply `HostContext.displayNames` inside the one export request they arrive with and never store them, over writing them into the document as renames, because they are the host's per-audience veiling of names, which must not persist into the map's own facts or reach the next export (item 85 (b); §14). |
| J-A85.03 | Chose to state the seam's security rules each at its subject — the one-way seed, the display names and the audience table with the port (§14), the inert-export bar at §11.1, reply correlation, the source-window check and the before-ready queue at §11.3 — and to keep the audience table as host glue in `@plat/port`, never a model rule, over one security section, because each rule is enforced by the code that owns its subject and the module's roles and knowledge tiers stay §11.3's and §9.2's, a viewer never raising its own tier (J-A30.82) (§14). |
| J-A101.01 | Chose to state the authoring tools' interactions and the UX rules R1–R19 — (f′) superseding (f)'s evidence wording, R17 folded into R4 and R14 — as §14's reference-UI interaction contract, each rule a sentence with the mechanism it relies on and the evidence by pointer to `research/ux/tool-survey.md`, with a keyboard form for every gesture, over quoting the web evidence in the design or leaving the UX to the build, because the rules are the owner-asked-for design ("keep in mind a casual audience"), the quotations are research that belongs outside the design, and the app's accessibility bar must hold for the new tools (§14). |
| J-A101.02 | Chose to define a clerk as any program that drives the map through the tool API alone — its reading, authoring, critiquing and iterating mapped onto existing calls (queries and the oracle, dry runs shown as ghosts, a skeleton dry-run as a creation prefix with the reports it yields) and its limits enforced by the module (the dry run and the undo, the `dossier-owned` refusal, the knowledge filter, declarations only) — with the built-in clerk staged, opt-in and labelled as AI, over a clerk component with privileges of its own, because a clerk that can do only what the canvas can is interchangeable with a person (the owner's "for both an ai clerk and a user"), SettlementForge's own clerk can drive the module through the same API, and the hobby's climate makes an opt-in, labelled, picture-free clerk a product fact (R19; §14). |
| J-A101.03 | Chose the first-five-minutes test as a milestone exit criterion at M2a and M3a — five to eight casual game masters new to the product, a quarter, a place, a dress task and a scoped re-roll in their first five minutes, passing when all or all but one complete them, a failed task revised and re-run with new participants — and to measure the survey's three open questions (touch editing, a preview-first clerk, declared-means-held) in the same sessions, each with a pre-decided fallback, over leaving them open, because no amount of review reading replaces watching new users, and the owner's no-defer rule turns an open question into a measurement with a fallback (§13.4). |
| J-A101.04 | Chose to stage plots on a bridge deck with no hook beyond the existing `Bridge` and way records, the stage adding a frontage rule on a deck, over adding deck plot fields now, because a deck is already a way with a surface and a plot needs only a frontage to attach to it, so the stage's rule is a registration (J78 (c); *Staged by the owner's roadmap*). |
=== END ===
