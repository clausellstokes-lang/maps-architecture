# Formation, climate, ecology, sailing and cartography for a procedural world — the science

> Provenance: written by Opus 5.5 under the Fable manager (docs/PROGRESS.md J392's model ruling); read and validated by the Fable design and critic seats of the same pass.

## PROGRESS ledger (ticked as each topic lands)

- [x] 0 Conventions: marks, cost basis, the grid sizes against V13's rungs
- [x] 1 Kinematic plate models on a bounded flat map
- [x] 2 Fluvial, hillslope and glacial erosion; sea-level history
- [x] 3 Soil formation as a small classification
- [x] 4 Climate on a latitude box (temperature, wind belts, monsoons, ocean currents, precipitation, downwind reach)
- [x] 5 Köppen–Geiger as data, and potential natural vegetation
- [x] 6 Campaign-time land cover (fields, catchments, succession, disturbance recovery)
- [x] 7 Urban stratigraphy (debris rates, overlying settlements, buried extent)
- [x] 8 Sailing (polars, currents, leeway and tacking, coast versus open water, seasons, passage anchors)
- [x] 9 Historical cartography and the warping algorithms
- [x] 10 Tiled world growth (halos, one-way boundary conditions, multi-resolution seams)
- [x] 11 Budget roll-up against V13 §6
- [x] 12 Sources

---

## 0 Conventions

**What this file is.** A survey of published science, in our own words, for the optional FORMATION step (J390 F1: run once,
bake, delete), the LIVING PHYSICS that stays (J390 F2/F3: climate, currents, hydrology, potential vegetation),
CAMPAIGN-TIME ECOLOGY (J390), UNDERLYING RUINS by settlement age (J390 F3), SEA ROUTES by current and wind (J391 F4), the
relational map style (J392 F10) and the stitched, user-arranged world map with continuation into voids (J392 F11–F15).
It designs nothing; it states what the science says, what the standard computation costs, which knobs exist, which
real-world numbers calibrate them, and whether each process can be baked or must stay live. V13 (§3.2–§3.6) is read as
the thing already built: a recipe of terrain ops, a coarse-grid wind-march precipitation model, a temperature × precipitation
biome matrix, D8 hydrology with priority flood on integer-centimetre rasters, three size rungs.

**Marks.** Every number carries one mark.

| mark | meaning |
|---|---|
| CONFIRMED [W] | a source states it, and this pass read that statement (web search result or a fetched page) |
| CONFIRMED [K] | a named source states it to the author's knowledge; not re-read in this pass (the reader may wish to verify before it becomes a default) |
| PLAUSIBLE | the author's estimate, a derivation from confirmed numbers (the arithmetic shown), or a range in common use with no single source checked |

**What could and could not be fetched.** WebSearch worked throughout. WebFetch failed on every host tried (DNS
resolution error inside the tool); plain `curl` through the session proxy worked, and two primary texts were read whole
that way: Casson (1951) *Speed under sail of ancient ships* (TAPA 82, the LacusCurtius transcription) and Peel, Finlayson
& McMahon (2007) *Updated world map of the Köppen–Geiger climate classification* (HESS 11, the PDF, Table 1). Not
fetched (paywalled or not attempted): Braun & Willett (2013), Cortial et al. (2019), Gastner & Newman (2004), Dougenik
et al. (1985), Rosen (1986), Chisholm (1962), Pryor (1988), Van Duzer (2013); their content below is from search
abstracts [W] or from knowledge [K].

**Cost basis.** Single-threaded TypeScript over typed arrays in a worker, the same basis as V13 §6's laws (W2 ≤ 25 ns per
cell, W4 ≈ 120 ns per cell with the queue). A streaming pass with a few arithmetic operations per cell costs 3–10 ns per
cell; a pass with eight-neighbour reads 10–30 ns; a heap-ordered pass 50–150 ns; an FFT of N points about 5 N log₂ N
ns (PLAUSIBLE, all four; SP-W1-style spikes would measure them). Memory is stated per cell in bytes and then for the two
reference grids the task names:

| grid | cells | 1 byte/cell | 4 bytes/cell (Float32/Int32) | what V13 rung is near it |
|---|---|---|---|---|
| 1 000 × 1 000 | 1.0 M | 1 MB | 4 MB | `province` fine grid (1 280 × 800 = 1.02 M at 250 m) |
| 4 000 × 4 000 | 16 M | 16 MB | 64 MB | beyond `continent` fine (3 840 × 2 400 = 9.2 M at 1 km); 16 M at 4 bytes × 5 arrays already uses 320 MB, over V13's 300 MB line |

The arithmetic matters for every topic: **at 4 000 × 4 000 any process holding five or more Float32 arrays breaks
V13's 300 MB working-set line on its own** (PLAUSIBLE; 5 × 64 MB = 320 MB). The formation step therefore wants a
*formation grid* coarser than the fine grid (V13's coarse grid, 8 × 8 blocks, is 16 k / 64 k / 144 k cells at the three
rungs) with the result upsampled and detailed, which is also what the procedural-terrain literature does (Cordonnier et
al. 2016 erode a graph of tens of thousands of nodes and then blend landform kernels; Cortial et al. 2019 run plates on
a sphere sampling of about 500 k points and amplify after) — CONFIRMED [W] for the method shape, PLAUSIBLE for the
counts.

**Baked versus live, as used below.** *Bake*: the process runs once (formation, or the "weather" depth of
let-physics-pass-again, J390), its outputs become ordinary editable data (dem, bedrock, soils, named landforms), its state
is deleted. *Live*: a pure function of current data re-derived on every edit with a dirty set (V13's locality, §4.3).
*Dated*: a pure function of current data plus dated host facts and DM events (campaign-time ecology), never stepped
forward by a clock of its own.

## 1 Kinematic plate models for procedural terrain on a bounded flat map

### 1.1 The physical idea

The lithosphere is broken into rigid plates that move over the asthenosphere. Relief is made at the plate boundaries
and inherited long after a boundary dies:

- **Crust types.** Continental crust is thick and light (average 35–40 km, up to about 70 km under Tibet; density about
  2.7–2.8 g/cm³), oceanic crust thin and dense (6–7 km; 2.9–3.0 g/cm³) over a mantle of about 3.3 g/cm³ — CONFIRMED [K]
  (any physical geology text; Turcotte & Schubert, *Geodynamics*, 3rd ed. 2014). By isostasy the surface is bimodal:
  continents stand high, ocean floors low (Earth: about 29 % land, mean land height about 840 m, mean ocean depth
  about 3 700 m, shelf break at about 130–200 m depth) — CONFIRMED [K].
- **Ocean-floor depth by age.** New sea floor at a ridge stands at about 2.5 km depth and sinks as it cools:
  d(t) ≈ 2 500 + 350 √t m for t in Myr up to about 70 Myr, flattening after (Parsons & Sclater 1977) — CONFIRMED [K].
  The oldest ocean floor is about 180–200 Myr — CONFIRMED [K]. This one formula gives a generated ocean its abyssal
  plains, ridges and the deep old floor near passive margins without any hand-tuning.
- **Divergent boundaries.** In an ocean, a mid-ocean ridge: crest about 2–3 km above the abyssal plain, flanks
  1 000–4 000 km wide, the global ridge about 65 000 km long — CONFIRMED [K]. On a continent, a **rift**: a graben
  30–100 km wide flanked by uplifted shoulders up to about 2 km (East African Rift) that, if it keeps opening, becomes a
  narrow sea (Red Sea) — CONFIRMED [K] for the East African figures' order, PLAUSIBLE for the exact range.
- **Convergent boundaries.** Ocean under continent (Andes): a trench 6–11 km deep (Challenger Deep about 10.9 km), a
  forearc, then a **volcanic arc** above where the slab reaches about 100 km depth (72–173 km, mean about 105 km;
  Syracuse & Abers 2006), typically 150–300 km from the trench, and a range up to about 7 km (Aconcagua 6 961 m) —
  CONFIRMED [K]. Ocean under ocean: an island arc (Marianas, Aleutians). Continent against continent (Himalaya): no
  subduction once both are buoyant; crust thickens, a range up to 8.8 km and a plateau about 5 km high and up to 1 000 km
  wide behind it — CONFIRMED [K]. A foreland basin 100–300 km wide forms in front of the range by flexure — PLAUSIBLE.
- **Transform boundaries.** Plates slide past each other; little relief, a straight fault valley, offset rivers and
  ridges (San Andreas); in oceans fracture zones that offset ridges by tens to hundreds of km — CONFIRMED [K].
- **Hotspots.** Mantle plumes fixed (roughly) beneath moving plates make age-progressive chains; about 40–50 are commonly
  listed, of which a handful are deep primary plumes (Courtillot et al. 2003 list 49) — CONFIRMED [K]. The Hawaiian swell
  is about 1–1.5 km high and about 1 000 km across; the Hawaii–Emperor chain about 6 000 km long over about 80 Myr —
  CONFIRMED [K].
- **Speeds.** Plates move 10–100 mm/yr relative to each other; the fastest spreading (East Pacific Rise) about 150 mm/yr
  full rate, the slowest ridges (Southwest Indian) about 14 mm/yr — CONFIRMED [K] (DeMets et al. 2010, MORVEL).
- **How many plates.** Seven major plates, about eight secondary, dozens of microplates; Bird's (2003) model PB2002 has
  52 — CONFIRMED [K]. The boundary density follows: about 65 000 km of ridge plus about 55 000 km of trench plus transforms
  and diffuse boundaries over 510 M km² gives roughly **0.3–0.5 km of active boundary per 1 000 km²** (PLAUSIBLE,
  arithmetic from the confirmed lengths). A V13 `realm` (1 280 × 800 km ≈ 1.0 M km²) therefore holds on average
  300–500 km of active boundary — one boundary, perhaps none; a `continent` rung (9.2 M km²) holds a few. Earth's relief
  is also made by **dead** boundaries: old sutures and orogens (Urals, Appalachians, Caledonides) keep worn mountains for
  hundreds of Myr. A believable generated realm needs relict structure more than it needs live plates.

### 1.2 The standard computational methods

**Iterative crustal simulation (the "platec" family).** Viitanen's 2012 bachelor's thesis built a heightmap generator
that splits a fractal terrain into plates, moves each plate's heightmap per step, and at collisions transfers crust
from the denser to the overriding plate (folding it up); the code was released under GPLv3 and later used by the
WorldEngine project — CONFIRMED [W] for the method shape (the GameDev.net thread describing it), CONFIRMED [K] for
WorldEngine. It is a time-stepped simulation: hundreds of steps, each touching every cell, with mass bookkeeping.

**Boundary-driven procedural plates (the graphics literature).** Cortial, Peytavie, Galin & Guérin (2019), *Procedural
Tectonic Planets* (Computer Graphics Forum 38(2), Eurographics 2019): plates on a sampled sphere, user-steerable motion,
subduction and continental collision approximated by uplift functions of distance to the front, relative speed and
elevation, rifting as a user-triggered event, ridges created where plates separate; the crust model carries type, age,
thickness and fold direction; detail is added afterwards by blending procedural or real elevation exemplars — CONFIRMED
[W] (the abstract). Earlier: Michel, Emilien & Cani (2015) generate folded terrain from simplified plate collision on
vector maps — CONFIRMED [W]. The widely read hobbyist write-up (Gainey 2014, Experilous planet generator, [K]) computes
at each boundary a *pressure* (relative velocity along the boundary normal) and a *shear* (along the tangent), classifies
the boundary by which dominates and its sign, and writes elevation by a distance falloff from the boundary whose shape
depends on the class and the two crust types — the simplest complete kinematic recipe.

**The kinematic recipe on a bounded flat map (synthesis; each step is standard):**

1. **Seed plates.** N seeds by blue-noise (Poisson-disc) placement; grow regions by a randomized multi-source flood
   fill (each frontier cell's priority = distance × (1 + jitter)), which gives irregular, non-convex plates; a plain
   Voronoi gives convex polygons that read as artificial. Cost O(N log N) with a heap, O(N) with bucketed priorities.
2. **Assign crust.** Each plate gets a continental fraction; continental crust is placed as one or more blobs inside
   chosen plates (a continent may straddle a boundary, which is how a suture or a rift inside a continent arises).
   Crust age for oceanic cells comes from distance to the nearest divergent boundary divided by the half-spreading rate
   (which then feeds Parsons–Sclater depth).
3. **Assign motion.** On a flat map a rigid motion is a translation plus a rotation: v(p) = v₀ + ω ẑ × (p − c). Speeds
   drawn in 10–100 mm/yr; rotations sized so no point of the plate exceeds about 150 mm/yr — CONFIRMED [K] bounds.
4. **Classify boundaries.** For each boundary cell pair (a, b) with unit normal n from a to b: closing speed
   c = (v_a − v_b)·n, shear s = |(v_a − v_b)·t|. Convergent if c > c₀, divergent if c < −c₀, transform if |c| ≤ c₀ and
   s > s₀ (c₀, s₀ a few mm/yr). Sub-classify convergent by the two crust types (ocean–ocean, ocean–continent,
   continent–continent) and, for subduction, by which side sinks (the older, denser oceanic side; or the oceanic side
   against a continent).
5. **Distance fields.** A two-pass Euclidean distance transform (the same function V13 §3.5.5 already uses) from each
   boundary class, signed by side, so each cell knows "212 km on the overriding side of a subduction front".
6. **Uplift and subsidence by profile.** Elevation (or, better, an **uplift-rate field** for the erosion step, §2) is a
   sum of profile functions of the signed distance, scaled by closing speed:

   | boundary | profile across the boundary (overriding side positive) | width | height or depth |
   |---|---|---|---|
   | ocean–continent subduction | trench at 0; forearc high at 50–100 km; arc peak at 150–300 km; back-arc plateau or basin beyond | 300–700 km | trench −6 to −8 km; arc and range 3–7 km |
   | ocean–ocean subduction | trench at 0; island arc at 100–200 km | 200–300 km | trench −6 to −11 km; arc islands 0.5–3 km above sea |
   | continent–continent collision | range centred 50–150 km on the overriding side; plateau behind; foreland basin in front | 300–1 000+ km | range 4–8.8 km; plateau 3–5 km; basin −0.5 km relative |
   | oceanic ridge | Parsons–Sclater depth from age; axial valley at slow ridges | 1 000–4 000 km | crest −2.5 km |
   | continental rift | graben −0.5 to −1.5 km between shoulders +1 to +2 km | 30–100 km | as stated |
   | transform | a narrow linear valley, offset of features | 5–20 km | ±0.1–0.5 km |
   | hotspot | Gaussian swell + volcano at the plume; chain of decaying, subsiding edifices along −v | swell 500–1 200 km | swell 1–1.5 km; edifice to 4 km above floor |

   Heights and widths CONFIRMED [K] for the Earth anchors named in 1.1; the profile shapes are PLAUSIBLE (the shape of
   Cortial 2019's and Gainey's falloffs, not their constants).
7. **Relict structure.** Old sutures (where two continental blobs were joined in an earlier, unsimulated cycle) are
   drawn as worn ranges: the collision profile at 10–30 % height and 1.5× width — PLAUSIBLE.
8. **Bake.** Outputs: initial elevation (or uplift rate), crust type, a **bedrock/geology class** per cell (volcanic arc
   andesite, ridge basalt, granite batholith behind an arc, folded sedimentary in a collision belt, rift basalts and
   evaporites, old shield), and named landforms (the arc, the trench, the rift, the suture, the hotspot chain). These
   feed V13's `geology` raster (W4's permeability, W5's resource rules) and §3's soils. The plate ids, velocities and
   distance fields are deleted.

### 1.3 What to do at the map edge

A bounded map cuts plates. The choices in use:

| option | what happens | when it is right |
|---|---|---|
| **Phantom plates** (seed plates outside the extent in a margin ring, 0.5–1 plate-diameters wide, classify their boundaries normally, crop) | boundaries crossing the edge are classified correctly; an arc whose trench lies off-map still raises its range on-map | the default for any map that may later get neighbours (§10): the phantom plates are exactly what a neighbour generated later must continue |
| Torus wrap | plates wrap; seamless | a whole-world map only; wrong for a realm (it implies the east coast's plate is the west coast's) |
| Free edge | cells at the edge have no partner; no boundary is created | acceptable when the edge is masked to ocean (V13's `edgeFade`) |
| Ocean mask | everything within a margin is pushed to abyssal depth | an island-continent template; hides the problem |

The phantom-plate margin is the plate-scale **halo** of §10: it is the one piece of formation state that a later
neighbour needs, and it is small (seed positions, velocities, crust fractions: a few hundred bytes per plate).
PLAUSIBLE (design synthesis).

### 1.4 Cost

| method | time per cell | memory per cell | 1 000 × 1 000 | 4 000 × 4 000 |
|---|---|---|---|---|
| kinematic, one shot (flood seed, classify, two distance transforms, profiles) | ≈ 100 ns (flood 20–40, classify 5, EDT 2 × 15, profiles 20–30) | plate id 2 B, crust type 1 B, crust age 4 B, distance 4 B, uplift 4 B ≈ 15 B | ≈ 0.1 s; 15 MB | ≈ 1.6 s; 240 MB (over the line with anything else resident: run on the coarse grid) |
| same on V13's coarse grid (8 × 8 blocks) | as above | as above | 16 k cells: < 2 ms | 250 k cells: ≈ 25 ms |
| iterative crust simulation (platec-like, 200–500 steps, each moving and colliding every cell) | 30–80 ns per cell per step | 20–30 B (two height buffers, mass, age, plate id) | 6–40 s; 25 MB | 100–640 s; 400 MB (infeasible in a worker inside budget) |

All PLAUSIBLE (per-operation costs from §0's basis). The kinematic method is O(N) and costs about what one V13 W2 pass
costs; the iterative one is a different budget class entirely.

### 1.5 Controllable parameters

Plate count (or mean plate area); continental fraction (Earth about 0.4 of the surface is continental crust including
shelves, about 0.29 above sea — CONFIRMED [K]); speed range; the share of boundaries convergent / divergent / transform;
hotspot count and placement; relict-suture count and age; edge policy (phantom margin width); sea-level datum (sets how
much continental shelf is drowned); and a **drama** multiplier on boundary density (a game may want more boundaries
than Earth's 0.3–0.5 km per 1 000 km²; the designer should know the multiplier exists and that Earth's value is low).

### 1.6 Calibration table

| quantity | Earth anchor | mark |
|---|---|---|
| plate speed | 10–100 mm/yr; max ≈ 150 mm/yr full spreading | CONFIRMED [K] |
| continental crust thickness / density | 35–40 km (to 70) / 2.7–2.8 g/cm³ | CONFIRMED [K] |
| oceanic crust thickness / density | 6–7 km / 2.9–3.0 g/cm³ | CONFIRMED [K] |
| ridge crest depth; depth–age law | ≈ 2 500 m; + 350 √t m (t Myr ≤ 70) | CONFIRMED [K] |
| mean land height / mean ocean depth | ≈ 840 m / ≈ 3 700 m | CONFIRMED [K] |
| arc–trench gap | 150–300 km (slab depth under arc ≈ 105 km mean) | CONFIRMED [K] |
| trench depth | 6–11 km | CONFIRMED [K] |
| highest collision peak / plateau | 8.8 km / ≈ 5 km, ≈ 1 000 km wide | CONFIRMED [K] |
| rift width / shoulder height | 30–100 km / to ≈ 2 km | PLAUSIBLE (East African order CONFIRMED [K]) |
| hotspot swell | 1–1.5 km high, ≈ 1 000 km wide | CONFIRMED [K] |
| boundary density | 0.3–0.5 km per 1 000 km² | PLAUSIBLE (derived) |
| Airy root under a range of height h | ≈ 4.5–6 × h (ρc/(ρm − ρc)) | CONFIRMED [K] formula; PLAUSIBLE ratio range |

### 1.7 Run once and bake, or live

**Bake.** Plates are the paradigm of J390 F1: they run once, write uplift (or elevation), bedrock and named landforms,
and are deleted. Nothing in the campaign moves plates. Two things survive as data because later processes need them:
the **geology class** (permeability, soils, resources, volcano placement) and the **phantom-plate margin** (a neighbour
generated later continues it, §10). Hotspot volcanoes and arc volcanoes may survive as named landforms that the DM can
mark active (an eruption is then a dated DM event, §6), but no plate state is kept to drive them.

## 2 Fluvial, hillslope and glacial erosion; sea-level history

### 2.1 Fluvial erosion by the stream-power law

**The physical idea.** Bedrock rivers cut down at a rate that grows with discharge (proxied by upstream drainage area A)
and channel slope S; the land rises by tectonic uplift U. The **stream-power law**:

  ∂z/∂t = U − K A^m S^n  (+ D ∇²z, §2.2)

- The ratio θ = m/n (the **concavity**) is 0.35–0.6 in most landscapes, typically about 0.45; n is commonly taken as 1,
  though field studies often find n > 1 — CONFIRMED [K] (Whipple & Tucker 1999, JGR 104; Kirby & Whipple 2012, J.
  Struct. Geol.; Harel, Mudd & Attal 2016, Geomorphology).
- At steady state (uplift balanced by erosion) slope and area obey **Flint's law** S = k_s A^(−θ) with the steepness
  k_s = (U/K)^(1/n); higher uplift or weaker rock gives steeper channels — CONFIRMED [K].
- K (erodibility) spans orders of magnitude with rock strength and climate; for m = 0.5, n = 1 it lies roughly in
  10⁻⁷–10⁻⁴ yr⁻¹ — PLAUSIBLE (Stock & Montgomery 1999, JGR 104, report a wide range; the exact bounds are not re-read).
- The **response time** of a fluvial landscape to a change in uplift is about 1–10 Myr — CONFIRMED [K] (Whipple 2001).
- Network statistics a generated river system should honour: Hack's law, main-stream length L ∝ A^h with h ≈ 0.5–0.6
  (Hack 1957: L = 1.4 A^0.6 in miles); Horton–Strahler bifurcation ratio 3–5 — CONFIRMED [K]. These are tests, not
  inputs.

**The standard computational method: Braun & Willett (2013).** *A very efficient O(n), implicit and parallel method to
solve the stream power equation governing fluvial incision and landscape evolution* (Geomorphology 180–181: 170–179) —
CONFIRMED [W] (citation). The algorithm per time step:

1. **Receivers.** Each node's receiver is its steepest-descent neighbour (D8 on a grid; on a mesh, any graph) — the same
   operation as V13 §3.5.1's `flowDir`.
2. **Stack.** Invert receivers into donor lists, then order all nodes by a depth-first traversal from each base-level
   node (outlet) so that every node appears after its receiver. O(N).
3. **Accumulate.** Walk the stack in reverse adding each node's area to its receiver's — V13 §3.5.2's `flowAccum`, in
   one pass, O(N).
4. **Implicit update.** Walk the stack forward (receivers first): with n = 1,
   z_i(t+Δt) = [z_i(t) + Δt U_i + F_i z_r(t+Δt)] / (1 + F_i), F_i = K Δt A_i^m / Δx_ir.
   The receiver's new height is already known, so each node is one division. For n ≠ 1 a few Newton iterations per
   node. Unconditionally stable for n = 1: the time step is limited by accuracy, not stability; the steady state is
   exact for any Δt, transients are Δt-dependent (Landlab's FastscapeEroder documentation, citing the paper's
   Appendix B) — CONFIRMED [W].

**Depressions.** A raw dem has pits; receivers must route through them or the stack ends in a pit. Three standard
answers: fill every depression first by **priority flood** (Barnes, Lehman & Mulla 2014, Computers & Geosciences; O(N log N),
O(N) on integer heights with ε-ordering — CONFIRMED [K]); or route across depressions without filling by linking basins
through their lowest pass points as a minimum spanning tree over the basin graph (Cordonnier, Bovy & Braun 2019, *A
versatile, linear complexity algorithm for flow routing in topographies with depressions*, Earth Surface Dynamics 7 —
CONFIRMED [K]); or keep lakes as flats at their spill height (what V13 W2/W4 already do). **V13 already owns the pieces**:
priority flood, flat resolution, D8 in a fixed neighbour order, accumulation, lakes by spill height (§3.3, §3.5). The
formation step's per-step drainage tree is the same function on the formation grid; only the stack (an O(N) ordering)
and the implicit update are new.

**Successors.** Yuan et al. (2019, JGR Earth Surface) add sediment deposition while keeping the implicit O(N) scheme
— CONFIRMED [K]. Hergarten (2020, Earth Surface Dynamics) treats transport-limited erosion — PLAUSIBLE (title not
re-read). The FastScape library (Braun, Bovy) packages the method — CONFIRMED [K]. In graphics: Cordonnier et al.
(2016), *Large Scale Terrain Generation from Tectonic Uplift and Fluvial Erosion* (CGF 35(2)) — a user-painted uplift
map, a stream graph over the domain carrying elevation and flow, the stream-power law, then landform kernels blended
into a dem; the first graphics method to combine uplift and hydraulic erosion — CONFIRMED [W]. Cordonnier et al.
(2017, SIGGRAPH) couple ecosystem and erosion — CONFIRMED [K]. Schott, Paris, Fournier, Guérin & Galin (2023), *Large-scale
Terrain Authoring Through Interactive Erosion Simulation* (ACM TOG, SIGGRAPH 2023): the user paints uplift, ridges
emerge where uplift is high, a fast approximation of drainage area and flow routing keeps the stream-power simulation
interactive on the GPU; code public (github.com/H-Schott/StreamPowerErosion) — CONFIRMED [W]. A 2024 Eurographics paper
(Tzathas et al., *Physically-based analytical erosion for fast terrain generation*) derives analytical solutions of
uplift-versus-stream-power competition for fast large-scale generation — CONFIRMED [W] (the method), [K] (the author
attribution).

**The steady-state shortcut (the cheapest correct answer).** At steady state with n = 1, slope along each flow path is
S_i = (U_i/K_i) A_i^(−m) (Flint's law), so elevation is a single integral from the outlet upstream:
z_i = z_r + Δx_ir (U_i/K_i) A_i^(−m). Given a drainage tree this is one O(N) stack walk. Because the tree depends on z,
iterate: build tree → integrate → rebuild tree; it converges in a handful of iterations (5–15) because the tree changes
only at divides — PLAUSIBLE (the fixed-point idea underlies Cordonnier 2016's graph method and the analytical-erosion
line of work; the iteration count is the author's estimate). This produces a fully dendritic, Hack-respecting relief
from an uplift map in time comparable to V13's W4.

**Cost.**

| method | time per cell per step | memory per cell | 1 000 × 1 000 | 4 000 × 4 000 |
|---|---|---|---|---|
| receivers + stack + accumulation + implicit update (fill excluded) | 40–70 ns | z 4, receiver 4, stack 4, area 4, donor CSR ≈ 8, U 4, K 4 ≈ 32 B | 1 step ≈ 0.05 s; 200 steps ≈ 10–14 s; 32 MB | 1 step ≈ 0.9 s; 200 steps ≈ 130–220 s; 512 MB (infeasible) |
| + depression handling per step (priority flood on Int32 heights, or basin-graph MST) | + 50–120 ns | + 4–8 B | + 10–24 s over 200 steps | + 160–380 s |
| steady-state fixed point (10 iterations × tree + integrate) | ≈ 100–150 ns per iteration incl. routing | ≈ 32 B | ≈ 1–1.5 s | ≈ 16–24 s; 512 MB |
| any of the above on V13's coarse grid (16 k / 64 k / 144 k cells) | as above | as above | province 16 k: transient 200 steps ≈ 0.4 s; fixed point ≈ 25 ms | continent 144 k: transient ≈ 3.5 s; fixed point ≈ 0.2 s |

All PLAUSIBLE from §0's basis. The design consequence: **a transient multi-step simulation at the fine grid of any rung
is out of budget; the steady-state fixed point on the coarse or a 2–4× finer-than-coarse formation grid, followed by
amplification (V13's `noise` op, position-keyed), is inside it.** The number of steps a transient run needs: with
Δt = 10⁴–10⁵ yr and a 1–10 Myr response time, 100–1 000 steps (PLAUSIBLE).

**Controllable parameters.** U field (from §1, or painted, which is Cordonnier/Schott's authoring model and maps cleanly
onto "a painted biome is always-so"); K per rock class (from §1's geology); m and n (θ); the duration (or "steady
state"); base level (sea level, §2.4); the channel-initiation area (below it, hillslope processes dominate; on a 500 m
grid, every cell is a channel cell in practice); precipitation-weighted area (A replaced by Σ runoff, coupling climate:
wetter sides of ranges erode faster).

**Calibration.**

| quantity | anchor | mark |
|---|---|---|
| concavity θ = m/n | 0.35–0.6, typical 0.45 | CONFIRMED [K] |
| slope exponent n | ≈ 1 (often 1–2 in field data) | CONFIRMED [K] |
| uplift rate | 0–0.1 mm/yr cratons; 1–3 mm/yr active margins; 5–10 mm/yr Himalaya, Taiwan, Southern Alps | CONFIRMED [K] |
| erosion rate | 0.01–0.1 mm/yr stable; ≥ 1 mm/yr active orogens; up to ≈ 10 mm/yr | CONFIRMED [K] order |
| response time | 1–10 Myr | CONFIRMED [K] |
| Hack exponent h | 0.5–0.6 | CONFIRMED [K] |
| bifurcation ratio | 3–5 | CONFIRMED [K] |

**Bake or live.** **Bake.** Fluvial erosion over geological time is formation; it writes the dem, the incised valley
network (which V13 W4 then re-derives as D8 rivers — they will agree because the dem was carved by the same tree), and
named landforms (gorges where U is high, wide valleys where K is high). The "weather" depth of let-physics-pass-again
(J390) re-runs the same solver over the *current* dem for a DM-chosen span with **U = 0** (no tectonics remains) and
bakes again. A useful bound for that depth: at 0.1 mm/yr for 10 kyr the land lowers about 1 m — a campaign-scale
"weather" pass changes almost nothing fluvially unless the span is 10⁵–10⁶ yr (PLAUSIBLE, arithmetic). The DM should
be told that.

### 2.2 Hillslope (thermal) diffusion

**The physical idea.** Soil creep, rain splash and slope wash move material downslope at a rate proportional to slope
(linear diffusion), steepening to a threshold where landsliding takes over (nonlinear diffusion):
q = −D ∇z / (1 − (|∇z|/S_c)²) (Roering, Kirchner & Dietrich 1999, Water Resources Research 35) — CONFIRMED [K].
Measured D is about 10⁻³–10⁻² m²/yr (Roering et al. 1999: about 0.003 m²/yr, S_c about 1.25 in the Oregon Coast
Range) — CONFIRMED [K]. Graphics "thermal erosion" (Musgrave, Kolb & Mace 1989, SIGGRAPH) is the same idea as a
talus-angle relaxation: material moves from a cell to lower neighbours where the slope exceeds the talus angle (about
30–40°; angle of repose of dry gravel about 34–37°) — CONFIRMED [K].

**Method.** Explicit finite differences (stable for Δt ≤ Δx²/(4D)) or implicit (ADI, or a few multigrid cycles). At a
500 m cell and D = 0.01 m²/yr the explicit limit is 6.25 × 10⁶ yr — diffusion is never the stiff part at map scales
(PLAUSIBLE, arithmetic). At such cells diffusion barely acts: its length scale √(D t) over 10 Myr is about 300 m — less
than one cell. **At the map's resolution, hillslope diffusion is a sub-grid process; the talus relaxation is the one
that matters** (it removes cliffs the 500 m grid cannot hold) (PLAUSIBLE, arithmetic).

**Cost.** 5-point stencil 5–10 ns per cell per step; talus relaxation 8-neighbour 15–30 ns per pass, 5–20 passes.
1 000 × 1 000: 20 passes ≈ 0.3–0.6 s; 4 000 × 4 000: ≈ 5–10 s; memory one extra Float32 (4 B/cell) — PLAUSIBLE.

**Parameters and calibration.** D (10⁻³–10⁻² m²/yr), S_c (≈ 1.0–1.25, i.e. 45–51°), talus angle per rock class (30–40°;
higher for crystalline, lower for shale and loose sediment) — CONFIRMED [K] for the ranges.

**Bake or live.** **Bake**, inside formation and inside the "weather" depth. Never live.

### 2.3 Glacial erosion (fjords, U-valleys, cirques, glacial lakes)

**The physical idea.** Where snow accumulates above the **equilibrium-line altitude** (ELA) and flows as ice, the
glacier erodes its bed by abrasion and quarrying at a rate that scales with basal sliding speed: ė = K_g u_s^l, with l
about 1–2; a field calibration on the Franz Josef glacier gave l ≈ 2 (Herman et al. 2015, Science 350) — CONFIRMED [K].
Glacial erosion rates span 0.01 mm/yr (polar, cold-based) to more than 10 mm/yr (temperate tidewater glaciers of SE
Alaska) (Hallet, Hunter & Bogen 1996, Global and Planetary Change 12) — CONFIRMED [K]. Landforms:

- **U-shaped valleys**: cross-sections fit y = a x^b with b about 1.5–2.5 (a parabola is b = 2) versus a river's V —
  CONFIRMED [K] (Graf 1970; Harbor 1992, GSA Bulletin).
- **Overdeepenings and glacial lakes**: glaciers erode below their outlet, leaving rock basins (ribbon lakes, Loch Ness
  about 230 m deep) and knock-and-lochan terrain (many small rock-basin lakes) — CONFIRMED [K].
- **Fjords**: overdeepened troughs drowned by the sea, deepest inland, with a shallow sill at the mouth; Sognefjord
  about 205 km long and 1 308 m deep — CONFIRMED [K].
- **Cirques**: armchair hollows at the glacier head, floors near the palaeo-ELA, typically 0.5–2 km across — PLAUSIBLE
  (order CONFIRMED [K]; Evans & Cox 1995 give the morphometry).
- **ELA anchors**: about 4 800–5 200 m in the tropics, about 2 700–3 000 m in the Alps, about 1 000–1 500 m on the
  western Norwegian coast, near sea level in high Arctic and Antarctica; lower on wet maritime flanks than dry interiors;
  depressed by about 800–1 200 m at the Last Glacial Maximum — PLAUSIBLE (each order CONFIRMED [K], the exact figures
  not re-read).

**Methods.** Full ice-sheet models (shallow-ice approximation, SIA) diffuse ice thickness with a diffusivity ∝ H⁵|∇s|²,
which makes explicit time steps tiny; higher-order models (iSOSIA, Egholm et al. 2011, JGR) are research-grade and
expensive — CONFIRMED [K]. For a procedural world the practical approximation (synthesis, PLAUSIBLE):

1. Compute a glacial-maximum ELA surface from latitude, a palaeo-temperature offset (−6 to −8 °C at the LGM in mid
   latitudes, PLAUSIBLE) and precipitation (wet flanks lower).
2. The **ice mask**: cells above the ELA, plus downstream cells reached by ice flux = Σ (accumulation above ELA) along
   the drainage tree until ablation below the ELA exhausts it (a glacier "accumulation" pass on the same stack as §2.1).
3. **Carve**: along glaciated thalwegs lower the bed by an amount ∝ ice flux^(l/2), widening the cross-section with a
   b ≈ 2 profile whose width ∝ ice flux^0.4–0.5; allow overdeepening (no monotone-bed constraint; the bed may rise toward
   the snout); at the ELA head on north-facing (polar-facing) slopes cut a cirque bowl.
4. Where a carved trough reaches the glacial-maximum coast below the then sea level (§2.4) it becomes a **fjord** after
   sea level rises; the sill sits at the former snout.
5. Do **not** fill the overdeepenings: V13 W2's lakes-by-spill-height turns them into the glacial lakes automatically.

**Cost.** ELA and mask: one stack pass (≈ 20 ns/cell); carve: one pass over glaciated cells with an 8-neighbour cross-
section widen (≈ 50 ns per glaciated cell, × 3–5 iterations). 1 000 × 1 000 with 20 % glaciated: ≈ 0.05–0.1 s;
4 000 × 4 000: ≈ 1–1.5 s; memory: ice flux Float32 + mask Uint8 = 5 B/cell — PLAUSIBLE. An SIA model would be 10²–10³×
this.

**Parameters.** Glacial-maximum temperature offset; ELA-precipitation coupling; erosion exponent l and coefficient;
trough width law; cirque aspect preference; number of glaciations (each deepens; Norway's fjords are the product of many).

**Calibration.**

| quantity | anchor | mark |
|---|---|---|
| erosion law exponent l | ≈ 2 | CONFIRMED [K] |
| glacial erosion rate | 0.01 (polar) – > 10 mm/yr (temperate tidewater) | CONFIRMED [K] |
| U-valley power b | 1.5–2.5 | CONFIRMED [K] |
| deepest Norwegian fjord | Sognefjord 1 308 m, 205 km | CONFIRMED [K] |
| cirque size | 0.5–2 km | PLAUSIBLE |
| LGM ELA depression | 800–1 200 m | PLAUSIBLE |

**Bake or live.** **Bake** — glaciation is a formation-time event. Live glaciers today (above the present ELA) are a
biome/land-cover state (V13's `ice` override), not an eroding process.

### 2.4 Sea-level history: rias, fjords, raised beaches

**The physical idea.** Global (eustatic) sea level was about 120–134 m lower at the Last Glacial Maximum about
21 000 years ago, rose fastest during meltwater pulses (about 14–18 m in a few centuries around 14.5 ka) and reached
near its present level by about 7 000–6 000 years ago — CONFIRMED [K] (Lambeck et al. 2014, PNAS, about −134 m).
Consequences:

- **Rias**: river valleys cut to the low base level and then drowned — branching, funnel-shaped inlets on unglaciated
  coasts (Galicia, Cornwall, Brittany, Chesapeake Bay is a drowned river system) — CONFIRMED [K].
- **Fjords**: the glacial equivalent (§2.3).
- **Raised beaches and shorelines**: where ice loaded the crust, the land rebounds after melting, faster than the sea
  rose: the Höga Kusten (High Coast) of Sweden has its highest post-glacial shoreline at about 286 m; present uplift in
  the Gulf of Bothnia about 8–9 mm/yr — CONFIRMED [K]. Scotland's Holocene raised beaches stand at about 5–15 m —
  PLAUSIBLE. The rebound amplitude is about ρ_ice/ρ_mantle ≈ 0.3 of the former ice thickness at full compensation —
  CONFIRMED [K] (ratio), PLAUSIBLE (as a procedural rule).
- **Drowned shelves**: at −120 m the shelves were land (Doggerland between Britain and the continent; Beringia) —
  CONFIRMED [K]; relict river channels and lagoon lines on the shelf are a formation landform.

**Method (synthesis, PLAUSIBLE).** Run §2.1's solver with base level at the glacial value (−120 m) for the last cycle's
span, carving valleys across the exposed shelf; then set sea level to 0 (V13's datum): every valley segment now below
0 within the coastal band is a ria, every glacial trough a fjord. For rebound: an uplift field = 0.3 × former ice
thickness × (1 − e^(−t/τ)), τ about 4 000–5 000 yr (PLAUSIBLE), minus the eustatic rise; where the net is positive,
shoreline features of the time of deglaciation are written as raised beaches (named landforms with their height).

**Cost.** One extra §2.1 run (or fixed point) per sea-level stand; the drowning test is one pass (≈ 5 ns/cell);
rebound one pass. Memory negligible beyond §2.1. On the coarse grid: milliseconds; at 1 000 × 1 000: ≈ 0.01 s beyond
the erosion run; at 4 000 × 4 000: ≈ 0.1 s — PLAUSIBLE.

**Parameters.** Glacial sea-level depth (−120 m default; a fantasy world may choose); number of stands; whether the
world had ice sheets (rebound on or off); the age of deglaciation relative to the campaign (sets how much rebound
remains: a world whose ice melted 10 kyr ago is still rising mm/yr).

**Calibration.**

| quantity | anchor | mark |
|---|---|---|
| LGM eustatic low | −120 to −134 m at ≈ 21 ka | CONFIRMED [K] |
| meltwater pulse 1A | ≈ 14–18 m in a few centuries, ≈ 14.5 ka | CONFIRMED [K] |
| present level reached | ≈ 7–6 ka | CONFIRMED [K] |
| highest post-glacial shoreline | ≈ 286 m (Höga Kusten) | CONFIRMED [K] |
| present glacio-isostatic uplift | 8–9 mm/yr (Gulf of Bothnia) | CONFIRMED [K] |

**Bake or live.** **Bake.** The DM's living sea is at the datum; a living sea-level change (a cataclysm) is a dated DM
event that re-runs V13 W2 (flooding) without any erosion.

## 3 Soil formation as a small classification

### 3.1 The physical idea

Jenny's (1941) *Factors of Soil Formation* states soil as a function of **cl**imate, **o**rganisms, **r**elief,
**p**arent material and **t**ime (CLORPT) — CONFIRMED [K]. Each factor maps to a field the world already has or the
formation step bakes: climate (V13 W3: temperature, precipitation, evaporation), organisms (W5's biome / potential
vegetation), relief (slope, flow accumulation, groundwater depth from W4 §3.5.4), parent material (§1's geology class
plus deposits: alluvium on floodplains, loess downwind of glacial outwash, till under former ice, volcanic ash near
volcanoes), and time (surface age: zero on a fresh lava flow or active floodplain; the time since deglaciation; old on
stable shields). Development times: an A horizon forms in 10²–10³ yr, a clay-enriched Bt horizon in about 10⁴ yr, a
podzol profile in 10³–10⁴ yr, deeply weathered tropical oxisols need 10⁵–10⁶ yr — CONFIRMED [K] order (Birkeland 1999,
*Soils and Geomorphology*, 3rd ed.).

Two international systems: USDA *Soil Taxonomy* (12 orders) and the FAO *World Reference Base* (WRB 2022: 32
reference soil groups) — CONFIRMED [K]. A map needs about a dozen classes; the USDA orders are the right grain because
each has one dominant cause.

### 3.2 The classification as data (a first-match decision list)

Inputs per cell: MAT (°C), MAP (mm), aridity index AI = MAP ÷ PET, slope (%), `flowAccum` / wetland flag, groundwater
depth, permafrost flag, parent class, surface age (yr). Rows evaluated in order; first match wins. Thresholds marked.

| # | class (USDA order; WRB near-equivalent) | rule | why | marks |
|---|---|---|---|---|
| 1 | **Gelisol** (Cryosol) | permafrost within 1 m (MAT ≤ about −2 °C, or V13's permafrost override) | frozen ground churns the profile | definition CONFIRMED [K]; MAT proxy PLAUSIBLE |
| 2 | **Histosol** (Histosol) | waterlogged (wetland flag, or groundwater within 0.3 m) and MAT < about 25 °C or any peat-forming biome | organic matter accumulates faster than it decays | definition CONFIRMED [K]; thresholds PLAUSIBLE |
| 3 | **Entisol** (Leptosol / Fluvisol / Regosol / Arenosol) | slope > about 30 %, or age < about 10³ yr, or active floodplain, or dune sand | no time or no stability for horizons | PLAUSIBLE thresholds |
| 4 | **Andisol** (Andosol) | volcanic ash or young volcanic parent and age < about 10⁵ yr | ash weathers to short-range-order minerals; very fertile | CONFIRMED [K] cause; age PLAUSIBLE |
| 5 | **Aridisol** (Calcisol / Gypsisol / Solonchak) | AI < 0.2 (arid or hyper-arid) | too little water to leach; salts and carbonate accumulate | UNEP aridity classes CONFIRMED [K] (hyper-arid < 0.05, arid 0.05–0.2, semi-arid 0.2–0.5, dry sub-humid 0.5–0.65); mapping PLAUSIBLE |
| 6 | **Vertisol** (Vertisol) | clay-rich parent (basalt, shale, lake clay), slope < 5 %, marked wet/dry seasons | shrink–swell clays crack and self-mix | CONFIRMED [K] cause; thresholds PLAUSIBLE |
| 7 | **Mollisol** (Chernozem / Kastanozem / Phaeozem) | grassland PNV and 0.2 ≤ AI < 0.8 | dense grass roots build a thick dark A horizon; the world's breadbasket soils | CONFIRMED [K] cause; AI band PLAUSIBLE |
| 8 | **Spodosol** (Podzol) | MAT 0–8 °C, AI ≥ 1, coniferous or heath PNV, sandy or granitic parent | acid litter leaches iron and aluminium downward | CONFIRMED [K] cause; thresholds PLAUSIBLE |
| 9 | **Oxisol** (Ferralsol) | MAT ≥ 20 °C, AI ≥ 1, age ≥ about 10⁶ yr, slope < 8 % | extreme weathering on old stable surfaces; infertile | CONFIRMED [K] cause; thresholds PLAUSIBLE |
| 10 | **Ultisol** (Acrisol) | MAT ≥ 12 °C, AI ≥ 0.8, age ≥ about 10⁵ yr | strongly leached, clay-enriched, acid | CONFIRMED [K] cause; thresholds PLAUSIBLE |
| 11 | **Alfisol** (Luvisol) | forest PNV, AI ≥ 0.5, age ≥ about 10⁴ yr | moderately leached, clay-enriched, fertile | CONFIRMED [K] cause; thresholds PLAUSIBLE |
| 12 | **Inceptisol** (Cambisol) | otherwise | young-to-moderate development | — |

A per-class row of **use attributes** (fertility 0–1, tillage difficulty, drainage class, typical colour for the
view) feeds V13 W6's suitability and §6's field placement: Mollisols, Andisols and alluvial Entisols high; Vertisols
fertile but hard to till with pre-modern tools; Spodosols, Oxisols and Aridisols low — CONFIRMED [K] in kind, the
numbers are design data.

### 3.3 Cost

One pass with a short decision list: 5–15 ns per cell; output Uint8 (1 B/cell). 1 000 × 1 000: ≈ 10 ms, 1 MB;
4 000 × 4 000: ≈ 0.15–0.25 s, 16 MB. Inputs are rasters already resident (V13) plus a surface-age raster (Uint16 in
log-years, 2 B/cell) and a parent raster (Uint8) from formation — PLAUSIBLE.

### 3.4 Parameters and calibration

Parameters: the thresholds above (each a table cell, calibratable); the deposit rules (loess downwind distance from
outwash, ash fall radius from volcanoes); surface ages by landform (floodplain 10²–10³ yr, glacial till 10⁴ yr after
deglaciation, shield 10⁸ yr).

| anchor | value | mark |
|---|---|---|
| Ukrainian/Russian steppe: Chernozem (Mollisol) under MAP ≈ 400–600 mm, MAT ≈ 5–10 °C | grassland, semi-arid to sub-humid | CONFIRMED [K] |
| Amazon/Congo terra firme: Ferralsols (Oxisols) | old, hot, wet | CONFIRMED [K] |
| Scandinavia, New England on granite and till: Podzols (Spodosols) | cool, humid, conifer | CONFIRMED [K] |
| Java, Central America volcanic belts: Andosols | young ash | CONFIRMED [K] |
| Deccan Plateau on basalt, Sudan Gezira: Vertisols | clay, seasonal | CONFIRMED [K] |
| SE United States Piedmont: Ultisols | warm, humid, old | CONFIRMED [K] |
| Horizon formation times | A 10²–10³ yr; Bt ≈ 10⁴; oxic 10⁵–10⁶ | CONFIRMED [K] order |

### 3.5 Bake or live

**Bake** at formation (soil is a 10³–10⁶ yr product; it must not flip when the DM nudges a rain value). Soil stays data
the DM may paint. The "weather" depth of let-physics-pass-again re-runs it over the span. Two campaign-time exceptions
are **dated events** (§6), not live derivation: fresh ash or lava resets a cell to Entisol/Andisol with age 0; a flood
deposits alluvium. The *drainage class* used by agriculture (waterlogged or not) is the one soil attribute that should
be **live**, since it reads the groundwater table V13 W4 re-derives.

## 4 Climate on a latitude box

### 4.1 Temperature: latitude, lapse rate, continentality, season

**Physics.** Insolation falls with latitude; the zonal-mean annual sea-level temperature is about 26–28 °C at the
equator, about 20 °C at 30°, about 10–14 °C at 45° (much colder on east coasts and interiors), about 0–5 °C at 60°,
about −18 °C over the Arctic Ocean — CONFIRMED [K] order (Hartmann, *Global Physical Climatology*, 2nd ed. 2016). A fit
that reproduces the zonal mean within a few degrees is T(φ) ≈ T_eq − ΔT sin²φ with T_eq ≈ 27 °C, ΔT ≈ 45 °C (PLAUSIBLE;
the sin²φ shape is the radiative-equilibrium profile of Held & Hou 1980, CONFIRMED [K]). V13 §3.4 uses a flat tropics
plus linear decline, which is within a few degrees of this.

Temperature falls with height: the standard environmental lapse rate is 6.5 °C/km (ICAO Standard Atmosphere); the dry
adiabatic rate 9.8 °C/km; the saturated rate about 4–7 °C/km — CONFIRMED [K]. Surface-air lapse rates measured on
mountain flanks are about 5–6.5 °C/km — PLAUSIBLE. The descending, drying lee of a range warms at the dry rate after
losing moisture on the windward saturated ascent: the **foehn**, a few degrees warmer at the same height in the lee —
CONFIRMED [K] mechanism.

**Continentality.** Water's heat capacity damps the annual cycle. Annual range (warmest minus coldest month): about
1–3 °C at the equator; about 8 °C at Valentia (Ireland, 52° N, oceanic); about 13 °C at London; about 58 °C at Yakutsk
(62° N; January ≈ −39 °C, July ≈ +19 °C); about 63–65 °C at Verkhoyansk — CONFIRMED [K] order, exact values PLAUSIBLE.
West coasts in the westerlies are maritime; east coasts at the same latitude are continental because the wind arrives
off the land (Bergen, 60° N, January ≈ +1 °C; Nain, Labrador, 56° N, January ≈ −18 °C) — PLAUSIBLE values,
CONFIRMED [K] contrast. Classical indices: Conrad's K = 1.7 A ÷ sin(φ + 10°) − 14 (A annual range °C), Gorczyński's
K = 1.7 A ÷ sin φ − 20.4 — CONFIRMED [K]. Either inverted gives an annual range from a continentality score, which is
exactly the knob V13 §3.4 (4) already has (`seasonContinentalShare`).

**The decisive improvement over V13's distance-to-ocean continentality** (PLAUSIBLE, synthesis): continentality should be
**upwind fetch over land**, not distance to the nearest sea: a cell 50 km inland on an east coast in the westerlies is
continental; a cell 500 km inland on the west coast is still maritime. The wind march V13 W3 (6) already runs can carry
a "maritime fraction" alongside moisture: m_air relaxes toward 0 over land with an e-folding length of a few hundred km
and resets to 1 over water. Same pass, one extra float.

**Season.** The surface lags insolation by about one month over land and about two months over oceans — CONFIRMED [K];
the monthly cosine V13 uses is adequate, with the phase lag a function of the maritime fraction.

**Cost.** Per cell per month a few arithmetic operations; 12 months × 5 ns. Coarse grid: microseconds; 1 000 × 1 000:
≈ 60 ms; 4 000 × 4 000: ≈ 1 s; storage: mean, amplitude, phase as Int16 (6 B/cell) — PLAUSIBLE. Live.

### 4.2 The three-cell wind belts and their seasonal shift

**Physics.** The Hadley cell rises at the Intertropical Convergence Zone (ITCZ), sinks at about 30° (subtropical
highs, the horse latitudes, the world's deserts), and returns as the **trade winds** (from the NE in the northern
hemisphere, SE in the southern); the Ferrel circulation gives the **westerlies** between about 30° and 60°; the polar
cell gives **polar easterlies** beyond 60°, with the subpolar lows (stormy, wet) near 60° — CONFIRMED [K] (any
climatology text; Hartmann 2016). The annual-mean ITCZ sits at about 6° N, north of the equator because the northern
hemisphere is warmer — CONFIRMED [K] (Schneider, Bischoff & Haug 2014, Nature 513). The whole belt system follows the sun
with a lag: over oceans the ITCZ moves only about 5–10° through the year; over large land masses much farther (to about
20–25° N over South Asia in July; to about 15–20° S over southern Africa and northern Australia in January) — CONFIRMED
[K] order, PLAUSIBLE limits. Trade winds are steady at about 5–8 m/s; mid-latitude westerlies about 7–12 m/s mean at the
surface over oceans (the Roaring Forties of the southern ocean the strongest) — PLAUSIBLE.

**Method on a flat latitude box (synthesis, PLAUSIBLE).** For each month and each column x: an ITCZ latitude
φ_I(x, month) = φ_I0 + A_I(x) cos(2π(month − m₀)/12) with A_I larger where the column's land fraction within ±30° is
larger (5° over open ocean, up to 20–25° over a large continent); belt edges shift with it (subtropical high at
φ_I ± 28–32°, polar front at ± 55–65°). Each cell takes its band's wind vector: trades with an equatorward component
of about 30° off due east–west, westerlies with a poleward component, polar easterlies. Over land, add a thermal term
(summer onshore, winter offshore) proportional to the land–sea temperature contrast (the monsoon of §4.3). V13's `winds`
table becomes monthly rows indexed by the shifted latitude.

**Cost.** Per coarse cell per month ≈ 10 ns; negligible at every grid. Memory: a monthly wind vector Int8 × 2 ×
12 = 24 B/cell at full storage — on the coarse grid only (144 k × 24 B ≈ 3.5 MB at the continent rung) — PLAUSIBLE.

**Live.** It is cheap and every downstream climate quantity depends on it.

### 4.3 Monsoons over large continents

**Physics.** A monsoon is a seasonal wind reversal driven by the land–sea heating contrast and the migration of the
ITCZ over a continent: in summer the heated continent pulls moist ocean air inland (South Asia: SW monsoon June–
September), in winter cold dry air blows out (NE monsoon November–March). The great monsoons (South and East Asian,
West African, Australian, North American) all sit on continents thousands of kilometres across with warm ocean on
their equatorward side — CONFIRMED [K] (Wang 2006, *The Asian Monsoon*; Gadgil 2003, Annu. Rev. Earth Planet. Sci.).
Monsoon rainfall concentrates 70–90 % of the annual total in the wet season (Cherrapunji/Mawsynram, about 11 000–
12 000 mm/yr, the world's wettest — CONFIRMED [K]).

**Design-critical scale fact (PLAUSIBLE, synthesis):** a V13 `realm` (1 280 km) or `province` (320 km) is too small to
**make** a monsoon; it can only **receive** one from a continent larger than the map. So the monsoon must be a property
of the **world context** (a "beyond-map continent" declared in the recipe: its side, size and latitude), or of the
world map assembly (J392 F11–F13: when realm maps are arranged, the combined land mass may justify one). At the
`continent` rung (3 840 km) a monsoon can emerge if the land mass straddles 10–30° latitude.

**Method.** The thermal wind term of §4.2 with a land-fraction-weighted ITCZ excursion already produces it; the
monsoon test for reporting is "wind direction reverses by > 120° between January and July and the wet half-year holds
> 70 % of the rain" — PLAUSIBLE.

**Cost.** Included in §4.2/§4.5. **Live.**

### 4.4 Ocean surface currents

**Physics.** Wind stress drives the surface ocean. The Ekman layer moves 90° to the right of the wind in the northern
hemisphere (left in the southern); the curl of the wind stress between the trades and the westerlies drives **Sverdrup
transport** equatorward across the basin interior, returned in a narrow, fast **western boundary current** because of
the β-effect (the latitude variation of the Coriolis parameter) — Stommel (1948, Trans. AGU 29) and Munk (1950, J.
Meteorology 7) — CONFIRMED [K]. Result in every basin bounded east and west: a clockwise **subtropical gyre** in the
north (anticlockwise in the south) between about 15° and 45°, an opposite **subpolar gyre** poleward of about 45°,
westward **equatorial currents** under the trades with an eastward **countercurrent** near the ITCZ, and, where a
latitude band is unbroken by land, a circumpolar current (the Antarctic Circumpolar Current) — CONFIRMED [K].

Speeds: the Gulf Stream reaches about 2–2.5 m/s at the surface — CONFIRMED [W]; the Gulf Stream and Kuroshio flow at
about 40–120 km/day (≈ 0.5–1.4 m/s) — CONFIRMED [W] (textbook range in the search result); the Agulhas core is defined
by flow > 1 m/s — CONFIRMED [W]; western boundary currents are narrow (about 50–100 km); eastern boundary currents
(California, Canary, Humboldt, Benguela) are broad (hundreds to 1 000 km), slow (about 0.1–0.3 m/s) and cool —
PLAUSIBLE (order CONFIRMED [K]); equatorial currents about 0.3–0.6 m/s — PLAUSIBLE.

**Warm and cold coasts; upwelling; coastal deserts.** Western boundary currents carry warm water poleward along
**east** coasts (SE United States, China–Japan, SE Brazil, E Australia, SE Africa): humid subtropical climates (Köppen
Cfa/Cwa). Eastern boundary currents carry cool water equatorward along **west** coasts at about 15–35°, and the
along-shore equatorward wind drives offshore Ekman transport and **upwelling** of cold deep water: sea-surface
temperature 5–10 °C below the latitude's mean, a stable inversion, fog and almost no rain — the coastal deserts:
Atacama (Arica about 0.8 mm/yr), Namib, Baja California, the Atlantic Sahara coast, Western Australia — CONFIRMED [K]
(the pattern; Arica's figure), PLAUSIBLE (the SST offset). The subpolar east side of a basin (NW Europe) is warm for
its latitude, partly from the North Atlantic Drift and largely from the prevailing westerlies off a warm ocean (Seager
et al. 2002, QJRMS, argue the atmospheric part dominates) — CONFIRMED [K].

**Methods.**

- *Rule-based (cheapest).* Per coastline cell: which side of its ocean basin it faces (east coast = the basin's western
  boundary) and its latitude band → warm, cold-upwelling or neutral, with an offshore SST anomaly and a current vector
  (along-shore, poleward warm / equatorward cold). Then sea-lane speeds from a lookup by band. One pass over coast cells
  plus a distance fall-off; ≈ 10–20 ns per ocean cell. This captures most of what a map needs (PLAUSIBLE).
- *Barotropic vorticity (Stommel–Munk) on the ocean mask.* Solve for a streamfunction ψ: β ∂ψ/∂x = curl(τ)/(ρH) −
  r ∇²ψ (Stommel) or with a lateral-viscosity term A_H ∇⁴ψ (Munk), ψ = 0 on the mainland coast, a constant per
  island (fixed by a circulation condition — the classical complication), wind stress from §4.2's monthly field.
  Velocities u = −∂ψ/∂y, v = ∂ψ/∂x. With β = 2Ω cos φ ÷ R ≈ 2.3 × 10⁻¹¹ m⁻¹s⁻¹ at the equator and 1.6 × 10⁻¹¹ at 45°
  (derived from Ω = 7.29 × 10⁻⁵ s⁻¹, R = 6 371 km) and A_H = 10³–10⁴ m²/s, the Munk boundary-layer width
  δ_M = (A_H/β)^(1/3) is about 35–85 km (PLAUSIBLE, arithmetic). **The grid must resolve δ: ocean cells of about 25 km or
  finer**, so V13's coarse grid (2/4/8 km) resolves it at every rung and a 32 km grid does not.
  An elliptic solve: multigrid V-cycles (≈ 10 cycles × ≈ 30 ns per cell) or SOR (hundreds of sweeps). Then SST
  anomaly by advecting a temperature tracer along the field (semi-Lagrangian, 20–50 steps).
- *Graphics/procedural precedent.* Ocean currents in hobby world generators are usually rule-based; no peer-reviewed
  procedural-terrain paper with a current solver was found in this pass — PLAUSIBLE (absence of evidence).

**Cost.**

| method | per ocean cell | 1 000 × 1 000 (half ocean) | 4 000 × 4 000 (half ocean) | memory |
|---|---|---|---|---|
| rule-based by coast facing | 10–20 ns | ≈ 10 ms | ≈ 0.15 s | 2 × Int8 velocity + Int8 SST anomaly = 3 B/cell |
| Stommel–Munk multigrid, 12 monthly solves | 12 × 10 × 30 ns ≈ 3.6 µs | ≈ 1.8 s | ≈ 29 s (use the coarse grid: continent 144 k cells ≈ 0.26 s) | ψ, rhs, residual Float32 ≈ 12 B + 1.33× for the hierarchy ≈ 16 B/cell |
| annual-mean solve only | ≈ 0.3 µs | ≈ 0.15 s | ≈ 2.4 s | as above |

All PLAUSIBLE. On V13's coarse grid (16 k / 64 k / 144 k cells, perhaps half ocean) a monthly solver costs about 30 /
120 / 260 ms — affordable as live physics.

**Parameters.** Wind stress field (from §4.2); drag and viscosity (r, A_H); basin connectivity (which straits are open:
the J391 edit "a strait opened or closed"); SST anomaly amplitude; upwelling strength.

**Calibration.**

| quantity | anchor | mark |
|---|---|---|
| Gulf Stream surface speed | up to 2–2.5 m/s | CONFIRMED [W] |
| Gulf Stream/Kuroshio typical | 0.5–1.4 m/s (40–120 km/day) | CONFIRMED [W] |
| Agulhas core | > 1 m/s | CONFIRMED [W] |
| eastern boundary currents | 0.1–0.3 m/s, broad | PLAUSIBLE |
| equatorial currents | 0.3–0.6 m/s | PLAUSIBLE |
| western boundary current width | 50–100 km | PLAUSIBLE (δ_M arithmetic agrees) |
| upwelling SST offset | 5–10 °C below zonal mean | PLAUSIBLE |
| hyper-arid upwelling coast | Arica ≈ 0.8 mm/yr | CONFIRMED [K] |

**Live.** Currents are part of J390's living physics and J391's sea efforts: a strait edit must re-derive them. The
solve is global over a connected ocean basin (an elliptic problem has no local dirty set): an edit anywhere in a basin
re-solves that basin. On the coarse grid that is affordable; at the fine grid it is not.

### 4.5 Monthly precipitation by moisture transport, orographic lift, rain shadows

**Physics.** Precipitation is moisture supply × lifting. Supply: evaporation from warm ocean (and recycled land
evaporation), carried by the wind; the column holds only about 25 mm of water on global average (more in the tropics),
and the global mean precipitation is about 1 000 mm/yr (≈ 2.7 mm/day), so a water molecule stays aloft about 8–9 days
— CONFIRMED [K] (Trenberth 1998; van der Ent & Tuinenburg 2017, HESS, about 8–9 days). About 40 % of precipitation
over land comes from land evaporation (moisture recycling) — CONFIRMED [K] (van der Ent et al. 2010, WRR). Lifting:
convergence (the ITCZ, fronts in the westerlies, the subpolar lows), convection (summer land heating), and
**orographic** ascent over relief. Descent suppresses rain (the subtropical highs; the lee of ranges).

Orographic physics in its standard linear form (Smith & Barstad 2004, J. Atmos. Sci. 61): the condensation rate is
proportional to the vertical motion forced by wind over terrain; condensed water is carried downwind for a
**conversion time τ_c** and falls for a **fallout time τ_f** before reaching the ground; both are commonly set to
about 1 000 s; Oregon observations constrain them only to about 500–5 000 s — CONFIRMED [W]. The model is two
steady advection equations solved by FFT. The downwind spill of orographic precipitation is about U × τ: 10–20 km at
10 m/s and τ_c + τ_f ≈ 1 000–2 000 s — CONFIRMED [W] (the relation), PLAUSIBLE (the arithmetic). The moisture removed by
lifting saturated air through a height H is about 1 − e^(−H/H_w) of the column, with the water-vapour scale height H_w
about 2–2.5 km — CONFIRMED [K] (H_w), PLAUSIBLE (the rule): a 2 km range strips about 55–60 % of a saturated column.

**Anchors for orographic contrast.** Olympic Mountains: windward Hoh rainforest about 3 000–3 700 mm/yr, Sequim in the
lee about 60–70 km away about 400 mm/yr; Cascades: Seattle about 950 mm, Yakima about 200 km east about 210 mm;
Andes: Chilean windward slopes at 40–50° S over 3 000–5 000 mm, Patagonian steppe in the lee about 200 mm — PLAUSIBLE
values, CONFIRMED [K] pattern. The leeward descent also warms and dries (foehn), extending the shadow beyond pure
moisture loss.

**Standard methods for a map.**

| method | what it is | cost per cell | notes |
|---|---|---|---|
| wind march (V13 W3 (6); the FMG family) | parcels advected along the wind, picking up over water, dropping over land with an orographic term; one pass per wind band | 20–40 ns per pass | O(N); a diagonal wind needs care (V13 alternates axes); monthly = 12 runs |
| linear orographic model (Smith & Barstad 2004) | FFT of terrain, transfer function with τ_c, τ_f, wind, stability; background rate added | ≈ 5 log₂ N ns per FFT point × 2–3 transforms | O(N log N); periodic boundary (pad the map); gives the near-field windward/lee pattern correctly but not the long-range depletion |
| semi-Lagrangian moisture transport | a vapour field advected by the monthly wind, sources from evaporation, sinks by condensation where lifted or converging; iterate to steady state | 30–60 ns per cell per step × 50–200 steps | handles curved winds and moisture recycling; the closest to a real model at map scale |
| statistical (PRISM-like elevation regression, Daly et al.) | precipitation vs elevation by facet | 10 ns | needs observations; not generative |

**Cost at the two grids (12 months).**

| method | 1 000 × 1 000 | 4 000 × 4 000 | memory |
|---|---|---|---|
| wind march, 1 band per month, 8 directional passes | 12 × 8 × 30 ns × 1 M ≈ 2.9 s | ≈ 46 s | moisture Float32 + precip Float32 per month (or accumulate) ≈ 8 B; storing 12 months as Uint16 = 24 B/cell |
| Smith–Barstad FFT | 12 × 3 FFT × 5 × 20 × 1 M ≈ 3.6 s (padded 2× each axis: ≈ 14 s) | ≈ 60–240 s | complex Float32 ≈ 8 B × 4 (padding) = 32 B/cell |
| semi-Lagrangian 100 steps | 12 × 100 × 40 ns × 1 M ≈ 48 s | ≈ 770 s | ≈ 16 B/cell |
| any of the above on the coarse grid (64 k, realm) | march ≈ 0.18 s; FFT ≈ 0.3–1 s; semi-Lagrangian ≈ 3 s | continent 144 k: march ≈ 0.4 s | — |

All PLAUSIBLE. **The live climate must stay on the coarse grid** (as V13 already does); the wind march is the only one
of the three that a monthly live re-derivation affords at the continent rung; Smith–Barstad is a good *formation-time*
or *on-demand* refinement for a frame (it describes the 10–20 km structure the 8 km coarse grid cannot).

**Parameters.** Pickup per cell over water (a function of SST: warm water evaporates more — about 7 % more vapour per
°C by Clausius–Clapeyron, CONFIRMED [K]); drop share; orographic coefficient; τ; ITCZ convergence rain (100–400 mm per
month in the belt, PLAUSIBLE); frontal rain in the westerlies; convective summer rain over land; the foehn warming.

**Calibration.**

| quantity | anchor | mark |
|---|---|---|
| global mean precipitation | ≈ 1 000 mm/yr | CONFIRMED [K] |
| wettest station | Mawsynram ≈ 11 900 mm/yr (Cherrapunji ≈ 11 800) | CONFIRMED [K] |
| driest inhabited | Arica ≈ 0.8 mm/yr | CONFIRMED [K] |
| tropical rainforest | ≈ 2 000–3 000+ mm/yr | CONFIRMED [K] |
| subtropical desert | < 250 mm/yr; Sahara interior < 25 mm | CONFIRMED [K] |
| Clausius–Clapeyron | ≈ 7 % per °C | CONFIRMED [K] |
| atmospheric residence time | ≈ 8–9 days | CONFIRMED [K] |
| orographic τ_c, τ_f | ≈ 1 000 s (500–5 000) | CONFIRMED [W] |
| windward/lee ratio over a 2 km range | 5–10× (Olympics ≈ 8×; Cascades ≈ 4.5×) | PLAUSIBLE |

### 4.6 How far downwind a relief change alters rainfall (the dirty set)

The J390 reading names a V13 gap: the dirty set must extend downwind for rain shadows. Three length scales govern it
(synthesis of §4.5's confirmed numbers; arithmetic PLAUSIBLE):

| scale | what it governs | size | consequence for the dirty set |
|---|---|---|---|
| U τ (Smith–Barstad) | where the extra rain from a raised ridge falls | 10–20 km | the windward/crest pattern changes within 1–3 coarse cells |
| foehn / subsidence zone | the dry, warm lee immediately behind the range | 50–300 km | a raised range dries this band strongly |
| moisture recharge | how far downwind the column stays depleted before evaporation, other wind directions and fronts restore it | U × residence time ≈ 700 km/day × 8 days is an upper bound of ≈ 5 000 km; observed rain shadows persist 200–700 km (Great Basin behind the Sierra Nevada; Patagonia behind the Andes) | a relief edit perturbs rainfall for **hundreds of km downwind**, i.e. across most of a `realm` |

**What the designer must not get wrong:** a mountain edit's precipitation effect is not local. In a march model the
change propagates strictly to the map edge along every affected wind path; the practical cut-off is where the change
falls below a threshold (say 2–5 % of the cell's value), which in the Earth anchors is 200–1 000 km, i.e. 25–125 coarse
cells at the realm rung (4 km) or the whole downwind map. The cheapest correct dirty set is **the wind-swept
half-plane (or swept band) downwind of the edit's bounding box for every month whose wind crosses it**, re-marched; on
the coarse grid that costs at most one full climate re-derivation (≈ 0.2–0.4 s), so the simplest correct rule is to
re-run the march over the whole map on any relief edit above a size threshold. PLAUSIBLE.

## 5 Köppen–Geiger as data, and potential natural vegetation

### 5.1 Köppen–Geiger thresholds (as data)

Peel, Finlayson & McMahon (2007, HESS 11: 1633–1644), Table 1 — CONFIRMED [W] (fetched and read). Variables: MAT mean
annual temperature (°C); MAP mean annual precipitation (mm); T_hot / T_cold the hottest / coldest month; T_mon10 the
number of months above 10 °C; P_dry the driest month's precipitation; P_sdry / P_wdry the driest month in summer /
winter; P_swet / P_wwet the wettest month in summer / winter; summer is the warmer six-month half (ONDJFM or AMJJAS).
**P_threshold** = 2 × MAT if ≥ 70 % of MAP falls in winter; 2 × MAT + 28 if ≥ 70 % falls in summer; else 2 × MAT + 14.

| 1st | 2nd | 3rd | name | criterion (Peel et al. 2007, Table 1) |
|---|---|---|---|---|
| A | | | tropical | T_cold ≥ 18 |
| | f | | rainforest | P_dry ≥ 60 |
| | m | | monsoon | not Af and P_dry ≥ 100 − MAP/25 |
| | w | | savannah | not Af and P_dry < 100 − MAP/25 |
| B | | | arid | MAP < 10 × P_threshold |
| | W | | desert | MAP < 5 × P_threshold |
| | S | | steppe | MAP ≥ 5 × P_threshold |
| | | h | hot | MAT ≥ 18 |
| | | k | cold | MAT < 18 |
| C | | | temperate | T_hot > 10 and 0 < T_cold < 18 |
| | s | | dry summer | P_sdry < 40 and P_sdry < P_wwet/3 |
| | w | | dry winter | P_wdry < P_swet/10 |
| | f | | without dry season | not (s) or (w) |
| | | a | hot summer | T_hot ≥ 22 |
| | | b | warm summer | not (a) and T_mon10 ≥ 4 |
| | | c | cold summer | not (a or b) and 1 ≤ T_mon10 < 4 |
| D | | | cold | T_hot > 10 and T_cold ≤ 0 |
| | s, w, f | | as for C | as for C |
| | | a, b | as for C | as for C |
| | | c | cold summer | not (a, b or d) |
| | | d | very cold winter | not (a or b) and T_cold < −38 |
| E | | | polar | T_hot < 10 |
| | T | | tundra | T_hot > 0 |
| | F | | frost (ice cap) | T_hot ≤ 0 |

Order of tests: the usual implementation tests E (T_hot < 10) first, then B, then A, C and D — CONFIRMED [K] (common
practice; not stated in the Table 1 read here). From the paper itself: Peel et al. use 0 °C for the C/D boundary where Köppen used −3 °C (a known variant; Kottek et al. 2006 keep −3 °C) — CONFIRMED
[W]. Where both Cs and Cw tests pass, the paper assigns by which half-year holds more precipitation — CONFIRMED [W].
The worked example: Herberton (17° S, 900 m), MAP 1 146 mm, B threshold 10 × (2 × 19.9 + 28) = 678 mm, classified Cw —
CONFIRMED [W]. **This is the one place in the file where the whole rule set is CONFIRMED by a read source; it can be
shipped as a table verbatim.**

**What it needs from the climate model:** monthly temperature and monthly precipitation per cell (12 + 12 values) —
which V13 W3 does not produce today (it stores an annual mean and a seasonal cosine for temperature and an annual
precipitation). Monthly precipitation (§4.5 run per month, or an annual total split by a seasonal share from the
monthly wind regime) is the gap. With only annual values, A/B/C/D/E first letters and h/k are computable; s/w/f, m/w
and a/b/c/d need the months.

**Cost.** One pass reading 24 values and a dozen comparisons: ≈ 30–60 ns per cell. 1 000 × 1 000 ≈ 0.05 s;
4 000 × 4 000 ≈ 0.5–1 s; output Uint8. On the coarse grid, negligible. Inputs at full monthly resolution on the coarse
grid: 24 × 2 B = 48 B/cell (continent 144 k ≈ 7 MB) — PLAUSIBLE. **Live.**

### 5.2 Potential natural vegetation (PNV)

**Physics.** Climate selects the vegetation that would grow without people: Whittaker's (1975) biome diagram (mean
annual temperature against mean annual precipitation, with nine or so biomes) and Holdridge's (1947, 1967) life zones
(axes: **biotemperature** BT = the mean of monthly temperatures with values below 0 °C (and above 30 °C) set to 0;
annual precipitation; and the **potential evapotranspiration ratio** PETR = PET/P with PET = 58.93 × BT mm) —
CONFIRMED [K]. Process models (BIOME4, Kaplan et al. 2003; LPJ dynamic global vegetation models) compute plant
functional types from bioclimatic limits and a carbon/water balance — CONFIRMED [K]; they are research tools, monthly or
daily, far more expensive.

**Method (data).** A Köppen class → PNV biome table plus three local overrides (V13 W5 already has the override idea):

| Köppen | PNV (default) | note |
|---|---|---|
| Af | tropical rainforest | |
| Am | tropical seasonal (monsoon) forest | |
| Aw | savanna (tree–grass) | fire-maintained; drier Aw → grassland savanna |
| BWh / BWk | hot / cold desert | |
| BSh / BSk | hot / cold steppe (grassland, thorn scrub) | |
| Csa / Csb | Mediterranean sclerophyll woodland, maquis | |
| Cwa / Cwb | subtropical dry-winter forest, highland forest | |
| Cfa | humid subtropical mixed/evergreen forest | |
| Cfb / Cfc | temperate broadleaf (oceanic) forest | |
| Dfa / Dfb / Dwa / Dwb | temperate mixed / broadleaf forest; forest-steppe at the dry margin | |
| Dfc / Dfd / Dwc / Dwd | boreal forest (taiga) | |
| ET | tundra | |
| EF | ice | |

Overrides: altitude treeline (the mean growing-season temperature ≈ 6–7 °C isotherm; Körner & Paulsen 2004 give
6.4 °C — CONFIRMED [K]; on the ground ≈ 3 500–4 000 m in the tropics, ≈ 2 000 m in the Alps, ≈ 1 000 m in southern
Norway — PLAUSIBLE); wetland (V13's accumulation × slope test); riparian forest along rivers through arid classes (a
gallery forest within 1–3 cells of a reach); edaphic overrides from §3 (Spodosols → heath; Vertisols → grassland).

**Organic inclusions (J392 F6/F7) and the science.** Real biome boundaries are ecotones 10–100 km wide with mosaics
(forest-steppe, savanna–forest), driven by local soil, aspect, fire and water — CONFIRMED [K] in kind. A biome
inclusion that looks organic follows these controls: a small arid enclave belongs in a rain shadow, on a sandy or
limestone substrate, or in a basin floor; a forest enclave in a steppe belongs on a north-facing slope, a riparian
corridor, or a higher, wetter massif. The physics gives a ranking of *where* an inclusion can sit with the least
change (the lee of the highest relief, the lowest-AI basin) — PLAUSIBLE (synthesis), which is the input a requirement
solver needs for "best placement" and "organic self-correction" rather than a dot.

**Cost.** Lookup plus overrides: 10–20 ns per cell; Uint8. 1 000 × 1 000 ≈ 20 ms; 4 000 × 4 000 ≈ 0.3 s. Holdridge on
monthly inputs ≈ 30 ns. BIOME4-class: ≈ 10³–10⁴× more (PLAUSIBLE). **Live** (PNV is what the climate implies now; the
DM's painted biome is an always-so override PNV respects).

## 6 Campaign-time land cover

### 6.1 Agricultural land per capita

**Physics/economics.** A pre-industrial population needs grain, and grain needs land: consumption about 200–250 kg of
grain per person per year; medieval European wheat yields about 0.5–0.7 t/ha with seed returns of 3–5 : 1; one third
(three-field) or one half (two-field) of the arable fallow each year — PLAUSIBLE (each order CONFIRMED [K] in the
agrarian-history literature; e.g. Campbell 2000, *English Seigniorial Agriculture*). Arithmetic: 225 kg ÷ (0.6 t/ha × (1 −
0.25 seed)) ≈ 0.5 ha harvested per person; ÷ (2/3 cropped under three fields) ≈ **0.75 ha arable per person**, plus
meadow, pasture and woodland at least as much again — PLAUSIBLE. A compilation of long-term per-capita land use finds
distant-past values mostly below 1 ha per person — CONFIRMED [W] (the 2017 *Journal of Land Use Science* compilation
from Utrecht, abstract). Kaplan, Krumhardt & Zimmermann (2009, Quaternary Science Reviews) model European
deforestation from population with a per-capita land-use curve that falls as technology intensifies (scenarios
"low", "high", "technology", 1000 BC–AD 1850) — CONFIRMED [W]; their early per-capita values are higher (several ha
in prehistoric extensive agriculture) — PLAUSIBLE (not re-read).

| economy | land per person | mark |
|---|---|---|
| intensive irrigated (Egypt, Mesopotamia, wet rice) | 0.1–0.3 ha | PLAUSIBLE |
| medieval/classical mixed farming (arable only) | 0.5–1 ha; with pasture, meadow and wood 1.5–3 ha | PLAUSIBLE (derived above) |
| prehistoric extensive / shifting cultivation | 2–5 ha (with long fallow cycle) | PLAUSIBLE |
| pastoral (semi-arid) | 5–30 ha | PLAUSIBLE |
| hunter-gatherer | 1–10 km² | PLAUSIBLE |

**City hinterland.** A town of 10 000 at 0.75 ha arable per person needs 75 km² of arable; if 30–50 % of the
surrounding land is arable, that is a disc of radius 7–9 km; the town's suppliers also include villages that feed
themselves — PLAUSIBLE (arithmetic). Urban density for the inverse problem: walled medieval European towns
100–200 people/ha; Near Eastern and Roman cores 150–400 — PLAUSIBLE.

### 6.2 Catchment radius by travel time (von Thünen, Chisholm, site catchment)

- **Von Thünen (1826), *Der isolierte Staat*:** around a single market on a uniform plain, land use falls into rings by
  the trade-off of yield and transport cost; rent R = Y(p − c) − Y f d (Y yield per area, p price, c production cost,
  f freight per unit distance, d distance); the rings: intensive gardens and dairy, then **forestry** (firewood and
  timber were heavy), then increasingly extensive arable, then ranching — CONFIRMED [K].
- **Chisholm (1962), *Rural Settlement and Land Use*:** cross-cultural evidence that returns fall noticeably beyond
  about 1 km from the farmstead or village and that about 3–4 km is a practical limit for daily working of fields,
  beyond which new settlements form — CONFIRMED [K] (the book's thesis; the exact distances PLAUSIBLE, the book not
  re-read; the search confirmed only the catalogue and its von Thünen chapter).
- **Site catchment analysis (Vita-Finzi & Higgs 1970, Proc. Prehist. Soc. 36):** a farming settlement's catchment is
  about 1 hour's walk (≈ 5 km), a forager's about 2 hours (≈ 10 km) — CONFIRMED [K].
- **Walking speed on slopes: Tobler's hiking function (1993):** W = 6 e^(−3.5 |S + 0.05|) km/h (S = dh/dx), ≈ 5.0 km/h on
  the flat, fastest ≈ 6 km/h on a 5 % downhill — CONFIRMED [K].

**Method.** Cost-distance from each settlement over the world raster (multi-source Dijkstra with Tobler's speed;
roads and rivers cheaper; V13 W7's cost surface), then assign fields to cells in ascending travel time until the
settlement's area demand (population × land per person × crop share) is met, skipping unsuitable cells (§3's
fertility, slope > about 15–20 % unless terraced, wetlands, forest that must first be cleared). Outer ring: pasture and
coppice woodland to about 1 hour; beyond, unmanaged PNV. Overlapping catchments split by nearest travel time
(a weighted Voronoi — the same partition V13 W8a computes for territories).

**Cost.** Dijkstra with a bucket queue on travel-time integers ≈ 50–100 ns per settled cell; with catchments limited to
≈ 1–2 hours (radius 5–10 km), each settlement touches π × (10 km)² ÷ cell area cells: at 500 m cells ≈ 1 260 cells, so
1 000 settlements ≈ 1.3 M cell visits ≈ 0.1 s, independent of the grid size; output a land-cover Uint8 and a
"time since last change" Uint16 (3 B/cell): 3 MB at 1 000 × 1 000, 48 MB at 4 000 × 4 000 — PLAUSIBLE.

**Parameters.** Land per person by economy and era; crop share; fallow system; the slope and soil limits; travel-time
radii; woodland share (fuel: about 1–2 t of firewood per person per year in temperate Europe — PLAUSIBLE).

### 6.3 Succession after abandonment

**Physics.** Abandoned fields return to the potential vegetation through a sequence of stages whose duration depends on
the biome, seed sources nearby, soil degradation and grazing. Anchors:

| biome | stage times after abandonment | mark |
|---|---|---|
| temperate deciduous (eastern North America Piedmont, classic old-field) | annual weeds yr 1; asters and grasses yr 2–3; pine or shrub invasion yr 5–15; closed young forest 20–40 yr; hardwood-dominated 50–150 yr; old-growth structure 200+ yr | CONFIRMED [K] (Oosting 1942; Keever 1950; Odum 1969 "The strategy of ecosystem development"), years PLAUSIBLE |
| tropical moist forest | after 20 yr, forest attributes reach ≈ 78 % (33–100 %) of old-growth values; to 90 %: soil < 1–2.5 decades, structure and species diversity 2.5–6 decades, biomass and species composition > 12 decades | CONFIRMED [W] (Poorter et al. 2021, Science 374, 77 chronosequence sites) |
| boreal | broadleaf (aspen, birch) 0–30 yr; conifer return 50–100 yr | PLAUSIBLE |
| Mediterranean | garrigue/maquis 10–30 yr; evergreen oak woodland 50–100 yr | PLAUSIBLE |
| grassland / steppe | grass cover 1–5 yr; species composition decades | PLAUSIBLE |
| arid shrubland | decades to centuries; biological soil crusts 20–200 yr | PLAUSIBLE |
| tundra | centuries | PLAUSIBLE |

**Method: a closed-form state function, not a simulation.** Because J390 forbids a random, self-stepping ecology, land
cover at date t is a **pure function** of (PNV, the cell's last dated event and its kind, the date of that event, the
use the host's facts assign now): cover(t) = stage(PNV, kind, t − t_event), with stage boundaries from the table. No
time stepping, no stored trajectory; changing the date re-evaluates. Grazing pressure or repeated clearing reset the
clock (each a dated fact). PLAUSIBLE (design synthesis from the confirmed stage sequences).

**Cost.** One table lookup per cell: 5–10 ns. 1 000 × 1 000 ≈ 10 ms; 4 000 × 4 000 ≈ 0.15 s. Memory: event kind Uint8
+ event date Uint16 (days or weeks since epoch) ≈ 3 B/cell, or sparse (only cells that ever had an event). PLAUSIBLE.

### 6.4 Recovery after fire, flood and eruption

| disturbance | recovery anchors | mark |
|---|---|---|
| grass fire | regrowth within one season; savanna fire-return 1–3 yr | PLAUSIBLE (order CONFIRMED [K]) |
| chaparral / maquis fire | resprouting shrub cover 5–15 yr; fire-return 30–100 yr | PLAUSIBLE |
| temperate forest stand-replacing fire | shrub/sapling 5–20 yr; closed canopy 30–60 yr; mature 100+ yr | PLAUSIBLE |
| boreal fire | fire-return 50–200 yr; conifer canopy 50–100 yr | PLAUSIBLE (order CONFIRMED [K]) |
| river flood | floodplain herbs 1–2 yr; willow/poplar thickets 3–10 yr; fresh silt raises fertility | PLAUSIBLE |
| volcanic eruption — Mount St Helens 1980 | plants and animals re-established within 1–3 yr in many zones (survivors under snow, seed rain); blast-zone forest decades | CONFIRMED [K] (Dale, Swanson & Crisafulli 2005, *Ecological Responses to the 1980 Eruption of Mount St Helens*) |
| volcanic eruption — Krakatau 1883 | sterilized; forest established by the 1920s–1930s (≈ 40–50 yr) | CONFIRMED [K] (Whittaker et al. 1989, Ecol. Monographs) |
| fresh lava flow (wet tropics, Hawaii) | ferns and lichens within years; forest 100s of years; arid lava stays bare for millennia | PLAUSIBLE |
| ash fall | thin ash (< 10 cm) improves soils within years; thick ash buries | PLAUSIBLE |

The same closed-form state function covers these (a painted fire is "this happened": J390 F3), with an event-kind
column per biome in the stage table. **Dated**, never live-stepped, never random.

### 6.5 Calibration summary for §6

| quantity | anchor | mark |
|---|---|---|
| arable per person, mixed farming | 0.5–1 ha (with other land 1.5–3 ha) | PLAUSIBLE (derived) |
| long-run per-capita land use in the distant past | mostly < 1 ha | CONFIRMED [W] |
| farmer catchment | ≈ 1 h walk ≈ 5 km | CONFIRMED [K] |
| daily field limit | ≈ 3–4 km; returns fall beyond ≈ 1 km | CONFIRMED [K] thesis, PLAUSIBLE numbers |
| walking speed, flat | ≈ 5 km/h (Tobler) | CONFIRMED [K] |
| tropical forest recovery at 20 yr | ≈ 78 % of old-growth attributes | CONFIRMED [W] |
| temperate closed canopy after abandonment | 20–40 yr | PLAUSIBLE |

## 7 Urban stratigraphy

### 7.1 Occupation-debris accumulation

**Physics.** Long-occupied settlements rise on their own debris: collapsed mud-brick walls (the dominant sediment in Near
Eastern tells), demolition rubble levelled for new foundations, refuse, burnt destruction layers, imported fill, and in
valleys river flood silt. Mud brick decays by collapse of single bricks and of intact wall sections and is usually
left in place and levelled — CONFIRMED [W] (Friesem et al. 2011, J. Archaeol. Sci., on a 60-year-old abandoned mud-brick
house; Woolley at Carchemish). A mud-brick settlement is continuously decaying and rebuilding; accumulation is net
of addition and removal — CONFIRMED [W]. Rosen (1986), *Cities of Clay: The Geoarchaeology of Tells*, is the standard
text — CONFIRMED [W] (exists; its rate figures not read).

**Rates from anchors (marks per row; arithmetic shown).**

| site | depth | span | rate | mark |
|---|---|---|---|---|
| Rome (ancient to modern street levels) | ≈ 6–10 m | ≈ 2 000 yr | 0.3–0.5 m/century | CONFIRMED [W] depths (popular sources, which disagree); rate PLAUSIBLE |
| City of London (Roman to modern street) | up to ≈ 7 m; floors at 4.6–4.9 m at Dyers' Hall | ≈ 1 950 yr | ≤ 0.36 m/century overall | CONFIRMED [W] (MOLA; site report); rate PLAUSIBLE |
| London, Roman deposits alone at Dyers' Hall | ≈ 2.5 m | ≈ 350 yr | ≈ 0.7 m/century | CONFIRMED [W] depth; span and rate PLAUSIBLE |
| a north Mesopotamian tell site (J. Field Archaeol.) | ≥ 0.5 m | < 300 yr | ≥ 0.17 m/century | CONFIRMED [W] |
| Tell es-Sultan (Jericho) | ≈ 21 m above the plain | ≈ 9 000 yr, intermittent | ≈ 0.23 m/century averaged | CONFIRMED [W] (one weak source for height); PLAUSIBLE rate |
| Çatalhöyük East | ≈ 21 m | ≈ 1 150 yr (≈ 7100–5950 BC) | ≈ 1.8 m/century | CONFIRMED [K]; rate PLAUSIBLE |

**Reading.** Stone-and-brick cities with drainage and rubbish removal: **0.2–0.5 m per century**. Mud-brick
settlements during continuous occupation: **0.5–2 m per century**, averaging much lower over a tell's whole life
because of hiatuses and erosion. A destruction event adds a discrete **burn/rubble layer of about 0.3–1.5 m** in one
year (the Rome fire of AD 64 is cited as raising ground by several metres locally — CONFIRMED [W], popular source).
River-valley cities add flood silt on top (Rome's Tiber floods; Kinet Höyük's nearly 4 m of Late Bronze habitation and
flood deposits) — CONFIRMED [W]. All rates PLAUSIBLE as defaults.

**Tell geometry.** Tells are 5–40 m high, the great ones 30–40 m (Tell Brak about 40 m is commonly cited — PLAUSIBLE,
not confirmed this pass), footprints 1–100 ha; flanks 15–30° (mud-brick talus) — PLAUSIBLE. A citadel mound often sits
on a larger, lower "lower town" (most of the population, thinner deposits) — CONFIRMED [K] in kind.

### 7.2 How often long-lived settlements overlie earlier ones

Location advantages persist (a ford, a harbour, a defensible hill, a spring, a crossroads), so successive settlements
cluster on the same spots — CONFIRMED [K]. Bosker & Buringh (2017, *City seeds*, Journal of Urban Economics 98) find
that geographic advantages (waterways, coasts, Roman roads) predict where European cities arose and persisted —
CONFIRMED [K]. Michaels & Rauch (2018, *Resetting the urban network: 117–2012*, Economic Journal 128) find that after the
Western Empire's collapse French towns largely persisted on Roman sites while British towns were largely abandoned and
re-founded later in different, often coastal or navigable, places — CONFIRMED [K]. A rule of thumb for generation
(PLAUSIBLE): in a long-settled, politically continuous region, a town older than about 1 000 years overlies an earlier
settlement with probability about 0.6–0.8; after a collapse that broke urban continuity, about 0.2–0.4; a village is
less likely than a town to overlie a predecessor of urban size, but likely to overlie a farmstead or village.

### 7.3 Buried extent against age and size

**Synthesis (PLAUSIBLE throughout):**

- **Depth** at a cell = Σ over phases of (occupied(cell, phase) × rate(material, phase) × duration) + Σ destruction
  layers. With 0.3 m/century for a stone-and-brick town, an 800-year-old town has ≈ 2.4 m of its own debris; a
  1 500-year-old one ≈ 4.5 m; mud brick doubles to quadruples these.
- **Extent** of an earlier phase = the settlement's area at that time. Pre-modern towns grow from a nucleus (the
  founding point: the ford, the harbour, the hill), so older layers are smaller and centred on it; a reasonable default
  is that the founding-phase footprint is 10–30 % of the maximum footprint and the depth is greatest at the nucleus,
  thinning to the edge — the inverse of the growth V13's placement already models.
- **Shape.** On flat ground the deposit is a low dome (stone towns) or a steep-sided mound (mud brick); on a slope it
  thickens downslope (terracing and erosion).
- **Predecessor size.** A predecessor's buried extent is bounded by its own population and density: area ≈ population ÷
  density (100–200 people/ha in medieval European towns, more in walled Near Eastern cores).
- **What lies under.** In order of depth: modern cellars truncate recent layers (London: Plough Court's cellars removed
  most medieval and post-medieval deposits — CONFIRMED [W]); medieval street levels at 1–3 m; Roman-era levels at
  4–7 m in long-lived cities; prehistoric levels deepest and smallest.

**Cost.** Per settlement a disc/polygon raster of a few thousand cells at the frame scale; trivial (< 1 ms per
settlement). Output: per-settlement layered polygons (phase, depth, extent), not a world raster — PLAUSIBLE.

**Parameters.** Material class (stone/brick vs mud brick vs timber: timber towns burn and leave thin charcoal-rich
layers), rate per class, nucleus position, founding-share of maximum footprint, number and dates of destruction events
(dated facts), the continuity regime (persistent vs reset).

**Bake.** **At generation only** (J390 F3): age determines whether and how large and how deep the ruins are; never
grown during the campaign. Composed with V13's existing scar burial and the buried former settlement.

## 8 Sailing

### 8.1 Speed against wind angle (simple polar tables)

**Physics.** A sail produces drive from the apparent wind; how close to the wind a rig can sail depends on the sail's
shape and how far its yard or boom can be braced. Best square-riggers made about six points (67.5°) off the wind,
seven points (78.75°) more typical; fore-and-aft sails about four points (45°) — CONFIRMED [W] (search result citing
the points-of-sail literature and Willis 2003 on square sails). The lateen is between (≈ 55–65°, PLAUSIBLE). Leeway
(sideways slip) adds 5–15° for a full-bodied square-rigger close-hauled, 3–6° for a deep-keeled fore-and-aft vessel
— PLAUSIBLE. A displacement hull has a practical speed ceiling of about 1.34 √(waterline length in feet) knots
(≈ 10–12 kn for a 20–25 m hull) — CONFIRMED [K] (rule of thumb).

**Polars as data.** Speed through the water as a fraction of the vessel's **fair-wind speed** V_fair (its speed in a
fresh breeze on its best point of sail), by true wind angle off the bow; 0 = cannot sail that course. Values
PLAUSIBLE, anchored by the closest-angle facts above and by Casson's fair/foul averages (§8.4).

| angle off the wind | square rig | lateen | fore-and-aft (gaff, sprit) | oared galley (rowing) |
|---|---|---|---|---|
| 0–45° | 0 | 0 | 0 (45°: 0.45) | 1.0 × V_oar (wind ahead: 0.8) |
| 60° | 0 | 0.45 | 0.70 | V_oar |
| 70° | 0.35 | 0.60 | 0.80 | V_oar |
| 90° (beam reach) | 0.65 | 0.85 | 1.00 | V_oar (or sail, run only) |
| 120° | 0.90 | 1.00 | 0.95 | sail 0.6 × V_fair of a square-rigger, or oars |
| 150° | 1.00 | 0.90 | 0.85 | sail as above |
| 180° (dead run) | 0.90 | 0.75 | 0.70 | sail as above |

V_fair anchors: ancient and medieval merchant sail 4–6 kn open water (Casson, CONFIRMED [W]); 15th–18th-century ocean
square-riggers 5–8 kn sustained, clippers 10–15 kn on good days — PLAUSIBLE (order CONFIRMED [K]; Flying Cloud, New
York to San Francisco in 89 days, 1851 — CONFIRMED [K]). V_oar: a trireme reconstruction (Olympias, 1987 trials) touched
just under 9 kn in a sprint and was rowed more than 30 nautical miles at up to 6 kn; another estimate for rowing in
shifts is about 2 kn; under sail it touched 10.8 kn in a following gust — CONFIRMED [W] (sources disagree on sustained
speed). Fleets: 2–3 kn with a fair wind, 1–1½ kn against (Casson) — CONFIRMED [W]. Galleys needed water every few days
and beached at night: range from the coast about 2–3 days — PLAUSIBLE (Pryor 1988, *Geography, Technology and War*,
argues this; not re-read).

**Velocity made good (tacking).** To reach a destination directly upwind, a vessel sails close-hauled at angle θ and
tacks; progress toward the wind = v(θ) × cos θ. Square rig at 70°: 0.35 × cos 70° ≈ 0.12 of V_fair, and leeway
reduces it further — **a square-rigger dead to windward makes about one-tenth of its fair speed, often nothing**;
fore-and-aft at 45°: 0.45 × 0.71 ≈ 0.32 — PLAUSIBLE (arithmetic). Each tack (or wear, for a square-rigger turning
downwind round) costs time and ground: a few minutes and a few ship-lengths for a handy fore-and-aft boat, 10–20
minutes and noticeable leeward loss for a large square-rigger wearing — PLAUSIBLE. In practice merchant ships did not
beat for long distances; they **waited** for a fair wind or took a longer route with the wind abeam — CONFIRMED [K]
(Casson; Pryor).

### 8.2 Surface currents for routing

Ground velocity = velocity through the water + current (vector sum); leeway applies to the water track. Current speeds
from §4.4: Gulf Stream up to 2–2.5 m/s (≈ 4–5 kn) — comparable to a merchant ship's whole speed; western boundary
currents 1–2 m/s; equatorial currents 0.3–0.6 m/s (≈ 0.6–1.2 kn); eastern boundary currents 0.1–0.3 m/s (≈ 0.2–0.6 kn);
strait currents: Strait of Gibraltar surface inflow about 0.5–1 m/s plus tide; Bosporus surface outflow toward the
Aegean up to about 1.5–2 m/s at the narrows; Strait of Messina tidal streams up to about 2 m/s — PLAUSIBLE (order
CONFIRMED [K]). The Franklin–Folger Gulf Stream chart (1769–70) was made because mail packets from Falmouth took about
two weeks longer to New York than merchantmen to Rhode Island, by stemming the current — CONFIRMED [K]. **A current
of 1–2 kn against a 4–5 kn ship is a 25–50 % loss; with it, a 25–50 % gain: the asymmetry J391 asks for is first-order,
not cosmetic** (PLAUSIBLE, arithmetic).

### 8.3 Coast-hugging versus open water

Coastal sailing: shorter legs, nightly anchorage or beaching, local land and sea breezes (onshore by day, offshore by
night; useful to coasters), pilotage by landmarks, more hazards (lee shores, shoals), and slower averages: Casson finds
3–4 kn through islands or along coasts against 4–6 kn over open water with fair winds — CONFIRMED [W]; voyages with
stopovers lengthen by the number and length of stops — CONFIRMED [W]. Open water: faster when the wind is fair,
committed when it is not, needs provisions and (before about 1300 in the Mediterranean) knowledge of the season.
Galleys and small craft are coast-bound (§8.1); merchant round ships could cross open basins (Rhodes–Alexandria,
Messina–Alexandria direct) — CONFIRMED [W] (Casson's routes).

### 8.4 Seasonal sailing windows

- **Mediterranean, closed sea in winter (mare clausum).** Vegetius (*Epitoma rei militaris* 4.39): safe 27 May–14 Sep;
  doubtful 10 Mar–26 May and 15 Sep–10 Nov; closed 11 Nov–10 Mar — CONFIRMED [K]. Summer in the Aegean and eastern
  basin is dominated by the **Etesian** (meltemi) N–NW wind, May–September — CONFIRMED [K]: fair for southbound and
  eastbound legs (Rome → Alexandria), foul for the return.
- **Indian Ocean monsoon.** Ships from Egypt's Red Sea ports left in July, crossed with the SW monsoon (from Ocelis to
  Muziris about 40 days per Pliny, *Natural History* 6.104), and returned with the NE monsoon from December/January —
  CONFIRMED [K]. One round trip per year: the season, not distance, sets the schedule.
- **Atlantic trade winds and westerlies.** Columbus (1492): La Gomera 6 Sep to landfall 12 Oct, 36 days westbound in the
  trades; returned in the westerlies by a northern route via the Azores in Jan–Mar 1493 — CONFIRMED [K] (dates).
- **Pacific (Manila galleons, from 1565).** Westbound Acapulco → Manila with the trades in about 3 months; eastbound by
  Urdaneta's northern route on the Kuroshio and westerlies in about 4–6 months — CONFIRMED [K] order.

### 8.5 Historical passage times as calibration anchors

From Casson (1951), read whole — CONFIRMED [W]:

| voyage | distance (nmi) | days | knots | wind |
|---|---|---|---|---|
| Ostia → Africa | 270 | 2 | 6 | fair (Pliny's record) |
| Messina → Alexandria | 830 | 6 (7) | 5.8 (5.0) | fair |
| Ostia → Gibraltar | 935 | 7 | 5.6 | fair |
| Ostia → Hispania Citerior | 510 | 4 | 5.3 | fair |
| Ostia → Gallia Narbonensis | 345 | 3 | 4.8 | fair |
| Puteoli → Alexandria | 1 000 | 9 | 4.6 | fair |
| Narbo → Utica | ≈ 500 | 5 | 4.1 | mixed |
| Rhodes → Ephesus (pirate ship, laden) | ≈ 400 | 4 | 4 | fair |
| Casson's summary | | | 4–6 open water fair; 3–4 coastal/islands fair; **2–2½ against** | |
| fleets | | | 2–3 fair; 1–1½ foul | |

Casson's Table 1 (estimates from those speeds and the prevailing winds; "with" and "against" the Etesians):

| route | days | reverse route | days |
|---|---|---|---|
| Rome → Alexandria | 10–13 | Alexandria → Rome | 53–73 |
| Naples → Alexandria | 9–11 | Alexandria → Naples (via Cyprus, Myra, Rhodes or Cnidus, south of Crete, Malta, Syracuse, Messina) | 50–70 |
| Massilia → Alexandria | 20–30 | Alexandria → Massilia | 58–78 |
| Rhodes → Alexandria | 3½ | Alexandria → Rhodes (via Myra) | 7½–10 |
| Crete → Alexandria | 3–4 | Alexandria → Crete (via Myra and Rhodes) | 11–14 |
| Cyprus → Alexandria | 2–2½ | Alexandria → Cyprus | 6½ |
| Rome → Rhodes | 7–11 | Rhodes → Rome | 45–63 |

**The ratio a designer must keep:** with versus against the prevailing system, the same pair of ports differs by a
factor of about **3–7 in time (typically 4–6)** (Rome → Alexandria 10–13 days, Alexandria → Rome 53–73; Massilia–Alexandria 20–30 vs 58–78),
and the "against" route is often a different, longer path (coast-hugging via Asia Minor and Crete) — CONFIRMED [W].

### 8.6 Computation

**Method.** Time-dependent shortest paths over sea cells: for each month and vessel kind, an edge's cost is its
length ÷ the best achievable ground speed along it, where the best speed solves for the heading that, combined with
the current, tracks the edge (or 0 if no heading can); tacking is represented by allowing zig-zag paths on a graph with
16–32 headings, plus a per-turn penalty. The ocean-routing classic is the **isochrone method** (James 1957) — CONFIRMED
[K]. A* with a straight-line ÷ max-speed heuristic is admissible.

**Cost.** Per edge relaxation with a polar lookup and a current vector: 50–100 ns; 16 neighbours. A full Dijkstra from
one port over S sea cells ≈ 16 × 75 ns × S × (1 + log S ÷ 20). On a 16 km routing grid a realm's sea is ≈ 2 000–4 000
cells: ≈ 5 ms per source; 12 months × 3 vessel kinds × 2 directions × 50 ports ≈ 3 600 runs ≈ 18 s — too much eagerly,
fine lazily per lane (≈ 100 host lanes × 72 = 7 200 A* runs of ≈ 0.5 ms ≈ 3.6 s), and fine at 32 km (÷ 4). At
1 000 × 1 000 sea cells: ≈ 2 s per source; at 4 000 × 4 000: ≈ 40 s per source — **sea routing belongs on a coarse
sea grid (8–32 km), refined only within a few cells of the ports** — PLAUSIBLE. Memory: per routing grid cell a monthly
wind (2 B) and current (2 B) vector × 12 ≈ 48 B, at 4 000 cells ≈ 0.2 MB.

**Parameters.** Per vessel kind: polar table, V_fair, V_oar, leeway, turn penalty, max days from shore (galley water),
night-stop policy; per month: wind and current fields (§4.2, §4.4); seasonal closure rules (Vegetius' calendar as a
default risk multiplier, not a ban); storm season remains the host's (J391).

**Live.** Routes are a pure function of the live wind and current fields and the coast; a strait edit re-derives
currents (basin-wide) and the routes that cross the changed cells, reporting band crossings (J391).

## 9 Historical cartography for the relational style, and the warping algorithms

### 9.1 The historical conventions

| map | date, size | conventions a relational style can borrow | mark |
|---|---|---|---|
| **Hereford Mappa Mundi** | c. 1300; ≈ 1.58 × 1.33 m vellum; the largest surviving medieval world map | **east at top** (Paradise in the far east at the top); **Jerusalem at the centre**; T-O frame (Asia above, Europe lower left, Africa lower right, the Mediterranean the T's stem); size by importance (the Holy Land and Mediterranean swollen, the British Isles squeezed into the rim); an encyclopaedia of about 1 100 inscriptions; **monstrous races along the southern (African) rim** and the far north/east (Blemmyae, Sciapods, Cynocephali; Gog and Magog enclosed) after Pliny and Solinus | CONFIRMED [W] (date, size, east-up, Jerusalem); CONFIRMED [K] (contents; inscription count PLAUSIBLE) |
| **Ebstorf map** | c. 1234–1300; ≈ 3.58 × 3.56 m on 30 vellum sheets; destroyed 1943 (photographs survive) | the world as Christ's body (head at the east, hands at north and south, feet at the west); same centre and orientation | CONFIRMED [W] |
| **Portolan charts** | from c. 1270–1300 (Carta Pisana); typical vellum ≈ 100 × 75 cm, scale ≈ 1:5 500 000 | **true-shaped coasts** of the Mediterranean and Black Sea (accuracy far beyond contemporary mappae mundi; regional sub-charts agree well with a Mercator-like projection — Nicolai's geodetic analysis); a network of **rhumb lines** from a central wind rose and 16 roses on a circle, in the 32 directions of the compass; place names written **perpendicular to the coast**, inland blank; important ports in red; scale bars; the Mediterranean rotated ≈ 8–10° anticlockwise (magnetic north) | CONFIRMED [W] (date, scale, accuracy debate, 32 directions); CONFIRMED [K] (rotation, naming conventions) |
| **Matthew Paris** | c. 1250 | **itinerary strip**: London to Apulia as a vertical sequence of towns with days' journeys; maps of Britain organised along the pilgrim/road spine | CONFIRMED [K] |
| **Gough Map** | c. 1360–1375, revised into the 15th c.; ≈ 115 × 56 cm vellum (Bodleian) | **east at top**; Britain's road network as red lines with **distances in Roman numerals** between towns; coasts recognisable but distorted | CONFIRMED [W] (dating debate, size, scribes); CONFIRMED [K] (red roads, distances) |
| **Tabula Peutingeriana** | copy c. 1200 of a late-antique original (final form perhaps c. 435); eleven parchment segments ≈ 0.33–0.34 × 6.7–6.8 m | the Roman world **squashed north–south** into a ribbon (aspect ≈ 1:20); seas reduced to strips; **shape sacrificed, topology and labelled distances kept**: roads as stepped lines with stage distances (Roman miles, Gallic leagues, Persian parasangs); hundreds of settlement vignettes graded by importance | CONFIRMED [W] (dates, dimensions, segments); CONFIRMED [K] (units, vignettes) |
| **Olaus Magnus, Carta Marina** | Venice 1539; nine woodblocks; ≈ 1.25 × 1.70 m (sources differ: "4 × 5 ft"; "23 ft²") | the northern seas **crowded with monsters**, most based on real animals (whales, walrus) and sailors' reports; monsters mark open, dangerous water | CONFIRMED [W] (date, woodblocks, real-animal basis; size disputed) |
| **Here be dragons** | Hunt–Lenox globe, c. 1508–1510: "HC SVNT DRACONES" off the east coast of Asia below the equator; the Ostrich Egg globe (c. 1504, contested provenance) may also carry it | the phrase is **almost never on historical maps** (the Hunt–Lenox globe is generally called the only known instance); "HIC SUNT LEONES" was more common for unknown land | CONFIRMED [W] |
| **Terra incognita** | Ptolemaic and Renaissance maps | unknown land shown either blank and labelled *terra incognita*, or filled with speculation, animals and peoples — Swift's satire: "So geographers, in Afric-maps, / With savage-pictures fill their gaps; / And o'er unhabitable downs / Place elephants for want of towns" (1733) | CONFIRMED [K] |

Van Duzer (2013), *Sea Monsters on Medieval and Renaissance Maps*, catalogues the functions of sea monsters: decoration,
the danger and wonder of the open sea, filling empty space, and display of the mapmaker's learning — CONFIRMED [K].
The general history is Harley & Woodward, eds., *The History of Cartography* vol. 1 (1987) — CONFIRMED [K].

**What "relational" meant (synthesis, PLAUSIBLE):** three different distortions, often confused: (1) **importance
scaling** (mappae mundi: area ∝ significance, centre = the sacred or the capital); (2) **itinerary topology** (Paris,
Gough, Peutinger: the sequence and labelled distances are true, the shape is not); (3) **orientation** by meaning (east
up, toward Paradise or Jerusalem). Portolans are the counter-example: shape true, interior empty. A style that "keeps
absolute scale true for practical purposes" (J392 F10) has historical precedent in Peutinger's labelled distances and
in the portolan's true coasts with decorative interiors.

### 9.2 The algorithms that produce such warps

| algorithm | what it does | cost | properties |
|---|---|---|---|
| **Rubber-sheet cartogram** (Dougenik, Chrisman & Niemeyer 1985, Professional Geographer 37) | each region pushes or pulls every boundary vertex by a force from its centroid ∝ its area error; iterate | O(R × V) per iteration (regions × vertices), 5–20 iterations; 100 regions × 100 k vertices ≈ 10⁷ per iteration ≈ 0.05–0.1 s | fast, simple; **can break adjacency** (folds) at large distortion — CONFIRMED [K] |
| **Diffusion cartogram** (Gastner & Newman 2004, PNAS 101) | the target density diffuses to uniform; points move with the diffusion velocity v = −∇ρ/ρ; FFT on an L × L grid | O(L² log L) per step, hundreds of steps; L = 512–1 024 ≈ seconds to tens of seconds | **topology (adjacency) preserved**; smooth — CONFIRMED [K] |
| **Fast flow-based cartogram** (Gastner, Seguy & More 2018, PNAS 115: E2156–E2164) | a flow whose density interpolates linearly to uniform, so the velocity field is easier to integrate; FFT-based | "a few seconds even for complex and detailed input" | topology preserved; the current standard — CONFIRMED [W] |
| **Fisheye / focus+context** (Furnas 1986, CHI; Sarkar & Brown 1992, CHI) | radial magnification about a focus: G(x) = (d + 1)x ÷ (d x + 1) on normalised distance, distortion d; or a degree-of-interest function | O(V) per frame (a closed form per vertex); millions of vertices per frame on a GPU | smooth, invertible, real-time; a "capital at the centre, drawn large" view — CONFIRMED [K] |
| **Distance (time-space) cartogram** (synthesis; MDS or polar re-projection) | place each point at angle θ from a centre and radius ∝ travel time (Dijkstra) | one Dijkstra + O(N) | **Peutinger-like**: true sequence and labelled times, shape warped — PLAUSIBLE |
| **Magnification fields** (Keahey & Robertson 1996, InfoVis) | a scalar field of desired magnification integrated into a mapping | O(N) per integration over a grid, iterative | generalises fisheye to many foci (several important cities) — CONFIRMED [K] |

**Design-relevant facts (PLAUSIBLE, synthesis).** All of these are **presentation transforms**: a smooth, invertible map
from true coordinates to drawn coordinates. The true geometry stays the data; distances printed on the warped map
(Peutinger's convention) or a hover/scale readout computed in true coordinates "keep absolute scale true". A
diffusion/flow cartogram is the right tool when *areas* should express importance and adjacency must survive; a
fisheye/magnification field when one or a few *centres* should be large; a time-space cartogram when *routes* matter.
On a 1 024 × 1 024 grid a GSM-2018 cartogram costs seconds — a bake-on-request, cached per world-map arrangement; a
fisheye is live. Orientation (east-up) is a rotation and free.

## 10 Tiled world growth

### 10.1 Domain decomposition with boundary conditions and halos

**The science.** Domain decomposition splits a PDE domain into subdomains solved separately and coupled through their
interfaces — CONFIRMED [K] (Smith, Bjørstad & Gropp 1996, *Domain Decomposition*; Toselli & Widlund 2005). Overlapping
(Schwarz) methods exchange **halo** (ghost) cells each iteration; non-overlapping methods impose interface conditions
(Dirichlet on one side, Neumann on the other) and iterate to agreement. The halo width a process needs equals its
**stencil reach per step × the steps between exchanges**: an explicit diffusion step needs one cell; k steps without
exchange need k; an elliptic solve (§4.4 currents) couples everything and needs iteration across tiles — CONFIRMED [K].

**One-way coupling for a tile generated later (the F13/F14 case).** When a neighbour is finished and frozen, no
iteration is wanted: the new tile is solved with the neighbour's edge as a fixed **Dirichlet** boundary (values) or
**inflow** boundary (fluxes) — a one-way nested-grid coupling, as regional climate models are driven by a global model at
their lateral boundaries (CONFIRMED [K] in kind). Per process (PLAUSIBLE, synthesis):

| process | what crosses the seam from the frozen neighbour | halo width |
|---|---|---|
| noise / recipe ops | nothing if the lattice is position-keyed in a shared world frame (V13 §3.2 already is); else blend over a band | 0 (shared lattice) or a blend band |
| plates (§1) | the phantom-plate seeds, velocities, crust fractions and boundary classes along the edge | 0.5–1 plate diameter |
| elevation | the neighbour's edge heights as Dirichlet values; a **Poisson correction** (Pérez, Gangnet & Blake 2003, *Poisson image editing*, SIGGRAPH) solves ∇²h′ = ∇²h inside with h′ = the neighbour's edge, removing the seam step while keeping the new tile's detail | the whole tile (elliptic), but cheap: multigrid ≈ 10 × 30 ns per cell |
| rivers | each river crossing the seam: an inflow source with its discharge (into the new tile) or a base level at the crossing height (out of it) | crossings only |
| erosion (§2) | the neighbour's edge as fixed base level; nothing else (the implicit solver needs only receivers) | 1 cell |
| climate march (§4.5) | parcel moisture and maritime fraction arriving at the seam per month and wind band | 1 cell row per wind direction |
| currents (§4.4) | ψ along an open-sea seam (Dirichlet), so net transport is continuous | the seam |
| land cover, soils | nothing dynamic (F14); timeless facts only (biome class at the edge as a soft prior) | a blend band |

**What must not cross (J392 F14):** no campaign-time state, no edits made after generation, no dated events. Only the
neighbour's *timeless generation facts* at the moment the new tile is generated.

**Constrained synthesis precedents.** Image quilting chooses a minimum-error boundary cut between overlapping patches
(Efros & Freeman 2001, SIGGRAPH); graph-cut textures generalise the seam (Kwatra et al. 2003, SIGGRAPH) — CONFIRMED [K].
Chunked "infinite" terrain generators rely on position-keyed noise for seamlessness (Lagae et al. 2010, survey of
procedural noise functions, CGF) — CONFIRMED [K].

**Cost.** Edge state per seam: (seam length in cells) × (≈ 20–40 B: height, plate id, moisture × 12 months, ψ, flags) —
for a 4 000-cell seam ≈ 160 KB; the Poisson correction ≈ 0.3 s at 1 000 × 1 000 and ≈ 5 s at 4 000 × 4 000 (multigrid,
PLAUSIBLE); everything else is the normal generation cost.

### 10.2 Multi-resolution seams

**Level-of-detail blending.** Terrain renderers join levels of different resolution with transition regions: geometry
clipmaps blend each level toward the coarser one across a band of about one-tenth of the level's width (Losasso & Hoppe
2004, SIGGRAPH); geomipmapping (de Boer 2000) and chunked LOD (Ulrich 2002) stitch with skirts or constrained edge
vertices to avoid T-junction cracks — CONFIRMED [K]. For **images** (the world map layer is image-only, J392 F11),
the multiresolution spline (Burt & Adelson 1983, ACM TOG) blends two images band by band in a Laplacian pyramid, so
seams disappear at every scale without ghosting; cost ≈ 4/3 × pixels × a few operations — CONFIRMED [K].

**Different cell sizes between neighbours (J392 F11 "seams between different sizes").** A `province` at 250 m beside a
`realm` at 500 m and a `continent` at 1 km: downsample the finer edge to the coarser by block mean (V13's 8 × 8 rule) for
fluxes and heights, upsample the coarser by bilinear plus position-keyed detail for the finer; blend over at least a
few coarse cells (8–16 PLAUSIBLE); conserve discharge at river crossings by matching crossings by position, not by
raster sample — PLAUSIBLE.

**Printed atlases.** Insets show a detail at a larger scale (a city, a distant territory) with a locator box on the main
map and their own scale bar; adjacent sheets overlap by a margin and carry continuation references ("continued on
page N"); sheet indexes show how sheets of different scales nest — CONFIRMED [K] in kind (standard atlas practice; the
overlap width, 5–10 %, PLAUSIBLE). These are the conventions for a stitched world map whose member maps have different
scales: a coarser member drawn as the "main map", a finer member as an inset with a locator box, or both resampled to a
common display scale with the finer one's extent outlined.

## 11 Budget roll-up against V13 §6 (all PLAUSIBLE, from the per-topic costs)

Assume a **formation grid** of 4 × 4 fine blocks (twice the coarse grid's resolution): 64 k / 256 k / 576 k cells at
`province` / `realm` / `continent`; live climate on V13's coarse grid (16 k / 64 k / 144 k); per-cell rasters on the
fine grid (1.02 / 4.1 / 9.2 M).

| process | grid | ns per cell | province | realm | continent | kind |
|---|---|---|---|---|---|---|
| plates, kinematic (§1) | formation | 100 | 6 ms | 26 ms | 58 ms | bake |
| fluvial, steady-state fixed point (§2.1) | formation | 1 500 | 0.10 s | 0.38 s | 0.86 s | bake |
| — alternative: transient, 200 steps | formation | 24 000 | 1.5 s | 6.1 s | 13.8 s | bake (over budget above `province`) |
| talus relaxation, 20 passes (§2.2) | formation | 500 | 32 ms | 0.13 s | 0.29 s | bake |
| glacial carve (§2.3) | formation | 300 | 19 ms | 77 ms | 0.17 s | bake |
| second sea-level stand (§2.4) | formation | 1 500 | 0.10 s | 0.38 s | 0.86 s | bake |
| soils (§3) | fine | 10 | 10 ms | 41 ms | 92 ms | bake |
| **formation total (fixed-point path)** | | | **≈ 0.27 s** | **≈ 1.0 s** | **≈ 2.3 s** | on top of V13's 0.9 / 3 / 7 s |
| monthly wind belts + march (§4.2, §4.5) | coarse | 2 900 | 46 ms | 0.18 s | 0.42 s | live |
| monthly currents, multigrid, half ocean (§4.4) | coarse | 1 800 | 29 ms | 0.12 s | 0.26 s | live |
| Köppen + PNV (§5) | fine | 65 | 66 ms | 0.27 s | 0.60 s | live (or coarse: < 10 ms) |
| land cover state function (§6) | fine | 10 | 10 ms | 41 ms | 92 ms | dated |
| **live additions total** | | | **≈ 0.15 s** | **≈ 0.6 s** | **≈ 1.4 s** | |

Memory: the formation working set at 32 B/cell × 576 k ≈ 18 MB (continent) — inside V13's 300 MB line; deleted after
the bake. Live additions: monthly temperature and precipitation at 48 B/coarse cell (continent ≈ 7 MB), monthly wind and
current vectors ≈ 48 B/coarse cell (≈ 7 MB), Köppen/PNV/land cover 3–4 B/fine cell (≈ 37 MB at the continent rung;
V13 already carries a biome Uint8, so the delta is ≈ 28 MB). **Running formation or monthly climate on the fine grid
at the continent rung, or on any 4 000 × 4 000 grid, breaks both the time budget and the 300 MB line.**

## 12 Sources

[W] = read or seen in a search result this pass; [K] = from knowledge, not re-read.

- **Plates.** Cortial, Peytavie, Galin & Guérin 2019, Procedural Tectonic Planets, CGF 38(2) [W]; Michel, Emilien & Cani
  2015, Generation of folded terrains from simple vector maps, EG short papers [W]; Viitanen 2012 thesis (platec) via
  the GameDev.net thread [W]; Gainey 2014 Experilous planet generator [K]; Bird 2003, G³ 4, PB2002 [K]; Parsons &
  Sclater 1977, JGR 82 [K]; Syracuse & Abers 2006, G³ 7 [K]; Courtillot et al. 2003, EPSL 205 [K]; DeMets, Gordon &
  Argus 2010, GJI 181 (MORVEL) [K]; Turcotte & Schubert 2014, Geodynamics [K].
- **Erosion.** Braun & Willett 2013, Geomorphology 180–181 [W, citation and Landlab notes]; Cordonnier, Bovy & Braun
  2019, ESurf 7 [K]; Barnes, Lehman & Mulla 2014, Computers & Geosciences 62 [K]; Yuan et al. 2019, JGR-ES 124 [K];
  Cordonnier et al. 2016, CGF 35(2) [W]; Cordonnier et al. 2017, ACM TOG 36(4) [K]; Schott et al. 2023, ACM TOG 42(4) [W];
  Tzathas et al. 2024, CGF 43(2) [W method, K authors]; Whipple & Tucker 1999, JGR 104 [K]; Whipple 2001, Am. J. Sci.
  301 [K]; Kirby & Whipple 2012, J. Struct. Geol. 44 [K]; Harel, Mudd & Attal 2016, Geomorphology 268 [K]; Stock &
  Montgomery 1999, JGR 104 [K]; Hack 1957, USGS PP 294-B [K]; Roering, Kirchner & Dietrich 1999, WRR 35 [K]; Musgrave,
  Kolb & Mace 1989, SIGGRAPH [K]; Herman et al. 2015, Science 350 [K]; Hallet, Hunter & Bogen 1996, Glob. Planet.
  Change 12 [K]; Harbor 1992, GSA Bull. 104 [K]; Egholm et al. 2011, JGR 116 [K]; Lambeck et al. 2014, PNAS 111 [K].
- **Soils.** Jenny 1941 [K]; Birkeland 1999 [K]; USDA Soil Taxonomy 2nd ed. 1999 [K]; IUSS WRB 4th ed. 2022 [K]; UNEP
  1992 aridity classes [K].
- **Climate.** Hartmann 2016, Global Physical Climatology [K]; Held & Hou 1980, J. Atmos. Sci. 37 [K]; Schneider,
  Bischoff & Haug 2014, Nature 513 [K]; Wang 2006; Gadgil 2003, AREPS 31 [K]; Stommel 1948, Trans. AGU 29 [K]; Munk
  1950, J. Meteorol. 7 [K]; Seager et al. 2002, QJRMS 128 [K]; Smith & Barstad 2004, J. Atmos. Sci. 61 [W]; Trenberth
  1998, Climatic Change 39 [K]; van der Ent et al. 2010, WRR 46 [K]; van der Ent & Tuinenburg 2017, HESS 21 [K];
  Conrad 1946; Gorczyński 1920 [K]; current speeds from textbook and agency pages in the search results [W].
- **Classification and vegetation.** Peel, Finlayson & McMahon 2007, HESS 11: 1633–1644, Table 1 [W, fetched]; Kottek
  et al. 2006, Meteorol. Z. 15 [K]; Holdridge 1947, Science 105, and 1967 [K]; Whittaker 1975 [K]; Kaplan et al. 2003,
  JGR 108 (BIOME4) [K]; Körner & Paulsen 2004, J. Biogeogr. 31 [K].
- **Land cover.** von Thünen 1826 [K]; Chisholm 1962 [W catalogue, K content]; Vita-Finzi & Higgs 1970, PPS 36 [K];
  Tobler 1993 [K]; Kaplan, Krumhardt & Zimmermann 2009, QSR 28 [W]; per-capita land-use compilation, J. Land Use Sci.
  2017 [W]; Poorter et al. 2021, Science 374 [W]; Odum 1969, Science 164 [K]; Oosting 1942; Keever 1950 [K]; Dale,
  Swanson & Crisafulli 2005 [K]; Whittaker et al. 1989, Ecol. Monogr. 59 [K].
- **Urban stratigraphy.** Rosen 1986, Cities of Clay [W existence]; Friesem et al. 2011, J. Archaeol. Sci. 38 [W];
  MOLA and LAMAS London site reports [W]; Rome depth figures from popular sources [W]; Bosker & Buringh 2017, JUE 98 [K];
  Michaels & Rauch 2018, Econ. J. 128 [K].
- **Sailing.** Casson 1951, TAPA 82 [W, fetched]; Willis 2003 on square sails and points of sail [W]; Olympias trials
  (Oxford poster; Wikipedia; CSM 1987) [W]; Vegetius 4.39 [K]; Pliny NH 6.104 [K]; Pryor 1988 [K]; James 1957
  (isochrone routing) [K]; Franklin–Folger chart 1769–70 [K].
- **Cartography.** Hereford and Ebstorf (Guinness record entry; Wikipedia) [W]; Nicolai 2014/2021 on portolan accuracy
  [W]; Gough Map (Linguistic Geographies 2011; UCL atlas) [W]; Tabula Peutingeriana (Britannica; Talbert 2010 via BMCR;
  Cologne commentary) [W]; Carta Marina (Illinois, Carleton, National Geographic) [W]; Hunt–Lenox globe [W]; Harley &
  Woodward 1987 [K]; Van Duzer 2013 [K]; Swift 1733 [K]; Dougenik, Chrisman & Niemeyer 1985 [K]; Gastner & Newman 2004,
  PNAS 101 [K]; Gastner, Seguy & More 2018, PNAS 115 [W]; Furnas 1986; Sarkar & Brown 1992 [K]; Keahey & Robertson 1996 [K].
- **Tiling.** Smith, Bjørstad & Gropp 1996; Toselli & Widlund 2005 [K]; Pérez, Gangnet & Blake 2003 [K]; Efros &
  Freeman 2001; Kwatra et al. 2003 [K]; Lagae et al. 2010 [K]; Losasso & Hoppe 2004; de Boer 2000; Ulrich 2002 [K];
  Burt & Adelson 1983 [K].
