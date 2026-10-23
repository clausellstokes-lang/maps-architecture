# Formation, climate, ecology, sailing and cartography for a procedural world — the science

> Provenance: written by Opus 5.5 under the Fable manager (docs/PROGRESS.md J392's model ruling); read and validated by the Fable design and critic seats of the same pass.

## PROGRESS ledger (ticked as each topic lands)

- [ ] 0 Conventions: marks, cost basis, the grid sizes against V13's rungs
- [ ] 1 Kinematic plate models on a bounded flat map
- [ ] 2 Fluvial, hillslope and glacial erosion; sea-level history
- [ ] 3 Soil formation as a small classification
- [ ] 4 Climate on a latitude box (temperature, wind belts, monsoons, ocean currents, precipitation, downwind reach)
- [ ] 5 Köppen–Geiger as data, and potential natural vegetation
- [ ] 6 Campaign-time land cover (fields, catchments, succession, disturbance recovery)
- [ ] 7 Urban stratigraphy (debris rates, overlying settlements, buried extent)
- [ ] 8 Sailing (polars, currents, leeway and tacking, coast versus open water, seasons, passage anchors)
- [ ] 9 Historical cartography and the warping algorithms
- [ ] 10 Tiled world growth (halos, one-way boundary conditions, multi-resolution seams)
- [ ] 11 Budget roll-up against V13 §6
- [ ] 12 Sources

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

