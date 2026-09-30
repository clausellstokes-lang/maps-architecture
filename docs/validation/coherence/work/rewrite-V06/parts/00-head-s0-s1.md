# Design volume 6 — Evolution: growth, decline and regrowth over time, and transitions on the weekly clock

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V6-evolution, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the evolution engine the base (`docs/ARCHITECTURE.md`,
with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in
§4.11. The implementer holds the base and this volume and nothing else (§17.1). Every fact the base or another volume
states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's;
`Vnn §n` is a design volume's section, this one included (`V06 §3.2`); a list after a volume prefix stays in that volume
(`V04 §3.5, §3.10` is two sections of volume 4); `item n` is an amendment item — items 1–113 the owner's, items 200 and
above file f's, each the applied text of a volume's base change request (V06 §10 lists this volume's); `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V6.n` (V06 §9),
tests `T-V6-n` (V06 §7), wiring rows `Wn` (V06 §1b; another unit writes `V06 Wn`).

## 0 In plain words

A town made by this program can live through time. You give it a future — "grow by a third over the next fifty years",
"a slow decline for a century, then recovery", or, when it belongs to SettlementForge, simply whatever the campaign's
dossier says each week — and the map changes the way real medieval towns changed, one year at a time, from the same
seed. Nothing is ever re-rolled: every house that survives a year is the same house, with the same shape and the same
name; only the things the year actually changed change.

**A town with a past is generated as its past.** When SettlementForge says a village was once a city — or you choose "once
a city, now a village" — the town is first built at its greatest size and then lived forward through its recorded history
in steps of a decade: the great fire burns and rebuilds a quarter, the plague years empty the edges, the trade collapse
shrinks it to what it is today. What it is today matches the campaign exactly; what it was shows in walls far beyond the
houses, a church too big for its congregation, street lines kept as field tracks, ruins on the surface or — after a
century — buried underneath. A place destroyed outright is refounded on its own ruins, reusing the old roads and gate
gaps. Every step is recorded, so the map can tell the story ("the walls were built when this was a city of twelve
thousand"), and the whole replay takes seconds for a town and under a minute for a metropolis, with a progress bar.

**When the town grows**, it fills itself before it spreads: empty houses are taken first, ruins are repaired or rebuilt
on their old foundations, gaps along the old streets are built up, and only when the old plan is full does a new ring of
streets grow outward along the main roads. Houses get more crowded before the town sprawls, as they did. When the
suburbs outside the walls grow large and rich enough, and the times are dangerous enough, the town builds a new, larger
wall around them; the suburbs become part of the town, and the old wall slowly loses its purpose — its gates are opened
into squares, its stones are carried off for new houses, and over some decades it becomes a ring road (or, sometimes,
disappears into the backs of the houses built against it, leaving only a curved line of plot boundaries).

**When the town shrinks**, people leave first from the exposed edges — the undefended suburbs, the damp low ground, the
streets beside the tanneries — and the houses they leave stand empty, lose their roofs, fall into ruin, and are robbed for
stone wherever someone nearby is building. Empty plots become gardens, orchards and fields; lanes that serve nothing
grow over into footpaths; but the street lines and the old wall lines stay, so the old plan is still there when people
come back. Fields nobody needs go back to pasture, then rough common, then woodland, and are ploughed again when people
return. A town that has shrunk a long way and still needs defending may build a shorter wall inside the old one, and
leave the old ring to decay. Shops and workshops close where their customers have gone and open again where people now
live; an apothecary tends to end up one per district, the tannery keeps drifting downstream, the rich drift toward the
sunny side of the hill and away from the shadow of a floating island. Your own custom institutions keep their places;
when one of your supply chains loses a member, the others stay where they are and only drift slowly, and when the chain
is whole again its links pull again. A chain's members sit close together at street scale; the neighbourhood is only
called a quarter once it has grown into one, or when you or the campaign say it is one.

**Water in dry country.** A desert town crowds around its spring or oasis, and its rich hold the gardens by the water. If
the spring fails, its pull weakens year by year: the gardens dry to scrub, the quarter around it grows poorer and may
empty, and an aqueduct it fed runs dry. If the water returns, so does the pull.

**Trade and services keep their balance as the town changes.** Every shop and workshop is tied to its nearest supplier
and its nearest buyers; when a supplier closes or a new one opens, the ties move to the nearer one in the same year, and a
tie pulls both ends, so a brewery drifts toward its taverns and a smithy toward its ore. Everyday services — the
apothecary, the baker, the chapel — spread out so each quarter has one rather than bunching. A butcher may split into a
slaughterhouse on the edge and a stall in the market, and merge back if the town shrinks. When the campaign says the town
has "5–10 blacksmiths", the map has that many smithies, more as the town grows and fewer (never below five) as it shrinks.

**Walls wear with the times.** A town that is poor and feels safe lets its walls go: the parapets crumble, then sections
fall into gaps you can see. A poor town under threat patches its gaps with whatever it has — timber, wattle, earth banks —
and a rich one under threat rebuilds in stone, replacing the oldest patches first. The walls change only when the times
have stayed good or bad for years, never at a passing blip.

**Villages stay villages in their buildings.** A wealthy village has bigger farms and better roofs, not a street of
manors. When a village grows into a town, its new and rebuilt houses may be grander; when a town shrinks to a village,
its grand old houses stay as they are, and only the new ones are village-sized.

**Walls follow the ground and never cut off the water.** A new ring of walls, or a shorter one in a shrunken town, leaves
the cliff, the gorge and the deep water as the wall and builds only where an enemy could walk up; a port always keeps a
gate onto its quays. A campaign town gets new walls only when its dossier says it has them.

**Crossing a size keeps its promises.** When a town grows into a city it gets its sewers that year; a village can grow
into a town, and a town that shrinks far enough becomes a village again.

**Raised ways, terraces and bridges with houses.** When a town becomes a city it may raise an aqueduct, a viaduct over a
ravine or a raised road between its high quarters; each says why it was built, and one you remove stays removed — the
city does not quietly build another in its place, and undo brings yours back. The people living where the arches go are
re-housed that same year. An aqueduct whose spring dries up, or a raised road nobody uses any more, is left to decay: its
arches fall one by one while the piers stand for centuries, and if the city needs it again it is repaired before anything
new is built. Terrace walls on a hillside outlast the houses they held and slump only when the terraces above have been
abandoned for a generation. Houses on a bridge burn from one to the next, and a flood that sweeps a bridge away takes its
houses with it; when the bridge is rebuilt, new houses go up on it.

**What lies beneath comes to light as the town grows.** Caves and the buried ruins of an older people can lie under any
settlement, from a hamlet up, sealed and unknown. Each new house built over one has a small chance of breaking through
its cellar floor; a sewer or a mine that grows into a hidden chamber opens it; sometimes people dig on purpose. Only once a
way in exists do squatters, hermits or a whole undercity move in, and if the last way in closes they leave and the place
is lost until it is found again. Deep chambers mostly stay secret even under a great city. Catacombs lie only under
cemeteries (and, in a big city, in an old quarry turned into a bone store); they grow a little each year, never shrink,
and when they cannot grow the old bones are simply stacked tighter. Churches get crypts instead, and the cathedral always
has the largest; if the bishop's seat moves, the new cathedral gets its crypt that year.

**Accidents happen, gently and by rule:** a house fire that spreads along timber rows until a wide street or a stone house
stops it, a flood on the low ground, a tower that falls, and after a great fire or flood sometimes the ground is raised
and the town rebuilt on the rubble. A town tied to SettlementForge has the calamities its dossier reports and no invented
ones, striking the places the dossier names; a town of your own has small ones by chance, and large ones only when you
ask for them.

**On the weekly clock**, every change is shown as it happens on the ground: a house staked out, walls rising, a roof
framed, a building emptied, stripped, falling into rubble; a ruin overgrowing. A time bar under the map lets you scrub
back and forth through the whole history — watch a century of growth in a few seconds, stop on any year, and see what
stood there then, down to the lane given up or the wall stretch pulled down in that very year. Every change is a recorded
event you can inspect ("why did this inn move?", "when did this wall come down?" — the answer is kept with the map, so it
survives saving and reloading), undo while it is the latest thing that happened, or branch from ("what if the town had
grown instead?"). Before you advance, the card shows you where the town will end up and how many houses it gains or
loses. Anything the history does, you can also do by hand, and anything you lock or pin, the history leaves alone.

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds

The **evolution engine** — the owner-staged strategy behind §4.11's `EvolutionStrategy` slot — at build depth:
1. **The epoch runner's phase contract** and the engine's phases in the base's epoch order (a)–(j), with the prelude and
   the hazard, fortification and terrain-and-water phases placed in it (V06 §3.1–§3.2; file f item 317).
2. **Epoch inputs**: the dossier-bound cadence (the port's, §4.11 *The clock* (4)), the standalone **trajectory** that
   expands an "advance time" request into dated epochs, the circumstance events (`EpochInputs.events`) as typed hazard
   rows, the town wealth level over time (file f item 343) (V06 §3.3).
3. **Growth**: the growth quantum, crowding before sprawl, the new stage's regime, the decision to build a new enceinte,
   the absorption of suburbs, the obsolete-wall pathway (gates to junctions, stretches dismantled, the ring road of
   `wallToWay` or the absorbed wall of `absorbWall`) (V06 §3.6–§3.7).
4. **Decline**: the departure matching that turns the roster's suffix into vacated dwellings, the per-layer candidates of
   the strike pool (building, plot boundary, street, wall), the shorter wall ring (`contractWall`)'s trigger and trace
   (V06 §3.5, §3.7).
5. **Regrowth**: the ordering inside each tier of the base's regrowth-first order, the re-upgrade of downgraded ways, the
   crowding tier, the overflow ladder that never leaves a household unhoused (V06 §3.8).
6. **Uses that move** (item 17) with the siting rulebook of item 103 and its coverage rows (f), and custom content over
   time (item 104 (e), (h) (7)): strain memory, closing, re-scoring, relocation, coverage pulls, the "why" rows recorded
   (V06 §3.9).
7. **Designation mutations over epochs** (item 18 (c)): the `MutationPlan` record and its schedule (V06 §3.10).
8. **Sunlight over time** (item 102 (b), (e)): the building shade mask written at each epoch and its drift through the
   field and the ladder (V06 §3.4).
9. **Hazards**: the fire-spread, flood and topple operators (V06 §3.11).
10. **Terrain and water over epochs** (item 25): candidate evaluation for the base's trigger rows, the oxbow a course
    shift leaves, and **springs and oases that fail or recover** (item 111 (b)) (V06 §3.12).
11. **Works scheduling** (item 67): start weeks, ordering on one target, part programmes, retirement (V06 §3.13).
12. **People over time**: ageing and the derived succession of household members (§10.3; V06 §3.14).
13. **The history record, replay and time scrubbing**: the epoch report and chronicle, the history index, history frames,
    the timeline bar, then-and-now, forks, the animated export (V06 §3.15, §5).
14. **Budgets** for an epoch and a century per rung (V06 §6).
15. **The hinterland over epochs** (item 26): fields follow the food demand, a fallow ladder in decline and its reversal
    in regrowth (V06 §3.5.3).
16. **Editing the past**: forks and the re-run of a history from an earlier point, dossier events included (V06 §4.4);
    history across a rebase and an upgrade (V06 §3.15.5).
17. **The supply web over epochs** (item 105): links re-bound after every committed opening, closing and move; openings in
    105 (f)'s order with its one bounded relaxation pass; split works-and-shop pairs splitting and merging; the district
    supply term; SettlementForge's `activeChains` at each epoch (V06 §3.9.10).
18. **Spread and pull over epochs** (items 107, 103 (f), 104 (h) (3)): nearest-provider catchments for strain, the comfort
    plateau and same-kind spacing in openings and moves, coverage gaps reopening, chains named a quarter only by
    emergence or declaration (V06 §3.9.2, §3.9.6, §3.9.8).
19. **Institution ladders over epochs** (item 108): record-owned member counts that scale with the population, and the
    COUNT, QUARTER, GUILD, SIZE and REPLACEMENT steps applied by least disruption (V06 §3.9.1, §3.9.11).
20. **Walls on barriers over epochs** (item 106): barrier closure on every new and shorter ring, water access as a hard
    rule, the waterfront grade from sea threats, the harbour-mouth chain, shoreline re-evaluation, and the dossier gate on
    circuits (V06 §3.7.6).
21. **Rung crossings** (items 14, 9; V07): the feature set re-resolved at each epoch (sewers on when a town becomes a
    city), the clamp to the registered products' ladders, and a product's phase overrides (V06 §3.2, §3.3.2).
22. **The underground over epochs** (item 109 (h), (j), (3b), (k)): access by digging from above, by public openings and
    by overlap with growing systems, transitive, and lost when its last open link closes (item 113 (e)); excavation by
    demand; dwellings only after access; ruins decaying and staying distinct; catacombs under cemeteries — the count, the
    ratchet, the primary complex and stagnation; crypts under churches — the cathedral's crypt the largest at every epoch,
    and the crypt join (V06 §3.18).
23. **Households between the steps of an epoch**: the typed displaced pool and demand reservations, and the underground
    crowding hook before the growth decision (V06 §2.1, §3.6, §3.8.1).
24. **The base hooks left for the engine**: `raiseGrade` after a great fire or flood, and passages sealed and reopened by
    decline and regrowth (V06 §3.11.6, §3.5.2).
25. **Item 110 over epochs**: the `raisedWays` step that founds viaducts, elevated roads and aqueducts at a CITY or
    METROPOLIS epoch where a reason arises, by one fixed uniform per reason key, within the rung's caps, the displaced
    re-housed in the same epoch; a user's removal of a generated one held as a suppressed reason key; raised ways in
    disuse, decline and repair; retaining walls and deck plots over epochs; walls, hazards, participants and the dossier
    where they meet these (V06 §3.19, §3.7.6 (5), §3.11, §3.2).
26. **The history replay at generation** (item 113): the engine's side of §4.11's history-first generation — the replay
    plan of coarse epochs, the event-to-epoch mapping, the generation budget with lazy detail, destruction and refounding
    run as epochs, and the replay record the report and the clerk read (V06 §3.20).
27. **Walls by need and means** (item 114): the condition ladder's transitions — worn, patched, breached — driven by the
    threat and the wealth level each sustained over a window, patches replaced oldest first (V06 §3.7.7).
28. **The grandeur ceiling across a rung change** (item 115 (e)): lifted for new and rebuilt buildings when a village
    becomes a town; the grander buildings of a town handed down kept as they stand (V06 §3.8.5).

### 1.2 The base hooks consumed (cited, never restated)

| hook | base home | this volume's use |
|---|---|---|
| `epoch` event, `EpochInputs`, `EpochRecord`, the fold at the log position | §7.1, §2.9, §4.11 | the engine runs inside the event's fold; every phase's ops are batches of that event |
| `EvolutionStrategy` registry slot, `'grow-by-stage'`, the phase interfaces | §4.11, §4.12, §14 (file f item 317) | the engine registers `'history'` (V06 §3.1) |
| the epoch's order (a)–(j), the rung at an epoch, the dials over epochs | §4.11 | the phase list (V06 §3.2) |
| the survivors' wealth ladder, the due mark, the ladder table, the churn caps, the geometry floor | §4.11, §2.5 | the ladder phase (V06 §3.8.4) |
| the decline table, exposure field, strike pool, dwell bands, salvage ledger, persistence order | §4.11, §2.7 | the decline phase's candidate sets (V06 §3.5) |
| regrowth-first siting order (0)–(6) | §4.11 | the siting phase's order inside each tier (V06 §3.8) |
| `ConversionOp` with `LadderOp`, `DeclineOp`, `UseConversionOp`, `TerrainWaterOp`, `HiddenOp`, `EvolveOp` | §4.11 (file f item 209) | every change the engine makes is one of these |
| the use step, `Use`, `UseRuleRow`, *Dossier content across epochs* | §4.11, §2.7, §10.2 (file f item 429) | the use phase (V06 §3.9) |
| the epoch-spread mutation, §4.7 S11's `MutationRecord` | §4.11, §4.7 (file f items 264, 266) | `MutationPlan` (V06 §2.5, §3.10) |
| the terrain-water kinds and trigger rows; the oxbow; `WaterBody.spring` | §4.11, §2.3 (file f item 206; item 111) | candidate evaluation, the oxbow, springs over epochs (V06 §3.12) |
| Works, `WorksTable`, the week, the calendar row, `stageAt`, `heightsAt`, the retain window | §4.11, §2.7 (file f item 321) | Works scheduling (V06 §3.13) |
| `wallToWay`, `gateToJunction`, `contractWall`, `Enceinte.supersededBy`, S5a's trace, `EnceinteStrategy`, `Enceinte.pathway`, `Enceinte.condition` | §4.11, §2.7, §4.4 (file f items 254, 575) | the fortification phase (V06 §3.7) |
| the identity rules: survival, succession, JOIN / SPLIT, tombstones, lineage keys with the epoch component | §6.3, §6.1 | every op continues lineage (V06 §3.16) |
| the stream concerns and the stage id component of the stream key | §6.1 (file f item 342) | every draw (V06 §3.16) |
| the circumstance timeline, typed slices, the roster tolerance, the lapse rule, the dossier contract, the derivation rows | §7.7 | inputs and bounds (V06 §3.3); the dossier trace (V06 §1b) |
| the undo record, independence, groups, checkpoints, replay mode | §7.4, §7.3 | the `advance` group, history frames (V06 §4, §3.15) |
| the `week` view key, the scrub rule | §2.9, §4.11 *Works* (9) | the timeline bar (V06 §3.15) |
| the prosperity field, its drivers (item 102's daylight share, item 111's water term), S12c's character step | §4.5 | re-evaluated each epoch; the building shade mask (V06 §3.4); the spring's flow (V06 §3.12.1) |
| items 103–108's base mechanisms (siting profiles and coverage, custom content, the supply web, barrier closure, balance, ladders); their rows V11's | §4.7 S10a/S10b, §4.4 S5a, §4.8, §7.7, §10.2 | their epoch halves (V06 §3.7.6, §3.9) |
| item 109's ruin system, caverns, optional access, catacombs and crypts; their build depth V04's, V02's and V03's | II.7.3, II.7.5, II.7.6; V04 §2.2–§2.3, §3.5, §3.10 | the underground over epochs (V06 §3.18) |
| `Features.sewers` and the TOWN law; the crowding hook; `raiseGrade`; `sealPassage` / `openPassage` | II.7.1, II.7.3 (c), II.7.6, §4.11 *Hidden plots over epochs* (file f items 550, 574) | the prelude, the crowding hook, the two conversions (V06 §3.2, §3.6, §3.11.6, §3.5.2) |
| item 110's base half — the raised way, its supports and spans, the course solver, the hand operator, `RetainingWall`, S10–S11's levelling, deck plots | §2.7, §4.3, §4.5, §4.7 S10–S11, §4.8, §5.3 (file f items 244–246, 290, 291) | the `raisedWays` step and the pool's raised, retaining and deck kinds (V06 §3.19) |
| history-first generation, the history rows, the replay's record | §4.11, §7.7 DR36–DR39, II.7.6, §6.1 (item 113) | the replay engine (V06 §3.20) |
| the rebase point `Base`, the upgrade's per-epoch diff | §2.9, §7.4, §7.5 | history across a rebase and an upgrade (V06 §3.15.5) |
| people: `derivePerson`, the key with its birth epoch | §10.3 (file f item 443) | lifespan and succession (V06 §3.14) |
| §5's no-whole-map-retry rule, the work limits, the report | §5.1, §5.4 (file f item 339) | the epoch's failure ladder and report (V06 §3.17) |
| the other volumes' epoch functions: `IslandEpochStep` (V05 §3.15); V04's `UndergroundFade`, `Foundations.apply`, `ArchVaults.reconcile`, `SewerStrategy.derive` / `.extend`, `CatacombGrowth.grow`, `QuarryWorkings.extend`, `AccessPass.run`, `UndercityEpoch.reread` (V04 §1b.2, §3.10); S7c and S9b through `hood.fabric` (V01 §3.3.6, §3.5.11); V07's `village.plan`, `village.density`, `village.pins`, `village.records` (V07 §3.12) | the other volumes | the participants of V06 §3.2's table; V02's W10 is no participant — its steps run through S11's mutator from the ladder's `MutationPlan` steps (V06 §3.10) |
| the village product's `ProductDecl`, its rung path and the product fold with its hand-off band | V07 §2.1, §3.12 (file f items 202, 322) | the epoch's product and rung (V06 §3.1) |
| the explanation interface `WhyProvider` | V10 §2.13 (file f item 270) | this volume's providers (V06 §4.5) |

### 1.3 Out of scope, with the reason

* **The island laws** (supply, waning, settling, falling, re-floating), their shade strip and the underside profile —
  volume 5's (`IslandEpochStep`, V05 §3.15). This volume calls it at its step and reads the island shade the base's
  sampler computes (item 102 (b)).
* **The underground's fade, extension and undercity re-read** — volume 4's (V04 §3.10), called at their steps; so are
  V04's access pass, catacomb growth, the ruin plan, the dig, opening and overlap rules and their tables (V04 §2.3, §3.5),
  the buried former-town ruins and the `lost` access state (item 113 (c), (e); V04). This volume schedules them over
  epochs, supplies the epoch's scope, cap and cause, and owns only the timeline rules of V06 §3.18 (when a draw happens,
  what binds across epochs, what an epoch outcome records).
* **The crypt itself and its rank** — V03's `Basement.crypt` and its rank (V03 §3.7.4), laid by V02's crypt ladder
  (file f item 226). This volume states only what an epoch guarantees: the seat's crypt in the batch that makes the seat,
  the rank re-run inside the causing op, no vault lost to a trim (V06 §3.18.3).
* **The base side of items 105–108 and 111** — the supply web, the barrier closure and stretch profile, the balance
  profile, the ladder table, the oasis and the water pull — is the base's (§4.2, §4.4, §4.5, §4.7, §4.8, §7.7); their rows
  are V11's. This volume designs only their epoch half.
* **The village product's own phases** (`village.plan`, its `siting` and `growth`, `village.pins` and the records
  placement `village.records`) — volume 7's (V07 §3.12). This volume gives them their slot (`ProductDecl.phases`,
  `.participants` and `.records`; file f item 317) and its clamp.
* **Neighbourhood fabric on new faces** (S7c, S9b) — volume 1's hooks; **building massing mutation steps** (W1–W9) —
  volume 2's; **the interior re-cut along the interior ladder** — volume 3's and the base's (§2.6). This volume schedules
  the events that invoke them.
* **The siting rulebook's rows** (every class's profile, supply edges, coverage rows, signature pairs) — volume 11's.
  This volume states only the use step's own defaults (V06 §3.9.9) that a class row may override.
* **The port's carriage of dossier facts into `EpochInputs`** — volume 8's: the calamity records, prosperity words, dated
  changes, `activeChains`, the ladder receipts, the church, cemetery, walls, ruin and mining records, the water-system
  record and the landmarks on high ground, and the history's reading (item 113; `AGE_BY_TIER`, the events, `peakTier`,
  the lifecycle). The **mapping of a calamity to a hazard** (the calamity table, V06 §2.4; DR28) and the **mapping of a
  history event to its epoch's effect** (V06 §3.20.2 with V11's rows) are this volume's, so the port carries the records
  and the engine decides what they strike.
* **Materialised social simulation** (relations, postings, schedules) — `@plat/sim` (M4b). This volume gives only the
  derived succession of household members that §10.3 assigns to the engine.
* **Item 110's base half** — the generation of raised ways at S4 and S6, the course solver, the span rule, the raised
  way's and the retaining wall's records, S10 and S11's levelling and the deck plots — is the base's (file f items
  244–246, 290); the arch vaults are volume 4's, the deck buildings and stepped tiers volume 2's, the terraced wards and
  the under-deck strip volume 1's, the island clearance volume 5's. This volume designs their epoch half.
* **A standalone neighbourhood document has no clock** (V01 J-V1.36): it has no S4–S5 route, so no epoch can grow or
  shrink it; advancing time on one bends to "a neighbourhood alone has no history yet — open it in its town to advance
  time" (item 101 R2; V06 §4.1; V09's `bend.*` row and V10's bend row carry the line).
