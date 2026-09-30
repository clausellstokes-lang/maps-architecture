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

