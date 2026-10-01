=== REPLACE ### 1.1 What this volume builds ===
### 1.1 What this volume builds

The **evolution engine** — the owner-staged strategy behind §4.11's `EvolutionStrategy` slot — at build depth:
1. **The epoch runner's phase contract** and the engine's phases in the base's epoch order (a)–(j), with the prelude and
   the hazard, fortification and terrain-and-water phases placed in it (V06 §3.1–V06 §3.2; file f item 317).
2. **Epoch inputs**: the dossier-bound cadence (the port's, §4.11 *The clock* (4)), the standalone **trajectory** that
   expands an "advance time" request into dated epochs, the circumstance events (`EpochInputs.events`) as typed hazard
   rows, the town wealth level over time (file f item 343) (V06 §3.3).
3. **Growth**: the growth quantum, crowding before sprawl, the new stage's regime, the decision to build a new enceinte,
   the absorption of suburbs, the obsolete-wall pathway (gates to junctions, stretches dismantled, the ring road of
   `wallToWay` or the absorbed wall of `absorbWall`) (V06 §3.6–V06 §3.7).
4. **Decline**: the departure matching that turns the roster's suffix into vacated dwellings, the per-layer candidates of
   the strike pool (building, plot boundary, street, wall), the shorter wall ring (`contractWall`)'s trigger and trace
   (V06 §3.5, V06 §3.7).
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
    the timeline bar, then-and-now, forks, the animated export (V06 §3.15, V06 §5).
14. **Budgets** — the targets for an epoch and a century per rung, and the ten-second comfort level that `advance`, the
    history replay and a dossier catch-up's epochs each keep in total by one estimate that coarsens their cadence
    (item 119 (a), (a2); V06 §6), a catch-up whose dossier events alone pass its budget completing past it, reported
    (V06 §6.8 (6)).
15. **The hinterland over epochs** (item 26): fields follow the food demand, a fallow ladder in decline and its reversal
    in regrowth (V06 §3.5.3).
16. **Editing the past**: forks and the re-run of a history from an earlier point, dossier events included (V06 §4.4);
    history across a rebase and an upgrade (V06 §3.15.5).
17. **The supply web over epochs** (item 105): links re-bound after every committed opening, closing and move; openings in
    105 (f)'s order with its one bounded relaxation pass; split works-and-shop pairs splitting and merging; the district
    supply term; SettlementForge's `activeChains` at each epoch (V06 §3.9.10).
18. **Spread and pull over epochs** (items 107, 103 (f), 104 (h) (3)): nearest-provider catchments for strain, the comfort
    plateau and same-kind spacing in openings and moves, coverage gaps reopening, chains named a quarter only by
    emergence or declaration (V06 §3.9.2, V06 §3.9.6, V06 §3.9.8).
19. **Institution ladders over epochs** (item 108): record-owned member counts that scale with the population, and the
    COUNT, QUARTER, GUILD, SIZE and REPLACEMENT steps applied by least disruption (V06 §3.9.1, V06 §3.9.11).
20. **Walls on barriers over epochs** (item 106): barrier closure on every new and shorter ring, water access as a hard
    rule, the waterfront grade from sea threats, the harbour-mouth chain, shoreline re-evaluation, and the dossier gate on
    circuits (V06 §3.7.6).
21. **Rung crossings** (items 14, 9; V07): the feature set re-resolved at each epoch (sewers on when a town becomes a
    city), the clamp to the registered products' ladders, and a product's phase overrides (V06 §3.2, V06 §3.3.2).
22. **The underground over epochs** (item 109 (h), (j), (3b), (k)): access by digging from above, by public openings and
    by overlap with growing systems, transitive, and lost when its last open link closes (item 113 (e)); excavation by
    demand; dwellings only after access; ruins decaying and staying distinct; catacombs under cemeteries — the count, the
    ratchet, the primary complex and stagnation; crypts under churches — the cathedral's crypt the largest at every epoch,
    and the crypt join (V06 §3.18).
23. **Households between the steps of an epoch**: the typed displaced pool and demand reservations, and the underground
    crowding hook before the growth decision (V06 §2.1, V06 §3.6, V06 §3.8.1).
24. **The base hooks left for the engine**: `raiseGrade` after a great fire or flood, and passages sealed and reopened by
    decline and regrowth (V06 §3.11.6, V06 §3.5.2).
25. **Item 110 over epochs**: the `raisedWays` step that founds viaducts, elevated roads and aqueducts at a CITY or
    METROPOLIS epoch where a reason arises, by one fixed uniform per reason key, within the rung's caps, the displaced
    re-housed in the same epoch; a user's removal of a generated one held as a suppressed reason key; raised ways in
    disuse, decline and repair; retaining walls and deck plots over epochs; walls, hazards, participants and the dossier
    where they meet these (V06 §3.19, V06 §3.7.6 (5), V06 §3.11, V06 §3.2).
26. **The history replay at generation** (item 113): the engine's side of §4.11's history-first generation — the replay
    plan of coarse epochs, the event-to-epoch mapping, the generation budget with lazy detail, destruction and refounding
    run as epochs, and the replay record the report and the clerk read (V06 §3.20).
27. **Walls by need and means** (item 114): the condition ladder's transitions — worn, patched, breached — driven by the
    threat and the wealth level each sustained over a window, patches replaced oldest first (V06 §3.7.7).
28. **The grandeur ceiling across a rung change** (item 115 (e)): lifted for new and rebuilt buildings when a village
    becomes a town; the grander buildings of a town handed down kept as they stand (V06 §3.8.5).
29. **Crisis looks handed over to the epoch path** (item 122 (a)): what a crisis leaves reaches the map only through the
    next epoch; the growth frontier as a pure query for the refugee camp (`frontierFor`); a disaster's ruined look
    yielding, building by building, to the rebuild's Works (V06 §3.22).
30. **The decay level of a building lineage** (item 123 (b)): derived from its existence state and the years since its
    decay began, lowered by restoration, the reading item 123's damage layer compares with each element's threshold
    (V06 §3.23).
=== END ===
=== REPLACE ## 1b Wiring table — every new piece, what feeds it and what it feeds ===
## 1b Wiring table — every new piece, what feeds it and what it feeds

Every record, field, table, interface, edit kind and derived view this volume adds, with its producer, its consumers and
the base hook it plugs into. Rendering, labels, exports and persistence are V06 §5's and V06 §2.12's rows.

| # | new piece (home) | fed by (producer) | feeds (consumers) | base hook |
|---|---|---|---|---|
| W1 | `HistoryEngine`, the `'history'` `EvolutionStrategy` (V06 §3.1) | the epoch runner of `@plat/edit`'s fold, at an `epoch` event's log position | the phase list W2; the batches of the epoch event | §4.11 `EvolutionStrategy`, §4.12 registry (file f item 317) |
| W2 | `EpochPhase`, `EpochContext`, `EpochOps` (V06 §2.1, V06 §3.2); `ProductEpochContext`, the part a product's phases, participants and records placement read | W1; before M6-E, M4's grow path fills `ProductEpochContext` at file f item 202's call points | the runner, which commits each phase's ops as batches in phase order; a product's phases and participants (V07's `village.*`) on either path | §3.3's batches; §7.4's epoch row; §4.11's grow path (item 202) |
| W3 | `EpochParticipant` registrations (V06 §2.1, V06 §3.2's participant table) | `@plat/sky`: `sky.islands` (V05 §3.15), `sky.clearance`; `@plat/hood`: `hood.fabric` (V01's S7c on the districts the epoch made outside S7b, S9b on the blocks in `EpochScope.recut`); `@plat/evolve`'s thin adapters: `under.fade` (V04's `UndergroundFade.candidates` / `.apply`), `under.extend` (in V04 §3.10's order: `Foundations.apply` over the epoch's scope, `ArchVaults.reconcile` over `scope.raised`, `SewerStrategy.derive` at the first sewers epoch else `.extend` with its wall drops, `CatacombGrowth.grow` under V06 §3.18.2, `QuarryWorkings.extend`, V04's maintenance mode at a village rung), `under.access` (`AccessPassStrategy.run`, V06 §3.18.1), `under.undercity` (`UndercityEpoch.reread` and U-FRONT F6's void dwellings, V06 §3.18.1 (4)); `@plat/village`: `village.plan`, `village.density`, `village.pins` (V07 §2.1, V07 §3.12), each run at every epoch and gating itself by V06 §3.2's scopes; each registration carries the `stage` V06 §3.16 names (`SKY`, `S9b`, `U-FADE`, `VS1`, `VS2`, `VS8`) | W2 at the steps `afterField`, `decline`, `afterGrowth` in (order, id) order | §4.12's `StrategyRegistry` |
| W4 | `Trajectory` and the `advance` request (V06 §2.3, V06 §3.3.2, V06 §4.1) | T1 `intend`'s time card (the app), the clerk's `advance` tool (§11.2), the CLI | `epoch` events appended one at a time in one `group`, each with its `EpochInputs`, at the cadence W91's estimate admits | §11.2's facade, §14's T1 row (file f item 458); §7.7's circumstance timeline |
| W5 | `HazardRow`, the calamity table `tables/evolution.json#calamities` and the typed reading of `EpochInputs.events` (V06 §2.4, V06 §3.11) | timeline entries and `advance` (standalone); the dossier's calamity records the port carries (V08 §3.6), mapped by the calamity table (DR28); the spontaneous hazard draw (V06 §3.11.1, standalone only); the replay's mapped history events (W85) | the hazard phase's `burn`, `inundate`, `topple` ops and the F5 targets struck in place; `raiseGrade` (W49); a calamity's `deaths` into the catacomb need (W48); the chronicle W19 | §4.11 `EpochInputs.events` (file f item 573); rung 3's destructive circumstance event; §7.7 F5 |
| W6 | `BuildingShadeMask` (V06 §2.6, V06 §3.4) | the field phase at each epoch, from the buildings standing when it runs (after this epoch's hazards), per wing, on the ground arena and on every island arena | §4.5's daylight driver (item 102) as its building casters — the field, the due marks, S10b's sunlit preference, the character step; V09's shade map view; V10's "why is this quarter poor" | item 102 (b), (e); §2.9's `fields` chunk (file f item 275) |
| W7 | the departure matching (V06 §3.5.1) | the roster's suffix (S2's delta demand), the exposure field `E(x)` | `relet` down and `vacate` ops, household relocations | §4.11 step (c) (file f item 479) |
| W8 | the per-layer candidate sets of the strike pool (V06 §3.5.2), with the `raised`, `retaining`, `deck` and `landfall` kinds (V06 §3.19.2, V06 §3.19.4, V06 §3.19.5) | lifecycle states, finished `decay` Works, salvage demand, vacancy spans, a raised way's disuse, a terrace's abandonment, a deck's dead crossing, a `fallen_island` decoration's members (V05 §3.16); the epoch product's rows (`ProductEpochRows`) | the base's pool → `DeclineOp` (with file f item 291's raised, retaining and deck members), `plotToGarden`, `amalgamate`, `downgradeWay` (or the product's `retireWay` and `effaceWay`), wall ops; the landfall clearance's `setAttr` pairs, `repairRetaining`, the decoration's tombstone and the quarry face's `retypeLand` | §4.11 *The strike pool* |
| W9 | `Enceinte.pathway` (V06 §2.7, V06 §3.7) | the growth phase's wall decision (a superseded ring), the fortification phase (neglected), `contractWall` (contracted), a hand `setAttr` | the fortification phase (`gateToJunction`, `dismantle`, `wallToWay`, `absorbWall`); §8.2's wall rows; exports; the clerk | §2.7 `Enceinte` (file f item 254) |
| W10 | the ops `absorbWall`, `downgradeWay`, `upgradeWay`, `burn`, `repairWall` (with a stretch, or with none to lift a neglect), `retypeLand`, `repairRaised`, `repairRetaining` (V06 §2.8) | the fortification, decline, siting, hazard, hinterland, terrain-and-water and `raisedWays` steps; the `dossier` step's product placement and V07's siting step (m) (`retypeLand` of the village's fair field, V07 §3.12 (a)); the re-levelling ops and the landfall clearance (`repairRetaining`); the pathway's clearing (the no-stretch `repairWall`, V06 §3.7.5); a hand `convert` (T3's "repair" and "back in use", V06 §4.2) | the base's convert operators; lifecycle events; undo records; the renderer's rows; exports | §4.11 `ConversionOp` (file f item 209) |
| W11 | `Way.formerClass` (§2.4; V06 §2.8) | `downgradeWay`; V05's `fallIsland` convert (a covered way dropped to `track`, V05 §3.16 (4)) | `upgradeWay` in regrowth tier (5′); the landfall clearance (V06 §3.5.2); the renderer (drawn by its current class); GeoJSON `plat:formerClass` | §2.4 way record (file f item 209) |
| W12 | `Use.strain` (V06 §2.9, V06 §3.9) | the use phase | the use phase's closing rule; the `use` `WhyProvider` (V06 §4.5) for V10's `why`; CSV and GeoJSON `plat:strain` | §2.7 `Use` (file f item 429) |
| W13 | `MutationPlan` (V06 §2.5, V06 §3.10) | the use phase (an opening or a relocation into another designation), a hand `mutate … spread: 'epochs'` — a dossier re-designation is a host change, decided at once (§4.7 S11 (6)) | the ladder phase's mutation step → `mutate` events and their Works; the description line; exports; the clerk | §4.11 *The epoch-spread mutation*; §2.8 registry (file f items 264, 266) |
| W14 | the growth decision: quantum, crowding, regime (V06 §3.6) | the residual after regrowth-first siting; building capacities; the stage history | S5a–S5d for a new stage with its regime row; the crowding `relet`s | §4.11 step (g); §4.4 (file f items 293, 336) |
| W15 | the wall decision and the suburbs' absorption (V06 §3.7.1) | the threat slice (DR2), the extramural households, the prosperity mean, the era row | a walled stage (S5a trace, S7 furniture); W9 on the superseded ring; the character step re-typing absorbed districts | §4.4 S5a; §4.8 S7; §4.5 S12c |
| W16 | the contraction trigger and trace (V06 §3.7.4) | the intramural occupied share over years, threat | `contractWall` with its trace | §4.11 `contractWall` |
| W17 | terrain-and-water candidate evaluation; the oxbow (V06 §3.12) | the reach and basin records, harbour-use closure, sinuosity, S5d's shortfall | the base's `TerrainWaterOp` triggers; the oxbow inside `shiftCourse` | §4.11 trigger rows; §2.3 (file f item 206) |
| W18 | Works scheduling: start-week spreading, the one-target rule, part programmes (V06 §3.13) | every phase's physical change | the base's `Works` records; `stageAt`, `heightsAt` | §4.11 *Works*; retirement (file f item 321) |
| W19 | `EpochReport` and `ChronicleEntry` (V06 §2.10, V06 §3.15.1), with the `raised`, `retaining`, `decks`, `water` and `replay` sections | every phase; the replay runner (W84) | the app's history panel and timeline bar; the clerk (§11.2); `chronicle.csv`; description lines "ruined since …"; kept across a rebase (V06 §3.15.5); V09 §4.10's `epoch` row lines and V08 §4.6 item 3 (`raised.suppressedFired`, V06 §3.19.3 (2)) | §5.4 (file f item 339) |
| W20 | `HistoryIndex` (V06 §2.11) | the log (epoch weeks, dated events; the creation prefix's replay epochs) | the timeline bar; `HistoryFrame` requests; `forkAt` | §2.9, §7.4 |
| W21 | `HistoryFrame` cache (V06 §2.11, V06 §3.15.2) | the frame builder: the history store's images and keyframes, else replay from the nearest checkpoint (§7.4's replay mode) | the renderer at a scrubbed week outside the retain window; the APNG export W24; then-and-now W22 | §2.9 `week` view key; §8.1 |
| W22 | `HistoryDiff`, then-and-now (V06 §3.15.3) | lifecycle events between two weeks | the `live.history` layer (§8.2's roles); the clerk | §2.8 lifecycle block |
| W23 | `forkAt(seq)` (V06 §4.4) | the history panel, the clerk, the CLI | a new document (recipe + log prefix) | §11.2 facade; §2.9 |
| W24 | the animated history export (APNG) (V06 §5.3) | W21 frames at a stride | a file | §11.1 PNG export (file f item 409) |
| W25 | `EvolutionTable` (`tables/evolution.json`) (V06 §2.2) | shipped defaults; `editTable` | every phase | §7.6 tables with provenance |
| W26 | the `evolution.*` parameters (V06 §2.2) | the advanced panel; T1's time card | the runner (strategy, cadence, hazard mode) | §2.9 `Recipe.params`; §7.8 control registry |
| W27 | `EpochInputs.wealthLevel` and the timeline entry's (V06 §2.3, V06 §3.3) | the port — V08 §3.5's diff row `wealth` (`label` → `attr`, response `epoch`) through `tables/dossier/wealth` (DR6; receipt F9) — or the timeline and trajectory | the field phase's layer-1 expansion (`field.characterOffset`) | §4.11 `EpochInputs`, §7.7 (file f item 343) |
| W28 | the engine's stage ids for its phases (V06 §3.16) | the stage registry (append-only) | every `epoch.transform` stream the engine's phases open | §6.1 stream key's stage id (file f item 342) |
| W29 | the derived member succession and lifespan (V06 §3.14) | `derivePerson`'s appended lifespan draw; the epoch weeks | the gazetteer and family tree (§10.3, the app); people exports; the clerk | §10.3 (file f item 443) |
| W30 | the naming feature `formerWall` and the chronicle templates (V06 §5.2) | `wallToWay`, `absorbWall` | S13a's grammar guard (rows V11's); the chronicle's lines | §9.6, §10.4 (file f item 409) |
| W31 | `LifecycleEvent.detail.why` on the use phase's `open`, `relocate` and `close` events and on a raised way's creation event, and the report's `UseMove` rows derived from them (V06 §2.10, V06 §3.9.7) | the use phase, from the solver's scored contributions (link rows included, item 105 (j)); the `raisedWays` step, from the reason's values (V06 §3.19 (8)) | the `use` `WhyProvider` → V10's "why is this here"; V09's siting explanation panel; the chronicle's use lines; `uses-history.csv` | §2.8's lifecycle block (file f item 265); §11.2 `why` |
| W32 | `HistoryStore` — images and keyframes (V06 §2.11, V06 §3.15.2) | every commit's touched set (before and after); the verification replay | the frame builder W21; then-and-now W22 | §7.4's undo records and checkpoints |
| W33 | `rerunFrom(seq)` (V06 §4.4) | the history panel, the clerk, the CLI | a fork whose later epochs are re-appended from their stored `EpochInputs` and recomputed on the changed state | §11.2 facade (file f item 458) |
| W34 | custom chains over epochs (item 104 (e), (h) (3), (h) (7); V06 §3.9.8) | the dossier's custom records and chain activation carried by an epoch (V08); the chain's placed nodes | the use phase's re-score (chain links on, off), the revision re-site, the character step's quarter emergence (never an assignment), the chronicle | §4.11 step (e); item 104's `SupplyEdge`s; item 72's threshold |
| W35 | the hinterland over epochs — fallow ladder and re-take (item 26; V06 §3.5.3) | the S2 demand's farm households and food need at the epoch; `LandUse` faces and their owners | `retypeLand` ops; S12a's new fields on new ground; the renderer's land-use rows | §4.9's hinterland unit |
| W36 | the base phases (`prelude`'s base part, `demand`, `field`'s base part, `dossier`, `siting`'s base tiers, `growth`'s base path, `lapse`, `character`, `works`'s base part), built once in `@plat/edit` (V06 §3.1) | the base's §4.11 steps | `'grow-by-stage'` (all of them) and `'history'` (reused where V06 §3.2 marks "base") | §4.11 *The epoch's order* (file f item 317) |
| W37 | `ProductDecl.phases` and `.participants` (V06 §2.1, V06 §3.1) | a product's registration (V07's village product) | the runner at an epoch whose product, by V07 §2.1's fold (the hand-off band), is that product — its phases and epoch rows (`rows`, read by the decline and hinterland steps, V06 §3.5.2, V06 §3.5.3); its participants run at every epoch and gate themselves by V06 §3.2's scopes | §1.1's product router; V07 §2.1 (file f items 202, 317) |
| W38 | the feature re-resolution (V06 §3.2 row 1) | the epoch's rung (the fold's, V06 §3.1 (3)); the creation's `blueprint.features` draw | `Features.sewers`; `under.extend`'s first-epoch U-NET; the catacomb count's rung (V06 §3.18.2); the report and the chronicle | II.7.1 (file f item 550) |
| W39 | `HouseholdLedger` (`EpochContext.households`), `EpochOps.displaced`, `EpochOps.demandTaken`, `Household.transit` (§2.7) (V06 §2.1, V06 §3.8.1) | hazards, contraction strips, Works, `sky.islands` (V05 §3.15), `under.fade`'s sealing of a lived void, clearances (a raised way's land, V06 §3.19 (7); a struck deck's buildings, V06 §3.19.5) | `siting` (the pool first, the delta less the taken); the report's household counts; T-V6-52 | §2.7 `Household`, §5.3 (file f item 335) |
| W40 | the underground crowding hook before the growth decision (V06 §3.6 (1)) | the residual's poorest-band households; U-FRONT's free capacity on lived and reopened runs and accessible void clusters (V04 §3.4, V04 §3.10) | S7b (6)'s underground allocation and U-FRONT's placement; `R` less the seated | §4.11's regrowth order (6); II.7.3 (c); §4.5 S7b (6) (file f item 574) |
| W41 | the overflow backlog (V06 §3.6 (1)) | the households the overflow ladder housed in earlier epochs (their tenure and lifecycle causes `rule:overflow`) | the growth decision's quantum; the stage's relocations out of tents and informal plots | §4.11 (file f item 336) |
| W42 | link re-binding, the epoch's opening order, the relaxation pass, split and merge over epochs (V06 §3.9.10) | every committed `openUse`, `closeUse`, `relocateUse`; `siting.web` (V11); the class orientation rows | S10b's scores; `UseMove.why` link rows; split-threshold crossings → `openUse` (cause `split`) and `closeUse` (cause `merge`); the report | item 105 (a)–(h) |
| W43 | nearest-provider catchments for strain (V06 §3.9.2) | one labelled multi-source Dijkstra per class | `Use.strain`; the surplus order; the report | §12.6's cost unit; item 107 (c) |
| W44 | record-owned counts and the ladder steps over epochs (V06 §3.9.1, V06 §3.9.11) | S2's per-capita rows; the dossier's collective records and their receipts (`promotedFrom`, `demotedFrom`); `dossier.ladders` (V11 §3.12) | `assign` re-binds, openings, closings, SIZE mutations, REPLACEMENT converts — or, where V08 §3.5.1 (d) places the greater new, its member placed as an added record is (S10b's `dossier` request; at a village rung the product's `records` placement first, V07 §3.12 *Records at a village epoch* item 4) — the circuit trigger (W45), the seat crypt (W51) | §7.7 DR9, T9; item 108 |
| W45 | barrier closure, water access, the waterfront at each epoch, the harbour-mouth chain, shoreline re-evaluation, the dossier gate (V06 §3.7.6) | the `EnceinteStrategy` trace under item 106's closure; `walls.barriers`, `walls.waterfront` (V11 §3.16); DR2's walls records and sea threats; `reclaim` and `shiftCourse` | circuits, contractions, `drawWall` on the waterfront, `neglect`, the chain as S7 furniture; the report and the chronicle | item 106; §4.4 S5a; DR2 |
| W46 | `under.access` — dig draws, overlap, mine breaches, openings over the epoch's scope (V06 §3.18.1) | the epoch's built set; every element created or extended this epoch; the village mining workings opened this epoch (`EpochScope.workings`, V07 §3.16 (4)); the surface faces the epoch changed (`EpochScope.surfaceChanged`, the landfall members' faces included); `DigRule`, `UnderOpeningRow`, `LinkRule` (V04) | `AccessPoint`s and links with `AccessCause { rule, system, event }`; V04's excavation reading; `under.undercity`; the chronicle (`accessOpened`) | V04 §3.5.7 (U-ACCESS) |
| W47 | excavation by demand (V06 §3.18.1 (5)) | the crowding hook's unseated demand and the undercity's size law against accessible void capacity; `excavate.*` rows | a U-DIG passage (link cause `dig`); the chronicle (`excavated`) | V04 §3.8 (U-DIG) |
| W48 | catacomb growth, count, ratchet, primary and stagnation over epochs (V06 §3.18.2) | the epochs' targets and weeks; the cemeteries' served burials (V04's share rule); the rung and the church count (dossier: church records); a plague condition's burials and the span's calamity deaths (`CalamityRef.deaths`, V08); `CatacombRule` (V04's fields, V11 §3.23.8's values; `growthCapShare` read per year over the span); a village rung's maintenance mode (`blockedBy` `'rung'`) | `CatacombGrowth.grow` with the epoch's cap and primary; `CatacombComplex` (V04 §2.2); the report (`catacombStagnant`, `catacombsAboveCount`); the chronicle; V12's `catacomb.extentM2` | II.7.6; V04 §3.5.1 |
| W49 | `raiseGrade` after a great fire or flood (V06 §3.11.6) | a `burn` or `inundate` above the `raise.*` rows | II.7.6's `raiseGrade` conversion (the `buried` system); the chronicle (`terrain`) | II.7.6 |
| W50 | passages sealed and reopened over epochs (V06 §3.5.2, V06 §3.8.2) | rear plots vacant for `plots.mergeAfterYears`; regrowth tiers (1)–(3) taking them back | `sealPassage`, `openPassage` | §4.11 *Hidden plots over epochs* |
| W51 | crypts over epochs: the seat's crypt in the batch that makes the seat, the rank moving with the see inside the causing event, the no-vault-lost trim, the see-move filter, the crypt join (V06 §3.18.3) | `MutationPlan`s, dossier re-designations and REPLACEMENT steps toward an always-crypt class; the church-family uses; catacomb growth beneath a crypt | V02's crypt ladder (a `mutate` of the basement ring); V03's `Basement.crypt` and its `undercroft` bays by the rank's cap; V04's crypt access (source `crypt`, V04 §3.5.7 (c)); V06 §3.18.1's transitive access; the chronicle (`cryptDug`, `cryptCapped`, `cryptJoined`); V09's underground view; V10's why | V02 §3.14.5 (file f item 226); V03's crypt role |
| W52 | the effective week of a Works-less change (V06 §3.15.2) | an engine op's epoch week; a dated dossier change's week | the frame builder, the scrubber, every export at a drawn week | §4.11 *Works* (9) |
| W53 | the `WhyProvider`s — `use`, `enceinte`, `district` (path `prosperity`), `mutationPlan` (V06 §4.5); what V10's raised-way provider reads over epochs | `LifecycleEvent.detail.why`, `Use.strain`, `Enceinte.pathway`, the circuit decision's recorded conditions, the masks of the history frames, `MutationPlan` | V10's `why`; V09's explanation panel | V10 §2.13 (file f item 270) |
| W54 | `decline.turnoverVacancy` (V06 §2.2, V06 §3.8.2) | the table row per band | regrowth tier (1)'s refill stop; T-V6-7 | §4.11's regrowth order |
| W55 | history across a rebase and an upgrade (V06 §3.15.5) | `Base.seq` (§2.9); the pinned output version and the upgrade's replay | the timeline's grey range, `locate`'s banner, the bends of `forkAt` and `rerunFrom` to the earliest seq (J-V6.98), the kept reports; the per-epoch `HistoryDiff` of an upgrade | §2.9, §7.4, §7.5 |
| W56 | the calamity table (V06 §2.4) | the dossier's calamity records (`calamityHistory[]` entries the port carries) | `EpochInputs.events` typed as hazard events with place and severity; the F5 exemption list | DR28 (file f items 383, 388) |
| W57 | the `raisedWays` step and its pass (V06 §3.2 row 10a, V06 §3.19) | the epoch's rung (the fold's, read at `prelude`), the state after `terrainWater`, the field (prosperity), the ground hydrology's eager need reading, W58's ledger, V11's `raisedWays` rows, the dossier's water-system record, landmarks and era and culture rows (the trace below); item 244's support step on each solved course — its stations, pier rings and `raised_too_tall` or `raised_too_long` drop (V06 §3.19 (5)) | repairs (W63), then the hand operator's creation events (cause `rule:raisedWay`) and the clearance ops before them; `EpochScope.raised` (W64); the report's `raised` section (its `suppressedFired` entries for V09 §4.10's `epoch` row lines and V08 §4.6 item 3) and the chronicle's `raisedWay` lines (W19); `under.extend`, `sky.clearance` and `hood.fabric` through the scope | item 110 (b); the base's course solver, item 244's support step and the hand operator (file f items 244, 290) |
| W58 | `RaisedWayLedger` (V06 §2.13) | the model (standing raised ways, their `reason` and lifecycle cause) and the log's live removals (W60) | the pass's admission (W57); generation's S4 and S6 and a new stage's S5b (file f item 290); V10's "why is there no viaduct here"; the report's `aboveCap`, `suppressedHeld` and `suppressedFired` — the last read by V09 §4.10's `epoch` row lines and V08 §4.6 item 3 (V06 §3.19.3 (2)) | file f item 290 |
| W59 | `RaisedReasonKey` and its one uniform (V06 §2.13, V06 §3.16) | the candidate's kind and the lineages it names; `raised.reason` (§6.1), epoch component 0 | the gate `u < p` (a suppressed key's too, for `suppressedFired`); the raised way's lineage (its derivation unit); the suppression's key (W60); `rerunFrom`'s re-apply (V06 §4.4); the base raised-way record's `reason` | §6.1, §6.3 (file f item 290) |
| W60 | `LifecycleEvent.detail.suppress` — a removal of a generated raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06 §2.13, V06 §3.19.3) | a `delete` of such an entity from V09 §4.3's delete, the clerk or the CLI | W58's suppressed set, so every generator skips the key and counts it as filled; the retaining-wall re-derivation where an epoch levels (V06 §3.19.4 (1)) and tier (5)'s deck faces (V06 §3.19.5 (1)) skip theirs; the serving test of the user's re-adds — V09 §4.20.3 (4)'s Build it again and V10's Put it back (V06 §3.19.3 (3), (7)); `rerunFrom`'s re-apply; the dry run's line (V09's `info.remove.holds`); V10's "removed by you" | §2.8's lifecycle block (file f item 260) |
| W61 | the three candidate readings — viaduct, elevated road, aqueduct (V06 §3.19 (2)) | standing way chains of V11's `viaduct.routeClasses` (V11 §3.24.2) and the ravine and valley features they cross; high wards, terraces and the citadel's and great temples' reservations; the ground's springs (their `spring.flow`, V06 §3.12.1) and rivers within `sourceReachKm` and the need ratio | W57's gate, order and course solves; the why rows (W31) | item 110 (b) |
| W62 | the pool's `raised`, `retaining` and `deck` candidates and file f item 291's `DeclineOp` members (V06 §3.19.2, V06 §3.19.4, V06 §3.19.5) | a raised way's disuse (W67), a terrace's abandonment, a deck's dead crossing; the salvage demand; hazards (topple, inundate, burn) | `neglect`, `breach` and `dismantle` on spans, supports and retaining stretches; `breach` and `ruin` on decks; V04's vault collapse in the same batch; the deck plots' ruin; the chronicle (`raisedWay`, `retainingSlump`, `deck`); `EpochScope.raised` | §4.11 decline table and `DeclineOp` (file f item 291) |
| W63 | `repairRaised` (V06 §2.8, V06 §3.19.2 (5), V06 §3.19.5 (4)) | the pass's regrowth-first rule: a raised way with a ruined span (or abandoned) or a struck deck whose reason or crossing is live again | the span or deck back in use; V04's vaults re-laid through `under.extend`; the deck faces re-offered at tier (5); the report (`raised.repaired`, `decks.repaired`) | `ConversionOp` (file f item 209) |
| W64 | `EpochScope` (V06 §2.1) — **the one reader list of every field** | derived from the epoch event's lifecycle entries: every op that builds, extends or opens what the fields name; every op that creates, repairs, breaches or removes a raised part; every op that levels or re-levels a plot or block (with its retaining walls) | `built`: `Foundations.apply`'s new footprints (V04 §3.5.0 *At an epoch*), `AccessPassStrategy.run`'s dig draws (V04's (d)), `QuarryWorkings.extend`'s stone volume (V04 §3.5.3), `sky.clearance` (V05 §3.15 (7)); `basementGrown`: `Foundations.apply`'s basement rings, `AccessPassStrategy.run` (d); `elements`: `AccessPassStrategy.run` (a)–(c), (e), (f), `QuarryWorkings.extend`'s worked-out test; `workings`: `AccessPassStrategy.run`'s village-working test (V06 §3.18.1 (2c)); `recut`: `hood.fabric`'s S9b (V01 §3.3.6 (2)); `surfaceChanged`: `AccessPassStrategy.run` (e) (V06 §3.5.2); `raised`: `Foundations.apply`'s raised-way piers, `ArchVaults.reconcile`, `sky.clearance`, `hood.fabric`'s crossed districts; `levelled`: `Foundations.apply`'s retaining-wall footings, `SewerStrategy.extend`'s invert drops, `sky.clearance`. Volume 3 reads no field: the levelling op re-cuts a stored plan beside the levelled faces inside the epoch event and an unstored plan there goes stale (V03's outside-ground row; file f item 263; T-V3-30) | §4.11's epoch fold |
| W65 | the arch-vault reconcile (`ArchVaults.reconcile`) and the invert drops (`SewerStrategy.extend`'s wall drops) in `under.extend` (V06 §3.2) | `scope.raised`, the spans' `open` / `vault` use; `scope.levelled`'s wall crossings | V04's arch-vault chambers laid, collapsed or deleted; U-NET's drop junctions; `scope.elements` | V04 §3.5.4 (its arch-vault source) |
| W66 | the `sky.clearance` participant at `afterGrowth` order 50 (V06 §3.2) | every island and every caster the epoch committed (raised parts, retaining walls' high sides, massing tiers, levelled fill) | V05's clearance rule: an island raised only where its floor fails, a listed fate | V05 §3.15 (7) |
| W67 | the raised way's `underuseSince` and the runs-dry rule (V06 §3.19.2 (2)) | the pass: a way downgraded or unused at both ends; an aqueduct's need ratio below 1 or its source lost by `siltReach` / `shiftCourse` (V06 §3.12) or a spring whose `flow` fell below `spring.aqueductMinFlow` (V06 §3.12.1) | the pass's `neglect` when disuse has run (the pool's candidates from then on); the aqueduct's terminal supply off; the need reading of the next epoch | the base raised-way record (file f item 244) |
| W68 | raised ways on every wall trace (V06 §3.7.6 (5)) | the standing raised ways' supports and spans | the trace's cost field and strip rule; a wall opening (aqueduct) or a raised gate (viaduct, elevated road) as S7 furniture; `absorbWall` and `wallToWay` leaving the raised way standing | §4.4 S5a, §4.8 S7 |
| W69 | deck faces over epochs — offered, bound by the budget, struck, re-offered (V06 §3.8.2, V06 §3.19.5) | the base's deck faces (mole, pier, quay platform, bridge deck); V11's `deck` budget and V11 §3.24.4's per-use `deckOk` (the use's effective crypt first — its class, a bound dossier crypt record or a `cryptAlways` keyword — then its class's column) (V02 §3.16) | tier (4) and (5) placements; the use phase's candidate filters; the ladder's rung limits on a deck plot; the struck deck's ruins | item 110 (d); §4.7 S10 (file f item 246) |
| W70 | retaining walls over epochs (V06 §3.19.4) | the levelling ops of the epoch (a new stage's S10–S11, a re-levelling rung-3 re-cut or rebuild, `raiseGrade`) | the walls made, re-derived or restored there, a suppressed wall skipped; `amalgamate`'s filter; the re-cut's fixed lines; the walls inside a `raiseGrade` region tombstoned, read by V04's buried-system builder as steps in the buried floor; `scope.levelled` | item 110 (a); §4.7 S10–S11 (file f item 245) |
| W71 | hazards on decks and terraces (V06 §3.11.2 (2), V06 §3.11.3, V06 §3.11.4) | the deck's carriageway and faces; each building's datum `baseCm` (V02's `deriveBase`, file f item 370); supports' heights and materials | fire spreading along a bridge row; the flood's depth at the datum; a toppled support breaking its spans; a timber deck or support broken by a flood | §4.11 *Works* (4); V02 |
| W72 | the raised way's `detail.why` rows and the ledger reading for V10's raised-way provider (V06 §4.5) | W57's creation events; W58; the lifecycle (carried down, removed by hand) | V10's "why is this aqueduct here", "why is there no viaduct here" and "carried from year N"; V09's explanation panel | V10 §3.9 (file f item 265) |
| W73 | underground households at an epoch (V06 §3.18.1 (4), (6)) | F6's new void dwellings after `under.access`; the district's poorest-band ground households (`E(x)` order) up to V04's `voidDwellings.share`; the households `under.undercity`'s re-read, a foundation collapse or a void made `lost` after `siting` (item 113 (e)) vacates | `relocate` events into the void dwellings (the `use` cap); the in-participant re-homing on ground stock by §4.7's overflow pass; the report's `households.undergroundVacated`; T-V6-52 | V04 §3.4 F6, V04 §3.10; §4.7 |
| W74 | `EpochScope.recut` and `EpochScope.workings` (V06 §2.1) | derived from the epoch event's lifecycle entries: the blocks a rung-3 op re-cut or redeveloped; the mining and quarry uses whose workings an op opened | `hood.fabric`'s S9b (V01 §3.3.6 (2)); `under.access`'s mine breaches (V06 §3.18.1 (2c)) | §4.11's epoch fold |
| W75 | `ProductDeclEpoch.rows` and `ProductEpochRows` (V06 §2.1), and `ProductDeclEpoch.records` with its `EpochPlacement` | a product's registration (V07 §2.2's `epoch.rows` cell; V07's `village.records`, V07 §2.1) | the `dossier` step's call of the product's placement for each record it adds, before the base's placement, and of its `remove` for each record it removes, after the base's removal — on an absorb without an epoch the base's *One path* placement and §7.7 item 2's removal making the same calls — keyed by the dossier event's `seq` (V06 §3.2 row 12, V06 §3.16's *Keys*; V07 §3.12 *Records at a village epoch*); the decline step's per-class persistence multipliers and street ops — the retirement with its stricter test and the effacement (V06 §3.5.2); regrowth's reopening — tier (5′) and the placement rule over every placement an epoch makes (V06 §3.8.2); the hinterland step's slack, order and cap (V06 §3.5.3) | §1.1's `ProductDecl` (file f items 202, 317) |
| W76 | the `landfall` candidate kind and its clearance (V06 §3.5.2) | a `fallen_island` decoration's members (V05 §3.16 (5); `DecorationMember`, file f item 252 — an `Id` for a way, plot, reservation, land use or retaining wall, `{ raised, span: [a, b] }` for a raised span and `{ raised, support }` for a support, on item 244's support keys): covered ways, plots, reservations, land uses, raised spans and supports, retaining walls; `Way.formerClass` the landfall wrote; the salvage ledger's demand and the landfall's credit; `land.scrubAfterYears`; the ops that end a member's cover (`retypeLand`, `repairRetaining`, `repairRaised`, `dismantle`, any tombstoning op); the accesses V04 §3.10 bricked under the members | `setAttr` pairs restoring a way's class and surface (cause `rule:landfall`); `repairRetaining` on a covered wall; plots released to regrowth tier (3); each member's leaving (`setAttr` of `members`) in the batch of the op that ends its cover; the decoration's tombstone with its last member; the quarry face to `commons`; each bricked access back to `open` (`locked` when secret) with its host, and the host's face in `EpochScope.surfaceChanged` → `under.access`'s excavation reading and openings; the report's `landfall` counts; the chronicle `landfallCleared` | §4.11 *The strike pool*, *Salvage*; V05 §3.16 |
| W77 | `repairRetaining` and the restoration rule (V06 §2.8, V06 §3.19.4 (6)) | the re-levelling ops of an epoch (tier (3) builds, a house-platform rebuild, a rung-3 re-cut), the landfall clearance, a hand `convert` | a decayed stretch back to standing; a ruined stretch replaced by a new stretch on its line; the report's `retaining.restored`; the renderer's standing row; GeoJSON `state` absent | `ConversionOp` (file f item 209); item 245's profile |
| W78 | a deck's condition — its host's lifecycle existence (V06 §2.12) | the pool's deck strike (`ruin`), a hazard (`breach`, `ruin`), V05's landfall, `repairRaised`'s deck form | V01's close-ups, V02's deck buildings, V05, the renderer's deck state rows, tier (5)'s deck faces, the exports | item 246's `Plot.deck.host` (file f item 291) |
| W79 | an enceinte's condition by run (`Enceinte.condition`, a stretch-state profile, §2.2 rule 5; V06 §2.12, V06 §3.7.2–V06 §3.7.5) | `breach` (V06 §3.7.3's neglect, a contracted ring's decay), `dismantle` (V06 §3.7.2 (2)), V05's landfall (V05 §3.16 (4)), `repairWall` (V06 §3.7.5, a hand `convert`) | V06 §3.7.5's repair of a pathway ring and of a ring in use (the `breached` runs, in chain order); the pathway's clearing and, in its batch, `repairWall`'s no-stretch form lifting the neglect (existence in use when every run is `standing`, else `decayed`); V06 §3.7.2 (3)'s dismantling on a cleared record, a stretch under a raised gate whose deck stands excepted (V06 §3.7.6 (5)); the towers and gates drawn by their runs; T-V6-6's wall struck share; §8.2's gap glyph and trace discs; §11.1's per-run LineStrings; the `enceinte` provider (V06 §4.5); the report's `walls.repairedInUse` | file f item 575 (§2.7 `Enceinte`) |
| W80 | the bench bars' registrations — one V12 `BenchBarDef` per bar V06 §8's register lines name as `bar.T-V6-<n>` (T-V6-6 – T-V6-10, -13, -16, -18, -28, -31, -32, -40, -43, -54, -62, -72, and the epoch forms of T-V6-34 and T-V6-37) | the seats landing E2, E3, E4, E5 and E8, each registering, in the same change, the bars its exit's lines name (V06 §8's registration table) | `plat parity`'s `bar.` rows (V12 §1b); V12's register lint (T-V12-20), each `bar.T-V6-<n>` entry resolving to its registration; E7's bench verdicts and `fallback` runs (V12 §3.7.1 (b)) | V12 §2.1 (`@plat/testkit/bars`); §13.2's statistics bench |
| W81 | the `field` phase's way-surface re-lay (V06 §3.2 row 4, V06 §3.4 (9)) | S6's re-banding at the epoch (the plots whose `fieldBand` changed, §4.11 (a)); volume 1's `way.surface` rows (V11 row 90, whose `S6` epoch reader this is), the era row, the field as S6 reads it; each way's edit mark on `surface` | `setAttr` ops on `Way.surface` (author `epoch`, §7.1's `EditBase.author`; cause `rule:field`) in the phase's batch; S14's road programs (V01 §5.1.2) through the epoch's `DisplayDelta`; exports and the reader; the report's `shade.surfacesRelaid` and `.surfacesHeld` (read by the app's history panel and the clerk); the epoch's undo record | §4.11 step (a) with §4.5's hysteresis; V01 §3.7.3's epoch clause; file f item 207 (a) |
| W82 | springs and oases over epochs — a spring's failure, recovery and loss (V06 §3.12.1) | `WaterBody.spring.flow` (§2.3); the `terrainWater` phase's spring reading (V06's `spring.*` rows, the climate row's aridity, a `siltReach` or `shiftCourse` that moves the course off the spring); a dossier's removal of `oasis_water` (DR40) or a `drought` calamity (DR28's `spring` row); a hand `setAttr` of `spring.flow` (T2 `ground`) | `setAttr` of `spring.flow` (cause `rule:spring`); the base's water pull and prosperity water term weighted by `flow` (§4.2 S3 (6), §4.5) — so the field's next evaluation and the next stage's boundary; the grove's and gardens' `retypeLand` (V06 §3.12.1 (4)); the aqueduct's runs-dry rule (W67); the report's `water` section; the chronicle `spring` | §2.3 `WaterBody.spring` (item 111); §4.5's water term |
| W83 | `ReplayPlan` (V06 §2.14, V06 §3.20.1) | DR36's peak (`HistoryHint.peak`, V08) or the blueprint's history option (§4.2 S0); DR37's inputs — `history.ageYears`, the history's events, `tierHistory`, `populationHistory`, `calamityHistory` (V08); DR38's destruction evidence; V11's `history.*` cells | the replay runner (W84); the generation report's `replay` section; T-V6-71 | §4.11 *History-first generation* (1)–(2); §7.7 DR36–DR38 |
| W84 | the replay runner at generation (V06 §3.20.3) | W83; the creation's model after S0–S13a at the plan's start population | the creation prefix's `epoch` events (flag `creation`, §7.4), each with `EpochInputs.replay`, folded by the ordinary runner W1; `HistoryRecord` (W87); the report's `epochs` list (§5.4) | §4.11 (2); §7.4 *Replay semantics* |
| W85 | the event-to-epoch mapping (V06 §3.20.2) | the history's events (type, years ago, severity); V11's `HistoryEventRow`s (V06 §2.14's shape); the calamity table (W56) for `calamityHistory` | each replay epoch's `EpochInputs.events` (hazard kinds), its population factor, its slice change, its use openings, and the refounding path (W86); the `HistoryRecord.epochs[].events`; the chronicle `replay` lines | §7.7 DR37 |
| W86 | destruction and refounding at generation (V06 §3.20.5) | DR38's evidence (terminal death and resettlement, a catastrophic event, an ancient "Fall of" on the site); the history's culture rows | the old geometry to ruins in one refounding epoch (`ruin` on every building, a way to its trace); the new settlement's stages at the refounded population with §4.4's `existingFabricCost` at V11's `history.reuseCost`; `reuse … build` first; the salvage ledger's credit; `HistoryRecord.refounded`; the burial (W87's `buried`, II.7.6 through V04) | §4.11 (4)–(5); II.7.6 |
| W87 | the `HistoryRecord` writer (V06 §3.20.6) | W84's epochs, W85's events, W83's peak, W86's refoundings, II.7.6's buried systems | `HistoryRecord` (§2.7): read by V10's story ("the walls were built when this was a city of twelve thousand"; "its exact size is not recorded"), the reader, the exports (§11.1's history block), §7.7's history rows; `Provenance.symbolic` on the facts a symbolic peak sized | §2.7 `HistoryRecord`, §2.8 `Provenance.symbolic` (item 113) |
| W88 | the replay's budget and lazy detail (V06 §3.20.4, V06 §6.7) | V11's `history.epochYears`; the rung; W91's estimate against `replay.budgetMs`; §4.1's laziness contract | the phases a coarse epoch runs or defers; the coarsening rung (fewer, longer epochs) when the estimate exceeds the budget; `ReplayPlan.epochYears` and `.coarsened`, the report's `replay.epochYears` and `.coarsened` (V06 §2.10); T-V6-71's budget clause | §4.1 (laziness); §12 (item 119's comfort level); §12.6 |
| W89 | an enceinte's condition by need and means (V06 §3.7.7; item 114) | NEED from the epochs' slices (DR2's threat, readiness folded in by V08); MEANS from the wealth level in force (the log); each run's bounding districts' prosperity (the local weight); V11's `walls.condition` cells and `walls.patchMaterials` rows | `wearWall`, `breach` and `repairWall { material }` ops on the runs, each writing the run's material and last-change epoch (§2.7); the report's `walls.worn`, `.patched`, `.rebuilt`; the chronicle `wallWorn`, `wallPatched`, `wallRebuilt`; the `enceinte` provider → V10's run story; §8.2's state rows and §11's exports through the record | §2.7 `Enceinte.condition` (item 114); §4.11's decline table |
| W90 | the grandeur ceiling read at the epoch's rung (V06 §3.8.5; item 115 (e)) | the fold's rung (V06 §3.1 (3)); the ceiling table (V11) as §4.7 S10b, §10.2 and V02's composition rows read it; V08's "specified" | every design an epoch derives — S10b's class mix and S11 for the siting tiers, a new stage, tier (3)'s rebuilds, rung 3, the use phase's openings, `MutationPlan` steps (a re-plan when a stored record exceeds it) | §4.7 S10b, §10.2 (item 115) |
| W91 | the comfort estimate and the cadence it chooses — `advance`, the history replay and a dossier catch-up each inside the ten-second comfort level in total, a catch-up whose dossier events alone pass its budget completing past it, reported (item 119 (a2); V06 §3.3.2, V06 §3.20.4, V06 §6.8) | an `advance` request's epochs (V06 §3.3.2's expansion), the replay plan's (V06 §3.20.1) or a dossier catch-up's crossed year ends (V08's catch-up rule; §4.11 *The clock* (4)); the rung of each epoch's target; the islands that may stand (from the first CITY or METROPOLIS epoch, with the recipe's island setting) and the islands and hand-placed accesses standing at an `advance`'s request; the rises in the targets; a catch-up's dossier events at V08 §6's per-event absorb bound by the document's rung, and inside an open from SettlementForge the open's own path (V08 §6's cached frame boot; §12.5's T(B)); `epoch.costMs`, `epoch.islandMs`, `epoch.handAccessMs`, `epoch.stageMs`, `epoch.stageMsPerBuilding`, `advance.budgetMs`, `replay.budgetMs` (V06 §2.2) | the cadence an `advance` group folds at (its epochs' weeks, W4), the replay's epoch length (W83) and the coarse step of a catch-up the port folds (V06 §6.8 (6); V08's catch-up rule, V09's `progress.dossier` row); the card's and the clerk's bend line naming the cadence chosen; the report's `advance` section and `replay.epochYears` (V06 §2.10), read by the history panel and the clerk; V09's progress view, counting the epochs at that cadence; a catch-up's F-BUDGET-TIME report past the comfort level (§12.1); T-V6-23, T-V6-24, T-V6-71 | §12 (item 119's comfort level); §4.11 *The clock* |
| W92 | `frontierFor` — the growth frontier as a query (item 122 (a); V06 §3.22 (2)) | the model the view draws (the head, or a history frame, V06 §3.15.2); the roster's next ordinals (§10.2); the growth decision's rules and `growth.*` rows (V06 §3.6); S5a's boundary rule on `T` (§4.4); `overflow.tentBeltM` (V06 §2.2) | §10.2's refugee-camp placement, which ranks V01's `campLand` faces by their distance to the answer; T-V6-75 | §10.2 (the crisis look table's placement); §4.4 S5a |
| W93 | the crisis hand-over — the aftermath through the next epoch and `crisisLookYields` (item 122 (a); V06 §3.22 (1), (3)) | the dossier's calamities (DR28: `EpochInputs.events`), population (the epoch's target) and conditions (`ConditionOverlay`, its `sinceWeek`; the `reconstruction` archetype's Works share, V08's archetype row); a building's Works and their weeks (`Building.works`, §2.6; the lifecycle once a record retires, §4.11 *Works* (9)) | the `hazards`, `siting`, `growth` and `works` phases (the model's real aftermath); §8.2's disaster look row, V02's ruined exterior and V03's look damage (the yield); T-V6-75 | §2.7 `ConditionOverlay`; §7.7 DR28, DR44; §4.11 *Works* (10) |
| W94 | `decayLevel` and `decayPeak` — the decay level of a building lineage (item 123 (b); V06 §3.23) | the lineage's lifecycle events (§2.8) at the weeks their changes show — the start weeks of the Works they started (`Building.works`, §2.6; the lifecycle once a record retires, §4.11 *Works* (9)), else their effective weeks (V06 §2.11); each element's entry week into the plan (V03 §5.6's `since`); a restoring `repair` Works' progress (§4.11 *Works* (2)); `Building.material.walls` (§2.6); V11's decay rates by material and default age (item 123) | V03's damage layer — the plan, its drawing, its exports, the panel lines; V02's exterior; V04's cellars, crypts and underground buildings; §8.6's drawing and §11.1's battle maps; V09's and V10's lines; a ruined district's look, drawn at the higher of its `lookLevel` and this level (item 122 (d)); T-V6-76 | §2.6 step 7; §6.3's `plan.damage` thresholds |

**The dossier trace** — every dossier fact the engine reads, with its field and derivation row (§7.7's table; the engine
never writes one and never asks for one):

| dossier fact | SettlementForge field (via the port's digest, §14) | derivation row | where the engine reads it |
|---|---|---|---|
| the population at a week | `populationHistory[]` at its ticks, and the dossier's present population at the present week (§4.11 *The clock* (1); item 125 (b)) | DR7, DR23 | `EpochInputs.populationTarget` → S2's delta demand, the rung at the epoch, the lapse rule |
| the week | the dossier's own stamped ticks — each change's dating rung, the present week its latest tick (§4.11 *The clock* (1)–(2); item 125 (a), (b)); never the campaign's calendar | DR21 | `EpochInputs.week` → `years`, the Works' start weeks |
| the threat level | `site.threat` (and `walls.*` for the enclosure) | DR2 | `CircumstanceSlice.threat` → the wall decision, obsolete-wall keeping, contraction (V06 §3.7) |
| the prosperity word | `wealth.label` → `intent.wealthLevel` by `tables/dossier/wealth`, over epochs through V08 §3.5's diff row `wealth` (receipt F9) | DR6 | `EpochInputs.wealthLevel` → the field's character offset |
| trade partners, economy, powers | `economy.partners`, `economy.tradeLinks`, income rows, `powers[]` | DR3, DR4, DR11–DR13 | the slices the dials read past their hysteresis (§4.11) |
| calamities | `calamityHistory[]` (with its tick) and the institutions each calamity marked `ruined` | DR28, §7.7 F5 | `EpochInputs.events` typed by the calamity table → the `hazards` phase (V06 §3.11), the targets struck in place — a crisis's aftermath (V06 §3.22 (1)); its `deaths` into the cemeteries' burials (V06 §3.18.2 (3)) |
| active conditions (plague, famine, unrest …) | `activeConditions[]` with `triggeredAt.tick` | DR21 (conditions), §4.11 *Works* (10) | the `ConditionOverlay` (the `works` phase, V06 §3.13 (6), the `reconstruction` archetype's share among them); the `sinceWeek` of a condition drawing the `disaster` look — a calamity's linked condition (V08 §3.16 (7) (b), (d)) — for the look's hand-over (V06 §3.22 (3)); a plague condition's burials into the catacomb need (V06 §3.18.2 (3)) |
| the rung history | `tierHistory[]` | §7.7 F8, DR23 | the `prelude`: the rung at the epoch, the feature re-resolution, the product overrides (V06 §3.2) |
| institutions added, removed, re-designated, ruined | `institutions[]`, `institutionHistory[]` | DR9, DR10, DR24, DR25 | `EpochInputs.dossier` → step (e); the dossier-backed uses the use phase only relocates |
| the ladder data: collective records, their numeric ranges and unnumbered qualifiers, promotions and demotions | `institutions[].count`, the kind labels' qualifiers, `promotedFrom` / `demotedFrom` receipts; `dossier.ladders` (V11 §3.12) | DR9, DR24 (item 108) | the `uses` phase's record-owned counts (V06 §3.9.1); the `dossier` phase's ladder steps (V06 §3.9.11) |
| SettlementForge's own chains | `activeChains[]` (processors, outputs, `upstreamChains`, status) | DR33 | the `dossier` phase re-binds the chain's links; the status weakens them from the next `uses` phase (V06 §3.9.10 (5)) |
| the cathedral and the churches | the cathedral record (a singular anchor) and the religious-category records with their count ranges (item 108's members) | DR9, DR24, DR32 | the always-crypt seat and the see's moves (V06 §3.18.3); the church count behind the catacomb count (V06 §3.18.2 (1)) |
| the Cemetery network and burial grounds | the `Cemetery network` record (METROPOLIS, burial beyond every gate), graveyard and burial-ground records | DR9, DR24, DR32 | the first catacomb candidates at METROPOLIS; a removed record closes its cemetery (V06 §3.18.2 (1), (5)) |
| ruins, magic and mining | `site.deposits` (`ancient_ruins`, the mining deposits: iron, precious metals, gemstones, coal, copper), `magical_node`, ley-line income rows, `magical` history events, Adventuring delving institutions | DR17, DR19, DR30, DR31 | V04's ruin and cavern existence at creation; at an epoch a new deposit or ruin record arriving at `dossier` reaches V04's rules, and a new mining working's breach runs in `under.access` (V06 §3.18.1) |
| the walls | `walls.records`, `walls.citadel`, `walls.flagged`; a walls REPLACEMENT step | DR2, item 108 | the dossier gate on circuits (V06 §3.7.6 (4)) |
| threats by sea | the naval, raider and coastal-monster threats and hostile sea partners of `site.threat` and `economy.partners` | DR2 (item 106 (d)) | the waterfront grade at each epoch (V06 §3.7.6 (3)) |
| the site latitude | `site.culture` through `tables/dossier/cultures`, else 50° N — `Intent.latitudeDeg`, a map fact the user may edit (item 125 (b)) | DR29 | item 102's sampler, so the building mask's sun positions (V06 §3.4) |
| the water system | the `aqueduct_or_water_system` record (V11's mapping to `conduit_house`, V11 §3.11) | DR34 | at CITY and METROPOLIS V11 §3.24.7 (3)'s effects in the `raisedWays` pass — the need counts as met, each SIZE member raising the aqueduct cap and the total by `capPerSizeMember`, its bound `conduit_house` the terminal, the chance never scaled (J-V8.67) — never forcing arches where no source is in reach, never acting at TOWN (V06 §3.19 (2), (6), V06 §3.19.6) |
| landmarks on high ground | the dossier's landmark records placed on the ground arena's high wards or terraces (V08) | DR35 | the elevated road's landmark factor (V06 §3.19 (3)); never a sky landmark |
| era and culture | `site.culture` and the era the port resolves into the era and culture rows (V08's R3 row) | V08's R3 row; `site.culture` as DR5 and DR14 read it | the aqueduct's and the elevated road's chance factors (V11's `aqueductM` and the elevated rows) in the `raisedWays` pass |
| the oasis | `site.deposits`'s `oasis_water` on an arid site | DR40 | the spring's existence (the base's S1); its removal at an epoch fails the spring (V06 §3.12.1 (2)) |
| the history: age, events, tiers, population, calamities, the lifecycle, the peak | `AGE_BY_TIER` and the founding (`history.ageYears`), the events of 29 types with years ago and severity, `tierHistory`, `populationHistory`, `calamityHistory`, terminal death and resettlement (`destroyedByEventId`, `lifecyclePatch`), `peakTier` (V08) | DR36–DR39 | the replay plan's peak, start and epochs (V06 §3.20.1), the event-to-epoch mapping (V06 §3.20.2), refounding (V06 §3.20.5); the `HistoryRecord` (V06 §3.20.6) |
| persons | `notables[]` (staged, item 88) | DR22 | never changed by succession (V06 §3.14) |
=== END ===
=== REPLACE ## 2 Data model ===
## 2 Data model

Units follow §2.1: weeks are signed integers (§4.11 *The clock*; a replayed past lies between the creation week and
the present, V06 §3.20.3), years are `number` (weeks ÷ 52, a fraction allowed), lengths `Cm` in records and `M` in table rows, shares on
[0, 1]. **Model data** is in the model digest (§6.2) and changes only through events; **derived** data is a pure function
of committed state and the log, never persisted; **non-canonical** data lives in the document's non-canonical blocks or in
memory (§2.9) and is never hashed.

### 2.1 The engine's interfaces (`@plat/evolve`)

These are the declarations §4.11 names as this volume's (file f item 317). `EvolutionStrategy` itself is §4.11's (its
phase rule is V06 §3.1 (4)'s); `DisplaceCause` — every cause a household enters the ledger with, `destruction` (the
replay's destruction epoch, V06 §3.20.5 (2)) among them — and `Household.transit` are §2.7's (file f item 335).

```ts
type EpochStep = 'prelude'|'hazards'|'demand'|'field'|'afterField'|'uses'|'departures'|'decline'|'fortification'
  |'terrainWater'|'raisedWays'|'ladder'|'dossier'|'siting'|'growth'|'afterGrowth'|'lapse'|'character'|'works'|'close';   // V06 §3.2's order (twenty steps); fixed
interface EpochPhase { id: string /* registered phase id, e.g. 'base.dossier', 'history.uses', 'village.siting' — what ProductDecl.phases names */;
  step: EpochStep; stage: StageId /* its registered stage id — the stream key's stage component (§6.1; file f item 342) */;
  run(ctx: ProductEpochContext /* a product's phase: the grow path's context before M6-E, EpochContext after (which extends it), reading the extension only where present; the engine's own phases run only on V06's runner and read the whole EpochContext */): KernelResult<EpochOps> }
interface EpochParticipant { id: string /* V06 §3.2's participant table: 'sky.islands', 'under.fade', 'under.extend', 'under.access', 'under.undercity', 'hood.fabric', 'sky.clearance', 'village.plan', 'village.density', 'village.pins' */;
  step: 'afterField'|'decline'|'afterGrowth'; order: number /* ties inside a step: ascending, then id */;
  stage: StageId /* the stage its volume names (V06 §3.16): SKY, S9b, U-FADE, VS1, VS2, VS8 — its draws' stream-key stage and its reads' tag */;
  run(ctx: ProductEpochContext): KernelResult<EpochOps> /* every registered participant runs at every epoch at its step, whatever the epoch's product; a participant scoped to a product, a rung or a state returns no ops outside it, reading ctx.product, ctx.rung and the document (V06 §3.2's table states each scope) */ }   // registered in §4.12's StrategyRegistry by the owning package (a product's participants with the product's registration, ProductDeclEpoch.participants)
// a product's epoch overrides, on §1.1's ProductDecl (V07 §2.1 declares the product; file f items 202, 317)
interface ProductDeclEpoch { phases?: Partial<Record<'siting'|'growth', string /* an EpochPhase id */>>; participants?: string[] /* EpochParticipant ids it registers */;
  rows?: TableId /* the product's epoch rows (V07 §2.2's `epoch.rows` cell), typed as ProductEpochRows, read at an epoch of that product by the decline and hinterland steps */;
  records?: string /* an EpochPlacement id (V07's 'village.records', V07 §2.1, V07 §3.12 *Records at a village epoch*): the product's placement of each `assign` the epoch's dossier step places — a record it adds, a member a count step adds, or the greater a REPLACEMENT re-key places new (V08 §3.5.1 (c)'s second and third cases, (d)); a first-case re-key is a `rebind`, never offered. Called by that step at the product's epochs before the base's placement (§7.7's *One path*), and by *One path*'s placement of a record an absorb adds without an epoch at a rung of the product (V07 J-V7.128); it places the record or declines it, a declined record taking the base's placement; its `remove` is called after the base's removal of a record (§7.7 item 2's `closeUse`) on both paths. The member and both calls land with the product's registration (file f item 202) on M4's grow path, this interface carrying them at M6-E */ }
interface EpochPlacement { id: string /* 'village.records' */; stage: StageId /* its draws' stage component (V06 §3.16): S10b for village.records */;
  place(ctx: Pick<ProductEpochContext, 'doc'|'tables'|'product'|'rung'|'week'> /* never ctx.stream or ctx.epoch; an absorb without an epoch passes these five (the absorb's week) (V07 J-V7.128, J-V7.129) */, record: DossierRef /* §7.1 */,
    event: { seq: number } /* the dossier event that adds (or re-keys) the record — carried by the epoch, or applied by the absorb: the placement's draws (on `siting` and the `plot.*` concerns) and the addresses it mints are keyed by this seq as creation index, epoch component 0, as a post-build placement's (§6.1, §6.3; §7.7 item 6; V06 §3.16's *Keys*) */): KernelResult<EpochOps | 'declined'>;
  remove?(ctx: Pick<ProductEpochContext, 'doc'|'tables'|'product'|'rung'|'week'>, record: DossierRef, event: { seq: number } /* the removing dossier event, keyed as place's */): KernelResult<EpochOps>
    /* the product's own traces of the removed record — V07's fair field's reservation, a pin the record forced or bound (V07 §3.12 *Records at a village epoch*) */ }   // registered in §4.12's StrategyRegistry by the product's package
interface ProductEpochRows {   // what the engine reads from ProductDeclEpoch.rows (V06 §3.5.2, V06 §3.5.3); every member optional — absent, the engine's own rule
  persistence?: Record<string /* a class id ('church', 'manor', …) */, number /* × the building layer's rate for a building whose live or last use is of that class */>;
  street?: { classes: WayClass[] /* the classes the street candidate takes */; op: 'downgradeWay'|'retireWay' /* the op a way in use takes when struck: the engine's, or V07's retirement to a hollow way (file f item 268) */;
    again?: 'effaceWay' /* the op a way already in op's result takes when struck again — V07's hollow way effaced to `decayed` (V06 §3.5.2) */;
    reopen?: 'reopenWay' /* regrowth's op for a way in op's or again's result — tier (5′) and the placement rule of V06 §3.8.2 — V07's hollow way back to `built` */ };
  hinterland?: { slack: number /* replaces dial.hysteresis in V06 §3.5.3 (1) (V07's `epoch.rows.hinterland.slack`, 20 %) */;
    order: 'farmstead'|'perimeterPoorest' /* surplus faces farthest from a live farmstead first (the engine's), or farthest from the perimeter and poorest by suitability first (V07 §3.9) */;
    cap: 'rungPerSpan'|'greatFieldPerEpoch' /* one rung per drawn span (the engine's), or one great field's worth at most per epoch (V07) */ } }
interface EpochOps { ops: (ConversionOp | EditEvent)[] /* committed in this order as single-level batches of the epoch event (§3.3) */;
  waited: Id[] /* candidates a cap or a work limit held back, address order — first in line next epoch */; report: Partial<EpochReport>;
  displaced?: { household: Id; cause: DisplaceCause; from: Id /* the building left */ }[] /* households this phase's ops emptied out of their dwelling without housing them: they enter the ledger (V06 §3.8.1) */;
  demandTaken?: { band: string; count: number }[] /* households a participant takes up from the epoch's delta demand (V05 §3.15's refloat or raise): `siting` subtracts them */ }
interface HouseholdLedger {   // EpochContext.households — the epoch's one channel for households between batches (V06 §3.8.1; J-V6.67)
  displace(ids: Id[], cause: DisplaceCause, from: Id): void /* the runner calls it for every EpochOps.displaced row, after the batch commits */;
  take(band: string, count: number, by: string /* participant or phase id */): void /* the runner calls it for every EpochOps.demandTaken row */;
  pool(): { household: Id; band: string; cause: DisplaceCause }[] /* not yet placed, address order */;
  taken(): Record<string /* band */, number> }
interface EpochScope {   // EpochContext.scope() — what this epoch has changed so far; every field's readers are W64's list, stated there once (V06 §1b)
  built: Id[] /* buildings whose lifecycle in this epoch's event records existence 'built' (build, rebuild, reuse … build, a new stage's S11), address order */;
  basementGrown: Id[] /* buildings a MutationPlan step, a rung-3 op or a crypt extension gave a new wing or basement ring this epoch */;
  elements: Id[] /* underground tunnels, galleries and chambers created or extended this epoch by any phase or participant */;
  workings: Id[] /* the mining and quarry uses whose outside-plot workings an op of this epoch opened (a village rung's mines, V07 §3.16 (4)), address order */;
  recut: Id[] /* blocks a rung-3 op re-cut or redeveloped this epoch, address order */;
  surfaceChanged: Id[] /* faces a reclaim, a course shift, a quarry face, a raiseGrade or a collapse changed this epoch, and the faces of the landfall members that left their decoration this epoch (V06 §3.5.2) */;
  raised: Id[] /* raised ways (item 110 (b)) any op of this epoch created, repaired, neglected, breached, dismantled or removed, or whose spans a landfall ruined (sky.islands), address order */;
  levelled: Id[] /* plots and blocks an op of this epoch levelled or re-levelled (a new stage's S10–S11, a re-levelling rung-3 re-cut or rebuild, raiseGrade), with the RetainingWalls it made, re-derived or buried (V06 §3.19.4) */ }
interface ProductEpochContext {   // what a product's phases, participants and placement read — filled by M4's grow path at file f item 202's call points and by V06's runner as the EpochContext below; lands with file f item 202
  doc: Document /* the epoch's transaction view: the state after the previous phases' batches */; epoch: number; seq: number /* the epoch event's seq — every cause this epoch records */; week: number; prevWeek: number /* the previous epoch's week, or the creation week */;
  years: number /* (week − prevWeek) ÷ 52 */; inputs: EpochInputs; tables: TableView;
  product: string /* the product V07 §2.1's fold gives at the epoch (file f item 322): the previous epoch's product unless the target crossed the hand-off band — a village becomes a town at 1 500 × (1 + handoff.band) = 1 575, a town a village below 1 425 — 'town', or V07's 'village' */;
  rung: Rung /* the rung the fold gives: inside the band the previous product's own rung row at the edge of its range (a 1 440-person town on TOWN, a 1 560-person village on VILLAGE) */;
  productRows?: ProductEpochRows /* the epoch's product's epoch rows (ProductDeclEpoch.rows), resolved through the tables pinned in the recipe; absent for the base product */;
  stream(stage: StageId, entity: Handle): Stream /* epoch.transform (§6.1): the entity's key, the phase's stage id, the epoch; one stream per (entity, stage) per epoch, continued */;
  scope(): EpochScope /* derived from the epoch event's lifecycle entries so far */ }
interface EpochContext extends ProductEpochContext {   // V06's runner's context, built at E1; on M4's grow path it is absent: the siting override's tier (0) reads an empty pool and step (m)'s roster joins take the base's churn cap (§4.11 *Churn*)
  params: EvolutionParams /* the effective parameters at the epoch's log position (V06 §3.1) */;
  exposure(): ExposureField /* §4.11's E(x) on §4.5's 32 m cells from the state at the call — computed at most once per epoch, after the field phase */;
  households: HouseholdLedger; churn: ChurnLedger; report: EpochReportSink }
interface ChurnLedger { remaining(district: Id, kind: 'geometry'|'fabric'|'use'): number; take(district: Id, kind: 'geometry'|'fabric'|'use', n: number): number /* granted ≤ n; §4.11's caps scaled by years, the fractional extra drawn as the base states */;
  block(block: Id): number /* the per-block maximum left this epoch */ }
// DisplaceCause and Household.transit (epoch-local, never in a snapshot) are §2.7's; the ledger above writes and clears transit
```

`Household.transit` (§2.7) is written by the batch that displaces a household (the ledger's `displace`) and cleared by the batch
that places it, both inside one epoch; the runner's close asserts the ledger's pool is empty, so no household is in
transit when the epoch event ends (§5.3's scoped row; T-V6-52). A household a hand edit displaces between epochs is
re-homed inside that edit by §4.7's overflow pass and never takes the field.

### 2.2 Parameters and the evolution table

```ts
interface EvolutionParams {   // Recipe.params subtree `evolution` (§2.9); control-registry rows on the advanced panel (§7.8)
  strategy: 'history'|'grow-by-stage' /* default 'history' for a document created at or after the output version that ships V06; 'grow-by-stage' otherwise (§7.5, J-V6.30) */;
  cadenceWeeks: number /* the standalone advance step: default 52 — the port's cadence (J-V6.3) */;
  hazards: 'none'|'minor'|'full' /* spontaneous hazards: default 'minor' standalone; a dossier-bound document holds 'none' by rule, an `adjust` to another value refused with the dossier line (V06 §3.11.1; J-V6.19) */ }
```

The strategy, the cadence and the hazard mode are read from the **effective** parameters at the epoch's log position (the
recipe's, with every `adjust` before the epoch applied), never from the recipe alone (V06 §3.1 (2)).

`EvolutionTable` (`tables/evolution.json` in `@plat/tables`; one versioned table with provenance per cell, §7.6; every
default **our own, calibratable** by the corpus stage (§13.9) unless the paragraph after the table says otherwise; every
chance is per year, applied over an epoch's span as `1 − (1 − p)^years` through `dmath`, §4.11 *The clock* (5); under
the parity presets the table resolves by §7.6's order, so under `VG` an epoch at a village rung reads it at its parity
values, the cells "0 in the parity presets" among them, file f item 581):

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
| `shade.rasterM` · `shade.ruinShare` | 4 · 0.5 | the caster raster's cell; a ruin's caster height as a share of its eave (V06 §3.4); the reach is the sampler's one law (§4.5; V05 §3.19 (1)), for the buildings as for V05's island strips |
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
| `spring.sourceReachM` | 50 | a spring whose source point lies farther than this from its water body's shore after a course change is lost (V06 §3.12.1) |
| `spring.recoverPerYear` | 0.05 | a failed spring's flow recovers this much per year toward 1 while no failure holds it (V06 §3.12.1) |
| `spring.droughtShare` | minor 0.1 · moderate 0.3 · major 0.5 · catastrophic 0.8 | the share of every ground spring's flow a drought takes, by severity (V06 §3.11.7, V06 §3.12.1) |
| `spring.droughtPerYear` | 0.01 | the spontaneous drought's chance on an arid site at `evolution.hazards` `full`, standalone only, severity `moderate` (V06 §3.11.1) |
| `spring.dryMarshAfterYears` | [10, 30] | a spring at flow 0 this long silts its pond to marsh (V06 §3.12.1) |
| `spring.gardenMinFlow` · `spring.groveMinFlow` | 0.5 · 0.25 | below these flows — held `land.fallowAfterYears` — an oasis's gardens turn `commons`, and — held `land.scrubAfterYears` — its grove thins (V06 §3.12.1) |
| `spring.aqueductMinFlow` | 0.5 | an aqueduct whose source is a spring below this flow runs dry (V06 §3.12.1, V06 §3.19.2 (2)) |
| `works.partStartAt` | `roofed` | a part programme's next part starts when the previous part reaches this stage (V06 §3.13) |
| `chronicle.declineShare` · `chronicle.regrowthShare` · `chronicle.significanceMin` | 0.10 · 0.10 · 0.6 | a district's household fall or reoccupation per epoch that earns a chronicle line; the significance (item 72) from which a single use's opening, closing or move is its own line (V06 §3.15.1) |
| `overflow.tentBeltM` | 60 | the depth of the edge belt the overflow ladder's last rung pitches on (V06 §3.6) |
| `history.checkpointStride` | 10 | a history keyframe every this many epochs (V06 §3.15.2); the output never depends on it |
| `advance.maxEpochs` | 200 | the most epochs one `advance` expands to; above it the cadence bends (V06 §3.3.2) — at the reference cost rows the comfort estimate binds first (V06 §6.8) |
| `decline.turnoverVacancy` | poorest band 0.05 · every other band 0.01 · 0 in the parity presets | the share of each band's dwellings regrowth tier (1) leaves vacant, so a steady town keeps some abandoned stock (V06 §3.8.2) |
| `uses.splitHysteresis` | 0.10 | a split pair merges back only when its split index falls below its class's compiled `profile.split.threshold` (V11 §2.3, V11 §3.5.2) minus this (V06 §3.9.10 (3)) |
| `raise.fireBuildings` · `raise.floodShare` · `raise.minHa` · `raise.chance` | 60 · 0.3 · 1 · 0.3 | a burnt connected region of at least this many buildings, or a flood whose collapse share exceeds this over at least this area, raises the ground at this chance (V06 §3.11.6) |
| `excavate.reachM` · `excavate.chancePerYear` | 60 · 0.05 | a sealed cavern or ruin cluster within this of an accessible element may be excavated on demand at this chance (V06 §3.18.1 (5)) |
| `catacomb.primaryHysteresis` | 0.10 | another cemetery becomes the primary only when its served burials exceed the primary's by this share (V06 §3.18.2 (3a)) |
| `calamities` | V06 §2.4's calamity rows | the dossier's calamities as hazard events (V06 §3.11.1; DR28) |
| `replay.maxEpochs` | 60 | the most coarse epochs one history replay runs; above it the epoch length grows to fit (V06 §3.20.1) |
| `replay.symbolicPeakAgeShare` | 0.5 | where no evidence dates the peak, it stood this share of the settlement's age before the present (V06 §3.20.1) |
| `replay.detailRetainYears` | 50 | a replay epoch ending more than this before the present runs its phases at model level, with no Works and no lazy rung derived (V06 §3.20.4) |
| `epoch.costMs` | TOWN and the village rungs 150 · CITY 430 · METROPOLIS 1 310 | the per-epoch cost both comfort estimates sum — an `advance`'s and the history replay's — by the rung of the epoch's target: V06 §6.1's total with V06 §6.2's participants, rounded up to the next 10 ms (V06 §6.7, V06 §6.8) |
| `epoch.islandMs` | TOWN and CITY 230 · METROPOLIS 260 | added per epoch for each island that may stand: one resize with its generated accesses' tops and feet (V06 §6.2's worst case) (V06 §6.8) |
| `epoch.handAccessMs` | 60 | added per epoch for each hand-placed access standing at the request: its top's and its foot's placements at V05 §6's 30 ms each, at its island's resize (V06 §6.2, V06 §6.8) |
| `epoch.stageMs` · `epoch.stageMsPerBuilding` | 6 · 0.06 | the growth stages in the estimate: per epoch whose target rises, plus per building the rises add (§12.6's scoped law; V06 §6.2, V06 §6.8) |
| `advance.budgetMs` | 9 000 | an `advance`'s share of item 119's ten-second comfort level; above it the cadence coarsens (V06 §3.3.2, V06 §6.8) |
| `replay.budgetMs` | TOWN and below 9 000 · CITY 8 500 · METROPOLIS 7 000 | the replay's share of the comfort level by the peak's rung — the ten seconds less the peak's generation and first map at the rung's band top (§12.3, §12.5) and a 500 ms reserve; above it the epochs coarsen (V06 §3.20.4, V06 §6.7, V06 §6.8) |

**Not calibratable** (J-V6.111). Twenty-one columns and one row set carry `calibratable: false` in their `ColumnSpec`
(V11 §2.1), so V12 §3.11's lint asks no register entry of them and no run may name them (V12 §3.7.2 (1)): the cost and
recording bounds `advance.maxEpochs`, `history.checkpointStride`, `uses.openCandidates`, `uses.moveWhyRows`,
`replay.maxEpochs`, `replay.detailRetainYears`, the comfort estimate's `epoch.costMs`, `epoch.islandMs`,
`epoch.handAccessMs`, `epoch.stageMs`, `epoch.stageMsPerBuilding`, `advance.budgetMs` and `replay.budgetMs`, and the
`chronicle.*` shares (they shape the cost, the cadence a long run takes under item 119's comfort level, or the
non-canonical report, never a history's rules); the rules `growth.crowdBands`, `streets.classes`, `uses.closeSurplusBy`,
`works.partStartAt` and `replay.symbolicPeakAgeShare` (a band set, a class set, an order, a stage, and a dating convention
with no corpus to measure it); and the `calamities` rows, a mapping of the dossier's calamities (item 20: a derivation rule,
as V11 §3.1 holds every `dossier.*` column). Every other column is calibratable, its register entry as V06 §8 lists it.

The four structure knobs `retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM` and
`aqueduct.disuseAfterYears` are V11's cells (V11 §3.18), read there by V06 §3.19.2 and V06 §3.19.4; item 113's `history.*`
cells (`epochYears`, `burialYears` with its factors, `symbolicQuantile`, `reuseCost`, `replay`) and its event rows are
V11's (V06 §2.14). The history store's memory and the frames kept in memory are per-device app settings — V09 §5.12's,
by default 256 MB on the desktop tier, 96 MB on the low-end tier and 8 frames (V09 §2.11's `AppPrefs.history`) — outside
the recipe, the log and every digest: they change what is cached, never what is drawn.

### 2.3 The trajectory and the `advance` event

```ts
interface Trajectory {   // a standalone future: expanded by `advance` into dated epochs (V06 §3.3.2)
  spanYears: number /* the epochs cover (the document's week, + spanYears × 52]; a degenerate value is read by V06 §3.3.2's edge rules */; cadenceWeeks?: number /* default evolution.cadenceWeeks */;
  population: { kind: 'rate'; perYear: number /* signed: 0.01 = +1 % a year */ }
    | { kind: 'target'; target: number; shape: 'linear'|'logistic' /* default logistic */ }
    | { kind: 'points'; points: { week: number; population: number }[] /* piecewise linear */ };
  wealthLevel?: { kind: 'hold' } | { kind: 'target'; target: number } /* default hold */;
  slice?: Partial<CircumstanceSlice> /* circumstance changes applied from the first epoch (a new threat, a new era row) */;
  events?: { week: number; kind: string /* a HazardRow kind */; params?: Record<string, number> }[] }
// the request (the tool API and T1's time card; file f item 458) — not a log event: it APPENDS `epoch` events, one per cadence step, in one `group`
interface AdvanceRequest { trajectory: Trajectory; from?: 'now' | { founding: number /* re-create at this population, then advance: the "grow from a founding" macro (V06 §3.3.3); in the creation flow it applies to the new document; on an existing document it bends (J-VI.4) to "Start a new town small" — a new document created at the founding population under this recipe and advanced, the present one untouched, the dry run naming the bend in one line */ } }
// EpochInputs.wealthLevel and EpochInputs.advance are §4.11's (file f item 343); this volume writes them (V06 §3.3.5, V06 §3.3.2)
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

`advance` is refused on a dossier-bound document — the dossier-clock case of the dossier-owned refusal: the host's clock
owns its time (§4.11 *The clock*; J-V6.2). The refusal offers its alternative: "Make a what-if copy and advance it"
(`forkAt` at the head, detached, V06 §4.4).

### 2.4 Hazard rows

```ts
interface HazardRow { kind: string /* 'fire', 'flood', 'collapse', 'drought' … data */; operator: 'burn'|'inundate'|'topple'|'dry';
  params: Record<string, number> /* the operator's defaults; an event's params override them */;
  spontaneous?: { perYear: number /* the base rate of the spontaneous draw */; mode: 'minor'|'full' /* the lowest evolution.hazards setting that admits it */ } }
```

Default rows (our own; historically attested kinds, rates calibratable): `fire` — `burn`, spontaneous `minor`, V06
§3.11.2's parameters; `flood` — `inundate`, spontaneous `full` only on a river or coast town, `perYear` 0.02; `collapse` —
`topple`, event-only; `drought` — `dry` (item 111 (b); V06 §3.11.7), spontaneous `full` only on a site whose climate row
is arid and which holds a spring, `perYear` `spring.droughtPerYear`, its share `spring.droughtShare` by severity. An unknown
kind is reported and ignored (V06 §3.17).

**The calamity table** (`tables/evolution.json#calamities`; DR28; this volume owns it — the port only carries the
dossier's calamity records into `EpochInputs.events` as `{ week, kind: 'calamity', calamity: CalamityRef }`, the entry
shape and `CalamityRef` being §4.11's, file f item 573):

```ts
interface CalamityRow { id: string; words: string[] /* matched, case-folded, against the calamity's name and type words */;
  hazard: 'fire'|'flood'|'collapse'|'drought'|null /* null: no hazard — its effect is the population and the conditions the dossier reports */;
  maxBuildings?: Record<'minor'|'moderate'|'major'|'catastrophic', number> /* the burn's cap or the topple's count by the calamity's severity band */ }
```

| row | words (any) | hazard | `maxBuildings` minor · moderate · major · catastrophic |
|---|---|---|---|
| `fire` | fire, blaze, conflagration, burning | `fire` (`burn`) | 6 · 40 · 150 · 400 |
| `flood` | flood, inundation, deluge, storm surge | `flood` (`inundate`; the severity scales `depthCm` × 1, 1.5, 2, 3) | — |
| `collapse` | collapse, earthquake, quake, subsidence, landslide | `collapse` (`topple`; the count) | 1 · 3 · 8 · 20 |
| `drought` | drought, dry years, dearth of water | `drought` (`dry`; the share by `spring.droughtShare` at the severity) | — |
| `none` | plague, pestilence, famine, war, siege, raid, riot, unrest | null | — |

The rows' provenance is SettlementForge's calamity names and types (`research/sf/dossier-generation.md`, the calamity row,
read-only; the words are ours); a calamity that matches no row is reported (`calamityUnmapped`) and changes nothing but
what its dossier facts change; a `drought` on a map with no spring changes nothing (J-V6.128). The **place** of a mapped
calamity is the centroid of its targets' sites (their uses' buildings), else the town's centre; its week is the
calamity's tick mapped to a week by DR21 (§4.11 *The clock*); its `deaths` feed the cemeteries' burials (V06 §3.18.2 (3)).

### 2.5 `MutationPlan` — a designation change spread over epochs (item 18 (c))

```ts
interface MutationPlan { id: Id /* address: an epoch's plan keyed from its plot's lineage with the epoch's week as creation index; a hand plan the creating event's seq and ordinal (§6.3) */;
  plot: Id; building: Id; from: Designation; to: Designation /* §4.7 S11 */; direction: 'up'|'down'|'level' /* the target template's size budget against the present */;
  record: { seq: number; index: number } /* the MutationRecord (§4.7 S11) computed once at creation: the causing event's EditBase.mutations[index] */;
  steps: { step: 'occupy'|'adapt'|'extend'|'rebuild'; dueWeek: number; done?: number /* the seq of the event that applied it */ }[];
  opensAt: 'occupy'|'adapt'|'extend'|'rebuild' /* the step at whose application the use opens: occupy when the present design is compatible, else the first step whose result is (V06 §3.10.1; file f item 266) */;
  crypt?: true /* the target is an always-crypt class (V11's `crypt: 'always'` rows, the cathedral and great temples): the occupy step carries the crypt (V06 §3.18.3 (1)) */;
  expect: Hash64 /* the building's leaf digest after the last applied step: a step applies the stored record only while it still holds (V06 §3.10) */;
  cause: EditRef | RuleRef; lifecycle: Lifecycle }   // model data; registry kind 'mutationPlan' (§2.8; file f item 264); tombstoned when its last step is done, its plot re-derived, or deleted
```

### 2.6 `BuildingShadeMask` — the buildings' share of the daylight driver at an epoch (item 102 (b), (e))

```ts
interface BuildingShadeMask { arena: Id /* the ground arena, or an island's arena (V05): one mask per arena */; epoch: number; week: number /* the epoch that wrote it */;
  sampler: Hash64 /* digest of item 102's sampler — its sun positions and per-cell sample points (§4.5, §8.4's path sun) — so a table change that moves the sampler invalidates the mask */;
  grid: { cells: number; cols: number } /* §4.5's 32 m field grid; on an island arena the island's own 32 m lattice (V05) */; bits: number /* per cell: sample points × sun positions */;
  mask: Uint8Array /* per cell, row-major, `bits` bits: 1 = that sample point is in a building's shadow at that sun position */ }   // model data in the `fields` chunk (§2.9; file f item 275), written only by the field phase of an epoch; absent before the first epoch
```

On an island arena the mask is OR-ed into V05's `shadeSky` receivers. A mask whose `sampler` differs from the current
sampler reads as zero building shade until the next epoch rewrites it whole (V06 §3.4 (5); J-V6.129 states how this
agrees with §4.5 (iv)).

### 2.7 `Enceinte.pathway` and `Enceinte.underuseSince` — a ring's road out of use

The fields are §2.7's (file f item 254); their rules are this volume's. `pathway.since` is the week the ring was
superseded or neglected; `cause` names which (`superseded`, `neglected`, `contracted`); `fate` (`road`, `absorb`, `keep`)
is drawn once (V06 §3.7.2), `keep` while `threat ≥ walls.keepThreat`; `eligibleWeek` is the drawn week from which the
final conversion may fire; `source` `edit` marks a hand `setAttr` that fixed the fate or the week, which the engine never
redraws. `underuseSince` is the week the ring's intramural occupied-plot share first fell below
`contract.occupiedShareMax`, cleared when it rises above it, written by the fortification phase only (V06 §3.7.4).

### 2.8 The new conversion kinds and `Way.formerClass`

`EvolveOp` joins §4.11's `ConversionOp` union (file f item 209); its members are declared here, each a lifecycle change
with its cause, an undo record and a hand form through `convert` (§7.1):

```ts
type EvolveOp =
  | { op: 'absorbWall'; enceinte: Id /* the chain's `wall` role rows are removed (§2.2's registry); its strips re-join the blocks beside them and S10's incremental re-cut writes `plot_line` rows, keyed to their plots, where plots meet the old line; the Enceinte takes existence `cleared` (cause `convert:absorbWall`) and keeps its name in its record; its remaining runs keep their `condition`, dismantled on by V06 §3.7.2 (2), its towers and gates following them — a tower or a gate carries no state of its own and is never a pool candidate */ }
  | { op: 'downgradeWay'; way: Id; to: 'path'|'track' /* class lowered, formerClass written; the line persists */ }
  | { op: 'upgradeWay'; way: Id /* back to formerClass, which is cleared */ }
  | { op: 'burn'; buildings: Id[] /* existence → 'decayed' with Works kind 'decay', stage CHARRED (§4.11 Works (4)'s fire row); households and uses relocated first */ }
  | { op: 'wearWall'; enceinte: Id; stretch: StretchRef /* item 114: a `standing` run → `worn` (weathered, parapet broken; still a wall), its last-change epoch written; issued by V06 §3.7.7 (2)'s decay and by hand (T3's "wear"); a no-op with its line on a run not `standing` */ }
  | { op: 'repairWall'; enceinte: Id; stretch?: StretchRef; material?: 'robust' | string /* item 114: robust (the wall's own material; the default) or a patch row id of V11's `walls.patchMaterials` — a `breached` run so repaired becomes `patched`, a `patched` or `worn` run repaired robust becomes `standing` (V06 §3.7.7 (3)); every repair writes the run's material and last-change epoch */
      /* With a stretch: a `breached` run of the ring's `condition` back to `standing` (robust) or `patched` (a patch material), a `worn` or `patched` run back to `standing` (robust) — no Works (J-V6.31, J-V6.90: the base's `Works.target` is a building or plots), the change drawn at its effective week (V06 §3.15.2), and the run's towers and gates stand again with it (they are drawn by their run); the record's lifecycle returns to its former state when every run is `standing`; on a `dismantled` run it bends (J-VI.4): its stone is gone, so a new stretch is drawn on its line through `drawWall` ("its stone is gone; a new stretch is built here").
         With no stretch ("back in use"): the ring's latest `neglect` not yet lifted is lifted — its existence back to the state before that `neglect` (read from the ring's lifecycle block: the existence recorded before the neglect event, the value that event's undo record holds, so it is found after the undo record is gone) when every run is `standing`, else `decayed`; issued by the engine in the batch that clears a pathway (V06 §3.7.5, cause `rule:threat`), and by hand, where it also clears the ring's pathway whatever its cause (`supersededBy` untouched); on a ring with no neglect to lift it is a no-op with its line ("this wall is in use"; nothing changes) */ }
  | { op: 'retypeLand'; landUse: Id; to: LandUse['kind']; crop?: string; rotation?: { scheme: string; slot: number } /* the hinterland's fallow ladder and its reversal (V06 §3.5.3), the village's furlongs to pasture (V07 §3.12), the village's fair field over hinterland faces turned `commons` (V07 §3.12 (a), in the `dossier` step's product placement or V07's siting step (m)), and an oasis's gardens drying to `commons` and re-taken (V06 §3.12.1) — one op; the face and its owner kept */ }
  | { op: 'repairRaised'; target: { raised: Id; span?: SpanRef /* a ruined span back to standing, with each ruined support at its ends (a support a topple or a landfall ruined), or, with no span, an abandoned raised way back to in use (V06 §3.19.2 (5)); on a dismantled span or a cleared support a hand repair bends (J-VI.4) to a new raised part on the way's line through the base's hand operator ("rebuilt as a new span"); the engine never repairs one (V06 §3.19.1 (3)) */ }
      | { deck: Id /* item 246's Plot.deck.host — a Bridge id for a bridge deck, a pier or quay way's id for a mole, pier or quay platform: a ruined or decayed deck back in use, the host's former existence restored from the striking op's undo record; its deck faces are then offered at regrowth tier (5) (V06 §3.19.5 (4)) */ } }
  | { op: 'repairRetaining'; retaining: Id; stretch?: StretchRef /* a decayed stretch of a retaining wall back to standing, or, with no stretch, every decayed stretch of it (V06 §3.19.4 (6)); a ruined stretch — its stone gone — is not restored: an epoch's re-levelling lays a new stretch on its line, and a hand repair bends to a new drawn stretch on its line through the base's retaining-wall drawing (T3 `wall`, `retaining` kind; J-VI.4) */ };
```

`Way.formerClass` is §2.4's field (file f item 209): written by `downgradeWay` and by volume 5's landfall when it drops a
covered way to `track` (V05 §3.16 (4)); cleared by `upgradeWay`, the landfall clearance (V06 §3.5.2) or any `setAttr` of
`class`. The oxbow a course shift leaves is part of `shiftCourse` itself (file f item 206), not an op of its own; `SpanRef`
is §4.11's.

### 2.9 `Use.strain` — the use step's memory

`Use.strain` is §2.7's (file f item 429): set by the use phase (V06 §3.9.2) and cleared by it or by a user's `setAttr`.

### 2.10 The epoch report and the chronicle (non-canonical, rebuilt by replay)

```ts
interface EpochReport { epoch: number; seq: number; week: number; years: number;
  phases: { step: EpochStep; participant?: string; ops: number; waited: number; blocked: number; ms: number }[];
  households: { arrived: number; left: number; relocated: number; crowded: number; overflow: number /* housed by the overflow ladder's rungs (ii)–(iii) */;
    underground: number /* seated by the crowding hook */; voidDwellers: number /* relocated into F6's new void dwellings (V06 §3.18.1 (4)) */;
    undergroundVacated: number /* vacated by under.undercity's re-read, a foundation collapse or a void made lost after `siting`, and re-housed inside the participant (V06 §3.18.1 (4), (6)) */;
    heldByLock: number /* leaving households a lock or pin kept, or a protected dwelling's last household kept, under a fall with no dossier population, that no other household could replace — the fall's shortfall (V06 §3.5.1 (1), (4)) */;
    backlog: number /* housed by the overflow ladder at the epoch's end */; inTransit: 0 /* always 0 at the close; asserted */ };
  buildings: Record<'built'|'extended'|'repaired'|'vacated'|'decayed'|'ruined'|'cleared'|'reused'|'burned'|'demolished', number>;
  plots: { joined: number; split: number; toGarden: number; gardensReused: number };
  ways: { downgraded: number; upgraded: number; primaries: number; retired: number; effaced: number; reopened: number /* retireWay, effaceWay and reopenWay — tier (5′) and the placement rule (V06 §3.5.2, V06 §3.8.2) */ };
  passages: { sealed: number; reopened: number };
  walls: { circuits: number; gatesOpened: number; stretchesDismantled: number; converted: number; contracted: number;
    waterfront: number /* quay walls raised or neglected */; harbourChains: number; waited: number /* traces that could not keep water access or a raised way's continuity */; gatedByDossier: number;
    suppressedHeld: number /* removed generated quay walls and harbour chains whose condition still holds (V06 §3.7.6 (3)) */;
    repairedInUse: number /* breached runs repaired on a ring with no pathway (V06 §3.7.5) */;
    backInUse: number /* neglects lifted by the no-stretch repairWall in the batch that clears a pathway (V06 §3.7.5) */;
    worn: number; patched: number; rebuilt: number /* item 114's transitions this epoch: runs worn, breaches patched, worn or patched runs rebuilt robust (V06 §3.7.7) */ };
  uses: { opened: number; closed: number; relocated: number; heldByPin: number; heldByProtection: number; rebound: number /* links re-bound */;
    relaxMoves: number; splits: number; merges: number; ladderRebound: number; moves: UseMove[] /* every opening, move and closing of the epoch, address order — derived from the lifecycle block's why rows (V06 §3.9.7) */ };
  under: { accesses: number; links: number; excavated: number; voidsSettled: number; voidsVacated: number; voidsLost: number /* voids whose last open link closed this epoch (item 113 (e); V04) */; featureOn?: 'sewers';
    collapsedByFoundation: number /* older void elements a new footing, pier or basement filled (V06 §3.18.1 (6)) */; maintenance: boolean /* a village rung's maintenance mode held the inherited systems */ };
  catacombs: { founded: number; grownM2: number; stagnant: { complex: Id; blockedBy: string[]; fillRise: number }[]; aboveCount: number };
  crypts: { dug: number; capped: number; joined: number; authorExempt: number };
  shade: { cellsRecomputed: number; meanBuildingShade: number; samplerStale: boolean;
    surfacesRelaid: number /* ways whose surface the field phase re-laid by V01 §3.7.3 (V06 §3.4 (9)) */; surfacesHeld: number /* candidates kept by an edited surface */ };
  water: { springsFailed: number; springsRecovered: number; springsLost: number; gardensDried: number; gardensRetaken: number; grovesThinned: number; pondsSilted: number } /* V06 §3.12.1 */;
  raised: { founded: number; repaired: number; spansFallen: number; ranDry: number; waited: number /* admitted candidates with no course — none found, or one item 244's support step dropped as `raised_too_tall` or `raised_too_long` (V06 §3.19 (5)) — or whose caps could not pay */;
    aboveCap: number /* kinds whose count stands above the rung's cap (V06 §3.19.1) */; suppressedHeld: number /* live reasons a removal suppresses */; disused: number;
    suppressedFired: { removal: number /* the seq of the live removal (the delete) whose suppress.key is the key */; week: number /* that removal's week */ }[]
      /* one entry per suppressed key whose reading is met and whose gate passes this epoch — where the city would have founded it — in removal order; none for a key a re-add serves; read by V09 §4.10's epoch row lines and V08 §4.6 item 3 (V06 §3.19.3 (2)) */ };
  retaining: { created: number; rederived: number; buried: number /* tombstoned under a raiseGrade */; slumped: number; restored: number /* decayed stretches restored, ruined ones replaced (V06 §3.19.4 (6)) */; suppressedHeld: number };
  decks: { offered: number; struck: number; repaired: number; suppressedHeld: number /* deck slots a live removal holds empty */ };
  landfall: { membersCleared: number /* every member that left a decoration this epoch, by any op */; ways: number; walls: number; plots: number;
    raised: number /* span and support members that left by repairRaised or dismantle */; decorationsCleared: number; quarriesToCommons: number;
    accessesReopened: number /* bricked accesses returned with their host */ } /* V06 §3.5.2's landfall candidate */;
  replay?: { index: number; of: number; events: number; refounded: boolean; buried: number /* BuriedFormer.lay systems laid */; detail: 'model'|'full' /* V06 §3.20.4 */;
    epochYears: number /* the plan's epoch length (ReplayPlan.epochYears) */; coarsened: boolean /* longer than history.epochYears (V06 §3.20.1 (3), V06 §6.8) */ } /* a replay epoch only (V06 §3.20) */;
  advance?: { index: number; of: number; cadenceWeeks: number /* the cadence the group folds at */; requestedWeeks: number /* the cadence asked, after advance.maxEpochs' bend */;
    estimateMs: number /* V06 §6.8's estimate at cadenceWeeks */ } /* an advance group's epochs (V06 §3.3.2), and a coarsened dossier catch-up's (V06 §6.8 (6): index and of among the catch-up's coarse epochs, requestedWeeks the port's 52): the cadence chosen reported, coarsened when cadenceWeeks > requestedWeeks */;
  chronicle: ChronicleEntry[] }   // §5.4's per-event report gains this section (file f item 339)
type WhyRow = NonNullable<LifecycleEvent['detail']['why']>[number];   // §2.8's why row (file f item 265): { row, family, share, good?, other? }
interface UseMove { use: Id; op: 'open'|'relocate'|'close'; from?: Id; to?: Id /* plots */;
  cause: 'demand'|'strain'|'surplus'|'coverage'|'chain'|'revision'|'dossier'|'displaced'|'split'|'merge'|'relax'|'ladder'|'fire';
  why: WhyRow[] /* = the lifecycle event's detail.why, the top uses.moveWhyRows, descending */ }
type ChronicleKind = 'stage'|'circuit'|'wallFate'|'wallManned'|'wallWorn'|'wallPatched'|'wallRebuilt'|'gateOpened'|'contraction'|'fire'|'flood'|'topple'|'decline'|'regrowth'
  |'redevelopment'|'useOpened'|'useClosed'|'useMoved'|'mutation'|'terrain'|'island'|'underground'|'dossier'|'rename'
  |'waterfront'|'harbourChain'|'split'|'merge'|'ladder'
  |'accessOpened'|'voidSealed'|'voidLost'|'excavated'|'voidSettled'|'voidVacated'
  |'catacombFounded'|'catacombStagnant'|'catacombResumed'|'catacombsAboveCount'|'cryptDug'|'cryptCapped'|'cryptJoined'
  |'raisedWay'|'retainingSlump'|'deck'|'landfallCleared'
  |'spring'|'drought'|'replay'|'destroyed'|'refounded'|'buried';
interface ChronicleEntry { week: number; epoch: number; kind: ChronicleKind; district?: Id; subjects: Id[] /* ≤ 16, address order */;
  count: number; row: string /* its template row (V06 §5.2) */; cause: EditRef | RuleRef }
```

`LifecycleEvent.detail.why` (§2.8; file f item 265) is written by the use phase on its `open`, `relocate` and `close`
events, by the growth phase on a circuit's creation event (the decision's conditions, V06 §3.7.1), and by the
`raisedWays` step on a raised way's creation event (its reason, V06 §3.19 (8)), at most `uses.moveWhyRows` rows; a row's
`family` is `link` for a supply-web link (item 105 (j)), and `reason`, `condition` or `gate` for a raised way; `row` names
V11's rule, family, coverage, supply-edge, link or signature-pair row, or an evolution-table row for a circuit. The report
and the chronicle stay non-canonical (rebuilt by replay; kept across a rebase, V06 §3.15.5); the why rows are not: they
live on the lifecycle events, so an answer survives a save, a load, a rebase and an export, and the report's `UseMove`
rows are read back from them.

### 2.11 The history index, frames and diffs (derived and non-canonical)

```ts
interface HistoryIndex {   // derived from the log at load and after every fold; never persisted
  creationWeek: number /* the week of the log's first model: a replayed document's first replay epoch's start (V06 §3.20.3) */; presentWeek?: number /* a replayed document: the last replay epoch's week — the generation's present */;
  currentWeek: number /* §4.11's document week */; baseSeq?: number; baseWeek?: number /* a rebased document's Base (§2.9): no frame exists before it (V06 §3.15.5) */;
  epochs: { epoch: number; seq: number; week: number; from: number /* prevWeek */; replay?: true /* in the creation prefix (V06 §3.20) */ }[];
  dated: { seq: number; week: number; kind: string }[] /* dossier events with a week, scheduled hand Works (startWorks) */ }
interface HistoryFrame {   // in memory only (the generation worker), evicted LRU at the device's frame setting
  epoch: number; seq: number /* the frame is the model after this epoch event */; chunks: ChunkRef[] /* copy-on-write over the session's arenas (§7.4's checkpoints) */;
  works: Id[] /* the Works that epoch created, all of them — the frame never retires its own (file f item 321) */; bytes: number }
interface HistoryImage { seq: number /* the event it belongs to — an epoch or any event between epochs */; before: Uint8Array; after: Uint8Array /* the event's touched set's records and faces before and after it, in the document codec (§2.9), compressed */; bytes: number }
interface HistoryStore {   // non-canonical, in the generation worker; spills past the device's store setting to the app's disk cache keyed by the document id and the event's seq; dropped whenever convenient, rebuilt by the verification replay
  images: Map<number, HistoryImage>; keyframes: Map<number /* epoch */, ChunkRef[]> /* every history.checkpointStride-th epoch: copy-on-write over the arenas, as §7.4's checkpoints */ }
interface HistoryDiff { fromWeek: number; toWeek: number; added: Id[]; removed: Id[]; changed: { id: Id; kinds: LifecycleEvent['kind'][] }[] }   // derived from the lifecycle block between the two weeks' log positions
// derived, never stored (V06 §3.15.2): the week from which a change without a Works is drawn
type EffectiveWeek = (change: LifecycleEvent) => number /* an engine op: its epoch's week (it shows at the end of the span); a dated dossier change: its own week; a hand edit: its event's week */
```

### 2.12 Lifecycle of every new state (create · read · persist · regenerate · undo · migrate)

The stretch-state profiles (`Enceinte.condition`, `RetainingWall.state`) follow §2.2 rule 5 for their canonical form,
writing, reading, regeneration, cut and join, undo and migration (E-01); their rows below state only this volume's
writers and readers, values and knot roles.

| state | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MutationPlan` | the use phase's openings and relocations, a hand `mutate … spread: 'epochs'` | the ladder phase's mutation step; descriptions; the clerk | model data, entities chunk | a re-derivation of its plot tombstones it (cause `rederive`), reported | the creating event's undo removes it; a step's undo restores `done` and the building | absent before V06: none to migrate |
| `MutationPlan.opensAt`, `.crypt` | at the plan's creation | the ladder phase; the crypt's re-derivation at the occupy step | with the plan | with the plan | with the plan | absent: `opensAt` = `occupy`, no crypt flag |
| `BuildingShadeMask` (one per arena) | the field phase of every epoch | §4.5's daylight driver at every field evaluation after that epoch, load included; V05's `shadeSky` on an island | model data, `fields` chunk | kept: Regenerate and brushes never rewrite it (the field re-derives from it) | the epoch's undo restores the former mask | a sampler digest mismatch (a table upgrade or an `editTable`) — the mask reads as zero building shade until the next epoch rewrites it whole, and the edit's dry run says so; absent = zero shade from buildings |
| `Enceinte.pathway` | the growth phase (superseded), the fortification phase (neglected), `contractWall` (contracted), `setAttr`; cleared by V06 §3.7.5's renewed threat and by a hand no-stretch `repairWall` | the fortification phase; §8.2's wall rows; exports | model data | kept (an enceinte is re-derived only by S7's operator, which carries it) | restored by the writing event's undo | absent = no pathway |
| `Enceinte.underuseSince` | the fortification phase | the contraction trigger | model data | kept; cleared by any hand change to the ring's trace (`drawWall`, `contractWall`, a `convert` on it) and re-derived at the next epoch | restored by the epoch's undo | absent = not under-used |
| an enceinte's condition by run (`Enceinte.condition`: `standing` · `worn` · `patched` · `breached` · `dismantled`, knot role `wall_state_knot`, each run's material and last-change epoch; file f item 575, item 114) | `wearWall` (V06 §3.7.7 (2) → `worn`), `breach` (V06 §3.7.3's neglect, V06 §3.7.7 (2)'s decay and a contracted ring's decay → `breached`), `dismantle` (V06 §3.7.2 (2) → `dismantled`), V05's landfall (→ `breached`, V05 §3.16 (4)) and `repairWall` (→ `standing` robust or `patched` by its material, V06 §3.7.5, V06 §3.7.7 (3)); the record's lifecycle rules: `abandoned` on neglect, `decayed` while a run is not `standing`, lifted by the no-stretch `repairWall` (V06 §2.8) | V06 §3.7.5's repair (the `breached` runs, in chain order, of a pathway ring and of a ring in use), V06 §3.7.7's decay and repair (the runs' condition, material and last change: patches rebuilt oldest first), the pathway's clearing and end (V06 §3.7.2 (3)), the no-stretch `repairWall`'s existence test, V06 §3.7.2 (2)'s candidates (a stretch under a standing raised gate kept), the towers and gates drawn by their run, T-V6-6's wall struck share, §8.2's `decayed` row (gap glyphs on breached runs, dismantled towers as trace discs), §11.1's per-run LineStrings with id and run, the `enceinte` provider and the clerk | §2.2 rule 5 | §2.2 rule 5 | the op's undo restores the former profile, materials and last-change epochs; `repairWall`'s undo restores the `breached` run and the record's former lifecycle | §2.2 rule 5 (absent = `standing` throughout; an absent material reads robust) |
| `Way.formerClass` | `downgradeWay`; V05's `fallIsland` (a covered way dropped to `track`; a way already carrying one keeps it) | `upgradeWay`, regrowth tier (5′), the landfall clearance (V06 §3.5.2), exports | model data | kept | the writing event's undo restores the prior value (absent where that event wrote the first) | absent |
| `Way.surface` — volume 1's field (V01 §2.7; file f item 207), this volume one of its epoch writers | at an epoch: the `field` phase's re-lay (V06 §3.4 (9): a `setAttr`, author `epoch`, cause `rule:field`, on a candidate whose rule value changed) and the landfall clearance's pair (V06 §3.5.2) | S14's road programs (V01 §5.1.2), the reader, exports | model data (V01's) | V01's: a re-derivation re-runs V01 §3.7.3 at S10a's end, an edited `surface` kept | the epoch's undo record restores the prior value | V01's (absent → the rule's value at load) |
| `Use.strain` | the use phase | the use phase | model data | kept | restored by the epoch's undo | absent |
| `WaterBody.spring.flow` — the base's field (§2.3; item 111), this volume its epoch writer | the `terrainWater` phase's spring rule and the `hazards` phase's `dry` operator (V06 §3.12.1, V06 §3.11.7), cause `rule:spring` or the drought's cause; the `dossier` step's reading of a removed `oasis_water`; a hand `setAttr` (T2 `ground`) | the base's water pull and water term (weighted by `flow`); the aqueduct's runs-dry rule; the gardens' and grove's thresholds; the report; V10's why | model data (the base's) | kept (a generated oasis re-derived with the site keeps its `flow` by the spring's lineage; a hand-made one is re-applied from its event, §2.3) | the writing event's undo | absent `flow` (a spring older than item 111) reads 1 |
| `EpochReport`, `ChronicleEntry` | every epoch (the replay's included) | the history panel, the clerk, `chronicle.csv` | non-canonical report block (§5.4) | rebuilt by replay | removed with the epoch | rebuilt |
| `HistoryIndex` | load and every fold | the timeline bar, `locate` | never | — | recomputed | — |
| `HistoryFrame` | a scrub outside the retain window, the APNG export | the renderer, then-and-now | never (memory) | dropped | dropped when its epoch is undone | dropped |
| `HistoryStore` images and keyframes | every committed event's commit (images); every `history.checkpointStride`-th epoch (keyframes); the verification replay after a load | `locate`, the frame builder and a group's undo after a reload (V06 §3.15.2, V06 §4.1) | memory, spilled to the app's disk cache — never in the document | rebuilt by replay | an undone event's image is dropped with it | dropped (a new output version replays) |
| an `advance` request's epochs | T1's time card, the clerk, the CLI — appended one `epoch` event at a time in one `group` | the fold | log (the epochs, each with `EpochInputs.advance`; `stoppedAt` on a stopped group's last) | — | one step while the last is the latest live event (V06 §4.1): in the session, the checkpoint before the group's first epoch is restored; after a reload, the state before the group is rebuilt from the nearest keyframe at or before it (the verification replay's, else the base) and the events between replayed; an unshared document then truncates the group, a shared one appends the `undo` and keeps the group in the log (§7.4 *Truncation*) | the epochs replay like any (§7.5); nothing is re-expanded |
| `Household.transit` | the displacing batch (the ledger's `displace`) | `siting`; the occupancy readers (§10.3) | never: empty at every epoch's end | — | the epoch's record | absent |
| `EpochOps.displaced`, `EpochOps.demandTaken`, the ledger | any phase or participant | the runner, `siting` | inside the epoch event only | recomputed by a replay of the epoch | the epoch event's undo | — |
| `LifecycleEvent.detail.why` (§2.8) | the use phase's `open`, `relocate`, `close`; a circuit's creation; a generated raised way's creation (V06 §3.19 (8)) | the `WhyProvider`s (V06 §4.5), V10 (its raised-way provider included), V09's panel, the report, `uses-history.csv`, the raised way's GeoJSON `plat:why` | model data, identity layer | kept with its lifecycle event | removed with its event | absent: no rows — the `use` provider answers from the present placement, marked "reason not recorded" |
| a building's crypt over epochs (V03's `Basement.crypt`, laid by V02's crypt ladder) | §2.6's basement function at S11; the op that gives a building an always-crypt class (a plan's occupy step, a dossier re-designation, a REPLACEMENT) | V03's rank, rooms and stairs; V09; V10; V04's crypt join | V03's model data (the ring); the rank's trim re-derived inside each causing event | re-derived with its building's basement; the basement never re-drawn while it stands; a trim never shortens `Basement.ring` (V06 §3.18.3 (3)) | the event's record | V03's rule |
| the crypt join's access | `under.extend` when catacomb growth reaches beneath a crypt | V04's excavation reading (transitive access); the chronicle | V04's `AccessPoint` (source `crypt`), its `AccessCause.event` the epoch's seq | kept; the pair's draw never re-drawn | the event's record | V04's rule |
| a catacomb's extent over epochs (V04's `CatacombComplex`) | V04's record | `under.extend` | V04's record | never below `extentFloorM2` (V06 §3.18.2 (4)) | the event's record | V04's rule |
| `EffectiveWeek` | derived from a change's lifecycle event | the frame builder, the scrubber, exports | never | — | — | — |
| `ProductDecl.phases`, `.participants`, `.rows` | a product's registration | the runner; the decline and hinterland steps (`rows`) | code; the rows a versioned table in the recipe's pins (§7.6) | — | — | an absent `rows`: the engine's own rules |
| the device's history settings (store MB, frames) | V09's settings panel (V09 §5.12; V09 §2.11's `AppPrefs.history`) | the history store, the frame cache | device storage | — | the setting's own | defaults |
| `EvolutionTable` rows, `evolution.*` params | shipped; `editTable`, `adjust` | every phase | tables in the recipe's pins and the log (§7.6) | an edit applies from the next epoch; standing history is never re-run (J-V6.28) | the edit's undo | §7.5's table migration |
| a suppression (`LifecycleEvent.detail.suppress`, §2.8; file f item 260) | the `delete` of a generated raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V09 §4.3's delete, the clerk, the CLI) — written by the delete operator when the entity's lifecycle cause is a generation or epoch rule | `RaisedWayLedger` and the fortification phase's waterfront rule at every epoch; the retaining-wall re-derivation where an epoch levels (V06 §3.19.4 (1)) and tier (5)'s deck faces (V06 §3.19.5 (1)); generation's S4, S6, S10–S11 and a new stage's S5b; `rerunFrom`'s re-apply; V10's "removed by you" | model data, identity layer, on the delete's lifecycle event (in the log) | read again at every regeneration: the log's live removals are replayed with it, and the generator skips the key | §2.8's one lift rule; **served** — never generated again, counted once — while the user's re-add stands, per kind as V06 §3.19.3 (3), (7) name the forms V09 §4.20.3 (4)'s Build it again emits (`drawWay { raised: true }`, `drawWall`, `placeGate`, `drawWall { kind: 'retaining' }`, `drawFootprint` on the deck), deleting the re-add leaving the removal in force | absent in an older document: no suppression exists |
| `RaisedWayLedger` | derived at each epoch's `raisedWays` step and at each generation | the pass and the generators; the report; V10 | never | re-derived | — | — |
| a reason key's uniform | `raised.reason` (§6.1), keyed by the `RaisedReasonKey`, epoch component 0 (V06 §3.16) | the gate at every generation and epoch | never: re-drawn identically from its key | the same value | — | — |
| the raised way's `reason` and `underuseSince` (the base record's fields, file f item 244) | `reason`: the generating rule (generation or the pass); `underuseSince`: the pass when the lapse condition first holds, cleared when it ends | the pass (disuse, repair, the count); V10; exports (item 447's `reason` word and `underuseSince`, V06 §5.3) | model data | `reason` kept (it is the lineage); `underuseSince` kept, re-evaluated at the next epoch | restored by the writing event's undo | absent: a declared or pre-item-110 way (no reason), not under-used |
| a span's and a support's condition (`state`, file f item 291) | the pool's `breach` and `dismantle`, `topple`, `inundate`, the landfall (V05) | the pass's repair and count; V04's arch vaults; the renderer; item 447's span and support `state` | model data on the raised way record | kept | the op's undo | absent = standing |
| a retaining stretch's condition (`RetainingWall.state`: `standing` · `decayed` · `ruined`, knot role `retaining_state_knot`; file f item 245) | the pool's `breach` (slump → `decayed`) and `dismantle` (stone taken → `ruined`) — V07's house-platform walls through this pool; V05's landfall (`decayed`); `repairRetaining` (→ `standing`); the restoration rule writes `standing` over the re-levelled length (V06 §3.19.4 (6)) | the pool, the restoration rule (V06 §3.19.4 (6)), V04's foundations (a footing stands while the wall stands), the renderer's decayed and ruined rows, item 447's retaining `state`, the clerk | §2.2 rule 5 | §2.2 rule 5 — a generated wall's re-derivation keeps its profile keyed by the wall's lineage until the restoration re-derives it intact | the op's undo; `repairRetaining`'s undo restores the former state | §2.2 rule 5 (absent = standing) |
| a deck's condition — its host's lifecycle existence (item 246's `Plot.deck.host`: a `Bridge` or a `pier` / `quay` way) | the pool's deck strike (`ruin` → `ruined`), a hazard (`breach` → `decayed`, `ruin` → `ruined`), V05's landfall (`ruined`) | V01's close-ups, V02's deck buildings (V02 §3.16 (7)), V05, the renderer's deck state rows, V06 §3.19.5 (1)'s tier (5), V06 §5.3's exports | the host record's lifecycle (model data); `Bridge.state` (`site` \| `built`) untouched — a ruined bridge stays `built` in plan, its crossing closed by its way's existence | kept | the striking op's undo; `repairRaised`'s deck form restores the host's former existence from that op's undo record | absent (no deck entry in the host's lifecycle) = standing |
| `EpochScope.raised`, `.levelled`, `.recut`, `.workings` | derived from the epoch event's lifecycle entries so far | W64's reader list, per field; volume 3 reads none (W64) | never | recomputed by a replay of the epoch | — | — |
| `EpochInputs.replay` and a replay epoch (V06 §2.14) | the replay runner at generation (V06 §3.20.3): the creation prefix's `epoch` events, flag `creation` | the fold (the ordinary runner); `HistoryIndex`; the report; the clerk | log (the creation prefix) | a Re-derive from S1 or a `generate` re-runs the replay from the recipe's history (the same seed and history: the same prefix) | never an undo target (§7.4 *Replay semantics*) | an older document has no replay epochs; nothing is replayed at load but the log |
| `HistoryRecord` (§2.7), `Provenance.symbolic` (§2.8) | the replay runner, once at generation (V06 §3.20.6) | V10's story, the reader, the exports' history block (§11.1), §7.7's history rows; V04 (`buried`) | model data (the record); provenance derived | re-written by a replay re-run; untouched by live epochs | with the creation prefix: never undone | absent: a document generated without a known history |
| `ReplayPlan` (V06 §2.14) | derived at generation from the history and V11's cells | the replay runner | never | re-derived identically from the seed and the history | — | — |
| a dossier catch-up's coarse epochs (V06 §6.8 (6)) | the port's catch-up (V08's rule), one epoch per k crossed year ends at the cadence the estimate chooses | the fold | log (the port's `epoch` events at their weeks) | — | no undo, redo or revert target (§7.4 *Replay semantics*) | a catch-up folded before the coarsening keeps its epochs as they stand |
| `frontierFor`'s answer (V06 §3.22 (2)) | derived at each call over the model the view draws | §10.2's refugee-camp placement | never (memoized per model digest and count, in memory) | re-derived over the new state | re-derived: an undone epoch's state answers again | — |
| `crisisLookYields` (V06 §3.22 (3)) | derived from a building's Works weeks and the overlay's `sinceWeek` (false for a preview's `null` overlay) | §8.2's disaster look row; V02's ruined exterior; V03's look damage | never | — | re-derived: an undone Works yields no more | — |
| the decay level and its peak (`decayLevel`, `decayPeak`; V06 §3.23) | derived from the lineage's lifecycle events at the weeks their changes show (V06 §3.23 (1)), each element's entry week, a restoring Works' progress and V11's rates | W94's readers | never | re-read: a re-derivation keeps the lifecycle, so the same level; a rebuild's new plan reads 0 | re-read: an undone epoch's events gone, the earlier level | every building before E2 lands reads the default-age form of its state (V06 §3.23 (4)) |

### 2.13 Item 110's epoch records — the reason key and the ledger

```ts
// RaisedKind and RaisedReasonKey { kind: RaisedKind; a: Id; b?: Id } are §2.7's (beside RaisedWayRecord); this volume's readings fill a and b:
  // viaduct: a = the carried way's lineage, b = the crossed ravine or valley feature (the terrain's lineage and the feature's ordinal in Terrain.features);
  // elevated: a, b = its two endpoints' lineages (a high ward's district, a terrace district, the citadel's or a great temple's reservation), in address order;
  // aqueduct: a = the settlement root, b = the source (a spring as S1 records it, or a river WaterBody's lineage).
  // Address: 'raisedReason:' + hash64(kind, a, b) (§6.3). It is also the generated raised way's derivation unit (V06 §3.16; §4.3).
interface RaisedCandidate { key: RaisedReasonKey; value: number /* the reading: the drop (m), the rise (m) or the need ratio */; threshold: number;
  strength: number /* metres saved − span × spanCostFactor; mean prosperity × landmark factor; the need ratio */; met: boolean;
  u?: number; p?: number /* the gate, when met */; outcome: 'admitted'|'repaired'|'standing'|'chance'|'cap'|'suppressed'|'noCourse'|'capsCannotPay'|'rung';
  /* 'suppressed': a key a live removal holds and no re-add serves — read and gated as any other, never admitted (V06 §3.19.3 (2)); a served key reads 'standing' */
  why: WhyRow[] /* the rows written on the creation event (V06 §3.19 (8)) */ }
interface RaisedWayLedger {   // derived, never persisted: at each epoch's raisedWays step and at each generation
  rung: Rung; gate: boolean /* the rung admits generation: CITY or METROPOLIS (owner provenance) */;
  kinds: Record<RaisedKind, { cap: number /* V11's raisedWays row at the rung */;
    standing: Id[] /* generated raised ways that count: every generated way not released (V06 §3.19.1 (3)) */;
    declared: Id[] /* raised ways whose lifecycle cause is an edit or a skeleton file (the dossier declares none, V06 §3.19.1 (2)) */;
    suppressed: RaisedReasonKey[] /* the reasons the log's live removals suppress */;
    count: number /* standing + suppressed + declared (V06 §3.19.1) */; candidates: RaisedCandidate[] /* every key evaluated, admission order */ }>;
  total: { cap: number; count: number } }
```

The ledger is a pure function of the model and the log: its suppressed set is the `suppress` (§2.8; file f item 260) of
every live `delete` in the log of kind `raised` (the other kinds are read the same way by their own generators: the
waterfront rule, the levelling's walls and tier (5)'s deck faces); its counts read the standing raised ways' `reason` and
lifecycle cause. Its export and its callers are §4.3's (file f item 290), so no generator can exceed a cap or re-found a
suppressed reason on any path. The suppression's keys per kind are §2.8's; islands and sky accesses keep volume 5's record
form under the same lift rule (E-02: kept apart, file f item 260).

### 2.14 The history replay's records (item 113)

```ts
interface ReplayPlan {   // derived at generation (V06 §3.20.1) from the recipe's history (HistoryHint with its peak, §2.7; DR36–DR38) and V11's history cells; never persisted — the creation prefix it produces is the record
  peak: { rung: Rung; population: number; symbolic: boolean; evidence: string[]; yearsAgo: number /* when it stood: dated by its evidence, else replay.symbolicPeakAgeShare × the age */ } | null;
  start: { yearsAgo: number; population: number; from: 'founding'|'peak' /* the model S0–S13a builds before the first replay epoch */ };
  epochs: ReplayEpoch[] /* oldest first, contiguous, the last ending at the present (yearsAgo 0) */;
  epochYears: number /* the epoch length the plan runs at: history.epochYears, or the coarsened length (V06 §3.20.1 (3)) */;
  coarsened: boolean /* epochYears > history.epochYears: the span needed more than replay.maxEpochs epochs, or the estimate exceeded replay.budgetMs (V06 §3.20.1 (3), V06 §6.8) */ }
interface ReplayEpoch { index: number; fromYearsAgo: number; toYearsAgo: number /* the span it covers, (to, from] in years ago */;
  populationTarget: number /* populationHistory's value at its end where given, else interpolated (V06 §3.20.1 (3)); the present's at the last */;
  events: ReplayEventRef[] /* the history's events inside its span, oldest first (V06 §3.20.2) */;
  destruction?: { cause: 'terminalDeath'|'catastrophe'|'fall'; event?: string /* the event or lifecycle id (DR38) */ } /* the epoch ends the old settlement (V06 §3.20.5) */;
  refound?: { population: number; culture?: string /* the history's culture row for the new settlement */ } /* the epoch founds the new one on the ruins */ }
interface ReplayEventRef { type: string /* SettlementForge's event type (V08) */; yearsAgo: number; severity: number /* 0–1 */; source: 'event'|'calamity' /* the history's events, or calamityHistory (typed by V06 §2.4's calamity table, DR28) */; row: string /* the HistoryEventRow (below) or CalamityRow it mapped to */ }
// the event-to-epoch rows — V11 ships the rows (the table values of item 113), this volume reads them through this shape; one row per SettlementForge event type, an unknown type taking the row 'none'
interface HistoryEventRow { type: string;
  effect: 'hazard'|'population'|'slice'|'uses'|'destroy'|'none';
  hazard?: string /* effect 'hazard': a HazardRow kind (V06 §2.4) — great_fire → fire, great_flood → flood */;
  populationFactor?: number /* effect 'population': × the epoch's target when populationHistory gives no value there — plague_years, trade_collapse, market_crash, demographic_pressure (> 1) */;
  slice?: Partial<CircumstanceSlice> /* effect 'slice': applied from the epoch on — external_threat, occupation_legacy raise the threat */;
  uses?: { cls: string; perThousand: number /* households per opening */ }[] /* effect 'uses': openings of these classes in the epoch — pilgrimage_surge's hostels, occupation_legacy's garrison */;
  severityScale: [number, number] /* the effect's scale at severity 0 and 1, linear between; for effect 'destroy', the first end is the severity at or above which the event destroys, below it recorded only (V11 §3.25.2) */ }
// EpochInputs.replay is §4.11's (item 113); ReplayEventRef and ReplayEpoch are declared above
```

`HistoryRecord` (§2.7) and `Provenance.symbolic` (§2.8) are the base's records; this volume is their one writer (V06
§3.20.6). `ReplayPlan` is derived, so a changed history reaches the map only through a re-run of the replay (a Re-derive
from S1 or a new document), never by editing the prefix (V06 §3.20.7).
=== END ===
=== REPLACE ### 3.3 Epoch inputs ===
### 3.3 Epoch inputs

**3.3.1 Dossier-bound.** The port folds epochs (at §4.11 *The clock* (4)'s cadence; a catch-up whose epochs at that
cadence would pass the comfort level folds coarser, V06 §6.8 (6), a calamity then riding the coarse epoch that holds its
week) with the week, the target, the slices, the calamity records (typed by the calamity table, DR28), the
wealth level (DR6) and that week's dossier events. The engine reads them and invents none of them: the population target,
the slices and the calamities are the dossier's; everything else the map derives (item 20 (h)). `advance` is refused
(J-V6.2), offering the detached what-if copy, and spontaneous hazards are `none` by rule (J-V6.19).

**3.3.2 Standalone: `advance(trajectory)`.** The request expands, before anything is appended, into `n = ⌈spanYears × 52 ÷
cadenceWeeks⌉` epochs. Above `advance.maxEpochs` the request **bends**: the cadence becomes the smallest whole number of
weeks that fits, `⌈spanYears × 52 ÷ advance.maxEpochs⌉`, and the card and the clerk say so in one line ("a 500-year history
runs in 130-week steps") — item 101 R2's bend, never a refusal. **Then the comfort level** (item 119 (a2), the owner's
"Total"; J132; J-V6.135): V06 §6.8's estimate of those epochs, their targets by the rules below, is compared with
`advance.budgetMs`; above it the cadence
becomes the smallest whole number of weeks, tried upward from the cadence so far, whose epochs' estimate fits — fewer,
longer epochs, as V06 §3.20.1 (3) coarsens the replay; one epoch at the span's end always fits (V06 §6.8 (3)) — and the
card and the clerk say so in the same one line with the cadence chosen ("a century runs in 5-year steps to finish within
ten seconds"): a bend, never a refusal and never a shorter span. The estimate reads the request and the document at the
request only, never a measured time, so the cadence is deterministic and a replay of the log folds the same epochs; every
epoch of the group reports the cadence it folds at and the one asked (`EpochReport.advance`, V06 §2.10). `cadenceWeeks`
below is the cadence so chosen. With `W0` the document's week and `P0` its population (the
last epoch's `populationTarget`, else the population the recipe resolves at S2), epoch `i` (1 … n) sits at
`W_i = W0 + min(i × cadenceWeeks, spanYears × 52)` (integer weeks; `spanYears × 52` rounded half-up to a whole week), with
`f_i = (W_i − W0) ÷ (W_n − W0)` and:
* population — `rate`: `P0 × (1 + perYear)^((W_i − W0) ÷ 52)` through `dmath.pow`; `target`/`linear`: `P0 + (T − P0) f_i`;
  `target`/`logistic`: `P0 + (T − P0) · (L(f_i) − L(0)) ÷ (L(1) − L(0))`, `L(f) = 1 ÷ (1 + e^(−8 (f − 0.5)))` through
  `dmath.exp` (8: our own, a sigmoid that spends most of its change in the middle of the span); `points`: piecewise linear
  in the week, `P0` held before the first point and the last point's value after it; each rounded to the nearest integer
  (half up) and clamped to **the union of the registered products' ladders** (§1.1's router) — [1 500, 120 000] with the
  town product alone; [0, 120 000] with volume 7's village product registered, where a target of 0 is admitted as the
  deserted outcome V07 §3.12 designs — a clamp reported (J-V6.5, J-V6.61). An epoch whose product the fold changes
  (V07 §2.1) runs that product's phase overrides (V06 §3.1 (4)), so a village grows into a town and a town that falls
  below 1 425 is handed down to the village product, by V07's hand-off rules;
* the slice — the document's current slice (the last epoch's, else the recipe's creation slice) with `trajectory.slice`
  applied from epoch 1;
* the wealth level — `hold` keeps the current; `target` interpolates linearly in `f_i`;
* the events — every `trajectory.events` entry whose week lies in `(W_{i−1}, W_i]`, in the given order.

**Degenerate requests** (each a bend or a no-op with its line, never a refusal; item 101 R2; T-V6-23): a `spanYears` that
is not a finite number above 0 appends nothing — a no-op with the line "no time to advance"; a positive span under half a
week is read as one week, so `W_n > W0` and `f_i` is always defined; a `cadenceWeeks` that is not a whole number of at
least 1 is rounded half-up and floored at 1 week ("the history steps at least a week at a time"); a cadence longer than
the span gives one epoch at the span's end; `points` are sorted by week, a repeated week keeping the last point given and
a point at or before `W0` dropped (the past is the log's), each reported; a `rate` with `perYear` below −1 is read as −1
(the population falls to 0 at the first epoch and the clamp applies); any population value that is not finite (an
overflow of a large rate) reads as the ladder union's top before the clamp; a `target` or a point below 0 is clamped with
the rest. A trajectory whose every epoch is clamped to the present population appends its epochs (time passes, the
events and slices apply), and the preview says the population holds.

The app appends the epochs one at a time in one `group` (§7.4), each folded before the next is built, so a century runs
as a cancellable background job whose progress shows past one second (V09 §4.21.9's progress view, counting the epochs at
the cadence chosen) and whose completed epochs stand if it is stopped (V06 §4.1). A
replay folds the stored epochs; the trajectory rides only as provenance on epoch 1 (`EpochInputs.advance`).

**3.3.3 Growing from a founding.** At creation, T1's card may set "start small": the document is created at the founding
population (default the lowest registered ladder's floor — 1 500 with the town product alone, a hamlet's with volume 7's)
under the same recipe, and an `advance` with a `target` trajectory to the requested population over the requested span
(default 200 years at 52-week cadence, coarsened under the comfort level as any `advance`; the founding's generation,
§12.3's law at the ladder's floor, fits inside `advance.budgetMs`'s one-second reserve, V06 §6.8) follows as its first
group. The town that results is a history the user chose to
watch, beside the one-click town at that size and beside history-first generation (V06 §3.20), which replays a *recorded*
history at creation; all three are offered (J-V6.4 superseded by item 113; J-V6.127).

**3.3.4 The standalone timeline.** A `Recipe.circumstances` entry (§7.7) whose week lies beyond the document's week is
shown on the timeline bar as a proposal; "bring the town to this date" appends the epochs a `points` trajectory through
the entries gives, each entry's slice and events applied at its week.

**3.3.5 The wealth level over time.** `EpochInputs.wealthLevel`, when present and different from the level in force by
more than `dial.hysteresis` (0.05, §4.11), replaces it: layer 1's expansion rows (§7.7 item 1) re-map
`field.characterOffset` and the granularity bonus from it before S6 re-evaluates the drivers, and item 71's class mix
reads it for every placement of the epoch. Absent, the level in force holds. A dossier's changed prosperity word reaches it
through V08 §3.5's diff row `wealth` (DR6; receipt F9).
=== END ===
=== REPLACE ### 3.5 Decline ===
### 3.5 Decline

**3.5.1 The departure matching (step (c), first half).** When the epoch's target lies below the manifest, the roster's
suffix leaves in reverse ordinal order (§4.11), a locked or pinned household passed over by (1) — that fixes WHO leaves. WHERE the town empties is the exposure field's
(item 8 (c)), so the phase matches the two:
1. For each band `b` in the band order (poorest first; §4.5's cuts), `L_b` = the leaving households of band `b` — the
   roster's suffix in reverse ordinal order (§4.11), each locked or pinned household passed over for the next household
   below it in that order that is neither (§7.2: a locked household is a fixed input, a pinned one keeps its
   existence). Under a dossier population fall that the unlocked and unpinned households cannot meet, the locked and
   pinned ones leave too, in the suffix order, each lock or pin reported orphaned (§7.7's precedence; T20-16). Under any
   other fall a locked or pinned household never leaves, and a fall the others cannot meet is met short by it, counted
   `households.heldByLock` — `n_b = |L_b|`.
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
   of its band, so a protected building stays occupied. When its band has no emptying dwelling to refill from, under a
   dossier population fall the household still leaves and the protected building keeps one household fewer (a `relet`
   down, to 0 at its last household; §7.7's precedence); under any other fall it leaves only while the building keeps
   another household (a `relet` down), and the building's last household stays — passed over as (1) passes a locked
   household, the next household below it in the suffix's order that is neither locked, pinned nor such a last
   household leaving in its place (its dwelling let down by one, `vacate`d at its last, (5)), else the fall met short by
   it (`households.heldByLock`) — so the building keeps at least one household (§2.6's clamp); counted
   `uses.heldByProtection` in the report in either case.
5. **Ops** (§4.11's `LadderOp`/`DeclineOp`). `relet` down where a building keeps households, `vacate` at the last —
   never at a locked or pinned building: a dossier population fall lets its last household out by a `relet` down to 0,
   the building keeping its state (§7.7's precedence); any other fall never takes it ((4)); a dossier-backed use in an emptying building is relocated first (*Dossier content
   across epochs*). Departures take no churn cap: the population is the truth, and a fall's households leave at once
   (item 8 (f)).

So an undefended suburb, a damp low quarter and the plot beside the tannery empty first, the market core last, and a core
house can still empty — the draw's `u` is the chance share (J-V6.9). **Which dwellings empty is decided by this matching;
the strike pool strikes fabric only** (file f item 479 applies this to §4.11 step (c)).

**3.5.2 The strike pool (step (c), second half).** The **strike pool** is the base's per-district draw (§4.11 *The strike
pool*): it runs **once per district over one pool** holding every layer's candidates, so the persistence rates set the
layers' shares (§4.11's decline table). Each candidate's weight is `w = E(x) · rate(layer) · u`, `u` its first draw on
`stream(EVO_DECLINE, entity)` for the epoch; strikes are taken **in descending `w`, ties by address, with no second
draw** (the `u` inside `w` is the pool's only chance), until the district's `fabric` churn cap or the 2-plots-per-block
bound stops it:
* **building** (the `building` row): an `abandoned` building whose `decay` Works has run its span (→ `decay`, starting
  the next `decay` Works toward `ruined`, §4.11 *Works* (5)); a `decayed` building whose `decay` Works has run (→ `ruin`);
  a `ruined` building with salvage demand in its haul radius (→ `robStone` for masonry, `clear` otherwise), its weight ×
  `min(1, demand ÷ yield)` — the salvage mark of §4.11 — and with no demand never a candidate, so a ruin beyond any
  building stands (the owner's "occasional old decrepit buildings or ruins"). Over these states a building's plan shows
  its damage at its decay level (V06 §3.23).
* **plot boundary** (the `plotBoundary` row): a plot whose every building is `cleared` or `reused` (or that has none), not
  an informal plot with structures, empty for at least its drawn `plots.mergeAfterYears` — drawn on
  `stream(EVO_DECLINE, plot)` keyed with the epoch in which it emptied (§6.1's epoch component), so the same span is
  re-drawn every epoch without being stored. A struck plot is `amalgamate`d into an occupied neighbour of its block sharing
  a boundary **that carries no `RetainingWall`** (item 110 (a): a merge never deletes a terrace wall; V06 §3.19.4), with
  `plots.amalgamateWeight` against `plotToGarden` on its second draw — the neighbour with the longest shared boundary,
  ties by address — or, with no such neighbour, `plotToGarden` (which keeps any retaining wall on the plot's lines: a
  terraced garden), the kind by area (`plots.gardenKinds`) — surviving households absorb the plots beside them and the plan
  coarsens (item 8 (c)). The same layer takes two more candidates at the plot-boundary rate: **a cleared rear building on
  a lived plot** — `cleared` for its drawn `plots.mergeAfterYears` (keyed as above, from its clearing) while its plot's
  front building is lived in — is struck to `reuse … as 'garden'`, its trace joined to the plot's yard (§4.9), so an old
  back-court ruin becomes the yard's garden instead of standing overgrown for ever (item 8 (a)); and **a passage whose
  served rear plots have all been vacant** (no occupied building) for their drawn `plots.mergeAfterYears` is struck to
  `sealPassage` (§4.11 *Hidden plots over epochs*), its buildings entering the decline ladder as the base states;
  regrowth reopens it first (V06 §3.8.2).
* **street** (the `street` row): a way of `streets.classes` every fronting plot of which has been empty, garden, orchard or
  field for `streets.abandonAfterYears`, that carries no live plot's only access edge (the access test of §4.7) and is
  neither locked nor pinned (→ `downgradeWay` to `path`; a `track` to `path` as well). The line persists; regrowth
  upgrades it back before it cuts a new lane (V06 §3.8).

**The product's rows** (`ProductEpochRows`, V06 §2.1). At an epoch whose product declares `rows` (V07's village), the
same pool reads them and nothing else changes: a building's rate is × `persistence[class]` for the class of its live or
last use (V07's church × 0.3, manor × 0.5 — churches outlive their villages); and the street candidate takes
`street.classes` and issues `street.op` — at a village rung V07's retirement of a disused way to a **hollow way**
(`retireWay` → `abandoned`, file f item 268; V07's `DeclineOp` members) in place of `downgradeWay`. **With `op:
'retireWay'` the test is stricter** (J-V6.107), because a hollow way leaves every router while a downgraded one stays in
the network: besides the street test above, a way is a candidate only when it carries no entry, approach or landing (V07
§3.12's disuse test: no route beyond the frame is ever cut) and its retirement would leave no gate, frame exit or occupied
plot without a path over the ways still in use (§5.3's network invariant, evaluated on the network less that way) — both
filtered before the draw (J-V6.7). **Struck again.** When the rows declare `again`, a hollow way in `op`'s result
(`abandoned`) is a candidate of the same kind at the same rate once its dwell band has run since its retirement — the
first band of §4.11's decline table (vacant → derelict), drawn once on `stream(EVO_DECLINE, way)` keyed with the
retirement epoch (its `Lifecycle.since.epoch`; V06 §3.16) — and a strike issues `again` (`effaceWay` → `decayed`); a way
in `again`'s result is never a candidate again (its line stays as a trace). **Reopened** — `reopen` is issued by
regrowth and by every placement, never by the pool: by tier (5′) before a cut and by the placement rule before any
placement an epoch makes on a plot a hollow way serves — a siting tier's, the use phase's opening or move, a
dossier-backed use's relocation (V06 §3.8.2). The candidates' keys, caps and the draw are otherwise this section's.

The same pool holds item 110's three kinds (V06 §3.19), at their decline-table rows (file f item 291): **raised** — the
spans of a disused raised way (`breach`) and their rubble and freed supports (`dismantle`, on salvage demand only)
(V06 §3.19.2); **retaining** — a stretch of a generated retaining wall under abandoned terraces (V06 §3.19.4); **deck**
(the street's row) — a deck whose crossing is dead and which carries no occupied plot (V06 §3.19.5).

**landfall** (the street's row; J-V6.99) — the members of a `fallen_island` decoration a landfall left on the ground
(V05 §3.16 (4)–(5)): the covered ways, retaining walls, plots and reservations. Each member's weight is `w` × `min(1,
demand ÷ yield)` of the salvage ledger's demand in its haul radius (§4.11 *Salvage*; the landfall's rubble was credited to
it, V05 §3.16 (6)), so rubble is cleared where its stone is wanted and, with no demand, a member is never a candidate;
strikes are charged to the `fabric` cap of the member's district. A struck **way** member takes back its routing class
and surface — a `setAttr` pair, cause `rule:landfall`: `class` to its `formerClass` (which the landfall wrote; cleared by
the pair) and `surface` re-laid by the base's surface rule for that class at its district's band (volume 1's `way.surface` rows, V11
row 90), as a cleared road is re-laid (absent `formerClass`, a landfall made before this rule: the class stays `track`, the surface is re-laid,
reported `landfallClassUnknown`); a struck **retaining-wall** member is restored by V06 §3.19.4 (6) (cause
`rule:landfall`); a struck **plot** or **reservation** member leaves the decoration, its `ruin` treatment ending, so
regrowth tier (3) may build on it. The landfall's **`quarry`** face (a covered `LandUse` V05 §3.16 (4) turned into the
surface rubble working whose `source` is the decoration) steps to `commons` by `retypeLand` after `land.scrubAfterYears`
(drawn once on `stream(EVO_DECLINE, landUse)` keyed with the epoch of the fall) once the salvage ledger's credit from it is
spent.
**Every member leaves by the op that ends its cover** (J-V6.108) — a `setAttr` of the decoration's `members` in that op's
batch, removing the member in its `DecorationMember` form (V05 §2.6; file f item 252: an `Id`, or `{ raised, span: [a,
b] }` or `{ raised, support }` on item 244's support keys, which a re-derivation of the raised way keeps): a **way**,
**plot** or **reservation** member when this kind strikes it (above); a **retaining-wall** member in the batch of the
`repairRetaining` that restores its covered stretches — this kind's, or an earlier re-levelling's (V06 §3.19.4 (6)); a
**land-use** member in the batch whose `retypeLand` steps its `quarry` face to `commons`; a **raised span or support**
member in the batch of the op that repairs it — `repairRaised` (V06 §3.19.2 (5), the engine's or a hand `convert`; a
span's repair restores the ruined supports at its ends with it, V06 §2.8) — or clears it — `dismantle` (V06 §3.19.2 (3));
and a member tombstoned by any other op (a hand `delete`, a re-cut, a clearing under a new raised way) in that op's batch.
The decoration is tombstoned (cause `rule:landfall`) in the batch that removes its last member, whichever op that is, so
the rubble drawn over the members' faces never outlives their cover. A raised part that is never repaired and never
salvaged stays a member, and the decoration stands with it, as its ruin does.
**Accesses under the rubble** (V04 §3.10 *Access closures*). In the batch in which a member leaves the decoration, every
`AccessPoint` that V04 §3.10 bricked with cause `convert:fallIsland` and whose ground host is that member takes a
`setAttr` of its `state` back to `open` — `locked` where its `knownTo` is `secret` — cause `rule:landfall`, by V04 §3.10's
rule that an access's state changes only with its host; the member's face enters `EpochScope.surfaceChanged`, so
`under.access` at `afterGrowth` re-derives the excavation reading and re-evaluates the openings over it in the same epoch
(V06 §3.18.1 (2d)), and a lived void whose only access this was is `accessible` again from that epoch (a `lost` one
refound, item 113 (e)). Counted in the report's `landfall` section, chronicled `landfallCleared` ("{year}: the rubble of
{subject} is cleared from {district}."). V05 §3.16 (4) cites this rule as the clearance it leaves the rubble to.

Enceinte walls are not in the pool (their pathway is V06 §3.7's), nor is the underground (V04's `under.fade` participant
runs after the pool at this step), nor terrain and water (V06 §3.12). Candidates beyond a cap wait, in the key order, and
are first in line next epoch (§4.11 *Churn*).

**3.5.3 The hinterland over epochs (item 26).** A struck farmstead's fields stay worked (§4.11), their owner passing to
the nearest farmstead or the commons. A `plotToGarden` on the town's edge whose district is the hinterland
pseudo-district joins the adjacent `LandUse` face of the same kind (§4.9's hinterland unit), so the countryside creeps
back into an emptied suburb. The fields follow the food demand, read at each epoch from S2's demand for farm households
and food (item 26, §4.2 S2) against the worked area the hinterland unit's rows give per household:
1. **Decline — the fallow ladder.** When the worked arable area exceeds the demand's by more than `dial.hysteresis` of it,
   the surplus faces — farthest from any live farmstead first (way-graph distance, ties by address), and never a locked,
   pinned or dossier-listed face — step down one rung each when their drawn span has run: `arable` or `strip_field` →
   `pasture` after `land.fallowAfterYears`, `pasture` → `commons` after `land.scrubAfterYears`, `commons` → `wildwood`
   after `land.woodAfterYears` (each span drawn once on `stream(EVO_DECLINE, landUse)` keyed with the epoch the face
   entered its present kind; the entry week read from its lifecycle block). Each step is a `retypeLand` op (V06 §2.8)
   charged to the `fabric` cap of the hinterland pseudo-district. At an epoch whose product's rows declare `hinterland`
   (V07's village) the slack is `hinterland.slack` in place of `dial.hysteresis`, the order `hinterland.order` and the cap
   `hinterland.cap`, the ops still `retypeLand`. Meadows, orchards, vineyards, coppice, quarries, mines and fisheries are
   not on the ladder (they are worked by their own uses, which the use phase closes); an oasis's gardens follow their
   spring (V06 §3.12.1), not this ladder.
2. **Growth — the re-take.** When the demand exceeds the worked area, the hinterland re-takes its own ground first —
   `pasture` → `arable`, then `commons` → `arable` (nearest a farmstead first), each a `retypeLand` — and only then S12a
   sites new fields on new ground (the grow path, §4.11). `wildwood` is cleared only by S12a's own rows (an assart), never
   by the re-take.
3. **Farmsteads** are buildings and follow V06 §3.5.1–V06 §3.5.2 like any; a farm household that leaves empties its
   farmstead, whose fields then enter the ladder above.
=== END ===
=== REPLACE ### 3.7 Fortification — new circuits, old rings, shorter rings ===
### 3.7 Fortification — new circuits, old rings, shorter rings

**3.7.1 A new circuit, and the suburbs absorbed.** Evaluated once, when the growth phase grows a stage — on a
dossier-bound document only when the dossier gate admits one (V06 §3.7.6 (4)). All must hold: `threat ≥ walls.threatMin`
(the slice's; DR2 for a dossier); the share of households outside the outermost enceinte — the new stage's counted —
`≥ walls.extramuralShareMin`; the town's household-weighted mean prosperity `≥ walls.prosperityMin` (walls cost money);
the youngest enceinte's creation (its lifecycle's `since`, read to a week through its `EpochRecord`) at least
`walls.minIntervalYears` ago, or no enceinte at all; and the era row admits walls (S0's walls toggle rows, §4.2). Then the
circuit fires when `u < 1 − (1 − walls.chancePerYear × eraFactor)^years`, `u` the first draw on
`stream(EVO_GROWTH, town root)`. The circuit's creation event records the four conditions' values as its why rows
(`detail.why`: `walls.threatMin` with the threat, the extramural share, the prosperity mean, the years since the youngest
enceinte), which the `enceinte` provider reads (V06 §4.5).
A circuit makes the new stage a walled ring with `placement: 'aroundAll'` — it encloses every earlier stage **on its
approachable arcs** (item 106 (a): barrier arcs close the circuit and are not walled, V06 §3.7.6 (1)), so the suburbs
between the old outermost ring and the new one are **absorbed** (S5a's trace by the registered `EnceinteStrategy`, S7's
furniture). The stage's land is widened, **on the arcs the trace walls only**, so that the new ring's inner strip lies
wholly on new land: `t_k` (§4.4 S5a) is raised on those arcs until the lattice distance from every existing footprint to
the boundary is at least the strip's width + `growth.ringBlockM` (one block depth), the supports of a raised way the
trace crosses excepted within one strip width of the crossing (§2.7's support step (6) re-sites them, V06 §3.7.6 (5))
— the built-face legality then never binds on the trace; barrier arcs keep the stage's own boundary, so the boundary is never pushed into the sea or over a
cliff. The absorbed districts' context changes (`extramural` false); the character step (i) re-types their kinds past the
identity's hysteresis (item 72) and the exposure field drops its extramural term for them from the next epoch. The old
outermost ring enters its pathway with cause `superseded` (V06 §3.7.2). F-WALL's ladder (§5.2) binds the trace; a trace
that fails it leaves the stage unwalled, the circuit re-evaluated at the next growth (reported).

**3.7.2 The pathway of a superseded ring** (the owner: "a wall might move over decades being deconstructed into a road as
they build a newer outer ring"). At supersession: `neglect` on the ring (existence `abandoned`), `Enceinte.supersededBy`
set (base), and `pathway = { since: week, cause: 'superseded', fate, eligibleWeek }`: `fate` = `keep` while `threat ≥
walls.keepThreat`, else drawn from `walls.fateWeights` on `stream(EVO_FORT, enceinte)`; `eligibleWeek = since + round(52
× y)`, `y` drawn uniformly in `walls.roadAfterYears` or `walls.absorbAfterYears` by the fate. A `keep` is re-drawn once,
the first epoch its threat falls below `keepThreat`. Each epoch the `fortification` phase then, for every ring with a
pathway and not locked (address order):
1. **Gates open.** Each gate of the ring, from its drawn `walls.gateOpenAfterYears` (its first draw on
   `stream(EVO_FORT, gate)` keyed with the pathway's epoch), at `walls.gateOpenChancePerYear` → `gateToJunction`, with a
   square when three or more primaries meet there (a gate market).
2. **Stretches dismantled.** The trace is cut into `walls.dismantleStretchM` stretches from its first tower in address
   order; each whose run of `condition` is not yet `dismantled`, at `walls.dismantleChancePerYear × min(1, 0.2 + demand ÷
   yield)` (the salvage demand in its haul radius against its yield; our own floor 0.2) → `dismantle` with the stretch
   (its run → `dismantled`), crediting the ledger (§4.11 *Salvage*); charged to the `fabric` cap of the district the
   stretch's midpoint lies in. A stretch that holds a raised gate whose deck stands is no candidate, filtered before the
   draw (J-V6.7), until that raised way is removed or its crossing span `dismantled` (V06 §3.7.6 (5)).
3. **The end.** From `eligibleWeek`, with `threat < keepThreat`: `road` → `wallToWay` (§4.11, its clearance with lifecycle
   events; its dossier-backed uses relocated first); `absorb` → `absorbWall` (V06 §2.8): its strips' setback and glacis
   lines are removed so the strips merge into the blocks beside them, and S10's incremental re-cut cuts plots on the freed
   land with the neighbours fixed (§4.7 S10 (7)) — the backs of the plots now meet on the old line; the remaining runs keep
   their `condition` on the `cleared` record, their towers and gates with them (a `dismantled` run's towers drawn as trace
   discs), and step (2)'s dismantling continues on them — the fortification phase keeps the cleared record in its loop —
   until every run is `dismantled` but a stretch holding a raised gate under a standing deck (V06 §3.7.6 (5)); a tower or a
   gate is no building and never a pool candidate (J-V6.112). Neither fires on a ring that is itself the innermost
   enceinte of a castle or a citadel (`kind` `citadel` or `bailey`), which keeps its `keep` fate.
The ring road takes its name from S13a with the naming feature `formerWall` (V06 §5.2). An absorbed wall draws no label;
its cleared record and lifecycle are what the `enceinte` provider reads for the clerk's answer ("the old wall ran along
these plot backs until year N", V06 §4.5).

**3.7.3 An outermost ring in long safety.** An outermost, unsuperseded ring whose `threat ≤ walls.neglectThreatMax` has
held for `walls.neglectAfterYears` (read from the epochs' slices, §2.9's `EpochRecord`s; counted from the later of the low
threat's start and the ring's last lifted neglect, V06 §2.8's no-stretch `repairWall`) enters its pathway with cause
`neglected` and fate `keep`: `neglect` at once; its gates open as in V06 §3.7.2 (1); its stretches decay by V06 §3.7.7
(2) — worn, then `breach`ed (each a `breached` run of the ring's `condition`) at `walls.breachChancePerYear` — in the
strike pool's `fabric` cap, the decline table's `wall` row as the stretch's weight factor. It takes no final conversion (a neglected ring decays; only
supersession or a hand edit makes a road of it; J-V6.13).

**3.7.4 A shorter ring** (item 8 (a); the owner: "a shorter new ring"; under item 106's closure and water rule, V06
§3.7.6 (1)–(2)). An enceinte whose intramural occupied-plot share (occupied plots inside it ÷ all its plots) has stayed
below `contract.occupiedShareMax` since `Enceinte.underuseSince` for `contract.afterYears`, while `threat ≥
contract.threatMin`, contracts at `contract.chancePerYear` (first draw on `stream(EVO_FORT, enceinte)` after the pathway
draws). The trace:
1. The region: the `T`-level set (§4.4) inside the ring holding `contract.coreShare` of its households; **while the town's
   harbour use is live, united with its quay frontage (every live quay, landing, harbour basin edge and water gate) and
   the shortest way-graph path from the core to it**; then `contract.marginM` added.
2. The line: the registered `EnceinteStrategy` traces the region's boundary under item 106's barrier closure on the S3
   lattice with the cost field of the built-face legality (§4.11): an edge through an occupied footprint is impassable,
   one through a vacant, ruined or cleared footprint or along a plot boundary or back lane costs the lattice's low rate,
   one along a way corridor the middle rate — so the new ring runs through the empty and the ruined and along plot lines,
   never through a lived-in house.
3. Its strips clear only vacant, ruined or cleared buildings (`demolish`, cause `convert:contractWall`); a strip that
   would reach an occupied one, or a trace that leaves a live quay unreachable through a gate or an open front, widens the
   margin by 20 m and retraces, at most three times; then the contraction waits for the next epoch, reported
   (`walls.waited`; never forced).
4. `contractWall` (§4.11) builds the new ring with gates where primaries cross it (S5a, S7); the old ring takes
   `pathway = { cause: 'contracted', fate: 'keep' }` and decays by V06 §3.7.3's breach and V06 §3.7.2 (2)'s dismantling. The
   plots between the two rings are extramural from then on (the exposure field's term).

**3.7.5 Renewed threat.** A ring with pathway cause `neglected` or `contracted` whose threat rises back to
`walls.threatMin` is repaired — robust while the town has the means, patched while it has not (V06 §3.7.7 (3)):
`repairWall` (V06 §2.8) on each `breached` run of the ring's `condition`, in chain order
from the trace's first vertex, each drawn at its effective week with no Works (J-V6.31, J-V6.90) — the run's towers and
gates stand again with it — `fabric` cap charged, runs beyond the cap waiting in chain order, first in line next epoch
(J-V6.112). The pathway is cleared when no run is `breached`, and the record's lifecycle returns to its former state when
every run is `standing`; **in the batch that clears the pathway** — also when no run was ever breached — a `repairWall`
with no stretch (cause `rule:threat`) lifts the ring's `neglect` where its lifecycle holds one not yet lifted: in use
again (its pre-neglect existence) when every run is `standing`, `decayed` while a `dismantled` run remains. So a ring whose
pathway is cleared is never `abandoned`; a contracted ring that was never neglected takes none, its lifecycle being the
stretch repairs' (J-V6.115). Counted `walls.backInUse`, chronicled `wallManned`. A `dismantled` run is not rebuilt (its
stone is gone); a gap stays a gap until a hand `drawWall` closes it (a hand `repairWall` on it bends to that `drawWall`,
V06 §2.8).
**A ring in use with a breach** (J-V6.110). A ring with no pathway whose `condition` holds a `breached` run while its
threat exceeds `walls.neglectThreatMax` — a landfall's breach (V05 §3.16 (4)) or a hand `breach` — is repaired at the next
`fortification` phase by the same op and order: `repairWall` on each `breached` run in chain order, no Works, its towers
and gates standing again with the run, the `fabric` cap charged (runs beyond it wait, in chain order). A `dismantled` run
stays a gap (J-V6.16); a locked or pinned ring is held (V06 §3.1). A ring in use whose threat is at or below
`walls.neglectThreatMax` is not repaired by this rule: its threat's rise past that bound repairs it at the next phase, and
its long safety enters V06 §3.7.3's neglect, whose renewed threat is the rule above. Counted `walls.repairedInUse`.

**3.7.6 Barriers, water and the dossier's walls (item 106).** Every rule of this section binds every trace the engine
makes — a new circuit, a shorter ring, a repaired or re-anchored stretch:
1. **Barrier closure on every trace.** The trace is the registered `EnceinteStrategy`'s under item 106's closure (§4.4
   S5a; the arcs classed by V11 §3.16's `walls.barriers` rows): only approachable arcs are walled, each walled stretch
   anchored on its barrier with a tower, a river loop or a spur walled across its neck only, a barrier within
   `wall.barrierReachM` beyond the stage boundary reachable, its spare ground typed intramural gardens (item 106 (b)), the
   stretch profile grading the curtain by arc (item 106 (c)). `aroundAll` (V06 §3.7.1) means "encloses every earlier stage
   on its approachable arcs".
2. **Water access is a hard rule on every new ring and every contraction.** Every live quay, landing, harbour basin and
   water gate of the enclosed town stays reachable from inside through a gate or an open front. A circuit's trace that
   would cut one off gains a water gate on the arc between the quay and the water (S7 furniture) or, where the arc is a
   barrier, leaves it open; a contraction takes the harbour into its region (V06 §3.7.4 (1)). A trace that cannot hold both
   this rule and the occupied-footprint rule retraces by the margin rule and then **waits** for a later epoch, reported —
   never forced (J-V6.58).
3. **The waterfront at each epoch** (item 106 (d)–(f)). The fortification phase re-reads the waterfront grade from DR2's
   sea threats by V11's `walls.waterfront` rows (the highest-weight row that applies), past `dial.hysteresis`:
   * a rise to a row whose grade is `quay_wall` on a walled port turns `open` into `quay_wall` with sea gates at the row's
     quay accesses — a `drawWall` op on the waterfront arc, cause `rule:waterfront`, charged to the `fabric` cap, no Works
     (J-V6.31), chronicled `waterfront`;
   * a threat that stays below every quay-wall row for `walls.neglectAfterYears` neglects the quay wall (`neglect`; its
     pathway cause `neglected`, fate `keep`, V06 §3.7.3) — never demolished;
   * a walled port without a harbour-mouth chain gains one the first epoch its harbour mouth is enclosed: two towers on
     the mole or breakwater heads (or the shores) and a water gate across the entrance, as S7 furniture (item 106 (e)),
     chronicled `harbourChain`. A tower or fort already standing at a mole head — item 110 (d)'s placed landmark — is the
     chain's anchor there (one landmark, one owner); a tower is added only at a head where none stands;
   * **a removal holds**: a generated quay wall or harbour-mouth chain the user deletes carries `detail.suppress` (§2.8;
     key: the enceinte and the waterfront's water body, or the enceinte and the harbour basin), and this rule never re-adds
     it while the suppression is live — the rule's condition still holding is reported (`walls.suppressedHeld`), never
     acted on; undo of the delete lifts it, and the user's re-add — Build it again's `drawWall` on the former line or
     `placeGate` at the former mouth — serves it while it stands (V06 §3.19.3 (7));
   * a `reclaim` or `shiftCourse` (V06 §3.12) of the previous epoch that changed a shoreline an enceinte's closure relies on
     re-evaluates that closure this epoch by least disruption (item 22): a barrier arc that became approachable gets a new
     stretch anchored on the old ones; a stretch no longer needed is neglected, never demolished.
4. **The dossier gate** (item 20 through DR2; J-V6.59). On a dossier-bound document the engine never adds an enceinte or a
   waterfront wall the dossier's walls records do not admit: V06 §3.7.1's circuit decision runs only when the records
   admit one more enceinte than stands (by the record's kind — palisade, town walls, city walls and gates — against the
   rung's ring rows), and then without the chance draw; a walls REPLACEMENT step (item 108, V06 §3.9.11) or a new walls
   record arriving at `dossier` triggers the circuit at this epoch's `growth` phase with the record's kind — around the
   stage grown for the residual if there is one, else around the present built boundary by the `EnceinteStrategy` through
   the hand `drawWall` operator's path (cause the dossier event; no face added, so the base's residual rule is untouched)
   — and the superseded ring enters its pathway. The waterfront grade follows (3) (DR2's sea threats are the dossier's).
   Contraction, neglect, breach and dismantling stay map facts: the records list walls, not their line.
5. **Raised ways on every trace** (item 110 (b): an aqueduct "crossing the wall through an arch"; J-V6.91). Every trace
   this section makes — a circuit, a shorter ring, a re-anchored or repaired stretch, the waterfront's quay wall — meets the
   standing raised ways by these rules:
   * a raised way's **support footprint is a footprint** for V06 §3.7.1's strip rule (but within one strip width of a
     crossing, V06 §3.7.1) and is **impassable** in V06 §3.7.4 (2)'s cost field (it is never demolished for a wall);
   * a trace crosses a raised way at one **crossing station** on the trace (§2.7's support step (3), (6): the nearest
     interior station within half a pitch moved there, keeping its key, else one added; the stations in the new strip's
     setback, glacis, berm or channel re-sited), never along its under-deck strip;
   * the crossing is **S7 furniture of the new ring**: for an aqueduct, a **wall opening** — an arch in the curtain, not a
     gate (no portal, no gate law); for a viaduct or an elevated road, a **raised gate** at deck level — a gate whose tower
     carries the deck, its portal on the raised part only (the part-0 way beneath, if any, takes its own ground gate by
     S5a's gate law);
   * **continuity is a hard rule**, like water access: a trace that cannot cross every raised way it meets so — where
     §2.7's support step (6) cannot keep each span within `maxClearSpanM` and each pier within `maxPierM` — retraces by
     the margin rule (V06 §3.7.4 (3)) and then **waits** for a later epoch, reported (`walls.waited`) — never forced
     (J-V6.58's form);
   * `absorbWall` and `wallToWay` leave standing every raised way that crosses the old line; the new ring road takes **no
     junction** with it: its opening or raised gate in the old curtain stays as a free-standing arch or gate tower. V06
     §3.7.2 (2)'s dismantling never takes the stretch that holds a **raised gate whose deck stands** or a **wall
     opening** under a standing aqueduct — the deck's station on the trace, the gate's tower or the curtain under the arch
     carrying the deck, its pier the wall's band (§2.7's support step (3)) — its run left as it stands, drawn by its
     `condition`, and takes it, by the same draw, from the first epoch after that raised way is removed or its crossing
     span `dismantled` — after `wallToWay` as after `absorbWall`, the fortification loop keeping the record while such a
     stretch stands (J-V6.114; J-V6.140).

**3.7.7 Condition by need and means (item 114).** The condition ladder is §2.7's `Enceinte.condition`: `standing` ·
`worn` · `patched` · `breached` · `dismantled`, on the stretch-state profile (§2.2 rule 5), each run carrying its material
(robust, or a patch row of V11's `walls.patchMaterials`) and the epoch of its last change. This section is its transitions
over epochs (J-V6.131); every chance is per year and every stretch a `walls.dismantleStretchM` stretch of V06 §3.7.2 (2)'s cut.
1. **The drivers, each a class sustained over a window** (item 114 (a)), read from the log, so a replay reproduces them:
   * **NEED** — `high` once the slice's threat (DR2; the dossier's defence readiness folded into it by V08) has stayed at or
     above `walls.threatMin` through the last `walls.condition.needReturnYears`; `low` once it has stayed at or below
     `walls.neglectThreatMax` through `walls.neglectAfterYears` (V06 §3.7.3's count); otherwise the class the previous
     epoch held (at the first epoch: `high` at or above `threatMin`, `low` at or below `neglectThreatMax`, else `mid`). Read
     from the epochs' slices (§2.9's `EpochRecord`s).
   * **MEANS** — `low` once the wealth level in force (V06 §3.3.5: `EpochInputs.wealthLevel`, else the recipe's) has stayed
     below `walls.condition.meansLow` through `walls.condition.meansWindowYears`; `high` once it has stayed at or above
     `walls.condition.meansHigh` through that window; otherwise the previous epoch's class (at the first epoch, the present
     value's band). The two thresholds lie apart and a class changes only after a whole window on the far side, so no run's
     condition flickers between two epochs at a threshold.
   * **The local weight** of a run, `λ = clamp(1 + walls.condition.localWeight × (P_town − P_run), 0.5, 1.5)`, `P_run` the
     household-weighted mean prosperity of the districts the run bounds and `P_town` the town's, both on this epoch's field:
     it scales the run's decay chances below, never a class — so the poorer quarters' stretches of a poor town wear first.
2. **Decay** — at the `fortification` phase, per stretch in chain order, each a draw on `stream(EVO_FORT, enceinte)` after
   the pathway's and the contraction's draws, charged to the strike pool's `fabric` cap as V06 §3.7.3's breaches:
   * a **neglected** ring (NEED `low`, V06 §3.7.3): `standing` → `worn` at `walls.condition.wearChancePerYear × λ` (the op
     `wearWall`, V06 §2.8), `worn` or `patched` → `breached` at `walls.breachChancePerYear × λ`;
   * a ring **in use** (no pathway) while MEANS is `low` — even under threat: `standing` → `worn` at
     `walls.condition.poorWearChancePerYear × λ`, `worn` or `patched` → `breached` at
     `walls.condition.poorBreachChancePerYear × λ` (slower than neglect's);
   * both low (a neglected ring while MEANS is `low`): the neglect chances × `walls.condition.bothLowFactor` — the fastest.
   The breaches pass over a stretch under a crossing station while its deck stands (§2.7's support step (3)), as V06
   §3.7.6 (5)'s dismantling does — its `worn` or `patched` → `breached` draw not taken, filtered before the draw
   (J-V6.7) — so the band carrying the deck never breaches under it; it may still wear, and a repair writes it as any run.
3. **Repair**, in chain order within the `fabric` cap, runs beyond it waiting in chain order:
   * NEED `high` with MEANS `low`: each `breached` run → `patched` (`repairWall` with a patch material, V06 §2.8: the row
     drawn from `walls.patchMaterials`' rows for the enceinte's kind and culture by their weights, one draw per run on
     `stream(EVO_FORT, enceinte)`) — never rebuilt robust; `worn` runs stay worn;
   * NEED `high` with MEANS `mid` or `high`: each `breached` run → `standing` robust (V06 §3.7.5), then `patched` runs →
     `standing` robust, oldest patch first (by the week of the run's last-change epoch — `EpochRecord.inputs.week` of its `conditionEpoch`, generation's
     epoch 0 first, a replay epoch's week before every live epoch's, §6.1 — ties in chain order), at most
     ⌈`walls.condition.rebuildRunsPerYear` × years⌉ an epoch, then `worn` runs → `standing`;
   * MEANS `high` without NEED `high`, on a ring **in use**: its `worn` runs → `standing`; a neglected ring keeps decaying
     (a rich place without fear lets its wall go) and `patched` runs stay patched until need returns with means;
   * a `dismantled` run stays a gap unless a hand edit or a new wall decision rebuilds it (V06 §3.7.5).
   V06 §3.7.5's renewed-threat and ring-in-use repairs are the NEED-`high` rows above: robust with the means, patched
   without them.
   **The welded stretch** (§2.7). Along an `on_enceinte` castle's `Castle.cityWeld` the town enceinte's profiles are the
   stretch's one condition, material and epoch, the bailey's mirroring them in the same batch: (2) and (3) decay and
   repair that stretch on the town ring's draws, λ and order only, never on the bailey's, whichever enceinte an op names.
4. **Neutral values** (the no-op pin): V11 §3.24.0's `walls.condition` off form — `atGeneration` false (every run
   `standing` at generation), `meansLow` 0 (MEANS never `low`), `wearChancePerYear` null (a neglected `standing` stretch
   breaches directly at `walls.breachChancePerYear`) and `needReturnYears` 0 — reproduces the rules before item 114 byte
   for byte (T-V6-73); V06's E3 seat registers H-100 and H-WALLS on V12 §2.13's `item114.condition` (V12 §3.7.8's
   engine).
5. **Report, story and replay.** The report counts `walls.worn`, `walls.patched`, `walls.rebuilt`; the chronicle writes
   `wallWorn` (a ring's first worn run), `wallPatched` ("{year}: the breaches in {subject} are patched with {material}")
   and `wallRebuilt` ("{year}: {subject} is rebuilt in {material}"); the `enceinte` provider reads each run's material and
   last change, so V10 tells a run's story ("patched with timber in the lean years; rebuilt in stone after the siege"). A
   replay (V06 §3.20) runs the same transitions over its coarse epochs, so a replayed map's walls carry their past's
   condition; without a replay, generation's condition is §7.7's derivation row from readiness and wealth (item 114 (d)).
=== END ===
=== REPLACE ### 3.10 Designation mutations over epochs — the `MutationPlan` (item 18 (c)) ===
### 3.10 Designation mutations over epochs — the `MutationPlan` (item 18 (c))

**3.10.1 Creation** (§4.11 *The epoch-spread mutation*; file f item 266). The use phase's openings and relocations into a
building whose designation differs, and a hand `mutate … spread: 'epochs'`, run §4.7 S11's mutator once, at the creating
op — the whole `MutationRecord` decided and recorded in the causing event's `EditBase.mutations` (§4.7 S11 (5)), each
later step applying its own parts of it — and create a `MutationPlan` (V06 §2.5) that splits the record's parts into
steps:
* **occupy** — nothing geometric: the use opens in the building as it stands. It is the first step **only when the present
  design is compatible** (every kept part, nothing added — the base's test); then it is applied at creation and
  `opensAt = 'occupy'`. Otherwise the plan's first geometric step is due at once (its `dueWeek` the plan's creation week) and the
  use **opens at the first step whose result is compatible** (`opensAt`): until then a relocating use stays open at its
  former site and a new opening waits unopened (its deficit counted as met by the plan, so no second opening is made). For
  an **always-crypt target** (V11's `crypt: 'always'` rows, the cathedral and great temples) the crypt is laid at the
  occupy step — V02's crypt basement re-derivation, whose ladder never refuses (V02 §3.14.5; file f item 226) — and the
  basement ring is exempt from the compatibility test, so the seat has its crypt from the batch its use opens (V06 §3.18.3
  (1));
* **adapt** — the record's converted and adapted parts, and the subtracted parts no added part overlaps;
* **extend** — the added parts that overlap no subtracted part;
* **rebuild** — the subtracted parts an added part overlaps, with those added parts (the parts that cannot be adapted).
A step with no parts is dropped. The due weeks are the plan's creation week + `round(52 × y)`, `y` drawn once per step from the
`mutation.stepYears` rows (which replace the base's "over the ladder's rung durations") on `stream(EVO_MUTATION, plot)` in
step order, each at least the previous step's (a plan never runs backwards). A dossier re-designation is a host change
and is decided and applied at once (§4.7 S11 (6)); its Works shows it over weeks, and it makes no plan — toward an
always-crypt class it lays the crypt in the same event.

**3.10.2 Application.** In the `ladder` phase, after the rungs, every plan whose next step is due (`dueWeek ≤ week`) is
applied in address order: a `mutate` op carrying `step: { plan, step }` (§7.1; file f item 264) that applies exactly that
step's parts of the stored record, in S11's order (subtract, convert, adapt, add), and writes `done` and the new `expect`
digest. Adapt and extend steps are charged to the district's `fabric` cap and rebuild steps to its `geometry` cap; a step
a cap cannot take waits for the next epoch. Each applied step starts its Works (§4.11 *Works* (6)).

**3.10.3 The guard, re-planning and cancelling.** A step applies the stored record only while the building's leaf digest
equals `expect` (§6.2): a hand edit, a later mutation or a Works cancelled half-way breaks it, and the plan is then
**re-planned** — S11's mutator runs afresh from the present design to the plan's target inside this epoch's event, its
record replacing the plan's for the remaining steps (the due weeks kept), reported `replanned`; a record that designs
beyond the grandeur ceiling at the epoch's rung is re-planned the same way (V06 §3.8.5 (3)). A plan is **cancelled**
(tombstoned, its done steps standing) when the use it was made for leaves the building, when its plot is re-derived, or
when a lock covers the building; a user deletes one by `delete` on the plan (V06 §4.2). The plan's last step tombstones
it (cause `done`). **Going back** (item 18 (e)): when a building whose plan was cancelled with done steps next takes its
former designation (the plan's `from`), the mutator's record for that change is the **inverse** of the done steps (their
added parts subtracted, their subtracted parts restored from the done events' records, converted parts converted back),
spread by a new plan by the same rules — never a fresh design.
=== END ===
=== REPLACE ### 3.20 The history replay at generation (item 113) ===
### 3.20 The history replay at generation (item 113)

§4.11 *History-first generation* states the rule: a settlement with a known history is generated as its past and aged to
the present — the peak, the replay as coarse epochs, the result carrying its past, destruction and refounding, burial,
sewers reopened, its edges and bars (§4.11 (1)–(7); DR36–DR39; §13.2's T113 bars). This section is the engine's side:
the replay plan, the event-to-epoch mapping, the runner at generation, the budget with lazy detail, refounding and
burial as epochs, the record, and what an edit or a changed history does afterwards (J-V6.133).

**3.20.1 The replay plan.** `ReplayPlan` (V06 §2.14) is derived once at generation, drawing nothing, from the recipe's
history — the dossier's (V08 reads SettlementForge's history into `Recipe.history`: the age and founding, the events with
years ago and severity, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle's terminal death and
resettlement, `peakTier`) or the blueprint's history option (§4.2 S0) — and V11's history cells:
1. **The peak** is DR36's: `peakTier` or the high-water population when present; else the effective peak, the higher tier
   the evidence shows, sized at `history.symbolicQuantile` of that tier's population range and `symbolic` (§4.11 (1));
   with no evidence, none. The blueprint's option names a rung and is read as a `peakTier` (its population the rung's range
   at `history.symbolicQuantile`, `symbolic` unless the option gives a number). **When it stood**: the evidence's own year —
   the demotion's on `tierHistory`, the maximum's on `populationHistory`, the destruction's for a resettled place — else
   `replay.symbolicPeakAgeShare` × the settlement's age before the present.
2. **The start.** From the **founding** (`history.ageYears` before the present) when `populationHistory`'s earliest entry
   lies within one `history.epochYears` of it (a recorded growth), at that entry's population; else from the **peak**, at
   its population and year; with no peak, from the founding at the present population's ladder floor when the history
   has events to replay, and with none of these no replay runs (generation is the one-click path; the events stay
   `HistoryHint` scars, §4.11 (1)).
3. **The epochs.** The span from the start to the present is cut into `n = ⌈span ÷ history.epochYears⌉` epochs, oldest
   first, the last ending at the present; when the budget (V06 §3.20.4) or `replay.maxEpochs` would be exceeded, the epoch
   length grows to the smallest whole number of years that fits both, `coarsened` set and the length chosen reported (`ReplayPlan.epochYears`; the report's `replay.epochYears`). Each epoch's
   `populationTarget` is `populationHistory`'s value at its end where given (linear between records); else the piecewise
   linear curve through the peak (at its year), the population effects of the mapped events (V06 §3.20.2) at their
   epochs, and the present population at the present; the last epoch's target is the present's exactly (the roster's,
   item 20).
4. **Degenerate histories** (§4.11 (7)): a founding after the present (bad data) replays nothing, reported
   (`replayNoSpan`); a peak below the present population is no peak (the replay runs from the founding if it can, else
   none); a peak above the ladder's top is sized at the cap (§1.1); a history whose events all fall before the start
   replays growth and decline only.

**3.20.2 The event-to-epoch mapping.** Each history event and each `calamityHistory` entry becomes a `ReplayEventRef` in
the epoch whose span `(toYearsAgo, fromYearsAgo]` holds its years ago; one before the start is not replayed (it stays a
scar the base's S2 and II.7.6 read). A calamity is typed by the calamity table (V06 §2.4; DR28); an event by V11's
`HistoryEventRow` for its type (V06 §2.14; an unknown type takes the row `none`, reported `historyEventUnmapped`). Its
**week** inside the epoch is `W_p − round(52 × yearsAgo)`, `W_p` the present's (V06 §3.20.3), clamped into the epoch's
span. Its **effect**, scaled linearly between the row's `severityScale` ends by its severity:
* `hazard` — an `EpochInputs.events` entry of the row's hazard kind at its week, its `params` from the scale (a burn's
  `maxBuildings`, a flood's depth factor, a drought's share), run by the hazards phase as any event (V06 §3.11): a great
  fire burns and rebuilds a quarter, a great flood may raise the grade (V06 §3.11.6);
* `population` — × the row's factor on the epoch's target where `populationHistory` gives none (plague years, a trade
  collapse, a market crash empty the edges by the departure matching, V06 §3.5.1; demographic pressure grows the town);
* `slice` — the row's circumstance change from this epoch on (an external threat or an occupation raises the threat, so the
  wall decision may build a circuit, V06 §3.7.1; the era and culture rows);
* `uses` — openings of the row's classes, ⌈households ÷ 1 000 × `perThousand`⌉ each, as deficits of this epoch's `uses`
  phase (V06 §3.9.6): a pilgrimage surge's hostels, an occupation's garrison;
* `destroy` — the destruction path (V06 §3.20.5), where the event's severity is at or above the row's threshold, the
  first end of its `severityScale` (V06 §2.14; V11 §3.25.2); an event below it is recorded only;
* `none` — recorded only.
Several events of one epoch apply in week order, then type order. The same history maps the same way at every run: the
mapping draws nothing.

**3.20.3 The runner at generation.** Generation runs S0–S13a at the plan's start population (the base's `generate`, §4.2 —
at the peak's population, or at the founding's), the dossier's present records withheld to the last epoch; then, for
each `ReplayEpoch` in order, the runner appends an `epoch` event to the **creation prefix** (flag `creation`, never an
undo target, §7.4 *Replay semantics*) and folds it by the ordinary runner (V06 §3.1) under the `'history'` strategy
whatever `evolution.strategy` holds — the replay is this engine's — with `EpochInputs { week, years, populationTarget,
circumstances, events, dossier?, replay }`:
* `week` = `W_p − round(52 × toYearsAgo)`, `W_p` the present at creation (§4.11 *The clock* (1): the dossier's present
  week, a standalone document's week 0) — so the replayed past lies before it in signed weeks and the last replay
  epoch's week is `W_p`; the `generate` event stands at `W_p − round(52 × start.yearsAgo)` — the document's creation
  week (`HistoryIndex.creationWeek`, V06 §2.11), which the first replay epoch's `prevWeek` and `years` read (V06 §3.1
  (3));
* `circumstances` — the creation slice with each `slice` effect applied from its epoch;
* `events` — the mapped hazards; **no spontaneous hazard** runs in a replay (it invents no event), whatever
  `evolution.hazards` holds;
* `dossier` — only on the last replay epoch: the dossier's present records (the creation's `assign` events and their
  receipts), applied at its `dossier` step by least disruption (§4.11 (2): the present institutions by the last epoch's
  step (e)), so the replay ends meeting the dossier's present facts exactly (item 20);
* `replay` — V06 §2.14's provenance; the epoch's draws are keyed with §6.1's replay epoch component for its index
  (V06 §3.16).
Every phase and participant runs as at a live epoch (V04's, V05's, V01's and V07's included), so growth, decline, walls
(item 114's transitions among them), the underground (a sewer reopened before a new one is dug, item 113 (d); a void made
`lost`, item 113 (e)), islands and raised ways follow the recorded history; the hand-off band and the village product
carry a place across rungs (V07 at village rungs). The document's history index shows the replay epochs as the recorded
past (V06 §3.15.4), and a frame of any of them can be scrubbed.

**3.20.4 The budget and lazy detail.** The replay runs in the generation worker with progress, before the first map; the
one-click budgets (§12.3, §12.5) are the path without a known history, and a history-first generation's — the whole wait,
the start's generation, the replay and the first map, inside item 119's ten-second comfort level (item 119 (a2); V06 §6.8)
— are these:
* **The estimate** — V06 §6.8's estimate over the plan's epochs (`epoch.costMs` by the rung of each epoch's target, the
  islands that may stand, the growth stages), a function of the plan and the recipe only, so the coarsening it decides is
  deterministic; when it exceeds `replay.budgetMs[the peak's rung]` — the comfort level's share left after the peak's
  generation and the first map (V06 §6.8 (2)) — the epoch length grows (V06 §3.20.1 (3)) until it fits. The measured
  time is a bar (T-V6-24, T-V6-71), never an input.
* **Lazy detail** — a replay epoch ending more than `replay.detailRetainYears` before the present runs its phases at
  model level: the `works` phase creates no Works (its changes apply finished, V06 §3.13 (1)), no lazy rung (wings,
  rooms, plans, close-ups) is derived for its buildings (§4.1's laziness contract derives them on demand, for the present
  or for a scrubbed frame), and the history store keeps its keyframes only (its images rebuilt by the verification replay
  or on demand, V06 §3.15.2). The last epochs run in full, so a fire five years ago still shows its rebuilding Works.
* **Cancel** — cancelling a standalone history-first generation leaves no document; its dialog offers "Generate without
  its history" (the one-click path with `history.replay` false, the parity presets' setting). A host creation offers no
  cancel; its replay is coarsened to fit the comfort level (V06 §6.8; V09 §4.21.9).

**3.20.5 Destruction, refounding and burial.**
1. **The evidence** (DR38): SettlementForge's terminal death and resettlement, an event whose row's effect is `destroy`
   at its threshold, or a "Fall of" event whose fallen place is this settlement at its peak. A "Fall of" an older people
   before the founding is item 109's ruin (V04 §3.5.0a; DR30), never replayed.
2. **The destruction epoch** — at its `hazards` step, one destruction op per standing record of the old settlement, cause
   the event: every building `ruin`ed (its use closed, its households displaced into the ledger, cause `destruction`), every
   way retired to a trace (`retireWay`, or `downgradeWay` with the town product alone), every enceinte `neglect`ed with
   every run `breached` (item 114's ladder), every raised way `neglect`ed and every deck `decayed`, the bridges' crossing
   sites kept. Its population target is the refounded population (a resettled place's is a thorp's, SettlementForge's
   rule; clamped to the registered ladders, the village product carrying it below 1 500, and with the town product alone
   the floor, reported); the departure matching then removes the leaving households, from the ledger's pool first.
   Where a resettlement lies later than the destruction, the epochs between hold the ruins at the ladder's floor with no
   settlement's growth — only decline and burial run — where the village product admits a deserted place (a target of 0,
   V07 §3.12), else the destruction and the refounding fold in one epoch, reported.
3. **The refounding epoch** — its target the refounded population, its slice the history's culture and era rows for the
   new settlement (V08): `siting` places the households regrowth-first, so the new settlement builds on the old
   foundations (tier (3)'s `rebuild` and `reuse … build`), reopens the old streets it needs (the placement rule and tier
   (5′), V06 §3.8.2) and repairs a bridge deck before any new crossing (V06 §3.19.5 (4)); a residual grows a stage whose
   route costs favour the old roads, gate gaps and bridges (§4.4's `existingFabricCost` pricing a ruined way at V11's
   `history.reuseCost`), its own plan and culture where they differ; the pool quarries the ruins by salvage demand (the
   salvage ledger, §4.11). The old plan persists wherever it helps and decays by the ordinary pool elsewhere.
4. **Burial** (DR39; item 113 (c)). At each replay epoch's `terrainWater` step, each **former fabric** — the records one
   destruction ruined, or the ruins one district's decline left in one epoch (its ruined buildings, its ways retired or
   effaced to traces, its enceinte runs whose condition is `dismantled` — and, for a destruction's fabric, the runs
   V06 §3.20.5 (2) left `breached` — with the towers and gates drawn on them; a tower or a gate carries no state, file f
   item 575) — whose years since it was ruined first pass V11's
   `history.burialYears` as the site's factors set it (shortened by floods, river silt and rebuilding on top, lengthened on
   bare rock) is buried: the runner calls V04's `BuriedFormer.lay(doc, epoch, former)` in that batch (V04 §3.5.5 (b)) and
   clears the listed surface records (existence `cleared`, cause `rule:burial`), as `raiseGrade` clears its region; a
   former settlement that stood below TOWN at its peak is not laid (`lay` returns null) and its ruins stay on the surface.
   The buried system joins the underground: `under.access` tests it for overlap in the same epoch, and its access follows
   item 109 (j) and is lost when its link closes (item 113 (e)). Only the replay buries: a live epoch keeps its ruins on
   the surface, decaying by the pool (J-V6.130).
5. **The result carries its past** by these rules and the persistence order (§4.11 (3)): walls far beyond the houses
   (standing, worn or breached, never ruined by decline), abandoned street lines kept as tracks and field boundaries,
   a church too big for today's congregation (a singular or churchyard use never moved, V06 §3.9.5), a market square too
   large for its market (a square outlives its institution), empty plots, roofless and ruined buildings.

**3.20.6 The record.** In the last replay epoch's `close` batch the runner writes the document's `HistoryRecord` (§2.7;
cause `rule:replay`): its `peak` (rung, population, `symbolic`, the evidence used), its `epochs` (each replay epoch's
index, span and mapped events), `refounded` (each destruction's years ago and cause) and `buried` (the systems
`BuriedFormer.lay` returned). Every fact the peak's generation laid under a symbolic peak carries `Provenance.symbolic`
(§2.8) — its stage runs are the `generate` event's at that peak — so the clerk says what it is ("the old walls show this
was once a city; its exact size is not recorded"; V10). The story (V10) reads the record with the chronicle's `replay`,
`destroyed`, `refounded` and `buried` lines ("the walls were built when this was a city of twelve thousand"). The report's
`epochs` list (§5.4) carries each replay epoch's `EpochReport` with its `replay` section; the exports carry the record
(§11.1's history block).

**3.20.7 Afterwards.** The creation prefix is never an undo target and never re-planned: an undo, an upgrade's replay and
a verification replay fold it as it stands, so the map is byte-stable per seed and history. A dossier event that changes
the history after creation (a rare correction of the past) changes no geometry and rewrites no record: the record keeps
describing the replay that made the map, and the report and the clerk say the recorded history has changed ("re-derive
from the site to replay it") — a Re-derive from S1 re-runs the replay whole (V04 §1b.5 reads the same rule;
J-V6.134). A `forkAt` at a seq inside the creation prefix bends to the prefix's end (the creation is indivisible), with
its line. With `history.replay` false the generation is the base's one-click path and byte-identical to it (T-V6-71's
no-op pin `item113.history`, registered by V06's E9 seat on V12 §3.7.8's engine).
=== END ===
=== REPLACE ### 3.21 Edges — every mechanism at its limits (principle (11)) ===
### 3.21 Edges — every mechanism at its limits (principle (11))

Each row states the outcome, the failure rung (§5.1: check, repair locally, retry that piece, simpler shape, substitute,
leave out and report — never a whole-map retry) and the test; T-V6-70 is the edge suite (V06 §7), one fixture per clause
named. **Degenerate geometry (E4) everywhere in the engine** follows the base's general rule (§5.1): every op commits
through kernel transactions, a degenerate result the kernel refuses (`E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_SELF_INTERSECT`, `E_INVARIANT` …)
is that op's refusal — rolled back alone and reported (V06 §3.17 (1)) — and the phase goes on; the rows below name each
mechanism's own degenerate cases.

**(a) Mechanisms**

| mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|
| the engine's interfaces (V06 §2.1) | a phase or participant returning an op on a tombstoned or unknown id; a `displaced` row whose household is not in its `from` building; `demandTaken` above the band's remaining delta; a malformed result | the operator refuses the stale op (skipped, reported); the bad `displaced` row dropped, reported; `demandTaken` clamped to the remaining delta, reported; a malformed result isolated as a participant error (V06 §3.17 (4)) | check → leave out and report | T-V6-70 (a); T-V6-52 |
| the trajectory and `advance` (V06 §2.3, V06 §3.3.2) | a span not above 0 or not finite, under half a week; a cadence below 1 week or fractional; unsorted, repeated or past points; `perYear` below −1; an overflowing rate; a negative target; every epoch clamped; an estimate above `advance.budgetMs` at the cadence asked | V06 §3.3.2's *Degenerate requests*: a no-op with its line, one week, a floored cadence with its line, sorted points (the last kept, past ones dropped), −1 read, the ladder top, the clamp; time still passes when the population holds; the cadence coarsened to the smallest that fits, one epoch at the span's end the floor (V06 §6.8 (3)), its line naming the cadence chosen | repair locally (bend or no-op); simpler shape (coarser epochs) | T-V6-23; T-V6-24 |
| an advance group after a save, and in a shared document | the group's undo after a reload (its checkpoint gone); the undo in a shared document | rebuilt from the nearest keyframe at or before the group (else the base) and the events between replayed, then truncated in an unshared document; in a shared one an `undo` event is appended, the group kept in the log, the independence check applied (§7.4) | retry that piece (rebuild by replay) | T-V6-23 |
| hazard and calamity rows (V06 §2.4) | an unknown kind; a row's missing param; a calamity whose severity is not one of the four bands; a `drought` on a map with no spring | reported and ignored; the operator's default; read `moderate`, reported; no op, reported `droughtNoSpring` | leave out and report | T-V6-27; T-V6-70 (b) |
| `MutationPlan` (V06 §2.5, V06 §3.10) | a plan whose stored record is missing (a migrated or truncated log); its plot or building tombstoned; a step due before the plan's creation; a plan with no step left; a single-step plan | re-planned from the present design (V06 §3.10.3), reported; cancelled; clamped to the creation week; none made; applied at its week | repair locally | T-V6-15 |
| the building shade mask (V06 §2.6, V06 §3.4) | absent; a sampler mismatch; a field grid that grew with the frame; a zero-height or zero-area caster; every rung | zero building shade; recomputed whole at the next epoch (V06 §3.4 (5)); the new cells read zero until the next epoch rewrites the mask whole; no shade; the mask runs wherever the field phase runs, every rung of every product, inert at `w_sun` 0 or item 111 (c)'s cell 0 | substitute (zero) until the next epoch | T-V6-12 |
| the conversion kinds (V06 §2.8) | an op on a tombstoned target; `retypeLand` to its present kind; `upgradeWay` with no `formerClass`; `downgradeWay` of a path; `wearWall` on a run not `standing`; `repairWall` with no neglect to lift | refused (skipped, reported); each other a no-op with its line ("this way has no former class", "this wall is in use") | leave out and report | T-V6-70 (c); T-V6-11 |
| the report and the chronicle (V06 §2.10) | an epoch with nothing to report; a chronicle kind without a template; a lost report block | a report of zeros and an empty chronicle, written; forbidden by T-V6-26's wiring bar; rebuilt by replay, the pre-rebase ones reported lost | substitute (rebuild) | T-V6-26; T-V6-70 (d) |
| item 110's records (V06 §2.13) | a raised way with no `reason`; a suppression whose key no generator produces; a reason key whose lineage no longer exists (a spring lost, a feature removed) | counted as declared; held, reported only when its reading is met; the reading unmet, the key held | check | T-V6-58; T-V6-60 |
| the runner and the phase order (V06 §3.1–V06 §3.2) | an epoch with no change of input (the target held, no event, no dossier event); a degenerate op | every phase runs — spans run, strain ages, Works retire — nothing re-rolled; the general E4 rule | — | T-V6-70 (e); T-V6-3 |
| epoch inputs (V06 §3.3) | no `week` on a standalone call; one epoch; a target at a ladder end; a rung crossing | the base's `previous + round(52 × years)`; one epoch folded; the clamp reported; the fold's product and rung (V06 §3.1 (3)) | repair locally | T-V6-23; T-V6-51 |
| dossier-bound epochs (V06 §3.3.1, V06 §6.8 (6)) | a dossier catch-up of many years; one whose dossier events alone pass the catch-up's budget (V06 §6.8 (6)), on an open map or inside an open from SettlementForge | the coarsened catch-up of V06 §6.8 (6): one epoch per k crossed year ends, every dossier event at its own week, a calamity at its week inside the coarse epoch that holds it, the last epoch at the dossier's week; one epoch over the span the floor; one epoch over the span, every dossier event still at its own week, the wait completing past the comfort level and reported F-BUDGET-TIME, never coarser or shortened (§12.1) | simpler shape (coarser epochs); report | T-V6-24 |
| decline (V06 §3.5) | no candidate; one leaving household; the cap spent; a building whose `decay` Works was retired; a leaving household that is locked or pinned, or a locked or pinned dwelling's last; every rung; an undone decline epoch; a save and load between epochs | nothing struck, the cap unused; one `relet`; the rest wait in key order; its span read from its lifecycle block; passed over for the next unlocked household; under a dossier fall taken last and reported orphaned, a protected dwelling's last household let out by a `relet` to 0, never a `vacate`, the building keeping its state (T20-15, T20-16); under any other fall held, counted `households.heldByLock`, the dwelling kept at one household or more (V06 §3.5.1 (1), (4), (5)); the village rows at a village rung; the epoch's undo; the keys re-derived identically | check | T-V6-5; T-V6-6; T-V6-70 (f) |
| growth (V06 §3.6) | no residual; a residual of one; crowding at capacity; a band row missing; every rung; the parity presets; the backlog after a reload | no stage; overflow rung (i); rung (ii) then (iii); the middle band's row; V07's growth override at a village rung, the base regimes at TOWN and above; `decline.turnoverVacancy` 0 and the suburb regime by file f item 293; the backlog derived from its records, never stored | repair locally; the overflow ladder's last rung cannot fail | T-V6-8; T-V6-31; T-V6-32; T-V6-70 (g) |
| fortification (V06 §3.7) | no enceinte; a one-gate ring; a trace of one stretch; the cap spent; a missing threat slice; a pathway set by hand; every rung (a village's palisade); a draw after a reload | no pathway work, no circuit below `walls.threatMin`; the same rules; the runs wait in chain order; the last slice in force; its source `edit` never redrawn; the same transitions over a palisade (V07's patch rows, item 114); re-derived from the span keys | check; wait | T-V6-9; T-V6-10; T-V6-11; T-V6-73 |
| condition by need and means (V06 §3.7.7) | need and means at a threshold for one epoch; both drivers at their neutral values; a ring of one run; a run with no material recorded | no class change (a whole window is needed); the pre-item-114 rules byte for byte; the same rules; read robust | check | T-V6-73 |
| regrowth (V06 §3.8) | nothing to place; one household; a vacant building with no `builtBand`; a hollow way locked on the only path; every rung | nothing; one placement; read at its current band; the plot no candidate; V07's (6v)–(9v) at a village rung | check | T-V6-7; T-V6-51 |
| the grandeur ceiling over epochs (V06 §3.8.5) | a crossing inside the hand-off band; a plan made at a higher rung; a dossier-specified or hand-made grand design; a history that stays at TOWN and above | the fold's rung row decides; re-planned under the present ceiling; kept; byte-identical | repair locally | T-V6-74 |
| uses (V06 §3.9) | a candidate with a degenerate footprint | no candidate (S11's compatibility fails) | check | T-V6-13 |
| hazards (V06 §3.11) | none admitted; one ignition; `maxBuildings` reached; `params.week` outside the span; a place outside the frame; every rung; an undone hazard epoch; a reload mid-history | nothing; one building may burn; the spread stops; clamped, reported; the nearest building within 30 m, else no target, reported; the same operators at every rung (`λ` scales with the buildings); the epoch's undo restores the struck; the same fire from the same keys | leave out and report | T-V6-16; T-V6-17; T-V6-70 (h) |
| terrain and water (V06 §3.12) | no water body; a reach of one knot pair; coincident knots; an oxbow born under 0.1 ha; a spring's source on the shore; no flood band; no shortfall record; an undone course shift | nothing; the rules on it; no cut-off; typed `marsh` at once; not lost (distance 0); no avulsion; no reclamation; the op's undo restores the loop and the spring's flow | check | T-V6-18; T-V6-72; T-V6-70 (i) |
| springs over epochs (V06 §3.12.1) | no spring; a spring at flow 1 under recovery; a drought and a recovery in one epoch; a lost spring under a drought; a wet climate row | nothing (no op, no draw); capped at 1; the drought wins, no recovery that epoch; unchanged; the pull changes by near nothing | check | T-V6-72 |
| Works (V06 §3.13) | no physical change; one change; a target tombstoned by a later op in the same epoch; a missing `WorksTable` row; Works retired then the epoch undone; a reload mid-Works | no Works; one; the chained-Works removal rule; the designation template's `works` key's row (§4.11 *Works* (3)); the retirement restored by the epoch's undo record; `stageAt` derived from the week, identical | repair locally | T-V6-19; T-V6-70 (j) |
| people (V06 §3.14) | an ancestry row without `lifespan`; a pinned person past it; a reload or a replay | [45, 80]; held, marked; the same successors | substitute | T-V6-20 |
| the history record and frames (V06 §3.15) | a document with no epoch; one epoch; images gone; `w1 = w2`; a lost history store; a frame of an undone epoch | the creation week only, `locate` the current model; one frame; the replay path; an empty diff; rebuilt by the verification replay; dropped | retry that piece | T-V6-21; T-V6-70 (k) |
| determinism (V06 §3.16) | equal scores; coincident candidates | ties by address | — | T-V6-2 |
| failure handling (V06 §3.17) | a failure at an epoch replayed after a reload | the same refusal at the same batch (failures are deterministic), the same report entry | — | T-V6-2; T-V6-29 |
| the underground over epochs (V06 §3.18) | a degenerate void element | V04's own ladders (§5.2's F-UNDER and F-VOID rows) | V04's | T-V6-34; T-V6-67 |
| raised ways over epochs (V06 §3.19) | a solved course of one station; `A = B`; a `SpanRef` with `from = to` | no course (waits); the reading unmet; the op a no-op | wait | T-V6-57; T-V6-70 (l) |
| the replay (V06 §3.20) | no known history; a founding after the present; a peak below the present; a peak above the ladder; one epoch; more epochs than the budget; an event before the start; an unknown event type; cancel; a host creation | the one-click path; no replay, reported; no peak; the cap; one epoch; coarsened, reported; not replayed; row `none`, reported; no document (standalone), the offer to generate without history; no cancel offered, the replay coarsened to fit (V06 §3.20.4) | repair locally; simpler shape (coarser epochs) | T-V6-71 |
| the growth frontier (V06 §3.22 (2)) | zero households; a count below the quantum; one below the quantum with a rich part; a frame with no reachable land left; a next stage the wall decision would wall; a camp with a rich part and a stage; a camp all of whose households are rich; a stage S5a seats only in part; a village rung; a standalone neighbourhood document; no arterial leaving the settlement (S3 (9) (a)'s unserved mesa); a scrubbed frame; the camp's ground built on by an epoch | none; the overflow belt along the busiest arterial by its gate; that belt and the rich ribbon's plots; that belt; the unwalled frontier (the query draws nothing); the stage's land and the rich ribbon's plots along its arterial; the ribbon's plots alone; the stage's land and the belt for the households it cannot seat; the belt by the entry of V07 §5.6 (2)'s main approach road; the belt by the busiest arterial's gate or boundary crossing; the belt's faces nearest the boundary point closest to the growth centre; the frontier of the frame's model; the next frontier out | substitute (the belt) | T-V6-75 |
| the crisis hand-over (V06 §3.22 (1), (3)) | a condition with no calamity; a calamity with no condition; a building the look ruins with no Works since its condition began; one whose rebuild Works starts; one under a `decay` Works; one already under Works when the condition began; an overlay with no `untilWeek`; a preview over a building under a rebuild Works | nothing left, the look ending with it; the real change, no look; the look until its condition ends; the Works' stage from its start, never both; the look kept, the higher level drawn; the Works' stage, no look; the look while the overlay stands; the look drawn (a preview never hands over) | — | T-V6-75 |
| the decay level (V06 §3.23) | a standing building; a building at level 1; a building generated ruined; one the replay ruined; no V11 row for its material, or none shipped; a rate of 0; a fire's CHARRED; a `vacate` inside a yearly or a coarse catch-up epoch; a restoration from level 1; a restoration with no Works; a restored building re-cut or extended; a `reused` trace at level 1; a decay run beginning during a repair; a rebuild or a successor on the trace; a scrub across a restoration; an epoch undone; negative weeks | 0; every element damaged; V11's default age `D` at the week it is first met so, aging from then (read after 50 years of epochs, `D` + 50 years, non-decreasing); its replayed years, from the replay epoch that ruined it; V11's default row, else the state's floor; the state's floor at every week; the decayed third from the fire's week; the level from its `decay` Works' start week, the plan's damage and the exterior's stage agreeing at every week; down to 0 over the repair Works, the elements leaving from the highest threshold, each then patched; 0 at the event's week; the added elements drawn as built, the kept ones patched; level and peak 0 from its week, no plan drawn; the larger of the run's level and what the repair left; a new plan, level and peak 0; the level and peak at the frame's week; the earlier history's level; read as any week | substitute (the floor) | T-V6-76 |
| advancing time (V06 §4.1) | a request with no change; one epoch; a skeleton's `history` block with bad entries; a standalone neighbourhood document; an Accept after edits that raise the estimate | as V06 §3.3.2; one epoch; the bad entries dropped, reported; the bend line; the epochs folded again at the cadence the estimate chooses on the current head, the card's line naming it | repair locally | T-V6-23 |
| the hand forms (V06 §4.2) | clearing a strain that is absent; one hazard dropped by hand; every rung | a no-op with its line; one hazard at its place; the same forms at every rung (a raised way drawn by hand at any rung is a declaration) | leave out and report | T-V6-70 (m) |
| locality (V06 §4.3) | an epoch whose touched set is empty; one locked entity | the epoch records its week and report; holding it moves no other draw | — | T-V6-3; T-V6-4 |
| forks and re-runs (V06 §4.4) | `forkAt` at the head; at a seq inside the creation prefix; `rerunFrom` after a reload; a fork saved and reloaded | a copy identical to the document; bends to the prefix's end; re-expanded from the stored inputs identically; identical | repair locally | T-V6-22 |
| the clerk's view (V06 §4.5) | every rung | the four providers answer at every rung, a village's included | — | T-V6-53 |
| rendering, labels, exports (V06 §5) | nothing changed since the last frame; one change; a layer toggled off; a frame after an undo or a reload; a ring road of zero length; an export of a degenerate frame | an empty delta; one mark; the layer's own rows; re-derived; no label; the export's own rules (§11.1) | — | T-V6-21; T-V6-26 |

**(b) Combinations** (the history — live epochs and the replay — meeting another unit's feature, at every rung each exists)

| combination | outcome | test |
|---|---|---|
| cliff, steep ground × the history and its Works | the engine changes terrain only by V06 §3.12's water ops and `raiseGrade`; no trace walls a sheer arc (V06 §3.7.6 (1)); a new stage on steep ground levels its faces and raises retaining walls (V06 §3.19.4), and no wall stands on a cliff edge (§4.7's rule); a building's Works stand at its datum; the replay runs the same rules | T-V6-47; T-V6-62; T-V6-70 (n) |
| river, coast, harbour × the history | course shifts, oxbows, silting and reclamation (V06 §3.12); the waterfront, the harbour-mouth chain and water access on every trace (V06 §3.7.6); a harbour that silts below its draught closes its use; the replay the same | T-V6-18; T-V6-46; T-V6-48 |
| moat × the history and its Works | a moat stands while its ring stands; after `wallToWay` or `absorbWall` it is kept as still water and silts by V06 §3.12's `siltReach` path (candidate (c), as an oxbow) to marsh; water takes no Works (J-V6.31); a deck plot on a moat bridge is item 246's rule, struck by V06 §3.19.5 | T-V6-70 (n) |
| deck plot × the history | V06 §3.19.5: offered, bound by the budget, struck with its host, re-offered on repair | T-V6-63 |
| square × the history and its Works | a square is never a pool candidate and takes no Works; a market's square outlives its institution (§4.11); a gate junction's square is made by `gateToJunction`; the replay keeps squares too large for their markets | T-V6-70 (n) |
| oasis × the history and its Works | V06 §3.12.1: the spring's failure, loss and recovery; the gardens and grove; the pond silting; no Works on water or land uses | T-V6-72 |
| frame × the history and its Works | the frame never shrinks (§4.11 *The rung at an epoch*); a stage grows inside it or grows it by the base's frame rule; no Works outside it; bounds an epoch grows move the zoom-out limit (§8.8; item 116 (d)) | T-V6-70 (n) |
| a standalone neighbourhood document × the history | no clock: the bend (V06 §1.3, V06 §4.1); `forkAt` and the timeline over its events work | T-V6-23 |
| neighbourhood fabric, terraced wards × the history | `hood.fabric` re-derives S7c and S9b on new and re-cut faces and on districts a raised part crosses (V06 §3.2); a terraced ward's walls follow V06 §3.19.4; in the replay the participant runs at every replay epoch | T-V6-64; T-V6-62 |
| composed buildings, stacked tiers, crypts, plans × the history | designation changes through `MutationPlan` steps and S11's mutator (V06 §3.10); `rebaseStack` before the casters (V06 §3.4 (2)); stack Works in stack order (V06 §3.13 (4)); tiers re-match stored plans by wing-relative storey and a levelling re-cuts or stales plans (V06 §3.19.4 (5)); crypts by V06 §3.18.3; in the replay the lazy rungs stay underived (V06 §3.20.4) | T-V6-15; T-V6-55; T-V6-62 |
| sewer, cavern, ruin, catacomb, undercity, void, access, vault × the history | V06 §3.18: access by dig, overlap, breach and opening, excavation, dwellings only after access, a void `lost` when its last open link closes and refound, sewers reopened before new ones are dug, catacombs by the count, ratchet and primary, crypts, the arch-vault reconcile; in the replay the same participants, and burial lays the former settlement (V06 §3.20.5 (4)) | T-V6-33–T-V6-40; T-V6-64; T-V6-71 |
| access × Works | accesses and links take no Works: drawn at their effective week (V06 §3.15.2) | T-V6-21 |
| islands, island shade, sky accesses, landfall × the history | `sky.islands` runs V05's island laws at every epoch where an island stands (V06 §3.2); the shade's one-epoch lag (V06 §3.4 (8)); the landfall clearance (V06 §3.5.2); a replay from a CITY peak may raise and later drop islands, the result carrying the fallen ones | T-V6-30; T-V6-64; T-V6-66 |
| lights × epochs, the history and Works | a light follows its host — unlit while the host is abandoned, decayed or under Works before FINISHED (§2.7's reading) — and new buildings take lights by §4.7's rows; a frame draws the lights of its state | T-V6-21 |
| the history × locks | a locked or pinned entity is never struck, converted or moved (V06 §3.1); the replay runs before any lock exists; a `rerunFrom` keeps the locks of its prefix; a fall whose leaving households hold a locked or pinned household or a locked or pinned dwelling's last: passed over for the next unlocked household; under a dossier fall taken last and reported orphaned, a protected dwelling's last household let out by a `relet` to 0, the building keeping its state (T20-15, T20-16); under any other fall held, counted `households.heldByLock`, the dwelling kept at one household or more (V06 §3.5.1 (1), (4), (5)) | T-V6-4; T-V6-22; T-V6-70 (f) |
| the history × save and load | an epoch undone after a save: V06 §4.1's rule (the (a) table's advance-group row); the history store rebuilt by the verification replay; the report kept | T-V6-23; T-V6-21 |
| item 114's recovery × the history replay | runs patched in replay epochs and in live epochs: the rebuild takes them oldest first by the week of each run's last change (`EpochRecord.inputs.week`, §6.1), every replay epoch's week before every live one's (V06 §3.7.7 (3)) | T-V6-73 |
| crisis looks × the history | a look writes nothing and its aftermath arrives at the next epoch (V06 §3.22 (1)); a look standing when its aftermath epoch folds draws over the real change at the higher of the two levels; a camp whose ground an epoch builds on is drawn at the next frontier out; a disaster look yields per building to the first Works of its rebuild; a replay epoch carries no condition (the history's calamities reach it as events, V06 §3.20.2); a port epoch carrying the calamity is no undo target (§7.4 *Replay semantics*); the aftermath epoch undone on a what-if copy leaves the look over the restored buildings; a crisis preview has no aftermath | T-V6-75 |
| ruined plans × the history | one plan through decay, restoration and decay again, its damage at the decay level and its repaired elements patched until a rebuild (V06 §3.23); a successor on the trace a new plan; the replay's ruins at their replayed years, a scrub across the replayed past showing each plan aging; a building generated ruined at V11's default age at creation, aging from then; the elements a restoration's re-cut or an `extend` adds drawn as built | T-V6-76 |
| the history × export | an export at a scrubbed week draws that frame (V06 §5.3); the APNG; the `HistoryRecord` in the history block | T-V6-21 |
=== END ===
=== REPLACE ### 3.22 Crisis looks and the epoch path — the hand-over (item 122) ===
### 3.22 Crisis looks and the epoch path — the hand-over (item 122)

A crisis look (item 122) is drawn by §8.2's look rows through §7.7's DR44 and §10.2's crisis look table while its
`ConditionOverlay` stands in the view's week (§2.7). It is a look only: it never adds, moves or removes anything and
writes no op, event or record, so no epoch reads it. This section is the engine's side of the item, where the look meets
the history (J-V6.137, J-V6.138):

```ts
// @plat/evolve — pure services over the model the view draws; no stream advanced, no op, nothing stored (memoized per model digest)
frontierFor(doc: Document /* the model the view draws: the head, or the frame locate(w) gives (V06 §3.15.2) */, households: number): FaceRef[]
crisisLookYields(doc: Document, building: Id, overlay: Id | null /* the ConditionOverlay whose look ruins the building; null: a preview */, week: number): boolean
```

1. **The aftermath is the next epoch's.** What a crisis leaves reaches the model only by the epoch path, in the epoch
   that holds its week: the calamity as an `EpochInputs.events` entry (DR28) that the `hazards` phase runs at its F5
   targets, struck in place (V06 §3.11.1) — the burned quarter and the ruined institutions; the deaths and the exodus
   through the epoch's population target (the departures, V06 §3.5.1), the `deaths` also into the burial need (V06
   §3.18.2 (3)); the newcomers who stay through the target's rise, seated by `siting` and `growth` (V06 §3.8, V06 §3.6);
   a condition's weight on building through the `works` phase (V06 §3.13 (6)). A condition with no calamity and no
   population change leaves nothing, and its look ends with it. A crisis preview (V09's switch) has no condition and no
   aftermath.
2. **The camp at the growth frontier.** `frontierFor(doc, households)` answers where the `growth` phase would seat that
   many more households next, by its own rules over the model the view draws, drawing nothing:
   a. **Who.** The roster's next `households` ordinals above the present population (§10.2's sequential roster, as S2's
      delta demand reads them), taken as the phase's residual (V06 §3.6 (1)): the regrowth-first tiers are not offered
      them — newcomers the standing plan can hold settle inside at the epoch, and the camp's ground stays as it was.
   b. **Whether a stage grows.** V06 §3.6 (2)'s decision on them (no draw), with the backlog `B` and the crowding `C` as
      the model stands: their part above `growth.crowdBands` takes the rich ribbon's land; the rest with `B` take a stage
      when they reach the quantum `q`.
   c. **Where.** A stage takes the land S5a's boundary rule (§4.4) adds beyond the outermost boundary — the level set of
      `T` as it stands, sized to the households at their bands' plot areas — under the regime V06 §3.6 (3) gives an
      unwalled stage of that size. The query runs no wall decision (V06 §3.7.1 draws), so a stage the next epoch walls may
      take its ring's land instead and the camp stands at the unwalled frontier. The answer is the hinterland `LandUse`
      faces (§2.7) that the stage's land and, where (b) gives a rich part, the rich ribbon's plots along its arterial
      cover, in address order (the ribbon's alone where (b) leaves no rest); a stage S5a seats only in part adds (d)'s
      belt for the households it cannot seat.
   d. **No frontier.** Below the quantum (the overflow ladder would hold them, V06 §3.6 (2)), on a frame with no reachable
      land left (S5a's cap), at a village rung (V07's growth override, V06 §3.1) and on a standalone neighbourhood document
      (no S5, V06 §1.3), the answer is the ground of the overflow ladder's last rung: the belt of `overflow.tentBeltM`
      outside the outermost boundary along the busiest arterial, by the gate or boundary crossing it leaves through —
      item 122 (b)'s approach road by a gate (at a village rung, the entry of V07 §5.6 (2)'s main approach road); with no
      arterial leaving the settlement (S3 (9) (a)'s unserved mesa), the belt's faces nearest the boundary point closest
      to the growth centre (S3's root reservation, §4.2). Below the quantum with a rich part ((b)), the answer adds the
      rich ribbon's plots of (c). Zero households answer none.

   §10.2's refugee-camp placement reads it, ranking V01's `campLand` faces by their distance to the answer, so the
   newcomers who stay become the next epoch's suburb where the camp stood. The answer follows the committed state: once an
   epoch builds on the camp's ground, the next call answers the next frontier out, and the camp is drawn there while its
   condition stands.
3. **Reconstruction as Works — the look yields.** The `reconstruction` archetype reaches the model as every condition
   does, through the `works` phase's share (V06 §3.13 (6); V08's archetype row), and the rebuilds after a disaster are
   the epochs' own ops — tier (3) on burned plots, a repair, a clearance (V06 §3.8, V06 §3.11.2). The look hands over
   building by building: `crisisLookYields(doc, building, overlay, week)` is true when a Works on the building other
   than a `decay` Works has started by `week` and did not finish before the overlay's `sinceWeek` — read from
   `Building.works` (§2.6) and, once a record retires, from its lifecycle event's weeks (§4.11 *Works* (9)). §8.2's
   disaster look row, V02's ruined exterior and V03's look damage draw a building's ruin only while it is false; from
   then on the building draws its Works' stage and its own state. So no week draws both the ruined look and the rebuild's
   scaffolding, and a building no rebuild reaches keeps the look until its condition ends. A preview (`overlay` null)
   never hands over: `crisisLookYields` is false for it, so a previewed ruin draws over every building of its units
   whatever their Works, and ends with the preview. A `decay` Works never ends the look: a building the aftermath emptied draws the higher of the look's level and its own decay level (item 122 (d);
   V06 §3.23).
4. **Lifecycle and edges.** `frontierFor`'s answer and `crisisLookYields` are derived and never stored (V06 §2.12): a
   reload, a regeneration and an undo re-derive them. Their edges — a look standing when its aftermath epoch folds, a
   condition with no calamity, the aftermath epoch undone on a what-if copy, a replay epoch, a port epoch carrying the
   calamity, a camp over ground an epoch builds on, a preview over a rebuild, every rung — are V06 §3.21's rows; T-V6-75 is the bar.
=== END ===
=== REPLACE ### 3.23 The decay level of a building lineage (item 123) ===
### 3.23 The decay level of a building lineage (item 123)

Item 123's damage layer — one plan, never redrawn, each element shown damaged while the building's decay level is above
0 and at least its keyed threshold (§6.3 *Plan damage*'s comparison; §2.6 step 7; V03, V02 and V04 draw it) — reads its
level here. The level is derived and never stored (J-V6.139):

```ts
// @plat/evolve — pure over the lineage's lifecycle events (§2.8) at the weeks their changes show ((1)), its Works and V11's item-123 rows
decayLevel(doc: Document, lineage: Id, week: number): number   // in [0, 1]
decayPeak(doc: Document, lineage: Id, week: number, since: number /* the element's entry week into the plan, V03 §5.6 */): number   // the highest decayLevel over [since, week] ((3))
```

1. **The decay run.** A building lineage is in a decay run at week `w` from the week `A` at which the lifecycle event
   that took it from a standing state into `abandoned`, `decayed` or `ruined` shows — a `vacate`, a fire's `burn`
   (`decayed`, drawn CHARRED), a flood's or a topple's `ruin` (V06 §3.5, V06 §3.11) — until a restoring event (3). The week
   a change shows is the start week of the Works the event started (V06 §3.13 (2): a hazard's change at the hazard's week,
   a `vacate`'s `decay` Works at its drawn offset in the epoch's span), read from `Building.works` (§2.6) and, once the
   record retires, from its lifecycle event's weeks (§4.11 *Works* (9)); else the event's effective week (V06 §2.11's
   `EffectiveWeek`: an engine op's is its epoch's week). So the plan's damage and the exterior's stage agree at every
   week, inside a yearly epoch and a coarse one alike (item 123 (d); §13.2's T123-5). Its state `s` at `w` is the
   existence the last such event dated so at or before `w` set — the strike pool's and the hazards' ops move it (V06
   §3.5.2, V06 §3.11), the level never does.
2. **The level in a run.** `decayLevel = min(hi(s), max(lo(s), r × (w − A) ÷ 52))`. Each state owns a third of the
   range — `abandoned` [0, 1/3], `decayed` [1/3, 2/3], `ruined` [2/3, 1] — so item 123 (c)'s look of each state holds
   whatever the years, V11's range for each element kind lying inside the shares of the states whose looks item 123 (c)
   gives it (V11 §3.25.10's `states`; the upper floor's across `decayed` and `ruined`). `r` is V11's decay rate per year
   for the building's walls material (`Building.material.walls`, read for time only, as §4.11's `WorksTable` reads it):
   timber and thatch faster than stone. Years only add and the ladder only climbs, so the level never falls while the run
   lasts (item 123 (b)). A run that begins before a restoration has finished starts from the level that restoration left:
   its level is the larger of the formula and that level. Outside a run, a standing building's level is 0.
3. **Restoration** (item 123 (b)'s "reused" — the building put back to use, a `reoccupy` from vacant or derelict, V06
   §3.8.2 — and a repair; J-V6.141). A `reoccupy` from vacant or derelict (V06 §3.8.2 (1)–(2)) or a hand repair lowers the
   level, shown by the `repair` Works it starts (§4.11 *Works* (4)–(5)): from that Works' start week `S` the level is
   `L × (1 − f(w))`, `L` the level at the week before `S` and `f` the Works' working-week fraction (§4.11 *Works* (2)), 0
   at FINISHED; with no Works (an undated hand edit, the parity presets, `works.enabled` false) it is 0 from the event's
   effective week. As the level falls past each threshold that element leaves the damage, so the damage leaves in reverse
   threshold order, the highest first. `decayPeak` is read per element: the highest level since the element entered the
   plan — the as-built plan's elements at the lineage's build, the elements a re-cut makes (V03 §3.11, a restoring
   event's included) or a wing an `extend` adds at that change's effective week — so an element added after its
   building's damage left is never drawn repaired, and an element a re-cut keeps keeps its peak. An element whose
   threshold lies above the present level and at or below its peak is drawn repaired, in patch material (item 114's
   patchwork; V03's drawing), until the plan itself changes — a `rebuild`, a demolition, or a successor raised on the
   trace (§6.3: its own lineage and plan, level and peak 0). §2.8's `reused` state — the cleared trace worked as a
   garden, orchard or field — like `cleared` and a demolition holds no plan: its level and peak read 0 from the event's
   effective week, its damage leaving with the building.
4. **A building first met decayed, and the replay's ruins.** A building generated `abandoned`, `decayed` or `ruined` —
   its log holding no event that took it there from a standing state — reads its state as a decay run begun `D` years
   (V11's default age) before the week it is first met so: `A` = that week − 52 × `D`, for a building generated so the
   creation week (the week of the document's `generate` event, §4.11 *The clock* (1)) — so it reads `D` years when first
   met and ages by (2) from then on as any run (item 123 (b): damage only accumulates as decay goes on); its plan is the
   one it had when built, then that damage (item 123 (a); V03 §3.11 (c)). A building item 113's replay abandons or ruins
   (its decline, its hazards, V06 §3.20.5's destruction epoch) has its decay run in the creation prefix from the week (1)
   gives its change in that replay epoch — the epoch's week where the epoch runs at model level and starts no Works (V06
   §3.20.4) — so the present and every scrubbed week show its replayed years (item 123 (a); (5)), over the plan V03 §3.11
   gives it (the replay derives none). Until this volume's E2 lands (M6-E) every reader reads every building by its
   existence state alone at V11's default age. While V11's item-123 rows are not shipped, `r` and `D` read 0 and the level
   is its state's floor, `lo(s)`; a material with no row reads V11's default row.
5. **Reads.** Every reader passes its week — the head's current week, a scrubbed frame's (V06 §3.15.2), an export's drawn
   week, a replay epoch's (a negative week is read as any week) — so scrubbing the history shows one plan aging (item 123
   (a)). The level is a reading, never an input of an epoch rule: no op, draw or digest reads it, so it changes no model,
   replay or hash (the `item123.damage` pin is V03's and V12's).
6. **Lifecycle, edges, bar.** Derived (V06 §2.12): a reload, a regeneration and an undo re-read it, an undone epoch's
   events gone. Its edges are V06 §3.21's row; T-V6-76 is the bar.
=== END ===
=== REPLACE ### 4.3 Locality, locks and the order of events ===
### 4.3 Locality, locks and the order of events

* **An epoch's scope is its touched set.** The locality oracle (§7.3) holds for an epoch as for any event: every entity
  outside its touched set and its faces is byte-identical before and after (T-V6-3). The engine's reach is wide by nature,
  but every change it makes is an op with its own recorded scope.
* **Protection first.** Locked, pinned and declared entities, assigned ones outside the use rules and the building of a
  dossier-backed use before its relocation are filtered out before any draw or cap (V06 §3.1; J-V6.7), so holding a thing
  never shifts which other things the history picks — the town adapts around it. A dossier event is the one exception,
  by §7.7's precedence: a lock or pin on what it changes is superseded and reported orphaned, and a dossier population
  fall the unlocked households cannot meet takes locked and pinned households too (V06 §3.5.1 (1)) and lets a locked or
  pinned dwelling's last household out by a `relet` down to 0, never a `vacate` (V06 §3.5.1 (4)–(5)) — no other fall
  does either.
  **A removed generated raised way,
  harbour-mouth chain, quay wall, retaining wall or deck plot** is held by its suppression (V06 §3.19.3), which a tombstone
  alone could not do (§6.3's collision rule mints over a tombstone): no epoch, regeneration or re-run re-founds it while
  the removal is live.
* **Edits between epochs** are ordinary events at the head; the next epoch reads them as state. An edit on an entity with a
  running Works follows §4.11 *Works* (1)–(2).
* **Undo across epochs.** A standalone epoch is undoable while it is the latest live event, and through the independence
  check of §7.4 otherwise — which an epoch's wide touched set usually fails; the conflict then offers "re-run from before
  it" (V06 §4.4) instead. No event of the port's session `host:port` — a port epoch, with or without a dossier change,
  a dossier event — is an undo, redo or revert target (§7.4 *Replay semantics*), nor are the replay's epochs (V06
  §3.20.7).
=== END ===
=== REPLACE ## 6 Performance budgets ===
## 6 Performance budgets

Measured on §12.1's reference hardware at the port's cadence (52 weeks), PLAUSIBLE until the E0 spike (V06 §8) times them
on the golden TOWN, B-CITY and METROPOLIS seeds with a scripted 100-year history (+1 % a year, then −1 %, then +1 %).
Every row below is a **target** — as fast as possible (item 119 (a)); the two waits a user sits through once that this
volume makes, an `advance` and a history-first generation, each finish inside §12's ten-second **comfort level** in total,
whatever their span, by V06 §6.8's estimate and coarsening (item 119 (a2); J132), and a dossier catch-up's epochs are
coarsened by the same estimate inside §12's waits for a dossier change applied and an open from SettlementForge (V06
§6.8 (6)). A row E0 measures above its target is a
declared target miss inside the comfort level (D-18), with its pre-decided fallback stated; a step runs slower than its
target only for a recorded measured gain (item 119 (b); §12.10); the interactive rows of 6.4 keep their budgets (item 119
(d)).

**6.1 One epoch** (model work in the generation worker; a new stage's S5–S13 excluded — it is §12.6's scoped-regeneration
law over the stage's buildings; the participants in 6.2). **The work sizes** the rows assume (PLAUSIBLE until E0; the
golden seeds' counts): TOWN ≈ 60 classes with uses, ≈ 300 uses, ≈ 800 way edges, ≈ 1 000 households; CITY ≈ 120 classes,
≈ 1 500 uses, ≈ 2 000 way edges (V04 §6's count), ≈ 5 000 households; METROPOLIS ≈ 200 classes, ≈ 6 000 uses, ≈ 8 000
way edges, ≈ 25 000 households. **The unit costs**: a Dijkstra edge relaxation ≈ 0.3 µs (V04 §6's rate), a bounded
Dijkstra at a class's `serviceRadiusM` visiting ≈ 40 % of the graph; one S10b score ≈ 3.5 µs (the 2–5 µs band); an opening
scores the top `uses.openCandidates` plots by S10a's class raster at the candidate's centroid, then the full score; a
thriving use is scored against its ≤ 40 candidates only when its move-chance gate passes (its first draw on
`use.relocate`, V06 §3.9.5 (3); J-V6.68) — about `moveChance × years` of the uses.

| phase | TOWN | CITY | METROPOLIS | derivation (the dominant cost) |
|---|---|---|---|---|
| prelude, demand, dossier, lapse, close (incl. the feature re-resolution and the ladder steps) | 5 | 10 | 25 | table reads, S2's delta, the report |
| hazards (incl. the calamity mapping, `raiseGrade`'s trigger test, the drought's `dry`) | 2 | 5 | 10 | a fire's rings (≤ `maxBuildings` spatial queries); `raiseGrade` itself is V04's buried-system builder at §12.6's scoped law; `dry` ≤ the springs |
| field: S6 re-evaluation (base) + the shade mask incremental, every arena | 15 + 5 | 35 + 20 | 90 + 60 | the driver kernels; ≈ 10 % of the cells re-marched (full recompute ≤ 40 / 120 / 400); the way-surface re-lay (V06 §3.4 (9)) over the ways a re-banded plot fronts, one table read each, < 1 ms |
| uses — strain: one labelled bounded Dijkstra per class | 6 | 30 | 190 | classes × edges × 0.4 × 0.3 µs |
| uses — moves: the gated re-score | 4 | 15 | 60 | uses × ≈ 0.08 × 40 × 3.5 µs |
| uses — openings and closings (with the coverage counts updated per op, O(districts)) | 5 | 15 | 50 | ≈ 1 % of the uses × 64 × 3.5 µs, plus the prefilter |
| uses — link re-binding after each committed op (item 105 (a)) | 5 | 30 | 140 | per op two bounded Dijkstras over the affected goods (≈ 1 ms at CITY, ≈ 1.4 ms at METROPOLIS) × the epoch's committed ops (≈ 5 / 30 / 100) |
| uses — the relaxation pass (≤ 2) and split / merge tests | 3 | 10 | 40 | the two-way classes' moved uses × 40 × 3.5 µs, twice |
| departures, decline (incl. garden reuse and passages; the raised, retaining, deck and landfall candidates: + 1 / + 3 / + 8) | 6 | 18 | 48 | the exposure field once; the pool; ≤ 4 raised ways' spans, the retaining walls under abandoned terraces and the decks at their dead crossings |
| fortification (incl. barrier closure, water access, waterfront, item 114's decay and repair), terrain and water (incl. the springs) | 3 | 10 | 25 | a pathway's stretches and the rings' runs (one draw each); candidates; a trace (when one fires) at §4.4 S5a's own budget, excluded |
| `raisedWays` — lapse, repair, candidates and gates (a course is solved only for an admitted live candidate, at the S5a trace's own budget, and is excluded, item 244's support step with it) | 2 | 5 | 12 | viaducts: the primary and secondary ways × the crossed features, ≤ 40 × 10 at METROPOLIS, each a chord sampled at the terrain cell; elevated roads: ≤ 20 endpoints, ≤ 190 pair segments; aqueducts: ≤ 20 sources × one need reading; the lapse and repair of ≤ 4 standing ways |
| ladder + mutation steps | 20 | 70 | 200 | rung-3 re-cuts at the scoped law; S11 steps ≤ 5 ms each (§12.6) |
| siting | 15 | 50 | 150 | tiered placement with the solver's score |
| growth decision (incl. the crowding hook's seating) | 2 | 5 | 10 | U-FRONT's placement for ≤ `crowdingShare` × the residual |
| character, works | 5 | 15 | 40 | S12c; the Works' draws |
| **total (excl. stage, participants)** | **≤ 103** | **≤ 343** | **≤ 1 150** | |

*Pre-decided fallback* (uses over budget at METROPOLIS): the link re-binding is batched per class at the end of each
class's openings (one re-bind per class instead of per op; output changes only in visiting order through re-binds — a
declared shift by §13.3's protocol, the miss it answers a declared target miss inside the comfort level); then the move re-score visits each use every `k`-th epoch in address-hash rotation
(`k` = 2, then 4), a use under strain every epoch; the ladder's fallback is §12.6's. *Pre-decided fallback* for
`raisedWays` over budget: its candidates are read only for the ways, wards and sources an op of the epoch changed (the
suppressed keys excepted, read at every epoch, V06 §3.19.3 (2)), and in full every `k`-th epoch (`k` = 4) in address-hash
rotation — a declared shift in when a reason is first seen, never in its gate draw.

**6.2 Participants and a century.** The participants' per-epoch budgets (their volumes' own rows govern when they land;
these are the sums this volume's century targets and V06 §6.8's `epoch.costMs` assume, PLAUSIBLE until E0):

| participant | TOWN | CITY | METROPOLIS | source |
|---|---|---|---|---|
| `sky.islands` (≤ 3 islands: the step and the strips; the per-event island work — a raise, a resize, a fall — outside these cells, at every rung where an island stands, summed into the century below) | 10 | 20 | 25 | V05 §6's rows "`IslandEpochStep`, per island" and "field pass 2: the strips onto the ground, per island (and per epoch)" over ≤ 3 islands |
| `under.fade` | 3 | 8 | 20 | the fade candidates over the elements' exposure samples (V04 §3.10) |
| `under.extend` (the foundations over the epoch's new footprints, supports and footings — a static-index query; sewer extension over the new ways, catacomb growth ≤ 300 nodes, crypt joins, workings, the arch-vault reconcile over `scope.raised` ≤ 3 ms p95, the invert drops) | 6 | 17 | 43 | V04 §6's T1 and T2 rates over the epoch's share |
| `under.access` (a static-index query over the epoch's new footprints and elements) | 5 | 15 | 40 | V04 §6's T5 rate over the epoch's scope |
| `under.undercity` (incl. F6's relocations and the in-participant re-homing, ≤ 1 ms at CITY) | 1 | 4 | 8 | V04 §6's T4 row |
| `hood.fabric` (S7c and S9b on the new faces; the close-ups a raised part crosses) | 2 | 5 | 8 | V01 §6's rows per new district |
| `sky.clearance` (≤ 3 islands) | 3 | 3 | 3 | ≤ 1 ms per island (V05 §6) |
| `village.plan` (scope: a village rung) | 0 | 0 | 0 | V07 §6: no ops at TOWN and above — its gate's one early return |
| `village.density` (scope: a superseded `VillagePlan`, under any product) | 6 | 6 | 6 | V07 §6: ≤ 6 ms p95 at a base-product epoch while a superseded `VillagePlan` stands (VS2's raster over the old core's box); 0 without one |
| `village.pins` (scope: a village rung) | 0 | 0 | 0 | V07 §6: no ops at TOWN and above (≤ 2 ms inside a village epoch) |
| **participants total** (the per-event island work excluded) | **≤ 40** | **≤ 81** | **≤ 157** | |

A village-rung epoch is V07 §6's (≤ 60 ms at the VILLAGE target, its participants inside), below TOWN's row, which bounds
it in V06 §6.8's estimate.

**A century** (100 epochs at the port's 52-week cadence at a town growing 1 % a year, growth stages and participants
included; hand edits during the span excluded — each is an edit at its own row; item 110's rows add ≈ 0.7 / 1.3 / 2.6 s of
epoch work and at most one course solve per founding, ≤ 4 per century at METROPOLIS):
* **The sky's island events**, derived from V05 §6's rows (their home; J-V6.118), the CITY / METROPOLIS columns, a TOWN
  reading CITY's (its islands no larger): "a resize, a rim reshape" — ≤ 5 ms + §12.6's scoped regeneration of each
  receiving district and of the district whose institution claim is re-searched (at most k ≤ 3 in all) + §12.6's
  scoped-regeneration law once over the plots the event re-cuts outside those districts + 30 ms per re-claimed landing
  yard's top placement (one per access) + 30 ms per re-landed foot's placement; "`fallIsland`" ≤ 80 / 110 ms; a raise at
  `raiseIsland`'s parts, bounded by "declaring an island after generation" ≤ 120 / 160 ms. With an island's buildings
  ≤ 5 % of the town's (V05 §6's unit-run row: ≈ 2–5 % of the town's plots) at the default request's buildings (§12.5's
  table: ≈ 1 500 at TOWN, ≈ 6 000 at CITY, ≈ 15 000 at METROPOLIS), ≤ 300 / 750 at CITY / METROPOLIS, §12.6's law
  (≤ 3 ms + 60 µs × the buildings in scope, plus ≤ 3 ms of deltas, once per district) gives a growing resize re-deriving
  all three of its districts ≈ 3 × 6 ms + 60 µs × 300 / 750 ≈ 36 / 63 ms, and a shrink re-deriving at most the claim's
  district (a third of the island) ≈ 12 / 21 ms; the plots re-cut outside those districts, one scope, are a growing
  resize's yards' (≤ 3 plots a yard by V05 §6's basis, ≤ 9 buildings: ≈ 7 ms) and a shrink's rim ring (its eroded band
  ≤ 0.025 · r a year, below; at most a third of the island: ≈ 12 / 21 ms). **The access bound:** the century is priced
  on an island's **generated** accesses, at most `accessCount.max` (3; V05 §2.4) — each yard's top placed and each foot
  re-landed, 3 × 30 ≈ 90 ms for the tops and as much for the feet — so a growing resize costs ≈ 5 + 36 + 7 + 90 + 90 ≈
  228 ms at CITY and ≈ 5 + 63 + 7 + 90 + 90 ≈ 255 ms at METROPOLIS, a shrink ≈ 5 + 12 + 12 + 90 + 90 ≈ 209 ms and
  ≈ 5 + 21 + 21 + 90 + 90 ≈ 227 ms. **Each hand-placed access** (at most `accessCount.handMax`, 6 an island; V05 §4.2,
  J-V5.82) is the user's own edit, priced beside the bound at V05 §6's row: 30 ms for its top and 30 ms for its foot at
  each resize of its island, ≈ 60 ms a resize (its yard's ≤ 3 plots inside the rounding) — at the cap + 360 ms a resize
  (≈ 588 ms for a growing resize at CITY), so an island with six hand-placed accesses resized at every epoch adds
  ≈ 36 s to a century at the port's cadence; V06 §6.8's estimate charges it for the accesses that stand
  (`epoch.handAccessMs`).
* **V05 §4.2's re-landing rule bounds nothing below one re-landing per foot per resize.** A vertical access's foot
  re-lands only when its top's move leaves its landing plot (a slanted one only past its run), but a resize moves the rim
  by the buffer distance, at most `growthPerYear` · years · A ÷ P ≤ 0.025 · years · r for the disc of the island's area
  (the least perimeter for an area; V05 §2.4's dynamics row), ≈ 4.5 m a year at CITY's `areaHaMax` and ≈ 6.3 m at
  METROPOLIS's, while a ground plot may be 3 m wide (§15.2's O5 (b)), and a top moves along its ray at least as far as the
  rim does, so one resize can carry a foot off its plot; over a century the rim can travel 2.5 · r (≈ 450 / 630 m),
  ≈ 150 / 210 least plot widths, more than the century's 100 resizes; and a target that moves back and forth carries a
  foot across the same plot line at every resize. So the worst case is every island resized at every epoch with every
  yard's top placed and every foot re-landed. **A fall does not raise it:** a fall ends a settled dwell of at least 10
  years in which the island is not resized (V05 §3.15 (3)–(4); V05 §2.4's dynamics row), and a fall with a raise in one
  epoch (≈ 80 + 120 / 110 + 160 ms) costs less than the ten resizes the dwell forgoes. So, at worst: **CITY** 3 × 100 ×
  228 ms ≈ 68.4 s; **METROPOLIS** 3 × 100 × 255 ms ≈ 76.5 s; **TOWN**, whose rung row admits no island (V05 §3.15 (1): the
  target 0, and no slot re-opens), each of ≤ 3 carried or declared islands waning once — a shrink at each of ≤ 15 epochs of
  the longest waning dwell — then settling and falling: 3 × (15 × 209 + 80) ms ≈ 9.6 s. In a history whose islands resize
  one epoch in five or fewer (V05's hysteresis 0.05 against a target that follows a town growing 1 % a year), the sky's
  share is about a fifth of these.
* **The growth stages** at §12.6's law (V06 §6.1): ≤ one stage an epoch at ≤ 6 ms each plus 60 µs × the buildings the
  century adds (≈ 1.7 × the default request: ≈ 2 500 / 10 000 / 25 000) ≈ 0.75 / 1.2 / 2.1 s.
* **The sum** — the century's cost at the port's cadence, the target its rows add up to: TOWN 100 × (103 + 40) ms +
  0.7 s + 9.6 s + 0.75 s ≈ 25.4 s; CITY 100 × (343 + 81) ms + 1.3 s + 68.4 s + 1.2 s ≈ 113.3 s; METROPOLIS 100 × (1 150 +
  157) ms + 2.6 s + 76.5 s + 2.1 s ≈ 211.9 s, each hand-placed access adding its 60 ms a resize beside them. No user waits for
  these sums: an `advance` of a century folds at the cadence V06 §6.8's estimate admits, inside the ten-second comfort level
  in total — in steps of several years where these sums say a year at a time would not fit (V06 §6.8 (4)).
The century runs as a background job with progress past one second (V09 §4.21.9), never blocking the picture or an edit
on another document; the map redraws each epoch's `DisplayDelta` as it folds (the user watches the town grow).
`advance.maxEpochs` bounds one request's epochs; a longer span bends its cadence (V06 §3.3.2).

**6.3 Replay and load.** Under the `'history'` strategy an epoch's replay cost `c(e)` in §12.6's law is its compute above
plus its participants' (it is recomputed, not read; file f item 478), so a century-old CITY document verifies within V06
§6.2's CITY century sum after load (its island events included), off the path to the picture (§12.6, §2.9 step 3),
rebuilding the history store as it goes. A `'grow-by-stage'` epoch keeps §12.6's scoped bound. A replayed document's
creation prefix verifies at V06 §6.7's replay cost.

**6.4 Scrubbing and frames.** A cached frame ≤ 50 ms to the drawn delta at CITY, ≤ 120 ms at METROPOLIS; the images path
≤ 15 ms per event applied at CITY, ≤ 40 ms at METROPOLIS, so any frame within `history.checkpointStride` epochs of a
keyframe ≤ 300 ms at CITY and ≤ 800 ms at METROPOLIS; the effective-week before-images (V06 §3.15.2) add ≤ 5 ms per frame at
CITY; the replay path ≤ the epochs' compute, with progress. Play at one epoch per 0.5 s holds at CITY from cached or
image-built frames and at METROPOLIS from cached frames. *Pre-decided fallback:* the stride halves (5) while the store's
memory allows; failing that, play steps through keyframes only.

**6.5 Memory.** The history store ≤ the device's setting (V09 §5.12: 256 MB desktop, 96 MB low-end; V06 §2.2) in memory, the rest on the app's disk cache. An epoch's
images ≈ 0.5–2 MB compressed at CITY (pass ≤ 1.5 MB mean) and ≈ 2–6 MB at METROPOLIS (pass ≤ 4 MB mean) — so the desktop
store holds ≈ 150 CITY or ≈ 60 METROPOLIS epochs before spilling; a keyframe is the chunks changed since the previous one
(≈ 5–15 MB at CITY, ≈ 15–40 MB at METROPOLIS over 10 epochs, copy-on-write); frames ≤ the device's frame setting × the
model's changed chunks. The retirement rule's extra year of finished Works (file f item 321) adds ≤ 2 % to the model at
CITY. The shade mask: one bit per sample point and sun per 32 m cell, read from the sampler's layout (§4.5 (iii)) — by
default one point and nine suns, 9 bits a cell: ≈ 11 KB at CITY (≈ 10 000 cells), ≈ 45 KB at METROPOLIS (≈ 40 000 cells),
each island arena ≤ 5 KB; at four points a cell (§4.5 (ii)'s fallback) 36 bits a cell — ≈ 45 KB, ≈ 180 KB and ≤ 20 KB. An
advance group's undo holds one checkpoint and the latest epoch's record (V06 §4.1), inside §7.4's cap. The per-epoch `why`
rows add ≤ 5 rows × ≈ 24 bytes per use op to the identity layer (≈ 1–3 KB per CITY epoch); the `HistoryRecord` ≤ 60
epochs × their events, ≤ 20 KB. *Fallback:* images kept only at every 5th epoch (the others by replay from the nearest),
reported.

**6.6 Exports.** A frame's PNG export at the PNG export's own budget (§12.7) plus the frame's build (6.4); the APNG ≤ that
× its frame count, streamed.

**6.7 The history replay at generation** (item 113; V06 §3.20.4). A coarse replay epoch costs about one epoch of 6.1 and
6.2 at its rung — its phases run once however many years it spans, only its deltas growing — plus its stage at §12.6's
law, and less at model level (no Works, no lazy rung, no images). The per-epoch cost rows `epoch.costMs` (our own, not
calibratable: a cost bound; read by both of V06 §6.8's estimates) are TOWN and the village rungs 150 ms, CITY 430 ms,
METROPOLIS 1 310 ms — 6.1's total with 6.2's participants (≤ 143 / 424 / 1 307 ms), rounded up to the next 10 ms; the
replay's share of the comfort level, `replay.budgetMs` by the peak's rung, is TOWN and below 9 s, CITY 8.5 s,
METROPOLIS 7 s (V06 §6.8 (2)). So, at the owner's decade (V11's `history.epochYears`), the sky layer off: a town's
history of 300 years (30 epochs at TOWN, ≈ 4.5 s, with its growth's stages ≈ 4.8 s) fits whole; a city-to-village history
like H-HISTORY's (25 epochs, about ten of them at CITY: ≈ 4.3 + 2.3 ≈ 6.6 s) fits whole; a metropolis grown from its
founding over 300 years — about ten epochs each at TOWN, CITY and METROPOLIS, ≈ 18.9 s, and its 35 000 buildings' stages
≈ 2.1 s — runs in 50-year epochs (six, ≈ 5.9 s); with the sky layer on, every epoch from the first at CITY also charges
three islands' resizes (V06 §6.8 (1)), coarsening a city's or a metropolis's history further. The peak's generation
(S0–S13a) is §12.3's one-click cost at the peak's size, before the replay, and the present's first map §12.5's, after it
— both inside the ten seconds by `replay.budgetMs`'s derivation. The replay runs with progress in the generation worker
before the first map (V06 §3.20.4); PLAUSIBLE until E0 times the three golden histories of T-V6-71 (a city-to-village
history, a refounded one, a metropolis in decline), the measured wait a bar (T-V6-24), never an input. *Pre-decided
fallback:* `replay.detailRetainYears` halves (fewer full epochs), then the per-epoch cost rows rise to the measured costs,
coarsening further — the history's events and targets kept, only its grain coarser.

**6.8 The comfort level — `advance`, the history replay and a dossier catch-up in total** (item 119 (a), (a2): the owner's "Total",
2026-10-01; J132; J-V6.135). §12's ten-second comfort level binds each of this volume's two one-time waits, from the click
to the complete result — the map's final complete frame — on §12.1's reference hardware, at every rung to the metropolis
cap: an **`advance`** (the time card's Accept, the clerk's, the CLI's; V12's `wait.advanceTime`) and a **history-first
generation** (the start's generation, the replay and the present's first map; V12's `wait.historyReplay`) — and the
epochs of a dossier catch-up inside §12's waits for a dossier change applied and an open from SettlementForge ((6)). The
rows of 6.1–6.7 stay the targets; this is how the three stay inside the ten seconds whatever span they are given, a
catch-up whose dossier events alone pass its budget excepted ((6)):
1. **The estimate** — one function for all three, of the epochs it is given and of the document (an `advance`, a
   catch-up) or the recipe (the replay) at the request, never of a measured time, so the cadence it decides is deterministic and a replay of the
   log folds the same epochs:
   `E = Σ_i (epoch.costMs[r_i] + I_i × epoch.islandMs[r_i] + H × epoch.handAccessMs) + epoch.stageMs × g +
   epoch.stageMsPerBuilding × ΔB + a × N`, where
   * `r_i` is the rung of epoch i's target by the registered products' ladders (§1.1's router; a village rung reads TOWN's
     row);
   * `I_i` is the islands that may stand at epoch i: V05's three slots (V05 §3.2) at every epoch from the first whose rung
     is CITY or METROPOLIS while the recipe's `layers.islands` is on — islands carried below CITY wane, settle and fall over
     later epochs (V05 §3.15) — and before it the islands standing at the request: an `advance`'s or a catch-up's document's,
     none in a replay (a start below CITY generates none, II.6 (2)); each may resize at every epoch (V06 §6.2's worst case);
   * `H` is the hand-placed accesses standing at the request (an `advance` or a catch-up; a replay runs before any edit), each
     re-landed at each resize of its island (V06 §6.2's edit-borne cost);
   * `g` is the epochs whose target rises above the previous one (each may grow a stage) and `ΔB` the buildings the rises
     add, Σ max(0, target_i − target_{i−1}) ÷ 3.4 (§12.2's persons a building) — §12.6's scoped law for the stages
     (V06 §6.2's growth term), a part a coarser cadence does not shrink;
   * `N` is a catch-up's dossier events (0 for an `advance` and the replay), each folded at its own week and never
     coarsened ((6)), and `a` V08 §6's per-event absorb bound at the document's rung — 30 ms at TOWN and CITY (a village
     rung reading TOWN's), 45 ms at METROPOLIS — the other part a coarser cadence does not shrink.
2. **The budgets.** `advance.budgetMs` (9 000 ms) leaves one second of the ten for the expansion and the estimate, the
   last epoch's redraw (§12.5's settle, ≤ 250 ms at METROPOLIS) and the group's commit; `replay.budgetMs` by the peak's
   rung (TOWN and below 9 000, CITY 8 500, METROPOLIS 7 000 ms) leaves the start's generation and the present's first map
   at the rung's band top (§12.5's T(B): 246 / 589 / 2 290 ms) and a 500 ms reserve for the `HistoryRecord`, the report
   and the commit. The history images an epoch writes (V06 §3.15.2) are captured in its commit as copy-on-write
   references and compressed into the store after the wait completes, at background priority, so no image costs the
   wait (the store is non-canonical; until compressed, a frame reads the references).
3. **The coarsening.** An `advance`'s cadence (V06 §3.3.2) becomes the smallest whole number of weeks, tried upward from
   the cadence asked (after `advance.maxEpochs`' bend), whose epochs' `E` is at most `advance.budgetMs`; the replay's
   epoch length (V06 §3.20.1 (3)) the smallest whole number of years, tried upward from `history.epochYears`, whose
   epochs' `E` is at most `replay.budgetMs[the peak's rung]` and whose count is at most `replay.maxEpochs`; a dossier
   catch-up's step the smallest whole number k of crossed year ends whose `E`, its events' term included, is at most the
   catch-up's budget (6). One epoch over the whole span always fits an `advance`'s and the replay's budgets: its `E` is
   at most 1 310 + 3 × 260 + 18 × 60 + 6 + 0.06 × 35 000 ≈ 5.3 s at the metropolis cap with the hand-placed cap on three
   islands — so no request is refused and no span shortened (item 101 R2); a catch-up's fits its budget but where its
   dossier events alone pass it ((6)). The cadence chosen is reported: the card's and the clerk's one line, `EpochReport.advance`,
   `ReplayPlan.epochYears` and the report's `replay.epochYears` (V06 §2.10, V06 §2.14); V09's progress view counts the
   epochs at it.
4. **What a user sees** (at the reference rows; PLAUSIBLE until E0): a century held at its size, the sky layer off, folds
   at TOWN in 87-week steps (60 epochs, ≈ 9.0 s), at CITY in 5-year steps (20, ≈ 8.6 s) and at METROPOLIS in ≈ 17-year
   steps (6, ≈ 7.9 s); with the sky layer on, at CITY in 12½-year steps (8) and at METROPOLIS in 25-year steps (4); a
   growing century coarser by its stages' share; a ten-year advance at TOWN keeps its yearly cadence (≈ 1.5 s); the
   replay as 6.7's examples.
5. **Progress and Stop** — past one second, the progress view (V09 §4.21.9): an `advance`'s epochs ("Year {year} of
   {years}", at the cadence chosen), each epoch's `DisplayDelta` drawn as it folds; the replay's ("Replaying the town's
   past: {year}"); a coarsened catch-up's at its cadence (V09's `progress.dossier` row); Stop ends an `advance` after the running epoch (V06 §4.1); a cancelled standalone history-first generation
   leaves no document, and a host creation offers no cancel (V06 §3.20.4).
6. **Slower only for a measured gain; the low tier; the dossier's clock** (item 119 (b), (e)). This volume declares no
   step slower than its target for a gain; a cost row E0 raises (the fallbacks of 6.1 and 6.7) coarsens the cadence further,
   inside the comfort level, never relaxing it. The low tier aims at the same ten seconds; a size it cannot reach is
   declared per device (§12.1). A dossier-bound document's epochs follow the port's cadence (§4.11 *The clock* (4)) while
   estimate (1) over a catch-up's epochs and events fits the **catch-up's budget**: `advance.budgetMs` for a dossier
   change applied to an open map; inside an open from SettlementForge, `advance.budgetMs` less the open's own path at the
   document's rung — V08 §6's cached frame boot (400 ms) and §12.5's T(B) at the rung's band top (246 / 589 / 2 290 ms at
   TOWN, CITY and METROPOLIS, a village rung reading TOWN's) — so one epoch over the span still fits it before the
   events' term (≈ 5.3 s ≤ 6 310 ms at the cap). Above it the catch-up folds one epoch per k crossed year ends, k the
   smallest whole number whose estimate fits — every dossier event still at its own week (§4.11 *The clock* (2)), a
   calamity entering the coarse epoch that holds its week, at its week, the population crossings read into the coarse
   epochs' targets, the last epoch at the dossier's week, every epoch reading the new digest's slices as every catch-up
   epoch does (J-V8.25) — the cadence reported in `EpochReport.advance` and the port's report. Where even one epoch over
   the span with its events' term passes the budget (a catch-up of many dossier events: ≈ 10 a CITY year, V08 §6), the
   catch-up folds that one epoch, every dossier event still at its own week — never a coarser or shortened result
   (§12.1) — and the wait completes past the comfort level, reported F-BUDGET-TIME, §12.10's R12-31 charging the miss to
   its owning path, the per-event absorb of V08 §6's rows. So no catch-up is refused or shortened (item 101 R2;
   J-V6.136).

**6.9 The crisis hand-over and the decay level** (V06 §3.22, V06 §3.23; targets, PLAUSIBLE until E0). `frontierFor` —
the growth decision on the camp's households (no draw, ≤ 1 ms) and S5a's level set of `T` as it stands, `T` being one
field computed at S3 (§4.4 S5a) — ≤ 5 ms at CITY and ≤ 15 ms at METROPOLIS, once per (model digest, households),
memoized in memory, so §10.2's placement reads it at no further cost while the model holds. `crisisLookYields` reads
a building's Works links, ≤ 1 µs a building. `decayLevel` and `decayPeak` read the lineage's lifecycle events (§2.8)
dated by the history index (V06 §2.11) and their Works' start weeks, and a restoring Works' fraction, ≤ 2 µs a building
and entry week (`decayPeak` memoized per lineage and entry week: a plan's elements share its build's, its re-cuts' and
its extends' weeks), read only for the buildings a
drawing shows abandoned, decayed or ruined (a tile's, an exterior's, a plan's one building): ≤ 1 ms per tile at the
densest, inside §12.5's drawing budgets. None runs in an epoch, so none touches 6.1–6.8.
=== END ===
=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

They take over the base's evolution bars as §13.2 names them (the take-over table, the evolution row: T8-1 – T8-7, T17-2,
T17-3, T18-1 – T18-4's epoch-spread form, T20-2's and T20-6's epoch clauses, T25-1, T31-2, T31-3, T31-8 – T31-12,
T67-1 – T67-6, T70-1 – T70-4 over epochs, T72-1 – T72-9's epoch clauses, T76-1's per-year clause, T81-1, T108-4 over
epochs, T111-1 – T111-5's epoch form, T113-1 – T113-3, T113-6, T113-7, T114-1 – T114-5, T114-8's epoch clause, T114-10's epoch clause,
T115-1 and T115-2 across a rung change, T122-1's hand-over clause and T123-4's epoch clause), each test naming the bar and the clause it takes; the table after the fixtures
maps them. Families as §13 names them: **property** (§13.1's fast-check), **hook and invariant** (§13.2), **statistics bench** (§13.2's
many-seed bench; item 103 (e)'s form — measured shifts against a baseline, never guarantees), **B-EDIT** (§13.2),
**goldens** (§13.3), **visual** (§13.4), **performance** (§12, §13.8's tiers). The fixtures: the golden TOWN, B-CITY and
METROPOLIS seeds; **H-100** — a scripted standalone history of 100 epochs (+1 % a year for 40 years, −1.5 % for 30, +1 % for
30; threat 0.5 throughout; hazards `minor`); **H-DOSSIER** — a dossier-bound history replayed from the port's fixtures
(volume 8) with a mapped fire calamity and its F5 targets, an institution re-designation, a COUNT record ("Blacksmiths
(3–10)") across a rise and a fall, a see moving from one church to another and back, a walls REPLACEMENT, an
`activeChains` status change from `active` to `vulnerable` and back (neutral keys V08 §2.6 maps) and a catch-up epoch
carrying two dossier events; **H-RIVER** — a river town with a meander above 1.8 and a marsh beside built land;
**H-PORT** — a walled port whose core lives inland of its quays, declining to 40 %; **H-CLIFF** — a cliff-backed coastal
town and a river-loop town; **H-VOID** — a site with a forced cavern and a forced ruin under the core, growing from a
hamlet's population; **H-CHURCHYARD** — a churchyard whose catacomb grows under its church; **H-METRO** — a 100-year growth
from TOWN to METROPOLIS; **H-VILLAGE** — 1 200 → 3 000 → 900 (with and without volume 7 registered); **H-DESERT** — with
volume 7 registered, a village of 400 falling to 60 over 80 years and rising to 2 000 over the next 60 (a desertion and a
rise through the hand-up); **H-AQUA** — a town below a spring 4 km upslope inside the S3 lattice, growing from TOWN to
CITY to METROPOLIS and back to TOWN over 200 years, the spring's reach silted by a scripted `siltReach` in year 170;
**H-TERRACE** — a hill town on 20–30 % slopes, a century of growth, decline and regrowth; **H-DECK** — a river town with a
timber bridge carrying houses and a stone bridgehead, a harbour mole with a mid-mole tower, and a meander that cuts off
under its second bridge; **H-OASIS** — an arid town around an oasis whose spring feeds an aqueduct at CITY, a scripted
drought in year 30 and the course of a wadi shifting off a second spring in year 60; **H-WALLS** — one walled town run
four times over 120 years, threat and wealth scripted high-high, high-low, low-low and low-high, each held 40 years and then
switched; **H-HISTORY** — a dossier fixture of a village of 600 whose `tierHistory` shows CITY 250 years ago (no
`peakTier`), with a great fire 180 years ago, plague years 120 years ago and a trade collapse 90 years ago; **H-REFOUND** — a
town destroyed by a catastrophic event 200 years ago and resettled 150 years ago as a thorp, now a town of 3 000;
**H-RUNG** — with volume 7 registered, a village of 1 200 rising to a town of 2 500 and falling to a village of 900 over
120 years at the wealth maximum. CI tiers: per-commit T-V6-1–4, 12, 21, 26, 38, 52, 53, 58, 65, 70's pins and 71's no-op
pin; nightly the rest; the statistics bench weekly on 200 seeds (§13.8).

**The base bars these tests take** (§13.2's take-over table, the evolution row; each test names the bar and the clause it
takes there too):

| base bar | taken by | the clause it takes |
|---|---|---|
| T8-1 | T-V6-70 (f) | every `DeclineOp` kind the strike pool applies over H-100's decline undone with its epoch to byte identity |
| T8-2 | T-V6-7 | the regrowth-first fixture over epochs: no new face while the old plan holds capacity, each band's vacancy share kept |
| T8-3 | T-V6-3 | over H-100's epochs every ruin, trace and superseded ring keeps its address; no cleared building tombstoned unless demolished or succeeded; a front building made a trace or demolished frees its passage |
| T8-4 | T-V6-5 | the exposure field monotone in each driver's weight, its chance share the table's |
| T8-5 | T-V6-6 | the salvage ledger's credits equal the yields of the robbed and the cleared, never negative, every shortfall reported |
| T8-6 | T-V6-30 | a CITY fallen below 10 000 inhabitants loses its islands over their dwell spans, never in one epoch |
| T8-7 | T-V6-5 | after a fall no building with a surviving household reads `vacant`; every `relet` down stales an unstored plan and re-cuts a stored one inside its event |
| T17-2 | T-V6-4; T-V6-13 | a pinned assignment never moves under an epoch (T-V6-4); the `use` row of the churn cap holds (T-V6-13) |
| T17-3 | T-V6-2 | one seed with one circumstance timeline replays to one digest of openings, closings and moves |
| T18-1 – T18-4, the epoch-spread form | T-V6-15 | each `MutationPlan` step keeps the kept parts byte-identical, touches nothing outside its scope and never subtracts a locked part; the return applies the inverse; the steps in full equal the one-shot mutation of the same record |
| T20-2, its epoch clause | T-V6-27 | a rejection lapses at the first epoch past the roster tolerance and on no drift inside it; the undo of a lapsing epoch outside the port's session `host:port` (an advance on a what-if copy) restores the hold |
| T20-6, its epoch clause | T-V6-27; T-V6-4 | a dossier-backed use never closed, its building emptied or removed only after it moved (T-V6-4, T-V6-27); an `undo` naming a port epoch, with or without a dossier change, F-EDIT (T-V6-27) |
| T25-1 | T-V6-18 | an epoch's `reclaim` and `siltReach` byte-identical outside their footprint and undone exactly with the epoch |
| T31-2, T31-3, T31-9 – T31-11 | T-V6-29 | granularity within each band's target; the churn caps per kind, district and block; the floor's bars — at every epoch of the soak |
| T31-8 | T-V6-26 | every class's replaceability and every ladder row's durations present, as the ladder phase reads them |
| T31-12 | T-V6-1 | with no epoch, `builtBand` the generation band and the geometry band the field band |
| T67-1, T67-3 | T-V6-21 | the stage drawn at week w a pure function of the Works and w; the old boundary shown until clearing |
| T67-2, T67-4, T67-6 | T-V6-19 | access at every week; rehousing before a demolition's first stage; the epoch's Works share and a decay Works' dwell band |
| T67-5 | T-V6-1; the parity paragraph below | no Works at generation and none under the parity presets |
| T70-1 – T70-4, over epochs | T-V6-32 | every informal cluster the overflow ladder or a stage makes over epochs |
| T72-1 – T72-9, their epoch clauses | T-V6-29 | the character step's output after every epoch of the soak |
| T76-1, its per-year clause | T-V6-25 | per-year rates give equal expected firings at 13-, 52- and 520-week cadence |
| T81-1 | T-V6-50 | a rung-crossing epoch grows the frame by §3.2 (9)'s batches, every address and ring outside the growth kept |
| T108-4, over epochs | T-V6-45 | a promotion or a demotion by least disruption |
| T111-1 – T111-5, the epoch form | T-V6-72 | a failing spring weakens its pull over epochs; the `item111.water` pin on H-100 |
| T113-1 – T113-3, T113-6, T113-7 | T-V6-71 | the city-to-village fixture; one digest per seed and history on the five engines; the refounded fixture; a symbolic peak only with evidence; the `item113.history` pin |
| T114-1 – T114-5, T114-8, T114-10's epoch clause (item 114 (g)) | T-V6-73 | the transitions over epochs on H-WALLS; the welded stretch over 10 epochs; the `item114.condition` pin |
| T115-1, T115-2, across a rung change | T-V6-74 | no grand dwelling but the one manor at a village epoch, the manor only with a lord or a dossier record, across H-RUNG's rung changes |
| T122-1, its hand-over clause | T-V6-75 | the model and the hash identical with crises followed, off and previewed at every week of the conditions; the aftermath only through the epoch path |
| T123-4, its epoch clause | T-V6-76 | the decay level falls under a restoration, the damage leaving in reverse threshold order, a repaired element drawn in patch material until a rebuild |

| id | family | what | bar |
|---|---|---|---|
| T-V6-1 | goldens | the `'grow-by-stage'` strategy through the phase interface (its nine base phases) reproduces M4's grow path, including a **dossier-bound catch-up epoch carrying two dossier events** (both applied at step (e), the lapse, character and Works steps run); with no epoch every plot's `builtBand` equals its generation band and its geometry band its field band, a town and a metropolis each resolving their own middle band (T31-12) | byte-identical model digest to the M4 golden on every M4 fixture and on the catch-up fixture's log; exact (T31-12) |
| T-V6-2 | property | determinism: the same seed and inputs fold to the same digest per epoch; a replay from the log and a replay from any checkpoint agree; the fold is identical on every host (§6.5); a failure at an epoch recurs identically at replay (V06 §3.17); one seed with one circumstance timeline replays to one digest of openings, closings and moves (T17-3) | 0 mismatches over H-100 and 50 random trajectories |
| T-V6-3 | hook | no re-roll and locality: every entity outside an epoch's touched set is byte-identical (leaf digests) across it; every survivor keeps its address and lineage; an epoch with an empty touched set records its week and report and changes nothing else; over H-100 every ruin, trace and superseded ring keeps its address, no cleared building is tombstoned unless demolished or succeeded, and a front building the pool makes a footprint trace or demolishes leaves its passage with no `frontBuilding` and no base wing spanning it (T8-3's epoch form) | 0 violations over H-100 |
| T-V6-4 | hook | protection: a locked or pinned entity, a declared place (item 101 R13), a dossier-backed use and its building before its relocation are never struck, converted, closed or moved by the engine; holding one entity changes no other entity's draws (T17-2; T20-6's epoch clause) | 0 violations; a lock toggled on an entity the history never touches leaves every other entity's history byte-identical |
| T-V6-5 | statistics | departures follow exposure: the mean `E(x)` of the dwellings emptied in a fall exceeds that of those kept; extramural and flood-band dwellings empty first; a core dwelling can still empty; the exposure field is monotone in each driver's weight and its chance share equals the table's (T8-4); after each fall of H-100 no building with a surviving household reads `vacant`, and every `relet` down marks an unstored plan rung `stale` and re-cuts a stored plan inside its own event (T8-7's epoch form) | on 200 seeds: emptied-minus-kept mean `E` ≥ 0.1; core share of emptied > 0 in ≥ 5 % of seeds; exact (T8-4, T8-7) |
| T-V6-6 | statistics | the persistence order over a long decline: a layer's **struck share** per decade = its entities stepped down (by the pool or, for walls, by the pathway's breaches and dismantles, counted by `walls.dismantleStretchM` stretches) ÷ its live entities at the decade's start; the shares order use > building > plot boundary > street > wall; the salvage ledger's credits equal the yields of the robbed and the cleared at every epoch, are never negative, and every shortfall is reported (T8-5) | ordered, each adjacent pair within a declared tolerance of 0.01 absolute, in ≥ 90 % of seeds over a 60-year decline; exact (T8-5) |
| T-V6-7 | hook | regrowth-first: after decline then growth, no new face is built while tiers (0)–(5″) hold capacity beyond `decline.turnoverVacancy`; the old plan's vacancies are refilled first, each band keeping its turnover share vacant (T8-2's epoch form) | 0 violations; ≥ 80 % of pre-decline plots reoccupied before the first new stage in H-100; the poorest band's vacant share ≥ 0.05 − 1 dwelling at every steady epoch (0 in the parity presets) |
| T-V6-8 | statistics | crowding before sprawl: households per dwelling of the crowding bands rise before a stage grows; decrowding moves households to the new stage; the rich bands never crowd | on 200 seeds: crowding precedes ≥ 80 % of stages; 0 rich-band crowding |
| T-V6-9 | hook + statistics | a new circuit and its suburbs absorbed: grown under threat 0.6, a ring encloses every earlier stage on its approachable arcs and its inner strip crosses no standing footprint; the old ring enters its pathway (`keep` while threat ≥ 0.6); then threat held at 0.4 (below `walls.keepThreat`) for 40 years: the `keep` fate is re-drawn at the first epoch below and splits road : absorb ≈ 0.7 : 0.3; on H-CLIFF the ring has zero wall edges on sheer arcs and walls a river loop at its neck only | 0 footprints crossed; fate share within ± 0.08 over 200 seeds after the re-draw; 0 sheer-arc edges |
| T-V6-10 | hook | a shorter ring: its trace passes through no occupied footprint and leaves every live quay reachable; a contraction that cannot is retraced at most three times and then waits (never forced); on H-CLIFF it walls only approachable arcs | 0 occupied footprints crossed; 100 % of quays reachable; 0 sheer-arc edges |
| T-V6-11 | hook | renewed threat repairs breaches (`repairWall`, the `breached` runs of the ring's `condition` in chain order) and never rebuilds a dismantled stretch; the record's lifecycle returns to its former state only when every run is `standing`; a hand `repairWall` on a dismantled stretch bends to a new stretch drawn on its line, and a hand `repairRaised` on a dismantled span to a new raised part, each dry run naming the bend (J-VI.4); a hand no-stretch `repairWall` on a ring with no neglect to lift is a no-op with its line ("this wall is in use"), never a refusal; on a sky fixture whose island falls at year 30 across a live ring (threat 0.6, no pathway) covering a stretch and a gatehouse, with one of the ring's runs `dismantled` by hand beforehand: the stretch and the gatehouse are `standing` again at the next epoch, the dismantled run is still a gap, and `walls.repairedInUse` counts the repaired runs; **0 Works whose target is a wall, a tower or a gate** at any batch, and after `absorbWall` every run is `dismantled` in time but one holding a raised gate under a standing deck or a wall opening under a standing aqueduct, each taken from the epoch after that raised way's removal (on H-METRO, the superseded curtain's fate set to `absorb` by a hand `setAttr` and a viaduct crossing it by a raised gate; on H-AQUA, a curtain the aqueduct crosses by its opening set to `absorb` likewise); a neglected ring under renewed threat is in its pre-neglect existence once its pathway is cleared — `decayed` while a dismantled run remains — also when no run was ever breached, **0 rings with no pathway in existence `abandoned`** at every batch, and a hand "back in use" lifts the neglect and clears the pathway, V06 §3.7.3 neglecting that ring again only `walls.neglectAfterYears` after the lift | exact on a scripted threat cycle; 0 refusals outside dossier facts and locks; exact on the landfall fixture; 0 wall Works and 0 abandoned rings without a pathway |
| T-V6-12 | property + hook | the shade mask: the incremental mask equals a full recomputation bit for bit, including on a fixture whose Works span the epoch's week and on an island arena; the mask survives a save and a load between epochs unchanged, and a sampler change — or a field grid grown with the frame — reads as zero building shade until the next epoch rewrites it whole; `w_sun` = 0, or item 111 (c)'s climate cell 0, leaves the field and the town byte-identical to a history without the mask (the no-op pin `item102.sun`: H-100, registered by V06's E5 seat on V12 §3.7.8's engine); on a **near-cut fixture** (a quarter whose value sits within `w_sun` × Δshade above a band cut, tall houses built to its south): the field band falls at the first epoch after the mask records them, never in the epoch that built them; rung 1 acts in that same epoch; rung 2 only after the ladder table's years; on a **stepped temple** (three massing tiers, item 110 (c)) the incremental mask equals the full one and each tier's top is its own datum plus its height, so each casts its own shadow; **way surfaces follow the field** (V06 §3.4 (9)): on H-100 with a prosperity `setField` brush lowering one district by two bands in year 40 and one of its lanes' `surface` edited beforehand, at the first epoch after the brush every other way fronted only by that district's plots carries V01 §3.7.3's value for its class, era and new fronting band (a `cobble` lane at `comfortable` now `dirt`), the edited lane keeps its surface (counted in `shade.surfacesHeld`), and no way fronted by no re-banded plot changes surface; the mask runs at a THORP epoch of H-VILLAGE | exact; exact; exact; exact on the fixture's epochs; exact, one shadow per tier; exact, 0 edited surfaces rewritten |
| T-V6-13 | statistics | uses over time (items 17, 103, 107): after growth on one side, the mean distance from households to their nearest daily-local use falls within 3 epochs; a tannery on a river town ends downstream of the housing more often than the baseline; measured at every tenth epoch of H-100 with the web's weights on: a coverage class's `servedShare` on its own coverage unit (V12 §3.6) stays above its random baseline, a spaced class's nearest-member distance stays above its baseline, and consumer-to-provider distance lies within `comfortM` in most placements; the `use` cap holds per district (T17-2's churn-cap clause) | measured shifts ≥ the bench's declared deltas (item 103 (e), 107 (g)); comfort ≥ 0.7 of placements; cap 0 violations |
| T-V6-14 | hook | custom chains over epochs (item 104): an inactive chain's nodes keep their sites; a chain switched off and on with nothing else changed returns every node to its site; an anchor moved re-sites the chain in item 105 (f)'s order; a revision re-sites by least disruption | exact |
| T-V6-15 | hook | `MutationPlan`: steps apply in order at their weeks; each applies exactly its parts of the stored record; an incompatible present design opens the use at its first compatible step (a relocating use open at its former site until then); a hand edit between steps makes the next re-plan; a use leaving cancels the plan with done steps standing; the building's return to its former designation applies the inverse of the done steps; an always-crypt target carries its crypt from the occupy step; undo restores; a plan whose stored record is missing is re-planned, reported; a step due before the plan's creation clamps to it; each step keeps every kept part byte-identical, touches nothing outside its event's effective scope and never subtracts a locked part, and the steps applied in full give the design the one-shot mutation of the same record gives, byte-identical (T18-1 – T18-4's epoch-spread form) | exact |
| T-V6-16 | hook + statistics | fire: the spread never crosses a way corridor ≥ `breakM` or open water; `minor` never exceeds 6 buildings; the burnt plots are rung-3 eligible and rebuilt by tier (3); the rebuild shift lowers flammability for 30 years; on H-DECK a fire lit in the timber row on the bridge spreads along the row over the water and stops at the stone bridgehead, and a burn of every building on the timber deck chars the deck to `decayed` | 0 violations; on 200 seeds the mean fire size falls with the share of stone and tile; exact on the bridge fixture |
| T-V6-17 | hook | flood and collapse: only buildings whose depth at their datum (the water level less `baseCm`) reaches `collapseDepthCm` collapse, only of the listed wall materials; a deck building whose deck stands above the water level never collapses; a terrace building is judged at its platform, never at the unlevelled ground; `topple` strikes the chosen count, and a toppled support breaks both its spans; underground, on a flood fixture over a shallow sewer gallery and a deep catacomb: only elements whose ceiling lies within `surfaceClearCm` take `flood`, and only where V04 §2.3 admits it (else `W_VOID_UNDER_WATER`); the deep catacomb stays dry; the epoch's flood and the same flood drawn by hand reach the same elements | exact |
| T-V6-18 | hook + statistics | terrain and water: a cut-off leaves an oxbow that silts to marsh; reclamation fires only with a shortfall and a `modest` band; the rates over 1 000 seed-centuries lie within ± 30 % of the table's; every epoch-applied `reclaim` and `siltReach` is byte-identical outside its footprint, in the carve fixtures' form, and undoes exactly with its epoch (T25-1's epoch form) | exact; within tolerance |
| T-V6-19 | property + hook | Works scheduling: start offsets are uniform over the span (KS test); a chained Works starts after its predecessor finishes; a chained Works not started when the next epoch changes its target is removed, its change drawn finished and the new Works starting from the prior started Works' stage; the retirement rule keeps every Works that ran in the epoch's span in that epoch's model at any cadence (13, 52, 520 weeks); no Works leaves a plot without access (T67-2); a demolition's households are rehoused before its first stage (T67-4); on the hook fixture an epoch's share of buildings in works lies within ± 3 s.e. of growth × mean duration ÷ span, and a decay Works within its dwell band (T67-6) | KS p > 0.01; exact; within ± 3 s.e. |
| T-V6-20 | property | people: a person's key, age and succession are pure functions; the same week gives the same household members from any replay **and at any cadence** (the same 100-year history at 13, 52 and 520 weeks gives the same successors, keyed by death week); a pinned person is never succeeded | exact |
| T-V6-21 | property + visual | frames: `frame(w)` by the images path equals the replayed prefix's model digest (with the effective-week before-images) for random `w`; scrubbing forward and back draws byte-identical images (§13.4's week-scrub harness); then-and-now equals the lifecycle entries between the two weeks; at a 13-week and a 520-week cadence, a scrub to a week before the epoch of a ring-road conversion, a way downgrade, a waterfront wall and (on H-AQUA) the aqueduct's founding draws the before state, and a PNG and GeoJSON export at that week does too; a frame drawn after an undo and after a reload equals the replayed prefix's; the stage drawn at week w is a pure function of the Works record and w, reached directly or by scrubbing, and no model digest moves (T67-1); a merge or a split shows the old boundary until its clearing stage (T67-3) | exact |
| T-V6-22 | hook | `forkAt` gives the prefix's digest, and one at a seq inside a replayed document's creation prefix bends to the prefix's end with its line; `rerunFrom` with no change reproduces the original history's digests epoch for epoch, also after a save and a reload; on H-DOSSIER, `rerunFrom` at a point before an institution was added (by a standalone dossier event between epochs), with one wall locked, reproduces every dossier-backed use; a re-apply of a hand edit resolves by carry-over matching or returns F-EDIT with alternatives; a dossier-bound fork receives no later dossier event; before a rebase point both bend to the earliest seq with the line "the copy starts at year N" | exact; 100 % of dossier-backed uses |
| T-V6-23 | hook | `advance`: the expansion's weeks, targets and events equal V06 §3.3.2's formulas; the shape table's mappings (V06 §2.3); a span above `maxEpochs` bends its cadence and says so; a clamp is reported; each degenerate request bends or is a no-op with its line as V06 §3.3.2 states (a span of 0, of −1, of a third of a week; a cadence of 0 and of 2.5 weeks; points unsorted, repeated and in the past; `perYear` −2; a rate that overflows; a target of −10) and never yields a non-finite target or a 0 ÷ 0; refused on a dossier-bound document with the what-if offer; `from: founding` on an existing document bends to "Start a new town small" (a new document, the present one byte-identical); on a standalone neighbourhood document the time card is absent and `advance` and a skeleton's `history` block bend to none with the line "a neighbourhood alone has no history yet — open it in its town to advance time", while `forkAt` and the timeline work; Stop keeps the folded epochs and writes `stoppedAt`; the group undoes as one step by its checkpoint; after a save and a reload the group undoes to the pre-group digest (rebuilt from a keyframe), truncating in an unshared document; in a shared document the undo appends an `undo` event, keeps the group in the log, and lists another author's later dependent edit; the preview's end state equals the committed end state, and an accept on an unchanged head takes the preview's folded state byte-identical to a re-fold; an Accept after edits that raise the estimate (hand-placed accesses added on the preview's islands) folds at the re-estimated cadence, inside the comfort level; **the comfort level** (V06 §3.3.2, V06 §6.8): a request whose estimate exceeds `advance.budgetMs` folds at the smallest cadence that fits — the same cadence on every host and in a replay of the log, its epochs' weeks at it — its one line naming the cadence chosen and every epoch's `EpochReport.advance` carrying it and the cadence asked; a 500-year METROPOLIS request with three islands and the hand-placed cap folds, never refused or shortened | exact |
| T-V6-24 | performance | V06 §6's rows on the reference hardware as targets (item 119 (f): its bars T119-1 – T119-5, §13.2, are taken by V12's T-V12-50 and V09's T-V9-79; this test is the volume's own measurement, read beside them): each row reported target met or target miss, a slower row only with its recorded gain, the interactive rows of V06 §6.4 unchanged; **the comfort level** (V06 §6.8): an `advance` of 1, 10, 100 and 500 years — held, growing 1 % a year and falling 1 % a year — and a history-first generation of H-HISTORY, H-REFOUND and a metropolis grown from its founding over 300 years, each at every rung's band top and at the metropolis cap, the sky layer off and on, timed from the click to the complete result (V12's `wait.advanceTime`, `wait.historyReplay`); **a dossier catch-up** (V06 §6.8 (6)) at CITY and at METROPOLIS, the sky layer off and on — of 20 years carrying 200 dossier events, of 100 years carrying 1 000 (V08 §6's ≈ 10 a CITY year) and of 100 years carrying 20 (a quiet span) — timed inside §12's waits for a dossier change applied and an open from SettlementForge, its cadence and estimate reported | every row reported against its target (a miss a declared target miss, D-18); every wait's p95 ≤ 10 000 ms, its measured time at most its estimate plus its reserve (else the cost rows rise, V06 §6.7's fallback) — a catch-up's wherever its estimate fits the catch-up's budget, and where it does not (one epoch over the span with its events' term passing it) the one-epoch fold, every dossier event at its own week, with its F-BUDGET-TIME report (the miss §12.10's R12-31 charges to V08 §6's per-event absorb); every catch-up's dossier facts met exactly at its last epoch; progress within 1 000 ms of the click for every wait over one second |
| T-V6-25 | statistics | cadence independence (item 76 (5); T76-1's per-year clause): the same 100-year trajectory at 13, 52 and 520-week cadence gives towns whose household count, built area, ruin share and walled share agree; the share of households housed by the overflow ladder agrees at every common epoch week; no tent belt at any cadence of H-100's +1 % a year while crowding capacity remains; the catacomb extent agrees | within ± 10 % on 100 seeds; overflow share within ± 2 percentage points; 0 tent belts; extent within ± 10 % |
| T-V6-26 | hook (wiring) | every registered strategy has a phase for every step it must run — `'grow-by-stage'` for its nine base steps, `'history'` for every step of V06 §3.2 — and every product override names a registered phase; every participant id of V06 §3.2's table is registered by its package **and every registered participant is in the table** (`village.density` and `village.pins` included); every product's `records` names a registered `EpochPlacement`; every `ProductEpochRows` member a product declares is read by the decline or hinterland step; every `EpochInputs.events` entry kind the port or the replay writes has its reader; every `EvolutionTable` row is read by a phase or V06 §6.8's estimate (a source scan), every class carrying a replaceability and every ladder row a duration per direction and replaceability as the ladder phase reads them (T31-8); every new record, field, op and edit kind has its registry row, its renderer row, its export mapping and its lifecycle row (§13.2's path-completeness test extended); every `ChronicleKind` has a template (the item 110, 111, 113 and 114 kinds included); every row of V06 §1b's dossier trace names a field the port's digest carries and a phase that reads it; every `HistoryEventRow` effect has its reader (V06 §3.20.2); the `raisedWays` step has its phase, `sky.clearance` its registration, `repairRaised`, `repairRetaining`, `wearWall` and file f item 291's members their registry, renderer, export and lifecycle rows, `detail.suppress` a reader for each of its five kinds, the `landfall` candidate its report and chronicle rows | 0 missing |
| T-V6-27 | hook | dossier-bound: no spontaneous hazard (an `adjust` to `minor` or `full` refused); every mapped calamity strikes at its targets' centroid and its targets are struck in place, never relocated; an unmapped calamity is reported and changes nothing else; a calamity with no severity band reads `moderate`; every engine change's cause is a rule or a dossier fact (the report's causes); no dossier-backed use closes or goes unplaced at any batch (§5.3's row); a rejection lapses at the first epoch whose population target has moved past the roster tolerance (± 5 %) from the one it recorded, a drift inside it lapsing nothing, and an undo of a lapsing epoch outside the port's session `host:port` (an advance on a what-if copy of the fixture) restores the hold (T20-2's epoch clause); an `undo` naming a port epoch, with or without a dossier change, returns F-EDIT and changes nothing (T20-6's epoch clause) | 0 violations on H-DOSSIER |
| T-V6-28 | hook | the hinterland: surplus fields step down the fallow ladder farthest-first at their drawn spans; growth re-takes pasture and commons before S12a opens new fields; wildwood is never re-taken | exact |
| T-V6-29 | property | a 500-year soak of alternating growth and decline: every §5.3 invariant holds after every batch; plot counts stay within the ladder's bounds; the digest is stable across replays; at every epoch granularity lies within each band's target ± tolerance and the churn caps hold per kind, district and block (T31-2, T31-3); the floor's bars hold over the soak — no rung-1 or rung-2 event moves a plot's frontage edge or shrinks a shell toward a poorer band, `builtBand` is the new stock's after a building rung 3 and the kept member's after an `amalgamate` that builds nothing, and a rich → poor → rich run with no rung-3 event leaves rings and shells byte-identical (T31-9 – T31-11); the character step's output after every epoch passes T72-1 – T72-9's epoch clauses — the vector recomputed from the saved model equal, a name changed only past the hysteresis or by a rename, every building's prosperity-driven state inside its district's band range, every household an epoch places inside its district's written range | 0 violations |
| T-V6-30 | hook | participants: each is called at its step in (order, id) order — `sky.clearance` at `afterGrowth` order 50, after `hood.fabric`; an erroring participant is isolated and reported; the island and underground laws' ops commit in their step (V05 §3.15, V04 §3.10); on the sky fixture a CITY dropped below 10 000 inhabitants loses its islands over their dwell spans — waning, settled, fallen — never in one epoch (T8-6) | exact |
| T-V6-31 | statistics | growth reads as historical: over H-100, while the extramural households number fewer than 2 × `growth.ribbonMaxHouseholds`, the share of extramural buildings within 100 m of a gate road stays in MFCG's ribbon band (§4.4's ribbon row: 71–85 %), falling only once suburb stages grow; walled towns add circuits only under threat | the share in [0.6, 0.9] at every such epoch on ≥ 90 % of seeds; 0 circuits below `walls.threatMin` |
| T-V6-32 | hook | the overflow ladder never leaves a household unhoused: a population jump of +40 % in one epoch on a frame with no free land houses everyone (tent belt) and reports it; every informal cluster the overflow ladder or a stage makes over epochs gives each structure its own door on a footpath reaching an access edge, keeps the fire-gap minimum and the households per structure within its row and capacity, and stands on no plot whose geometry floor is the middle band or above, in no district whose band range excludes the squalid band and in no wall strip (T70-1 – T70-4 over epochs) | 0 unhoused; 0 violations |
| T-V6-33 | hook | dwellings only after access (item 109 (j) (4); item 113 (e)): on H-VOID, zero dwellings in an `unexcavated` or `lost` cavern or ruin cluster after every batch; a cluster whose last open path `under.fade` seals turns `lost` in that batch, is vacated in the same batch and its households re-housed at `siting` the same epoch; when a later epoch's dig or excavation refinds it, it reads `accessible` and may take dwellings again | 0 violations; 0 households left in transit |
| T-V6-34 | statistics | access grows with the settlement (item 109 (j) (3), (5)): across H-VOID's growth from a hamlet's population, the share of voids with an access rises monotonically with the number of buildings over them (V12's `trend` on `voidAccessible`); every access carries its cause with the epoch's seq; a lineage draws its dig once per void kind in its life across replays, plus once for each wing V02's mutator adds over a void | monotone (V12's trend bar); 100 % causes; exactly one draw per (lineage, void kind, added-wing key) |
| T-V6-35 | hook | overlap access (item 109 (j) (3b)): a sewer extension crossing a sealed ruin chamber at a shared depth yields a breach link whose lifecycle seq is the epoch's, and makes that chamber and every void linked beyond it accessible; at different depths no link (bar the row's shaft chance); the sewer's course is unchanged by the ruin | exact on the fixture |
| T-V6-36 | statistics | depth keeps secrets (item 109 (j) (5)): at every METROPOLIS epoch of H-METRO, the sealed share of voids deeper than `DigRule.reachM` is at least `DigRule.sealedFloor` (V12's `floor` on `voidSealedDeep`) | ≥ the floor on ≥ 95 % of seeds |
| T-V6-37 | hook + statistics | caverns and ruins at any tier and a distinct ruin over time (item 109 (j) (1), (c)): caverns and ruins are present at every rung of a growth from 1 500 to 120 000 (and at volume 7's rungs when it is registered, H-VILLAGE); at every tenth epoch of H-100 on H-VOID, the ruin differs from the town as it then stands in block size, grid regularity and orientation by V12's distinctness bar; the ruin's plan changes only by decay, excavation and collapse; excavation by demand fires at most once per epoch and only within `excavate.reachM` | present at every rung; distinct at every sampled epoch; exact |
| T-V6-38 | property | the catacomb ratchet (item 109 (k) (4), (6)): V12's `exactMonotone` on each complex's `extentFloorM2` across every epoch of H-100, of 50 random trajectories and of H-METRO, across the replay epochs of H-HISTORY, and across Regenerate, a Re-derive from S1, New random on the catacomb system and an upgrade replay (V12's row for item 109 (k) (6) registers this test) | 0 decreases |
| T-V6-39 | hook | catacomb growth per epoch never exceeds the span-keyed cap; on a stagnant fixture (a foundation blocking the frontier) the fill rises while the extent holds, and growth resumes by least disruption when the plot above is demolished; on a rank-held fixture (a secondary complex at 0.9 × the primary) the same with `blockedBy` `rank`; a closed cemetery freezes its complex (no growth, no fill change) and its reopening by a church-family use on the same plot resumes it | exact |
| T-V6-40 | hook | the catacomb count and sources over epochs, at every batch of H-100, of 50 random trajectories and of H-DOSSIER: (a) no complex is founded while the count is full, and at TOWN at most one is ever founded — more than one stands at TOWN only after a decline from CITY, each then reported `catacombsAboveCount`; (b) every complex's source is a cemetery (churchyard, burial ground, monastery burial face, extramural cemetery) or, founded at CITY or METROPOLIS, a quarry ossuary — zero under a church, a crypt or a precinct without burial ground; (c) the primary lies under the cemetery that serves the most burials (past the hysteresis) and is the largest complex, or else grew by its full cap in that epoch | 0 violations |
| T-V6-41 | hook | links re-bind (item 105 (a)): after a provider closes, every former consumer is bound to its nearest live provider at the end of the same epoch | 0 stale links against a fresh S10b binding |
| T-V6-42 | hook | the relaxation pass (item 105 (f)): on the loop fixture, the epoch's relaxation stays within `relaxPasses`, the second pass moves fewer members than the first, every move stays inside its district, byte-stable across replays | exact |
| T-V6-43 | hook + statistics | split sites over epochs (item 105 (h)): split pairs appear only past the class's compiled `profile.split.threshold` (V11 §2.3; the web's `splitThreshold` its default) and never in the parity presets; a merge-back (below the threshold minus `uses.splitHysteresis`) leaves the shop's plot vacant; an author's merge-back declaration holds at every epoch; closing the institution closes both; undo restores both; with V11 §3.7.4's `splitEnabled` set false by a table edit mid-history, every generated pair merges at the next `uses` phase (cause `merge`, within the `use` cap, the rest the epoch after) while a declared split stands, and no pair opens until the switch is on again | exact |
| T-V6-44 | goldens | the web's and the spread's no-op pins, `item105.web` and `item107.spread` (H-100, registered by V06's E4 seat on V12 §3.7.8's engine): with V11 §3.7.4's web off form applied an epoch is byte-identical to the history without item 105, and with T107-4's cells at 0 too, to the history without items 105 and 107 | byte-identical |
| T-V6-45 | hook | ladders over epochs (item 108): on H-DOSSIER's COUNT record, the members lie inside the range at every epoch, rise monotonically across the growth phase and fall across the decline without going below the range's minimum; no ladder pair is double-counted at any batch (no generator use of a covered class); a SIZE record is one building; a promotion and a demotion change the members by least disruption (member `#1`'s building kept where the greater's thing is the lesser's; V08 §3.5.1 (c)); on a `town-1` mutation whose `Hedge wizard` a receipt promotes to `Wizard's tower`, the house is converted in place and no second building stands; a REPLACEMENT whose greater V08 §3.5.1 (d) places new: on a hamlet fixture whose `Wayside shrine` record a `promotedFrom` receipt promotes to `Parish church` at the epoch that brings the village rung, one new church stands bound to the record's key, one churchyard `cross` is laid for the record with no binding row, the roadside shrine pin stands unbound, no `convert` runs on any building, and at every batch the church is counted once and neither pin as a church; on a village fixture whose `Fish market` arrives beside a standing `Fishmonger`, one hall on the market's rim binds the fish market, the fishmonger's key is its alias and its shop keeps its use, unbound (T108-4 over epochs) | 0 violations |
| T-V6-46 | hook | water access (item 106): H-PORT declines to 40 %; after its contraction every quay is reachable through a gate or an open front | 100 % |
| T-V6-47 | hook | barrier closure on a new circuit: H-CLIFF's new circuit has zero wall edges on sheer arcs and its stretches end on tower anchors; the river loop is walled at its neck only; on H-AQUA an aqueduct crosses both a new circuit and a later contraction: each trace crosses it at one crossing station, its pier the wall's band, 0 supports in the new strip's setback, glacis, berm or channel, with one wall opening each; a viaduct crossed by a trace gets one raised gate; `wallToWay` of a crossed ring leaves the raised way standing with no junction to the ring road | 0 sheer-arc edges; 0 supports in the strip; exactly one opening or raised gate per crossing; exact |
| T-V6-48 | hook | the waterfront over epochs: a rise in sea threat past a quay-wall row gives a quay wall with sea gates within one epoch; a later fall below every row for `walls.neglectAfterYears` neglects it (never demolishes); a walled port gains its harbour-mouth chain the first epoch its mouth is enclosed, anchored on a tower or fort already standing at a mole head; a reclamation that changes a closing shoreline re-evaluates the closure the next epoch; a deleted generated chain or quay wall stays absent for 100 epochs while its condition holds, and undo restores it | exact; 0 duplicate towers at a mole head; 0 re-additions |
| T-V6-49 | hook | the dossier gate (DR2): on H-DOSSIER no circuit or waterfront wall appears that the walls records do not admit, and the walls REPLACEMENT yields one ring the same epoch | 0 violations; exact |
| T-V6-50 | hook | rung crossings: a TOWN without sewers that grows past CITY has `Features.sewers` on and a laid network from that epoch on; a TOWN whose creation draw `u` lies below its law at a later population turns them on at that epoch at any cadence; an epoch whose target crosses a band upward changes the rung's row and grows the frame by §3.2 (9)'s batches, every entity outside the growth's region keeping its address and every face outside it its ring, owner and nested faces (T81-1) | 100 % of seeds; exact |
| T-V6-51 | hook | products (V07): with volume 7 registered, H-VILLAGE hands up when the target reaches 1 575 and down when it falls below 1 425 (V07 §2.1's fold) through the product overrides; a target alternating 1 480 / 1 520 never changes the product (a 1 440-person town runs the base product's phases on the TOWN row) and one alternating 1 400 / 1 600 changes it at every epoch, each a whole hand-off; a town handed down grows no underground element (every inherited system in V04's maintenance mode, a catacomb stagnant with `blockedBy` `'rung'`); at a village epoch the church's and the manor's strike weights carry V07's persistence rows and the hinterland steps by V07's slack, order and cap; with the town product alone it clamps at 1 500, reported; on H-DESERT: every retirement is a `retireWay`, a hollow way struck a second time is `effaceWay`d to `decayed` and never struck a third time, no way carrying an entry, approach or landing is ever retired and no retirement leaves a gate, a frame exit or an occupied plot without a path (at every batch), and in the rise every hollow way bounding a face that tier (5) cuts is reopened by `reopenWay` before the cut — at the village rungs and after the hand-up alike; at every batch of the rise, 0 occupied plots whose only access runs over an `abandoned` or `decayed` way — a toft reoccupied, a house platform rebuilt, a vacant plot built or a close infilled (tiers (0)–(4), V07's (6v)–(8v)), and a use opened or moved onto a house platform or a cleared trace (the use phase's openings, moves, relaxation and split shop) or a dossier-backed use relocated there, on a hollow way has that way, and any hollow way on its path to the ways in use, reopened in the same batch; at a village epoch a `cloister` opening — a roster member in the `uses` step; a record through the product's `records` placement in the `dossier` step — takes a plot joined with its vacant neighbours up to `claimArea.cloister` at its band, or V07 §3.12 (c)'s outside plot, never a smaller plot, a record placed in the epoch it arrives; a `cloister` record added at a village epoch whose district's `geometry` cap that epoch's earlier batches have spent still takes its joined plot in that epoch — its joins in the event's `EditBase.disruption`, the district's `geometry` count in the churn ledger unchanged by them, the event reported over budget where they pass the `dossier` row's budget and never refused — and the same record on an absorb without an epoch does the same; every participant runs at every epoch and gates itself: after H-VILLAGE hands up, `village.density` runs at the base-product epochs while the superseded `VillagePlan` stands (its `afterField` ops committed, the old core's density raster re-derived on its recorded inputs), and at a TOWN epoch `village.plan` and `village.pins` return no ops, the epoch's digest equal to that of a run with them unregistered | exact |
| T-V6-52 | property | households: across every epoch of H-100, H-VOID and a sky fixture, ground + underground + sky households equal the epoch's target at the epoch's end, and no household is in transit after any epoch; on H-VOID, an epoch that opens an access fills F6's new dwellings by relocation only (the total unchanged, ≤ `voidDwellings.share` of the district's poorest band), and a clearance epoch (the undercity shrinking, a pier founded over a lived chamber) re-houses every vacated underground household inside the participant, none in a tent while ground capacity exists; a phase's `displaced` row naming a household not in its building is dropped and `demandTaken` above the delta clamped, each reported | 100 %; 0 in transit |
| T-V6-53 | hook | the why answers persist: the four providers' answers (a moved use, an enceinte with its runs' materials, a district's prosperity with its shade and water, a plan) are identical before and after a save, a load and a rebase, at a TOWN and at a village rung | exact |
| T-V6-54 | hook | the base hooks scheduled: a burn of ≥ 60 connected buildings or a flood above the rows raises the ground at the row's chance (exact on forced draws); a passage whose rear plots stay vacant for their span is sealed, and regrowth reopens it before reoccupying its plots | exact |
| T-V6-55 | hook | crypts over epochs, at every batch of H-100, of 50 random trajectories and of H-DOSSIER (whose see moves and returns): wherever a cathedral use is live its building has a crypt, and that crypt is the largest ranked crypt (author-declared crypts excepted, each reported); a church mutated to the cathedral carries its crypt from the batch its occupy step applies; the former cathedral, still a church, keeps every vault, its capped bays as undercroft, and they regain the crypt role when the see returns; zero catacomb sources lie under a church | 0 violations |
| T-V6-56 | hook | the crypt join, on H-CHURCHYARD: the join's uniform is fixed per (church, complex) pair and gives the same answer whether the growth that reaches the crypt happens at an epoch or at a regeneration, across replays; a success yields one crypt access whose cause's event is the epoch's seq; a refusal never changes; the access follows its host's closures when the church decays | exact |
| T-V6-57 | hook | generated raised ways over epochs, at every batch of H-METRO (TOWN to METROPOLIS), H-100 and H-AQUA | 0 new generated raised ways at a TOWN or village-rung epoch; each generated way carries its reason key and its why rows (the reason's values and the gate); each is within its kind's cap and the rung's total at its founding epoch; the epoch that crosses into CITY may found one; 0 households left unhoused or put in a tent by a raised way's clearing, and none in transit after the epoch; each way founded at an epoch has the stations and pier rings item 244's support step lays on its course (the same stations when its course is re-solved unchanged), no pier above `maxPierM` for its kind, its deck at least the clearance above every crossed part-0 way, and a candidate whose course the step drops — or whose solved course is a single station — reported in `raised.waited` with its `u` unchanged (V06 §3.19 (5)) |
| T-V6-58 | hook | a removal holds: on a METROPOLIS fixture, delete a generated viaduct, an elevated road and an aqueduct; then 100 epochs of growth, a Regenerate (keep), a New random of each crossed district, a save and a reload, a decline below CITY and a regrowth to METROPOLIS; the delete's dry run is V09's `info.remove.holds` line with its kind | 0 of the three re-appear; no replacement is founded while the kind's cap is held by the suppression; undo of each delete restores it at its address; `rerunFrom` with the re-apply keeps each removed; a user's re-add serving the key is counted once; **the other kinds' re-adds**: on H-PORT a generated quay wall and a harbour-mouth chain, on H-TERRACE a generated retaining wall, on H-DECK a generated deck plot, each deleted and then re-added by committing V09 §4.20.3 (4)'s Build it again events (the events volume 10's Put it back takes) — each key served by its re-add: 0 generated duplicates through 50 epochs, a Regenerate (keep) and a reload, counted once and never in `suppressedHeld`, and deleting the re-add puts the original removal back in force; **the history's kept-removed line**: on the same METROPOLIS fixture, an epoch whose viaduct reason passes its gate at the removed viaduct's key reports one `raised.suppressedFired` entry carrying the delete's `seq` and week (the elevated road's and the aqueduct's likewise, the entries in removal order); an epoch whose gate fails reports none — the decline's CITY epochs, the fixture's seed searched so that the viaduct key's `u` lies at or above the CITY chance, and every TOWN epoch, where (C) does not run; none after the delete's undo and none while a serving re-add stands; the list identical after a Regenerate (keep) and a reload (rebuilt by replay) |
| T-V6-59 | property | keys and cadence: the same century to the same METROPOLIS target at 13-, 52- and 520-week cadence; a Regenerate after a history | the same set of raised-way reason keys in ≥ 95 % of 100 seeds, the rest only where `p` crossed `u` between sampled weeks; each reason still live after the history regenerates at the same address; each reason key draws exactly once in its life across replays |
| T-V6-60 | hook | caps across a rise and a fall; declared ways; the hand-down | the count admits no founding over a cap; a METROPOLIS fallen to CITY holding four ways keeps them, reports `aboveCap` once and founds none until below; a declared way uses up its kind's slot; ways carried down to a village (with volume 7 registered) survive with their reasons and states; a released way re-opens its key with the same `u`; a way with no `reason` counts as declared; a reason whose lineage no longer exists reads unmet and its key stays held |
| T-V6-61 | hook + statistics | decline and repair of raised ways, on H-AQUA, H-OASIS and a METROPOLIS decline fixture | disused only as V06 §3.19.2 (2) states; spans fall while supports stand (at every batch, 0 supports cleared while a span beside them stands); the vaults collapse with their span in the same batch; a viaduct carrying a primary is never disused; a raised way with a ruined span whose reason is live is repaired before any new founding and never in the batch that struck it; the H-AQUA aqueduct runs dry in the epoch its spring silts; the H-OASIS aqueduct runs dry in the epoch its spring's flow falls below `spring.aqueductMinFlow` and is repaired once the flow and the need return |
| T-V6-62 | hook | retaining walls, at every batch of a century on H-TERRACE | walls only on levelled ground steeper than `terrace.slopeMin` with steps above `terrace.stepMinCm` (V11); 0 walls deleted by `amalgamate`, `plotToGarden` or a re-cut; every way crossing one is a stair or a ramp, kept through `downgradeWay` and `upgradeWay`; slumps only below terraces abandoned for `retaining.neglectAfterYears`; after a levelling the neighbours' stored plans re-cut inside the epoch event and their unstored plans stale (V03's outside-ground row); a drawn wall never slumps; a decayed stretch is restored intact by a re-levelling of a plot on its high side and by the landfall clearance, a ruined one replaced by a new stretch; a removed generated wall is never made, re-derived or restored again until the delete's undo, a retaining wall the user draws on its chain serving the key meanwhile (V06 §3.19.3 (7)); a `raiseGrade` tombstones every wall in its region; across each re-derivation of a generated wall on H-TERRACE — after an edit that re-levels a unit and at every epoch op that levels — every decayed run's state knots lie within `retaining.settings.stateSnapCm` of their old place, and no knot whose vertex survives is dropped (§2.2 rule 5; file f item 245; `bar.T-V6-62`) |
| T-V6-63 | hook | decks, at every batch of a century on H-DECK | deck plots within the deck's width and budget; 0 `densify` and 0 `back_court` on a deck plot; only uses V11 §3.24.4's per-use `deckOk` admits on deck plots, and a relocated use carrying a dossier crypt record never lands on a deck plot; a deck struck by flood, fire or disuse leaves 0 standing buildings on it and 0 households unhoused; the oxbow's bridge is struck only after the oxbow has silted to marsh; a repaired deck re-offers its plots, and their buildings are new lineages; a removed generated deck plot's slot is never re-offered until the delete's undo, the user's declared plot at the slot serving it meanwhile (V06 §3.19.3 (7)); a deck's condition equals its host's existence at every batch, `Bridge.state` unchanged |
| T-V6-64 | hook | participants and scope | the arch vaults follow their spans at every batch (a chamber under every standing `vault` span, none under a fallen one); `sky.clearance`'s 100 % clause holds after every epoch of a century with islands (V05 §3.15 (7)); an opened close-up crossed by a new raised way has 0 junctions with it and no plot in its strip; `scope.raised` and `scope.levelled` equal the lifecycle entries of the epoch |
| T-V6-65 | goldens | the no-op pins on V12 §3.7.8's engine: `item110.raised`, `.terrace`, `.deck` and `.stepped` (V12 §2.13), each overlay reading V11 §3.24.0's switch table for its family's off form ("every `deck.offer` 0, `terrace.enabled` false" for the deck and terrace families), over H-100, H-AQUA, H-TERRACE and H-DECK | each family's century history byte-identical to its own off-state set (V12 §3.7.8; "the history without item 110" read per family, `roster.specialisations` included); T-V6-44's pattern; switching the rows on is one declared shift naming every golden it moves (V12's rule), and at TOWN and below no way-network digest moves with only the raised-way rows on |
| T-V6-66 | hook | the landfall clearance, on a sky fixture whose island falls on built ground at year 30 with salvage demand around it, covering a field, an arch of a generated aqueduct (a span and a pier), a street grating and a catacomb stair: every struck way member regains its `formerClass` with a re-laid surface, a struck wall member is restored, a struck plot member builds at tier (3); the field's `quarry` face leaves the decoration in the batch that turns it `commons`, and only after the ledger's credit from it is spent and `land.scrubAfterYears`; the span and pier leave it in the batch of the `repairRaised` or `dismantle` that ends their cover; the decoration is tombstoned in the batch that removes its last member, whichever op, and 0 decorations stand at any batch with an empty member list; with no salvage demand nothing is cleared; the grating and the stair return `open` (a secret access `locked`) in the batch their host leaves, and a lived void whose only access was the stair is `accessible` in the same epoch | exact |
| T-V6-67 | hook | foundations at an epoch: a raised way founded at an epoch over a lived cavern chamber, a basement grown over a ruin gallery and a terrace levelled over a cavern each collapse exactly the elements V04's rule collapses at a regeneration of the same state (the same element set), the dwellings on collapsed floors vacated and re-housed in the participant | exact; epoch = regeneration |
| T-V6-68 | hook | a village mine breach: on H-VILLAGE with a forced cavern within `breachM` of a mining use opened at an epoch, the working breaks in when its depth reaches the cavern — one `AccessPoint` at the working, cause `mineBreach` with the epoch's seq, no link record — and never when it does not | exact |
| T-V6-69 | hook | calamity deaths (file f item 573): on H-DOSSIER, a calamity's `deaths` raise the catacomb need of the epoch at its week by each cemetery's `burialShare` of them, never the cap; an event with no `deaths` reads 0 | exact |
| T-V6-70 | hook | **the edge suite** (V06 §3.21, one fixture per clause): (a) a phase returning an op on a tombstoned id, a stray `displaced` row and an over-large `demandTaken` — skipped, dropped, clamped, each reported; (b) a hazard of an unknown kind, a row with a missing param and a `drought` on a map with no spring — reported, defaulted, a no-op; (c) each conversion kind on a tombstoned target and in its no-op case, each with its line; (d) an epoch with nothing to report, and a lost report block rebuilt by replay; (e) an epoch with no change of input — every phase run, nothing re-rolled; (f) decline with no candidate, one leaver and a spent cap, undone and reloaded; on H-DOSSIER, a fall whose leaving household is a locked or pinned dwelling's last — a `relet` down to 0, no `vacate`, the building's state kept; on H-100, a standalone fall whose suffix holds a locked and a pinned household and a protected dwelling's last household — each held and the next unlocked households leaving in their place, and with none left the shortfall counted `households.heldByLock`, no `relet` taking the protected dwelling below one household (V06 §3.5.1 (1), (4), (5)); and every `DeclineOp` kind the pool applies over H-100's decline undone with its epoch to byte identity (T8-1's epoch form); (g) growth with no residual, a residual of one and a missing band row; (h) a hazard placed outside the frame and a hazard epoch undone and replayed; (i) a reach with coincident knots, an oxbow born under 0.1 ha and a spring on its shore; (j) Works on a target a later op of the epoch tombstoned, retired and then undone; (k) a document with no epoch, `diff(w, w)` and a frame whose images are gone; (l) a raised-way course of one station and a `SpanRef` with equal ends; (m) the hand forms' no-op cases (a strain cleared that is absent); (n) the combinations of V06 §3.21 (b) the other tests do not name — a moat after `wallToWay`, a square across a decline, a frame reached by a stage, steep ground under a new stage at each rung | exact; 0 crashes, hangs, lost data, silent wrong results or whole-map retries |
| T-V6-71 | goldens + hook | **the history replay at generation** (item 113; V06 §3.20; takes T113-1, T113-2, T113-3, T113-6 and T113-7): on H-HISTORY, the present population and every dossier fact match exactly after the replay, walls and street lines stand beyond the present fabric, the church is oversized for the present congregation, the peak is `symbolic` (CITY's range at `history.symbolicQuantile`) and every fact it sized carries `Provenance.symbolic`, and the `HistoryRecord` holds the peak, the epochs with their mapped events (the fire, the plague years and the trade collapse in their epochs) and the buried systems; two runs of the same seed and history are byte-identical, epoch by epoch, on the five engines (T113-2); on H-REFOUND the new settlement's ways run on the old traces where they serve (a share of its way length on old traces above the one-click baseline), it builds on old foundations first, and the ruins older than the burial threshold are buried by `BuriedFormer.lay` and cleared on the ground, younger ones standing; a fixture whose void's last open link a replay epoch closes reads `lost` and one that reopens it `accessible`; with no evidence of a higher tier no peak and no `symbolic` fact; a history with a founding after its present replays nothing, reported; with `history.replay` false generation is byte-identical to the base (the no-op pin `item113.history`: the history fixtures, registered by V06's E9 seat on V12 §3.7.8's engine); the estimate stays within `replay.budgetMs` by coarsening, the epoch length chosen reported (`ReplayPlan.epochYears`, `replay.epochYears`), and the whole wait inside the comfort level (T-V6-24) | exact; byte-identical; the reuse share above the baseline on 50 seeds; within the comfort level |
| T-V6-72 | hook | **springs and oases over epochs** (item 111 (b); V06 §3.12.1; takes T111-1 – T111-5's epoch form), on H-OASIS: the drought of year 30 multiplies each spring's flow by (1 − its share) and no spring recovers in that epoch; the flow recovers `spring.recoverPerYear` a year after; the spring the wadi's shift moves off is lost (flow 0) and never recovers by rule, its pond silting to marsh after its drawn years; the gardens it fed turn `commons` after their drawn years below `spring.gardenMinFlow` and are re-taken when the flow returns, the grove thinning and re-laid likewise; the prosperity field near the failed spring falls at the next field evaluation and its quarters' bands drift down only through the ladder; a site with no spring — and a wet-climate site with one — shows no change (a conformance clause: byte-identical with the springs' rules removed on a spring-less site); the no-op pin `item111.water` (H-100, registered by V06's E5 seat on V12 §3.7.8's engine): with V11 §3.24.0's `climate` dry cells off, H-100 is byte-identical to its off-state set | exact; byte-identical; byte-identical |
| T-V6-73 | hook | **walls by need and means** (item 114; V06 §3.7.7; takes T114-1 – T114-5, T114-8 and T114-10's epoch clause), on H-WALLS: the low-low run decays fastest, through `worn` to `breached`; the high-low run patches its breaches (every patched run's material a patch row of its kind and culture) and never rebuilds robust; the high-high run rebuilds breaches robust and replaces patches oldest first at ≤ ⌈`rebuildRunsPerYear` × years⌉ an epoch within the `fabric` cap; the low-high run restores its worn runs while in use, and once neglected keeps decaying; a driver held at its threshold for one epoch changes no run (no flicker across two epochs); every run's material and last change are recorded and the `enceinte` provider tells its story; **across a history replay**: on a history-first fixture whose walls are patched in replay epochs and again in live epochs, the means then returning, the rebuild takes every replay-era patch before any live-era one, each era oldest first by `EpochRecord.inputs.week`, ties in chain order (V06 §3.7.7 (3)); **the welded stretch**: on a CITY fixture with an `on_enceinte` castle over 10 epochs at a poor, safe town's drivers and then a poor, threatened one's, the welded stretch's town and bailey profiles are equal at every commit, decayed and patched on the town ring's draws and λ (V06 §3.7.7; T114-10's epoch clause); V11 §3.24.0's `walls.condition` off form reproduces the rules before item 114 byte for byte (the no-op pin `item114.condition`: H-100 and H-WALLS, registered by V06's E3 seat on V12 §3.7.8's engine) | exact; byte-identical |
| T-V6-74 | hook | **the grandeur ceiling across a rung change** (item 115 (e); V06 §3.8.5; takes T115-1 and T115-2 across a rung change), on H-RUNG at the wealth maximum: at the village epochs no dwelling but the one manor (with a lord or a dossier record) takes an `H`, `U`, court, tower or turret design, and the manor count never rises with wealth; from the first TOWN epoch, buildings new or rebuilt may take the town's designs; every standing grand building of the town is byte-identical (leaf digest) across the hand-down, and every building new or rebuilt after it follows the village ceiling; a plan made at the town rung whose next step falls due at the village rung is re-planned under the ceiling; a dossier-named hall and a hand-drawn grand house keep their designs at every epoch; H-100 at TOWN and above is byte-identical with the ceiling on and off — the `item115.ceiling` registration of H-100 on V12 §3.7.8's engine (V12 §2.13), written by V06's E2 seat | exact; byte-identical |
| T-V6-75 | hook | **crisis looks and the epoch path** (item 122 (a); V06 §3.22; takes T122-1's hand-over clause), on H-DOSSIER with a fire calamity over its quarter with its linked `reconstruction` condition (V08 §3.16 (7) (b), (d)), a `regional_migration_pressure` condition whose newcomers stay, and a condition with no calamity and no population change: (a) the model digest and the document hash identical with crises followed, off and previewed, at every week of every condition (T122-1's hand-over clause) — a look writes no op, event or record; (b) the aftermath only through the epoch: before the epoch that holds the calamity's week no building, household or way differs from the same dossier without that calamity; at that epoch the fire's targets are struck in place (V06 §3.11.1), the deaths and the exodus are in its target and the newcomers who stay are seated by `siting` and `growth`; the condition with neither leaves the model byte-identical; (c) **the frontier**: on a fixture whose standing plan holds no vacancy beyond `decline.turnoverVacancy` and whose next epoch raises the target by exactly the camp's households in an unwalled stage, `frontierFor(doc, n)`'s faces are the hinterland faces that stage builds on; below the quantum, with no reachable land left, at a village rung and on a standalone neighbourhood document, the overflow belt by the gate (at a village rung, by the entry of V07 §5.6 (2)'s main approach road), below the quantum with a rich part that belt and the rich ribbon's plots; a camp with a rich part and a stage, the stage's land and the rich ribbon's plots along its arterial; a camp all of whose households are rich, the ribbon's plots alone; a stage S5a seats only in part, its land and the belt for the households it cannot seat; on S3 (9) (a)'s unserved mesa, the belt's faces nearest the boundary point closest to the growth centre; after an epoch builds on the camp's ground, the next frontier out; zero households, none; every stream's position unchanged by a call; (d) **the yield**: at no week is a building drawn both under the disaster look and under its rebuild's Works stage; a building no rebuild reaches keeps the look until its condition ends; a `decay` Works never ends it, the higher of the look's level and the building's own drawn; a preview over a building under its rebuild's Works draws the look (a preview never hands over: `crisisLookYields` false for a `null` overlay); (e) a look standing when its aftermath epoch folds; the aftermath epoch undone on a what-if copy (the look over the restored buildings); an `undo` naming the port epoch that carries the calamity, F-EDIT (§7.4 *Replay semantics*); a replay epoch (no condition, the history's calamities as events); `frontierFor` and `crisisLookYields` equal across a save and a load, a regeneration and an undo; every rung | exact; byte-identical |
| T-V6-76 | property + hook | **the decay level** (item 123 (b); V06 §3.23; takes T123-4's epoch clause), over H-100's decline and regrowth and on H-DOSSIER: (a) every lineage's `decayLevel` is non-decreasing in the week while its decay run lasts and lies in its state's third; a timber or thatch building reaches each level no later than a stone one of the same state and years; (b) restoration (a `reoccupy` back into use — item 123 (b)'s "reused" — and a hand repair): under a `repair` Works the level falls with the Works' fraction to 0 at FINISHED, the damaged elements leaving in reverse threshold order, the highest first, each element above the present level and at or below its `decayPeak` drawn repaired in patch material until a rebuild (T123-4's epoch clause); with no Works it is 0 from the event's week; a decay run beginning during a repair starts from the level the repair left; a `reoccupy` from derelict with a re-cut, and an `extend` after a repair: 0 added elements drawn repaired, every kept element keeping its peak; (c) a rebuild, a successor on the trace and a `reused` or `cleared` trace read level and peak 0; a fire's burn reads the decayed third from its week; a `vacate` and a `burn` inside a yearly epoch and a coarse catch-up epoch: the level from the Works' start week, the plan's damage and the exterior's stage agreeing at every week (item 123 (d); the agreement V02's T-V2-59 bars for T123-5); (d) a building generated ruined reads V11's default age at creation and ages from then — read after 50 years of epochs, `D` + 50 years, non-decreasing; H-HISTORY's ruins read the years since the replay epoch that ruined them, a scrub across the replayed past showing each plan aging; both over their plans by V03 §3.11 (V03's T123-1 ids unchanged); with V11's item-123 rows absent, each state's floor; (e) the level is the same for a given seed, week and lineage on the five engines (§6.5), across a save and a load, a regeneration and an undo of the epoch (the earlier history's level), and at a scrubbed frame's week (V06 §3.15.2); no op, draw or digest reads it — the history's digests byte-identical with the level's reader replaced by a constant | exact; byte-identical |

**Parity (B-REF).** Neither reference has time, so the parity bars are the static ones: with no epoch every golden is
unchanged (§13.3; T-V6-1 and the base's T67-5), and the parity presets create no Works and no hazards and run no replay.
The **growth parity** metric reads the reference that owns each subject's form: a town grown by epochs to population `P`
is compared with the one-click town at `P` (item 9: size set by population) — building count, built area and the share of
plots per band within ± 15 % — its **walled share** reported at every tenth epoch of H-100 under threat 0.5 with the bar
[0.5, 0.95] (a history drives it below the one-click town's MFCG-anchored 0.88 until circuits fire; the deviation is
declared, §4.4 *Stages and the walled share*), and its suburb stages with FTG's configured suburb stage
(`research/findings/ftg-docs-params.md` §1.3 *District-stage parameters*, §1.4 *Suburb-stage parameters*) by regime share.
FTG's standing abandoned stock in its poorest pools (the same file, §3.3 *Dependency graph*) is kept over epochs by
`decline.turnoverVacancy` (T-V6-7). The growth parity adds **raised-way presence per kind**: a history grown to `P` and the
one-click city at `P` agree within ± 15 % prevalence over 200 seeds, the history's excess — ways kept after their reason
lapsed (V06 §3.19.1 (1)) — a declared deviation; neither reference has raised ways, so no reference parity row exists.
Every threshold without a reference source is §13.7's kind, recorded with its provenance.
=== END ===
=== REPLACE ## 9 Decisions (each "chose X over Y because Z"; vetoable) ===
## 9 Decisions (each "chose X over Y because Z"; vetoable)

A superseded or amended decision carries one mark (E-24); the governing row keeps the reason.

| id | decision |
|---|---|
| J-V6.1 | chose a phase-based strategy — phases in a fixed step order, each committing its batches before the next reads; `'grow-by-stage'` registering a phase for every step the base's built path runs (prelude, demand, field, dossier, siting, growth, lapse, character, works), built once in `@plat/edit` and shared with `'history'`, a step with no phase running nothing — over the base's one-shot `plan()` returning an op list, or four phases for `'grow-by-stage'`, because later phases must see earlier phases' results, the other volumes' participants interleave at named steps, a dossier event an epoch carries is never dropped (item 20) and one code path serves both strategies (file f item 317) |
| J-V6.2 | chose to refuse `advance` on a dossier-bound document over letting a user run the map ahead of its campaign, because the host's clock owns that map's time (§4.11 *The clock*; item 20); a what-if is a detached fork (J-V6.37) |
| J-V6.3 | chose 52 weeks as the standalone cadence over a decade step, because it matches the port's cadence, so a standalone and a dossier-bound history move at one grain and every rate is per year either way (item 76 (5)) |
| J-V6.4 | *superseded by J-V6.127.* Chose no simulated pre-creation history (the dossier's past reaching the map by `HistoryHint`, item 88) over simulating a town's past at creation, offering "start small and advance" instead, because a one-click town must stay the one-click town and an aged town is an explicit, visible history |
| J-V6.5 | *amended by J-V6.61.* Chose to clamp a standalone trajectory's population to the ladder and report it, over refusing the request, because a user's "grow a lot" should run to the ladder's edge |
| J-V6.6 | chose a logistic default shape (steepness 8) over linear, because historical growth and decline spend most of their change mid-span; linear and rate shapes remain one chip away |
| J-V6.7 | chose to filter protected entities out before any draw or cap over drawing and then skipping them, because holding one thing must not change which other things the history picks (T-V6-4) |
| J-V6.8 | chose to keep the base's order — the use step before departures — judging catchments on the epoch's opening households, over reordering the base, because the strain memory's years absorb a one-epoch lag and the base's order is reviewed |
| J-V6.9 | chose WHO leaves from the roster's suffix and WHERE from exposure-weighted keys matched by band (with swaps) over emptying the suffix's own dwellings, because the roster fixes the population's composition while item 8 (c) fixes geography — both must hold (file f item 479) |
| J-V6.10 | chose one strike pool per district over the three layers' candidates over one pool per layer, because the persistence rates then set the layers' shares directly (item 8 (b)) |
| J-V6.11 | chose to re-derive every once-drawn span from a stream keyed by the epoch it began in over storing it, because it keeps the model small and the history identical on replay |
| J-V6.12 | chose a new circuit only when threat, the extramural share, prosperity, the interval and a per-year chance all agree, over a population trigger alone, because walls were built by rich towns under threat, not by size |
| J-V6.13 | chose that a ring neglected in long safety decays but is never converted to a road or built over by the engine, over converting it, because only supersession or a hand edit historically made a road of a wall; decay is an unneeded wall's default fate |
| J-V6.14 | chose fate weights road 0.7 / absorb 0.3 (keep under threat) over a single fate, because both outcomes occur historically and the owner named the road |
| J-V6.15 | chose to trace a shorter ring only through empty, ruined and cleared fabric and along plot lines, retracing at most three times and then waiting, over forcing demolitions, because decline demolishes no occupied house (item 31's rule extended) |
| J-V6.16 | chose that repair closes breaches but never rebuilds a dismantled stretch, because its stone is gone; a hand `drawWall` closes a gap (a hand `repairWall` on the gap bends to it, J-V6.98) |
| J-V6.17 | chose crowding before sprawl — tier (5″), capped by a share and a factor, the rich never crowding, decrowding a stage trigger — with a rich residual growing a stage for the rich households only (ribbon villas on the best arterial, never a quantum of land for one household), the quantum applied to the residual plus the overflow backlog (so a slowly growing town grows a stage once its backlog reaches it, at any cadence), and the overflow ladder crowding first, then informal tenure, then tents, over growing a stage for every residual, because towns filled and crowded before they spread; the backlog and decrowding stages are the base's two exceptions to "the residual only" (file f item 336) |
| J-V6.18 | chose the `ribbon` regime below 150 households and `suburb` above — §4.4's suburb row serving a history epoch's unwalled stage of at least `growth.ribbonMaxHouseholds` (file f item 293) — over one regime or MFP-6's "preset, era row or shanty toggle only", because small growth strings along the roads and larger growth fills between them (FTG's configured suburb stage, `research/findings/ftg-docs-params.md` §1.4 and §2.7) and MFP-6 describes a one-click town's last stage, while a long history filling the land between ribbons is historical; the walled share joins the growth parity with its deviation declared |
| J-V6.19 | chose no spontaneous hazards for a dossier-bound town — a rule, not a default: `adjust` to `minor` or `full` is refused with R2's line — and `minor` for a standalone one, over one default for both, because a dossier town's calamities are the dossier's (item 20 (h)) while a standalone town should feel alive |
| J-V6.20 | chose fire as a breadth-first spread over adjacency with firebreaks, flammability and wind, capped by mode, over a circular burn radius, because streets, squares, water and stone stopped historical fires |
| J-V6.21 | chose no war or siege operator, because item 8 rules the owner's war example out of the design |
| J-V6.22 | chose a less flammable roof on rebuilds for 30 years after a fire (an extension row, 0 in the parity presets) over none, because post-fire ordinances are attested and the realism tiebreaker favours them |
| J-V6.23 | chose that a strained use closes and the class's deficit opens a new business where it scores best, over moving the same use, because a failed shop is a closure; thriving uses move by the relocation rule |
| J-V6.24 | chose surplus closings under the `use` cap, most strained first, and strain closings uncapped, over closing a fall's surplus at once, because shops outlast a fall for a while and a failing shop's own years are its lag |
| J-V6.25 | chose to re-score every use against a phase-start snapshot — re-scoring on the committed state a use whose links a committed op changed (J-V6.54) — and to open deficits in item 105 (f)'s order, over address order with live scores or a wholly frozen snapshot, because the result must depend on visiting order only through committed moves, which re-bind, and no link is left stale |
| J-V6.26 | chose to read the use rows' durations in years (`closeAfterYears`, `starveAfterYears`) over epochs, because epochs are irregular on the weekly clock and item 76 (5) makes every duration a year count (file f item 429) |
| J-V6.27 | chose to apply a plan's step only while the building's digest matches, re-planning otherwise, over applying stale parts, because a hand edit between steps must never be overwritten |
| J-V6.28 | chose that an edit of the evolution table applies from the next epoch and never re-runs standing history, over re-folding the log, because history is a record; `rerunFrom` is the explicit way to recompute it |
| J-V6.29 | chose buildings as casters as they stand when the field phase runs — after this epoch's hazards (a burnt quarter sunnier at once), before its placements — frozen until the next epoch, over casting within the epoch, because the field stays one pass per epoch (item 102 (c)) and gives the owner's slow drift |
| J-V6.30 | chose `'history'` as the default strategy for documents created at or after the output version that ships V06 and `'grow-by-stage'` for older ones, over changing older documents' epochs, because an upgrade must not silently change a history (§7.5) |
| J-V6.31 | chose no Works for walls, ways, water and land uses — nor for raised ways, retaining walls and decks (J-V6.90) — over extending the Works target, because their slow change is already per-stretch and per-face events across epochs, each drawn at its epoch's week, and the base's Works target is a building or plots |
| J-V6.32 | chose to chain a later change on the same target within an epoch after the earlier Works finishes, over the one-target rule's cut, because a demolition then a rebuild in one year is a sequence, not a cancellation |
| J-V6.33 | chose to retire Works relative to the epoch's span start over its week, because a frame must hold every Works of its span at any cadence (file f item 321) |
| J-V6.34 | chose derived succession — lifespans and entry ages drawn from the person's key, the chain walked on demand — over storing births and deaths as events, because it costs nothing at an epoch and keeps §10.3's pure-function person (file f item 443) |
| J-V6.35 | chose frames from before/after images of each commit with keyframes, the replay as fallback, over replaying every scrub, because recomputing epochs is too slow to scrub and images cost O(touched scope) |
| J-V6.36 | chose `frame(w)` = the log prefix through the first epoch whose week is at least `w`, over the prefix before it, because an epoch's Works start inside its span and only its model draws the transition at `w` |
| J-V6.37 | chose that a fork of a dossier-bound document is detached (no host bridge) over a forked bridge, because the dossier is the sole truth of the original and nothing may flow back (item 20) |
| J-V6.38 | chose that `rerunFrom` re-appends, in log order, the later epochs and dossier events but not the later hand edits (listed with a "re-apply" that resolves by carry-over matching, F-EDIT with alternatives on failure), over replaying every event or dropping the dossier's, because the dossier is the sole truth (item 20) while hand edits' addresses may not exist in the new history |
| J-V6.39 | chose a fallow ladder farthest-from-a-farmstead first, re-taking pasture and commons before new fields and wildwood never, over deleting fields, because abandoned fields went to pasture, scrub and wood, and were re-taken nearest first |
| J-V6.40 | chose to leave an oxbow as a still water body of a new kind that silts to marsh over deleting the old loop, because a meander cut-off leaves one (file f item 206) |
| J-V6.41 | chose a tent belt on the edge as the overflow's last rung over an "unhoused" count, because F-PLAN never drops a household and the hinterland always has ground |
| J-V6.42 | chose chronicle lines by thresholds and significance, the rest counted per district, over one line per change, because a readable history names what mattered |
| J-V6.43 | chose that a custom chain's nodes move together only when its anchor moves and otherwise one at a time with a one-epoch lag, over moving every chain as a block, because item 104 (h) (7) keeps sites and least disruption binds |
| J-V6.44 | chose the town's wealth level as an epoch input (the dossier's `wealth.label` through V08 §3.5's `wealth` row, DR6; a trajectory target) over a fixed recipe value, because a campaign's prosperity word changes (file f item 343) |
| J-V6.45 | chose hazard counts by the integer part plus a fractional-extra draw over a Poisson draw, because it matches the churn caps' idiom and needs no transcendental beyond `dmath` |
| J-V6.46 | chose to isolate a failing participant (its ops discarded, reported, the epoch continuing) over failing the epoch, because §5 forbids a whole-map retry and one layer's fault should not stop the town's history |
| J-V6.47 | chose a read-only past in the UI (edits only at the head; "Open a copy from here" to change the past) over editing a frame, because the log is ordered and an edit is always appended |
| J-V6.48 | chose to show the nearest cached frame while the thumb moves and the exact frame on settle, over blocking the drag, because scrubbing must feel immediate (§12.6's preview rule) |
| J-V6.49 | chose that a castle's or a citadel's innermost ring always keeps its `keep` fate, over treating it like a town wall, because citadels outlived town walls |
| J-V6.50 | chose excavation by demand — at most one per epoch, only when accessible void capacity falls short of the crowding hook or the undercity's size law, only within `excavate.reachM` (60 m) of an accessible element, at `excavate.chancePerYear` (0.05, calibratable) — over access by chance alone or unlimited digging, because item 109 (h) says a ruin "may be excavated" and people dig where they need room, near where they already are |
| J-V6.51 | chose dwellings in the same epoch as the access that admits them (`under.undercity` after `under.access`) and their vacating in the batch of the seal that shuts the last access, over a one-epoch lag, because item 109 (j) (4) reads "an epoch that opens an access may start them, one that seals the last access empties them" |
| J-V6.52 | chose one uniform per catacomb source lineage, drawn once and compared at each epoch against the rung's chance (and the count, dry ground and the age gate), over a re-draw each epoch or one final refusal, because it is prefix-stable and monotone — a churchyard refused as a town may found a catacomb as a city, never by a second roll |
| J-V6.53 | chose a catacomb growth cap per year compounded over the epoch's span — V04's `CatacombRule.growthCapShare` at V11 §3.23.8, read as a per-year share (J-VI.6), floor `growthFloorM2` — over V04's share applied per epoch or a row of this volume's, because the same century must grow the same at any cadence (item 76 (5)) and one rate lives in one table |
| J-V6.54 | chose to re-bind links after every committed use op of the phase over a frozen phase-start snapshot, because item 105 (a) forbids a stale link on any path and a link must pull both ends in the epoch it changes |
| J-V6.55 | chose splits and merge-backs over epochs by the split index against the class's compiled `profile.split.threshold` (V11 §2.3; the web's `splitThreshold` its default) with a hysteresis (`uses.splitHysteresis` 0.1), over splitting only at creation, because a butcher splits into slaughterhouse and stall as the town grows and merges back as it shrinks, and the hysteresis keeps a pair from flickering |
| J-V6.56 | chose nearest-provider catchments from one labelled Dijkstra per class for strain, and quarters only by item 72's emergence or a declaration, over overlapping radius counts and assigned chain quarters, because item 107 (c) says nearest provider only and 107 (e) that quarters are never assigned — and the labelled search costs what an unlabelled one does |
| J-V6.57 | chose that a covering dossier record owns its class's members (generator count 0, standing uses re-bound by `assign`), members between the range's minimum and the per-capita target being map facts, over counting the generator's uses beside the record, because item 108 (c) forbids double counting and 108 (b) makes the members scale with population |
| J-V6.58 | chose water access as a hard rule on every new ring and contraction — the harbour frontage and its path inside the contraction region, a trace that cannot hold it waiting — over a soft cost, because the owner: "you'll be hard pressed to find a wall that … completely blocked off water access" |
| J-V6.59 | chose that on a dossier-bound document a circuit or waterfront wall appears only when the walls records admit it (a walls REPLACEMENT triggering one outside the chance), over the standalone threat-and-chance rule, because DR2's bar is walls exactly when the dossier lists them (item 20 (h)) |
| J-V6.60 | chose to re-resolve `Features.sewers` at each epoch from the rung (on at CITY and METROPOLIS) and, at TOWN, from the creation's one draw against the law at the epoch's population — once on, never off — over keeping the creation's value, because the owner made sewers a necessity for cities (item 14) and the creation's draw keeps it deterministic, monotone and cadence-free with no new draw (file f item 550) |
| J-V6.61 | chose to clamp to the union of the registered products' ladders ([0, 120 000] with volume 7, 0 the deserted outcome) and to run the product's phase overrides at its rungs, over the town's 1 500 floor, because volume 7 designs the hand-offs up and down and the village's own phases (file f item 317) |
| J-V6.62 | chose volume 3's crypt rank — the principal crypt the cathedral's; every other crypt trimmed to V11's `crypt.rankShare` × its area; an author ring exempt — re-run inside every epoch op that changes the principal, with this volume's rule that a trim never loses a vault (it shortens the crypt's ring only, the bays left becoming undercroft and regaining the crypt role when the see returns), over a rank function of this volume's own (extend-then-cap at 0.9), because volume 3 states the rank at generation (single source), the always class's crypt target makes a new seat's crypt the largest in the batch that makes it, and nothing physical is lost across epochs |
| J-V6.63 | chose V04's crypt join as it stands — one uniform per (church, complex) pair with no epoch component, at V11 §3.23.8's `cryptJoin` (V04's `CatacombRule` field), evaluated when an epoch's growth first reaches the crypt — over a per-church-lineage 0.5 draw of this volume's own, because item 109 (k) (2) says the crypt "may join", a key without an epoch gives an epoch the answer a regeneration gives, and V04 states the rule (single source) |
| J-V6.64 | chose that the catacomb count bounds foundations and a decline removes no complex, over removing complexes above a lower rung's count, because "it can't shrink" is the owner's and removing a whole complex is the largest shrink |
| J-V6.65 | chose to re-derive the primary complex at each epoch by the burials its cemetery serves now (past a 10 % hysteresis), the rank cap stopping growth and never reducing an extent, over fixing the primary at its founding or ranking by cumulative burials, because the owner's "the largest catacomb is the largest cemetery's" must follow a city whose main cemetery moves outside the walls, the present measure needs no new persisted state, and the hysteresis keeps it from flickering |
| J-V6.66 | chose that the use phase never moves a church-family use whose plot holds a churchyard, nor a `singular` anchor, over moving them by score, because consecrated ground and a see do not move by trade, and a moved churchyard would freeze a catacomb and orphan a crypt |
| J-V6.67 | chose to seat the crowding hook's households inside the growth phase, by S7b (6) and U-FRONT's placement on accessible capacity, before the decision, over reserving them as a take for `under.undercity`, because that participant runs after the decision and the residual must exclude exactly the households seated below |
| J-V6.68 | chose to draw a thriving use's move-chance gate before scoring its candidates, over scoring every use every epoch, because the decision needs both conditions and the gate spares ≈ 90 % of the scoring (the METROPOLIS budget) without changing the rule |
| J-V6.69 | chose one household ledger with V05's `EpochOps.demandTaken` name kept and a new `EpochOps.displaced`, over a new combined field, because volume 5 already writes `demandTaken` and one name per fact is the single-source rule |
| J-V6.70 | chose that this volume owns the calamity-to-hazard table (`tables/evolution.json#calamities`, DR28) and the port only carries the records, over a port-side mapping, because what a calamity strikes on the map is the engine's decision (file f item 388) |
| J-V6.71 | chose to persist the why rows on the use phase's lifecycle events (≤ 5 rows) over keeping them in the non-canonical report, because the answer must survive a load and a rebase and the provider must be a pure function of committed state (file f item 265) |
| J-V6.72 | chose an effective week for changes without a Works — the epoch's week for an engine op — and before-images in frames, over giving walls, ways and land Works, because it draws the past correctly at any cadence without changing J-V6.31 |
| J-V6.73 | chose `raiseGrade` after a burn of ≥ 60 connected buildings or a heavy flood over ≥ 1 ha, at a chance of 0.3 (calibratable), over never or always, because rebuilding on the rubble is attested after great fires and floods but not universal |
| J-V6.74 | chose a per-band turnover vacancy (poorest 5 %, others 1 %; 0 in the parity presets) over refilling every vacancy, because towns always carried some vacancy and FTG's poorest pools keep abandoned stock |
| J-V6.75 | chose to key a successor by its predecessor's death week over the epoch of death, because identities and names must not depend on the cadence |
| J-V6.76 | chose to cite volume 3's crypt rank and volume 4's crypt join as they stand and state only their epoch guarantees here (the seat's crypt in the batch that makes it, the rank inside the causing event, no vault lost to a trim, the join evaluated when an epoch's growth first reaches the crypt), over restating either, because each fact has one home |
| J-V6.77 | chose no crypt participant — the crypt re-derived and re-ranked inside the op that changes a church's designation — over a seat check at `afterGrowth`, because a check after the fact would leave batches in which a new seat's crypt is not yet the largest, while the causing op keeps the bar at every batch |
| J-V6.78 | chose that a history whose epochs carried dossier events stays pinned on an upgrade unless the host asks, others seeing a per-epoch diff and choosing, over upgrading silently, because a campaign's history must never be rewritten behind its host |
| J-V6.79 | chose thin adapters in `@plat/evolve` for the `under.*` participants, registered with volume 4's `U-FADE` as their `stage` (V04 §1.1; J-V11.80), over their registration by `@plat/under` or a stage id of this volume's, because volume 4 exposes functions, the epoch scope and cap are this volume's, `@plat/evolve` already depends on the layers it schedules, and every draw and table read inside them is volume 4's engine's — only their excavation-by-demand draw keys on `EVO_UNDER` (V06 §3.16, V06 §3.18.1) |
| J-V6.80 | chose to move the history store's and frames' memory settings to volume 9's per-device settings, over rows of the pinned model table, because they change what is cached, never what is drawn, and must not enter the log |
| J-V6.81 | chose that a dossier walls record with no residual rings the present built boundary through the hand `drawWall` path (no face added), over growing a zero-household stage, because the base's residual rule forbids a stage without a residual |
| J-V6.82 | chose a dedicated `raisedWays` step between `terrainWater` and `ladder` over deciding raised ways in the growth phase, because item 110 (b)'s reasons arise without a stage (a rung crossing, a need rising inside the old plan, a prosperity rise on high wards) and the households a raised way displaces must be re-housed by `siting` in the same epoch (file f item 335's ledger), never sent to a tent |
| J-V6.83 | chose that a removal of a generated raised way (and of a generated harbour-mouth chain or quay wall) suppresses its reason key, counted as filled, over matching tombstones, because the base's collision rule mints over a tombstone and an epoch's generator runs after the removal in the log — and the owner removed that way, not the kind's quota; a re-apply resolves by the key and, where no way of it stands, says so with an alternative; a user's re-add serving the key holds it, counted once (file f item 260) |
| J-V6.84 | chose one uniform per reason key with no epoch component, compared with the chance at every generation and epoch, and the key as the raised way's derivation unit, over a per-year draw keyed by lineage and epoch, because an epoch must give the answer a regeneration gives, a removal needs a stable key, and V04's vault keys must agree on both paths (as J-V6.52 and J-V6.63) |
| J-V6.85 | chose the kind order aqueduct, viaduct, elevated road — necessity, then passage, then prestige — over one pooled order by strength, because a city short of water builds the aqueduct first and the three kinds' strengths are in different units |
| J-V6.86 | chose that a cap counts standing generated, suppressed and declared ways and bounds only new foundations, over trimming to the rung's cap, because a fall below CITY never removes a raised way, and a removal or a user's own way must not be replaced by the generator |
| J-V6.87 | chose decay only for a disused generated raised way — a viaduct carrying a primary never, an aqueduct once its need or its source is gone — supports outlasting spans and repair regrowth-first from the next epoch, over striking raised ways like any fabric, because roads in use and water in demand were kept repaired, and ruined aqueducts still stand as rows of piers (file f item 291) |
| J-V6.88 | chose retaining walls as persistent fabric made only where an epoch levels, slumping only under terraces abandoned for a generation, and a plot line no merge or re-cut removes, over treating them as wall rings or as ordinary plot lines, because terrace walls outlast the houses they held and item 110 (a) says they are not enclosures |
| J-V6.89 | chose decks as struck fabric at the street rate — only when their crossing is dead and no deck plot is occupied, or by flood and fire — ruining what stands on them in the same batch, regrowth repairing a deck in use before any new crossing and re-offering its plots, over decks that never change, because bridges with houses burned and were swept away, and were rebuilt where the road still ran |
| J-V6.90 | chose no Works for raised parts, retaining walls and decks — each change drawn at its effective week — over a structure Works target (a support-then-span programme on the weekly clock), because walls and circuits already appear at their epoch's week and one rule for every line structure keeps frames and exports consistent; the rejected alternative is a base extension of `Works.target` should the owner want an aqueduct seen rising |
| J-V6.91 | chose to cross a raised way under a span — a wall opening for water, a raised gate for traffic — with continuity a hard rule and a trace that cannot keep it waiting, over routing the trace around the raised way, because walls let aqueducts through by arches and gates stood where roads met walls |
| J-V6.92 | chose raised ways as map-derived on a dossier-bound document — the water-system record making the aqueduct's need count as met, raising the aqueduct cap and the total by `capPerSizeMember` per SIZE member (V11 §3.24.7 (3)), binding its `conduit_house` as the terminal (else a fountain pin), and never scaling the chance — over a dossier gate like the walls', because the dossier lists institutions, not arches, a chance scaled by a record would make the record decide what only need decides (J-V8.67), and the terminal must never add an institution the dossier does not list |
| J-V6.93 | chose three new `DeclineOp` members for raised ways, retaining walls and decks over re-typing the wall member's `enceinte` into a target union, because stored `convert` events keep their shape and no migration is needed (file f item 291) |
| J-V6.94 | chose to mark disuse by a stored `underuseSince` on the raised way and to `neglect` a disused way deterministically in the pass, over a pool strike of `neglect` and a disuse span re-derived from history, because neglect is not a fabric loss but the end of use (as V06 §3.7.3 treats a ring in long safety), and the need ratio's history cannot be re-derived without storing it (file f item 254) |
| J-V6.95 | chose that a generated raised way with a dismantled span or a cleared support is released — no longer counted, no longer repaired, its key re-opened with the same `u` — over counting it until salvage clears every support, because a way that can never carry water or traffic again would otherwise hold its kind's cap for centuries and deadlock a city whose need is live; new aqueducts were built beside ruined ones |
| J-V6.96 | chose to clear a raised way's land whole or not at all, before its commit, charged to each district's `geometry` cap, over a partial clearing or the hand operator's own overflow re-homing, because a half-cleared course cannot be committed and the ledger must re-house the displaced in the same epoch's `siting` |
| J-V6.97 | chose the product and rung that V07 §2.1's fold gives at the epoch (the 5 % hand-off band) over §1.1's router at the epoch's target, because the router would flip product, phases and rung rows at every epoch of a target oscillating around 1 500, and volume 7 owns the hand-off |
| J-V6.98 | chose to bend (J-VI.4) every non-dossier, non-lock infeasible request of this volume — a repair of stone that is gone (a new stretch or span on its line), `from: founding` on an existing document ("Start a new town small" as a new document), `forkAt` / `rerunFrom` before a rebase point (the earliest seq), `advance` on a standalone neighbourhood document (none, with its line, J-V6.102) — over refusing them, keeping refusals only where a dossier fact rules (`advance` and the hazard mode on a dossier-bound document) |
| J-V6.99 | chose a `landfall` candidate kind in the one strike pool, at the street's rate and weighted by the salvage ledger's demand, the covered way's class kept in `Way.formerClass` and its surface re-laid by the base's rule, over a fixed clearance a set number of years after the fall or a stored former surface, because rubble is cleared where its stone is wanted (the base's salvage mark), the pool's caps bound an epoch's churn, and a cleared road is re-laid, not restored to its old paving (file f item 209) |
| J-V6.100 | chose to fill F6's void dwellings opened at an epoch by relocating the district's poorest-band ground households (up to `voidDwellings.share`, charged to the `use` cap), and to re-house the underground households `under.undercity` or a foundation collapse vacates inside the participant by §4.7's overflow pass, over new households or the ledger, because the participant runs after `siting`, the population is the target's, and `close` would otherwise send them to tents |
| J-V6.101 | chose to restore a decayed generated retaining wall only where its high side is re-levelled (a tier (3) build, a house-platform rebuild, a rung-3 re-cut) or by the landfall clearance — a ruined stretch replaced by a new one on its line, drawn walls by hand only — over a standalone terrace-repair pass, because terraces are rebuilt when the ground above them is worked again |
| J-V6.102 | chose that a standalone neighbourhood document has no clock — the time card absent, `advance` and a skeleton's `history` bent to none with the line "a neighbourhood alone has no history yet — open it in its town to advance time" (V09's message row, V10's bend row; T-V6-23), `forkAt` and the timeline kept — over running the grow path on a document with no S4–S5 growth route, because volume 1 designs no neighbourhood-level growth (J-V1.36) and a neighbourhood's history is its town's |
| J-V6.103 | chose `ProductDeclEpoch.rows` — a typed `ProductEpochRows` (per-class persistence multipliers, the street op, the hinterland's slack, order and cap) read by the engine's own decline and hinterland steps — over letting a product override those steps, because the village changes only these values and the op, and one pool keeps the persistence order and T-V6-6 in one code path |
| J-V6.104 | chose to apply V04's foundation rule as `under.extend`'s first act over the epoch's scope (`Foundations.apply`), over leaving it to the next regeneration, because a pier or basement founded at an epoch would otherwise leave dwellings on a floor its footing fills, and the epoch and a regeneration of the same state would disagree |
| J-V6.105 | chose to suppress a removed generated retaining wall by its chain's lineage address and a removed generated deck plot by its host's id and slot ordinal, in the one suppression mechanism (file f item 260), over a tombstone keyed by the line, because §6.3's collision rule re-mints over a tombstone and the re-derivation where an epoch levels and tier (5) would re-make them |
| J-V6.106 | chose to tombstone the retaining walls inside a `raiseGrade` region in its batch — V04's buried-system builder reading each as a step in the buried floor — over keeping them as live buried features, because file f item 245's record has no buried state and the buried town keeps its terraces through the floor datums |
| J-V6.107 | chose to issue volume 7's whole hollow-way ladder from this engine — `ProductEpochRows.street` gaining `again` (`effaceWay`, a hollow way struck a second time after the first dwell band [10, 30] years, keyed with its retirement epoch) and `reopen` (`reopenWay`); the retirement candidate filtered by V07's disuse test (no entry, approach or landing) and §5.3's network invariant on the network less the way; tier (5′) reopening, under any product and with no cap, any way whose `abandoned` or `decayed` existence `retireWay` or `effaceWay` set; and a hollow way reopened, with every hollow way on its shortest path to the ways in use, in the batch of any placement at tiers (0)–(5) or the village's (6v)–(9v) on a plot whose access edge it is, of the use phase's openings and moves (V06 §3.9.5, V06 §3.9.6, V06 §3.9.10's relaxation and split shop) and of a dossier-backed use's relocation — over a single `street.op` with V07 issuing the rest, or reopening only under the village product, because V06 is the only issuer of epoch ops, a hollow way leaves every router (so the downgrade's test no longer protects the frame), a village handed up to a town reopens its hollow ways before it cuts new lanes, and a reoccupied or rebuilt plot on a hollow way would otherwise stand with no path, failing the retirement's own §5.3 invariant |
| J-V6.108 | chose that a `fallen_island` decoration's member leaves in the batch of whichever op ends its cover — a strike of this kind, a `repairRetaining`, the `retypeLand` of its quarry face to commons, a `repairRaised` (restoring the ruined supports at a span's ends), a `dismantle`, or any tombstoning op — each access V04 §3.10 bricked under the member returned `open` (`locked` when secret) in that batch and the member's face in `EpochScope.surfaceChanged`, over tombstoning the decoration only when this kind has struck every member or leaving the accesses to a later pass, because V05's decoration holds land uses and raised parts this kind never strikes, rubble must not outlive its cover, and V04 §3.10 changes an access's state only with its host |
| J-V6.109 | chose to lift the sewers gate from the crowding hook's void part (file f item 574: §4.11 step (6), II.7.3 (c), §4.5 S7b (6)), applied before file f item 319, over keeping the base's gate and seating void households only through F6's relocation, because item 109 (j) (4) lets an accessible cavern or ruin hold dwellings at any tier and the hook is the base's one channel for the epoch's crowded poor, while the sewer runs keep their gate |
| J-V6.110 | *amended by J-V6.131.* Chose to repair a breach on a ring in use — no pathway, its threat above `walls.neglectThreatMax` — at the next `fortification` phase by the `repairWall` order (the `breached` runs of file f item 575's `condition` in chain order, no Works, its towers and every gate standing again with their runs, the `fabric` cap charged), a `dismantled` run left a gap and a locked or pinned ring held, over leaving a landfall's breach until neglect or a hand repair, because a defended town mends its walls, the same landfall's retaining walls, spans and decks are restored, a gap whose stone is gone stays a gap (J-V6.16), and a ring at or below the neglect bound is left to V06 §3.7.3's path so the two rules never both act |
| J-V6.111 | *amended by J-V6.126.* Chose to confirm `tables/evolution.json` by its own bars (`bar.T-V6-<n>`) and the V6-E7 panel, with one pre-decided fallback move per column family applied by V12's `fallback` run and a second miss `not-achieved`, and to mark the cost and recording bounds, the rule columns and the `calamities` mapping `calibratable: false` (V06 §2.2's *Not calibratable* list), over reference tuning runs or `fixed:` notes, because no reference evolves a town, V12 admits only `reference`, `fallback` and `corpus` runs, and a knob that shapes no model output, or is a rule or a dossier mapping, has no measurement to confirm it |
| J-V6.112 | *amended by J-V6.131.* Chose to read an enceinte's breaches and dismantled runs from file f item 575's `condition` profile — `repairWall` restoring the `breached` runs in chain order, the pathway cleared when none is `breached` — and, after `absorbWall`, to keep dismantling the cleared record's remaining runs in the fortification loop until every run is `dismantled`, its towers and gates following their runs (a tower or a gate is no building and never a pool candidate), over a per-stretch lifecycle or leaving the remaining stretches `ruined` for the pool, because a `StretchRef` is never stored, the profile has no `ruined` value and enceinte walls stay out of the pool |
| J-V6.113 | chose to merge a generated split pair at the next `uses` phase, under the `use` cap, when its class's view carries no `profile.split` (V11 §3.7.4's `splitEnabled` false, or the class's split row removed mid-history), an author's declared split standing and no split opening meanwhile, over leaving the pair on an absent threshold or merging it at once outside the cap, because the switch's off form must converge to a history without generated splits while V11 keeps placed uses (J-V11.14), and every engine op is capped |
| J-V6.114 | *amended by J-V6.140.* Chose to keep, through V06 §3.7.2 (2)'s dismantling of a superseded or absorbed curtain, the stretch that holds a raised gate whose deck stands — filtered before the draw and taken by the same draw from the epoch after that raised way is removed or its crossing span `dismantled`, after `wallToWay` as after `absorbWall` — while a wall opening under an aqueduct goes with its stretch, over leaving the gate to the pool or dismantling it under the deck, because the pool holds no enceinte part, the gate's tower is the deck's support (its run cannot fall while the deck stands without breaking the raised way's continuity, V06 §3.7.6 (5)), and an aqueduct's span passes over its wall opening and needs nothing from the stretch |
| J-V6.115 | chose to make `repairWall`'s stretch optional — with none, the ring's latest unlifted `neglect` lifted, its existence back to the state before that neglect (read from the ring's lifecycle block) when every run is `standing`, else `decayed`; with nothing to lift, a no-op with its line "this wall is in use" — issued by the engine in the batch that clears a pathway (also when no run was ever breached; cause `rule:threat`) and by hand as T3's "back in use", where it also clears the pathway whatever its cause and restarts V06 §3.7.3's neglect clock, over leaving a repaired ring `abandoned` or a separate "unneglect" op, because a defended ring must read as in use to every existence reader, `repairRaised` has the same no-span form, one op keeps one hand form and one undo, and a hand declaration that a wall is in use must not be undone by the engine's next pathway step |
| J-V6.116 | chose to name each suppressed key's serving re-add as the event V09 §4.20.3 (4)'s Build it again emits — `drawWall` on the waterfront arc, `placeGate` across the basin's mouth, `drawWall { kind: 'retaining' }` on the former chain, `drawFootprint` fitted at the deck slot — each served by the rule's own reading (the arc walled, the mouth enclosed, the chain's line covered, the slot's plot declared), counted once and holding the key only while the re-add stands, over a geometric tolerance of our own or lifting the suppression outright, because volume 10's Put it back takes exactly those events, the generators already read those conditions, and a re-add deleted later must leave the owner's removal in force as for a raised way |
| J-V6.117 | chose to register each bar V06 §8 names as a V12 `BenchBarDef` in the change that lands its line's exit — tier `'milestone'`, 200 seeds per setting on the bar's own fixture family, stages the phases' `EVO_*` ids, preset `'default'` (a parity preset would switch the web and item 110 off) — T-V6-34 and T-V6-37 registered as epoch forms beside V04's bar-map rows, over one descriptive metric per line or a registration pass at E7, because V12's lint fails an entry naming an unregistered bar and each seat exits green with its own bars |
| J-V6.118 | chose to price every island event an epoch runs — a raise at `raiseIsland`'s parts (bounded by V05 §6's "declaring an island after generation" row); a `resizeIsland` growing or shrinking at every rung where an island stands (a wane's shrinks at TOWN included) at V05 §6's "a resize, a rim reshape" row with its yards' top placements, re-cut plots, re-landed feet and scoped re-derivations; a fall at its row; a wane, settle and refloat inside the step's per-island row — per event outside the `sky.islands` row's cells, the row citing V05 §6's rows by name and restating no figure, and to derive the century's worst case from those rows on an island's generated accesses (≤ `accessCount.max`: every island resized at every epoch with every yard's top placed and every foot re-landed — a fall needs a resize-free settled dwell of ≥ 10 years, and V05 §4.2's re-landing rule bounds nothing below one re-landing per foot per resize over plots ≥ 3 m wide), each hand-placed access (≤ `accessCount.handMax`) priced beside it as the user's edit at 60 ms a resize of its island, the century's sums at the port's cadence the targets (TOWN ≈ 25.4 s, CITY ≈ 113.3 s, METROPOLIS ≈ 211.9 s) and the same worst case charged per epoch by V06 §6.8's comfort estimate where islands may stand (J-V6.135), over excluding the island events from the century, raising the `sky.islands` row to the worst case, keeping a typical-case figure (a resize one epoch in five), pricing every island at the nine-access worst case, or asking volume 5 to defer its re-landings, because what a user waits for is the comfort level (item 119 (a2)) and only the worst case is proved by the rows, a per-epoch row at the worst case would overstate every epoch without an island, a hand-placed access is the user's own edit (J-V5.82) whose cost the estimate charges only where it stands, and the re-landing is volume 5's rule (J-V5.81) |
| J-V6.119 | chose to have V06 §3.9.6's openings at a village rung read V07's `rules.claimArea` for the `cloister` and `market-hall` families — a candidate taken with its vacant neighbours joined by S10 (7)'s law up to the family's area, a roster member's joins on the `geometry` cap (a record's its dossier event's disruption, J-V6.123), no joinable candidate handing the opening to V07 §3.12 (c)'s outside plot — over opening such a class only on a vacant plot already of its area, because both families' `underSize` is `refuse` (V11), so without the join a friary could open only on a manor's toft, and V07's placement rule for the village's halls and fair needs this opening to finish its (c) |
| J-V6.120 | chose to report a suppressed raised-way key as one `{ removal, week }` entry of `EpochReport.raised.suppressedFired` at each epoch in which its met reading's gate passes — its keyed uniform drawn as for any other key, no course solved, no cap taken — over an entry only at the first firing, an entry for every met reading whatever its gate, or a per-way `why` query from the history panel, because the gate is where the city "would have founded it" without spending a course solve or a cap slot the suppression already holds, a keyed draw moves no other draw, an epoch row read alone (V08 §4.6's absorb group lists only the absorb's epochs) must carry its own line, and V09 §4.10 reads the epoch report for each row (J-V9.113) |
| J-V6.121 | chose to re-lay way surfaces as the `field` phase's last act — only the ways fronted by a plot whose `fieldBand` S6 changed, by volume 1's rule over the field as S6 now reads it, an edited `surface` kept, one `setAttr` per changed way (cause `rule:field`) — over a base change to §4.5's epoch mode, a re-lay in the ladder step at the due blocks' rung, or a full re-run over every way at every epoch, because the plot's band already carries §4.5's hysteresis (so the way needs no band memory), the field phase is where the re-banding happens and V11 row 90 names S6 as the reader, the ladder's rungs act on buildings years later while a street's surface follows its frontage at once as the owner's slow drift allows, and a candidate set keeps the step under a millisecond |
| J-V6.122 | chose that an epoch candidate whose solved course file f item 244's support step drops (`raised_too_tall` or `raised_too_long`) waits like one with no course — `raised.waited`, its `u` unchanged, re-read next epoch — over re-solving at once with a pier-height or span cost in the solver, because the base's course solver takes the pier and clear-span rules only through the step (J-VI.27: one step on every path), a waiting reason is re-read when the ground, a levelled datum or the rung's caps next change, and the report names it every epoch it waits |
| J-V6.123 | chose that a claim-sized record's joins (the product's records placement, at an epoch or an absorb) are its dossier event's disruption — charged to no churn cap, bounded by the request kind's `DisruptionBudgetRow`, reported over budget and never refused — while a roster member's joins take the district's `geometry` cap (a candidate the cap's remainder cannot hold being none), over charging both to the cap or letting a spent cap push a record to its outside plot, because the placement's context carries no churn ledger and an absorb without an epoch has none, a record never waits (V07 §3.12 (c)), and the base bounds a dossier event's disruption by its budget, never the dossier's authority (§7.7 item 5) |
| J-V6.124 | chose that every registered participant runs at every epoch at its step and gates itself — a participant scoped to a product, a rung or a state returning no ops outside it, reading `ctx.product`, `ctx.rung` and the document — over a `scope` member on `EpochParticipant` read by the runner, or running a product's participants only at that product's epochs, because `village.density`'s scope is a state (a superseded `VillagePlan`, under any product) that no product or rung filter expresses and exists for the base-product epochs after a hand-up, one rule keeps the runner a single loop for every package, and the cost is one early return per participant per epoch |
| J-V6.125 | chose that a REPLACEMENT is resolved by V08 §3.5.1 (c)'s three cases, never by template family — the greater's thing the lesser's, converted in place (`wizard_s_tower` over `hedge_wizard`: a dwelling-row house becoming a tower, a change of template family converted in place, as are `mages_guild` over `wizard_s_tower` and the cathedral over `parish_church`); a `@none` or `@office` lesser, the greater placed as an added record with the lesser's key its alias; and every other greater placed new — a pin-record lesser (`parish_church` over `wayside_shrine`) or a building lesser whose thing the greater does not keep (`fish_market` over `fishmonger`) — as an added record is (S10b's `dossier` request; at a village rung V07 §3.12 *Records at a village epoch* item 4 through the product's `records` placement), with no `convert` on the lesser's building or pin, over the row's in-place `convert` for every REPLACEMENT, because a pin has no building to convert, a fishmonger's shop is not a fish market's hall (V07 §3.12 (b)'s rim hall), V08 owns which rows keep the lesser's thing (J-V8.113), and a template-family test would place a second building beside a hedge wizard's converted house |
| J-V6.126 | chose to date each register line by its exit step — the entry written, and each bar it names registered, by the seat landing that step (`--milestone V6-E<n>`), its `due` `V6-E7` for lines exiting at E1–E6 (E7's bench runs every bar they name and sits the V6-E7 panel), `V6-E8` for E8's lines and `V6-E9` for E9's — over one `due` M6-E for every line, because V12's lint dates stages by step, one entry cannot carry two dues, the base persistence cells' line is V12's (stated there once, due `V6-E7`), and E8 and E9 may land after E7, so their bars cannot be measured at E7; E7's tests list every bar its E1–E6 lines name and leave T-V6-34 to E8 |
| J-V6.127 | chose to keep "Start a new town small" and an `advance` from a small town beside history-first generation (V06 §3.3.3, V06 §3.20), over withdrawing the start-small path once the replay exists, because item 113 generates a place with a known history as its past while start-small makes a new history the user chooses to watch, and a place with no known history stays the one-click town |
| J-V6.128 | chose a `drought` calamity row whose hazard `dry` takes a share of every ground spring's flow (V06 §2.4, V06 §3.11.7), recovering at `spring.recoverPerYear`, a spring below its thresholds failing the grove, gardens and aqueduct it feeds (V06 §3.12.1), drought leaving the `none` row, over a drought that changes nothing on the map, because item 111 makes water the reason a dry-country town stands where it does and a recorded drought must reach the facts that depend on it (principle (7)); on a map with no ground spring it changes nothing and is reported |
| J-V6.129 | chose to read §4.5 (iv)'s "recomputed whole" for a shade mask whose sampler digest differs as the next epoch's field phase recomputing it — the mask's one writer — the mask contributing no building shade until then and the edit's dry run saying so, over recomputing it inside the table edit or upgrade that changed the sampler, because a table edit or an upgrade is no epoch and runs no field phase, and one writer keeps the mask equal to a full recomputation (T-V6-12) |
| J-V6.130 | chose that only the history replay buries — V04's `BuriedFormer.lay` called in the batch of the coarse epoch whose ruin age first passes `history.burialYears`, the former records cleared — a live epoch keeping its ruins on the surface to decay by the strike pool, over burying a live history's ruins at the same age, because burial is the recorded past's (DR39: the place refounded over its ruins before the map begins), while a live history's ruins are the user's to watch, clear or rebuild, and a burial at a live epoch would carry a visible town's ruins underground behind the user |
| J-V6.131 | chose to drive an enceinte's condition (`standing` · `worn` · `patched` · `breached` · `dismantled`) by two classes sustained over windows — NEED from the epochs' threat, MEANS from the wealth level in force, read from the log with no stored field — a local weight on the decay chances only, patches when need comes without means, robust rebuilding oldest patch first within the `fabric` cap when means return, neglect wearing through `worn` to `breached`, and neutral values reproducing the rules before item 114 byte for byte (V06 §3.7.7), over a per-epoch threshold on the present values, a stored per-ring memory, or one repair rule whatever the wealth, because item 114 makes need and means sustained drivers and forbids flicker at a threshold, a replay must reproduce the drivers from the log alone, and a poor town's poorer quarters wore their stretches first |
| J-V6.132 | chose to read the grandeur ceiling at the epoch's rung (the fold's) for every design an epoch derives — lifted for buildings new or rebuilt from the first TOWN epoch; a shrinking town's grander buildings kept as they stand; a stored `MutationPlan` designing beyond the ceiling re-planned by V06 §3.10.3's rule; a dossier-named or hand-made design exempt (V06 §3.8.5) — over reshaping standing buildings at a rung change or freezing the ceiling at creation, because item 115 lifts the ceiling from an epoch on and never reshapes down, a rung crossing is no op, and the ceiling is a default, never a refusal (item 101 R2) |
| J-V6.133 | chose to run history-first generation as this engine's epochs — a creation prefix of `epoch` events folded by the ordinary runner under `'history'`, every participant running, the dossier's present records at the last epoch's `dossier` step, coarsened to a budget deterministically from the plan, detail kept lazy before `replay.detailRetainYears` (V06 §3.20) — over a separate simplified simulator of the past or a static aging pass over the one-click map, because one engine gives the replayed past and a live epoch the same rules (walls, underground, islands, raised ways and the village product included), the replay ends meeting the dossier's present facts exactly (item 20), the history index shows and scrubs the replayed epochs, and a coarsening decided from the plan alone keeps the map byte-stable per seed and history |
| J-V6.134 | chose that a dossier event changing the recorded history after creation changes no geometry and rewrites no `HistoryRecord` — the report and the clerk saying the history has changed, a Re-derive from S1 replaying it whole — with the creation prefix never an undo target and indivisible (a `forkAt` inside it bends to its end), over re-running the replay in place at the event, because a changed past would otherwise rebuild a map the user has edited behind them, while the dossier's present facts still reach the map by the ordinary fold (item 22) |
| J-V6.135 | chose, for item 119's comfort level on long runs of time (the owner's "Total", J132), one deterministic estimate for both waits — `epoch.costMs` by the rung of each epoch's target (the replay's per-epoch rows, renamed as both estimates now read them, re-summed with V07's participants), the islands that may stand at V06 §6.2's worst case, the hand-placed accesses standing at the request, and the growth stages at §12.6's law — that coarsens an `advance`'s cadence to the smallest whole number of weeks, and the replay's epoch length to the smallest whole number of years, whose estimate fits `advance.budgetMs` (9 s) or `replay.budgetMs` by the peak's rung (9 / 8.5 / 7 s: the ten seconds less the peak's generation and first map at the rung's band top and a reserve), the cadence chosen reported and the accept adopting the preview's fold on an unchanged head (V06 §3.3.2, V06 §3.20.4, V06 §4.1, V06 §6.8), over a fixed cadence with the ten seconds a target only, a comfort level per visible step, an adaptive cadence timed on the running machine, or refusing a long request, because the owner chose a total wait, a cadence timed on the machine would fold different epochs on different hosts (a replay and §6.5's engines must agree), an estimate charging the worst case keeps the ten seconds a ceiling on the reference hardware, and one epoch over the whole span always fits, so no request is refused or shortened (item 101 R2) |
| J-V6.136 | chose to coarsen a dossier catch-up whose epochs at the port's cadence would pass the comfort level — one epoch per k crossed year ends, k the smallest whole number whose V06 §6.8 estimate — its dossier events priced at V08 §6's per-event absorb bound — fits the catch-up's budget (`advance.budgetMs`, less the open's own path inside an open from SettlementForge), every dossier event still at its own week, a calamity in the coarse epoch that holds its week at its week, the population crossings read into the coarse epochs' targets, the last epoch at the dossier's week (V06 §6.8 (6)) — over keeping the port's cadence for every catch-up, because item 119 (a)'s ten seconds hold for "a dossier change applied" and "open a map from SettlementForge" too (the owner's "Total", J132), a catch-up of decades at the port's cadence passes them (≈ 23 years at CITY, ≈ 7 at METROPOLIS, fewer with islands), the estimate `advance` uses keeps one mechanism (principle (9)), and the dossier's events, calamities and present facts are met exactly at any grain, so the host's clock still owns the time (item 20); where even one epoch over the span with its events passes the budget, that one epoch is folded and the wait, past the comfort level, is reported F-BUDGET-TIME (§12.1: never a coarser or shortened result), §12.10's R12-31 charging the miss to the per-event absorb of V08 §6's rows — so no catch-up is refused or shortened |
| J-V6.137 | chose to hand a crisis over to the history by the epoch path alone — the calamity through `EpochInputs.events` and the `hazards` phase, the deaths, the exodus and the newcomers through the epoch's population target, a condition's weight on building through the `works` share, a look writing nothing — and to place the refugee camp by `frontierFor`, a pure, draw-free query of where the `growth` phase would seat the camp's households next over the model the view draws (the unwalled frontier; the overflow belt by a gate where there is none), over a look that writes its aftermath or a camp site stored with its condition, because item 122 (a) makes a look purely cosmetic and its aftermath real, a query over committed state keeps the camp where the next epoch's suburb would grow with no record to keep in step, and a query that draws nothing moves no stream (V06 §3.22 (1)–(2)) |
| J-V6.138 | chose to end a disaster's ruined look building by building — `crisisLookYields` true once a Works other than a `decay` Works has started on the building and did not finish before its condition began — over ending the whole look in the week the first rebuild's Works begins or only at the condition's end, because "no week draws both" (item 122 (a)) must hold on each building while a town's rebuild runs over years, a building no rebuild reaches still stands in the look until its condition ends, and a `decay` Works is ruin, not rebuild (V06 §3.22 (3)) |
| J-V6.139 | chose to derive item 123's decay level per building lineage at a week — each existence state owning a third of [0, 1], the years since its decay run began — at the week its change shows — at V11's rate by material inside that third, a restoration lowering it with its `repair` Works' progress, `decayPeak` keeping, per element, the highest level since the element entered the plan for item 114's patched elements, a building first met decayed reading a run begun V11's default age before and aging from then, the replay's ruins aging from their replay epochs — over a stored decay field or a level by years alone, because the lifecycle events and the Works already date every step (a stored value would repeat them, principle (9)), the thirds keep each state's look (item 123 (c)) whatever the years, the level only climbs while the run lasts (item 123 (b)), a per-element peak never draws as repaired an element the damage never reached, and a reading no op or draw takes changes no model, replay or hash (V06 §3.23) |
| J-V6.140 | chose that a wall opening under a standing aqueduct is the aqueduct's station on the trace — the curtain under the arch carrying the deck, its pier the wall's band (§2.7's support step (3)) — kept through V06 §3.7.2 (2)'s dismantling as a raised gate's stretch is and taken by the same draw from the epoch after the aqueduct is removed or its crossing span `dismantled` (V06 §3.7.6 (5)), over letting the opening go with its stretch (J-V6.114's former rule), because the support step's clear-span bound reads the spans on either side of that station: a span over the whole wall strip and its setbacks would pass `maxClearSpanM`, so the aqueduct stands on the curtain and its run cannot fall under it |
| J-V6.141 | chose, under J122 (vetoable), to read item 123 (b)'s "reused" as the building put back to use — a `reoccupy` from vacant or derelict (V06 §3.8.2) — beside a repair, its damage leaving in reverse threshold order with item 114's patches, while §2.8's `reused` state (the cleared trace worked as a garden, orchard or field, `Building.reusedAs`) keeps its one meaning and, like `cleared` and a demolition, holds no plan, its level and peak 0 from its event's effective week (V06 §3.23 (3)), over reading the word as §2.8's `reused` state, because "reused" in item 123 (b) is the program's filing text, not the owner's quotation, a trace worked as a garden has no plan to amend, and the owner's rule — a ruined building's plan amended, never redrawn, its restoration taking the damage away in reverse order — holds whole only for a building put back to use, one term keeping one meaning (principle (2)) |
=== END ===
=== REPLACE ## 12 CONFIRMED versus PLAUSIBLE ===
## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read in the base as the coherence pass states it and in the sibling volumes): the hooks V06 §1.2 cites
exist at their sections, with the file f items of V06 §10 applied as written; §4.11 *History-first generation* (1)–(7),
§7.7's DR36–DR40, §2.7's `HistoryRecord` and `HistoryHint`, §2.8's `Provenance.symbolic` and §2.3's `WaterBody.spring`
exist as V06 §3.20 and V06 §3.12.1 read them; V04's `BuriedFormer.lay` and its excavation reading `lost` (V04 §3.5.5 (b));
file f item 575's `condition` profile and file f item 244's support step on every path (J-VI.27); volume 3's crypt rank
(V03 §3.7.4); volume 4's catacomb fields with V11 §3.23.8's values; V07 §2.1's fold and hand-off band and V07 §3.12's ways
ladder and records placement; V05 §6's rows that V06 §6.2 names, with the words cited; V08 §3.5.1 (c)–(d) and V08 §3.6's
`CalamityRef`; V11's cells this volume reads (V11 §2.3's `split.threshold`, V11 §3.7.4, V11 §3.18, V11 §3.23.8, V11 §3.24); V12's
`BenchBarDef`, `CalibrationRun` kinds and register lint as V06 §8 names them; file g's item 119 (a) and (a2) as V06 §6.8
applies them; §10.2's crisis look table and its placement, V01's `campLand`, §2.6 step 7's damage layer with §6.3's
`plan.damage`, and §4.11 *The clock* (1)'s week, as V06 §3.22, V06 §3.23, V06 §3.20.3 and V06 §5.2 read them.

**PLAUSIBLE** (reasoning, each measured or calibrated by its stated protocol with its pre-decided fallback):
1. every budget of V06 §6 — the per-epoch rows (the targets), V06 §6.2's century sums at the port's cadence (TOWN ≈ 25.4 s,
   CITY ≈ 113.3 s, METROPOLIS ≈ 211.9 s, derived by hand from V05 §6's rows with an island's buildings ≤ 5 % of the default
   request's and its generated accesses), V06 §6.8's cost rows and budgets — that its estimate bounds the measured waits on
   the reference hardware —, the history image size per epoch at CITY and METROPOLIS, the way-surface re-lay under a
   millisecond, a dossier catch-up's coarsening by the same estimate, its dossier events priced at V08 §6's per-event bound (V06
   §6.8 (6)), V06 §6.9's rows for the hand-over
   and the decay level, and one early return per scoped participant costing nothing measurable — until E0 and E9 time them;
2. that V06 §6.2's worst case (every island resized at every epoch, every foot re-landed, each hand-placed access priced
   beside it) bounds every history;
3. every default of V06 §2.2's table, V06 §2.4's hazard and calamity rows and V06 §3.9.9's clientele table (our own, calibratable
   by V06 §8's register) — among them `decline.turnoverVacancy`, `uses.splitHysteresis`, `uses.openCandidates`, `raise.*`,
   `excavate.*`, `catacomb.primaryHysteresis`, the flood row's `timberScourCm`, the landfall's rate and the `spring.*` and
   `replay.*` rows; V11's cells this volume reads (the structures block, the catacomb and raised-way rows, `history.*`,
   `walls.condition.*`, `walls.patchMaterials`) are PLAUSIBLE in V11's register;
4. the statistical bars' deltas of V06 §7 (E7's and E9's benches confirm or re-declare them) and the register's fallback
   moves;
5. that the failure scenarios traced by reading are closed by the rules as written, as no code exists — households in
   tents from a raised way, a removed way re-founded at the next epoch, fire stopped at a bridge's water, deck houses
   over-drowned, a port walled off from its quay, tent belts at a fine cadence, the mask's inexactness under a Works, the
   early drawing of Works-less changes, a flickering wall condition, a village reshaping its manor down;
6. that the engine's histories and the replayed pasts read as historically faithful to the owner (the side-by-side
   protocol, §13.6, on H-100 and H-HISTORY);
7. that the decay level's form — a third of the range per existence state, the years at V11's rate inside it — reads as
   item 123 (b)–(c)'s progressive damage, and the unwalled frontier as the ground the next suburb takes (the same
   protocol on H-100's decline and H-DOSSIER's camp); V11's item-123 rates and default age are PLAUSIBLE in V11's register.
=== END ===

