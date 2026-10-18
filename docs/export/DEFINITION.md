# What we are building — the settlement map generator, defined (owner-approved wording pending, 2026-09-25)

**In one sentence.** A procedural settlement engine that produces towns and cities as living models, not pictures:
plots first, buildings on the plots, neighbourhoods made of plots, layers above and below, rules held as data, one seed
per town, and a history that modifies the same town as circumstances change — matched against the best existing
generators, tuned later against real historical maps, and finally hosted as SettlementForge's map layer.

## 1. The atom: the plot
Roads and districts decide where plots are. Wealth and assignment decide how large they are: prosperous quarters join
plots into fewer, bigger ones; poor quarters split them into slivers. Each plot is a parcel with an owner, a use, a
street frontage and access; it holds zero or more buildings and a yard. Site-plan rules decide coverage: row houses
build end to end along the frontage with shared party walls; manors and institutions sit back with several buildings
around a court; a hovel is one footprint in a mostly bare plot. Alleys and back lanes are what is left between plots.
Trees, greens, parks and made landscapes follow prosperity. The map draws footprints and yards, never a plot as a
building.

## 2. The scales, one model seen closer
- **City/town (the base, built first):** the fusion of MFCG-class generation (ward partition, bent bisection, walls,
  gates, castle, plaza, coast, river, one-click charm, ink style, editing) and FTG-class generation (staged road growth
  under constraints, districts as objects, lots and buildings, roster-first population and economy, embedding), taking
  the best of each stage and adding our own measured improvements; where the two conflict, the more historically
  faithful, constraint-driven, precisely measured approach wins, with legibility as the floor.
- **Neighbourhood (stage 2):** any district opened up as a close-up in the style of the Neighbourhood generator —
  blocks, plots, alleys, courtyards, roofs — with consistent seams, the same seed and the same style.
- **Building (stage 3):** every plot's buildings composed the way Fantasy Manor composes a manor — wings, roofs,
  dormers, porches, blocks, towers — fitted to the plot and its access, with diversity from giant manor to small hovel
  decided by per-plot rules, and heights carried on every part for a later shadow pass.
- **Village (a separate product, later):** the same foundation applied to a village in its landscape, VG-class,
  scaling thorp → hamlet → village; the town/city generator scales town → city → metropolis.

## 3. The layers (toggles, after the city is mastered)
- **Sewers** beneath the city, derived from the built city by medieval-appropriate rules (drainage, street hierarchy,
  outfalls, which buildings need drains), with a restrained historical preset and a navigable fantasy preset.
- **Floating islands** in the sky: one to three organic oval landmasses carrying prosperous quarters or a unique
  institution (palace, cathedral, prison), with their own terrain echoing the ground, casting shadows, unrelated to the
  underground.

## 4. The rules of the engine
- **One seed is the town.** The seed fixes the original settlement and its streams of variation; parameters and the
  town's own facts do the rest. Nothing that survives a change is ever re-rolled.
- **Rules are data.** Coverage, plot granularity, building class, greenery, sewer logic and the events of history live
  in tables, so they can be read, vetoed and tuned — first by eye, later against the historical corpus.
- **Everything is addressable and editable.** Districts, plots and buildings keep permanent identities across edits and
  regeneration; changes are local, constraint-respecting repairs, never a whole-map redo.
- **Assignments outrank the rules.** A caller may fix a building's name, function or shape (within drift bounds) for
  one building, a whole neighbourhood, or several buildings dispersed across the city.
- **The town evolves.** Given circumstances over decades, the same town is modified, never replaced: a wall becomes a
  ring road as a new curtain rises, suburbs are absorbed, quarters densify or decay, every change a recorded event.
- **Fast, faithful, exportable.** Detail is generated lazily by zoom within recorded speed budgets; output goes to
  pictures, SVG, VTT levels and 3-D, and to an embedding API with a clean boundary.

## 5. The order of work
Standalone first: the city base → neighbourhoods → buildings → the village. Then reconcile everything with the
historical data and artistic corpus, keeping what was built as the base. Then SettlementForge inputs. Later still, the
toggled layers and the evolution program. Each stage produces something visible and useful on its own.

## 6. What makes it new
Existing tools each own one rung of this ladder as a separate toy. This engine carries one consistent model from city
to building, in the fantasy-map style people already love, with real plots and yards, rules as data, a history from the
same seed, and a home inside a larger world tool. That combination does not exist today.
