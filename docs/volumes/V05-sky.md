# Design volume 5 — Floating islands: the sky layer

> PENDING FABLE REVIEW — written by opus standing in for the Fable seats volumes/V5-sky, its revisions, reconciliation and coherence lanes; covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the subject the base (`docs/ARCHITECTURE.md`, with files
f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in II.6. The
implementer holds the base and this volume and nothing else (§17.1). Every fact the base or another volume states is
cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n`
is a design volume's section, this one included (`V05 §3.2`), and every item of a list carries its volume's prefix
(`V06 §2.1, V06 §3.2` is two sections of volume 6; in `V06 §2.1, §3.2` the second is the base's); `item n` is an
amendment item — items below 200 the owner's, items 200 and above file f's, each the applied text of a volume's base change
request (V05 §10 lists this volume's); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited
and never restated. Decisions are `J-V5.n` (V05 §9), tests `T-V5-n` (V05 §7).

**Two kinds of tier** (J-V5.66). This volume's **underside tiers** are the rock beneath an island — underside tier 0 the
rim slab, underside tiers 1 … n the root (V05 §3.9 (2)); item 110 (c)'s **massing tiers** are a stepped building's
stacked wings (V02 §3.15). Wherever both could be meant the text says which; a bare "tier" in V05 §3.9 (2) and V05 §3.19
(2)–(5) is an underside tier. **Raised-way piers** are item 110 (b)'s supports on ground part 0 (file f item 244); a bare
"pier" is a harbour pier (§4.8), as in volume 4.

## 0 In plain words

Some cities have land floating in the sky above them. This volume says exactly when, how big, what is on it, where it
hangs, how people get up to it, what it looks like from above, and what happens to it when the city grows poor.

**When there are islands.** Only cities and metropolises can have them, and only when the owner's fantasy setting for
islands is switched on (it is off by default, so the realistic map never has one). Even then it is a roll of the dice
weighted by wealth: a poor city gets none, a middling one sometimes one, a rich one none, one, two or three. Magic is the
resource that holds an island up and it must be paid for all the time, so the richer the city, the more likely an
island, the higher it floats and the bigger it may be; and the richer the people living on it, the bigger it may be too.

**What is on an island.** Either a very rich neighbourhood — one to three neighbourhoods, taken from the richest people
of the city, so the city's population stays the same; they have simply moved up — or one unique institution: a palace
looking down over the land, a cathedral, a prison that keeps its prisoners far from everyone, or, where the world has
magic, an arcane tower. The island is laid out like any other part of the city — streets, plots, houses, gardens — by the
same machinery that draws a neighbourhood close-up, but with no road leading in or out. A large rich island is usually
two or three neighbourhoods, a small one a single neighbourhood. Its wealth is not flat: the richest take the high ground
and the rim that looks out over the city, and the island's less wealthy households live on the lower, inner ground. When
the cathedral or the palace moves up, the site the town kept for it beside the main square is not left empty: the town's
largest church takes the old cathedral close, and the old palace site becomes the town hall or the palace gardens. The
island cathedral's burial crypt is cut into the island's own rock beneath it — still the largest crypt in the town — and
the island never has catacombs: those lie only under the cemeteries on the ground.

**What it looks like.** Each island has its own shape (round, D-shaped, a lozenge, a crescent or a long spindle), a rocky
rim, gentle hills that echo the country below, and often a small conjured river that flows the same way as the ground's
and spills off the edge as a waterfall that turns to mist. It floats over water, fields or the outskirts — over the
city's heart only if someone asks — high enough that nothing on the ground touches its rocky underside. From above you
see it drawn over the city with the ground showing faintly through (or solid, or "lifted" to show the rock hanging
beneath), and its shadow moves with the sun under your mouse pointer. At night the rim glows with small magical lights
and a soft glow shines down from beneath it.

**How people get up.** By hoists — winch houses on the rim lowering cages on ropes to a landing yard below, the way some
real clifftop monasteries were reached — or, over water, by an inclined rope line to a tower on the shore. Where the
world has magic, a floating stair of stepping stones or a bridge of light may join them. Every island has at least one
way up, and every landing on the ground is a small yard on a street.

**The shade it throws on the ground.** An island blocks the sun. For a typical day the generator works out how long each
patch of ground lies in an island's shade — as it does for hills and walls — from the island's real bulk: its thick rocky
rim and the root tapering beneath it. Ground long in that shade tends to be a little poorer, so cheaper lodgings and
workshops gather in the island's "under-hang" while the rich keep to the sunny side (in hot dry country, where shade is
valued, the ground's own rule decides). It is a gentle tendency, never a rule: the shade alone never moves ground by more
than one step of wealth. If an island is moved, raised or lowered, the ground beneath catches up at the next period of
the city's history rather than being rebuilt as you drag it. A shade map shows where each island's shade falls, and the
clerk can answer "why is this quarter poor?" with "it lies in the shade of the Palace island for half the day". The map
remembers where each island stood when the ground last took its shade, so saving and reopening never changes the
picture; one button ("Update shade now") brings the ground up to date at once.

**Who trades with whom.** Shops and workshops on an island follow the same siting rules as those on the ground, but a
trip to the ground means a ride down a hoist: so an island's baker sits near the hoist that leads down towards the mill,
and a smith on the ground who serves the island stands near its landing yard. Each of an island's neighbourhoods counts
as a district when the rules ask for "an apothecary in every district", so a three-neighbourhood island gets its own
apothecaries as the ground does. Smelly and dirty trades — tanners, dyers, lime burners — never go up, and neither do the
heavy works (mills, smelters, breweries) or the warehouses, which belong by the gates and quays; but a trade that has a
works and a shop, like a butcher with a slaughterhouse and a stall, may keep its works on the ground and open its shop on
the island. A supply chain — the town's own or one an author invented — keeps its working steps together on the ground,
while the island may hold the shop that sells its last product or the people who buy it, the goods riding the hoist
between them; the ground end of that trade gathers near the hoist's landing yard.

**Walls.** An island needs no wall: its cliffs are its wall. If you draw a wall on an island anyway, only the tops of its
hoists are walled, each with a gate, and the clerk explains that "the drop is the wall" everywhere else.

**Viaducts, raised roads, aqueducts and terraces.** They pass beneath an island and never reach one; the island floats
clear of them, and one you remove stays removed. The landing yards keep clear of the arches, a rope line passes well
above any deck, and a road you draw toward an island's edge becomes a hoist instead: "A road cannot reach a floating
island; a hoist, rope line, stair or bridge of light can." An island on steep ground may be terraced with its own
retaining walls, never along its edge: the rim walk stays level, and a terrace wall drawn there is moved just inside it.
When an island falls, the arches, piers and terrace walls beneath it break with everything else it lands on, and the
shops on a covered bridge fall with the bridge.

**Water.** An island's water is its own — its conjured river or a spring pond. A desert oasis, the pull of a dry town
toward its water and the climate's preference for shade all belong to the ground; they never reach an island, though an
oasis on the ground is water an island may float over.

**Through the year, on feast days, and when you look for something.** An island dresses for the season with the land
below it: its gardens and trees through the growing year, a blaze of autumn colours with fallen leaves on its lanes and
roofs, its pond frozen in a cold winter while the waterfall keeps running, snow on its roofs — the country's climate
deciding, never the island's height. In a festival's weeks pennants fly along its rim and at the tops of its hoists. Find
picks out what you look for on the islands too, with the same glow as on the ground, and a faint pin on the ground marks a
match up on an island. None of it changes the map. Every wait the sky takes part in — generating, opening, exporting,
advancing time — stays inside the ten seconds the owner set as the comfort level, and dragging or editing an island stays
as quick as before.

**Where magic wells up.** If the settlement's own record says it sits on a magical node, the town pays less to keep
islands aloft, so an island is a little more likely, a little bigger and a little higher there.

**When the city declines.** If the city gets poorer, its islands shrink a little and sink lower. If the magic can no
longer be paid for at all, the people leave, the island sinks to its lowest height and stands empty; if nothing changes
for years, it finally comes down, leaving a field of fallen rock on the ground that people quarry for building stone —
the walls, towers, bridges and streets it lands on are broken or buried too, until the town clears them. If wealth
returns in time, an abandoned island is raised again before any new one appears. If the town's own record removes the
cathedral or the palace an island carries, the island finds a new purpose at the town's next period — another
institution of the same kind, or a rich neighbourhood — or, failing both, slowly sinks.

**Editing.** Everything can be changed: switch islands on or off, choose how many, draw one where you want it, drag,
raise, lower, grow or shrink it, reshape its rim, add or move a hoist or a stair, rename it, paint its wealth, density or
greenery with the ground's brushes, edit anything on it like any neighbourhood, or bring it down by hand. Every change
can be undone, and changing an island never disturbs the city below except its hoists' landing yards. An island or a hoist you remove stays removed: the city never raises it
again by itself — the clerk says "removed by you" — unless you undo the removal, or draw an island yourself when every
other place is taken. Asking for more islands opens new places only, never the one you emptied. If you switch islands on
and none appears, the map says why in plain words — the city is not rich enough to keep one aloft — and offers the two
remedies: raise its wealth, or draw one yourself.

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds (to build depth)

1. **Existence and count** — the rung gate, the model setting, the dossier's coherence gate, the three ordered slots and
   the slots a removal holds (V05 §3.2).
2. **The supply law made measurable** — the town supply and the carried supply on absolute field values, answering the
   retrovalidation's RV-pc-3 (the town supply's unreachable top and its knife-edge gate), with the magical node's term
   (V05 §3.3).
3. **Purpose** — a prosperity island or an institution island, per slot, by rule or by assignment, with the institution
   rows (palace, cathedral, prison, arcane tower) and custom institutions by their scene archetype (V05 §2.4, V05 §3.4).
4. **The sky allocation** — S7b (5)'s fill, what goes up with the households (item 103's rulebook, items 105, 107, 108),
   the ground reservation's hand-over, burial and the crypt, and the population kept whole (V05 §3.5).
5. **Shape and placement** — the outline in the island's own local frame, and where each island floats by one scored
   draw with a failure ladder (V05 §3.6, V05 §3.7).
6. **The island arena** — its frame, its L0 (the void, the land, the rim, water), its terrain echoing the ground, its
   conjured river and waterfall (V05 §3.8).
7. **The underside, the ground reference and the altitude** — the rocky root beneath, the caster ceiling, the clearance
   over the ground, fixed at SKY so the island's shade can be read before any plot is cut (V05 §3.9; the owner's J98).
8. **Access** — hoists, rope lines, floating stairs and bridges of light, with a landing yard at each end, and the
   island's rim strip and institution claim (V05 §3.10).
9. **The island's field** — a gradient carrying each band on its share of the land — and **the island's unit inputs** to
   volume 1's unit run, which lays the island's districts (V05 §2.3, V05 §3.11, V05 §3.12).
10. **Lights and names** (V05 §3.13, V05 §3.14).
11. **Over time** — the island laws an epoch applies, the households they move through volume 6's typed channels, an
    island whose institution the dossier removes, the clearance after each epoch's growth, the fall and its landfall over
    every covered kind (V05 §3.15, V05 §3.16).
12. **Failure ladders, determinism and every edge** (V05 §3.17, V05 §3.18, V05 §3.23); **editing, rendering, labels, exports,
    budgets, tests and the build plan** (V05 §4–V05 §8).
13. **The island's shade strip** (item 102 on the island's side, with J98's underside) — folded into the daylight term by
    field pass 2; the sky receivers' shade; its lag behind edits, persisted as the shade basis (V05 §2.1, V05 §2.3a, V05 §3.19).
14. **Siting across the island** (items 103–105, 107, 108) — the route distance between arenas, coverage units, the trades
    an island never carries, split works and shops, the supply web per arena, custom chains, the landing classes' siting
    facts (V05 §2.4, V05 §3.5, V05 §3.20).
15. **The rim as a barrier** (the owner's item 106 where it reaches islands) — the rim a sheer barrier that closes any
    wall circuit, an author's island wall walling only the landing tops (V05 §3.21).
16. **Item 110 on, under and against the island** (the owner's "they go in") — casters under an island, the accesses as
    overhead obstacles, the island's own retaining walls, what the raised-way generator reads of the sky, the landfall over
    them, removals that hold (V05 §3.22).
17. **The dossier** — derivation row DR27 and the coherence rules (V05 §4.4); item 111's water, which leaves an island
    unchanged (V05 §3.8 (4), V05 §3.11).
18. **The island through the year, on feast days and under Find** (items 117, 118, 120) — its seasonal look by the
    ground's climate, its festival pennants on the rim and at the landing tops, Find's matches and ghost pins on the sky
    layer, each a view only (V05 §5.1, V05 §5.6); and the sky's one-time waits inside item 119's comfort level (V05 §6).

### 1.2 The base hooks this volume consumes (cited, never restated)

An index of citations; the values stay at the cited home.

| home | what this volume builds on it |
|---|---|
| II.6 (the island rule, `IslandRule`, `SkyStrategy`; file f items 546, 547) | the rule at depth (V05 §2.4, V05 §3.2–V05 §3.7) |
| II.1 rule (5), V01 §2.4, V01 §3.10.3 | the sky call and the island's unit inputs (V05 §2.3, V05 §3.12) |
| §1.1 `RungProfile.layers.islands` | the rung gate (V05 §3.2 (1)) |
| §2.1, §2.2 (file f items 203, 204) | the island's arena, roles and void face |
| §2.3 `Terrain`, `WaterBody.fall` (file f item 252) | the island's terrain and conjured river (V05 §3.8) |
| §2.5 (file f items 213, 286) | the sky allocation, the landing rows and yards, the context vector, the rim strip |
| §2.7 (file f items 244, 245, 251–253, 575) | the records this volume declares and the ones its landfall writes |
| §2.8 (the registry; the suppression's two record forms, file f item 260), §2.9 (`Document.nextSkyPart`; the shade basis on load, item 274) | identity, the removal's hold and its lift rule, the load path |
| §3.2, §3.4, §3.7 | the lattice, the kernel's buffer and simplification |
| §4.1 (SKY in the stage graph and its data keys, file f item 282), §4.12 | V05 §3.1 |
| §4.2 S0, S1 (1)–(5), S3 (2) and (8) | the `magic` circumstance and relief classes, the outline routine, rivers by descent, crossing sites; the reservations an institution island leaves (item 286) |
| §4.3 (file f item 290) | the raised parts SKY reads; the accesses' obstacles (V05 §2.3b, V05 §3.22) |
| §4.5 *Fields*, S7b (1), (5) (file f items 295, 296) | the supplies, the fill, the strips' fold (V05 §3.3, V05 §3.5, V05 §3.19) |
| §4.6 (the landing attach as an infill destination, file f item 299) | V05 §3.10 (4) |
| §4.7 S10–S11, S10b, *Light sources* (file f items 307–309) | levelled ground, the landing plots, the route, the lights |
| §4.8, §4.9 (the churchyard row; the rim-walk row, file f item 313) | bridges on the island's river; burial; the rim walk |
| §4.11 (file f items 320, 322) | V05 §3.15, V05 §3.16 |
| §5.1–§5.3 (the F-SKY rows and the sky invariants, file f item 331) | V05 §3.17 |
| §6.1, §6.2, §6.3 (`island.place`, the hash, the anchor table; file f item 476) | V05 §3.18, V05 §2.5 |
| §7.1–§7.8 (file f items 356, 375, 383, 387) | V05 §4 |
| §8.1, §8.2, §8.4, §8.8 (file f items 408, 415, 416) | V05 §5.1–V05 §5.3 |
| §9.1, §9.2; §11.1 (file f item 415) | V05 §5.4, V05 §5.5 |
| §11.2 (`FieldDrivers`, `WhyAnswer.closure`) | the daylight term's per-island attribution and the rim's `sheer` closure in the clerk's island answers (V05 §4.5, V05 §3.21 (1)) |
| §12, §13.2, §13.3, §14, §16 (file f items 476, 568) | V05 §6–V05 §8 |
| file g's items as the coherence pass applies them to the base | their island parts (V05 §1.1 items 13–18) |
| §2.9's view state (the year position and its follow flag, the festival display, the view key `find`), §7.7's DR42 and DR43, §8.2's season and festival rows, §11.1, §11.2's gazetteer under knowledge admission, §12.1's comfort level and §12.5 (items 117–120) | the island's seasonal look and its pennants (V05 §5.1), Find on Sky (V05 §5.6), the exports' looks (V05 §5.5), the one-time waits (V05 §6) |
| V01 §2.3, V01 §3.1, V01 §3.2 (5), V01 §3.5.5, V01 §3.8.2, V01 §3.14, V01 §3.16, V01 §3.17.7 (2) | the hooks S7c and S9b, `DistrictContext.shade`, χ̃'s supply term, `hood.constants.sky.plotShare`, `skyDistrictCount`, `plantRimWalk`, `terraceState` |
| V02 §2.6 (`DeckContext`), V02 §3.15.2 (the stack envelope), V02 §3.16 | the caster ceiling, the surface top, deck plots |
| V04 §3.5.0a (9) (`ruin.node`), V04 §3.5.1 (3), V04 §3.10; V04 §2.3 `CatacombRule.count` | the clerk's node line; the catacomb count; the landfall's members read by the access closures |
| V06 §2.1 (`EpochParticipant`, `EpochOps`, `EpochScope`), V06 §2.8, V06 §2.12, V06 §3.2, V06 §3.4, V06 §3.5.2, V06 §3.7.5, V06 §3.8.1, V06 §3.19, V06 §6.8 | the island's two participants, the household channels, the landfall's clearance and repair, an `advance`'s comfort estimate over the islands |
| V08 §2.6 (the deposits row), V08 §3.5 (the site latitude) | the node term; the sampler's latitude |
| V09 §2.7, V09 §4.2 (the working layer), V09 §4.9 (the `bend.*` rows), V09 §4.20.3, V09 §4.20.9, V09 §4.21.9 (the progress view), V09 §5.4, V09 §6.4; V09's Find panel and its `live.find` provider (item 120) | the Shade view, the island's bends, the delete row and suppression card, the progress shown past one second, Find on Sky |
| V10 §2.13 (`WhyProvider`) | the clerk's island answers (V05 §4.5) |
| V11 §3.1 (rows 51 and 56), V11 §3.5 (the institution classes), V11 §3.9 (district kinds), V11 §3.24.0 (the switch table), V11 §3.25.6 – V11 §3.25.8 (the season, festival and quality-spend rows) | the tables this volume's rows join; the looks' and the waits' rows it reads |
| V12 §2.8, V12 §2.13, V12 §3.7.6, V12 §3.7.8, V12 §3.9.1, V12 §3.11, V12 §3.15.9, V12 §3.15.10 | the register, the pins and their registrations, the M6-sky sitting, the wait timer, Find's measurements |

### 1.3 Out of scope, and whose it is

* **Laying the island's districts, blocks, plots and buildings** — volume 1's unit run (V01 §3.10.3). This volume hands
  it the island's unit inputs (V05 §2.3) and reads back the districts it made.
* **Scheduling epochs** — volume 6. This volume states the island laws an epoch applies (V05 §3.15) and the conversions
  they emit; the engine decides when an epoch runs.
* **Screens, panels and gestures** — volume 9; this volume fixes the tools' parameters and the events they emit (V05 §4).
  **The clerk's prompts** — volume 10; this volume fixes what the clerk reads and proposes about islands (V05 §4.5).
  **Word lists and grammar rows** for island names — volume 11; this volume fixes the naming features they read (V05
  §3.14). **Calibration runs** — volume 12; every calibratable constant here names its default, its measurement and its
  fallback.
* **The underground** — volume 4. The owner ruled that islands have no relation to it (item 2); nothing here reads or
  writes an underground part. Burial on an island (V05 §3.5) and the rim-slab crypt (V05 §3.10 (5)) are the two
  consequences of item 109 (k) (J111) this volume states; the landfall's quarried rubble sources no underground quarry
  (V05 §3.16).
* **The daylight term itself** — its weight, the model sampler, the climate cell, the terrain and wall shade of pass 1,
  the sunlit-side preference and the §13 bars are the base's (§4.5 *Fields*; items 102, 111 (c)); this volume gives the
  islands' share (V05 §3.19). **Drift over epochs** of shade and siting is volume 6's (item 102 (e)); this volume states
  when an island's strip is re-read. **The shade map view** is volume 9's. **Every class's siting profile, supply edges,
  coverage rows and signature pairs** are volume 11's (item 103's content); this volume states the facts its landing
  classes and carried trades must satisfy (V05 §2.4, V05 §3.20). **Custom chains** — their discovery, activation and
  arrival are volume 8's, a chain's street-scale closeness and any quarter named past item 72's threshold volume 1's, the
  chain placement rules and rows volume 11's; this volume states only what the island changes about a chain (V05 §3.20
  (9)). **The `magical_node` deposit's position** is volume 4's and volume 8's; this volume reads only its state (V05
  §3.3). **The crypt's room plan, stairs and furnishing** are volume 3's and its basement form volume 2's; this volume
  fixes only where an island cathedral's crypt lies (V05 §3.10 (5)).
* **Item 110's own work** — generating, drawing and decaying raised ways, retaining walls, stepped massing and deck
  plots — is the base's (§4.3, §4.7; file f items 244–246, 290, 309), volume 2's (massing and deck buildings), volume 1's
  (terraced wards and the island's levelling in its unit run), volume 4's (the vaults under raised ways, whose state
  follows their span's) and volume 6's (all of it over epochs); this volume states only what an island changes about them
  and what they change about an island (V05 §3.22).
* **Item 111's water** — the oasis, the water pull on growth and prosperity, well placement by yield and the climate cell
  — is the base's (§4.2 S0–S1, S3, §4.5, §4.7 S10b); on an island it changes nothing (V05 §3.8 (4), V05 §3.11).
* **Seasons, festivals and Find themselves** (items 117, 118, 120) — the year position, the season and decoration rows,
  the festival schedule, the Find panel and its overlay — are the base's (§2.9, §7.7's DR42 and DR43, §8.2, §11.2) and
  volumes 9 and 11's; the explanations are volume 10's. This volume states what an island's look takes of them and what
  Find offers and draws on the sky (V05 §5.1, V05 §5.6).

## 1b Wiring table — every new piece, what feeds it and what it feeds

Every state field this volume adds or gives a producer — the island and access records' fields, the shade basis, the
strips, the rim strip and claims, the landing rows, the landfall's writes, the hand-over's reservation fields — is wired
in V05 §2.6, whose create and read columns name its producer and consumers and whose rows name the base hook (the
staged records are declared in §2.7's staged block as V05 §2.1–V05 §2.2 give them, built by this volume). The
table below wires every other piece.

| piece (home) | fed by (producer) | feeds (consumer) | base hook |
|---|---|---|---|
| the gate result `skyGate` (V05 §3.2 (1)) | `recipe.layers.islands`, `RungProfile.layers.islands`, the `magic` circumstance DR27 derives from `site.magic` | S7b (5)'s slot draw; §7.8's control state; the report | II.6 (1)–(2), §7.7 |
| the slot draw (V05 §3.2) | `island.place`, II.6 (4)'s chances, `h_town`, the forced slots, `recipe.params['islands.count']`, the held slots | the reason draw (V05 §3.4), the fill (V05 §3.5) | II.6 (4), §4.5 S7b (5) |
| `S_town` (V05 §3.3) | field pass 1 over built district cells; at an epoch the re-evaluated field's island-free value | `h_town`; `SkyIsland.supply.town`; `IslandEpochStep` | §4.5 *Fields*, II.6 (3) |
| the node term of `h_town` (V05 §3.3) | the digest's `site.deposits` (a `magical_node` `available`, or `discovered` from the next epoch) by V08 §2.6's deposits row; `IslandRule.node.bonus`; for the clerk alone, the report's `ruin.node` line (V04 §3.5.0a (9)) | `h_town`; the clerk's `why`; the CSV | II.6 (3) |
| `S_carried` (V05 §3.3) | the carried households' bands and `FieldBands.cuts`; an institution row's `requirementBand` | `h_carried`; `SkyIsland.supply.carried`; the island field (V05 §3.11) | §4.5 bands, II.6 (3) |
| the rule table `islands.json` (`IslandRule` with `CarryRule`, `IslandInstitution`, `SkyAccessRow`; V05 §2.4) | its defaults; `editTable` (§7.6); M6-sky's P0 run for the three ⟨P0⟩ cells (V05 §8) | every mechanism of V05 §3 that cites a cell; the register (next row) | II.6's `IslandRule`, V11 §3.1 row 56 |
| the calibration register entries of `islands.json`'s calibratable columns and of `lights.json`'s `radiusMarginM` (V05 §8) | the seats landing P1 and P2, by `plat calibrate register --defaults` with their `--milestone` (V12 §3.11's default line; no line of this volume's own, J-V5.80) | `plat calibrate register --check` (T-V12-20) at P1's and P2's exits; V12's register report; the corpus stage, which closes the island columns `fixed` "no admissible frame" | §13.7, §13.9 (V12 §3.11) |
| the institution rows and their `handover` and `archetypes` columns (V05 §2.4) | the table; the roster's demand (S2), `Government.kind`, the dossier's institutions (DR9, DR24), a custom institution's resolved archetype (item 104 (a)) | the reason draw (V05 §3.4); the claim (V05 §3.10 (5)); S10b's placement of a hand-over instance (V05 §3.5); `SkyUnitInput.context` | II.6's `institutions` column; §4.2 S3 (2), (8) |
| `IslandRule.carry` (V05 §2.4) | the table; item 107 (a)'s balance profiles, item 103 (a)'s EMITS and NEEDS, item 105 (h)'s `split` rows, the active chains (item 104 (b), `activeChains[]`) | the sky fill: what never goes up, what goes up by share, what may split (V05 §3.5 (3)) | §4.5 S7b (5) |
| the sky `Allocation` (V05 §3.5) | S7b (5) under the supply law | the unit run's S7b split, S10a and S10b; S7b (1) (the remainder, with the island's coverage units) | §2.5 `Allocation`, §4.5 S7b (1), (5) |
| the island's coverage units (V05 §3.5 (3)) | item 103 (f)'s coverage rows; the island's district count by `districtHa`; its carried households | the fill's carried workplaces; S7b (1)'s coverage step | §4.5 S7b (1), (5) |
| the island arena's L0 — outer ring, void face, land face, `rim` chain, water faces (V05 §3.8) | SKY's island L0 batch | the unit run (its land face), the rim's draw, the resize, exports | §2.2 rule 1 |
| the island's `Terrain` with the echo (V05 §3.8 (3)) | S1's machinery on the island's key, the ground's relief class and river | the island's context vector, the surface layer, glTF, the conjured river, `levelledGroundCm` on the sky key (its raster fallback) | §2.3, §4.2 S1 |
| the conjured river, a `WaterBody` with `fall` (V05 §3.8 (4)) | S1's rivers by descent on the island's key | its crossing sites, built by the unit run (V01 §3.10.3 (4)); the waterfall mark; `dist.water`; exports | §2.3 `WaterBody` |
| `skyUnitInput(doc, island)` → `SkyUnitInput` (V05 §2.3; derived, never stored) | `@plat/sky`, from the committed record, arena, claims and allocation | volume 1's unit runner (V01 §3.10.3) — at generation, and after generation for `raiseIsland` and New random on the island | II.1 (5), II.6's `SkyStrategy`, V01 §2.4 |
| `undersideTiers(island)` (V05 §3.9 (2); view data) | the island's `underside`, rim, anchor and elevation | the slab list (V05 §5.3), the offset view's silhouette, glTF's underside; with `rough: false` over the shade basis, the strip's solid (V05 §3.19 (2)) | §8.4 (a) |
| `islandShadeStrip(doc, island, samples, onto)` and the island's `shadeSky` (V05 §2.3a, V05 §3.11, V05 §3.19) | the caster's and receiver's `shadeBasis`, the unlevelled receiver heights (§4.7 S10–S11, file f item 309), §4.5's model sampler — once per shade evaluation (V05 §3.19 (6)) | the readers of V05 §2.3a's *Where it lives*; T-V5-19 – T-V5-21 | §4.5 *Fields* (v) |
| `skyRoute(doc, from, to)` (V05 §3.20 (1)) | both arenas' class distance rasters, each admitted access's run, `routing.transferM`, the island's land centroid | S10b's relation rows and supply edges across arenas (the pooled S10b and the unit run's); the island context's `dist.market`, `dist.plaza`, `dist.gate`; coverage; the clerk | §4.7 S10b (file f item 308) |
| cross-arena links, splits and orders (V05 §3.20 (9)–(12)) | items 104 (h), 105 and 107 as applied; `skyRoute`; the accesses; `activeChains[]`; for S7b (1)'s term each island's land centroid's world point | S10b's binding, two-way pull, relaxation and split placement on both arenas; S7b (1)'s supply term (read by V01 §3.2 (5)'s χ̃); the clerk; the CSV | §4.7 S10a–S10b, §4.5 S7b (1) |
| the island's `districtHa`, `fabricPrior`, `fabricRingHa` and the `sky-*` district kinds (V05 §2.4) | the table | volume 1's unit runner through `SkyUnitInput.context` | §10.2's district-kind rows (file f item 213) |
| the landing classes `sky_landing` and `sky_landing_top` (V05 §2.4) | this volume's facts; their rows volume 11's | S10b and S12a (the plots), S11 (the landing houses), the reader, exports | §10.2's class table (file f item 213) |
| the landing classes' siting facts (V05 §2.4) | this volume; their rows volume 11's | S10b's neighbours on both arenas; the clerk | §10.2's profile columns (item 103 (a)) |
| the rim as a barrier (V05 §3.21) | the island's `rim` chain; volume 11's `sheer` defensibility row; an author's T3 wall on the island's key | item 106's barrier closure on the island; the clerk's unwalled side; T-V5-27 | §2.7 `Enceinte.closure`, `BarrierKind` `sheer` (J-VI.3) |
| the access admissibility transform (V05 §3.7 (2)) | the 64 m class raster; the raised parts' pier footprints, dilated deck plans and deck faces | S7b (5)'s candidate filter | §4.5 S7b (5) |
| the ground landing destination (V05 §3.10 (4)) | SKY's ground L1 batch where no spine lies within reach | S8's first cut in the face; SKY-F's check | §4.6 (file f item 299) |
| the sky's semantics and the `sky.ground` role (V05 §5.1) | this volume's per-family facts; volume 11's palette rows (row 52) | §8.2's loader and every shipped sheet | §8.2 (file f item 408) |
| the sky's `WhyProvider` (V05 §4.5) | `@plat/sky` | volume 10's `why` on islands, accesses, landfalls and shaded ground | V10 §2.13 |
| the daylight term's per-island attribution, the `sources` of §11.2's `FieldDrivers.terms` (V05 §4.5) | the prosperity field's `drivers()` (§4.5 *Fields*) over the islands' held strips and their sample bits (V05 §3.19) | §11.2's `WhyAnswer.drivers` in volume 10's `why` on shaded ground | §11.2 (`FieldDrivers`); §4.5 *Fields* |
| the sky light rows `rim`, `keel`, `skyAccess` (V05 §3.13) | the light table; `h_carried` | `LightSource` records, §8.4's light pass, night exports | §4.7 *Light sources* (file f item 307) |
| the island's name and `QuarterNode` root (V05 §3.14) | S13a with the island's naming features | `LabelEntity` (quarter), the gazetteer, exports | §9.1, §10.4 |
| the island's districts' character and identity | S12c, which runs after SKY-F | labels, names, the clerk | §4.5 (S12c's coverage) |
| the slab tiers and the sky surface layer (V05 §5.3) | S14 from the island record and `undersideTiers` | §8.4's traversal and light pass | §8.4 (a), (f), §8.8 (file f items 415, 416) |
| `IslandEpochStep` as the participant `sky.islands` (V05 §3.15) | the epoch's field, rung and demand; the dossier's institution records | `ConversionOp`'s island kinds; `EpochOps.demandTaken`; the displaced pool (cause `island`), which the epoch's `siting` step houses | §4.11 (file f item 320); V06 §2.1, V06 §3.2 |
| `sky.clearance` and the op `reclearIsland` (V05 §3.15 (7)) | every caster the epoch committed under an island (V06's `EpochScope.built`, `.raised`, `.levelled`) | the island's `groundRefCm`, `altitudeCm` and, where the floor fails, `elevationCm`; the fate list; never `shadeBasis` | V06 §3.2's `afterGrowth` table; §4.11 `ConversionOp` |
| `fallIsland` and the landfall (V05 §3.16) | the epoch's step 4 or a hand `convert` | the covered set's state changes of V05 §3.16's table and their readers there; the salvage ledger | §4.11 (file f item 320); §2.7 `Decoration`, `LandUse` |
| raised parts, retaining walls, massing tiers and levelled platforms as casters under an island (V05 §3.22 (1)) | item 110's generation and edits (§4.3, §4.7 S10–S11, file f items 244, 290, 309); volume 2's stack envelope (V02 §3.15.2); volume 11's height rows | the caster ceiling at SKY, SKY-F's clearance check, `sky.clearance`, a ground edit's re-read (V05 §4.3) | §4.3, §4.7 S10–S11, §8.4's casters |
| `skyAccessObstacles(doc)` (V05 §2.3b) | the committed `SkyAccess` records, their islands' anchors and rim bases, `accessSiting.lineClearM` | item 110 (b)'s course solver for every raised part laid after SKY (an epoch's raised-way pass, a new stage's S4 in an epoch) and T4 `road`'s `raised` dry run | §4.3 (file f item 290 (5)) |
| the accesses' admissible ground without decks, raised-way piers and rubble (V05 §3.7 (2), V05 §3.10 (3)–(4)) | the committed raised parts' piers and dilated deck plans; item 110 (d)'s deck faces; a live landfall's members | S7b (5)'s transform, SKY's feet and yards, the rope-line clearance, F-SKY-ACCESS, a landfall's re-landing (V05 §3.16) | §4.5 S7b (5) |
| the generator's reads of the sky (V05 §3.22 (5)) | this volume's rule | item 110 (b)'s elevated-road and aqueduct sources | §4.3 (file f item 290 (1), (5)) |
| the strip's receiver heights — the unlevelled ground raster (V05 §3.19 (3)) | S1's `Terrain` raster with the T2 terrain strokes | every strip onto the ground, its `basis`, the load path | §2.3, §4.7 S10–S11 (file f item 309) |
| `levelledGroundCm(doc, key, p)` on the island's key (§4.7, file f item 309) | the island unit run's platform datums; else the island's terrain SKY writes | this volume's surface top, crypt re-test and clearance check (V05 §3.9 (4)–(5), V05 §3.10 (5)); the island bridge build (V01 §3.10.3 (4)) | §4.7 S10–S11 |
| `removedSlots(doc)` (V05 §2.1) | the island records in state `removed` and every `removedAccesses` | V09's `info.remove.holds` card and history row (V09 §4.20.3); the clerk | §2.8 (file f item 260) |
| DR27 (V05 §4.4) | the dossier's population, `wealth.label`, `site.magic`, `site.deposits`, institutions, ladder and district-defining records, `government`, `activeChains[]` | the gate, `S_town` through DR6, the node term, the institution rows, the fill's held shares, the chain rule | §7.7 (file f items 383, 387) |
| the events (V05 §4.2): `placeSkyAccess`; `quarter` with `sky`; `key` on the point-form events; `setField` with `key`; `regenerate` with the scope `shade`; `convert removeIsland`; `reclearIsland`; the bends | the tools T2–T6, T8–T12, the history tool, V09's delete row, the clerk; `sky.clearance` | the fold; §7.4's lifecycle rows (file f item 375) | §7.1 (file f item 356) |
| the F-SKY rows and the sky invariants (V05 §3.17) | every SKY step | §5.4's report; the dry run | §5.2, §5.3 (file f item 331) |
| the island's seasonal look (V05 §5.1 *Seasons on the island*) | §2.9's year position and follow flag (DR42); the document's one climate row as DR42 resolves it; §8.2's season rows with V11 §3.25.6's tables; the island's crowns, faces, water and roofs | S14's sky marks' `season` column (§8.1 item 8) and the tile worker's re-skin of the sky base and surface layer; picture exports; the clerk's seasonal line (V10) | §2.9, §8.2, §12.5 |
| the islands' pennant places — the rim run and the landing tops (V05 §5.1 *Festival pennants*) | the island's rim chain, its landing yards and the waterfall's lip (V05 §3.8, V05 §3.10); §2.9's festival display with DR43's schedule; V11 §3.25.7's `SKY` row and motif rows | `live.festival`'s places `rims` and `landings` (§8.2), so its marks on the sky base; picture exports | §8.2, §2.9, §7.7 |
| Find on Sky — the sky's matches, ghost pins, bubbles and gaps units (V05 §5.6) | V09's `live.find` over §11.2's gazetteer at the view's key and drawn week; the committed island records and their arenas — at a drawn week whose frame is not the head, that frame's (V06 §3.15.2; V05 §5.6 (5)); V01 §5.4 (3)'s `gapUnits` over each island's arena at that week (V05 §5.6 (4)) | the glow, pins and bubbles on the sky layer; the ghost pins of sky matches on Ground and Below; the panel's "on Sky" count and **Go there** (V09) | §2.9, §8.2, §11.2 |
| the budgets and the comfort level (V05 §6) | M6-sky's measurements; §12.1's comfort level | §12's rows; T-V5-18; V06 §6.8's estimate (the resize row's figures) | §12.1, §12.4, §12.6 (file f item 476) |

## 2 Data model

### 2.1 The island record

`SkyIsland`, `UndersideProfile` and `ShadeBasis` are declared in `@plat/model` as below; §2.7's staged block carries
them (file f item 251: the island arena's own ring, no stored position).

```ts
// every length integer cm, every value on the field's [0, 1] scale
interface SkyIsland {
  id: Id                          /* 'sky<part>/island:<token>' (§6.3) */;
  slot: 1 | 2 | 3                 /* the count law's ordered slot it fills (V05 §3.2); a fallen island frees it; a removed one holds it closed until removed.releasedBy is set (V05 §3.2 (6)) */;
  key: PlatKey                    /* { layer: 'sky', part }: part taken from Document.nextSkyPart at creation, never reused */;
  anchor: PointCm                 /* world position of the arena's local origin: an island-arena point p stands over the ground at anchor + p */;
  rim: ChainRef                   /* ('rim', island id): the closed structural L0 chain bounding its land (V05 §3.8) */;
  land: FaceRef                   /* its L0 land face(s) inside the rim */;
  areaHa: number                  /* the target area the rim is sized to — the supply law's A or an edited value; the land face's area within ± 1 % of it */;
  altitudeCm: Cm                  /* the surface datum above groundRefCm — the law's altitude floored by the rim, the root and the clearance (V05 §3.9 (4)), or an edited value */;
  groundRefCm: Cm                 /* above the ground datum: the greatest, under the projected solid, of the ground's terrain plus the caster ceiling (V05 §3.9 (3)); fixed at SKY; raised only by the clearance rule (V05 §3.9 (5)) */;
  // elevationCm is derived at read: groundRefCm + altitudeCm — the surface datum of the island's own terrain and the z base of every sky mark (§8.1, §8.4)
  underside: UndersideProfile     /* the rock beneath, which shapes its shadow (V05 §3.9; J98) */;
  terrain?: Terrain               /* §2.3: its own, key = this island's; datumCm = the ground datum + elevationCm, kept in step (V05 §3.8) */;
  terrainEcho?: { river?: Id /* the ground river it echoes */; relief: 'echo'|'own'|'none';
    reliefClass?: 'plain'|'rolling'|'hilly'|'mountainous' /* §4.2 S0's classes: the class SKY drew for an `own` relief (V05 §3.8 (3)); absent for `echo` and `none` */ };
  river?: Id                      /* its conjured WaterBody on its own arena (V05 §3.8 (4)) */;
  districts: Id[]; allocation: Id /* its S7b (5) sky Allocation */;
  reason: 'prosperity'|'institution'; institution?: Id /* the Institution it carries */;
  placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean };
  occlusion?: 'opaque'|'ghost'|'offset'   /* a per-island override of the sky LayerSpec's (§8.4); absent: the layer's */;
  supply: { town: number; carried: number } /* S_town and S_carried at the last evaluation (V05 §3.3) */;
  field: { prosperity: number /* the island gradient's mean (V05 §3.11); a setAttr makes it a declared target */; density: number; greenery: number };
  shadeBasis?: ShadeBasis         /* persisted: the island as the field's shade last read it; written only by a shade evaluation (V05 §3.19 (6)); absent on an island raised or declared since the last evaluation, which casts no strip and receives none until the next (J-V5.72) */;
  accesses: Id[]                  /* its SkyAccess records, in ordinal order */;
  name?: NameRef;
  state: 'floating'|'waning'|'settled'|'fallen'|'removed' /* 'removed': an author removed it (convert removeIsland, V05 §4.2): nothing drawn, its arena archived */;
  stateSince: { epoch: number; week: number }; dwellUntilWeek?: number /* waning and settled only: the week its dwell ends (V05 §3.15) */;
  removed?: { seq: number /* the removeIsland event */;
    generated: boolean /* its lifecycle cause was a rule (a slot draw, an epoch's raise), not a declaration; read by the clerk's "removed by you" line and removedSlots(doc) */;
    releasedBy?: number /* the seq of the T5 `sky` declaration that re-filled its slot when no slot was free (V05 §3.2 (6)); absent: the slot held closed */ };
  removedAccesses: number[]       /* the ordinals of generated accesses an author deleted, held absent at every re-siting (V05 §3.10 (1)); [] by default */;
  landfall?: Id                   /* fallen only: the ground Decoration its fall laid (V05 §3.16) */;
  declared?: { outline?: true; position?: true; altitude?: true; area?: true; field?: true } /* the paths a declaring event holds (§7.2) */;
  lifecycle: Lifecycle }

interface UndersideProfile {      // the island's rocky root (owner, J98: "an appropriate shadow related to their size, shape and the angle of the global light")
  kind: 'cone'|'bowl'|'root'|'flat' /* the radius ratio ρ(z) at depth fraction z ∈ [0, 1] below the rim's base: cone 1 − z; bowl √(1 − z²); root (1 − z)², a stalactite; flat: no root, the rim slab only */;
  rimThicknessCm: Cm             /* the cliff face at the rim: the rim's base lies this far below elevationCm */;
  depthCm: Cm                    /* the root's depth below the rim's base, to its apex; 0 for flat */;
  apexOffset: VecCm              /* local: where the apex hangs relative to the land face's centroid; (0, 0) for flat */;
  tiers: number                  /* the root's underside tiers below tier 0 (the rim slab); 0 for flat */;
  roughness: number              /* 0–1: the displacement share of each tier's ring (V05 §3.9 (2)) */;
  source: 'rule'|'edit' }         /* 'edit' once a setAttr set any field: then held by resizes, which scale depthCm only by the areas' square-root ratio */

interface ShadeBasis {           // the one sky input a field recomputation reads (§2.9; file f item 274) — a copy, never a vertex (§2.2 rule 5)
  epoch: number /* the document's epoch when it was written */;
  by: 'generation'|'rederive'|'epoch'|'update' /* the evaluation that wrote it; 'update' = Update shade now (V05 §4.2) */;
  anchor: PointCm; elevationCm: Cm; groundRefCm: Cm;
  surfaceTopCm: Cm               /* underside tier 0's top as that evaluation read it (V05 §3.9 (4)) */;
  underside: UndersideProfile    /* a copy */;
  rim: PointCm[]                 /* the rim chain's lattice points in the island's local frame, in chain order from its lowest-(y, x) vertex, ≤ shade.basisVertexCap: a longer chain is reduced by the kernel's simplification at a 1 m tolerance (§3.4), which moves no strip bit at the 32 m cell (T-V5-20) */ }
```

**Local coordinates, one world anchor** (J-V5.1). An island's arena is laid in its own local frame centred on (0, 0)
(V05 §3.8), and the island stands over the ground plan by one integer translation, `anchor`. A move is one attribute
(V05 §4.2); nothing on the island is re-snapped, re-keyed or re-derived by it. Every reader that meets the ground converts
by that translation alone — S14's marks and label candidates, the slab list, exports, placement and the landing points —
and every logged position on the island is local, so a later move never invalidates it. No rotation: an integer
translation keeps every lattice point a lattice point (§3.2), and a turned island is a reshaped one (a `warp` on its key).

**`removedSlots(doc)`** (`@plat/sky`, draw-free, derived, never stored) — `{ island: Id; slot: 1|2|3; name?: NameRef;
seq: number; generated: boolean; accesses: number[] }[]`: every island record in state `removed` whose slot is still held,
and every island's `removedAccesses`, in slot order.

**`Document.nextSkyPart: number`** (§2.9; file f item 203) — the part the next island takes (1 at creation), never
decreasing; an event that creates an island records the part in the island's address, so a replay reads it there. The
slot (1–3) is the count law's; the part is identity; a fallen or undone island's part stays spent (J-V5.2).

### 2.2 The access record

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

**No access is a way** (J-V5.61). A `SkyAccess` is never a way, an arena edge between arenas or a portal, and it carries
no deck plots; a raised way never reaches an island (V05 §3.22 (3)). Its foot stands on ground part-0 land only (V05
§3.10 (4); J-V5.60).

Derived at read, never stored: the run (`hoist` and `stair`: the vertical drop from the rim base to the foot's ground,
`levelledGroundCm` at the foot; `ropeway` and `lightBridge`: the 3-D length from the top to the foot), the slope, and the
foot's ground height. A row's `maxRunM` limits the **horizontal** distance from the top's world point to the foot. A
`stair`'s path is a helix of radius `stair.radiusM` about the vertical through its foot, from the foot's ground to the rim
base, rising `stair.stepM` per step with a landing every `stair.landingM` of rise, its last turn ending at the top; the
marks and the glTF steps are laid along it. The ground landing of a `secret` access carries the access's `knownTo`: its
`sky_landing` use is fronted by item 63's `front` mode (the `sky_landing` row's front column: a warehouse or a stable)
and withheld from every key that does not admit it (§9.2's filter), as the access itself is.

### 2.3 The island's unit inputs (a derived view; never persisted)

```ts
// @plat/sky exports skyUnitInput(doc, island): SkyUnitInput — draw-free, assembled from committed state; its one caller
// is volume 1's unit runner (V01 §3.10.3) serving a NeighbourhoodRequest whose layer is 'sky'
interface SkyUnitInput {
  island: Id; key: PlatKey; land: FaceRef /* L0 */; rimStrip: FaceRef /* L1, never cut, never plotted */;
  claims: Id[]                    /* the institution's Reservation (an institution island) and every landing Reservation — holes the fabric cuts around */;
  landings: { reservation: Id; attach: VertexRef /* ('attach', reservation, 0): the vertex a way must end at */; access: Id; role: SkyAccess['role'] }[];
  river?: Id                      /* its crossing sites are §4.2 S1 (5)'s on the island, qualified and built by the unit run (V01 §3.10.3 (4)) */;
  allocation: Id                  /* the S7b (5) sky Allocation the unit runner splits over its districts */;
  field: { raster: { cellCm: number /* 3 200 */; origin: PointCm /* local */; w: number; h: number; values: Float32Array /* the island's prosperity before the brush strokes, V05 §3.11 */ };
    mean: number; density: number; greenery: number } /* what the unit runner's field step reads — never recomputed from h(S_carried) */;
  context: { reason: SkyIsland['reason']; institutionKind?: string;
    districtKind: string /* 'sky-island' on a prosperity island's faces; the institution row's districtKind on the claim's face (V05 §2.4) */;
    districtHa: number /* IslandRule.districtHa: the land per island district the runner's count reads */;
    fabricHint: FabricStrategyId /* a PRIOR for S7c on every island district, never a forced strategy (J-V5.48) */;
    fabricPrior: number /* IslandRule.fabricPrior */ } }
```

SKY builds, per island, the `NeighbourhoodRequest` of V01 §2.4 — `district` the island's sky pseudo-district, `key` its
arena, `layer: 'sky'`, `boundary` the land face's runs (every rim run a hard `sky` seam, no portal), `laid` empty (so the
mode is `unit`), `strategy` absent (S7c picks it per island district, reading `fabricHint` as a prior) — and calls
`NeighbourhoodStrategy.generate`; the unit runner reads `skyUnitInput(doc, island)` for everything the request does not
carry. Nothing of the view is stored: it is re-assembled from the committed record, arena and allocation whenever the
unit runner runs (V01 §3.10.3 (6)). **The partition is volume 1's** (J-V5.28): the island's district count and its cut
are V01 §3.10.3 (2)'s, `skyDistrictCount(plotLandM2, districtHa)` (V01 §3.16) called with `context.districtHa` in place
of the town's mean district area, its share `hood.constants.sky.plotShare` (V01 §3.14); this volume neither counts
districts nor seeds them (J-V5.45).

### 2.3a The shade strip (derived with the prosperity field; item 102)

```ts
// @plat/sky exports islandShadeStrip(doc, island, samples, onto): IslandShadeStrip — pure and draw-free (V05 §3.19)
interface IslandShadeStrip {
  island: Id                      /* the caster */;
  onto: 'ground' | Id             /* the receiver: the ground's field raster, or a lower island's local 32 m lattice (V05 §3.11) */;
  basis: Hash64                   /* §6.2's hash of the caster's shadeBasis (and, onto an island, the receiver's), the sampler's digest and the receiver terrain's unlevelled heights under the window (V05 §3.19 (3); J-V5.65) — the strip reads nothing of the live island; read by the shade view's pending outline and the clerk (V05 §3.19 (8)) */;
  evaluated: { epoch: number; by: 'generation'|'rederive'|'epoch'|'update' } /* the evaluation that computed it (V05 §3.19 (6)); read by the clerk ("the ground took this shade at …") and the report */;
  window: { i0: number; j0: number; w: number; h: number } /* in the receiver's 32 m cells */;
  bits: number                    /* per cell: the sampler's sample points × its sun positions (§4.5's layout) */;
  mask: Uint8Array                /* w × h cells, row-major, ⌈bits ÷ 8⌉ bytes each; bit (point · suns + sun) set where the ray from that point toward that sun meets this island's solid */;
  cells: number                   /* cells with any bit set; read by the report's per-island shade line, the clerk's one-sample area and the CSV's */ }
```

**Where it lives.** The strips of every live island onto the ground are held with the prosperity field's rasters
(§4.5), beside the daylight term's per-sample mask they are OR-ed into, and hashed exactly as those rasters are (§6.2);
the strips onto an island are held with that island's field values (V05 §3.11). **Its readers:** the field's
composition; the sky receivers' context values; volume 1's S9b manor sun factor, its close-up hood pins' shade gate and
`DistrictContext.shade.islandShare` (V01 §3.5.5, V01 §3.8.2, V01 §2.3) — on an island the same readers through `shadeSky`, with
S7c's `shade` term through `DistrictContext.shade.meanShare` (V01 §2.3; J-V1.87); the clerk's reader; the shade map view
(V09 §5.4); the GeoJSON and CSV exports. Every reader of one evaluation reads the strips held for it (V05 §3.19 (6));
nothing edits one (J-V5.30). **A strip is a pure function of its caster's `shadeBasis`, the receiver (the ground's
committed terrain as the field reads it, unlevelled, or the receiving island's `shadeBasis` and terrain) and the
sampler** — never of the live island — so the load path, a replay and every field recomputation rebuild the same bits
(§2.9); only the shade view's pending outline and the clerk's "has the ground caught up" read the live island (V05 §3.19
(8)). An island without a `shadeBasis` casts no strip and receives none.

### 2.3b The access obstacles (an export for item 110's raised ways)

```ts
// @plat/sky exports skyAccessObstacles(doc): SkyAccessObstacle[] — pure and draw-free, from the committed accesses; world cm above the ground datum
type SkyAccessObstacle =
  | { kind: 'column'; access: Id; at: PointCm /* the foot (a hoist's: its landing yard's centre) */; radiusCm: Cm /* a hoist: the yard's half-diagonal; a stair: stair.radiusM + 1 m */;
      floorCm: Cm /* the foot's ground */; topCm: Cm /* the rim base, elevationCm − rimThicknessCm */ }
  | { kind: 'segment'; access: Id; a: Point3Cm /* the top's world point at the rim base */; b: Point3Cm /* the foot at its ground height */;
      clearCm: Cm /* IslandRule.accessSiting.lineClearM */ };
```

One entry per open or `unserved` access of every island that is not fallen or removed: a `hoist` or `stair` a column (its
cage or its helix rises through open air), a `ropeway` or `lightBridge` a segment. Its two callers (V05 §3.22 (3); file f
item 290 (5)) are item 110 (b)'s course solver, for every raised part laid after SKY, and T4 `road`'s `raised` dry run: a
deck, its parapet and its raised-way piers stay outside every column, and a deck crossing under a segment keeps `clearCm`
below it. The list is rebuilt from committed state on every call; an island carries at most `accessCount.max` generated
and `accessCount.handMax` hand-placed accesses (V05 §2.4, V05 §4.2), so a document holds at most 3 × (`accessCount.max` + `accessCount.handMax`) entries — 27 at the defaults.

### 2.4 The rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

`IslandRule` — one row per rung that admits islands, in `@plat/tables` (`islands.json`, V11 §3.1 row 56, written by this
volume; II.6 cites it):

```ts
interface IslandRule {
  rung: 'CITY'|'METROPOLIS';
  chance: [number, number, number]                    /* the slot chances; their defaults are II.6 (4)'s */;
  townSupply: { v: number; h: number }[]               /* S_town → h_town, piecewise linear on the absolute value (V05 §3.3) */;
  carriedSupply: { v: number; h: number }[]            /* S_carried → h_carried, likewise */;
  areaHaMax: number; minAreaHa: number; altitudeM: [number, number] /* E_min, E_max */; clearanceM: number;
  casterAllowanceM: number                             /* the caster ceiling where no taller caster is known at SKY (V05 §3.9 (3)) */;
  surfaceTopPercentile: number                         /* the island's surface top over its land face (V05 §3.9 (4)) */;
  shade: { ringMaskM: number; stepM: number; basisVertexCap: number } /* the strip's tier-ring masks, its ray step, the basis rim's vertex cap (V05 §3.19, V05 §2.1) */;
  routing: { transferM: number }                       /* the route distance's allowance per access ridden (V05 §3.20 (1)) */;
  underside: { kinds: { kind: UndersideProfile['kind']; weight: number }[]; rimThicknessM: number; depthPerRadius: number; maxDepthM: number; apexOffsetShare: number; tiers: number; roughness: number };
  placement: { prefs: { over: 'water'|'fields'|'outskirts'|'core'; weight: number }[]; gapM: number; frameInsetM: number; nearM: number; latticeM: number; topK: number };
  outline: { templates: { template: 'disc'|'d_shape'|'lozenge'|'crescent'|'spindle'; weight: number }[]; detail: string /* a detail row of §4.2 S1 (2) */ };
  frameMarginM: number                                 /* the island arena's frame margin beyond its grown outline (V05 §3.8 (1)) */;
  terrain: 'none'|'echo'|'own'; echo: { amplitudeShare: number; domeM: number; domePerRadius: number; tiltPerMille: number };
  river: { chance: number; minAreaHa: number; flowShare: number; widthM: [number, number]; widthMinorShare: number; springPondChance: number;
    sourceShare: number /* the source's place on the long axis, from its upstream end */; pondShare: number /* the spring pond's area ÷ A */ };
  institutions: IslandInstitution[]; access: SkyAccessRow[];
  accessCount: { perHa: number; max: number /* generated, a prosperity island: min(max, 1 + ⌊areaHa ÷ perHa⌋) (V05 §3.10 (1)) */; handMax: number /* hand-placed, per island (V05 §4.2) */ };
  accessSiting: { footGapM: number; turnStepCdeg: number; turnMaxCdeg: number; deckGapM: number; lineClearM: number } /* feet apart; F-SKY-ACCESS's direction steps; a foot's and a yard's gap to a raised deck's plan; a slanted access's clearance over a raised deck or pier (V05 §3.10, V05 §3.17, V05 §3.22 (3)) */;
  stair: { radiusM: number; stepM: number; landingM: number } /* the floating stair's helix (V05 §2.2) */;
  landing: { yardWidthM: number; yardDepthM: number; rimStripM: number; wayReachM: number };
  fill: { batchShare: number; householdCapDistricts: number; coverageOvershoot: number } /* V05 §3.5 (2)–(3) */;
  institutionFit: { fitFactor: number; areaCapShare: number; prisonMarginM: number; siteLatticeM: number } /* V05 §3.4 (2), V05 §3.5, V05 §3.10 (5) */;
  cryptFloorM: number                                  /* an island crypt's floor above the rim slab's base (V05 §3.10 (5)) */;
  districtHa: number                                   /* the land per island district volume 1's count reads (V05 §2.3) */;
  fabricPrior: number; fabricRingHa: number            /* S7c's prior on the hinted template; a prosperity island's hint is `ring` from this area, else `bent-cut` (V05 §3.12) */;
  field: { epsilonShare: number; epsilonWavelengthM: number; greeneryBonus: number; rank: { elevation: number; view: number }; bandInset: number } /* V05 §3.11 */;
  carry: CarryRule                                     /* what the sky fill never carries, carries by share, or may split across arenas (V05 §3.5 (3)) */;
  node: { bonus: number }                              /* the magical node's term added to h_town (V05 §3.3) */;
  hysteresis: number; dwellYears: { waning: [number, number]; settled: [number, number] }; growthPerYear: number; altitudeRateMPerYear: number;
  redrawPerYear: number                                /* an empty slot's per-year re-opening rate; its default is II.6 (4)'s */;
  landfall: { coverShare: number; stoneM3PerM2: number }; landingKernel: { weight: number; radiusM: number };
  naming: { lowBelowM: number; highFromM: number }     /* the altitude classes S13a reads (V05 §3.14) */;
  export: { gltfRingPoints: number; mistM: number }    /* V05 §5.5 */ }
interface CarryRule {                                  // item 23: a default, never a law — every list is editable
  never: { balance: string[] /* item 107 (a)'s balance profiles */; emitsTopStep: ('smell'|'smoke'|'waterPollution')[] /* item 103 (a)'s EMITS at the profile scale's top step */;
    chainRoles: ('resource'|'processing')[] /* of an active chain — custom (item 104 (b)) or the dossier's activeChains[] (item 105 (i)) — the island's own institution excepted */;
    hardNeeds: string[] /* a hard NEEDS row naming one of these features */ };
  share: { balance: string[]; splitShop: boolean /* the shop part of an item 105 (h) split class may go up by share, its works staying on the ground */ } }
interface IslandInstitution {
  kind: string /* palace, cathedral, prison, tower … data */; tags: string[] /* the roster class tags it takes, in preference order */; requirementBand: string; areaHa: number;
  staffHouseholds: number; weight: number; requires: { government?: string[]; magic?: ('low'|'high')[] /* the `magic` circumstance the row needs */ };
  districtKind: string /* a `sky-*` district kind */; fabricHint: FabricStrategyId /* S7c's prior (V05 §3.12) */;
  archetypes?: { id: string /* a SettlementForge scene archetype, item 104 (a) (2) */; landmarkOnly: boolean }[] /* a custom institution whose resolved profile carries one counts as an instance of this row (V05 §3.4) */;
  handover: { tags: string[] /* who takes an S3 reservation this row's instance leaves on the ground: the first tag the roster demands on the ground, its largest instance */; else: 'park'|'none' } /* V05 §3.5 */;
  accesses: ('main'|'service'|'guarded')[];
  near?: 'plaza'|'precinct'|'richest' /* the purpose term's target (V05 §3.7 (3) (c)) */; far?: 'plaza'; nearM: number; overWeights?: Partial<Record<'water'|'fields'|'outskirts'|'core', number>> }
interface SkyAccessRow { kind: SkyAccess['kind']; magic: ('none'|'low'|'high')[]; weight: number; maxAltitudeM?: number; maxRunM?: number /* the horizontal top-to-foot distance (V05 §2.2) */; needsLandBelow: boolean; extension: true }
```

**Default rows** — our own values (provenance `own`, `extension`: no reference has islands, II.6 (8)), each calibratable;
the three marked ⟨P0⟩ are set by M6-sky's P0 run before the table lands, with the measurement and fallback of V05 §3.3
and V05 §3.9 (5), and their provenance notes name that run. Every calibratable cell takes its register entry from V12
§3.11's default line (V05 §8; J-V5.80). The slot chances and `redrawPerYear` default to II.6 (4)'s values.

| row | CITY | METROPOLIS | note |
|---|---|---|---|
| `townSupply` ⟨P0⟩ | (0.45, 0) (0.58, 0.5) (0.70, 1) | same | absolute field values |
| `carriedSupply` ⟨P0⟩ | (0.55, 0) (0.85, 1) | same | a rich-band household in a modest town reads ≈ 0.75 |
| `areaHaMax` / `minAreaHa` | 10 / 1.5 | 20 / 1.5 | one ground district at CITY is ≈ 12–16 ha of built land |
| `altitudeM` / `clearanceM` | [60, 160] / 25 | [80, 220] / 25 | a tall spire is ≈ 100–150 m: an island floats "overlooking the land" |
| `underside` | kinds cone 0.30, bowl 0.25, root 0.40, flat 0.05; rim 10 m; depth 0.45 × the equivalent radius, ≤ 110 m; apex offset ≤ 0.25 × radius; 6 tiers; roughness 0.15 | same | J98 (V05 §3.9) |
| `placement.prefs` | water 1.0, fields 0.8, outskirts 0.6, core 0 | same | II.6's default placement |
| `placement` | gap 80 m, frame inset 50 m, near 600 m, lattice 40 m, top 5 | same | |
| `outline.templates` | disc 0.25, d_shape 0.15, lozenge 0.20, crescent 0.10, spindle 0.30; detail `rough` | same | §4.2 S1 (2)'s rows |
| `terrain` / `echo` | `echo`; amplitude 0.25 of the ground's relief class, dome 6 m + 0.02 × radius, tilt 8 ‰ | same | |
| `river` | chance 0.75, ≥ 3 ha, flow share 0.02, width [3 m, 0.08 × the minor axis], spring pond 0.5; source at 0.15 of the long axis from its upstream end; spring pond 0.015 of `A` | same | V05 §3.8 (4) |
| `landing` | yard 12 × 14 m, rim strip 6 m, way reach 60 m | same | |
| dynamics | hysteresis 0.05, dwell waning [5, 15] y, settled [10, 40] y, growth 0.05 of area per year, altitude 4 m per year | same | per year, §4.11 (5) |
| `landfall` | cover share 0.5, stone 3 m³ per m² | same | |
| `landingKernel` | weight 0.05, radius 150 m | same | field pass 2 (V05 §3.10 (6)) |
| `surfaceTopPercentile` | 95 | same | a lone tall eave does not set the rim slab's top |
| `frameMarginM` | 40 m | same | the arena's context margin beyond the grown outline |
| `accessCount` | one per 5 ha, at most 3 generated; at most 6 hand-placed | same | V05 §3.10 (1), V05 §4.2 |
| `accessSiting` | feet ≥ 30 m apart; turns of 30° up to ± 90°; deck gap 4 m; line clearance 8 m | same | a yard's carts and a hoist's swinging cage keep 4 m from an arch's deck; a rope line's sag and swing keep 8 m over a deck and its parapet |
| `stair` | helix radius 6 m, 0.5 m per step, a landing every 20 m of rise | same | a stepped stone stair round a column of air |
| `fill` | batch 1 % of the band's demand (≥ 1 household), cap 3 × `H_d`, coverage overshoot 1.05 | same | V05 §3.5 (2)–(3) |
| `institutionFit` | fit 1.3 × the row's area, island cap 2.5 × the row's area, prison yard margin 20 m, claim site lattice 10 m | same | V05 §3.4 (2), V05 §3.5, V05 §3.10 (5) |
| `cryptFloorM` | 1 m | same | at least a metre of rock under a crypt's floor |
| `districtHa` | 3.5 ha | 4.5 ha | about one Neighbourhood patch of land per island district; a full island is two or three districts (J-V5.45) |
| `fabricPrior` / `fabricRingHa` | 3 / 6 ha | same | V05 §3.12 |
| `field` | ε share 0.05, wavelength 120 m; greenery bonus + 0.10; rank 0.6 × elevation + 0.4 × view; band inset 0.1 of each band's width | same | V05 §3.11 (J-V5.18) |
| `carry` | never: balance `heavy-processor`, `wholesale-storage`; smell, smoke and water pollution at the top step; chain `resource` and `processing` nodes; hard needs `running_water`, `river_bank`, `harbour`, `gate`, `quay` · by share: balance `everyday`, `specialist`; split shops on | same | items 103 (a), 105 (h), 107 (a) (V05 §3.5 (3)) |
| `shade` | ring masks 4 m, ray step 8 m, basis cap 256 vertices | same | a quarter of the field cell's half-width (V05 §3.19) |
| `routing` | transfer 100 m | same | the wait and the loading at a landing, in metres of walking (V05 §3.20) |
| `node` | bonus 0.25 | same | a quarter of the supply's range: a middling town on a node supplies like a rich one without it (V05 §3.3) |
| `casterAllowanceM` ⟨P0⟩ | 30 m | 40 m | a five-storey house with its roof ≈ 22 m, a tall tree's crown ≤ 30 m; the measurement and fallback are V05 §3.9 (5)'s |
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
(volume 11's `great_temple`, "as cathedral"), so a non-default religion's seat floats as the cathedral does (J-V5.58). A
prison's band is its paymaster's: the town's rulers keep it aloft (J-V5.24). A hand-over tag is taken by the **largest**
instance of that class the roster demands on the ground — the greatest planned plot area at its band (§4.2 S2), ties by
roster ordinal — so the cathedral's close passes to the town's greatest parish church, which becomes the mother church
in the old close (J-V5.43, J-V5.46). No default row uses `near: 'richest'`; an edited row that does scores as V05 §3.7
(3) (c) states.

| access row | magic | weight | limits | land below |
|---|---|---|---|---|
| `hoist` | none, low, high | 1.0 | altitude ≤ 400 m | yes |
| `ropeway` | none, low, high | 0.8 | horizontal run ≤ 350 m | no (chosen where the ground below the rim is water) |
| `stair` | low, high | 0.3 at `low`, 0.4 at `high` | altitude ≤ 120 m | yes |
| `lightBridge` | high | 0.5 | horizontal run ≤ 600 m | no |

**The landing classes** (facts this volume fixes; their class rows are volume 11's, compiled from these facts in V11
§3.5.13, §10.2's schema): `sky_landing` on
the ground — a yard plot of 150–400 m² fronting a way (or reached by a trail), one building by kind: a two-storey hoist
house under a gantry (6 × 8 m), a rope-line tower (6 × 6 m, 18 m), a stair's foot arch, a light bridge's plinth; staffed
by two `modest` households, allocated to its host district or the hinterland (V05 §3.10 (4)). `sky_landing_top` on the
island — the landing yard's plot on the rim with its winch house and crane arm (8 × 10 m), rope-line tower, stair
terrace or bridge pylon; no households of its own. **District kinds:** `sky-island` for a prosperity island's districts;
`sky-palace`, `sky-temple`, `sky-prison` and `sky-tower` from the institution rows on the claim's face — data rows of
§10.2's district-kind table (file f item 213), keyed apart from the ground's `temple` and every other ground kind; volume
1's unit runner types the island's faces with them (V01 §3.10.3 (2)); each row carries the affinities of its ground
counterpart for S7b's split and S7c (`sky-island` those of the town's richest ground kind), rows volume 11's.

**The landing classes' siting facts** (item 103 (a)'s profile columns; V11 §3.5.13's cells encode them):
`sky_landing` — sited by its access, never by a pull (its allocation row is positioned, V05 §3.10 (4)), so its NEEDS row
is satisfied by construction (a way frontage or a trail); EMITS heavy traffic at the middle of the profile scale and
noise at its lowest non-zero step (the winch, the carts at the yard), so the classes SENSITIVE-TO those keep a little away;
CLIENTELE town-wide; SUPPLY none of its own — it is the island's gate for the route distance (V05 §3.20); ALIGNMENT
neutral, except a `guarded` landing, which takes its prison's law-and-enforcement alignment, so crime keeps its distance
from a prison's hoist; COVERAGE none. `sky_landing_top` — the same facts on the island arena.

### 2.5 Identity

| kind | lineage unit and creation index | address | anchor (§6.3) |
|---|---|---|---|
| `SkyIsland` | the town; its slot at generation; at an epoch the town, the slot and the epoch component (J-A8.61); a declared island its declaring event's `seq` | `sky<part>/island:…` | its slot (base) |
| its `Terrain`, its river, its arena's L0 and L1 pieces | the island's SKY run, by §6.3's canonical order | `sky<part>/…` | the base rows of their kinds |
| `SkyAccess` | the island; its ordinal in siting order (V05 §3.10); a hand-placed one its event's `seq` | `sky<part>/skyaccess:…` | (its island's address, its role, its ordinal); same island (§6.3's anchor table, file f item 476) |
| landing `Reservation` (island side) | the island; the access's ordinal | `sky<part>/reservation:…` | its access's address |
| ground landing plot | an ordinary ground plot (its block); its use `sky_landing` names the access | ground | the plot's base anchor |
| landfall `Decoration` | the fallen island (its address) | ground | its island's address |

The unit run's districts, blocks, plots and buildings on the island are ordinary entities of the island's arena under
§6.3's rules, their lineage continuing the island's (V01 §3.10.3).

### 2.6 The lifecycle of every state field this volume adds or gives a producer

Every `SkyIsland` and `SkyAccess` field plugs into §2.7's staged block (file f item 251) and §2.8's registry; every other
row names its base hook in its first cell. The create column is the field's producer, the read column its consumers
(V05 §1b wires every other piece).

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `slot` | S7b (5)'s slot draw; a declaration takes the lowest free slot, or the lowest held slot when none is free (V05 §3.2 (6)) | the epoch redraw, `raiseIsland`, the anchor match | model digest | kept by succession (slot anchor); a slot a `removed` record holds is never drawn or filled at any re-derivation or epoch | restored from the undo record | — (new) |
| `key` / `Document.nextSkyPart` (§2.9) | island creation takes `nextSkyPart` and bumps it | every island reader | model digest; the counter in the document | a successor keeps its predecessor's key (§6.3) | the counter never decreases (spent) | older documents: `nextSkyPart` = 1 + the highest sky part present, 1 if none |
| `anchor` | placement (V05 §3.7) or a declaration | S14, slabs, exports, landings, the reader | model digest | kept by a scoped regeneration; recomputed only by Re-derive from S7b | inverse `setAttr` | a record with the base's world `outline` gets as anchor the outline's area centroid rounded to the lattice, and its polygon less the anchor as the rim (below) |
| `rim`, `land` | SKY's L0 batch | the unit run, the draw, the resize | geometry (the arena) | re-derived by New random on the island; kept by regenerate-keep | the batch's undo record | the base's `outline: Polygon` becomes the rim chain by one `insertChain` in a fresh arena |
| `areaHa` | the supply law or an edit | the resize, the fill, the reader | model digest | the law re-evaluates only at an epoch | inverse | — |
| `altitudeCm`, `groundRefCm` | V05 §3.9 at SKY, before field pass 2; the clearance rule (V05 §3.9 (5)); `setAttr`; a move | `elevationCm`, slabs, marks, access runs | model digest | kept, but for the clearance rule; New random re-checks the floor after re-drawing the underside | inverse | the base's `elevationCm` → `altitudeCm` = `elevationCm` − `groundRefCm` recomputed |
| `underside` | SKY (V05 §3.9 (1)) from the rule row and `island.place` | `undersideTiers` (slabs, the offset view, glTF), the strip's solid through the basis, the altitude floor | model digest | re-scaled by a resize; re-drawn by New random unless `source: 'edit'` | inverse | a base record without it gets the rule's default profile, drawn on its slot's key; a `flat` profile carries `depthCm` 0 and `tiers` 0 |
| `terrain`, `river` | SKY (V05 §3.8) | the unit run's context vector, exports, the island's `levelledGroundCm` fallback | model digest (the terrain raster in the arena's chunk) | New random on the island re-derives; T2 edits on the island key | inverse | — |
| `terrainEcho` (`river`, `relief`, `reliefClass`) | SKY (V05 §3.8 (3)–(4)): for an `own` relief the class drawn on `island.place` (index `relief`) | the island's terrain; volume 1's `terraceState` on the island's districts (V01 §3.17.7 (2)) and so the unit run's levelling (V05 §3.22 (4)); exports | model digest | re-drawn by New random on the island with the terrain; kept by every other edit (a T2 stroke changes heights, never the class) | inverse | an `own` island without `reliefClass` re-draws the class on its `island.place` key (index `relief`) at load, written and reported (J-V5.78) |
| `districts` | SKY-F, from the unit run's `NeighbourhoodResult.districts` (V01 §2.4) | the reader, labels, epochs | model digest | rewritten by SKY-F after every unit run (generation, a raise, New random, a Re-derive); otherwise succession | inverse | — |
| `reason`, `institution` | S7b (5) (V05 §3.4) or an assignment; V05 §3.15 (1b) | the fill, the unit inputs, labels | model digest | Re-derive from S7b | inverse | — |
| `placement` | V05 §3.7 | the reader, the report | model digest | kept by scoped regeneration | inverse | — |
| `occlusion` | absent; `setAttr` | S14, §8.4 | model digest | kept | inverse | — |
| `supply` | every evaluation (V05 §3.3) | the report, epochs, the reader | model digest | recomputed at S7b and each epoch only | restored | — |
| `field` (mean, density, greenery) and the island's gradient (V05 §3.11) | SKY: the gradient from the carried bands' shares, its mean written; `setAttr(field.prosperity)` a declared target (`declared.field`); island brush strokes (`setField` with `key`) | the context vector on the island (through `SkyUnitInput.field`), S10a's band capacity on the island, the clerk | model digest (the three values); the raster never stored — rebuilt on load from the island's terrain, rim, allocation, the cuts and the stroke list, as §2.9 rebuilds the ground's fields | recomputed at an epoch and by a re-derivation from S7b; a declared target and the strokes are held | inverse | older records: the mean is their uniform value, no strokes |
| `shadeBasis` (§2.9, file f item 274) | every shade evaluation (V05 §3.19 (6)), from the island as it then stands; absent on an island raised or declared since the last evaluation | every strip (onto the ground and onto islands) on generation, load, replay and every field recomputation; the strip's `basis`; the clerk | model digest (≤ 2.5 KB per island; nothing when absent) | rewritten only at those evaluations; kept by every island edit, every scoped regeneration of an island and the clearance rule (item 102 (e); J-V5.27) | restored by the undo record of the event whose evaluation rewrote it (absent again where that event wrote the first) | §7.5's island-basis step (file f item 274): a document older than it gets, once, the basis of every island not fallen or removed, from the island as stored; at or after that version an absent basis is never computed at load (J-V5.72) |
| the strips onto the ground (V05 §2.3a) | once per shade evaluation, at their first read (V05 §3.19 (6)) | the readers of V05 §2.3a | held with the field's rasters, rebuilt on load and replay from the bases and the unlevelled ground heights; never in the log | only at the evaluations and, over its scope, a ground terrain edit (V05 §3.19 (6)) | restored with the field's former state by the recomputing event's undo | tables that predate item 102 read `w_sun` = 0 (item 102 (g)'s no-op pin) |
| the strips onto an island; the island's `shadeSky` (V05 §3.11) | SKY's last step after every island's own steps; a re-derivation starting after SKY at S10a's start; each epoch; Update shade now — from the caster's and receiver's bases; at an epoch OR-ed with volume 6's building mask on the island's lattice | that island's context vector; volume 1's sky-arena readers (V01 §2.3, V01 §3.5.5, V01 §3.8.2; J-V1.87) | derived: rebuilt on load with that island's field from the two bases | with the strips onto the ground | as above | — |
| a strip's `bits`, `mask`, `basis` and `evaluated` | with the strip | the field's composition, the clerk, the view, the report | with the strip | a sampler digest that differs from the strip's basis recomputes it whole (§4.5 *Fields* (iv)) | with the strip | — (re-derived on load, never migrated) |
| `accesses` and every `SkyAccess` field | V05 §3.10 or `placeSkyAccess` | marks, lights, exports, the landings, `skyAccessObstacles`, `skyRoute`, the reader | model digest | tops re-seated on a re-derived rim (V05 §4.3), and on a resized or reshaped one with their feet re-landed as a move re-lands them (V05 §4.2) | inverse | — |
| `name` (§2.7's `SkyIsland.name`) | S13a (V05 §3.14) | labels, the gazetteer, exports | model digest with its naming record | §6.3's naming cases | inverse | — |
| the ground landing row `{ cls: 'sky_landing', at, access }` under `allocations.landing` (§2.5, §4.1; file f items 213, 282) | SKY's access step (V05 §3.10 (4)) | S10a, which takes its staff households from the host district's `modest` demand; S10b or the hinterland unit's S12a (the plot); S11 (the landing house); field pass 2's landing kernel | model digest (the allocation) | recomputed with the access | inverse | — |
| the ground landing yard, a `Reservation` of kind `landing` under `reservations.landing` (§2.5, §4.1) | SKY's ground L1 batch (V05 §3.10 (4)); `placeSkyAccess`; a move's re-landing | S8 (a hole; its attach a destination, §4.6), S10a with S9b, S12a (V01 §3.1's read-set) | geometry (the ground arena); the reservation in the model digest | re-claimed with the access | the batch's or the event's undo record | — (new) |
| the rim strip (its `setback` line and `rim_strip` face) and the island's claims — each landing `Reservation` and the institution claim (V05 §3.10 (5)) | SKY's island L1 batch | the unit run through `SkyUnitInput` (V01 §3.10.3 (2)); S10b (the top landing plot, the institution); `plantRimWalk` (V01 §3.10.3 step 4); the rim lights; SKY-F's checks | geometry (the island's arena); the reservations in the model digest | re-laid at a resize and a rim reshape (V05 §4.2), at New random on the island and at a Re-derive from SKY or earlier; a yard claimed by `placeSkyAccess`, released by an access's delete | the undo record of the event (or batch) that re-laid them | — (new; a migrated base island's arena is laid by the same batch) |
| `state`, `stateSince`, `dwellUntilWeek`, `landfall` | `IslandEpochStep` or a hand `convert` (`removeIsland` among them) | epochs, §8.2's rows, the reader | model digest | never by a re-derivation | the conversion's undo record | — |
| `declared` | a declaring event | every re-derivation (held) | model digest | held | inverse | — |
| `removed` (`seq`, `generated`, `releasedBy`) — the suppression's island form (§2.8, file f item 260; E-02) | `convert removeIsland` (V09's delete row (T10), the clerk); `releasedBy` by a T5 `sky` declaration re-filling the slot when none is free (V05 §3.2 (6)) | S7b (5)'s slot chain, V05 §3.15 (5), the report, the clerk, `removedSlots(doc)` | model digest | held: never drawn, filled or re-opened (J-V5.62) | the removal's undo restores the island whole (arena, households, accesses, landing uses); undoing the releasing event clears `releasedBy` | absent: no removal |
| `removedAccesses` (V05 §3.10 (1)) | the fold of a `delete` whose target is a generated `SkyAccess`: its ordinal appended | V05 §3.10's siting at every re-derivation that re-sites accesses; the `main` succession; the clerk; `removedSlots(doc)` | model digest | held: the ordinal skipped and counted, the lowest surviving generated ordinal taking `main` | the delete's undo removes the ordinal and restores the access | absent: `[]` |
| island `RetainingWall`s (§2.7, file f item 245; V05 §3.22 (4)) | volume 1's unit run on the island (item 110 (a)'s levelling at S10, S11); T3 `retaining` and T2 terrace strokes with the island's `key` | the island's marks and labels, the surface top, SKY-F's crypt re-test, exports, the fall | geometry (the island's arena) | generated ones re-derive with the island's terrain and plots (item 110 (a)'s rule); drawn ones held | the batch's or the event's undo record | none before item 110 |
| `Decoration.name`, `.source` (§2.7, file f item 252) | `fallIsland` | labels, the reader | model digest | never | inverse | — |
| `Decoration.members` (`DecorationMember[]`, §2.7, file f item 252; J-V5.76) | `fallIsland` (V05 §3.16 (5)) | §8.2's `fallen` row, volume 6's landfall candidate (V06 §3.5.2), volume 4's access closures (V04 §3.10), the accesses' admissible ground, the clerk, the per-landfall CSV | model digest | shrunk only by volume 6's member-leaving `setAttr` in the batch of the op that ends a member's cover (V06 §3.5.2; J-V6.108), the decoration tombstoned with the last | the `fallIsland` undo removes it; the writing event's undo restores the prior list | an older list of `Id`s reads as it stands; absent = none |
| `Way.formerClass` (volume 6's field; its row V06 §2.12) | this volume's writer: `fallIsland` (V05 §3.16 (4)), a covered way's class before it drops to `track`, only where the way carries none | V06 §2.12's row | V06 §2.12's row | written again when the `fallIsland` event replays | the `fallIsland` undo restores the prior value (absent where the fall wrote the first) | V06 §2.12's row |
| `Enceinte.condition` with its `conditionEpoch`, and `RetainingWall.state` — the stretch-state profiles (§2.2 rule 5; file f items 575, 245; item 114 (b); E-01) | this volume's writer: `fallIsland` (V05 §3.16 (4)), `breached` over each covered wall length with `conditionEpoch` the epoch in force at the fall over every run it changes (`conditionMaterial` kept), and `decayed` over each covered retaining length | the profile rule's readers (§2.2 rule 5; items 575, 245, 114; V06 §2.12; V06 §3.7.7's oldest-patch-first order reads the epoch) | the profile rule's | written again when the `fallIsland` event replays; never by a re-derivation of its own | the `fallIsland` undo restores the prior profiles (and the enceinte's `lifecycle`) | the profile rule's |
| `ContextVector.arena 'sky'` (§2.5, file f item 213) | the unit run's context read | every arena-keyed row | derivation record | recomputed | — | — |
| `Reservation.owner` and `.handedFrom` of an S3 reservation an institution island leaves (§2.5, file f item 286) | S7b (5), when the slot's institution holds the reservation (V05 §3.5) | S10b (the hand-over instance's placement), S12b (a park), the raised-way generator's endpoint reason (V05 §3.22 (5)), the reader, the clerk | model digest | re-made by a re-derivation from S7b; kept by every island edit | the event's undo record | absent `handedFrom`: no hand-over |
| the island cathedral's crypt site (V05 §3.10 (5)) | SKY's claim site search with the crypt test | the cathedral's basement crypt (volumes 2 and 3's `Basement` record, which persists it); the fate list | not stored here: the building's basement record holds the crypt | re-tested with every re-claim | with the claim | — |
| `EpochOps.demandTaken`; the displaced pool's entries with cause `island` (V06 §2.1, V06 §3.8.1) | `IslandEpochStep` (V05 §3.15) | volume 6's `siting` step, the same epoch | inside the epoch event only; their effects persist as the events the step and `siting` commit | recomputed by a replay of the epoch | the epoch event's undo | — |
| the node term (derived, never stored: `h_town`'s addend) | S7b (5) and each epoch's evaluation, from the digest's `site.deposits` | `h_town` | recorded in the evaluation report only | re-read at every evaluation; a deposit change reaches it at the next epoch | — | — |
| the rule cells (`islands.json`, V05 §2.4) | the table defaults | V05 §3 where each is cited | the table (§7.6) | an `editTable` re-derives from the first reader stage (§7.6): S7b for `node`, `carry`, `fill`, `institutionFit`, `districtHa`; SKY for the arena, access and crypt cells, `casterAllowanceM` and `shade` (SKY's last step writes the bases and the strips onto the islands); S10b for `routing`; S7c for `fabricPrior`; S13a for `naming`; none for `export`; a later edit of `accessCount.handMax` removes nothing (V05 §3.23) | `editTable`'s inverse | a table version without a cell reads its default |

## 3 Generation

### 3.1 Where the sky runs in the stage graph

| step | when (§4.1's graph) | worker | writes |
|---|---|---|---|
| **S7b (5)** — gate, slots, reasons, fills, outline and placement per slot (V05 §3.2–V05 §3.7) | inside S7b, before S7b (6) and (1) | generation, eager, town-wide | the sky `Allocation`s; data only (no batch) |
| **SKY** — `SkyStrategy.place` (II.6), per island in slot order: the arena (V05 §3.8), the underside, the ground reference and the altitude (V05 §3.9 (1)–(4)), the access tops and feet, the island's claims, the ground landing claims (V05 §3.10), the field (V05 §3.11); then, once every island has its solid, its **shade evaluation** (V05 §3.19 (6)) | after S7b (its S7c hook included, V01 §3.1) and before S12a, S8 and S10a, by its declared I/O (§4.1: its own ground keys `reservations.landing` and `allocations.landing`; file f item 282) | generation, eager | on each island's arena one L0 batch, then one L1 batch; on the ground one L1 batch of landing claims (`claimSubFace`, as S7b (3)'s claims) |
| **S10a** — the strips onto the ground and their fold into field pass 2 (§4.5 *Fields*) | S10a, after SKY and before the pool | generation, eager, town-wide | the strips, held with the field's rasters (V05 §2.3a) |
| **the unit run** (V01 §3.10.3), one per island | after the ground's S10 (0); concurrent with the pool, on its own overlay, merged in lineage order like the hinterland unit (§4.1) | generation | only its island's arena |
| **SKY-F** — the clearance check (V05 §3.9 (5)), the landing check and repair (V05 §3.12), the sky lights (V05 §3.13) | after the pool's merge, before S12c — which gives the island's districts their character and identity as it gives the ground's (§4.5) — and before S13a | generation, eager | island records; `LightSource` records; at most one L1 repair batch per island |
| S12c, S13a, S14 | as the base | — | the island districts' identity; the island's names and labels (V05 §3.14); its marks (V05 §5) |

SKY's declared I/O is §4.1's (J-V5.70): no stage or hook before SKY declares either landing key — volume 1's S7c reads
`reservations` as S3's and S7b (3)'s keys only (V01 §3.1) — and S8, S10a with its hook S9b, and S12a declare both, so
the sort puts SKY after S7b and before its readers with no cycle (T-V5-32). SKY rewrites no row S7b wrote: a landing's two
staff households belong to its row, and S10a takes them from the host district's `modest` residential demand (§2.5,
file f item 213). The ground's L1 writers and their order are §4.1's. Nothing of the sky runs on the one-click path:
`recipe.layers.islands` is off by default (D-3), and with it off S7b (5) makes no allocation and SKY registers but writes
nothing — the ground model is byte-identical to the realism golden (T13-1).

**Item 110's raised ways in the order** (J-V5.63). Every generated raised part is committed before S7b (1) — a viaduct
inside S4's route solve, an elevated road or an aqueduct at S6's end (§4.3; file f item 290 (1)) — so it exists when S7b
(5) places the islands and when SKY fixes the ground reference, and it never reads an island: the generated raised-way
set is the same with islands on or off (T-V5-30). No generation stage after SKY lays a raised part. A raised part
committed after SKY — by an epoch's raised-way pass, a new stage's S4 in an epoch, or an edit — is read by the clearance
rule (V05 §3.9 (5)) at `sky.clearance` (V05 §3.15 (7)) or at the adding edit's dry run (V05 §4.3), and its course keeps
clear of the accesses through `skyAccessObstacles` (V05 §2.3b).

### 3.2 Existence and count

1. **The gate.** Islands exist only if all hold: `recipe.layers.islands = 'on'`; the rung's `RungProfile.layers.islands`
   admits islands (§1.1; CITY and METROPOLIS); the recipe is not a parity preset's (`MFCG` and `FTG` hold `off`: no
   reference has islands, item 23; J-V5.25); and, for a dossier-bound document, the `magic` circumstance that DR27
   derives from the dossier's `site.magic` is not `none` (V05 §4.4). A failed gate makes no allocation and reports
   `islands: off`, `gated: rung` or `gated: dossier magic`.
2. **The town supply** `S_town` and `h_town` (V05 §3.3).
3. **Forced slots.** Every declared island of the creation prefix (T5 `quarter` with `sky`) and every assignment whose
   criteria carry `sky: true` (V05 §4.2) forces the lowest free slot open, in log order. A fourth is bent at its dry run to
   join the nearest open island as a district on it ("At most three islands float here; this quarter joins {island}";
   J-VI.4 (a)).
4. **The count.** `recipe.params['islands.count']` — `auto` (default), or 0–3 (V05 §4.2's `adjust`). At an integer `n`,
   exactly `n` slots are open — the forced ones counted first, a slot held by a removal counted as one of them ((6)) —
   with no draw; `n` below the forced count is bent up to it at its dry run (J-VI.4 (a)). At `auto`, each slot k above the
   forced ones, in order, opens with probability `chance[k] · h_town` and only if slot k − 1 is open: one uniform on
   `island.place` keyed by the town's lineage with creation index `slot:k` (V05 §3.18).
5. **The report** lists the count, the forced slots and each slot's outcome (V05 §3.4–V05 §3.7), a held slot's outcome being
   `removed by you` ((6)). With the setting on, the gate passed and no island present, it carries one plain sentence for
   the author and the clerk — "Islands are on, but the city is not prosperous enough to keep one aloft" when `h_town` is 0
   or every slot closed `no supply`, "… none rose this time" when the slot draws came up empty — and names both remedies:
   raise the town's wealth (T1 `intend`), or place an island by hand (T5 with `sky`, held against its supply, J-V5.10).
6. **Removed slots — the suppression's island form** (§2.8, file f item 260; E-02; J-V5.62). A slot held by an island
   record in state `removed` whose `removed.releasedBy` is absent (`convert removeIsland`, V05 §4.2 — a generated or a
   declared island alike) is **closed with the outcome `removed by you`**: no draw on its `slot:k` or `reason:k` index, no
   fill, no outline, no placement, no SKY run. It **counts as open and filled** — for the slot chain of (4), so a higher
   slot draws on its own creation index exactly as it did before the removal, and toward an integer `islands.count`, so
   the removal is never replaced by an island in another slot (the owner removed that island, not the town's quota). The
   hold lifts only by §2.8's one lift rule, in its island form: (i) the removal's undo, or (ii) the user's own re-add
   serving that key — a T5 `sky` declaration when no slot is free, for which the lowest held slot counts as free and whose
   event sets `removed.releasedBy`. **A count never releases a hold:** an integer `islands.count` counts every held slot
   as filled and opens only free slots (a cap increase opens only new keys), and `auto` never draws a held slot; an adjust
   whose integer exceeds the slots it can open lists the fate "slot k is held by your removal of <name>; undo the removal
   or draw an island to use it" and opens what it can. The removed island's households were relocated by its removal
   (V05 §4.2), so S7b (1) allocates them to the ground at every re-derivation and the population stays whole (T-V5-29).

### 3.3 The two supplies, on absolute values (answering RV-pc-3)

The cuts are per-town quantiles (§4.5), so a town mean compared with its own quantile measures the distribution's shape,
not the town's wealth, and a mean never reaches the field's top (`docs/retrovalidation/pipeline-content.md` RV-pc-3).
Both supplies are therefore read on the field's **absolute** value, which the dials, `wealthLevel`'s character offset
(§7.7 layer 1) and the epochs' drivers move (J-V5.3):

* **`S_town`** — the mean prosperity value over the settlement's built land: the cells of §4.5's 32 m field raster whose
  centres lie in a district face (the hinterland, underground, undercity and sky pseudo-districts excluded), less the
  cells in water and in reservations of kind `park`, `harbour_basin`, `moat` or `canal`; at S7b the value after field
  pass 1, at an epoch the re-evaluated field's island-free value (§4.5; V05 §3.15 (1)). With no such cell the value is 0.
* **`S_carried`** — the mean, over the households an island carries, of their band's value `v(b)`: the midpoint of the
  band's two cuts on the absolute value (`FieldBands.cuts`), the lowest band's lower cut 0 and the top band's upper cut
  1. An institution island's `S_carried` is `v(requirementBand)` of its row.
* `h_town(S_town)` and `h_carried(S_carried)` interpolate the rule's `townSupply` and `carriedSupply` rows linearly along
  the value, 0 below the first row and 1 above the last. The **supported area** is `A = areaHaMax · h_carried · h_town`
  and the **law's altitude** `E = E_min + (E_max − E_min) · h_town` (II.6 (5)); `E` sets `altitudeCm` above the ground
  reference (V05 §3.9 (4)).
* **The magical node** (J-V5.41). Where the dossier digest's `site.deposits` carries a `magical_node` in state `available`
  — or `discovered`, from the epoch after the one that discovered it — `h_town` is `min(1, the interpolated value +
  node.bonus)`: magic that wells up on the site costs the town less to keep aloft. It is one addend however many such
  deposits the dossier lists; `depleted` and `removed` add nothing. It acts only where the interpolated value is above 0
  — a town too poor to supply magic is not lifted by a node (the owner's "if there is no prosperity, there is no floating
  islands") — and reaches every reader of `h_town` (the slots, `A`, `E`, the epochs). A map without a dossier has no
  deposits and no node term. **Where the node stands is not this volume's:** item 109 (f) puts it at an underground ruin's
  heart where one exists (volume 4's and volume 8's), and the term stays positionless — it reads the deposit's state
  alone, never the underground arena (item 2). The clerk's `why` names "the node beneath the old ruins" from the
  generation report's `ruin.node` line (V04 §3.5.0a (9): the deposit, the ruin system and the ruin's `NameRef`, so a
  renamed ruin reads its new name), never by reading the ruin; with no such line it names the deposit alone.

**Calibration ⟨P0⟩** (V05 §8). On 200 CITY and 100 METROPOLIS seeds at their targets, at `wealthLevel` ∈ {0, 0.25, 0.5,
0.75, 1} with the setting on, record `S_town`'s median `m_w` per level; set `townSupply` to (m_0.25, 0) (m_0.5, 0.5) (m_1,
1). Bars: the median `h_town` at `wealthLevel` 0 ≤ 0.05, at 0.5 within [0.35, 0.65], at 1 ≥ 0.9, all on standalone
intents, so with no node term. **Pre-decided fallback:** if `m_1 − m_0` < 0.10 (the field does not tell a rich town from a
poor one), `S_town` becomes `0.5 · (the field mean) + 0.5 · w`, `w` the intent's `wealthLevel` (with a dossier its derived
value, DR6), the rows are re-fitted by the same rule, and the change is recorded as a declared shift. `carriedSupply` is
checked at the same run: `h_carried(v(rich))` ≥ 0.7 and `h_carried(v(modest))` = 0 at `wealthLevel` 0.5 on ≥ 90 % of
seeds; else its rows are moved so that the midpoint of `v(modest)` and `v(comfortable)` maps to 0 and `v(rich)` to 1,
re-measured once.

### 3.4 Purpose — a prosperity island or an institution island

For each open slot, in slot order:

1. **A forced slot** takes its declaration's kind (an institution kind makes it an institution island; any other kind a
   prosperity island) or its assignment's institution.
2. **Otherwise the candidates are** (J-V5.4): `prosperity`, weight 1.0, where the roster's households of the bands with
   `h_carried(v(b)) > 0` not yet carried by an earlier slot give at least `minAreaHa` of plot land; and each
   `IslandInstitution` row, at its `weight`, where the roster demands at least one eligible instance of a class carrying
   one of its `tags` (the first tag in the row's order that has one, its lowest roster ordinal) — or the dossier carries a
   custom institution whose resolved profile's scene archetype is one of the row's `archetypes` (a `landmarkOnly` entry
   admitting only `landmarkLevel: landmark`; item 104 (a) (2)), the lowest `localUid` first — that no earlier slot carries
   and no creation-prefix `placeAt` holds on the ground, its `requires.government` (when present) holds for the town's
   `Government.kind`, its `requires.magic` (when present) admits the recipe's `magic` circumstance, and `areaHaMax ·
   h_carried(v(requirementBand)) · h_town` ≥ `institutionFit.fitFactor` × the row's `areaHa`. **An eligible instance is
   one building or one compound** (item 108 (a); J-V5.57): a singular record, or a record whose ladder step is SIZE, or a
   roster instance bound to neither — never a COUNT, GUILD or QUARTER record, nor a member `#k` of one. A dossier
   institution counts as a roster instance (DR9, DR24): the island moves where it stands, never whether it exists (§7.7).
   The archetype is read at this draw only: a later revision of a custom kind re-resolves its profile and keeps it on its
   island unless a hard row of the new profile fails there, when item 104 (e)'s least disruption re-sites it on the
   ground; the island keeps its reason and its claim, the vacated building steps down the base's building ladder, and the
   regrowth-first order re-occupies it with the next instance of one of the row's tags or its archetype before any ground
   site (§4.11; V05 §3.15 (4)).
3. **The draw:** one weighted choice on `island.place` (town lineage, index `reason:k`). With no candidate the slot
   closes, reported `no supply` or `nothing to carry`.

### 3.5 The sky allocation (S7b (5) at depth)

**A prosperity slot.**
1. The eligible bands are those with `h_carried(v(b)) > 0`, richest first.
2. Households are taken from the roster's residential demand of the richest eligible band, in batches of
   `fill.batchShare` of that band's demand (at least one household), each batch split over the classes by the band's
   class mix at its centre (item 71; largest remainder); after each batch `S_carried` and `A` are recomputed. **Held
   shares are never taken:** the households a dossier district-defining record's raised share holds on its ground district
   (item 72) — a QUARTER record of item 108 (a) among them — are subtracted from the band's demand before the fill, so the
   island never drains a quarter the dossier names. The fill stops at the first of: the carried plot land — Σ over the
   carried rows of `plotArea(c, b)` × count, S2's plot areas at the band centres — reaching `plotShare · A`, `plotShare`
   volume 1's `hood.constants.sky.plotShare` (V01 §3.14), the one share the island's district count divides by, so an
   edit of it moves the fill and the count together (J-V5.45); the carried households reaching
   `fill.householdCapDistricts` × `H_d`, `H_d` the town's households ÷ its district count after S6; or the band's demand
   exhausted, when the next band is taken only if the batch would leave the carried plot land within the recomputed
   `plotShare · A`. `A` falls as poorer households join, so the fill converges (II.6 (5)); it takes at most 100 batches.
3. **What goes up with them — the carried workplaces, read through `IslandRule.carry`** (J-V5.32, J-V5.39, J-V5.51). For
   each workplace or institution class demanded at the carried bands, the carried households' share of their band's
   households × its count, by largest remainder, except:
   (a) **never carried** — the `IslandInstitution` tags (their own slots); the town-unique classes (§10.2's `unique`
   column: the principal market, the castle, the government's seat); every class whose balance profile (item 107 (a)) is
   in `carry.never.balance` — the heavy processors and wholesale and storage, which belong by the gates and quays; every
   class whose siting profile (item 103 (a)) emits one of `carry.never.emitsTopStep` at the profile scale's top step,
   since nothing on an island lies downwind or downstream of its homes; every class with a hard NEEDS row naming a
   `carry.never.hardNeeds` feature — the conjured river and the spring pond satisfy no NEEDS row (V05 §3.20 (1)); and
   every resource or processing node of an active chain — a custom chain (item 104 (b)) or one of the dossier's
   `activeChains[]` with its processors resolved by kind family (item 105 (i); V08) — the island institution of V05 §3.4
   excepted. Their demand stays on the ground, where the chain keeps its working steps together (V05 §3.20 (9)).
   (b) **carried by share** — every class (a) does not exclude: the everyday services and the town-wide specialists of
   `carry.share.balance` above all, a chain's final seller and its consumers among them.
   (c) **split across the arenas** — a class whose row declares `split` (item 105 (h)) and whose works (a) excludes (a
   butcher's slaughterhouse emits at the top step; a brewer's brewhouse is a heavy processor): with
   `carry.share.splitShop` on, its **shop** may go up by the share while its **works** stays on the ground — one item on
   two plots on two arenas, the shop's building carrying a `Use` whose `branchOf` names the works' use (J-V5.51). Item
   105 (h)'s split threshold is read with the route distance (V05 §3.20 (1)) between the island's demand and the works'
   ground site; below it the class stays whole on the ground. Every split is reported; off in the parity presets, as the
   islands are.
   (d) **collective members** (item 108 (b), (c)) — a member `#k` of a COUNT, GUILD or QUARTER record carried by the share
   keeps its record and its key; the record's range check (T73-4) counts its members on both arenas together; a lesser a
   greater subsumes is carried as that greater's member, never as an addition.
   **Coverage** (item 103 (f); J-V5.37). For a class with a coverage row, the island counts as **k units** for a row
   counted by district or neighbourhood — k its district count, volume 1's `skyDistrictCount(plotLandM2, districtHa)`
   (V01 §3.16), computed here from the allocation's plot land by the same call the unit runner makes — **one unit** for a
   row counted by walking radius (the route to the ground passes every walking radius, V05 §3.20 (3)), and **⌈its carried
   households ÷ N⌉ units** for a row counted by N households. The proportional share above stands, and the island's units
   join S7b (1)'s coverage step as candidate units beside the ground's districts (§4.5 S7b (5); file f item 308), which may
   add an instance of the class to this allocation from the demand it distributes — never remove one — unless the add
   would carry the plot land past `fill.coverageOvershoot` × `plotShare · A`, when that unit is skipped for that class
   (reported). Inside the island the unit run's S10b spreads a coverage class over its districts and spaces its members by
   item 107 (d)'s same-kind row, as on the ground (V05 §3.20 (12)).
4. If `A` < `minAreaHa`, the slot closes (reported) and its rows return to the demand.
5. The island's district count and its partition are volume 1's (V01 §3.10.3 (2), read with `districtHa`): this volume
   counts none (J-V5.28).
6. One `Allocation` (level `district`, target the island's sky pseudo-district) holds the rows; `S_carried` and `A` are
   written to the slot's record-to-be.

**An institution slot.** Its row's instance (V05 §3.4 (2)) with `claim` set once SKY makes the claim (V05 §3.10 (5)),
plus `staffHouseholds` households of the requirement band; `A` = min(the law's `A`, `institutionFit.areaCapShare` × the
row's `areaHa`) — a compact island, its surround the unit run's gardens, close or yard; its claim's face is typed by the
row's `districtKind` (V01 §3.10.3 (2)). Then, in order:
1. **A greater goes up alone** (item 108 (c); J-V5.57). A greater that subsumes lessers — a cathedral over the parish
   church, the resident priest and the wayside shrine — takes only its own building up. Its lessers stay separate
   buildings, members of its collective each keeping its `#k`: on the ground by their own rules, on an island only by a
   prosperity slot's share; each counts once, never as an addition.
2. **The ground reservation's hand-over** (J-V5.46; §4.2 S3 (2), (8), file f item 286). Where the instance holds an S3
   reservation — the temple or cathedral precinct, or the reservation a palace takes by the castle's siting rules — the
   reservation stays exactly as it is (no L1 change) and passes to the row's `handover`: the first of its `tags` the
   roster demands on the ground, its largest instance (V05 §2.4), which S10b places into it as its claim (the
   reservation's `owner` becomes that instance and its `handedFrom` the institution that went up); a reservation sized for
   the greater keeps its size, the surplus becoming the incoming instance's churchyard, close or garden by its template's
   yard rows (§4.9). With no such tag demanded, `else`: `park` — the reservation re-typed `park`, owner `commons`, laid out
   by S12b as the old palace gardens or the old close's green — or `none`. An institution the creation prefix sends up (a
   T5 `sky` declaration of its kind, a T6 `criteria.sky` assignment) leaves nothing to hand over: S3 never reserves it.
   After generation — a T6 assignment or an epoch's `raiseIsland` taking a ground institution up — its vacated building
   steps down the base's ladder as any vacated building does, and the regrowth-first order re-occupies it with the row's
   hand-over classes first. The report and the clerk name the hand-over ("the old cathedral close — now the mother
   church").
3. **Burial and the crypt** (item 109 (k) (2)–(3), J111; item 2; J-V5.43). The churchyard part the base gives every church
   and temple plot (§4.9's churchyard row) — the island cathedral's, and any church's a prosperity island carries — is a
   surface burial ground only: it is left out of item 109 (k) (3)'s catacomb candidates and out of its "largest cemetery"
   ranking (volume 4's candidate list skips every sky-arena face). Each church on an island still counts once toward the
   catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V04 §2.3), since the dossier's church records and
   the roster set that count wherever the churches stand. The island cathedral's crypt — always the settlement's largest
   (volume 11's crypt column, `always`) — is a vault cut into the island's rim slab under the cathedral (V05 §3.10 (5)):
   part of its building, never an `UndergroundSystem` part or an item 109 (j) (3b) link, and no catacomb grows beneath it.
   The ground church that takes the old close keeps its own crypt by the crypted-class rows and is never ranked above the
   cathedral's.

**The rest.** S7b (1) allocates the remainder to the ground's districts, so the population stays whole (II.6).

### 3.6 Shape (S7b (5), per open slot, in the island's local frame)

1. **Template.** A declaration's points form gives it (a lasso is the outline itself, one point a disc of area `A`, two
   to four corners the routine fitted to their hull); otherwise one weighted draw of `outline.templates` on `island.place`
   (the island's lineage, index `template`).
2. **Bearing.** The long axis takes the ground's principal river's bearing (its course from inlet to outfall) where the
   site has a river; otherwise a uniform bearing on `island.place` (index `bearing`).
3. **The routine.** §4.2 S1 (2)'s closed-outline routine on the template's base curve, with the rule's detail row and a
   uniform envelope (no town side), from `island.place` (index `outline`); the base curve's scale is set by one secant
   step so that the displaced outline's area is `A` within 1 %. F-OUTLINE's ladder applies (§5.2).
4. The outline's centroid is the local origin, and the arena's frame is sized from the outline now drawn (V05 §3.8 (1)).

### 3.7 Placement — where the island floats (S7b (5), per open slot, in slot order)

1. **The class raster.** A 64 m raster over the ground frame classes each cell: `water` (its centre in an L0 water face —
   an oasis's included, item 111 (a)); `core` (in a district of growth stage 1); `outskirts` (in any other district);
   `fields` (land outside the settlement perimeter). It is built once per S7b from the ground plan that exists then.
2. **Candidates.** The centroids of a `latticeM` lattice over the frame whose translated outline lies inside the frame
   inset by `frameInsetM`, does not meet any placed island's projected outline dilated by `gapM`, and **can be reached**
   (J-V5.54): at least one of its rim's cells on the class raster lies on admissible ground (for a hoist or a stair) or
   within the horizontal run of an admitted slanted access row (`ropeway`, and `lightBridge` where the `magic`
   circumstance admits it) of admissible ground. **Admissible ground** is the raster's land cells outside water,
   reservations and wall strips, and outside every committed raised part's raised-way pier footprints, its deck's plan
   dilated by `accessSiting.deckGapM` and every deck face of item 110 (d) (a mole, a pier, a quay platform or a bridge
   deck that carries plots), and outside the faces of every live landfall's members (rubble) — V05 §3.10 (3)'s admissible
   faces at the raster's cell (a cell is admissible when its centre is); the test reads one chamfer distance transform to
   it (integer, 3–4 weights on the 64 m cells), built once with the class raster (J-V5.60).
3. **The score** of a candidate, over the outline's cells on the class raster: (a) the mean class weight — the rule's
   `prefs`, with an institution row's `overWeights` over them, and with `core` at 1.0 when the island is placed by
   assignment or declaration — × 1.0; (b) proximity, − 0.5 × min(1, d ÷ `nearM`), `d` the distance from the outline to the
   settlement perimeter (0 over the town); (c) purpose, 0.5 × one term: a row whose `near` is `plaza` 1 − min(1, d ÷ the
   row's `nearM`) to the plaza; one whose `near` is `precinct` the same to the precinct where S3 reserved one (it is then
   the hand-over church's close, V05 §3.5), else to the plaza; one whose `far` is `plaza` min(1, d ÷ the row's `nearM`)
   from the plaza; a prosperity island, and a row whose `near` is `richest`, 1 − min(1, d ÷ `nearM`) to the district of
   highest prosperity mean (ties by district address).
4. **The draw.** The `topK` best (ties by lattice y, then x), then one draw weighted by score − min score + 0.01 on
   `island.place` (index `place`). The chosen centroid is `anchor`; `placement.over` is the class of largest share under
   the outline (ties in the order water, fields, outskirts, core); `byAssignment` is set for a forced slot.
5. **F-SKY-PLACE** (V05 §3.17) when no candidate passes.

### 3.8 The island arena: frame, land, rim, terrain, the conjured river (SKY)

1. **Frame.** Computed after the outline (V05 §3.6 (3)): a square centred on the local origin of side 2 × `r_max` × √1.5 +
   2 × `frameMarginM`, rounded up to 10 m, `r_max` the outline's greatest distance from its centroid — so the outline grown
   to 1.5 × its area by the buffer resize (V05 §4.2) stays inside whatever its template and aspect, a spindle as surely as
   a disc; a declared or edited area past that grows the frame by §3.2's single-level batches.
2. **L0 batch.** The arena's outer ring (the `margin` role on the island's `Terrain`), then the rim — the outline as one
   closed chain carrying the structural `rim` role — making two faces: the **void**, L0 kind `sky`, between the ring and
   the rim (§2.2 rule 1, file f item 204); and the **land**, owner the island. Every later batch on this arena lies inside
   the land face.
3. **Terrain.** The island's own `Terrain` (§2.3): the ground's terrain cell; a `hydro` grid at half the ground's hydro
   cell (12.5 m at CITY, 16 m at METROPOLIS: an island's catchments are small); `geology: 'ordinary'`. Heights: a dome
   `(domeM + domePerRadius · R) · (1 − (r ÷ R)²)`, clamped at 0 (`R` the equivalent radius √(A ÷ π), `r` the distance from
   the centroid); plus, for `echo`, §4.2 S1 (1)'s fBm at the ground's relief class with its amplitude × `amplitudeShare`;
   for `own`, the same at a class drawn by S0's relief weights on `island.place` (index `relief`), which SKY writes to
   `terrainEcho.reliefClass` (J-V5.78); for `none` nothing; the noise on `terrain.noise` keyed by the island's `Terrain`.
   Where a conjured river is drawn, the surface tilts by `tiltPerMille` along its bearing, downhill toward its fall. Void
   cells hold 0 and are masked. The terrain's `datumCm` is the ground's datum plus the island's `elevationCm`, rewritten
   whenever that changes.
4. **The conjured river** (the owner's "magically conjured river"; J-V5.23). Where the ground has a river, `A` ≥
   `river.minAreaHa` and a draw on `island.place` (index `river`) is below `river.chance`: the source is the point on the
   long axis at `river.sourceShare` of its length from its upstream end (upstream: against the ground river's flow); the
   course is traced and carved by §4.2 S1 (3)'s rivers by descent on the island's `hydro` grid until it meets the rim; its
   width is `w0 · (flowShare · acc)^0.4` — the ground's width law, `acc` the ground river's accumulation at its reach
   nearest the island's anchor — clamped to [`widthM[0]`, `widthMinorShare` × the outline's minor axis]. Its water face
   enters L0 with `shore` edges, bank kinds by §4.2 S1 (7)'s table; where it meets the rim the short stretch between its
   two banks carries both `rim` and `shore`, and the `WaterBody` carries `fall: true` (§2.3) — its outfall is the
   waterfall. Its crossing sites are §4.2 S1 (5)'s, on the island, built by volume 1's unit run (V01 §3.10.3 (4); file f
   item 580); a bridge there may carry deck plots by item 110 (d)'s base mechanism, and they fall with the island (V05
   §3.16). No raised part stands on an island (V05 §3.22 (3)). With no ground river, a **spring pond** (`pond`,
   `river.pondShare` × `A`, at the terrain's highest basin, ties by lattice y then x) by a draw below `springPondChance`.
   `terrainEcho` records the ground river, the relief mode and, for `own`, the drawn class. **Item 111 leaves an island's
   water unchanged:** the oasis, its spring, grove and gardens, the water pull and well placement by yield (§4.2 S0–S1,
   S3, §4.7 S10b) are the ground arena's; no oasis is drawn on an island, and a ground oasis is neither a river the island
   echoes nor a source of its pond — it is ground water, read as water by V05 §3.7 (1), V05 §3.10 (3) and V05 §3.16 (5) like any
   other.
5. **F-SKY-TERRAIN** (V05 §3.17) when the descent stalls.

### 3.9 The underside, the ground reference and the altitude (the owner's J98)

1. **The underside profile** (SKY): `kind` drawn by the rule's weights on `island.place` (index `underside.kind`);
   `rimThicknessCm` the rule's; for every kind but `flat`, `depthCm = min(maxDepthM, depthPerRadius · R) · (0.8 + 0.4 ·
   u)`, `u` a uniform on `island.place` (index `underside.depth`), `apexOffset` a uniform point in the disc of radius
   `apexOffsetShare · R` (index `underside.apex`), pulled toward the centroid until the apex lies over the land face, and
   `tiers` the rule's; for `flat`, `depthCm` 0, `apexOffset` (0, 0) and `tiers` 0 with no draw on `underside.depth` or
   `underside.apex` (so a flat island's altitude floor counts no root); `roughness` the rule's; `source: 'rule'`.
2. **The underside tiers** — `undersideTiers(island)` (`@plat/sky`), view data computed by S14, never stored: for tier i =
   1 … n (`n = tiers`; none for `flat`) at depth fraction `z_i = i ÷ n`, the ring is the rim eroded by `R · (1 −
   ρ(z_i))` — the kernel's buffer on a transient arena (§3.4, §3.7), integer — translated by `apexOffset · z_i` and each
   vertex moved radially by `roughness · R ÷ n` × a `dmath` noise keyed by the island's render key and the tier; tier i
   spans from `elevation − rim − depth · z_(i−1)` down to `elevation − rim − depth · z_i` (`rim` the rim thickness).
   Underside tier 0 is the rim slab: the rim itself, from the island's **surface top** (below) down to `elevation − rim`.
   A tier whose ring falls below 1 % of the land's area ends the stack; the last tier then runs to the apex. So the solid
   is a stack of nested prisms whose silhouette follows the profile: a `root` hangs a narrow stalactite, a `bowl` a
   rounded belly, a `cone` a straight taper, a `flat` a thin slab (J-V5.15).
3. **The ground reference** (SKY, before any plot is cut): `groundRefCm` = the greatest, over the ground's 32 m field
   cells whose centres lie under the island's projected land face or any projected underside-tier ring, of the terrain
   height at the cell centre plus the cell's **caster ceiling** — the greatest of `casterAllowanceM`; the top of every
   caster already placed whose footprint meets the cell (a wall's band, a tower, a gate of any kind, the castle, a bridge
   or pier deck — S5's and S7's, §8.4's casters — and every raised part committed before SKY: its deck top with its
   parapet, or an aqueduct's channel wall, over the deck's plan, and its raised-way piers, with any retaining wall and
   levelled platform committed before SKY at its high-side top, V05 §3.22 (1)); and the `towerCm` of the heights row of
   every class with a tower (a church, a keep; §4.7 S11) allocated to the district holding the cell (the hinterland's
   allocation outside the districts) — above the ground datum. It reads only what exists at SKY, so the altitude is final
   before S10a reads the island's shade (J-V5.29).
4. **The altitude** `altitudeCm = max(E, rim + depth + clearanceM)` — the law's altitude, raised where a deep root needs
   it so the apex clears the tallest thing beneath by `clearanceM` (J-V5.6) — or the edited value, which the same floor
   bounds (bent to it, V05 §4.2). `elevationCm` is `groundRefCm + altitudeCm`. The island's **surface top** — the
   `surfaceTopPercentile` percentile over the land face of its height at each point: the levelled ground there,
   `levelledGroundCm` on the island's key (§4.7: the platform datum where item 110 (a) levelled the plot or block, else
   the terrain), plus the eave of the building standing there — for a stepped building the eave of the **highest massing
   tier over that point** (its wing's `baseCm + eaveCm`, V02 §3.15.2) — is computed with the underside tiers (underside
   tier 0's top). The model's strip (V05 §3.19) reads underside tier 0's top from the terrain alone at generation and at a
   re-derivation, and from the full surface top at an epoch and at Update shade now, since item 102 (b) lets buildings
   cast the daylight term only across epochs.
5. **The clearance rule** — its one home, read by SKY-F after the pool's merge and the unit runs, by the epoch's
   `sky.clearance` (V05 §3.15 (7)) and by a ground edit beneath (V05 §4.3): where a caster placed after SKY under the
   projected solid — a building's ridge or tower (a stepped building's top from volume 2's stack envelope, V02 §3.15.2),
   a tree's crown, a raised part (its deck top with its parapet or channel wall, its raised-way piers), a retaining wall's
   high-side top, or the levelled ground itself where levelling raises a platform under the solid by fill
   (`levelledGroundCm` above the raster) — stands above `groundRefCm`, `groundRefCm` is raised to its top **keeping
   `elevationCm`** — `altitudeCm` becomes `elevationCm` − the new `groundRefCm` — and only where (4)'s floor then fails is
   `elevationCm` raised to meet it (a listed fate, naming the caster), so an island whose clearance already holds does not
   climb. It never writes `shadeBasis`: the island's strip keeps its basis until the next shade evaluation, across saves
   and loads alike, reported `shade basis behind: clearance` (F-SKY-CLEAR, V05 §3.17). **A lock holds the island:** a
   locked island, or a lock on its `altitudeCm` path, keeps `elevationCm` — `groundRefCm` and `altitudeCm` are still
   rewritten, and where the floor then fails the island stays where it hangs, the conflict listed ("clearance held by
   your lock") and the island exempt from the clearance invariant (§5.3, file f item 331) as a held island is from the
   supply invariant. The rule draws nothing. **Measurement (P0):** over 1 000 islands at CITY and METROPOLIS, with item
   110's terrace, raised-way and deck-plot rows on at their defaults, the share SKY-F raises ≤ 1 %. **Pre-decided
   fallback:** `casterAllowanceM` becomes the measured 99.9th percentile of the caster tops found under islands (the same
   caster set), rounded up to 5 m, and is re-measured once.

### 3.10 Access — the tops, the feet, the landing claims (SKY)

1. **How many.** A prosperity island: `min(accessCount.max, 1 + ⌊areaHa ÷ accessCount.perHa⌋)`, the first `main` and the
   rest `service`; an institution island: its row's `accesses`. **A removed ordinal holds** (J-V5.62): at every re-siting
   (a Re-derive from S7b or SKY) the ordinals in `SkyIsland.removedAccesses` are skipped — no top, no foot, no claims — and
   counted toward the number, so no replacement is sited; the lowest surviving generated ordinal takes `main` (an
   institution row's `guarded` role kept by its own ordinal), the rest `service`.
2. **Directions.** `d_1` is the bearing from the island's world centroid to the nearest ground district's centroid; `d_k =
   d_1 + (k − 1) · 360° ÷ n`. Each top is the point where the ray from the centroid at `d_k` last leaves the land face.
3. **The kind at each top**, among the access rows admitted by the recipe's `magic` circumstance (a `guarded` access is a
   `hoist` only; J-V5.8): `hoist` or `stair` where the top's world point lies on ground land in an **admissible face** — a
   district's L1 face that is no reservation, claim or wall strip, or a hinterland L1 face, less every raised-way pier
   footprint, every raised deck's plan dilated by `accessSiting.deckGapM`, every item 110 (d) deck face and every face of
   a live landfall's members (J-V5.60) — and the altitude is within the row's limit; `ropeway` or `lightBridge` where an
   admissible land point lies within the row's horizontal run of the top (the point nearest the town's main plaza for a
   rope line; the highest ground for a light bridge; ties by lattice y, then x). One weighted draw among the admitted
   kinds on `island.place` (index `access:k`). **A slanted access over a raised part:** a `ropeway` or `lightBridge` whose
   straight segment from its top to its foot passes over a raised part's deck or a raised-way pier keeps
   `accessSiting.lineClearM` above its top (the deck with its parapet or channel wall, the pier's head) along the whole
   crossing; failing that, the candidate foot is refused and F-SKY-ACCESS takes its next direction step.
4. **The foot.** A `hoist` or `stair` foot is the top's world point; a `ropeway` or `lightBridge` foot the chosen land
   point. Feet keep `accessSiting.footGapM` apart: a later foot inside the gap of an earlier one moves to the nearest
   admissible point outside it (ties by lattice y, then x). A foot and its landing yard stand on part-0 land only: never
   on a deck face, a raised-way pier or inside a raised deck's plan dilated by `deckGapM` — a yard that would meet one is
   slid along the spine to the nearest position clear of it, else the foot moves as a gap violation does. **"The nearest
   way"** here and in V05 §3.12 is a **walkable part-0 way**: a raised part's deck counts only at the ground vertex of
   its ramp or stair foot, an aqueduct never. **In a district**, the foot is moved along the perpendicular to the nearest
   L1 way spine within `wayReachM` — or for a vertical access the landing yard is stretched from the foot to that spine —
   and SKY's ground L1 batch claims the landing yard (`claimSubFace`, `yardWidthM × yardDepthM`, touching the spine) as a
   ground `Reservation` of kind `landing` under the data key `reservations.landing`, with its attach vertex on the spine
   (J-V5.17). **Where no spine lies within `wayReachM`** (at SKY only S3–S7's arterials, boundary ways and gate plazas
   exist), the yard is claimed at the foot itself, its attach vertex on the yard's side facing the nearest way, and the
   attach is registered as a **destination** S8 must reach (§4.6, file f item 299): S8's first cut in that face runs from
   the attach to the nearest way by §4.6's lane rule, as a gate's attach is reached, and SKY-F checks that a way meets it
   (V05 §3.12). Either way SKY writes, under `allocations.landing`, the positioned row `{ cls: 'sky_landing', band:
   'modest', count: 1, claim, at: foot, access }` for that district — a row of its own beside the district's
   `Allocation`, never a rewrite of a row S7b wrote. **In the hinterland**, the landing is an outside site: the same row
   under `allocations.landing` for the hinterland's `Allocation`, sited by S12a at the foot and given its trail to the
   nearest way by the hinterland unit, as a decoration's trail is (§4.9). A `secret` access's ground landing is fronted
   (V05 §2.2).
5. **The top.** One `splitThrough` at L0 on the rim places the access's `('sky_access', id)` vertex, pinned; SKY's island
   L1 batch then lays the **rim strip** — a closed L1 line `rimStripM` inside the rim carrying the `setback` role on the
   island, its strip face typed as a block interior `rim_strip` (§2.5) — and claims each top's **landing yard**
   (`yardWidthM × yardDepthM`, from the rim inward across the strip) as an island `Reservation` of kind `landing` with its
   attach vertex on the yard's inner side, and, for an institution island, the **institution claim**: one `claimSubFace`
   of the row's `areaHa` (§4.5 S7b (3)'s compact claim shape) on the land face less the rim strip and the landing yards,
   searched over the sites of an `institutionFit.siteLatticeM` lattice (the claim's centre) whose claim fits there, by a
   named score: a **palace** the greatest mean terrain height under the claim among the sites on the half of the land
   facing `d_1` (the site's projection on `d_1` from the centroid ≥ 0; the whole land if none fits there); a **cathedral**
   and a **tower** the least distance from the site to the land face's centroid; a **prison** the least distance to the
   centroid among the sites whose claim dilated by `institutionFit.prisonMarginM` still fits. Ties break by lattice y,
   then x (J-V5.12's rule for every search here).
   **The crypt test** (item 109 (k) (2), J111; J-V5.43, J-V5.66). The crypt lies **under the building's lowest massing
   tier, inside underside tier 0 (the rim slab)**: a stepped cathedral or great temple of volume 2's `stepped` rows keeps
   its crypt beneath massing tier 0. For an instance whose class carries a crypt `always` (volume 11's crypt column: the
   cathedral and the great temple), a site passes only if, at every point of the claim, the island's terrain height less
   the full basement depth (220 cm, volume 2's basement form) lies at least `cryptFloorM` above the rim slab's base,
   `elevationCm − rimThicknessCm` — so the crypt, the settlement's largest, is a vault cut into the rim slab, which exists
   for every underside kind, `flat` included. With the default rim of 10 m this holds wherever the terrain lies above −6.8
   m, so it excludes only an `own` relief's deep basin. If no site passes, the best site by score is taken and the crypt
   takes the half-sunk form (volume 2's basement ladder, full → half → raised), listed as a fate ("the rock is too thin for
   a full crypt here") and reported by F-SKY-CRYPT. The crypt is part of the cathedral's building — its basement record,
   whose rooms volume 3 plans — never an `UndergroundSystem` part, never an item 109 (j) (3b) link and never a catacomb
   source (item 2). Every later re-claim (a resize, a rim reshape, New random, a terrain edit on the island) re-runs the
   test, a change of form listed as a fate. **After levelling:** the claim is searched at SKY on the terrain; SKY-F
   re-runs the test on the cathedral's plot at its levelled platform datum (`levelledGroundCm`) where the unit run's S10 or
   S11 levelled it, since a platform cut into a slope lowers the floor — a form change listed as a fate, F-SKY-CRYPT's
   ladder as before.
6. **The ground's field** gains, at field pass 2 (S10a), a positive kernel at each ground landing (`landingKernel`; §4.5
   *Fields*, file f item 295): the land by a landing trades with the island above.
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
4. **`shadeSky`(x)** — the share of the model sampler's bits at x that a higher island's solid blocks (the OR, sample by
   sample, of the strips onto this island, V05 §3.19) and, after an epoch, the island's own buildings (volume 6's
   building shade mask run on the island's lattice, V05 §3.19 (7)); the island's gentle relief casts nothing on itself
   (J-V5.33). `w_sun` here is item 102's weight; item 111's climate cell and water term (§4.5 *Fields*) are the ground
   field's and never reach `P_I`, which carries no water term.
5. **`brush`(x)** — the island's prosperity brush strokes (`setField` with `key`, V05 §4.2) as §7.2's stroke overrides; a
   declared target mean (`setAttr(field.prosperity)`, `declared.field`) adds one uniform shift so the lattice mean of
   `smooth(Q + ε)` equals it.

With ε, the shade and the brush at 0, each carried band holds exactly its carried share of the lattice cells (within the
smoothing's boundary cells), so §4.7 S10a's band capacity on the island houses every carried band on its own ground and
its band-range step re-homes none of them (T-V5-9). `SkyIsland.field` records `prosperity` = the lattice mean of `P_I`,
`density` = the mean of the ground's density field over the cells whose prosperity band is one of the carried bands, and
`greenery` = the same mean of the greenery field plus `greeneryBonus`; `SkyUnitInput.field` carries the raster before the
brush (the unit run applies the strokes as the ground's field step does). The raster is never stored: it is rebuilt on
load from the island's terrain, rim and allocation, the cuts and the stroke list, as §2.9 rebuilds the ground's fields.

**The context vector** on the sky arena (§2.5, `arena: 'sky'`, file f item 213) reads: `prosperity` = `P_I` at x
(bilinear on the lattice); `density` and `greenery` as `field` gives them; `dist.centre` to the land's centroid;
`dist.plaza` and `dist.market` to the institution claim on an institution island, else the route distance (V05 §3.20) to
the ground's plaza and to its nearest market; `dist.gate` to the nearest landing attach (a landing is the island's gate);
`dist.wall` to an author's island wall (V05 §3.21), else none; `dist.water` to the conjured river or pond; `dist.shore` to
the rim; `slope`, `aspect`, `upstream` and `terrainClass` from the island's terrain (`high`, but `damp` within 10 m of
island water); `upwind` from the ground's wind; `growthStage` 1; `arena: 'sky'`. Volume 1's field step on the island
reads these values through `skyUnitInput` — they replace a character offset from `h(S_carried)`, since a supply fraction
is not a prosperity value.

### 3.12 The island's unit inputs to the unit run, and what the run must honour

SKY builds each island's `sky` request (V05 §2.3) and calls the unit runner, which reads `skyUnitInput(doc, island)`.
Volume 1 owns the unit run — the partition, its count and cut, the typing, the crossing sites, the rim walk (V01 §3.10.3;
J-V1.17) — and runs it as V01 §3.10.3 states: no second terrain; the unit's outline the land face less the rim strip, the
landing yards and the institution claim as holes; each landing's attach a gate-ranked portal a way must reach; the field
read from the unit inputs; every face of a prosperity island typed `sky-island`, and on an institution island the row's
`sky-*` kind on the face that receives the claim and `sky-island` on any other; the district count by
`skyDistrictCount` with `districtHa`. **The fabric hint is a prior, never a strategy** (J-V5.48): on every island district
S7c's template draw multiplies the weight of the hinted template by `fabricPrior` and chooses as it does anywhere; the
hint is a prosperity island's `ring` from `fabricRingHa` and `bent-cut` below it, and an institution island's row's
(`street` for a palace — an axial avenue from the main landing to the forecourt; `landmark` for a cathedral; `square`
for a prison or a tower), always a valid `FabricStrategyId` (V01 §2.1). This volume's contract with the run, tested by
T-V5-9: it writes only the island's arena; it never cuts or plots the rim strip, which volume 1's island-level
`plantRimWalk` plants once as the rim walk (V01 §3.10.3 step 4; §4.9's rim-walk row, file f item 313; J-V5.26); it places
the institution on its claim by S10b; it measures every pull to a class on another arena by the route distance (V05
§3.20); it levels island ground by item 110 (a)'s thresholds, laying each retaining wall on the island's arena and never
on the rim strip or along the rim (V05 §3.22 (4)); it leaves `SeamReport.portalsTotal` 0; and it returns its district
ids, which SKY-F writes to `SkyIsland.districts`.

**SKY-F checks** that every landing yard holds a `sky_landing_top` plot, that a way meets every island attach, and that a
walkable part-0 way meets every ground landing attach after S8 (the destinations of V05 §3.10 (4)); that no island
`RetainingWall` stands on the rim strip or along the rim; and it re-runs the crypt test at the levelled datum (V05 §3.10
(5)). A missing island way is repaired by one island L1 batch laying the shortest lane from the attach to the fabric (S8's
lane width), a missing ground way by one ground L1 batch in the landing's district doing the same (the district's own lane
rule); an unreachable landing is reported by F-SKY-ACCESS's last rung. A unit run that makes no district (an island
whose land is all rim strip and claims, V01 §3.10.3 (2)) sends the island's allocation to F-SKY-UNIT.

### 3.13 Lights (SKY-F; the sky rows of §4.7's light table, file f item 307)

| host | what | defaults (own, `extension`) |
|---|---|---|
| `rim` | magical orbs along the rim strip's outer edge | every 40 m, 2.5 m high, 60 cd × `h_carried`, radius 18 m, orb 30 cm, cool, steady |
| `keel` | one downward magical source at the root's apex (a `flat` island's: the rim slab's base under the land centroid): the glow beneath the island | 4 000 cd × `h_carried`, radius the apex's clearance + the row's `radiusMarginM` (30 m), size 3 m, cool, steady |
| `skyAccess` | a lantern at each top | 25 cd, 3 m, radius 12 m, fire, flicker |

The island's ordinary fabric — its ways, doors, squares — takes the ground rows (arena `ground`) as any district does;
each ground landing's lantern is its `sky_landing` class's `door` row. The `magic` circumstance gates no sky row: the
island is the magic that holds it up (J-V5.9). A waning island's magical lights scale with its `h_carried` at each epoch;
a settled island's stand at 0 cd, their records kept so a refloat relights them; a fallen island's are tombstoned with
its arena and a removed island's archived with it (V05 §3.16 (7), V05 §4.2).

### 3.14 Names

S13a draws each island's name on its `naming` stream (§6.3's cases), reading the features: the reason and the
institution's kind; the echoed river's name; the name of the ground district nearest below (ties by district address);
the altitude class (low below `naming.lowBelowM`, high from `naming.highFromM`); the town's culture row (§10.4). The
grammar rows are volume 11's (the slice `naming.island`). Each island is the root of its own `QuarterNode` (members its
districts, `cityCut` true), named with the island's name, so its `quarter` label draws at the city band; an institution's
own name is its `landmark` label; a landfall's `place` label takes the grammar's fallen form of the island's name (V05
§3.16).

### 3.15 Over time — the island laws an epoch applies (`IslandEpochStep`)

`IslandEpochStep.apply(doc, epoch) → ConversionOp[]` (`@plat/sky`; §4.11, file f item 320) is called by the evolution
engine at each epoch after S6's re-evaluation of the field and before S7b's delta allocation, so the households it
releases or takes enter that allocation. `@plat/sky` registers it in §4.12's `StrategyRegistry` as volume 6's
`EpochParticipant` with id `sky.islands`, step `afterField`, order 0, stage `SKY` (V06 §2.1, V06 §3.2): its `run(ctx)` calls
`apply(ctx.doc, ctx.epoch)` with `years` = `ctx.years` and `rung` = `ctx.rung`, draws on `island.place` as below (never on
`ctx.stream`, so a history with or without the engine's other participants draws the same island values), and returns
the conversions as `EpochOps.ops` in island slot order. `@plat/sky` registers a second participant, **`sky.clearance`**,
at step `afterGrowth`, order 50 — after volume 6's `hood.fabric` (order 40), so every raised part, retaining wall,
building and massing tier the epoch committed is read — stage `SKY`, which runs step 7 below (V06 §3.2's table).
**Households move through volume 6's typed channels** (V06 §2.1, V06 §3.8.1): every household the step releases — a wane's
leavers, a settle's remainder, a fall's covered homes — enters volume 6's displaced pool with cause `island` (placed
first at the `siting` step, their addresses kept, each placement a `relocate`); every household a refloat or a raise
takes up from the epoch's delta demand is reserved by an `EpochOps.demandTaken` row `{ band; count }`, which `siting`
subtracts from the delta demand before it houses the rest; existing households relocated up are `relocate` ops. So
ground plus sky households equal the epoch's target after `siting` (T-V5-21 (g)). `years` is the epoch's span (§4.11 (5));
every rate below is per year, applied over it. For each island that is not fallen or removed:

1. **Evaluate.** The rung row of the epoch's rung — the fold's (`ctx.rung`, V06 §3.1 (3); §4.11's rung at an epoch, file
   f item 322; J-V5.74): `none` makes the target area 0. Otherwise `S_town` from the re-evaluated field's island-free value
   (§4.5: the supply law never reads the islands' own shade), the node term from the deposits as they stand at the epoch
   (V05 §3.3), `S_carried` from the island's households' bands under the new cuts (an institution island's requirement
   band), and the targets `A_t` and `E_t` by V05 §3.3. `supply` is rewritten.
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
   cause. **Under a lock**: the institution still leaves at once (the dossier outranks a lock, §7.7), but
   a locked island or a locked `state` path holds (1b) — the island keeps its reason `institution` and its vacant claim,
   listed at every epoch as `held without its institution`, and (1b) runs at the first epoch after the lock is lifted.
2. **Floating.** If `A_t = 0`: `waneIsland` (floating → waning), `dwellUntilWeek` = the week + a draw in
   `dwellYears.waning` × 52 on `island.place` (the island's lineage and the epoch component, index `dwell`). Otherwise, if
   |`A_t` − `areaHa`| > `hysteresis` × `areaHa`: `resizeIsland` toward `A_t` by at most `growthPerYear · areaHa · years`
   either way (magic accretes and erodes slowly) — never below V05 §4.2's claim floor on an institution island, listed in
   the epoch's report where it stops there — and its altitude toward `E_t` by at most `altitudeRateMPerYear · years`
   metres, never below V05 §3.9 (4)'s floor.
3. **Waning.** Each epoch the altitude falls linearly from its value at the wane's start to V05 §3.9's floor (with
   `E_min`) by the dwell's end, and the area toward half its value at the start, both by `resizeIsland`; the households
   leave in reverse ordinal order (the suffix, as §4.11's step (c) empties buildings; J-V5.22), ⌈H · years ÷ dwell⌉ each
   epoch, each a `relet` down or a `vacate` on the island and the household entering the displaced pool with cause
   `island`; the island's vacant buildings then step down the base's building ladder. If `A_t > 0` again:
   `refloatIsland` (waning → floating), the dwell cleared. When the dwell ends: `settleIsland` — the altitude at the floor,
   every remaining household into the displaced pool, the magical lights at 0, `dwellUntilWeek` = the week + a draw in
   `dwellYears.settled`.
4. **Settled.** If `A_t > 0` (and the rung admits islands): `refloatIsland` (settled → floating) — regrowth-first: its
   vacant stock is reoccupied before any ground plot, by the rich bands' delta demand first (reserved by `demandTaken`)
   and then by relocating existing rich households up, within the epoch's churn cap (§4.11) — its altitude climbing at the
   rate. When the dwell ends: `fallIsland` (V05 §3.16).
5. **Empty slots** (J-V5.13). A slot holding a live, unfallen island is never redrawn — while it is supplied it stays. An
   empty slot re-opens with probability `(1 − (1 − redrawPerYear)^years) · chance[k] · h_town` (II.6 (4); J-A67.40),
   drawn on `island.place` with the epoch component, only if every lower slot is filled. **A slot a `removed` record holds
   is not empty** (V05 §3.2 (6)): it is never re-opened by an epoch, draws nothing and counts as filled for the slots
   above it. A slot that opens refloats a settled island first (regrowth-first; the settled island with the highest
   `h_carried` for its households, ties by slot, then address) and otherwise `raiseIsland`: S7b's delta fill for the sky
   (V05 §3.5, taking the rich bands' delta demand first, reserved by `demandTaken`, then relocating existing rich
   households up within the churn cap), then V05 §3.6–V05 §3.14 on the new island, its districts laid by the unit run inside
   the epoch's commit (V01 §3.10.3 (6) (a)); it has no `shadeBasis` until the next epoch's S6 (V05 §3.19 (6)).
6. **A rung crossing downward** makes every island's target 0: they wane, settle and fall over their dwells, never in one
   epoch (T8-6). A rung crossing upward into CITY lets empty slots re-open by (5) at the new rung's row.
7. **Clearance after growth** (`sky.clearance`, at `afterGrowth`, order 50; J-V5.68). After the epoch's growth, every live
   island (not fallen, not removed) is re-checked by the clearance rule (V05 §3.9 (5), its lock clause included) against
   the casters the epoch committed under its projected solid: the raised parts of volume 6's raised-way pass and of a new
   stage's S4, the retaining walls' high-side tops and the levelled platforms, and the buildings — a stepped one at its
   stack envelope's top, and a building whose Works starts later in the epoch's weeks at its planned finished height,
   since it is committed now (V06 §3.2). It reads volume 6's `EpochScope.built`, `.raised` and `.levelled`. Where a caster
   stands above `groundRefCm`, the participant returns one op `{ op: 'reclearIsland'; island; groundRefCm; altitudeCm;
   elevationRaisedCm }` (V05 §4.2) carrying the rule's result (`elevationRaisedCm` > 0 where the floor failed, a listed
   fate: "raised clear of the aqueduct" naming the caster). It never writes `shadeBasis`: the island's strip keeps the
   basis the epoch's S6 wrote at its start (item 102 (e)'s lag, J-V5.27). The step draws nothing, so the same history
   clears the same islands (T-V5-31 (b)).

A locked island, or a locked `state`, `areaHa` or `altitudeCm` path, is held by these steps (§7.2) — the report lists it
as `held against its supply` when its supply is 0 (J-V5.10).

**The shade over time** (item 102 (e)). Each epoch's S6 re-evaluation is a shade evaluation (V05 §3.19 (6)): it writes
every live island's `shadeBasis` from the island as it stands when the epoch begins — before this step changes it — and
re-reads every strip from those bases, so a resize, a sinking, a raise, a fall or an author's edit since the last
evaluation moves the field one epoch later, and the uses beneath follow by the engine's normal lag (volume 6 schedules
the drift; §4.11's ladder moves the survivors). A fallen island casts nothing from the epoch after its fall; a settled
island casts from its floor altitude, so its strip draws in toward its footprint. An island that step 5 raises casts and
receives no strip until the next epoch's S6, and volume 6's building mask on its lattice likewise starts at the next
field phase (V06 §3.4 (8)).

### 3.16 The fall and the landfall (`fallIsland`)

One `convert` event, as a declared sequence of batches (§4.11), whatever its author (the engine or a hand):

1. **Footprint.** The island's projected land face in world coordinates (`anchor` + the local ring).
2. **Covered set** (J-V5.11). Every ground entity of which at least `landfall.coverShare` of its face or band lies inside
   the footprint, by the kinds of the table below — less every locked or pinned entity and the plots that hold one (kept
   content, as §3.3's fixed obstacles; the ruin laps around them). A reservation or face that is water (a moat, a canal, a
   harbour basin, an oasis) is never covered: the part of the footprint over water leaves nothing on the ground, reported
   ("sank in <water body>"). The part of the footprint beyond the ground frame covers nothing.
3. **Relocation first.** Every use in a covered building or reservation is relocated by §4.11's rule for a step that
   empties a building (a dossier-backed use by the solver's `dossier` request; *Dossier content across epochs*), every
   household by §4.7's overflow pass inside the event — in an epoch, into volume 6's displaced pool with cause `island`
   (V05 §3.15) — the households of the deck plots that fall with their deck included, before their deck falls.
4. **The ground — one outcome per covered kind** (J-V5.11, J-V5.64, J-V5.73, J-V5.79). No edge of the ground's streets and
   plots is added or removed — the tombstoned deck plots' lines excepted, which go with them — so the plan survives under
   the rubble, ready for regrowth. Each change is a listed fate; the event's undo restores it from the undo record
   (§7.4's convert row).

   | covered kind | outcome | how it draws (§8.2) | cleared or restored by |
   |---|---|---|---|
   | building | demolished (cause `convert:fallIsland`) | gone | regrowth |
   | L3 plot (not a deck plot) | its use vacant with the `ruin` treatment | the `fallen` row's rubble over its face | volume 6's landfall clearance (V06 §3.5.2) |
   | reservation (plaza, market, precinct, park, castle bailey) | left vacant under the rubble, the `ruin` treatment | the `fallen` row's rubble | volume 6's landfall clearance |
   | hinterland `LandUse` face | kind `quarry`, owner `commons`, `source` the landfall decoration (§2.7, file f item 253): a surface rubble working that sources no underground quarry system, no mine–cavern breach and no dig-down draw (item 2) | the quarry row | volume 6's `retypeLand` of the quarry face |
   | way (its corridor band) | surface `rubble`, its routing class dropped to `track`, the class it had written to `Way.formerClass` in the `fallIsland` batch — a way already carrying a `formerClass` (a lane volume 6 downgraded) keeps it | its own state rows | volume 6's landfall clearance, which restores the class from `formerClass` and clears it (V06 §3.5.2), or a hand `setAttr` of `class` (V06 §2.8) |
   | wall stretch (its band) | `breached` over its covered length in the enceinte's `condition` (§2.2 rule 5's stretch-state profile, file f item 575): knots at the covered length's ends; a run already `breached` or `dismantled` kept, the ladder only stepping down; over every run the fall changes, the run's last-change epoch `conditionEpoch` written as the fall's epoch — the epoch in force at the `fallIsland` event — over the same stretch in the same batch, its material `conditionMaterial` kept (a `breached` patch keeps its patch row; item 114 (b); §2.7), so volume 6's oldest-patch-first order (V06 §3.7.7) reads the fall as the run's last change; the record's `lifecycle` `decayed` while any run is not `standing` — a state, no edge removed | §8.2's run `breached` row (a break with its rubble spill) | volume 6's repair of a breached ring in use (`repairWall`, V06 §3.7.5) |
   | tower; gate of any kind (`main`, `postern`, `water`, `gatehouse`, `castle`) | no state of its own (§2.7): the `breached` length on its stretch is extended over the chord of its footprint along the trace, so every covered tower's vertex and gate's junction lies inside a `breached` run; one covered while its stretch is not has `breached` written over its footprint's chord alone | by its run's `condition` | standing again with its run (V06 §3.7.5) |
   | bridge, pier, mole or quay-platform deck | `ruined` (the deck falls; under a bridge the river stays one L0 face and the way's crossing is closed) | its own state row | volume 6's `repairRaised` (item 246) |
   | deck plot on a covered deck | falls with its deck by item 110 (d)'s least disruption: its households relocated first ((3)), its building demolished, the plot **tombstoned with the deck**, as volume 6 does for a struck deck (V06 §3.19.5 (3)); never a vacant plot left on a ruined deck | nothing | a repaired deck re-offers its faces; the buildings raised on them are new lineages (V06 §3.19.5 (1), (4); V02 §3.16 (7)) |
   | raised span (its deck band's plan projection, in a ground part ≥ 1) and raised-way pier (its footprint; a crossing station's support is its wall stretch, §2.7: the wall row's breach) | `ruined` (item 244's span and support `state`); a span whose pier is ruined — or whose crossing station's stretch the wall row breaches — becomes `ruined` with it (arches fall with their piers, whatever their own cover); a raised way with a ruined span has its crossing closed — it has no junctions with the ways beneath, so the `track` fallback does not apply to it, and the ways beneath are touched only where the footprint covers them; an aqueduct ruined this way loses its terminal's supply, a listed fate ("the fountain in <square> runs dry") | item 110's state rows | volume 6's `repairRaised`; the vaults beneath follow the span's state by volume 4's rule (this volume writes nothing underground) |
   | `RetainingWall` stretch, generated or drawn (its band) | `decayed` over its covered length (item 245's state, the `breach` op's result; a state, no edge removed), keyed by the wall's lineage address, so a later re-derivation of a generated wall keeps it `decayed` until an epoch's restoration re-derives it (V06 §3.19.4 (6)); a drawn wall is restored by hand | its state row | volume 6's restoration or `repairRetaining` |
   | another island's ground landing plot, yard or access foot | the plot's use closed with its building demolished like any covered building; in the `fallIsland` batch the access is re-landed as a move re-lands it (V05 §4.2): a slanted access at the nearest admissible point outside the covered set within its run; a vertical access becomes a `ropeway` from the same top where its row admits one, else F-SKY-ACCESS's ladder from its top; an access no rung places is dropped, reported, and an island left with none is reported `unreachable` (V05 §3.17) | its new landing's rows | its island's own re-derivation (V05 §3.10) |

   **Inside an epoch** the op's ruined raised parts are lifecycle entries of the epoch event, so they stand in
   `EpochScope.raised` (V06 §2.1), and volume 6's raised-way pass reads an aqueduct's lost supply at that epoch's
   `raisedWays` step (V06 §3.19.2 (4)); after a hand `convert`, at the next epoch's.
5. **The landfall record** (§2.7, file f item 252; J-V5.76). One ground `Decoration` of kind `fallen_island` whose
   `members` (`DecorationMember[]`) are the covered plots, land uses, reservations, ways and retaining walls, each by its
   `Id`, and the covered raised spans and raised-way piers, each by its raised way and item 244's support keys (`{ raised,
   span: [a, b] }`, `{ raised, support }`) — never a deck plot, which is tombstoned with its deck and listed as a fate,
   nor a crossing station's support, which is its wall stretch (the wall row) — `source` the island's address and
   `name` the grammar's fallen form of its name. Each member leaves the list in the
   batch of the op that ends its cover (volume 6's member-leaving `setAttr`, V06 §3.5.2; J-V6.108). §8.2's `fallen` row
   draws its rubble over the members' faces and bands — a raised member's the span's deck band in plan or the support's
   `ring`; the walls with their towers and gates by their runs' `condition`, the bridges, raised parts and retaining walls
   by their own state rows. While a member stands, its face is no admissible ground for an access (V05 §3.10 (3)).
6. **The salvage ledger** is credited with `stone` = the covered land area × `stoneM3PerM2` m³, `from` the island (§2.7's
   `MaterialLedger`), so later building within the haul radius draws on it and §4.11's salvage demand weighs clearance
   near it.
7. **The sky.** Every entity of the island's arena — its own retaining walls and its bridges' deck plots included — and
   its accesses become tombstones (cause `convert:fallIsland`); each ground landing's use closes (`closeUse`), the landing
   house left vacant to step down the ladder; the island record stays live at its address with `state: 'fallen'` and
   `landfall` set, its slot freed.
8. **Undo** restores all of it from the event's undo record (§7.4's convert row) — each covered way's `class`, surface and
   prior `formerClass` (absent again where the fall wrote the first), each covered enceinte's `condition` and
   `conditionEpoch` profiles (its `conditionMaterial` untouched by the fall) and `lifecycle`, each covered retaining
   wall's `state`, and each re-landed access of another island.

### 3.17 Failure ladders (the F-SKY rows of §5.2, file f item 331) — never a whole-map retry

| class | where | detection | ladder (in order) | test |
|---|---|---|---|---|
| F-SKY-FILL | S7b (5) | the fill cannot reach `minAreaHa`; an institution's row does not fit | take the next eligible band → try the next reason candidate (V05 §3.4) → close the slot, rows returned to the demand, reported | T-V5-4 |
| F-OUTLINE (base) | S7b (5) | the island's outline is not simple, or the secant step does not reach `A` within 1 % | §5.2's rungs | §13.2's outline property test |
| F-SKY-PLACE | S7b (5) | no candidate passes V05 §3.7 (2) | halve `gapM` → admit `core` at weight 0.3 → shrink `A` by 20 % and redraw the outline, at most twice → close the slot, rows returned, reported (the reachability test is never relaxed: an island placed by rule always has an admissible access site) | T-V5-5 |
| F-SKY-TERRAIN | SKY | the river's descent stalls or cannot reach the rim | double the tilt → carve a straight bed along the axis to the rim → no river, reported | T-V5-7 |
| F-SKY-ACCESS | SKY, SKY-F, a landfall (V05 §3.16 (4)) | no admitted kind at a top; no land foot (a foot or yard meeting a deck face, a raised-way pier, a raised deck's plan within `deckGapM` or a landfall's rubble counts as none); a slanted access under `lineClearM` over a raised deck or pier; a landing attach unreached by a walkable part-0 way | the next direction step of `accessSiting.turnStepCdeg` either way, up to ± `turnMaxCdeg` → the other kinds of the row set → a foot at the nearest admissible land point within twice the row's run → the attach repair lane on its arena (V05 §3.12) → the access dropped, reported (an island keeps at least one where any rung passes; one with none is reported `unreachable` — never an island placed by rule at SKY, V05 §3.7 (2)) | T-V5-8, T-V5-14 |
| F-SKY-UNIT | the unit run | households the unit run cannot house; a run that makes no district | volume 1's F-UNIT ladder first; the rest re-placed on the ground by §4.7's overflow pass as a relocation, reported | T-V5-9 |
| F-SKY-CLEAR | the clearance rule (SKY-F, `sky.clearance`, a ground edit beneath) | a caster placed after SKY stands above `groundRefCm` under the solid | V05 §3.9 (5): raise `groundRefCm` keeping `elevationCm`, raise `elevationCm` only where the floor fails (a lock holding it, listed); `shadeBasis` untouched, reported `shade basis behind: clearance` → at P0, V05 §3.9 (5)'s allowance fallback | T-V5-10, T-V5-21 (h), T-V5-31 |
| F-SKY-CRYPT | SKY (the institution claim), every re-claim, SKY-F's re-test at the levelled datum | no claim site of an `always`-crypt instance passes the crypt test (V05 §3.10 (5)) | the best site by score with the half-sunk crypt (volume 2's basement ladder: full → half → raised), a listed fate → never a missing crypt | T-V5-26 |
| F-SKY-SHADE | every shade evaluation | a strip's window passes the receiver raster's frame and margin; a sample's shadow is capped (V05 §3.19 (1)) | clip the window to the raster (beyond it there is no field to shade), reported as the clipped share → nothing further: a strip never fails and never stalls the field | T-V5-19 |
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

**A removed slot draws nothing** (V05 §3.2 (6)): its `slot:k` and `reason:k` indices are skipped, and every other slot's
creation indices are unchanged, so removing an island never moves another island's draws. `sky.clearance`,
`skyAccessObstacles`, the removed-ordinal skip at re-siting, the landfall's re-landing of another island's access, the
strips (V05 §3.19) and the route distance (V05 §3.20) draw nothing: they are pure functions of committed state (the strips
of the persisted `shadeBasis`, never the live island), the model sampler and `dmath` (§6.5), the strips reading the tiers
without their roughness. The island's gradient (V05 §3.11) draws only its ε on `field.chance`. With one island only, its
draws are slot 1's and its own lineage's, and every index above stays distinct (§6.1's distinctness test runs a
sky-island fixture). **Every choice by score or order breaks its ties the same way** (J-V5.12): among islands by slot,
then address; among sites and lattice cells by lattice y, then x; among districts by address. The tiers' roughness uses
`dmath` noise keyed by the island's render key — view data outside every digest (§6.2) and the same on every engine
(§6.5). So do the looks of items 117, 118 and 120 on the islands (V05 §5.1, V05 §5.6): their only draws are §8.2's render
draws (`RH32` over the island entities' render keys), so no week, festival or Find chip moves a model draw. The part number is minted once and recorded in the address (V05 §2.1); `raiseIsland` keys the island by the
town's lineage, the slot and the epoch (J-A8.61), so the same history raises the same island. §13.3's goldens gain the two
sky fixtures of T-V5-15.

### 3.19 The island's shade strip (the owner's item 102 on the island's side; J98's underside)

`islandShadeStrip(doc, island, samples, onto) → IslandShadeStrip` (`@plat/sky`, V05 §2.3a) — a pure function, no draw:

1. **The samples** are §4.5's model sampler (file f item 296): its sun positions, its points per 32 m field cell and its
   per-cell layout, whatever it holds (J-V5.42). Each sun gives the horizontal unit vector ŝ toward the sun in the model
   frame (x east, y north) and the reach `c = min(cot altitude, 8)` — the sampler's cap for every model-side source, so
   the one OR-ed mask follows one reach law (J-V5.44). Below, "sample `s`" is one sun and "the cell's point" one of the
   sampler's points. Wherever a reader counts "the samples a cell is blocked for" (the clerk, the shade map's three
   areas, the CSV, T-V5-19), it takes the mean over the cell's points of the suns blocked at each — with one point, the
   count itself.
2. **The solid — from the caster's `shadeBasis`, never the live island** (J-V5.47). The tiers without roughness —
   `undersideTiers(basis, { rough: false })`, the view's own function (V05 §3.9 (2)) evaluated on the basis's rim polygon,
   underside, anchor and elevation with the roughness term at 0, so the model never reads view data (J-V5.30); an island
   without a basis has no solid here and casts nothing: tier 0 the rim from the basis's `surfaceTopCm` down to `elevation
   − rim`, tiers 1 … n down to the apex (none for `flat`). Each tier's ring is rasterised once into a bit mask of
   `shade.ringMaskM` cells in the island's local frame (scanline fill; a cell is in when its centre is), with the tier's
   span [`b_i`, `t_i`] in centimetres above the ground datum; a tier whose ring sets no mask cell blocks nothing.
3. **The receivers.** Onto the ground: the field raster's 32 m cells (§4.5), each at each of the sampler's points `x` in
   it and the ground terrain's height `g(x)` there (bilinear on the committed terrain raster **as the field reads it —
   S1's heights with the T2 terrain strokes, unlevelled**; item 110 (a)'s levelling is a platform datum, never a receiver
   height, so a strip computed at S10a, before S10 and S11 level anything, equals the one a load rebuilds after them; §4.7,
   file f item 309; J-V5.65). Onto an island: the receiving island's 32 m lattice over its land face at the receiver's own
   `shadeBasis` (its anchor and elevation), each at the island's terrain height there plus that datum — a receiver without
   a basis receives no strip; only an island whose apex lies above the receiver's surface top casts onto it — an island
   never shades upward.
4. **The test.** Point `x` is blocked at sample `s` when the ray from (`x`, `g`) toward the sun meets a tier. For each tier
   with `t_i` > `g` (one wholly below the receiver blocks nothing), in order from tier 0 down: the ray's horizontal track
   across the tier's span runs from `x + (max(b_i, g) − g) · c · ŝ` to `x + (t_i − g) · c · ŝ`; it is walked in steps of
   at most `shade.stepM`, both ends included, each point moved into the island's frame (less `anchor`) and looked up in
   the tier's mask; the first hit sets bit (point · suns + `s`) and ends that point's test for that sample. All
   arithmetic is integer centimetres and `dmath` (§6.5), in a fixed order: samples in the sampler's order, cells
   row-major, points in the sampler's order, tiers 0 → n.
5. **The window.** Only cells that can be blocked are tested, sample by sample. The corridor is the solid's bounding box
   (the union of its tier rings) swept away from the sun by `ŝ · c` × [`b_n` − `g_max`, `t_0` − `g_min`] (`g_min`, `g_max`
   the terrain's extremes over the frame — a safe bound), in receiver cells, clipped to the receiver raster (F-SKY-SHADE).
   **Each corridor cell is first pre-tested in O(1) at its own height** `g(x)`: its ray's track across the solid's full
   span, from `x + (b_n − g) · c · ŝ` to `x + (t_0 − g) · c · ŝ`, must meet the solid's bounding box, else the cell is
   skipped without a tier walk — so in mountainous relief the low cells far from the island cost one segment–box test
   each, and no blockable cell is missed (the pre-test is exact for the box, which contains every tier; J-V5.59). The
   strip's stored `window` is the bounding box of the cells that passed the pre-test over every sample; with none, `w` and
   `h` are 0 and `cells` 0.
6. **When — the shade evaluations** (the one home of the schedule; J-V5.27, J-V5.71, J-V5.72). Each evaluation first
   writes the `shadeBasis` of every live island (not fallen, not removed) from the island as it then stands, then computes
   every strip from the bases, and records itself in the bases' and strips' `epoch` and `by`:
   * **`generation`** — SKY's last step, after every island's own steps: the bases and the strips onto the islands; the
     strips onto the ground follow at S10a from the same bases.
   * **`rederive`** — a re-derivation that runs SKY, as generation; a re-derivation starting after SKY and at or before
     S10a: at S10a's start, before step (i) and every hook, the bases of every live island, then the strips onto the
     islands (never by pass 2, so no hook of S10a reads a strip built from the old bases).
   * **`epoch`** — each epoch's S6 re-evaluation, for every island not fallen or removed, from the island as it stands
     when the epoch begins (V05 §3.15).
   * **`update`** — Update shade now (V05 §4.2), for its one island: that island's basis, its strips onto the ground and
     onto the islands beneath it and, where it had no basis, the strips onto it from the islands above; the document's
     current epoch recorded.
   **The strips onto the ground are computed once per evaluation, at their first read** — volume 1's S9b at S10a's
   `afterDrivers` hook, between step (i) and field pass 2, where it is registered (its manor sun factor, V01 §3.5.5), else
   field pass 2 — by the one pure call, and **held** for pass 2's fold and every later reader of the same evaluation (the
   hood pins' shade gate and `DistrictContext.shade.islandShare`, V01 §3.8.2, V01 §2.3): S9b's strips and pass 2's are the
   same held strips, bit for bit (T-V5-21 (h)). An island without a `shadeBasis` — raised or declared since the last
   evaluation — casts and receives no strip until the next evaluation writes one. The strips are computed whatever `w_sun`
   is (0 included) — the fold multiplies by the weight — so the shade view always reads held strips (V05 §5.1). **No other
   event writes a basis or a strip:** an island edit, a scoped regeneration of an island and the clearance rule leave every
   basis and every strip where they were until one of these evaluations, and on load or replay the strips are rebuilt
   from the persisted bases (§2.9). **A ground terrain edit** (T2 on the ground key, a terrain conversion of §4.11) moves
   the receiver, not the caster: over its effective scope it re-reads every strip's bits there from the unchanged bases,
   with the field it recomputes, so the session's strips always equal a load's rebuild (T-V5-21 (h)); item 110 (a)'s
   levelling moves no receiver at all.
7. **The fold into the field.** For each ground cell, each bit of the daylight term's mask — pass 1's terrain and wall
   shade (item 102 (b), (c)) and, after an epoch, volume 6's building shade mask on the same layout (V06 §3.4) — is OR-ed
   with the same bit of every strip covering the cell, so a point shaded by a hill, a house and an island at the same
   sample counts once (J-V5.38); the term's shade share is the mask's popcount ÷ `bits` (§4.5 *Fields*). The **island-free
   value** — the same composition with the strips left out — is what the supply law reads at an epoch (V05 §3.15 (1));
   at generation S7b (5) reads pass 1, which has no island bits by construction. **On an island** the same fold makes
   `shadeSky`: the strips onto it OR-ed, sample by sample, with — after an epoch — volume 6's building shade mask run on
   the island's 32 m lattice, the island's own buildings casting onto its cells by the same law and cap (item 102 (b); V06
   §3.4 (8); J-V5.33).
8. **The basis.** Each strip records the §6.2 hash of the bases it read (V05 §2.3a). The shade map view (volume 9) and the
   clerk compare the caster's with the hash of the same fields read from the live island: equal — the field shows the
   island where it hangs; different — the field still reads it where it hung at the last evaluation, the view draws the
   current strip as pending (V05 §5.1; the one reader of the live island's shade) and the clerk answers "The ground
   beneath will catch up the next time the town changes over time", offering **Update shade now** (V05 §4.2, V05 §4.5).
9. **What it amounts to** (the owner's "not a hard and fast rule"). The strip only sets bits; the weight is §4.5's `w_sun`.
   At latitude 50° and the equinox the nine default samples stand at 6.4°, 18.7°, 29.5°, 37.2° and 40° (from the solar
   geometry): the five midday ones reach 1.2 to 1.8 times a caster's height, the mid-morning and mid-afternoon ones about
   3 times, the first and last are capped at 8 times. So an island whose underside hangs 100–160 m above its ground blocks
   the cells just north of its footprint for about three to five of the nine samples and sweeps far to the west and east
   for one sample each at the day's ends: its under-hang is a crescent north of it (south of it in the southern
   hemisphere), lowered by a third to a half of item 102's all-day amount. A `root` underside lengthens the crescent under
   the low samples and a `flat` one shortens it — J98 carried into the model as it is into the picture (V05 §5.3). This
   paragraph is a derivation from the defaults, PLAUSIBLE until T-V5-19 measures it.

### 3.20 The siting rulebook on and across the island (the owner's items 103–105, 107 where they reach islands)

The one placement solver (§4.7 S10b) places everything on an island, in the unit run, with item 103's rulebook; this
volume adds only what the rulebook cannot know — that the island is reached by a ride, and what it never carries.

1. **The route distance** `skyRoute(doc, from, to) → { lengthCm: Cm; access: Id }` (`@plat/sky`; the implementer of §4.7
   S10b's reads between arenas, file f item 308; J-V5.36). From a point `p` on island I to a class `c` on the ground: the
   least, over I's admitted accesses `a`, of `d_I(p, attach_a) + transferM + run_a + d_G(foot_a, c)` — `d_I(p, attach_a)`
   the island leg, the straight distance × the rung's detour factor (§4.7's `street` law for a point-to-point leg);
   `transferM` the route's allowance for the wait and the loading (`routing.transferM`); `run_a` the access's run (V05
   §2.2); and `d_G(foot_a, c)` the base's mode distance from the foot to the class (§4.7 S10b's *Supply distances by
   mode*): `street` where the foot and the class stand on the same side of the town wall, else `road` through the gate by
   which the class is reached. A class on the island itself is read on the island's own class distance rasters (the unit
   run's S10b builds them as the base's). `access` is the access of the least sum (ties by ordinal), which the clerk names.
   From a ground point to a class on an island: the same sum the other way; inside the pooled S10b — before the island's
   placement exists — the island's class stands at its land centroid (`d_I(attach_a, centroid)`), so the ground pool reads only what exists before
   it (§4.1's laziness contract); after generation (post-build requests, epochs) the placed plots are used. Between two
   islands: through the ground, both legs and two transfers. A `river` or `sea` supply edge never crosses arenas (∞): the
   island's conjured river and spring pond carry no trade and **satisfy no NEEDS row** (J-V5.23).
2. **Admitted accesses.** An access in state `open` (its `unserved` reading included); never a `closed` or `ruined` one. A
   `secret` access admits only the pulls of classes whose clientele is clandestine (item 103 (a)); a `guarded` access only
   its institution's own supply edges and the law-and-enforcement classes' rows. An island with no admitted access routes
   nothing: every cross-arena distance from it is ∞, reported with the island's `unreachable`.
3. **Which families read it.** The route distance serves SUPPLY (the supply edges under the `street` and `road` modes),
   CLIENTELE (the island's `dist.market`, `dist.plaza` and `dist.gate`), COMPETITION and COVERAGE (the distance between
   members; a walking radius — the route to the ground passes every walking radius, which is why a walking-radius row
   counts the island as one unit, V05 §3.5 (3)), ALIGNMENT (law against crime, sacred against profane, elite against
   common: people walk and ride) and every signature pair of item 103 (b) whose two ends stand on different arenas. The
   nuisance families (EMITS against SENSITIVE-TO; upwind and downwind) read the straight distance in three dimensions —
   the horizontal distance and the elevation between the two points — since smoke and smell rise and noise carries through
   the air; upstream and downstream never cross arenas.
4. **What an island never carries** — the rows of `IslandRule.carry.never` (V05 §3.5 (3) (a)); their demand stays on the
   ground. What may split is (11)'s.
5. **The landings.** `sky_landing` and `sky_landing_top` are placed by their accesses (V05 §3.10), never by a pull; their
   siting facts (V05 §2.4) act on their neighbours through the families, so noise-sensitive homes keep a little away from
   a hoist house and the classes that serve the island gather near its landing yard by the route distance.
6. **Custom institutions** (item 104). A custom kind on an island reads its resolved profile as any class does; the
   island institution rows take it by its scene archetype (V05 §3.4). Nothing custom can stall the sky: an unplaceable
   preference is reported with the closest options (item 104 (d)).
7. **The island's own placement is not the solver's** (J-V5.34). V05 §3.7's score places the island as one body over the
   ground plan at S7b (5), before any plot exists, so it reads no family; its purpose terms are the island-scale reading
   of those institutions' profiles, and volume 11 writes their values with the profile as their provenance.
8. **"Why is this here"** (item 103 (e); V05 §4.5): a use on an island names the rows that pulled it, and a pull that
   crossed arenas names the landing it went through and the route length ("near the mill below, by the east hoist, 340 m
   by route").
9. **Supply chains across the island** (item 104 (h); J-V5.39). An ACTIVE custom chain (item 104 (b): every node present
   in the dossier) — and, for a dossier-backed town, each of the dossier's `activeChains[]`, its processors resolved by
   kind family (item 105 (i); volume 8) — is placed as one connected thing by the base's chain rules; the island changes
   five things and nothing else.
   (a) **What goes up.** Never a chain's RESOURCE node — it sits at its terrain feature on the ground (item 104 (h) (1));
   the island's conjured water is never a chain's feature — nor its PROCESSING nodes, whose demand stays on the ground
   with the working steps (V05 §3.5 (3)); its FINAL SELLER and CONSUMERS follow the proportional share like any class. The
   one exception is the island's own institution: a custom kind carried as a `tower`, `palace` or `cathedral` that is also
   a chain node, at any step, stays on its island and keeps every link by the route.
   (b) **The links cross by the route.** Every link between a node on an island and a node on the ground is a supply edge
   of mode `street` measured by `skyRoute` — so the chain's last ground node leans toward the landing foot whose route to
   the island's node is shortest, and the island's node toward that landing's top. Item 104 (h) (2)'s natures act on the
   route as on a street: a perishable link's short reach holds its ground end close to the landing; a bulky link's water
   and main-road preferences never cross arenas (∞, (1)); a valuable link's security pull counts a `guarded` landing as a
   secure site and an `open` public one as none.
   (c) **Order.** Placement runs upstream first (item 104 (h) (4)). At generation the island's unit run reads a ground
   supplier as the pooled S10b reads any provider — the block whose S10a allocation holds it — and the ground pool reads an
   island node at the island's land centroid; a post-build request and an epoch read the placed plots on both arenas. The
   flow order is measured along the route: a chain's final seller on an island stands at a smaller route distance to its
   market than the chain's resource does, in at least the share the base's ground-only bar declares (T-V5-24).
   (d) **Shape** (item 104 (h) (3) as revised by item 107 (e)). A chain whose in-town nodes lie on two arenas sits close
   at street scale on the ground and STRETCHES through its landing, the landing one step on its road; it is never read as
   close across the arenas. It is named a quarter only past item 72's quarter-identity threshold, or by the dossier or the
   author — and then on the ground (volume 1's reading); no quarter is ever assigned to it by rule.
   (e) **Endpoints, services, change, declarations.** An import or export endpoint's store stands at the ground's gate or
   quay facing the partner (item 104 (h) (6)), never at a landing. A custom service `providedBy` an island institution sits
   inside it on the island (item 104 (h) (5)). A chain that deactivates leaves its island nodes where they stand, their
   pulls removed; one that activates places its new nodes against the standing ones, upstream first, an island node by the
   solver's positive placement on the island's arena (§7.7's `placeAt`) — never a unit run, never by moving, resizing or
   re-deriving an island (item 104 (h) (7)). An author's map-side declaration of a custom kind onto an island (item 104
   (a) (1)) is T6's `assign` with `criteria.sky` (V05 §4.2), keyed by the kind's `localUid`, held as every declaration is
   — it may place a processing node up, the author's word outranking (a), with the fate "this chain now crosses the
   hoist" listed at its dry run.
10. **The supply web across the arenas** (item 105 (a)–(e); J-V5.50). Every link binds, pulls and explains across an
    access exactly as on the ground, with the route as its distance and the access as the place where its end is felt:
    (a) **Binding.** Each consumer member binds to its NEAREST provider member of the good by the edge's mode (items 105
    (a), 107 (c)), measured by `skyRoute` when the two stand on different arenas, ties by provider address.
    (b) **Both ends pulled, at the access.** An island consumer counts toward its ground provider's weighted centre (item
    105 (b)) at the **foot** of the access its route used, weighted as its link; a ground consumer bound to an island
    provider counts at that access's **top** — never at a world position beneath the island, where no goods go.
    (c) **Orientation, several outputs, hubs** (item 105 (b)–(e)). A class's orientation and its per-good pulls act
    across the arenas through the same substitution; a balanced class's "junction where its input and output routes
    meet" may be a landing — its foot on the ground, its top on the island — scored, never forced.
    (d) **Status.** A link of one of the dossier's `activeChains[]` that is `impaired` or `vulnerable` weakens by item 105
    (i)'s status table on the route as on a street.
11. **Split works and shops across the arenas** (item 105 (h); J-V5.51). A split class carried by V05 §3.5 (3) (c) is one
    item on two plots on two arenas: its works on the ground by its nuisance and input rows, its shop on the island by its
    output and clientele rows, the shop's `Use.branchOf` naming the works' use; the route between them is its own link.
    Every lifecycle path covers both, as item 105 (h) requires: creation by S10b as one item (the pooled S10b places the
    works, the island's unit run the shop, reading the works at its S10a block); a state, closure or removal of the
    institution reaches both; a relocation moves each by its own rows; a fall or a delete of the island relocates the shop
    (the works stays); undo restores both; the author or the clerk may merge them back onto one plot by a map-side
    declaration (on the ground; up only by an author's held T6 declaration, with the fate listed); migration: an absent
    `branchOf` is no split. Every split across the arenas is reported.
12. **Order, the district term and spread, per arena** (items 105 (f), (g) and 107; J-V5.52).
    (a) **Order and relaxation.** At generation each arena runs item 105 (f)'s order and its one bounded relaxation on its
    own — the pooled S10b on the ground, the unit run's S10b on each island — each reading **only the other arena's
    proxies** (an island's classes at its land centroid; a ground provider at its S10a block), never the other's placed
    plots, so neither waits on the other and both are byte-stable whatever the worker's interleaving (T-V5-22 (j)). After
    generation both read the placed plots on both arenas, one arena's relaxation holding the other's placements fixed.
    (b) **The district term** (item 105 (g); J-V5.75). S7b (1)'s supply term reads a sky pseudo-district as one consumer
    location at its island's **land centroid's world point** (`anchor` + the outline's centroid, fixed by S7b (5)'s
    placement) — the proxy the ground pool reads for an island's classes — since the landing feet are sited only at SKY,
    after S7b. Its carried classes' links are scored there against the providers already allocated, by the centroid
    distance volume 1's χ̃ reads at S7c (V01 §3.2 (5)) — no route, since no access exists yet — so the ground districts
    beneath and beside the island gain a little supplier affinity, at the term's low weight, never past J-A72.46's
    dispersal.
    (c) **Near enough** (item 107 (b)). A cross-arena link's satisfaction plateaus on the route length: full within the
    good's `comfortM` of the summed legs (`transferM` counted inside), decaying to 0 at `maxDistanceM`.
    (d) **Spread** (item 107 (a), (d), (f)). Coverage counts an island's districts as districts (V05 §3.5 (3)), and a
    spreading class's same-kind spacing applies inside each island district as inside a ground district; an everyday
    service's link to its supplier across the arenas keeps its generous `comfortM`, so an island apothecary is never
    pulled down to the herbalist below.
    (e) **Quarters never assigned** (item 107 (e)). No island district is made a quarter by rule. A dossier QUARTER record
    (item 108 (a)) or district-defining record (item 72) binds to ground districts when records bind, before any island
    district exists; the author may bind one to an island district by T5 with `sky` and the record's kind (V05 §4.2),
    held with its fate.

### 3.21 The rim as a barrier (the owner's item 106 where it reaches islands; J-V5.49)

An island is barrier all round: its rim is a sheer drop, and its only approaches are its landing yards.
1. **The rim is a barrier edge.** For item 106 (a)'s closure and every "enclosed" or "sealed" test, the island's `rim`
   chain is a natural barrier of kind `sheer` (J-VI.3; §2.7's `BarrierKind`) — closure only, no wall; volume 11's
   `walls.barriers` row keyed `sheer` gives its defensibility class and wall `none`. The clerk's `closure` answer names it
   as barrier `sheer` (§11.2's `WhyAnswer.closure`).
2. **Generation never walls an island.** No stage lays an enceinte on a sky arena; the island's defence is its rim and
   its landings. A prison island's is its rim plus its `guarded` landing, the one approachable arc, whose role already
   admits only its institution's and the law-and-enforcement classes' rows (V05 §3.20 (2)).
3. **An author's wall on an island** (T3 `wall` in one of its **enclosure** kinds with the `key` parameter naming the
   island; `drawWall` with `key`, V05 §4.2) is an `Enceinte` of closure `barrier` on the island's arena — T3's `retaining`
   kind and a T2 terrace stroke's edge are never enclosures and lay an island `RetainingWall` instead (V05 §3.22 (4)): its
   approachable arcs are the landing yards' frontages — each landing yard is closed across its inner side by one stretch on
   the rim strip's `setback` line, both ends anchored on the rim (a tower at each anchor, item 106 (a)'s anchor rule) and a
   gate at the yard's attach — and every other arc of the rim is closed by the barrier, with zero wall edges. The tool
   snaps the stroke's ends to the rim and shows the rim arcs as part of the circuit (item 106 (g)); a stroke drawn along
   the rim away from a landing is bent at its dry run to the landing stretches only, with the line "the drop is the wall
   here" (J-VI.4), and a stroke that crosses the island's interior is an inner wall laid as drawn (§4.8's furniture). The
   stretch profile (item 106 (c)) grades each stretch: the full curtain across a landing yard, the strongest towers where
   it meets the rim. Adding or removing an access re-evaluates the circuit by item 22's least disruption: a new landing
   gets its stretch and gate, a removed one's stretch is removed (listed fates).
4. **The clerk** explains an unwalled rim: "the drop is the wall here" (V05 §4.5).
5. **The no-op pin.** With item 106's `barrier` closure and the stretch profile off, an author's island wall is the base's
   ring along the rim strip's line, byte-identical to the base (T-V5-27).

### 3.22 Item 110 on, under and against the island (the owner's "they go in")

The base carries item 110 (a)–(d) (§2.7, §4.3, §4.7 S10–S11; file f items 244–246, 290, 309); volume 1 carries terraced
wards and the unit run's levelling, volume 2 stepped massing and deck buildings, volume 4 the vaults under raised ways, and
volume 6 all of it over epochs. The island meets item 110 in the places below; each rule here is this volume's,
everything else of item 110 is theirs, and none of it changes a ground value while the island setting is off.

1. **Casters under an island.** Everything item 110 raises above the ground is a caster to the island's clearance: a
   raised part's deck top with its parapet, or an aqueduct's channel wall, over the deck's plan, and its raised-way piers
   (item 110 (b)); a retaining wall's high-side top and a levelled platform's datum where fill raises it (item 110 (a)); a
   stepped building's highest massing tier, read from volume 2's stack envelope (item 110 (c); V02 §3.15.2). They are read
   at SKY for what exists then (V05 §3.9 (3); every generated raised part, by §4.3's slot), at SKY-F for what the pool
   and the unit runs placed, after every epoch's growth (`sky.clearance`, V05 §3.15 (7)), and by any edit that adds one
   beneath (V05 §4.3) — each time by the clearance rule (V05 §3.9 (5)). Their heights are volume 11's raised-way, terrace
   and massing-tier rows; the caster allowance's P0 measurement runs with them on.
2. **The island yields, never the city** (J-V5.68). No raised part, retaining wall or building is moved, lowered or
   refused because an island floats above it: the island's `groundRefCm` rises to clear it and its elevation follows only
   where the floor needs it. The raised-way generator treats an island's projected footprint as open air; only the
   accesses constrain its courses ((3)). A caster removed beneath an island re-reads `groundRefCm` and never lowers the
   island (V05 §4.3).
3. **The accesses and the decks** (J-V5.60, J-V5.61).
   (a) **Feet on part-0 land only.** Admissible ground for a foot, a landing yard and S7b (5)'s reachability transform
   excludes every raised-way pier footprint, every raised deck's plan dilated by `accessSiting.deckGapM` and every deck
   face of item 110 (d) (V05 §3.7 (2), V05 §3.10 (3)–(4)); "the nearest way" is a walkable part-0 way.
   (b) **Rope lines clear the decks.** A `ropeway` or `lightBridge` keeps `accessSiting.lineClearM` over every raised deck
   and raised-way pier its segment crosses, at SKY and after (V05 §3.10 (3)).
   (c) **The accesses as overhead obstacles.** For every raised part laid after SKY, `skyAccessObstacles(doc)` (V05 §2.3b)
   is read by its two callers (file f item 290 (5)): item 110 (b)'s course solver — at an epoch's raised-way pass (V06
   §3.19) or a new stage's S4 in an epoch — which keeps the deck, its parapet and its raised-way piers out of every column
   dilated by `deckGapM` and under every segment by its `clearCm`, re-routing by its own ladder and otherwise not building
   the part (reported "would cut <island>'s hoist"); and T4 `road`'s `raised` dry run (and the aqueduct class), which
   re-routes or, failing that, ends the course at its last ground vertex before the column with the line "this would cut
   <island>'s hoist; it ends here" (J-VI.4 (f)). An access placed or moved later (`placeSkyAccess`, a move,
   `setAttr(ground.at)`) meets the standing raised parts by (a) and (b) at its own dry run.
   (d) **No raised way reaches an island.** A raised part's two ends are its feet on ground part 0 (§2.7's
   `RaisedWayRecord.feet`; item 110 (b)); a T4 `raised` or aqueduct stroke that ends on an island's rim makes no way and
   is bent into a sky access (V05 §4.2; J-VI.4 (d)), so II.1's "sky: no portals, no roads in or out" stands.
   **No raised part stands on an island:** item 110 (b)'s decks live in ground parts ≥ 1, and the sky layer has one part
   per island (V05 §2.1); a T4 `raised` or aqueduct stroke on an island's key is bent (J-VI.4 (e): `raised` dropped, the
   aqueduct made a fountain pin), with V09 §4.9's lines `bend.raised.onIsland` and `bend.aqueduct.onIsland`.
   **No access is a way** (V05 §2.2).
4. **The island's own retaining walls** (J-V5.69). Volume 1's unit run levels island ground by item 110 (a)'s thresholds
   (`terrace.slopeMin`, `terrace.stepMinCm`, volume 11's rows, read unchanged), which on the island's gentle dome and
   quarter-amplitude echo (V05 §3.8 (3)) bite mainly on an `own` relief of a steep class; a terraced edge is laid only
   where the island's relief class — `terrainEcho.reliefClass` for `own`, `plain` for `echo` and `none` (V01 §3.17.7
   (2)) — asks for terraces. Each retaining wall it raises — and each one an author draws with T3's `retaining` kind or as
   a T2 terrace stroke's edge with the island's `key` — is a `RetainingWall` on the island's arena (§2.7, file f item 245).
   **Never on the rim strip or along the rim:** the levelling stops at the rim strip's `setback` line, and a retaining or
   terrace stroke that meets the rim strip or runs along the rim is bent at its dry run (J-VI.4 (g); V09 §4.9's
   `bend.retaining.rim`, "The rim walk stays level; the wall stands inside it."): every point of the stroke lying in the
   rim strip moves along the island's radial direction (from the land centroid) to 1 m inside the strip's `setback` line,
   the other points unchanged (V09 §4.20.9; XV-V9-25). The rim strip is never cut (V05 §3.12). The wall is never an
   enclosure, never snapped to the rim and never a member of a barrier circuit (V05 §3.21 (3)). It draws in the island's
   frame and is displaced with it under `offset` (§8.4), its shadow on its low side as item 110 (a) draws it; it
   tombstones with the island at a fall (V05 §3.16 (7)) and exports in the island's `sky` collection (V05 §5.5). The
   surface top and SKY-F's crypt re-test read the levelled heights through `levelledGroundCm` (V05 §3.9 (4), V05 §3.10 (5)).
   A way that crosses it becomes a stair or a ramp by item 110 (a)'s way-class rule, on the island as on the ground.
5. **What the raised-way generator reads of the sky** (J-V5.63; file f item 290 (1), (5)).
   (a) **Endpoints bind to reservations.** An elevated road's endpoints are the reservations — the citadel's site, a
   great temple's or cathedral's precinct — never the institutions in them. S7b (5)'s hand-over keeps the reservation (V05
   §3.5), so a road raised to a precinct whose cathedral later rose to an island stands, and its reason reads through the
   hand-over ("links the citadel and the old cathedral close, whose cathedral rose to <island>"). S7b (5)'s eligibility is
   unchanged: a road holds no institution on the ground.
   (b) **Ground arena only.** At an epoch and in every post-build request, the generator reads ground-arena entities only
   (`PlatKey.layer` `'ground'`, any part) — for its endpoints and for its evidence — never a sky ward, an island
   institution or an island landmark. The test is by arena, never by a list of `sky-*` kinds.
   (c) **The water need by arena.** At generation the aqueduct's need reads the S2 population whole, since S7b (5) has not
   run — a small, deterministic overestimate (a full island carries at most 3 × `H_d` households). At an epoch it reads
   the ground households only: an island's households are never in a ground water need, its water being its own — its
   conjured river or spring pond (V05 §3.8) and any well the unit run sinks on the island's own arena — and no aqueduct
   serves an island.
   (d) **Ground hydrology only.** The aqueduct's source search reads S1's springs and rivers on the ground terrain — an
   oasis's spring among them (item 111 (a)); an island's conjured river, spring pond and waterfall are never "a higher
   spring or upstream river" (a pond 60–220 m up is exactly what a naive search would find), and no aqueduct terminal,
   basin, cistern or fountain stands on an island.
6. **Stepped massing and deck plots on the island.** An island institution may take volume 2's stepped rows (a stepped
   temple, a terraced palace, a tiered tower) through its composition and class rows, as on the ground; the surface top
   reads each point's highest massing tier (V05 §3.9 (4)), and a cathedral's crypt lies under its lowest massing tier,
   inside underside tier 0 (V05 §3.10 (5)). The island's bridges over its conjured river (built by volume 1's unit run,
   V01 §3.10.3 (4)) may carry deck plots by item 110 (d)'s base mechanism, and they fall with the island (V05 §3.16 (7)).
7. **Removals.** A removed generated raised way, retaining wall or deck plot beneath an island holds through regeneration
   and epochs by §2.8's suppression (file f item 260; V06 §2.13); this volume adds only the island's own removals — an
   island or an access that stays removed (V05 §3.2 (6), V05 §3.10 (1), V05 §4.2).
8. **The landfall** covers raised spans, raised-way piers, retaining walls and deck plots (V05 §3.16 (4)).
9. **The no-op pin and the declared shift** (J-V5.67). With item 110's rows off — read as V11 §3.24.0's switch table
   (every `deck.offer` 0, `terrace.enabled` false, the raised-way rows off) — every island value (its altitude, ground
   reference, accesses, strips and landfall) is byte-identical to this volume without item 110, "byte-identical" meaning
   V12 §3.7.8's off-state set. With them on at their defaults, both sky goldens of T-V5-15 change once, a declared shift
   under V12 §3.7.6's rule naming both fixtures: raised ways and retaining walls beneath and on the islands, and
   `groundRefCm` and the altitudes where a raised part stands under a solid.

### 3.23 Edges — every mechanism at its limits (principle (11))

Each row gives an edge of a mechanism of V05 §2–V05 §5, or a combination with another unit's feature, its defined outcome,
its rung on §5.1's ladder (never a whole-map retry) and its test; **T-V5-33** runs one fixture per row that names it.
Degenerate geometry a kernel transaction refuses is handled by the stage's failure class on its ladder (§5.1's general
rule).

**(a) The mechanisms.**

| edge | defined outcome | rung | test |
|---|---|---|---|
| the island record at load | §7.5's validation repairs what one value re-derives from the others: `anchor` snapped to the lattice, `areaHa` re-read from the land face, `altitudeCm` raised to the floor (a fate), `removed` read from `state`, a missing `removedAccesses` read as []; a slot another live record holds is given the lowest free slot, else the record is loaded in state `removed` (its slot held, `generated` false) — each reported | repair locally | T-V5-33 |
| the access record | a top whose rim vertex is gone is re-seated (V05 §4.3); an access whose island is tombstoned is tombstoned with it; a kind the `magic` circumstance no longer admits stays until the next re-siting, which bends it to the nearest admitted kind (a fate); a foot outside the ground frame is re-landed at the nearest admissible foot inside it; the lifecycle is V05 §2.6's rows | repair locally; substitute | T-V5-33; T-V5-16 |
| the unit inputs | an island with no river, no claim (a prosperity island) or one landing carries none, none or one; the view is re-assembled identically after a save, load or replay (never stored) | check | T-V5-9; T-V5-21 (d) |
| the strip | a caster fallen, removed or without a basis casts nothing; a receiver without a basis receives nothing; a mask whose sampler digest differs is recomputed whole; a window with no cell gives `w` = `h` = `cells` = 0; save, load and replay rebuild the same bits | check; retry that piece | T-V5-33; T-V5-21 (h) |
| the rule table | a missing cell reads its default; an edited cell out of range or order is bent by §7.6's cell validation to the nearest valid value (the supply rows sorted by `v` and made non-decreasing in `h` within [0, 1]; `altitudeM` ordered; counts ≥ 1; shares within [0, 1]), the line naming it | repair locally | T-V5-33 |
| identity and lifecycle | V05 §2.5's anchors and V05 §2.6's rows at save, load, undo, redo, regenerate and migrate | check | T-V5-15; T-V5-16 |
| the supplies | with no built district cell `S_town` is 0 and no slot opens (`no supply`); below CITY the gate fails before any supply is read (`gated: rung`), and at an epoch whose rung row is `none` the target is 0 (V05 §3.15 (6)); `supply` is recomputed at S7b and each epoch, restored by undo, and an older record's value is read until the next evaluation | check | T-V5-3; T-V5-33 |
| purpose | no candidate closes the slot (`no supply` / `nothing to carry`); one candidate is taken by the same draw, its uniform consumed; a dossier institution with no roster class of the row's tags counts by its archetype or not at all; the reason is re-drawn only by a Re-derive from S7b, kept by every island edit, restored by undo | substitute; leave out and report | T-V5-4 |
| the fill | the fill stops at its first cap (plot land, 3 × `H_d`, the band's demand) within 100 batches; `A` equal to `minAreaHa` passes and below it closes; below CITY no fill runs; the sky `Allocation` is re-made by a re-derivation from S7b, kept by island edits, restored by undo | leave out and report | T-V5-4 |
| the shape | a secant step that misses `A` by more than 1 % or a non-simple outline takes F-OUTLINE's rungs; a declared lasso that is not simple, has fewer than three distinct points or zero area is bent at its dry run to the routine's clamp, else to a disc of the kind's area at its centroid (item 101 R2) | simpler shape | T-V5-6 |
| placement | no candidate runs F-SKY-PLACE; one candidate is drawn from a top-K of one; a frame smaller than the outline and its inset gives no candidate; no ground river gives a uniform bearing; no reserved precinct scores the plaza | simpler shape; leave out and report | T-V5-5 |
| the arena | the frame of a single-island document is sized as any; no ground river means no conjured river and a spring pond by its draw; a ground river with no reach near the anchor reads its nearest reach's accumulation; the hydro cell follows the rung (12.5 m CITY, 16 m METROPOLIS) | substitute | T-V5-6; T-V5-7 |
| the underside and the altitude | `flat` has no root tiers; a ring below 1 % of the land ends the stack; `depthCm` is capped by `maxDepthM`; a floor above `E_max` wins (the altitude exceeds the row, a listed fate); a surface top with no building reads the terrain; the clearance rule's lag survives save and load | check | T-V5-10; T-V5-21 (h) |
| access | every removed ordinal skipped and counted; one admitted kind drawn from a set of one; the altitude over a row's limit drops that row; a crypt with no passing site takes the half-sunk form; a foot on a deck, a pier's footprint or rubble counts as none (F-SKY-ACCESS) | substitute; leave out and report | T-V5-8; T-V5-26 |
| the island's field | computed only at CITY and METROPOLIS, where islands exist | check | T-V5-1 |
| the unit run's contract | no claim or one landing is served as any; the district count is V01 §3.16's, bounded by the fill's household cap; an outline face below one district's size makes no district and sends the allocation to F-SKY-UNIT; the run exists only where islands do | leave out and report | T-V5-9 |
| lights | a settled island's magical lights stand at 0 cd; a `flat` island's keel hangs at the rim slab's base; one access has one lantern; a missing light row reads its default | check | T-V5-11 |
| names and labels | only islands of CITY and METROPOLIS are named; an island whose land face cannot hold its `quarter` label at the city band drops it by §9.3's area rule, the name kept for the gazetteer | leave out and report | T-V5-11; T-V5-12 |
| over time | a resize whose erosion would split the land face or leave no land beyond the rim strip and the yards stops, by the buffer bisection, at the least area that keeps one face with land beyond them, listed in the epoch's report; a downward rung crossing wanes every island over its dwells, an upward one lets empty slots re-open | repair locally | T-V5-14 |
| the landfall | a footprint that covers nothing on land lays no decoration, leaves `landfall` absent and reports "sank in <water body>"; one covered entity gives one member; covered content that is locked stays; a fall runs at any rung (after a downward crossing included); undo restores everything of V05 §3.16 (8) | leave out and report | T-V5-14 |
| determinism with one island | its draws are slot 1's and its own lineage's; the goldens hold | check | T-V5-15 |
| the strip's geometry | a tier ring that sets no mask cell blocks nothing; a sun at the reach cap sweeps 8 × the height; a receiver above the apex is never blocked | check | T-V5-20 |
| the route | a foot coincident with its class gives `d_G` = 0; an island with no admitted access routes nothing (∞, `unreachable`); the route exists only at CITY and METROPOLIS | leave out and report | T-V5-22 (g) |
| the rim as a barrier | an island with one landing gets one stretch; a stroke of fewer than two distinct points emits no event; a stroke wholly along the rim is bent to the landing stretches | check | T-V5-27 |
| item 110 under the island | a caster whose footprint touches the projected solid only at an edge or a corner is read by cell centres, as V05 §3.9 (3) states | check | T-V5-31 |
| the declarations | every tool gains at most one parameter; a zero-length T4 stroke emits nothing; a degenerate T5 lasso is bent as the shape row states; every declaration's lifecycle is §7.4's row | check; simpler shape | T-V5-16 |
| the events | a resize to 0 or below the claim floor is bent to the floor; a `moveVertex` or `warp` that would make the rim non-simple is bent back along its drag to the last simple position (bisection, ≤ 12 steps); below CITY T5's `sky` parameter is disabled with the islands control's reason (§7.8), and an API or clerk event carrying it is bent to the plain quarter on the ground ("Floating islands need a city; this quarter is laid on the ground") — refused only where the rung is a dossier fact (F-EDIT `dossier-owned`) | simpler shape; substitute | T-V5-16 |
| locality | a one-island document's edit scopes are V05 §4.3's; an edit whose effective scope is empty (a move by zero, a `setAttr` to the same value) folds with no change | check | T-V5-16 |
| the dossier | no deposits, no node term; more eligible institutions than slots are drawn among by V05 §3.4, three at most; many nodes add one bonus; a dossier population at a village or TOWN rung fails the gate (`gated: rung`); a derivation record written under the working name DR-SKY reads as DR27 (file f item 383); an absorb's changes reach the islands at the next epoch and undo with it | check | T-V5-25; T-V5-33 |
| the clerk | an island without a basis is named "not yet in the ground's shade"; one caster over a point gives one attribution; a removed island answers "removed by you"; answers are the same before and after a save and load | check | T-V5-33 |
| marks | a strip with no cell at three samples draws no outline; an unfallen island draws its land, rim and shadow at every band; every shipped sheet of §8.2's presets table (V05 §5.1's list, the ink-family variants and `painterly` among them) resolves every sky semantic (a user sheet missing one resolves it by §8.2's slot resolution); no island, no sky mark; the parity presets carry the rows; marks are view data rebuilt by S14 after undo and redo | check | T-V5-12 |
| light and shadow | no island, no slab and no second base, and the cursor sun's floor is off; a degenerate tier ring drops its slab; a sky layer the view does not draw (hidden, and not the view's working layer; §8.4): its slabs light nothing and are not drawn, the model's strips unchanged; each occlusion mode lights as V05 §5.3 states | check | T-V5-13 |
| exports | with the setting on and no island the `sky` FeatureCollection is present and empty, with it off absent; a strip with no cells omits its MultiPolygon features; the parity presets export no sky content; an export mid-lag writes `basisCurrent` false, and an export after a load equals the one before | check | T-V5-17 |
| a lock against a dossier removal | V05 §3.15 (1b)'s lock clause | check | T-V5-14 |
| a landfall on another island's landing | V05 §3.16 (4)'s row | substitute; leave out and report | T-V5-14 |
| the most accesses | at most `accessCount.max` generated and `accessCount.handMax` hand-placed per island; a `placeSkyAccess` past the hand-placed cap is bent into a move of the island's nearest hand-placed access to the requested site ("An island takes at most {n} ways up by hand; moved {access} here"), with "Delete one first" as the alternative; an `editTable` lowering the cell below an island's count removes nothing — the accesses stand and only a new placement is bent; `skyAccessObstacles` ≤ 27 entries at the defaults | substitute | T-V5-16; T-V5-18 |
| a lock under `sky.clearance` | V05 §3.9 (5)'s lock clause | check | T-V5-31 (f) |
| the seasonal look (V05 §5.1) | every week of 0–51 the same model, hash, save, bases and strips; an arid row draws no ice and no snow on an island; a week in no band of a phase keeps the row's last phase (§8.2's cyclic read); a document whose pinned tables hold no item-117 rows draws §8.2's four override rows on the island as on the ground; a river all of whose stretches are fast draws no ice, a spring pond freezes as any `pond`; a `settled` or `waning` island dresses as a floating one; a `fallen` or `removed` island has no sky look (its landfall takes the ground's); a moved island's leaf cover moves with it | check | T-V5-34 |
| the pennants (V05 §5.1) | no festival in the view's week, or the display off: none; two festivals in one week: both, in window order (§8.2); an island with no landing: rim pennants only; a rim stretch wholly inside landing yards or the waterfall's lip: none there; a `fallen` or `removed` island: none; an island an epoch carried below CITY: V11's `SKY` row as at any rung; a ground landing: none of the `SKY` row's | check; leave out and report | T-V5-35 |
| Find on Sky (V05 §5.6) | no island: no sky entry and no "on Sky" count; one island: its matches alone; a hidden sky layer with Ground or Below working: its matches still counted and shown as ghost pins, and Go there makes Sky the working layer, drawn whatever its visibility, no event sent; a bubble never joins two islands' or two layers' pins; a match withheld by the key: absent everywhere; a `fallen` island: its matches dark, its landfall a Ground place; a `removed` island: never offered; Show gaps on an island (V05 §5.6 (4)): V01 §5.4 (3)'s `gapUnits` over its arena — under a walking-radius row an island holding no member a gap over every residential plot of it, whatever the ground beneath holds, and one holding a member no gap; under a households row each district's unserved plots; a district with no residential plot no per-plot unit; a class `IslandRule.carry.never` excludes a gap like any other; at a drawn week whose frame is not the head, an island raised, resized, moved, fallen or removed since that week: its matches, pins and gaps §11.2's listing at that week, drawn on its land and at its anchor in that frame (V05 §5.6 (5)), one raised since offering none | check | T-V5-36 |
| the one-time waits (V05 §6) | each wait at CITY and METROPOLIS with three islands, up to the population cap, within §12.1's comfort level, a row past its target only with its recorded measured gain; a wait past one second shows progress; the interactive rows never relaxed | check | T-V5-18 |

**(b) The combinations** (every one at CITY and METROPOLIS, where islands exist).

| combination | defined outcome | rung | test |
|---|---|---|---|
| cliff × shade; steep × shade | the receiver heights are the unlevelled raster, bilinear across the cliff; terrain shade (pass 1) and the island's bits are OR-ed, a point counted once; the pre-test reads the frame's `g_min` and `g_max` | check | T-V5-19; T-V5-33 |
| cliff × landfall; steep × landfall | the terrain is never a member and never changed: the rubble lies on each level where it covers a member; covered retaining walls step to `decayed` | check | T-V5-14 |
| coast × shade; harbour × shade; moat × shade | bits are set on every receiver cell, water included; no plot reads a water cell, and `S_town` leaves harbour basins and moats out; the clerk's and the CSV's areas count every covered cell | check | T-V5-33 |
| coast × landfall; moat × landfall | the part over water sinks ("sank in <water body>"); a quay, pier or mole deck covered on land is `ruined`; a moat is never a member | leave out and report | T-V5-14 |
| moat × sky access | a moat is water and its wall strip a strip: neither is admissible ground; a moat bridge's deck face is excluded as a deck | substitute | T-V5-8 |
| bridge × shade; deck plot × shade | a deck is no receiver height: its cells read the field at the unlevelled ground, and a deck plot takes that cell's value | check | T-V5-33 |
| retaining wall × shade | a retaining wall is a pass-1 caster of the daylight term (file f item 290) and a caster to the island's clearance; its levelled platforms move no receiver | check | T-V5-21 (h) |
| square × landfall | a covered plaza or market reservation is left vacant under the rubble; its market use is relocated first | substitute | T-V5-14 |
| oasis × shade | the strips set bits over an oasis as over any ground; the ground's weight is §4.5's `w_sun` × the climate row's sunlight cell, so in a hot arid row an island's under-hang reads as valued shade by the ground's own rule, while `P_I` on the island reads `w_sun` alone (V05 §3.11 (4)); with item 111's cells neutral, byte-identical to the run without item 111 | check | T-V5-33 |
| frame × shade | F-SKY-SHADE clips the window, reported as the clipped share | leave out and report | T-V5-19 (e) |
| frame × sky access | a foot is searched on the ground frame's raster cells only; a slanted row whose only admissible point lies beyond the frame is not admitted there — F-SKY-ACCESS's next rung | substitute | T-V5-8 |
| frame × landfall | the part of the footprint beyond the ground frame covers nothing; the ledger counts covered land only | check | T-V5-14 |
| neighbourhood fabric × sky access | in a ground district whose S8 is volume 1's template fabric, a ground landing's attach is a gate-ranked portal of that district's template, which a seed or a lane must reach, as on an island (V01 §3.10.3 step 4); SKY-F's check and repair lane stand | repair locally | T-V5-8 |
| terraced ward × shade | levelling moves no receiver: the strips computed at S10a equal a load's rebuild | check | T-V5-21 (h) |
| terraced ward × sky access | a landing yard is a reservation hole the ward's levelling leaves unplotted; the hoist's run reads `levelledGroundCm` at the foot; a retaining wall follows plot and block edges and never crosses a yard | check | T-V5-33 |
| terraced ward × landfall | covered retaining walls `decayed`, platforms keep their datums, buildings demolished | check | T-V5-14 |
| composed building × shade; × landfall | a composed (stage-3) building casts at an epoch through volume 6's mask and is a caster to the clearance at its stack envelope's top; covered, it is demolished with its composition | check | T-V5-31; T-V5-14 |
| floor plan × landfall | a covered building's plan records (volume 3) are tombstoned with it and restored by the fall's undo | check | T-V5-14 |
| vault × island; × shade; × sky access | nothing of the sky reads or writes an underground part (item 2): vaults are no receivers and no members (a ruined span's arch vaults follow the span by volume 4's rule); an access foot never stands under a raised deck, so never on an arch vault | check | T-V5-26; T-V5-8 |
| shade × lock | a lock never holds a basis or a strip (derived, no edit kind): evaluations write every live island's basis, locked or not; a locked or pinned ground plot keeps its content while its field value follows the strips | check | T-V5-33 |
| shade × undo | an island edit's undo touches no basis; the undo of an evaluation's event (an epoch, Update shade now, a re-derivation) restores the former bases, strips and field cells | check | T-V5-16; T-V5-21 (b) |
| landfall × save and load | the decoration, its `members`, the ways' `formerClass`, the walls' profiles and the quarry's `source` persist in the model digest; a replay of the `fallIsland` event reproduces them byte for byte | check | T-V5-15 |
| season × offset; pennants × offset; Find × offset | the island's season, pennants, glow and pins drawn in its frame and displaced with it; the ground's look beneath unchanged | check | T-V5-34; T-V5-35; T-V5-36 |
| season × shade | the strips and `shadeSky` identical in every week; only the drawn shadow follows the view sun's height | check | T-V5-34 |
| season × landfall | the landfall's rubble and quarry face are ground faces: they take the ground's snow and leaf cover; nothing of the fallen island is drawn on the sky | check | T-V5-34 |
| festival × landing yard; festival × waterfall | no pennant in a yard's passage or at the waterfall's lip; a yard's two pennants flank its access top | check | T-V5-35 |
| Find × season; Find × festival | Find draws over both, under its veil, never re-rendering the sky base tiles | check | T-V5-36 |

## 4 Editing

### 4.1 The declarations — item 101's twelve tools, no thirteenth

Every island edit is an existing tool with at most one new parameter (§7.1's elegance rule):

| tool | on the sky | the events it emits |
|---|---|---|
| T1 `intend` | the islands setting (off / on) and the count (`auto`, 0–3) | `adjust('layers.islands')`, `adjust('islands.count')` — both Re-derive from S7b with their fate report (§7.8) |
| T2 `ground` | an island's terrain, water and rim, with the new `key` parameter naming the island; a terrace stroke on the island, whose edge lays an island `RetainingWall` (V05 §3.22 (4)) | `setField(terrain)`, `drawWater`, `moveCourseKnot` on its river, `warp` on its key (`fromLevel 0` moves the rim); item 110 (a)'s terrace form with `key` |
| T3 `wall` | a wall on an island, with `key`: in an enclosure kind a barrier-closure enceinte walling only the landing yards (V05 §3.21); in the `retaining` kind an island `RetainingWall`, bent inward past the rim walk when drawn on or along the rim (J-VI.4 (g); V05 §3.22 (4)) | `drawWall` with `key` (its kind item 110 (a)'s) |
| T4 `road` | a stroke from a ground point to an island's rim; with `raised`, bent into an access; with the aqueduct class, ended at its last ground vertex outside the footprint; on an island's key, `raised` dropped and the aqueduct made a fountain pin (J-VI.4 (d)–(e); V05 §3.22 (3)) | `placeSkyAccess` (the kind from the stroke's class, or chosen by the dry run by V05 §3.10's rules); a bend emits the bent declaration |
| T5 `quarter` | a floating quarter: the new `sky` parameter | `quarter` with `sky` — a sugar event expanding to `convert raiseIsland` (declared), an `assign` of the kind to its district and `setAttr(name)` |
| T6 `place` | an institution onto an island | `assign` with `criteria.sky` (and optionally the island) |
| T8 `fill` | the prosperity, density and greenery brushes on an island, with `key` | `setField` with `key` — stroke overrides on the island's lattice (§7.2) |
| T9 `shape` | the island's altitude, area, position, occlusion, underside and field (a target mean); an access's kind, role, state, knowledge and foot; the rim's handles | `setAttr`; `moveVertex` on rim vertices |
| T10 `hold` | the island or its paths; New random on the island; **Update shade now**; the delete of an island or an access (V09's delete row, V09 §4.20.3) | `lock`, `pin`, `revert`, `regenerate` with the island's scope; `regenerate` with the scope `shade` and the island; `delete` (folded as `convert removeIsland` for an island) |
| T11 `name` | the island's name and label | `setAttr(name)`, `moveLabel`, `hideLabel` |
| T12 `dress` | the sky layer's visibility and occlusion | `setLayer('sky', …)` |
| history | the island conversions by hand | `convert` (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`, `removeIsland` — the last also T10's delete of an island); `reclearIsland` is the epoch's own and has no tool |

Every declared thing is held (§7.2's declared means held): a declared island's outline and position, a declared
altitude or area, a placed access.

**No tool for the shade or the route.** The strips, the sky receivers' shade and the route distance are derived and carry
no edit kind. §4.5's `w_sun` and this volume's `shade`, `routing` and `casterAllowanceM` cells are table values
(`editTable`, §7.6, re-deriving from their first reader stage — SKY for `casterAllowanceM` and `shade`, S10b for
`routing`); T8 `fill`'s prosperity brush overrides the field beneath an island as it does anywhere (item 102 (f)); and
**Update shade now** (V05 §4.2) brings the ground under one island's old and new strips up to date at once.

### 4.2 The new and extended events and their semantics (§7.1, file f item 356)

```ts
| { t: 'placeSkyAccess'; island: Id; top: PointCm /* local; snapped to the rim at the dry run */; foot: PointCm /* world */; kind?: SkyAccess['kind']; role?: SkyAccess['role'] }
// `quarter` gains   sky?: { altitudeCm?: Cm; institution?: string /* an IslandInstitution kind */ }   — its points are world points: the island's projected outline or seed
// the point-form events gain   key?: PlatKey   (default the ground): drawWay, drawWater, drawGreen, drawBoundary, drawFootprint, drawWall, placeLight, setField (terrain, prosperity, density, greenery)
//   — their points are in that arena's frame; the tool converts a world point by the island's anchor at the dry run, so a later move never invalidates the event
// `regenerate` gains the scope   { kind: 'shade'; island: Id }   — Update shade now (below)
// ConversionOp's island kinds (§4.11):
| { op: 'resizeIsland'; island: Id; areaHa: number; altitudeCm: Cm }
| { op: 'waneIsland' | 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }
| { op: 'raiseIsland'; allocation?: Id; declared?: { ring: PolygonCm /* local */; anchor: PointCm; kind: string; altitudeCm?: Cm } }
| { op: 'removeIsland'; island: Id }   // an author's removal: the record kept at its address in state 'removed', holding its slot (V05 §3.2 (6))
| { op: 'reclearIsland'; island: Id; groundRefCm: Cm; altitudeCm: Cm; elevationRaisedCm: Cm }   // the clearance rule's result at an epoch (V05 §3.15 (7)); returned by `sky.clearance` only
```

* **Pointing at an island.** Every sky hit test and every tool point on the sky layer converts the pointer's world point to
  the island's frame by the anchor — and, under `offset` occlusion, first un-displaces it (the world point less the
  island's `elevation × offsetPerMetre` offset vector, §8.4) — so a click on a lifted island's drawn house selects that
  house and a stroke drawn over the lifted island lands where it is drawn; volume 9's hit testing applies it, and an island's retaining walls are hit-tested the same way.
* **Moving an island** (`setAttr(anchor)`, T9's drag; J-V5.20). The arena is untouched. The dry run re-reads `groundRefCm`
  and the altitude floor at the new position, re-checks V05 §3.7's gap and frame, and re-lands every access: a vertical
  access's foot follows its top's new world point; a slanted one keeps its foot while it stays within the row's run, else
  is re-sited by V05 §3.10 (4). A foot that leaves its landing plot closes that plot's `sky_landing` use (item 17's
  `closeUse`, the house left vacant) and opens one on the plot under the new foot by a positive placement (§7.7's
  `placeAt`). The fates list both plots. `placement.byAssignment` becomes true.
* **Resizing** (`setAttr(areaHa)` or `resizeIsland`; J-V5.7, J-V5.77). The rim is eroded or dilated by the kernel's buffer
  (§3.7) on the island's arena to the new area within 1 % (bisection on the distance, ≤ 12 steps), keeping its shape —
  never re-drawn from the stream; a growth past 1.5 × `areaHaMax` first grows the frame (V05 §3.8 (1)); `depthCm` re-scales
  by the square-root ratio of the areas. **The rim's L1 pieces follow in the same commit:** one island L1 batch re-lays the
  rim strip `rimStripM` inside the new rim and re-claims each landing yard at its top, re-seated where its ray `d_k` now
  leaves the land face (V05 §3.10 (2), (5)), its foot re-landed as a move re-lands it; each re-claimed yard's
  `sky_landing_top` plot is re-cut on the new yard (the old one tombstoned) and its use opened there by `placeAt`, the plots
  the yard covers re-derived by §7.3's local operator, and SKY-F's checks and repairs (V05 §3.12) run on the island, so a
  way meets every attach. The institution claim is kept where it still fits the land face less the re-laid strip and
  yards; else it is re-searched by V05 §3.10 (5)'s score and crypt re-test over the sites inside the district that holds it
  — so every district keeps its kind — and that district is re-derived once from S8, whether or not it also receives a
  band face, with the new claim a hole and the old
  claim's land its own (V01 §3.10.3 (6) (c)'s claim re-search, which releases the institution from V01 §3.9's fixed
  inputs), its S10b placing the institution on the new claim — its use relocated there (a dossier-backed one by the
  solver's `dossier` request), its old building demolished, a listed fate. **The floor:** the area is floored at the least
  area (the same bisection) at which some site in that district still fits and the eroded land stays one face with land
  beyond the strip and the yards; a hand request below it is bent to it with `bend.island.keepRoom` — "<island> keeps room
  for its <institution>; shrunk to <area> ha" (J-VI.4) — and an epoch's `resizeIsland` stops at it, listed in the epoch's
  report. **Shrinking:** every plot that loses at least half its face to the eroded rim, the re-laid strip or a re-claimed
  yard is cleared (its households relocated on the island first, then to the ground), the rest re-cut with their
  neighbours fixed (§4.7 S10 (7)); every way that crosses the re-laid strip line is cut back to it; no district is
  re-derived but the claim's where the claim is re-searched. **Growing:** the land between the old and the new strip lines
  — with whatever an old yard held that its re-claim does not, less the re-claimed yards — is cut into faces by extending,
  in the same L1 batch, each district boundary way that meets the old strip line across the band along the band's normal
  there (the same class); each face joins the district of its nearest rim stretch (ties by district address), and every district that
  receives a face is re-derived by its own scoped re-derivation from S8 (V01 §3.10.3 (6) (c)) — never a unit run, which
  would re-cut every district, and never a change of the district count. Either way volume 1's `plantRimWalk` (V01
  §3.10.3 step 4) re-plants the rim walk whole, once for the resize, since no district's re-derivation writes it.
* **Altitude** (`setAttr(altitudeCm)`): the record alone; a value below V05 §3.9's floor is bent to the floor, the line
  naming it (J-VI.4).
* **Underside and occlusion** (`setAttr(underside.*)`, `setAttr(occlusion)`): the record alone (`underside.source` becomes
  `edit`); an underside change that would break the floor raises the altitude, listed as a fate.
* **Field** (`setAttr(field.prosperity)` — a declared target mean, `declared.field`, the gradient shifted uniformly to meet
  it, V05 §3.11 (5); `setAttr(field.density)`, `setAttr(field.greenery)`; and the island brushes, `setField` with `key`,
  as §7.2's stroke overrides on the island's lattice over the gradient): the island's plots whose value crosses a cut past
  τ re-derive (§7.2's rule for a field brush), on the island only.
* **Reshaping the rim** (`moveVertex` on a rim vertex, `warp` on the island's key with `fromLevel 0`): §7.3's local
  operator on the island's arena moves the rim, and its L1 pieces follow as a resize's do — the strip re-laid, each landing
  yard on a moved stretch re-claimed at its top (a pinned `sky_access` vertex never moves), the institution claim kept or
  re-searched inside its district. A reshape that would leave the claim no site there, or make the rim non-simple, is bent
  back along each moved vertex's drag to the furthest position that keeps one and a simple rim (bisection, ≤ 12 steps;
  J-VI.4), with `bend.island.rimStop` — "<island> keeps room for its <institution>; the rim stops here". A stretch that
  moved outward is a growing resize's band, one that moved inward a shrinking resize's (no face given, no district
  re-derived but the claim's where it is re-searched; V01 §3.10.3 (6) (c)); `plantRimWalk` re-plants the walk once;
  `areaHa` is rewritten to the new land area.
* **New random on the island** (`regenerate` with the island's scope, `newRandom`): the outline's displacement, the
  terrain (with an `own` relief's class), the underside (unless edited) and the river re-derived under the next reroll,
  SKY's island steps re-run (the rim strip, the landing yards and the institution claim re-laid), the island's districts
  re-laid by volume 1's unit run (V01 §3.10.3 (6) (a)–(b); each district's template kept where its lineage is, V01
  §3.3.4), then SKY-F, which rewrites `SkyIsland.districts`; the anchor, the area, the altitude, the allocation and every
  access's foot kept; each vertical access's top re-seated at the new rim's point nearest above its foot, and where the new
  rim no longer overhangs it the access becomes a `ropeway` from the rim point nearest the foot. The altitude floor is
  re-checked after the underside is re-drawn: a deeper root that breaks it raises `elevationCm` to the floor (a listed
  fate). The ground is byte-identical (the seam exception is empty); `shadeBasis` is untouched.
* **Declaring an island** (T5 with `sky`). At its dry run: the gate (V05 §3.2 (1); below CITY V05 §3.23's bend) and
  `h_town > 0` must hold — a declaration where the town cannot supply magic is allowed only with the fate `held against
  its supply` confirmed (J-V5.10); the points form gives the projected outline (a lasso), a disc of the kind's area at one
  point, or the routine fitted to two to four corners; the slot is the lowest free (the lowest held slot when none is free,
  released by this event, V05 §3.2 (6)); the fill is V05 §3.5's, taken by **relocating** the richest households from the
  ground (never re-deriving it) — each household moved up is a relocation, its ground building left vacant — all listed
  as fates; V05 §3.8–V05 §3.14 then run on the new island, which has no `shadeBasis` until the next shade evaluation (Update
  shade now on it writes one at once). In the creation prefix the declaration is read ahead by S7b (5) as a forced slot,
  so no relocation is needed.
* **Placing an institution on an island** (T6: `assign` with `criteria.sky`): the solver places it on the island named,
  else on the island whose reason is `institution` and whose row matches, else the dry run offers T5's declaration. A
  custom kind is named by its `localUid` (item 104 (a) (1): the map-side declaration, stored in the map document, never in
  the dossier); where it is a resource or processing node of an active chain, the dry run lists the fate "this chain now
  crosses the hoist" and the route lengths of its links before and after (V05 §3.20 (9) (e)).
* **Accesses.** `placeSkyAccess`'s dry run checks the kind against the `magic` circumstance and the row's limits (a kind
  that does not fit is bent to the nearest admitted kind in V05 §3.10's order, the line naming the kinds that fit; J-VI.4
  (b)), inserts the top vertex on the rim, claims the island's landing yard (the plots it covers re-derived by §7.3's local
  operator, V01 §3.10.3 (6) (c)) and opens the ground landing by a positive placement on the plot under the foot. An
  island carries at most `accessCount.handMax` hand-placed accesses: one more is bent into a move of its nearest
  hand-placed access to the requested site (V05 §3.23). `delete` of an access reverses all three; deleting an island's
  last access is bent into a move to the next admissible site ("An island keeps one way up; moved to {site}"; J-VI.4 (c)),
  with "Place a different access" as the alternative. **A deleted generated access stays deleted:** the delete's fold
  appends its ordinal to `SkyIsland.removedAccesses`, which every later re-siting skips and counts (V05 §3.10 (1)); where
  it was the `main` access, the lowest surviving generated ordinal takes `main` in the same event (a listed fate), so an
  island always has a main access while it has any; the delete's undo removes the ordinal. A placed access's delete leaves
  no ordinal (it was declared, and nothing re-sites it). The foot of a placed or moved access meets the standing raised
  parts by V05 §3.22 (3) (a)–(b) at its dry run, a foot they block moving to the nearest admissible foot, the line naming
  the deck or raised-way pier in the way (J-VI.4 (b)). **`setAttr(kind)`** re-runs the same check — the `magic`
  circumstance, the row's altitude and horizontal-run limits, a `guarded` access a `hoist` only — and a kind that does not
  fit is bent to the nearest admitted kind (J-VI.4 (b)); an admitted change re-seats nothing but the landing buildings (the
  top's and the foot's use rows take the new kind's building). **`setAttr(ground.at)`** re-lands the access as a move
  does: the old landing plot's `sky_landing` use closed, a new one opened by a positive placement on the plot under the new
  foot, both plots listed as fates, the horizontal run re-checked. An island wall's circuit follows every access change
  (V05 §3.21 (3)).
* **The shade beneath follows** (item 102 (e); J-V5.27). Every event that changes what an island's strip would read — a
  move, an altitude, a resize, a rim reshape, an underside, New random on the island, a declaration, a delete, a `convert`
  — leaves `shadeBasis`, the ground's field and every strip where they were: its dry run lists the fate "The ground beneath
  will catch up the next time the town changes over time. Update it now?", and the shade map view draws the new strip as
  pending (V05 §5.1). A Re-derive from S10a or an earlier stage recomputes the bases and the strips with everything else.
* **Update shade now** (`regenerate` with the scope `{ kind: 'shade', island }`; T10, and the fate's own button). One
  shade evaluation for that island alone, `by: 'update'` (V05 §3.19 (6)): its `shadeBasis` written from the island as it
  stands, its strips onto the ground and onto the islands beneath it recomputed — and, where it had no basis, the strips
  onto it from the islands above it — and the ground's field recomputed over the union of the old and new strip windows —
  the cells of the other islands' strips re-read from their unchanged bases — with the blocks there whose value crosses a
  cut past τ re-derived by §7.2's rule, their fates listed. It writes no other island's basis. The prosperity brush stays
  for hand changes.
* **Deleting an island** (V09's delete row (T10), the clerk; J-V5.21, J-V5.62). The dry run turns the delete into
  **`convert removeIsland`**: the island is removed without a landfall — its households relocated to the ground by §4.7's
  overflow pass (in an epoch's history, inside the event), its landing uses closed, its arena archived as `fallIsland`
  archives it, a split shop's use relocated to the ground (V05 §3.20 (11)) — and its record stays live at its address in
  state `removed`, `removed` written (`seq`, `generated` from its lifecycle cause) and its `slot` held closed (V05 §3.2
  (6)). It draws, labels and exports nothing but its `.plat` record. Where the ground cannot house its households, the dry
  run offers instead `adjust('islands.count')`, a Re-derive from S7b. The fate list says, in volume 9's shared words
  (`info.remove.holds`), "The town won't raise this island again; undo brings it back". `convert fallIsland` is the
  ruinous alternative. A removed island is undone only by the removal's undo; a T5 `sky` declaration re-fills its slot
  with a new island only when no slot is free (V05 §3.2 (6)), never resurrecting it, and no `adjust('islands.count')`
  re-opens it. A floating, waning or settled island may be removed; a `fallen` one may not — its slot is already free and
  its landfall is ground content, which the ground's own edits clear.
* **Bringing an island down** (`convert fallIsland`, the history tool; the clerk's "bring it down"). The dry run lists V05
  §3.16's fates, one per covered entity; a covered way's reads "rubble; a track until the town clears it (was <class>)",
  `<class>` the class the fall writes to `Way.formerClass`, or the one the way already holds there. The event's undo
  restores it all (V05 §3.16 (8)).
* **A raised or aqueduct stroke to an island** (J-V5.61). A T4 stroke that ends on an island's rim with `raised` or the
  aqueduct class never makes a way (II.1: no roads in or out). Its dry run answers with a bend (J-VI.4 (d); item 101 R2
  refuses only a dossier fact or a lock) — `bend.raised.island`, "A road cannot reach a floating island; a hoist, rope
  line, stair or bridge of light can." — and makes, in the stroke's place, `placeSkyAccess` with the stroke's ends as top
  and foot and the kind V05 §3.10's rules admit there: a `ropeway` for a slanted stroke, a `hoist` where the foot lies
  under the rim, a `lightBridge` where `magic` admits it. An aqueduct stroke ending on a rim ends at its last ground vertex
  outside the island's footprint (`bend.aqueduct.island`, "An island's water is its own; the aqueduct ends here"). A
  `raised` or aqueduct stroke wholly on an island's key is bent (V05 §3.22 (3) (d)). A `raised` stroke on the ground whose
  course would cut an access's column or pass within `lineClearM` under its rope line is re-routed by the dry run through
  `skyAccessObstacles`, or, where no re-route exists, ended at its last ground vertex before the column ("this would cut
  <island>'s hoist; it ends here"; J-VI.4 (f)).
* **A retaining wall or terrace on an island:** V05 §3.22 (4). **A wall on an island** (T3 with `key`): V05 §3.21 (3).

### 4.3 Locality and undo

| edit | effective scope | outside it, byte-identical |
|---|---|---|
| altitude, occlusion, underside, field and the island brushes, name, terrain and water on the island, a wall on the island, New random on the island | the island's arena and record | the ground and every other island (seam exception empty) |
| a resize, a rim reshape | the island's arena and record, plus the ground landing plots its re-landed feet name (their designations only) and the ground buildings that take the households a shrink relocates | everything else; every other island |
| an access placed, moved or deleted; an island moved; an island deleted | the island's arena and record, plus the ground landing plots its fates name (their designations only) | everything else |
| an island declared after generation | the new island's arena, plus the ground buildings its relocations vacate and the landing plots | everything else |
| a ground edit whose effective scope meets an island's projected footprint — a raised way, a retaining wall or a building added, raised or removed beneath it included (its dry run reading `skyAccessObstacles`) | the ground edit's own scope, plus that island's `groundRefCm` and, where the clearance rule requires it, its `altitudeCm` (V05 §3.9 (5); a listed fate); a removal beneath never lowers the island — its `elevationCm` kept, `altitudeCm` re-read | the island's arena |
| `fallIsland` | V05 §3.16's covered set and the island's arena, plus the re-landed accesses of other islands (their landing plots, designations only) | everything else |
| `removeIsland` | the island's arena and record, plus the ground buildings that take its households and its landing plots (their designations only) | everything else; the other islands' slots and draws |
| `reclearIsland` (an epoch's) | the island's record (`groundRefCm`, `altitudeCm`, `elevationCm` where raised) | everything else, the island's arena and `shadeBasis` included |
| Update shade now | the island's `shadeBasis`; the ground's field over the union of the island's old and new strip windows and the blocks there that cross a cut past τ; the strips onto the islands beneath it and, where it had no basis, the strips onto it | everything else, every other island's basis included |

No island edit writes the ground's field or any `shadeBasis`: the strips keep their basis (V05 §3.19 (6)), so every row
above holds for the field's rasters as for the ground's geometry, before and after a save and a load (§2.9); Update shade
now is not an island edit but a scoped shade evaluation. Every event undoes by its inverse through §7.4's fold; the
lifecycle rows of the sky's new kinds — `placeSkyAccess`, `regenerate` with the scope `shade`, `convert removeIsland` and
`reclearIsland` — are §7.4's (file f item 375). `Document.nextSkyPart` never decreases, so an undone island's part stays
spent.

### 4.4 The dossier — derivation row DR27 and coherence (§7.7, file f items 383, 387)

| row | subject | dossier inputs | rule | chance | totality bar |
|---|---|---|---|---|---|
| DR27 | floating islands: the gate, count, reason, size, altitude and access kinds; what the sky fill carries of a chain; the shares it may not take | the population (the rung, DR23); `wealth.label` (DR6: the field, so `S_town`); the households' bands (DR7: `S_carried`); the institutions (DR9, DR24: a palace, cathedral, great temple, prison or mage's instance; a custom institution by its resolved scene archetype and `landmarkLevel`, item 104 (a)); the institution ladder records by their step type (item 108 (a): only a singular or SIZE record may go up; COUNT, GUILD and QUARTER members counted across both arenas); the district-defining records (item 72: their raised shares never taken by the fill); `government` (DR11: a palace's eligibility); `site.magic` (the `magic` circumstance: the gate and the access kinds); `site.deposits` (a `magical_node`: the node term, V05 §3.3); the active reviewed custom chains (item 104 (b)) and `activeChains[]` (item 105 (i)): the nodes the fill keeps on the ground, and the links' status | V05 §3.2–V05 §3.10, V05 §3.15 (1b), V05 §3.20 (9)–(12) | `island.place` | every bound CITY or METROPOLIS map with the setting on has its gate resolved, its node term traced to a deposit or to none, each island's reason traced to a DR7 or DR9 fact, and no ladder pair counted twice across the arenas |

The setting itself is the map's declared choice, never a dossier path. **Coherence** (J-V5.19): where the dossier's
`site.magic` resolves to `none`, turning the setting on is refused (F-EDIT `dossier-owned`: "the dossier's world has no
magic"), and a dossier change to `none` at an absorb makes every island's target 0 at the next epoch — they wane, never
vanish (item 22). A dossier institution on an island stays a dossier fact: a fall, a delete or a resize that removes its
building first relocates it (§4.11's *Dossier content across epochs*). **The reverse** — the dossier removes the
institution an island carries (a palace, a cathedral, a custom tower) — removes the institution at once (the dossier is
truth, item 20 (h): its building vacated, its uses closed), leaves the island standing, and re-reasons the island at the
next epoch by V05 §3.15 (1b), a lock holding it as that step states (J-V5.53). Until an epoch runs (a document without
history), the absorb's report lists the island as "awaiting a new purpose", and the clerk offers T6 (another institution
onto it) or T5's kind change as ghosts. A `magical_node` deposit that turns `depleted` or `removed` at an absorb drops the
node term at the next epoch's evaluation — the islands' supply falls by the law and they wane, never vanish; one that turns
`discovered` adds it at the next epoch (V05 §3.3).

### 4.5 The clerk's view

**Registration.** `@plat/sky` registers one `WhyProvider` (V10 §2.13) with `kinds` `SkyIsland`, `SkyAccess` and the
`fallen_island` decoration, answering from the committed model and the report, filtered by the caller's key. The
prosperity field's `drivers()` (§11.2's `FieldDrivers`; §4.5 *Fields*) gives the daylight term one entry as the base
defines it and, beside it, one attribution per island whose strip covers the point: `{ driver: 'daylight', delta, sources:
{ caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] }`, each source's `samples` the sample bits it blocks
at the point and the entry's `delta` the OR-ed total × `w_sun` ÷ `bits` (a sample blocked by a hill and an island is
listed under both and counted once, J-V5.38) — the `sources` list is this volume's member of §11.2's
`FieldDrivers.terms`. Pulls across arenas reach `PlacementSolver.explain` (volume 10's `Explanation.terms`) with the access
`skyRoute` returned, so every cross-arena term names its landing.

The reader (§11.2's `query`) lists each island in the gazetteer with its name, reason, state, area, altitude, supply and
accesses. `why` on an island answers with its gate, its slot's draw against `chance · h_town`, its reason's candidates and
weights (a custom institution's matched archetype named), its fill's bands and their shares of its land, its stop cause,
the trades it left on the ground by `carry` (each with its reason: heavy works, noxious, a need an island cannot meet, a
chain's working step) and the split shops it carried, the coverage instances it took per island district, the S3
reservation it handed over and to whom ("the old cathedral close — now the mother church"), its cathedral's crypt ("cut
into the island's rock; the largest crypt in the town"; half-sunk where the rock is too thin), its placement's class
shares, its reachability and score, its underside's kind, and its strip — how many hectares it shades for at least one
(`cells`), three and five of the samples, when the ground last took it (`evaluated`), and whether the field still reads
it where it hung (the basis, V05 §3.19 (8)); an island with no basis yet is "not yet in the ground's shade" — filtered by
the caller's key (a `secret` service hoist to a prison is withheld). `why` on a ground plot or quarter under an island
names each island whose strip covers it and for how many samples, the term's share of the plot's value, and whether the
ground has caught up; `why` on a use on an island, or on a ground use pulled by one, names the rows and the links that
pulled it — the good, the bound provider or consumers, the orientation (item 105 (j)) — and the landing each cross-arena
pull or link went through with its route length (V05 §3.20 (8), (10)); on a split shop it names its works below and the
route between them; on a node of a chain that crosses an island, it names the chain, the node's step in its flow, the
landing its link crosses and why its working steps stayed on the ground (V05 §3.20 (9)); on an island's rim with no wall,
"the drop is the wall here" (V05 §3.21); on a landfall, the island that fell, when, and what it broke (the walls breached,
the ways buried, the arches and raised-way piers ruined, the terrace walls broken, the shops that fell with their bridge,
the fountain an aqueduct no longer feeds, the accesses of other islands re-landed) with the clearance still owed; on the
town supply, the `magical_node` deposit when the node term acts — "the node beneath the old ruins" when the report's
`ruin.node` line names the deposit (V04 §3.5.0a (9); V05 §3.3).

**The clerk's island rows** (volume 10's categories; CVR-V10-14): on a removed island or access, "removed by you" with the
event — "the town had raised it" or "the island you drew" by `removed.generated` — and what alone would re-open its slot
(undo, or a new island drawn when no other slot is free — never a new island count); on an island the clearance raised,
"raised clear of the aqueduct" (or of the viaduct, the terrace wall, the stepped temple), naming the caster and the epoch;
a lock holding an island, "clearance held by your lock" or "held without its institution". **Its bend rows** (J-VI.4) are
V09 §4.9's lines, carried in V10's `bend` category: `bend.raised.island`, `bend.aqueduct.island`, `bend.raised.onIsland`,
`bend.aqueduct.onIsland`, `bend.retaining.rim`, and this volume's `bend.island.keepRoom` and `bend.island.rimStop` (V05
§4.2), with the lines of V05 §3.23 for the hand-placed cap and the rung. A clerk's proposals are these events as ghosts: "a
floating palace over the river" is T5 with `sky` and the palace kind; "raise it higher" T9's `setAttr(altitudeCm)`; "let
the ground catch up" Update shade now; "bring it down" `convert fallIsland` with V05 §3.16's fates. It never writes a
dossier fact and meets DR27's refusal as any author does.

**The looks** (items 117 (h), 118 (g), 120 (i); the lines volume 10's). The clerk's seasonal line on an island reads the
ground's climate row and the island's water as V05 §5.1 draws them ("the island's pond is frozen: it is midwinter, and
winters here are cold; the waterfall keeps running"); its festival line names the pennants on the island's rim and
landing tops while a festival shows; and its "show me …" sets Find's chips, whose matches on the islands are V05 §5.6's —
each a view action, never an edit.

## 5 Rendering, labels, exports

### 5.1 Marks (S14; every sky coordinate is `anchor` + the local one)

| semantic | kind | what | bands |
|---|---|---|---|
| `sky.island.land` | `area` | the land face, in the style's `sky.ground` role | all |
| the island's fabric | as any district's | ways, blocks, plots, buildings, greens, water — `layer: 'sky'`, `z` above the ground | as the ground's |
| `sky.island.rim` | `outline` | the rim chain with the `cliff` bank program's outward ticks | all |
| `sky.island.shadow` | `shadow` | rung 3: the projected tier stack (V05 §5.3); `hatched`: the patch's drop shadow, as the Neighbourhood look draws its lone patch (`research/findings/vg-ng-devlogs.md` §B3.5; `research/findings/watabou-extra-a.md` §3) | all |
| `sky.island.underside` | `area` | `offset` occlusion only: the tier stack's silhouette swept along the offset vector — the rock hanging beneath the lifted island | all |
| `sky.island.tether` | `outline` | `offset` only: the true ground footprint dashed, and a hairline from the lifted centroid to the true one | district and finer |
| `sky.fall`, `sky.mist` | `glyph`, `area` | the waterfall's lip on the rim; a soft mist disc on the ground below it | district and finer |
| `sky.island.shadeStrip` | `outline` | the shade map view only (volume 9's thematic view of item 102 (f)), **outlines only — the veil of shade shares is volume 9's alone**: each island's held strip onto the ground at its basis as one solid ink line around the cells it blocks for at least three of the samples, traced by marching squares over the mask at the field cell, labelled with the island's name along it; a strip with no such cell draws none | city and district |
| `sky.island.shadePending` | `outline` | the shade map view only, while the caster's `shadeBasis` differs from its live island (V05 §3.19 (8)): the strip the island would cast now, its three-sample area as a dashed ink line — so a dashed line always means "where the shade will move" | city and district |
| `sky.access.<kind>` | `glyph` + `ribbon` | hoist: a glyph at the top and at the foot, joined only in `offset`; stair: the same glyphs, and in `offset` the helix of V05 §2.2 as a stepped spiral line; rope line: a hairline from the top's world point to the foot; bridge of light: a glowing ribbon with `light` marks along it at night | district and finer (the foot glyph at the city band) |

**States** (§8.2's `states`; file f items 408, 415): the base's island rows stand — the `fallen` row draws its rubble over
the faces and bands of the `fallen_island` decoration's members (V05 §3.16), and the `removed` row draws nothing, no label
and no shadow; a settled island's buildings draw their own existence rows. **The access rows are this volume's** (the
base's `skyAccess` row cites them): an access reads `closed` (a bar glyph), `unserved` (alpha 0.5) and is not drawn once
`ruined`. The landfall's breached walls with their towers and gates (by their runs' `condition`), ruined bridges, rubble
ways, ruined raised spans and raised-way piers and decayed retaining walls draw by their own state rows (§8.2; item 110's
rows); the deck plots tombstoned with their ruined decks draw nothing. The island's own retaining walls (V05 §3.22 (4))
draw by the base's retaining-wall semantic in the island's frame, on the sky layer's list, displaced with the island under
`offset`, their low-side shadow cast by the light pass on the island's sky surface layer.

**Sheets.** The sky layer composes its own list with §8.2's layer order, each sky semantic in the layer-order slot §8.2
gives it (file f item 408); every shipped sheet — §8.2's presets table: `ink`, `lit`, `hatched`, the ink-family variants
`parchment`, `bw-print` and `night`, `painterly` once volume 7 ships it (V07 §8's V-M1), and the parity presets, which carry
the rows though their recipes hold islands off — resolves every sky semantic, so the loader never refuses one. The
per-family facts are this volume's, their values volume 11's palette rows (row 52):

| semantic | per-family facts |
|---|---|
| `sky.island.land` | role `sky.ground`: in `ink` and its variants `parchment` and `bw-print` one step lighter than `ground` (`bw-print` on its grey ramp); in `hatched` the patch tone; in `lit` and `night` the `ground` albedo lit by the light pass; in `painterly` one step of its colour ramp lighter than `ground`, the relief tier shading the island's terrain as it shades the ground's |
| `sky.island.underside` | role `sky.ground` darkened one step, `ink` outline; `offset` only; drawn under the land, so the lifted land covers its top |
| `sky.island.rim` | the `cliff` bank program's ticks in `ink`, in every family — `parchment` and `bw-print` as `ink`; in `painterly` the rim one of its selectively outlined lines, so it is always drawn |
| `sky.island.shadow` | role `shadow` (rung 3); `hatched` the patch's drop shadow |
| `sky.island.tether` | `ink` hairline, dashed; `offset` only |
| `sky.fall`, `sky.access.*` | glyphs in `ink`, in every family (`parchment`, `bw-print` and `painterly` as `ink`); a bridge of light's ribbon in role `light` (the glyph tone; its night glow is the `glow` sprite of its `light` marks, E-16) |
| `sky.mist` | role `water` lightened, alpha 0.5 |
| `sky.island.shadeStrip`, `sky.island.shadePending` | `ink` lines, solid and dashed, label in role `label` |

The style role **`sky.ground`** (§8.2's *Roles*) is the land of a sky island: never `ground` itself, so an island reads
against the ground beneath it in every family. The island's own fabric resolves by the ground's semantics.

**Seasons on the island** (item 117, the sky's part; J-V5.84 – J-V5.86). A look, never a change (item 117 (a)): no week
changes an island's record or arena, the model's hash, a save, the island's `shadeBasis`, its strips or its `shadeSky`.
The season is §2.9's year position with its follow flag (§7.7's DR42), drawn by the tile worker from the display list
(§8.1 item 8; §8.8's key), so a week change re-skins the sky base and surface layer and re-emits no sky mark.
1. **The climate.** An island reads the document's one climate row as DR42 resolves it — the ground's, with its height
   correction by the ground's S0 relief class — never a row of its own: neither its altitude nor an `own` relief class
   (V05 §3.8 (3)) corrects it (J-V5.84).
2. **Its fabric** (item 117 (f), (f2)). Every face and crown the unit run lays on the island — its gardens, greens and
   orchards, any field face, the rim walk's planting (V01 §3.10.3 step 4), its trees and hedges (§8.10's instances) and
   its buildings' creepers — takes §8.2's season rows by its kind, as a ground face or crown of that kind does in the
   same week: the growing year's looks; autumn's crown colour per tree, by the keyed draw on each crown's render key, with
   the early green, the thinning and the bare crowns. The **fallen-leaf cover** lies by §8.2's rule on the island's own
   surfaces — its ways, greens, gardens, roofs and the spring pond's still water — on a 1.5 m grid laid in the island's
   local frame (cell (0, 0) at its local origin), so the cover moves with the island under a move and under `offset`; it
   reads only the island's own deciduous crowns and never lies on the void, and the ground's cover never reads an
   island's crowns (J-V5.85).
3. **Its water in winter** (item 117 (e)). The island's water takes §8.2's ice rule by its own kinds: the spring pond
   freezes as any `pond` (it carries no item-111 `spring`, V05 §3.8 (4)); the conjured river takes the ice kind its
   course's mean fall gives — at the default `tiltPerMille` a `river`, so it freezes only where the winter reaches that
   row's `freezesFrom` — and every stretch of it falling 2 m per km or more stays an open lead, as §8.2 keeps every fast
   current; the waterfall's lip — the river's stretch carrying both `rim` and `shore` — is an outfall for §8.2's leads,
   its 12 m disc open water in every week, so the fall keeps running and `sky.fall` and `sky.mist` draw all year
   (J-V5.86). An island in an arid row never freezes.
4. **Snow and the sun** (item 117 (g)). While the view's `weather` is `snow` — by default the climate row's snow band in
   a `cold` or `severe` winter, never in an arid row — snow lies on the island as on the ground: the `snow` role over
   `sky.island.land`, its field faces and its roofs, `road` keeping its value. Snow is the one look under which the
   island's land shares the ground's colour; the island then reads against the ground beneath by its rim's `ink` ticks,
   its shadow and, in `offset`, its underside, all drawn in every week. The view sun's height by week (§8.4's *Sun*)
   lengthens the island's drawn shadow (V05 §5.3) in winter and shortens it in summer; the strips and `shadeSky` read
   item 102's model daylight and never move with the week (V05 §3.19), so V05 §5.3 (5)'s agreement is read at an
   equinox week, where the view's path sun stands on the model's day.
5. **The off form and the other states.** A document whose pinned tables hold no item-117 season rows draws the island
   by §8.2's four override rows, as it draws the ground. A `waning` or `settled` island dresses as a floating one; a
   `fallen` or `removed` one has no sky look, its landfall's rubble and quarry face taking the ground's (V05 §3.16).
   Picture exports draw and name the chosen season (V05 §5.5); the re-skin's cost is V05 §6's season row.

**Festival pennants** (item 118 (d), the sky's part; J-V5.87). A look, never a change (item 118 (a)). While the view's
week lies inside a festival's weeks under §2.9's festival display — following §7.7's DR43 schedule, or previewing one
festival — every island not `fallen` or `removed` carries pennants by V11 §3.25.7's `SKY` row (its counts and its band).
The ground's tier rows and their places (`towers`, `walls`, the squares and ways) are the ground arena's: an island draws
the `SKY` row alone, at whatever rung it stands. The row's two places stand on the island as:
* `rims` — the island's rim chain: a run item at the row's spacing from a keyed offset (§8.2's run rule, keyed by the
  island's render key and the festival's id), each pennant on the land side of the rim; the run skips the rim's
  stretches fronting a landing yard, where that landing's own pennants stand, and the waterfall's lip;
* `landings` — each access top's landing yard (`sky_landing_top`, V05 §3.10 (5)): its two pennants at the two ends of
  the yard's front on the rim, flanking the access top, so the yard's passage from the top to its attach on the
  island's way stays clear. A ground landing carries none of the `SKY` row's.
Colours and motifs are §8.2's — the festival's culture and deity rows with the season's motifs (V11 §3.25.7). The
pennants are `live.festival`'s marks on the sky base (§8.2's slot 19b, under every label), drawn in the island's frame
and displaced with it under `offset`, faded with the sky layer under `ghost`, and none while the view does not draw the
sky layer (hidden, and not the view's working layer; §8.4); the seed, the festival and the island fix them, so they
draw the same in every view and export (byte-stable tiles) and a
moved island carries its pennants with it. Picture exports draw them and a VTT island scene in its image only (V05 §5.5;
§11.1); their cost is V05 §6's pennant row.

### 5.2 Occlusion

`ghost` by default (§8.4), `opaque` and `offset` as the sky `LayerSpec` sets them or an island's own `occlusion`
overrides. In `offset` the island's marks, labels and shadow-free silhouette draw displaced by `elevation ×
offsetPerMetre`, while its cast shadow stays where the sun truly puts it; the sky base is **lit at the island's true
position** and drawn displaced (V05 §5.3 (2)), and every pointer and tool point on it is un-displaced before the anchor
conversion (V05 §4.2). A sky layer the view does not draw — hidden, and not the view's working layer (§8.4) — draws and
lights nothing; the islands still exist and the model is unchanged (T15-1).

### 5.3 Light and shadow — the underside's shadow (the owner's J98)

1. **The slab list** (§8.4 (a); file f item 415) holds, per island and under every occlusion mode, underside tier 0 and
   underside tiers 1 … n of V05 §3.9 (2), each its world ring, its top and its underside, so the island's shadow is the
   shadow of its whole rock: a `root` casts a long tapering tail under a low sun, a `flat` only its rim; the ground right
   beneath is shaded from above yet lit from the side through the gap under the root; and the penumbra widens with the
   distance from the underside, so a higher island's shadow is softer (§8.4 (c)'s law). An island is never written into
   the ground's surface layer as a column, whose shadow would start at the footprint's edge and lose the gap and the
   profile (J-V5.15).
2. **The sky surface layer** (§8.4 (f); J-V5.16). Where an island's drawn land face touches a tile, the tile worker rasters
   that tile's sky marks into a second base and a second surface layer (the island's terrain at its datum, its roofs,
   towers and crowns), each with its max-height pyramid. The light pass lights the sky base over the sky surface layer — its
   rays reading the ground's pyramids, the other islands' slabs and its own island's surface — and the ground base over the
   ground surface layer with the whole slab list; then composes: `opaque`, the lit sky over its coverage; `ghost`, the lit
   sky × (1 − `ghostAlpha`) over the lit ground × `ghostAlpha`; `offset`, the lit ground everywhere and the lit sky over its
   displaced coverage. The CPU reference and the GPU pass run the same law. A tile no island's land touches takes no second
   base, but it is re-lit where an island's shadow falls on it — the shadow reaches up to 8 × the island's height from its
   footprint. **The global light's window** reads the surface layers' own top, without the slabs, and each slab whose
   shadow sweep crosses the ray's plan is tested exactly over its own reach (§8.4 (c), §8.1's `surfaceLayerTopCm`; file f
   item 416; J-V5.56), so an island lengthens no ground ray's window; a tile culls the slabs whose sweep's bounding box
   misses it. A degenerate tier ring drops its slab.
3. **Rung 3** (the vector rung): the island's shadow is the union over its underside tiers of each tier projected in the
   **`prism` form** — its ring swept along the sun vector from its underside's offset `b · c` to its top's `t · c`, then
   unioned — whatever `vector.projected` says for other casters, since an island is a floating solid (J-V5.55); the rim
   slab sweeps from its base to the surface top. So a `root`'s thin lower tiers join into one tapering tail instead of a
   row of beads. Only when §8.4's rung-3 budget fallback fires is the `drop` form used, and then the tiers are subdivided
   so that no tier's sweep `(t − b) · c` exceeds its ring's inradius, which keeps successive drops overlapping.
4. **The cursor sun under an island** (J-V5.14). The cursor sun's height is floored by §8.4 (d) at 1.5 × the list's
   `surfaceTopCm` above the view's ground whenever the view draws the sky layer (visible, or Sky the view's working
   layer, §8.4) and the document holds an island that is not fallen — whatever is in view — so no sun ever stands below
   a floating island and panning never changes `H`: it moves with the zoom alone; the path and fixed suns are
   unchanged.
5. **The picture and the model agree.** The light pass's shadow (from the rough tiers, at any sun) and the model's strip
   (from the smooth tiers, at the sampler's fixed suns, V05 §3.19) read one solid: under the path sun set to the equinox at
   a sample's hour, the style's `sun.latitudeDeg` set to the site latitude, the rung-3 shadow of the smooth tiers on flat
   ground covers exactly the cells the strip marks for that sample, within one field cell at the boundary (T-V5-20) — so
   the shade map and the drawn shadow never disagree about where an island's shade falls.

### 5.4 Labels

The island's `quarter` label draws at the city band along its long axis (§9.3's area rule on its land face), its
districts' labels from the district band, an institution's `landmark` label, a landfall's `place` label; accesses carry
no label, and neither does a strip (the shade map view's legend names the islands). Candidates of sky entities are held in
the island's local frame and translated by S14 (§9.1; file f item 415). §9.2's candidate set: sky rows only while the
view draws the sky layer (visible, or Sky the view's working layer, §8.4); under `opaque`, a ground row whose anchor
lies inside a visible island's drawn land face is no candidate; under `ghost` both are candidates, the sky rows at 1.5
× their priority; under `offset`, sky candidates at their displaced positions at the stop.

### 5.5 Exports (§11.1's rows, file f item 415)

| format | the sky |
|---|---|
| `.plat`, JSON schema | island records with local geometry and `anchor` (a `removed` record with its `removed` field and no arena geometry, the arena in the archive); `SkyAccess` records; `removedAccesses`; every field's tier |
| compact twin | world coordinates (anchor added), `layer` and `elevationCm` per sky entity |
| GeoJSON | FeatureCollection `sky` — present with the setting on, empty where no island floats, absent with it off: one feature per island — its projected land face, with address, name, reason, state, `areaHa`, `altitudeM`, `elevationM`, supply, `placement.over`, the underside's kind and depth — then its entities in world coordinates with `elevationM`, its accesses as LineStrings (top → foot) with kind, role and run, and its strip as up to three MultiPolygon features (`kind: 'shadeStrip'`, `samplesAtLeast` 1, 3 or 5, `basisCurrent`; one with no cells omitted); the island's own retaining walls as file f item 447's `retaining` LineStrings in world coordinates, plus `elevationM`; a removed island is not exported; a landfall in the `ground` collection |
| SVG | `<g id="layer.sky">`, one `<g id="sky<part>">` per island; the shadow group; the underside and tether in `offset` exports; in an export of the shade map view, `<g id="sky<part>.shade">` with the strip's solid outline and any dashed pending outline (volume 9's veil in its own group) |
| PNG / tiles | the sky layer's own transparent PNG (§11.1's per-layer PNGs); lit by V05 §5.3 at the export's sun |
| VTT | one scene per island in its local frame, its elevation recorded; the rim a wall that blocks movement and not sight; each landing yard a note linked to its ground landing's note in the ground scene |
| glTF | per island a node at (`anchor`, `elevation`): its terrain draped over the land face, the rim wall down by the rim thickness, the underside lofted between the underside tier rings (each resampled to `export.gltfRingPoints` points by arc length from its point nearest the island's bearing; a `flat` island's rim slab closed by its base), its retaining walls as walls on its terrain, its buildings and trees, the river sloped, the fall as a mist quad `export.mistM` tall; hoist ropes and rope lines as thin cylinders, a stair's steps as boxes along its helix with a slab at each landing, a light bridge as a translucent ribbon; `extras` with address, reason and state |
| CityJSON | the island as PLAT's extension object `+FloatingIsland` (its top TIN and its underside solid, attributes as GeoJSON's), its buildings as `Building`s based at its elevation, accesses as `+SkyAccess` lines — PLAT's extension schema gains both types |
| CSV / statistics | island count, areas, altitudes, carried households by band with each band's share of the island's land, supplies, states, district counts; per island its strip's area blocked for at least one (`cells`), three and five samples, the mean prosperity inside its three-sample area and in the same district's cells outside it (item 102 (g)'s quantity), whether its basis is current, the trades left on the ground by `carry` with their reasons, the split shops carried, the coverage instances taken per island district, the S3 reservation handed over and its taker, the crypt's form, the count of cross-arena pulls and links by landing; the node term when it acts; per active chain that crosses an island, its island nodes, the landing its links cross and their route lengths; per landfall, the covered walls, towers, bridges, reservations and ways, the covered raised spans, raised-way piers and retaining walls with their new states, the deck plots tombstoned with their decks and the other islands' accesses re-landed; per island and epoch, each clearance raise (`reclearIsland`) with the caster that caused it; the removed islands and access ordinals |
| skeleton file | declared islands (T5 with `sky`) and placed accesses (T4) as declarations |

Knowledge: a `secret` access is withheld from every key that does not admit it (§9.2's filter, §11.1's *Knowledge*). The
strip is thematic: the PNG and tile layers, VTT, glTF and CityJSON carry the island's physical shadow through the light
pass and its solid, never the strip (J-V5.35). The parity presets export no sky content, their recipes holding islands
off; an export written mid-lag carries `basisCurrent` false, and an export after a load equals the one before.

**The looks** (items 117 (h), 118 (g), 120 (i)). Every picture export of the sky layer — SVG's `layer.sky` group, the
sky layer's PNG and tiles, print — draws the island's season, its pennants and Find as the view shows them and names the
season and the festival (§11.1). A VTT island scene records the season in its `plat` object with the island's frozen
water faces (the spring pond, a frozen river's stretches) as `ice { walkable }` polygons in the scene's local frame, by
§11.1's battle-map rule, draws the pennants in its image only (never walls, lights or obstacles) and leaves Find off
unless asked. GeoJSON, glTF, CityJSON, the compact twin and `.plat` carry none of them: they are looks, never model
facts.

### 5.6 Find on Sky (item 120, the sky's part; J-V5.89)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the gaps
switch), outside the document, its hash and the log, kept across bands, layers, weeks, epochs and edits until **Clear**
or the panel's close. The panel, the type-ahead, the chip grid, the results and the `live.find` overlay provider are
V09's; the veil, halo, outline, pin and count-bubble rows §8.2's; the gazetteer's class counts and its match listing by
class, area and layer §11.2's, under knowledge admission at the view's effective key (item 120 (h)) and at its drawn
week (§2.9's `week`; §11.2's *At a drawn week*). This section states what the sky offers and how a match on an island
reads.
1. **What the sky offers** (item 120 (b)), by §11.2's gazetteer over the committed records of every island not `fallen`
   or `removed` (V05 §4.5's island entries): **kinds** — the uses on the islands' plots by their classes, the island
   institution's and the landing tops' (`sky_landing_top`) among them, each class counted once over all layers with
   its split by layer shown; **named institutions** — an institution island's institution (V05 §3.4), the dossier's
   name first; **areas** — each island by its name, the root of its own quarter tree (V05 §3.14: the whole island lifted
   from the veil), and its districts as V01 offers every district; **named places** — the island's own, as the gazetteer
   names them. An access is no target (it has no name and no class); a fallen island's landfall is a Ground place by its
   `place` label's name (V05 §5.4).
2. **On the Sky layer** (item 120 (e), (f)). With Sky the working layer (V09 §4.2), matches on the islands glow over the
   veil by §8.2's rows, each halo, outline, label and city-band pin drawn in its island's frame and displaced with it
   under `offset`, as its marks are (V05 §5.2); an island chip lifts the island's land from the veil and glows along its
   rim. Pins merge into a count bubble only with pins of the same layer and, on Sky, of the same island, so a bubble
   never joins an island's matches to the ground's beneath it or to another island's; a bubble's click zooms in as on
   the ground.
3. **Ghost pins and Go there** (item 120 (f)). With Ground or Below working, each match on an island shows as a ghost
   pin where its mark is drawn — over its ground footprint under `ghost` and `opaque`, displaced under `offset` — and the
   panel counts it "on Sky"; **Go there** sets V09 §4.2's working layer to Sky with its island menu's `key` on the
   match's island and flies to the band that shows it. With Sky working, the ground's and the underground's matches
   show as ghost pins and counts in turn. A hidden sky layer (§8.4) keeps its matches' ghost pins and counts, so a match
   is never lost, and Go there makes Sky the working layer, which the view draws whatever its visibility (§8.4), no
   event sent (item 120 (a)).
4. **Show gaps** (item 120 (i)). On an island Show gaps' units are V01 §5.4 (3)'s `gapUnits` over the island's arena,
   restating none: its districts for a class with no coverage row or a row counted by district or neighbourhood; the
   whole island as one unit for a row counted by walking radius (V01 §3.16; the route to the ground passes every walking
   radius, V05 §3.5 (3)), so a member on the island serves every residential plot of it, a member beneath it on the
   ground none; and V01's per-plot `households` reading over the island's plots for a row counted by households — each
   unit with no member of the class outlined dashed along its land's edge and labelled "none here", a per-plot row's
   gap the unserved plots of each district as V01 §5.4 (3) draws it. A class `IslandRule.carry.never` excludes reads as
   any gap; the clerk's why names the carry rule (V05 §4.5).
5. **Over time, edits and knowledge** (item 120 (f), (h)). Every commit, regenerate, undo, epoch and change of the drawn
   week (§2.9's `week`) re-evaluates the chips: a raised or declared island's matches glow in its commit, a moved
   island's glow moves with it, a fallen island's go dark with its landfall then offered on Ground, and a removed island
   offers nothing. At a drawn week whose frame is not the head (V06 §3.15.2), an island's matches, glow, pins, ghost
   pins and gaps are §11.2's listing at that week, each drawn at its island's anchor in that frame. A `secret` access's
   landing yards, and a concealed use or institution on an island, are never suggested, counted, glowed or pinned under
   a key that withholds them (V05 §5.5's *Knowledge*; §11.2).
6. **Exports and cost** (item 120 (i), (j)). A picture export draws Find on the sky layer as shown (V05 §5.5); the
   islands' entities join `live.find`'s index, rebuilt once per commit and at each change of the drawn week (V09
   §4.21.10 (7)), and the overlay never re-renders the sky base — V05 §6's Find row.

## 6 Performance budgets

All PLAUSIBLE until M6-sky measures them (V05 §8), on §12.1's reference machine; the sky is off on the one-click path, so
§12.3–§12.5's laws are unchanged there. The rows are the targets; the comfort level below binds every one-time wait the
sky takes part in (item 119).

| work | CITY, three islands | METROPOLIS, three islands | basis |
|---|---|---|---|
| S7b (5): `S_town`, slots, reasons, fills | ≤ 3 ms | ≤ 5 ms | one mean over ≈ 24 000 / 62 000 field cells; ≤ 100 fill batches per slot |
| S7b (5): outlines and placement | ≤ 8 ms | ≤ 20 ms | the 64 m class raster once (≈ 6 000 / 15 600 cells); ≈ 15 600 / 40 000 candidates × ≤ 30 / 60 outline cells |
| S7b (5): the reachability transform (V05 §3.7 (2)) | ≤ 0.5 ms | ≤ 1 ms | one two-pass chamfer transform over the class raster, the raised parts' piers, dilated deck plans, deck faces and any landfall's members rasterised into it once (≤ 40 raised parts at METROPOLIS); one read per rim cell of a candidate |
| SKY, per island | ≤ 7 ms | ≤ 10 ms | one L0 and one L1 batch; terrain ≈ 4 000–16 000 cells and `hydro` ≈ 1 700–6 500 on a 520–1 010 m frame (a disc to a grown spindle, V05 §3.8 (1)); the river; the claim search (≤ 2 000 sites at 10 m, each an O(1) fit and the crypt test); the ground landing claims |
| SKY: the island's gradient field (V05 §3.11) | ≤ 0.5 ms | ≤ 1 ms | ≤ 200 / 400 lattice cells: two ranks, one sort, the band map, ε and the three-box blur |
| the unit run, per island (volume 1's rate) | ≈ 8–12 ms, on the generation worker concurrent with the pool | ≈ 12–18 ms | ≤ 3 districts' worth, ≈ 2–5 % of the town's plots |
| SKY: the ground reference and the altitude, per island | ≤ 1 ms | ≤ 1 ms | ≤ 300 / 800 field cells under the projected solid, each a terrain read and a ceiling from the placed casters and the allocated tower rows |
| field pass 2: the strips onto the ground, per island (and per epoch) | ≤ 4 ms | ≤ 6 ms | ≈ 4 600 cell-sample tier walks at METROPOLIS's largest island (the low samples' long sweeps dominate), each ≤ 7 tiers × ≤ 20 steps of O(1) mask reads, most ending at the first hit, after the corridor's O(1) pre-test per cell (V05 §3.19 (5)); ring masks ≤ 60 000 / 160 000 bits, built once from `shadeBasis`; measured on the flat B-CITY fixtures and on a mountainous METROPOLIS fixture (relief class `mountainous`, island over a valley) |
| SKY's last step: strips onto islands and `shadeSky` | ≤ 1 ms | ≤ 1 ms | ≤ 500 lattice cells per receiving island, only under a higher island |
| the route distance (V05 §3.20) | ≤ + 5 % of the unit run's S10b and of the pooled S10b of the districts holding a landing | same | ≤ 9 admitted accesses × 3 raster reads per pull that crosses arenas |
| SKY-F | ≤ 3 ms | ≤ 4 ms | the clearance check over the projected faces; ≤ 60 lights per island |
| **the model's critical path** | **+ ≤ 55 ms p50, ≤ 68 ms p95** | **+ ≤ 84 ms p50, ≤ 104 ms p95** | the unit runs hidden by the pool while the generation worker's concurrent work (hinterland unit + islands) stays below the pooled time; the ground's work falls by the carried share |
| S14, per island | ≤ 4 ms, ≤ 5 000 marks | ≤ 6 ms | the district rate on its fabric plus rim, shadow, access and slab records (≤ 7 slabs, ≤ 256 vertices each) |
| rendering, a tile an island covers | ≤ + 30 % of that tile's raster and light-pass time | same | the second base and surface layer (V05 §5.3) |
| rendering, the light pass on tiles no island's land covers | ≤ + 5 % against the same map without islands | ≤ + 5 % with three islands | the window without slabs and the per-tile slab cull; measured at P3; **fallback:** cull the slabs per tile by the exact union of their shadow sweeps (not the bounding box), re-measured |
| `setAttr` altitude, occlusion, underside, name | ≤ 5 ms | ≤ 5 ms | the record, a marks delta and a slab delta |
| a move | ≤ 65 ms | ≤ 70 ms | 5 ms plus two post-build placements (§12.6's 30 ms each) |
| a resize, a rim reshape (J-V5.81) | ≤ 5 ms + §12.6's scoped regeneration of each receiving district and of the district whose institution claim is re-searched where it receives no face (at most k ≤ 3 in all; V01 §6's sky row) + §12.6's scoped-regeneration law once over the plots the event re-cuts outside those districts (each re-claimed yard's covered plots by §7.3's local operator; a shrink's or an inward stretch's cleared and re-cut plots, §4.7 S10 (7)) + §12.6's 30 ms per re-claimed landing yard's top placement (`placeAt`, one per access; a reshape's on the moved stretch's yards only) + §12.6's 30 ms per re-landed foot's placement | same | the buffer bisection (≤ 12 steps), one island L1 batch re-laying the strip and yards, the claim re-search (≤ 2 000 sites at 10 m, SKY's rate) only where the claim no longer fits; a yard's 12 × 14 m touches ≤ 3 plots, a shrink's re-cut plots those its eroded band and re-laid strip line cross; volume 1's `plantRimWalk` once (two `Greenery` records); volume 6 sums its century from this row by citation (V06 §6.2) |
| New random on an island | ≤ 40 ms | ≤ 55 ms | SKY plus its unit run |
| `placeSkyAccess`, an access `delete` | ≤ 35 ms | ≤ 40 ms | an island L1 batch, a local re-derive and one placement |
| declaring an island after generation | ≤ 120 ms | ≤ 160 ms | the fill with its relocations, SKY, the unit run |
| `fallIsland` | ≤ 80 ms | ≤ 110 ms | relocations, demolitions, the archive, and ≤ 30 ms per other island's re-landed access |
| `IslandEpochStep`, per island | ≤ 2 ms plus its conversions at the rows above | same | the epoch's strips are the field pass 2 row |
| `sky.clearance`, per island and epoch (V05 §3.15 (7)) | ≤ 1 ms | ≤ 1 ms | the epoch scope's elements under the projected solid (≤ 300 / 800 field cells), each a footprint test and a top read; no geometry written |
| `skyAccessObstacles` and its callers' tests | ≤ 0.15 ms per call | same | ≤ 27 entries at the defaults (V05 §2.3b); the raised-way solver tests each candidate span against them in O(entries), inside its own budget (the base's) |
| the shade map view's pending strip after an island edit | ≤ the field pass 2 row, computed only while that view is shown | same | never on the edit's own path |
| Update shade now | ≤ the field pass 2 row for one island + the field's recomputation over the two windows (≤ 2 ms) + §12.6's rate for the blocks it re-derives | same | a scoped evaluation, never a whole pass |
| the season switch, on a tile an island covers (item 117) | within §12.5's re-skin budget (R12-30) for the sky base and surface layer with the ground's; the island's leaf cover and ice inside R12-30's 20 % of the tile's raster time | same | a re-skin of the sky marks' `season` column and the sky surface layer's light at the week's view sun; no S14 re-emit, no model work |
| the pennants, on a tile an island covers (item 118) | inside R12-30's 20 % with the ground's decorations, made lazily per visible tile (§12.5) | same | `live.festival`'s run on the rim and the pennants at ≤ 9 landing tops an island (`accessCount.max` + `accessCount.handMax`): a few dozen glyphs an island at V11's `SKY` row |
| Find on Sky (item 120) | inside item 120 (j)'s overlay budget (§12.5: suggestions ≈ 50 ms of a key, a chip's glow ≈ 100 ms of the click) with three islands at the METROPOLIS cap | same | the islands' entities in `live.find`'s index, rebuilt once per commit and at each change of the drawn week (≈ 2–5 % of the town's plots, the unit-run row's basis); an overlay above the sky base, which is never re-rendered |
| memory | ≤ 5.2 MB for three islands (the strips ≤ 30 KB each, `shadeBasis` ≤ 2.5 KB each) | ≤ 9.3 MB (≤ 60 KB each; bases ≤ 2.5 KB each) | an island's arena ≈ 0.5 MB per district's worth; its rasters ≤ 0.1 MB; the sky surface layers only on covered tile positions, inside §8.8's canvas budget B |
| document | ≤ §2.9's 320 B per island building, plus ≤ 2 KB per island record and ≤ 2.5 KB for its `shadeBasis` (the rim copy ≤ 256 vertices × 8 B, the rest ≤ 0.5 KB) | same | |

The strip rows assume the sampler's default of one point per cell; at four points per cell (§4.5's `daylight.pointsPerCell`
fallback) they scale by four — ≤ 16 ms at CITY and ≤ 24 ms at METROPOLIS per island — and the memory row's strips by two
and a half (two bytes per cell become five). The chain rule of V05 §3.20 (9) and the node term add no measurable work: the
one is a filter on the sky fill and the route reads already costed, the other one addend per evaluation. **Pre-decided
fallbacks:** the strip row missed → `shade.stepM` 8 → 16 m and `shade.ringMaskM` 4 → 8 m, re-measured (T-V5-20's
one-cell agreement re-checked), then the samples' reach cap for the strips 8 → 4, recorded as a declared shift of the term;
the model rows missed at M6-sky → the placement lattice coarsens 40 → 80 m and the island units join the pool as units
(pool size ≥ 1), re-measured; the rendering row missed → the sky surface layer at half resolution (rung 2's method), then
rung 3 for the sky base only, reported in the view telemetry; any other row missed is re-declared at its measured value as
a target miss inside the comfort level (D-18) — a one-time wait past the comfort level is never declared: its path changes
first (§12.10's R12-31).

**The targets and the comfort level** (item 119, the sky's part; J-V5.88). The rows above are the targets — as fast as
possible, the build pressing every one toward its figure (item 119 (a)). Every one-time wait the sky takes part in
completes within §12.1's comfort level — ten seconds of total time from the click to the complete result on §12.1's
reference hardware, at CITY and METROPOLIS with three islands, from each rung's bottom to the population cap — the island
rows above being its parts:
* a generation, and a regenerate or Re-derive from S7b with islands — the model's critical path with S14's sky marks and
  the first map's sky tiles;
* declaring an island after generation, and `fallIsland` by hand — each with its relocations, its scoped re-derivation
  and its redraw;
* opening a document with islands, the island-basis migration step included (§7.5, file f item 274), and a dossier
  change that reaches the islands (DR27);
* an `advance` whose epochs run the island laws — the island events an epoch can run priced into V06 §6.8's estimate from
  this section's resize row (`epoch.islandMs`, `epoch.handAccessMs`), so the `advance` as a whole stays inside the
  comfort level, in total (item 119 (a2); J132);
* an export with the sky layer, in every format and size the export dialog offers (§12.1).
A wait past about one second shows its progress, SKY and the islands' unit runs posting as stages (§11.2's `Progress`;
V09 §4.21.9), never an empty screen (item 119 (c)). A row runs slower than its target only for a recorded measured gain
inside the comfort level, as its `perf.qualitySpend` row (V11 §3.25.8; none ships for a sky stage) (item 119 (b)). The
interactive rows — `setAttr`, a move, a resize and a rim reshape, New random on an island, `placeSkyAccess` and an
access `delete`, Update shade now, the pending strip, the season and festival switches and Find on Sky — are
interaction budgets and keep their figures (item 119 (d)). The low tier aims at the same ten seconds, a size it cannot
reach declared per device (item 119 (e)). T-V5-18 measures the comfort level at every island rung.

## 7 Tests and acceptance bars

§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets. They take over the base's
island bars T10-1, T13-1, T15-1 and T102-2 (file f item 476), the island clauses of T117-1 – T117-8 (T-V5-34),
T118-1 – T118-6 (T-V5-35) and T119-2 – T119-5 (T-V5-18), T114-3's landfall clause (T-V5-14), and T120-1's registration
with T120-4's and T120-5's sky clauses (T-V5-36), as §13.2's take-over table names them. Every clause that restates an
owner item's no-op or view pin registers its fixture on V12 §3.7.8's engine under its V12 §2.13 pin, naming the pin, its
off form and the seat that writes the registration (X-V12-11): T-V5-15's item-110 clause, T-V5-19 (c), T-V5-22 (b) and
(k), T-V5-27's two, T-V5-33's item-111 clause and T-V5-34 – T-V5-36.

* **T-V5-1 — the gate** [C]. TOWN and every village rung never carry a sky allocation; a CITY with the setting off carries
  none and its ground digest equals the realism golden (T13-1); the `MFCG` and `FTG` presets carry none; a dossier-bound
  CITY whose `site.magic` resolves `none` refuses the setting (F-EDIT `dossier-owned`).
* **T-V5-2 — the count** [C]. 500 CITY seeds at the target at `wealthLevel` 0.5 and 1: every count 0–3 within ± 3 s.e. of
  the slot law at each seed's own `h_town`; slots never skip; `islands.count` 0–3 give exactly that many open slots on 200
  seeds each (their supply permitting, each empty slot reported).
* **T-V5-3 — the supply** [C, O]. V05 §3.3's calibration bars at P0; `A` monotone non-decreasing in `h_town` and
  `h_carried` over the rows (T10-1); `S_carried` equals the mean of the carried households' band values to 10⁻⁹; a
  fixture with no built district cell gives `S_town` 0 and no slot open (`no supply`).
* **T-V5-4 — the fill** [C]. On 500 CITY seeds with islands: ground plus sky households equal the roster's total exactly;
  carried households by band never include a band poorer than a band left uncarried; the stop cause is one of V05 §3.5's
  three; the fill converges within 100 batches; a slot below `minAreaHa` closes and its rows return, one at exactly
  `minAreaHa` passes; an institution slot carries exactly one instance of one of its tags and its staff, never a COUNT,
  GUILD or QUARTER record or member; with no candidate a slot closes (`no supply` / `nothing to carry`) and with one it
  takes it; no S3 reservation is left without an owner by an institution slot (100 %: the hand-over instance or `park`,
  F-SKY-HANDOVER counted); no household a dossier district-defining record's raised share holds is carried (100 %).
* **T-V5-5 — placement** [C, O]. 1 000 islands on B-CITY: no island without an assignment or declaration has more than 10 %
  of its outline cells over `core`; 0 islands within `gapM` of another; 100 % inside the frame inset; ≥ 80 % of prisons
  ≥ 1 000 m from the plaza and ≥ 80 % of palaces within 1 000 m of it; every F-SKY-PLACE rung counted in the report, a
  fixture with no candidate and one with a single candidate among them; 100 % of islands placed by rule have a rim cell on
  admissible ground or within an admitted slanted row's run of it, including on the lake, estuary and sea fixtures.
* **T-V5-6 — outline and arena** [C]. 10 000 sky outlines per template: simple (§13.2's outline property), area within
  1 % of `A`; each arena's rim is one closed chain carrying `rim`; exactly one void and one land face at L0 before water;
  every SKY commit record writes only its island's key and the ground's landing claims; for every template at every aspect
  its row admits, 100 % of outlines grown by the buffer resize to 1.5 × `areaHaMax` lie inside their frame; a degenerate
  declared lasso is bent as V05 §3.23 states.
* **T-V5-7 — terrain and the conjured river** [C]. On 500 islands with a river: its mean bearing within ± 15° of the ground
  river's; 0 non-monotonic beds; every river ends at the rim with `fall`; its width inside its clamp; F-SKY-TERRAIN's rungs
  counted; with no ground river no conjured river is drawn and a spring pond appears at its draw's rate.
* **T-V5-8 — access** [C]. Every island placed by rule has ≥ 1 access (0 % `unreachable`); a declared island has ≥ 1 or is
  reported `unreachable`; every hoist and stair foot lies on land in an admissible face (never water, a moat, a wall strip,
  a deck face, a pier's footprint, rubble, or beyond the ground frame); every ground landing plot fronts a way or has its
  trail; rope lines ≤ 350 m and bridges of light ≤ 600 m of horizontal run; every stair's helix ends at its top with a
  landing every 20 m of rise; no stair or bridge of light where `magic` is `none`; `guarded` only on a prison; after SKY-F
  every island landing attach is met by an island way, and 100 % of ground landing attaches are met by a walkable part-0
  way after S8 — in a district laid by volume 1's template fabric as in one laid by §4.6; the ground landing of a `secret`
  access is fronted and withheld from every key that does not admit it (100 %). **With item 110** (on 500 CITY and
  METROPOLIS seeds with islands and item 110's rows on, and on hand-built fixtures): 0 raised decks or raised-way piers
  inside any access column or any landing yard dilated by `deckGapM` (100 %, whether the raised part came before SKY or
  after it); every rope line and bridge of light ≥ `lineClearM` over every raised deck and raised-way pier it crosses; 0
  feet and 0 landing yards on a deck face; 0 landing attaches met only by a raised deck or an aqueduct; a T4 `raised`
  stroke ending on a rim leaves 0 ways on the sky arena and places 1 access of an admitted kind (J-VI.4 (d)), an aqueduct
  stroke to a rim and a `raised` or aqueduct stroke on an island's key are bent (J-VI.4 (d)–(f)), each with its line, and
  a `raised` stroke across an access's column is re-routed or, where `skyAccessObstacles` offers no re-route, ends at the
  last ground vertex before it with "this would cut <island>'s hoist; it ends here".
* **T-V5-9 — the unit run's contract** [C]. The rim strip is never cut or plotted; `SeamReport.portalsTotal` = 0; the
  island's district count equals V01 §3.10.3 (2)'s count for its allocation read with `districtHa`; an island with
  `h_carried` = `h_town` = 1 has 3 districts at METROPOLIS and at least 2 at CITY on ≥ 90 % of seeds; every island
  district's kind is a `sky-*` kind of V05 §2.4 and every fabric hint a valid `FabricStrategyId`; on 500 seeds, 0
  households re-homed from an island by S10a's band-range step, and each carried band's share of the island's plot land
  within ± 5 % of its carried share; its housed households equal its allocation's, or F-SKY-UNIT's overflow is reported
  (a fixture island whose land is all rim strip and claims among them); the runner lays no second terrain on the island
  and its field step reads the unit inputs' values; an island with no river, no claim or one landing is served; the
  inputs re-assembled after a save and load equal the session's.
* **T-V5-10 — underside and altitude** [C, O]. The apex clears the tallest caster beneath by ≥ `clearanceM` on 100 % of
  islands after SKY-F, locked ones excepted as V05 §3.9 (5) lists them; the altitude fixed at SKY stands (no F-SKY-CLEAR
  raise) on ≥ 99 % of 1 000 islands at CITY and METROPOLIS (V05 §3.9 (5)'s measurement, with item 110's terrace,
  raised-way and deck-plot rows on at their defaults), and the 100 % clause holds after every epoch of a century run
  (`sky.clearance`); each underside tier's ring lies inside the one above it translated by the apex step, with decreasing
  area; each profile's measured radius ratio (the tier rings' equivalent radii ÷ R) within 0.05 of ρ(z_i) at every tier;
  a `flat` island has no root tier, a floor above `E_max` wins (listed), and `depthCm` never exceeds `maxDepthM`.
* **T-V5-11 — lights and names** [C]. Rim orbs at 40 m ± 1 m; the keel light's intensity 4 000 × `h_carried`; a settled
  island's magical lights 0 cd and back at a refloat; every island named; its `quarter` label drawn at the city band at the
  reference viewport on 100 % of visible islands whose land face holds it.
* **T-V5-12 — labels and occlusion** [C]. Under `opaque`, 0 ground labels drawn inside a visible island's land face;
  under `ghost`, a sky label wins a collision against a ground label of equal priority; under `offset`, sky labels drawn at
  their displaced positions; with the sky layer hidden and Ground the working layer, 0 sky labels and no model digest
  changed (T15-1); every shipped
  sheet of §8.2's presets table — V05 §5.1's list, the ink-family variants `parchment`, `bw-print` and `night` and, from
  volume 7's V-M1, `painterly` among them — loads at every band with every sky semantic resolved, and the `fallen` row
  draws over the landfall's members; a strip with no three-sample cell draws no outline.
* **T-V5-13 — the underside's shadow under the fixed, path and cursor suns** (the owner's J98) [C, O]. A hand-built
  island (8 ha, `root` profile, 100 m altitude) above the golden TOWN, `ghost` occlusion (and (a)–(c) again under
  `opaque`), the view at the 1:500 stop, CPU reference and GPU pass: (a) under the fixed sun set to 15°, 30° and 60° and
  the path sun at three hours, the shadow's boundary on open ground within max(1 px, §8.4 (c)'s floor-cell diagonal) of the
  analytic union of the tiers' projections; (b) the shadow's area strictly increasing as the sun lowers; (c) the same
  island with a `flat` profile: at 15° the `root`'s shadow reaches past the `flat`'s by `depth · cot 15°` within 1 px
  toward the sun (toward the footprint); (d) the cursor sun at nine pointer positions at the 1:500 and 1:2 000 stops: the
  shadow falls away from the pointer, `H` ≥ 1.5 × the list's top, the GPU within §13.4's tolerance, and at a fixed zoom
  panning the island into and out of view changes `H` by 0; (e) at 15° a ground point under the island's centroid but
  outside the root's projection is lit (V > 0); (f) the penumbra's width at 200 m altitude exceeds that at 100 m; (g) the
  `flat` island with a 30 m rim against a 10 m rim: at 15° its shadow reaches 20 m · cot 15° farther toward the sun within
  1 px (the owner's "thickness"); (h) at 15° the `root`'s rung-3 shadow is one connected region (the prism form); (i) with
  the sky layer hidden and Ground the working layer no slab is lit or drawn and the ground's picture equals the map
  without islands, and with no island
  no second base exists; §13.4's base island-shadow golden stands.
* **T-V5-14 — over time** (takes T114-3's landfall clause) [C]. T8-6 stands (a CITY dropping below 10 000 loses its
  islands through waning, settled and fallen over their dwells); on the hook fixture a settled island refloats before
  any island is raised; a resize keeps
  every plot address away from the rim (100 %); after a growing and a shrinking resize and a rim reshape on the hook
  fixture's institution island, the rim strip lies `rimStripM` inside the new rim everywhere and every landing yard meets
  its top on it (100 %), the rim walk stands on the re-laid strip — one `esplanade` and one `street_trees` `Greenery` after
  each — 0 ways cross the strip, a growing resize re-derives exactly the districts that receive band faces and the district
  whose institution claim is re-searched, a shrink and a reshape's inward stretch no district but that claim's district
  where the claim is re-searched (every other island district byte-identical, the district count unchanged), after a
  re-search the institution stands on its new claim in one building with the old one demolished, a shrink requested below
  the institution floor is bent to it with the claim keeping a site in its own district, and an epoch's erosion toward a
  sliver stops at the one-face floor, listed (J-V5.77). **The landfall:** it adds and removes no ground edge, demolishes
  exactly the covered set's buildings, keeps every locked entity, credits the ledger with the covered land area × 3 m³,
  relocates every dossier use before its building goes; on a fixture whose footprint covers a wall stretch, a `main`
  gate, a tower, a bridge deck, a market reservation, a way, a harbour quay, the sea and a cliff, each covered entity takes
  its row of V05 §3.16 (4)'s table — the `breached` run with a knot at each end (a `dismantled` run kept) standing again at
  the next `fortification` phase when the ring is in use (V06 §3.7.5; T-V6-11), the tower and the gate inside it with no
  state written to any `Tower` or `Gate`, the market's use relocated, the way a `track` holding its former class in
  `Way.formerClass` (a lane volume 6 had downgraded keeping its earlier one; 0 covered ways without one) until an epoch's
  clearance restores it (V06 §3.5.2; T-V6-66), the landfall's quarry carrying its `source` and read by no underground
  quarry rule — the part over the sea reported sunk, the cliff unchanged, a locked wall kept, each listed as a fate, and the
  undo restoring every class, `formerClass`, profile and state; a fall wholly over water lays no decoration and reports
  "sank in <water body>"; a fall covering another island's hoist foot and landing plot re-lands that access as a
  `ropeway` from the same top (or by F-SKY-ACCESS's ladder), the other island keeping a way up or reported `unreachable`,
  and the undo restores it; a covered composed building and its floor plans go with it and return with the
  undo. **The dossier:** an absorb removing an
  island's palace leaves the island at once without it, and at the next epoch the island takes the next palace instance
  where one exists, else becomes a prosperity island where the rich band admits it, else wanes (the three cases on
  fixtures); with the island locked, the palace still leaves at once, the island keeps its reason and vacant claim listed
  `held without its institution` at every epoch, and (1b) runs at the first epoch after the unlock; each
  conversion's undo restores the model byte for byte. **With item 110:** the landfall fixture also covers an aqueduct span,
  a viaduct's raised-way pier and the span it carries (itself less than half covered), a generated retaining wall on a
  terraced ward and a bridge carrying deck plots — each by its row of V05 §3.16 (4)'s table: the span on the ruined pier
  `ruined` with it, the viaduct's crossing closed and the ways beneath touched only where covered, the aqueduct's lost
  supply read at that epoch's `raisedWays` step when the fall is an epoch's (its ruined parts in `EpochScope.raised`; the
  next epoch's for a hand `convert`), the wall still `decayed` after a re-derivation until an epoch's restoration, the
  platforms' datums unchanged, 0 vacant plots left on the ruined deck and its later repair re-offering its faces to new
  lineages; the covered spans, piers and walls in `members` as `{ raised, span: [a, b] }`, `{ raised, support }` and `Id`s,
  the same members after a re-derivation of the viaduct, each leaving in the batch of the op that ends its cover (V06
  §3.5.2), the deck plots listed as fates, never members; all of it in V05 §5.5's per-landfall CSV, and 0 edges of the
  ground's streets and plots added or removed beyond the tombstoned deck plots' lines. **A raised gate** (T114-3's
  landfall clause): on a fixture whose footprint covers a viaduct's crossing station on a raised gate, the station's
  stretch is `breached` by the wall row and the spans either side of it `ruined` with it, the station's `supports` entry
  carrying no `state` and `members` holding no `{ raised, support }` for it; then the deck's repair (§2.7's support step
  (3)), by hand and, on a second run, by V06 §3.19.2 (5) at the next epoch: each `repairRaised` beside the station
  repairs its stretch first by `repairWall` in the same batch — the stretch repaired with the deck, never a deck on a
  `breached` run at any commit — and the landfall's undo restores the stretch and both spans.
* **T-V5-15 — goldens and determinism** [C]. Two sky fixtures join §13.3's goldens — a CITY with a prosperity island and a
  conjured river; a METROPOLIS with a palace island and a prison island — identical on the five engines; every stream key
  distinct (§6.1's sky fixture); a one-island document draws slot 1's indices only; an island raised after a fall takes a
  new part; a document with an island declared, moved, resized, given an access and brought down replays to the session's
  digest, and a saved and reloaded landfall equals the session's byte for byte. **Item 110's pin and shift** (J-V5.67):
  the suite registers on V12 §3.7.8's engine (X-V12-11); with item 110's rows off, read as V11 §3.24.0's switch table,
  both sky goldens are byte-identical to their pre-item-110 digests (V12 §3.7.8's off-state set); switching the rows on at
  their defaults changes both once, recorded as one declared shift naming the two fixtures by V12 §3.7.6's rule (raised
  ways and retaining walls beneath and on the islands; `groundRefCm` and the altitudes where a raised part stands under a
  solid); the METROPOLIS fixture pins one raised way under an island (T-V5-31 (a)).
* **T-V5-16 — editing** [C, O]. Every event of V05 §4.2 undoes exactly; §7.3's oracle checks byte for byte outside V05
  §4.3's scopes on B-EDIT sequences with island edits (10³ in the PR tier, 10⁴ nightly); a move keeps every address on the
  island; New random on an island keeps the ground's digest; a declaration where `h_town` = 0 carries the `held against
  its supply` fate; a fourth island is bent to join the nearest island (J-VI.4 (a)); the dossier-magic refusal holds; a
  resize below the claim floor and a reshape past it are bent with `bend.island.keepRoom` and `bend.island.rimStop`, a
  reshape toward a non-simple rim is bent back to the last simple position; a seventh hand-placed access on one island is
  bent into a move of its nearest hand-placed access; a `sky` quarter at a TOWN rung is bent to the ground
  on a standalone map and refused on a dossier-bound one; every tool gains at most one parameter; an edit with an empty
  effective scope folds with no change; the undo of an epoch, of Update shade now and of a re-derivation restores the
  former bases, strips and field cells, while an island edit's undo touches none.
* **T-V5-17 — exports** [C]. GeoJSON sky coordinates equal `anchor` + local exactly and validate; the `sky` collection is
  present and empty with the setting on and no island, absent with it off; each island's VTT scene imports with no manual
  steps; the glTF island mesh is a closed manifold and validates; CityJSON with PLAT's extension validates; the parity
  presets export no sky content; an export mid-lag carries `basisCurrent` false and one after a load equals the one before.
* **T-V5-18 — budgets and the comfort level** (item 119; takes T119-2 – T119-5's island clauses) [C]. V05 §6's rows
  on B-CITY and B-CITY-lite METROPOLIS seeds with three islands, or their fallbacks applied and reported, the obstacle
  row with 27 accesses; the one-click path unchanged (§12.5). Item 119's comfort level at every island rung — CITY and METROPOLIS, each at its top and at the population
  cap, with three islands: each one-time wait of V05 §6's list, five seeds, p95 ≤ 10 000 ms from the click to the complete
  result on V12 §3.15.9 (2)'s wait timer (T119-2), an `advance` with islands timed in total (V06's T-V6-24 fixtures with
  their islands); every wait over one second naming its stage within one second, never an empty frame (T119-3); every
  sky row above its target holding its `perf.qualitySpend` row (T119-4); V05 §6's interactive rows not relaxed against
  the previous release (T119-5).
* **T-V5-19 — the shade strip moves the field, gently** (item 102 (g)'s island clause) [C, O]. A uniform district — level
  ground, one district kind, no driver varying across it — with a hand-built island (8 ha, `root`, underside 100 m above its
  ground) over its southern edge, latitude 50°, `w_sun` at its default: (a) the mean pass-2 prosperity over the cells the
  strip blocks for at least three samples is lower than over the district's unblocked cells by the expected difference —
  `w_sun` × the mean shade share of those cells, passed through the field's smoothing computed on the same fixture, never
  assumed — within ± 10 % of it; (b) no plot's band differs by more than one from the same fixture with the strip left out;
  (c) with `w_sun` = 0 the field and the town are byte-identical to the run without the island term, and with no island
  every strip is empty and the field byte-identical to the base's pass 2 (no-op pins) — this fixture's NoOpPin
  registration on V12 §3.7.8's engine under `item102.sun` (V12 §2.13; its off form the cells T102-1 names, `w_sun` 0),
  written by the M6-sky seat landing P1; (d) the strip identical on the five engines;
  (e) an island at the frame's edge reports F-SKY-SHADE's clipped share; (f) V05 §6's strip row; (g) over a cliff
  and a steep valley the island's bits and the terrain's are OR-ed, each point counted once.
* **T-V5-20 — the model and the picture agree; the underside shapes the strip** (J98) [C]. For each sample, the CPU
  reference's rung-3 shadow of the smooth tiers under the path sun set to the equinox at that sample's hour, on flat
  ground, covers exactly the cells the strip marks for that sample except cells its boundary crosses; a `root` island's
  strip at sample 0 reaches past a `flat` island's of the same outline by its depth × `c` within one cell along +ŝ (toward
  the footprint); a 30 m rim against a 10 m rim lengthens the `flat` island's strip at sample 0 by 20 m × `c` within one
  cell along +ŝ; the basis rim's simplification (≤ 256 vertices) moves no strip bit on the fixtures; a tier ring below one
  mask cell blocks nothing and a receiver above the apex is never blocked.
* **T-V5-21 — order, lag and the supply** [C]. (a) `S_town` at S7b and at an epoch equal to 10⁻⁹ between `w_sun` at its
  default and 0 when only the islands' strips differ; (b) after a move, an altitude, a resize and New random on an island,
  the ground's field rasters, every plot's derivation record and the shade view's veil byte-identical to before — only the
  pending outline moves — the strip's basis stale and the fate listed; at the next epoch (or after Update shade now, over
  its two windows only, the basis's `by` reading `update`) the strip recomputed from the island's new state and the field
  moved; (c) the epoch after a fall carries no bits from that island; (d) a document with an island moved and an epoch run
  replays to the session's field byte for byte; (e) a lower island under a higher one reads `shadeSky` > 0 on its cells in
  the higher one's strip and 0 elsewhere; (f) on a fixture where a house (volume 6's building shade mask, after one epoch)
  and the island shade the same sample point at the same sun, the OR counts it once, at the default sampler and at four
  points per cell alike, and the strip's `bits` equals the mask's; (g) the participant `sky.islands` runs once per epoch at
  `afterField`, after S6's re-evaluation, and a history run with the engine's other participants switched off draws the
  same island values; ground plus sky households equal the epoch's target after `siting` (100 %), the released households
  placed first from the displaced pool with cause `island` and the taken ones subtracted by `demandTaken`; (h) **the lag
  survives a save**: move an island, save, reload, then re-derive a block with a prosperity brush — the field raster and
  every derivation record equal those of the same session without the save, byte for byte; the same after an F-SKY-CLEAR
  raise and after a `w_sun` = 0 table (the strips still computed and held); the same on a **terraced fixture**: an island
  over a ward that S10 and S11 level with retaining walls — the strips computed at S10a equal those a load rebuilds after
  the levelling, bit for bit — and after a T2 terrain stroke under a strip (the bits re-read over its scope from the
  unchanged basis equal a load's rebuild); **a raised island**: an island raised at an epoch (after S6) and one declared by
  T5 between epochs, each saved and reloaded before the next evaluation — the load writes no basis, neither casts nor
  receives a strip, and the field raster and every derivation record equal those of the same session without the save,
  byte for byte; after the next epoch's S6 (or Update shade now on it) each casts; a document whose `schemaVersion`
  predates the basis step loads with the basis of every unfallen island computed once, and never again; **one strip per
  evaluation**: with volume 1's S9b registered, the strips S9b's manor sun factor reads and those field pass 2 folds are the
  same held strips, bit for bit, at generation and at a re-derivation from S10a (whose bases are written at S10a's start,
  before step (i)).
* **T-V5-22 — siting across the island** (item 103) [C, O]. On 300 CITY seeds with islands, in the siting statistics suite
  (item 103 (e)): (a) no class `IslandRule.carry.never` excludes is carried by any island (100 %) and no NEEDS row is
  satisfied by island water; (b) a class with a district coverage row serves the island's districts at or above the
  ground's served share of districts, its island members spaced by its same-kind row, and with the coverage weight 0 the
  run is byte-identical to one without coverage (no-op pin: these seeds' NoOpPin registration on V12 §3.7.8's engine
  under `item103.coverage`, its off form the cells T103-3 names, written by the M6-sky seat landing P2); (c) island classes
  with a ground supply edge stand at a mean route distance to their providers below that under random placement on the
  island; (d) the ground's suppliers of island
  classes stand nearer the landing feet than under random placement; (e) a `secret` access carries no pull of a class
  whose clientele is not clandestine (100 %); (f) the crime-aligned classes stand farther from a prison's guarded hoist
  foot than their baseline; (g) on hand-built fixtures every route distance equals the sum of its legs to the centimetre (a
  foot outside the walls reaching an inner class through its gate; a foot coincident with its class), `skyRoute` names the
  access of the least sum, a `river` or `sea` edge across arenas is ∞, and an island with no admitted access routes
  nothing; mirroring item 105 (k) across the arenas: (h) a multi-output producer with island consumers sits nearer its
  dominant output's landing foot than its random baseline, and island consumers of a shared ground provider bind to it by
  the route; (i) split pairs across the arenas appear for split classes past the threshold, are reported, and never appear
  in the parity presets; (j) the per-arena relaxation settles within its cap, the second pass moving fewer members than the
  first, byte-stable across runs and worker interleavings; (k) with the web's weights, `comfortM` and the spacing at 0, the
  result is byte-identical to the run without items 105 and 107 (no-op pin: these seeds' NoOpPin registration on V12
  §3.7.8's engine under `item105.web` and `item107.spread`, their off form V11 §3.7.4's web off form with the cells
  T107-4 names, written by the M6-sky seat landing P2).
* **T-V5-23 — custom institutions on islands** (item 104) [C]. A dossier custom institution of archetype `exotic-tower` is
  a `tower` candidate where the world has magic and not where `magic` is `none`; a `martial-keep` is a palace candidate at
  `landmarkLevel: landmark` and not at `standard`; a revision that changes its archetype keeps it on its island unless a
  hard row of its new profile fails there, and then re-sites it on the ground by least disruption, the claim standing
  vacant until a later epoch re-occupies it with the next instance first; zero placement failures.
* **T-V5-24 — custom chains across the island** (item 104 (h)) [C, O]. On 200 CITY seeds with islands and a fixture set of
  active custom chains — a perishable food chain, a luxury chain whose consumers are rich households, and a chain one of
  whose processors is a custom `exotic-tower` carried as the island's `tower` — in the siting statistics suite: (a) no
  chain's resource or processing node is carried by an island except the island institution, and no chain resource is
  sited on an island's conjured water (100 %); (b) the ground end of every cross-arena link stands nearer to the landing
  foot of its shortest route than under random placement of that node; (c) the flow order by route distance holds in at
  least the share the base's ground-only bar declares for the same chains; (d) a chain with nodes on two arenas is never
  reported as close at street scale across the arenas, and a quarter name, when one arises past item 72's threshold, lies
  on the ground; the same bars hold for a dossier's `activeChains[]` fixture; (e) an import or export store of a chain with
  an island node stands at a ground gate or quay (100 %); (f) a chain toggled off and on returns its island nodes to their
  sites where nothing else changed; (g) a T6 declaration of a processing node onto an island is held and lists the
  "crosses the hoist" fate; zero placement failures.
* **T-V5-25 — the magical node** [C]. On 300 CITY seeds each of a dossier fixture without deposits and the same dossier with
  a `magical_node` `available`: `h_town` rises by exactly `node.bonus` (clamped at 1) wherever the interpolated value is
  above 0 and not at all where it is 0; the count, `A` and `E` move monotonically with it (T10-1's monotonicity); two nodes
  add one bonus; `discovered` adds nothing at generation and the bonus at the next epoch; `depleted` and `removed` add
  nothing, and a node removed at an absorb leaves every island floating until the next epoch's evaluation, when the law may
  start its wane (never a vanishing); a standalone map's `h_town` equals the dossier-free fixture's; with a ruin fixture
  holding the node, the term is unchanged and no island rule reads the underground arena; on that fixture the `why` on the
  town supply names that ruin from the report's `ruin.node` line (V04 §3.5.0a (9)) — its new name after a rename of the
  ruin — while on the fixture with no ruin it names the deposit and no ruin; a dossier at a TOWN population fails the
  gate (`gated: rung`).
* **T-V5-26 — the island cathedral's crypt; no catacomb in the sky** (item 109 (k), J111) [C]. On 200 CITY and METROPOLIS
  seeds with a cathedral island: the cathedral carries the settlement's largest crypt, inside the island's rim slab — its
  floor ≥ `cryptFloorM` above the slab's base at every point of the claim — or, where no site passes, the half-sunk form
  with its fate (100 %); on a `flat` island likewise; 0 underground parts, links or catacomb sources on any island (100 %);
  every catacomb lies under a ground cemetery or a quarry ossuary; no island churchyard is a candidate or ranked as the
  largest cemetery; island churches are counted once in the catacomb count; the S3 precinct passes to the largest ground
  church (or `park`), whose crypt is never ranked above the cathedral's.
* **T-V5-27 — the rim as a barrier** (item 106) [C]. Generation lays 0 enceintes on any sky arena; a wall drawn on an
  island with two landings gives exactly two walled stretches, each across its landing yard with a gate at its attach and a
  tower at each rim anchor, and 0 wall edges elsewhere on the rim; one landing gives one stretch; the enclosure test reads
  the island as sealed, the barrier's kind `sheer`; a stroke along the rim away from a landing is bent to the landing
  stretches with "the drop is the wall here" (J-VI.4); adding a third access adds a third stretch; with item 106's `barrier`
  closure and profile off, byte-identical to the base (no-op pin: this fixture's NoOpPin registration on V12 §3.7.8's
  engine under `item106.barrier`, its off form the cells T106-5 names, written by the M6-sky seat landing P2). **With
  item 110:** 0 island `RetainingWall`s classed as an `Enceinte` or a member of a barrier circuit; a T3 `retaining` stroke or T2 terrace stroke on an island lays a
  `RetainingWall` on the island's arena, drawn in its frame and displaced with it under `offset`, tombstoned at a fall and
  exported in `sky`; a retaining stroke on the rim strip or along the rim is bent inward — every point in the strip moved
  radially to 1 m inside the `setback` line, the others unchanged — with `bend.retaining.rim` (J-VI.4 (g)); the unit run's
  levelling lays 0 retaining walls on the rim strip; with item 110's terrace rows off, the island is byte-identical (no-op
  pin: the same fixture registered under `item110.terrace`, its off form V11 §3.24.0's `terrace` row, by the same seat).
* **T-V5-28 — ladders across the arenas** (item 108) [C]. On the surveyed dossiers with islands: no ladder pair is counted
  twice across the arenas; every COUNT, GUILD and QUARTER record's members, counted on both arenas, lie inside its range; a
  cathedral island's subsumed parish churches, resident priest and wayside shrine each count once as its members, on the
  ground or carried, never as additions; an island institution is a singular or SIZE record (100 %).
* **T-V5-29 — the suppression's island form holds** (J-V5.62) [C]. On 200 CITY and METROPOLIS seeds with at least two
  islands: remove a generated island and a generated access on another island, then run a Regenerate, a Re-derive from
  S7b, New random on the other island, a save and reload, and a century of epochs at `auto`: both stay removed (100 %) —
  the removed slot never drawn, filled or re-opened, its outcome `removed by you` in the report; the higher slots' islands
  identical to a run where the removed island was never there but its slot counted filled; the deleted ordinal never
  re-sited and the island keeping a `main` access (the lowest surviving generated ordinal); 0 households allocated to a
  removed slot and ground plus sky households equal to the roster's total at every step; with `islands.count` pinned at 2
  and one of the two removed, 1 island after every re-derivation; an `adjust('islands.count')` to 3 after the removal
  releases nothing — the held slot stays `removed by you`, only the free slots open, and with every slot held the adjust
  opens none and lists its fate — a T5 declaration takes a held slot only when no slot is free, and the removal's undo
  restores the island byte for byte.
* **T-V5-30 — what the raised-way generator reads of the sky** (J-V5.63) [C]. At generation (§4.3's slot) the generated
  raised-way set is byte-identical with the islands setting on and off; on 500 CITY and METROPOLIS seeds with islands and
  on the epoch fixtures of volume 6's raised-way pass: 0 raised ways with a sky endpoint, sky evidence or a sky water source
  (100 %); an elevated road bound to a precinct whose cathedral an institution slot took up still stands, its reason naming
  the hand-over; the aqueduct's need at an epoch counts 0 island households; 0 aqueduct terminals, basins, cisterns or
  fountains on an island.
* **T-V5-31 — item 110 under and on the island** [C, O]. (a) The METROPOLIS sky golden pins one raised way under an
  island: the caster ceiling at SKY reads its deck top with its parapet and its raised-way piers, and the apex clears it by
  ≥ `clearanceM`. (b) On the epoch fixture where volume 6's raised-way pass builds an aqueduct under a floating island and
  a new stage raises a stepped temple beneath another: after the epoch, `sky.clearance` has raised each island's
  `groundRefCm` to the caster (its `elevationCm` kept unless the floor failed, a listed fate "raised clear of the
  aqueduct"), `shadeBasis` untouched, and a replay of the epoch gives the same values. (c) A stepped island temple (volume
  2's `stepped-temple` row): the surface top reads the highest massing tier at each point, and the crypt lies under massing
  tier 0 inside underside tier 0 with its floor ≥ `cryptFloorM` above the slab's base, re-tested at the levelled datum. (d)
  A raised way removed beneath an island leaves its `elevationCm` unchanged. (e) An `own` island's
  `terrainEcho.reliefClass` is the class its `island.place` draw (index `relief`) gives, 100 % over 500 seeds; New random
  re-draws it with the terrain; an `own` record loaded without it gets the same class, written and reported; an `echo` or
  `none` island carries none; and volume 1's `terraceState` on the island's districts reads that class, `plain` for `echo`
  and `none` (T-V1-21). (f) **A lock under the clearance**: on fixture (b) with one island locked (and
  again with only its `altitudeCm` path locked), `sky.clearance` rewrites its `groundRefCm` and `altitudeCm`, keeps its
  `elevationCm` where the floor then fails, lists "clearance held by your lock", and the invariant suite passes by the
  island's exemption; unlocked, the same island is raised. (g) A composed (stage-3) building beneath an island is read at
  its stack envelope's top.
* **T-V5-32 — the stage order and SKY's data keys** (J-V5.70) [C]. With `@plat/hood` and `@plat/sky` both registered, the
  `StageDecl`s sort at load with no cycle, SKY after S7b (its S7c hook included) and before S8, S10a and S12a; S7c's
  declared read-set holds neither `reservations.landing` nor `allocations.landing` (volume 1's read-set test, T-V1-35); S7b
  (1)'s supply term reads each sky pseudo-district at its island's `anchor` + the outline's centroid (100 %); on 500 CITY
  seeds with islands SKY's ground commit records write no data key but those two, and after S10a every host district's
  `modest` residential households plus its landing rows' staff equal the `modest` households S7b allocated it (100 %);
  with the islands setting off neither key carries a row and the ground digest equals the realism golden (T13-1).
* **T-V5-33 — the edge suite** (principle (11)) [C]. One fixture per row of V05 §3.23 whose test column names it — the
  island and access records at load, the strip with no caster, receiver or cell, the rule table's bends, the supplies with
  no built land, the dossier's caps and rung, the clerk's answers without a basis and after a save and load, the coastal,
  harbour and moat shade, the deck receivers, the oasis in a hot arid row, the terraced ward's landing yard, a lock and the
  shade — each asserting the row's outcome with its rung reported, and no crash, hang, lost datum, silent wrong result or
  whole-map retry. **Item 111 on the island** (g item 111; V05 §3.8 (4), V05 §3.11): on an arid fixture with an oasis, the water
  pull and the climate cell at their arid values, no oasis, spring or oasis grove stands on any island, every island's
  `P_I` and water are byte-identical to the same fixture with item 111's cells neutral, an island may float over the oasis
  (its class `water`) and the aqueduct's source search may take the oasis's spring but never an island's water — the arid
  fixture's NoOpPin registration on V12 §3.7.8's engine under `item111.water`, its off form V11 §3.24.0's `climate`
  dry-cell row, written by the M6-sky seat landing P1.
* **T-V5-34 — the island through the year** (item 117; V05 §5.1; takes T117-1 – T117-8's island clauses — T117-3's
  rows and T117-6's opening week have none, the island taking the ground's season rows at the view's week) [C]. On the
  two sky goldens (T-V5-15) and two METROPOLIS fixtures — an `arid` and a `cold` climate row, each with a prosperity
  island carrying a conjured river and one carrying a spring pond, deciduous crowns on both: (a) (T117-1) the same
  document hashes identically in all 52 weeks, its saved bytes, `shadeBasis`, strips and `shadeSky` unchanged — the
  `item117.season` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; a `view` pin over weeks 0–51),
  written by the M6-sky seat landing P3; (b) each island face and crown draws, week by week, the look a ground face or
  crown of its kind draws in the same week under the same climate row — never a row of the island's own (an `own`
  `mountainous` island over `plain` ground included); (c) (T117-2) at the leaf-colour weeks' middle week at least five
  distinct crown colours across a deciduous island's trees, its leaf cover deepening week by week through the leaf-fall
  weeks, on the island's surfaces only, and moving with the island after a move; (d) (T117-4) the arid fixture draws no
  ice and no snow on any island in any week; (T117-5) on the cold fixture the spring pond freezes in the ice weeks, its
  first ice week at or before any of the conjured river's, the river's fast stretches and the waterfall's 12 m lip disc
  stay open water, and `sky.fall` and `sky.mist` draw in every week; (e) (T117-7) at each season's middle week the
  island's look passes T112-1's contrast and colour-blind checks, and in a snow week the island's land, field faces and
  roofs draw `snow` and its rim ticks separate it from the snowy ground by the ink / ground row of §8.2's contrast
  matrix; (f) the drawn shadow's length follows the view sun's week while the strips do not change; (g) every picture
  export of an island draws and names the chosen season, and a VTT island scene carries its frozen water as `ice`
  polygons (§11.1); (h) (T117-8) the season switch re-skins the sky tiles within V05 §6's season row (R12-30).
* **T-V5-35 — festival pennants on the islands** (item 118; V05 §5.1; takes T118-1 – T118-6's island clauses —
  T118-5's staging has none, V11's `SKY` row naming no staging place) [C]. On the two sky goldens with a festival
  fixture (a dossier tradition with a two-week window, a culture motif row and a deity) and with a previewed generic
  festival: (a) (T118-1) the document hashes identically with decorations on and off and in every week — the
  `item118.festival` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; a `view` pin with its `tiles`
  clause), written by the M6-sky seat landing P3; (b) pennants stand on every island not `fallen` or `removed` exactly in
  the window's weeks (T118-2), at V11 §3.25.7's `SKY` row's counts, along the rim and two at each landing top, with no
  kind of a ground tier's row on any island of either golden (T118-4), and none in a landing yard's passage, at the
  waterfall's lip, on a ground landing, on the void or over a label's keep-out (T118-6); (c) (T118-3) the same festival
  draws byte-stable sky tiles per seed across views and exports, and a moved island's pennants move with it; (d) a
  picture export draws them and names the festival, a VTT island scene draws them in its image only; (e) (T118-1) with
  no tradition and no preview, the sky tiles are byte-identical to the base's (the pin's `tiles` clause).
* **T-V5-36 — Find on Sky** (item 120; V05 §5.6; takes T120-1's registration and T120-4's and T120-5's sky clauses)
  [C]. On the two sky goldens and B-CITY-lite's CITY and METROPOLIS seeds with islands, on V09's app harness, each with
  three chip sets — a class the islands hold, an island institution's name and an island by its name — with Show gaps
  off and on: (a) (T120-1) the document hashes identically with Find on and off, and every chip off, or **Clear**,
  restores byte-identical sky tiles — the `item120.find` registration of the sky goldens on V12 §3.7.8's engine (V12
  §2.13; a `view` pin with its `tiles` clause), written by the M6-sky seat landing P3; (b) each chip's sky matches equal
  §11.2's gazetteer rows on the islands at the key, the panel's "on Sky" count their number; (c) with Ground working,
  every sky match shows a ghost pin at its drawn position under each occlusion mode, with the sky layer shown and hidden,
  and Go there sets Sky with the match's island — Sky then drawn whatever its visibility, 0 events logged and its
  `LayerSpec.visible` unchanged (V05 §5.6 (3)); (d) (T120-5) at the city band every sky match has a pin or a bubble,
  each carrying its chip's second cue, and no bubble joins two islands' or two layers' pins; (e) under a player view on
  an island form of T-V9-66's knowledge canary — a `secret` access's landing yard and a concealed use on an island —
  nothing withheld surfaces in a suggestion, count, glow, pin or ghost pin; (f) (T120-4; its fall cases from the later
  of P3 and P6, which builds the landfall, and its `advance` from the later of P3 and V06's E6, which builds `advance`)
  the chips survive every band and layer change and a raise, a move (the glow moving with the island), a fall (its
  matches dark, its landfall offered on Ground), an `advance` with its epochs, an undo, a redo, a regenerate, a load and
  a migration, each match set equal to a fresh evaluation there, and a chip whose last match goes — an island
  institution's after its island falls — stays at count 0, dark; (g) Show gaps outlines exactly V01 §5.4 (3)'s
  `gapUnits` on the islands as V05 §5.6 (4) reads them — each island district for a class with no coverage row or a row
  counted by district or neighbourhood; under a walking-radius row every residential plot of an island holding no
  member, whatever the ground beneath holds, and none of one holding a member; under a households row each district's
  unserved plots by V01's per-plot reading — a class `IslandRule.carry.never` excludes among them; (h) item 120 (j)'s
  suggestion and glow timings hold with three islands at the METROPOLIS cap (V05 §6's Find row); (i) from the later of
  P3, P6 and V06's E6 (P6's `IslandEpochStep` and landfall; V06's `advance` and history frames, V06 §3.15.2), at a drawn
  week whose frame is not the head (V05 §5.6 (5)), on (f)'s fixture after an `advance` whose epochs raise one island and
  resize another, then a hand move of one island and the removal of another, and on T-V5-14's falling CITY, each
  scrubbed to a week before those epochs: every sky match, glow, pin, ghost pin and gap unit those of §11.2's listing at
  that week, drawn on its island's land and at its anchor in that frame — the raised island offering none, the moved
  one's at its former anchor, the removed one's offered, and the fallen island's on Sky as the frame holds it, never its
  landfall on Ground; the head's reading back when the scrub returns to the head.

**Parity.** No reference has islands (II.6 (8)), so no parity number binds them. The nearest look is Neighbourhood's lone
patch — its own ground tone and a drop shadow marking its extent on an empty field (`research/findings/vg-ng-devlogs.md`
§B3.5) — so M6-sky's sitting is V12 §3.9.1's `PanelSpec` for M6-sky, a descriptive NG set (X-V12-4): five island
close-ups in `hatched` beside five Neighbourhood patches, rated for "reads as a floating patch" — information for the
owner, never a gate.

## 8 Build plan

**Milestone M6-sky** — after M6-U in J122's combined order (§16; V05 §11), its P0 spike beside M5 so the island's unit
inputs to volume 1's unit run are settled while volume 1 is built; it needs volume 1's unit run (M5) and M4's hooks (S7b
(5), the island conversion kinds).

| phase | content | exit (executed) | pw |
|---|---|---|---|
| P0 — spikes | the supply calibration run (V05 §3.3); placement over 1 000 islands with the reachability filter; the unit inputs to volume 1's unit runner on a hand-built arena (with `districtHa` and the gradient: the band shares and the re-homed count); the caster allowance measurement (V05 §3.9 (5)) with item 110's rows on; the strip against the rung-3 shadow on one fixture; the save-and-reload of a lagging strip | the ⟨P0⟩ rows set or the fallbacks applied; T-V5-5's rates; the runner's contract passes T-V5-9 on the fixture; T-V5-10's ≥ 99 % clause; T-V5-20 on the fixture; T-V5-21 (h) on the fixture | 1.5–2 |
| P1 — the model | the records (file f items 203, 204, 213, 251–253, 274, 282, 286, 295, 296, 546, 547); `nextSkyPart`; `shadeBasis` and its load path; S7b (5)'s gate, slots, reasons (the archetype match and the ladder filter included), fills with `carry`, the held shares and the node term, the hand-over of S3 reservations, outline, reachability and placement; the arena with its outline-sized frame, the terrain echo, the river; the underside, the ground reference and the altitude at SKY (item 110's raised parts, retaining walls and levelled platforms among the casters); the claim search with the crypt test; the gradient field; the strips from the bases on the unlevelled receivers, their fold into field pass 2 and the island-free value; the sky receivers; F-SKY-FILL, -PLACE, -TERRAIN, -SHADE, -CRYPT, -HANDOVER; SKY's own ground data keys; the strips held from their first read and the bases at S10a's start; the optional basis and its schema-chain step | T-V5-1 to T-V5-7, T-V5-10, T-V5-19, T-V5-21 (a), (e), (f), (h), T-V5-25, T-V5-26, T-V5-32, T-V5-33's rows of these mechanisms; `plat calibrate register --check` green over the cells it lands (`islands.json` whole, V11 §3.1 row 56) | 3.75–4.75 |
| P2 — access, the unit inputs and siting | access tops, feet and landing claims (ground and hinterland) with the S8 destinations (file f item 299), the rim strip and its walk, the island's context vector, the `sky` request and `skyUnitInput` with `districtHa`, the kinds and the fabric prior, SKY-F with the clearance check and both repairs, the sky lights (item 307), names; the route distance in both S10b runs and the island's coverage units (item 308); the supply web, splits, per-arena order and relaxation, the district term, `comfortM` and spacing across the arenas (V05 §3.20 (10)–(12)); chains across the island, custom and `activeChains[]`; the rim as a barrier; item 110 against the accesses — admissible ground without decks and raised-way piers, `lineClearM`, `skyAccessObstacles` for the raised-way solver and T4, the island's retaining walls in the unit run's contract, the generator's reads of the sky (items 245, 290, 309) | T-V5-8, T-V5-9, T-V5-11, T-V5-22, T-V5-23, T-V5-24, T-V5-27, T-V5-28, T-V5-30 (with T-V5-8's and T-V5-27's item-110 clauses), T-V5-33's rows of these mechanisms; `plat calibrate register --check` green over the cells it lands (the sky rows of `lights.json`, V11 §3.1 row 51, with the `keel` row's `radiusMarginM`) | 4–5.25 |
| P3 — the picture | the marks with their sheet rows (file f item 408), the three occlusion modes with the underside and tether, the sky surface layer in the tile worker and the light pass (CPU reference and GPU) with the window without slabs (item 416), rung 3's prism tiers, the cursor sun's floor, labels (item 415); the strip's outlines in volume 9's shade map view; the island's seasonal look, its festival pennants and Find on Sky (items 117, 118, 120; V05 §5.1, V05 §5.6) | T-V5-12, T-V5-13, T-V5-20, T-V5-34, T-V5-35, T-V5-36 (its (f) fall and `advance` cases and its (i) at the later exits it names) | 3.75–5.5 |
| P4 — editing | V05 §4.2's events and parameters (the island brushes, the access `setAttr` semantics, the pointer mapping in `offset`, an island wall, the hand-placed cap), dry runs with the shade fate and the bends, Update shade now, locality, undo (items 356, 375), DR27 and its coherence with the dossier-removal path (item 387), the clerk's `WhyProvider` with the strip, route, link and siting answers; `convert removeIsland` and the removed ordinals with their holds (item 260) | T-V5-16, T-V5-29 | 2.25–3 |
| P5 — exports | GeoJSON (the strip features included), SVG, PNG, VTT, glTF, CityJSON's extension types, the statistics rows | T-V5-17 | 1–1.5 |
| P6 — time | `IslandEpochStep` with the household channels and the re-reasoning of an island whose institution left (its lock clause included), the bases and strips re-read at each epoch and the lag, the landfall over every covered kind (item 110's raised spans, raised-way piers, retaining walls and deck plots, and other islands' accesses, included), the participant `sky.clearance` with `reclearIsland` and the ledger by hand and on the M4 grow path (item 320); the engine-driven schedule joins volume 6's milestone; the one-time waits timed against item 119's comfort level | T-V5-14, T-V5-15, T-V5-18 (its comfort-level clause included), T-V5-21 (b)–(d), (g), T-V5-31, T-V5-33's remaining rows | 1.75–2.75 |
| **total** | | | **18–24.75** |

V09's AP7 (the sky's screens) is built beside P4 and priced in §16's line of the application's staged screens, outside
this total (XV-V9-8).

**Dependencies:** P0 needs M4's hooks and the unit runner's first cut from volume 1 (M5); P1 needs §4.5's daylight term
with its per-sample mask and model sampler (item 102; file f item 296) and item 103's profile columns for the noxious
exclusion (with a fixture profile set until volume 11's rows land); P1 → P2 → P3; P2's route distance needs item 308 and
its archetype match item 104's profile resolution (fixtures until then); P2's chain rules need item 104 (b)'s active chains
through the port (volume 8) and volume 1's working-quarter reading (fixture chains and a stub reading until then); P1's
node term needs volume 8's deposits row (a fixture digest until then); P6's registration needs volume 6's
`EpochParticipant` (a direct call from the M4 grow path until then); P6's household channels need volume 6's
`demandTaken` row and the displaced pool's cause `island` (§4.7's overflow pass inside the conversion until then); P1's
crypt test needs volume 2's basement ladder and volume 11's crypt column (the full form and a fixture column until then);
P2's web, splits and spread need items 105 and 107 as applied and volume 11's goods, balance and `split` rows (fixture rows
until then), and the rim barrier item 106's `barrier` closure and volume 11's `sheer` row; item 110's parts need items 244,
245, 246, 290 and 309 as applied, volume 2's stack envelope (V02 §3.15.2) and volume 11's raised-way height and terrace
rows (fixture rows until then), and P6's `sky.clearance` needs volume 6's `afterGrowth` participant table and `EpochScope`
(a direct call after the M4 grow path's growth until then); P3's looks need §8.2's season and festival rows with V11
§3.25.6 – V11 §3.25.7's tables (fixture rows until then) and its Find part V09's Find panel and `live.find`, which land
at M5 (Find's milestone; §16) before P3, so T-V5-36 lands with P3 at M6-sky, its (i) at the later of P3, P6 and V06's E6,
(f)'s fall cases at the later of P3 and P6 and (f)'s `advance` at the later of P3 and V06's E6; P6's comfort-level
runs need V12 §3.15.9's wait timer and V06 §6.8's estimate; P4 and P5 after P2;
P6 after P4. **Risks, in order:** the two-surface light pass's frame cost (P3; fallback: half resolution, then rung 3 for
the sky base); the field's power to
tell rich towns from poor (P0; fallback: the `wealthLevel` blend); the unit-run contract across volumes (P0; tested as a
contract, T-V5-9); the strip's cost at METROPOLIS under the low samples (P1; fallback: V05 §6's coarser step and mask,
then the reach cap); the route distance's share of the pooled S10b (P2; fallback: island classes stand at the land
centroid for every ground-side read, post-build included); placement on awkward sites (P0; F-SKY-PLACE's ladder);
watertight lofting of rough tiers in glTF (P5; fallback: roughness 0 in the mesh only); the gradient's band shares under
the smoothing (P0; fallback: `field.bandInset` 0.1 → 0.2, then the smoothing's width halved on the island, re-measured);
the light pass on uncovered tiles (P3; fallback: the exact per-tile slab cull, V05 §6); item 110's arches and decks under
islands against `casterAllowanceM` (P0; fallback: V05 §3.9 (5)'s measured 99.9th percentile with item 110's rows on). **In
§16:** the row M6-sky after M6-U at 18–24.75 pw, outside the base total as a staged subject, the totals computed once
there (file f items 476, 568).

**The register at the exits** (J-V5.80; X-V12-16). Every phase that lands a registry table, or a calibratable column or
cell of one, exits with `plat calibrate register --check` (T-V12-20) green over the cells it lands. Two phases do: P1
lands `islands.json` whole (V05 §2.4's default rows, `accessSiting.deckGapM`, `lineClearM` and `accessCount.handMax`
among them, although their readers are built at P2, P4 and P6), and P2 lands the sky rows of `lights.json` with the `keel`
row's `radiusMarginM` cell. The landing seat writes the entries in the same change with `plat calibrate register
--defaults --milestone V5-P1` (or `V5-P2`, V12 §2.8's volume-qualified form; X-V12-17) — V12 §3.11's default line — for
every calibratable column of those cells that has no entry yet; a light-table column the base landed already holds one and
takes none, since the command never touches an existing entry. This volume writes no register line of its own. The three
⟨P0⟩ cells (`townSupply`, `carriedSupply`, `casterAllowanceM`) are set by P0's spikes, which run on a spike branch with a
draft `islands.json`, land no cell, and apply their fallbacks (V05 §3.3, V05 §3.9 (5)) before P1 lands the table; so each
lands as an `own` value whose provenance note names the run that set it ("set by M6-sky's P0 run, V05 §3.3", or "…, V05
§3.9 (5)" for the caster allowance; never a `fixed:` note), and T-V5-3 and T-V5-10 then hold it as ordinary bars at the
phase exits, where a failure fails the exit. No frame holds an island, so the corpus stage closes each default-line
column of `islands.json` `fixed` with "no admissible frame" (V12 §3.11). In J122's order M6-sky lands before M-CAL, so
its default-line entries fall due at M-CAL's corpus run; were it to land after M-CAL's `ReconciliationRecord`, they fall
due at `M-CAL/sky` (V12 §3.11's *The due's corpus run*; J-V12.75; X-V12-17). P3's sheet rows are semantics whose values
are volume 11's palette rows; P0, P4, P5 and P6 land no calibratable cell, their constants being P1's rows.

## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V5.1 | Chose to lay each island in its own local frame and stand it over the ground by one integer translation (`anchor`), over laying it in world coordinates, because a move then changes one attribute instead of warping every vertex, keeps every logged position on the island valid, and keeps every lattice point a lattice point; no rotation, since a turned island would leave the lattice (a turn is a reshape). |
| J-V5.2 | Chose sky part numbers from a never-reused document counter (`nextSkyPart`), the count-law slot a separate field, over the base's "sky parts 1–3", because an island raised after a fall would otherwise reuse a part whose addresses stand as tombstones, against §6.3's never-reused rule. |
| J-V5.3 | Chose to read both supplies on the field's absolute value with value-keyed rows, over the base's town cut, because the cuts are per-town quantiles: a town mean against its own quantile measures the distribution's shape, never the town's wealth, and a mean never reaches the field's top (RV-pc-3); the rows are calibrated at P0 with a pre-decided fallback. |
| J-V5.4 | Chose to give each slot its purpose by one weighted draw among a prosperity island and the eligible institution rows, the institution taken from the roster's own demand, over adding an institution the roster did not ask for, because the roster decides demand (§4.2 S2) and the population stays whole. |
| J-V5.5 | Chose to settle each island's outline and placement inside S7b (5), before S7b (1) allocates the ground, over placing islands after S7b, because a slot that cannot be placed must return its households before the ground's allocation, never through a second S7b run. |
| J-V5.6 | Chose to floor the altitude at the rim, the root and a 25 m clearance over the tallest thing beneath, over clamping the root's depth, because the owner asked for the rock beneath to shape the shadow (J98): a deep root lifts its island rather than being cut short. |
| J-V5.7 | Chose to resize an island by eroding or dilating its rim with the kernel's buffer, over re-drawing the outline from its stream, because a re-draw moves every rim point and re-cuts plots all round, while a buffer changes only a band at the rim and keeps the shape. |
| J-V5.8 | Chose hoists — a winch house and a cage on ropes, as clifftop monasteries were reached — as the default access, rope lines over water, and floating stairs and bridges of light only where the world has magic, over bridges of light everywhere, because the realism tiebreaker tempers the fantasy: the island is the one magic the setting asks for. |
| J-V5.9 | Chose to leave the island's magical lights ungated by the `magic` circumstance, over hiding them when it is `none`, because the island exists by its own setting and its magic is what holds it up; the circumstance still gates the stairs, the bridges of light and the ground's magical lights. |
| J-V5.10 | Chose to make generation and epochs obey the supply law strictly while letting an author's declaration or lock hold an island against it, with the fate `held against its supply` listed, and to keep the rung gate absolute, over refusing such a declaration or letting the rung be overridden, because everything is editable yet the base disables the setting below CITY. |
| J-V5.11 | Chose to make the landfall a conversion of everything it covers, one outcome per covered kind (V05 §3.16 (4)), the stone credited to the salvage ledger and no edge added or removed, over cutting a new ruin face, leaving no mark, or covering plots and fields only, because it stays local, undoes exactly, keeps the old plan for regrowth, ties the fall into the ledger's salvage demand, and leaves no intact wall or open street standing in a field of fallen rock. |
| J-V5.12 | Chose to draw everything on existing concerns (`island.place`, `terrain.noise`, `water.river`, `field.chance`, `naming`) with named creation indices, over a new concern, because §6.1's registry already reserves `island.place` for the islands and no draw here reads another concern's order. |
| J-V5.13 | Chose to redraw only empty slots at an epoch, a supplied island staying, over reading that a slot may close and send its island down the decline ladder, because an island falls for want of magic, never by chance while it is paid for. |
| J-V5.14 | Chose to floor the cursor sun's height at 1.5 × the display list's top whenever the view draws the sky layer (visible, or Sky the view's working layer) and the document holds an island that is not fallen, over letting the sun stand below an island at close zooms or flooring it only while an island is in view, because a sun below a floating island casts its shadow upward and reads as an error, and a floor that switched on as an island panned into view would jolt every shadow on screen mid-pan. |
| J-V5.15 | Chose an underside of nested prism tiers following a profile function (cone, bowl, root, flat), over the base's one slab and over a full mesh in the light pass, because the tiers give the rock's silhouette to the existing slab traversal at a few records per island. |
| J-V5.16 | Chose a second base and surface layer only on tiles an island covers, lit separately and composed by the occlusion mode, over lighting the ghosted ground as the island's surface, because the ground seen through a ghosted island must take its own light and the island's shadow. |
| J-V5.17 | Chose to claim the ground landing yards at SKY, before S8, touching a way spine, over placing landings after the plots are cut, because the yard then fronts a way by construction and no plot is re-cut. |
| J-V5.18 | Chose a rank gradient on a prosperity island — each carried band given its carried share of the island's land, mapped onto its own band's inner range, the richest on the high ground and the rim that looks over the city (0.6 elevation, 0.4 view) — with a small noise term, the shade and the brush on top, over one uniform value or a driver raster, because a uniform value houses only one band and S10a would re-home the rest to the ground (the owner's "prosperity is a gradient and a band"), while an island has no market, wall, tannery or low damp ground to drive a raster; an institution island stays uniform. |
| J-V5.19 | Chose to refuse the setting where a bound dossier's `site.magic` is `none`, and to keep the setting and the circumstance independent without a dossier, because a floating island would contradict a dossier's magic-less world (item 20 (h)'s coherence) while a standalone map's two toggles are the author's. |
| J-V5.20 | Chose to re-land an island's accesses after a move by closing and opening the landing designation on two ground plots each, over re-deriving the ground under the old and new feet, because a move then touches no ground geometry. |
| J-V5.21 | Chose `delete` of an island to relocate its households to the ground without a ruin, the ruinous path being `fallIsland`, over one behaviour for both, because an author removing an island and a history bringing one down are different acts. |
| J-V5.22 | Chose to release a waning island's households in reverse ordinal order into each epoch's ground demand, over moving them all at the wane, because §4.11 empties a declining town by its suffix with a lag, and a wane is a decline. |
| J-V5.23 | Chose the conjured river's width by the ground's width law on a conjured share of the ground river's flow, over a fixed width, because the owner asked for a river that echoes the ground's, and the law keeps the echo proportional; its water is magic's own and satisfies no need. |
| J-V5.24 | Chose the prison row's requirement band to be its paymaster's (`prosperous`), over its inmates', because the owner names a prison island as possible and the town's rulers keep it aloft. |
| J-V5.25 | Chose to hold the islands setting off under the `MFCG` and `FTG` presets, because no reference has islands and the parity presets switch every extension off (item 23). |
| J-V5.26 | Chose an unbuilt rim strip of 6 m inside the rim, planted as a rim walk with a row of trees, over plots to the edge — the Neighbourhood look, whose blocks are clipped by the patch's ragged edge (`research/findings/vg-ng-devlogs.md` §B2) — because no house stands on a cliff edge (the realism tiebreaker), the strip keeps the rim legible at every band, and the trees on the rim keep the floating patch's look `docs/IMPROVEMENTS.md` S1 asks for. |
| J-V5.27 | Chose to let an island edit leave the ground's field and its strips at their basis until the next epoch or a Re-derive from S10a — the fate listed, Update shade now offered for an immediate scoped change, the basis persisted so the lag survives a save (J-V5.47) — over re-evaluating the field at every island edit and re-deriving the blocks past τ as the terrain brush does, because the owner asked that shade move the town over time by the normal lag (item 102 (e)), and a drag of an island would otherwise re-cut plots under two strips far from the island for one gesture. |
| J-V5.28 | Chose to take volume 1's partition and district count for an island's districts and drop this volume's own count and seeds, over keeping both, because volume 1 lays them by the bent cut (J-V1.17) and two counts for one island would be two sources of one fact; V01 §3.10.3 carries the inputs this volume governs. |
| J-V5.29 | Chose to fix the ground reference and the altitude at SKY from the casters already placed, the tower rows of the allocated classes and a caster allowance, over reading the built casters at SKY-F, because field pass 2 must read the island's shade before any plot is cut and the altitude must not move after that read; the rare taller caster raises it at SKY-F with the strip's basis kept, a share measured at P0 with a pre-decided fallback. |
| J-V5.30 | Chose the model's strip as a derived record over the tiers without roughness, carrying no edit kind, over the view's rough tiers or an editable strip, because the roughness is view data keyed by the render key (§6.2), which the model must never read, and a strip is a consequence of its island — edited through the island, item 102's weight and the brush; at the field's 32 m cell the roughness is below one cell. |
| J-V5.31 | Chose a fourth island institution row, the arcane `tower`, admitted only where the world has magic and taking a custom kind of the `exotic-tower` archetype, and the archetype column on the palace and cathedral rows, over leaving custom institutions off the islands, because item 104 asks that custom content land sensibly with no hand-written rules and a tower "on its own ground, apart" is the owner's unique institution in its plainest fantasy form; it arises only when the roster or the dossier demands one. |
| J-V5.32 | Chose to leave on the ground, by the editable table `IslandRule.carry`, the top-step emitters, the heavy processors and wholesale and storage, the classes with a hard need an island cannot meet, and an active chain's working nodes (V05 §3.5 (3) (a)), over excluding the top-step emitters only, because an island has no downwind, downstream or extramural ground, no quay or gate, and no water that satisfies a need (its conjured river is magic's own), and the owner's rule that the tannery goes "down river" and away from homes cannot be met there. |
| J-V5.33 | Chose to let an island's own terrain cast nothing on its own context, over running the terrain shade on the island's terrain, because that relief is a gentle dome at a quarter of the ground's amplitude whose self-shade stays below a field cell; a higher island's shade on it is real and kept, and at an epoch its own buildings cast on it through volume 6's mask on its lattice, as item 102 (b) asks of every building. |
| J-V5.34 | Chose to keep the island's own placement score (V05 §3.7) apart from item 103's relation families, over scoring the island's position with them, because the island is placed as one body at S7b (5) before any plot exists, while the families score plots against placed neighbours; its purpose rows are the island-scale reading of the institutions' profiles, aligned by volume 11. |
| J-V5.35 | Chose to export the strip as a thematic layer only — GeoJSON features, the shade map view's SVG, the statistics — over carrying it in the lit raster, VTT, glTF and CityJSON, because those formats already carry the island's physical shadow and solid, and a model day's shade share is a statistic, not a picture. |
| J-V5.36 | Chose to measure every pull that crosses arenas by the route through the island's admitted accesses — the island's street leg, a 100 m transfer, the ride and the ground's street leg, as §4.7's `road` mode runs through a gate — and every nuisance by the straight distance in three dimensions, over one straight distance for all, because goods and people ride the hoist while smoke, smell and noise travel through the air. |
| J-V5.37 | Chose to count an island as k units for coverage rows counted by district or neighbourhood (k its district count by `districtHa`), one unit for walking-radius rows and ⌈H ÷ N⌉ for household rows, over one unit for every row, because the island's districts are real districts and the owner's example is "one apothecary per district", while the ride to the ground passes every walking radius. |
| J-V5.38 | Chose to OR the islands' shade into the daylight term sample by sample, over adding their shares to pass 1's, because a cell in a hill's shade and an island's at the same hour is in shade once — an added share would count it twice and could pass the term's all-day bound. |
| J-V5.39 | Chose to keep an active custom chain's resource and processing nodes on the ground — only its final seller and its consumers going up by the carried share, the island's own institution keeping its links by the route, an author's declaration outranking the rule with a listed fate — over carrying chain nodes by the proportional share alone, because the owner asked that a chain be placed as one connected thing: splitting its working steps across a hoist breaks it at its most visible point, and an island offers no terrain feature, extramural edge or water leg for a chain's upstream steps. |
| J-V5.40 | *amended by J-VI.13.* Chose to leave the new derivation row's number to the integration, over taking DR26, because volumes 1, 6 and 8 each proposed a DR26 in parallel and one number for four rows would make the derivation table's references ambiguous; the row is DR27 (file f items 383, 387). |
| J-V5.41 | Chose to read the dossier's `magical_node` deposit as a flat, positionless addend to `h_town`, acting only where the town already supplies some magic, over a placement pull toward the node or a multiplier, because the node's position — at a ruin's centre where a ruin exists (item 109 (f)), else S12a's decoration site — is volume 4's and volume 8's and is fixed after S7b (5) places the islands, reading it would tie the islands to the underground (item 2), a multiplier would vanish exactly where a node matters most (a middling town), and the owner's "no prosperity, no islands" forbids a node lifting a town that supplies nothing. |
| J-V5.42 | Chose the model sampler's default — nine suns at the midpoints of nine equal slices of the equinox day at the site latitude; one point per field cell — with volume 6's per-cell layout of points × suns, stated at §4.5 (file f item 296), over leaving it unstated, because the strip and volume 6's building mask must OR bit for bit and neither can be built on an unstated layout; the strip reads whatever the sampler holds. |
| J-V5.43 | Chose a vault in the island's own rock — the rim slab, underside tier 0, present under every underside kind — for an island cathedral's crypt, the settlement's largest, over a ground crypt or no crypt, because only that keeps both the owner's crypt rule (item 109 (k) (2), J111: "cathedral also gets crypts but cemetaries get catacombs") and item 2's "no relation with the sewer system or underground"; island churchyards are surface burial grounds only, never catacomb candidates, while island churches still count toward the catacomb count. |
| J-V5.44 | Chose to state the reach cap of 8 × the caster's height as the model sampler's rule for every source — terrain, walls, islands and volume 6's building mask — over leaving each source its own reach, because the sources are OR-ed into one mask, which must follow one reach law (§8.4's cap). |
| J-V5.45 | Chose an island district size of its own, `districtHa`, over the town's mean district area, because with the town's mean a full CITY island is always one district and three never occur at METROPOLIS, so the owner's "a collection of neighbourhoods" could not happen; the count is volume 1's `skyDistrictCount` with volume 1's `plotShare`, the same cell the fill's stop and the coverage overshoot read, so one edit moves the count, the fill and the overshoot together. |
| J-V5.46 | Chose to hand an S3 reservation an institution island leaves to the row's hand-over classes — the cathedral's close to the town's largest parish church (or temple), the palace's site to the town hall or a guild hall, else a park — and to skip the reservation where the creation prefix already sends the institution up, over leaving it empty or re-planning S3, because a reserved site with no owner is a hole no stage fills, the old close as the mother church's and the old palace as the town hall are the historical pattern, and the castle holds its own S3 reservation (so handing the palace's to the castle row would reserve twice). |
| J-V5.47 | Chose to persist, per island, the `shadeBasis` its strips were last computed from — written only by a shade evaluation — over recomputing the strips on load from the live island or storing the strips' bits, because the owner's lag (item 102 (e)) must survive a save and a replay (the base recomputes the fields on load, §2.9), and a basis of ≤ 2.5 KB rebuilds the strips exactly where the bits would cost up to 60 KB. |
| J-V5.48 | Chose island district kinds keyed `sky-island`, `sky-palace`, `sky-temple`, `sky-prison` and `sky-tower`, owned by this volume and adopted by volume 1, and a fabric hint that is a prior (× 3 on the hinted template at S7c) and never a forced strategy, over reusing the ground's kinds or forcing the template, because `temple` is already a ground kind (one table, one row per key), and the owner's islands should vary as neighbourhoods do while leaning toward the fitting form. |
| J-V5.49 | Chose to read the rim as a `sheer` natural barrier (closure, no wall), never to wall an island by generation, and to make an author's island wall a barrier-closure enceinte walling only the landing yards with a gate at each attach, over walling the rim or refusing island walls, because item 106 asks walls to use natural barriers and an island is barrier all round, approachable only at its landings. |
| J-V5.50 | Chose to bind consumers to providers across the arenas by the route and to count a cross-arena consumer at the access's foot (or top) for its provider's two-way pull, over binding by the straight distance or counting it at its world position, because goods ride the hoist and arrive at the landing, never at the fields beneath the island. |
| J-V5.51 | Chose to let a split class's shop go up by the carried share while its works stays on the ground, joined by `branchOf` and the route, over keeping the whole class on the ground, because item 105 (h)'s split exists exactly so a noxious works and its retail can stand apart, and a rich island's butcher's stall or taphouse is historically faithful. |
| J-V5.52 | Chose to run item 105 (f)'s order and relaxation on each arena on its own at generation, each reading only the other's proxies (the island's land centroid; the ground's S10a block), over one joint order across the arenas, because the island's unit run and the pooled S10b run concurrently and a joint order would make placements depend on the worker's interleaving. |
| J-V5.53 | Chose to re-reason an island whose institution the dossier removes — the next instance of its row, else a prosperity island, else a wane — at the next epoch, the institution itself leaving at once and a lock holding the re-reasoning until it is lifted, over deleting the island or leaving a vacant claim, because the dossier is truth (item 20 (h)) while the island is the map's and changes only by its own law. |
| J-V5.54 | Chose to admit an island site only where its rim meets or lies within an admitted slanted access's run of admissible ground, over placing freely and reporting an unreachable island, because an island over open water beyond a rope line's run has no access at all, which no rung repairs. |
| J-V5.55 | Chose to project every island tier in the `prism` form at rung 3, over the `drop` form, because a drop offsets a tier by one height only and a root's thin tiers then draw as disjoint beads; `drop` stays only for the rung-3 budget fallback, with tiers subdivided so drops overlap. |
| J-V5.56 | Chose to take the global light's window from the surface layers' own top and to test each slab over its own reach, over one window from a top that counts the island's slab, because an island 150–250 m up would otherwise lengthen every ground ray's window five- to eightfold on every tile, for the same result. |
| J-V5.57 | Chose to let an island institution be only one building or compound — a singular record or a SIZE step — and to send a subsuming greater up alone, its lessers staying separate members, over admitting any record, because a COUNT, GUILD or QUARTER record is many buildings (item 108) and one island cannot carry all of them, while a member taken alone would count twice. |
| J-V5.58 | Chose to give the cathedral row a second tag, the great temple of a non-default religion, over the cathedral alone, because item 23 forbids hard-coded universals and volume 11 already treats the great temple "as cathedral". |
| J-V5.59 | Chose an exact O(1) pre-test per corridor cell (its own ray's track against the solid's bounding box) for the strip's window in rough relief, over two-pass extremes, because extremes taken over a smaller window can miss a low cell far from the island that the ray still reaches, while the pre-test is exact and as cheap. |
| J-V5.60 | Chose to stand every access foot and landing yard on part-0 land only, clear of piers, dilated decks and deck faces (V05 §3.22 (3)), and to make the accesses overhead obstacles every raised course laid after SKY keeps clear of, over letting a deck span a landing yard or a rope line, because a hoist's cage and a rope line need open air while item 110 (b) lets a deck span anything, and a yard on a mid-span deck or beside an aqueduct is reachable by nobody. |
| J-V5.61 | *amended by J-VI.4.* Chose that no raised way reaches an island and no raised part stands on one, and that no `SkyAccess` is a way or carries deck plots, over admitting a raised way into the sky or a second sky part per island, because II.1's sky has "no portals, no roads in or out", sky access is `SkyAccess` only, and item 110 (b)'s decks live in ground parts; a T4 `raised` or aqueduct stroke ending on a rim, or lying on an island's key, is bent (J-VI.4 (d), (e)), never refused. |
| J-V5.62 | *amended by J-VI.14.* Chose to keep a removed island as a live record in state `removed` that holds its slot closed and counted as filled at every re-derivation and epoch (V05 §3.2 (6)), and a deleted generated access's ordinal likewise (V05 §3.10 (1)), over re-drawing the slot, matching tombstones or reading the log ahead, because the owner's removal "holds through regeneration" (item 110 (b)), the base's collision rule re-mints over a tombstone, and a live record read at every derivation is the base's own pattern (a fallen island's record) — the owner removed that island, not the town's quota of islands; one suppression rule in two record forms, a count never releasing a hold (file f item 260). |
| J-V5.63 | Chose that item 110 (b)'s generator reads the sky only as V05 §3.22 (5) states — endpoints bound to reservations, ground-arena entities only by `PlatKey.layer`, the water need by arena, ground hydrology only — with every generated raised part committed before S7b (1) (§4.3's slot, file f item 290), over letting the generator read islands, because at generation the sky fill runs after the generator, a list of `sky-*` kinds would drift from the arena test, and an island's spring pond 60–220 m up is exactly what a naive search for a higher spring would find. |
| J-V5.64 | Chose that a landfall ruins the raised spans and piers it covers, steps the retaining walls it covers to `decayed` (kept decayed through a re-derivation until an epoch's restoration) and brings down the deck plots on a covered deck with their deck, as V05 §3.16 (4)'s table states, over re-deriving generated retaining walls "under the rubble" or leaving raised parts untouched, because re-derivation would stand an intact wall in a field of fallen rock, and the landfall's own rule is that states change and each change is a listed fate. |
| J-V5.65 | Chose the strip's receiver heights to be the unlevelled ground raster the field reads (S1 with the T2 terrain strokes), item 110 (a)'s levelling kept as platform datums (file f item 309), the basis's receiver version the hash of those heights, and a ground terrain edit re-reading strip bits over its scope from the unchanged bases, over a stored terrain version on the basis, because a load cannot rebuild from a superseded terrain version while the unlevelled raster is what the field and volume 6's shade mask already read (V06 §3.4), and a terrain edit moves the receiver, not the caster whose lag item 102 (e) asks for. |
| J-V5.66 | Chose to write "underside tiers" for the rock beneath an island and "massing tiers" for item 110 (c)'s stacked wings wherever both could be meant, the crypt lying "under the building's lowest massing tier, inside underside tier 0 (the rim slab)" and the surface top reading each point's highest massing tier, over one bare "tier", because a stepped temple on an island puts both in one sentence. |
| J-V5.67 | Chose to record item 110's arrival as one declared shift of both sky goldens with a no-op pin (item 110's rows off: byte-identical), the METROPOLIS golden pinning a raised way under an island, over re-recording the goldens silently, because the owner's default at CITY and METROPOLIS legitimately changes both, and a shift that rides silently hides every later regression behind it. |
| J-V5.68 | Chose to re-check every island's clearance after each epoch's growth by a second participant `sky.clearance` (V05 §3.15 (7)) and to let the island yield to the city (V05 §3.22 (2)), over checking at `afterField`, constraining the raised-way solver by islands, or re-evaluating the strip at the raise, because an epoch's raised parts, new stage and close-ups exist only after growth, a city builds its aqueduct where the water is, and item 102 (e)'s lag keeps the strip's basis to the next evaluation. |
| J-V5.69 | Chose to lay an island's retaining walls — the unit run's levelling and an author's T3 `retaining` or T2 terrace stroke — as `RetainingWall` records on the island's own arena, never an enclosure, never on the rim strip or along the rim (a stroke there bent inward past the rim walk, J-VI.4 (g)), over reading T3 on an island as an enceinte or keeping retaining walls on the ground layer only, because item 110 (a) says a retaining wall "is not an `Enceinte`" and holds the terrain it levels, which on an island is the island's, while the rim strip is never cut. |
| J-V5.70 | Chose to give SKY's ground writes data keys of their own, `reservations.landing` and `allocations.landing`, declared only by their readers (S8, S10a with S9b, S12a), S10a taking a landing's two staff households from its host district's `modest` demand, over SKY writing `reservations` and `allocations` as S3 and S7b do or SKY running before S7c, because with §4.12's hooks united into S7b's declared I/O a SKY that writes S7b's keys after S7b closes a cycle in §4.1's sort, while a SKY before S7c would split S7b; own keys order SKY after S7b and before its readers with no cycle, and SKY then rewrites no row S7b wrote. |
| J-V5.71 | Chose to compute the strips onto the ground once per shade evaluation, at their first read — volume 1's S9b at S10a's `afterDrivers` hook where it is registered, else field pass 2 — and hold them for every later reader, and at a re-derivation starting after SKY to write the islands' bases at S10a's start, before step (i) and every hook, over computing bases and strips at field pass 2 alone, because S9b's manor sun factor, the hood pins' shade gate and `DistrictContext.shade.islandShare` read the strips before pass 2, and a re-derivation from S10a would otherwise let the manor pick read strips from the old bases while the field folds the new. |
| J-V5.72 | Chose an optional `shadeBasis` — absent on an island raised at an epoch after S6 or declared between evaluations, which casts and receives no strip until the next evaluation — and a load that computes bases only through §7.5's schema chain for a document older than the basis step, never from an absent basis, over writing a basis at the raise or computing an absent one at load, because a basis written at the raise would move the field before the owner's lag lets it (item 102 (e)), and a basis invented at load gives a strip the session never had, breaking T-V5-21 (h). |
| J-V5.73 | Chose to write a covered way's class to volume 6's `Way.formerClass` in the `fallIsland` batch, keeping a `formerClass` the way already carries, over a landfall field of this volume's own or no record, because volume 6's landfall clearance restores the class from `formerClass` alone (V06 §3.5.2) — without the write every covered primary would stay a track for ever — and a lane volume 6 had downgraded should get back the class it had before its decline, not the lowered one. |
| J-V5.74 | Chose to read an epoch's island laws at the fold's rung (`ctx.rung`, V06 §3.1 (3)) over the rung at the epoch's population target, because inside the hand-off band the two differ and file f item 322 makes the fold's the epoch's rung for every reader, so the islands' gate agrees with the product and rung the rest of the epoch runs with. |
| J-V5.75 | Chose to read a sky pseudo-district in S7b (1)'s district supply term at its island's land centroid's world point (`anchor` + the outline's centroid, fixed by S7b (5)'s placement) over its main landing's foot, because the feet are sited only at SKY, after S7b, while volume 1's χ̃ reads the term at S7c by centroid distance; the centroid is the proxy the ground pool already reads for an island's classes (V05 §3.20 (1)), so both volumes read one point that exists when the term runs. |
| J-V5.76 | Chose to type a landfall's `members` as `DecorationMember` — an `Id` for a plot, land use, reservation, way or retaining wall, and `{ raised, span: [a, b] }` or `{ raised, support }` on item 244's support keys for a raised part — over storing volume 6's `SpanRef` or keeping raised parts out of the list, because a span and a pier have no `Id` of their own and a `SpanRef` is batch-local and never stored, while the support keys are minted once and never reused (file f item 244), so volume 6 can remove each raised member in the batch of the op that ends its cover. |
| J-V5.77 | Chose to make a resize and a rim reshape re-lay the rim strip, re-claim the landing yards and keep or re-search the institution claim inside the district that holds it, in the same commit, the rim walk re-planted whole by volume 1's `plantRimWalk` (V05 §4.2), and to floor a resize (or bend a reshape back) where no site in that district would fit, over leaving the strip and the claims where SKY laid them, re-running the unit run, re-searching the claim anywhere on the island, or releasing the institution to the ground, because a strip left behind either widens into dead land (growing) or is cut by the rim (shrinking), a re-search confined to the claim's district keeps every district's kind and volume 1's rule that only a unit run re-partitions an island (J-V1.90), and a floor keeps an institution island's reason without a second re-reasoning path beside V05 §3.15 (1b). |
| J-V5.78 | Chose to store an `own` island's drawn relief class on `terrainEcho.reliefClass`, written by SKY at the draw, over re-drawing it wherever it is read, because volume 1's terrace rule reads it after SKY and a second draw on one stream index would be a second writer of one value; `echo` and `none` carry none and read as `plain` (V01 §3.17.7 (2); J-V1.94). |
| J-V5.79 | Chose to let a covered tower and gate (a `Gate` of any kind — `main`, `postern`, `water`, `gatehouse` or `castle`) follow its run's `condition` — the `breached` length extended over its footprint's chord along the trace, or that chord alone where its stretch is not covered — over giving `Tower` a `ruined` state, because the base's `Tower` and `Gate` carry no state or lifecycle, file f item 575 draws a tower by its run, and volume 6's repair of a ring in use then stands tower, gate and wall together with nothing further to restore (V06 §3.7.5). |
| J-V5.80 | Chose to write no register line of this volume's own — every calibratable column P1 and P2 land takes V12 §3.11's default line, and their exits carry the register check (V05 §8) — over a line of `measure` entries due at M6-sky for the three ⟨P0⟩ cells with T-V5-3 and T-V5-10 registered as V12 `BenchBarDef`s, because P0's spikes set those cells and apply their fallbacks before P1 lands the table, so no measurement of a landed cell is left to register (the two tests hold them as ordinary bars at the exits); a whole-bar verdict would open a supply or caster fallback on a clause about another quantity (T-V5-10's ring nesting, T-V5-3's monotonicity); and no corpus frame holds an island, so "no admissible frame" is the honest status of a fantasy table. |
| J-V5.81 | Chose to price a resize and a rim reshape at every piece of work V05 §4.2 commits (V05 §6's row: each re-claimed yard's top at §12.6's placement rate and the plots re-cut outside the re-derived districts at its scoped-regeneration law), over keeping those inside a fixed ≤ 5 ms or batching the tops into the island L1 batch, because the base prices a `placeAt` and a local operator at those rates (§12.6), V01 §6's sky row and T-V1-21 leave that work to this row, and volume 6 sums its century from this row by citation — its worst case ≈ 97 ms more per growing resize at CITY, its bounds re-declared under D-18 (CITY ≤ 115 s, METROPOLIS ≤ 215 s, TOWN ≤ 25 s; J-V6.118). |
| J-V5.82 | Chose to cap an island's hand-placed accesses at `accessCount.handMax` (6), a seventh bent into a move of the island's nearest hand-placed access, over leaving hand placements unbounded or refusing past a cap, because the access obstacles, the route and their budgets need a stated maximum, a refusal is item 101 R2's only for a dossier fact or a lock, and a move is the nearest lawful form of the author's request; the cap is a table cell. |
| J-V5.83 | Chose to let the clearance rule's lock clause, and a lock's hold on the re-reasoning of an island whose institution the dossier removed, apply wherever those rules run (SKY-F, `sky.clearance`, a ground edit beneath; each epoch), the dossier's removal still taking effect at once, over exempting locks from the rules or letting a lock block the dossier, because a lock holds the author's island while the dossier stays the truth about its institution (items 20 (h), 101). |
| J-V5.84 | Chose that an island's seasonal look reads the document's one climate row as DR42 resolves it — the ground's, its height correction by the ground's relief class included — over correcting it for the island's altitude or its own relief, because one town lies in one climate: an island floats 60–220 m above its ground reference (V05 §2.4's `altitudeM`), under one climate step of lapse (≈ 0.4–1.4 °C at 0.65 °C per 100 m), while DR42's steps are a winter class apart, and an `own` relief is the island's texture, not upland; an island whose pond froze in weeks the ponds below stay open would show a climate the town does not have (item 117 (d): "climate decides"). |
| J-V5.85 | Chose to lay an island's fallen-leaf cover on a grid in the island's local frame and to read only the island's own crowns, the ground's cover never reading an island's, over §8.2's world-aligned grid and a cover shared across the layers, because the island moves by one translation (J-V5.1) and its look must move with it rather than reshuffle under a drag or the `offset` displacement, and a cover read across the layers would make a ground tile's look depend on crowns at another height, a coupling the two bases of V05 §5.3 do not have. |
| J-V5.86 | Chose to read the waterfall's lip as an outfall for §8.2's open leads, open in every week, and the spring pond as an ordinary `pond`, over freezing the fall into an icefall or keeping the pond open, because the conjured river is the island's magic, not a winter catchment's, so its fall keeps running (item 117 (e) keeps outfalls open), while the pond is still water like any pond and freezes first, as item 117 (e) asks. |
| J-V5.87 | Chose that an island draws V11's `SKY` row alone — pennants along its rim and two flanking each landing top, at whatever rung the island stands — over drawing the ground's tier rows on it or none below CITY, because item 118 (d) names the sky's own decoration ("pennants on their rims and landings") apart from the tiers, the ground rows' places (towers, squares, the procession route) are the ground arena's, and an island an epoch carried below CITY still stands in the sky; the rim run skips the yards' fronts and the waterfall's lip, so no pennant stands in a passage or a fall. |
| J-V5.88 | Chose to class among the sky's one-time waits under item 119's comfort level a generation and a Re-derive with islands, declaring an island and a hand `fallIsland`, opening a document with islands, a dossier change reaching them, an `advance` and an export, and among the interactive rows every other island edit (`setAttr`, a move, a resize, a reshape, New random, an access placed or deleted, Update shade now), the pending strip and the season, festival and Find switches, over binding every island edit by the comfort level, because a declaration and a fall relocate households and re-derive an island and its landings — a wait the user sits through once — while the other edits are moment-to-moment feedback whose budgets item 119 (d) leaves as they are; both kinds keep their rows as targets. |
| J-V5.89 | Chose that on Sky pins merge into a count bubble only within one layer and one island, that a hidden sky layer keeps its matches' ghost pins and counts, that Go there sets the match's island `key`, and that Show gaps on an island reads V01 §5.4 (3)'s `gapUnits` over the island's arena, the whole island one catchment for a walking-radius row (V05 §5.6 (4)), over merging pins across layers, dropping a hidden layer's matches and a gap reading of the sky's own, because a bubble joining an island's matches to the ground's beneath would send its click to the wrong layer, item 120 (e) and (f) ask that a match is never lost and that the filter hold across layers, and `gapUnits` is Show gaps' one definition on every layer, counting a unit served as V11 §2.3's `CoverageSpec` counts it, an island one walking unit because the ride to the ground passes every walking radius (V05 §3.5 (3)). |

## 10 Base change requests

This volume's requests to the base are applied by file f; each is now the base's text, which this volume cites.

| request | subject | applied by | base home |
|---|---|---|---|
| BCR-V5-1 | the island record and the access record | file f item 251 | §2.7 (the staged records' block), §2.8 |
| BCR-V5-2 | the sky arena's key, levels and roles; the part counter | file f item 203 | §2.2, §2.9, §6.3 |
| BCR-V5-3 | the sky stage in the stage graph and its data keys | file f item 282 | §4.1 |
| BCR-V5-4 | the island rule's supplies, rows and strategy | file f item 546 | II.6, §4.9 |
| BCR-V5-5 | S7b (5) and the landing kernel | file f item 295 | §4.5 |
| BCR-V5-6 | the plot model's sky fields | file f item 213 | §2.5, §10.2 |
| BCR-V5-7 | the island laws over time and the landfall | file f item 320 | §4.11 |
| BCR-V5-8 | the sky light rows | file f item 307 | §4.7 *Light sources* |
| BCR-V5-9 | the landfall decoration and the waterfall | file f item 252 | §2.7, §2.3 |
| BCR-V5-10 | the edit events and targets | file f item 356 | §7.1, §7.8 |
| BCR-V5-11 | the sky's failure rows and invariants | file f item 331 | §5.2, §5.3 |
| BCR-V5-12 | the dossier's islands row, DR27 | file f items 387, 383 | §7.7 |
| BCR-V5-13 | light, shadow, labels and exports | file f item 415 | §8.4, §8.2, §9.1, §9.2, §11.1 |
| BCR-V5-14 | budgets, tests, packages, the build plan, streams and anchors | file f item 476 | §12.4, §13.2, §14, §16, §6.1, §6.3, the Staged list |
| BCR-V5-15 | the islands in the daylight term, and the model sampler | file f item 296 | §4.5, §8.4, §13.2 |
| BCR-V5-16 | siting across arenas and custom chains on islands | file f item 308 | §4.7, §4.5, §10.2, §13.2 |
| BCR-V5-17 | the magical node in the town supply | file f item 547 | II.6 |
| BCR-V5-18 | the sky's marks in the style sheets | file f item 408 | §8.2 |
| BCR-V5-19 | reservations an institution island leaves | file f item 286 | §4.2, §2.5 |
| BCR-V5-20 | a ground landing's attach as an infill destination | file f item 299 | §4.6 |
| BCR-V5-21 | the island's shade basis on load | file f item 274 | §2.9, §7.5 |
| BCR-V5-22 | the global light's window without the slabs | file f item 416 | §8.4, §8.1 |
| BCR-V5-23 | the island step's households in volume 6's epoch | carried by volume 6 (V06 §2.1's `EpochOps.demandTaken`, V06 §3.8.1) | V06 §2.1 `EpochOps.demandTaken`, V06 §3.8.1 |
| BCR-V5-24 | the void face at L0 | file f item 204 | §2.2 |
| BCR-V5-25 | the lifecycle rows of the sky's events | file f item 375 | §7.4 |
| BCR-V5-26 | the landfall's quarried land | file f item 253 | §2.7 `LandUse` |
| BCR-V5-27 | a retaining wall on a sky island's arena | file f item 245 | §2.7 `RetainingWall` |
| BCR-V5-28 | the clearance after growth in volume 6's epoch | carried by volume 6 (its participant table, V06 W66) | V06 §3.2 |
| BCR-V5-29 | item 110's raised ways and the sky | file f item 290 (1), (5) | §4.3 |
| BCR-V5-30 | levelling as datums, the field's receivers unlevelled | file f item 309 | §4.7 S10–S11 |

## 11 Owner questions

| question | decision |
|---|---|
| Q1 — product order among the layers: the sky before or after the underground? | **The underground first, then the sky** (J122, `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`): M6-U after M5, then M6-sky, its P0 spike beside M5 (§16; V05 §8). |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED by reading:** every base and volume citation of this volume against the set as the coherence pass writes it
(files f and g applied); the owner's words in `docs/DEFINITION.md` and `docs/OWNER-INSTRUCTIONS-2026-09-25.md` (J98 to
J111 included) and file g's items in `docs/AMENDMENTS-2026-09-28g.md`; `docs/volumes/_integrate.md`'s J-VI rows; the
retrovalidation's two island findings (RV-pc-1, answered by volume 1's unit run and this volume's unit inputs; RV-pc-3,
answered by V05 §3.3).
**Executed:** the nine model suns at latitude 50° on the equinox, hour angles −80° to +80° by 20° — altitudes 6.41°,
18.75°, 29.5°, 37.16° and 40.0°, azimuths 97.7° to 262.3°, reaches 8 (capped), 2.95, 1.77, 1.32 and 1.19 — from the
standard solar formulas (V05 §3.19 (9)); the arithmetic that a flat island's `depthCm` 0 floors no root and that the crypt
test passes for terrain above −6.8 m with a 10 m rim. No reference code, class name, word list or table was read for or
copied into this volume.

**PLAUSIBLE until executed:** every mechanism, default row and number this volume adds — the supply rows and the node
bonus, the fill with its noxious and chain-node exclusions, the placement score and its weights, the outline and
underside rows, the terrain echo and the river's share, the access rows and limits (the hand-placed cap among them), the
landing geometry, the light rows, the dwell spans and rates, the landfall's cover share and stone yield, the gradient's
band shares under the smoothing, `districtHa`'s district counts, the reachability filter's effect on F-SKY-PLACE's rates,
`deckGapM` and `lineClearM`, how often the unit run's levelling bites on an island's gentle relief, whether item 110's
arches and decks sit near `casterAllowanceM`, the strip's cost and its gentle effect (V05 §3.19 (9) is a derivation from
the defaults), the sampler's one point per cell being fine enough for item 102 (g)'s island bar, the route's transfer
allowance, the chain rule's measured effects, the light pass's + 5 % on uncovered tiles, the resize row's figures and
volume 6's re-declared century bounds, the island's seasonal look read from the ground's climate, the pennants' places,
Find's rules on the sky, every one-time wait inside the comfort level, and every budget — until M6-sky's P0 spikes and the
phase exits measure them (V05
§8), with the pre-decided fallbacks of V05 §3.3, V05 §3.9 (5), V05 §3.17 and V05 §6.

## 13 Fix list

No item is open: each is closed at its home — V05 §8's P0 exits; V01 §3.10.3; V04 §3.5.1, V04 §3.10; V06 §2.1, V06 §3.2, V06 §3.4
(8), V06 §3.5.2, V06 §3.7.5, V06 §6.2; V09 §4.9, V09 §4.20, V09 §5.4; V10 §2.13 and §11.2; volume 11's rows; volumes 2 and 3's rim-slab crypt; V12
§3.11; and file f (V05 §10).

## Integration notes

The volumes-integration decisions this volume carries (`docs/volumes/_integrate.md`) are folded into the body at their
homes: **J-VI.4** — every refusal here but the dossier-owned one (J-V5.19) is a bend, each with its line: V05 §3.2 (3)–(4),
V05 §3.21 (3), V05 §3.22 (3)–(4), V05 §4.1's T3 and T4 rows, V05 §4.2 and V05 §3.23; **J-VI.14** — the island's removed slot and a deleted
generated access's ordinal are the suppression's island form under §2.8's one lift rule: V05 §3.2 (6), V05 §3.10 (1), V05 §4.2;
**J-VI.13** — the derivation row is DR27: V05 §4.4; **J-VI.3** — the rim's barrier kind is `sheer`: V05 §3.21 (1);
**J-VI.17** — this volume's cross-lane items are closed at their destinations: V05 §13.
