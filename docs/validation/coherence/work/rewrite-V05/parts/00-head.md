# Design volume 5 — Floating islands: the sky layer

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V5-sky, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**Citations.** `§n` and `II.n` are sections of the base design, `docs/ARCHITECTURE.md`, with files f and g applied
(`docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`); `D-n` and the `J…` rows without a volume prefix are
the base's decisions. `Vnn §n` is a section of a design volume, this one included (`V05 §3.2`); a list or range after a
volume prefix stays in that volume (`V06 §2.1, §3.2` is two sections of volume 6). `item n` is an owner or amendment item
(owner items 1–101, file g 102–113, file f 200–585), cited as the base text it became; `J-VI.n` is a volumes-integration
decision (`docs/volumes/_integrate.md`), cited and never restated. Research files are named by file and section only.
**Two kinds of tier** (J-V5.66): this volume's **underside tiers** are the rock beneath an island (underside tier 0 the
rim slab, tiers 1 … n the root, V05 §3.9 (2)); item 110 (c)'s **massing tiers** are a stepped building's stacked wings
(V02 §3.15). A bare "tier" in V05 §3.9 (2) and §3.19 (2)–(5) is an underside tier. **Raised-way piers** are item 110
(b)'s supports on ground part 0 (§2.7, item 244); a bare "pier" is a harbour pier (§4.8).

## 0 In plain words

Some cities have land floating in the sky above them. This volume says when, how big, what is on it, where it hangs, how
people get up to it, what it looks like from above, and what happens to it when the city grows poor.

**When there are islands.** Only cities and metropolises can have them, and only when the owner's fantasy setting for
islands is on (it is off by default, so the realistic map never has one). Even then it is a roll of the dice weighted by
wealth: a poor city gets none, a middling one sometimes one, a rich one none, one, two or three. Magic holds an island up
and must be paid for all the time, so the richer the city, the likelier an island, the higher it floats and the bigger it
may be; and the richer the people living on it, the bigger it may be too.

**What is on an island.** Either a very rich neighbourhood (one to three neighbourhoods, taken from the richest people of
the city, so the city's population stays the same — they have moved up), or one unique institution: a palace looking
down over the land, a cathedral, or a prison that keeps its prisoners far from everyone. The island is laid out like any
other part of the city — streets, plots, houses, gardens — by the machinery that draws a neighbourhood close-up, with no
road leading in or out. A large rich island is usually two or three neighbourhoods, a small one a single neighbourhood.
Its wealth is not flat: the richest take the high ground and the rim that looks out over the city, the less wealthy the
lower, inner ground. When the cathedral or the palace moves up, the site the town kept for it beside the main square is
not left empty: the town's largest church takes the old cathedral close, and the old palace site becomes the town hall or
the palace gardens. The island cathedral's burial crypt is cut into the island's own rock — still the largest crypt in
the town — and the island never has catacombs: those lie only under the cemeteries on the ground.

**What it looks like.** Each island has its own shape (round, D-shaped, a lozenge, a crescent or a long spindle), a rocky
rim, gentle hills that echo the country below, and often a small conjured river that flows the same way as the river on
the ground and spills off the edge as a waterfall that turns to mist. An island's water is its own: the desert oasis and
the pull of water on the ground's growth never reach it. It floats over water, fields or the outskirts — over the city's
heart only if someone asks for it there — high enough that nothing on the ground touches its rocky underside. From above
the island is drawn over the city with the ground showing faintly through it (switchable to solid, or to a "lifted" view
that shows the rock hanging beneath it), and its shadow falls on the ground and moves with the sun under the mouse
pointer. At night the rim glows with small magical lights and a soft glow shines down from beneath it.

**How people get up.** By hoists — winch houses on the rim lowering cages on ropes to a landing yard below, the way some
real clifftop monasteries were reached — or, over water, by an inclined rope line to a tower on the shore. Where the world
has magic, a floating stair of stepping stones or a bridge of light may join them. Every island has at least one way up,
and every landing on the ground is a small yard on a street.

**The shade it throws.** An island blocks the sun. For a typical day the generator works out how long each patch of
ground lies in an island's shade — as it does for hills and walls — using the island's real bulk: its thick rocky rim and
the root tapering beneath it. Ground that spends much of the day in that shade tends to be a little poorer, so cheaper
lodgings and workshops gather in the island's "under-hang" while the rich keep to the sunny side; the shade alone never
moves a patch of ground by more than one step of wealth. If an island is moved, raised or lowered, the ground beneath
catches up at the next period of the city's history rather than the moment it is dragged. A shade map shows where each
island's shade falls across the day, and the clerk can answer "why is this quarter poor?" with "it lies in the shade of
the Palace island for half the day". The map remembers where each island stood when the ground last took its shade, so
saving and reopening never changes the picture; one button ("Update shade now") brings the ground up to date at once.

**Who trades with whom.** Shops and workshops on an island follow the siting rules of the ground, but a trip to the ground
is a ride down a hoist: an island's baker sits near the hoist that leads down towards the mill, and a smith on the ground
who serves the island stands near its landing yard. Each of an island's neighbourhoods counts as a district when the
rules ask for "an apothecary in every district". Smelly and dirty trades, the heavy works (mills, smelters, breweries)
and the warehouses never go up; a trade with a works and a shop, like a butcher with a slaughterhouse and a stall, may
keep its works on the ground and open its shop on the island. A supply chain — the town's own or one an author invented —
keeps its working steps together on the ground, while the island may hold the shop that sells its last product or the
people who buy it, the goods riding the hoist between them.

**Walls.** An island needs no wall: its cliffs are its wall. A wall drawn on an island walls only the tops of its hoists,
each with a gate, and the clerk explains that "the drop is the wall" everywhere else.

**Viaducts, raised roads, aqueducts and terraces.** They pass beneath an island and never reach one, the island floats
clear of them, and one removed stays removed. The hoists' landing yards keep clear of the arches, a rope line passes well
above any deck it crosses, and a road drawn toward an island's edge becomes the offer of a hoist: "A road cannot reach a
floating island; a hoist, rope line, stair or bridge of light can." An island on steep ground may be terraced, never
along its edge: the rim walk stays level, and a terrace wall drawn there is moved just inside it. When an island falls,
the arches, piers and terrace walls beneath it break with everything else it lands on, and the shops on a covered bridge
fall with the bridge.

**Where magic wells up.** If the settlement's own record says it sits on a magical node, keeping islands aloft costs less,
so an island is a little likelier, a little bigger and a little higher there.

**When the city declines.** A poorer city's islands shrink a little and sink lower. If the magic can no longer be paid for
at all, the people leave and the island sinks to its lowest height and stands empty; if nothing changes for years, it
comes down, leaving a field of fallen rock that people quarry for building stone — the walls, towers, bridges and streets
it lands on are broken or buried until the town clears them. If wealth returns in time, an abandoned island is raised
again before any new one appears. If the town's own record removes the cathedral or the palace an island carries, the
island finds a new purpose at the town's next period — another institution of the same kind, or a rich neighbourhood —
or, failing both, slowly sinks.

**Editing.** Everything can be changed: switch islands on or off, choose how many, draw an island, drag it, raise or lower
it, resize it, reshape its rim, add or move a hoist or a stair, rename it, paint its wealth, density or greenery with the
ground's brushes, edit anything on it like any other neighbourhood, or bring it down by hand. Every change can be undone,
and changing an island never disturbs the city below except the landing yards of its hoists. An island or a hoist you
remove stays removed — the clerk says "removed by you" — unless you undo the removal or draw an island yourself when every
other place is taken; asking for more islands opens new places only. If islands are switched on and none appears, the
map says why in plain words — the city is not rich enough to keep one aloft — and offers the two remedies: raise its
wealth, or draw one yourself.
