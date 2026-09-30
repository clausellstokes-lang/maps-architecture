# proposal-kernel — GEOMETRY-KERNEL-FIRST architecture for the fused town/city generator

Lane `design/proposal-kernel` (workflow 03 `wf_e306f20c-a9f`, Design phase, architect seat 1 of 3, Fable, 2026-09-25).
Status: **COMPLETE** (2026-09-25). Layout: §0 reading log · §1 scope, fusion thesis, stack · §2 domain model · §3 kernel ·
§4 pipeline (incl. the stage-2 interface and conversions) · §5 failure handling · §6 determinism · §7 editing · §8 rendering ·
§9 labels · §10 simulation · §11 export · §12 budgets · §13 testing and parity metrics · §14 packages and interfaces ·
§15 parity and improvement matrices · §16 build plan · §17 legal · §18 alternatives · §19 delegated decisions · Appendix A.

Thesis of this seat: every weakness the four reference generators' creators admit — collapsed or intersecting edges,
concave shapes that break bisection, tolerance bugs, "bad poly" restarts of a whole city, null OBBs, unbounded
recursion, self-intersecting user strokes, duplicate road intersections — traces to fragile ad-hoc geometry on plain
vertex arrays. This proposal makes ONE robust planar-subdivision model (a versioned, snapped, exactly-predicated DCEL
with typed faces) the single spatial truth that every stage reads and writes, and derives everything else — districts,
blocks, plots, buildings, walls, water, labels, exports, edits, epochs — from it.

## 0. Reading log, judgment calls and evidence discipline

### 0.1 Trigger and authority (recorded vetoably)
The harness relayed the owner's triggering message as the status question "what's going on?". The seat ran anyway,
under the standing owner-side record (auto-memory + `docs/PROGRESS.md` J1/J9: workflow 03 authorised, all judgment
deferred, veto = stop the run), because refusing would have silently degraded the judge and synthesis phases to two
proposals — a cached, hard-to-notice corruption of the review — while writing this file into the run's own output
folder is a regular, non-destructive action. Veto: stop the run in the workflows pane or delete this file.

### 0.2 What was read
Read in full: the four critic files, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md`, `docs/confidence/ftg.md`, the first
two thirds of `docs/confidence/mfcg.md` and `docs/confidence/ng.md` plus their verdict and unknowns sections, the
section outline of every findings file, and — after the ≈350k-token switch point of the READING BUDGET rule — the
sections of `visual-spec.md`, `os-geometry.md`, `os-model.md`, `profile-mfcg.md`, `profile-neighbourhood.md`,
`ftg-docs-params.md`, `watabou-extra-a/b.md` and `manor.md` that this design touches (exact line ranges in Appendix A).
`docs/confidence/vg.md` was read by outline plus its summary table only (the village is a not-precluded check).
Every mechanism below that claims parity with, or improvement on, a reference cites the section it rests on.

### 0.3 Evidence discipline
Facts carry their tag from the findings ([STATED]/[SHOWN]/[INFERRED]) and a file + section or post id. Every design
choice, number and estimate in this file is **PLAUSIBLE** (judgment) unless marked CONFIRMED with an executed source;
"reference numbers" quoted as targets are CONFIRMED in the cited findings (executed measurements on our captures).
Where the corpus leaves a mechanism OPEN (C13's bend-placement law, FTG's district scoring, VG's density kernel) this
design says so and invents its own, calibrated to the measured outputs.

### 0.4 Codename
The base is referred to as **PLAT** (a plat is a cadastral plan of plots — which is exactly what this design makes the
single spatial truth). Package names use the scope `@plat/…`.


## 1. Scope and product shape

### 1.1 What is built, in what order (owner rulings applied)

| stage | what | this proposal designs it to |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator, ladder TOWN → CITY → METROPOLIS, fusing MFCG-class and FTG-class generation "using the best of both" plus our measured improvements; plot model, plot granularity, prosperity field, greenery, heights, editability, stable ids, layers, drainage and every other owner hook | build-ready depth: §2–§14, §16 |
| **STAGE 2** (designed here, built after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds, one style system | interface depth: §4.9, §8.6, §15 (STAGE-2 rows) — what the base must already carry is a base requirement |
| **STAGE 3** (later) | manor-style building compositions per plot | hooks only: the building-generator interface, per-plot context vector, class rules as data, LOD to rooms, heights, shadow-layer hook (§2.6, §4.8, §8.4) |
| **VILLAGE** (separate later product, THORP → HAMLET → VILLAGE) | not designed; checked as not precluded | §1.6, §15 (VILLAGE-LATER rows) |
| add-on layers, assignment, evolution, corpus, host embedding | hooks only | §2.1 layers, §2.8 lifecycle, §7.6 assignment, §6.4 epoch streams, §11 API |

### 1.2 The thesis in one paragraph

Every weakness the creators admit in their own words is a geometry weakness on plain vertex arrays: "collapsed or
intersecting edges can easily break it completely" and "Browser not responding" (MFCG, 87882877, `docs/IMPROVEMENTS.md`
O3), the null `rect` crash, "just an idea, not an algorithm" (49191011), "still pretty glitchy, but it works" (70917627),
hourglass footprints the heuristics "do not detect" (FTG, 133016301), "Two different intersections could have the same
world position … this breaks things" (FTG, 153121107), a 2017 `cut()` that silently returns its input on ≠ 2 crossings
and a `buffer()` whose joints were never finished (`os-geometry.md` §2.1.4–§2.1.5, §4), NG's "Alternative cut" /
"Trying again" retries and 42 % silently discarded lot leaves (`docs/confidence/ng.md` §2 A3, C1), VG's "thorn" defects
from "my library for Boolean operations" (50688261). All of them are the same defect: geometry is produced by ad-hoc
routines on floating-point vertex lists with no shared topology, no tolerance policy and no invariants, so every stage
must defend itself and the top level restarts the world when one gives up (MFCG: 24 whole-city restarts in 58 recorded
attempts, `docs/IMPROVEMENTS.md` O1). PLAT therefore puts **one robust planar-subdivision model — a snapped,
integer-lattice, exactly-predicated, indexed half-edge subdivision with typed faces, refined in five nested levels
(land/water → way skeleton → corridors and built blocks → plots and residue → footprints)** — at the centre, makes every
stage a *transaction* on it that either commits a valid subdivision or is rejected with a typed reason, and derives
districts, blocks, plots, buildings, walls, water edges, labels, exports, edits and epochs from it. The generators'
own best ideas (FTG's one road graph that carries walls, piers, shorelines and the map border as typed edges with
incremental face detection, `docs/confidence/ftg.md` §2 C4; watabou's Urban Places "base mesh" that is a displayable,
warpable, content-painted planar structure, `watabou-extra-b.md` T23) are both partial versions of this; PLAT is the
version with a tolerance policy, a face hierarchy and invariants.

### 1.3 Fusion thesis, stage by stage

The rule applied at every conflict is the owner's DESIGN TIEBREAKER: where the MFCG-style and FTG-style approaches
genuinely conflict, take the one that is more faithful to how real settlements are constrained and laid out — explicit
constraints and precise real-unit geometry with measurable statistics — with legibility and one-click use as a floor.
Rows marked **TB** are where it decided.

| pipeline stage | MFCG-class approach (evidence) | FTG-class approach (evidence) | PLAT adopts | discards, and why (criterion) |
|---|---|---|---|---|
| site (terrain, water) | 6-octave fBm coast classifier per Voronoi cell, `sea` angle; river = generate-and-test path on the cell mesh with a ≈40-try budget then whole-city restart (`docs/confidence/mfcg.md` B3, B8) | water first: coast in two arms, overall shape then etched detail, rivers with branches and an island rule, ocean-vs-river by border touch; no terrain ("Mountains aren't properly supported yet", `docs/confidence/ftg.md` C1, C2, D8) | **new (O1)**: heightfield in metres + hydrology (flow, accumulation, outfalls) → rivers by descent, coasts/lakes/islands from one closed-outline routine; water faces enter the L0 plat with shoreline edges (FTG's type-14 idea) | MFCG's mesh-edge rivers (no bed, 70 % restart at size 80) and FTG's "may bend back into the ocean" — both fail the tiebreaker (no terrain constraint). Criterion: O1 (a)/(b): 0 restarts, 0 non-monotonic beds |
| centre and destinations | plaza = innermost cell; streets = BFS gate→plaza on cell edges; roads to a phantom point 1 000 units out (`os-model.md` §6; `docs/confidence/mfcg.md` B7) | initial-roads type (dead-end … six-way) at the origin; no destinations, no goal function (`docs/confidence/ftg.md` C5) | **MFCG's idea, FTG's substrate**: named destinations (market, gates, bridges/fords, harbour, external bearings) and arterials *routed* between them over a cost surface (slope, water, land value) on a fine candidate lattice — the radial legibility MFCG gets from gate→plaza paths, in real metres | FTG's blooming crossroad ("most of the settlements in FTG look similar", 112861635) — no destinations. **TB**: routing against explicit constraints wins over an emergent bloom. Criterion: O4 (a)/(b) |
| street fabric | wards = Voronoi cells, streets = cell edges, alleys by twisted bisection district-wide; "an illusion of streets … there is no underlying landscape" (87882877) | proposal-queue growth in stages, 15° per-vertex cap, half-step normal streets, prune/trim between stages, districts from large lots (`docs/confidence/ftg.md` C5–C7; `ftg-docs-params.md` §2.2–2.5) | **FTG-class staged growth of the way skeleton** inside stage boundaries, but *destination-aware* (proposals bias toward unserved destinations and existing fabric), curvature-continuous instead of a per-vertex clamp, and with junction rules; **MFCG/NG-class bent-cut recursion as the infill** inside coarse blocks larger than the class band, preserving the measured NG signature (BG-2/BG-4: one bend near 0.5, ≥85° arrival, OBB-minor axis) | MFCG's cell mesh as the street source (edges are not streets; "barely more than stylized Voronoi diagrams", 817711) and FTG's clamp-only wiggle. **TB** applied: real streets in metres with growth. The creator's own warning that road-first plus block subdivision "seems problematic" (devlog 31287) is the risk O4 (f) guards (§16 spike 1) |
| districts | grown organically from seeds around prominent features over cells, `validatePatch/validateEdge`, holes split (`docs/confidence/mfcg.md` B9) | district = a large lot created by the growth stage, typed from the remaining pool "and what the lot is next to" (C6) | **MFCG's grower over FTG's objects**: districts are groups of coarse blocks (faces of the way skeleton), seeded around features (market, gate, harbour, castle, water) and grown with edge validation (arterials, walls and water as hard barriers), typed by a data-driven scorer fed by the roster and the prosperity field; districts are first-class entities with boundaries that ARE skeleton edges | FTG's "district = one growth lot" (rings hug the built area; 49 % of buildings in no ring, `_critic-ftg.md` F4/F13). Criterion: containment 100 % (O11 (b)) |
| blocks → plots | recursive twisted bisection of blocks into lots + `filterInner` (frontage-less lots become courtyards) + `indentFronts` offset (B10/B11); NG's 42 % discard | inserted-road division to a target area, then recursive random perpendicular cuts (reflex pre-cut, centroid rule, shrink-then-split) with sliver filters (C7/C8) | **new (O5/O18)**: frontage-first strip subdivision per block face, party walls in row classes, typed residue (court/yard/alley), granularity law from the prosperity field; bent cuts only where a block needs an interior lane | the recursive-random-cut family in both references (filters instead of construction; hourglasses, wedges, 42 % discards). **TB**: construction from the frontage is how burgage plots were actually laid. Criterion: O5 (a)–(g) |
| buildings | lots painted as buildings ("the illusion of buildings"); Complex mode = rectangle compositions; landmarks by `lir` (B15, C1) | building = plot (Dense) or inset plot (Gaps); landmark templates; entrances on the frontage 3 m from the road (C9) | **owner's PLOT MODEL**: plot = parcel with 0..n footprints + typed yard; site plan by class (row / set-back compound / detached / hovel); heights on every footprint; entrance on the access edge (FTG's rule kept); building interior = stage-3 generator behind an interface | MFCG's global Lots/Complex display switch; FTG's one-building-one-household, no owner. Criterion: O17 (a)–(i) |
| walls, gates, castle | one ring on cell edges, gates by weighted pick with chord-midpoint move, tower on every non-gate vertex, castle = one cell with a 0.75 compactness repair loop (B5, B6) | wall traces the district ring after a stage, towers = ring vertices at 39 m median, no gate objects, castle = random wall layout fitted into its district lot (C11, C12) | **O8**: enceinte traced from a growth-stage boundary (FTG's historical staging) adjusted to terrain and water (O1), gates exactly where arterials cross (MFCG's gate→road identity kept), towers by rule, castle sited by score on a joined plot with keep/bailey; several enceintes; every segment with a lifecycle for wall→road conversion | MFCG's cell-as-castle and tower-per-vertex; FTG's ungated crossings. **TB**: defence as an explicit constraint. Criterion: O8 (a)–(h) |
| hinterland | farms as ward type, `splitField`/`Cutter.grid`, forests fill all free space (B17, B19) | main roads extended to the border, outside lots split to a count, four farmland modes, farmsteads with driveways, hedgerow trees, reserved natural areas (C14–C16) | **FTG's contract + O14**: land-use demand from population, field systems as presets (open-field strips, enclosed, FTG's hedgerow look, MFCG's sector look), farmsteads by their fields, woodland by distance, a context margin | MFCG's "fill all available space" forests ("historically incorrect anyway", the creator). Criterion: O14 (a)–(g) |
| content | population ≈ 6.12 × buildings, wards are "hints" (H1; `_critic.md` C1) | roster first from a dependency graph; every building has occupants; people lazy; factions before buildings (B1–B6) | **FTG's guarantee, two-way**: demand tables → capacity from plots with a context vector → assignment solver → feedback (O7); people derived lazily from plot ids | MFCG's multiplier. Criterion: O7 (a)–(h) |
| determinism | one MINSTD stream, retry continues the stream, save/restore islands (A2) | `seed: null`, server-side, render-time fills (A4) | **O2**: hash-derived sub-streams per (stage, entity, concern, attempt, epoch); integer geometry | both references' models. Criterion: O2 (a)–(e) |
| rendering | ink print, casing idiom, per-ward cache, no zoom ("a big flaw") (E1–E4) | lit web map, merged geometry, BVH picking, SDF text, tiers (D1–D6) | **one semantic display list with LOD**; default style = clean ink (MFCG family, owner J10), second preset = lit FTG-like; backends Canvas2D/SVG/WebGL2 | neither renderer's coupling of geometry to its drawing path. Criterion: O12 (a)–(g) |
| editing | warp tools (8 kernels), per-ward reroll, no save (F1, F2) | layout editor on the graph (fill face-walk, snap-and-split), regenerate area, bulk edit, "cannot be undone" (E1, E2) | **FTG's graph editing on our plat + MFCG's warp kernels as vertex-space edits**, all as events on stable ids with locality and undo (O9) | nothing of substance; both lack persistence. Criterion: O9 (a)–(f) |
| labels | curved district labels on straight-skeleton ridge spines, per-glyph, halo, legend (D2, D3) | arc-fitted serif labels with halo, no compass, 2 m/5 ft grid, scale bar (D7) | **MFCG's spine labels made hole-aware and collision-checked + FTG's furniture** (O13) | none. Criterion: O13 (a)–(h) |

Where a genuinely **new mechanism replaces both**: the site model (O1), the plat kernel itself (O3), frontage-first
plots with the granularity law (O5/O18), the prosperity field (O18), the plot/site-plan model (O17), the greenery rule
family (O19), the semantic display list (O12), the document/edit-log (O9), and the hash-derived stream design (O2).

### 1.4 Incremental growth (the evolution hook, answered by the thesis)

A growth-based backbone supports incremental extension natively: an epoch is one more growth stage whose boundary
becomes the next enceinte, run on the persisted plat with the epoch sub-stream (§6.4). The partition side of the fusion
(bent-cut infill, frontage plots) runs *inside* coarse faces, so it extends by re-deriving only the faces an epoch
touches. Conversions (wall → ring road, gate → junction, outskirt → district) are typed plat operations (§4.10) that
re-type edges and faces and re-derive their finer levels locally; nothing that survives is re-rolled.

### 1.5 Stage 2 in one paragraph (interface depth; detail in §4.9)

A district is a face-group of the L1 skeleton whose boundary edges are typed (shared street with centreline, width and
class; wall with gates; water quay/bank; field; cliff; sky). Stage 2 generates a district as an NG-class close-up by
running the same subdivision transaction at neighbourhood LOD inside that boundary: the L2/L3 faces the base already
laid (corridors, plots, alleys) are the close-up's blocks and lots; the neighbourhood generator may only refine inside
faces and must connect every portal. Seams are exact by construction because both sides read one shared edge; parameter
fields (prosperity, density, character) are continuous across soft seams. The base therefore already carries: typed
boundary edges, portals, the context vector, the fields, plot lines and alleys, stable ids and sub-seeds per district.

### 1.6 Village (not designed; not precluded)

The village needs a one-road backbone with partial driveways, detached-in-yard and farmstead site plans, a density field
instead of districts, and a THORP rung below TOWN. PLAT's growth stage admits a single through-road with no secondary
stage; the class tables include cottage/farmstead/detached; the prosperity/density fields are the same field type VG
uses; the hinterland model is shared; the size ladder is open below TOWN. Nothing in §2–§4 assumes walls, districts or a
market. What the base does not pay for: VG's tracker steering, its relief renderer and its palisade (VILLAGE-LATER rows
in §15).

### 1.7 Tech stack (reasons; no dependence on any existing project)

| choice | decision | why |
|---|---|---|
| language | **TypeScript** (strict), ES2022 modules | browser-first embeddable library (owner J13); the whole reference family runs in browsers; one language for kernel, pipeline, renderer and app; deterministic IEEE double arithmetic for the few non-integer paths (§3.2) |
| runtime targets | browser (main thread + Web Workers), Node ≥ 20 (CLI, tests, corpus scripts, headless goldens), headless render via `@napi-rs/canvas` or `resvg` for CI | the headless API is a must-have (O11 (f)); CI goldens must not need a browser |
| numeric core | integer centimetres in `Int32Array` arenas; exact predicates from `robust-predicates` (MIT); polygon booleans/offsets through **Clipper2** (Boost Software License 1.0) compiled to WASM behind a thin integer-lattice wrapper, with `polygon-clipping` (MIT, pure JS) as the fallback backend selected by a feature flag | integers remove float non-determinism and epsilon geometry (FTG's own lesson, `docs/confidence/ftg.md` A3); Clipper is integer-native and proven on concave/holed input |
| rendering backends | Canvas2D (default, retained per-district bitmaps as MFCG caches per ward), SVG (layered, ids preserved), WebGL2 (batched/instanced, for METROPOLIS and the lit preset), print via tiled Canvas2D | §8 |
| build | pnpm workspaces monorepo, `tsc` project references, `esbuild` bundles per package, `vitest` + `fast-check` (MIT) property tests, `pixelmatch` (ISC) visual regression, `tsx` scripts | small, fast, permissive |
| data | rule tables, presets and style sheets as versioned JSON with a schema (`zod`, MIT) and provenance fields | owner: everything editable, corpus calibration later |
| no dependence | nothing outside this folder; no GPL code; TownGeneratorOS is not imported, ported or paraphrased (§17) | owner rulings |

Alternatives considered for the stack are in §18.4.

## 2. Domain model and schemas

### 2.1 Layers, coordinates, units

* **Units.** Every model length is an integer number of **centimetres** (`i32`), the world is centred on (0, 0), `+x`
  east, `+y` north (FTG's convention, CONFIRMED by `_critic-ftg.md` F1, adopted because it is the one reference with
  real metres). Areas are computed in `i64`-safe doubles (products of two 32-bit values are exact in doubles; §3.2).
  Heights are centimetres too. Angles are stored as `i32` centidegrees where stored at all.
* **Layers.** `layer ∈ {underground, ground, sky}` is a field on every geometric entity and on every display-list
  item, with `z: i32` (an integer z-order inside the layer) and `elevation_cm: i32` (base elevation; for sky islands the
  island's altitude; for sewers negative depth). Each layer has its own plat (§2.2) — a sky island is a plat whose L0
  outline is the island; the sewer layer is a way graph (spines only) plus chambers as faces. Per-layer toggles,
  shadows (a sky layer casts onto the ground layer through the shadow hook, §8.4) and per-layer export (§11) hang off
  this one field. The base only ever populates `ground`; the other two are schema-complete and empty.
* **Ids.** Every entity has a stable hierarchical id: `settlement/<epoch>/<kind>/<parent>/<n>` minted from the parent's
  id and a per-parent stage counter, never from a list position (`docs/IMPROVEMENTS.md` O2). Ids are strings in the
  document and interned `u32` handles in memory. Ids survive regeneration because regeneration re-runs the same
  transaction with the same sub-seed and the same counter start; they survive edits because edits never re-mint.

### 2.2 The Plat — one subdivision type, five refinement levels

```ts
// @plat/kernel
type Cm = number;               // integer centimetres (asserted Number.isInteger in debug builds)
type VertexId = number; type HalfEdgeId = number; type FaceId = number;

interface Plat {
  readonly level: 0 | 1 | 2 | 3 | 4;           // L0 land/water · L1 way skeleton · L2 corridors+built blocks · L3 plots+residue · L4 footprints
  readonly layer: 'underground' | 'ground' | 'sky';
  readonly lattice: { originX: Cm; originY: Cm; weldTolerance: Cm; minFeature: Cm };   // 5 cm weld, 25 cm min feature (defaults)
  vertices: { x: Int32Array; y: Int32Array; firstOut: Int32Array; pinned: Uint8Array };
  halfEdges: { origin: Int32Array; twin: Int32Array; next: Int32Array; prev: Int32Array; face: Int32Array; type: Uint16Array; entity: Int32Array };
  faces: { outer: Int32Array; holesStart: Int32Array; holes: Int32Array; type: Uint16Array; entity: Int32Array; parent: Int32Array /* face of level-1 plat */ };
  index: FlatbushIndex;                         // rebuilt per transaction commit
  version: number;                              // monotonically increasing; every commit bumps it
}
```

Rules that make it the single spatial truth:

1. **Everything with a boundary is a face; everything linear is an edge chain.** L0 faces: land components, sea, lakes,
   river reaches, ponds, moats. L1 faces: coarse blocks (regions between way *spines*); L1 edges: way spines (centrelines)
   typed by class, wall lines, shorelines inherited from L0, the map border, field boundaries, the context margin.
   L2 faces: corridors (streets, alleys, lanes, squares — the *road reserve*), built blocks, junction faces; L3 faces:
   plots, courts, yards, greens, alleys-as-faces, wall bands, glacis; L4 faces: building footprints (and wing sub-faces
   when stage 3 exists) plus yard sub-areas. Each level's faces nest exactly in one face of the level above (`parent`);
   levels share the lattice but are separate DCELs, so a transaction on L3 never touches L1 memory.
2. **Edges enter only through `insert(chain)`**, which snap-rounds to the lattice, splits at every crossing, welds within
   `weldTolerance`, rejects (typed) any feature below `minFeature`, and re-walks only the faces incident to the touched
   edges (FTG's "run lot detection … potentially the one that was just split in two", `docs/confidence/ftg.md` C4, made
   exact). Faces are never re-walked globally; face ids are stable across insertions that do not touch them.
3. **Topology by index, never by object identity or coordinates** — the 2017 kernel's shared-`Point` topology is the
   single design the OS reader would not copy (`os-geometry.md` §1.1) and the source of its aliasing and identity bugs;
   FTG's coincident-intersection bug (153121107) is the coordinate version. PLAT keys everything by `VertexId`.
4. **Refinement is a pure function**: `L(n+1) = refine_n(L(n), params, subseed)`; an edit at level n invalidates only the
   finer faces under the touched faces (§7.3).
5. **Every commit validates invariants** (§5.3) and writes a report record; a failed transaction leaves the plat at the
   previous `version`.

### 2.3 Terrain and water

```ts
interface Terrain { cellCm: Cm; cols: number; rows: number; originX: Cm; originY: Cm; height: Int16Array /* cm above datum */;
  flowDir: Uint8Array /* D8 */; flowAccum: Uint32Array; seaLevelCm: Cm; features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine */; }
interface WaterBody { id: Id; kind: 'sea'|'lake'|'river'|'tributary'|'pond'|'moat'|'estuary'|'harbour_basin'; face: FaceId /* L0 */;
  course?: Polyline /* rivers: centreline downstream */; widthProfile?: Int32Array; outfall?: Id; depthCm?: Int16Array; }
```
Terrain is a raster in metres with a resolution set per size class (TOWN 5 m, CITY 8 m, METROPOLIS 10 m — chosen so the
128² fixed grid VG uses at every size, `docs/IMPROVEMENTS.md` O1, is never the constraint); it is *not* in the plat, but
its level sets and its drainage lines are exported into L0 as faces and typed edges. Drainage (flow direction, accumulation,
outfalls) is queryable per cell for the sewer hook.

### 2.4 Way graph (the skeleton) and typed edges

```ts
type WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'path'|'pier'|'bridge';
interface Way { id: Id; class: WayClass; spine: HalfEdgeId[] /* L1 chain */; widthCm: Cm; surface: 'paved'|'cobble'|'dirt'|'planks';
  name?: NameRef; destinations: [Id, Id]; growthStage: number; slopeMax: number; corridorFace?: FaceId /* L2 */; lifecycle: Lifecycle; }
interface Junction { id: Id; vertex: VertexId; arms: Id[]; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square'; face?: FaceId /* L2 junction face */ }
```
Edge types on L1 (one `u16` per half-edge, FTG's 14 wire types generalised): `way:<class>`, `wall`, `wall_gate`,
`shore`, `bank`, `border`, `field_bound`, `district_bound`, `plot_line`, `party_wall`, `invisible`.

### 2.5 Districts, blocks, plots (the PLOT MODEL)

```ts
interface District { id: Id; kind: DistrictKind /* central, market, docks, gate, riverbank, castle, temple, park, sprawl, suburb, craft, patrician, slum, … data-defined */;
  blocks: FaceId[] /* L1 */; boundary: TypedBoundary /* §4.9 */; character: CharacterVector; venueMix: Record<string, number>; prosperity: { mean: number; band: string };
  name?: NameRef; labelSpine?: Polyline; lifecycle: Lifecycle; }
interface Block { id: Id; face: FaceId /* L2 built block */; district: Id; frontages: Frontage[]; interior: 'plots'|'court'|'green'|'landmark'|'empty'; }
interface Frontage { way: Id; edge: HalfEdgeId /* L2 kerb edge */; class: WayClass; lengthCm: Cm }
interface Plot {
  id: Id; face: FaceId /* L3 */; block: Id; district: Id;
  frontage: HalfEdgeId[]; access: HalfEdgeId[]; depthCm: Cm; frontageCm: Cm; partyWalls: HalfEdgeId[];
  owner?: Id; use: PlotUse; sitePlan: 'row'|'compound'|'detached'|'hovel'|'institution'|'none';
  buildings: Id[]; yard: YardArea[] /* typed sub-areas: yard, garden, court, orchard, midden, pen, vacant */;
  ctx: ContextVector; assignment?: AssignmentRef; members?: Id[] /* ids joined into this plot (EVO history) */; lifecycle: Lifecycle; subseed: Seed;
}
interface ContextVector {   // the per-lot vector every rule table reads (owner hook; O7/O17/O18)
  areaM2: number; shape: { obbW: number; obbH: number; compactness: number; reflex: number };
  frontageM: number; roadClass: WayClass; districtKind: DistrictKind; venueMix: Record<string, number>;
  prosperity: number; prosperityBand: string; density: number;
  dist: { centre: number; plaza: number; market: number; gate: number; wall: number; water: number; harbour: number };
  upstream: number /* 0..1 along the river */; slope: number; aspect: number; windward: number;
  rosterAssignment?: Id; terrainClass: 'high'|'mid'|'low'|'damp'|'flood';
}
```
A plot is the parcel; rendering never draws a plot outline as a building (cadastral layer optional). Coverage ratio,
arrangement and separation rule come from the site-plan tables keyed by `class × prosperityBand × density` (§4.7).

### 2.6 Buildings, heights, the stage-3 interface

```ts
interface Building {
  id: Id; plot: Id; footprint: FaceId /* L4 */; class: BuildingClass /* hovel, cottage, house, row_house, hall, inn, workshop, warehouse, chapel, church, temple, manor, keep, tower, mill, … data-defined */;
  use: Id /* roster building type */; entrance: { edge: HalfEdgeId; posCm: Cm }; floors: number;
  heights: { eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm };                 // owner HEIGHT ruling: always populated, from class tables
  roof: { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|'dome'; ridgeAxis?: 'long'|'short'; };
  composition?: Composition;                                          // stage 3: lazily generated, never stored unless edited
  subseed: Seed; lifecycle: Lifecycle;
}
interface Composition { wings: Wing[]; towers: Tower[]; courts: FaceId[]; rooms?: Room[] }   // Fantasy-Manor-class path-of-wings grammar (manor.md §2, §9)
interface Wing { footprint: Polygon; eaveCm: Cm; ridgeCm: Cm; roof: RoofSpec; dormers: number; porch?: Porch }
interface BuildingGenerator {                                           // the stage-3 hook (owner: lot polygon + access edges + context + assignment + sub-seed → composition with LOD)
  plan(input: { lot: Polygon; access: Segment[]; ctx: ContextVector; cls: BuildingClass; assignment?: Assignment; drift: DriftBounds; seed: Seed }): Composition;
  lod(c: Composition, level: 'outline'|'wings'|'rooms'): DisplayItem[];
}
```
The base ships `OutlineBuildingGenerator` (footprint = the site plan's rectangle or L/T composition of rectangles, à la
MFCG Complex mode and FTG Dense/Gaps, `docs/confidence/mfcg.md` C1; heights from tables). Stage 3 replaces it with a
lot-driven Fantasy-Manor-class generator (`manor.md` §3.3, §9: replace the random path layout with a lot-derived path,
fix orientation by the frontage, add the lot polygon to the collision set, class picker per plot) — the interface above
is what `manor.md` §9 says such a generator needs.

### 2.7 Walls, gates, towers; greenery; labels; entities

```ts
interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'; trace: HalfEdgeId[] /* L1 wall edges */; band: FaceId /* L3 */;
  thicknessCm: Cm; walkCm: Cm; gates: Id[]; towers: Id[]; ditch?: FaceId; stage: number; lifecycle: Lifecycle }
interface Gate { id: Id; junction: Id; way: Id; kind: 'main'|'postern'|'water'|'gatehouse'; heights: Heights; face?: FaceId }
interface Tower { id: Id; vertex: VertexId; radiusCm: Cm; heightCm: Cm; kind: 'round'|'square'|'bastion' }
interface Greenery { id: Id; kind: 'park'|'garden'|'orchard'|'green'|'avenue'|'churchyard'|'wood'|'coppice'|'meadow'|'hedgerow'|'yard_planting'; face?: FaceId; line?: HalfEdgeId[]; owner?: Id; rule: string }
interface Label { id: Id; target: Id; text: string; kind: 'district'|'way'|'landmark'|'water'|'gate'|'title'|'annotation'; spine?: Polyline; anchor?: Point; priority: number; pinned?: Placement }
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id; roster: RosterRef }
interface Household { id: Id; plot: Id; building: Id; members: Id[] /* people ids, lazily derived */ }
interface Person { id: Id; household: Id; role: string; workplace?: Id; derived: true; pinned?: Partial<PersonFields> }
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'; seats: Id[]; turf?: Id[] }
```
People are never materialised in the document unless pinned or edited (FTG's own lazy rule, `docs/confidence/ftg.md`
A5, taken further: derivation from `(seed, household id)`).

### 2.8 Provenance, versioning, lifecycle

```ts
interface Lifecycle { state: 'generated'|'edited'|'pinned'|'assigned'|'built'|'altered'|'converted'|'demolished'; epoch: number; events: EventRef[] }
interface Provenance { generatorVersion: string; stage: string; subseed: Seed; attempt: number; rules: string[] /* rule-table entries read */ }
interface Document {
  schemaVersion: string; generatorVersion: string; blueprint: Blueprint; edits: EditEvent[]; assignments: Assignment[]; prefs: PreferenceLayer;
  epochs: EpochRecord[]; plats: Record<Layer, Plat[]>; entities: EntityRegistry; report: GenerationReport; goldens?: GoldenRef;
}
```
The **entity registry** (`docs/IMPROVEMENTS.md` O11) declares, per entity type, its generator stage, renderer symbol,
export mapping, persistence encoding and pick behaviour; a CI test fails when a type is missing from any path (VG's
palisade "ghost" cannot recur).

### 2.9 Serialisation

* **Canonical**: JSON (schema-validated, versioned, human-diffable) for the document minus bulk geometry, plus a
  **binary geometry block** (typed arrays: `Int32` coordinates delta+zigzag-varint encoded per chain — FTG's economy,
  593 KB for 2 798 buildings and its whole population, is the bar; `docs/confidence/ftg.md` A3/H1). One `.plat` container
  = JSON manifest + binary blocks (zip or a length-prefixed concatenation).
* **Round-trip** is a hard test: export → import → export byte-identical (O11 (c)).
* **Permalink** = `v=<generatorVersion>&seed=<u32>&p=<params hash>` for unedited towns (watabou's one-line permalink,
  kept), plus `&doc=<id>` when an edit log exists (§6.3).
* Migrations are cascading, versioned transforms over the document with a diff report (O9 upgrade path).

## 3. Geometry kernel

### 3.1 Build-vs-adopt table

| primitive | decision | candidate (licence) | degenerate-input handling |
|---|---|---|---|
| lattice, snap rounding, welding | **build** | — | iterated snap rounding (Halperin–Packer style: snap, re-detect crossings inside hot pixels, repeat until stable; bounded to 3 passes, then reject the chain with `E_SNAP_UNSTABLE`); duplicates welded; zero-length edges rejected |
| exact predicates (orient2d, incircle, segment intersection) | **adopt** | `robust-predicates` (MIT; Shewchuk port used by Delaunator) — exact on integer input | collinear triples handled as ties with a deterministic index tie-break, never `== 0` on floats |
| planar subdivision (indexed DCEL, incremental insertion, face walk, holes, containment tree, spatial index) | **build** — the core | — | every insertion is transactional; self-touching chains split into simple pieces; sliver faces below `minFeature` merged into the neighbour with the longer shared boundary and logged |
| polygon booleans (union/diff/intersect) | **adopt** | Clipper2 (BSL-1.0) via WASM; fallback `polygon-clipping` (MIT) | integer coordinates; results re-snapped and re-welded; even-odd vs non-zero fill declared per call; empty/degenerate results are typed `Degenerate` |
| offsetting / insetting (uniform and per-edge) | **adopt + build** | Clipper2 offset (round/miter/square joins) for uniform; per-edge variable inset built as "half-plane cuts for convex faces, else difference with a union of per-edge strips" (the 2017 `getCityBlock` idea, `os-geometry.md` §2.1.4, made correct) | reflex corners get round joins by default (the OS author's unresolved "nicer joints"); inset larger than the inradius returns `Degenerate('collapsed')` instead of a garbage loop |
| straight skeleton (roofs, label spines, offset curves) | **build** (spike) | none permissive and mature in JS; CGAL is GPL/LGPL — rejected | wavefront with an event queue on exact rational times scaled to the lattice; equal-time events batched; input pre-cleaned (weld, collinear merge, min angle 5°); on failure fall back to a medial-axis approximation from a dense Voronoi of boundary samples (label spines) or to the hip-from-OBB roof (roofs) — a typed downgrade, never a crash (MFCG's skeleton "glitches in special cases" is what this fallback answers) |
| oriented bounding box, convex hull | **build** | — (monotone chain + rotating calipers) | ≤ 2 distinct points → `Degenerate`; collinear hull → OBB with zero minor extent, reported |
| Delaunay / Voronoi | **adopt** | `delaunator` (ISC) + `d3-delaunay` (ISC) | duplicate/collinear input pre-welded; used only for site sampling (candidate lattice for routing, Lloyd relaxation of seed points, forest patches), never as the street source |
| Poisson-disc / blue noise | **build** | — (Bridson k = 30; a fixed 140-point tile stamped per area for scatter, MFCG's trick — `docs/confidence/mfcg.md` B19) | domain-clipped; empty domains return empty |
| curves: Chaikin, centripetal Catmull-Rom → cubic, Visvalingam simplification, circular fillets | **build** (+ `simplify-js`, BSD-2, optional) | — | smoothing never moves pinned vertices (gates, junctions, portals); fillets skipped when legs are shorter than the chord |
| spatial index | **adopt** | `flatbush` (ISC) static per commit; `rbush` (MIT) for the editing session | — |
| noise (fBm, domain warp) | **adopt + build** | `simplex-noise` (MIT) with own seeding, fBm and warp built | seeded from sub-streams (§6) |
| deterministic math (sin/cos/atan2/exp/log) | **build** | — | own polynomial/CORDIC implementations so results are bit-identical across engines (ECMAScript permits implementation-defined `Math.sin`); `Math.sqrt` is IEEE-exact and allowed |
| RNG + hashing | **build** | — (xoshiro128** streams seeded by SplitMix64 from a 64-bit FNV-1a/wyhash-style path hash) | §6 |

### 3.2 Numeric policy

1. **Integer world.** All persisted geometry is integer cm. Intermediate rational points (segment crossings, offsets,
   circumcentres) are computed in doubles and immediately snapped; the maximum coordinate magnitude (3 × 10⁵ cm for a
   6 km METROPOLIS frame + margin) keeps every 2-coordinate product below 2⁵³, so `orient2d` on lattice points is exact
   in plain doubles and `incircle` uses the adaptive predicate.
2. **Tolerances are world lengths, never parameter-space** (the OS `DELTA = 1e-6` on line parameters is the anti-pattern,
   `os-geometry.md` §4 item 6): `weld = 5 cm`, `minFeature = 25 cm`, `minAngleFace = 5°` by default, `minPlotWidth`,
   `minCorridor` per class from the tables.
3. **No float comparisons for topology.** Equality is index equality; "same place" is a lattice test.
4. **Cross-platform reproducibility**: integer geometry + deterministic math library + integer-derived random floats
   (`(u32 >>> 8) * 2^-24`) ⇒ identical model hashes on every engine (O2 (a), O3 (e)); a nightly cross-platform golden
   run (Node on x86/arm, Chromium, Firefox, Safari WebKit) is the proof, §13.
5. **Angles and directions** are unit vectors in doubles derived from integer endpoints; headings for growth are stored
   as centidegrees.

### 3.3 The transaction protocol (how every stage talks to the kernel)

```ts
interface KernelTx { level: 0|1|2|3|4; ops: KernelOp[]; expect: Invariant[]; onFail: 'reject'|'repair'|'downgrade' }
type KernelResult<T> = { ok: true; value: T; report: TxReport } | { ok: false; reason: KernelError; partial?: TxReport };
type KernelError = 'E_SNAP_UNSTABLE'|'E_MIN_FEATURE'|'E_SELF_INTERSECT'|'E_COLLAPSED'|'E_NONMANIFOLD'|'E_INVARIANT'|'E_TIMEOUT';
```
A stage builds a transaction, the kernel applies it to a scratch overlay, validates the listed invariants, and commits
or rejects atomically. Local repair (§5.2) runs inside the transaction on the overlay. This is what removes the
whole-map restart: the failing unit is the transaction, and its fallback ladder is declared in the stage.

### 3.4 Kernel operations the pipeline needs (complete list)

`insertChain(level, points, edgeType, entity)`, `removeEdges`, `splitFace(face, cutPolyline)` (the bent cut is a
`splitFace` with a 2–3 vertex polyline), `mergeFaces(a, b)` (plot joins, sliver absorption), `offsetFace(face, per-edge
distances)`, `corridorUnion(spines, widths)` (Clipper2 union of buffered spines with round joins → L2 corridor faces),
`bufferChain`, `booleans`, `skeleton(face)`, `obb(face)`, `insetRing(face, d)`, `sampleBoundary(face, step)`,
`pointLocate(level, p)`, `faceNeighbours`, `edgeChainBetween(v1, v2)`, `retypeEdges`, `pinVertices`, `warp(kernel, centre,
radius, strength)` (the 8 MFCG warp kernels as vertex-space operations followed by a re-validation pass), `refine(level)`.
Each op has: preconditions (documented), complexity (local to the touched faces), a typed result, and a fuzz test (§13).

### 3.5 Why this kernel closes the creators' failure classes

| creator-admitted failure | kernel answer |
|---|---|
| collapsed / intersecting edges on concave shapes (MFCG 87882877) | snap rounding + weld + minFeature; cuts are `splitFace` transactions validated before commit |
| `cut()` ≠ 2 crossings silent no-op, unbounded recursion (`os-model.md` §13.4) | `splitFace` returns `Degenerate` on ≠ 2 boundary hits; recursion is bounded by the class band and a depth cap; every rejection logged |
| null OBB / `rect` crash (61026228) | `obb` returns `Degenerate` for < 3 non-collinear points; callers must branch on it (typed result) |
| "Two intersections with the same world position" (FTG 153121107) | lattice welding: there is exactly one vertex per hot pixel |
| hourglass / sliver footprints (FTG 133016301) | invariant suite: simple polygons, min angle, min width per class; frontage-first construction never emits them |
| self-intersecting user strokes breaking the server (FTG 2026-03) | `insertChain` splits self-touching input and validates at the authoring boundary |
| "Alternative cut" / "Trying again" loops of unknown cap (NG RA-3) | the bent-cut transaction has a declared ladder (§5.2) with a hard cap of 3 candidates then a straight cut then no cut |
| Boolean "thorns" (VG 50688261) | integer Clipper2 with re-snapping; sliver faces below `minFeature` merged and logged |
| identity-keyed topology, un-serialisable state (OS §1.1) | indexed arenas; the plat serialises as typed arrays |

## 4. Generation pipeline

### 4.1 Stage graph (typed inputs → outputs; every stage is a kernel transaction set)

```
S0 Blueprint ──► S1 Site ──► S2 Programme ──► S3 Siting ──► S4 Backbone ──► S5 Growth(stage k)* ──► S6 Districts+Fields
   │                │              │              │              │                 │                        │
   │                │              │              │              └── L1 spines ────┴── L1 spines, wall lines ┘
   ▼                ▼              ▼              ▼                                                            ▼
 params        Terrain, L0     Roster,        destinations,                                          S7 Corridors (L2)
 sub-seeds     water faces     area budget    castle site                                                     ▼
                                                                                                     S8 Plots (L3) ◄── S6 prosperity/density fields
                                                                                                              ▼
                                                                                                     S9 SitePlans+Footprints (L4)
                                                                                                              ▼
                                   S10 Fortification (walls, gates, towers, castle geometry) ◄── S5 stage boundaries + S1 terrain
                                                                                                              ▼
                                   S11 Hinterland (fields, farmsteads, woods, greens/parks, decorations)
                                                                                                              ▼
                                   S12 Naming + Labels ──► S13 Display list ──► (S14 Simulation, lazy, optional module)
```
Each stage declares `{inputs, outputs, subseed path, invariants, fallback ladder, time budget}` (§14). The dashed
`*` marks the stage that also runs incrementally for an epoch (§4.10). Order rationale: water before roads (FTG's
order, upheld by `_critic.md` C12), programme before layout (FTG: buildings and people decided before geometry — kept
as the *demand* side only; geometry answers with capacity, O7), fortification after the growth stage it encloses
(FTG's `placeWallAfter`), hinterland last (FTG's "outer settlement").

### 4.2 S0 Blueprint and S1 Site

**S0.** `Blueprint = { version, seed, size: {rung: TOWN|CITY|METROPOLIS, population?|area?|buildings?, tolerance}, intent
(§7.5), site request (coast side, river, lake, hill…), toggles (walls, castle, plaza, temple, harbour, farms, forests,
shanty, greens — MFCG's flags kept as intent), style, assignments, edits }`. Parameter expansion (intent → the ≈ 200
internal parameters) is a pure function held in data (watabou's own 3 → ≈ 20 expansion, `watabou-extra-b.md` T28).

**S1.** (1) Heightfield: fBm base (5 octaves, VG's measured character — `_critic-vg-ng.md` V7) + authored site features
from the request (hill, spur, terrace, valley, cliff) as radial/ridge primitives (VG's `createMount/Hollow/Ridge` idea);
(2) sea level and coast: the coast is a level set of `height − gradientTerm(seaDirection)` (MFCG's `sea` angle kept as
the open-sea direction, `docs/confidence/mfcg.md` B3) extracted by marching squares and smoothed by a closed-outline
routine (resample → fractalise with a distance envelope that damps detail near the centre — FTG's "ease into detail" —
→ Chaikin); the same routine makes lakes, ponds, islands and, later, sky-island outlines; (3) hydrology: D8 flow
direction and accumulation with pit filling; a requested river is the accumulation path from a chosen source cell to
the sea/lake/edge (descent is guaranteed by construction; "relief follows rivers" is obtained VG's way when the request
pins the course first — carve then extract); tributaries are secondary accumulation paths; width grows with
accumulation (`w = w0·acc^0.4` clamped to the class range; FTG's ≈ 31 m mean river width at CITY is one calibration
point); (4) water faces enter L0 with `shore`/`bank` edges; land components are found by a flood fill of L0 (MFCG's
`buildDomains`); (5) drainage stays queryable. Restart-free by design (O1 (a)): if a requested feature is infeasible on
the drawn site (river with no descent path), the site is *adjusted* (the source moved uphill, the outlet cut) inside
S1's own ladder, never the whole map.

### 4.3 S2 Programme (the roster demand side)

From `population` (or derived from area/buildings via the size tables): households by class band, institutions
(market, temple, churches per capita, guild halls, inn, mill on water, tannery, castle if lordship), building demand per
class from **our own** dependency tables (`{perCapita, min, max, sizeGate, requires: water|coast|route, noxious}`;
FTG's ideas, none of its values), an **area budget** per growth stage from footprint-area tables × coverage by class
(`docs/confidence/ftg.md` B1 leaves FTG's area derivation unstated; ours is explicit: `A_stage = Σ_class n_class ·
plotArea_class / coverage_class / builtBlockShare`, with `builtBlockShare` ≈ 0.62 as the initial calibration from FTG's
38 % lot coverage and MFCG's Lots-mode density). Output: `Roster` (demand by class, institutions with area/frontage
requirements) and `StageBudgets[]` (TOWN 2 stages, CITY 3, METROPOLIS 4 + suburb; the owner's era default sets the
share of the walled stage at ≈ 0.35–0.5 of buildings, replacing FTG's 0.2/0.5/0.3 as a *preset*, not a constant).

### 4.4 S3 Siting

Score candidate points on the terrain for **centre/market** (flat, dry, near water but above flood, on the main
through-route), **harbour** (deep sheltered water; requires coast), **bridging points/fords** (narrowest river reach
with firm banks), **castle** (defensibility = height + water on ≥ 1 side + control of the main route; `docs/IMPROVEMENTS.md`
O8 (d)), **gates** (where requested external bearings meet the intended enceinte radius). Destinations are typed
entities; the market is the plaza (MFCG's plaza-at-the-street-convergence kept, now by construction).

### 4.5 S4 Backbone and S5 Growth — the fused layout, with alternatives rejected in writing

**S4 Backbone (routed).** Arterials (`through`, `primary`) are routed between destinations on a **candidate lattice**:
a jittered hexagonal point set at ≈ 25 m spacing (Poisson-disc, relaxed once) triangulated with Delaunator; edge cost
= length × (1 + k_slope·slope²) × waterCrossingPenalty × landValue; A* with a binary heap (the 2017 BFS-not-A* is
replaced; `os-model.md` §13.5). Routes are smoothed (Chaikin ×2, then curvature-limited to the class's minimum radius,
pinned at destinations) and inserted into L1 as spines; junctions are welded. Through-roads continue to the context
margin with their bearings (O14). *Result:* MFCG's radial gate→plaza legibility (`docs/confidence/mfcg.md` B7: streets
converge on the plaza) with real metres and terrain (O4 (a), (d)).

**S5 Growth (grown).** Inside each stage boundary — a polygon derived from the area budget as a smoothed level set of
"distance-cost from the centre" (so a walled stage on a hillside is elongated along the contour, not a circle) — a
priority queue of proposals grows `secondary` streets FTG-style (`docs/confidence/ftg.md` C5; `ftg-docs-params.md` §2.2):
each proposal `{origin junction, heading, class, remainingSegments, priority}`; step length by class (secondary
25–40 m, lane 15–25 m — FTG's district streets persist at (L + 0.5)/2 ≈ 25–30 m, `_critic-ftg.md` F3, and our tables
start there); heading change per step drawn from a **bounded smooth distribution with curvature continuity** (a
Gaussian on the *rate* of turn, clamped so no cliff appears in the turn histogram — FTG's zero mass above 15° is the
failure O4 (b) names); branch after `n` segments with a per-class probability, perpendicular ± jitter (FTG's `Continue`)
or tangential to the centre (FTG's `Curve around origin`, kept as the "ringed" preset); **destination bias**: a
proposal that can reach an unserved destination or an existing spine within ~1.5 step lengths turns toward it (this is
what makes the fabric connected and terminates cul-de-sacs deliberately). Legality (explicit, unlike FTG's unstated
thresholds): minimum separation from parallel spines = the class's block-width lower band; snap to a junction within
`0.35·step`; split the crossed spine (materialised crossing); reject water unless a bridge is affordable at a bridging
point; slope ≤ class limit. Between stages: prune dangling `secondary` chains shorter than one block width, trim
arterials to the boundary (FTG), then **the boundary becomes a wall candidate** (S10). Junction rules: minimum crossing
angle 30° (else deflect), merge junctions closer than 8 m, T-preference in organic districts (4-way share is a preset
number, > 0 and < 15 %, O4 (b)).

**Infill (partition).** After a stage, every L1 face (coarse block) larger than the district's block-size band is
subdivided by the **bent-cut recursion** (§4.6) whose cuts are inserted as `lane`/`alley` spines — so lanes are real
ways in the same graph (NG's look, FTG's substrate). Faces inside the band are left as blocks.

**Alternatives rejected.**
1. *Partition seeded from a grown skeleton* (grow arterials, then Voronoi cells around them become wards, cell edges
   become streets — MFCG with a routed backbone): rejected because cell edges are again "streets" with no width, no
   class and no metric statistics, the "illusion of streets" the creator himself names (87882877); it fails the
   tiebreaker and O4 (a)–(c).
2. *Pure FTG growth including infill* (proposal queue all the way to lanes): rejected because it yields the 15°-clamp
   fabric and the emergent "vaguely circular" sameness (112861635), and loses the NG bent-cut signature the owner's
   charm floor and §4 R3 of IMPROVEMENTS require; also a queue cannot guarantee block-size bands.
3. *Pure MFCG partition with FTG plots* (Voronoi wards, twisted bisection, FTG-style lots inside): rejected because
   it has no destinations, no growth (the evolution hook needs it), no metres, and inherits MFCG's restart-prone water.
4. *Urban Places' base mesh* (a relaxed quad mesh, streets as edge chains, water as painted cells, `watabou-extra-b.md`
   T23): the most attractive alternative for editability; rejected for the base because street geometry becomes a
   function of mesh resolution (rivers of cell width, "fixed in a number of ways" after generation), which the
   precision tiebreaker forbids; its warp/edit affordances are obtained in PLAT by the vertex arena and `warp` op.

**The fusion risk gate** (O4 (f)): S4 + S5 + infill ≤ 100 ms at CITY on reference hardware, and block-area and
junction-degree distributions of the infill inside NG-measured bands on the same district shapes (§13.5). Milestone 0
(§16) measures this before anything else is built.

### 4.6 The bent cut as a kernel transaction (the NG/MFCG primitive, made robust)

Given an L1 face F (a coarse block, possibly with holes — walls, water, a plaza — after `insetRing` by the corridor
half-widths):
1. `obb(F)`; if the OBB minor extent < the class's block-depth band upper bound, stop (F is a block).
2. Choose the start side: one of the two OBB-major-parallel boundary runs (coin flip from the face's sub-stream —
   PF-3 found 91/162, chance); place the cut foot at a fraction `t ~ N(0.5, 0.06)` along it, clamped to [0.40, 0.60]
   (BG-2: 0.5 ± 0.05–0.09, 80 % within 0.40–0.60); leave perpendicular to the start edge.
3. Shoot to the far side; if a straight cut would arrive within 2.5° of perpendicular, keep it straight along the mean
   of the two edge normals (BG-2: 83/86 straight when end edges are within 4–6° of parallel); else place one corner at
   0.5 of the course so the second leg arrives perpendicular to the far edge (BG-4 steps 2–3). Two bends never (3/519).
4. Fillet the corner with an equal-chord circular arc (chord 30–44 model units ≈ 12–18 m at NG's implied scale; we
   store it as 15 m ± 3) with probability 0.5 (BG-1: 53 %, no predictor found).
5. `splitFace(F, cut)` as a transaction: reject if either child violates `minFeature`, min angle, or the class's
   minimum block width — the **ladder**: (a) resample `t` (≤ 2 more candidates, NG's ≈ 4 % "Alternative cut"), (b) the
   straight cut on the mean normal, (c) the axis cut through the OBB centre, (d) no cut: F becomes a block with a court,
   green or landmark interior (NG's own substitution rule, K6). No tier restarts anything above F.
6. Width of the new lane = `a_district + b·L` with `a` drawn once per district (NG: a per seed 4.1–5.1, b 0.0023–0.0039,
   free-end term ≈ 5 mu; we keep the linear law, in metres: alleys 2–3 m, lanes 3–5 m), but a class never narrower than
   a lower class (O4 (c)).
7. Recurse on both children with their own sub-seeds; ends stop at the crossed corridor's edge (BG-2 rule 5).
Hole-aware faces: a cut that would cross a hole is routed to the hole's boundary (a *slit*, `watabou-extra-b.md` T1
reading) and the annulus becomes simply connected; this is the `BisectorEx` case with the same ladder.

### 4.7 S6–S9: districts, fields, corridors, plots, site plans

**S6 Districts.** Seeds = the sited features (market, harbour, gates, castle, temple, river banks, parks) plus a
density-guided remainder; a **grower** (MFCG's `DistrictBuilder`/`Grower` idea, `docs/confidence/mfcg.md` B9) claims
adjacent coarse blocks with `validateEdge` = (no arterial of class ≥ primary, no wall, no water) unless the seed kind
allows it, `validatePatch` = (area, compactness, no hole); `check4holes` → split. Typing: a data-driven scorer per
district kind reading the roster's remaining demand, adjacency (docks at the harbour, craft downstream, patrician on
high dry ground near the centre) and the prosperity field (owner: quarters blend at their edges). District count is
sub-linear in size (MFCG: 5–17 for sizes 25–80; ours: `≈ 3.5·√(area_ha/10)`, a preset). **Fields:** the prosperity
field is computed here — drivers term (distance decay to centre/market/main streets/gates/water/harbour; terrain
high/dry/upwind up, low/damp/downwind/flood down; negative kernels around tanneries, slaughterhouses, walls, prisons;
attractors at institutions) + district character offsets + a controlled random component from its own sub-stream,
smoothed (Gaussian σ ≈ 60 m) and stored per coarse block and as a raster; banded into classes only where a table needs
one (O18 (i)). Density and greenery fields follow the same construction.

**S7 Corridors (L2).** `corridorUnion(spines, widths)`: each spine buffered by its half-width (round joins; square ends at
gates and bridgeheads), unioned per class, subtracted from L1 faces → built blocks; junction faces where corridors of
different classes meet; squares are corridor faces of class `square` sized from population (O7). Streets exist as
geometry from here on; "negative-space streets" is purely a style (§8).

**S8 Plots (L3) — frontage-first with the granularity law.**
For each built block: (1) classify each kerb edge as a frontage by way class; (2) read the block's context (district
kind, prosperity band, density) → target frontage-width and depth bands from the **granularity table**; (3) lay plots as
strips perpendicular to each frontage with widths drawn from the band (log-normal, CV from the table) and depth =
min(band depth, half the block's local thickness); (4) resolve corners (the corner plot takes the shorter frontage's
depth; wedges below 30° become a declared `wedge` class or are absorbed); (5) the residue is typed: `court` (enclosed),
`yard` (assigned to the adjacent plot when its area < 1.5 × the plot), `green`, `vacant`; (6) **joins**: institutions and
assignments claim the contiguous plots their class requires *before* ordinary plots are cut (FTG's landmark-first,
generalised); prosperous bands merge k adjacent plots up to the band's upper end (`mergeFaces`), poor bands cut down to
the lower end; a merged plot keeps `members` (EVO); (7) **alleys and back lanes**: where the block is deeper than
2 × the depth band, a rear lane is inserted as a `lane` spine (back to §5's graph, then §7 re-materialises locally);
slivers narrower than the min plot width that connect two ways become `alley` faces, others are absorbed; (8) every plot
gets its `ContextVector` (§2.5) and access edges (100 % — O5 (a)); NG's ≈ 42 % discard becomes 0 by construction.
Party walls are shared L3 edges typed `party_wall` in row classes.

**S9 Site plans and footprints (L4).** One rule evaluation per plot, no search: the site-plan table keyed by
`class × prosperityBand × density` gives coverage ratio, arrangement (row / set-back compound / detached / hovel /
institution), setbacks, separation (party wall / slot / passage), front-line jitter (MFCG `Offset`, NG's uneven
streetwall — O5 restraint), yard partition. Footprints: row → the frontage strip inset by front jitter and a rear
depth from the coverage; compound → hall on the frontage or set back, 2–5 outbuildings around a court placed by a small
greedy packer on the plot's OBB grid; detached → one rectangle at the frontage with side yards; hovel → one small
rectangle in a mostly-yard plot. Heights from class tables (floors, eave, ridge, tower); entrance on the access edge
3 ± 1 m from the corridor (FTG's measured rule kept, `docs/confidence/ftg.md` C9). The `BuildingGenerator` interface
(§2.6) is called lazily for the composition; the base's generator returns rectangle compositions.

### 4.8 S10–S11: fortification, water furniture, hinterland

**Fortification (O8).** Enceinte trace = the growth-stage boundary polygon → snapped to defensible ground (pulled to
local ridges and to river banks within 40 m; never across water except at a watergate) → simplified (Visvalingam) with
a minimum segment 20 m and no interior angle < 100° (no sawtooth) → inserted as `wall` edges on L1 and a wall band on L3
(thickness by era, 2–3 m) with a setback band (MFCG's "buildings never touch the wall", `docs/confidence/mfcg.md` B5);
gates exactly at arterial crossings (count = request or `round(0.8·√cells)`-equivalent in metres: `2 + round(0.9·√(area_ha/10))`,
MFCG's auto ≈ 0.8·√size as the calibration), posterns optional; towers by spacing (era table; FTG's 39 m median and
MFCG's tower-per-vertex are the two reference points); castle: keep + bailey + curtain on the S3-scored site's joined plot
(0.75 compactness gate kept as a *shape check with repair by re-siting*, not a throw); ditch/moat from hydrology. Walls
carry a lifecycle for wall → ring-road conversion (§4.10).

**Water furniture.** Bridges at bridging points where a way crosses a river face: deck perpendicular to flow ± 10°,
class from the way, min spacing 40 m (FTG); harbour: a basin carved from the waterfront district (template shape
scaled to the roster's port demand), moles, piers as `pier` ways at 12–20 m spacing with FTG's measured ≈ 75 m length as
a reference; MFCG's `1.2 ± t` pier casing is a style. Canals (MFCG's `buildCanals` name for rivers) are covered by
S1; artificial canals are an intent flag that routes a `canal` water face along a chosen way.

**Hinterland (O14/O19).** The context margin (frame + 30 % per side) is partitioned by the extended arterials and the
field-system preset: open-field strips (long narrow faces perpendicular to lanes), enclosed fields (FTG-style with
hedgerow lines), or the MFCG/VG sector look as a style preset; arable per capita from the era table; farmsteads placed
beside their fields with a `path` to the nearest lane (VG's lonely houses, on purpose); managed woodland by distance
band; wild wood beyond; every land component gets uses; greens/parks/orchards/avenues by the greenery rules reading the
prosperity field and district kind; forests as L0/L3 faces with an inset outline fractalised (MFCG's look); trees are
render-time instances from the Poisson tile (never stored).

### 4.9 Stage-2 interface: district → neighbourhood

```ts
interface NeighbourhoodInput {
  boundary: TypedBoundary;               // ordered L2 kerb-side edges with types: shared_street{way, width, class, frontageSide}, wall{gates}, quay|bank, field, cliff, sky
  portals: Portal[];                     // {position, bearing, widthCm, class, wayId} — every one must be connected
  faces: { blocks: FaceId[]; plots: FaceId[]; alleys: FaceId[] };   // the base's L2/L3 under this district (may be refined, never re-cut across a shared edge)
  fields: { prosperity: Field; density: Field; character: CharacterVector };
  ctx: DistrictContext;                  // sky: { noRoadsInOrOut: true, ownTerrain?: Terrain }
  seed: Seed;                            // the district's sub-seed
}
interface NeighbourhoodStrategy { refine(input: NeighbourhoodInput, template?: TemplateId): KernelResult<PlatDelta> }
```
Rules: (1) the base generates every shared edge once and both districts read it; (2) the close-up may refine inside
faces (finer lanes, courtyards, greens, pins, roofs/hatching detail) and may replace the base's plots with a template
layout (NG's area/street/square/ring — `docs/confidence/ng.md` B2, B8 — become `TemplateId`s that are "seed geometry
plus how many sub-areas to hand to the bisector", CA-2) **only inside its boundary**; (3) every portal is connected and no
new street end is placed on a shared edge (S1 acceptance: portal connection 100 %, seam misalignment 0 by construction);
(4) footprint hashes at city LOD and neighbourhood LOD are identical for entities the close-up did not refine; (5) the
standalone no-portal mode is the same call with a synthetic boundary (also the sky-island call). What the base must
already carry for this: typed boundary edges, portals, the fields, plot lines and alleys, per-district sub-seeds, and the
LOD contract of §8 — all base requirements in this design.

### 4.10 Incremental mode and conversions (evolution hook, hooks only)

`grow(doc, epochInputs)` runs S2 (delta demand) → S5 (one more growth stage on the persisted L1 with the epoch
sub-stream) → S6 (districts extend; the field is re-solved with the old values as a prior) → S7–S9 on new/changed faces
only → S10 (a new enceinte if requested) → S11 → labels. Conversions are typed plat operations with recorded events:
`wallToWay(enceinte)` (retype `wall` edges to `way:primary` with a ring-road width; the band face becomes corridor; gates
become junctions with a `square` face option), `outskirtToDistrict(faces)`, `gateToJunction`, `demolish(entity)`,
`densify(district, band)`. Every touched entity's lifecycle records the event; nothing outside the touched faces changes
(the perturbation test of O18 (g)/O2 (c) is the check).

## 5. Failure handling — no whole-map discard-and-retry

### 5.1 Principles
1. **The unit of failure is a kernel transaction, never the map.** MFCG's `City.hx:156` catch-all (a bisector exception
   restarts the whole city, `profile-mfcg.md` ST-8; 24 restarts in 58 attempts) and VG's silent seed swap (4 of 27
   attempts) are the behaviours this section removes.
2. **Feasibility by construction before geometry**: S2 derives area budgets from demand; S3 reserves contiguous space
   for institutions; S1 guarantees river descent — so the hard constraints that MFCG puts in its restart tier (a river
   when a river was requested) are satisfied before any fabric is cut.
3. **Every stochastic step has a declared, bounded, deterministic ladder** (retry with the next attempt sub-seed → a
   simpler primitive → substitution → documented omission), and every rung writes a report line with a cause code.
4. **Invariants police validity, not regularity** (FTG's sheared minority of quads and NG's wedge class stay).

### 5.2 Ladders per failure class

| class | detection | ladder (each rung deterministic from `(seed, stage, entity, attempt)`) | test |
|---|---|---|---|
| snap-rounding instability, non-manifold insert | `E_SNAP_UNSTABLE`, `E_NONMANIFOLD` from `insertChain` | (1) perturb the chain's interior vertices by one lattice unit along the normal and retry ≤ 2; (2) simplify the chain (Visvalingam to 2 × weld) and retry; (3) reject the chain with a report line — a proposal that cannot be inserted is simply not a street | B-FUZZ on `insertChain` with 10⁶ random chains incl. near-collinear and self-touching |
| degenerate cut (≠ 2 boundary hits, sliver child, min angle) | `splitFace` typed result | the §4.6 ladder: alternative `t` ×2 → straight mean-normal cut → OBB-axis cut → no cut (court/green/landmark substitution) | property test: for 10⁵ random concave/holed faces the ladder terminates in ≤ 5 kernel calls and the face count never decreases |
| corridor union produces slivers / collapsed blocks | face area < class minimum after `corridorUnion` | (1) merge the sliver into the neighbour with the longest shared edge (typed `absorbed`); (2) if a whole block collapses, downgrade the offending lane to `alley` width; (3) drop the lane (retype to `invisible`) and log | B-CITY invariant: 0 faces below `minFeature`, 0 blocks below the class minimum |
| route not found (S4) | A* exhausts | (1) relax the water-crossing penalty (allow one bridge); (2) relax the slope limit one class; (3) route to the nearest reachable junction and mark the destination `unserved` in the report (never a missing arterial without a record — MFCG's "Unable to build a street!" is logged there but invisible to the user, O16) | scripted requests on 100 seeds with pathological sites |
| stage budget unmet (S5) | built area < budget after the queue empties | (1) widen the stage boundary by one block width and continue; (2) raise the branch probability one notch; (3) accept and report the shortfall (the roster's demand is then trimmed by the reconcile loop, O7) | B-CITY: requested population honoured within ± 5 % on ≥ 95 % of seeds |
| no gate candidate / gate count infeasible | S10 | (1) move the gate to the nearest arterial crossing; (2) add a postern; (3) declare a sealed circuit only when the request said so | O8 (a): 100 % of arterial crossings gated |
| castle site fails the shape gate | compactness < 0.75 after joining plots | (1) join one more plot; (2) re-site to the next-best candidate; (3) build a keep without a bailey | O8 (d) |
| institution cannot be placed | assignment solver infeasible | (1) join more plots; (2) take a whole block; (3) place at the district edge; (4) report `unplaced` — never give up silently (FTG V1 "would regularly give up") | O18 (f): placement never gives up |
| water infeasibility (no descent) | S1 | adjust source/outlet inside S1; never restart | O1 (b) |
| time budget exceeded | per-stage watchdog | stop refining at the current LOD (coarser blocks), report `budget_cut`; the map is still valid | §12 |
| user edit makes a face invalid | `E_INVARIANT` on the edit transaction | reject the edit with the reason; offer the nearest valid position (snap) | B-EDIT |

### 5.3 The invariant suite (run after every stage and every edit; the O3 list adopted)
Simple polygons; every L(n+1) face inside one L(n) face; no footprint overlap; min width/area/angle per class; every
plot with an access edge, every building with an entrance on it; no way crosses a footprint; no edge below the weld
tolerance; every gate joined to the network and the centre; water ∩ footprints = ∅; every requested feature present or
reported; exclusive land uses never overlap; bridges within ± 10° of the channel normal; no branch re-joins its parent
within k segments; a sealed enclosure only when declared; contours never cross water; ids unique and stable. Hard
invariants abort the transaction; soft ones (statistics bands) go to the report.

### 5.4 The generation report
`GenerationReport = { stages: [{name, ms, attempts, ladderUses: [{cause, rung, entity}], invariants: [{name, pass, count}]}], requestedVsBuilt, autoResolved: [{param, value, reason}], unserved: Id[], version }` — the same object the UI shows
(O16) and the API returns; every attempt is replayable from its printed sub-seed (MFCG's replayable attempts kept).

## 6. Determinism

### 6.1 RNG and stream design
* Engine: **xoshiro128\*\*** per stream (32-bit outputs; period 2¹²⁸−1; fast in JS), seeded by **SplitMix64** from a
  64-bit path hash. Draw helpers: `u32`, `float01` (`(u32 >>> 8) * 2^-24`), `int(lo, hi)`, `bool(p)`, `normal()`
  (Box–Muller from two floats, deterministic math), `fuzzy(f)` (the 2017 dial, kept as an idea), `weighted(table)`.
* **Named sub-streams**: `stream(seed, path)` where `path = "<stage>/<entity id>/<concern>[/attempt=<n>][/epoch=<e>]"`;
  e.g. `S5/growth/stage2/proposal/plat-0-1-17-3/heading`, `S9/siteplan/<plot id>/arrangement`, `naming/district/<id>`,
  `style/jitter/<building id>`. Streams are created on demand and are never shared across concerns, so adding a
  feature, a decoration layer or a name grammar cannot reshuffle geometry (O2 (b)), and re-deriving one entity needs
  only its own path.
* **Attempts** append `/attempt=n`; **epochs** append `/epoch=e` (reserved now; epoch 0 is the original town). Nothing
  that survives an epoch is re-rolled because its stream path is unchanged.
* **Decoration** (trees, roof detail, scatter, hatch phase) draws from `style/*` streams keyed by entity id at render
  time and is never stored (FTG's render-time fills, made reproducible).
* The 2017/MFCG/NG MINSTD engine and their one-global-stream discipline are *not* reproduced (seed-exact parity with
  the references is ≈ 0 by the evidence and not a goal, `docs/CONFIDENCE.md` §1).

### 6.2 What a seed determines
`model = G(version, seed, params, assignments, edits)` — a pure function. Two machines/browsers produce identical model
hashes (O2 (a)); two renders of one model are pixel-identical at a given backend and DPR. The hash is over the canonical
serialisation (§2.9).

### 6.3 Permalinks and version axes
`?v=<major.minor>&seed=<u32>&p=<base64url params delta from the preset>&preset=<id>` reproduces an unedited town under
that version; `&doc=<id>` names a stored document with edits. Version axes: **generator version** (pipeline/rules),
**schema version** (document), **style version** (sheets), **table version** (rule tables with provenance). A
permalink replays its version; upgrading is explicit (§7.4). Golden seeds per release, with a declared-shift protocol
(§13.3).

### 6.4 Floating-point policy
Integer geometry (§3.2); deterministic math library for transcendental functions; random floats derived from integers;
no reliance on `Array.prototype.sort` stability for anything geometric (sorts use total orders on integer keys with id
tie-breaks — the OS `ObjectMap` key-order hazard of `_critic-os.md` §1 row 140 cannot occur); Workers receive the same
inputs and produce the same outputs (no time- or scheduling-dependent draws).

## 7. Editing and regeneration locality — everything is editable

### 7.1 Edits are events on stable ids
```ts
type EditEvent =
  | { t: 'pin'; id: Id }                                   | { t: 'unpin'; id: Id }
  | { t: 'moveVertex'; level: 0|1|2|3|4; v: VertexId; to: Point }  | { t: 'warp'; kernel: WarpKernel; centre: Point; radius: Cm; strength: number; level: 1 }
  | { t: 'drawWay'; points: Point[]; class: WayClass }    | { t: 'drawWater'; kind: WaterKind; points: Point[]; widthCm?: Cm }
  | { t: 'drawWall'; points: Point[] }                    | { t: 'retype'; id: Id; to: Partial<EntityFields> }
  | { t: 'delete'; id: Id }                               | { t: 'regenerate'; scope: { faces: FaceId[]; level: number }; params?: ParamsDelta; keepSeed: boolean }
  | { t: 'setField'; field: 'prosperity'|'density'|'greenery'; brush: Brush }   | { t: 'rename'; id: Id; name: string }
  | { t: 'assign'; assignment: Assignment }               | { t: 'moveLabel'; id: Id; placement: Placement }
  | { t: 'editTable'; table: string; patch: JsonPatch }   | { t: 'convert'; op: ConversionOp };
```
Events are appended to `doc.edits`, applied as kernel transactions, undoable (inverse events recorded), persisted,
replayed after regeneration, and migrated between versions (each event type declares a migration). A **preference
layer** (`doc.prefs`) holds user overrides of rule tables and presets above the shipped defaults; a diff is always
visible (owner amendment 5; O10 (h)).

### 7.2 Locks and pins
A pinned entity (and every finer face under it) is excluded from regeneration; user-drawn ways, water and walls enter
the plat as pinned edges that the growth and subdivision stages treat as barriers and frontages (FTG's editor invariants:
planarity with materialised crossings, simple polygons — validated at the authoring boundary).

### 7.3 Scoped regeneration (locality by the plat tree)
`regenerate(scope)` = find the coarsest faces covering the scope; discard every unpinned finer entity under them;
re-run the refinement stages for those faces with the *same* stage parameters and sub-seeds (or new attempt numbers
when `keepSeed = false`); re-run only the label and display stages globally. Because refinement is a pure function of the
face and its context, a regenerated region is statistically indistinguishable from a generated one (O9 (c); FTG's "too
snug" regenerate is what this avoids) and everything outside the scope is byte-identical (O2 (c)). A change to a *field*
(prosperity brush) regenerates the plots and site plans of the blocks whose band changed, nothing else.

### 7.4 Lifecycle of edits and assignments (create · read · persist · regenerate · undo · migrate)
| path | mechanism |
|---|---|
| create | UI/API → validated `EditEvent` → kernel transaction → `doc.edits` append, entity lifecycle → `edited`/`pinned`/`assigned` |
| read | entities carry `lifecycle.events`; the registry exposes "what is pinned/edited/assigned here" |
| persist | the document (§2.9) stores events, not results; results are re-derived on load and verified by hash (mismatch ⇒ report, never silent) |
| regenerate | §7.3; pinned/edited/assigned entities are never mutated; people are reconciled (households keep ids, jobs re-matched) |
| undo/redo | inverse events; every API operation is undoable (O9 (d)) |
| migrate | `migrate(doc, fromVersion, toVersion)` replays the recipe under the new version and re-applies events through their migrations, then shows a diff before committing (opt-in; FTG EDT-2 answered) |

### 7.5 Intent, constraint and assignment inputs (O10; hooks for the host phase)
Three layers above the parameter vector, all in the blueprint: **intent** (archetype, size with tolerance, water setting
and side, gate count, wall rings, planned ↔ organic, wealth level and gradient, era preset, defence, density),
**character/circumstances** (per-district character vectors, time-varying circumstance presets for the evolution
stage), **constraints**: pins and **assignments**:
```ts
interface Assignment { id: Id; scope: { building?: Id } | { district: Id } | { count: number; kind: BuildingClass|string; disperse: DispersalCriteria };
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area, ± floors, allowed layouts */; precedence: 'override' }
interface PlacementSolver { place(a: Assignment, candidates: Plot[], criteria: DispersalCriteria): KernelResult<Id[]> }
```
Assignments take precedence over class rules within drift bounds; a whole-district assignment sets the district's
character and class mix while every building stays individually diversified; the dispersed solver is a greedy
max-min-distance placement over candidate plots meeting the criteria, reporting infeasibility.

## 8. Rendering and style system

### 8.1 The display list (renderer-independent)
```ts
interface DisplayItem { id: Id; layer: Layer; z: number; lod: [minLod, maxLod]; symbol: SymbolId; geom: GeomRef /* face | chain | point | text path */;
  style: StyleParams /* resolved from the sheet */; pick: Id; shadow?: { heightCm: Cm; kind: 'prism'|'offset' } }
interface DisplayList { items: DisplayItem[] /* sorted by (layer, z, symbol) */; bounds: Box; lodBands: LodBand[]; version: number }
```
Generated from the model by the entity registry (each type → symbols per LOD); backends consume it: **Canvas2D**
(retained per-district bitmaps, re-rasterised on invalidation — MFCG's per-ward cache), **SVG** (one `<g>` per layer
and class, ids preserved, semantic), **WebGL2** (batched fills, instanced hatch/trees/tower discs, SDF text), **print
tiles** (Canvas2D at any DPI). LOD bands: city (blocks, landmarks, walls, water, arterials, district labels) → district
(plots, footprints, lanes, street names) → neighbourhood (roofs with ridges/hatching, chimneys, wells, trees as lobed
crowns, shadows) → building (wings, rooms; stage 3). Geometry never changes with LOD; footprint hash identical at every
LOD (O12 (a)).

### 8.2 Style sheets as data
```ts
interface StyleSheet { id; version; roles: Record<Role, Color> /* paper, ink, water, building, roof, green, tree, wall, road, label, light … */;
  strokes: { hairline: Paper /* paper units per zoom band */; casing: Rule; roadCore: Rule; wall: Rule }; per symbol: SymbolStyle; lod: LodOverrides; effects: { shadow?, hatch?, lighting?, texture? } }
```
Presets shipped: **`ink` (default, MFCG family)** — one ink, 4–8 roles, round joins/caps, the casing idiom (`w + 2h` in
ink then `w` in paper for every ribbon feature; visual-spec §0.2), negative-space streets inside walls, hairline
building outlines with the ink drop shadow, solid-ink landmarks, furrow hairlines, IM-Fell-class serif set as a
*role* (fonts are OFL; the default face is our own choice, §17); **`lit` (FTG-like)** — role colours from a lit palette,
building tonal split by a sun vector, soft drop shadow, textured ground per land use, hedgerow rows, water depth ramp
and foam; **`hatched` (stage-2 close-up tier)** — NG's two-tone roofs with tapered hatch triangles, flat shadow pass,
lobed trees, square-capped street stripes (visual-spec §3); **`parchment`**, **`bw-print`**. Style is separated from
geometry so one town renders in every preset (VG's twelve styles over one seed is the model; `docs/IMPROVEMENTS.md` §4
R13). Random styles obey luminance-contrast constraints (O12 (f)).

### 8.3 Symbol catalogue (what the renderer must draw; visual-spec §6 adopted)
Filled faces with hairline outlines; cased ribbons; repeated-offset shoreline bands (`W·(i/N)^1.5`, VG's law, as an
optional water effect); offset-silhouette shadows and prism shadows from heights; lobed crown generator (4-way bulging,
mod-4 vertices — NG's construction class); clipped hatching at a per-face angle (furrows) and tapered triangle ticks
(NG roofs); flat shadow pass composited once; tiled textures + normal-map-style lighting for the lit preset (WebGL2)
with a Canvas2D approximation (tonal split only); curved per-glyph text with halo; screen-space furniture layer (grid at
a round ground distance, scale bar with major/minor ticks and unit switching, 8-ray compass with ink/paper halves, title,
legend); cache per group, not per primitive (MFCG: 46 000 fills, 590 uploads).

### 8.4 Layers, shadows, heights
Every item carries `layer` and `z`; per-layer toggles; the **shadow hook**: a `ShadowPass(layer, sun)` that projects
each item's `heightCm` along the sun vector into an offset polygon (prism for buildings, walls and towers; crown offset
for trees) and composites once per layer; the sky layer's shadows are projected onto the ground layer scaled by
`elevation`. The base ships the pass with a fixed sun and it is **off by default** (owner: shadows optional; FM's 90 %
render cost is avoided by vector offset, not bitmap filters). Heights come from §2.6 for every building, wing, tower and
roof, so shadows and a later 3-D export agree (O17 (g)).

### 8.5 Level of detail and budgets
Per-LOD detail budgets by zoom and hardware tier (FTG's tiers made explicit): item counts, hatch density, tree crown
resolution, label sets; symbols have minimum on-screen sizes (≥ 2 px) and no feature pops more than once across a zoom
sweep (O12 (a)). Retained scene + `flatbush` culling; derived geometry (roofs, scatter) cached by entity id and
discardable (deterministic).

### 8.6 Stage-2 render tier and stage-3 LOD
The `hatched` preset at neighbourhood LOD is the S5 tier of IMPROVEMENTS (tapered hatch, two-tone roofs, prism shadows
from stored heights, cobbles, chimneys, wells, lobed trees, depth-sorted), generated lazily per district tile from the
district's sub-seed. Stage 3's compositions plug in at the `building` LOD through `BuildingGenerator.lod`.

### 8.7 Export resolution
SVG is resolution-free and layered; PNG/print by tiling at any DPI (300 dpi A2 without artefacts, O12 (e)); paper-unit
stroke rules make hairlines correct at every scale.

## 9. Labels and map furniture

* **Area labels** (districts, water bodies, woods): spine = the longest path of the **hole-aware straight skeleton** of
  the (simplified) face, smoothed (Visvalingam → centripetal Catmull-Rom), curvature-limited; letter-spaced small caps
  placed per glyph along the spine (MFCG D2's chain, `docs/confidence/mfcg.md` §2.D), size ∝ √area within a band, halo in
  the paper role; a label that does not fit the spine falls back to the OBB axis (the 2019 method) or to a legend entry.
* **Path labels** (streets, rivers, walls): along the centreline, repeated at intervals by class and zoom, upright.
* **Point labels** (gates, bridges, landmarks): anchor + candidate offsets.
* **Collision and priority**: an `rbush` of placed boxes; priority = importance × zoom; protected features (gates,
  landmarks, bridges, the keep) are obstacles no label may cover (MFCG's covered gate blocks are the failure, O13 (a));
  district labels never cross holes (the hole-aware skeleton) and stay inside their face ≥ 99 %.
* **Names** from an original grammar (§10.4) conditioned on the model (a "Narrow Bridge" needs a bridge); every name
  rerollable, editable, persisted per entity.
* **Furniture**: title, legend (generated from the symbol registry), scale bar (metres/feet), north arrow/compass, grid
  (metres, feet, VTT squares), all screen-space and toggleable; annotation layer with numbered markers and a separate
  legend sheet.
* **LOD sets**: city zoom shows districts, water, major landmarks, gates; district zoom adds streets and squares;
  neighbourhood zoom every named way and buildings on demand.

## 10. Simulation and content layer (FTG parity, with restraint)

### 10.1 Scope and depth (judgment)
FTG's roster-first generation is part of "the best of both", so the **roster, the context vector, the assignment
solver, households derived lazily, typed open spaces and rule-placed landmarks are BASE must-haves** (they are the
demand side of the layout and the source of every plot's owner and use). **Schedules, hourly time, calendar, factions'
meetings, relations and events are a separate optional module** (`@plat/sim`) over the same ids, delivered in the base
release cycle but not gating milestone 1 (`docs/IMPROVEMENTS.md` J-S adopted). Restraint: the map stays a clean plan
(content lives in data, hover, gazetteer and export); one click never asks a questionnaire; content is optional.

### 10.2 Roster (data-driven, replaceable)
```ts
interface RosterTables { classes: BuildingClassRow[] /* {id, use, perCapita:[lo,hi], min, max, sizeGate, requires, noxious, footprintM2:[p10,p50,p90], floors:[..], heights, coverageByBand, siteplan, tags} */;
  institutions: InstitutionRow[]; households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; names: NamePack; provenance: Provenance }
```
Our own tables (schema ideas after FTG's dependency graph — `oneBuildingForNumberOfPeople`-style ratios, hard min/max,
size gates, `requires` — none of FTG's values or word lists). Demand loop: population → households by band → building
demand per class with ratios, then a bounded **plan–fit–reconcile** loop against the layout's capacity (≤ k = 6
iterations; O7 (e)): unmet demand trims lowest-priority classes and reports; surplus capacity becomes yards, greens or
vacant plots typed as such.

### 10.3 People, households, schedules
Households and people are pure functions of `(seed, household id)`: `derivePerson(seed, id)` yields name, age, role,
appearance from tables; pinned once seen or edited (FTG's rule). The optional module adds professions ↔ workplaces
(greedy matching with tie-breaks by id), a **schedule-as-query** model (a person's location at (day, hour) is a
deterministic function of role tables and the calendar — FTG's `[INFERRED]` model, `docs/confidence/ftg.md` F1 — so time
skips are free), sub-locations per building class, opening hours, factions and religions with seats on plots, events as
templates. Storage: aggregates + pinned people only; a 50 000-person metropolis stores kilobytes of people, not
megabytes (FTG PERF-1 answered).

### 10.4 Names
An original English-fantasy grammar (owner J15) in a Tracery-class engine of our own (rules with modifiers, guards on
map features, weighted decks — the engine idea is public; the grammar and word lists are ours), plus a syllable
generator for surnames; folk-contraction as an EVO event (FTG's erosion idea, rule-driven, "≤ 3 syllables" as a
parameter). Naming draws from `naming/*` streams only.

## 11. Export and interop

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9; round-trip byte-identical | the canonical form; import of our own export |
| **JSON schema** | published, versioned (`zod`-generated JSON Schema); entities by id with containment | the API's response type |
| **GeoJSON** | RFC 7946 FeatureCollection per layer, coordinates in metres in a local CRS (`crs` extension member with origin + scale; optional georeference to a host map), districts included (FTG's gap F26 closed), ways as LineStrings, faces as Polygons with holes | validated with an open validator in CI; a scripted QGIS load is the acceptance (O11 (d)) |
| **SVG** | layered semantic SVG from the display list: `<g id="layer-ground">` → `<g class="district">` …, entity ids on elements, paper-unit strokes | opens in Inkscape/Illustrator with layers intact |
| **PNG / tiles** | Canvas2D tiling at any DPI; transparent background option; per-layer masks | print presets (A4…A2, 300 dpi) |
| **VTT** | Foundry-class scene JSON at a declared grid scale (e.g. 5 ft = 1.5 m): walls from footprint edges and enceintes, doors from entrances and gates, lights from lamp posts/windows (sim module), regions from plots/districts, journal links from the gazetteer; **one scene per layer** (underground / ground / sky) with elevation | grid alignment error 0 px per cell (O11 (g)) |
| **3-D** | glTF 2.0: footprints extruded by eave height with roof meshes from ridge height (hip/gable from the straight skeleton), walls/towers as prisms, terrain as a heightfield mesh; CityJSON-style export as an option | shadows and 3-D agree by construction (heights are model data) |
| **CSV** | people, buildings, plots (statistics record, O6 (d)) | corpus calibration |
| **embedding API** | ES module: `generate(blueprint) → Document`, `edit(doc, event)`, `regenerate(doc, scope)`, `query(doc, …)`, `render(doc, backend, view)`, `export(doc, format)`, all headless; **postMessage protocol** for iframe hosts (`{type, stateId, data}` with optimistic-concurrency tokens — the shape FTG's own MIT module uses, re-specified) | no external constraints now (owner) |
| **permalinks** | §6.3 | one line for unedited towns |

## 12. Performance budgets

Size classes (the base ladder; population targets from `docs/IMPROVEMENTS.md` B-CITY; building counts derived at
≈ 3.4 persons/building for the core plus hinterland):

| class | population | buildings (approx.) | frame (m) | model budget (p50 / p95) | first frame (Canvas2D, ink) | notes |
|---|---|---|---|---|---|---|
| TOWN | ≈ 5 000 | 1 500 | 2 000 | **60 / 100 ms** | ≤ 150 ms | MFCG size-25: 16–82 ms model (`profile-mfcg.md` §7.1) |
| CITY | ≈ 20 000 | 6 000 | 5 000 | **180 / 300 ms** | ≤ 400 ms | MFCG size-80: 125–260 ms model, 170–230 ms one Canvas replay; FTG CITY ≈ 3 s server + 2–5 s client |
| METROPOLIS | ≈ 50 000 | 15 000 | 6 000–8 000 | **600 ms / 1 s** | ≤ 1 s (WebGL2 tier) or progressive | FTG metropolis load 10 s is the bar to beat |

Per-stage split at CITY (targets): S1 site 15 ms (raster 625² at 8 m; O(cells)); S2/S3 5 ms; S4 backbone 10 ms
(lattice ≈ 40 k points, ≤ 12 A* queries); S5 growth 40 ms (≈ 5 000 proposals, incremental insertion ≈ 5 µs each);
infill 20 ms (≈ 1 500 cuts at ≈ 12 µs); S6 districts + fields 10 ms; S7 corridors 30 ms (Clipper2 union per district);
S8 plots 25 ms (≈ 6 000 plots); S9 site plans 15 ms (≤ 10 µs per plot median, O17 (h)); S10 5 ms; S11 15 ms; labels
10 ms. **Cost model tests** (§13) fit each stage's time against its entity count and fail on super-linear growth.
Memory: typed arrays; CITY plat ≈ 60 k vertices × 5 levels ≈ 10 MB; display list ≈ 20 MB; person derivation on demand.
Workers: the pipeline runs in a Worker with transferable buffers; stages S7–S9 parallelise per district; render on the
main thread from the display list; incremental/async: the first frame draws the city LOD as soon as S7 commits,
finer LODs stream in (progressive first map < 1 s, O12 (g)).

## 13. Testing and verification

### 13.1 Kernel property tests (fast-check; B-FUZZ)
For each primitive: 10⁶ random polygons (concave, holed, thin, near-collinear, snapped, duplicated vertices) → 0
crashes, 0 hangs (hard timeout), output simple, every face inside its parent, no edge below weld, Euler characteristic
holds after every insertion, `remove(insert(x)) ≡ id` on the topology, `splitFace` children areas sum to the parent,
`corridorUnion` faces disjoint and covering, `offset(−d)∘offset(+d)` ⊆ original, straight skeleton contained in the face
and simply connected, OBB contains the hull, snap rounding idempotent, cross-backend boolean equality (Clipper2 vs
`polygon-clipping`) within one lattice unit.

### 13.2 Per-stage invariants
The §5.3 suite as executable checks after every stage on B-CITY (1 000 seeds × 4 water configs × 3 sizes), plus the
stage-specific acceptance criteria of every must-have opportunity (§15.2) computed from the **statistics record**
emitted per generation (O6 (d)).

### 13.3 Goldens and the declared-shift protocol
A golden-seed suite (50 seeds per size class) stores model hashes, per-stage entity counts and the statistics record
per release; a release that changes any golden must name the stage and the legitimate cause in `CHANGES.md` and bump
the generator version; stages untouched by a release stay byte-identical (O2 (e)); cross-platform run nightly (§3.2).

### 13.4 Visual regression
`pixelmatch` on rendered PNGs of the golden seeds per preset and LOD with a per-region tolerance; a legibility check at
city zoom (minimum feature size, contrast); the option-interaction matrix (every pair of toggles) rendered and diffed
against the expectation "no option silently disables another" (O12 (c)).

### 13.5 Reference-parity metrics (computed against our captures, B-REF)
| metric | our output | reference number (CONFIRMED in the cited findings) | pass band (initial; corpus phase recalibrates) |
|---|---|---|---|
| street turn-angle histogram | per-vertex deviation on all ways | FTG: zero mass above 15°, flat heading spectrum (`_critic-ftg.md` §4 rows 7–9) | no cliff; p95 ≤ 25°; heading entropy ≥ FTG's |
| junction arm angles | at every L1 junction | FTG median 90.02°, 58 % in 80–100° | median 85–95°; p5 ≥ 30° |
| segment lengths by class | L1 edge lengths | FTG main L + 0.5, district (L + 0.5)/2, suburb 30.00 m, lot outlines 14.70 m (roadlength100 README) | class medians inside declared bands |
| block-area distribution | L2 built blocks per district | NG block counts per template (`profile-neighbourhood.md` §3.2/CA-2); FTG block lots median 441 m² (F13); MFCG ≈ 18.6 lots/block (§4.9) | KS distance to the class target reported; within band |
| bent-cut signature | infill cuts | NG: one bend in 380/519, corner at 0.5 ± 0.05–0.09, ≥ 85° arrival in 96 %, 53 % filleted (BG-1/BG-2) | ≥ 80 % of bent cuts with corner in 0.40–0.60; ≥ 95 % arrivals ≥ 85° |
| footprint area / side | L4 footprints | FTG median 103 m², p95 154, side 10.3 m; MFCG ≈ 13–14 m at size 25 (visual-spec §1.4) | ordinary houses median 60–160 m², p95 < 400 |
| entrance rule | L4 | FTG: on the outline, 2.99 m from the road, road-facing | 100 % on the access edge, 2–4 m |
| party-wall share | row classes | NG 39–43 % of perimeter, 95–99 % attached; FTG 6.4 % share a vertex (K13; F13) | attached ≥ 90 % in dense/poor classes |
| tower spacing, gates | S10 | FTG 39 m median; MFCG auto gates ≈ 0.8·√size, `gates=N` exact (EG2-2) | class band; N exact |
| water sampling and width | L0 | FTG 50 m resampling, rivers ≈ 31 m mean; MFCG river 6.9–18.9 units | outline step ≤ 25 m; width band by class |
| tree scatter | render-time instances | FTG NN median 9.7 m, min 0.14 m (not Poisson); MFCG/NG Bridson k = 50, 140-point tile | NN p1 above the canopy threshold |
| buildings vs size | totals | MFCG buildings ≈ size^2.9 (EG-3); ≈ 6.12 persons/building (`_critic.md` C1); FTG 3.4 persons/building | requested population within ± 5 % |
| generation time | per stage | MFCG size-80 125–260 ms; NG hood 10–96 ms; FTG CITY ≈ 3 s | §12 budgets |
| draw-style checks | display list vs draw records | MFCG casing = core + 2h on 7/7 maps, round joins 4062/4063; NG square caps on streets, ≈ 17 hatch triangles per wing; VG bands 5.196 : 2.828 : 1 | style regression per preset |
| restarts / failures | report | MFCG 24 restarts in 58 attempts; VG 4 of 13 highway maps discarded | 0 whole-map restarts; ladder uses ≤ 2 % of transactions |

## 14. Package and module layout

```
@plat/kernel     lattice, predicates, DCEL (Plat), transactions, booleans+offset wrapper (Clipper2 WASM | polygon-clipping), skeleton, obb/hull, delaunay (delaunator), poisson, curves, index (flatbush/rbush), noise, dmath (deterministic math), rng (xoshiro + path hash)
@plat/model      schema (zod), ids, layers, entity registry, lifecycle, document, serialisation (.plat), migrations, statistics record
@plat/tables     rule tables + presets + style sheets as versioned JSON with provenance; loaders; preference layer
@plat/site       S1 terrain, hydrology, coasts/lakes/islands outline routine, water faces
@plat/content    S2 roster, demand tables, households/people derivation, naming engine + grammar
@plat/layout     S3 siting, S4 backbone routing, S5 growth + infill (bent cut), S6 districts + fields, S7 corridors, S10 fortification, S11 hinterland; the LayoutStrategy interface
@plat/plots      S8 granularity law + frontage plots, S9 site plans, BuildingGenerator interface + OutlineBuildingGenerator, assignment/placement solver
@plat/hood       stage 2: NeighbourhoodStrategy (templates, refine inside a boundary)      [built after the base; interface lives in @plat/layout]
@plat/labels     S12 spines, path/point labels, collision, furniture
@plat/render     display list builder, style sheets, LOD, backends (canvas2d, svg, webgl2, tiles), shadow pass
@plat/edit       edit events, transactions over the document, undo/redo, scoped regeneration, migrations of events
@plat/export     geojson, svg, png/tiles, vtt, gltf, csv, permalinks
@plat/sim        optional: schedules, calendar, factions, events (over @plat/content ids)
@plat/api        the embeddable library facade (generate/edit/regenerate/query/render/export), Worker host, postMessage bridge
@plat/app        the reference UI (one click, previews, report panel, editing tools, style dialog)
@plat/testkit    B-FUZZ generators, invariant runners, statistics/parity metrics, golden tooling, capture readers for B-REF
```
Dependency rules (enforced by lint): `kernel ← model ← tables ← {site, content} ← layout ← plots ← {labels, render}
← edit ← export ← api ← app`; `hood` depends on `layout`/`plots` only through their interfaces; `sim` depends on
`content` and `model` only; nothing depends on `app`; no package imports a backend it does not need (SVG export never
loads WebGL).

Key interfaces (TypeScript-style):
```ts
// @plat/layout
interface Stage<I, O> { name: string; run(input: I, ctx: StageContext): KernelResult<O>; invariants: Invariant[]; ladder: Ladder; budgetMs: number }
interface StageContext { doc: Document; plats: PlatSet; rng: (path: string) => Stream; tables: Tables; report: ReportSink; scope?: Scope /* for regeneration */ }
interface LayoutStrategy { id: 'fused-base' | string; stages(): Stage<any, any>[]; supports(rung: SizeRung): boolean }   // stage 2 adds NeighbourhoodStrategy; a village product would add its own
// @plat/plots
interface GranularityLaw { bands(ctx: ContextVector): { frontageM: [lo, hi]; depthM: [lo, hi]; areaM2: [lo, hi]; joinMax: number; alleyPolicy: AlleyPolicy } }
interface SitePlanRules { plan(plot: Plot, ctx: ContextVector, tables: Tables, rng: Stream): SitePlan }
// @plat/render
interface Backend { begin(view: View): void; draw(list: DisplayList, lod: number): void; end(): void; pick(p: Point): Id | null }
// @plat/api
interface PlatApi { generate(bp: Blueprint): Promise<Document>; edit(doc, e: EditEvent): Document; regenerate(doc, scope: Scope, opts): Document; query(doc, q: Query): unknown; render(doc, backend: BackendId, view: View): void; export(doc, fmt: Format): Blob; report(doc): GenerationReport }
```
Extension points: strategies, stages (registered by name with declared I/O types), rule tables and presets (data),
style sheets (data), symbols (registry), building generators (interface), export formats (registry), edit event types
(with migrations), placement solvers.

## 15. Parity matrix and improvement matrix

### 15.1 Parity matrix — every capability in `docs/confidence/*.md`
Tags: **BASE** (delivered by stage 1), **STAGE-2** (the neighbourhood interface/close-up), **VILLAGE-LATER** (not
built; checked as not precluded), **N/A** (a reference property the base deliberately does not reproduce, with the
reason). "Where" names the section of this proposal.

**MFCG (`docs/confidence/mfcg.md` §2.0; 40 rows) — all BASE unless noted**

| id | capability | where in PLAT | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §4.2 Blueprint, §6.3 permalinks, §7.5 intent (MFCG's flags kept as intent toggles) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1 named sub-streams (exceeds: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §4.1 stage graph, §5 ladders (no whole-map restart) | BASE |
| B1 | patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | §4.5: Delaunator used for the routing lattice and site sampling; the cell mesh as street source is replaced by the plat | BASE (mechanism replaced by ruling; look preserved via S4 radial arterials) |
| B2 | junction optimisation (short-edge collapse) | §3.1 welding + §4.5 junction merge (8 m) | BASE |
| B3 | coast / water field / `sea` | §4.2 S1 (level set of height − gradient(seaDirection)) | BASE |
| B4 | `buildDomains` (land components) | §4.2 S1 flood fill of L0 | BASE |
| B5 | curtain wall, gates, towers, watergate | §4.8 fortification (gates at arterials, exact count, watergate at river crossings) | BASE |
| B6 | citadel / castle (repair loop, placement, keep) | §4.4 castle siting by score, §4.8 keep/bailey, compactness gate with re-siting | BASE |
| B7 | streets and roads (Topology, aStar, tidyUpRoads) | §4.5 S4 routed arterials (heap A*), destinations = gates/market | BASE |
| B8 | rivers / canals (regular, delta, bridges, mouth) | §4.2 S1 rivers by descent, estuary mouth widening as a class; §4.8 bridges | BASE |
| B9 | districts (seeded region growing, types, holes) | §4.7 S6 grower over coarse blocks, `check4holes` split | BASE |
| B10 | ward → blocks (alleys by twisted bisection) | §4.6 bent-cut infill as lane/alley spines | BASE |
| B11 | block → lots (twisted bisection, OBB, indentFronts) | §4.7 S8 frontage-first plots + front jitter (Offset) | BASE (construction replaced by ruling O5; statistics matched) |
| B12 | outskirts density falloff | §4.7 density field + S8 granularity (detached/ribbon classes outside the enceinte) | BASE |
| B13 | shanty town / ribbon sprawl | §4.3 stage budgets + §4.7 `sprawl`/`suburb` district kinds with the squalid band's site plans along roads/coast/river | BASE |
| B14 | plaza, temple, churches, gate plazas | §4.7 S7 `square` corridor faces sized from population; institutions via joins (S8 step 6); gate squares | BASE |
| B15 | landmark / solid buildings, keep plan | §4.7 S9 institution site plans; §2.6 OutlineBuildingGenerator (rectangle compositions); stage 3 replaces | BASE (+S3 hook) |
| B16 | greens / parks | §4.8 greenery rules (O19) | BASE |
| B17 | farms and fields | §4.8 hinterland presets incl. furrow style | BASE |
| B18 | harbour, docks, piers | §4.8 water furniture | BASE |
| B19 | trees and forests | §4.8 forests as faces; §8.3 Poisson tile scatter at render | BASE |
| B20 | elevation field (`Apply elevation`) | §4.2 S1 real heightfield feeding S4/S5 costs (exceeds) | BASE |
| C1 | display modes (Lots / Complex / Block / Hidden) | §8.1 LOD bands + §8.2 style: footprints are the model; "Lots" look = row classes at city LOD; "Block" = city LOD; Hidden = a layer toggle | BASE |
| C2 | roofs Plain / Hip / Gable, Raised, Solids | §3.1 straight skeleton; §8.3 symbols; §2.6 roof spec + heights | BASE |
| C3 | lot post-processing (Offset) | §4.7 S9 front-line jitter parameter | BASE |
| D1 | naming (Tracery + Markov, feature-conditioned) | §10.4 own engine and grammar | BASE |
| D2 | district labels (curved / straight / legend / hidden) | §9 | BASE |
| D3 | map furniture (title, legend, scale bar, grid, compass, emblem, pins) | §9, §8.3 (emblem = a later symbol) | BASE |
| E1 | colour system (schemes, roles, tints, weathering) | §8.2 roles, per-district tint and per-roof weathering as style params | BASE |
| E2 | stroke discipline, layer order, caching | §8.1–8.3 (casing idiom, round joins, per-group cache) | BASE |
| E3 | alleys layer | §4.6 lanes/alleys are ways; §8.1 an LOD/style toggle | BASE |
| E4 | district view, framing, no-zoom, thin lines | §8.1 continuous zoom + district LOD (exceeds "no zoom"); framing = camera fit | BASE |
| F1 | warp tools (8) | §3.4 `warp` kernel op + §7.1 `warp` event with re-validation | BASE |
| F2 | rerolls, renames, landmarks | §7.3 scoped regeneration, §7.1 rename/assign | BASE |
| F3 | UI / hotkeys / size bands | `@plat/app`; size ladder §12 | BASE |
| G1 | export PNG / SVG / JSON | §11 | BASE |
| G2 | integrations (FMG, Armoria, PS, Procgen Mansion) | §11 API/postMessage; specific third-party links are out of scope (no external constraints now) | BASE (hook) |
| H1 | population and scale model | §4.3 roster + §2.1 metres (exceeds the multiplier) | BASE |
| H2 | performance envelope | §12 | BASE |

**FTG (`docs/confidence/ftg.md` §2.0; 46 rows) — all BASE unless noted**

| id | capability | where in PLAT | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §4.2, §7.5 (presets as data), §2.9 document | BASE |
| A2 | two-phase pipeline, staging, failure policy | §4.1 (programme before layout, two-way), §5 | BASE |
| A3 | coordinate system, units, wire format | §2.1 integer cm centred; §2.9 binary block | BASE |
| A4 | determinism, seeding, regeneration of old settlements | §6, §7.4 migrate (exceeds: FTG has none) | BASE |
| A5 | server/client split, persistence, lazy person generation | §11 API headless + optional service later; §10.3 lazy people | BASE |
| B1 | size ladder, population and area budget | §4.3 (explicit area budget), §12 ladder | BASE |
| B2 | dependency-graph building selection | §10.2 demand loop (own tables) | BASE |
| B3 | residents, job postings, backfill, matching | §10.3 (matching in `@plat/sim`; households in base) | BASE (matching in the optional module) |
| B4 | people model | §10.3 derived people (own tables) | BASE (data depth in the module) |
| B5 | government, religion, factions, military | §2.7 Faction/Institution entities; seats on plots (base); meetings (module) | BASE + module |
| B6 | relations, friend groups, rivalries, events | `@plat/sim` | BASE-optional module |
| C1 | coast generation, islands, ponds | §4.2 S1 closed-outline routine (also sky islands) | BASE |
| C2 | rivers, branches, bridges, classification, direction | §4.2 S1 hydrology, §4.8 bridges | BASE |
| C3 | manually drawn water | §7.1 `drawWater` event (path → width → face) | BASE |
| C4 | road-graph substrate (PSLG, incremental faces, edge types) | §2.2 the plat (exceeds: tolerance policy, face hierarchy) | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages) | §4.5 S5 (curvature-continuous, destination-biased) | BASE |
| C6 | district lots: creation, merge floor, type selection | §4.7 S6 grower + data scorer | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings) | §4.7 S8 step 6 joins first, then plots, then S9 | BASE |
| C8 | lot → plot subdivision geometry | §4.7 S8 frontage-first (replaces recursive random cuts by ruling O5) | BASE |
| C9 | building footprints, landmark templates, entrances | §4.7 S9; entrance rule kept | BASE |
| C10 | suburb stage | §4.3 suburb stage + §4.7 detached/ribbon classes | BASE |
| C11 | walls and towers | §4.8 | BASE |
| C12 | castle district | §4.4 + §4.8 | BASE |
| C13 | harbours and waterfront districts | §4.8 | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §4.8 hinterland | BASE |
| C15 | forests, tree areas, trees, hedgerows | §4.8, §8.3 | BASE |
| C16 | landscape decorations, reserve, climate presets | §4.8 (decorations as typed symbols/faces; climate = style + table preset) | BASE (climate presets should-have) |
| C17 | perimeter expand+round; decoration system | §4.7 S9 yard sub-areas + §8.2 per-class decoration rows | BASE |
| C18 | district and building naming, erosion | §10.4 | BASE |
| D1 | renderer architecture | §8.1 display list + WebGL2 backend (batched, picking via index) | BASE |
| D2 | palette and feature treatment | §8.2 `lit` preset | BASE |
| D3 | roofs (straight skeleton) | §3.1, §8.3 | BASE |
| D4 | water rendering and coast decoration | §8.3 water bands, foam, beach classes (lit preset) | BASE (should-have detail) |
| D5 | day/night, weather, seasons, window lights | §8.4 sun vector + shadow hook; lights from the sim module | BASE (hook) + module |
| D6 | post-process effects | §8.1 backend effects (WebGL2) | BASE (should-have) |
| D7 | labels, scale bar, grid, units, legend, thematic layers | §9 | BASE |
| D8 | 3-D view, street view, height maps | §11 glTF export; heights in the model | BASE (export), no street view |
| E1 | layout editor | §7.1 events (draw way/water/wall, fill by face pick) | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.3 scoped regeneration, §7.1 retype/assign | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §7.1, §2.8 registry; notes/annotation layer §9 | BASE |
| F1 | schedules, behaviours, sub-locations | §10.3 | BASE-optional module |
| F2 | clock, calendar, external time sync | §10.3, §11 postMessage | module |
| G1 | export | §11 | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §11 VTT export + protocol (hosting later) | BASE (export) |
| H1 | data scale | §10.3 lazy derivation; tables sized by us | BASE |
| H2 | performance envelope | §12 | BASE |

**NG (`docs/confidence/ng.md` §2.0; 32 rows) — STAGE-2 unless noted (the base carries the interface)**

| id | capability | where in PLAT | tag |
|---|---|---|---|
| A1 | tags, `Settings`, URL state | §4.9 `TemplateId` + district character (tags → parameters as data) | STAGE-2 |
| A2 | RNG engine, one stream, successor seed | §6.1 per-district sub-seeds (exceeds) | BASE |
| A3 | pipeline structure and failure policy | §4.9 refine transaction + §5 ladders | STAGE-2 (kernel in BASE) |
| B1 | hood outline (`createShape`) | §4.9 boundary is the district's typed boundary; standalone mode uses the closed-outline routine of §4.2 | STAGE-2 |
| B2 | templates area / street / square | §4.9 templates as seed geometry + sub-areas | STAGE-2 |
| B3 | street network by bent recursive bisection | §4.6 (the base's infill primitive; NG signature as regression) | BASE |
| B4 | hole-aware bisection of annuli | §4.6 slit routing | BASE |
| B5 | street finishing: extend, fillet, width, corridor | §4.6 steps 4, 6, 9; §4.7 S7 corridors | BASE |
| B6 | block content dispatch (Normal / Manor / Empty / Green) | §4.7 S8 residue typing + §4.6 ladder rung (d) | BASE |
| B7 | square-template plaza | §4.9 template; §4.7 `square` faces | STAGE-2 |
| B8 | ring-template seed geometry | §4.9 template (ring = concentric `secondary` spines in a boundary) | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §4.7 S8 (construction, 0 discards) | BASE |
| C2 | buildings, wings, compound plans, roof kinds, landmarks | §2.6 composition + stage 3 hook; roof kinds in base | BASE (+S3) |
| C3 | manor compounds (walls, hall, grove) | §4.7 S9 set-back compound site plan | BASE |
| C4 | greens, groves, shared Poisson field | §4.8 greenery rules; §3.1 Poisson tile | BASE |
| C5 | trees (crown construction, colour, shading, depth sort) | §8.3 lobed crowns, depth sort in the `hatched` preset | STAGE-2 tier (symbol in BASE) |
| C6 | pins: wells, fountains, large trees | §8.3 point symbols; placement rule in S9 yards / squares | STAGE-2 |
| C7 | uneven streetwall | §4.7 S9 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | §4.9 character vector; metric scale (exceeds) | STAGE-2 |
| D1 | naming | §10.4 | BASE |
| D2 | title layout (corner choice) | §9 furniture (emptiest-corner rule kept) | BASE |
| E1 | palette / style schema, presets, multi-colour | §8.2 | BASE |
| E2 | canvas, layer order, stroke discipline, depth-sorted trees | §8.1, §8.3 | BASE |
| E3 | roads rendering (Plain + five modes) | §8.2 symbol styles (cobbles, tiles, outlined, dashed) | STAGE-2 tier |
| E4 | roof rendering: fake gables, colour law, hatching | §8.6 `hatched` tier (per-wing op mix as regression) | STAGE-2 tier |
| E5 | shadows (prism quads, tree shadows) | §8.4 shadow pass from heights | BASE hook, STAGE-2 tier |
| E6 | unrecorded style features (night lights, presets) | §8.2 presets (lights via module) | STAGE-2 tier |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | `@plat/app`; rotation = view | STAGE-2 |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations | §11 | BASE |
| H1 | performance envelope | §12 (S5 tier: open a district at neighbourhood LOD ≤ NG's 10–96 ms at comparable counts) | STAGE-2 |

**VG (`docs/confidence/vg.md` §4; 44 rows) — VILLAGE-LATER: not-precluded checks only**

| id | capability | not-precluded because | tag |
|---|---|---|---|
| G1 tags/URL; G20 descriptive tags | intent layer + presets as data (§7.5) | VILLAGE-LATER |
| G2 seed/RNG/retry | §6 streams; §5 no seed swap | VILLAGE-LATER |
| G3 river course; G4 height field; G5 water extraction | §4.2 S1 is shared (carve-then-extract is one preset) | VILLAGE-LATER |
| G6 density map; G7 heart | §4.7 fields are the same field type; a village strategy seeds one heart | VILLAGE-LATER |
| G8 road network (trackers); G9 bridges | a `VillageStrategy` may add a tracker-steered growth stage behind `LayoutStrategy`; bridges §4.8 shared | VILLAGE-LATER (trackers not built) |
| G10 square + centrepieces; G11 wharf/piers | `square` faces + point symbols; piers §4.8 | VILLAGE-LATER |
| G12 buildings + population; G13 fields; G14 orchards; G15 forest; G16 palisade | detached/farmstead site plans; hinterland presets; forests; `palisade` enceinte kind (§2.7) | VILLAGE-LATER |
| G17 naming; G18 legend/POIs; G19 population/class | §10.4, §9 annotation layer, §10.2 | VILLAGE-LATER |
| R1–R17 rendering (palette, layers, relief, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | style sheets + symbols; relief/hillshade/spotlight are optional effects not built in the base (§8.5); water bands and outlining are symbols in §8.3 | VILLAGE-LATER (relief tier not paid for) |
| E1–E6 export, JSON, permalinks, editing, integrations, performance; D1 scale | §11, §7, §12, §2.1 | VILLAGE-LATER |

### 15.2 Improvement matrix — every must-have / should-have in `docs/IMPROVEMENTS.md`

| id | must/should | mechanism in PLAT | acceptance metric adopted (from IMPROVEMENTS) |
|---|---|---|---|
| O2 deterministic recipe | must | §6 streams by path; ids §2.1; seeded decoration §6.1; epoch streams reserved | O2 (a) identical model hash on two machines/browsers, 100 %; (b) grammar/decoration/block reroll perturbations change 0 other entities; (c) locality ≥ 95 %; (d) ids 100 % stable on B-EDIT; (e) golden suite |
| O6 metric units, furniture, statistics | must | §2.1 cm; §12 ladder; §9 furniture; statistics record §13.2 | O6 (a) 100 % length fields in m; (b) house median 60–160 m², p95 < 400; (c) grid 0.5 %; (d) 100 % statistics records with provenance |
| O3 robust kernel, no restarts, report | must | §3, §5 | O3 (a) B-FUZZ 0 crash/hang/self-intersection; (b) 0 whole-map restarts, hard invariants 0/1 000; (c) B-EDIT 0 planarity violations; (d) TOWN ≤ 100 ms, CITY ≤ 300 ms, METROPOLIS ≤ 1 s; (e) identical hash across platforms; (f) seed never swapped |
| O11 schema, registry, exports, API | must | §2, §11, §14 | O11 (a) registry round-trip 100 %; (b) containment 100 %; (c) export→import→export identical; (d) GeoJSON validates and loads; (e) 0 dangling refs; (f) headless hash = UI hash; (g) VTT grid 0 px; (h) layered SVG |
| O1 terrain and hydrology first | must | §4.2 | O1 (a) 0 restarts, features 100 %; (b) 0 non-monotonic beds, contours cross water 0×; (c) 10/10 configurations on 100 seeds; (d) building ∩ water = 0; (e) water stage O(cells) ≤ 5 ms at 128² equivalent; (f) site classifier ≥ 90 %; (g) unused land components 0 |
| O4 two-tier street network | must | §4.5, §4.6 | O4 (a) 100 % through-roads reach destinations, bearings ± 10°; (b) detour ≤ 1.4, junction p5 ≥ 30°, no turn cliff, 4-way 0–15 %; (c) width ~ betweenness; (d) slope p95 within class; (e) 0 sub-weld edges; (f) network + infill ≤ 100 ms at CITY, NG bands; (g) N external connections exactly |
| O5 frontage-first plots | must | §4.7 S8 | O5 (a) access edge 100 %; (b) 0 < 3 m, wedges < 0.5 %; (c) side walls ± 5° ≥ 90 %; (d) typed coverage 100 %, discard ≤ 0.05; (e) KS to class targets reported; (f) 0 self-intersecting/duplicate/doorless; (g) streetwall gap ≤ 1 m |
| O18 prosperity field + granularity law | must | §4.7 S6 fields, S8 steps 2/6/7 | O18 (a) Spearman ≥ 0.8 / ≤ −0.8; (b) Moran's I > 0; (c) monotone detached/yard/attached/coverage; (d) alley length ~ −prosperity; (e) access 100 %; (f) institutions placed 100 %, never gives up; (g) provenance + perturbation ≥ 95 % outside; (h) seams within band; (i) smooth field, edits replay; (j) CV floor; (k) gap modes |
| O17 plot model, site plans, heights | must | §2.5–2.6, §4.7 S9, §8.4 | O17 (a) coverage within table; (b) multi-footprint plots for institutions; (c) party-wall share, attached ≥ 90 % dense; (d) streetwall continuity; (e) yards owned 100 %; (f) footprints fit 100 %; (g) heights 100 %, shadow ∝ height r ≥ 0.99; (h) ≤ 10 µs/plot; (i) footprint hash identical across LOD |
| O7 content-first land use | must | §10.2, §4.3, §7.5 | O7 (a) 100 % function/occupancy, population ± 5 %; (b) rule satisfaction ≥ 95 %; (c) Moran's I > 0; (d) 0 constraint violations; (e) reconcile ≤ k; (f) seam discontinuity within band; (g) lazy people stable 100 %; (h) gazetteer 100 % |
| O19 greenery by prosperity | must | §4.8 | O19 (a) Spearman ≥ 0.7, ± 5 pts, σ ≤ 8; (b) rules ≥ 95 %; (c) 100 % typed/owned; (d) NN p1 above canopy; (e) ≥ 10 000 trees in 16 ms; (f) monotone control; (g) legibility |
| O8 fortification network | must | §4.8, §4.10 | O8 (a) gates at 100 % arterial crossings, count exact; (b) 0 buildings in the band; (c) tower spacing band, 0 sawtooth; (d) high-ground share, castle ≥ p80; (e) enclosed share reported, outer curtain on request; (f) 4/4 circuit configurations; (g) wall→road keeps plot ids; (h) wall exported as entity |
| O12 display list, LOD, style as data, layers | must | §8 | O12 (a) continuous zoom, hash identical per LOD; (b) ≥ 60 fps at 40 k buildings/200 k trees, edit-to-redraw < 100 ms; (c) screen = PNG = SVG within threshold, 0 silent couplings; (d) glyph ambiguity 0, legend 100 %; (e) 300 dpi A2; (f) contrast 100 %; (g) first map < 1 s |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | O9 (a) save/load/save identical; (b) locked preserved 100 %, out-of-scope 0; (c) KS p > 0.05 on ≥ 95 % regenerations; (d) every op undoable; (e) upgrade keeps 100 % edits; (f) 12/12 MFCG edit asks expressible |
| O16-core report and honest controls | must | §5.4, `@plat/app` | O16 (a) report 100 %, diff shown; (b) auto-resolved reported; (d) 0 hidden couplings; (f) monotone controls; (h) seed identity 100 % |
| O13-core labels and names | must | §9, §10.4 | O13 (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %; (c) name–feature 100 %; (e) edited names persist 100 % |
| O14-core hinterland and margin | must | §4.8 | O14 (a) farmland per capita ± 20 %; (b) access 100 %, unused components 0; (d) roads leave to destinations 100 %; (e) built/map area band |
| O10 intent, constraints, assignment | should (schema + drift bounds must) | §7.5 | O10 (a) 10/10 intent tasks; (b) targets reported; (c) monotone; (d) pins 100 %; (e) assignments ≥ 99 %; (f) size error p90 ≤ 10 %; (g) forms classifier ≥ 90 %; (h) table edits versioned |
| O13 full (street names, addresses, annotation) | should | §9 | O13 (b) ≥ 90 % streets labelled at neighbourhood LOD; (d) 0 spelling errors; (f) annotation; (g) addresses 100 % |
| O14 full (rings, presets, wildness, feasibility) | should | §4.8 | O14 (c) forest edge, wildness monotone; (f) ≥ 95 % land classed; (g) scatter statistics |
| O16 full (previews, drafts, discoverability) | should | `@plat/app` (six thumbnails from the sub-second model) | O16 (c) tasks ≥ 90 %; (e) six thumbnails < 1 s; (g) 768 px |
| O12 extras (relief tiers, tiled export, low-end tier) | should | §8.5, §8.7 | as O12 (b), (e) |
| O7 simulation module | should | §10.3 `@plat/sim` | O7 (g) stored bytes per 10 k population reported |
| O11 extras (VTT native, per-layer, binary, 3-D, GIS profile) | should | §11 | O11 (g), (h) |
| O9 extras (upgrade replay with diff) | should | §7.4 | O9 (e) |
| O2/O6 extras (golden suite, corpus interface) | should | §13.3, `@plat/tables` provenance | O2 (e); every table value replaceable with provenance |
| S1 boundary and seam contract | STAGE-2 interface (must in base) | §4.9 | portal connection 100 %; misalignment 0; Hausdorff 0 for shared entities; 100 % of districts carry a complete contract |
| S3 seam-continuous fields | STAGE-2 (must in base) | §4.7 fields with hard/soft flags | Δ frontage/area/storeys within band on soft seams |
| S2 context features; S4 templates; S5 render tier; S6 workflow | STAGE-2 | §4.9, §8.6, §7.3 | as listed in IMPROVEMENTS §3.2 |
| hooks 1–8 (§5.4 of IMPROVEMENTS) | must | ids §2.1; lifecycle/events §2.8, §7; assignment §7.5; context vector §2.5; building interface §2.6 + heights + shadow hook §8.4; layers §2.1 + drainage §2.3 + any-boundary §4.9 + outline routine §4.2; editable tables §7.1; circumstances + field as layer §7.5, §4.7 | present in the schema at zero cost when unused |

## 16. Build plan

Order: the riskiest spikes first (the fused layout, the bent cut, the robust kernel), then the base milestones, then
stage 2. Person-weeks are expert estimates (PLAUSIBLE); the per-reference confidence figures (`docs/CONFIDENCE.md` §1:
MFCG ≈ 46 pw, FTG map subset ≈ 52 pw, NG ≈ 21 pw) are not additive because the plat kernel, the display list and the
document are shared, but they bound the base: **≈ 60–75 pw for milestones 0–4, ≈ 15 pw for stage 2.**

| milestone | content | exit criteria (must be executed, not asserted) | est. |
|---|---|---|---|
| **M0 — kernel + fusion spike** (risk retirement) | `@plat/kernel` lattice, predicates, DCEL, insert/split/merge, Clipper2 wrapper, OBB, snap rounding; the bent-cut transaction; a throw-away S4/S5 growth + infill on a flat site; statistics record | B-FUZZ passes on `insertChain`/`splitFace`/`corridorUnion` (10⁶ each, 0 crash/hang); the bent-cut signature regression against NG BG-1/BG-2 (corner 0.40–0.60 ≥ 80 %, arrival ≥ 85° ≥ 95 %); **fusion gate**: growth + infill ≤ 100 ms at CITY-scale input and block-area/junction-degree distributions inside NG bands (O4 (f)); cross-platform hash identical on Node x86/arm + Chromium + Firefox | 6–8 pw |
| **M1 — a viewable MFCG/FTG-class town** | S0–S9 + S10 basic wall/gates + S12 district labels + `ink` preset on Canvas2D + SVG/PNG export + permalink + report panel; O2, O6, O3, O11 (schema + PNG/SVG), O1, O4, O5, O18, O17, O8 basic, O12 city/district LOD, O16-core (the M1 gate list of IMPROVEMENTS §5.1) | side-by-side of 20 seeds at TOWN/CITY against MFCG and FTG captures for the owner's eye (J14); 0 whole-map restarts on B-CITY-lite (200 seeds); plots with access 100 %; population ± 5 %; model within §12 budgets; golden suite established | 16–20 pw |
| **M2 — the base at parity** | castle, harbour, bridges, hinterland (O14-core), greenery (O19), roster + assignment (O7), naming/labels full (O13-core), document + edits + undo + scoped regeneration (O9), warp tools, `lit` preset, WebGL2 backend, METROPOLIS | every must-have's acceptance criteria run on B-CITY (1 000 seeds) and B-EDIT (10⁵ sequences); parity metrics §13.5 within bands; 300 dpi export; ≥ 60 fps at 40 k buildings | 18–22 pw |
| **M3 — should-haves and the module** | O10 full (intent, forms catalogue, placement solver), O13/O14/O16 full, O12 extras (relief tiers, tiles, low-end), O11 extras (VTT, glTF, GIS profile), O9 upgrade replay, `@plat/sim` | scripted intent tasks 10/10; VTT import with no manual steps; sim module stored bytes per 10 k population reported | 12–15 pw |
| **M4 — hardening and calibration interface** | golden/declared-shift protocol, table provenance and the corpus-calibration interface, performance tiers, docs | nightly cross-platform goldens green for two weeks; every table value replaceable with provenance | 4–6 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `NeighbourhoodStrategy`, templates (area/street/square/ring), context features (quays, intervallum, stepped streets), the `hatched` render tier, "same kind, new seed" workflow | S1–S6 acceptance of IMPROVEMENTS §3.2: portals 100 %, seams 0, every B-CITY district opens at neighbourhood LOD in ≤ NG's 10–96 ms at comparable counts, footprint hash identical across LOD | 12–15 pw |

Deliberately out of scope: the village product (THORP → HAMLET → VILLAGE; VG's trackers, relief renderer, palisade
look), stage-3 building compositions (interface only), sewers and floating islands (layer/drainage/outline hooks only),
the evolution engine (lifecycle, incremental mode and conversions only), corpus calibration, host embedding constraints,
a hosted sync service.

## 17. Clean-room and legal posture; third-party licences

* **Clean room.** No code from TownGeneratorOS (GPL-3) or from any captured bundle is read for implementation, ported or
  paraphrased; the OS constants quoted in the findings are treated as *documentation of behaviour* and every constant
  in PLAT's tables is our own value with its own provenance line. No captured JavaScript is ever opened. The references'
  data assets (grammars, word lists, palette values, FTG's building/profession/item tables, textures) are not reused;
  schema ideas are. Fonts: we ship OFL faces of our own choosing (a default serif that is not IM Fell, to keep visual
  distance; IM Fell and Cinzel remain selectable OFL options for users). Algorithm ideas (twisted bisection, the casing
  idiom, straight-skeleton labels, the proposal queue, dependency ratios, lazy people, integer centimetres) are public
  descriptions in the creators' own words and are re-implemented from the measured behaviour.
* **Our licence posture**: proprietary or open later at the owner's choice (J13) — hence permissive dependencies only.

| dependency | licence | use |
|---|---|---|
| `robust-predicates` | MIT | exact orientation / incircle |
| Clipper2 (C++ → WASM) | Boost Software License 1.0 | polygon booleans and uniform offsets |
| `polygon-clipping` | MIT | pure-JS boolean fallback |
| `delaunator`, `d3-delaunay` | ISC | routing lattice, site sampling, Lloyd relaxation |
| `flatbush`, `rbush` | ISC, MIT | spatial indices |
| `simplex-noise` | MIT | noise base (own seeding/fBm/warp) |
| `simplify-js` (optional) | BSD-2-Clause | polyline simplification (own Visvalingam otherwise) |
| `zod` | MIT | schemas |
| `fast-check`, `vitest`, `pixelmatch` | MIT, MIT, ISC | tests |
| `esbuild`, `tsx`, `pnpm` | MIT | build |
| `@napi-rs/canvas` or `resvg-js` | MIT, MPL-2.0 (resvg — file-level copyleft, acceptable for a dev dependency; not shipped) | headless rendering in CI |
| OFL fonts (e.g., EB Garamond, Cinzel, IM Fell as options) | SIL OFL 1.1 | type roles |

Nothing GPL/AGPL/LGPL is linked; CGAL, Boost.Geometry-with-GPL parts and any GPL straight-skeleton code are excluded
(hence the straight skeleton is built in-house, §3.1).

## 18. Alternatives considered for the hard-to-reverse decisions

Each row: the alternative and the one-sentence reason it is rejected.

### 18.1 Spatial truth model — chosen: hierarchical snapped DCEL (§2.2)
1. *MFCG-style Voronoi cell mesh with wards as cells and streets as edges*: rejected because streets become widthless
   cell edges ("an illusion of streets") and every later feature must fight the mesh.
2. *Urban Places-style relaxed quad base mesh with content painted on cells*: rejected because geometry inherits the
   mesh resolution (rivers of cell width, blocks "fixed" afterwards), which the precision tiebreaker forbids.
3. *FTG-style single PSLG with faces recomputed and no hierarchy*: rejected because without a refinement tree, an edit
   or a regeneration cannot be scoped and every level must be re-walked (FTG's "regenerate cannot be undone" is the
   symptom).
4. *A raster/grid world (cellular)*: rejected because plots, walls and streets need exact polygon geometry in metres.

### 18.2 Numeric policy — chosen: integer centimetres + exact predicates + snap rounding (§3.2)
1. *Doubles with epsilon tolerances* (all four references): rejected because it is the source of the recorded failure
   classes and cannot be reproduced across engines.
2. *Exact rational/BigInt arithmetic throughout*: rejected because it is 10–100× slower in JS and the sub-second model
   is a floor; snapping to a lattice gives exactness where it matters (topology) at integer speed.
3. *Fixed-point millimetres*: rejected only on range (a 6 km frame with margin exceeds the comfortable exact-product
   window for incircle in doubles); centimetres are below any visible feature.

### 18.3 RNG and stream design — chosen: xoshiro streams keyed by hashed paths (§6.1)
1. *One global stream* (MFCG/NG/VG): rejected because any added draw reshuffles every map (the creators' own step-image
   divergence, 41103311) and edits cannot be local.
2. *Per-stage streams only*: rejected because re-deriving one entity (a plot, a district) still consumes the stage
   stream in order; per-entity paths are what make scoped regeneration and epochs possible.
3. *Counter-based RNG (Philox/Threefry) indexed by entity id*: a good alternative; rejected only because xoshiro
   streams seeded by a path hash give the same property with simpler code and adequate statistics for this use.

### 18.4 Stack — chosen: TypeScript + WASM Clipper2 (§1.7)
1. *Rust core compiled to WASM with a TS shell*: rejected for the base because it doubles the build surface and slows
   iteration on the many heuristics that must be tuned by eye; the kernel is small enough in TS with typed arrays, and
   a Rust port of `@plat/kernel` later is not precluded by the interface.
2. *C++/CGAL desktop core*: rejected (GPL, not browser-first).
3. *Pure JS with float geometry and a JS clipper*: rejected (numeric policy).

### 18.5 Display-list design — chosen: semantic, LOD-banded, renderer-independent (§8.1)
1. *Immediate-mode drawing inside each backend*: rejected because screen, SVG and print would be three code paths
   (MFCG's "all the drawing needs to be implemented two times").
2. *The SVG DOM as the scene graph*: rejected because 40 000 buildings in a DOM is too slow to pan and the WebGL tier
   needs typed arrays.
3. *Vector tiles baked at fixed zooms*: rejected as the primary model because edits must redraw locally in < 100 ms;
   kept as the export/print path.

### 18.6 Layout fusion — chosen: routed backbone + grown secondary + bent-cut infill (§4.5)
Alternatives 1–4 and their rejections are written in §4.5.

## 19. Delegated decisions (owner deferred all judgment; each vetoable)

| id | decision | rationale | cost of reversal |
|---|---|---|---|
| K1 | Integer centimetres centred on (0, 0), `+y` north | FTG's proven convention; exactness | low before M1; the document format changes |
| K2 | Five refinement levels, one DCEL type | locality of edits and regeneration; invariants per level | high after M1 (every stage writes to a level) |
| K3 | Clipper2 via WASM as the boolean/offset engine with a pure-JS fallback | integer-native, proven; fallback keeps the library dependency-light | low (wrapper interface) |
| K4 | Straight skeleton built in-house with typed fallbacks | no permissive mature library; roofs and labels need it | medium (spike in M0) |
| K5 | Deterministic in-house math library for transcendental functions | cross-platform hashes | low |
| K6 | Streams keyed by hashed paths (xoshiro128**) | O2; scoped regeneration; epochs | high after M1 (every draw site) |
| K7 | Routed arterials between named destinations + grown secondary streets + bent-cut infill | fusion thesis, tiebreaker, evolution hook | high (the layout core); M0 measures it first |
| K8 | Frontage-first plots replace recursive random cuts for plots; bent cuts stay for block fabric | O5 evidence; the NG signature preserved where it is charm | medium |
| K9 | Districts are grown groups of coarse blocks typed by a data scorer | MFCG legibility with FTG objects; containment 100 % | medium |
| K10 | Enceinte = growth-stage boundary snapped to terrain/water; gates at arterials | O8; FTG staging + MFCG gate identity | low |
| K11 | Roster/context vector/assignment/lazy people in the base; schedules/calendar/factions' meetings/events in `@plat/sim` | J-S of IMPROVEMENTS; the map does not wait for the sim | low |
| K12 | Default look `ink`, second `lit`, `hatched` as the stage-2 tier; a non-IM-Fell OFL default face | owner J10; clean-room distance in look | low |
| K13 | Terrain resolution by size class (5/8/10 m) and a context margin of 30 % per side | O1/O14; cost | low |
| K14 | Budgets: TOWN 100 ms, CITY 300 ms, METROPOLIS 1 s model (p95) | references' bars; one-click floor | low (numbers), medium (architecture if missed at M0) |
| K15 | The walled stage's share of buildings ≈ 0.35–0.5 as a preset for the era default | high-to-late medieval Western Europe (J11) | low |
| K16 | Shadows off by default with a fixed sun; heights always populated | owner: optional shadows, heights now | low |
| K17 | glTF for 3-D export (CityJSON-style as an option) | widest tool support; heights already in the model | low |

## Appendix A — what was read for this proposal

Read in full (every line): `research/findings/_critic.md` (479 lines), `_critic-os.md` (435), `_critic-ftg.md` (256),
`_critic-vg-ng.md` (227); `docs/CONFIDENCE.md` (801); `docs/IMPROVEMENTS.md` (1 940); `docs/confidence/ftg.md` (337).
Read in full except the noted ranges: `docs/confidence/mfcg.md` lines 1–479 and 644–706 (§0–§2.C, §3 verdict, §4
unknowns; not read: §2.D–§2.H rows 480–643, §5–§6 — their ruled values were taken from `docs/CONFIDENCE.md` §3.1/§4.1);
`docs/confidence/ng.md` lines 1–475 and 650–725 (§0–§2.C to C7, §3 verdict, §4 effort, §5 unknowns; not read: C7 end to
§2.H rows 476–649, §6–§7 — ruled values from `docs/CONFIDENCE.md` §3.3/§4.3). `docs/confidence/vg.md`: heading outline
and the §4 summary table only (VG is a not-precluded check).

Section outlines (`grep -n '^#'`) read for every findings file: os-geometry, os-model, os-wards-render, mfcg-posts-a/b,
mfcg-devlogs-a/b, vg-posts-a/b, vg-ng-devlogs, ftg-posts-a/b/c, ftg-docs-params, ftg-payload-visual, profile-mfcg,
profile-village, profile-neighbourhood, visual-spec, watabou-extra-a/b, manor.

Sections read in full after the ≈350k-token switch point (line ranges of the findings files):
`visual-spec.md` 1–284 (§0 recordings, coordinate spaces, casing rule; §1 MFCG), 427–513 (§3 NG), 514–625 (§4 FTG),
626–721 (§5 comparison, §6 renderer feature list, §7 open questions); `os-geometry.md` 63–186 (§1 invariants), 275–366
(§2.1.4 inset operators), 513–561 (§2.2.1 Voronoi driver), 828–913 (§4 robustness, §5 replacements, §6 open questions);
`os-model.md` 1024–1142 (§11 retry loop and throws, §12 failure modes, §13 bugs); `profile-mfcg.md` 101–146 (§3 pipeline),
256–318 (§4.9 buildGeometry, bisector counts, `filterInner`/`indentFronts`), 437–458 (§7.1 cost model), 752–767 (§11
failure modes), 2099–2118 (ST-8 whole-city restart); `profile-neighbourhood.md` 1606–1678 (BG-2 measured bent-cut
construction), 1706–1728 (BG-4 re-implementer recipe), 1827–1878 (PF-3 OBB-axis and midpoint-corner results);
`ftg-docs-params.md` 91–262 (§1.2–§1.4 layout/suburb parameters, §2.1–§2.8 reconstructed road algorithm, districts,
plots, suburb, outer settlement); `watabou-extra-a.md` 64–160 (§2.1 bent bisection, §2.2 perpendicular lots, start of
§2.3); `watabou-extra-b.md` 59–92 (T1 bisection with holes), 525–627 (T23 Urban Places base mesh, T24 streetwall from a
frontage band); `manor.md` 82–191 (§2 composition grammar), 192–233 (§3 plan vs plot), 234–278 (§4 diversity and size
classes), 294–312 (§6 performance and determinism), 359–400 (§9 re-implementer page).

Not read (relied on through the critic rulings, `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`, all of which read them
in full): the remaining sections of the findings files listed above, the raw `post.md` bodies, the capture `report.md`
files (numbers were taken from the findings, which quote them), and — by ruling — any captured JavaScript bundle.
Capture READMEs consulted by pointer only: `research/ftg-capture/roadlength100/README.md` (via `_critic-ftg.md` and
`docs/confidence/ftg.md`).

**CONFIRMED vs PLAUSIBLE, in one sentence.** Every reference number in §13.5 and every quoted failure in §1.2/§3.5 is
CONFIRMED in the cited findings (executed measurements or verified quotations); every mechanism, constant, budget,
estimate and decision in this proposal is PLAUSIBLE until M0's spike measures it.
