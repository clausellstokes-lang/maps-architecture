# Proposal — hydrology and water state (the hydrology column of the decision matrix)

Status: a design proposal written by the session on 2026-10-16 from the owner's rules of that day
(`docs/AMENDMENTS-2026-10-16j.md` items 137–138), the existing site package (`plat/packages/site/src/{terrain,hydro,
water}`, the design's §2.3, §2.4, §4.2 S1, V04, V06) and the FMG survey. Research-side. CONFIRMED where it cites the
code or the base; PLAUSIBLE where it is the session's design.

## 1 What exists and stands

A heightfield in integer centimetres above a datum tied to mean sea level; a coarser hydrology raster with D8 flow
on every land cell; a priority flood with exact flats; accumulation; outfalls per bank stretch; rivers traced by
steepest descent on their own flooded surface; a bed carved into the terrain with a cap and a re-route beyond it;
sewers following the drainage; cellars and crypts respecting a water table; prosperity falling on damp low ground;
well yields; flood and fire scars burying old districts. A steady-state drainage model, which is the minimum causal
model the brief asks for, and more physical than any reference generator. It is kept unchanged in mechanism.

## 2 Additions, in order of value

1. **Water surfaces as records separate from terrain.** The sea at the datum; lakes with a spill-height surface, an
   open or closed flag from inflow against evaporation, a subtype rule, an outlet; river reaches with a stage profile.
   Every record may carry a date; the present is the latest. Surfaces are never carved into terrain; the bed is
   terrain and the carve delta or pre-carve heightfield stays recoverable.
2. **Two scales with boundary conditions.** Regional hydrology on the world raster, by the same priority flood and
   D8 code at a coarser cell size, produces watersheds, base rivers with discharge, lake levels and the sea; the frame
   takes only what crosses its edge (the charter) and re-derives inside, so its D8 agrees with its own terrain.
3. **Groundwater as a derived field.** The table rises inland from the nearest surface by a recharge-and-permeability
   rule, capped by terrain, with perched tables where geology says so; springs where it meets the ground, read by the
   siting score. It costs what accumulation costs and replaces the nearest-body rule, wrong in valleys far from water.
4. **Flood as a stage on a surface.** Seasonal stages from a climate table; event stages from world events; the
   flooded faces are terrain below the raised surface reached by spreading from the body with barrier tops (walls,
   dykes, quays, retaining walls) blocking the spread.
5. **Historical water states as dated surfaces**, read by the evolution engine's epochs: old channels as dry terrain
   traces with their cause, old lake flats, drowned settlements, later exposure.
6. **Underground water by connectivity**: a connected set of voids below the governing surface floods to it; a liner
   (cistern, sewer invert) holds the table back up to a head limit.
7. **Coast and climate as scalars**: a tidal range per sea for mudflat and harbour bands; a storm surge as an event
   stage; rainfall and evaporation from the world regime; a seasonal pair of surfaces from the climate curve.

Not built: fluid dynamics, sediment transport, real-time water, erosion over time (one optional deterministic
stream-power pass at world scale, later, if valleys need it).

## 3 Rules

One datum (mean sea level); a frame's datum derived from its placement; absolute elevation and local depth never
collapsed. Water changes state, never identity. Every water fact carries its reason with its numbers. Surfaces
separate from terrain make every recomputation a pure function of terrain, surfaces and seed.

## 4 The water class test

Per unit: a floor (a value, or a range from floor samples), a ceiling (floor plus clear height; a storey height, a
chamber height, infinite for open ground, the standing height from the damage layer for a ruin), and a governing
surface (the highest of the local table and the surface of any body reached through a passage whose floor lies below
that surface; for above-ground units open water or a flood stage only, never the table). Depth is surface minus floor.

| class | condition |
|---|---|
| dry | surface below the floor by more than the damp margin |
| damp | surface within the damp margin below the floor |
| partially flooded, wading | depth above zero up to the wading limit |
| partially flooded, swimming | depth above the wading limit, below the clear height |
| completely submerged | surface at or above the ceiling |

Thresholds are rule-table cells with units. A floor range gives a flooded share (the fraction of samples below the
surface). Accessibility is a route class on the path from an entrance (walkable, wading, swimming, diving, none); a
submerged entrance closes the site to anyone without another way in. A site's summary is the aggregate: flooded
share, submerged share, lowest dry level, access state. The same test on the dry-season, wet-season and dated
surfaces gives seasonal and historical classes. Each unit stores its governing surface, why, the depth and the
thresholds applied, so the clerk reports and never infers. Left out: air pockets under a surface above the ceiling;
standing pools above the table except as a decorative unit attribute a programme asks for.

**Surface things.** A building is a stack of units classified per storey, wet from above by open water and from below
by the table; a ruin's stubs submerge sooner than the intact building; open ground, plots and fields take the share
rule; streets take route classes; bridges and piers are tested by deck elevation; a submerged plot is the same plot
with a water class whose household is displaced by the existing flood cause and whose fields stop yielding as a
derived fact to the host; permanent submergence runs the lifecycle to a submerged ruin at a waterlogged decay rate;
depth over a submerged thing feeds discoverability. Rendering: a waterline on walls, upper storeys intact, submerged
ruins as ghosts at shallow depth and withheld at deep depth below the viewer's key; an encounter crop over a flooded
district is water as terrain with depth bands, rooftops as the dry ground, swimming routes as difficult terrain.

## 5 Edits react

Two verbs for every terrain and water edit — "this happened" (dated record, traces kept, the default) and "this was
always so" (retcon, descendants re-derived). The cascade recomputes in dependency order within the affected
watershed and dirty set only: terrain or surface, then flow, flats and accumulation, then the table, then every
consumer in the dirty set (water classes, flood classes, outfalls, fords and spans, wells, the damp-ground term, the
siting score, encounter crops at those addresses, VTT scenes covering them); the world regime does the same one level
up by invalidating the frames whose boundary conditions moved. Locks hold geometry, physics decides state; an
impossible locked thing is a reported anomaly with the DM's choice. Preview on a counterfactual fork; commit under a
verb or discard. A trace is deletable on its own. An edit is stored at the scale it was made.

## 6 What M0 must not foreclose

The carve delta or pre-carve heightfield recoverable; water surfaces separable from the heightfield; the datum
behind one accessor; the water table behind one function; S1's parameters as one input record. All model-level,
recorded now (item 140's model rows).

## 7 Explainability

"Flooded because the floor sits 212 cm below a table set by the river's surface 40 m away, reached through the
collapsed passage"; "settlement here because of the spring"; "the ford is gone because the river was re-routed in
year 412, this happened". Reason records, read by the clerk.

## 8 Decision-matrix rows contributed

| Question | Existing architecture | World proposal | This proposal | Reconciled decision | Reason |
|---|---|---|---|---|---|
| Water surfaces | implied by terrain and the datum | dated surface records | the same, with the carve kept | as proposed | sea-level change, flood stages, history and counterfactuals in one stroke |
| Groundwater | nearest body's surface | derived field | derived field with liners and springs | as proposed | wrong in valleys today; needed by cellars, caves, mines, siting |
| Flooding | a flood terrain class and scars | — | a stage on a surface spread with barrier tops | as proposed | walls and dykes behave; no fluid dynamics |
| Water class | cellar rules against the table | — | one test per unit, per storey, by share, by route | as proposed | one rule serves every scale |
| Construction-time water | cellar rules refuse below the table | — | built space obeys its construction epoch; natural space is classified now | as proposed | generate first, water later, without making the map lie |
| Edits | a water operator after a water edit; raiseGrade | — | two verbs, the cascade, locks hold geometry | as proposed | authored work survives; history is honest |
| Historical water | scars | dated surfaces | dated surfaces read by epochs | as proposed | the brief's historical states and submerged settlements |
| Fluid dynamics, erosion | none | none | none (one optional pass later) | none | causal necessity not shown |
