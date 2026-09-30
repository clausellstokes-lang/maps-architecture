## The whole design in one page (plain words)

We are building one program that draws believable medieval settlements — the map layer of SettlementForge
(`docs/DEFINITION.md`). The base (PART I) makes towns, cities and metropolises, the size inside each set by the
requested population (§1.1). It works the way watabou's Medieval Fantasy City Generator (MFCG) and Thomas Allerton's
Fantasy Town Generator (FTG) do, takes the better idea from each at every step and adds our own measured improvements
(§1.4). Twelve design volumes take everything else the owner asked for to build depth on the same engine: the detailed
neighbourhood close-up (volume 1, stage 2), buildings composed of wings, towers and courts (volume 2) and their floor
plans (volume 3), the underground (volume 4), floating islands (volume 5), the settlement's evolution over decades
(volume 6), the village product from thorp to village (volume 7), the live SettlementForge connection (volume 8), the
application (volume 9), the AI clerk (volume 10), the content tables (volume 11) and calibration (volume 12).
`docs/volumes/INDEX.md` is the map; §16 is the one build plan. Nothing is postponed without a milestone.

**How a town is made** (§4). *Ground:* a real heightfield in metres with water that flows downhill, so rivers reach the
sea and coasts agree with the contours; a dry site may hold an oasis, and water pulls the town toward it (item 111).
*Demand:* from the population, our own tables decide the houses, workshops, inns, churches and institutions the town
needs and the land they take, before any street is drawn. *Big decisions:* the markets — a principal market where trade
meets, usually the plaza, and secondary markets by size, as MFCG and FTG have them — the castle and the large precincts
are reserved; the main roads to the gates are solved first; the first wall follows the town's edge measured along them,
and each later ring is traced before the streets it encloses grow, with a gate wherever a main road crosses it, using
cliffs, gorges, marsh and the sea where they close the circuit (item 106); rivers, moats and canals are bridged where
roads cross them; a strip along every wall stays free of houses and lanes. *Streets:* main roads run between real
destinations over the terrain; inside the walls the lanes are cut by the "bent cut" that gives watabou's maps their
charm (one bend, arriving square) — Neighbourhood 1.2.2's recipe restated in metres, its recordings the test it must
pass; outside the walls side streets grow along the main roads as FTG's do. *Districts:* groups of blocks named for
their market, gate, harbour or castle and merged into quarters at city zoom, shaped by a prosperity field — a smooth
gradient that rises near the centre, the markets, water in dry country and high, dry, sunny ground and falls near
tanneries, walls and damp or shaded low ground. A neighbourhood earns its character and its name from what stands in
it — a few churches outweigh many lodging houses — and its prosperity sets the floor and the ceiling of every building
in it. *Plots:* every block is divided from its street frontage into parcels; rich quarters join plots into fewer,
larger ones with courts and gardens, poor quarters split them and get alleys; some plots sit behind passages and courts,
reachable yet unseen from any street, and a place's name can be known only locally or secretly while the place itself
is always drawn (§4.6, §9.2). *Placement:* one solver places every institution by rules of attraction and
repulsion — noxious trades downstream, shops on streets that feed the market, supply links pulling both ends, coverage
spreading daily services (items 16, 103–107); some institutions hide behind a front, a thieves' guild behind a
tavern; a neighbourhood mixes a few classes of house, the richer its end of the scale the more large houses; a
building whose designation changes mutates instead of re-rolling (§4.7). *Buildings:* each plot gets a site plan — a row house with party walls, a
manor behind its yard, a detached house, a hovel, or a cluster of shacks each with its own door — and every building
stores its heights, so the shadows — on by default — floor plans and the 3-D export read real geometry; it gets
several doors when its plot gives it a lane or a yard, and a cellar where its class, its ground and its wealth say
(§2.6). When a quarter grows rich or poor its stock persists — use and occupancy change first, tenure and yards later,
geometry only on vacancy, ruin or redevelopment — and a plot's geometry never reads poorer than the middle band once it
was built to that band or above (§4.11); the interior has no such floor: the same shells are re-cut inside for the
households that live there, down to single rooms off a corridor (§2.6). A thriving institution's surplus is kept as
pressure that lifts its neighbourhood over the years until the neighbourhood itself moves up (§4.5; J-C3). Buildings
can be shown half-built, half-demolished or falling into ruin, week by week (§4.11). *Finishing:*
towers, bridges, the harbour, fields and woods sized to the population, greenery by rules that read prosperity, and
names and curved labels that never cover a gate or a keep. Below cities the underground holds sewers with their
neighbourhoods, catacombs, caverns, quarries, vaults, ruins and at most one to three undercity neighbourhoods; adding a
way down builds everything it needs (II.7, §7.3, volume 4). The rules are data tables that can be read, edited and
calibrated; every default imitates what MFCG or FTG does, and our extensions ride on top as table values the parity
presets switch off (§7.6).

**What you see** (§8, §11, §12). One display list draws the town as a clean ink map (the default, in MFCG's family), as
a textured lit map like FTG's, or as a hatched close-up like Neighbourhood's — all on one drawing path — and exports it
to SVG, PNG, GeoJSON, virtual-tabletop scenes and 3-D; a large print is made in the background without holding up the
map. The default ink map takes the warmer paper and brown-black ink measured on the owner's own map collection (§8.2;
J-C2). By day the mouse pointer is the sun and every shadow falls by the
real heights; by night torches and lanterns light the streets (§8.4); the default ink map casts its shadows gently in
its own ink, and only the setting that imitates MFCG draws none (J-C1). Every style that encodes meaning in colour
carries a second cue and has colour-blind-checked variants (item 112). The first picture is always the complete map,
never a rough preview, its light following within a moment (§8.5); §12.5 states how fast it appears at each size and §12.3 how fast the model is built, with the
two declared misses at the largest sizes (D-18).

**Editing** (§7). Every element and every rule table can be changed, and names, functions or shapes can be assigned.
Anyone — a person with the canvas tools, an AI clerk through the tool API, or a hand-written skeleton file — builds or
copies a town with one set of twelve tools: place a few points and the shape is worked out, with handles afterwards
(§7.1, §14). Edits are events on permanent addresses: they survive regeneration and version upgrades, every author's
undo is their own and works after the file is reopened, and the generator repairs around an edit locally instead of
re-rolling the town — moving a river or dragging the ground changes nothing outside the blocks the edit names
beforehand, and names follow the things they name and change only after you confirm. The bridge that lets a host, its
assistant and the editor write one document keeps each author's undo their own (§11.3); the product offers no
simultaneous editing of one map by two people (J122). A saved town is editable as soon as a quick fingerprint check passes, while a full check runs in
the background (§2.9).

**Guarantees** (§5, §6). The same seed gives the same town on every machine; adding a new kind of decoration,
re-rolling one block or growing the town never reshuffles what already exists; a release that changes how a step works
declares the change, stage by stage. There is no whole-map retry: every step that can fail has a short, bounded
fallback ladder, and the report says for every requested feature whether it was delivered in full, simplified or left
out.

**SettlementForge** (§7.7, §14, volume 8). SettlementForge's dossier is the map's only fixed truth: the map never edits
it, whatever it does not say the map works out by its own rules, and a dossier change mutates the existing map with the
least disruption. A map delete of a dossier element is a rejection the solver re-places. One adapter reads SettlementForge's file and
hands the map only what it needs, so no other part of the program learns SettlementForge's field names; the module is a
separate program talking to its host through data alone (§11.3). Settlements below
1 500 people are the village product's (volume 7); hosting, accounts, the assistant and similar product questions follow
SettlementForge's own decisions (J121).

**How we know it works** (§13, §16). The riskiest part — whether grown streets and bent-cut lanes fit together within
the speed budget — is measured first, in a spike, and again on real terrain and water at the first milestone. Every
acceptance number says whether it checks that a rule was followed, compares us with a measured MFCG or FTG number, or
shows that the town is better. The owner judges side-by-sides through a written, blind protocol at matched sizes; a
milestone the owner has not rated keeps building but never claims "at parity" or "mastered". The first product
milestone is a viewable town; editing comes directly after it, because the owner ranks editability first. The effort
is computed once in §16: the base with stage 2, and the whole program with every volume's milestone.

**Clean room** (§17). We read the references' programs to understand how they work, never copying them. The
programmers work from this design set and a cleaned digest of the research — never from the references' code, word
lists or palettes — and every library is permissively licensed, so the licence of our own code, private for now, stays
the owner's to choose (§17.3).
