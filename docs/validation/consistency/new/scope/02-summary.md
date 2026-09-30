## The whole design in one page (plain words)

We are building one program that draws believable medieval towns and cities at three sizes — town, city and
metropolis — with the size inside each set by the requested population (§1.1). It works the way watabou's Medieval
Fantasy City Generator (MFCG) and Thomas Allerton's Fantasy Town Generator (FTG) do, takes the better idea from each
at every step and adds our own measured improvements (§1.4). After the base, the same program opens any district as a
detailed neighbourhood close-up (stage 2, PART II). Manor-style buildings, a separate village generator (thorp →
hamlet → village), sewers and floating islands, the town's evolution over decades, calibration against historical maps
and SettlementForge inputs follow by the owner's roadmap; the base carries their hooks now, and nothing else is
postponed (*Staged by the owner's roadmap*).

**How a town is made** (§4). *Ground:* a real heightfield in metres with water that flows downhill, so rivers always
reach the sea and coasts agree with the contours. *Demand:* from the population, our own tables decide the houses,
workshops, inns, churches and institutions the town needs, and the land they take, before any street is drawn.
*Big decisions:* the market square, the castle and the large precincts are reserved; the main roads to the gates are
solved first; the first wall follows the town's edge measured along them, with a gate wherever a main road crosses it;
each later wall ring is traced before the streets it encloses grow; rivers, moats and canals are bridged where roads
cross them; a strip along every wall stays free of houses and lanes. *Streets:* main roads run between real
destinations over the terrain; inside the walls the lanes are cut by the "bent cut" that gives watabou's maps their
charm (one bend, arriving square), measured from Neighbourhood's recordings; outside the walls side streets grow along
the main roads as FTG's do. *Districts:* groups of blocks named for their market, gate, harbour or castle and merged
into named quarters at city zoom, shaped by a prosperity field — a smooth gradient, not a switch — that rises near the
centre, the market and high dry ground and falls near tanneries, walls and damp low ground. *Plots:* every block is
divided from its street frontage into parcels; rich quarters join plots into fewer, larger ones with courts and
gardens, poor quarters split them and get alleys. *Buildings:* each plot gets a site plan — a row house with party
walls, a manor behind its yard with outbuildings, a detached house, a hovel — and every building stores its heights,
so the optional shadows and the 3-D export read real heights. *Finishing:* towers, bridges, the harbour, fields and
woods sized to the population, greenery placed by rules that read prosperity, and names and curved labels that never
cover a gate or a keep. The rules themselves are data tables that can be read, edited and later calibrated.

**What you see** (§8, §11, §12). One display list draws the town as a clean ink map (the default, in MFCG's family),
as a textured lit map like FTG's, or as a hatched close-up like Neighbourhood's — all on one drawing path — and exports
it to SVG, PNG, GeoJSON, virtual-tabletop scenes and 3-D; a large print is made in the background without holding up
the map. The first picture is always the finished map, never a rough preview: under a second for every town and city
and for a metropolis of up to about 48 000 people, about 2.3 seconds at the 120 000 cap (§12.5). Building the model
meets the improvement plan's speed bars (100 ms, 300 ms, 1 s) in 19 runs of 20 up to about 4 500, 17 700 and 58 800
people (§12.3); larger towns take longer, and both misses are declared for the owner's veto (D-18).

**Editing** (§7). Every element and every rule table can be changed, and names, functions or shapes can be assigned to
buildings and quarters. Edits are events on permanent addresses: they survive regeneration and version upgrades, undo
works for several people sharing a town and after the file is reopened, and the generator repairs around an edit
locally instead of re-rolling the town — moving a river or dragging the ground changes nothing outside the blocks the
edit names beforehand, and names follow the things they name and change only after you confirm. A saved town is
editable as soon as a quick fingerprint check passes, while a full check from its recipe runs in the background
(§2.9).

**Guarantees** (§5, §6). The same seed gives the same town on every machine; adding a new kind of decoration,
re-rolling one block or growing the town never reshuffles what already exists; a release that changes how a step works
declares the change, stage by stage. There is no whole-map retry: every step that can fail has a short, bounded
fallback ladder, and the report says for every requested feature whether it was delivered in full, simplified or left
out.

**How we know it works** (§13, §16). The riskiest part — whether grown streets and bent-cut lanes fit together within
the speed budget — is measured first, in a spike, and again on real terrain and water at the first milestone. Every
acceptance number says whether it checks that a rule was followed, compares us with a measured MFCG or FTG number, or
shows that the town is better. The owner judges side-by-sides through a written, blind protocol at matched sizes; a
milestone the owner has not rated keeps building but never claims "at parity" or "mastered". The first product
milestone is a viewable town; editing comes directly after it, because the owner ranks editability first. The effort
is about 153–204 expert person-weeks (§16).

**Clean room** (§17). The programmers work from this document and a cleaned digest of the research — never from the
references' code, word lists or palettes — and every library is permissively licensed, so the owner keeps every
licensing choice.
