# Volume 1 — Stage 2: the city composed of neighbourhoods (NG-class close-ups on the base)

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V1-neighbourhoods, its revision, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**Citations.** `§n` and `II.n` are sections of the base design, `docs/ARCHITECTURE.md`, with files f and g applied
(`docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`); `Vnn §n` is a section of a design volume, this one
included; `item n` is an amendment item (its home is §0.2's landing row); `J-VI.n` is a volumes-integration decision
(`docs/volumes/_integrate.md`), cited and never restated; research files are named by file and section only.

## 0 In plain words

Stage 2 makes every part of a town open up into a detailed neighbourhood, the way watabou's Neighbourhood generator
draws one — rows of houses with hatched roofs, courts behind them, wells, fountains and big trees, small squares, street
names — except that ours is a close-up of a real part of a real town, so its streets are the town's streets and its
edges fit its neighbours exactly.

**How it feels to use.** You click a district; the view glides in and the district becomes a neighbourhood: hand-inked
roof hatching, every lane named, each court with its well or tree, the little squares with a cross, a statue or a trough,
and the district's name in the emptiest corner like a title. Nothing about the town changes — the houses are the same
houses, drawn closer — so closing and reopening a district never alters the town. A small panel shows the
neighbourhood's name, what it has become (a craftsmen's, merchants' or religious quarter …) and a row of layout cards:
**Organic** (the town's own lanes), **Main street**, **Square**, **Rings**, and the ones the place suggests
(**Quayside** by the water, **Wall-side** under the wall, **Crossroads** at a busy junction, **Around the church** where
a church stands, **Bridgehead** at a bridge, **Green** round a park). Picking a card shows a faint preview with what
would change; accepting it re-lays that one district and leaves the neighbours exactly as they were. **New look** gives
the same layout with a new seed; locks keep what you like. Everything is undoable, and every change made inside the
close-up is saved with the town. Nothing you ask for is refused unless the dossier or a lock forbids it: a layout that
does not fit, a value past its range, or a square where the neighbours are already full is bent to the nearest thing
that works, and one line says what happened ("14 households move to the Weavers' quarter").

**The town itself is made of neighbourhoods.** At generation each district chooses its layout from what it will hold
and where it lies — a trading quarter on a through-road may get a main street, a quarter round a great church rings, a
harbour quarter a quay street; most keep the organic lanes. Its blocks then get their character: most are ordinary rows
of houses round courts; some small ones become squares — before a church, at a crossroads, at a bridgehead — some
greens, and in rich quarters a few whole blocks go to one great house with its yard. How many squares and greens a
district gets follows how many people live there and how well off they are. Before any street is drawn the town sets
aside the land each chosen layout needs — the square, the ring roads, the main street — so nobody loses a home to a
square: households that no longer fit move to a district with room, as the allocation already moves them.

**A standalone neighbourhood document.** From the start screen you can make a neighbourhood on its own, as Neighbourhood does:
pick a shape (or draw one), a size (small, medium or large — about 85, 700 or 1 050 houses, Neighbourhood's own sizes),
what kind of place it is, and whether it is leafy or has no church; one click gives a finished neighbourhood with no town
around it. Its outline follows its layout: a main-street neighbourhood is a long strip round its street, a square
neighbourhood sits round its square. It has no floating islands, sewers or undercity, no old quarry, no generated vaults
and no buried older town; a cave or ruin may lie under it, with a few squatters once someone has dug a way down, and at
most one catacomb. Floating islands use the same machinery: each island volume 5 builds is laid out as one to three
neighbourhoods on its own land, every landing reached by a street, with no roads in or out. A **Neighbourhood** preset
reproduces watabou's own rules exactly, so the side-by-side comparison compares like with like.

**The owner's rules (file g items 102–109), street by street.** Sunlight matters a little: a quarter in shadow — under a
cliff, behind the wall, under a floating island all morning — is a little less often laid out as a grand square or
rings, and its great houses take the sunnier blocks, so cheaper lodging and workshops gather in the shade. Everyday
services spread out: the neighbourhood you open is the unit the siting rules count, so "one apothecary per neighbourhood"
means one per district you can click, and a great house or a green is never put beside a tannery or a midden. Trades that
supply each other sit close at street scale; a trade whose steps cannot stand each other stretches along its road, the
smelly steps at the edge; a street full of one trade takes that trade's name — but no neighbourhood is ever assigned to a
trade: a quarter is named for it only when enough of it gathers there, or when the SettlementForge dossier or you say
so. When the dossier says "the smiths' quarter" or "the weavers' guild", the close-up shows that record's buildings, here
and elsewhere in town, each counted once. Where the wall ends on a cliff, a gorge, a marsh or the sea, the neighbourhood
treats that edge as a cliff or a shore, not as a wall. Cave mouths, sinkholes, collapsed shafts and the doors of ancient
ruins become small named places with a symbol; a cellar that broke into a cave shows its stair in the house's floor plan
— and a stair dug in a yard as a mark on the plot — only to those who know of it; a cave nobody has reached shows nothing
on the street. Catacomb doors appear only in cemeteries — a churchyard, a burial ground, a monastery's graves, a cemetery
outside the walls (opened by drawing round it) or, in a city, the surface head of an old quarry turned ossuary. Churches,
and always the cathedral, keep crypts in their basements, with no entrance of their own on the street: you go down from
inside the church. A great temple built solid in tiers is entered at its foot by its own door — straight into the crypt,
or into a cellar beside it and on into the crypt — drawn with the building; where a storeyed annex stands beside such a
temple, the way down is through the annex, into the cellar under it and through one door into the crypt (V03 §3.7.4).
Rebuilding a district never moves the cemetery a catacomb grows under.

**Terraces, arches and houses on the water (item 110).** On a hill a quarter can be laid in terraces: streets along the
slope a double row of houses apart, stairs climbing between them, and a retaining wall wherever the quarter's edge
stands well above the land below; a quarter over a dry ravine is terraced on both sides with a stepped path down the
middle. A city may carry a road over a valley on arches, join two high quarters by a raised road, or bring water in on an
aqueduct; in a close-up you see the arches, the streets passing under them and no house beneath, and from the
neighbourhood's panel you can remove one the generator raised (it stays removed) or draw your own. Houses and shops on a
bridge, a mole or a jetty, and the towers and forts on a harbour mole, appear in the close-up of the quarter the bridge
or mole starts from. A stepped temple is drawn tier on tier, each tier casting its own shadow on the one below. In a
standalone neighbourhood document the Terraces card lays its streets on a hillside, so it always gives terraces.

**The look.** The hatched family (Neighbourhood's look, in our own colours) can draw the whole town: at city zoom simple
masses on warm paper; closer in, two-tone roofs; at neighbourhood zoom the full hatching, shadows, trees and cobbles; at
building zoom each roof face hatched and, once stage 3 exists, the plans. Once stage 3 draws the real roofs — valleys,
hips, towers — the hatching follows each roof face and stops at its edges.

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

### 1b WIRING TABLE — every new piece, what feeds it and what it feeds

| piece (home) | fed by | feeds | base hook |
|---|---|---|---|
| provisional character `χ̃(D)` (V01 §3.2) | S7b (1)'s greedy `Allocation` rows, §10.2 class rows (significance, families, sectors, powers), §4.3 `TradeFlow`, S3 reservations, the allocation-level supply links (item 105 (g)), dossier `Institution.powers` (§7.7) | S7c's weights; S9b's square-type split; a replace dry run's ghost (V01 §3.9); the fabric why provider (V01 §4.5) | §4.5 (2)'s character function |
| S7c fabric selection (V01 §3.3) | `DistrictContext`, `χ̃`, `DistrictIntent.planned`, `TemplateRow`s, `hood.constants`, the `fabric.select` stream | `District.fabric`, `District.fabricParams`, `templateLandM2` for S7b's reconcile | §4.5 S7b (1)'s hook `S7b.afterGreedy` (§4.12); §4.5 typing's "fabric is bent-cut unless" |
| `templateLandM2(D, row)` (V01 §2.2, §3.3.7) | the row's seeds, `DistrictContext` (face OBB, inscribed radius, inhabitants), `w_tpl`'s band top | S7b (1)'s reconcile (capacity less the template's land); S8's land caps (the plaza's `A`, the ring series) | §4.5 S7b (1) |
| `DistrictContext` (V01 §2.3) | `District`, its `Seam`s, S3/S7b reservations, S1 terrain, §4.3 trade flow, `DistrictIntent`, item 102's shade sampler and volume 5's strips (on a sky arena `shadeSky`, V05 §3.11 (4)), each live island's `shadeBasis`, the chains (items 104, 105), the ladder records (item 108), volume 4's systems (`under`) | S7c, every `FabricStrategy.partition`, S9b, the close-up panel, the clerk's why; `shade.islandShare` and `under` only after generation — the panel's reader query, the why, volume 9's voids and shade views (no stage reads `under` before the underground tail) | §14 `FabricStrategy` signature |
| `TypedBoundary` view (§2.5; assembled in V01 §2.3) | `District.seams` (barrier arcs typed by II.1, item 541) | `DistrictContext`, the templates' portal choice, the unit run's outline | §2.5 `District.boundary` |
| `DistrictSignature` (V01 §2.3) | D's committed ways, junctions, blocks, squares, terrain | T-V1-5's classifier | — (a derived view) |
| template face (V01 §3.4.1) | D's L1 faces after S7b's claims, less intramural gardens (item 106 (b)) | the seed primitives | §4.6's strategy slot |
| seed primitives spine / ring / plaza / fan (V01 §3.4.2) | the template face, portals, the `hood.template` and `cut.arc` streams, `TemplateRow.seeds`, the land caps | L1 spines and `square` / `park` faces in S8's district batch, then §4.6's bent cut | §3.4 kernel ops (`insertChain`, `splitThrough`, `connectHole`, `ringBand`, `insetRing`); §6.3's `S8.seed` stage id |
| `TemplateRow` table `hood.templates` (V01 §2.2) | authors (`select.ngOdds` among them, V01 §3.3.5), `editTable` | S7c, the seed primitives, the land estimate, the panel's cards, the S4 (b) classifier, the kind-coverage table (V01 §3.3.8) | §7.6 editable tables |
| S9b block dispatch (V01 §3.5) | S9's built blocks, S10a (i)'s placements, `DistrictContext`, `χ̃`, `squares.quota`, `DispatchRow`s, the siting families (V11), shade, the `hood.dispatch` stream | `Block.content`, `squareType`, `voidCorner` | §4.7 S10a's hook `S10a.afterDrivers` between steps (i) and (ii); §2.5 `Block` |
| `squares.quota` (§4.7, item 301; V01 §3.5.2) | authors (base rows) | S7b (3)'s square claims larger than a block; S9b's sub-block remainder | §4.7 S9, §4.5 S7b (3) |
| `Block.content` (§2.5) | S9b, `setAttr` | S10a (iii) (capacity 0 for square / green / yard; one item for manor), S10 (7) (whole-block join), S11 (square centrepiece), S12b (green blocks), S13a (places, the district's naming features), S14 (square and green fills), exports | §4.7 S10a; §8.5 (1) figure-ground |
| dispatch land in the programme (V01 §3.5.9) | quota rows at each band's centre | S2's land estimate, S7b (1)'s district capacity | §4.2 S2, §4.5 S7b (1) |
| court-greening and green-block rows (V01 §3.5.7) | band, court residues, the `greenery` stream | S12b's yard planting of courts | §4.9 table |
| context features (V01 §3.6) | `DistrictContext` water / wall / slope / bridge / gate facts | a bank path or the rear-plot water rule; the wall-side rule; stair-stepped way marks | §4.6 S8, §4.7 S10 (6), §8.2 programs |
| way-surface rule (V01 §3.7.3) | way class, the band of its fronting plots, era row | `Way.surface` | §2.4 `Way.surface`; §7.3 item 1's seam exception |
| way-naming context (V01 §3.7.2) | frontage uses, landmarks, destinations, shape, slope, unnamed `HoodPlace`s | S13a's way names | §10.4 naming engine |
| district naming features (V01 §3.7.4) | `District.fabric`, the dispatch's blocks, ring centre, area | §10.4's district names (V11's `naming.district`) | §10.4 |
| `HoodPlace` (§2.7; V01 §3.7.1) | S13a's local-place step over square / green / yard blocks, courts, square centrepiece pins; the opening pass in the commits V04 §3.10 names (the stage-2 switch's edit among them, V01 §3.15) over public openings (source `opening`, role `access`) and catacomb entrances (a catacomb system's `stair`); T11's name tool on an unnamed court, yard or square | `LabelEntity` kind `place`, the reader, exports, the way-naming context | §2.7 records, §9.1 label kinds |
| ground `AccessPoint` symbols (V01 §3.8.8) | volume 4's `AccessPoint` records hosted on a ground face with `ground.at` outside every footprint (gratings, stairs, public openings, outfall mouths, catacomb entrances, dug accesses opening in a yard), each keyed by `accessSymbolKind(a)` and sized by `hood.constants`' `access.<accessSymbolKind>M`; a building-hosted access feeds volume 3's plan head instead | S14's neighbourhood-band `glyph` marks in the pins slot; the hood pins' clearance; exports | §8.1 marks; §9.2's admission |
| hood pins `HoodPin` (derived; V01 §3.8.2) | committed blocks, yards, courts, squares, hinterland sites; the entrance reserve; `HoodPinRow`s; `CloseupParams.pinGate`; model pins (prior picks); shade; `pin.decor` at `STAGE_VIEW` | S14's neighbourhood-band `glyph` and `shadow` marks; picture and scene exports; the pin why provider | §8.1 marks, §8.10 instance overrides |
| `CloseupParams`, `CloseupRecord` (V01 §2.5) | the `closeup` event | the refine derivation; the `closeups` digest block; §7.4's independence check (`since`) | §7.1 `closeup` event; §2.9 / §6.2 `closeups` |
| `Block.overrides` (§2.5) | `instance` events on hood pins | the refine derivation's override pass (§8.10's resolution); the reader | §2.7's uniform `overrides` field; §8.10 |
| the close-up elaboration record (V01 §3.8.4) | §2.8's record with rung `closeup` | `live.stale`'s district marker, the click re-derivation | §2.8, §4.1, §8.5 change markers |
| the outline close-up (V01 §3.8.9) | a view gesture (rectangle, lasso, named site) | the refine close-ups of the districts it meets, the hinterland's per-face chunks | §4.1's elaboration by click; §9.5's framing rule |
| catacomb source protection (V01 §3.5.12, §3.9) | volume 4's `UndergroundSystem.sources` and entrance `AccessPoint` | the fixed-input set of S9b's re-derivation, a replace close-up and a content edit; the dry run's closed-source line (V04 §3.5.1 (8)) | §7.2 fixed inputs |
| `blockLifted` notice (V01 §3.9) | a replace close-up's or content edit's fates over a stagnant catacomb's extent | volume 4's catacomb growth (item 109 (k) (5)) | the event's fate report (§7.1) |
| `catchmentOf`, `districtsAbove`, `fabricSignature` (V01 §3.16) | committed districts, plots, ways; volume 4's void footprints and `underDistance`; V05 §3.5 (3)'s island unit; V12 §3.4's metric definitions | S10a / S10b's coverage term (V11's `cov/<class>` rows), volume 4's C5 parent and the ruin's distinctness step (V04 §3.5.0a (7)), V11's `naming.ruin` and culture rows, V10's explanations, volume 9's coverage and voids views | §4.7 S10b (item 103 (f)); II.7.5 (2) |
| `skyDistrictCount` (V01 §3.16) | the sky allocation's plot land, `IslandRule.districtHa` (V05 §2.3), `hood.constants`' `sky.plotShare` | the unit run's partition (V01 §3.10.3 (2)); V05 §2.3's unit inputs and V05 §3.5 (3)'s coverage units | II.6 (at most three districts per island) |
| hood title (V01 §5.2.1) | the district's `name`, `identity`, a QUARTER record's label | the close-up view's furniture; the district export's title | §9.5 title rule |
| unit run (V01 §3.10) | `HoodRecipe` (standalone) or `skyUnitInput(doc, island)` (V05 §2.3); the request without `seam`, `context`, `params`, `closeup` (V01 §2.4); after generation, volume 5's `raiseIsland` (an epoch's `sky.islands` participant, a late `convert`) and New random on an island (V01 §3.10.3 (6)) | the unit's districts, blocks, plots, buildings, names on its own arena; `NeighbourhoodResult.districts` → SKY-F → `SkyIsland.districts`; `SeamReport.landingsReached` (T-V1-21) | §4.1 units; II.1 (5) |
| the rim walk `plantRimWalk(doc, island)` (V01 §3.10.3 step 4, §3.16) | the committed rim strip — its `rim_strip` face and inner setback line, as the unit inputs carry it at generation and as volume 5's island L1 batch re-lays it (V05 §4.2); §4.9's street-trees spacing row | one `esplanade` and one `street_trees` `Greenery` per strip → S14's green and tree marks (slots 5 and 16), the exports' greenery rows | §4.9's rim-walk row (item 313), planted by this function once per event and never by a district's S12b; §2.7 `Greenery.along` |
| the entrance reserve (V01 §3.8.2 step 5) | the buildings' `Entrance` records (main, side, rear, yard, service — a concealed use's door among them), `Basement.access` and `basementDoor(b)`, the building-hosted `AccessPoint`s of a building with neither a basement nor `ground(b)` at `stackAccessDoor(b, a)` (V03 §3.3, §3.7.1–§3.7.2), volume 2's `PorchKindRow`s | the hood pins' clearance; the chunk's inputs digest (V01 §3.8.3) | §2.6 `Entrance` and *Basements*; V02 §3.7; V03 §3.7.1–§3.7.2 |
| an island's crossing-site spans (V01 §3.10.3 (4)) | volume 5's conjured river and its sites (`SkyUnitInput.river`; `Bridge` records in state `site`, V05 §3.8 (4)); the unit's outline face; `levelledGroundCm` on the island's key (its raster fallback, item 309), read for `deckCm` by the after-S8 build | each district's `bridge` template portals; built `Bridge`s with their ways (`deckCm`, `kind`, `piers` by §4.8's rule) → volume 2's deck-plot rule at S10 and `DeckContext` at S11 (V02 §3.16 (1), (5)), S13a's bridge names, S14, the exports, V01 §3.17.6's deck plots and volume 5's landfall fates (V05 §3.16 (7), §3.22 (6)); F-TEMPLATE's report | §4.2 S1 (5) as item 580 extends it to the sky unit run; §4.8's bridge rule |
| a ground landing's destination lane (V01 §3.4.2 (a)) | SKY's ground `landing` reservation and its attach (V05 §3.10 (4)) | S8's first cut in the face, before the seeds; SKY-F's check; `landingsReached` | §4.6 |
| `HoodRecipe` (V01 §2.6) | T1 `intend` with `product: 'hood'`, a skeleton file, the API | the unit run's S0–S2; the layer defaults (V01 §3.10.1 (7)) | §2.9 `Recipe` |
| the hood's void part (V01 §3.10.1 step 6) | P7's forecast at the hood's `contextRung` (V04 §3.3), capped at `forecastSafety`; the one-district allocation's poorest-band households | the underground pseudo-district's `Allocation` → volume 4's T3 F6 (V04 §3.4); F6's misses → volume 4's T8 (V04 §3.7a); T-V1-20 | §4.5 S7b (6) (d) |
| `HoodKindRow` table `hood.kinds` (V01 §2.6) | authors | the standalone programme's anchors and affinity | §7.6 editable tables |
| `star`, `ring_star`, `spindle_street`, `plaza_rect`, `plaza_star` outline rows (V01 §3.10.2) | `blueprint.features` (the standalone S0's draws) | the standalone outline | §4.2 S1 (2) |
| `hood.constants` (V01 §3.14; one `settings` row in V11's settings form, each key a column with its `ColumnSpec`) | authors; `editTable` | every rule of V01 §3 that cites a key; the `NG` preset's entries (V01 §3.15); each calibratable column's register entry (V01 §8.1) | §7.6 editable tables; V11 §2.1's settings form (registry row 62) |
| the `NG` preset (V01 §3.15): its entries on `hood.constants` — the stage-2 switch `fabric.extensionWeight`, the eight `ng.*` switches, `pin.decayScope` — and the default cell `ng.plazaM2` | authors (`ref:NG 1.2.2 … (code)` entries; the switch's fixed on value); the NG harness's and the M5 panel's preset choice | S7c's weights in town and standalone; S9b's squares, manors, small blocks and greens and its land in the programme; the court-greening row; the hood pins; the plaza size; B-REF's NG rows (T-V1-31) and the NG panel (T-V1-32), arm `NG`; T-V1-4's resolution test; V11's compiler (`PresetId`) and V12's `PresetArm` | §7.6's parity presets (item 584); item 23 |
| the stage-2 switch's edit (V01 §3.15) | an `editTable` or `editPreset` changing the resolved `fabric.extensionWeight` (the tables editor or the presets dialog); the NG harness's and the M5 panel's preset choice | a Re-derive from S2 with §6.3's carry-over: S2's land estimate (`λ_b`), S7c's weights, S9b, the local-place step, the hood pins' chunks (stale), the underground tail's T6 opening pass (V04 §3.10; J-V4.121); the dry run's fates (V01 §4.1), the oracle (V01 §4.3), V01 §4.4's row, V01 §6's line, T-V1-4's switch clause | §7.6's first-reader-stage re-derivation; §7.4's `editTable` / `editPreset` row; §12.6's Re-derive-from-Sk line |
| the calibration register entries of this volume's cells (V01 §8.1) | the compiled `hood.*` tables (V11 registry row 62), `way.surface` and `squares.quota`, each column's `ColumnSpec.calibratable` (V11 §2.1) — each `hood.constants` key its own column and entry `cal.hood.constants.*.<key>`, each `hood.templates` column its entry from M3a's `stepped` row — and provenance; the landing seat's `plat calibrate register --defaults` (V12 §3.11), and `--defaults --milestone M5` for a value this volume's M5 tuning moves before its due | `plat calibrate register --check` at M1's, M2b's, M3a's and M5's exits (V12 §3.11's lint, T-V12-20); M-CAL's corpus run, which may move an `own` cell (V12 §3.10); `MilestoneRecord.exitCriteria`; the tables editor's cell inspector (volume 9) and the clerk's provenance answer (volume 10), as every entry's (V12 §1b) | V12 §2.6 `CalibrationEntry`, §3.11 |
| `SeamReport` fields (V01 §3.11) | every close-up and unit run | M5's S1 acceptance, the report panel | II.1 |
| `hatched` family rows (V01 §5.1) | `StyleSheet` data | the tile worker's raster at every band | §8.2 |
| F-TEMPLATE, F-DISPATCH, F-UNIT (V01 §3.13) | the three stages' failures | the generation report (§5.4); their tests (V01 §3.13's test column) | §5.2 |
| concerns `fabric.select`, `hood.dispatch`, `hood.template` (V01 §3.12) | the concern registry | S7c, S9b, the seed primitives | §6.1 |
| `hood.fabric` epoch participant (V01 §3.3.6, §3.5.11) | volume 6's epoch engine (`afterGrowth`), the epoch's new faces and due blocks, `EpochScope.recut` and `.raised` (V06 §2.1) | `District.fabric`, `Block.content`, `squareType` on those only | V06 §2.1 `EpochParticipant` (registered in §4.12's `StrategyRegistry`) |
| why providers for fabric, content, square type, places, hood pins, the terrace, the ward-edge wall and the under-deck strip (V01 §4.5) | committed state only (terrain, `terraceState`, the raised way's recorded reason) | volume 10's `why` query; volume 9's "why?" panel | V10 §2.13 (§2.8's explainer registry, item 270) |
| T1 `product`, T6 furniture stamp, T8 `fabric` and `terrace`, T12 `pinGate` parameters (V01 §4.2) | the canvas, the clerk's API, the skeleton file | `generate` with `Recipe.hood`; `instance`; `setAttr(district.fabric)` or `setAttr(district.terrace)` + `regenerate`; `closeup` | §7.1's tool binding (items 272, 349, 350) |
| stage-2 budgets (V01 §6) | measurements at M5 | §12's rows | §12.4–§12.6 (item 474) |
| `terraceState(D)` = `DistrictContext.terrace` (V01 §2.3, §3.17.1) | S0's relief class and the relief rows' `terracedEdges` (V11); S1's `terrace` site primitives; `District.terrace`; `slope.meanPct`; V11's `terrace.slopeMin` | S7c's `stepped` factor; S8's contour series (`stepCm`); the base's district-edge source (item 302); the elevated-road generator's terrace endpoints (V06 §3.19.3); the panel; the terrace why provider; `naming.district`'s `terraced` | §4.2 S0, S1; §4.7 S10; §2.5 |
| `District.terrace` (§2.5, item 211) | T8's Terraces chip (`setAttr`); a skeleton `quarter`'s `terrace` (item 350); the clerk's API | `terraceState` | §2.5 |
| the contour series and the thalweg path (V01 §3.4.3) | the template face; the unlevelled terrain's level lines; S1's drainage (the valley line); `fabricParams.terraceSpacingM`; `slope`; no draw | S8's L1 spines; `WayNamingContext.terraceIndex`; the base's S10–S11 levelling (each plot row levels to its fronting street); `templateLandM2` | §4.6's strategy slot; §4.2 S1 |
| `TemplateFabric.levelledUnits`, `terracedEdges` (V01 §3.17.1 (4)) | the bent cut's blocks, plots and ward on the template's remainder | the base's S10–S11 levelling and its district-edge source | §14 `FabricStrategy` (item 506) |
| `stepProfile(wall)` (§2.7, item 245; V01 §2.3) | both sides' committed levels (`levelledGroundCm` for ground, item 309; a way's level where a way bounds it) | S14's wall shadow; item 447's `stepMinCm` and `stepMaxCm`; the VTT threshold (§11.1, item 448); the replace dry run's notice (V01 §3.9); the wall why provider; volume 4's buried floor under a raised grade (V04 §3.5.5); volume 3's walk-out at a retaining wall in S11's basement decision (item 242) and `basementDoor(b)`'s rule 1 (V03 §3.7.1), both at M3a | §2.7 |
| held walls (V01 §3.17.2) | T3 `wall` in its `retaining` kind; a T2 terrace stroke's edge | V01 §3.5.12's fixed inputs; V01 §3.4.2 (d)'s validation; the chunk digest (V01 §3.8.3); the dry run's fates | §7.2 fixed inputs |
| the under-deck strip (V01 §3.17.3) | the committed raised part (the base's generator, T4 `road` with `raised`, the aqueduct class; its spans and piers, item 244) | V01 §3.4.1's holes; S7b (1)'s capacity; the pins' clearance; the chunk digest; exports; the strip why provider | §4.5 S7b (1); §4.6's holed laws |
| the arena parts per reader (V01 §2.3) | `PlatKey.part` of each way | every reader it lists | — (a rule table) |
| deck-plot ownership (V01 §3.17.6) | the base's deck row (item 246); `Bridge.deck`; the outermost enceinte | `inhabitants`; S7b (1)'s capacity; S10a; the close-up's frame and chunk | §4.7's deck row |
| `way.stair`, ramp hairlines, `retaining`, `raisedWay` programs (§8.2; drawn per V01 §5.1.2) | the base's stair and ramp intervals; `RetainingWall`s; raised parts | S14 from the district band (raised parts at every band) | §8.2 programs |
| the hatch per roof facet; the stack order with tier shadows (V01 §5.1.2–§5.1.3) | the sheet's `roofConstruction` facets (`fakeGablePerWing`'s faces by `RoofSpec.kind`; volume 2's `roofscape` facets); `BaseWing.on` and the wing keys; volume 2's `stairFlight` and `stairTreads` (V02 §2.6) | S14's slot 12 | §8.2; §8.6 (items 406, 419) |
| the precinct rings (V01 §3.4.4) | the qualifying reservations in σ order | S8's seeds; `templateLandM2` | §4.6 |
| `HoodRecipe.edges.slope` (V01 §2.6) | T1's hillside edge; the Terraces card's default | the unit run's S1 and relief class | §2.9 `Recipe` |
| item-110 export rows (V01 §5.3) | walls, strips, piers, decks | SVG, GeoJSON, VTT, glTF | §11.1 (items 447, 448) |
| the terminal-as-centrepiece rule (V01 §3.17.8) | the aqueduct's terminal pin or `conduit_house` frontage | S11's centrepiece draw (skipped); the hood pins' prior picks | §4.7 S11 |

**Dossier facts stage 2 reads — each through its derivation row (§7.7, item 20 (h)); stage 2 invents none.**

| stage-2 reader | dossier field (the neutral digest, §14) | derivation row | how it reaches stage 2 |
|---|---|---|---|
| χ̃'s plot mix, S9b's forecourt and landmark siting | `institutions[]` (kind, count, districtScale, facets) | DR9 (instances), DR10 (positions), DR24 (class) | as S7b allocation rows and S3 / S7b reservations — the instances the dossier lists stand where the one solver puts them |
| χ̃'s political alignment and economic role | `powers[]` (standing, governing, controlled), `economy.incomeSources` | DR11, DR12, DR13 | §4.5 (2)'s partition over the allocation rows, with `Institution.powers` overrides |
| S7c's kind factors, the provisional identity | quarter claims (`quarters[]`), district-scale records, ladder QUARTER records (item 108 (a)) | DR5; DR9 as item 108 extends it | S6's typing and item 72's identities; a dossier-defined district's identity is the dossier's (V01 §3.5.12) |
| the dispatch's fixed inputs; the panel's members | ladder COUNT, QUARTER, GUILD and SIZE records with their members `#k` (item 108 (a)–(c)) | DR9 as item 108 extends it | the members as allocation rows keyed `#k`; a SIZE record's compound block and a GUILD hall's reservation (V01 §3.5.12) |
| χ̃ (5)'s `c`, `DistrictContext.chains` | `activeChains[]` (processors, outputs, `upstreamChains`, status) (item 105 (i)); custom institutions' active reviewed chains (item 104 (b)) | DR33; DR24's custom row | allocation-level links between the chains' member rows (V01 §3.2, §3.3.3) |
| every band read (S7c terms, S9b rows, surfaces, hood pins) | `wealth.label` | DR6 | `intent.wealthLevel` into the prosperity field |
| the shade terms | the site latitude (`cell.latDeg`, `site.culture`) | DR29 | item 102's model-side sampler, through the field's pass 1 and volume 5's strips |
| manor blocks | `wealth.label` through the class mix | DR8 | the class mix's compound share at the band |
| waterfront and wall-side context | `site.terrain`, `site.access`, water deposits; `walls.records`, `walls.flagged`; the sea threats (item 106 (d)) | DR1, DR2 | the site, the enceintes and their barrier closure the base builds |
| openings, dug accesses and ruin entrances | `resources` (`ancient_ruins`, the mining deposits), `magical_node`, ley-line income rows, `magical` history events (item 109 (b)) | DR30 (ruin evidence), DR31 (relief and mining) | volume 4's systems and their `AccessPoint`s, read by V01 §3.7.1 and §3.8.8 |
| catacomb entrances and their protection | the church records and ranges (item 108's members), the Cemetery network (METROPOLIS), `Graveyard` | DR32 (burial and crypt trace), with DR9 as item 108 extends it | volume 4's catacomb sources and entrance `AccessPoint`s (V01 §3.5.12, §3.9) |
| place names; a claimed quarter's name | `quarters[].name`, `landmarks`, the dossier's names | DR14 (extended by item 384 to `HoodPlace` names) | a dossier-named place's name is dossier-owned; generated names never repeat one |
| a place's knowledge | `facets`, covert impairments | DR20 (extended by item 384) | a covert fact never reaches a public view; `hood.placeKnowledge` is the map-side default |
| the layout and block content | none — no dossier field names a district's fabric or a block's content | **DR26** (§7.7, item 384) | derived by S7c and S9b from the rows above; a dossier element's plot is never typed away (V01 §3.5.12's fixed inputs) |
| the aqueduct's terminal | `conduit_house` records | DR34 | V01 §3.17.8's terminal form |
| the terraced ward (`terraceState`, V01 §3.17.1) | `site.terrain` | DR1 | S0's relief class → the relief rows' `terracedEdges` cell (V11) → `terraceState`; no other field is read. Raised ways are map-derived (item 20 (h)): their dossier factors are the base generator's (DR34, DR35) and volume 8's; a deck plot reads no dossier field |

**A dossier change reaches stage 2's facts** through the change envelope and the epoch or event fold (§7.7, items 22, 75,
76) and least-disruption mutation: a changed row above re-derives the facts its readers produce inside the scope the
fold re-derives — S7c's fabric and S9b's content on an epoch's new and due blocks only, never on survivors (V01 §3.3.6,
§3.5.11); a place's name or knowledge in S13a's scope (V01 §3.7.1); an opening or catacomb entrance through volume 4's
commits and the opening pass (V04 §3.10) — and a fixed input (V01 §3.5.12) is never typed away. Every field stage 2
does not read is another reader's or on §7.7 item 1's ignore-list.

## 2 Data model

Records and views live in `@plat/model`, rows in `@plat/tables`, the stage-2 code in `@plat/hood` (V01 §8.3). Units,
`Identity` and `Lifecycle` follow §2.1 and §2.8. "Persisted" means in the snapshot and a digest; "derived" means
recomputed from persisted state and never stored.

### 2.1 Identifiers and the fabric table

`FabricStrategyId` (a `hood.templates` row key), `BlockKind`, `SquareType`, `SeamRun` and `TypedBoundary` are declared in
§2.5 (MC-11); `OutlineTemplateId` is §4.2 S1 (2)'s row key, its standalone rows added by item 285 (V01 §3.10.2).

```ts
type HoodSite = 'court'|'plotYard'|'yardBlock'|'square'|'green'|'cemetery'|'fieldEdge'|'outsideYard';   // hood-pin sites (V01 §3.8.2); the last three hinterland
```

### 2.2 Rows (editable tables, §7.6)

Every `hood.*` table and `squares.quota` carries §7.6's per-preset cells: the `default` value and the `MFCG` and `FTG`
entries where they differ; `NG` entries stand only on the `hood.constants` cells V01 §3.15 lists — never on another
`hood.*` table, on `squares.quota` or on a base table, each of which resolves under `NG` as under `MFCG` (§7.6, item
584). Every cell has `{ value, unit, provenance, calibratable }`. A row or column marked `extension` has its **switch
cells** — chances, gates, weights, gains, quotas and options — 0 or off in the `MFCG` and `FTG` presets (§7.6's marker;
T-V1-4), and so under `NG` unless V01 §3.15 lists an `NG` entry for them; its **geometry cells** — sizes, heights,
clearances, distances, angles, thresholds and factors read only inside a switched step — carry no marker, so every preset
reads them at their values (J-V1.98).

```ts
// ---- `hood.templates` — one row per fabric (V01 §3.4); read by S7c, the land estimate, S8's template machine, the panel's cards and the S4 (b) classifier
interface TemplateRow {
  id: FabricStrategyId; label: string /* the card's name: Organic, Main street, Square, Rings, Quayside, Wall-side, Crossroads, Around the church, Bridgehead, Terraces, Green */;
  seeds: SeedSpec[] /* laid in order in the template face (V01 §3.4.1); [] for 'bent-cut' */;
  requires: TemplateRequirement /* eligibility on DistrictContext (V01 §3.3.2) */;
  select: { base: number; kind: Partial<Record<DistrictKind, number>>; terms: CharacterTerm[]; plannedGain: number; ngOdds?: number /* the standalone auto draw (V01 §3.3.5) */ };
  params: Record<string, { default: number; range: [number, number]; unit: string }> /* the District.fabricParams keys the row reads; every seeded row has `streetWidthM` (V01 §3.4.2 (b)) */;
  fallback: FabricStrategyId[] /* F-TEMPLATE's substitution rung (V01 §3.13), ending in 'bent-cut' */;
  outline?: OutlineTemplateId /* the standalone outline family this fabric draws (V01 §3.10.1 step 1); absent → the kind row's weights */;
  extension: boolean /* true for every row but 'bent-cut': the parity presets zero its S7c weight */; provenance: string }
// templateLandM2(D, row): number — the built land (m²) the row's seeds take from D, a pure function of the row and DistrictContext (V01 §3.3.7); 0 for 'bent-cut'
type SeedSpec =
  | { prim: 'spine'; from: Anchor; to: Anchor | { parallel: 'water'|'wall'|'contour'; offset: 'onEdge'|'plotRow'|'contour' }; role: 'main'|'quay'|'wall'|'contour'|'cross';
      series?: true /* contour only: a contour series with a ravine's thalweg path (V01 §3.4.3; the `stepped` row) */ }
  | { prim: 'ring'; centre: 'centroid'|'landmark'; courses: 'law'|1 }
  | { prim: 'plaza'; at: 'centroid'|'crossing'|'bridgeEnd'|'gate'; mode: 'carved'|'void'|'green'; shape: 'coin'|'rect'|'round'; type?: SquareType /* absent for 'green' */; through: boolean }
  | { prim: 'fan'; from: 'plaza'|'ring'; portals: [number, number] /* at least, at most */; cls: 'secondary'|'path' };
type Anchor = 'portal:best'|'portal:gate'|'portal:bridge'|'pair:1'|'pair:2'|'axis';   // V01 §3.4.2 (a); 'pair:1'/'pair:2' the crossroads' two crossing pairs
interface TemplateRequirement { minFaceAreaM2Law: 'ring'|'plaza'|'spine'|'none'; portals?: number /* usable portals on the template face, at least */;
  waterShare?: number; wallShare?: number /* share of the district's boundary length of that seam type, at least; `wall` counts walled stretches only (V01 §2.3) */; noIntervallum?: boolean;
  landmarkSigma?: number; bridgePortal?: boolean; slopeMeanPct?: number; crossingPairs?: boolean; arenas: ('ground'|'sky')[] }
type CharacterTerm = { of: 'mix'|'sectors'|'trade'|'mainRoad'|'identity'|'shade'|'chain'; key?: string; gain: number };
  // factor (1 + gain × value), value in [0, 1]; 'identity' 1 when χ̃'s provisional identity row is `key`; 'shade' DistrictContext.shade.meanShare;
  // 'chain' 1 when a context chain has `alongWay`; 'shade' and 'chain' terms are `extension` (0 gain in the parity presets)

// ---- `squares.quota` — the one square quota, a base table (§4.7 S9, item 301) whose rows this volume authors (defaults V01 §3.5.2; V11 registry row 91):
//      S7b (3) claims the squares larger than a block from it, S9b the sub-block remainder
interface SquareQuotaRow { band: string; haPer1000: number /* typed-square target per 1 000 inhabitants of the district */; kind: Partial<Record<DistrictKind, number>> /* factor */ }
// ---- `hood.dispatch` — one row per band of §4.5's band set (a band without a row interpolates, item 27); read by S9b (V01 §3.5)
interface DispatchRow { band: string;
  manorBlockShare: number /* share of eligible blocks given whole to one compound (V01 §3.5.5) */;
  small: { ordinary: number; yard: number; green: number } /* phase-2 weights for small blocks (V01 §3.5.6) */;
  yardPaved: number /* a yard block's chance of paving, else grass (V01 §3.5.6) */; extension: true }
// ---- `hood.squares` — one row per SquareType; read by the plaza primitive (V01 §3.4.5) and S9b (V01 §3.5.3)
interface SquareRow { type: SquareType; m2PerInhabitant: number /* the square-sizing row S4 (d)'s fallback rescales (§13.7) */; minM2: number; maxShareOfFace: number;
  centrepiece: { kind: Pin['kind']; weight: number }[] /* S11's centrepiece draw on `pin.centrepiece`; II.2's centrepiece rule reads this row (item 542) */ }
  // a place's knowledge defaults from `hood.placeKnowledge`, not from this row
// ---- `hood.pins` — the neighbourhood-tier pin rows (V01 §3.8.2; II.3's gate and decay); arena-keyed (the underground and sky rows: V01 §3.8.2)
interface HoodPinRow { kind: Pin['kind'] /* well, pump, trough, fountain, large_tree, statue, monument, bandstand, cross, shrine */; arena: 'ground'|'sky'|'underground';
  sites: HoodSite[]; gate: { band: string; p: number }[] /* per-site probability at the band for square, yard-block and green sites, interpolated; court, plot-yard and
    hinterland sites × `hood.constants`' pin.courtFactor */;
  weight: number; identity?: Partial<Record<string, number>> /* factor by the district's placed identity row (V01 §3.8.2) */;
  shadeGain: number /* the gate × (1 + shadeGain × shade at the site): −0.5 for fountain and bandstand, 0 otherwise (item 102) */;
  sizeM: [number, number]; heightM: number /* its prism shadow (V01 §5.1.4) */; clearanceM: number; extension: boolean }
// ---- `hood.placeKnowledge` — { kind: HoodPlace['kind']; subtype?: string; knownTo: 'public'|'local'|'secret' }[] (V01 §3.7.1)
// ---- `hood.defaultCuts` — per band set: number[] (V01 §3.10.1 (5); derived from the band set's default shares unless a row is authored)
// ---- `hood.kinds` — the standalone programme's rows (V01 §3.10.1); DistrictKind values only
interface HoodKindRow { kind: DistrictKind; weight: number /* S0's draw when the recipe names no kind */; areaHa: [number, number];
  anchors: { cls: string /* a roster class id */; count: number }[] /* singular or defining classes the hood holds (a temple hood its church) */;
  affinity: Record<string /* class family, §10.2 */, number> /* × the family's share of the dispersed demand */;
  outline: Partial<Record<OutlineTemplateId, number>> /* the fallback outline weights for a context-row fabric (V01 §3.10.1 step 1) */;
  needs?: 'waterEdge'|'riverEdge'|'wallEdge'; maxWealth?: number /* shanty: drawn only when intent.wealth ≤ this */ }
// ---- `hood.constants` — every constant of V01 §3 that is not a cell of another row (V01 §3.14): ONE row, key 'settings', in volume 11's settings form
//      (V11 §2.1): each V01 §3.14 key is a column — its dotted name the key — whose ColumnSpec holds its type, unit, range, `calibratable` and
//      `extensionAllowed`; the compiled cell takes unit and `calibratable` from it (V11 §2.2), and each calibratable column takes its own register entry
//      `cal.hood.constants.*.<key>` (V12 §3.11; V01 §8.1). The only `presets.NG` entries of this volume stand here (V01 §3.15; J-V1.99).
interface HoodSettings { key: 'settings';
  [column: string]: unknown /* §7.6's cell as V11 §2.2 compiles it, one per row of V01 §3.14's column table: `{ value, unit, provenance, calibratable, extension?, presets? }` — a number,
    a bool (the `ng.*` switches), an enum string (`pin.decayScope`), a [lo, hi] range (`tpl.arrivalDeg`) or a list (`ng.plazaM2`), as its ColumnSpec types it */ }
// ---- `way.surface` — V01 §3.7.3's rule rows
interface SurfaceRow { wayClass: WayClass; era?: string; band: string; surface: Way['surface'] }
```

The base records this volume writes are declared at their homes: `District.terrace` (§2.5, item 211); `Block.content`,
`squareType`, `ringCentre`, `voidCorner`, `overrides` (§2.5, item 210); `HoodPlace` (§2.7, item 207); a template plaza's
`Reservation` of stage S8 — kind `plaza` for a carved plaza, a `square` face to S9 whose `SquareType` S11 reads from the
row that laid it; kind `park` for a green-mode plaza, planted by §4.9's parks row (§2.5, item 210 (c)).

### 2.3 Views and services (derived, never stored)

`DistrictContext` is the district-level view over the one context vector (§2.5): its `kind`, `prosperity`, `band`,
`density`, `growthStage` and `arena` read the same fields the context vector samples per plot, aggregated over D, never a
second copy; the rest are stage 2's own reads of committed state. `TypedBoundary` is assembled from `District.seams` on
demand (§2.5).

```ts
interface DistrictContext {   // the one context every stage-2 rule reads; assembled by `@plat/hood` from committed state, draw-free
  district: Id; arena: 'ground'|'sky'|'underground'; kind: DistrictKind; regime: StageRegimeId /* §4.4's regime of its growth stage */;
  areaM2: number /* intramural-garden faces (item 106 (b)) and every raised part's under-deck strip (V01 §3.17.3) excluded */; templateFace: FaceRef | null /* V01 §3.4.1 */; templateFaceAreaM2: number;
  faceObb: { majorM: number; minorM: number; axisCdeg: Cdeg };
  inscribedRadiusM: number /* the template face's largest inscribed circle, by §3.8's `spine` reader's clearance */;
  prosperity: number /* area-weighted pass-1 value; pass 2 once S10a (ii) has run */; band: string; density: number; growthStage: number;
  inhabitants: number /* Σ of its allocation's household rows × the roster's mean household size (the greedy allocation at S7c, the committed one after);
    intramural gardens hold none — they are not built land (item 106 (b)); the deck plots D owns count (V01 §3.17.6) */;
  eLo: M; eHi: M; dBar: M /* §4.6 step 1's block-depth range and band plot depth */; wMin: M /* §4.6 step 6's minimum plot frontage */;
  character: CharacterVector; characterSource: 'provisional'|'placed' /* V01 §3.2: provisional before S12c, placed after */; identityRow?: string;
  identitySource?: 'dossier'|'emergent'|'dominant'|'plain' /* a QUARTER ladder record makes it 'dossier' (V01 §3.5.12) */;
  intent: DistrictIntent /* §7.7 layer 2, resolved: absent fields derived by §7.7's rules */;
  portals: { id: Id; class: WayClass; at: PointCm; bearingCdeg: Cdeg; kind: 'way'|'gate'|'bridge'|'landing'; onTemplateFace: boolean }[] /* ranked (V01 §3.4.2 (a)); 'landing' a
    landing's attach vertex — a sky island's (V01 §3.10.3) or a ground landing's S8 destination — a template portal, never counted in SeamReport.portalsTotal (V01 §3.11 (6)) */;
  water: { lengthM: number; share: number; bodies: ('sea'|'river'|'lake'|'canal'|'harbour')[]; quayWay: boolean };
  walls: { lengthM: number; share: number; intervallum: boolean } /* over walled stretches only: `full` and `parapet` runs; a `parapet` run never has an intervallum */;
  barriers: { cliffM: number; marshM: number; closureWaterM: number } /* barrier-closure arcs on D's boundary (item 106 (a)), read by the wall-side feature and the panel */;
  slope: { meanPct: number; p95Pct: number; fallCdeg: Cdeg } /* on the unlevelled terrain */;
  terrace: TerraceState /* terraceState(D), below (V01 §3.17.1) */;
  raised: { way: Id; kind: 'viaduct'|'elevated'|'aqueduct'; reason: 'drop'|'link'|'water'|'declared'; stripM2: number }[]
    /* the raised parts whose under-deck strip meets D's faces, with their reason word — derived from the raised-way record's `RaisedReasonKey`
       (V06 §2.13; J-VI.2): viaduct → 'drop', elevated road → 'link', aqueduct → 'water'; 'declared' where the way's lifecycle cause is an edit or a
       skeleton file (item 244's derived source) — read by the panel and the why providers (V01 §4.5) */;
  shade: { meanShare: number /* area-weighted mean of item 102's shade(x) over D from terrain and walls (field pass 1's sampler); on a sky arena
      shade(x) is volume 5's shadeSky(x) on the island's 32 m lattice (V05 §3.11 (4)) and meanShare its area mean over D — no sky reader reads the ground's
      pass-1 mask */;
    islandShare?: number /* D's area share inside any island's shade strip (V05 §2.3a) — on a sky arena, inside a higher island's strip onto this island
      (V05 §3.19 (3)); absent before SKY has written the islands' shade basis; read by the panel's reader query, the clerk's why and volume 9's shade view
      (post-generation; S9b and the pins read the strips themselves, V01 §3.5.5) */ };
  landmarks: { reservation: Id; cls: string; sigma: number; centroid: PointCm; guild?: Id /* a GUILD ladder record's hall (V01 §3.5.12) */ }[] /* S3 and S7b reservations inside it, σ by §4.5 (1) */;
  records: { record: Id; step: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'; membersHere: number; membersTotal: number }[] /* ladder records with members in D (item 108) */;
  chains: { chain: Id; compatible: boolean; membersHere: number; alongWay?: Id /* an incompatible chain's tier-1 way through D along which its members lie in ≥ 2 districts */ }[];
  under: { part: number; element: Id; access: boolean; shareOfD: number }[] /* volume 4's cavern, ruin, quarry and catacomb elements whose footprint overlaps D; `access` — the
    element's cluster's `excavation` reading is `accessible` (V04 §3.5.7 (g)); a quarry or catacomb element always true (item 109 (j) (3)); filled only once the
    underground tail has run, so no stage reads it before the tail: its readers are post-generation — the panel's reader query, the clerk's why, volume 9's voids view */;
  squaresM2: number /* existing square area inside it: the main plaza, §4.8 forecourts, gate plazas, S7b square and market claims, template plazas, void squares */ }
interface TerraceState {   // terraceState(D): pure, draw-free, in @plat/model beside DistrictContext; lands at M3a (V01 §8.1)
  asks: boolean /* D.terrace 'on' → true, 'off' → false; absent → the relief rows' `terracedEdges` cell at the site's relief class — on a sky arena the island's (V01 §3.17.7 (2)) —
    (V11; item 110 (a) "when the relief row asks for terraces") OR an authored S1 `terrace` site primitive (§4.2 S1 (1)) under ≥ terrace.siteShare of D's area */;
  source: 'declared'|'relief'|'site'|'none';
  walls: boolean /* slope.meanPct ≥ 100 × the rung's `terrace.slopeMin` (V11's TerraceRow, a share; this volume's percent = 100 × share): walls may stand; below it terraced streets only (V01 §3.6 (8)) */;
  stepCm: Cm /* Δz of V01 §3.4.3's series at D's `terraceSpacingM` (its default when D is not `stepped`): the expected rise between two contour streets */ }
  // read by S7c, S8's series, the base's district-edge source (item 302), the elevated-road generator's terrace endpoints (V06 §3.19.3), the panel,
  // the terrace why provider and naming.district's `terraced`; computed from records eager at S6's end, never from District.fabric (so no cycle with S7c)
// Provisional character χ̃ (V01 §3.2): §4.5 (2)'s CharacterVector computed over the allocation rows; no type of its own
interface DistrictSignature {   // derived; every component in [0, 1]; T-V1-5's classifier standardises it over B-CITY
  loopShare: number /* share of D's way length on closed loops */; spineShare: number /* the longest spine's share of D's way length */;
  squareShare: number /* square and plaza share of D's area */; bearingOrder: number /* 1 − the normalised entropy of D's lane bearings (18 bins of 10°) */;
  orthogonality: number /* share of junction angles within ± 10° of 90° */; edgeAligned: number /* share of frontage within 15° of the nearest `water` or walled run */;
  contourAligned: number /* share of lane length within 15° of the contour */ }
interface FabricSignature {   // fabricSignature's answer (V01 §3.16; J-V1.78): the town side of V12 §3.4's paired measures over a region, by V12's definitions
  blockAreaM2: number | null /* V12's `block.area` over the built blocks inside the region (the town side of `ruin.blockArea`) */;
  r4: number | null /* V12's `grid.r4` over the committed part-0 ways inside the region */; axisDeg: number | null /* V12's `grid.axis` */ }
  // null where V12 reads `notApplicable`
// @plat/hood services (V01 §3.16), pure and draw-free:
//   catchmentOf(plot: Id, unit: CoverageSpec['unit'] | 'neighbourhood', per?: number): Id[] /* the plots in the plot's catchment */
//   districtsAbove(part: number, element: Id): { district: Id; share: number }[] /* area overlap of a void's footprint with each surface district, shares
//     descending, ties by district address — so its first entry is II.7.5 (2)'s parent for an undercity's main chamber */
//   fabricSignature(region: PolygonCm): FabricSignature /* volumes 4 and 11 pass a ruin's outline */
//   skyDistrictCount(plotLandM2: number, districtHa: number): number /* a sky island's district count, 1–3 (V01 §3.16) */
interface HoodPin {   // derived by the refine close-up (V01 §3.8.2); never stored; its overrides are Block.overrides
  host: Id /* the block, or a hinterland face */; ordinal: number; kind: Pin['kind']; site: HoodSite; host2: Id /* the court residue, yard part, block face or land-use face it stands on */;
  at: PointCm; sizeCm: Cm; angleCdeg: Cdeg; heightCm: Cm; state: 'generated'|'moved'|'restyled'|'added'|'rematched' }
interface WayNamingContext {   // S13a's naming input for a way (V01 §3.7.2), derived at S13a
  cls: WayClass; lengthM: number; shape: 'straight'|'bent'|'curved'|'ring'|'stepped' /* 'stepped': a stair-stepped way (V01 §3.6 (3)) */;
  to?: 'gate'|'market'|'bridge'|'church'|'castle'|'harbour'|'square'|'well'; landmark?: { cls: string; name: NameRef };
  trade?: string /* the class family of ≥ 0.3 of its σ-weighted frontage uses */; band: string;
  districtIdentity?: string; water: boolean; slopePct: number; placeOnIt?: Id /* a HoodPlace record its course passes (created before the ways are named, V01 §3.7.1) */;
  terraceIndex?: number /* a contour-series street's rank from the lowest level laid, 0 (V01 §3.4.3) */;
  raised?: 'viaduct'|'elevated'|'aqueduct' /* a raised way's kind, for naming.way's guard (V01 §3.7.2) */ }
```

A retaining wall's step profile is §2.7's derived view `stepProfile(wall)` (item 245), which this volume reads (V01 §3.11
(7), §3.17.2).

**Arena parts per reader** (item 110 (b); J-V1.66). Item 110 (b) puts every raised deck in a ground arena part from 1
(`PlatKey.part ≥ 1`; §3.4). Every rule of this volume that reads `ways` reads the parts this table gives, and cites it.
On a sky arena the island's one part (V05 §2.1) reads as part 0 in every row and wherever this volume says "part 0" —
an island carries no raised way (V05 §3.22 (3) (d)) — and "raised" means a ground-arena part ≥ 1 (J-V1.95).

| reader | part 0 (a sky island's own part) | a raised road (viaduct, elevated road) | an aqueduct |
|---|---|---|---|
| χ̃'s frontage, `mainRoad` and trade (V01 §3.2); `chains[].alongWay`; S7c's `chain` term | yes | no — nothing fronts a deck | no |
| portals and their ranks, `bridgePortal`, `portal:gate`, `portal:bridge`, the bridgehead template, S9b's bridgehead squares (V01 §3.4.2 (a), §3.4.5, §3.5.3) | part-0 gates; part-0 decks over water only — on a sky arena the island's own decks over its conjured river among them (V01 §3.10.3 (4)) | no; each ramp or stair end is an ordinary ground junction ranked by its carried class | no, never a portal |
| S9b's junction arms and the void junction; the greens' tier-1 frontage; manor prestige; the bank path; the quay way (V01 §3.4.5 (c), §3.5.3–§3.5.5, §3.6) | yes | its ramp and stair ends, as junctions of its class | no |
| the surface rule (V01 §3.7.3) | by its fronting blocks | the base's value for its class (it has no fronting blocks) | none |
| the naming context (V01 §3.7.2) | as V01 §3.7.2 states | `shape`, `to` (from its ends), `landmark` and `raised`; no `trade`, no `band`; its kind word the base's | none — the base names it as a feature |
| `DistrictSignature`, `fabricSignature` (V01 §2.3, §3.16) | yes | no | no |
| `SeamReport.portalsConnected`'s walk (V01 §3.11 (6)); `catchmentOf('walk')` (V01 §3.16) | yes | yes, as one edge between its two end vertices | no |
| `TypedBoundary`'s runs (V01 §3.11 (8)) | yes | never a seam: its strip is a hole (V01 §3.17.3) | never |

Raised decks carry no deck plots (V02 §3.16, J-V2.71): item 110 (d)'s plots stand on part-0 decks over water, moles, piers
and quay platforms (V01 §3.17.6).

### 2.4 The request, the result and the report

`NeighbourhoodRequest`, `NeighbourhoodResult` and `SeamReport` are II.1's (item 539): the request's `seam`, `context`,
`params` and `closeup` are absent exactly when `laid` is empty (the unit runner builds each district's `DistrictContext`
and `SeamContract` after its partition, from `skyUnitInput` or `HoodRecipe`, V01 §3.10); the result carries `hoodPins`
(refine only, derived), `places` and `districts` (a unit run's, in partition order, which SKY-F writes to
`SkyIsland.districts`, V05 §3.12); `SeamReport` gains `landingsReached` (V01 §3.11 (6)).

**The mode is derived, never passed** (J-V1.3): `unit` when `laid` is empty; `refine` when `strategy` equals the
district's committed fabric; `replace` otherwise — a model edit (V01 §3.9). A sky island's `reason` is
`SkyIsland.reason` (§2.7), not a request field.

**Implementers and callers.** II.1's `NeighbourhoodStrategy.generate(req)` is implemented once, in `@plat/hood`, and
dispatches on the derived mode: `refine` → the close-up deriver (V01 §3.8), called by the generation worker when §4.1's
trigger fires (a click, an outline, or a visible tile under `'view'`); `unit` → the unit runner (V01 §3.10), called by
`generate` for a standalone neighbourhood document and by SKY for each island (reading `skyUnitInput(doc, island)`,
V05 §2.3), returning the unit's `districts`; `replace` is never a `generate` call — it is `setAttr` + `regenerate`
through the edit engine (V01 §3.9), whose S8 calls `FabricStrategy.partition`, implemented by `TemplateFabric` (and the
base's `BentCutFabric` for `bent-cut`). The `DistrictContext` builder is called by S7c, `TemplateFabric`, S9b, the why
providers and the reader's `query` for the close-up panel and the clerk (V01 §4.5); the three services of V01 §3.16 by
S10a / S10b's coverage term and volumes 4, 9, 10 and 11.

### 2.5 The close-up's records

```ts
interface CloseupParams { pinGate: number /* [0, 2], default 1, a value outside clamped with the one-line bend: × every hood-pin gate (V01 §3.8.2) */; tableVersion: string /* the `hood.pins` version the close-up derives with */ }
interface CloseupRecord { district: Id /* a district, or the hinterland pseudo-district for the outline close-up's faces (V01 §3.8.9) */; params: CloseupParams;
  since: number /* the seq of the `closeup` event that wrote it: §7.4's independence check refuses its undo while an `instance` event on its blocks with seq > since is live */ }   // the `closeups` digest block (§6.2)
// the `closeup` event (§7.1) carries { district, strategy, params: CloseupParams }; `strategy` is informative (the district's fabric at the event)
// Succession (§6.3): a district succeeded by the anchor rule (a merge or split) carries its CloseupRecord to its anchor successor; the other predecessors'
// records go to the archive, their blocks' overrides re-matched by §8.10 onto the successors' blocks or orphaned and reported
```

### 2.6 The standalone neighbourhood document's recipe

```ts
interface HoodRecipe {   // Recipe.hood (§2.9, item 272); present exactly when Recipe.product = 'hood'
  outline: { template: OutlineTemplateId } | { polygon: PolygonCm /* a drawn outline: simple, ≥ 3 vertices, snapped as §7.1 draws */ } | 'auto' /* by the fabric (V01 §3.10.1 step 1) */;
  size?: 'small'|'medium'|'large' /* the chips: `buildings` ≈ 85, 700, 1 050 (NG's bands) */; areaHa?: number /* absent: from `buildings`, else the kind row's band */;
  buildings?: number /* a building-count target, wins over areaHa (V01 §3.10.1) */;
  kind?: DistrictKind /* absent: drawn from `hood.kinds` */; fabric: FabricStrategyId | 'auto';
  leafy?: boolean /* greenery 0.9 and court greening × 1.5 (NG's `leafy`) */; secular?: boolean /* no landmark anchors, manorBlockShare 0 (NG's `secular`) */;
  contextRung: 'TOWN'|'CITY'|'METROPOLIS' /* whose rung-scaled rows the hood reads; default 'CITY' */;
  intent: DistrictIntent /* wealth, density, planned, greenery …; absent fields derived */;
  edges?: { water?: { bearingCdeg: Cdeg; body: 'river'|'sea'|'canal' }; wall?: { bearingCdeg: Cdeg };
    slope?: { bearingCdeg: Cdeg /* downhill */; pct: number /* the mean fall in percent; default hood.hillsidePct */ } /* T1's hillside edge (V01 §3.10.1 step 2) */ } /* optional context edges */ }
// The layers a standalone neighbourhood document may hold are fixed by V01 §3.10.1 (7) through the inputs its S0 writes.
```

### 2.7 Lifecycle of every state field this volume adds (create · read · persist · regenerate · undo · migrate)

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `District.fabric`, `fabricParams` (base fields written by S7c) | S7c (V01 §3.3) inside S7b (1) at generation; `setAttr` (declared, held, §7.2); a skeleton `quarter` with `fabric` (item 349); a dossier naming claim never sets it | S8's template machine, S7b's reconcile (the land), the panel, the clerk, the S4 (b) classifier, the district naming features | the district's leaf digest (§6.2) | S7c re-runs only on a Re-derive from S7b or earlier, never over an edited path; New random on the district keeps it (the draw is keyed by the district's lineage, V01 §3.12) | the `setAttr`'s undo record restores the former value; the grouped `regenerate`'s undo restores the district | absent reads `'bent-cut'`; an unknown row id falls back by §7.5's table-row migration to `'bent-cut'`, reported |
| `Block.content`, `squareType`, `ringCentre` | S9b (V01 §3.5) | S10a (iii), S10, S10b, S11, S12b, S13a, S14, exports | the block's leaf digest | re-derived with the block by any re-derivation that re-runs S9b for it (from S8, or S10a (i) of its district); a block re-derived from S10 keeps it | the event's undo record | absent → `'ordinary'`, no squareType; a stored `'market'` square type reads `'trading'` (§7.5, item 210) |
| `Block.voidCorner` | S9b for a void square (V01 §3.4.5) | S10's claims-first step | leaf digest | as `content` | undo record | absent → none |
| `Block.overrides` | an `instance` event on a hood pin (V01 §4.1) | the refine derivation's override pass (§8.10's resolution), the reader | leaf digest (hashed with the block) | resolved by §8.10's law at each derivation; a superseded block's rows move to its `supersededBy` successor (§8.10) | the `instance` event's inverse | schema row; an unknown pin kind → the row orphaned, reported |
| `HoodPlace` (square, green, yard, court) | S13a's creation pass (V01 §3.7.1); T11's name tool on an unnamed court, yard or square (minted from the event's seq) | the way-naming context, S13b through its `LabelEntity`, the reader, exports | entity leaf; names in the naming records (§2.8) | succeeded by §6.3's anchor rule with its host; a host that ceases to qualify tombstones it (its name kept in the archive); a user-created place stays while its host face exists; a switch edit to 0 retires every derived one, one raising it makes them again (V01 §3.15) | the event's undo record | registry row; none before M5 |
| `HoodPlace` (opening) | the opening pass (V01 §3.7.1) from a public-opening or catacomb-entrance `AccessPoint`, in every commit V04 §3.10 names that creates, removes or re-kinds one, the underground tail's T6 at generation first | labels, the reader, exports, the pins' clearance | entity leaf | lives as long as its host `AccessPoint` while the local-place step runs (the stage-2 switch > 0): re-derived with it by the same pass in each such commit, tombstoned with it, retired by a switch edit that lowers the switch to 0 and made again by one that raises it (V01 §3.15; V04 §3.10); a closure state on the host changes its symbol, never its name | undone with its host's event, or with the switch edit's | registry row; none before the underground layer |
| `HoodPlace.name`, `.knownTo` | S13a's naming pass; `setAttr` | the knowledge admission (§9.2), labels | naming record; leaf | §6.3's naming cases; an edited value held (§7.2) | undo record | §7.5 |
| `CloseupRecord` | the first `closeup` event on the district (V01 §3.8.6) | the refine derivation (its params); §7.4's independence check (`since`) | the `closeups` block of the model digest | survives any re-derivation of the district (keyed by its address); carried to the anchor successor of a merge or split; a district tombstoned takes it to the archive | the `closeup` event's undo (§7.4's independence check) | `params` schema-versioned; an older `tableVersion` keeps deriving with that version while §6.4's retention window holds it, then migrates to the current and reports |
| `Way.surface` (base field, derived by V01 §3.7.3 unless edited) | S10a's end (V01 §3.7.3) | S14's road programs, the reader, exports, naming | way leaf | re-derived when its fronting blocks' pass-2 band changes, unless the path is edited; a bounding way's surface is inside the re-derived district's seam exception (§7.3 item 1, item 369) | undo record | absent → the rule's value at load |
| `Recipe.hood` | T1 `intend` with `product: 'hood'`, a skeleton file, the API | the unit run's S0–S2 (V01 §3.10) | recipe (canonical) | a Re-derive from S0 re-reads it | a recipe `adjust`'s undo | `Recipe.product` absent → `'town'`; a stored `kind` that is not a `DistrictKind` (`residential`, `manor`, `slum`) → `central`, `central` with wealth 0.9 and planned 0.5, `shanty` with wealth 0.1, reported; an absent `edges.slope` reads flat |
| `District.terrace` | `setAttr` (T8's chip, V01 §4.1); a skeleton `quarter` with `terrace` (item 350) | `terraceState` → S7c, S8's series, the district-edge source (item 302), the elevated-road generator (V06 §3.19.3), the panel, the why provider, naming | the district's leaf | held (a declaration, §7.2); absent re-derives with its inputs | the event's undo record | absent → derived |
| a `RetainingWall` as this volume reads it (its record, lifecycle and state profile item 245's, §2.7; source `generated` by the base's S10–S11 levelling, the ward edge's source included, item 302; `declared` by T3 `retaining` or a T2 terrace stroke's edge) | the base | the seeds' validation (V01 §3.4.2 (d)), the fixed inputs (V01 §3.5.12), the court sites (V01 §3.8.2), the chunk digest (V01 §3.8.3), S14, the exports, the why provider, the dry run's fates | the base's entity leaf — never the step profile | `generated`: with its district's S10 (a replace close-up, New random, §7.3's terrain operator through D); `declared`: held, a fixed input (V01 §3.17.2) | the event's undo | a document without item 110 has none |
| the rim walk's pair — one `esplanade` and one `street_trees` `Greenery` on a sky island's rim strip (base records, item 313) | `plantRimWalk` (V01 §3.10.3 step 4): the unit run, after its districts' S12b; each event that re-lays the strip (V05 §4.2's resize and rim reshape) | S14's green and tree marks, the exports' greenery rows, the reader | the base's entity leaves on the island's arena | re-planted whole by `plantRimWalk` at every unit run and strip re-lay, §6.3's carry-over retiring the old pair in the same batch; never by a district's re-derivation | the calling event's undo record (the pair restored with the strip) | none: the pair lands with the unit run (W8), before any document holds an island (M6-sky) |
| the unit's `Allocation` (standalone) | S7b in the unit run (V01 §3.10.1), less the void part step 6 hands to the underground pseudo-district's `Allocation` (S7b (6) (d)) | S10a | as every `Allocation` | re-derived with S7b | undo record | as §2.5 |
| `hood.constants` (one `settings` row; the `NG` preset's entries among its cells), `squares.quota` | authors (`@plat/tables`) | every rule that cites a key (V01 §3.14); S7b (3) (`squares.quota`) | the table files; a document pins the versions it read (§7.6) | an `editTable` re-derives from the first stage that reads the cell (§7.6) — for the stage-2 switch `fabric.extensionWeight`, from S2 with §6.3's carry-over (V01 §3.15) | `editTable`'s (or `editPreset`'s) undo | §7.6's table-row migration |

Derived and never stored: χ̃ (V01 §3.2), `templateLandM2`, `DistrictContext`, `terraceState`, `stepProfile`, the
under-deck strips as holes (V01 §3.17.3), deck-plot ownership (V01 §3.17.6), `TypedBoundary`, `DistrictSignature`,
`FabricSignature`, the three services' answers, `HoodPin`, the ground `AccessPoint` symbols (V01 §3.8.8),
`WayNamingContext`, `SeamReport` (recomputed with each close-up or re-derivation and written to the generation report),
the close-up's cache chunk (V01 §3.8.3: non-canonical, dropped on mismatch) and every `WhyAnswer` (V01 §4.5). The
`blockLifted` notice is a line of the event's fate report, logged with the event; volume 4 reads it from the log
(V01 §3.9). Every row above is exercised by T-V1-55's round trip (V01 §7).

### 2.8 Identity (§6.3) of what this volume mints

* **Template seed ways** (spines, ring courses, through streets, fans) and **template plazas**: derivation unit = the
  template face's L1 cell (as S8's lanes, §6.3), stage **`S8.seed`** (a registered stage id of its own, item 345, so no
  seed's lineage key can equal a lane's of the same cell), creation index = the seed's ordinal in `TemplateRow.seeds` ×
  64 + its course or segment ordinal — for a contour series' street `f × 32 + (k + 16)`, f its flank (0, or 1 for a
  ravine's second flank) and k ∈ [−15, 15] its level, and for a ravine's thalweg path 0 (V01 §3.4.3; J-V1.64); for a
  `landmark` row's precinct rings the ring's ordinal in σ order (V01 §3.4.4) — so re-laying the same template on the
  same face with the same reroll mints the same lineage and a faithful Regenerate reproduces them. The ward-edge wall's
  identity is the base's district-edge source's (item 302).
* **Blocks** keep §6.3's rule (the cell for S8 blocks); dispatch writes attributes only.
* **HoodPlace** (square, green, yard, court): derivation unit = its host block, stage S13a, creation index = its kind's
  ordinal (square 0, green 1, yard 2, court 3) × 2¹⁶ + the court's ordinal among the block's court residues (courts
  only); anchor = the host face's pole of inaccessibility (§6.3's anchor for area kinds). A user-created place:
  derivation unit = the creating edit event (its `seq`), §6.3's rule for anything a user draws or builds, creation index
  0. **HoodPlace** (opening): derivation unit = its host `AccessPoint`, the underground tail's stage, creation index 0 —
  one place per access.
* **Hood pins**: no address; their draws are keyed by the block (or hinterland face) with the stage component
  `STAGE_VIEW` (§6.1), so no hood-pin draw can alias an S11 decoration draw on `pin.decor`; render key = the block's
  render key and the pin's ordinal (§6.1's decoration rule), so they never re-scatter with zoom; a user `add` takes
  §8.10's user ordinal `u<n>`.
* **`fabric.select`'s key**: V01 §3.12.
* **Unit-run entities**: a standalone neighbourhood document is a town root in its own document — §6.1's fixed town
  lineage with creation index 1 where a town's has 0 (item 340), so a standalone neighbourhood document and a town of one
  seed never share a stream; its district is S6's one seed. A sky island's districts: derivation unit = the island
  (`SkyIsland`, whose arena key the island's minting gives, II.6), stage S6, creation index = the district-partition face
  order (V01 §3.10.3). **The rim walk's pair** (V01 §3.10.3 step 4): derivation unit = the island, stage S12b, creation
  index 0 for the `esplanade` and 1 for the `street_trees` row — one pair per island, which has one rim strip — so a
  re-plant re-mints the same lineage keys, the pair its own batch retires being no collision (§6.3).

## 3 Generation

### 3.1 Where stage 2 enters the pipeline (the stage graph delta, item 280)

```
… S7b Allocation + district claims: (1) the greedy pass ─► [S7c Fabric selection — S7b's allocation hook: eager, town-wide,
       per district in lineage order; each district's fabric and its templateLandM2] ─► (1) the reconcile (capacity less the
       template land, V01 §3.3.7) ─► (2)–(7) ─► SKY (volume 5) ─► S12a …
  ─► S8 Infill (per district): the district's fabric — template seeds in its template face, then §4.6's bent cut on every face;
       context features (V01 §3.6); ring centres marked
  ─► S9 Corridors ─► S10a (i) the field-driving classes and the institutions below a block ─► [S9b Block dispatch — S10a's
       block hook: eager, per district in lineage order; Block.content, square types, void corners] ─► S10a (ii) field pass 2
       ─► S10a (iii) every other class (reads Block.content); the way-surface rule (V01 §3.7.3) at its end
  ─► S10 (0) … pool: S10 (void-corner claims; whole-block manor joins) ─► S10b ─► S11 (square centrepieces) ─► S12b (green and
       yard blocks; court greening)
  ─► S12c ─► S13a: (a) the local places' creation pass (V01 §3.7.1) ─► (b) way names with their naming context (V01 §3.7.2) and
       district names with their naming features (V01 §3.7.4) ─► (c) the local places' naming pass ─► S14
  the underground tail (volume 4), after its systems and accesses: the opening pass (V01 §3.7.1)
  lazy, per district, by §4.1's trigger policy: the refine close-up (V01 §3.8), and the outline close-up over any area (V01 §3.8.9) —
       in the derivation pool, or the generation worker when the pool is off; never in the tile worker (§8.9)
  units: a standalone neighbourhood document runs this pipeline on its own outline (V01 §3.10.1); each sky island's districts run it on
       the island's arena as a unit beside the hinterland unit, from the island's unit inputs (V01 §3.10.3); after generation
       inside the commit of a raise, a late declaration or New random on the island (V01 §3.10.3 (6))
```

**Registration.** S7c and S9b are **stage hooks**: registrations of `@plat/hood` in §4.12's `StrategyRegistry` at the two
hook points the base declares (item 323): `S7b.afterGreedy` — S7b (1) calls its hooks between its greedy pass and its
reconcile — and `S10a.afterDrivers` — S10a calls its hooks between step (i) and step (ii). A hook declares its read-set
and write-set; the host stage's declared inputs and outputs are its own united with its hooks', so §4.1's invalidation
and §7.3's scoped re-derivation see every input a hook reads, and T-V1-35 holds each hook to its declaration. Each hook
keeps its own stage id (`S7c`, `S9b`) as the stage component of its stream keys (§6.1). Both write records only (no plat
batch) and are eager (§4.1's laziness contract: their output decides content).

| hook | reads (declared inputs) | writes |
|---|---|---|
| S7c (`S7b.afterGreedy`) | S7b (1)'s greedy `Allocation` rows (in-transaction); `districts` (kind, intent, identity, seams, the `fabric` path's edited mark); `seams`; `ways` (S4 arterials, S5 secondaries: classes, trade weights); `tradeFlow`; `reservations` (S3); `terrain`; `field.pass1` and `fieldBands`; the shade sampler's pass-1 mask (item 102) — on a sky unit the island's `shadeSky` (V05 §3.11 (4)) instead; `roster.classes` (σ, families, sectors, powers, siting profiles); `powers` and `Institution.powers`; the supply edges and goods (items 103, 105; for the allocation-level links); the dossier's ladder and chain records (V01 §1b); `skyUnitInput` (a sky unit only); the tables `hood.templates` and `hood.constants` | `district.fabric`, `district.fabricParams`; `templateLand` (in-transaction to S7b's reconcile, never persisted) |
| S9b (`S10a.afterDrivers`) | `blocks` (areas, frontages, interiors, `ringCentre`); the L2 junction index; `ways` (classes, tiers); `districts` (kind, `fabric`, `fabricParams`, intent, identity, provisional band range); `reservations` (S3, S7, S7b; §4.8 forecourts) and `reservations.landing` (item 282); `allocations`, `allocations.landing` (item 213) and S10a (i)'s placements; `field.pass1` and `fieldBands`; the blocks' manifested band (in a re-derivation); item 71's class mix and the designation templates; §4.9's greenery rows; the siting families and class profiles (V11 §2.3–§2.4); the shade sampler's mask, each live island's `shadeBasis` and the unlevelled `terrain` (S1's raster with the T2 strokes; V01 §3.5.3's tie-break reads it too), from which the strips onto the ground are computed at this first read and held (V05 §3.19 (6)) — on a sky unit the island's `shadeSky` in place of the mask and the strips; the neighbouring districts' pass-1 band; the dossier's ladder records; volume 4's catacomb sources and entrances (a re-derivation); locks, pins, assignments; the tables `squares.quota`, `hood.dispatch`, `hood.squares`, `hood.constants` | `block.content`, `block.squareType`, `block.voidCorner` |

With `@plat/hood` absent (M1–M4b) neither hook exists: every district is `bent-cut` and every block `ordinary`, the
base's behaviour exactly. SKY (V05 §3.1) runs after S7b, S7c included; S7c, inside S7b, reads none of SKY's outputs (a
landing claim is a hole S8 cuts around, V01 §3.4.1). The village product registers neither hook (V07 J-V7.24): stage 2
runs at the base rungs only (V01 §3.18's rung table).

### 3.2 The provisional character χ̃ — item 72's vector before anything is placed

Item 72's character vector (§4.5 (2)) is derived from placed plots, so it exists only after S12c — too late to choose a
district's fabric (S8) or type its blocks (S9b). The allocation, however, is eager and complete at S7b (1)'s greedy
pass. **χ̃(D) is §4.5 (2)'s function evaluated with the allocation rows as the instances** (J-V1.1; §4.5, item 294) —
S7c reads it over the greedy pass's rows, every later reader over the committed rows:

* each row `(cls, band, count)` stands for `count` instances of `cls`; a household row for `count` residential instances
  of the residential family; each instance's significance is §4.5 (1)'s σ with **size = 1** (no footprint exists yet)
  and rank and patronage as §4.5 (1) reads them (the dossier's where the row carries a dossier element);
* (1) plot mix, (2) political alignment (with §4.5 (7)'s partition at the current applied standings) and (4) economic
  role are computed exactly as §4.5 (2) states over these instances;
* (3) trade position: the district's frontage is the length of every way chain on the boundary or inside its L1 faces at
  S7c (the S4 arterials and S5 secondaries, on part 0 only — V01 §2.3's parts table; each side of a chain counted once,
  for the district that owns that side), × the way's trade weight (§4.3's `TradeFlow`), over the town's largest such
  sum; `tradeBearingCdeg` as §4.5 (2);
* (5) relations: `mainRoad` the share of that frontage on `through` and `primary` ways; `anchors` from the S3 and S7b
  reservations as §4.5 (2) reads institutions, with contribution `c` = **the district's share, by count, of the anchor's
  allocation-level suppliers** — for each supply edge of the anchor's class, S7b (1)'s district supply term (item 105
  (g)) binds the anchor's allocation to the nearest district, by centroid distance, whose allocation holds the provider
  class (a sky pseudo-district at its island's land centroid's world point, V05 §3.20 (12) (b)); `c` is the share of
  those bindings that land in D. The placed vector keeps §4.5 (2)'s plot-level `c`.

χ̃ is draw-free, never stored, recomputed on demand from eager records, and equal on every host. Its **provisional
identity** is §4.5 (4)'s identity rule applied to χ̃ (the row it would take, source `emergent`, `dominant` or `plain`, or
the dossier's where the district is dossier-defined — a QUARTER ladder record included, V01 §3.5.12). Readers: S7c's
weights (V01 §3.3), S9b's square-type split (V01 §3.5.3), a replace dry run's ghost for the district it re-derives
(V01 §3.9), the fabric why provider (V01 §4.5). Every other reader — the hood-pin identity factors, the panel, the
title's subtitle — reads the placed vector S12c writes. A district whose allocation holds no instance has the zero plot
mix, no anchors and no identity row (source `plain`); its weights read every mix, sector and identity term as 0 (V01
§3.18). **Check (T-V1-2):** on B-CITY, (a) χ̃'s plot-mix shares lie within 0.08 (half the L1 distance) of the placed
vector's for ≥ 90 % of districts; (b) χ̃ over the greedy and over the reconciled allocation lie within 0.08 of each other
for ≥ 95 % of districts; *fallback* for (a): size = the class's median footprint over its median plot (§4.7 S11's
templates at the band) instead of 1, and the check repeats; for (b), V01 §3.3.7's.

### 3.3 S7c Fabric selection — the character drives the layout

#### 3.3.1 The step

For each district D, in lineage order, on the generation worker, as S7b (1)'s allocation hook:
1. If D's `fabric` path is **edited** (a `setAttr`, held as a declaration, §7.2) or set by a declaration read ahead (a
   skeleton's `quarter` with its `fabric`, §4.1, item 349): keep it, compute its `templateLandM2`, and go to the next
   district.
2. If D's kind is `hinterland`, or D lies on the underground arena (`underground`, `undercity`): `bent-cut` (the
   hinterland has its own recipe, §4.9; underground close-ups never take a replace fabric, II.1). Next. (A sky island's
   districts run this step inside their unit run, V01 §3.10.3.)
3. Build `DistrictContext(D)` (V01 §2.3) on the pre-claim template face (V01 §3.3.2) and χ̃(D) over the greedy allocation
   (V01 §3.2).
4. The **eligible set** E = `bent-cut` ∪ every `hood.templates` row whose `requires` holds on the context (V01 §3.3.2).
5. Each row r ∈ E gets its **weight** (V01 §3.3.3); `bent-cut` gets `1 − 0.5 × intent.planned`.
6. One uniform u on `fabric.select` (V01 §3.3.4) picks the row by cumulative weight in table row order.
7. Write `D.fabric = r.id` and `D.fabricParams` = r's `params` defaults (V01 §3.4.7). Per-district draws of a template's
   parameters happen in S8 on `hood.template`, not here.
8. Compute `templateLandM2(D, r)` (V01 §3.3.7) and hand it to S7b's reconcile.
9. Report (`stage2.fabric`): D, E with each weight, the choice, the land.

A town with no district S7c may lay (every district hinterland or underground) writes nothing and reports nothing; a
town of one district runs the step once. The weights of E always sum above 0: `bent-cut`'s is at least 0.5, so step 6
always picks a row.

#### 3.3.2 Eligibility (`TemplateRequirement` on `DistrictContext`)

At S7c the claims of S7b (3) are not yet cut, so the **pre-claim template face** is D's largest L1 face that is neither
a wall strip, an S3 reservation, an intramural garden (item 106 (b)) nor another district's; `templateFaceAreaM2` is its
area less the expected area of the claims the greedy allocation gives D (every claim counted against this face — the
conservative reading); `inscribedRadiusM` and `faceObb` are the pre-claim face's. S8 re-tests the requirement on the
committed template face (V01 §3.4.1), a failure there being F-TEMPLATE's under the land cap (V01 §3.3.7, §3.13). Every
factor below is a `hood.constants` cell (its key in brackets; V01 §3.14).

| requirement | holds when (metres from the context) |
|---|---|
| `minFaceAreaM2Law: 'ring'` | `inscribedRadiusM ≥ 2.5 × eLo + w_tpl` [`elig.ringELo`] (one ring course with a band outside it and a centre inside it; `w_tpl` V01 §3.4.2 (b), at its band's upper end for this test) |
| `minFaceAreaM2Law: 'plaza'` | `templateFaceAreaM2 ≥ 6 ×` the plaza's area [`elig.plazaFaceMult`] (V01 §3.4.5 (a)) **and** `inscribedRadiusM ≥` the plaza's half-diagonal + `eLo` |
| `minFaceAreaM2Law: 'spine'` | `faceObb.minorM ≥ 2 × eLo + w_tpl` and `faceObb.majorM ≥ 3 × eHi` [`elig.spineEHi`] |
| `portals: n` | at least n usable portals (V01 §3.4.2 (a)) on the template face's boundary |
| `waterShare`, `wallShare` | that seam type's share of D's boundary length ≥ the value, and its longest run ≥ 3 × `eHi` [`elig.runEHi`]; `wall` counts only walled stretches — `full` and `parapet` runs, an `enceinte` closure arc (an earlier ring's curtain) among them; a closure-only arc of any other barrier kind types by its barrier and never counts (II.1's seam typing, item 541; item 106 (a), (c), (f)) |
| `noIntervallum` | the enceinte beside D has no intervallum (§4.8's era row) or the run is a `parapet` stretch |
| `landmarkSigma` | a reservation inside the template face whose class σ ≥ the value (the base's `character.anchorSigma`, §4.5, by default) |
| `bridgePortal` | a portal at a bridge's landward end lies on the template face's boundary |
| `slopeMeanPct` | `slope.meanPct ≥` the value |
| `crossingPairs` | two usable portal pairs whose chords cross inside the template face at ≥ 45° [`elig.crossAngleDeg`] (the anchors `pair:1`, `pair:2`, V01 §3.4.2 (a)) |
| `arenas` | D's arena is listed (every row lists `ground`; `sky` for all but `quay`, `wallside`, `bridgehead`) |

A district with no template face (every L1 face a wall strip, a reservation or an intramural garden, or a zero-area
face) has E = {`bent-cut`}; a requirement whose context value is absent (no water, no wall, no portal, no reservation)
fails.

#### 3.3.3 The weights (in-town)

`w_r = select.base × κ(D) × Π_terms (1 + gain × value) × (1 + plannedGain × intent.planned) × fabric.extensionWeight`,
with **`κ(D)` = `select.kind[D.kind]`**, 1 when absent — for a `sky-*` kind its ground counterpart's (V05 §2.4):
`sky-temple` reads `temple`, `sky-palace` `castle`, `sky-island` the town's richest ground kind (the kind of the ground
district with the highest pass-1 mean value, ties by address), `sky-prison` and `sky-tower` none (1) — and
`fabric.extensionWeight` is `hood.constants`' stage-2 switch (V01 §3.14, §3.15; 1 in the default preset, **0 in the
`MFCG` and `FTG` parity presets**, §7.6 — so the parity presets lay every district with the bent cut, the M4 output — and
1 under `NG`, whose `ng.fabric` replaces this product by the four NG rows' `select.ngOdds`, each kept only when eligible,
every other row 0). A `stepped` row's weight is further × `min(2, slope.meanPct ÷ 8) × (1 + terrace.askGain × asks)` —
`asks` 1 when D's `terrace.asks` holds (V01 §2.3), `terrace.askGain` ours, `extension` — so a hill town's steep wards take
Terraces more often while every other row is unchanged (a terraced ward may still be organic: hill towns mix stair-lanes
with contour streets). Two terms read file g: every row with `plannedGain > 0` carries `{ of: 'shade', gain: −0.5 }` on
`shade.meanShare` — a quarter in shadow is less often laid out as a planned square, ring or main street (item 102 (a),
(d); ours, `extension`) — and the `street` row carries `{ of: 'chain', gain: 1 }`, 1 when an incompatible chain of D's
context runs `alongWay` a tier-1 way through D, so the stretched road becomes D's main street (item 104 (h) (3) as
revised). S7c never names or assigns a quarter: a quarter name arises only through item 72's identity rows past their
threshold or a dossier or author declaration (item 107 (e)), and a street's trade name through `WayNamingContext.trade`
(V01 §3.7.2). Default rows (ours, provenance `own`, calibratable; J-V1.4):

| row | base | kind factors | character terms (gain) | planned gain | requires |
|---|---|---|---|---|---|
| `bent-cut` | 1.0 | — | — | (−0.5, above) | always |
| `street` | 0.25 | market 1.5, gate 2, craft 1.2 | mainRoad 2; chain 1; shade −0.5 | 1 | spine law; portals 2 |
| `square` | 0.10 | market 3, central 2 | trade 1; shade −0.5 | 1.5 | plaza law |
| `ring` | 0.05 | — | shade −0.5 | 3 | ring law |
| `quay` | 0.8 | docks 2, riverbank 1.5 | sectors.trade 1 | 0 | spine law; waterShare 0.2 |
| `wallside` | 0.4 | gate 1.5 | shade −0.5 | 0.5 | spine law; wallShare 0.2; noIntervallum |
| `crossroads` | 0.3 | market 2, central 1.5 | trade 2; shade −0.5 | 1 | plaza law; portals 4; crossingPairs |
| `landmark` | 0.6 | temple 2, castle 1.5 | identity religious 1; shade −0.5 | 0.5 | ring law; landmarkSigma `character.anchorSigma` |
| `bridgehead` | 0.5 | riverbank 1.5 | trade 1 | 0 | plaza law; bridgePortal |
| `stepped` | 0.5 | — | — | 0 | spine law; slopeMeanPct 8 |
| `park` | 0.02 | park 40 | shade −0.5 | 1 | plaza law (green mode) |

The `stepped` row's 8 % threshold is its `slopeMeanPct` cell above, the one home §3.6 (8) cites. **Confirmation (M5,
B-CITY):** the share of districts not `bent-cut` lies in 15–35 % at CITY in the default preset (realism: most medieval
districts are organic; the named morphologies are the exceptions that make quarters legible), and S4 (b)'s classifier
(V01 §7) separates the templates at ≥ 90 %. *Pre-decided fallback:* all non-`bent-cut` bases scale by one common factor
to bring the share to 25 %, a declared shift; if the classifier fails, the failing pair's weaker row's base halves and its
seeds' distinguishing parameter (ring count floor 2; the street's control offset 0.2) is raised, and the classifier
re-runs.

#### 3.3.4 The draw

One uniform on `fabric.select`, keyed as V01 §3.12 states (the district's own lineage key with the reroll component
forced to 0): a New random on D never re-draws its fabric — "same kind, new seed" (II.4) keeps the layout kind — and
neither a declared quarter, a merge or split elsewhere, nor a Re-derive that renumbers S6's seed order moves another
district's draw. Nothing else in the town moves when one district's weights change.

#### 3.3.5 A standalone neighbourhood document's `auto` (NG's odds)

For `HoodRecipe.fabric = 'auto'` (V01 §3.10.1) the weights emulate NG 1.2.2's random-template odds among the four NG
rows: `bent-cut` 0.7, `street` 0.3, `square` 0.1, `ring` 0.1 (`select.ngOdds`; provenance `ref:NG 1.2.2 random template
weights (code)`; `code-neighbourhood.md` §2.0), each kept only when eligible, and a context row (`quay` with a water edge,
`wallside` with a wall edge) joins at its in-town weight × `auto.contextFactor` — in the default preset; under the `NG`
preset (`ng.fabric` on, V01 §3.15) only the four NG rows. The draw is on `blueprint.features` (V01 §3.10.1). `bent-cut`
is always eligible, so the draw always has a row.

#### 3.3.6 Epochs — the `hood.fabric` participant (volume 6)

`@plat/hood` registers `{ id: 'hood.fabric', step: 'afterGrowth', order: 40, stage: S9b, run }` (the order volume 6's
participant table gives it, after the underground's participants at 10–30) as volume 6's `EpochParticipant` (V06 §2.1;
§4.12's `StrategyRegistry`). A new growth stage's S5–S13 run (volume 6's step 14) carries both hooks, so a district that
stage creates gets its fabric inside its S7b and its new blocks their content inside its S10a. The participant covers
what that run does not:
(1) a district the epoch created outside S7b's hook (a face added to the hinterland and typed a district by the epoch's
growth decision) takes S7c's rule;
(2) every block in `EpochScope.recut` (V06 §2.1) — the blocks a rung-3 op of the epoch's ladder (step 11) re-cut or
redeveloped — is re-typed by S9b's rule (rungs 1–2 keep a block's content and enter no scope);
(3) the districts a raised part in the epoch's `scope.raised` crosses (V06 §3.19): their derived readings
(`DistrictContext`, the template face with the strip a hole, V01 §3.17.3 (2)) are recomputed on read and their close-up
chunks marked stale (V01 §3.8.4), so the hood pins re-derive over the **committed plot set** — the participant writes no
op for them, **no plot removal and no re-homing**: at an epoch the plots and households under a new strip are volume 6's
clearing and its commit's operator (V06 §3.19 (7)–(8); V01 §3.17.4), which run in its `raisedWays` step before this
participant, its households through the engine's ledger and `siting`;
(4) nothing else: a surviving district keeps its fabric and a standing square, green or manor block its content, as
every survivor keeps its geometry.
Its inputs are the epoch's new faces and due blocks (`EpochContext.doc`), `scope.recut` for (2) and `scope.raised` for
(3) (`EpochContext.scope()`, V06 §2.1); its outputs `setAttr` ops of `district.fabric`, `block.content` and
`block.squareType` in `EpochOps.ops`, drawn on `ctx.stream(S7c | S9b, entity)` (`epoch.transform`). An epoch with no new
face, no due block, an empty `scope.recut` and an empty `scope.raised` makes the participant write nothing. Item 102
(e)'s shade drift reaches it through the field it reads at the epoch; a newly shaded quarter's new blocks read the new
shade, its standing blocks never re-type. The epoch's undo is its one event's (§7.4's epoch row), the participant's ops
included; a saved and reloaded document replays them from the log.

#### 3.3.7 The template's land and the reconcile

`templateLandM2(D, r)`, the built land r's seeds take from D, is the sum over r's seeds on S7c's context (each factor a
`hood.constants` cell, `land.*`):
* **plaza** (carved or green): its `A` (V01 §3.4.5 (a)) at D's greedy inhabitants; a **void** plaza likewise its `A`
  (its corner claims);
* **spine** — the expected course length × `w_top`, the `secondary` class's band top (the width law's maximum,
  V01 §3.4.2 (b)); the length: a main or cross spine `land.spineFactor` × `faceObb.majorM`; a parallel spine the longest
  run of its seam type on the face (at most `faceObb.majorM`); a contour series `⌈e_fall ÷ s⌉ × faceObb.majorM`,
  `e_fall` the template face's width along `slope.fallCdeg` and `s` its `terraceSpacingM` (V01 §3.4.3), plus, when
  V01 §3.4.3's two-flank test holds on the pre-claim face, the thalweg path's length (the face's extent along its valley
  line) × the `path` class's width; a through street `faceObb.majorM` less the plaza's long side;
* **ring** — Σ_k 2π r_k × `w_top` over the expected series (V01 §3.4.4 with u at 0.5 and the spacing factor at the
  bell's mean): the rings with `r_k + eLo + w_top / 2 ≤ inscribedRadiusM − eLo`; a `landmark` row's precinct rings their
  courses' lengths × `w_top` (V01 §3.4.4 (3): each qualifying reservation's outline offset by `dBar + w_tpl / 2`), up to
  `landmark.maxRings`;
* **fan** — the row's most portals × ½ `faceObb.minorM` × the fan's class width;
* `bent-cut` — 0.

**The reconcile.** S7b (1)'s bounded reconcile (≤ 3 rounds, its own; §4.5, item 294) runs with each district's capacity
per band equal to its pass-1 built land — less the under-deck strips inside it, plus the capacity of the deck plots it
owns (V01 §3.17.4, §3.17.6) — less its expected dispatch land (V01 §3.5.9) less `templateLandM2`, the template land taken
from the bands in proportion to their built-land shares in the template face. The households the reduced capacity cannot
hold move, in S7b's declared order, to the first district whose capacity holds them — households are the reconcile's
movable tail; institutions and workplaces never move for a template. A capacity the subtraction would take below 0 is 0
(the district then holds only its institutions and workplaces, its households moved). Nothing else about S7b changes.

**S8 honours the reservation.** The plaza's `A` is capped at the plaza land reserved (the reconciled inhabitants can only
lower it); a ring series ends when its laid corridor area would pass the ring land reserved × (1 + `land.ringSlack`); a
contour series ends likewise at the series land reserved × (1 + `land.ringSlack`), the one series slack; a spine is laid
by its law (its clip to the face can only shorten it). A row whose requirement fails on the committed template face (a
claim moved it) bends by F-TEMPLATE, and a substitute row is taken only when its `templateLandM2` on the committed face
is at most the land reserved, else the chain continues to `bent-cut` — keyed, never re-drawn (V01 §3.13).

**The draw is made once**, on the greedy χ̃ (J-V1.38). T-V1-12 reports the households unplaced per template class, with a
stress fixture that forces each class to 100 % of the districts in turn. *Pre-decided fallbacks:* if T-V1-12 fails, the
spine factor rises to 1.25 and the ring slack falls to 0, re-measured; if T-V1-2 (b) fails (the reconcile moved enough
households to change a district's character), the reconcile's re-homing is replaced by one re-run of S7b (1)'s greedy
pass on the reduced capacities — the same stream, the fabric choices kept.

#### 3.3.8 The kinds and their layouts (S4 (a))

Which rows suit which district kind — the kind factors of V01 §3.3.3 made explicit, and the rows T-V1-6 counts. Any
eligible row may still be drawn by the weights; the table names the rows a kind is expected to offer. A kind without a
row here (a registration's new kind) offers every eligible row at κ = 1.

| district kind | the rows it offers | note |
|---|---|---|
| market | `square`, `crossroads`, `street` | its market is its reservation (item 24); the template frames it |
| central | `square`, `crossroads` | |
| gate | `street`, `wallside` | |
| docks | `quay` | |
| riverbank | `quay` (`plotRow`: NG's planned "river bank"), `bridgehead` | NG-VC-3 |
| temple, castle | `landmark` | the ring round the precinct |
| craft, sprawl, suburb | `street` | |
| park | `park` — a green-mode plaza sized by §4.9's parks row with a fan of 2–4 paths | NG-VC-3's planned "park" |
| shanty | `bent-cut` only | informal fabric (item 70); its only row is NG's `area` |
| hinterland, underground, undercity | excluded | their own recipes (§4.9, II.7): S7c never lays them (V01 §3.3.1 step 2) |
| the sky kinds (`sky-island` and the institution rows', V05 §2.4) | excluded from T-V1-6 | an island's districts are drawn in its unit run with volume 5's `fabricHint` (V01 §3.10.3) |

### 3.4 The template machine — four NG templates and seven context templates

A template is **seed geometry plus the bent cut on everything else** (NG's own structure, CA-2): its row lists seed
primitives, which S8 lays in the district's template face before §4.6's recursion runs on every face of the district
(§4.6's strategy slot, item 298). No template has a subdivision algorithm of its own.

#### 3.4.1 The template face

D's **template face** is its largest L1 face by area among those that are neither a wall strip, a reservation, an
intramural garden (the spare ground item 106 (b)'s reach encloses, which S12b types as gardens and which is never built
land) nor part of another district, ties by face order (§3.3's canonical order) — S8 reads it on the committed faces,
after S7b (3)'s claims (S7c read the pre-claim face, V01 §3.3.2). The other faces of D take the bent cut alone. Holes in
the template face (S7b's claims, a landing's claim — a sky landing's on an island, a ground landing yard, V05 §3.10 (4)
—, a locked plot's face kept by §7.2's protection in a re-derivation, a fixed input of V01 §3.5.12, and every raised
part's under-deck strip, V01 §3.17.3) stay holes: every seed avoids them (V01 §3.4.2 (d)) — a strip crossed only through
an `open` span (V01 §3.17.3 (3)) — and §4.6's holed laws cut the faces that contain them. An under-deck strip that
crosses a face from boundary to boundary cuts it, and the template face is the largest piece, its area measured without
the strip. A held retaining wall is a line, not a hole (V01 §3.17.2). A committed face that no longer qualifies (every
face a hole, a strip or a zero-area piece) leaves D without a template face: the seeds lay nothing and F-TEMPLATE's
chain ends at `bent-cut` (V01 §3.13).

#### 3.4.2 What every seed primitive shares

**(a) Portals and anchors.** A portal is **usable** when its vertex lies on a chain bounding the template face and its
class is `lane` or above. Its **rank**: `through` 5, `primary` 4, `secondary` and `quay` 3, `lane` 2, others 1; a gate
portal + 2; a bridge portal + 1 — gates and bridges read on part 0 by V01 §2.3's parts table: a part-0 gate (never an
aqueduct's wall arch or a raised gate, V01 §3.17.3 (6)) and a part-0 deck over water; a raised road's ramp or stair end
is an ordinary junction ranked by its carried class, and an aqueduct end is never a portal. **A landing's attach
vertex** — a sky island's (V01 §3.10.3) or a ground landing's S8 destination (§4.6: a `landing` reservation's attach
that no way meets when S8 starts) — ranks as a gate portal (+ 2 on `lane`) and must be reached by a seed or a lane; **on
the ground its destination lane** (§4.6's first cut, from the attach to the nearest way by the lane rule) **is laid before
the seeds**, first in D's S8 transaction, so no seed can pre-empt it, and the seeds then treat it as any spine
(V01 §3.4.2 (c)). Anchors resolve to points: `portal:best` — the pair (a, b) maximising
`(rank_a + rank_b) × min(1, |ab| ÷ (anchor.spanShare × faceObb.majorM))`, ties by portal id; `pair:1`, `pair:2` — the two
usable portal pairs whose chords cross inside the template face at ≥ `elig.crossAngleDeg`, maximising the two pairs'
summed ranks, `pair:1` the higher-ranked, ties by portal ids (the crossroads row's two cross spines); `portal:gate` /
`portal:bridge` — the highest-ranked gate / bridge portal; `axis` — the template face's OBB major axis's two ends projected
onto its boundary (virtual anchors; used when fewer usable portals exist than a spine needs, and in a standalone unit run,
which has none).

**(b) The template street width** `w_tpl`, one per district, drawn once on `hood.template` (creation index 0):
`w_tpl = lerp(tpl.widthLow × top, top, u)` with `top` the upper end of the `secondary` class's width band (§4.6 step 9's
class table), so every draw lands inside the band and none is pinned to its top. It is the row's `streetWidthM`
parameter: the draw is its default, the `secondary` band its range, so T8's "more" edits it like any fabric parameter.
Every seed way (spine, ring course, through street, `secondary` fan) takes `w_tpl` and class `secondary`; a `path` fan
(the `park` row) takes the `path` class's width; NG 1.2.2 likewise gives its template streets one per-map width (II.2,
COV-NG-N20), ours in metres. Lanes the bent cut adds keep §4.6 step 9's law.

**(c) Insertion.** Seeds are inserted in the district's S8 transaction (callback form, L1, §4.1) in row order, each by
`insertChain` of its course clipped to the template face's kerb (§3.7's single kerb function); each end that meets a
spine becomes a T-junction by `splitThrough` (§4.6 step 7) — on a district-boundary spine a `baseLane` portal with its
`SeamAmendment` and the portal-gap slide (§4.6 step 7, II.1 (3)); an end at a hard seam or at a unit's border stops on
the setback or margin line, square to it, as a lane ends at a reservation. A later seed may end on an earlier one.

**(d) Validation**, per seed, on the overlay before its commit: every segment ≥ `minEdge`; every interior turn ≤ 60°;
clearance from the face boundary ≥ `eLo / 2` except within `eLo` of its ends; no crossing of another seed except at a
row's declared crossing or a plaza ring; no contact with a hole (§3.6's contact rule, `attractCm`) except a strip crossed
through an `open` span by V01 §3.17.3 (3); no run within `eLo / 2` of a held retaining wall along more than `eLo` of its
length (a crossing at ≥ 45° is allowed and takes a stair or ramp interval, V01 §3.17.2); every face the seed creates ≥
the band's minimum block width (§4.6 step 8's child test). A failure is F-TEMPLATE's (V01 §3.13); a degenerate course
(zero length after the clip, self-touching, collinear with the kerb) is one such failure, refused by the kernel (§3.1)
before the check.

**(e) The rest.** After the seeds, §4.6 runs on every face of D exactly as on a bent-cut district: stop test, position,
start, corner, far side, flatten, fillet, ends, ladder, width, continuation, recursion; a face with holes by the holed
laws; the deep-interior rule on the resulting blocks. The seeds are spines like any: the bent cut's lanes end on them as
T-junctions, so plots front the seed streets (NG's "plots directly on the main street").

**(f) Draws.** Every seed draw is on `hood.template` keyed by the template face's cell with the seed's creation index
(V01 §2.8) — except the ring courses, which §6.1 already puts on `cut.arc` (II.2) — so each seed has its own sub-stream
and a turned or redrawn seed disturbs no other.

#### 3.4.3 The spine primitive

* **Main and cross spines** (`from`, `to` anchors). The chord A→B; one control point at the chord's midpoint displaced
  perpendicular by `δ = (m3 − ½) × 2 × tpl.courseDelta × |AB|` (`m3` the mean of three uniforms, §6.1's `mean3`); the
  polyline A–c–B resampled into `n = tpl.segMin + ⌊(tpl.segSpan + 1) × u⌋` equal segments (3–7 at the defaults), each
  interior point displaced perpendicular by `(m3 − ½) × ½ ×` the segment length; then, with probability `(n − 1) ÷ n`,
  `4 − ⌊n/2⌋` corner-cutting passes (¼ and ¾ of each edge) — the course shape of NG 1.2.2's main street (provenance
  `ref:NG 1.2.2 main street course (code)`; `code-neighbourhood.md` §2.1), in metres. Each end's last leg is re-aimed to
  arrive at the crossed spine's run within `tpl.arrivalDeg` (a final leg of length ≥ `eLo / 2`, square to the run's
  chord, §4.6's *Sides*) — ours: NG's street ends at its outline, ours at a street, which the T-junction signature needs.
  A cross spine takes `|δ| ≤ tpl.crossDelta × |AB|` (the crossroads read as through-routes). A chord shorter than
  `2 × eHi` lays no spine (the face is below the spine law, V01 §3.3.2) and the row bends by F-TEMPLATE.
* **Parallel spines** (`to: { parallel, offset }`). The longest contiguous run of D's boundary of that seam type (water:
  `water`; wall: `wall`) on the template face; the run's chain offset inward by `onEdge` = the water's unbuildable band
  (§4.2 S1 (8)'s shore setback, or the wall strip's inner setback line) + `w_tpl / 2`, or `plotRow` = that band + `dBar`
  + `w_tpl / 2` (one plot row between the seam and the street, the plots backing onto the water or the wall); clipped to
  the face; its longest piece kept if ≥ `2 × eHi`; one corner-cutting pass. Each end continues by a square leg to the
  nearest way on the face boundary within `2 × eHi` (a T-junction), else stops at the setback line (a reported dead
  end).
* **Contour series** (`parallel: 'contour'`, `series: true`; the `stepped` row; J-V1.60). Level lines of the
  **unlevelled** terrain (marching squares on `Terrain`'s field over the face's box) at `z_k = z_pole + k × Δz`, `z_pole`
  the terrain at the template face's pole of inaccessibility, `Δz = s × slope.meanPct ÷ 100` and `s` the row's
  `terraceSpacingM` (V01 §3.4.7; T8's "more"). Level k's street is its longest component inside the face inset by `eLo`
  (holes excluded), simplified (§3.4 `simplify` at `eLo / 4`), one corner-cutting pass, each end continued to the face
  boundary by a square leg as a parallel spine's is; it is kept when ≥ `2 × eHi`. The series grows outward from k = 0 in
  the order 0, +1, −1, +2, −2, … until a level leaves the face or |k| reaches `terrace.maxLevels` (reported when
  reached); a level that would come within `terrace.minGapShare × s` of the street laid before it on its side (the slope
  steepens) is clipped there, so no block falls below the band's minimum width (V01 §3.4.2 (d)). Level 0 must lay, else
  F-TEMPLATE: rung 1 has nothing to redraw (the series draws nothing), rung 2 offsets level 0 by ± `eLo / 2` along the
  fall (+ first), rung 3 the row's fallback. On flat ground (`slope.meanPct` 0, so `Δz` 0) every level coincides with
  level 0: level 0 alone is laid, as a contour spine without `series`. Each street is a `secondary` way at `w_tpl`
  carrying its `terraceIndex`, its rank from the lowest level laid, 0 (V01 §3.7.2). Without `series` a contour spine is
  level 0 alone. The bent cut then runs on the bands between the streets: its slope term (§4.6 step 1) runs the cross
  lanes down the fall line, V01 §3.6 (3) steps them where steep, and each crossing of a retaining wall is a stair or a
  ramp (V01 §3.17.1 (5)). Creation indices (V01 §2.8): level k of flank f takes the seed's ordinal × 64 + f × 32 + (k +
  16).
* **A ravine's two flanks** (J-V1.64). When the level line at `z_pole` has two or more components each ≥ `2 × eHi`
  inside the inset face, S8 first lays a `path`-class seed of role `thalweg` (creation index the seed's ordinal × 64)
  along the **valley line** — the flow line of greatest accumulation inside the face, from S1's drainage (§4.2 S1),
  clipped to the face, each end continued to the boundary — stair-stepped by V01 §3.6 (3) where steep. The face is split
  along it (`splitThrough`), and each flank face (f = 0 the one holding the template face's pole, f = 1 the other) takes
  its own series, `z_pole` read at its own pole of inaccessibility; a flank below the `spine` law's size (V01 §3.3.2)
  takes none (the bent cut alone). The bent cut's lanes join the thalweg path to each flank's streets, ending on it as on
  any spine. With a **stream** in the ravine the water is a seam, so each flank is its own district, terraced on its own
  by this rule, and no ward-edge wall stands on the water run (hard; item 302). A **generated viaduct** across the
  ravine (item 110 (b), CITY and METROPOLIS) is V01 §3.17.3's strip in each flank face: the thalweg path passes under an
  `open` span, and each level keeps its longest piece beside the strip, as every level keeps its longest component.

#### 3.4.4 The ring primitive (item 58 (a); the courses are II.2's)

II.2 states the ring courses (hexagons sharing one phase, the radial bell of `ringJitter` × the spacing, three
corner-cutting passes to 48 vertices, the spacing law — one growth factor per district, item 543 — the outside-in bands
with a slit first, the staggered radials, the centre rule). This volume fixes the rest:
1. **Centre** `c`: `centroid` — the template face's area centroid when it lies inside the face at ≥ `eLo` from its
   boundary, else its pole of inaccessibility; `landmark` — the centroid of the anchoring reservation: the qualifying one
   (`landmarkSigma`) of highest σ, ties by the larger area, then the id.
2. **Radius budget** `R` = the distance from `c` to the **nearest** point of the template face's boundary, less `eLo`
   (the boundary's inset); with `c` at the pole of inaccessibility this is `inscribedRadiusM − eLo`.
3. **Radii.** `s₁ = eLo + u (R − eLo)` (u on `cut.arc`, creation index 0); `r₁ = s₁ / 2`; **one growth factor per
   district**, `g = 1 + f` with `f` the folded four-uniform bell (§6.1's `bell4`) on `cut.arc` (creation index 1), and
   `s_k = s₁ × g^(k−1)`, `r_k = r_{k−1} + s_k` — NG 1.2.2's geometric law (one factor per map; `code-neighbourhood.md`
   §2.1; J-V1.37). Ring k is laid while its jittered, smoothed course lies wholly inside the face inset by
   `eLo + w_tpl / 2` and the series' laid corridor area stays within the ring land reserved (V01 §3.3.7); the first ring
   that does not fit ends the series (so rings are whole and contiguous from the centre: no clipped ring, NG-GQ-5's
   truncation removed). A budget `R ≤ eLo` lays no ring, and the row bends by F-TEMPLATE. The `landmark` variant lays a
   **precinct ring** round each qualifying reservation in σ order (ties as the anchor's), up to `landmark.maxRings`
   (J-V1.70): its course is the reservation's outline offset outward by `dBar + w_tpl / 2` (the kernel's `insetRing`
   with a negative inset) — one plot row between the precinct and the street round it — with three corner-cutting
   passes (II.2's smoothing), resampled to 48 vertices; only where the outline is round within 10 % (its circularity
   `4πA ÷ P²` ≥ `landmark.roundTol`) is the course a circle of radius the reservation's circumradius + `dBar + w_tpl / 2`.
   A precinct ring is laid when it lies wholly inside the face inset by `eLo + w_tpl / 2` and at ≥ `2 × eLo` from every
   ring already laid; each takes its own fan (2–4 portals, V01 §3.4.6), and a later ring's fan may end on an earlier
   ring. Precinct rings draw nothing.
4. **Width and class** `w_tpl`, `secondary`; each ring a closed chain, one `Way` per ring.
5. **Faces and order.** After the rings, the template face is: the centre face (inside the innermost ring), the annuli
   (each a face with one hole), and the outer band (to the template face's boundary). The bent cut runs outer band
   first, then the annuli from the outside in, then the centre, each band a face of its own (its own cell, so its own
   sub-streams: radials stagger by construction, II.2). A radial end that lands on a ring within the **portal gap** —
   `max(6 m, 2 ×` the wider lane's width) — of an end the other band already made on that ring slides along the ring
   out of the gap toward the side that keeps its arrival within `tpl.arrivalDeg`; neither side does → the cut takes its
   next ladder rung (§4.6 step 7's rule applied to ring spines, so a ring never carries a crossroads). **Through
   radials** (`fabricParams.ringRadials = 1`; NG-GQ-1's option; J-V1.53): each band's first radial after the slit is
   laid as the continuation of the outer band's nearest radial end on the shared ring — the portal-gap rule lifted for
   that one pair, so the ring carries one crossroads per band there; `0` (the default and NG's) staggers as above.
6. **Centre rule.** When §4.6 step 1 stops the centre face as one block, S8 marks the block `ringCentre` and S9b gives
   it a square, a green or a manor block at equal odds among those feasible (V01 §3.5.6); where the district's greenery
   rows allow neither greens nor trees, a square — the innermost ring then encloses a plaza (II.2's plaza loop).

#### 3.4.5 The plaza primitive

**(a) Size.** `A = clamp(SquareRow[type].m2PerInhabitant × inhabitants, SquareRow.minM2, SquareRow.maxShareOfFace ×
templateFaceAreaM2) × fabricParams.plazaScale` (default 1, range 0.5–2) — sized from the people it serves (NG-GQ-7; NG
1.2.2 sizes its plaza by the hood's size tag, which the `NG` preset does through `ng.plazaByTag`, V01 §3.15), rounded to
the lattice, and at S8 at most the plaza land S7c reserved (V01 §3.3.7). A **green**-mode plaza (the `park` row) takes
`A = clamp(parks rate × inhabitants, park.minM2, park.maxShareOfFace × templateFaceAreaM2)`, the parks rate §4.9's row at
D's value, `park.minM2` the row's 0.3 ha floor. A district of 0 inhabitants gets `A = SquareRow.minM2` (or `park.minM2`),
capped by the face share.

**(b) Carved.** Shape: `coin` — a rectangle or a round plaza at even odds on `hood.template` (NG 1.2.2's coin,
provenance `ref:NG 1.2.2 square plaza (code)`); `rect`; `round`. A rectangle has aspect `1 + bell4` when that exceeds
1.2, else 1, its long side along the template face's OBB major axis (ours: a square aligned with the district's grain,
J-V1.5; NG turns it at random); a round plaza is a regular polygon of `max(8, round(2π r ÷ wMin))` sides, `r = √(A ÷ π)`.
**Site:** `centroid` — the template face's pole of inaccessibility when the centroid is nearer than the plaza's
half-diagonal + `eLo` to the boundary, else the centroid; `crossing` — the cross spines' intersection; `bridgeEnd` /
`gate` — the plaza's near side on the portal's boundary kerb, centred on the portal — always on land: a deck's first
frontage plot begins at its abutment and is the deck row's (V01 §3.17.6 (5)). **Fit:** inside the face inset by `eLo`
(the near side excepted for `bridgeEnd` and `gate`) and clear of holes; else the area × 0.8 (≤ 3 times), then the centre
moved toward the pole of inaccessibility in steps of `eLo / 2` (≤ 4); else F-TEMPLATE. **Insertion:** the plaza ring as
one closed L1 chain with the `square` role, owned by a `Reservation` (kind `plaza`, stage S8, §2.5) of D, so S9 types it a
`square` face and its neighbours' kerb edges `square` frontages (§4.7 S9). **Through street** (`through: true`): two
straight spines (`δ = 0`) from the plaza's short sides' midpoints (a round plaza: the axis points) outward along the axis
to the template face's boundary, ending by V01 §3.4.2 (c) — NG's through street, which splits the hood in two (CA-2's two
bisections). **Centrepiece:** S11's furniture step places the plaza's centrepiece by its `SquareRow` (V01 §3.5.10).

**(b′) Green** (`mode: 'green'`, the `park` row). As carved — shape, site, fit — but the ring is owned by a `Reservation`
of kind `park` (stage S8), so S9 types its face `green` and S12b plants it by §4.9's parks row (item 313); its fan paths
arrive at its ring; no centrepiece; its `HoodPlace` is a `green`.

**(c) Void** (`fabricParams.squareVoid = 1`; COV-VG-VN-179, IMPR S4's "keep the square as a void"). Nothing is carved in
S8. S9b picks the **void junction** — among D's junctions inside the template face with ≥ 3 part-0 arms (V01 §2.3), the
one nearest the face's pole of inaccessibility (ties by junction id) — and writes each block with a corner vertex there
`voidCorner = { junction, radiusCm: 1.2 × √(A ÷ π) }`. S10's claims-first step (§4.7 S10 (3)) then claims, in each such
block, the sub-face within that radius of the junction and within `dBar` of the frontage, as residue of kind `square`
(paved, owned by the commons, `road` role, V01 §5.1.2); the block's plots are laid on the rest. The void square is the
corner claims plus the junction's corridor inside the disc; its centrepiece stands at the junction's wedge centroid
(S11). A template face with no junction of ≥ 3 part-0 arms has no void junction: the void square is not made, reported
(F-TEMPLATE's leave-out rung, V01 §3.13).

#### 3.4.6 The fan primitive

From a plaza or a ring to between `portals[0]` and `portals[1]` usable portals not already joined by a seed, taken in rank
order, each new portal's bearing from the anchor ≥ `fan.sepDeg` from every chosen one. Each fan spine is §4.6's two-leg
cut with its start and far side forced: it leaves the anchor's run square at the point nearest the portal's bearing (step
3's rule), turns at a corner drawn by step 4's law (on `hood.template`), and arrives square at the portal's spine (step
5), then step 5's flatten test and step 6's fillet; `w_tpl` and `secondary`, or for a `path` fan the path class and
width. With fewer usable portals than `portals[0]` the fan lays every one there is; with none it lays nothing (the plaza
or ring is reached by the bent cut's lanes), reported.

#### 3.4.7 The rows

| row (card) | seeds, in order | `fabricParams` (default) | fallback |
|---|---|---|---|
| `bent-cut` (Organic; NG `area`) | — | — | — |
| `street` (Main street; NG `street`) | spine main, `portal:best` → `portal:best` | `streetWidthM` | `bent-cut` |
| `square` (Square; NG `square`) | plaza at `centroid`, `carved`, `coin`, type by V01 §3.5.3's rule at the site, `through` | `plazaScale` 1; `squareVoid` 0; `streetWidthM` | `bent-cut` |
| `ring` (Rings; NG `ring`) | ring `centroid`, `law` | `ringJitter` 0.15, `ringPasses` 3 (II.2); `ringRadials` 0; `streetWidthM` | `square`, `bent-cut` |
| `quay` (Quayside) | spine parallel `water`, `onEdge` when D's kind is `docks` or its band ≥ `prosperous`, else `plotRow` (on land; a quay platform's plots are the deck row's, V01 §3.17.6) | `quayOnEdge` by the rule (0 / 1); `streetWidthM` | `street`, `bent-cut` |
| `wallside` (Wall-side) | spine parallel `wall` (walled stretches only), `plotRow` | `streetWidthM` | `bent-cut` |
| `crossroads` (Crossroads) | spine cross `pair:1`; spine cross `pair:2`; plaza at `crossing`, `carved`, `rect`, `crossroads` | `plazaScale` 1; `streetWidthM` | `street`, `bent-cut` |
| `landmark` (Around the church) | ring `landmark`: a precinct ring round each qualifying reservation in σ order, ≤ `landmark.maxRings` (V01 §3.4.4); a fan from each ring, 2–4 portals, `secondary` | `streetWidthM` | `bent-cut` |
| `bridgehead` (Bridgehead) | plaza at `bridgeEnd`, `carved`, `rect`, `bridgehead`; fan from the plaza, 2–3 portals, `secondary` | `plazaScale` 1; `streetWidthM` | `square`, `bent-cut` |
| `stepped` (Terraces) | spine parallel `contour`, `series` — a contour series; over a ravine a thalweg path and a series per flank (V01 §3.4.3) | `streetWidthM`; `terraceSpacingM` (2 × `dBar` + `w_tpl` — two plot rows back to back and their street; range [1.5 × `dBar` + `w_tpl`, 3 × `dBar` + `w_tpl`]) | `bent-cut` |
| `park` (Green) | plaza at `centroid`, `green`, `round`; fan from the plaza, 2–4 portals, `path` | `plazaScale` 1 | `bent-cut` |

The four NG rows emulate NG 1.2.2 (`area` is the base's bent cut; `street`, `square` and `ring` its templates restated
in metres, with II.2's and this section's provenance); the seven context rows are ours (`extension: true`), the templates
NG's creator planned and never shipped (NG-VC-3: junction, park, river bank, bridge, port) together with the base's
context features (II.2's "a quay district gets a quay-parallel street; an intramural district a ring near the wall; a
stepped street on a slope"). **The `square` row's default is `carved`** — NG 1.2.2's own square, read in its code
(J-V1.6; II.2, item 542); `void` is the row's other mode.

#### 3.4.8 Unit runs

In a standalone unit run (V01 §3.10.1) no portal exists: `portal:best` resolves to `axis` — except a `street` hood,
whose main spine is the course S0 drew and built its outline round (V01 §3.10.1 step 1) — so a `ring` hood's radials of
the outer band end on the margin line, and a `bridgehead` or `crossroads` row is never eligible (no bridge portal; fewer
than four portals). In a sky unit run the landings' attach vertices and the deck ends of its laid crossing sites are its
only portals — template portals of kind `landing` and `bridge` (V01 §3.10.3 (4)), never counted in
`SeamReport.portalsTotal` (V01 §3.11 (6)).

### 3.5 S9b Block dispatch — ordinary, manor, square, green and yard blocks

#### 3.5.1 The step

For each district D in lineage order, on the generation worker, as S10a's block hook — **after S10a (i)** has placed the
field-driving classes and the institutions below a block, **before (ii)'s field pass 2** (J-V1.40; §4.7, item 300) —
compute D's three quotas (V01 §3.5.2), then type its blocks in two phases — quota-driven (squares V01 §3.5.3, greens
§3.5.4, manors §3.5.5) and a weighted draw for the remaining small blocks (V01 §3.5.6) — writing `Block.content`,
`Block.squareType` and, for a void square, `Block.voidCorner`. The step runs only while `fabric.extensionWeight` > 0
(V01 §3.15), so in the parity presets every block stays `ordinary`; under `NG` its squares, manors, small blocks and
greens follow V01 §3.15's rules. **Candidate blocks** are D's L2 built blocks whose `interior` is not `wall_strip`,
`reserved`, `green`, `landmark` or `rim_strip` (S8's substitution already typed those, §4.6 step 8 (d)), that are not an
intramural garden (item 106 (b)), that hold no item S10a (i) placed (a field-driving class — a tannery, a midden, a
prison — or an institution below a block, a SIZE record's compound and a GUILD hall among them), and that hold no fixed
input (V01 §3.5.12). Blocks not typed stay `ordinary`; a district with no candidate block types none. Every draw is on
`hood.dispatch` (keys, V01 §3.12). Deck plots (item 110 (d)) are never candidates: they are not blocks (V01 §3.17.6 (2)).

**The band S9b reads per block** is the band §4.7 S10 (2) reads for its geometry rows: at generation the pass-1 field
band (no plot floor exists yet); in every re-derivation over standing plots (an epoch, a replace close-up, a content
edit's scope) the block's **manifested band** (II.3; item 31, J-A31.43) — so a block whose field fell keeps the manor
its standing mansion needs. Quotas stay district-level at D's value. The hood pins' gates read the field band (II.3).

#### 3.5.2 The quotas

* **Inhabitants** `N = Σ` D's allocation household rows × the roster's mean household size at each band.
* **Squares:** `Q_sq = max(0, N ÷ 1 000 × haPer1000(value) × kind[D.kind] × 10 000 − squaresM2)` m², read from
  **`squares.quota`** — the one square quota (§4.7 S9, item 301; J-V1.39), from which S7b (3) already claimed the
  squares larger than a block — with `value` D's pass-1 value (the row interpolated along it) and `squaresM2` every
  square already inside D (V01 §2.3). Default rows: `haPer1000` squalid 0.05, poor 0.05, modest 0.07, comfortable 0.08,
  prosperous 0.10, rich 0.12; kind factors market 1.5, central 1.3, temple 1.2, gate 1.2 (ours; S4 (d)'s band
  0.03–0.15 with median 0.08 is the target over all square sources, §13.7).
* **Greens:** `Q_gr = max(0, G_D − Σ` D's S7b green claims `)`, with `G_D` §4.9's public green for D (the parks row at
  D's band and planned intent, and the `greens` toggle's floor rates), so the part of D's green quota too small for S7b
  to claim (S7b claims only items larger than a block) is met here with whole small blocks.
* **Manors:** `M = min(round(manorBlockShare(band) × N_ord), H_top)` with `N_ord` the candidate blocks whose area lies in
  the manor fit band (V01 §3.5.5) and `H_top` D's allocated households **whose band lies inside D's provisional band
  range** (S7b's reading at the pass-1 mean, §4.5 (5)) and is ≥ `prosperous`, × the class mix's probability (§4.7 S10b,
  item 71) of a `compound`-arrangement class at each band's centre. Default `manorBlockShare`: 0 up to `modest`,
  `comfortable` 0.02, `prosperous` 0.06, `rich` 0.12 (ours; NG 1.2.2's measured manor share 6–11 % of blocks is the
  anchor for the upper bands, `profile-neighbourhood.md` §3.3); 0 for a `secular` standalone recipe (V01 §3.10.1).

A district of 0 inhabitants has every quota 0 and types only by phase 2 (V01 §3.5.6).

#### 3.5.3 Squares

1. **Type split.** Each type t gets a share `q_t ∝ base_t × factor_t(χ̃, context)`: `forecourt` 0.2 × (1 + 2
   mix.religion), only where a church, a temple or a GUILD record's hall (V01 §3.5.12) stands on an S3 or S7b reservation
   touching D **and has no §4.8 forecourt**; `bridgehead` 0.3 when a bridge portal bounds D, else 0; `trading` 0.4 when
   D's kind is `market`, else 0.05 × (1 + sectors.trade); `crossroads` 0.2 × (1 + 2 trade); `well` 0.3. `Q_t = q_t ×
   Q_sq` after normalising the shares. A `trading` square is a small open trading place, never a market: no stalls, no
   market rank, never a market `Reservation`, outside item 24's count and separation (J-V1.44).
2. **Sites.** A block is a candidate for a square when its area is ≤ `min(2 × smallBlockM2, sq.maxM2)` (with
   `smallBlockM2 = eLo² ÷ 2`, NG 1.2.2's small-block rule restated in our block extents; provenance `ref:NG 1.2.2
   small-block rule (code)`) and it is sited for the type. `forecourt` — **at generation** (no plot, building or
   entrance exists yet), only against a landmark on a reservation: the reservation's boundary side on its widest frontage
   way; the candidate block shares that way and its centroid lies within `sq.forecourtM` of that side's midpoint; **in a
   re-derivation**, the landmark's committed main entrance (§2.6) within `sq.forecourtM` and a shared frontage way. A
   church or temple below a block (S10a (i) placed it on a block, no reservation) never takes an S9b forecourt: its
   forecourt is §4.7 S11's `forecourt` yard part. `bridgehead` — a corner within `sq.bridgeM` of a bridge-end junction
   (a part-0 deck over water; V01 §2.3's parts table); `trading` and `crossroads` — a corner at a junction with ≥ 3 arms
   (counted on part 0, a raised road's ramp end a junction of its class; V01 §2.3), one of them tier 1 (`through`,
   `primary`) or two of them tier 2 (`secondary`, `quay`; §8.5's tiers); `well` — a corner at a junction with a tier-1 or
   tier-2 arm. So every typed square stands at a main junction or before a landmark (S4 (c); V01 §7).
3. **Filling.** For each type in the order forecourt, bridgehead, trading, crossroads, well: candidates by score (siting
   distance ascending, then area nearest `Q_t` remaining, then the sunnier block — the lower `shade` at its centroid
   (V01 §3.5.5; item 102 (d)) — then the flatter block, the lower area-weighted mean slope of the unlevelled terrain over
   it (a piazza is a terrace; ours, `extension`), then block id), each taken while `Q_t` remains and its area ≤
   `sq.overTake` × `Q_t` remaining; a type's unmet quota rolls to the next type; the last unmet remainder is reported
   (`stage2.squares.unmet`, F-DISPATCH, V01 §3.13). A taken block: `content: 'square'`, `squareType: t`.
4. **Template plazas** already count in `squaresM2`; a `square` template's plaza takes `trading` when D's kind is
   `market`, `forecourt` when a landmark reservation's widest side faces it (point 2's generation reading), else
   `crossroads` (its through street makes it a junction of tier 2).

#### 3.5.4 Greens

Candidates: blocks of area ≤ `green.maxMedian` × D's median block area, no frontage on a tier-1 part-0 way (V01 §2.3), at
≥ `green.spacingEHi` × `eHi` from every green (S7b's claims, parks, green blocks already typed). Score = `(1 +
intent.greenery) ÷ (1 + d_c ÷ eHi) × siting`, `d_c` the distance to D's pole of inaccessibility (greens sit inward, ours)
and `siting` V01 §3.5.5's push product read with the sensitivity row of D's modal household class (a green's users).
Taken in score order while `Q_gr` remains and the block's area ≤ 1.5 × `Q_gr` remaining: `content: 'green'`.

#### 3.5.5 Manor blocks

The **manor fit band**: block area in `[manor.fitLow, manor.fitHigh] ×` the plot-area budget of the largest `compound`
class the class mix gives nonzero weight at D's upper band (its designation template's size budget, §4.7 S11); a class
mix with no such class gives an empty band, so `M` is 0. Candidates in that band are weighted `prestige × spacing × sun
× siting`:
* **prestige** — §4.7 S10b's prestige rows summed over the block's frontages (a square, a park edge, the waterfront, a
  corner);
* **spacing** — `min(1, d_m ÷ (manor.spacingEHi × eHi))`, `d_m` the distance to the nearest manor block or landmark
  reservation: a spacing *weight*, never a floor (NG 1.2.2 spaces its manors by a multiplicative distance weight,
  provenance `ref:NG 1.2.2 manor spacing (code)`; II.3, item 544);
* **sun** — `1 − manor.sunWeight × shade(centroid)` (ours, `extension`), `shade(x)` item 102's daylight shade share at
  x: the pass-1 sampler's terrain and wall mask OR-ed with every live island's strip onto the ground (V05 §2.3a) — the
  strips are evaluated once per shade evaluation (the generation's, a re-derivation's from S10a or earlier, or an
  epoch's, V05 §3.19 (6)) at S9b's first read, by the same pure call field pass 2 makes, and held for it, so no strip is
  computed twice. **On a sky arena** `shade(x)` is volume 5's `shadeSky(x)` on the island's 32 m lattice (V05 §3.11 (4):
  the strips of higher islands onto it, and after an epoch its own buildings), and no sky reader — S7c's `shade` term,
  this factor, the hood pins' gate — reads the ground's pass-1 mask;
* **siting** — `Π (1 − push)` over the blocks S10a (i) filled, `push` the weight of the derived family row
  (`fam/nuisance/<n>/L<level>`, V11 §2.4) for each nuisance n the placed class emits and the compound class is sensitive
  to, when the candidate lies within that row's radius at the emitter's level (block edge to block edge), else 0;
  clamped to [0, 1]; `extension` (item 103 (a)). A row of weight 1 therefore keeps every manor out of its radius.
`M` blocks are drawn without replacement by weight on `hood.dispatch`, keyed by **the district's lineage with the pick
ordinal as the creation index**, weights recomputed after each pick (spacing updated): `content: 'manor'`. When every
remaining candidate weighs 0 the draw stops, the unmet manors reported (F-DISPATCH).

#### 3.5.6 Small blocks and ring centres (phase 2)

Every candidate block still untyped with area ≤ `smallBlockM2` draws its content from the band row's `small` weights
(interpolated along its value, V01 §3.5.1's band): default squalid (0.80 ordinary / 0.20 yard / 0 green), poor (0.70 /
0.25 / 0.05), modest (0.60 / 0.30 / 0.10), comfortable (0.50 / 0.35 / 0.15), prosperous (0.45 / 0.30 / 0.25), rich
(0.40 / 0.25 / 0.35) — ours; NG 1.2.2 empties every small block (its empty blocks are 0–3 % of blocks,
`profile-neighbourhood.md` §3.3; the `NG` preset does, V01 §3.15), calibrated at M5 on the NG panel pairs; the green
weight × V01 §3.5.4's siting product. The draw is on `hood.dispatch` keyed by the block with pick ordinal 0; a `yard`
block's paving (`yardPaved`) draws on the same key with pick ordinal 1. A `ringCentre` block draws among the feasible of
{square (`plain`, or the type its siting gives), green, manor} at equal odds (II.2's centre rule; pick ordinal 0), a
manor feasible only when its area is in the fit band and the class mix allows a compound class, a green only when D's
greenery rows allow greens. Over-quota typing from phase 2 is allowed up to `dispatch.overQuota` × each quota; beyond it
the block stays ordinary.

#### 3.5.7 Courts greened (§4.9, item 313)

S12b plants a block's court residue (§4.7 S10 (6)) as a green with trees with the band's **court-greening**
probability (§4.9's row, item 313, which reads it here), drawn on `greenery` keyed by the block: squalid 0.10, poor 0.20,
modest 0.35, comfortable 0.45, prosperous 0.60, rich 0.80, × (0.5 + D's greenery value), × 1.5 for a `leafy` standalone
recipe, clamped to [0, 1] (ours; II.3's "a target per band" over NG 1.2.2's complete-frontage-ring rule, whose 23–58 % of
ordinary blocks green is the calibration anchor for the modest to comfortable rows, item 58 (b)). The row is `extension`
(0 in the parity presets). A court not
greened stays bare `court` ground. A court residue a `RetainingWall` crosses (a terraced block's rear line,
V01 §3.17.1 (7)) is greened or not by one draw, and a greened one plants every level piece — a terraced garden.

#### 3.5.8 The seam guard (S3)

A block whose frontage on **soft** seams (`way` and `field` runs shared with another district, II.1) is ≥
`guard.softShare` of its frontage is a candidate for `manor` or `green` only when the district across that seam has a
pass-1 band within `guard.bands` of D's at the seam's boundary samples — so a manor or a park never makes a jump across a
soft street (S3's band, §13.7: Δ median frontage ≤ 25 %, Δ plot area ≤ 35 %, Δ storeys ≤ 1). Across a hard seam, or with
no district across (the town's edge, a unit's border), the guard does not apply.

#### 3.5.9 Land in the programme (item 284)

The dispatch takes built land from plots; the programme must plan for it or the population could not stay whole. S2's
land estimate (§4.2 S2) multiplies each band's plot land by `(1 + λ_b)`, `λ_b = sq_b + gr_b + yd_b`: `sq_b` the band's
sub-block share of `squares.quota` over its plot land per 1 000 inhabitants, `gr_b` the sub-block green share of §4.9's
rows at the band, `yd_b` the phase-2 yard and green expectation (the small-block share of blocks at the band,
`land.smallShare`, measured on B-CITY at M5, × its `small.yard + small.green`). S7b (1)'s district capacity subtracts D's
expected dispatch land (`Q_sq + Q_gr` + the yard expectation) and, inside S7b's reconcile, its template land (V01 §3.3.7),
so every household S7b allocates has a plot. A manor block holds one household and its compound; its expected loss of
capacity — the block's row capacity less one — is also subtracted by S7b (1). `λ_b` is 0 without `@plat/hood` and in the
parity presets. **Check (T-V1-12):** on B-CITY, 0 households unplaced because of a dispatched block or a template
(F-SITING's report shows none), per template class. *Fallback:* `λ_b` + 0.05 and re-run; V01 §3.3.7's for the template
land.

#### 3.5.10 What each content does downstream

The rows below are §4.7's S10a, S10, S10b and S11 clauses (item 300) as they read `Block.content`.

| content | S10a | S10 | S10b / S11 | S12b | S13a / S14 |
|---|---|---|---|---|---|
| `ordinary` | by capacity (base) | frontage-first plots (base) | base | base; its court greened by V01 §3.5.7 | base |
| `manor` | one household of D's top band inside D's band range, with that household's own members — servants are members (§10.3); no extra allocation | all residential plots joined into one by §4.7 S10 (7)'s join law (as the cluster row's whole-block join, item 70) | the class mix drawn among `compound` classes only (item 71's weights restricted, renormalised); a compound site plan with its enclosure by its template (§4.7 S11) | yard planting by the compound's rows | base; a manor's name is its house's (§10.4) |
| `square` | capacity 0 | no plots: the block face one L3 residue face of kind `square` (paved, commons) | its centrepiece pin on `pin.centrepiece` by `SquareRow.centrepiece` (defaults: forecourt cross 0.7 / statue 0.3; crossroads market cross 0.5 / well 0.3 / fountain 0.2; bridgehead statue 0.5 / cross 0.5; trading market cross 0.8 / fountain 0.2; well well 0.7 / pump 0.2 / trough 0.1; plain as well), at the face's pole of inaccessibility — skipped where an aqueduct terminal's outlet is the square's centrepiece (V01 §3.17.8); **no stalls** — §4.7's stall rule stays on market reservations only (item 24) | none | a `HoodPlace` (V01 §3.7.1); drawn in the `road` role (V01 §5.1.2) |
| `green` | capacity 0 | one residue face of kind `green` | none | a `green` Greenery on it, owned by the commons, a grove layout by §4.9's park rule for small faces, tree density by the band's greenery; §4.9's parks row admits it at any size (item 313) | a `HoodPlace`; drawn as a green |
| `yard` | capacity 0 | one residue face of kind `yard_common`: paved with probability `yardPaved` (poor 0.7 → rich 0.4), else grassed | no model pin (its hood pins are the close-up's) | grassed: yard planting | a `HoodPlace` (`local`) |

**A manor with no household (F-DISPATCH's revert rung).** After S10a (ii) re-homes the households outside D's band
range (§4.5 (5)), a `manor` block whose district holds no household of the block's band range reverts to `ordinary`,
reported (`stage2.dispatch.manorReverted`); it is never left empty.

#### 3.5.11 Epochs (volume 6)

The `hood.fabric` participant (V01 §3.3.6) runs S9b's rule on the blocks an epoch creates outside a growth run's S10a
hook and on due blocks rung 3 redevelops; a re-cut block keeps its content otherwise, and a standing square, green or
manor block is a survivor.

#### 3.5.12 Fixed inputs, ladder records and catacomb sources

**Fixed inputs.** S9b never types a fixed input's block `square`, `green`, `manor` or `yard`, and a re-derivation (a
replace close-up, a content edit's scope, an epoch) keeps its plot and site (§7.2): (1) a locked, pinned, assigned or
dossier-backed plot; (2) a **SIZE** ladder record's compound (item 108 (a): one larger building or compound by its
template, never typed away); (3) a **GUILD** record's hall; (4) **a catacomb's source cemetery** (the sources volume 4
lists in `UndergroundSystem.sources` under item 109 (k) (2)): a churchyard part's plot (the yard part of a church, temple
or cathedral plot), a separate burial ground's face, a monastery's burial face, a quarry ossuary's surface head, together
with **the plot holding the church that owns a sourcing churchyard** and **the plot holding the catacomb's entrance
`AccessPoint`** — an extramural cemetery lies in the hinterland, which S9b never types; (5) **a declared
`RetainingWall`** (source `declared`, held; item 245): a line every re-derivation keeps and every seed respects
(V01 §3.17.2); (6) **a raised part's under-deck strip** with its piers (V01 §3.17.3): a hole no re-derivation plots. At
generation (no plot yet) (2) and (3) are the blocks S10a (i) placed them on, which are not candidates anyway; (4) exists
only in a re-derivation, since volume 4's systems are laid after the ground's plots. A dossier change that removes the
record behind a fixed input — a dossier-backed plot's, a SIZE or GUILD record, a catacomb's source (volume 4's, from
DR32) — releases it at the next re-derivation of its block; a user's lock or pin on it yields to the dossier's removal and
is reported orphaned (§7.7's precedence, items 20, 22; §7.4).

**Ladder records** (item 108; `DistrictContext.records`). A **QUARTER** record whose district is D makes D's identity the
dossier's (item 72 (3); `identitySource: 'dossier'`), which S7c's `identity` term reads like any dossier identity and the
panel and the title show (V01 §4.5, §5.2.1); its members elsewhere keep their own districts. A **GUILD** record's hall
on a reservation is a σ-bearing landmark for S9b's forecourt (V01 §3.5.3). A **COUNT** record's members are ordinary
allocation rows keyed `#k` (DR9, J-A74.73). **No double counting** (item 108 (c)): every member is counted once, in the
district its plot stands in; `membersHere + Σ elsewhere = membersTotal` = the record's count.

### 3.6 Context features (stage-2 feature S2)

Every district gets the feature its context calls for, whatever its fabric; S2 (a)'s coverage matrix (V01 §7) reads
them. The features run in S8's district batch (§4.6's strategy slot, item 298).
1. **Waterfront** (a `water` seam run ≥ `feature.runM`). S8 lays a **bank path** — a `path`-class spine along the shore
   setback's inner line (a parallel spine at `onEdge` with the path's own width, V01 §3.4.3) — when D's kind is `docks`
   or `riverbank` or its band is ≥ `comfortable`, and no noxious water trade (a class whose profile emits water
   pollution, V11 §2.3) is allocated to D, and no quay way already runs along that run; otherwise the **rear-plot water
   rule** holds: plots whose rear line lies within `dBar` of the shore setback extend their rear to it and take a `shore`
   yard part (§4.7 S10 (6)) with the water access edge (realism: working riverbanks keep their plots to the water;
   promenades belong to richer and harbour quarters). A `quay` template's spine satisfies the feature on its run. A
   closure-only water arc (item 106 (a): deep water closing the circuit, no wall) is a `water` run like any.
2. **Wall-side** (a **walled** `wall` run ≥ `feature.runM`: a `full` or `parapet` stretch of the `ChainProfile`, item 106
   (c)). The intervallum where the era row has one and the stretch is `full` (§4.8); otherwise — a `parapet` stretch, or
   an era without intervallum — the base's own rear-plot behaviour: S8's lanes end on the inner setback line, so the
   plots back onto the wall strip — the rear-plot rule S2 (a) counts. A `wallside` template adds the wall street.
3. **Slope.** A `lane`, `alley`, `cul_de_sac` or `path` whose `slopeP95` (§2.4: the unlevelled terrain along its spine,
   never rewritten by S10–S11's levelling, re-sampled by a terrain stroke) exceeds its class's `rampMaxGrade` in volume
   11's `ways.crossing` row (item 110 (a)'s way-class rule: the grade above which a way of that class is a stair rather
   than a ramp) is a **stair-stepped way** — one threshold, stated once (J-V1.72): S14 draws it with step ticks at the
   district band and finer (V01 §5.1.2); the naming context reads its shape `stepped` (V01 §3.7.2). No model field: a
   pure function of the way's slope. A stair-stepped lane may also be carried on vaults beneath (II.7.6's `vaultSlope`
   source, the base's and volume 4's); this volume neither draws nor reads that. A way crossing a `RetainingWall` carries
   a stair or ramp **interval** at the crossing (the base's way-class rule, an attribute of the way, item 110 (a)): it
   never changes the way's `shape`, `slopeP95` or name, and S14 draws it by `way.stair` (V01 §5.1.2).
4. **Bridge approach.** The portal gap (§4.6 step 7) keeps lanes off a bridge end; S9b's `bridgehead` squares and the
   `bridgehead` template read it — a part-0 deck over water (V01 §2.3's parts table). A raised road's ramp or stair end
   takes the portal gap extended over its rise (V01 §3.17.3 (4)).
5. **Gate approach.** The base's gate plaza (§4.8); nothing added. An aqueduct's arch through a curtain wall and a raised
   gate at deck level are wall openings, not gates: no gate portal, no gate plaza and no wall-side feature reads them
   (V01 §3.17.3 (6)).
6. **Sky.** No portals but the landings' attach vertices; the outline's seams are `sky` (hard); the rim strip (volume 5)
   lies along them, and a margin band only where a run has no rim strip (V01 §3.10.3).
7. **Barrier edges** (item 106 (a), (f)). A boundary run on a barrier-closure arc is typed by its barrier kind by II.1's
   seam typing (item 541; J-VI.3's six kinds): an `enceinte` arc — an earlier ring's curtain closing a later circuit — is
   a walled run whose stretch class is that enceinte's, which (2) reads like any. A `cliff` or `marsh` run takes the
   rear-plot rule — the plots back onto its setback line as onto a wall strip — and never a wall street; the panel names
   it ("the cliff is the wall here", the clerk's line, item 106 (g)).
8. **Terraced wards** (item 110 (a)). A district whose `terrace.asks` holds (V01 §2.3) is terraced. Inside it the base's
   S10 and S11 levelling levels each plot to its fronting street, so wherever the contour series or the bent cut's lanes
   run along the contour, each block's two plot rows meet at a rear line that a **base-produced** wall holds once the step
   passes `terrace.stepMinCm` and the slope `terrace.slopeMin` (V11's `terrace` row) — **this volume produces no wall
   there** (one producer per wall line; J-V1.61). Where `slope.meanPct` lies at or above the `stepped` row's
   `slopeMeanPct` cell (V01 §3.3.3) and below 100 × `terrace.slopeMin`, the `stepped` row lays its contour streets, the
   ward takes no edge wall (`walls` is false) and the base walls only those of its levelled units steeper than
   `terrace.slopeMin`: terraced streets standing mostly without retaining walls. Along D's edge the base's district-edge
   source raises the ward-edge wall by its rule (§4.7 S10, item 302); this volume supplies its inputs (`terraceState(D)`,
   `TemplateFabric`'s `terracedEdges`, V01 §3.17.1 (4)). S2 (a)'s coverage matrix gains the row "terraced district × a
   ward-edge wall, or none with its reason (below the slope threshold, no soft backing run, no step)".

A district with no water, wall, slope, bridge or gate run takes none of (1)–(5) and reports nothing; S2 (a)'s matrix
counts only the districts a context applies to.

### 3.7 Local identities — places, street names, surfaces

#### 3.7.1 Named local places (`HoodPlace`)

S13a's **local-place step** is a registration of `@plat/hood` inside S13a in two passes around the way names: **(a) the
creation pass**, before the ways are named, creates or keeps one `HoodPlace` record — kind, host, lineage, no name — for
every block of content `square`, `green` or `yard`; every court residue of area ≥ `court.nameMinM2` — one place per
residue even where a `RetainingWall` crosses it, labelled on its largest level piece (V01 §3.17.1 (7)); and a `square` or
`park` template's or a void square's plaza (hosted by the plaza's reservation block or, for a void, the junction's
largest corner block); **(b)** S13a names the ways, reading these records (V01 §3.7.2); **(c) the naming pass** then names
each place from the naming engine (§10.4, item 444) on `naming` keyed by the place's lineage (V01 §2.8), from
`naming.place`'s rules (V11) conditioned on: the place's kind and `squareType`; its centrepiece pin kind (a square named
for its well, cross or statue); an adjacent landmark (a church's name gives a close, a forecourt a square); the dominant
trade family of the plots fronting it (σ-weighted, ≥ 0.3 share); D's identity row; a proper-name source for courts and
yards (a surname in the possessive) — never a way's name, so the passes have no cycle. Uniqueness is §9.6's, per district
per kind. Its **knowledge** defaults from `hood.placeKnowledge`: `square` and `green` `public`, `court` and `yard` `local`
— so a court's name shows to the public only at the neighbourhood band and finer (§9.2's admission), the owner's "known
only locally" (item 30) given to the places a neighbour would know. A dossier naming claim may name a place (§7.7 item
82); its name is then dossier-owned (DR14). Its `LabelEntity` is kind `place` (§9.1, item 422), `lod` the district and
neighbourhood bands for squares and greens and the neighbourhood band for courts and yards, spine candidates by §9.3's
area rule on its host face. The step is `extension` — it runs only while `fabric.extensionWeight` > 0 (V01 §3.15), so the
parity presets create no places. Its place kind `court` names a **block's court residue** (§4.7 S10 (6)) and nothing else:
a footprint's court — a hole of a footprint face, which S11 types a yard part `court` (§4.7, item 303): a manor's
enclosed court, an `ovalCourt` arena's floor — is never a `HoodPlace`; it is named only as its building's yard part.

**Openings** (item 109 (j) (3) (ii), (k) (2); J-V1.76). The underground tail (volume 4), after its systems and their
`AccessPoint`s are laid, runs this step's **opening pass**, which selects by volume 4's record fields — never by an
access's kind alone, since `mouth` is also the kind of a sewer outfall, a culvert inlet, a quarry's adit end and a
skylight: one `HoodPlace` of kind `opening` (1) per **public opening** — an `AccessPoint` of source `opening` and role
`access` (V04 §3.5.7 (e)), its subtype the access's kind: `sinkhole`, `mouth` (a cave mouth), `collapsed_shaft` or
`ruin_entrance` (II.7.4, item 554); a skylight, a `mouth` of role `light`, makes no place — and (2) per **catacomb
entrance** — an `AccessPoint` of kind `stair`, source `system`, whose `cause.system` is a `catacomb` system (V04 §3.5.1
(9)), a quarry ossuary's stair at its working's surface head included — subtype `catacomb`. No other access makes a
place: a sewer's `mouth` (source `system`, its system the sewer), a quarry's adit, a grating and a neighbourhood or
lifeline stair keep their symbols only (V01 §3.8.8, §5.1.2). A place is named from `naming.place` with the opening's kind
as a feature ("the Sinkhole", "the Old Mouth"), its `knownTo` is the AccessPoint's, and it lives as long as its host while
the step runs (V01 §2.7). **A catacomb entrance** sits only on cemetery ground (item 109 (k) (2); II.7.6, item 560): the
churchyard part of a church, temple or cathedral plot — never inside the footprint of a church-class building (V03
§3.7.1's class) —, a separate burial ground's face, a monastery's burial face, an extramural cemetery's face in the
hinterland, or, at CITY and METROPOLIS only, a quarry ossuary's surface head (its working's shaft and stair, V04 §3.5.1
(9)); its place draws no name of its own but carries its catacomb's (volume 4's label rule), and its knowledge is the
AccessPoint's. **No crypt gets a place or a pin**, the cathedral's included: a crypt is `Basement.crypt`, a basement fact
(V03 §3.7.4; §2.6, item 238; J-VI.17 H33), and a crypt joined to a catacomb by a (3b) link adds no second entrance. A
building's dug access (a cellar stair, a shaft, a well that broke through, (j) (3) (i)) gets no place: hosted by the
building or its basement it draws no surface symbol — the building's plan draws its head (V03 §3.7.2 (5)) — and opening
in a yard it is a symbol on its plot (V01 §3.8.8). An unexcavated void puts nothing on the surface. A town with no
underground layer (the layer off) runs no opening pass and has no opening place.

**A place made by hand.** T11's name tool on an unnamed court residue, yard or square creates its `HoodPlace` with the
typed name: a `setAttr(name)` on a new place minted from the event's `seq` (V01 §2.8); its lifecycle row and undo are
`HoodPlace`'s (V01 §2.7).

#### 3.7.2 Local street names — the way-naming context (item 444)

S13a names every way (§4.10); this volume fixes what the grammar is conditioned on, so a lane's name says what is on it.
For each way S13a builds a `WayNamingContext` (V01 §2.3): `shape` — `ring` for a ring course, `stepped` for a
stair-stepped way (V01 §3.6 (3)), `curved` when a fillet arc spans ≥ `name.curvedShare` of its length, `bent` when it
keeps a corner of ≥ `name.bentDeg`, else `straight`; `to` — the kind of the node or place it leads to (a gate, a market,
a bridge, a church's forecourt, the castle, the harbour, a named square or well), read from `Way.from` / `Way.to` and the
`HoodPlace` records at its ends (created by the creation pass before the ways are named, V01 §3.7.1); `landmark` — a
reservation of σ ≥ 5 within `name.landmarkM` of its frontage; `trade` — the class family of ≥ `name.tradeShare` of the
σ-weighted uses fronting it (§4.5 (1)) — the way a chain's street takes its trade's name, never a quarter (items 104 (h)
(3), 107 (e)); `band` — the band of its fronting plots; `districtIdentity`; `water`; `slopePct`; `placeOnIt`;
`terraceIndex` for a contour street (V01 §3.4.3), on which V11's `naming.way` rows may guard "Upper / Middle / Lower
Terrace" by weight. Ways are read by V01 §2.3's parts table: a raised road takes `shape`, `to`, `landmark` and `raised`
(its kind, for `naming.way`'s guard) only, its kind word the base's; an aqueduct takes no context. A crossing's stair or
ramp interval never changes `shape` (V01 §3.6 (3)), so retaining walls cause no name shift (V01 §8.1). The grammar's rows
(volume 11) guard on these features with weights — a street to the gate for its gate, a lane of tanners for its trade, a
crooked lane for its shape, a stair-stepped alley as steps, a row for a straight lane of one terrace, a proper name
otherwise — so no feature is a strict priority, and two lanes of one trade in one district get distinct names by §9.6's
uniqueness. The context is derived at S13a from eager records, so names stay eager model data (§4.10). The features land
at M1 (V01 §8.1); the squares and places S9b and S13a add at M5 give some ways a new `to` or `placeOnIt`, a declared M5
shift of those ways' names (V01 §8.1, §13.3's shift record). A way with no feature (no destination, landmark, trade or
place) takes a proper name.

#### 3.7.3 Way surfaces (item 207)

At S10a's end, after field pass 2, every way without an edited `surface` takes the `way.surface` table's value for its
class, the era row and the band of its **fronting blocks** (the area-weighted pass-2 value of the blocks whose frontages
lie on it, both sides). Default rows (ours): `through`, `primary` — `paved` (setts) at `comfortable` and above in eras
from the high medieval, else `cobble`; `secondary` — `cobble` at `modest` and above, else `dirt`; `lane`, `alley`,
`cul_de_sac` — `cobble` at `comfortable` and above, else `dirt`; `track`, `path` — `dirt`; `quay` — `paved`; `pier` —
`planks`; `bridge` — `paved` for a stone bridge, `planks` for a timber one (`Bridge.kind`, §2.7); `ford` — `dirt`. A way
with no fronting block (a way through the hinterland, a ford) reads the row at the pass-2 value at its midpoint. A raised
road has no fronting blocks, so it takes the base's value from its record (masonry `paved`, timber `planks`, by its
material row, volume 11's `raisedWays.structure`), never this rule; an aqueduct has no surface (V01 §2.3's parts table).
The `hatched` family's road programs read the surface (V01 §5.1.2); the `MFCG` preset draws none of it. An epoch
re-derives surfaces on ways whose fronting band changes past the hysteresis (§4.5), run by V06 §3.4 (9) as the `field`
phase's last act, an edited `surface` kept and a `setAttr` (cause `rule:field`) written where the value changes. A way
bounding a re-derived district reads both sides, so its surface and its naming record belong to that district's seam
exception (§7.3 item 1, item 369): a replace dry run lists each shared way whose surface or name changes among its fates.

#### 3.7.4 The district's naming features (item 444)

§10.4's district naming (V11's `naming.district`) reads, beside its existing features, the neighbourhood's own: `fabric`
(the `hood.templates` row), `hasManorBlock`, `hasGreenBlock`, `ringCentre` (`square` | `green` | `manor`, the ring
centre's content), `terraced` (D's `terrace.asks`, V01 §2.3) and `small` (D's area below the lower third of the town's
district areas; for a standalone neighbourhood document, the `small` chip). V11's rows guard on them with weights, never
as a strict priority — a rings district may be named for its rings, a square district for its square, as Neighbourhood
names a hood by its template (NG D1) — and T-V1-24 checks name–feature consistency.

### 3.8 The refine close-up — what opening a district derives

#### 3.8.1 Trigger

§4.1's policy: under `elaborate: 'click'`, a click on a district (at the city or district band) derives its close-up and
raises its buildings' `wings` rung (II.4); a click on a building at these bands is this click, which also selects the
building and opens its panel without deriving its rooms or plan (V03 §4.5; V02 §3.11); under `'view'`, every district
with a visible tile at the neighbourhood band derives its close-up within V01 §6's budget; the outline close-up
(V01 §3.8.9) derives those of the districts and hinterland faces an outline meets **and raises the `wings` rung of every
building inside the outline, centre-out from the outline's centroid**, as a district click does (V02 §3.11's trigger) — a
cemetery chapel, a mill, the hinterland's farmsteads. The derivation runs in the derivation pool (or the generation worker
with the pool off), never in the tile worker, and delivers its marks as a `DisplayDelta` of group D (§8.9). Opening,
closing or reopening any number of districts leaves the model digest unchanged (II.5).

#### 3.8.2 The neighbourhood-tier pins (`HoodPin`; II.3, item 58 (c))

For each block of D in lineage order (and, in an outline close-up, each hinterland face in face order), each site drawing
on its own stream — `pin.decor` keyed by the block with the stage component `STAGE_VIEW` (§6.1) and the site's ordinal as
the pick ordinal — in the order gate, kind, size, angle:
1. **Sites**, in order: `court` — the block's court residues (residue order); `plotYard` — its plots' yard parts of kind
   `yard`, `garden`, `court` (a footprint's court, item 303 — except the floor of a building whose `MassingRef.family` is
   `ovalCourt`, an arena's floor, which takes no pin), `forecourt` or `churchyard` of area ≥ `pin.siteMinM2` (plots in
   address order, parts in order); `yardBlock`, `square` — for a `yard` or `square` block, four edge sites (its face's OBB
   corners inset `pin.edgeInsetM`) and, when no model centrepiece stands there, its pole; `green` — for a `green` block,
   its pole and the two next clearance maxima of §3.8's `spine` reader; in the hinterland, `cemetery` (a cemetery or
   burial-ground land-use face: its pole and four edge sites), `fieldEdge` (a field's two corners nearest a way) and
   `outsideYard` (an outside plot's yard parts ≥ `pin.siteMinM2`). A site's **point** is its face's pole of
   inaccessibility (the spine summit), else the next clearance maximum. A court residue a `RetainingWall` crosses is read
   as one site per level piece (the pieces its wall lines cut it into), each with its own pole, pieces below
   `pin.siteMinM2` dropped; no site lies on a deck plot or in an under-deck strip (V01 §3.17.3, §3.17.6). A block with no
   site derives no pin.
2. **Prior picks.** Before a block's first site, every model pin already in the block — §4.7 S11's decoration rows, a
   square's centrepiece, a singleton — counts as a prior pick of its kind (its decay applied, step 4); a kind S11 treats
   as a per-district singleton (bandstand, statue, monument) that stands in D as a model pin is removed from D's hood
   rows. An aqueduct terminal's outlet in or fronting a square counts as a prior pick of kind fountain there
   (V01 §3.17.8).
3. **Gate.** For the site, each `HoodPinRow` r listing its site kind gives `p_r = gate_r(band) × siteFactor × pinGate ×
   identity_r × (1 + shadeGain_r × shade(site))` — the band at the site's plot or block, interpolated (the field band,
   II.3); `siteFactor` 1 for `square`, `yardBlock` and `green` sites and `pin.courtFactor` for `court`, `plotYard` and
   the hinterland sites (J-V1.43); the identity factor from D's placed identity row; `shade(site)` item 102's share at the
   site (V01 §3.5.5; on a sky arena volume 5's `shadeSky` there, never the ground's mask) — so fountains and bandstands
   favour the sunlit squares. The site draws u and holds a pin when `u < min(pin.cap, 1 − Π_r (1 − p_r))`.
4. **Kind.** A pin's kind is a weighted pick over the rows with nonzero `p_r`, each weight `r.weight × decay_r`, where
   `decay_r` is II.3's decay (`ref:NG 1.2.2 pin decay (code)`, P20), its scope `pin.decayScope`: the block by default, the district under the `NG` preset, NG's
   per-map reading, V01 §3.15), so one block rarely repeats a kind.
5. **Placement.** Size `lerp(sizeM, u)`; the pin stands at the site's point when its disc (size ÷ 2 + `clearanceM`)
   clears every footprint, every entrance reserve (below), every model pin's disc, every **drawn** ground-access symbol's
   disc (V01 §3.8.8 — only an access on a ground face outside every footprint draws one; a building-hosted access lies in
   a footprint already cleared: size ÷ 2 + the pin row's `clearanceM` — no well lands on a catacomb stair in a
   churchyard), every hood pin already placed, every way corridor, every raised-way pier footprint and under-deck strip
   (V01 §3.17.3 (5)) and every retaining-wall line (its half-width + the row's `clearanceM`); else at the site's next
   clearance maximum; else no pin (counted in the close-up's debug report only). Angle: the host face's OBB axis + 90° ×
   ⌊2u⌋. **The entrance reserve** (J-V1.75, J-V1.96). Outside each building's main entrance, and each `side`, `rear`,
   `yard` or `service` entrance (§2.6's roles; a concealed use's door among them, whose rectangle is never drawn), a
   rectangle on the entrance's footprint side at its `offsetCm`, outward — the base's eager `Entrance` records (§2.6,
   item 241), never the lazy composition — `widthM[1]` wide and `depthM[1]` deep of volume 2's porch kind rows (V02 §3.7,
   `composition.json`: for a main entrance the largest over the `PorchKindRow`s with `outside` true, for a side, rear,
   yard or service entrance the `hood` row's, the secondary porch's kind), so the reserve stands from M5 at the porches'
   own sizes before the composer draws any porch; where the building's `Basement.access` is `external`, the main
   entrance's rectangle again, outward from the footprint side nearest the point `basementDoor(b)` gives (V03 §3.7.1;
   §2.6, item 578), centred on that point's projection onto that side — none where `basementDoor(b)` is null (the base's
   trapdoor fallback, which draws no outside stair); and, for each `AccessPoint` hosted by a building with neither a
   basement nor `ground(b)` (V03 §3.3), whose head volume 3 opens as an outside door at `stackAccessDoor(b, a)` (V03
   §3.7.2 (1)), the `hood` row's rectangle outward from the footprint side on which `stackAccessDoor(b, a)` lies, centred
   on its `at` — a `well` access there opens at the well pin it stands over (V04 §3.5.7 (d)) and takes no reserve
   rectangle, and a building on a deck hosts no head (V03 §3.7.2 (0)–(1)). Both door points are V03 §3.7.1's shared door
   helper's (E-29): pure, draw-free, of eager records, in `@plat/plots` from M3a. The reserve holds the porch, the
   secondary porch, the stoop (V03 O1 (e)), the outside basement stair's steps and the stack access's outside door
   whichever rungs have been derived, so the close-up stays a pure function of committed state in any order of click,
   `wings` rung and plan (T-V1-26 measures it; *fallback*: the reserve's depth doubled, re-measured). From M6-U a church's
   crypt clause may move `basementDoor(b)`'s point once, the reserve with it — declared in M6-U's shift record (item 238).
6. **Overrides** (V01 §3.8.5) are applied last.

Default rows (ours, calibratable; `extension: true`, the parity presets zero them; the gates below are the `square`,
`yardBlock` and `green` sites', × `pin.courtFactor` at `court`, `plotYard` and hinterland sites): well (court, plotYard,
yardBlock, square, cemetery; gate 0.35 at `poor` falling to 0.10 at `rich` — 0.07 → 0.02 in a court), pump (plotYard,
yardBlock; 0.15 → 0.05), trough (square, yardBlock, fieldEdge; 0.10), fountain (square, court; 0.02 → 0.30; `shadeGain`
−0.5), large tree (court, plotYard, yardBlock, green, cemetery, fieldEdge; 0.10 → 0.35, × (0.5 + greenery)), statue
(square, court; 0 → 0.10), monument (square, cemetery; 0.05), bandstand (green, square; 0 below `prosperous`, 0.05;
`shadeGain` −0.5), cross (square, cemetery, fieldEdge; 0.05, × 3 for a religious identity), shrine (court, plotYard,
fieldEdge; 0.05, × 2 for a religious identity). The underground rows are volume 4's, which ships none (V04 §1.3,
J-V4.97), so an underground close-up draws no hood pins; the `sky` arena reads the ground rows. **Check (T-V1-31):**
pins per 100 buildings per kind and template within 3 × NG's for the default preset and within NG's band under the `NG`
preset; *fallback*: `pin.courtFactor` scales all court and yard gates by one factor to meet the ceiling.

#### 3.8.3 The cache

The derived content (`HoodPin`s and nothing else — the close-up's names, squares, greens and places are eager model data;
the ground `AccessPoint` symbols are drawn from the model) is one elaboration chunk of rung `closeup` per district, and one
per hinterland L1 face an outline close-up opens (§2.9), keyed by it and its **inputs digest**: the leaf digests of its
blocks, plots, yard parts, court residues, model pins, ground `AccessPoint`s (building-hosted ones included) and
buildings' footprints, `Entrance` records, `Basement.access`, `basementDoor(b)`'s value, each stack-hosted access's
`stackAccessDoor(b, a)` value and whether each has `ground(b)` (the entrance reserve, V01 §3.8.2 step 5), the
`PorchKindRow` slice of `composition.json` the reserve reads (cited as the `hood.pins` slice is, §7.6), every
`RetainingWall`, raised strip and pier inside or on D's faces, the deck plots D owns with their buildings (V01 §3.17.2 (3),
§3.17.6), its `CloseupRecord` (or the default params), the `hood.pins` slice cited (§7.6) and every `Block.overrides` it
holds. At most `closeup.chunkKB` per district; counted in §12.8's elaboration cache line and evicted by its LRU to
`absent` (nothing is lost: the content is a pure function). A chunk whose inputs digest mismatches on read is dropped
and re-derived; a district with no pin stores an empty chunk.

#### 3.8.4 Staleness and re-derivation

A batch that changes any input sets the district's `closeup` record `stale` (§2.8), with the change marker at the city
band (§8.5); the cached pins stay on view until the next click re-derives them — from committed state, never from the
cache (§4.1) — and a `stale` close-up opened under `'view'` re-derives on its tile request. Re-derivation is the pure
function of V01 §3.8.2 over the new state; there is no canonical prior to carry, because the only authored content is
`Block.overrides`, which V01 §3.8.5 re-applies. Undo, redo, a load and a regenerate each change inputs and so mark the
chunk stale by this rule; none writes the chunk.

#### 3.8.5 Overrides

An `instance` event on a hood pin (V01 §4.1) writes §2.7's uniform override row on its block (`Block.overrides`); its op,
ordinal (`hood:<n>` for a generated pin, `u<n>` for an `add`, §8.10's user ordinals) and style (`InstanceStyle`, with the
`pinKind` item 421 adds, so a `restyle` can turn a well into a fountain and an `add` names its kind) are the event's.
Resolution is §8.10's law, unchanged: by ordinal while the block's lineage is unchanged and the ordinal's generated
position lies within 0.5 × the spacing of the recorded point; otherwise by position to the nearest unclaimed generated pin
of the same kind within 0.5 × the spacing; else orphaned and reported — with a hood pin's **spacing** defined as
`2 × clearanceM + sizeM[1]` of its row (§8.10, item 421), and a superseded block's rows moving to its `supersededBy`
successor. A saved document reloads its overrides with its blocks; an undone `instance` event removes its row, a redo
restores it.

#### 3.8.6 Persistence (LC-18, J-P23)

The first **hood-pin edit** inside a close-up — an `instance` event on one of its hood pins, or a change of its params —
is preceded by a `closeup` event (§7.1) that writes the district's `CloseupRecord` (params and table version) into the
`closeups` block of the model digest (II.4). A later `closeup` event on the same district replaces the params (its undo
restores the former record). Every other close-up element is a base entity, edited as one with no `closeup` event (II.4
and §7.1's edit-target row, items 545, 272): a lane's name, a plot, a building, a square's centrepiece (a model pin), a
place's name. A document with no `closeups` block (no hood-pin edit ever made) derives every close-up at the default
params.

#### 3.8.7 Frame and surroundings (S2 (c))

Opening a district frames the view by §9.5's framing rule restricted to D's footprints and the decks D owns
(V01 §3.17.6 (4); an outline close-up: to the outline); the neighbours draw their base marks at the neighbourhood band
to the frame's edge, never cut (§8.6), under the style's optional `closeup.vignette` (`none` default, `fade`, `plateau` —
NG's raised patch on paper) (V01 §5.1.5). A district with no footprint frames to its boundary.

#### 3.8.8 Underground, sky, and the ground access symbols

An underground district opens as a refine close-up with no hood pins (V01 §3.8.2). A sky district opens like a ground one
on its island's arena. Neither changes the ground.

**Ground access symbols** (J-V1.74). Every ground `AccessPoint` of the underground layer whose `ground.host` is a
**ground face** — a corridor, square, yard or outside face, a catacomb entrance's burial face included — in the opened
area, and whose `ground.at` lies outside every footprint, is drawn at `ground.at` as a symbol in the `hatched` pins slot
(V01 §5.1.3 slot 10): a grating, a neighbourhood or lifeline stair, a sinkhole, a cave mouth, a sewer outfall's or
culvert's mouth, a collapsed shaft, a ruin entrance, a catacomb entrance, and a cellar stair, shaft, ladder, hatch or
broken-through well that opens in a yard — sized by its **symbol kind** (`access.<accessSymbolKind>M`) and drawn in the
form §8.2's access `states` row gives its state — its stored `state` (`locked` with a bar; `bricked` filled solid in
`wall`, the landfall's closure and a host's closure included, V04 §3.10) or, while its element is closed, the derived
reading (sealed → `bricked`; collapsed as a trace with rubble stipple; II.7.4, II.6; J-V1.93). An access whose
`ground.host` is a building or its basement (a cellar stair, a basement's ladder or hatch, a shaft dug from a cellar), or
whose `ground.at` falls inside a footprint (a catacomb stair headed in a cemetery chapel, V04 §3.5.1 (9)), draws **no
surface symbol**: its roof covers it at the neighbourhood band, and at the building band the building's plan draws its
head (V03 §3.7.2 (5), §3.7.3, §5.1; a `secret` head by §5.4) — one mark per access. An arch vault's `door` is the base's
drawing of the vault's infill and takes no symbol. §9.2's admission filters each drawn symbol by its `knownTo` — a yard's
access (`local`) at the neighbourhood band for a public key; a `secret` one only at the building band, to a key holding
the secret. An unexcavated void has no `AccessPoint`, so it puts nothing on the surface (item 109 (j) (2)). The symbols
are drawn from the model (never stored in the chunk), and the hood pins clear the drawn symbols' discs (V01 §3.8.2 step
5).

**The symbol key** (J-V1.100). A symbol is keyed by its access's **symbol kind**, not its kind, since a catacomb entrance
is an `AccessPoint` of kind `stair` (V04 §3.5.1 (9)) that draws its own symbol:
```ts
type AccessSymbolKind = Exclude<AccessPoint['kind'], 'door'> | 'catacomb';
declare function accessSymbolKind(a: AccessPoint): AccessSymbolKind;   // @plat/hood; derived, never stored
```
`accessSymbolKind(a)` is `'catacomb'` for a catacomb entrance (V01 §3.7.1's selection (2): kind `stair`, source `system`,
its `cause.system` a `catacomb` system), else `a.kind`. Its values are the base's `AccessPoint.kind` as item 554 extends
it, less `door` — an arch vault's infill, which draws no symbol and is never passed to it — plus `catacomb`: twelve,
`stair`, `ladder`, `hatch`, `shaft`, `well`, `cellar_stair`, `grating`, `mouth`, `sinkhole`, `collapsed_shaft`,
`ruin_entrance`, `catacomb`. It keys the drawing V01 §5.1.2 gives each symbol and its size column
`access.<accessSymbolKind>M` (V01 §3.14); `hood.constants`' `access.*M` columns equal this set, held by T-V1-4's registry
test (not by a `TotalityRule`, V01 §3.14), so the enum and the columns change together in one change.

#### 3.8.9 The outline close-up (§16 M5's "arbitrary boundary"; J-V1.45)

A **view action, no event, no model change**: the user draws a rectangle or a lasso, or picks a named site from the
reader's `sites` query (a cemetery, a quarry, a mill, a catacomb's source, a shrine), and the view derives the refine
close-up of every district the outline meets and, for its part outside every district, of the hinterland
pseudo-district's L1 faces inside it, raises the `wings` rung of every building inside the outline, centre-out from the
outline's centroid (V01 §3.8.1; V02 §3.11), then frames the view to the outline (V01 §3.8.7). The hinterland's close-up
is chunked per L1 face (V01 §3.8.3) and uses the `ground` rows whose sites are `cemetery`, `fieldEdge` and `outsideYard`;
a hood-pin edit there takes a `closeup` event on the hinterland pseudo-district (one `CloseupRecord`). The unit run is not
used — the ground has a base. So an extramural cemetery with its catacomb entrance (the METROPOLIS Cemetery network's
grounds first, item 109 (k) (2)), a quarry ossuary beside the town, a field shrine or a mill yard can be seen and dressed
at the neighbourhood band. An outline over a harbour opens the decks it meets with their owning districts
(V01 §3.17.6 (4)). A `quarter` declaration (V01 §3.10.4) stays the way to make a new district. A degenerate outline (fewer
than three distinct points, zero area, self-crossing lasso) opens nothing and says so in one line; an outline over no
district and no hinterland face (open water, off the map) opens nothing.

### 3.9 The replace close-up — choosing another layout for a district

Choosing a card other than the district's fabric is a **model edit** (II.4, item 545): one undo group of `setAttr(D.fabric,
r)` (and any `setAttr(D.fabricParams.k, v)`) followed by `regenerate({ ids: [D] }, 'keep')`. Its **effective scope** is
§7.3 item 1's district scope from S8 — D's faces from S8 down (tree scoping), with the seam exception (II.4) covering the
`surface` and naming record of D's bounding ways (item 369) — plus S10a (i) and S9b for D's blocks, S10a's distribution
for D (D's `Allocation` unchanged, so no other district's content moves), S10–S12b for D, the town-wide S12c (derived,
draw-free) and S13a within the scope — **plus the cross-arena consequences volumes 4 and 5 declare for a ground edit**:
V04 §4.3's ground-edit row and V05 §4.3's island re-read, cited, never restated, which the oracle predicts from those rows.
**Fixed inputs** (§7.2): locked, pinned, assigned and dossier-backed entities in D (a sky island's institution released
for one event only, by a re-searched claim, V01 §3.10.3 (6) (c)), and V01 §3.5.12's — a SIZE record's compound, a GUILD
hall, a catacomb's source cemetery with the plot of the church that owns a sourcing churchyard and the plot of its
entrance, a declared retaining wall (a line) and an under-deck strip (V01 §3.17.2–§3.17.3): their faces stay and the
template lays around them as holes (V01 §3.4.1), and S9b never types them away (J-V1.46). The dry run (§7.1) runs the
whole re-derivation on the overlay and returns: the ghost of the new ways and blocks (`live.ghost`, §8.2) with the count
badge (plots, households, buildings); the fate report (kept, carried, orphaned); the renames of case (4) (§7.3 item 4),
each shared way whose surface or name changes among them; each generated retaining wall added, removed or moved and each
declared wall kept (V01 §3.17.2 (4)); as information, each wall of a neighbouring district whose derived step changes by
≥ `terrace.profileNoticeCm` — "the terrace wall above Mill Lane is now 1.2 m higher" (V01 §3.11 (7)); when the template
fell back (V01 §3.13), its bend in one line ("Rings did not fit this district's shape; laid as a square instead"); and
**for a stagnant catacomb** (item 109 (k) (5)) whose extent lies under a plot the fates demolish or clear, the
`blockLifted` notice — `{ system, plots, cause: the event's seq }` — which volume 4 reads from the logged fate report to
resume the catacomb's growth by least disruption; and, with the underground or the sky on, the cross-arena fates of those
rows. Its successions go to `SeamReport.superseded` (II.1 (4)). Its budget is V01 §6's. A card equal to the district's
fabric is the refine close-up, no edit; a card not eligible on the committed face bends to its fallback chain with its
one line (V01 §3.13), never refused.

**A targeted edit of a catacomb's source** — retyping the churchyard's plot, demolishing the church that owns a sourcing
churchyard, turning a burial ground into houses — is allowed (item 22's least disruption; item 101 R2): its dry run lists
the source's closure among the fates and names the closed source in one line (V04 §3.5.1 (8): the complex frozen — no
growth, `fill` unchanged, every gallery kept): "The catacombs under St Anne's churchyard stop growing; their galleries
stay", since a catacomb never shrinks (item 109 (k) (4)–(5)). A refine close-up emits no notice and moves nothing.

### 3.10 The unit run — a close-up with no base under it (II.1 (5), II.6)

A request whose boundary has no committed fabric (`laid` empty) runs the pipeline itself as a **unit** on its own arena:
its own overlay, no other writer on that arena, merged in lineage order (§4.1's unit sense, item 280). Its request carries
no `seam`, `context`, `params` or `closeup` (V01 §2.4): the runner builds each unit district's `DistrictContext` and
`SeamContract` once its partition exists — after S6 from the `HoodRecipe` (standalone), after V01 §3.10.3's step 2 from
the island's unit inputs (sky) — and returns the districts it made in partition order (`NeighbourhoodResult.districts`).
Two callers exist at generation; V01 §3.10.3 (6) names those after it.

#### 3.10.1 The standalone neighbourhood document (`Recipe.product = 'hood'`)

The one-click standalone neighbourhood document (IMPROVEMENTS S6, NG-UX-1). Its recipe is `Recipe.hood` (V01 §2.6).
1. **S0.** Resolve the recipe, drawing on `blueprint.features` (appended after S0's existing draws, §6.1) in this order:
   * **the kind** when absent — `hood.kinds` weights over `DistrictKind` values only: central 0.25, craft 0.25, market
     0.15, temple 0.15, riverbank 0.05 (with a river edge only), docks 0.05 (with a sea or canal edge only), gate 0.05
     (with a wall edge only), shanty 0.05 (only when `intent.wealth ≤ 0.2`); rows a recipe does not admit drop out and the
     rest renormalise. Wealth is the slider's, never a kind: T1's "great houses" card is any kind at `intent.wealth` 0.9
     with `planned` 0.5, its "slum" card `shanty` at wealth 0.1; the title's identity stays item 72's derived one.
   * **the size** — the `size` chip sets `buildings` to about 85, 700 or 1 050 (NG C8's small, medium and large bands);
     else `buildings`; else `areaHa`; else uniform in the kind row's `areaHa` band (defaults 6–20 ha; shanty 4–12). A
     `buildings` target sets `areaHa = buildings × plotArea(band) ÷ 0.62 ÷ 10 000` (0.62, §4.2 S2's dense-core plot
     share).
   * **the fabric** when `auto` (V01 §3.3.5).
   * **the outline** — a drawn polygon as given; a named template as given; `'auto'` **by the fabric** (NG B1: the
     outline belongs to the template; J-V1.42): `bent-cut` → `star`; `ring` → `star_round`; `street` → `street_strip`,
     whose main-street course S0 draws first and S8 then lays as the main spine; `square` → `plaza_frame`; a context row →
     the kind row's `outline` weights (default `star` 0.6, `disc` 0.15, `lozenge` 0.1, `d_shape` 0.1, `spindle` 0.05;
     `crescent` only by request). The rows are V01 §3.10.2's, scaled to the area.
   * **the tags** — `leafy`: greenery 0.9 and court greening × 1.5; `secular`: no landmark anchors and `manorBlockShare` 0
     (NG's two tags).
2. **S1.** The arena's frame: the outline's box + `hood.frameMargin` a side. Flat terrain at datum 0 (NG is flat) unless
   `edges.slope` is given: then S1 lays a plane tilted at `pct` along the bearing plus S0's `rolling` fBm amplitude (§4.2
   S1 (1)), and the hood's relief class reads `hilly` when `pct ≥ 100 × terrace.slopeMin`, else `rolling`, so
   `terraceState` and the base's walls follow; a `pct` outside [0, `hood.hillsideMaxPct`] is clamped, with its one-line
   bend. **Choosing Terraces with no slope** (T1's Terraces card, or `fabric: 'stepped'`) sets `edges.slope` to
   `hood.hillsidePct` falling toward the outward normal of the outline's longest side (for an `auto` outline, the side of
   the outline S0 drew), named in one line ("laid on a hillside falling south, so the terraces have a slope to climb"), so
   the card always lays its contour series and is never bent to organic for want of slope (J-V1.71). With `edges.water`,
   the boundary run of the outline whose outward normal lies within ± `hood.edgeDeg` of the bearing becomes a shore: for a
   `sea` or `canal` body the L0 water face fills the frame beyond it (§4.2 S1 (2)'s routine, a straight base curve along
   the run); for a `river` a channel of the river row's width at the context rung runs along the run, its far bank inside
   the frame. An edge whose bearing no run faces within the tolerance takes the nearest run, named in one line.
3. **S2.** The **virtual host town**: S2's roster for a town of `contextRung`'s target population with the recipe's
   intent (never materialised; its demand per class × band only). The **one-district allocation** — computed by S7b (step
   6), once field pass 1 has given the capacity per band —: with `L_hood` the outline face's built land (area × 0.62) and
   `L_town` the virtual town's plot land (S2's own estimate), each `dispersed` class takes `round(demand_c × L_hood ÷
   L_town × affinity[family(c)] ÷ Σ̄)` (Σ̄ normalising the affinities over the dispersed demand so the total stays
   `L_hood ÷ L_town` of it); households fill the residential capacity by band from field pass 1's shares; `singular` and
   `district-defining` classes enter only through the kind row's `anchors` (a temple hood its church and its priest's
   house; a market hood its market claim and hall; none when `secular` for the religious ones). The hood's population is
   the households' members (reported, and the title's subtitle).
4. **S3-lite.** The outline, from §4.2 S1 (2)'s closed-outline routine with the template row scaled to the area (a drawn
   polygon as given), inserted as the arena's L1 border chain (`border` role, as S3's map border) — its seams type
   `frame`, hard (II.1); `edges.wall` makes the run facing that bearing an open `Enceinte` chain (kind `inner`) whose
   strips S7 cuts (§4.8), typing that run `wall`. **An outline below `4 × eLo²`** (not one block's worth) is scaled up
   about its centroid to that area, and the bend is named in one line ("drawn too small for one block; enlarged to 0.4
   ha") — never refused (item 101 R2). A drawn polygon that is not simple, has fewer than three distinct vertices or zero
   area is repaired by the routine's simplicity clamp (F-OUTLINE, §5.2) and, failing that, replaced by the kind row's
   `auto` outline at the requested area, named in one line.
5. **S6.** One district: the outline face; kind from S0; field pass 1 with `characterOffset = intent.wealth − 0.5` plus
   the kind's offset, the kernels of what exists (anchors' reservations, the water edge) and `ε`; its `FieldBands` cuts
   are the band set's **default cuts** — one cut per band boundary at the cumulative default household shares `c_i` of the
   band set's rows (item 27), mapped linearly by `c → 0.1 + 0.75 c` onto [0.1, 0.85]; the six-band default set keeps its
   authored row 0.12, 0.25, 0.45, 0.62, 0.80 (ours) — a standalone neighbourhood document has no town whose land shares
   could set them, and a rich hood must be rich (J-V1.9).
6. **S7** only with a wall edge; **S7b**: the one-district allocation (3) persisted as the district's `Allocation` (less
   the void part below), its claims (anchors larger than a block, D's green quota) cut by `claimSubFace`, S7c inside it
   (the recipe's fabric, or V01 §3.3.5) with its template land; then **S7b (6) and (7)** as the base runs them, with
   volume 4's forecast (V04 §3.3) at the hood's `contextRung` — after the one-district allocation rather than before it
   as in a town, the hood's demand being its own capacity, and with P7's cap reading the one-district allocation's
   poorest-band households in place of the virtual host town's (J-V1.92). With `Features.sewers` false and the undercity
   `forbid` (step 7), only (6) (d)'s void-dwelling part can allocate: P7's `voidDwellingHouseholds` of the poorest band,
   capped at `forecastSafety` × the forecast, **taken from** the one-district allocation's poorest-band households into the
   underground pseudo-district's `Allocation` (S7b (6) (d)) and placed below by volume 4's T3 F6. The hood's population
   is unchanged; the surface capacity freed is surplus that S10b's reconcile types as yards, greens or vacant plots (§4.7
   S10b), and a household F6 cannot seat goes to T8 (V04 §3.7a), reported; **S8** (V01 §3.4, `axis` anchors or the street
   course, V01 §3.4.8); **S9**; **S10a (i)**; **S9b**; **S10a (ii)–(iii)**; **S10 (0)** lays the margin band along the
   whole border as along a settlement perimeter (§4.5's margin band; a backland strip inside) — so no plot fronts the
   outline, NG's rule that no house faces out of the hood, by construction; **S10–S12b** (the one district in the pool);
   **S12c**; **S13a** (the district's name is the hood's name, its `title` label's text); **S14**.
7. **Layers and history** (J-V1.36 as amended by J-V1.77). `Recipe.product = 'hood'` fixes the layers **through the
   inputs volumes 4 and 5 read**, which the hood's S0 writes — besides S0, only V04 §3.1's hood line reads
   `Recipe.product`:
   * **islands off** — S0 resolves `recipe.layers.islands` to `off` whatever the recipe holds (T1's hood card writes
     `off`; any other value is resolved to it and reported), so V05 §3.2 (1)'s gate fails and S7b (5) makes no allocation
     (a standalone neighbourhood document is neither a city nor a metropolis — the owner's "limited only to cities and
     metropolises");
   * **sewers off** — S0 writes `Features.sewers = false`, so volume 4's U-NET commits nothing (N0), its P1–P4 forecast
     nothing and U-FRONT's sewer-front steps commit nothing — its F6 alone runs, over step 6's void part;
   * **undercity never** — S0 resolves the document's circumstance slice (§7.7 layer 2) with `undercity: 'forbid'`, so
     volume 4's P6 finds none and U-CITY never runs;
   * **the rest of the tail and the one catacomb** are V04 §3.1's hood line (J-V4.105), cited, never restated; the
     decision here is the absence of quarries, the generated vaults and the buried town (J-V1.77);
   * **epochs** are not offered for a standalone neighbourhood document: its time card is absent, and `advance` and a
     skeleton's `history` bend to none with their line (V06 §4.1, J-V6.102; J-V1.36); **raised ways**: none generated (the unit run has no route solver and no water balance), a declared one honoured
     (V01 §3.17.7).
   V04 §3.1's hood line is the matching rule (J-V4.105, T-V4-75). T1's hood card shows no layer toggles.
The standalone neighbourhood document is an ordinary document: every edit, export, undo and the close-up work on it as
on a town.

#### 3.10.2 The standalone outline rows (item 285)

NG 1.2.2's hood outline family, restated in our words and metres (provenance `ref:NG 1.2.2 hood outline (code)`;
`code-neighbourhood.md` §2.1), each drawn on `blueprint.features` and scaled to the area:
* **`star`** (an `area` hood's): `n = 4 + ⌊8 (1 − bell4)⌋` vertices (4–12, mostly 9–12); vertex i at angle `2π (i +
  m3) ÷ n` and radius `hood.starRadiusFloor + (1 − hood.starRadiusFloor) × m3` (the floor ours, keeping the star simple
  for F-OUTLINE); one corner-cutting pass; rotated so its minimum-area box is axis-aligned; stretched to aspect `0.4 +
  0.6 u`; turned by ± 45° (+ at 0.3); the routine's fBm detail is `none` (the star is its own organic shape); its
  simplicity clamp and repair (F-OUTLINE) apply.
* **`star_round`** (a `ring` hood's): as `star` with radius `0.5 + 0.5 × m3`, aspect `1 − 0.6 × bell4` (peaked at 1),
  and a random subset of 3 … n − 1 corners kept sharp by the corner-cutting pass.
* **`street_strip`** (a `street` hood's): the main-street course first — V01 §3.4.3's course law (its segments, jitter
  and corner-cutting passes) over the chord from `−L/2` to `+L/2` at bearing ± 45° (+ at 0.3) plus a centred bell of up
  to ± 45°, its middle control point within `L/2` of the centre; then the strip of width `L × (0.3 + 0.5 × bell4)` round
  it, its vertices jittered, the two end vertices on each side pulled toward the course's ends by an `m3` share; `L` is
  solved so the strip's area is the target.
* **`plaza_frame`** (a `square` hood's): the plaza (V01 §3.4.5, its coin drawn here) at the centre; the outline, at 0.3,
  a jittered rectangle three to four plaza sides wide plus one `eHi`, offset from the plaza; else a star of 4–6 vertices
  (a rectangular plaza) or 4–7 (a round one) at the plaza's radius × `(2 + u)` (round: `(4 + u)`) + `eHi`, one
  corner-cutting pass.

#### 3.10.3 A sky island's districts (J-V1.49)

Inputs: **`skyUnitInput(doc, island)`** (V05 §2.3), the island's unit inputs — the land face, the rim strip, the claims
(the institution's and every landing's reservation), the landings with their `attach` vertices, the river, the sky
`Allocation`, the field, and the context (`districtKind`, `districtHa`, `fabricHint`, `fabricPrior`). This runner is its
one caller. On the generation worker, after the ground's S10 (0), beside the hinterland unit, each island in slot order:
1. **No S1**: SKY already wrote the island's L0 land, water and terrain (V05 §3.8).
2. **The unit's outline** is the land face less the rim strip; the claims are holes. **District partition:** `k =
   skyDistrictCount(the sky allocation's plot land, context.districtHa)` (V01 §3.16), `districtHa` volume 5's (V05
   §2.3; J-V5.45). For k > 1 the outline face is cut by §4.6's bent cut with its stop test replaced by "stop when the
   arena holds k faces, cutting the largest first"; the cuts are `secondary` ways (the island's streets, soft `way` seams
   between its districts). Each district's kind is `context.districtKind` (`sky-island`, or the institution row's on the
   face that receives its claim). An outline face below one district's size (an island whose land is all rim strip and
   claims) makes no district: the run returns `districts` empty and the island's allocation goes to volume 5's
   F-SKY-UNIT, reported.
3. **The field** is the unit inputs' `field` (its raster, mean, density and greenery) — never recomputed from
   `h(S_carried)`; the town's `FieldBands` cuts apply (the island belongs to the town's band set).
4. **S7b split**: the island's allocation divided among its districts in proportion to capacity less each one's template
   land (V01 §3.3.7), its institution claim cut in its face; **S7c** per district, each row's weight × `fabricPrior` when
   the row is `fabricHint`, else × 1 (a prior, never a forced strategy); **S8** with each landing's `attach` vertex a
   gate-ranked portal (+ 2) and each laid crossing site's deck end a bridge portal (+ 1; **Crossing sites** below), each
   of which a seed or a lane must reach — an unreached attach or deck end is a validation failure of F-TEMPLATE, whose
   last rung lays a lane to it; S9, S10a (i), S9b, S10a (ii)–(iii), S10 (0) (a margin band only on land-face runs
   **without** a rim strip; the rim strip itself is never cut and never plotted), S10–S12b in the island's own overlay.
   **Crossing sites** (V05 §3.8 (4), §3.12; §4.2 S1 (5) as item 580 extends it; J-V1.91). An island crossing site
   **qualifies** when both its `deck_end` vertices lie on the boundary of the unit's outline face — both banks border the
   island's built land, neither a claim nor the rim strip. After S7c and before any district's seeds, one L1 batch on the
   island's overlay lays, for each qualifying site in site order (the `Bridge` records' address order), its **span**: its
   own L1 edge between the two deck ends, carrying the structural `deck` role beside `way`, the way `secondary` at 0.9 ×
   the top of the `secondary` class's width band (the mean of `w_tpl`'s range, V01 §3.4.2 (b); no draw, so the span is
   the same whichever district's streams run first). No S4 or S5 runs on an island, so this batch is the way that uses
   the site (§4.2 S1 (5)). Each deck end is then a template portal of kind `bridge` of the district whose face it bounds
   (on a vertex two districts share, the smaller address's), ranked as a `secondary` bridge portal (3 + 1, V01 §3.4.2
   (a)), read by `portal:bridge` and `portal:best`, and — like a landing's attach — a seed or a lane must reach it,
   F-TEMPLATE's last rung laying a lane to it. **After S8 and before S9**, one L1 batch on the island's overlay removes
   the span of every site with a deck end no rung reached (the site stays a `site`, reported as below) and **builds**
   every other span by §4.8's bridge rule — `deckCm` from its two bank elevations by §2.6's datum step (the sampler it
   reads, `levelledGroundCm` on the island's key: the island's own raster there, since S10 has levelled no plot yet — the
   key's dispatch and raster fallback built in W8, item 309) plus the clearance row, `kind` and `piers` as S7 sets them on
   the ground — so S10's deck-plot rule and S11's `DeckContext` (V02 §3.16 (1), (5)) read a built deck. So a street runs
   from one bank over the deck to the other and the site becomes a built `Bridge` with that way, its furniture laid by
   §4.8's bridge rule in the unit's closing L1 batch (the unit run has no S7). Its deck plots, where item 110 (d)'s row
   lays them on the built deck (none on a `ford`), belong to the district V01 §3.17.6 (1) names (on an island neither
   end lies inside the town's outermost enceinte, so `Bridge.deck[0]`'s), and the S7b split above counts the row's
   expected deck capacity in that district's capacity, as S7b (1) does on the ground — the capacity counted for a span
   the after-S8 batch removes, or for a site built as a `ford`, is surplus, typed by §4.7 S10b's reconcile. A site whose
   deck end no rung reaches has its span removed in the after-S8 batch and stays a `site` (a street that reached the
   other end stays, ending at the bank), reported in `requestedVsBuilt` ("the river crossing at {site} left unbridged: no
   street reaches its far bank"); a site that does not qualify stays a `site`, unlaid. The landfall fates of the
   island's bridges and their deck plots are volume 5's (V05 §3.16 (7), §3.22 (6)).
   **Cross-arena pulls**: its S10b reads a class on another arena by the route distance (`skyRoute`, V05 §3.20 (1);
   item 308) and, at generation, reads a ground provider at the block its S10a allocation holds (V05 §3.20 (1), (12)
   (a)), never the pool's placed plots, so its placements are the same whatever the pool's size and interleaving; after
   generation (post-build requests, epochs) it reads both arenas' placed plots (V05 §3.20 (12) (a)).
   **The rim walk** (J-V1.81, J-V1.90): one island-level function plants the rim strip's face (block interior
   `rim_strip`, item 213) as volume 5's rim walk (J-V5.26). **`plantRimWalk(doc, island)`** (`@plat/hood`, V01 §3.16) is
   pure over the committed rim strip — its `rim_strip` face and its inner setback line, the strip's boundary with the
   island's built land — and §4.9's street-tree row, and draws nothing (the trees are instanced at render at the row's
   spacing, §8.10). It writes the island's one `esplanade` `Greenery` on the strip's face and one `street_trees`
   `Greenery` along the inner setback line, its `along` naming the strip with no way (§4.9's rim-walk row, item 313),
   a tree every 10–14 m by the street-tree row, and lays no way on the strip. The pair is keyed by the island's
   derivation unit and the strip (V01 §2.8); the pair the call finds is retired by §6.3's carry-over in the same batch —
   succeeded where the new record's anchor lies within its kind's hysteresis radius, else tombstoned — so after every call
   the island holds exactly one pair, and a call on an unchanged strip rewrites nothing (J-DET-2). **Its callers:** the
   unit run, **once**, after its districts' S12b and before step 5's S12c — at generation and in every run of (6) (a) (a
   raise, New random on the island, a Re-derive); and every event that re-lays the strip (V05 §4.2: a resize, a rim
   reshape), **once** in its commit, after volume 5's island L1 batch and any district re-derivation ((6) (c)). A
   district's S12b — in the unit run or in any scoped re-derivation, a replace close-up's included — never plants the rim
   strip, whose face lies in no district (step 2). A rim strip of zero length (an island with no rim) is planted with no
   pair. Households the unit cannot house go to volume 5's F-SKY-UNIT.
5. The town's S12c and S13a include the island's districts (district names unique town-wide, §9.6). The run returns its
   district ids in partition order (`NeighbourhoodResult.districts`), which SKY-F writes to `SkyIsland.districts` (V05
   §3.12), and its `SeamReport` with `portalsTotal` 0 and `landingsReached` (V01 §3.11 (6)).
6. **After generation** (J-V1.90). The runner has no scoped mode — every run partitions the whole island (step 2) — so
   it runs only where the whole island is laid anew.
   (a) **Callers.** Volume 5's `raiseIsland` — at an epoch by its `sky.islands` participant (V05 §3.15 (5)), and after
   generation by a `convert raiseIsland`, the expansion of T5's `sky` declaration included (V05 §4.2) — and **New random
   on an island** (`regenerate` with the island's scope, `newRandom`; V05 §4.2) run steps 1–5 inside the calling commit,
   on the island's own overlay, where volume 5's sequence for that event calls `skyUnitInput` (V05 §3.12), step 4's
   cross-arena pulls reading both arenas' placed plots. Their draws carry the calling commit's key components — the
   epoch's at an epoch, the island's advanced reroll for New random (§6.1; V01 §3.12) — so a replay reproduces the same
   districts. A Re-derive from SKY, from S7b or from any earlier stage runs the unit run at generation's slot (above).
   Each run belongs to its calling commit, so that event's undo restores the island's districts whole (§7.4). A raise at
   an epoch is priced per event in V06 §6.2 at V05 §6's rows and V01 §6's sky row.
   (b) **Carry-over.** A run over an island that already holds content (New random; a Re-derive) re-derives it as a
   replace close-up re-derives a district (V01 §3.9): §6.3's carry-over; the locked, pinned, assigned, declared and
   dossier-backed entities and V01 §3.5.12's fixed inputs kept, their faces holes in the partition and in the template
   faces (V01 §3.4.1); one the re-drawn outline no longer covers carried or orphaned by §6.3 and listed among the event's
   fates, never silently dropped; the successions in `SeamReport.superseded` (V01 §3.11 (6)). The districts keep their
   derivation unit (the island, stage S6, the partition's face order; V01 §2.8), so a partition that comes out the same
   keeps its districts' lineages. A newly raised island holds nothing, so its run only mints.
   (c) **Faces added or moved at the rim are no unit run.** Each face a growing resize adds, or a rim reshape adds with a
   stretch it moves outward (V05 §4.2), joins the district whose rim stretch is nearest to it (ties by district
   address), after volume 5's operator has moved the rim and re-laid the rim strip, and every district that receives a
   face is re-derived by its own scoped re-derivation from S8 under its committed fabric — §7.3's district scope,
   V01 §3.9's `keep` path with its fixed inputs and carry-over, the district's `Allocation` unchanged (the new capacity is
   surplus, typed by §4.7 S10b's reconcile as yards, greens or vacant plots); `plantRimWalk` re-plants the rim walk whole
   in the same commit (step 4). A resize dilates or erodes the whole rim (V05 §4.2), so a growing resize gives faces to
   every district bordering the rim strip, at most k ≤ 3, and a reshape only to those whose stretch it moves outward;
   the receiving districts re-derive in district-address order inside the one commit, which the event's undo restores
   whole.
   **A shrinking resize, and each stretch a reshape moves inward,** gives no face and re-derives no district but the
   claim's, where volume 5 re-searches the claim (below): volume 5's operator clears and re-cuts the plots the eroded
   rim, the re-laid strip or a re-claimed yard takes (§4.7 S10 (7); V05 §4.2) and cuts each way that crosses the re-laid
   strip line back to it, and `plantRimWalk` then re-plants the walk (step 4). A reshape re-derives only the districts
   that receive faces from a stretch it moved outward, and the claim's district where the claim is re-searched.
   **A re-searched institution claim** (V05 §4.2; J-V5.77). Where the island's institution claim no longer fits the land
   face less the re-laid strip and yards and volume 5 re-searches it inside the district that holds it, that district is
   re-derived by its scoped re-derivation from S8, as above, with **one exception to V01 §3.9's fixed inputs: the island
   institution's use and building are released for the event**. The solver relocates the use to the new claim (its
   `dossier` request for a dossier-backed one, V05 §4.4; the use keeps its address as it moves, §6.3, so its assignment or
   dossier binding follows it), S10b places the institution on the new claim (V05 §3.12) and S11 builds its one building
   there; the old building is demolished, a listed fate, and the old claim's face joins the district's land, the new
   claim a hole (V01 §3.4.1). Every other fixed input holds, and the use is a fixed input again once the event commits. A
   district that both receives faces and holds a re-searched claim is re-derived once, with both; one that receives none
   is re-derived for the claim alone, in the same district-address order.
   **Yards.** The plots a new landing yard covers (V05 §4.2's `placeSkyAccess`), and the plots covered by each yard a
   resize or a reshape re-claims at its re-seated top (V05 §4.2), are likewise re-derived by §7.3's local operator on the
   island's arena. **Order in the one commit:** volume 5's island L1 batch and its plot, yard and way steps (V05 §4.2),
   then the re-derived districts in district-address order, then `plantRimWalk`. The district count is re-read only by a
   unit run, so a resize or a reshape never adds or removes an island district.
At generation the ground is byte-identical to a run without the island (§3.4's isolation); every landing is reached and
the rim strip is untouched (T-V1-21). Item 110 on the island's districts is V01 §3.17.7 (1)–(2): no raised way, the
terrace rule at the island's relief class, no wall on or along the rim (V05 §3.22 (3)–(4)). Volume 5's water on an island
is its own: item 111's oasis, water pull and climate cell do not reach an island's districts (V05's sentence).

#### 3.10.4 An arbitrary outline inside a town

**Seeing** any area at the neighbourhood band — a field cemetery, a quarry, a stretch of suburb — is the outline close-up
(V01 §3.8.9), a view action. **Making** a new neighbourhood inside a town is the `quarter` declaration (§7.1: a
`drawBoundary` with its kind, an `assign`, a name and its `fabric`, item 349, and `terrace`, item 350), which makes a base
district; its fabric is then the declared one, S7c's, or T8's later (V01 §4.2). No unit run.

### 3.11 Seams — what stage 2 adds to II.1

1. **Shared geometry** stays the base's (II.1 (1)): no seed or cut of D ever writes a chain outside D's faces except the
   T-junction vertices on shared spines and their neighbour steps (II.1 (3)).
2. **Portals and ends.** Every seed end and every lane end on a district-boundary spine is a `baseLane` amendment made by
   S8 (generation or a replace re-derivation), with §4.6 step 7's portal gap; a `tJunction` amendment is made only by an
   edit event that inserts a junction on a shared spine itself (a `drawWay` ending there), its `cause` the event (II.1
   (3), item 539). A seed never continues across a district boundary (§4.6 step 10).
3. **Field continuity** is the base's (§4.5: continuous fields, `hard` seams jump); S9b's seam guard (V01 §3.5.8) keeps
   the dispatch from making jumps the fields do not.
4. **Barrier runs** (item 106 (a), (f)): a boundary run on a barrier-closure arc types by its barrier kind by II.1's seam
   typing (item 541; J-VI.3), all hard; none carries a portal.
5. **Bounding ways' attributes**: a way on D's boundary reads both sides for its surface (V01 §3.7.3) and its naming
   context (V01 §3.7.2), so a re-derivation of D rewrites them; §7.3 item 1 puts the `surface` attribute and the naming
   record of D's bounding ways inside D's seam exception (item 369), and the locality oracle checks everything else as
   before.
6. **`SeamReport`** (II.1), written by every close-up, replace re-derivation and unit run: `portalsTotal` — the portals of
   D's seams; `portalsConnected` — those from which a walk along D's L1 ways reaches D's largest way component (a BFS over
   D's way graph — part 0 (V01 §2.3's parts table; on a sky arena the island's own part), each raised road one edge
   between its ends, never an aqueduct; portals on hard seams, which carry no way, excepted); `unconnected`;
   `addedPortals` — the amendments this run made; `sharedEdgeHausdorffCm` — the Hausdorff distance between each shared
   chain resolved before and after the run, 0 by construction (computed, not assumed); `fieldJumps` — at each boundary
   sample of D's soft seams, the difference between the field value sampled on each side's nearest block, flagged when it
   exceeds the seam's band (S3's, §13.7); `superseded` — §6.3's successions of the run: a replace re-derivation's, and a
   unit run's over an island that already holds content (V01 §3.10.3 (6) (b)); `landingsReached` — the landing attach
   vertices a walk along the run's ways joins to the district's largest way component, present where the run holds one.
   A standalone unit run reports `portalsTotal` 0; **a sky unit run reports `portalsTotal` 0** — its seams are `sky`,
   hard and portal-free (II.1 (5)) — its landing attaches being template portals of kind `landing` (V01 §2.3), reported
   as `landingsReached` beside `portalsConnected`; a ground district holding a ground landing's S8 destination
   (V01 §3.4.2 (a)) reports it in `landingsReached` likewise, its seam portals as before. A district with no way (every
   face below a block) reports `portalsConnected` 0 of `portalsTotal`, each portal `unconnected`.
7. **Retaining walls** (item 110 (a); J-V1.63). Every `RetainingWall` lies inside the faces of the district whose
   re-derivation produces it — the ward-edge wall on D's boundary setback line and the plot and block walls inside D's
   blocks (item 302) — or, when declared (source `declared`), where the author drew it: a declared wall that meets a
   shared chain is snapped off it to the side it was drawn on by its half-width (§3.6's attraction rule) and belongs to
   that side's district for scoping. No wall lies on a shared chain, so none is inside two districts' scopes. Its **step
   profile is derived** on read from the committed levels on each side (`stepProfile`, §2.7), so a re-derivation of the
   low-side neighbour E writes nothing of D's; E's replace dry run lists, as information, each wall of D whose derived
   step changes by ≥ `terrace.profileNoticeCm` (V01 §3.9). A boundary run along a wall stays **soft**: never typed
   `wall`, never a barrier-closure run of item 106, never hard (a retaining wall is never an enclosure, item 110 (a)); its
   portals are its crossings, each a stair or a ramp.
8. **Raised ways never bound a district** (item 110 (b)): `TypedBoundary`'s runs are part-0 seams, and an under-deck
   strip is a hole of the faces it crosses, never a seam run (V01 §2.3's parts table).

### 3.12 Determinism

**Concerns** (§6.1, item 340; appended with the next u16 ids, so no key moves; each non-rerollable):
* `fabric.select` — S7c's draw (V01 §3.3.4): keyed by **the district's own lineage key with the reroll component forced
  to 0**, attempt cap 0; a merge or split successor inherits its anchor predecessor's key (§6.3's anchor rule carries each
  district's lineage); a district minted by an edit keys by its creating event's `seq` lineage (§6.3). So a New random on
  D, a declared quarter, a merge or split elsewhere, or a Re-derive that renumbers S6's seed order moves no district's
  draw but its own inputs'.
* `hood.dispatch` — S9b's picks (V01 §3.5): a block's own draws (phase 2's content, pick ordinal 0; a yard's paving, pick
  ordinal 1; a ring centre's pick, ordinal 0) keyed by the block's lineage (whose derivation unit carries D's reroll);
  the manor picks keyed by the district as derivation unit (its lineage with its current reroll) with the pick ordinal
  as the creation index; attempt cap 0; the void-junction choice draws nothing.
* `hood.template` — the seed primitives' draws (V01 §3.4.2 (f)): keyed by the template face's cell with the seed's
  creation index, attempt cap 3 (F-TEMPLATE's redraw rung).

The contour series, the thalweg path and the precinct rings draw nothing (level lines, flow lines and outline offsets
are deterministic), and neither do `terraceState`, the parts table, the strips or deck ownership. Existing concerns read:
`cut.*` (the bent cut; `cut.arc` also the ring courses, II.2 — the radii's u at index 0, the district's one growth factor
at index 1), `pin.decor` (hood pins, keyed by the block or hinterland face **with the stage component `STAGE_VIEW`**, so no
hood-pin draw aliases S11's decoration draws on the same concern), `pin.centrepiece` (square centrepieces, keyed by the
block), `greenery` (court greening, keyed by the block), `blueprint.features` (the standalone S0's draws, appended in
V01 §3.10.1's order), `naming` (place names), `epoch.transform` (the `hood.fabric` participant, V01 §3.3.6).

**Stage components** (§6.3's lineage key). Template seed ways and plazas take `S8.seed`, a registered stage id of their
own (item 345), so a seed's lineage key never equals a lane's minted by the same cell's S8 run; T-V1-36's
address-collision test runs per template row over B-FUZZ's faces.

**Reroll semantics.** New random on a district advances its reroll: S8's streams (`cut.*`, `hood.template`, the ring's
`cut.arc`), S9b's `hood.dispatch` (the blocks' lineage and the district's manor key carry the reroll) and everything
below re-draw; its fabric does not (V01 §3.3.4). New random on a block re-draws S10 onward for that block; its content
stays (S9b is upstream). Hood pins re-draw only when their block re-derives: `pin.decor` is a geometry concern, so no
`rerollLayer` reaches it — a user wanting other pins re-rolls the block or edits the pins.

**Order.** S7c and S9b visit districts in lineage order and blocks in lineage order; seeds in row order; ring courses
innermost first; hood-pin sites in V01 §3.8.2's order. The pool changes nothing (S7c and S9b are eager hooks on the
generation worker; the refine derivation is a pure function), so pool sizes 0–3 give one digest; §6.5 (9)'s
derived-complete test covers the close-up by deriving every district's close-up in two orders and comparing the chunks'
hashes.

### 3.13 Failure handling (§5.2, item 327)

| class | where | detection | ladder (in order) | report | tested by |
|---|---|---|---|---|---|
| F-TEMPLATE | S8 (a seed primitive), a replace re-derivation's dry run, a sky unit run | V01 §3.4.2 (d)'s validation fails (a degenerate course among its cases); a plaza does not fit (V01 §3.4.5 (b)); a parallel spine's longest piece < `2 × eHi`; no ring fits; the row's requirement fails on the committed template face (V01 §3.3.7); a sky landing's attach or an island crossing site's deck end unreached (V01 §3.10.3 (4)); a contour series' level 0 not laid (V01 §3.4.3); a seed crossing a strip outside a qualifying `open` span (V01 §3.17.3 (3)); no void junction (V01 §3.4.5 (c)) | (1) redraw the seed on `hood.template`'s attempt 1–3 (a spine's control point and jitter; a ring series' phase; a plaza's coin and aspect); (2) shrink — a plaza's area × 0.8 (≤ 3), the ring count − 1 per step down to one, a parallel spine's offset ± `eLo / 2`, a contour series' level 0 ± `eLo / 2` along the fall, a strip crossing shifted along the strip to the nearest qualifying span; (3) substitute the row's `fallback` templates in order, each from rung (1), **only those whose `templateLandM2` on the committed face is at most the land S7c reserved**; (4) `bent-cut`, whose §4.6 ladder always completes — and lays a lane to an unreached landing attach or deck end; a deck end still unreached leaves its site a `site`, its span removed after S8 (V01 §3.10.3 (4)); a void square not made is left out, reported | `requestedVsBuilt` per district: delivered, simplified (rung 2), substituted (rungs 3–4) — a substitution writes the row built to `D.fabric` and that row's defaults to `fabricParams`, the requested row staying in the report (the fabric why provider recovers it, V01 §4.5); in a replace dry run, the bend named in one line (V01 §3.9) | T-V1-9 (every rung's count on B-FUZZ's faces, 0 crashes), T-V1-7 and T-V1-8 (rungs 1–2 on each primitive), T-V1-18 and T-V1-48 (rungs 3–4 named in the dry run), T-V1-21 (the lane to an unreached attach or deck end), T-V1-38 (the void square left out) |
| F-DISPATCH | S9b; S10a (ii) | a quota with no eligible site; a manor with no compound class; the land check (V01 §3.5.9) short; a `manor` block whose district holds no household of its band range after S10a (ii) | the unmet quota rolls to the next type (squares) and is reported; the block stays ordinary; **the household-less manor block reverts to `ordinary`**, reported, never left empty; S10b's reconcile and F-SITING as usual | `stage2.dispatch`: quotas, met, unmet, manors reverted, per district | T-V1-11 (d) (a forced unmet quota rolls and is reported; a household-less manor block reverts), T-V1-12 (the land check) |
| F-UNIT | the unit run (V01 §3.10) | the outline not simple after F-OUTLINE's repair; its area below `4 × eLo²` (not one block's worth); the standalone allocation empty; an island's outline face below one district's size | F-OUTLINE's ladder (§5.2); **an outline too small is scaled up about its centroid to `4 × eLo²` and the bend named in one line** (item 101 R2) — never refused; an outline F-OUTLINE cannot repair replaced by the kind row's `auto` outline, named; an empty class demand → households only; an island with no district's worth of land → no district, its allocation to F-SKY-UNIT (volume 5) | the unit's report | T-V1-20 (d) (an outline below `4 × eLo²` scaled up with its bend line; a non-simple drawn outline replaced), T-V1-21 (the island without a district's worth of land) |

No rung restarts anything above its district or unit (§5): a template failure never re-rolls the town, a dispatch
shortfall never re-cuts a block, a unit failure never touches the ground.

### 3.14 Constants (with provenance and table home)

Every numeric constant of V01 §3 is a cell of a table (item 23; DEFINITION §5 "Rules are data"): of its own row's table
where it belongs to a row, else a column of **`hood.constants`** (V01 §2.2) — its one `settings` row, each key a column
with its own `ColumnSpec` — whose key the rule's text cites. Only `editTable` changes them (§7.6). Style values are §8.2's
style-sheet cells. Values another unit owns are cited, never restated: volume 11's `ways.crossing` (`rampMaxGrade`,
`stair`), `terrace` (`slopeMin`, `stepMinCm`, `enabled`), the relief rows' `terracedEdges`, `raisedWays.structure`
(`clearanceCm`, the material rows), `aqueduct.terminal`; the base's `character.anchorSigma` (§4.5) and §11.1's
`vtt.retainingMinCm`.

**Row cells.** Constants that belong to a row live in that row's table:

| constant | used in | table · key | provenance |
|---|---|---|---|
| S7c row weights and gains; eligibility shares (water, wall 0.2; slope 8 %; `landmarkSigma` `character.anchorSigma`) | V01 §3.3.2, §3.3.3 | `hood.templates` · `select.*`, `requires.*` | `own`, calibrate at M5 (non-bent share 15–35 % at CITY; S4 (b)) |
| standalone `auto` odds 0.7 / 0.3 / 0.1 / 0.1 | V01 §3.3.5 | `hood.templates` · `select.ngOdds` | `ref:NG 1.2.2 random template weights (code)` |
| ring radii law (one factor per district), `ringJitter` 0.15, `ringPasses` 3 | V01 §3.4.4, II.2 | `hood.templates` · `params` | `ref:NG 1.2.2 ring courses (code)` (II.2, item 543) |
| series spacing `2 × dBar + w_tpl` (range `1.5–3 × dBar + w_tpl`) | V01 §3.4.3 | `hood.templates` · the `stepped` row's `params.terraceSpacingM` | `own` (hill-town practice: two plot rows and a street to a terrace) |
| plaza aligned to the face's OBB | V01 §3.4.5 | — (a rule, no value) | `own` (J-V1.5) |
| square quota rows, kind factors | V01 §3.5.2 | `squares.quota` (base) | `own`, target S4 (d) 0.03–0.15, median 0.08 (§13.7) |
| `manorBlockShare` rows | V01 §3.5.2 | `hood.dispatch` · `manorBlockShare` | `own`, anchored on NG's 6–11 % |
| small-block weights, `yardPaved` | V01 §3.5.6, §3.5.10 | `hood.dispatch` · `small`, `yardPaved` | `own`, calibrate at M5 on the NG pairs |
| court-greening rows | V01 §3.5.7 | §4.9's table (item 313) · the court-greening row | `own`, anchored on NG's 23–58 % (item 58 (b)) |
| `way.surface` rows | V01 §3.7.3 | `way.surface` | `own` |
| hood-pin rows | V01 §3.8.2 | `hood.pins` | `own`; decay ÷ 10 `ref:NG 1.2.2 pin decay (code)`, P20 |
| `hood.kinds` rows, area bands, outline weights | V01 §3.10.1 | `hood.kinds` | `own` |
| default cuts `c → 0.1 + 0.75 c`; the six-band row | V01 §3.10.1 | `hood.defaultCuts` | `own` |
| place knowledge defaults | V01 §3.7.1 | `hood.placeKnowledge` | `own` |
| `star` (vertex count and angle laws, aspect `0.4 + 0.6 u`, ± 45° at 0.3), `star_round`, `street_strip`, `plaza_frame` | V01 §3.10.2 | the outline rows (§4.2 S1 (2), item 285) | `ref:NG 1.2.2 hood outline (code)` |

**The columns of `hood.constants`** (J-V1.99). The table is one row, key `settings`, in volume 11's settings form (V11
§2.1): each key below is a column, its dotted name the key the rules cite, with the `ColumnSpec` this table gives — its
`unit` and `calibratable` reach the compiled cell (V11 §2.2), its `range` clamps an edit (V11 §2.1), and
`extensionAllowed` is true exactly where the marker column names a mode. Each calibratable column takes its own register
entry `cal.hood.constants.*.<key>` (V12 §3.11; V01 §8.1). Angle columns hold centidegrees (`cdeg`, §2.1) — a key's `Deg`
suffix names the quantity and the table gives degrees; `Pct` columns hold percent (`none`). **Marker**: `weight` or
`option` — a switch cell (V01 §2.2), `extension` with that mode, 0 or off in the `MFCG` and `FTG` presets; `—` — a
geometry cell, read at its value in every preset. **`NG`**: the column's `presets.NG` entry (V01 §3.15); `—` — none, the
cell resolving under `NG` as under `MFCG`. Provenance `own` unless the row names another.

| column(s) | used in | default | type · unit | range | calibratable | marker | `NG` | provenance |
|---|---|---|---|---|---|---|---|---|
| `fabric.extensionWeight` — the stage-2 switch | V01 §3.3.3, §3.15 | 1 | number · `weight` | [0, 1] | no | `weight` | 1 (`own`; `fixed: the NG preset runs stage 2 (V01 §3.15)`) | `own` |
| `ng.fabric`, `ng.squares`, `ng.manors`, `ng.smallBlocks`, `ng.greens`, `ng.courts`, `ng.pins`, `ng.plazaByTag` — NG's rule switches | V01 §3.15 | off | bool · `none` | — | no | — | on (`ref:NG 1.2.2 ⟨the rule's behaviour⟩ (code)`, V01 §3.15's reference column) | `own` |
| `ng.plazaM2` — the plaza areas by size tag (small, medium, large), read wherever `ng.plazaByTag` is on | V01 §3.15 | 450, 1 800, 7 200 | list · `m2` | [100, 20 000] each | yes | — | — | `own`, calibrate at M5 on the NG pairs by T-V1-31's plaza share |
| `auto.contextFactor` | V01 §3.3.5 | 0.7 | number · `share` | [0, 1] | yes | `weight` | — | `own` |
| `elig.ringELo`, `elig.plazaFaceMult`, `elig.spineEHi`, `elig.runEHi` | V01 §3.3.2 | 2.5, 6, 3, 3 | number · `none` (multiples of `eLo`, of the plaza's area, of `eHi`) | [1, 5], [2, 12], [1.5, 6], [1.5, 6] | yes | — | — | `own` |
| `elig.crossAngleDeg`, `fan.sepDeg`, `hood.edgeDeg` | V01 §3.3.2, §3.4.2 (a), §3.4.6, §3.10.1 | 45°, 45°, 60° | number · `cdeg` | [30°, 90°] each | yes | — | — | `own` |
| `anchor.spanShare`, `tpl.widthLow`, `tpl.crossDelta` | V01 §3.4.2 (a)–(b), §3.4.3 | 0.7, 0.8, 0.05 | number · `share` | [0.3, 1], [0.5, 1], [0, 0.15] | yes | — | — | `own`; `tpl.widthLow`'s per-map template width idea `ref:NG 1.2.2 template widths (code)` (II.2) |
| `tpl.courseDelta`; `tpl.segMin`, `tpl.segSpan` | V01 §3.4.3 (δ ± 0.15, 3–7 segments, ½-segment jitter, passes 4 − ⌊n/2⌋) | 0.15; 3, 4 | number · `share`; integer · `none` | [0, 0.3]; [2, 6], [0, 6] | no (`ref:NG` code values) | — | — | `ref:NG 1.2.2 main street course (code)`, in metres |
| `tpl.arrivalDeg` | V01 §3.4.3, §3.4.4 | 85°–95° | range · `cdeg` | [60°, 120°] | yes | — | — | `own` |
| `ring.insetELo`; `ring.portalGapM` | V01 §3.4.4 (the fit inset `eLo + w_tpl / 2`; the portal gap `max(6 m, 2 × lane width)`) | 1 (× `eLo`); 6 m | number · `none`; number · `m` | [1, 2]; [4, 12] | yes | — | — | `own` (§4.6 step 7's law on rings) |
| `land.spineFactor`; `land.ringSlack`, `land.smallShare` | V01 §3.3.7, §3.5.9 | 1.15; 0.10, 0.12 | number · `none`; number · `share` | [1, 1.5]; [0, 0.3], [0, 0.4] | yes | — | — | `own`, calibrate at M5 (T-V1-12); the small share measured at M5 |
| `plaza.aspectMin`, `sq.smallDiv` | V01 §3.4.5 (aspect `1 + bell4` above 1.2), §3.5.3 (`smallBlockM2 = eLo² / 2`) | 1.2, 2 | number · `none` | [1, 2], [1, 4] | no (`ref:NG` code values) | — | — | `ref:NG 1.2.2 square plaza (code)`; `ref:NG 1.2.2 small-block rule (code)`, restated on our extents |
| `plaza.voidRadius`; `park.minM2`; `park.maxShareOfFace` | V01 §3.4.5 | 1.2; 3 000 m²; 0.4 | number · `none`; `m2`; `share` | [0.8, 2]; [1 000, 10 000]; [0.1, 0.8] | yes | — | — | `own`; the park floor §4.9's 0.3 ha |
| `sq.forecourtM`, `sq.bridgeM`; `sq.maxM2`; `sq.overTake`, `dispatch.overQuota` | V01 §3.5.3, §3.5.6 | 60 m, 40 m; 5 000 m²; 1.5, 1.5 | number · `m`; `m2`; `none` | [20, 120], [10, 80]; [1 000, 10 000]; [1, 3] each | yes | — | — | `own` |
| `green.maxMedian`, `green.spacingEHi`, `green.leafyCourt` | V01 §3.5.4, §3.5.7 | 1.5, 2, 1.5 | number · `none` | [0.5, 3], [1, 5], [1, 3] | yes | — | — | `own` |
| `manor.fitLow`, `manor.fitHigh`, `manor.spacingEHi` | V01 §3.5.5 | 1.0, 3.0, 2 | number · `none` | [0.5, 2], [1.5, 5], [1, 5] | yes | — | — | `own`; the spacing idea `ref:NG 1.2.2 manor spacing (code)` |
| `manor.sunWeight` | V01 §3.5.5 | 0.5 | number · `weight` | [0, 1] | yes | `weight` | — | `own`; item 102 (d) |
| `guard.softShare`; `guard.bands` | V01 §3.5.8 | 0.3; 1 | number · `share`; integer · `none` | [0, 1]; [0, 3] | yes; no | — | — | `own` |
| `feature.runM`, `name.landmarkM` | V01 §3.6, §3.7.2 | 60 m, 50 m | number · `m` | [20, 150], [10, 150] | yes | — | — | `own` |
| `name.tradeShare`, `name.curvedShare`; `name.bentDeg` | V01 §3.7.2 | 0.3, 0.3; 15° | number · `share`; `cdeg` | [0, 1] each; [5°, 45°] | yes | — | — | `own` |
| `terrace.askGain` | V01 §3.3.3 | 1 | number · `weight` | [0, 3] | yes | `weight` | — | `own`, calibrate at M5 (T-V1-50) |
| `terrace.siteShare`, `terrace.minGapShare` | V01 §2.3, §3.4.3 | 0.3, 0.6 | number · `share` | [0, 1], [0.3, 0.9] | yes | — (thresholds: `asks` is inert wherever `terrace.askGain` is 0 and volume 11's `terrace.enabled` off; J-V1.99) | — | `own`, calibrate at M5 (T-V1-50) |
| `terrace.maxLevels`; `terrace.profileNoticeCm` | V01 §3.4.3 (per flank); §3.9, §3.11 (7) | 15; 50 cm | integer · `none`; number · `cm` | [4, 31]; [10, 200] | no (a work limit); yes | — | — | `own` |
| `raised.stripMarginM`, `raised.clearWidthM`; `raised.squareDeg` | V01 §3.17.3 (strip margin; arch clear width + 1 m; ± 30° of square) | 1 m, 1 m; 30° | number · `m`; `cdeg` | [0, 3] each; [10°, 45°] | yes | — | — | `own` |
| `landmark.maxRings` | V01 §3.4.4 | 2 | integer · `none` | [1, 4] | no | `option` — the precinct multi-ring; its off value 1 is its `presets.MFCG` and `presets.FTG` entry (`own`; `fixed: the parity off value`) | — | `own` |
| `landmark.roundTol` | V01 §3.4.4 | 0.9 | number · `share` | [0.7, 1] | yes | — | — | `own` |
| `hood.hillsidePct`; `hood.hillsideMaxPct` | V01 §3.10.1, §4.1 | 20; 60 | number · `none` (percent) | [0, 60]; [20, 100] | yes; no | `weight` (the hillside default: a hood is flat under the parity presets and `NG`); — | — | `own` |
| `court.nameMinM2`, `pin.siteMinM2` | V01 §3.7.1, §3.8.2 | 200 m², 30 m² | number · `m2` | [50, 1 000], [5, 200] | yes | — | — | `own` |
| `pin.cap`, `pin.courtFactor`; `pin.edgeInsetM` | V01 §3.8.2 | 0.6, 0.2; 3 m | number · `share`; `m` | [0, 1] each; [0, 10] | yes | — | — | `own` (the court factor from NG C6's density) |
| `pin.decayScope` | V01 §3.8.2 | `'block'` | enum · `none` (`block`, `district`) | — | no | — (a categorical cell: `presets.MFCG` and `presets.FTG` `'block'`, `own`, `fixed: the parity value`, as §7.6 requires of one) | `'district'` (`ref:NG 1.2.2 pin decay (code)`, P20) | `own` |
| `access.<accessSymbolKind>M` — twelve columns, one per `AccessSymbolKind` value (V01 §3.8.8); the column set is held by T-V1-4's registry test (set equality with the enum), not by a `TotalityRule` — a `coversEnum` checks one column's values across a table's rows, and this is one settings row (V11 §2.1); V01 §3.8.8's kind list and these columns change together in one change | V01 §3.8.8, §5.1.2 | `stair` 2.5, `ladder` 1.2, `hatch` 1.2, `shaft` 1.5, `well` 1.6, `cellar_stair` 1.5, `grating` 1.0, `mouth` 3.0, `sinkhole` 4.0, `collapsed_shaft` 3.0, `ruin_entrance` 3.0, `catacomb` 2.5 (m) | number · `m` | [0.5, 8] each | no (drawing sizes) | — | — | `own` |
| `closeup.chunkKB` | V01 §3.8.3 | 32 | integer · `none` (KiB) | [8, 128] | no (an engineering budget) | — | — | `own` |
| `size.small`, `size.medium`, `size.large` | V01 §3.10.1, §3.15 | 85, 700, 1 050 | integer · `none` (buildings) | [20, 3 000] each | no (NG's measured bands) | — | — | NG's size bands (`docs/confidence/ng.md` C8) |
| `hood.frameMargin`, `hood.starRadiusFloor`, `sky.plotShare` | V01 §3.10.1, §3.10.2, §3.16 | 0.3, 0.35, 0.62 | number · `share` | [0.1, 1], [0.2, 0.6], [0.3, 0.9] | yes | — | — | `own`; `sky.plotShare`'s default the base's dense-core plot share (0.62, §4.2 S2) |

### 3.15 The `NG` preset — Neighbourhood's own rules (item 23; J-V1.98)

Emulation first: the reference that owns the close-up is Neighbourhood, so stage 2 carries an **`NG`** parity preset
whose entries select NG 1.2.2's own rules where NG has them (each `ref:NG 1.2.2 … (code)`, `code-neighbourhood.md`
§2.0–§2.8, mechanisms restated in our words and metres). T-V1-31 and T-V1-32 run under `NG`; the default preset keeps this
volume's rules as declared extensions, which T-V1-32 shows the owner beside the NG pairs, unrated. In §7.6's terms (item
584; J-V1.98):
* **Kind** — a zeroing parity preset beside `MFCG`, `FTG` and `VG` (§7.6): one more zeroing `PresetId` (V11 §2.2), and so
  one more `PresetArm` (V12 §2.1).
* **Resolution** — a cell resolves under `NG` to its own `presets.NG` entry, else to what it resolves to under `MFCG`:
  its `presets.MFCG` entry, else 0 or off for an `extension` switch cell, else its default (§7.6's order). So the base
  under `NG` is the base under `MFCG` — Neighbourhood's `area` fabric is the measured bent cut MFCG's code shares (II.2)
  — and no base table needs an `NG` entry; this volume's geometry cells, unmarked (V01 §2.2), keep their values (the
  templates' seed laws are already NG's), and its switch cells take `MFCG`'s off values unless the table below gives an
  entry.
* **Where the entries stand** — on `hood.constants` alone (V01 §3.14's column table): the stage-2 switch
  `fabric.extensionWeight`, the eight rule switches `ng.*` and `pin.decayScope`; never on another `hood.*` table, on
  `squares.quota`, on `way.surface` or on a base table's row (§4.9's court-greening row reads `ng.courts` instead). The
  schema requires an `NG` entry on no cell — every categorical cell already holds its `MFCG` entry (§7.6), which `NG`
  falls back to — and `pin.decayScope` carries one because NG's value differs.
* **The stage-2 switch** — `fabric.extensionWeight` (`weight`: 1 by default, 0 in `MFCG` and `FTG` by §7.6's zeroing, 1
  under `NG` by its entry) weights S7c's template rows (V01 §3.3.3), and S9b (V01 §3.5), its land in the programme
  (V01 §3.5.9: `λ_b` 0), the local-place step (V01 §3.7.1) and the hood-pin derivation (V01 §3.8.2) run only while it is
  > 0 — the `extension` marker of this volume's steps, which T-V1-4's registry test reads.
* **The switch's edit** (J-V1.101) — an `editTable` or `editPreset` that changes the resolved `fabric.extensionWeight`
  re-derives from the switch's first reader stage, S2, whose land estimate reads `λ_b` (V01 §3.5.9) — the first-reader
  re-derivation of V01 §2.7's `hood.constants` row, never §7.6's slice invalidation, for every change of the value (a
  change inside (0, 1] moves only S7c's weights, and the re-derivation reproduces the rest). The re-derivation uses
  §6.3's carry-over, with its fates in the dry run (V01 §2.7's `hood.constants` row; §7.6) and the confirmed fates
  stored in the event (§7.1). S7c's weights, S9b, the local-place step and the hood pins run, or do not, under the new
  value. What they made before and do not make again — template seeds and the ways they laid, typed blocks, places, pins
  — is retired by the carry-over, each a listed fate; a retired place's name goes to the archive with its tombstone
  (V01 §2.7). The held inputs stay (§7.2; V01 §3.5.12's fixed inputs): the switch gates what stage 2 *derives*, never
  what the author declared, so a declared `fabric` or `terrace`, a `setAttr` on a block's content and a place made by
  hand whose host still stands (V01 §2.7) are kept at 0 as at 1; the `Block.overrides` rows stay in their leaves, dormant
  while the switch is 0 — the close-up derives no pins then, so no row is applied, orphaned or reported — and resolve by
  V01 §3.8.5 again when it rises (a superseded block's rows moving to its successor as ever); the `CloseupRecord`s stay,
  and every close-up chunk is stale by its digest (V01 §3.8.3, §3.8.4). The underground tail runs after the ground, its
  T6 running the opening pass under the new gate (V04 §3.10; J-V4.121): raised above 0, the opening places made; lowered
  to 0, none made and the old ones retired by the carry-over; the underground consequences of any change of the value are
  V04 §4.3's switch row (inside (0, 1] its re-cut plots take the ground-edit row's). The edit's scope for the oracle is
  V01 §4.3's switch bullet; its cost §12.6's Re-derive-from-Sk line (V01 §6). The edit's undo restores the document as it
  stood (§7.4's `editTable` / `editPreset` row).
* **Scope** — read by B-REF's NG rows (T-V1-31, arm `preset: 'NG'`) and the M5 panel's NG pairs (T-V1-32; §13.6 (2))
  only: stage 2's parity setting, as `FM` is stage 3's.
* **Provenance and the register** — every `NG` entry is a reference value read in NG's code (`ref:NG 1.2.2 ⟨behaviour⟩
  (code)`, with its P-id where it has one), which V12 §3.11's lint passes with no register entry, or the switch's on
  value (`own`, note `fixed: the NG preset runs stage 2 (V01 §3.15)`), no provisional number either; so no `NG` entry
  takes a register entry and no id `…@NG` exists on this volume's account. The one metre reading `NG` needs — the plaza
  areas by size tag, since NG's unit-to-metre scale is HOLD (J-A58.43) — is no `NG` entry but the default-column cell
  `ng.plazaM2`, read wherever `ng.plazaByTag` is on: its register entry is the default line's (V01 §8.1), and W17 tunes
  it on the NG pairs before M5's exit to T-V1-31's scale-free plaza share (J-V1.97; *fallback*: where §13.5's NG rows
  carry no plaza share, that clause reads `notApplicable` and `ng.plazaM2` keeps its value, reported). The hood pins keep
  the rows' own `sizeM` under `NG` (T-V1-26 their draw-style bar).

| subject | the rule under `NG` | its `NG` entry | reference |
|---|---|---|---|
| stage 2 | S7c, the seed primitives, S9b, the local-place step and the hood pins run, each by the rows below | `fabric.extensionWeight` 1 | — |
| fabric (S7c, in town and standalone) | the four NG rows at their `select.ngOdds`, each kept only when eligible, in place of V01 §3.3.3's product; the seven context rows 0 | `ng.fabric` on | random template weights |
| typed squares | none: S9b types no square (the base's S3, S7 and S7b squares stand); `sq_b` 0 in V01 §3.5.9's `λ_b` | `ng.squares` on | the dispatch (§2.5) |
| manors | count `⌊1 + u × (⌊B ÷ 8⌋ − 1)⌋` over D's `B` candidate blocks (0 below 8 blocks; 0 when `secular`); weight 0 below the compound's minimum plot area, else `1 ÷ (block area × its OBB area)` (the smallest eligible blocks favoured); after each pick every remaining weight × its distance to the picked block — in place of V01 §3.5.5's quota and weights | `ng.manors` on | the manor count and choice |
| small blocks | every candidate of area ≤ `smallBlockM2` typed `yard` (NG's empty blocks); a yard paved with probability `area ÷ OBB area`, else grassed with a grove at the tree coverage; `yd_b` = `land.smallShare` in `λ_b` | `ng.smallBlocks` on | the empty-block rule |
| greens | only at a ring's centre (the centre rule's equal odds); no sub-block green quota; `gr_b` 0 in `λ_b` | `ng.greens` on | the ring centre |
| court greening | a court greened exactly when its block's frontage ring is complete (every plot fronts a way), in place of §4.9's court-greening row's band probability | `ng.courts` on | the court green (item 58 (b)'s anchor) |
| hood pins | only on `yardBlock` sites, one per yard block — the block's midline at half its short side from one end (a coin for the end) — one weighted pick among {none (a plain yard) 1, well 1, large tree at the tree coverage, fountain 1}, the district the decay's scope (each picked kind's weight ÷ 10 for the rest of the district), the pin placed with probability `(area ÷ OBB area)³`; each pin at its row's `sizeM` | `ng.pins` on; `pin.decayScope` `'district'` (P20) | the empty block's pin |
| plaza size | by the size tag — small, medium, large at the side ratio 1 : 2 : 4, areas `ng.plazaM2` in place of V01 §3.4.5 (a)'s law; a standalone neighbourhood document's tag its size chip, an in-town district's the chip whose `size.*` count lies nearest its allocated household count (a building per household at NG's scale — S8 lays the plaza before any building exists) | `ng.plazaByTag` on | the plaza size by tag |
| item 110's neighbourhood rows (the series flag, `terrace.askGain`, the precinct multi-ring, the hillside default, the flatter-square tie-break) | off — the context rows are 0, S9b types no square and a hood is flat; these switch cells and the base's item-110 rows take `MFCG`'s off values (T-V1-4) | none | — |
| everything else | the base's rules and this volume's geometry, each cell as `MFCG` resolves it | none | — |

### 3.16 Services other volumes call (`@plat/hood`)

Pure, draw-free functions of committed state, memoised per commit, each ≤ 1 ms per call at CITY (V01 §6):
* **`catchmentOf(plot, unit, per?)`** — the plots in a plot's catchment for item 103 (f)'s coverage (V11's
  `CoverageSpec.unit`): **`district` and `neighbourhood` are one unit, the district a close-up opens** (J-V1.35) — the
  plots of the plot's district; `walk` — the plots whose front points lie within `per` metres of the plot's front point
  along the way graph (L1 spines and L2 corridors — part 0, each raised road one edge between its ends, never an
  aqueduct; V01 §2.3); `households` — the plots of the nearest `per` households by the same metric (ties by plot id);
  `settlement` — every plot of the town; `parish` — the plots whose nearest parish-church member (by the same metric) is
  the same member, or, before one is placed, the district. **On the other arenas**: for a plot on an underground arena,
  `walk` and `households` read volume 4's `underDistance` (V04 §3.6a (1)) in place of the way-graph metric, and each
  undercity neighbourhood and the underground pseudo-district (the sewer-front neighbourhoods and F6's void dwellings)
  is its own `district` unit (V04 §3.6a (5)); on a sky arena the island is one `walk` unit (V05 §3.5 (3): the route to
  the ground passes every walking radius), its districts its `district` units. A plot with no way within `per`
  (`walk`) or fewer than `per` households in its arena (`households`) has every plot it can reach as its catchment, and
  always itself. Callers: S10a / S10b's coverage term (V11's `cov/<class>` rows, the base solver), volume 10's
  explanations, volume 9's coverage view.
* **`districtsAbove(part, element)`** — the area overlap of an underground element's projected footprint with each
  surface district, shares descending, ties by district address; an element whose footprint lies under no district (the
  hinterland, water) returns the empty list. **An undercity neighbourhood's `parent`** is II.7.5 (2)'s — the surface
  district above the largest share of its main chamber in plan, ties by address — computed as the first entry of
  `districtsAbove(part, District.core)` (II.7.5 (2)'s one rule; this volume states no rule of its own); volume 4's U-CITY
  C5 writes it through this call. `DistrictContext.under` is this service's inverse for D. Callers: volume 4 (C5's
  parent), V11's `naming.ruin` rows ("the ruins under the old quarter"), volume 10, volume 9's voids view.
* **`fabricSignature(region)`** (J-V1.78) — the town side of volume 12's paired measures over a region
  (`FabricSignature`, V01 §2.3), each computed by V12 §3.4's definition, `null` where V12 reads `notApplicable` (a region
  with no built block or no part-0 way). V04 §3.5.0a (7) calls it with a ruin's outline and tests the ruin's plan
  against it by V12 §3.6b's `paired` margins, and V11's culture rows read it likewise (J-V11.30); the test and its
  margins are theirs, cited, never restated — template fabrics are measured like any (a ring over a radial citadel, a
  main street over a grid).
* **`skyDistrictCount(plotLandM2, districtHa)`** — `clamp(⌈plotLandM2 ÷ (sky.plotShare × districtHa × 10 000)⌉, 1, 3)`,
  `plotLandM2` in m², `districtHa` in hectares, `sky.plotShare` the `hood.constants` cell (V01 §3.14): the one count of a
  sky island's districts; `plotLandM2` 0 gives 1. Callers: the unit runner (V01 §3.10.3 (2)), volume 5's unit inputs (V05
  §2.3) and its coverage units (V05 §3.5 (3)'s k), each through this call, never a copy of the formula; volume 5's fill
  and coverage overshoot read the same `sky.plotShare` cell (V05 §3.5 (2)–(3)), not the count.

One **writer** other volumes call: **`plantRimWalk(doc, island)`** — the rim walk's one planting (V01 §3.10.3 step 4): it
writes the island's `esplanade` and `street_trees` pair into the calling commit's batch, a function of the committed rim
strip and §4.9's street-tree row, draw-free, ≤ 0.2 ms per call (V01 §6). Callers: the unit runner (V01 §3.10.3 step 4)
and volume 5's resize and rim reshape (V05 §4.2), each once per event; never a district's S12b.

### 3.17 Item 110 inside the neighbourhood — terraces, walls, raised ways, deck plots (item 110)

Item 110 is base design, built at M3a: the `RetainingWall` record with S10 and S11's levelling (items 245, 302), the
raised ways on ground parts from 1 with their generator, supports, spans and hand operator (items 244, 290), the deck
plots with their `deck` budget row (item 246), stepped tiers. Each base mechanism is cited, never restated; this section
states what the neighbourhood does with them. With the terrace, raised-way and deck-plot rows off, nothing here acts
(T-V1-4).

#### 3.17.1 The terraced ward (J-V1.60–J-V1.62)

1. **The state.** `terraceState(D)` (V01 §2.3) says whether D is terraced: declared (`District.terrace`, item 211), else
   the relief rows' `terracedEdges` cell at the site's relief class (volume 11; item 110 (a)'s "when the relief row asks
   for terraces"), else an authored S1 `terrace` site primitive (§4.2 S1 (1)) under ≥ `terrace.siteShare` of D's area;
   and whether walls may stand (`walls`: `slope.meanPct ≥ 100 × terrace.slopeMin`). It is pure and draw-free, computed
   from records eager at S6's end, so S7c, the base's district-edge source and the elevated-road generator's terrace
   endpoints (V06 §3.19.3; item 290) read one value, and none reads `District.fabric` (no cycle with S7c).
2. **The layout.** S7c's `stepped` weight gains the factor `(1 + terrace.askGain × asks)` (V01 §3.3.3); the `stepped`
   row lays a contour series, and over a ravine a thalweg path with a series per flank (V01 §3.4.3). A terraced ward is
   declared by name as a quarter with `fabric: 'stepped'` (the Terraces card) and `terrace: 'on'` (items 349, 350) — the
   form the second known-city fixture's ravine quarter declares (T-V1-54; V10's transcript).
3. **The walls inside the ward are the base's.** Each block between two contour streets holds two plot rows back to
   back, each levelled by S10 and S11 to its own fronting street (item 110 (a)), so the rise between the streets is held
   at the blocks' rear lines by base-produced walls wherever the step passes `terrace.stepMinCm` on ground steeper than
   `terrace.slopeMin`; between the `stepped` row's `slopeMeanPct` and `terrace.slopeMin` the ward takes no edge wall and
   the base walls only its units steeper than the threshold, so its terraced streets stand mostly without walls
   (V01 §3.6 (8)).
4. **The ward-edge wall is the base's district-edge source** (item 302; J-V1.61: one producer for every generated wall
   line). It runs for D when D's fabric declares `terracedEdges` (item 506: `FabricStrategy.levelledUnits` and
   `terracedEdges`) and `terraceState(D)` has `asks` and `walls`. **`TemplateFabric` declares `terracedEdges: true` for
   every row and returns from `levelledUnits` exactly what the bent cut returns for the faces it cut — their blocks,
   their plots and the ward** — since every template runs the bent cut on its remainder (V01 §3.4.2 (e)); the placement
   rule is §4.7 S10's. This volume supplies the inputs and reads the walls: lines the seeds respect when held
   (V01 §3.17.2), splitters of court sites (V01 §3.8.2), marks (V01 §5.1), export rows (V01 §5.3), why answers
   (V01 §4.5) and the fates of a dry run (V01 §3.9). Where D's edge runs along a cliff or gorge closure arc (a hard
   `cliff` seam, V01 §3.6 (7)), the cliff face holds the ground and no ward-edge wall stands on that run (item 302: none
   stands on a hard run).
5. **Crossings.** Every way crossing a wall — a contour series' cross lane, a portal lane over the ward-edge wall, any
   bent-cut lane — is a stair or a ramp by the way-class crossing row (`ways.crossing`, volume 11; item 110 (a): "never a
   gap in the wall"), an interval attribute of the way at the wall that changes neither its shape nor its name (V01 §3.6
   (3)).
6. **Naming.** Contour streets carry `terraceIndex` (V01 §3.7.2); the district's naming features gain `terraced`
   (V01 §3.7.4).
7. **Courts across a wall.** A court residue (§4.7 S10 (6)) that a wall crosses is one residue in two or more level
   pieces: the hood pins read one site per piece (V01 §3.8.2 step 1), the greening makes one draw and plants every piece
   (V01 §3.5.7), and its place is one record labelled on its largest piece (V01 §3.7.1).

#### 3.17.2 Held walls in every re-derivation

1. **A fixed input.** A declared `RetainingWall` (source `declared`, item 245: drawn with T3 `wall` in its `retaining`
   kind or a T2 terrace stroke's edge) is held (item 110 (a)): V01 §3.5.12's fixed input (5), kept by every re-derivation
   of the district it lies in — a replace close-up, New random, a content edit's scope, an epoch.
2. **Seeds.** A held wall is a line, not a hole: V01 §3.4.2 (d)'s validation keeps every seed from running within
   `eLo / 2` of it along more than `eLo` of its length; a seed crossing it at ≥ 45° is allowed and takes a stair or ramp
   interval by the way-class crossing row. A generated wall is re-derived with D's S10, after S8, so it constrains no
   seed.
3. **The chunk.** V01 §3.8.3's inputs digest holds every wall, strip and pier inside or on D's faces and the deck plots
   D owns, so a wall drawn across an opened court stales the chunk and the re-derived pins clear the wall.
4. **The dry run** lists each generated wall added, removed or moved and each declared wall kept among its fates
   (V01 §3.9).

A held wall locked by the user and then crossed by a replace close-up's seed keeps its line; the seed takes F-TEMPLATE's
rungs (V01 §3.13). A declared wall of zero length or one self-touching after the dry run's snap is bent by §7.1's dry run
before it commits (item 245), so no degenerate wall reaches stage 2.

#### 3.17.3 Raised ways in the close-up (J-V1.65)

1. **Committed inputs.** A raised part — item 110 (b)'s viaduct, elevated road or aqueduct on a ground part ≥ 1 —
   generated or declared, is committed before S7b (1) (item 290) and is an input of every stage-2 step. This volume never
   creates, moves or removes one: the generator's reason, chance, cap and rung bars are the base's and volume 11's rows'
   (item 110 (f)); this volume owns the bars inside a close-up (T-V1-51). Its piers are those item 244's support step
   lays, which this volume's crossings and under-deck strip read (J-VI.27).
2. **The under-deck strip.** The part's ground projection — its piers and spans over the deck's width plus
   `raised.stripMarginM` each side — is a **hole** in the faces it crosses, as an S7b claim is (V01 §3.4.1): where it
   crosses a face from boundary to boundary it cuts it; no plot, block interior, seed or hood pin lies in it; the base's
   arch vaults (II.7.6; volume 4's `vault` spans) fill it where they exist, and an `open` span stays open ground, a way
   passing under it or bare ground (item 110 (b): "the spaces between piers stay open or hold the base's vaults").
   `DistrictContext.areaM2` and the pre-claim template face exclude it.
3. **Crossing under an arch.** A part-0 way this volume lays (a seed, a fan, a bent-cut lane) crosses a strip only
   through an `open` span (the span's `use`, an eager base fact; item 244's span rule) whose clear width is ≥ the way's
   width + `raised.clearWidthM` and whose soffit meets item 244's clearance rule for the crossed way — the way's held
   `clearanceCm` first, else volume 11's `raisedWays.structure.clearanceCm` for the crossed class (cart or foot) —
   within ± `raised.squareDeg` of square to the deck; never along the strip, never through a pier. A seed that would
   cross elsewhere takes F-TEMPLATE rung 1 (redraw), then rung 2 (its crossing shifted along the strip to the nearest
   qualifying span); a bent-cut lane takes §4.6's ladder and, finding no span, ends at the strip's edge as at a
   reservation.
4. **Ends.** Each ramp or stair end is a ground vertex on part 0 (item 110 (b)); V01 §3.6 (4)'s portal gap applies to it
   as to a bridge end and extends over the ramp's or stair's rise, so no lane joins it mid-rise; it is an ordinary
   junction of its carried class (V01 §2.3's parts table).
5. **Pins.** V01 §3.8.2 step 5's clearance holds every pier footprint and the whole strip: no hood pin stands under a
   deck.
6. **Wall openings are not gates.** An aqueduct's arch through a curtain wall and a viaduct's or elevated road's raised
   gate at deck level are wall openings: no gate portal, no `gate` rank or kind factor, no gate plaza, no wall-side
   feature and no S9b square reads them.
7. **Boundaries.** A raised part never bounds a district (V01 §3.11 (8)).

A raised part whose strip lies wholly on hinterland land-use faces crosses no district: stage 2 reads nothing of it (the
span stays open by J-C4's rule). A strip that covers a district's whole template face leaves D with no template face
(V01 §3.3.2).

#### 3.17.4 Raised-way land and the slot

Generated raised parts are committed before S7b (1) — the viaduct inside S4's route solve, the elevated road and the
aqueduct at S6's end (item 290) — so S7b (1)'s capacity subtracts the strips inside each district and no household is
ever allocated to strip land. **A raised part added by an edit** — T4 `road` with `raised`, or the aqueduct class —
removes the plots under its piers and strip by least disruption (the adding edit's fates), and their households are
re-homed in the order V01 §4.1's content edits use: D's other blocks first (the join maximum lowered one step, §4.7 S10
(7)), then the first district in S7b's order whose capacity holds them; the bend is named in one line ("the new aqueduct
takes 6 houses; 22 households move to Tanners' Row") and no household is stranded (T-V1-12's fixture). **At an epoch**
(J-V1.79) the plots and households under a new strip are **volume 6's clearing** (V06 §3.19 (7)): its `raisedWays` step
clears them before the raised way's commit, its households going through the engine's ledger and `siting`. The commit's
operator — this subsection's add path — then removes the strip's plots as for an edit (V06 §3.19 (7)–(8)), finding the
buildings already cleared and the households already in the engine's ledger, so its re-homing moves nobody; the
`hood.fabric` participant re-derives only the crossed districts' fabric reading and hood pins over the committed plot set
(V01 §3.3.6 (3)).

#### 3.17.5 Removing or adding a raised way (J-V1.67)

1. **The base's edit.** Both are the base's (item 110 (b); a removal of a generated part is a suppression, item 260,
   that holds through regeneration). This volume re-derives every district whose part-0 ways, strip holes or plots the
   edit changes — the crossed districts and those of the detour by which the base re-routes a cut route — each from S8
   with §7.3 item 1's seam exception, and adds its lines (fabric bends, dispatch changes) to the base edit's dry run.
2. **The suppression's one reader** is the base's raised-way generator: a Re-derive from S4 or S6 lays no raised part
   where one holds. This volume reads only the committed way set.
3. **The freed strip** is re-plotted by D's S8 re-derivation and the template face grows. A fabric that had fallen back
   for want of room is laid again from the row S7c's keyed pick recomputes (the fabric why provider's reading, V01 §4.5),
   when the committed fabric lies on that pick's fallback chain and D's fabric path is not edited — never re-drawn.

An undo of the removal restores the part and its strip, and the districts it re-derived return with the removal's undo
record (§7.4); a redo re-applies it. A raised way is map-derived (item 20 (h)): a dossier change reaches a generated one
only through the base generator's rows (DR34, DR35) at the fold that re-derives it (§7.7), which this volume reads as
committed state.

#### 3.17.6 Deck plots (J-V1.68)

1. **The owner.** A deck's plots and its placed landmarks (item 110 (d): frontage plots along the deck's way on a mole,
   a pier or jetty, a quay platform or a part-0 bridge deck; towers and forts at mole heads and mid-mole) belong to one
   **owning district**: for a mole, a pier or a quay platform, the district whose land face holds its root vertex (where
   its way leaves the shore); for a bridge, the district at its **intramural end** — the end whose district lies inside
   the town's outermost enceinte — else `Bridge.deck[0]`'s when both ends or neither do; a root vertex on a shared chain
   goes to the district of the smaller id. They count in the owner's `inhabitants`, its S10a allocation and its identity
   reading, and S7b (1)'s capacity of the owner adds the deck row's expected plot capacity, so every household on a
   bridge is in one district's allocation. A bridge over a moat offers deck plots only by item 246's rule (none on a
   `ford` or `draw` bridge, none without a `deckCm`); a fixed moat bridge with a deck belongs by this rule (its intramural end where one end lies inside the
   enceinte, else `Bridge.deck[0]`'s).
2. **No dispatch.** S9b never types a deck plot: it is not a block (V01 §3.5.1).
3. **No hood pins.** No hood-pin site lies on a deck plot — a deck has no ground for a well, a pump, a trough or a tree;
   a mole-head tower or fort is a model landmark, not a hood pin.
4. **The close-up.** The owner's refine close-up includes the decks it owns and draws their plots, buildings (V02 §3.16)
   and landmarks at the neighbourhood band; V01 §3.8.7's frame extends to them; an outline close-up over a harbour opens
   them with their owner (V01 §3.8.9).
5. **One owner per frontage.** The bridgehead template's plaza (V01 §3.4.5) and S9b's bridgehead square stand on land;
   the deck row's first plot begins at the abutment. A quay platform's plots are the deck row's alone: the `quay` row's
   `onEdge` street runs on land and the platform's plots front the platform's own way.
6. **A fallen or ruined deck.** Its plots and buildings take the base's least-disruption fates (item 110 (d); the deck's
   condition its host's, item 246); the owner's chunk re-derives because its inputs digest changed (V01 §3.8.3). No
   hood-pin override hangs on a deck plot, since none stands there.

#### 3.17.7 Unit runs, islands and epochs

1. **No generated raised way in a unit run.** A standalone neighbourhood document and a sky island's districts get none —
   the unit run has no route solver and no water balance, and no aqueduct element stands on an island (V05 §3.22 (5)
   (d)). A declared one is honoured on a standalone document's ground; on an island it is bent by V05 §3.22 (3) (d)
   (J-VI.4 (e): `raised` dropped, the stroke drawn as the island's own way).
2. **The terrace rule on an island.** The island's unit run reads `terraceState` at the island's relief class: its drawn
   class (`terrainEcho.reliefClass`, V05 §2.1; item 251) where `terrainEcho.relief` is `own`, and `plain` where it is
   `echo` or `none` — the echo's quarter amplitude and the dome are no terracing relief (V05 §3.8 (3), §3.22 (4);
   J-V1.94) — and the base's levelling raises its walls on the island's arena (V05 §3.22 (4)). No ward-edge wall stands
   on or along the rim: the rim run is `sky` (hard, which the district-edge source excludes, item 302) and the levelling
   stops at the rim strip's setback line (volume 5).
3. **Epochs.** An epoch that lifts a town to CITY may generate raised ways (V06 §3.19), clearing the land under each
   strip itself (V06 §3.19 (7)) before the commit's operator removes the strip's plots (V01 §3.17.4); opened close-ups
   then read the committed state — the `hood.fabric` participant's item (3) re-derives the crossed districts' fabric
   reading and hood pins, logged in the epoch's diff, with no plot removal and no re-homing of its own (V01 §3.3.6,
   §3.17.4).
4. **Walls over epochs** are the base's district-edge source in whichever S10 lays a district's plots — a new stage's
   growth run or an epoch's re-derivation (V06 §3.19.4 (1)); a surviving district's walls are survivors, their state
   profile item 245's. The `hood.fabric` participant raises no wall.

#### 3.17.8 The aqueduct's terminal

One rule reads either form of the terminal's public outlet (item 110 (b): "to a basin, cistern or fountain"; volume 11's
`aqueduct.terminal`; the record's `terminal`, item 244): a model `Pin` of kind fountain (or the base's basin kind, when
it adds one), or the frontage of a `conduit_house` building (volume 11's class; V02 §3.17 (b)). **The terminal is a
`conduit_house` where the roster (a standalone document) or the dossier (its `aqueduct_or_water_system` record, by
volume 11's mapping; DR34) holds one, else a fountain `Pin`** (J-VI.9), so no institution the dossier does not list
appears. When the outlet stands in or fronts a square face — an S9b square, a template plaza, the main plaza — it is that
square's centrepiece: S11's `SquareRow.centrepiece` draw is skipped for that square (V01 §3.5.10), and V01 §3.8.2 step 2
counts the outlet as a prior pick of kind fountain. Both forms exist before S11 (the pin committed with the aqueduct,
the building by S10a–S10b), so the skip is decided at S11. An outlet in no square adds no centrepiece and skips nothing.
A removed aqueduct (V01 §3.17.5) takes its terminal pin with it; the square's centrepiece is drawn again at the next
re-derivation of its block. Bar: 0 squares with two fountains (T-V1-51 (g)).

### 3.18 Edges — every mechanism at its limits (principle (11))

Every mechanism of V01 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home section.

**(a) Degenerate geometry.** Every step of this volume that commits geometry — S8's seeds and plazas, the unit run's
outline and partition, an island's spans — commits through kernel transactions: a degenerate result (zero-length,
zero-area, self-touching, collinear, coincident) is refused by the kernel (§3.1's `E_DEGENERATE` family; §5.1's general
rule) and taken by the step's failure class on its ladder (F-TEMPLATE, F-UNIT; V01 §3.13). Steps that write attributes
only (S7c, S9b, the local-place step, the surface rule) meet degenerate geometry only as input: a zero-area face or block
is no template face (V01 §3.3.2), no candidate (V01 §3.5.1), no pin site (V01 §3.8.2) and no place host (V01 §3.7.1).
The view's derivations (hood pins, symbols, programs, labels, the frame, exports) skip a degenerate mark — a zero-area
facet, site, hull or label box draws nothing — and never fail a tile. Tests: T-V1-9, T-V1-56.

**(b) Rungs.** Stage 2 is the base product's:

| rung | stage 2 |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | no S7c, no S9b, no refine or outline close-up, no hood pins or places: the village product registers neither hook and has no stage-2 close-up (V07 J-V7.24); the `hatched` family draws the village's own records at its four bands by V01 §5.1.1's rows with no stage-2 marks; a village that grows into the town ladder takes its fabrics and block contents from the first S7b and S10a the base product runs on it |
| TOWN | stage 2 whole, except: no raised way generated (item 290's rung gate; a way an epoch carried down from CITY is read as any committed raised part), no quarry-ossuary catacomb entrance (CITY and METROPOLIS only, V01 §3.7.1), no islands (volume 5's gate) and so no sky unit run |
| CITY | stage 2 whole: generated raised ways, quarry-ossuary entrances, islands |
| METROPOLIS, to its population cap | stage 2 whole; the Cemetery network's extramural grounds first among the outline close-up's named sites (V01 §3.8.9); the METROPOLIS budget lines (V01 §6); at the cap the district count is S6's, and no stage-2 quota binds beyond its own rows |
| a standalone neighbourhood document | its `contextRung` (TOWN, CITY or METROPOLIS) selects the rung-scaled rows it reads; its layers are V01 §3.10.1 (7)'s |

Test: T-V1-57.

**(c) Toggles and presets.**

| toggle or preset | stage 2 |
|---|---|
| `MFCG`, `FTG` | `fabric.extensionWeight` 0: every district `bent-cut`, every block `ordinary`, no place, no hood pin, `λ_b` 0; the M4 goldens byte-identical (T-V1-4); a declared fabric, content or place is held and laid (the switch gates what stage 2 derives, never what the author declared, V01 §3.15) |
| `NG` | V01 §3.15's rules (T-V1-4, T-V1-31, T-V1-32) |
| `VG` | the village product's; stage 2 is not registered at its rungs ((b)) |
| `FM` | stage 3's building-scope preset; stage 2 reads it as the default preset |
| the stage-2 switch set to 0 by an edit | V01 §3.15's switch edit |
| the islands off | no sky unit run, no strip or `shadeSky` read, `shade.islandShare` absent |
| the underground off | no opening pass, place, access symbol or `under[]` entry; no void part in a standalone neighbourhood document |
| item 110's rows off | nothing of V01 §3.17 acts; byte-identical to the build without them (T-V1-4's no-op pin) |
| the `pins` and `trees` layers; the style's `details` and `shadows` | view only (V01 §5.1.2, §5.1.3) |
| GeoJSON `closeup: true` | hood pins exported as presentation features (V01 §5.3) |

Tests: T-V1-4, T-V1-56 (c).

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's six cells are V01 §2.7's and every event's
V01 §4.4's; every derived view (the list after V01 §2.7's table) is recomputed on load, undo, redo and regenerate and
never stored, so none goes stale in a save; the close-up chunk is non-canonical and dropped on mismatch (V01 §3.8.3).
Tests: T-V1-19, T-V1-34, T-V1-55.

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory data
(E5), and the degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| identifiers and tables (V01 §2.1, §2.2) | a `fabric` row id no table holds (a later version's, or a row an `editTable` removed); a `fallback` naming an absent row; a band with no row | the district reads `bent-cut`, reported (§7.5's table-row migration); V11's compiler refuses such a table (its reference check), so none loads; the band interpolates (item 27) | substitute; check | T-V1-55, T-V1-56 |
| `DistrictContext` (V01 §2.3) | no portal, water, wall, chain, record or landmark; no island shade basis; `under` before the tail | each list empty or each value 0; `islandShare` absent; `under` is read only after the tail | check | T-V1-35, T-V1-56 |
| request, result, report (V01 §2.4) | a regenerate or undo after a run | the report is recomputed with every run and written to the generation report, never stored | — | T-V1-55 |
| stage graph (V01 §3.1) | a town of one district; a town with no district S7c lays | S7c and S9b run once; nothing written | — | T-V1-56 |
| χ̃ (V01 §3.2) | an allocation with no instance; more rows than §6's 100; a town with no arterial frontage; a row whose class the roster no longer holds | zero plot mix, no anchors, identity `plain`; computed over every row, §6's fallback taken; trade 0 in every district (a largest sum of 0 gives 0, never a division); resolved by §7.5's table-row migration before S7b allocates it | check | T-V1-2, T-V1-56 |
| S7c (V01 §3.3.1–§3.3.3) | no district to lay; one eligible row; every non-`bent-cut` weight 0; `slope.meanPct` 0; an absent kind factor | nothing written; that row or `bent-cut` by the draw; `bent-cut`; the `stepped` factor 0; κ = 1 | substitute | T-V1-4, T-V1-6, T-V1-56 |
| the standalone `auto` (V01 §3.3.5) | a degenerate outline | F-UNIT repairs it before S7c; `bent-cut` is always eligible | repair locally | T-V1-20 |
| the epoch participant (V01 §3.3.6) | no new face, due block or scope; one new district; a zero-area new face; an absent `scope.recut` or `scope.raised` | nothing written; S7c once; volume 6's growth decision types no zero-area face, so S7c never sees one; read as empty | check | T-V1-39, T-V1-56 |
| template land and the reconcile (V01 §3.3.7) | a face too small for any seed; a capacity the subtraction takes below 0; households no district can hold | `templateLandM2` 0; capacity 0, the households moved; S7b's unplaced tail, reported by F-SITING (§5.2) and counted by T-V1-12 | leave out and report | T-V1-12 |
| the template face (V01 §3.4.1) | one qualifying face; every face a hole, strip or zero-area piece; a face in no district | it is the template face; no template face, F-TEMPLATE's chain ends at `bent-cut`; never a template face | substitute | T-V1-9 |
| portals and anchors (V01 §3.4.2) | no usable portal; one usable portal; an unreachable landing attach or deck end | the spine's anchors are the `axis` ends; a spine needing two anchors takes the `axis` ends; F-TEMPLATE's last rung lays a lane to it | simpler shape | T-V1-8, T-V1-21 |
| spine, series, ring, plaza, fan (V01 §3.4.3–§3.4.6) | a chord below `2 × eHi`; flat ground under a series; `R ≤ eLo`; `landmark.maxRings` reached; 0 inhabitants; no void junction; fewer portals than a fan's minimum | no spine, the row bends; level 0 alone; no ring, the row bends; the precinct series ends, reported; the plaza at `minM2`; no void square, reported; every portal there is, or none | substitute; leave out and report | T-V1-7, T-V1-8, T-V1-9, T-V1-38, T-V1-56 |
| the rows (V01 §3.4.7) | a table holding only `bent-cut`; a seeded row whose seeds all lay nothing | every district `bent-cut`; the bent cut on the whole face, reported as rung 4 | substitute | T-V1-56 |
| unit runs (V01 §3.4.8, §3.10) | a unit of one district; a degenerate outline | the partition makes one district; F-UNIT (V01 §3.13) | repair locally; substitute | T-V1-20, T-V1-21 |
| S9b and its quotas (V01 §3.5.1–§3.5.2) | no candidate block; 0 inhabitants; one candidate; quotas above what the candidates hold; a band or kind factor missing | none typed; every quota 0, phase 2 only; it alone is weighed; the unmet remainder rolls and is reported (F-DISPATCH); interpolated (item 27), a missing kind factor 1 | leave out and report | T-V1-11, T-V1-56 |
| squares, greens, manors, phase 2 (V01 §3.5.3–§3.5.6) | no candidate for a type; one; an empty fit band or no compound class; every remaining manor weight 0; no small block | its quota rolls to the next type, the last remainder reported; it is taken if it fits; M 0; the draw stops, the unmet manors reported; phase 2 types none | leave out and report | T-V1-10, T-V1-11 |
| the seam guard (V01 §3.5.8) | no soft seam; no district across | the guard does not apply | — | T-V1-13 |
| downstream (V01 §3.5.10) | a district with no typed block; a typed block whose residue face is zero-area | every block takes the base path; the block stays `ordinary`, reported | leave out and report | T-V1-56 |
| fixed inputs (V01 §3.5.12) | none; one; a dossier change removing the record behind one | nothing held; it is held; released at the next re-derivation of its block, a user's lock or pin on it reported orphaned | — | T-V1-18, T-V1-47 |
| context features (V01 §3.6) | no context run; a run shorter than `feature.runM`; a closure-only arc | none, nothing reported; the feature not applied there; typed by II.1's seam typing | — | T-V1-22 |
| places (V01 §3.7.1) | no square, green, yard or large court; the underground off; a court below `court.nameMinM2`; a host removed; a dossier-owned name | no place; no opening pass; no place; tombstoned, its name archived; the dossier's name kept | — | T-V1-24, T-V1-46 |
| the naming context (V01 §3.7.2) | a way with no feature | a proper name | — | T-V1-24 |
| surfaces (V01 §3.7.3) | a way with no fronting block; an era with no row | the row at the pass-2 value at its midpoint; the rows without `era` | — | T-V1-25 |
| the trigger and frame (V01 §3.8.1, §3.8.7) | a click on no district (water, off the map); a district with no footprint | nothing opened; the frame is its boundary | — | T-V1-15, T-V1-23 |
| hood pins and the cache (V01 §3.8.2, §3.8.3) | no site; `pin.cap` reached; one pin; a digest mismatch | no pin and an empty chunk; each site's probability capped; one; the chunk dropped and re-derived | — | T-V1-15, T-V1-26, T-V1-31 |
| staleness, overrides, persistence (V01 §3.8.4–§3.8.6) | a document with no `closeups` block; an undo, redo or load | default params; the chunk stale by its digest | — | T-V1-19, T-V1-55 |
| access symbols (V01 §3.8.8) | an access with no stored state | the derived reading, else `open` | — | T-V1-46 |
| the outline close-up (V01 §3.8.9) | an outline over nothing; over one district; a degenerate outline | nothing, one line; that district's close-up; nothing, one line | — | T-V1-15, T-V1-56 |
| the replace close-up (V01 §3.9) | the district's own card; a card not eligible on the committed face | the refine close-up, no edit; its fallback chain, named | substitute | T-V1-18 |
| the standalone neighbourhood document (V01 §3.10.1–§3.10.2) | an edge whose bearing no run faces; a hillside outside the range; a drawn outline F-OUTLINE cannot repair | the nearest run, named; clamped, named; the kind row's `auto` outline, named | repair locally; substitute | T-V1-20 |
| the sky unit run (V01 §3.10.3) | an island without a district's worth of land; a rim strip of zero length | no district, the allocation to F-SKY-UNIT, reported; no rim-walk pair | leave out and report | T-V1-21 |
| seams (V01 §3.11) | a district with no way | every portal `unconnected`, reported | check | T-V1-14 |
| services (V01 §3.16) | an element under no district; a region with no built block or part-0 way; `plotLandM2` 0; a plot with nothing within `per` | the empty list; `null` measures; 1; every plot it reaches, and itself | — | T-V1-42, T-V1-46 |
| terraces and walls (V01 §3.17.1–§3.17.2) | no wall; a declared wall degenerate after its snap; a wall with no step | nothing held; bent by §7.1's dry run before it commits (item 245), never reaching stage 2; step 0, no shadow, no VTT line (§11.1's threshold), the why "no step" | repair locally | T-V1-50, T-V1-56 |
| raised ways (V01 §3.17.3–§3.17.5) | no raised part; a strip over a whole template face; a part wholly on hinterland faces | nothing read; D has no template face; nothing read (its spans open by J-C4) | — | T-V1-51, T-V1-52 |
| deck plots (V01 §3.17.6) | a deck whose owner rule meets no district (`Bridge.deck[0]` in the hinterland) | the hinterland pseudo-district's allocation | — | T-V1-53 |
| editing (V01 §4.1–§4.4) | an edit on a target a dossier change removed; an edit under a parity preset | orphaned, reported (§7.4); a declared value held and laid ((c)) | — | T-V1-34, T-V1-40 |
| why providers (V01 §4.5) | a subject no provider covers | volume 10's provider for its kind | — | T-V1-37 |
| rendering and labels (V01 §5.1, §5.2) | an empty tile; a single wing; a sheet lacking a stage-2 program; a district with no name yet; a label fitting no candidate | the base marks only; its facets hatched; the base program (V01 §5.1.6); the identity label alone; dropped by §9.4's floors | — | T-V1-26, T-V1-28 |
| exports (V01 §5.3) | a scope with no stage-2 content; a close-up never opened | the base's content only; derived for the export, never stored | — | T-V1-33 |

**(f) Where this volume's features meet another unit's at their limits** (at TOWN, CITY and METROPOLIS unless a row says
otherwise):

| combination | outcome | test |
|---|---|---|
| a cliff and a district (a hard `cliff` run, item 106) | the run is portal-free; the district's plots back onto its setback line (the rear-plot rule), no wall street, no template face across it (V01 §3.6 (7)) | T-V1-45 |
| a cliff and a terraced ward | no ward-edge wall on the cliff run (item 302: none on a hard run); the levelled plots back onto its setback line | T-V1-50 (a) |
| steep ground and a terraced ward | levels closer than `terrace.minGapShare × s` clipped, the series stopped at `terrace.maxLevels` (reported), level 0 unlaid → F-TEMPLATE to `bent-cut`; the walls the base's | T-V1-50 |
| a coast and a district | the shore run is `water`: the bank path, the rear-plot water rule or a quay (V01 §3.6 (1)); the water face never a template face | T-V1-22 |
| a coast and a terraced ward | no ward-edge wall on the shore run (hard); the contour streets end at the shore setback; the waterfront feature as above | T-V1-22, T-V1-50 |
| a moat and a district | the moat is the enceinte's reservation, outside every district: the district reads its `wall` run (wall-side, V01 §3.6 (2)), never a `water` run; a gate's moat bridge ends outside the wall strip, so the district reads the gate portal, and a bridge portal only where a landward end lies on its template face | T-V1-22 |
| a moat and a terraced ward | no ward-edge wall on the `wall` run (hard) | T-V1-50 (a) |
| a bridge and a terraced ward | the bridge's end is a part-0 junction ranked as a bridge portal; a lane crossing the ward-edge wall there takes a stair or ramp interval, never a gap; its deck plots belong to the intramural end (V01 §3.17.6) | T-V1-50 (e), T-V1-53 |
| a raised way and a district's close-up | V01 §3.17.3: the strip a hole, crossings only through qualifying `open` spans, no pin under a deck, no junction with a part-0 way | T-V1-51 |
| an oasis and a district (item 111) | its spring pool is water for every rule that reads water (item 111): a `lake` body for the waterfront feature and the rows' `waterShare`; its grove and irrigated gardens are land-use and greenery faces, never built land — no template face, no S9b candidate; item 111's well weighting is S10b's model pins, which the close-up counts as prior picks (V01 §3.8.2 step 2) | T-V1-58 |
| an oasis and a terraced ward | no ward-edge wall on the pool's shore run (hard); the contour streets end at its setback | T-V1-58 |
| the map frame and a district (a `frame` run) | hard and portal-free; the margin band lies along it, so no plot fronts the frame (in a standalone neighbourhood document the outline itself, V01 §3.10.1 step 6) | T-V1-20 |
| the map frame and a terraced ward | no ward-edge wall on a `frame` run (item 302); the levelling stops at the margin band | T-V1-58 |
| a terraced ward and a lock | a locked or pinned plot is a fixed input: its face a hole the series avoids (V01 §3.4.1, §3.4.3), its plot and site kept by every re-derivation (§7.2); the walls round it are the base's levelling's | T-V1-18 |
| a terraced ward and save and load | `District.terrace` and the walls persist in their leaves; `terraceState` and `stepProfile` are recomputed on load; a load re-derives nothing (byte-identical) | T-V1-55 |

## 4 Editing

Stage 2 adds **no event kind**: every stage-2 state is edited by §7.1's existing events, each with its dry run, fate
report, one undo step and migration (§7.1–§7.5), and every tool is one of the twelve with at most one new parameter
(§7.1's "a new capability adds a parameter to an existing tool, never a thirteenth tool"; item 272). **No wrong answers**
(item 101 R2; J-V1.50; J-VI.4): every dry run below **bends** a request to the nearest lawful one and says so in one
gentle line; it refuses only what item 20 forbids (a dossier fact) and what a lock protects (a locked or pinned entity),
and then offers `rejectSite` or "unlock first" (§7.7).

### 4.1 What is edited, by which event and tool, with its effective scope

| state | event(s) | tool (layer) | effective scope (§7.3) and what stays byte-identical | the dry run's bend (refusal only for a dossier fact or a lock) |
|---|---|---|---|---|
| a district's fabric (a layout card) | one undo group: `setAttr(D.fabric, r)`, then `regenerate({ ids: [D] }, 'keep')` | T8 `fill` with `fabric` (L3) | D from S8 with the seam exception (§7.3 item 1, item 369), plus the cross-arena consequences volumes 4 and 5 declare for a ground edit (V01 §3.9); every other district byte-identical outside it (II.4) | an infeasible template is **bent** to its fallback and the bend named ("Rings did not fit this district's shape; laid as a square instead"); a template the locks and V01 §3.5.12's fixed inputs leave no room for bends to `bent-cut`; a catacomb source in D stays (V01 §3.9) |
| a template's parameters (plaza size, void square, quay on the water, ring jitter, through radials, street width, terrace spacing) | `setAttr(D.fabricParams.k, v)` + `regenerate` (grouped) | T8's "more" (L3) | as above | a value outside the row's `range` is **clamped** to it, the bend named ("plaza size capped at twice the default") |
| `Auto` layout | `setAttr(D.fabric, 'auto')` — it clears the path's edited mark (§7.2), so S7c's rule sets the fabric again — + `regenerate` (grouped) | T8 (L3) | as above | — |
| same layout, new seed | `regenerate({ ids: [D] }, 'newRandom')` | T10 `hold` (L3), shift+click (§14's keymap) | D from S8 (its fabric kept, V01 §3.12), with V01 §3.9's cross-arena consequences | — |
| a block's content (houses, manor, square, green, yard) | `setAttr(B.content, c)` (and `setAttr(B.squareType, t)` for a square) | T9 `shape` on a block (L3) | D from S10a (iii) with recorded rerolls: S10a (i)'s placements kept (a field-driving item standing on B itself re-placed by (i)'s scoring on D's other candidate blocks), S9b not re-run (every other block keeps its content), S10a's distribution re-run for D — and for the receiving district when D cannot re-house B's households — so only blocks whose allocation changes re-derive; B's content held (declared) | B's displaced households are **re-homed** by S10a's re-homing order (§4.5 (5)): first D's other blocks with the join maximum lowered one step (denser plots, §4.7 S10 (7)), then the first district in S7b's order whose capacity holds them, named in one line ("14 households move to the Weavers' quarter"); a `manor` edit with no household of the top band in D's range **bends** to the largest residential class the band range admits ("typed a large house: no household of the rich band lives here"); a catacomb source or entrance plot on B is allowed, its closed source named (V04 §3.5.1 (8): the complex frozen — no growth, `fill` unchanged, every gallery kept; V01 §3.9); **refused** only for a locked, pinned or dossier-backed plot on B → "unlock first" / `rejectSite` offered |
| a square's function | `setAttr(B.squareType, t)` | T9 `shape` | B's S11 centrepiece re-drawn by the new row; its place renamed by §6.3 case (4), listed | `t` not sited for B (V01 §3.5.3) → bent to the nearest sited type ("not at a main junction; typed a well square") |
| a way's surface | `setAttr(W.surface, s)` | T9 `shape` on a way (L3) | display only (no geometry); the edited path held against V01 §3.7.3's rule | — |
| a local place's name, knowledge, label | `setAttr(P.name)`, `setAttr(P.knownTo)`, `moveLabel`, `hideLabel`, `delete(P)` (removes the name, never the place) | T11 `name` (L4) | the place's label; uniqueness by §9.6 | a dossier-owned name → refused as `dossier-owned`, with the display text offered (§9.1) |
| a new local place (an unnamed court, yard or square) | `setAttr(P.name)` on a new `HoodPlace` minted from the event's `seq` | T11 `name` on the unnamed face (L4) | the new place and its label | a duplicate name → bent to the next unique form (§9.6) |
| a hood pin (a close-up's well, tree, fountain …) | `instance { entity: B, ordinal: 'hood:<n>', op }` — `move`, `remove`, `restyle` (its `InstanceStyle.pinKind` may change the kind, item 421); preceded in the same group by a `closeup` event when D has no `CloseupRecord` | T9 `shape` (L3): drag, delete, restyle | the pin alone; the close-up's cache chunk re-derived (§8.10's resolution) | a move off B's faces → the nearest point on them |
| a new hood pin | `instance { entity: B, op: 'add', point, style: { pinKind } }` (user ordinal `u<n>`; with the `closeup` event when needed) | T6 `place` with a **furniture** stamp (L2; items 272, 349) | as above | a point on a footprint, an access symbol or a way corridor → the nearest clear point |
| how busy the close-up is | `closeup { district, strategy, params: { pinGate } }` | T12 `dress` (L4): a quieter / busier slider on the close-up panel | the close-up's derived pins only | `pinGate` outside [0, 2] → **clamped** to it, the bend named |
| the close-up's framing | the style's `closeup.vignette` (`setStyle`) | T12 `dress` | style only | — |
| opening any area (the outline close-up) | none — a view action (V01 §3.8.9) | the view's open gesture (rectangle, lasso, a named site; volume 9 lays it out) | nothing in the model | a degenerate outline opens nothing, named in one line |
| the stage-2 switch (`hood.constants` · `fabric.extensionWeight`; V01 §3.15) | `editTable` on `hood.constants`, or `editPreset` on the active preset's entry (§7.6) | the tables editor or the presets dialog (§7.4's row) | a Re-derive from S2 with carry-over (V01 §3.15, *The switch's edit*; V01 §4.3): what the stages before S2 commit byte-identical; the held inputs kept (§7.2) | a value outside [0, 1] → **clamped** to it (the column's range, V01 §3.14), the bend named |
| a standalone neighbourhood document | `generate` with `Recipe.product = 'hood'` and `Recipe.hood`; later `adjust` of the recipe (Re-derive from S0) | T1 `intend` with `product: 'hood'` (L0; item 272) | the whole document (it is small: V01 §6) with carry-over of edited entities (§6.3) | an outline below one block's area → **scaled up** about its centroid, the bend named (V01 §3.10.1 step 4) |
| a standalone neighbourhood document's outline | `adjust(hood.outline, polygon)` from the outline's handles (points in, shape out, §7.1) | T1 / T2 handles | Re-derive from S0, edited entities carried | not simple → F-OUTLINE's repair shown |
| a standalone neighbourhood document's hillside | `adjust(hood.edges.slope, { bearingCdeg, pct })` (Re-derive from S0) | T1's hillside edge, dragged downhill (L0) | the whole document, edited entities carried | the Terraces card with no slope → the default hillside, named ("laid on a hillside falling south …", V01 §3.10.1); `pct` outside [0, `hood.hillsideMaxPct`] clamped, named |
| a ward's terracing | one undo group: `setAttr(D.terrace, v)` with v `'on'`, `'off'` or absent, then `regenerate({ ids: [D] }, 'keep')` | T8 `fill`'s "more" chip *Terraces: auto / on / off* (L3) | D from S8 with the seam exception, its walls re-raised by its own S10 (item 302); every other district byte-identical, a neighbour's wall profiles recomputed (V01 §3.11 (7)) | *on* where `walls` is false **bends**: the contour streets laid, no wall, one line ("the slope here is too gentle for retaining walls; terrace streets laid") |
| a raised way crossing D (remove a generated one; add one) | the base's edit (item 110 (b): a removal's suppression, item 260; T4 `road` with `raised`, the aqueduct class) | from the neighbourhood panel, routed to the base's tool (T4, L1; volume 9 lays it out) | every district whose part-0 ways, strips or plots change — the crossed and the detour's — each from S8 (V01 §3.17.5); everything else byte-identical | an added part removes the plots under its strip by least disruption and re-homes their households, named in one line (V01 §3.17.4) |
| a retaining wall (draw one; move or delete a declared one) | the base's events (item 110 (a)) | T3 `wall` in its `retaining` kind; a T2 terrace stroke's edge (L1–L2) | the base edit's own scope; for this volume, the chunk of the district holding the wall goes stale (V01 §3.8.3), and in every later re-derivation of it the wall is a fixed input (V01 §3.17.2) | a drawn wall meeting a shared chain is snapped off it to its drawn side (V01 §3.11 (7)) |

Everything else inside a close-up is a base entity edited as one (II.4), with no `closeup` event: lanes and their names
(`setAttr`, `moveLabel`), plots (`split`, `join`, `setAttr`), buildings (`setAttr`, `setEntrance`, …), locks,
assignments, the square's centrepiece pin (a model `Pin`: `setAttr`, `delete`, `instance`), greens (`drawGreen`, the tree
brush). **Demolishing fates over a stagnant catacomb** — from a replace close-up or a content edit — list the
`blockLifted` notice (V01 §3.9); a refine close-up never emits one. An edit whose target a dossier change removed (a pin
on a place the dossier took away) is reported orphaned by §7.4's rule; an edit on a locked target is refused with
"unlock first".

### 4.2 The tool parameters (items 272, 349, 350)

* **T1 `intend`** gains `product: 'town' | 'hood'`. With `hood` its card asks for a shape (the outline templates as
  thumbnails, "by the layout" — the default, V01 §3.10.1 — or "draw"), a size (the chips **small / medium / large**,
  about 85, 700 and 1 050 houses; or a house count; or hectares), what kind of place (the `hood.kinds` cards, all
  district kinds, plus "great houses" and "slum", which are wealth presets, V01 §3.10.1), `leafy` and `secular`, a layout
  card (Auto and the eleven rows) and the wealth and density sliders; an optional water (sea, canal or river), wall or
  **hillside** edge by dragging a side (the hillside's fall, default `hood.hillsidePct`, V01 §2.6; the Terraces card sets
  one when none is given, V01 §3.10.1). It shows no layer toggles (V01 §3.10.1 (7)). It emits `generate` with
  `Recipe.hood` (V01 §2.6).
* **T8 `fill`** gains `fabric: FabricStrategyId | 'auto'` on a district scope, with the row's `params` behind "more"
  (`streetWidthM`, `plazaScale`, `squareVoid`, `quayOnEdge`, `ringJitter`, `ringRadials`, `terraceSpacingM`) and the chip
  *Terraces: auto / on / off* (`setAttr(D.terrace)`, V01 §4.1). It emits one undo group of `setAttr(fabric |
  fabricParams.* | terrace)` and `regenerate` (§7.1's binding, item 349). Its three variations (§7.3 item 10) are the
  district's next three distinct rerolls under the chosen fabric.
* **T6 `place`** gains the **furniture** stamp: the hood-pin kinds of `hood.pins` (well, pump, trough, fountain, large
  tree, statue, monument, bandstand, cross, shrine), dropped on a spot inside an opened close-up; it emits `instance`.
* **T11 `name`** on an unnamed court, yard or square creates its place (V01 §4.1).
* **T12 `dress`** gains the close-up's `pinGate` slider and the vignette choice; its layer toggles (`setLayer`) hide the
  hood pins with the `pins` layer and the block trees with the `trees` layer (V01 §5.1.3).
The canvas, the clerk's tool API and the skeleton file expose these parameters identically (§7.1's three surfaces); a
skeleton's `quarter` carries `fabric` (item 349) and `terrace` (item 350), and a skeleton export writes both back
(V01 §5.3).

### 4.3 Locality, stated as the oracle checks it

* **Opening, closing, re-opening** a district or an outline: no event; the model digest unchanged; the close-up chunks
  and the display deltas are the only products (T-V1-15).
* **A fabric change or New random on D**: every entity outside D's effective scope byte-identical (§7.3's oracle, II.4's
  seam exception with the bounding ways' attributes) — the scope including the cross-arena consequences volumes 4 and 5
  declare for a ground edit (V04 §4.3's ground-edit row, V05 §4.3's island re-read; V01 §3.9), which the oracle predicts
  from those rows; inside, locked, pinned, assigned, dossier-backed entities and V01 §3.5.12's fixed inputs kept (§7.2);
  everything else re-derived with carry-over (§6.3) and its fates listed.
* **A block's content**: D's blocks whose S10a allocation is unchanged are byte-identical (S10–S12b are pure functions of
  the allocation and the blocks' own streams, §4.7); the blocks that receive B's households — in D, or in the receiving
  district when D cannot house them — re-derive from S10 with their recorded rerolls, with the cross-arena consequences of
  those re-cut plots (V04 §4.3, V05 §4.3); nothing else moves.
* **A hood pin**: the block's `overrides` row and the chunk; nothing else.
* **A place or surface edit**: the attribute and its label or marks; no geometry.
* **A terracing change on D**: as a fabric change — D from S8, its walls re-raised by its own S10; a neighbour's walls
  byte-identical, their derived profiles recomputed on read (V01 §3.11 (7)).
* **A raised way's removal or addition** (the base's edit): the districts whose part-0 ways, strips or plots change, each
  from S8 (V01 §3.17.5); every other district byte-identical.
* **A declared retaining wall**: for this volume, the chunk of the district holding it goes stale (V01 §3.8.3); the wall
  is a fixed input of that district's later re-derivations (V01 §3.17.2).
* **The stage-2 switch's edit** (V01 §3.15): what the stages before S2 commit byte-identical; from S2 on, every entity
  re-derived with §6.3's carry-over and its fates listed — the held inputs (§7.2; V01 §3.5.12) kept, the template seeds,
  typed blocks, places and pins stage 2 no longer makes retired, the underground re-derived by its tail with the opening
  pass under the new gate (V04 §4.3's switch row, §3.10), never held byte-identical.
* **A toggle or preset change**: a parity preset reaches stage 2 only through the stage-2 switch and the rows'
  `extension` markers (V01 §3.15, T-V1-4); a layer toggled on or off (the islands, the underground) is its own volume's
  recipe change and re-derivation (V05 §4.2, V04 §4.3), and stage 2, a function of the records that exist, reads that
  layer's records at the re-derivations that change makes and at no other time.

### 4.4 Undo and lifecycle rows (§7.4, item 373)

| event on stage-2 state | persisted where | regeneration | undo | migration |
|---|---|---|---|---|
| `setAttr(D.fabric)` / `setAttr(D.fabricParams.k)` | log; the district's leaf | S7c keeps an edited path; D re-derives from S8 in the grouped `regenerate` | the group's undo: the attribute's former value and D's undo record (its successions reversed, §7.4) | an unknown row id → `bent-cut`, reported (§7.5) |
| `setAttr(B.content)` / `setAttr(B.squareType)` | log; the block's leaf | S9b keeps an edited path; a re-derivation of D from S8 that succeeds B carries the edit to B's successor by the anchor rule, else it is orphaned and reported | undo record: the former content and D's S10a distribution (and the receiving district's, when households moved) | absent → `ordinary`; `market` → `trading` |
| `instance` on a hood pin | log; `Block.overrides` | resolved at each derivation by §8.10's law | inverse (the row removed or restored) | a row whose kind a new table version drops → orphaned, reported |
| `closeup` | log; `CloseupRecord` in `closeups` | kept across D's re-derivations; carried to the anchor successor of a merge or split | restores the former record; the first `closeup` of D is undoable only when no `instance` event on D's blocks with a `seq` above its `since` is live (§7.4's independence check) | `tableVersion` kept within §6.4's window, then migrated with a report |
| `setAttr` / `delete` on a `HoodPlace`; a place created by T11 | log; the place's leaf and naming record | a succeeded place keeps its edited name; a deleted name stays deleted (its tombstone keeps the address); a created place stays while its host face exists | undo record (a created place's undo removes it) | §7.5 |
| `setAttr(W.surface)` | log; the way's leaf | V01 §3.7.3 keeps an edited path | undo record | — |
| `generate` / `adjust` of `Recipe.hood` | the recipe | Re-derive from S0 | the recipe's former value | `Recipe.product` absent → `town`; a class-named kind migrated (V01 §2.7) |
| a `quarter` with `fabric` or `terrace` (skeleton or canvas; items 349, 350) | log (the sugar's expansion) | S7c and `terraceState` keep the declared paths | the expansion's undo | an absent `fabric` → S7c's; an absent `terrace` → derived |
| `setAttr(D.terrace)` | log; the district's leaf | `terraceState` reads it; S7c's weight, the base's district-edge source and the elevated-road generator follow it | the group's undo: the former value and D's undo record | absent → derived |
| `editTable` / `editPreset` on the stage-2 switch (V01 §3.15) | log: the row operation and the confirmed fates (§7.4's row, §7.1) | Re-derive from S2 with carry-over; the underground tail after the ground | the document as it stood (§7.4's `editTable` / `editPreset` undo; the fates reversed) | §7.6's table-row migration |

Redo re-applies each row's event from the log; a replay after a load reproduces it byte-identically (T-V1-34).

### 4.5 The clerk's view and the "why" providers (item 101; volume 10 builds the clerk)

The clerk and the application's "why?" panel read stage 2 through `query` and the oracle under the viewer's key (§9.2,
§11.2). `@plat/hood` registers these **why providers** (V10 §2.13; §2.8's explainer registry, item 270), one provider per
kind or path; each recomputes its answer as a pure function of committed state — never from a stored report, so the
answer is the same before and after a save, a load or an unrelated edit (T-V1-37). The pulls they return name V11's
families (`WhyPull.family`, V10 §2.13).
* **`district.fabric`** (and the section `fabric`) — "declared by the user" for an edited path; otherwise χ̃ over the
  committed allocation, the eligible rows with their weights (the shade and chain terms among them) and the keyed
  uniform. A committed fabric on the recomputed pick's fallback chain is reported as that pick bent to it (F-TEMPLATE's
  substitution writes the row built to `D.fabric`, V01 §3.13); a recomputed pick that differs otherwise sets volume 10's
  `evaluated.drifted` with its cause (the reconcile moved households after the draw, or the allocation changed since):
  the fabric stands, as survivors do.
* **`block.content`, `block.squareType`** — D's quotas, the candidate's siting rule, its score terms (prestige, spacing,
  and the sun factor and the siting pushes as `WhyPull`s of V11's families `sun` and `nuisance`), the keyed pick, or
  "declared"; a fixed input names why it stayed ordinary (a SIZE compound, a catacomb's churchyard).
* **`HoodPlace` names** — the grammar feature that fired (a trade, a landmark, a destination, the centrepiece, an
  opening's kind), recomputed from the place's naming record.
* **hood pins** — the site, the gate's terms (band, identity, shade as a `sun` pull, `pinGate`, the court factor), the
  prior picks and the decay; an override's state (`byOrdinal`, `rematched`, `orphaned`).
* **ladder records** — volume 10's `members` answer for a QUARTER, GUILD, COUNT or SIZE record: the step type, the range,
  the count and the member ids, each counted once (item 108 (c)).
* **an unwalled side** — volume 10's `closure` answer for a barrier run ("the cliff is the wall here", item 106 (g)).
* **openings and voids** — an opening's cause (its `AccessPoint`), and "the ruins under the old quarter" through
  `districtsAbove` (V01 §3.16); an unexcavated void is named only to a key that admits it.
* **`district.terrace`** — the state and its source (V01 §3.17.1): "the ground here falls 18 % and the relief is hilly:
  the quarter is terraced", "declared by the user", or "too gentle for retaining walls: terrace streets only".
* **`RetainingWall`** (every wall, one provider for the kind) — its producer and reading: a generated wall's levelled
  block, plot or ward (the base's S10–S11 levelling, or the district-edge source for a ward-edge wall, item 302), its
  slope against `terrace.slopeMin` and its step against `terrace.stepMinCm` from the derived step (`stepProfile`): "the
  quarter stands 3 m above the fields here"; a declared wall, "drawn by the user" (its `drawWall` or `terrace` event);
  each way that crosses it, "by a stair" or "by a ramp", with the way-class rule by slope.
* **`district.raised`** (an empty under-deck strip or a pier hole in D) — the raised way and its recorded reason (item
  110 (f); `DistrictContext.raised`): "under the arches of the Old Aqueduct, which carries water from the hill springs".
A subject no provider here covers (a deck plot, a raised way itself) takes volume 10's provider for its kind (V10 §3.9).

**The close-up panel's reader query** — `query({ kind: 'hood', id: D })` returns the district's name, identity (with a
QUARTER record's label), fabric, population, the ladder records with members in D (members here; members elsewhere with
their districts), the chains in its context, the voids under it the key admits, its shade share, its terrace state
(`DistrictContext.terrace`), the raised ways crossing it (`DistrictContext.raised`: the way, its kind and its recorded
reason), and the bends of its last re-derivation; volume 9 lays the panel out. The panel offers, beside the layout
cards, **remove** on a generated raised way (routed to the base's removal with its dry run, V01 §3.17.5), T4's `raised`
add, and the *Terraces: auto / on / off* chip (V01 §4.1).

Its **proposals** are previews of T8 (a fabric on a district, with the three variations), T9 (a block's content) and T6's
furniture stamp, shown as ghosts with a one-line reason (§14's clerk contract). Its **critiques** of a skeleton add, for
stage 2: a declared fabric whose requirement fails on the declared quarter (a ring on a narrow strip: "bends to a
square"), a district whose squares fall short of its quota with no sited block, and a quarter whose identity has no
anchor (§14's existing critique). It sees a court's or a yard's name only when its viewer's key admits `local` at the band
it asks for (§9.2).

### 4.6 Hosts and shared documents

A host sends these events through the bridge like any (§11.3); a dossier naming claim may name a `HoodPlace` (§7.7 item
82), which makes that name dossier-owned. Stage 2 changes nothing in the bridge protocol.

## 5 Rendering, labels, exports

### 5.1 The `hatched` family at all four bands (item 405)

The family's roles and values are §8.2's (`hatched` column); its lighting is §8.4 (h)'s (the prism pass at every rung, the
night glow); the programs `retaining`, `raisedWay` and `way.stair` are §8.2's. This section states the `hatched` programs,
its order and its stage-2 marks at every band, so `hatched` can draw a whole town as well as a close-up (VIS-9: every
family defines all four bands).

#### 5.1.1 Per band

| band | what `hatched` draws |
|---|---|
| city | block ground = paper; footprint masses in the lit roof tone (`building`) with the band's outline; the street stripe in `road` (ways at the band's selection, §8.5); `square` blocks and plazas in `road`; `green` blocks, parks and wood fills in `green` / `tree` (§8.5 (1), item 417); water in `water`; walls in `wall`; one prism shadow pass under the masses (§8.4 (h)); labels by §9 |
| district | as city, plus: two-tone roofs by the sheet's `roofConstruction` — `fakeGablePerWing` over the stored wings until stage 3 registers, then `roofscape('twoTone')` over each building's facets (V02 §5.2–§5.3; §8.6, item 406) — each face's or facet's tone by the roof law below, footprints outlined, yards by role, boundary treatments, entrance ticks, every way stroked with its casing, courts in `court`, crowns (lobed, two greens) |
| neighbourhood | as district, plus: the **hatch** program on every roof facet, the road **surface** programs, stair-stepped ticks, the hood pins and model pins as symbols with their prism shadows, the ground access symbols the viewer's key admits (V01 §3.8.8), chimneys, the large-tree pins under the buildings and block trees above them (item 58 (d)), place labels (openings included), every named way labelled, addresses (§9.3), the close-up's title and vignette when a district or an outline is opened |
| building | per-facet hatching as at the neighbourhood band; the plan rung as `ink`'s (§8.2's presets row) once stage 3 exists |

**Item 110's marks**: retaining walls from the district band (`retaining`); raised parts at every band by §8.5's way
selection, drawn above the ground ways with their shadow (`raisedWay`); stair and ramp intervals from the district band
(`way.stair`); deck plots and their buildings as any plot and building; each stepped building's tiers in stack order with
their shadows (V01 §5.1.3).

#### 5.1.2 The programs

* **Roof law.** Each roof face or facet takes the lit roof colour or its dark variant `dark = lit × lerp(ambience,
  shadow, α)` by its normal against the light (`faceLight`, §8.2), `α` the sheet's shadow alpha — the law §8.3's
  `hatched` census row tests within ± 0.02. The lit colour per building is the `roof` role's pick (the role holds a list
  in `hatched`: index by §8.2's multi-colour rule) scaled by `2^(0.3 × s)` with `s` a centred bell of three uniforms from
  the building's `render.instances` stream (a gentle per-building tone variance, ours; NG 1.2.2 scales its roof colour by
  a power of two, provenance `ref:NG 1.2.2 roof tone (code)`), clamped per channel; so terraces read as separate houses.
* **Hatch** (item 58 (e); J-V1.47, J-V1.69, J-V1.73). The hatch runs **per roof facet** of the sheet's
  `roofConstruction`: under `fakeGablePerWing` (every sheet before stage 3 registers), each wing's faces by its
  `RoofSpec.kind` (§2.6) — a gable or hip wing's two faces split at its ridge line, a flat wing's one level face, a
  pyramid, tent or skeleton wing's one face per eave, a cone or dome as one surface; under `roofscape` (from stage 3's
  landing, V02 §5.2–§5.3), each of the building's `RoofFacet`s. **The NG parity sheet** keeps `fakeGablePerWing` from M6a;
  at M6b the NG draw-style bars are re-measured on `roofscape` and the sheet switches to it when they pass, else keeps
  `fakeGablePerWing`, reported (V02 §5.3; J-VI.17 H8); every other `hatched` sheet switches to `roofscape('twoTone')` and
  the per-facet hatch when stage 3 registers. Lines at a **world pitch** `hatch.pitchM` — a model length, as
  Neighbourhood's spacing is (`code-neighbourhood.md` §2.11), so a facet has the same lines at every zoom; its default is
  calibrated at M5 so the census mean is 17–19 per wing on B-ZOOM's neighbourhood-band reference viewport, starting at
  0.8 m (ours; NG's unit-to-metre reading is HOLD). **Direction:** a sloped facet's lines run parallel to its **eave** (its
  lowest horizontal edge) — so a long facet's run parallel to its wing's ridge, NG's law (under `fakeGablePerWing` a gable
  or hip wing is hatched parallel to its ridge across its whole footprint, as Neighbourhood hatches), and a hip, pyramid,
  tent, pent-band or skeleton facet's parallel to its own eave; a level (flat) facet's parallel to its wing's OBB major
  axis; a cone's or dome's facets as concentric rings about the apex at the world pitch. **Every line is clipped to its
  facet**, so it stops at a valley line, a hip line and the outline of a wing standing on the wing. Each line's two
  crossings with its facet's boundary each carry one filled tapered triangle, base one stroke width (0.5 px at 1×) on the
  crossing, pointing inward along the line to a point at `½ × m3 × chord` from it (a ring: two tapers where it crosses the
  light axis); then, per ridge-bearing wing (gable, hip), two heavier tapers from the ridge's ends inward along the ridge,
  each `(0.3 + 0.2 u) ×` the ridge length, base 1 px — unchanged by the construction; a flat, pyramid, tent, skeleton,
  cone or dome wing has none — the taper and ridge-taper laws NG 1.2.2's (provenance `ref:NG 1.2.2 hatch (code)`),
  restated in our words. A flat facet adds its parapet (V02 §2.6's `parapetCm` on a flat tier) as one inset outline at
  its plan offset, in the lit tone of the up normal (`faceLight`); a `none` roof has no hatch (its state program,
  V01 §5.1.4); a facet of zero area (a degenerate wing) draws nothing. Where the on-screen pitch falls below `hatch.minPx`
  (1.5 px), the program draws every second line by index parity — a zoom-stable subset, never a re-spacing. No ridge
  stroke; the outline is the footprint only (NG BG-3). The draws are the wing's render key's (§6.1's decoration rule:
  hatch phase and lengths never re-scatter with zoom). A wing's triangles are emitted into its tile's one `hatch` path per
  role (§8.1's `hatch` mark kind), so a tile's draw calls stay within §12.5's 80 (instanced hatching, II.4); the census
  (§8.3) counts per wing (the lines of all its facets) — 15–20 per gable or hip wing on the NG parity sheet, the two ridge
  tapers included — and the line count per wing is invariant across the band's zoom for every kind. With the style's
  `details` off **no hatching draws**, the ridge tapers included (NG E1, E6); with `shadows` off the hatch turns 90° to the
  eave (NG's own switch). The parity subset below `hatch.minPx` and the `details` and `shadows` switches apply to every
  facet.
* **Stair flights** (volume 2's `stairFlight`; V02 X24). The flight's facet as volume 2 paints it, its treads hatched
  across the flight by volume 2's `stairTreads(w)` (its `n − 1` lines at its `goingCm`, V02 §2.6), no ridge tapers; below
  2 px of plan per tread the lines are omitted as volume 2's `stairFlight` omits them; drawn after the wing it rises from
  and before the wing it lands on (V01 §5.1.3).
* **Crowns.** A **lobed crown**: `k = 5 + ⌊4u⌋` lobes, each a circular arc centred on a point of a jittered k-gon at 0.55
  of the crown radius (radial jitter ± 0.1), lobe radius 0.5 of the crown radius, their union's outline filled at the
  crown's shaded tone; a lit cap — the same construction at 0.65 scale — offset toward the light by 0.15 of the radius in
  the lit tone; with `details` on, two inner rings of short arcs. Two greens (the `tree` role's list) by §8.2's pick rule.
  Our construction (J-V1.27), stamped per crown size class like §8.10's library (so no crown is built at raster time).
  Order: large-tree **pins** in the pins slot under the buildings; **block trees** (Greenery instances) in the tree slot
  above them, smaller crowns first within a block (item 58 (d)).
* **Road surfaces** (§8.2's `surface(kind)`, by `Way.surface`, V01 §3.7.3; square faces by their residue's surface):
  `cobble` — the `road` fill with a stipple of small irregular polygons (5–7 sides, 0.35–0.5 m across) at 0.6 m spacing,
  stroked in `ink` at α 0.35, and a kerb line of dots at 1.2 m along each kerb; `paved` — setts: rows of 0.6 × 0.3 m
  rectangles across the way, staggered by half a sett row to row, stroked at α 0.3; `dirt` — the plain `road` fill;
  `planks` — bars across the way at 0.3 m, stroked at α 0.4. **One shared stamp tile per surface kind** (§8.10's stamp
  mechanism; a 12 m world-anchored tile generated once per sheet) is drawn as a clipped pattern fill of the way's body,
  never generated per way; the kerb dots are per way. The street stripe is the way's model width × `roads.widthRatio`
  (the `hatched` default 0.4 — a narrow stripe in a cream gap, provenance `ref:NG 1.2.2 road width ratio (code)`), read by
  the `full` and `outlined` modes. The style row `roads.mode`: `full` (default: fill and surface), `outlined` (a casing
  pass of 2 × the thin stroke, then fill and surface), `dashed` (the centreline dashed 9 : 6 × the stroke, no fill — the
  dash NG 1.2.2's, `ref:NG 1.2.2 road dash (code)`), `hidden`. NG 1.2.2's road modes and surfaces (plain, cobbles, tiles,
  outlined, dashed, hidden) are the reference (II.4); the stone shapes and spacings are ours.
* **Stair-stepped ticks** (§8.2's `steps`): across a stair-stepped way (V01 §3.6 (3)) every 1.2 m of ground length, a
  line at the thin stroke across the way's body, drawn from the district band.
* **`way.stair`, `retaining`, `raisedWay`** (§8.2's programs, item 110): in `hatched`, a retaining wall's shadow is drawn
  in slot 9, cast from the high side's level onto the low side along the sheet's light vector by the pins' prism law,
  its height the derived step (`stepProfile`, §2.7); a raised part's piers take slot 11 and its deck slot 14, its shadow by
  the prism law from the deck's height in the pass before slot 14.
* **Pin symbols** (model pins and hood pins alike, sized by their model size): `well` — a round (by the render key's
  parity) or square stone rim in `wall` with an `ink` α 0.8 shaft; `pump` — a small square with a handle tick; `trough` —
  a thin rectangle in `wall` with a `water` inner strip; `fountain` — a stone disc with a `water` basin shaded toward its
  far side from the light; `large_tree` — a lobed crown at its size; `statue` — a plinth square with a figure dot;
  `monument` — a plinth with a slender triangle; `bandstand` — an octagon hatched like a roof; `cross` — a cross glyph on a
  plinth; `shrine` — a small square with a ridge hatch. Every symbol casts its prism shadow at its row's `heightM` (§8.4
  (h); a tree's shadow its crown's outline shifted), which S5 (e) reads.
* **Ground access symbols** (V01 §3.8.8; drawn from the model, sized by `access.<accessSymbolKind>M`; only accesses
  opening on a ground face outside every footprint draw one — a cellar stair, shaft, ladder, hatch or broken well where
  it opens in a yard, none where the building or its basement hosts it, the plan drawing its head). The symbol is
  `accessSymbolKind(a)`'s: the access's kind's, except a catacomb entrance (V01 §3.7.1's selection: a `stair` of a
  catacomb system), which draws `catacomb`: `stair` (a neighbourhood or lifeline stair on public ground, volume 4) — a
  rectangular rim in `wall` round four step ticks narrowing toward its lower end; `ladder` — two short rails with three
  rungs inside a square rim; `hatch` — a small square with a hinge line along one side and one diagonal; an arch vault's
  `door` — no symbol, the vault's infill being the base's drawing; `cellar_stair` — a small rectangle with three step
  ticks; `shaft` — a square rim in `wall` with an `ink` α 0.9 void; a broken-through `well` — the well rim with a dark
  shaft and a crack tick; `grating` — a small square crossed by three bars; `sinkhole` — an irregular ring of rubble
  stipple round a dark centre shaded away from the light; `mouth` — a dark arc opening in the slope's face with a rock
  fringe; `collapsed_shaft` — a rubble disc with a dark hollow; `ruin_entrance` — two short double-lined walls flanking a
  stair of step ticks (the ruin's masonry style, item 109 (g)); `catacomb` — a small pitched hood over a stair of step
  ticks with a cross tick. Its state form is §8.2's access row (V01 §3.8.8). They sit in the pins slot and cast no shadow
  but the `mouth`'s and the catacomb hood's.
* **Titles**: V01 §5.2.1.

#### 5.1.3 Layer order at the neighbourhood and building bands (`hatched`)

`StyleSheet.order` is per band (§8.2); `hatched`'s city and district bands take the shared list, and its neighbourhood
and building bands take this one, of which NG 1.2.2's order (greens → roads → shadows → pins, large-tree pins under the
buildings → buildings → chimneys → block trees → title) is a subsequence (§8.3's order parity):

| # | slot | reason |
|---|---|---|
| 1 | paper | background |
| 2 | water | — |
| 3 | ground.block (= paper) | the figure-ground contract (§8.5) |
| 4 | relief | off by default |
| 5 | greens, parks, green blocks, yard parts by role, courts | NG: greens first |
| 6 | way casings (`way.*`, pass 1) | — |
| 7 | way bodies, square faces and road surfaces (`way.*`, pass 2; `ground.square`) | NG: roads |
| 8 | river casing and body; shore marks | — |
| 8b | retaining walls (`retaining`; item 110 (a)) | under the shadows, over the river |
| 9 | prism shadows (each building's ground shadow, cast from its stack's envelope; walls, towers, pins, crowns; each retaining wall's shadow from its high side onto its low side) | NG: shadows after roads, before buildings |
| 10 | pins: model pins, hood pins and ground access symbols, large-tree pins among them (layer `pins`) | NG: pins under the houses |
| 11 | landmark footprints; raised-way piers (in `wall`) | — |
| 12 | buildings: roof faces, outlines, hatching — each building's wings in stack order, with its upper tiers' shadows (below) | NG: houses |
| 13 | chimneys and roof detail | NG: props |
| 14 | piers and bridges; raised decks (`raisedWay`), their shadows drawn in a pass just before this slot over everything below, roofs included | a deck may stand above the roofs beside it |
| 15 | fields | — |
| 16 | block trees (Greenery instances; layer `trees`) | NG: trees above the houses |
| 17 | boundary treatments | — |
| 18 | curtain walls | — |
| 19 | towers and gate blocks | — |
| 20 | grid | — |
| 21–25 | scale bar, compass, labels, title and legend, live layers | as §8.2's list |

**Stacks in slot 12** (item 110 (c), (f); V02 X24). A building's wings are drawn in stack order by `BaseWing.on` depth
(V02 §2.6; §8.6, item 419) — a wing before the wings standing on it, ties by wing key (V02 §2.1's canonical order) — and
after each wing that carries others, the prism shadows of the wings standing on it are drawn clipped to that wing's roof,
in the shadow tone at the sheet's shadow alpha (slot 9's law), so each tier casts its own visible shadow on the tier below;
slot 9 keeps only the building's ground shadow, cast from its stack's envelope. A stair flight is drawn after the wing it
rises from and before the wing it lands on. The light pass (§8.4) runs over slots 1–20 as in every family. §8.2's
slot-resolution rule applies per band, so the loader refuses a `hatched` sheet whose neighbourhood list leaves a semantic
unplaced. **Layer toggles** (T12's `setLayer`; NG F1): the hood pins, model pins and access symbols belong to the `pins`
layer and block trees to the `trees` layer, so the view bar hides them as Neighbourhood's keys do; the access symbols obey
the `pins` toggle and the key's admission both.

#### 5.1.4 Night and states

`hatched`'s night is §8.4 (h)'s — the ambience wash and a glow per lit building at the vector rung; the placed lights
(§4.7) light the streets. §8.2's `states` rows apply with `hatched`'s tones; a ruined or Works-stage building's hatch is
replaced by its state's program.

#### 5.1.5 The close-up's framing (V01 §3.8.7)

`closeup.vignette` (a style value): `none` (default); `fade` — every mark outside the opened district drawn at α 0.45
through the compositor (never re-rastered); `plateau` — NG's raised patch: the opened district's footprint cloud's hull
dilated by one block depth, drawn as a paper face over a drop shadow (the sheet's shadow tone, offset by the sun's
direction by 1.5 m at the scale) with everything outside at α 0.25. View data only: never in a digest, never exported
unless the export's style carries it. A district with no footprint takes its boundary for the hull.

#### 5.1.6 `ink`'s close-up and the other families

`ink`'s neighbourhood band (M2b, §8.2's row) takes the stage-2 marks the same way: hood pins and pin symbols as ink
symbols, road surfaces as ink stipple at α 0.35 (cobbles) or hairline setts, place labels, stair-stepped ticks, retaining
walls as one ink line with low-side ticks, raised decks as ink double lines with dashed spans; `lit` draws them pre-shaded
(§8.2's row). A family that lacks a stage-2 program for a semantic draws its base program — never nothing (§8.2's
resolution refuses the sheet otherwise).

#### 5.1.7 The `hatched` palette and role continuity

The palette is §8.2's (on the owner-opened targets, item 69; its chroma scale re-found on the measurement render at M5,
§8.2); B-ZOOM checks mean roof and ground ΔE2000 < 2 across every band switch of `hatched` from M5 (§8.2, §13.4), and the
contrast matrix on every palette. Every thematic view the family draws carries §8.2's second cue for meaning in colour
(item 112), as every family does.

### 5.2 Labels

#### 5.2.1 The hood title

When a district is opened, the view draws its **title** — the district's name, and under it its identity row's label (a
QUARTER ladder record's label where the dossier gives one, "the Apothecary district", item 108) and its population (e.g.
"the weavers' quarter · 2 400 people") — as furniture in the corner of the close-up frame whose box covers the least mark
area (§9.5's title rule, over the close-up's frame), in the label face at a cap height of `clamp(0.045 × the frame's short
side, 18 px, 42 px)`, `label` role, with the halo rule (§9.4). It is view data (never model, never hashed) — except in a
**district export**, whose title is the export's title label (§9.5), and in a **standalone neighbourhood document**, whose
`title` `LabelEntity` holds the hood's name as model data (S13a, V01 §3.10.1). A district with no name yet (before S13a's
naming) shows its identity row's label alone.

#### 5.2.2 Place labels

Each `HoodPlace` has one `LabelEntity` of kind `place` (V01 §3.7.1; §9.1, item 422): an area label on its host face by
§9.3, floors §9.4's area floors (7 px cap), priority §9.2's `place` rank (after landmarks, before gates and ways), bands
by its kind (squares and greens: district and neighbourhood; courts and yards: neighbourhood). Its `knownTo` row byte is
the place's (§9.2's admission), so a `local` court's name is admitted for a public key only at the neighbourhood band and
finer; a `secret` place's name only at the building band.

Hood pins carry no label of their own: the place they stand in carries it (a well square's name, a court's name), and a
square's model centrepiece is named through its square's `HoodPlace`. An **opening** place is labelled at its symbol (a
point label, §9.3, at the neighbourhood band — at `ground.at` where the access draws no symbol, V01 §3.8.8; a `mouth` or
`ruin_entrance` of `public` knowledge also at the district band); a catacomb entrance's label is its catacomb's name
("the Catacombs of St Anne's"); a dug access has no label. A place whose label fits no candidate is dropped by §9.4's
floors, never shrunk below them.

#### 5.2.3 Street names and addresses

The base's: path labels at the district and neighbourhood bands (§9.3), ≥ 90 % of named streets labelled at the
neighbourhood band (§9.4, O13 b); addresses at the neighbourhood band. The names carry V01 §3.7.2's local meaning; the
labels change nothing.

### 5.3 Exports

| format | stage-2 content (§11.1's rules otherwise) |
|---|---|
| SVG | a district scope — or an outline's — at the neighbourhood band (§11.1 allows it for a district-sized scope): the transient list is built with the close-up derived (a pure function, V01 §3.8) — hood pins in `<g id="sem.pin.hood.<kind>">`, ground access symbols in `<g id="sem.access.<kind>">` (the export key's admission applied), squares and greens by semantic, the hatch as filled paths, place labels, the title; retaining walls in `<g id="sem.wall.retaining">` with their shadows, raised parts in `<g id="sem.way.raised.<class>">` above the ground ways inside the layer group `layer.ground.raised`, piers in `<g id="sem.raised.pier">` (§11.1, item 447), and the deck plots and buildings the district owns (V01 §3.17.6); ids preserved |
| PNG, print | the same list through the tile assembly (§8.8, §11.1) |
| VTT (scene JSON, `.dd2vtt`) | scope a district or a rectangle (§11.1); the scene image drawn with the close-up; walls from footprints and boundary treatments as the base's; lights as the base's; hood pins in the image only (no wall, no light of their own); retaining walls and raised supports in `line_of_sight` by §11.1's VTT rule (items 447, 448: a wall whose derived step is ≥ `vtt.retainingMinCm`, broken over its stair and ramp intervals; supports' footprints as closed polylines), so no token walks off a terrace or through a pier; the decks the district owns in the scene |
| GeoJSON | model entities: blocks with `content` and `squareType`; squares, greens and yards as polygons of those kinds; `HoodPlace`s as features (`kind: 'place'`, its place kind and subtype, name, the knowledge admission applied, §11.1) — an opening as a point at its `AccessPoint`; with the option `closeup: true` on a district or outline scope, hood pins as point features `{ kind: 'hoodPin', pin, sizeM, derived: true }` in a `presentation` collection; retaining walls (kind `retaining`, per run), raised ways, their supports (kind `raisedSupport`, per support) and spans, stairs and ramps, and deck plots and buildings as §11.1 states them (item 447; J-VI.18) — a wall's derived step reaches GeoJSON only as that item's step bounds |
| JSON (full schema) | `Block.content`, `squareType`, `ringCentre`, `voidCorner`, `overrides`; `HoodPlace` (with `subtype`); the `closeups` block's records; `Recipe.product` and `Recipe.hood`; `District.fabric`, `fabricParams` and `terrace`; the `hood.constants` cells, their `NG` entries among them, a document pins (§7.6) |
| glTF / OBJ, CityJSON | model entities only: square and green faces as ground surfaces; model pins as §11.1's props; hood pins excluded (presentation); retaining walls as prisms from the low side up to the high side's level; raised decks at their height on their piers; deck buildings on their decks |
| skeleton file (§11.1) | the declared subset gains `setAttr` of `fabric`, `fabricParams`, `terrace`, `content`, `squareType`, `surface`, a place's name and knowledge (a new place's included), a `quarter`'s `fabric` (item 349) and `terrace` (item 350), `closeup` and `instance` events on hood pins, and a standalone recipe's `hood` |
| a standalone neighbourhood document | every format, as a town (it is a document) |

Every export honours §9.2's knowledge admission (a court's local name withheld from a public export above the
neighbourhood band) and records declared, derived and clerk-proposed provenance (§11.1; item 101 R19). A scope holding no
stage-2 content (a district before M5, a hinterland rectangle with no close-up) exports the base's content only. An export
of a district whose close-up was never opened derives it for the export (a pure function), never stores it.

## 6 Performance budgets

On §12.1's reference hardware, measured as §12 measures (p95 over the bench's seeds unless a line says otherwise); every
line is PLAUSIBLE until its milestone measures it, with its pre-decided fallback (§12.10's register shape). "B" is the
building count in scope.

| line | budget | where it sits in §12 | measured | pre-decided fallback |
|---|---|---|---|---|
| S7c fabric selection (S7b's hook) and its land estimate | ≤ 0.07 ms per district (context from cached records; χ̃ over ≤ 100 allocation rows and their allocation-level links; ≤ 12 rows' predicates; `templateLandM2` closed-form) — ≈ 1.8 ms at CITY, ≈ 3 ms at METROPOLIS; S7b's reconcile with the template land adds ≤ 1 ms at CITY | a row of §12.4's CITY split, inside S7b's line and the one-click model budget (item 474) | M5, B-CITY | the context's portal and landmark lists are cached per district from the greedy pass; if still over, eligibility tests the cheap predicates (areas, shares) before the geometric ones (crossing pairs) |
| template seeds (S8) | spine or parallel spine ≤ 0.3 ms per seed; a contour series ≤ 1.5 ms per district (≤ 31 level lines per flank by marching squares over the face's box); plaza ≤ 0.5 ms; ring series ≤ 2 ms per district (≤ 6 courses of 48 vertices with validation); the holed bent cut of ring bands ≤ 2.5 × a plain cut per street (NG measured 2–3 ×, `profile-neighbourhood.md` RA-6) | inside §12.4's S8 row: at the default 15–35 % template share, ≤ + 4 ms at CITY | M5 (spike S-V1-a) | the ring validation runs once per series instead of per course; a ring district's bands cut at the `landmark` variant's one-ring minimum when the series exceeds 2 ms |
| S9b block dispatch (S10a's hook) | ≤ 0.18 ms per district (≈ 60–150 blocks; junction and frontage lookups through the L2 index; the siting pushes over S10a (i)'s filled blocks by the family rows' radii; the island strips evaluated once per shade evaluation at S9b's first read and shared with field pass 2, V01 §3.5.5) — ≈ 5 ms at CITY | a row of §12.4 (item 474) | M5 | candidate lists by type built once per district from one junction scan; the pushes read a per-district list of emitter blocks |
| the services of V01 §3.16 (`catchmentOf`, `districtsAbove`, `fabricSignature`) | ≤ 1 ms per call at CITY, memoised per commit; `catchmentOf('walk')` ≤ 2 ms at METROPOLIS | inside the callers' lines (S10b's coverage term, volume 4's stage, the reader) | M5 | the way-graph distances cached per district per commit |
| surface rule, local-place step, naming context | ≤ 1 ms, ≤ 1 ms + §12.4's S13a naming rate per place, ≤ 0.2 µs per way at CITY | §12.4's S10a and S13a rows | M5 | — |
| **one-click total added by stage 2** | ≤ 12 ms at CITY, ≤ 20 ms at METROPOLIS (the model path; nothing added to the city band's first map beyond the square and green fills) | §12.3's model law gains this term, declared (D-18's rule for a declared cost) | M5 | the parity presets pay 0 (no template, all ordinary); if the default exceeds it, S9b's phase 2 moves to the pooled S10 (it is block-local) |
| opening a district (refine close-up) — **model and display list** | the close-up derivation (hood pins over sites) plus S14's neighbourhood-band display list for the district: **non-ring fabrics ≤ 6 ms + 0.06 ms × B** (≤ 33 ms at 450, ≤ 51 ms at 750), **`ring` ≤ 10 ms + 0.07 ms × B** (≤ 100 ms at 1 300) — against NG's reset of 10–52 ms for medium area, street and square hoods (600–779 buildings) and 78–96 ms for ring (1 209–1 287), whose figures exclude raster (`docs/confidence/ng.md` H1; J-V1.48) | §12.5's neighbourhood-band line, made a law per fabric class (item 474) | M5, B-ZOOM | hood-pin symbols stamped per kind and size class (one sprite draw each) instead of drawn as paths |
| opening a district — **first visible tiles rastered** (measured separately) | ≤ NG's 73–111 ms raster at comparable counts (H1) | §12.5 | M5, B-ZOOM | the surface stamps drawn at the district band's flat tone on the first frame, the stipple on the next |
| the surface marks of one opened district (stamps, kerb dots, stair-stepped ticks) | ≤ 3 ms at 450 buildings | inside the display-list line above | M5 | a flat surface tone at the district band until the view settles |
| the walls and raised parts of one opened district (item 110) | ≤ 1 ms at 450 buildings, inside the display-list line; the same per district at METROPOLIS | §12.5 | M5, B-ZOOM | one path per district for all its walls |
| METROPOLIS: the largest district's open; its replace close-up; a large standalone neighbourhood document's first map (≈ 1 300 buildings) | open: the law above at its B; replace: §12.6's scoped law × the fabric's factor at its B; first map ≤ 0.8 s p95 | §12.5, §12.6 | M5, B-CITY (METROPOLIS) | open: hood pins derived for the visible blocks first, the rest on idle; replace: the dry run's overlay reused at commit; the hood: the one-district pool path skipped |
| per building (S5 (b)) | generation ≤ 75 µs (the standalone path, model only) and rendering ≤ 85 µs at the neighbourhood band | §12.5 | M5 on standalone medium hoods | as above |
| draw calls and uploads (S5 (c)) | ≤ 80 path calls per tile (hatch batched per role) and ≤ 25 canvas operations per wing as the ceiling (II.4); uploads within §12.5's ≤ 4 per frame while moving | §12.5 | M5 census | the hatch's parity rule starts at 2 px instead of 1.5 px on screen (every second line drawn sooner) |
| a replace close-up (a fabric change, New random on a district) | §12.6's scoped law × the template's factor — `ring` 1.5, `crossroads`, `landmark` 1.2, others 1.1 — plus S9b's and S13a's deltas: ≤ 45 ms for a ring district of 450 buildings; its dry run the same, the commit reusing the dry run's overlay (≤ 2 ms) | §12.6 | M5, B-EDIT | as §12.6's fallbacks |
| a block's content edit | D from S10a: ≤ 3 ms + 60 µs × the buildings of the blocks whose allocation changes | §12.6 | M5 | — |
| a hood-pin edit | ≤ 1 ms model, the district's chunk re-derived ≤ its open line | §12.6's single-plot line | M5 | — |
| the stage-2 switch's edit (V01 §3.15) | a Re-derive from S2 of the whole document: §12.6's ≤ M(B) for a Re-derive from Sk, stage 2's per-district lines above included, the underground tail's after it | §12.6 | M5 (T-V1-4's switch clause, timed) | none needed: a rare parity edit whose dry run shows its fates before it commits |
| a standalone neighbourhood document | first map ≤ 0.5 s p95 for a medium hood (≈ 750 buildings; S6 (b)); model ≤ 75 µs × B | §12.5's first-map law applied to the unit | M5 | the one-district pool path is skipped (the unit runs single-worker) when that is faster, measured |
| a sky island's districts | **generation**: the unit run ≈ 8–12 ms per island at CITY, ≈ 12–18 ms at METROPOLIS (≤ 3 districts' worth, ≈ 2–5 % of the town's plots, at this table's per-district rates), on the generation worker concurrent with the pool — the figure V05 §6 cites for its critical path; **after generation** (V01 §3.10.3 (6)): a raise, a late declaration or New random on an island runs the unit run inside its commit at these rates plus §12.6's commit overhead (II.6's `raiseIsland` line); a growing resize or a rim reshape costs §12.6's scoped law once per receiving district — for a resize every district bordering the rim — plus once for the district whose institution claim is re-searched where that district receives no face, at most k ≤ 3 in all, and a shrinking resize none but the district whose claim is re-searched, where one is (its plot clearing, re-cut and way cut-back are volume 5's, V05 §6); `plantRimWalk` adds ≤ 0.2 ms, once per event and once per unit run | §12.4 (inside SKY's line, V05 §6); §12.6 | with volume 5's stage (its fixture island first, T-V1-21) | the island's S12b and S13a join the ground's pooled batch instead of running serially on the worker |
| memory | the close-up chunk ≤ `closeup.chunkKB` per district inside §12.8's 8 MB elaboration cache (LRU); `Block.content` and flags 2 B per block; `HoodPlace` ≈ 80 B; `CloseupRecord` ≈ 40 B + 24 B per override row | §12.8 | M5 | the cache's existing halving fallback |
| document size | ≤ 1 KB per edited close-up; the town's document growth from stage 2 ≤ 2 % at CITY (places and flags) | §12.8's document line | M5 | place names stored by naming-record reference only |

## 7 Tests and acceptance bars

The families are §13's: B-CITY and B-CITY-lite, B-EDIT, B-ZOOM, B-FUZZ, B-REF (§13.5's parity rows), the goldens
(§13.3) and the D-5 panel (§13.6). The class column is §15.2's: **C** checks a rule, **P** compares with a measured NG
number, **O** shows an outcome NG does not reach. Every row runs from M5 unless it says otherwise.

| id | bar | family | class | stage-2 letter |
|---|---|---|---|---|
| T-V1-1 | II.5's M1 readiness bars hold with `@plat/hood` registered: every district's `SeamContract` resolves; every seam edge typed (barrier runs `cliff`, `water` or `marsh`, item 541); every `baseLane` portal matches one lane or seed end | B-CITY | C | S1 |
| T-V1-2 | χ̃: (a) its plot mix within 0.08 of the placed vector's (half the L1 distance) for ≥ 90 % of districts; (b) χ̃ over the greedy and over the reconciled allocation within 0.08 of each other for ≥ 95 % of districts (V01 §3.2, §3.3.7) | B-CITY | C | — |
| T-V1-3 | S7c: New random on a district never changes its fabric; changing one district's intent changes no other district's fabric; declaring a `quarter` or merging two districts changes no other district's fabric (the lineage key, V01 §3.12); an edited fabric survives a Re-derive from S6 | B-EDIT | C | S6 |
| T-V1-4 | (a) the default preset: non-`bent-cut` share 15–35 % at CITY; (b) `MFCG` and `FTG`: 0 templates, every block `ordinary`, 0 `HoodPlace`s, 0 greened courts from stage 2, and the M4 goldens **byte-identical** under those presets with `@plat/hood` registered — the way-surface rule and the naming context landed before M4 (V01 §8.1) and are inside the M4 goldens already; (c) a registry test: every `hood.*` switch cell (a chance, gate, weight, gain, quota or option) and every V01 step not in the M4 goldens carries the `extension` marker (a step: it runs only while `fabric.extensionWeight` > 0, V01 §3.15), no geometry cell carries it (V01 §2.2; J-V1.98), and `hood.constants`' `access.*M` columns equal the `AccessSymbolKind` values as a set — every access symbol kind has its `access.<accessSymbolKind>M` column and no such column lacks a kind (V01 §3.8.8); (d) **under `NG`**, every cell of every table but `hood.constants` resolves to its `MFCG` value, and `hood.constants`' cells to V01 §3.15's entries where listed, else their `MFCG` value (a resolution test over the compiled tables); (e) **with the terrace, raised-way and deck-plot rows off, byte-identical to the build without them** (item 110 (f)'s no-op pin, a `NoOpPin` on V12's engine, E-20), and V01's item-110 rows — the series flag, `terrace.askGain`, the precinct multi-ring, the hillside default, the flatter-square tie-break — `extension`, off in `MFCG`, `FTG` and `NG`; (f) **the switch's edit** (V01 §3.15): on a generated B-CITY document in the default preset with no held stage-2 edits, an `editTable` lowering `fabric.extensionWeight` from 1 to 0 leaves 0 `HoodPlace`s and 0 typed blocks, each retired place and block listed among the edit's fates, and what the stages before S2 commit byte-identical; raising it back to 1 makes the places V01 §3.7.1 selects, opening places included (T-V4-74 (b)); the undo of each restores the document byte for byte; the edit timed against V01 §6's switch line | B-CITY, goldens, CI | C | — |
| T-V1-5 | S4 (b): a nearest-centroid classifier over `DistrictSignature` (V01 §2.3), standardised over B-CITY, assigns ≥ 90 % of template districts to their template (eleven classes; held-out half of B-CITY) | B-CITY | C | S4 |
| T-V1-6 | S4 (a): every district kind not excluded by V01 §3.3.8's table has ≥ 1 of its table rows eligible on ≥ 50 % of its districts of ≥ 3 ha — for every kind but `shanty` counting only its non-`bent-cut` rows | B-CITY | C | S4 |
| T-V1-7 | ring geometry: every laid ring whole (no ring meets the face inset), 48 vertices; the spacings of one district in one geometric series (consecutive ratios equal within rounding, the factor in [1, 2); item 543); under `ringRadials` 0, 0 ring junctions with arms from both sides within the portal gap and radials of adjacent bands never collinear through a ring (angle > 6° at every shared ring vertex); under 1, exactly one through crossing per band | B-CITY, B-FUZZ | C | S4 |
| T-V1-8 | street: the main spine joins its two anchors; ≥ 70 % of its frontage length is plot frontage; square: the plaza's area within ± 10 % of V01 §3.4.5 (a)'s A after fit (or reported shrunk), its through streets reaching the face boundary; quay and wall-side: the spine within ± 10° of its seam over ≥ 80 % of its length, offset within ± 0.5 m; crossroads: the two spines (`pair:1`, `pair:2`) cross at ≥ 45° inside the plaza; park: the green plaza within ± 10 % of its A, every fan path reaching a portal; landmark: each precinct ring within `dBar + w_tpl / 2` ± 1.5 m of its precinct's outline over ≥ 90 % of its length, the first anchored on the highest-σ reservation, and each of the second fixture's precincts ringed | B-CITY | C | S4 |
| T-V1-9 | B-FUZZ: 10⁴ random template faces per template (convex, concave, C- and L-shaped, holed, elongated, triangular, and the degenerate cases of V01 §3.18 (a)): 0 crashes, hangs or invalid outputs; completion 100 %; F-TEMPLATE's rung counts reported; fallback rate ≤ 10 % on faces meeting the row's requirement (spike S-V1-a's bar) | B-FUZZ | C | S4 |
| T-V1-10 | S4 (d): square area per 1 000 inhabitants in 0.03–0.15 ha, median 0.08 ± 0.01, over districts of ≥ 1 000 inhabitants, **measured over every square source** (the main plaza, §4.8 forecourts, gate plazas, S7b claims, template plazas, void squares, S9b's); S4 (c): ≥ 90 % of squares at a junction with a tier-1 arm or two tier-2 arms, or before a landmark (item 523's reading); 0 churches with two forecourts; 0 S9b squares with stalls or a market rank; S2's market count and item 24's separation unchanged by stage 2 | B-CITY | C | S4 |
| T-V1-11 | (a) greens: the sub-block green quota met within ± 10 % in ≥ 95 % of districts that have one; (b) manor blocks: share of eligible blocks within ± 3 points of the band row; (c) court greening: share of courts greened per band within ± 5 points of its row; at fixed recipe parameters, the green-block and court-greening shares' standard deviation across seeds ≤ 8 points with means within ± 5 points of target; (d) F-DISPATCH (V01 §3.13): on a fixture forcing a square quota with no eligible site, the unmet quota rolls to the next type and the last remainder is reported in `stage2.dispatch`; on a fixture whose `manor` block's district holds no household of its band range after S10a (ii), the block reverts to `ordinary`, reported, never left empty | B-CITY, fixtures | C | — |
| T-V1-12 | land: 0 households unplaced because of a dispatched block or a template, **reported per template class**, with a stress fixture forcing each class to 100 % of the districts in turn; population within ± 5 % of the request (± 0 of a dossier's, §7.7 item 2) with stage 2 on; a fixture with a generated aqueduct and elevated road across built districts plus a user-added viaduct: 0 households unplaced, the population whole; the land check of V01 §3.5.9 short on a fixture: S10b's reconcile and F-SITING run as usual, the shortfall reported | B-CITY, stress fixture | C | — |
| T-V1-13 | S3: across soft seams Δ median frontage ≤ 25 %, Δ median plot area ≤ 35 %, Δ median storeys ≤ 1 with stage 2 on (§13.7's band) | B-CITY | O | S3 |
| T-V1-14 | S1 (from `SeamReport`): portals connected 100 % (added included); shared-edge Hausdorff 0 (computed); field jumps on soft seams within band; a district with no way reports every portal `unconnected` | B-CITY, every replace in B-EDIT | C | S1 |
| T-V1-15 | refine purity: opening, closing and reopening every district of a city — and outlines over the hinterland — in two random orders, at pool sizes 0 and 3, on Node and the five engines: the model digest unchanged, each chunk's hash identical across orders, pool sizes and engines; the raised-way set byte-identical across the two orders; an outline close-up raises the `wings` rung of every building inside the outline, their records `current`, the model digest unchanged; an outline over nothing or a degenerate outline opens nothing, reported in one line; an `editTable` of the cited `hood.pins` slice or of volume 2's `PorchKindRow`s changes the inputs digest of every chunk that reads it, so no cached chunk is served after the edit and each re-derives to the new rows | B-EDIT, nightly five-engine | C | S5 (f), S6 (d) |
| T-V1-16 | S5 (f): the footprint hash at the neighbourhood band equals the city band's for every entity a refine close-up covers | B-ZOOM | C | S5 |
| T-V1-17 | reroll isolation (R8, S6 (c)): New random on each of 20 districts per B-CITY-lite city, and a fabric change on each, leave every entity outside the district's seam exception — item 369's bounding-way surface and naming record included in it, nothing else — byte-identical (the oracle, §7.3), every `RetainingWall` outside the district included with its derived profile recomputed, the scope including the cross-arena consequences volumes 4 and 5 declare for a ground edit (V01 §3.9), which the oracle predicts from their rows; run on B-EDIT cities with the underground and the sky both on and both off | B-EDIT | C | S6 |
| T-V1-18 | a replace close-up keeps 100 % of locked, pinned, assigned, dossier-backed entities and V01 §3.5.12's fixed inputs in the district; a template infeasible for them **bends** and names the bend in the dry run; a parameter past its range clamps with its line; its fates, renames and changed shared ways listed before commit; 0 refusals; held retaining walls and under-deck strips kept 100 %, the walls added, removed, moved and kept listed; the district's own card opens the refine close-up with no edit, and a card not eligible on the committed face takes its fallback chain, named; on a terraced-ward fixture with a locked plot, the series avoids its face and the plot and its site are kept | B-EDIT | C | — |
| T-V1-19 | persistence: a `closeup` then `instance` edits on hood pins → save, load, replay byte-identical (the `closeups` block and the overrides); the first `closeup` undo refused while an `instance` on its blocks with a later `seq` than its `since` is live; after a New random of the district, overrides resolved by §8.10's law — re-matched within 0.5 × the spacing in ≥ 95 % of cases on the fixture, the rest orphaned and reported, never silently dropped; a `restyle` to another `pinKind` applies; a T3 retaining wall drawn across an opened court stales its chunk, and the re-derived pins clear the wall; a document with no `closeups` block opens with default parameters | B-EDIT | C | — |
| T-V1-20 | standalone neighbourhood documents: (a) `generate` with `product: 'hood'` → a finished neighbourhood, first map ≤ 0.5 s p95 at medium (≈ 700 buildings; S6 (b)); the building count within ± 10 % of the chip's target at p90; 0 plots fronting the outline; each fabric's outline of its family (V01 §3.10.2); digests identical on the five engines; (b) 10 000 outlines of each row simple after F-OUTLINE (§13.2's property test extended); (c) Spearman ≥ 0.8 between the wealth slider and the hood's mean prosperity and between the greenery slider and its green share; (d) F-UNIT (V01 §3.13): an outline below `4 × eLo²` **scaled up** about its centroid and the bend named in one line, never refused; a drawn outline F-OUTLINE cannot repair replaced by the kind row's `auto` outline, named; an edge whose bearing no run faces takes the nearest run, named; a hillside outside its range clamped, named; (e) no island, sewer, undercity, quarry, generated vault or buried town in any standalone neighbourhood document at any `contextRung`, ≤ 1 catacomb, each through the input its S0 writes (`recipe.layers.islands` off, `Features.sewers` false, the undercity `forbid`, the tail's below-TOWN set; V01 §3.10.1 (7); T-V4-75); on a fixture with a cavern under the hood and an access reaching it, F6 dwellings present, the underground pseudo-district's allocation ≤ `forecastSafety` × P7's forecast and taken from the one-district allocation's poorest band, the population whole; (f) a Terraces hood from T1 with no other input lays its contour series and is never bent to organic, with walls where the hillside passes `terrace.slopeMin`; (g) 0 generated raised ways in any standalone neighbourhood document | B-CITY (hood variant), goldens | C / P | S6 |
| T-V1-21 | sky units on volume 5's island fixture (a fixture island until V05's `SkyStrategy` lands): the ground byte-identical with and without the island's districts; ≤ 3 districts per island; every island seam `sky` and hard; **every landing's attach vertex reached** by a seed or lane; the rim strip untouched (0 plots, 0 cuts) and planted as the rim walk — one `esplanade` and one `street_trees` `Greenery` per strip, trees 10–14 m apart, 0 ways on it; `SeamReport.portalsTotal` 0 and `landingsReached` equal to the island's landing count; `NeighbourhoodResult.districts` in partition order and equal to `SkyIsland.districts` after SKY-F; districts of `context.districtKind`, a `sky-temple` district's rows weighted by `temple`'s kind factors; S7c's hinted row's share above its base rate; on the ground, every ground landing's S8 destination inside a template face reached by its lane laid before the seeds, 0 F-TEMPLATE bends caused by it; an island district under a higher island reads `shadeSky` in S7c, S9b and the hood pins and 0 reads of the ground's pass-1 mask on the sky arena; the island's placements identical at pool sizes 0 and 3; every island crossing site whose two banks border built land a built bridge whose way reaches both banks, or reported unbridged, and 0 bridges at a site that does not qualify; every island bridge that offers deck plots has `deckCm`, `kind` and `piers` set before S10, and each of its deck buildings' wings' `baseCm` equals `deckCm` (V02 §3.16 (5)); every island way read in the part-0 column of V01 §2.3's parts table — 0 island ways dropped from χ̃'s frontage, the portals, S9b's arms or `portalsConnected`'s walk; an island without a district's worth of land gets no district, its allocation passed to F-SKY-UNIT, reported, and a zero-length rim strip no rim-walk pair; after generation: an island raised at an epoch and one declared after generation each get their districts in the raising commit, the ground changed only by volume 5's listed fates; New random on an island keeps 100 % of its held entities, lists its successions in `SeamReport.superseded` and leaves the ground byte-identical; after a growing resize, a shrinking resize and a reshape with one inward and one outward stretch, one `esplanade` and one `street_trees` `Greenery` per strip on the re-laid strip, and a replace close-up of an island district leaves the pair unchanged (`plantRimWalk`); a growing resize re-derives exactly the districts that receive new faces, a reshape exactly those that receive faces from its outward stretches, and a shrink none — each plus the district whose institution claim is re-searched, where one is — every other island district's content changed only by volume 5's plot clearing, re-cut and way cut-back and the local operator over a re-claimed yard's plots, and the district count unchanged; after a claim re-search the institution stands on its new claim, one building, the old one demolished and listed among the fates; an `echo` island over mountainous ground carries 0 ward-edge walls from the relief rows | fixture | C | — |
| T-V1-22 | S2 (a): the context coverage matrix (district context × feature) has no empty cell — every waterfront district a quay, a bank path or the rear-plot water rule; every walled wall-side district an intervallum or the rear-plot rule; every barrier run the rear-plot rule; every slope district's lanes over the threshold stair-stepped; every terraced district a ward-edge wall or none with its reason; every wall crossing a stair or a ramp; a context run shorter than `feature.runM` carries no feature; (b) 0 buildings in water, bridges within ± 10° of the channel normal (the base's); (c) the combinations of V01 §3.18 (f) with a coast, a moat or a cliff: each fixture's shore run `water`, its moat read as the `wall` run, its cliff run portal-free with the rear-plot rule, and no template face across any of them | B-CITY, fixtures | C | S2 |
| T-V1-23 | S2 (c): opening every district and a random outline per city, 0 fragments cut at the close-up frame — every way, wall (retaining walls included), water feature and raised part that crosses the frame continues to its edge; a click on no district opens nothing | B-ZOOM | C | S2 |
| T-V1-24 | local identities: 0 duplicate names per district per kind; for every name a feature-guarded grammar rule produced — ways, places and districts (fabric, ring centre, small) — the feature holds on the model at naming (name–feature consistency 100 %, NG-LT-2, NG D1); a `local` court's label absent at the district band and present at the neighbourhood band for a public key (the admission table, §9.2); every way's `shape` the same computed with and without its stair intervals, and the names of the ways of districts whose fabric and blocks are unchanged byte-identical with the terrace rows on and off; a way with no feature takes a proper name | B-CITY, B-ZOOM | C | S2 |
| T-V1-25 | surfaces: 100 % of ways without an edited surface carry V01 §3.7.3's rule value (a way with no fronting block the row at the pass-2 value at its midpoint; an era with no row the rows without `era`); an edited surface held across Regenerate (keep) and New random | B-CITY, B-EDIT | C | — |
| T-V1-26 | `hatched` census (S5 (d)): at B-ZOOM's neighbourhood-band reference viewport 15–20 hatch triangles per wing (mean 17–19) including the two ridge tapers of 30–50 % each; the model's lines per wing invariant across the band's zoom range (the drawn set the model's or its parity subset); no ridge stroke; outline = footprint; `details` off → 0 hatch marks; the roof law within ± 0.02; ≤ 25 canvas operations per wing; large-tree pins drawn before buildings and block trees after them (order census); 0 hood pins of a singleton kind in a district holding that model singleton; the census counts gable and hip wings, and flat, pyramid, cone and dome wings are hatched by their rule on B-ZOOM with a line count per wing invariant across the band's zoom; on the second fixture's stepped temple and B-ZOOM's stepped landmarks every tier k ≥ 1 casts a shadow on tier k − 1's roof at the fixed sun, its area within ± 10 % of the prism law's, stack order never inverted; 0 hood pins within their clearance of a retaining-wall line, a pier or a strip; the hatch per facet: under `roofscape` 0 hatch lines crossing a valley line, a hip line or a wing standing on the wing, every sloped facet's lines within 1° of parallel to its eave, and under `fakeGablePerWing` the per-wing census above; 0 hood pins within their clearance of an entrance reserve (the reserves at `service` entrances and at a stack-hosted access's outside door, `stackAccessDoor(b, a)` (V03 §3.7.2 (1)), among them), and — the `wings` and plan rungs derived — 0 within 0.3 m of a porch, a secondary porch, a stoop, an outside basement stair's steps or a stack access's outside door (fallback the reserve's depth doubled; the porch and secondary-porch clauses from M6b, the stoop and outside-stair clauses from M6-P, the stack-door clause and the reserve's own clauses from M5 on the eager records); on volume 2's terrace-wall sub-fixture and the B-ZOOM hill seed with the most fall walk-outs, 0 hood pins inside the reserve at a walk-out's door (`basementDoor(b)`) and 0 basement-door rectangles on the main entrance's side of a walk-out building whose `basementDoor(b)` lies on another side (its main entrance keeps its own rectangle); 0 hood pins on an `ovalCourt` building's floor; an empty tile draws the base marks only and a single wing its facets hatched | B-ZOOM census | P | S5 |
| T-V1-27 | S5 (e): shadow length ∝ stored height under the fixed sun, r ≥ 0.99, pins, crowns and stepped tiers' shadows included; a wall with no step casts no shadow | B-ZOOM | C | S5 |
| T-V1-28 | B-ZOOM `hatched`: role continuity ΔE2000 < 2 across every band switch; the contrast matrix on the shipped palette; the palette targets on the measurement render (§8.2, item 69); S5 (g) city-zoom legibility unchanged with the tier on; a sheet lacking a stage-2 program draws the base program | B-ZOOM | C | S5 |
| T-V1-29 | budgets (V01 §6): opening a district — model and display list ≤ 6 ms + 0.06 ms × B for non-ring fabrics and ≤ 10 ms + 0.07 ms × B for `ring`, checked per template against NG's per-template recordings at B = 150, 450, 750 and 1 300; first-visible-tile raster ≤ NG's 73–111 ms at comparable counts, measured separately; the METROPOLIS lines; per building ≤ 75 µs model and ≤ 85 µs render (S5 (b)); draw calls and uploads within §12.5 (S5 (c)); one-click added cost ≤ 12 ms at CITY | bench | P | S5 |
| T-V1-30 | S6 (a): five variants of one template in five actions (T10's New random on the district); (b) the default path one action with p95 ≤ 0.5 s for a medium standalone neighbourhood document; (d) addresses, names and footprints preserved across the bands 100 %; (e) 0 hand-offs to another tool | app harness (§13.4) | O / P | S6 |
| T-V1-31 | B-REF against NG (§13.5's NG rows, read from `baselines.json`), **under the `NG` preset** (V01 §3.15; each row's arm `preset: 'NG'`, V12 §2.1's `PresetArm`): districts and standalone neighbourhood documents matched to NG's by building count per template (C8's bands: medium area 600–779, ring 1 209–1 287) — blocks per 100 buildings inside NG's band by the band rule (KS); the bent-cut signature rows unchanged by stage 2; the court (hollow-block) share per band in band; the ring template's ring count and spacing-ratio distributions against NG's ring captures (`profile-neighbourhood.md` RA-2) by the band rule; **hood pins per 100 buildings per kind and template** inside NG's band under `NG` and within 3 × NG's under the default preset; the carved plaza's share of its hood's or district's area per size tag within ± 15 % of NG's median share, a scale-free ratio (`ng.plazaM2`'s tuning target, V01 §3.15) | B-REF | P | S4 |
| T-V1-32 | the D-5 panel against NG (§13.6 (2)), **under the `NG` preset** (the panel's NG groups `preset: 'NG'`, V12 §3.9.1): twenty pairs over the four NG templates — `area` a refine close-up, `street`, `ring` and `square` (carved, item 422) replace close-ups — rated pass at 14 of 20, no template worse on every pair; unrated → M5 *provisional — not rated* (§16); beside it, the same twenty seeds under the default preset shown to the owner unrated | D-5 | O | S2 (d) |
| T-V1-33 | exports: a district or outline SVG at the neighbourhood band holds its hood pins, access symbols, squares, places and title; GeoJSON carries hood pins only with `closeup: true`; every export withholds local and secret names and access symbols by §9.2's table; the full JSON round-trips every V01 §2 field byte-identically; a terraced ward's VTT export blocks along every retaining wall by §11.1's rule (its derived step ≥ `vtt.retainingMinCm`, broken over its stairs and ramps; a wall with no step no line), piers block, and the SVG groups `sem.wall.retaining`, `sem.way.raised.<class>` and `sem.raised.pier` are present; the GeoJSON rows for retaining walls, raised ways, supports, spans, stairs and ramps and deck plots and buildings carry exactly item 447's kinds and properties (`retaining` per run, `raisedSupport` per support) — 0 `stepCm` arrays, 0 `raised: true` flags where item 447 names `raisedKind`; the skeleton file carries a quarter's `fabric` and `terrace` (V01 §5.3); a scope with no stage-2 content exports the base's content only | export suite | C | — |
| T-V1-34 | editing lifecycle: every edit of V01 §4.1 in B-EDIT's random sequences (10⁴) — apply, undo, redo, replay, migrate — exact; `revert` on a district's fabric path returns it to S7c's choice; an edit on a target a dossier change removed is orphaned and reported (§7.4) | B-EDIT | C | — |
| T-V1-35 | registry completeness (§2.8's CI path-coverage test extended): every new record and field has its producer, consumer, edit kinds, lifecycle row, render semantics, label kind (where labelled), export rows and persistence; **read-set test**: each hook's recorded reads ⊆ its declared inputs (V01 §3.1) — on a seed with islands S9b's reads of `reservations.landing`, `allocations.landing`, each island's `shadeBasis` and `terrain` inside its declared clause (V01 §3.1's S9b row), and on a sky unit S7c's and S9b's reads of `shadeSky` inside theirs; `DistrictContext`'s lists empty (never absent) where their inputs are, and `under` read only after the tail; the registry covers `District.terrace`, `terraceState`, the strip holes and deck ownership | CI | C | — |
| T-V1-36 | determinism: every stream key distinct in a B-CITY city with stage 2 on and in the sky fixture (the new concerns included, §6.1's distinctness test), hood-pin draws against S11's decoration draws on `pin.decor` included; no two addresses equal per template row over B-FUZZ's faces (seeds under `S8.seed`); digests identical on the five engines, pool sizes 0–3 | nightly | C | — |
| T-V1-37 | the clerk (volume 10's harness): `why` on a district's fabric, a block's content, a square type, a place's name and a hood pin answers from committed state — the same answer before and after a save, a load and an unrelated edit; a T8 preview returns three distinct variations; a viewer's key without `local` never receives a court's name; the `district.terrace`, ward-edge wall and under-deck strip answers the same before and after a save, their pushes named by V11's families (`sun`, `nuisance`); a subject no V01 provider covers answered by volume 10's provider for its kind | clerk harness | C | — |
| T-V1-38 | void squares: the claimed square area within ± 15 % of A; 0 plots on a corner claim; the centrepiece at the junction wedge; a district with no void junction gets no void square, reported | B-CITY (void runs) | C | S4 |
| T-V1-39 | the epoch hook (with volume 6): the `hood.fabric` participant runs S7c and S9b only on new districts, new faces and due blocks rung 3 redevelops; standing squares, greens and manor blocks survive byte-identical; at an epoch that adds a raised way across an opened district the participant writes 0 plot removals and 0 household moves — the clearing and its re-housing are V06's, audited by its household ledger (V06 §3.19 (7)) — and the crossed districts' chunks read stale; an epoch with no new face, due block or scope writes nothing | hook fixture (M4's) | C | — |
| T-V1-40 | no wrong answers (item 101 R2): in B-EDIT's random sequences, 0 refusals other than dossier-owned and lock cases; every bend named in one line; a content edit in a full poor quarter re-homes its households and names where | B-EDIT | C | — |
| T-V1-41 | shade (g item 102): with `w_sun`, the shade gains and `manor.sunWeight` at 0, byte-identical to the build without them; on volume 5's island fixture over a uniform district, the manor-block share inside the island's strip below the sunlit remainder's by the declared weight within tolerance; no block changes band from the term alone | fixture, B-CITY | C | — |
| T-V1-42 | catchment and siting (g item 103): a class with a coverage row reaches the same served-district share whether S10b or `catchmentOf` counts it (one partition, J-V1.35); 0 manor or green blocks within an emitter row's radius when its weight is 1; 0 S9b typings on a block S10a (i) filled; on the underground and sky fixtures, `catchmentOf` on an undercity plot reads `underDistance` and counts its neighbourhood as its own `district` unit, and on an island plot a walk row counts the island as one unit, equal to V05 §3.5 (3)'s count; an element under no district returns the empty list, `plotLandM2` 0 gives `skyDistrictCount` 1 | B-CITY, fixtures (V04's, V05's) | C | — |
| T-V1-43 | chains (g items 104 (h), 105, 107): on B-CITY with dossier and custom chains, ≥ 80 % of supply links inside one district fall within their good's `comfortM` along the way graph; 0 districts named for a chain below item 72's threshold; districts with an `alongWay` chain take `street` above their base rate | B-CITY (chain variant) | C | — |
| T-V1-44 | ladder records (g item 108): on the surveyed dossiers, every QUARTER and GUILD record's members shown in the close-ups of the districts that hold them, member counts summing to the record's; 0 S9b typings on a SIZE record's block; 0 members double-counted; a dossier change removing the record behind a fixed input releases it at its block's next re-derivation, a user's lock or pin on it reported orphaned | dossier suite | C | — |
| T-V1-45 | walls on barriers (g item 106): on item 106's river-loop and cliff fixtures, 0 `wallside` templates on closure-only stretches, 0 template faces on intramural gardens, every barrier run typed hard by J-VI.3's mapping (II.1's seam typing, item 541), 0 ground seams typed from `sheer`; a hard `cliff` run portal-free with the rear-plot rule, no wall street and no template face across it | fixtures | C | — |
| T-V1-46 | the surface of the underground (g item 109): every public opening of source `opening` and role `access` a named place and a symbol in its district's close-up, and 0 places for skylights, sewer and adit mouths, gratings and stairs; symbols drawn only for accesses on a ground face with `ground.at` outside every footprint — 0 symbols under a roof, 0 accesses marked twice at the building band (a symbol and volume 3's head), a yard's dug access shown only under an admitting key; 0 surface marks over an unexcavated void; each undercity neighbourhood's `parent` equal to `districtsAbove(part, core)`'s first entry and to II.7.5 (2)'s largest-share rule on 100 % of V04's fixtures; `fabricSignature(region)` equal to V12 §3.4's town-side measures on the same region for 100 fixture regions — the distinctness bar itself is V04's T-V4-45 — and `null` measures for a region with no built block or part-0 way; a landfall-bricked grating and a locked lifeline stair each draw their §8.2 form on the surface and underground alike, a grating whose element is sealed draws `bricked` and one whose element collapsed its rubble trace; an access with no stored state draws its derived reading, else `open`; with the underground off, 0 opening places and 0 symbols | fixtures (V04's), B-CITY | C | — |
| T-V1-47 | catacombs (g item 109 (k) (2)): every catacomb entrance a place in the close-up of the district or hinterland area holding it, and a symbol unless its head stands in a cemetery chapel (V01 §3.8.8), on cemetery ground or at a CITY or METROPOLIS quarry ossuary's surface head; **0 catacomb entrances on a church building, the cathedral's included** (none inside the footprint of a building whose class's `crypt` column is `always` or `basement`); 0 places or pins for crypts, the cathedral's included; a crypt joined to a catacomb by a (3b) link adds 0 entrances; on the METROPOLIS fixture with the Cemetery network, every extramural ground's entrance reachable by the outline close-up; an untargeted replace close-up over a district holding a source cemetery moves 0 of the source faces, the owning church's plot and the entrance plot; a targeted edit's dry run names the closed source (V04 §3.5.1 (8): the complex frozen — no growth, `fill` unchanged, every gallery kept) in V01 §3.9's quoted line; every demolishing replace over a stagnant catacomb lists its `blockLifted` notice | fixtures (V04's), B-EDIT | C | — |
| T-V1-48 | S4 (e): a requested landmark — a `landmark` card on a district with a σ ≥ `character.anchorSigma` reservation, or a declared institution whose row asks for the landmark template — delivered with its ring and fans, or its bend named, in ≥ 99 % of B-EDIT's requests | B-EDIT | C | S4 |
| T-V1-49 | S4 (f): over B-CITY, every typed square's siting rule, every context feature's rule, every template requirement and the seam guard hold in ≥ 95 % of checks, each rule reported separately, the square score's flatter-block tie-break among them | B-CITY | C | S4 |
| T-V1-50 | terraced wards (g item 110 (a), (e), (f)): (a) on B-CITY's hilly and mountainous seeds with the relief rows' `terracedEdges` on, every `stepped` district's consecutive contour streets lie ≥ 0.6 s apart along the fall everywhere and within [0.6 s, 1.4 s] over ≥ 80 % of their length (the terrain's own variation beyond, reported; *fallback*: Δz taken per level from the slope along the fall line through the pole, re-measured), and every district with `asks` and `walls` whose fabric declares terraced edges carries a ward-edge wall on each qualifying run (item 302) and none on a hard or `reserve` run — a cliff, shore, `wall` (a moat's enceinte) or `frame` run included; (b) 0 ward-edge walls in districts below `terrace.slopeMin`, and 0 walls of any source on a levelled unit whose mean slope is below it ("nowhere flat"); (c) 0 wall lines doubled (a plot wall within 0.5 m of and parallel to a ward-edge wall); (d) on the second fixture's ravine and B-CITY's ravine seeds, both flanks carry contour streets and lanes join the thalweg path to each flank's series; (e) inside every opened close-up every way crossing a wall carries a stair or ramp interval by the way-class crossing row, 0 gaps — a lane from a bridge end included; (f) on steep ground levels closer than `terrace.minGapShare × s` clipped, the series stopped at `terrace.maxLevels` and reported, and level 0 unlaid bent to `bent-cut` by F-TEMPLATE | B-CITY, fixture | C | S2 |
| T-V1-51 | raised ways in close-ups (item 110 (b), (f)): (a) 0 junctions between a raised part and a part-0 way in any opened close-up; (b) 0 plots, blocks or hood pins in an under-deck strip, the base's vaults excepted; (c) every ground crossing of a strip through an `open` span meeting the clear-width and clearance rows, within ± 30° of square; (d) 0 bridge portals or bridgehead squares at a raised deck; (e) part-0 way names, and χ̃ of every district crossed only by raised ways, byte-identical with the raised-way rows on and off, except where a portal moved; (f) 0 generated raised ways inside TOWN-rung close-ups and standalone neighbourhood documents; (g) 0 squares with two fountains (a centrepiece and an aqueduct's outlet); (h) a strip over a whole template face leaves the district no template face | B-CITY (CITY, METROPOLIS), fixture | C | — |
| T-V1-52 | removal (item 110 (b)): on each B-EDIT CITY seed, removing a generated viaduct leaves every district outside the changed-way set byte-identical; the viaduct stays absent after Regenerate (keep), after New random on each crossed district and after a Re-derive from S6; its freed strip is re-plotted | B-EDIT | C | — |
| T-V1-53 | deck plots (item 110 (d)): 0 deck plots typed by S9b; 0 hood pins on deck plots; every deck plot in exactly one district's allocation (its owner's; a deck whose owner rule meets no district in the hinterland pseudo-district's), the population whole; the owner's close-up draws them; the second fixture's mole with its mid-mole tower and the fort at its mouth drawn in the harbour district's close-up; a fallen deck's plots fated and the owner's chunk re-derived; a bridge crossing a terraced ward's edge gives its deck plots to its intramural end | fixture, B-CITY (harbour seeds) | C | — |
| T-V1-54 | the second known-city fixture at M5 (item 110 (e)): its skeleton re-run with stage 2 on — its declared quarters' fabrics laid (the terraced wards `stepped` with their walls, the precincts' `landmark` rings, the ravine's flanks), its drawn ways and walls held byte-identical, its hand-authored version's close-ups opened with every held entity kept; V12 owns the fixture's own golden | fixture | C / O | S2 |
| T-V1-55 | lifecycle round trip (V01 §2.7, §3.18 (d)): on a B-EDIT CITY with every V01 record present (fabrics, `fabricParams`, a declared `terrace`, typed blocks, `HoodPlace`s of every kind, `closeups` with overrides, a surface edit, a held retaining wall, a deck plot), each stored field's six cells exercised — create, read, save → load byte-identical, regenerate (keep and New random), undo and redo, migrate from the previous schema version — each exact; every derived view of V01 §2.3 (`DistrictContext`, `DistrictSignature`, `terraceState`, `stepProfile`, `WayNamingContext`, the request, result and `SeamReport`) recomputed on load, undo, redo and regenerate, never stored, and a load re-deriving nothing; a `fabric` row id no table holds (a later version's or an `editTable`-removed row) read as `bent-cut`, reported, by §7.5's table-row migration | B-EDIT, migration suite | C | — |
| T-V1-56 | the edge sweep (V01 §3.18): (a) degenerate geometry — every geometry-committing step of V01 fed zero-length, zero-area, self-touching, collinear and coincident inputs takes its failure class's ladder (F-TEMPLATE, F-UNIT) through the kernel's refusal, and every view derivation (hood pins, symbols, programs, labels, the frame, exports) skips the degenerate mark; 0 crashes, hangs, lost data or whole-map retries; (b) every row of V01 §3.18 (e) a fixture asserting its outcome and its rung — no input, one item, the maximum and its caps, missing, empty or contradictory data — each run under save, load, undo and redo; (c) every toggle and preset row of V01 §3.18 (c) on a B-CITY-lite city: the islands, the underground and item 110's rows each on and off, the `pins` and `trees` layers and the style's `details` and `shadows` each on and off, and `MFCG`, `FTG`, `NG`, `FM` and the default preset, each asserting its row's outcome, with save, load, undo, redo, regenerate and migrate at each | B-FUZZ, fixtures, B-CITY-lite | C | — |
| T-V1-57 | the rungs (V01 §3.18 (b)): one seed per rung from THORP to the METROPOLIS cap and a standalone neighbourhood document at each `contextRung`: at THORP, HAMLET and VILLAGE no S7c, S9b, refine or outline close-up, hood pin or place is registered or run, and a village grown into the town ladder takes its fabrics and contents from its first S7b and S10a; at TOWN stage 2 whole with 0 generated raised ways, 0 quarry-ossuary entrances and no sky unit run; at CITY and METROPOLIS stage 2 whole; at the METROPOLIS cap the district count S6's and every stage-2 quota bound only by its own rows; each within V01 §6's lines | B-CITY (rung sweep) | C | — |
| T-V1-58 | the oasis and the map frame (V01 §3.18 (f); item 111): on an oasis fixture, the spring pool read as a `lake` body by the waterfront feature and the rows' `waterShare`, its grove and irrigated gardens never a template face or an S9b candidate, item 111's well pins counted as prior picks by the close-up, and a terraced ward beside the pool with no ward-edge wall on its shore run and its contour streets ending at the setback; on a frame fixture, a `frame` run hard and portal-free with no plot fronting it, no ward-edge wall on it, the levelling stopping at the margin band | fixtures | C | — |

**Parity metrics against NG** (run under the `NG` preset): T-V1-26 (draw style), T-V1-29 (open time per template,
raster, per building, uploads), T-V1-31 (block and pin counts per template by building count, bent-cut signature, courts,
ring statistics), T-V1-32 (the panel). Every other bar is conformance (C) or an outcome NG cannot reach (seams, context,
editing, persistence, knowledge, the owner's file-g rules). **The NG parity sheet's roof construction** (V02 §5.3, the
same sentence): from M6a the NG parity sheet keeps `fakeGablePerWing`; at M6b the NG draw-style bars (T-V1-26's census)
are re-measured on `roofscape` and the sheet switches to it when they pass, else keeps `fakeGablePerWing`, reported.

## 8 Build plan

### 8.1 Where it slots into §16

Stage 2 is **M5**, after the base's M4 and M4b; in J122's combined order (§16's staged-milestones table, INDEX §4) it
runs after M4 beside the village (V-M1 – V-M4), M6-E and the plan rung's P0, P1 and P3, and M6 and M6-U start after it
(M6-U may run beside it with a second pair, its U3 and U4 then waiting on W15). Three small pieces land earlier because
the base reads them or its goldens would otherwise shift twice:
* **M1** — the schema only: `Block.content` (always `ordinary`), `Block.overrides`, `HoodPlace`'s registry row (no
  producer yet), `TypedBoundary` and `DistrictContext` declared (II.5's readiness reads the boundary view), `Recipe.product`
  (`town`), the three concerns' ids and the `S8.seed` stage id reserved in the registry (append-only, §6.1, item 345); the
  **way-naming context**'s features in S13a with the M1 grammar authored against them (V01 §3.7.2); and `hood.constants`'
  one `settings` row shipped whole — every column of V01 §3.14's column table at its default, since a compiled row holds
  every cell (V11 §2.2) — whose only reader before M3a is the naming context. ≈ 0.5 pw inside M1's naming and schema
  lines.
* **M2b** — `Way.slopeP95` written by S9 for every way and the **way-surface rule** (V01 §3.7.3) with field pass 2, since
  `lit`'s and `ink`'s close-up bands draw surfaces at M2b; the two **hook points** S7b and S10a declare (item 323; no
  registration until M5, so they do nothing) and the base table **`squares.quota`** S7b (3) sizes its square claims from
  (item 301). ≈ 0.25 pw inside M2b's content line.
* **M3a** — with item 110's base milestone (§16 M3a; the second known-city fixture): `District.terrace` (item 211),
  `terraceState` (V01 §2.3), `stepProfile` (item 245) and the `levelledUnits` / `terracedEdges` declaration the bent cut
  makes (BCR-V7-34), because the base's district-edge source reads them from M3a (item 302), with `hood.templates`'
  `stepped` row shipped whole. The second fixture's terraced wards and precinct rings are authored **by hand** at M3a —
  no stage 2 exists yet — and T-V1-54 re-runs its skeleton with stage 2 on at M5. ≈ 0.25 pw inside the base's M3a
  item-110 line.
* **M5** — everything else. **The M5 way-name shift, declared**: the naming context's features exist from M1, but at M5
  S9b's squares and S13a's places appear for the first time, so every way that now ends at a new square or passes a named
  place gains a `to` or `placeOnIt` feature and its name may change once; M5 writes the shift record for S13a with that
  cause (§13.3), beside the templates' and the typed squares' shift of the default-preset goldens (V01 §8.4 (6)). The
  parity presets create no places and shift nothing (T-V1-4). Retaining walls and stair or ramp intervals shift no name:
  a way's shape reads the unlevelled `slopeP95` (V01 §3.6 (3); T-V1-24).

**The register at every exit** (V12 §3.11; J-V1.97). Each milestone above exits with `plat calibrate register --check`
green over the cells it lands, their entries from V12 §3.11's default line; this volume writes no register line of its
own. The cells each lands: **M1** the `hood.constants` row, whole — the naming context reads four of its columns
(`name.curvedShare`, `name.bentDeg`, `name.landmarkM`, `name.tradeShare`; V01 §3.7.2), the rest inert until their readers
land, every calibratable column taking its entry `cal.hood.constants.*.<key>` here; **M2b** the `way.surface` rows
(V01 §3.7.3) and the base table `squares.quota` (item 301; its entries' `owner` `base`, V12 §3.11's owner rule,
J-V12.73); **M3a** `hood.templates`' `stepped` row, whole — every calibratable column of `hood.templates` takes its entry
here (V11 §2.2), the `select.*` weights W3 tunes at M5 among them, with `params.terraceSpacingM`, the cell `terraceState`
reads with `hood.constants`' `terrace.siteShare` (V01 §2.3); **M5** every cell of the other `hood.*` tables (V11's
registry row 62; V01 §8.3's list) and `hood.templates`' other rows (rows only; their columns' entries written at M3a). A
`ref:…` cell passes the lint with no entry; the `NG` preset's entries are code-read reference values or the switch's
fixed on value and take none (V01 §3.15). The constants V01 §3.14 marks "calibrate at M5" or "measured at M5" are tuned
by this volume's bars inside the work items that land them, before M5's exit: S7c's weights to T-V1-4's share (W3), the
land factors to T-V1-12 (W16), the small-block weights and `yardPaved` on the NG pairs (W4), `land.smallShare` (S-V1-b),
the terrace gain and share to T-V1-50 (W18), `ng.plazaM2` on the NG pairs to T-V1-31's plaza share (W17; V01 §8.4 (9))
and the hatch pitch to T-V1-26's census (W9; a style-sheet cell, §8.2). The landed value is the tuned one; a tuning that
moves a value an earlier milestone landed (a `hood.constants` column from M1; a `hood.templates` column from M3a,
`terraceSpacingM` and the `select.*` weights among them) appends a history row to its one entry by V12 §3.11's *A value
moved by its owning seat before its due* (`plat calibrate register --defaults --milestone M5`), and those bars stay this
volume's acceptance bars (V01 §7), never register metrics.

### 8.2 M5's work items, dependencies and estimates (person-weeks, expert; PLAUSIBLE)

| item | content | depends on | pw |
|---|---|---|---|
| S-V1-a spike (first week) | the ring and holed-band cutting on 1 000 real template faces from B-CITY walled districts, the contour series on 1 000 hillside and ravine faces of B-CITY's hilly and mountainous seeds, and B-FUZZ's template generator; bar: T-V1-9's fallback ≤ 10 %; if it fails, the ring inset widens to `1.5 × eLo` and the series cap drops to 4, re-measured, then the `landmark` one-ring form becomes `ring`'s first fallback | M0's bent cut, M4 | 0.75–1 |
| S-V1-b spike | the dispatch's land accounting against the population-whole guarantee on B-CITY-lite (T-V1-12), and λ's small-block share measured | M2b (S7b, S10a, S10b) | 0.5 |
| S-V1-c spike | `hatched` at the neighbourhood band: operations per wing and tile raster time at 450 and 750 buildings (T-V1-26, T-V1-29) | M2b's tile pyramid, M3b's families | 0.5 |
| W1 template machine | the four primitives, the template face, validation, F-TEMPLATE, the four NG rows (`@plat/hood`: `TemplateFabric` over `FabricStrategy`) | S-V1-a | 3–4 |
| W2 context rows and features | six of the seven context rows (`park` is W17's); V01 §3.6's features (bank path, rear-plot water rule, stair-stepped ways, barrier edges) | W1 | 1.5–2 |
| W3 S7c and χ̃ | `DistrictContext`, the provisional character, eligibility, weights, the draw, the report; the calibration sweep for the 15–35 % share and T-V1-5's classifier | M2b's S12c, W1 | 1–1.5 |
| W4 S9b dispatch | quotas, squares with siting and types, greens, manors, phase 2, ring centres, void squares, the seam guard; S10a / S10 / S11 / S12b consequences; court greening; item 284's programme and capacity terms | S-V1-b | 2–2.5 |
| W5 local identities | the local-place step and `HoodPlace`, place labels and knowledge (the naming context and surfaces are M1's and M2b's) | W4 | 0.75–1 |
| W6 refine close-up | hood pins and rows, the chunk, staleness, overrides and re-match, `closeup` persistence, framing and vignette | M3a (instance events, dry run; volume 3's `basementDoor(b)` and `stackAccessDoor(b, a)`, built at M3a over V03 §3.7.1's door helper; volume 2's `PorchKindRow`s, M3a-V2), W4 | 1.5–2 |
| W7 replace workflow and tools | T8's `fabric`, T9 on blocks, T6's furniture stamp, T12's slider; the ghost and count badge for a fabric change; the close-up panel (volume 9 lays out the screens) | M3a, W1, W6 | 1.5–2 |
| W8 unit runs | the standalone neighbourhood document (`Recipe.hood`, S0–S2's one-district programme, the `star` row, the border, default cuts), T1's `product`; the sky unit's district partition and split on a fixture island (volume 5 plugs `SkyStrategy` in later), its crossing-site spans and their bridges built after S8, `levelledGroundCm`'s dispatch on a sky key with its raster fallback — the island's terrain raster, nothing levelled before S10 (item 309's M5 part, built with item 580; BCR-V5-30) — volume 5 adding the island's datums at M6-sky; the rim walk's `plantRimWalk` with its two callers, and its runs after generation with each receiving district and a re-searched claim's district re-derived at the rim (V01 §3.10.3 (4), (6)) | W1, W3, W4 | 2–3 |
| W9 `hatched` at all four bands | roof law, hatch, lobed crowns, road surfaces and modes, stair-stepped ticks, pin symbols, the per-band order, night, states; its measurement render and B-ZOOM continuity | S-V1-c | 3–3.5 |
| W10 labels and exports | the hood title, place labels, per-format content (V01 §5.3) | W5, W9 | 0.5–1 |
| W11 verification | T-V1-1 – T-V1-58 (T-V1-50 – T-V1-54 with W18), B-REF's NG template rows in `baselines.json` (research-side, numbers only; NG's plaza share of the hood's area per size tag among them, T-V1-31), the NG panel tooling (§13.6 (2)'s seeds and counts), goldens and shift records; the register entries of the cells M5 lands (`plat calibrate register --defaults`, then `--check`; V01 §8.1) and the history rows of the M1 `hood.constants` and M3a `hood.templates` columns S-V1-b, W3, W16, W17 and W18 tune before M5's exit (`--defaults --milestone M5`) | all | 2–2.5 |
| W12 shade and siting reads | `DistrictContext.shade`, S7c's shade term, S9b's sun and siting factors, the strips shared with field pass 2, S9b's move after S10a (i) with its hook point, the pins' shade gain (g items 102, 103) | W4, the base's item 102 and 103 work | 0.75–1 |
| W13 chains, links, ladder members | χ̃'s allocation-level `c`, `DistrictContext.chains` and `records`, S7c's chain term, the fixed SIZE and GUILD inputs, the panel's reader query and the title's QUARTER label (g items 104, 105, 107, 108) | W3, W4, the base's item 105 and 108 work | 1–1.5 |
| W14 barrier-closure reads | the barrier seam typing (item 541), walled-stretch shares, intramural gardens excluded (g item 106) | W2, the base's item 106 work | 0.25 |
| W15 item 109's surface parts | first the three services volume 4's M6-U reads — `fabricSignature`, `districtsAbove` and the opening pass, which read only committed records (V04 §8) — then the places, the ground access symbols, the undercity parent rule, `under`, the outline close-up with its hinterland rows and chunks, the catacomb source protection and the `blockLifted` notice | W5, W6, volume 4's underground tail at its milestone (the parts that read V04's records land with it; the outline close-up lands at M5 regardless) | 1.5–2 |
| W16 the template's land | S7c as S7b's hook, `templateLandM2`, the reconcile with template land, S8's land caps, the stress fixture | W3, S-V1-b | 0.5 |
| W17 emulation and legibility | the `NG` preset (V01 §3.15: the stage-2 switch and its edit — the Re-derive from S2 with its fates, T-V1-4 (f) — the eight `ng.*` rules and their switches, `pin.decayScope`'s entry, `ng.plazaM2` tuned to T-V1-31's plaza share), the `park` row, the outline by fabric (V01 §3.10.2), `hood.constants` in the settings form with its column table (V01 §3.14), the kind coverage table, the `WhyProvider`s and the `hood.fabric` participant | W1, W4, W8 | 1–1.5 |
| W18 item 110's neighbourhood parts | `terraceState` and `District.terrace` (landed with the base at M3a), the contour series and ravine flanks, `TemplateFabric`'s levelled units and terraced edges, held walls and the digest, the strip holes and arch crossings, the parts-per-reader table, raised-way land and the add and remove paths, deck-plot ownership in the close-up, the hatch by roof kind and the stack order with tier shadows, `way.stair`, `retaining` and `raised`, the precinct rings, the exports and the VTT rule (§11.1), the Terraces hillside, the panel's rows and three why providers; T-V1-50 – T-V1-54 | W1, W4, W6, W9, the base's item-110 work (M3a) | 1.75–2.5 |
| **M5 total** | | | **27.25–36.25** |

The base's M5 line was 14–18 pw; this volume's is **27.25–36.25 pw** (+13.25–18.25: the seven context templates, S7c's
selection with the template land in the allocation, the dispatch at generation with its land accounting, local places,
the sky and standalone unit runs, the file-g reads W12–W15, the emulation preset W17 and item 110's neighbourhood parts
W18; item 474 re-prices §16's M5 row and the effort table's stage-2 line). The M1, M2b and M3a pieces above are absorbed
by those milestones' lines, as §16's pricing rule allows for a refinement a line already prices. §16 computes the base's
and the whole program's totals once with every volume's line (item 568; J-V1.26).

### 8.3 `@plat/hood`'s contents (§14, item 505)

`TemplateFabric` (one `FabricStrategy` implementation reading `hood.templates`; the base's `BentCutFabric` stays the
`bent-cut` row's), the seed primitives, `FabricSelector` (S7c, S7b's hook) with `templateLandM2`, `BlockDispatcher` (S9b,
S10a's hook), the local-place step (an S13a registration with its opening pass for the underground tail),
`CloseupDeriver` (the refine derivation, the outline close-up and the ground access symbols), the unit runner
(`HoodUnit`: standalone and sky, the latter reading `SkyUnitInput`), the `DistrictContext` and `DistrictSignature`
builders (with `terraceState`, whose pure function lives in `@plat/model` beside them from M3a), `TemplateFabric`'s
`levelledUnits` and `terracedEdges` (BCR-V7-34), the services `catchmentOf`, `districtsAbove`, `fabricSignature` and
`skyDistrictCount` and the writer `plantRimWalk` (V01 §3.16), the symbol key `accessSymbolKind` (V01 §3.8.8), the
`WhyProvider`s (V01 §4.5), the `hood.fabric` epoch participant (V01 §3.3.6), the tables `hood.templates`,
`hood.dispatch`, `hood.squares`, `hood.pins`, `hood.kinds`, `hood.placeKnowledge`, `hood.defaultCuts` and
`hood.constants` — one `settings` row in V11's settings form holding the `NG` preset's entries (V01 §3.14, §3.15) — in
`@plat/tables` (`squares.quota` is a base table there too, item 301), and the `hatched` sheet's stage-2 programs in
`@plat/render`, as every family's programs are. `hood` depends on `layout` and `plots` only through their interfaces
(§14's dependency rule, which item 505 extends with `DistrictContext`, the hook registrations and the services).

### 8.4 Risks, in order

1. **Ring and holed-band robustness on irregular template faces** (S-V1-a answers it first; F-TEMPLATE guarantees
   completion regardless).
2. **The dispatch's land and the population guarantee** (S-V1-b; item 284's terms; T-V1-12).
3. **Template separability** (T-V1-5's fallback raises the distinguishing parameters).
4. **`hatched`'s raster cost at district scale** (S-V1-c; the pitch fallback).
5. **The owner's time for the NG panel** (§13.6 (7): an unrated panel never stops the build and never lets the gate be
   claimed).
6. **The default map's look changing at M5** (the templates, typed squares and new places shift every default-preset
   golden and some way names once, declared; the parity presets do not move — T-V1-4; decided yes, Q-V1-1, J122).
7. **The template land estimate against the land a template actually takes** (V01 §3.3.7's caps and T-V1-12's stress
   fixture; its fallbacks raise the spine factor and cut the ring slack, then re-run the greedy pass).
8. **Volume 4's underground tail** (W15's V04-reading parts land with it; until then the opening pass, the access symbols
   and the catacomb protection are registered and inert — no system, no access, no source).
9. **The `NG` plaza reading** (`ng.plazaM2`, NG's unit-to-metre scale HOLD; tuned on the NG pairs at M5 to T-V1-31's
   scale-free plaza share before T-V1-31 and T-V1-32 are read; the pins keep their rows' `sizeM`, V01 §3.15).
10. **Level-line series on noisy terrain**: the simplify at `eLo / 4`, the `0.6 s` clip and the 15-level cap answer it;
    S-V1-a's fuzz is extended to contour and ravine faces, bar T-V1-9's fallback ≤ 10 % on faces meeting the `stepped`
    row's requirement; *fallback*: the spacing's lower bound rises to `2 × dBar + w_tpl` and the level lines take a
    second simplify pass at `eLo / 2`, re-measured.
11. **The base's item-110 pieces** (the levelling with its district-edge source, the raised-way generator and its spans,
    the deck row) land at M3a; until they do, W18's readers are registered and inert — no wall, no raised part, no deck
    plot — as W15's are before volume 4.

## 9 Decisions

Each is vetoable; "chose X over Y because Z". A superseded or amended row carries one mark (E-24); the governing row
keeps the reason.

| id | decision |
|---|---|
| J-V1.1 | Chose to compute a **provisional character χ̃** by §4.5 (2)'s own function over S7b's allocation rows (size 1) over reading the placed character (it exists only after S12c, after the layout it should choose) or a separate "intended character" input, because the allocation is eager and complete before S8, the function is the one item 72 defines (no second meaning of "character", J-A72.41), and T-V1-2 checks it tracks the placed vector (V01 §3.2). |
| J-V1.2 | Chose to **select each district's fabric at generation** (S7c) from its context and χ̃, on in the default preset and off in the parity presets, over templates only on request, because "the city composed of neighbourhoods" and IMPROVEMENTS S4 ask for templates chosen by context, S4's bars need them by default, and item 23's rule (defaults emulate where the reference has the behaviour; our extensions ride on top as weights) keeps the MFCG and FTG presets exact (V01 §3.3; Q-V1-1, decided yes by J122). |
| J-V1.3 | Chose to **derive the request's mode** (refine when the strategy equals the committed fabric, replace otherwise, unit when nothing is laid) over passing it, because a passed mode could contradict the model and the three cases are fully determined by it; and to drop `reason` from the request (it is `SkyIsland.reason`) (V01 §2.4). |
| J-V1.4 | Chose S7c's default weights so that 15–35 % of a CITY's districts take a template, organic the rest, over NG's standalone odds (≈ 42 % non-`area`) in a town, because realism (the tiebreaker) makes organic fabric the medieval norm with named morphologies the exception, and legibility gains most from a few distinct quarters; NG's odds stay the standalone `auto` (V01 §3.3.3, §3.3.5). |
| J-V1.5 | Chose to **align a carved plaza with the template face's grain** (its OBB major axis) over NG 1.2.2's random rotation, because a square aligned with its streets is the faithful form and legibility gains; the coin between a rectangle and a round plaza stays NG's (V01 §3.4.5). |
| J-V1.6 | Chose **`carved` as the `square` row's default** over J-S42's `void`, because J-S42's premise — "NG's own square is the void its unbuilt plots leave" — rests on a 1.1.0 devlog image, while NG 1.2.2's code (the build every recording and the D-5 panel use) carves a rectangular or round plaza with a through street (`code-neighbourhood.md` §2.1, CONFIRMED); emulation-first makes the reference's behaviour the default and the panel must compare like with like; `void` stays the row's other mode (items 542, 422). |
| J-V1.7 | Chose to **run the block dispatch for every fabric at generation** (S9b), the base's bent cut included, over dispatching only template districts or only inside a close-up, because typed squares, greens and manor blocks are content (they change capacity and must be in the model, eager, the laziness contract), S4 (d) is a town-wide bar, and a refine close-up may not change geometry (V01 §3.5). *Amended by J-V1.40.* |
| J-V1.8 | Chose **typed squares by a per-1 000-inhabitants quota, sited at main junctions and before landmarks**, over NG 1.2.2's rule that every small block is empty, because S4 (c) and (d) set exactly that, a square where town logic puts it is the realistic reading (NG-GQ-7), and the small-block emptiness survives as phase 2's yard and green weights (V01 §3.5.3, §3.5.6) — and as the `NG` preset's rule (V01 §3.15, J-V1.98). |
| J-V1.9 | Chose **fixed default cuts** for a standalone neighbourhood document's `FieldBands` over §4.5's land-share cuts, because a standalone neighbourhood document has no town whose shares could set them and land-share cuts would force every hood to span every band, so a "rich hood" could not be rich (V01 §3.10.1). |
| J-V1.10 | Chose the **largest L1 face as the template face** over laying the template across the whole district, because a district's faces are separated by arterials and district-scale secondaries a template must not cross (§4.6 step 10's rule against crossing district structure), and NG's hood is one outline (V01 §3.4.1). |
| J-V1.11 | Chose **whole rings only** (the series ends at the first ring that does not fit) over NG 1.2.2's rings clipped by the outline, because a broken ring is the truncation NG-GQ-5 names as a weakness and a ring fitted to its boundary reads as planned (V01 §3.4.4). |
| J-V1.12 | Kept II.3's **hood pins as derived presentation** over model entities, because several hundred per district would bloat the model and the digest for picture-level detail, and the base's model pins already carry every pin a rule or a reader needs; edits persist as `instance` overrides (V01 §3.8). |
| J-V1.13 | Chose a model record **`HoodPlace`** with `local` knowledge by default for courts and yards over unnamed places or labels hung on blocks, because the owner's "local identities" and item 30's "known only locally" meet naturally in the places a neighbour would name, the knowledge filter needs a target with a `knownTo`, and names must be model data (§9.1) (V01 §3.7.1). |
| J-V1.14 | Chose to **condition way names on a derived naming context at S13a, from M1**, over naming ways again when a close-up opens, because names are eager model data (§4.10); the features land with the M1 grammar, and the places they read are created before the ways are named (V01 §3.7.1); the one M5 shift the new squares and places cause is declared (V01 §8.1). |
| J-V1.15 | Chose to **derive way surfaces at S10a's end** from the fronting blocks' pass-2 band over setting them when a way is created, because a way is created (S4, S5, S8) before the field that should set it exists, and pass 2 is the first reading every block shares (V01 §3.7.3). |
| J-V1.16 | Chose the **unit run**, and gave the standalone neighbourhood document a **virtual host town's programme** carved to one district over a roster run at the hood's own population, because a town-scale roster for 3 000 people would build a small town's institutions (a town hall, walls) into one neighbourhood, while a district's share of a host town's demand is what a neighbourhood holds (V01 §3.10.1). |
| J-V1.17 | Chose to **partition a multi-district island by the bent cut at district scale** over S6's grower, because the grower claims coarse faces and an island's arena has one; the cut makes the island's streets its district seams at once (V01 §3.10.3). |
| J-V1.18 | Chose to key `fabric.select` on **the district's own lineage key with the reroll forced to 0** over the town root and S6's seed-order index, so New random on a district keeps its fabric (II.4's "same kind, new seed"), and no declared quarter, merge, split or renumbering Re-derive moves another district's draw, while the seed-order index is renumbered by edits (V01 §3.3.4, §3.12). |
| J-V1.19 | Chose to type every end **S8** makes on a shared spine `baseLane` — at generation or in any fabric's re-derivation — and to keep `tJunction` for an end an **edit event** inserts itself, over typing a replace close-up's ends `tJunction`, because a replace close-up is S8 re-run, so its ends are S8's, and one kind per writer keeps the seam records' provenance exact (V01 §3.11, item 539). |
| J-V1.20 | Chose to give a standalone neighbourhood document's town root **creation index 1** over sharing the town's index 0, so a hood and a town of one seed share no stream and a user comparing them sees two independent draws (V01 §2.8, item 340). |
| J-V1.21 | Chose **one new parameter on four existing tools** (T1 `product`, T6's furniture stamp, T8 `fabric`, T12's `pinGate`) over a stage-2 tool, because item 101's rule forbids a thirteenth tool and each is the tool whose layer the action belongs to (V01 §4.2). |
| J-V1.22 | Chose **manor blocks by a band share capped by the district's top-band households** over NG 1.2.2's count law (one per eight blocks, at random), because the class mix (item 71) and the allocation already say how many rich households live there, and a manor block must house one of them (V01 §3.5.5). |
| J-V1.23 | Chose **court-greening probabilities per band** over NG 1.2.2's complete-frontage-ring rule, as II.3 (item 58 (b)) ruled "ours has a target per band"; NG's 23–58 % is the calibration anchor (V01 §3.5.7). |
| J-V1.24 | Chose to re-derive the **district from S10a** when a block's content is edited over re-deriving the block alone, because the block's households must be re-homed within the district by S10a's distribution, and blocks whose allocation does not change re-derive byte-identically (V01 §4.1). |
| J-V1.25 | Chose a **bank path** for docks, riverbank and comfortable-or-richer waterfront districts without noxious water trades, else the **rear-plot water rule**, over one waterfront treatment everywhere, because working riverbanks kept their plots to the water while promenades and quays belong to harbour and richer quarters (V01 §3.6). |
| J-V1.26 | Priced **M5 at 27.25–36.25 pw** (from the base's 14–18) over absorbing the additions, because the context templates, the selection with its land, the dispatch with its land accounting, local places, the unit runs, the file-g reads, the emulation preset and item 110's neighbourhood parts (W18) are new mechanisms §16's pricing rule says must be itemised (V01 §8.2, item 474; §16's totals by item 568). |
| J-V1.27 | Chose our own **lobed crown** (arcs on a jittered polygon, a lit cap) over NG 1.2.2's midpoint-bulging crown, because the clean room forbids transferring its construction and the look (lobed, two greens, a lit cap) is what the census and the panel judge (V01 §5.1.2). |
| J-V1.28 | Chose a **per-band order list for `hatched`** at the neighbourhood and building bands over the shared list, because NG's order (pins under houses, block trees above, greens first) differs from MFCG's and §8.2 already keys the order by band (V01 §5.1.3). |
| J-V1.29 | Chose the **hood title as view furniture** (model only in a district export and a standalone neighbourhood document) over a model label per district, because the district's name is already model data and a close-up is a view (II.4's persistence status) (V01 §5.2.1). |
| J-V1.30 | Kept II.4's **`closeup` event before the first close-up edit** and gave it one parameter (`pinGate`) over a free parameter map, because the only derived content is the hood pins and a typed record migrates exactly (V01 §2.5, §3.8.6). |
| J-V1.31 | Chose **no new event kind** over a `setFabric` or a block-kind-setting event, because `setAttr` + `regenerate` already carries dry run, fates, undo and migration, and II.4 already names the replace close-up that way (V01 §4). |
| J-V1.32 | Chose a **per-district template street width** `w_tpl` in the `secondary` band over §4.6 step 9's length law for seed streets, because a template's streets are its planned frame (NG draws them at one width per map, COV-NG-N20) and lanes the bent cut adds keep the length law (V01 §3.4.2 (b)). |
| J-V1.33 | Chose to land the **naming context at M1 and the surface rule at M2b** over at M5, because names are in every golden from M1 and surfaces are drawn by the M2b close-up bands; the squares and places that first appear at M5 still shift some way names once, which V01 §8.1 declares. |
| J-V1.34 | Chose to let a template district's regeneration cost **its fabric's factor over §12.6's scoped law** (≤ 45 ms for a ring district of 450 buildings) over holding every district to 30 ms, because a ring's holed band cuts cost 2–3 × a plain cut (NG measured it) and the bar was set before templates existed; a `bent-cut` district keeps ≤ 30 ms, and the relaxation is declared for the owner's veto (D-18's rule; item 474 (c)). |
| J-V1.35 | Chose to make **the `district` and `neighbourhood` catchment units one unit — the district a close-up opens** (item 103 (f)'s "one apothecary per district"), over a finer neighbourhood partition inside districts, because the owner's words use the two interchangeably, V11's `CoverageSpec` already counts by district, and one partition makes the served share the same whoever counts it (V01 §3.16; T-V1-42). |
| J-V1.36 | Chose to fix a **standalone neighbourhood document's layers** — islands off, sewers off, undercity never, caverns and ruins by relief, at most one catacomb from its own cemetery ground, no epochs in volume 6's first build — over leaving them to the town defaults, because the owner limited islands to cities and metropolises, a hood has no church count or growth programme to read, and an implementer must not guess (V01 §3.10.1 (7)). *Superseded in part by J-V1.77.* |
| J-V1.37 | Chose **one ring growth factor per district** (NG 1.2.2's geometric law) over a fresh factor per ring, because emulation-first makes the reference's law the default and the whole-rings rule already departs from NG where it must; II.2 states it as item 543 writes it (V01 §3.4.4). |
| J-V1.38 | Chose to run **S7c as S7b's hook between its greedy pass and its reconcile**, the draw made once on the greedy χ̃, the reconcile moving the households a template's land displaces, and S8 capping the plaza and the ring series at the land reserved — over S7c after S7b (land nobody planned) or before it (χ̃ needs the allocation) — because it is the only order in which the character chooses the layout and the population stays whole (V01 §3.3.7). |
| J-V1.39 | Chose to hold **the one square quota in a base table `squares.quota`**, read by S7b (3) for squares larger than a block and by S9b for the sub-block remainder, over putting it in the stage-2 `hood.dispatch` table, because S7b's claims are base behaviour from M2b and a stage-2 table must not drive a base stage; the single count is kept (V01 §3.5.2; item 301). |
| J-V1.40 | Chose to run **S9b as S10a's hook after step (i) and before step (ii)**, over before S10a, so the dispatch sees the tanneries, middens, prisons and institutions (i) places and never types a manor or a green beside them, while (ii)–(iii) still read `Block.content`; a forecourt at generation is sited only against a reservation, a block-sized church taking S11's forecourt yard part (V01 §3.5.1, §3.5.3). |
| J-V1.41 | Chose an **`NG` preset** reproducing Neighbourhood's own dispatch, manors, pins and plaza sizes over comparing our extensions with the reference, because item 23 makes the reference's behaviour the default configuration and the D-5 panel must compare like with like; the default preset keeps our rules as declared extensions (V01 §3.15). *Superseded by J-V1.98* (its form: §7.6's zeroing parity preset with entries on `hood.constants` alone, not a column on every stage-2 table). |
| J-V1.42 | Chose to draw **a standalone neighbourhood document's outline by its fabric** (star, rounder star, a strip round the main street, a frame round the square) over the kind's weights, because Neighbourhood's outline belongs to its template (NG B1) and a main-street hood on a star is another morphology; context rows keep the kind's weights (V01 §3.10.1, §3.10.2). |
| J-V1.43 | Chose to **divide the court and plot-yard pin gates by 5** (`pin.courtFactor` 0.2) and keep the square, yard-block and green gates, over the same gates everywhere, because Neighbourhood has 0–2 wells and 0–1 fountains per medium hood and the base asks for "charm, not zero", not saturation; T-V1-31 bars the density (V01 §3.8.2). |
| J-V1.44 | Chose to name S9b's market square **`trading`** — a small open trading place with a market cross, no stalls, no market rank, never a market reservation — over deleting it, because a junction square where people trade is realistic while item 24 keeps the market count and separation for markets alone (V01 §3.5.3). |
| J-V1.45 | Chose the **outline close-up as a view action** (no event) that opens districts and the hinterland's faces inside an outline, chunked per hinterland face, over a unit run or a new district, because the ground already has a base and seeing an extramural cemetery or a quarry must not change the model; a `quarter` declaration stays the way to make a district (V01 §3.8.9). |
| J-V1.46 | Chose to make **a catacomb's source cemetery, its owning church's plot and its entrance plot fixed inputs** of every stage-2 re-derivation, while allowing an edit that targets them with the closed source named in one line (the complex frozen, V04 §3.5.1 (8)), over forbidding such edits, because item 22's least disruption protects what the user did not touch and item 101 R2 forbids refusing what no lock or dossier fact protects; demolishing fates over a stagnant catacomb emit the `blockLifted` notice (V01 §3.5.12, §3.9). |
| J-V1.47 | Chose a **world hatch pitch** (`hatch.pitchM`, calibrated so the census mean is 17–19) with a zoom-stable parity subset below 1.5 px, over a screen pitch, because the count per wing must not change with zoom (§8.2's census; NG's model-unit spacing) and the hatch must not re-scatter (V01 §5.1.2). |
| J-V1.48 | Chose to **split the open-time law** into model-and-display-list time (non-ring and ring laws) and first-tile raster, with METROPOLIS lines, over one law including raster, because NG's figures separate them and one law let a 750-building district take 60 % more than NG's non-ring maximum (V01 §6). |
| J-V1.49 | Chose to **consume volume 5's `SkyUnitInput`** — no S1, the rim strip untouched, the landings as gate-ranked portals, the unit inputs' field, kinds and fabric hint — over re-deriving the island, because V05 builds the island once and names this runner as its unit inputs' one caller (V01 §3.10.3). |
| J-V1.50 | Chose **bends, not refusals**, for every stage-2 dry run — the content edit re-homing its households, values clamped, a small outline scaled up — refusing only a dossier fact or a lock, because item 101 R2 is the owner's rule (V01 §4). |
| J-V1.51 | Chose to price **W17** (the `NG` preset, the park row, the outline by fabric, `hood.constants`, the why providers and the epoch participant) as its own work item beside W12–W16, over absorbing it, because the work is real and §16's rule itemises new mechanisms (V01 §8.2; the total is J-V1.26's). |
| J-V1.52 | Chose **"why" providers that recompute from committed state**, flagging `drifted` when today's recomputation differs from the committed choice, over persisting S7c's and S9b's reports, because a stored report goes stale on the next edit while the recomputation is the same before and after a save, a load or an unrelated edit (V01 §4.5). |
| J-V1.53 | Chose to offer **through ring radials** as a vetoable fabric parameter (`ringRadials` 1), default staggered (NG's), over staggered only, because NG-GQ-1 asks for continuous radials as an option and the default must stay NG's (V01 §3.4.4). |
| J-V1.54 | Chose a **new hard seam type `marsh`** for deep-marsh closure arcs, over typing them `field` (soft) by J-P37's fallback, because a marsh that closes a wall circuit is a barrier no street crosses (g item 106 (a); item 541). |
| J-V1.55 | Chose to key hood-pin draws with the **`STAGE_VIEW` stage component** over a creation-index offset, because it is §6.1's own marker for view-side draws and cannot collide with any stage's index space (V01 §3.8.2). |
| J-V1.56 | Chose a **distinct stage component `S8.seed`** for template seeds over giving seeds the first creation indices of the cell's S8 run, because it keeps the seeds' and the lanes' orders independent, so a lane added or removed never renumbers a seed (V01 §2.8; item 345). |
| J-V1.57 | Chose **`DistrictKind` values only** for a standalone neighbourhood document's kinds, with "great houses" and "slum" as wealth presets, over class-named kinds, because no district is zoned by class (J-P1, item 72 (d′)) and wealth is the field's (V01 §3.10.1). |
| J-V1.58 | Chose to read **shade** in S7c by the district's terrain-and-wall share only (islands are placed after S7b) and in S9b and the pins by the full share including the islands' strips, evaluated once per shade evaluation (V05 §3.19 (6)) at S9b's first read and shared with field pass 2 (on a sky arena every reader reads V05's `shadeSky`, J-V1.87), over waiting for pass 2, because the rich must seek the sun where the dispatch chooses and no strip may be computed twice (V01 §3.3.3, §3.5.5). |
| J-V1.59 | Chose to let a **stretched incompatible chain raise the `street` row** and a chain's street take its trade's name, while S7c and S9b never name or assign a quarter, over a chain quarter by rule, because item 107 (e) revised item 104 (h) (3): a quarter only past item 72's threshold or by declaration (V01 §3.3.3, §3.7.2). |
| J-V1.60 | Chose a **contour series** — streets on level lines one terrace apart (`2 × dBar + w_tpl`), level 0 at the pole — for the `stepped` row over one contour spine, because a terraced ward is a stack of contour streets a double plot row apart with stairs down the fall line, and one spine left the rest to the bent cut, which guarantees no second terrace street (V01 §3.4.3). |
| J-V1.61 | Chose **one producer for every generated wall line — the base's S10–S11 levelling, the ward-edge wall included** as its district-edge source (item 302) — over this volume raising the ward-edge wall at S8, because item 110 (a) homes the edge source inside "S10 and S11's levelling", item 110 is base design built at M3a before this volume's M5 (the second fixture's terraced wards need edge walls then), and volume 7's BCR-V7-34 already routes the gate through the fabric; this volume supplies the state (`terraceState`) and `TemplateFabric`'s declaration, and the placement rule is item 302's (V01 §3.17.1 (4)). |
| J-V1.62 | Chose **`District.terrace` as a district field** over a `fabricParams` key, so a declared terracing survives a change of layout and the base's edge source and the elevated-road generator read it without reading the fabric (V01 §2.2; item 211). |
| J-V1.63 | Chose to **place every wall inside its producer's faces with a derived step profile** over a seam exception for walls, because the locality oracle then needs no new case and no re-derivation writes into a neighbour (V01 §3.11 (7); item 245). |
| J-V1.64 | Chose a **thalweg path and a series per flank** over one template face terraced on one flank, because a ravine town terraces both sides of its gully with a path down the floor; and **flank-encoded creation indices** (`f × 32 + (k + 16)`, \|k\| ≤ 15) over a single range k ∈ [−31, 31], because two flanks' streets share the template face's cell and must not share an index (V01 §3.4.3). |
| J-V1.65 | Chose the **under-deck strip as one hole crossed only through open spans** over treating each pier as a hole, because a row of small holes would drive the holed laws to thread lanes between piers, and streets pass under a viaduct only through its arches (V01 §3.17.3). |
| J-V1.66 | Chose **part-0 readings for every trade, frontage and portal rule** (V01 §2.3's table) over reading every part, because a river bridgehead gathers trade where the river is the barrier and a viaduct's approach does not; nothing fronts a deck. |
| J-V1.67 | Chose **the changed-way set** as the scope of a raised way's removal or addition over the crossed districts alone, because a cut route is re-routed by the base and the detour's districts change too; and gave the tombstone one reader, the base's generator (V01 §3.17.5). |
| J-V1.68 | Chose the **landward root's district** as the owner of a deck's plots over a deck pseudo-district, because a bridge's shops and houses belonged to the parish and ward of the bank they began from and a pseudo-district would add a kind with no layout; for a bridge, its **intramural end** over `Bridge.deck[0]` (kept as the tie-break), because the city side held its bridge while `deck[0]` is only the emitter's order (V01 §3.17.6). |
| J-V1.69 | Chose **one hatch rule per roof kind** (flat: parallel to the major axis, no ridge tapers; the faces of a pyramid, tent or skeleton: parallel to their eaves; cone and dome: rings) over hatching every roof as if pitched, because NG draws only pitched roofs so the rest needs our own rule, and a flat tier drawn with ridge tapers reads as a gable (V01 §5.1.2). |
| J-V1.70 | Chose **precinct rings that follow the precinct's outline**, up to two per district, over one circle at the circumradius, by the realism tiebreaker: real ring streets trace a close's or an arena's outline, and the second fixture asks for ring streets round precincts, plural (V01 §3.4.4). |
| J-V1.71 | Chose to **tilt a standalone neighbourhood document's ground on request** (T1's hillside edge, the Terraces card's default) over hiding the Terraces card on a flat hood, because every card must be reachable and lay what it names (item 101 R2; V01 §3.10.1). |
| J-V1.72 | Chose to read **the stair-stepped threshold from the way-class crossing row's `rampMaxGrade`** (V11's `ways.crossing`) over a separate `stepped.minSlope` in `hood.constants`, because a lane is stair-stepped exactly when a ramp of its class could not climb it and one fact is stated once (item 23); a stair-stepped lane's grade and a wall crossing's stair or ramp read the same row, and II.7.6's `vaultSlope` is the base's vault source, which this volume neither draws nor reads (V01 §3.6 (3)). |
| J-V1.73 | Chose to run the `hatched` **hatch per roof facet** of the sheet's roof construction — `fakeGablePerWing`'s faces until stage 3 registers, volume 2's `roofscape` facets after, each sloped facet's lines parallel to its eave and clipped to the facet — over lines per wing across the whole footprint, because once the roofscape draws valleys, hips and stacked tiers a line crossing them paints over another facet; under `fakeGablePerWing` a gable or hip wing's faces split at its ridge, so NG's law and the census are unchanged, and the NG parity sheet keeps `fakeGablePerWing` until M6b's re-measure (V01 §5.1.2, §7). |
| J-V1.74 | Chose to draw a **surface symbol only for an access on a ground face whose `ground.at` lies outside every footprint** over every ground access, because a building- or basement-hosted access lies under its roof at the neighbourhood band and volume 3's plan draws its head at the building band — one mark per access; a ladder, hatch or cellar stair opening in a yard draws its symbol, a neighbourhood or lifeline stair draws `stair`, and an arch vault's door is the vault's own drawing (V01 §3.8.8, §5.1.2). |
| J-V1.75 | Chose an **entrance reserve** read from the eager `Entrance` records and sized by volume 2's porch rows for the hood pins' clearance, over reading the lazy porch, stoop and outside basement stair, so a close-up stays a pure function of committed state whatever order the click derives it and the `wings` and plan rungs in; T-V1-26 measures what remains, with a doubled-depth fallback. The reserve stands at every main and `service` entrance, at an `external` basement's outside door (`basementDoor(b)`) and at the outside door volume 3 opens for an access hosted by a building with neither a basement nor `ground(b)` (`stackAccessDoor(b, a)`, J-V1.96) — both door points volume 3's functions of eager records over V03 §3.7.1's door helper, so the reserve and the plan agree and a walk-out's reserve stands at its real door, not the main side (J-S23.7, J-S23R3.2). The porch rows are volume 2's `composition.json` rows shipped from M3a-V2, so the reserve has its own sizes from M5 and a `table` edit of them re-derives the chunk through its digest, over holding fallback sizes in `hood.constants` until M6a, a second copy of volume 2's facts (J-S23R1.8, J-S23R1.10) (V01 §3.8.2). |
| J-V1.76 | Chose to **select opening places by volume 4's record fields** — source `opening` with role `access`, or a catacomb system's `stair` — over the access kind, because `mouth` is also the kind of a sewer outfall, a culvert inlet, a quarry adit and a skylight, and a catacomb entrance is a `stair` (V01 §3.7.1). |
| J-V1.77 | Chose to fix a standalone neighbourhood document's layers **through the inputs volumes 4 and 5 read** — `recipe.layers.islands` off, `Features.sewers` false, the undercity `forbid`, the tail's below-TOWN set with the catacomb at TOWN's count (one) — and to make **quarries, the generated vaults and the buried town none**, over V04's TOWN-and-above rows at `contextRung`, because no stage but S0 and V04's hood line reads `Recipe.product`, and a standalone neighbourhood document has no host town whose building stone a quarry supplies, no growth history whose scar a buried town fills and no town bridges, streets or undercity whose vaults volume 4 generates; §0's promise (a cave or a ruin, at most one catacomb) holds (V01 §3.10.1 (7)). |
| J-V1.78 | Chose to make **`fabricSignature` return volume 12's town-side paired measures over a region** (the block-area median, the grid order R4, the grid axis) over a mapping from `DistrictSignature`'s components, because those components are not the measures (orthogonality is a junction-angle share, not R4; a bearing entropy is not an axis) and volumes 4 and 11 read the region under a ruin, not a district; the test and its margins stay V12's and V04's, cited (V01 §3.16). |
| J-V1.79 | Chose to leave **an epoch's clearing under a new raised strip to volume 6** (its ledger and `siting`), the `hood.fabric` participant only re-reading the committed plot set, over this volume's add path at the epoch, because one clearing and one re-housing channel keep the household ledger whole; an edit's added part keeps the add path (V01 §3.17.4, §3.3.6 (3)). |
| J-V1.80 | Chose to report a sky unit run's landings in a **`SeamReport` field `landingsReached`**, with `portalsTotal` 0, over counting them as seam portals, because a sky seam is hard and portal-free (II.1 (5)) and volume 5 bars `portalsTotal` 0 while every landing must still be reached (V01 §3.11 (6); item 539). |
| J-V1.81 | Chose to plant the **rim walk** as one `esplanade` on the rim strip's face and one `street_trees` row along its inner setback line with no way — `Greenery.along.way` optional for that row — over laying a path way on the strip, because the strip is never cut (V05 §3.12) and a row of trees needs no carriageway (V01 §3.10.3; item 313). |
| J-V1.82 | Chose to state **no undercity-parent rule of this volume's own** and compute II.7.5 (2)'s through `districtsAbove(part, core)`'s first entry (ties by address), over the main plaza's projection, because one rule is stated once, in the base, and a plaza point and the chamber's largest share disagree on a core straddling two districts (V01 §3.16). |
| J-V1.83 | Chose to have **the outline close-up raise the `wings` rung** of every building inside the outline, centre-out from its centroid, as a district click does, over close-ups only, because a cemetery chapel, a mill or a farmstead opened by an outline must be composed by some rule (V01 §3.8.1, §3.8.9). |
| J-V1.84 | Chose to lay **a ground landing's destination lane before the template seeds**, first in the district's S8 transaction, and rank its attach as a gate portal, over the seeds first, so no seed can pass the yard's attach side and leave the destination to a lane that no longer fits (V01 §3.4.2 (a); BCR-V5-20). |
| J-V1.85 | Chose to type an **`enceinte` closure arc as a walled `wall` run**, which the wall-side feature and `wallShare` read like any walled stretch, and to map J-VI.3's other kinds to `water`, `cliff` and `marsh` with `sheer` never typing a ground seam, over a list with an extra "escarpment", because an earlier ring's curtain is a real wall with its intervallum or rear plots and J-VI.3's vocabulary is the one closure vocabulary (V01 §3.6 (7), §3.11 (4); II.1's seam typing, item 541). |
| J-V1.86 | Chose to read **a `sky-*` district's S7c kind factor** from its ground counterpart (V05 §2.4) — `sky-island`'s as the kind of the ground district with the highest pass-1 mean value, ties by address — over factor 1 for every sky kind, so an island's template odds follow the institution it carries (V01 §3.3.3). |
| J-V1.87 | Chose to make **every shade reader on a sky arena read V05's `shadeSky`** (S7c's `shade` term through `DistrictContext.shade.meanShare`, S9b's manor sun factor, the hood pins' gate; `islandShare` a higher island's strip onto this island) and none read the ground's pass-1 mask, over letting island districts read the ground's mask under the island, because the ground's mask describes the ground's daylight, not an island's surface a hundred metres above it (V01 §2.3, §3.5.5, §3.8.2). |
| J-V1.88 | Chose to home **the sky district count as a pure service of this volume, `skyDistrictCount(plotLandM2, districtHa)`**, reading `hood.constants.sky.plotShare` (default the base's dense-core share, V01 §3.14), called by the unit runner and by volume 5's unit inputs and coverage units, over each volume writing the formula with a literal share, because one count read in three places must have one formula and one table cell (V01 §3.10.3 (2), §3.14, §3.16). |
| J-V1.89 | Chose to have **the raised way's add path run as the epoch commit's operator** — removing the strip's plots as for an edit after volume 6's clearing, so its re-homing finds nobody to move — over a separate epoch-only removal path, because one operator keeps an edit and an epoch byte-identical on the plots and leaves the households to the one engine that re-houses at an epoch (V01 §3.17.4; V06 §3.19 (7)–(8)). |
| J-V1.90 | Chose to run the unit runner **after generation only where the whole island is laid anew** — `raiseIsland` (an epoch's, a late declaration's), New random on an island, a Re-derive from SKY or earlier — inside the calling commit with §6.3's carry-over, and to re-derive the faces a growing resize adds or a rim reshape moves by **each receiving district's scoped re-derivation from S8**, over giving the runner a scoped mode, because the runner partitions the whole island and would re-cut every district for one stretch of rim, while §7.3's district scope already carries the locality, fixed inputs and undo a local edit needs; the district count is therefore re-read only by a unit run; a resize dilates the whole rim, so every district bordering it receives faces. Chose also the rim walk as **one island-level pair**, re-planted whole by `plantRimWalk` at every unit run and after any rim change, never by a district, over each receiving district re-planting "its stretch", which no district scope can write (the strip lies in no district), and over a separate rule for a shrink; a shrinking resize and a stretch moved inward give no face and re-derive no district; and a re-searched institution claim re-derives the district that holds it from S8 with the island institution's use and building released from V01 §3.9's fixed inputs for that event alone — over keeping the fixed inputs whole, which would leave the new claim an empty hole and the institution on its old site, and over a unit run, which would re-cut every district (V01 §3.10.3 (6)). |
| J-V1.91 | Chose to lay each qualifying island crossing site's **span first, its two deck ends made bridge portals a seed or a lane must reach**, over routing an approach from each deck end to the nearest existing street by the lane rule, because before the seeds an island bank often holds no street to reach, while the portal machinery the landings already use (rank, anchors, F-TEMPLATE's lane rung) builds the street over the deck on both banks; the span's width is the mean of `w_tpl`'s range with no draw, so the bridge does not depend on which district's streams run first; and the span is **built after S8, before S9**, over building it with its furniture in the closing batch, because the island's deck plots (S10) and deck buildings (S11's `DeckContext`) read `deckCm`, `kind` and `piers`, and S8 is the first point at which the run knows which spans survive (V01 §3.10.3 (4); J-S23R3.4). |
| J-V1.92 | Chose to run a standalone neighbourhood document's **S7b (6)–(7) after its one-district allocation and take the void part from it**, P7's cap reading the hood's own poorest-band households, over the town's order (the underground first, from the roster's demand) with the virtual host town's roster, because the hood's demand is its capacity and the virtual town's poorest band would cap the void part at a whole town's share; taking the dwellers from the surface keeps the population exactly the capacity's, and the surface surplus it frees is where T8 re-seats anyone F6 cannot (V01 §3.10.1 step 6). |
| J-V1.93 | Chose to draw a surface access symbol **in §8.2's `states` form for its stored or derived state** — a sealed element reading `bricked`, a bar meaning `locked` — over a bar for a sealed element, because the base's one row serves the surface and the underground layer alike, so one access must read the same at both ends (V01 §3.8.8, §5.1.2). |
| J-V1.94 | Chose to read **an `echo` or `none` island's relief class as `plain`** for `terraceState`, the drawn class only for `own`, over the ground's class, because an echo is a quarter of the ground's amplitude over a dome and asks for no terraces — an echo island over a mountain town would otherwise wall a nearly flat surface (V01 §3.17.7 (2)). |
| J-V1.95 | Chose to read **a sky island's one part as part 0** in the parts table and wherever this volume says "part 0", "raised" meaning a ground-arena part ≥ 1, over adding a sky column to the table or re-keying island ways to part 0, because an island carries no raised way (V05 §3.22 (3) (d)) and its part is minted from `nextSkyPart` ≥ 1 to keep its addresses apart from the ground's (J-V5.2), so every reader's island row is its part-0 row (V01 §2.3). |
| J-V1.96 | Chose to place a stack-hosted access's reserve rectangle **at volume 3's `stackAccessDoor(b, a)`** — a pure function of eager records in `@plat/plots` from M3a (V03 §3.7.2 (1)) — over this volume's own projection rule, because one point stated twice diverges (stair 0 is a ground wing; the door is moved along its side), and the reserve stays a pure function of committed state in any order of click and rung (J-V1.75); T-V1-26's stack-door clause measures it from M5 on the eager records (0 hood pins within 0.3 m of the door; fallback the reserve's depth doubled) (J-S23R3.8). Chose also to add **whether each building has `ground(b)`** to the chunk's inputs digest (V01 §3.8.3), because a tier made solid or storeyed changes whether the rectangle exists while the footprint, the entrances and `basementDoor(b)` stay the same, and a digest that missed it would serve a stale chunk (T-V1-15's purity). |
| J-V1.97 | Chose to take **every calibratable `own` column of this volume's tables from V12 §3.11's default line** (`corpus` at M-CAL), and to treat the constants V01 §3.14 marks "calibrate at M5" or "measured at M5" as tunings this volume's bars make inside the work items that land them, before M5's exit — the landed value the tuned one, a later move a history row on its one entry — over writing this volume's own register lines in V02 §3.10.10's form with those bars (T-V1-4, T-V1-12, T-V1-26, T-V1-50, the NG pairs) registered as `BenchBarDef`s, because the bars already fail M5 when a tuning misses, so a `measure` entry due at M5 would record the same verdict a second time, and the corpus run at M-CAL is the only later measurement that can move these cells (V01 §8.1). *Fallback:* should V12's lint or the owner ask for an M5 `measure` status on them, this volume writes one line per family in V02 §3.10.10's form (method `measure` at M5, metric `bar.T-V1-<n>`, fallback "the default stays, reported"), restating the default entries in place by V12 §3.11's later-line rule, no value moving. |
| J-V1.98 | Chose to state **`NG` as §7.6's zeroing parity preset** (item 584) — a cell resolves to its `presets.NG` entry, else as it resolves under `MFCG` — with its entries on `hood.constants` alone (the stage-2 switch `fabric.extensionWeight`, eight rule switches `ng.*` and `pin.decayScope`), over an `NG` column on every stage-2 table or a recipe profile outside §7.6, because item 23 makes the reference's behaviour a configuration the D-5 panel compares like with like, the base under `NG` must be the base under `MFCG` (Neighbourhood's `area` fabric is MFCG's measured bent cut, II.2) so no base table should need an entry, NG's rules differ from ours as whole algorithms (a manor count, an empty-block rule, a pin site rule) that one switch per rule selects more plainly than value entries scattered over five tables, and a preset the compiler, the loader and the parity harness already resolve needs no second mechanism; chose also to name **the stage-2 switch** the steps read (`fabric.extensionWeight` > 0 for S9b, its programme land, the local-place step and the hood pins), over an unnamed "the step is `extension`", because a builder must find the cell that turns a step off under `MFCG` and on under `NG`; to split marked rows into **switch cells** (marked) and **geometry cells** (unmarked), over marking whole rows, because `MFCG`'s zeroing of a pin's size or a ring's portal gap would reach `NG` through the fallback, while no parity preset reads a geometry cell whose switch is off; that **no `NG` entry is a provisional number** — each a code-read reference value or the switch's fixed on value — and to hold the one metre reading `NG` needs, the plaza areas by size tag, as the default-column cell `ng.plazaM2` read wherever `ng.plazaByTag` is on, tuned by W17 to T-V1-31's scale-free plaza share under the default line's entry (J-V1.97), over an `own` entry `…@NG`, because the cell is one knob either way and the default line already binds it, and a scale-free share needs no unit-to-metre scale (J-A58.43's HOLD); that the pins keep their rows' `sizeM` under `NG`, over NG-sized pins, because no bar compares pin sizes and T-V1-26 already holds the draw style; and to take an in-town district's size tag from its allocated household count nearest a `size.*` chip (a building per household at NG's scale), because S8 lays the plaza before any building exists. |
| J-V1.99 | Chose to hold `hood.constants` as **one `settings` row in volume 11's settings form**, each V01 §3.14 key a column with its own `ColumnSpec` and register entry `cal.hood.constants.*.<key>`, keys unchanged, over rows of `{ key, value, unit, provenance, calibratable, extension }`, because V11's compiled cell takes its unit and `calibratable` from the column and V12 binds one entry per column, so the rows' units never reached the compiled cell and every constant shared one entry; chose also to state each column's type, unit, range, `calibratable` and marker in V01 §3.14's column table — the access-symbol sizes our own drawing sizes, not calibratable; the `ref:NG` code values, the work limit `terrace.maxLevels`, the budget `closeup.chunkKB`, NG's measured size chips and the switches not calibratable — and to leave the thresholds `terrace.siteShare` and `terrace.minGapShare` unmarked, because zeroing a threshold turns it on, while `asks` is inert under the parity presets through `terrace.askGain` 0 and volume 11's `terrace.enabled` off; to write the multi-ring's off value 1 as `landmark.maxRings`' `MFCG` and `FTG` entries, because §7.6's zeroing would give 0 rings; and to ship the row **whole at M1** (every column at its default), over growing its schema at M3a and M5, because a compiled row holds every cell (V11 §2.2) and a schema change is a major version, so the default line writes every calibratable column's entry at M1 (each holds a compiled cell, J-V12.73), the cells stay inert until their readers land, and a later tuning appends a history row (J-V1.97). |
| J-V1.100 | Chose to key the ground access symbols by a derived **symbol kind** — `accessSymbolKind(a)`: `catacomb` for a catacomb entrance, else the access's kind, `door` never passed (it draws no symbol) — and to hold `hood.constants`' `access.*M` column set equal to its values by T-V1-4's registry test, over moving the sizes to a row table keyed by kind with a `coversEnum` rule, because the sizes are twelve drawing constants read only by V01 §3.8.8 and §5.1.2, the settings row already ships whole at M1 with every other `hood.constants` key (J-V1.99), and a second table would add a registry row, a schema and a register slice for no reader beyond this volume; and over sizing by `a.kind` alone, which would size a catacomb entrance as a plain stair and leave `access.catacombM` unread. |
| J-V1.101 | Chose to state the stage-2 switch's edit as V01 §2.7's **first-reader re-derivation from S2** (V01 §3.15, *The switch's edit*), with §6.3's carry-over retiring what stage 2 no longer makes and the underground tail re-deriving after the ground, for **every** change of the resolved `fabric.extensionWeight` (V04 §4.3's switch row covers any change; inside (0, 1] the re-cut plots take its ground-edit row), over §7.6's slice invalidation, because the switch is read by S2's land estimate (`λ_b`, V01 §3.5.9), whose change moves every district's capacity and so every re-derivation downstream — slice invalidation would re-derive the same span with a scope no builder or oracle could name in advance — and because one named stage lets V04 §4.3 and T-V4-74 (b) cite this row; and chose to keep the held inputs (a declared `fabric` or `terrace`, a block's content set by hand, a place made by hand, the override rows) through the edit, over zeroing them with the switch, because the switch gates what stage 2 derives and the owner's everything-is-editable rule keeps what the author declared (§7.2). The opening place's lifetime (V01 §2.7, §3.7.1) follows: it lives with its host while the local-place step runs. |

## 10 Base change requests

Every base change this volume needs is a file f item, applied to the base by this pass; the base text is the home and
this volume cites it by item. The requests keep their ids (BCR-V1-n, formerly V01's BCR-n; ID-BCR).

| request | file f item | what the base carries |
|---|---|---|
| BCR-V1-1 | 505 | §14: `@plat/hood`'s line (V01 §8.3) and the `@plat/tables` and `@plat/model` additions (`HoodPlace`, `DistrictContext`, `TypedBoundary`, `FabricStrategyId`, `WayNamingContext` from M1) |
| BCR-V1-2 | 539 | II.1: `NeighbourhoodRequest` and `NeighbourhoodResult` (V01 §2.4's fields, `districts`, the optional request fields), `SeamReport.landingsReached` |
| BCR-V1-3 | 280 | §4.1: the stage graph with S7c (S7b's hook) and S9b (S10a's hook) |
| BCR-V1-4 | 294 | §4.5: `District.fabric` set by S7c from context and χ̃ |
| BCR-V1-5 | 210 | §2.5: `Block.content`, `squareType?`, `ringCentre?`, `voidCorner?`, the uniform `overrides` |
| BCR-V1-6 | 207 | §2.4 and §2.7: `Way.surface` derived at S10a's end unless edited; `Way.slopeP95` written by S9 for every way |
| BCR-V1-7 | 298 | §4.6: the strategy slot — `TemplateFabric` over `hood.templates` beside `BentCutFabric` |
| BCR-V1-8 | 284 | §4.2 S2: the programme's land term `(1 + λ_b)` (V01 §3.5.9) |
| BCR-V1-9 | 300 | §4.7: S10a's `afterDrivers` hook running S9b; content-typed blocks' capacity |
| BCR-V1-10 | 313 | §4.9 and §2.7: the court-greening and green-and-yard-block rows, the parks row widened, the rim walk's row and `Greenery.along.way` optional for it |
| BCR-V1-11 | 340 | §6.1 and §6.2: the concerns `fabric.select`, `hood.dispatch`, `hood.template`; a standalone neighbourhood document's town root at creation index 1 |
| BCR-V1-12 | 272 | §2.9 and §7.1: `Recipe.product`, `Recipe.hood`, the `closeup` event's `pinGate` |
| BCR-V1-13 | 285 | §4.2 S1 (2): the standalone outline rows by fabric |
| BCR-V1-14 | 405 | §8.2: the `hatched` family's neighbourhood and building bands |
| BCR-V1-15 | 417 | §8.5 (1): a `square` block drawn in `road`, a `green` block in `green` |
| BCR-V1-16 | 444 | §10.4: local names — S13a's `WayNamingContext` and `HoodPlace` names |
| BCR-V1-17 | 422 | §9.1: every `HoodPlace` a `LabelEntity` of kind `place` |
| BCR-V1-18 | 327 | §5.2: the rows F-TEMPLATE, F-DISPATCH and F-UNIT with their "how it is tested" cells (V01 §3.13) |
| BCR-V1-19 | 474, 568 | §12.4–§12.6: S7c's and S9b's budget rows, the neighbourhood band's open-time laws, the template regeneration factor; §16's M5 row re-priced and the totals computed once |
| BCR-V1-20 | 542 | II.2: the `square` row's default `carved` (J-V1.6) |
| BCR-V1-21 | 498 | §13.6: the D-5 panel's `square` pairs carved |
| BCR-V1-22 | 544 | II.3: the dispatch table's inputs and outputs as V01 §3.5 states them |
| BCR-V1-23 | 545 | II.4: the outline close-up; layout cards as T8's `fabric`, block content as T9's |
| BCR-V1-24 | 523 | §15.2 S4 (c): a junction with a tier-1 arm or two tier-2 arms, or before a landmark |
| BCR-V1-25 | 373 | §7.4: the `closeup` row's undo cell (the independence check) |
| BCR-V1-26 | 323 | §4.12: the stage-2 hook points and what stage 2 changes in the base |
| BCR-V1-27 | 200 | §1.1: the STAGE 2 row at build depth with volume 1 |
| BCR-V1-28 | 540 | II.1: `Sample` declared beside `Seam` (M1) |
| BCR-V1-29 | 383, 384 | §7.7: derivation row DR26 — a district's fabric and its blocks' content |
| BCR-V1-30 | 541 | II.1: seam type `marsh`; J-P37's barrier-closure typing |
| BCR-V1-31 | 345 | §6.3: the stage id `S8.seed` for template seeds |
| BCR-V1-32 | 301 | §4.7: the one base table `squares.quota`, read by S7b (3) above a block's size (from M2b) and by S9b below it (M5) |
| BCR-V1-33 | 369 | §7.3 item 1: a bounding way's `surface` and naming record inside the seam exception |
| BCR-V1-34 | 421 | §8.10: `InstanceStyle.pinKind`; a hood pin's spacing |
| BCR-V1-35 | 349 | §7.1: the `quarter` event's `fabric`; T8 `fill`'s `setAttr` of it |
| BCR-V1-36 | 560 | II.7.6: the catacomb entrance on the source's ground, never inside a church (merged with V04's BCR-36) |
| BCR-V1-37 | 554 | II.7.4: `AccessPoint.kind`'s public openings; each opening of role `access` a `HoodPlace` of kind `opening` |
| BCR-V1-38 | 543 | II.2: one ring growth factor per district |
| BCR-V1-39 | 290 | §4.3 and §4.5: the raised ways' generation stages |
| BCR-V1-40 | 448 | §11.1: the `.dd2vtt` retaining-wall rule (with item 447; V01-XCONF-2) |
| BCR-V1-41 | 211 | §2.5: `District.terrace` |
| BCR-V1-42 | 302 | §4.7: the district-edge source of S10–S11's levelling |
| BCR-V1-43 | 245 | §2.7: `RetainingWall` persisted fields; `stepProfile(wall)` a derived view |
| BCR-V1-44 | 350 | §7.1: the `quarter` event's `terrace`; `setAttr(district.terrace)` |
| BCR-V1-45 | 580 | §4.2 S1 (5) and §4.8: a sky island's crossing sites and their spans |
| BCR-V1-46 | 584 | §7.6: the `NG` zeroing parity preset |

## 11 Owner questions

| question | decision |
|---|---|
| Q-V1-1 — should the default map change at M5 to show its neighbourhoods? | **Yes** (J122; `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`): with stage 2 on, a default town's districts choose their layouts by what they hold and where they lie (about a quarter of a city's districts get a main street, a square, rings, a quayside, a wall-side street or a street round their church; the rest keep the organic lanes), and every district gets its squares, greens and manor blocks by its size and wealth; every default-preset town looks different from M4's, the change declared once as every golden shift is (V01 §8.1); the `MFCG` and `FTG` parity presets do not change, and the M5 panel re-offers their side-by-sides on the new default beside the NG panel (T-V1-32). |

No other owner question arises: item 110's parts and the catacomb and crypt rule are the owner's rules (g items 109 (k)
(2), 110), and every other choice is a vetoable decision (V01 §9).

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk):** the base's PART II whole and every base section this volume cites, with files f and g;
`docs/DEFINITION.md` and `docs/OWNER-INSTRUCTIONS-2026-09-25.md`; every volume section cited; items 58 and 72. The base's
gaps this volume fills are confirmed by search: `DistrictContext`, `TypedBoundary` and `FabricStrategyId` were used and
never declared (now declared in §2.5, MC-11); no rule set `Way.surface`; no generation path existed for a no-base
close-up. J-S42's premise is contradicted by the code reading (`research/findings/code-neighbourhood.md` §2.1) — the
basis of J-V1.6. The NG mechanisms this volume emulates (template seed geometry, the ring courses, the plaza coin, the
main-street course, the small-block rule, manor spacing, the pin decay, the hatch geometry, the random template odds, the
layer order) are `[READ]` and CONFIRMED in `code-neighbourhood.md` §0, §2.0–§2.11 and §6, its CA-2 structure in
`profile-neighbourhood.md` CA-2, and NG's size bands and times in `docs/confidence/ng.md` C8 and H1; the NG weaknesses
the context templates and local identities answer are CONFIRMED in `docs/improvements/ng.md` (NG-GQ-5, -6, -7, NG-VC-1,
-3, -5, -6, NG-LT-2, NG-UX-1). Clean room: no reference identifier, grammar, word list, palette, table or asset is
transferred; NG's numbers enter as mechanisms with our own metric constants and provenance marks.

**PLAUSIBLE (reasoning; no engine exists):** every constant marked `own` (V01 §3.14) — the `land.*` terms,
`manor.sunWeight`, `pin.courtFactor`, `hatch.pitchM`'s start, the `NG` plaza areas, the access symbol sizes, the
`terrace.*` and `raised.*` constants, `landmark.maxRings` and `landmark.roundTol`, `hood.hillsidePct` and
`vtt.retainingMinCm`; every budget (V01 §6), the split open-time laws and the METROPOLIS lines; the M5 estimate
(V01 §8.2); that S7c's weights give 15–35 % templates and separable morphologies; that χ̃ tracks the placed character
and agrees over the greedy and the reconciled allocation; that the dispatch's land terms keep the population whole under
every template class; that rings and contour series fit irregular, hillside and ravine faces with ≤ 10 % fallback; that
the entrance reserve clears every porch, stoop and tomb stair volumes 2 and 3 draw; that the lobed crown and the per-facet
hatch pass the NG panel and the M6b re-measure on `roofscape`; and that every bar of V01 §7 is met — each carries its
measurement and its pre-decided fallback.

## 13 Fix list

Empty. Every finding against this volume — its critique's, every seam round's and the coherence pass's — is FIXED in
the text or ruled INVALID by the adjudicator; the dispositions are in the validation records (`docs/volumes/critique/`,
`docs/validation/coherence/`). What remains is measurement, not design: each PLAUSIBLE constant and budget carries its
measurement and fallback (V01 §3.14, §6, §7).

## Integration notes

The integration lane's decisions for this volume (`docs/volumes/_integrate.md`) are folded into the body at their homes;
each is cited there.

| note | decision | where it now lives |
|---|---|---|
| IN-V01-1, IN-V01-8 | J-VI.1, J-VI.23 (clean-room): the block-content type is `BlockKind`; J-V1.31's alternative is "a block-kind-setting event" | V01 §2.2; J-V1.31 |
| IN-V01-2 | J-VI.17 H33: a crypt is `Basement.crypt`, a basement fact (V03 §3.7.4) | V01 §3.7.1, §3.8.8 |
| IN-V01-3 | J-VI.17 H8: the NG parity sheet's roof construction (V02 X14) | V01 §5.1.1–§5.1.2, §7 |
| IN-V01-4 | J-VI.2: `DistrictContext.raised[].reason` is the reason word derived from `RaisedReasonKey`, `'declared'` where the derived source is `declared` (item 244) | V01 §2.3 |
| IN-V01-5 | J-VI.9: the aqueduct's terminal outlet a `conduit_house` where the roster or the dossier holds one, else a fountain `Pin` | V01 §3.17.8 |
| IN-V01-6 | J-VI.13: the derivation row is DR26 | V01 §1b; BCR-V1-29 |
| IN-V01-7 | J-VI.4: an infeasible declaration that contradicts no dossier fact and no lock bends (item 101 R2) | V01 §4 |
| IN-V01-9 | J-VI.27: the piers are item 244's support step; the soffit bound is item 244's clearance rule (held `clearanceCm` first, else V11's per class) | V01 §3.17.3 |
