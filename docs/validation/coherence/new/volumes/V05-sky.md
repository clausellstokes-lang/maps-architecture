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

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds (to build depth)

| what | where |
|---|---|
| existence and count: the rung gate, the model setting, the dossier's coherence gate, the three ordered slots, the removals that hold | V05 §3.2 |
| the supply law made measurable: the town and carried supplies on absolute field values (RV-pc-3), the magical node (V08 §2.6's deposits row) | V05 §3.3 |
| purpose: a prosperity or an institution island (palace, cathedral, prison, tower), by rule or by assignment, custom institutions by archetype, item 108's ladders | V05 §3.4 |
| the sky allocation: S7b (5)'s fill, the carried workplaces, the coverage units, the S3 reservation's hand-over, the cathedral's crypt and item 109 (k) on an island | V05 §3.5 |
| shape and placement | V05 §3.6, §3.7 |
| the island arena: frame, void, land, rim, terrain echo, conjured river and waterfall; an island's own water under item 111 | V05 §3.8 |
| the underside, the ground reference and the altitude (J98) | V05 §3.9 |
| access: hoists, rope lines, floating stairs and bridges of light, with their landing yards | V05 §3.10 |
| the island's gradient field, its context vector, and the inputs volume 1's unit run reads | V05 §3.11, §3.12 |
| lights and names | V05 §3.13, §3.14 |
| over time: the island laws an epoch applies, the households through volume 6's channels, the fall and its landfall over every covered kind | V05 §3.15, §3.16 |
| failure ladders, determinism, every edge | V05 §3.17, §3.18, §3.23 |
| the shade strip (item 102 on the island's side) and the shade basis that lets its lag survive a save | V05 §2.1, §3.19 |
| the siting rulebook, the supply web and custom chains across the island (items 103–105, 107) | V05 §3.20 |
| the rim as a barrier (item 106) | V05 §3.21 |
| item 110 on, under and against the island | V05 §3.22 |
| editing, rendering, labels, exports, budgets, tests, build plan | V05 §4–§8 |

### 1.2 The base hooks this volume consumes

Each row names the base section and what this volume does with it; the base's values are read there.

| base section (and what it carries) | how this volume uses it |
|---|---|
| II.6 (the island rule (1)–(8), `IslandRule`, `SkyStrategy`; items 546, 547) | built to depth here: V05 §2.4's rows, V05 §3.2–§3.16 |
| II.1 rule (5) (the `sky` request, no portals, no roads in or out) | SKY makes the request and its unit inputs (`SkyUnitInput`, V05 §2.3); volume 1's unit run lays the districts |
| §1.1 `RungProfile.layers.islands` | the gate of V05 §3.2 (1) |
| §2.1, §2.2 (`PlatKey`, rules 1, 2, 5, 7; items 203, 204) | the island arena's levels, the void face, the `rim` and `sky_access` roles, local coordinates with a world anchor |
| §2.3 `Terrain`, `WaterBody` (item 252) | the terrain echo and the conjured river with its `fall` (V05 §3.8) |
| §2.5 `Allocation`, `ContextVector`, `Reservation`, `Block.interior` (items 213, 286) | the sky allocation, the positioned landing rows, `arena: 'sky'`, the `landing` reservation, `rim_strip`, `handedFrom` |
| §2.7 `SkyIsland`, `SkyAccess`, `Decoration`, `LandUse`, `LightSource`, `RetainingWall`, `Enceinte` (items 245, 251, 252, 253, 575) | the records V05 §2.1–§2.2 declare; the landfall decoration and quarry; the island's retaining walls; the condition the landfall writes |
| §2.8, §2.9 (item 274) | the registry rows; `Document.nextSkyPart`; the shade basis read on load |
| §3.4, §3.7 | the rim's resize by buffer; `splitThrough` for the landfall's knots (V05 §3.15, §3.16) |
| §4.1 (item 282) | `SKY`'s registration and its two ground data keys; the unit run as a unit of the hinterland unit's kind (V05 §3.1) |
| §4.2 S0, S1 (2)–(5), S3 (2), (8) (item 286) | outline, terrain, the conjured river, the island's crossing sites; the reservations an institution island leaves |
| §4.3 (item 290) | the raised ways' slot, stream and sky clauses (V05 §3.1, §3.22) |
| §4.5 (items 295, 296, 308) | S_town, S_carried, S7b (5)'s fill, the landing kernel, the daylight term and its sampler, the island-free value |
| §4.6 (item 299) | a ground landing's attach as an infill destination (V05 §3.10 (4)) |
| §4.7 S10–S11, S10b, *Light sources* (items 307, 308, 309) | the landing plots, the supply distance between arenas, the sky light rows, `levelledGroundCm` |
| §4.8 (item 580) | the island's crossing sites, laid by volume 1's unit run |
| §4.9 (items 313, 546) | the rim walk's greenery row; the value-keyed island rows |
| §4.11 (item 320) | the island kinds of `ConversionOp`, `IslandEpochStep`, the landfall, the salvage ledger (V05 §3.15, §3.16) |
| §5.1–§5.3 (item 331) | the F-SKY rows and the sky invariants (V05 §3.17) |
| §6.1, §6.3 (item 476) | `island.place` and its creation indices; the access anchor (V05 §3.18) |
| §7.1–§7.4, §7.6, §7.8 (items 356, 375) | V05 §4: the events, the targets, the bends, the lifecycle rows, the tables, the controls |
| §7.7 (item 387; DR27) | the dossier's islands row (V05 §4.4) |
| §8.1, §8.2, §8.4, §8.8 (items 408, 415, 416) | the island's marks, the sky slots and `sky.ground` role, the state rows, the slab tiers, the light window (V05 §5) |
| §9.1, §9.2, §11.1 (item 415) | the island's labels and their occlusion rule; the sky exports (V05 §5.4, §5.5) |
| §12.4, §12.6, §13.2, §14, §16 (items 476, 568) | V05 §6's budgets; T10-1, T13-1, T15-1 and the island-shadow golden beside T-V5-*; `@plat/sky`; M6-sky |
| item 102 (§4.5 *Fields*, §4.7 S10b, §7.6, §8.4, §13.2) | the islands' share of the daylight term and the sky receivers' shade (V05 §3.11, §3.19) |
| items 103, 104 (§10.2, §4.7 S10b, §7.6, §7.7, §13.2) | the route between arenas, the island's coverage units, the carried trades, the landing classes' facts, the custom archetypes and chains (V05 §2.4, §3.4, §3.5, §3.20) |
| items 105, 107 (the supply web; spread and pull) | applied across arenas (V05 §3.5 (3), §3.20 (10)–(12)) |
| item 106 (natural barriers; `Enceinte.closure`) | the rim a `sheer` barrier (V05 §3.21) |
| item 108 (institution ladders) | what an island institution may be; carried members keep their records (V05 §3.4, §3.5) |
| item 109 (f), (k) (J111) | the node term stays positionless; island churchyards never catacomb candidates; the crypt a rim-slab vault (V05 §3.3, §3.5, §3.10 (5)) |
| item 110 (a)–(d) (§2.7, §3.4, §4.3, §4.6, §4.7 S10–S11, §5.3, §7.1, §8; items 244–246, 260, 290, 309) | casters under an island, the accesses' admissible ground, the island's retaining walls, the landfall's covered set, the generator's reads of the sky (V05 §3.22) |
| item 111 (§2.3, §4.2 S0–S1, S3, §4.4, §4.5, §4.7 S10b) | stops at the island's rim (V05 §3.8 (4), §3.11) |
| V01 §2.4, §3.10.3, §3.16 (the unit runner, the island's partition, `skyDistrictCount`) | SKY calls the unit run once per island with a `sky` request; the run reads `skyUnitInput` (V05 §2.3, §3.12) |
| V02 §2.6 (`DeckContext`), §3.15.2 (the stack's heights envelope) | the caster ceiling and the surface top per point; the landfall's deck plots (V05 §3.9, §3.16) |
| V06 §2.1 (`EpochParticipant`, `EpochOps`, `EpochScope`), §3.2, §3.4, §3.8.1 | `sky.islands` at `afterField` and `sky.clearance` at `afterGrowth` (order 50); the sampler layout the building mask shares; the displaced pool's cause `island` (V05 §3.15, §3.19) |
| V08 §2.6 (the deposits row), §3.5 (the site latitude) | the node term (V05 §3.3); the samples' latitude (§4.5) |
| V09 §2.7, §4.9, §5.4, §6.4 | the Shade view reads the held strips; the bend rows (V05 §4.2, §5.1) |
| V10 §2.13 (`WhyProvider`, `FieldDrivers`) | the sky's `WhyProvider` and the daylight term's per-island attribution (V05 §4.5) |
| V11 §3.5, §3.9 (the class and district-kind rows) | the institution rows' tags and the `sky-*` district kinds (V05 §2.4) |

### 1.3 Out of scope, and whose it is

* **Laying the island's districts, blocks, plots and buildings** — volume 1's unit run (V01 §3.10.3). This volume gives
  it the arena, the land face, the rim strip, the claims, the landings, the allocation and the field values (V05 §2.3),
  and reads back what it made.
* **Scheduling epochs** — volume 6. This volume states the island laws an epoch applies (V05 §3.15) and the conversions
  they emit; the engine decides when an epoch runs.
* **Screens, panels and gestures** — volume 9; this volume fixes the tools' parameters and the events (V05 §4).
* **The clerk's prompts** — volume 10; this volume fixes what the clerk reads and proposes about islands (V05 §4.5).
* **Word lists and grammar rows** for island names — volume 11; this volume fixes the naming features (V05 §3.14).
* **Calibration runs** — volume 12; every calibrate-later constant here names its default, its measurement and its
  fallback.
* **The underground** — volume 4. Islands have no relation to it (item 2): nothing here reads or writes an underground
  part. Item 109 (k) (J111) on an island is this volume's to state: a churchyard on a sky plot (§4.9's churchyard row) is
  a surface burial ground only, never a catacomb candidate and never ranked as the largest cemetery, while each church on
  an island still counts once toward the catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V04
  §2.3); an island cathedral's crypt is a vault in the island's rim slab, part of its building, never an
  `UndergroundSystem` part or an item 109 (j) (3b) link (V05 §3.5, §3.10 (5); J-V5.43). The landfall's quarried rubble
  sources no underground quarry (V05 §3.16).
* **The daylight term itself** — `w_sun`, the model sampler, pass 1's terrain and wall shade, S10b's sunlit-side
  preference and the bars are the base's (item 102, item 296; §4.5, §13.2); this volume gives the islands' share. **Drift
  over epochs** of shade and siting is volume 6's (item 102 (e)); this volume states only when a strip is re-read (V05
  §3.19 (6)). **The shade map view** is volume 9's; **every class's siting profile, supply edges, coverage rows and
  signature pairs** are volume 11's (item 103) — this volume states the facts its landing classes and carried trades
  must satisfy (V05 §3.20). **Custom chains** — their discovery, activation and arrival are volume 8's, a chain's
  street-scale closeness and any quarter named past item 72's threshold volume 1's (item 107 (e)), the placement rules
  and rows volume 11's (item 104 (h)); this volume states what the island changes about a chain (V05 §3.20 (9)). **The
  `magical_node` deposit's position** (item 109 (f)) is volumes 8's and 4's; this volume reads only its state (V05 §3.3).
  **The crypt's room plan, stairs and furnishing** are volume 3's and its basement form volume 2's; this volume fixes
  where an island cathedral's crypt may lie (V05 §3.10 (5)). **Item 110's own work** — generating, drawing and decaying
  raised ways, retaining walls, stepped massing and deck plots — is the base's (§4.3, §4.7, items 244–246, 290, 309),
  volume 2's (massing and deck buildings), volume 1's (terraced wards and the island's levelling in its unit run), volume
  4's (the vaults under raised ways) and volume 6's (all of it over epochs); this volume states what an island changes
  about them and what they change about an island (V05 §3.22).

## 1b Wiring table — every new piece, what feeds it and what it feeds

Every stored or held field this volume adds or writes has its producer (its *create* cell), its consumers (its *read*
cell) and its base hook in its row of V05 §2.6; this table wires every other piece — the derived values, functions,
rules, tables, steps, ops and events.

| piece (home) | fed by (producer) | feeds (consumer) | base hook |
|---|---|---|---|
| the gate `skyGate` (V05 §3.2 (1)) | `recipe.layers.islands`, `RungProfile.layers.islands`, DR27's `site.magic` | S7b (5)'s slot draw; §7.8's control state; the report | II.6 (1)–(2), §7.7 |
| the slot draw (V05 §3.2) | `island.place`, `IslandRule.chance`, `h_town`, the forced slots, `islands.count`, the held slots of `removedSlots(doc)` | the reason draw (V05 §3.4), the fill (V05 §3.5) | II.6 (4), §4.5 S7b (5) |
| `S_town` (V05 §3.3) | field pass 1 over the built district cells at S7b; at an epoch the island-free value of its re-evaluation | `h_town` (count, area, altitude); `SkyIsland.supply.town`; `IslandEpochStep` | §4.5 *Fields*, II.6 (3) |
| the node term of `h_town` (V05 §3.3) — derived at every evaluation, never stored; a deposit change reaches it at the next epoch's evaluation | the digest's `site.deposits` (V08 §2.6's deposits row), `IslandRule.node.bonus`; for the clerk's `why` alone the report's `ruin.node` line (V04 §3.5.0a (9)) | `h_town`; the report's supply line; the clerk's `why`; the CSV statistics | II.6 (3) (item 547) |
| `S_carried` (V05 §3.3) | the fill's households' bands, `FieldBands.cuts`; an institution row's `requirementBand` | `h_carried`, `A`; `SkyIsland.supply.carried`; the island field (V05 §3.11) | §4.5 bands, II.6 (3) |
| `IslandRule` rows `townSupply`, `carriedSupply`, `node` (V05 §2.4) | the defaults; `editTable`; the ⟨P0⟩ run (V05 §8) | `h_town`, `h_carried` | II.6 `IslandRule` (item 546) |
| the calibration register entries of `islands.json`'s calibratable columns and of `lights.json`'s `radiusMarginM` (V05 §8) | the seats landing P1 and P2, each in its landing change, by `plat calibrate register --defaults --milestone V5-P1` (or `V5-P2`) — V12 §3.11's default line; this volume writes no line of its own (J-V5.80) | `plat calibrate register --check` (T-V12-20) at P1's and P2's exits; V12 §3.11's milestone-exit rule and register report; the corpus stage `M-CAL/sky` | §13.7, §13.9 (V12 §3.11) |
| `IslandInstitution` rows (V05 §2.4) | the defaults; `editTable`; the roster's demand (S2), `Government.kind`, DR9 / DR24 dossier institutions, a custom institution's resolved archetype (item 104 (a)) | the reason draw (V05 §3.4); the institution claim (V05 §3.10 (5)); `SkyUnitInput.context` | II.6 `institutions` |
| `IslandInstitution.handover` (V05 §2.4) | the defaults; `editTable` | S7b (5)'s hand-over and S10b's placement into the reservation (V05 §3.5); the report; the clerk | §4.2 S3 (2), (8) (item 286) |
| `IslandRule.carry` (V05 §2.4) | the defaults; `editTable`; item 107 (a)'s balance profiles, item 103 (a)'s EMITS and NEEDS, item 105 (h)'s `split` rows, the active chains (item 104 (b), `activeChains[]`) | the fill's carried workplaces (V05 §3.5 (3)) | §4.5 S7b (5) |
| `IslandRule.districtHa`, `fabricPrior`, `fabricRingHa`; the `sky-*` district kinds (V05 §2.4) | the defaults; `editTable`; V11 §3.9's kind rows | volume 1's unit run through `SkyUnitInput.context` (the island's district count, its kinds, S7c's prior); the coverage units (V05 §3.5 (3)) | §10.2 district kinds (item 213) |
| `sky_landing`, `sky_landing_top` class rows and their siting facts (V05 §2.4) | the facts here; the rows V11's | S10b and S11 on both arenas (their EMITS read by the neighbours), the reader, exports, the clerk | §10.2 (items 213, 308) |
| the sky `Allocation` (V05 §3.5) | S7b (5) under the supply law | the unit run's S10a / S10b on the island; S7b (1) (the remainder) | §2.5 `Allocation`, §4.5 S7b (5) |
| the coverage units (V05 §3.5 (3)) | item 103 (f)'s coverage rows; `k` from `skyDistrictCount`; the carried households | the carried workplaces; S7b (1)'s coverage step | §4.5 S7b (1), (5) (item 308) |
| the access admissibility transform (V05 §3.7 (2)) | the 64 m class raster; the admitted access rows' runs; the committed raised parts' piers and deck plans | S7b (5)'s candidate filter | §4.5 S7b (5) |
| `SkyUnitInput` — `skyUnitInput(doc, island)` (V05 §2.3; derived, never stored) | the committed island record, arena, claims, allocation and field | volume 1's unit run (V01 §3.10.3), called by SKY's `sky` request at generation and after generation by `raiseIsland` and New random on the island | II.1 (5), V01 §2.4, §3.10.3 |
| `removedSlots(doc)` (V05 §2.1; derived) | the records in state `removed` holding a slot; every island's `removedAccesses` | V09's `info.remove.holds` card and history row; the clerk (V05 §4.5) | §2.8 (item 260) |
| the strip's `basis` hash (V05 §2.3a) | §6.2's hash of the caster's `shadeBasis` | the shade view's pending outline (against the live island's hash); the clerk's "the ground will catch up" (V05 §4.2, §4.5) | §6.2 |
| `islandShadeStrip` (V05 §3.19; pure) | the caster's `shadeBasis`, the receiver's unlevelled terrain (or `shadeBasis`), §4.5's sampler | the held strips of V05 §2.6 | §4.5 *Fields* (item 296) |
| the strip's receiver heights — the unlevelled raster (V05 §2.3a, §3.19 (3)) | S1's `Terrain` with the T2 terrain strokes; item 110 (a)'s levelling kept as platform datums | every strip onto the ground, its `basis`, the load path | §2.3, §4.7 S10–S11 (item 309) |
| `skyRoute` (V05 §3.20) | the class distance rasters of both arenas, each admitted access's run, `routing.transferM`, the island's land centroid | S10b's relation rows and supply edges across arenas; the island's `dist.market`, `.plaza`, `.gate` (V05 §3.11); coverage's walking radius; the clerk | §4.7 S10b (item 308) |
| cross-arena links, splits and orders (V05 §3.20 (10)–(12)) | item 105's web and item 107's balance rows; `skyRoute`; the accesses; `activeChains[]` (V08); for S7b (1)'s term each island's land centroid from S7b (5)'s placement | S10b's binding, two-way pull, relaxation and split placement on both arenas; S7b (1)'s supply term (V01 §3.2 (5)); the clerk; T-V5-22 (h)–(k) | §4.7 S10a–S10b, §4.5 S7b (1) (item 308) |
| custom chains across the island (V05 §3.20 (9)) | the dossier's active reviewed chains (item 104 (b)) and `activeChains[]` (item 105 (i)); the nodes' resolved profiles (item 104 (a)); `skyRoute` | S10b's supply edges between a chain's island and ground nodes; the chain's shape reading; the clerk's `why`; the CSV row; T-V5-24 | §4.7 S10b, item 104 (h) (item 308) |
| the rim as a barrier (V05 §3.21) | the island's `rim` chain; V11's `sheer` defensibility row; an author's T3 wall on the island's key | the barrier-closure enceinte on the island; the clerk's unwalled side; T-V5-27 | §2.7 `Enceinte.closure` (item 106 (a)) |
| the ground landing destination (V05 §3.10 (4)) | SKY's ground L1 batch where no spine lies within reach | S8's first cut in the face; SKY-F's check | §4.6 (item 299) |
| sky light rows `rim`, `keel`, `skyAccess` (V05 §3.13) | the light table; `h_carried` | `LightSource` records; §8.4's light pass; night exports | §4.7 *Light sources* (item 307) |
| the underside's slab tiers and the sky surface layer (V05 §5.3; view data) | S14 from the island record and `undersideTiers` | §8.4's traversal and light pass; the offset view; glTF | §8.4 (a), §8.8 (item 415) |
| the sky semantics' slots and the `sky.ground` role (V05 §5.1) | this volume's per-family facts; V11's palette rows | §8.2's loader and every shipped sheet | §8.2 (item 408) |
| the sky's `WhyProvider`; the daylight term's per-island attribution (V05 §4.5) | `@plat/sky` | volume 10's `why` on islands, accesses, landfalls and shaded ground | V10 §2.13 |
| `IslandEpochStep` (V05 §3.15) | the epoch's field, rung and demand; the dossier's institution records; registered as V06's participant `sky.islands` at `afterField` | `ConversionOp` island kinds; `EpochOps.demandTaken`; the displaced pool (cause `island`) | §4.11 (item 320), V06 §2.1, §3.2 |
| `EpochOps.demandTaken`; the displaced pool's cause `island` (V05 §3.15) — inside the epoch event only, replayed and undone with it | `IslandEpochStep` (refloats, raises, releases, falls) | V06's `siting` step, the same epoch (V06 §3.8.1) | V06 §2.1 (V06 X10) |
| the landfall `fallIsland` (V05 §3.16) | `IslandEpochStep`, or a hand `convert` | every covered kind's outcome and state row (V05 §3.16's table); the `fallen_island` decoration and its members, the `quarry` land use, the salvage ledger and the regrowth lottery's salvage weight; V06's landfall clearance (V06 §3.5.2) and repair of a breached ring in use (V06 §3.7.5); V04's access closures (V04 §3.10); the epoch's raised-way pass (an aqueduct's lost supply); never the underground's quarry rules | §2.7 `Decoration`, `LandUse` (items 252, 253), `MaterialLedger`; §4.11 salvage (item 320) |
| raised parts, retaining walls, massing tiers and levelled platforms as casters under an island (V05 §3.9 (3)–(5), §3.22 (1)) | the raised-way generator (§4.3, item 290) and T4 `road` with `raised` or the aqueduct class; item 110 (a)'s levelling (S10, S11) and T3 `retaining`, T2 terraces; V02 §3.15.2's stack envelope; V11's raised-way height rows | the caster ceiling at SKY (`groundRefCm`); SKY-F's clearance check; the epoch's clearance re-check (V05 §3.15 (7)); a ground edit's re-read beneath an island (V05 §4.3) | §4.7 S10–S11, §8.4's casters (items 244, 290) |
| the participant `sky.clearance` and the op `reclearIsland` (V05 §3.15 (7)) | every caster the epoch committed under an island (`EpochScope.built`, `.raised` — the parts a landfall ruined included — `.levelled`) | the island's `groundRefCm`, `altitudeCm` and, where the floor fails, `elevationCm`; the fate list; never `shadeBasis` | V06 §3.2 (`afterGrowth`, order 50); §4.11 `ConversionOp` (item 320) |
| `skyAccessObstacles(doc)` (V05 §2.3b) | the committed `SkyAccess` records, their islands' anchors and rim bases, `accessSiting.lineClearM` | the raised-way course solver for every raised part laid after SKY — an epoch's raised-way pass and T4 `road`'s `raised` dry run; no generation stage lays a raised part after SKY (§4.3, item 290 (1)) | §4.3 (item 290 (5)) |
| the accesses' admissible ground without decks and raised-way piers (V05 §3.7 (2), §3.10 (3)–(4)) | the committed raised parts' pier rings and deck plans dilated by `accessSiting.deckGapM`; item 110 (d)'s deck faces | S7b (5)'s reachability transform, SKY's feet and yards, the rope-line clearance, F-SKY-ACCESS | §4.5 S7b (5) |
| the generator's reads of the sky (V05 §3.22 (5)) | this volume's rule | the raised-way generator's sources: ground-arena endpoints bound to reservations, ground hydrology, the water need by arena | §4.3 (item 290 (5)) |
| `levelledGroundCm` on a sky key (V05 §3.22 (4)) | the island unit run's platform datums; else the island's terrain SKY writes with the T2 strokes (its raster fallback built with item 580) | this volume's surface top, crypt re-test and clearance check (V05 §3.9 (4)–(5), §3.10 (5)); volume 1's island bridge build (V01 §3.10.3 (4)); never a field reader | §4.7 S10–S11 (item 309) |
| DR27 (V05 §4.4) | the dossier's population, `wealth.label`, `site.magic`, `site.deposits`, institutions (custom ones by their resolved archetype; ladder records by step type; district-defining records), government, `activeChains[]` | the gate, `S_town` through DR6, the node term, the institution rows, the fill's held shares, the chain rule | §7.7 (item 387) |
| the events `placeSkyAccess`, `quarter` with `sky`, `key` on point-form events (`drawWall` among them), `setField` on an island, `convert removeIsland` and `reclearIsland`, the bends (V05 §4.2) | the tools T2–T6, T8–T10; the participant `sky.clearance` | the fold; §7.4's lifecycle rows; V09's `bend.*` rows and V10's bend category | §7.1, §7.4 (items 356, 375) |
| the F-SKY rows and the sky invariants (V05 §3.17) | every `SKY`, SKY-F and epoch step | §5.4's report; the dry run | §5.2, §5.3 (item 331) |
| the budgets (V05 §6) | M6-sky's measurements (T-V5-18) | §12's rows | §12.4, §12.6 (item 476) |

## 2 Data model

### 2.1 The island record

`SkyIsland`, `UndersideProfile` and `ShadeBasis` are declared in `@plat/model` as given here (§2.7 names the fields the
base reads; item 251); every length is integer cm, every value on the field's [0, 1] scale.

```ts
interface SkyIsland {
  id: Id                          /* 'sky<part>/island:<token>' (§6.3) */;
  slot: 1 | 2 | 3                 /* the count law's ordered slot it fills (V05 §3.2); a fallen island frees it; a removed one holds it closed until `removed.releasedBy` is set (V05 §3.2 (6)) */;
  key: PlatKey                    /* { layer: 'sky', part }: part taken from Document.nextSkyPart at creation, never reused */;
  anchor: PointCm                 /* world position of the arena's local origin: an island-arena point p stands over the ground at anchor + p */;
  rim: ChainRef                   /* ('rim', island id): the closed structural L0 chain bounding its land (V05 §3.8) */;
  land: FaceRef                   /* its L0 land face(s) inside the rim */;
  areaHa: number                  /* the target area the rim is sized to — the supply law's A or an edited value; the land face's area within ± 1 % of it (V05 §3.6, §3.15) */;
  altitudeCm: Cm                  /* the surface datum above groundRefCm — the law's altitude floored by the rim, the root and the clearance (V05 §3.9 (4)), or an edited value */;
  groundRefCm: Cm                 /* above the ground datum: the greatest, under the projected solid, of the terrain height plus the caster ceiling there (V05 §3.9 (3)) — fixed at SKY, before the plots are cut; raised only by SKY-F's clearance check, `reclearIsland` (V05 §3.15 (7)) or a ground edit beneath (V05 §4.3) */;
  // elevationCm is derived at read: groundRefCm + altitudeCm — the surface datum of the island's terrain and the `z` base of every sky mark (§8.1, §8.4)
  underside: UndersideProfile     /* the rock beneath (V05 §3.9; J98) */;
  terrain?: Terrain               /* §2.3: its own, key = this island's; datumCm = the ground datum + elevationCm, kept in step (V05 §3.8) */;
  terrainEcho?: { river?: Id /* the ground river it echoes */; relief: 'echo'|'own'|'none';
    reliefClass?: 'plain'|'rolling'|'hilly'|'mountainous' /* §4.2 S0's classes: the class SKY drew for an `own` relief (V05 §3.8 (3)); absent for `echo` and `none` */ };
  river?: Id                      /* its conjured WaterBody on its own arena (V05 §3.8 (4)) */;
  districts: Id[]; allocation: Id /* its S7b (5) sky Allocation */;
  reason: 'prosperity'|'institution'; institution?: Id /* the Institution it carries */;
  placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean };
  occlusion?: 'opaque'|'ghost'|'offset'   /* a per-island override of the sky LayerSpec's (§8.4); absent: the layer's */;
  supply: { town: number; carried: number } /* S_town and S_carried at the last evaluation (V05 §3.3) */;
  field: { prosperity: number /* the gradient's mean (V05 §3.11); a setAttr makes it a declared target the gradient is shifted to */; density: number; greenery: number };
  shadeBasis?: ShadeBasis         /* the island as the field's shade last read it (item 102 (e)); written only by a shade evaluation (V05 §3.19 (6)), never by an island edit; ABSENT on an island raised or declared since the last evaluation, which casts and receives no strip until the next writes it (J-V5.72) */;
  accesses: Id[] /* its SkyAccess records, in ordinal order */;
  name?: NameRef;
  state: 'floating'|'waning'|'settled'|'fallen'|'removed' /* 'removed': an author removed it (`convert removeIsland`, V05 §4.2): nothing drawn, its arena archived */; stateSince: { epoch: number; week: number }; dwellUntilWeek?: number /* waning and settled only: the week its dwell ends (V05 §3.15) */;
  removed?: { seq: number /* the removeIsland event */; generated: boolean /* its lifecycle cause was a rule (a slot draw, an epoch's raise), not a declaration; read by the clerk's held-slot line (V05 §4.5) */; releasedBy?: number /* the seq of the T5 `sky` declaration that re-filled its slot when no slot was free (item 260's re-add serving that key); never an `adjust('islands.count')`; absent: the slot held closed (V05 §3.2 (6)) */ };
  removedAccesses: number[]        /* the ordinals of generated accesses an author deleted, held absent at every re-siting (V05 §3.10 (1)); [] by default */;
  landfall?: Id                   /* fallen only: the ground Decoration its fall laid (V05 §3.16) */;
  declared?: { outline?: true; position?: true; altitude?: true; area?: true; field?: true } /* the paths a declaring event holds (V05 §4.2; §7.2) */;
  lifecycle: Lifecycle }
```

```ts
interface UndersideProfile {      // the island's rocky root (owner, 2026-09-28: "cast an appropriate shadow related to their size, shape and the angle of the global light"; J98)
  kind: 'cone'|'bowl'|'root'|'flat' /* the radius ratio ρ(z) at depth fraction z ∈ [0, 1] below the rim's base: cone 1 − z; bowl √(1 − z²); root (1 − z)², a stalactite; flat: no root, the rim slab only */;
  rimThicknessCm: Cm             /* the cliff face at the rim: the rim's base lies this far below elevationCm */;
  depthCm: Cm                    /* the root's depth below the rim's base, to its apex; 0 for flat */;
  apexOffset: VecCm              /* local: where the apex hangs relative to the land face's centroid; (0, 0) for flat */;
  tiers: number                  /* the root's underside tiers below tier 0 (the rim slab) that the shadow and the offset view read (V05 §3.9 (2)); 0 for flat */;
  roughness: number              /* 0–1: the displacement share of each tier's ring (V05 §3.9 (2)) */;
  source: 'rule'|'edit' }         /* 'edit' once a setAttr set any field: then held by resizes, which scale depthCm only by the area's square-root ratio */

interface ShadeBasis {           // the one sky input a field recomputation reads (§2.9, item 274) — a copy, never a vertex (§2.2 rule 5's precedent: Works.before)
  epoch: number; by: 'generation'|'rederive'|'epoch'|'update' /* the evaluation that wrote it; 'update' is Update shade now (V05 §4.2) */;
  anchor: PointCm; elevationCm: Cm; groundRefCm: Cm;
  surfaceTopCm: Cm               /* underside tier 0's top as that evaluation read it (V05 §3.9 (4)): the terrain's surface at generation and at a re-derivation, the full surface top at an epoch and at Update shade now */;
  underside: UndersideProfile    /* a copy */;
  rim: PointCm[]                 /* the rim chain's lattice points in the island's local frame, in chain order from its lowest-(y, x) vertex, ≤ `shade.basisVertexCap`: a longer chain is reduced by the kernel's simplification at a 1 m tolerance (§3.4), which moves no strip bit at the 32 m cell (T-V5-20) */ }
```

**Local coordinates, one world anchor.** An island's arena is laid in its own local frame centred on (0, 0) (V05 §3.8),
and the island stands over the ground plan by one integer translation, `anchor`. A move is one attribute (V05 §4.2);
nothing on the island is re-snapped, re-keyed or re-derived by it. Every reader that meets the ground converts by that
translation alone — S14 (marks and label candidates, V05 §5.1), the slab list (V05 §5.3), exports (V05 §5.5), placement
and the landing points (V05 §3.7, §3.10) — and every logged position on the island is local (V05 §4.2), so a later move
never invalidates it. No rotation: an integer translation keeps every lattice point a lattice point (§3.2 (7)), and a
turned island is a reshaped one (a `warp` on its key, V05 §4.2).

**`removedSlots(doc)`** (`@plat/sky`, draw-free, derived, never stored) — `{ island: Id; slot: 1|2|3; name?: NameRef;
seq: number; generated: boolean; accesses: number[] }[]`: every island record in state `removed` whose slot is still
held, and every island's `removedAccesses`, in slot order; read by V09's `info.remove.holds` card and history row and by
the clerk (V05 §4.5).

**`Document.nextSkyPart: number`** (§2.9, item 203) — the part the next island takes (1 at creation), never decreasing;
an event that creates an island records the part in the island's address, so a replay reads it there. The slot (1–3) is
the count law's; the part is identity. A fallen island's part stays spent.

### 2.2 The access record

`SkyAccess` is declared in `@plat/model` as given here, with its §2.8 registry row (item 251).

```ts
interface SkyAccess {
  id: Id                          /* 'sky<part>/skyaccess:<token>' — keyed in its island's arena, where its top vertex lies */;
  island: Id; kind: 'hoist'|'ropeway'|'stair'|'lightBridge';
  top: VertexRef                  /* ('sky_access', access id): its vertex on the island's rim chain (§2.2 rule 7) */;
  topLanding: Id                  /* the island-side landing Reservation, kind 'landing' (V05 §3.10 (5)) */;
  ground: { at: PointCm /* world: the foot, a point attribute (§2.2 rule 5) carried with its host under a warp (§7.4) */; plot?: Id /* the ground landing plot, once placed */ };
  role: 'main'|'service'|'guarded';
  state: 'open'|'closed'          /* stored: a hand closure only; the readings `unserved` (island waning past half its dwell, or settled) and `ruined` (island fallen) are derived, never stored */;
  knownTo: 'public'|'local'|'secret'; rule: string /* the SkyAccessRow it took */; lifecycle: Lifecycle }
```

**No access is a way** (J-V5.61). A `SkyAccess` is never a way, an arena edge between arenas or a portal, and carries no
deck plots (item 110 (d)'s plots stand on way decks); a raised way never reaches an island (V05 §3.22 (3)). Its foot
stands on ground part-0 land only — never on a deck face, a raised-way pier or under a raised deck (V05 §3.10 (4);
J-V5.60).

Derived at read, never stored: the run (`hoist` and `stair`: the vertical drop from the rim base to the foot's ground;
`ropeway` and `lightBridge`: the 3-D length from the top to the foot), the slope, and the foot's ground height. A row's
`maxRunM` limits the **horizontal** distance from the top's world point to the foot, for both slanted kinds (V05 §2.4). A
`stair`'s path is a helix of radius `stair.radiusM` about the vertical through its foot, from the foot's ground to the rim
base, rising `stair.stepM` per step with a landing every `stair.landingM` of rise, its last turn ending at the top; the
marks and the glTF steps are laid along it (V05 §5.1, §5.5). The ground landing of a `secret` access carries the access's
`knownTo`: its `sky_landing` use is fronted by item 63's `front` mode (a warehouse or a stable, the `sky_landing` row's
`front` column) and withheld from every key that does not admit it (§9.2's `admit`), as the access itself is.

### 2.3 The island's unit inputs (a derived view; never persisted)

```ts
// @plat/sky exports skyUnitInput(doc, island): SkyUnitInput — draw-free, assembled from committed state; its one caller is
// volume 1's unit runner (V01 §3.10.3) when the NeighbourhoodRequest it serves has layer 'sky'
interface SkyUnitInput {
  island: Id; key: PlatKey; land: FaceRef /* L0 */; rimStrip: FaceRef /* L1, never cut, never plotted */;
  claims: Id[]                    /* the institution's Reservation (an institution island) and every landing Reservation — holes the fabric cuts around */;
  landings: { reservation: Id; attach: VertexRef /* ('attach', reservation, 0): the vertex a way must end at */; access: Id; role: SkyAccess['role'] }[];
  river?: Id                      /* its crossing sites are §4.2 S1 (5)'s on the island (V05 §3.8 (4)), qualified and spanned by the unit run (V01 §3.10.3 (4)) */;
  allocation: Id                  /* the S7b (5) sky Allocation the unit runner splits over its districts (V01 §3.10.3 (4)) */;
  field: { raster: { cellCm: number /* 3 200 */; origin: PointCm /* local */; w: number; h: number; values: Float32Array /* the island's prosperity before the brush strokes, V05 §3.11 */ };
    mean: number; density: number; greenery: number } /* what the unit runner's field step reads — never recomputed from h(S_carried) */;
  context: { reason: SkyIsland['reason']; institutionKind?: string;
    districtKind: string /* 'sky-island' on a prosperity island's faces; the institution row's `districtKind` on the claim's face (V05 §2.4) */;
    districtHa: number /* IslandRule.districtHa: the land per island district the runner's count reads (V05 §3.12) */;
    fabricHint: FabricStrategyId /* a PRIOR for S7c on every island district: the hinted template's weight × fabricPrior, never a forced strategy */;
    fabricPrior: number /* IslandRule.fabricPrior */ } }
```

SKY builds, per island, the `NeighbourhoodRequest` of V01 §2.4 — `district` the island's sky pseudo-district, `key` its
arena, `layer: 'sky'`, `boundary` the land face's runs (every rim run a hard `sky` seam, no portal), `laid` empty (so the
mode is `unit`), `strategy` absent (S7c picks it per island district, reading `fabricHint` as a prior) — and calls
`NeighbourhoodStrategy.generate`; `SkyStrategy.place` returns the inputs as `unitInputs` (II.6). The unit runner reads
`skyUnitInput(doc, island)` for everything the request does not carry; the view is re-assembled from the committed
record, arena and allocation whenever the unit runner runs (generation, `raiseIsland`, New random on the island;
V01 §3.10.3 (6)). **The partition is volume 1's:** the island's district count and its cut are V01 §3.10.3 (2)'s — this
volume neither counts districts nor seeds them (J-V5.28): k is `skyDistrictCount(plotLandM2, districtHa)` (V01 §3.16),
called with `context.districtHa` in place of the town's mean district area, and its share is volume 1's
`hood.constants.sky.plotShare` (V01 §3.14), never a copy here (J-V5.45).

### 2.3a The shade strip (derived with the prosperity field; item 102)

```ts
// @plat/sky exports islandShadeStrip(doc, island, samples, onto): IslandShadeStrip — pure and draw-free (V05 §3.19)
interface IslandShadeStrip {
  island: Id                      /* the caster */;
  onto: 'ground' | Id             /* the receiver: the ground's field raster, or a lower island's local 32 m lattice (V05 §3.11) */;
  basis: Hash64                   /* §6.2's hash of the caster's `shadeBasis` (and, onto an island, the receiver's), the sampler's digest and the receiver terrain's version under the window — the hash of the UNLEVELLED heights there (V05 §3.19 (3); J-V5.65) — the strip reads nothing of the live island */;
  evaluated: { epoch: number; by: 'generation'|'rederive'|'epoch'|'update' } /* the evaluation that computed it; read by the clerk's "the ground last took this shade" (V05 §4.5) */;
  window: { i0: number; j0: number; w: number; h: number } /* in the receiver's 32 m cells: the field raster's (§4.5) or the island lattice's */;
  bits: number                    /* per cell: the sampler's sample points × its sun positions (§4.5 *Fields*' sampler) */;
  mask: Uint8Array                /* w × h cells, row-major, ⌈bits ÷ 8⌉ bytes each; bit (point · suns + sun) set where the ray from that sample point toward that sun meets this island's solid — §4.5's layout, which V06's building shade mask shares (V06 §2.6) */;
  cells: number                   /* cells with any bit set; a strip with cells 0 gives the island no entry in the daylight term's per-island attribution (V05 §4.5) and no outline in the shade view (V05 §5.1) */ }
```

**Where it lives.** The strips of every live island onto the ground are held with the prosperity field's rasters
(§4.5), beside the daylight term's per-sample mask they are OR-ed into, and hashed exactly as those rasters are (§6.2);
the strips onto an island are held with that island's field values (V05 §3.11). The strips' readers, all reading the
strips held for the evaluation (computed once, at the first read, V05 §3.19 (6)): the field's composition; the sky
receivers' context values; volume 1's S9b manor sun factor, its close-up hood pins' shade gate and
`DistrictContext.shade.islandShare` (V01 §3.5.5, §3.8.2, §2.3) — on an island the same readers through `shadeSky`, with
S7c's `shade` term through `DistrictContext.shade.meanShare` (V01 §2.3; J-V1.87); the clerk's reader; and the shade map
view. Nothing edits a strip (J-V5.30). An island without a `shadeBasis` (V05 §2.1) casts no strip and receives none.
**A strip is a pure function of its caster's `shadeBasis`, the receiver** (the ground's committed terrain as the field
reads it — S1's raster with the T2 terrain strokes, unlevelled, item 309 — or the receiving island's `shadeBasis` and
terrain) **and the sampler** — never of the live island — so the load path, a replay and every field recomputation
rebuild the same bits (§2.9, item 274); only the shade view's pending outline and the clerk's "has the ground caught up"
read the live island (V05 §3.19 (8)). The strips are computed at every shade evaluation whatever `w_sun` is (0
included): the fold multiplies them by the weight, and the shade view reads the held strips (V05 §5.1).

### 2.3b The access obstacles (for item 110's raised ways)

```ts
// @plat/sky exports skyAccessObstacles(doc): SkyAccessObstacle[] — pure and draw-free, from the committed accesses; world cm above the ground datum
type SkyAccessObstacle =
  | { kind: 'column'; access: Id; at: PointCm /* the foot (a hoist's: its landing yard's centre) */; radiusCm: Cm /* a hoist: the yard's half-diagonal; a stair: stair.radiusM + 1 m */;
      floorCm: Cm /* the foot's ground */; topCm: Cm /* the rim base, elevationCm − rimThicknessCm */ }
  | { kind: 'segment'; access: Id; a: Point3Cm /* the top's world point at the rim base */; b: Point3Cm /* the foot at its ground height */;
      clearCm: Cm /* IslandRule.accessSiting.lineClearM */ };
```

One entry per open or `unserved` access of every island that is not fallen or removed: a `hoist` or `stair` a column (its
cage or its helix rises through open air), a `ropeway` or `lightBridge` a segment. Its callers (V05 §3.22 (3); §4.3,
item 290 (5)) are the raised-way course solver, for every raised part laid after SKY — an epoch's raised-way pass; no
generation stage lays one after SKY (§4.3, item 290 (1)) — and T4 `road`'s `raised` dry run: a deck, its parapet and its
raised-way piers stay outside every column, and a deck crossing under a segment keeps `clearCm` below it. The list is
rebuilt from committed state on every call; nothing stores it. Its length is the count of live accesses: generated ones
at most `accessCount.max` per island, hand-placed ones bounded by the rim (each top's yard takes `landing.yardWidthM` of
it and each foot keeps `footGapM` from every other, V05 §4.2), and the solver's cost is linear in it (V05 §6).

### 2.4 The rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

`IslandRule` — one row per rung that admits islands, in `@plat/tables` (`islands.json`, V11 §3.1's registry row, written
by this volume; item 546):

```ts
interface IslandRule {
  rung: 'CITY'|'METROPOLIS';
  chance: [number, number, number]                    /* the slot chances; defaults II.6 (4)'s */;
  townSupply: { v: number; h: number }[]               /* S_town → h_town, piecewise linear on the absolute value (V05 §3.3) */;
  carriedSupply: { v: number; h: number }[]            /* S_carried → h_carried, likewise */;
  areaHaMax: number; minAreaHa: number; altitudeM: [number, number] /* E_min, E_max */; clearanceM: number;
  casterAllowanceM: number                             /* the caster ceiling where no taller caster is known at SKY (V05 §3.9 (3)) */;
  surfaceTopPercentile: number                         /* the island's surface top: this percentile, over the land face, of its terrain plus eaves (V05 §3.9 (4)) */;
  shade: { ringMaskM: number; stepM: number; basisVertexCap: number } /* the strip's tier-ring masks, its ray step, the basis rim's vertex cap (V05 §3.19, §2.1) */;
  routing: { transferM: number }                       /* the route distance's allowance per access ridden (V05 §3.20) */;
  underside: { kinds: { kind: UndersideProfile['kind']; weight: number }[]; rimThicknessM: number; depthPerRadius: number; maxDepthM: number; apexOffsetShare: number; tiers: number; roughness: number };
  placement: { prefs: { over: 'water'|'fields'|'outskirts'|'core'; weight: number }[]; gapM: number; frameInsetM: number; nearM: number; latticeM: number; topK: number };
  outline: { templates: { template: 'disc'|'d_shape'|'lozenge'|'crescent'|'spindle'; weight: number }[]; detail: string /* a detail row of §4.2 S1 (2) */ };
  frameMarginM: number                                 /* the island arena's frame margin beyond its grown outline (V05 §3.8 (1)) */;
  terrain: 'none'|'echo'|'own'; echo: { amplitudeShare: number; domeM: number; domePerRadius: number; tiltPerMille: number };
  river: { chance: number; minAreaHa: number; flowShare: number; widthM: [number, number]; widthMinorShare: number; springPondChance: number;
    sourceShare: number /* the source's place on the long axis, from its upstream end */; pondShare: number /* the spring pond's area ÷ A */ };
  institutions: IslandInstitution[]; access: SkyAccessRow[];
  accessCount: { perHa: number; max: number }          /* a prosperity island's generated accesses: min(max, 1 + ⌊areaHa ÷ perHa⌋) (V05 §3.10 (1)) */;
  accessSiting: { footGapM: number; turnStepCdeg: number; turnMaxCdeg: number; deckGapM: number; lineClearM: number } /* feet apart; F-SKY-ACCESS's direction steps; a foot's and a yard's gap to a raised deck's plan; a slanted access's clearance over a raised deck or raised-way pier (V05 §3.10, §3.17, §3.22 (3)) */;
  stair: { radiusM: number; stepM: number; landingM: number } /* the floating stair's helix (V05 §2.2) */;
  landing: { yardWidthM: number; yardDepthM: number; rimStripM: number; wayReachM: number };
  fill: { batchShare: number; householdCapDistricts: number; coverageOvershoot: number } /* V05 §3.5 (2)–(3) */;
  institutionFit: { fitFactor: number; areaCapShare: number; prisonMarginM: number; siteLatticeM: number } /* V05 §3.4 (2), §3.5, §3.10 (5) */;
  cryptFloorM: number                                  /* an island crypt's floor above the rim slab's base (V05 §3.10 (5)) */;
  districtHa: number                                   /* the land per island district volume 1's count reads (V05 §3.12) */;
  fabricPrior: number; fabricRingHa: number            /* S7c's prior on the hinted template; a prosperity island's hint is `ring` from this area, else `bent-cut` (V05 §3.12) */;
  field: { epsilonShare: number; epsilonWavelengthM: number; greeneryBonus: number; rank: { elevation: number; view: number }; bandInset: number } /* V05 §3.11 */;
  carry: CarryRule                                     /* what the sky fill never carries, carries by share, or may split across arenas (V05 §3.5 (3)) */;
  node: { bonus: number }                              /* the magical node's term added to h_town (V05 §3.3; II.6 (3)) */;
  hysteresis: number; dwellYears: { waning: [number, number]; settled: [number, number] }; growthPerYear: number; altitudeRateMPerYear: number;
  redrawPerYear: number                                /* the empty slot's per-year redraw; default II.6 (4)'s */;
  landfall: { coverShare: number; stoneM3PerM2: number }; landingKernel: { weight: number; radiusM: number };
  naming: { lowBelowM: number; highFromM: number }     /* the altitude classes S13a reads (V05 §3.14) */;
  export: { gltfRingPoints: number; mistM: number }    /* V05 §5.5 */ }
interface CarryRule {                                  // item 23: a default, never a law — every list is editable
  never: { balance: string[] /* item 107 (a)'s balance profiles */; emitsTopStep: ('smell'|'smoke'|'waterPollution')[] /* item 103 (a)'s EMITS at the profile scale's top step */;
    chainRoles: ('resource'|'processing')[] /* of an active chain — custom (item 104 (b)) or the dossier's activeChains[] (item 105 (i)) — the island's own institution excepted */;
    hardNeeds: string[] /* a hard NEEDS row naming one of these features */ };
  share: { balance: string[]; splitShop: boolean /* the shop part of an item 105 (h) split class may go up by share, its works staying on the ground */ } }
interface IslandInstitution {
  kind: string /* palace, cathedral, prison … data */; tags: string[] /* the roster class tags it takes, in preference order */; requirementBand: string; areaHa: number;
  staffHouseholds: number; weight: number; requires: { government?: string[]; magic?: ('low'|'high')[] /* the `magic` circumstance the row needs */ };
  districtKind: string /* a `sky-*` district kind */; fabricHint: FabricStrategyId /* S7c's prior (V05 §3.12) */;
  archetypes?: { id: string /* a SettlementForge scene archetype, item 104 (a) (2) */; landmarkOnly: boolean }[] /* a custom institution whose resolved profile carries one counts as an instance of this row (V05 §3.4) */;
  handover: { tags: string[] /* who takes an S3 reservation this row's instance leaves on the ground: the first tag the roster demands on the ground, its largest instance */; else: 'park'|'none' } /* V05 §3.5 */;
  accesses: ('main'|'service'|'guarded')[]; near?: 'plaza'|'precinct'|'richest' /* the purpose term's target (V05 §3.7 (3)) */; far?: 'plaza'; nearM: number; overWeights?: Partial<Record<'water'|'fields'|'outskirts'|'core', number>> }
interface SkyAccessRow { kind: SkyAccess['kind']; magic: ('none'|'low'|'high')[]; weight: number; maxAltitudeM?: number; maxRunM?: number /* the horizontal top-to-foot distance (V05 §2.2) */; needsLandBelow: boolean; extension: true }
```

**Default rows** — our own values (provenance `own`, `extension`: no reference has islands, II.6 (8)), each calibratable;
the three marked ⟨P0⟩ are set by M6-sky's P0 run before the table lands, with the measurement and fallback of V05 §3.3
and §3.9 (5), and their provenance notes name that run. Every calibratable cell, those three included, takes its
calibration register entry from V12 §3.11's default line, written by the seat landing P1 (V05 §8; J-V5.80):

| row | CITY | METROPOLIS | note |
|---|---|---|---|
| `townSupply` ⟨P0⟩ | (0.45, 0) (0.58, 0.5) (0.70, 1) | same | absolute field values |
| `carriedSupply` ⟨P0⟩ | (0.55, 0) (0.85, 1) | same | a rich-band household in a modest town reads ≈ 0.75 (V05 §3.3) |
| `areaHaMax` / `minAreaHa` | 10 / 1.5 | 20 / 1.5 | one ground district at CITY is ≈ 12–16 ha of built land |
| `altitudeM` / `clearanceM` | [60, 160] / 25 | [80, 220] / 25 | a tall spire is ≈ 100–150 m: an island floats "overlooking the land" |
| `underside` | kinds cone 0.30, bowl 0.25, root 0.40, flat 0.05; rim 10 m; depth 0.45 × the equivalent radius, ≤ 110 m; apex offset ≤ 0.25 × radius; 6 tiers; roughness 0.15 | same | J98 (V05 §3.9) |
| `placement.prefs` | water 1.0, fields 0.8, outskirts 0.6, core 0 | same | II.6's default placement |
| `placement` | gap 80 m, frame inset 50 m, near 600 m, lattice 40 m, top 5 | same | |
| `outline.templates` | disc 0.25, d_shape 0.15, lozenge 0.20, crescent 0.10, spindle 0.30; detail `rough` | same | §4.2 S1 (2)'s rows |
| `terrain` / `echo` | `echo`; amplitude 0.25 of the ground's relief class, dome 6 m + 0.02 × radius, tilt 8 ‰ | same | |
| `river` | chance 0.75, ≥ 3 ha, flow share 0.02, width [3 m, 0.08 × the minor axis], spring pond 0.5; source at 0.15 of the long axis from its upstream end; spring pond 0.015 of `A` | same | V05 §3.8 (4) |
| `landing` | yard 12 × 14 m, rim strip 6 m, way reach 60 m | same | |
| `field` | ε share 0.05, ε wavelength 120 m, greenery bonus + 0.10; rank 0.6 × elevation + 0.4 × view; band inset 0.1 of each band's width | same | V05 §3.11 (J-V5.18) |
| dynamics | hysteresis 0.05, dwell waning [5, 15] y, settled [10, 40] y, growth 0.05 of area per year, altitude 4 m per year; the redraw rate II.6 (4)'s | same | per year, §4.11 (5) |
| `landfall` | cover share 0.5, stone 3 m³ per m² | same | |
| `landingKernel` | weight 0.05, radius 150 m | same | field pass 2 (V05 §3.10 (6)) |
| `surfaceTopPercentile` | 95 | same | a lone tall eave does not set the rim slab's top (V05 §3.9 (4)) |
| `frameMarginM` | 40 m | same | the arena's context margin beyond the grown outline (V05 §3.8 (1)) |
| `accessCount` / `accessSiting` | one access per 5 ha, at most 3 / feet ≥ 30 m apart, turns of 30° up to ± 90° | same | V05 §3.10, §3.17 |
| `accessSiting` (item 110's cells) | deck gap 4 m; line clearance 8 m | same | a yard's carts and a hoist's swinging cage keep 4 m from an arch's deck; a rope line's sag and swing keep 8 m over a deck and its parapet (V05 §3.22 (3)) |
| `stair` | helix radius 6 m, 0.5 m per step, a landing every 20 m of rise | same | a stepped stone stair round a column of air (V05 §2.2) |
| `fill` | batch 1 % of the band's demand (≥ 1 household), cap 3 × `H_d`, coverage overshoot 1.05 | same | V05 §3.5 (2)–(3) |
| `institutionFit` | fit 1.3 × the row's area, island cap 2.5 × the row's area, prison yard margin 20 m, claim site lattice 10 m | same | V05 §3.4 (2), §3.5, §3.10 (5) |
| `cryptFloorM` | 1 m | same | at least a metre of rock under a crypt's floor (V05 §3.10 (5)) |
| `districtHa` | 3.5 ha | 4.5 ha | about one Neighbourhood patch of land per island district; a full island is two or three districts (V05 §3.12; J-V5.45) |
| `fabricPrior` / `fabricRingHa` | 3 / 6 ha | same | V05 §3.12 |
| `carry` | never: balance `heavy-processor`, `wholesale-storage`; smell, smoke and water pollution at the top step; chain `resource` and `processing` nodes; hard needs `running_water`, `river_bank`, `harbour`, `gate`, `quay` · by share: balance `everyday`, `specialist`; split shops on | same | items 103 (a), 105 (h), 107 (a) (V05 §3.5 (3)) |
| `shade` | ring masks 4 m, ray step 8 m, basis vertex cap 256 | same | a quarter of the field cell's half-width (V05 §3.19); V05 §2.1 |
| `casterAllowanceM` ⟨P0⟩ | 30 m | 40 m | a five-storey house with its roof ≈ 22 m, a tall tree's crown ≤ 30 m; the measurement and fallback are V05 §3.9 (5)'s |
| `routing` | transfer 100 m | same | the wait and the loading at a landing, in metres of walking (V05 §3.20) |
| `node` | bonus 0.25 | same | a quarter of the supply's range: a middling town on a node supplies like a rich one without it (V05 §3.3) |
| `naming` | low below 90 m, high from 150 m | same | V05 §3.14 |
| `export` | glTF rings 64 points; mist quad 30 m | same | V05 §5.5 |

| institution row | tags | band | area | staff households | weight | requires | district kind / fabric hint | accesses | placement | custom archetypes (item 104) | hand-over of an S3 reservation |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `palace` | `palace` | `rich` | 3.0 ha | 40 | 0.35 | government `crown` or `seigneurial` | `sky-palace` / `street` (an axial avenue from the landing to the forecourt) | main, service | near the plaza, 1 000 m | `martial-keep`, landmark only | `town_hall`, `guildhall`; else `park` (the palace gardens) |
| `cathedral` | `cathedral`, `great_temple` | `prosperous` | 1.5 ha | 20 | 0.25 | — | `sky-temple` / `landmark` | main, service | near the precinct where one is reserved, else the plaza, 800 m | `sacred-sanctuary`, landmark only | `church`, `temple`, `chapel`; else `park` |
| `prison` | `prison` | `prosperous` | 1.2 ha | 15 | 0.20 | — | `sky-prison` / `square` | guarded | far from the plaza (≥ 1 000 m); water 1.5 | — | none (sited by S10b; no S3 reservation) |
| `tower` | `mage_tower` (its lowest-ordinal instance), `mages_guild` | `prosperous` | 0.6 ha | 4 | 0.20 | `magic` low or high | `sky-tower` / `square` | main | far from the plaza (≥ 600 m); fields 1.2 | `exotic-tower`, any level | none (sited by S10b) |

The `tower` row is the owner's "unique institution" read for an arcane tower "on its own ground, apart" (item 104 (a)
(2)'s wording for that archetype): it takes a catalogue instance of `mage_tower` (the lowest roster ordinal that is not a
member of a collective record, item 108) or the town's `mages_guild`, or a custom kind of that archetype, and only where
the world has magic (J-V5.31). The cathedral row's second tag is the great temple of a town whose religion row names one
(V11's `great_temple`, "as cathedral"), so a non-default religion's seat floats as the cathedral does (J-V5.58). A
prison's band is its paymaster's: the town's rulers keep it aloft, so it reads `prosperous`, not its inmates' band. A
hand-over tag is taken by the **largest** instance of that class the roster demands on the ground — the greatest planned
plot area at its band (§4.2 S2), ties by roster ordinal — so the cathedral's close passes to the town's greatest parish
church, which becomes the mother church in the old close (V05 §3.5; J-V5.43).

| access row | magic | weight | limits | land below |
|---|---|---|---|---|
| `hoist` | none, low, high | 1.0 | altitude ≤ 400 m | yes |
| `ropeway` | none, low, high | 0.8 | horizontal run ≤ 350 m | no (chosen where the ground below the rim is water) |
| `stair` | low, high | 0.3 at `low`, 0.4 at `high` | altitude ≤ 120 m | yes |
| `lightBridge` | high | 0.5 | horizontal run ≤ 600 m | no |

**The landing classes** (facts this volume fixes; their full class rows are V11's, §10.2's schema): `sky_landing` on the
ground — a yard plot of 150–400 m² fronting a way (or reached by a trail), one building by kind: a two-storey hoist house
under a gantry (6 × 8 m), a rope-line tower (6 × 6 m, 18 m), a stair's foot arch, a light bridge's plinth; staffed by
two `modest` households, allocated to its host district or the hinterland (V05 §3.10 (4)); a `front` column for a secret
access's landing. `sky_landing_top` on the island — the landing yard's plot on the rim with its winch house and crane
arm (8 × 10 m), rope-line tower, stair terrace or bridge pylon; no households of its own. **District kinds:**
`sky-island` for a prosperity island's districts; `sky-palace`, `sky-temple`, `sky-prison` and `sky-tower` from the
institution rows on the claim's face (§10.2's district-kind rows, item 213; keyed apart from the ground's `temple` and
every other ground kind, so the table has one row per key). Volume 1's unit runner types the island's faces with these
kinds (V05 §3.12); each row carries the affinities of its ground counterpart for S7b's split and S7c (`sky-island` those
of the town's richest ground kind), rows V11's.

**The landing classes' siting facts** (item 103 (a)'s profile columns; the rows V11 writes carry them): `sky_landing` —
sited by its access, never by a pull (its allocation row is positioned, V05 §3.10 (4)), so its NEEDS row is satisfied by
construction (a way frontage or a trail); EMITS heavy traffic at the middle of the profile scale and noise at its lowest
non-zero step (the winch, the carts at the yard), so the classes SENSITIVE-TO those keep a little away; CLIENTELE
town-wide; SUPPLY none of its own — it is the island's gate for the route distance (V05 §3.20); ALIGNMENT neutral, except
a `guarded` landing, which takes its prison's law-and-enforcement alignment, so crime keeps its distance from a prison's
hoist; COVERAGE none. `sky_landing_top` — the same facts on the island arena.

### 2.5 Identity

| kind | lineage unit and creation index | address | anchor (§6.3) |
|---|---|---|---|
| `SkyIsland` | the town; its slot at generation; at an epoch the town, the slot and the epoch component (J-A8.61); a declared island its declaring event's `seq` | `sky<part>/island:…` | its slot (base) |
| its `Terrain`, its river, its arena's L0 and L1 pieces | the island's `SKY` run, by §6.3's canonical order | `sky<part>/…` | the base rows of their kinds |
| `SkyAccess` | the island; its ordinal in siting order (V05 §3.10); a hand-placed one its event's `seq` | `sky<part>/skyaccess:…` | (its island's address, its role, its ordinal); same island (§6.3, item 476) |
| landing `Reservation` (island side) | the island; the access's ordinal | `sky<part>/reservation:…` | its access's address |
| ground landing plot | an ordinary ground plot (its block); its use `sky_landing` names the access | ground | the plot's base anchor |
| landfall `Decoration` | the fallen island (its address) | ground | its island's address |

The unit run's districts, blocks, plots and buildings on the island are ordinary entities of the island's arena under
§6.3's rules, their lineage continuing the island's (volume 1).

### 2.6 The lifecycle of every field this volume adds or writes

Each row is the field's one home: its producer (*create*), its consumers (*read*), and how it persists, regenerates,
undoes and migrates; the field cell names its base hook. The shade-evaluation moments a *create* cell cites are V05
§3.19 (6)'s.

| field (base hook) | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| the `SkyIsland` record as a whole (§2.7, item 251) | `SkyStrategy.place` (V05 §3.6–§3.10), `raiseIsland`, a T5 `sky` declaration (V05 §4.2) | S14's marks, the slab list, labels, exports, `IslandEpochStep`, the clerk's reader | model digest | per field, below | the creating event's undo | per field, below |
| `slot` | S7b (5)'s slot draw; a declaration takes the lowest free slot, or the lowest held slot when none is free (V05 §3.2 (6)) | the epoch redraw, `raiseIsland`, the anchor match | model digest | kept by succession (slot anchor); a slot a `removed` record holds is never drawn or filled at any re-derivation or epoch | restored from the undo record | — (new) |
| `key`; `Document.nextSkyPart` (§2.2, §2.9, item 203) | island creation takes `nextSkyPart` and bumps it | every island reader; `PlatKey.part`, the `sky<n>/` prefix | model digest; the counter in the document | a successor keeps its predecessor's key (§6.3) | the counter never decreases (spent) | older documents: `nextSkyPart` = 1 + the highest sky part present, 1 if none |
| `anchor` | placement (V05 §3.7) or a declaration | S14, slabs, exports, landings, the reader | model digest | kept by a scoped regeneration; recomputed only by Re-derive from S7b | inverse `setAttr` | a record with the base's world `outline` gets as anchor the outline's area centroid rounded to the lattice, and its polygon less the anchor as the rim (below), so the local frame centres on the island |
| `rim`, `land` and the arena's L0 — the outer ring, the void, the water faces (§2.2 rule 1, item 204) | `SKY`'s L0 batch (V05 §3.8 (2)) | the unit run (its land face), the rim draw, exports, the rim resize | geometry (the arena) | re-derived by New random on the island; kept by regenerate-keep | the batch's undo record | the base's `outline: Polygon` becomes the rim chain by one `insertChain` in a fresh arena |
| `areaHa` | the supply law or an edit | resize, the fill, the reader | model digest | the law re-evaluates only at an epoch | inverse | — |
| `altitudeCm`, `groundRefCm` | V05 §3.9 (3)–(4) at SKY (the caster ceiling, item 110's raised parts included), before field pass 2; SKY-F's clearance check; `reclearIsland` (V05 §3.15 (7)); `setAttr`; a move; V05 §4.3's ground edits beneath (a raised way, retaining wall or building added included) | `elevationCm`, the island's terrain datum, the slab list, marks, access runs, the shade basis, SKY-F's clearance check | model digest | kept; a raise of `groundRefCm` (SKY-F, a ground edit beneath) keeps `elevationCm` and sets `altitudeCm` = `elevationCm` − the new `groundRefCm`, raising `elevationCm` only where V05 §3.9 (4)'s floor then fails (a listed fate); New random re-checks the floor after re-drawing the underside (V05 §3.9 (5), §4.2) | inverse | base `elevationCm` → `altitudeCm` = `elevationCm` − `groundRefCm` recomputed |
| `underside` (`UndersideProfile`) | `SKY` (V05 §3.9 (1)) from the rule row and `island.place`; `setAttr(underside.*)` | `undersideTiers` (the slab list, the offset view's silhouette, glTF's underside), the model's smooth tiers (the shade strip, V05 §3.19), the altitude floor, the clearance | model digest | re-scaled by a resize; re-drawn by New random unless `source: 'edit'` | inverse | a base record without it gets the rule's default profile, drawn on its slot's key; a `flat` profile carries `depthCm` 0 and `tiers` 0 |
| `terrain`, `river` (§2.3; the river's `fall`, item 252) | `SKY` (V05 §3.8 (3)–(4)), by S1's machinery on the island key | `ContextVector.slope`, `.terrainClass`, `.upstream`, `.dist.water` on the island; the surface layer; glTF; the island's crossing sites (V01 §3.10.3 (4)); the waterfall mark; exports | model digest (the terrain raster in the arena's chunk) | New random on the island re-derives; T2 edits on the island key | inverse | — |
| `terrainEcho` (`river`, `relief`, `reliefClass`) | `SKY` (V05 §3.8 (3)–(4)): the ground river echoed, the mode by the rule row, and for an `own` relief the class drawn on `island.place` (index `relief`) | the island's terrain; volume 1's `terraceState` on the island's districts (V01 §3.17.7 (2)) and so the unit run's levelling (V05 §3.22 (4)); the unit run's context vector; exports; T-V5-31 (e) | model digest | re-drawn by New random on the island with the terrain; kept by every other edit (a T2 stroke changes heights, never the class) | inverse | an `own` island without `reliefClass` re-draws the class on its `island.place` key (index `relief`) at load, written and reported |
| `districts` | SKY-F, from the unit run's `NeighbourhoodResult.districts` (V01 §2.4) | reader, labels, epochs | model digest | rewritten by SKY-F after every unit run — generation, a raise, New random, a Re-derive (V01 §3.10.3 (6)); otherwise succession | inverse | — |
| `reason`, `institution` | S7b (5) (V05 §3.4) or an assignment; `IslandEpochStep`'s re-reasoning (V05 §3.15 (1b)) | the fill, the unit inputs, labels | model digest | Re-derive from S7b | inverse | — |
| `placement` | V05 §3.7 | the reader, the report | model digest | kept by scoped regeneration | inverse | — |
| `occlusion` | absent; `setAttr` | S14, §8.4 | model digest | kept | inverse | — |
| `supply` | every evaluation (V05 §3.3) | the report, epochs, the reader | model digest | recomputed at S7b and each epoch only | restored | — |
| `field` (the mean, density, greenery) and the island's gradient (V05 §3.11; `ContextVector`, §2.5, item 213) | `SKY`: the gradient from the carried bands' shares, its mean written; `setAttr(field.prosperity)` a declared target mean (`declared.field`); island brush strokes (`setField` with `key`, V05 §4.2) | the context vector on the island (through `SkyUnitInput.field`), S10a's band capacity on the island, the clerk | model digest (the three values); the gradient raster is never stored — rebuilt on load from the island's terrain, rim, allocation, the cuts and the stroke list, as §2.9 rebuilds the ground's fields | recomputed at an epoch (V05 §3.15) and by a re-derivation from S7b; a declared target and the strokes are held | inverse | older records: the mean is their uniform value, no strokes |
| `ContextVector.arena 'sky'` (§2.5, item 213) | the unit run's context read | every arena-keyed row | derivation record | recomputed | — | — |
| `shadeBasis` (§2.7, item 251; §2.9, item 274; §7.5) | every shade evaluation for every live island (V05 §3.19 (6)), Update shade now for its island (`by: 'update'`, the document's current epoch) — from the island as it then stands; absent on an island that an epoch's `raiseIsland` (after S6), a T5 declaration or a hand `convert raiseIsland` created since the last evaluation, until the next | every strip (onto the ground and onto islands) on generation, load, replay and every field recomputation — an island without one casts and receives none; the strip's `basis`; the clerk | model digest (≤ 2.5 KB per island; nothing when absent) | rewritten only at those evaluations; kept by every island edit, every scoped regeneration of an island and SKY-F (item 102 (e); J-V5.27) | restored by the undo record of the event whose evaluation rewrote it (absent again where that event wrote the first) | a document whose `schemaVersion` predates the island-basis step of §7.5's schema chain: that step computes, once, the basis of every island not fallen or removed from the island as stored; at or after that version an absent basis is never computed at load — it is an island raised or declared since the last evaluation (J-V5.72) |
| `IslandShadeStrip` onto the ground (V05 §2.3a; §4.5 *Fields*, item 296) | at every shade evaluation (V05 §3.19 (6)), at its first read — volume 1's S9b at S10a's `afterDrivers` hook where registered, else field pass 2 — and each epoch's S6 re-evaluation, whatever `w_sun` is; none from an island without a `shadeBasis` | the field's daylight composition; volume 1's S9b sun factor, hood pins' shade gate and `DistrictContext.shade.islandShare` (the same held strips); the clerk's reader; the shade map view (V09's accessor reads the held strips); the GeoJSON and CSV exports; T-V5-19 – T-V5-21 | held with the field's rasters, rebuilt on load and replay from `shadeBasis` and the committed ground terrain's unlevelled heights (item 309) — never from the live island; never in the log | recomputed only at those moments; kept by every island edit and every scoped regeneration (item 102 (e); J-V5.27) | restored with the field's former state from the undo record of the event that recomputed it | a document whose tables predate item 102 reads `w_sun` = 0 (item 102 (g)'s no-op pin), so the strips it computes change no value |
| `IslandShadeStrip` onto an island; the sky receivers' `shadeSky` (V05 §3.11) | SKY's last step, after every island's own steps; a re-derivation starting after SKY, at S10a's start after the bases; each epoch (V05 §3.15) — from the caster's and the receiver's `shadeBasis` (none where either is absent); at an epoch OR-ed with V06's building mask on the island's lattice (V05 §3.19 (7)) | that island's context vector (`prosperity`); volume 1's sky-arena readers — S7c's `shade` term (through `DistrictContext.shade.meanShare`), S9b's manor sun factor, the close-up hood pins' shade gate and `DistrictContext.shade.islandShare` (V01 §2.3, §3.5.5, §3.8.2; J-V1.87) | derived: rebuilt on load with that island's field from the two `shadeBasis` values | with the strips onto the ground | as above | — |
| `IslandShadeStrip.bits` and the mask layout | with the strip | the field's composition, the clerk, the view | with the strip | a sampler digest that differs from the strip's basis recomputes it whole (as V06 §3.4 (5) does for its mask) | with the strip | — (re-derived on load, never migrated) |
| `accesses`; `SkyAccess.*` (§2.7, §2.8, item 251; §6.3's anchor, item 476) | V05 §3.10 or `placeSkyAccess` | S14 marks, lights, exports, the ground landing row, landings, the reader, `skyAccessObstacles` | model digest | tops re-seated on a re-derived rim by New random (V05 §4.3), and on a resized or reshaped one with their feet re-landed as a move re-lands them (V05 §4.2) | inverse | — |
| the rim strip (its `setback` line and `rim_strip` face) and the island's claims — each island landing `Reservation` (kind `landing`) and the institution claim (§2.5 `Block.interior`, `Reservation`, item 213) | `SKY`'s island L1 batch (V05 §3.10 (5)) | the unit run through `SkyUnitInput.rimStrip`, `.claims` and `.landings` (the outline less the strip, the claims as holes; V01 §3.10.3 (2)); S10b (the top landing plot, the institution); the rim walk by volume 1's `plantRimWalk` (V01 §3.10.3 step 4); the rim lights (V05 §3.13); SKY-F's checks (V05 §3.12) | geometry (the island's arena); the reservations in the model digest | re-laid by one island L1 batch at a resize and a rim reshape — the strip `rimStripM` inside the new rim, each yard re-claimed at its re-seated top, the institution claim kept or re-searched inside its district (V05 §4.2) — and with SKY's island steps at New random on the island and at a Re-derive from SKY or earlier; a yard claimed by `placeSkyAccess` and released by an access's delete | the undo record of the event (or the batch) that re-laid them restores the strip line, the yards and the claim as they stood | — (new; a migrated base island's fresh arena is laid by the same batch) |
| the ground landing yards — `landing` reservations under the data key `reservations.landing` (§2.5, item 213; §4.1, item 282) | `SKY`'s ground L1 batch (V05 §3.10 (4)); re-claimed by a move or a re-landing (V05 §4.2) | S8 (a hole; its attach a destination, item 299); S10a with its hook S9b (V01 §3.1's read-set); S12a; `SkyAccess.ground` | geometry (the ground arena); the reservations in the model digest | re-claimed with their access at every re-siting (Re-derive from S7b or SKY) | the event's or the batch's undo record | — |
| the ground landing allocation row `{ cls: 'sky_landing', at, access }` under `allocations.landing` (§2.5 `Allocation`, item 213) | `SKY`'s access step (V05 §3.10 (4)) — never a rewrite of a row S7b wrote | S10a, which reads it with S7b's `allocations` and takes its staff households from the host district's `modest` demand; S10b, or the hinterland unit's S12a (a plot on a way or a trail); S11 (the landing house); field pass 2's landing kernel (V05 §3.10 (6)) | model digest (the allocation) | recomputed with the access | inverse | — |
| `name` (§9.1, §10.4) | S13a (V05 §3.14) | the island's `QuarterNode` root and its `quarter` `LabelEntity`, the gazetteer, exports | model digest with its naming record | §6.3's naming cases | inverse | — |
| `state`, `stateSince`, `dwellUntilWeek`, `landfall` (§4.11, item 320) | `IslandEpochStep` or a hand `convert` (`removeIsland` among them, V05 §4.2) | epochs, §8.2's state rows, the reader | model digest | never by a re-derivation | the conversion's undo record | — |
| `declared` | a declaring event | every re-derivation (held) | model digest | held | inverse | — |
| `removed` (`seq`, `generated`, `releasedBy`) (§2.8, item 260) | `convert removeIsland` (T10 `hold`'s delete on an island — V09's delete row — or the clerk); `releasedBy` by a later T5 `sky` declaration that re-fills the slot when no slot is free — never by an `adjust('islands.count')`, whose integer counts held slots as filled and opens only free slots (J-VI.14; item 260) | S7b (5)'s slot chain at every re-derivation, V05 §3.15 (5) at every epoch, the report, the clerk's held-slot line (`generated` naming who made the island), `removedSlots(doc)` | model digest | held: never drawn, filled or re-opened by a re-derivation or an epoch (J-V5.62) | the `removeIsland` undo restores the island whole (its arena from the archive, its households, its accesses and landing uses); undoing the releasing event clears `releasedBy` | absent in an older document: no removal |
| `removedAccesses` (§2.8, item 260) | the fold of a `delete` whose target is a generated `SkyAccess`: its ordinal appended | V05 §3.10's siting at every re-derivation that re-sites accesses (Re-derive from S7b or SKY); the `main` succession; the clerk; `removedSlots(doc)` | model digest | held: the ordinal is skipped and counted, the lowest surviving generated ordinal taking `main` | the delete's undo removes the ordinal and restores the access | absent: `[]` |
| island `RetainingWall`s (§2.7, item 245) | volume 1's unit run on the island (item 110 (a)'s levelling at S10, S11); T3 `retaining` and T2 terrace strokes with the island's `key` | the island's marks (in its frame, displaced with it) and labels, the surface top, SKY-F's crypt re-test, the `sky` export collection, the fall's tombstones | geometry (the island's arena) | generated ones re-derive with the island's terrain and plots (item 110 (a)'s rule); drawn ones held | the batch's or the event's undo record | none before item 110 |
| `Reservation.owner`, `.handedFrom` of an S3 reservation an institution island leaves (§2.5, item 286) | S7b (5), when the slot's institution holds the reservation: the owner becomes the hand-over instance, or `commons` with the kind re-typed `park` (V05 §3.5) | S10b (the hand-over instance's placement), S12b (a park), the reader, the clerk | model digest | re-made by a re-derivation from S7b; kept by every island edit | the event's undo record | absent `handedFrom`: no hand-over |
| the island cathedral's crypt site (V05 §3.10 (5)) | SKY's claim site search with the crypt-floor test | the cathedral's basement crypt (volumes 2 and 3's `Basement` record, which persists it); the fate list; the reader | not stored by this volume: the building's basement record holds the crypt | re-tested with every re-claim (a resize, a rim reshape, New random; a move leaves it standing) and at SKY-F's levelled datum | with the claim | — |
| `Decoration.name`, `.source` (§2.7, item 252) | `fallIsland` | labels, the reader | model digest | never | inverse | — |
| `Decoration.members` (`DecorationMember[]`, §2.7, item 252) | `fallIsland` (V05 §3.16 (5)): the covered plots, land uses, reservations, ways and retaining walls by `Id`; the covered raised spans and raised-way piers by their raised way and item 244's support keys | §8.2's `fallen` row (its rubble over each member's face or band — a span's deck band in plan, a support's `ring`; item 408), V06's landfall candidate (V06 §3.5.2), V04's access closures (V04 §3.10), the clerk (V05 §4.5), the per-landfall CSV (V05 §5.5) | model digest | never by a re-derivation of its own; shrunk only by V06's member-leaving `setAttr` of `members` (V06 §3.5.2; J-V6.108) in the batch of whichever op ends a member's cover — a landfall strike, `repairRetaining`, the quarry face's `retypeLand`, `repairRaised`, `dismantle`, or any op that tombstones a member (a raised member whose key its live raised way no longer holds among them); the decoration is tombstoned in the batch that removes the last | the `fallIsland` undo removes the decoration with its list; the writing event's undo restores the prior list | an older list of `Id`s reads as it stands (every `Id` is a member form); absent = none |
| `LandUse.source` of the landfall's quarry (§2.7, item 253) | `fallIsland` (V05 §3.16 (4)) | V04's quarry rules (a `quarry` with a `source` sources nothing underground), the reader, the salvage | model digest | never | the `fallIsland` undo | absent: no landfall source |
| `Way.formerClass` — V06's field, its lifecycle row V06 §2.12 | this volume writes it in `fallIsland` (V05 §3.16 (4)): a covered way's class before it drops to `track`, only where the way carries none | V06 §2.12's row | V06 §2.12's row | V06 §2.12's row | V06 §2.12's row | V06 §2.12's row |
| `Enceinte.condition`, `RetainingWall.state` — the stretch-state profiles of §2.2 rule 5 (items 575, 245) | this volume writes them in `fallIsland` (V05 §3.16 (4)): `breached` over each covered wall stretch's covered length extended over each covered tower's and gate's footprint chord; `decayed` over each covered retaining wall's covered length | §2.7's rows (items 575, 245) | §2.2 rule 5 | §2.2 rule 5 | the `fallIsland` undo restores the prior profiles and `lifecycle` (absent again where the fall wrote the first) | §2.2 rule 5 |
| the `IslandRule` and `IslandInstitution` cells V05 §2.4 adds (`archetypes`, `tags`, `handover`, the `tower` row, `casterAllowanceM`, `shade`, `routing`, `node`, `carry`, `districtHa`, `fabricPrior`, `fabricRingHa`, `cryptFloorM`, `frameMarginM`, `field`'s cells, `surfaceTopPercentile`, `river.sourceShare`, `.pondShare`, `accessCount`, `accessSiting`, `stair`, `fill`, `institutionFit`, `naming`, `export`) (§7.6; V11 §3.1's `islands.json` row) | the table defaults (V05 §2.4) | the mechanisms V05 §1b names per table, and V05 §3.3–§3.21 where each is cited | the table (§7.6) | an `editTable` re-derives from the first reader stage (§7.6's rule; S7b for `node`, `carry`, `fill`, `institutionFit`, `districtHa`; SKY for the arena, access, crypt and shade cells; S7c for `fabricPrior`; S13a for `naming`; none for `export`) | `editTable`'s inverse | a table version without them reads the defaults |

## 3 Generation

### 3.1 Where the sky runs in the stage graph

| step | when (§4.1's graph) | worker | writes |
|---|---|---|---|
| **S7b (5)** — gate, slots, reasons, fills, outline and placement per slot (V05 §3.2–§3.7) | inside S7b, before S7b (6) and (1) | generation, eager, town-wide | the sky `Allocation`s; data only (no batch) |
| **SKY** — `SkyStrategy.place` (II.6), per island in slot order: the arena (V05 §3.8), the underside, the ground reference and the altitude (V05 §3.9 (1)–(4)), the access tops and feet, the island's claims, the ground landing claims (V05 §3.10), the field (V05 §3.11); then, once every island has its solid, its **shade evaluation**: every island's `shadeBasis` written, then the strips onto the islands and the sky receivers' shade (V05 §3.11, §3.19 (6)) | after S7b (its S7c hook included, V01 §3.1) and before S12a, S8 and S10a, by declared I/O (below); S7c reads none of SKY's outputs — a landing claim is a hole S8 cuts around (V01 §3.4.1) | generation, eager | on each island's arena: one L0 batch, then one L1 batch; on the ground arena: one L1 batch of landing claims (`claimSubFace`, as S7b (3)'s claims) |
| **S10a — the strips onto the ground and field pass 2** (§4.5, item 296) — the islands' strips onto the ground, from each island's `shadeBasis`, computed once per shade evaluation at their first read and held, OR-ed by pass 2 into the daylight term's per-sample mask (V05 §3.19 (6)) | S10a, after SKY and before the pool | generation, eager, town-wide | the strips, held with the field's rasters (V05 §2.3a); at a re-derivation starting after SKY and at or before S10a, first — at S10a's start, before step (i) and every hook — the `shadeBasis` of every live island, then the strips onto islands |
| **the unit run** (V01 §3.10.3), one per island | after the ground's S10 (0); concurrent with the pool, on its own overlay, merged in lineage order like the hinterland unit (§4.1, item 282) | generation | only its island's arena |
| **SKY-F** — the post step: the clearance check (V05 §3.9 (5)), the landing check and repair (V05 §3.12), the crypt re-test (V05 §3.10 (5)), the sky lights (V05 §3.13) | after the pool's merge, before S12c and S13a | generation, eager | island records; `LightSource` records; at most one L1 repair batch per island |
| S12c, S13a, S14 | as the base; S12c gives the island's districts character and identity as the ground's (§4.5) | — | the island's names and labels (V05 §3.14); its marks (V05 §5) |

**Declared I/O** (J-V5.70). SKY's `StageDecl` (§4.12) reads S7b's outputs — with S7b's hooks united into their host's
declared inputs and outputs (V01 §3.1), S7c's among them — and writes on the ground only its two data keys,
`reservations.landing` (the ground landing yards) and `allocations.landing` (the positioned `sky_landing` rows), as §4.1
states (item 282); on each island it writes that island's arena, records and field. SKY is one of the ground's L1
writers in §4.1's order. No stage or hook before SKY declares either landing key (V01 §3.1's hook table reads
`reservations` as S3's and S7b (3)'s keys only); S8, S10a with its hook S9b, and S12a declare both, so §4.1's sort puts
SKY after S7b and before S8, S10a and S12a, with no cycle (T-V5-32). SKY rewrites no row S7b wrote: a landing's two
staff households belong to its landing row, and S10a takes them from the host district's `modest` residential demand
when it reads the two keys together (§2.5, item 213).

Nothing of the sky runs on the one-click path: `recipe.layers.islands` is off by default (D-3), and with it off S7b (5)
makes no allocation and SKY registers but writes nothing under either key — the ground model is byte-identical to the
realism golden (T13-1).

**Item 110's raised ways in the order** (J-V5.63). Every generated raised part is committed before S7b (1) — §4.3's
slot (item 290 (1)) — so it exists when S7b (5) places the islands and when SKY fixes the ground reference, and it never
reads an island: the generated raised-way set is the same with islands on or off (T-V5-30). A raised part that exists
when SKY runs is read by SKY (V05 §3.7 (2), §3.9 (3), §3.10); one committed after SKY — by an epoch's raised-way pass or
a T4 stroke — is read by SKY-F's clearance check (V05 §3.9 (5)), the epoch's clearance re-check (V05 §3.15 (7)) or the
adding edit's dry run (V05 §4.3), and its course keeps clear of the accesses through `skyAccessObstacles` (V05 §2.3b).

### 3.2 Existence and count

1. **The gate.** Islands exist only if all hold: `recipe.layers.islands = 'on'`; the rung's `RungProfile.layers.islands`
   admits them (§1.1); the recipe is not a parity preset's (`MFCG` and `FTG` hold `off`: no reference has islands, item
   23); and, for a dossier-bound document, the circumstance `magic` that DR27 derives from the dossier's `site.magic` is
   not `none` (V05 §4.4). A failed gate makes no allocation and reports `islands: off`, `gated: rung` or
   `gated: dossier magic`.
2. **The town supply** `S_town` and `h_town` (V05 §3.3).
3. **Forced slots.** Every declared island of the creation prefix (T5 `quarter` with `sky`, V05 §4.2) and every
   assignment whose criteria carry `sky: true` forces the lowest free slot open, in log order. A fourth is bent at its dry
   run to join the nearest open island as a district on it ("At most three islands float here; this quarter joins
   {island}"; J-VI.4 (a), item 101 R2).
4. **The count.** `recipe.params['islands.count']` — `auto` (default), or 0–3, the `adjust` of V05 §4.2. At an integer
   `n`, exactly `n` slots are open (the forced ones counted first, a slot held by a removal counted as one of them, (6);
   `n` below the forced count is raised to it at its dry run, a bend, J-VI.4 (a)), with no draw. At `auto`, each slot k
   above the forced ones, in order, opens with probability `chance[k] · h_town` and only if slot k − 1 is open: one
   uniform on `island.place` keyed by the town's lineage with creation index `slot:k` (V05 §3.18).
5. **The report** lists the count, the forced slots and each slot's outcome (V05 §3.4–§3.7), a held slot's outcome being
   `removed by you` (6). With the setting on, the gate passed and no island present, it carries one plain sentence for
   the author and the clerk — "Islands are on, but the city is not prosperous enough to keep one aloft" when `h_town` is 0
   or every slot closed `no supply`, "… none rose this time" when the slot draws came up empty — and names both remedies:
   raise the town's wealth (T1 `intend`), or place an island by hand (T5 with `sky`, held against its supply, J-V5.10).
6. **Removed slots** (the owner's "a user can decide to add or remove" and item 110 (b)'s "a removal is an edit that
   holds through regeneration", applied to islands; J-V5.62). A slot held by an island record in state `removed` whose
   `removed.releasedBy` is absent (`convert removeIsland`, V05 §4.2 — a generated or a declared island alike) is **closed
   with the outcome `removed by you`**: no draw on its `slot:k` or `reason:k` index, no fill, no outline, no placement,
   no SKY run. It **counts as open and filled** — for the slot chain of (4), so a higher slot draws on its own creation
   index exactly as before the removal, and toward an integer `islands.count`, so the removal is never replaced by an
   island in another slot (the owner removed that island, not the town's quota). It re-opens only by item 260's lift
   rule: (i) the removal's undo, or (ii) a T5 `sky` declaration when no slot is free — the user's re-add serving that key:
   the lowest held slot then counts as free for it, and the declaring event sets `removed.releasedBy`. **A count never
   releases a hold:** an integer `islands.count` counts every held slot as filled and opens only free slots — a cap
   increase opens only new keys (item 260) — and `auto` never draws a held slot; an adjust whose integer exceeds the slots
   it can open lists the fate "slot k is held by your removal of <name>; undo the removal or draw an island to use it",
   and opens what it can. The removed island's households were relocated by its removal (V05 §4.2), so S7b (1) allocates
   them to the ground at every re-derivation and the population stays whole (T-V5-29).

### 3.3 The two supplies, on absolute values (answering RV-pc-3)

A town supply read against the town's own cuts compares a mean with a per-town quantile, which measures the
distribution's shape, not the town's wealth, and a mean never reaches the field's top
(`docs/retrovalidation/pipeline-content.md` RV-pc-3). Both supplies are therefore read on the field's **absolute** value,
which the dials, `wealthLevel`'s character offset (§7.7 layer 1) and the epochs' drivers move (J-V5.3):

* **`S_town`** — the mean prosperity value `P` over the settlement's built land: the cells of §4.5's 32 m field raster
  whose centres lie in a district face (the hinterland, underground, undercity and sky pseudo-districts excluded), less
  the cells in water and in reservations of kind `park`, `harbour_basin`, `moat` or `canal`; at S7b the value after field
  pass 1, at an epoch the island-free value of that epoch's re-evaluation (§4.5, item 296; §4.11).
* **`S_carried`** — the mean, over the households an island carries, of their band's value `v(b)`: the midpoint of the
  band's two cuts on the absolute value (`FieldBands.cuts`), the lowest band's lower cut 0 and the top band's upper cut
  1. An institution island's `S_carried` is `v(requirementBand)` of its row.
* `h_town(S_town)` and `h_carried(S_carried)` interpolate the rule's `townSupply` and `carriedSupply` rows linearly along
  the value, 0 below the first row and 1 above the last. The **supported area** `A` and the **law's altitude** `E` are
  II.6 (5)'s, read with these two values.
* **The magical node** (J-V5.41; II.6 (3), item 547). Where the dossier digest's `site.deposits` carries a
  `magical_node` in state `available` — or `discovered`, from the epoch after the one that discovered it — `h_town` is
  `min(1, the interpolated value + node.bonus)`: magic that wells up on the site costs the town less to keep aloft. It is
  one addend however many such deposits the dossier lists; `depleted` and `removed` add nothing. It acts only where the
  interpolated value is above 0 — a town too poor to supply magic at all is not lifted by a node (the owner's "if there
  is no prosperity, there is no floating islands") — and reaches every reader of `h_town` (the slots, `A`, `E`, the
  epochs). A map without a dossier has no deposits and no node term; the report and the clerk's `why` name the deposit
  when it acts. **Where the node stands is not this volume's:** item 109 (f) puts it at the heart of an underground ruin
  where one exists (its position volumes 4's and 8's, else S12a's decoration site), and the term stays positionless: it
  reads the deposit's state alone, never the underground arena (item 2). The clerk's `why` names "the node beneath the old
  ruins" from the generation report's `ruin.node` line (V04 §3.5.0a (9): the deposit, the ruin system and the ruin's
  `NameRef`, so a renamed ruin reads its new name), never by reading the ruin; with no such line for the deposit it names
  the deposit alone.

**Calibration ⟨P0⟩ (the confirming measurement, V05 §8).** On 200 CITY and 100 METROPOLIS seeds at their targets, at
`wealthLevel` ∈ {0, 0.25, 0.5, 0.75, 1} with the setting on, record `S_town`'s median `m_w` per level; set `townSupply`
to (m_0.25, 0) (m_0.5, 0.5) (m_1, 1). Bars: the median `h_town` at `wealthLevel` 0 ≤ 0.05, at 0.5 within [0.35, 0.65], at
1 ≥ 0.9, all on standalone intents, so with no node term. **Pre-decided fallback:** if `m_1 − m_0` < 0.10 (the field does
not tell a rich town from a poor one), `S_town` becomes `0.5 · (the field mean) + 0.5 · w`, `w` the intent's
`wealthLevel` (with a dossier its derived value, DR6), the rows are re-fitted by the same rule, and the change is
recorded as a declared shift. `carriedSupply` is checked at the same run: `h_carried(v(rich))` ≥ 0.7 and
`h_carried(v(modest))` = 0 at `wealthLevel` 0.5 on ≥ 90 % of seeds; else its rows are moved so that the midpoint of
`v(modest)` and `v(comfortable)` maps to 0 and `v(rich)` to 1, re-measured once.

### 3.4 Purpose — a prosperity island or an institution island

For each open slot, in slot order:

1. **A forced slot** takes its declaration's kind (an institution kind makes it an institution island; any other kind a
   prosperity island) or its assignment's institution.
2. **Otherwise the candidates are:** `prosperity`, weight 1.0, where the roster's households of the bands with
   `h_carried(v(b)) > 0` not yet carried by an earlier slot give at least `minAreaHa` of plot land; and each
   `IslandInstitution` row, at its `weight`, where the roster demands at least one eligible instance of a class carrying
   one of its `tags` (the first tag in the row's order that has one, its lowest roster ordinal) — or the dossier carries
   a custom institution whose resolved profile's scene archetype is one of the row's `archetypes` (a `landmarkOnly`
   entry admitting only `landmarkLevel: landmark`; item 104 (a) (2)), the lowest `localUid` first — that no earlier slot
   carries and that no creation-prefix `placeAt` holds on the ground, its `requires.government` (when present) holds for
   the town's `Government.kind`, its `requires.magic` (when present) admits the recipe's `magic` circumstance, and
   `areaHaMax · h_carried(v(requirementBand)) · h_town` ≥ `institutionFit.fitFactor` × the row's `areaHa`. **An eligible
   instance is one building or one compound** (item 108 (a)): a singular record, a record whose ladder step is SIZE, or a
   roster instance bound to neither — never a COUNT, GUILD or QUARTER record, nor a member `#k` of one (a collective's
   members stand where their record's spread puts them). A dossier institution counts as a roster instance (DR9, DR24):
   the island moves where it stands, never whether it exists (§7.7). The archetype is read at this draw only: a later
   revision of a custom kind re-resolves its profile and keeps it on its island unless a hard row of the new profile
   fails there, when item 104 (e)'s least disruption re-sites it on the ground; the island keeps its reason and its
   claim, the vacated building steps down the base's building ladder as any vacated building does, and the
   regrowth-first order re-occupies it with the next instance of one of the row's tags or its archetype before any ground
   site (§4.11; V05 §3.15 (4)'s rule for vacant stock).
3. **The draw:** one weighted choice on `island.place` (town lineage, index `reason:k`). With no candidate the slot
   closes, reported `no supply` or `nothing to carry`.

### 3.5 The sky allocation (S7b (5) at depth)

**A prosperity slot.**
1. The eligible bands are those with `h_carried(v(b)) > 0`, richest first.
2. Households are taken from the roster's residential demand of the richest eligible band, in batches of
   `fill.batchShare` of that band's demand (at least one household), each batch split over the classes by the band's
   class mix at its centre (item 71; largest remainder); after each batch `S_carried` and `A` are recomputed. **Held
   shares are never taken:** the households a dossier district-defining record's raised share holds on its ground
   district (item 72) — a QUARTER record of item 108 (a) among them, a noble or luxury quarter above all — are subtracted
   from the band's demand before the fill, so the island never drains a quarter the dossier names. The fill stops at the
   first of: the carried plot land — Σ over the carried rows of `plotArea(c, b)` × count, S2's plot areas at the band
   centres — reaching `plotShare · A`, `plotShare` volume 1's `hood.constants.sky.plotShare` (V01 §3.14; its default the
   base's dense-core share, §4.2 S2), the one share the island's district count divides by, so an edit of it moves the
   fill and the count together (J-V5.45); the carried households reaching `fill.householdCapDistricts` × `H_d`, `H_d` the
   town's households ÷ its district count after S6; or the band's demand exhausted, when the next band is taken only if
   the batch would leave the carried plot land within the recomputed `plotShare · A`. `A` falls as poorer households
   join, so the fill converges (II.6 (5)).
3. **What goes up with them — the carried workplaces, read through `IslandRule.carry`** (J-V5.32, J-V5.39, J-V5.51; §4.5
   S7b (5), item 308). For each workplace or institution class demanded at the carried bands, the carried households'
   share of their band's households × its count, by largest remainder, except:
   (a) **never carried** — the `IslandInstitution` tags (their own slots); the town-unique classes (§10.2's `unique`
   column: the principal market, the castle, the government's seat); every class whose balance profile (item 107 (a)) is
   in `carry.never.balance` — the heavy processors (mill, tannery, smelter, brewery, dyer) and wholesale and storage,
   which belong by the gates and quays; every class whose siting profile (item 103 (a)) emits one of
   `carry.never.emitsTopStep` at the profile scale's top step, since nothing on an island can lie downwind or downstream
   of its homes; every class with a hard NEEDS row naming a `carry.never.hardNeeds` feature — the conjured river and the
   spring pond satisfy no NEEDS row (V05 §3.20 (1)); and every resource or processing node of an active chain — a custom
   chain (item 104 (b)) or one of the dossier's `activeChains[]` with its processors resolved by kind family (item 105
   (i); V08) — the island institution of V05 §3.4 excepted. Their demand stays on the ground, where the chain keeps its
   working steps together (V05 §3.20 (9)).
   (b) **carried by share** — every class (a) does not exclude: the everyday services and the town-wide specialists of
   `carry.share.balance` above all, a chain's final seller and its consumers among them.
   (c) **split across the arenas** — a class whose row declares `split` (item 105 (h)) and whose works (a) excludes (a
   butcher's slaughterhouse emits at the top step; a brewer's brewhouse is a heavy processor): with `carry.share.splitShop`
   on, its **shop** may go up by the share while its **works** stays on the ground — one item on two plots on two arenas,
   the shop's building carrying a `Use` whose `branchOf` names the works' use (J-V5.51). Item 105 (h)'s split threshold
   is read with the route distance (V05 §3.20 (1)) between the island's demand and the works' ground site; below it the
   class stays whole on the ground. Every split is reported; off in the parity presets, as the islands are.
   (d) **collective members** (item 108 (b), (c)) — a member `#k` of a COUNT, GUILD or QUARTER record carried by the
   share keeps its record and its key; the record's range check (T73-4) counts its members on both arenas together; a
   lesser a greater subsumes is carried as that greater's member, never as an addition.
   **Coverage** (item 103 (f); J-V5.37). For a class with a coverage row, the island counts as **k units** for a row
   counted by district or neighbourhood — k its district count, `skyDistrictCount(plotLandM2, districtHa)` (V01 §3.16),
   computed here from the allocation's plot land by the same call the unit runner makes — **one unit** for a row counted
   by walking radius (the route to the ground passes every walking radius, V05 §3.20 (3)), and **⌈its carried
   households ÷ N⌉ units** for a row counted by N households. The proportional share above stands, and the island's units
   then join S7b (1)'s coverage step as candidate units beside the ground's districts (§4.5, item 308), which may add an
   instance of the class to this allocation from the demand it distributes — never remove one — unless the add would
   carry the plot land past `fill.coverageOvershoot` × `plotShare · A`, when that unit is skipped for that class
   (reported). Inside the island, the unit run's S10b spreads a coverage class over its districts and spaces its members
   by item 107 (d)'s same-kind row, as on the ground (V05 §3.20 (12)).
4. If `A` < `minAreaHa`, the slot closes (reported) and its rows return to the demand.
5. The island's district count and its partition are volume 1's (V01 §3.10.3 (2), read with `districtHa`); this volume
   counts none (J-V5.28).
6. One `Allocation` (level `district`, target the island's sky pseudo-district) holds the rows; `S_carried` and `A` are
   written to the slot's record-to-be.

**An institution slot.** Its row's instance (V05 §3.4 (2)) with `claim` set once SKY makes the claim (V05 §3.10 (5)),
plus `staffHouseholds` households of the requirement band; `A` = min(the law's `A`, `institutionFit.areaCapShare` × the
row's `areaHa`) — a compact island, its surround the unit run's gardens, close or yard; its claim's face is typed by the
row's `districtKind` (V01 §3.10.3 (2), V05 §3.12). Then, in order:
1. **A greater goes up alone** (item 108 (c); J-V5.57). A greater that subsumes lessers — a cathedral over the parish
   church, the resident priest and the wayside shrine — takes only its own building up. Its lessers stay separate
   buildings, members of its collective each keeping its `#k`: on the ground by their own rules, and on an island only by
   a prosperity slot's share; each counts once, never as an addition.
2. **The ground reservation's hand-over** (J-V5.46; §4.2 S3 (2), (8), item 286). Where the instance holds an S3
   reservation — the temple or cathedral precinct (§4.2 S3 (2)), or the reservation a palace takes by the castle's siting
   rules (V11's `palace` row) — the reservation stays exactly as it is (no L1 change) and passes to the row's
   `handover`: the first of its `tags` the roster demands on the ground, its largest instance (V05 §2.4), which S10b
   places into it as its claim (the reservation's `owner` becomes that instance and its `handedFrom` the institution that
   went up); a reservation sized for the greater keeps its size, the surplus becoming the incoming instance's churchyard,
   close or garden by its template's yard rows (§4.9). With no such tag demanded, `else`: `park` — the reservation
   re-typed `park`, owner `commons`, laid out by S12b as the old palace gardens or the old close's green — or `none`. An
   institution the creation prefix sends up (a T5 `sky` declaration of its kind, a T6 `criteria.sky` assignment) leaves
   nothing to hand over: S3 never reserves it. After generation — a T6 assignment or an epoch's `raiseIsland` taking a
   ground institution up — its vacated building steps down the base's ladder as any vacated building does, and the
   regrowth-first order re-occupies it with the row's hand-over classes first. The report and the clerk name the
   hand-over ("the old cathedral close — now the mother church").
3. **Burial and the crypt** (item 109 (k) (2)–(3), J111; item 2; J-V5.43). The churchyard part the base gives every
   church and temple plot (§4.9's churchyard row) — the island cathedral's, and any church's a prosperity island
   carries — is a surface burial ground only: it is left out of item 109 (k) (3)'s catacomb candidates and out of its
   "largest cemetery" ranking (V04's candidate list skips every sky-arena face). Each church on an island still counts
   once toward the catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V04 §2.3), since the dossier's
   church records and the roster set that count wherever the churches stand. The island cathedral's crypt — always the
   settlement's largest (V11's crypt column, `always`) — is a vault cut into the island's rim slab under the cathedral
   (V05 §3.10 (5)): part of its building, never an `UndergroundSystem` part or an item 109 (j) (3b) link, and no catacomb
   grows beneath it. The ground church that takes the old close keeps its own crypt by the crypted-class rows and is
   never ranked above the cathedral's.

**The rest.** S7b (1) allocates the remainder to the ground's districts, so the population stays whole (II.6).

### 3.6 Shape (S7b (5), per open slot, in the island's local frame)

1. **Template.** A declaration's points form gives it (a lasso is the outline itself, one point a disc of area `A`, two
   to four corners the routine fitted to their hull); otherwise one weighted draw of `outline.templates` on
   `island.place` (the island's lineage, index `template`).
2. **Bearing.** The long axis takes the ground's principal river's bearing (its course from inlet to outfall) where the
   site has a river; otherwise a uniform bearing on `island.place` (index `bearing`).
3. **The routine.** §4.2 S1 (2)'s closed-outline routine on the template's base curve, with the rule's detail row and a
   uniform envelope (no town side), from `island.place` (index `outline`); the base curve's scale is set by one secant
   step so that the displaced outline's area is `A` within 1 %. F-OUTLINE's ladder applies (§5.2).
4. The outline's centroid is the local origin, and the arena's frame is sized from the outline now drawn (V05 §3.8 (1)).

### 3.7 Placement — where the island floats (S7b (5), per open slot, in slot order)

1. **The class raster.** A 64 m raster over the ground frame classes each cell: `water` (its centre in an L0 water face,
   an oasis included — item 111 (a): an oasis is water for every rule that reads water); `core` (in a district of growth
   stage 1); `outskirts` (in any other district); `fields` (land outside the settlement perimeter). It is built once per
   S7b from the ground plan that exists then (L0, L1, the districts, the perimeter).
2. **Candidates.** The centroids of a `latticeM` lattice over the frame whose translated outline lies inside the frame
   inset by `frameInsetM`, does not meet any placed island's projected outline dilated by `gapM`, and **can be reached**
   (J-V5.54): at least one of its rim's cells on the class raster lies on admissible ground (for a hoist or a stair) or
   within the horizontal run of an admitted slanted access row (`ropeway`, and `lightBridge` where the `magic`
   circumstance admits it) of admissible ground. Admissible ground is the raster's land cells outside water, reservations
   and wall strips, and outside every committed raised part's raised-way pier footprints, its deck's plan dilated by
   `accessSiting.deckGapM` and every deck face of item 110 (d) (a mole, a pier, a quay platform or a bridge deck that
   carries plots) — V05 §3.10 (3)'s admissible faces at the raster's cell (a cell is admissible when its centre is); the
   test reads one chamfer distance transform to it (integer, 3–4 weights on the 64 m cells), built once with the class
   raster (J-V5.60).
3. **The score** of a candidate, over the outline's cells on the class raster: (a) the mean class weight — the rule's
   `prefs`, with an institution row's `overWeights` over them, and with `core` at 1.0 when the island is placed by
   assignment or declaration — × 1.0; (b) proximity, − 0.5 × min(1, d ÷ `nearM`), `d` the distance from the outline to the
   settlement perimeter (0 over the town); (c) purpose, 0.5 × one term, by the target the island's row names: `near`
   gives 1 − min(1, d ÷ the row's `nearM`) to the target, `far` gives min(1, d ÷ the row's `nearM`) from it. The targets:
   `plaza` the main plaza; `precinct` the precinct S3 reserved, else the plaza (it is then the hand-over church's close,
   V05 §3.5); `richest` the ground district of highest prosperity mean (ties by district address). A prosperity island
   reads `near: 'richest'` with the rule's `placement.nearM`; an institution island reads its row's `near` or `far`
   (V05 §2.4: the palace near the plaza, the cathedral near the precinct, the prison and the tower far from the plaza),
   and a row with neither takes no purpose term.
4. **The draw.** The `topK` best (ties by lattice y, then x), then one draw weighted by score − min score + 0.01 on
   `island.place` (index `place`). The chosen centroid is `anchor`; `placement.over` is the class of largest share under
   the outline (ties in the order water, fields, outskirts, core); `byAssignment` is set for a forced slot.
5. **F-SKY-PLACE** (V05 §3.17) when no candidate passes.

### 3.8 The island arena: frame, land, rim, terrain, the conjured river (SKY)

1. **Frame.** Computed after the outline (V05 §3.6 (3)): a square centred on the local origin of side 2 × `r_max` × √1.5
   + 2 × `frameMarginM`, rounded up to 10 m, `r_max` the outline's greatest distance from its centroid — so the outline
   grown to 1.5 × its area by the buffer resize (V05 §4.2) stays inside whatever its template and aspect, a spindle as
   surely as a disc; a declared or edited area past that grows the frame by §3.2 (9)'s single-level batches.
2. **L0 batch.** The arena's outer ring (the `margin` role on the island's `Terrain`), then the rim — the outline as one
   closed chain carrying the structural `rim` role on the island (§2.2 rule 7, item 203) — making two faces: the
   **void**, L0 kind `sky`, between the ring and the rim (§2.2 rule 1, item 204); and the **land**, owner the island.
   Every later batch on this arena lies inside the land face.
3. **Terrain.** The island's own `Terrain` (§2.3): the ground's terrain cell; a `hydro` grid at half the ground's hydro
   cell (12.5 m at CITY, 16 m at METROPOLIS: an island's catchments are small); `geology: 'ordinary'`. Heights: a dome
   `(domeM + domePerRadius · R) · (1 − (r ÷ R)²)`, clamped at 0 (`R` the equivalent radius √(A ÷ π), `r` the distance
   from the centroid); plus, for `echo`, §4.2 S1 (1)'s fBm at the ground's relief class with its amplitude ×
   `amplitudeShare`, for `own` the same at a class drawn by S0's relief weights on `island.place` (index `relief`), which
   SKY writes to `terrainEcho.reliefClass`, for `none` nothing; the noise on `terrain.noise` keyed by the island's
   `Terrain`. Where a conjured river is drawn, the surface tilts by `tiltPerMille` along its bearing, downhill toward its
   fall. Void cells hold 0 and are masked. The terrain's `datumCm` is the ground's datum plus the island's `elevationCm`,
   rewritten whenever that changes (V05 §3.9).
4. **The conjured river** (the owner's "magically conjured river"). Where the ground has a river, `A` ≥
   `river.minAreaHa` and a draw on `island.place` (index `river`) is below `river.chance`: the source is the point on the
   long axis at `river.sourceShare` of its length from its upstream end (upstream: against the ground river's flow); the
   course is traced and carved by §4.2 S1 (3)'s rivers by descent on the island's `hydro` grid until it meets the rim; its
   width is `w0 · (flowShare · acc)^0.4` — the ground's width law, `acc` the ground river's accumulation at its reach
   nearest the island's anchor — clamped to [`widthM[0]`, `widthMinorShare` × the outline's minor axis]. Its water face
   enters L0 with `shore` edges, bank kinds by §4.2 S1 (7)'s table; where it meets the rim the short stretch between its
   two banks carries both `rim` and `shore`, and the `WaterBody` carries `fall: true` (§2.3, item 252) — its outfall is
   the waterfall. Its crossing sites are §4.2 S1 (5)'s, on the island, built by volume 1's unit run (V01 §3.10.3 (4);
   §4.8, item 580); a bridge there may carry deck plots by item 110 (d)'s base mechanism like any bridge, and they fall
   with the island (V05 §3.22 (6)). No raised part stands on an island (V05 §3.22 (3)). With no ground river, a **spring
   pond** (`pond`, `river.pondShare` × `A`, at the terrain's highest basin, ties by lattice y then x) by a draw below
   `springPondChance`. `terrainEcho` records the ground river, the relief mode and, for `own`, the drawn class.
   **The island's water is its own (item 111).** The oasis, the arid site's water chances and the oasis's grove and
   gardens are S0's and S1's features of the ground arena (§4.2 S0–S1): SKY draws none on an island, whose water is this
   river or this pond alone, and an island's river echoes a ground river only (an oasis has no bearing to echo). Item
   111's water pull acts on the ground's growth field (§4.2 S3, §4.4), the ground's prosperity field (§4.5's water term)
   and the ground's wells and fountains (§4.7 S10b) only: the island has no growth field, its gradient takes no water term
   (V05 §3.11), and its unit run's S10b reads no well-yield weight and no arid coverage factor (an island has no water
   table; both read neutral). Item 111 (c)'s climate cell multiplies the ground's `w_sun` only (V05 §3.11). So item 111's
   cells at any value leave an island's arena, terrain, river, gradient and context vector as they are for the same
   inputs (T-V5-9 (h)).
5. **F-SKY-TERRAIN** (V05 §3.17) when the descent stalls.

### 3.9 The underside, the ground reference and the altitude (the owner's J98)

1. **The underside profile** (SKY): `kind` drawn by the rule's weights on `island.place` (index `underside.kind`);
   `rimThicknessCm` the rule's; for every kind but `flat`, `depthCm = min(maxDepthM, depthPerRadius · R) · (0.8 + 0.4 ·
   u)`, `u` a uniform on `island.place` (index `underside.depth`), `apexOffset` a uniform point in the disc of radius
   `apexOffsetShare · R` (index `underside.apex`), pulled toward the centroid until the apex lies over the land face, and
   `tiers` the rule's; for `flat`, `depthCm` 0, `apexOffset` (0, 0) and `tiers` 0 with no draw on `underside.depth` or
   `underside.apex` (so a flat island's altitude floor counts no root); `roughness` the rule's; `source: 'rule'`.
2. **The underside tiers** — a pure function `undersideTiers(island)` (`@plat/sky`), view data computed by S14, never
   stored: for tier i = 1 … n (`n = tiers`; none for `flat`) at depth fraction `z_i = i ÷ n`, the ring is the rim eroded
   by `R · (1 − ρ(z_i))` — the kernel's buffer on a transient arena (§3.4, §3.7), integer — translated by
   `apexOffset · z_i` and each vertex moved radially by `roughness · R ÷ n` × a `dmath` noise keyed by the island's render
   key and the tier; tier i spans from `elevation − rim − depth · z_(i−1)` down to `elevation − rim − depth · z_i` (`rim`
   the rim thickness). Underside tier 0 is the rim slab: the rim itself, from the island's **surface top** (below) down
   to `elevation − rim`. A tier whose ring falls below 1 % of the land's area ends the stack; the last tier then runs to
   the apex. So the solid is a stack of nested prisms whose silhouette follows the profile: a `root` hangs a narrow
   stalactite, a `bowl` a rounded belly, a `cone` a straight taper, a `flat` a thin slab.
3. **The ground reference** (SKY, before any plot is cut): `groundRefCm` = the greatest, over the ground's 32 m field
   cells (§4.5) whose centres lie under the island's projected land face or any projected underside-tier ring, of the
   terrain height at the cell centre plus the cell's **caster ceiling** — the greatest of `casterAllowanceM`; the top of
   every caster already placed whose footprint meets the cell (a wall's band, a tower, a gate of any kind, the castle, a
   bridge or pier deck — S5's and S7's, §8.4's casters — and **every raised part committed before SKY, whatever stage
   committed it: its deck top with its parapet, or an aqueduct's channel wall, over the deck's plan, and its raised-way
   piers**, with any retaining wall and levelled platform committed before SKY at its high-side top); and the `towerCm` of
   the heights row of every class with a tower (a church, a keep; §4.7 S11) allocated to the district holding the cell
   (the hinterland's allocation outside the districts) — above the ground datum. It reads only what exists at SKY, so the
   altitude is final before S10a reads the island's shade (V05 §3.19 (6); J-V5.29).
4. **The altitude** `altitudeCm = max(E, rim + depth + clearanceM)` — the law's altitude, raised where a deep root needs
   it so the apex clears the tallest thing beneath by `clearanceM` (J-V5.6) — or the edited value, which the same floor
   bounds (F-EDIT below it). `elevationCm` is `groundRefCm + altitudeCm`. The island's **surface top** — the
   `surfaceTopPercentile` percentile over the land face of its height at each point: the levelled ground there,
   `levelledGroundCm` on the island's key (§4.7, item 309: the platform datum where item 110 (a) levelled the plot or
   block, else the terrain), plus the eave of the building standing there — for a stepped building the eave of the
   **highest massing tier over that point** (its wing's `baseCm + eaveCm`, V02 §3.15.2), so a stepped temple has one
   eave per massing tier — is computed with the underside tiers (underside tier 0's top). The model's strip (V05 §3.19)
   reads underside tier 0's top from the terrain alone at generation and at a re-derivation, and from the full surface top
   at an epoch and at Update shade now, since item 102 (b) lets buildings cast the daylight term only across epochs.
5. **The clearance check** (SKY-F, after the pool's merge and the unit runs): where a caster placed after SKY under the
   projected solid — a building's ridge or tower (a stepped building's top from V02 §3.15.2's stack envelope), a tree's
   crown, a raised part committed after SKY (its deck top with its parapet or channel wall, its raised-way piers), a
   retaining wall's high-side top, or the levelled ground itself where S10 or S11's levelling raises a platform under the
   solid by fill (`levelledGroundCm` above the raster) — stands above `groundRefCm`, `groundRefCm` is raised to its top
   **keeping `elevationCm`** — `altitudeCm` becomes `elevationCm` − the new `groundRefCm` — and only where (4)'s floor
   then fails is `elevationCm` raised to meet it (a listed fate), so an island whose clearance already holds does not
   climb; SKY-F never writes `shadeBasis`, so the island's strip keeps its pass-2 basis until the next shade evaluation,
   across saves and loads, reported `shade basis behind: clearance` (F-SKY-CLEAR, V05 §3.17). **Measurement (P0):** over
   1 000 islands at CITY and METROPOLIS, with item 110's terrace, raised-way and deck-plot rows on (their defaults), the
   share raised here ≤ 1 %. **Pre-decided fallback:** `casterAllowanceM` becomes the measured 99.9th percentile of the
   caster tops found under islands (the same caster set), rounded up to 5 m, and is re-measured once. The clearance also
   holds after every epoch (V05 §3.15 (7)).

### 3.10 Access — the tops, the feet, the landing claims (SKY)

1. **How many.** A prosperity island: `min(accessCount.max, 1 + ⌊areaHa ÷ accessCount.perHa⌋)`, the first `main` and the
   rest `service`; an institution island: its row's `accesses`. **A removed ordinal holds** (J-V5.62): at every re-siting
   (a Re-derive from S7b or SKY) the ordinals in `SkyIsland.removedAccesses` are skipped — no top, no foot, no claims —
   and counted toward the number, so no replacement is sited; the lowest surviving generated ordinal takes `main` (an
   institution row's `guarded` role kept by its own ordinal), the rest `service`.
2. **Directions.** `d_1` is the bearing from the island's world centroid to the nearest ground district's centroid;
   `d_k = d_1 + (k − 1) · 360° ÷ n`. Each top is the point where the ray from the centroid at `d_k` last leaves the land
   face.
3. **The kind at each top**, among the access rows admitted by the recipe's `magic` circumstance (a `guarded` access is a
   `hoist` only): `hoist` or `stair` where the top's world point lies on ground land in an admissible face — a district's
   L1 face that is no reservation, claim or wall strip, or a hinterland L1 face, less every raised-way pier footprint,
   every raised deck's plan dilated by `accessSiting.deckGapM` and every item 110 (d) deck face (V05 §3.7 (2); J-V5.60) —
   and the altitude is within the row's limit; `ropeway` or `lightBridge` where an admissible land point lies within the
   row's horizontal run of the top (the point nearest the town's main plaza for a rope line; the highest ground for a light
   bridge; ties by lattice y, then x). One weighted draw among the admitted kinds on `island.place` (index `access:k`).
   **A slanted access over a raised part:** a `ropeway` or `lightBridge` whose straight segment from its top to its foot
   passes over a raised part's deck or a raised-way pier keeps `accessSiting.lineClearM` above its top (the deck with its
   parapet or channel wall, the pier's head) along the whole crossing; failing that, the candidate foot is refused and
   F-SKY-ACCESS takes its next direction step.
4. **The foot.** A `hoist` or `stair` foot is the top's world point; a `ropeway` or `lightBridge` foot the chosen land
   point. Feet keep `accessSiting.footGapM` apart: a later foot inside the gap of an earlier one moves to the nearest
   admissible point outside it (ties by lattice y, then x). A foot and its landing yard stand on part-0 land only: never
   on a deck face, a raised-way pier or inside a raised deck's plan dilated by `deckGapM` — a yard that would meet one is
   slid along the spine to the nearest position clear of it, else the foot moves as a gap violation does. **"The nearest
   way"** here and in V05 §3.12 is a **walkable part-0 way**: a raised part's deck counts only at the ground vertex of its
   ramp or stair foot, an aqueduct never (it carries water, not traffic). **In a district**, the foot is moved along the
   perpendicular to the nearest L1 way spine within `wayReachM` — or for a vertical access the landing yard is stretched
   from the foot to that spine — and SKY's ground L1 batch claims the landing yard (`claimSubFace`, `yardWidthM ×
   yardDepthM`, touching the spine) as a ground `Reservation` of kind `landing` (data key `reservations.landing`, V05
   §3.1) with its attach vertex on the spine. **Where no spine lies within `wayReachM`** (at SKY only S3–S7's arterials,
   boundary ways and gate plazas exist), the yard is claimed at the foot itself, its attach vertex on the yard's side
   facing the nearest way, and the attach is registered as a **destination** S8 must reach (§4.6, item 299): S8's first
   cut in that face runs from the attach to the nearest way by §4.6's lane rule, as a gate's attach is reached, and SKY-F
   checks that a way meets it (V05 §3.12). Either way SKY writes, under its data key `allocations.landing` (V05 §3.1),
   the positioned row `{ cls: 'sky_landing', band: 'modest', count: 1, claim, at: foot, access }` for that district — a
   row of its own beside the district's `Allocation`, never a rewrite of a row S7b wrote; its two staff households are the
   row's, and S10a takes them from the district's own `modest` residential demand when it reads `allocations` and
   `allocations.landing` together. **In the hinterland**, the landing is an outside site: the same row under
   `allocations.landing` for the hinterland's `Allocation`, sited by S12a at the foot and given its trail to the nearest
   way by the hinterland unit, as a decoration's trail is (§4.9). A `secret` access's ground landing is fronted (V05 §2.2).
5. **The top.** One `splitThrough` at L0 on the rim places the access's `('sky_access', id)` vertex, pinned; SKY's island
   L1 batch then lays the **rim strip** — a closed L1 line `rimStripM` inside the rim carrying the `setback` role on the
   island, its strip face typed as a block interior `rim_strip` (§2.5, item 213) — and claims each top's **landing yard**
   (`yardWidthM × yardDepthM`, from the rim inward across the strip) as an island `Reservation` of kind `landing` with its
   attach vertex on the yard's inner side, and, for an institution island, the **institution claim**: one `claimSubFace`
   of the row's `areaHa` (§4.5 S7b (3)'s compact claim shape) on the land face less the rim strip and the landing yards,
   searched over the sites of an `institutionFit.siteLatticeM` lattice (the claim's centre) whose claim fits there, by a
   named score: a **palace** the greatest mean terrain height under the claim among the sites on the half of the land
   facing `d_1` (the site's projection on `d_1` from the centroid ≥ 0; the whole land if none fits there); a **cathedral**
   and a **tower** the least distance from the site to the land face's centroid; a **prison** the least distance to the
   centroid among the sites whose claim dilated by `institutionFit.prisonMarginM` still fits. Ties break by lattice y,
   then x (J-V5.12's rule for every search here).
   **The crypt test** (item 109 (k) (2), J111; J-V5.43). The crypt lies **under the building's lowest massing tier,
   inside underside tier 0 (the rim slab)** (J-V5.66): a stepped cathedral or great temple of V02's `stepped` rows keeps
   its crypt beneath massing tier 0. For an instance whose class carries a crypt `always` (V11's crypt column: the
   cathedral and the great temple), a site passes only if, at every point of the claim, the island's terrain height less
   the full basement depth (220 cm, V02's basement form) lies at least `cryptFloorM` above the rim slab's base,
   `elevationCm − rimThicknessCm` — so the crypt, the settlement's largest, is a vault cut into underside tier 0, which
   exists for every underside kind, `flat` included. With the default rim this holds wherever the terrain lies above
   −6.8 m, so it excludes only an `own` relief's deep basin. If no site passes, the best site by score is taken and the
   crypt takes the half-sunk form (V02's basement ladder, full → half → raised), listed as a fate ("the rock is too thin
   for a full crypt here") and reported by F-SKY-CRYPT (V05 §3.17). The crypt is part of the cathedral's building — its
   basement record, whose rooms V03 plans — never an `UndergroundSystem` part, never an item 109 (j) (3b) link and never
   a catacomb source (V05 §3.5; item 2). Every later re-claim (a resize, a rim reshape, New random, a terrain edit on the
   island) re-runs the test, a change of form listed as a fate. **After levelling:** the claim is searched at SKY on the
   terrain; SKY-F re-runs the test on the cathedral's plot at its levelled platform datum (`levelledGroundCm`, item 309)
   where the unit run's S10 or S11 levelled it, since a platform cut into a slope lowers the floor — a form change listed
   as a fate, F-SKY-CRYPT's ladder as before.
6. **The ground's field** takes §4.5's positive landing kernel at each ground landing in field pass 2 (item 295; its
   cells `landingKernel`, V05 §2.4).
7. **F-SKY-ACCESS** (V05 §3.17) where a top has no admitted kind.

### 3.11 The island's field and its context vector

**An institution island** is uniform: its prosperity is `v(requirementBand)` of its row (one building and its staff).
**A prosperity island** carries a **gradient** that gives each carried band a share of the island's land equal to its
share of the carried plot land, the richest on the best ground (J-V5.18; the owner's "prosperity is a gradient and a
band"). On the island's 32 m lattice (the cells whose centres lie in the land face less the rim strip), SKY computes

`P_I(x) = smooth(Q(r(x)) + ε(x)) − w_sun · shadeSky(x) + brush(x)`, clamped once to [0, 1] and banded by the town's
`FieldBands` cuts (the island belongs to the town's band set):

1. **The site rank** `r(x)` ∈ [0, 1]. Each cell's elevation rank `e` (the percentile of its terrain height among the
   cells) and view rank `v` (the percentile of `view(x) = (1 − d_rim(x) ÷ R) · (1 + cos(θ(x) − θ_town)) ÷ 2`, `d_rim` the
   distance to the rim, `R` the equivalent radius, `θ(x)` the bearing from the land centroid to the cell and `θ_town` the
   bearing from the land centroid's world point to the town's main plaza) are combined as `field.rank.elevation · e +
   field.rank.view · v` and re-ranked to `r`, ties by lattice y, then x: the high ground and the rim that looks over the
   city rank first. On a `none` terrain every `e` ties and the view decides.
2. **`Q`** maps rank to value by the carried bands' shares. With the carried bands `b_1` (richest) … `b_m` and their
   shares `s_j` of the carried plot land (Σ `plotArea(c, b_j)` × count over each band's rows, V05 §3.5 (2)), the ranks
   from `1 − Σ_{i ≤ j} s_i` to `1 − Σ_{i < j} s_i` map linearly onto band `b_j`'s inner range `[lo_j + ι, hi_j − ι]`,
   `lo_j` and `hi_j` its two cuts on the absolute value (the lowest band's lower cut 0, the top band's upper cut 1) and
   `ι` = `field.bandInset` × `(hi_j − lo_j)`, so ε and the smoothing move a cell within its band far more often than
   across a cut.
3. **ε** — the base's low-frequency fBm (§4.5) on `field.chance` keyed by the island, wavelength
   `field.epsilonWavelengthM`, share `epsilonShare`; **smooth** — the ground field's Gaussian of one block width (§4.5's
   O(N) three-box blur) over the lattice.
4. **`shadeSky`(x)** — the share of the model sampler's samples (§4.5) in which a higher island's solid blocks the sun at
   x (the OR, sample by sample, of the strips onto this island, V05 §3.19), and, after an epoch, the island's own
   buildings (V06's building shade mask run on the island's lattice, V05 §3.19 (7)); the island's gentle relief casts
   nothing on itself (J-V5.33). `w_sun` is item 102's weight as filed: item 111 (c)'s climate cell, which multiplies it
   on the ground (§4.5), does not apply on an island (V05 §3.8 (4)).
5. **`brush`(x)** — the island's prosperity brush strokes (`setField` with `key`, V05 §4.2) as §7.2's stroke overrides; a
   declared target mean (`setAttr(field.prosperity)`, `declared.field`) adds one uniform shift so the lattice mean of
   `smooth(Q + ε)` equals it.

The gradient takes no water term: item 111 (b)'s term is the ground field's (§4.5; V05 §3.8 (4)). With ε, the shade and
the brush at 0, each carried band holds exactly its carried share of the lattice cells (within the smoothing's boundary
cells), so §4.7 S10a's band capacity on the island houses every carried band on its own ground and its band-range step
re-homes none of them (T-V5-9). `SkyIsland.field` records `prosperity` = the lattice mean of `P_I` (for the reader and
the report), `density` = the mean of the ground's density field over the cells whose prosperity band is one of the
carried bands, and `greenery` = the same mean of the greenery field plus `greeneryBonus`; `SkyUnitInput.field` carries the
raster before the brush (the unit run applies the strokes as the ground's field step does). The raster is never stored:
it is rebuilt on load from the island's terrain, rim and allocation, the cuts and the stroke list, as §2.9 rebuilds the
ground's fields.

**The context vector** on the sky arena (§2.5, item 213: `arena: 'sky'`) reads: `prosperity` = `P_I` at x (bilinear on
the lattice); `density` and `greenery` as `field` gives them; `dist.centre` to the land's centroid; `dist.plaza` and
`dist.market` to the institution claim on an institution island, else the route distance (V05 §3.20) to the ground's
plaza and to its nearest market; `dist.gate` to the nearest landing attach (a landing is the island's gate); `dist.wall`
to an author's island wall (V05 §3.21), else none; `dist.water` to the conjured river or pond; `dist.shore` to the rim;
`slope`, `aspect`, `upstream` and `terrainClass` from the island's terrain (`high`, but `damp` within 10 m of island
water); `upwind` from the ground's wind; `growthStage` 1; `arena: 'sky'`. Volume 1's field step on the island (V01
§3.10.3 (3)) reads these values through `skyUnitInput` — they replace a character offset from `h(S_carried)`, since a
supply fraction is not a prosperity value.

### 3.12 The unit inputs, and what the unit run must honour

SKY builds each island's `sky` request (V05 §2.3) and calls the unit runner; the runner reads `skyUnitInput(doc,
island)` — the claims, the landings, the river, the allocation, the field and the context. **The fabric hint is a
prior, never a strategy** (J-V5.48): on every island district, S7c's template draw multiplies the weight of the hinted
template by `fabricPrior` and chooses as it does anywhere; the hint is a prosperity island's `ring` from `fabricRingHa`
and `bent-cut` below it, and an institution island's row's (`street` for a palace — an axial avenue from the main landing
to the forecourt; `landmark` for a cathedral; `square` for a prison or a tower), always a valid `FabricStrategyId`
(V01 §2.1). The unit run lays the island by V01 §3.10.3 — no S1, the unit's outline the land face less the strip and
the claims, every landing attach and laid deck end reached, the institution placed on its claim by S10b, the crossing
sites qualified and built, the allocation split over the districts, the rim walk planted once by `plantRimWalk` (J-V5.26),
`SeamReport.portalsTotal` 0 and its district ids returned for SKY-F to write to `SkyIsland.districts` — and honours two
rules of this volume: every pull to a class on another arena is measured by the route distance (V05 §3.20), and the
levelling it does by item 110 (a)'s thresholds lays its retaining walls on the island's arena, never on the rim strip or
along the rim (V05 §3.22 (4)). The seven inputs this volume owns — the call, no S1 on the island, the field, the claims
with the rim strip, the `sky-*` kinds, the fabric prior and the district count — are those V01 §3.10.3's steps read.

**SKY-F checks** that every landing yard holds a `sky_landing_top` plot, that a way meets every island attach, and that a
walkable part-0 way meets every ground landing attach after S8 (the destinations of V05 §3.10 (4)); that no island
`RetainingWall` stands on the rim strip or along the rim (V05 §3.22 (4)); and it re-runs the crypt test at the levelled
datum (V05 §3.10 (5)). A missing island way is repaired by one island L1 batch laying the shortest lane from the attach
to the fabric (S8's lane width), a missing ground way by one ground L1 batch in the landing's district doing the same
(the district's own lane rule), and an unreachable landing is reported by F-SKY-ACCESS's last rung. A unit run that
returns no district (an outline face below one district's size, V01 §3.10.3 (2)) hands its whole allocation to
F-SKY-UNIT (V05 §3.17).

### 3.13 Lights (SKY-F; the sky rows of §4.7's light table, item 307)

| host | what | defaults (own, `extension`) |
|---|---|---|
| `rim` | magical orbs along the rim strip's outer edge | every 40 m, 2.5 m high, 60 cd × `h_carried`, radius 18 m, orb 30 cm, cool, steady |
| `keel` | one downward magical source at the root's apex (a `flat` island's: the rim slab's base under the land centroid): the glow beneath the island | 4 000 cd × `h_carried`, radius the apex's clearance + the row's `radiusMarginM` (30 m), size 3 m, cool, steady |
| `skyAccess` | a lantern at each top | 25 cd, 3 m, radius 12 m, fire, flicker |

The island's ordinary fabric — its ways, doors, squares — takes the ground rows (arena `ground`) as any district does;
each ground landing's lantern is its `sky_landing` class's `door` row. The `magic` circumstance gates no sky row: the
island is the magic that holds it up (J-V5.9). A waning island's magical lights scale with its `h_carried` at each epoch;
a settled island's are 0; a fallen or removed island has none (its `LightSource` records are tombstoned with its arena,
V05 §3.16 (7), §4.2). An island whose `h_carried` is 0 at SKY-F (a declared island held against its supply, J-V5.10)
lays its rim and keel rows at 0 cd — present, unlit — and its access lanterns, which do not scale.

### 3.14 Names

S13a draws each island's name on its `naming` stream (§6.3's cases), reading the features: the reason and the
institution's kind; the echoed river's name; the name of the ground district nearest below (ties by district address);
the altitude class (low below `naming.lowBelowM`; high from `naming.highFromM`); the town's culture row (§10.4). The
grammar rows are V11's (the slice `naming.island`). Each island is the root of its own `QuarterNode` (members its
districts, `cityCut` true), named with the island's name, so its `quarter` label draws at the city band at CITY and
METROPOLIS alike; an institution's own name is its `landmark` label; a landfall's `place` label takes the grammar's
fallen form of the island's name (V05 §3.16). With no river echoed or no district below (an island over water or
fields), those features are absent and the grammar's rows that need them are skipped; a renamed island (T11) keeps its
name through every re-derivation by §6.3's naming cases.

### 3.15 Over time — the island laws an epoch applies (`IslandEpochStep`; §4.11, item 320)

`IslandEpochStep.apply(doc, epoch) → ConversionOp[]` (`@plat/sky`) is called by the evolution engine (V06) at each epoch
after S6's re-evaluation of the field and before S7b's delta allocation, so the households it releases or takes enter
that allocation. `@plat/sky` registers it in §4.12's `StrategyRegistry` as V06's `EpochParticipant` `sky.islands`, step
`afterField`, order 0, stage `SKY` (V06 §2.1, §3.2): its `run(ctx)` calls `apply(ctx.doc, ctx.epoch)` with `years` =
`ctx.years` and `rung` = `ctx.rung`, draws on `island.place` as below (never on `ctx.stream`, so a history with or
without the engine's other participants draws the same island values), and returns the conversions as `EpochOps.ops` in
island slot order. `@plat/sky` registers a second participant, **`sky.clearance`**, at step `afterGrowth`, order 50 —
after V06's `hood.fabric` (order 40), so every raised part, retaining wall, building and massing tier the epoch committed
is read — stage `SKY`, which runs step 7 below (V06 §3.2's participant table).
**Households move through V06's typed channels** (V06 §2.1, §3.8.1): every household the step releases — a wane's
leavers, a settle's remainder, a fall's covered homes when the fall happens in an epoch — enters V06's displaced pool
with cause `island` (placed first at the `siting` step, their addresses kept, each placement a `relocate`); every
household a refloat or a raise takes up from the epoch's delta demand is reserved by `EpochOps.demandTaken: { band:
string; count: number }[]`, which `siting` subtracts from the delta demand before it houses the rest; existing households
relocated up are `relocate` ops in `EpochOps.ops`. So ground plus sky households equal the epoch's target after
`siting` (T-V5-21 (g)). `years` is the epoch's span (§4.11 (5)); every rate below is per year, applied over it. For each
island that is not fallen or removed:

1. **Evaluate.** The rung row of the epoch's rung — the fold's (`ctx.rung`, V06 §3.1 (3); §4.11 *The rung at an epoch*,
   item 322), which inside the hand-off band is the previous product's own rung, not the target's: `none` makes the
   target area 0. Otherwise `S_town` from the re-evaluated field's island-free value (§4.5, item 296: the supply law
   never reads the islands' own shade), the node term from the deposits as they stand at the epoch (V05 §3.3), `S_carried`
   from the island's households' bands under the new cuts (an institution island's requirement band), and the targets
   `A_t` and `E_t` by V05 §3.3. `supply` is rewritten.
   1b. **The institution has left** (J-V5.53; item 20 (h): a dossier removal is truth). If the island's reason is
   `institution` and its institution is gone — removed by a dossier event at an absorb (the institution leaves at once:
   its building vacated, its uses closed, §7.7), its custom kind deactivated (item 104 (e)), or closed with no successor
   for a whole epoch — the island re-reasons now, in order: (i) the next eligible instance of one of the row's `tags` or
   its archetype (V05 §3.4 (2)) relocates up into the vacant claim (a `relocate`; its ground site handed over by V05
   §3.5's rule); else (ii) the island becomes a prosperity island where `h_carried(v(rich))` > 0 and the rich band's
   demand admits it — the claim's building re-let as a mansion (a `relet` to the `rich` band's residential class), rich
   households taken up by the delta (`demandTaken`) and by relocation within the churn cap as a refloat takes them, the
   claim's face keeping its `sky-*` kind until a re-derivation re-types it `sky-island`; else (iii) `A_t` = 0 and the
   island wanes by step 2. `reason` and `institution` are rewritten by the conversion; the report and the clerk name the
   cause. **Against a lock** (the dossier outranks a lock, §7.7; the edge V05 §3.23 names): the dossier's removal of the
   institution acts at once whatever the lock — its building vacated, its uses closed — and a lock on the island (or on
   its `state` path) holds `reason`, `institution`'s claim and the island's state: the island stays an institution island
   with its claim empty, the fate "<island> is held without its <institution>" listed and the clerk naming the lock; the
   re-reasoning of (i)–(iii) waits, and runs at the first epoch after the unlock (T-V5-14).
2. **Floating.** If `A_t = 0`: `waneIsland` (floating → waning), `dwellUntilWeek` = the week + a draw in
   `dwellYears.waning` × 52 on `island.place` (the island's lineage and the epoch component, index `dwell`). Otherwise, if
   |`A_t` − `areaHa`| > `hysteresis` × `areaHa`: `resizeIsland` toward `A_t` by at most `growthPerYear · areaHa · years`
   either way (magic accretes and erodes slowly), and its altitude toward `E_t` by at most `altitudeRateMPerYear · years`
   metres, never below V05 §3.9 (4)'s floor.
3. **Waning.** Each epoch the altitude falls linearly from its value at the wane's start to V05 §3.9 (4)'s floor (with
   `E_min`) by the dwell's end, and the area toward half its value at the start, both by `resizeIsland`; the households
   leave in reverse ordinal order (the suffix, as §4.11's step (c) empties buildings), ⌈H · years ÷ dwell⌉ each epoch, each
   a `relet` down or a `vacate` on the island and the household entering the displaced pool with cause `island`, where
   the regrowth-first siting houses it on the ground; the island's vacant buildings then step down the base's building
   ladder. If `A_t > 0` again: `refloatIsland` (waning → floating), the dwell cleared. When the dwell ends:
   `settleIsland` — the altitude at the floor, every remaining household into the displaced pool, the magical lights at
   0, `dwellUntilWeek` = the week + a draw in `dwellYears.settled`.
4. **Settled.** If `A_t > 0` (and the rung admits islands): `refloatIsland` (settled → floating) — regrowth-first: its
   vacant stock is reoccupied before any ground plot, by the rich bands' delta demand first (reserved by `demandTaken`)
   and then by relocating existing rich households up, within the epoch's churn cap (§4.11) — its altitude climbing at the
   rate. When the dwell ends: `fallIsland` (V05 §3.16).
5. **Empty slots.** A slot holding a live, unfallen island is never redrawn — while it is supplied it stays. An empty
   slot re-opens with probability `(1 − (1 − redrawPerYear)^years) · chance[k] · h_town` (II.6 (4); J-A67.40), drawn on
   `island.place` with the epoch component, only if every lower slot is filled. **A slot a `removed` record holds is not
   empty** (V05 §3.2 (6)): it is never re-opened by an epoch, draws nothing and counts as filled for the slots above it;
   only item 260's lift rule releases it (V05 §3.2 (6)). A slot that opens refloats a settled island first
   (regrowth-first; the settled island with the highest `h_carried` for its households, ties by slot, then address) and
   otherwise `raiseIsland`: S7b's delta fill for the sky (V05 §3.5, taking the rich bands' delta demand first, reserved by
   `demandTaken`, and then relocating existing rich households up within the churn cap), then V05 §3.6–§3.14 on the new
   island, its districts laid by the unit run inside the epoch's commit (V01 §3.10.3 (6) (a)); it has no `shadeBasis`
   until the next epoch's S6 (below; V05 §2.1).
6. **A rung crossing downward** makes every island's target 0: they wane, settle and fall over their dwells, never in one
   epoch (T8-6).
7. **Clearance after growth** (`sky.clearance`; J-V5.68). After the epoch's growth, every live island (not fallen, not
   removed) is re-checked by SKY-F's clearance rule (V05 §3.9 (5)) against the casters the epoch committed under its
   projected solid: the raised parts of V06's raised-way pass and of a new stage's S4 (their deck tops with parapet or
   channel wall, their raised-way piers), the retaining walls' high-side tops and the levelled platforms, and the
   buildings — a stepped one at its stack envelope's top, and a building whose Works starts later in the epoch's weeks at
   its planned finished height, since it is committed now (V06 §3.2's `works` step). It reads V06's `EpochScope.built`,
   `.raised` and `.levelled`. Where one stands above `groundRefCm`, the participant returns one op `{ op: 'reclearIsland';
   island; groundRefCm; altitudeCm; elevationRaisedCm }` (V05 §4.2) that raises `groundRefCm` to it **keeping
   `elevationCm`** and, only where V05 §3.9 (4)'s floor then fails, raises `elevationCm` to the floor
   (`elevationRaisedCm` > 0, a listed fate: "raised clear of the aqueduct" naming the caster). It **never writes
   `shadeBasis`**: the island's strip keeps the basis the epoch's S6 wrote at its start, and the next epoch reads the
   island as it then stands (item 102 (e)'s lag, J-V5.27). A locked island, or a lock on its `altitudeCm` path, holds its
   `elevationCm`: `groundRefCm` and `altitudeCm` are still rewritten, and where the floor then fails the island stays where
   it hangs, the conflict listed (`clearance held by your lock`) and the island exempt from §5.3's clearance invariant as a
   held island is from the supply invariant (T-V5-31 (f)). The step draws nothing, so the same history clears the same
   islands (T-V5-31 (b)).

A locked island, or a locked `state`, `areaHa` or `altitudeCm` path, is held by these steps (§7.2) — the report lists it
as `held against its supply` when its supply is 0 (J-V5.10).

**The shade over time** (item 102 (e)). Each epoch's S6 re-evaluation is a shade evaluation (V05 §3.19 (6)): it writes
every live island's `shadeBasis` from the island as it stands when the epoch begins — before this step changes it — and
re-reads every strip from those bases, so a resize, a sinking, a raise, a fall or an author's edit since the last
evaluation moves the field one epoch later, and the uses beneath follow by the engine's normal lag (V06 schedules the
drift; §4.11's ladder moves the survivors). The basis is persisted, so a save and a load between two epochs change
nothing (T-V5-21 (h)). A fallen island casts nothing from the epoch after its fall; a settled island casts from its floor
altitude, so its strip draws in toward its footprint. An island that step 5 raises (after this epoch's S6) has no
`shadeBasis` until the next epoch's S6 writes one: it casts and receives no strip meanwhile, and a save and a load in
between compute none for it (V05 §2.1, §2.6; J-V5.72); V06's building mask on its lattice likewise starts at the next
field phase (V06 §3.4 (8)).

### 3.16 The fall and the landfall (`fallIsland`)

One `convert` event, as a declared sequence of batches (§4.11), whatever its author (the engine or a hand):

1. **Footprint.** The island's projected land face in world coordinates (`anchor` + the local ring).
2. **Covered set** (J-V5.11). Every ground entity of which at least `landfall.coverShare` of its face or band lies inside
   the footprint, of every kind the table in (4) lists — every L3 plot and every hinterland `LandUse` face; every
   reservation (plaza, market, precinct, park, castle bailey, a ground landing yard); every way (its corridor band); every
   wall stretch (its band), gate (a `Gate` of any kind, by its footprint) and tower; every bridge or pier deck; every
   raised part's span (its deck band's plan projection, in a ground part ≥ 1) and raised-way pier (its footprint); every
   `RetainingWall` stretch (its band), generated or drawn; and every deck plot (its face on a bridge, pier, mole or quay
   deck) — less every locked or pinned entity and the plots that hold one (kept content, as §3.3's fixed obstacles; the
   ruin laps around them).
3. **Relocation first.** Every use in a covered building or reservation is relocated by §4.11's rule for a step that
   empties a building (a dossier-backed use by the solver's `dossier` request; *Dossier content across epochs*), every
   household by §4.7's overflow pass inside the event — in an epoch, into V06's displaced pool with cause `island` (V05
   §3.15) — the households of the deck plots that (4) brings down included, before their deck falls.
4. **The ground — one row per covered kind** (J-V5.11, J-V5.64, J-V5.73, J-V5.76, J-V5.79). No edge of the ground's
   streets and plots is added or removed — the tombstoned deck plots' lines excepted, which go with them — so the plan
   survives under the rubble, ready for regrowth. Each change is a listed fate; every row is undone by the event's undo
   record (§7.4's convert row; (8)).

   | covered kind | outcome | drawn by | lifted by |
   |---|---|---|---|
   | building | demolished (cause `convert:fallIsland`) | — | regrowth on its plot |
   | L3 plot (a deck plot's excepted, below) | its use vacant with the `ruin` treatment | §8.2's `fallen` row over the member (item 408) | V06's landfall clearance (V06 §3.5.2) |
   | reservation | left vacant under the rubble with the same treatment | the `fallen` row | V06 §3.5.2 |
   | hinterland `LandUse` | kind `quarry`, owner `commons`, `source` the landfall decoration (item 253): a surface rubble working that sources no underground quarry system, no mine–cavern breach and no dig-down draw (item 2; V04's quarry rules read only a `quarry` without a `source`) | the quarry row | the quarry face's `retypeLand` (V06 §3.5.2) |
   | wall stretch, gate (any kind: `main`, `postern`, `water`, `gatehouse`, `castle`, §2.7), tower | `breached` written into the enceinte's `condition` (§2.2 rule 5's stretch-state profile, item 575) over the stretch's covered length, extended to take in the chord along the trace of every covered tower's and gate's footprint, so every covered tower's vertex and every covered gate's junction lies inside a `breached` run; a tower or gate covered while its stretch is not has `breached` written over its footprint's chord alone; a run already `dismantled` kept (§4.11's wall ladder only steps down). A `Tower` or a `Gate` carries no state of its own: it draws by its run's `condition` and stands again with it | §8.2's `decayed` row (the gap glyph over each `breached` run) | V06's `repairWall` (V06 §2.8, §3.7.5) |
   | bridge, pier, mole or quay-platform deck | `ruined`: the deck falls; under a bridge the river stays one L0 face and the way's crossing is closed | its host's `ruined` row | V06's `repairRaised` (item 246) |
   | way | surface `rubble`; its routing class drops to `track`, the class it had written to `Way.formerClass` in the `fallIsland` batch — a way that already carries a `formerClass` (a lane V06 downgraded) keeps it, so the clearance gives back the class it had before its decline | its surface row | the first epoch whose clearance (§4.11's salvage demand; V06's landfall candidate) reaches it restores the class from `formerClass` (V06 §3.5.2, which clears it), or a hand `setAttr` of `class` (which clears it too, V06 §2.8) |
   | raised span, raised-way pier | `ruined`; a span whose pier is ruined becomes `ruined` with it (arches fall with their piers, whatever their own cover); a raised way with a ruined span has its crossing closed — it has no junctions with the ways beneath, so the ways' `track` row does not apply to it, and the ways beneath are touched only where the footprint covers them; an aqueduct ruined so loses its terminal's supply, listed as a fate ("the fountain in <square> runs dry"); the vaults beneath a span follow its state by V04's rule (this volume writes nothing underground, item 2) | its state row (§8.2's `raisedWay` program) | `repairRaised`; the aqueduct's supply re-read by V06's raised-way pass at its first `raisedWays` step after the fall — the same epoch for an epoch's fall, the ruined parts standing in that epoch's lifecycle (`EpochScope.raised`, V06 §3.19.2 (4)), the next epoch for a hand `convert` |
   | retaining wall, generated or drawn | `decayed` over its covered length — item 245's state, the `breach` op's result (V06 §3.19.4 (3)); keyed by the wall's lineage address, so a later re-derivation of a generated wall keeps it `decayed` until an epoch's restoration re-derives it (V06 §3.19.4 (6)), a drawn wall restored by hand; never re-derived intact under the rubble | §8.2's `retaining` state row | `repairRetaining` (V06 §2.8) |
   | deck plot (on a covered bridge, pier, mole or quay deck) | falls with its deck by item 110 (d)'s least disruption: its households relocated first ((3)), its building demolished (cause `convert:fallIsland`), the plot **tombstoned with the deck**, as V06 does for a struck deck (V06 §3.19.5 (3)) — never a vacant plot left on a ruined deck | — | a repaired deck re-offers its faces and the buildings raised on them are new lineages (V06 §3.19.5 (1), (4); V02 §3.16 (7)) |
   | another island's ground landing yard or access foot | the landing yard is a covered reservation (its use relocated by (3)); the access is **re-landed** in the same event — its foot moved to the nearest admissible point outside the footprint by V05 §3.10 (4)'s rule, a new yard claimed there, as a move re-lands it (V05 §4.2) — else, with no admissible point within twice its row's run, dropped by F-SKY-ACCESS's last rung (closed, reported; an island left with no access is reported `unreachable`) | its access marks at the new foot | the event's undo |
5. **The landfall record.** One ground `Decoration` of kind `fallen_island` whose `members` (`DecorationMember[]`, §2.7,
   item 252) are the covered plots, land uses, reservations, ways and retaining walls, each by its `Id`, and the covered
   raised spans and raised-way piers, each by its raised way and item 244's support keys (`{ raised, span: [a, b] }`,
   `{ raised, support }`) — never a deck plot, which is tombstoned with its deck and listed as a fate — `source` the
   island's address and `name` the grammar's fallen form of its name. Each member leaves the list in the batch of the op
   that ends its cover (V06's member-leaving `setAttr`, V06 §3.5.2; J-V6.108; V05 §2.6). §8.2's `fallen` row draws its
   rubble over the members' faces and bands — a raised member's the span's deck band in plan or the support's `ring`;
   the walls with their towers and gates by their runs' `condition`, the bridges, raised parts and retaining walls by
   their own state rows ((4)'s *drawn by*). Parts of the footprint over water leave nothing on the ground and are reported
   ("sank in <water body>"); a footprint wholly over water lays a decoration with no member, its fate the one line.
6. **The salvage ledger** is credited with `stone` = the covered land area × `stoneM3PerM2` m³, `from` the island
   (§2.7's `MaterialLedger`), so later building within the haul radius draws on it and §4.11's salvage demand weighs
   clearance near it.
7. **The sky.** Every entity of the island's arena — its own retaining walls, its bridges' deck plots and its
   `LightSource` records included — and its accesses become tombstones (cause `convert:fallIsland`); each ground landing's
   use closes (`closeUse`), the landing house left vacant to step down the ladder; the island record stays live at its
   address with `state: 'fallen'` and `landfall` set, its slot freed.
8. **Undo** restores all of it from the event's undo record (§7.4's convert row) — each covered way's `class`, surface
   and prior `formerClass` (absent again where the fall wrote the first), each covered enceinte's `condition` profile and
   `lifecycle` and each covered retaining wall's `state` as they stood before the fall (absent again where the fall wrote
   the first), and every re-landed access at its former foot.

### 3.17 Failure ladders — never a whole-map retry

The sky's classes are rows of §5.2's staged table (item 331), which cites this table for their detection and ladders; the
sky invariants are §5.3's (item 331).

| class | where | detection | ladder (in order) | test |
|---|---|---|---|---|
| F-SKY-FILL | S7b (5) | the fill cannot reach `minAreaHa`; an institution's row does not fit | take the next eligible band → try the next reason candidate (V05 §3.4) → close the slot, rows returned to the demand, reported | T-V5-4 |
| F-OUTLINE (base) | S7b (5) | the island's outline is not simple | §5.2's rungs | §13.2's outline property test |
| F-SKY-PLACE | S7b (5) | no candidate passes V05 §3.7 (2) (inside the frame, clear of the other islands, reachable) | halve `gapM` → admit `core` at weight 0.3 → shrink `A` by 20 % and redraw the outline, at most twice → close the slot, rows returned, reported (the reachability test is never relaxed: an island placed by rule always has an admissible access site) | T-V5-5 |
| F-SKY-TERRAIN | SKY | the river's descent stalls or cannot reach the rim | double the tilt → carve a straight bed along the axis to the rim → no river, reported | T-V5-7 |
| F-SKY-ACCESS | SKY, SKY-F, a landfall over another island's landing (V05 §3.16 (4)) | no admitted kind at a top; no land foot (a foot or yard meeting a deck face, a raised-way pier or a raised deck's plan within `deckGapM` counts as none); a slanted access under `lineClearM` over a raised deck or raised-way pier; a landing attach unreached by a walkable part-0 way (on the island, or on the ground after S8); a foot under a landfall | the next direction step of `accessSiting.turnStepCdeg` either way, up to ± `turnMaxCdeg` → the other kinds of the row set → a foot at the nearest admissible land point within twice the row's run → the attach repair lane on its arena (V05 §3.12) → the access dropped, reported (an island keeps at least one where any rung passes; one with none is reported `unreachable` — never an island placed by rule, V05 §3.7 (2)) | T-V5-8, T-V5-14 |
| F-SKY-UNIT | the unit run | households the unit run cannot house — all of them where it returns no district (V01 §3.10.3 (2)) | V01's F-UNIT ladder first; the rest re-placed on the ground by §4.7's overflow pass as a relocation, reported | T-V5-9 |
| F-SKY-CLEAR | SKY-F; each epoch's `sky.clearance` (V05 §3.15 (7)); a ground edit beneath (V05 §4.3) | a caster placed after SKY (a ridge, a tower, a crown; a raised part's deck, parapet, channel wall or raised-way pier; a retaining wall's high-side top; a levelled platform; a stepped building's highest massing tier) stands above `groundRefCm` under the solid | raise `groundRefCm` to it keeping `elevationCm`, and raise `elevationCm` only where V05 §3.9 (4)'s floor then fails (a listed fate) — a locked island or `altitudeCm` path held, the conflict listed, exempt from the invariant; `shadeBasis` untouched, so the strip keeps its basis to the next evaluation, across saves and loads, reported `shade basis behind: clearance` → at P0, V05 §3.9 (5)'s allowance fallback | T-V5-10, T-V5-21 (h), T-V5-31 (f) |
| F-SKY-CRYPT | SKY (the institution claim), every re-claim, SKY-F's re-test at the levelled datum | no claim site of an `always`-crypt instance passes the crypt test (V05 §3.10 (5)) | the best site by score with the half-sunk crypt (V02's basement ladder: full → half → raised), a listed fate → never a missing crypt | T-V5-26 |
| F-SKY-SHADE | field pass 2, an epoch, SKY's last step, Update shade now | a strip's window passes the receiver raster's frame and margin; a sample's shadow is capped (V05 §3.19 (2)) | clip the window to the raster (beyond it there is no field to shade), reported as the clipped share → nothing further: a strip never fails and never stalls the field | T-V5-19 |
| F-SKY-LANDFALL | `fallIsland` | covered content is locked or pinned; a covered use has no alternative site | kept as content the ruin laps around; the use stays in its building, which then stands in the rubble, reported | T-V5-14 |
| F-SKY-HANDOVER | S7b (5) | an institution going up holds an S3 reservation and no hand-over tag is demanded on the ground | the row's `else` (`park`, re-typed with owner `commons`) → never an ownerless reservation | T-V5-4 |

### 3.18 Determinism — every draw on an existing concern (no new concern; J-V5.12)

| concern | key | creation index | what it draws |
|---|---|---|---|
| `island.place` | the town's lineage | `slot:k`, `reason:k` | the slot openings; the reason |
| `island.place` | the island's lineage (with the epoch component at an epoch) | `template`, `bearing`, `outline`, `place`, `relief`, `river`, `underside.kind`, `underside.depth`, `underside.apex`, `access:k`, `dwell` | the shape, its bearing, its displacement, the placement draw, the own relief class, the river draw, the underside, the access kinds, the dwell spans |
| `terrain.noise` | the island's `Terrain` | per §6.1 | its fBm |
| `water.river` | the island's `Terrain` | per §6.1 | the river's meander knots |
| `field.chance` | the island | per §6.1 | its ε |
| `naming` | the island; the landfall decoration | per §6.3 | names |

`island.place`'s creation indices are §6.1's (item 476). **A removed slot draws nothing** (V05 §3.2 (6)): its `slot:k`
and `reason:k` indices are skipped, and every other slot's creation indices are unchanged, so removing an island never
moves another island's draws. `sky.clearance`, `skyAccessObstacles` and the removed-ordinal skip at re-siting draw
nothing either. The strips (V05 §3.19) and the route distance (V05 §3.20) draw nothing: they are pure functions of
committed state (the strips of the persisted `shadeBasis`, never the live island), §4.5's sampler and `dmath` (§6.5),
the strips reading the tiers without their roughness. The island's prosperity gradient (V05 §3.11) draws only its ε on
`field.chance`. **Every choice by score or order breaks its ties the same way** (J-V5.12): among islands by slot, then
address; among sites and lattice cells by lattice y, then x; among districts by address. The tiers' roughness uses
`dmath` noise keyed by the island's render key — view data outside every digest (§6.2) and the same on every engine
(§6.5). The part number is minted once and recorded in the address (V05 §2.1); `raiseIsland` keys the island by the
town's lineage, the slot and the epoch (J-A8.61), so the same history raises the same island. §6.1's distinctness test
runs a sky-island fixture; §13.3's goldens gain the two sky fixtures of T-V5-15.

### 3.19 The island's shade strip (the owner's item 102 on the island's side; J98's underside)

`islandShadeStrip(doc, island, samples, onto) → IslandShadeStrip` (`@plat/sky`, V05 §2.3a) — a pure function, no draw:

1. **The samples** are §4.5's model sampler (item 296): its sun positions at the site latitude on the equinox, its
   sample points per 32 m field cell, its point-major layout and its shadow-reach cap of 8 × a caster's height, the one
   reach law for every model-side source (J-V5.44); the strip reads whatever the sampler holds (J-V5.42). Each sun gives
   the horizontal unit vector ŝ toward the sun in the model frame (x east, y north) and the reach `c = min(cot altitude,
   8)`. Below, "sample `s`" is one sun and "the cell's point" one of the sampler's points. Wherever a reader counts "the
   samples a cell is blocked for" (the clerk, the shade map's three areas, the CSV, T-V5-19), it takes the mean over the
   cell's points of the suns blocked at each — with one point, the count itself.
2. **The solid — from the caster's `shadeBasis`, never the live island** (J-V5.47). The tiers without roughness —
   `undersideTiers(basis, { rough: false })`, the view's own function (V05 §3.9 (2)) evaluated on the basis's rim
   polygon, underside, anchor and elevation with the roughness term at 0, so the model never reads view data (J-V5.30);
   an island without a basis has no solid here and casts nothing: tier 0 the rim from the basis's `surfaceTopCm` (V05
   §3.9 (4)) down to `elevation − rim`, tiers 1 … n down to the apex (none for `flat`). Each tier's ring is rasterised
   once into a bit mask of `shade.ringMaskM` cells in the island's local frame (scanline fill; a cell is in when its
   centre is), with the tier's span [`b_i`, `t_i`] in centimetres above the ground datum. A tier whose ring rasterises
   to no cell (narrower than one mask cell) blocks nothing and is skipped; a `flat` island's solid is tier 0 alone.
3. **The receivers.** Onto the ground: the field raster's 32 m cells (§4.5), each at each of the sampler's points `x` in
   it and the ground terrain's height `g(x)` there (bilinear on the committed terrain raster **as the field reads it —
   S1's heights with the T2 terrain strokes, unlevelled**; item 110 (a)'s levelling of plots and blocks is a platform
   datum, never a receiver height, so a strip computed at S10a, before S10 and S11 level anything, equals the one a load
   rebuilds after them; item 309; J-V5.65). Onto an island: the receiving island's 32 m lattice over its land face at the
   receiver's own `shadeBasis` (its anchor and elevation), each at the island's terrain height there plus that datum — a
   receiver without a basis receives no strip; only an island whose apex lies above the receiver's surface top casts onto
   it — an island never shades upward, and two islands at one height shade neither.
4. **The test.** Point `x` is blocked at sample `s` when the ray from (`x`, `g`) toward the sun meets a tier. For each
   tier with `t_i` > `g` (one wholly below the receiver blocks nothing), in order from tier 0 down: the ray's horizontal
   track across the tier's span runs from `x + (max(b_i, g) − g) · c · ŝ` to `x + (t_i − g) · c · ŝ`; it is walked in
   steps of at most `shade.stepM`, both ends included, each point moved into the island's frame (less `anchor`) and looked
   up in the tier's mask; the first hit sets bit (point · suns + `s`) and ends that point's test for that sample. All
   arithmetic is integer centimetres and `dmath` (§6.5), in a fixed order: samples in the sampler's order, cells
   row-major, points in the sampler's order, tiers 0 → n.
5. **The window.** Only cells that can be blocked are tested, sample by sample. The corridor is the solid's bounding box
   (the union of its tier rings) swept away from the sun by `ŝ · c` × [`b_n` − `g_max`, `t_0` − `g_min`] (`g_min`,
   `g_max` the terrain's extremes over the frame — a safe bound), in receiver cells, clipped to the receiver raster
   (F-SKY-SHADE). **Each corridor cell is first pre-tested in O(1) at its own height** `g(x)`: its ray's track across the
   solid's full span, from `x + (b_n − g) · c · ŝ` to `x + (t_0 − g) · c · ŝ`, must meet the solid's bounding box, else
   the cell is skipped without a tier walk — so in mountainous relief the low cells far from the island cost one
   segment–box test each, and no blockable cell is missed (the pre-test is exact for the box, which contains every tier;
   J-V5.59). The strip's stored `window` is the bounding box of the cells that passed the pre-test, over all samples; a
   strip none of whose cells passed has an empty window and `cells` 0.
6. **When — the shade evaluations** (the one statement of the schedule). Each evaluation first writes the `shadeBasis`
   of every live island (not fallen, not removed) from the island as it then stands, and then computes every strip from
   the bases:
   * **SKY's last step**, at generation and at any re-derivation that runs SKY (`by: 'generation'` or `'rederive'`): the
     bases and the strips onto the islands; the strips onto the ground follow at S10a from the same bases;
   * **S10a's start**, at a re-derivation starting after SKY and at or before S10a (`'rederive'`) — before step (i) and
     every hook, the bases of every live island, then the strips onto the islands (never by pass 2, so no hook of S10a
     reads a strip built from the old bases);
   * **each epoch's S6 re-evaluation** (`'epoch'`), for every island not fallen, from the island as it stands when the
     epoch begins (V05 §3.15);
   * **Update shade now** (`'update'`, the document's current epoch), for its island only: that island's basis, its
     strips onto the ground and onto islands, and the strips other islands cast onto it (V05 §4.2).

   **The strips onto the ground are computed once per shade evaluation, at their first read** — volume 1's S9b at
   S10a's `afterDrivers` hook, between step (i) and field pass 2, where it is registered (its manor sun factor, V01
   §3.5.5), else field pass 2 — by the one pure call, and **held** for pass 2's fold and every later reader of the same
   evaluation (the close-up hood pins' shade gate and `DistrictContext.shade.islandShare`, V01 §3.8.2, §2.3): S9b's
   strips and pass 2's are the same held strips, bit for bit (T-V5-21 (h); J-V5.71). An island without a `shadeBasis` —
   raised or declared since the last evaluation (V05 §2.1) — casts and receives no strip until the next evaluation writes
   one (J-V5.72). The strips are computed whatever `w_sun` is (0 included) — the fold multiplies by the weight — so the
   shade view always reads held strips (V05 §5.1). Never by an edit, a scoped regeneration of an island or SKY-F: an
   island edit leaves every basis and every strip where they were until one of these moments (J-V5.27), and on load or
   replay the strips are rebuilt from the persisted bases (§2.9, item 274). **A ground terrain edit** (T2 on the ground
   key, a terrain conversion of §4.11) moves the receiver, not the caster: over its effective scope it re-reads every
   strip's bits there from the unchanged bases, with the field it recomputes, so the session's strips always equal a
   load's rebuild (T-V5-21 (h)); item 110 (a)'s levelling moves no receiver at all.
7. **The fold into the field.** For each ground cell, each bit of the daylight term's mask — pass 1's terrain and wall
   shade (item 102 (b), (c)) and, after an epoch, V06's building shade mask on the same layout (V06 §3.4 (6)) — is OR-ed
   with the same bit of every strip covering the cell, so a point shaded by a hill, a house and an island at the same
   sample counts once (J-V5.38); the term's shade share is the mask's popcount ÷ `bits` (§4.5). The **island-free
   value** — the same composition with the strips left out — is what the supply law reads at an epoch (V05 §3.15 (1); §4.5,
   item 296); at generation S7b (5) reads pass 1, which has no island bits by construction (item 102 (c)). **On an
   island** the same fold makes `shadeSky`: the strips onto it OR-ed, sample by sample, with — after an epoch — V06's
   building shade mask run on the island's 32 m lattice, the island's own buildings casting onto its cells by the same law
   and cap (item 102 (b); V06 §3.4 (8); J-V5.33), the mask OR-ed into `shadeSky` on the island's arena (V06 X10).
8. **The basis.** Each strip records the §6.2 hash of the bases it read (V05 §2.3a). The shade map view (V09) and the
   clerk compare the caster's with the hash of the same fields read from the live island: equal — the field shows the
   island where it hangs; different — the field still reads it where it hung at the last evaluation, the view draws the
   current strip as pending (V05 §5.1; this is the one reader of the live island's shade) and the clerk answers "The
   ground beneath will catch up the next time the town changes over time", offering **Update shade now** (V05 §4.2) for
   an immediate change (V05 §4.5).
9. **What it amounts to** (the owner's "not a hard and fast rule"). The strip only sets bits; the weight is item 102's
   `w_sun`. At latitude 50° and the equinox the nine default samples stand at 6.4°, 18.7°, 29.5°, 37.2° and 40° (computed
   from the solar geometry): the five midday ones reach 1.2 to 1.8 times a caster's height, the mid-morning and
   mid-afternoon ones about 3 times, the first and last are capped at 8 times. So an island whose underside hangs
   100–160 m above its ground blocks the cells just north of its footprint for about three to five of the nine samples
   and sweeps far to the west and east for one sample each at the day's ends: its under-hang is a crescent north of it
   (south of it in the southern hemisphere), lowered by a third to a half of item 102's all-day amount. A `root`
   underside lengthens the crescent under the low samples and a `flat` one shortens it — J98 carried into the model as it
   is into the picture (V05 §5.3). This paragraph is a derivation from the defaults, PLAUSIBLE until T-V5-19 measures it.

### 3.20 The siting rulebook on and across the island (items 103 and 104 where they reach islands)

The one placement solver (§4.7 S10b) places everything on an island, in the unit run, with item 103's rulebook as every
other district reads it; this volume adds only what the rulebook cannot know — that the island is reached by a ride, and
what an island never carries.

1. **The route distance** `skyRoute(doc, from, to) → { lengthCm: Cm; access: Id }` (`@plat/sky`; the implementer of
   §4.7 S10b's *Between arenas* reader, item 308; J-V5.36). From a point `p` on island I to a class `c` on the ground: the
   least, over I's admitted accesses `a`, of `d_I(p, attach_a) + transferM + run_a + d_G(foot_a, c)` — `d_I(p, attach_a)`
   the island leg, the straight distance × the rung's detour factor (§4.7's `street` law for a point-to-point leg);
   `transferM` the allowance for the wait and the loading (`routing.transferM`); `run_a` the access's run (V05 §2.2); and
   `d_G(foot_a, c)` the base's mode distance from the foot to the class (§4.7 S10b's *Supply distances by mode*): the
   `street` distance where the foot and the class stand on the same side of the town wall, else the `road` distance
   through the gate by which the class is reached. A class on the island itself is read on the island's own class distance
   rasters, which the unit run's S10b builds as the base's does. `access` is the access of the least sum (ties by access
   ordinal), which the clerk names (8). From a ground point `q` to a class on an island: the same sum taken the other way;
   inside the pooled S10b — before the island's own placement exists — the island's class stands at the island's land
   centroid (`d_I(attach_a, centroid)`), so the ground pool reads only what exists before it (§4.1's laziness contract);
   after generation (post-build requests, epochs) the island's placed plots are used. Between two islands: through the
   ground, both legs and two transfers. With no admitted access (every access closed or ruined) the route is ∞: the
   island's pulls to the ground and the ground's to it are unmet and reported, never routed through the air. A `river` or
   `sea` supply edge never crosses arenas (its distance is ∞): the island's conjured river and spring pond carry no trade
   and **satisfy no NEEDS row** — a class needing running water, a river bank or a harbour finds none on an island
   (J-V5.23: they are magic's own; V05 §3.5 (3) (a)).
2. **Admitted accesses.** An access in state `open` (its `unserved` reading included); never a `closed` or `ruined` one.
   A `secret` access admits only the pulls of classes whose clientele is clandestine (item 103 (a)); a `guarded` access
   only its institution's own supply edges and the law-and-enforcement classes' rows.
3. **Which families read it.** The route distance serves SUPPLY (the supply edges under the `street` and `road` modes),
   CLIENTELE (the island's `dist.market`, `dist.plaza` and `dist.gate`, V05 §3.11), COMPETITION and COVERAGE (the distance
   between members; a walking radius — the route to the ground passes every walking radius, which is why a
   walking-radius row counts the island as one unit, V05 §3.5 (3)), ALIGNMENT (law against crime, sacred against profane,
   elite against common: people walk and ride) and every signature pair of item 103 (b) whose two ends stand on different
   arenas. The nuisance families (EMITS against SENSITIVE-TO; upwind and downwind) read the straight distance in three
   dimensions — the horizontal distance and the elevation between the two points — since smoke and smell rise and noise
   carries through the air; upstream and downstream never cross arenas.
4. **What an island never carries.** `IslandRule.carry.never`'s rows (V05 §3.5 (3) (a)); their demand stays on the
   ground. What may split is (11)'s.
5. **The landings.** `sky_landing` and `sky_landing_top` are placed by their accesses (V05 §3.10), never by a pull; their
   siting facts (V05 §2.4) act on their neighbours through the families, so noise-sensitive homes keep a little away from
   a hoist house and the classes that serve the island gather near its landing yard by the route distance.
6. **Custom institutions** (item 104). A custom kind on an island reads its resolved profile as any class does; the
   island institution rows take it by its scene archetype (V05 §3.4). Nothing custom can stall the sky: an unplaceable
   preference is reported with the closest options, as item 104 (d) requires.
7. **The island's own placement is not the solver's** (J-V5.34). V05 §3.7's score places the island as one body over
   the ground plan at S7b (5), before any plot exists, so it reads no family; its purpose terms (a palace near the plaza,
   a prison or an arcane tower far from it) are the island-scale reading of those institutions' profiles, and V11 writes
   their values with the profile as their provenance.
8. **"Why is this here"** (item 103 (e); V05 §4.5): a use on an island names the rows that pulled it, and a pull that
   crossed arenas names the landing it went through and the route length ("near the mill below, by the east hoist, 340 m
   by route").
9. **Supply chains across the island** (item 104 (h); J-V5.39). An ACTIVE custom chain (item 104 (b): every node present
   in the dossier) — and, for a dossier-backed town, each of the dossier's `activeChains[]`, its processors resolved by
   kind family (item 105 (i); V08) — is placed as one connected thing by the base's chain rules; the island changes five
   things and nothing else.
   (a) **What goes up.** The sky fill never carries a chain's RESOURCE node — a resource sits at its terrain feature on
   the ground (item 104 (h) (1)); the island's conjured river and spring pond are magic's own, carry no trade (1) and are
   never a chain's feature — nor its PROCESSING nodes, first or later, whose demand stays on the ground with the chain's
   working steps (V05 §3.5 (3)). Its FINAL SELLER and its CONSUMERS follow V05 §3.5 (3)'s proportional share like any
   class. The one exception is the island's own institution (V05 §3.4): a custom kind carried as a `tower`, `palace` or
   `cathedral` that is also a chain node, at any step, stays on its island and keeps every link by the route.
   (b) **The links cross by the route.** Every link between a node on an island and a node on the ground is a supply edge
   of mode `street` measured by `skyRoute` (1) — so the chain's last ground node leans toward the landing foot whose
   route to the island's node is shortest, and the island's node toward that landing's top. Item 104 (h) (2)'s natures
   act on the route as on a street: a perishable link's short reach holds its ground end close to the landing; a bulky
   link's water and main-road preferences never cross arenas (a `river` or `sea` leg is ∞ there, (1)), which is one more
   reason (a) keeps bulk on the ground; a valuable link's security pull counts a `guarded` landing as a secure site and an
   `open` public one as none.
   (c) **Order.** Placement runs upstream first (item 104 (h) (4)). At generation the island's unit run reads a ground
   supplier as the pooled S10b reads any provider — the block whose S10a allocation holds it, eager and town-wide (§4.7
   S10b's *Supply distances by mode*) — and the ground pool reads an island node at the island's land centroid (1); a
   post-build request and an epoch read the placed plots on both arenas. The flow order is measured along the route: a
   chain's final seller on an island stands at a smaller route distance to its market than the chain's resource does, in
   at least the share the base's ground-only bar declares for the same chain (T-V5-24).
   (d) **Shape** (item 104 (h) (3) as item 107 (e) revises it). A chain whose in-town nodes lie on two arenas sits close
   at street scale on the ground, where its steps are compatible, and STRETCHES through its landing, the landing one step
   on its road; it is never read as close across the arenas. It is named a quarter only past item 72's quarter-identity
   threshold, or by the dossier or the author — and then on the ground (volume 1's reading), since (a) leaves an island at
   most the sellers and the consumers; no quarter is ever assigned to it by rule.
   (e) **Endpoints, services, change, declarations.** An import or export endpoint's store stands at the ground's gate or
   quay facing the partner (item 104 (h) (6)), never at a landing — an island has no outside partner of its own. A custom
   service `providedBy` an island institution sits inside it on the island (item 104 (h) (5)). A chain that deactivates
   leaves its island nodes where they stand, their pulls removed; one that activates places its new nodes against the
   standing ones, upstream first, an island node by the solver's positive placement on the island's arena (§7.7's
   `placeAt`) — never a unit run (V01 §3.10.3 (6)), never by moving, resizing or re-deriving an island (item 104 (h) (7)).
   An author's map-side declaration of a custom kind onto an island (item 104 (a) (1)) is T6's `assign` with
   `criteria.sky` (V05 §4.2), keyed by the kind's `localUid`, and is held as every declaration is — it may place a
   processing node up, the author's word outranking (a), with the fate "this chain now crosses the hoist" listed at its
   dry run.
10. **The supply web across the arenas** (item 105 (a)–(e); J-V5.50). Every link binds, pulls and explains across an
    access exactly as on the ground, with the route as its distance and the access as the place where its end is felt:
    (a) **Binding.** Each consumer member binds to its NEAREST provider member of the good by the edge's mode (item 105
    (a), item 107 (c)), measured by `skyRoute` when the two stand on different arenas — the same metric the pull reads —
    ties by provider address.
    (b) **Both ends pulled, at the access.** An island consumer counts toward its ground provider's weighted centre (item
    105 (b)) at the **foot** of the access its route used, weighted as its link; a ground consumer bound to an island
    provider counts at that access's **top** (its island attach) — never at a world position beneath the island, where no
    goods go. So a ground baker serving the island leans toward the main hoist's landing yard, and an island shop serving
    the ground leans toward its landing's top.
    (c) **Orientation, several outputs, hubs** (item 105 (b)–(e)). A class's orientation (source, market or balanced;
    V11's goods table) and its per-good pulls act across the arenas through the same substitution; a balanced class's
    "junction where its input and output routes meet" may be a landing — its foot on the ground, its top on the island —
    scored, never forced.
    (d) **Status.** A link of one of the dossier's `activeChains[]` that is `impaired` or `vulnerable` weakens by item 105
    (i)'s status table on the route as on a street (9).
11. **Split works and shops across the arenas** (item 105 (h); J-V5.51). A split class carried by V05 §3.5 (3) (c) is
    one item on two plots on two arenas: its works on the ground by its nuisance and input rows, its shop on the island by
    its output and clientele rows, the shop's `Use.branchOf` naming the works' use; the route between them is its own
    link (their distance for every row that reads it). Every lifecycle path covers both, as item 105 (h) requires:
    creation by S10b as one item (the pooled S10b places the works, the island's unit run the shop, reading the works at
    its S10a block by (12) (a)); a state, closure or removal of the institution reaches both; a relocation moves each by
    its own rows; a fall or a delete of the island relocates the shop (the works stays); undo restores both; the author
    or the clerk may merge them back onto one plot by a map-side declaration (on the ground; up only by an author's held
    T6 declaration, with the fate listed); migration: an absent `branchOf` is no split. Every split across the arenas is
    reported.
12. **Order, the district term and spread, per arena** (items 105 (f), (g) and 107; J-V5.52).
    (a) **Order and relaxation.** At generation each arena runs item 105 (f)'s order — anchors, field-driving classes,
    source-oriented classes by depth, balanced, market-oriented — and its one bounded relaxation on its own: the pooled
    S10b on the ground, the unit run's S10b on each island. Each reads **only the other arena's proxies** — the ground
    reads an island's classes at its land centroid ((1)), the island reads a ground provider at the block its S10a
    allocation holds ((9) (c)) — never the other's placed plots, so neither order waits on the other and both relaxations
    are byte-stable whatever the worker's interleaving (T-V5-22 (j)). After generation (post-build requests, epochs), both
    read the placed plots on both arenas, the relaxation of one arena holding the other's placements fixed.
    (b) **The district term** (item 105 (g); J-V5.75). S7b (1)'s supply term reads a sky pseudo-district as one consumer
    location at its island's **land centroid's world point** (`anchor` + the outline's centroid, fixed by S7b (5)'s
    placement, V05 §3.7; §4.7 S10b, item 308) — the proxy the ground pool reads for an island's classes ((1)) — since the
    landing feet are sited only at SKY, after S7b (V05 §3.1). Its carried classes' links are scored there against the
    providers already allocated, by the centroid distance volume 1's χ̃ reads at S7c (V01 §3.2 (5)) — no route, since no
    access exists yet — so the ground districts beneath and beside the island gain a little supplier affinity, at the
    term's low weight, never past J-A72.46's dispersal.
    (c) **Near enough** (item 107 (b)). A cross-arena link's satisfaction plateaus on the route length: full within the
    good's `comfortM` of the summed legs (`transferM` counted inside), decaying to 0 at `maxDistanceM`.
    (d) **Spread** (item 107 (a), (d), (f)). Coverage counts an island's districts as districts (V05 §3.5 (3); J-V5.37),
    and a spreading class's same-kind spacing (its soft `far` row to its own class inside a district) applies inside each
    island district as inside a ground district; an everyday service's link to its supplier across the arenas keeps its
    generous `comfortM`, so an island apothecary is never pulled down to the herbalist below.
    (e) **Quarters never assigned** (item 107 (e)). No island district is made a quarter by rule. A dossier QUARTER record
    (item 108 (a)) or district-defining record (item 72) binds to ground districts when records bind, before any island
    district exists; the author may bind one to an island district by T5 with `sky` and the record's kind (V05 §4.2),
    held with its fate.

### 3.21 The rim as a barrier (item 106 where it reaches islands; J-V5.49)

An island is barrier all round: its rim is a sheer drop, and its only approaches are its landing yards.
1. **The rim is a barrier edge.** For item 106 (a)'s closure and every "enclosed" or "sealed" test, the island's `rim`
   chain is a natural barrier — V11's `walls.barriers` row `sheerCliff` by its `islandRim` rule (closure only, wall
   `none`), its closure-arc kind `sheer` (one of the six kinds of J-VI.3) — and the clerk's `closure` answer names it
   barrier `sheer` (V10's `WhyAnswer.closure`).
2. **Generation never walls an island.** No stage lays an enceinte on a sky arena; the island's defence is its rim and
   its landings. A prison island's is its rim plus its `guarded` landing, the one approachable arc, whose `guarded` role
   already admits only its institution's and the law-and-enforcement classes' rows (V05 §3.20 (2)).
3. **An author's wall on an island** (T3 `wall` in one of its **enclosure** kinds with the `key` parameter naming the
   island; `drawWall` with `key`, V05 §4.2) is an `Enceinte` of closure `barrier` on the island's arena — T3's
   `retaining` kind and a T2 terrace stroke's edge are never enclosures and lay an island `RetainingWall` instead (V05
   §3.22 (4)): its approachable arcs are the landing yards' frontages — each landing yard is closed across its inner side
   by one stretch on the rim strip's `setback` line, both ends anchored on the rim (a tower at each anchor, item 106 (a)'s
   anchor rule) and a gate at the yard's attach — and every other arc of the rim is closed by the barrier, with zero wall
   edges. The tool snaps the stroke's ends to the rim and shows the rim arcs as part of the circuit (item 106 (g)); a
   stroke drawn along the rim away from a landing is bent at its dry run to the rim arcs' landing stretches only, with the
   line "the drop is the wall here" (J-VI.4), and a stroke that crosses the island's interior is an inner wall laid as
   drawn (a castle's or a close's, §4.8's furniture). The stretch profile (item 106 (c)) grades each stretch: the full
   curtain across a landing yard, the strongest towers where it meets the rim. Adding or removing an access re-evaluates
   the circuit by item 22's least disruption: a new landing gets its stretch and gate, a removed one's stretch is removed
   (listed fates). An island with no live access keeps its barrier circuit with no stretch.
4. **The clerk** explains an unwalled rim: "the drop is the wall here" (V05 §4.5).
5. **The no-op pin.** With item 106's `barrier` closure and the stretch profile off, an author's island wall is the base's
   ring along the rim strip's line, byte-identical to the base (T-V5-27).

### 3.22 Item 110 on, under and against the island (the owner's "they go in")

The base carries item 110 (a)–(d) (§2.7, §4.3, §4.7, items 244–246, 290, 309); volume 1 carries terraced wards and the
unit run's levelling, volume 2 stepped massing and deck buildings, volume 4 the vaults under raised ways, and volume 6
all of it over epochs. The island meets item 110 in the places below; each rule here is this volume's, and none of it
changes a ground value while the island setting is off.

1. **Casters under an island.** Everything item 110 raises above the ground is a caster to the island's clearance: a
   raised part's deck top with its parapet, or an aqueduct's channel wall, over the deck's plan, and its raised-way piers
   (item 110 (b)); a retaining wall's high-side top and a levelled platform's datum where fill raises it (item 110 (a)); a
   stepped building's highest massing tier, read from V02 §3.15.2's stack envelope (item 110 (c)). They are read at SKY
   for what exists then (V05 §3.9 (3): every generated raised part, by §4.3's slot), at SKY-F for what the pool and the
   unit runs placed (V05 §3.9 (5)), after every epoch's growth (`sky.clearance`, V05 §3.15 (7)), and by any edit that adds
   one beneath (V05 §4.3). Their heights are V11's raised-way, terrace and massing-tier rows; the caster allowance's P0
   measurement runs with them on (V05 §3.9 (5)). A raised way under an island's shade casts its own shade by §4.5's
   daylight term (item 290: raised ways and retaining walls are its casters), OR-ed with the island's strip sample by
   sample (V05 §3.19 (7)), so a cell under both counts once (T-V5-31 (g)).
2. **The island yields, never the city** (J-V5.68). No raised part, retaining wall or building is moved, lowered or
   refused because an island floats above it: the island's `groundRefCm` rises to clear it and its elevation follows only
   where the floor needs it. The raised-way generator treats an island's projected footprint as open air; only the
   accesses constrain its courses ((3)). A caster removed beneath an island re-reads `groundRefCm` and never lowers the
   island (V05 §4.3).
3. **The accesses and the decks** (J-V5.60, J-V5.61).
   (a) **Feet on part-0 land only.** Admissible ground for a foot, a landing yard and S7b (5)'s reachability transform
   excludes every raised-way pier footprint, every raised deck's plan dilated by `accessSiting.deckGapM` and every deck
   face of item 110 (d) (V05 §3.7 (2), §3.10 (3)–(4)); "the nearest way" is a walkable part-0 way.
   (b) **Rope lines clear the decks.** A `ropeway` or `lightBridge` keeps `accessSiting.lineClearM` over every raised
   deck and raised-way pier its segment crosses, at SKY and after (V05 §3.10 (3)).
   (c) **The accesses as overhead obstacles.** For every raised part laid after SKY, `skyAccessObstacles(doc)` (V05 §2.3b)
   is read by its two callers (§4.3, item 290 (5)): the course solver at an epoch's raised-way pass (V06) or a new
   stage's S4 in an epoch, which keeps the deck, its parapet and its raised-way piers out of every column dilated by
   `deckGapM` and under every segment by its `clearCm`, re-routing by its own ladder and otherwise not building the part
   (reported "would cut <island>'s hoist"); and T4 `road`'s `raised` dry run (and the aqueduct class), which re-routes or,
   failing that, ends the course at its last ground vertex before the column with the line "this would cut <island>'s
   hoist; it ends here" (J-VI.4 (f)). An access placed or moved later (`placeSkyAccess`, a move, `setAttr(ground.at)`)
   meets the standing raised parts by (a) and (b) at its own dry run.
   (d) **No raised way reaches an island.** A raised part's two ends are ramps or stairs joined to ground vertices; a T4
   `raised` or aqueduct stroke that ends on an island's rim makes no way and is bent into a sky access (V05 §4.2; J-VI.4
   (d)), so II.1's "sky: no portals, no roads in or out" stands. **No raised part stands on an island**: item 110 (b)'s
   decks live in ground parts ≥ 1, and the sky layer has one part per island (V05 §2.1); a T4 `raised` or aqueduct stroke
   on an island's key is bent (J-VI.4 (e): `raised` dropped, the aqueduct made a fountain pin; the lines "An island
   carries no raised way; its bridges cross its river on their own decks" and "An island's water is its own"). **No
   access is a way** (V05 §2.2).
4. **The island's own retaining walls** (§2.7, item 245; J-V5.69). Volume 1's unit run levels island ground by item 110
   (a)'s thresholds (`terrace.slopeMin`, `terrace.stepMinCm`, V11's rows, read unchanged), which on the island's gentle
   dome and quarter-amplitude echo (V05 §3.8 (3)) bite mainly on an `own` relief of a steep class; a terraced edge is laid
   only where the island's relief class — `terrainEcho.reliefClass` for `own`, `plain` for `echo` and `none` (V01
   §3.17.7 (2)) — asks for terraces. Each retaining wall it raises — and each one an author draws with T3's `retaining`
   kind or as a T2 terrace stroke's edge with the island's `key` — is a `RetainingWall` on the island's arena ("a chain on
   the arena whose terrain it levels", item 245). **Never on the rim strip or along the rim:** the levelling stops at the
   rim strip's `setback` line, and a retaining or terrace stroke that meets the rim strip or runs along the rim is bent
   inward past the rim walk at its dry run, with V09 §4.9's `bend.retaining.rim` line "The rim walk stays level; the wall
   stands inside it" (J-VI.4 (g)): every point of the stroke lying in the rim strip moves along the island's radial
   direction (from the land centroid) to 1 m inside the strip's `setback` line, the other points unchanged (V09 §4.20.9's
   geometry). It is never an enclosure, never snapped to the rim and never a member of a barrier circuit (V05 §3.21 (3)).
   It draws in the island's frame and is displaced with it under `offset` (§8.4), its shadow on its low side as item 110
   (a) draws it; it tombstones with the island at a fall (V05 §3.16 (7)) and exports in the island's `sky` collection (V05
   §5.5). The surface top and SKY-F's crypt re-test read the levelled heights through `levelledGroundCm` (item 309; V05
   §3.9 (4), §3.10 (5)); on a sky key its fallback is the island's terrain SKY writes, with the T2 strokes (built with
   item 580). A way that crosses it becomes a stair or a ramp by item 110 (a)'s way-class rule, on the island as on the
   ground.
5. **What the raised-way generator reads of the sky** (J-V5.63). The generator's sky clauses are §4.3's (item 290 (5)):
   ground-arena endpoints and evidence, reservations as an elevated road's endpoints, ground hydrology, the water need by
   arena. What they mean on the island's side: a road raised to a precinct whose cathedral later rose to an island stands,
   since S7b (5)'s hand-over keeps the reservation (V05 §3.5), and its reason reads through the hand-over ("links the
   citadel and the old cathedral close, whose cathedral rose to <island>"); S7b (5)'s eligibility is unchanged, a road
   holding no institution on the ground. The ground-only test is by arena (`PlatKey.layer`), never by a list of `sky-*`
   kinds, so no sky ward, island institution or island landmark is ever an endpoint or evidence. At generation the
   aqueduct's need reads S2's whole population, since S7b (5) has not run — a small, deterministic overestimate (a full
   island carries at most `fill.householdCapDistricts` × `H_d` households); at an epoch it reads the ground households
   only: an island's households are never in a ground water need, its water being its own (V05 §3.8 (4)) and any well the
   unit run sinks on the island's arena reading nothing of the ground. The island's conjured river, spring pond and
   waterfall are never "a higher spring or upstream river" (a pond 60–220 m up is exactly what a naive search would
   find), and no aqueduct terminal, basin, cistern or fountain stands on an island.
6. **Stepped massing and deck plots on the island.** An island institution may take V02's stepped rows (a stepped temple,
   a terraced palace, a tiered tower) through its composition and class rows, as on the ground; the surface top reads each
   point's highest massing tier (V05 §3.9 (4)), and a cathedral's crypt lies under its lowest massing tier, inside
   underside tier 0 (V05 §3.10 (5)). The island's bridges over its conjured river (built by volume 1's unit run, V01
   §3.10.3 (4)) may carry deck plots by item 110 (d)'s base mechanism, and they fall with the island (V05 §3.16 (7)).
7. **Removals.** A removed generated raised way, retaining wall or deck plot beneath an island holds through regeneration
   and epochs by item 260's suppression (V06 §2.13); this volume adds only the island's own removals — an island or an
   access that stays removed, in their own record form (V05 §3.2 (6), §3.10 (1), §4.2; item 260).
8. **The landfall** covers raised spans, raised-way piers, retaining walls and deck plots (V05 §3.16 (2)–(5)).
9. **The no-op pin and the declared shift** (J-V5.67). With item 110's terrace, raised-way and deck-plot rows off, every
   island value — its altitude, ground reference, accesses, strips and landfall — is byte-identical to this volume
   without item 110. With them on at their defaults (the owner's default at CITY and METROPOLIS), both sky goldens of
   T-V5-15 change once, a declared shift naming both fixtures: raised ways and retaining walls beneath and on the islands,
   and `groundRefCm` and the altitudes where a raised part stands under a solid.

### 3.23 Edges — every mechanism at its limits, and where the sky meets the other units (principle (11))

Every mechanism of V05 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home.

**(a) Degenerate geometry.** Every step of this volume that commits geometry — SKY's L0 and L1 batches, the rim's
resize and reshape, the landing claims, the institution claim, the landfall's knots — commits through kernel
transactions: a degenerate result (zero-length, zero-area, self-touching, collinear, coincident) is refused by the kernel
(§3.1's `E_DEGENERATE` family; §5.1's general rule) and taken by the step's class on its ladder (F-OUTLINE, F-SKY-PLACE,
F-SKY-ACCESS, F-SKY-CRYPT; V05 §3.17). The pure functions (`undersideTiers`, `islandShadeStrip`, `skyRoute`,
`skyAccessObstacles`, `removedSlots`) meet degenerate geometry only as input and return a defined empty result: a tier
ring narrower than a mask cell blocks nothing, a strip with no blockable cell has an empty window and `cells` 0, a route
with no admitted access is ∞, a list with no live access is empty. The view's derivations (marks, slabs, labels,
exports) skip a degenerate mark and never fail a tile (V05 §5.1). Tests: T-V5-6, T-V5-33 (a).

**(b) Rungs.**

| rung | the sky |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | no island ever: `RungProfile.layers.islands` admits none (§1.1); S7b (5) and SKY register and write nothing; a T5 `sky` declaration is bent to a ground quarter (`bend.island.rung`); the village product has no sky stage (V07) |
| TOWN | the same at generation; an island carried down by a rung crossing (V05 §3.15 (6)) wanes, settles and falls over its dwells by the same laws, its landfall's rules rung-free (V05 §3.16), its marks and labels drawn as at CITY until it falls |
| CITY | the sky whole: the CITY rows of `IslandRule`, `districtHa` 3.5 ha, the field's 32 m lattice, the marks, labels and exports |
| METROPOLIS, to its population cap | the sky whole on the METROPOLIS rows; at the cap still at most three islands (the slots), the fill capped at `fill.householdCapDistricts` × `H_d`, the strips and the route on V05 §6's METROPOLIS rows |
| a standalone neighbourhood document | no sky (V01 §3.10.1's layers); a sky unit run is only SKY's call |

Tests: T-V5-1, T8-6, T-V5-14, T-V5-33 (b).

**(c) Toggles and presets.**

| toggle or preset | the sky |
|---|---|
| `recipe.layers.islands` off (the default) | nothing of this volume runs; the ground model byte-identical to the realism golden (T13-1); both landing data keys empty (T-V5-32) |
| `MFCG`, `FTG` | islands held off (J-V5.25); every shipped sheet still resolves the sky semantics (V05 §5.1) |
| `NG`, `VG`, `FM` | the sky by the recipe's own setting (`VG` at village rungs has none, (b)) |
| the sky layer hidden (§8.4's `LayerSpec.visible`) | no sky mark, label or slab drawn — so no island shadow on the ground — and no sky label a candidate; the model, the strips and the field unchanged (II.6 (1)); exports follow §11.1's layer selection, the `.plat` record always kept |
| the occlusion modes, the style's `shadows` | V05 §5.2, §5.3; with `shadows` off no slab is drawn, the strips (model data) unchanged |
| `w_sun` 0; item 102's rows off | the strips still computed and held; the field byte-identical to the run without the island term (T-V5-19 (c)) |
| item 106's `barrier` closure and profile off | an author's island wall is the base's ring (T-V5-27) |
| item 110's rows off | V05 §3.22 (9)'s no-op pin (T-V5-15) |
| item 111's cells at any value | the island unchanged (V05 §3.8 (4); T-V5-9 (h)) |
| items 105 and 107's weights 0; coverage weight 0 | no-op pins (T-V5-22 (b), (k)) |

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's six cells are V05 §2.6's and every event's
§7.4's (item 375); every derived view — `SkyUnitInput`, the strips, `shadeSky`, the gradient raster, `removedSlots`,
`skyAccessObstacles`, the route, the underside tiers, the marks — is recomputed on load, undo, redo and regenerate from
committed state and never stored, so none goes stale in a save; the strips rebuild from the persisted `shadeBasis` alone
(§2.9, item 274). A snapshot whose sky fields contradict each other — an `areaHa` off its land face by more than 1 %, a
`slot` outside 1–3 or held by two live islands, a `key` part at or above `nextSkyPart`, an `accesses` id that resolves to
no `SkyAccess` — fails the load's verification and is a corrupt cache: the document loads by replay from its log (§2.9
step 3), which re-derives the island; in a session the same contradictions are §5.3's sky invariants (item 331). Tests:
T-V5-15, T-V5-16, T-V5-21 (h), T-V5-29, T-V5-33 (d).

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory data
(E5), and the degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| the island record (V05 §2.1) | a migrated base island without `terrain` or `underside` | `terrain` written by SKY's terrain step (V05 §3.8 (3)) on its slot's key, `underside` the rule's default profile drawn on its slot's key (V05 §2.6), both reported | substitute | T-V5-33 (d) |
| the access record (V05 §2.2) | its `rule` names no row of the current table (a release removed the row) | it keeps its kind and reads the kind's current row; with no row for its kind (a table without `lightBridge`), it keeps its geometry and reads `closed`, reported (§7.5's table-row migration) | substitute; leave out and report | T-V5-33 (d) |
| the access record (V05 §2.2) | a ground edit turns its foot or yard to water, removes its landing plot, or covers it by a landfall | re-landed in that edit's commit by V05 §3.10 (4)'s rule, a new yard claimed, as a move re-lands it; else dropped by F-SKY-ACCESS's last rung (closed, reported; an island with none reported `unreachable`) | repair locally; leave out and report | T-V5-14, T-V5-33 (e) |
| the unit inputs (V05 §2.3) | an island whose land is all rim strip and claims; an allocation with no row | the unit run returns no district (V01 §3.10.3 (2)) and F-SKY-UNIT re-places every household on the ground; an empty allocation lays an island of strip, claims and landings only, its fabric empty, reported | substitute; leave out and report | T-V5-9 (i) |
| the shade strip (V05 §2.3a, §3.19) | no `shadeBasis`; a sampler digest that differs; a receiver above the caster; an empty window | no strip; recomputed whole; no bits; `cells` 0 and no attribution, outline or export feature | check | T-V5-19, T-V5-21 (h) |
| the rule tables (V05 §2.4) | value-keyed rows not strictly increasing in `v`, an `h` outside [0, 1], `minAreaHa` above `areaHaMax`, a reversed `altitudeM`, every weight of a draw 0, a missing cell | V11's table compiler refuses the table (its validity check), so none loads and `editTable`'s dry run names the cell; a missing cell reads its default (V05 §2.6) | check | T-V5-33 (c) |
| the supplies (V05 §3.3) | no built cell (every district cell in water or an excluded reservation) | `S_town` = 0, so `h_town` 0 and no island, reported `no supply`; at TOWN and the village rungs never computed (the gate first); recomputed at S7b and each epoch only, never by an edit (V05 §2.6) | check | T-V5-3 (d) |
| the reason draw (V05 §3.4) | no candidate; exactly one | the slot closes, reported `no supply` or `nothing to carry`; the one candidate is taken (a weighted choice of one draws nothing new) | leave out and report | T-V5-4 |
| the fill (V05 §3.5) | a band whose demand is one household; the cap; zero rows | one batch of one household; the fill stops at `fill.householdCapDistricts` × `H_d`, its batches bounded by 1 ÷ `fill.batchShare` per eligible band; a carried row whose count rounds to 0 is dropped; the allocation is re-made only by a re-derivation from S7b and an epoch's delta fill | check | T-V5-4 |
| the shape (V05 §3.6) | a declared lasso that self-touches; two to four corners collinear or coincident; an area below `minAreaHa` | F-OUTLINE repairs the lasso (§5.2's rungs, the kernel's simple hull last), bent at the dry run; collinear or coincident corners give no hull and the declaration is bent to a disc of the kind's area at their centroid; an area below `minAreaHa` is bent up to it (`bend.island.floor`) | repair locally; simpler shape | T-V5-6, T-V5-16 |
| placement (V05 §3.7) | a ground frame smaller than the outline plus `frameInsetM`; one candidate; a missing purpose target (no plaza, no precinct, no district with a prosperity mean) | no candidate, so F-SKY-PLACE's ladder (shrink `A`, then close the slot); the one candidate is taken; a missing target gives no purpose term (the precinct falling back to the plaza first) | simpler shape; leave out and report | T-V5-5 |
| the arena (V05 §3.8) | a ground relief class missing; a `hydro` grid of one cell; no ground river | `plain`; the descent stalls and F-SKY-TERRAIN gives no river; the spring pond's draw | substitute | T-V5-7 |
| the underside (V05 §3.9) | a crescent whose land centroid lies outside its land face; every tier ring below 1 % of the land; an altitude floor above `E_max` | the apex pulled toward the land face's point nearest the centroid; the stack ends at the first such tier (a `flat`-like island); the floor wins over `E_max` — no cap binds it — and an island above every access row's limit is reported `unreachable` by F-SKY-ACCESS | repair locally; leave out and report | T-V5-10, T-V5-33 (e) |
| access (V05 §3.10) | the cap; one access; a hand-placed access beyond the rim's yards | generated accesses ≤ `accessCount.max`; one access is `main`; V05 §4.2's `bend.access.rimFull` | check; bend | T-V5-8 |
| the field (V05 §3.11) | one carried band; a lattice of one cell | every rank maps onto that band's inner range; the one cell takes rank 1 (the richest band) | check | T-V5-9 |
| the unit inputs' contract (V05 §3.12) | the district count's bound | k is V01's `skyDistrictCount`; the fill bounds the plot land at `plotShare · A` ≤ `plotShare · areaHaMax`, so k ≤ ⌈`plotShare` · `areaHaMax` ÷ `districtHa`⌉ per rung | check | T-V5-9 |
| lights (V05 §3.13) | `h_carried` 0 at SKY-F; a fallen or removed island | the rim and keel rows laid at 0 cd, the access lanterns lit; none (tombstoned with the arena) | check | T-V5-11 |
| names (V05 §3.14) | no echoed river, no district below | those features absent and the grammar's rows that need them skipped | substitute | T-V5-11 |
| the epoch laws (V05 §3.15) | a target above 0 but below `minAreaHa`; a target below the institution's floor | the resize stops at `minAreaHa`, or at the claim's floor (V05 §4.2), listed in the epoch's report; a target of 0 wanes | check | T-V5-14 |
| the landfall (V05 §3.16) | a footprint wholly over water; a covered entity of zero area; a footprint partly beyond the ground frame | a decoration with no member and the one fate "sank in <water body>"; never covered (its share undefined counts 0); the part beyond covers nothing, reported "fell beyond the map" | leave out and report | T-V5-14 |
| determinism (V05 §3.18) | one island; a removed slot | slot 1's indices alone; the skip leaves every other draw unchanged | check | T-V5-15, T-V5-29 |
| the rim as a barrier (V05 §3.21) | an island with no live access; a zero-length wall stroke | the barrier circuit with no stretch; no wall (T3's dry run bends it to nothing, its line naming the stroke) | leave out and report | T-V5-27 |
| item 110 on the island (V05 §3.22 (4)) | a retaining stroke wholly inside the rim strip whose moved points coincide | bent to nothing (`bend.retaining.rim`) | leave out and report | T-V5-27 |
| the declarations and events (V05 §4.1, §4.2) | a T5 `sky` declaration at TOWN or a village rung; a reshape making the rim non-simple; a resize to 0; a move into another island's gap | `bend.island.rung` (a ground quarter); the drag bent back to its last simple position; `bend.island.floor`; `bend.island.move` | bend | T-V5-16 |
| locality (V05 §4.3) | a ground edit touching an island's footprint at a point only | no meet (the footprint test reads cell overlap); the island untouched | check | T-V5-16 |
| the dossier (V05 §4.4) | many `magical_node` deposits; more eligible dossier institutions than slots; a dossier rung below CITY | one addend; at most three islands, the rest on the ground (the reason draw picks among them); DR27 resolves `gated: rung` | check | T-V5-25, T-V5-1 |
| the dossier (V05 §4.4) | a dossier event's undo; a save between an absorb and the next epoch | a dossier event has no undo target (§7.4), so the island's re-reasoning is the epoch's and undone with it; the "awaiting a new purpose" island persists as its record stands (reason `institution`, `institution` absent) | check | T-V5-14 |
| the clerk (V05 §4.5) | no island; a key that admits none of an island's accesses | the island rows are absent; the withheld accesses unnamed, the route reported through the admitted ones only | check | T-V5-33 (f) |
| marks (V05 §5.1) | a user sheet missing a sky semantic; an island at TOWN after a crossing | the loader refuses the sheet, naming the semantic (§8.2's slot resolution); drawn as at CITY | check | T-V5-12 |
| light (V05 §5.3) | no island; a fixed sun at the zenith; the sky layer hidden | no slab and no second base; the shadow under the footprint (reach 0); no slab drawn | check | T-V5-13 |
| labels (V05 §5.4) | an island too small for its spine | a point label at the land centroid, or none where that collides | substitute | T-V5-12 |
| exports (V05 §5.5) | no island; a hoist or stair whose top and foot share one plan point; the sky layer hidden; an export after an undo | no sky container; the access exported as a Point with `topElevationM` and `footElevationM`, never a two-point LineString on one point; §11.1's layer selection, the `.plat` record kept; byte-identical to the export before the undone event | check | T-V5-17 |

**(f) Where the sky meets the other units** — the cross-unit combinations this volume owns (the later-built unit or the
feature's own unit), at CITY and METROPOLIS:

| combination | outcome | rung | test |
|---|---|---|---|
| a raised way under an island's shade (the owner's named combination) | a caster to the island's clearance (V05 §3.22 (1)) — `groundRefCm` rises, the island never the city (J-V5.68) — and a caster of §4.5's daylight term (item 290) OR-ed with the island's strip, a cell under both counted once | check | T-V5-31 (a), (b), (g) |
| a cliff, steep ground, a coast, a harbour, a moat, a bridge or an oasis under an island's shade | the strip's receivers are the field raster's cells at the unlevelled terrain height (V05 §3.19 (3)), whatever the feature: water cells (sea, harbour basin, moat, oasis) take bits with no plot to move, bridge cells the ground's height (never the deck's); the corridor's `g_min`/`g_max` bound covers any relief; on an arid site the ground's weight is the climate row's (§4.5, item 111 (c)) — 0 or toward shade — so a strip over an oasis may raise the field there | check | T-V5-34 (a) |
| a retaining wall, a terraced ward or a deck plot under an island's shade | receivers unlevelled (J-V5.65): a terrace platform's datum and a deck's surface are never receiver heights; a deck plot reads the field cell it stands over; retaining walls cast by §4.5's daylight term (item 290), OR-ed with the strip | check | T-V5-21 (h), T-V5-34 (a) |
| an access foot by a moat, on a terraced ward, at the frame's edge or over a vault | a foot inside a moat's band or beyond the ground frame is no admissible point (water; no raster cell); a foot whose nearest way lies across a moat reaches it over a bridge by the lane rule or takes F-SKY-ACCESS's repair lane, else drops; on a terraced ward the run is measured to `levelledGroundCm` at the foot and a yard straddling a retaining wall's chain slides along the spine clear of it, as a deck does; a vault below the foot is nothing to the access (the underground is neither caster nor receiver, item 2) | repair locally; leave out and report | T-V5-34 (b) |
| a landfall over a cliff, steep ground, a coast, a moat, a square, a terraced ward, a composed building, a planned building or the frame's edge | V05 §3.16 (4)'s table by covered kind, rung-free: the terrain is untouched (a barrier arc is a chain role, no entity); a part over the sea or a moat sinks; a square is a covered reservation; a terraced ward's retaining walls `decayed`; a composed or planned building demolished with its composition and plan records tombstoned with it (V02, V03); the part beyond the frame covers nothing | leave out and report | T-V5-14, T-V5-34 (c) |
| a neighbourhood close-up holding a ground landing | the access symbol drawn by V01 §3.8.8 | check | T-V1-33 |
| a vault or the underground under an island | no relation (item 2): an island reads nothing of the underground and casts no shade on it; the strips set bits on the ground's field only | check | T-V5-26 |
| a lock or pin under a strip | the field moves; the locked plot's content is held as any lock holds it (§7.2), its value reported | check | T-V5-34 (d) |
| Update shade now undone | the former basis, strips and field cells restored from the undo record (§7.4's row) | check | T-V5-16 |
| a landfall saved and reloaded | the decoration, its members, the quarry's `source`, every `formerClass`, `condition` and retaining `state` persist in the model digest; the fall's undo record survives the reload within §7.4's carried undo records, so an undo after the reload restores the model byte for byte | check | T-V5-34 (e) |

**(g) The four observed edges** are defined at their homes: a locked island whose institution the dossier removes (V05
§3.15 (1b)); a landfall over another island's landing (V05 §3.16 (4)); the maximum of hand-placed accesses (V05 §2.3b,
§4.2); the clearance against a lock (V05 §3.15 (7)).

## 4 Editing

### 4.1 The declarations — item 101's twelve tools, no thirteenth

Every island edit is an existing tool with at most one new parameter (§7.1's elegance rule); each event's home tool is
§7.1's binding table (E-04), which this table follows:

| tool | on the sky | the events it emits |
|---|---|---|
| T1 `intend` | the islands setting (off / on) and the count (`auto`, 0–3) | `adjust('layers.islands')`, `adjust('islands.count')` — both Re-derive from S7b with their fate report (§7.8) |
| T2 `ground` | an island's terrain, water and rim, with the `key` parameter naming the island; a terrace stroke on the island, whose edge lays an island `RetainingWall` (V05 §3.22 (4)) | `setField(terrain)`, `drawWater`, `moveCourseKnot` on its river, `warp` on its key (`fromLevel 0` moves the rim); item 110 (a)'s terrace form with `key` |
| T3 `wall` | a wall on an island, with the `key` parameter: in an enclosure kind a barrier-closure enceinte walling only the landing yards (V05 §3.21); in the `retaining` kind an island `RetainingWall`, bent inward past the rim walk when drawn on or along the rim (V05 §3.22 (4)) | `drawWall` with `key` (its kind item 110 (a)'s) |
| T4 `road` | a stroke from a ground point to an island's rim; with `raised`, bent into an access; with the aqueduct class, ended at its last ground vertex outside the footprint; on an island's key, `raised` dropped and the aqueduct class made a fountain pin (bends, J-VI.4 (d)–(e); V05 §4.2, §3.22 (3)) | `placeSkyAccess` (the kind from the stroke's class, or chosen by the dry run by V05 §3.10's rules); a bend emits the bent declaration |
| T5 `quarter` | a floating quarter: the `sky` parameter | `quarter` with `sky` — a sugar event expanding to `convert raiseIsland` (declared), an `assign` of the kind to its district and `setAttr(name)` |
| T6 `place` | an institution onto an island | `assign` with `criteria.sky` (and optionally the island) |
| T8 `fill` | the prosperity, density and greenery brushes on an island, with the `key` parameter | `setField` with `key` — stroke overrides on the island's lattice (§7.2) |
| T9 `shape` | the island's altitude, area, position, occlusion, underside and field (a target mean); an access's kind, role, state, knowledge and foot; the rim's handles; the island conversions by hand | `setAttr`; `moveVertex` on rim vertices; `convert` (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`) |
| T10 `hold` | the island or its paths; New random on the island; **Update shade now**; an island's or an access's delete (V09's delete row; the clerk) | `lock`, `pin`, `revert`, `regenerate` with the island's scope; `regenerate` with the scope `shade` and the island; `delete` — on an island folded as `convert removeIsland`, on a generated access appending its ordinal to `removedAccesses` |
| T11 `name` | the island's name and label | `setAttr(name)`, `moveLabel`, `hideLabel` |
| T12 `dress` | the sky layer's visibility and occlusion | `setLayer('sky', …)` |
| no tool — its producer | the epoch's clearance re-check | `reclearIsland`, returned by the participant `sky.clearance` only |

Every declared thing is held (§7.2's declared means held): a declared island's outline and position, a declared altitude
or area, a placed access.

**No tool for the shade or the route.** The strips, the sky receivers' shade and the route distance are derived and
carry no edit kind. Item 102's `w_sun` and this volume's `shade`, `routing` and `casterAllowanceM` cells are table values
(`editTable`, §7.6, re-deriving from their first reader stage — SKY for `casterAllowanceM`, S10a for `shade`, S10b for
`routing`); T8 `fill`'s prosperity brush (`setField`) overrides the field beneath an island as it does anywhere (item 102
(f)); and **Update shade now** (V05 §4.2) brings the ground under one island's old and new strips up to date at once.

### 4.2 The events and their semantics (§7.1, item 356)

```ts
| { t: 'placeSkyAccess'; island: Id; top: PointCm /* local; snapped to the rim at the dry run */; foot: PointCm /* world */; kind?: SkyAccess['kind']; role?: SkyAccess['role'] }
// `quarter` gains   sky?: { altitudeCm?: Cm; institution?: string /* an IslandInstitution kind */ }   — its points are world points: the island's projected outline or seed
// the point-form events gain   key?: PlatKey   (default the ground): drawWay, drawWater, drawGreen, drawBoundary, drawFootprint, drawWall, placeLight, setField (terrain, prosperity, density, greenery)
//   — their points are in that arena's frame; the tool converts a world point by the island's anchor at the dry run, so a later move never invalidates the event
// `regenerate` gains the scope   { kind: 'shade'; island: Id }   — Update shade now (below; §7.1's EditScope)
// ConversionOp's island kinds (§4.11):
| { op: 'resizeIsland'; island: Id; areaHa: number; altitudeCm: Cm }
| { op: 'waneIsland' | 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }
| { op: 'raiseIsland'; allocation?: Id; declared?: { ring: PolygonCm /* local */; anchor: PointCm; kind: string; altitudeCm?: Cm } }
| { op: 'removeIsland'; island: Id }   // an author's removal: the record kept at its address in state 'removed', holding its slot (V05 §3.2 (6))
| { op: 'reclearIsland'; island: Id; groundRefCm: Cm; altitudeCm: Cm; elevationRaisedCm: Cm }   // the epoch's clearance re-check (V05 §3.15 (7)); returned by `sky.clearance` only
```

* **Pointing at an island.** Every sky hit test and every tool point on the sky layer converts the pointer's world point
  to the island's frame by the anchor — and, under `offset` occlusion, first un-displaces it (the world point less the
  island's `elevation × offsetPerMetre` offset vector, §8.4) — so a click on a lifted island's drawn house selects that
  house and a stroke drawn over the lifted island lands where it is drawn. The hit stack that applies it is V09 §4.20.8's.
* **Moving an island** (`setAttr(anchor)`, T9's drag). The arena is untouched. The dry run re-reads `groundRefCm` and the
  altitude floor at the new position, re-checks V05 §3.7's gap and frame, and re-lands every access: a vertical access's
  foot follows its top's new world point; a slanted one keeps its foot while it stays within the row's run, else is
  re-sited by V05 §3.10 (4). A foot that leaves its landing plot closes that plot's `sky_landing` use (item 17's
  `closeUse`, the house left vacant) and opens one on the plot under the new foot by a positive placement (§7.7's
  `placeAt`, the designation mutator on that plot). The fates list both plots. `placement.byAssignment` becomes true. A
  move outside the frame inset or into another island's gap is bent to the nearest admissible anchor (`bend.island.move`).
* **Resizing** (`setAttr(areaHa)` or `resizeIsland`). The rim is eroded or dilated by the kernel's buffer (§3.7) on the
  island's arena to the new area within 1 % (bisection on the distance, ≤ 12 steps), keeping its shape — never re-drawn
  from the stream (J-V5.7); a growth past 1.5 × `areaHaMax` first grows the frame (V05 §3.8 (1)). The tiers re-scale
  (`depthCm` by the square-root ratio of the areas).
  **The rim's L1 pieces follow the rim in the same commit** (J-V5.77). One island L1 batch re-lays the rim strip
  `rimStripM` inside the new rim and re-claims each landing yard at its top, the top re-seated where its direction ray
  `d_k` now leaves the land face (V05 §3.10 (2), (5)) and its foot re-landed as a move re-lands it (above). Each
  re-claimed yard is served in the same commit: its `sky_landing_top` plot re-cut on the new yard (the old one tombstoned)
  and its use opened there by a positive placement (§7.7's `placeAt`), the plots the yard covers re-derived by §7.3's
  local operator on the island's arena, and SKY-F's checks and repairs (V05 §3.12) run on the island, so a way meets
  every attach. The institution claim is kept where it still fits the land face less the re-laid strip and yards; else it
  is re-searched by V05 §3.10 (5)'s score and crypt re-test over the sites inside the district that holds it — so every
  district keeps its kind (V05 §3.12) — and that district is re-derived by its scoped re-derivation from S8 with the new
  claim a hole and the old claim's land its own (V01 §3.10.3 (6) (c)'s claim re-search, which releases the institution
  from V01 §3.9's fixed inputs), whose S10b places the institution on the new claim: its use relocated there (a
  dossier-backed one by the solver's `dossier` request, V05 §4.4), its old building demolished, a listed fate. That
  district is re-derived whether or not it receives a band face, and once where it does. **A resize never leaves the
  claim without a site:** the area is floored at the least area (the same bisection) at which some site in that district
  still fits; a hand request below the floor is bent to it (`bend.island.floor`; J-VI.4), and an epoch's `resizeIsland`
  (V05 §3.15 (2)–(3)) stops at it, listed in the epoch's report. A request below `minAreaHa` is bent to `minAreaHa` by
  the same line; a request at or above 1.5 × `areaHaMax` grows the frame first.
  **Shrinking:** every plot that loses at least half its face to the eroded rim, the re-laid strip or a re-claimed yard
  is cleared (its households relocated on the island first, then to the ground), the rest re-cut with their neighbours
  fixed (§4.7 S10 (7)); every way that crosses the re-laid strip line is cut back to it (the strip is never cut, V05
  §3.12); no district is re-derived but the claim's where the claim is re-searched (above); and the rim walk is re-laid on
  the re-laid strip by volume 1's `plantRimWalk` (V01 §3.10.3 step 4) in the same commit.
  **Growing:** the land between the old and the new strip lines — with whatever an old yard held that its re-claim does
  not, less the re-claimed yards — is cut into faces by extending, in the same L1 batch, each district boundary way that
  meets the old strip line across the band to the new one along the band's normal there (the same class); each face joins
  the district of its nearest rim stretch (ties by district address), and every district that receives a face is
  re-derived by its own scoped re-derivation from S8 (V01 §3.10.3 (6) (c)) — never a unit run, which would re-cut every
  district, and never a change of the island's district count; volume 1's `plantRimWalk` then re-plants the rim walk
  whole, once for the resize, since the walk is one island-level pair that no district's re-derivation writes.
* **Altitude** (`setAttr(altitudeCm)`): the record alone; a value below V05 §3.9 (4)'s floor is bent to the floor
  (`bend.island.altitude`; J-VI.4).
* **Underside and occlusion** (`setAttr(underside.*)`, `setAttr(occlusion)`): the record alone (`underside.source`
  becomes `edit`); an underside change that would break the floor raises the altitude, listed as a fate.
* **Field** (`setAttr(field.prosperity)` — a declared target mean, `declared.field`: the gradient shifted uniformly to
  meet it, V05 §3.11 (5); `setAttr(field.density)`, `setAttr(field.greenery)`; and the island brushes, `setField` with
  `key` and a prosperity, density or greenery stroke, as §7.2's stroke overrides on the island's lattice over the
  gradient): the island's plots whose value crosses a cut past τ re-derive (§7.2's rule for a field brush), on the island
  only.
* **Reshaping the rim** (`moveVertex` on a rim vertex, `warp` on the island's key with `fromLevel 0`): §7.3's local
  operator on the island's arena moves the rim, and the rim's L1 pieces follow it as a resize's do (above; J-V5.77) — the
  strip re-laid inside the new rim, each landing yard on a moved stretch re-claimed at its top (a pinned `sky_access`
  vertex never moves), the institution claim kept or re-searched inside its district; a reshape that would leave the claim
  no site there is bent back along each moved vertex's drag to the furthest position that keeps one (bisection, ≤ 12
  steps; `bend.island.rimStop`; J-VI.4). Each stretch that moved outward is a growing resize's band — its faces, cut at the
  extended district boundary ways, joining the district of their nearest rim stretch (ties by district address), every
  district that receives a face re-derived by its own scoped re-derivation from S8 — and each that moved inward a
  shrinking resize's, which gives no face and re-derives no district (the claim's aside, re-derived where its claim is
  re-searched, above; V01 §3.10.3 (6) (c)); volume 1's `plantRimWalk` then re-plants the rim walk whole, once for the
  reshape; `areaHa` is rewritten to the new land area. A reshape that would make the rim cross itself is refused by the
  kernel (§3.1's `E_SELF_INTERSECT`) and the drag bent back to its last simple position.
* **New random on the island** (`regenerate` with the island's scope, `newRandom`): the outline's displacement, the
  terrain (with an `own` relief's class), the underside (unless edited) and the river re-derived under the next reroll,
  SKY's island steps re-run (the rim strip, the landing yards and the institution claim re-laid, V05 §3.10 (5)), the
  island's districts re-laid by volume 1's unit run (V01 §3.10.3 (6) (a)–(b); each district's template kept where its
  lineage is, V01 §3.3.4), then SKY-F (V05 §3.12), which rewrites `SkyIsland.districts`; the anchor, the area, the
  altitude, the allocation and every access's foot kept; each vertical access's top re-seated at the new rim's point
  nearest above its foot, and where the new rim no longer overhangs it the access becomes a `ropeway` from the rim point
  nearest the foot. The altitude floor (V05 §3.9 (4)) is re-checked after the underside is re-drawn: a deeper root that
  breaks it raises `elevationCm` to the floor (a listed fate), as an underside edit does. The ground is byte-identical
  (the seam exception is empty); `shadeBasis` is untouched (the shade follows at the next evaluation).
* **Declaring an island** (T5 with `sky`). At its dry run: the gate (V05 §3.2 (1)) and `h_town > 0` must hold — a
  declaration where the town cannot supply magic is allowed only with the fate `held against its supply` confirmed
  (J-V5.10); a declaration on a dossier-bound document whose `site.magic` resolves `none` is the one refusal (F-EDIT
  `dossier-owned`, V05 §4.4; J-V5.19). The points form gives the projected outline (a lasso), a disc of the kind's area at
  one point, or the routine fitted to two to four corners; the slot is the lowest free (the lowest held slot when none is
  free, released by this event, V05 §3.2 (6)); a fourth island is bent to join the nearest one as a district on it
  (`bend.island.count`); the fill is V05 §3.5's, taken by **relocating** the richest households from the ground (never
  re-deriving it) — each household moved up is a relocation, its ground building left vacant — all listed as fates; V05
  §3.8–§3.14 then run on the new island, which has no `shadeBasis` until the next shade evaluation (V05 §2.1): it casts
  and receives no strip meanwhile, and Update shade now on it writes one at once. In the creation prefix the declaration
  is read ahead by S7b (5) as a forced slot (V05 §3.2 (3)), so no relocation is needed.
* **Placing an institution on an island** (T6: `assign` with `criteria.sky`): the solver places it on the island named,
  else on the island whose reason is `institution` and whose row matches, else the dry run offers T5's declaration. A
  custom kind is named by its `localUid` (item 104 (a) (1): the map-side declaration, stored in the map document, never in
  the dossier); where it is a resource or processing node of an active chain, the dry run lists the fate "this chain now
  crosses the hoist" and the route lengths of its links before and after (V05 §3.20 (9) (e)).
* **Accesses.** `placeSkyAccess`'s dry run checks the kind against the `magic` circumstance and the row's limits (a kind
  that does not fit is bent to the nearest admitted kind in V05 §3.10's order, `bend.access.kind`; J-VI.4 (b)), inserts
  the top vertex on the rim, claims the island's landing yard (the plots it covers re-derived by §7.3's local operator on
  the island's arena, V01 §3.10.3 (6) (c)) and opens the ground landing by a positive placement on the plot under the
  foot. A top whose yard cannot be claimed where it is drawn (the rim stretch held by other yards or the institution
  claim) slides along the rim to the nearest position whose yard fits; a rim with no such position bends the stroke into
  the re-landing of the nearest existing access at the drawn foot (`bend.access.rimFull`), so an island holds at most as
  many accesses as its rim holds yards. `delete` of an access reverses all three; deleting an island's last access is bent
  into a move to the next admissible site (`bend.access.last`; J-VI.4 (c)), with "Place a different access" as the
  alternative. **A deleted generated access stays deleted:** the delete's fold appends its ordinal to
  `SkyIsland.removedAccesses`, which every later re-siting skips and counts (V05 §3.10 (1)); where it was the `main`
  access, the lowest surviving generated ordinal takes `main` in the same event (a listed fate), so an island always has a
  main access while it has any; the delete's undo removes the ordinal. A placed access's delete leaves no ordinal (it was
  declared, and nothing re-sites it). The foot of a placed or moved access meets the standing raised parts by V05 §3.22
  (3) (a)–(b) at its dry run, a foot they block moving to the nearest admissible foot (`bend.access.deck`; J-VI.4 (b)).
  **`setAttr(kind)`** on an access re-runs the same check — the `magic` circumstance, the row's altitude and
  horizontal-run limits, a `guarded` access a `hoist` only — a kind that does not fit bent as above; an admitted change
  re-seats nothing but the landing buildings (the top's and the foot's use rows take the new kind's building).
  **`setAttr(ground.at)`** re-lands the access as a move does: the old landing plot's `sky_landing` use closed, a new one
  opened by a positive placement on the plot under the new foot, both plots listed as fates, the horizontal run
  re-checked. An island wall's circuit follows every access change (V05 §3.21 (3)).
* **The shade beneath follows** (item 102 (e); J-V5.27). Every event that changes what an island's strip would read — a
  move, an altitude, a resize, a rim reshape, an underside, New random on the island, a declaration, a delete, a `convert`
  — leaves `shadeBasis`, the ground's field and every strip where they were: its dry run lists the fate "The ground
  beneath will catch up the next time the town changes over time. Update it now?", and the shade map view draws the new
  strip as pending (V05 §5.1). A Re-derive from S10a or an earlier stage recomputes the bases and the strips with
  everything else.
* **Update shade now** (`regenerate` with the scope `{ kind: 'shade', island }`; T10, and the fate's own button). One
  shade evaluation for that island alone (V05 §3.19 (6)): its `shadeBasis` is written from the island as it stands, with
  `by: 'update'`, the document's current epoch and the full surface top (as an epoch's); its strips onto the ground and
  onto the islands beneath it are recomputed — and, where it had no basis (V05 §2.1), the strips onto it from the islands
  above it — and the ground's field is recomputed over the union of the old and new strip windows — the cells of the other
  islands' strips re-read from their unchanged bases — with the blocks there whose value crosses a cut past τ re-derived
  by §7.2's rule, their fates listed. It is the one event besides the evaluations of V05 §3.19 (6)'s other moments that
  writes a basis, and only its island's. On a fallen or removed island it is offered nothing (no basis is written for an
  island that casts nothing). The prosperity brush stays for hand changes.
* **Deleting an island** (T10 `hold`'s delete — V09's delete row — or the clerk; J-V5.62). The dry run turns the delete
  into **`convert removeIsland`**: the island is removed without a landfall — its households relocated to the ground by
  §4.7's overflow pass (in an epoch's history, as any hand conversion, inside the event), its landing uses closed, its
  arena archived as `fallIsland` archives it, a split shop's use relocated to the ground (V05 §3.20 (11)) — and its record
  stays live at its address in state `removed`, `removed` written (`seq`, `generated` from its lifecycle cause) and its
  `slot` held closed (V05 §3.2 (6)). It draws, labels and exports nothing but its `.plat` record (V05 §5.1, §5.5). Where
  the ground cannot house its households, the dry run offers instead `adjust('islands.count')`, a Re-derive from S7b. The
  fate list says it in V09's `info.remove.holds` words ("The town won't raise this island again; undo brings it back").
  `convert fallIsland` is the ruinous alternative. A removed island is undone only by the removal's undo; a T5 `sky`
  declaration re-fills its slot with a new island only when no slot is free (V05 §3.2 (6)), never resurrecting it, and no
  `adjust('islands.count')` re-opens it. A floating, waning or settled island may be removed; a `fallen` one may not — its
  slot is already free and its landfall is ground content, which the ground's own edits clear — and a delete on a fallen
  island's record is bent to deleting nothing, the line naming its landfall (`bend.island.fallen`).
* **Bringing an island down** (`convert fallIsland`, T9's context action; the clerk's "bring it down"). The dry run lists
  V05 §3.16's fates, one per covered entity; a covered way's reads "rubble; a track until the town clears it (was
  <class>)", `<class>` the class the fall writes to `Way.formerClass`, or the one the way already holds there (V05 §3.16
  (4)). The event's undo restores each way's class, surface and prior `formerClass` (V05 §3.16 (8)).
* **A raised or aqueduct stroke to an island** (J-V5.61). A T4 stroke that ends on an island's rim with `raised` or the
  aqueduct class never makes a way (II.1: no roads in or out). Its dry run answers with a bend (J-VI.4 (d); item 101 R2
  refuses only a dossier fact or a lock) — `bend.raised.island` — and makes, in the stroke's place, `placeSkyAccess` with
  the stroke's ends as top and foot and the kind V05 §3.10's rules admit there: a `ropeway` for a slanted stroke, a
  `hoist` where the foot lies under the rim, a `lightBridge` where `magic` admits it. An aqueduct stroke ending on a rim
  ends at its last ground vertex outside the island's footprint (`bend.aqueduct.island`). A `raised` or aqueduct stroke
  wholly on an island's key is bent — `raised` dropped, the way drawn on the island's ground; the aqueduct made a fountain
  pin at its end (J-VI.4 (e); `bend.raised.onIsland`, `bend.aqueduct.onIsland`). A `raised` stroke on the ground whose
  course would cut an access's column or pass within `lineClearM` under its rope line is re-routed by the dry run through
  `skyAccessObstacles`, or, where no re-route exists, ended at its last ground vertex before the column
  (`bend.raised.hoist`; J-VI.4 (f); V05 §3.22 (3)).
* **A retaining wall or terrace on an island:** V05 §3.22 (4) — laid on the island's arena; on or along the rim bent
  inward past the rim walk (`bend.retaining.rim`; J-VI.4 (g)).
* **A wall on an island** (T3 with `key`): V05 §3.21 (3) (`bend.wall.rim`).

**The bend lines** (item 101 R2; J-VI.4): every refusal of this volume but the dossier-owned one (a bound dossier whose
`site.magic` resolves `none`, J-V5.19) and a lock is a bend. Each line is this volume's words; its message row is V09
§4.9's `bend.*` row and its clerk explanation V10's `bend` category (J-VI.4), the keys these:

| key | line | event |
|---|---|---|
| `bend.island.count` | "At most three islands float here; this quarter joins {island}." | a fourth declared island (V05 §3.2 (3)); an integer `islands.count` below the forced count, raised to it (V05 §3.2 (4)) — "{n} islands are drawn by hand; the count is raised to {n}." |
| `bend.island.rung` | "Islands float only over cities; this quarter is laid on the ground." | a T5 `sky` declaration at TOWN or a village rung (the rung gate is absolute, J-V5.10) |
| `bend.island.move` | "{island} floats clear of {other}; moved {m} m." | a move into another island's gap or outside the frame inset |
| `bend.island.altitude` | "{island} floats at least {m} m up, clear of what stands beneath." | an altitude below the floor (V05 §3.9 (4)) |
| `bend.island.floor` | "{island} keeps room for its {institution}; shrunk to {area} ha." | a resize below the claim's floor or below `minAreaHa` |
| `bend.island.rimStop` | "{island} keeps room for its {institution}; the rim stops here." | a reshape that would leave the claim no site |
| `bend.island.fallen` | "{island} has fallen; its rubble is the ground's to clear." | a delete on a fallen island's record |
| `bend.access.kind` | "A {kind} cannot serve here; {kinds} can." | `placeSkyAccess` or `setAttr(kind)` with a kind that does not fit |
| `bend.access.deck` | "The foot moves clear of {deck}." | a foot on a deck face, a raised-way pier or within `deckGapM` of a raised deck |
| `bend.access.rimFull` | "{island}'s rim holds no more landings; {access} now lands here." | `placeSkyAccess` on a rim with no free yard |
| `bend.access.last` | "An island keeps one way up; moved to {site}." | deleting an island's last access |
| `bend.raised.island` (V09's row) | "A road cannot reach a floating island; a hoist, rope line, stair or bridge of light can." | a T4 `raised` stroke to a rim |
| `bend.aqueduct.island` (V09's row) | "An island's water is its own; the aqueduct ends here." | an aqueduct stroke to a rim |
| `bend.raised.onIsland` (V09's row) | "An island carries no raised way; its bridges cross its river on their own decks." | a `raised` stroke on an island's key |
| `bend.aqueduct.onIsland` (V09's row) | "An island's water is its own; a fountain stands where the aqueduct would end." | an aqueduct stroke on an island's key |
| `bend.raised.hoist` | "This would cut {island}'s hoist; it ends here." | a raised course that cannot re-route around an access |
| `bend.retaining.rim` (V09's row) | "The rim walk stays level; the wall stands inside it." | a retaining or terrace stroke on or along the rim |
| `bend.wall.rim` | "The drop is the wall here." | an island wall stroke along the rim away from a landing |

### 4.3 Locality and undo

| edit | effective scope | outside it, byte-identical |
|---|---|---|
| altitude, occlusion, underside, field and the island brushes, name, terrain and water on the island, a wall on the island, New random on the island | the island's arena and record | the ground and every other island (seam exception empty) |
| a resize, a rim reshape | the island's arena and record, plus the ground landing plots its re-landed feet name (their designations only) and the ground buildings that take the households a shrink relocates | everything else; every other island |
| an access placed, moved or deleted; an island moved; an island deleted | the island's arena and record, plus the ground landing plots its fates name (their designations only) | everything else |
| an island declared after generation | the new island's arena, plus the ground buildings its relocations vacate and the landing plots | everything else |
| a ground edit whose effective scope meets an island's projected footprint — a raised way, a retaining wall or a building added, raised or removed beneath it included (its dry run reading `skyAccessObstacles`, V05 §3.22 (3)) | the ground edit's own scope, plus that island's `groundRefCm` and, where V05 §3.9 (4)'s floor requires it, its `altitudeCm` (a listed fate); a removal beneath never lowers the island — its `elevationCm` kept, `altitudeCm` re-read | the island's arena |
| `fallIsland` | V05 §3.16's covered set (raised spans and raised-way piers, retaining walls and deck plots included), the re-landed accesses of other islands, and the island's arena | everything else |
| `removeIsland` | the island's arena and record, plus the ground buildings that take its households and its landing plots (their designations only) | everything else; the other islands' slots and draws |
| `reclearIsland` (an epoch's) | the island's record (`groundRefCm`, `altitudeCm`, `elevationCm` where raised) | everything else, the island's arena and `shadeBasis` included |
| Update shade now | the island's `shadeBasis`; the ground's field over the union of the island's old and new strip windows and the blocks there that cross a cut past τ; the strips onto the islands beneath it and, where it had no basis, the strips onto it | everything else, every other island's basis included |

No island edit writes the ground's field or any `shadeBasis`: the strips keep their basis (V05 §3.19 (6)), so every row
above holds for the field's rasters as for the ground's geometry, before and after a save and a load (§2.9, item 274);
Update shade now is not an island edit but a scoped shade evaluation. Every event undoes by its inverse through §7.4's
fold; the lifecycle rows of `placeSkyAccess`, `regenerate` with the scope `shade`, `convert removeIsland` and
`reclearIsland` are §7.4's (item 375). `Document.nextSkyPart` never decreases, so an undone island's part stays spent.

### 4.4 The dossier — derivation row DR27 and coherence (§7.7, item 387)

| row | subject | dossier inputs | rule | chance | totality bar |
|---|---|---|---|---|---|
| DR27 | floating islands: the gate, count, reason, size, altitude and access kinds; what the sky fill carries of a chain; the shares it may not take | the population (the rung, DR23); `wealth.label` (DR6: the field, so `S_town`); the households' bands (DR7: `S_carried`); the institutions (DR9, DR24: a palace, cathedral, great temple, prison or mage's instance; a custom institution by its resolved scene archetype and `landmarkLevel`, item 104 (a)); the institution ladder records by their step type (item 108 (a): only a singular or SIZE record may go up; COUNT, GUILD and QUARTER members counted across both arenas); the district-defining records (item 72: their raised shares never taken by the fill); `government` (DR11: a palace's eligibility); `site.magic` (the `magic` circumstance: the gate and the access kinds); `site.deposits` (a `magical_node`: the node term of `h_town`, V05 §3.3); the active reviewed custom chains (item 104 (b)) and `activeChains[]` (item 105 (i)): the nodes the fill keeps on the ground, V05 §3.5 (3), and the links' status | V05 §3.2–§3.10, §3.15 (1b), §3.20 (9)–(12) | `island.place` | every bound CITY or METROPOLIS map with the setting on has its gate resolved, its node term traced to a deposit or to none, each island's reason traced to a DR7 or DR9 fact, and no ladder pair counted twice across the arenas |

The row is DR27 (ID-DR; J-V5.40); the setting itself is the map's declared choice, never a dossier path. **Coherence:**
where the dossier's `site.magic` resolves to `none`, turning the setting on is refused (F-EDIT `dossier-owned`: "the
dossier's world has no magic"; §7.7's coherence row, item 387), and a dossier change to `none` at an absorb makes every
island's target 0 at the next epoch — they wane, never vanish (item 22). A dossier institution on an island stays a
dossier fact: a fall, a delete or a resize that removes its building first relocates it (§4.11's *Dossier content
across epochs*). **The reverse** — the dossier removes the institution an island carries (a palace, a cathedral, a custom
tower) — removes the institution at once (item 20 (h): its building vacated, its uses closed), leaves the island
standing, and re-reasons the island at the next epoch by V05 §3.15 (1b): the next instance of its row's tags or
archetype, else a prosperity island, else a wane (J-V5.53); a lock on the island holds it without its institution until
the unlock (V05 §3.15 (1b)). Until an epoch runs (a document without history), the absorb's report lists the island as
"awaiting a new purpose", and the clerk offers T6 (another institution onto it) or T5's kind change as ghosts. A
`magical_node` deposit that turns `depleted` or `removed` at an absorb drops the node term at the next epoch's evaluation
— the islands' supply falls by the law and they wane, never vanish; one that turns `discovered` adds it at the next epoch
(V05 §3.3). Every DR27 input reaches its dependants through the change envelope and the next epoch's fold (§7.7,
items 22, 75, 76): the population and `wealth.label` through the epoch's rung and field (V05 §3.15 (1)), the
institutions through (1b), `government` through the next reason draw at a re-derivation from S7b, `site.magic` through
the gate (V05 §3.2 (1)) and the access rows' `magic` column at the next re-siting, the chains through V05 §3.20 (9) (e).

### 4.5 The clerk's view

**Registration.** `@plat/sky` registers one `WhyProvider` (V10 §2.13) with `kinds` `SkyIsland`, `SkyAccess` and the
`fallen_island` decoration, answering from the committed model and the report, filtered by the caller's key (§9.2's
`admit`). The prosperity field's `drivers()` (V10's `FieldDrivers`) gives the daylight term one entry as the base
defines it and, beside it, one attribution per island whose strip covers the point (a strip with `cells` 0 none):
`{ driver: 'daylight', delta, sources: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] }`, each
source's `samples` the sample bits it blocks at the point and the entry's `delta` the OR-ed total × `w_sun` ÷ `bits` (a
sample blocked by a hill and an island is listed under both and counted once, J-V5.38) — the `sources` list is this
volume's field of V10's `FieldDrivers.terms`. Pulls across arenas reach `PlacementSolver.explain` (V10's
`Explanation.terms`) with the access `skyRoute` returned, so every cross-arena term names its landing.

The reader (§11.2's `query`) lists each island in the gazetteer with its name, reason, state, area, altitude, supply and
accesses. **The `island` section's rows** (V10's `WhySectionProvider` rows for these kinds; CVR-V10-14):

| on | `why` answers |
|---|---|
| an island | its gate, its slot's draw against `chance · h_town`, its reason's candidates and weights (a custom institution's matched archetype named), its fill's bands and their shares of its land, its stop cause, the trades it left on the ground by `carry` (each with its reason: heavy works, noxious, a need an island cannot meet, a chain's working step) and the split shops it carried, the coverage instances it took per island district, the S3 reservation it handed over and to whom ("the old cathedral close — now the mother church"), its cathedral's crypt ("cut into the island's rock; the largest crypt in the town"; half-sunk where the rock is too thin), its placement's class shares, its reachability and score, its underside's kind, and its strip — how many hectares of ground it shades for at least one, three and five of the nine samples, and whether the field still reads it where it hung (the basis, V05 §3.19 (8)), with "the ground last took this shade at {year}, by {an epoch \| a re-derivation \| Update shade now}" from the strip's `evaluated` |
| a ground plot or quarter under an island | each island whose strip covers it and for how many samples, the term's share of the plot's value, and whether the ground has caught up |
| a use on an island, or a ground use pulled by one | the rows and the links that pulled it — the good, the bound provider or consumers, the orientation (item 105 (j)) — and the landing each cross-arena pull or link went through with its route length (V05 §3.20 (8), (10)); on a split shop, its works below and the route between them (V05 §3.20 (11)); on a node of a chain that crosses an island, the chain, the node's step in its flow, the landing its link crosses and why its working steps stayed on the ground (V05 §3.20 (9)) |
| an island's rim with no wall | "the drop is the wall here" (V05 §3.21) |
| a landfall | the island that fell, when, and what it broke (the walls breached, the ways buried, the arches and raised-way piers ruined, the terrace walls broken, the shops that fell with their bridge, the fountain an aqueduct no longer feeds, the accesses re-landed) with the clearance still owed |
| a removed island or access | "removed by you" with the event — "the town raised it" or "you drew it", from `removed.generated` — and what alone would re-open its slot (undo, or a new island drawn when no other slot is free — never a new island count) |
| an island the clearance raised | "raised clear of the aqueduct" (or of the viaduct, the terrace wall, the stepped temple) naming the caster and the epoch |
| an island held without its institution | "held without its {institution} by your lock" (V05 §3.15 (1b)) |
| a road that could not reach an island; a bent terrace or wall stroke; a resize or reshape held by the claim | the bend and its line (V05 §4.2's table), and the access it made |
| the town supply | the `magical_node` deposit when the node term acts — "the node beneath the old ruins" when the report's `ruin.node` line names the deposit (V04 §3.5.0a (9); V05 §3.3) |

Every answer is filtered by the caller's key (a `secret` service hoist to a prison is withheld). A clerk's proposals are
these events as ghosts: "a floating palace over the river" is T5 with `sky` and the palace kind; "raise it higher" T9's
`setAttr(altitudeCm)`; "let the ground catch up" Update shade now; "bring it down" `convert fallIsland` with V05 §3.16's
fates. It never writes a dossier fact and meets DR27's refusal as any author does.

## 5 Rendering, labels, exports

### 5.1 Marks (S14; every sky coordinate is `anchor` + the local one)

| semantic | kind | what | bands |
|---|---|---|---|
| `sky.island.land` | `area` | the land face, in the style's `sky.ground` role (one step lighter than the ground's block tone in `ink`; the patch tone of `hatched`) | all |
| the island's fabric | as any district's | ways, blocks, plots, buildings, greens, water — `layer: 'sky'`, `z` above the ground | as the ground's |
| `sky.island.rim` | `outline` | the rim chain with the `cliff` bank program's outward ticks | all |
| `sky.island.shadow` | `shadow` | the vector rung: the projected tier stack (V05 §5.3); `hatched`: the patch's drop shadow, as the Neighbourhood look draws its lone patch (`research/findings/vg-ng-devlogs.md` §B3.5; `research/findings/watabou-extra-a.md` §3) | all |
| `sky.island.underside` | `area` | `offset` occlusion only: the tier stack's silhouette swept along the offset vector — the rock hanging beneath the lifted island | all |
| `sky.island.tether` | `outline` | `offset` only: the true ground footprint dashed, and a hairline from the lifted centroid to the true one | district and finer |
| `sky.fall`, `sky.mist` | `glyph`, `area` | the waterfall's lip on the rim; a soft mist disc on the ground below it | district and finer |
| `sky.island.shadeStrip` | `outline` | the shade map view only (V09's thematic view of item 102 (f)), **outlines only — the veil of shade shares is V09's alone**: each island's held strip onto the ground at its basis as one solid ink line around the cells it blocks for at least three of the nine samples, traced by marching squares over the mask at the field cell, labelled with the island's name along it; a strip with `cells` 0 draws none | city and district |
| `sky.island.shadePending` | `outline` | the shade map view only, while the caster's `shadeBasis` differs from its live island (V05 §3.19 (8)): the strip the island would cast now, its three-sample area as a dashed ink line — so a dashed line always means "where the shade will move"; an island without a basis draws only this line | city and district |
| `sky.access.<kind>` | `glyph` + `ribbon` | hoist: a glyph at the top and at the foot, joined only in `offset`; stair: the same glyphs, and in `offset` the helix of V05 §2.2 as a stepped spiral line; rope line: a hairline from the top's world point to the foot; bridge of light: a glowing ribbon with `light` marks along it at night | district and finer (the foot glyph at the city band) |

**States** (§8.2's `states`, items 408, 415): the base's island rows stand, with the `fallen` row drawing its rubble over
the faces and bands of the `fallen_island` decoration's members (V05 §3.16 (5)); a settled island's buildings draw their
own existence rows; an access reads `closed` (a bar glyph), `unserved` (alpha 0.5) and is not drawn once `ruined`; the
landfall's covered kinds draw by V05 §3.16 (4)'s *drawn by* column; the deck plots tombstoned with their ruined decks
draw nothing. A `removed` island draws nothing, labels nothing and has no shadow. The island's own retaining walls (V05
§3.22 (4)) draw by the base's `retaining` program in the island's frame, on the sky layer's list, displaced with the
island under `offset`, their low-side shadow cast by the light pass on the island's sky surface layer. A degenerate sky
mark — a zero-area face, a zero-length rim stretch, a rope line whose top and foot coincide in plan — draws nothing and
never fails a tile.

**Slots and sheets** (§8.2, item 408). The sky layer composes its own list with §8.2's layer order; every shipped sheet
(`ink`, `lit`, `hatched`, `night` and the parity presets, which carry the rows though their recipes hold islands off)
resolves every sky semantic, so the loader never refuses one:

| semantic | layer-order slot (§8.2) | per-family facts (the values are V11's palette rows) |
|---|---|---|
| `sky.island.land` | 3 `ground.block` | role `sky.ground`: in `ink` one step lighter than `ground`; in `hatched` the patch tone; in `lit` and `night` the `ground` albedo lit by the light pass |
| `sky.island.underside` | 2, with the water (under the land, so the lifted land covers its top) | role `sky.ground` darkened one step, `ink` outline; `offset` only |
| `sky.island.rim` | 8 shore marks | the `cliff` bank program's ticks in `ink` |
| `sky.island.shadow` | 10 projected shadows | role `shadow` (the vector rung); `hatched` the patch's drop shadow |
| `sky.island.tether` | 17 boundary treatments | `ink` hairline, dashed; `offset` only |
| `sky.fall`, `sky.access.*` | 19 towers and gate blocks | glyphs in `ink`; a bridge of light's ribbon in role `light` |
| `sky.mist` | 8 shore marks (after water) | role `water` lightened, alpha 0.5 |
| `sky.island.shadeStrip`, `sky.island.shadePending` | 25 live layers | `ink` lines, solid and dashed, label in role `label` |

The role **`sky.ground`** is §8.2's (the land of a sky island: never `ground` itself, so an island reads against the
ground beneath it in every family). The island's own fabric resolves by the ground's semantics.

### 5.2 Occlusion

`ghost` by default (§8.4), `opaque` and `offset` as the sky `LayerSpec` sets them or an island's own `occlusion`
overrides. In `offset` the island's marks, labels and shadow-free silhouette draw displaced by `elevation ×
offsetPerMetre`, while its cast shadow stays where the sun truly puts it; the sky base is **lit at the island's true
position** and drawn displaced (V05 §5.3 (2)), and every pointer and tool point on it is un-displaced before the anchor
conversion (V05 §4.2). With the sky layer hidden (§8.4's `LayerSpec.visible`), nothing of this section draws and no
island label is a candidate; the model is unchanged (II.6 (1)).

### 5.3 Light and shadow — the underside's shadow (the owner's J98; §8.4, items 415, 416)

1. **The slab list** holds, per island and **under every occlusion mode** — `opaque` as well as `ghost` and `offset`
   (§8.4 (a); an island is never written into the ground's surface layer as a column, whose shadow would start at the
   footprint's edge and lose the gap and the profile) — underside tier 0 and underside tiers 1 … n of V05 §3.9 (2), each
   its world ring, its top and its underside, so the island's shadow is the shadow of its whole rock: a `root` casts a
   long tapering tail under a low sun, a `flat` only its rim; the ground right beneath is shaded from above yet lit from
   the side through the gap under the root; and the penumbra widens with the distance from the underside, so a higher
   island's shadow is softer (§8.4 (c)'s law). A fallen or removed island has no slab.
2. **The sky surface layer.** Where an island's drawn land face touches a tile, the tile worker rasters that tile's sky
   marks into a second base and a second surface layer (the island's terrain at its datum, its roofs, towers and crowns),
   each with its max-height pyramid. The light pass lights the sky base over the sky surface layer — its rays reading the
   ground's pyramids, the other islands' slabs and its own island's surface — and the ground base over the ground surface
   layer with the whole slab list; then composes: `opaque`, the lit sky over its coverage; `ghost`, the lit sky × (1 −
   `ghostAlpha`) over the lit ground × `ghostAlpha`; `offset`, the lit ground everywhere and the lit sky over its
   displaced coverage. The CPU reference and the GPU pass run the same law. A tile no island's land touches takes no
   second base, but it is **re-lit where an island's shadow falls on it** — the shadow reaches up to 8 × the island's
   height from its footprint. **The global light's window** (§8.4 (c), item 416) reads the surface layers' own top
   (`surfaceLayerTopCm`), without the slabs, and each slab whose shadow sweep crosses the ray's plan is tested exactly over
   its own reach (J-V5.56), so an island lengthens no ground ray's window; a tile culls the slabs whose sweep's bounding
   box misses it.
3. **The vector rung** (rung 3): the island's shadow is the union over its underside tiers of each tier projected in the
   **`prism` form** — its ring swept along the sun vector from its underside's offset `b · c` to its top's `t · c`, then
   unioned — whatever `vector.projected` says for other casters, since an island is a floating solid (J-V5.55); the rim
   slab sweeps from its base to the surface top. So a `root`'s thin lower tiers join into one tapering tail instead of a
   row of beads. Only when §8.4's rung-3 budget fallback fires is the `drop` form used, and then the tiers are subdivided
   so that no tier's sweep `(t − b) · c` exceeds its ring's inradius, which keeps successive drops overlapping.
4. **The cursor sun under an island** (§8.4 (d), item 415). Whenever the sky layer is visible and the document holds an
   island that is not fallen, the cursor sun's height is `max(h₀ · D · s, 1.5 × the list's surfaceTopCm above the view's
   ground)` — whatever is in view — so no sun ever stands below a floating island and panning never changes it: it moves
   with the zoom alone (J-V5.14); the path and fixed suns are unchanged.
5. **The picture and the model agree.** The light pass's shadow (from the rough tiers, at any sun) and the model's strip
   (from the smooth tiers, at the sampler's fixed suns, V05 §3.19) read one solid: under the path sun set to the equinox
   at a sample's hour, the style's `sun.latitudeDeg` set to the site latitude, the vector rung's shadow of the smooth tiers
   on flat ground covers exactly the cells the strip marks for that sample, within one field cell at the boundary
   (T-V5-20) — so the shade map and the drawn shadow never disagree about where an island's shade falls.

### 5.4 Labels

The island's `quarter` label draws at the city band along its long axis (§9.3's area rule on its land face), its
districts' labels from the district band, an institution's `landmark` label, a landfall's `place` label; accesses carry
no label, and neither does a strip (the shade map view's legend names the islands). Candidates of sky entities are held
in the island's local frame and translated by S14 (§9.1, item 415). §9.2's candidate set: sky rows only while the sky
layer is visible; under `opaque`, a ground row whose anchor lies inside a visible island's drawn land face is no
candidate; under `ghost` both are candidates, the sky rows at 1.5 × their priority; under `offset`, sky candidates at
their displaced positions at the stop. An island too small at a stop for its label's spine (its long axis shorter than
the text) carries its name at the land centroid as a point label, or none where that too collides (§9.2's greedy).

### 5.5 Exports (§11.1's rows, item 415)

| format | the sky |
|---|---|
| `.plat`, JSON schema | island records with local geometry and `anchor` (a `removed` record with its `removed` field and no arena geometry, the arena in the archive); `SkyAccess` records; `removedAccesses`; every field's tier |
| compact twin | world coordinates (anchor added), `layer` and `elevationCm` per sky entity |
| GeoJSON | FeatureCollection `sky`: one feature per island — its projected land face, with address, name, reason, state, `areaHa`, `altitudeM`, `elevationM`, supply, `placement.over`, the underside's kind and depth — then its entities in world coordinates with `elevationM`, its accesses as LineStrings (top → foot) with kind, role and run, and its strip as three MultiPolygon features (`kind: 'shadeStrip'`, `samplesAtLeast` 1, 3 or 5 of 9, `basisCurrent`; none for a strip with `cells` 0); the island's own retaining walls as item 447's `retaining` LineStrings, in world coordinates, plus `elevationM` (V05 §3.22 (4)); a removed island is not exported; a landfall in the `ground` collection |
| SVG | `<g id="layer.sky">`, one `<g id="sky<part>">` per island; the shadow group; the underside and tether in `offset` exports; in an export of the shade map view, `<g id="sky<part>.shade">` with the strip's solid outline and any dashed pending outline (V09's veil in its own group) |
| PNG / tiles | the sky layer's own transparent PNG (§11.1's per-layer PNGs); lit by V05 §5.3 at the export's sun |
| VTT | one scene per island in its local frame, its elevation recorded; the rim a wall that blocks movement and not sight; each landing yard a note linked to its ground landing's note in the ground scene |
| glTF | per island a node at (`anchor`, `elevation`): its terrain draped over the land face, the rim wall down by the rim thickness, the underside lofted between the underside tier rings (each resampled to `export.gltfRingPoints` points by arc length from its point nearest the island's bearing; a `flat` island's rim slab closed by its base), its retaining walls as walls on its terrain, its buildings and trees, the river sloped, the fall as a mist quad `export.mistM` tall; hoist ropes and rope lines as thin cylinders, a stair's steps as boxes laid along its helix (V05 §2.2) with a slab at each landing, a light bridge as a translucent ribbon; `extras` with address, reason and state |
| CityJSON | the island as PLAT's extension object `+FloatingIsland` (its top TIN and its underside solid, attributes as GeoJSON's), its buildings as `Building`s based at its elevation, accesses as `+SkyAccess` lines — PLAT's extension schema carries both types |
| CSV / statistics | island count, areas, altitudes, carried households by band with each band's share of the island's land, supplies, states, district counts; per island its strip's area blocked for at least one, three and five samples, the mean prosperity inside its three-sample area and in the same district's cells outside it (item 102 (g)'s quantity), whether its basis is current, the trades left on the ground by `carry` with their reasons, the split shops carried, the coverage instances taken per island district, the S3 reservation handed over and its taker, the crypt's form, the count of cross-arena pulls and links by landing; the node term when it acts; per active chain (custom or `activeChains[]`) that crosses an island, its island nodes, the landing its links cross and their route lengths; per landfall, the covered walls, towers, bridges, reservations and ways, and the covered raised spans, raised-way piers and retaining walls with their new states, the deck plots tombstoned with their decks and the accesses re-landed; per island and epoch, each clearance raise (`reclearIsland`) with the caster that caused it; the removed islands and access ordinals |
| skeleton file | declared islands (T5 with `sky`) and placed accesses (T4) as declarations |

With the islands setting off, or the document holding no island, the `sky` collection, group, scene, node and rows are
absent (an export never writes an empty sky container); a fallen island exports its landfall only. **Knowledge:** a
`secret` access is withheld from every key that does not admit it (§9.2's `admit`, §11.1's *Knowledge*). The strip is
thematic: the PNG and tile layers, VTT, glTF and CityJSON carry the island's physical shadow through the light pass and
its solid, never the strip (J-V5.35).

## 6 Performance budgets

All PLAUSIBLE until M6-sky measures them (V05 §8), on §12.1's reference machine; the sky is off on the one-click path, so
§12.3–§12.5's laws are unchanged there. §12.4's sky row cites this table (item 476).

| work | CITY, three islands | METROPOLIS, three islands | basis |
|---|---|---|---|
| S7b (5): `S_town`, slots, reasons, fills | ≤ 3 ms | ≤ 5 ms | one mean over ≈ 24 000 / 62 000 field cells; ≤ 100 fill batches per slot |
| S7b (5): outlines and placement | ≤ 8 ms | ≤ 20 ms | the 64 m class raster once (≈ 6 000 / 15 600 cells); ≈ 15 600 / 40 000 candidates × ≤ 30 / 60 outline cells |
| S7b (5): the reachability transform (V05 §3.7 (2)) | ≤ 0.5 ms | ≤ 1 ms | one two-pass chamfer transform over the class raster, the raised parts' piers, dilated deck plans and deck faces rasterised into it once (≤ 40 raised parts at METROPOLIS); one read per rim cell of a candidate |
| SKY, per island | ≤ 7 ms | ≤ 10 ms | one L0 and one L1 batch; terrain ≈ 4 000–16 000 cells and `hydro` ≈ 1 700–6 500 on a 520–1 010 m frame (a disc to a grown spindle, V05 §3.8 (1)); the river; the claim search (≤ 2 000 sites at 10 m, each an O(1) fit and the crypt test); the ground landing claims |
| SKY: the island's gradient field (V05 §3.11) | ≤ 0.5 ms | ≤ 1 ms | ≤ 200 / 400 lattice cells: two ranks, one sort, the band map, ε and the three-box blur |
| the unit run, per island (V01 §6's sky row) | ≈ 8–12 ms, on the generation worker concurrent with the pool | ≈ 12–18 ms | ≤ 3 districts' worth, ≈ 2–5 % of the town's plots |
| SKY: the ground reference and the altitude, per island | ≤ 1 ms | ≤ 1 ms | ≤ 300 / 800 field cells under the projected solid, each a terrain read and a ceiling from the placed casters and the allocated tower rows |
| field pass 2: the strips onto the ground, per island (and per epoch) | ≤ 4 ms | ≤ 6 ms | ≈ 4 600 cell-sample tier walks at METROPOLIS's largest island (the low samples' long sweeps dominate), each ≤ 7 tiers × ≤ 20 steps of O(1) mask reads, most ending at the first hit, after the corridor's O(1) pre-test per cell (V05 §3.19 (5)); ring masks ≤ 60 000 / 160 000 bits, built once from `shadeBasis`; measured on the flat B-CITY fixtures and on a mountainous METROPOLIS fixture (relief class `mountainous`, island over a valley) |
| SKY's last step: strips onto islands and `shadeSky` | ≤ 1 ms | ≤ 1 ms | ≤ 500 lattice cells per receiving island, only under a higher island |
| the route distance (V05 §3.20) | ≤ + 5 % of the unit run's S10b and of the pooled S10b of the districts holding a landing | same | ≤ 3 accesses × 3 raster reads per pull that crosses arenas (a hand-placed access adds its own reads) |
| SKY-F | ≤ 3 ms | ≤ 4 ms | the clearance check over the projected faces; ≤ 60 lights per island |
| **the model's critical path** | **+ ≤ 55 ms p50, ≤ 68 ms p95** | **+ ≤ 84 ms p50, ≤ 104 ms p95** | the unit runs hidden by the pool while the generation worker's concurrent work (hinterland unit + islands) stays below the pooled time; the ground's work falls by the carried share |
| S14, per island | ≤ 4 ms, ≤ 5 000 marks | ≤ 6 ms | the district rate on its fabric plus rim, shadow, access and slab records (≤ 7 slabs, ≤ 256 vertices each) |
| rendering, a tile an island covers | ≤ + 30 % of that tile's raster and light-pass time | same | the second base and surface layer (V05 §5.3) |
| rendering, the light pass on tiles no island's land covers | ≤ + 5 % against the same map without islands | ≤ + 5 % with three islands | the window without slabs and the per-tile slab cull (item 416); measured at P3; **fallback:** cull the slabs per tile by the exact union of their shadow sweeps (not the bounding box), re-measured |
| `setAttr` altitude, occlusion, underside, name | ≤ 5 ms | ≤ 5 ms | the record, a marks delta and a slab delta |
| a move | ≤ 65 ms | ≤ 70 ms | 5 ms plus two post-build placements (§12.6's 30 ms each) |
| a resize, a rim reshape | ≤ 5 ms + §12.6's scoped regeneration of each receiving district and of the district whose institution claim is re-searched where it receives no face (at most k ≤ 3 in all; V01 §6's sky row) + §12.6's scoped-regeneration law once over the plots the event re-cuts outside those districts (each re-claimed yard's covered plots by §7.3's local operator; a shrink's or an inward stretch's cleared and re-cut plots, §4.7 S10 (7); J-V5.81) + §12.6's 30 ms per re-claimed landing yard's top placement (`placeAt`, one per access; a reshape's on the moved stretch's yards only) + §12.6's 30 ms per re-landed foot's placement | same | the buffer bisection (≤ 12 steps), one island L1 batch re-laying the strip and yards, the claim re-search (≤ 2 000 sites at 10 m, SKY's rate) only where the claim no longer fits; the re-cut plots' one scope — a yard (V05 §2.4's `landing` row) touches ≤ 3 plots, a shrink's the plots its eroded band and re-laid strip line cross (V01 §6's sky row leaves them to this row); each re-claimed yard's `sky_landing_top` use opened at its re-seated top by a positive placement (§7.7's `placeAt`); volume 1's `plantRimWalk` once (two `Greenery` records); V06 §6.2 prices an epoch's resize at this row |
| New random on an island | ≤ 40 ms | ≤ 55 ms | SKY plus its unit run |
| `placeSkyAccess`, an access `delete` | ≤ 35 ms | ≤ 40 ms | an island L1 batch, a local re-derive and one placement |
| declaring an island after generation | ≤ 120 ms | ≤ 160 ms | the fill with its relocations, SKY, the unit run |
| `fallIsland` | ≤ 80 ms | ≤ 110 ms | relocations, demolitions, the archive; + 30 ms per access of another island it re-lands |
| `IslandEpochStep`, per island | ≤ 2 ms plus its conversions at the rows above | same | the epoch's strips are the field pass 2 row |
| `sky.clearance`, per island and epoch (V05 §3.15 (7)) | ≤ 1 ms | ≤ 1 ms | the epoch scope's elements under the projected solid (≤ 300 / 800 field cells), each a footprint test and a top read; no geometry written |
| `skyAccessObstacles` and its callers' tests | ≤ 0.05 ms per call with the generated accesses (≤ 9 entries) | same | one entry per live access (V05 §2.3b), linear beyond nine; the raised-way solver tests each candidate span against them in O(entries), inside its own budget (§12's) |
| the shade map view's pending strip after an island edit | ≤ the field pass 2 row, computed only while that view is shown | same | never on the edit's own path |
| Update shade now | ≤ the field pass 2 row for one island + the field's recomputation over the two windows (≤ 2 ms) + §12.6's rate for the blocks it re-derives | same | a scoped evaluation, never a whole pass |
| memory | ≤ 5.2 MB for three islands (the strips ≤ 30 KB each, `shadeBasis` ≤ 2.5 KB each) | ≤ 9.3 MB (≤ 60 KB each; bases ≤ 2.5 KB each) | an island's arena ≈ 0.5 MB per district's worth; its rasters ≤ 0.1 MB; the sky surface layers only on covered tile positions, inside §8.8's canvas budget B |
| document | ≤ §2.9's 320 B per island building, plus ≤ 2 KB per island record and ≤ 2.5 KB for its `shadeBasis` (the rim copy ≤ 256 vertices × 8 B, the rest ≤ 0.5 KB) | same | |

The strip rows assume §4.5's default sampler (one point per cell); at its fallback of four points per cell they scale by
four — ≤ 16 ms at CITY and ≤ 24 ms at METROPOLIS per island — and the memory row's strips by two and a half (two bytes
per cell become five). The chain rule of V05 §3.20 (9) and the node term add no measurable work: the one is a filter on
the sky fill and the route reads already costed, the other one addend per evaluation. **Pre-decided fallbacks:** the
strip row missed → `shade.stepM` 8 → 16 m and `shade.ringMaskM` 4 → 8 m, re-measured (T-V5-20's one-cell agreement
re-checked), then the samples' reach cap for the strips 8 → 4, recorded as a declared shift of the term; the model rows
missed at M6-sky → the placement lattice coarsens 40 → 80 m and the island units join the pool as units (pool size ≥ 1),
re-measured; the rendering row missed → the sky surface layer at half resolution (rung 2's method), then the vector rung
for the sky base only, reported in the view telemetry; any other row missed is re-declared at its measured value for the
owner's veto (D-18).

## 7 Tests and acceptance bars

§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets. The base's island bars
T10-1, T13-1 and T15-1 stand (§13.2), and T102-2's island clause is T-V5-19 with T-V5-20 and T-V5-21; T103-1 runs
T-V5-22 on its island seeds, T104-1 T-V5-23, and T104-2 and T104-3 T-V5-24. Every no-op pin below is a `NoOpPin` on V12 §3.7.8's
engine, "off" for item 110's rows read from V11 §3.24.0's switch table (every `deck.offer` 0, `terrace.enabled` false,
the `raisedWays` chances 0) (X-V12-11).

* **T-V5-1 — the gate** [C]. TOWN and every village rung never carry a sky allocation; a CITY with the setting off
  carries none and its ground digest equals the realism golden (T13-1); the `MFCG` and `FTG` presets carry none; a
  dossier-bound CITY whose `site.magic` resolves `none` refuses the setting (F-EDIT `dossier-owned`); a dossier rung below
  CITY resolves `gated: rung`.
* **T-V5-2 — the count** [C]. 500 CITY seeds at the target at `wealthLevel` 0.5 and 1: every count 0–3 within ± 3 s.e. of
  the slot law at each seed's own `h_town`; slots never skip; `islands.count` 0–3 give exactly that many open slots on
  200 seeds each (their supply permitting, each empty slot reported).
* **T-V5-3 — the supply** [C, O]. (a) V05 §3.3's calibration bars at P0; (b) `A` monotone non-decreasing in `h_town` and
  `h_carried` over the rows (T10-1); (c) `S_carried` equals the mean of the carried households' band values to 10⁻⁹;
  (d) a fixture whose every district cell lies in water or an excluded reservation gives `S_town` = 0 and no island,
  reported `no supply`, and no island edit changes `supply`.
* **T-V5-4 — the fill** [C]. On 500 CITY seeds with islands: ground plus sky households equal the roster's total exactly;
  carried households by band never include a band poorer than a band left uncarried; the stop cause is one of V05 §3.5's
  three; the fill converges within 100 batches; a slot below `minAreaHa` closes and its rows return; an institution slot
  carries exactly one instance of one of its tags and its staff, never a COUNT, GUILD or QUARTER record or member; no S3
  reservation is left without an owner by an institution slot (100 %: the hand-over instance or `park`, F-SKY-HANDOVER
  counted); no household a dossier district-defining record's raised share holds is carried (100 %); a slot with one
  reason candidate takes it, one with none closes reported.
* **T-V5-5 — placement** [C, O]. 1 000 islands on B-CITY: no island without an assignment or declaration has more than
  10 % of its outline cells over `core`; 0 islands within `gapM` of another; 100 % inside the frame inset; ≥ 80 % of
  prisons ≥ 1 000 m from the plaza and ≥ 80 % of palaces within 1 000 m of it; every F-SKY-PLACE rung counted in the
  report; 100 % of islands placed by rule have a rim cell on admissible ground or within an admitted slanted row's run of
  it, including on the lake, estuary and sea fixtures; on a fixture with no plaza the purpose term is 0, and a tower row
  reads `far` from the plaza.
* **T-V5-6 — outline and arena** [C]. 10 000 sky outlines per template: simple (§13.2's outline property), area within 1 %
  of `A`; each arena's rim is one closed chain carrying `rim`; exactly one void and one land face at L0 before water; every
  SKY commit record writes only its island's key and the ground's landing claims; for every template at every aspect its
  row admits, 100 % of outlines grown by the buffer resize to 1.5 × `areaHaMax` lie inside their frame; a self-touching
  lasso and collinear corners are bent as V05 §3.23 (e) states.
* **T-V5-7 — terrain and the conjured river** [C]. On 500 islands with a river at CITY and METROPOLIS: its mean bearing
  within ± 15° of the ground river's; 0 non-monotonic beds; every river ends at the rim with `fall`; its width inside its
  clamp; F-SKY-TERRAIN's rungs counted; a one-cell `hydro` grid gives no river, reported.
* **T-V5-8 — access** [C]. Every island placed by rule has ≥ 1 access (0 % `unreachable`); a declared island has ≥ 1 or
  is reported `unreachable`; every hoist and stair foot lies on land in an admissible face; every ground landing plot
  fronts a way or has its trail; rope lines ≤ 350 m and bridges of light ≤ 600 m of horizontal run; every stair's helix
  ends at its top with a landing every 20 m of rise; no stair or bridge of light where `magic` is `none`; `guarded` only
  on a prison; after SKY-F every island landing attach is met by an island way, and 100 % of ground landing attaches are
  met by a walkable part-0 way after S8; the ground landing of a `secret` access is fronted and withheld from every key
  that does not admit it (100 %); hand-placed accesses fill the rim's free yards and the next is bent by
  `bend.access.rimFull`, `skyAccessObstacles` holding one entry per live access. **With item 110** (on 500 CITY and
  METROPOLIS seeds with islands and item 110's rows on, and on hand-built fixtures): 0 raised decks or raised-way piers
  inside any access column or any landing yard dilated by `deckGapM` (100 %, whether the raised part came before SKY or
  after it — an epoch's raised-way pass, a T4 stroke); every rope line and bridge of light ≥ `lineClearM` over every
  raised deck and raised-way pier it crosses; 0 feet and 0 landing yards on a deck face; 0 landing attaches met only by a
  raised deck or an aqueduct; a T4 `raised` stroke ending on a rim leaves 0 ways on the sky arena and places 1 access of
  an admitted kind (J-VI.4 (d)), an aqueduct stroke to a rim and a `raised` or aqueduct stroke on an island's key are
  bent (J-VI.4 (d)–(e)), each with its line, and a `raised` stroke across an access's column is re-routed or, where
  `skyAccessObstacles` offers no re-route, ends at the last ground vertex before it with `bend.raised.hoist`'s line
  (J-VI.4 (f)).
* **T-V5-9 — the unit run's contract** [C]. (a) The rim strip is never cut or plotted; (b) `SeamReport.portalsTotal` = 0;
  (c) the island's district count equals V01 §3.10.3 (2)'s count for its allocation read with `districtHa`, within V05
  §3.23 (e)'s bound; (d) an island with `h_carried` = `h_town` = 1 has 3 districts at METROPOLIS and at least 2 at CITY on
  ≥ 90 % of seeds; (e) every island district's kind is a `sky-*` kind of V05 §2.4 and every fabric hint a valid
  `FabricStrategyId`; (f) on 500 seeds, 0 households re-homed from an island by S10a's band-range step, each carried
  band's share of the island's plot land within ± 5 % of its carried share, and a one-band island and a one-cell lattice
  as V05 §3.23 (e) states; (g) its housed households equal its allocation's, or F-SKY-UNIT's overflow is reported; the
  runner lays no second terrain on the island and its field step reads the unit inputs' values (V05 §3.12); (h) **item
  111** on an arid fixture: with the oasis chance, the water pull and the climate cell at their arid values and at their
  neutral values, the island's arena, terrain, river, gradient raster and context vector are byte-identical for the same
  allocation and terrain draw, no oasis lies on any sky arena (100 %), and an oasis on the ground is classed `water` by
  V05 §3.7 (1)'s raster; (i) an island whose land is all strip and claims returns no district and F-SKY-UNIT re-places
  every household on the ground, the population whole.
* **T-V5-10 — underside and altitude** [C, O]. The apex clears the tallest caster beneath by ≥ `clearanceM` on 100 % of
  islands after SKY-F; the altitude fixed at SKY stands (no F-SKY-CLEAR raise) on ≥ 99 % of 1 000 islands at CITY and
  METROPOLIS (V05 §3.9 (5)'s measurement), measured with item 110's terrace, raised-way and deck-plot rows on at their
  defaults, and the 100 % clause holds after every epoch of a century run (`sky.clearance`, V05 §3.15 (7)); each
  underside tier's ring lies inside the one above it translated by the apex step, with decreasing area; each profile's
  measured radius ratio (the tier rings' equivalent radii ÷ R) within 0.05 of ρ(z_i) at every tier; a crescent's apex
  lies over its land face.
* **T-V5-11 — lights and names** [C]. Rim orbs at 40 m ± 1 m; the keel light's intensity 4 000 × `h_carried`; a settled
  island's magical lights 0, a held island at `h_carried` 0 unlit with its lanterns lit; every island named, an island over
  water named without the missing features; its `quarter` label drawn at the city band at the reference viewport on
  100 % of visible islands.
* **T-V5-12 — labels and occlusion** [C]. Under `opaque`, 0 ground labels drawn inside a visible island's land face;
  under `ghost`, a sky label wins a collision against a ground label of equal priority; under `offset`, sky labels drawn
  at their displaced positions; with the sky layer hidden, 0 sky labels, 0 slabs and no model digest changed (T15-1);
  every shipped sheet loads at every band with every sky semantic resolved (item 408), a user sheet missing one is
  refused naming it, and the `fallen` row draws over the landfall's members; a degenerate sky mark draws nothing and fails
  no tile; an island too small for its spine takes a point label or none.
* **T-V5-13 — the underside's shadow under the fixed, path and cursor suns** (J98) [C, O]. A hand-built island (8 ha,
  `root` profile, 100 m altitude) above the golden TOWN, `ghost` occlusion (and (a)–(c) again under `opaque`), the view
  at the 1:500 stop, CPU reference and GPU pass: (a) under the fixed sun set to 15°, 30° and 60° and the path sun at three
  hours, the shadow's boundary on open ground within max(1 px, §8.4 (c)'s floor-cell diagonal) of the analytic union of
  the tiers' projections; (b) the shadow's area strictly increasing as the sun lowers; (c) the same island with a `flat`
  profile: at 15° the `root`'s shadow reaches past the `flat`'s by `depth · cot 15°` within 1 px toward the sun (toward
  the footprint); (d) the cursor sun at nine pointer positions at the 1:500 and 1:2 000 stops: the shadow falls away from
  the pointer, `H` ≥ 1.5 × the list's top, the GPU within §13.4's tolerance, and at a fixed zoom panning the island into
  and out of view changes `H` by 0; (e) at 15° a ground point under the island's centroid but outside the root's
  projection is lit (V > 0); (f) the penumbra's width at 200 m altitude exceeds that at 100 m; (g) the `flat` island with
  a 30 m rim against a 10 m rim: at 15° its shadow reaches 20 m · cot 15° farther toward the sun within 1 px (the owner's
  "thickness"); (h) at 15° the `root`'s vector-rung shadow is one connected region (the prism form); (i) a fixed sun at
  the zenith shades exactly the footprint; §13.4's island-shadow golden stands.
* **T-V5-14 — over time** [C]. T8-6 stands (a CITY dropping below 10 000 loses its islands through waning, settled and
  fallen over their dwells), the landfall at TOWN by the same table; on the hook fixture a settled island refloats before
  any island is raised; a resize keeps every plot address away from the rim (100 %); after a growing and a shrinking
  resize and a rim reshape on the hook fixture's institution island, the rim strip lies `rimStripM` inside the new rim
  everywhere and every landing yard meets its top on it (100 %), the rim walk stands on the re-laid strip — one
  `esplanade` and one `street_trees` `Greenery` on the re-laid strip after each — 0 ways cross the strip, a growing resize
  re-derives exactly the districts that receive band faces and the district whose institution claim is re-searched, a
  shrink and a reshape's inward stretch no district but that claim's district where the claim is re-searched (every other
  island district byte-identical, the district count unchanged), after a re-search the institution stands on its new
  claim in one building with the old one demolished, and a shrink requested below the institution floor is bent to it
  with the claim keeping a site in its own district (J-V5.77); an epoch target below `minAreaHa` stops at it. A landfall
  adds and removes no ground edge, demolishes exactly the covered set's buildings, keeps every locked entity, credits the
  ledger with the covered area × `stoneM3PerM2`, relocates every dossier use before its building goes; on a fixture whose
  footprint covers a wall stretch, a `main` gate, a tower, a bridge deck, a market reservation and a way: the stretch
  `breached` over its covered length in the enceinte's `condition` (a run already `dismantled` kept) and, the ring in use,
  back to `standing` at the next `fortification` phase (V06 §3.7.5; T-V6-11), the tower and the `main` gate inside the
  `breached` run — drawn by their run and standing again with it, no state written to any `Tower` or `Gate` — the bridge
  `ruined`, the reservation vacant under the rubble, the way `rubble` and routed as `track` with its class before the fall
  in `Way.formerClass` — a covered lane V06 had downgraded keeping its earlier `formerClass`, 0 covered ways without one —
  until an epoch's clearance restores that class and clears it (V06 §3.5.2; T-V6-66 on the same fixture), the fall's undo
  restoring each way's class and prior `formerClass`, the landfall's quarry carrying its `source` and read by no
  underground quarry rule, a locked wall kept — each listed as a fate; a footprint wholly over water lays a memberless
  decoration with its one fate; **another island's landing under the footprint**: its access re-landed outside the
  footprint in the same event, or dropped by F-SKY-ACCESS's last rung where no admissible point lies within twice its
  run, and the fall's undo restoring it at its former foot. A dossier absorb removing an island's palace leaves the island
  at once without it, and at the next epoch the island takes the next palace instance where one exists, else becomes a
  prosperity island where the rich band admits it, else wanes (the three cases on fixtures); **with the island locked**
  the absorb still removes the palace, the island stays an institution island with its claim empty and the fate "held
  without its palace" listed, and the re-reasoning runs at the first epoch after the unlock; each conversion's undo
  restores the model byte for byte. **With item 110:** the landfall fixture also covers an aqueduct span, a viaduct's
  raised-way pier and the span it carries (itself less than half covered), a generated retaining wall and a bridge
  carrying deck plots — the covered span, the pier and the span on it `ruined`, the viaduct's crossing closed and the ways
  beneath it touched only where covered, the aqueduct's terminal listed as run dry and its lost supply read at that
  epoch's `raisedWays` step when the fall is an epoch's (the next epoch's for a hand `convert`), the retaining wall
  `decayed` over its covered length and still `decayed` after a re-derivation until an epoch's restoration re-derives it
  (V06 §3.19.4 (6)), the deck plots' households relocated before their buildings are demolished and the plots tombstoned
  with the deck — 0 vacant plots left on a ruined deck, and a later repair of the deck re-offering its faces to new
  lineages — the covered spans, piers and walls in the decoration's `members` — each span as `{ raised, span: [a, b] }`
  and each pier as `{ raised, support }` on item 244's keys, the same members after a re-derivation of the viaduct, each
  leaving in the batch of the op that ends its cover (V06 §3.5.2) — the deck plots listed as fates, never members, all of
  it in V05 §5.5's per-landfall CSV, and 0 edges of the ground's streets and plots added or removed beyond the tombstoned
  deck plots' lines.
* **T-V5-15 — goldens and determinism** [C]. Two sky fixtures join §13.3's goldens — a CITY with a prosperity island and
  a conjured river; a METROPOLIS with a palace island and a prison island — identical on the five engines; every stream
  key distinct (§6.1's sky fixture); an island raised after a fall takes a new part; a document with an island declared,
  moved, resized, given an access and brought down replays to the session's digest; with one island only slot 1's
  indices are drawn. **Item 110's pin and shift** (J-V5.67): with item 110's terrace, raised-way and deck-plot rows off,
  both sky goldens are byte-identical to their pre-item-110 digests (the no-op pin); switching the rows on at their
  defaults changes both once, recorded as one declared shift naming the two fixtures (raised ways and retaining walls
  beneath and on the islands; `groundRefCm` and the altitudes where a raised part stands under a solid); the METROPOLIS
  fixture pins one raised way under an island (T-V5-31 (a)).
* **T-V5-16 — editing** [C, O]. Every event of V05 §4.2 undoes exactly, Update shade now restoring the former basis,
  strips and field cells; §7.3's oracle checks byte for byte outside V05 §4.3's scopes on B-EDIT sequences with island
  edits (10³ in the PR tier, 10⁴ nightly), a ground edit touching a footprint at a point leaving the island untouched; a
  move keeps every address on the island; New random on an island keeps the ground's digest; a declaration where
  `h_town` = 0 carries the `held against its supply` fate; every line of V05 §4.2's bend table appears on its fixture —
  a fourth island joining the nearest island, a count below the forced count raised, a T5 `sky` declaration at TOWN laid
  on the ground, a move into another island's gap, an altitude below the floor, a resize below the floor or to 0, a
  reshape held by the claim or making the rim non-simple, a delete on a fallen island, an access kind that does not fit, a
  foot on a deck, a full rim, the last access's delete, the raised and aqueduct strokes, a raise cutting a hoist, a rim
  retaining stroke, a rim wall stroke — each resolving to its V09 §4.9 message row and V10's bend category; the
  dossier-magic refusal holds; Update shade now writes `by: 'update'` and the current epoch.
* **T-V5-17 — exports** [C]. GeoJSON sky coordinates equal `anchor` + local exactly and validate, a vertical access a
  Point with its two elevations; each island's VTT scene imports with no manual steps; the glTF island mesh is a closed
  manifold and validates; CityJSON with PLAT's extension validates; a document with no island writes no sky container;
  an export after an undo equals the export before the undone event.
* **T-V5-18 — budgets** [C]. V05 §6's rows on B-CITY and B-CITY-lite METROPOLIS seeds with three islands, or their
  fallbacks applied and reported; the one-click path unchanged (§12.5).
* **T-V5-19 — the shade strip moves the field, gently** (T102-2's island clause) [C, O]. A uniform district — level
  ground, one district kind, no driver varying across it — with a hand-built island (8 ha, `root`, underside 100 m above
  its ground) over its southern edge, latitude 50°, `w_sun` at its default: (a) the mean pass-2 prosperity over the
  cells the strip blocks for at least three samples is lower than over the district's unblocked cells by the expected
  difference — `w_sun` × the mean shade share of those cells, passed through the field's smoothing computed on the same
  fixture, never assumed — within ± 10 % of it; (b) no plot's band differs by more than one from the same fixture with
  the strip left out; (c) with `w_sun` = 0 the field and the town are byte-identical to the run without the island term,
  and with no island every strip is empty and the field byte-identical to the base's pass 2 (no-op pins); (d) the strip
  identical on the five engines; (e) an island at the frame's edge reports F-SKY-SHADE's clipped share; (f) V05 §6's
  strip row; (g) a receiver above the caster and two islands at one height set no bit, and a strip with no blockable
  cell has `cells` 0 and no outline, attribution or export feature.
* **T-V5-20 — the model and the picture agree; the underside shapes the strip** (J98) [C]. For each sample, the CPU
  reference's vector-rung shadow of the smooth tiers under the path sun set to the equinox at that sample's hour, on flat
  ground, covers exactly the cells the strip marks for that sample except cells its boundary crosses; a `root` island's
  strip at sample 0 reaches past a `flat` island's of the same outline by its depth × `c` within one cell along +ŝ (toward
  the footprint); a 30 m rim against a 10 m rim lengthens the `flat` island's strip at sample 0 by 20 m × `c` within one
  cell along +ŝ; the basis rim's simplification (≤ `shade.basisVertexCap` vertices) moves no strip bit on the fixtures.
* **T-V5-21 — order, lag and the supply** [C]. (a) `S_town` at S7b and at an epoch equal to 10⁻⁹ between `w_sun` at its
  default and 0 when only the islands' strips differ (item 102 (c)); (b) after a move, an altitude, a resize and New
  random on an island, the ground's field rasters, every plot's derivation record and the shade view's veil
  byte-identical to before — only the pending outline moves — the strip's basis stale and the fate listed; at the next
  epoch (or after Update shade now, over its two windows only) the strip recomputed from the island's new state and the
  field moved; (c) the epoch after a fall carries no bits from that island; (d) a document with an island moved and an
  epoch run replays to the session's field byte for byte; (e) a lower island under a higher one reads `shadeSky` > 0 on
  its cells in the higher one's strip and 0 elsewhere; (f) on a fixture where a house (V06's building shade mask, after
  one epoch) and the island shade the same sample point at the same sun, the OR counts it once, at the default sampler
  and at four points per cell alike, and the strip's `bits` equals the mask's; (g) the participant `sky.islands` runs
  once per epoch at `afterField`, after S6's re-evaluation, and a history run with the engine's other participants
  switched off draws the same island values (V05 §3.15); ground plus sky households equal the epoch's target after
  `siting` (100 %), the released households placed first from the displaced pool with cause `island` and the taken ones
  subtracted by `demandTaken`; (h) **the lag survives a save**: move an island, save, reload, then re-derive a block with
  a prosperity brush — the field raster and every derivation record equal those of the same session without the save,
  byte for byte; the same after an F-SKY-CLEAR raise and after a `w_sun` = 0 table (the strips still computed and held);
  and the same on a **terraced fixture**: an island over a ward that S10 and S11 level with retaining walls — the strips
  computed at S10a equal those a load rebuilds after the levelling, bit for bit — and after a T2 terrain stroke under a
  strip (the bits re-read over its scope from the unchanged basis equal a load's rebuild); **a raised island**: an island
  raised at an epoch (after S6) and one declared by T5 between epochs, each saved and reloaded before the next evaluation
  — the load writes no basis, neither casts nor receives a strip, and the field raster and every derivation record equal
  those of the same session without the save, byte for byte; after the next epoch's S6 (or Update shade now on it) each
  casts; a document whose `schemaVersion` predates the basis step loads with the basis of every unfallen island computed
  once, and never again; **one strip per evaluation**: with V01's S9b registered, the strips S9b's manor sun factor reads
  and those field pass 2 folds are the same held strips, bit for bit, at generation and at a re-derivation from S10a
  (whose bases are written at S10a's start, before step (i)).
* **T-V5-22 — siting across the island** (T103-1's suite on island seeds) [C, O]. On 300 CITY seeds with islands, in
  the siting statistics suite (item 103 (e)): (a) no class `IslandRule.carry.never` excludes is carried by any island
  (100 %) — a top-step emitter, a heavy processor, a wholesale or storage class, a class with a hard need for running
  water, a river bank, the harbour, a gate or a quay, an active chain's working node — and no NEEDS row is satisfied by
  island water; (b) a class with a district coverage row serves the island's districts at or above the ground's served
  share of districts, its island members spaced by its same-kind row, and with the coverage weight 0 the run is
  byte-identical to one without coverage (no-op pin); (c) island classes with a ground supply edge stand at a mean route
  distance to their providers below that under random placement on the island; (d) the ground's suppliers of island
  classes stand nearer the landing feet than under random placement; (e) a `secret` access carries no pull of a class
  whose clientele is not clandestine (100 %); (f) the crime-aligned classes stand farther from a prison's guarded hoist
  foot than their baseline; (g) on hand-built fixtures every route distance equals the sum of its legs to the centimetre
  (a foot outside the walls reaching an inner class through its gate), `skyRoute` names the access of the least sum, a
  `river` or `sea` edge across arenas is ∞, and an island with every access closed reads ∞ with its pulls reported unmet;
  mirroring item 105 (k) across the arenas: (h) a multi-output producer with island consumers sits nearer its dominant
  output's landing foot than its random baseline, and island consumers of a shared ground provider bind to it by the
  route; (i) split pairs across the arenas appear for split classes past the threshold, are reported, and never appear in
  the parity presets; (j) the per-arena relaxation settles within its cap, the second pass moving fewer members than the
  first, byte-stable across runs and worker interleavings; (k) with the web's weights, `comfortM` and the spacing at 0,
  the result is byte-identical to the run without items 105 and 107 (no-op pin).
* **T-V5-23 — custom institutions on islands** (T104-1 on islands) [C]. A dossier custom institution of archetype
  `exotic-tower` is a `tower` candidate where the world has magic and not where `magic` is `none`; a `martial-keep` is a
  palace candidate at `landmarkLevel: landmark` and not at `standard`; a revision that changes its archetype keeps it on
  its island unless a hard row of its new profile fails there, and then re-sites it on the ground by least disruption,
  the claim standing vacant until a later epoch re-occupies it with the next instance first; zero placement failures.
* **T-V5-24 — custom chains across the island** (T104-2's and T104-3's island form) [C, O]. On 200 CITY seeds with
  islands and a fixture set of active custom chains — a perishable food chain, a luxury chain whose consumers are rich
  households, and a chain one of whose processors is a custom `exotic-tower` carried as the island's `tower` — in the
  siting statistics suite: (a) no chain's resource or processing node is carried by an island except the island
  institution, and no chain resource is sited on an island's conjured water (100 %); (b) the ground end of every
  cross-arena link stands nearer to the landing foot of its shortest route than under random placement of that node; (c)
  the flow order by route distance holds in at least the share the base's ground-only bar declares for the same chains;
  (d) a chain with nodes on two arenas is never reported as close at street scale across the arenas, and a quarter name,
  when one arises past item 72's threshold, lies on the ground; the same bars hold for a dossier's `activeChains[]`
  fixture; (e) an import or export store of a chain with an island node stands at a ground gate or quay (100 %); (f) a
  chain toggled off and on returns its island nodes to their sites where nothing else changed; (g) a T6 declaration of a
  processing node onto an island is held and lists the "crosses the hoist" fate; zero placement failures.
* **T-V5-25 — the magical node** [C]. On 300 CITY seeds each of a dossier fixture without deposits and the same dossier
  with a `magical_node` `available`: `h_town` rises by exactly `node.bonus` (clamped at 1) wherever the interpolated
  value is above 0 and not at all where it is 0; the count, `A` and `E` move monotonically with it (T10-1's
  monotonicity); two nodes add one bonus; `discovered` adds nothing at generation and the bonus at the next epoch;
  `depleted` and `removed` add nothing, and a node removed at an absorb leaves every island floating until the next
  epoch's evaluation, when the law may start its wane (never a vanishing); a standalone map's `h_town` equals the
  dossier-free fixture's; with a ruin fixture holding the node, the term is unchanged and no island rule reads the
  underground arena; on that fixture the `why` on the town supply names that ruin from the report's `ruin.node` line
  (V04 §3.5.0a (9)) — its new name after a rename of the ruin — while on the fixture with no ruin it names the deposit
  and no ruin.
* **T-V5-26 — the island cathedral's crypt; no catacomb in the sky** (item 109 (k), J111) [C]. On 200 CITY and
  METROPOLIS seeds with a cathedral island: the cathedral carries the settlement's largest crypt, inside the island's
  rim slab — its floor ≥ `cryptFloorM` above the slab's base at every point of the claim — or, where no site passes, the
  half-sunk form with its fate (100 %); on a `flat` island likewise; 0 underground parts, links or catacomb sources on any
  island (100 %); every catacomb lies under a ground cemetery or a quarry ossuary; no island churchyard is a candidate or
  ranked as the largest cemetery; island churches are counted once in the catacomb count; the S3 precinct passes to the
  largest ground church (or `park`), whose crypt is never ranked above the cathedral's; an island over a vault reads
  nothing of it.
* **T-V5-27 — the rim as a barrier** (item 106) [C]. Generation lays 0 enceintes on any sky arena; a wall drawn on an
  island with two landings gives exactly two walled stretches, each across its landing yard with a gate at its attach and
  a tower at each rim anchor, and 0 wall edges elsewhere on the rim; the enclosure test reads the island as sealed, its
  closure arc `sheer`; a stroke along the rim away from a landing is bent to the landing stretches with
  `bend.wall.rim`'s line; adding a third access adds a third stretch, and an island with no live access keeps its circuit
  with no stretch; with item 106's `barrier` closure and profile off, byte-identical to the base (no-op pin). **With item
  110:** 0 island `RetainingWall`s classed as an `Enceinte` or a member of a barrier circuit; a T3 `retaining` stroke or
  T2 terrace stroke on an island lays a `RetainingWall` on the island's arena, drawn in its frame and displaced with it
  under `offset`, tombstoned at a fall and exported in `sky`; a retaining stroke on the rim strip or along the rim is
  bent inward to 1 m inside the strip's `setback` line along the island's radial direction (`bend.retaining.rim`), a
  stroke wholly in the strip whose moved points coincide bent to nothing; the unit run's levelling lays 0 retaining walls
  on the rim strip; with item 110's terrace rows off, the island is byte-identical (no-op pin).
* **T-V5-28 — ladders across the arenas** (item 108) [C]. On the surveyed dossiers with islands: no ladder pair is
  counted twice across the arenas; every COUNT, GUILD and QUARTER record's members, counted on both arenas, lie inside its
  range; a cathedral island's subsumed parish churches, resident priest and wayside shrine each count once as its
  members, on the ground or carried, never as additions; an island institution is a singular or SIZE record (100 %).
* **T-V5-29 — a removal holds** (J-V5.62) [C]. On 200 CITY and METROPOLIS seeds with at least two islands: remove a
  generated island and a generated access on another island, then run a Regenerate, a Re-derive from S7b, New random on
  the other island, a save and reload, and a century of epochs at `auto`: both stay removed (100 %) — the removed slot
  never drawn, filled or re-opened, its outcome `removed by you` in the report; the higher slots' islands identical to a
  run where the removed island was never there but its slot counted filled; the deleted ordinal never re-sited and the
  island keeping a `main` access (the lowest surviving generated ordinal); 0 households allocated to a removed slot and
  ground plus sky households equal to the roster's total at every step; with `islands.count` pinned at 2 and one of the
  two removed, 1 island after every re-derivation; an `adjust('islands.count')` to 3 after the removal releases nothing —
  the held slot stays `removed by you`, only the free slots open, and with every slot held the adjust opens none and lists
  its fate — a T5 declaration takes a held slot only when no slot is free, the removal's undo restores the island byte
  for byte, and `removedSlots(doc)` lists each hold with `generated`.
* **T-V5-30 — what the raised-way generator reads of the sky** (J-V5.63) [C]. At generation the generated raised-way set
  is byte-identical with the islands setting on and off (decided before S7b (5), §4.3's slot); on 500 CITY and METROPOLIS
  seeds with islands and on the epoch fixtures of V06's raised-way pass: 0 raised ways with a sky endpoint, sky evidence
  or a sky water source (100 %); an elevated road bound to a precinct whose cathedral an institution slot took up still
  stands, its reason naming the hand-over; the aqueduct's need at an epoch counts 0 island households; 0 aqueduct
  terminals, basins, cisterns or fountains on an island.
* **T-V5-31 — item 110 under and on the island** [C, O]. (a) The METROPOLIS sky golden pins one raised way under an
  island: the caster ceiling at SKY reads its deck top with its parapet and its raised-way piers, and the apex clears it
  by ≥ `clearanceM`. (b) On the epoch fixture where V06's raised-way pass builds an aqueduct under a floating island and a
  new stage raises a stepped temple beneath another: after the epoch, `sky.clearance` has raised each island's
  `groundRefCm` to the caster (its `elevationCm` kept unless the floor failed, a listed fate "raised clear of the
  aqueduct"), `shadeBasis` untouched, and a replay of the epoch gives the same values. (c) A stepped island temple (V02's
  `stepped-temple` row): the surface top reads the highest massing tier at each point, and the crypt lies under massing
  tier 0 inside underside tier 0 with its floor ≥ `cryptFloorM` above the slab's base, re-tested at the levelled datum.
  (d) A raised way removed beneath an island leaves its `elevationCm` unchanged. (e) An `own` island's
  `terrainEcho.reliefClass` is the class its `island.place` draw (index `relief`) gives, 100 % over 500 seeds; New random
  re-draws it with the terrain; an `own` record loaded without it gets the same class, written and reported; an `echo` or
  `none` island carries none; and volume 1's `terraceState` on the island's districts reads that class, `plain` for
  `echo` and `none` (T-V1-21). (f) **The clearance against a lock:** on (b)'s fixture with the island locked (and again
  with only its `altitudeCm` path locked), `groundRefCm` and `altitudeCm` are rewritten, `elevationCm` is kept although
  the floor fails, the conflict `clearance held by your lock` is listed, and §5.3's clearance invariant passes by the
  island's exemption. (g) **A raised way under the island's shade:** a cell that the raised way's daylight shade and the
  island's strip block at the same sample counts once in the daylight term, at the default sampler and at four points
  per cell.
* **T-V5-32 — the stage order and SKY's data keys** (J-V5.70) [C]. With `@plat/hood` and `@plat/sky` both registered,
  the `StageDecl`s sort at load with no cycle, SKY after S7b (its S7c hook included) and before S8, S10a and S12a; S7c's
  declared read-set holds neither `reservations.landing` nor `allocations.landing` (T-V1-35 holding S7c to it); S7b (1)'s
  supply term reads each sky pseudo-district at its island's `anchor` + the outline's centroid (100 %); on 500 CITY seeds
  with islands SKY's ground commit records write no data key but those two, and after S10a every host district's
  `modest` residential households plus its landing rows' staff equal the `modest` households S7b allocated it (100 %);
  with the islands setting off neither key carries a row and the ground digest equals the realism golden (T13-1).
* **T-V5-33 — every edge defined** (V05 §3.23) [C]. (a) The pure functions on degenerate inputs return V05 §3.23 (a)'s
  empty results (a tier ring below a mask cell, a strip with no blockable cell, a route with no admitted access, a list
  with no live access), and a degenerate commit takes its class's ladder; (b) on fixtures at THORP, HAMLET, VILLAGE, TOWN,
  CITY, METROPOLIS at its cap and a standalone neighbourhood document, the sky behaves as V05 §3.23 (b)'s table states;
  (c) V11's compiler refuses each invalid `islands.json` of V05 §3.23 (e) naming the cell, and a table without a cell
  reads its default; (d) a snapshot with each contradiction of V05 §3.23 (d) is a corrupt cache and loads by replay to
  the log's digest; a migrated base island gains its terrain and underside, and an access whose row the table removed
  reads its kind's row or `closed`, each reported; (e) a ground edit flooding a foot re-lands it or drops it by
  F-SKY-ACCESS; an island whose floor lifts it above every access row's limit is reported `unreachable`; (f) every row of
  V05 §4.5's `island` section answers on its fixture, filtered by the caller's key (a `secret` hoist withheld), the
  evaluation's kind and epoch named from the strip's `evaluated`.
* **T-V5-34 — where the sky meets the other units** (V05 §3.23 (f)) [C]. On hand-built CITY fixtures: (a) an island's
  strip over a cliff, a steep slope, a coast, a harbour basin, a moat, a bridge, an oasis, a terraced ward, a retaining
  wall and a deck plot sets its bits at the unlevelled ground heights, every plot's derivation record equal to the same
  fixture's load rebuild, and on an arid fixture the strip's effect follows the climate row's weight; (b) access feet by a
  moat, on a terraced ward (run measured to the platform datum; a yard clear of the retaining wall's chain), at the
  frame's edge and over a vault resolve as V05 §3.23 (f) states; (c) a landfall over a cliff edge, a coast, a moat, a
  square, a terraced ward, a composed building, a planned building and the frame's edge covers and reports as V05 §3.16
  (4)'s table and §3.23 (f) state, the terrain untouched; (d) a locked plot under a strip keeps its content while the
  field moves, its value reported; (e) a landfall saved and reloaded keeps its decoration, members, quarry source,
  `formerClass`, `condition` and retaining `state`, and an undo after the reload restores the model byte for byte.

**Parity.** No reference has islands (II.6 (8)), so no parity number binds them. The nearest look is Neighbourhood's
lone patch — its own ground tone and a drop shadow marking its extent on an empty field
(`research/findings/vg-ng-devlogs.md` §B3.5) — so at M6-sky five island close-ups in `hatched` are set beside five
Neighbourhood patches as a descriptive pair set, rated for "reads as a floating patch": V12 §3.9.1's descriptive NG
`PanelSpec` (X-V12-4). It is information, never a gate; M6-sky lands after M5's sitting, so under J122 its panel joins
no owner sitting and its rows stay "provisional — not rated" (§13.6 (7); V12-XCONF-1).

## 8 Build plan

**Milestone M6-sky** — in §16's combined order (J122; V05 §11): after M6-U, on M4's hooks (S7b (5), the island conversion
kinds) and volume 1's unit run (M5); its P0 spike may run beside M5. Its price is its own line, outside the base total
(item 568 computes §16's totals once).

| phase | content | exit (executed) | pw |
|---|---|---|---|
| P0 — spikes | the supply calibration run (V05 §3.3); placement over 1 000 islands with the reachability filter; the unit inputs to volume 1's unit runner on a hand-built arena (with `districtHa` and the gradient: the band shares and the re-homed count); the caster allowance measurement (V05 §3.9 (5)) with item 110's rows on; the strip against the vector rung's shadow on one fixture; the save-and-reload of a lagging strip | the ⟨P0⟩ rows set or the fallbacks applied; T-V5-5's rates; the runner's contract passes T-V5-9 on the fixture; T-V5-10's ≥ 99 % clause; T-V5-20 on the fixture; T-V5-21 (h) on the fixture | 1.5–2 |
| P1 — the model | the records of items 203, 204, 213, 251, 252, 253, 274, 286 (V05 §2); `nextSkyPart`; `shadeBasis` and its load path; S7b (5)'s gate, slots, reasons (the archetype match and the ladder filter included), fills with `carry`, the held shares and the node term, the hand-over of S3 reservations, outline, reachability and placement; the arena with its outline-sized frame, the terrain echo, the river, item 111's rim; the underside, the ground reference and the altitude at SKY (item 110's raised parts, retaining walls and levelled platforms among the casters, V05 §3.22 (1)); the claim search with the crypt test; the gradient field; the strips from the bases on the unlevelled receivers (item 309), their fold into field pass 2 and the island-free value (item 296); the sky receivers; F-SKY-FILL, -PLACE, -TERRAIN, -SHADE, -CRYPT, -HANDOVER; SKY's own ground data keys (item 282), the strips held from their first read and the bases at S10a's start, the optional basis and its schema-chain step (item 274) | T-V5-1 to T-V5-7, T-V5-10, T-V5-19, T-V5-21 (a), (e), (f), (h), T-V5-25, T-V5-26, T-V5-32, T-V5-33 (a)–(d); the register check over the cells it lands (below) | 3.75–4.75 |
| P2 — access, unit inputs and siting | access tops, feet and landing claims (ground and hinterland) with the S8 destinations (item 299), the rim strip and its trees, the island's context vector, the `sky` request and `skyUnitInput` with `districtHa`, the kinds and the fabric prior, SKY-F with the clearance check and both repairs, the sky lights, names; the route distance in both S10b runs and the island's coverage units (item 308); the supply web, splits, per-arena order and relaxation, the district term, `comfortM` and spacing across the arenas (V05 §3.20 (10)–(12)); chains across the island, custom and `activeChains[]` (V05 §3.20 (9)); the rim as a barrier (V05 §3.21); item 110 against the accesses — admissible ground without decks and raised-way piers, `lineClearM`, `skyAccessObstacles` for the raised-way solver and T4, the island's retaining walls in the unit run's contract, the generator's reads of the sky (V05 §3.22 (3)–(5); items 245, 290) | T-V5-8, T-V5-9, T-V5-11, T-V5-22, T-V5-23, T-V5-24, T-V5-27, T-V5-28, T-V5-30 (with T-V5-8's and T-V5-27's item-110 clauses), T-V5-33 (e), T-V5-34 (a), (b), (d); the register check over the cells it lands (below) | 4–5.25 |
| P3 — the picture | the marks with their slots and sheet rows (item 408), the three occlusion modes with the underside and tether, the sky surface layer in the tile worker and the light pass (CPU reference and GPU) with the window without slabs (item 416), the vector rung's prism tiers, the cursor sun's floor, labels; the strip's outlines in V09's shade map view | T-V5-12, T-V5-13, T-V5-20 | 3–4.25 |
| P4 — editing | V05 §4.2's events and parameters (the island brushes, the access `setAttr` semantics, the pointer mapping in `offset`, an island wall) and its bend lines, dry runs with the shade fate, Update shade now, locality, undo, DR27 and its coherence with the dossier-removal path, the clerk's `WhyProvider` with the strip, route, link and siting answers; `convert removeIsland` and the removed ordinals with their holds (items 356, 375, 387); the screens of P4 are V09's AP7, built with this phase and priced in §16's staged-screens row (V09 §8), outside this total | T-V5-16, T-V5-29, T-V5-33 (f) | 2.25–3 |
| P5 — exports | GeoJSON (the strip features included), SVG, PNG, VTT, glTF, CityJSON's extension types, the statistics rows (item 415) | T-V5-17 | 1–1.5 |
| P6 — time | `IslandEpochStep` with the household channels (V06 §2.1, §3.8.1) and the re-reasoning of an island whose institution left, the bases and strips re-read at each epoch and the lag, the landfall over every covered kind (item 110's raised spans, raised-way piers, retaining walls and deck plots included), the participant `sky.clearance` with `reclearIsland` (V06 §3.2; item 320) and the ledger by hand and on the M4 grow path; the engine-driven schedule joins V06's milestone | T-V5-14, T-V5-15, T-V5-18, T-V5-21 (b)–(d), (g), T-V5-31, T-V5-34 (c), (e) | 1.75–2.5 |
| **total** | | | **17.25–23.25** |

**Dependencies:** P0 needs M4's hooks and the unit runner's first cut from volume 1 (M5); P1 needs item 102's daylight
term with its per-sample mask and the model sampler (§4.5, item 296) and item 103's profile columns for the noxious
exclusion (with a fixture profile set until V11's rows land); P1 → P2 → P3; P2's route distance needs item 308 and its
archetype match item 104's profile resolution (fixtures until then); P2's chain rules need item 104 (b)'s active chains
through the port (V08) and volume 1's working-quarter reading (fixture chains and a stub reading until then); P1's node
term needs V08's deposits row (a fixture digest until then); P6's registration needs V06's `EpochParticipant` (a direct
call from the M4 grow path until then); P6's household channels need V06's `demandTaken` row and the displaced pool's
cause `island` (§4.7's overflow pass inside the conversion until then); P1's crypt test needs V02's basement ladder and
V11's crypt column (the full form and a fixture column until then); P2's web, splits and spread need items 105 and 107
and V11's goods, balance and `split` rows (fixture rows until then), and the rim barrier item 106's `barrier` closure and
V11's `sheerCliff` row; item 110's parts need items 244–246, 290 and 309 (raised parts in ground parts ≥ 1 with
raised-way piers, `RetainingWall`, levelling kept as platform datums, deck plots), V02 §3.15.2's stack envelope and V11's
raised-way height and terrace rows (fixture rows until then), and P6's `sky.clearance` needs V06's `afterGrowth`
participant table and `EpochScope` (a direct call after the M4 grow path's growth until then); P4 and P5 after P2; P6
after P4. **Risks, in order:** the two-surface light pass's frame cost (P3; fallback: half resolution, then the vector
rung for the sky base); the field's power to tell rich towns from poor (P0; fallback: the `wealthLevel` blend); the
unit-run contract across volumes (P0; its requirements tested as a contract, T-V5-9); the strip's cost at METROPOLIS
under the low samples (P1; fallback: V05 §6's coarser step and mask, then the reach cap); the route distance's share of
the pooled S10b (P2; fallback: island classes stand at the land centroid for every ground-side read, post-build
included); placement on awkward sites (P0; F-SKY-PLACE's ladder); watertight lofting of rough tiers in glTF (P5;
fallback: roughness 0 in the mesh only); the gradient's band shares under the smoothing (P0; fallback:
`field.bandInset` 0.1 → 0.2, then the smoothing's width halved on the island, re-measured); the light pass on uncovered
tiles (P3; fallback: the exact per-tile slab cull, V05 §6); item 110's arches and decks under islands against
`casterAllowanceM` (P0; fallback: V05 §3.9 (5)'s measured 99.9th percentile with item 110's rows on). **In §16:** the
M6-sky row (after M6-U) at 17.25–23.25 pw, a staged subject outside the base total (item 476).

**The register at the exits** (X-V12-16; J-V5.80). Every phase that lands a registry table, or a calibratable column or
cell of one, exits with `plat calibrate register --check` (T-V12-20) green over the cells it lands. Two phases do: P1
lands `islands.json` whole (V11 §3.1's registry row 56; V05 §2.4's default rows, `accessSiting.deckGapM` and `lineClearM`
among them, although their readers are built at P2 and P6), and P2 lands the sky rows of `lights.json` (row 51; V05
§3.13) with the `keel` row's `radiusMarginM` cell (item 307). The landing seat writes the entries in the same change with
`plat calibrate register --defaults --milestone V5-P1` (or `V5-P2`; V12 §2.8's volume-qualified ids, X-V12-17) — V12
§3.11's default line, `corpus` at M-CAL — for every calibratable column of those cells that has no entry yet; a
light-table column the base landed already holds one and takes none, since the command never touches an existing entry.
This volume writes no register line of its own. The three ⟨P0⟩ cells (`townSupply`, `carriedSupply`,
`casterAllowanceM`) are set by P0's spikes, which run on a spike branch with a draft `islands.json`, land no cell, and
apply their fallbacks (V05 §3.3, §3.9 (5)) before P1 lands the table; so each lands as an `own` value whose provenance
note names the run that set it ("set by M6-sky's P0 run, V05 §3.3", or "…, V05 §3.9 (5)" for the caster allowance;
never a `fixed:` note), and T-V5-3 and T-V5-10 then hold it as ordinary bars at the phase exits, where a failure fails
the exit. No frame holds an island, so the corpus stage closes each default-line column of `islands.json` `fixed` with
"no admissible frame" (V12 §3.11). Where M6-sky lands after M-CAL's `ReconciliationRecord` is committed (J-V12.21), its
default-line entries fall due at `M-CAL/sky` (V12 §3.11's *The due's corpus run*; J-V12.75). P3's sheet rows are slots
and semantics, whose values are V11's palette rows (item 408); P0, P4, P5 and P6 land no calibratable cell, since their
constants are P1's rows.

## 9 Decisions (each vetoable)

A decision another decision amends or supersedes carries one mark (E-24); the governing row keeps the reason.

| id | decision |
|---|---|
| J-V5.1 | Chose to lay each island in its own local frame and stand it over the ground by one integer translation (`anchor`), over laying it in world coordinates, because a move then changes one attribute instead of warping every vertex, keeps every logged position on the island valid, and keeps every lattice point a lattice point; no rotation, since a turned island would leave the lattice (a turn is a reshape). |
| J-V5.2 | Chose sky part numbers from a never-reused document counter (`nextSkyPart`), the count-law slot a separate field, over "sky parts 1–3", because an island raised after a fall would otherwise reuse a part whose addresses stand as tombstones, against §6.3's never-reused rule. |
| J-V5.3 | Chose to read both supplies on the field's absolute value with value-keyed rows, over a town cut, because the cuts are per-town quantiles: a town mean against its own quantile measures the distribution's shape, never the town's wealth, and a mean never reaches the field's top (RV-pc-3); the rows are calibrated at P0 with a pre-decided fallback. |
| J-V5.4 | Chose to give each slot its purpose by one weighted draw among a prosperity island and the eligible institution rows, the institution taken from the roster's own demand, over adding an institution the roster did not ask for, because the roster decides demand (§4.2 S2) and the population stays whole. |
| J-V5.5 | Chose to settle each island's outline and placement inside S7b (5), before S7b (1) allocates the ground, over placing islands after S7b, because a slot that cannot be placed must return its households before the ground's allocation, never through a second S7b run. |
| J-V5.6 | Chose to floor the altitude at the rim, the root and the clearance over the tallest thing beneath, over clamping the root's depth, because the owner asked for the rock beneath to shape the shadow (J98): a deep root lifts its island rather than being cut short. |
| J-V5.7 | Chose to resize an island by eroding or dilating its rim with the kernel's buffer, over re-drawing the outline from its stream, because a re-draw moves every rim point and re-cuts plots all round, while a buffer changes only a band at the rim and keeps the shape. |
| J-V5.8 | Chose hoists — a winch house and a cage on ropes, as clifftop monasteries were reached — as the default access, rope lines over water, and floating stairs and bridges of light only where the world has magic, over bridges of light everywhere, because the realism tiebreaker tempers the fantasy: the island is the one magic the setting asks for. |
| J-V5.9 | Chose to leave the island's magical lights ungated by the `magic` circumstance, over hiding them when it is `none`, because the island exists by its own setting and its magic is what holds it up; the circumstance still gates the stairs, the bridges of light and the ground's magical lights. |
| J-V5.10 | Chose to make generation and epochs obey the supply law strictly while letting an author's declaration or lock hold an island against it, with the fate `held against its supply` listed, and to keep the rung gate absolute (a declaration below CITY bent to the ground), over refusing such a declaration or letting the rung be overridden, because everything is editable yet the base disables the setting below CITY. |
| J-V5.11 | Chose to make the landfall a conversion of everything it covers — buildings demolished, plots and reservations left vacant under rubble, fields quarried as a surface working (its `source` the landfall, never an underground quarry), walls breached with their towers and gates, bridges ruined, ways buried and routed as tracks until an epoch clears them, the stone credited to the salvage ledger — with no edge added or removed, over cutting a new ruin face, leaving no mark, or covering plots and fields only, because it stays local, undoes exactly, keeps the old plan for regrowth, ties the fall into the ledger's salvage demand, and leaves no intact wall or open street standing in a field of fallen rock. |
| J-V5.12 | Chose to draw everything on existing concerns (`island.place`, `terrain.noise`, `water.river`, `field.chance`, `naming`) with named creation indices, over a new concern, because §6.1's registry already reserves `island.place` for the islands and no draw here reads another concern's order. |
| J-V5.13 | Chose to redraw only empty slots at an epoch, a supplied island staying, over a reading in which a slot may close and send its island down the decline ladder, because an island falls for want of magic, never by chance while it is paid for. |
| J-V5.14 | Chose to floor the cursor sun's height at 1.5 × the display list's top whenever the sky layer is visible and the document holds an island that is not fallen, over letting the sun stand below an island at close zooms or flooring it only while an island is in view, because a sun below a floating island casts its shadow upward and reads as an error, and a floor that switched on as an island panned into view would jolt every shadow on screen mid-pan. |
| J-V5.15 | Chose an underside of nested prism tiers following a profile function (cone, bowl, root, flat), over one slab and over a full mesh in the light pass, because the tiers give the rock's silhouette to the existing slab traversal at a few records per island. |
| J-V5.16 | Chose a second base and surface layer only on tiles an island covers, lit separately and composed by the occlusion mode, over lighting the ghosted ground as the island's surface, because the ground seen through a ghosted island must take its own light and the island's shadow. |
| J-V5.17 | Chose to claim the ground landing yards at SKY, before S8, touching a way spine, over placing landings after the plots are cut, because the yard then fronts a way by construction and no plot is re-cut. |
| J-V5.18 | Chose a rank gradient on a prosperity island — each carried band given its carried share of the island's land, mapped onto its own band's inner range, the richest on the high ground and the rim that looks over the city — with a small noise term, the shade and the brush on top, over one uniform value or a driver raster, because a uniform value houses only one band and S10a would re-home the rest to the ground (the owner's "prosperity is a gradient and a band"), while an island has no market, wall, tannery or low damp ground to drive a raster; an institution island stays uniform. |
| J-V5.19 | Chose to refuse the setting where a bound dossier's `site.magic` is `none`, and to keep the setting and the circumstance independent without a dossier, because a floating island would contradict a dossier's magic-less world (item 20 (h)'s coherence) while a standalone map's two toggles are the author's. |
| J-V5.20 | Chose to re-land an island's accesses after a move by closing and opening the landing designation on two ground plots each, over re-deriving the ground under the old and new feet, because a move then touches no ground geometry. |
| J-V5.21 | Chose `delete` of an island to relocate its households to the ground without a ruin, the ruinous path being `fallIsland`, over one behaviour for both, because an author removing an island and a history bringing one down are different acts. |
| J-V5.22 | Chose to release a waning island's households in reverse ordinal order into each epoch's ground demand, over moving them all at the wane, because §4.11 empties a declining town by its suffix with a lag, and a wane is a decline. |
| J-V5.23 | Chose the conjured river's width by the ground's width law on a conjured share of the ground river's flow, over a fixed width, because the owner asked for a river that echoes the ground's, and the law keeps the echo proportional. |
| J-V5.24 | Chose the prison row's requirement band to be its paymaster's (`prosperous`), over its inmates', because the owner names a prison island as possible and the town's rulers keep it aloft. |
| J-V5.25 | Chose to hold the islands setting off under the `MFCG` and `FTG` presets, because no reference has islands and the parity presets switch every extension off (item 23). |
| J-V5.26 | Chose an unbuilt rim strip inside the rim, planted as a rim walk with a row of trees, over plots to the edge — the Neighbourhood look, whose blocks are clipped by the patch's ragged edge (`research/findings/vg-ng-devlogs.md` §B2) — because no house stands on a cliff edge (the realism tiebreaker), the strip keeps the rim legible at every band, and the trees on the rim keep the floating patch's look `docs/IMPROVEMENTS.md` S1 asks for. |
| J-V5.27 | Chose to let an island edit leave the ground's field and its strips at their basis until the next shade evaluation — the fate listed, Update shade now offered for an immediate scoped change, the basis persisted so the lag survives a save (J-V5.47) — over re-evaluating the field at every island edit and re-deriving the blocks past τ as the terrain brush does, because the owner asked that shade move the town over time by the normal lag (item 102 (e)), and a drag of an island would otherwise re-cut plots under two strips far from the island for one gesture. |
| J-V5.28 | Chose to take volume 1's partition and district count for an island's districts and drop this volume's own count and seeds, over keeping both, because V01 §3.10.3 lays them by the bent cut (J-V1.17) and two counts for one island would be two sources of one fact; the seven inputs this volume owns are V01 §3.10.3's steps (V05 §3.12). |
| J-V5.29 | Chose to fix the ground reference and the altitude at SKY from the casters already placed, the tower rows of the allocated classes and a caster allowance, over reading the built casters at SKY-F, because field pass 2 must read the island's shade before any plot is cut and the altitude must not move after that read; the rare taller caster raises it at SKY-F with the strip's basis kept, a share measured at P0 with a pre-decided fallback. |
| J-V5.30 | Chose the model's strip as a derived record over the tiers without roughness, carrying no edit kind, over the view's rough tiers or an editable strip, because the roughness is view data keyed by the render key (§6.2), which the model must never read, and a strip is a consequence of its island — edited through the island, item 102's weight and the brush; at the field's 32 m cell the roughness is below one cell. |
| J-V5.31 | Chose a fourth island institution row, the arcane `tower`, admitted only where the world has magic and taking a custom kind of the `exotic-tower` archetype, and the archetype column on the palace and cathedral rows, over leaving custom institutions off the islands, because item 104 asks that custom content land sensibly with no hand-written rules and a tower "on its own ground, apart" is the owner's unique institution in its plainest fantasy form; it arises only when the roster or the dossier demands one. |
| J-V5.32 | Chose to leave on the ground, by the editable table `IslandRule.carry`, every trade whose profile emits smell, smoke or water pollution at the top step, the heavy processors and wholesale and storage of item 107 (a), every class with a hard need for running water, a river bank, the harbour, a gate or a quay, and an active chain's working nodes, over excluding the top-step emitters only, because an island has no downwind, downstream or extramural ground, no quay or gate, and no water that satisfies a need (its conjured river is magic's own), and the owner's rule that the tannery goes "down river" and away from homes cannot be met there. |
| J-V5.33 | Chose to let an island's own terrain cast nothing on its own context, over running the terrain shade on the island's terrain, because that relief is a gentle dome at a quarter of the ground's amplitude (V05 §3.8) whose self-shade stays below a field cell; a higher island's shade on it is real and kept, and at an epoch its own buildings cast on it through V06's mask on its lattice, as item 102 (b) asks of every building. |
| J-V5.34 | Chose to keep the island's own placement score (V05 §3.7) apart from item 103's relation families, over scoring the island's position with them, because the island is placed as one body at S7b (5) before any plot exists, while the families score plots against placed neighbours; its purpose rows are the island-scale reading of the institutions' profiles, aligned by V11. |
| J-V5.35 | Chose to export the strip as a thematic layer only — GeoJSON features, the shade map view's SVG, the statistics — over carrying it in the lit raster, VTT, glTF and CityJSON, because those formats already carry the island's physical shadow and solid, and a model day's shade share is a statistic, not a picture. |
| J-V5.36 | Chose to measure every pull that crosses arenas by the route through the island's admitted accesses — the island's street leg, a transfer allowance, the ride and the ground's street leg, as §4.7's `road` mode runs through a gate — and every nuisance by the straight distance in three dimensions, over one straight distance for all, because goods and people ride the hoist while smoke, smell and noise travel through the air. |
| J-V5.37 | Chose to count an island as k units for coverage rows counted by district or neighbourhood (k its district count by `districtHa`), one unit for walking-radius rows and ⌈H ÷ N⌉ for household rows, over one unit for every row, because the island's districts are real districts and the owner's example is "one apothecary per district", while the ride to the ground passes every walking radius. |
| J-V5.38 | Chose to OR the islands' shade into the daylight term sample by sample, over adding their shares to pass 1's, because a cell in a hill's shade and an island's at the same hour is in shade once — an added share would count it twice and could pass the term's all-day bound. |
| J-V5.39 | Chose to keep an active custom chain's resource and processing nodes on the ground — only its final seller and its consumers going up by the carried share, the island's own institution keeping its links by the route, an author's declaration outranking the rule with a listed fate — over carrying chain nodes by the proportional share alone, because the owner asked that a chain be placed as one connected thing: splitting its working steps across a hoist breaks it at its most visible point, and an island offers no terrain feature, extramural edge or water leg for a chain's upstream steps. |
| J-V5.40 | *Amended by J-VI.13 (ID-DR): the row is DR27.* Chose to give the islands' derivation row a working name and leave its number to the integrator, over taking DR26, because volumes 1, 6 and 8 each proposed a DR26 in parallel; one number for four rows would make the derivation table's references ambiguous. |
| J-V5.41 | Chose to read the dossier's `magical_node` deposit as a flat, positionless addend to `h_town`, acting only where the town already supplies some magic, over a placement pull toward the node or a multiplier, because the node's position — at a ruin's centre where a ruin exists (item 109 (f)), else S12a's decoration site — is volumes 4's and 8's and is fixed after S7b (5) places the islands, reading it would tie the islands to the underground (item 2), a multiplier would vanish exactly where a node matters most (a middling town), and the owner's "no prosperity, no islands" forbids a node lifting a town that supplies nothing. |
| J-V5.42 | *Amended by item 296: §4.5 states the sampler, as this decision wrote it.* Chose to state the model sampler's default (nine suns at the midpoints of nine equal slices of the equinox day at the site latitude; one point per field cell) with V06's per-cell layout of points × suns, over leaving it to item 102's application alone, because the strip and V06's building mask must OR bit for bit and neither can be built on an unstated layout; where item 102's application states either, its values govern and both volumes read them unchanged. |
| J-V5.43 | Chose a vault in the island's own rock — the rim slab, underside tier 0, present under every underside kind — for an island cathedral's crypt, the settlement's largest, over a ground crypt or no crypt, because only that keeps both the owner's crypt rule (item 109 (k) (2), J111: "cathedral also gets crypts but cemetaries get catacombs") and item 2's "no relation with the sewer system or underground"; island churchyards are surface burial grounds only, never catacomb candidates, while island churches still count toward the catacomb count. |
| J-V5.44 | Chose to state the reach cap of 8 × the caster's height as the model sampler's rule for every source — terrain, walls, islands and V06's building mask — over leaving each source its own reach, because the sources are OR-ed into one mask, which must follow one reach law (§8.4's cap); §4.5 now states it (item 296). |
| J-V5.45 | Chose an island district size of its own, `districtHa`, over the town's mean district area, because with the town's mean a full CITY island is always one district and three never occur at METROPOLIS, so the owner's "a collection of neighbourhoods" could not happen; the values are about one Neighbourhood patch, calibratable. The count's plot share is volume 1's `hood.constants.sky.plotShare`, cited and never copied, and the count itself volume 1's `skyDistrictCount(plotLandM2, districtHa)` (V01 §3.16); the fill's stop and the coverage overshoot read the same cell (`plotShare · A`), so an edit of it moves both volumes' counts, the fill and the overshoot together. |
| J-V5.46 | Chose to hand an S3 reservation an institution island leaves to the row's hand-over classes — the cathedral's close to the town's largest parish church (or temple), the palace's site to the town hall or a guild hall, else a park — and to skip the reservation where the creation prefix already sends the institution up, over leaving it empty or re-planning S3, because a reserved site with no owner is a hole no stage fills, the old close as the mother church's and the old palace as the town hall are the historical pattern, and the castle holds its own S3 reservation (so handing the palace's to the castle row would reserve twice). |
| J-V5.47 | Chose to persist, per island, the `shadeBasis` its strips were last computed from — written only by a shade evaluation — over recomputing the strips on load from the live island or storing the strips' bits, because the owner's lag (item 102 (e)) must survive a save and a replay (the base recomputes the fields on load, §2.9), and a basis of ≤ 2.5 KB rebuilds the strips exactly where the bits would cost up to 60 KB. |
| J-V5.48 | Chose island district kinds keyed `sky-island`, `sky-palace`, `sky-temple`, `sky-prison` and `sky-tower`, owned by this volume and adopted by volume 1, and a fabric hint that is a prior (× `fabricPrior` on the hinted template at S7c) and never a forced strategy, over reusing the ground's kinds or forcing the template, because `temple` is already a ground kind (one table, one row per key), and the owner's islands should vary as neighbourhoods do while leaning toward the fitting form. |
| J-V5.49 | Chose to read the rim as a `sheer` natural barrier (closure, no wall), never to wall an island by generation, and to make an author's island wall a barrier-closure enceinte walling only the landing yards with a gate at each attach, over walling the rim or refusing island walls, because item 106 asks walls to use natural barriers and an island is barrier all round, approachable only at its landings. |
| J-V5.50 | Chose to bind consumers to providers across the arenas by the route and to count a cross-arena consumer at the access's foot (or top) for its provider's two-way pull, over binding by the straight distance or counting it at its world position, because goods ride the hoist and arrive at the landing, never at the fields beneath the island. |
| J-V5.51 | Chose to let a split class's shop go up by the carried share while its works stays on the ground, joined by `branchOf` and the route, over keeping the whole class on the ground, because item 105 (h)'s split exists exactly so a noxious works and its retail can stand apart, and a rich island's butcher's stall or taphouse is historically faithful. |
| J-V5.52 | Chose to run item 105 (f)'s order and relaxation on each arena on its own at generation, each reading only the other's proxies (the island's land centroid; the ground's S10a block), over one joint order across the arenas, because the island's unit run and the pooled S10b run concurrently and a joint order would make placements depend on the worker's interleaving. |
| J-V5.53 | Chose to re-reason an island whose institution the dossier removes — the next instance of its row, else a prosperity island, else a wane — at the next epoch, the institution itself leaving at once, over deleting the island or leaving a vacant claim, because the dossier is truth (item 20 (h)) while the island is the map's and changes only by its own law. |
| J-V5.54 | Chose to admit an island site only where its rim meets or lies within an admitted slanted access's run of admissible ground, over placing freely and reporting an unreachable island, because an island over open water beyond a rope line's run has no access at all, which no rung repairs. |
| J-V5.55 | Chose to project every island tier in the `prism` form at the vector rung, over the `drop` form, because a drop offsets a tier by one height only and a root's thin tiers then draw as disjoint beads; `drop` stays only for the vector rung's budget fallback, with tiers subdivided so drops overlap. |
| J-V5.56 | Chose to take the global light's window from the surface layers' own top and to test each slab over its own reach, over one window from a top that counts the island's slab, because an island 150–250 m up would otherwise lengthen every ground ray's window five- to eightfold on every tile, for the same result. |
| J-V5.57 | Chose to let an island institution be only one building or compound — a singular record or a SIZE step — and to send a subsuming greater up alone, its lessers staying separate members, over admitting any record, because a COUNT, GUILD or QUARTER record is many buildings (item 108) and one island cannot carry all of them, while a member taken alone would count twice. |
| J-V5.58 | Chose to give the cathedral row a second tag, the great temple of a non-default religion, over the cathedral alone, because item 23 forbids hard-coded universals and V11 treats the great temple "as cathedral". |
| J-V5.59 | Chose an exact O(1) pre-test per corridor cell (its own ray's track against the solid's bounding box) for the strip's window in rough relief, over a two-pass extremes test, because extremes taken over a smaller window can miss a low cell far from the island that the ray still reaches, while the pre-test is exact and as cheap. |
| J-V5.60 | Chose to stand every access foot and landing yard on part-0 land only — clear of raised-way piers, of raised decks' plans dilated by `accessSiting.deckGapM` and of item 110 (d)'s deck faces, "the nearest way" a walkable part-0 way — and to make the accesses overhead obstacles (`skyAccessObstacles`) that every raised course laid after SKY keeps clear of, over letting a deck span a landing yard or a rope line, because a hoist's cage and a rope line need open air while item 110 (b) lets a deck span anything, and a yard on a mid-span deck or beside an aqueduct is reachable by nobody. |
| J-V5.61 | *Amended by J-VI.4 (d), (e): the strokes are bent, never refused.* Chose that no raised way reaches an island and no raised part stands on one — a T4 `raised` or aqueduct stroke ending on a rim bent into an access or ended at its last ground vertex, one on an island's key bent — and that no `SkyAccess` is a way or carries deck plots, over admitting a raised way into the sky or a second sky part per island, because II.1's sky has "no portals, no roads in or out", sky access is `SkyAccess` only, and item 110 (b)'s decks live in ground parts. |
| J-V5.62 | Chose to keep a removed island as a live record in state `removed` (`convert removeIsland`) that holds its slot closed and counts as filled — for the slot chain and toward an integer `islands.count` — at every re-derivation and every epoch, released only by item 260's lift rule (the removal's undo, or a T5 declaration when no slot is free — the user's re-add serving that key) and never by a count, since an integer `islands.count` counts held slots as filled and a cap increase opens only new keys (J-VI.14); and to hold a deleted generated access's ordinal likewise, the lowest surviving generated ordinal taking `main`; over re-drawing the slot, matching tombstones or reading the log ahead, because the owner's removal "holds through regeneration" (item 110 (b)), V06 holds removed generated content across epochs, the base's collision rule re-mints over a tombstone, and a live record read at every derivation is the base's own pattern (a fallen island's record, a rejection record) — the owner removed that island, not the town's quota of islands. A suppression key on a delete event cannot hold an archived arena and its households for undo, so the two record forms of item 260 stay apart (E-02). |
| J-V5.63 | Chose that the raised-way generator reads the sky only as §4.3 states it (item 290 (5)) — an elevated road's endpoints bound to reservations, never institutions (so a road to a precinct whose cathedral rose stands, its reason reading through the hand-over); ground-arena entities only, by `PlatKey.layer`; the aqueduct's need from the whole S2 population at generation and the ground households at an epoch; ground hydrology only for its source, no aqueduct part on an island — every generated raised part committed before S7b (1) (§4.3's slot), over letting the generator read islands, because at generation the sky fill runs after the generator, a list of `sky-*` kinds would drift from the arena test, and an island's spring pond 60–220 m up is exactly what a naive search for a higher spring would find. |
| J-V5.64 | Chose that a landfall ruins the raised spans and raised-way piers it covers (a span falling with its pier, the crossing closed, an aqueduct's terminal running dry as a fate), steps the retaining walls it covers to `decayed` (item 245's state) — generated and drawn alike, keyed by lineage so a re-derivation keeps them decayed until an epoch's restoration re-derives them (V06 §3.19.4 (6)) — and brings down the deck plots on a covered deck after relocating their households, their buildings demolished and the plots tombstoned with the deck as V06 tombstones a struck deck's, a repaired deck re-offering its faces (V06 §3.19.5 (3)–(4)), over re-deriving generated retaining walls under the rubble or leaving raised parts untouched, because re-derivation would stand an intact wall in a field of fallen rock, and the landfall's own rule is that states change and each change is a listed fate. |
| J-V5.65 | Chose the strip's receiver heights to be the unlevelled ground raster the field reads (S1 with the T2 terrain strokes), item 110 (a)'s levelling kept as platform datums (item 309), the basis's receiver version the hash of those heights, and a ground terrain edit re-reading strip bits over its scope from the unchanged bases, over a stored terrain version on the basis, because a load cannot rebuild from a superseded terrain version while the unlevelled raster is what the field and V06's shade mask already read, and a terrain edit moves the receiver, not the caster whose lag item 102 (e) asks for. |
| J-V5.66 | Chose to write "underside tiers" for the rock beneath an island and "massing tiers" for item 110 (c)'s stacked wings wherever both could be meant, the crypt lying "under the building's lowest massing tier, inside underside tier 0 (the rim slab)" and the surface top reading each point's highest massing tier, over one bare "tier", because a stepped temple on an island puts both in one sentence. |
| J-V5.67 | Chose to record item 110's arrival as one declared shift of both sky goldens with a no-op pin (item 110's rows off: byte-identical), the METROPOLIS golden pinning a raised way under an island, over re-recording the goldens silently, because the owner's default at CITY and METROPOLIS legitimately changes both, and a shift that rides silently hides every later regression behind it. |
| J-V5.68 | Chose to re-check every island's clearance after each epoch's growth, as a second participant `sky.clearance` at `afterGrowth` order 50 returning `reclearIsland` — raising `groundRefCm` and keeping `elevationCm` unless the floor fails, never writing `shadeBasis` — and to let the island yield to the city (no raised part, wall or building is moved or refused for an island), over checking at `afterField`, constraining the raised-way solver by islands, or re-evaluating the strip at the raise, because an epoch's raised parts, new stage and close-ups exist only after growth, a city builds its aqueduct where the water is, and item 102 (e)'s lag keeps the strip's basis to the next evaluation. |
| J-V5.69 | Chose to lay an island's retaining walls — the unit run's levelling and an author's T3 `retaining` or T2 terrace stroke — as `RetainingWall` records on the island's own arena, never an enclosure, never on the rim strip or along the rim (a stroke there bent inward past the rim walk, J-VI.4 (g)), over reading T3 on an island as an enceinte or keeping retaining walls on the ground layer only, because item 110 (a) says a retaining wall "is not an `Enceinte`" and holds the terrain it levels, which on an island is the island's, while the rim strip is never cut. |
| J-V5.70 | Chose to give SKY's ground writes data keys of their own, `reservations.landing` and `allocations.landing`, declared by S8, S10a (with its hook S9b) and S12a and by no earlier stage or hook, and to let S10a take a landing's two staff households from its host district's `modest` demand, over SKY writing `reservations` and `allocations` as S3 and S7b do or SKY running before S7c, because with §4.12's hooks united into S7b's declared I/O a SKY that writes S7b's keys after S7b closes a cycle in §4.1's sort, while a SKY before S7c would split S7b; own keys order SKY after S7b and before its readers with no cycle, and SKY then rewrites no row S7b wrote. |
| J-V5.71 | Chose to compute the strips onto the ground once per shade evaluation, at their first read — volume 1's S9b at S10a's `afterDrivers` hook where it is registered, else field pass 2 — and hold them for every later reader, and at a re-derivation starting after SKY to write the islands' bases at S10a's start, before step (i) and every hook, over computing bases and strips at field pass 2 alone, because S9b's manor sun factor, the hood pins' shade gate and `DistrictContext.shade.islandShare` read the strips before pass 2, and a re-derivation from S10a would otherwise let the manor pick read strips from the old bases while the field folds the new. |
| J-V5.72 | Chose an optional `shadeBasis` — absent on an island raised at an epoch after S6 or declared between evaluations, which casts and receives no strip until the next evaluation — and a load that computes bases only through §7.5's schema chain for a document older than the basis step, never from an absent basis, over writing a basis at the raise or computing an absent one at load, because a basis written at the raise would move the field before the owner's lag lets it (item 102 (e)), and a basis invented at load gives a strip the session never had, breaking T-V5-21 (h). |
| J-V5.73 | Chose to write a covered way's class to V06's `Way.formerClass` in the `fallIsland` batch, keeping a `formerClass` the way already carries, over a landfall field of this volume's own or no record, because V06's landfall clearance restores the class from `formerClass` alone (V06 §3.5.2) — without the write every covered primary would stay a track for ever — and a lane V06 had downgraded should get back the class it had before its decline, not the lowered one. |
| J-V5.74 | Chose to read an epoch's island laws at the fold's rung (`ctx.rung`, V06 §3.1 (3)) over the rung at the epoch's population target, because inside the hand-off band the two differ and item 322 makes the fold's the epoch's rung for every reader, so the islands' gate agrees with the product and rung the rest of the epoch runs with. |
| J-V5.75 | Chose to read a sky pseudo-district in S7b (1)'s district supply term at its island's land centroid's world point (`anchor` + the outline's centroid, fixed by S7b (5)'s placement) over its main landing's foot, because the feet are sited only at SKY, after S7b, while volume 1's χ̃ reads the term at S7c by centroid distance; the centroid is the proxy the ground pool already reads for an island's classes (V05 §3.20 (1)), so both volumes read one point that exists when the term runs. |
| J-V5.76 | Chose to type a landfall's `members` as `DecorationMember` — an `Id` for a plot, land use, reservation, way or retaining wall, and `{ raised, span: [a, b] }` or `{ raised, support }` on item 244's support keys for a raised part — over storing V06's `SpanRef` or keeping raised parts out of the list, because a span and a pier have no `Id` of their own and a `SpanRef` is batch-local and never stored, while the support keys are minted once and never reused, so V06 can remove each raised member in the batch of the op that ends its cover. |
| J-V5.77 | Chose to make a resize and a rim reshape re-lay the rim strip, re-claim the landing yards at their re-seated tops and keep or re-search the institution claim inside the district that holds it, in the same commit — a growing band cut at the extended district boundary ways and re-derived by each receiving district, the rim walk re-planted whole after every rim change by volume 1's island-level `plantRimWalk`, and a re-searched claim's district re-derived by volume 1's claim re-search, which releases the institution from V01 §3.9's fixed inputs for the event (V01 §3.10.3 step 4, (6) (c)) — and to floor a resize's area (or bend a reshape back) where no site in that district would fit, over leaving the strip and the claims where SKY laid them, re-running the unit run, re-searching the claim anywhere on the island, or releasing the institution to the ground, because a strip left behind either widens into dead land (growing) or is cut by the rim (shrinking), a re-search confined to the claim's district keeps every district's kind and volume 1's rule that only a unit run re-partitions an island (J-V1.90), and a floor keeps an institution island's reason without a second re-reasoning path beside V05 §3.15 (1b). |
| J-V5.78 | Chose to store an `own` island's drawn relief class on `terrainEcho.reliefClass`, written by SKY at the draw, over re-drawing it wherever it is read, because volume 1's terrace rule reads it after SKY and a second draw on one stream index would be a second writer of one value; `echo` and `none` carry none and read as `plain` (V01 §3.17.7 (2), J-V1.94). |
| J-V5.79 | Chose to let a covered tower and gate (a `Gate` of any kind) follow its run's `condition` — the `breached` length extended over its footprint's chord along the trace, or that chord alone where its stretch is not covered — over giving `Tower` a `ruined` state, because the base's `Tower` and `Gate` carry no state or lifecycle, item 575 draws a tower by its run, and V06's repair of a ring in use then stands tower, gate and wall together with nothing further to restore. |
| J-V5.80 | Chose to write no register line of this volume's own — every calibratable column P1 and P2 land takes V12 §3.11's default line through `plat calibrate register --defaults` in the landing change, and P1's and P2's exits carry the register check — over a line of `measure` entries due at M6-sky for the three ⟨P0⟩ cells with T-V5-3 and T-V5-10 registered as V12 `BenchBarDef`s, because P0's spikes set those cells and apply their fallbacks before P1 lands the table, so no measurement of a landed cell is left to register and T-V5-3 and T-V5-10 hold the cells as ordinary bars; a whole-bar verdict would open a supply or caster fallback on a clause about another quantity (T-V5-10's ring nesting, T-V5-3's monotonicity); and no corpus frame holds an island, so the default line's corpus pass closes the island columns `fixed` with "no admissible frame", the honest status of a fantasy table. |
| J-V5.81 | Chose to price a resize and a rim reshape at every piece of work V05 §4.2 commits — each re-claimed yard's top at §12.6's post-build placement rate (one `placeAt` per access; a reshape's on the moved stretch's yards only) and one scope at §12.6's scoped-regeneration law over the plots the event re-cuts outside the re-derived districts — over keeping those inside the row's fixed ≤ 5 ms or batching the tops into the island L1 batch, because the base prices a `placeAt` and a local operator at those rates (§12.6), V01 §6's sky row and T-V1-21 leave those pieces to this row, and V06 sums its century from this row by citation (V06 §6.2; J-V6.118). |
| J-V5.82 | Chose that a dossier removal of an island's institution acts at once even on a locked island — the building vacated, the uses closed — while the lock holds the island's reason, claim and state (an institution island with its claim empty, the fate listed, the re-reasoning deferred to the first epoch after the unlock), over letting the lock keep the institution or letting the removal re-reason a locked island, because the dossier outranks a lock (§7.7; item 20 (h)) while a lock is the author's word on the map's own records. |
| J-V5.83 | Chose that a landfall over another island's ground landing re-lands that access in the same event (by V05 §3.10 (4)'s rule, as a move re-lands it), dropping it by F-SKY-ACCESS's last rung only where no admissible foot lies within twice its run, over leaving the access with a buried landing until a re-derivation, because an island whose hoist lands in rubble is reachable by nobody, and the re-landing is local, listed and undone with the fall. |
| J-V5.84 | Chose to bound hand-placed accesses by the rim itself — each top's yard takes its width of the rim and each foot keeps its gap from every other, a stroke beyond a full rim bent into re-landing the nearest access — over a count cap, because a cap would refuse an author's choice the geometry can still hold, while the rim's yards are the physical limit; `skyAccessObstacles` and its solver are priced per entry (V05 §6). |
| J-V5.85 | Chose that item 111 stops at the island's rim — no oasis drawn on an island, no water pull or water term in its gradient, no well-yield weight or arid coverage factor in its unit run, and item 111 (c)'s climate cell multiplying only the ground's `w_sun` — over carrying the desert rules up, because an island's water is magic's own (J-V5.23) and it has no growth field, water table or ground climate of its own; an oasis on the ground still counts as water beneath it (item 111 (a)). |

## 10 Base change requests

Every request of this volume is applied to the base by the file f item named here (the base text carries the item's
number); the request texts and their quoted current texts are kept in the validation records. BCR-V5-23 and BCR-V5-28
asked volume 6, which carries them.

| request | applied by | where it now lives |
|---|---|---|
| BCR-V5-1 — the island record and the access record | item 251 | §2.7 (`SkyIsland`, `SkyAccess` as V05 §2.1–§2.2 declare them), §2.8's registry |
| BCR-V5-2 — the sky arena's key, levels and roles; the part counter | item 203 | §2.2 (`PlatKey`, rule 1's sky levels, rule 7's `rim` and `sky_access` roles), §2.9 `Document.nextSkyPart`, §6.3 |
| BCR-V5-3 — the sky stage in the stage graph | item 282 | §4.1 (the L1 writer order, the SKY transactions row, the unit, `reservations.landing` and `allocations.landing` in *Registration and order*) |
| BCR-V5-4 — the island rule's supplies, rows and strategy | item 546 | II.6 (3)–(7), `IslandRule` and `SkyStrategy`; §4.9's value-keyed rows |
| BCR-V5-5 — S7b (5) and the landing kernel | item 295 | §4.5 S7b (5) and *Fields*' pass 2 |
| BCR-V5-6 — the plot model's sky fields | item 213 | §2.5 (`ContextVector.arena 'sky'`, the positioned `Allocation` rows, `Reservation.kind 'landing'`, `Block.interior 'rim_strip'`), §10.2's district kinds and landing classes |
| BCR-V5-7 — the island laws over time and the landfall | item 320 | §4.11 (`fallIsland`, the island `DeclineOp` members, `IslandEpochStep`) |
| BCR-V5-8 — the sky light rows | item 307 | §4.7 *Light sources* (`rim`, `keel`, `skyAccess`, `radiusMarginM`) |
| BCR-V5-9 — the landfall decoration and the waterfall | item 252 | §2.7 `Decoration` (`fallen_island`, `DecorationMember`), §2.3 `WaterBody.fall` |
| BCR-V5-10 — the edit events and targets | item 356 | §7.1 (`placeSkyAccess`, `quarter`'s `sky`, `key`, the edit-target row, the toolkit's sky parameters, the T4 bend), §7.8's `islands.count` |
| BCR-V5-11 — the sky's failure rows and invariants | item 331 | §5.2's staged rows, §5.3's sky invariants |
| BCR-V5-12 — the dossier's islands row | item 387 | §7.7's DR27 and its coherence row |
| BCR-V5-13 — light, shadow, labels and exports | item 415 | §8.4 (a), (d), (f) and *Shadow casters*, §8.2's access state rows, §9.1, §9.2, §11.1 |
| BCR-V5-14 — budgets, tests, packages, the build plan, streams and anchors | item 476 | §12.4's sky row, §13.2's T15-1, §14's `@plat/sky`, §16's M6-sky row, §6.1, §6.3's access anchor |
| BCR-V5-15 — the islands in the daylight term, and the model sampler | item 296 | §4.5 *Fields* (pass 2's fold, the island-free value, the model sampler), §8.4 *Sun*, §13.2 |
| BCR-V5-16 — siting across arenas and custom chains on islands | item 308 | §4.7 S10b *Between arenas*, §4.5 S7b (1) and (5), §10.2, §13.2 |
| BCR-V5-17 — the magical node in the town supply | item 547 | II.6 (3), `IslandRule.node` |
| BCR-V5-18 — the sky's marks in the style sheets | item 408 | §8.2 (`sky.ground`, the sky slots, the `fallen` and `removed` rows) |
| BCR-V5-19 — reservations an institution island leaves | item 286 | §4.2 S3 (2), (8); §2.5 `Reservation.handedFrom` |
| BCR-V5-20 — a ground landing's attach as an infill destination | item 299 | §4.6 |
| BCR-V5-21 — the island's shade basis on load | item 274 | §2.9 *What the snapshot holds*, §7.5's island-basis step |
| BCR-V5-22 — the global light's window without the slabs | item 416 | §8.4 (c), §8.1 `surfaceLayerTopCm` |
| BCR-V5-23 — the island step's households in volume 6's epoch | V06 (X10) | V06 §2.1 `EpochOps.demandTaken`, §3.8.1's cause `island` |
| BCR-V5-24 — the void face at L0 | item 204 | §2.2 rule 1 |
| BCR-V5-25 — the lifecycle rows of the sky's events | item 375 | §7.4 |
| BCR-V5-26 — the landfall's quarried land | item 253 | §2.7 `LandUse.source` |
| BCR-V5-27 — a retaining wall on a sky island's arena | item 245 | §2.7 `RetainingWall` |
| BCR-V5-28 — the clearance after growth in volume 6's epoch | V06 (IN-V06-3) | V06 §3.2's `afterGrowth` participant table (`sky.clearance`, order 50) |
| BCR-V5-29 — item 110's raised ways and the sky | item 290 | §4.3 (the slot, the ground-only and sky clauses) |
| BCR-V5-30 — levelling as datums, the field's receivers unlevelled | item 309 | §4.7 S10–S11 (`levelledGroundCm`, the platform-datum rule) |

## 11 Owner questions

1. **Product order among the layers: the sky before or after the underground?** **Answered — J122: the underground
   first.** M6-U (V04) is built before M6-sky, in §16's combined order; M6-sky's P0 spike may run beside M5 (V05 §8).

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on 2026-10-02 in the landed base parts of the coherence pass and the volumes' current texts):** every
base section this volume cites — II.1 (5), II.6, §1.1, §2.1–§2.9, §3.4, §3.7, §4.1–§4.11, §5.2, §5.3, §6.1, §6.3, §7.1,
§7.4, §7.5, §7.7, §7.8, §8.1, §8.2, §8.4, §9.1, §9.2, §11.1, §12.4, §12.6, §13.2, §14, §16 — with every request of V05
§10 found applied at its section (the sky records, the landing data keys, `IslandRule`, the sampler, the F-SKY rows,
DR27, the sky marks, `levelledGroundCm`, the raised ways' sky clauses, the precinct hand-over, the shade basis on load);
items 2, 10, 13, 15, 20 (h), 22, 23, 72, 101–111 and file f's items 203–580 that §1.2 names; the owner's words in
`docs/DEFINITION.md` and `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, J98 to J111 included, and the delegated decisions
(`docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`); the sibling volumes this one wires to, at their texts — V01 §2.4, §3.1,
§3.10.3, §3.16, §3.17.7; V02 §2.6, §3.15.2, §3.16; V04 §2.3, §3.5.0a, §3.5.1, §3.10; V06 §2.1, §2.8, §2.12, §2.13, §3.2,
§3.4, §3.5.2, §3.7.5, §3.8.1, §3.19, §6.2; V08 §2.6, §3.5; V09 §4.9, §4.20.8, §4.20.9; V10 §2.13; V11 §3.1, §3.5,
§3.9, §3.24; V12 §3.7.8, §3.9.1, §3.11. **Executed:** the nine model suns at latitude 50° on the equinox, hour angles
−80° to +80° by 20° — altitudes 6.41°, 18.75°, 29.5°, 37.16° and 40.0°, azimuths 97.7° to 262.3°, reaches 8 (capped),
2.95, 1.77, 1.32 and 1.19 — from the standard solar formulas (V05 §3.19 (9)). No reference code, class name, word list or
table was read for or copied into this volume (§17.1); the clean-room scan of `docs/validation/bench/doc_checks.py` runs
without the reference corpus in this checkout, so its result is provisional until the corpus is present.

**PLAUSIBLE until executed:** every mechanism, default row and number this volume adds — the supply rows and the node
bonus, the fill with its noxious and chain-node exclusions, the placement score and its weights, the outline and
underside rows, the terrain echo and the river's share, the access rows and limits, the landing geometry, the light
rows, the dwell spans and rates, the landfall's cover share and stone yield, the strip's cost and its gentle effect (V05
§3.19 (9) is a derivation from the defaults), the sampler's one point per cell being fine enough for T102-2's island
clause, the route's transfer allowance, the chain rule's measured effects, the gradient's band shares within ± 5 % under
the smoothing, `districtHa`'s district counts (T-V5-9's ≥ 90 %), the reachability filter leaving F-SKY-PLACE's rates
intact, the light pass's + 5 % on uncovered tiles, the strip corridor's pre-test cost on mountainous relief, the new
defaults (`districtHa`, `fabricPrior`, `frameMarginM`, the stair's helix, `cryptFloorM`, the rank weights, the band
inset, ε's wavelength, `deckGapM`, `lineClearM`), whether item 110's arches and decks sit near or above
`casterAllowanceM` (V05 §3.9 (5)'s P0 run with item 110 on decides it, with its fallback), the cost of `sky.clearance`,
how often the unit run's levelling bites on an island's gentle relief, the resize floor and the reshape's bend-back
(J-V5.77), and V05 §6's rows with V06 §6.2's century bounds that cite them — until M6-sky's P0 spikes and the phase exits
measure them (V05 §8), with the pre-decided fallbacks of V05 §3.3, §3.9 (5), §3.17 and §6.

## 13 Fix list

No item is open. This volume's own items are in its body (the calibrations are P0's exits, V05 §8); every cross-volume
half is in its destination's text — V01 §3.10.3 (the unit inputs, the claim re-search, `plantRimWalk`, the crossing
sites), §3.16 (`skyDistrictCount`), §3.17.7 (the relief class); V02 §3.15.2 and X20 (the rim-slab crypt vault); V03's
crypt plans; V04 §3.5.1 and §3.10 (no sky catacomb candidate, island churches counted once, a landfall quarry sourcing
nothing, the vaults following their span); V06 §2.1, §2.8, §2.12, §3.2, §3.4 (8), §3.5.2, §3.7.5, §3.19 (`demandTaken`,
the cause `island`, `formerClass`, `sky.clearance` at `afterGrowth` order 50, `EpochScope.raised` and `.levelled`, the
building mask on an island's lattice, the landfall candidate and its member forms, the repair of a ring in use, the
raised-way pass's ground-only reads); V09 §4.9 and §4.20 (the delete row, `info.remove.holds`, the bend rows, the
shade view's outlines); V10 §2.13 (`FieldDrivers.sources`, the clerk's `island` rows of V05 §4.5); V11 §3.5.13 and its
crypt and wall rows (the landing classes with `front`, the `sky-*` kinds, `sheerCliff` by `islandRim`, the raised-way
height rows); V12 §3.11 (the default line and *The due's corpus run*); and file f items 252, 260, 282, 309, 383, 387 and
580. The V09 and V10 rows the bend table of V05 §4.2 names and V05 §4.2's offset un-displacement in V09 §4.20.8's hit
stack are written by their editors.

## Integration notes

Each note's ruling is folded into the body at its home.

* **IN-V05-1** (J-VI.4; item 101 R2) — every refusal but the dossier-owned one and a lock is a bend: V05 §4.2's bend
  table, with V05 §3.2 (3)–(4), §3.21 (3) and §3.22 (3)–(4).
* **IN-V05-2** (J-VI.14) — `removed` and `removedAccesses` are this volume's record form of item 260's one suppression
  rule: V05 §2.1, §3.2 (6), §3.10 (1) and J-V5.62 (E-02 keeps the two forms apart).
* **IN-V05-3** (J-VI.13) — the derivation row is DR27: V05 §4.4.
* **IN-V05-4** (J-VI.3) — the rim's closure-arc kind `sheer`: V05 §3.21 (1).
* **IN-V05-5** (J-VI.17) — the fix list's cross-volume items, dispositioned in `docs/volumes/_integrate.md` §2.3: V05 §13.
