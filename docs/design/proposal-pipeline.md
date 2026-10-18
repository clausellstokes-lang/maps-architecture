# Proposal — PIPELINE-AND-DETERMINISM-FIRST architecture for the base town/city generator

Lane `design/proposal-pipeline` (architect seat, Fable 5.1), 2026-09-25. One of three independent architects; this
seat's angle is that the hard problems are **orchestration** — composable layout strategies behind one interface,
constraint satisfaction with local repair instead of whole-map retries, seeds that stay stable under feature growth,
edit/regenerate locality, and versioned artifacts with provenance. The stage graph and its contracts are designed
first; geometry is a service the stages call. Every mechanism below that claims parity with, or improvement on, a
reference cites the findings section it was read from (Appendix A lists what was read in full).

Working codename for the base: **Burgh** (package scope `@burgh/*`). It is a name for this document only.

Status line: **complete draft, written incrementally in one run** (§0 → §18 in order; a section is present only when
it is finished). Evidence tags follow the program's convention: **CONFIRMED** = an executed measurement or a source
read at the cited line by a lane; **PLAUSIBLE** = this seat's reasoning. Every design choice in this file is
PLAUSIBLE until built and measured; the facts it rests on are CONFIRMED where the cited lane says so.

---

## §0 Reading record, evidence discipline and how to read this file

### 0.1 What was read in full and what was read by outline (the READING BUDGET rule)

Total reading in this seat ≈ 420 k tokens (the findings run ≈ 1.5 bytes per token). The switch to outline-plus-sections
mode was made at ≈ 175 k tokens (after the four critics), so **not every file the task lists was read cover to cover**.
Exactly:

| file | read |
|---|---|
| `research/findings/_critic.md` | **full** (every line) |
| `research/findings/_critic-os.md` | **full** |
| `research/findings/_critic-ftg.md` | **full** |
| `research/findings/_critic-vg-ng.md` | **full** |
| `docs/CONFIDENCE.md` | **full** (§0–§8, all four capability tables) |
| `docs/IMPROVEMENTS.md` | §0 heading, **§1, §2, §3.1 (ranking), O2, O3, O4, O9, O17, O18 in full, §4, §5.1–5.5, §7 in full**; O1, O5, O6, O7, O8, O10–O14, O16, O19 and §3.2–3.3, §6 **by heading and the §5 summaries only** |
| `docs/confidence/{mfcg,vg,ng,ftg}.md` | **outline only** (`grep '^#'`); their capability rows were taken from `docs/CONFIDENCE.md` §4.1–4.4, which reproduces every row with the ruled values |
| `research/findings/visual-spec.md` | §0.2, §1.1–1.3, §5, §6, §7 in full; rest by outline |
| `research/findings/os-geometry.md` | §1 (1.1–1.5), §4, §5, §6 and the Critic-2 addendum in full; §2–§3 by outline (their constants are in `_critic-os.md` §1, read in full) |
| `research/findings/manor.md` | §2.1–2.6, §3.1–3.3, §4.1–4.4, §8, §9 in full; §1, §5–§7 by outline |
| `research/findings/profile-mfcg.md` | §3.1–3.2, §4.9, §11, ST-8 in full; rest by outline (its headline facts arrive through the critics and CONFIDENCE) |
| `research/findings/ftg-docs-params.md` | §2.1–2.7 in full; rest by outline |
| `research/findings/watabou-extra-a.md` | §2.1 in full; rest by outline |
| `research/findings/profile-neighbourhood.md` | BG-4 and PF-3 in full; rest by outline |
| `research/findings/os-model.md` | §11 in full; rest by outline (§9 draw order is quoted in `_critic-os.md` §4, read in full) |
| `research/findings/mfcg-posts-b.md` | §2.3–2.5 in full; rest by outline |
| all other findings files (`os-wards-render`, `mfcg-posts-a`, `mfcg-devlogs-a/b`, `vg-posts-a/b`, `vg-ng-devlogs`, `ftg-posts-a/b/c`, `ftg-payload-visual`, `profile-village`, `watabou-extra-b`) | **outline only**; facts from them are used only as relayed by a critic file, by `docs/CONFIDENCE.md` or by the IMPROVEMENTS sections read in full, and are cited that way |
| `docs/PLAN.md`, `docs/DEFINITION.md`, `docs/AMENDMENTS-2026-09-25.md`, `docs/lane-events.log`, `docs/ACTIVE-RUN.json` | full |
| `captures/*/*/report.md` | not opened; the timing and count numbers used are the ones the findings and critics quote from them (cited by file and section) |

Consequence: where this file specifies a mechanism for a stage whose reference section was read only by outline
(e.g. VG's tracker steering, FTG's coast arms, MFCG's 0.11 tint methods), the mechanism is marked **[design from
relayed evidence]** and the parity claim is limited to what the critic or CONFIDENCE row states. No mechanism claims
parity with an unread section.

### 0.2 Binding rulings applied (from the task brief and the four critics)

Applied throughout, without re-litigation: population ≈ 6.12 per MFCG building (`_critic.md` C1); `PoissonPattern` =
warped Poisson-disc with k = 50 candidates (C2/C3); `Equalize` = cell angles (C4/C5); VG stage order measured from
profile timestamps (C7); VG roads are steered trackers, not A\* (C10); FTG decides buildings and people before geometry
(C12); `deltaRiver` is a widened mouth, not a braided delta (C15); the bent-cut construction (C13) is **OPEN** — stated
right-angled departure/arrival with a mid-course bend, OBB-chosen axis measured (PF-3), constants unknown; FTG wire
coordinates are zig-zag `sint32` centred on (0,0), 1 unit = 1 cm, ordinary buildings ≈ 10 × 10 m, and every base-text
length in `ftg-payload-visual.md` is × 2 too large (`_critic-ftg.md` §1 F1/F2, §4); F3 is SETTLED (district-stage
streets laid as segments of (L + 0.5)/2, main roads L + 0.5, suburb streets not halved; FTG generates in ≈ 3–7 s); VG
numbers carry their build stamp (19251041 vs 19365073; `_critic-vg-ng.md` V25); MFCG's discard-and-retry loop
encloses wards and geometry too (`profile-mfcg.md` ST-8); the profiler label caveat (`captures/README-labelfix-2026-09-25.md`)
— no class-level count used here is one the README moves.

### 0.3 Owner rulings this design is held to

Completely standalone; clean-room (algorithms and ideas only; no code, no data values; captured bundles never opened);
improve, not just recreate (every improvement names its reference weakness and its metric); the PRODUCT SCOPE (stage 1
base = MFCG ⊕ FTG fusion on the TOWN → CITY → METROPOLIS ladder; stage 2 = NG-class neighbourhood composition, designed
here to interface depth; stage 3 = Fantasy-Manor-class building compositions, hooks only; village = a separate later
product, not precluded); the PLOT MODEL, PLOT GRANULARITY, PROSPERITY, GREENERY and HEIGHT rulings as BASE requirements;
the ASSIGNMENT, LAYER (sewers, floating islands) and EVOLUTION hooks; EVERYTHING IS EDITABLE; the DESIGN TIEBREAKER
(realism through explicit constraints and precise real-unit geometry, legibility and one-click as the floor); the ADOPTED
DEFAULTS (§18.2 adopts them as decided); the ROADMAP CONSEQUENCE (data-driven parameters with provenance, measurable
outputs, an embeddable library boundary, no external inputs now).

### 0.4 How to read this file

§1 scope and the fusion thesis · §2 domain model · §3 kernel · §4 pipeline (the stage graph is the spine of the design) ·
§5 failure handling · §6 determinism · §7 editing · §8 rendering · §9 labels · §10 simulation · §11 export · §12
performance · §13 testing · §14 packages and interfaces · §15 parity and improvement matrices · §16 build plan · §17
legal · §18 alternatives, delegated decisions and deferrals · Appendix A sections read. Interfaces are TypeScript;
diagrams are ASCII.

---

## §1 Scope and product shape

### 1.1 What the base is

One general town/city generator, browser-first, that produces a **settlement model** (not a picture): terrain and
water, a planar way network, districts, blocks, plots with owners and uses, buildings with heights, walls and gates,
greenery, hinterland, names and labels, an optional roster of institutions and people — all on stable ids, in metres,
from one seed, with every element editable and every rule held as data. Size ladder **TOWN → CITY → METROPOLIS**
(population targets ≈ 5 000 / 20 000 / 50 000, ≈ 40 / 80 / 150 MFCG-cell equivalents, `docs/IMPROVEMENTS.md` §2
B-CITY; MFCG's own ladder is 5–200 wards with ≈ 6.12 persons per building, `docs/CONFIDENCE.md` §4.1 H1 and
`_critic.md` C1; FTG's is 10 rungs to 50 000 people, `_critic-ftg.md` F27). Renders as a clean ink map in the MFCG
family by default, as an FTG-like lit/textured map as the second preset, and at continuous zoom from city to district
LOD (stage 2 adds the neighbourhood LOD).

### 1.2 The fusion thesis — stage by stage

The base is neither MFCG with FTG features bolted on nor the reverse. Each pipeline stage adopts one reference's
approach, discards the other's for a stated measurable reason, or replaces both. The owner's tiebreaker (explicit
constraints, precise real-unit geometry, measurable statistics; legibility and one click as the floor) is applied where
the two genuinely conflict and marked **[TIEBREAKER]**.

| stage | MFCG-class approach (evidence) | FTG-class approach (evidence) | the base adopts | why (measurable criterion) |
|---|---|---|---|---|
| **Units and frame** | abstract world units, a regular street = 1.0, ≈ 3.7 m/unit derived only from the grid (`visual-spec.md` §0.2, `os-geometry.md` §1.5) | integer centimetres centred on (0,0), +x east, +y north, ±2 500 m for CITY (`_critic-ftg.md` F1, CONFIRMED) | **FTG**: integer centimetres, centred frame, metres in every API and table | **[TIEBREAKER]** precision and the corpus phase; parity metric = every parameter labelled in metres and every exported length in metres (O6) |
| **Terrain and water** | coast = 6-octave noise sampled per cell only when `coast = 1`; river = canal course search with discard and whole-city restart, 7 of 10 attempts at size 80 (`profile-mfcg.md` §4.6, §11; `docs/CONFIDENCE.md` §3.1 B8); no elevation the layout responds to (B20) | water first: coast "in two arms", rivers with branches "bending back around", drawn water; height maps prototyped and shelved (`ftg-docs-params.md` §0.2, §4.2–4.4; `_critic-ftg.md` §2) | **neither** — a terrain-and-hydrology-first site model: heightfield in metres, drainage, rivers by descent, one closed-outline routine for coasts/lakes/islands (O1) | whole-map restarts = 0 (MFCG baseline 24 in 58 attempts); contours cross water 0 times; the river runs through the core in ≥ the MFCG rate (`docs/IMPROVEMENTS.md` §4 R11). The sewer and island hooks need drainage and outlines anyway |
| **Site partition** | Voronoi cells of a spiral seed cloud (8·size + 4 points, Delaunator + DCEL, short-edge collapse < 8 u) are the wards; roads and rivers run along cell edges (`_critic-os.md` §1.3–1.4, `profile-mfcg.md` §4.1; `docs/CONFIDENCE.md` §4.1 B1/B2) | no partition: an agent-grown road graph whose faces become "district lots" (`ftg-docs-params.md` §2.1, §2.5) | **FTG's substrate** (one planar graph whose faces are districts, blocks and plots) — the cell mesh is dropped as a layout object | roads that end at destinations (100 % of through-roads at a named destination, O4 a) are impossible when roads must be cell edges; faces from a grown skeleton give districts a growth stage for free (EVO hook) |
| **Arterials / backbone** | streets = breadth-first paths gate → plaza with pure length cost, roads aim 1 000 units out (`_critic-os.md` §1.6 rows 63–68); live: `2N + 1` streets and roads for `gates = N` (`docs/CONFIDENCE.md` §0.2 #2, CONFIRMED) | proposal queue popped by priority, 15° per-vertex cap, locally orthogonal junctions, staged growth with pruning between stages, main roads re-extended to the border (`ftg-docs-params.md` §2.2–2.3; `_critic-ftg.md` §4 rows 7–9) | **FTG's staging and destinations, MFCG's "every gate gets a street to the plaza" as the destination rule**, routed as least-cost paths over a cost surface (slope, water, fabric, walls) instead of a proposal random walk | detour index ≤ 1.4, junction-angle p5 ≥ 30°, no 15° cliff in the turn distribution, arterial grade limits met (O4 b, d); **[TIEBREAKER]** applied: FTG's growth is the more constraint-driven shape, MFCG's plaza rule the more historical destination set |
| **Districts** | grown by `DistrictBuilder.fromPatch/fromVertex` seeds with `validatePatch/validateEdge` over cells, typed by location (central, docks, gate, sprawl) (`_critic.md` §3, `profile-mfcg.md` §4.7 via CONFIDENCE B9) | large district lots typed from the remaining roster and adjacency, merged below a 10 ha floor, split by inserted roads to a target area, landmarks placed first (`ftg-docs-params.md` §2.5; `_critic-ftg.md` F6, F17) | **FTG**: districts are first-class faces with a type chosen by a scored rule table reading the roster and the context vector; MFCG's location types survive as *scores* (docks on the waterfront, gate wards at gates) | every district carries type, venue mix and prosperity band (S1 contract 100 %); type entropy floors (R5) |
| **Blocks and streets inside districts** | ward → blocks by the two-level `Bisector` (OBB axis, bent cuts, `detectStraight`), ≈ 18.6 lots per block (`profile-mfcg.md` §4.9); NG's measured signature: OBB minor-axis direction, corner at the cut midpoint, right-angled arrival, T-junctions 361/361, w = a + b·L (`profile-neighbourhood.md` PF-3, BG-4) | "divide lots to area" by inserted straight roads until < 10 000 m² (`ftg-docs-params.md` §2.5); grid-like Continue branches | **MFCG/NG**: bent-cut recursion as the infill inside district faces, with FTG's area target as the stop predicate in m² | block-area and junction-degree distributions within the NG-measured bands on the same district shapes (O4 f); one bend at 0.5 ± 0.1 in ≥ 80 % of bent cuts, ≥ 85° arrival in ≥ 95 % (O3 restraint); crossroads > 0 and < 15 % |
| **Plots** | lots = second-level bisection; `filterInner` drops lots without frontage; `indentFronts` insets the block by a boolean; lots are painted as buildings (`profile-mfcg.md` §4.9; `mfcg-posts-b.md` §2.3–2.5; owner: "the illusion of buildings") | lot → plots by edge-driven strips (Dense / Gaps / Individually placed), 1.52 buildings per lot, entrances ≈ 3 m from the road on the frontage (`ftg-docs-params.md` §2.6; `_critic-ftg.md` §4 rows 15, 17) | **FTG's lot/plot/building separation** with **NG's bent lot cuts** along frontages, frontage-first, typed residue, no silent discard, and the owner's plot model on top (O5, O17, O18) | 100 % of plots with an access edge; coverage by class within table targets (FTG baseline 0.51–0.58 for every class); attached share ≥ 90 % in dense classes (NG 95–99 %) |
| **Buildings** | landmark `Building.create/getPlan` for 2–19 buildings per city, everything else is a lot; roofs by per-building straight skeleton (`profile-mfcg.md` §4.9, `docs/CONFIDENCE.md` §4.1 C2) | ≈ 10 × 10 m quads, templates for landmarks, entrances on the frontage; roofs by straight skeleton at render (`_critic-ftg.md` §4; `docs/CONFIDENCE.md` §4.4 C9, D3) | **both**, behind the building-generator interface: site plans (row / compound / detached / hovel) from data tables; footprints with storeys and heights; roofs by skeleton; the manor-class composition is stage 3 | every building with a purpose, an entrance and heights (100 %); footprint hash identical at every LOD (O17 g, i) |
| **Walls, gates, towers** | wall = smoothed circumference of walled cells; gates chosen among vertices touched by > 1 walled cell with neighbour exclusion; `gates = N` gives exactly N; towers on non-gate vertices; castle = a cell with a compactness gate and an equalize/bloat repair loop (`_critic-os.md` §1.5; `profile-mfcg.md` §4.4b, EG2) | wall = typed edges (wire type 7) on district-ring vertices after a growth stage (`placeWallAfter`, `wallPlacement`), towers a subset of wall vertices at ≈ 39 m median spacing, no gates drawn (`docs/CONFIDENCE.md` §3.4 C11, CONFIRMED) | **FTG's "wall after a growth stage on the built outline"** with **MFCG's gate discipline** (gates exactly where arterials cross the trace, explicit count honoured, towers by spacing rule, a keep with a compactness gate) — O8 | gates on arterials 100 %; wall traced within stage budget; several enceintes supported; conversions (wall → road) are graph operations (EVO) |
| **Castle, plaza, temple, harbour** | plaza = cell 0, citadel = cell n with 0.75 compactness; temple takes the smallest plaza-fronting cell; docks by `DocksGrower`, piers 1.2 ± h (`_critic-os.md` §1.7 row 79; `docs/CONFIDENCE.md` §4.1 B14, B18) | castle only under a feudal government, wall → fit → gatehouse → keep → moat/cliffs; harbour carved from the waterfront district with 12 piers of 75.6 m (`_critic-ftg.md` §1 F11, §3 #19) | **scored siting on the context vector** (defensibility = slope and water adjacency, centrality, wind) claiming joined plots before the fabric is cut (O18); MFCG's compactness gate kept as a shape gate; FTG's harbour-as-district kept | castle sited by score (reported), plaza at the arterial crossing nearest the centroid of demand, harbour on the waterfront face with the deepest water |
| **Content** | population ≈ 6.12 × buildings; wards are "hints" (`docs/IMPROVEMENTS.md` §1 item 4) | roster first: buildings and people from a dependency graph before any geometry, one-way handoff (`_critic-ftg.md` F14; `docs/CONFIDENCE.md` §4.4 B2) | **FTG's roster-first**, reconciled against the layout through the per-plot context vector in a bounded plan–fit–reconcile loop (O7); population is an *input* | 100 % function and occupancy; roster items unplaced = 0 (placement never gives up, O18 f) |
| **Hinterland** | farms by `Cutter.grid → splitField ≈ 12.6 per farm → round → getHousing`, furrows as hairline stripes; forests by Poisson tiles (`profile-mfcg.md` §4.9; CONFIDENCE B17, B19) | four farm layouts, forests as area fills at render, perimeter expand + round, natural reserves, climates (`_critic-ftg.md` F21; CONFIDENCE C14–C17) | **both**: field systems as data presets (MFCG's subdivided fields, FTG's farmsteads/perimeter/rivers), forests as owned area entities with seeded instancing at render | farmland per capita within band; every land component used (O14) |
| **Rendering** | one ink, four colours, casing w + 2h, per-ward texture cache, straight-skeleton roofs, curved labels on skeleton ridges (`visual-spec.md` §0.2, §1; `docs/CONFIDENCE.md` §4.1 C2, D2, E1–E2) | lit extrusions, textures, normal maps, day/night, post-process (`visual-spec.md` §4, §5) | **one semantic display list with LOD and style sheets**; ink preset default, lit preset second (O12; owner default) | style regression per LOD; the renderer survives no fills and no outlines (R13) |
| **Determinism** | one MINSTD stream, reseed per attempt, `save/restore`; permalink = seed + size + flags (`docs/CONFIDENCE.md` §4.1 A2) | `seed: null`, server-side, render-time fills (§4.4 A4) | **neither**: hash-derived sub-streams per (stage, entity, concern, attempt, epoch), stable ids, versioned recipe (O2) | locality ≥ 95 % on single-parameter edits (MFCG baseline: `gates` re-rolls everything to the name); model hash identical across machines |
| **Editing** | warp tools (8 vertex-level brushes), per-ward reroll, no save of edits (`docs/CONFIDENCE.md` §4.1 F1–F2; O9) | layout editor with snapping, fill tool, regenerate area (not undoable), bulk edit (§4.4 E1–E2) | **FTG's editor scope on MFCG's one-click base**, as an edit log on stable ids with locks, scoped regeneration and undo (O9) | save → load → save byte-identical; locked entities preserved 100 %; every operation undoable |
| **Failure policy** | tiered: repair (citadel), local retry (canal course), silent skip (street, cut), whole-city restart (canal; any geometry exception) (`profile-mfcg.md` §11, ST-8) | validation at the authoring boundary; V1 "would regularly give up"; shrink-then-split with no fallback (`docs/IMPROVEMENTS.md` O3) | **MFCG's tiers minus the restart tier**, with typed results, bounded ladders, substitution and a generation report (O3, §5) | whole-map restarts = 0; stage retries ≤ 2 % with p99 ≤ 3 attempts |

Where a genuinely new mechanism replaces both: the terrain-first site model (S1–S2), the memoised entity-keyed stage
graph that gives edit locality (§4.1, §7), the prosperity field and the one plot-granularity law (S9–S10), the plot
site-plan layer (S12) and the layer model (underground / ground / sky). None of these exists in any reference
(`docs/IMPROVEMENTS.md` §1 items 1–5).

**The rejected alternatives for the fused layout, in writing** (details and evidence in §4.4): (A) MFCG-only —
Voronoi wards with cell-edge roads: rejected because roads cannot end at destinations, growth cannot extend a partition
without re-partitioning, and the creator himself calls the maps "barely more than stylized Voronoi diagrams" (O4);
(B) FTG-only — proposal-queue growth for every tier: rejected because "most of the settlements in FTG look similar",
the 15° cap and flat heading spectrum are measured (`_critic-ftg.md` §4 rows 7, 9), the T-junction fabric that is most
of MFCG/NG's charm comes from recursion not growth, and the creator of MFCG measured road-first growth as slower
(devlog 31287 via O4); (C) growth for everything with bent cuts as a *proposal type*: rejected because the recursion is
what yields the measured "one bend at 0.5, right-angled arrival, T everywhere" statistics (PF-3) and a queue would have
to re-invent the recursion's balance; (D) partition seeded from a grown skeleton — **this is the chosen shape**: the
grown, destination-driven backbone provides the faces, and recursive bent-cut infill partitions each face. The risk the
MFCG creator named ("Merging these two techniques also seems problematic") is guarded by O4 (f): network + infill ≤ 100 ms
at CITY and block statistics inside the NG bands.

### 1.3 Stage 2 — the city composed of neighbourhoods (designed here to interface depth)

Because the base's districts are faces of the same planar graph that holds blocks, plots and alleys, a **neighbourhood
is not a second model but a higher LOD of the base's own district**, plus what NG adds at that scale: block interiors
(greens, groves, courts), pins (wells, fountains, trees), hatched roofs, chimneys, local street names, and the four NG
templates (area / street / square / ring) as *fabric strategies* a district can request (`_critic-vg-ng.md` V18–V20,
§2; `docs/CONFIDENCE.md` §4.3 B2–B8). The base must therefore already carry:

1. **The S1 seam contract on every district face**: a typed boundary ring (each edge typed street-with-class-and-width,
   water, wall, or open; portal points where ways cross; the shared edge geometry generated *once* by the base and owned
   by it, so two neighbourhoods never disagree about a shared street), the plot lines and alleys that touch the boundary,
   and the district's context (type, venue mix, prosperity samples along the boundary and inside, terrain samples).
2. **Seam-continuous fields (S3)**: prosperity, density and layout parameters are fields sampled per plot, jumping only
   at declared hard boundaries, so quarters blend (owner: PROSPERITY).
3. **The district's own sub-seed** (`H(seed, "district", districtId)`), from which every neighbourhood-level draw is
   derived, so regenerating one neighbourhood cannot touch another (§6).
4. **A `FabricStrategy` interface** (§4.5) with `BentCutFabric` as the base's default and `RingFabric` / `SquareFabric` /
   `StreetFabric` as stage-2 additions — the same interface a later village product could extend.
5. **The display list's LOD axis** with the neighbourhood tier (roof hatching, chimneys, pins, per-tree canopies) declared
   now and empty until stage 2 (§8).

The district → neighbourhood interface is specified in §4.9. Acceptance for readiness: every district of every B-CITY city
carries a complete S1 contract in the schema — 100 % — before any close-up generator exists (`docs/IMPROVEMENTS.md`
§5.5).

### 1.4 Village (VG-class) — left open, not designed

What the base leaves open for a later village product, and confirms it does not preclude: (a) the `FabricStrategy` and
`NetworkStrategy` interfaces admit a tracker-based road walk and a "no blocks, houses along ways" fabric (VG's
`buildAlong` placer, `docs/CONFIDENCE.md` §4.2 G8, G12) without touching the base; (b) the heightfield, drainage and
water stages are shared and already produce VG's inputs (a course-first river, a level-set pond, a density field can be
derived from the prosperity/density machinery); (c) fields, orchards, palisade and piers are hinterland entities the
base already types; (d) the size ladder is a separate table (THORP → HAMLET → VILLAGE), so nothing in the base's ladder
is hard-coded. Nothing in the base is paid for on the village's behalf: no tracker code, no VG style sheet, no village
grammar.

### 1.5 Tech stack (with reasons; no dependence on any existing project)

| choice | decision | reason |
|---|---|---|
| language | **TypeScript** (strict), ES2022 modules | the owner's default is browser-first embeddable; one language for model, render and app; typed contracts are the design's spine |
| runtime targets | browser (main thread + Web Workers), Node ≥ 20 for CLI/CI/headless export, optional WASM for hot kernel paths later | headless generation for B-CITY corpora and golden tests must run without a browser |
| numeric core | integer coordinates (cm) in `Int32Array`s, exact predicates in double arithmetic (bounded range), deterministic transcendental functions (§3.1, §6.4) | cross-platform model hash identity (O2 a, O3 e) |
| rendering backends | **SVG** (export and DOM inspection), **Canvas2D** (default screen), **WebGL2** (metropolis zoom and the lit preset), all from one display list (§8) | MFCG proves per-group caching keeps 46 000 fills at ≈ 590 uploads (`visual-spec.md` §1.1); FTG proves the lit look needs a GPU path (§4) |
| build | pnpm workspace monorepo, esbuild for the library bundles, Vite for the app, vitest for tests, fast-check for property tests, Playwright for visual regression | conventional, permissive, fast; nothing project-specific |
| data | rule tables as versioned JSON with provenance fields; schemas as JSON Schema generated from TypeScript types | the corpus phase calibrates tables; every value carries provenance (owner amendment 7) |
| persistence | a self-contained document (JSON, optionally gzip) = recipe + edit log + lifecycle state; no server required; an optional sync service is later | O9; FTG's server-side generation is the anti-pattern for embedding |
| dependencies | permissive licences only (MIT / ISC / BSD / Apache-2 / BSL-1 / CC0); no GPL/LGPL; list in §17 | owner default |

---

## §2 Domain model and schemas

### 2.1 Principles

1. **One planar subdivision is the spatial truth** for everything that has an outline on the ground: a half-edge
   structure (DCEL) on integer centimetre coordinates whose faces are districts, blocks, plots, courts, water bodies and
   fields, and whose edges are ways (streets, lanes, alleys), water outlines, wall lines, plot lines and the frame.
   FTG's one-graph substrate (streets, lot outlines, border, lanes, piers, water outline, walls are all typed edges of
   the same graph — `docs/CONFIDENCE.md` §4.4 C4, CONFIRMED) is adopted; MFCG's shared-`Point` identity topology
   (`os-geometry.md` §1.1) is replaced by the indexed arena the rewrite verdict there recommends.
2. **Every entity has a stable hierarchical id, a lifecycle, provenance and a version** (O2, O9; owner EVO/ASSIGN hooks).
3. **Buildings are not plots.** A plot is a parcel with owner, use, frontage and access that holds 0..n footprints and a
   typed yard; a footprint is a composition hook with heights (owner PLOT MODEL, HEIGHT).
4. **Layers** (underground / ground / sky) are a first-class axis on every spatial entity and on the display list.
5. **Rasters are entities too** (heightfield, drainage, prosperity, density): stored, editable, versioned, with their own
   sub-streams.
6. **Content (institutions, households, people, factions) references geometry by id and never the reverse**, so the map
   can be regenerated without deleting content and content can be regenerated without moving the map (O7, O9).

### 2.2 Identity, provenance, lifecycle

```ts
/** Hierarchical, stable, human-readable. Never a list position. */
type EntityId = string; // e.g. "d:3/b:7/p:2/f:1"  (district 3, block 7, plot 2, footprint 1)

interface Provenance {
  stage: StageId;            // which stage minted it
  streamKey: StreamKey;      // (seed, stage, entityPath, concern, attempt, epoch) — §6.2
  rules: RuleRef[];          // rule-table rows read (table id + version + row key)
  deps: EntityId[];          // entities whose state this one was derived from (the locality DAG, §7.2)
  generatorVersion: string;  // semver of the pipeline
  schemaVersion: string;
}

type Lifecycle =
  | 'generated' | 'edited' | 'pinned' | 'assigned'   // base
  | 'built' | 'altered' | 'converted' | 'demolished'; // evolution hook (owner)

interface EntityBase {
  id: EntityId;
  kind: EntityKind;
  layer: 'underground' | 'ground' | 'sky';
  lifecycle: Lifecycle;
  history: LifecycleEvent[];  // append-only: {epoch, event, cause: EditId | RuleRef | 'generation'}
  provenance: Provenance;
  revision: number;           // bumps on every mutation; part of the model hash
  attrs: Record<string, Scalar>; // typed per kind by the schema; open for host attributes
}
```

Id minting rule (§6.3): a child's ordinal is its index in the **deterministic creation order of its parent's stage run**,
which is a pure function of the parent's inputs and sub-stream; a regenerated region mints ordinals under a revision
suffix (`p:2@r2`) only when an ordinal would collide with a locked or edited entity. Ids therefore survive any edit that
does not change the entity's own derivation inputs (O2 d).

### 2.3 Spatial kernel types (the planar subdivision)

```ts
type Cm = number;             // integer centimetres; |x|,|y| < 2^23 (≈ 84 km) so orient2d is exact in doubles (§3.1)
interface Vec { x: Cm; y: Cm }

interface Vertex { id: number; p: Vec; halfEdge: number; snapGen: number }
interface HalfEdge { id: number; origin: number; twin: number; next: number; prev: number; face: number; edge: number }
interface Edge {
  id: number; entity: EntityId | null;      // the Way / WaterOutline / WallLine / PlotLine / Frame that owns it
  type: EdgeType;                            // 'way' | 'water' | 'wall' | 'plot' | 'frame' | 'district' | 'invisible'
  attrs: EdgeAttrs;                          // per type: way class, width, surface, one-sided flags
}
interface Face { id: number; entity: EntityId | null; outer: number; holes: number[]; kind: FaceKind }

/** The subdivision is one arena per layer: ground has districts/blocks/plots; underground has tunnels/chambers;
 *  sky has island outlines and their own nested ground-like arena (an island carries a sub-arena). */
interface Subdivision {
  layer: Layer;
  vertices: Arena<Vertex>; halfEdges: Arena<HalfEdge>; edges: Arena<Edge>; faces: Arena<Face>;
  index: SpatialIndex;       // flat R-tree over edges and faces, rebuilt incrementally
  weldTolerance: Cm;         // 25 cm default (§3.2)
}
```

Faces are **first-class records with stable ids that are never re-walked** after creation except through the
split/merge operations of §3.4, which preserve the ids of untouched faces (O3 c).

### 2.4 Terrain, hydrology and fields

```ts
interface Raster<T = number> { origin: Vec; cell: Cm; w: number; h: number; data: Float32Array | Int16Array; unit: string; id: EntityId }

interface Terrain extends EntityBase {
  height: Raster;            // metres, cell 2–10 m by size class (§12)
  controls: TerrainControl[];// ridge / valley / hollow / plateau primitives with their own sub-stream (VG's createMount/Hollow/Ridge/Crack idea, _critic-vg-ng V7)
  flowDir: Raster<number>;   // D8 direction, sinks filled
  accumulation: Raster;      // upstream cells
  outfalls: Outfall[];       // where flow leaves the frame or enters a water body — the sewer hook's query surface
  wind: { bearingDeg: number; strength: number }; // upwind/downwind for prosperity drivers
}

interface WaterBody extends EntityBase { kind: 'sea' | 'lake' | 'pond' | 'river' | 'canal' | 'moat' | 'harbourBasin'; face: number; depth: Raster | null; outline: RingRef; flowFrom?: EntityId; flowTo?: EntityId }
interface RiverCourse extends EntityBase { centreline: Polyline; widthProfile: Sample[]; inlet: Vec; outlet: Vec | EntityId; crossings: CrossingSite[] } // course first, terrain carved to it (VG V2)
interface Field2D extends EntityBase { kind: 'prosperity' | 'density' | 'landValue' | 'noise' | 'custom'; raster: Raster; perFace: Map<EntityId, number>; drivers: DriverTerm[]; randomShare: number; edits: FieldBrushStroke[] }
```

### 2.5 Ways, junctions, network

```ts
type WayClass = 'throughRoad' | 'primary' | 'secondary' | 'lane' | 'alley' | 'culDeSac' | 'track' | 'path' | 'pier' | 'bridge';
interface Way extends EntityBase {
  class: WayClass; widthM: number; surface: 'paved' | 'cobbled' | 'dirt' | 'plank';
  centreline: Polyline;                 // owns a chain of edges in the subdivision
  edges: number[];
  from: NodeRef; to: NodeRef;           // destinations: gate, plaza, bridge, harbour, external bearing, junction
  growthStage: number;                  // FTG-class stage / evolution epoch (EVO)
  name?: NameRef; slopeP95?: number;
}
interface Junction extends EntityBase { vertex: number; kind: 'T' | 'X' | 'Y' | 'end' | 'gate' | 'bridgeHead'; arms: EntityId[] }
```

### 2.6 Districts, blocks, plots, buildings

```ts
interface District extends EntityBase {
  face: number; type: DistrictType; venueMix: Record<VenueClass, number>;
  growthStage: number; prosperityBand: Band; prosperityStats: Stats;
  fabric: FabricStrategyId; fabricParams: Record<string, number>;   // the stage-2 strategy hook
  seam: SeamContract;               // §4.9 — typed boundary, portals, shared edges, plot lines, alleys touching the boundary
  subSeed: StreamKey;
}
interface Block extends EntityBase { face: number; district: EntityId; frontages: FrontageEdge[]; depthM: number; court?: EntityId }

interface Plot extends EntityBase {          // the PARCEL (owner ruling)
  face: number; block: EntityId;
  owner: EntityId | null;                    // household / business / institution from the roster
  use: PlotUse;                              // residential, workshop, inn, temple, manor, farmstead, market, …
  frontages: FrontageEdge[];                 // edges on ways, with the way class
  access: AccessEdge[];                      // ≥ 1 always (invariant); gate position along it
  depthM: number; areaM2: number; frontageM: number;
  partyWalls: { left: boolean; right: boolean };
  members?: EntityId[];                      // ids of the plots joined into this one (kept so a later split restores them — EVO)
  context: PlotContext;                      // §2.7
  sitePlan: SitePlan | null;                 // §4.7; derived lazily and cached with its own sub-stream
  footprints: EntityId[];                    // 0..n Building ids
  yard: YardArea[];                          // typed sub-areas: yard, garden, court, orchard, midden, pen, vacant
  assignment?: AssignmentRef;                // ASSIGN hook: precedence over class rules, drift bounds
}

interface Building extends EntityBase {      // one FOOTPRINT on a plot
  plot: EntityId; footprint: Ring; class: BuildingClass;   // hovel, cottage, house, hall, manor, workshop, inn, temple, keep, …
  use: VenueClass; storeys: number;
  heights: { eaveM: number; ridgeM: number; towerM?: number };   // owner HEIGHT — carried even though unseen
  entrance: { edgeIndex: number; t: number };                      // on the outline, facing an access edge
  roof: { kind: 'hip' | 'gable' | 'flat' | 'cone' | 'dome'; ridge?: Polyline };
  composition: CompositionRef | null;        // stage-3 hook: lazily generated wings/roofs/rooms from the plot's sub-seed
  wings?: Wing[];                            // present only when the composition has been generated (LOD ≥ neighbourhood)
  occupants: EntityId[];                     // households / businesses (content references geometry, §2.1 rule 6)
}
interface Wing { footprint: Ring; heights: { eaveM: number; ridgeM: number }; roof: RoofSpec; rooms?: Room[] }
```

### 2.7 The per-plot context vector (the hook every rule table reads)

```ts
interface PlotContext {
  areaM2: number; frontageM: number; depthM: number; shape: { obbAspect: number; compactness: number; corner: boolean; wedge: boolean };
  frontageClass: WayClass; frontageWidthM: number;
  districtType: DistrictType; venueMix: Record<VenueClass, number>;
  prosperity: number; prosperityBand: Band;            // continuous value and the banded class
  distM: { centre: number; plaza: number; market: number; gate: number; wall: number; water: number; harbour: number };
  upstream: number;                                   // position along drainage (0 = upstream) — noxious-trade siting, sewers
  slopeDeg: number; elevationM: number; upwind: number;
  terrain: 'dry' | 'damp' | 'floodProne' | 'rock';
  growthStage: number; epoch: number;
  assignment?: AssignmentRef; rosterDemand?: Record<VenueClass, number>;
}
```

### 2.8 Fortification, greenery, hinterland, labels, entities

```ts
interface WallLine extends EntityBase { trace: Polyline; edges: number[]; kind: 'curtain' | 'castle' | 'palisade' | 'moat'; growthStage: number; thicknessM: number; heightM: number; towers: EntityId[]; gates: EntityId[] }
interface Gate extends EntityBase { wall: EntityId; way: EntityId; vertex: number; kind: 'land' | 'water'; widthM: number }
interface Tower extends EntityBase { wall: EntityId; vertex: number; radiusM: number; heightM: number }
interface Castle extends EntityBase { plot: EntityId; bailey: Ring; keep: EntityId; wall: EntityId; moat?: EntityId }

interface GreenArea extends EntityBase { kind: 'park' | 'garden' | 'orchard' | 'green' | 'avenue' | 'grove' | 'yardPlanting' | 'forest'; face?: number; ring: Ring; owner?: EntityId; density: number; treeStream: StreamKey } // trees instanced at render from treeStream, never stored (O2)
interface FieldSystem extends EntityBase { preset: 'subdivided' | 'farmsteads' | 'perimeter' | 'rivers'; fields: EntityId[]; farmsteads: EntityId[] }
interface Label extends EntityBase { target: EntityId; text: string; kind: 'district' | 'way' | 'water' | 'landmark' | 'title'; spine?: Polyline; priority: number; locked: boolean }

interface Institution extends EntityBase { class: VenueClass; name: NameRef; plot: EntityId; buildings: EntityId[]; staff: EntityId[]; faction?: EntityId }
interface Household extends EntityBase { plot: EntityId; members: EntityId[]; wealth: number }
interface Person extends EntityBase { household: EntityId; role: string; job?: EntityId; derived: boolean } // derived lazily from building ids and pinned once seen (O7)
interface Faction extends EntityBase { kind: 'guild' | 'religion' | 'noble' | 'military' | 'criminal'; seats: EntityId[]; influence: number }
```

### 2.9 Layers (the sewer and floating-island hooks)

```ts
interface LayerSpec { id: 'underground' | 'ground' | 'sky'; zOrder: number; elevationM: number; visible: boolean; castsShadowOnto?: Layer; exportSeparately: boolean }
interface SkyIsland extends EntityBase { outline: Ring; elevationM: number; terrain?: Terrain; subdivision: Subdivision; districts: EntityId[]; reason: 'prosperity' | 'institution'; institution?: EntityId } // hooks only; outline from the coast machinery (§4.2)
interface Tunnel extends EntityBase { centreline: Polyline; widthM: number; follows?: EntityId; outfall?: Outfall }           // hooks only
```

### 2.10 The document, the recipe and the edit log

```ts
interface Recipe { generatorVersion: string; rulesVersion: string; styleVersion: string; schemaVersion: string; seed: Seed64; params: ParamVector; assignments: Assignment[]; circumstances?: CircumstanceTimeline }
interface Document {
  recipe: Recipe;
  edits: EditEvent[];                 // ordered, on stable ids (§7)
  model: SettlementModel;             // materialised entities (may be omitted: recipe + edits replays it)
  locks: Set<EntityId>;
  report: GenerationReport;           // §5.6
  stats: StatisticsRecord;            // O6: per-class distributions with provenance
  modelHash: string;
}
```

**Serialisation formats.** (1) Native JSON (`.burgh.json`, schema-versioned, round-trip: the document above with
rasters as base64 typed arrays); (2) a compact binary (CBOR with typed-array tags) for large cities and permalinks
that must carry edits; (3) the view formats of §11 (GeoJSON, SVG, PNG, VTT, glTF) which are exports, not the truth.
Migration between schema versions is a versioned chain of pure functions over the document (§7.6).

---

## §3 Geometry kernel — geometry as a service

The kernel is a library the stages call; it never draws randomness itself (the 2017 ancestor's geometry layer also
draws nothing from `Random`, `_critic-os.md` §4.1 — the one property of it worth keeping unchanged). Every primitive
declares preconditions and returns a typed result:

```ts
type GeomResult<T> =
  | { ok: true; value: T; warnings: GeomWarning[] }
  | { ok: false; code: DegeneracyCode; detail: string; partial?: T };   // never throws for a geometric reason
type DegeneracyCode = 'EMPTY' | 'SELF_INTERSECTING' | 'SLIVER' | 'NOT_TWO_CROSSINGS' | 'NON_CONVEX' | 'COLLINEAR'
  | 'BELOW_MIN_AREA' | 'BELOW_MIN_WIDTH' | 'NO_PATH' | 'TIMEOUT' | 'OUT_OF_RANGE';
```

### 3.1 Numeric policy

* **Coordinates are integer centimetres** in `Int32Array` arenas, centred on (0,0), +x east, +y north (FTG's convention,
  CONFIRMED `_critic-ftg.md` F1). Range invariant `|x|, |y| < 2^23` (≈ 84 km; a METROPOLIS frame is ≈ 10 km). With that
  bound every difference is < 2^24 and every `orient2d` term < 2^49, so the sign of `orient2d` is **exact in ordinary
  double arithmetic** — no BigInt, no adaptive filter, no epsilon. Segment intersection, point-in-polygon, left/right
  tests, convex hull, OBB and the planar-subdivision insertion all reduce to `orient2d` and integer comparisons.
* **`incircle`** (Delaunay) needs degree-4 terms and is not exact in doubles at this range; it is used only in the
  non-topological paths (seed clouds, Lloyd relaxation, terrain TIN, label medial axes) through a robust adaptive
  predicate library (§3.3). No topology decision depends on `incircle`.
* **Intersections are snapped** to the integer grid on creation (snap rounding) and welded to any vertex within the
  weld tolerance (25 cm default, a per-size-class parameter). Snap rounding can create a new incidence (an edge passing
  through a rounded vertex's cell); the insertion routine iterates split-and-snap until stable (bounded by 3 rounds in
  practice; the round count is reported and a `TIMEOUT` result returned if the bound is exceeded).
* **Tolerances are world-space metres, never parameter-space** (the 2017 `buffer`'s `DELTA = 1e-6` in parameter space is
  the anti-pattern, `os-geometry.md` §4 item 6). Minimum edge 25 cm, minimum plot width 2.5 m, minimum face area by kind,
  minimum interior angle 12° for plots (FTG's sheared quads at p95 22.9° corner deviation are kept legal — invariants
  police validity, not regularity, O3 restraint).
* **Floats are allowed for fields, costs, weights and rendering**, under the deterministic-math rule of §6.4 (no
  `Math.sin/cos/exp/log/pow/atan2` in model code; our own `dmath` implementations; IEEE `+ − × ÷ sqrt` are exact by spec).
  Any float that decides a topology operation is quantised to integer centimetres or to a 16-bit binary angle first.

### 3.2 The planar subdivision (build)

The DCEL of §2.3 is the core asset and is **built, not adopted** — no permissively licensed JavaScript library offers an
integer, snap-rounded, incrementally face-maintaining planar subdivision with stable face ids. Operations, each a
`GeomResult` and each covered by property tests (§13.1):

| operation | semantics | degenerate input |
|---|---|---|
| `insertPolyline(pts, edgeType, attrs)` | split every crossed edge at the snapped crossing, weld within tolerance, create edges, re-walk only the cycles touching the new edges, mint faces for the new cycles; an existing face split in two keeps its id on the larger part and mints the other (FTG's "potentially the one that was just split in two", `ftg-docs-params.md` §2.1) | zero-length after snap → dropped with a warning; a polyline that re-crosses itself is split into simple runs first |
| `removeEdges(ids)` | merge faces across removed edges (the larger id survives), drop isolated vertices | a removal that would leave a dangling chain inside a face keeps it as a `cul-de-sac` edge or removes it per flag |
| `retypeEdges(ids, type)` | wall → way, invisible → way, etc. (the EVO conversion primitive) | — |
| `faceRing(id)` / `faceHoles(id)` | rings as integer arrays, CCW outer, CW holes | — |
| `splitFace(id, cutPolyline)` | `insertPolyline` restricted to one face with exactly-two-boundary-crossings enforced (`NOT_TWO_CROSSINGS` otherwise — the 2017 silent no-op is replaced by a typed failure, `_critic-os.md` §2 C1) | — |
| `mergeFaces(a, b)` | remove the shared edges (must exist) | non-adjacent → `EMPTY` |
| `weld(v1, v2)` | move to the midpoint, rebind (the 2017 `optimizeJunctions` threshold-8-units idea, `_critic-os.md` §1.4, in metres) | — |
| `query(rect | point)` | via the spatial index (a uniform grid per layer sized to the mean edge length, plus a flat R-tree for faces) | — |

Consistency invariants checked after every batch (debug builds always, release builds per stage): every half-edge's
`twin.twin` is itself, `next.prev` is itself, each face's outer cycle is CCW with positive area, no two edges cross
except at a shared vertex, no vertex within the weld tolerance of another, no edge shorter than the minimum.

### 3.3 Build versus adopt, per primitive

| primitive | decision | candidate library (licence) | degenerate input handling |
|---|---|---|---|
| exact `orient2d` | **build** (integer bound makes it trivial) | — | — |
| `incircle`, Delaunay/Voronoi | **adopt** | `delaunator` (ISC), `d3-delaunay` (ISC), `robust-predicates` (Unlicense/ISC — verify at adoption) | duplicate points deduplicated by integer key; collinear clouds get two jittered frame points; never on the topology path |
| polygon booleans (∪ ∩ − ⊕) | **adopt** | `clipper2` via a TypeScript/WASM port (Boost Software Licence 1.0) — integer-native, matches the numeric policy; fallback `polygon-clipping` (MIT, Martinez–Rueda) if the port fails the fuzz suite | integer inputs; outputs snapped; slivers below the class minimum returned as typed `SLIVER` residue, never silently kept |
| offsetting / insetting | **adopt + build**: Clipper2 offset for concave rings (round / miter joins as style data); our own half-plane inset for convex faces with a per-edge distance (the 2017 `shrink` and `getCityBlock` "inset each edge by half the adjoining street width" idea, kept as the cheap exact path, `os-geometry.md` §5) | Clipper2 | convexity is an explicit precondition of the half-plane path (`NON_CONVEX` result → concave path); an inset that empties the face returns `EMPTY` with the last non-empty distance |
| straight skeleton (roofs, label spines, mountain ridges) | **build** (weighted, hole-aware, on integer input; wavefront with an event queue; the creator's own is a naive O(n²) that "glitches in special cases", `docs/CONFIDENCE.md` §3.1 C2 — we do not reproduce the glitches). Adopt only if a permissively licensed port passes B-FUZZ | ports of Felkel–Obdržálek / CampSkeleton exist in JS with licences to verify; none is assumed | near-parallel edges → merged events at the tolerance; a failed skeleton falls back to the medial axis of edge samples (Voronoi-based) for labels and to a hip-by-inset-loop for roofs |
| OBB, convex hull | **build** (Andrew monotone chain + rotating calipers) | — | collinear → a degenerate OBB with zero minor extent, reported |
| Poisson-disc | **build** (Bridson with the reference-measured k = 50 "evaluate all candidates" variant as an option, `_critic.md` C2; domain-warped variant for organic wood edges) | — | — |
| noise | **adopt** | `simplex-noise` (MIT) or `open-simplex-noise` (Unlicense); fBm, domain warp and ridged variants ours | seeded from a sub-stream; only integer/float arithmetic inside (verified deterministic) |
| splines / smoothing / simplification | **build**: Chaikin, centripetal Catmull-Rom → cubic Bézier, pinned-vertex Laplacian (`(prev + f·v + next)/(2 + f)`, the 2017 smoother `_critic-os.md` §1.5 row 41), Visvalingam–Whyatt | — | endpoints pinned; smoothing never moves a vertex across another edge (checked, else the step is halved) |
| spatial index | **adopt + build** | `rbush` (MIT) for dynamic entities, `flatbush` (ISC) for static bulk queries, a uniform grid ours | — |
| triangulation (interpolation, rendering) | **adopt** | `earcut` (ISC) | holes handled; degenerate → skipped triangles reported |
| contours / level sets | **adopt** | `d3-contour` (ISC) for marching squares on rasters | — |
| path search | **build** (binary-heap A\* / Dijkstra on rasters and on the subdivision graph; the 2017 "A\*" is a FIFO BFS, `_critic-os.md` §1.6 row 68, not reproduced) | — | `NO_PATH` result with the closest reached point |
| hashing / RNG | **build** (§6.1) | — | — |

### 3.4 The subdivision operations the pipeline is written in

Every stage that changes the ground plan does so through six operations, all transactional (a stage's batch either
commits with invariants satisfied or is rolled back to the pre-stage snapshot and the fallback ladder takes over, §5):
`insertWay`, `splitFaceBent` (the bent cut, §4.5), `mergeFaces`, `claimSubFace` (cut a required area out of a face for
an institution, §4.6), `retypeEdges` (conversions), `insetFace` (setbacks, courts). Because these are the only writers,
planarity (O3 c) is a property of six functions, not of every stage.

---

## §4 Generation pipeline

### 4.1 The stage graph and its evaluation model

The pipeline is a **DAG of typed stages** evaluated by a memoising engine (build-system semantics, in the spirit of
Salsa/Adapton): a stage is a pure function `(inputs, params, subStream) → outputs` over entity collections; every
output records its `deps`; the engine re-evaluates a stage only for the scope whose inputs changed. This one mechanism
gives (a) one-click generation (evaluate the root), (b) incremental growth (a new epoch is a new input; untouched
entities are not re-derived), (c) edit locality (an edit invalidates the closure of its dependants and nothing else,
§7.2), (d) parallelism (independent stages run in workers), and (e) the generation report (every stage returns its
counters). The stages are the same functions in all three modes; MFCG's "everything re-rolls on any change" and FTG's
"regenerate area cannot be undone" are both absent by construction.

```
                     S0 Recipe/Blueprint (seed, params, version, assignments, edit log)
                                    │
   ┌────────────────────────────────┼──────────────────────────────┐
   ▼                                ▼                              ▼
 S1 Terrain ──► S2 Water ──► S3 Site & Intent ──► S4 Anchors      S15b Naming tables (independent)
 (height, drainage)  (coast, rivers, lakes,   (centre, character,  (plaza, castle, temple,
                      crossings, harbour site) manifest, budget)    harbour, external bearings)
                                                     │
                                                     ▼
                                     S5 Backbone network (per growth stage k)
                                                     │
                                                     ▼
                                     S6 Districts (faces → merge/split → typing)
                                                     │
                     ┌───────────────────────────────┼──────────────────────┐
                     ▼                               ▼                      ▼
             S7 Fortification (after stage k)   S9 Prosperity field   S8 Fabric (blocks, streets, lanes, alleys)
                     │                               │                      │
                     └──────────────► S10 Plots (frontage-first; join/split; claims first) ◄──┘
                                                     │
                                     S11 Content siting (roster → plots; owners, uses)
                                                     │
                                     S12 Site plans (footprints, yards, heights, roofs)
                                                     │
                     ┌───────────────────────────────┼──────────────────────┐
                     ▼                               ▼                      ▼
             S13 Greenery                    S14 Hinterland           S15 Names & labels
             (parks, gardens, yards)         (fields, forests,        (grammar, spines, collision)
                                              outskirts, roads out)
                                                     │
                                                     ▼
                                     S16 Display list + LOD ──► S17 Report & statistics
```

```ts
interface Stage<I, O> {
  id: StageId; version: string;                       // a stage's version is part of the model hash
  inputs: (model: Model, scope: Scope) => I;          // typed selectors over entity collections
  run: (input: I, params: ParamView, rng: SubStreamFactory, geom: Kernel, report: StageReport) => StageResult<O>;
  invariants: Invariant[];                            // checked after run; failures enter the ladder (§5)
  budgetMs: Record<SizeClass, number>;                // §12
}
type Scope = { kind: 'all' } | { kind: 'region'; ring: Ring; layer: Layer } | { kind: 'entities'; ids: EntityId[] } | { kind: 'epoch'; epoch: number };
```

Stage inputs and outputs (typed; the schema types of §2):

| stage | inputs | outputs | strategy interface |
|---|---|---|---|
| S0 Recipe | seed, params, version, assignments, edit log | `Blueprint` (validated, defaults resolved, provenance of every auto-resolved value — O16-core) | — |
| S1 Terrain | blueprint (size class, relief character, frame) | `Terrain` (height, controls, flowDir, accumulation, outfalls, wind) | `TerrainStrategy` (fBm + controls; flat) |
| S2 Water | terrain, water intent (none / coast / river / lake / combinations, sea bearing) | `WaterBody[]`, `RiverCourse[]`, land components, crossing sites, harbour site candidates | `CoastStrategy`, `RiverStrategy` |
| S3 Site & Intent | terrain, water, size ladder, character vector, roster tables | `Site` (centre, extent per growth stage, area budget), `Manifest` (roster demand per venue class, population) | `ManifestStrategy` (roster-first, FTG-class; population-only, MFCG-class) |
| S4 Anchors | site, manifest, water | anchor points and reserved claims: plaza, castle, temple, harbour, market, external destinations (bearings) | `AnchorScorer` (rule table) |
| S5 Backbone | anchors, terrain cost surface, water crossings, existing network (epoch > 0) | `Way[]` (throughRoad, primary), `Junction[]`, the subdivision's arterial faces | `NetworkStrategy` (destination-driven least-cost; FTG-style proposal growth as an alternative for the `american`/`ringed` presets; tracker walk reserved for the village) |
| S6 Districts | arterial faces, extent, manifest, prosperity drivers, water | `District[]` typed, with seam contracts | `DistrictTyper` (rule table), `DistrictSplitter` (bent-cut to the area band) |
| S7 Fortification | districts of stage k, terrain, water, arterials, gate count | `WallLine`, `Gate[]`, `Tower[]`, `Castle` | `WallTracer`, `GateRule`, `TowerRule` |
| S8 Fabric | districts (faces, seams, type, params), claims | `Block[]`, `Way[]` (secondary, lane, alley), `Junction[]` | `FabricStrategy` (`BentCutFabric` base; NG templates in stage 2) |
| S9 Prosperity | terrain, water, network, anchors, districts, roster institutions, edits | `Field2D` prosperity (+ density, land value) | `FieldDrivers` (rule table) |
| S10 Plots | blocks, prosperity, claims, assignments, granularity tables | `Plot[]` with context vectors, access edges, alleys inserted | `PlotStrategy` (frontage-first + JOIN/SPLIT law) |
| S11 Content siting | plots, manifest, assignments | plot owners and uses, `Institution[]`, `Household[]` (people lazy) | `SitingSolver` (rule-based, bounded plan–fit–reconcile) |
| S12 Site plans | plots with owners/uses, class tables | `SitePlan`, `Building[]` (footprints, heights, roofs, entrances), yards | `SitePlanStrategy`; `BuildingGenerator` (stage-3 hook; `TrivialOutlineBuilder` now) |
| S13 Greenery | plots, districts, prosperity, water | `GreenArea[]` | `GreeneryRules` (table) |
| S14 Hinterland | site, terrain, water, network, population, extent | `FieldSystem`, `GreenArea` (forests), outskirts plots and ways, roads to the frame | `FieldSystemPreset`, `OutskirtsRule` |
| S15 Names & labels | every named entity, water, districts, ways, grammar tables | `NameRef`s, `Label[]` with spines | `NameGrammar`, `LabelPlacer` |
| S16 Display list | all entities, style sheet, LOD request, layer toggles | `DisplayList` | `StyleSheet` (§8) |
| S17 Report | every stage's counters and invariant results | `GenerationReport`, `StatisticsRecord` | — |

**Evaluation order and parallelism.** S1 → S2 → S3 → S4 → S5 are sequential (each needs the previous). S6 and S9 can
run concurrently after S5 (S9's district-type term is applied in a second S9 pass after S6). S7 runs after S6 for the
stage being walled; S8 for districts not intersecting the wall trace can start before S7 finishes (the trace only
touches the boundary faces, whose seams are marked `pending-wall`). S10–S12 are per-district and run in parallel
workers (each district has its own sub-stream, so order does not matter). S13–S15 are per-entity fan-outs. S15b
(naming tables) is independent. The critical path at CITY is S1–S8 (§12).

### 4.2 S1–S2: terrain and water, first — the mechanism that removes whole-map restarts

**Terrain** (design from relayed evidence for VG; the mechanism is ours): a heightfield in metres at a cell size by size
class (10 m TOWN, 10 m CITY, 20 m METROPOLIS; refined to 2.5 m inside the built extent for slope queries) from a
5-octave fBm with a low base frequency (VG's recorded 5-octave field, `_critic-vg-ng.md` V7) plus **control primitives**
placed by intent (a valley along the requested river bearing, a ridge or knoll for a defensible site, a plateau for a
flat town, a hollow for a lake — VG's `createMount/Hollow/Ridge/Crack` idea, V7/V8), then **sink filling and D8 flow
direction / accumulation** (the drainage that the sewer hook queries; O1). The relief amplitude is a character
parameter (flat / rolling / hilly / mountainous) with metres per class.

**Water.** Order: (1) **coast**: from a sea bearing and an intent (bay / headland / straight / fjord / islands) a
closed-outline routine draws the sea polygon — a base line at the bearing displaced by domain-warped fBm with an
amplitude envelope ("ease into detail" near the town, FTG C1 relayed), then the heightfield is lowered below sea level
on the sea side so contours and coast agree by construction (R11: contours cross water 0 times). The same routine with
a closed base curve produces **lakes** (from sinks in the field) and **islands** (a closed oval base curve raised above
sea level — the floating-island outline of the LAYER hook uses exactly this routine with `elevationM` set, §2.9).
(2) **Rivers by descent**: the inlet is chosen on the frame's upstream edge (from the requested bearing or the highest
frame edge), the course is traced by steepest descent with a lateral meander term (a Chaikin-smoothed control polyline
with alternating offsets, the VG construction relayed in `_critic-vg-ng.md` V9), the terrain is **carved to the course**
(V2: course first, terrain follows) so the river always reaches the sea, a lake or the frame; channel width grows with
accumulation (a data-table exponent, calibrated later); tributaries by the same rule from secondary inlets; a
`deltaRiver`-style widened mouth is a width-profile rule, not a multi-channel delta (`_critic.md` C15). (3) **Crossing
sites**: where the channel is narrowest/shallowest within a search band, marked `ford` (width < table) or `bridgeSite`;
a minimum spacing between bridges (FTG default 40 m, `_critic-ftg.md` F19) is a table value. (4) **Harbour site
candidates**: coast faces with depth ≥ threshold within the extent. (5) Water outlines are inserted into the ground
subdivision as `water` edges (FTG's edge type 14 idea, F9) so every later face is bounded by water where it should be.

**Why this removes the restart tier**: MFCG fits a canal *into* an existing city and restarts the whole city when no
course validates (7 of 10 attempts at size 80, `profile-mfcg.md` §11) — here the site is placed *relative to* the
river (S3 scores candidate centres by proximity to a crossing site), so "no river through the core" cannot happen when a
river is requested; the invariant "river within the core when requested" is checked at S3, and a violation is repaired by
moving the centre, never by re-rolling the world (§5).

### 4.3 S3–S4: site, intent, manifest and anchors

**Site**: candidate centres on a coarse lattice inside the frame's middle third are scored by a rule table — distance to
a crossing site (river towns sit at fords/bridges), to the coast harbour candidate, slope (flat enough), elevation
relative to the flood line, wind exposure, distance from the frame — plus a controlled random term; the best is the
centre. The built extent per growth stage k is an area budget derived from the manifest (population → dwellings →
plots → hectares by the density regime of stage k: dense core, gapped rings, ribbon suburbs — FTG's zonal gradient,
`docs/IMPROVEMENTS.md` §4 R4) — **feasibility by construction** (O3).

**Manifest (FTG-class roster, our own tables)**: population is an input (from the size class or the user); the roster is
solved from a dependency graph of venue classes with per-capita ratios (`oneBuildingPerNPeople`), per-other-building
ratios and minimum counts — the *shape* of FTG's documented loop (`docs/CONFIDENCE.md` §4.4 B2; the values are ours),
run as a fixed-point iteration over a virtual population until the employed share stabilises. Output: demand per venue
class, each with an area/frontage requirement class, a district affinity vector and a wealth band. In the one-click path
this happens with no questions; the character vector (mercantile / ecclesiastic / military / agrarian / squalid …)
shifts the ratios (O10 should-have; the input schema is a must-have hook).

**Anchors**: plaza/market at the scored point nearest the demand centroid on the arterial-to-be (S4 marks it; S5 routes
through it); castle site by defensibility score (slope, water adjacency, height, distance to the centre within a band;
MFCG's `urban_castle` flag becomes the "inside / on the enceinte / outside" option); temple near the plaza (MFCG's
"smallest plaza-fronting cell" is replaced by a claim sized from the roster); harbour on the deepest waterfront face;
external destinations = bearings (from the blueprint or derived from the frame's roads: a river town has a road along
each bank; a coastal town a coast road) — these are the through-road destinations O4 (a) requires.

### 4.4 S5: the backbone network — FTG's staging and destinations, routed as least-cost paths

**Cost surface** (raster at the terrain cell): slope penalty per way class (through-roads ≤ 8 % grade preferred, lanes
tolerate more; table), water impassable except at crossing sites (bridge cost by span), existing fabric cost (epoch > 0:
crossing a built face costs by its class, so growth reuses streets), wall-crossing cost (only at gates), land value.

**Stage 0 arterials**: for each external bearing, route from the plaza to the frame edge at that bearing with A\* on the
cost surface; for each crossing site an arterial from the plaza; harbour ↔ plaza; castle ↔ plaza. Paths are simplified
(Visvalingam) and smoothed (centripetal Catmull-Rom) with a **curvature-continuity constraint** instead of FTG's 15°
per-vertex clamp (the measured turn-distribution cliff at 15–16°, `_critic-ftg.md` §4 row 7, is the weakness; O4 b),
then inserted into the subdivision (split-on-cross, weld). Junction rules: minimum crossing angle 30°, junctions closer
than a spacing threshold are merged (weld), Y-junctions are converted to T where the acute arm can be bent within its
class's curvature limit.

**Growth stages k = 1…K** (FTG's stages, `ftg-docs-params.md` §2.3; our own budgets): stage k has a ring extent from
the area budget; **primary connectors** are added between arterials inside the ring at a spacing by density regime
(tighter in the core) — each connector is a least-cost path between two arterial points chosen to minimise the largest
face, so the arterial faces reach the district-area band with few connectors; between stages, dead-end connectors are
pruned and arterials are trimmed to the extent (FTG's between-stage rule). Roads outside the last stage continue to the
frame as `throughRoad` (they must leave to destinations; the outer margin is the context of O14).

**Why least-cost paths rather than a proposal queue**: destinations (O4 a), grade limits (O4 d), a natural extension
mechanism (a new epoch adds destinations and connectors on the same cost surface — EVO) and measurable detour indices.
What is kept from FTG: staging with budgets, pruning between stages, main/normal/suburb hierarchy, locally orthogonal
junctions where the connector meets an arterial (the connector's last segment is bent to arrive within 90° ± 15°, the
FTG-measured junction law, `_critic-ftg.md` §4 row 8), real-metre segment lengths, the `ringed` and `american`
presets as `NetworkStrategy` variants (a proposal-queue strategy is provided for them, with the queue discipline FTG
documents: lowest priority first, branch after N segments, legality = separation / snap / not-in-water). The
road-first prototype risk the MFCG creator named is guarded by O4 (f).

### 4.5 S6 and S8: districts and the bent-cut fabric — one recursive engine, three stop predicates

The **bent-cut engine** is written once and used at three levels with different widths and stop predicates — MFCG runs
the same `Bisector` twice (ward → blocks, block → lots, `profile-mfcg.md` §4.9) and its creator states the primitive
serves both districts and buildings (`watabou-extra-a.md` §2.1). Construction, from the measured NG signature
(`profile-neighbourhood.md` BG-4, PF-3 — CONFIRMED distributions, OPEN constants; ours are data):

1. Take the face's OBB (convex hull + rotating calipers); the cut runs along the **minor axis**, crossing the major axis
   at a position drawn from a clamped distribution centred at 0.5 (PF-3: 0.40–0.60 in 66 %, mode at the middle; our
   table: normal σ = 0.08 clamped to [0.35, 0.65]).
2. Start on one of the two major-parallel sides (PF-3: 88 %; the side is a coin flip from the sub-stream) and **leave
   perpendicular** to that edge.
3. If a straight cut would arrive within 2.3° of perpendicular at the far edge, keep it straight along the mean of the two
   edge normals; otherwise put **one corner at the midpoint of the course** so the second leg arrives perpendicular to the
   far edge (BG-4 steps 2–3; PF-3 rule 2: corner at |t − 0.5| ≤ 0.10 in 82 %).
4. With probability p_arc (table, ≈ 0.5 — PF-3 item 4: undecided by geometry) replace the corner by an equal-chord
   circular fillet (chord ≈ 30–44 model units in NG; ours in metres by way class).
5. Give the cut its **width by class** (street/lane/alley from the table with jitter; NG's `w = a + b·L` is replaced by
   the role law of O4 c) and carve the corridor from both children (NG's corridor subtraction, `_critic-vg-ng.md` V19).
6. A cut may **continue across an existing street** when the continuation is collinear within 6° and the crossed street
   is of lower or equal class — that yields the rare crossroads (O4 b: 4-way share > 0 and < 15 %).
7. Validate both children (simple, area ≥ min, minor extent ≥ min width, no interior angle < 12°); on failure the ladder
   of §5.3 runs (alternative position → straight cut → axis cut → substitution).

Stop predicates: **district level** (S6) — the face area is within the district band (5–15 ha by size class; FTG's
10 ha merge floor and 10 000 m² divide-to-area are the anchors, `_critic-ftg.md` F6, `ftg-docs-params.md` §2.5);
faces below the floor are merged into the neighbour with the longest shared edge. **Block level** (S8) — the OBB minor
extent ≤ 2 × (plot depth band max) + court allowance for the district's class, and the area ≤ the block-area band (NG's
`isSmallEnough` is an OBB-dimension test per `profile-mfcg.md` §4.9; its law is unknown, ours is the depth-band rule
which the plot model motivates). **Plot level** (S10) — frontage width band (§4.6).

**Blocks** are the faces after the block level; their frontages are the block edges on ways (typed with the way class).
**Alleys and back lanes** are inserted at S10 when a block is deeper than its class's depth band (the rear plots need
access) or when a merge creates landlocked plots — typed `alley` ways in the same graph, drawn by LOD (unstroked gaps at
city zoom as MFCG's intramural streets are; stroked at neighbourhood zoom; `docs/IMPROVEMENTS.md` O18 (3)).

**District typing** (S6): a score table over the context vector of the face (waterfront → docks/harbour; adjacent to a
gate → gate ward; central → market/merchant; upstream and upwind on high ground → patrician; downstream, downwind, damp
→ tanners/poor; near the castle → military/administration) times the remaining roster demand per class, plus a random
term; faces are typed greedily from the largest, with a mixed-use floor so no district is single-use unless requested
(R5). MFCG's location types survive as scores; FTG's "remaining unplaced buildings and what the lot is next to" is the
same idea stated (`ftg-docs-params.md` §2.5). A shanty/squalid type is allowed only after the first half of the stages
(FTG's staging rule) and only outside the enceinte.

### 4.6 S9–S10: the prosperity field and the plots (JOIN/SPLIT, one law)

**Prosperity field** (owner ruling; O18): `P(x) = Σ_i w_i · kernel_i(x) + character offsets + ε(x)`, with driver kernels
from a table (distance decay to the plaza/market, main streets, gates, harbour and water; elevation above the flood line
and upwind bonus; negative kernels around tanneries, slaughterhouses, walls, prisons, middens; attractors at the roster's
institutions), `ε` a low-frequency fBm from the field's own sub-stream with a declared share, smoothed by a Gaussian of
one block width so neighbours vary gradually; stored as a raster and sampled per face; banded (poor / modest / prosperous /
rich) only where a table needs a band; editable as a brush layer whose strokes persist as edits; moved by the evolution
stage's inputs (a new epoch re-evaluates the drivers with the new circumstances and keeps the stroke edits).

**Plots, frontage-first** (S10; O5, O17, O18): for each block frontage, the granularity table maps (district type,
prosperity, density regime, way class) to bands of **frontage width, depth and area**; the frontage is walked and cut at
widths drawn from the band (bent lot cuts perpendicular to the frontage — the creator's stated use of the primitive for
buildings, `watabou-extra-a.md` §2.1 — arriving at the rear line, which is the inset of the block at the depth band);
corner plots take both frontages (corner rule), wedges below the minimum interior angle become typed residue absorbed
into a neighbour or, if they connect two ways, an alley; the interior beyond the rear lines is a **court** (perimeter
blocks with courtyards, MFCG's donut morphology `mfcg-posts-b.md` §2.5 and NG's 39–43 % party walls) or, for deep
blocks, rear plots on an inserted back lane. **JOIN**: k adjacent plots along one frontage, or back to back, are merged
when the band's upper end exceeds the cut width, keeping member ids as history; institutions and assignments claim and
join *before* the fabric is cut (`claimSubFace`, FTG's landmark-first generalised), taking a whole block only above a
threshold share. **SPLIT**: poor bands cut to the band's lower end. Both directions read the same context vector — one
code path (O18 g). Every plot has ≥ 1 access edge (invariant); no plot is silently discarded (MFCG's `filterInner` and
NG's 42 % `validateOuter` discards are replaced by typed residue).

### 4.7 S11–S12: content siting and site plans (the plot model)

**Siting**: the roster's demand is placed onto plots by a rule-based solver — each venue class has a score over the plot
context (frontage class, distances, prosperity band, district affinity, upstream/downstream for noxious trades), and
plots are filled in descending score with capacity accounting; a bounded **plan–fit–reconcile** loop (≤ 3 rounds) adjusts
the manifest where a class finds no plot (e.g. one more JOIN in the right district) — placement never gives up (O18 f).
Households take residential plots by wealth band = prosperity band ± drift. People are **derived lazily** from building
ids and pinned once seen (O7; FTG's lazy person generation, `docs/CONFIDENCE.md` §4.4 A5).

**Site plans** (the outer layer of the building generator; owner PLOT MODEL): one rule evaluation per plot, no search,
tables keyed by (use class × prosperity band × density regime): a **coverage ratio** and an **arrangement** —

| arrangement | geometry | where |
|---|---|---|
| row | one or more footprints end to end along the frontage with party walls, depth from the table, rear yard | dense and poor bands, workshops, shops (NG 95–99 % attached; FTG's warehouse rows) |
| set-back compound | hall/house set back behind a fore-court, several disjoint outbuildings (stables, workshop, chapel, barn, brewhouse) around a court with a gate on the access edge | manors, inns, temples, guildhalls, farmsteads (FTG's farmstead with a driveway is the one reference site plan) |
| detached | one OBB-aligned footprint in a yard with a path to the access edge | prosperous/semi-rural bands, sparingly (R4/R5 restraint) |
| hovel | one small footprint on the frontage of a plot that is mostly bare yard | squalid bands, outskirts |

Footprints get class, storeys and **heights** from the class tables (storeys × storey height + roof rise by pitch;
eave/ridge per footprint; tower heights for keeps and church towers) even though the top-down view never shows them
(owner HEIGHT); an entrance on the outline facing an access edge, ≈ 2–3 m from the way (FTG's measured 2.99 m,
`_critic-ftg.md` §4 row 15); roof kind by class (hip by straight skeleton, gable with the ridge from the skeleton's
gable variant, cone/dome for towers and special buildings). The stage-3 composition is behind
`BuildingGenerator.compose(plot, sitePlanSlot, ctx, subSeed)`; until stage 3 a `TrivialOutlineBuilder` returns the
site plan's rectangle(s) as single-wing compositions with the same heights, so the display list, exports and shadows
see the same shape at every LOD (O17 i). The Fantasy Manor grammar (a path of wings with two-facet ridges, hip blocks,
towers, dormers, porches, painter's order — `manor.md` §2, §9) is the stage-3 target and is not built now; what the base
carries for it is the lot polygon, the access edges, the context vector, the sub-seed, the height fields and the
composition LOD levels (outline → wings/roofs → rooms).

### 4.8 S7, S13, S14: walls and castles, greenery, hinterland

**Walls** (O8; MFCG's signature, FTG's staging): after growth stage k (per the blueprint: TOWN and above wall stage 1 by
default; several enceintes when later stages are also walled), the trace = the outer boundary of the union of the stage's
district faces, offset outward by the wall setback, simplified, then **pulled to defensible ground** within a search band
(ridge lines, slope breaks, water banks: a cost-surface path around the town with a penalty for leaving high ground),
smoothed with pinned-vertex Laplacian smoothing (MFCG's `f = 1` smoother in shape), snapped to the water outline where it
meets water (the wall ends at the bank; a **water gate** where a river passes — MFCG B5), inserted as `wall` edges. **Gates**
= the intersections of the trace with arterials, exactly N when N is requested (arterials ranked by betweenness; excess
arterials are diverted along the wall to the nearest gate as a `lane`; a sealed city with N = 0 is honoured but reported —
MFCG EG2-5 relayed via CONFIDENCE B5). **Towers** at every trace vertex whose turn exceeds a threshold and along straight
runs at a spacing (35–60 m by size class; FTG's measured 39 m median, MFCG's "every non-gate vertex"). **Castle**: the
claim at the scored site (S4) becomes a plot whose bailey is the inset of the claim by the castle wall thickness; the keep
is a landmark footprint by the largest-inscribed-rectangle rule (MFCG's stated `lir`, CONFIDENCE B15) with tower heights;
a compactness gate of 0.75 (MFCG's threshold, kept as a *shape gate*) that fails triggers **re-cutting the claim** (widen
the OBB, re-claim), never a restart; moat optional (a `moat` water body around the bailey). Conversions for the evolution
hook are graph operations: `wall → ring road` = `retypeEdges(wallEdges, 'way', {class: 'primary'})` plus removal of
towers and gates → junctions; `outskirts → district` = a new growth stage whose extent covers the ribbons.

**Greenery** (S13; owner base ruling; O19): rules read prosperity and district type — rich quarters: gardens on compound
plots, a park on a joined block, tree-lined avenues along primaries; modest: a green or an orchard at the edge; poor:
little; yard planting by plot class (garden / orchard / midden / pen); every green is a typed, owned entity; trees are
instanced at render from the entity's sub-stream (never stored; O2). Forest edges use the domain-warped density noise the
references use for organic wood edges (relayed, `_critic-vg-ng.md` V15) — a render-time property of the forest entity.

**Hinterland** (S14; O14-core): farmland per capita from a table sized to the population (MFCG's "not enough farms"
failure removed), laid out by a preset (subdivided fields around the town in MFCG's manner — a Voronoi-of-seeds ∩ land
partition cut by the OBB bisector, the recorded VG/MFCG construction relayed in `_critic.md` C9 and `profile-mfcg.md`
§4.9; farmsteads with driveways; perimeter; along rivers), forests on a suitability field minus farmland, outskirts as
**ribbon development** along arterials outside the wall with a density falloff sampled per plot from a distance-to-gate
kernel (MFCG's `filterOutskirts` → `interpolate` idea, `profile-mfcg.md` §4.9) and a shanty/squalid variant only when the
character asks; roads continue to the frame at their bearings; a context margin beyond the frame keeps the picture
unbounded.

### 4.9 The district → neighbourhood interface (stage 2, designed now)

```ts
interface SeamContract {                      // carried by every District from milestone 1
  boundary: SeamEdge[];                        // in ring order
  portals: Portal[];                           // where ways cross the boundary: way id, class, width, vertex, direction
  sharedGeometry: 'ownedByBase';               // edges are generated once by the base; neighbourhoods read, never re-cut them
  plotLinesOnBoundary: EntityId[]; alleysOnBoundary: EntityId[];
  fieldSamples: { prosperity: Sample[]; density: Sample[]; terrain: Sample[] }; // along the boundary and on an interior lattice
}
type SeamEdge = { edge: number; type: 'way' | 'water' | 'wall' | 'open' | 'frame'; wayClass?: WayClass; widthM?: number; hard: boolean };

interface NeighbourhoodRequest {
  district: EntityId; boundary: Ring; seam: SeamContract; context: DistrictContext;   // type, venue mix, prosperity band, growth stage
  layer: 'ground' | 'sky';                     // sky: no portals, no roads in or out (floating-island hook)
  strategy: FabricStrategyId; params: Record<string, number>;
  subSeed: StreamKey;                          // H(seed, 'district', id)
  lod: 'neighbourhood';
}
interface NeighbourhoodResult { blocks: Block[]; ways: Way[]; plots: Plot[]; buildings: Building[]; greens: GreenArea[]; pins: Pin[]; labels: Label[]; report: StageReport }
```

Stage 2 implements `RingFabric`, `SquareFabric`, `StreetFabric` (NG's templates, `_critic-vg-ng.md` V20, RA-2 relayed)
next to the base's `BentCutFabric`, the neighbourhood LOD of the display list (roof hatching, chimneys, pins, per-tree
canopies, hood title), and the close-up workflow. Everything it needs from the base's data model exists at milestone 1
(§16).

### 4.10 Incremental mode (the evolution hook, designed now)

`Pipeline.run(document, scope)` with `scope = {kind: 'epoch', epoch: n}`: the engine treats epoch n's circumstances as
new inputs; stages re-evaluate only where their inputs changed; new entities take `epoch = n` in their provenance and
draw from `H(seed, 'epoch', n, …)` sub-streams; surviving entities are never re-rolled (their sub-streams are unchanged
and their deps are unchanged); every change is a `LifecycleEvent` with its cause. Growth = a new stage k with an extent
beyond the last; conversion = `retypeEdges` plus lifecycle events; decay = prosperity drivers moving and site plans
re-evaluated only for plots whose band changed. The base builds and tests exactly one incremental path now — **add a
growth stage to an existing town** — because it is the same path a user's "regenerate this area" uses (§7).

---

## §5 Failure handling — no whole-map discard-and-retry as the normal path

### 5.1 The policy

MFCG's policy is tiered — repair (citadel `equalize`/bloat), local retry (canal course), silent skip (streets, alley
groups, cuts) and whole-city restart (canal failure; any geometry exception, ST-8) — and the restart tier costs 24 of 58
recorded attempts (`profile-mfcg.md` §11, ST-8; `docs/IMPROVEMENTS.md` O3). The base keeps the shape of that policy and
**deletes the restart tier**. Every stochastic step has a deterministic, bounded ladder:

```
tier 0  feasibility by construction   (the constraint is satisfied by how the input was made — e.g. the site is placed at the river)
tier 1  constraint check              (typed GeomResult / invariant; nothing has been committed)
tier 2  local repair                  (a deterministic geometric fix: widen, snap, merge, re-inset, re-claim)
tier 3  bounded local regeneration    (retry the same entity with the next ATTEMPT sub-stream; ≤ 3 attempts)
tier 4  simpler primitive             (bent cut → straight cut on the mean normal → OBB axis cut)
tier 5  substitution                  (an uncuttable block becomes a court, a green or a landmark plot — NG's own rule)
tier 6  documented omission           (the feature is dropped for this entity and the report says so; never silent)
```

A stage's batch is a **transaction** on the subdivision (§3.4): tiers 2–5 run inside it; tier 6 commits without the
feature. No tier re-runs another stage, and no tier re-rolls anything outside the failing entity's scope, because every
retry draws from `(…, entity, attempt)` and nothing else reads that stream (§6.2). The ladder path taken is recorded in
the generation report with a cause code, so a replay reproduces it and a user can see why a block is a green.

### 5.2 Failure classes: detection, ladder, test

| class | where | detection (invariant or typed result) | ladder (in order) | how it is tested |
|---|---|---|---|---|
| F-NUM degenerate geometry | kernel | `SLIVER`, `COLLINEAR`, `SELF_INTERSECTING`, `BELOW_MIN_*`, snap-round instability | snap and retry (≤ 3 rounds) → merge the sliver into the neighbour with the longest shared edge → typed residue | B-FUZZ: 10⁶ random concave, holed, thin, near-collinear and snapped polygons per primitive; 0 crashes, 0 hangs, 0 self-intersecting outputs, 0 undeclared slivers (O3 a) |
| F-CUT bent cut fails | S6, S8, S10 | `NOT_TWO_CROSSINGS`; a child fails simple / min-area / min-width / min-angle | alternative position along the major axis (attempt 1–3) → straight cut on the mean of the two edge normals → OBB axis cut → substitution (court / green / joined plot for the roster's largest unplaced class) | fuzz on concave and holed faces; the NG signature regression (one bend at 0.5 ± 0.1 in ≥ 80 %, arrival ≥ 85° in ≥ 95 %); MFCG baseline: 19 skipped cuts, 4 empty alley groups per census, 3 of 16 cities restarted for "bad poly" |
| F-RIVER no course / no crossing | S2 | descent stalls in a sink; the course leaves the frame before the core; no crossing site within the core band | fill the sink deeper (carve) → move the inlet along the frame edge (attempt) → declare "no crossing" and route arterials to the bank road, report | 1 000 seeds × {river, river + coast} × size class: "river within the core when requested" = 100 % (MFCG baseline 7 of 10 attempts fail at size 80) |
| F-SITE no valid centre | S3 | every candidate fails slope / land / flood tests | relax the slope threshold one step → largest land component's centroid band → report | corpus sweep over relief characters |
| F-ROUTE no arterial path | S5 | `NO_PATH` | allow a bridge at extra cost → allow a new gate (if a wall exists) → route to the nearest reachable destination and report the unreached bearing | B-CITY; O4 (a) 100 % of through-roads at a named destination |
| F-WALL bad trace / too few gates | S7 | trace self-intersects, does not close, or crosses the core; fewer arterial crossings than the requested N | re-offset with a larger radius → union-simplify (Clipper2) → snap to the water outline, add water gates → divert arterials to the nearest gate as lanes; if N cannot be met, add posterns and report | B-CITY; "gates on arterials 100 %"; MFCG baseline: sealed cities at `gates = 0` without fallback (EG2-5 relayed) |
| F-CASTLE compactness / overlap | S4/S7 | compactness < 0.75; claim overlaps water or the plaza | re-claim with a widened OBB → next candidate site → report | B-CITY; MFCG baseline 178 equalize passes and 11 bloats per census (relayed via O3) |
| F-PLOT unusable plot | S10 | frontage < min, wedge angle < 12°, landlocked | merge into the neighbour → insert an alley to give access → typed residue (court / vacant) | invariants: every plot has ≥ 1 access edge (100 %), 0 landlocked buildings (O18 e); NG baseline 42 % of lot leaves discarded |
| F-SITING roster item unplaced | S11 | demand > placed for a class | JOIN plots in the affinity district → next-best district → reduce the manifest and report the shortfall | O18 (f): 100 % of institutions on a plot meeting their requirement; placement never gives up |
| F-SITEPLAN footprint does not fit | S12 | setbacks leave no rectangle ≥ the class minimum | lower the coverage one step → next arrangement (compound → detached → hovel) → vacant plot typed yard, reported | O17 (f): 100 % of footprints fit; 0 renderer fallback rectangles |
| F-LABEL no fit | S15 | spine shorter than the text at the minimum size; unresolved collision at priority | shorter name form → straight label on the OBB axis → legend entry | B-ZOOM legibility floors; collisions 0 at every LOD |
| F-BUDGET stage over time | any | stage timer over budget (§12) | coarser parameters (fewer cuts, larger cells) for this stage → defer the stage's lazy tier → report | per-stage timing in CI on reference hardware |
| F-EDIT constraint conflict | S0/S7 | a user's drawn way crosses a locked entity; an assignment cannot be honoured with its drift bounds | ask (in the UI) or apply the precedence order (§7.4) and report | B-EDIT sequences; 0 planarity violations, 0 lost faces |

### 5.3 The post-stage invariant suite (runs in every mode; the generation report is its output)

Simple polygons everywhere; no footprint overlap; per-class minimum width, area and interior angle; every plot with an
access edge and every building with an entrance; no way crosses a building; no edge below the weld tolerance; every gate
joined to the network and to the plaza; water ∩ buildings = ∅; every requested feature present (river through the core,
N gates, a harbour when coastal); exclusive land uses never overlap; bridges within 20° of the channel normal (VG's
"as right as possible" rule relayed, `_critic-vg-ng.md` S8); no branch re-joins its parent within k segments; a sealed
enclosure only when declared; contours never cross a shore; the model hash recomputed equals the recorded one. A
violation that survives its ladder is a **hard invariant failure**, which CI counts per 1 000 cities and requires to be 0
(O3 b). Whole-map restarts are not an escape hatch: the pipeline has no such path (J-K adopted).

---

## §6 Determinism

### 6.1 The generator

PCG32 (a 64-bit state, 32-bit output; implemented with two 32-bit words and `Math.imul`, no BigInt) — chosen over the
references' MINSTD Lehmer stream (`_critic-os.md` §1.1; period 2³¹ − 2 and visible low-bit structure) for statistics and
over xoshiro128\*\* only for its simpler seeding from a hash. Seeds are 64-bit (two 32-bit words); the URL shows them in
base 36. `Enter` = seed + 1 (transparent successor; NG/VG derive the next seed from the stream state, which needs the
draw count and is therefore irreproducible — `docs/CONFIDENCE.md` §3.3 A2 S).

### 6.2 Named sub-streams: stream key = (seed, stage, entityPath, concern, attempt, epoch)

```ts
type StreamKey = { stage: StageId; entity: EntityId | ''; concern: string; attempt: number; epoch: number };
interface SubStreamFactory { for(key: StreamKey): Rng }   // Rng = PCG32 seeded by H64(seed ⊕ hash(key)); memoised per key per run
```

`H64` is a 64-bit mixer over the canonical string of the key (murmur3-style, 32-bit lanes; ours). Consequences that
are the point of the design (O2): adding a feature adds a **concern** and shifts no other stream; adding an entity to a
stage shifts no sibling (each sibling's stream is keyed by its own id); a retry uses `attempt + 1` and shifts nothing
else; an epoch's new entities draw from `epoch = n` keys, and surviving entities keep theirs, so "nothing that survives is
re-rolled" is a property of the keys, not of discipline. Render-time decoration (trees in a green, roof texture jitter,
scatter) is seeded by the entity id and never stored. Concern registry (initial): `terrain.noise`, `terrain.controls`,
`water.coast`, `water.river`, `site.centre`, `manifest.roster`, `network.route`, `network.jitter`, `district.type`,
`fabric.position`, `fabric.side`, `fabric.arc`, `fabric.width`, `plot.width`, `plot.join`, `siting`, `siteplan`,
`greenery`, `hinterland.fields`, `hinterland.forest`, `names`, `labels`, `style.jitter`, `render.trees`.

### 6.3 Stable ids under feature growth and edits

Ordinals are minted in the deterministic creation order of the parent's stage run; the order is a pure function of the
parent's inputs and sub-stream, never of a hash-map iteration or of arrival order from a worker (results are merged in
id order). A regenerated scope mints under a revision suffix only on collision with a locked or edited id (§2.2). A
JOINed plot's id is the lowest member id with `+` (`p:2+3+4`), members kept as history so a later SPLIT restores them.

### 6.4 Reproducibility across platforms — the floating-point policy

1. Topology lives on integer centimetres; predicates are exact (§3.1). 2. Fields, costs and weights are IEEE doubles;
`+ − × ÷ sqrt` are exact by specification in every JavaScript engine; **transcendentals are ours** — `dmath.{sin, cos,
atan2, exp, log, pow}` from a permissively licensed fdlibm port, so `Math.sin` differences between V8, JavaScriptCore
and SpiderMonkey cannot change a model; a lint rule forbids `Math.*` transcendental calls and `Math.random`, `Date`,
`performance.now` in model packages. 3. No dependence on object-key or `Map` iteration order except insertion order
(guaranteed by the language); all sorts use total-order comparators with an id tie-break. 4. Workers return results that
are merged in id order; no stage reads a worker's timing. 5. Any future WASM kernel must produce the same integer
outputs, checked by a cross-implementation test on the golden suite. 6. The **model hash** is over a canonical
serialisation (sorted keys, integer coordinates, floats as shortest round-trip strings) — O2 (a): identical on two
machines and two browsers for 100 % of B-CITY seeds.

### 6.5 Permalinks and version axes

`#v=1.4.0&r=2026.09&s=<seed b36>&z=CITY&p=<base64url delta of params from the preset>&a=<assignment hash>`; an edited town
is a document (a seed is not a save — O2 restraint): the permalink of an edited town carries the document id or, when
the edit log is under 2 KB, the compressed log inline. Version axes: `generatorVersion` (pipeline code, semver),
`rulesVersion` (the data tables), `styleVersion`, `schemaVersion`; a permalink replays its versions (the app keeps the
last N minor versions of the pipeline available for replay; a replay under a newer version is an explicit upgrade
with a diff, §7.6). Golden seeds per release with the declared-shift protocol (§13.3).

---

## §7 Editing and regeneration locality — everything is editable

### 7.1 Edits are events on stable ids

```ts
interface EditEvent { id: EditId; seq: number; kind: EditKind; targets: EntityId[]; payload: unknown; scope: Scope; author: 'user' | 'system'; inverse?: EditEvent }
type EditKind =
  | 'lock' | 'unlock' | 'pin'                        // freeze an entity's derivation inputs
  | 'setAttr'                                         // rename, retype, prosperity band, use, class, heights, style role
  | 'moveVertices' | 'warp'                           // displacement of subdivision vertices (brush: move, rotate, bloat, pinch, equalize, smooth, jitter, relax — MFCG's eight, as kernels)
  | 'drawWay' | 'drawWater' | 'drawWall' | 'drawGreen' | 'drawBoundary'   // user geometry as constraints
  | 'delete' | 'merge' | 'split' | 'join' | 'convert'  // structural (split/join plots, merge districts, wall → road)
  | 'regenerate'                                      // re-derive a scope with the same sub-streams (or attempt++ for "reroll")
  | 'assign'                                          // semantic assignment (name / function / shape class; one, a neighbourhood, N dispersed)
  | 'ruleOverride' | 'presetOverride' | 'fieldBrush'  // rule-table row override, preset, prosperity/terrain brush strokes
  | 'setLayer' | 'setStyle' | 'setLabel';
```

Every generated element is a target: terrain (brush and control primitives), water (outline vertices, river control
points), ways (draw, move, delete, reclass), districts (type, seam edges, merge/split), plots (join/split, use, owner),
buildings (class, footprint move, heights, entrance), walls (trace vertices, gates, towers), greenery, labels (text,
position, lock), layers (toggle, elevation), and every rule table and preset (owner amendment 5).

### 7.2 Locality: the dependency DAG does the work

Because every entity records `deps` (§2.2), an edit's effect is the **invalidation closure**: the engine marks the edited
entity and every entity whose deps reach it, re-evaluates only the stages for those scopes, and leaves everything else
byte-identical — the locality guarantee O2 (c) demands (≥ 95 % unchanged on a single-parameter edit; MFCG's baseline is
that a `gates` change re-rolls everything down to the name). Locked entities are removed from the invalidation set and
become fixed inputs; their dependants are re-derived around them (a locked way stays; blocks on both sides re-cut with
the same sub-streams, so they come back identical where the way did not move). The closure is computed on the entity
graph, not by geometry, so it is exact and cheap.

### 7.3 Lifecycle of every edit kind (create, read, persist, regenerate, undo, migrate)

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between generator versions |
|---|---|---|---|---|---|---|
| lock / pin | UI/API on any id | `document.locks` | in the edit log and the lock set | the entity is a fixed input; only dependants re-derive | inverse event | ids survive (§6.3); an id unmapped after migration is listed as an orphan lock with its last geometry |
| setAttr | UI/API | entity attrs with `lifecycle = edited` | log | the attribute is an input override at the stage that would compute it (name: S15 skips it; type: S6 reads it as fixed; heights: S12) | inverse | attribute names are schema-versioned; a rename table maps them |
| moveVertices / warp | brush on the vertex arena; topology preserved (a move that would cross an edge is halved until it does not) | vertex positions + a displacement field raster (for new ids) | the log stores the displacement per vertex id **and** the brush stroke, so a regenerated region without those ids samples the field | applied as a post-stage constraint: pinned vertices are inputs to smoothing and cutting | inverse displacement | the stroke replays on the new model; per-vertex displacements apply where ids map |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with snapping (FTG's intersection snap and first-crossing split, `docs/CONFIDENCE.md` §4.4 E1 relayed) and validation at the authoring boundary (simple, not overlapping, not through a locked entity) | entities with `lifecycle = edited`, author user | log (the geometry is the payload) | inserted as **constraints before the stage that would create the class** (drawn water before S2's descent; drawn ways before S5's routing, so arterials reuse them; drawn walls before S7; drawn district boundaries before S6) | delete + repair of dependants | replay inserts the same geometry under the new version |
| delete / merge / split / join / convert | context actions | lifecycle events | log | structural ops on the subdivision (§3.4) with dependants re-derived; `convert` is `retypeEdges` (wall → ring road, gate → junction) | inverse structural op (ids restored from history) | same |
| regenerate | "regenerate this area / district / block / plot", "same kind new seed", "keep settings" | report entry | log (scope + attempt) | the scope's unlocked entities re-derive with **the same sub-streams** (faithful regeneration, statistically indistinguishable — O9 c) unless `attempt++` was asked (a reroll) | previous entities restored from the document's pre-edit snapshot (the memoised engine keeps the last k) | the scope replays |
| assign | assignment dialog / host API | `plot.assignment`, `building.assignment`, `district.assignment` | log | §7.4 | inverse | assignments reference ids and criteria; criteria replay if an id is unmapped |
| ruleOverride / presetOverride / fieldBrush | tables editor, prosperity brush | the override layer | log | the override layer sits above the defaults (§7.5); a rule change invalidates exactly the entities whose provenance cites that rule row (§2.2 `rules`) | inverse | rule rows are versioned; an override of a row that no longer exists is reported |
| setLayer / setStyle / setLabel | UI | view state / label entities | log (style is part of the document, not the model hash) | no model re-derivation; the display list rebuilds | inverse | style schema versioned |

Undo/redo is the edit log with inverse events; because regeneration is memoised, undo of a regenerate is a lookup, not
a recompute (O9 d: every operation undoable — the enumeration test checks that each `EditKind` has an inverse).
Save → load → save is byte-identical because the document is the recipe + the log + materialised state with revisions
(O9 a).

### 7.4 Semantic assignments and the placement solver (ASSIGN hook)

```ts
interface Assignment {
  id: EditId; granularity: 'building' | 'neighbourhood' | 'dispersed';
  target?: EntityId;                       // one building/plot or one district
  count?: number; criteria?: PlacementCriteria;   // dispersed: N buildings of kind X under criteria Y
  name?: string; function?: VenueClass; shapeClass?: BuildingClass | 'manor' | 'hovel' | 'hall' | …;
  drift: { sizePct: number; classNeighbours: number; allowRoofKinds?: RoofKind[] };  // bounds on the generator's inputs
  precedence: 'overridesClassRules';       // always; the class rules fill what the assignment leaves open
}
interface PlacementCriteria { districtTypes?: DistrictType[]; prosperityBand?: Band[]; minSpacingM?: number; nearWater?: boolean; nearGate?: boolean; frontageClass?: WayClass[]; avoid?: EntityId[] }
interface PlacementSolver { solve(a: Assignment, model: Model, rng: Rng): GeomResult<Placement[]> }  // greedy by score with spacing, then a bounded swap pass
```

Order of precedence at S10–S12: assignment > lock > user drawn geometry > rule tables > defaults. A neighbourhood
assignment sets the district's assignment and lets the class rules diversify inside it (diverse buildings under one
assignment — owner). Drift bounds are inputs to `BuildingGenerator.compose`.

### 7.5 The override layer (user preferences above the defaults)

`effectiveParams = defaults(rulesVersion) ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ editEvents`, each layer a
sparse delta with provenance; the UI shows which layer set a value ("auto-resolved" values are reported — O16-core).
Rule tables are JSON with `{value, unit, provenance: {source, date, note}, calibratable: bool}` per cell; the corpus phase
replaces values and updates provenance without code changes.

### 7.6 Migration

`migrate(document, fromVersion, toVersion)` is a chain of pure functions over the document (schema changes) followed by
an optional **upgrade replay**: the recipe replays under the new generator version, the edit log re-applies on the
id-mapped model, and a diff (entities changed / unmapped edits / statistics deltas) is shown before commit; the user may
keep the old materialised model instead (the app can replay old versions, §6.5). FTG's "no way to regenerate old towns
with new features" and "cannot be undone" are the weaknesses answered (O9).

---

## §8 Rendering and style system

### 8.1 One semantic display list, renderer-independent

```ts
interface DisplayItem {
  entity: EntityId; role: StyleRole;         // 'building.body' | 'building.outline' | 'way.casing' | 'way.body' | 'water' | 'wall' | 'tower' | 'field.furrow' | 'tree.canopy' | 'label.district' | …
  layer: Layer; z: number;                   // z inside the layer; layers ordered by LayerSpec.zOrder
  lod: { min: LodTier; max: LodTier };       // 'city' | 'district' | 'neighbourhood' | 'building'
  group: string;                             // cache key (district id at city LOD, block id at district LOD) — MFCG's per-ward texture idea
  geom: Ring | Polyline | Point | TextOnPath | Instance | RasterRef;
  shadow?: { heights: { eaveM: number; ridgeM: number }; footprint: Ring };   // the shadow-layer hook: present on every building/wing/tower item
  jitterStream?: StreamKey;                  // per-item style jitter (roof tone, tree shape) — seeded, never stored
}
interface DisplayList { items: DisplayItem[]; layers: LayerSpec[]; bounds: Rect; lodRequested: LodTier; styleVersion: string }
```

The list is built by S16 from the model and a style sheet; backends consume it without knowing the model. Level of
detail is an axis on every item: **city** (footprints as filled shapes; intramural alleys as unstroked gaps; walls,
towers, water, fields, district labels), **district** (footprints with outlines and entrances, streets stroked with
casing, courts, greens, street names), **neighbourhood** (wings and roofs, roof hatching, chimneys, pins, per-tree
canopies — stage 2), **building** (rooms — stage 3). Continuous zoom selects the tier with hysteresis; a footprint's
geometry hash is identical at every tier (O17 i). MFCG's "no zoom" ("a big flaw", stated six times, `docs/IMPROVEMENTS.md`
§1 item 5) is answered by this axis; NG's wheel-rotates and VG's fixed square likewise.

### 8.2 Layers and the shadow hook

Layers draw in `zOrder`: underground (sewers: shown through the ground by a cut-away mask or a transparency toggle),
ground, sky (islands: drawn above the ground with their **shadows projected onto the ground layer** from the island's
elevation and the sun vector). The `ShadowPass` is a display-list transform, declared now, implemented as a *drop*
shadow first (an offset silhouette composited once per layer — the technique all three watabou generators use,
`visual-spec.md` §5 row "shadows"; VG one flat `#9699ae`-class pass, NG a translate-and-overdraw prism) and later as a
*projected* shadow from `heights` and a sun vector (owner HEIGHT). Budget: shadows are off by default (owner restraint;
Fantasy Manor spends ≈ 90 % of its render on its shadow, `manor.md` §9 item 7) and, when on, one flat pass per layer.

### 8.3 Style sheets as data

```ts
interface StyleSheet {
  id: string; version: string; family: 'ink' | 'lit' | 'painterly' | 'graphic';
  paper: Color; inks: Color[]; roles: Record<StyleRole, Paint>;
  units: { hairline: 'halfPixel' | number; casing: 'w+2h' | number };   // MFCG's h = 0.5/s and casing w + 2h laws (visual-spec §0.2)
  roofs: { kind: 'flat' | 'hip' | 'gable' | 'raised'; twoTone?: { darkFactor: number }; hatch?: HatchSpec };
  water: { bands?: { n: number; exponent: 1.5 }; coastHairline: boolean };   // VG's W·(i/N)^1.5 law as an option
  trees: { canopy: 'lobed' | 'sprite' | 'none'; lobes: [14, 20] };
  shadows: { mode: 'off' | 'drop' | 'projected'; offset?: Vec; alpha?: number };
  lod: Record<LodTier, Partial<StyleSheet['roles']>>;       // overrides per tier
  furniture: { grid: boolean; scaleBar: boolean; compass: boolean; legend: boolean; title: boolean };
}
type Paint = { fill?: Color | 'paper' | 'none'; stroke?: Color | 'ink' | 'fillDarkened'; width?: number | 'hairline' | 'class'; casing?: boolean; cap?: 'round' | 'square' | 'butt'; join?: 'round' | 'miter'; hatch?: HatchSpec; texture?: TextureRef; light?: boolean };
```

Presets: **`ink`** (default — the MFCG family: paper, one ink, four to six colour roles, casing `w + 2h`, hairline
building outlines with an ink drop shadow under bodies, solid landmark silhouettes, walls drawn over buildings, towers
as discs, hairline furrows, straight-skeleton roofs when the roof option is on, IM-FELL-class type with a paper halo;
the 17-step layer order of `visual-spec.md` §1.3 is the reference order and our values are our own); **`lit`** (the
FTG-like second preset: textured ground by land use, per-face lighting of extruded footprints from `heights`, type-
coloured roofs, day/night ramp, post-process hooks; WebGL2 backend); reserved: `painterly` (VG-class: colour ramps,
water bands, hillshade, selective outlining `outline = lerp(fill, ink, factor × pressure)` — `_critic-vg-ng.md` V13) and
`graphic` (NG-class flat colour with tapered hatch triangles, two-tone roofs, fake gables — `docs/CONFIDENCE.md` §4.3
E4/E5) for stage 2 and the village. Every preset must survive "no fills" and "no outlines" (R13) and pass the LOD style
regression (§13.4). The minimum renderer feature list is `visual-spec.md` §6's twenty items, all of which the display
list can express: ≥ 300-vertex fills with hairlines, round/round and square caps, float widths, casing, repeated-offset
shoreline strokes, offset silhouettes, lobed canopies, clipped hatching at per-polygon angles (continuous and dashed),
tapered ticks, flat and jittered palettes, per-object gradients, one composited shadow pass, vignette/glow masks,
textures with tint (lit), halos, per-glyph curved baselines with area-proportional scale, old-style figures, a
screen-space furniture layer, strict layer order, per-group caching.

### 8.4 Backends and export resolution

* **Canvas2D** (default screen): per-group offscreen caches (a district at city LOD, a block at district LOD) — MFCG
  keeps 46 000 fills at ≈ 590 GPU uploads by caching per ward (`visual-spec.md` §1.1); invalidation by group on edit.
* **SVG** (export and inspection): `<g>` per layer and per group, `data-entity` ids on every element, styles inlined,
  text as glyph paths or embedded fonts by option; the same list, so SVG parity is a renderer property (MFCG G1).
* **WebGL2** (METROPOLIS zoom and the `lit` preset): batched triangle buffers from earcut, SDF text, one directional
  light, normal-mapped textures optional; falls back to Canvas2D on weak devices (a low-end tier, R14).
* **Print / VTT resolution**: tiled rendering at any pixel size; print presets (A4/A3/A2 at 300 dpi); VTT presets at a
  declared grid scale (default 1 grid square = 5 ft = 1.5 m at 100 px per square → 1 px ≈ 1.5 cm; districts and
  neighbourhoods as separate scenes), per layer (§11).

---

## §9 Labels and map furniture

* **District labels** on **hole-aware straight-skeleton spines**: the skeleton of the district ring minus water and
  plaza holes; the longest ridge path with a curvature limit is the baseline; the text is placed per glyph along it
  with letter-spacing, scale proportional to the district's area (MFCG's shipped method, `docs/CONFIDENCE.md` §4.1
  D2; the label chain is Visvalingam simplify → skeleton → cubic smoothing, relayed `_critic.md` §3). Fallback when the
  ridge is too short: MFCG's 2019 OBB + double bisection + circular arc; then a straight label on the OBB axis; then a
  legend entry (§5.2 F-LABEL).
* **Street names** along way centrelines at district LOD and above (ways are named entities — O13-core); **water names**
  along the course; **landmark labels** with a leader when the footprint is small.
* **Collision handling**: a screen-space R-tree per LOD; labels placed in priority order (title > district > water >
  landmark > street); a candidate that collides tries its alternates (spine offset, shorter form) then yields;
  **protected features** (gates, castle, plaza, bridges) are never covered — MFCG's "labels hide features" defect
  answered (O13); 0 collisions at every LOD is an invariant.
* **Furniture** (screen space, never scaled with the map): a scale bar (metres; imperial toggle), a procedural
  8-ray compass rose with a ring and "N", a grid at a round ground distance (100 m / 500 m / 1 km by zoom; a 1.5 m / 5 ft
  VTT grid option), a legend (optional; MFCG's legend numbers become in-map names by default, with the legend as a
  toggle), and the **title** in the emptiest corner (NG's rule, `docs/CONFIDENCE.md` §4.3 D2) with a paper halo.
* **Names** come from an original grammar engine (a Tracery-class expansion grammar with modifiers and feature-guards,
  plus syllable and Markov generators over corpora of our own authoring — the engine class is the references' (D1 rows),
  the content is ours by ruling): names are **conditioned on the model** (a docks district is named for the water; a
  gate ward for its gate; a street for its destination or trade — R16), with setting packs later.

---

## §10 Simulation and content layer (FTG parity, with restraint)

**Boundary.** `@burgh/content` is a module over the same ids; the base's one-click path runs its **roster** part only
(J-S adopted: the roster, the context vector and lazily derived people are must-haves; households' relations, hourly
schedules, calendar, events and faction turf are an optional module built after milestone 2 — parity with FTG requires
it eventually, and nothing in the base precludes it because the ids and the roster already exist).

* **Population from size**: the size class or the user sets population; buildings follow from the roster, not the
  reverse (the MFCG relation population ≈ 6.12 × buildings is inverted; the ratio becomes an output statistic).
* **Buildings from a dependency graph**: venue classes with per-capita and per-other-building ratios, minimums and
  limits, solved by the fixed-point loop of §4.3 (FTG's documented shape; our tables). Output: the manifest.
* **Professions**: each venue class lists jobs with counts and a wealth band; job postings are matched to households
  by the siting stage's plot bands.
* **Households and the family model**: a household per residential plot (or per row footprint); a family-unit relation
  model (members and roles, not pairwise relations — FTG's storage lesson, `docs/CONFIDENCE.md` §4.4 B6) generated lazily
  from the plot id and pinned once seen.
* **Schedules and time** (optional module): a deterministic query `where(person, hour, weekday)` from profession
  templates and sub-locations, an hour quantum, a configurable calendar; no simulation state is stored beyond the clock.
* **Factions and religions**: seats at institutions, an influence field over districts (a `Field2D`), used by the
  prosperity drivers and the naming grammar; government type gates the castle (FTG's rule kept as a table row).
* **Name generation**: as §9; original corpora; setting packs later.

All of it is data (JSON tables with schemas and provenance) and replaceable: a host can supply its own roster and
tables in the host-input phase without touching the pipeline.

---

## §11 Export and interop

| format | content | notes |
|---|---|---|
| native JSON (`.burgh.json`) + binary (CBOR) | the document of §2.10: recipe, edit log, entities with ids, provenance and lifecycle, rasters, report, statistics, model hash | round-trips (import of our own export reproduces the model hash — O9 a); JSON Schema published per `schemaVersion` |
| SVG | the display list at a chosen LOD and style; `<g>` per layer/group; `data-entity` ids | fonts embedded or outlined; a print preset picks size and margins |
| PNG | tiled raster at any size; print presets; per-layer PNGs | pixel-identical for one model and style on two machines (O2 a) |
| GeoJSON | a FeatureCollection per layer and per kind (districts, blocks, plots, buildings with heights, ways with class and width, water, walls/gates/towers, greenery, fields, labels with spines) in a local metric CRS centred on (0,0), with an optional affine georeference; every feature carries its id and provenance | FTG's GeoJSON lacks districts (`_critic-ftg.md` F26); ours carries every entity kind |
| VTT | Foundry VTT scene JSON: walls from footprint edges at building LOD, doors at entrances, lights (street lamps / windows) optional, regions from districts, notes from labels; **per layer** (ground, sewers, islands) as separate scenes/levels with elevation; Universal VTT (`.dd2vtt`) for Roll20-class tools; a declared grid scale | the LAYER hook's per-layer export |
| 3-D | glTF 2.0 (default; permissive, binary, materials) from footprints × heights with skeleton roofs; OBJ optional | the HEIGHT ruling makes this a pure function of the model; 2-D shadows must agree with it (O17 g) |
| statistics | the O6 statistics record (per-class distributions with provenance) as JSON/CSV | the corpus phase's calibration surface |
| embedding | an ES-module API (`createBurgh(container, options)`, `generate`, `regenerate(scope)`, `applyEdit`, `export`, `subscribe(events)`) and an iframe `postMessage` protocol (`{type, data}`, origin-checked — the shape FTG's Foundry module uses, `docs/CONFIDENCE.md` §4.4 G2) with entity-selected / edited / regenerated events; a headless Node API for corpora | the roadmap's library boundary |
| permalinks | §6.5 | a seed is not a save |

---

## §12 Performance budgets

**The bar (recorded).** MFCG: model 125–260 ms at size 80 with `buildGeometry` 80–95 % of it (9–276 ms), cold wall-clock
2 891 ms of which 1 087 ms busy (`profile-mfcg.md` §4.9, §7.2 relayed via `docs/IMPROVEMENTS.md` O4 f/O17 h); NG 10–96 ms
per hood (`docs/IMPROVEMENTS.md` §4 R1); VG 240–330 ms including rendering on build 19251041 (same); FTG ≈ 3–7 s
server-side for a CITY (`_critic-ftg.md` F3 settled). The MFCG creator's own bar: "it never takes longer than a fraction
of second to generate even a large city" (R1).

**Budgets (model only, reference hardware = a 2020 laptop-class core, single thread unless noted; p95).** TOWN ≤ 100 ms,
CITY ≤ 300 ms, METROPOLIS ≤ 1 s (O3 d); time to first map (model + display list + first paint at city LOD): ≤ 250 ms
TOWN, ≤ 600 ms CITY, ≤ 2 s METROPOLIS; per-district regeneration ≤ 30 ms; a single plot edit ≤ 5 ms.

| stage | TOWN | CITY | METROPOLIS | notes |
|---|---|---|---|---|
| S1 terrain (fBm + drainage) | 8 | 20 | 60 | raster cells 10/10/20 m; drainage by priority-flood, O(n log n) |
| S2 water | 5 | 15 | 40 | one closed-outline routine; descent tracing is linear in the course length |
| S3–S4 site, manifest, anchors | 3 | 5 | 10 | the roster fixed point converges in ≤ 6 iterations on a graph of ≈ 60–100 classes |
| S5 backbone (A\* on the raster, ≈ 6–20 routes) | 12 | 40 | 120 | heap A\* on ≤ 250 k cells; connectors are local searches |
| S6 districts (bent cuts + merge) | 4 | 15 | 40 | ≈ 10–60 district faces |
| S7 fortification | 4 | 10 | 25 | offset + smoothing + one cost-surface path around the town |
| S8 fabric (blocks, streets, lanes) | 18 | 60 | 200 | ≈ 150 / 500 / 1 500 blocks; the bent-cut engine is O(n) per cut with OBB on ≤ 40-vertex faces; per-district in workers |
| S9 prosperity field | 3 | 10 | 25 | raster kernels; per-face sampling |
| S10 plots (frontage-first, join/split, alleys) | 15 | 50 | 160 | ≈ 1 200 / 4 500 / 12 000 plots (MFCG ≈ 18.6 lots per block; FTG 1.52 buildings per lot) |
| S11 siting | 4 | 15 | 40 | greedy by score with capacity accounting |
| S12 site plans + footprints + heights + roofs | 10 | 30 | 100 | ≤ 10 µs per plot median (O17 h); roofs by skeleton only at ≥ district LOD, cached |
| S13 greenery | 2 | 5 | 15 | |
| S14 hinterland | 5 | 15 | 40 | fields by Voronoi ∩ land + OBB cuts; forests as area entities (no trees stored) |
| S15 names + labels | 5 | 15 | 40 | skeleton spines cached per district |
| S16 display list (city LOD) | 8 | 25 | 80 | outside the model budget; incremental by group |
| S17 report + hash | 2 | 5 | 15 | |
| **model total (S1–S15, S17)** | **≈ 100** | **≈ 310 → ≤ 300 with S8/S10/S12 in 4 workers** | **≈ 930** | METROPOLIS relies on per-district parallelism |

**Incremental and async.** S10–S12 run per district in a worker pool with per-district sub-streams (deterministic
merge by id); the display list streams by group so the first paint shows terrain, water and the backbone within
≈ 60 ms at TOWN while districts fill in; the model is never blocked by rendering (MFCG's "dual-rendering tax" and NG's
per-tree canvases are the anti-patterns, `visual-spec.md` §6 item 20). **Memory**: a CITY model ≤ 50 MB JS heap
(integer arenas, typed arrays), a CITY document ≤ 3 MB gzipped with its roster (FTG's 593 KB city with its whole
population is the economy bar, R14); people are lazy; trees are never stored. **Idle**: no work when nothing changed
(memoised engine).

---

## §13 Testing and verification

### 13.1 Property tests for kernel invariants (fast-check; B-FUZZ corpus in CI)

`orient2d` sign equals the BigInt reference on random and adversarial (near-collinear, huge-coordinate) triples;
`insertPolyline` keeps the DCEL invariants of §3.2 for 10⁶ random insertions (checked after each batch); `splitFace`
returns two simple faces whose areas sum to the parent's within 1 cm² and whose ids obey the "larger keeps the id" rule;
`mergeFaces ∘ splitFace` restores the original ring and id; `insetFace` never produces a self-intersection and empties
monotonically with distance; the bent cut leaves and arrives within its declared angle tolerance on every accepted face;
Clipper2 results are simple and snapped; the skeleton is a tree of the face with every ridge inside it; `weld` never
produces an edge below the minimum; the snap-round loop terminates within its bound; the spatial index agrees with brute
force; every kernel routine returns a typed result (no thrown geometric error) on the pathological corpus (thin, holed,
near-collinear, snapped, ≥ 300 vertices, zero-area, duplicated points).

### 13.2 Per-stage invariants

The suite of §5.3 runs after every stage in every mode; each invariant has an id, a severity (hard / soft), a count in
the generation report and a CI threshold (hard = 0 per 1 000 cities; soft within its band). Stage contracts are also
tested as *pure functions*: the same inputs and sub-stream produce the same outputs (hash) on two engines and two
platforms (Node and a headless browser), with workers on and off.

### 13.3 Seed goldens with a declared-shift protocol

A golden suite of 12 seeds × {TOWN, CITY, METROPOLIS} × {none, coast, river, coast + river} stores the model hash, the
statistics record and one PNG per LOD and preset. A release must either match or **declare a shift**: the shift record
names the stage, the cause (a rule-table change, a fix, a new concern), the seeds and statistics that moved, and the
expected direction; a golden is re-recorded only with such a record (owner non-negotiable 10). Stages untouched by a
release stay byte-identical (O2 e), which the sub-stream design makes a property rather than a hope.

### 13.4 Visual regression

Playwright renders the golden suite per LOD, preset and backend; SSIM against the stored PNG with a per-preset
threshold; a per-style "no fills" and "no outlines" render must remain legible (R13); the LOD sweep (B-ZOOM 1:50 000 →
1:500) checks legibility floors and the absence of feature pops (footprint hash identical across tiers).

### 13.5 Reference-parity metrics computed against our captures (B-REF)

A `parity` CLI reads the capture records already on disk and our B-CITY outputs and reports distances (two-sample KS or
banded medians); the final thresholds are set from these baselines by the validation lanes (J-T: placeholders are never
"passed").

| metric | reference baseline (CONFIRMED source) | our statistic | criterion (placeholder band) |
|---|---|---|---|
| bent-cut signature: corner at |t − 0.5| ≤ 0.10; arrival ≥ 85°; major axis crossed at 0.40–0.60 | NG vertex captures 2026-09-25T10-55-{19,36,47,59}: 82 % / median exact / 66 % (`profile-neighbourhood.md` PF-3, BG-4) | same measurements on S8/S10 cuts | ≥ 80 % / ≥ 95 % / within band |
| junction character: T share, 4-way share | NG 361/361 T (`docs/IMPROVEMENTS.md` O4); FTG junction arm angle median 90.02°, 58 % in 80–100° (`_critic-ftg.md` §4 row 8) | junction census per district type | 4-way 0–15 % in organic districts; arm-angle p5 ≥ 30° |
| turn-angle distribution | FTG zero mass at 15–16° (row 7) — the weakness | histogram of per-vertex turns on arterials | no cliff (smooth density) |
| block area, lots per block | MFCG ≈ 18.6 lots per block (`profile-mfcg.md` §4.9); NG block-area distribution at `medium` (vertex captures) | per district | within the NG band on the same face shapes (O4 f) |
| plot / building statistics | FTG footprint median 102.7 m², p95 154, quad side median 10.3 m; 1.52 buildings per lot; entrance ≈ 3 m from the road; 53 % of buildings with a vertex ≤ 2 m from a road (`_critic-ftg.md` §4 rows 10, 11, 15, 17) | per class and district | class-table targets; entrance ≤ 3 m for 100 % of frontage buildings |
| attached share, party-wall share | NG 95–99 % attached, party walls 39–43 % of perimeter (`docs/IMPROVEMENTS.md` O17 answers) | dense classes | ≥ 90 % attached in dense/poor |
| walls: tower spacing, gates | FTG tower spacing median 39 m, towers ⊂ wall vertices (`docs/CONFIDENCE.md` §3.4 C11); MFCG `gates = N` exact (EG2 relayed) | S7 output | spacing within the table band; gates = N in 100 % |
| roads per hectare, alley length | FTG 323–332 m/ha streets, 0 alley length (O18 answers) | per district | alley length falls with prosperity (Spearman ≤ −0.7) |
| plot-area gradient | FTG 441 m² in every suburb class; NG Moran's I −0.04…+0.03 (O18) | Spearman(prosperity, plot area); Moran's I | ≥ 0.8; > 0 |
| draw-style checks (ink preset) | MFCG: casing = body + 2h on 7/7 maps, road 2.0 u, wall 1.9 u, hairline 0.5 px, palette of 4 map colours + ink, 17-step layer order (`visual-spec.md` §0.2, §1.2–1.3) | the SVG/Canvas op log of our renderer | casing law on 100 % of ribbons; layer order equal; ≤ 6 colour roles |
| furrows, fields | MFCG furrow pitch ≈ 9–10 px, per-field angle, hairline (CONFIDENCE B17) | field render ops | pitch and angle law present |
| timing | §12 bar | stage timers | budgets |
| population / buildings | MFCG 6.12 persons per building (C1); FTG 3.4 (`_critic-ftg.md` §4 conclusions) | reported | calibration statistic, not a target |

---

## §14 Package and module layout, key interfaces, dependency rules

```
packages/
  rng/        PCG32, H64, SubStreamFactory, dmath (fdlibm port)                — no deps
  geom/       predicates, hull, OBB, inset/offset (clipper2 adapter), skeleton, splines, poisson, noise adapters, index
  topo/       planar subdivision (DCEL), transactions, invariants               — deps: geom
  model/      schema types, ids, provenance, document, migrations, hashing      — deps: none (types only)
  rules/      data tables (JSON) + schemas + provenance tooling                 — data
  engine/     stage graph, memoisation, scopes, worker pool, report, statistics — deps: model, rng
  stages/     terrain, water, site, network, districts, fortify, fabric, prosperity, plots, siting, siteplan, greenery, hinterland, names, labels — deps: engine, topo, geom, model, rules, rng
  content/    roster solver, households, lazy people, optional simulation       — deps: model, rules, rng
  style/      style sheets, presets, LOD tables                                 — deps: model
  render/     display-list builder, backends (svg, canvas2d, webgl2), shadow pass, label placer runtime — deps: model, style, geom
  export/     json, cbor, geojson, svg, png, vtt (foundry, dd2vtt), gltf, stats — deps: model, render
  edit/       edit events, undo, locks, warp brushes, assignment + placement solver, override layer — deps: engine, topo, model
  api/        embedding API, postMessage protocol, headless CLI                 — deps: engine, edit, render, export
  app/        Vite UI (one-click page, editor, tables editor, report panel)     — deps: api
  parity/     B-REF tooling: capture readers, metrics, golden suite, shift records — dev only
```

**Dependency rules** (enforced by lint): arrows point only downward in the list above; `render` never imports
`stages`; `content` and `stages` share only `model` ids; `rules` is data read through `engine`'s `ParamView`; nothing
imports `app`; `rng`, `geom`, `topo`, `model` have no dependency on each other except `topo → geom`. Model packages may
not import `Math.random`, `Date`, DOM or `performance` (lint).

```ts
// engine
interface Pipeline { run(doc: Document, scope: Scope, opts?: { lod?: LodTier; workers?: number }): Promise<RunResult> }
interface StrategyRegistry {
  network: Map<string, NetworkStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; terrain: Map<string, TerrainStrategy>;
  coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
}
interface NetworkStrategy { grow(site: Site, anchors: Anchor[], terrain: Terrain, water: Water, existing: Network | null, stage: number, rng: SubStreamFactory, k: Kernel): StageResult<Network> }
interface FabricStrategy  { partition(face: FaceRef, seam: SeamContract, ctx: DistrictContext, rng: SubStreamFactory, k: Kernel): StageResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], rng: SubStreamFactory, k: Kernel): StageResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: PlotContext, tables: RuleView, rng: Rng, k: Kernel): StageResult<SitePlan> }
interface BuildingGenerator {                              // stage-3 hook; TrivialOutlineBuilder now
  compose(input: { lot: Ring; access: AccessEdge[]; slot: SitePlanSlot; ctx: PlotContext; assignment?: Assignment; drift?: DriftBounds; subSeed: StreamKey; lod: LodTier }, k: Kernel): StageResult<Composition>
}
interface Composition { outline: Ring; wings?: Wing[]; rooms?: Room[]; heights: { eaveM: number; ridgeM: number; towerM?: number }; entrance: Entrance; roof: RoofSpec }

// kernel façade the stages see
interface Kernel { topo: Subdivision; geom: GeomOps; index: SpatialIndex; tx<T>(fn: () => GeomResult<T>): GeomResult<T> }

// content
interface ContentProvider { manifest(pop: number, character: Character, tables: RuleView, rng: Rng): Manifest; site(manifest: Manifest, plots: Plot[], ctx: SitingContext, rng: Rng): SitingResult; people(building: EntityId, rng: Rng): Person[] }

// export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Blob | string> }
```

**Extension points**: every `Map` in `StrategyRegistry` (stage 2 registers `RingFabric`, `SquareFabric`,
`StreetFabric`; a village product registers a tracker `NetworkStrategy` and a "houses along ways" `FabricStrategy`);
`BuildingGenerator` (stage 3); `ContentProvider` (host inputs); `StyleSheet` registry and presets; `Exporter`s;
rule tables (data); `EditKind` handlers; `LayerSpec`s (sewers, islands).

---

## §15 Parity matrix and improvement matrix

### 15.1 Parity matrix — every capability row of `docs/CONFIDENCE.md` §4.1–4.4

Tags: **BASE** (the stage-1 generator must deliver it), **STAGE-2** (delivered by the neighbourhood stage through the
§4.9 interface; the base carries the data), **VILLAGE-LATER** (checked as not precluded only). "Where" names the section
and stage. Rows marked ⇧ are delivered at parity *and* beyond the reference's recorded weakness (the annotation in
`docs/CONFIDENCE.md` §1 "what the numbers are not").

**MFCG (40 rows, all BASE)**

| id | capability | where in this design | tag |
|---|---|---|---|
| A1 | parameter surface / Blueprint / URL | S0 recipe, §6.5 permalinks (version axes ⇧) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1–6.2 hashed sub-streams ⇧ (locality) | BASE |
| A3 | pipeline structure and failure policy | §4.1 stage graph; §5 ladders without the restart tier ⇧ | BASE |
| B1 | patch mesh | replaced as the layout substrate by backbone faces (§4.4); Voronoi kept for seed clouds and fields (§3.3) ⇧ | BASE |
| B2 | junction optimisation | weld / merge-junction rules (§3.2, §4.4) | BASE |
| B3 | coast / water field / `sea` | S2 closed-outline coast from a sea bearing (§4.2) | BASE |
| B4 | `buildDomains` | S2 land components | BASE |
| B5 | curtain wall, gates, towers, watergate | S7 (§4.8): trace on defensible ground, gates on arterials = N, towers by rule, water gates ⇧ | BASE |
| B6 | citadel / castle | S4 site score, S7 claim with the 0.75 compactness gate and re-claim repair, keep by `lir` | BASE |
| B7 | streets and roads | S5: every gate ↔ plaza, roads to bearings, least-cost (§4.4) ⇧ | BASE |
| B8 | rivers / canals | S2 rivers by descent, course-first; canals a toggle (§4.2) ⇧ (no restarts) | BASE |
| B9 | districts | S6 typed faces with seam contracts (§4.5) | BASE |
| B10 | ward → blocks (alleys) | S8 bent-cut engine, block stop predicate (§4.5) | BASE |
| B11 | block → lots | S10 frontage-first bent lot cuts, no silent discard (§4.6) ⇧ | BASE |
| B12 | outskirts density falloff | S14 distance-to-gate density kernel per plot (§4.8) | BASE |
| B13 | shanty town / sprawl | S6 squalid type after the first half, S14 ribbons (§4.5, §4.8) | BASE |
| B14 | plaza, temple, churches, gate plazas | S4 anchors + S10 claims; churches as small-square institutions; gate plazas by rule | BASE |
| B15 | landmark / solid buildings, keep plan | S12 landmark classes; ink preset solid silhouettes (§8.3) | BASE |
| B16 | greens / parks | S13 greenery by prosperity (§4.8) ⇧ | BASE |
| B17 | farms and fields | S14 field-system presets; furrow style (§8.3) | BASE |
| B18 | harbour, docks, piers | S4 harbour site, S6 docks district, piers as `pier` ways (§4.8) | BASE |
| B19 | trees and forests | S13 forest entities + render instancing; Poisson k option (§3.3, §8.3) | BASE |
| B20 | elevation field | S1 terrain the layout responds to (§4.2) ⇧ | BASE |
| C1 | display modes (Lots / Complex / Blocks / Hidden) | the plot model and LOD tiers replace the global switch; a cadastral layer toggle (§8.1) ⇧ | BASE |
| C2 | roofs, Raised, Solids | S12 skeleton roofs; style `raised`; landmark solids (§4.7, §8.3) | BASE |
| C3 | lot post-processing (Offset) | site-plan front-line jitter (§4.7) | BASE |
| D1 | naming | §9 original grammar engine and corpora | BASE |
| D2 | district labels | §9 hole-aware skeleton spines with OBB-arc fallback ⇧ (protected features) | BASE |
| D3 | map furniture | §9 scale bar, compass, grid, legend, title | BASE |
| E1 | colour system (tints, weathering) | style jitter streams and roles (§8.3) | BASE |
| E2 | stroke discipline, layer order, caching | ink preset laws, per-group caches (§8.3–8.4) | BASE |
| E3 | alleys layer | alleys as typed ways drawn by LOD (§4.5) | BASE |
| E4 | district view, framing, thin lines | district LOD tier; framing rule (§8.1) | BASE |
| F1 | warp tools | §7.3 `warp` brushes (eight kernels), topology-preserving, persisted ⇧ | BASE |
| F2 | rerolls, renames, landmarks | §7 `regenerate` scopes, `setAttr`, `assign` ⇧ (undo, persist) | BASE |
| F3 | UI / hotkeys / size bands | app layer; TOWN → CITY → METROPOLIS ladder (§1.1) | BASE |
| G1 | export PNG / SVG / JSON | §11 ⇧ (round-trip import) | BASE |
| G2 | integrations | §11 embedding API; cross-generator links are ours only | BASE |
| H1 | population and scale model | §10 population as input; statistics record (§11) | BASE |
| H2 | performance envelope | §12 budgets | BASE |

**FTG (46 rows, BASE unless noted)**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | S0 recipe, presets as data (§7.5), document (§2.10) | BASE |
| A2 | two-phase pipeline, staging, failure policy | S3 manifest before geometry, S5 growth stages, §5 | BASE |
| A3 | coordinate system, units, wire format | integer cm centred frame (§3.1), CBOR binary (§2.10) | BASE |
| A4 | determinism, seeding, regeneration | §6 ⇧ (the reference has none) | BASE |
| A5 | server/client split, persistence, lazy people | client-side, document, lazy people (§10) | BASE |
| B1 | size ladder, population, area budget | §4.3 budget from the manifest | BASE |
| B2 | dependency-graph building selection | §4.3 / §10 roster fixed point | BASE |
| B3 | residents, jobs, backfill, matching | §10 households and job matching | BASE (roster) / should-have (matching detail) |
| B4 | people model | §10 lazy people; appearance templates later | BASE (lazy) |
| B5 | government, religion, factions, military | §10 factions as entities and fields | BASE (tables) |
| B6 | relations, friend groups, rivalries, events | §10 optional simulation module | should-have (J-S) |
| C1 | coast generation, islands, ponds | S2 closed-outline routine (§4.2) | BASE |
| C2 | rivers, branches, bridges, classification, direction | S2 descent rivers, tributaries, crossing sites (§4.2) | BASE |
| C3 | manually drawn water | §7.3 `drawWater` as a constraint | BASE |
| C4 | road-graph substrate (one graph) | §2.3 subdivision with typed edges | BASE |
| C5 | road growth (queue, 15° cap, stages) | S5 least-cost staged growth (§4.4); a proposal-queue strategy for `ringed` / `american` | BASE |
| C6 | district lots, merge floor, type selection | S6 (§4.5) | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings) | claims → S8 → S10 → S12 | BASE |
| C8 | lot → plot subdivision geometry | S10 frontage-first bent cuts (§4.6) | BASE |
| C9 | footprints, landmark templates, entrances | S12 site plans; entrance rule (§4.7) | BASE |
| C10 | suburb stage | S14 outskirts ribbons and offshoot lanes (§4.8) | BASE |
| C11 | walls and towers | S7 (§4.8) | BASE |
| C12 | castle district | S4/S7 castle claim, bailey, keep, moat toggle | BASE |
| C13 | harbours and waterfront districts | S4 harbour site, S6 docks type, quay and piers (§4.8) | BASE |
| C14 | outer settlement: farmland, farmsteads | S14 field presets incl. farmsteads (§4.8) | BASE |
| C15 | forests, tree areas, trees, hedgerows | S13/S14 forest entities; hedgerows as field-edge greenery | BASE |
| C16 | landscape decorations, reserve, climates | S14 decorations table; climate as a style + terrain preset | BASE (data) |
| C17 | perimeter expand + round; decoration system | S14 extent rounding; plot decoration vocabulary (§4.7) | BASE |
| C18 | district and building naming, erosion | §9 grammar with contraction operator | BASE |
| D1 | renderer architecture | §8 display list + backends | BASE |
| D2 | palette and feature treatment | `lit` preset (§8.3) | BASE (second preset) |
| D3 | roofs (straight skeleton) | S12 / §8.3 | BASE |
| D4 | water rendering and coast decoration | style roles for water; beach/rock/cliff classes as coast-edge attributes | BASE (partial: classes as data) |
| D5 | day/night, weather, seasons, window lights | `lit` preset ramps; window lights from the optional simulation | should-have |
| D6 | post-process effects | WebGL2 post hooks (§8.4) | should-have |
| D7 | labels, scale bar, grid, legend, thematic layers | §9; thematic = style overrides per role | BASE |
| D8 | 3-D view, street view, height maps | glTF export (§11); the heightfield exists (§4.2) | BASE (export) |
| E1 | layout editor | §7 edit kinds with snapping and validation | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.3 `regenerate` with locks and faithful sub-streams ⇧ (undoable) | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | `setAttr`, rule tables, labels, `LayerSpec` (§7) | BASE |
| F1 | schedules, behaviours, sub-locations | §10 optional module | should-have |
| F2 | clock, calendar, external time sync | §10 optional module; API events (§11) | should-have |
| G1 | export | §11 ⇧ (districts in GeoJSON; per-layer VTT) | BASE |
| G2 | integrations (Foundry, Roll20, links) | §11 VTT exports and postMessage API | BASE |
| H1 | data scale | §12 memory economy; lazy people | BASE |
| H2 | performance envelope | §12 (client-side ≤ 300 ms CITY vs 3–7 s server) ⇧ | BASE |

**NG (32 rows — the stage-2 interface; BASE where the base already delivers it)**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, `Settings`, URL state | district character and fabric params in the `NeighbourhoodRequest` (§4.9); permalinks (§6.5) | STAGE-2 |
| A2 | RNG engine, one stream, successor seed | §6 (district sub-seed) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (the local "Alternative cut / Trying again" retries are the F-CUT ladder) | BASE |
| B1 | hood outline (`createShape`) | the district face *is* the outline; an arbitrary boundary polygon is accepted (sky islands) | STAGE-2 |
| B2 | templates area / street / square | `FabricStrategy` registrations (§4.9) | STAGE-2 |
| B3 | street network by bent recursive bisection | S8 bent-cut engine (§4.5) — already the base's fabric | BASE |
| B4 | hole-aware bisection of annuli (`BisectorEx`) | `RingFabric` with the F-CUT ladder on holed faces; Clipper2 handles holes | STAGE-2 |
| B5 | street finishing: extend, fillet, width, corridor | §4.5 steps 4–5 (fillets, widths by class, corridor carving) | BASE |
| B6 | block content dispatch | S8/S13 block content rule (normal / manor / empty / green) reading the context vector | STAGE-2 |
| B7 | square-template plaza | `SquareFabric` (rectangular and round plazas) | STAGE-2 |
| B8 | ring-template seed geometry | `RingFabric` (concentric rings + radials) | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | S10 frontage-first with typed residue ⇧ | BASE |
| C2 | buildings, wings, plans, roof kinds, landmarks | S12 + neighbourhood LOD; wings via `BuildingGenerator` (stage 3) | STAGE-2 (render) |
| C3 | manor compounds | set-back compound site plan (§4.7) with a grove by the greenery rule | BASE |
| C4 | greens, groves, shared Poisson field | S13 greens in blocks; render-time Poisson instancing | STAGE-2 |
| C5 | trees | render instancing at neighbourhood LOD (§8.3) | STAGE-2 |
| C6 | pins (wells, fountains, trees) | neighbourhood-LOD `Pin` entities from a probability gate | STAGE-2 |
| C7 | uneven streetwall | site-plan front-line jitter (§4.7) | BASE |
| C8 | size tags, scale, character knobs | district character vector and the plot granularity law (§4.6) — in metres ⇧ | BASE |
| D1 | naming | §9 | BASE |
| D2 | title layout | §9 title in the emptiest corner | BASE |
| E1 | palette / style schema | `graphic` preset reserved (§8.3) | STAGE-2 |
| E2 | canvas, layer order, stroke discipline | §8 | BASE |
| E3 | roads rendering (Plain + five modes) | style roles per way surface | STAGE-2 |
| E4 | roof rendering (hatch triangles, two-tone) | neighbourhood LOD roof styles | STAGE-2 |
| E5 | shadows | `ShadowPass` drop mode (§8.2) | BASE (hook) |
| E6 | unrecorded style features | `graphic` preset extras | STAGE-2 |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | app layer; `setAttr` rename persists ⇧ | BASE |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations | §11 | BASE |
| H1 | performance envelope | §12 per-district regeneration ≤ 30 ms | BASE |

**VG (44 rows — VILLAGE-LATER; each checked as not precluded by the base)**

| rows | capability group | not precluded because |
|---|---|---|
| G1, G20 | tags, descriptive tags | the recipe's character vector and a tag layer are data (§7.5) |
| G2 | seed, RNG streams, retry | §6 sub-streams; the ladder replaces "discard the village" |
| G3, G4, G5 | river course before terrain, height field, water extraction | S1–S2 already work course-first with a carved field and level-set water (§4.2) |
| G6, G7 | density map, heart | a `Field2D` of kind `density` and a scored centre exist (§2.4, §4.3) |
| G8, G9, G11 | tracker roads, bridges, piers | `NetworkStrategy` admits a tracker walk; crossing sites and `pier` ways exist |
| G10 | square and centrepieces | `SquareFabric` (stage 2) and pins |
| G12 | buildings along ways + population | a "houses along ways" `FabricStrategy` + site plans; population is an input |
| G13, G14 | fields, orchards | S14 field systems and orchard greenery (§4.8) |
| G15 | forest | S13 forest entities with domain-warped edges |
| G16 | palisade and gates | `WallLine.kind = 'palisade'` (§2.8) |
| G17, G18, G19 | naming, legend/POIs, population class | §9 grammar; labels; size ladder table |
| R1–R17 | painterly rendering (relief marks, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | the `painterly` preset slot and the display list's roles (§8.3); house numbering = `setAttr` on plots |
| E1–E6, D1 | exports, permalinks, editing, integrations, performance, scale | §11, §6.5, §7; a village-size budget is a table row |

### 15.2 Improvement matrix — every must-have and should-have of `docs/IMPROVEMENTS.md` §5

| id | mechanism in this design | acceptance metric adopted (from the opportunity's criteria) |
|---|---|---|
| O2 deterministic recipe | §6: PCG32, hashed sub-streams per (stage, entity, concern, attempt, epoch), stable hierarchical ids, seeded decoration, version axes | model hash identical on two machines and browsers (100 % of B-CITY); perturbation tests (grammar change → 0 geometry change; new layer → 0 other entities); locality ≥ 95 % on single-parameter edits; ids outside an edited region survive 100 % of B-EDIT; goldens byte-identical for untouched stages |
| O6 metric units, furniture, statistics | §3.1 integer cm, metres in every table and API; §9 furniture; §11 statistics record with provenance; the size ladder as population/area/buildings | every parameter labelled in metres; statistics record per generation; scale bar / compass / grid toggles; ladder rows carry population, area and building counts |
| O3 robust kernel, no restarts | §3, §5 | B-FUZZ 0 crashes / hangs / self-intersections; whole-map restarts = 0; hard invariant violations 0 per 1 000; stage retries ≤ 2 % with p99 ≤ 3; B-EDIT 0 planarity violations; model hash identical across platforms; seed never swapped |
| O11 entity model, schema, registry, exports, API | §2, §11, §14 | containment complete (every building in a plot in a block in a district: 100 %); references by id; round-trip import reproduces the hash; GeoJSON/SVG/PNG views; headless API |
| O1 terrain and hydrology first | §4.2 | restarts 0; contours cross water 0 times; river through the core when requested ≥ MFCG's rate; drainage queryable (outfalls listed) |
| O4 two-tier street network | §4.4–4.5 | 100 % of through-roads at a named destination; bearings within ± 10°; detour ≤ 1.4 median; junction p5 ≥ 30°; no turn cliff; 4-way 0–15 %; width by role (Spearman with betweenness > with length); arterial grade limit 0 % exceeded; edges < weld tolerance 0; network + infill ≤ 100 ms at CITY with block statistics in the NG bands; N external connections exactly N |
| O5 frontage-first typed plots | §4.6 | 100 % access edges; typed residue (no silent discard); corner/wedge rules; minimum width/angle invariants |
| O18 prosperity field + granularity law | §4.6 | Spearman(prosperity, plot area) ≥ 0.8; Moran's I > 0; monotone detached/yard/coverage trends; alley length falls with prosperity (Spearman ≤ −0.7); access completeness 100 %; institutions on adequate plots 100 %; one code path with provenance and perturbation checks; seams within band; field smooth and editable; variance floor; gap-width modes |
| O17 plot model and site plans, heights | §2.6, §4.7 | coverage within table targets; multi-footprint plots > 0 for institutions/manors/inns/farms; party-wall share bands; streetwall continuity ≥ MFCG Lots mode; yards owned 100 %; footprints fit 100 %; heights on 100 % of buildings; shadow length ∝ height (r ≥ 0.99); ≤ 10 µs per plot; footprint hash identical at every LOD |
| O7 content-first land use | §4.3, §4.7, §10 | 100 % function and occupancy; the context vector on every plot; plan–fit–reconcile ≤ 3 rounds; people lazy and pinned |
| O19 greenery by prosperity | §4.8 S13 | greenery share per band monotone; typed owned entities; trees never stored |
| O8 fortification as a network | §4.8 S7 | gates on arterials 100 %; several enceintes; towers by rule; castle sited by score; wall → road conversion is a graph op (test) |
| O12 display list with LOD, style as data, layers | §8 | continuous zoom with hysteresis; ink and lit presets; per-LOD style regression; layer toggles; shadow hook present; one renderer for screen and export |
| O9 persistent document | §2.10, §7 | save → load → save byte-identical; locked entities preserved 100 %; faithful regeneration KS p > 0.05 on ≥ 95 %; every operation undoable; upgrade replay keeps 100 % of edited entities; the 12 MFCG edit asks expressible 12/12 |
| O16-core generation report and honest controls | §5.3, §7.5 | report in UI and API; auto-resolved values reported; regenerate / adjust / new random are distinct |
| O13-core labels and names | §9 | protected features never covered; scale bar and compass; names conditioned on the model; per-entity rename persists |
| O14-core hinterland | §4.8 S14 | farmland per capita within band; every land component used; roads leave to destinations; rivers enter and exit |
| **should-haves** O10 (intent, character, pins, forms, assignment solver in full) | §7.4 solver; character vector in S3; circumstances timeline in the recipe | assignment placement success and drift-bound tests |
| O13 full (named ways, addresses, annotation layer) | §9 | collision 0; address completeness |
| O14 full (rings, presets, wildness, supply check) | S14 presets | preset coverage |
| O16 full (thumbnails, previews, drafts) | app | — |
| O12 extras (relief tiers, tiled export, low-end tier) | §8.4 | tiers exist |
| O7 simulation module | §10 | deterministic `where(person, hour)` |
| O11 extras (VTT-native, per-layer files, binary, glTF, GIS profile) | §11 | format validators |
| O9 extras (upgrade replay with diff) | §7.6 | upgrade test |
| O2 / O6 extras (golden suite with shift records; calibration interface) | §13.3, §7.5 | shift records present |
| hooks §5.4 (1–8) | ids and sub-streams (§6); lifecycle, edit log, incremental epoch mode, conversions (§4.10, §7); assignment input and solver (§7.4); context vector and rule tables (§2.7); building-generator interface with heights and the shadow hook (§4.7, §8.2); layers, drainage, arbitrary-boundary neighbourhoods, oval islands (§2.9, §4.2, §4.9); editable versioned tables with a preference layer (§7.5); circumstances and the stored prosperity field (§2.4, §2.10) | each hook has a type in the schema and a test that it is carried on every B-CITY city |
| stage-2 S1 / S3 | `SeamContract` on every district; seam-continuous fields | 100 % of districts carry a complete contract |

---

## §16 Build plan — base milestones first, riskiest spikes first, then stage 2

Staffing per the owner: rulings and architecture on Fable seats; build, verify and measure on Opus seats. Durations
are PLAUSIBLE for two implementers plus a verifier; every milestone ends on executed evidence (B-CITY runs, parity
output, side-by-sides), never on intention.

| milestone | content | exit criteria (executed) |
|---|---|---|
| **M0 — spikes (weeks 1–3)** | (a) kernel spike: the integer DCEL with snap rounding, Clipper2 adapter, typed results, a B-FUZZ subset; (b) **bent-cut spike** on the NG faces from the 2026-09-25 vertex captures — the forward model (`captures/neighbourhood/bentcut_forward.py`, CONFIRMED 80 % on plain templates) re-implemented in our kernel; (c) **fused-layout spike**: least-cost backbone over a synthetic cost surface + bent-cut infill on its faces at CITY face counts; (d) determinism spike: sub-stream factory, `dmath`, model hash identical between Node and a headless browser | (a) 0 crashes / hangs on 10⁵ fuzz polygons; (b) our cuts reproduce PF-3's distributions (corner at 0.5 ± 0.1 ≥ 80 %, arrival ≥ 85° ≥ 95 %); (c) **network + infill ≤ 100 ms at CITY** and block-area distribution inside the NG band — the O4 (f) guard; if it fails, §1.2's fusion is revised before M1; (d) hashes identical on 2 platforms × 100 seeds |
| **M1 — a viewable MFCG/FTG-class town (weeks 4–10)** | S0–S8, S10 (plots with access edges; JOIN/SPLIT on a flat prosperity field), S12 with row/detached site plans and heights, S7 walls/gates/towers/castle claim, S15 district names and skeleton labels, the ink preset at city and district LOD (Canvas2D + SVG + PNG), the generation report, the B-CITY harness and goldens v0 — the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG/SVG, O1, O4, O5, O18-flat, O17-basic, O8, O12-ink, O16-core) | side-by-sides against MFCG and FTG at TOWN / CITY / METROPOLIS for the owner's eye; whole-map restarts 0 over 1 000 seeds × 4 water configurations; TOWN ≤ 100 ms and CITY ≤ 300 ms model on reference hardware; every district carries a `SeamContract`; parity metrics computed (bands as placeholders) |
| **M2 — the plot model and content (weeks 11–16)** | S9 prosperity field with drivers and the brush; the full granularity law (joins for institutions, splits for poor bands, alleys and back lanes); S11 siting from the roster; S12 full site plans (compound, hovel), roofs, entrances; S13 greenery; S14 hinterland (field presets, forests, outskirts ribbons, roads to the frame); O13-core street names; O14-core; the statistics record | O17 and O18 acceptance runs (coverage, party walls, Spearman ≥ 0.8, Moran's I > 0, access 100 %, alley gradient); roster placed 100 %; site plans ≤ 10 µs per plot |
| **M3 — the document and editing (weeks 17–22)** | the edit log, locks, scoped faithful regeneration, undo/redo, warp brushes, drawn constraints (ways, water, walls, boundaries), assignments and the placement solver, rule-table overrides and the preference layer, migration; B-EDIT harness; the embedding API, GeoJSON, VTT (Foundry + dd2vtt, per layer), glTF | O9 acceptance (byte-identical round trip, locks 100 %, KS faithfulness, undo enumeration, the 12 MFCG asks 12/12); B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences |
| **M4 — lit preset, performance tiers, the incremental path (weeks 23–26)** | the `lit` preset on WebGL2 with the drop-shadow pass; LOD hysteresis and the low-end tier; workers for S8/S10/S12; **the one incremental path: add a growth stage to an existing town** (the EVO hook's proof: surviving entities byte-identical, new entities on epoch streams, wall → ring-road conversion as a graph op); the roster-only content module hardened; optional simulation module started (J-S) | METROPOLIS ≤ 1 s; epoch test: 0 re-rolled survivors; conversion test passes; the second preset side-by-side against FTG |
| **M5 — stage 2: neighbourhood composition (weeks 27–32)** | `RingFabric`, `SquareFabric`, `StreetFabric`; the neighbourhood LOD tier (roof hatching, chimneys, pins, per-tree canopies, hood title); the close-up workflow on any district and on an arbitrary boundary (sky context); seam tests | every district of every B-CITY city opens as an NG-class close-up; shared-edge geometry byte-equal across adjacent neighbourhoods; per-district regeneration ≤ 30 ms; side-by-side against NG |

**Riskiest spikes first, in order**: the fused layout timing and statistics (M0 c), the bent-cut engine on concave and
holed faces (M0 b), the integer kernel and the Clipper2 port (M0 a), the straight-skeleton robustness for labels and
roofs (early M1), the roster tables' authoring cost (M2; the FTG effort re-pricing in `docs/CONFIDENCE.md` §3.4 is the
warning).

**Deliberately out of scope for this plan** (documented, not bugs to re-find): the village product (§1.4); stage-3
compositions beyond the interface and `TrivialOutlineBuilder` (Fantasy Manor's own archive round is later); the sewer
and floating-island rules beyond the hooks of §2.9 and §4.2; the evolution engine beyond the single incremental path of
M4; the historical-corpus calibration; setting packs; host inputs; a sync/sharing service; a WASM kernel (behind the
façade when profiling says so).

**Effort (PLAUSIBLE).** M0–M3 ≈ 22 weeks × 2 implementers ≈ 44 person-weeks; M4–M5 ≈ 10 weeks × 2 ≈ 20; plus a
verifier seat throughout ≈ 10–15: **≈ 75–80 expert person-weeks for the base and the stage-2 composition**, against the
per-reference isolated figures of 46 (MFCG) and 52 (FTG map subset) in `docs/CONFIDENCE.md` §1, which are not additive.

---

## §17 Clean-room and legal posture; third-party licence list

* **No reference code, ever.** TownGeneratorOS (GPL-3) was read only by critic seats for constants and control flow,
  never by an implementer; implementers are forbidden to open `reference/TownGeneratorOS`, `reference/towngenerator-foundrymodule`
  (MIT, but its field names are FTG's) and every captured bundle under `captures/**/network/bodies/*.js` (a CI check
  greps the build tree for any such path). The findings, the critics, `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`
  are the only inputs; `docs/design/CLEAN-ROOM.md` (to be created at M0) records the rule and the reading that preceded
  the design.
* **No reference data.** Naming grammars, Markov corpora, palette JSON values, FTG's building / profession / item tables
  and textures document behaviour; every table, corpus, palette and texture in `@burgh/rules` and `@burgh/style` is our
  own authoring with a provenance field naming its author and date. Schema *ideas* (a 13-key palette, a venue-class
  table with per-capita ratios) are used; values are not.
* **Algorithms are ideas.** Bent recursive bisection, OBB-axis cuts, perimeter-block insets, the casing law, per-ward
  caching, staged growth with pruning, lot detection by faces, roster-first content, skeleton spines — all are the
  creators' published ideas re-implemented from their statements and from measured behaviour, which the clean-room
  ruling permits; the constants are ours and calibrated to measurements.
* **Our own licence**: the owner's call (not decided here; §18.2 D11).

| dependency | use | licence | status |
|---|---|---|---|
| `delaunator`, `d3-delaunay` | seed clouds, Lloyd, terrain TIN, medial axes | ISC | adopt |
| `robust-predicates` | `incircle` (adaptive) | Unlicense / ISC (verify at adoption) | adopt |
| Clipper2 (TypeScript or WASM port) | booleans, offsets | Boost Software Licence 1.0 (the port's own licence to verify) | adopt; fallback `polygon-clipping` (MIT) |
| `earcut` | triangulation | ISC | adopt |
| `rbush`, `flatbush` | spatial index | MIT, ISC | adopt |
| `simplex-noise` or `open-simplex-noise` | noise | MIT / Unlicense | adopt (determinism verified) |
| `d3-contour` | marching squares | ISC | adopt |
| fdlibm port (`dmath`) | deterministic transcendentals | Sun's permissive fdlibm notice | adopt (port vetted) |
| `cbor-x` | binary document | MIT | adopt |
| `fast-check`, `vitest`, Playwright, Vite, esbuild, pnpm | tests and build | MIT / MIT / Apache-2 / MIT / MIT / MIT | dev |
| fonts for the ink preset (IM Fell family, Cinzel) | type | SIL OFL 1.1 | style assets (embedding allowed under OFL) |
| straight-skeleton ports | none assumed — built in-house unless a permissive port passes B-FUZZ | to verify | decide at M1 |
| a licence checker with an allowlist (MIT, ISC, BSD-2/3, Apache-2, BSL-1.0, CC0, Unlicense, OFL for fonts) | CI | — | enforced |

---

## §18 Alternatives for the hard-to-reverse decisions, delegated decisions, deferrals

### 18.1 At least two alternative shapes per decision, and why each is rejected

| decision | chosen | alternative | why rejected (one sentence) |
|---|---|---|---|
| spatial truth model | integer half-edge planar subdivision with stable face ids (§2.3, §3.2) | shared mutable `Point` polygons (the 2017 ancestor) | O(n) identity-based adjacency, aliasing bugs and unserialisable state (`os-geometry.md` §1.1 rewrite verdict) |
| | | raster / signed-distance truth with vector extraction | plots and party walls need exact shared edges and extraction cannot keep ids stable across edits |
| | | polygon soup with faces re-walked on demand (FTG-like) | re-walked faces lose stable ids, so edits cannot be local and containment cannot be complete (FTG's 53 % containment) |
| numeric policy | integer cm topology with exact `orient2d`, deterministic doubles for fields (§3.1, §6.4) | floats with epsilons everywhere | the references' whole failure class (`os-geometry.md` §4; FTG's sub-metre edges and duplicate intersections) |
| | | exact rationals / BigInt everywhere | 10–50× slower and breaks the sub-second bar (R1) |
| | | fixed-point 64-bit for everything including fields | awkward for noise and costs with no determinism gain over IEEE + `dmath` |
| RNG / stream design | PCG32 seeded by a hash of (seed, stage, entity, concern, attempt, epoch) (§6.2) | one global stream (all three watabou generators) | every feature re-rolls the world; no locality; no epoch stability |
| | | counter-based RNG (Philox / Threefry) keyed by ids | the same property with a heavier 32-bit implementation; can be swapped in behind the factory later |
| | | per-stage streams only | adding one entity shifts every sibling in the stage |
| stack | TypeScript, browser-first, workers, WASM later (§1.5) | Rust core + WASM from day one | slower iteration while constants are still being calibrated, and a call-boundary cost for many small kernel calls; admissible later behind the kernel façade |
| | | native desktop (C++/Swift) | the embedding target is the browser (owner default) |
| | | Python prototype then port | double work and determinism drift between the two |
| display-list design | semantic retained list with roles, LOD, groups and a shadow hook (§8.1) | immediate-mode drawing from stages (the references) | render coupled to model, no LOD, no multi-backend, no pixel-identical export |
| | | an SVG/DOM scene graph as the truth | 46 000 elements are too slow in the DOM (MFCG's cache proves per-group rasters are needed) |
| | | pre-rendered raster tiles as the primary | loses vector export and local edits |
| fused layout | grown destination-driven backbone + bent-cut infill (§1.2, §4.4–4.5) | (A) Voronoi wards, (B) proposal growth everywhere, (C) bent cuts as queue proposals | §1.2 |
| plot subdivision | frontage-first bent cuts with JOIN/SPLIT (§4.6) | FTG's straight edge-driven strips only | no T fabric and no bend (the NG signature is lost); single 1.5 m gap mode |
| | | Voronoi lots (MFCG 0.8.0) | "crashes the generator occasionally", triangle-looking quads (CONFIDENCE §0.2 spot-check 6 relayed) |
| failure policy | ladders without a restart tier (§5) | keep a bounded whole-map restart as the last tier | it hides feasibility bugs and costs the richest configurations most (MFCG 7/10 at size 80); J-K adopted |

### 18.2 Delegated decisions (adopted as decided; each vetoable by the owner)

| id | decision | rationale / to veto |
|---|---|---|
| D1–D7 | the owner's ADOPTED DEFAULTS: ink look default and an FTG-like lit second preset; high-to-late medieval Western Europe as the era centre; realism in the base, fantasy as named toggles; browser-first embeddable library with permissive dependencies; acceptance = the owner's eye on side-by-sides plus parity numbers; original English-fantasy naming with setting packs later; improvement weighting realism, editability, plot texture > speed, export > novelty | owner, 2026-09-25 — adopted verbatim |
| D8 | 3-D export = glTF 2.0 (OBJ optional) | resolves `docs/IMPROVEMENTS.md` §7.3's open choice; permissive, binary, materials; to veto: CityJSON-style instead |
| D9 | simulation scope = roster, context vector, lazy people now; schedules / relations / events as an optional module from M4 | J-S; to veto: move to must-have (M2) |
| D10 | codename `Burgh` / `@burgh/*` | a placeholder; rename at will |
| D11 | the licence of our own code | **not decided** — owner-gated |
| D12 | PCG32 and a murmur-style 64-bit key hash | §6.1; to veto: xoshiro128\*\* or Philox behind the same factory |
| D13 | weld tolerance 25 cm, minimum plot width 2.5 m, minimum interior angle 12°, wall setback and tower spacing bands as table rows | §3.1; all calibratable |
| D14 | `Enter` = seed + 1 | transparency (O16-core); to veto: a hashed successor |
| D15 | the size ladder's population targets 5 000 / 20 000 / 50 000 and district band 5–15 ha | from B-CITY and FTG's floor; calibratable |
| D16 | shadows off by default; drop shadow first, projected shadow later | owner restraint ("a bit too dramatic"); Fantasy Manor's 90 % |
| D17 | MFCG's compactness gates 0.7 / 0.75 kept as shape gates; MFCG's `gates = N` exactness kept; FTG's stage pruning kept | measured or stated reference properties that cost nothing |
| D18 | the whole-map restart tier does not exist in the pipeline | J-K; to veto: a p99-bounded last tier |
| D19 | four `FabricStrategy` slots in the registry from M1 (bent-cut now; ring / square / street in M5) | stage-2 readiness without paying for it |
| D20 | reading budget: the confidence assessments and most findings were read by outline (§0.1) | honesty over coverage; a reviewer may direct a re-read of any section named in Appendix A |

### 18.3 Deferrals (documented, not bugs to re-find)

Final numeric targets for every band and threshold (J-T; set from B-REF by the validation lanes); the exact `dmath`
function set and its port; a WASM kernel; the dd2vtt profile details; the sewer and island rule design; the evolution
engine beyond one incremental path; the corpus calibration pass; setting packs; host inputs; the choice between a
straight-skeleton port and an in-house build (M1); the licence of our own code (owner).

### 18.4 CONFIRMED versus PLAUSIBLE, in one paragraph

Every reference fact this design rests on is CONFIRMED by the lane that measured or read it and is cited to that lane's
file and section (the critics' rulings, `docs/CONFIDENCE.md`'s executed checks, the NG forward test, the FTG payload
re-derivations, the MFCG censuses); every mechanism, budget, band, effort figure and milestone in this file is
PLAUSIBLE — reasoning from that evidence — until M0's spikes and the B-CITY / B-EDIT / B-FUZZ / B-REF / B-ZOOM
harnesses execute it. The five risks that could move the design: the fusion timing (M0 c), the bent-cut engine on
concave and holed faces (C13 constants are ours), the roster tables' authoring cost, the straight skeleton's robustness,
and the maturity of an integer Clipper2 port.

---

## Appendix A — sections read in full for this proposal

`_critic.md` §0–§6 · `_critic-os.md` §0–§6 · `_critic-ftg.md` §0–§6 · `_critic-vg-ng.md` §0–§6 · `docs/CONFIDENCE.md`
§0–§8 · `docs/IMPROVEMENTS.md` §1, §2, §3.1, O2, O3, O4, O9, O17, O18, §4, §5.1–5.5, §7.1–7.4 · `visual-spec.md` §0.2,
§1.1–1.3, §5, §6, §7 · `os-geometry.md` §1.1–1.5, §4, §5, §6, Critic-2 addendum · `manor.md` §2.1–2.6, §3.1–3.3,
§4.1–4.4, §8, §9 · `profile-mfcg.md` §3.1–3.2, §4.9, §11, ST-8 · `ftg-docs-params.md` §2.1–2.7 · `watabou-extra-a.md`
§2.1 · `profile-neighbourhood.md` BG-4, PF-3 · `os-model.md` §11 · `mfcg-posts-b.md` §2.3–2.5 · `docs/PLAN.md`,
`docs/DEFINITION.md`, `docs/AMENDMENTS-2026-09-25.md` (whole). The section outline (`grep -n '^#'`) of every findings
file was read; every other section is cited only through a file that was read in full.
