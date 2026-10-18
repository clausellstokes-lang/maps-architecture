# What we are building — the settlement map layer, defined (2026-09-25, evening)

**In one sentence.** A settlement map layer for SettlementForge: a procedural engine that makes towns, cities and
villages as living models rather than pictures — plots first, buildings on the plots, neighbourhoods made of plots,
layers above and below — driven by population and prosperity, held to historical realism, editable in every part, and
able to grow, decline and grow again from one seed as circumstances change.

## 1. What it is for
SettlementForge describes settlements; this layer draws them and keeps them consistent. Data flows one way: the
SettlementForge dossier goes in, the map comes back, and the map never edits the dossier. Anything the dossier specifies
exists on every map; deleting it on the map only moves it elsewhere, coherently and from the same seed, until the settlement
grows or declines and the spot is fair game again — only the dossier can truly remove it. A map edit can also ask for
a specific place to hold something, and the solver honours it when the rules allow. When the dossier later adds or
removes a building or institution, the existing map is mutated with the least disruption — the layout you already know
stays, and only what must move moves. The module stays private for now (proprietary, all rights reserved; an open licence can be granted later) and is kept a separate program from SettlementForge, talking to it through a data protocol only. It must stand next to the best
existing generators (watabou's Medieval Fantasy City Generator, Neighbourhood, Village Generator and Fantasy Manor, and
Thomas Allerton's Fantasy Town Generator), match what they do and how they look, and go past them: real plots, realistic
constraints, editing everywhere, a history. It is built standalone first, then calibrated against the owner's historical
and artistic map corpus (what we built stays the base), then connected to SettlementForge.

## 2. Two generators, two ladders, one engine
- **Town/city generator (built first):** town → city → metropolis.
- **Village generator (built after):** thorp → hamlet → village, in its landscape.
- **Tiers are population bands.** Inside a band, everything scales smoothly with the head count: extent, streets,
  plots, buildings, walls, districts, fields and greenery. Population decides what the settlement needs before a street
  is drawn.

## 3. How a settlement is made
1. **Ground:** real terrain in metres; water that flows downhill; rivers that reach the sea; coasts that agree with the
   contours.
2. **Demand:** from the population, our own tables decide the houses, workshops, inns, churches and institutions needed
   and the land they take.
3. **Landmarks and enclosure:** market, church, castle, harbour and gates claim their ground; the wall is laid where a
   walled town needs one.
4. **Streets:** main roads routed between real destinations over the terrain; side streets grown between them; inside
   large blocks, lanes cut with watabou's bent cut (one bend, arriving square) using constants we measured.
5. **Districts:** grown around the landmarks, typed by what the town still needs and by prosperity.
6. **Plots — the atom:** every block divided from its street frontage into parcels. Prosperity is a smooth field over
   the town, not a switch; it rises near the centre, the market, main streets and high dry ground and falls near
   tanneries, walls and damp low ground. Rich quarters join plots into fewer, larger ones with courts and gardens; poor
   quarters split them, and the leftover gaps become alleys.
7. **Buildings:** each plot gets a site plan — row houses end to end along the street with shared walls, detached
   houses, workshops behind, a manor or institution set back with several buildings around a court, a hovel alone in a
   bare plot. Rules decide the class from giant manor to small hovel, and every designation scales with prosperity — a
   poor-quarter smith works a lean-to forge, a rich-quarter armourer has a storefront, a court and journeymen's rooms;
   every building carries its heights for shadows.
8. **Finishing:** towers, bridges, harbour, fields and woods sized to the population, trees and parks by prosperity,
   names and curved labels.

## 4. Scales and layers
- **Neighbourhood close-up:** any district opened street by street, same seed and style.
- **Building close-up:** each building composed the way Fantasy Manor composes a manor — wings, roofs, dormers,
  porches, towers — fitted to its plot.
- **Toggles, after the city is mastered:** sewers — uncommon in towns, always present in cities and metropolises, none in
  villages — derived by medieval rules, which age by neglect —
  tunnels silt up, cave in or are sealed, never torn down; navigable sewers may carry underground neighbourhoods whose
  plots front the tunnels and whose buildings sit flush against the tunnel walls, with no access-only alleys; and, possible only in cities and metropolises (and not in every one), up to three floating islands in the sky carrying a
  prosperous quarter or a unique institution (palace, cathedral, prison). Islands exist only where there is prosperity:
  magic is a resource that must be constantly supplied, so an island's size follows the prosperity of its neighbourhood
  and of the whole city.

## 5. The rules of the engine
- **One seed is the town;** inputs and circumstances make its history; nothing that survives a change is re-rolled.
- **The town lives in time.** It grows (walls become ring roads, suburbs are absorbed), declines (houses empty, decay
  and are robbed for stone, plots turn to gardens, a shorter wall ring replaces the old one, ruins remain) and grows
  again on its old plan — each change a recorded event, driven by population with a realistic lag.
- **Rules are data.** Coverage, plot sizes, building classes, greenery, sewers and the events of history live in tables
  that can be read, tuned and later calibrated against real towns.
- **Everything is editable,** by a user to taste and by us to change the system; edits are permanent, undoable and
  survive regeneration; the generator repairs around them locally and never redraws the whole map to fix a problem.
- **Assignments outrank the generator's choices, not common sense:** a name, function or shape for one building, a whole
  neighbourhood, or several buildings across the city, placed after the city is built by a solver that obeys rule
  templates for spatial relations (near, far, downwind, downstream, on the main road, beside the market) and supply
  chains (a brewery needs grain, a tannery water and an edge site), relocating displaced uses locally. As the city grows and declines, uses move organically — a shop closes here and
  reopens where the people now are — unless an assignment is pinned in place. When a plot gets a new designation, its buildings mutate to match it — the
  previous design keeps what still fits, gains what the new use needs (a forge for a smith, stables and a court for an
  inn) and loses what it no longer needs — immediately for an assignment, gradually in the town's history.
- **Realism is the tiebreaker, legibility the floor:** where approaches conflict, the more historically faithful one
  wins, and maps use cartographic exaggeration (wide walls, clear streets) so they stay readable.
- **Fast and exportable:** detail is generated when you zoom to it; output goes to pictures, SVG, virtual-tabletop maps,
  GeoJSON and 3-D, and to an embedding interface for SettlementForge.

## 6. The look
A clean ink map by default, in the family of watabou's maps; a textured, lit style like Fantasy Town Generator's later;
a hatched close-up for neighbourhoods; our own house style in time.

## 7. What makes it new
Existing tools each own one rung of this ladder as a separate toy. This layer carries one consistent model from region
to room — terrain, streets, plots, buildings, layers and history — with real parcels and yards, prosperity as a field,
rules as data, growth and decline from the same seed, and a home inside a larger world tool.
