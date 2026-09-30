# proposal-product — a renderer-and-product-first architecture for the fused town/city generator (MFCG ⊕ FTG), stage-2 neighbourhood composition, and the hooks beyond

Lane `design/proposal-product` (architect seat 3 of 3, Fable 5.1), 2026-09-25. STATUS: COMPLETE (2026-09-25; assembled from nine incrementally written parts kept in `docs/design/_parts/`).

**Angle.** Users judge a map by the picture and by what they can do with it. This proposal is written backwards from the four things a user touches — the picture (display list + style), the words on it (labels), the hand on it (editing, assignment, regeneration) and the way out of it (export, VTT, 3-D, embedding) — and lets those four contracts dictate the domain model, the geometry kernel and the pipeline. Every mechanism that claims parity with a reference cites the findings section read; every improvement names the reference weakness (ledger id) it answers and the metric that would show the gain.

**Binding inputs.** `research/findings/_critic.md` (read first), `_critic-ftg.md`, `_critic-os.md`, `_critic-vg-ng.md`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md`, `docs/confidence/{mfcg,vg,ng,ftg}.md`, `research/findings/visual-spec.md`, `os-geometry.md`, `manor.md`, the section outlines of every other findings file and the sections listed in Appendix A. Owner rulings in the task brief are binding and are applied as written (product scope, plot model, plot granularity, prosperity field, greenery, height, assignment, layers, evolution, tiebreaker, adopted defaults, staffing).

## §0 Reading record (what was and was not read in full)

The READING BUDGET switch fired at ≈340 k tokens of reading. Everything below is stated so a validator can weigh each claim.

| # | file | read | notes |
|---|---|---|---|
| 1 | `research/findings/_critic.md` | FULL (478 lines) | read first, as ruled |
| 2 | `research/findings/_critic-ftg.md` | FULL (256) | zig-zag ruling, F1–F27, §4 payload re-derivations |
| 3 | `research/findings/_critic-os.md` | FULL (434) | constants table, C1–C18, draw order §4 |
| 4 | `research/findings/_critic-vg-ng.md` | FULL (226) | V1–V27, build stamps |
| 5 | `docs/CONFIDENCE.md` | FULL (801) | incl. the four ruled capability tables §4.1–4.4, §5 "cannot be known", §6 experiments |
| 6 | `docs/IMPROVEMENTS.md` | §0–§5 and §7 FULL (lines 1–1595, 1786–1848); §6 traceability and Appendix A by outline | every opportunity O1–O19, S1–S6, V1–V3, §4 keep-tests, §5 split, §7 judgment calls read in full |
| 7 | `research/findings/visual-spec.md` | FULL (743) | the renderer-first evidence: draw records, layer orders, palettes, the casing rule, the minimum renderer feature list |
| 8 | `docs/confidence/{mfcg,vg,ng,ftg}.md` | section outlines only | their per-row values are superseded by the ruled tables in `docs/CONFIDENCE.md` §4.1–4.4, which were read in full; the assessments' prose per row was NOT read (budget) — parity rows in §16 cite the ruled tables |
| 9 | `research/findings/os-geometry.md` | outline + §4 (complexity/robustness), §5 (what a rewrite should replace), §6 (open questions) in full (lines 828–913) | §1 invariants and §2.1.4 inset operators NOT read in full; their constants are covered by `_critic-os.md` §1 rows 88–114 |
| 10 | `research/findings/manor.md` | outline + §2 (composition grammar), §3 (plan vs plot), §4 (diversity), §8–§9 in full (lines 82–279, 345–377) | §1, §5–§7 not read |
| 11 | `research/findings/watabou-extra-b.md` | outline + T4–T6 (159–246), T23–T27 (523–720) in full | Urban Places base mesh and frontage band; skeleton labels and gables |
| 12 | `research/findings/watabou-extra-a.md` | outline + §2.1–2.2 (64–164) in full | the bent-cut method post; perpendicular side walls |
| 13 | `research/findings/profile-mfcg.md` | outline + §3.1–3.2, §6.2–6.5, §7.1, §8, §10.5 in full | live control flow, skeleton/label chain, per-stage cost, layer order |
| 14 | `research/findings/profile-neighbourhood.md` | outline + §3.6–3.7, §4.3, §5 in full | roof/hatch/shadow laws, layer order, cost model |
| 15 | `research/findings/ftg-docs-params.md` | outline + §2.2–2.9, §3.3 in full | proposal queue, stages, lots→plots, render conventions, dependency loop |
| 16 | `research/findings/ftg-payload-visual.md` | outline + §7.2–7.3 in full | postMessage protocol and entity fields (embedding parity) |
| 17 | `research/findings/mfcg-devlogs-b.md` | outline + §2.5, §2.14 in full | skeleton labels; JSON export schema and URL keys |
| 18 | `research/findings/ftg-posts-c.md` | outline + §2.18–2.20 in full | map layers, grid/units, regenerate area |
| 19 | `research/findings/profile-village.md` | outline + §6, §7.1–7.2 in full | relief engine, palette schema, layer order |
| 20 | all other findings files (`os-model`, `os-wards-render`, `mfcg-posts-a/b`, `mfcg-devlogs-a`, `vg-posts-a/b`, `vg-ng-devlogs`, `ftg-posts-a/b`) | section outlines (`grep -n '^#'`) only | mechanisms from them are cited through the critic files and `docs/CONFIDENCE.md`/`docs/IMPROVEMENTS.md`, which quote them with section numbers; no mechanism below claims parity with a section of these files that was not read either directly or through a ruled quotation |

Not opened: any captured JavaScript bundle; the challenge files (excluded by the task); `docs/improvements/*.md` ledgers (their entries are cited through `docs/IMPROVEMENTS.md`); `captures/*/*/report.md` directly — every number below is taken from the findings/critic files that quote them (each with its capture path). Where a number is quoted, its build stamp is kept (MFCG 0.11.x itch 12710731; NG 11441280; VG 19251041/19365073; FTG server 2026-09-21/25).

**CONFIRMED vs PLAUSIBLE.** Every reference behaviour cited below is CONFIRMED by the cited findings/critic seat (their own executed measurements or verified quotations). Every design mechanism, budget, interface and target number is PLAUSIBLE until built and measured on the benchmarks (B-CITY, B-EDIT, B-FUZZ, B-REF, B-ZOOM, `docs/IMPROVEMENTS.md` §2) — exactly as `docs/IMPROVEMENTS.md` §7.4 rules.

---

## §1 Outcome first — the proposal in one page

**The picture decides the architecture.** Four contracts a user actually touches are fixed first and everything behind them is derived:

1. **The picture** — one semantic, layered *display list* built from the model, consumed by every back end (Canvas2D, SVG, PNG tiles, print, WebGL) with level of detail (city → district → neighbourhood → building) and style as data. It must be able to reproduce the recorded MFCG ink look to the pixel (four inks, `w + 2h` casing, hairline `h = 0.5 px`, round joins; `visual-spec.md` §0.2, §1), the VG/NG shaded-and-hatched look (`(i/N)^1.5` water bands, one flat shadow pass, tapered-triangle roof hatching, `getDark = c × lerp(ambience, shadow, α)`; `visual-spec.md` §2–3, `profile-neighbourhood.md` §3.6–3.7), and an FTG-like textured/lit look (directional light, tinted tiles, hedgerows; `visual-spec.md` §4). Because the display list carries **heights and a shadow-layer hook**, **layers (underground/ground/sky)** and **stable entity ids** from day one, stage 2 (neighbourhood LOD), stage 3 (compositions with rooms), sewers, sky islands and the evolution engine are additions to a list, not rewrites of a renderer.
2. **The words** — a label engine on hole-aware straight-skeleton spines (MFCG's stated method, `mfcg-devlogs-b.md` §2.5; failure modes in `watabou-extra-b.md` T6) with collision handling and protected features, and names conditioned on the model from an original grammar.
3. **The hand** — an *edit log* of typed events on stable ids over a *document* (blueprint + edits + lifecycle), so lock, warp, redraw, assign and regenerate-area are all the same thing: an event the generator solves around locally.
4. **The way out** — one versioned schema in metres whose exports (native JSON, GeoJSON, layered SVG, PNG/tiles, VTT levels, glTF) are *views*, plus a headless library API with a `postMessage` bridge at least as rich as FTG's Foundry protocol (`ftg-payload-visual.md` §7.2).

**What the four contracts force on the model.** Stable hierarchical ids; metres (integer centimetres on the wire, as FTG); a half-edge planar subdivision as the single spatial truth (FTG's one-graph substrate — streets, lot outlines, walls, water outlines and the map border are all typed edges of one graph, `_critic-ftg.md` F9/F10/F15 — generalised); faces that are districts, blocks, plots, courts and fields; a plot that owns 0..n footprints and a yard (owner ruling); every building with floors and heights; layers with z-order and elevation; provenance on every rule-table value; keyed RNG sub-streams so that adding a feature or growing a settlement does not reshuffle what exists.

**The fusion thesis in one sentence (detail in §1.3).** A terrain- and water-first site model that neither reference has; FTG-class **staged, destination-driven arterial growth** in metres as the backbone (it extends naturally under the evolution hook and wins the owner's tiebreaker); MFCG/NG-class **bent-cut infill** inside the backbone's faces to keep the T-junction fabric that is most of MFCG's charm (NG's measured signature is the regression suite); **frontage-first plots** with a prosperity-driven granularity law replacing both MFCG's painted lots and FTG's owner-less 441 m² tiles; the **FTG-class roster** reconciled two-way through a per-plot context vector; **MFCG-class one-click charm** (walls, gates, castle, plaza, temple, ink style) placed by rules on the grown graph instead of on Voronoi cells. The creator of MFCG judged the merge "problematic" in 2018 (devlog 31287, verified by the IMPROVEMENTS seat); the risk is retired by a measured gate (§13, §14): model time ≤ 100 ms at TOWN and infill block statistics inside NG's measured bands.

**What is decided here that the owner may veto** (§20): integer-centimetre coordinates with robust predicates; TypeScript core with a worker boundary and optional Wasm hot paths; keyed xoshiro128\*\* sub-streams; a flat mark-based display list rather than a scene graph; native JSON as the canonical document with a compact binary twin; glTF over CityJSON for 3-D; the simulation module scoped to schedules-and-calendar parity but not events/relations in the base's first release (J-S in `docs/IMPROVEMENTS.md`); the village-later ladder untouched.

### 1.1 Reading the references through the four contracts

| contract | MFCG (as recorded) | FTG (as recorded) | NG (stage-2 target) | consequence for the base |
|---|---|---|---|---|
| picture | canvas2D per display object → WebGL textures, one bitmap per ward (46 000 fills, 590 uploads), no zoom, whole display tree rebuilt per regeneration (`visual-spec.md` §1.1, `profile-mfcg.md` §10.5) | three.js merged BufferGeometry, roofs recomputed per render, tiers off on weak devices (`visual-spec.md` §4.1, `ftg-docs-params.md` §2.9) | canvas2D, one canvas per tree (528 uploads), hatch = 55–80 % of ops, rasterising costs more than generating (`profile-neighbourhood.md` §5) | retained tiles cached per district (MFCG's per-ward idea), instanced hatching/vegetation, derived geometry cached by id, continuous zoom |
| words | per-glyph curved labels on skeleton ridges, halo, size ∝ district, covers gates/keeps (`profile-mfcg.md` §8; `docs/IMPROVEMENTS.md` O13) | SDF serif labels with halo, arced across districts, no street names (`visual-spec.md` §4.5) | one title, no labels | hole-aware spines + collision + protected features + per-zoom label sets + street names |
| hand | 8 warp tools on vertices, no save of edits, `gates` change re-rolls everything (`_critic.md` C4; `docs/IMPROVEMENTS.md` O9) | layout editor, regenerate-area, bulk edit, "cannot be undone" (`ftg-posts-c.md` §2.20) | seed + tags only | edit log on ids, locality by sub-seeds, undo, faithful scoped regeneration |
| way out | SVG/PNG/JSON-that-resembles-GeoJSON, no re-import (`mfcg-devlogs-b.md` §2.14) | protobuf sint32 cm, GeoJSON without districts, Foundry `postMessage` (`_critic-ftg.md` F1, F26; `ftg-payload-visual.md` §7.2) | none recorded | one schema, views as exports, round-trip import, embeddable API + bridge |

### 1.2 The product shape, stated once

* **STAGE 1 — the BASE**: one general town/city generator, size ladder TOWN → CITY → METROPOLIS (population targets ≈ 5 000 / 20 000 / 50 000 as `docs/IMPROVEMENTS.md` §2 B-CITY), fusing MFCG-class and FTG-class generation plus the base opportunities O1–O19, built first. One click, sub-second model, ink style by default, FTG-like lit preset second (owner's adopted defaults).
* **STAGE 2 — neighbourhood composition**: every base district is generatable as an NG-class close-up (blocks, plots, courtyards, hatched roofs, local street identities) from the district's S1 boundary contract, with consistent seams, shared seeds and one style system; designed here to interface depth (§5.7, §15), built after the base.
* **STAGE 3, sewers, sky islands, assignment, evolution**: hooks only, all carried by the schema and the display list (§3, §9).
* **VILLAGE (THORP → HAMLET → VILLAGE)**: a separate later product; §2.4 lists what the base leaves open and checks nothing precludes it. Not designed here.

### 1.3 FUSION THESIS — stage by stage

For every pipeline stage: which reference's approach the base adopts, which it discards and why, the measurable criterion, and where the owner's DESIGN TIEBREAKER (explicit constraints and precise real-unit geometry over the prettier or simpler approach) was applied. Evidence columns cite the findings section read (§0) or the ruled quotation.

| stage | MFCG approach (evidence) | FTG approach (evidence) | base adopts | discards, and why | criterion | tiebreaker applied? |
|---|---|---|---|---|---|---|
| **Site: terrain & water** | noise sampled only for the coast (`sea` an angle, 6-octave Perlin per cell), river = canal search with 712 course rejections and 21 canal restarts in 58 attempts, `deltaRiver` = widened mouth (`_critic.md` C15; `docs/IMPROVEMENTS.md` O1) | water first, drawn or generated in "two arms", ocean vs river by border touch, rivers can "bend back around", height map shelved (`ftg-docs-params.md` §4.2/4.4; O1) | **NEW**: heightfield in metres + drainage (flow, accumulation, outfalls) → rivers by descent, explicit water types, one closed-outline routine for coast/lake/island (also the sky-island outline); VG's "course first, carve the terrain" kept as the cheap trick (`_critic-vg-ng.md` V1/V2) | MFCG's parabola/search rivers (restarts); FTG's border-touch typing (bends back) | whole-map restarts = 0; rivers monotone with an outfall 100 %; contours cross water 0×; water stage O(cells) ≤ 5 ms at 128² equivalent (O1 a–e) | **yes** — explicit terrain/water constraints over MFCG's "no underlying landscape" |
| **Siting & size** | `size` in cells (8·size + 4 seed points, spiral), population ≈ 6.12 × buildings (`_critic.md` C1; `profile-mfcg.md` §4.1) | size ladder by population → fixed map width in metres; buildings and people decided before geometry (`_critic-ftg.md` F14; `ftg-docs-params.md` §3.1) | FTG: population/area/building count as the *request*; roster before geometry; extent derived from need + margin (O6, O14) | MFCG's cell count as size; FTG's fixed canvas per class | requested population within ± 5 % on ≥ 95 % of seeds; built-area/map-area within band across the ladder (O7 a, O14 e) | yes — metres and population over abstract cells |
| **Backbone streets** | streets = cell edges, BFS paths plaza → gate, roads aim at a phantom point 1 000 units out, hash-order tie-breaks (`_critic-os.md` C6/C10, row 140) | staged proposal queue, priorities, 15° per-vertex cap, locally orthogonal junctions, 15–30 m edges, no destinations, 62 % degree-2 nodes (`ftg-docs-params.md` §2.2–2.4; `_critic-ftg.md` §4 rows 7–8) | **FTG's staged growth** (queue, priorities, legality, stage prune/trim) made **destination-driven** (gates, bridges, fords, market, harbour, external bearings) over a cost surface (slope, water, fabric, walls), with curvature continuity instead of a per-vertex clamp; ways are entities with class and metric width | MFCG's cell-edge streets (no geometry, tie-break non-determinism); FTG's destination-less growth and 15° cliff | 100 % of through-roads end at a destination; detour index ≤ 1.4 median; no turn-angle cliff; junction p5 ≥ 30°; model time gate (O4 a–f) | **yes** — the growth backbone is more constrained (destinations, terrain, stages) and in real metres |
| **Districts** | `DistrictBuilder.fromPatch/fromVertex` + `Grower.grow` with validators, one prominent feature per named type (`_critic.md` §3; CONFIDENCE B9) | district lots from stage faces, typed from the remaining roster and neighbours, `minDistrictArea` merge floor, residential order (`ftg-docs-params.md` §2.5; `_critic-ftg.md` F6) | FTG: districts = unions of backbone faces typed by a roster-and-context score; MFCG: one prominent feature per type feeds naming; contiguous claims for institutions BEFORE the fabric is cut (O18) | MFCG's Voronoi-cell wards as truth (cells are invisible after 0.10.0 merging, CONFIDENCE B1 V) | every district a simple polygon with a complete S1 contract; venue-mix entropy above floor (R5); institution plots 100 % (O18 f) | partial — roster-typed districts are the constraint-led choice |
| **Fortification** | curtain wall over walled patches, gates ≈ ⌊E/3⌋ (2017) / exact `gates=N` live, towers on every non-gate vertex, castle = one cell, `gates=0` seals the city (`_critic-os.md` rows 40–58; `profile-mfcg.md` EG2-2/2-5) | wall = typed edge chain (wire 7) on a district ring after a stage, towers a subset of ring vertices (median 39 m), no gate objects (`_critic-ftg.md` F15; CONFIDENCE C11) | FTG's staged, graph-borne wall + MFCG's signature look and gate-plazas; gates exactly where arterials cross; towers by spacing rule; castle sited by score on a joined plot; several enceintes; lifecycle for wall → road (O8) | MFCG's tower-per-vertex and cell-castle; FTG's gate-less crossings | gates = arterial crossings 100 %; ungated crossings 0; tower spacing within band; castle site ≥ p80 (O8 a–e) | yes — defensible ground and water as explicit constraints |
| **Blocks (infill)** | ward → blocks by twisted bisection (0.9.0+), alleys explicit since 0.10.2, restart on 'bad poly' (`_critic.md` C13; Styles addendum ST-8) | district lot → block lots by inserted roads until < target area (`ftg-docs-params.md` §2.5) | **MFCG/NG bent-cut recursion** inside backbone faces, NG's measured signature (one bend near mid-course, right-angled arrival, OBB axis — `docs/IMPROVEMENTS.md` §4 R3) with FTG's area target as the stop law; cuts become ways | FTG's straight inserted roads as the only block former (too regular); MFCG's whole-city restart | K1/K2 statistics within measured spread; 4-way share > 0 and < 15 %; fallback ladder never restarts (O3, O4 f) | no — here charm and evidence agree; the tiebreaker did not have to be invoked |
| **Plots** | lots = bent cuts drawn as buildings ("the illusion of buildings"), `Offset` uneven fronts (O17) | lot → plots by strips (2023) / centroid cut (2025) / shrink-then-split (2026); 441 m² in every class; no owner (`_critic-ftg.md` F17; O5, O18) | **NEW**: frontage-first strips per block face (the 2019 "side walls perpendicular to the street" idea, `watabou-extra-a.md` §2.2, and Urban Places' frontage band, `watabou-extra-b.md` T24, done as a construction), typed residue, party walls, granularity law from the prosperity field, institution joins | both references' cut-then-filter lots | access edge 100 %; discard ≤ 0.05; side-wall angle within ± 5° on ≥ 90 %; Spearman(prosperity, plot area) ≥ 0.8 (O5, O18) | **yes** — metric frontage/depth bands over bisection by-products |
| **Buildings** | lots painted as buildings; `Complex` = one rectangle per lot; landmarks by largest inscribed rectangle (CONFIDENCE B15, C1) | Dense / Gaps / Individually placed, entrances on the frontage ≈ 3 m from the road, straight-skeleton roofs at render (CONFIDENCE C9, D3) | **NEW plot model**: per-plot site plan (row / set-back compound / detached / hovel) from class × prosperity × density tables; 0..n footprints + typed yard; heights on everything; building-generator interface with a trivial outline builder until stage 3 (O17; `manor.md` §9 for the stage-3 grammar) | MFCG's global display switch; FTG's one-building-per-household lot | coverage within table; multi-footprint plots for institutions > 0; attached share ≥ 90 % in dense classes; 100 % heights (O17 a–g) | yes — owner ruling; metric tables |
| **Content** | population = 6.12 × buildings; ward names are hints (O7) | roster from an 80-node dependency graph with a virtual-population loop, lifestyle pools, one-way handoff (`ftg-docs-params.md` §3.3; `_critic-ftg.md` F14) | FTG's roster-first guarantee with our own tables and a **two-way** plan–fit–reconcile loop over the context vector (O7) | MFCG's multiplier; FTG's one-way order | function + occupancy 100 %; rule satisfaction ≥ 95 %; Moran's I > 0 (O7) | yes — rules as explicit siting constraints |
| **Hinterland & greenery** | farms by `Cutter.grid`/`splitField`, forests fill space, trees Poisson k = 50 (CONFIDENCE B17, B19; `_critic.md` C2) | four farmland modes, hedgerows, 1 farm per 25 people, uniform tree scatter (CONFIDENCE C14, C15) | FTG's per-capita and mode ideas + VG's field rules as presets + rule-placed greenery by prosperity (O14, O19) | both references' "fill the leftovers" | farmland per capita within ± 20 %; typed leftover green = 0 (O14, O19) | yes |
| **Names & labels** | Tracery + Markov, feature-conditioned; skeleton-ridge labels (`profile-mfcg.md` §6.2, §8, §9) | syllable-budget names with contraction; arced labels; no street names (CONFIDENCE C18, D7) | MFCG's method (original content) + FTG's contraction as an EVO event; per-zoom label sets; street names (O13) | — | overlap with protected features = 0; name–feature consistency 100 % | — |
| **Rendering** | ink print, casing, per-ward cache, no zoom (`visual-spec.md` §1) | lit web map, textures, post-process, tiers (`visual-spec.md` §4) | one display list + style sheets reproducing both, LOD, layers (O12) | two code paths (MFCG), roofs per render (FTG) | ≥ 60 fps pan at 40 k buildings; screen = SVG = PNG within threshold (O12) | — |
| **Editing** | warp tools; no persistence (`_critic.md` C4) | layout editor, regenerate-area, no undo (`ftg-posts-c.md` §2.20) | edit log on ids; both references' tools as events (O9, O10) | — | locked entities preserved 100 %; every op undoable | — |
| **Determinism** | one Lehmer stream, save/restore, per-attempt reseed (`_critic-os.md` §4.3; `profile-mfcg.md` §6.5) | `seed: null`, render-time fills (CONFIDENCE A4) | keyed sub-streams per (stage, entity, concern, attempt, epoch) (O2) | both | model hash identical across machines; locality ≥ 95 % (O2) | — |
| **Failure policy** | whole-city retry incl. wards (ST-8) | server "gives up" (V1); shrink fails with no fallback (`_critic-ftg.md` F17) | typed results + bounded fallback ladders + local repair + report (O3) | both | restarts 0; hard invariant violations 0 per 1 000 cities | — |

**Rejected fusion shapes (written down as required).** (a) *MFCG-first: Voronoi/Delaunay cell mesh as the truth with FTG-style growth only outside the walls* — rejected: the cell mesh gives streets no geometry of their own, roads that point at nothing, and cannot grow incrementally without re-meshing (EVO hook); the tiebreaker also goes against it. (b) *FTG-first end to end: proposal-queue growth for every street down to lanes* — rejected: it produces "vaguely circular" look-alikes (the creator's own words, `docs/IMPROVEMENTS.md` O4) and a warped-grid fabric that loses the T-junction charm the owner wants kept; NG's measured infill statistics are the guard. (c) *Urban Places-style quad-dominant base mesh with streets as edge chains* (`watabou-extra-b.md` T23) — attractive for editing and water-as-cells, but the construction is unrecovered (T23 UNKNOWN), it is an area-filler by nature, and it would be a third architecture with no parity evidence; its two good ideas (a persistent mesh you can paint attributes on; fillets at junctions) are taken by the DCEL and the way smoother instead. (d) *Partition seeded from a grown skeleton* (the base's choice) versus *grown arterials with partitioned blocks* — these are the same thesis at two granularities; the base does both: the backbone's faces are partitioned (blocks), and the partition's cuts are promoted to ways of the same graph.

## §2 Scope and product shape

### 2.1 STAGE 1 — the base

One library, one document format, three front-ends over it (a one-click web app, a headless CLI for benchmarks and goldens, an embed bundle). Size ladder TOWN / CITY / METROPOLIS requested as population, area or building count (O6). The one-click path: `generate({seed})` → a viewable town in < 1 s on reference hardware, ink style, walls on at TOWN and above, coast/river by the site model's request defaults, curved district labels, scale bar, compass. Every improvement ships behind defaults (`docs/IMPROVEMENTS.md` §4 R8).

### 2.2 STAGE 2 — the district → neighbourhood interface (designed now, built later)

The base must already carry, per district, the **S1 boundary contract** (`docs/IMPROVEMENTS.md` §3.2 S1): a boundary polygon with holes whose edges are typed (shared street with centreline, width, class and the frontage line on both sides; wall with gates; water quay or bank; open field; cliff; sky edge), portals (position, bearing, width, class), the district's context vector, the prosperity field values, and the plot lines and alleys the base has already laid. The neighbourhood generator's contract is therefore:

```ts
interface NeighbourhoodRequest {
  district: DistrictId;                 // stable id; the close-up is a *refinement*, never a re-roll
  boundary: TypedBoundary;              // polygon with holes; each edge carries a BoundaryEdgeKind
  portals: Portal[];                    // every portal MUST be connected; no new street ends on a shared edge
  context: DistrictContext;             // type, venue mix, prosperity samples, terrain samples, water, walls
  laid: { blocks: BlockId[]; plots: PlotId[]; alleys: WayId[] };   // the base's own fabric at city LOD
  subSeed: StreamKey;                   // derived from the district id (§7)
  lod: 'neighbourhood';
}
interface NeighbourhoodResult {         // additive: refines existing entities, adds detail entities
  refined: EntityPatch[];               // building compositions, courts, chimneys, wells, trees, local names
  seams: SeamReport;                    // portal connection 100 %, Hausdorff 0 on shared entities
}
```

Consistent seams follow from construction: the base generates every shared edge once (streets, walls, water are entities of the city graph), the close-up reads them and may only *refine* inside its faces. Shared seeds: the district's `StreamKey` is derived from the district id, so the close-up is byte-stable across sessions and untouched by other districts' edits (§7). One style system: the close-up adds marks at the `neighbourhood` LOD band of the same display list; the city-LOD footprint hash is unchanged (§9). Stage-2 readiness is *measured on the base itself*: 100 % of districts of every B-CITY city carry a complete S1 contract in the schema before any close-up generator exists (`docs/IMPROVEMENTS.md` §5.5).

What the base carries for S2–S6 (interface depth only): a `DistrictContext` rich enough for context templates (S4); per-LOD detail budgets in the style sheet (S5); per-district reroll with locks as an edit event (S6); water/walls/slope as constraints available inside a boundary (S2). The standalone no-portal mode (a lone hood, or a sky island) is the same request with `portals: []` and `context.sky = true`.

### 2.3 Stage 3 and the add-on hooks (carried, not built)

* **Building generator interface** (stage 3): `buildBuilding(plot, accessEdges, contextVector, assignment?, subSeed) → Composition` with LOD outline → wings/roofs → rooms; the base ships a trivial outline builder (one footprint per site-plan slot). `manor.md` §9 supplies the later grammar (a path of wing segments, hip blocks, towers, class picker) — its inputs are exactly the plot polygon, the access edge, the class and a sub-seed, which the base's plot record already carries.
* **Heights** on every building, wing, tower, roof (floors, eave, ridge, tower height) from class tables; a `shadow` layer hook in the display list driven by height and a sun vector (VG/NG/FM all shade; FM's bitmap shadow costs ≈ 90 % of its render — `manor.md` §9 item 7 — so ours is a vector prism as NG does, `profile-neighbourhood.md` §3.7).
* **Layers**: `underground | ground | sky` on every entity and mark, with z-order, elevation and per-layer toggles/exports; drainage queryable from the terrain (sewers); the neighbourhood request accepting an arbitrary boundary with `sky` context; organic oval outlines from the coast routine (islands).
* **Assignment**: an input with precedence and drift bounds at three granularities and a placement-solver interface (§8.4).
* **Evolution**: lifecycle on every entity, an event log, epoch sub-streams, incremental stages, conversions as geometry operations (§5.8, §8.5).

### 2.4 VILLAGE — what the base leaves open, and the not-precluded check

Not designed. Checks (from `docs/IMPROVEMENTS.md` §3.3 V1–V3, verified against this design): the backbone can be a single through-road or dead-end with partial driveways because destinations and stage counts are request data (§5.3); the site-plan class tables include cottage, farmstead and detached-in-yard (§5.6); the size ladder is a data table open below TOWN and the default request at small sizes is not a walled circle (walls are a rule keyed on size class); model time is near-linear in building count (§13); terrain-and-water-as-one-picture is the base's own site model (§5.1); VG's independent tree stream is a keyed sub-stream (§7); a palisade is a wall class with a cheap trace (§5.5). Nothing in the schema assumes walls, districts of more than one block, or a plaza. The village's own ladder, tracker-style organic roads and the VG rendering preset are *not paid for* here.

### 2.5 Tech stack (with reasons)

| choice | decision | why | rejected alternatives |
|---|---|---|---|
| language | **TypeScript** (strict), ES2022 modules, no DOM in `core/` | one language for kernel, generator, renderer and app; browser-first by owner default; the reference evidence is JS-shaped (call censuses) so budgets transfer | Rust→Wasm core (better numerics, but two languages and slower iteration on a design that will be tuned by eye and by corpus; kept as an optional per-module hot path — the kernel API is designed so `predicates`, `offset` and `skeleton` can be swapped for Wasm without changing callers); Haxe (the references' tool, no advantage for us, weaker typing/tooling); C++/Emscripten (no) |
| runtime targets | browser (main thread UI + **Web Worker** generation), Node ≥ 20 (CLI, tests, goldens), embed bundle (iframe or ESM) | headless core reproduces the UI's model hash (O11 f); workers keep the one-click path responsive; Node runs B-CITY | server-side generation like FTG (rejected: the owner wants an embeddable library; FTG's ≈ 3–7 s server round trip is the thing to beat) |
| numerics | integer centimetres (int32) in the model, float64 transient, robust predicates | §4 | — |
| rendering | **Canvas2D** default (every reference's look is provable there), **SVG** exporter from the same display list, **WebGL2** optional back end for instanced hatching/vegetation at METROPOLIS, PNG tiles via OffscreenCanvas | MFCG proves 46 000 fills at 590 uploads is fine when cached per group; NG proves per-primitive canvases are not | WebGPU-only (too new for the embed target); three.js as the primary (FTG's choice; textures and lighting are one *style*, not the architecture) |
| text | HTML canvas text with a halo pass; fonts bundled under OFL (IM Fell family is SIL OFL; Cinzel is OFL) | matches the recorded looks | SDF text (FTG) — later, if WebGL back end needs it |
| build/test | pnpm workspaces monorepo, Vite (app), esbuild (lib), vitest (unit/property), Playwright (visual regression), a `bench/` package that runs B-CITY and writes statistics records | — | — |
| data | JSON documents; optional compact binary twin (CBOR or protobuf-like varint zig-zag ints — FTG's economy, `_critic-ftg.md` F1) | 593 KB for a 2 798-building city with its population is the bar (`docs/IMPROVEMENTS.md` O11 restraint) | — |
| dependencies | permissive licences only (§18); every third-party geometry routine behind our own interface | clean-room + swap-ability | — |

---

## §3 Domain model and schemas

### 3.1 Principles

1. **One spatial truth**: a planar subdivision (half-edge DCEL) in integer centimetres per layer; every linear feature (street, alley, lot line, wall, water outline, map border, field boundary) is a typed edge chain of it; every area (district, block, plot, court, yard, field, water body) is a face or a face union. FTG's payload already works this way for streets, lot outlines, walls, water and the border (`_critic-ftg.md` F9/F10/F15, CONFIDENCE C4) — the base generalises it to *every* feature and keeps faces as first-class records with ids instead of re-walked cycles (O3).
2. **Stable hierarchical ids** minted from the parent id + stage counter, never a list position (O2). Ids survive regeneration and edits; a regenerated entity keeps its id if its *anchor* (frontage edge for a plot, footprint centroid cell for a building, junction pair for a way) is unchanged, else it is superseded with a `supersedes` link (EVO history).
3. **Provenance on every derived value**: which rule table, version and inputs produced it (needed by the corpus phase and by the "one code path, checked two ways" criterion, O18 g).
4. **Lifecycle on every entity**: `generated | edited | pinned | assigned | built | altered | converted | demolished`, plus an epoch stamp.
5. **Layers** on every entity: `underground | ground | sky`, with `z` (order) and `elevation` (m), and per-layer visibility/export.
6. **Metres everywhere**; storage int32 cm; a schema lint refuses a length field without a unit (O6 a).

### 3.2 Entity catalogue (TypeScript shape; the JSON schema is generated from these types)

```ts
type Id<T extends string> = `${T}:${string}`;            // e.g. "plot:s7.d3.b12.p4"
type Cm = number;                                          // integer centimetres
type M = number;                                           // metres (derived views only)
type Layer = 'underground' | 'ground' | 'sky';
type Lifecycle = 'generated'|'edited'|'pinned'|'assigned'|'built'|'altered'|'converted'|'demolished';

interface Provenance { stage: string; rule?: string; tableVersion?: string; inputs?: Record<string, unknown>; streamKey?: string; }
interface EntityBase<T extends string> {
  id: Id<T>; kind: T; layer: Layer; z: number; elevation?: Cm;
  lifecycle: Lifecycle; epoch: number; supersedes?: Id<T>;
  provenance: Provenance; tags?: string[]; name?: string;
}

// --- terrain & water ---------------------------------------------------------
interface Terrain extends EntityBase<'terrain'> {
  originCm: [Cm, Cm]; cellCm: Cm; cols: number; rows: number;       // resolution set in metres, not a fixed 128²
  heightMm: Int32Array;                                              // rows*cols, millimetres above datum
  flowDir: Uint8Array; flowAcc: Float32Array; outfalls: [number, number][];   // drainage, queryable (sewer hook)
  seaLevelMm: number; features: SiteFeature[];                       // hill | spur | valley | terrace | cliff | ravine
}
type WaterKind = 'sea'|'lake'|'river'|'tributary'|'pond'|'moat'|'estuary'|'harbour'|'canal';
interface WaterBody extends EntityBase<'water'> {
  waterKind: WaterKind; face: FaceRef;                    // area as a face union of the ground layer
  course?: WayId;                                          // rivers: the centreline way, with widths per vertex
  flowDir?: 1|-1; bankKinds?: ('beach'|'rock'|'cliff'|'quay'|'marsh')[];
}

// --- planar subdivision ------------------------------------------------------
interface Vertex { x: Cm; y: Cm; }                         // arena-indexed
interface HalfEdge { v: number; twin: number; next: number; prev: number; face: number; chain: Id<'way'|'wall'|'lotline'|'shore'|'border'|'fieldline'>; }
interface Face { id: string; outer: number; holes: number[]; owner?: Id<'district'|'block'|'plot'|'court'|'yard'|'field'|'water'|'green'|'plaza'>; }
type FaceRef = { faces: string[] };                        // face unions keep member faces for EVO splits

// --- ways (streets, alleys, lanes, quays, bridges) ----------------------------
type WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'culdesac'|'track'|'quay'|'bridge'|'ford'|'pier'|'path';
interface Way extends EntityBase<'way'> {
  wayClass: WayClass; edges: number[];                     // ordered half-edges of the centreline chain
  widthCm: Cm[]; surface: 'paved'|'cobble'|'dirt'|'plank'; curvatureLimit: number;
  from?: Id<'gate'|'bridge'|'plaza'|'harbour'|'junction'|'external'>; to?: typeof this.from;
  stage: number;                                           // growth epoch that created it (EVO)
  slope?: number[]; flowToward?: 'from'|'to';              // sewer hook: drainage direction along the way
}

// --- districts, blocks, plots, buildings ------------------------------------
interface District extends EntityBase<'district'> {
  districtType: string; venueMix: Record<string, number>;   // data-table keys, our own vocabulary
  face: FaceRef; contract: S1Contract;                     // stage-2 boundary contract (§2.2)
  character: CharacterVector;                              // wealth, density, age, planned/organic, greenery, fortification
}
interface Block extends EntityBase<'block'> { district: Id<'district'>; face: FaceRef; depthClass: string; }
interface ContextVector {                                  // read by class rules, granularity law, greenery, assignment
  areaM2: number; shape: { obbW: M; obbD: M; compactness: number; reflex: number };
  frontage: { lengthM: M; wayClass: WayClass; wayId: Id<'way'> }[];
  districtType: string; venueMix: Record<string, number>;
  prosperity: number; prosperityBand: string;             // continuous value + banded class (O18)
  distM: { centre: M; plaza: M; market: M; gate: M; wall: M; water: M; harbour?: M };
  upstream: number; slope: number; aspect: number; damp: boolean; floodRisk: number; upwind: boolean;
  assignment?: Id<'assignment'>; terrainCell: number;
}
interface Plot extends EntityBase<'plot'> {
  block: Id<'block'>; face: FaceRef;
  owner?: Id<'household'|'business'|'institution'>; use: string;
  frontageEdges: number[]; accessEdges: number[];         // half-edges on ways (or on a court that has access)
  depthCm: Cm; partyWalls: { edge: number; with: Id<'plot'> }[];
  context: ContextVector; sitePlan: SitePlan;
  buildings: Id<'building'>[]; yard: YardPart[];          // 0..n footprints + typed yard partition
  members?: Id<'plot'>[];                                  // merged plots keep member ids (EVO split restores them)
}
type YardKind = 'yard'|'garden'|'court'|'orchard'|'midden'|'pen'|'vacant'|'formal-garden'|'forecourt';
interface YardPart { kind: YardKind; face: FaceRef; }
interface SitePlan { arrangement: 'row'|'compound'|'detached'|'hovel'|'institution'; coverage: number; slots: BuildingSlot[]; ruleRow: string; }
interface BuildingSlot { role: string; footprintHint: Polygon; entranceEdge: number; }

interface Heights { floors: number; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm; }
interface Building extends EntityBase<'building'> {
  plot: Id<'plot'>; footprint: Polygon; heights: Heights;        // heights: owner ruling — stored even if never drawn
  buildingClass: string; use: string; roof: RoofSpec; entrance: { edge: number; at: Cm };
  composition?: Composition;                                     // stage 3: wings/blocks/roofs/rooms, lazily generated
  compositionSeed: StreamKey; assignment?: Id<'assignment'>; driftBounds?: DriftBounds;
}
interface Composition { lod: ('outline'|'wings'|'rooms')[]; wings: Wing[]; towers: Tower[]; courts: Polygon[]; rooms?: Room[]; }
interface Wing { footprint: Polygon; heights: Heights; roof: RoofSpec; }
interface Tower { centre: [Cm, Cm]; radiusCm: Cm; heights: Heights; roof: RoofSpec; }
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'dome'|'cone'|'skeleton'; ridgeAxis?: number; pitch?: number; material?: string };

// --- fortification -----------------------------------------------------------
interface Wall extends EntityBase<'wall'> { enceinte: number; edges: number[]; thicknessCm: Cm; walkCm: Cm; kind: 'stone'|'palisade'|'earthwork'; setbackCm: Cm; }
interface Gate extends EntityBase<'gate'> { wall: Id<'wall'>; way: Id<'way'>; vertex: number; kind: 'gatehouse'|'postern'|'watergate'; }
interface Tower_ extends EntityBase<'tower'> { wall: Id<'wall'>; vertex: number; radiusCm: Cm; heights: Heights; }
interface Castle extends EntityBase<'castle'> { plot: Id<'plot'>; keep: Id<'building'>; bailey: FaceRef; wall: Id<'wall'>; siteScore: number; }

// --- land use, greenery, furniture -----------------------------------------
type LandUseKind = 'arable'|'strip-field'|'meadow'|'pasture'|'commons'|'orchard'|'garden'|'park'|'coppice'|'wildwood'|'quarry'|'claypit'|'marsh'|'green'|'churchyard'|'plaza'|'market';
interface LandUse extends EntityBase<'landuse'> { landUseKind: LandUseKind; face: FaceRef; owner?: Id<'household'|'institution'|'commons'>; furrowAxis?: number; density?: number; }
interface TreeArea extends EntityBase<'trees'> { face: FaceRef; density: number; ecology: 'wood'|'orchard'|'avenue'|'garden'|'scatter'; }   // instances derived at render from the entity seed, never stored
interface Label extends EntityBase<'label'> { target: Id<any>; text: string; spine?: Polyline; anchor?: [Cm, Cm]; tier: number; pinned?: boolean; hidden?: boolean; }
interface Furniture extends EntityBase<'furniture'> { kind: 'scalebar'|'compass'|'grid'|'title'|'legend'; placement: 'auto'|[number, number]; }

// --- entities (content) -------------------------------------------------------
interface Household extends EntityBase<'household'> { home: Id<'building'>; members: Id<'person'>[]; wealth: number; }
interface Person extends EntityBase<'person'> { household: Id<'household'>; job?: Id<'business'|'institution'>; derivedFrom: StreamKey; pinned: boolean; /* details lazily derived, stored only when pinned/edited */ }
interface Business extends EntityBase<'business'> { plot: Id<'plot'>; trade: string; workers: Id<'person'>[]; }
interface Institution extends EntityBase<'institution'> { plot: Id<'plot'>; institutionKind: string; }
interface Faction extends EntityBase<'faction'> { members: Id<'person'>[]; turf: Id<'district'>[]; }
```

### 3.3 The document (serialisation)

```ts
interface Document {
  schemaVersion: string; generatorVersion: string;
  blueprint: Blueprint;                    // seed, parameter vector, intent, character, circumstances, assignments (§8)
  edits: EditEvent[];                      // ordered, on stable ids (§8)
  entities: Record<string, EntityBase<any>>;   // by id, layer-tagged
  subdivisions: Record<Layer, DcelSnapshot>;   // vertex arena (cm), half-edges, faces
  fields: { prosperity: RasterField; density: RasterField; };       // editable layers
  tables: TableRefs;                       // versions + user overrides of every rule table (§8)
  report: GenerationReport;                // §6
  stats: StatisticsRecord;                 // §14 (per-generation metrics with provenance)
}
```

Formats: **native JSON** (canonical, human-diffable, versioned with migrations); **binary twin** (same schema; varint zig-zag int32 coordinates centred on the settlement centre, as FTG — `_critic-ftg.md` F1 — for the embed and for sharing); exports are views (§12). Migrations are functions `vN → vN+1` over the document; the edit log migrates by id maps; golden documents per schema version are kept.

### 3.4 Alternatives for the spatial truth model (recorded, rejected)

1. *Shared-identity point topology* (2017 MFCG): rejected — aliasing bugs, no tolerance merge, O(n) adjacency (`os-geometry.md` §5).
2. *Polygon soup with per-feature arrays and no shared topology* (VG, NG): rejected — seams, planarity and faces must be re-derived for every edit; FTG's "two intersections at one position" bug class (`_critic-ftg.md` F13 note) is exactly what a soup cannot prevent.
3. *Quad-dominant base mesh with painted attributes* (Urban Places, `watabou-extra-b.md` T23): rejected as truth — area-filling, unrecovered construction — but its "attributes on a persistent mesh" idea is kept as face ownership on the DCEL.
4. *One DCEL for all layers*: rejected — sky and underground geometry must not cut ground faces; one DCEL per layer with cross-layer references (an island's shadow footprint, a sewer's outfall) is cheaper and safer.

## §4 Geometry kernel

### 4.1 Numeric policy (hard-to-reverse decision; alternatives in §19)

* **Coordinates**: int32 centimetres, world bounded to ± 2^25 cm (± 335 km) so any coordinate difference fits 2^26 and every 2-D orientation determinant (products of two differences) fits exactly in a float64 mantissa (2^52) — `orient2d` on cm inputs is therefore *exact in plain float64* with no adaptive branch; `incircle` (needs ≈ 2^104) uses Shewchuk's adaptive predicates (`robust-predicates`, MIT), which are exact for any float64 input. FTG's own wire format is int32 cm zig-zag centred on (0,0) (`_critic-ftg.md` F1) — parity and the owner's precision tiebreaker agree.
* **Transient float64** for offsets, skeletons, smoothing and noise; every result is **snap-rounded** to the cm grid and re-validated (simple, no crossing, min-edge ≥ weld tolerance) before it enters the DCEL. Tolerances are *world-space constants in cm* (weld 5 cm, collinearity 1 cm × length, min edge 20 cm) — never parameter-space (`os-geometry.md` §4 item 6 is the failure).
* **Determinism across platforms**: IEEE-754 `+ − × ÷ sqrt` are correctly rounded everywhere; the model code may use only those plus integer ops. **No `Math.sin/cos/tan/atan2/exp/log/pow`** in model or kernel code (they differ across engines); a `dmath` module provides deterministic polynomial `sin/cos/atan2` (fixed operation order, documented max error 1e-9) and integer-angle rotations where possible (directions are stored as int32 vectors, not angles). No `Math.random`, no `Date`, no `Map` iteration over object identity. A lint rule enforces the import ban; a cross-platform golden test (Node on x86 and arm64, three browsers) is in CI (§14).
* **Precision for buildings**: 1 cm resolution on 10 m buildings is 3 orders of magnitude finer than any rendering; slivers are policed by area/width invariants, not by epsilon comparisons.

### 4.2 Build vs adopt, per primitive

| primitive | decision | candidate library (licence) | how degenerate input is handled |
|---|---|---|---|
| exact predicates (orient2d, incircle, segment intersection) | adopt | `robust-predicates` (MIT) | exact by construction; collinear/cocircular cases return 0 and are broken by a deterministic index tie-break |
| planar subdivision (DCEL), face extraction, point location | **build** (core asset) | — (a `flatbush`-style R-tree, MIT, for the index) | insertion only via `splitOnCross` + `weldWithin(tol)`; degree-0 vertices and dangling chains are typed (a cul-de-sac is legal, a dangling lot line is not) and checked by the invariant suite |
| polygon booleans (and/or/not/xor) | adopt behind our interface | `polygon-clipping` (MIT, Martinez–Rueda) or `clipper2` via Wasm (BSL-1.0) — pick by benchmark in the spike | inputs snapped to cm first; outputs re-snapped; a result with area < min or a sliver below min-width is returned as `degenerate(reason)` never thrown |
| offsetting / insetting (streets from cuts, setbacks, wall bands, water bands) | adopt Clipper2 offset (round/miter/square joins) **and** keep a convex fast path (`shrink` by sequential half-plane clipping — the 2017 idea worth keeping, `os-geometry.md` §5) | clipper2 (BSL-1.0) | reflex corners: Clipper2 joins; self-intersection: cleaned by the boolean; the 2017 `buffer` failure modes are the regression fixtures |
| straight skeleton (roofs, label spines, offset ridges) | **build** (a wavefront implementation with an event queue; MFCG's own is "O(n²) and glitches in special cases", `_critic.md` §4 #20) — with a fallback to `straight-skeleton`-class libraries only if the spike fails | none required; reference `polyskel` ideas are public domain algorithms (Felkel & Obdržálek, Aichholzer et al.) — no code copied | holes supported (label spines must be hole-aware — `watabou-extra-b.md` T6 failure 1); near-parallel edges perturbed by ≤ 1 cm deterministic jitter; a failed skeleton degrades to the OBB-axis "fake gable" (NG's preferred look anyway, T5) |
| OBB / convex hull / largest inscribed rectangle | build (small) | — | hull on ≥ 3 non-collinear points; LIR by rotating-calipers sampling at 4 candidate axes (OBB long axis, frontage normal, ± 45°) — deterministic |
| Delaunay / Voronoi (tree scatter cells, terrain triangulation, district seeding if ever needed) | adopt | `delaunator` (ISC) — the same library MFCG ported (`docs/CONFIDENCE.md` B1 A) | duplicate points welded first; collinear input handled by the library's fallback + our check |
| Poisson-disc / blue noise (trees, scatter, pebbles) | build (Bridson with k = 30 candidates; the references use k = 50 — `_critic.md` C2 — our k is a table value) | — | domain = any polygon with holes via point-in-polygon; seeded per entity |
| noise (terrain fBm, coast detail, prosperity chance) | build (OpenSimplex2-style gradient noise with a deterministic hash; the 2017 Perlin is broken and unused, `os-geometry.md` §5) | — | no transcendental calls; octave count and lacunarity are table values (VG's is a 5-octave fBm, `_critic-vg-ng.md` V7) |
| splines / smoothing (streets, coasts, labels) | build: Chaikin corner-cutting (the references' smoother, `profile-mfcg.md` §6.3), centripetal Catmull-Rom → cubic for label baselines, Visvalingam–Whyatt simplification | — | endpoints pinned; curvature limited per way class; a smoothed way is re-snapped and re-checked for crossings |
| spatial index | adopt | `flatbush` (ISC) for static, a grid hash for dynamic edits | — |
| shortest paths (arterials over the cost surface) | build (binary-heap A*/Dijkstra with a Euclidean heuristic over the terrain lattice + graph) | — | unreachable → typed result `unreachable`, the caller adds a ford/bridge candidate or reports |
| marching squares / distance transform (water extraction, drainage) | build | — | linear-time; the VG hot spot (`createDeflection` 17–87 ms) is avoided by construction (O1 e) |
| earcut triangulation (render, barycentric fields) | adopt | `earcut` (ISC) | holes supported |

Every primitive returns a **typed result** `Ok<T> | Degenerate<reason> | Rejected<reason>`; nothing throws for geometry (O3). Preconditions are declared and checked in debug builds; B-FUZZ (10⁶ random concave/holed/thin/near-collinear/snapped polygons per primitive) is the acceptance gate: 0 crashes, 0 hangs, 0 self-intersecting outputs.

### 4.3 Performance foundation

NG's profile shows `intersectLines` (147 k–213 k calls) and `Point.new` (385 k–561 k) dominate (`profile-neighbourhood.md` §5.3); the kernel therefore stores vertices in typed arrays (struct-of-arrays), never allocates points in hot loops, and exposes allocation-free intersection and orientation routines. This is the first spike (§17).

---

## §5 Generation pipeline

### 5.1 Stage graph

```
                 request (seed, intent, params, assignments, edits)
                          │
   ┌──────────────────────▼──────────────────────┐
   │ P0  Site      terrain → hydrology → water → land components → site features        │  O1
   │ P1  Roster    population → demand by class (dependency tables) → institution list  │  O7 (content-first)
   │ P2  Siting    centre/heart, gates count & bearings, harbour, castle candidates      │  O8, O10
   │ P3  Backbone  staged destination-driven arterial growth (tier 1) on cost surface   │  O4
   │ P4  Districts backbone faces → district lots typed by roster+context → contracts   │  O7, O18
   │ P5  Claims    institutions/assignments claim contiguous plots BEFORE the fabric    │  O18
   │ P6  Walls     enceinte trace on a stage boundary + terrain; gates; towers; castle  │  O8
   │ P7  Infill    bent-cut recursion → blocks; cuts promoted to ways (tier 2)          │  O4
   │ P8  Field     prosperity field (drivers + chance) → bands                          │  O18
   │ P9  Plots     frontage-first strips + granularity law (join/split) + alleys        │  O5, O18
   │ P10 SitePlan  per-plot arrangement → footprints + yards + heights                  │  O17
   │ P11 Fit       roster ↔ capacity reconcile (bounded), households lazily derivable   │  O7
   │ P12 Hinter    land use rings, fields, farmsteads, woods, context margin            │  O14
   │ P13 Green     greenery by prosperity & district type                               │  O19
   │ P14 Names     naming sub-stream → names for districts, ways, gates, landmarks      │  O13
   │ P15 Display   display list (all LODs lazily), labels, furniture, statistics        │  O12, O13, O6
   └─────────────────────────────────────────────┘
```

Each stage is `run(input: StageInput, ctx: StageContext): StageOutput` with typed inputs/outputs, its own `StreamKey` (§7), its own time budget, invariant suite and report entry (§6). Stages P0–P4 can run on a *proxy* (thumbnails, O16); P10–P15 are lazy per district (a district's site plans and labels are derived when first needed and cached by id). The graph is a DAG; `edits` enter as constraints at the stage that owns the edited entity (§8).

### 5.2 P0 Site model (NEW; VG's trick kept)

Heightfield in metres at a resolution chosen from the extent (≈ 5 m cells at TOWN, 10 m at METROPOLIS; VG fixes 128² for every size — its known weakness), from fBm (table: 5 octaves as VG, `_critic-vg-ng.md` V7) plus authored site features from the intent (hill, spur, valley, terrace, cliff, ravine). Rivers: the **course comes first** (a tracker over the requested inflow bearing descending the base field with bounded curvature), then the terrain is *carved* to it (VG's "relief follows rivers" — `_critic-vg-ng.md` V1/V2 measured order); drainage (flow direction by steepest descent with sink filling, accumulation, outfalls) is then computed so every cell has a path to an outfall (sewer hook). Water bodies are extracted by marching squares from a level set of the carved field (VG's pond = a hollow's level set, V8) with a segment index; sea, lake, river, tributary, pond, moat, estuary and harbour are *typed by construction*. Coast, lake shore and island outlines come from one closed-outline routine (a base shape — MFCG's `sea` angle survives as the request's coast bearing — with fBm detail and FTG's "ease into detail" envelope near the centre, `docs/IMPROVEMENTS.md` O1 restraint); the same routine yields sky-island outlines. Land becomes a multi-component polygon set with per-segment bank classes (beach/rock/cliff/quay — FTG's coast craft kept). The river runs through the core by default (MFCG 0.6.0's tuned coincidence): the heart is sited on the bank, not the water pushed to the edge.

### 5.3 P3 Backbone (FTG staged growth, made destination-driven)

Inputs: destinations (gates from the requested count and bearings, bridge/ford candidates from P0, market, harbour, external bearings), a cost surface (slope by class limit, water crossing cost, wall crossing only at gates, existing fabric, land value from P8's first estimate), stage table (as FTG's `stages[]`: proportion of the roster, density regime, `placeWallAfter`).

Algorithm: (1) **tier-1 arterials** are shortest paths on the cost lattice between the centre and each destination, smoothed by Chaikin with a per-class curvature limit and snapped into the DCEL (this replaces both MFCG's BFS-over-cell-edges and FTG's destination-less spokes); (2) **staged growth** of secondary streets from a priority queue of proposals exactly in FTG's shape — `{start, dir, class, priority, remainingSegments, branchCounter}`, lowest priority first, per-proposal legality (not too close, not parallel within a spacing, snap to a junction within a radius, not ending in water, split-on-cross), branch after N segments, `curve-around-origin` and `continue` branch types (`ftg-docs-params.md` §2.2–2.4) — but with jitter drawn as a *curvature* term with continuity rather than a per-vertex ± 15° clamp (the payload shows zero mass at 15–16°, `_critic-ftg.md` §4 row 7 — a cliff we remove), and with an **area budget** per stage derived from the roster's demand (O3 "feasibility by construction"); (3) between stages, prune unconnected normal roads and trim mains to the perimeter (FTG, stated); (4) junction rules: minimum crossing angle, merge junctions closer than a spacing threshold, T-preference in organic districts, rare crossroads only where a tier-1 way meets another. Segment lengths are real metres from tables (FTG persisted 15/30 m; `_critic-ftg.md` F3 settled: the form's metres are real, district streets laid as (L + 0.5)/2 segments).

Why this fusion is safe for the EVO hook: a later epoch is *another stage* — new destinations (a new gate, a bridge), a new area budget, the old wall converted to a way — run on the existing graph.

### 5.4 P4–P6 Districts, claims, fortification

* **Districts**: the bounded faces of the tier-1 graph after stage k are district lots; each is typed by a score over (remaining roster demand by class, neighbours' types, context: water for docks, gate for gate wards, centre for market/administration, high ground and upwind for wealth, downstream for tanners) — FTG's "remaining unplaced buildings and what the lot is next to" (stated) made explicit as a data table; lots below `minDistrictArea` merge into a neighbour (FTG's floor, `_critic-ftg.md` F6). MFCG's rule "one prominent feature per named type" survives as the district's naming feature.
* **Claims (P5)**: institutions (temple, castle, market, cathedral close, monastery, the assigned buildings) claim contiguous plots of their required area and frontage class before any block is cut (FTG's landmark-first V2 insight generalised, O18); a whole block is taken only above a threshold share.
* **Fortification (P6)**: the enceinte trace is the outer boundary of the stage-k built faces (FTG's `placeWallAfter`), pulled onto defensible ground (crest lines, banks, ditch lines from P0) by a cost-weighted smoothing with a minimum segment length and interior-angle rule (no sawtooth, `docs/IMPROVEMENTS.md` O8), snapped into the DCEL as a wall chain with a metric setback band (MFCG's rule kept). Gates are placed exactly where tier-1 ways cross; the requested gate count is honoured (zero gates = a declared postern/watergate); towers by spacing rule (table: era × wealth; FTG's 39 m median and MFCG's tower-per-vertex are the two reference points); the castle is sited by a defensibility score (height, water, gate control, distance to centre) on a claimed plot with keep (LIR-based footprint, the MFCG stated method, CONFIDENCE B15) and bailey; several enceintes (citadel, inner, outer, suburb, bailey) are stage rows in the table; MFCG's gate plazas are a rule (a small plaza face carved at each gate inside the wall).

### 5.5 P7 Infill — the bent cut, specified as our own construction

The recorded NG construction (`docs/CONFIDENCE.md` §3.3 B3: OBB minor axis, perpendicular departure, one corner at mid-course, perpendicular arrival, reproducing 80 % of plain-bisector ends) and the creator's statement (`watabou-extra-a.md` §2.1) fix the *shape*; the constants are ours (C13 is OPEN on every constant — we set them and calibrate on B-REF):

```
bentCut(face F, ctx):
  A ← OBB(F); if A.long/A.short < ρ_min (table, ~1.3) choose the frontage-perpendicular axis instead
  e1, e2 ← the two boundary edges hit by the OBB minor axis through a start point s ∈ [0.35, 0.65]·A.long (sub-stream draw)
  p1 ← foot of the perpendicular from the axis to e1; p2 ← likewise to e2      (departure/arrival ⟂ their edges)
  bend b ← at t ∈ [0.4, 0.6] along p1→p2, offset laterally by δ ≤ 0.15·|p1p2| (draw); ≤ 1 bend by default, 2 if |p1p2| > L_2
  corridor width w ← by resulting way class (tier-2 street / lane / alley), table in metres, jitter ± 10 %
  cut F by the polyline; subtract the corridor (ExPolygon-style, as NG's BisectorEx does — `_critic-vg-ng.md` V19)
  reject if either half has area < A_min(class) or min interior angle < 30° or width < w_min → try next candidate (≤ 3), then straight cut on the mean normal, then axis cut, then landmark/green/court substitution (NG's own rule), then documented omission — never a restart
  recurse until area ≤ target(class, prosperity band) (the stop law is a table, calibrated to NG's block-size band at medium)
```

Cuts are promoted to **ways** of the DCEL with class and width; a cut may continue across an existing tier-2 way when collinear within 8° (rare crossroads, kept < 15 %); junction fillets are a style-time smoothing (Urban Places' arcs, `watabou-extra-b.md` T25 e) not a model change. Alleys are typed ways inserted by the granularity law (P9), unstroked at city zoom inside the walls (MFCG's look) and stroked at neighbourhood zoom.

### 5.6 P8–P10 Prosperity, plots, site plans (the plot model)

* **P8 prosperity field**: raster + per-plot value = Σ table-weighted drivers (distance decay to centre/market/main streets/gates/water/harbour; height and upwind up; low, damp, downwind, flood-prone down; negative kernels around tanneries, slaughterhouses, walls, prisons; attractors at institutions) + district character offset + a controlled random component from its own sub-stream, Gaussian-smoothed so neighbours vary gradually; banded only where a table needs a class; stored as an editable layer (O18).
* **P9 plots (frontage-first)**: for each block face, frontages are the boundary edges on ways, ordered by way class; plots are laid as strips perpendicular to the frontage with target frontage width and depth from the granularity table keyed by the context vector (prosperity, district type, density, way class, distances); corners solved explicitly (the corner plot takes the higher-class frontage; the other strip is clipped), reflex vertices get a wedge class bounded in share (< 0.5 %); back-to-back strips leave a rear residue typed court/yard/back lane; a residue narrower than the plot minimum becomes an alley if it connects two ways, else is absorbed. **Join/split** are one law: strips are cut down to the band's lower end, then a merge operator joins k adjacent plots (along a frontage or back to back keeping a frontage) up to the band's upper end; institutions and assignments joined in P5; merged plots keep member ids. Party-wall flags are set by the separation rule (party wall / slot / passage) per class.
* **P10 site plans**: one rule evaluation per plot (no search) from a table keyed by class × prosperity band × density: arrangement (row / set-back compound / detached-in-yard / hovel / institution), coverage ratio, slot list with roles (house, hall, stables, workshop, chapel, barn, kitchen, brewhouse), front-line jitter (MFCG `Offset` and NG's uneven streetwall as a parameter), entrance on the access edge; footprints from the slots via the building-generator interface (trivial builder: an inset rectangle or L on the slot's hint, aligned to the frontage; stage 3 replaces it); heights from class tables; yards partitioned into typed parts. Rendering draws footprints and yards; the plot outline is an optional cadastral layer.

### 5.7 P11–P14 Content fit, hinterland, greenery, names

* **P11**: demand (P1) vs capacity (plots with context) solved by a greedy assignment with rule scores (noxious trades downstream/extramural, mills on water, markets at tier-1 junctions or gates, wealth near the centre or on high ground, religious precincts, faction turf), then feedback (more housing where land allows, fewer mills without water) in ≤ k iterations (k declared, default 3); population honoured within tolerance and reported; households and people are *derivable* from the building id sub-seed and stored only when pinned or edited (O7). Both entry points exist: content-first (default) and layout-first (thumbnails then populate).
* **P12 hinterland**: arable per capita from tables by era/region with provenance; rings (gardens/closes/orchards → fields → meadow/pasture/commons → coppice → wild wood); field systems as presets (open-field strips, enclosed fields, VG's Voronoi "sector" look kept as a preset — `_critic.md` C9 records the construction: Voronoi of ring seeds ∩ land, OBB bisection, arcs); farmsteads beside their fields with tracks (VG's lonely houses on purpose); every land component used (both banks, islands); a **context margin** beyond the frame so roads leave to named destinations and rivers enter and exit.
* **P13 greenery**: yard planting by plot class; parks/formal gardens/avenues in the top band and by institutions; a green or orchard at the edge of modest quarters; churchyards, market greens; all typed, owned entities; tree instances derived at render (seeded blue noise with spacing rules) and never stored.
* **P14 names**: an original grammar (Tracery-class engine of our own, syllable elision, feature-conditioned guards — MFCG's method, `profile-mfcg.md` §9, our content) from the naming sub-stream; ways named from destinations/trades/institutions/owners; gates from their road; folk-contraction as an EVO event (FTG's idea).

### 5.8 Incremental operation (EVO hook, designed now)

Every stage accepts an existing document and a scope: `grow(doc, epochInputs)` re-enters P3 with new destinations and budgets on the existing graph; `convert(doc, op)` performs first-class geometry operations — wall → way (the wall chain becomes a `through`/`primary` way keeping its vertices, gates become junctions, the setback band becomes plots by P9), outskirt → district (faces re-typed and re-cut), gate → junction/square — each recorded as an `EditEvent` with `supersedes` links; nothing that survives an epoch is re-rolled because every derived value is keyed by (entity id, epoch) (§7). Circumstances (population, wealth, threat, trade, terrain events) are time-varying inputs of the blueprint; the prosperity field is re-solved with the previous field as its prior.

## §6 Failure handling — no whole-map discard-and-retry

MFCG restarts the whole city on a canal failure or a 'bad poly' (24 restarts in 58 recorded attempts; ST-8), VG discards whole villages and swaps the seed (4 of 13 highway maps), FTG's V1 "would regularly give up" and its 2026 splitter has no fallback (`_critic-ftg.md` F17; `docs/IMPROVEMENTS.md` O3). The base's policy has four tiers and none of them is a restart:

| tier | mechanism | where | detected by | tested by |
|---|---|---|---|---|
| 0 feasibility by construction | terrain-first water (rivers cannot bend back), area budgets derived from the roster before cutting, claims before fabric, destinations known before growth | P0, P3, P5 | — (design) | B-CITY: restarts = 0, requested features present 100 % |
| 1 typed results + candidate retry | every primitive returns `Ok | Degenerate | Rejected`; a stochastic step retries with the next sub-seed `(seed, stage, entity, attempt)` up to a cap (default 3) | kernel, P3, P7, P9, P10 | result types; attempt counter | B-FUZZ per primitive; per-stage retry rate ≤ 2 %, p99 ≤ 3 attempts |
| 2 fallback ladder | a simpler primitive: bent cut → straight cut on the mean normal → axis cut → substitution (landmark / green / court, NG's rule) → documented omission; growth: shorten segment → change branch type → drop proposal; plots: narrower band → single plot → yard; roofs: skeleton → fake gable → flat | each stage declares its ladder in data | ladder step recorded with a cause code | fallback uses per 1 000 cities reported; ladder coverage test (every step reachable by a fixture) |
| 3 post-stage invariants + local repair | invariant suite runs after each stage; violations trigger *local* repair (weld, re-cut one face, re-site one building, re-route one way) inside a declared scope; unrepairable → omission + report | all | invariant checks (below) | hard-invariant violations per 1 000 cities = 0 |

**Invariant suite** (each a pure function `doc → Violation[]`, run in CI on B-CITY and in the app on every generation): planar subdivision valid (Euler, no crossing, no zero-length edge below weld); every face simple; every polygon simple; minimum width/area per class; every plot has an access edge; every building has an entrance on its access edge; no road centreline crosses a building; no footprint overlap; building ∩ water = ∅; every gate joins the network and the centre; walls not crossed by streets except at gates; exclusive land uses do not overlap; bridges within ± 10° of the channel normal; no branch re-joins its parent within k segments; a sealed enclosure only when declared; every requested feature present; containment complete (building ⊂ plot ⊂ block ⊂ district, 100 %); id uniqueness and reference integrity; every length field carries a unit.

**Failure classes and how each is detected and tested:**

| class | reference precedent | detection | test |
|---|---|---|---|
| geometric degeneracy (sliver, hourglass, self-intersection) | FTG hourglasses, MFCG triangles, NG 42 % discards | typed results + invariants (min angle/width/area) | B-FUZZ; B-CITY counts = 0 |
| topological corruption (duplicate junctions, dangling chains) | FTG "two intersections at one position" | DCEL insertion contract; Euler check | B-EDIT 10⁵ sequences → 0 planarity violations |
| hydrological impossibility (river uphill, no outfall) | FTG "bends back", MFCG canal restarts | drainage invariant | 100 seeds × 10 configurations, 10/10 present |
| infeasible allocation (roster > capacity) | FTG "gives up", MFCG empty areas | bounded reconcile loop, report | convergence ≤ k on 100 % of seeds |
| unreachable destination (gate behind water) | MFCG 28 street failures in 13/34 cities | A* typed `unreachable` → add ford/bridge candidate → else report | requested-vs-built diff shown whenever non-empty |
| time budget overrun | MFCG 7-attempt runs; "browser not responding" | per-stage hard budget → degrade (fewer candidates, coarser terrain) → report | p95/p99 per size class in CI |
| user edit conflict (a pinned way through a pinned building) | FTG "generator doesn't know which ones you edited" | constraint solver reports the conflict as an action | B-EDIT conflict fixtures |

**Generation report** (the same object O16 surfaces): stages and timings, attempts, ladder uses with cause codes, invariant results, requested-vs-built diff, auto-resolved parameters with reasons, sub-seeds used. Every attempt is replayable from its printed key (MFCG's replayable attempts, kept).

---

## §7 Determinism

### 7.1 RNG design (hard-to-reverse; alternatives in §19)

* Engine: **xoshiro128\*\*** (32-bit state × 4; fast in JS without BigInt), seeded by **splitmix32** from a 32-bit **key hash** (MurmurHash3-x86-32 over a canonical byte encoding of the key tuple). The town is a pure function of `(generatorVersion, seed, params, assignments, edits)`.
* **Keyed sub-streams**: `StreamKey = hash(seed, stage, entityId, concern, attempt, epoch)`. Every draw comes from a sub-stream; no stage or entity shares a stream with another; naming, style jitter, content, decoration and geometry are separate `concern`s. Adding a feature (a new concern) therefore changes nothing else; growing a settlement (a new epoch) re-derives nothing that survived; re-rolling one block uses `(block id, attempt+1)` and touches nothing outside it. This is the reference weakness O2 answers (MFCG: one `gates` change re-rolls everything down to the name; NG/VG: one global stream; FTG: `seed: null`).
* **Render-time decoration** (tree instances, pebbles, hatch jitter, roof detail) is seeded by `(entityId, 'decor', lodBand)` and never stored — FTG's area-fill economy with determinism restored.
* **Retries** use `(…, attempt)`; the report prints the key so any attempt is replayable.
* Helpers: `float()`, `int(a,b)`, `bool(p)`, `normal()` (Irwin–Hall 6 — NG's roof jitter is a 6-uniform pseudo-normal, `profile-neighbourhood.md` §3.6), `fuzzy(f)` (the 2017 dial worth keeping), `weighted(table)`, `deck(table)` (draw without replacement — MFCG's `DeckRuleSelector` idea, `profile-mfcg.md` §9).

### 7.2 Permalinks, version axes, reproducibility

* Permalink = `?v=<generatorVersion>&s=<seed>&p=<compact intent/params>` for an unedited town (the one-line permalink all three watabou generators have, kept); an edited town is a document (O9).
* Version axes: `schemaVersion` (document), `generatorVersion` (algorithms + tables), `tableVersions` (each rule table separately; user overrides carry their base version), `styleVersion`. A permalink replays under its recorded `generatorVersion` (pinned builds are kept for the last N releases in the app; the CLI can run any tagged version); an explicit opt-in upgrade replays under the new version and shows a diff (O9 extras).
* Golden seeds per release: the model hash and statistics record for a fixed seed set are committed; a stage untouched by a release stays byte-identical; a legitimate behaviour shift is recorded with its cause (owner non-negotiable 10).
* Cross-platform: §4.1's numeric policy; the CI golden test runs Node x86-64 + arm64 and Chromium/Firefox/WebKit and asserts identical model hashes (O2 a).

---

## §8 Editing and regeneration locality — everything is editable

### 8.1 The edit log

An **`EditEvent`** is the only way state changes after generation; the app's tools, the API, assignments and the evolution engine all emit events:

```ts
type EditEvent =
  | { op: 'lock';       target: Id<any>[]; }                                   // pin: never mutated by regeneration
  | { op: 'unlock';     target: Id<any>[]; }
  | { op: 'moveVertex'; layer: Layer; vertex: number; to: [Cm, Cm]; }        // warp/move (MFCG tools are brushes emitting these)
  | { op: 'warp';       layer: Layer; brush: 'rotate'|'equalize'|'bloat'|'pinch'|'smooth'|'shift'|'random'; centre: [Cm,Cm]; radiusCm: Cm; strength: number; } // expands to moveVertex events at apply time (creator's stated semantics: Equalize = angles, Bloat = larger cells, `_critic.md` C4/C5)
  | { op: 'drawWay';    layer: Layer; polyline: [Cm, Cm][]; wayClass: WayClass; widthCm: Cm; }     // user roads as constraints (split-on-cross, weld)
  | { op: 'drawWater';  polygon: Polygon; waterKind: WaterKind; }
  | { op: 'drawWall';   polyline: [Cm, Cm][]; kind: Wall['kind']; }
  | { op: 'setField';   field: 'prosperity'|'density'; brush: RasterBrush; }                     // the prosperity field is editable
  | { op: 'setAttr';    target: Id<any>; path: string; value: unknown; }                          // rename, recolour, use, storeys …
  | { op: 'regenerate'; scope: Id<'district'|'block'|'plot'>[] | Polygon; keep: 'settings'|'adjust'|'newSeed'; attempt?: number; }
  | { op: 'assign';     assignment: Assignment; }                                                  // §8.4
  | { op: 'convert';    conversion: 'wallToWay'|'gateToJunction'|'outskirtToDistrict'|'demolish'|'build'; target: Id<any>; params?: unknown; }  // EVO
  | { op: 'setTable';   table: string; patch: JsonPatch; }                                        // rule tables and presets are editable (preference layer)
  | { op: 'setStyle';   patch: JsonPatch; };
```

Lifecycle of an edit: **create** (a tool or API call emits it; it is validated against the schema and the invariant suite in a dry run; conflicts are returned as actions, never silently resolved) → **read** (the document is `replay(blueprint, edits)`; a materialised snapshot is cached and rebuilt lazily) → **persist** (edits are stored in order with the `generatorVersion` and table versions they were made under) → **regenerate** (a `regenerate` event runs the owning stages inside the scope only; locked and edited entities are constraints; the same sub-seeds are used unless `newSeed`; people are reconciled, not deleted) → **undo/redo** (the log is the undo stack; every op has an inverse or is replayed from the previous snapshot) → **migrate** (a version migration maps ids and table keys; an edit that no longer applies is kept as `orphaned` and reported, never dropped silently).

### 8.2 Locality guarantees

Regeneration locality rests on three things: keyed sub-streams (§7), stable ids (§3) and stage scoping. Rerolling district D re-runs P7–P14 for D's faces with D's keys; entities outside D are byte-identical (O2 c/d: ≥ 95 % locality on parameter edits, 100 % of ids outside the scope preserved). Faithful regeneration: the scoped run uses the same tables and keys as the original, so a regenerated area is statistically indistinguishable (two-sample KS on density, frontage width, footprint area, p > 0.05 on ≥ 95 %; FTG's "too snug" is the failure, O9 c). "Regenerate (keep settings)", "Adjust" (re-solve with the change), "New random" and "Same kind, new seed" are separate actions (O16).

### 8.3 User-drawn constraints and warp

Drawn ways/water/walls enter the DCEL by the same `splitOnCross + weld` contract as generated ones (FTG's snap-and-split invariant, `docs/CONFIDENCE.md` E1) and are locked by default; the generator solves around them. Warp brushes (MFCG's 8 tools, stated semantics) are vertex-space operations on the DCEL that keep topology (MFCG: warping "can't change the topology" — kept) and are followed by the invariant suite with local repair; a warp that would break an invariant is clamped and reported.

### 8.4 Semantic assignments (ASSIGN hook, designed now)

```ts
interface Assignment {
  id: Id<'assignment'>; granularity: 'building'|'neighbourhood'|'dispersed';
  name?: string; function?: string; shapeClass?: string;          // any subset
  drift: DriftBounds;                                               // e.g. area ± 20 %, storeys ± 1, class within a family
  target?: Id<'building'|'district'>;                               // single or whole-neighbourhood
  dispersed?: { count: number; kind: string; criteria: PlacementCriteria };   // N buildings under criteria
  precedence: 'overClassRules';
}
interface PlacementCriteria { minSpacingM?: M; districts?: Id<'district'>[]; nearM?: { to: 'water'|'gate'|'market'|'centre'|Id<any>; maxM: M }[]; prosperityBand?: string[]; frontageClass?: WayClass[]; }
interface PlacementSolver { solve(doc, a: Assignment): Ok<Id<'plot'>[]> | Rejected<{ reason: string; nearest: number }>; }
```

A whole-neighbourhood assignment sets the district's character and venue mix while individual buildings stay diversified by the class rules within the drift bounds; a dispersed assignment is a constraint-satisfaction pick over candidate plots (greedy with a spacing penalty, deterministic under its sub-stream) that reports infeasibility with the nearest achievable count. Assignments are events (persist, undo, migrate) and take precedence over class rules (O10 e).

### 8.5 Rule tables and presets as editable data

Every table (size ladder, way widths, plot bands, coverage and arrangement, wall spacing, greenery, naming, style sheets, dependency graph) is a versioned JSON file with provenance per value; a user **preference layer** (`setTable` events) sits above the defaults and migrates with them; the default path with no edits is byte-identical to the shipped defaults (O10 h).

## §9 Rendering and the style system (the first contract)

### 9.1 The display list (hard-to-reverse; alternatives in §19)

A **renderer-independent, layered list of marks** generated from the model per LOD band, cached by entity id, consumed by every back end:

```ts
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow';
interface Mark {
  entity: Id<any>; layer: Layer; z: number;           // z within layer; layer order underground < ground < sky
  semantic: string;                                  // 'water.sea' | 'way.primary' | 'building.roof.lit' | 'wall.curtain' | 'field.furrows' | 'label.district' …
  kind: MarkKind; lod: LodBand[];                    // bands in which the mark exists (geometry never changes with zoom)
  geometry: Geometry;                                // polygon(s) with holes | polyline + widths | point set + params | text spine
  attrs: Record<string, number|string>;              // height, prosperity, class, orientation, seed — inputs to paint programs
}
interface DisplayList { bands: Record<LodBand, Mark[]>; index: SpatialIndex; heights: Map<Id<any>, Heights>; sun?: [number, number, number]; }
```

A **style sheet** maps `semantic` (with attribute predicates and LOD band) to a **paint program** — a small vocabulary of operations derived from the minimum renderer feature list of `visual-spec.md` §6: `fill`, `stroke(width in paper units or world units, join, cap)`, `casing(w, h)` (stroke twice: ink at `w + 2h` then body at `w` — MFCG's single most reusable trick, `visual-spec.md` §0.2), `bands(N, W, exponent 1.5, ramp)` (VG's `W·(i/N)^1.5` water law, §2.3), `shadowPass(colour, alpha, offsetFn | prismFromHeight(sun))` (one flat pass under everything — VG/NG; NG's prism = one quad per silhouette edge, `profile-neighbourhood.md` §3.7), `hatch(angle | ridge, pitch, taper)` (MFCG furrows as hairlines; NG tapered triangles from the ridge — 80 % of NG's ops, budgeted), `roof(kind, lit/dark = c × lerp(ambience, shadow, α))` (NG's measured law, §3.6), `crown(lobes, jitter)`, `halo(text, paper, px)`, `glyphAlongSpine`, `texture(tile, tint)` + `light(dir)` (FTG's look), `vignette`, `contourMarks(levels, mark)` (VG's iso-walker, `profile-village.md` §6). Paper-unit widths (px at 1×) are the rule for hairlines and casings; world-unit widths for ribbons — exactly MFCG's two coordinate spaces (§0.2). Colours are named roles (`paper, ink, water, building, green, medium, shadow, ambience, road, sand, plank, roofLight[], fieldLight[], tree[], lights`) so a style file is a palette + program table; the three reference schemas (MFCG 13 keys, NG 26 keys, VG 40 keys — `profile-village.md` §7.1) map onto it without loss.

**Layer order is data**, not code: the style sheet lists the semantic order (bottom → top) per band; MFCG's recorded order (water → roads casing → roads body → river → landmarks → wards → piers → fields → walls → towers → grid → scale bar → compass → labels → title, `profile-mfcg.md` §10.5) and NG's (greens → roads → shadows → buildings → props → trees depth-sorted → title, `profile-neighbourhood.md` §4.3) are the two shipped orderings. Strict two-pass separation (every casing before any body) is a program property so junctions stay clean.

**Level of detail**: `city` (water, walls, towers, gates, tier-1/2 ways, blocks as footprint masses, landmarks, district labels), `district` (plots' footprints, yards, alleys unstroked → stroked, way names), `neighbourhood` (NG-class: hatched two-tone roofs, prism shadows, cobbles, chimneys, wells, lobed depth-sorted trees, street names), `building` (stage 3: wings, roofs, rooms). Footprint geometry is identical in every band (O12 a; owner ruling); only which marks are emitted and which programs run change; minimum symbol sizes and label floors per band; per-band detail budgets by hardware tier (FTG's tiers, made cheap).

**Layers with toggles and shadows**: `underground` marks (sewers) render through the ground with a program (`cutaway` dashes or a translucent overlay); `sky` marks (islands) render above with a `shadowPass(prismFromHeight)` cast onto the ground layer from the sun vector; per-layer toggles and per-layer export are display-list filters.

### 9.2 Backends

* **Canvas2D** (default; every recorded look is provable there): a retained scene of **tiles per district** (MFCG's per-ward cache: 46 000 fills → 590 uploads is the proof that caching per group wins, `visual-spec.md` §1.1, §6 item 20), re-rasterised only when a district's marks change; instanced batches for hatching and vegetation (typed-array paths, one `Path2D` per program per tile); OffscreenCanvas in a worker for tiles; pan/zoom by transform with re-rasterise thresholds.
* **SVG**: the same display list → grouped `<g>` per layer and semantic with entity ids preserved (layered semantic SVG, O11), hatching emitted as paths, text as text (with halo via paint-order), instances as `<use>`.
* **PNG / print**: tiled rendering at any resolution through the Canvas2D back end (300 dpi A2 without the 8 MP ceiling, O12 e).
* **WebGL2** (optional, METROPOLIS): instanced triangles for hatch and crowns, SDF text later; same display list; pixel-difference test against Canvas2D below threshold (O12 c).

### 9.3 Style presets that reproduce each reference's look (as style files, our own values)

| preset | what it must reproduce (evidence) | programs |
|---|---|---|
| **ink** (default; MFCG family) | four inks on buff paper, hairline `h = 0.5 px`, `w + 2h` casing on roads/river/piers/bridges, round joins/caps (4062/4063), ink drop shadow under buildings offset ≈ (+0.25, +0.7) u, solid-ink landmarks, wall 1.9 u with round towers and gate bars, hairline furrows with no field outline, grid at ≈ 112–120 px pitch over the map, scale bar with old-style figures, 8-ray compass, per-glyph curved caps labels with a paper halo (`visual-spec.md` §1) | fill, casing, shadowPass(offset), hatch(hairline), halo, glyphAlongSpine, furniture |
| **shaded** (VG/NG family; stage-2 close-up) | one flat shadow pass, two-tone roofs (dark = lit × lerp(ambience, shadow, 0.4)), tapered-triangle hatching from the ridge, `(i/N)^1.5` water bands, contour marks along iso-levels in two slope-chosen colours, lobed crowns with gradients (VG) or two flat greens (NG), selective outlining `lerp(fill, ink, factor × pressure)` (`visual-spec.md` §2–3; `profile-neighbourhood.md` §3.6–3.7; `profile-village.md` §6–7; `_critic-vg-ng.md` V13/V14) | shadowPass(prism), roof, hatch(taper), bands, contourMarks, crown, outlineMix |
| **lit** (FTG-like) | tiled land-use textures with tint, directional light on extruded roofs with soft drop shadows, hedgerow tree rows along field boundaries, filled street corridors, stone-textured wall band with round tower nodes, harbour polygon with pontoon bars, foam line, SDF-like serif labels with halo and drop shadow (`visual-spec.md` §4) | texture+light, shadowPass(soft), instances(hedgerow), fill(corridor), halo |
| parchment, night, print-mono | additional data files; night = `lights` role + glow instances (VG's soft lights, kept) | — |

Style constraints: every random style must pass minimum luminance contrast between ground/road/building/water (O12 f); an option-interaction matrix test forbids silent couplings (MFCG's Block mode dropping trees, O12 c); the renderer survives a style with no fills or no outlines (R13).

### 9.4 Shadows, relief, greenery at render

Shadows are a layer program driven by stored heights and a sun vector (off by default in `ink`; subtle in `shaded`); relief tiers (hillshade from the terrain normals + stack blur, VG R4; contour marks; hachures) are optional and off by default (O1 restraint); tree instances are derived per `TreeArea` from its seed with LOD (area fill at city → crowns at district → lobed trees at neighbourhood), instanced and never stored (O19).

### 9.5 Print/VTT export resolution

Export declares a grid scale (m or ft per cell; FTG's 2 m / 5 ft grid, `ftg-posts-c.md` §2.19) and a dpi; the tile renderer produces exact-pixel-per-cell output (grid alignment error 0 px per cell, O11 g); a 100 m scale bar is accurate to 0.5 % at every zoom (O6 c).

---

## §10 Labels and map furniture (the second contract)

* **District/area labels**: hole-aware straight-skeleton spine (the skeleton of the district's face *with its holes* — the reference's stated method minus its stated failure, `mfcg-devlogs-b.md` §2.5, `watabou-extra-b.md` T6) → Visvalingam simplification → centripetal Catmull-Rom → per-glyph placement along the curve with letter-spacing (MFCG's `Letter` per character, `profile-mfcg.md` §8) → size ∝ clearance and area with a curvature limit → collision resolution by a priority queue (importance, area) with candidate spines (longest, highest-clearance, straight OBB axis as MFCG's older method and the `Straight` option) → **protected features** (gates, keep, bridges, landmarks, walls) never covered (MFCG's measured defect, `docs/IMPROVEMENTS.md` O13) → halo in paper colour.
* **Street names** (new to all four): path labels along way centrelines at district/neighbourhood LOD, repeated per segment above a length threshold, collision-checked against area labels; addresses (monotone numbering along each way, VG's numbering idea as a layer).
* **Per-zoom label sets**: city (districts, water, major landmarks, gates), district (streets, squares), neighbourhood (every named way; buildings on demand); density bands per LOD; labels are a toggleable layer thinned by LOD; user pin/move/hide as edit events (persisted, O13 e).
* **Furniture**: scale bar (major/minor ticks, m ↔ km ↔ ft, MFCG's old-style figures as a font feature), compass (procedural 8-ray rose with ink/paper halves and a per-document reroll, MFCG `Compass.reroll`), grid (world-pitched, drawn over the map under furniture, fading below the legibility zoom — FTG's "too thin" defect avoided), title (placed in the emptiest corner — VG/NG's rule, R16), legend (generated from the style registry; annotation layer with numbered markers and a separate legend sheet — VG's L1 idea), north arrow.
* **Names**: an original grammar (feature-conditioned; whimsical set flagged; spell-checked word lists in CI; contraction as an EVO event) from the naming sub-stream so names never move geometry (O13).

## §11 Simulation and content layer (FTG parity, with restraint)

**Depth justification.** FTG's "every building has a purpose and people" is the part of FTG users praise most ("if I see it, I can go there", `docs/IMPROVEMENTS.md` §4 R7) and its roster-first order is what makes district typing meaningful; the map must therefore carry a roster and a per-plot context vector in the base. Beyond that, FTG's hourly schedules, calendar and external time sync are cheap and mechanical (`docs/CONFIDENCE.md` F1/F2: schedule = deterministic query per hour; calendar configurable), while relations, events, factions with goals and the person description templates are content-heavy (FTG's 209 building types, 80 nodes, 299 professions, 323 items — all to be re-authored under clean-room) and do not change the picture. Decision (J-S adopted, recorded in §20): the base ships the **roster + households + lazily derived people + professions + schedules + calendar/clock + factions/religions as data** as a module; **events, relation graphs, dialogue-grade descriptions** are should-have follow-ons behind the same ids.

Module design (`sim/`, optional, replaceable):

* **Population from size**: the request's population (or derived from area/buildings by class tables) → households by wealth band from the prosperity field (O18) → people lazily from `(household id, 'people')` sub-streams, stored only when pinned or edited (FTG's own lazy person details, made deterministic).
* **Buildings from a resource/dependency graph** (our own tables, FTG's *ideas* — `ftg-docs-params.md` §3.3 read for the mechanism): nodes are resources/services with `onePerNPeople` or `perOtherNodes` ratios, converted to per-person ratios; a **virtual-population loop** decides the order in which workplaces are added; core vs shop pools with a shop probability; lifestyle-banded pools with rare outliers (weights are ours); hard min/max per class; size gates (`firstAtPopulation`); resource availability gates (no farmland → no farms, shops instead — FTG's rule). Output: the roster P1 hands to layout; P11 reconciles.
* **Professions and households**: profession tables keyed by building class with household templates (family-unit model — FTG's T-01 idea for economy of relations); ages, genders, races as data dictionaries (append-only, id-referenced so renaming never re-colours — FTG DAT-3's failure avoided).
* **Schedules/time**: a profession → weekly schedule table (hour quantum, rest days); `whereIs(person, t)` is a pure function of the schedule and the building's sub-locations (rooms exist because the plot model gives every building slots and stage 3 gives rooms); a calendar (hours/day, days/week, rest days, weekday names) with an external time sync API (§12).
* **Factions/religions**: data tables with turf as district ids; leaders as pinned people.
* **Name generation**: the same original grammar engine as §10 with people-name corpora of our own authoring (Markov over our own syllable lists).

Everything is data-driven and replaceable: the module's only contract with the map is `Roster` in and `Assignment` results out; a host may supply its own roster (host-input phase).

---

## §12 Export and interop (the fourth contract)

| target | content | notes / parity |
|---|---|---|
| **native JSON** (canonical) | the full `Document` (§3.3) — blueprint, edits, entities, subdivisions, fields, tables, report, stats | round-trip `export → import → export` byte-identical (O11 c); versioned with migrations; MFCG cannot re-import its export and FTG's export ≠ edit format (`mfcg-devlogs-b.md` §2.14; O11) — both designed out |
| **binary twin** | same schema, varint zig-zag int32 cm centred on the settlement centre (FTG's economy: 593 KB for 2 798 buildings + population) | for embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | FeatureCollection in a local metric CRS (declared `crs`/`units: m` property + a WGS84 affine anchor option), one feature per entity with `id`, `kind`, `layer`, properties = the entity's public attributes; districts included (FTG omits them, F26); MultiPolygon for face unions | validates against an open validator; opens in QGIS (MFCG's "resembles GeoJSON" is the failure) |
| **SVG** | layered semantic SVG from the display list: `<g id="layer.ground"><g class="way primary" data-id=…>`; text as text; hatching as paths | every layer and class separable (O11 h); print sizes via viewBox |
| **PNG / tiles** | any resolution, per-layer masks (transparent PNG per layer — the largest MFCG ask, O11) | 300 dpi A2 |
| **VTT** | per-layer scene JSON: walls (building outlines, curtain walls) as wall segments, doors from entrances, lights from `lights` role and windows (night), regions from districts/plots, journal links from entity ids; grid scale declared; separate levels for `underground` (sewers) and `sky` (islands); a Foundry/Roll20-shaped adapter (FTG's Foundry module fields, `ftg-payload-visual.md` §7.3, are the shape to match: building, person, faction, district) | no manual steps on import (O11 g) |
| **3-D** | **glTF** (binary, permissive tooling; chosen over CityJSON — §20) with per-building meshes extruded from footprints and heights, roofs from `RoofSpec` (skeleton hips / gables), walls and towers, terrain mesh, water planes; OBJ as a secondary flat export (MFCG's OBJ merges everything into one mesh — we keep one mesh per entity) | shadows in 2-D agree with 3-D because heights are model data (O17 g) |
| **statistics record** | per-generation metrics with provenance (§14) | the corpus-calibration input |
| **permalink** | §7.2 | — |

**Embedding API** (`embed/`): an ESM library (`createTown(request) → Document`, `applyEdit`, `regenerate`, `query`, `render(target, style, lod)`, `export(format)`) plus an **iframe bridge** over `postMessage` with origin checks and a `stateId` optimistic-concurrency token — FTG's protocol shape (`ftg-payload-visual.md` §7.2): events `BUILDING | DISTRICT | PERSON | FACTIONS | PIN | TIME | LOCATION | SELECTION | UPDATE_*`, commands `SET_TIME | SIMULATE_TIME | SET_LOCATION | UPDATE_ENTITY | ASSIGN | REGENERATE | EXPORT`. Host inputs (rosters, assignments, circumstances) enter only through the same typed request (no external constraints now — roadmap consequence only).

---

## §13 Performance budgets

Reference bars (recorded): MFCG model 16–82 ms at size 24–33, 125–260 ms at size 80 (`profile-mfcg.md` §7.1; `buildGeometry` = 80–93 %), one Canvas2D replay 170–230 ms at size 80 with 46 000 fills; NG 10–52 ms model + 20–26 ms view per hood, rasterise 73 ms (`profile-neighbourhood.md` §5); VG 240–330 ms incl. rendering, 2.45 s cold; FTG ≈ 3–7 s server for a CITY plus 4.6 s client scene build (`_critic-ftg.md` F20; task ruling).

| size class | request | ≈ buildings (our tables, PLAUSIBLE) | model p50 / p95 | first paint (city LOD) | full redraw / pan | memory |
|---|---|---|---|---|---|---|
| TOWN | pop ≈ 5 000, ≈ 40 MFCG-cell equivalents | 1 000–1 500 | ≤ 60 / ≤ 100 ms | ≤ 50 ms | ≤ 16 ms (retained tiles) | ≤ 30 MB |
| CITY | pop ≈ 20 000, ≈ 80 cells | 4 000–6 000 | ≤ 200 / ≤ 300 ms | ≤ 100 ms | ≤ 16 ms | ≤ 100 MB |
| METROPOLIS | pop ≈ 50 000, ≈ 150 cells | 10 000–15 000 | ≤ 700 ms / ≤ 1 s | ≤ 200 ms | ≤ 16 ms with tiles; ≤ 33 ms on the low tier | ≤ 300 MB |

Per-stage budgets (CITY): P0 ≤ 20 ms (O(cells)), P3 ≤ 40 ms, P4–P6 ≤ 20 ms, P7 ≤ 40 ms (the fusion gate: network + infill ≤ 100 ms at CITY, O4 f), P8–P10 ≤ 60 ms (site plans ≤ 10 µs per plot median, O17 h), P11 ≤ 20 ms, P12–P13 ≤ 20 ms, P14–P15 lazy per district. Neighbourhood LOD: open one district ≤ NG's 10–96 ms at comparable counts; ≈ 25 canvas ops per wing (NG's measured budget) is the ceiling for the `shaded` preset, hatch instanced.

Mechanisms: generation in a Web Worker with **incremental delivery** (P0–P6 first → a city-LOD preview appears while P7–P13 continue; the app is never blocked); lazy per-district derivation; tiles cached per district and invalidated by edit scope; typed arrays; no allocation in hot loops; derived geometry (roofs, spines, scatter) cached by id; time-to-first-map < 1 s cold (VG's 2.45 s cold and NG's 205 ms audio-context init are the failures to avoid).

## §14 Testing and verification

| layer | what | how | gate |
|---|---|---|---|
| kernel property tests | predicates (sign symmetry, transitivity on collinear sets), DCEL (Euler, twin/next/prev cycles, face walk closure), booleans (area identities A∪B + A∩B = A + B, idempotence, snap stability), offset (inset then outset ⊆ original), skeleton (arcs inside the polygon, hole-aware, ridge length monotone in area), Poisson (min distance ≥ r), noise (range, determinism) | `fast-check`-style generators + the B-FUZZ corpus (10⁶ random concave/holed/thin/near-collinear/snapped polygons per primitive) | 0 crashes, 0 hangs, 0 self-intersections, 0 slivers below declared minima |
| per-stage invariants | §6 suite run after every stage | in CI on B-CITY (1 000 seeds × 4 water configs × 3 sizes) and in the app | hard violations = 0 per 1 000 cities; fallback ladder uses reported |
| determinism | model hash identical across Node x86/arm64 and three browsers; perturbation tests (change the naming grammar → 0 geometry changes; add a decoration layer → 0 other entities change; reroll one block → nothing outside it) | CI matrix | 100 % |
| seed goldens with a declared-shift protocol | a fixed seed set per size class; per-stage hashes + statistics records committed; a release that legitimately shifts a stage must name the cause in the changelog and re-sign only that stage's goldens | CI | untouched stages byte-identical |
| visual regression | Playwright screenshots per preset × LOD × size on the golden seeds; perceptual diff with a threshold; the K4 style regression (per-wing op mix and colour laws of the `shaded` preset) | CI | diff below threshold; screen = SVG = PNG within threshold |
| option-interaction matrix | every style/option pair rendered; assert no option silently disables another | CI | 0 couplings |
| edit suite | B-EDIT 10⁵ scripted sequences (add gate, move road, pin landmark, reroll block, resize district, change coast side, draw water, warp) | CI nightly | 0 planarity violations; locked preserved 100 %; ids outside scope 100 % |
| **reference-parity metrics** (B-REF) | computed from our outputs and compared with the recorded references (below) | `bench/` package writes both | inside the declared bands |

**Reference-parity metrics (computed against our captures):**

| metric | our measure | reference baseline (recorded) | band |
|---|---|---|---|
| road segment statistics | edge-length histogram per way class; turn-angle distribution; junction-arm angle median and share in 80–100°; node-degree histogram | FTG payload: type-0 modes 30/15/25 m, 15° cap (zero mass 15–16°), junction arms median 90.0°, 58 % in 80–100°, degrees {1: 83, 2: 2678, 3: 969, 4: 561} (`_critic-ftg.md` §4) | no cliff in turn angles; arm-angle median 85–95°; junction p5 ≥ 30°; 4-way share > 0 and < 15 % in organic districts |
| block-area distribution | face areas of infill blocks by district class | NG vertex captures at `medium` (`profile-neighbourhood.md` BG-1); FTG block-lot median 441 m² (`_critic-ftg.md` §4 row 17) | infill within the NG-measured bands at comparable district shapes (O4 f) |
| bent-cut signature | bend position, arrival angle, bends per cut | NG: one bend near 0.5 in ≥ 80 % of plain cuts; ≥ 85° arrival in ≥ 95 % of junction ends (`docs/IMPROVEMENTS.md` §4 R3) | within the measured spread on 1 000 seeds per template |
| building footprint distribution | area median/p95 per class; quad side; corner deviation | FTG: median 103 m², p95 154 m², quad side median 10.3 m, worst-corner p95 22.9° (`_critic-ftg.md` §4 rows 10–12); MFCG ≈ 13–14 m across at the ambiguous scale (`visual-spec.md` §1.4) | ordinary house median 60–160 m², p95 < 400 m² (O6 b); a sheared minority kept (R3) |
| entrance geometry | entrance on outline; distance to road | FTG: on outline 0.003 m; 3.0 m from road; 53 % of buildings with a vertex within 2 m of a road (`_critic-ftg.md` §4 row 15) | 100 % on the access edge; distance within class band |
| party walls / attachment | shared-edge share, attached share | NG 95–99 % attached, 39–43 % of perimeter; FTG residences 0–5 %, industry 96–98 % (`docs/IMPROVEMENTS.md` O17) | ≥ 90 % attached in dense classes; within band per class |
| population / buildings | persons per building by class | MFCG ≈ 6.12 (`_critic.md` C1); FTG 3.4 (`_critic-ftg.md` §4 conclusions) | our tables, reported; requested population ± 5 % |
| wall statistics | tower spacing, gates per arterial crossing | FTG median 39 m, 17/17 towers on ring vertices, 6 and 2 ungated crossings; MFCG a tower per non-gate vertex, `gates=N` exact | spacing within band; ungated crossings 0 |
| draw-style checks | per-preset op census vs draw records: casing Δ = 2h on every ribbon; joins round; dark:light fill ratio; hatch triangles per wing; shadow quads per wing; water band ratios 0.54433/0.19245; furrow pitch | `visual-spec.md` §0.2, §1.4, §2.3; `profile-neighbourhood.md` §3.6–3.7 (17.4 hatch/wing, 2.33 quads/wing) | `ink`: casing law exact, joins round ≥ 99.9 %; `shaded`: band ratios exact to 1e-4, hatch/wing 15–20, roof dark/light ratio (0.787, 0.802, 0.834) ± 0.02 |
| layer order | mark order per band vs the recorded orders | `profile-mfcg.md` §10.5; `profile-neighbourhood.md` §4.3; `profile-village.md` §7.2 | identical for the corresponding presets |
| labels | overlap with protected features; inside-area share; curvature | MFCG: gates/keep covered, walls straddled (O13) | 0 / ≥ 99 % / within limit |
| timings | per stage per size class | `profile-mfcg.md` §7.1; `profile-neighbourhood.md` §5 | §13 budgets |

---

## §15 Package and module layout, key interfaces, dependency rules

```
packages/
  core-geom/        exact predicates, dmath, DCEL, booleans*, offset*, skeleton, OBB/hull/LIR, delaunay*, poisson, noise, smoothing, index*   (* = adopted libs behind our interfaces)
  core-rng/         keyed sub-streams, helpers, hashing
  core-schema/      entity types, ids, document, migrations, JSON schema generation, invariant suite, statistics record
  gen-site/         P0 terrain, hydrology, water, land, coast/island outlines
  gen-content/      P1 roster (dependency tables), P11 reconcile, lazy people (sim data model)
  gen-layout/       P2–P7 siting, backbone growth, districts, claims, fortification, infill (strategy interface below)
  gen-plots/        P8–P10 prosperity field, granularity law, frontage plots, site plans, building-generator interface + trivial builder
  gen-hinterland/   P12–P13 land use, fields, woods, greenery
  gen-names/        P14 grammar engine (our own), corpora (our own), label text
  display/          display list builder per LOD, label engine, furniture, style sheets (data), paint programs
  render-canvas/    Canvas2D back end, tiles, instancing, OffscreenCanvas worker
  render-svg/       SVG back end
  render-gl/        WebGL2 back end (later)
  export/           GeoJSON, VTT, glTF/OBJ, PNG tiles, binary twin
  edit/             edit events, replay, undo, locality scoping, warp brushes, assignment + placement solver
  sim/              schedules, calendar, factions (optional module)
  api/              headless library API; worker protocol; embed bridge (postMessage)
  app/              the one-click web app (UI only)
  cli/              generate, bench, goldens, export
  bench/            B-CITY / B-EDIT / B-FUZZ / B-REF / B-ZOOM runners and parity metrics
  tables/           versioned rule tables and presets with provenance (data only)
```

**Dependency rules** (enforced by lint): `core-*` depend on nothing internal; `gen-*` depend only on `core-*` and `tables`; `display` depends on `core-schema` (never on `gen-*`); `render-*` depend only on `display`; `export` on `core-schema` + `display`; `edit` on `core-*` + `gen-*` (it re-runs stages) but `gen-*` never on `edit`; `sim` on `core-schema` only; `api` on everything except `app`; `app` on `api` only. No DOM outside `render-*`, `app`, `api/embed`. No `Math.random/sin/cos/Date` outside `render-*` and `app` (lint). Every adopted library is imported in exactly one `core-geom` adapter file.

**Key interfaces**

```ts
// generation stages and the layout strategy (stage 2 and a later village extend it)
interface Stage<I, O> { name: string; version: string; run(input: I, ctx: StageContext): StageResult<O>; invariants: Invariant[]; budgetMs: number; }
interface StageContext { doc: Document; stream(concern: string, entity?: Id<any>, attempt?: number): Rng; tables: Tables; report: ReportSink; scope?: Scope; epoch: number; }
type StageResult<O> = { ok: true; value: O; report: StageReport } | { ok: false; reason: string; partial?: O; report: StageReport };

interface LayoutStrategy {                       // the fused base implements it; NeighbourhoodStrategy and a later VillageStrategy implement it too
  id: 'base-fused' | 'neighbourhood' | string;
  backbone(site: SiteModel, siting: Siting, roster: Roster, ctx: StageContext): Dcel;           // P3
  partition(dcel: Dcel, roster: Roster, ctx: StageContext): District[];                          // P4
  infill(district: District, ctx: StageContext): Block[];                                        // P7
  plots(block: Block, field: ProsperityField, ctx: StageContext): Plot[];                        // P9
}
interface NeighbourhoodGenerator { generate(req: NeighbourhoodRequest, ctx: StageContext): NeighbourhoodResult; }   // §2.2

// the stage-3 hook
interface BuildingGenerator {
  build(input: { plot: Plot; slot: BuildingSlot; accessEdges: number[]; context: ContextVector; assignment?: Assignment; drift?: DriftBounds; seed: StreamKey; lod: ('outline'|'wings'|'rooms')[] }): Composition;
}
interface ClassRules { pick(context: ContextVector, assignment?: Assignment): { buildingClass: string; heights: Heights; roof: RoofSpec } }   // a data table, not code

// display and style
interface DisplayListBuilder { build(doc: Document, band: LodBand, scope?: Scope): Mark[]; }
interface Renderer { render(list: DisplayList, style: StyleSheet, view: View, opts: { layers: Layer[]; shadows: boolean; tier: 'low'|'mid'|'high' }): void; }
interface StyleSheet { version: string; palette: Record<string, string | string[]>; order: Record<LodBand, string[]>; programs: Record<string, PaintProgram[]>; budgets: Record<LodBand, DetailBudget>; }

// editing and API
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult; undo(doc: Document): Document; replay(bp: Blueprint, edits: EditEvent[]): Document; migrate(doc: Document, to: string): Document; }
interface TownAPI {
  create(req: Request): Promise<Document>;
  edit(docId: string, e: EditEvent): Promise<ApplyResult>;
  regenerate(docId: string, scope: Scope, mode: 'keep'|'adjust'|'newSeed'): Promise<ApplyResult>;
  query(docId: string, q: Query): Promise<QueryResult>;                     // gazetteer, hit-test, whereIs(person, t)
  render(docId: string, target: RenderTarget, style: string, view: View): Promise<void>;
  export(docId: string, format: ExportFormat, opts?: ExportOptions): Promise<Blob>;
  report(docId: string): Promise<GenerationReport>;
}
```

**Extension points**: `LayoutStrategy` (stage 2, village-later), `BuildingGenerator` (stage 3), `Stage` registration (sewers, islands, evolution as additional stages/layers), `PaintProgram` registry (new looks), `Exporter` registry, `Tables` (every rule as data), the `sim` module boundary (host rosters), the `Assignment`/`PlacementSolver` interface.

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

## §17 Build plan — base milestones first, riskiest spikes first

| # | milestone | contents | exit criteria (measured) |
|---|---|---|---|
| S-1 | **Spike: robust kernel** (2–3 weeks) | `core-geom` DCEL on int32 cm, robust predicates, snap rounding, booleans/offset adapters, straight skeleton with holes, typed results; `core-rng`; `core-schema` skeleton | B-FUZZ 0/0/0 on every primitive; DCEL Euler and edit properties; skeleton on 1 000 holed polygons; cross-platform hash test green |
| S-2 | **Spike: the fused layout** (3–4 weeks) | P0 (terrain, drainage, one water config), P3 backbone (destination A* + staged proposal queue), P4 districts, P7 bent-cut infill with the fallback ladder; a debug renderer | O4 (f): network + infill ≤ 100 ms at CITY; infill block-area and junction statistics inside NG's measured bands on the same district shapes; restarts 0 on 1 000 seeds; turn-angle spectrum without a cliff |
| S-3 | **Spike: twisted bisection calibration** (in S-2, 1 week) | bend/arrival/stop constants tuned against `captures/neighbourhood` vertex captures (BG-1 statistics) | K1/K2 within spread; the forward test (bentcut_forward.py-style) ≥ 80 % on our own cuts |
| M1 | **A viewable MFCG/FTG-class town** (the first product milestone) | P0–P10 + P14 + display list at `city`/`district` LOD + `ink` preset + Canvas2D tiles + PNG/SVG + permalink + report; walls, gates, castle, plaza, temple, coast/river, farms, greens; site plans with the trivial builder; heights stored | side-by-sides against MFCG and FTG at TOWN/CITY/METROPOLIS pass the owner's eye; O2, O6, O3, O11 (schema + PNG/SVG), O1, O4, O5, O18, O17, O8, O12 (ink), O16-core criteria met; §13 budgets at TOWN and CITY |
| M2 | **Content, editing, exports** | P1/P11 roster + context vector + lazy people; edit log, locks, warp, draw, regenerate-area, undo; GeoJSON/VTT/glTF/binary; `lit` preset; labels with street names; hinterland rings; greenery | O7, O9, O13-core, O14-core, O19, O11 extras; B-EDIT green; the 12 MFCG edit asks 12/12 |
| M3 | **Intent, assignment, workflow, sim module** | O10 intent vocabulary + forms catalogue + pins + assignments + placement solver; thumbnails; schedules/calendar/factions module; bridge | O10, O16 full, sim parity rows (FTG B3–B5, F1–F2) |
| M4 | **Stage-2 neighbourhood composition** | `NeighbourhoodGenerator` on the S1 contract; `neighbourhood` LOD band; `shaded` preset (hatch, prism shadows, crowns, cobbles, chimneys, wells); S4 templates; S6 workflow | S1–S6 criteria; NG parity rows; one district opens ≤ NG's 10–96 ms; footprint hash identical to city LOD |
| M5 | **Hardening** | WebGL2 tier, print presets, relief tiers, low-end tier, golden suite, corpus-calibration interface for tables | §13 at METROPOLIS; visual regression matrix green |

Deliberately out of scope: the village product (THORP → HAMLET → VILLAGE) and its tracker roads, VG's rendering preset as a product, stage-3 compositions (hooks only), sewers, floating islands, evolution engine, live sync service, corpus calibration, setting packs, host-application inputs.

---

## §18 Clean-room and legal posture; third-party licence list

* **Clean-room**: no code from TownGeneratorOS (GPL-3) or from any captured bundle is read, copied, ported or paraphrased; algorithms are specified here from published sources (Shewchuk predicates; Bridson Poisson-disc; Felkel–Obdržálek/Aichholzer straight skeleton; Martinez–Rueda booleans; Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; fBm) and from the creators' *stated* ideas, with our own constants calibrated on our own captures. Data assets (naming corpora, palette values, FTG building/profession/item tables, textures) are the references' creative content and are **not reused**; ours are authored fresh under the same schema ideas. The 2017 source may be opened only by a verification seat, never by an implementer.
* **Licences (all permissive)**: `robust-predicates` (MIT), `delaunator` (ISC), `earcut` (ISC), `flatbush` (ISC), `polygon-clipping` (MIT) or `clipper2` (Boost Software License 1.0) — one chosen in S-1, TypeScript (Apache-2.0), Vite/esbuild (MIT), vitest (MIT), Playwright (Apache-2.0), fast-check (MIT), fonts IM Fell family (SIL OFL 1.1), Cinzel (SIL OFL 1.1), Voltaire (SIL OFL 1.1) — bundled with their licence files; no GPL/AGPL/LGPL dependency anywhere; a licence check runs in CI.
* **Our licence**: to be decided by the owner (owner-gated); the code is written so that no dependency constrains that choice.

---

## §19 Alternatives for each hard-to-reverse decision (at least two, with the reason for rejection)

| decision | chosen | alternative A (rejected because) | alternative B (rejected because) |
|---|---|---|---|
| spatial truth model | half-edge DCEL per layer, faces first-class, every feature a typed edge chain | polygon soup per feature (VG/NG): seams, planarity and faces re-derived per edit; FTG's duplicate-junction bug class | quad-dominant base mesh with painted attributes (Urban Places): area-filler, construction unrecovered, third architecture without parity evidence |
| numeric policy | int32 cm + exact predicates + snap rounding; float64 transient; no transcendental functions in model code | float64 with epsilon tolerances (2017/MFCG): parameter-space tolerances, NaN circumcentres, non-determinism across engines (`os-geometry.md` §4) | exact rational / big-integer arithmetic everywhere: 10–100× slower, breaks the sub-second one-click budget; not needed at cm resolution |
| RNG / stream design | xoshiro128\*\* sub-streams keyed by hash(seed, stage, entity, concern, attempt, epoch) | one global stream with save/restore (MFCG): any new feature reshuffles every map; locality impossible | counter-based RNG (Philox) with keyed draws: elegant, but 64-bit arithmetic in JS needs BigInt or emulation and the per-draw cost is higher; keyed sub-streams give the same locality at native speed |
| stack | TypeScript core, Web Worker generation, Canvas2D + SVG (+ WebGL2 later) | Rust → Wasm core + TS UI: better numerics and speed, but two languages, slower design iteration and a wasm boundary in every debug loop; kept as an optional per-module hot path behind the kernel interface | three.js/WebGL-first renderer (FTG): textures and lighting are one style; the ink look and SVG export are harder, and the embed bundle heavier |
| display-list design | flat, layered mark list per LOD band with semantic keys; style = data (paint programs); retained tiles built by the back end | immediate-mode drawing per back end (MFCG's "implemented two times"): screen/SVG drift, no LOD, no caching contract | full retained scene graph with per-object nodes: heavier, invites per-primitive caching (NG's 528 uploads) instead of per-group tiles |
| canonical document | native JSON + binary twin; exports as views | GeoJSON as the canonical model (MFCG's first attempt): "awkward", no topology, no ids for non-geometric entities | protobuf as canonical (FTG): compact but not diffable; kept as the twin |
| 3-D export | glTF (+ OBJ) | CityJSON: semantically richer for GIS, but tooling for VTT/game users is thin; revisit in the host phase (recorded as deferred) | — |
| simulation depth in the base | roster + households + lazy people + schedules + calendar + factions as data; events/relations later | full FTG parity in the first release: content authoring of hundreds of types under clean-room delays the picture; its data model is already in the musts | no simulation (watabou's stance): loses "best of both" and the owner's parity requirement |

---

## §20 Delegated decisions (judgment ledger; each vetoable by the owner)

| id | decision | rationale | to veto |
|---|---|---|---|
| D-1 | int32 centimetre coordinates, world bounded to ± 335 km | exact orient2d in float64; FTG parity; precision tiebreaker | change to mm (halves range) or float64 (loses cross-platform hashes) |
| D-2 | TypeScript-first with a Wasm-swappable kernel interface | one language, browser-first default, fastest tuning loop | mandate Rust core from M1 |
| D-3 | keyed xoshiro128\*\* sub-streams | locality, EVO hook, native speed | Philox/BigInt |
| D-4 | destination-driven staged growth as the backbone, bent-cut infill, frontage-first plots (the fusion) | §1.3 with the measured gates | strike §1.3 (d) and adopt one of the rejected shapes |
| D-5 | flat mark-based display list; paint programs as data; per-district tiles | §9; MFCG's cache evidence | scene graph |
| D-6 | `ink` preset default, `lit` second (owner default adopted); `shaded` reserved for the stage-2 close-up | owner ruling; NG/VG idioms belong to the neighbourhood LOD | make `shaded` a city-LOD preset too |
| D-7 | simulation module depth (J-S adopted): roster/households/lazy people/schedules/calendar/factions in the base; events/relations later | §11 | move events/relations into M2 |
| D-8 | glTF for 3-D; CityJSON deferred | §19 | choose CityJSON |
| D-9 | whole-map restarts = 0 as a hard criterion (J-K adopted) | terrain-first design makes it achievable | relax to a p99 bound |
| D-10 | numeric targets written as bands/thresholds stay placeholders until B-REF fixes them (J-T adopted) | the references give no baseline for them | — |
| D-11 | Poisson k = 30 (references use 50) as the default table value | speed; visually indistinguishable at k ≥ 30 per Bridson | set 50 |
| D-12 | milestone-1 gate list = `docs/IMPROVEMENTS.md` §5.1's list (J-M adopted) with `lit` preset moved to M2 | the ink look proves the picture first | re-cut |
| D-13 | the trivial building builder (inset rectangle/L aligned to the frontage) satisfies the stage-3 interface until stage 3 | owner: stage 3 later; footprints stay identical across LOD | require compositions in M1 |
| D-14 | `docs/confidence/*.md` bodies not re-read (their rulings are in CONFIDENCE.md); os-geometry §1–2 and manor §1/§5–7 not read | reading budget (§0) | a validator re-reads them against §16 |

**Deliberately deferred (documented, not bugs to re-find):** final band numbers (D-10); the boolean library choice (S-1 benchmark); WebGL2 back end and SDF text (M5); CityJSON; the village strategy; sewer/island rule design; evolution engine semantics beyond the hooks; corpus calibration; setting packs; host inputs; our own licence.

---

## Appendix A — sections read in full (for the "must have read the source section" rule)

`_critic.md` all; `_critic-ftg.md` all; `_critic-os.md` all; `_critic-vg-ng.md` all; `docs/CONFIDENCE.md` all; `docs/IMPROVEMENTS.md` §0–§5, §7 (O1–O19, S1–S6, V1–V3, §4 R1–R16, §5.1–5.5, §7.1–7.4); `visual-spec.md` all (§0–§8); `os-geometry.md` §4, §5, §6; `manor.md` §2.1–2.10, §3.1–3.3, §4.1–4.4, §8, §9; `watabou-extra-b.md` T4, T5, T6, T23, T24, T25, T26, T27; `watabou-extra-a.md` §2.1, §2.2; `profile-mfcg.md` §3.1, §3.2, §6.2, §6.3, §6.4, §6.5, §7.1, §8, §10.5; `profile-neighbourhood.md` §3.6, §3.7, §4.3, §5.1–5.4; `ftg-docs-params.md` §2.2, §2.3, §2.4, §2.5, §2.6, §2.7, §2.8, §2.9, §3.3; `ftg-payload-visual.md` §7.2, §7.3; `mfcg-devlogs-b.md` §2.5, §2.14; `ftg-posts-c.md` §2.18, §2.19, §2.20; `profile-village.md` §6, §7.1, §7.2. Section outlines of every other findings file and of `docs/confidence/{mfcg,vg,ng,ftg}.md`. Mechanisms cited from unread sections are cited through the ruled quotations in the critic files, `docs/CONFIDENCE.md` or `docs/IMPROVEMENTS.md`, and are marked with those files' section numbers in the text.

