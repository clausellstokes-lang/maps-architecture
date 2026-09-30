## §16 Parity matrix and improvement matrix

### 16.1 Parity matrix — every capability row of `docs/CONFIDENCE.md` §4.1–4.4 (the ruled tables) → where it lives; tag BASE / STAGE-2 / VILLAGE-LATER / HOOK

Cells marked "beyond" are where the base deliberately exceeds the reference (CONFIDENCE annotates those rows as weaknesses the base must not reproduce).

**MFCG (must be covered by the base)**

| id | capability | where in this design | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §3.3 blueprint, §7.2 permalinks, intent layer §8.5/O10 | BASE |
| A2 | RNG stream, seed chain, save/restore | §7.1 keyed sub-streams (beyond: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §5.1, §6 (beyond: no whole-city restart) | BASE |
| B1 | patch mesh | replaced by §5.3 backbone faces + §5.5 infill (the mesh is not a truth model; its "denser, more regular centre" seed idea survives as the stage-1 density regime) | BASE |
| B2 | junction optimisation | §5.3 junction rules (merge below spacing threshold, weld) | BASE |
| B3 | coast / water field / `sea` | §5.2 closed-outline routine with a coast bearing | BASE |
| B4 | `buildDomains` (land components) | §5.2 land as a multi-component polygon set | BASE |
| B5 | curtain wall, gates, towers, watergate | §5.4 P6 (gates on arterials, towers by rule, watergate as a gate kind) | BASE |
| B6 | citadel / castle | §5.4 castle sited by score on a claimed plot; keep by LIR; bailey | BASE |
| B7 | streets and roads | §5.3 tier-1 arterials + staged secondaries; §9.3 casing look | BASE |
| B8 | rivers / canals | §5.2 rivers by descent, canals as a water kind | BASE |
| B9 | districts | §5.4 P4 typed faces + naming feature | BASE |
| B10 | ward → blocks (alleys) | §5.5 bent cut → blocks; alleys as ways (§5.6) | BASE |
| B11 | block → lots | §5.6 frontage-first plots (beyond) | BASE |
| B12 | outskirts density falloff | §5.6 granularity law reads distance/stage; §5.3 stage density regimes | BASE |
| B13 | shanty town / sprawl | §5.4 district type `shanty` placed after stage ½ by rule (FTG's staging) with MFCG's ribbon trigger set (coast/river/roads) | BASE |
| B14 | plaza, temple, churches, gate plazas | §5.4 claims + gate-plaza rule; typed open spaces §5.7 | BASE |
| B15 | landmark / solid buildings, keep plan | §5.4 LIR keep; §5.6 institution site plans; `ink` solid-ink landmarks §9.3 | BASE |
| B16 | greens / parks | §5.7 P13 | BASE |
| B17 | farms and fields | §5.7 P12 (field-system presets incl. VG sectors; furrow program) | BASE |
| B18 | harbour, docks, piers | §5.2 harbour water kind + §5.4 waterfront district + pier ways | BASE |
| B19 | trees and forests | §5.7 P13, render-time instances §9.4 | BASE |
| B20 | elevation field | §5.2 heightfield (beyond: real terrain) | BASE |
| C1 | display modes (Lots / Blocks / Complex) | §9.1 LOD bands + §5.6 plot model (beyond: no global switch) | BASE |
| C2 | roofs (Plain / Hip / Gable, Raised, Solids) | §9.3 roof program (skeleton hips, fake gables), Raised via the shadow/height hook | BASE |
| C3 | lot post-processing (Offset) | §5.6 front-line jitter parameter | BASE |
| D1 | naming | §5.7 P14, §10 (original content) | BASE |
| D2 | district labels | §10 hole-aware spines + collision (beyond) | BASE |
| D3 | map furniture | §10 | BASE |
| E1 | colour system (tints, weathering) | §9.1 palette roles + per-entity jitter attrs; tint programs | BASE |
| E2 | stroke discipline, layer order, caching | §9.1 programs, order as data, §9.2 tiles | BASE |
| E3 | alleys layer | §5.6 alleys as ways; §9.1 unstroked→stroked by LOD | BASE |
| E4 | district view, framing, thin lines | §9.1 `district` band; framing = view over world units (§2.5) | BASE |
| F1 | warp tools | §8.3 warp brushes as events (stated semantics) | BASE |
| F2 | rerolls, renames, landmarks | §8.1 `regenerate`, `setAttr`, `assign` | BASE |
| F3 | UI / hotkeys / size bands | app (§2.1), size ladder as data (§3.1) | BASE |
| G1 | export PNG / SVG / JSON | §12 (beyond: round-trip, layered SVG) | BASE |
| G2 | integrations (Azgaar, City Viewer, Armoria) | §12 embedding API + glTF; host inputs later | BASE (hooks) |
| H1 | population and scale model | §11, §5.1 P1; metres (§3.1) | BASE |
| H2 | performance envelope | §13 | BASE |

**FTG (must be covered by the base)**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §3.3 blueprint + tables as data + presets; §8.5 | BASE |
| A2 | two-phase pipeline, staging, failure policy | §5.1 (roster P1 before geometry; stages), §6 | BASE |
| A3 | coordinate system, units, wire format | §4.1 int32 cm; §3.3 binary twin | BASE |
| A4 | determinism, seeding, regeneration (a non-feature in FTG) | §7 (beyond) | BASE |
| A5 | server/client split, persistence, lazy person generation | §2.5 worker/headless; §3.3 document; §11 lazy people | BASE |
| B1 | size ladder, population and area budget | §5.1 P1, §5.3 area budget per stage, §13 | BASE |
| B2 | dependency-graph building selection | §11 | BASE |
| B3 | residents, job postings, backfill, matching | §11 households/professions; reconcile §5.7 | BASE (module) |
| B4 | people model | §11 (lazy, data dictionaries) | BASE (module) |
| B5 | government, religion, factions, military | §11 factions/religions as data | BASE (module, data-first) |
| B6 | relations, friend groups, rivalries, events | should-have follow-on behind the same ids (§11, J-S) | BASE-later |
| C1 | coast generation, islands, ponds | §5.2 | BASE |
| C2 | rivers, branches, bridges, classification, direction | §5.2 (typed by construction), bridges as ways at crossings §5.3 | BASE |
| C3 | manually drawn water | §8.1 `drawWater` | BASE |
| C4 | road-graph substrate (one graph) | §3.1 DCEL for every feature | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages) | §5.3 (beyond: destinations, curvature continuity) | BASE |
| C6 | district lots: creation, merge floor, type selection | §5.4 P4 | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings) | §5.4 P5 claims → §5.5 → §5.6 | BASE |
| C8 | lot → plot subdivision geometry | §5.6 frontage-first (beyond) | BASE |
| C9 | building footprints, landmark templates, entrances | §5.6 site plans; entrance on access edge; institutions as compositions (stage 3 hook) | BASE |
| C10 | suburb stage | §5.3 stage table (suburb = a stage with offshoots and small lots from the outset) | BASE |
| C11 | walls and towers | §5.4 P6 | BASE |
| C12 | castle district | §5.4 castle | BASE |
| C13 | harbours and waterfront districts | §5.2/§5.4 | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §5.7 P12 | BASE |
| C15 | forests, tree areas, trees, hedgerows | §5.7 P13; hedgerow instances along field lines (`lit` preset) | BASE |
| C16 | landscape decorations, reserve, climate presets | §5.7 P12 (ground cover, reserved natural area as a land-use kind); climate as a circumstance preset | BASE |
| C17 | perimeter expand + round; decoration system | §5.7 (settlement perimeter = stage boundary offset; decorations = yard parts + furniture entities) | BASE |
| C18 | district and building naming, erosion | §5.7 P14, §10 (contraction as an EVO event) | BASE |
| D1 | renderer architecture | §9.1–9.2 | BASE |
| D2 | palette and feature treatment | §9.3 `lit` preset | BASE |
| D3 | roofs (straight skeleton) | §4.2 skeleton + §9.3 roof program; cached per entity (beyond: not per render) | BASE |
| D4 | water rendering and coast decoration | §9.3 (bands, foam, bank classes) | BASE |
| D5 | day/night, weather, seasons, window lights | style presets + `lights` role + time input from `sim` (§9.3, §11) | BASE (should-have depth) |
| D6 | post-process effects | `render-gl` later; `render-canvas` filters (parchment, vignette) in presets | BASE-later |
| D7 | labels, scale bar, grid, legend, thematic layers | §10; thematic layers = style overrides keyed by entity attributes (FTG's matchers idea) | BASE |
| D8 | 3-D view, street view, height maps (shelved) | glTF export §12; heights in the model; no 3-D default view (R13 restraint) | BASE (export) |
| E1 | layout editor | §8.1 draw/move/warp events with split-on-cross | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §8.1 `regenerate` with scope + `setAttr` batch; faithful regeneration §8.2 | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §8.1 `setAttr`, data dictionaries by id (§11), pins/notes as label/annotation entities (§10) | BASE |
| F1 | schedules, behaviours, sub-locations | §11 schedules; sub-locations = building slots/rooms | BASE (module) |
| F2 | clock, calendar, external time sync | §11 calendar + §12 bridge `SET_TIME/SIMULATE_TIME` | BASE (module) |
| G1 | export | §12 | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §12 VTT adapter + bridge | BASE |
| H1 | data scale | §13 memory; lazy people | BASE |
| H2 | performance envelope | §13 (beyond: sub-second client-side) | BASE |

**NG (covered by the stage-2 interface; the base carries the contract)**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, settings, URL state | §2.2 request; intent layer | STAGE-2 (request shape in BASE) |
| A2 | RNG engine, one stream, successor seed, save/restore | §7 keyed sub-streams (district id → sub-seed) | BASE |
| A3 | pipeline structure and failure policy | §2.2 refinement stages under §6's ladder (NG's substitution rule adopted) | STAGE-2 |
| B1 | hood outline (`createShape`) | replaced by the S1 boundary (a district face) or, standalone, by the coast/island outline routine (§5.2) | STAGE-2 / HOOK |
| B2 | templates area / street / square + sub-areas | S4 context templates as data (§2.2) | STAGE-2 |
| B3 | street network by bent recursive bisection | §5.5 bent cut (already in the base at city LOD; the close-up refines with tier-3 lanes) | BASE + STAGE-2 |
| B4 | hole-aware bisection of annuli (`BisectorEx`) | §4.2 booleans + §5.5 corridor subtraction on faces with holes; ring templates as S4 data | STAGE-2 |
| B5 | street finishing: extend, fillet, width, corridor | §5.5 (extension to earlier cuts, width by class, corridor subtraction); fillets at style time | BASE + STAGE-2 |
| B6 | block content dispatch | §5.6 site plans + §5.7 greenery (targets, not a blind gate) | BASE |
| B7 | square-template plaza | typed open spaces §5.7; S4 | STAGE-2 |
| B8 | ring-template seed geometry | S4 template data (§2.2) | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §5.6 frontage-first (beyond: no discard) | BASE |
| C2 | buildings, wings, plans, roof kinds, landmarks | §3.2 `Composition`, §9.3 roof program; stage 3 for wings | BASE (hook) + STAGE-3 |
| C3 | manor compounds | §5.6 `compound` arrangement; stage 3 grammar (`manor.md` §9) | BASE (site plan) + STAGE-3 |
| C4 | greens, groves, shared Poisson field | §5.7 P13; §4.2 Poisson | BASE |
| C5 | trees | §9.4 instances (lobed crowns) | BASE / STAGE-2 render |
| C6 | pins (wells, fountains) | furniture entities in yards/plazas (§5.6, §9.3) | STAGE-2 |
| C7 | uneven streetwall | §5.6 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | §3.2 `CharacterVector`; metres (beyond) | BASE |
| D1 | naming | §10 | BASE |
| D2 | title layout | §10 furniture (emptiest corner) | BASE |
| E1 | palette / style schema | §9.1 (NG's 26-key schema maps onto roles) | BASE |
| E2 | canvas, layer order, stroke discipline | §9.1 order as data; §9.2 | BASE |
| E3 | roads rendering (Plain + five modes) | paint programs (paved stripe, dashed, cobbles, tiles, outline) in the `shaded` preset | STAGE-2 render |
| E4 | roof rendering | §9.3 `roof` + `hatch(taper)` | STAGE-2 render (BASE programs) |
| E5 | shadows | §9.1 `shadowPass(prism)` from stored heights | BASE (hook) / STAGE-2 |
| E6 | unrecorded style features | additional presets (data) | STAGE-2 |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | app; §8.1 `setAttr` | BASE |
| G1 | export PNG/SVG/JSON, permalinks | §12, §7.2 | BASE |
| G2 | integrations (Procgen Mansion / Dwellings hand-off) | stage-3 `BuildingGenerator` takes the plot + entrance directly (beyond: no rasterised hand-off, `manor.md` §3.2) | HOOK |
| H1 | performance envelope | §13 neighbourhood LOD budget | STAGE-2 |

**VG (checked only as not precluded — village is a later product)**

| rows | check | where |
|---|---|---|
| G1–G2 tags/seed | request + keyed streams accept a tag-style intent; a village preset is data | §3.3, §7 |
| G3–G5 river course, height field, water extraction | the base's site model does the same job (course first, carve, level sets) at any size | §5.2 |
| G6–G8 density map, heart, tracker roads | a `LayoutStrategy` may replace the backbone with a tracker-style single road; density is a raster field type already in the document | §15, §3.3 |
| G9–G11 bridges, square, piers | present in the base as ways/open spaces/pier ways | §5.3, §5.7 |
| G12 buildings + population | detached/cottage/farmstead site plans exist | §5.6 |
| G13–G15 fields, orchards, forest | P12/P13 presets incl. the VG sector look | §5.7 |
| G16 palisade + gates | wall kind `palisade`; a cheap hull-based trace is a table row | §5.4 |
| G17–G20 naming, legend/POIs, class, descriptive tags | grammar engine, annotation layer, tags derivable from the statistics record | §10, §14 |
| R1–R17 rendering | the `shaded` preset carries every program VG needs (bands, contour marks, hillshade tier, spotlight vignette, selective outlining, plank bridges, lights, nameplate, grid, numbering) | §9.1, §9.3 |
| E1–E6, D1 export, permalinks, toggles, integrations, performance, scale | shared with the base; metres everywhere (VG's 0.7 m/unit ambiguity removed) | §12, §7.2, §13, §3.1 |

Nothing in the base precludes any VG row; none is paid for beyond what the base needs.

### 16.2 Improvement matrix — every must-have / should-have of `docs/IMPROVEMENTS.md` §5 → mechanism + acceptance metric

| id | mechanism in this design | acceptance metric (from the opportunity's criteria; runnable on B-CITY/B-EDIT/B-FUZZ/B-REF/B-ZOOM) |
|---|---|---|
| O2 must | §7 keyed sub-streams; §3.1 ids; render-time decoration seeded by id | model hash identical across 2 machines × 3 browsers 100 %; perturbation tests 0 cross-effects; locality ≥ 95 %; ids outside scope 100 %; goldens byte-identical for untouched stages |
| O6 must | §3.1 metres/cm; tables with provenance; size as population; §10 furniture; §14 statistics record | 100 % length fields carry `m`; house median 60–160 m², p95 < 400; grid pitch ± 0.5 %; statistics record 100 % with provenance |
| O3 must | §4 kernel (typed results, robust predicates, snap rounding), §6 ladders + invariants + report | B-FUZZ 0/0/0; restarts 0; hard violations 0 per 1 000; retries ≤ 2 %, p99 ≤ 3; B-EDIT 0 planarity violations; model time within §13; identical hash across platforms |
| O11 must | §3 schema + registry; §12 views; §15 API | registry round-trip 100 %; containment 100 %; export→import→export identical; GeoJSON validates and opens in a GIS with districts; 0 dangling refs; headless = UI hash; VTT grid error 0 px; layered SVG separable |
| O1 must | §5.2 site model | restarts 0; monotone rivers with outfalls 100 %; contours × water 0; 10/10 configurations on 100 seeds; building ∩ water 0; water stage ≤ 5 ms at 128²-equivalent; site classifier ≥ 90 %; unused adjacent land 0 |
| O4 must | §5.3 backbone + §5.5 infill + ways as entities | destinations 100 %; detour ≤ 1.4; junction p5 ≥ 30°; no turn cliff; 4-way 0–15 %; width ~ betweenness; slope limits; micro-edges 0; network+infill ≤ 100 ms at CITY with infill stats in NG bands; N external connections exact |
| O5 must | §5.6 frontage-first plots | access 100 %; < 3 m plots 0; wedge < 0.5 %; side-wall ± 5° ≥ 90 %; typed coverage 100 %, discard ≤ 0.05; KS reported; 0 self-intersections/duplicates/doorless; streetwall gap ≤ 1 m |
| O18 must | §5.6 P8 field + granularity law + alleys | Spearman(prosperity, plot area) ≥ 0.8; Moran's I > 0; monotone detached/yard/attached; alley density Spearman ≤ −0.7; access 100 %; institutions 100 %; provenance + perturbation test; seams within band; field smooth; CV floor; gap-width modes |
| O17 must | §5.6 P10 site plans; §3.2 heights; §9.1 shadow hook | coverage within table; multi-footprint institutions > 0; party-wall bands; streetwall continuity; yards owned 100 %; fits 100 %; heights 100 %, shadow ∝ height r ≥ 0.99; ≤ 10 µs/plot; footprint hash identical across LOD |
| O7 must | §5.1 P1/P11, §11 | function + occupancy 100 %; population ± 5 % on ≥ 95 %; rule satisfaction ≥ 95 %; Moran's I(wealth) > 0; constraint violations 0; convergence ≤ k; seam Δ below threshold; lazy people stable 100 %; gazetteer 100 % |
| O19 must | §5.7 P13, §9.4 | private green monotone (Spearman ≥ 0.7) within ± 5 pts, σ ≤ 8; public rules ≥ 95 %; typed 100 %; scatter p1 above threshold; ≥ 10 k trees/16 ms; monotone control |
| O8 must | §5.4 P6 | gates = arterial crossings 100 %, others 0; wall ∩ buildings/setback 0; tower spacing in band; defensible-ground share; castle ≥ p80; enceinte variants 4/4; EVO conversion preserves plot ids; wall as an entity in every export |
| O12 must | §9 | continuous zoom; footprint hash identical per LOD; min feature ≥ 2 px; ≥ 60 fps at 40 k buildings / 200 k trees; edit-to-redraw < 100 ms; roofs/frame after warm-up 0; screen = PNG = SVG; option couplings 0; glyph ambiguity 0; tiled export; contrast 100 %; first map < 1 s |
| O9 must | §8.1–8.2 | save→load→save identical; locked preserved 100 %; KS p > 0.05 on ≥ 95 % of regenerations; every op undoable; upgrade keeps 100 % edits; the 12 MFCG edit asks expressible 12/12 |
| O16-core must | §6 report surfaced; §8.2 actions | report 100 %; auto-resolved values reported 100 %; couplings 0; seed identity 100 % |
| O13-core must | §10 | protected overlap 0; collisions 0; inside ≥ 99 %; renames persist 100 % |
| O14-core must | §5.7 P12 | farmland per capita ± 20 %; every land component used; roads leaving the frame have destinations 100 % |
| O10 should | §8.4–8.5, intent vocabulary in the blueprint, forms catalogue as stage tables | 10/10 intent tasks; hard targets 100 %; monotonicity; pins 100 %; assignments ≥ 99 %; size error p90 ≤ 10 %; forms classifier ≥ 90 %; edited tables versioned |
| O13 full should | §10 street names, addresses, annotation layer | ≥ 90 % named streets labelled at neighbourhood LOD; name–feature consistency 100 %; addresses 100 % |
| O14 full should | §5.7 rings, presets, wildness control, margin, feasibility check | land-use shares by band; forest-edge straightness; canopy monotone; extent band; ≥ 95 % classified |
| O16 full should | thumbnails via P0–P4 proxy (§5.1), drafts, discoverable export | six thumbnails < 1 s; usability tasks ≥ 90 %; editor at 768 px |
| O12 extras should | relief tiers, tiled export, print presets, low tier | as O12 |
| O7 sim should | §11 | the same person on every view; schedules per building; calendar sync |
| O11 extras should | §12 VTT, per-layer, binary, glTF, GIS profile | as O11 |
| O9 extras should | §8.1 migrate with diff | upgrade test |
| O2/O6 extras should | §7.2 goldens; table calibration interface | declared-shift protocol in CI |
| S1 (stage 2) | §2.2 contract; §3.2 `District.contract` | 100 % of districts carry a complete contract; portals 100 %; Hausdorff 0 |
| S3 | §5.6 P8 seam flags | Δ within band on soft seams |
| S2, S4, S5, S6 | §2.2 hooks; §9.1 `neighbourhood` band; §8.1 regenerate | as `docs/IMPROVEMENTS.md` §3.2 |
| hooks 1–8 (§5.4 there) | §3 ids/lifecycle/layers/context vector, §5.8 incremental, §8.4 assignment, §2.3 building generator + heights + shadow hook, §5.2 drainage, §2.2 boundary + sky, §8.5 tables with preference layer, §5.8 circumstances + editable field | schema tests: every hook field present on every entity of every B-CITY city (100 %) |

