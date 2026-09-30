## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds (to build depth)

1. **The fabric machine** — `FabricStrategy` registrations for the four NG templates (`area` = the base's bent cut,
   `street`, `square`, `ring`) and seven context templates (`quay`, `wallside`, `crossroads`, `landmark`, `bridgehead`,
   `stepped`, `park`), all built from four seed primitives (a spine, a ring course, a plaza, a fan) laid in the district's
   **template face** before the base's bent cut runs on the rest (V01 §3.4).
2. **Fabric selection (S7c)** — the eager, town-wide rule that gives each district its fabric from its context and its
   **provisional character** (item 72's vector on the district's allocation before placement), so the character drives
   the template (V01 §3.2, §3.3). S7c runs inside S7b (1), between its greedy pass and its reconcile, and the reconcile
   moves the households a template's land displaces, so the population stays whole (V01 §3.3.7).
3. **Block dispatch (S9b)** — the eager step that types every built block `ordinary`, `manor`, `square`, `green` or
   `yard` from quotas (typed squares per 1 000 inhabitants, the sub-block green quota, the manor-block share) and a
   weighted draw, its land accounted in the programme (V01 §3.5).
4. **Context features** — the per-district rules giving every waterfront, wall-side, sloping, bridge-end and gate district
   its feature (stage-2 feature S2's coverage matrix) (V01 §3.6).
5. **Local identities** — named local places (`HoodPlace`: squares, greens, yards, courts, openings), the way-naming context
   that makes local street names reflect the street, and the way-surface rule (V01 §3.7).
6. **The close-up** — the `refine` derivation (neighbourhood-tier pins, the hood title), its trigger, cache, staleness
   and persistence; the `replace` close-up as a model edit (V01 §3.8, §3.9).
7. **The unit run** — the generation path for a close-up with no base under it: the standalone neighbourhood document
   and each sky island's districts (V01 §3.10), at generation and inside an island's raise, late declaration or New
   random (V01 §3.10.3 (6)), with the island river's bridges (V01 §3.10.3 (4)).
8. **Seams** — what stage 2 adds to II.1: template portals, the ring-radial stagger, the dispatch seam guard, the
   `SeamReport` computation (V01 §3.11).
9. **Editing, the `hatched` family at all four bands, labels and exports, budgets, tests and the M5 build plan**
   (V01 §4–§8).
10. **File g's neighbourhood parts** (each base mechanism cited to its item): item 102's shade in the context, the fabric
    weights, the manor siting and the close-up's pins (V01 §3.3.3, §3.5.5, §3.8.2); item 103 (f)'s catchment unit,
    `catchmentOf` and the EMITS / SENSITIVE-TO pushes in the dispatch, which runs after S10a (i) (V01 §3.5, §3.16); items
    104 (h) (3) as revised by 107 (e) and 105 (a), (g), (i): the allocation-level supply links in χ̃ and the chains in the
    context, never a quarter assigned (V01 §3.2, §3.3.3); item 108's QUARTER, GUILD and SIZE records reaching the identity,
    the dispatch, the panel and the title (V01 §3.5.12, §4.5, §5.2.1); item 106's barrier closure in the typed boundary
    and the wall-side reads (V01 §2.3, §3.6); item 109's surface side — public openings as places and symbols, a symbol for
    every access opening on a ground face (a building's own access is its plan's head, volume 3), the undercity's parent
    district, the voids under a district, `districtsAbove` and `fabricSignature` (V01 §3.7.1, §3.8.8, §3.16) — and item
    109 (k) (2): catacomb entrances only on cemetery ground or a CITY / METROPOLIS quarry ossuary's surface head, crypts
    with no place or pin, the source cemetery a fixed input, the `blockLifted` notice, and the outline close-up that opens
    the hinterland's extramural cemeteries (V01 §3.7.1, §3.8.9, §3.9).
11. **The `NG` preset** — a zeroing parity preset whose entries select Neighbourhood's own rules, so the NG panel compares
    like with like (V01 §3.15; §7.6, item 584; item 23) — and **`hood.constants`**, the table every numeric rule of this
    volume reads (V01 §3.14; item 23, DEFINITION §5).
12. **Item 110's neighbourhood parts** (each base mechanism cited to its item): the terrace state and the `stepped` row's
    contour series with a ravine's two flanks; the inputs of the ward-edge wall the base's levelling raises and the
    locality of every wall (its step profile derived); stair crossings in drawing and naming; the raised ways as committed
    inputs of a close-up — the under-deck strip, crossings under open spans, the arena parts each reader reads, their land,
    their removal and addition; the district that owns a deck's plots; the hatch of ridgeless roofs and the stack order of
    stepped tiers with their shadows; a street round every precinct; the exports; the Terraces hillside of a standalone
    neighbourhood document (V01 §2.3, §3.4.3, §3.4.4, §3.6, §3.11, §3.17, §5).

### 1.2 The base hooks this volume consumes

Each row names the hook's home and what this volume does with it; the hook's content is stated at its home.

| hook (home) | what this volume consumes | how this volume uses it |
|---|---|---|
| II.1 | `Seam`, `SeamEdge`, `Portal`, `SeamAmendment`, `SeamContract`, `NeighbourhoodRequest` / `Result` (item 539), `SeamReport`, rules (1)–(6), the neighbour step, `Sample` (declared beside `Seam`, item 540) | template portals and radial ends are II.1 (3) amendments (V01 §3.11); the request and result as V01 §2.4 reads them |
| II.2 | the template rows, `RingFabric`'s ring courses (item 58 (a)), template road widths | the template face, the seed primitives, the other templates and every ladder (V01 §3.4) |
| II.3 | the dispatch idea, the pin gate with weight decay (item 58 (c)), local identities, compounds | S9b (V01 §3.5), the hood pins (V01 §3.8.2), local places (V01 §3.7) |
| II.4 | persistence (LC-18, J-P23), the workflow, elaboration by click (item 28) | V01 §3.8, §3.9, §4 |
| II.5 | stage-2 readiness and the M5 exit | V01 §7's tests extend them |
| II.6 | the sky call, `SkyStrategy`, `IslandRule` | the unit run lays each island's districts (V01 §3.10.3); volume 5 owns placement and supply |
| §2.4, §2.5, §2.7 | `Way` (`surface`, `slopeP95`), `District` (`fabric`, `fabricParams`, `identity`, `terrace`), `Block` (`content`, `squareType`, `ringCentre`, `voidCorner`, `overrides`), `Plot`, `Allocation`, `Pin`, `Greenery`, `HoodPlace`, `RetainingWall`, a way's `raised` record, deck plots; the types `FabricStrategyId`, `TypedBoundary`, `BlockKind`, `SquareType` (MC-11) | written and read as V01 §2.7's lifecycle rows state |
| §2.8, §2.9 | the elaboration record's `closeup` rung, the elaboration cache, the `closeups` digest block, `Recipe.product` / `hood` | the close-up's record and cache (V01 §2.5, §3.8); `HoodRecipe` (V01 §2.6) |
| §4.1 | the stage graph, the laziness contract, the pool and the hinterland unit, elaboration by click | S7c and S9b placed in it; the unit run a unit of its kind (V01 §3.1) |
| §4.2 S1 (2), S1 (5), S2; §4.8's bridge rule | the closed-outline routine and outline templates; crossing sites, spans and the bridge build (`deckCm`, `kind`, `piers`); the programme's land estimate | the standalone outline rows (V01 §3.10.2); the island crossing sites (V01 §3.10.3 (4)); the square and green land (V01 §3.5.9) |
| §4.5 | the grower, typing, fields, `FieldBands`, S7b, item 72's character, identities, the band range | χ̃ = §4.5 (2)'s function over allocation rows (V01 §3.2); S7b's capacity less the dispatch land (V01 §3.5.9) |
| §4.6 | the bent cut (steps 1–11), holed laws, the slit, the portal gap, the ladder, the strategy slot | every template calls it on its remainder; its holed laws cut ring bands (V01 §3.4) |
| §4.7 | S9, S10a, S10 (0)–(10), S10b, S11, the levelling and its district-edge source, the deck row | S10a reads `Block.content`; S10 (7) joins a manor block; S11 places square centrepieces (V01 §3.5.10); V01 §3.17 |
| §4.9 | the greenery rule table, S12b | the court-greening and green-block rows (V01 §3.5.7) |
| §4.12 | `StrategyRegistry`, the hook points `S7b.afterGreedy` and `S10a.afterDrivers` | S7c and S9b registered by `@plat/hood` (V01 §3.1) |
| §6.1, §6.3 | streams, concerns, lineage, the anchor rule, successions, the stage id `S8.seed` | three concerns (V01 §3.12); successions in `SeamReport.superseded` |
| §7.1–§7.4, §7.6, §7.7 | the events, the tool binding, the dry run and its bends, locality, the lifecycle table, editable tables, the parity presets, the derivation rows | no new event kind; T1, T6, T8 and T12 gain one parameter each (V01 §4); `NG` joins the parity presets (V01 §3.15); DR26 (V01 §1b) |
| §8.1–§8.6, §8.10 | the display list, the `hatched` family, programs, states, crowns, the neighbourhood band | the `hatched` family at all four bands (V01 §5.1) |
| §9 | label entities, the knowledge admission, spines, floors, the title rule | place labels, the hood title, local names (V01 §5.2) |
| §10.4 | the naming engine | the way-naming context and place names (V01 §3.7) |
| §11.1 | formats; SVG at the neighbourhood band for a district scope; VTT scope a district | per-format stage-2 content (V01 §5.3) |
| §12.4–§12.6, §12.8 | the CITY split, the neighbourhood-band open bound, the scoped regeneration law, the elaboration cache | the stage-2 budget split (V01 §6) |
| §13.5, §13.6 (2), §13.7 | NG baselines, the NG panel, the S4 (d) band, S3's seam band | V01 §7's bars |
| §14 | `@plat/hood`, `FabricStrategy`, `StrategyRegistry` | the package's contents (V01 §8.3) |
| §15.2 | stage-2 letters S1–S6 | each tested in V01 §7 (S4 (e), (f): T-V1-48, T-V1-49) |
| §16 M5 | the milestone | V01 §8 |
| g item 102 (a)–(d) | `shade(x)` from terrain and walls (field pass 1) and island strips (pass 2); the sunlit-side preference | `DistrictContext.shade`, S7c's `shade` term, S9b's manor sun factor, the close-up's fountain and bandstand gates (V01 §3.3.3, §3.5.5, §3.8.2); on a sky arena volume 5's `shadeSky` (V05 §3.11 (4); J-V1.87) |
| g item 103 (a), (f); V11 §2.3–§2.4 | `SitingProfile` (emits, sensitive, coverage), `RelationFamilyRow`, `CoverageSpec.unit` | the catchment unit and `catchmentOf` (J-V1.35; V01 §3.16); the dispatch's EMITS / SENSITIVE-TO pushes (V01 §3.5.4, §3.5.5) |
| g items 104 (b), (h) (3) as revised by 107 (e); 105 (a), (g), (i) | active chains (dossier and custom), S7b (1)'s district supply term, allocation-level links | χ̃ (5)'s `c`, `DistrictContext.chains`, S7c's `chain` term; never a quarter assigned (V01 §3.2, §3.3.3) |
| g item 108 (a)–(c) | the ladder table's step types; QUARTER, GUILD and SIZE records with members `#k` | the identity, the forecourt landmark, the dispatch's fixed inputs, the panel's members (V01 §3.5.12, §4.5) |
| g item 106 (a)–(c) | `Enceinte.closure` `barrier`, the defensibility classes, the `ChainProfile` stretch, intramural gardens | seam typing of barrier arcs (II.1, item 541), `wallShare` and `noIntervallum` over walled stretches only, gardens excluded (V01 §2.3, §3.6) |
| g item 109 (e), (g), (j) (3), (k) (2)–(5); II.7.4–II.7.6; V04 §3.1, §3.3 (P7, `forecastSafety`), §3.4 (F6), §3.5.1, §3.6a (`underDistance`), §3.7a (T8), §3.10, §4.3 | `AccessPoint` (the kinds item 554 adds; `source`, `role`, `cause.system`), `UndergroundSystem.sources`, the catacomb's ratchet and stagnation, undercity neighbourhoods, `Features.sewers`, the undercity circumstance, the below-TOWN set, the ground-edit row, P7's void-dwelling forecast | openings and catacomb entrances as places and symbols; the fixed-input set, `blockLifted`, the undercity's parent (II.7.5 (2) through `districtsAbove`), `under[]`, `fabricSignature`, `catchmentOf` underground, the standalone document's layers, a replace close-up's cross-arena scope, the hood's void part (V01 §3.7.1, §3.8.8, §3.9, §3.10.1, §3.16) |
| V05 §2.3, §2.3a, §2.4, §3.2, §3.5 (3), §3.8 (4), §3.12, §3.15 (5), §4.2, §4.3; item 280's sky stage | `SkyUnitInput` (the island's unit inputs: land, rim strip, claims, landings, field, district kind, fabric hint), `IslandShadeStrip`, the `sky-*` kinds, the islands gate, an island as one walk unit, the unit run's contract (`plantRimWalk`, the district ids, `portalsTotal` 0, the river's crossing sites), `raiseIsland`, New random on an island, the resize and the rim reshape, the island re-read of a ground edit, a ground landing's S8 destination | the sky unit run (V01 §3.10.3); S7c's κ (V01 §3.3.3); the strips read by S9b and the close-up (V01 §3.5.5); `catchmentOf` on a sky arena (V01 §3.16); the destination lane (V01 §3.4.2 (a)) |
| V06 §2.1 | `EpochParticipant` | `hood.fabric` at `afterGrowth` (V01 §3.3.6, §3.5.11) |
| V10 §2.13 | `WhyProvider`, `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull` with V11's families | V01's providers (V01 §4.5) |
| V11 §2.3 (`naming.district`, `naming.way`, `naming.place`) | the grammar slices | the features V01 derives for them (V01 §3.7) |
| g item 110 (a)–(e); items 244, 245, 246, 260, 290, 302 | `RetainingWall` and S10–S11's levelling with its district-edge source; raised ways with their generator, supports, spans and suppression; deck plots with the `deck` row; stepped tiers; the second known-city fixture | the terrace state and the contour series (V01 §3.17.1, §3.4.3); held walls, strips, crossings, the parts each reader reads, their land and removal (V01 §3.17.2–§3.17.5, §2.3); deck ownership (V01 §3.17.6); stack order and tier shadows (V01 §5.1.3); T-V1-50–T-V1-54 |
| V11's item-110 rows | `terrace` (`slopeMin`, `stepMinCm`), the relief rows' `terracedEdges`, `ways.crossing` (`rampMaxGrade`, `stair`), `raisedWays.structure` (`clearanceCm`), `aqueduct.terminal` | `terraceState` (V01 §2.3), the stair-stepped way (V01 §3.6 (3)), crossings under arches (V01 §3.17.3), the terminal (V01 §3.17.8) |
| V02 §2.1, §2.6, §3.7, §3.11, §3.15–§3.17, §5.2–§5.3 | the wings' canonical order by key, `BaseWing.on` and `solid`, each wing's `RoofSpec.kind`, the `stairFlight` program and `stairTreads(w)`, `DeckContext`, `PorchKindRow` and the secondary porch, the `wings` rung's triggers, `roofscape` facets and the `roofConstruction` switch, `MassingRef.family` `ovalCourt` | stack ties, tier shadows, the ridgeless hatch and the treads (V01 §5.1.2–§5.1.3); deck buildings in the owner's close-up (V01 §3.17.6); the entrance reserve (V01 §3.8.2 step 5); the outline close-up's trigger (V01 §3.8.1); the arena floor's exclusion (V01 §3.8.2 step 1) |
| V03 §3.3, §3.7.1–§3.7.3, §5.1, §5.4, O1 (e), J-V3.73 | the access head at the building band, the ground predicate `ground(b)`, `stackAccessDoor(b, a)`, `basementDoor(b)` (E-29's shared door helper), the stoop, the church class | one mark per access (V01 §3.8.8); the entrance reserve (V01 §3.8.2 step 5); the church class in V01 §3.7.1 |
| V07 (item 506) | `FabricStrategy.levelledUnits`, `terracedEdges` | `TemplateFabric` returns the bent cut's levelled units and declares terraced edges (V01 §3.17.1 (4)) |
| V04 §3.5.4 (item 244's span rule) | a raised part's spans with their `use` (`open`, `vault`) | crossings through `open` spans only (V01 §3.17.3) |
| V05 §3.22; V06 §3.19 | the island's walls and raised-way rules; raised ways, walls and decks over epochs; V06 §3.19 (7)'s clearing under a new strip | V01 §3.17.7; V01 §3.17.4's epoch clause and §3.3.6 (3) |
| V12 §3.4, §3.6b | the metrics `block.area`, `grid.r4`, `grid.axis`; the `paired` margins | `fabricSignature(region)` returns the town side (V01 §3.16); T-V1-46 |
| items 447, 448 (§11.1); J-VI.3 | item 110's GeoJSON names and the VTT rule; the six closure barrier kinds | V01 §5.3; II.1's seam typing (item 541) |

### 1.3 Out of scope, and whose it is

* **Stage-3 compositions and plans** (the `wings`, `rooms` and `plan` rungs beyond the base's stored wings) — volumes 2
  and 3. A close-up raises the `wings` rung by §4.1's policy and draws whatever the registered `BuildingGenerator`
  returns; at M5 that is the base's outline builder, so the stored base wings.
* **Sky-island existence, count, supply, size, altitude, placement, terrain echo, shadows and their epochs** — volume 5.
  This volume gives an island's districts their fabric through the unit run (V01 §3.10.3) and nothing else.
* **Underground content** (the sewer-front and undercity rows, the systems, their access chances, the catacomb's growth,
  ratchet and stagnation, the ruin's plan) — volume 4. The close-up machinery opens an underground district as a `refine`
  close-up (II.1) with no hood pins (V01 §3.8.2). This volume builds only item 109's **surface side**: the places and
  symbols of openings, dug accesses and catacomb entrances, the undercity's parent district, the voids a district sits
  over, the fixed-input protection of a catacomb's source cemetery, the `blockLifted` notice, and the two services volume
  4 reads (`districtsAbove`, `fabricSignature`; V01 §3.16).
* **The siting rulebook's rows** (every class's profile, the families, the signature pairs, the goods, the coverage and
  balance rows, the ladder step types) — volume 11; the placement solver that reads them — the base (§4.7 S10a–S10b).
  This volume reads the rows where the neighbourhood makes a choice (the fabric, the dispatch, the pins) and defines the
  catchment unit (J-V1.35).
* **Epochs** re-running S7c and S9b, and the dispatch under decline — volume 6. This volume registers the participant
  (`hood.fabric`, V01 §3.3.6, §3.5.11): both steps run on an epoch's new and due blocks only, never on survivors; the
  shade drift (item 102 (e)) reaches them through it.
* **Screens and flows of the application** — volume 9; this volume fixes the tool parameters and the events they emit
  (V01 §4).
* **The clerk's prompts and model** — volume 10; this volume fixes what the clerk reads and proposes for stage 2
  (V01 §4.5).
* **Word lists and the grammar's rows** — volume 11 authors them; this volume fixes the naming features they read
  (V01 §3.7).
* **Calibration runs** — volume 12; every calibrate-later constant here names its default, its measurement and its
  fallback (V01 §3.14).

