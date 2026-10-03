# Design volume 6 — Evolution: growth, decline and regrowth over time, and transitions on the weekly clock

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V6-evolution, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**Citations.** `§n` and `II.n` are sections of the base design, `docs/ARCHITECTURE.md`, with files f and g applied
(`docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`); `Vnn §n` is a section of a design volume, this one
included (`V06 §3.2`), the prefix written on every section of a list (`V04 §3.5.4, V04 §3.10`) and once before a range
(`V06 §3.1–§3.2`). `item n` is an owner or amendment item (owner items 1–101, file g 102–113, file f 200–585; its home is §0.2's
landing row); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated; a row
id of another volume (W, X, FL) is written with its volume (`V07 W70`); a bare id inside this volume (W1, T-V6-n,
J-V6.n) is this volume's. Research files are named by file and section only (reader tier; §17.1): nothing of a reference
generator's code, identifiers, grammar, word lists, tables or palettes is used.

## 0 In plain words

A town made by this program can live through time. You give it a future — "grow by a third over the next fifty years",
"a slow decline for a century, then recovery", or, when it belongs to SettlementForge, whatever the campaign's dossier
says each week — and the map changes the way real medieval towns changed, one year at a time, from the same seed. Nothing
is re-rolled: every house that survives a year is the same house, with the same shape and name; only what the year
changed changes.

**A town with a past is generated as its past.** When SettlementForge says the place was once a city and is now a
village, the map builds the city at its height and ages it to the present in coarse steps of a decade, playing the
fires, floods, plagues and collapses its history records, so today's village stands among walls far beyond its houses,
street lines kept as tracks, a church too big for its congregation and roofless ruins; a place destroyed outright is
rebuilt on its own ruins, reusing the old roads and gates, and ruins older than about a century lie buried under it. The
dossier's present facts are met exactly, and the story is kept so you can ask about it ("the walls were built when this
was a city of twelve thousand").

**When the town grows**, it fills itself before it spreads: empty houses are taken first, ruins are repaired or rebuilt on
their old foundations, gaps along the old streets are built up, and only when the old plan is full does a new ring of
streets grow along the main roads. Houses get more crowded before the town sprawls. When the suburbs outside the walls
grow large and rich enough, and the times are dangerous enough, the town builds a new, larger wall around them; the old
wall slowly loses its purpose — its gates are opened into squares, its stones carried off for new houses — and over some
decades becomes a ring road or disappears into the backs of the houses built against it, leaving a curved line of plot
boundaries.

**When the town shrinks**, people leave first from the exposed edges — the undefended suburbs, the damp low ground, the
streets beside the tanneries — and the houses they leave stand empty, lose their roofs, fall into ruin and are robbed for
stone wherever someone nearby is building. Empty plots become gardens, orchards and fields; lanes that serve nothing grow
over into footpaths; the street and wall lines stay, so the old plan is there when people come back. Fields nobody needs go
back to pasture, rough common and woodland, and are ploughed again when people return. A shrunken town that still needs
defending may build a shorter wall inside the old one. Shops and workshops close where their customers have gone and open
where people now live; an apothecary ends up one per district, the tannery drifts downstream, the rich drift toward the
sunny side of the hill and away from a floating island's shadow. In dry country, a spring that fails takes its pull with
it: the quarters around a dying oasis lose their draw and may decline. Your own custom institutions keep their places; a
supply chain that loses a member holds its other members where they are until it is whole again.

**Trade and services keep their balance.** Every shop and workshop is tied to its nearest supplier and buyers; when a
supplier closes or opens, the ties move in the same year, and a tie pulls both ends, so a brewery drifts toward its taverns.
Everyday services spread so each quarter has one. A butcher may split into a slaughterhouse on the edge and a market stall,
and merge back if the town shrinks. When the campaign says the town has "5–10 blacksmiths", the map has that many, more as
it grows and never below five as it shrinks.

**Walls follow the ground and never cut off the water.** A new or shorter ring leaves the cliff, the gorge and the deep
water as the wall and builds only where an enemy could walk up; a port keeps a gate onto its quays. A campaign town gets
new walls only when its dossier says so. **Crossing a size keeps its promises:** a town that becomes a city gets its sewers
that year; a village can grow into a town, and a town that shrinks far enough becomes a village again.

**Raised ways, terraces and bridges with houses.** A city may raise an aqueduct, a viaduct over a ravine or a raised road
between its high quarters; each says why it was built, one you remove stays removed (undo brings it back), and the people
living where the arches go are re-housed that year. An aqueduct whose spring dries up, or a raised road nobody uses, decays:
arches fall one by one while the piers stand for centuries, and a needed one is repaired before anything new is built.
Terrace walls outlast the houses they held and slump only when the terraces above have been abandoned for a generation.
Houses on a bridge burn from one to the next, a flood that sweeps the bridge away takes them, and a rebuilt bridge gets new
houses.

**What lies beneath comes to light as the town grows.** Caves and the buried ruins of an older people can lie under any
settlement from a hamlet up, sealed and unknown. A new house over one has a small chance of breaking through its cellar
floor; a sewer or mine that grows into a chamber opens it; sometimes people dig on purpose. Only once a way in exists do
squatters, hermits or an undercity move in, and if the last way in closes they leave and the place is lost until it is
found again. Catacombs lie only under cemeteries (and, in a big city, in an old quarry turned bone store); they grow a
little each year, never shrink, and stack the old bones tighter when they cannot grow. Churches get crypts instead, the
cathedral the largest, and a new cathedral gets its crypt the year the seat moves.

**Accidents happen, gently and by rule:** a house fire spreading along timber rows until a wide street or a stone house
stops it, a flood on the low ground, a tower that falls, and after a great fire or flood sometimes the ground is raised
and the town rebuilt on the rubble. A SettlementForge town has the calamities its dossier reports, striking the places it
names, and no invented ones; a town of your own has small ones by chance and large ones only when you ask.

**On the weekly clock**, every change is shown as it happens: a house staked out, walls rising, a roof framed, a building
emptied, stripped, falling into rubble; a ruin overgrowing. A time bar under the map scrubs the whole history — a century
in a few seconds, any year, down to the lane given up or the wall stretch pulled down that year. Every change is a recorded
event you can inspect ("why did this inn move?" — the answer is kept with the map), undo while it is the latest thing that
happened, or branch from ("what if the town had grown instead?"). Before you advance, the card shows where the town will end
up and how many houses it gains or loses. Anything the history does you can also do by hand, and anything you lock or pin
the history leaves alone.

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds

The **evolution engine** — the owner-staged strategy behind §4.11's `EvolutionStrategy` slot — at build depth:
1. **The epoch runner's phase contract** and the engine's phases in the base's epoch order (a)–(j), with the prelude and
   the hazard, fortification and terrain-and-water phases placed in it (V06 §3.1–§3.2; item 317).
2. **Epoch inputs**: the dossier-bound cadence (the port's, §4.11 *The clock* (4)), the standalone **trajectory** that
   expands an "advance time" request into dated epochs, the circumstance events (`EpochInputs.events`) as typed hazard
   rows, the town wealth level over time (item 343) (V06 §3.3).
3. **Growth**: the growth quantum, crowding before sprawl, the new stage's regime, the decision to build a new enceinte,
   the absorption of suburbs, the obsolete-wall pathway (gates to junctions, stretches dismantled, the ring road of
   `wallToWay` or the absorbed wall of `absorbWall`) (V06 §3.6–§3.7).
4. **Decline**: the departure matching that turns the roster's suffix into vacated dwellings, the per-layer candidates of
   the base's strike pool (building, plot boundary, street, wall), the shorter ring (`contractWall`)'s trigger and trace
   (V06 §3.5, V06 §3.7).
5. **Regrowth**: the ordering inside each tier of the base's regrowth-first order, the re-upgrade of downgraded ways, the
   crowding tier, the overflow ladder that never leaves a household unhoused (V06 §3.8).
6. **Uses that move** (item 17) with item 103's siting rulebook and coverage rows, and custom content over time (item 104
   (e), (h) (7)): strain memory, closing, re-scoring, relocation, coverage pulls, the "why" rows recorded (V06 §3.9).
7. **Designation mutations over epochs** (item 18 (c)): the `MutationPlan` record and its schedule (V06 §3.10).
8. **Sunlight over time** (item 102 (b), (e)): the building shade mask written at each epoch and its drift through the
   field and the ladder (V06 §3.4).
9. **Hazards**: the fire-spread, flood and topple operators (V06 §3.11).
10. **Terrain and water over epochs** (items 25, 111 (b)): candidate evaluation for the base's trigger rows, the oxbow a
    course shift leaves, and the failing spring that weakens an oasis's water pull (V06 §3.12).
11. **Works scheduling** (item 67): start weeks, ordering on one target, part programmes, retirement (V06 §3.13).
12. **People over time**: ageing and the derived succession of household members (§10.3; V06 §3.14).
13. **The history record, replay and time scrubbing**: the epoch report and chronicle, the history index, history frames,
    the timeline bar, then-and-now, forks, the animated export (V06 §3.15, V06 §5).
14. **Budgets** for an epoch and a century per rung (V06 §6).
15. **The hinterland over epochs** (item 26): fields follow the food demand, a fallow ladder in decline and its reversal
    in regrowth (V06 §3.5.3).
16. **Editing the past**: forks and the re-run of a history from an earlier point, dossier events included (V06 §4.4);
    history across a rebase and an upgrade (V06 §3.15.5).
17. **The supply web over epochs** (item 105): links re-bound after every committed opening, closing and move; openings in
    105 (f)'s order with its one bounded relaxation pass; split works-and-shop pairs splitting and merging; the district
    supply term; SettlementForge's `activeChains` at each epoch (V06 §3.9.10).
18. **Spread and pull over epochs** (items 107, 103 (f), 104 (h) (3)): nearest-provider catchments for strain, the comfort
    plateau and same-kind spacing in openings and moves, coverage gaps reopening, chains named a quarter only by emergence
    or declaration (V06 §3.9.2, V06 §3.9.6, V06 §3.9.8).
19. **Institution ladders over epochs** (item 108): record-owned member counts that scale with the population, and the
    COUNT, QUARTER, GUILD, SIZE and REPLACEMENT steps applied by least disruption (V06 §3.9.1, V06 §3.9.11).
20. **Walls on barriers over epochs** (item 106): barrier closure on every new and shorter ring, water access as a hard
    rule, the waterfront grade from sea threats, the harbour-mouth chain, shoreline re-evaluation, and the dossier gate on
    circuits (V06 §3.7.6).
21. **Rung crossings** (items 14, 9; V07): the feature set re-resolved at each epoch (sewers on when a town becomes a
    city), the clamp to the registered products' ladders, and a product's phase overrides (V06 §3.2, V06 §3.3.2; item 317).
22. **The underground over epochs** (item 109 (h), (j), (3b), (k)): access by digging from above, by public openings and
    by overlap with growing systems, transitive; excavation by demand; dwellings only after access; ruins decaying and
    staying distinct; catacombs under cemeteries — the count, the ratchet, the primary complex and stagnation; crypts under
    churches — the cathedral's crypt the largest at every epoch, and the crypt join (V06 §3.18).
23. **Households between the steps of an epoch**: the typed displaced pool and demand reservations, and the underground
    crowding hook before the growth decision (V06 §2.1, V06 §3.6, V06 §3.8.1).
24. **The base hooks left for the engine**: `raiseGrade` after a great fire or flood, and passages sealed and reopened by
    decline and regrowth (V06 §3.11.6, V06 §3.5.2).
25. **Item 110 over epochs**: the `raisedWays` step that founds viaducts, elevated roads and aqueducts at a CITY or
    METROPOLIS epoch where a reason arises, by one fixed uniform per reason key, within the rung's caps, the displaced
    re-housed in the same epoch; a user's removal of a generated one held as a suppressed reason key; raised ways in
    disuse, decline and repair; retaining walls and deck plots over epochs; walls, hazards, participants and the dossier
    where they meet these (V06 §3.19, V06 §3.7.6 (5), V06 §3.11, V06 §3.2).
26. **The history replay at generation** (item 113): the replay engine that runs a known history as coarse epochs from
    the founding or the peak to the present — the event-to-epoch mapping, the generation budget, lazy detail, destruction
    and refounding on the engine's terms, and the replay record the clerk tells the story from (V06 §3.20).

### 1.2 The base hooks consumed (cited, never restated)

| hook | base home | how this volume uses it |
|---|---|---|
| `epoch` event, `EpochInputs`, `EpochRecord`, the fold at the log position | §7.1, §2.9, §4.11 | the engine runs inside the event's fold; every phase's ops are batches of that one event |
| `EvolutionStrategy` registry slot, `'grow-by-stage'` | §4.11, §4.12, §14 | the engine registers `'history'`; the interface is phase-based (item 317) |
| the epoch's order (a)–(j), the rung at an epoch, the dials over epochs | §4.11 | the phase list follows it exactly (V06 §3.2) |
| the survivors' wealth ladder, the due mark, the ladder table, the churn caps, the geometry floor | §4.11, §2.5 | the ladder phase schedules rungs 1–3 on due blocks in V06 §3.8.4's order |
| the decline table, exposure field, strike pool, dwell bands, salvage ledger, persistence order | §4.11, §2.7 | the decline phase builds the pool's candidate sets per layer (V06 §3.5) |
| regrowth-first siting order (0)–(6) | §4.11 | the siting phase orders within each tier (V06 §3.8) |
| `ConversionOp` with `LadderOp`, `DeclineOp`, `UseConversionOp`, `TerrainWaterOp`, `HiddenOp` | §4.11 | every change the engine makes is one of these kinds, plus V06 §2.8's `EvolveOp` (item 209) |
| the use step, `Use` record, `UseRuleRow`, *Dossier content across epochs* | §4.11, §2.7, §10.2 | the use phase (V06 §3.9); strain memory (V06 §2.9; item 429) |
| the epoch-spread mutation, §4.7 S11's `MutationRecord` | §4.11, §4.7 | `MutationPlan` (V06 §2.5, V06 §3.10; item 264) |
| the terrain-water kinds and trigger rows; `WaterBody.spring` (item 111) | §4.11, §2.3 | candidate evaluation (V06 §3.12); the oxbow (item 206); the failing spring (V06 §3.12.1) |
| Works, `WorksTable`, the week, the calendar row, `stageAt`, `heightsAt`, the retain window | §4.11, §2.7 | Works scheduling (V06 §3.13); retirement (item 321) |
| `wallToWay`, `gateToJunction`, `contractWall`, `Enceinte.supersededBy`, S5a's trace, `EnceinteStrategy` | §4.11, §2.7, §4.4 | the fortification phase (V06 §3.7); `Enceinte.pathway` (item 254) |
| the identity rules: survival, succession, JOIN / SPLIT, tombstones, lineage keys with the epoch component | §6.3, §6.1 | every op continues lineage; nothing is re-rolled (V06 §3.16) |
| `epoch.transform`, `works`, `use.relocate`, `island.place`, `people`, the stage id component of the stream key; the replay's epoch component `0x8000 + r` | §6.1 | every draw; the engine's phases register their own stage ids (V06 §3.16; item 342); the replay's coarse epochs (V06 §3.20) |
| the circumstance timeline, typed slices, the roster tolerance, the lapse rule, the dossier contract, the history rows DR36–DR39 | §7.7 | inputs and bounds (V06 §3.3); the replay's inputs (V06 §3.20) |
| the undo record, independence, groups, checkpoints, replay mode | §7.4, §7.3 | the `advance` group, history frames (V06 §4, V06 §3.15) |
| the `week` view key, the scrub rule | §2.9, §4.11 *Works* (9) | the timeline bar extends it past the retain window (V06 §3.15) |
| the prosperity field and its drivers (item 102's daylight share, item 111's water term), S12c's character step and pressure | §4.5, §8.4 | re-evaluated each epoch; the building shade mask enters the shade driver (V06 §3.4); a failing spring's `flow` the water term (V06 §3.12.1) |
| item 103's siting profiles, relation families, signature pairs, coverage rows (the rows V11's) | §10.2, §4.7 S10b | the use phase's re-score and coverage pulls (V06 §3.9) |
| item 104's custom-content resolution and chain placement (the rows V11's, the host inputs V08's) | §7.7, §10.2 | the use phase re-sites an edited custom use and applies (h) (7)'s activation and deactivation over epochs (V06 §3.9.5) |
| the hinterland unit, `LandUse`, farm demand | §4.9, §2.7, §4.2 S2 (item 26) | the fallow ladder and its reversal (V06 §3.5.3) |
| the participants' functions in other volumes: `IslandEpochStep` (V05 §3.15); V04's `UndergroundFade` (`under.fade`), `under.extend`'s one order (V04 §3.10: `Foundations.apply`, `ArchVaults.reconcile(doc, scope.raised, epoch)`, `SewerStrategy.derive` at the first sewers epoch else `SewerStrategy.extend` with its wall drops, `CatacombGrowth.grow` with its `opts`, `QuarryWorkings.extend(doc, scope, epoch)`), `AccessPass.run` (`under.access`), `UndercityEpoch.reread` (`under.undercity`), the reading `workedOut` (V06 §3.18.2 (1)); S7c and S9b through `hood.fabric` (V01 §3.3.6, V01 §3.5.11); V07's `village.plan`, `village.density`, `village.pins` and the records placement `village.records` | the other volumes | the participants of V06 §3.2's table; V02's W10 is no participant — its steps run through S11's mutator from the ladder's `MutationPlan` steps (V06 §3.10) |
| people: `derivePerson`, the key with its birth epoch | §10.3 | lifespan and succession (V06 §3.14; item 443) |
| §5's no-whole-map-retry rule, the work limits, the report | §5.1, §5.4 | the epoch's failure ladder and report (V06 §3.17) |
| item 105's supply web (links, two-way pull, orientation, 105 (f)'s order and relaxation, the district term, split sites, `Use.branchOf`, `activeChains`; the rows V11's `siting.web` and goods table) | §4.7 S10a/S10b, §4.5 S7b (1), §2.7 | re-binding after each committed use op, the epoch's opening order and relaxation pass, splits and merges over epochs (V06 §3.9.10) |
| item 106's barrier closure, reach, stretch profile, waterfront and harbour-mouth chain (the rows V11's `walls.barriers`, `walls.waterfront`) | §2.7, §4.4 S5a, §4.8, DR2 | every trace the engine makes; the waterfront at each epoch; the dossier gate (V06 §3.7.6) |
| item 107's balance profile, comfort plateau, nearest provider only, same-kind spacing, quarters never assigned (the rows V11's) | §4.7 S10b, §10.2 | strain by labelled catchments, openings and moves, coverage recomputed after every opening and closing (V06 §3.9) |
| item 108's ladder table and step types, member counts from S2's per-capita rows clamped into a record's range (the rows V11's `dossier.ladders`) | §7.7 DR9, T9; §4.2 S2 | record-owned counts and the ladder steps over epochs (V06 §3.9.1, V06 §3.9.11) |
| item 109's ruin system, caverns at any tier, optional access and its causes, the excavation reading, catacombs under cemeteries with the ratchet, crypts under churches; the build-depth statements V04's (`AccessPass`, `CatacombGrowth`, `UndergroundFade`, the `DigRule`, `OpeningRow`, `CatacombRule` and `RuinRule` tables, `AccessCause`, `LinkCause`, `RuinRecord`, `CatacombComplex`), V02's (the crypt ladder), V03's (`Basement.crypt`, derived with the basement) | II.7.3, II.7.5, II.7.6; V04 §2.2–§2.3, V04 §3.5, V04 §3.10 | the underground over epochs: access, excavation, dwellings, ruins, catacombs and crypts (V06 §3.18) |
| `Features.sewers` and the TOWN law; the crowding hook; `raiseGrade`; `sealPassage` / `openPassage` | II.7.1 (item 550), II.7.3 (c), II.7.6, §4.11 *Hidden plots over epochs* | re-resolved at each epoch's prelude (V06 §3.2); the crowding hook before the growth decision (V06 §3.6); the two conversions scheduled (V06 §3.11.6, V06 §3.5.2) |
| the village product's `ProductDecl`, its rung path and the product fold with its hand-off band | V07 §2.1, V07 §3.12 (items 202, 317, 322) | the epoch's product and rung (V06 §3.1 (3)); the product phase overrides, participants and epoch rows (V06 §3.1 (4), V06 §3.5.2, V06 §3.5.3); the clamp to the registered ladders (V06 §3.3.2) |
| the explanation interface `WhyProvider` | V10 §2.13 (item 270) | V06's four providers (V06 §4.5) |
| item 110's base mechanism — the raised way's record on its own ground arena part, supports and spans with each span's use (`open` or `vault`), the course solver and the hand operator (T4 `road` with `raised`, the aqueduct class), the aqueduct's eager need reading, the under-deck strip, `RetainingWall` and S10–S11's levelling, deck faces and deck plots (the rows V11's `raisedWays`, `terrace`, `deck`, `deckOk`) | §2.7, §4.3, §4.5, §4.7 S10–S11, §4.8, §5.3 | the `raisedWays` step calls the solver and the operator at an epoch (V06 §3.19); the pool strikes raised, retaining and deck fabric; tier (5) offers deck faces (V06 §3.8.2) |
| item 110 in the sibling volumes: the deck and stacked datums (V02's `deriveBase` stacking, item 370; deck buildings, V02 §3.16), arch vaults (V04), clearance after growth and the landfall's ruined parts (V05; its participant request carried by V06 §3.2's table), the close-ups' add path (V01), the outside-ground digest of a stored plan (V03, item 263) | the other volumes | the flood datum and the caster top (V06 §3.11.3, V06 §3.4); `under.extend`'s arch-vault reconcile, `sky.clearance` and `hood.fabric`'s re-derivation over `EpochScope.raised` and `.levelled` (V06 §3.2); V03's re-cut of a stored plan beside levelled faces inside the epoch event, an unstored one going stale |
| the history-first generation path (item 113): the peak, the replay on §4.11's path, destruction and refounding, burial, sewers reopening; `HistoryRecord` | §4.11, §2.7, II.7.6, §7.7 DR36–DR39 | the replay engine that runs it (V06 §3.20) |
| the rebase point `Base`, the upgrade's per-epoch diff | §2.9, §7.4's epoch row, §7.5 | history before a rebase point and an upgrade of a history (V06 §3.15.5) |

### 1.3 Out of scope, with the reason

* **The island laws** (supply, waning, settling, falling, re-floating), their shade strip and the underside profile —
  V05's (`IslandEpochStep`, V05 §3.15). This volume calls it at its step and reads the island shade the base's sampler
  computes (item 102 (b)).
* **The underground's fade, extension and undercity re-read** — V04's (V04 §3.10), called at their steps; so are V04's
  access pass, catacomb growth, the ruin plan, the dig, opening and overlap rules and their tables (V04 §2.3, V04 §3.5). This
  volume schedules them over epochs, supplies the epoch's scope, cap and cause, and owns only the timeline rules of
  V06 §3.18 (when a draw happens, what binds across epochs, what an epoch outcome records).
* **The crypt itself and its rank** — V03's `Basement.crypt` and its rank (V03 §3.7.4), laid by V02's crypt ladder that
  never refuses (item 226). This volume states only what an epoch guarantees: the seat's crypt in the batch that makes
  the seat, the rank re-run inside the causing op, no vault lost to a trim (V06 §3.18.3).
* **The base side of items 105–108 and 111** — the supply web's order, terms and splits, the barrier closure and stretch
  profile, the balance profile, the ladder table, the oasis and the water pull — is the base's; their rows are V11's
  (`siting.web`, the goods table, `walls.barriers`, `walls.waterfront`, `dossier.ladders`, the climate rows). This volume
  designs only their epoch half.
* **The village product's own phases** (`village.plan`, its `siting` and `growth`, `village.pins` and the records placement
  `village.records`) — V07's (V07 §3.12). This volume gives them their slot (`ProductDecl.phases`, `.participants` and
  `.records`, item 317) and its clamp.
* **Neighbourhood fabric on new faces** (S7c, S9b) — V01's hooks; **building massing mutation steps** (W1–W9) — V02's;
  **the interior re-cut along the interior ladder** — V03's and the base's (§2.6). This volume schedules the events that
  invoke them.
* **The siting rulebook's rows** (every class's profile, supply edges, coverage rows, signature pairs) — V11's. This volume
  states only the use step's own defaults (V06 §3.9.6) that a class row may override.
* **The port's carriage of dossier facts into `EpochInputs`** and of the history into `HistoryHint` — V08's: the calamity
  records, prosperity words, dated changes, `activeChains`, the ladder receipts, the church, cemetery, walls, ruin and
  mining records, the water-system record (`aqueduct_or_water_system`) with the landmarks on high ground that the
  raised-way pass reads (V06 §3.19), and the history's age, events, tier, population and calamity histories and lifecycle
  (item 113). The **mapping of a calamity to a hazard** and of a history event to a coarse epoch's effect are this
  volume's (`tables/evolution.json#calamities`, V06 §2.4; DR28, item 388; V06 §3.20.2), so the port carries the records
  and the engine decides what they strike.
* **Materialised social simulation** (relations, postings, schedules) — `@plat/sim` (M4b). This volume gives only the
  derived succession of household members that §10.3 assigns to the engine.
* **Item 110's base half** — the generation of raised ways at S4 and S6, the course solver, the span rule, the raised
  way's and the retaining wall's records, S10 and S11's levelling and the deck plots — is the base's; the arch vaults are
  V04's, the deck buildings and stepped tiers V02's, the terraced wards and the under-deck strip in the close-up V01's, the
  island clearance V05's. This volume designs their epoch half (items 260, 265, 266, 290, 291).

## 1b Wiring table — every new piece, what feeds it and what it feeds

Every record, field, table, interface, edit kind and derived view this volume adds, with its producer, its consumers and
the base hook it plugs into; rendering, labels, exports and persistence are V06 §5's and V06 §2.12's rows. Each row is wired at
both ends (principle (7)); a cross-volume consumer named here holds the matching row in its own volume.

| # | new piece (home) | fed by (producer) | feeds (consumers) | base hook |
|---|---|---|---|---|
| W1 | `HistoryEngine`, the `'history'` `EvolutionStrategy` (V06 §3.1) | the epoch runner of `@plat/edit`'s fold, at an `epoch` event's log position | the phase list W2; the batches of the epoch event | §4.11 `EvolutionStrategy`, §4.12 registry (item 317) |
| W2 | `EpochPhase`, `EpochContext`, `EpochOps` (V06 §2.1, V06 §3.2); `ProductEpochContext`, the part a product's phases, participants and records placement read | W1; before M6-E, M4's grow path fills `ProductEpochContext` at item 202's call points | the epoch runner, which commits each phase's ops as batches in phase order; a product's phases and participants (V07's `village.*`) on either path | §3.3's batches; §7.4's epoch row; §4.11's grow path (item 202) |
| W3 | `EpochParticipant` registrations (V06 §2.1, V06 §3.2's participant table) | `@plat/sky` registers `sky.islands` (V05 §3.15) and `sky.clearance` (V05 §3.15 (7), its request carried by V06 §3.2's table); `@plat/hood` registers `hood.fabric` (V01's S7c on the districts the epoch made outside S7b and S9b on the blocks rung 3 re-cut or redeveloped, `EpochScope.recut`); `@plat/evolve` holds the thin adapters `under.fade` (wraps V04's `UndergroundFade.candidates` / `.apply`), `under.extend` (in V04 §3.10's order: `Foundations.apply` over the epoch's scope, V06 §3.18.1 (6); `ArchVaults.reconcile` over `scope.raised`; `SewerStrategy.derive` at the first sewers epoch, else `SewerStrategy.extend` with its wall drops; `CatacombGrowth.grow` under V06 §3.18.2's catacomb rules; `QuarryWorkings.extend`; V04's maintenance mode at a village rung), `under.access` (V04's `AccessPass.run` over the epoch's scope, V06 §3.18.1), `under.undercity` (`UndercityEpoch.reread` and U-FRONT F6's void dwellings, filled by relocation and its vacated households re-housed in the participant, V06 §3.18.1 (4)); `@plat/village` registers `village.plan`, `village.density` and `village.pins` with the village product (V07 §2.1, V07 §3.12), each run at every epoch and gating itself — `village.plan` and `village.pins` to a village rung, `village.density` to a document holding a superseded `VillagePlan`, under any product (V06 §3.2's scopes); each registration carries the `stage` V06 §3.16 names (`SKY`, `S9b`, `U-FADE`, `VS1`, `VS2`, `VS8`); under the history replay each declares its `replay` mode (V06 §3.20.4) | W2 at the steps `afterField`, `decline`, `afterGrowth` in (order, id) order | §4.12's `StrategyRegistry` |
| W4 | `Trajectory` and the `advance` request (V06 §2.3, V06 §3.3.2, V06 §4.1) | T1 `intend`'s time card (the app), the clerk's `advance` tool (§11.2), the CLI | `epoch` events appended one at a time in one `group`, each with its `EpochInputs` | §11.2's facade, §14's T1 row (item 458); §7.7's circumstance timeline |
| W5 | `HazardRow` table, the calamity table `tables/evolution.json#calamities` and the typed reading of `EpochInputs.events` — `{ week?, kind, params?, calamity? }` (V06 §2.4, V06 §3.11; item 573) | timeline entries and `advance` (standalone); the dossier's calamity records the port carries (V08), mapped by this volume's calamity table (DR28, item 388); the spontaneous hazard draw (V06 §3.11.1, standalone only) | the hazard phase's `burn`, `inundate`, `topple` ops and the F5 targets struck in place; `raiseGrade` (W49); a calamity's `deaths` into the catacomb need (W48); the chronicle W19 | §4.11 `EpochInputs.events` (item 573); rung 3's "destructive circumstance event"; §7.7 F5 |
| W6 | `BuildingShadeMask` (V06 §2.6, V06 §3.4) | the field phase at each epoch, from the buildings standing when the field phase runs (after this epoch's hazards), per wing, on the ground arena and on every island arena | §4.5's daylight driver (item 102) as its building casters — the field, the due marks, S10b's sunlit preference, the character step; V09's shade map view; V10's "why is this quarter poor" | item 102 (b), (e); §2.9's `fields` chunk (item 275) |
| W7 | the departure matching (V06 §3.5.1) | the roster's suffix (S2's delta demand), the exposure field `E(x)` | `relet` down and `vacate` ops, household relocations | §4.11 step (c) |
| W8 | the per-layer strike candidate sets (V06 §3.5.2), with the `raised`, `retaining`, `deck` and `landfall` kinds (V06 §3.19.2, V06 §3.19.4, V06 §3.19.5, V06 §3.5.2) | lifecycle states, finished `decay` Works, salvage demand, vacancy spans, a raised way's disuse (`underuseSince`), a terrace's abandonment, a deck's dead crossing, a `fallen_island` decoration's members (V05 §3.16); the epoch product's rows (`ProductEpochRows`: persistence multipliers, the street op) | the base's strike pool → `DeclineOp` (with item 291's raised, retaining and deck members), `plotToGarden`, `amalgamate`, `downgradeWay` (or the product's street ops `retireWay` and `effaceWay`, V06 §3.5.2), wall ops; the landfall clearance's `setAttr` pairs, `repairRetaining`, the decoration's tombstone and the quarry face's `retypeLand` | §4.11 *The strike pool* |
| W9 | `Enceinte.pathway` (V06 §2.7, V06 §3.7) | the growth phase's wall decision (a superseded ring), a hand `setAttr` | the fortification phase (`gateToJunction`, `dismantle`, `wallToWay`, `absorbWall`); §8.2's wall state rows; exports; the clerk | §2.7 `Enceinte` (item 254) |
| W10 | the ops `absorbWall`, `downgradeWay`, `upgradeWay`, `burn`, `repairWall` (with a stretch, or with none to lift a neglect — "back in use"), `retypeLand`, `repairRaised`, `repairRetaining` (V06 §2.8) | the fortification, decline, siting, hazard, hinterland and `raisedWays` steps, the `dossier` step's product placement and V07's siting step (m) (`retypeLand` of the village's fair field over hinterland faces, V07 §3.12 (a)), the re-levelling ops and the landfall clearance (`repairRetaining`, V06 §3.19.4 (6)); the fortification phase's pathway clearing (the no-stretch `repairWall`, V06 §3.7.5); a hand `convert` (T3's "repair" and "back in use", V06 §4.2) | the base's convert operators; lifecycle events; undo records; the renderer's rows; exports | §4.11 `ConversionOp` (item 209; the union declared at V06 §2.8) |
| W11 | `Way.formerClass` (V06 §2.8) | `downgradeWay`; V05's `fallIsland` convert (a covered way dropped to `track`, V05 §3.16 (4)) | `upgradeWay` in regrowth tier (5′); the landfall clearance (V06 §3.5.2); the renderer (drawn by its current class); GeoJSON `plat:formerClass` | §2.4 way record (item 209) |
| W12 | `Use.strain` (V06 §2.9, V06 §3.9) | the use phase | the use phase's closing rule; V06's `use` `WhyProvider` (V06 §4.5) for V10's `why`; CSV and GeoJSON `plat:strain` | §2.7 `Use` (item 429) |
| W13 | `MutationPlan` (V06 §2.5, V06 §3.10) | the use phase (an opening or a relocation into another designation), a hand `mutate … spread: 'epochs'` — a dossier re-designation is a host change, decided at once (§4.7 S11 (6)) | the mutation step of the ladder phase → `mutate` events and their Works; the description line; exports; the clerk | §4.11 *The epoch-spread mutation*; §2.8 registry (item 264) |
| W14 | the growth decision: quantum, crowding, regime (V06 §3.6) | the residual after regrowth-first siting; building capacities; the stage history | S5a–S5d for a new stage with its regime row; the crowding `relet`s | §4.11 step (g); §4.4 |
| W15 | the wall decision and the suburbs' absorption (V06 §3.7.1) | the threat slice (DR2), the extramural households, the prosperity mean, the era row | a walled stage (S5a trace, S7 furniture); W9 on the superseded ring; the character step re-typing absorbed districts | §4.4 S5a; §4.8 S7; §4.5 S12c |
| W16 | the contraction trigger and trace (V06 §3.7.4) | the intramural occupied share over years, threat | `contractWall` with its trace | §4.11 `contractWall` |
| W17 | terrain-and-water candidate evaluation; the oxbow (V06 §3.12) | the reach and basin records, harbour-use closure, sinuosity, S5d's shortfall | the base's `TerrainWaterOp` triggers; `formOxbow` inside `shiftCourse` | §4.11 trigger rows; §2.3 (item 206) |
| W18 | Works scheduling: start-week spreading, the one-target rule, part programmes (V06 §3.13) | every phase's physical change | the base's `Works` records; `stageAt`, `heightsAt` | §4.11 *Works*; retirement (item 321) |
| W19 | `EpochReport` and `ChronicleEntry` (V06 §2.10, V06 §3.15.1), with the `raised`, `retaining` and `decks` sections and the `raisedWay`, `retainingSlump` and `deck` kinds | every phase | the app's history panel and timeline bar; the clerk (§11.2); `chronicle.csv`; description lines "ruined since …"; kept across a rebase (V06 §3.15.5); V09 §4.10's `epoch` row lines and V08 §4.6 item 3 (`raised.suppressedFired`, V06 §3.19.3 (2)); the replay record's story (W86) | §5.4 (item 339) |
| W20 | `HistoryIndex` (V06 §2.11) | the log (epoch weeks, dated events) | the timeline bar; `HistoryFrame` requests; `forkAt` | §2.9, §7.4 |
| W21 | `HistoryFrame` cache (V06 §2.11, V06 §3.15.2) | the frame builder: the history store's images and keyframes, else replay from the nearest checkpoint (§7.4's replay mode) | the renderer at a scrubbed week outside the retain window; the APNG export W24; then-and-now W22 | §2.9 `week` view key; §8.1 |
| W22 | `HistoryDiff`, then-and-now (V06 §3.15.3) | lifecycle events between two weeks | the `history.diff` live layer (§8.2 roles); the clerk | §2.8 lifecycle block |
| W23 | `forkAt(seq)` (V06 §4.4) | the history panel, the clerk, the CLI | a new document (recipe + log prefix) | §11.2 facade; §2.9 |
| W24 | the animated history export (APNG) (V06 §5.3) | W21 frames at a stride | a file | §11.1 PNG export |
| W25 | `EvolutionTable` (`tables/evolution.json`) (V06 §2.2) | shipped defaults; `editTable` | every phase | §7.6 tables with provenance |
| W26 | the `evolution.*` parameters (V06 §2.2) | the advanced panel; T1's time card | the runner (strategy, cadence, hazard mode) | §2.9 `Recipe.params`; §7.8 control registry |
| W27 | `EpochInputs.wealthLevel` and the timeline entry's (V06 §3.3) | the port (dossier `wealth.label`, DR6) or the timeline / trajectory | the field phase's layer-1 expansion (`field.characterOffset`) | §4.11 `EpochInputs`, §7.7 (item 343) |
| W28 | the engine's stage ids for its phases (V06 §3.16) | the stage registry (append-only) | every `epoch.transform` stream the engine's phases open | §6.1 stream key's stage id (item 342) |
| W29 | the derived member succession and lifespan (V06 §3.14) | `derivePerson`'s appended lifespan draw; the epoch weeks | the gazetteer and family tree (§10.3, the app); people exports; the clerk | §10.3 (item 443) |
| W30 | the naming feature `formerWall` and the chronicle templates (V06 §5.2) | `wallToWay`, `absorbWall` | S13a's grammar guard (rows V11's); the chronicle's lines | §9.6, §10.4 |
| W31 | `LifecycleEvent.detail.why` on the use phase's `open`, `relocate` and `close` events and on a raised way's creation event (model data, item 265), and the report's `UseMove` rows derived from them (V06 §2.10, V06 §3.9.7) | the use phase, from the solver's scored contributions (link rows included, item 105 (j)); the `raisedWays` step, from the reason's values (V06 §3.19 (8)) | V06's `use` `WhyProvider` → V10's "why is this here"; V09's siting explanation panel; the chronicle's use lines; `uses-history.csv` | §2.8's lifecycle block (item 265); §11.2 `why` |
| W32 | `HistoryStore` — images and keyframes (V06 §2.11, V06 §3.15.2) | every commit's touched set (before and after); the verification replay | the frame builder W21; then-and-now W22 | §7.4's undo records and checkpoints |
| W33 | `rerunFrom(seq)` (V06 §4.4) | the history panel, the clerk, the CLI | a fork whose later epochs are re-appended from their stored `EpochInputs` and recomputed on the changed state | §11.2 facade (item 458) |
| W34 | custom chains over epochs (item 104 (e), (h) (3) with item 107 (e), (h) (7); V06 §3.9.8) | the dossier's custom records and chain activation carried by an epoch (V08 designs their arrival); the chain's placed nodes | the use phase's re-score (chain links on, off), the revision re-site, the character step's quarter emergence (never an assignment), the chronicle | §4.11 step (e); item 104's `SupplyEdge`s; item 72's threshold |
| W35 | the hinterland over epochs — fallow ladder and re-take (item 26; V06 §3.5.3) | the S2 demand's farm households and food need at the epoch; `LandUse` faces and their owners | `retypeLand` ops; S12a's new fields on new ground; the renderer's land-use rows | §4.9's hinterland unit |
| W36 | the base phases (`prelude`'s base part, `demand`, `field`'s base part, `dossier`, `siting`'s base tiers, `growth`'s base path, `lapse`, `character`, `works`'s base part), built once in `@plat/edit` (V06 §3.1) | §4.11 steps | `'grow-by-stage'` (all of them) and `'history'` (reused where V06 §3.2 marks "base") | §4.11 *The epoch's order* (item 317) |
| W37 | `ProductDecl.phases` and `.participants` (V06 §2.1, V06 §3.1) | a product's registration (V07's village product) | the runner at an epoch whose product, by V07 §2.1's fold (item 322; the hand-off band), is that product — its phases and epoch rows (`rows`, read by the decline and hinterland steps, V06 §3.5.2, V06 §3.5.3); its participants, registered as every participant is, run at every epoch and gate themselves by V06 §3.2's scopes | §1.1's product router; V07 §2.1 (item 317, absorbing items 202, 317) |
| W38 | the feature re-resolution (V06 §3.2 row 1) | the epoch's rung (the fold's, V06 §3.1 (3)); the creation's `blueprint.features` draw | `Features.sewers`; `under.extend`'s first-epoch U-NET; the catacomb count's rung (V06 §3.18.2); the report and the chronicle | II.7.1 (item 550) |
| W39 | `HouseholdLedger` (`EpochContext.households`), `EpochOps.displaced`, `EpochOps.demandTaken`, `Household.transit` (V06 §2.1, V06 §3.8.1) | hazards, contraction strips, Works, `sky.islands` (V05 §3.15), `under.fade`'s sealing of a lived void, clearances (a raised way's land, V06 §3.19 (7); a struck deck's buildings, V06 §3.19.5) | `siting` (the pool first, the delta less the taken); the report's household counts; T-V6-52 | §2.7 `Household`, §5.3 (item 335) |
| W40 | the underground crowding hook before the growth decision (V06 §3.6 (1)) | the residual's poorest-band households; U-FRONT's free capacity on lived and reopened runs and accessible void clusters (V04 §3.4, V04 §3.10) | S7b (6)'s underground allocation and U-FRONT's placement; `R` less the seated | §4.11's regrowth order (6); II.7.3 (c); §4.5 S7b (6) (item 574: the void part at any rung) |
| W41 | the overflow backlog (V06 §3.6 (1)) | the households the overflow ladder housed in earlier epochs (their tenure and lifecycle causes `rule:overflow`) | the growth decision's quantum; the stage's relocations out of tents and informal plots | §4.11 (item 336) |
| W42 | link re-binding, the epoch's opening order, the relaxation pass, split and merge over epochs (V06 §3.9.10) | every committed `openUse`, `closeUse`, `relocateUse`; `siting.web` (V11); the class orientation rows | S10b's scores; `UseMove.why` link rows; `splitThreshold` crossings → `openUse` (cause `split`) and `closeUse` (cause `merge`); the report | item 105 (a)–(h) |
| W43 | nearest-provider catchments for strain (V06 §3.9.2) | one labelled multi-source Dijkstra per class | `Use.strain`; the surplus order; the report | §12.6's cost unit; item 107 (c) |
| W44 | record-owned counts and the ladder steps over epochs (V06 §3.9.1, V06 §3.9.11) | S2's per-capita rows; the dossier's collective records and their receipts (`promotedFrom`, `demotedFrom`); `dossier.ladders` (V11 §3.12) | `assign` re-binds, openings, closings, SIZE mutations, REPLACEMENT converts — or, where V08 §3.5.1 (d) places the greater new, its member placed as an added record is (S10b's `dossier` request; at a village rung the product's `records` placement first, V07 §3.12 *Records at a village epoch* item 4; J-V6.125) — the circuit trigger (W45), the seat crypt (W51) | §7.7 DR9, T9; item 108 |
| W45 | barrier closure, water access, the waterfront at each epoch, the harbour-mouth chain, shoreline re-evaluation, the dossier gate (V06 §3.7.6) | the `EnceinteStrategy` trace under 106's closure; `walls.barriers`, `walls.waterfront` (V11 §3.16); DR2's walls records and sea threats; `reclaim` and `shiftCourse` | circuits, contractions, `drawWall` on the waterfront, `neglect`, the chain as S7 furniture; the report and the chronicle | item 106; §4.4 S5a; DR2 |
| W46 | `under.access` — dig draws, overlap, mine breaches, openings over the epoch's scope (V06 §3.18.1) | the epoch's built set; every element created or extended this epoch; the village mining workings opened this epoch (`EpochScope.workings`, V07 §3.16 (4)); the surface faces the epoch changed (`EpochScope.surfaceChanged`, the landfall members' faces included); `DigRule`, `OpeningRow`, `LinkRule` (V04) | `AccessPoint`s and links with `AccessCause { rule, system, event }`; V04's excavation reading; `under.undercity`; the chronicle (`accessOpened`) | V04 §3.5.7 (U-ACCESS) |
| W47 | excavation by demand (V06 §3.18.1 (5)) | the crowding hook's unseated demand and the undercity's size law against accessible void capacity; `excavate.*` rows | a U-DIG passage (link cause `dig`); the chronicle (`excavated`) | V04 §3.8 (U-DIG) |
| W48 | catacomb growth, count, ratchet, primary and stagnation over epochs (V06 §3.18.2) | the epochs' targets and weeks; the cemeteries' served burials (V04's share rule); the rung and the church count (dossier: church records); a plague condition's burials and the span's calamity deaths (`CalamityRef.deaths`, V08); `CatacombRule` (V04's fields, V11 §3.23.8's values; its `growthCapShare` read per year over the span); a village rung's maintenance mode (`blockedBy` `'rung'`) | `CatacombGrowth.grow` with the epoch's cap and primary; `CatacombComplex` (V04 §2.2); the report (`catacombStagnant`, `catacombsAboveCount`); the chronicle; V12's `catacomb.extentM2` | II.7.6; V04 §3.5.1 |
| W49 | `raiseGrade` after a great fire or flood (V06 §3.11.6) | a `burn` or `inundate` above the `raise.*` rows | II.7.6's `raiseGrade` conversion (the `buried` system); the chronicle (`terrain`) | II.7.6 |
| W50 | passages sealed and reopened over epochs (V06 §3.5.2, V06 §3.8.2) | rear plots vacant for `plots.mergeAfterYears`; regrowth tiers (1)–(3) taking them back | `sealPassage`, `openPassage` | §4.11 *Hidden plots over epochs* |
| W51 | crypts over epochs: the seat's crypt in the batch that makes the seat, the rank moving with the see inside the causing event, the no-vault-lost trim, the see-move filter, the crypt join (V06 §3.18.3) | `MutationPlan`s and dossier re-designations and REPLACEMENT steps toward an always-crypt class; the church-family uses; catacomb growth beneath a crypt | V02's crypt ladder (a `mutate` of the basement ring); V03's `Basement.crypt` (derived with the basement; the plan draws it) and its `undercroft` bays by the rank's cap; V04's crypt access (source `crypt`, V04 §3.5.7 (c)); V06 §3.18.1's transitive access; the chronicle (`cryptDug`, `cryptCapped`, `cryptJoined`); V09's underground view; V10's why | V02 §3.14.5 (item 226); V03's crypt role |
| W52 | the effective week of a Works-less change (V06 §3.15.2) | an engine op's epoch week; a dated dossier change's week | the frame builder, the scrubber, every export at a drawn week | §4.11 *Works* (9) |
| W53 | V06's `WhyProvider`s — `use`, `enceinte`, `district` (path `prosperity`), `mutationPlan` (V06 §4.5); what V10's raised-way provider reads over epochs | `LifecycleEvent.detail.why`, `Use.strain`, `Enceinte.pathway`, the circuit decision's recorded conditions, the masks of the history frames, `MutationPlan` | V10's `why`; V09's explanation panel | V10 §2.13 (item 270) |
| W54 | `decline.turnoverVacancy` (V06 §2.2, V06 §3.8.2) | the table row per band | regrowth tier (1)'s refill stop; T-V6-7 | §4.11's regrowth order |
| W55 | history across a rebase and an upgrade (V06 §3.15.5) | `Base.seq` (§2.9); the pinned output version and the upgrade's replay | the timeline's grey range, `locate`'s banner, the bends of `forkAt` and `rerunFrom` to the earliest seq (J-V6.98), the kept reports; the per-epoch `HistoryDiff` of an upgrade | §2.9, §7.4, §7.5 |
| W56 | the calamity table (V06 §2.4) | the dossier's calamity records (`calamityHistory[]` entries the port carries) | `EpochInputs.events` typed as hazard events with place and severity; the F5 exemption list | DR28 (item 388) |
| W57 | the `raisedWays` step and its pass (V06 §3.2 row 10a, V06 §3.19) | the epoch's rung (the fold's, read at `prelude`, V06 §3.1 (3)), the state after `terrainWater`, the field (prosperity), the ground hydrology's eager need reading, W58's ledger, V11's `raisedWays` rows, the dossier's water-system record, landmarks and era and culture rows (the trace below); item 244's support step (item 244; J-VI.27) on each solved course — its stations, pier rings and `raised_too_tall` drop (V06 §3.19 (5)) | repairs (W63), then the hand operator's creation events (cause `rule:raisedWay`) and the clearance ops before them; `EpochScope.raised` (W64); the report's `raised` section (its `suppressedFired` entries for V09 §4.10's `epoch` row lines and V08 §4.6 item 3) and the chronicle's `raisedWay` lines (W19); `under.extend`, `sky.clearance` and `hood.fabric` through the scope | item 110 (b); the base's raised-way course solver, item 244's support step and the hand operator (item 290; item 244) |
| W58 | `RaisedWayLedger` (V06 §2.13) | the model (standing raised ways, their `reason` and lifecycle cause) and the log's live removals (W60) | the pass's admission (W57); generation's S4 and S6 and a new stage's S5b (item 290); V10's "why is there no viaduct here"; the report's `aboveCap`, `suppressedHeld` and `suppressedFired` — the last read by V09 §4.10's `epoch` row lines and V08 §4.6 item 3 (V06 §3.19.3 (2)) | item 290 |
| W59 | `RaisedReasonKey` and its one uniform (V06 §2.13, V06 §3.16) | the candidate's kind and the lineages it names; the base's raised-way stream, epoch component 0 | the gate `u < p` (a suppressed key's too, for the report's `suppressedFired`, V06 §3.19.3 (2)); the raised way's lineage (its derivation unit); the suppression's key (W60); `rerunFrom`'s re-apply (V06 §4.4); the base raised-way record's `reason` | §6.1, §6.3 (item 290) |
| W60 | `LifecycleEvent.detail.suppress` — a removal of a generated raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06 §2.13, V06 §3.19.3) | a `delete` of such an entity from V09 §4.3's delete, the clerk or the CLI | W58's suppressed set, so every generator skips the key and counts it as filled; the retaining-wall re-derivation where an epoch levels (V06 §3.19.4 (1)) and tier (5)'s deck faces (V06 §3.19.5 (1)) skip theirs; the serving test of the user's re-adds — V09 §4.20.3 (4)'s Build it again and V10's Put it back, the same events (V06 §3.19.3 (3), (7)); `rerunFrom`'s re-apply; the dry run's line (V09's `info.remove.holds`); V10's "removed by you" | §2.8's lifecycle block (item 260) |
| W61 | the three candidate readings — viaduct, elevated road, aqueduct (V06 §3.19 (2)) | standing way chains of V11's `viaduct.routeClasses` (V11 §3.24.2) and the ravine and valley features they cross; high wards, terraces and the citadel's and great temples' reservations; the ground's springs and rivers within `sourceReachKm` and the need ratio | W57's gate, order and course solves; the why rows (W31) | item 110 (b) |
| W62 | the pool's `raised`, `retaining` and `deck` candidates and item 291's `DeclineOp` members (V06 §3.19.2, V06 §3.19.4, V06 §3.19.5) | a raised way's disuse (W67), a terrace's abandonment, a deck's dead crossing; the salvage demand; hazards (topple, inundate, burn) | `neglect`, `breach` and `dismantle` on spans, supports and retaining stretches; `breach` and `ruin` on decks; V04's vault collapse in the same batch; the deck plots' ruin; the chronicle (`raisedWay`, `retainingSlump`, `deck`); `EpochScope.raised` | §4.11 decline table and `DeclineOp` (item 291) |
| W63 | `repairRaised` (V06 §2.8, V06 §3.19.2 (5), V06 §3.19.5 (4)) | the pass's regrowth-first rule: a raised way with a ruined span (or abandoned) or a struck deck whose reason or crossing is live again | the span or deck back in use; V04's vaults re-laid through `under.extend`; the deck faces re-offered at tier (5); the report (`raised.repaired`, `decks.repaired`) | `ConversionOp` (item 209) |
| W64 | `EpochScope` (V06 §2.1) — `raised` and `levelled` added here, `recut` and `workings` at W74; **the one reader list of every field** (V06 §2.1's field comments point here) | derived from the epoch event's lifecycle entries: every op that builds, extends or opens what the fields name; every op that creates, repairs, breaches or removes a raised part; every op that levels or re-levels a plot or block (with its retaining walls) | per field — `built`: `Foundations.apply`'s new footprints (V04 §3.5.0 *At an epoch*, `under.extend`'s first act), `AccessPass.run`'s dig draws (V04's (d)), `QuarryWorkings.extend`'s stone volume (V04 §3.5.3), `sky.clearance` (V05 §3.15 (7)); `basementGrown`: `Foundations.apply`'s basement rings, `AccessPass.run` (d); `elements`: `AccessPass.run` (a)–(c), (e), (f) (V04's *With a scope*), `QuarryWorkings.extend`'s worked-out test; `workings`: `AccessPass.run`'s village-working test (V06 §3.18.1 (2c)); `recut`: `hood.fabric`'s S9b (V01 §3.3.6 (2)); `surfaceChanged`: `AccessPass.run` (e) (V06 §3.5.2); `raised`: `Foundations.apply`'s raised-way piers, `ArchVaults.reconcile`, `sky.clearance`, `hood.fabric`'s crossed districts; `levelled`: `Foundations.apply`'s retaining-wall footings, `SewerStrategy.extend`'s invert drops, `sky.clearance`. Volume 3 reads no field: the levelling op itself re-cuts a stored plan beside the levelled faces inside the epoch event and an unstored plan there goes stale (V03's outside-ground row; item 263; T-V3-30) | §4.11's epoch fold |
| W65 | the arch-vault reconcile (`ArchVaults.reconcile`) and the invert drops (`SewerStrategy.extend`'s wall drops) in `under.extend` (V06 §3.2) | `scope.raised`, the spans' `open` / `vault` use; `scope.levelled`'s wall crossings | V04's arch-vault chambers laid, collapsed or deleted; U-NET's drop junctions; `scope.elements` | V04 (its arch-vault source) |
| W66 | the `sky.clearance` participant at `afterGrowth` order 50 (V06 §3.2) | every island and every caster the epoch committed (raised parts, retaining walls' high sides, massing tiers, levelled fill) | V05's clearance rule (V05 §3.15 (7)): an island raised only where its floor fails, a listed fate | V05 §3.15 |
| W67 | the raised way's `underuseSince` and the runs-dry rule (V06 §3.19.2 (2)) | the pass: a way downgraded or unused at both ends; an aqueduct's need ratio below 1 or its source lost by `siltReach` / `shiftCourse` (V06 §3.12) | the pass's `neglect` when disuse has run (the pool's candidates from then on); the aqueduct's terminal supply off; the need reading of the next epoch | the base raised-way record (item 290) |
| W68 | raised ways on every wall trace (V06 §3.7.6 (5)) | the standing raised ways' supports and spans | the trace's cost field and strip rule; a wall opening (aqueduct) or a raised gate (viaduct, elevated road) as S7 furniture; `absorbWall` and `wallToWay` leaving the raised way standing | §4.4 S5a, §4.8 S7 |
| W69 | deck faces over epochs — offered, bound by the budget, struck, re-offered (V06 §3.8.2, V06 §3.19.5) | the base's deck faces (mole, pier, quay platform, bridge deck); V11's `deck` budget and V11 §3.24.4's per-use `deckOk` as V06 §3.19.5 (1) reads it; V02 §3.16 | tier (4) and (5) placements; the use phase's candidate filters; the ladder's rung limits on a deck plot; the struck deck's ruins | item 110 (d); §4.7 S10 |
| W70 | retaining walls over epochs (V06 §3.19.4) | the levelling ops of the epoch (a new stage's S10–S11, a re-levelling rung-3 re-cut or rebuild, `raiseGrade`) | the walls made, re-derived or restored there (a decayed stretch restored, a ruined one replaced, V06 §3.19.4 (6)), and no others, a suppressed wall skipped; `amalgamate`'s filter; the re-cut's fixed lines; the walls inside a `raiseGrade` region tombstoned, read by V04's buried-system builder as steps in the buried floor; `scope.levelled` | item 110 (a); §4.7 S10–S11 |
| W71 | hazards on decks and terraces (V06 §3.11.2 (2), V06 §3.11.3, V06 §3.11.4) | the deck's carriageway and faces; each building's datum `baseCm` (V02's `deriveBase`, item 370); supports' heights and materials | fire spreading along a bridge row; the flood's depth at the datum; a toppled support breaking its spans; a timber deck or support broken by a flood | §4.11 *Works* (4); V02 |
| W72 | the raised way's `detail.why` rows and the ledger reading for V10's raised-way provider (V06 §4.5) | W57's creation events; W58; the lifecycle (carried down, removed by hand) | V10's "why is this aqueduct here", "why is there no viaduct here" and "carried from year N"; V09's explanation panel | V10 §2.13 (item 265) |
| W73 | underground households at an epoch (V06 §3.18.1 (4), (6)) | F6's new void dwellings after `under.access`; the district's poorest-band ground households (`E(x)` order) up to V04's `voidDwellings.share`; the households `under.undercity`'s re-read or a foundation collapse vacates | `relocate` events into the void dwellings (the `use` cap); the in-participant re-homing on ground stock by §4.7's overflow pass; the report's `households.undergroundVacated`; T-V6-52 | V04 §3.4 F6, V04 §3.10; §4.7 |
| W74 | `EpochScope.recut` and `EpochScope.workings` (V06 §2.1) | derived from the epoch event's lifecycle entries: the blocks a rung-3 op re-cut or redeveloped; the mining and quarry uses whose workings an op opened | `hood.fabric`'s S9b (V01 §3.3.6 (2)); `under.access`'s mine breaches (V06 §3.18.1 (2c)) | §4.11's epoch fold |
| W75 | `ProductDeclEpoch.rows` and `ProductEpochRows` (V06 §2.1), and `ProductDeclEpoch.records` with its `EpochPlacement` | a product's registration (V07 §2.2's `epoch.rows` cell; V07's `village.records`, V07 §2.1) | the `dossier` step's call of the product's placement for each record it adds, before the base's placement, and of its `remove` for each record it removes, after the base's removal — on an absorb without an epoch the base's *One path* placement and §7.7 item 2's removal making the same calls — keyed by the dossier event's `seq` (V06 §3.2 row 12, V06 §3.16's *Keys*; V07 §3.12 *Records at a village epoch*); the decline step's per-class persistence multipliers and street ops — the retirement with its stricter test and the effacement (V06 §3.5.2); regrowth's reopening — tier (5′) and the placement rule over every placement an epoch makes, the use phase's openings and moves and a dossier-backed use's relocation included (V06 §3.8.2); the hinterland step's slack, order and cap (V06 §3.5.3) | §1.1's `ProductDecl` (item 317) |
| W76 | the `landfall` candidate kind and its clearance (V06 §3.5.2) | a `fallen_island` decoration's members (V05 §3.16 (5); `DecorationMember`, item 252 — an `Id` for a way, plot, reservation, land use or retaining wall, `{ raised, span: [a, b] }` for a raised span and `{ raised, support }` for a support, on item 244's support keys): covered ways, plots, reservations, land uses, raised spans and supports, retaining walls; `Way.formerClass` the landfall wrote; the salvage ledger's demand and the landfall's credit; `land.scrubAfterYears`; the ops that end a member's cover (`retypeLand`, `repairRetaining`, `repairRaised`, `dismantle`, any tombstoning op); the accesses V04 §3.10 bricked under the members | `setAttr` pairs restoring a way's class and surface (cause `rule:landfall`); `repairRetaining` on a covered wall; plots released to regrowth tier (3); each member's leaving (`setAttr` of `members`) in the batch of the op that ends its cover; the decoration's tombstone with its last member; the quarry face to `commons`; each bricked access back to `open` (`locked` when secret) with its host, and the host's face in `EpochScope.surfaceChanged` → `under.access`'s excavation reading and openings; the report's `landfall` counts; the chronicle `landfallCleared` | §4.11 *The strike pool*, *Salvage*; V05 §3.16 |
| W77 | `repairRetaining` and the restoration rule (V06 §2.8, V06 §3.19.4 (6)) | the re-levelling ops of an epoch (tier (3) builds, a house-platform rebuild, a rung-3 re-cut), the landfall clearance, a hand `convert` | a decayed stretch back to standing; a ruined stretch replaced by a new stretch on its line; the report's `retaining.restored`; the renderer's standing row; GeoJSON `state` absent | `ConversionOp` (item 209); item 245's state |
| W78 | a deck's condition — its host's lifecycle existence (V06 §2.12) | the pool's deck strike (`ruin`), a hazard (`breach`, `ruin`), V05's landfall, `repairRaised`'s deck form | V01's close-ups, V02's deck buildings, V05, the renderer's deck state rows, tier (5)'s deck faces, the exports | item 246's `Plot.deck.host` (item 291) |
| W79 | an enceinte's condition by run (item 575's `Enceinte.condition`; V06 §2.12, V06 §3.7.2–§3.7.5) | `breach` (V06 §3.7.3's neglect, a contracted ring's decay), `dismantle` (V06 §3.7.2 (2)), V05's landfall (V05 §3.16 (4)), `repairWall` (V06 §3.7.5, a hand `convert`) | V06 §3.7.5's repair of a pathway ring and of a ring in use (the `breached` runs, in chain order); the pathway's clearing and, in its batch, `repairWall`'s no-stretch form lifting the neglect (existence in use when every run is `standing`, else `decayed`); V06 §3.7.2 (3)'s dismantling on a cleared record, a stretch under a raised gate whose deck stands excepted (V06 §3.7.6 (5)); the towers and gates drawn by their runs; T-V6-6's wall struck share; §8.2's gap glyph and trace discs; §11.1's per-run LineStrings; the `enceinte` provider (V06 §4.5); the report's `walls.repairedInUse` | item 575 (§2.7 `Enceinte`; item 245's profile form) |
| W80 | the bench bars' registrations — one V12 `BenchBarDef` per bar V06 §8's register lines name as `bar.T-V6-<n>` (T-V6-6 – T-V6-10, T-V6-13, T-V6-16, T-V6-18, T-V6-28, T-V6-31, T-V6-32, T-V6-40, T-V6-43, T-V6-54, T-V6-71, T-V6-72, and the epoch forms of T-V6-34 and T-V6-37) | the seats landing E2, E3, E4, E5 and E8, each registering, in the same change, the bars its exit's lines name (V06 §8's registration table) | `plat parity`'s `bar.` rows (V12 §1b); V12's register lint (T-V12-20), each `bar.T-V6-<n>` entry resolving to its registration; E7's bench verdicts and `fallback` runs (V12 §3.7.1 (b)) | V12 §2.1 (`@plat/testkit/bars`); §13.2's statistics bench |
| W81 | the `field` phase's way-surface re-lay (V06 §3.2 row 4, V06 §3.4 (9)) | S6's re-banding at the epoch (the plots whose `fieldBand` changed, §4.11 (a)); volume 1's `way.surface` rows (V11 row 90, whose `S6` epoch reader this is), the era row, the field as S6 reads it; each way's edit mark on `surface` | `setAttr` ops on `Way.surface` (author `engine`, cause `rule:field`) in the phase's batch; S14's road programs (V01 §5.1.2) through the epoch's `DisplayDelta`; exports and the reader; the report's `shade.surfacesRelaid` and `.surfacesHeld` (W19's readers: the app's history panel, the clerk); the epoch's undo record | §4.11 step (a) with §4.5's hysteresis; V01 §3.7.3's epoch clause; item 207 (a) |
| W82 | the failing spring — `WaterBody.spring.flow` over epochs (V06 §3.12.1; item 111 (b)) | the `terrainWater` step's spring row: the span's drought conditions (`ConditionOverlay` archetype `drought`), the town's draw on the spring against its yield (V11 §3.24.6's water table), a dossier's `oasis_water` deposit turned `depleted` or `removed` (DR40); a hand `setAttr` of `flow` (T2 `ground`) | the water pull on the growth field and the prosperity water term (§4.2 S3 (6), §4.4, §4.5), both weighted by `flow` and re-read by the next phases of the same epoch; the grove and gardens it feeds (`fedBy`) withering by `retypeLand`; the decline phase's exposure (the dry term); the report (`springs`) and the chronicle (`springFailed`, `springRecovered`); V10's why rows for the water pull | §2.3 `WaterBody.spring` (item 111); §4.11 trigger rows |
| W83 | `HistoryReplay` — the replay engine at generation (V06 §3.20) | §4.11's history-first generation, after S0–S13a at the start population; `HistoryHint` (§2.7, V08) through DR36–DR39; the blueprint's history option (§4.2 S0) | the creation-prefix `epoch` events (flag `creation`), one per coarse epoch, folded by W1 like any epoch; W86; the report's `replay` section | §4.11 *History-first generation*; §6.1's replay epoch component |
| W84 | `ReplayPlan` — the coarse epochs, their spans, targets, rungs and mapped events (V06 §3.20.2–§3.20.3) | DR36's peak, DR37's events and histories, DR38's destruction and refounding; V11's event-to-epoch rows and `history.*` cells | W83's `EpochInputs` per coarse epoch (population target, week, events, circumstance slice, dossier requests); the replay record W86 | §7.7 DR36–DR39 |
| W85 | the event effect kinds — `hazard`, `condition`, `slice`, `request`, `population`, `destroy`, `refound` — and their reading of V11's event-to-epoch rows (V06 §3.20.3) | V11's event-to-epoch rows (one per SettlementForge history event type); the event's years ago and severity | `EpochInputs.events` (W5's hazard rows), `circumstances`, the dossier requests of step (e), the population target, the destruction and refounding of V06 §3.20.5; the report's `replay.unmapped` | V11 (item 113's table values) |
| W86 | the replay record — `HistoryRecord` (§2.7) written once at generation (V06 §3.20.6) | W83 at the replay's end | V10's history story; the reader's history line; §7.7's history rows; the timeline bar's past range (W87); `chronicle.csv`'s replay rows; the GeoJSON document properties | §2.7 `HistoryRecord` (item 113) |
| W87 | the replayed past on the timeline (V06 §3.15.4, V06 §3.20.6) | the creation prefix's coarse epochs (W20's index rows marked `replay`) | the timeline bar's past range (read-only: scrub and then-and-now, no fork inside it); `locate(w)` for a week in it | §2.9 `week` view key |

**The dossier trace** — every dossier fact the engine reads, with its field and derivation row (§7.7's table; the engine
never writes one and never asks for one):

| dossier fact | SettlementForge field (via the port's digest, §14) | derivation row | where the engine reads it |
|---|---|---|---|
| the population at a week | `populationHistory[]` / the dossier's population at `calendar.elapsedWeeks` | DR7, DR23 | `EpochInputs.populationTarget` → S2's delta demand, the rung at the epoch, the lapse rule |
| the week | `calendar.elapsedWeeks` | DR21 | `EpochInputs.week` → `years`, the Works' start weeks |
| the threat level | `site.threat` (and `walls.*` for the enclosure) | DR2 | `CircumstanceSlice.threat` → the wall decision, obsolete-wall keeping, contraction (V06 §3.7) |
| the prosperity word | `wealth.label` → `intent.wealthLevel` by `tables/dossier/wealth`; over epochs the changed word through V08 §3.5's `wealth` diff row (response `epoch`) | DR6 | `EpochInputs.wealthLevel` (item 343) → the field's character offset |
| trade partners, economy, powers | `economy.partners`, `economy.tradeLinks`, income rows, `powers[]` | DR3, DR4, DR11–DR13 | the slices the dials read past their hysteresis (§4.11) |
| calamities | `calamityHistory[]` (with its tick) and the institutions each calamity marked `ruined` | DR28 (item 388), §7.7 F5 | `EpochInputs.events` (item 573) typed by V06's calamity table → the `hazards` phase (V06 §3.11), the targets struck in place; its `deaths` into the cemeteries' burials (V06 §3.18.2 (3)) |
| active conditions (plague, famine, unrest …) | `activeConditions[]` with `triggeredAt.tick` | DR21 (conditions), §4.11 *Works* (10) | the `ConditionOverlay` (the `works` phase, V06 §3.13 (6)); a plague condition's burials into the catacomb need (V06 §3.18.2 (3)) |
| the rung history | `tierHistory[]` | §7.7 F8, DR23 | the `prelude`: the rung at the epoch, the feature re-resolution, the product overrides (V06 §3.2) |
| institutions added, removed, re-designated, ruined | `institutions[]`, `institutionHistory[]` | DR9, DR10, DR24, DR25 | `EpochInputs.dossier` → step (e); the dossier-backed uses the use phase only relocates |
| the ladder data: collective records, their numeric ranges and unnumbered qualifiers, promotions and demotions | `institutions[].count`, the kind labels' qualifiers, `promotedFrom` / `demotedFrom` receipts; `dossier.ladders` (V11 §3.12, from SettlementForge's ladder file) | DR9, DR24 (item 108's ladder rows) | the `uses` phase's record-owned counts (V06 §3.9.1); the `dossier` phase's ladder steps (V06 §3.9.11) |
| SettlementForge's own chains | `activeChains[]` (processors, outputs, `upstreamChains`, status) | DR33 (item 105 (i)) | the `dossier` phase re-binds the chain's links; the status weakens them from the next `uses` phase (V06 §3.9.10 (5)) |
| the cathedral and the churches | the cathedral record (a singular anchor) and the religious-category records with their count ranges (item 108's members) | DR9, DR24, DR32 | the always-crypt seat and the see's moves (V06 §3.18.3); the church count behind the catacomb count (V06 §3.18.2 (1)) |
| the Cemetery network and burial grounds | the `Cemetery network` record (METROPOLIS, burial beyond every gate), graveyard and burial-ground records | DR9, DR24, DR32 (item 109 (k)) | the first catacomb candidates at METROPOLIS; a removed record closes its cemetery (V06 §3.18.2 (1), (5)) |
| ruins, magic and mining | `site.deposits` (`ancient_ruins`, the mining deposits: iron, precious metals, gemstones, coal, copper), `magical_node`, ley-line income rows, `magical` history events, Adventuring delving institutions | DR17, DR19, DR30, DR31 (item 109 (a), (b)) | V04's ruin and cavern existence at creation; at an epoch a new deposit or ruin record arriving at `dossier` reaches V04's rules, and a new mining working's breach runs in `under.access` (V06 §3.18.1) |
| the walls | `walls.records`, `walls.citadel`, `walls.flagged`; a walls REPLACEMENT step | DR2, item 108 | the dossier gate on circuits (V06 §3.7.6 (4)) |
| threats by sea | the naval, raider and coastal-monster threats and hostile sea partners of `site.threat` and `economy.partners` | DR2 (item 106 (d)) | the waterfront grade at each epoch (V06 §3.7.6 (3)) |
| the realm latitude | the realm block's latitude | DR29 | item 102's sampler, so the building mask's sun positions (V06 §3.4) |
| the water system | the `aqueduct_or_water_system` record (V11's mapping to `conduit_house`, V11 §3.11) | DR34 (item 110 (b)) | at CITY and METROPOLIS V11 §3.24.7 (3)'s effects in the `raisedWays` pass — the need test counts as met, each SIZE member raising the aqueduct cap and the total by `capPerSizeMember`, its bound `conduit_house` the terminal, the chance untouched (no dossier factor; J-V8.67) — never forcing arches where no source is in reach, never acting at TOWN (V06 §3.19 (2), (6), V06 §3.19.6) |
| landmarks on high ground | the dossier's landmark records placed on the ground arena's high wards or terraces (V08) | DR35 (item 110 (b)) | the elevated road's landmark factor (V06 §3.19 (3)); never a sky landmark |
| era and culture | `site.culture` and the era the port resolves into the era and culture rows (V08's R3) | V08's R3 row; `site.culture` as DR5 and DR14 read it | the aqueduct's and the elevated road's chance factors (V11's `aqueductM` and the elevated rows) in the `raisedWays` pass |
| the oasis's water | `site.deposits`'s `oasis_water` (its state at each epoch) | DR40 (item 111 (a)) | the failing spring's dossier case — a deposit turned `depleted` or `removed` takes the spring's `flow` down by the spring row (V06 §3.12.1); never makes a spring fail where the dossier keeps the deposit live |
| the history: the peak | `peakTier`, the high-water population; else the evidence of a higher tier (`tierHistory`'s from-tier, `populationHistory`'s maximum, `calamityHistory`'s losses, ruined or remnant records of a higher tier, a resettlement) | DR36 (item 113 (a) (1), (f)) | the replay's start and its symbolic marking (V06 §3.20.2) |
| the history: the epochs and events | `history.ageYears`; `history.events` (type, years ago, severity); `tierHistory`, `populationHistory`, `calamityHistory` | DR37 (item 113 (a) (2)) | the replay plan's spans, targets and mapped events (V06 §3.20.2–§3.20.3) |
| the history: destruction and refounding | the lifecycle's terminal death and resettlement (`destroyedByEventId`, `lifecyclePatch`); a catastrophic event; an ancient "Fall of" event on the site | DR38 (item 113 (b)) | the replay's `destroy` and `refound` epochs (V06 §3.20.5) |
| the history: burial | the ruins' ages from the replay; floods, river silt and rebuilding on top; bare rock (`site.terrain`) | DR39 (item 113 (c)) | the burial test at each coarse epoch (V06 §3.20.5 (3)) |
| persons | `notables[]` (staged, item 88) | DR22 | never changed by succession (V06 §3.14) |

## 2 Data model

Units follow §2.1: weeks are integers (§4.11 *The clock*), years are `number` (weeks ÷ 52, a fraction allowed), lengths
`Cm` in records and `M` in table rows, shares on [0, 1]. **Model data** is in the model digest (§6.2) and changes only
through events; **derived** data is a pure function of committed state and the log, never persisted; **non-canonical**
data lives in the document's non-canonical blocks or in memory (§2.9) and is never hashed.

### 2.1 The engine's interfaces (`@plat/evolve`)

```ts
type EpochStep = 'prelude'|'hazards'|'demand'|'field'|'afterField'|'uses'|'departures'|'decline'|'fortification'
  |'terrainWater'|'raisedWays'|'ladder'|'dossier'|'siting'|'growth'|'afterGrowth'|'lapse'|'character'|'works'|'close';   // V06 §3.2's order (twenty steps); fixed
// EvolutionStrategy { id; phases: EpochPhase[] } is §4.11's (item 317): one phase per step it implements, in EpochStep order; a step with no phase runs nothing (V06 §3.1)
interface EpochPhase { id: string /* registered phase id, e.g. 'base.dossier', 'history.uses', 'village.siting' — what ProductDecl.phases names */;
  step: EpochStep; stage: StageId /* its registered stage id — the stream key's stage component (§6.1; item 342) */;
  run(ctx: ProductEpochContext /* a product's phase: the grow path's context before M6-E, V06's EpochContext after (which extends it), reading the extension only where present; the engine's own phases run only on V06's runner and read the whole EpochContext */): KernelResult<EpochOps> }
interface EpochParticipant { id: string /* 'sky.islands', 'under.fade', 'under.extend', 'under.access', 'under.undercity', 'hood.fabric', 'sky.clearance', 'village.plan', 'village.density', 'village.pins' — V06 §3.2's participant table */;
  step: 'afterField'|'decline'|'afterGrowth'; order: number /* ties inside a step: ascending, then id */;
  stage: StageId /* the stage its volume names (V06 §3.16): SKY, S9b, U-FADE, VS1, VS2, VS8 (VS8 for village.pins) — its draws' stream-key stage and its reads' tag */;
  replay?: 'every'|'last' /* item 113: under the history replay at generation, 'every' (absent) runs it at every coarse epoch; 'last' runs it once, at the last coarse epoch, over the replay's accumulated scope (V06 §3.20.4) */;
  run(ctx: ProductEpochContext /* as EpochPhase.run's */): KernelResult<EpochOps> /* every registered participant runs at every epoch at its step (item 317), whatever the epoch's product; a participant scoped to a product, a rung or a state returns no ops outside it, reading ctx.product, ctx.rung and the document (V06 §3.2's table states each scope) */ }   // registered in §4.12's StrategyRegistry by the owning package (a product's participants with the product's registration, ProductDeclEpoch.participants)
// item 317 (with V07's request absorbed; item 202 lands the members on M4's grow path): a product's epoch overrides, on §1.1's ProductDecl (V07 §2.1 declares the product)
interface ProductDeclEpoch { phases?: Partial<Record<'siting'|'growth', string /* an EpochPhase id */>>; participants?: string[] /* EpochParticipant ids it registers */;
  rows?: TableId /* the product's epoch rows (V07 §2.2's `epoch.rows` cell), typed as ProductEpochRows, read at an epoch of that product by the decline and hinterland steps */;
  records?: string /* an EpochPlacement id: the product's placement of each `assign` the epoch's dossier step places — a record it adds, a member a count step adds, or the greater a REPLACEMENT re-key places new (V08 §3.5.1 (c)'s second and third cases, (d); V07 §3.12 item 4), a first-case re-key being a `rebind`, never offered — called by that step at the product's epochs before the base's placement of the record (§7.7's *One path* sentence, "every `assign` event … is placed by §4.7 S10b's one solver") — and by that sentence's placement of a record an absorb adds without an epoch at a rung of the product (V07 J-V7.128); it places the record or declines it, and a declined record takes the base's placement; its `remove` is called after the base's removal of a record (§7.7 item 2's `closeUse`) on both paths; the member and both calls land with the product's registration (item 202) on M4's grow path, this interface carrying them at M6-E — V07's 'village.records' (V07 §2.1, V07 §3.12 *Records at a village epoch*) */ }
interface EpochPlacement { id: string /* 'village.records' */; stage: StageId /* its draws' stage component (V06 §3.16): S10b for village.records */;
  place(ctx: Pick<ProductEpochContext, 'doc'|'tables'|'product'|'rung'|'week'> /* never ctx.stream or ctx.epoch; the grow path and V06's runner pass their context, an absorb without an epoch a context holding those five (the absorb's week) (V07 J-V7.128, J-V7.129) */, record: DossierRef /* §7.1 */,
    event: { seq: number } /* the dossier event that adds (or re-keys) the record — carried by the epoch, or applied by the absorb: the placement's draws (on `siting` and the `plot.*` concerns) and the addresses it mints are keyed by this seq as creation index, epoch component 0, as a post-build placement's (§6.1, §6.3; §7.7 item 6, J-A22.76; V06 §3.16's *Keys*) */): KernelResult<EpochOps | 'declined'>;
  remove?(ctx: Pick<ProductEpochContext, 'doc'|'tables'|'product'|'rung'|'week'> /* as place's */, record: DossierRef, event: { seq: number } /* the dossier event that removes the record, keyed as place's */): KernelResult<EpochOps>
    /* called after the base's removal of the record (§7.7 item 2: its use closed by `closeUse`), at an epoch by the dossier step and on an absorb without an epoch by that removal, at a rung of the product: the product's own traces of the record — V07's fair field's reservation, a pin the record forced or bound (V07 §3.12 *Records at a village epoch*) */ }   // registered in §4.12's StrategyRegistry by the product's package
interface ProductEpochRows {   // what the engine reads from ProductDeclEpoch.rows (V06 §3.5.2, V06 §3.5.3); every member optional — absent, the engine's own rule
  persistence?: Record<string /* a class id ('church', 'manor', …) */, number /* × the building layer's rate for a building whose live or last use is of that class */>;
  street?: { classes: WayClass[] /* the classes the street candidate takes */; op: 'downgradeWay'|'retireWay' /* the op a way in use takes when struck: the engine's, or V07's retirement to a hollow way (item 268; its DeclineOp members as V07 names them) */;
    again?: 'effaceWay' /* the op a way already in op's result takes when struck again — V07's hollow way effaced to `decayed` (V06 §3.5.2) */;
    reopen?: 'reopenWay' /* regrowth's op for a way in op's or again's result — tier (5′) and the placement rule of V06 §3.8.2 — V07's hollow way back to `built` */ };
  hinterland?: { slack: number /* replaces dial.hysteresis in V06 §3.5.3 (1) (V07's `epoch.rows.hinterland.slack`, 20 %) */;
    order: 'farmstead'|'perimeterPoorest' /* surplus faces farthest from a live farmstead first (the engine's), or farthest from the perimeter and poorest by suitability first (V07 §3.9) */;
    cap: 'rungPerSpan'|'greatFieldPerEpoch' /* one rung per drawn span (the engine's), or one great field's worth at most per epoch (V07) */ } }
interface EpochOps { ops: (ConversionOp | EditEvent)[] /* committed in this order as single-level batches of the epoch event (§3.3) */;
  waited: Id[] /* candidates a cap or a work limit deferred, address order — first in line next epoch */; report: Partial<EpochReport>;
  displaced?: { household: Id; cause: DisplaceCause; from: Id /* the building left */ }[] /* households this phase's ops emptied out of their dwelling without housing them: they enter the ledger (V06 §3.8.1) */;
  demandTaken?: { band: string; count: number }[] /* households a participant takes up from the epoch's delta demand (V05 §3.15's refloat or raise; V05's request, carried here): `siting` subtracts them */ }
type DisplaceCause = 'fire'|'flood'|'topple'|'contraction'|'works'|'island'|'void'|'clearance'|'redevelopment';
interface HouseholdLedger {   // EpochContext.households — the epoch's one channel for households between batches (V06 §3.8.1; J-V6.67)
  displace(ids: Id[], cause: DisplaceCause, from: Id): void /* the runner calls it for every EpochOps.displaced row, after the batch commits */;
  take(band: string, count: number, by: string /* participant or phase id */): void /* the runner calls it for every EpochOps.demandTaken row */;
  pool(): { household: Id; band: string; cause: DisplaceCause }[] /* not yet placed, address order */;
  taken(): Record<string /* band */, number> }
interface EpochScope {   // EpochContext.scope() — what this epoch has changed so far; every field's readers are W64's list, stated there once (V06 §1b)
  built: Id[] /* buildings whose lifecycle in this epoch's event records existence 'built' (build, rebuild, reuse … build, a new stage's S11), address order — its readers W64's */;
  basementGrown: Id[] /* buildings a MutationPlan step, a rung-3 op or a crypt extension gave a new wing or basement ring this epoch — its readers W64's */;
  elements: Id[] /* underground tunnels, galleries and chambers created or extended this epoch by any phase or participant — its readers W64's */;
  workings: Id[] /* the mining and quarry uses whose outside-plot workings an op of this epoch opened (a village rung's mines, V07 §3.16 (4)), address order — its readers W64's */;
  recut: Id[] /* blocks a rung-3 op re-cut or redeveloped this epoch, address order — its readers W64's */;
  surfaceChanged: Id[] /* faces a reclaim, a course shift, a quarry face, a raiseGrade or a collapse changed this epoch, and the faces of the landfall members that left their decoration this epoch (V06 §3.5.2) — its readers W64's */;
  raised: Id[] /* raised ways (item 110 (b)) any op of this epoch created, repaired, neglected, breached, dismantled or removed, or whose spans a landfall ruined (sky.islands), address order — its readers W64's */;
  levelled: Id[] /* plots and blocks an op of this epoch levelled or re-levelled (a new stage's S10–S11, a re-levelling rung-3 re-cut or rebuild, raiseGrade), with the RetainingWalls it made, re-derived or buried (V06 §3.19.4) — its readers W64's */ }
interface ProductEpochContext {   // what a product's phases, participants and placement read — filled by M4's grow path at item 202's call points (V07 items 202, 317) and by V06's runner as the EpochContext below; lands with item 202 beside EpochPhase, EpochParticipant, EpochPlacement and ProductDeclEpoch
  doc: DocView /* the epoch's transaction view: the state after the previous phases' batches */; epoch: number; seq: number /* the epoch event's seq — every cause this epoch records */; week: number; prevWeek: number /* the previous epoch's week, or the creation week */;
  years: number /* (week − prevWeek) ÷ 52 */; inputs: EpochInputs; tables: TableView;
  product: string /* the product V07 §2.1's fold gives at the epoch (item 322): the previous epoch's product unless the target crossed the hand-off band — a village becomes a town at 1 500 × (1 + handoff.band) = 1 575, a town a village below 1 425 — 'town', or V07's 'village' */;
  rung: Rung /* the rung the fold gives: inside the band the previous product's own rung row at the edge of its range (a 1 440-person town on TOWN, a 1 560-person village on VILLAGE) */;
  productRows?: ProductEpochRows /* the epoch's product's epoch rows (ProductDeclEpoch.rows), resolved through the tables pinned in the recipe; absent for the base product */;
  stream(stage: StageId, entity: Handle): Stream /* epoch.transform (§6.1): the entity's key, the phase's stage id, the epoch; one stream per (entity, stage) per epoch, continued */;
  scope(): EpochScope /* derived from the epoch event's lifecycle entries so far */ }
interface EpochContext extends ProductEpochContext {   // V06's runner's context, built at E1 (the household ledger, item 335; the report skeleton, item 339); a product's phase or participant reads this extension only where present — on M4's grow path it is absent: the siting override's tier (0) reads an empty pool and step (m)'s roster joins take the base's churn cap (§4.11 *Churn*)
  params: EvolutionParams /* the effective parameters at the epoch's log position (V06 §3.1) */;
  exposure(): ExposureField /* §4.11's E(x) on §4.5's 32 m cells from the state at the call — computed at most once per epoch, after the field phase */;
  households: HouseholdLedger; churn: ChurnLedger; report: EpochReportSink }
interface ChurnLedger { remaining(district: Id, kind: 'geometry'|'fabric'|'use'): number; take(district: Id, kind: 'geometry'|'fabric'|'use', n: number): number /* granted ≤ n; §4.11's caps scaled by years, the fractional extra drawn as the base states */;
  block(block: Id): number /* the per-block maximum left this epoch */ }
// on §2.7's Household (item 335): epoch-local, never in a snapshot
transit?: { cause: DisplaceCause; since: number /* the week it was displaced */ }
```

`Household.transit` is written by the batch that displaces a household (the ledger's `displace`) and cleared by the batch
that places it, both inside one epoch; the runner's close asserts the ledger's pool is empty, so no household is in
transit when the epoch event ends (§5.3's scoped row, item 335; T-V6-52). A household a hand edit displaces between epochs
is re-homed inside that edit by §4.7's overflow pass (the base's rule) and never takes the field.

### 2.2 Parameters and the evolution table

```ts
interface EvolutionParams {   // Recipe.params subtree `evolution` (§2.9); control-registry rows on the advanced panel (§7.8)
  strategy: 'history'|'grow-by-stage' /* default 'history' for a document created at or after the output version that ships V06; 'grow-by-stage' otherwise (§7.5, J-V6.30) */;
  cadenceWeeks: number /* the standalone advance step: default 52 — the port's cadence (J-V6.3) */;
  hazards: 'none'|'minor'|'full' /* spontaneous hazards: default 'minor' standalone; a dossier-bound document holds 'none' by rule — `adjust` to another value is refused with R2's line (V06 §3.11.1; J-V6.19) */ }
```

The strategy, the cadence and the hazard mode are read from the **effective** parameters at the epoch's log position (the
recipe's, with every `adjust` before the epoch applied), never from the recipe alone (V06 §3.1 (2)).

`EvolutionTable` (`tables/evolution.json` in `@plat/tables`, V11 §3.1's registry row 60; one versioned table with provenance per cell, §7.6; every
default **our own, calibratable** by the corpus stage (§13.9) unless the column says otherwise; every chance is per year,
applied over an epoch's span as `1 − (1 − p)^years` through `dmath`, §4.11 *The clock* (5)). Under the `VG` preset an epoch
at a village rung reads this table at its parity values — the cells "0 in the parity presets" among them — and a
categorical `option` cell at its `MFCG` entry (§7.6; item 581):

| row | default | what it governs (V06 section) |
|---|---|---|
| `growth.quantumShare` | 0.03 | a new stage grows only when the residual households reach this share of the town's households … (V06 §3.6) |
| `growth.quantumHouseholds` | 40 | … or this count, whichever is smaller (V06 §3.6) |
| `growth.crowdFactor` | 1.5 | a dwelling of the crowding bands may take up to ⌈its band row's households × factor⌉, never above §2.6's capacity (V06 §3.6) |
| `growth.crowdBands` | the bands up to and including the settlement's middle band (§4.5) | who crowds (V06 §3.6) |
| `growth.crowdShareMax` | 0.12 | crowding beyond this share of households forces a stage whatever the quantum (V06 §3.6) |
| `growth.ribbonMaxHouseholds` | 150 | an unwalled stage for fewer residual households takes the `ribbon` regime, else `suburb` (V06 §3.6) |
| `growth.ringBlockM` | 40 | the depth of new land kept between the standing fabric and a new circuit's inner strip (V06 §3.7.1) |
| `walls.threatMin` | 0.35 | the threat a new circuit needs (V06 §3.7.1) |
| `walls.extramuralShareMin` | 0.20 | the share of households outside the outermost enceinte a new circuit needs (V06 §3.7.1) |
| `walls.prosperityMin` | 0.40 | the town's household-weighted mean prosperity a new circuit needs (V06 §3.7.1) |
| `walls.minIntervalYears` | 40 | years since the youngest enceinte's creation (V06 §3.7.1) |
| `walls.chancePerYear` | 0.04 | the circuit's chance once every condition holds (V06 §3.7.1) |
| `walls.keepThreat` | 0.60 | at or above it a superseded ring is kept as an inner defence (V06 §3.7.2) |
| `walls.fateWeights` | `road` 0.7 · `absorb` 0.3 | a superseded ring's end, drawn once (V06 §3.7.2; the owner's "deconstructed into a road" the heavier) |
| `walls.gateOpenAfterYears` | [5, 20] | drawn once per gate of a superseded or neglected ring (V06 §3.7.2) |
| `walls.gateOpenChancePerYear` | 0.15 | a gate of a ring with a pathway opens into a junction at this chance once its drawn years have run (V06 §3.7.2) |
| `walls.dismantleStretchM` | 120 | the length a dismantling strike takes (V06 §3.7.2) |
| `walls.dismantleChancePerYear` | 0.03 | per stretch, × the salvage-demand factor (V06 §3.7.2) |
| `walls.roadAfterYears` | [30, 80] | drawn once at supersession: when `wallToWay` becomes eligible (V06 §3.7.2) |
| `walls.absorbAfterYears` | [20, 60] | drawn once: when `absorbWall` becomes eligible (V06 §3.7.2) |
| `walls.neglectThreatMax` · `walls.neglectAfterYears` | 0.20 · 30 | an outermost ring neglected in long safety (V06 §3.7.3) |
| `walls.breachChancePerYear` | 0.01 | per 120 m stretch of a neglected ring (V06 §3.7.3) |
| `walls.eraFactor` | `[]` (every era 1) | per-era multipliers on the three wall chances (item 23: no universal) |
| `contract.occupiedShareMax` | 0.55 | the intramural occupied-plot share below which a shorter ring is considered (V06 §3.7.4) |
| `contract.afterYears` | 30 | how long the share must stay below (V06 §3.7.4) |
| `contract.threatMin` | 0.30 | a shorter ring is built only while defence still matters (V06 §3.7.4) |
| `contract.chancePerYear` | 0.03 | (V06 §3.7.4) |
| `contract.coreShare` | 0.90 | the new ring encloses at least this share of the intramural households (V06 §3.7.4) |
| `contract.marginM` | 40 | the margin added around the core region a shorter ring encloses; + 20 m per retrace, three retraces at most (V06 §3.7.4) |
| `plots.mergeAfterYears` | [5, 20] | drawn once per emptied plot (V06 §3.5.2) |
| `plots.amalgamateWeight` | 0.6 | vs `plotToGarden` 0.4 when an occupied neighbour shares a boundary (V06 §3.5.2) |
| `plots.gardenKinds` | < 400 m² `garden` · < 2 000 m² `orchard` · else `field` (a `LandUse` of kind `arable`) | the kind an emptied plot becomes by area (V06 §3.5.2) |
| `streets.abandonAfterYears` | 20 | a lane serving only empty plots this long is a candidate (V06 §3.5.2) |
| `streets.classes` | `lane`, `alley`, `cul_de_sac`, `track` | the only classes that downgrade (V06 §3.5.2) |
| `uses.byClientele` | V06 §3.9.9's table | the use step's defaults a class row may override (V11) |
| `hazards` | V06 §2.4's rows | the hazard operators (V06 §3.11) |
| `shade.rasterM` · `shade.ruinShare` | 4 · 0.5 | the caster raster's cell; a ruin's caster height as a share of its eave (V06 §3.4). The reach is the sampler's one law (item 296 (i); V05 §3.19 (1)), never a row here |
| `uses.closeSurplusBy` | `strain` | which surplus use of a class closes first when the manifest falls: the most strained, then the most over-served coverage unit, then address (V06 §3.9.4) |
| `uses.moveWhyRows` | 5 | the contributions kept per opening, move or closing for the "why" answer, stored on its lifecycle event (V06 §3.9.7) |
| `uses.openCandidates` | 64 | an opening fully scores this many candidates, the best by S10a's class raster (V06 §3.9.6; the cost bound of V06 §6.1) |
| `mutation.stepYears` | occupy 0 · adapt [1, 3] · extend [3, 10] · rebuild [8, 25] | the years after a plan's creation at which each later step falls due, drawn once per plan (V06 §3.10) |
| `fire.rebuildYears` · `fire.rebuildShift` | 30 · 1 | for this many years after a fire, a rebuild on a burned plot takes the next less flammable roof covering its class row admits (V06 §3.11.2) |
| `land.fallowAfterYears` · `land.scrubAfterYears` · `land.woodAfterYears` | [3, 8] · [15, 40] · [40, 100] | a field beyond the hinterland's demand turns pasture, then commons, then wildwood (V06 §3.5.3) |
| `oxbow.marshAfterYears` | [30, 80] | an oxbow lake left by a cut-off silts to marsh (V06 §3.12) |
| `silt.idleYears` · `silt.downstreamM` | 10 · 2 000 | a harbour basin idle this long, or a reach this far below a course change or a canal off-take, is a silting candidate (V06 §3.12) |
| `reclaim.maxHa` · `reclaim.bufferM` | 4 · 100 | the most one reclamation takes, cut to this buffer of built land when the face is larger (V06 §3.12) |
| `canal.maxM` | 1 500 | the longest canal the engine digs for a demanded canal (V06 §3.12) |
| `works.partStartAt` | `roofed` | a part programme's next part starts when the previous part reaches this stage (V06 §3.13) |
| `chronicle.declineShare` · `chronicle.regrowthShare` · `chronicle.significanceMin` | 0.10 · 0.10 · 0.6 | a district's household fall or reoccupation per epoch that earns a chronicle line; the significance (item 72) from which a single use's opening, closing or move is its own line (V06 §3.15.1) |
| `overflow.tentBeltM` | 60 | the depth of the edge belt the overflow ladder's last rung pitches on (V06 §3.6) |
| `history.checkpointStride` | 10 | a history keyframe every this many epochs (V06 §3.15.2); the output never depends on it |
| `advance.maxEpochs` | 200 | the most epochs one `advance` expands to; above it the cadence bends (V06 §3.3.2) |
| `decline.turnoverVacancy` | poorest band 0.05 · every other band 0.01 · 0 in the parity presets | the share of each band's dwellings regrowth tier (1) leaves vacant, so a steady town keeps some abandoned stock (V06 §3.8.2) |
| `uses.splitHysteresis` | 0.10 | a split pair merges back only when its split index falls below its class's compiled `profile.split.threshold` (V11 §2.3; V11 §3.7.4's `siting.web.splitThreshold` the default for a class without its own, V11 §3.5.2) minus this (V06 §3.9.10 (3)) |
| `raise.fireBuildings` · `raise.floodShare` · `raise.minHa` · `raise.chance` | 60 · 0.3 · 1 · 0.3 | a burnt connected region of at least this many buildings, or a flood whose collapse share exceeds this over at least this area, raises the ground at this chance (V06 §3.11.6) |
| `excavate.reachM` · `excavate.chancePerYear` | 60 · 0.05 | a sealed cavern or ruin cluster within this of an accessible element may be excavated on demand at this chance (V06 §3.18.1 (5)) |
| `catacomb.primaryHysteresis` | 0.10 | another cemetery becomes the primary only when its served burials exceed the primary's by this share (V06 §3.18.2 (3a)) |
| `calamities` | V06 §2.4's calamity rows | the dossier's calamities as hazard events (V06 §3.11.1; DR28) |
| `spring.droughtLoss` · `spring.overdrawLoss` · `spring.recoverPerYear` | 0.08 · 0.10 · 0.05 | a spring's `flow` lost per drought year, lost per year per unit of over-draw, regained per year when neither acts (V06 §3.12.1; item 111 (b)) |
| `spring.fullHouseholds` | 400 | the households a spring at full flow supplies inside its pull radius; more draw than `flow` × this is over-draw (V06 §3.12.1) |
| `spring.floorFlow` · `spring.failFlow` · `spring.regrowFlow` | 0.05 · 0.25 · 0.5 | the least flow a spring keeps (a seep); below the second a spring has failed (its gardens and grove wither, its quarters may decline); at or above the third they grow back (V06 §3.12.1) |
| `spring.witherAfterYears` · `spring.dryAfterYears` | [3, 8] · [20, 50] | drawn once per garden face or grove row when its spring falls below `failFlow`; drawn once per spring at flow 0: the pond dries to a hollow (V06 §3.12.1) |
| `replay.maxEpochs` | 60 | the most coarse epochs one history replay at generation runs; above it the epoch length bends (V06 §3.20.2) |

**Not calibratable** (J-V6.111). Twelve columns and one row set carry `calibratable: false` in their `ColumnSpec` (V11 §2.1), so V12
§3.11's lint asks no register entry of them and no run may name them (V12 §3.7.2 (1)): the cost and recording bounds
`advance.maxEpochs`, `replay.maxEpochs`, `history.checkpointStride`, `uses.openCandidates`, `uses.moveWhyRows` and the `chronicle.*` shares
(they shape the non-canonical report, never the model); the rules `growth.crowdBands`, `streets.classes`,
`uses.closeSurplusBy` and `works.partStartAt` (a band set, a class set, an order and a stage, not quantities); and the
`calamities` rows, a mapping of the dossier's calamities (item 20: a derivation rule, as V11 §3.1 holds every `dossier.*`
column). Every other column is calibratable, its register entry as V06 §8 lists it.

`retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM` and `aqueduct.disuseAfterYears` are V11 §3.18's
cells, read there by V06 §3.19.2 and V06 §3.19.4; so are the item-113 cells and event-to-epoch rows the replay reads
(V06 §3.20) and the item-111 climate rows (water-pull weights, the oasis rows).

The history store's memory and the frames kept in memory are per-device app settings (V09 §9's *History* settings),
outside the recipe, the log and every digest: they change what is cached, never what is drawn.

### 2.3 The trajectory and the `advance` event

```ts
interface Trajectory {   // a standalone future: expanded by `advance` into dated epochs (V06 §3.3.2)
  spanYears: number /* > 0; the epochs cover (the document's week, + spanYears × 52] */; cadenceWeeks?: number /* default evolution.cadenceWeeks */;
  population: { kind: 'rate'; perYear: number /* signed: 0.01 = +1 % a year */ }
    | { kind: 'target'; target: number; shape: 'linear'|'logistic' /* default logistic */ }
    | { kind: 'points'; points: { week: number; population: number }[] /* piecewise linear */ };
  wealthLevel?: { kind: 'hold' } | { kind: 'target'; target: number } /* default hold */;
  slice?: Partial<CircumstanceSlice> /* circumstance changes applied from the first epoch (a new threat, a new era row) */;
  events?: { week: number; kind: string /* a HazardRow kind */; params?: Record<string, number> }[] }
// the request (the tool API and T1's time card; item 458) — not a log event: it APPENDS `epoch` events, one per cadence step, in one `group`
interface AdvanceRequest { trajectory: Trajectory; from?: 'now' | { founding: number /* re-create at this population, then advance: the "grow from a founding" macro (V06 §3.3.3); in the creation flow it applies to the new document; on an existing document it bends (J-VI.4) to "Start a new town small" — a new document created at the founding population under this recipe and advanced, the present one untouched, the dry run naming the bend in one line */ } }
// on §4.11's EpochInputs (item 343; this is the fields' one statement): wealthLevel?: number /* 0–1: the epoch's town wealth level — the dossier's word by DR6, or the trajectory's (V06 §3.3) */;
//   advance?: { group: string; index: number; of: number /* the planned count */; stoppedAt?: number /* on the group's last epoch only, when Stop ended it early: the count actually folded */; trajectory?: Trajectory /* index 0 only */ } /* provenance on each epoch an `advance` appends */
```

**The shapes the time card and the clerk offer** (V09's card, V10's `advance`), mapped to the trajectory:

| shape | trajectory |
|---|---|
| `grow` (by a share over the span) | `rate`, `perYear = (1 + share)^(1 ÷ spanYears) − 1` through `dmath.pow` |
| `reach` (a population) | `target`, `logistic` |
| `decline` (by a share, or to a population) | `rate` with the negative share mapped as for `grow`, or `target` below the present population, `logistic` |
| `hold` | `rate`, `perYear` 0 |
| `timeline` | `points`, through the circumstance entries beyond the document's week (V06 §3.3.4) |

The clerk's three variations of a `target` change are the logistic, the linear and the **front-loaded** shape — a `rate`
trajectory with `perYear = (T ÷ P0)^(1 ÷ spanYears) − 1` through `dmath.pow`, which reaches the same `T` at the span's
end with most of its absolute change late for growth and early for decline. The card's "more" pane and the clerk's
`advance` accept `trajectory.slice`'s threat (0–1) and era row.

`advance` is refused on a dossier-bound document — the dossier-clock case of item 101 R2's refusals: the host's clock owns
its time (§4.11 *The clock*; J-V6.2). The refusal offers its alternative: "Make a what-if copy and advance it" (`forkAt` at
the head, detached, V06 §4.4). On a standalone neighbourhood document it bends (V06 §4.1).

### 2.4 Hazard rows

```ts
interface HazardRow { kind: string /* 'fire', 'flood', 'collapse', 'drought' … data */; operator: 'burn'|'inundate'|'topple'|'none' /* none: a kind the hazards phase never strikes, read by another step */;
  params: Record<string, number> /* the operator's defaults; an event's params override them */;
  spontaneous?: { perYear: number /* the base rate of the spontaneous draw */; mode: 'minor'|'full' /* the lowest evolution.hazards setting that admits it */ } }
```

Default rows (our own; historically attested kinds, rates calibratable): `fire` — `burn`, spontaneous `minor`, V06
§3.11.2's parameters; `flood` — `inundate`, spontaneous `full` only on a river or coast town, `perYear` 0.02; `collapse` —
`topple`, event-only; `drought` — `none`, event-only, `params.years` its length (default 1), read by the spring row (V06 §3.12.1) and never
struck. An unknown kind is reported and ignored (V06 §3.17).

**The calamity table** (`tables/evolution.json#calamities`; DR28, item 388; this volume owns it — the port only carries
the dossier's calamity records into `EpochInputs.events` as `{ week, kind: 'calamity', calamity: CalamityRef }`, the
entry shape item 573 gives the base's `EpochInputs.events`):

```ts
interface CalamityRow { id: string; words: string[] /* matched, case-folded, against the calamity's name and type words */;
  hazard: 'fire'|'flood'|'collapse'|null /* null: no hazard — its effect is the population and the conditions the dossier reports */;
  maxBuildings?: Record<'minor'|'moderate'|'major'|'catastrophic', number> /* the burn's cap or the topple's count by the calamity's severity band */ }
// CalamityRef (the entry's `calamity`) is §4.11's (item 573): its `deaths` add to the cemeteries' burials of the epoch at its week (V06 §3.18.2 (3))
```

| row | words (any) | hazard | `maxBuildings` minor · moderate · major · catastrophic |
|---|---|---|---|
| `fire` | fire, blaze, conflagration, burning | `fire` (`burn`) | 6 · 40 · 150 · 400 |
| `flood` | flood, inundation, deluge, storm surge | `flood` (`inundate`; the severity scales `depthCm` × 1, 1.5, 2, 3) | — |
| `collapse` | collapse, earthquake, quake, subsidence, landslide | `collapse` (`topple`; the count) | 1 · 3 · 8 · 20 |
| `none` | plague, pestilence, famine, war, siege, raid, riot, unrest, drought | null | — |

The rows' provenance is SettlementForge's calamity names and types (`research/sf/dossier-generation.md`, the calamity row,
read-only; the words are ours); a calamity that matches no row is reported (`calamityUnmapped`) and changes nothing but
what its dossier facts change. The **place** of a mapped calamity is the centroid of its targets' sites (their uses'
buildings), else the town's centre; its week is the calamity's tick mapped to a week by DR21 (§4.11 *The clock*).

### 2.5 `MutationPlan` — a designation change spread over epochs (item 18 (c))

```ts
interface MutationPlan { id: Id /* address: an epoch's plan keyed from its plot's lineage with the epoch's week as creation index; a hand plan the creating event's seq and ordinal (§6.3) */;
  plot: Id; building: Id; from: Designation; to: Designation /* §4.7 S11 */; direction: 'up'|'down'|'level' /* the target template's size budget against the present */;
  record: { seq: number; index: number } /* the MutationRecord (§4.7 S11) computed once at creation: the causing event's EditBase.mutations[index] */;
  steps: { step: 'occupy'|'adapt'|'extend'|'rebuild'; dueWeek: number; done?: number /* the seq of the event that applied it */ }[];
  opensAt: 'occupy'|'adapt'|'extend'|'rebuild' /* the step at whose application the use opens: occupy when the present design is compatible, else the first step whose result is (item 266; V06 §3.10.1) */;
  crypt?: true /* the target is an always-crypt class (V11's cathedral and great-temple rows): the occupy step carries the crypt (V06 §3.18.3 (1)) */;
  expect: Hash64 /* the building's leaf digest after the last applied step: a step applies the stored record only while it still holds (V06 §3.10) */;
  cause: EditRef | RuleRef; lifecycle: Lifecycle }   // model data; registry kind 'mutationPlan' (item 264); tombstoned when its last step is done, its plot re-derived, or deleted
```

### 2.6 `BuildingShadeMask` — the buildings' share of the daylight driver at an epoch (item 102 (b), (e))

```ts
interface BuildingShadeMask { arena: Id /* the ground arena, or an island's arena (V05): one mask per arena */; epoch: number; week: number /* the epoch that wrote it */;
  sampler: Hash64 /* digest of item 102's sampler — its sun positions and per-cell sample points (§4.5, §8.4's path sun) — so a table change that moves the sampler invalidates the mask */;
  grid: { cells: number; cols: number } /* §4.5's 32 m field grid */; bits: number /* per cell: sample points × sun positions */;
  mask: Uint8Array /* per cell, row-major, `bits` bits: 1 = that sample point is in a building's shadow at that sun position */ }   // model data in the `fields` chunk (§2.9), written only by the field phase of an epoch (item 275); absent before the first epoch
// on an island arena the grid is the island's own 32 m lattice (V05) and the mask is OR-ed into V05's `shadeSky` receivers
// a mask whose `sampler` differs from the current sampler reads as zero building shade until the next epoch rewrites it (V06 §3.4 (5))
```

### 2.7 `Enceinte.pathway` and `Enceinte.underuseSince` — a ring's road out of use (item 254)

Both fields are declared on §2.7's `Enceinte` (item 254), which states what each holds; their rules are these. `fate` is
drawn once (V06 §3.7.2), `keep` while threat ≥ `walls.keepThreat`; `eligibleWeek` is the drawn week from which the final
conversion may fire; a fate or week whose `source` is `edit` (a hand `setAttr` fixed it) the engine never redraws.
`underuseSince` reads V06 §2.2's `contract.occupiedShareMax` and is written by the fortification phase only (V06 §3.7.4).

### 2.8 The new conversion kinds and `Way.formerClass` (item 209)

```ts
type EvolveOp =   // item 209: this volume's conversion kinds, in ConversionOp's union (§4.11; §7.1's convert carries them); each a lifecycle change with its cause, an undo record, a hand form through `convert` (§7.1)
  | { op: 'absorbWall'; enceinte: Id /* the chain's `wall` role rows are removed (§2.2's registry); its strips re-join the blocks beside them and S10's incremental re-cut writes `plot_line` rows, keyed to their plots, where plots meet the old line; the Enceinte takes existence `cleared` (cause `convert:absorbWall`) and keeps its name in its record; its remaining runs keep their `condition` (item 575), dismantled on by V06 §3.7.2 (2), its towers and gates following them — a tower or a gate carries no state of its own and is never a pool candidate */ }
  | { op: 'downgradeWay'; way: Id; to: 'path'|'track' /* class lowered, formerClass written; the line persists */ }
  | { op: 'upgradeWay'; way: Id /* back to formerClass, which is cleared */ }
  | { op: 'burn'; buildings: Id[] /* existence → 'decayed' with Works kind 'decay', stage CHARRED (§4.11 Works (4)'s fire row); households and uses relocated first */ }
  | { op: 'repairWall'; enceinte: Id; stretch?: StretchRef /* with a stretch: a `breached` run of the ring's `condition` back to `standing` (item 575) — no Works (J-V6.31, J-V6.90: the base's `Works.target` is a building or plots), the change drawn at its effective week (V06 §3.15.2), and the run's towers and gates, which carry no state of their own, stand again with it (item 575 draws them by their run); the record's lifecycle returns to its former state when every run is `standing`; on a `dismantled` run it bends (J-VI.4): its stone is gone, so a new stretch is drawn on its line through `drawWall` ("its stone is gone; a new stretch is built here"). With no stretch ("back in use"): the ring's latest `neglect` not yet lifted is lifted — its existence back to the state before that `neglect` (read from the ring's lifecycle block — the existence recorded before the neglect event, the value that event's undo record holds, so it is found after the undo record is gone) when every run is `standing`, else `decayed` (item 575's rule while a run is not standing); issued by the engine in the batch that clears a pathway (V06 §3.7.5, cause `rule:threat`), and by hand, where it also clears the ring's pathway whatever its cause (`supersededBy` untouched); on a ring with no neglect to lift it is a no-op with its line ("this wall is in use"; nothing changes) — never a refusal (item 101 R2) */ }
  | { op: 'retypeLand'; landUse: Id; to: LandUse['kind']; crop?: string; rotation?: { scheme: string; slot: number } /* the hinterland's fallow ladder and its reversal (V06 §3.5.3), the village's furlongs to pasture (V07 §3.12) and the village's fair field over hinterland faces turned `commons` (V07 §3.12 (a), in the `dossier` step's product placement or V07's siting step (m)), and a withered oasis garden (V06 §3.12.1) — one op for all (item 209, absorbing V07's request); the face and its owner kept */ }
  | { op: 'repairRaised'; target: { raised: Id; span?: SpanRef /* a ruined span back to standing, with each ruined support at its ends (a support a topple or a landfall ruined), or, with no span, an abandoned raised way back to in use (V06 §3.19.2 (5)); on a dismantled span or a cleared support a hand repair bends (J-VI.4) to a new raised part on the way's line through the base's hand operator ("rebuilt as a new span"); the engine never repairs one (V06 §3.19.1 (3)) */ }
      | { deck: Id /* item 246's Plot.deck.host — a Bridge id for a bridge deck, a pier or quay way's id for a mole, pier or quay platform: a ruined or decayed deck back in use, the host's former existence restored from the striking op's undo record; its deck faces are then offered at regrowth tier (5) (V06 §3.19.5 (4)) */ } }
  | { op: 'repairRetaining'; retaining: Id; stretch?: StretchRef /* a decayed stretch of a retaining wall back to standing, or, with no stretch, every decayed stretch of it (V06 §3.19.4 (6)); a ruined stretch — its stone gone — is not restored: an epoch's re-levelling lays a new stretch on its line, and a hand repair bends to a new drawn stretch on its line through the base's retaining-wall drawing (T3 `wall`, `retaining` kind; J-VI.4) */ };
```

`Way.formerClass` is §2.4's (item 209): the class `downgradeWay` (or V05's landfall) lowered, which `upgradeWay` restores.

The oxbow a course shift leaves is part of `shiftCourse` itself (item 206), not an op of its own.

### 2.9 `Use.strain` — the use step's memory (item 429)

```ts
// on §2.7's Use (item 429; the field's one statement and its rules)
strain?: { kind: 'demand'|'supply'; sinceWeek: number /* the epoch week the condition began */ }   // written by the use phase only; cleared when the condition ends; model data
```

### 2.10 The epoch report and the chronicle (non-canonical, rebuilt by replay)

```ts
interface EpochReport { epoch: number; seq: number; week: number; years: number;
  phases: { step: EpochStep; participant?: string; ops: number; waited: number; blocked: number; ms: number }[];
  households: { arrived: number; left: number; relocated: number; crowded: number; overflow: number /* housed by the overflow ladder's rungs (ii)–(iii) */ };
  buildings: Record<'built'|'extended'|'repaired'|'vacated'|'decayed'|'ruined'|'cleared'|'reused'|'burned'|'demolished', number>;
  plots: { joined: number; split: number; toGarden: number; gardensReused: number }; ways: { downgraded: number; upgraded: number; primaries: number;
    retired: number; effaced: number; reopened: number /* retireWay, effaceWay and reopenWay — tier (5′) and the placement rule (V06 §3.5.2, V06 §3.8.2) */ };
  passages: { sealed: number; reopened: number };
  walls: { circuits: number; gatesOpened: number; stretchesDismantled: number; converted: number; contracted: number;
    waterfront: number /* quay walls raised or neglected */; harbourChains: number; waited: number /* traces that could not keep water access or a raised way's continuity */; gatedByDossier: number;
    suppressedHeld: number /* removed generated quay walls and harbour chains whose condition still holds (V06 §3.7.6 (3)) */;
    repairedInUse: number /* breached runs repaired on a ring with no pathway (V06 §3.7.5) */;
    backInUse: number /* neglects lifted by the no-stretch repairWall in the batch that clears a pathway (V06 §3.7.5) */ };
  uses: { opened: number; closed: number; relocated: number; heldByPin: number; heldByProtection: number; rebound: number /* links re-bound */;
    relaxMoves: number; splits: number; merges: number; ladderRebound: number; moves: UseMove[] /* every opening, move and closing of the epoch, address order — derived from the lifecycle block's why rows (V06 §3.9.7) */ };
  households: { underground: number /* seated by the crowding hook */; voidDwellers: number /* relocated into F6's new void dwellings (V06 §3.18.1 (4)) */;
    undergroundVacated: number /* vacated by under.undercity's re-read or a foundation collapse and re-housed inside the participant (V06 §3.18.1 (4), (6)) */;
    backlog: number /* housed by the overflow ladder at the epoch's end */; inTransit: 0 /* always 0 at the close; asserted */ };
  under: { accesses: number; links: number; excavated: number; voidsSettled: number; voidsVacated: number; featureOn?: 'sewers';
    collapsedByFoundation: number /* older void elements a new footing, pier or basement filled (V06 §3.18.1 (6)) */; maintenance: boolean /* a village rung's maintenance mode held the inherited systems */ };
  catacombs: { founded: number; grownM2: number; stagnant: { complex: Id; blockedBy: string[]; fillRise: number }[]; aboveCount: number };
  crypts: { dug: number; capped: number; joined: number; authorExempt: number };
  shade: { cellsRecomputed: number; meanBuildingShade: number; samplerStale: boolean;
    surfacesRelaid: number /* ways whose surface the field phase re-laid by V01 §3.7.3 (V06 §3.4 (9)) */; surfacesHeld: number /* candidates kept by an edited surface */ };
  raised: { founded: number; repaired: number; spansFallen: number; ranDry: number; waited: number /* admitted candidates with no course — none found, or one item 244's support step dropped as `raised_too_tall` (V06 §3.19 (5)) — or whose caps could not pay */;
    aboveCap: number /* kinds whose count stands above the rung's cap (V06 §3.19.1) */; suppressedHeld: number /* live reasons a removal suppresses */; disused: number;
    suppressedFired: { removal: number /* the seq of the live removal (the delete) whose suppress.key is the key */; week: number /* that removal's week */ }[]
      /* one entry per suppressed key whose reading is met and whose gate passes this epoch — where the city would have founded it — in removal order;
         none for a key a re-add serves; read by V09 §4.10's epoch row lines and V08 §4.6 item 3 (V06 §3.19.3 (2)) */ };
  retaining: { created: number; rederived: number; buried: number /* tombstoned under a raiseGrade */; slumped: number; restored: number /* decayed stretches restored, ruined ones replaced (V06 §3.19.4 (6)) */; suppressedHeld: number };
  decks: { offered: number; struck: number; repaired: number; suppressedHeld: number /* deck slots a live removal holds empty */ };
  springs: { weakened: number; failed: number; recovered: number; dried: number; gardensWithered: number; groveWithered: number } /* item 111 (b): V06 §3.12.1 */;
  replay?: { r: number; of: number /* this coarse epoch and the replay's count R */; events: number /* the history events mapped to it */;
    unmapped: string[] /* event types with no V11 row, reported and ignored (V06 §3.20.3) */; destroyed: boolean; refounded: boolean; buried: Id[] /* buried systems laid this epoch */ } /* present only on a replay epoch (V06 §3.20) */;
  landfall: { membersCleared: number /* every member that left a decoration this epoch, by any op */; ways: number; walls: number; plots: number;
    raised: number /* span and support members that left by repairRaised or dismantle */; decorationsCleared: number; quarriesToCommons: number;
    accessesReopened: number /* bricked accesses returned with their host */ } /* V06 §3.5.2's landfall candidate */;
  chronicle: ChronicleEntry[] }   // §5.4's per-event report gains this section (item 339)
interface UseMove { use: Id; op: 'open'|'relocate'|'close'; from?: Id; to?: Id /* plots */;
  cause: 'demand'|'strain'|'surplus'|'coverage'|'chain'|'revision'|'dossier'|'displaced'|'split'|'merge'|'relax'|'ladder'|'fire';
  why: WhyRow[] /* = the lifecycle event's detail.why (item 265), the top uses.moveWhyRows, descending */ }
type WhyRow = NonNullable<LifecycleEvent['detail']>['why'][number]   // §2.8's row (item 265): `row` — the RelationRule, family, coverage,
  // supply-edge, link or signature-pair row (V11's ids), a V06 table row for a circuit, or V11's raisedWays row for a raised way; `family` —
  // 'link' for a supply-web link (item 105 (j)), 'reason', 'condition' or 'gate' for a raised way (V06 §3.19 (8)), 'water' for a failing spring's pull (V06 §3.12.1);
  // `share` — its share of the winning score, or the condition's value; `good`, `other` — a link row's good and the use at its other end
type ChronicleKind = 'stage'|'circuit'|'wallFate'|'wallManned'|'gateOpened'|'contraction'|'fire'|'flood'|'topple'|'decline'|'regrowth'
  |'redevelopment'|'useOpened'|'useClosed'|'useMoved'|'mutation'|'terrain'|'island'|'underground'|'dossier'|'rename'
  |'waterfront'|'harbourChain'|'split'|'merge'|'ladder'
  |'accessOpened'|'voidSealed'|'excavated'|'voidSettled'|'voidVacated'
  |'catacombFounded'|'catacombStagnant'|'catacombResumed'|'catacombsAboveCount'|'cryptDug'|'cryptCapped'|'cryptJoined'
  |'raisedWay'|'retainingSlump'|'deck'|'landfallCleared'
  |'springFailed'|'springRecovered'|'springDried' /* item 111 (b) */|'destroyed'|'refounded'|'buried' /* item 113's replay */;
interface ChronicleEntry { week: number; epoch: number; kind: ChronicleKind; district?: Id; subjects: Id[] /* ≤ 16, address order */;
  count: number; row: string /* its template row (V06 §5.2) */; cause: EditRef | RuleRef }
// LifecycleEvent.detail.why is §2.8's (item 265): ≤ uses.moveWhyRows (5) rows, written by the use phase on its `open`, `relocate` and
// `close` events, by the growth phase on a circuit's creation event (V06 §3.7.1), by the raisedWays step on a raised way's creation
// event (V06 §3.19 (8)) and by the terrainWater step on a spring's failing or recovering `setAttr` (V06 §3.12.1)
```

The report and the chronicle stay non-canonical (rebuilt by replay; kept across a rebase, V06 §3.15.5); the **why rows are
not**: they live on the lifecycle events, so an answer survives a save, a load, a rebase and an export, and the report's
`UseMove` rows are read back from them.

### 2.11 The history index, frames and diffs (derived and non-canonical)

```ts
interface HistoryIndex {   // derived from the log at load and after every fold; never persisted
  creationWeek: number; currentWeek: number /* §4.11's document week */; baseSeq?: number; baseWeek?: number /* a rebased document's Base (§2.9): no frame exists before it (V06 §3.15.5) */;
  epochs: { epoch: number; seq: number; week: number; from: number /* prevWeek */; replay?: true /* a coarse epoch of the history replay at generation (V06 §3.20): the creation prefix, read-only on the timeline */ }[];
  dated: { seq: number; week: number; kind: string }[] /* dossier events with a week, scheduled hand Works (startWorks) */ }
interface HistoryFrame {   // in memory only (the generation worker), evicted LRU at the device's frame setting (8)
  epoch: number; seq: number /* the frame is the model after this epoch event */; chunks: ChunkRef[] /* copy-on-write over the session's arenas (§7.4's checkpoints) */;
  works: Id[] /* the Works that epoch created, all of them — the frame never retires its own (item 321) */; bytes: number }
interface HistoryImage { seq: number /* the event it belongs to — an epoch or any event between epochs */; before: Uint8Array; after: Uint8Array /* the event's touched set's records and faces before and after it, in the document codec (§2.9), compressed */; bytes: number }
interface HistoryStore {   // non-canonical, in the generation worker; spills past the device's store setting to the app's disk cache keyed by the document id and the event's seq; dropped whenever convenient, rebuilt by the verification replay
  images: Map<number, HistoryImage>; keyframes: Map<number /* epoch */, ChunkRef[]> /* every history.checkpointStride-th epoch: copy-on-write over the arenas, as §7.4's checkpoints */ }
interface HistoryDiff { fromWeek: number; toWeek: number; added: Id[]; removed: Id[]; changed: { id: Id; kinds: LifecycleEvent['kind'][] }[] }   // derived from the lifecycle block between the two weeks' log positions
// derived, never stored (V06 §3.15.2): the week from which a change without a Works is drawn
type EffectiveWeek = (change: LifecycleEvent) => number /* an engine op: its epoch's week (it shows at the end of the span); a dated dossier change: its own week; a hand edit: its event's week */
```

### 2.12 Lifecycle of every new state (create · read · persist · regenerate · undo · migrate)

| state | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MutationPlan` | the use phase's openings and relocations, a hand `mutate … spread: 'epochs'` | the ladder phase's mutation step; descriptions; the clerk | model data, entities chunk | a re-derivation of its plot tombstones it (cause `rederive`), reported | the creating event's undo removes it; a step's undo restores `done` and the building | absent before V06: none to migrate |
| `BuildingShadeMask` (one per arena) | the field phase of every epoch | §4.5's daylight driver at every field evaluation after that epoch, load included; V05's `shadeSky` on an island | model data, `fields` chunk | kept: Regenerate and brushes never rewrite it (the field re-derives from it) | the epoch's undo restores the former mask | a sampler digest mismatch (a table upgrade or an `editTable`) — the mask reads as zero building shade until the next epoch rewrites it whole, and the edit's dry run says so; absent = zero shade from buildings |
| `Enceinte.pathway` | the growth phase (superseded), the fortification phase (neglected), `contractWall` (contracted), `setAttr`; cleared by V06 §3.7.5's renewed threat and by a hand no-stretch `repairWall` | the fortification phase; §8.2's wall rows; exports | model data | kept (an enceinte is re-derived only by S7's operator, which carries it) | restored by the writing event's undo | absent = no pathway |
| `Way.formerClass` | `downgradeWay`; V05's `fallIsland` (a covered way dropped to `track`, V05 §3.16 (4); a way already carrying one keeps it) | `upgradeWay`, regrowth tier (5′), the landfall clearance (V06 §3.5.2), exports | model data | kept | the writing event's undo restores the prior value (absent where that event wrote the first) | absent |
| `Way.surface` — V01's field (V01 §2.7; item 207), this volume one of its epoch writers | at an epoch: the `field` phase's re-lay (V06 §3.4 (9): a `setAttr`, author `engine`, cause `rule:field`, on a candidate whose rule value changed) and the landfall clearance's pair (V06 §3.5.2) | S14's road programs (V01 §5.1.2), the reader, exports | model data (V01's) | V01's: a re-derivation re-runs V01 §3.7.3 at S10a's end, an edited `surface` kept | the epoch's undo record restores the prior value | V01's (absent → the rule's value at load) |
| `Use.strain` | the use phase | the use phase | model data | kept | restored by the epoch's undo | absent |
| `EpochReport`, `ChronicleEntry` | every epoch | the history panel, the clerk, `chronicle.csv` | non-canonical report block (§5.4) | rebuilt by replay | removed with the epoch | rebuilt |
| `HistoryIndex` | load and every fold | the timeline bar, `locate` | never | — | recomputed | — |
| `HistoryFrame` | a scrub outside the retain window, the APNG export | the renderer, then-and-now | never (memory) | dropped | dropped when its epoch is undone | dropped |
| `HistoryStore` images and keyframes | every committed event's commit (images); every `history.checkpointStride`-th epoch (keyframes); the verification replay after a load | `locate` and the frame builder (V06 §3.15.2) | memory, spilled to the app's disk cache — never in the document | rebuilt by replay | an undone event's image is dropped with it | dropped (a new output version replays) |
| `Enceinte.underuseSince` | the fortification phase | the contraction trigger | model data | kept; cleared by any hand change to the ring's trace (`drawWall`, `contractWall`, a `convert` on it) and re-derived at the next epoch | restored by the epoch's undo | absent = not under-used |
| an enceinte's condition by run (item 575's `Enceinte.condition`: §2.2 rule 5's stretch-state profile, values `standing` · `breached` · `dismantled`, knot role `wall_state_knot`) | `breach` (V06 §3.7.3's neglect and a contracted ring's decay → `breached`), `dismantle` (V06 §3.7.2 (2) → `dismantled`), V05's landfall (→ `breached`, V05 §3.16 (4)) and `repairWall` (→ `standing`, V06 §3.7.5), each over its `StretchRef` (the whole trace when it names none) | V06 §3.7.5's repair (the `breached` runs, in chain order, of a pathway ring and of a ring in use), the pathway's clearing and end (V06 §3.7.2 (3)), the no-stretch `repairWall`'s existence test (every run `standing` or not), V06 §3.7.2 (2)'s candidates (a stretch under a standing raised gate kept), the towers and gates drawn by their run, T-V6-6's wall struck share, the renderer's gap glyph and trace discs (§8.2's `decayed` row), §11.1's per-run LineStrings, the `enceinte` provider and the clerk | model data on the `Enceinte` record | §2.2 rule 5's carry | §2.2 rule 5's undo; `repairWall`'s undo also restores the record's former lifecycle | absent = `standing` throughout |
| an `advance` request's epochs | T1's time card, the clerk, the CLI — appended one `epoch` event at a time in one `group` | the fold | log (the epochs, each with `EpochInputs.advance`; `stoppedAt` on a stopped group's last) | — | one step while the last is the latest live event, by V06 §4.1's rule (in this session, after a reload, and in a shared document) | the epochs replay like any (§7.5); nothing is re-expanded |
| the history replay's coarse epochs (item 113) | §4.11's history-first generation: one `epoch` event per coarse epoch, flag `creation` (V06 §3.20) | the fold; the timeline bar's past range; the replay record | log (the creation prefix, each with `EpochInputs.replay`, V06 §2.14) | a regeneration of the document re-runs generation and its replay from the seed and the history | never an undo target (§7.4's creation rule) | the epochs replay like any (§7.5) |
| `HistoryRecord` (§2.7; item 113) | the replay's end (V06 §3.20.6): once per document | V10's story, the reader, §7.7's history rows, the timeline bar's past range, `chronicle.csv`, the GeoJSON document properties | model data in the digest (§2.7) | re-written by a regeneration's replay | with the creation (never an undo target) | absent: no replay ran |
| a spring's `flow` over epochs (`WaterBody.spring.flow`, §2.3; item 111) | the `terrainWater` step's spring row (V06 §3.12.1); a hand `setAttr` of `flow` (T2 `ground`) | the water pull and the prosperity water term (§4.2 S3 (6), §4.4, §4.5) at every later field evaluation; the spring row; V10's why | model data (§2.3) | kept (the field and the pull re-derive from it) | the writing event's undo | absent `spring`: no spring; S1 writes `flow` 1 |
| `Household.transit` | the displacing batch (the ledger's `displace`) | `siting`; the occupancy readers (§10.3) | never: empty at every epoch's end | — | the epoch's record | absent |
| `EpochOps.displaced`, `EpochOps.demandTaken`, the ledger | any phase or participant | the runner, `siting` | inside the epoch event only | recomputed by a replay of the epoch | the epoch event's undo | — |
| `LifecycleEvent.detail.why` | the use phase's `open`, `relocate`, `close`; a circuit's creation; a generated raised way's creation (V06 §3.19 (8)) | V06's `WhyProvider`s, V10 (its raised-way provider included), V09's panel, the report, `uses-history.csv`, the raised way's GeoJSON `plat:why` | model data, identity layer | kept with its lifecycle event | removed with its event | absent: no rows — the `use` provider answers from the present placement, marked "reason not recorded" |
| `MutationPlan.opensAt`, `.crypt` | at the plan's creation | the ladder phase; the crypt's re-derivation at the occupy step | with the plan | with the plan | with the plan | absent: `opensAt` = `occupy`, no crypt flag |
| a building's crypt over epochs (V03's `Basement.crypt`, laid by V02's crypt ladder; its lifecycle row is V03 §3.7.2's) | at an epoch, the op that gives a building an always-crypt class (a plan's occupy step, a dossier re-designation, a REPLACEMENT) | V03 §3.7.2 | V03 §3.7.2 (the rank's trim re-derived inside each causing event) | V03 §3.7.2; a trim never shortens `Basement.ring` (V06 §3.18.3 (3)) | the event's record | V03 §3.7.2 |
| the crypt join's access | `under.extend` when catacomb growth reaches beneath a crypt | V04's excavation reading (transitive access); the chronicle | V04's `AccessPoint` (source `crypt`), its `AccessCause.event` the epoch's seq | kept; the pair's draw never re-drawn | the event's record | V04's rule |
| a catacomb's extent over epochs (V04's `CatacombComplex`) | V04's record | `under.extend` | V04's record | never below `extentFloorM2` (V06 §3.18.2 (4)) | the event's record | V04's rule |
| `EffectiveWeek` | derived from a change's lifecycle event | the frame builder, the scrubber, exports | never | — | — | — |
| `ProductDecl.phases`, `.participants`, `.rows` | a product's registration | the runner; the decline and hinterland steps (`rows`) | code; the rows a versioned table in the recipe's pins (§7.6) | — | — | an absent `rows`: the engine's own rules |
| the device's history settings (store MB, frames) | V09's settings panel | the history store, the frame cache | device storage | — | the setting's own | defaults |
| `EvolutionTable` rows, `evolution.*` params | shipped; `editTable`, `adjust` | every phase | tables in the recipe's pins and the log (§7.6) | an edit applies from the next epoch; standing history is never re-run (J-V6.28) | the edit's undo | §7.5's table migration |
| a suppression (`LifecycleEvent.detail.suppress`, item 260) | the `delete` of a generated raised way, harbour-mouth chain, quay wall, retaining wall (key: its chain's lineage address) or deck plot (key: its deck host's id and its slot ordinal along the deck) (V09 §4.3's delete, the clerk, the CLI) — written by the delete operator when the entity's lifecycle cause is a generation or epoch rule | `RaisedWayLedger` and the fortification phase's waterfront rule at every epoch; the retaining-wall re-derivation where an epoch levels (V06 §3.19.4 (1)) and tier (5)'s deck faces (V06 §3.19.5 (1)); generation's S4, S6, S10–S11 and a new stage's S5b (item 290); `rerunFrom`'s re-apply; V10's "removed by you" | model data, identity layer, on the delete's lifecycle event (in the log) | read again at every regeneration: the log's live removals are replayed with it, and the generator skips the key | lifted only by the delete's undo or a `forkAt` before the removal; **served** — never generated again, counted once — while the user's re-add stands, per kind as V06 §3.19.3 (3), (7) name the forms V09 §4.20.3 (4)'s Build it again emits (`drawWay { raised: true }`, `drawWall`, `placeGate`, `drawWall { kind: 'retaining' }`, `drawFootprint` on the deck), deleting the re-add leaving the removal in force | absent in an older document: no suppression exists |
| `RaisedWayLedger` | derived at each epoch's `raisedWays` step and at each generation | the pass and the generators; the report; V10 | never | re-derived | — | — |
| a reason key's uniform | the base's raised-way stream, keyed by the `RaisedReasonKey`, epoch component 0 (V06 §3.16) | the gate at every generation and epoch | never: re-drawn identically from its key | the same value | — | — |
| the raised way's `reason` and `underuseSince` (the base record's fields, item 290) | `reason`: the generating rule (generation or the pass); `underuseSince`: the pass when the lapse condition first holds, cleared when it ends | the pass (disuse, repair, the count); V10; exports (item 447's `reason` word and `underuseSince`, V06 §5.3) | model data | `reason` kept (it is the lineage); `underuseSince` kept, re-evaluated at the next epoch | restored by the writing event's undo | absent: a declared or pre-item-110 way (no reason), not under-used |
| a span's and a support's condition (`state`, item 291) | the pool's `breach` and `dismantle`, `topple`, `inundate`, the landfall (V05) | the pass's repair and count; V04's arch vaults; the renderer; item 447's span and support `state` | model data on the raised way record | kept | the op's undo | absent = standing |
| a retaining stretch's condition (item 245's `RetainingWall.state`: §2.2 rule 5's stretch-state profile, values `standing` · `decayed` · `ruined`, knot role `retaining_state_knot`; item 291's retaining member) | the pool's `breach` (slump → `decayed`) and `dismantle` (stone taken → `ruined`); V05's landfall (`decayed`); `repairRetaining` (→ `standing`, V06 §3.19.4 (6)), each over its `StretchRef` | the pool, the restoration rule (V06 §3.19.4 (6)), V04's foundations (a footing stands while the wall stands), the renderer's decayed and ruined rows, item 447's retaining `state` | model data on the `RetainingWall` record | §2.2 rule 5's carry: a re-derivation of a generated wall keeps its profile keyed by the wall's lineage, until the restoration re-derives it intact | §2.2 rule 5's undo; `repairRetaining`'s undo restores the former state | absent = standing |
| a deck's condition — its host's lifecycle existence (item 246's `Plot.deck.host`: a `Bridge` or a `pier` / `quay` way) | the pool's deck strike (`ruin` → `ruined`), a hazard (`breach` → `decayed`, `ruin` → `ruined`), V05's landfall (`ruined`) | V01's close-ups, V02's deck buildings (V02 §3.16 (7)), V05, the renderer's deck state rows, V06 §3.19.5 (1)'s tier (5), §5.3's exports | the host record's lifecycle (model data); `Bridge.state` (`site` \| `built`) untouched — a ruined bridge stays `built` in plan, its crossing closed by its way's existence | kept | the striking op's undo; `repairRaised`'s deck form restores the host's former existence from that op's undo record | absent (no deck entry in the host's lifecycle) = standing |
| `EpochScope.raised`, `.levelled`, `.recut`, `.workings` | derived from the epoch event's lifecycle entries so far | W64's reader list, per field (`under.extend`, `under.access`, `sky.clearance`, `hood.fabric`); volume 3 reads none — the levelling op re-cuts a stored plan beside the levelled faces inside the epoch event and an unstored one goes stale (V03's outside-ground row; item 263; T-V3-30) | never | recomputed by a replay of the epoch | — | — |

### 2.13 Item 110's epoch records — the reason key, the ledger and the suppression

```ts
type RaisedKind = 'viaduct'|'elevated'|'aqueduct';
interface RaisedReasonKey { kind: RaisedKind; a: Id; b?: Id }
  // viaduct: a = the carried way's lineage, b = the crossed ravine or valley feature (the terrain's lineage and the feature's ordinal in Terrain.features);
  // elevated: a, b = its two endpoints' lineages (a high ward's district, a terrace district, the citadel's or a great temple's reservation), in address order;
  // aqueduct: a = the settlement root, b = the source (a spring as S1 records it, or a river WaterBody's lineage).
  // Address: 'raisedReason:' + hash64(kind, a, b) (§6.3). It is also the generated raised way's derivation unit (V06 §3.16).
// SpanRef { raised; from; to } is §4.11's: the spans between two supports by support ordinal, a view resolved in its batch
interface RaisedCandidate { key: RaisedReasonKey; value: number /* the reading: the drop (m), the rise (m) or the need ratio */; threshold: number;
  strength: number /* metres saved − span × spanCostFactor; mean prosperity × landmark factor; the need ratio */; met: boolean;
  u?: number; p?: number /* the gate, when met */; outcome: 'admitted'|'repaired'|'standing'|'chance'|'cap'|'suppressed'|'noCourse'|'capsCannotPay'|'rung';
  /* 'suppressed': a key a live removal holds and no re-add serves — read and gated as any other, never admitted (V06 §3.19.3 (2)); a served key reads 'standing' */
  why: WhyRow[] /* the rows written on the creation event (V06 §3.19 (8)) */ }
interface RaisedWayLedger {   // derived, never persisted: at each epoch's raisedWays step and at each generation (item 290)
  rung: Rung; gate: boolean /* the rung admits generation: CITY or METROPOLIS (owner provenance) */;
  kinds: Record<RaisedKind, { cap: number /* V11's raisedWays row at the rung */;
    standing: Id[] /* generated raised ways that count: every generated way not released (V06 §3.19.1 (3)) */;
    declared: Id[] /* raised ways whose lifecycle cause is an edit or a skeleton file (the dossier declares none, V06 §3.19.1 (2)) */;
    suppressed: RaisedReasonKey[] /* the reasons the log's live removals suppress */;
    count: number /* standing + suppressed + declared (V06 §3.19.1) */; candidates: RaisedCandidate[] /* every key evaluated, admission order */ }>;
  total: { cap: number; count: number } }
// LifecycleEvent.detail.suppress and the one lift rule are §2.8's (item 260): `key` the suppressed generator key's address;
// `reason` (kind 'raised'); `enceinte`, `water` (a harbour chain: the basin whose mouth it closed; a quay wall: its waterfront arc's water);
// `chain` (retaining: the wall's chain lineage address); `host`, `slot` (deckPlot: the deck host's id and the plot's slot ordinal from the host's first end).
// Islands and sky accesses keep V05's record form (SkyIsland.removed, .removedAccesses) under the same lift rule — kept apart (E-02, §2.8)
```

The ledger is a pure function of the model and the log: its suppressed set is the `suppress` of every `delete` in the log
whose event is live (not undone), kind `raised` (the other kinds are read the same way by their own generators: the
waterfront rule, the levelling's walls and tier (5)'s deck faces); its counts read the standing raised ways' `reason` and lifecycle cause. It is exported by
the package that holds the base's raised-way generator (item 290) and called by the pass (V06 §3.19), by generation's S4
and S6 and by a new stage's S5b, so no generator can exceed a cap or re-found a suppressed reason on any path.

### 2.14 The history replay's plan (item 113)

```ts
interface ReplayPlan {   // derived at generation from HistoryHint (§2.7) by §7.7's DR36–DR38 (V06 §3.20.2); never persisted — HistoryRecord (§2.7) keeps what it played
  start: 'peak'|'founding'; startYearsAgo: number; startPopulation: number; startRung: Rung /* the generation S0–S13a runs at (§4.11 item 2) */;
  peak?: { rung: Rung; population: number; yearsAgo?: number /* absent: undated (V06 §3.20.2 (2)) */; symbolic: boolean; evidence: string[] } /* DR36 */;
  epochYears: number /* V11's history.epochYears, bent upward so the count stays ≤ replay.maxEpochs (V06 §3.20.2 (3)) */;
  epochs: ReplayEpoch[] /* r = 1 … R, oldest first; the last ends at the present (toYearsAgo 0) */ }
interface ReplayEpoch { r: number; fromYearsAgo: number; toYearsAgo: number;
  week: number /* the creation week − round(toYearsAgo × 52): a signed week, before the creation week (V06 §3.20.2 (4)) */;
  populationTarget: number /* V06 §3.20.2 (5) */; effects: ReplayEffect[] /* the span's mapped events, oldest first, ties by event index (V06 §3.20.3) */ }
type ReplayEffect =   // one per mapped history event; `event` indexes HistoryHint.events
  | { kind: 'hazard'; hazard: string /* a HazardRow kind (V06 §2.4) */; week: number; params?: Record<string, number>; event: number }
  | { kind: 'condition'; archetype: string /* a ConditionOverlay archetype: plague, famine, drought … */; fromWeek: number; untilWeek: number; severity: number; event: number }
  | { kind: 'slice'; slice: Partial<CircumstanceSlice>; wealthStep?: number /* signed change of the wealth level, clamped to [0, 1] */; week: number; event: number }
  | { kind: 'request'; cls: string /* a roster class the row asks for (a citadel, hostels) */; count: number; week: number; event: number }
  | { kind: 'population'; factor: number /* × the epoch's target: a dip where populationHistory gives no point in the span */; event: number }
  | { kind: 'destroy'; week: number; cause: string /* the lifecycle's terminal death, a catastrophic event, a "Fall of" event (DR38) */; event?: number }
  | { kind: 'refound'; week: number; rung: Rung; culture?: string /* the history's culture row for the new settlement */; event?: number };
// on §4.11's EpochInputs, a replay epoch's provenance (this volume's field, beside item 343's): replay?: { r: number; of: number; effects: ReplayEffect[] }
```

The plan is a pure function of the history and the tables pinned in the recipe, so a load recomputes it equal; the epochs it
appends carry it in `EpochInputs.replay` (each its own epoch's effects), so a replay of the log never re-plans.

## 3 Generation — the evolution engine

### 3.1 Where the engine runs: the epoch runner

An epoch is one `epoch` event in the log (§7.1); its fold is the base's (§7.4's epoch row). V06 fixes what happens inside
that fold (item 317):
1. **Checkpoint.** The session takes §7.4's checkpoint before the epoch (the base's rule), and the history index gains
   the epoch's entry (V06 §2.11).
2. **Strategy.** The runner reads `evolution.strategy` from the **effective parameters at the epoch's log position** (the
   recipe's with every earlier `adjust` applied, V06 §2.2) and looks it up in the `StrategyRegistry.evolution` map (§14). An
   `adjust` from `'grow-by-stage'` to `'history'` therefore applies from the next epoch, and its dry run says so ("from the
   next year the town's history runs in full; the years already recorded stay as they are"); fields older epochs never
   wrote read as their defaults (V06 §2.12's migrate column). `'history'` is this engine. `'grow-by-stage'` is the base's
   built path: it registers a phase for **every step the base's built path runs** — `prelude` (the rung and the dials
   before S2), `demand` (S2), `field` (the base's (a) as M4 builds it, without the building mask), `dossier` ((e)),
   `siting` ((f)), `growth` ((g)), `lapse` ((h)), `character` ((i)) and `works` ((j)) — and reproduces M4's path byte for
   byte (T-V6-1, the arbiter: a step M4 runs that has no phase fails it). These **base phases are built once, in
   `@plat/edit`**; `'history'` reuses the same phase objects for the steps V06 §3.2 marks "base" (`prelude`'s base part,
   `demand`, `dossier`, `lapse`, `character`), and wraps the base parts of `field`, `siting`, `growth` and `works` with its
   own acts, so both strategies share one code path (J-V6.1).
3. **Context.** `EpochContext` (V06 §2.1) is built once: `seq` the epoch event's seq, `week` = `inputs.week` (§4.11 *The
   clock* (1)), `prevWeek` the previous epoch's week (or the creation week), `years` their difference ÷ 52, the churn ledger
   initialised from §4.11's caps scaled by `years`, `product` and `rung` the product and rung that **V07 §2.1's fold** gives at the epoch (item 322; the
   hand-off band: the previous epoch's product runs unless the target crossed 1 575 upward or 1 425 downward, reading its
   own rung row at the edge of its range inside the band; J-V6.97), the household ledger empty.
4. **Phases.** For each `EpochStep` in order (V06 §3.2): the phase for that step — **the product's override** when the
   epoch's product (the fold, (3)) declares one for the step in `ProductDecl.phases` (V07's village declares
   `siting` and `growth`), **else the strategy's**; **a step for which neither registers a phase runs nothing** — then, at
   `afterField`, `decline` and `afterGrowth`, **every** registered `EpochParticipant` of that step (the product's included,
   whatever the epoch's product — a scoped participant gates itself, V06 §2.1's `EpochParticipant.run`) in
   `(order, id)` order. Each returns `EpochOps`; the runner commits the ops **in the order given** as single-level batches
   of this one event (§3.3's batches), each through the same operator a hand `convert` or edit uses (§7.1), so an epoch's change and a
   hand change are one code path; then it routes the phase's `displaced` rows into the ledger (writing
   `Household.transit`) and its `demandTaken` rows into `ledger.take`. An op the operator refuses (a conflict the candidate
   filter could not see, a kernel invariant) is skipped and reported (V06 §3.17); the next op runs on the state the previous
   ones left.
5. **Close.** The `close` step asserts the ledger's pool is empty — a household still in it (a phase that failed after
   displacing it) is housed by the overflow ladder's last rung (V06 §3.6 (2)) inside `close`'s own batch and reported — then
   writes the `EpochReport` (V06 §3.15.1) to the report block; `EpochRecord.postDigest` is the model digest after the last
   batch (§2.9).

**Protection.** Every candidate list the engine builds excludes what §4.11's exemptions exclude — a locked or pinned
entity is never struck, converted or moved; an assigned entity moves only through the use step; the building of a
dossier-backed use is emptied or removed only after that use is relocated (*Dossier content across epochs*) — except the
targets a mapped calamity names, which are struck where they stand (V06 §3.11.1). A church-family use whose plot holds a
churchyard and a `singular` use (§4.5 S7b's one-off anchors, the cathedral among them) are never moved by the use
phase (V06 §3.9.5; J-V6.66). A generated raised way, harbour-mouth chain, quay wall, retaining wall or deck plot that a user removed is
never re-founded: its key is suppressed in every generator (V06 §3.19.3). The filter runs before the draw, so a protected entity
never consumes a draw or a cap (J-V6.7).

**Purity.** The engine reads the committed state, the epoch's inputs, the tables pinned in the recipe and the log, and
nothing else — no view key, no wall clock, no host call; so a replay reproduces every epoch (§6.2 *Histories, not states*).

**Replay epochs.** A coarse epoch of the history replay at generation (item 113) is an epoch of this runner, its inputs
built from the replay plan instead of the port or a trajectory; V06 §3.20.4 lists the few things that differ.

### 3.2 The phase order

The base's order (a)–(j) (§4.11 *The epoch's order*) with the engine's four additions placed in it (item 317):

| # | step | base step | what it does | owner |
|---|---|---|---|---|
| 1 | `prelude` | before S2 | the product and the rung the fold gives (V07 §2.1's fold, item 322; V06 §3.1 (3)), read before the dials — the rung every later step reads; the dials past their hysteresis, `TradeFlow` re-read (base); the slice and the wealth level installed (V06 §3.3); **the feature set re-resolved at the epoch's rung** (below) | base + V06 §3.3 |
| 2 | `hazards` | — (rung 3's destructive trigger) | the calamity table's hazard events (F5 targets struck in place), timeline and replay events and spontaneous hazards (none in a replay epoch): `burn`, `inundate`, `topple`; a replay's destruction (V06 §3.20.5); `raiseGrade` after a great fire or flood; households into the ledger | V06 §3.11, V06 §3.20 |
| 3 | `demand` | S2 | the roster's delta demand (base) | base |
| 4 | `field` | (a) | the building shade mask written, then S6 re-evaluates the drivers, re-bands `fieldBand`, marks due blocks, and re-lays the `surface` of each way whose fronting band crossed the hysteresis by volume 1's way-surface rule (V01 §3.7.3; an edited `surface` kept; V06 §3.4 (9)); the water pull and the water term weighted by each spring's `flow` (§4.4, §4.5) | V06 §3.4 + base + V01 |
| 5 | `afterField` | — | participants: `sky.islands` (V05 §3.15), `village.plan` and `village.density` (V07 §3.12; each gating itself by its scope, the table below) | V05 + V07 |
| 6 | `uses` | (b) | strain, closing, opening, relocation, coverage; `MutationPlan`s created | V06 §3.9 |
| 7 | `departures` | (c), first half | the suffix leaves: the departure matching, `relet` down, `vacate` | V06 §3.5.1 |
| 8 | `decline` | (c), second half | the strike pool over building, plot-boundary (gardens reused, passages sealed), street, raised-span, retaining-wall and deck candidates (V06 §3.19.2, V06 §3.19.4, V06 §3.19.5); participants: `under.fade` (V04 §3.10, V06 §3.18.1 (4)) | V06 §3.5.2 + V04 |
| 9 | `fortification` | — | superseded and neglected rings: gates, stretches, final conversion; contraction under barrier closure and water access; wall repair under renewed threat; the waterfront grade and the harbour-mouth chain; closure re-evaluated after last epoch's shoreline change | V06 §3.7.2–§3.7.6 |
| 10 | `terrainWater` | — | the base's trigger rows on V06's candidates; the spring row (a failing or recovering spring, its gardens and grove) | V06 §3.12 |
| 10a | `raisedWays` | — | the raised-way pass: an aqueduct whose source was lost runs dry; disuse marks; repairs of raised ways with a ruined span (or abandoned) and struck decks whose reason or crossing is live again; then, at a CITY or METROPOLIS rung (the fold's) only, new raised ways by reason, gate, order and cap, their land cleared and its households into the ledger | V06 §3.19 |
| 11 | `ladder` | (d) | the wealth ladder's rungs on due blocks (base's rules); `MutationPlan` steps that fall due | V06 §3.8.4, V06 §3.10 |
| 12 | `dossier` | (e) | the dossier events carried by the epoch (base), each `assign` the step places offered first to the epoch product's `records` placement as §4.11 (e) states (V06 §2.1's `ProductDeclEpoch.records`; V07's `village.records` at a village rung, V07 §3.12) — a re-key whose greater keeps the lesser's thing (V08 §3.5.1 (c)'s first case) being a `rebind`, never offered and never placed (V06 §3.9.11's in-place `convert`) — keyed by the adding event's `seq`, each removed record handed after the base's removal to that placement's `remove`; then V06's readings of them: the ladder steps (V06 §3.9.11), `activeChains` re-bound (V06 §3.9.10 (5)), a walls record's circuit trigger (V06 §3.7.6 (4)), a see's crypt (V06 §3.18.3 (1)); in a replay epoch, the replay's class requests (V06 §3.20.3) | base + V06 |
| 13 | `siting` | (f) | the ledger's pool, then the delta demand less the households taken, in the regrowth-first order with V06's tiers | V06 §3.8 |
| 14 | `growth` | (g) | the underground crowding hook, then the growth decision on the residual and the backlog; a new stage — walled or not — through S5–S13 on its new faces | V06 §3.6, V06 §3.7.1 |
| 15 | `afterGrowth` | (g) | participants, in order: `under.extend`, `under.access`, `under.undercity`, `hood.fabric`, `sky.clearance`, and at a village rung `village.pins` (the table below) | V04, V06 §3.18, V01, V05, V07 |
| 16 | `lapse` | (h) | rejections re-checked (base) | base |
| 17 | `character` | (i) | S12c's character step, pressures, renames, `TradeFlow` (base) | base |
| 18 | `works` | (j) | a Works for every building-level physical change of steps 2–15, start weeks spread; retirement | V06 §3.13 |
| 19 | `close` | — | the report, the chronicle, the history index | V06 §3.15 |

**The participants** (each registered by the package named, under the stage V06 §3.16 names for it; `EpochParticipant.order` fixes the order inside a step). Every registered participant runs at every epoch at its step, whatever the epoch's product (V06 §3.1 (4); item 317); a *scope* in its *registered by* cell is the participant's own gate — outside it `run` returns no ops, reading `ctx.product`, `ctx.rung` and the document (V06 §2.1; J-V6.124) — so `village.density` runs at a base-product epoch after the hand-up, the case it exists for, and `village.plan` and `village.pins` return nothing at a TOWN epoch; a participant with no scope acts at every epoch (the `under.*` adapters' maintenance mode at a village rung is their own reading of `ctx.rung` inside their runs, V04 §3.1):

| step | order | id | registered by | what it runs |
|---|---|---|---|---|
| `afterField` | 0 | `sky.islands` | `@plat/sky` | V05's `IslandEpochStep` (V05 §3.15): **every island event an epoch can run**, at every rung where an island stands (TOWN's carried or declared islands included) — a raise (`raiseIsland`, V05 §3.15 (5), its districts laid by V01's unit run inside the epoch's commit, V01 §3.10.3 (6) (a)); a resize (`resizeIsland`, V05 §3.15 (2), (3), (6), V05 §4.2's whole resize in its own batch, the receiving districts re-derived by their scoped re-derivation, V01 §3.10.3 (6) (c)); a wane, a settle and a refloat (V05 §3.15 (2)–(4)); the institution's re-reasoning (V05 §3.15 (1b)); a fall with its landfall (`fallIsland`, V05 §3.15 (4), V05 §3.16) — each priced per event in V06 §6.2 at V05 §6's row for it |
| `afterField` | 10 | `village.plan` | `@plat/village` (scope: a village rung) | V07 §3.12's plan re-read |
| `afterField` | 20 | `village.density` | `@plat/village` (scope: a document holding a superseded `VillagePlan`, under any product) | VS2's density raster re-derived on the old core's recorded inputs (V07 §3.12), so a re-derived old core runs the village fabric |
| `decline` | 10 | `under.fade` | `@plat/evolve` (adapter) | V04's `UndergroundFade.candidates` / `.apply`; the ruins' slow decay at `RuinRule.fadeFactor`; a lived void whose last access seals is vacated in the same batch (V06 §3.18.1 (4)) |
| `afterGrowth` | 10 | `under.extend` | `@plat/evolve` (adapter) | V04 §3.10's one order: **first, the foundations over the epoch's scope** — V04's `Foundations.apply(doc, scope, cause)` (V06 §3.18.1 (6)); **then `ArchVaults.reconcile(doc, scope.raised, epoch)`** — the reconcile (below); then `SewerStrategy.derive` — U-NET laid whole — the first epoch `Features.sewers` turns on, else `SewerStrategy.extend` with **U-NET's invert drops** at the wall crossings of the ways in `scope.levelled`; then `CatacombGrowth.grow` with its `opts` — V06 §3.18.2's cap, primary and calamity deaths under its count — the crypt joins inside it (V06 §3.18.3 (6)); then `QuarryWorkings.extend(doc, scope, epoch)` — the stone, mine and chain workings the epoch opened (V04 §3.5.3; TOWN and above). **At a village rung, V04's maintenance mode** (V04 §3.1): no sewer extension, no catacomb growth (`CatacombGrowth` records `blockedBy` `'rung'`, the unmet need to its fill), no new working; the foundations and the arch-vault reconcile only |
| `afterGrowth` | 20 | `under.access` | `@plat/evolve` (adapter) | V04's `AccessPass.run` over the epoch's scope: dig draws, overlap, mine breaches (the village workings of `scope.workings` included), openings; excavation by demand (V06 §3.18.1). At a village rung the inherited systems in V04's maintenance mode lay nothing, so the pass tests the caverns, ruins, workings and openings only, and no excavation runs (the village has neither the crowding hook nor an undercity to ask for it) |
| `afterGrowth` | 30 | `under.undercity` | `@plat/evolve` (adapter) | V04's `UndercityEpoch.reread`, then U-FRONT F6's scattered dwellings in accessible voids, filled by relocating the district's poorest-band ground households; the households the re-read vacates are re-housed inside the participant (V06 §3.18.1 (4)) |
| `afterGrowth` | 40 | `hood.fabric` | `@plat/hood` | V01's S7c on the districts the epoch created outside S7b and S9b on the blocks the ladder's rung 3 re-cut or redeveloped (`scope.recut`) (V01 §3.3.6 (1)–(2), V01 §3.5.11); and the districts a part in `scope.raised` crosses: their fabric reading and hood pins re-derived over the committed plot set (V01 §3.17.3 (2), (5)), with no plot removal and no re-homing — the strip's plots and households are V06 §3.19 (7)'s clearing, logged in the epoch's diff |
| `afterGrowth` | 50 | `sky.clearance` | `@plat/sky` | V05's clearance rule after growth (V05 §3.15 (7)): over every live island, reading every caster the epoch committed (`EpochScope.built`, `.raised`, `.levelled`) — raised parts, retaining walls' high sides, massing tiers, levelled fill — it returns one `reclearIsland` op for each island with a caster above its `groundRefCm`: `elevationCm` kept, raised only where the floor fails, a listed fate; `shadeBasis` never written |
| `afterGrowth` | 60 | `village.pins` | `@plat/village` (scope: a village rung) | VS8's pin rows over what the epoch changed, by least disruption: wells by the coverage row, market stalls brought to their count (removed with a closed market), the new hosts' rows, a pin record re-bound; no standing pin moved or removed whose host stands (V07 §3.12 *Pins over epochs*) |

**The arch-vault reconcile** (`ArchVaults.reconcile`, V04 §3.5.4 (d), which states what it lays, collapses and deletes)
runs in `under.extend` after the foundations and before the sewer's extension, so its new chambers are in `scope.elements`
for `under.access` at order 20 in the same epoch (item 109 (3b)), over the raised ways in `scope.raised` in address order.
The breach, dismantle and removal ops collapse or delete their chambers in their own batch (item 291) and the hand operator
lays a new part's chambers in its commit, so on those paths the reconcile finds nothing to do: it is the one epoch-side
guarantee that no chamber stands under a fallen span and every `vault` span has its chamber, whatever op changed the way.

`'grow-by-stage'` registers no participant of its own; the participants run under it too when their packages are loaded — a product's phases, participants and records placement at the call points item 202 adds to base §4.11's order, with the `ProductEpochContext` the grow path fills (V06 §2.1; items 202, 317) — so the adapters live in `@plat/evolve` only for `'history'`, and under `'grow-by-stage'` V04's own M4 hooks stand for V04's functions (V04's U5, V04 §8).

**The feature set at an epoch** (item 550; J-V6.60). After the epoch's rung is read (the fold's, V06 §3.1 (3)), the prelude re-resolves
the features whose existence the rung decides (II.7.1): at CITY and METROPOLIS `Features.sewers` turns on; at TOWN the
creation's one uniform draw `u` on `blueprint.features` (S0's, reproducible from the seed; no new draw) is compared with
the TOWN law's probability at the epoch's population and wealth level, and the feature turns on the first epoch `u <
P(epoch)` — deterministic, monotone in the population, independent of the cadence, and equal to the creation's result at
the creation's population. Once on, never off (the underground fades and is never removed, item 11); a requested `off`
at CITY is the base's hidden layer; at a village rung (a town handed down) the feature stays on and the network is held in
V04's maintenance mode — it silts and caves in by `under.fade`, never extends. The first epoch the feature turns on, `under.extend` lays the whole network (U-NET
over the current ways, V04 §3.2) instead of extending it, reported (`under.featureOn`) and chronicled (`underground`).
Caverns and ruins need no re-resolution (they exist at every rung, item 109 (j) (1)); the catacomb count reads the rung
at each epoch (V06 §3.18.2).

**Why this order.** Hazards come before demand so that a fire's displaced households and burned plots are known to every
later step (they are re-housed first at `siting` and their plots are rung-3 eligible at `ladder`). Fortification follows
decline and precedes siting so that land a ring road or an absorbed wall frees is on offer to regrowth tier (5) in the
same epoch. Terrain and water sit with decline, the slowest layer of the persistence order, before siting so that
reclaimed land can take growth. The use step precedes departures as the base orders it (J-V6.8). The underground's
catacomb and sewer growth (`under.extend`) precede the access pass so that every element grown this epoch is tested for
overlap in the same epoch; the access pass precedes `under.undercity`, so an epoch that opens an access may start
dwellings (item 109 (j) (4)). A crypt needs no participant: it is re-derived and re-ranked inside the op that changes a
church's designation (V06 §3.18.3). The `raisedWays` step comes after `terrainWater`, so reclaimed land, shifted banks and a
lost aqueduct source are known; before `ladder`, so the plots it clears are rung-3 eligible this epoch; before `siting`, so
the households its clearance displaces are re-housed in this epoch and none goes to a tent (J-V6.82); and before
`afterGrowth`, so `under.extend` lays the new parts' vaults, `hood.fabric` re-derives the close-ups they cross and
`sky.clearance` (order 50, after every commit of the epoch) reads them.

### 3.3 Epoch inputs

**3.3.1 Dossier-bound.** The port folds epochs by §4.11's cadence (a 52-week boundary, or a population move past the
roster tolerance) with the week, the target, the slices, the calamity records (typed by V06's calamity table, DR28, item 388), the wealth level (DR6,
item 343) and that week's dossier events. The engine reads them and invents none of them: the population target, the
slices and the calamities are the dossier's; everything else the map derives (item 20 (h)). `advance` is refused (J-V6.2),
offering the detached what-if copy, and spontaneous hazards are `none` by rule (J-V6.19).

**3.3.2 Standalone: `advance(trajectory)`.** The request expands, before anything is appended, into `n = ⌈spanYears × 52 ÷
cadenceWeeks⌉` epochs. Above `advance.maxEpochs` the request **bends**: the cadence becomes the smallest whole number of
weeks that fits, `⌈spanYears × 52 ÷ advance.maxEpochs⌉`, and the card and the clerk say so in one line ("a 500-year history
runs in 130-week steps") — item 101 R2's bend, never a refusal. With `W0` the
document's week and `P0` its population (the last epoch's `populationTarget`, else the population the recipe resolves at
S2), epoch `i` (1 … n) sits at `W_i = W0 + min(i × cadenceWeeks, spanYears × 52)` (integer weeks; `spanYears × 52` rounded
half-up to a whole week), with `f_i = (W_i − W0) ÷ (W_n − W0)` and:
* **degenerate requests** (each a bend named in one line, item 101 R2; never a refusal): a span shorter than half a week
  takes one week (`W_n = W0 + 1`, so `f_i` is defined); a cadence below one week, or not a whole number, takes
  `max(1, ⌈cadenceWeeks⌉)` weeks; a `points` list is sorted by week, a repeated week keeps the last given point, and a
  point at or before `W0` only fixes the value held before the first later point; a `rate` with `perYear ≤ −1` empties the
  town at the first epoch (population 0 before the clamp below); a negative `target` or point population reads as 0. A
  non-finite number never reaches the engine: the tool API's request schema rejects it (§11.2), as it rejects any
  malformed request;
* population — `rate`: `P0 × (1 + perYear)^((W_i − W0) ÷ 52)` through `dmath.pow`; `target`/`linear`: `P0 + (T − P0) f_i`;
  `target`/`logistic`: `P0 + (T − P0) · (L(f_i) − L(0)) ÷ (L(1) − L(0))`, `L(f) = 1 ÷ (1 + e^(−8 (f − 0.5)))` through
  `dmath.exp` (8: our own, a sigmoid that spends most of its change in the middle of the span); `points`: piecewise linear
  in the week, `P0` held before the first point and the last point's value after it; each rounded to the nearest integer
  (half up) and clamped to **the union of the registered products' ladders** (§1.1's router) — [1 500, 120 000] with the
  town product alone; [0, 120 000] with volume 7's village product registered, where a target of 0 is admitted as the
  deserted outcome V07 §3.12 designs — a clamp reported (J-V6.5, J-V6.61). An epoch whose product the fold changes
  (V07 §2.1: a village passes to the town product only when the target reaches 1 575, a town to the village product only
  when it falls below 1 425; inside the band the previous product runs on its own rung row) runs that product's phase
  overrides (V06 §3.1 (4)), so a village grows into a town and a town that falls below 1 425 is handed down to the village
  product, by V07's hand-off rules;
* the slice — the document's current slice (the last epoch's, else the recipe's creation slice) with `trajectory.slice`
  applied from epoch 1;
* the wealth level — `hold` keeps the current; `target` interpolates linearly in `f_i`;
* the events — every `trajectory.events` entry whose week lies in `(W_{i−1}, W_i]`, in the given order.

The app appends the epochs one at a time in one `group` (§7.4), each folded before the next is built, so a century runs
as a cancellable background job whose progress is visible and whose completed epochs stand if it is stopped (V06 §4.1). A
replay folds the stored epochs; the trajectory rides only as provenance on epoch 1 (`EpochInputs.advance`).

**3.3.3 Growing from a founding.** At creation, T1's card may set "start small": the document is created at the
founding population (default the lowest registered ladder's floor — 1 500 with the town product alone, a hamlet's with
volume 7's) under the same recipe, and an `advance` with a `target` trajectory
to the requested population over the requested span (default 200 years at 52-week cadence) follows as its first group.
The town that results is a history, not the one-click town at that size; both are offered, and a town with a known or
declared history is generated as that history instead (V06 §3.20).

**3.3.4 The standalone timeline.** A `Recipe.circumstances` entry (§7.7) whose week lies beyond the document's week is
shown on the timeline bar as a proposal; "bring the town to this date" appends the epochs a `points` trajectory through
the entries gives, each entry's slice and events applied at its week.

**3.3.5 The wealth level over time.** `EpochInputs.wealthLevel` (item 343), when present and different from the level in
force by more than `dial.hysteresis` (0.05, §4.11), replaces it: layer 1's expansion rows (§7.7 item 1) re-map
`field.characterOffset` and the granularity bonus from it before S6 re-evaluates the drivers, and item 71's class mix
reads it for every placement of the epoch. Absent, the level in force holds.

### 3.4 Sunlight over time — the building shade mask (item 102 (b), (e))

Item 102's base term reads terrain, walls, gatehouses, the castle, great towers and floating islands, at generation and at
every field evaluation (item 102 (a)–(c)). What this volume adds is the rule that **at an epoch the buildings cast shade
too**, frozen in a stored mask until the next epoch (item 102 (b), (e)):
1. **When.** First act of the `field` phase, before S6 re-evaluates the drivers. The mask reads **the buildings as they
   stand when the field phase runs — after this epoch's hazards** (a quarter a fire opened is sunnier at once, J-V6.29) and
   before any building this epoch's later phases place, so no building this epoch places shades the field that places it
   (no loop; 102 (c)'s one-pass rule).
2. **Casters.** Every live building of the arena with its heights at the epoch's week — `heightsAt(works, week)` for one
   under Works (§4.11 *Works* (8)), its stored heights otherwise — rasterised **per wing** (each wing's prism and its roof
   rise, V02 §3.14.1), by existence: `generated`, `built`, `altered`, `converted`, `abandoned` at the full ridge;
   `decayed` at the eave (roofless); `ruined` at `shade.ruinShare` (0.5) of the eave; `cleared` and `reused` none. Walls,
   towers, the castle, islands, raised ways and retaining walls are the base's casters (item 102's list with item 110's
   raised ways and retaining walls), not repeated here.
3. **Raster.** Casters are rasterised at `shade.rasterM` (4 m) over the arena as a caster-top raster: each wing's top is
   its **own datum** `baseCm` (V02's stacking in `deriveBase`, item 370 — a massing tier standing on the tier below, a
   deck building on its deck, a terrace house on its platform) **plus its height** (max over a cell's covering wing
   footprints, a cell covered when its centre lies inside the footprint), so each tier of a stepped building casts its own
   shadow (item 110 (c)). The receiver's `ground(p)` is the terrain raster as the base's field reads it — the unlevelled
   heights; levelled platforms enter only through the buildings' datums.
4. **Sampler and reach.** The base sampler's sample points per 32 m field cell and its sun positions (item 102 (a): the
   path sun at the settlement's latitude at equinox, the latitude from the realm block, DR29). For each point `p` and sun
   `s` (azimuth `α_s`, elevation `β_s`), march from `p` toward the sun in steps of `shade.rasterM`: the point is
   building-shaded at `s` when a step `q` at distance `d` has `casterTop(q) > ground(p) + d · tan β_s` (tan through `dmath`)
   and `d ≤ min(cot β_s, c) × h(q)`, `h(q) = casterTop(q) − ground(q)`, `c` the sampler's cap (item 296 (i), V05
   §3.19 (1)) read from the sampler — **one reach law** for every caster, the same as V05's island strips, with no
   absolute distance cap. The bit is written to the mask (V06 §2.6).
5. **Incremental and exact.** The mask of the previous epoch is kept; only the cells whose points lie within reach downsun
   of a **dirty caster** are recomputed. The dirty set is (a) every building whose existence or stored heights an event
   changed since the previous mask's epoch (read from the lifecycle block by `seq`, §2.8), **plus** (b) every building whose
   Works was live at the previous mask's week or at this epoch's week — a rising or a falling building changes
   `heightsAt` between two weeks with no event. Each is swept along each sun's shadow direction by `min(cot
   β_s, c) × h` at its larger height of the two weeks. Each cell's bits are a pure function of
   the casters in reach, so the incremental mask equals a full recomputation bit for bit (T-V6-12). A mask whose sampler
   digest differs from the current sampler (a table upgrade, an `editTable` of the sampler rows) **reads as zero building
   shade until the next epoch**, which recomputes it whole; the edit's dry run says so ("the buildings' shade returns at
   the next year").
6. **Into the field.** §4.5's daylight driver reads, per point and sun, the union of the base casters' shading and the
   mask's bit; `shade(x)` is the shaded share, the driver `−w_sun · shade(x)` as item 102 (a) states. The prosperity brush
   still overrides the result; `w_sun` = 0 makes the mask inert (T-V6-12's no-op clause).
7. **The drift.** S6's re-banding past the hysteresis marks due blocks (§4.11), so a quarter walled in by tall new
   houses — or put in the shade of an island that sank — changes field band at the first epoch after the mask records the
   casters, then its stock drifts only through the wealth ladder: rung 1 at that due epoch, rung 2 only after the ladder
   table's years; one put in the sun drifts up the same way: the owner's "a sunnier quarter slowly improves, a newly
   shaded one slowly declines" (102 (e)). Item 102 (d)'s sunlit-side preference acts at every placement an epoch makes (S10b
   reads the current shade), so rebuilding after a fire or a redevelopment sorts the large classes toward the sun again.
8. **Islands.** (a) *Islands as casters*: an island's own shade strip is V05's, computed from the island's persisted
   `shadeBasis` (V05 §2.1, item 274), which each epoch's S6 writes from the island as it stands when the epoch begins — so
   an island that sank or moved in epoch e shades the field from epoch e + 1, the same one-epoch lag as the buildings, and
   the lag survives a save and a load. (b) *Islands as receivers*: the mask runs on each island arena's own 32 m
   lattice too, with that island's buildings as casters, and is OR-ed into V05's `shadeSky` receivers, so a manor
   on an island is shaded by its neighbour's tower as a ground house is. An island raised at this epoch (`sky.islands`,
   after the field phase) or declared since the last field phase has no mask on its lattice until the next field phase;
   absent reads as zero building shade (V05 §2.1's optional `shadeBasis`, J-V5.72).
9. **Way surfaces** (V01 §3.7.3's epoch clause; V11 row 90's `S6` reader; J-V6.121). Last act of the `field` phase, in
   its batch, after S6's re-banding: the **candidates** are the ways fronted by a plot whose `fieldBand` S6 changed this
   epoch (the re-banding's own output — §4.11 (a) puts each former value in the epoch's undo record — never a scan of
   every way), in way-address order. Each
   candidate without an edited `surface` (the path's edit mark, V01 §2.7's `Way.surface` row) takes volume 1's
   way-surface rule again — the `way.surface` row for its class, the era row, and the band of its fronting blocks by
   V01 §3.7.3's area-weighted reading over the field as S6 now reads it. A plot's band moves only past §4.5's hysteresis
   (§2.5's `fieldBand`), and a way is re-read only when a fronting plot's band has so moved, so the way's surface follows
   the hysteresis without a band memory of its own and never flickers at a cut. Where the rule's value differs from the stored `surface`, the phase writes one `setAttr` of
   `Way.surface` (author `engine`, cause `rule:field`), and a way whose value is unchanged is not touched. A raised road
   (its surface is its record's, by its material) and an aqueduct (none) are never candidates; a way with an edited
   `surface` keeps it and is reported (`shade.surfacesHeld`). The write draws nothing, so the same epoch re-lays the same
   ways; it is in the epoch's undo record as every op is; the renderer's road programs (V01 §5.1.2) and the exports read
   the new value from the epoch's `DisplayDelta`, and a way bounding two districts is one way, re-laid once. The report
   counts `shade.surfacesRelaid`. A declined district's lanes turn to dirt at the first epoch after its plots fall past
   the band cut, and a risen one's are paved again the same way — the streets drift with their frontages, as (7)'s
   houses do.

### 3.5 Decline

**3.5.1 The departure matching (step (c), first half).** When the epoch's target lies below the manifest, the roster's
suffix leaves in reverse ordinal order (§4.11) — that fixes WHO leaves. WHERE the town empties is the exposure field's
(item 8 (c)), so the phase matches the two:
1. For each band `b` in the band order (poorest first; §4.5's cuts), `L_b` = the leaving households of band `b`, `n_b = |L_b|`.
2. The candidate dwellings `D_b` = occupied buildings housing a band-`b` household, less the protected (V06 §3.1). Each
   takes the key `k = u^(1 ÷ w)` with `w = E(x) · rate(building)` at its centroid (§4.11's exposure field, computed once
   for the epoch) and `u` its first draw on `stream(EVO_DEPARTURES, building)`; `pow` through `dmath` (a weighted draw
   without replacement: the largest keys first). No exposure — `E = 0` — sorts last by address.
3. Dwellings are taken in descending key until their band-`b` households number at least `n_b`; the last one taken may
   keep some (a `relet` down to the count that stays); every other taken dwelling empties.
4. **Swap.** A household of an emptying dwelling that is not in `L_b` moves into a slot a member of `L_b` frees in a
   dwelling that is not emptying — pairs made in address order of the movers and of the freed slots, the destination
   restricted to the mover's district first, then the town (§4.7's overflow order) — each a `relocate` lifecycle event
   (§2.8). A leaving household in a protected building leaves; its slot is refilled the same way from an emptying dwelling
   of its band, so a protected building stays occupied. When its band has no emptying dwelling to refill from, the
   household still leaves and the protected building keeps one household fewer (a `relet` down, never a `vacate` of a
   protected building's last household by this step), counted `uses.heldByProtection` in the report.
5. **Ops.** `relet` down where a building keeps households, `vacate` at the last (§4.11's `LadderOp`/`DeclineOp`); a
   dossier-backed use in an emptying building is relocated first (*Dossier content across epochs*). Departures take no
   churn cap: the population is the truth, and a fall's households leave at once (item 8 (f)).

So an undefended suburb, a damp low quarter and the plot beside the tannery empty first, the market core last, and a core
house can still empty — the draw's `u` is the chance share (J-V6.9). **Which dwellings empty is decided by this matching;
the strike pool strikes fabric only** (§4.11 step (c), item 479). Quarters whose prosperity fell — a newly shaded one
(V06 §3.4), one around a failing spring (V06 §3.12.1) — carry a higher `E(x)` by the base's low-prosperity driver, so they
empty first without a term of their own.

**3.5.2 The strike candidates (step (c), second half).** The **strike pool** is the base's per-district decline draw
(§4.11 *The strike pool*), run **once per district over one pool** holding the layers' candidates, so the persistence rates
set the layers' shares (§4.11's table). Each candidate's weight is `w = E(x) · rate(layer) · u`, `u` its first draw on
`stream(EVO_DECLINE, entity)` for the epoch; strikes are taken **in descending `w`, ties by address, with no second draw**
(the `u` inside `w` is the pool's only chance), until the district's `fabric` churn cap or the 2-plots-per-block bound
stops it:
* **building** (`rate` 0.6): an `abandoned` building whose `decay` Works has run its span (→ `decay`, starting the next
  `decay` Works toward `ruined`, §4.11 *Works* (5)); a `decayed` building whose `decay` Works has run (→ `ruin`); a `ruined`
  building with salvage demand in its haul radius (→ `robStone` for masonry, `clear` otherwise), its weight × `min(1,
  demand ÷ yield)` — the salvage mark of §4.11 — and with no demand never a candidate, so a ruin beyond any building stands
  (the owner's "occasional old decrepit buildings or ruins").
* **plot boundary** (`rate` 0.3): a plot whose every building is `cleared` or `reused` (or that has none), not an informal
  plot with structures, empty for at least its drawn `plots.mergeAfterYears` — drawn on `stream(EVO_DECLINE, plot)` keyed
  with the epoch in which it emptied (§6.1's epoch component), so the same span is re-drawn every epoch without being stored.
  A struck plot is `amalgamate`d into an occupied neighbour of its block sharing a boundary **that carries no
  `RetainingWall`** (item 110 (a): a merge never deletes a terrace wall; V06 §3.19.4), with `plots.amalgamateWeight`
  (0.6) against `plotToGarden` (0.4) on its second draw — the neighbour with the longest shared boundary, ties by address
  — or, with no such neighbour, `plotToGarden` (which keeps any retaining wall on the plot's lines: a terraced garden): the kind by area (< 400 m² garden, < 2 000 m² orchard, else field; rows of
  `plots.gardenKinds`, our own) — surviving households absorb the plots beside them and the plan coarsens (item 8 (c)).
  The same layer takes two more candidates at the plot-boundary rate: **a cleared rear building on a lived plot** —
  `cleared` for its drawn `plots.mergeAfterYears` (keyed as above, from its clearing) while its plot's front building is
  lived in — is struck to `reuse … as 'garden'`, its trace joined to the plot's yard (§4.9), so an old back-court ruin
  becomes the yard's garden instead of standing overgrown for ever (item 8 (a)); and **a passage whose served rear
  plots have all been vacant** (no occupied building) for their drawn `plots.mergeAfterYears` is struck to `sealPassage`
  (§4.11 *Hidden plots over epochs*; the base's kind, scheduled here), its buildings entering the decline ladder as the base
  states; regrowth reopens it first (V06 §3.8.2).
* **street** (`rate` 0.08): a way of `streets.classes` every fronting plot of which has been empty, garden, orchard or
  field for `streets.abandonAfterYears`, that carries no live plot's only access edge (the access test of §4.7) and is
  neither locked nor pinned (→ `downgradeWay` to `path`; a `track` to `path` as well). The line persists; regrowth
  upgrades it back before it cuts a new lane (V06 §3.8).

**The product's rows** (`ProductEpochRows`, V06 §2.1). At an epoch whose product declares `rows` (V07's village), the
same pool reads them and nothing else changes: a building's `rate` is × `persistence[class]` for the class of its live or
last use (V07's church × 0.3, manor × 0.5 — churches outlive their villages); and the street candidate takes
`street.classes` and issues `street.op` — at a village rung V07's retirement of a disused way to a hollow way
(`retireWay` → `abandoned`, item 268; V07's `DeclineOp` members) in place of `downgradeWay`.
**With `op: 'retireWay'` the test is stricter** (J-V6.107), because a hollow way leaves every router while a
downgraded one stays in the network: besides the street test above, a way is a candidate only when it carries no entry,
approach or landing (V07 §3.12's disuse test: no route beyond the frame is ever cut) and its retirement would leave no
gate, frame exit or occupied plot without a path over the ways still in use (§5.3's network invariant, evaluated on the
network less that way) — both filtered before the draw (J-V6.7). **Struck again.** When the rows declare `again`, a way
in `op`'s result (an `abandoned` hollow way) is a candidate of the same kind at the same rate once its dwell band has run
since its retirement — the first band of §4.11's decline table (vacant → derelict, [10, 30] years), drawn once on
`stream(EVO_DECLINE, way)` keyed with the retirement epoch (its `Lifecycle.since.epoch`; V06 §3.16) — and a strike issues
`again` (`effaceWay` → `decayed`); a way in `again`'s result is never a candidate again (its line stays as a trace).
**Reopened** — `reopen` is issued by regrowth and by every placement, never by the pool: by tier (5′) before a cut and by the placement rule before any placement an epoch makes on a plot a hollow way serves — a siting tier's, the use phase's opening or move, a dossier-backed use's relocation (V06 §3.8.2). The candidates' keys, caps and
the draw are otherwise this section's.

The same pool holds item 110's three kinds (V06 §3.19): **raised** (`rate` 0.05) — the spans of a disused raised way
(`breach`) and their rubble and freed supports (`dismantle`, on salvage demand only) (V06 §3.19.2); **retaining** (`rate`
0.05) — a stretch of a generated retaining wall under abandoned terraces (V06 §3.19.4); **deck** (`rate` 0.08, the street's)
— a deck whose crossing is dead and which carries no occupied plot (V06 §3.19.5). Their rates are item 291's persistence rows (§4.11's table).

**landfall** (`rate` 0.08, the street's; J-V6.99) — the members of a `fallen_island` decoration a landfall left on
the ground (V05 §3.16 (4)–(5)): the covered ways, retaining walls, plots and reservations. Each member's weight is `w` ×
`min(1, demand ÷ yield)` of the salvage ledger's demand in its haul radius (§4.11 *Salvage*; the landfall's rubble was
credited to it, V05 §3.16 (6)), so rubble is cleared where its stone is wanted and, with no demand, a member is never a
candidate; strikes are charged to the `fabric` cap of the member's district. A struck **way** member takes back its
routing class and surface — a `setAttr` pair, cause `rule:landfall`: `class` to its `formerClass` (which the landfall
wrote, item 209; cleared by the pair) and `surface` re-laid by the base's surface rule for that class at its district's
band, as a cleared road is re-laid (absent `formerClass`, a landfall made before this rule: the class stays `track`,
the surface is re-laid, reported `landfallClassUnknown`); a struck **retaining-wall** member is restored by V06 §3.19.4
(6) (cause `rule:landfall`); a struck **plot** or **reservation** member leaves the decoration, its `ruin` treatment
ending, so regrowth tier (3) may build on it. The landfall's **`quarry`** face (a covered `LandUse` V05 §3.16 (4) turned
into the surface rubble working whose `source` is the decoration) steps to `commons` by `retypeLand` after
`land.scrubAfterYears` (drawn once on `stream(EVO_DECLINE, landUse)` keyed with the epoch of the fall) once the salvage
ledger's credit from it is spent.
**Every member leaves by the op that ends its cover** (J-V6.108) — a `setAttr` of the decoration's `members` in
that op's batch, removing the member in its `DecorationMember` form (V05 §2.6; item 252: an `Id`, or `{ raised, span:
[a, b] }` or `{ raised, support }` on item 244's support keys, which a re-derivation of the raised way keeps): a **way**, **plot** or **reservation** member when this kind strikes it (above); a **retaining-wall**
member in the batch of the `repairRetaining` that restores its covered stretches — this kind's, or an earlier
re-levelling's (V06 §3.19.4 (6)); a **land-use** member in the batch whose `retypeLand` steps its `quarry` face to
`commons`; a **raised span or support** member in the batch of the op that repairs it — `repairRaised` (V06 §3.19.2 (5),
the engine's or a hand `convert`; a span's repair restores the ruined supports at its ends with it, V06 §2.8) — or clears
it — `dismantle` (V06 §3.19.2 (3)); and a member tombstoned by any other op (a hand `delete`, a re-cut, a clearing under a
new raised way) in that op's batch. The decoration is tombstoned (cause `rule:landfall`) in the batch that removes its
last member, whichever op that is, so the rubble drawn over the members' faces never outlives their cover. A raised part
that is never repaired and never salvaged stays a member, and the decoration stands with it, as its ruin does.
**Accesses under the rubble** (V04 §3.10 *Access closures*). In the batch in which a member leaves the decoration,
every `AccessPoint` that V04 §3.10 bricked with cause `convert:fallIsland` and whose ground host is that member takes a
`setAttr` of its `state` back to `open` — `locked` where its `knownTo` is `secret` — cause `rule:landfall`, by V04 §3.10's
rule that an access's state changes only with its host; the member's face enters `EpochScope.surfaceChanged`, so
`under.access` at `afterGrowth` re-derives the excavation reading and re-evaluates the openings over it in the same epoch
(V06 §3.18.1 (2d)), and a lived void whose only access this was is `accessible` again from that epoch. Counted in the report's `landfall` section,
chronicled `landfallCleared` ("{year}: the rubble of {subject} is cleared from {district}."). V05 §3.16 (4) cites
this rule as the clearance it leaves the rubble to.

Enceinte walls are not in the pool (their pathway is V06 §3.7's), nor is the underground (V04's `under.fade` participant runs
after the pool at this step), nor terrain and water (V06 §3.12). Candidates beyond a cap wait, in the key order, and are first in line
next epoch (§4.11 *Churn*).

**3.5.3 The hinterland over epochs (item 26).** A struck farmstead's fields stay worked (§4.11), their owner passing to
the nearest farmstead or the commons. A `plotToGarden` on the town's edge whose district is the hinterland pseudo-district
joins the adjacent `LandUse` face of the same kind (§4.9's hinterland unit), so the countryside creeps back into an
emptied suburb. The fields themselves follow the food demand, read at each epoch from S2's demand for farm households
and food (item 26, §4.2 S2) against the worked area the hinterland unit's rows give per household:
1. **Decline — the fallow ladder.** When the worked arable area exceeds the demand's by more than `dial.hysteresis`
   (0.05) of it, the surplus faces — farthest from any live farmstead first (way-graph distance, ties by address), and
   never a locked, pinned or dossier-listed face — step down one rung each when their drawn span has run (at an epoch whose product's rows declare `hinterland` — V07's
   village — the slack is `hinterland.slack` (V07's `epoch.rows.hinterland.slack`) in place of `dial.hysteresis`, the order is
   `hinterland.order` (the furlongs farthest from the perimeter and poorest by suitability first) and the cap
   `hinterland.cap` (one great field's worth at most per epoch), the ops still `retypeLand`): `arable` or
   `strip_field` → `pasture` after `land.fallowAfterYears`, `pasture` → `commons` after `land.scrubAfterYears`, `commons`
   → `wildwood` after `land.woodAfterYears` (each span drawn once on `stream(EVO_DECLINE, landUse)` keyed with the epoch the
   face entered its present kind; the entry week read from its lifecycle block). Each step is a `retypeLand` op (V06
   §2.8) charged to the `fabric` cap of the hinterland pseudo-district. Meadows, orchards, vineyards, coppice, quarries,
   mines and fisheries are not on the ladder (they are worked by their own uses, which the use phase closes).
2. **Growth — the re-take.** When the demand exceeds the worked area, the hinterland re-takes its own ground first —
   `pasture` → `arable`, then `commons` → `arable` (nearest a farmstead first), each a `retypeLand` — and only then S12a
   sites new fields on new ground (the grow path, §4.11). `wildwood` is cleared only by S12a's own rows (an assart), never
   by the re-take.
3. **Farmsteads** are buildings and follow V06 §3.5.1–§3.5.2 like any; a farm household that leaves empties its farmstead,
   whose fields then enter the ladder above.

### 3.6 Growth — fill first, crowd next, spread last

After the `siting` phase has placed the ledger's pool and the delta demand in the regrowth-first order (V06 §3.8), the
`growth` phase decides whether a new stage grows. It keeps the base's rule that only a residual grows a stage, with the
two exceptions item 336 states (the overflow backlog and decrowding):
1. **Residual, the crowding hook and the backlog.** `R₀` = the delta demand's households no tier (0)–(5″) could place,
   together with any household of the ledger's pool (V06 §3.8.1) those tiers could not place.
   **The underground crowding hook comes first** (the base's order (6); II.7.3 (c)): `crowdingShare` (II.7.4's row) of
   `R₀`'s poorest-band households, rounded half up, are offered underground — S7b (6)'s underground allocation and
   U-FRONT's placement (V04 §3.4, V04 §3.10) seat them on lived runs, then reopened runs (both only where `Features.sewers`
   is on), then **accessible** void clusters (at any rung of the base product, whether or not the town has sewers;
   the base's gate lifted for them by item 574) only (V04's excavation reading `accessible`, item 109 (j)
   (4)); the seated leave `R₀`, the
   rest stay (J-V6.67). `R` = what remains. `B` = the **overflow backlog**: the households the overflow ladder (2) housed
   in earlier epochs and still houses — those on informal plots and in tents whose tenure's lifecycle cause is
   `rule:overflow`, and those crowded above ⌈band row × `growth.crowdFactor`⌉ — derived from their records, never stored.
   `H` = the town's households after the epoch's departures; the quantum `q = min(growth.quantumShare × H,
   growth.quantumHouseholds)`; `C` = the crowded households, `Σ max(0, households − band row)` over the dwellings of the
   crowding bands (derived).
2. **Decision** (no draw), in this order:
   * **The rich build outside.** `R_rich` = `R`'s households of a band above `growth.crowdBands`. When `R_rich > 0`, a stage
     grows **for `R_rich` only** — their plots at their band's plot area, in the `ribbon` regime along the arterial whose
     frontage carries the highest field value outside the last boundary (villas along the road out; J-V6.17). `R` loses
     them.
   * **A stage for the demand and the backlog.** When `R + B ≥ q`, a stage grows for `R + B`: the backlog's households
     relocate into it (each a `relocate`, tents first, then informal plots, then the over-crowded — their tent clusters
     and emptied informal plots cleared by the decline ladder as vacant), so a slowly growing town grows a stage once its
     backlog reaches the quantum, **whatever the cadence**.
   * **Overflow.** When `0 < R` and `R + B < q`: the **overflow ladder**, rung by rung until every household is housed
     (none is ever dropped, §5.2 F-PLAN's rule): (i) crowding past `growth.crowdFactor` up to §2.6's capacity, poorest bands
     first; (ii) informal tenure on the vacant, cleared or ruined plots of the district of lowest value (item 70's
     clusters, §4.7), each a `build` Works of days, tenure cause `rule:overflow`; (iii) a tent cluster (item 70's `tents`
     arrangement) on the edge belt of `overflow.tentBeltM` outside the outermost boundary along the busiest arterial — the
     hinterland always has ground, so this rung never fails. Their households are the backlog `B` of the next epochs and
     first in line for regrowth tiers (0)–(5) (the report counts them, `households.backlog`).
   * **Decrowding.** Else, when `C ≥ max(q, growth.crowdShareMax × H)`, a stage grows for the crowded excess —
     **decrowding**: at each crowded dwelling the households above its band row in descending ordinal leave for the new
     stage (each a `relocate`), so crowding is relieved by a suburb, as it historically was (item 336's second exception:
     a stage whose households are the crowded ones it moves).
   * Else no stage.
3. **Regime.** The wall decision (V06 §3.7.1) runs first; a stage it walls takes the walled-ring regime. Otherwise the
   stage takes `ribbon` (anisotropy 4) when its households number below `growth.ribbonMaxHouseholds` (150), `suburb`
   (3) otherwise (§4.4's regime rows; item 293 admits the suburb regime for a history epoch's unwalled stage of that size,
   beside the base's preset, era row and shanty toggle) — small growth strings out along the main roads, larger growth
   fills between them (FTG's configured suburb stage, `research/findings/ftg-docs-params.md` §1.4 *Suburb-stage
   parameters* and §2.7 *Suburb stage*, is the emulation reference for the regime's form; J-V6.18). The rich-residual
   stage above is always `ribbon`.
4. **The stage.** §4.11's grow path from S5 on — S5a's boundary grown from the previous one for the stage's households
   at their bands' plot areas, S5b's gate law, S5c with the built-face legality, S5d — then S6–S13 on the new faces (S7b
   (1)'s district supply term included, item 105 (g): the old districts' standing members count as providers already
   allocated), the `afterGrowth` participants on the new faces only. A new stage's own main roads (S5b) may take a viaduct
   from the base's raised-way solver in the same epoch; S5b reads the same `RaisedWayLedger` as the pass — keys, uniforms,
   caps and suppressions (item 290) — so one epoch never exceeds a cap. The stage's S10 and S11 level its terraced
   faces and raise their retaining walls (V06 §3.19.4) and cut its deck faces (V06 §3.19.5). Land never shrinks the frame
   (§4.11 *The rung at an epoch*).
5. **Crowding itself** is siting tier (5″) (V06 §3.8): before this phase, households of the crowding bands relet up,
   dwelling by dwelling in the solver's score order, to ⌈band row × `growth.crowdFactor`⌉ and never above §2.6's
   capacity, while `C` stays below `growth.crowdShareMax × H`. The rich do not crowd.

### 3.7 Fortification — new circuits, old rings, shorter rings

**3.7.1 A new circuit, and the suburbs absorbed.** Evaluated once, when the growth phase grows a stage — on a
dossier-bound document only when the dossier gate admits one (V06 §3.7.6 (4)). All must hold:
`threat ≥ walls.threatMin` (the slice's; DR2 for a dossier); the share of households outside the outermost enceinte —
the new stage's counted — `≥ walls.extramuralShareMin`; the town's household-weighted mean prosperity `≥
walls.prosperityMin` (walls cost money); the youngest enceinte's creation (its lifecycle's `since`, read to a week through
its `EpochRecord`) at least `walls.minIntervalYears` ago, or no enceinte at all; and the era row admits walls (S0's walls
toggle rows, §4.2). Then the circuit fires when `u < 1 − (1 − walls.chancePerYear × eraFactor)^years`, `u` the first draw
on `stream(EVO_GROWTH, town root)`. The circuit's creation event records the four conditions' values as its why rows
(`detail.why`, item 265: `walls.threatMin` with the threat, the extramural share, the prosperity mean, the years since the
youngest enceinte), which the `enceinte` provider reads (V06 §4.5).
A circuit makes the new stage a walled ring with `placement: 'aroundAll'` — it encloses every earlier stage **on its
approachable arcs** (item 106 (a): barrier arcs close the circuit and are not walled, V06 §3.7.6 (1)), so the suburbs
between the old outermost ring and the new one are **absorbed** (S5a's trace by the registered `EnceinteStrategy`, S7's
furniture). The stage's land is widened, **on the arcs the trace walls only**, so that the new ring's inner strip lies
wholly on new land: `t_k` (§4.4 S5a) is raised on those arcs until the lattice distance from every existing footprint to
the boundary is at least the strip's width + `growth.ringBlockM` (40 m, one block depth; our own) — the built-face
legality then never binds on the trace; barrier arcs keep the stage's own boundary, so the boundary is never pushed into
the sea or over a cliff. The absorbed districts' context changes (`extramural` false); the character step (i) re-types their kinds past
the identity's hysteresis (item 72) and the exposure field drops its extramural term for them from the next epoch. The
old outermost ring enters its pathway with cause `superseded` (V06 §3.7.2). F-WALL's ladder (§5.2) binds the trace; a trace
that fails it leaves the stage unwalled, the circuit re-evaluated at the next growth (reported).

**3.7.2 The pathway of a superseded ring** (the owner: "a wall might move over decades being deconstructed into a road as
they build a newer outer ring"). At supersession: `neglect` on the ring (existence `abandoned`), `Enceinte.supersededBy`
set (base), and `pathway = { since: week, cause: 'superseded', fate, eligibleWeek }`: `fate` = `keep` while `threat ≥
walls.keepThreat`, else drawn from `walls.fateWeights` (`road` 0.7, `absorb` 0.3) on `stream(EVO_FORT, enceinte)`;
`eligibleWeek = since + round(52 × y)`, `y` drawn uniformly in `walls.roadAfterYears` [30, 80] or `absorbAfterYears`
[20, 60]. A `keep` is re-drawn once, the first epoch its threat falls below `keepThreat`. Each epoch the `fortification`
phase then, for every ring with a pathway and not locked (address order):
1. **Gates open.** Each gate of the ring, from its drawn `walls.gateOpenAfterYears` (its first draw on `stream(EVO_FORT,
   gate)` keyed with the pathway's epoch), at `walls.gateOpenChancePerYear` (0.15) → `gateToJunction`, with a square when
   three or more primaries meet there (a gate market).
2. **Stretches dismantled.** The trace is cut into `walls.dismantleStretchM` stretches from its first tower in address
   order; each not yet dismantled, at `walls.dismantleChancePerYear × min(1, 0.2 + demand ÷ yield)` (the salvage demand in
   its haul radius against its yield; our own floor 0.2) → `dismantle` with the stretch (its run of the ring's `condition` → `dismantled`, item 575), crediting the ledger (§4.11 *Salvage*); charged to the `fabric` cap of the district the stretch's
   midpoint lies in. A stretch "not yet dismantled" is one whose run of `condition` is not `dismantled`. A stretch that
   holds a raised gate whose deck stands is no candidate, filtered before the draw (J-V6.7), until that raised way is
   removed or its crossing span `dismantled` (V06 §3.7.6 (5)).
3. **The end.** From `eligibleWeek`, with `threat < keepThreat`: `road` → `wallToWay` (§4.11, its clearance with
   lifecycle events; its dossier-backed uses relocated first); `absorb` → `absorbWall` (V06 §2.8): the chain's `wall` role
   rows are removed; its strips' setback and glacis lines are removed so the strips merge into the blocks beside them, and
   S10's incremental re-cut cuts plots on the freed land with the neighbours fixed (§4.7 S10 (7)), writing `plot_line`
   rows keyed to their plots where plots meet the old line (§2.2's registry) — the backs of the plots now meet on the old
   line; the `Enceinte` takes existence `cleared` (cause `convert:absorbWall`) and keeps its name in its record; the remaining
   runs keep their `condition` on the `cleared` record, their towers and gates with them (item 575 draws a `dismantled`
   run's towers as trace discs), and step (2)'s dismantling continues on them — the fortification phase keeps the cleared
   record in its loop — until every run is `dismantled` but a stretch holding a raised gate under a standing deck
   (V06 §3.7.6 (5)); a tower or a gate is no building and never a pool candidate (item 575; J-V6.112;
   V06 §3.5.2's exclusion of enceinte walls from the pool stands). Neither fires on a ring that is
   itself the innermost enceinte of a castle or a citadel (`kind` `citadel` or `bailey`), which keeps its `keep` fate.
The ring road takes its name from S13a with the naming feature `formerWall` (V06 §5.2). An absorbed wall draws no label;
its cleared record and lifecycle are what the `enceinte` provider reads for the clerk's answer ("the old wall ran along
these plot backs until year N", V06 §4.5).

**3.7.3 An outermost ring in long safety.** An outermost, unsuperseded ring whose `threat ≤ walls.neglectThreatMax`
has held for `walls.neglectAfterYears` (read from the epochs' slices, §2.9's `EpochRecord`s; counted from the later of
the low threat's start and the ring's last lifted neglect, V06 §2.8's no-stretch `repairWall`) enters its pathway with cause
`neglected` and fate `keep`: `neglect` at once; its gates open as in V06 §3.7.2 (1); its stretches are `breach`ed (each a `breached` run of the
ring's `condition`, item 575) at `walls.breachChancePerYear` in the strike pool's `fabric` cap (base rate `wall` 0.05 as the stretch's weight factor). It
takes no final conversion (a neglected ring decays; only supersession or a hand edit makes a road of it; J-V6.13).

**3.7.4 A shorter ring** (item 8 (a); the owner: "a shorter new ring"; under item 106's closure and water rule, V06
§3.7.6 (1)–(2)). An enceinte whose intramural occupied-plot share
(occupied plots inside it ÷ all its plots) has stayed below `contract.occupiedShareMax` since `Enceinte.underuseSince`
(item 254: written by this phase when the share first falls below, cleared when it rises above) for `contract.afterYears`,
while `threat ≥ contract.threatMin`, contracts at `contract.chancePerYear` (first draw on `stream(EVO_FORT, enceinte)`
after the pathway draws). The trace:
1. The region: the `T`-level set (§4.4) inside the ring holding `contract.coreShare` of its households; **while the
   town's harbour use is live, united with its quay frontage (every live quay, landing, harbour basin edge and water gate)
   and the shortest way-graph path from the core to it**; then `contract.marginM` (40 m) added.
2. The line: the registered `EnceinteStrategy` traces the region's boundary under item 106's barrier closure (only the
   approachable arcs walled, each stretch's ends anchored on its barrier with a tower) on the S3 lattice with the cost field of the
   built-face legality (§4.11): an edge through an occupied footprint is impassable, one through a vacant, ruined or
   cleared footprint or along a plot boundary or back lane costs the lattice's low rate, one along a way corridor the
   middle rate — so the new ring runs through the empty and the ruined and along plot lines, never through a lived-in house.
3. Its strips clear only vacant, ruined or cleared buildings (`demolish`, cause `convert:contractWall`); a strip that
   would reach an occupied one, or a trace that leaves a live quay unreachable through a gate or an open front, widens the
   margin by 20 m and retraces, at most three times; then the contraction waits for the next epoch, reported
   (`walls.waited`; never forced).
4. `contractWall` (§4.11) builds the new ring with gates where primaries cross it (S5a, S7); the old ring takes
   `pathway = { cause: 'contracted', fate: 'keep' }` and decays by V06 §3.7.3's breach and V06 §3.7.2 (2)'s dismantling. The plots
   between the two rings are extramural from then on (the exposure field's term).

**3.7.5 Renewed threat.** A ring with pathway cause `neglected` or `contracted` whose threat rises back to
`walls.threatMin` is repaired: `repairWall` (V06 §2.8's union; item 209) on each `breached` run of the ring's `condition`
(item 575; J-V6.112), in chain order from the trace's first vertex, each drawn at its effective week with
no Works (J-V6.31, J-V6.90: the base's `Works.target` is a building or plots) — the run's towers and gates stand again with
it, a tower or a gate carrying no state of its own (item 575) — `fabric` cap charged — runs beyond the cap wait, in chain order, first in line next epoch; the
pathway is cleared when no run is `breached`, and the record's lifecycle returns to its former state when every run is
`standing` (item 575); **in the batch that clears the pathway** — also when no run was ever breached — a `repairWall`
with no stretch (V06 §2.8; cause `rule:threat`) lifts the ring's `neglect` where its lifecycle holds one not yet lifted:
in use again (its pre-neglect existence) when every run is `standing`, `decayed` while a `dismantled` run remains. So
a ring whose pathway is cleared is never `abandoned`; a contracted ring that was never neglected takes none, its
lifecycle being the stretch repairs' (J-V6.115). Counted `walls.backInUse`, chronicled `wallManned`. A `dismantled` run is not rebuilt (its stone is gone); a gap stays a gap until a hand `drawWall`
closes it (a hand `repairWall` on it bends to that `drawWall`, V06 §2.8).
**A ring in use with a breach** (J-V6.110). A ring with no pathway whose `condition` holds a `breached` run while
its threat exceeds `walls.neglectThreatMax` — a landfall's breach (V05 §3.16 (4)) or a hand `breach` — is repaired at the
next `fortification` phase by the same op and order: `repairWall` on each `breached` run in chain order, no Works, its
towers and gates standing again with the run (item 575), the `fabric` cap charged (runs beyond it wait, in chain order). A `dismantled` run stays a
gap (J-V6.16); a locked or pinned ring is held (V06 §3.1). A ring in use whose threat is at or below
`walls.neglectThreatMax` is not repaired by this rule: its threat's rise past that bound repairs it at the next phase,
and its long safety enters V06 §3.7.3's neglect, whose renewed threat is the rule above. Counted `walls.repairedInUse`.

**3.7.6 Barriers, water and the dossier's walls (item 106).** Every rule of this section binds every trace the
engine makes — a new circuit, a shorter ring, a repaired or re-anchored stretch:
1. **Barrier closure on every trace.** The trace is the registered `EnceinteStrategy`'s under item 106's closure (the base's
   mechanism, §4.4 S5a): the boundary's arcs are classified by defensibility by V11's
   `walls.barriers` rows (V11 §3.16: a sheer cliff or deep water closes; a steep slope or deep marsh closes behind a light
   wall; open ground needs the full curtain); only approachable arcs are walled; each walled stretch's ends are anchored on
   its barrier with a tower; a river loop or a spur is walled across its neck only; a barrier within `wall.barrierReachM`
   beyond the stage boundary may be reached, its spare ground typed intramural gardens (106 (b)); the stretch profile grades
   the curtain by arc (106 (c)). `aroundAll` (V06 §3.7.1) means "encloses every earlier stage on its approachable arcs".
2. **Water access is a hard rule on every new ring and every contraction.** Every live quay, landing, harbour basin and
   water gate of the enclosed town stays reachable from inside through a gate or an open front. A circuit's trace that
   would cut one off gains a water gate on the arc between the quay and the water (S7 furniture) or, where the arc is a
   barrier, leaves it open; a contraction takes the harbour into its region (V06 §3.7.4 (1)). A trace that cannot hold both
   this rule and the occupied-footprint rule retraces by the margin rule and then **waits** for a later epoch, reported —
   never forced (J-V6.58).
3. **The waterfront at each epoch** (106 (d)–(f)). The fortification phase re-reads the waterfront grade from DR2's sea
   threats by V11's `walls.waterfront` rows (the highest-weight row that applies), past `dial.hysteresis`:
   * a rise to a row whose grade is `quay_wall` on a walled port turns `open` into `quay_wall` with sea gates at the row's
     quay accesses — a `drawWall` op on the waterfront arc, cause `rule:waterfront`, charged to the `fabric` cap, no Works
     (J-V6.31), chronicled `waterfront`;
   * a threat that stays below every quay-wall row for `walls.neglectAfterYears` neglects the quay wall (`neglect`; its
     pathway cause `neglected`, fate `keep`, V06 §3.7.3) — never demolished;
   * a walled port without a harbour-mouth chain gains one the first epoch its harbour mouth is enclosed: two towers on the
     mole or breakwater heads (or the shores) and a water gate across the entrance, as S7 furniture (106 (e)), chronicled
     `harbourChain`. **A tower or fort already standing at a mole head** — item 110 (d)'s placed landmark — **is the chain's
     anchor there** (one landmark, one owner); a tower is added only at a head where none stands;
   * **a removal holds**: a generated quay wall or harbour-mouth chain the user deletes carries
     `detail.suppress` (item 260; key: the enceinte and the waterfront's water body, or the enceinte and the harbour
     basin), and this rule never re-adds it while the suppression is live — the rule's condition still holding is
     reported (`walls.suppressedHeld`), never acted on; undo of the delete lifts it (V06 §3.19.3), and the user's re-add —
     Build it again's `drawWall` on the former line or `placeGate` at the former mouth — serves it while it stands
     (V06 §3.19.3 (7));
   * a `reclaim` or `shiftCourse` (V06 §3.12) of the previous epoch that changed a shoreline an enceinte's closure relies on
     re-evaluates that closure this epoch by least disruption (item 22): a barrier arc that became approachable gets a new
     stretch anchored on the old ones; a stretch no longer needed is neglected, never demolished.
4. **The dossier gate** (item 20 through DR2; J-V6.59). On a dossier-bound document the engine never adds an enceinte or a
   waterfront wall the dossier's walls records do not admit: V06 §3.7.1's circuit decision runs only when the records admit one
   more enceinte than stands (by the record's kind — palisade, town walls, city walls and gates — against the rung's ring
   rows), and then without the chance draw; a walls REPLACEMENT step (item 108, V06 §3.9.11) or a new walls record arriving
   at `dossier` triggers the circuit at this epoch's `growth` phase with the record's kind — around the stage grown for the residual
   if there is one, else around the present built boundary by the `EnceinteStrategy` through the hand `drawWall`
   operator's path (cause the dossier event; no face added, so the base's residual rule is untouched) — and the superseded
   ring enters its pathway. The waterfront grade follows (3) (DR2's sea threats are the dossier's). Contraction, neglect,
   breach and dismantling stay map facts: the records list walls, not their line.
5. **Raised ways on every trace** (item 110 (b): an aqueduct "crossing the wall through an arch"; J-V6.91). Every
   trace this section makes — a circuit, a shorter ring, a re-anchored or repaired stretch, the waterfront's quay wall —
   meets the standing raised ways by these rules:
   * a raised way's **support footprint is a footprint** for V06 §3.7.1's strip rule and is **impassable** in V06 §3.7.4
     (2)'s cost field (it is never demolished for a wall);
   * a trace crosses a raised way **only under a span over land**, never through a support, and never along its
     under-deck strip;
   * the crossing is **S7 furniture of the new ring**: for an aqueduct, a **wall opening** — an arch in the curtain, not a
     gate (no portal, no gate law); for a viaduct or an elevated road, a **raised gate** at deck
     level — a gate whose tower carries the deck, its portal on the raised part only (the part-0 way beneath, if any, takes
     its own ground gate by S5a's gate law);
   * **continuity is a hard rule**, like water access: a trace that cannot cross every raised way it meets under a span
     retraces by the margin rule (V06 §3.7.4 (3)) and then **waits** for a later epoch, reported (`walls.waited`) — never
     forced (J-V6.58's form);
   * `absorbWall` and `wallToWay` leave standing every raised way that crosses the old line; the new ring road takes **no
     junction** with it: its opening or raised gate in the old curtain stays as a free-standing arch or gate tower.
     V06 §3.7.2 (2)'s dismantling never takes the stretch that holds a **raised gate whose deck stands** — the deck's support,
     its run left as it stands, drawn by its `condition` — and takes it, by the same draw, from the first epoch after that
     raised way is removed or its crossing span `dismantled` — after `wallToWay` as after `absorbWall`, the fortification
     loop keeping the record while such a stretch stands; a **wall opening** under an aqueduct is no support (the
     aqueduct's span passes over it) and goes with its stretch (J-V6.114).

### 3.8 Regrowth, siting order and the ladder's schedule

**3.8.1 The displaced pool first.** Households a hazard, a contraction's strip, a Works, a clearance, a sealed void
(cause `void`, V06 §3.18.1 (4)) or the island step (cause `island`: a wane, a settle, a fall, V05 §3.15)
displaced this epoch are in the ledger's pool (V06 §2.1); `siting` places them first, through the same tiers (their
addresses kept; each placement a `relocate` that clears `Household.transit`; any the tiers cannot place join the growth
phase's residual `R₀`, V06 §3.6 (1), so a stage or the overflow ladder houses them within the epoch), then the roster's delta demand **less the
households taken** by `EpochOps.demandTaken` (a refloated or raised island's reservation), band by band.

**3.8.2 Inside each regrowth tier** (§4.11's (0)–(6)), candidates are ranked by §4.7 S10b's score for the household's
band (descending), ties by address:
* (0) `relet` up in standing shells below their band row;
* (1) `reoccupy` vacant buildings — a building whose `builtBand` equals the household's band first (the house was built
  for people like them) — leaving vacant, in each band, `decline.turnoverVacancy` of that band's dwellings (the poorest
  band 5 %, the others 1 %; 0 in the parity presets), the most exposed first by `E(x)`, so a steady town keeps some
  abandoned and derelict stock as FTG's poorest pools do (`research/findings/ftg-docs-params.md` §3.3 *Dependency graph*). A vacant building whose rear plots a sealed passage served is taken only after `openPassage` reopens it (the
  passage first, regrowth-first; V06 §3.5.2);
* (2) `reoccupy` derelict ones (a repair, a ledger debit);
* (3) `rebuild` or `reuse … build` on ruins, burned shells and cleared traces — the class by S10b's class mix at the
  plot's field band (item 71); the footprint kept when the class's template admits it, else S11 on the plot (the successor
  at the trace's address, §6.3);
* (4) vacant plots of the old plan beyond the band's vacancy-run share (S10 (8)) — **a vacant deck plot only to a use
  that V11 §3.24.4's per-use `deckOk` admits** (read as V06 §3.19.5 (1) states; item 110 (d));
* **A placement on a hollow way reopens it first** (J-V6.107). At every placement an epoch makes — every
  siting tier (0)–(5), the village's (6v)–(9v) (V07 §3.12), the use phase's openings and moves (V06 §3.9.5, V06 §3.9.6 and
  V06 §3.9.10's relaxation and split shop) and a dossier-backed use's relocation (§4.11 *Dossier content across epochs*, in
  whichever step empties its building) — a `relet`, a `reoccupy`, a `rebuild` or `reuse … build` (V07's house-platform
  rebuild included), a new building on a vacant or newly cut plot, a use's opening or arrival — a placement on a plot whose access
  edge (§4.7's access test) is a hollow way (V07 §3.12: a way whose `abandoned` or `decayed` existence `retireWay` or
  `effaceWay` set, its lifecycle cause) is made only after `reopenWay` restores that way in the same batch: the way
  first, regrowth-first, as tier (1)'s passage rule; no cap. Where that way reaches the ways in use only through other
  hollow ways, every hollow way on its shortest way-graph path to a way in use (by length, ties by address) is reopened
  with it in that batch, so no batch leaves an occupied plot without a path over the ways in use (§5.3; the retirement
  test's own invariant, V06 §3.5.2). A hollow way that is locked or pinned is never reopened by the engine (V06 §3.1's
  protection): a plot whose path to the ways in use needs one is no candidate at any tier, in the use phase or for a
  relocation while it holds. The reopenings are counted with tier (5′)'s in the report (`ways.reopened`);
* (5′) **the upgrade of downgraded ways and the reopening of hollow ones**: before tier (5) cuts a plot on a face
  that a `downgradeWay`d lane or a hollow way bounds, `upgradeWay` or the rows' `reopen` restores it (the old lane
  back before a new one is cut) — at every rung, whichever product's `siting` phase runs (V07's village siting calls this
  tier, V07 §3.12). A hollow way is reopened by `reopenWay` (→ `built`, its class kept; V07 §3.12, item 268) under
  any product, the op keyed to the way's own ladder, so the hollow ways of a village handed up to the town product are
  reopened by the town's regrowth as by the village's (`street.reopen` names the op for the rows' product; J-V6.107).
  Upgrades and reopenings take no cap, as the tier's placements take none (a rise is met in the epoch it arrives,
  item 8 (f)), so no cap can make tier (5) cut a new lane beside an old one; the placement rule above reopens a hollow
  way at whichever earlier tier first places on a plot it serves, and (5′) keeps its cut clause for the faces tier (5)
  cuts;
* (5) plots S10 cuts on faces the old plan left unbuilt along its street lines inside the last boundary — **deck faces
  among them**: a mole, a pier, a quay platform or a bridge deck standing in use whose deck face holds no plot (a deck a new
  stage built, a deck `repairRaised` restored), cut by S10's deck rule within the deck's width under V11 §3.24.4's `deck` table as
  V02 §3.16 reads it, its buildings only for uses that V11 §3.24.4's per-use `deckOk` admits (the use's effective crypt
  first, then its class's column) — a deck slot a live removal
  suppresses is skipped and counted held (V06 §3.19.3 (7), V06 §3.19.5 (1));
* (5″) **crowding** (V06 §3.6 (5));
* (6) new faces — the growth phase (V06 §3.6), where, as the base orders it, the underground crowding hook first sends
  `crowdingShare` of the residual's poorest-band households underground (to accessible capacity only; item 574) before any stage is
  decided (V06 §3.6 (1)).

Tiers (5′) and (5″) are this strategy's own tiers between the base's (5) and (6) (item 336).

**3.8.3 Informal clusters in decline.** A vacant, cleared or ruined plot of a district whose value fell past the
hysteresis at the epoch takes tenure `informal` (§4.11 *Informal clusters over epochs*) only when the overflow ladder
(V06 §3.6 (2)) or the poorest band's delta demand needs it — the engine never makes a cluster without households for it.

**3.8.4 The ladder's schedule (step (d)).** Due blocks in address order; per block the base's rungs (§4.11 *Survivors*)
in rung order 1, 2, 3, each op charged to its cap kind (`geometry` for rung 3's re-cuts and rebuilds, `fabric` for
rung 1's infill); a block that exhausts its per-block maximum waits. **Rung-3 triggers the engine supplies:** vacancy
(the departure matching's emptied plots), ruin (the strike pool's), a destructive event (this epoch's `burn`, `topple` and
flood collapses: each struck plot eligible for rung 3 from the event's epoch on), and redevelopment — the engine issues the
base's redevelopment composite on a due block growing rich only where rung 3's years in the band have run (the ladder
table) and the purchase's relocations fit the `use` cap. After the rungs, the `MutationPlan` steps that fall due run
(V06 §3.10). **On terraced and deck ground** (item 110 (a), (d); V06 §3.19.4–§3.19.5): a rung-3 `subdivide` or
`amalgamate` keeps every `RetainingWall` as a fixed plot line (S10 (7)'s neighbours-fixed form) and refuses an
`amalgamate` across one; on a deck plot no rung-2 `densify` of either form (no yard; no `back_court`) runs, a `relet`
stays within the deck building's capacity, a `MutationPlan` step and a `rebuild` run through S11's capped mutator (V02
§3.16 (3)), and a rung-3 re-cut keeps the deck plots inside the deck's width.

### 3.9 Uses that move (item 17), the siting rulebook over time (item 103) and custom content (item 104)

The `uses` phase runs once per epoch, after the field and the island participant (V06 §3.2), on the households standing
at the epoch's start: departures come later in the base's order, so a use's catchment is judged with a one-epoch lag,
which the strain memory below absorbs (J-V6.8). It is §4.11's use step (1)–(6); this section fixes its order, its
counts, its memory and what it records.

**3.9.1 Counts — the manifest is the truth for generated uses, the dossier's records for their own (items 20, 108).**
For every roster class `c` with a use (§10.2's `BuildingClassRow.use`), `N_c` = its count in the manifest at the epoch's
target (S2's roster, prefix-stable). Two cases:
1. **No dossier record covers `c`.** `D_c` = its live dossier-backed single uses (never closed by this phase; item 20);
   `L_c` = its live other uses. The **surplus** is `max(0, L_c − max(0, N_c − D_c))` and the **deficit** `max(0, N_c − D_c
   − L_c)`: with a dossier the roster fills only what the dossier does not list (item 20 (h)), so `N_c − D_c` is the
   generator's own share.
2. **A dossier collective record `R` of step type COUNT, QUARTER or GUILD covers `c`** (its member class is `c` by V11's
   `dossier.ladders`, V11 §3.12; item 108 (a)). The record **owns** `c`'s members (108 (c): our roster's own per-capita
   members of that class ARE the record's members):
   * its member target is `M_R = clamp(perCapita_c(target), R.range)` — S2's per-capita count of `c` at the epoch's target,
     clamped into the record's numeric range, else into the range V11 §3.12's rung rule gives (at a village rung V07
     §2.4's row for its step type and member class, J-V7.105; 108 (b));
   * the generator owns no use of `c`: `L_c` = 0. A standing generator use of `c` is **re-bound** to `R` — an `assign` of
     the use to `R`'s next free member key `#k` (J-A74.73), no move, cause `rule:ladder` (108 (c)); re-bindings take no cap
     and are counted `uses.ladderRebound`;
   * the surplus is `max(0, |members(R)| − M_R)` and the deficit `max(0, M_R − |members(R)|)`: members above `M_R` are map
     facts and close by 3.9.4's order under J-V6.24's cap; members below it open by 3.9.6 as `R`'s next keys. The use
     phase **never closes members `#1 … #min(R.range)`** (the dossier's lower bound) **nor a member the dossier names
     individually**;
   * several records covering one class (a numbered record and a QUARTER, item 108 (a)) share it by the base's rule: the
     QUARTER record's district holds its raised share (item 72) and the COUNT record owns the rest; a class member counts
     once (108 (c); T-V6-45).
   So a record "Blacksmiths (3–10)" has as many smithies as S2's per-capita row gives at the epoch's population, never
   fewer than three and never more than ten, rising and falling with the town (the owner: "5 to 10 individual blacksmith
   buildings that scale according to population size"), and no generator smithy stands beside them (J-V6.57).

**3.9.2 Strain — the memory (`Use.strain`, item 429).** For every live use in address order:
* **demand ratio** `ρ = H(u) ÷ h_c` — by **nearest-provider catchments** (item 107 (c): several providers split their
  consumers): one **labelled** multi-source Dijkstra per class per epoch over the way graph (§12.6's cost unit), its
  sources the class's live uses each labelled with its own id, bounded at `serviceRadiusM`, gives every household's
  dwelling its nearest use of `c` within the radius; `H(u)` = the households labelled `u`; `h_c` = the town's households ÷
  `N_c` (the town-average catchment of one use). A class with `N_c` = 0 has `ρ` = 0. A split pair's shop is the class's
  provider for this count, its works none (V06 §3.9.10 (3)).
* **supply**: a `hard` `SupplyEdge` of `c` whose resource has no live provider (a use of a producing class, a resource
  site, a chain node, an import store) within its `maxDistanceM` by its mode.
* The strain is set to `{ kind, sinceWeek: week }` when `ρ < closeShare` (kind `demand`) or the supply fails (kind
  `supply`) and none is present; its kind is updated (its `sinceWeek` kept) when the other condition takes over; it is
  cleared when neither holds. Each write is a `setAttr` op on `Use.strain` (author `engine`), so it has the epoch's undo
  and a user can clear it by hand ("give this shop time").

**3.9.3 Closing a failing use.** A use that is neither dossier-backed nor pinned closes (`closeUse`, `leave: 'vacant'`,
cause `strain`) when its strain has lasted `closeAfterYears` (demand) or `starveAfterYears` (supply) — `(week −
strain.sinceWeek) ÷ 52` against the class row (item 429 reads these rows in years). Strain closings take no cap: their
lag is the strain's years. The building stays, vacant (the first rung of the decline ladder), its former use in
`formerUses` (§4.11 (5)); a live-in owner's household stays as an ordinary household of its building. A split pair
(V06 §3.9.10 (3)) is one institution: its strain is the shop's demand and the works' supply, and closing it closes both
uses in one op.

**3.9.4 Closing the surplus.** When the manifest falls (`surplus > 0`), that many uses of `c` close (cause `surplus`), in
the order `uses.closeSurplusBy` states: the longest-strained first, then those in the most over-served coverage unit
(item 103 (f): the highest served-to-target ratio), then the lowest present score, then address. Dossier-backed single
uses, a record's protected members (V06 §3.9.1 (2)) and pinned uses are never chosen (a pinned one that would have been
is counted `heldByPin`). Surplus closings are charged to the
district's `use` cap (§4.11 *Churn*), and the rest wait in that order: shops outlast their customers for a while as a
town shrinks — the lag on the way down (item 8 (f)).

**3.9.5 Moving a thriving use.** Every live, unpinned use that is not closing this epoch (dossier-backed ones included —
§4.11 *Dossier content across epochs*: their moves by inertia are any use's) is re-scored in address order against a
**snapshot** of the scores taken at the phase's start — except that a use whose bound providers or consumers a committed
op of this phase changed is re-scored on the committed state before its turn (V06 §3.9.10 (1)), so the result depends on
the visiting order only through committed moves, which re-bind (J-V6.25, J-V6.54). **Never moved by this rule**: a
church-family use whose plot holds a churchyard, and a `singular` use (§4.5 S7b's one-off anchors — the cathedral, a
see's seat, the castle's keep); they close only by surplus, strain or the dossier, and a see moves only by the dossier, by
its building's ruin or demolition, or by a rung crossing that opens or closes its class (J-V6.66: consecrated ground and a
see do not move by trade; a moved churchyard would freeze its catacomb and orphan its crypt):
1. **Candidates** — the plots of its catchment (its district and the neighbouring districts, united with the plots within
   `serviceRadiusM`) that hold a vacant building, a cleared or ruined trace, or no building, that are not reserved,
   locked, pinned, informal with structures, or a dossier-listed ruin, and whose building S11's compatibility table can
   bring to `c`'s designation (§4.7 S11 (1)) — **a deck plot only when V11 §3.24.4's per-use `deckOk` admits the use**
   (read as V06 §3.19.5 (1) states; item 110 (d)), so a dossier-backed use carrying a crypt record (a bridge chapel with its
   crypt) is never moved onto a deck plot. A candidate whose access runs over a hollow way is scored as any
   other; the winning placement reopens that way first, in the same batch, with every hollow way on its path to the
   ways in use (V06 §3.8.2's placement rule); a candidate whose path needs a locked or pinned hollow way is none.
2. **Score** — the registered `PlacementSolver`'s score for `c` at the plot (§4.7 S10b), which already sums, with the
   prosperity field (item 102's daylight driver in it) and the neighbourhood character (item 72): item 103's relation
   families, signature pairs and coverage pull (`cov/<class>`); item 102 (d)'s sunlit-side preference; item 105's two-way
   link term under the class's orientation, with item 107 (b)'s comfort plateau (full within the good's `comfortM`) — the
   use's links to its nearest providers and, for a provider, the pull toward its bound consumers' weighted centre; item 107
   (d)'s same-kind `far` row inside a district (`spc/<class>`); a custom chain's edges among the links (item 104 (b), (h));
   and the controlled chance, drawn on `use.relocate` from the use's stream for the epoch (§6.1). The present plot is
   scored the same way, with its own candidate's chance draw.
3. **Decision** — the use's **first** draw on `use.relocate` for the epoch is its move-chance gate: only when it falls
   below `1 − (1 − moveChance)^years` are its candidates scored (each candidate's controlled chance drawn after it, in
   candidate address order), and then the best candidate `a*` wins when `score(a*) − score(present) > inertia` — both
   conditions as before, the gate first so that a use that will not move costs no scoring (J-V6.68). The move is charged
   to the district's `use` cap (§4.11); a move
   the cap refuses waits, the waiting ones ordered by their gain, first in line next epoch. A candidate an earlier mover of
   this phase took is skipped for the next best.
4. **Op** — `relocateUse(use, a*)` (§4.11); when the destination building's designation differs, a `MutationPlan`
   (V06 §3.10) spreads its mutation over epochs; a live-in class brings its owner household (a `relocate` of it into the
   destination's residential slot); the vacated building keeps the former use in `formerUses`.

**3.9.6 Opening what the manifest lacks.** Deficits open, class by class in **item 105 (f)'s order**: the anchors fixed
(terrain resources and outside classes at S12a's sites, the markets, gates and harbour — never opened here); then S10a's
field-driving classes; then source-oriented classes by depth from their resources (a topological order over the class
supply graph, a loop broken for the order at its lowest-weight link, ties by class id); then balanced; then
market-oriented (orientation per V11 §3.7.3). Each opening runs the solver town-wide over the candidate set of 3.9.5 (1)
— scoring, for each opening, the top `uses.openCandidates` (64) candidates by S10a's class raster at their centroids, then
the full score, deck plots only where V11 §3.24.4's per-use `deckOk` admits the opening use (its effective crypt first,
then its class's column), a candidate on a hollow way scored as any other and its winning opening
reopening the way first, in the same batch (V06 §3.8.2's placement rule) — with the coverage served counts **recomputed after every committed opening and closing** of the class (so a closure's
gap raises the pull at once, and successive openings spread across unserved units — through the pull, never as a quota;
items 103 (f), 107 (a)); a building whose `formerUses` holds `c` takes the class row's `inertia` as a bonus (the former inn
reopens as an inn first, §4.11 (5)). A use a fire closed this epoch (V06 §3.11.2 (3)) counts in its class's deficit here
and reopens by this rule with that bonus. **An always-crypt class** (V11's cathedral and great-temple rows) opening into an
existing building admits only buildings whose basement region can hold the always class's `cryptM2` (V11; V06 §3.18.3
(5)); where none can, the best-scored candidate is taken and volume 3's rank trims the others (never below their vaults). Each opening is an `openUse` (cause
`demand`, or `coverage` when the coverage pull is the largest contribution), with a `MutationPlan` when the building must
change; its `Use` is minted with the town root as derivation unit, the phase's stage id, the epoch and its ordinal in the
phase's opening order as creation index (§6.3). Openings take no cap (new demand is met in its epoch, item 8 (f)'s "no
lag on the way up"). A use that closed for strain this epoch while its class has a deficit is therefore replaced where
the solver now scores best — "shops close where their customers have gone and open again where people now live" — as a
new business, not the old one moved (J-V6.23). **Claim-sized classes at a village rung** (V07 §3.12 *Markets, halls and the fair over epochs* (c); J-V6.119): a `cloister`-family class, or a `market-hall`-family
class without a `nearMarket` row, opening at an epoch whose rung is a village rung — a roster member in this `uses` step; a
record through the product's `records` placement in the `dossier` step (V07 §3.12 (c)) — takes a candidate plot only with its
vacant neighbours (a vacant building, a cleared trace or no building) joined to it by S10 (7)'s join law — V06 §3.8.4's
`amalgamate` form, neighbours fixed, never across a retaining wall, the joins charged to the district's `geometry` cap
for a roster member (a candidate whose joins the cap's remainder cannot hold is none — §4.11 *Churn*: candidates
beyond a cap wait); a record's joins (the product's records placement, at an epoch or an absorb) are its dossier event's
disruption, charged to no churn cap, bounded by the request kind's `DisruptionBudgetRow` and reported over budget, never
refused (§7.7 item 5; J-V6.123; V07 §3.12 (b), (c) cite it) —
up to V07's `rules.claimArea` for the family (`claimArea.cloister` at its band, or the hall area `A_h`, V07 §3.6 (4a));
a candidate that cannot be joined to that area is none; the join, the `build` and the `openUse` are V07 §3.12 (b)'s ops.
With no such candidate the opening is V07 §3.12 (c)'s: an outside plot of that area on the nearest hinterland face
adjoining a road beyond the perimeter, cut by V07's `village.outsidePlot` (the hinterland unit's S10 in its incremental
form, S11's `build`, `openUse`), else a roster member waits in its deficit for the next epoch, reported (a record never
waits: V07 §3.12 (c)'s last rung). A `market-hall`-family class with a `nearMarket` row, and a `fair_ground`, are placed
by V07 §3.12 (a) and (b) — a roster member in V07's siting step (m), a record by `village.records` in the `dossier` step — never here.

**3.9.7 The "why" rows.** For every opening, move and closing the phase writes, on the `open`, `relocate` or `close`
lifecycle event itself, `detail.why` — the solver's top `uses.moveWhyRows` contributions to the winning score (row id,
family, share), as the solver's explain mode returns them (§4.7 S10b; the rows are V11's), a supply-web link being a row
of family `link` with its good and the address of the use at its other end (item 105 (j)). They are model data
(item 265): they survive a save, a load, a rebase and an export. The report's `UseMove` rows are read back from them; the
clerk's "why is this here" (volume 10, through V06's `use` provider, V06 §4.5) and the siting panel (volume 9) read them, so
the answer names the rows that pulled, never a paraphrase.

**3.9.8 Custom content over epochs (item 104 (e), (h) (7)).** A custom institution is dossier-backed: never closed here,
moved only by 3.9.5 or relocated before a step empties its building (§4.11). Its resolved siting profile is the base's
pure function (104 (a)); a new revision (a changed content hash) arrives as a dossier event and is re-resolved and
re-sited by least disruption at step (e) — not by this phase (104 (e)). Over epochs this phase adds three rules:
1. **An inactive chain pulls nothing.** When a chain loses a node (a dossier event at step (e) of this or an earlier
   epoch), its remaining nodes keep their sites and its edges leave their scores from the next epoch; they then drift, if
   at all, by 3.9.5's inertia like any use (104 (h) (7)).
2. **An active chain moves by its anchor.** When a chain's upstream anchor — its resource node's site (a spring, a quarry,
   a deposit) or its import store's gate or quay — changes (a `DepositSite` depleted or discovered, §4.11 *Lights, deposits
   and conditions*; a terrain-and-water op; a new gate facing the partner), the phase re-sites the chain's in-town nodes
   in item 105 (f)'s order (source-oriented nodes first) by the solver's `dossier` request within the same epoch, least disruption first, outside the `use` cap
   (as a dossier-backed relocation is), each move a `UseMove` with cause `chain`. Otherwise nodes move one at a time, and
   a downstream node sees an upstream node's new site at the next epoch's snapshot — the one-epoch lag every use has.
3. **Toggling returns.** A chain switched off and on keeps its nodes where they stood (1) and the re-activated edges only
   raise their present scores, so with nothing else changed no node moves (104 (h) (8)'s bar; T-V6-14).
4. **Close at street scale, a quarter only by emergence or declaration** (item 104 (h) (3) with item 107 (e)). A chain whose
   in-town nodes lie within their links' comfort distances is close at street scale — that is all the engine seeks. It is
   **named a working quarter only** by the character step (i) when item 72's quarter-identity threshold is crossed in the
   district that holds it, or by a dossier record (a district-defining record, a ladder QUARTER record) or an author's
   declaration; the engine never assigns a district to a chain or a trade, and the chronicle's `rename` line records a
   quarter that emerges (J-V6.56).

**3.9.9 The use step's defaults by clientele.** Item 103 (a) gives every class a clientele family; a class row that
states no `useRules` of its own (V11 writes none by default; a class row may) takes this table's row (our own values, calibratable, §13.9; the years
are read on the weekly clock):

| clientele | `serviceRadiusM` | `closeShare` | `closeAfterYears` | `starveAfterYears` | `inertia` | `moveChance` (per year) |
|---|---|---|---|---|---|---|
| daily-local (bakers, cookshops, alehouses, chandlers) | 400 | 0.50 | 5 | 3 | 0.15 | 0.10 |
| town-wide (guild crafts, merchants, markets' trades) | 1 200 | 0.40 | 10 | 5 | 0.25 | 0.05 |
| travellers (inns, stables, farriers, money-changers) | 800 | 0.40 | 8 | 5 | 0.20 | 0.08 |
| elite (goldsmiths, physicians, luxury trades) | 1 500 | 0.30 | 15 | 8 | 0.35 | 0.03 |
| clandestine (fences, thieves' dens, smugglers) | 800 | 0.30 | 10 | 5 | 0.30 | 0.05 |
| institution (civic, sacred, martial, charitable) | 2 000 | never by demand | — | 10 | 0.50 | 0.01 |

`inertia` is in the solver's score units — the score of one soft row of weight 1 fully satisfied — so 0.25 means a new
site must beat the present one by a quarter of such a row. A concealed use relocates by these rules and its front stays an
ordinary business (§4.11 (6)); a market's square outlives its institution (§4.11 *Markets over epochs*).

**3.9.10 The supply web over epochs (item 105; J-V6.54, J-V6.55).** The web's base mechanism — links derived at every
placement, the two-way pull under the class's orientation, several outputs, one output feeding several chains, hubs, the
district term, split sites — is the base's (§4.7 S10a/S10b, §4.5 S7b (1)) with V11's rows (`siting.web`,
V11 §3.7.4; the goods table, V11 §3.7.1). Over epochs:
1. **Links are derived, never stored, and re-bound after every committed use op.** After each committed `openUse`,
   `closeUse` or `relocateUse` of the use phase, S10b's nearest-provider binding (105 (a)) re-derives the links of that
   class's members and of the members of the classes it supplies and is supplied by; any not-yet-visited use whose bound
   provider or consumer set changed has its snapshot score recomputed on the committed state (3.9.5). So when a provider
   closes, every former consumer is bound to its nearest live provider by the end of the same epoch (T-V6-41), and a link
   pulls both ends: a consumer toward its provider, a provider toward its bound consumers' weighted centre. The count of
   re-bound links is `uses.rebound`.
2. **Openings in 105 (f)'s order** (3.9.6), then **one relaxation pass**: over the two-way classes (orientation `balanced`
   or with a reverse pull) any of whose uses opened or moved this epoch, at most `siting.web.relaxPasses` (V11 §3.7.4's cell) passes;
   a pass re-scores each such use with the full provider and consumer bindings and moves it only where the gain exceeds
   `siting.web.relaxGain` (V11 §3.7.4's cell) **and only to a candidate inside its own district** (3.9.5 (1)'s set, its
   placement rule included: a move onto a plot on a hollow way reopens it first); each move is a `relocateUse`,
   cause `relax`, charged to the district's `use` cap and drawn on `use.relocate` from the use's epoch stream; the second
   pass runs only if the first moved something, over the uses the first pass's moves re-bound (T-V6-42). Counted
   `uses.relaxMoves`.
3. **Split sites over epochs** (105 (h)). A split pair is one institution: the works `Use` and a shop `Use` whose
   `branchOf` names the works. The phase scores the works by its nuisance and input rows and the shop by its output and
   clientele rows, and each moves separately by 3.9.5; closing the institution (strain, surplus or the dossier) closes both
   in one op; undo restores both. **Split**: at the first epoch an unsplit live use of a class whose row declares `split`
   has a split index (the base's: its nuisance push-out and its dominant perishable or retail output's pull-in, as S10b
   computes it) above its class's compiled `profile.split.threshold` (V11 §2.3; V11 §3.7.4's `siting.web.splitThreshold` only the
   default a class without its own takes, V11 §3.5.2), the phase opens the shop on the best-scored candidate plot (3.9.6's set, a hollow way on its path reopened first by
   V06 §3.8.2's placement rule) as a `branchOf` use (cause `split`, charged to the `use` cap). **Merge**: when a pair's index falls below
   the class's threshold less `uses.splitHysteresis` (V06 §2.2), the shop takes a `closeUse` (cause `merge`), its plot left vacant, and
   the institution is whole on the works' plot again. **A split with no threshold** (J-V6.113): a generated pair whose
   class's view carries no `profile.split` — V11 §3.7.4's `splitEnabled` set false, or the class's split row removed, by a
   table edit mid-history (V11 §2.10's switch row keeps placed uses, J-V11.14) — merges at the next `uses` phase by the
   same op (the shop's `closeUse`, cause `merge`, charged to the `use` cap, pairs beyond it waiting in address order,
   first next epoch), and no split opens while no threshold is in the view; an author's declared split (V11 §4.2)
   stands. An author's merge-back declaration (item 104 (a) (1)) holds the pair
   merged and suppresses the split. The parity presets split nothing (T-V6-43). Counted `uses.splits`, `uses.merges`.
4. **The district supply term** (105 (g)) is read by S7b (1) wherever an epoch allocates classes to districts — the
   `siting` phase's new-plot tiers and the `growth` phase's new stage (V06 §3.6 (4)) — with the old districts' standing
   members counted as providers already allocated, so chance does not split a chain across the town as it grows.
5. **SettlementForge's `activeChains` at each epoch** (105 (i)). A change to the dossier's `activeChains[]` arrives in
   `EpochInputs.dossier` (V08 carries it). At the `dossier` phase the named processors are resolved to their bound members
   (kind family, research/sf/mapping.md row 46) and the chain's links are bound between them; a chain whose status changes
   weakens or restores its links by V11 §3.7.4's `chainStatus` weight for the chain's neutral status key (V08 §2.6's
   `chainStatus` word row maps SettlementForge's words onto the keys) from the next `uses` phase (a link's weight
   × that weight in S10b's term); an `entrepot` chain's ends are item 104 (b)'s import and export pulls (V11 §3.7.4). The
   engine never writes `activeChains` (item 20).
6. **Explanations.** A link that pulled a use is a `detail.why` row of family `link` (3.9.7), so the clerk names the
   goods and the other ends (105 (j)); an author's pinned, moved or cut link (a map-side declaration, 105 (j)) is honoured
   by the re-binding in (1) as S10b honours it.
With the web's off form applied (V11 §3.7.4's named cell set, equal to the parity presets) an
epoch is byte-identical to the history without item 105 (T-V6-44, the no-op pin).

**3.9.11 Institution ladders over epochs (item 108; J-V6.57).** The ladder table and its step types are V11's
(`dossier.ladders`, V11 §3.12); the counts are 3.9.1 (2)'s. A ladder step in SettlementForge reaches the map as a dossier
event at the `dossier` phase — the greater record appearing with a `promotedFrom` receipt, or the lesser with a
`demotedFrom` receipt (J-A74.73 re-binds the key) — and is applied by item 22's least disruption:

| step type | what the epoch does |
|---|---|
| COUNT | the record's members are re-counted by 3.9.1 (2) at this epoch's target: an upgrade keeps the lesser's building as member `#1` and opens the rest at the next `uses` phase; a demotion keeps the member nearest its demand (the highest `ρ`) as the single lesser and closes the rest by their fates (item 17: vacated, the formerUses kept) |
| QUARTER | a district-defining record: the character step (i) sets the quarter identity for the record's district (item 72, its raised share), and the record owns the trade's members inside the district and, by the class's ordinary spread (item 107), outside it (V01's quarter record owns its members) |
| GUILD | one guild hall — a new `Use` opened by S10b's `dossier` request at this epoch — and the trade's workshops re-bound to the record as its members by `assign` (no move) |
| SIZE | the existing building mutated to the greater template at once — a host change, decided and applied in the event (§4.7 S11 (6)), its Works over weeks; no extra members |
| REPLACEMENT | the lesser's use replaced by the greater's in place — a `convert` of designation on the same building, decided at once; a church replaced by the cathedral carries its crypt in the same event (V06 §3.18.3 (1)); a city watch over a town watch keeps the town watch's posts; walls go through the fortification's dossier path (V06 §3.7.6 (4)) — by V08 §3.5.1 (c)'s three cases, never by template family (J-V6.125). Where the greater's thing is the lesser's (V08's first case: `graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`, `mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`, `cathedral_10_000_only` over `parish_church`), the `convert` runs in place. A `@none` or `@office` lesser (V08's second case: a town watch over a citizen militia, a cathedral over a resident priest) converts nothing: the greater is placed as an added record is, with the lesser's key its alias. Every other REPLACEMENT greater is placed new (V08's third case): a **pin-record lesser** (`parish_church` over `wayside_shrine`) and **a building lesser whose thing the greater does not keep** (`fish_market` over `fishmonger`), the greater placed by S10b's `dossier` request as an added record is and the lesser's former thing left standing, unbound; where two keys meet the lesser's key binds as V08 §3.5.1 (c) states, and after a `promotedFrom` receipt the record's one key is re-pointed to the greater and a kept pin (the churchyard `cross`, at a village rung) is laid for the record with no binding row (V08 §3.5.1 (d); J-V8.114); at a village rung both go through V07 §3.12 *Records at a village epoch* item 4, the `dossier` step offering the re-keyed record to the product's `records` placement first (row 12); no `convert` runs on the lesser's building or pin in either |

A custom institution whose library `subsumes` names other kinds (item 104) is typed by 108 (e) (a guild-like custom kind
GUILD, a larger same-function kind SIZE, default SIZE) and takes the same path. A lesser that reaches the map beside its
greater (a custom institution, an event adding the lesser, a stale record) becomes a member of the greater's collective by
`assign`, never an addition (108 (c)); nothing is double-counted at any batch (T-V6-45).

### 3.10 Designation mutations over epochs — the `MutationPlan` (item 18 (c))

**3.10.1 Creation** (§4.11 *The epoch-spread mutation*, item 266). The use phase's openings and
relocations into a building whose designation differs, and a hand `mutate … spread: 'epochs'`, run §4.7 S11's mutator
once, at the creating op — the whole `MutationRecord` decided and recorded in the causing event's `EditBase.mutations`
(§4.7 S11 (5)), each later step applying its own parts of it — and create a `MutationPlan` (V06 §2.5) that splits the
record's parts into steps:
* **occupy** — nothing geometric: the use opens in the building as it stands. It is the first step **only when the present
  design is compatible** (every kept part, nothing added — the base's test); then it is applied at creation and
  `opensAt = 'occupy'`. Otherwise the plan's first geometric step is due at once (its `dueWeek` the creation week) and the
  use **opens at the first step whose result is compatible** (`opensAt`): until then a relocating use stays open at its
  former site and a new opening waits unopened (its deficit counted as met by the plan, so no second opening is made). For
  an **always-crypt target** (V11's cathedral and great-temple rows, the `crypt: 'always'` column; J-VI.17) the crypt is laid at the occupy step —
  V02's crypt basement re-derivation, whose ladder never refuses (V02 §3.14.5, item 226) — and the basement ring is
  exempt from the compatibility test, so the seat has its crypt from the batch its use opens (V06 §3.18.3 (1));
* **adapt** — the record's converted and adapted parts, and the subtracted parts no added part overlaps;
* **extend** — the added parts that overlap no subtracted part;
* **rebuild** — the subtracted parts an added part overlaps, with those added parts (the parts that cannot be adapted).
A step with no parts is dropped. The due weeks are the creation week + `round(52 × y)`, `y` drawn once per step from
the `mutation.stepYears` rows (V06 §2.2; these rows replace the base's "over the ladder's rung durations") on
`stream(EVO_MUTATION, plot)` in step order, each at least the previous step's (a plan never runs backwards). A dossier
re-designation is a host change and is decided and applied at once (§4.7 S11 (6)); its Works shows it over weeks, and it
makes no plan — toward an always-crypt class it lays the crypt in the same event.

**3.10.2 Application.** In the `ladder` phase, after the rungs, every plan whose next step is due (`dueWeek ≤ week`) is
applied in address order: a `mutate` op carrying `step: { plan, step }` (item 264) that applies exactly that step's parts
of the stored record, in S11's order (subtract, convert, adapt, add), and writes `done` and the new `expect` digest. Adapt
and extend steps are charged to the district's `fabric` cap and rebuild steps to its `geometry` cap; a step a cap refuses
waits for the next epoch. Each applied step starts its Works (§4.11 *Works* (6)).

**3.10.3 The guard, re-planning and cancelling.** A step applies the stored record only while the building's leaf digest
equals `expect` (§6.2): a hand edit, a later mutation or a Works cancelled half-way breaks it, and the plan is then
**re-planned** — S11's mutator runs afresh from the present design to the plan's target inside this epoch's event, its
record replacing the plan's for the remaining steps (the due weeks kept), reported `replanned`. A plan is **cancelled**
(tombstoned, its done steps standing) when the use it was made for leaves the building, when its plot is re-derived, or
when a lock covers the building; a user deletes one by `delete` on the plan (V06 §4.2). The plan's last step tombstones it
(cause `done`). **Going back** (item 18 (e)): when a building whose plan was cancelled with done steps next takes its
former designation (the plan's `from`), the mutator's record for that change is the **inverse** of the done steps (their
added parts subtracted, their subtracted parts restored from the done events' records, converted parts converted back),
spread by a new plan by the same rules — never a fresh design.

### 3.11 Hazards — fire, flood and collapse

**3.11.1 Where hazards come from.** (a) **Circumstance events** — `EpochInputs.events` entries whose `kind` names a
`HazardRow` (V06 §2.4), from the standalone timeline and `advance`'s `events`; and, dossier-bound, the calamity records the
port carries (`kind: 'calamity'`), which the engine types by its own calamity table (V06 §2.4; DR28, item 388): the
row's hazard, the place at the centroid of the calamity's F5 targets, `maxBuildings` (or the topple count, or the flood
depth factor) by the severity band. An event's `params` override the row's; `params.x` and `params.y` (metres in the
document's frame) give its place; `params.week` its week — an integer in `(prevWeek, week]`, a value outside clamped to
that range and reported. **A calamity's targets are struck in place**: the hazards phase reads the epoch's dossier events
for the F5 records tied to the calamity, and exempts those targets' uses from relocation — they close as ruined where they
stand (their households into the ledger), and the `dossier` phase's F5 then finds a building already struck, which is
idempotent. (b) **Spontaneous hazards** — only when `evolution.hazards` admits the row's `spontaneous.mode`. On a
dossier-bound document the mode is `none` **by rule** — an `adjust` to `minor` or `full` is refused with R2's line "this
town's disasters come from its campaign" — so a dossier town has the calamities its dossier reports and no invented ones
(J-V6.19). Their count
per epoch is `⌊λ⌋` plus one more when a draw falls below `λ − ⌊λ⌋`, with `λ = rate × years` (fire: × the live buildings ÷
1 000), drawn first on `stream(EVO_HAZARD, town root)` for the epoch; each hazard's week is a uniform draw in the span
(`(prevWeek, week]`) unless given. Hazards run in week order, then row order.

**3.11.2 Fire — `burn`.** Row defaults (our own; the ignition rate calibratable, §13.9): `ignitionPerYearPer1000` 0.2,
`jumpM` 6, `breakM` 8, `pCatch` 0.55, flammability by roof covering and wall (thatch or reed 1.0; timber, shingle or wattle
0.9; tile 0.45; stone, slate or brick 0.15 — the lower of roof and wall factors), `windDown` 1.3, `windUp` 0.6,
`maxBuildings` 6 under `minor` and 400 under `full` (an event may set its own).
1. **Ignition.** At `(x, y)` when given (the building there, else the nearest within 30 m); otherwise drawn without
   replacement over live, occupied buildings with weight `flammability × (1 + the block's building coverage) × (2 when
   a class that emits fire risk under item 103's EMITS family stands within 30 m, else 1)` on the town-root stream, the
   coverage being the block's summed footprint area ÷ the block's area.
2. **Spread** — breadth-first in rings, each ring's candidates in address order. Two buildings are **adjacent** when their
   footprints lie within `jumpM` and the segment between their nearest points crosses no way corridor at least `breakM`
   wide and no water face — **the part of the segment over a deck** (a bridge, pier, mole or quay platform deck, item 110
   (d)) **counts as land**, and the deck's carriageway is a way corridor like any other, so the houses of a bridge burn
   from one to the next while a carriageway at least `breakM` wide, or a stone bridgehead, still stops the fire. A burning building's unburnt, unprotected neighbour catches when its draw on `stream(EVO_HAZARD,
   neighbour)` for the epoch is below `pCatch × flammability(neighbour) × wind`, `wind` = `windDown` within 60° of the
   site's prevailing wind (the context vector's `upwind`, §2.5) from the burning building, `windUp` beyond 120°, else 1.
   The spread stops when a ring adds nothing or the burnt count reaches `maxBuildings`. A wide street, a square, a river
   or a row of stone houses therefore stops it; a thatched lane downwind does not.
3. **Ops** — one `burn` (V06 §2.8) with the burnt set, address order: its households are returned as
   `EpochOps.displaced` (cause `fire`; placed first at `siting`, V06 §3.8.1); a dossier-backed use is relocated first
   (§4.11) unless it is a calamity's target (struck in place, 3.11.1); any other use closes (cause `fire`), its class's
   deficit reopening it in the `uses` phase of this epoch (step 6, V06 §3.9.6) with its `formerUses` bonus, on the rebuilt
   plot or where the solver now scores best.
   Each burnt building is `decayed` at the fire's week with a Works drawn CHARRED (§4.11 *Works* (4)); its plot is rung-3
   eligible (V06 §3.8.4), and regrowth tier (3) rebuilds on it. **A burn that burns every building standing on a timber
   deck** chars the deck to `decayed` in the same op (V06 §3.19.5 (3)); a masonry deck is unharmed.
4. **Rebuilding after a fire.** For `fire.rebuildYears` after a fire, a rebuild on a burnt plot takes the roof covering
   `fire.rebuildShift` steps less flammable than its class row's draw would, where the row admits it (the historical
   ordinances after great fires; our own rule, an extension row, 0 in the parity presets).

**3.11.3 Flood — `inundate`.** Row defaults (a mapped calamity scales `depthCm` by its severity, V06 §2.4): `depthCm` 60, `collapseDepthCm` 80, `collapseShare` 0.3, `timberScourCm` 120, spontaneous
`perYear` 0.02 under `full` on a river or coast town only. The flooded land is every ground cell below the flood line of
its nearest water body (§2.3's flood band) + `depthCm`, and the **water level** there is that flood line + `depthCm`. The
**depth at a building** is the water level less the building's **datum** `baseCm` — §2.6's `deriveBase`, so a deck
building's is its deck's surface (V02 §3.16 (5)) and a terrace building's its platform; the raw ground cell under
it is never used. A building of timber, cob or wattle walls whose depth reaches `collapseDepthCm` collapses when its draw
falls below `collapseShare` (→ `decay`, households displaced, its use as in 3.11.2 (3)); a timber deck whose soffit the
water level passes breaks at the same `collapseShare` (V06 §3.19.5 (3)), and a timber raised-way support standing in the
flooded land whose depth at its foot reaches `timberScourCm` breaks at it (V06 §3.19.2 (4)) — masonry decks and supports
never break this way. **Underground**: every gallery or chamber under the flooded cells that volume 4's water rule
reaches — its ceiling within `surfaceClearCm` of the ground (V04 §4.3's water-edit row) — takes the base's `flood` op
(§4.11 `DeclineOp`) where V04 §2.3 admits it (its floor below the water table, II.6's condition table), else is reported
`W_VOID_UNDER_WATER`; the op is drawn in the hazards batch, cause `rule:flood` — so a flood drawn at an epoch and the
same flood drawn by hand reach the same elements, and a deep catacomb or cavern stays dry. Nothing else changes: a flood is a destructive event, not a terrain
change (a course shift is V06 §3.12's).

**3.11.4 Collapse — `topple`.** Event only. `params.count` (default 1) structures chosen in the given area (`x`, `y` and
`radiusM`, default the town) with weight `height × (1.5 worn, 2 neglected) × (2 abandoned)`, drawn on the town-root
stream: a building → `ruin` directly (its Works drawn COLLAPSED), its households displaced; a wall tower → `breach` of the
wall stretch around it (up to 20 m each side); **a raised-way support** (weighted by its height like any structure) →
the support `ruined` and **both spans beside it ruined** (`breach`) in the same op, their arch vaults collapsing with them
(V06 §3.19.2 (4)). A support whose spans carry a way in use is a candidate only when the break leaves every gate and every
plot a path (the network invariant, §5.3), filtered before the draw (J-V6.7).

**3.11.5 No war.** There is no siege or war operator (item 8: the owner's war example is not written into the design). A
dossier calamity of that kind maps to no hazard (the calamity table's `none` row); it reaches the map only through the
fires or collapses the dossier itself reports, a `ConditionOverlay` (§4.11 *Works* (10)), and the population, slices and
F5 targets the dossier reports.

**3.11.6 Raising the ground after a great fire or flood** (II.7.6's `raiseGrade`, "applied by an epoch"). After a
`burn` whose burnt set holds a connected region (buildings linked by the spread's adjacency) of at least
`raise.fireBuildings` (60) buildings, or an `inundate` whose collapsed share of the flooded buildings exceeds
`raise.floodShare` (0.3) over a flooded area of at least `raise.minHa` (1 ha), `raiseGrade` fires on that region — its
outline the union of the struck plots, simplified — when the hazard's next draw on the town-root stream falls below
`raise.chance` (0.3): the town rebuilt on its rubble, as history attests. Its operator, its `buried` system and its Works
are II.7.6's (V04's buried-system builder serves it at an epoch, V04 §3.5); the region's households are already in the ledger; the
buried streets and rooms join the underground (and `under.access` tests them for overlap the same epoch). Chronicled
`terrain`. On a dossier-bound document it fires only for a mapped calamity (never for a spontaneous hazard, which does not
exist there).

### 3.12 Terrain and water over epochs (items 25, 111 (b))

The base owns the kinds, their repair and the trigger rows' chances (§4.11 *Terrain and water change slowly*); this
section fixes which bodies and faces are candidates and what each fired op changes. The `terrainWater` phase visits
candidates in address order; each fires at most once per body per epoch.
* **`siltReach`** — (a) a harbour basin with no live harbour use for `silt.idleYears`; (b) a reach within
  `silt.downstreamM` below a course change or a canal off-take made since the reach's last silting; (c) an oxbow (below).
  The share is the row's; a basin that falls below the harbour draught closes its harbour use (the use phase reads it next
  epoch).
* **`reclaim`** — a `marsh` `LandUse` face or a foreshore margin that touches a live plot or lies within 50 m of one, when
  S5d's shortfall record of the last growth is positive and the face's district band is `modest` or above (§4.11). The
  region is the whole face when it is at most `reclaim.maxHa`, else its part within `reclaim.bufferM` of built land,
  clipped to `reclaim.maxHa` from the built side. A reclamation that changes a shoreline an enceinte's closure relies on is
  recorded in the epoch's scope (`surfaceChanged`), and the next epoch's fortification phase re-evaluates that closure
  (V06 §3.7.6 (3)); `under.access` tests the changed faces for public openings the same epoch (V06 §3.18.1).
* **`shiftCourse`** — a reach whose sinuosity between two control knots exceeds `river.cutoffSinuosity`: the **neck** is
  the knot pair with the smallest straight distance per metre of course between them, at most 120 m apart; the cut-off
  re-traces the reach as the straight chord between them, and the old loop becomes an **oxbow** — a still water body of
  kind `oxbow` whose face is the abandoned channel (item 206), cut off from the river, keeping its crossings as they are
  (its bridges stand over still water until the strike pool's `deck` candidate clears them once the oxbow has silted to marsh
  and no deck plot on them is occupied, V06 §3.19.5 (3)); the changed banks enter the epoch's scope as for a reclamation.
  **An aqueduct's source**: a `siltReach` or `shiftCourse` that silts a spring's reach or moves a river away from an
  aqueduct's intake is read by the `raisedWays` step the same epoch — the aqueduct runs dry at once (V06 §3.19.2 (2)). An **avulsion** — a reach whose flood cells exceed the
  row's share — re-traces the reach between the two knots along the least-cost path through the lowest ground of its
  flood band (deviation ≤ 300 m), and the abandoned channel becomes a `marsh` face. Both run as S1's water operator on the
  changed reach (§7.3 (b)), so their footprint, fates and locality are the carve's.
* **An oxbow silts to marsh**: its `oxbow.marshAfterYears`, drawn once at its formation on `stream(EVO_TERRAIN, oxbow)`,
  makes it a `siltReach` candidate whose op shrinks its shore by the row's share; when its area falls below 0.1 ha its
  water face is removed and the land typed `marsh` (item 206).
* **`digCanal`** — only when a live use of a `canal` class (the roster's or a dossier element) has no canal water body
  within its plot's reach: the engine traces the canal on the S3 lattice from the nearest river reach or harbour to the
  use's plot with `existingFabricCost` (§4.3; plot lines cheap, footprints dear), at most `canal.maxM`; no path, no canal —
  reported. The dig is `carve` (§4.11).

**3.12.1 Failing springs and oases (item 111 (b)).** A spring is a `WaterBody` carrying `spring` (§2.3); its `flow`, a share
of its full flow in (0, 1], weights its water pull on the growth field (§4.2 S3 (6), §4.4) and the prosperity field's water
term (§4.5). The `terrainWater` phase's **spring row** visits every spring of the ground arena in address order (a sky
island's water is V05's: item 111 does not apply there), after the base's trigger rows:
1. **The inputs over the span** (`y` = the epoch's years). `d` = the drought years of the span — the years `(prevWeek,
   week]` covered by a `ConditionOverlay` of archetype `drought` (the dossier's, DR21), by an `EpochInputs.events` entry
   of kind `drought` (V06 §2.4's row: a timeline or `advance` event) from its week for `params.years` (default 1), or by a
   replay epoch's `condition` effect of archetype `drought` (V06 §3.20.3), their union clipped to the span. `H_s` = the households whose dwelling lies within the
   climate row's pull radius of the spring point (the radius S3 (6)'s `q(x)` falls to 0 at); the over-draw `o = max(0,
   H_s ÷ (spring.fullHouseholds × flow) − 1)`.
2. **The new flow** (through `dmath`, no draw): `f₁ = flow × (1 − spring.droughtLoss)^d`; then, over the `y − d` other
   years, `f₂ = f₁ × (1 − spring.overdrawLoss × min(1, o))^(y − d)` while `o > 0`, else `f₂ = min(1, f₁ +
   spring.recoverPerYear × (y − d))`; the result floored at `spring.floorFlow` (0.05: a seep, never 0, §2.3's open
   interval). **The dossier governs its own oasis** (DR40; item 20): while the dossier lists the `oasis_water` deposit as
   available the flow never falls below `spring.failFlow` (the map never makes the dossier's oasis fail); a deposit turned
   `depleted` or `removed` sets the flow to `spring.floorFlow` at the dossier event's week; one available again restores
   it to `spring.failFlow` at once, recovering by the rule above. A `flow` a hand `setAttr` set (T2 `ground`'s spring form,
   §7.1) is a declaration and is held (§7.2): the row never overwrites it, and a locked or pinned spring is skipped.
3. **The write.** The row writes `setAttr(spring.flow)` (author `engine`, cause `rule:spring`, a `detail.why` row of family
   `water` naming the drought years and the over-draw) only when the new value differs from the stored one by more than
   `dial.hysteresis` (0.05, §4.11) or crosses `spring.failFlow` or `spring.regrowFlow`, so a steady spring writes nothing.
   The growth phase of the same epoch reads the new flow in the travel-cost field's pull (step 14); the prosperity field
   reads it at the next epoch's field phase — the one-epoch lag every driver has (V06 §3.4 (7)). Falling below
   `spring.failFlow` is chronicled `springFailed`, rising back to `spring.regrowFlow` `springRecovered`.
4. **Gardens and grove.** While a spring is below `spring.failFlow`, of the `n` irrigated garden faces it feeds (`LandUse`
   kind `garden`, `fedBy` the spring; §2.7) the `⌈flow × n⌉` nearest the water stay irrigated; each other face withers
   after its `spring.witherAfterYears`, drawn once on `stream(EVO_TERRAIN, landUse)` keyed with the epoch the spring fell
   below `failFlow` — a `retypeLand` to `commons`, `fedBy` cleared — and the grove's `Greenery` rows fed by it beyond the
   same share, farthest from the shore first, are tombstoned after their own drawn span (cause `rule:spring`). A spring back
   at `spring.regrowFlow` re-takes its ground as the hinterland does (V06 §3.5.3 (2)): its `commons` faces within the
   climate row's channel reach back to irrigated `garden` (`retypeLand`, `fedBy` set), nearest the water first, up to
   `⌈flow × n₀⌉` (`n₀` the faces it fed at its height, read from their lifecycle), and S12b's grove row re-plants the shore
   band (§4.9). Each step is charged to the hinterland pseudo-district's `fabric` cap.
5. **The quarters around.** No term of the engine's own: the spring's lower `flow` lowers `q(x)` in the prosperity field's
   water term and the growth pull, so its quarters lose band through the field's hysteresis and the wealth ladder (V06
   §3.8.4), carry a higher exposure by the base's low-prosperity driver (V06 §3.5.1), and new growth goes elsewhere — the
   owner's "the quarters around it may decline", by the same lag as item 102's shade (V06 §3.4 (7)). A use whose `hard`
   supply edge reads water finds a spring below `spring.failFlow` no provider and strains (V06 §3.9.2).
6. **Drying.** A spring that has stood at `spring.floorFlow` for its `spring.dryAfterYears` (drawn once on
   `stream(EVO_TERRAIN, water)` keyed with the epoch it reached the floor) dries: its pond shrinks by the `siltReach` op at
   the row's share each epoch and, below 0.1 ha, its water face is removed and the hollow typed `commons` (an oasis has no
   marsh to leave), the `spring` going with its body; chronicled `springDried`. The engine never re-makes a dried oasis: a
   dossier's `oasis_water` available again makes one by DR40 at that epoch's `dossier` step, and a user adds one with T2
   `ground` (§7.1).
The report counts `springs.weakened`, `.failed`, `.recovered`, `.dried`, `.gardensWithered` and `.groveWithered`. With no
spring in the document (the oasis chance, the water pull and the climate cell neutral, item 111 (d)) the row has no
candidate and an epoch is byte-identical to one without it (T-V6-71's no-op clause).

### 3.13 Works on the weekly clock (item 67) — scheduling what the epoch decided

The base's Works record, stages, durations and derived drawing are §4.11 *Works* (1)–(10). The `works` phase (step 18)
is the one place the engine creates them, after every other phase has committed its ops:
1. **Which ops start a Works.** Every building-level physical change of steps 2–15: `build`, `rebuild`, `reuse … build`,
   `demolish`, `clear`, `robStone`, a `vacate` (its `decay` Works), a strike's `decay` and `ruin`, `burn` (CHARRED, in its
   fire's week), `topple`'s `ruin`, a repair (`reoccupy` from derelict), every `MutationPlan` step, a rung-2 `densify …
   back_court` and `thin`, a rung-3 `subdivide` or `amalgamate` (plots in transition, *Works* (7)), a `relet` that re-cuts
   a stored plan (a `convert` REFIT). **Walls, ways, water and land uses take no Works** (J-V6.31), **nor do raised parts
   (a raised way's deck, supports and spans), retaining walls and decks** (J-V6.90): their creation, breach,
   repair and dismantling are drawn at their effective week — an engine op's epoch week (V06 §2.11), exactly as a new
   circuit — and the decades a wall or an aqueduct takes to go are the per-stretch and per-span events across epochs. The
   buildings on deck plots are buildings and keep their Works (V02 §3.16).
2. **Start weeks.** The first change on a target in an epoch starts at the offset drawn first on the `works` concern
   (§6.1) — uniform over the span `(prevWeek, week]`, as *Works* (10) states; a hazard's changes start at the hazard's
   week (V06 §3.11.1). A **later change on the same target in the same epoch** — a build after its plot's demolition, a
   rebuild after a fire, a repair after a flood — does not cut the first short (*Works* (2)'s one-target rule applies across
   epochs, not within one): it **chains**, starting the week after the earlier Works reaches FINISHED (or, for an instant
   CHARRED, the week after the fire), its duration still drawn on `works`; a chained start may fall after the epoch's week.
   **A chained Works that has not started when a later change reaches its target is removed**: its change still
   stands, drawn finished from its own effective week, and the later change's Works starts from the stage the prior,
   started Works had reached — never from a `before` the chained one never drew.
3. **Across epochs** the base's one-target rule holds — a new change ends a running Works at the stage reached — except
   that a `MutationPlan`'s next step on a target whose previous step's Works is still running chains after it (a plan's
   steps are sequential by construction).
4. **Part programmes.** A designation whose `WorksTable` rows name parts (a great church's choir, transept, nave, towers)
   starts each part's Works when the previous part's reaches `works.partStartAt` (ROOFED), in the programme's order, so
   the choir is in use under its roof while the nave rises (*Works* (3)). **Stacks.** Every terrain change an epoch makes
   that reaches a building with a stacked wing — its ground wings' samples, a deck's surface, a crypt lift — runs V02's
   building-level datum pass `rebaseStack` inside that change's own op, so every caster a field phase rasterises
   (V06 §3.4) carries the re-based heights; a stack's Works run in stack order and its solid wings by courses, drawn by
   `heightsAt` (item 318).
5. **Retirement** (item 321). The phase retires every Works that finished more than `works.retainWeeks` before the
   epoch's **span start** (`prevWeek`) — not before its week — so the model after an epoch still holds every Works that
   ran during that epoch's span, and a scrub anywhere in the span draws it from that one model (V06 §3.15.2), whatever the
   cadence. At the port's 52-week cadence this keeps one more year of finished Works in the model (≈ the Works of two
   epochs; V06 §6's memory row counts it).
6. **Restraint and conditions.** The share of stock under Works follows the epoch's rate by construction (*Works* (10));
   a `ConditionOverlay` the port fills scales the share of this epoch's changes started as Works, the rest applied
   finished (the base's staged rule, read as it states).
7. **Displaced people.** A demolition's or a fire's households enter the ledger (V06 §2.1) and are housed by `siting` in
   the same epoch, so none is in transit when the epoch event ends (item 335); between their old home's EMPTIED (or the
   fire's week) and their new home's FINISHED the week-derived occupancy the module reads (§10.3) shows them "moving",
   derived from the two Works, never stored.

### 3.14 People over time — ageing and the derived succession of household members (§10.3)

§10.3 makes a person a pure function of `(household address, member ordinal, birth epoch)` and says births and deaths are
the engine's. The engine makes them **derived**, costing nothing at an epoch (J-V6.34):
1. **Slots.** A household of `members` = n has n member slots. Slot `k`'s first person is ordinal `k`, birth epoch 0 (the
   household's creation epoch), with the age at the creation week that `derivePerson` already gives.
2. **Lifespan.** `derivePerson` gains two appended draws (item 443), after every existing draw so no present value moves:
   `lifespanYears`, uniform in its ancestry row's `lifespan` (default [45, 80]; our own), and `entryAge`, the age a
   successor enters at — 0 with weight 0.6 (a birth), else uniform in [16, 30] (an heir or spouse joining); both our own,
   calibratable.
3. **Succession.** A person dies at its **death week** `birthWeek + round(52 × lifespanYears)` (an integer), where
   `birthWeek` is its entry week − 52 × its age then; its slot passes to ordinal `k + n × j` (j the slot's succession count),
   the successor keyed by **that death week** as its birth week (item 443: the key's `bornWeek` in place of the birth
   epoch for a successor), entering at its `entryAge`. So the same history at a 13-, 52- or 520-week cadence gives the same
   successors with the same names; a person is shown dead from the first drawn week at or after its death week.
   The chain of a slot at any week is computed on demand by walking the successions from the household's creation —
   O(successions), at a gazetteer click or an export, never at an epoch.
4. **Ageing** is `(week − birthWeek) ÷ 52` at the drawn week (the `week` view key or the document's).
5. **Moves and ends.** A household that relocates keeps its address, so its people persist; one that leaves the town
   (departures) takes them with it; a household's `members` change by a table-driven re-derivation only (§10.3), never by
   the engine.
6. **Held people.** A pinned or edited person is a fixed input (§10.3): the derivation never ends them; past their
   lifespan the gazetteer marks them "held past their years" and offers to release the pin. The dossier's notables are the
   dossier's (DR22, staged): never succeeded by this rule.

### 3.15 The history record, replay and time scrubbing

**3.15.1 The report and the chronicle.** Each phase returns its `EpochReport` fragment in its `EpochOps.report`; the
`close` phase merges them into the epoch's `EpochReport` (V06 §2.10), which joins §5.4's derived report (item 339), and
writes its **chronicle** — the plain-words history the app's panel lists — by these rules, each entry citing its cause:
`stage` for each stage grown (its regime and households); `circuit` for a new enceinte; `gateOpened` per ring per epoch
(counted); `wallFate` at a `wallToWay` or `absorbWall`; `wallManned` at a neglect lifted by renewed threat (V06 §3.7.5);
`contraction` for a shorter ring; `fire`, `flood`, `topple` per
hazard (buildings struck); `decline` for a district whose households fell by at least `chronicle.declineShare` in the
epoch, `regrowth` for one whose reoccupations reached `chronicle.regrowthShare`; `redevelopment` per composite;
`useOpened`, `useClosed`, `useMoved` for a use whose class significance (item 72) is at least `chronicle.significanceMin`,
the rest folded into one counted line per district; `mutation` for a completed `MutationPlan` of such a use; `terrain`
per terrain-and-water op (a `raiseGrade` among them); `island` and `underground` per participant state change (the
sewers turning on among them); `dossier` per dossier event carried (with its change id, item 75); `rename` per district
renamed (a quarter emerging among them); `waterfront` and `harbourChain` per waterfront change (V06 §3.7.6); `split`,
`merge` and `ladder` per split, merge-back and ladder step (V06 §3.9.10–§3.9.11) of a class of significance; the
underground's `accessOpened` (naming its cause: dug from above, a public opening, or overlap through a named system),
`voidSealed`, `excavated`, `voidSettled` and `voidVacated` (V06 §3.18.1), `catacombFounded`, `catacombStagnant` (with its
block), `catacombResumed` and `catacombsAboveCount` (V06 §3.18.2), `cryptDug`, `cryptCapped` (naming the seat that
outranks) and `cryptJoined` (V06 §3.18.3); `raisedWay` per raised way founded, finished, repaired, run dry, first held
above its cap, and per epoch's fallen spans (counted per way), `retainingSlump` per district (counted), and `deck` per deck
struck or repaired (V06 §3.19); `springFailed`, `springRecovered` and `springDried` per spring (V06 §3.12.1); and, on a replay
epoch, `destroyed`, `refounded` and `buried` (V06 §3.20.5). Entries are ordered by week, then kind order, then address. Their text is drawn
at display from V06 §5.2's templates, never stored.

**3.15.2 Frames — the town at any week.** `locate(w)` (J-V6.36): for `w` after the last epoch's week, the current model;
for `w` at or before the creation week, the creation prefix's model (on a rebased document, the rebase point's, V06
§3.15.5) — or, on a document generated from its history, the model after the first coarse replay epoch whose week is at
least `w` (the creation prefix folded to it; before the first, generation's start model; V06 §3.20.6); otherwise the model after the **first epoch whose week is at least `w`** — the log prefix through that epoch's
event. That model holds every change the epoch decided and every Works that ran in its span (item 321), so drawing it at
`w` shows the town mid-transition exactly as the Works derive it (*Works* (2), (8)): a house begun in March staked, one
begun in autumn not yet there. **Changes without a Works** (a way downgraded or upgraded, a stretch dismantled or breached,
a gate opened, a land face retyped, a waterfront wall, a ring road, an absorbed wall, a catacomb's growth, an access, a
link, a raised part founded, breached, repaired or dismantled, a retaining wall made or slumped, a deck struck or
repaired) carry an **effective week** (`EffectiveWeek`, V06 §2.11): an engine op's is its epoch's week — it shows at the end of
the span, when the epoch records it; a dated dossier change's is its own week; a hand edit's is its event's week. The frame
for `w` applies the `before` image of every such change of its epoch whose effective week falls after `w` (the images path
holds those records), so a scrub never draws a change before it happened. Events between two epochs are in the
prefix at their log positions, so a hand edit made after epoch e − 1 shows from then on. The frame builder
(in the generation worker) makes the model for an epoch `e` by the cheapest of:
1. a cached `HistoryFrame` (LRU, the device's frame setting, V09);
2. the **images path** — from the nearest cached frame, keyframe or the current model, applying the `HistoryStore`'s
   images of the events between them (the `before` images backward, the `after` images forward): record and face swaps
   of each event's touched set, no derivation, then the indexes of the touched chunks rebuilt (§3.3);
3. the **replay path** — from the nearest checkpoint or keyframe at or before `e`, folding the log forward through the
   session's code path (§7.3 item 2's replay mode), the images captured as it goes.
The images are written at every commit (the touched set's records and faces before and after it; V06 §2.11); the
verification replay after a load (§12.6) rebuilds them as a side effect; past the device's store setting (V09) they spill to the app's
disk cache and are fetched back on demand; if they are gone the replay path serves. A keyframe is a copy-on-write
chunk table (§7.4's checkpoint form) taken at every `history.checkpointStride`-th epoch and kept while the store's memory
allows (the oldest dropped first; the output never depends on which are kept). The display for a frame is a
`DisplayDelta` from the frame on screen (§8.1), so stepping one epoch redraws only what changed.

**3.15.3 Then and now.** `diff(w1, w2)` lists the entities whose lifecycle block has an entry between the two frames' log
positions — added, removed, changed with their event kinds (V06 §2.11) — derived from §2.8's lifecycle block, never stored;
removed entities' geometry comes from the earlier frame. It feeds the `live.history` layer (V06 §5.1) and the clerk.

**3.15.4 The timeline bar's reading.** The bar spans the creation week to the current week (and, for a standalone
document, the planned trajectory's end as a dashed tail; for a document generated from its history, the replayed past
before the creation week as a read-only range of coarse epochs, which scrubs and compares but offers no fork or re-run
inside it, the creation being one event, V06 §3.20.6); its marks are the `HistoryIndex` epochs, dated events, chronicle
entries of significance and forks; dragging sets the per-viewer `week` view key (§2.9); the base's scrub rule (*Works* (9): the current model drawn at the
week) is used **only when no epoch event lies in `(w, now]`**; otherwise the frame of `locate(w)` draws — both outside
every digest. While the
thumb moves, the nearest cached frame is shown and the exact frame replaces it when the pointer settles (120 ms, as
§12.6's previews do).

**3.15.5 History across a rebase and an upgrade** (§2.9's `Base`, §7.4's epoch row, §7.5).
* **Before a rebase point.** A rebased document replays from `base.state` and is not seed-reproducible before `base.seq`
  (§2.9). The timeline bar greys the range before the rebase point's week; `locate(w)` for an earlier week returns the
  rebased state with the banner "history before year N was condensed"; `forkAt` and `rerunFrom` at an earlier seq **bend**
  (J-VI.4) to the earliest seq they can take, with the line "history before year N was condensed; the copy starts
  at year N". The chronicle and the `EpochReport`s of the epochs
  before the rebase stay in the saved non-canonical report block: a verification replay cannot rebuild them, so it never
  drops them (item 339: "kept across a rebase"). The why rows are on the lifecycle events and survive with them.
* **Upgrading a `'history'` document.** §7.4's epoch row lets a multi-epoch document upgrade by replaying its whole log
  with a per-epoch diff or stay pinned. For a history the diff is shown per epoch: the entities added, removed and changed
  against the pinned version (the `HistoryDiff` machinery, V06 §3.15.3, over the two replays' frames), with the chronicle's
  lines that differ; the user chooses to upgrade or to stay pinned. **A document whose epochs carried dossier events stays
  pinned unless the host asks** (`HostContext`'s upgrade request, V08): a campaign's history is never rewritten silently.
  An upgrade rebuilds the reports, the history store and the masks by its replay.
* **The strategy** is read from the effective parameters at each epoch's log position (V06 §3.1 (2)), so an old document's
  `'grow-by-stage'` epochs replay as they were and a later `adjust` to `'history'` runs only from the next epoch.

### 3.16 Determinism

* **Stage ids** (item 342), appended to the stage registry, never renumbered: `EVO_PRELUDE`, `EVO_HAZARD`, `EVO_FIELD`,
  `EVO_USES`, `EVO_DEPARTURES`, `EVO_DECLINE`, `EVO_FORT`, `EVO_TERRAIN`, `EVO_LADDER`, `EVO_MUTATION`, `EVO_SITING`,
  `EVO_GROWTH`, `EVO_WORKS`, `EVO_UNDER` (the underground adapters' own draw: excavation by demand, V06 §3.18.1 —
  their calls into volume 4 draw under `U-FADE`, below) and
  `EVO_RAISED` (the `raisedWays` phase's stage, V06 §3.19; its gate draws stay the base's raised-way stream's, keyed by the
  reason key — the *Identity* bullet below), in item 342's order. The
  underground's per-element draws keep V04's keys on the `sewer` concern (item 109 (j) (3): the dig draw per building
  lineage, the catacomb source per cemetery or quarry lineage, the crypt join per (church, complex) pair — each fixed by its key, never
  repeated). A phase's draws use its stage id as the stream key's stage component (§6.1); **participants register the stage
  their volume names** — `SKY` for V05's two (`sky.islands`, `sky.clearance`; V05 §3.15), `S9b` for `hood.fabric`
  (V01 §3.3.6), `U-FADE` for the four `under.*` adapters (V04 §1.1, the engine they call; the adapters' own
  excavation-by-demand draw alone keys on `EVO_UNDER`, V06 §3.18.1), `VS1` and `VS2` for `village.plan` and
  `village.density` (V07 §3.12; they re-run those stages' steps), `VS8` for `village.pins` (V07 §3.12; it runs VS8's
  pin rows) — and their draws use that id, their table reads
  recorded under it (V11 §3.1's *Readers*, T-V11-1 (b)). The concerns are the base's: `epoch.transform` for every engine draw except
  `use.relocate` (the use phase's chance and move draws), `works` (start offsets and durations), `siting` and the `plot.*`,
  `siteplan*` and S5 concerns the base stages read when the engine calls them, `people` for V06 §3.14's appended draws, and
  `naming` for renames. No concern is added.
* **Keys.** Every per-entity draw is keyed by the entity's lineage with the epoch component (§6.1); a span drawn once and
  re-read every epoch (a plot's merge span, a land face's fallow span, a gate's opening years, an oxbow's silting) is keyed
  with the epoch it began in, so it is re-derived identically every epoch and never stored. **A span that began at an event
  that is not an epoch** (a plot emptied by a hand `vacate`, a face retyped by hand, a pathway set by `setAttr`) is keyed
  with that event's `seq` as its creation index and epoch component 0, and its span starts at the week of the next epoch
  after that event. **A product's records placement** (V06 §2.1's `EpochPlacement`) draws and mints as the base's
  post-build placement does — keyed by the adding (or removing) dossier event's `seq` as creation index, epoch component
  0 — on the epoch path and the absorb path alike (§6.1, §6.3; §7.7 item 6, J-A22.76), so two absorbs between the same
  epochs never share an address and an event carried by an epoch keys as it would folded standalone (V07 J-V7.129).
  **A replay epoch** (item 113) keys every draw as a live epoch does, its epoch component `0x8000 + r` (§6.1's replay
  range), so no replay draw equals a live epoch's and one seed and one history replay byte for byte. Town-level draws (the circuit chance, hazard counts, ignitions, `raiseGrade`) use the town
  root's key. Within a stream, each phase draws in the order this section
  states, one stream per (entity, stage) per epoch, continued.
* **Order.** Phases in V06 §3.2's order; inside a phase, address order unless the section states another deterministic order
  (the key order of the departure matching and the strike pool, 105 (f)'s order of openings, BFS rings in address order, week
  order of hazards, the participants' `(order, id)`). Scores are float sums in a fixed order (§6.5), ties broken by address.
* **Identity.** Every op continues lineage by §6.3 (survival, JOIN, SPLIT, succession at a trace's address); an entity the
  engine mints takes its derivation unit and the epoch as creation epoch (the new use of 3.9.6, a stage's ways and plots,
  the oxbow, a `MutationPlan`), so the same seed with the same inputs mints the same addresses and nothing that survives is
  re-rolled. **The exception: a generated raised way** (item 110 (b); J-V6.84). Its derivation unit is its
  `RaisedReasonKey` (V06 §2.13), its creation index 0 and its epoch component 0, whichever path founds it — generation's S4
  or S6, a new stage's S5b, or V06 §3.19's pass — so a way generated at creation and one an epoch founds for the same reason
  share an address, and a removal, a re-apply and V04's arch-vault keys (the way's lineage and its supports' lineages)
  agree on both paths. Its gate draw is one uniform per reason key on the base's raised-way stream with epoch component 0,
  drawn once and never re-drawn. The ground part number (item 110 (b): allocated once, never reused) takes no part in the
  matching. A way founded after an earlier one of the same key was released (V06 §3.19.1 (3)) takes §6.3's collision
  suffix `~k`; its key is unchanged.
* **Purity.** An epoch reads the committed state, its inputs, the pinned tables and the log (V06 §3.1). The non-canonical
  products — the report, the chronicle, the `why` rows, the history store and frames — are functions of the model and the
  log, outside every digest.

### 3.17 Failure handling — never a whole-map retry (§5)

1. **A refused op** (a conflict the candidate filter could not see; an invariant a batch would break, §5.3) is rolled back
   alone — its batch is one transaction (§3.3) — reported with its rule, and the phase continues on the state the earlier
   ops left.
2. **Work limits.** Each phase declares its limits (§5.1 (5)) over the epoch's counts — the use phase's re-scored uses,
   the strike pool's candidates, the frame's re-banded plots, the fire's rings; a phase that reaches one stops, its unvisited
   candidates go to `EpochOps.waited` (first next epoch), and the report records the hit.
3. **Stages.** A new stage's S5–S13 run under their own ladders (F-WALL, F-PLAN, F-PLOT …, §5.2); a circuit whose trace
   fails leaves the stage unwalled (V06 §3.7.1); a stage that cannot take its households hands them to the overflow ladder,
   whose last rung cannot fail (V06 §3.6).
4. **Participants** are isolated: a participant whose `run` returns an error has its ops discarded, the error reported with
   its id, and the epoch continues.
5. **Inputs.** An unknown hazard kind and an unmapped calamity are reported and ignored; a `populationTarget` outside
   every registered ladder never reaches an epoch (the port refuses it, §7.7 item 15) and a standalone trajectory's is
   clamped to the registered ladders (J-V6.5, J-V6.61); a `params.week` outside the span is clamped (V06 §3.11.1); a dossier
   event the base cannot apply follows §7.7's ladders.
6. **The report.** Every skip, wait, hit, clamp, re-plan and held entity is an entry of the `EpochReport` with its cause;
   nothing the engine declined to do is silent.
7. **Traces and water.** A circuit or contraction trace that cannot hold water access and the occupied-footprint rule
   waits (V06 §3.7.6 (2)); a dossier-gated circuit whose trace fails F-WALL's ladder is reported and re-tried at the next
   epoch (the dossier's walls stay listed; the map lacks their line until a trace holds).
8. **The underground.** A participant of the underground whose V04 call fails is isolated by (4); the catacomb ratchet
   is never broken by a failure — a failed growth adds nothing and records `stagnant` with its block.
9. **Raised ways.** A candidate whose course the solver cannot find or item 244's support step drops (`raised_too_tall`,
   V06 §3.19 (5)), or whose clearing the district caps cannot pay,
   waits (`raised.waited`), its uniform unchanged, re-evaluated next epoch; a clearing is committed whole or not at all
   (V06 §3.19 (7)); a repair a cap refuses waits span by span. A build that lacks the base's raised-way solver and operator
   runs no pass and reports it, as the underground participants are absent before V04's U5 (V06 §8).
10. **The history replay** (V06 §3.20.7): a replay epoch fails as a live one does, by (1)–(9); a history the plan cannot
   read replays nothing and is reported; the budget's bend coarsens the epochs, never drops one.

### 3.18 The underground over epochs (item 109 (h), (j), (3b), (k); item 113 (d), (e); J-V6.50–J-V6.53, J-V6.62–J-V6.66)

Volume 4 owns the underground's systems, their rules and tables and their build-depth algorithms (V04 §2.2–§2.3, V04 §3.5,
V04 §3.8, V04 §3.10: `AccessPass`, `CatacombGrowth`, `UndergroundFade`, the `DigRule`, `OpeningRow`, `LinkRule`, `RuinRule` and
`CatacombRule` tables, `AccessCause`, `LinkCause`, `RuinRecord`, `CatacombComplex`); volume 3 `Basement.crypt` (derived
with the basement; the plan draws it), laid by volume 2's crypt ladder. This section owns their **epoch half**: when each rule runs over epochs, what binds from one epoch to the
next, and what an epoch records. It runs through the participants of V06 §3.2 (`under.fade` at `decline`; `under.extend`,
`under.access` and `under.undercity` at `afterGrowth`), each an adapter over V04's functions given the
epoch's scope (`EpochContext.scope()`), cap, primary and cause (`event` = the epoch's `seq`).

**3.18.1 Access, excavation and dwellings (item 109 (h), (j)).**
1. **Any tier.** Caverns and ruins exist at every rung, thorp to metropolis (the village product's rungs included), by
   V04's rules at creation; an epoch never re-rolls them. A dossier record that explains a ruin arriving later (an
   `ancient_ruins` deposit, a ruined-landmark record, a `magical_node`, V08's rows) reaches V04's existence rule at the
   `dossier` phase as a mutation: the system is laid from its source on the next unused part number by least disruption
   (item 22), sealed until an access exists. A dossier removal of a ruin's source, at the `dossier` phase, clears
   `RuinRecord.source.ref` and keeps the system, fading by `under.fade` (V04 §2.6; `W_RUIN_SOURCE_REMOVED`); no epoch
   removes a ruin.
2. **The access pass** (`under.access`, order 20; V04's `AccessPass.run` over the epoch's scope), in this order:
   a. **Dig from above.** V04's dig rule (V04 §3.5.7 (d)) is evaluated for every building in `scope.built` or
      `scope.basementGrown` that stands over a cavern or ruin element: its **one uniform per (building lineage, `dig`, void
      kind)** on the `sewer` concern is fixed by its key — never re-drawn — and compared with the building's chance (the
      class row × the basement factor × the depth factor, capped), so an access appears when a building is built over a
      void, or later when its chance rises above its draw (a basement added, a deeper cellar), and a building never draws
      twice for one kind: `reoccupy`, `relet` and a repair change nothing, while a rebuild on a trace (a successor lineage,
      §6.3) and every new stage's buildings bring new draws. A success is V04's `AccessPoint` of source `dig` with
      `AccessCause { rule: 'dig', system: <the void's>, event: <the epoch's seq> }`.
      Because each new building over a void adds a draw, the share of voids with an access rises as the town grows
      (T-V6-34), and because the chance falls steeply with depth (`DigRule.decayM`, `maxM`), deep chambers mostly stay
      sealed even under a metropolis (item 109 (j) (5); T-V6-36).
   b. **Overlap** (109 (j) (3b)). V04's overlap test (V04 §3.5.7 (a)) — which `SewerStrategy.extend` and
      `CatacombGrowth.grow` already run for their own new runs and galleries — runs here over the rest of `scope.elements`:
      a quarry or mine working, a dug passage, an undercity lifeline, a `raiseGrade`'s buried streets. A tunnel or gallery
      that crosses or meets a sealed cavern or ruin where their depth ranges meet becomes a breach (`LinkCause` `overlap`,
      the access cause `{ rule: 'overlap', system: <the growing system>, event: <the epoch's seq> }`), the growing
      system's course and hydraulics never bent for it; where they pass at different depths they stay apart, save V04's
      small connecting-shaft row. The test is idempotent, so running it twice over one element adds nothing.
   c. **Mine breaches** (109 (a) (3)). A mine or quarry working in `scope.elements` within V04's `breachM` (40 m) of a
      cavern gallery joins it (`LinkCause` `mineBreach`); the working's shaft becomes an access to the cavern. **At a
      village rung**, each mining use's outside-plot working this epoch opened (`scope.workings`; V07 §3.16 (4):
      no `quarry` system below TOWN) is tested the same way, by the depth the working reaches (V07's
      `mine.workingDepthM`): a cavern or ruin element within V04's `breachM` at a depth it reaches gets an `AccessPoint`
      at the working, cause `{ rule: 'mineBreach', system: <the void's>, event: <the epoch's seq> }`, and no link record
      (the working is no system). `QuarryWorkings.extend` already runs the overlap test and the mine breach over its own
      new workings in its commit (V04 §3.5.3), so (c) over them adds nothing — the test is idempotent — and (c)
      catches the workings no commit of their own tested (the village's, and those another op extended).
   d. **Public openings** (109 (j) (3) (ii)). V04's `OpeningRow` draws for the void elements under `scope.surfaceChanged`
      — ground a reclamation, a course shift, a quarry face, a `raiseGrade` or a cave-in brought within the row's cover:
      a sinkhole, a cave mouth, a collapsed shaft, a ruin entrance, each V04's one uniform per (element lineage, opening
      kind) on `sewer` (V04 §3.5.7 (e)), its access cause carrying the epoch's seq. A cave-in that `under.fade` struck this
      epoch at `decline` is in the scope.
   e. **Adoption.** V04's reuse of an ancient drain as a trunk stretch for a sewer extension in scope (109 (d)).
   Then V04's **excavation reading** is re-derived (it is derived after every commit touching an access, a link, an
   element's closure or a building over a void): a void is `accessible` when the connection graph links it to any surface
   access point **through open links only** — **transitively**, so opening one void can open those beyond it (109 (j)
   (3b)) — and `lost` (item 113 (e), II.7.4) when it was accessible once and every open path to the surface has closed. A
   cluster that turns accessible is chronicled `accessOpened`, naming its cause; one refound from `lost` the same, with
   its former reading named.
   **Growth over a sealed or lost void** (item 113 (d), (e); the owner's named combination). A new house over it draws its
   dig by (a); a sewer extension over it reopens the closed runs on its path before laying new ones (V04's J-V4.29, II.7.2)
   and its runs breach the void by (b); a growing catacomb or working does the same by (b) and (c). A lost void so
   reached is refound in that batch — its reading `accessible` again — and (4) admits dwellings in it from the same epoch;
   its former households, gone by the vacancy rules, return only through regrowth (V06 §3.8) like any household.
3. **Excavation by demand** (109 (h); J-V6.50). Last act of `under.access`, at most once per epoch: when (a) the crowding
   hook left households unseated for want of accessible capacity (V06 §3.6 (1)), or the undercity's size law (II.7.5 (5))
   asks for more void capacity than the accessible voids hold, and (b) a sealed cavern or ruin cluster lies within
   `excavate.reachM` (60 m) of an accessible element, the nearest such cluster (gallery distance, ties by its lineage's
   address) is excavated when its draw on `stream(EVO_UNDER, cluster)` for the epoch falls below `1 − (1 −
   excavate.chancePerYear)^years`: a U-DIG passage (V04 §3.8's connector) joins it to the accessible element, `LinkCause`
   `dig`, its access cause `{ rule: 'dig', system, event }`; chronicled `excavated`. The user's own excavation is V04's
   `placeAccess` over an unexcavated cluster (cause `edit`).
4. **Dwellings only after access** (109 (j) (4); J-V6.51). `under.undercity` (order 30) admits a cavern or ruin cluster to
   U-FRONT F6's scattered dwellings (at any tier) or to the undercity's size law (its own existence test and bound, II.7.5)
   **only when V04's excavation reading says `accessible` after `under.access` in the same epoch** — so an epoch that opens
   an access may start them (chronicled `voidSettled` the first time a void is lived in). The crowding hook seats
   households on accessible capacity only (V06 §3.6 (1)). When `under.fade` at `decline` seals or caves in the last access
   path of a lived void (a seal on its access element, a cave-in on the link or gallery that carried its only path), the
   reading turns `lost` in that batch (item 113 (e): remembered as once known, drawn faded like an unexcavated
   void), and the fade adapter vacates the void's dwellings **in the same batch** by II.7.3's vacancy rules, returning
   their households as `EpochOps.displaced` (cause `void`), re-housed at `siting` in the same epoch (V06 §3.8.1);
   chronicled `voidSealed` and `voidVacated`. The same holds for every op of any phase that closes a void's last open
   path — a sewer sealed or caved in, a cellar filled, the building above lost, a disaster (item 113 (e)): the batch that
   closes it turns the reading `lost` and vacates its dwellings. A lost void takes no dwellings until it is refound
   (above).
   **Whose households** (J-V6.100). `under.undercity` runs after `siting`, so it takes no household from the
   ledger: F6's dwellings an epoch opens in an accessible cluster are filled by **relocating** households of the same
   district's ground stock — the poorest band's, the most exposed first by `E(x)`, then address — up to V04's
   `voidDwellings.share` (0.05) of that band's households in the district and each cluster's
   `voidDwellings.maxHouseholds` (V04 §2.3), each a `relocate` charged to the district's `use` cap (a cap that refuses
   leaves the rest for the next epoch); never new households, so ground + underground + sky still equal the target
   (T-V6-52); their ground dwellings are left vacant for the next epoch's regrowth. The crowding hook (V06 §3.6 (1))
   also seats households on accessible void clusters, whether or not the town has sewers (item 574). Households that
   `UndercityEpoch.reread` vacates (a shrinking undercity, `clearUndercity`, a hand-down's bound 0) and those on a floor
   a foundation collapses ((6)) are **re-housed inside the participant**, in its batch, by §4.7's overflow pass on
   ground stock (the base's in-event re-homing, as a hand edit's; a tent only if that pass fails, reported), counted
   `households.undergroundVacated` — never left for `close`.
5. **Ruins over epochs** (109 (h), (c)). A ruin's ancient plan changes only by decay (`under.fade` over its elements at
   V04's `RuinRule.fadeFactor`, 0.25 of the underground's rate: monumental halls outlast rooms by V04's persistence order),
   by excavation and by collapse — never re-laid, so its distinctness from the town above (block size, grid regularity,
   orientation) is a fact of its plan, re-measured against the town as it then stands (T-V6-37). Reoccupation is (4);
   sealing is `under.fade`'s seal op.
6. **Foundations over the epoch's scope** (V04 §3.5.0 *Foundations*). V04's foundation rule is re-made at every
   derivation; at an epoch no V04 stage runs, so `under.extend`'s **first act** applies it: V04's
   `Foundations.apply(doc, scope, cause)` (V04 §1b.2, its epoch caller this participant) over the new footprints and
   basement rings of `scope.built` and `scope.basementGrown`, the supports of the parts in `scope.raised` and the wall
   footings of `scope.levelled`, cause `foundation` with the epoch's seq — an older void's gallery stretch within reach
   split out `collapsed`, a chamber covered by at least `foundations.collapseShare` `collapsed`, one covered less keeping
   its floor with the footing standing in it as a pillar (V04's rule, not restated). A void dwelling on a collapsed floor
   is vacated in that batch and its households re-housed by (4)'s in-participant rule; a catacomb node refused by a
   footing records `blockedBy` `'foundation'` (V04). Counted `under.collapsedByFoundation`. So a pier founded at an
   epoch over a lived cavern chamber leaves no dwelling on the floor it fills, and the epoch and a regeneration agree.

**3.18.2 Catacombs over epochs** (item 109 (k): catacombs only under cemeteries; J-V6.52, J-V6.53, J-V6.64, J-V6.65). Inside `under.extend` (order 10), after the sewer's extension; the complex is V04's `CatacombComplex`.
1. **Candidates and the count, at each epoch** (TOWN and above only, the base's gate kept).
   * **Candidates**, in 109 (k) (3)'s order: first the **cemeteries** — a churchyard (the churchyard part of a church,
     temple or cathedral plot, §4.9's row), a burial-ground use (the dossier's burial-ground and graveyard records seated as
     that class), each burial ground of the Cemetery network, a monastery's burial yard, an extramural cemetery — V04 §3.5.1
     (1)'s faces — ranked by the **burials each serves now** (V04 §3.5.1 (2)'s `burialShare` at the epoch — the share of
     the epoch's households whose nearest open burial face it is — × the epoch's target × the burial rate), the Cemetery
     network's grounds first at METROPOLIS; then, at CITY and METROPOLIS only, a quarry working that V04's `workedOut`
     reads as worked out at the epoch (V04 §3.5.3, given the epoch's scope) within V04's `ossuaryReachM`, as an
     **ossuary**. **Never** a church building, a crypt, a religious precinct without burial ground,
     or a burial face on a sky island.
   * **The allowed count** `K` is V04 §3.5.1 (3)'s count (V11 §3.23.8's `count` row) at the epoch's rung (the fold's, V06
     §3.1 (3)) and church count, island churches included, **re-read at each epoch**.
   * **The source draw.** Each candidate face takes V04's **one uniform `u`** keyed by (`catacomb`, the face's lineage) on
     `sewer` (V04 §3.5.1 (3)) — fixed by its key, never re-drawn. At an epoch
     where the standing complexes number fewer than `K`, the candidates are tested in order: II.7.6's dry-ground gate, the
     100-year age gate on the cemetery's age ((2)), and `u < CatacombRule.chance(kind, rung)`; the first that passes is
     founded (V04's U-SYS lays the complex; chronicled `catacombFounded`), then the next, while the count admits. The one
     `u` is compared against the rung's chance at every epoch, so a churchyard refused at TOWN may found a complex when
     the town becomes a city — monotone in the rung, never a second draw (J-V6.52).
   * **The count bounds foundations, not survivals** (J-V6.64): no complex is founded while the standing ones fill `K`, and
     a fall in churches or in rung removes none — a CITY that declines to TOWN with two complexes keeps both, reported
     `catacombsAboveCount` (chronicled the first epoch it holds).
2. **Age.** A cemetery's age at an epoch is `(week − burialsBegan) ÷ 52 +` its generation age: `burialsBegan` its use's
   `opened` epoch's week — a churchyard's, its church use's — and the generation age II.7.6's stage age at creation or the
   port's `HistoryHint.ageYears` (item 88). A quarry ossuary's age is the age of the oldest cemetery whose bones it takes:
   the gate measures old bones, not the quarry.
3. **Growth per epoch.** The need is recomputed by V04's `CatacombGrowth` from the population history — the epochs'
   targets and weeks — with a plague condition active in the span (`activeConditions`, or a replay epoch's `plague` condition effect, V06 §3.20.3) adding its burials × V11
   §3.23.8's `plagueNeedFactor`, and the span's calamity deaths (each `CalamityRef.deaths` of the epoch's events, V08)
   added to the cemeteries' burials, each cemetery taking its `burialShare` of them — both **to the need, never to
   the cap**. The target extent is `max(extent, need)`; the added area is at most `max(extent × ((1 +
   growthCapShare)^years − 1), growthFloorM2)` through `dmath.pow` — V11 §3.23.8's `growthCapShare` and
   `growthFloorM2` (the cells cited, their values V11's), a share **per year compounded over the epoch's span**, so the same century grows the same at any
   cadence (J-V6.53). This volume passes this cap, the primary (3a) and the calamity deaths to `CatacombGrowth.grow`
   (V04 §3.10 names the input).
   **3a. The primary complex.** At each epoch the **primary** is the complex whose cemetery serves the most burials now,
   ties by source address; another complex becomes the primary only when its served burials exceed the current primary's
   by `catacomb.primaryHysteresis` (10 %). The primary grows by its full cap; every other complex grows only while its
   extent stays below V11 §3.23.8's `rankCap` (V04's `CatacombRule` field) × the primary's — **the rank cap stops growth and never reduces
   an extent** (the ratchet); a held complex is stagnant with `blockedBy` `rank`, its unmet need going to its fill. When a
   newer cemetery overtakes — in a growing city usually the main cemetery outside the walls — it becomes the primary and
   grows by its full cap each epoch until it is the largest: the owner's "the largest catacomb is the largest cemetery's"
   followed across a history (J-V6.65). V04's stored `rank` stays the formation order; the primary is this derived reading.
4. **The timeline invariant** (109 (k) (4), (6); this volume owns it). Along every log, after every batch, each complex's
   `extentFloorM2` never decreases. It **binds** every epoch, every dossier event, Regenerate (keep settings), a Re-derive
   from any stage, New random on the catacomb system, an upgrade's replay and a migration — each re-derives the complex
   from its floor, never below it. It **does not bind** the undo of the event that grew the complex (undo restores the log
   without that event exactly, §7.4; it is not a derivation), the time scrubber and history frames (they show the past),
   a fork's `rerunFrom` (a different history, monotone from its own prefix), and a user's delete of a gallery (V04's
   tombstones lower the floor: the author is not a derivation). A population fall lowers the need, never the extent. It
   binds catacombs only; a crypt follows its building (3.18.3).
5. **Stagnation as an epoch outcome** (109 (k) (5)). A complex is **stagnant** for an epoch when its growth frontier admits
   no node (V04's `blockedBy`: reach, wet ground, another system, a foundation, the wall strip, the rock's depth), the rank
   cap holds it (`rank`), or a village rung holds it in V04's maintenance mode (`rung`, V04 §3.1); the report records `catacombStagnant` with `blockedBy` and the rise in `fill` (`fill += unmet ÷ ossuary
   area`, capped at 1: bones reused, niches cleared and refilled, drawn as denser ossuaries — never a loss), chronicled when
   it begins. When a later epoch finds the block lifted — a plot above demolished, the cemetery reopened, the wall strip
   moved, the rank cap risen, the village handed up to the town product again — growth resumes from the existing frontier by least disruption, chronicled
   `catacombResumed`. A complex whose burial face V04 §3.5.1 (8) closes is frozen (`blockedBy` `sourceClosed`: no growth,
   no change of `fill`) and resumes when V04 §3.5.1 (8) reopens the face — at the epoch that reopens it, from its frontier
   by least disruption, chronicled `catacombResumed` (what closes and reopens a face, a quarry ossuary's included,
   is V04's list, stated there once). A new cemetery (a burial ground opened at an epoch, an extramural cemetery the rung's roster adds) founds a
   complex only where (1)'s count allows. Catacomb growth that meets a sealed void opens it by 3.18.1 (2b) in the same
   epoch (its new galleries are in the scope).
6. **Consecrated ground stays put.** The use phase never moves a church-family use whose plot holds a churchyard, nor a
   `singular` use (V06 §3.9.5; J-V6.66), so catacomb sources and the seat's crypt are stable across epochs, as parishes
   rebuilt in place rather than moving their dead.

**3.18.3 Crypts over epochs** (109 (k) (2): "CHURCHES GET CRYPTS: the cathedral always has a crypt, the
largest crypt in the settlement"; J-V6.62, J-V6.63, J-V6.76, J-V6.77). A crypt is a model fact on its church's basement —
volume 3's `Basement.crypt` (its ring), derived by §2.6's basement function from volume 11's three-valued `crypt` column
(item 436; the village rows' by V07 §2.4 — its values are those tables', never restated here), laid by volume 2's
no-refusal crypt ladder (a raised choir where the water table is high, item 226) and ranked by volume 3 (V03 §3.7.4:
the principal crypt is the cathedral's; every other crypt's ring is trimmed to at most V11's `crypt.rankShare` × the
principal's area; an author-set ring is never trimmed, reported). It follows its building's lifecycle, and the ratchet
does not bind it. This volume owns only what an epoch must guarantee:
1. **A new seat gets its crypt in the same batch.** Every epoch op that gives a building an always-crypt class re-derives
   its basement with that class inside the op, so `Basement.crypt` exists from that batch: a `MutationPlan`'s occupy step
   (V06 §3.10.1; the basement ring exempt from the compatibility test), a dossier re-designation, an item 108 REPLACEMENT
   (V06 §3.9.11) and a new build's S11. **Wherever a cathedral use is live, its building has a crypt at every batch**
   (T-V6-55); the crypt's digging shows in the history frames through the op's Works.
2. **The rank moves with the see, inside the causing event.** V03's rank re-runs inside every event that changes the
   principal crypt's area or its building's designation — at an epoch, the op that makes the new seat, the op that
   demotes, ruins or demolishes the old one — so the new seat's crypt (grown to the always class's `cryptM2` by V03's growth
   step) is the largest ranked crypt in the same batch. Only crypts of buildings whose **live** use is in the church family
   are ranked; a vacant, ruined or converted building's crypt stays in the model, unranked.
3. **A trim never loses a vault** (the epoch rule; J-V6.62). When the rank trims a crypt that already stands — a former
   cathedral demoted to a church, a church whose crypt grew under an earlier rank — the trim shortens `Basement.crypt.ring`
   only, never `Basement.ring`: the bays it leaves take the basement's `undercroft` role (V03's room kind), their vaults
   kept and drawn, chronicled `cryptCapped` (naming the seat that outranks). When the see returns or the principal's area
   falls, the same rank lifts the trim and the bays regain the crypt role. A crypt-only basement (V03: `Basement.ring` =
   the crypt's ring) therefore keeps its full ring as basement.
4. **Crypts are never re-drawn.** A building keeps its basement across designation changes (§2.6), so a church that
   becomes the cathedral keeps its vaults and grows them, a cathedral demoted to a church keeps its crypt (its `basement`
   column satisfied by the basement it has), and no epoch draws a new basement for a building that has one. A mutation out
   of the church family ends the crypt role (the column `never`): the vaults stay as basement, reported, never removed
   silently.
5. **Where the see can move.** The use phase's opening of an always-crypt class into an existing building admits only
   buildings whose basement region can hold the always class's `cryptM2` (V06 §3.9.6), so the new seat's crypt can be the
   largest without trimming a neighbour below its vaults; where none can, the best-scored candidate is taken and the rank's
   trim applies. A see moves otherwise only by the dossier, by its building's ruin or demolition, or by a rung crossing
   (V06 §3.9.5).
6. **A crypt joins a catacomb that grows beneath it** (109 (k) (2), (j) (3b); J-V6.63). V04's crypt join (V04 §3.5.7
   (c)) is evaluated inside `under.extend` whenever an epoch's catacomb growth first brings a gallery under a church's
   crypt basement ring in plan, or within V04's `accessReachM` of it: the gallery keeps V04's `foundationClearM` below the
   basement floor, never cutting the church's foundation, and the pair (church, complex) takes V04's **one uniform** keyed
   by the pair on `sewer`, no epoch component — so a join first reached by an epoch gives the answer a regeneration would
   — at V11 §3.23.8's `cryptJoin.own` (V04's `CatacombRule` field) when the complex's source is the church's own
   churchyard, else its `cryptJoin.other`.
   A success is V04's `AccessPoint` from the crypt (source `crypt`, `AccessCause { rule: 'crypt', system: <the complex>,
   event: <the epoch's seq> }`), chronicled `cryptJoined`; a refusal is final for that pair (a replacement church is a new
   lineage, so a new pair); the access follows its host's closures (V04 §3.10) and is never deleted by an epoch otherwise.
   The catacomb's surface entrance stays on cemetery ground; the crypt access is an extra way in.

### 3.19 Item 110 over epochs — raised ways, retaining walls and decks (item 110 (a), (b), (d); J-V6.82–J-V6.95)

The base generates raised ways at S4 and S6, levels terraces and raises their retaining walls at S10 and S11, and cuts deck
plots at S10 (item 110; §4.3, §4.7 S10–S11; V11's `raisedWays`, `terrace`, `deck` and `deckOk` rows). This
section owns their **epoch half**: when a city founds a raised way over time, how a removal holds, how the three kinds of
fabric decay, fall and are repaired, and how an epoch's plot operations treat them. Every change here is an op through the
hand path's operator (V06 §3.1 (4)), so its dry run, locality and undo are the hand path's.

**The `raisedWays` step** (V06 §3.2 row 10a; phase `history.raisedWays`, stage `EVO_RAISED`, item 342; `'grow-by-stage'`
registers no phase for it, so by the no-phase rule T-V6-1 is untouched). It runs, at every rung, in this order:
(A) **lapse** — sources lost, disuse marks and the `neglect` of a way whose disuse has run (V06 §3.19.2 (2));
(B) **repair, regrowth-first** — raised ways with a ruined span (or abandoned) and struck decks whose reason or crossing is live again
(V06 §3.19.2 (5), V06 §3.19.5 (4));
(C) **founding** — only at an epoch whose rung — the fold's, read at `prelude` (V06 §3.1 (3)) — is CITY or METROPOLIS (the rung gate, below):
the ledger, the candidates, the gate, the order and caps, the course, the clearing and the commit, (1)–(8) below.

**The rung gate** is the owner's rule (item 110 (b): "at CITY and METROPOLIS the generator raises a way
where there is a reason … A TOWN gets them only by declaration"): provenance owner, never a table cell that a calibration
or an `editTable` can move (V12's guard, V06 §3.19.1 (4)). At TOWN and at every village rung (C) does nothing; a declared
raised way stands held (item 101 R13), and one carried down from a city stands and decays or is repaired by (A) and (B).
The epoch that carries a town across into CITY is the first that may found one.

1. **The ledger.** `RaisedWayLedger` (V06 §2.13) is derived from the model and the log: per kind the cap at the epoch's rung,
   the standing generated ways, the declared ways, the suppressed reason keys and the count (V06 §3.19.1).
2. **Candidates**, read from the state after `terrainWater` and (B), from **ground-arena entities only** (`PlatKey.layer`
   `'ground'`, any part) — never a sky ward, an island institution, an island landmark, an
   island's conjured river or spring pond. The thresholds, factors, caps and chances are V11 §3.24.2's `raisedWays` rows,
   stated once there; this section keeps only the readings' geometry — `A`, `B`, the drop, the anchors, the
   intake — which is this volume's.
   * **Viaduct.** For each standing part-0 way of a class in V11's `viaduct.routeClasses` (through, primary, secondary; its lineage `W`) and each ravine or valley
     `SiteFeature` `f` whose extent its polyline crosses (the extent as S1 records it, item 290): `A` is the way's last
     vertex before its course enters the extent and `B` its first vertex after it leaves (a course crossing the extent
     more than once gives one reading per entry and exit; the key keeps the reading with the largest drop). The **drop**
     is `min(h(A), h(B))` less the lowest terrain along the chord `AB` (sampled at the terrain raster's cell); the metres
     **saved** are the course's length from `A` to `B` less `|AB|`; the **span** is `|AB|`. The reading is met when the
     span is at most `viaduct.maxSpanM`, the drop exceeds `viaduct.minDropM` and the **strength** `saved − span × viaduct.spanCostFactor` is above 0. The viaduct
     is laid **beside** the standing course, from `A` to `B`, carrying the way's class; the standing ways keep their
     course and class (street lines persist; primaries never downgrade, V06 §3.5.2) and the route is not re-solved.
   * **Elevated road.** The **endpoints** are the ground arena's high wards (districts whose area-weighted mean terrain
     height exceeds the town's household-weighted mean height by at least `elevated.minRiseM`), its terraced districts
     (volume 1's terrace kind), the citadel's reservation and each great temple's precinct reservation — reservations,
     never the institutions on them, so an institution's `handover` to an island (V05's `IslandInstitution.handover`) leaves the road's reason
     standing. Each endpoint's **anchor** is its highest part-0 way vertex inside it or on its boundary (ties by
     address); an endpoint with none is none. For each unordered pair of endpoints whose anchors `P1`, `P2` lie at most
     `elevated.maxSpanM` apart, the reading is met when the lowest terrain along `P1P2` lies at least `elevated.minRiseM`
     below both `h(P1)` and `h(P2)` and the segment passes over a district that is neither endpoint (the lower district).
     Its **strength** is the mean of the prosperity field at `P1` and `P2` × `landmarkFactor^n`, `n` (at most
     `landmarkMax`) the dossier's landmarks on high ground inside either endpoint by V11 §3.24.7 (4)'s test (V08; the
     dossier trace).
   * **Aqueduct.** The **need ratio** `r` is the base's eager water-need reading (item 290) — the in-wall households' demand over the supply of wells, river and lake frontage and cisterns
     at the base's distances, plus the deliveries of the standing aqueducts in use — evaluated with the epoch's **ground**
     households only; it never reads V04's placed cisterns or an island's water. The **terminal** `T` is
     fixed first (6). Each ground **source** — a spring as S1 records it, or a river on the ground terrain — gives one
     candidate: its **intake** is the spring itself when it lies at least `aqueduct.minFallPerKm` × its straight distance
     to `T` in kilometres above `h(T)`, or, for a river, the first point met going upstream along its course from its
     point nearest `T` whose water surface lies that far above `h(T)`; a source whose
     intake lies farther than `aqueduct.sourceReachKm` from `T`, or outside the S3 lattice's extent, or that has no
     such point, is not met. The reading is met while `r` exceeds `aqueduct.needRatioMin` — and, at CITY and METROPOLIS with the dossier's water-system
     record present, counts as met (V11 §3.24.7 (3) (a)); its **strength** is `r`, ties
     by the intake's distance to `T` (the nearer first), then by the key's address. After each aqueduct admitted this
     epoch, `r` is re-read with its delivery counted, so a second aqueduct is founded only while the need remains.
3. **The gate first** (J-V6.68's idiom). Each met candidate's `RaisedReasonKey` (V06 §2.13) holds one uniform `u`, drawn on
   the base's raised-way stream with epoch component 0 — the same draw generation makes, never re-drawn (V06 §3.16;
   J-V6.84). The candidate is **live** only while `u < p`, `p` V11 §3.24.2's chance at the epoch's rung — its "chance,
   stated once" over `chance[rung, kind]`, `pMax` and the kind's factor (the ends' mean band, the landmarks and the
   culture for an elevated road; the era and the culture for an aqueduct — the dossier's water-system record makes the
   need count as met and never scales the chance), evaluated
   here and never restated. No course is solved for a candidate whose gate fails. So a
   reason becomes live the first time `p` rises above its fixed `u` — monotone in the rung (`p` is 0 below CITY) and
   independent of the cadence up to the weeks at which `p` is sampled.
4. **Order and caps.** Live candidates are taken **kind by kind — aqueduct, then viaduct, then elevated road** (necessity,
   then passage, then prestige; J-V6.85) — and inside a kind by strength descending, ties by the key's address (the
   aqueduct's by distance first). A key whose way stands, or that a live removal suppresses, is never a candidate: it is
   already counted (V06 §3.19.1, V06 §3.19.3); a suppressed key is still read by (2) and gated by (3), and one whose gate passes
   is reported in `raised.suppressedFired`, never admitted (V06 §3.19.3 (2)). A candidate is admitted while its kind's count and the rung's total count stay
   below V11's caps (V06 §3.19.1) — the aqueduct cap and the total raised by `capPerSizeMember` for each SIZE member of the
   dossier's water-system record (V11 §3.24.7 (3) (c)); an admitted candidate raises both counts before the next is considered.
5. **The course.** The base's raised-way course solver — the one S4 and T4's dry run use (item 290) — solves the
   course on the S3 lattice with `existingFabricCost` (§4.3): from `A` to `B` (viaduct), from `P1` to `P2` (elevated
   road), from the intake to `T` (aqueduct). Locked, pinned and declared entities, dossier-listed buildings, every other
   raised way's supports, enceinte towers and gates are **impassable**, filtered before any draw (J-V6.7), and so are the
   committed sky accesses' runs, read through V05's `skyAccessObstacles` (V05 §2.3b); an occupied
   footprint costs the table's demolition cost; where the course crosses a standing curtain it passes through a **wall
   opening** (an aqueduct) or a **raised gate** (a viaduct or an elevated road) added as S7 furniture in the commit (V06
   §3.7.6 (5)). Over each crossed part-0 way the solver holds the deck at least item 244's clearance above that way's
   levelled ground (item 244: `clearanceCm` for the crossed class, a generated way holding none and so taking
   volume 11's `raisedWays.structure` cell, plus the deck's depth — the deck's lower bound there). **Item 244's support
   step** (item 244; J-VI.27) then lays the stations and pier rings on the solved course — a generated way holds
   no `spanSpacingCm`, so its pitch is the one uniform the step draws on the raised-way stream keyed by the way's lineage
   (its reason key, (8)) and `pitch`, inside its material's `pierSpacingM` band — and a course one of whose piers stands
   higher than `maxPierM` for its kind is dropped (`raised_too_tall`, volume 11) and the candidate **waits**
   (`raised.waited`; its `u` unchanged). The spans' use (`open` or `vault`) is then the base's span rule on that
   course. A candidate with no course **waits** likewise and is re-evaluated next epoch.
6. **The aqueduct's terminal** (J-V6.92). `T` is the live
   `conduit_house` use's building inside the outermost enceinte nearest the in-wall households' weighted centre — on a
   dossier-bound document the use the water-system record binds, on a standalone one the roster's — its outlet at the
   building's frontage; where none stands, a fountain `Pin` at the square (a market square, an S9b square or a template
   plaza) nearest that centre, ties by address — **that square's existing fountain centrepiece when it has one** (no
   second fountain). The terminal is never an institution the roster or the dossier does not hold.
7. **Clearing the land.** The land the base reserves under the raised part — its support footprints (the support step's
   pier rings, (5)) and its under-deck strip (the deck's width plus V01 §3.17.3's `raised.stripMarginM` each side) — is cleared **before** the
   commit, in address order: a vacant, derelict, ruined or cleared building there takes `demolish`; an occupied one takes
   `demolish` only after its households are displaced into the ledger (`EpochOps.displaced`, cause `clearance`) and any
   dossier-backed use in it is relocated (*Dossier content across epochs*). Each demolition is charged to the `geometry`
   cap of the district it stands in (`ChurnLedger.take`). The clearing is **whole or nothing**: when any district's
   remaining `geometry` cap is below the demolitions it would take there, nothing is cleared and the candidate waits
   (`raised.waited`, its `u` unchanged; first considered again next epoch, in the order of (4)). It waits likewise when
   the households it would displace exceed the town's **free capacity** in regrowth tiers (0)–(5″) after the ledger's
   pool — its vacant and derelict dwellings' capacity and the crowding headroom (§2.6's capacity, V06 §3.6 (5)) — so the
   displaced are re-housed by `siting` in this epoch (V06 §3.8.1) and none is put in a tent by a raised way (T-V6-57): a
   city raises its arches where it can re-house the people it moves. The plots under the supports and the strip are
   re-cut by the operator's own least disruption.
8. **The commit and its reason.** The raised way is committed through the hand operator's event — T4 `road` with
   `raised` for a viaduct or an elevated road, the aqueduct class for an aqueduct — with cause `rule:raisedWay`, its
   lineage its reason key (V06 §3.16), the base record's `reason` set, its arch-vault chambers laid in the commit and reconciled by `under.extend` (V06 §3.2). The creation event writes **`detail.why`**
   (item 265), at most five rows: the reason row (`raisedWays.<kind>`, family `reason`, share the strength); the
   condition rows (family `condition`: the drop and the metres saved; the rise below the lower anchor with the two
   endpoints as `other`; the need ratio with the source and the terminal as `other`); and the gate row (family `gate`,
   share `p`). The report counts `raised.founded`; the chronicle writes `raisedWay`.

**The rows the pass reads** (this volume keeps no copy): V11 §3.24.2's `raisedWays` table and its settings (`totalCap`,
`viaduct.*`, `elevated.*`, `aqueduct.*`); the era and culture factors (V11 §3.19.1, V11 §3.20.3); V11 §3.24.7 (3)–(4) for
the dossier's water system and landmarks on high ground; V11 §3.18's structures block for the disuse and slump cells;
V01 §3.17.3's `raised.stripMarginM`. The rung gate is the owner's (CITY and METROPOLIS only; item 110 (b)), never a cell.

**3.19.1 The cap and the count** (item 110 (f): "within the rung's cap"; J-V6.86, J-V6.95).
1. **The cap bounds foundations, never survivals** (J-V6.64's rule). A kind's **count** is its standing generated ways plus
   its suppressed keys plus its declared ways; the rung's total is the sum over the kinds. The pass admits a new raised
   way only while its kind's count is below its kind's cap and the total below the rung's total cap. A decline, a fall in
   prosperity, a sinking water need or a rung fall removes none: a city above a cap after a rung change is reported
   `raised.aboveCap` for that kind (and for the total), chronicled once (the first epoch it holds), and founds none of
   that kind until its count is below the cap again.
2. **Declared ways count** toward their kind's cap: a user's T4 raised way or aqueduct, a skeleton file's. The generator
   fills only what the author has not built — the item 20 (h) analogue of V06 §3.9.1's `N_c − D_c`. A declared way is
   never removed by the engine and never makes the city "above cap" in the report (the report names generated excess
   only). A declared way whose own reading gives a suppressed key holds that key (V06 §3.19.3 (3)) and is counted once.
   The dossier declares no arches: a dossier-bound document's raised ways are generated or hand-drawn.
3. **Standing and released.** A generated way **counts as standing** while it is repairable — every span standing or
   ruined, none cleared, and every support standing or ruined (the way itself in use or `abandoned`). Once a span is
   dismantled (its stone taken) or a support cleared, the way is **released**: it no longer counts, it is no longer a
   repair target, its remaining supports and spans stand as ruins that the pool clears on salvage demand (V06 §3.19.2 (3)),
   and its reason key re-opens with the same fixed `u` — a new way for it is founded by (C) only when its reason is live
   again, minted with §6.3's collision suffix, its course solver costing the old ruins as ruined footprints (J-V6.95).
   While a way stands, regrowth-first holds: (B) repairs a raised way with a ruined span whose reason is live before (C) admits any new
   reason (V06 §3.19.2 (5)).
4. **Guards** (join V12's guard set as owner-rule bars, V12 §3.7.4): `raised.generatedBelowCity` — exactly 0
   foundings at a TOWN or village-rung epoch (ways carried down from a city exempt); `raised.reasonMissing` — 0 generated
   ways without a `reason` and its why rows; `raised.overCap` — 0 foundings that leave a kind's count or the total above
   its cap.
5. **Hand-offs.** V07's hand-down and hand-up rewrite no event, so a carried way keeps its
   reason, its spans and its state, and the suppressions cross in the log; (C) never runs at a village rung, and from the
   first CITY epoch it counts the declared and carried ways.

**3.19.2 Raised ways in disuse, decline and repair** (item 110 (b): "arches fall by stretch while piers persist"; J-V6.87,
J-V6.94).
1. **Only generated ways decay by disuse**; a declared way is held (item 101 R13) — it breaks only by a hazard or the
   landfall, and the user repairs it by hand (T4's inspector, "repair").
2. **Lapse and disuse**, in (A), for each standing generated way in address order:
   * **the lapse condition** — a **viaduct or an elevated road**: its carried way has been downgraded (or retired to a hollow way, V07
     §3.12 — read as downgraded), or neither end's
     foot junction has an incident part-0 way fronting an occupied plot; a viaduct carrying a primary never lapses by the
     second test (primaries never downgrade, V06 §3.5.2 — such bridges were kept in use); an **aqueduct**: its need ratio
     `r` below 1;
   * the base record's **`underuseSince`** (item 290) is set to the epoch's week by a `setAttr` (author `engine`) when
     the condition first holds, and cleared when it ends;
   * a way is **disused** at once when its carried way was downgraded, and otherwise when `(week − underuseSince) ÷ 52`
     reaches `streets.abandonAfterYears` (viaduct, elevated road) or V11 §3.18's `aqueduct.disuseAfterYears` (its value V11's); a disused way
     takes **`neglect`** (existence `abandoned`, item 291's raised member) in this step — deterministic, as a ring in long
     safety is (V06 §3.7.3) — chronicled `raisedWay`, counted `raised.disused`;
   * **an aqueduct runs dry at once** when its source is lost — the spring's reach silted dry, or the river moved or
     silted away from the intake, by this or an earlier epoch's `siltReach` or `shiftCourse` (V06 §3.12): the intake no
     longer lies on the source's water face. It takes `neglect` in this step, its terminal's supply reading goes off at
     once (so `r` rises from this epoch's reading on), chronicled "the aqueduct runs dry", counted `raised.ranDry`.
3. **The strike** (the pool's `raised` kind, V06 §3.5.2, rate 0.05 — item 291's persistence row, one dwell band slower
   than buildings, as walls). An abandoned way's candidates, weighted `w = E(x) · rate · u` at the span's midpoint as the
   strike pool's (§4.11), charged to the `fabric` cap of that district:
   * **each standing span** whose dwell band has run since the way's neglect (drawn once per span, keyed with the epoch
     of the neglect, V06 §3.16) → `breach` on its `SpanRef`, weight × `min(1, 0.2 + demand ÷ yield)` (arches fall sooner
     where their stone is wanted; our own floor 0.2, as the wall pathway's) — the deck and the arch over the span fall
     `ruined`; its rubble stays;
   * **a ruined span's rubble** with salvage demand in its haul radius → `dismantle` on the span (stone credited to the
     ledger, §4.11 *Salvage*; the span `cleared`), weight × `min(1, demand ÷ yield)`, never a candidate without demand;
   * **a support both of whose spans are ruined or cleared**, with salvage demand → `dismantle` on the support (cleared),
     weight as the rubble's — supports outlast spans, late in the persistence order, so a ruined aqueduct stands for
     centuries as a row of piers;
   * a span or a support whose fall would cut a gate's or a plot's only path (§5.3's network invariant, reading the way
     the deck carries) is filtered out before the draw (J-V6.7).
   The span's arch-vault chambers collapse with it **in the same batch** (the breach and dismantle ops carry V04's
   `collapse`, item 291), so no chamber stands under a fallen span at any batch; `under.extend`'s reconcile over
   `scope.raised` finds them done.
4. **Hazards** (V06 §3.11): `topple` takes a support, weighted by its height, and breaks both spans beside it; an `inundate`
   whose depth at a timber support's foot reaches `timberScourCm` breaks it at `collapseShare`, a masonry support never;
   a landfall ruins the spans and supports it covers whatever their state — that is the island's law (V05 §3.16), and `sky.islands` records them in `scope.raised`, so this epoch's `raisedWays` reads an aqueduct's lost supply
   in its need ratio at once. A hazard breaks a way in use too; its repair is (5).
5. **Repair, regrowth-first** (in (B), before (C) admits any new reason). Each standing generated way that is abandoned or
   has a ruined span, and whose reason is **live again** — an aqueduct whose source is sound and whose `r` is at or
   above `aqueduct.needRatioMin`; a viaduct or an elevated road whose carried way is in its class and in use again
   (`upgradeWay` or `reopenWay`, V06 §3.8.2 (5′)) and one of whose foot junctions fronts an occupied plot — is repaired,
   in address order:
   `repairRaised` (V06 §2.8) on each ruined span (its ruined supports with it), then on the way itself (back `in use`), each charged to the `fabric`
   cap of the span's district; a span the cap refuses waits, the way `abandoned` until its last span is repaired. A way a
   hazard broke while in use is repaired the same way, its reason being live. **A way struck in this epoch is repaired
   from the next epoch** (never in the batch that struck it); a dismantled span or a cleared support is never rebuilt —
   the way is then released (V06 §3.19.1 (3)). V04's vaults are re-laid over the repaired spans by `under.extend`'s reconcile.
   While a viaduct that carries a route has a ruined span, the route's standing ground course carries its traffic (the viaduct
   was laid beside it, (2)); an elevated road's traffic uses the ground ways below. Counted `raised.repaired`, chronicled.
6. **The chronicle and the report**: `raisedWay` lines for a founding ("an aqueduct is raised from {cause} to
   {district}"), its finish, a repair, a run-dry, the first epoch above a cap, and one counted line per way per epoch for
   its fallen spans; the report's `raised` section (V06 §2.10), its `suppressedFired` entries by V06 §3.19.3 (2).

**3.19.3 A removal holds** (owner: "a user can decide to add or remove"; item 110 (b), (f); J-V6.83). The
base's collision rule (§6.3) mints a fresh entity over a tombstone (`~k`), and at an epoch the user's `delete` stands
earlier in the log than the generator, so a tombstone alone cannot hold a removal. Therefore:
1. **A removal suppresses its reason.** A `delete` of a raised way whose lifecycle cause is a generation or epoch rule
   carries `detail.suppress { kind: 'raised', key, reason }` (item 260), written by the delete operator — whether the
   `delete` comes from V09 §4.3's delete, the clerk or the CLI.
2. **Every generator reads it.** The ledger's suppressed set is the log's live removals; generation's S4 and S6, a new
   stage's S5b and this pass skip a suppressed key and count it as filled against its kind's cap and the rung's total
   (V06 §3.19.1), so no replacement appears elsewhere: the owner removed that viaduct, not the city's quota of viaducts.
   **The pass reports when the city would have rebuilt it** (J-V6.120). In (C), a suppressed key is read
   by V06 §3.19 (2) and gated by (3) as any other key — its uniform W59's keyed draw, drawn for it exactly as for any other
   key, so no other draw moves — and goes no further: no admission, no course, no clearing. Each epoch in which its
   reading is met and its gate passes (`u < p`), the pass adds one entry `{ removal, week }` to the epoch report's
   `raised.suppressedFired` (V06 §2.10): the `seq` and the week of the live `delete` whose `suppress.key` is that key, the
   entries in removal order (ascending `seq`). A key a user's re-add serves ((3)) adds none — its declared way holds it,
   its candidate reading `standing` — and a lifted removal none, its key no longer suppressed; a TOWN or village-rung
   epoch adds none, (C) not running there; generation's S4, S6 and S5b skip the key without an entry, writing no epoch
   report. Suppressed keys are read at every epoch, under V06 §6.1's over-budget fallback too (one per live removal), so an
   entry never depends on that fallback's rotation. V09 §4.10's `epoch` row draws one `info.raised.suppressed` line per
   entry (`{w}` the week; **Show** on the removed way's former outline, read from the `delete` event and its tombstone) —
   V08 §4.6 item 3's line — and the list is derived with the rest of the report and rebuilt by replay (W19).
3. **What lifts it.** Only the delete's undo, or a `forkAt` before the removal. **What serves it:** the user's own re-add
   of a way serving that reason — a T4 raised way or an aqueduct (`drawWay { raised: true, class, widthCm, points }` or
   the aqueduct class, the form V09 §4.20.3 (4)'s Build it again emits on the former course) whose reading (V06 §3.19 (2)
   applied to its ends) gives the suppressed key holds the key while it stands, counted once as declared, and deleting
   it later leaves the original removal in force.
4. **Across rungs and hand-offs.** A city that falls below CITY and rises again keeps the removal, because the suppression
   is in the log, not in the rung; volume 7's hand-offs rewrite no event (V06 §3.19.1 (5)).
5. **Re-runs.** `rerunFrom` lists the removal among the hand edits with "re-apply" (V06 §4.4); the re-apply resolves **by
   the reason key**, never by an address: when a way of that key stands in the fork it is deleted with its suppression;
   when none stands, the re-apply reports "the aqueduct this removal named was never built in this history" with the
   alternative "keep the city from building one" (the advanced panel's `raisedWays` rows, item 101 R2) — never a silent
   skip.
6. **The dry run says so** in plain words — V09's `info.remove.holds` line with its `{kind}` slot (V09 §4.20.3) — and
   lists the fates: the arch vaults deleted; for a viaduct, the route's standing course carrying its traffic; for an
   aqueduct, the terminal losing its supply ("the fountain in {square} runs dry").
7. **The same rule for the volume's other re-adding generators**: a generated harbour-mouth chain and a generated quay
   wall (V06 §3.7.6 (3)) — keys the enceinte and the harbour basin, and the enceinte and the waterfront's water body; a
   **generated retaining wall** — key its chain's lineage address, so the levelling's re-derivation (V06 §3.19.4 (1)) and
   the restoration ((6)) skip it; and a **generated deck plot** — key its deck host's id (item 246) and its slot ordinal
   along the deck from the host's first end, so tier (5)'s deck faces (V06 §3.19.5 (1)) skip that slot. Each is
   counted held while no re-add serves it, and lifted only as (3) states (the delete's undo, or a `forkAt` before the
   removal). **What serves each key** — the re-adds, keys unchanged, in the forms V09 §4.20.3 (4)'s **Build it again**
   emits (and V10's **Put it back**, which takes the same events through `ClerkMount.rebuildEvents`; J-V6.116):
   * a **quay wall** (enceinte, water body) — `drawWall { kind, points, closed }` of the removed wall's kind on its former
     line: served while a declared wall of that kind walls the key's waterfront arc (the waterfront rule's own arc
     reading, V06 §3.7.6 (3)), so the rule finds the arc walled;
   * a **harbour-mouth chain** (enceinte, basin) — `placeGate { enceinte, at }` at its former place: served while a
     declared water gate of that enceinte stands across that basin's mouth (the rule's own "mouth enclosed" reading);
   * a **retaining wall** (its chain's lineage address) — `drawWall { kind: 'retaining', points, closed, highSide }` on its
     former chain: served while a declared retaining wall stands whose chain lies on the removed chain's line from its
     first vertex to its last (Build it again's points are the former chain's, read from the tombstoned record's last
     state; T3's snapping puts a redraw along the same step on it);
   * a **deck plot** (host, slot `k`) — `drawFootprint { polygon, cls? }` on the deck whose plot S11 fits at slot `k`:
     served while that declared plot stands at (host, `k`).
   A served key is never generated again while its re-add stands — no duplicate at any epoch, regeneration or re-roll —
   and is counted once, as the re-add (declared), never in `suppressedHeld`; deleting the re-add leaves the original
   removal in force, as for a raised way ((3)). A tombstone keyed by the line alone would not hold: §6.3's collision rule re-mints over it (the
   preamble above). Islands and sky accesses keep V05's record form (`SkyIsland.removed`, `.removedAccesses`) under
   the same lift rule (item 260, §2.8; kept apart, E-02).

**3.19.4 Retaining walls over epochs** (item 110 (a): "never an enclosure (it is not an `Enceinte`)", "generated walls
re-derive with their terrain; drawn ones are held"; J-V6.88).
1. **Made or re-derived only where an epoch levels.** Generated `RetainingWall`s are made or re-derived only by an op that
   levels: a new stage's S10 and S11 on its new faces; a rung-3 re-cut, or a `rebuild` or `reuse … build` that runs S11 on
   its plot (a rebuild that keeps its footprint does not re-level); and `raiseGrade` (V06 §3.11.6), under which each wall
   inside the raised region is **tombstoned** in the `raiseGrade` batch (cause `convert:raiseGrade`) — V04's
   buried-system builder reads a tombstoned wall inside the region as a step in the buried floor, the storey chambers on
   its high side taking its high-side datum (V04 §3.5.5), so the buried town keeps its terraces — and new ones are
   derived on the new grade. A generated wall whose chain lineage a live removal suppresses is never made or re-derived
   (V06 §3.19.3 (7); counted `retaining.suppressedHeld`). No epoch re-derives a standing wall whose plots it
   did not re-level (V06 §3.16's no re-roll; T-V6-3's locality). Every levelled plot and block, with its walls, enters
   `EpochScope.levelled`; the report counts `retaining.created`, `.rederived` and `.buried` (the tombstones).
2. **No plot operation deletes one.** `amalgamate` merges only across boundaries that carry no retaining wall, else the
   plot takes `plotToGarden` (V06 §3.5.2); `plotToGarden` keeps the wall (a terraced garden, like a vineyard terrace); a
   rung-3 re-cut keeps it as a fixed plot line (V06 §3.8.4); `absorbWall`'s S10 re-cut keeps it likewise.
3. **They slump slowly, as their own candidate** (the pool's `retaining` kind, rate 0.05 — item 291's row, one dwell band
   slower than buildings). A generated wall is cut into stretches of `retaining.stretchM` (terrace walls fail in short
   slumps) from its first vertex; a standing stretch is a candidate when every plot on its high side within
   `retaining.holdM` of it has been empty, garden, orchard or field for `retaining.neglectAfterYears` — the three
   V11 §3.18's structures cells, their values V11's — read
   from the plots' lifecycle blocks, the span keyed with the epoch the last of them emptied (V06 §3.16). A strike
   `breach`es the stretch to `decayed`: no edge is removed and no terrain changes (item 245's state rule). `dismantle` takes a decayed
   stretch's stone only on salvage demand (→ `ruined`; the bank remains). A drawn wall is held. Chronicled
   `retainingSlump`, counted per district; the report counts `retaining.slumped`.
4. **Crossings keep their steps.** `downgradeWay` keeps a crossing's stair or ramp — an interval attribute of the way at the
   wall — and `upgradeWay` restores the class with the same crossing.
5. **Plans and the sewer.** In an epoch that levels, an unstored plan beside the levelled faces goes stale and a stored
   one is re-cut inside the epoch event (V03's outside-ground row; item 263; T-V3-30), and `under.extend` takes U-NET's invert
   drops at the wall crossings of the ways in `scope.levelled`. A tier an epoch adds or removes (a mutation step, a
   rebuild, a re-levelled stack) re-matches the building's stored plans by wing-relative storey (items 346, 347).
6. **Restoration** (J-V6.101). A `decayed` stretch of a generated wall is re-derived **intact** — a
   `repairRetaining` (V06 §2.8) in the restoring op's batch, so its lifecycle and undo are explicit — by (a) any op of an
   epoch that re-levels a plot on its high side within `retaining.holdM`: a regrowth tier (3) `rebuild` or `reuse …
   build` that runs S11 on the plot, a rebuild on a house platform (V07 §3.12: regrowth rebuilds on the platform first
   and repairs its walls at the platform's datum), a rung-3 re-cut — cause `rule:regrowth`, charged to the `fabric` cap
   of the stretch's district; and (b) the landfall clearance (V06 §3.5.2's `landfall` kind), cause `rule:landfall`. A
   `ruined` stretch is not restored (its stone is gone): the re-levelling lays a **new stretch** on its line (a
   successor lineage, §6.3), the ruined stretch tombstoned in the same batch. A **drawn** wall is restored only by hand
   (T3 `wall`'s inspector, "repair", V06 §4.2), a ruined drawn stretch bending to a new drawn stretch on its line
   (J-VI.4). A suppressed wall ((1)) is never restored. Counted `retaining.restored`.

**3.19.5 Decks over epochs** (item 110 (d): "removing or ruining the deck ruins what stands on it by least disruption;
rebuilding it re-offers the plots"; J-V6.89).
1. **Offering.** An epoch builds a deck only through a new stage's S5c bridge at an unused crossing site (§4.11) or a new
   stage's S7 harbour furniture, and restores one only by `repairRaised`'s deck form (4). Its deck faces — a mole, a pier,
   a quay platform, a bridge deck — are offered at regrowth tier (5) (V06 §3.8.2), cut by S10's deck rule under V11 §3.24.4's
   `deck` table as V02 §3.16 reads it; tier (4) and the use phase's openings and moves (V06 §3.9.5 (1), V06 §3.9.6)
   admit only uses that V11 §3.24.4's per-use `deckOk` admits (the use's effective crypt first — its class, a bound
   dossier crypt record or a `cryptAlways` keyword — then its class's column). A deck slot a live removal
   suppresses is skipped and counted `decks.suppressedHeld` (V06 §3.19.3 (7)). Counted `decks.offered`.
2. **The budget binds every epoch op on a deck plot** (V06 §3.8.4): no `densify` of either form and no rung-2
   `back_court`; a `relet` within the deck building's capacity; a `MutationPlan` step and a `rebuild` through S11's capped
   mutator (V02 §3.16 (3)); rung 3's `subdivide` and `amalgamate` inside the deck's width.
3. **Striking a deck** (the pool's `deck` kind, the street's rate 0.08, item 291). A deck is item 246's `Plot.deck.host`
   — a `Bridge` for a bridge deck, a `pier` or `quay` way for a mole, pier or quay platform — and **its condition is that
   host's lifecycle existence** (`breach` → `decayed`, `ruin` → `ruined`, `repairRaised` → the former existence from the
   striking op's undo record); `Bridge.state` is untouched. A bridge or pier deck is a candidate
   when its way no longer crosses live water (an oxbow silted to marsh, item 206) or its way has been downgraded, **and**
   no deck plot on it is occupied; a strike **`ruin`s** it (item 291's deck member) — the deck `ruined`, its way cut there only where §5.3's
   network invariant allows (else not a candidate, filtered before the draw). Hazards reach decks too (V06 §3.11): a flood
   whose water level passes a timber deck's soffit breaks it (`ruined`) at `collapseShare`; a `burn` that burns every
   building standing on a timber deck chars the deck to `decayed` (impassable until repaired); masonry decks break by
   neither. A hazard break that §5.3's network invariant would refuse leaves the deck `decayed` and standing instead,
   reported. **A struck deck ruins what stands on it** by least disruption, in the same batch: each building on its deck
   plots takes `ruin`, a dossier-backed use relocated first, its households displaced into the ledger (cause `flood`,
   `fire` or `clearance`), and the deck plots are tombstoned with the deck. Counted `decks.struck`, chronicled `deck` ("the
   houses on {subject} are swept away").
4. **Rebuilding, regrowth-first.** In (B), a ruined or decayed deck whose way is still in use and still crosses live water
   is repaired before any new crossing is made — `repairRaised` on the deck (V06 §2.8), charged to the `fabric` cap of the
   deck's district, from the epoch after the one that struck it; its deck faces are then offered again by (1), and the
   buildings raised on them are new lineages (V02 §3.16 (7)). Counted `decks.repaired`.

**3.19.6 A dossier-bound document** (items 20, 20 (h); J-V6.92). Raised ways are map-derived: the dossier lists
institutions, not arches. A dossier-bound document runs (A)–(C) as a standalone one does, with two limits: the
aqueduct's terminal is the water-system record's bound `conduit_house` when the dossier has one, else a fountain `Pin`
(V06 §3.19 (6)) — never an institution the dossier does not list; and a removed generated way is suppressed like any other
(V06 §3.19.3). The water-system record acts at CITY and METROPOLIS only, by V11 §3.24.7 (3) — the need test counts as met
(never a factor on the chance), each SIZE member raising the aqueduct cap and the total by `capPerSizeMember`,
its bound `conduit_house` the terminal — and never forces arches where no source is in reach (`pMax` holds; a miss is
reported `aqueduct_no_source`); landmarks on high ground and the era and culture rows are factors (the
dossier trace, V06 §1b). The clearing never touches a dossier-listed building (impassable, (5)).

### 3.20 The history replay at generation (item 113)

§4.11's *History-first generation* states what a known history does to a new map — the peak, the replay on the grow path,
the result carrying its past, destruction and refounding, surface or underground, sewers reopening, its edges and bars —
and §7.7's DR36–DR39 trace its inputs; `HistoryRecord` is §2.7's. This section is **the replay engine**: how a history
becomes coarse epochs, how its events map onto them, what a replay epoch does differently, the destruction, refounding
and burial on the engine's terms, and the record the story is told from. There is no second simulator: every coarse
epoch is an `epoch` event folded by V06 §3.1's runner through V06 §3.2's phases, its inputs planned instead of read from
the port or a trajectory (J-V6.127).

**3.20.1 When it runs.** Inside generation, after S0–S13a at the start population (§4.11 item 2), when `history.replay` is
on (V11; off in the parity presets, where the base's no-op pin T113-7 holds) and the history has a replayable span: DR36
gives a peak above the present population, or DR38 a destruction, or the history's age and events span at least one
coarse epoch with at least one mapped event. Otherwise no replay runs, the history's events stay §4.11 item 1's soft hints
(S2's stage count, the catacomb age, the buried old town) and `HistoryRecord` is absent. Its input is `HistoryHint`
(§2.7: the dossier's history through V08, DR36–DR39) or the blueprint's history option (§4.2 S0, standalone). A replay
epoch always runs the `'history'` strategy, read from `EpochInputs.replay` before the parameters (V06 §3.1 (2)); a build
without this engine (before M6-E) or a standalone neighbourhood document (no clock, V06 §4.1) never replays.

**3.20.2 The plan** (`ReplayPlan`, V06 §2.14; a pure function of the history and the pinned tables).
1. **The start.** With a peak (DR36) the replay starts at the peak — `startPopulation` the peak's population (a symbolic
   peak's V11's `history.symbolicQuantile` of its tier's range), `startYearsAgo` its date: `tierHistory`'s demotion from
   the peak tier, else `populationHistory`'s maximum. It starts at the **founding** instead — `startYearsAgo` =
   `history.ageYears`, `startPopulation` the population history's point at or nearest the founding, else the lowest
   registered ladder's floor for the founding tier (`tierHistory`'s first, else the present tier) — when the history gives
   the founding and at least one dated population or tier point before the peak (the growth to the peak then has
   recorded targets and is replayed: its stages, its walls), and whenever there is no peak (a destruction or events
   only).
2. **An undated peak** (a symbolic peak from ruined or remnant records, or a peak with no dated evidence) stands at the
   oldest dated evidence of the higher tier (a calamity's losses, a terminal death), else at half the history's age; a
   history with no age takes V11's `history.defaultAgeYears` for its present rung.
3. **The epochs.** The window is `[startYearsAgo, 0]`; `R = ⌈startYearsAgo ÷ epochYears⌉`, `epochYears` V11's
   `history.epochYears` (the owner's default, a decade). Above `replay.maxEpochs` (V06 §2.2) the epoch length bends to
   `⌈startYearsAgo ÷ replay.maxEpochs⌉` whole years, reported (`replay.bent`) — never an event dropped. Epoch `r` spans
   `fromYearsAgo = startYearsAgo − (r − 1) × epochYears` to `toYearsAgo = max(0, startYearsAgo − r × epochYears)`; the
   last ends at the present. A window shorter than one epoch is one epoch; `startYearsAgo ≤ 0` (a founding after the
   present: bad data) plans nothing and is reported (§4.11 item 7).
4. **Weeks.** Epoch `r`'s week is the creation week − `round(toYearsAgo × 52)` and the first epoch's `prevWeek` the
   creation week − `round(startYearsAgo × 52)`: signed weeks before the creation week (negative on a standalone map,
   whose creation week is 0), the last replay epoch's week the creation week itself; the week of the year reads the
   non-negative remainder of §4.11 *The clock* (3)'s formula.
5. **Targets.** The anchors are `(startYearsAgo, startPopulation)`, every `populationHistory` point inside the window,
   every `tierHistory` change inside it at the boundary population between its two tiers (§1.1's rung table), a
   refounding's restart (3.20.5 (2)) and `(0, the present population)` — a population point winning over a tier anchor of
   the same year, the last given winning among equals. Epoch `r`'s target is the piecewise-linear interpolation at
   `toYearsAgo`, rounded half up and clamped to the registered ladders (V06 §3.3.2's clamp: with V07 registered a target
   below 1 500 runs the village product, item 113's V07 part), times its `population` effects (3.20.3) where no
   population point lies inside its span, and 0 from a destruction until the refounding. The last epoch's target is the
   present population exactly.
6. **The dossier's records.** The start generation places every dossier institution record — those the dossier lists as
   live and those it lists ruined or remnant, which stood at the peak — with the roster filling the rest at the start
   population; a record whose founding or change the port dates before the creation enters the replay at the coarse
   epoch whose span holds that date, as a dossier event of that epoch (`EpochInputs.dossier`); and the **last** coarse
   epoch's `dossier` step carries every record's present state — a live record not standing placed, a standing one the
   dossier lists ruined or remnant ruined in place by §7.7 F5's path — so the dossier's present facts are met exactly
   (item 20; §4.11 item 2).

**3.20.3 The event-to-epoch mapping.** Each history event `{ type, yearsAgo, severity }` (DR37) maps to the coarse epoch
whose span holds its `yearsAgo` (`fromYearsAgo ≥ yearsAgo > toYearsAgo`; an event at the start in epoch 1), at the week
of its own date inside that span; ties by event index. An event older than the window happened before the start: it is
not replayed and stays a soft hint (§4.11 item 1); an ancient "Fall of" event before the founding is item 109's older
civilisation (DR30), never this replay's. Its effect is V11's event-to-epoch row for its type — one row per
SettlementForge event type (V08 reads the twenty-nine), each naming one effect kind of `ReplayEffect` (V06 §2.14) and its
parameters scaled by the event's severity — and enters the epoch as an ordinary input:
* `hazard` — an `EpochInputs.events` entry `{ week, kind, params }`, struck by the hazards phase as a timeline event is
  (V06 §3.11): a great fire burns and the quarter is rebuilt by regrowth tier (3); a great flood inundates and may raise
  the grade (V06 §3.11.6);
* `condition` — a condition over its years read by the condition's own readers for the span: `plague` adds its burials to
  the catacomb need (V06 §3.18.2 (3)), `drought` its years to the spring row (V06 §3.12.1); no `ConditionOverlay` is
  written (the condition is past);
* `slice` — the epoch's circumstances from the event's week (a raised threat drives the wall decision, V06 §3.7.1; a
  trade collapse lowers the economy slice) and its `wealthStep` on the wealth level (V06 §3.3.5), clamped to [0, 1];
* `request` — the class's deficit raised by `count` at the `uses` phase, opened by V06 §3.9.6's rule (cause `history`):
  a pilgrimage surge's hostels; a fortification class (an occupation's citadel) is laid by the fortification phase as
  §4.8's citadel furniture on the outermost enceinte, where one stands, else reported;
* `population` — the epoch's target × `factor` where no population point lies inside its span (plague years, a trade
  collapse emptying the edges);
* `destroy`, `refound` — 3.20.5.
An event type with no row is reported (`replay.unmapped`) and has no effect but its soft hint. Spontaneous hazards never
run in a replay epoch: the past is the recorded history.

**3.20.4 What a replay epoch does differently** (lazy detail; §4.1's laziness contract).
1. **Participants by their `replay` mode** (V06 §2.1): `'every'` — the underground's fade, extension, access and undercity,
   the sky's islands and clearance, V07's village participants, whose outputs later epochs read — run at every coarse
   epoch; `'last'` — `hood.fabric` (V01's S7c and S9b on the final fabric) — runs once, at the last coarse epoch, over
   the union of the replay epochs' scopes.
2. **No history-store images or keyframes**: the past's frames are rebuilt by replaying the creation prefix (3.20.6); the
   report keeps its counts, its `replay` section and its chronicle, not the `UseMove` rows (the why rows stay on the
   lifecycle events).
3. **Works** are dated in each span as in a live epoch; every Works finished before the creation week is retired by the
   last coarse epoch's `works` phase (§4.11 *Works* (9) with the creation week as the span start), so the present model
   holds only the Works still running at the creation — a quarter being rebuilt after a recent fire stands in scaffolding.
4. **Keys**: the epoch component `0x8000 + r` (V06 §3.16); **undo**: none — the creation prefix is flagged `creation`
   and is no undo target (§7.4); a blueprint's assignments and declarations are held as at any generation (§7.2).

**3.20.5 Destruction, refounding and burial** (item 113 (b), (c); DR38, DR39).
1. **Destroy.** A `destroy` effect at week `w` — SettlementForge's terminal death, a catastrophic event whose row maps to
   it — runs in its epoch's `hazards` step: every household leaves (`vacate`; the target 0 from `w` until the
   refounding), every use closes, every building takes `ruin` (cause `rule:destroy`), every way takes `retireWay` (V07's
   op, item 268: `abandoned`, its line kept as a hollow way and field boundary), every enceinte's ring takes `neglect` and
   its runs `breach`, every raised way `neglect`; dossier records keep their state (a dossier fact is never struck by an
   inference), chronicled `destroyed`.
2. **Refound.** A `refound` effect at week `w′` — SettlementForge's resettlement (a place forced to thorp), or, where the
   history destroys a place whose present population is above 0 without one, inferred one epoch after the destruction
   and reported (`replay.refoundInferred`) — restarts the target from the refounded rung's floor at `w′` (an anchor of
   3.20.2 (5)) under the history's culture row for the new settlement. The new settlement — a hamlet, village (V07 at
   village rungs), town or city by its target — grows by the ordinary phases over the ruins: regrowth tier (3)'s `rebuild`
   and `reuse … build` on the old foundations, tier (5′) and every placement reopening the hollow ways before a new lane
   is cut (V06 §3.8.2), new stages whose route costs price an abandoned way at V11's `history.reuseCost` through
   `existingFabricCost` (§4.3), S5b's gate law taking the old gate gaps, and `robStone` and `clear` of the ruins crediting
   the salvage ledger that the new building debits (§4.11 *Salvage*); the old plan persists wherever it helps.
   Chronicled `refounded`; recorded in `HistoryRecord.refounded`. With the present population 0 (a deserted place, V07)
   no refounding is inferred: the present is ruins.
3. **Burial.** At each coarse epoch's `close`, every connected region of ruined fabric — districts whose every building
   is `ruined` or `cleared`, with the hollow ways inside them — whose abandonment age (from the week its last household
   left to the epoch's week) reaches `B = history.burialYears ×` V11's burial factors (each great flood over it since, each
   silting of a reach beside it, rebuilding on top, bare rock by `site.terrain`) is buried by II.7.6's burial of the
   former settlement — the `raiseGrade` conversion with cause `burial` over the region, its streets, walls and major
   buildings becoming the `buried` system's elements at their old ground level, minted from this replay epoch — so later
   coarse epochs build on the raised ground. Chronicled `buried`; recorded in `HistoryRecord.buried`. Younger ruins stay on
   the surface and age by the decline ladder; the live engine buries only by `raiseGrade` after a great fire or flood
   (V06 §3.11.6). Access to the buried settlement follows item 109 (j) (V06 §3.18.1), lost when its link closes.
4. **Sewers reopen** by V04's J-V4.29 in `under.extend` (item 113 (d)), and access is lost and refound by V06 §3.18.1's
   rules (item 113 (e)), in the replay as in the live epochs.

**3.20.6 The replay record and the past on the timeline.** At the last coarse epoch's `close` the engine writes
`HistoryRecord` (§2.7) once, in that batch: `peak` (rung, population, `symbolic`, evidence, from the plan), `epochs` (each
coarse epoch's span and the events mapped to it), `refounded` and `buried`. V10's story reads it with the replay epochs'
chronicle ("the walls were built when this was a city of twelve thousand"; "its exact size is not recorded" for a
symbolic peak), as do the reader, §7.7's history rows and the exports (V06 §5.3). The coarse epochs are the creation
prefix: the history index marks them `replay`, the timeline bar shows them as a read-only past range (V06 §5.1),
`locate(w)` inside it rebuilds the frame by replaying the prefix to the first coarse epoch at or after `w` (V06
§3.15.2), then-and-now compares across the creation, and `forkAt` and `rerunFrom` inside it bend to the creation's last
event (V06 §4.4).

**3.20.7 Failure and limits.** A coarse epoch fails as a live one does (V06 §3.17); a history the plan cannot read — no
founding, no peak, no mapped event — replays nothing and is reported, the soft hints standing; a peak below the present
population is no peak (DR36), a peak above the rung table's top is sized at the cap (§1.1); the budget (V06 §6.7) bends
the epoch length, never drops an event and never retries the whole replay. A load replays the creation prefix as part of
the log (§6.3's replay cost, its coarse epochs included); a whole-town regeneration re-runs generation and its replay from
the seed and the history; an upgrade replays the prefix with the log (§7.5). T-V6-70 and T-V6-72 test it, with the base
bars T113-1 – T113-3, T113-6 and T113-7 (§13.2) run on this engine.

### 3.21 Every edge defined (principle (11))

**The general rule** (§5.1's E-GEN-1, for every mechanism of this volume): every phase commits geometry through the
kernel's transactions; a degenerate result — zero length, zero area, self-touching, collinear, coincident — is refused by
the kernel (§3.1: `E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE`) and the op is rolled back alone, reported with its
rule, the phase continuing on the state the earlier ops left (V06 §3.17 (1); §5's ladder: leave out and report) — never a
whole-epoch or whole-map retry. A new stage's geometry runs under its own failure classes (F-WALL, F-PLAN, F-PLOT, §5.2;
V06 §3.17 (3)). The rows below give each mechanism's own extremes; the edges of other units' mechanisms called here are
theirs. Tests: T-V6-73 (edges) and T-V6-74 (combinations), with the clauses named.

| mechanism | edge | defined outcome | rung (§5) | test |
|---|---|---|---|---|
| the engine's interfaces (V06 §2.1) | a phase id `ProductDecl.phases` names that is not registered; a participant id registered twice; a participant returning ops outside its scope; a `displaced` row naming a household its batch did not empty | the strategy's phase runs and the miss is reported; §4.12's registry refuses the second registration at load; the runner discards out-of-scope ops with the participant isolated (V06 §3.17 (4)); the row is dropped and reported | check; leave out and report | T-V6-26; T-V6-73 (a) |
| the trajectory and `advance` (V06 §2.3, V06 §3.3.2, V06 §4.1) | a span under half a week, a cadence ≤ 0 or fractional, unsorted or duplicate points, a point at or before the document's week, `perYear ≤ −1`, negative targets, non-finite numbers, an empty `points` list (EI-V06-EDGE-1) | V06 §3.3.2's degenerate-request bends; an empty `points` list holds `P0` (a `hold`); non-finite numbers rejected by the tool API's schema (§11.2) | repair locally (a bend named in one line) | T-V6-23 (h) |
| the `advance` group's undo (V06 §4.1; EI-V06-EDGE-2) | undo after a save and reload; undo in a shared document; redo after either | V06 §4.1's three cases: rebuild-by-replay then truncation; an `undo` event under the independence check; redo re-folds from stored inputs | retry that piece (rebuild by replay) | T-V6-23 (i) |
| hazard rows and the calamity table (V06 §2.4) | an unknown kind; a calamity matching two rows; matching none; a `drought` event (operator `none`) | reported and ignored; the first row in table order; `calamityUnmapped`; read by the spring row only, never struck | leave out and report | T-V6-27; T-V6-73 (b) |
| `MutationPlan` (V06 §2.5, V06 §3.10) | its building tombstoned; a step whose `dueWeek` a hand `setAttr` set before the plan's creation; a record with no parts; the `expect` digest broken | the plan cancelled at the next `ladder` phase, reported; the step due at once; no plan is created (an occupy-only change applies in its op); re-planned (V06 §3.10.3) | repair locally (re-plan); leave out and report | T-V6-15; T-V6-73 (c) |
| `BuildingShadeMask` (V06 §2.6, V06 §3.4) | absent (before the first epoch); its `grid` no longer the arena's (an island resized); a `mask` of the wrong length; a wing footprint of zero area; a march leaving the raster; a thorp's few buildings; a village rung | zero building shade until the field phase writes it; read as zero and rewritten whole at the next field phase, as a sampler mismatch; read as zero and rewritten; casts nothing (covers no cell centre); stops at the raster's edge; the same rule on a few cells; the field phase runs at every rung (no product overrides it) | repair locally (rewrite whole) | T-V6-12; T-V6-73 (d) |
| `EvolveOp` (V06 §2.8) | an op on a tombstoned target; `absorbWall` on a ring already cleared; `retypeLand` to the face's own kind; `repairRaised` on a standing span; `upgradeWay` with no `formerClass` | the operator refuses it, reported, no change; a no-op with its line; a no-op; a no-op with its line ("this span stands"); a no-op with its line ("this way has no former class") | check; leave out and report | T-V6-73 (e) |
| the epoch report and chronicle (V06 §2.10) | a report block missing on load; an older report lacking this version's sections | rebuilt by the verification replay (V06 §2.12); absent sections read empty | retry that piece (rebuild) | T-V6-73 (f) |
| suppressions and the ledger (V06 §2.13, V06 §3.19.3) | a suppressed key whose reason's feature is gone; a removal undone and redone; a reason key whose lineage was tombstoned | held, never fired (`suppressedFired` none) while unread; the live delete counts once; the key's address is unchanged (its hash) | check | T-V6-58; T-V6-73 (g) |
| the runner and the phase order (V06 §3.1–§3.2) | degenerate geometry from any phase; an epoch whose inputs change nothing | the general rule above; the phases run, their chances drawn as at any epoch (no special case) | leave out and report | T-V6-2; T-V6-29 |
| epoch inputs (V06 §3.3) | no change; exactly one epoch (`n = 1`, `f₁ = 1`); a dossier epoch without a target; every rung's clamp; the group's save, load and undo | as stated: the epoch runs; the target reached at once; the port refuses it (§7.7 item 15); the registered ladders' union (T-V6-51); V06 §4.1 | check | T-V6-23; T-V6-27; T-V6-51 |
| decline (V06 §3.5) | no leaving household; one; departures above any cap; a centroid outside the field grid; no exposure field (`E = 0`); a village epoch; a swap's undo | nothing departs; one `relet` down; no cap (item 8 (f)); the nearest cell's `E`; sorted last by address; the product's rows (V06 §3.5.2); the epoch's undo record restores every relocation | check | T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h) |
| growth (V06 §3.6) | no residual, no backlog, no crowding; one household below the quantum; the crowd factor's cap; a stage whose grown area is zero; a village rung; the METROPOLIS cap; the suburb regime under each preset; the backlog after a reload | no stage; the overflow ladder; §2.6's capacity; F-PLAN's ladder, then the overflow ladder (V06 §3.17 (3)); V07's `growth` override (V06 §3.1 (4)); the target clamped, no stage beyond it; the regime rows (item 293); derived from the records, equal after reload | repair locally; simpler shape (overflow) | T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| fortification (V06 §3.7) | no enceinte; one ring; the caps; a region whose approachable boundary has under three vertices or a ring of zero length; a village rung; the pathway's save, load and undo | the circuit's "no enceinte at all" clause; the rules as stated; the `fabric` cap; F-WALL's ladder — failing it the stage stays unwalled or the contraction waits (V06 §3.7.1, V06 §3.7.4 (3)); the circuit is V07's palisade path at a village rung (V07 §3.11), and this section's pathway, contraction and repair rules run on every standing ring at every rung; model data, the event's undo | simpler shape (unwalled), leave out and report | T-V6-9; T-V6-10; T-V6-11; T-V6-73 (j) |
| regrowth and uses (V06 §3.8–§3.9) | a zero-area plot; a candidate whose access needs a locked hollow way; one candidate; none | never a candidate (S10's legality); no candidate; it wins if it beats inertia; the use waits in its deficit, reported | leave out and report | T-V6-7; T-V6-13; T-V6-51 |
| mutation plans over epochs (V06 §3.10) | none due; one step; a cap refusing a step; a missing record part; the plan's save, load and undo | nothing runs; it applies; it waits; re-planned; V06 §2.12's row | check; retry next epoch | T-V6-15 |
| hazards (V06 §3.11) | an ignition point with no building within 30 m; `depthCm ≤ 0`; `topple` count 0 or radius 0; a thorp or village rung; a hazard's undo, a regeneration and a load | no ignition, reported; nothing floods; nothing falls, or the town as its area; the same operators at every rung (a flood only on a river or coast); its ops are batches of the epoch event — undone with it, replayed from the log's inputs | leave out and report | T-V6-16; T-V6-17; T-V6-73 (k) |
| terrain and water (V06 §3.12) | no candidate; one; a reach with under three knots; a marsh face of zero area; an oxbow under 0.1 ha at its forming; a spring with no household in reach; a spring on a sky island; overlapping droughts; the ops' undo, a regeneration and a migration | nothing changes; it fires once; no neck, no `shiftCourse`; no reclaim; typed marsh at once; no over-draw (`o = 0`); skipped (V05's water); their union of years; each a `convert` of the epoch event, undone with it, replayed; an absent `spring` is no spring | check; leave out and report | T-V6-18; T-V6-71; T-V6-73 (l) |
| Works scheduling (V06 §3.13) | a Works of zero duration; a change whose `WorksTable` row is missing; the Works' undo, retirement and regeneration | finished at its start week; applied finished, no Works, reported; model records undone with their epoch, retired at the span start (item 321), re-derived from the log | leave out and report | T-V6-19; T-V6-73 (m) |
| people (V06 §3.14) | an ancestry row without `lifespan`; a household whose `members` changes | the default [45, 80]; new slots keyed as at creation, ended slots ending their chains | check | T-V6-20 |
| the history record and frames (V06 §3.15) | an epoch with an empty touched set; a week before the creation; a frame after a reload; a missing history store | its frame equals the previous; the creation prefix's model (V06 §3.15.2); rebuilt by replay; the replay path serves | retry that piece (replay) | T-V6-21 |
| failure handling (V06 §3.17) | nothing declined; one refused op; a refused op on reload | an empty report section; rolled back alone; the same refusal on every replay (determinism) | as stated | T-V6-2; T-V6-73 (n) |
| the underground over epochs (V06 §3.18) | degenerate void geometry; a void whose last open link closes; growth over a sealed or lost void | V04's rules, the participant isolated (V06 §3.17 (4)); `lost` (item 113 (e)); refound (V06 §3.18.1 (2)) | leave out and report | T-V6-33; T-V6-35; T-V6-74 (a) |
| raised ways over epochs (V06 §3.19) | a chord `AB` of zero length; an elevated pair whose anchors coincide; an aqueduct intake at the terminal | no reading; no reading; not met (no fall) | check | T-V6-57; T-V6-73 (o) |
| the history replay (V06 §3.20) | no history; a founding after the present; a peak below the present; a peak above the cap; an undated peak; more epochs than `replay.maxEpochs`; an event older than the window; an unmapped event type; a destruction without a refounding while the present population is above 0, and with it 0; every rung from THORP to the METROPOLIS cap; the replay off and the parity presets; a load, a regeneration and an upgrade of a replayed document | no replay, soft hints; nothing planned, reported; no peak; sized at the cap; V06 §3.20.2 (2); the epoch length bends; not replayed, a soft hint; reported, no effect; a refounding inferred one epoch later, or none (the present ruins); the fold's product at each epoch (V07 at village rungs); byte-identical (T113-7); V06 §3.20.7 | check; simpler shape (coarser epochs) | T-V6-70 |
| hand forms (V06 §4.2) | a hand op at any rung; a degenerate drawn stroke; an op on a held entity | the hand ops are rung-independent, a raised way declared at any rung; the authoring boundary's validation (§7.1); refused only for a lock or a dossier fact (item 101 R2), else bent | check; repair locally (bend) | T-V6-73 (p) |
| locality (V06 §4.3) | an epoch that touches nothing; one entity | every entity byte-identical; only that entity's leaf digest moves | check | T-V6-3 |
| forks and re-runs (V06 §4.4) | a fork after a save and reload; a re-run inside the replayed past; before a rebase point | a new document of its own; bends to the creation's last event; bends to the earliest seq | repair locally (bend) | T-V6-22; T-V6-70 (k) |
| the clerk's view (V06 §4.5) | every rung; a document from before V06 | the same providers (V07's own at village rungs where it registers one); answered from the present placement, "reason not recorded" | check | T-V6-53 |
| rendering, labels, exports (V06 §5) | no epoch yet; a ring road of zero length; a degenerate frame feature; a frame drawn after a load | the bar hidden; no name, nothing drawn; omitted from the export and reported (§11.1); equal to the frame before the save | leave out and report | T-V6-21; T-V6-73 (q) |

**The combinations** where this volume's features meet other units' at their limits (canon's combination list; each at
every rung its features exist):

| combination | defined outcome | test |
|---|---|---|
| **a settlement that grows over a sealed void** (the owner's) | V06 §3.18.1 (2)'s *Growth over a sealed or lost void*: the dig draw, the sewer reopening its closed runs first (J-V4.29), the overlap breach; a lost void refound, its dwellings admitted from that epoch | T-V6-35; T-V6-74 (a) |
| **an epoch undone after a save** (the owner's) | V06 §4.1's undo case (2): rebuild by replay from the nearest keyframe or the creation, then truncation; in a shared document case (3) | T-V6-23 (i) |
| a cliff, a steep slope, a river, a coast, a harbour, a moat, a square or an oasis × the history (frames, then-and-now, exports at a drawn week, the replay) | each feature drawn as it stood at the drawn week from the frame (V06 §3.15.2); the replay changes it only by its ops (a course by `shiftCourse`, a coast by `reclaim`, an oasis by the spring row, a moat with its ring's pathway); a square keeps its outline and its fountain centrepiece | T-V6-21; T-V6-74 (b) |
| a cliff, a steep slope, a moat, a square, an oasis, the frame or an access × Works | a Works never alters terrain, water or a frame edge; its stages draw on a steep or cliff plot by `heightsAt` as anywhere; walls, moats, land uses (an oasis's gardens) and accesses take no Works (V06 §3.13 (1)) — an access follows its host's existence, never a Works stage | T-V6-19; T-V6-74 (c) |
| a steep slope × an epoch | levelling, retaining walls and stair-stepped ways by the base's rules at every epoch op that levels (V06 §3.19.4) | T-V6-62 |
| a deck plot, a terraced ward, a composed building, stepped tiers, a crypt or a stored plan × the history | each changes only by its epoch ops (V06 §3.19.4–§3.19.5, V06 §3.18.3, V02's mutator); frames draw it at the drawn week; a stored plan beside levelled faces is re-cut inside the epoch event, an unstored one stale (V03) | T-V6-62; T-V6-63; T-V6-55; T-V6-74 (d) |
| a close-up (hood) × the history | `hood.fabric` re-derives S7c and S9b on the faces an epoch made or re-cut (V06 §3.2); at a replay, once at the last coarse epoch (V06 §3.20.4) | T-V6-30; T-V6-70 (h) |
| a sewer, cavern, ruin, catacomb, undercity, void, access or vault × the history | V06 §3.18's rules at every epoch and every replay epoch (participants `'every'`); a buried former settlement from the replay is a `buried` system (V06 §3.20.5 (3)) | T-V6-33 – T-V6-40; T-V6-70 (f) |
| an island, its shade, a sky access or a landfall × the history | `sky.islands` and `sky.clearance` at every epoch and replay epoch; the landfall clearance (V06 §3.5.2); the island shade's one-epoch lag (V06 §3.4 (8)) | T-V6-30; T-V6-66 |
| an epoch, the history or Works × the light | a frame is lit by §8.4's light ladder at the view's own light setting (view data over the frame's model); a Works stage's heights cast by `heightsAt` at the drawn week | T-V6-21; T-V6-74 (e) |
| the history × a lock | a lock holds against every later epoch (V06 §3.1); scrubbing shows a locked entity's past states; a fork copies the locks before its seq; generation and its replay see only the blueprint's declarations | T-V6-4; T-V6-74 (f) |
| the history × save and load | the log keeps every epoch (the creation prefix's coarse epochs included); `HistoryRecord` and the masks are model data; the history store, frames and report are rebuilt by replay | T-V6-12; T-V6-21; T-V6-70 (j) |
| the history × an export | every export draws the drawn week (V06 §5.3); `plat:history` on the collection | T-V6-21; T-V6-70 (j) |

## 4 Editing — the declarations, the edit events, locality, undo and the clerk's view

Everything the engine does is an op a user can make by hand, and everything a user fixes the engine respects (§7.2;
item 101 R13: a declared or pinned thing is held). This section lists the new declarations and events; the base's edit
kinds are used as they stand.

### 4.1 Advancing time (`advance`) — T1's time card, the clerk and the CLI

* **Where.** The basic panel's T1 `intend` gains a **time card** (item 458): "Advance … years", a shape chip (grow by a
  share, reach a population, decline, hold, follow the timeline — mapped to the trajectory by V06 §2.3's table), an
  optional span, cadence, threat and era row behind "more", a hazards chip (none, minor, full; absent on a dossier-bound
  document), and "start small" at creation (V06 §3.3.3). The clerk's tool API gains `advance`
  (§11.2), and the CLI `plat advance <doc> --years N --to P | --rate r [--cadence w] [--hazards m]`.
* **A standalone neighbourhood document** (V01 §3.10; J-V6.102). A standalone neighbourhood document — one district's
  close-up opened alone, with no S4–S5 growth route — has no clock: the time card and "start small" are absent, the
  clerk's and the CLI's `advance` bend to none with the line "a neighbourhood alone has no history yet — open it in its
  town to advance time" (item 101 R2; V09's bend message row and V10's bend category carry it), and a skeleton file's
  `history` block is bent to none with that line; `forkAt`, the timeline bar over its existing events and the history
  panel still work. This is the decided rule (T-V6-23 tests the bend).
* **What it appends.** One `group` (§7.4) of `epoch` events, one per cadence step (V06 §3.3.2), each folded before the
  next is built and each carrying `EpochInputs.advance` (item 343); the trajectory rides on the first. The app runs it as
  a cancellable background job in the generation worker with a progress bar over the epochs; **Stop** ends the job after
  the running epoch, and the epochs already folded stand as a shorter group (J-V6.2's refusal on a dossier-bound document
  holds: its host owns time).
* **Preview** (item 101 R3, R14). Before commit, the card and the clerk run the whole request on a **scratch fork in the
  background** (the generation worker, lower priority than the picture), with its progress, and show the **end state**
  against the present (then-and-now, V06 §3.15.3) with a **count badge** — households and buildings gained or lost, the
  walled share, and the raised ways built (by kind) — so a hundred-year advance previews its hundredth year, not its first;
  the history panel lists their `raisedWay` lines. The clerk offers three variations —
  the logistic, linear and front-loaded shapes of the same change (V06 §2.3) — and the card one; accept appends the chosen
  one's epochs to the document (item 101's three-variations rule applied to time). Above `advance.maxEpochs` the card
  bends the cadence and says so (V06 §3.3.2). On a dossier-bound document the card is replaced by its alternative, "Make a
  what-if copy and advance it" (a detached `forkAt` at the head, V06 §4.4).
* **Undo** (§7.4). The group is one undo step (`of` its first epoch) while its last epoch is the latest live event, and its
  undo leaves exactly the fold of the log without the group:
  1. *In the session that ran it*, in an unshared document: the undo **restores the checkpoint taken before the group's
     first epoch** (the base takes it) and truncates the group (§7.4 *Truncation*) — so undoing a hundred-epoch group needs
     neither a hundred undo records nor §7.4's 64-event / 20 MB window. Per-epoch undo records are kept for the group's
     latest epoch only; after the group commits, its epochs' checkpoints are dropped except every
     `history.checkpointStride`-th, which become the history store's keyframes (V06 §3.15.2).
  2. *After a save and a reload* (the checkpoint is memory, gone): the undo rebuilds the pre-group state by §7.4's
     rebuild-by-replay — from the nearest history-store keyframe before the group, else from the creation — shown with its
     progress as a slow undo, then truncates as in (1); the undo section's saved `redo` holds the group, so a redo after the
     reload re-appends it epoch by epoch from the stored `EpochInputs`, never re-expanding the trajectory.
  3. *In a shared document* (no truncation, §7.4): the undo is an `undo` event naming the group's first event, applied only
     when every later live event is independent of the group's union touched set (§7.4 *Independence*; otherwise the dry
     run names the dependants, and "re-run from before it", V06 §4.4, is offered); every client reaches the pre-group state
     by its checkpoint or by the same deterministic replay, and the group's epochs stay in the log, undone. A redo re-folds
     them from their stored inputs.
  An epoch that carried a dossier event is never an undo target (§7.4), so a dossier-bound history is undone only by the
  host; a replay epoch at generation is none either (V06 §3.20.6).

### 4.2 The hand forms of the engine's changes

| change | tool and gesture (item 101) | event | undo and lifecycle |
|---|---|---|---|
| a ring's fate — road, absorb, keep — and its week | T3 `wall`'s inspector on a ring: a three-way chip and a year field | `setAttr` on `Enceinte.pathway` (`source: 'edit'`) | the event's undo; the engine never redraws an edited fate (V06 §2.7) |
| a ring road now, an absorbed wall now, a shorter ring | T3's inspector: "make a road", "build over it"; drawing a shorter ring with T3 | `convert` `wallToWay` / `absorbWall` (V06 §2.8) / `contractWall` (§4.11) | the convert's undo record (§7.4) |
| repair a breach; put a neglected wall back in use | T3's grip on a gap: "repair"; T3's inspector on a neglected ring: "back in use" | `convert` `repairWall` (with the gap's stretch; with no stretch, "back in use": the neglect lifted and the pathway cleared, V06 §2.8; on a ring with no neglect, a no-op with its line "this wall is in use") | the convert's undo (the former existence and pathway restored); on a dismantled stretch it bends to a new stretch drawn on its line (`drawWall`, "its stone is gone; a new stretch is built here"; J-VI.4) |
| let a lane go, bring it back | T4 `road`'s class chip on a way (`path` ↔ its former class) | `convert` `downgradeWay` / `upgradeWay` | the convert's undo; a `setAttr` of `class` clears `formerClass` |
| a fire, a flood, a collapse | a hazard tray on the history panel: drop a spark, draw a flood depth, tap a tower | the operator's dry run (V06 §3.11) — a ghost of the spread with three variations (the spread's draws keyed by the event's `seq` and the variation's reroll, §7.3 item 10) — committed as `convert` `burn`, or the `decay`, `flood`, `ruin`, `breach` ops it resolved to | one step; the displaced households' re-homing and the uses' relocations are in the same undo record (§7.4's capacity re-homing rule) |
| a field left fallow, taken back | T2 `ground`'s land-use chip on a hinterland face | `convert` `retypeLand` | the convert's undo |
| a spring weakened or restored (item 111) | T2 `ground`'s spring form on an oasis: the flow slider | `setAttr` on `WaterBody.spring.flow` | the event's undo; a hand flow is held: the spring row never overwrites it (V06 §3.12.1 (2)) |
| a drought on the timeline | the timeline bar's "+ at this year": a drought of N years | the circumstance timeline's event of kind `drought` (V06 §2.4; §7.7) | the base's |
| a town's past (standalone; item 113) | the creation card's history option (V09; §4.2 S0's `Blueprint.history`) | at creation, part of the recipe — the replay runs inside the creation (V06 §3.20); later, an `adjust` of the history option, which re-derives the town from S0 with its new past and replays the log's edits over it (§7.1's Re-derive), said in one line | the adjust's undo, while it is the latest live event (a whole-town event, §7.4) |
| a use opened, closed or moved | T6 `place` (drop a class stamp; drag a use's pin to another plot) | `convert` `openUse` / `closeUse` / `relocateUse` (§4.11) — with `mutate … spread: 'epochs'` from the "over years" toggle | the convert's undo; a plan made by it goes with it |
| a mutation's pace | T9 `shape`'s inspector on a building with a plan: each step's year, "do it now", "cancel the plan" | `setAttr` on `MutationPlan.steps[i].dueWeek`; a `mutate` with the step (item 264); `delete` of the plan | the event's undo; `delete` tombstones the plan, its done steps standing |
| a failing shop given time | the use's inspector: "clear its trouble" | `setAttr` on `Use.strain` (absent) | the event's undo |
| the engine's rates | the advanced panel's evolution rows (V06 §2.2's table) and `evolution.*` params | `editTable` on `tables/evolution` (§7.6); `adjust` of `evolution.*` | the base's; an edit applies from the next epoch and never re-runs standing history (J-V6.28) |
| a future on the timeline | the timeline bar's "+ at this year" (a slice change, an event) | the circumstance timeline edits of §7.7 (standalone) | the base's |
| a scheduled change | any tool with the "schedule" toggle | `startWorks` (§7.1) | the base's |
| hold something against history | T10 `hold` | `lock` / `pin` (§7.2) | the base's; the engine's filters exclude it before any draw (V06 §3.1) |
| a quay wall or an open waterfront; a harbour-mouth chain | T3 `wall`'s inspector on the waterfront arc: "wall the quays" / "open front"; on a harbour mouth: "chain the mouth" | `drawWall` on the waterfront arc with sea gates / `neglect`; the chain as S7 furniture (`place`) | the event's undo; a declared waterfront is held (item 101 R13) and the epoch's waterfront rule leaves it |
| a shop split from its works, or merged back | T6 `place` on a split class's use: "split into works and shop" / "merge onto one plot" | `openUse` with `branchOf` / `closeUse` of the shop (cause `edit`) and the map-side merge-back declaration (item 104 (a) (1)) | the convert's undo restores both uses; the declaration holds the pair merged at every epoch |
| a supply link pinned, moved or cut | V09's link view (item 105 (j)) | the map-side link declaration (item 104 (a) (1)); never written to the dossier | the declaration's undo; the epoch's re-binding honours it (V06 §3.9.10 (6)) |
| a record's member re-bound or held | T6's inspector on a member: "belongs to Blacksmiths (3–10)", "keep this one" | `assign` to the record's key / `pin` | the base's; a pinned member is never closed by the surplus rule |
| an access into a sealed cave or ruin; an excavation | V04's underground tools: `placeAccess` over an unexcavated cluster, `drawTunnel` with system `dug` | V04's `addUndergroundAccess` closure (§7.3 item 9) | the closure record's undo (V04 §4) |
| a crypt drawn, extended or declared | V03's interior tools on a church's basement ("crypt here"); V02's basement ring | V03's `setAttr(basement)` on `basement/crypt/ring`; V02's basement `mutate` | the event's undo; an author-set ring is never trimmed by the rank (V03 §3.7.4), at any epoch |
| a catacomb gallery drawn or deleted | V04's `drawTunnel` / `drawChamber` with system `catacomb`, delete | V04's edits | V04's undo; a deleted gallery lowers the ratchet's floor (V06 §3.18.2 (4)) |
| raise the ground after a disaster | the hazard tray: "raise the ground here" | `convert` `raiseGrade` (II.7.6) | the convert's undo |
| seal or reopen a passage; make a cleared back building a garden | T5 `plot`'s inspector on a passage or a cleared building | `convert` `sealPassage` / `openPassage` (§4.11); `reuse … as 'garden'` | the convert's undo |
| add a raised way | T4 `road` with `raised` (a viaduct or an elevated road), or the aqueduct class (item 110 (b)) | the base's hand operator's event (cause `edit`: declared) | its undo; held (item 101 R13); counts toward its kind's cap (V06 §3.19.1 (2)); a re-add serving a suppressed reason holds that key (V06 §3.19.3 (3)) |
| remove a generated raised way, harbour-mouth chain, quay wall, retaining wall or deck plot | V09 §4.3's delete on it; the clerk; the CLI | `delete`, carrying `detail.suppress` (item 260) — the dry run: V09's `info.remove.holds` line with its `{kind}` slot (a deck plot's wording V09's variant row of that key), with the fates of the vaults, the route and the terminal | the delete's undo lifts the suppression and restores the entity at its address (V06 §3.19.3) |
| build a removed generated thing again — a raised way, a quay wall, a harbour-mouth chain, a retaining wall, a deck plot | V09 §4.20.3 (4)'s **Build it again** on the removal's history row (where Undo this is refused as dependent); volume 10's **Put it back** (the same events, `ClerkMount.rebuildEvents`) | the declared re-add by its own tool, filled from the removed thing's last record: `drawWay { raised: true }` or the aqueduct class, `drawWall`, `placeGate`, `drawWall { kind: 'retaining' }`, `drawFootprint` on the deck (V09 §4.20.3 (4)'s rows) | the re-add's own undo; held (item 101 R13); while it stands it serves the removal's key — never generated again, counted once — and deleting it leaves the removal in force (V06 §3.19.3 (3), (7)) |
| repair a raised way or a deck by hand | T4's inspector on a raised way ("repair"), on a bridge or pier ("rebuild the deck") | `convert` `repairRaised` (V06 §2.8) | the convert's undo; on a dismantled span or a cleared support it bends to a new raised part on the way's line through the hand operator ("rebuilt as a new span"; J-VI.4) |
| repair a retaining wall | T3 `wall`'s inspector on a retaining wall's decayed stretch: "repair" | `convert` `repairRetaining` (V06 §2.8) | the convert's undo; on a ruined stretch it bends to a new drawn stretch on its line ("its stone is gone; a new stretch is built here"; J-VI.4) |
| a retaining wall | T3 `wall` in its `retaining` kind; the edge of a T2 `ground` terrace stroke (item 110 (a)) | the base's events | the event's undo; a drawn wall is held and never slumps (V06 §3.19.4 (3)) |
| a building on a deck face | T6 `place` on a deck plot | `build` / `openUse` through S11's deck rule (V02 §3.16) | the event's undo; a use the per-use `deckOk` refuses (V11 §3.24.4) bends to the nearest admitted class — a use whose effective crypt is `always` to land, by V09's T6 landward bend — said in one line (item 101 R2) |
| "no raised ways in this town" | the advanced panel's `raisedWays` chance rows (V11's table) | `editTable` | the edit's undo; applies from the next epoch and keeps the standing ways (J-V6.28) — its dry run says "the ways already built stay; remove them one by one if you want them gone" |

Every entity kind this volume adds has its edit kinds in §2.8's registry (item 264): `MutationPlan` (`setAttr` of a step's
`dueWeek`, `delete`), `Enceinte.pathway` and `underuseSince` (`setAttr` of the pathway; `underuseSince` engine-only,
declared derived-by-epoch and cleared by any hand change to the ring's trace), `Way.formerClass` (engine-only; cleared by a
`setAttr` of `class`), `Use.strain` (`setAttr`), `BuildingShadeMask` (engine-only, declared derived-by-epoch: a user
changes shade by changing what casts it or by the prosperity brush, item 102 (f)), `LifecycleEvent.detail.why`
(engine-only: a record of why, never edited — a hand move writes its own event with no rows, and the provider answers
"moved by hand in year N"), `Household.transit` (engine-only, epoch-local), `LifecycleEvent.detail.suppress` (written by
the delete operator; never edited — the delete's undo lifts it), the raised way's `underuseSince` (engine-only, declared
derived-by-epoch), a span's or support's `state` (the engine's ops and the hand `repairRaised`), a retaining stretch's
`state` (the engine's ops and the hand `repairRetaining`) and a deck's condition (its host's existence: the engine's ops
and `repairRaised`'s deck form). The crypt rank's caps,
the effective week, the catacomb primary, the excavation reading and the `RaisedWayLedger` are derived and have no edit
kind; a user changes them by changing what they read.

### 4.3 Locality, locks and the order of events

* **An epoch's scope is its touched set.** The locality oracle (§7.3) holds for an epoch as for any event: every entity
  outside its touched set and its faces is byte-identical before and after (T-V6-3). The engine's reach is wide by nature,
  but every change it makes is an op with its own recorded scope.
* **Protection first.** Locked, pinned and declared entities, assigned ones outside the use rules and the building of a
  dossier-backed use before its relocation are filtered out before any draw or cap (V06 §3.1; J-V6.7), so holding a thing
  never shifts which other things the history picks — the town adapts around it. **A removed generated raised way,
  harbour-mouth chain, quay wall, retaining wall or deck plot** is held by its suppression (V06 §3.19.3), which a tombstone alone could not do (§6.3's
  collision rule mints over a tombstone): no epoch, regeneration or re-run re-founds it while the removal is live.
* **Edits between epochs** are ordinary events at the head; the next epoch reads them as state. An edit on an entity with a
  running Works follows §4.11 *Works* (1)–(2).
* **Undo across epochs.** A standalone epoch is undoable while it is the latest live event, and through the independence
  check of §7.4 otherwise — which an epoch's wide touched set usually fails; the conflict then offers "re-run from before
  it" (V06 §4.4) instead.

### 4.4 Editing the past — forks and re-runs

* **`forkAt(seq)`** (§11.2; item 458): a new document with the same recipe and the log prefix through `seq` — the
  creation prefix and every event up to it — a fresh document id, and a `forkedFrom { docId, seq, modelDigest }` header
  outside every digest. A fork of a dossier-bound document is **detached**: it keeps its history (the dossier's facts up to
  `seq` are its facts) but no host bridge, so no later dossier event reaches it; it is a what-if, and the dossier stays
  the sole truth of the original (items 20, 22). **A what-if is a fork**: "what if I had kept the old wall" — fork before
  the epoch that dismantled it, lock the wall in the copy, and advance the copy (V06 §4.1); a re-run would not answer it,
  since `rerunFrom` forks and re-appends in one call, so no lock can come between, and with no change it reproduces the
  original (T-V6-22).
* **`rerunFrom(seq)`**: `forkAt(seq)`, then **every later event that is an epoch or a dossier event** (`EditBase.dossier`
  set, its `dossierChange` kept) re-appended **in log order** — the epochs from their stored `EpochInputs` (their weeks,
  targets, slices, events and carried dossier events unchanged), the standalone dossier events between epochs as they
  were — and recomputed on the fork's state. So a later epoch never names an institution only a dropped dossier event had added (item 20). Every
  **other** later event (hand edits, locks, table edits, adjusts) is not carried automatically; the report lists each with a
  **"re-apply"** action, which re-appends that event at the fork's head through the ordinary fold, its addresses resolved by
  §6.3's carry-over matching; an address that does not resolve returns F-EDIT with the closest alternatives (item 101 R2),
  never a silent skip. **A removal that suppresses a reason** (V06 §3.19.3) re-applies by its reason key, never by its
  address: the fork's way of that key is deleted with its suppression, or, where none stands, the report says so with the
  alternative (V06 §3.19.3 (5)). A detached dossier fork (J-V6.37) re-runs with the dossier events as recorded and receives no new
  one. Before a rebase point `forkAt` and `rerunFrom` bend as V06 §3.15.5 states. Inside the replayed past of a document
  generated from its history (its creation prefix) both bend to the creation's last event with the line "the past before
  year N is the town's history; the copy starts at year N" (V06 §3.20.6).
* **The history panel** offers both on any chronicle entry or timeline mark; the clerk offers a copy from before the
  event on "what if…" questions, and a re-run when asked (V10's prompt rule 17).

### 4.5 The clerk's view (volume 10 owns the prompts; this volume owns what the answers read)

The clerk reads, and cites by address and week: the chronicle (V06 §3.15.1); an entity's lifecycle block with its weeks and
causes (§2.8) — "when did this wall come down?"; a frame at any week — "what stood here in year N?" (V06 §3.15.2). Its
"why" questions go through **V06's four `WhyProvider`s** (V10 §2.13's interface, registered by `@plat/evolve`; each a pure
function of committed state and the log, so the answer is the same before and after a save, a load and a rebase, T-V6-53):
* **`use`** (kinds: `Use`): its cause is the latest use-phase lifecycle event (`open`, `relocate`, `close`) with its stored
  `detail.why` rows and the epoch's week — "why is this here?", "why did this inn move in year 40?" — link rows naming the
  goods and the other ends (item 105 (j)); its facts add `strain` and the year it began, a record's membership ("one of
  Blacksmiths (3–10)", item 108) and a split pair's other half; with no rows recorded (a hand move, a document from before
  V06) it answers from the present placement through V10's default provider, marked "reason not recorded";
* **`enceinte`** (kinds: `Enceinte`): the pathway (cause, fate, since, eligible year), the circuit's four conditions at its
  epoch from its creation event's `detail.why`, an absorbed wall's cleared record ("the old wall ran along these plot backs
  until year N"), an unwalled side ("the cliff is the wall here", item 106 (g)), a dossier gate ("the campaign lists no new
  walls"), a contraction that waited for water access;
* **`district`**, path `prosperity`: the building-shade share epoch by epoch from the masks of the history frames — "the
  island's shade since year N", "the tall houses built to its south since year N" — and a spring's flow from its `setAttr`
  events' why rows ("the oasis has been failing since year N", V06 §3.12.1), beside item 72's character and pressures,
  item 102 (f)'s daylight share and item 111's water term;
* **`mutationPlan`** (kinds: `MutationPlan`): its steps with their years, the step it opens at, and a crypt it carries.

**Raised ways** are answered by V10's raised-way provider (V10 §3.9; it serves generated ways from M3a, before this engine
exists); over epochs this volume records what it reads: the creation event's `detail.why` (the reason, its values,
the gate; V06 §3.19 (8); item 265 extended) — "why is this aqueduct here?" — the lifecycle's epochs and causes — "carried
from year N, when the town was a city (reason …)", "removed by you in year N" (the `suppress`), "falling
since year N", "run dry since the spring silted in year N" — and, for "why is there no viaduct here?", the
`RaisedWayLedger`'s candidates at the latest epoch: the rung (below CITY), the reason not met (the drop, rise or need ratio
against its threshold), the chance (`u` ≥ `p`), the cap (the count, with the ways that fill it), the suppression (your
removal of year N), or a wait (no course, or the caps could not pay for the clearing).
The underground's answers — why a void is sealed or open, a catacomb stagnant, a crypt capped or joined — are V04's and
V02/V03's providers reading the causes this volume's epochs record (`AccessCause.event`, `blockedBy`, the link's lifecycle,
V03's crypt rank). **The town's past** (item 113) is told by V10's history story from the replay record
(`HistoryRecord`, §2.7, written by V06 §3.20.6) and the replay epochs' chronicle — "the walls were built when this was a
city of twelve thousand"; for a symbolic peak "its exact size is not recorded". The clerk proposes `advance`, `forkAt`, `rerunFrom` and the hand forms of 4.2 as ghosts; nothing applies
silently (§14's clerk row).

## 5 Rendering, labels and exports

### 5.1 Rendering — every new state has its drawing

| entity or state | how it draws | where the rows live |
|---|---|---|
| a ring with a pathway (neglected, superseded, contracted) | the base's decline classes for walls: in use, neglected, breached or partly dismantled, superseded (item 8 (h)); a gate opened into a junction draws as a junction, with its square when made | §8.2's `states` rows (base) |
| a ring road (`wallToWay`) | a `primary` way (the base's operator); its curve is the old wall's | §8.2 (base) |
| an absorbed wall (`absorbWall`) | the `plot_line` rows it now is; the runs not yet `dismantled` draw by the base's superseded-wall `trace` treatment where no plot has built over them, their towers with them, and a `dismantled` run's towers draw as trace discs (item 575); the cleared record draws no label | §8.2's superseded-wall row (base) |
| a quay wall with sea gates; a neglected one; a harbour-mouth chain | the base's waterfront wall rows and the chain's gate rows (item 106 (d), (e)); neglected by the decline classes | §8.2 (item 106) |
| a split works-and-shop pair | two buildings drawn by their own classes (V02's works and shop buildings); the link view (V09) draws the pair's tie | V02; V09 |
| a sealed passage; a back building reused as a garden | the base's sealed-passage treatment; the yard's garden rows | §8.2 (base) |
| raised ground after a disaster | the new grade's terrain and the rebuilt fabric; the buried town in the underground view | II.7.6; V04's view |
| a void unexcavated, opened, settled, sealed | V04's unexcavated style under V09's `showUnexcavated` toggle; its access symbols; its dwellings by the undercity rows | V04 §5; V09 |
| a stagnant catacomb | V04's ossuary fill drawn denser; nothing lost | V04 §5 |
| a crypt, capped bays | V03's `Basement.crypt`, drawn by its plan; the capped bays as V03's `undercroft` rooms (vaults kept) | V03; V02's basement |
| a downgraded way | by its current class (`path`); `formerClass` draws nothing | §8.2 (base) |
| a burnt building | CHARRED (§4.11 *Works* (4)) until a clearance or a repair starts | §8.2 (base) |
| an oxbow | a still lake by the lake rows; its silting shrinks its face; its end is a marsh face | §8.2's water rows (base; `oxbow` maps to `lake` unless a sheet names it) |
| a field gone to pasture, commons, wildwood | the land-use rows of its kind | §8.2 / §8.10 (base) |
| a tent belt of the overflow | item 70's `tents` cluster rows | §8.2 (base) |
| a building under a `MutationPlan` step | its step's Works stages (§4.11 *Works* (6)) | §8.2 (base) |
| **then and now** — the `live.history` layer | `live.history.added` (an accent outline on what appeared between the two weeks), `live.history.removed` (a dashed ghost of what went, from the earlier frame), `live.history.changed` (a thin tint on what changed); a live layer, never in an export unless the export's layer set names it | §8.2's live-layer roles (item 409) |
| the building shade mask | draws nothing of its own; the shade map view (volume 9) reads the daylight share it feeds | volume 9 |
| a frame at a scrubbed week | the same display list builder (§8.1) over the frame's model at that week; the Works stages derived at the week | §8.1 (base) |
| a failing spring; withered gardens and grove; a dried oasis (V06 §3.12.1) | the pond by the water rows at its present outline (a drying pond's shrinking face); a withered garden by the `commons` land-use row, its channel no longer drawn (the channels are drawn from `fedBy`, §8.2); fewer grove rows; a dried oasis as its `commons` hollow | §8.2's water, land-use and greenery rows (item 111) |
| the replayed past (item 113) | no state of its own: the replay's results are ordinary states — ruins, walls beyond the houses, hollow ways, a buried former settlement in the underground view (II.7.6; V04's view) — and the timeline bar's past range (below) | §8.2 (base); V04 |
| a raised way neglected, run dry, with fallen spans, or reduced to its supports | the base's decline classes for raised ways — in use, neglected (no traffic, weathered), a span fallen (its rubble at the span's foot, the arch gone, the supports standing), a row of supports alone; an aqueduct run dry drawn as neglected; vaults under a fallen span not drawn (collapsed) | §8.2's state rows for raised parts (item 110 (b)'s drawing; item 291 names the states) |
| a slumped retaining wall; a restored one | the base's retaining-wall row in its `decayed` state (a bulged, broken stretch) and `ruined` state (the bank alone); a restored stretch (`repairRetaining`) draws by the standing row again, a replacement stretch as any new wall | §8.2 (base, item 110 (a)) |
| a landfall's rubble cleared (V06 §3.5.2) | each cleared member drawn by its own rows again (a way by its restored class and surface, a plot or reservation without the `fallen` rubble); a tombstoned `fallen_island` decoration draws nothing; the quarry face as `commons` | §8.2's `fallen` row (V05, item 408) and the base's rows |
| a struck deck and its ruins | the deck's `ruined` state (the carriageway broken, the piers or the mole standing) or `decayed` (a charred timber deck), read from its host's existence; its buildings as ruins until the deck plots are tombstoned with it | §8.2 (base, item 110 (d)) |

**The timeline bar** (`@plat/app`, beside the map's foot; item 458): a track from the creation year to the current year
(a dashed tail to a standalone trajectory's end); ticks for epochs, dots for chronicle entries of significance and dated
dossier events, flags for forks; a thumb that sets the `week` view key (§2.9); play (one epoch per 0.5 s by default,
0.25–4 s), step back and forward by an epoch, "now"; a then-and-now toggle that pins a second thumb and turns on
`live.history`; and the **history panel** — the chronicle as a list grouped by decade, each line clickable (it scrubs to
its week and selects its subjects), with "fork here" and "re-run from here". While the thumb is off "now", the map shows
a thin band "Year N — viewing the past" and every editing tool is disabled (edits are appended at the head, never into the
past) — **and every disabled tool offers the way forward: V09's "Open a copy from here"** (a `forkAt` at the seq of the
frame on screen, V06 §4.4; item 101 R2; J-VI.12). On a rebased document the range before the rebase point is greyed with
its banner (V06 §3.15.5); on a document generated from its history the replayed past before the creation week is a
read-only range of its own tint, labelled with the replay record's peak ("a city of twelve thousand", or "a city, its size
not recorded" for a symbolic peak), whose frames scrub and compare but offer no fork (V06 §3.20.6). The bar is hidden until the document has its first epoch or scheduled Works.

### 5.2 Labels, names and words

* **The ring road's name.** S13a names the way made by `wallToWay` with the naming feature `formerWall` (§9.6, §10.4;
  item 409), whose grammar rows are volume 11's; an absorbed wall gets no label, only its history note in the clerk's
  answers.
* **Years.** A week shows as a year and season of the calendar row (§4.11 *The clock* (3)): standalone "Year N,
  spring" counted from the creation week (year 1); dossier-bound, the host's calendar year when `HostContext` gives one,
  else the same form; a week of the replayed past (before the creation week) as "N years ago", counted back from the
  creation week. The year numbering is display only.
* **The chronicle's templates** — one per `ChronicleKind`, with slots `{year}`, `{season}`, `{district}`, `{subject}`,
  `{count}`, `{cause}`; our own neutral defaults ("{year}: fire in {district} — {count} houses burned."; "{year}: a new
  ring of walls encloses {district}."; "{year}: the old wall of {subject} becomes a road."; "{year}: the old walls of {subject} are manned again."; "{year}: the quays of
  {district} are walled against the sea."; "{year}: diggers under {subject} break into {cause}."; "{year}: people settle in
  the {subject} below {district}."; "{year}: the catacombs under {subject} can grow no further; the ossuaries fill."; "{year}:
  the new cathedral's crypt is dug."; "{year}: the sewers of {district} are begun."; "{year}: an aqueduct is raised from
  {cause} to {district}."; "{year}: the viaduct over {subject} is finished."; "{year}: a span of {subject} falls."; "{year}:
  the aqueduct runs dry."; "{year}: terrace walls slump in {district}."; "{year}: the houses on {subject} are swept away."; "{year}: the rubble of
  {subject} is cleared from {district}."; "{year}: the spring of {subject} is failing."; "{year}: the oasis of {subject} has run
  dry."; "{year}: {cause} destroys the town."; "{year}: a new settlement rises on the ruins."; "{year}: the ruins of the old
  town lie buried under {district}.";
  one per `ChronicleKind`, T-V6-26),
  overridable by volume 11's grammar rows and a setting pack (§10.4). Text is built at display; nothing is stored.
* **Descriptions** (§10.4) read the lifecycle: "ruined since year N", "rebuilt after the fire of year N", "once an inn"
  (`formerUses`), "a lane gone to a path"; they follow the drawn week.
* **Renames** by the character step are the base's (§6.3 case (5), item 72) and appear in the chronicle.

### 5.3 Exports

* **Every export draws the drawn week** — the current week, or the `week` view key's (§4.11 *Works* (9)) — so any
  format exports the town as it stood in year N from the frame of `locate(w)` with the effective-week rule (V06 §3.15.2):
  a ring road converted in a later epoch exports as the wall at a week before its epoch, at any cadence (T-V6-21).
* **GeoJSON** (§11.1) properties, on the features that carry them: `plat:pathway` (cause, fate, since, eligible week),
  `plat:underuseSince`, `plat:formerClass`, `plat:strain` (kind, since), `plat:mutationPlan` (its plan id, next step
  with its week, the step it opens at), `plat:since` (the week of the entity's latest lifecycle entry), `plat:why` (a use's
  latest stored why rows), `plat:member` (a record member's record and key, item 108), `plat:deckState` on a deck host's feature (its
  existence, `decayed` · `ruined`, absent when standing); and on a raised way (item 110 (b)) the properties of
  item 447 — `raisedKind`, `source` (the derived word), `reason` (the word; absent when declared), `underuseSince`
  on the way, `state` on each span and support Polygon, and a retaining wall's `state` — plus the creation event's why
  rows as `plat:why`, the property a use's why rows take (no second `reason` meaning); on an oasis water body `plat:springFlow`; on the document's
  collection the replay record as `plat:history` (its peak with its `symbolic` flag, its coarse epochs' count and span, its
  refoundings; item 113). The underground's properties
  (access causes, excavation, catacomb extent and fill, the crypt access) are V04's; a crypt's cap is V03's room role.
  `Household.transit` is never exported (it is empty outside an epoch).
* **CSV** (§11.1): `chronicle.csv` — week, year, season, kind, district, subjects, count, text, cause (kept across a
  rebase; the replay epochs' lines included, their year in the past form of V06 §5.2); `uses-history.csv` — the `UseMove` rows read from the lifecycle block's why rows (week, use, class, op, from, to,
  cause, the top rows of its why).
* **The animated history (APNG)** — the PNG exporter (§11.1) run over frames at an epoch stride (default every epoch,
  or every N years), each captioned with its year, 2 frames per second by default, the frame size the PNG export's; capped
  at 100 MB, the stride doubled until it fits (reported).
* **The skeleton file** (§11.1's declared subset, item 101) may declare a `history` block — a `Trajectory` — that the
  loader applies as an `advance` after creation, so a hand-written skeleton can say "this town at year 150 of its
  history" (on a standalone neighbourhood document the block is bent to none with its line, V06 §4.1).
* **Persistence** — the log keeps the epochs with their `EpochInputs` (their `advance` provenance included); the model keeps
  the new fields of V06 §2 (model data, in the digest); the report and chronicle are the non-canonical derived section
  (§5.4); the history store and frames are never saved (V06 §2.12).

## 6 Performance budgets

Measured on §12.1's reference hardware at the port's cadence (52 weeks), PLAUSIBLE until the E0 spike (V06 §8) times
them on the golden TOWN, B-CITY and METROPOLIS seeds with a scripted 100-year history (+1 % a year, then −1 %, then +1 %);
every miss re-declares its row for the owner's veto with the fallback stated (D-18).

**6.1 One epoch** (model work in the generation worker; a new stage's S5–S13 excluded — it is §12.6's scoped-regeneration
law over the stage's buildings; the participants in 6.2). **The work sizes** the rows assume (PLAUSIBLE until E0; the
golden seeds' counts): TOWN ≈ 60 classes with uses, ≈ 300 uses, ≈ 800 way edges, ≈ 1 000 households; CITY ≈ 120 classes,
≈ 1 500 uses, ≈ 2 000 way edges (V04 §6's count), ≈ 5 000 households; METROPOLIS ≈ 200 classes, ≈ 6 000 uses, ≈ 8 000 way
edges, ≈ 25 000 households. **The unit costs**: a Dijkstra edge relaxation ≈ 0.3 µs (V04 §6's rate), a bounded Dijkstra
at a class's `serviceRadiusM` visiting ≈ 40 % of the graph; one S10b score ≈ 3.5 µs (the 2–5 µs band); an opening scores
the top `uses.openCandidates` (64) plots by S10a's class raster at the candidate's centroid, then the full score; a
thriving use is scored against its ≤ 40 candidates only when its move-chance gate passes (its first draw on
`use.relocate`, V06 §3.9.5 (3); J-V6.68) — about `moveChance × years` of the uses.

| phase | TOWN | CITY | METROPOLIS | derivation (the dominant cost) |
|---|---|---|---|---|
| prelude, demand, dossier, lapse, close (incl. the feature re-resolution and the ladder steps) | 5 | 10 | 25 | table reads, S2's delta, the report |
| hazards (incl. the calamity mapping, `raiseGrade`'s trigger test) | 2 | 5 | 10 | a fire's rings (≤ `maxBuildings` spatial queries); `raiseGrade` itself is V04's buried-system builder at §12.6's scoped law |
| field: S6 re-evaluation (base) + the shade mask incremental, every arena | 15 + 5 | 35 + 20 | 90 + 60 | the driver kernels; ≈ 10 % of the cells re-marched (full recompute ≤ 40 / 120 / 400); the way-surface re-lay (V06 §3.4 (9)) over the ways a re-banded plot fronts, one table read each, < 1 ms |
| uses — strain: one labelled bounded Dijkstra per class | 6 | 30 | 190 | classes × edges × 0.4 × 0.3 µs |
| uses — moves: the gated re-score | 4 | 15 | 60 | uses × ≈ 0.08 × 40 × 3.5 µs |
| uses — openings and closings (with the coverage counts updated per op, O(districts)) | 5 | 15 | 50 | ≈ 1 % of the uses × 64 × 3.5 µs, plus the prefilter |
| uses — link re-binding after each committed op (item 105 (a)) | 5 | 30 | 140 | per op two bounded Dijkstras over the affected goods (≈ 1 ms at CITY, ≈ 1.4 ms at METROPOLIS) × the epoch's committed ops (≈ 5 / 30 / 100) |
| uses — the relaxation pass (≤ 2) and split / merge tests | 3 | 10 | 40 | the two-way classes' moved uses × 40 × 3.5 µs, twice |
| departures, decline (incl. garden reuse and passages; the raised, retaining, deck and landfall candidates: + 1 / + 3 / + 8) | 6 | 18 | 48 | the exposure field once; the strike pool; ≤ 4 raised ways' spans, the retaining walls under abandoned terraces and the decks at their dead crossings |
| fortification (incl. barrier closure, water access, waterfront), terrain and water (the spring row included) | 3 | 10 | 25 | a pathway's stretches; candidates; the spring row's few springs and their faces (< 1 ms); a trace (when one fires) at §4.4 S5a's own budget, excluded |
| `raisedWays` — lapse, repair, candidates and gates (a course is solved only for an admitted live candidate, at the S5a trace's own budget, and is excluded, item 244's support step with it) | 2 | 5 | 12 | viaducts: the primary and secondary ways × the crossed features, ≤ 40 × 10 at METROPOLIS, each a chord sampled at the terrain cell; elevated roads: ≤ 20 endpoints, ≤ 190 pair segments; aqueducts: ≤ 20 sources × one need reading; the lapse and repair of ≤ 4 standing ways |
| ladder + mutation steps | 20 | 70 | 200 | rung-3 re-cuts at the scoped law; S11 steps ≤ 5 ms each (§12.6) |
| siting | 15 | 50 | 150 | tiered placement with the solver's score |
| growth decision (incl. the crowding hook's seating) | 2 | 5 | 10 | U-FRONT's placement for ≤ `crowdingShare` × the residual |
| character, works | 5 | 15 | 40 | S12c; the Works' draws |
| **total (excl. stage, participants)** | **≤ 103** | **≤ 343** | **≤ 1 150** | |

*Pre-decided fallback* (uses over budget at METROPOLIS): the link re-binding is batched per class at the end of each
class's openings (one re-bind per class instead of per op; output changes only in visiting order through re-binds — a
declared shift for the owner's veto); then the move re-score visits each use every `k`-th epoch in address-hash rotation
(`k` = 2, then 4), a use under strain every epoch; the ladder's fallback is §12.6's. *Pre-decided fallback* for
`raisedWays` over budget: its candidates are read only for the ways, wards and sources an op of the epoch changed (the
suppressed keys excepted, read at every epoch, V06 §3.19.3 (2)), and in
full every `k`-th epoch (`k` = 4) in address-hash rotation — a declared shift in when a reason is first seen, never in its
gate draw.

**6.2 Participants and a century.** The participants' per-epoch budgets (their volumes' own rows govern when they land;
these are the sums this volume's century bound assumes, PLAUSIBLE until E0):

| participant | TOWN | CITY | METROPOLIS | source |
|---|---|---|---|---|
| `sky.islands` (≤ 3 islands: the step and the strips; **plus, per event, outside these cells, at every rung where an island stands** — TOWN's carried or declared islands included — each island event of V06 §3.2's `sky.islands` row at V05 §6's row for it: a raise bounded by "declaring an island after generation" (its parts' rows and V01 §6's sky row's unit run inside it); a resize, growing or shrinking, a wane's included, at "a resize, a rim reshape"; a fall at "`fallIsland`"; a wane, a settle and a refloat inside "`IslandEpochStep`, per island", their households placed by `siting` (V06 §6.1); summed into the century below) | 10 | 20 | 25 | the cells: V05 §6's rows "`IslandEpochStep`, per island" and "field pass 2: the strips onto the ground, per island (and per epoch)" over ≤ 3 islands; the per-event work: the V05 §6 rows the participant cell names, and V01 §6's sky row |
| `under.fade` | 3 | 8 | 20 | the fade candidates over the elements' exposure samples (V04 §3.10) |
| `under.extend` (the foundations act over the epoch's new footprints, supports and footings — a static-index query, inside the row; sewer extension over the new ways, catacomb growth ≤ 300 nodes, crypt joins, workings, the arch-vault reconcile over `scope.raised` ≤ 3 ms p95, the invert drops) | 6 | 17 | 43 | V04 §6's T1 and T2 rates over the epoch's share |
| `under.access` (a static-index query over the epoch's new footprints and elements) | 5 | 15 | 40 | V04 §6's T5 rate over the epoch's scope |
| `under.undercity` (incl. F6's relocations and the in-participant re-homing, ≤ 1 ms at CITY) | 1 | 4 | 8 | V04 §6's T4 row |
| `hood.fabric` (S7c and S9b on the new faces; the close-ups a raised part crosses) | 2 | 5 | 8 | V01 §6's rows per new district |
| `sky.clearance` (≤ 3 islands) | 3 | 3 | 3 | ≤ 1 ms per island (V05 §6) |
| **participants total** (the per-event island work of the `sky.islands` row excluded — raises, resizes, falls — summed into the century below) | **≤ 34** | **≤ 75** | **≤ 151** | |

**A century** (100 epochs at the port's 52-week cadence at a town growing 1 % a year, growth stages and participants
included; hand edits during the span excluded — each is an edit at its own row; item 110's rows add ≈ 0.7 / 1.3 / 2.6 s of
epoch work and at most one course solve per founding, ≤ 4 per century at METROPOLIS).
**The sky's island events** (J-V6.118), from V05 §6's rows by name with their bounds (the CITY / METROPOLIS columns; a TOWN
reads CITY's, its islands no larger): "a resize, a rim reshape" — its fixed ≤ 5 ms plus §12.6's scoped law per district
it re-derives (≤ 3 in all, V01 §6's sky row) and once over the plots it re-cuts outside them, plus §12.6's 30 ms per
re-claimed landing yard's top and per re-landed foot; "`fallIsland`" ≤ 80 / 110 ms; a raise bounded by "declaring an island
after generation" ≤ 120 / 160 ms. With an island's buildings ≤ 5 % of the town's at the default request (≤ 300 / 750
buildings at CITY / METROPOLIS, §12.5's table) and ≤ 3 accesses an island (`accessCount.max`), a growing resize costs
≈ 5 + 36 + 7 + 90 + 90 ≈ 228 ms at CITY and ≈ 5 + 63 + 7 + 90 + 90 ≈ 255 ms at METROPOLIS (three districts re-derived,
≤ 9 yard buildings re-cut, three tops placed and three feet re-landed), a shrink ≈ 209 ms and ≈ 227 ms (the claim's district
and the rim ring). **One re-landing per foot per resize is the worst case:** a rim moves at most `0.025 · years · r` a
year (V05's dynamics row; ≈ 4.5 m at CITY's `areaHaMax`, ≈ 6.3 m at METROPOLIS's), a ground plot may be 3 m wide (§15.2's
O5 (b)), and a target that moves back and forth carries a foot across the same plot line at every resize; **a fall does
not raise it**, since a fall ends a settled dwell of at least 10 years without a resize (V05 §3.15 (3)–(4)) and a fall
with a raise costs less than the ten resizes the dwell forgoes. So, at worst: **CITY** 3 × 100 × 228 ms ≈ 68.4 s;
**METROPOLIS** 3 × 100 × 255 ms ≈ 76.5 s; **TOWN**, whose rung row admits no island (V05 §3.15 (1)), each of ≤ 3 carried
or declared islands waning once over ≤ 15 epochs, settling and falling: 3 × (15 × 209 + 80) ms ≈ 9.6 s. A history whose
islands resize one epoch in five or fewer (V05's hysteresis against a 1 %-a-year target) spends about a fifth of these.
**The growth stages** at §12.6's law (V06 §6.1): ≤ one stage an epoch at ≤ 6 ms each plus 60 µs × the buildings the century
adds (≈ 2 500 / 10 000 / 25 000) ≈ 0.75 / 1.2 / 2.1 s.
**The sum:** TOWN 100 × (103 + 34) ms + 0.7 s + 9.6 s + 0.75 s ≈ 24.8 s; CITY 100 × (343 + 75) ms + 1.3 s + 68.4 s + 1.2 s
≈ 112.7 s; METROPOLIS 100 × (1 150 + 151) ms + 2.6 s + 76.5 s + 2.1 s ≈ 211.3 s. **The bounds are the sums rounded up to
the next 5 s — TOWN ≤ 25 s, CITY ≤ 115 s, METROPOLIS ≤ 215 s — for the owner's veto (D-18; J-V6.118)**; a measured sum
above its bound re-declares the bound at the measured sum for the owner's veto (D-18). The century runs as a background job
with progress, never blocking the picture or an edit on another document; the map redraws each epoch's `DisplayDelta` as
it folds (the user watches the town grow). `advance.maxEpochs` (200) bounds one request's epochs; a longer span bends its
cadence (V06 §3.3.2).

**6.3 Replay and load.** Under the `'history'` strategy an epoch's replay cost `c(e)` in §12.6's law is its compute above
plus its participants' (it is recomputed, not read) — item 478 states it in §12.6 — so a century-old CITY document
verifies within V06 §6.2's CITY century bound after load (its island events included), off the path to the picture (§12.6, §2.9 step 3), rebuilding the history store as it goes.
A `'grow-by-stage'` epoch keeps §12.6's scoped bound.

**6.4 Scrubbing and frames.** A cached frame ≤ 50 ms to the drawn delta at CITY, ≤ 120 ms at METROPOLIS; the images path
≤ 15 ms per event applied at CITY, ≤ 40 ms at METROPOLIS, so any frame within `history.checkpointStride` epochs of a
keyframe ≤ 300 ms at CITY and ≤ 800 ms at METROPOLIS; the effective-week before-images (V06 §3.15.2) add ≤ 5 ms per frame
at CITY; the replay path ≤ the epochs' compute, with progress. Play at one epoch per 0.5 s holds at CITY from cached or
image-built frames and at METROPOLIS from cached frames. *Pre-decided fallback:* the stride halves (5) while the store's
memory allows; failing that, play steps through keyframes only.

**6.5 Memory.** The history store ≤ the device's setting (256 MB desktop, 96 MB low-end; V09's settings) in memory, the
rest on the app's disk cache. An epoch's images ≈ 0.5–2 MB compressed at CITY (pass ≤ 1.5 MB mean) and ≈ 2–6 MB at
METROPOLIS (pass ≤ 4 MB mean) — so the desktop store holds ≈ 150 CITY or ≈ 60 METROPOLIS epochs before spilling; a
keyframe is the chunks changed since the previous one (≈ 5–15 MB at CITY, ≈ 15–40 MB at METROPOLIS over 10 epochs,
copy-on-write); frames ≤ the device's frame setting × the model's changed chunks. The retirement rule's extra year of
finished Works (item 321) adds ≤ 2 % to the model at CITY. The shade mask: one bit per sample point and sun per 32 m
cell, read from the sampler's layout (§4.5) — by default one point and nine suns, 9 bits a cell (V05 §3.19 (1),
J-V5.42): ≈ 11 KB at CITY (≈ 10 000 cells), ≈ 45 KB at METROPOLIS (≈ 40 000 cells), each island arena ≤ 5 KB; under the
sampler's pre-decided fallback of four points a cell (`daylight.pointsPerCell` 4) it is 36 bits a cell — ≈ 45 KB, ≈ 180 KB
and ≤ 20 KB. An advance group's undo holds one checkpoint and the latest epoch's record (V06 §4.1), inside §7.4's
cap. The per-epoch `why` rows add ≤ 5 rows × ≈ 24 bytes per use op to the identity layer (≈ 1–3 KB per CITY epoch).
*Fallback:* images kept only at every 5th epoch (the others by replay from the nearest), reported.

**6.6 Exports.** A frame's PNG export at the PNG export's own budget (§12.7) plus the frame's build (6.4); the APNG ≤ that
× its frame count, streamed.

**6.7 The history replay at generation** (item 113; V06 §3.20). Not the one-click path: a document generated from its
history shows its **start state** — S0–S13a at the start population — by §12.5's first-map law for the start rung, then
redraws each coarse epoch's `DisplayDelta` as it folds (the user watches it age), with progress, and is ready for editing at
the replay's end. A coarse epoch costs one epoch of V06 §6.1 and V06 §6.2 at its rung — `≤ 137 / 418 / 1 301 ms` at TOWN / CITY /
METROPOLIS, its decade changing the probabilities and caps, not the passes — plus at most one growth stage at §12.6's
law, less the lazy detail of V06 §3.20.4 (no history-store images or keyframes, the `'last'` participants once). With `R ≤
replay.maxEpochs` (60), the **replay's budget** is ≤ 10 s from a TOWN start, ≤ 30 s from a CITY start and ≤ 90 s from a
METROPOLIS start (p95, reference hardware; PLAUSIBLE until E0 times it on the history fixtures, V06 §8), the start
generation and the first map excluded. *Pre-decided fallback* (a miss): the epoch length doubles (`epochYears` × 2, the
count halved, every event still mapped to its coarser epoch) until the bound holds — a declared shift in the past's grain
for the owner's veto (D-18), never an event dropped and never a whole-replay retry.

## 7 Tests and acceptance bars

Families as §13 names them: **property** (§13.1's fast-check), **hook and invariant** (§13.2), **statistics bench**
(§13.2's many-seed bench; item 103 (e)'s form — measured shifts against a baseline, never guarantees), **B-EDIT** (§13.2),
**goldens** (§13.3), **visual** (§13.4), **performance** (§12, §13.8's tiers). The fixtures: the golden TOWN, B-CITY and
METROPOLIS seeds; **H-100** — a scripted standalone history of 100 epochs (+1 % a year for 40 years, −1.5 % for 30, +1 % for
30; threat 0.5 throughout; hazards `minor`); **H-DOSSIER** — a dossier-bound history replayed from the port's fixtures
(volume 8) with a mapped fire calamity and its F5 targets, an institution re-designation, a COUNT record ("Blacksmiths
(3–10)") across a rise and a fall, a see moving from one church to another and back, a walls REPLACEMENT, an
`activeChains` status change from `active` to `vulnerable` and back (neutral keys V08 §2.6 maps) and a catch-up epoch carrying two dossier events; **H-RIVER** — a river town with a meander
above 1.8 and a marsh beside built land; **H-PORT** — a walled port whose core lives inland of its quays, declining to 40 %;
**H-CLIFF** — a cliff-backed coastal town and a river-loop town; **H-VOID** — a site with a forced cavern and a forced ruin
under the core, growing from a hamlet's population; **H-CHURCHYARD** — a churchyard whose catacomb grows under its church;
**H-METRO** — a 100-year growth from TOWN to METROPOLIS; **H-VILLAGE** — 1 200 → 3 000 → 900 (with and without volume 7
registered); **H-DESERT** — with volume 7 registered, a village of 400 falling to 60 over 80 years and rising to 2 000 over
the next 60 (a desertion and a rise through the hand-up); **H-AQUA** — a town below a spring 4 km upslope inside the S3 lattice, growing from TOWN to CITY to
METROPOLIS and back to TOWN over 200 years, the spring's reach silted by a scripted `siltReach` in year 170; **H-TERRACE**
— a hill town on 20–30 % slopes, a century of growth, decline and regrowth; **H-DECK** — a river town with a timber bridge
carrying houses and a stone bridgehead, a harbour mole with a mid-mole tower, and a meander that cuts off under its second
bridge; **H-OASIS** — an arid town at an oasis (its spring `flow` 1, its gardens and grove), a 20-year drought from year
30, growth past the spring's `fullHouseholds` from year 60, and a dossier-bound variant whose `oasis_water` deposit turns
`depleted` in year 50 and `available` again in year 80; **H-HISTORY** — SettlementForge histories: a city of 12 000 at
its peak 260 years ago, a village of 600 today (`peakTier` CITY; a great fire, plague years, a trade collapse, an
occupation and a pilgrimage surge; ruined `City walls and gates` and a remnant cathedral listed); the same without
`peakTier` (a symbolic peak from the ruined records only); a town destroyed 300 years ago and resettled 180 years ago; and
a standalone blueprint history ("once a city, now a village", no age given). CI tiers: per-commit T-V6-1 – T-V6-4,
T-V6-12, T-V6-21, T-V6-26, T-V6-38, T-V6-52, T-V6-53, T-V6-58, T-V6-65, T-V6-70, T-V6-73; nightly the rest; the
statistics bench weekly on 200 seeds (§13.8).

| id | family | what | bar |
|---|---|---|---|
| T-V6-1 | goldens | the `'grow-by-stage'` strategy through the phase interface (its nine base phases) reproduces M4's grow path, including a **dossier-bound catch-up epoch carrying two dossier events** (both applied at step (e), the lapse, character and Works steps run) | byte-identical model digest to the M4 golden on every M4 fixture and on the catch-up fixture's log |
| T-V6-2 | property | determinism: the same seed and inputs fold to the same digest per epoch; a replay from the log and a replay from any checkpoint agree; the fold is identical on every host (§6.5) | 0 mismatches over H-100 and 50 random trajectories |
| T-V6-3 | hook | no re-roll and locality: every entity outside an epoch's touched set is byte-identical (leaf digests) across it; every survivor keeps its address and lineage | 0 violations over H-100 |
| T-V6-4 | hook | protection: a locked or pinned entity, a declared place (item 101 R13), a dossier-backed use and its building before its relocation are never struck, converted, closed or moved by the engine; holding one entity changes no other entity's draws | 0 violations; a lock toggled on an entity the history never touches leaves every other entity's history byte-identical |
| T-V6-5 | statistics | departures follow exposure: the mean `E(x)` of the dwellings emptied in a fall exceeds that of those kept; extramural and flood-band dwellings empty first; a core dwelling can still empty | on 200 seeds: emptied-minus-kept mean `E` ≥ 0.1; core share of emptied > 0 in ≥ 5 % of seeds |
| T-V6-6 | statistics | the persistence order over a long decline: a layer's **struck share** per decade = its entities stepped down (by the strike pool or, for walls, by the pathway's breaches and dismantles, counted by `walls.dismantleStretchM` stretches) ÷ its live entities at the decade's start; the shares order use > building > plot boundary > street > wall | ordered, each adjacent pair within a declared tolerance of 0.01 absolute, in ≥ 90 % of seeds over a 60-year decline |
| T-V6-7 | hook | regrowth-first: after decline then growth, no new face is built while tiers (0)–(5″) hold capacity beyond `decline.turnoverVacancy`; the old plan's vacancies are refilled first, each band keeping its turnover share vacant | 0 violations; ≥ 80 % of pre-decline plots reoccupied before the first new stage in H-100; the poorest band's vacant share ≥ 0.05 − 1 dwelling at every steady epoch (0 in the parity presets) |
| T-V6-8 | statistics | crowding before sprawl: households per dwelling of the crowding bands rise before a stage grows; decrowding moves households to the new stage; the rich bands never crowd | on 200 seeds: crowding precedes ≥ 80 % of stages; 0 rich-band crowding |
| T-V6-9 | hook + statistics | a new circuit and its suburbs absorbed: grown under threat 0.6, a ring encloses every earlier stage on its approachable arcs and its inner strip crosses no standing footprint; the old ring enters its pathway (`keep` while threat ≥ 0.6); then threat held at 0.4 (below `walls.keepThreat`) for 40 years: the `keep` fate is re-drawn at the first epoch below and splits road : absorb ≈ 0.7 : 0.3; on H-CLIFF the ring has zero wall edges on sheer arcs and walls a river loop at its neck only | 0 footprints crossed; fate share within ± 0.08 over 200 seeds after the re-draw; 0 sheer-arc edges |
| T-V6-10 | hook | a shorter ring: its trace passes through no occupied footprint and leaves every live quay reachable; a contraction that cannot is retraced at most three times and then waits (never forced); on H-CLIFF it walls only approachable arcs | 0 occupied footprints crossed; 100 % of quays reachable; 0 sheer-arc edges |
| T-V6-11 | hook | renewed threat repairs breaches (`repairWall`, the `breached` runs of the ring's `condition` in chain order; item 575) and never rebuilds a dismantled stretch; the record's lifecycle returns to its former state only when every run is `standing`; a hand `repairWall` on a dismantled stretch bends to a new stretch drawn on its line, and a hand `repairRaised` on a dismantled span to a new raised part, each dry run naming the bend (J-VI.4); on a sky fixture whose island falls at year 30 across a live ring (threat 0.6, no pathway) covering a stretch and a gatehouse, with one of the ring's runs `dismantled` by hand beforehand: the stretch and the gatehouse are `standing` again at the next epoch, the dismantled run is still a gap, and `walls.repairedInUse` counts the repaired runs; **0 Works whose target is a wall, a tower or a gate** at any batch, and after `absorbWall` every run is `dismantled` in time but one holding a raised gate under a standing deck, which is taken from the epoch after that raised way's removal (on H-METRO, the superseded curtain's fate set to `absorb` by a hand `setAttr` and a viaduct crossing it by a raised gate); a neglected ring under renewed threat is in its pre-neglect existence once its pathway is cleared — `decayed` while a dismantled run remains — also when no run was ever breached, **0 rings with no pathway in existence `abandoned`** at every batch, and a hand "back in use" lifts the neglect and clears the pathway, V06 §3.7.3 neglecting that ring again only `walls.neglectAfterYears` after the lift; a hand "back in use" on a ring with no neglect is a no-op with its line, changing nothing | exact on a scripted threat cycle; 0 refusals outside dossier facts and locks; exact on the landfall fixture; 0 wall Works and 0 abandoned rings without a pathway |
| T-V6-12 | property + hook | the shade mask: the incremental mask equals a full recomputation bit for bit, including on a fixture whose Works span the epoch's week and on an island arena; the mask survives a save and a load between epochs unchanged, and a sampler change reads as zero building shade until the next epoch; `w_sun` = 0 leaves the field and the town byte-identical to a history without the mask; on a **near-cut fixture** (a quarter whose value sits within `w_sun` × Δshade above a band cut, tall houses built to its south): the field band falls at the first epoch after the mask records them, never in the epoch that built them; rung 1 acts in that same epoch; rung 2 only after the ladder table's years; on a **stepped temple** (three massing tiers, item 110 (c)) the incremental mask equals the full one and each tier's top is its own datum plus its height, so each casts its own shadow; **way surfaces follow the field** (V06 §3.4 (9)): on H-100 with a prosperity `setField` brush lowering one district by two bands in year 40 and one of its lanes' `surface` edited beforehand, at the first epoch after the brush every other way fronted only by that district's plots carries V01 §3.7.3's value for its class, era and new fronting band (a `cobble` lane at `comfortable` now `dirt`), the edited lane keeps its surface (counted in `shade.surfacesHeld`), and no way fronted by no re-banded plot changes surface | exact; exact; exact; exact on the fixture's epochs; exact, one shadow per tier; exact, 0 edited surfaces rewritten |
| T-V6-13 | statistics | uses over time (items 17, 103, 107): after growth on one side, the mean distance from households to their nearest daily-local use falls within 3 epochs; a tannery on a river town ends downstream of the housing more often than the baseline; measured at every tenth epoch of H-100 with the web's weights on: a coverage class's `servedShare` on its own coverage unit (V12 §3.6) stays above its random baseline, a spaced class's nearest-member distance stays above its baseline, and consumer-to-provider distance lies within `comfortM` in most placements; the `use` cap holds per district | measured shifts ≥ the bench's declared deltas (item 103 (e), 107 (g)); comfort ≥ 0.7 of placements; cap 0 violations |
| T-V6-14 | hook | custom chains over epochs (item 104): an inactive chain's nodes keep their sites; a chain switched off and on with nothing else changed returns every node to its site; an anchor moved re-sites the chain in item 105 (f)'s order; a revision re-sites by least disruption | exact |
| T-V6-15 | hook | `MutationPlan`: steps apply in order at their weeks; each applies exactly its parts of the stored record; an incompatible present design opens the use at its first compatible step (a relocating use open at its former site until then); a hand edit between steps makes the next re-plan; a use leaving cancels the plan with done steps standing; the building's return to its former designation applies the inverse of the done steps; an always-crypt target carries its crypt from the occupy step; undo restores | exact |
| T-V6-16 | hook + statistics | fire: the spread never crosses a way corridor ≥ `breakM` or open water; `minor` never exceeds 6 buildings; the burnt plots are rung-3 eligible and rebuilt by tier (3); the rebuild shift lowers flammability for 30 years; on H-DECK a fire lit in the timber row on the bridge spreads along the row over the water and stops at the stone bridgehead, and a burn of every building on the timber deck chars the deck to `decayed` | 0 violations; on 200 seeds the mean fire size falls with the share of stone and tile; exact on the bridge fixture |
| T-V6-17 | hook | flood and collapse: only buildings whose depth at their datum (the water level less `baseCm`) reaches `collapseDepthCm` collapse, only of the listed wall materials; a deck building whose deck stands above the water level never collapses; a terrace building is judged at its platform, never at the unlevelled ground; `topple` strikes the chosen count, and a toppled support breaks both its spans; underground, on a flood fixture over a shallow sewer gallery and a deep catacomb: only elements whose ceiling lies within `surfaceClearCm` take `flood`, and only where V04 §2.3 admits it (else `W_VOID_UNDER_WATER`); the deep catacomb stays dry; the epoch's flood and the same flood drawn by hand reach the same elements | exact |
| T-V6-18 | hook + statistics | terrain and water: a cut-off leaves an oxbow that silts to marsh; reclamation fires only with a shortfall and a `modest` band; the rates over 1 000 seed-centuries lie within ± 30 % of the table's | exact; within tolerance |
| T-V6-19 | property + hook | Works scheduling: start offsets are uniform over the span (KS test); a chained Works starts after its predecessor finishes; a chained Works not started when the next epoch changes its target is removed, its change drawn finished and the new Works starting from the prior started Works' stage; the retirement rule keeps every Works that ran in the epoch's span in that epoch's model at any cadence (13, 52, 520 weeks); no Works leaves a plot without access (T67-2) | KS p > 0.01; exact |
| T-V6-20 | property | people: a person's key, age and succession are pure functions; the same week gives the same household members from any replay **and at any cadence** (the same 100-year history at 13, 52 and 520 weeks gives the same successors, keyed by death week); a pinned person is never succeeded | exact |
| T-V6-21 | property + visual | frames: `frame(w)` by the images path equals the replayed prefix's model digest (with the effective-week before-images) for random `w`; scrubbing forward and back draws byte-identical images (§13.4's week-scrub harness); then-and-now equals the lifecycle entries between the two weeks; at a 13-week and a 520-week cadence, a scrub to a week before the epoch of a ring-road conversion, a way downgrade, a waterfront wall and (on H-AQUA) the aqueduct's founding draws the before state, and a PNG and GeoJSON export at that week does too | exact |
| T-V6-22 | hook | `forkAt` gives the prefix's digest; `rerunFrom` with no change reproduces the original history's digests epoch for epoch; on H-DOSSIER, `rerunFrom` at a point before an institution was added (by a standalone dossier event between epochs), with one wall locked, reproduces every dossier-backed use; a re-apply of a hand edit resolves by carry-over matching or returns F-EDIT with alternatives; a dossier-bound fork receives no later dossier event; before a rebase point both bend to the earliest seq with the line "the copy starts at year N" | exact; 100 % of dossier-backed uses |
| T-V6-23 | hook | `advance`: the expansion's weeks, targets and events equal V06 §3.3.2's formulas; the shape table's mappings (V06 §2.3); a span above `maxEpochs` bends its cadence and says so; a clamp is reported; refused on a dossier-bound document with the what-if offer; `from: founding` on an existing document bends to "Start a new town small" (a new document, the present one byte-identical); on a standalone neighbourhood document the time card is absent and `advance` and a skeleton's `history` block bend to none with their line, while `forkAt` and the timeline work; Stop keeps the folded epochs and writes `stoppedAt`; the group undoes as one step by its checkpoint; the preview's end state equals the committed end state; **(h) degenerate requests** (V06 §3.3.2): a 0.1-week span, a cadence of 0 and of 2.5 weeks, points out of order with a repeated week and one before the document's week, `perYear` −1 and −2, a negative target and an empty `points` list each fold to the bend's stated expansion with its one line, and a non-finite number never reaches the fold; **(i) undo across a save** (V06 §4.1): after a 100-epoch group, a save and a reload, the group's undo gives the model digest of the log without it, a redo re-folds the same 100 epochs to the same digests; in a shared copy the undo is an `undo` event with the group kept undone and the same digest, refused with its dependants named when a later event depends on it | exact |
| T-V6-24 | performance | V06 §6's rows on the reference hardware, V06 §6.7's replay budget on H-HISTORY's starts included | each row within budget or re-declared (D-18); the replay's fallback coarsens the epochs only |
| T-V6-25 | statistics | cadence independence (item 76 (5)): the same 100-year trajectory at 13, 52 and 520-week cadence gives towns whose household count, built area, ruin share and walled share agree; the share of households housed by the overflow ladder agrees at every common epoch week; no tent belt at any cadence of H-100's +1 % a year while crowding capacity remains; the catacomb extent agrees | within ± 10 % on 100 seeds; overflow share within ± 2 percentage points; 0 tent belts; extent within ± 10 % |
| T-V6-26 | hook (wiring) | every registered strategy has a phase for every step it must run — `'grow-by-stage'` for its nine base steps, `'history'` for every step of V06 §3.2 — and every product override names a registered phase; every participant id of V06 §3.2's table is registered by its package **and every registered participant is in the table** (`village.density` and `village.pins` included) and declares its `replay` mode; every product's `records` names a registered `EpochPlacement`; every `ProductEpochRows` member a product declares is read by the decline or hinterland step; every `EpochInputs.events` entry kind the port writes has its reader (item 573); every `EvolutionTable` row is read by a phase (a source scan); every new record, field, op and edit kind has its registry row, its renderer row, its export mapping and its lifecycle row (§13.2's path-completeness test extended); every `ChronicleKind` has a template (`raisedWay`, `retainingSlump`, `deck`, the spring kinds and the replay kinds included); every `ReplayEffect` kind has its reader and every V11 event-to-epoch row names a kind; the spring row reads every `spring.*` row; every row of V06 §1b's dossier trace names a field the port's digest carries and a phase that reads it; the `raisedWays` step has its phase, `sky.clearance` its registration, `repairRaised`, `repairRetaining` and item 291's members their registry, renderer, export and lifecycle rows, `detail.suppress` a reader for each of its five kinds, the `landfall` candidate its report and chronicle rows | 0 missing |
| T-V6-27 | hook | dossier-bound: no spontaneous hazard (an `adjust` to `minor` or `full` refused); every mapped calamity strikes at its targets' centroid and its targets are struck in place, never relocated; an unmapped calamity is reported and changes nothing else; every engine change's cause is a rule or a dossier fact (the report's causes); no dossier-backed use closes or goes unplaced at any batch (§5.3's row) | 0 violations on H-DOSSIER |
| T-V6-28 | hook | the hinterland: surplus fields step down the fallow ladder farthest-first at their drawn spans; growth re-takes pasture and commons before S12a opens new fields; wildwood is never re-taken | exact |
| T-V6-29 | property | a 500-year soak of alternating growth and decline: every §5.3 invariant holds after every batch; plot counts stay within the ladder's bounds; the digest is stable across replays | 0 violations |
| T-V6-30 | hook | participants: each is called at its step in (order, id) order — `sky.clearance` at `afterGrowth` order 50, after `hood.fabric`; an erroring participant is isolated and reported; the island and underground laws' ops commit in their step (V05 §3.15, V04 §3.10) | exact |
| T-V6-31 | statistics | growth reads as historical: over H-100, while the extramural households number fewer than 2 × `growth.ribbonMaxHouseholds`, the share of extramural buildings within 100 m of a gate road stays in MFCG's ribbon band (§4.4's ribbon row: 71–85 %), falling only once suburb stages grow; walled towns add circuits only under threat | the share in [0.6, 0.9] at every such epoch on ≥ 90 % of seeds; 0 circuits below `walls.threatMin` |
| T-V6-32 | hook | the overflow ladder never leaves a household unhoused: a population jump of +40 % in one epoch on a frame with no free land houses everyone (tent belt) and reports it | 0 unhoused |
| T-V6-33 | hook | dwellings only after access (109 (j) (4); item 113 (e)): on H-VOID, zero dwellings in an `unexcavated` or `lost` cavern or ruin cluster after every batch; a cluster whose last open path any op closes (`under.fade`'s seal, a cellar filled, the building above demolished) is `lost` and vacated in that batch, its households re-housed at `siting` the same epoch; a growth that reaches it again (a new dig, a sewer's reopened run, an overlap) refinds it in that batch and admits dwellings from the same epoch | 0 violations; 0 households left in transit; exact |
| T-V6-34 | statistics | access grows with the settlement (109 (j) (3), (5)): across H-VOID's growth from a hamlet's population, the share of voids with an access rises monotonically with the number of buildings over them (V12's `trend` on `voidAccessible`); every access carries its cause with the epoch's seq; a lineage draws its dig once in its life across replays | monotone (V12's trend bar); 100 % causes; exactly one draw per (lineage, void kind) |
| T-V6-35 | hook | overlap access (109 (j) (3b)): a sewer extension crossing a sealed ruin chamber at a shared depth yields a breach link whose lifecycle seq is the epoch's, and makes that chamber and every void linked beyond it accessible; at different depths no link (bar the row's shaft chance); the sewer's course is unchanged by the ruin | exact on the fixture |
| T-V6-36 | statistics | depth keeps secrets (109 (j) (5)): at every METROPOLIS epoch of H-METRO, the sealed share of voids deeper than `DigRule.reachM` is at least `DigRule.sealedFloor` (V12's `floor` on `voidSealedDeep`) | ≥ the floor on ≥ 95 % of seeds |
| T-V6-37 | hook + statistics | caverns and ruins at any tier and a distinct ruin over time (109 (j) (1), (c)): caverns and ruins are present at every rung of a growth from 1 500 to 120 000 (and at volume 7's rungs when it is registered, H-VILLAGE); at every tenth epoch of H-100 on H-VOID, the ruin differs from the town as it then stands in block size, grid regularity and orientation by V12's distinctness bar; the ruin's plan changes only by decay, excavation and collapse; excavation by demand fires at most once per epoch and only within `excavate.reachM` | present at every rung; distinct at every sampled epoch; exact |
| T-V6-38 | property | the catacomb ratchet (109 (k) (4), (6)): V12's `exactMonotone` on each complex's `extentFloorM2` across every epoch of H-100, of 50 random trajectories and of H-METRO, and across Regenerate, a Re-derive from S1, New random on the catacomb system and an upgrade replay (V12's row for 109 (k) (6) registers this test) | 0 decreases |
| T-V6-39 | hook | catacomb growth per epoch never exceeds the span-keyed cap; on a stagnant fixture (a foundation blocking the frontier) the fill rises while the extent holds, and growth resumes by least disruption when the plot above is demolished; on a rank-held fixture (a secondary complex at 0.9 × the primary) the same with `blockedBy` `rank`; a closed cemetery freezes its complex (no growth, no fill change) and its reopening by a church-family use on the same plot resumes it | exact |
| T-V6-40 | hook | the catacomb count and sources over epochs, at every batch of H-100, of 50 random trajectories and of H-DOSSIER: (a) no complex is founded while the count is full, and at TOWN at most one is ever founded — more than one stands at TOWN only after a decline from CITY, each then reported `catacombsAboveCount`; (b) every complex's source is a cemetery (churchyard, burial ground, monastery burial face, extramural cemetery) or, founded at CITY or METROPOLIS, a quarry ossuary — zero under a church, a crypt or a precinct without burial ground; (c) the primary lies under the cemetery that serves the most burials (past the hysteresis) and is the largest complex, or else grew by its full cap in that epoch | 0 violations |
| T-V6-41 | hook | links re-bind (item 105 (a)): after a provider closes, every former consumer is bound to its nearest live provider at the end of the same epoch | 0 stale links against a fresh S10b binding |
| T-V6-42 | hook | the relaxation pass (105 (f)): on the loop fixture, the epoch's relaxation stays within `relaxPasses`, the second pass moves fewer members than the first, every move stays inside its district, byte-stable across replays | exact |
| T-V6-43 | hook + statistics | split sites over epochs (105 (h)): split pairs appear only past the class's compiled `profile.split.threshold` (V11 §2.3; the web's `splitThreshold` its default) and never in the parity presets; a merge-back (below the threshold minus `uses.splitHysteresis`) leaves the shop's plot vacant; an author's merge-back declaration holds at every epoch; closing the institution closes both; undo restores both; with V11 §3.7.4's `splitEnabled` set false by a table edit mid-history, every generated pair merges at the next `uses` phase (cause `merge`, within the `use` cap, the rest the epoch after) while a declared split stands, and no pair opens until the switch is on again | exact |
| T-V6-44 | goldens | the web's no-op pin: with V11 §3.7.4's web off form applied an epoch is byte-identical to the history without item 105 | byte-identical |
| T-V6-45 | hook | ladders over epochs (item 108): on H-DOSSIER's COUNT record, the members lie inside the range at every epoch, rise monotonically across the growth phase and fall across the decline without going below the range's minimum; no ladder pair is double-counted at any batch (no generator use of a covered class); a SIZE record is one building; a promotion and a demotion change the members by least disruption (member `#1`'s building kept where the greater's thing is the lesser's; V08 §3.5.1 (c)); on a `town-1` mutation whose `Hedge wizard` a receipt promotes to `Wizard's tower`, the house is converted in place and no second building stands; a REPLACEMENT whose greater V08 §3.5.1 (d) places new: on a hamlet fixture whose `Wayside shrine` record a `promotedFrom` receipt promotes to `Parish church` at the epoch that brings the village rung, one new church stands bound to the record's key, one churchyard `cross` is laid for the record with no binding row, the roadside shrine pin stands unbound, no `convert` runs on any building, and at every batch the church is counted once and neither pin as a church; on a village fixture whose `Fish market` arrives beside a standing `Fishmonger`, one hall on the market's rim binds the fish market, the fishmonger's key is its alias and its shop keeps its use, unbound | 0 violations |
| T-V6-46 | hook | water access (item 106): H-PORT declines to 40 %; after its contraction every quay is reachable through a gate or an open front | 100 % |
| T-V6-47 | hook | barrier closure on a new circuit: H-CLIFF's new circuit has zero wall edges on sheer arcs and its stretches end on tower anchors; the river loop is walled at its neck only; on H-AQUA an aqueduct crosses both a new circuit and a later contraction: each trace crosses it under a span, with one wall opening each; a viaduct crossed by a trace gets one raised gate; `wallToWay` of a crossed ring leaves the raised way standing with no junction to the ring road | 0 sheer-arc edges; 0 supports crossed; exactly one opening or raised gate per crossing; exact |
| T-V6-48 | hook | the waterfront over epochs: a rise in sea threat past a quay-wall row gives a quay wall with sea gates within one epoch; a later fall below every row for `walls.neglectAfterYears` neglects it (never demolishes); a walled port gains its harbour-mouth chain the first epoch its mouth is enclosed, anchored on a tower or fort already standing at a mole head; a reclamation that changes a closing shoreline re-evaluates the closure the next epoch; a deleted generated chain or quay wall stays absent for 100 epochs while its condition holds, and undo restores it | exact; 0 duplicate towers at a mole head; 0 re-additions |
| T-V6-49 | hook | the dossier gate (DR2): on H-DOSSIER no circuit or waterfront wall appears that the walls records do not admit, and the walls REPLACEMENT yields one ring the same epoch | 0 violations; exact |
| T-V6-50 | hook | rung crossings: a TOWN without sewers that grows past CITY has `Features.sewers` on and a laid network from that epoch on; a TOWN whose creation draw `u` lies below its law at a later population turns them on at that epoch at any cadence | 100 % of seeds; exact |
| T-V6-51 | hook | products (V07): with volume 7 registered, H-VILLAGE hands up when the target reaches 1 575 and down when it falls below 1 425 (V07 §2.1's fold, item 322) through the product overrides; a target alternating 1 480 / 1 520 never changes the product (a 1 440-person town runs the base product's phases on the TOWN row) and one alternating 1 400 / 1 600 changes it at every epoch, each a whole hand-off; a town handed down grows no underground element (every inherited system in V04's maintenance mode, a catacomb stagnant with `blockedBy` `'rung'`); at a village epoch the church's and the manor's strike weights carry V07's persistence rows and the hinterland steps by V07's slack, order and cap; with the town product alone it clamps at 1 500, reported; on H-DESERT: every retirement is a `retireWay`, a hollow way struck a second time is `effaceWay`d to `decayed` and never struck a third time, no way carrying an entry, approach or landing is ever retired and no retirement leaves a gate, a frame exit or an occupied plot without a path (at every batch), and in the rise every hollow way bounding a face that tier (5) cuts is reopened by `reopenWay` before the cut — at the village rungs and after the hand-up alike; at every batch of the rise, 0 occupied plots whose only access runs over an `abandoned` or `decayed` way — a toft reoccupied, a house platform rebuilt, a vacant plot built or a close infilled (tiers (0)–(4), V07's (6v)–(8v)), and a use opened or moved onto a house platform or a cleared trace (the use phase's openings, moves, relaxation and split shop) or a dossier-backed use relocated there, on a hollow way has that way, and any hollow way on its path to the ways in use, reopened in the same batch; at a village epoch a `cloister` opening — a roster member in the `uses` step; a record through the product's `records` placement in the `dossier` step — takes a plot joined with its vacant neighbours up to `claimArea.cloister` at its band, or V07 §3.12 (c)'s outside plot, never a smaller plot, a record placed in the epoch it arrives; a `cloister` record added at a village epoch whose district's `geometry` cap that epoch's earlier batches have spent still takes its joined plot in that epoch — its joins in the event's `EditBase.disruption`, the district's `geometry` count in the churn ledger unchanged by them, the event reported over budget where they pass the `dossier` row's budget and never refused — and the same record on an absorb without an epoch does the same; every participant runs at every epoch and gates itself: after H-VILLAGE hands up, `village.density` runs at the base-product epochs while the superseded `VillagePlan` stands (its `afterField` ops committed, the old core's density raster re-derived on its recorded inputs), and at a TOWN epoch `village.plan` and `village.pins` return no ops, the epoch's digest equal to that of a run with them unregistered | exact |
| T-V6-52 | property | households: across every epoch of H-100, H-VOID and a sky fixture, ground + underground + sky households equal the epoch's target at the epoch's end, and no household is in transit after any epoch; on H-VOID, an epoch that opens an access fills F6's new dwellings by relocation only (the total unchanged, ≤ `voidDwellings.share` of the district's poorest band), and a clearance epoch (the undercity shrinking, a pier founded over a lived chamber) re-houses every vacated underground household inside the participant, none in a tent while ground capacity exists | 100 %; 0 in transit |
| T-V6-53 | hook | the why answers persist: the four providers' answers (a moved use, an enceinte, a district's prosperity, a plan) are identical before and after a save, a load and a rebase | exact |
| T-V6-54 | hook | the base hooks scheduled: a burn of ≥ 60 connected buildings or a flood above the rows raises the ground at the row's chance (exact on forced draws); a passage whose rear plots stay vacant for their span is sealed, and regrowth reopens it before reoccupying its plots | exact |
| T-V6-55 | hook | crypts over epochs, at every batch of H-100, of 50 random trajectories and of H-DOSSIER (whose see moves and returns): wherever a cathedral use is live its building has a crypt, and that crypt is the largest ranked crypt (author-declared crypts excepted, each reported); a church mutated to the cathedral carries its crypt from the batch its occupy step applies; the former cathedral, still a church, keeps every vault, its capped bays as undercroft, and they regain the crypt role when the see returns; zero catacomb sources lie under a church | 0 violations |
| T-V6-56 | hook | the crypt join, on H-CHURCHYARD: the join's uniform is fixed per (church, complex) pair and gives the same answer whether the growth that reaches the crypt happens at an epoch or at a regeneration, across replays; a success yields one crypt access whose cause's event is the epoch's seq; a refusal never changes; the access follows its host's closures when the church decays | exact |
| T-V6-57 | hook | generated raised ways over epochs, at every batch of H-METRO (TOWN to METROPOLIS), H-100 and H-AQUA | 0 new generated raised ways at a TOWN or village-rung epoch; each generated way carries its reason key and its why rows (the reason's values and the gate); each is within its kind's cap and the rung's total at its founding epoch; the epoch that crosses into CITY may found one; 0 households left unhoused or put in a tent by a raised way's clearing, and none in transit after the epoch; each way founded at an epoch has the stations and pier rings item 244's support step lays on its course (the same stations when its course is re-solved unchanged), no pier above `maxPierM` for its kind, its deck at least the clearance above every crossed part-0 way, and a candidate whose course the step drops reported in `raised.waited` with its `u` unchanged (V06 §3.19 (5)) |
| T-V6-58 | hook | a removal holds: on a METROPOLIS fixture, delete a generated viaduct, an elevated road and an aqueduct; then 100 epochs of growth, a Regenerate (keep), a New random on each crossed district, a save and a reload, a decline below CITY and a regrowth to METROPOLIS | 0 of the three re-appear; no replacement is founded while the kind's cap is held by the suppression; undo of each delete restores it at its address; `rerunFrom` with the re-apply keeps each removed; a user's re-add serving the key is counted once; **the other kinds' re-adds**: on H-PORT a generated quay wall and a harbour-mouth chain, on H-TERRACE a generated retaining wall, on H-DECK a generated deck plot, each deleted and then re-added by committing V09 §4.20.3 (4)'s Build it again events (the events volume 10's Put it back takes) — each key served by its re-add: 0 generated duplicates through 50 epochs, a Regenerate (keep) and a reload, counted once and never in `suppressedHeld`, and deleting the re-add puts the original removal back in force; **the history's kept-removed line**: on the same METROPOLIS fixture, an epoch whose viaduct reason passes its gate at the removed viaduct's key reports one `raised.suppressedFired` entry carrying the delete's `seq` and week (the elevated road's and the aqueduct's likewise, the entries in removal order); an epoch whose gate fails reports none — the decline's CITY epochs, the fixture's seed searched so that the viaduct key's `u` lies at or above the CITY chance, and every TOWN epoch, where (C) does not run; none after the delete's undo and none while a serving re-add stands; the list identical after a Regenerate (keep) and a reload (rebuilt by replay) |
| T-V6-59 | property | keys and cadence: the same century to the same METROPOLIS target at 13-, 52- and 520-week cadence; a Regenerate after a history | the same set of raised-way reason keys in ≥ 95 % of 100 seeds, the rest only where `p` crossed `u` between sampled weeks; each reason still live after the history regenerates at the same address; each reason key draws exactly once in its life across replays |
| T-V6-60 | hook | caps across a rise and a fall; declared ways; the hand-down | the count admits no founding over a cap; a METROPOLIS fallen to CITY holding four ways keeps them, reports `aboveCap` once and founds none until below; a declared way uses up its kind's slot; ways carried down to a village (with volume 7 registered) survive with their reasons and states; a released way re-opens its key with the same `u` |
| T-V6-61 | hook + statistics | decline and repair of raised ways, on H-AQUA and a METROPOLIS decline fixture | disused only as V06 §3.19.2 (2) states; spans fall while supports stand (at every batch, 0 supports cleared while a span beside them stands); the vaults collapse with their span in the same batch; a viaduct carrying a primary is never disused; a raised way with a ruined span whose reason is live is repaired before any new founding and never in the batch that struck it; the H-AQUA aqueduct runs dry in the epoch its spring silts |
| T-V6-62 | hook | retaining walls, at every batch of a century on H-TERRACE | walls only on levelled ground steeper than `terrace.slopeMin` with steps above `terrace.stepMinCm` (V11); 0 walls deleted by `amalgamate`, `plotToGarden` or a re-cut; every way crossing one is a stair or a ramp, kept through `downgradeWay` and `upgradeWay`; slumps only below terraces abandoned for `retaining.neglectAfterYears`; after a levelling the neighbours' stored plans re-cut inside the epoch event and their unstored plans stale (V03's outside-ground row); a drawn wall never slumps; a decayed stretch is restored intact by a re-levelling of a plot on its high side and by the landfall clearance, a ruined one replaced by a new stretch; a removed generated wall is never made, re-derived or restored again until the delete's undo, a retaining wall the user draws on its chain serving the key meanwhile (V06 §3.19.3 (7)); a `raiseGrade` tombstones every wall in its region; (J-RF2.4; item 245) across each re-derivation of a generated wall on H-TERRACE — after an edit that re-levels a unit and at every epoch op that levels — every decayed run's state knots lie within `retaining.settings.stateSnapCm` of their old place, and no knot whose vertex survives is dropped (`bar.T-V6-62`) |
| T-V6-63 | hook | decks, at every batch of a century on H-DECK | deck plots within the deck's width and budget; 0 `densify` and 0 `back_court` on a deck plot; only uses V11 §3.24.4's per-use `deckOk` admits on deck plots, and a relocated use carrying a dossier crypt record never lands on a deck plot; a deck struck by flood, fire or disuse leaves 0 standing buildings on it and 0 households unhoused; the oxbow's bridge is struck only after the oxbow has silted to marsh; a repaired deck re-offers its plots, and their buildings are new lineages; a removed generated deck plot's slot is never re-offered until the delete's undo, the user's declared plot at the slot serving it meanwhile (V06 §3.19.3 (7)); a deck's condition equals its host's existence at every batch, `Bridge.state` unchanged |
| T-V6-64 | hook | participants and scope | the arch vaults follow their spans at every batch (a chamber under every standing `vault` span, none under a fallen one); `sky.clearance`'s 100 % clause holds after every epoch of a century with islands (V05 §3.15 (7)); an opened close-up crossed by a new raised way has 0 junctions with it and no plot in its strip; `scope.raised` and `scope.levelled` equal the lifecycle entries of the epoch |
| T-V6-65 | goldens | the no-op pins on V12 §3.7.8's engine: `item110.raised`, `.terrace`, `.deck` and `.stepped` (V12 §2.13), each overlay reading V11 §3.24.0's switch table for its family's off form ("off": every `deck.offer` 0, `terrace.enabled` false), over H-100, H-AQUA, H-TERRACE and H-DECK | each family's century history byte-identical to its own off-state set (V12 §3.7.8; "the history without item 110" read per family, `roster.specialisations` included); T-V6-44's pattern; switching the rows on is one declared shift naming every golden it moves (V12's rule), and at TOWN and below no way-network digest moves with only the raised-way rows on |
| T-V6-66 | hook | the landfall clearance, on a sky fixture whose island falls on built ground at year 30 with salvage demand around it, covering a field, an arch of a generated aqueduct (a span and a pier), a street grating and a catacomb stair: every struck way member regains its `formerClass` with a re-laid surface, a struck wall member is restored, a struck plot member builds at tier (3); the field's `quarry` face leaves the decoration in the batch that turns it `commons`, and only after the ledger's credit from it is spent and `land.scrubAfterYears`; the span and pier leave it in the batch of the `repairRaised` or `dismantle` that ends their cover; the decoration is tombstoned in the batch that removes its last member, whichever op, and 0 decorations stand at any batch with an empty member list; with no salvage demand nothing is cleared; the grating and the stair return `open` (a secret access `locked`) in the batch their host leaves, and a lived void whose only access was the stair is `accessible` in the same epoch | exact |
| T-V6-67 | hook | foundations at an epoch: a raised way founded at an epoch over a lived cavern chamber, a basement grown over a ruin gallery and a terrace levelled over a cavern each collapse exactly the elements V04's rule collapses at a regeneration of the same state (the same element set), the dwellings on collapsed floors vacated and re-housed in the participant | exact; epoch = regeneration |
| T-V6-68 | hook | a village mine breach: on H-VILLAGE with a forced cavern within `breachM` of a mining use opened at an epoch, the working breaks in when its depth reaches the cavern — one `AccessPoint` at the working, cause `mineBreach` with the epoch's seq, no link record — and never when it does not | exact |
| T-V6-69 | hook | calamity deaths (item 573): on H-DOSSIER, a calamity's `deaths` raise the catacomb need of the epoch at its week by each cemetery's `burialShare` of them, never the cap; an event with no `deaths` reads 0 | exact |
| T-V6-70 | hook | the history replay at generation (item 113; V06 §3.20) on H-HISTORY: (a) the city-to-village history shows the enceinte, its street lines kept as hollow ways and field boundaries beyond the present fabric and an oversized church, while the dossier's present facts match exactly (the population, every institution record's present state) — the base's T113-1; (b) one digest per seed and history on the five engines — T113-2; (c) the refounded fixture reuses old roads (reopened hollow ways), gate gaps, bridges and foundations wherever the route cost admits them — T113-3; (d) the symbolic-peak fixture is sized at `history.symbolicQuantile` of its tier, marked `symbolic` in `HistoryRecord.peak` and on every fact it sizes, and a history with no evidence of a higher tier has no peak — T113-6; (e) with `history.replay` off, byte-identical to generation without it — T113-7; (f) ruins buried only once their abandonment age reaches `history.burialYears` × the factors, their buried streets and walls on the former geometry at the old ground level; (g) every event maps to the epoch whose span holds it at its own week, an unmapped type reported with no effect, an event older than the window not replayed; (h) the `'last'` participants run once, the `'every'` ones at every coarse epoch, no history-store image is written for a coarse epoch, and every Works finished before the creation week is retired; (i) above `replay.maxEpochs` the epoch length bends and every event still maps; (j) `HistoryRecord` survives a save and a load, a GeoJSON export carries `plat:history`, and a load replays the prefix to the same digest; (k) a scrub inside the past range draws the replayed frame, and `forkAt` there bends to the creation's last event | exact; one digest |
| T-V6-71 | hook + statistics | failing springs (item 111 (b); V06 §3.12.1) on H-OASIS: the drought and over-draw lower `flow` by the rows, writing only past the hysteresis or a threshold; below `spring.failFlow` the gardens beyond `⌈flow × n⌉` wither after their drawn spans and the grove thins; at `spring.regrowFlow` they grow back; a spring at the floor dries after its span to a `commons` hollow; the dossier variant: no failure below `failFlow` while the deposit is live, the floor at the depleted event's week, `failFlow` restored when it is available again; a hand `flow` is held; a spring on a sky island is never visited; with no spring an epoch is byte-identical to one without the row (item 111's no-op pin); on 200 seeds, the households within a failed spring's pull radius fall faster than the town's (`bar.T-V6-71`) | exact; the measured shift ≥ the bench's declared delta |
| T-V6-72 | statistics | the replayed past reads as history (item 113 (g)): over H-HISTORY's city-to-village seeds, the enceinte's enclosed area exceeds the occupied fabric's, the hollow-way length exceeds the live lanes' share of a one-click village, and the largest church exceeds the present population's class row (`bar.T-V6-72`) | each on ≥ 90 % of 200 seeds |
| T-V6-73 | hook | the edges of V06 §3.21, each clause on its fixture: (a) the interfaces' registry edges; (b) hazard and calamity rows; (c) `MutationPlan` edges; (d) the mask's absent, mismatched and degenerate cases; (e) the `EvolveOp` no-ops; (f) a lost or old report block; (g) the suppression edges; (h) decline's empty, single and out-of-grid cases; (i) growth's empty, zero-area and capped cases; (j) fortification's degenerate traces and village rungs; (k) hazards with no target; (l) terrain and water edges, the spring row's included; (m) Works with zero duration or no row; (n) a refusal replayed; (o) degenerate raised-way readings; (p) hand forms at every rung; (q) degenerate rendering and export | exact |
| T-V6-74 | hook | the combinations of V06 §3.21 at every rung their features exist: (a) a settlement growing over a sealed and over a lost void; (b) terrain features across frames and the replay; (c) Works on steep, cliff, moat, square, oasis, frame-edge and access-hosting ground; (d) deck plots, terraced wards, composed and stepped buildings, crypts and stored plans across frames; (e) frames and Works stages under the light ladder; (f) locks across the history | exact |

**Parity (B-REF).** Neither reference has time, so the parity bars are the static ones: with no epoch every golden is
unchanged (§13.3; T-V6-1 and the base's T67-5), and the parity presets create no Works and no hazards. The **growth
parity** metric reads the reference that owns each subject's form: a town grown by epochs to population `P` is compared
with the one-click town at `P` (item 9: size set by population) — building count, built area and the share of plots per
band within ± 15 % — its **walled share** reported at every tenth epoch of H-100 under threat 0.5 with the bar [0.5,
0.95] (a history drives it below the one-click town's MFCG-anchored 0.88 until circuits fire; the deviation is declared,
§4.4 *Stages and the walled share*), and its suburb stages with FTG's configured suburb stage
(`research/findings/ftg-docs-params.md` §1.3 *District-stage parameters*, §1.4 *Suburb-stage parameters*) by regime share.
FTG's standing abandoned stock in its poorest pools (the same file, §3.3 *Dependency graph*) is kept over epochs by
`decline.turnoverVacancy` (T-V6-7). The growth parity adds **raised-way presence per kind**: a history grown to `P` and the
one-click city at `P` agree within ± 15 % prevalence over 200 seeds, the history's excess — ways kept after their reason
lapsed (V06 §3.19.1 (1)) — a declared deviation; neither reference has raised ways (V12's reading: 0 of 48 research files
mention them), so no reference parity row exists. Every threshold without a reference source is §13.7's kind, recorded
with its provenance.

## 8 Build plan

The engine lands **right after M4** (J122; V06 §11 Q1): the one incremental path, the Works and clock hooks and the hand
forms of every conversion are the base's by then (§16), with M3a's editing, API and authoring toolkit. After M4 four
streams run side by side — M5 (V01), the village V-M1 – V-M4 (V07), **M6-E** and the plan rung's P0, P1 and P3 (V03) — as
§16's staged-milestones table and INDEX §4 state; the participants join as their volumes land (V05's P6, V04's time step,
V01's fabric hooks with M5 — before M5 the new faces take the base's bent-cut fabric and `hood.fabric` is absent). In
§16's table it is one row, **M6-E — the evolution engine**, priced below (29–41.5 person-weeks); §16's totals are
computed there once (item 568).

| milestone | contents | tests | person-weeks |
|---|---|---|---|
| E0 — spikes | the epoch's cost at TOWN, CITY and METROPOLIS on the scripted history (the use phase's labelled Dijkstras, gated re-scores, openings and link re-binding; the ladder; the mask on every arena); the history image size per epoch at CITY and METROPOLIS; the mask's full and incremental cost | T-V6-24 (first cut) | 1–1.5 |
| E1 — the runner | `@plat/evolve` and the phase interface (item 317), the base phases built once in `@plat/edit` and shared by both strategies, the no-phase rule, the product overrides (`ProductDecl.phases`, item 317) re-using `ProductEpochContext`, `EpochPhase`, `EpochParticipant`, `EpochPlacement` and `ProductDeclEpoch` as item 202 states them, the participants' `replay` modes, the runner inside the epoch fold, the stage ids (item 342), participant registration and the adapters' shells, the household ledger (item 335), the effective parameters, protection filters, the report and chronicle skeleton (item 339), `'grow-by-stage'` through phases with the dossier-bound catch-up; the product fold at each epoch (item 322) and `ProductDeclEpoch.rows`; `EpochInputs.events` as item 573 types it | T-V6-1 – T-V6-4, T-V6-26, T-V6-30, T-V6-52 | 2.25–2.75 |
| E2 — decline and regrowth | departures, the strike candidates (garden reuse, passages), the siting tiers with crowding, the way upgrade and the turnover vacancy, the growth decision (crowding hook, backlog quantum, rich ribbon, overflow order, decrowding; item 336, item 293, item 479), the overflow ladder, the hinterland ladder, `downgradeWay` / `upgradeWay` / `retypeLand`; retaining walls and decks in decline and regrowth (the `retaining` and `deck` candidates, the plot operations that keep walls, tier (5)'s deck faces, the deck budget's binding, `repairRaised`'s deck form, a deck's condition as its host's existence); the product rows in the pool and the hinterland; `repairRetaining` and the restoration rule; the `landfall` candidate and its clearance — every member leaving by the op that ends its cover and the accesses bricked under it reopened with their host; the retaining-wall and deck-plot suppressions; the hollow-way ladder's issuer — the stricter retirement test, the effacement and tier (5′)'s reopening | T-V6-5 – T-V6-8, T-V6-28, T-V6-31, T-V6-32, T-V6-54 (passages), T-V6-62, T-V6-63, T-V6-66 | 4–5.75 |
| E3 — fortification and raised ways | the circuit decision and absorption on approachable arcs, the pathway (gates, stretches, the end), `absorbWall` with `plot_line` rows, contraction with water access, repair, the waterfront at each epoch, the harbour-mouth chain with its anchor reuse, shoreline re-evaluation, the dossier gate (item 254, item 209); the `raisedWays` step — the ledger, the reason keys, the three readings, the gate, order and caps, the course and the clearing, the suppression (item 260, item 290), disuse, the `raised` candidates and `repairRaised` (item 291); raised ways on every wall trace | T-V6-9 – T-V6-11, T-V6-46 – T-V6-49, T-V6-57 – T-V6-61 | 4–6 |
| E4 — uses, the web, ladders and mutations | counts with record ownership, labelled strain, closings, gated moves, openings in 105 (f)'s order, the why rows on the lifecycle (item 265), the clientele defaults, custom chains over epochs, link re-binding, relaxation, splits and merges, `activeChains`, the ladder steps, consecrated ground, `MutationPlan` with occupy-when-compatible and the inverse (item 429, item 264, item 266) | T-V6-13 – T-V6-15, T-V6-41 – T-V6-45, T-V6-53 | 4–5.5 |
| E5 — time, hazards, water, people | the shade mask on every arena (item 275) with the stacked caster top, the field phase's way-surface re-lay (V06 §3.4 (9)), the hazards with the deck and terrace rules (fire over a deck, the flood at the datum, supports toppled and scoured, decks broken and charred), the calamity table (item 388), `raiseGrade` with its buried walls, the terrain candidates and the oxbow (item 206), the spring row and its `drought` row (item 111 (b); V06 §3.12.1), Works scheduling and the retirement rule (item 321), the derived succession by death week (item 443), the wealth level and `advance` provenance (item 343) | T-V6-12, T-V6-16 – T-V6-20, T-V6-25, T-V6-27, T-V6-54 (raise), T-V6-71 | 3.25–4.5 |
| E6 — history and the app | the history index, store and frames with the effective week; rebase and upgrade; the timeline bar, history panel and past-view forward path; then-and-now (item 409); `advance` on T1 with the end-state preview, the clerk and the CLI; `forkAt` and `rerunFrom` with dossier events and re-apply (item 458); the bends of J-V6.98 and the standalone-neighbourhood bend; the four `WhyProvider`s; the exports (item 447's raised-way properties) | T-V6-21 – T-V6-23, T-V6-53 | 3–4.25 |
| E7 — calibration and bars | the statistics bench on 200 seeds confirms each `tables/evolution.json` entry by its bar (`bar.T-V6-<n>`, V12's bar family) or the V6-E7 panel (V12 §3.9.1's `PanelSpec`, AB `history` on H-100, which this volume confirms); a failing bar opens V12 §3.7.1 (b)'s `fallback` run (a `CalibrationRun` of kind `fallback`) applying the entry's stated fallback (the table below) — no reference tuning, since no reference evolves a town; the performance tiers; the edge and combination suites | T-V6-5 – T-V6-10, T-V6-12, T-V6-13, T-V6-16, T-V6-18, T-V6-24, T-V6-25, T-V6-28, T-V6-29, T-V6-31, T-V6-32, T-V6-36, T-V6-43, T-V6-54, T-V6-62, T-V6-73, T-V6-74 | 2–2.75 |
| E8 — the underground over epochs | the feature re-resolution and first-epoch U-NET (item 550); the `under.*` adapters over V04's functions with the epoch scope (`raised` and `levelled` included: the arch-vault reconcile, the invert drops); the `sky.clearance` registration and `hood.fabric`'s crossed close-ups; the access pass's epoch rules, excavation by demand, dwellings only after access and vacated on sealing; ruins over epochs; catacombs over epochs (count, source draw, age, span cap, primary, invariant, stagnation, freezing); crypts over epochs (the seat's crypt in its batch, the rank inside the causing event, the no-vault-lost trim, the see-move filter, the crypt join's epoch evaluation); the foundations act (`Foundations.apply`), F6's dwellings by relocation and the in-participant re-homing, the village maintenance mode, the village mine breaches, the calamity deaths in the need, the flood's underground reach | T-V6-33 – T-V6-40, T-V6-50, T-V6-51, T-V6-55, T-V6-56, T-V6-64, T-V6-67 – T-V6-69 | 2.75–4.25 |
| E9 — the history replay at generation (item 113) | the replay plan (start, undated peak, coarse epochs and their bend, signed weeks, targets, the dossier's records at the start and the end), the event-to-epoch mapping over V11's rows, the replay epochs (participant modes, no history-store images, the Works retired at the creation, the `0x8000 + r` keys), destruction, refounding and burial, `HistoryRecord`, the timeline's past range with its frames and bends; the burial clause after M6-U's buried system (as E8 after U5) | T-V6-70, T-V6-72, T-V6-24 (V06 §6.7) | 2.75–4.25 |
| **total** | | | **29–41.5** |

**Exits and the calibration register** (V12 §3.11, its lint T-V12-20, PR tier from M1). Each of
E1–E9 exits only with `plat calibrate register --check` green over the rows it lands — one `target.column` entry per
calibratable column family of `tables/evolution.json` (registry row 60; V06 §2.2, V06 §2.4, V06 §3.9.9), written by the seat that
lands the milestone, owner `V06` unless the line says otherwise, in V12 §3.11's form (the table below); the columns and
the row set V06 §2.2 marks `calibratable: false` take no entry (`advance.maxEpochs` and `chronicle.*` land at E1, `growth.crowdBands`
and `streets.classes` at E2, `uses.openCandidates`, `uses.moveWhyRows` and `uses.closeSurplusBy` at E4, `calamities` and
`works.partStartAt` at E5, `history.checkpointStride` at E6, `replay.maxEpochs` at E9). **E2** also writes the entry of **the base decline table's
persistence cells `raised` and `retaining` that item 291 adds** (owner `base`, V12 §3.11's `decline` line: the seat that
lands a base change request writes its cells' entries). **E7** moves the statuses the bench's bars, the
V6-E7 panel and any `fallback` run decide (V12 §3.7.1 (b), V12 §3.9), each entry's history row appended. The cells this volume
reads from V11 (V11 §3.18's structures block, V11 §3.23.8, V11 §3.24, the item-111 climate rows and the item-113 history cells and
event rows) are registered by V11's seats, never here. No milestone
adds a row without its entry. Each line's entry is written, and each bar it names registered, by the seat landing its exit step (`--milestone V6-E<n>`, V12 §2.8's form). Its `due` is `V6-E7` for a line whose exit is E1 – E6 — E7's exit runs the statistics bench (200 seeds) over every bar those lines name and sits the V6-E7 panel — and `V6-E8` and `V6-E9` for E8's and E9's lines, whose bars run at their own exits (each may land after E7) (J-V6.126); a fallback is one pre-decided move of the named cell, then a re-run of the bar; a second miss makes the entry
`not-achieved`, reported to the owner as a table defect (V12 §5.5) — never a moved threshold. A metric `bar.T-V6-<n>` is
V12's bar family (the verdict statistic of that registered bar).

**The bars' registrations** (J-V6.117). Each bar a line below names as `bar.T-V6-<n>` is registered by
the seat landing that line's exit, **in the same change**, as a V12 `BenchBarDef` (V12 §2.1, `@plat/testkit/bars`) —
`id` the bar id (`'T-V6-8'`), `owner` `'V06'`, `statistic` the bar's own quantity in the owner's words with its unit (a
vector in the row's clause order for a bar of several clauses), `towns` its fixture family with its settings,
`stages` the V06 stage ids (V06 §3.16) of the phases it reads, `tier` `'milestone'`, and `run` the check V06 §7's row
states, returning its verdict — unless a `StatBarSpec` or `NullModelSpec` of V12's bar map already carries it as `id` or
`ownerBar`, in which case it registers nothing (T-V6-34 and T-V6-37 register **their epoch forms** beside V04's bar-map
rows, as V12 §2.1 names). `perSetting` is the statistics bench's 200 seeds (V06 §7's CI paragraph) unless the row says
otherwise; each setting is the fixture's own water with `preset` `'default'` — the recipe with no V11 `PresetId`
applied, since the parity presets switch the web and item 110 off (V11 §3.7.4). A seat whose line names a bar it has
not registered fails V12's lint (T-V12-20) and does not exit.

| metric | statistic (unit) | towns — family (rungs) | stages | exit |
|---|---|---|---|---|
| `bar.T-V6-6` | the five layers' struck shares per decade, as the four adjacent pairs' order margins (share) | `golden` under the row's scripted 60-year decline, −1.5 % a year (TOWN, CITY) | `EVO_DECLINE`, `EVO_FORT` | E2 |
| `bar.T-V6-7` | the pre-decline plots reoccupied before the first new stage; regrowth-first violations; the poorest band's vacant share (share, count, share) | `H-100` (TOWN, CITY) | `EVO_SITING`, `EVO_GROWTH` | E2 |
| `bar.T-V6-8` | the stages at which crowding precedes; rich-band crowding (share, count) | `H-100` (TOWN, CITY, METROPOLIS) | `EVO_SITING`, `EVO_GROWTH` | E2 |
| `bar.T-V6-28` | fallow-ladder and re-take violations (count) | `H-100`'s decline and rise (TOWN) | `EVO_DECLINE`, `EVO_GROWTH` | E2 |
| `bar.T-V6-31` | the extramural ribbon share at every qualifying epoch; circuits below `walls.threatMin` (share, count) | `H-100` (TOWN, CITY) | `EVO_GROWTH` | E2 |
| `bar.T-V6-32` | households unhoused after the row's +40 % jump on a frame with no free land (count) | `golden` under the row's script (TOWN, CITY) | `EVO_SITING`, `EVO_GROWTH` | E2 |
| `bar.T-V6-62` | knots moved beyond `retaining.settings.stateSnapCm`; knots dropped whose vertex survives (count, count) | `H-TERRACE` (TOWN, CITY) | `S10`, `S11` (the knot carry runs under their ids, V11 §3.24.1) | E2 |
| `bar.T-V6-9` | footprints crossed; the `road` share of re-drawn fates; sheer-arc wall edges (count, share, count) | `H-100` under the row's threat script (0.6, then 0.4 for 40 years) and `H-CLIFF` (TOWN, CITY) | `EVO_GROWTH`, `EVO_FORT` | E3 |
| `bar.T-V6-10` | occupied footprints crossed; live quays reachable; sheer-arc wall edges (count, share, count) | `H-PORT`, `H-CLIFF` (TOWN, CITY) | `EVO_FORT` | E3 |
| `bar.T-V6-13` | the row's shifts against their baselines — nearest daily-local distance, the tannery's downstream share, `servedShare`, spacing — the comfort share and the `use`-cap violations (ratio vector, share, count) | `H-100` with the web's weights on (TOWN, CITY) | `EVO_USES` | E4 |
| `bar.T-V6-43` | split, merge and switch-off violations (count) | `H-100` with split rows (TOWN, CITY) | `EVO_USES` | E4 |
| `bar.T-V6-16` | spread violations; the fire-size trend against the stone-and-tile share (count, ratio) | `golden` with `hazards: 'full'` and `H-DECK` (TOWN, CITY) | `EVO_HAZARD`, `EVO_LADDER`, `EVO_SITING` | E5 |
| `bar.T-V6-18` | each terrain and water rate over the table's (ratio vector) | `H-RIVER`, 1 000 seed-centuries (the row's count; TOWN) | `EVO_TERRAIN` | E5 |
| `bar.T-V6-54` | violations on forced draws (count) | `golden` with the row's forced draws (TOWN) | `EVO_HAZARD`, `EVO_DECLINE`, `EVO_SITING` | E5 |
| `bar.T-V6-71` | the households' fall within a failed spring's pull radius over the town's (ratio) | `H-OASIS` (TOWN, CITY) | `EVO_TERRAIN`, `EVO_DEPARTURES` | E5 |
| `bar.T-V6-34` (epoch form) | the access trend over the buildings above each void (V12's `trend` on `voidAccessible`); causes recorded; one draw per (lineage, void kind) (none, share, count) | `H-VOID` from a hamlet's population to CITY | `EVO_UNDER` | E8 |
| `bar.T-V6-37` (epoch form) | caverns and ruins present at every rung; the ruin distinct at every tenth epoch (share, share) | `H-VOID` and `H-100` (every rung reached) | `EVO_UNDER` | E8 |
| `bar.T-V6-40` | violations of clauses (a)–(c) (count vector) | `H-100`, 50 random trajectories, `H-DOSSIER` (TOWN to METROPOLIS) | `EVO_UNDER` | E8 |
| `bar.T-V6-72` | the enclosed-to-occupied area, the hollow-way share and the largest church's excess (ratio vector) | `H-HISTORY`'s city-to-village seeds (CITY falling to VILLAGE) | every `EVO_*` stage under the replay | E9 |

| rows (column family) | exit | method | metric | fallback — the pre-decided move |
|---|---|---|---|---|
| `growth.quantumShare`, `.quantumHouseholds`, `.crowdFactor`, `.crowdShareMax` | E2 | `measure` | `bar.T-V6-8`, `bar.T-V6-7` | crowding precedes < 80 % of stages: `growth.crowdShareMax` 0.12 → 0.16; rich-band crowding or regrowth-first failing: `growth.quantumShare` 0.03 → 0.05 |
| `growth.ribbonMaxHouseholds` | E2 | `measure` | `bar.T-V6-31`, `ribbon.share` | the ribbon share outside [0.6, 0.9]: ± 50 households toward the missed side |
| `plots.mergeAfterYears`, `.amalgamateWeight`, `plots.gardenKinds`' areas, `streets.abandonAfterYears`, `decline.turnoverVacancy` | E2 | `measure` | `bar.T-V6-6`, `bar.T-V6-7`, `vacancy.share` | T-V6-6's plot-boundary–street pair out of order: `streets.abandonAfterYears` ± 10 years toward the order; the poorest band's vacant share missed: its `decline.turnoverVacancy` cell 0.05 → 0.03 |
| `land.*`, `overflow.tentBeltM` | E2 | `panel` (V6-E7, AB `history` on H-100, `realism`) | `bar.T-V6-28`, `bar.T-V6-32` (conformance, read beside the panel) | the panel rule (V12 §3.11); second value: every `land.*` band × 0.5 |
| the base decline table's persistence cells `raised`, `retaining` (owner `base`, item 291) | E2 | V12 §3.11's base `decline` line (its method, metric and due `V6-E7`, stated there once) | as that line | second value: each rate × 0.5 |
| `retaining.settings.stateSnapCm` (V11 row 79; item 245; owner `base`) | E2 | `measure` | `bar.T-V6-62` | J-RF2.4's: the tolerance becomes the wall's own `stepProfile` sample spacing and the bar re-runs; a second miss `not-achieved` — the E2 seat registering the bar and restating in place the default entry the M3a seat wrote (V12 §3.11's *A later line*; after M-CAL's record only under a new major version of `retaining`, V12 §4.2), due `V6-E7` |
| `walls.*` (with `growth.ringBlockM`), `contract.*` | E3 | `measure` | `bar.T-V6-9`, `bar.T-V6-10`, `walled.share` (the growth parity's [0.5, 0.95], V06 §7) | the walled share below 0.5: `walls.chancePerYear` 0.04 → 0.06; above 0.95: `walls.threatMin` 0.35 → 0.45; T-V6-9's fate share missed: `walls.fateWeights` moved 0.05 toward the owner's `road` |
| `uses.byClientele` (V06 §3.9.9), `uses.splitHysteresis`, `mutation.stepYears` | E4 | `measure` | `bar.T-V6-13`, `bar.T-V6-43`, `link.*` | a failing T-V6-13 clause: the failing class's clientele row is dropped once (the class reads its V11 profile alone); split flapping: `uses.splitHysteresis` 0.10 → 0.15 |
| `shade.rasterM`, `shade.ruinShare` | E5 | `measure` | `shade.gap` (V06's drift fixture, item 102 (g); T-V6-12) | `shade.ruinShare` 0.5 → 0.3; the drift's own miss is V12's item-102 line (V11 §3.3.5's `w_sun` move), never a shade cell |
| V06 §2.4's hazard rows, `fire.*`, `raise.*` | E5 | `measure` | `bar.T-V6-16`, `bar.T-V6-54` | the fire-size trend missed: `fire.rebuildShift` 1 → 2 |
| `oxbow.*`, `silt.*`, `reclaim.*`, `canal.maxM` | E5 | `panel` (V6-E7, `realism`) | `bar.T-V6-18` (the rates reproduced, read beside the panel) | the panel rule; second value: every span band × 1.5 |
| `spring.*` (V06 §2.2) | E5 | `measure` | `bar.T-V6-71`, `spring.flow` | the decline shift missed: `spring.droughtLoss` 0.08 → 0.12; flapping gardens: `spring.regrowFlow` 0.5 → 0.6 |
| `excavate.*` | E8 | `measure` | `bar.T-V6-34`, `bar.T-V6-37`, `void.*` | the access trend non-monotone with excavation above half its rises: `excavate.chancePerYear` 0.05 → 0.025 |
| `catacomb.primaryHysteresis` | E8 | `measure` | `bar.T-V6-40`, `catacomb.rank` | clause (c) missed: 0.10 → 0.05 |

**Order and dependencies.** E1 first; E2, E3, E5 and E6 after it in any order; E9 after E1–E6 (its burial clause after M6-U's buried system); E4 after E1 and after item 105's S10b
changes land in the base (§4.7) with V11's `siting.web`, goods and `dossier.ladders` rows (until those rows
land, E4 runs on the clientele defaults and declares the shift when they arrive); **E8 after E1 and after V04's U5** (its
time step, `CatacombGrowth` and `AccessPass`) with V02's crypt basement (item 226) — it may slip without blocking E1–E7;
E7 last. Every exit's register lines name V12's `bar.*` metric family (V12 §2.1, J-V12.65; the split `decline` line, J-V12.66), and V06 owes the registrations above, each by the seat landing its line's exit. **E3's raised-way pass needs the base's raised-way course solver and hand operator, callable at an epoch (item
110 at M3a, item 290, before M4), and V11's `raisedWays` rows** (V11 §3.24.2; this volume keeps no copy): a build whose
tables package lacks them runs no founding step (C) and reports it (V06 §3.17 (9)). E2's deck
and retaining parts need the base's deck faces, deck plots and `RetainingWall` (item 110 at M3a) and V11's `deck`,
`deckOk` and `terrace` rows (V02 §3.16's fallbacks until then). T-V6-65's no-op pin runs from E1 on.

**Risks and their spikes.** (1) *The epoch's cost at METROPOLIS* (the use phase, the link re-binding) — E0 measures;
fallback: the per-class batched re-binding, then the re-score rotation of V06 §6.1, for the owner's veto. (2) *History
memory* — E0 measures the images at CITY and METROPOLIS; fallback: images at every fifth epoch (V06 §6.5). (3) *The
statistical bars may need rule changes, not just rates* — E7 runs the bench before the rules freeze; a failing bar takes its
register line's fallback run, and a second miss goes to the fix list with its measured shift (`not-achieved`, V12 §5.5). (4) *Volume 11's rows* (profiles, coverage, goods, ladders, barriers) — E4 and E3 run
on defaults until they land, a declared shift. (5) *Volume 8's carriage* (calamities, `activeChains`, ladder receipts,
church and cemetery records) — standalone histories need none of it; the dossier-bound clauses of T-V6-27, T-V6-40, T-V6-45, T-V6-49
and T-V6-55 wait for it. (6) *Volume 4's epoch functions* (U5, with `Foundations.apply` exported for its epoch caller and `CatacombGrowth.grow`
taking the cap, the primary and the calamity deaths) — E8 waits for them; until then `'history'` runs without the
underground participants (reported as absent), as `'grow-by-stage'` does. (7) *Item 105's S10b changes in the base* — E4's
re-binding needs the base's nearest-provider binding and two-way term; until they land the use phase re-scores with the
base's one-way term (a declared shift). (8) *Item 110's base half* (the raised-way solver, the hand operator, the span
rule, the need reading, the ledger's generation-side use, the retaining walls and deck plots) lands at M3a, before M6-E;
a build without it runs no `raisedWays` step and no item-110 candidates and reports it (V06 §3.17 (9)). (9) *Item 113's
replay inputs* — V08's history reading and V11's history cells and event rows — standalone blueprint histories need only
V11's rows; the dossier-bound clauses of T-V6-70 wait for V08's history reading, and a build whose tables package lacks
the event rows replays with every event unmapped (reported), the peak and the targets still replayed. (10) *The replay's
cost* — E0 times a coarse epoch on H-HISTORY's starts; fallback: V06 §6.7's coarsening, for the owner's veto.

## 9 Decisions (each "chose X over Y because Z"; vetoable)

| id | decision |
|---|---|
| J-V6.1 | chose a phase-based strategy (phases in a fixed step order, each committing its batches before the next reads) over the base's one-shot `plan()` returning an op list, because later phases must see earlier phases' results and the other volumes' participants must interleave at named steps (item 317); and that `'grow-by-stage'` registers a phase for every step the base's built path runs (prelude, demand, field, dossier, siting, growth, lapse, character, works), built once in `@plat/edit` and shared with `'history'`, and a step with no phase runs nothing — over registering four phases, because a dossier event carried by an epoch must never be dropped (item 20) and one code path serves both strategies |
| J-V6.2 | chose to refuse `advance` on a dossier-bound document over letting a user run the map ahead of its campaign, because the host's clock owns that map's time (§4.11 *The clock*; item 20); a what-if is a detached fork (J-V6.37) |
| J-V6.3 | chose 52 weeks as the standalone cadence over a coarser decade step, because it matches the port's cadence, so a standalone and a dossier-bound history move at one grain and every rate is per year either way (item 76 (5)) |
| J-V6.4 | *superseded by J-V6.127 (item 113, an owner rule)* — chose no simulated pre-creation history (the dossier's past reaches the map by `HistoryHint`, item 88) over simulating a town's past at creation, and offered "start small and advance" instead, because a one-click town must stay the one-click town and an aged town is an explicit, visible history |
| J-V6.5 | *amended by J-V6.61* — chose to clamp a standalone trajectory's population to the registered products' ladders and report it, over refusing the request, because a user's "grow much larger" should run to the ladder's edge |
| J-V6.6 | chose a logistic default shape (steepness 8) over linear, because historical growth and decline spend most of their change mid-span; linear and rate shapes remain one chip away |
| J-V6.7 | chose to filter protected entities out before any draw or cap over drawing and then skipping them, because holding one thing must not change which other things the history picks (T-V6-4) |
| J-V6.8 | chose to keep the base's order — the use step before departures — and judge catchments on the epoch's opening households, over reordering the base, because the strain memory's years absorb a one-epoch lag and the base's order is reviewed |
| J-V6.9 | chose WHO leaves from the roster's suffix and WHERE from exposure-weighted keys matched by band (with swaps) over emptying the suffix's own dwellings, because the roster fixes the population's composition while item 8 (c) fixes geography — both must hold |
| J-V6.10 | chose one strike pool per district over the layers' candidates over one pool per layer, because the persistence rates then set the layers' shares directly (item 8 (b)) |
| J-V6.11 | chose to re-derive every once-drawn span from a stream keyed by the epoch it began in over storing it, because it keeps the model small and the history identical on replay |
| J-V6.12 | chose a new circuit only when threat, the extramural share, prosperity, the interval and a per-year chance all agree, over a population trigger alone, because walls were built by rich towns under threat, not by size |
| J-V6.13 | chose that a ring neglected in long safety decays but is never converted to a road or built over by the engine, over converting it, because only supersession or a hand edit historically made a road of a wall; decay is the default fate of an unneeded wall |
| J-V6.14 | chose fate weights road 0.7 / absorb 0.3 (keep under threat) over a single fate, because both historical outcomes occur and the owner named the road |
| J-V6.15 | chose to trace a shorter ring only through empty, ruined and cleared fabric and along plot lines, retracing at most three times and then waiting, over forcing demolitions, because no occupied house is demolished by decline (item 31's rule extended) |
| J-V6.16 | chose that repair closes breaches but never rebuilds a dismantled stretch, because its stone is gone; a hand `drawWall` closes a gap (a hand `repairWall` on the gap bends to it, J-V6.98) |
| J-V6.17 | chose crowding before sprawl, capped by a share and a factor, the rich never crowding, and decrowding as a stage trigger, over growing a stage for every residual, because towns filled and crowded before they spread; crowding is tier (5″); a rich residual grows a stage for the rich households only, as ribbon villas on the best arterial (never a quantum's worth of land for one household); the quantum applies to the residual plus the overflow backlog, so a slowly growing town grows a stage once its backlog reaches it whatever the cadence; the overflow ladder crowds first, then informal tenure, then tents; the backlog and decrowding stages are item 336's two exceptions to "the residual only" |
| J-V6.18 | chose the `ribbon` regime below 150 households and `suburb` above over one regime, because small growth strings along the roads and larger growth fills between them (FTG's configured suburb stage, `research/findings/ftg-docs-params.md` §1.4 *Suburb-stage parameters* and §2.7 *Suburb stage*); filed as item 293 to §4.4's suburb row (a history epoch's unwalled stage of at least `growth.ribbonMaxHouseholds`), over following MFP-6's "preset, era row or shanty toggle only", because MFP-6 describes a one-click town's last stage and a long history filling the land between ribbons is historical; the walled share joins the growth parity with its deviation declared |
| J-V6.19 | chose no spontaneous hazards for a dossier-bound town — **a rule, not a default: `adjust` to `minor` or `full` is refused with R2's line** — and `minor` for a standalone one, over the same default for both, because a dossier town's calamities are the dossier's (item 20 (h)) while a standalone town should feel alive |
| J-V6.20 | chose fire as a breadth-first spread over adjacency with firebreaks, flammability and wind, capped by mode, over a circular burn radius, because streets, squares, water and stone stopped historical fires |
| J-V6.21 | chose no war or siege operator, because item 8 rules the owner's war example out of the design |
| J-V6.22 | chose a less flammable roof on rebuilds for 30 years after a fire (an extension row, 0 in the parity presets) over none, because post-fire ordinances are historically attested and the realism tiebreaker favours them |
| J-V6.23 | chose that a strained use closes and the class's deficit opens a new business where it scores best, over moving the same use, because a failed shop is a closure; thriving uses move by the relocation rule |
| J-V6.24 | chose surplus closings under the `use` cap, most strained first, and strain closings uncapped, over closing a fall's surplus at once, because shops outlast a fall for a while and a failing shop's own years are its lag |
| J-V6.25 | chose to re-score every use against a phase-start snapshot, **re-scoring on the committed state a use whose links a committed op changed** (J-V6.54), and to open deficits in item 105 (f)'s order, over visiting in address order with live scores or a frozen snapshot, because the result must depend on visiting order only through committed moves, which re-bind, and a link must never be left stale |
| J-V6.26 | chose to read the use rows' durations in years (`closeAfterYears`, `starveAfterYears`) over epochs, because epochs are irregular on the weekly clock and item 76 (5) makes every duration a year count (item 429) |
| J-V6.27 | chose to apply a plan's step only while the building's digest matches, re-planning otherwise, over applying stale parts, because a hand edit between steps must never be overwritten |
| J-V6.28 | chose that an edit of the evolution table applies from the next epoch and never re-runs standing history, over re-folding the log, because history is a record; `rerunFrom` is the explicit way to recompute it |
| J-V6.29 | chose buildings as casters as they stand when the field phase runs — **after this epoch's hazards** (a burnt quarter sunnier at once), before this epoch's placements — frozen until the next epoch, over casting within the epoch, because it keeps the field one pass per epoch (item 102 (c)) and gives the owner's slow drift |
| J-V6.30 | chose `'history'` as the default strategy for documents created at or after the output version that ships V06 and `'grow-by-stage'` for older ones, over changing older documents' epochs, because an upgrade must not silently change a history (§7.5) |
| J-V6.31 | chose no Works for walls, ways, water and land uses over extending the Works target, because their slow change is already the per-stretch and per-face events across epochs and the base's Works target is a building or plots; and (item 110) a raised way, a retaining wall and a deck likewise appear at their epoch's week, as a circuit does (J-V6.90) |
| J-V6.32 | chose to chain a later change on the same target within an epoch after the earlier Works finishes, over the one-target rule's cut, because a demolition then a rebuild in one year is a sequence, not a cancellation |
| J-V6.33 | chose to retire Works relative to the epoch's span start over its week, because a frame must hold every Works of its span at any cadence (item 321) |
| J-V6.34 | chose derived succession — lifespans and entry ages drawn from the person's key, the chain walked on demand — over storing births and deaths as events, because it costs nothing at an epoch and keeps §10.3's pure-function person |
| J-V6.35 | chose frames from before/after images of each commit with keyframes, the replay as fallback, over replaying every scrub, because recomputing epochs is too slow to scrub and images cost O(touched scope) |
| J-V6.36 | chose `frame(w)` = the log prefix through the first epoch whose week is at least `w`, over the prefix before it, because an epoch's Works start inside its span and only its model draws the transition at `w` |
| J-V6.37 | chose that a fork of a dossier-bound document is detached (no host bridge) over a forked bridge, because the dossier is the sole truth of the original and nothing may flow back (item 20) |
| J-V6.38 | chose that `rerunFrom` re-appends, in log order, the later epochs and **dossier events** but not the later hand edits (listed with a "re-apply" that resolves by carry-over matching, F-EDIT with alternatives on failure), over replaying every event or dropping the dossier's, because the dossier is the sole truth (item 20) while hand edits' addresses may not exist in the new history |
| J-V6.39 | chose a fallow ladder farthest-from-a-farmstead first, re-taking pasture and commons before new fields, wildwood never re-taken, over deleting fields, because abandoned fields historically went to pasture, scrub and wood, and were re-taken nearest first |
| J-V6.40 | chose to leave an oxbow as a still water body of a new kind that silts to marsh over deleting the old loop, because a meander cut-off leaves one (item 206) |
| J-V6.41 | chose a tent belt on the edge as the overflow's last rung over an "unhoused" count, because F-PLAN never drops a household and the hinterland always has ground |
| J-V6.42 | chose chronicle lines by thresholds and significance with the rest counted per district, over one line per change, because a readable history names what mattered |
| J-V6.43 | chose that a custom chain's nodes move together only when its anchor moves and otherwise one at a time with a one-epoch lag, over moving every chain as a block, because item 104 (h) (7) keeps sites and least disruption binds |
| J-V6.44 | chose the town's wealth level as an epoch input (dossier `wealth.label`, a trajectory target) over a fixed recipe value, because a campaign's prosperity word changes (item 343) |
| J-V6.45 | chose hazard counts by the integer part plus a fractional-extra draw over a Poisson draw, because it matches the churn caps' idiom and needs no transcendental beyond `dmath` |
| J-V6.46 | chose to isolate a failing participant (ops discarded, reported, the epoch continuing) over failing the epoch, because §5 forbids a whole-map retry and one layer's fault should not stop the town's history |
| J-V6.47 | chose a read-only past in the UI (edits only at the head; a fork to change the past) over editing a frame, because the log is ordered and an edit is always appended |
| J-V6.48 | chose to show the nearest cached frame while the thumb moves and the exact frame on settle, over blocking the drag, because scrubbing must feel immediate (§12.6's preview rule) |
| J-V6.49 | chose that a castle's or a citadel's innermost ring always keeps its `keep` fate, over treating it like a town wall, because citadels outlived town walls historically |
| J-V6.50 | chose excavation by demand — at most one per epoch, only when accessible void capacity falls short of the crowding hook or the undercity's size law, only within `excavate.reachM` (60 m) of an accessible element, at `excavate.chancePerYear` (0.05; our own, calibratable) — over access by chance alone or unlimited digging, because item 109 (h) says a ruin "may be excavated" and people dig where they need room, near where they already are |
| J-V6.51 | chose dwellings in the same epoch as the access that admits them (`under.undercity` after `under.access`) and their vacating in the same batch as the seal that shuts the last access, over a one-epoch lag, because 109 (j) (4) reads "an epoch that opens an access may start them, one that seals the last access empties them" |
| J-V6.52 | chose one uniform per catacomb source lineage, drawn once and compared at each epoch against the rung's chance (and the count, dry ground and the age gate), over a re-draw each epoch or one final refusal, because it is prefix-stable and monotone — a churchyard refused as a town may found a catacomb as a city, never by a second roll |
| J-V6.53 | chose a catacomb growth cap per year compounded over the epoch's span — V11's `growthCapShare` (V11 §3.23.8), V04's `CatacombRule` field, read as a per-year share (J-VI.6), floor `growthFloorM2` (the same row) — over V04's share applied per epoch or a new row of this volume's, because the same century must grow the same at any cadence (item 76 (5)) and one rate should live in one table |
| J-V6.54 | chose to re-bind links after every committed use op of the phase, over a frozen phase-start snapshot, because item 105 (a) forbids a stale link on any path and a link must pull both ends in the epoch it changes |
| J-V6.55 | chose splits and merge-backs over epochs by the split index against the class's compiled `profile.split.threshold` (V11 §2.3; the web's `splitThreshold` its default) with a hysteresis (`uses.splitHysteresis` 0.1), over splitting only at creation, because a butcher splits into slaughterhouse and stall as the town grows and merges back as it shrinks, and a hysteresis keeps a pair from flickering |
| J-V6.56 | chose nearest-provider catchments from one labelled Dijkstra per class for strain, and quarters only by item 72's emergence or a declaration, over overlapping radius counts and assigned chain quarters, because item 107 (c) says nearest provider only and 107 (e) that quarters are never assigned — and the labelled search costs what the old unlabelled one did |
| J-V6.57 | chose that a covering dossier record owns its class's members (generator count 0, standing uses re-bound by `assign`), members between the range's minimum and the per-capita target being map facts, over counting the generator's uses beside the record, because item 108 (c) forbids double counting and 108 (b) makes the members scale with population |
| J-V6.58 | chose water access as a hard rule on every new ring and contraction — the harbour frontage and its path inside the contraction region, a trace that cannot hold it waiting — over a soft cost, because the owner: "you'll be hard pressed to find a wall that … completely blocked off water access" |
| J-V6.59 | chose that on a dossier-bound document a circuit or waterfront wall appears only when the walls records admit it (and a walls REPLACEMENT triggers one outside the chance), over the standalone threat-and-chance rule, because DR2's bar is walls exactly when the dossier lists them (item 20 (h)) |
| J-V6.60 | chose to re-resolve `Features.sewers` at each epoch from the rung (on at CITY and METROPOLIS) and, at TOWN, from the creation's one draw against the law at the epoch's population — once on, never off — over keeping the creation's value, because the owner made sewers a necessity for cities (item 14) and the creation's draw keeps it deterministic, monotone and cadence-free with no new draw |
| J-V6.61 | chose to clamp to the union of the registered products' ladders ([0, 120 000] with volume 7, 0 the deserted outcome) and to run the product's phase overrides at its rungs, over the town's 1 500 floor, because volume 7 designs the hand-offs up and down and the village's own phases (items 202, 317) |
| J-V6.62 | chose volume 3's crypt rank (the principal crypt the cathedral's; every other crypt trimmed to V11's `crypt.rankShare` × its area; an author ring exempt), re-run inside every epoch op that changes the principal, with this volume's rule that **a trim never loses a vault** — it shortens the crypt's ring only, the bays left becoming undercroft and regaining the crypt role when the see returns — over a rank function of this volume's own (extend-then-cap at 0.9), because volume 3 already states the rank at generation (single source), the always class's crypt target makes a new seat's crypt the largest in the batch that makes it, and nothing physical is lost across epochs |
| J-V6.63 | chose V04's crypt join as its rule stands — one uniform per (church, complex) pair with no epoch component, at V11 §3.23.8's `cryptJoin` (own church, other; V04's `CatacombRule` field), evaluated when an epoch's growth first reaches the crypt — over a per-church-lineage 0.5 draw of this volume's own, because (k) (2) says the crypt "may join", a key without an epoch gives an epoch the answer a regeneration gives, and V04's rule already states it (single source) |
| J-V6.64 | chose that the catacomb count bounds foundations and a decline removes no complex, over removing complexes above a lower rung's count, because "it can't shrink" is the owner's and removing a whole complex is the largest shrink |
| J-V6.65 | chose to re-derive the primary complex at each epoch by the burials its cemetery **serves now** (past a 10 % hysteresis), the rank cap stopping growth and never reducing an extent, over fixing the primary at its founding or ranking by cumulative burials, because the owner's "the largest catacomb is the largest cemetery's" must follow a city whose main cemetery moves outside the walls, the present measure needs no new persisted state, and the hysteresis keeps it from flickering |
| J-V6.66 | chose that the use phase never moves a church-family use whose plot holds a churchyard, nor a `singular` anchor, over moving them by score, because consecrated ground and a see do not move by trade, and a moved churchyard would freeze a catacomb and orphan a crypt |
| J-V6.67 | chose to seat the crowding hook's households inside the growth phase, by S7b (6) and U-FRONT's placement on accessible capacity, before the decision, over reserving them as a take for `under.undercity`, because that participant runs after the decision and the residual must exclude exactly the households seated below |
| J-V6.68 | chose to draw a thriving use's move-chance gate before scoring its candidates, over scoring every use every epoch, because the decision needs both conditions and the gate spares ≈ 90 % of the scoring (the METROPOLIS budget) without changing the rule |
| J-V6.69 | chose one household ledger with V05's `EpochOps.demandTaken` name kept and a new `EpochOps.displaced`, over a new combined field, because V05 already writes to `demandTaken` (V05 §3.15's request, carried here) and one name per fact is the single-source rule |
| J-V6.70 | chose that this volume owns the calamity-to-hazard table (`tables/evolution.json#calamities`) and the port only carries the records, over a port-side mapping, because what a calamity strikes on the map is the engine's decision and no volume owned the mapping |
| J-V6.71 | chose to persist the why rows on the use phase's lifecycle events (≤ 5 rows) over keeping them in the non-canonical report, because the answer must survive a load and a rebase and the provider must be a pure function of committed state |
| J-V6.72 | chose an effective week for changes without a Works — the epoch's week for an engine op — and before-images in frames, over giving walls, ways and land Works, because it draws the past correctly at any cadence without changing J-V6.31 |
| J-V6.73 | chose `raiseGrade` after a burn of ≥ 60 connected buildings or a heavy flood over ≥ 1 ha, at a chance of 0.3 (our own, calibratable), over never or always, because rebuilding on the rubble is attested after great fires and floods but not universal |
| J-V6.74 | chose a per-band turnover vacancy (poorest 5 %, others 1 %; 0 in the parity presets) over refilling every vacancy, because towns always carried some vacancy and FTG's poorest pools keep abandoned stock |
| J-V6.75 | chose to key a successor by its predecessor's death week over the epoch of death, because identities and names must not depend on the cadence |
| J-V6.76 | chose to cite volume 3's crypt rank and volume 4's crypt join as they stand and to state only their epoch guarantees here (the seat's crypt in the batch that makes it, the rank inside the causing event, no vault lost to a trim, the join evaluated when an epoch's growth first reaches the crypt), over restating either, because the single-source rule gives each fact one home and both volumes already state them |
| J-V6.77 | chose no crypt participant — the crypt re-derived and re-ranked inside the op that changes a church's designation — over a seat check at `afterGrowth`, because a check after the fact would leave batches in which a new seat's crypt is not yet the largest, while the causing op keeps the bar at every batch |
| J-V6.78 | chose that a history whose epochs carried dossier events stays pinned on an upgrade unless the host asks, and that others see a per-epoch diff and choose, over upgrading silently, because a campaign's history must never be rewritten behind its host |
| J-V6.79 | chose thin adapters in `@plat/evolve` for the `under.*` participants, registered under V04's `U-FADE` stage (V04 §1.1; J-V11.80), over their registration by `@plat/under` or under `EVO_UNDER`, because V04 exposes functions, the epoch scope and cap are this volume's, `@plat/evolve` already depends on the layers it schedules, and every draw and table read inside them is V04's engine's — only their own excavation-by-demand draw keys on `EVO_UNDER` (V06 §3.16, V06 §3.18.1) |
| J-V6.80 | chose to move the history store's and frames' memory settings to volume 9's per-device settings, over rows of the pinned model table, because they change what is cached, never what is drawn, and must not enter the log |
| J-V6.81 | chose that a dossier walls record with no residual rings the present built boundary through the hand `drawWall` path (no face added), over growing a zero-household stage, because the base's residual rule forbids a stage without a residual |
| J-V6.82 | chose a dedicated `raisedWays` step between `terrainWater` and `ladder` over deciding raised ways in the growth phase, because item 110 (b)'s reasons arise without a stage (a rung crossing, a need rising inside the old plan, a prosperity rise on high wards) and the households a raised way displaces must be re-housed by `siting` in the same epoch (item 335's ledger), never sent to a tent |
| J-V6.83 | chose that a removal of a generated raised way (and of a generated harbour-mouth chain or quay wall) suppresses its reason key, counted as filled, over matching tombstones, because the base's collision rule mints over a tombstone and an epoch's generator runs after the removal in the log — and because the owner removed that way, not the kind's quota; a re-apply resolves by the key and, where no way of it stands, says so with an alternative; a user's re-add serving the key holds it, counted once |
| J-V6.84 | chose one uniform per reason key with no epoch component, compared with the chance at every generation and epoch, and the key as the raised way's derivation unit, over a per-year draw keyed by lineage and epoch, because an epoch must give the answer a regeneration gives, a removal needs a stable key, and V04's vault keys must agree on both paths (the J-V6.52 and J-V6.63 precedent) |
| J-V6.85 | chose the kind order aqueduct, viaduct, elevated road — necessity, then passage, then prestige — over one pooled order by strength, because a city short of water builds the aqueduct first and the strengths of the three kinds are in different units |
| J-V6.86 | chose that a cap counts standing generated, suppressed and declared ways and bounds only new foundations, over trimming to the rung's cap, because a fall below CITY never removes a raised way, and a removal or a user's own way must not be replaced by the generator |
| J-V6.87 | chose decay only for a disused generated raised way — a viaduct carrying a primary never, an aqueduct once its need or its source is gone — with supports outlasting spans and repair regrowth-first from the next epoch, over striking raised ways like any fabric, because roads in use and water in demand were kept repaired, and ruined aqueducts still stand as rows of piers |
| J-V6.88 | chose retaining walls as persistent fabric made only where an epoch levels, slumping only under terraces abandoned for a generation, and a plot line no merge or re-cut removes, over treating them as wall rings or as ordinary plot lines, because terrace walls outlast the houses they held and item 110 (a) says they are not enclosures |
| J-V6.89 | chose decks as struck fabric at the street rate — only when their crossing is dead and no deck plot is occupied, or by flood and fire — ruining what stands on them in the same batch, with regrowth repairing a deck in use before any new crossing and re-offering its plots, over decks that never change, because bridges with houses burned and were swept away, and were rebuilt where the road still ran |
| J-V6.90 | chose no Works for raised parts, retaining walls and decks — each change drawn at its effective week — over a structure Works target (a support-then-span programme on the weekly clock), because walls and circuits already appear at their epoch's week and one rule for every line structure keeps frames and exports consistent; the rejected alternative is a base extension of `Works.target` should the owner want an aqueduct seen rising |
| J-V6.91 | chose to cross a raised way under a span — a wall opening for water, a raised gate for traffic — with continuity a hard rule and a trace that cannot keep it waiting, over routing the trace around the raised way, because walls let aqueducts through by arches and gates stood where roads met walls |
| J-V6.92 | chose raised ways as map-derived on a dossier-bound document — the water-system record making the need count as met, raising the aqueduct cap and the total by `capPerSizeMember` per SIZE member and binding the terminal (its `conduit_house`, else a fountain pin), never scaling the chance (V11 §3.24.7 (3); J-V8.67) — over a dossier gate like the walls', because the dossier lists institutions, not arches, and the terminal must never add an institution the dossier does not list |
| J-V6.93 | chose three new `DeclineOp` members for raised ways, retaining walls and decks, over re-typing the existing wall member's `enceinte` into a target union, because stored `convert` events keep their shape and no migration is needed |
| J-V6.94 | chose to mark disuse by a stored `underuseSince` on the raised way and to `neglect` a disused way deterministically in the pass, over a strike-pool draw of `neglect` and a disuse span re-derived from history, because neglect is not a fabric loss but the end of use (as V06 §3.7.3 treats a ring in long safety), and the need ratio's history cannot be re-derived without storing it |
| J-V6.95 | chose that a generated raised way with a dismantled span or a cleared support is **released** — no longer counted, no longer repaired, its key re-opened with the same `u` — over counting it until salvage clears every support, because a way that can never carry water or traffic again would otherwise hold its kind's cap for centuries and deadlock a city whose need is live; new aqueducts were built beside ruined ones |
| J-V6.96 | chose to clear a raised way's land whole or not at all, before its commit, charged to each district's `geometry` cap, over a partial clearing or the hand operator's own overflow re-homing, because a half-cleared course cannot be committed and the ledger must re-house the displaced in the same epoch's `siting` |
| J-V6.97 | chose the product and rung that V07 §2.1's fold gives at the epoch (the 5 % hand-off band, item 322) over §1.1's router at the epoch's target, because the router would flip product, phases and rung rows at every epoch of a target oscillating around 1 500, and V07 owns the hand-off |
| J-V6.98 | chose to bend (J-VI.4) every non-dossier, non-lock infeasible request of this volume — a repair of stone that is gone (a new stretch or span on its line), `from: founding` on an existing document ("Start a new town small" as a new document), `forkAt` / `rerunFrom` before a rebase point (the earliest seq), `advance` on a standalone neighbourhood document (none, with its line) — over refusing them, keeping refusals only where a dossier fact rules (`advance` and the hazard mode on a dossier-bound document) |
| J-V6.99 | chose a `landfall` candidate kind in the one strike pool, at the street's rate and weighted by the salvage ledger's demand, with the covered way's class kept in `Way.formerClass` by the landfall and its surface re-laid by the base's rule, over a fixed clearance a set number of years after the fall or a stored former surface, because rubble is cleared where its stone is wanted (the base's salvage mark), the pool's caps bound an epoch's churn, and a cleared road is re-laid, not restored to its old paving |
| J-V6.100 | chose to fill F6's void dwellings opened at an epoch by relocating the district's poorest-band ground households (up to `voidDwellings.share`, charged to the `use` cap) and to re-house the underground households `under.undercity` or a foundation collapse vacates inside the participant by §4.7's overflow pass, over new households or the ledger, because the participant runs after `siting`, the population is the target's, and `close` would otherwise send them to tents |
| J-V6.101 | chose to restore a decayed generated retaining wall only where its high side is re-levelled (a tier (3) build, a house-platform rebuild, a rung-3 re-cut) or by the landfall clearance, a ruined stretch replaced by a new one on its line, drawn walls by hand only, over a standalone terrace-repair pass, because terraces are rebuilt when the ground above them is worked again |
| J-V6.102 | chose that a standalone neighbourhood document has no clock — the time card absent, `advance` and a skeleton's `history` bent to none with their line (V09's bend row, V10's bend category), `forkAt` and the timeline kept — over running the grow path on a document with no S4–S5 growth route, because a neighbourhood alone has no growth route (V01 §3.10) and its history belongs to its town, which the user opens to advance it |
| J-V6.103 | chose `ProductDeclEpoch.rows` — a typed `ProductEpochRows` (per-class persistence multipliers, the street op, the hinterland's slack, order and cap) read by the engine's own decline and hinterland steps — over letting a product override those steps, because the village changes only these values and the op, and one strike pool keeps the persistence order and T-V6-6 in one code path |
| J-V6.104 | chose to apply V04's foundation rule as `under.extend`'s first act over the epoch's scope (`Foundations.apply`), over leaving it to the next regeneration, because a pier or basement founded at an epoch would otherwise leave dwellings on a floor its footing fills and the epoch and a regeneration of the same state would disagree |
| J-V6.105 | chose to suppress a removed generated retaining wall by its chain's lineage address and a removed generated deck plot by its host's id and slot ordinal, in the one suppression mechanism, over a tombstone keyed by the line, because §6.3's collision rule re-mints over a tombstone and the re-derivation where an epoch levels and tier (5) would re-make them |
| J-V6.106 | chose to tombstone the retaining walls inside a `raiseGrade` region in its batch — V04's buried-system builder reading each as a step in the buried floor — over keeping them as live buried features, because item 245's record has no buried state and the buried town keeps its terraces through the floor datums |
| J-V6.107 | chose to issue volume 7's whole hollow-way ladder from this engine — `ProductEpochRows.street` gaining `again` (`effaceWay`, a hollow way struck a second time after the first dwell band [10, 30] years, keyed with its retirement epoch) and `reopen` (`reopenWay`), the retirement candidate filtered by V07's disuse test (no entry, approach or landing) and §5.3's network invariant on the network less the way, and tier (5′) reopening any way whose `abandoned` or `decayed` existence `retireWay` or `effaceWay` set, under any product, with no cap — and reopening such a way in the batch of any placement on a plot whose access edge it is (tiers (0)–(5), the village's (6v)–(9v), the use phase's openings and moves — V06 §3.9.5, V06 §3.9.6, V06 §3.9.10's relaxation and split shop — and a dossier-backed use's relocation, whatever step makes it), with every hollow way on its shortest path to the ways in use — over a single `street.op` with V07 issuing the rest, or reopening only under the village product, because V06 is the only issuer of epoch ops, a hollow way leaves every router (so the downgrade's test no longer protects the frame), a village handed up to a town must reopen its hollow ways before it cuts new lanes, and a reoccupied or rebuilt plot on a hollow way would otherwise stand with no path, failing the retirement's own §5.3 invariant |
| J-V6.108 | chose that a `fallen_island` decoration's member leaves in the batch of whichever op ends its cover — a strike of this kind, a `repairRetaining`, the `retypeLand` of its quarry face to commons, a `repairRaised` (a span's repair restoring the ruined supports at its ends) or a `dismantle`, or any tombstoning op — with each access V04 §3.10 bricked under the member returned `open` (`locked` when secret) in that batch and the member's face in `EpochScope.surfaceChanged`, over tombstoning the decoration only when this candidate kind has struck every member or leaving the accesses to a later pass, because V05's decoration holds land uses and raised parts this kind never strikes, rubble must not outlive its cover, and V04 §3.10 changes an access's state only with its host |
| J-V6.109 | chose to lift the sewers gate from the crowding hook's void part by a base change request (item 574: §4.11 step (6), II.7.3 (c), §4.5 S7b (6)), applied before item 319, over keeping the base's gate and seating void households only through F6's relocation, because item 109 (j) (4) lets an accessible cavern or ruin hold dwellings at any tier and the hook is the base's one channel for the epoch's crowded poor, while the sewer runs keep their gate |
| J-V6.110 | chose to repair a breach on a ring in use — no pathway, its threat above `walls.neglectThreatMax` — at the next `fortification` phase by the same `repairWall` order (the `breached` runs of item 575's `condition` in chain order, no Works — its towers and gates standing again with their runs — the `fabric` cap charged), a `dismantled` run left a gap and a locked or pinned ring held, over leaving a landfall's breach until neglect or a hand repair, because a defended town mends its walls, the same landfall's retaining walls, spans and decks are restored, a gap whose stone is gone stays a gap (J-V6.16), and a ring at or below the neglect bound is left to V06 §3.7.3's path so the two rules never both act |
| J-V6.111 | *amended by J-V6.126* — chose to confirm `tables/evolution.json` by its own bars (`bar.T-V6-<n>`) and the V6-E7 panel, with one pre-decided fallback move per column family applied by V12's `fallback` run and a second miss `not-achieved`, and to mark the cost and recording bounds (`advance.maxEpochs`, `replay.maxEpochs`, `history.checkpointStride`, `uses.openCandidates`, `uses.moveWhyRows`, `chronicle.*`), the rule columns (`growth.crowdBands`, `streets.classes`, `uses.closeSurplusBy`, `works.partStartAt`) and the `calamities` mapping `calibratable: false`, over reference tuning runs or `fixed:` notes, because no reference evolves a town, V12 admits only `reference`, `fallback` and `corpus` runs, and a knob that shapes no model output, or is a rule or a dossier mapping, has no measurement to confirm it |
| J-V6.112 | chose to read an enceinte's breaches and dismantled runs from item 575's `condition` profile — `repairWall` restoring the `breached` runs in chain order, the pathway cleared when none is `breached` — and, after `absorbWall`, to keep dismantling the cleared record's remaining runs in the fortification loop until every run is `dismantled`, its towers and gates following their runs (a tower or a gate is no building and never a pool candidate), over a per-stretch lifecycle or leaving the remaining stretches `ruined` for the strike pool, because a `StretchRef` is never stored, item 575 has no `ruined` value and enceinte walls stay out of the pool |
| J-V6.113 | chose to merge a generated split pair at the next `uses` phase, under the `use` cap, when its class's view carries no `profile.split` (V11 §3.7.4's `splitEnabled` false, or the class's split row removed, mid-history), an author's declared split standing and no split opening meanwhile, over leaving the pair on an absent threshold or merging it at once outside the cap, because the switch's off form must converge to a history without generated splits while V11 keeps placed uses (J-V11.14), and every engine op is capped |
| J-V6.114 | chose to keep, through V06 §3.7.2 (2)'s dismantling of a superseded or absorbed curtain, the stretch that holds a raised gate whose deck stands — filtered before the draw and taken by the same draw from the epoch after that raised way is removed or its crossing span `dismantled`, after `wallToWay` as after `absorbWall` — while a wall opening under an aqueduct goes with its stretch, over leaving the gate until the strike pool cleared the old line's structures or dismantling it under the deck, because the strike pool holds no enceinte part, the gate's tower is the deck's support (so its run cannot fall while the deck stands without breaking the raised way's continuity, V06 §3.7.6 (5)), and an aqueduct's span over land passes over its wall opening and needs nothing from the stretch |
| J-V6.115 | chose to make `repairWall`'s stretch optional — with none, the ring's latest unlifted `neglect` lifted, its existence back to the state before that neglect (read from the ring's lifecycle block) when every run is `standing`, else `decayed` — issued by the engine in the batch that clears a pathway (also when no run was ever breached; cause `rule:threat`) and by hand as T3's "back in use", where it also clears the pathway whatever its cause and restarts V06 §3.7.3's neglect clock, over leaving a repaired ring `abandoned` or adding a separate "unneglect" op, because a defended ring must read as in use to every existence reader, `repairRaised` already has the same no-span form, one op keeps one hand form and one undo, and a hand declaration that a wall is in use must not be undone by the engine's next pathway step |
| J-V6.116 | chose to name each suppressed key's serving re-add as the event V09 §4.20.3 (4)'s Build it again emits — `drawWall` on the waterfront arc, `placeGate` across the basin's mouth, `drawWall { kind: 'retaining' }` on the former chain, `drawFootprint` fitted at the deck slot — each served by the rule's own reading (the arc walled, the mouth enclosed, the chain's line covered, the slot's plot declared), counted once and holding the key only while the re-add stands, over a geometric tolerance of our own or lifting the suppression outright, because volume 10's Put it back takes exactly those events, the generators already read those conditions, and a re-add deleted later must leave the owner's removal in force as for a raised way |
| J-V6.117 | chose to register each bar V06 §8 names as a V12 `BenchBarDef` in the change that lands its line's exit — tier `'milestone'`, 200 seeds per setting on the bar's own fixture family, stages the phases' `EVO_*` ids, preset `'default'` (no parity preset, which would switch the web and item 110 off) — with T-V6-34 and T-V6-37 registered as epoch forms beside V04's bar-map rows, over one descriptive metric per line or a registration pass at E7, because V12's lint fails an entry naming an unregistered bar and each seat must exit green with its own bars |
| J-V6.118 | chose to price **every island event an epoch runs** — a raise at `raiseIsland`'s parts (bounded by V05 §6's "declaring an island after generation" row), a `resizeIsland` growing or shrinking at every rung where an island stands (a wane's shrinks at TOWN included) at V05 §6's "a resize, a rim reshape" row with its yards' top placements, re-cut plots, re-landed feet and scoped re-derivations, a fall at its row, a wane, settle and refloat inside the step's per-island row — per event outside the `sky.islands` row's cells, the row citing V05 §6's rows by name and restating no figure, and to re-derive the century's worst case from those rows (every island resized at every epoch with every yard's top placed and every foot re-landed: a fall needs a resize-free settled dwell of ≥ 10 years, and V05 §4.2's re-landing rule bounds nothing below one re-landing per foot per resize over plots ≥ 3 m wide), **declaring the century bounds at the sums — TOWN ≤ 25 s, CITY ≤ 115 s, METROPOLIS ≤ 215 s — for the owner's veto (D-18)**, over excluding the island events from the century bound, raising the per-epoch row to the worst case, keeping the old bounds on a typical-case figure (a resize one epoch in five), or asking volume 5 to defer its re-landings, because the century bound is what a user waits for and only the worst case is proved by the rows, a per-epoch worst case would overstate every other epoch, and the re-landing is V05's rule to keep (V05 §6's row pricing each re-claimed yard's top placement and the plots re-cut outside the re-derived districts, J-V5.81) |
| J-V6.119 | chose to have V06 §3.9.6's openings at a village rung read V07's `rules.claimArea` for the `cloister` and `market-hall` families — a candidate taken with its vacant neighbours joined by S10 (7)'s law up to the family's area, a roster member's joins on the `geometry` cap (a record's its dossier event's disruption, J-V6.123), no joinable candidate handing the opening to V07 §3.12 (c)'s outside plot — over opening such a class only on a vacant plot already of its area, because both families' `underSize` is `refuse` (V11), so without the join a friary could open only on a manor's toft, and V07's own placement rule for the village's halls and fair needs this volume's opening to finish its (c) |
| J-V6.120 | chose to report a suppressed raised-way key as one `{ removal, week }` entry of `EpochReport.raised.suppressedFired` at each epoch in which its met reading's gate passes — its keyed uniform drawn as for any other key, no course solved, no cap taken — over an entry only at the first firing, an entry for every met reading whatever its gate, or a per-way `why` query from the history panel, because the gate is where the city "would have founded it" without spending a course solve or a cap slot the suppression already holds, a keyed draw moves no other draw, an epoch row read alone (V08 §4.6's absorb group lists only the absorb's epochs) must carry its own line, and V09 §4.10 already reads the epoch report for each row (J-V9.113) |
| J-V6.121 | chose to re-lay way surfaces as the `field` phase's last act — only the ways fronted by a plot whose `fieldBand` S6 changed, by volume 1's rule over the field as S6 now reads it, an edited `surface` kept, one `setAttr` per changed way (cause `rule:field`) — over a V01 base change request on §4.5's epoch mode, a re-lay in the ladder step at the due blocks' rung, or a full re-run of the rule over every way at every epoch, because the plot's band already carries §4.5's hysteresis (so the way needs no band memory), the field phase is where the re-banding happens and V11 row 90 names S6 as the reader, the ladder's rungs act on buildings and years later while a street's surface follows its frontage's standing at once as the owner's slow drift allows, and a candidate set keeps the step under a millisecond |
| J-V6.122 | chose that an epoch candidate whose solved course item 244's support step drops (`raised_too_tall`) waits like one with no course — `raised.waited`, its `u` unchanged, re-read next epoch — over re-solving at once with a pier-height cost in the solver, because the base's course solver takes the pier rule only through the step (J-VI.27: one step on every path), a waiting reason is re-read when the ground, a levelled datum or the rung's caps next change, and the report names it every epoch it waits |
| J-V6.123 | chose that a claim-sized **record's** joins (the product's records placement, at an epoch or an absorb) are its dossier event's disruption — charged to no churn cap, bounded by the request kind's `DisruptionBudgetRow`, reported over budget and never refused — while a roster member's joins take the district's `geometry` cap (a candidate the cap's remainder cannot hold being none), over charging both to the cap or letting a spent cap push a record to its outside plot, because the placement's context carries no churn ledger and an absorb without an epoch has none, a record never waits (V07 §3.12 (c)), and the base bounds a dossier event's disruption by its budget, never the dossier's authority (§7.7 item 5) |
| J-V6.124 | chose that **every registered participant runs at every epoch at its step and gates itself** — a participant scoped to a product, a rung or a state returning no ops outside it, reading `ctx.product`, `ctx.rung` and the document — over a `scope` member on `EpochParticipant` read by the runner or running a product's participants only at that product's epochs, because `village.density`'s scope is a state (a superseded `VillagePlan`, under any product) that no product or rung filter expresses and exists for the base-product epochs after a hand-up, one rule keeps the runner a single loop for every package, and the cost is one early return per participant per epoch |
| J-V6.125 | chose that a REPLACEMENT is resolved by V08 §3.5.1 (c)'s three cases, never by template family — the greater's thing the lesser's, converted in place (`wizard_s_tower` over `hedge_wizard` among them: a dwelling-row house becoming a tower, a change of template family converted in place, as are `mages_guild` over `wizard_s_tower` and the cathedral over `parish_church`); a `@none` or `@office` lesser, the greater placed as an added record with the lesser's key its alias; and every other greater placed new — a pin-record lesser (`parish_church` over `wayside_shrine`) or a building lesser whose thing the greater does not keep (`fish_market` over `fishmonger`) — as an added record is (S10b's `dossier` request; at a village rung V07 §3.12 *Records at a village epoch* item 4 through the product's `records` placement), with no `convert` on the lesser's building or pin, over the row's in-place `convert` for every REPLACEMENT, because a pin has no building to convert, a fishmonger's shop is not a fish market's hall (V07 §3.12 (b)'s rim hall), and V08 owns which rows keep the lesser's thing (J-V8.113); a template-family test would place a second building beside a hedge wizard's converted house |
| J-V6.126 | chose to date each register line by its exit step — the entry written, and each bar it names registered, by the seat landing that step (`--milestone V6-E<n>`), its `due` `V6-E7` for lines exiting at E1 – E6 (E7's bench runs every bar they name and sits the V6-E7 panel) and `V6-E8` for E8's lines — over one `due` M6-E for every line, because V12's lint dates stages by step, one entry cannot carry two dues, the base persistence cells' line is V12's (stated there once, due `V6-E7`), and E8 may land after E7, so E8's bars cannot be measured at E7; E7's tests list every bar its E1 – E6 lines name and leave T-V6-34 to E8, and E9's lines take due `V6-E9` by the same rule |
| J-V6.127 | chose to replay a known history at generation on this engine — every coarse epoch an `epoch` event of the creation prefix, folded by the one runner through the one phase order with planned inputs — over a separate history simulator or the history's soft hints only, because item 113 (an owner rule) orders history-first generation, one engine keeps one behaviour for the past and the future (a decade replayed and a decade advanced obey the same rules), and the replay inherits the engine's determinism, failure ladder and tests |
| J-V6.128 | chose to start the replay at the peak, and at the founding only when dated points before the peak give the growth its targets, an undated peak standing at its oldest dated evidence else at half the history's age, over always the founding or always the peak, because SettlementForge's high-water law builds the extent from the peak, growth with no recorded targets would be invented, and the evidence dates the past where it exists |
| J-V6.129 | chose coarse epochs of V11's `history.epochYears`, bent upward past `replay.maxEpochs` and coarsened further by the budget's fallback, every event mapped to the epoch holding its date at its own week, over yearly epochs or dropping events to fit, because the owner asked for coarse epochs inside a stated budget and an event's place in the record must survive any coarsening |
| J-V6.130 | chose a destruction as `ruin` of every building and `retireWay` of every way (its line kept as a hollow way), and a refounding as the ordinary growth over the ruins — regrowth-first reuse of the foundations, the hollow ways reopened before new lanes, the old gate gaps, the salvage ledger — over generating a new settlement from scratch on cleared ground, because the owner's "tends to reuse the old roads, gate gaps and bridges … builds on old foundations and quarries the ruins" is the regrowth-first order the engine already has |
| J-V6.131 | chose to bury a ruined region at each coarse epoch's close once its abandonment age reaches `history.burialYears` × V11's factors, by `raiseGrade` with cause `burial`, over burying at the replay's end only, because later epochs must build on the raised ground (the rebuilding on top the owner names) and floods and silt act during the history |
| J-V6.132 | chose a failing spring as a `flow` row — drought years, over-draw, the dossier's deposit, a hand flow held — whose decline reaches its quarters through the prosperity water term and the growth pull, over a decline term of its own, because the base already weights the pull and the term by `flow` (item 111) and item 102's shade reaches its quarters by the same prosperity lag (one pattern for every soft pull), and because the dossier's live oasis never fails (item 20) |
| J-V6.133 | chose to define the `advance` group's undo after a reload (rebuild by replay, then truncation) and in a shared document (an `undo` event under the independence check, the group kept undone), over refusing those undos, because §7.4's records, rebuild and truncation rules already cover both and a user's last action must stay undoable |
| J-V6.134 | chose a drought as a hazard row with no operator (`none`), read by the spring row only, over a separate condition timeline for standalone documents, because the timeline and `advance` already carry dated events of a row kind and one event shape serves both |
| J-V6.135 | chose the replay's lazy detail — the `'last'` participants once at the last coarse epoch, no history-store images or keyframes, the Works finished before the creation retired at it — over running every participant at every coarse epoch and storing the past's frames, because no later epoch reads the close-ups' fabric, the past's frames are rebuilt on demand, and the budget is spent on what shapes the present |

## 10 Base change requests

Every request this volume made of the base is applied as a file f item; the base text at the section named is the
mechanism, and this volume states only its own side at the section in the last column.

| request | item | base section | this volume's side |
|---|---|---|---|
| the phase-based `EvolutionStrategy`, its participants and `ProductDecl`'s epoch fields; the `@plat/evolve` package | item 317 | §4.11, §1.1, §14 | V06 §2.1, V06 §3.1–§3.2 |
| Works retirement keyed to the epoch's span start | item 321 | §4.11 *Works* (9), (j) | V06 §3.13 (5) |
| `Enceinte.pathway` and `Enceinte.underuseSince` | item 254 | §2.7 | V06 §2.7, V06 §3.7.2 |
| the use step's memory `Use.strain` and its durations in years | item 429 | §2.7, §10.2, §4.11's use step | V06 §2.9, V06 §3.9 |
| the engine's conversion kinds (`EvolveOp`) and `Way.formerClass` | item 209 | §4.11's `ConversionOp`, §2.4 | V06 §2.8 |
| the oxbow | item 206 | §2.3, §4.11's `shiftCourse` | V06 §3.12 |
| `MutationPlan` in the registry, the step on `mutate`, the registry's new paths | item 264 | §2.8, §4.11, §7.1 | V06 §2.5, V06 §3.10 |
| the engine's stage ids | item 342 | §6.1 | V06 §3.16 |
| the epoch's wealth level and its provenance (`EpochInputs.wealthLevel`, `.advance` with `stoppedAt?`) | item 343 | §4.11's `EpochInputs` | V06 §2.3, V06 §3.3 |
| lifespans and entry ages | item 443 | §10.3 | V06 §3.14 |
| the API and the app (`advance`, the history reads) | item 458 | §11.2 | V06 §4.1 |
| the dossier's calamities as hazard events (DR28) | item 388 | §7.7 | V06 §1b's dossier trace, V06 §3.11 |
| the building shade mask | item 275 | §2.9, §2.7 | V06 §2.6, V06 §3.4 |
| the epoch report | item 339 | §5.4 | V06 §2.10 |
| the history layer, the exports and the ring road's name | item 409 | §8.2, §11, §9 | V06 §5.1–§5.3 |
| sewers re-resolved at each epoch | item 550 | II.7.1 | V06 §3.2 *The feature set at an epoch* |
| households between an epoch's batches (`Household.transit`) | item 335 | §2.7 | V06 §2.1, V06 §3.8.1 |
| the history engine's tiers and its two stage exceptions | item 336 | §4.11 *Regrowth-first* | V06 §3.6, V06 §3.8.2 |
| the suburb regime in a history | item 293 | §4.4's regime table | V06 §3.6 |
| why rows on lifecycle events | item 265 | §2.8 | V06 §3.9 |
| the epoch-spread mutation as the history engine applies it | item 266 | §4.11 *The epoch-spread mutation* | V06 §3.10 |
| an epoch's replay cost under the history strategy | item 478 | §12.6 | V06 §6 |
| who leaves is the departure matching's | item 479 | §4.11's epoch order (c) | V06 §3.5.1 |
| a removal that suppresses its generator's key | item 260 | §2.8, §7.4 | V06 §2.13, V06 §3.19.3 |
| item 110's generation on the epoch's terms | item 290 | §4.3, §4.5, §2.7 | V06 §2.13, V06 §3.19 |
| raised ways, retaining walls and decks in the decline table and `DeclineOp` | item 291 | §4.11's decline table and `DeclineOp` | V06 §3.5.2, V06 §3.19.2, V06 §3.19.4, V06 §3.19.5 |
| an epoch event that carries a calamity (`EpochInputs.events[].week`, `.calamity`) | item 573 | §4.11's `EpochInputs` | V06 §3.11.1 |
| the crowding hook's void part at any rung | item 574 | §4.11 *Regrowth-first* (6) | V06 §3.6, V06 §3.18.1 |

The history replay at generation (item 113) and the failing spring (item 111 (b)) are file g items whose base parts the
base states (§4.2 S0, §4.11, §6.1, §7.7's DR36–DR40, §2.3's `WaterBody.spring`, §2.7's `HistoryRecord`, II.7.6); this
volume's parts are V06 §3.20 and V06 §3.12.1.

## 11 Owner questions

**Q1 — Product order: when is the evolution engine built?** *Answered: J122 — (a), right after M4.* The engine is
priced at **29–41.5 person-weeks** (V06 §8, item 113's history replay at generation included) and starts once M4 lands,
in the combined order's four streams side by side (M5, the village's V-M, M6-E, the plan rung's P0–P1; §16); its
underground milestone E8 waits for volume 4's U5 and E3's raised-way pass for item 110's base half at M3a, each without
blocking the rest. The stage-2 fabric joins as a participant when M5 lands, and the underground's epoch half when V04's
U5 lands.

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read in the base and the sibling volumes): the hooks V06 §1.2 cites exist at their sections; the base's
`EvolutionStrategy` with its `EpochPhase`s and `EpochInputs` is §4.11's, registered by name (§4.12), and `@plat/evolve` is
§14's; the base states history-first generation with a peak (§4.11, item 113), `HistoryRecord` (§2.7),
`WaterBody.spring` and the oasis (§2.3), the replay's coarse-epoch key component `0x8000 + r` (§6.1), the derivation rows
DR28–DR40 (§7.7; DR36–DR39 the history's, DR40 the oasis's), the engine's stage ids (§6.1), the epoch report's place in
the generation report (§5.4), `Enceinte.underuseSince`, `Way.formerClass`, the `oxbow` kind and `BuildingShadeMask`
(§2.3, §2.4, §2.7, §2.9), the `live.history` layer (§8.2), M6-E's row in the combined order (§16) and item 113's bars
T113-1 – T113-7 (§13.2); volume 4's underground interfaces (`UndergroundFade`, `SewerStrategy.extend`,
`CatacombGrowth.grow`, `UndercityEpoch.reread`, `Foundations.apply`, `ArchVaults.reconcile`, `QuarryWorkings.extend`,
`AccessPass.run`), volume 5's island events, `sky.clearance` and `reclearIsland`, volume 7's fold and `village.*`
participants, volume 8's `CalamityRef`, volume 9's `info.remove.holds` and *Open a copy from here*, volume 10's
`WhyProvider`, volume 11's rows this volume reads and volume 12's register, each as V06 cites it.

**PLAUSIBLE** (reasoning, to be measured or calibrated): every budget of V06 §6 — the replay's ≤ 10 / 30 / 90 s at
generation (V06 §6.7) among them — until E0 times them; every default of V06 §2.2's table (the `spring.*` rows and
`replay.maxEpochs` among them), V06 §2.4's hazard and calamity rows and V06 §3.9.9's clientele table (our own, calibratable by
the corpus stage, §13.9); V11's cells this volume reads (V11 §3.18's structures block, V11 §3.23.8, V11 §3.24.2, V11 §3.24.4,
V11 §3.24.7 and the history cells of the replay's event-to-epoch rows), PLAUSIBLE in V11's register; the statistical bars'
deltas of V06 §7 (E7's bench confirms or re-declares them, E9's for the replay); the history image size per epoch at
CITY and METROPOLIS; that the failure scenarios traced by reading — households in tents from a raised way, a removed way
re-founded at the next epoch, fire stopped at a bridge's water, deck houses over-drowned, a port walled off from its
quay, tent belts at a fine cadence, the mask's inexactness under a Works, the early drawing of Works-less changes, a
spring failing under a crowded oasis, a replay's destroyed and refounded town — are closed by the rules as written; that
the engine's histories and the replayed pasts read as historically faithful to the owner (the side-by-side protocol,
§13.6, on H-100 and H-HISTORY); V06 §8's fallback moves, each a pre-decided step to be exercised only when its bar fails
at E7 or E9.

## 13 Fix list

None open. Every hand-off of this volume is applied at its home, and every request on it from the other parts is
answered in its text.

## Integration notes

Every integration decision on this volume is folded into the body at its home: the always-crypt target's `crypt:
'always'` column (V06 §3.10.1); `rebaseStack` and a stack's Works at an epoch (V06 §3.13 (4)) with
the raised way's clearance (V06 §3.19 (7)); `sky.clearance` and its `reclearIsland` (V06 §3.2's participant table), the
raised-way pass's ground-arena candidates and `skyAccessObstacles` (V06 §3.19 (2), (5)); the stored plans' re-cut and
re-match by wing-relative storey (V06 §3.19.4 (5)); T-V6-65's "off" (V06 §7); V09's *Open a copy from here* (V06 §5.1);
the reason key's single source and the islands' record form (V06 §2.13).
