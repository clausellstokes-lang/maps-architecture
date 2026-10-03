# Design volume 5 — Floating islands: the sky layer

> PENDING FABLE REVIEW — written by opus standing in for the Fable seats volumes/V5-sky, its revisions, reconciliation and coherence lanes; covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the subject the base (`docs/ARCHITECTURE.md`, with files
f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in II.6. The
implementer holds the base and this volume and nothing else (§17.1). Every fact the base or another volume states is
cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n`
is a design volume's section, this one included (`V05 §3.2`); a list after a volume prefix stays in that volume (`V06
§2.1, §3.2` is two sections of volume 6); `item n` is an amendment item — items 1–113 the owner's, items 200 and above
file f's, each the applied text of a volume's base change request (V05 §10 lists this volume's); `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V5.n` (V05 §9),
tests `T-V5-n` (V05 §7).

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
   rows (palace, cathedral, prison, arcane tower) and custom institutions by their scene archetype (V05 §2.4, §3.4).
4. **The sky allocation** — S7b (5)'s fill, what goes up with the households (item 103's rulebook, items 105, 107, 108),
   the ground reservation's hand-over, burial and the crypt, and the population kept whole (V05 §3.5).
5. **Shape and placement** — the outline in the island's own local frame, and where each island floats by one scored
   draw with a failure ladder (V05 §3.6, §3.7).
6. **The island arena** — its frame, its L0 (the void, the land, the rim, water), its terrain echoing the ground, its
   conjured river and waterfall (V05 §3.8).
7. **The underside, the ground reference and the altitude** — the rocky root beneath, the caster ceiling, the clearance
   over the ground, fixed at SKY so the island's shade can be read before any plot is cut (V05 §3.9; the owner's J98).
8. **Access** — hoists, rope lines, floating stairs and bridges of light, with a landing yard at each end, and the
   island's rim strip and institution claim (V05 §3.10).
9. **The island's field** — a gradient carrying each band on its share of the land — and **the island's unit inputs** to
   volume 1's unit run, which lays the island's districts (V05 §2.3, §3.11, §3.12).
10. **Lights and names** (V05 §3.13, §3.14).
11. **Over time** — the island laws an epoch applies, the households they move through volume 6's typed channels, an
    island whose institution the dossier removes, the clearance after each epoch's growth, the fall and its landfall over
    every covered kind (V05 §3.15, §3.16).
12. **Failure ladders, determinism and every edge** (V05 §3.17, §3.18, §3.23); **editing, rendering, labels, exports,
    budgets, tests and the build plan** (V05 §4–§8).
13. **The island's shade strip** (item 102 on the island's side, with J98's underside) — folded into the daylight term by
    field pass 2; the sky receivers' shade; its lag behind edits, persisted as the shade basis (V05 §2.1, §2.3a, §3.19).
14. **Siting across the island** (items 103–105, 107, 108) — the route distance between arenas, coverage units, the trades
    an island never carries, split works and shops, the supply web per arena, custom chains, the landing classes' siting
    facts (V05 §2.4, §3.5, §3.20).
15. **The rim as a barrier** (the owner's item 106 where it reaches islands) — the rim a sheer barrier that closes any
    wall circuit, an author's island wall walling only the landing tops (V05 §3.21).
16. **Item 110 on, under and against the island** (the owner's "they go in") — casters under an island, the accesses as
    overhead obstacles, the island's own retaining walls, what the raised-way generator reads of the sky, the landfall over
    them, removals that hold (V05 §3.22).
17. **The dossier** — derivation row DR27 and the coherence rules (V05 §4.4); item 111's water, which leaves an island
    unchanged (V05 §3.8 (4), §3.11).

### 1.2 The base hooks this volume consumes (cited, never restated)

An index of citations; the values stay at the cited home.

| home | what this volume builds on it |
|---|---|
| II.6 (the island rule, `IslandRule`, `SkyStrategy`; file f items 546, 547) | the rule at depth (V05 §2.4, §3.2–§3.7) |
| II.1 rule (5), V01 §2.4, §3.10.3 | the sky call and the island's unit inputs (V05 §2.3, §3.12) |
| §1.1 `RungProfile.layers.islands` | the rung gate (V05 §3.2 (1)) |
| §2.1, §2.2 (file f items 203, 204) | the island's arena, roles and void face |
| §2.3 `Terrain`, `WaterBody.fall` (file f item 252) | the island's terrain and conjured river (V05 §3.8) |
| §2.5 (file f items 213, 286) | the sky allocation, the landing rows and yards, the context vector, the rim strip |
| §2.7 (file f items 244, 245, 251–253, 575) | the records this volume declares and the ones its landfall writes |
| §2.8 (the registry; the suppression's two record forms, file f item 260), §2.9 (`Document.nextSkyPart`; the shade basis on load, item 274) | identity, the removal's hold and its lift rule, the load path |
| §3.2, §3.4, §3.7 | the lattice, the kernel's buffer and simplification |
| §4.1 (SKY in the stage graph and its data keys, file f item 282), §4.12 | V05 §3.1 |
| §4.2 S0, S1 (1)–(5), S3 (2) and (8) | the `magic` circumstance and relief classes, the outline routine, rivers by descent, crossing sites; the reservations an institution island leaves (item 286) |
| §4.3 (file f item 290) | the raised parts SKY reads; the accesses' obstacles (V05 §2.3b, §3.22) |
| §4.5 *Fields*, S7b (1), (5) (file f items 295, 296) | the supplies, the fill, the strips' fold (V05 §3.3, §3.5, §3.19) |
| §4.6 (the landing attach as an infill destination, file f item 299) | V05 §3.10 (4) |
| §4.7 S10–S11, S10b, *Light sources* (file f items 307–309) | levelled ground, the landing plots, the route, the lights |
| §4.8, §4.9 (the churchyard row; the rim-walk row, file f item 313) | bridges on the island's river; burial; the rim walk |
| §4.11 (file f items 320, 322) | V05 §3.15, §3.16 |
| §5.1–§5.3 (the F-SKY rows and the sky invariants, file f item 331) | V05 §3.17 |
| §6.1, §6.2, §6.3 (`island.place`, the hash, the anchor table; file f item 476) | V05 §3.18, §2.5 |
| §7.1–§7.8 (file f items 356, 375, 383, 387) | V05 §4 |
| §8.1, §8.2, §8.4, §8.8 (file f items 408, 415, 416) | V05 §5.1–§5.3 |
| §9.1, §9.2; §11.1 (file f item 415) | V05 §5.4, §5.5 |
| §12, §13.2, §13.3, §14, §16 (file f items 476, 568) | V05 §6–§8 |
| items 102–111 of `docs/AMENDMENTS-2026-09-28g.md` as the coherence pass applies them to the base | their island parts (V05 §1.1 items 13–17) |
| V01 §2.3, §3.1, §3.2 (5), §3.5.5, §3.8.2, §3.14, §3.16, §3.17.7 (2) | the hooks S7c and S9b, `DistrictContext.shade`, χ̃'s supply term, `hood.constants.sky.plotShare`, `skyDistrictCount`, `plantRimWalk`, `terraceState` |
| V02 §2.6 (`DeckContext`), §3.15.2 (the stack envelope), §3.16 | the caster ceiling, the surface top, deck plots |
| V04 §3.5.0a (9) (`ruin.node`), §3.5.1 (3), §3.10; V04 §2.3 `CatacombRule.count` | the clerk's node line; the catacomb count; the landfall's members read by the access closures |
| V06 §2.1 (`EpochParticipant`, `EpochOps`, `EpochScope`), §2.8, §2.12, §3.2, §3.4, §3.5.2, §3.7.5, §3.8.1, §3.19 | the island's two participants, the household channels, the landfall's clearance and repair |
| V08 §2.6 (the deposits row), §3.5 (the site latitude) | the node term; the sampler's latitude |
| V09 §2.7, §4.9 (the `bend.*` rows), §4.20.3, §4.20.9, §5.4, §6.4 | the Shade view, the island's bends, the delete row and suppression card |
| V10 §2.13 (`WhyProvider`, `FieldDrivers`, `WhyAnswer.closure`) | the clerk's island answers (V05 §4.5) |
| V11 §3.1 (rows 51 and 56), §3.5 (the institution classes), §3.9 (district kinds), §3.24.0 (the switch table) | the tables this volume's rows join |
| V12 §2.8, §3.7.6, §3.7.8, §3.9.1, §3.11 | the register, the pins, the M6-sky sitting |

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
  classes and carried trades must satisfy (V05 §2.4, §3.20). **Custom chains** — their discovery, activation and
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
  — is the base's (§4.2 S0–S1, S3, §4.5, §4.7 S10b); on an island it changes nothing (V05 §3.8 (4), §3.11).
