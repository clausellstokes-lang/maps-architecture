# Design volume 14 — World sites, encounters and the 2.5D view

> PENDING FABLE REVIEW — written by the session's architect seat volumes/architect-V14 under the owner's delegation (J339; the owner, 2026-10-16: "i defer all decisiosn to you"); covered by the whole-design retrovalidation (J84).

<!-- PROGRESS (the architect seat's ledger; removed at revision)
0 In plain words ................................ done
1 Scope, hooks, owner rules, out of scope ....... done
1b Wiring table ................................. done
2 Data model .................................... done
3 Generation (G1–G8, E1–E4) ..................... done
4 Editing ....................................... done
5 Rendering, labels, exports (R1–R4) ............ done
6 Performance budgets ........................... done
7 Tests and acceptance bars ..................... done
8 Build plan .................................... done
9 Decisions ..................................... done
10 Base change requests ......................... done
11 Owner questions .............................. done
12 CONFIRMED versus PLAUSIBLE ................... done
13 Fix list ..................................... done
-->

**How to read this volume.** It builds, to implementation depth, the three subjects the owner's rules of 2026-10-16
(`docs/AMENDMENTS-2026-10-16j.md`, items 131–141) give the map module beyond the twelve volumes: **world sites** —
the persistent places out in the world and under the town (forts, towers, temples, ruins, caves, mines, hideouts,
crypts, dungeons), each a card composed by the materializers the base and the volumes already build; **encounter
crops** — the transient battle map a game master opens anywhere; and **the 2.5D view** — a second, switchable
projection of the same document beside the flat map, which stays the default (item 141). The implementer holds the
base (`docs/ARCHITECTURE.md` with files f and g applied), volume 13 (`V13-world.md`, the world regime, placement and
hydrology) and this volume, and nothing else (§17.1). Every fact the base, volume 13 or another volume states is
cited, never restated; every new fact is stated once, here. The three design proposals (`docs/design/*.md`) are
this volume's sources, never an implementer's reference: every mechanism this volume adopts from them is stated here
in full. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n` is a design volume's section, this one included
(`V14 §3.4`); `item n` is an amendment item — items below 200 the owner's rules (items 131–141 file j's), items
200–585 file f's applied requests; `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`).
Decisions are `J-V14.n` (V14 §9), tests `T-V14-n` (V14 §7), base change requests `BCR-V14-n` (V14 §10).
**Naming (the spine's hazard):** the base's *site* is the settlement's ground — S1 Site, `@plat/site`, the site plan
S11, the site-and-fields spike — and keeps that meaning everywhere in this volume; the owner's persistent places are
**world sites** in prose and `WorldSite*` in records, their stages the **G-** stages (generated sites), their package
`@plat/sites`. **Volume 13's part:** the world regime (W0–W9), placement (P1–P5), the frame charter, the water class
test and `ReasonRecord` are V13's; where this volume reads them it names the dependency (V14 §1b, V14 §11), and
nothing of V13 is restated.

## 0 In plain words

Three things, one architecture. A town made by this program already has streets, houses with their rooms, sewers and
caves beneath, and a history. This volume adds the places a game master needs beyond the town, the battle map they open
in the middle of play, and a second way of looking at all of it.

**The encounter map.** In play, a game master clicks anywhere — a street corner, a tavern, a square, a sewer junction,
a cavern chamber, a floating island's landing, a field outside the walls, a spot on the world map — and says "a fight
breaks out here". The map cuts out an encounter crop around the click, sized to what the place is (a corner takes a
short block, a tavern takes the tavern and its street, a sewer junction takes its chambers), and finishes whatever the
town has not yet drawn there: the floor plans of the buildings in the crop, so the fight can go indoors, and a sense of
who is about — "the common room is crowded, the kitchen has a few, the upstairs rooms are empty" — never named people
walking about. Nothing new is invented in town: the shops are the shops the town already has; the crop only completes
them. On the world map, where nothing has been drawn yet, the crop is derived from what the world says of that point —
its ground, its climate, the road or river, whose land it is, what has lately happened there — once the world regime
(volume 13) exists; until then the world case waits. The crop is **not random**: the same click at the same address in
the same week gives the same map, every time, on every machine, because it is derived from the seed and the world's
facts like everything else. It is **not kept** either: it is a view, outside the town's record, and vanishes when the
game master closes it — unless they **promote** it: "this ambush site matters; keep it", and it becomes a named place
or a persistent site with its own card. The game master never sets a time of day; they narrate it. The crop exports
to a virtual tabletop as a walled, lit scene on a grid whose origin is fixed by the address, so exporting the same
crop twice, or two crops side by side, never shifts a token.

**Persistent world sites.** A fort on a pass, a wizard's tower in the hills, a hidden temple under a merchant's house,
a mine, a cave, an abandoned ruin, a thieves' hideout off the sewers, a dungeon — these are places that exist in the
world and have consequences. Each is a **card**: what it is, where it is, who holds it, what state it is in, who knows
of it, what has happened to it. Its map is not made by a dungeon generator: it is composed from the generators the
town already has — the countryside's fields and tracks for the ground round it, a wall and a gate from the
fortification stage, a building and its floors from the building and plan stages, caves and galleries from the
underground's void systems — under a **site policy** that says which to run and how, with a few new pieces only where
nothing existed: natural caves from a noise outline with passages along the skeleton of the void, rock-cut rooms, and
ruination by the evolution engine's decay. The game master states what they care about — kind, size, floors above and
below, footprint shape, terrain shaping, owner, purpose, condition, age, a hidden entrance, a flooded level — and
everything unstated is **derived from context** (a tower in dry hills has no flooded level; a temple under a house
faces its crypt the way the house faces its street), never rolled blind. The request resolves into a **programme** —
what rooms and passages, in what arrangement, laid down in what order of history — whose **complexity is a measured
vector with units** (so many units, so many levels below, so many loops, chokepoints and entrances, this much open
space, this much hidden, this deep a defence, so many flooded) that a test can check on the finished map and the clerk
can read back; a size preset is a named vector, never a slider.

A dungeon is built **topology first**: a graph of units with roles — entrance, hub, chokepoint, loop, dead end, secret,
vertical link, core — chosen by the site's purpose (a fort rings its keep behind gatehouses; a temple runs an axis to
its sanctum with the crypt below; a mine is a tree on a shaft; a cave is a loopy tangle; a hideout has one hard way in
and a bolt-hole), then **embedded on the kernel** inside its envelope and rock: units become faces with owners,
passages corridor bands, walls role edges, centrelines the skeleton and medial axis of the void, vertical links the
storey and stair records the plan rung already has. The classic dungeon is a **superposition of histories in order**:
the geology's cave, the first builders' rooms, their use, abandonment or damage, later squatters — each layer by its
kind's materializer. Every unit carries its reason: which layer, which role, which event. Tactical analysis — cover,
sightlines, chokepoints, loops — checks the result against the requested vector; it never generates.

**Where a site lives.** In town, a site with a footprint — a tower on a street — is a building on a plot, placed the
way any named place is placed, the site's programme riding as the building's programme. A site below or inside town —
a crypt under a church, a cellar complex, a lair off a sewer — is a **separate document** with its own levels; the
town map holds only an **anchor** (where it is: this storey of this house, this stretch of sewer) and **one access
record** (the trapdoor, stair, shaft or door that leads in, with its own knowledge flag and condition). The anchor
draws as a **clickable icon only in the view whose context contains it**: a temple under a house shows its icon only
when that house's cellar plan is open; a lair off the sewers only when the sewers are drawn at that depth. Open the icon
and the site's document opens; drop an icon and a card is created, materialized on first open. Out in the country a
site is **free-standing**, placed in the world (volume 13's placement), sited by the same suitability score the
settlements use with purpose weights of its own (a fort wants overlook and road control, a mine ore and a stream, a
hidden temple concealment and one hard approach, a tower solitude), and it is a **destination** the settlement siting
score reads. When a settlement later forms around it — a thorp in front of an old fort — the site is the older layer
the village grows around: its ground claims first, as a castle's does today, and its arenas are **adopted** into the
settlement's document keeping every identity and lock; the relation runs both ways (a garrison, or stone robbed and the
ruin absorbed beneath the village). An admissibility table says what kinds may be dropped where — urban surface, urban
below or inside, hinterland near or far from the enclosure, open country — and is editable like every rule table.

**Secrets.** A site is a game master's secret until they say otherwise: **DM only**, **revealed** to the players, or
**discovered** by them — three states on the knowledge the map already keeps, drawn with a second cue beside colour,
and withheld from any view, listing, answer or export below the viewer's key.

**Everything editable.** A site's map is ordinary kernel geometry, so locks, undo, local repair and stable addresses
apply unchanged: move a wall and it is a wall move; add a floor, flood the lower crypt, collapse a passage or expand
the fort and the programme is edited and rematerialized locally, locks kept, each a recorded event. Condition —
pristine, occupied, vacant, damaged, ruined — is a **transform over a persisted plan**, never a reroll: the same wall
always falls first, repaired walls show their patches, and a site set back to pristine draws byte for byte as it was
built. Deleting takes two verbs: **remove** (it was never there — a retcon) or **destroy** (an event that leaves a
ruin and a record). A site changes state only through an event — the host's simulation, or the game master's hand —
never by chance; the transient crop has nothing to evolve unless promoted.

**The 2.5D view.** The flat map stays the default and loses nothing. Beside it a second, switchable view draws the
same document in isometric, oblique or perspective projection: the ground draped over its heights, every building
extruded to its eaves and roof, floors as stacked slabs you can cut through to any storey, the underground as cut-away
slabs at each depth band, the islands at their altitude, walls and terrace steps standing, water lying at its level,
with a vertical exaggeration you can set. Nothing of it enters the document: the model already carries every height,
and the projection is view state, so the same document hashes identically under the flat view and every projection.
A click in the 2.5D view lands on exactly the address the flat view would give at that model point, and one new edit
— raise or lower — drags a roof, a floor, a deck or an island up or down by the height the model already stores.

## 1 Scope, the base hooks consumed, the owner's rules obeyed, and what is out of scope

### 1.1 What this volume builds

Three engines, two views and their editing, in one package `@plat/sites` registered in `@plat/layout`'s registry as
`@plat/under` is (item 505's pattern; J-V14.1), with the encounter crop's view half and the 2.5D renderer in
`@plat/app` and `@plat/render` (§14):

| engine | the base's slot | what it makes | V14 § |
|---|---|---|---|
| **G-SITE** the world-site pipeline G1–G8 | a product-like stage set (`ProductDecl.stages`, §4.12) run on a **site document** of its own, never inside the settlement's stage graph | `WorldSite` cards; `SiteRequest` → `SiteProgramme` with its `ComplexityVector`; the `UnitGraph` and its embedding on `site` parts (units, passages, walls, `VerticalLink`s); the ground of a free-standing site by the hinterland unit, S7's enclosure, S11's site plans and the plan rung; the natural, carved and built materializers under a site policy; the history superposition; the water classes per unit (V13's classifier); condition transforms; `SiteAnchor` and the access record; adoption into a settlement document | 3.2–3.9 |
| **E-CROP** the encounter crop E1–E4 | `@plat/app`'s view flow over §11.2's reader and the plan rung, on §3.4's transient arena | `Encounter` (derived, never stored), `EncounterCrop` (extent by table, the stable grid origin), the completion (V03 plans, the occupancy abstraction), the transient layer on an owner-less transient arena, the `encounter` view key, promotion to a place or a card | 3.10–3.13 |
| **R-VIEW** the 2.5D view R1–R4 | §8's render tier, a projection family beside the flat map (item 141) | the z-completeness table, `Projection` (view state), the depth sort and occlusion, the draped terrain, extruded massing, per-storey slabs, cutaway bands and islands, the style family, hit testing to the 2D address, the `raiseLower` edit | 5.4–5.8 |
| **S-VIEW** icons, cards, exports | §9.5 furniture, §8.2 programs, §11.1 | the anchor icon in its context with its secret cue, the site document's figure-ground (V04 §5's), the crop's tactical style and grid overlay, the VTT crop scope and per-storey scenes of a site | 5.1–5.3 |

Package rule (J-V14.1): `@plat/sites` depends on `@plat/kernel`, `@plat/model`, `@plat/tables`, `@plat/site`,
`@plat/layout`, `@plat/plots`, `@plat/buildings`, `@plat/under`, `@plat/evolve`, `@plat/hood` and `@plat/world` (V13),
never on `@plat/render`, `@plat/export` or `@plat/app`; the renderer, the exporters and the app read its records
through the registry and §11.2's reader, as they read V04's. `@plat/sites` creates a site document's kernel with a
`SpineWidths` callback (`API.md` §7.6's injection) that answers `passage.widthCm[widthClass] ÷ 2 + wallCm` for a
`passage` chain (BCR-V14-24; the base's `tunnel` function answers nothing on a `site` part), so `corridorUnion` reads
the site's widths as it reads the sewer's (C14-29).

### 1.2 The base hooks this volume consumes (cited, never restated)

| hook | where | how this volume uses it |
|---|---|---|
| layers, parts, addresses, the part counters | §2.1, §2.2, §2.9 (`nextUndergroundPart`, `nextSkyPart`, `nextGroundPart`) | the fourth layer `site` and `nextSitePart` (BCR-V14-3); a site part's level mapping follows §2.2 rule 1's underground mapping; every site address `site<n>/kind:token` |
| the transient arena, `TransientKey`, `readBack`, `release` | §3.4 (J-A28.31); the kernel's stub row (`API.md` §8) | E4's transient layer and E2's completion (V03's storeys cut there); the owner-less lifetime BCR-V14-4 states — `owner` an `Id` of the form `view:<hash>`, no kernel type change (C14-07); the seed one ring, the resolved set's faces `fixed` |
| `AccessPoint` with its kinds, `state`, `knownTo`, `source`, `cause`; `UndergroundLink` | II.7.4 (items 554, 555, 557), §2.7 (item 249), V04 §2.2 (`AccessCause`) | the one access record of an attached site (source `site`, `under` reaching a site document, BCR-V14-2); a free-standing site's own openings; links between a `site` part and an `underground` part (BCR-V14-11) |
| `Identity`, `Lifecycle`, `LifecycleEvent` with `cause`, `Tombstone`, `DerivationRecord`, `Provenance` | §2.8 | every record of V14 §2 carries them; `WorldSiteLifecycle`'s events are `LifecycleEvent`s with `cause` |
| `Document`, the canonical form, view state and its keys (`knowledge`, `storey`, `depthBand`, `workingLayer`, `week`, `find`, `crises`) | §2.9 | the site document (a `Document` of product `site`); the view keys `projection`, `encounter`, `siteOpen` (BCR-V14-7, -19) |
| the kernel's bands (`kerb`, `corridorUnion`, `bandUnion`), skeleton and medial axis, Voronoi, noise, path search, `hexLattice`, `obb`, `lir`, `sideRuns` | §3.1, §3.7, §3.8; `API.md` §7.6–§7.7 | G5's embedding (passages as corridor bands, centrelines by `skeleton` spine use and `medialAxis`, bays by `voronoiEdges`), G5's cave outline by `noiseStream`/`fbm`, G5's mine excavation on `hexLattice`, G5's routing by `astar` |
| S3's siting score and `Destination`; `Reservation` kinds and the castle reserve's claim | §4.2 S3 (1), (2), (13); §2.5 `Reservation`; §4.12 `Destination` | G3 reads V13's suitability score with V14's purpose weights; a free-standing site is a `Destination` of kind `worldSite` and a `Reservation` of kind `worldSite` at adoption (BCR-V14-13) |
| S7's enceinte and gates, S11's site plans and footprints, the placement solver, the designation mutator | §4.7, §4.8 | G5's built materializer on a free-standing site's ground part: the site's wall as an `EnceinteStrategy.trace` over its own boundary, its buildings by S11 on plots the site policy cuts, placed by `PlacementSolver.place` with `kind: 'generation'` |
| S12a's hinterland siting and the hinterland unit, S12b greenery | §4.9 | G5's ground materializer for a free-standing site's frame (fields, tracks, woods round the site) |
| the stage-3 interface `outline` / `compose` / `plan`, `BuildingInput`, `ClassRules.pick` | §2.6 | the surface exception (G8): the site programme rides as the building's programme through `BuildingInput.assignment` (BCR-V14-12); a site building's floors and basements are V02's massing and V03's plan |
| the plan rung: storeys, the storey and stair model, basements and crypts, stored plans, the damage layer | §2.6 (item 28), V03 §2–§3, V03 §3.7, V03 §5.6 | E2's interiors; G5's built units above ground; a site's floors above and levels below as V03 storeys and basement storeys; condition transforms read V06's `decayLevel` through V03's drawing |
| the underground's records (`UndergroundSystem`, `Gallery`, `Chamber`, `LightSource`), U-SYS's cavern, quarry and ruin materializers, the dig generators, the excavation reading, the figure-ground, the per-band exports | §2.7, II.7.6, V04 §2.2, V04 §3.5.0a, V04 §3.5.2, V04 §3.5.3, V04 §3.8, V04 §5 | G5's carved and natural materializers reuse `Gallery` and `Chamber` on `site` parts; V04 §5.1–§5.2's cut-away and programs draw a site part; the per-band VTT path exports a site level |
| the evolution engine's decay level, the strike ladder, robbing for stone, `EvolveOp` and the hand `convert` | §4.11, V06 §2.8, V06 §3.5, V06 §3.23 | G7's condition transforms: `decayLevel` per lineage, `burn`, `wearWall`, `repairWall` applied to a site's elements; the two edit verbs (V13 §4; item 137 (a)) |
| the edit events, points forms, the outcome table, the closure rule, locality, lifecycles, the override layer | §7.1, §7.3 (item 9), §7.4, §7.6 | V14 §4's edit kinds (`dropSite`, `setSiteRequest`, `moveAnchor`, `destroySite`, `promoteEncounter`, `adoptSite`, `raiseLower`; BCR-V14-9, -15), each with its lifecycle row and undo |
| intent, assignments, `Assignment`, `PlacementCriteria`, the forms catalogue | §7.7 | the surface exception's assignment path |
| the style sheets, roles, programs, layer order, `LayerSpec`, `underView`, the lighting model | §8.2, §8.4 (item 413) | the anchor icon's rows, the crop's tactical style, the `site` layer's `LayerSpec`, the 2.5D style family (BCR-V14-7) |
| the display list and the tile worker; level of detail by band | §8.1, §8.5, §8.8, §8.9 | R2–R3 build a projected display list per tile; the 2.5D LOD by `LodBand` |
| the knowledge filter and the admission function `admit(knownTo, key, band)`; the `knowledge` key's `places` | §9.2 (item 30), §2.9, §11.2, §11.3 | the three secret states on the anchor and the access (V14 §2.3); the icon, the site and the crop withheld below the viewer's key |
| furniture: the grid, the legend's second cue, view pins and notes | §9.5 (XB15; g item 112) | the crop's tactical grid overlay; the icon's glyph as a second cue; the `encounter` view key's items as view pins |
| the exports: the VTT profile, `ExportOpts.vtt.scene`, per-storey and per-band scenes, knowledge at export | §11.1 (DEF-4; items 452, 453, 454), §11.2 | the crop scope and the stable grid origin (BCR-V14-8); a site's per-level scenes |
| the embedding API, the reader, the host bridge, the derived-facts port | §11.2, §11.3, V08 | a site's derived capacity reaches the host as a derived fact; host events reach the card through the one-way flow (item 132 (h)) |
| budgets, the comfort level, the register | §12 (R12-n; g item 119) | V14 §6's rows and R12-V14 register rows |
| the test families, fixtures, goldens, the declared-shift protocol | §13.2–§13.4, §13.8 | V14 §7's bars; the frozen fixtures `B-SITE` and `B-CROP` |
| the package and registry rules | §14 | `@plat/sites` and its registrations |
| the staged milestones | §16 | V14 §8's slots |
| the stream key, concern and stage registries, fixed-key draws | §6.1, §6.3 | the `site` concern and the stage ids G1–G8, E1–E4 (BCR-V14-14); every draw V14 §3.15 lists |
| the world regime, placement (`placeFrame`, `setPlacement`, `unplaceFrame`, `charterFor`), the frame charter, `SuitabilityScore` with its `SuitabilityTerm` plug-in slot, `ReasonRecord`, `classifyWater` / `routeClass` with `WaterClassResult` / `RouteClassResult`, the namespace segment, the two edit verbs and the cascade | V13 §1b.2, V13 §2.2, V13 §2.4, V13 §2.5, V13 §3.7, V13 §3.11, V13 §3.13, V13 §3.14, V13 §4 | V14's dependencies, each named in V14 §1b.6 and V14 §10.2 |
| V01's local places (`HoodPlace`), `districtsAbove`, the opening pass | V01 §2.2, V01 §3.7.1, V01 §3.16 | promotion to a named place (E4); the context of an anchor in a close-up |
| V05's islands, slabs and access | V05 §2, V05 §5.3 | a crop on an island; R3's island slabs |
| V07's village ladder and hand-offs | V07 §3, V07 §3.12 | adoption: a thorp forming round a free-standing site (G8); the village's products on a site's ground |
| V09's tools, working layer, system chip, panels, "View as" | V09 §2.3, V09 §4.2, V09 §4.8, V09 §4.17 | the site tools' bindings; the Below group's context for an icon; the secret states in View as |
| V10's why providers and sections | V10 §3.9, V10 §3.9a | the `site` and `encounter` sections and the reason chains (bar 10) |
| V11's registry, class rows, room programmes, decay ranges, naming slices | V11 §2.1, V11 §3.6, V11 §3.25.10, V11 §3.20 | the tables V14 §2.5 registers; a site building's programme row; the damage ranges a site unit's kinds need (V14 §10.2's cross-volume request) |
| V12's register, bar map, panels, no-op pins | V12 §2.6, V12 §3.6b, V12 §3.7.8, V12 §3.11 | every calibratable cell's entry; the `item141.flat` no-op pin |

### 1.3 The owner's rules this volume obeys (quoted by number; each a design in V14 §3–§5)

| item | the rule (the owner's words are the authority; file j's consequences are cited, never restated) | where it lands |
|---|---|---|
| 132 (a) | "two types of encounter maps: 1. transient … 2. Persistent location" — one operation, two retention policies, promotion | V14 §3.10 (one operation), V14 §3.13 (promotion), J-V14.2 |
| 132 (b) | "a user as a DM could click anywhere … it will produce an appropriately scaled encounter map" — transient is not random: keyed by address and time, derived | V14 §3.10 E1, V14 §3.15 (determinism), T-V14-1 |
| 132 (c) | "The shops nearby where i clicked get generated (as appropriate) … complete with the interior" — in town nothing nearby is generated, only completed; the occupancy abstraction, never individuals | V14 §3.11 E2, V14 §2.4 (`OccupancySummary`), J-V14.4 |
| 132 (d) | "appropriately scaled" — extent by table | V14 §3.12 E3, V14 §2.5 (`EncounterExtentRow`) |
| 132 (e) | "a place clicked such as on the road or wilderness from the world map … matching the area it was clicked, terrain, biome, recent battle" — the world-map case waits on the world regime | V14 §3.10 E1 (the `world` context), V14 §1b.6, V14 §11 Q1 |
| 132 (f) | "some combination of using elements from the hinterlands generator, buildings generator, etc" — a persistent site is a card, not a generator | V14 §3.6 G5 (the composition), J-V14.6 |
| 132 (g) | "to match a list of selections a user might wnat" — the request record resolved by derive before invent into a programme whose complexity is a vector with units | V14 §3.3 G2, V14 §2.2 (`ComplexityVector`), J-V14.8 |
| 132 (h) | "built into the simulator where appropriate" — an institution-like host record outside a settlement; consequences as dossier events | V14 §3.8 G7, V14 §4.6, V14 §1b.6 |
| 133 (a) | "a clickable iconography or something … that persists in whatever location we drop it" — the anchor record | V14 §2.3 (`SiteAnchor`), BCR-V14-1 |
| 133 (b) | "if in an urban setting is not added to the city map rather accessible or it pops up from a clickable iconography" — attached sites are separate documents with one anchor and one access record | V14 §3.9 G8, V14 §2.3, J-V14.10 |
| 133 (c) | (file j's consequence of the above) the surface exception through the assignment path | V14 §3.9 G8 (c), BCR-V14-12 |
| 133 (d) | "it shows only once we access that interior and specific floor of the house … if it is in the sewers, it only shows once we access the sewers" — visibility by context | V14 §5.1 (the context rule), T-V14-12 |
| 133 (e) | "These are DM secrets btw toggled secret on and off" — DM only / revealed / discovered on `knownTo` and the admission function, with a second cue beside colour | V14 §2.3 (`SecretState`), V14 §5.1, J-V14.12 |
| 133 (f) | "A user should be able to set the number of floors and basements … shape terrain, etc" — floors, basements, shape and terrain from the request; the existing storey and stair model; terrain shaping a terrain edit before siting | V14 §2.2 (`SiteRequest`), V14 §3.4 G3 (the terrain pre-edit), V14 §3.6 G5 (built) |
| 133 (g) | "dungeons as well" — topology first, embedded on the kernel; the technique placement; the rejections | V14 §3.5 G4, V14 §3.6 G5, J-V14.14 – J-V14.20 |
| 133 (h) | "and of course everythign editable" — free on PLAT arenas; programme edits rematerialized locally; the card materialized lazily on first open; two deletion verbs | V14 §4.1–V14 §4.4, J-V14.22 |
| 134 (a) | "we will filter out of the selection what is possible in urban vs country" — the admissibility table by context, the edge of town by distance from the enclosure | V14 §3.2 G1, V14 §2.5 (`SiteAdmissibilityRow`), BCR-V14-10 |
| 134 (b) | "they can evolve depending on whether occupied or vacant or damaged or pristine depending on the flow of things" — condition is a transform over a persisted plan, never a reroll | V14 §3.8 G7, J-V14.24 |
| 134 (c) | "certain generated locations from the country persisted category can be prime locations for a new settlement" — sites as destinations; the relation both ways | V14 §3.4 G3 (d), V14 §3.9 G8 (e) |
| 134 (d) | (file j's consequence) adoption of a site's parts into the settlement document keeping every identity and lock | V14 §3.9 G8 (e), V14 §4.5, T-V14-7 |
| 135 (a)–(e) | "make sure that scaling is completely scaled according to encounter, city, and world" — three regimes, one chain of refinement; the handoff as boundary conditions; deterministic refinement; edits stored at their scale; per-regime tables | the crop refines the town (E1–E3 read, never rewrite); a site's frame takes V13's charter; V14 §6's per-regime rows; V14 §3.14 |
| 136 (a) | "time of day is not a parameter" — no hour anywhere; fixtures export as fixtures | V14 §2.4 (no hour in `Encounter`'s key), V14 §5.3, T-V14-3 |
| 136 (b) | "This all needs to be compatible with VTT (the encounter maps)" — the crop scope and the stable grid origin per address | V14 §3.12 E3 (the origin rule), V14 §5.3, BCR-V14-8, T-V14-11 |
| 137 (f), (g) | the water class test per unit; surface things | V14 §3.7 G6 calls V13's classifier; nothing restated |
| 141 (a)–(e) | "what if we want the whole architecture to have a 2.5 mode?" and "i'm not replacing 2d with 2.5d. i want both" — the model is already 2.5D; a projection family; the limits; the gate rows K13, M9–M11; the bars; 2D the default | V14 §5.4–V14 §5.8, BCR-V14-5, -6, -7, -9, T-V14-14 – T-V14-17 |

### 1.4 Out of scope, with the reason

* **The world regime** — the world document, its rasters, surfaces, climate, hydrology, biomes, suitability, routes,
  politics, labels, placement P1–P5 and the frame charter — is V13's. This volume reads V13's `Placement` for a
  free-standing site, V13's suitability score for G3 and V13's charter for a site frame's boundary conditions, and
  names each as a dependency (V14 §1b.6). **The world-map encounter case** (item 132 (e)) is designed here as a
  context of E1 whose facts are V13's and lands only after V13's W1–W5 (V14 §8).
* **The water class test** — the governing surface, the thresholds, the route classes, the aggregate — is V13's (the
  hydrology half of V13 §3; item 137 (f)). G6 calls it per unit and stores what it returns; nothing of it is restated.
* **The two edit verbs and the cascade** (item 137 (a)–(e)) are V13's editing section; this volume's `destroySite`
  is "this happened" and `removeSite` is "this was always so", each cited to V13 §4.
* **The plan rung** itself — rooms, stairs, doors, furniture, re-cuts, stored plans — is V03's; the crop completes
  buildings by calling it, and a site's built floors are its storeys. **Building massing** is V02's. **The
  underground's systems** under a settlement — sewers, catacombs, caverns, quarries, vaults, the undercity, the access
  pass, the excavation reading — are V04's; a site's carved and natural levels reuse V04's records and two of its
  materializers as functions on a `site` part (V14 §3.6), under the site pipeline, never under V04's tail.
* **The evolution engine's scheduling** is V06's; condition transforms apply V06's level and ops to a site when a
  host event or a hand edit arrives (G7), never on V06's epoch clock unless the site has been adopted into a
  settlement document, where V06 runs over its parts as over any (V14 §3.9 G8 (e)).
* **The host's political facts** — a site's existence, ownership, status and simulation effects — are the host's
  (item 132 (h); V08). The map owns the programme and the shape. A site's derived capacity reaches the host through
  V08's port as a derived fact; no map write reaches a dossier fact (bar 9).
* **The site-generator survey** (`research/sites/survey.md`, observation-only, clean-room, 2026-10-16) is read as
  evidence and cited by file and section: its §2.9 (the Universal VTT contract and what it cannot express), §2.1
  (the multi-floor export convention), §4 (the techniques sorted by whether they carry a reason chain), §6 (what to
  reach, improve and reject) and §6.4 (its three open questions, answered in V14 §5.3, V14 §2.5 and V14 §3.6 (h)).
  Nothing of any product — no code, identifier, list, table or asset — is transferred (§17.1); every technique this
  volume places is stated from first principles over the kernel's own services (V14 §3.5–V14 §3.6), and the survey's
  technique sorting (its §4.6–§4.12) is cited as corroboration, never as the mechanism.
* **Tokens, initiative and combat rules** are the virtual tabletop's; the crop exports walls, portals, lights and
  objects only (V14 §5.3).
* **A live shared party map** is J122's decision (V08 Q5): pictures and player views now; the encounter crop is the
  DM's view, exported to the table.
* **Volume 11's rows** for the new tables this volume registers (V14 §2.5) — the kind rows, grammars, size presets,
  purpose weights, occupancy rows, the decay ranges of carved and natural element kinds — have their schema here and
  their shipped values here with provenance `own`, calibratable; a later V11 landing may take them over row by row
  (V14 §10.2).
* **Nothing else is out of scope.** Sites exist at every rung and in no settlement at all; the crop opens at every
  rung and on every layer; the 2.5D view draws every layer and every band.

## 1b Wiring table — every new piece, what feeds it and what it feeds

Every record, field, table, stage output, interface, edit kind and entity kind this volume adds, with its producer and
its consumer. A piece the base carries names its base home and the request that put it there (V14 §10); the base
declares it and this volume states only its own producers and consumers. No piece is listed without a consumer; a piece
V13 supplies is marked **V13** and listed again in V14 §1b.6.

### 1b.1 Records, fields and tables

| piece | fed by (producer) | feeds (consumers) | home |
|---|---|---|---|
| `WorldSite` (the card; V14 §2.2) | `dropSite` (a candidate card), `promoteEncounter` (`as: 'site'`), G2–G8 (its programme, vector, document, lifecycle, knowledge, history), a host record through V08's port (its host-owned fields) | G-SITE (every stage), the icon (V14 §5.1), the site panel (V09), the `site` why section (V10), V12's measures, the derived-facts port (its capacity), V13's W6 (a destination), V07's and V13's adoption, the exports | the entities block of the host document (attached, `inFrame`, `ground`, `surface`) or of the site document itself (free-standing); its declared fields in the model digest, its G2–G8 products in the host's **derived block** (V14 §3.1; C14-03); the registry row BCR-V14-1 |
| `SiteAnchor` (V14 §2.3) | `dropSite`; `promoteEncounter`; adoption (re-addressed); `moveAnchor` | the icon and its context rule, the access record's host, the admission function, V09's panels, V10, the exports (a point feature), Find's listing | the host document's entities block; §2.7's staged records (BCR-V14-1) |
| `AccessPoint.source: 'site'`, `AccessPoint.under` as `SiteReach` (V14 §2.3) | G8 (a) (the one access record), `moveAnchor` (re-dug) | V03's access head (the trapdoor, stair or hatch in the plan), V04's drawing of its underground end and V01's ground symbol, the per-storey and per-band VTT portals, the clerk | II.7.4 (BCR-V14-2) |
| `SiteRequest`, `Stated<T>` (V14 §2.2) | the user (the site dialog, V09; a skeleton line; the clerk's `propose`), `promoteEncounter` (derived from what was there), a host record's fields | G2 (the resolution), G3 (floors, shape, terrain), G4 (purpose, size), G7 (condition, age), the clerk ("asked for …, derived …") | the card |
| `SiteProgramme` (V14 §2.2) | G2 | G4 (the grammar's axiom and budget), G5 (the materializer composition, the envelope), G7 (the history layers' ages), the measured vector's comparison, V03's programme row override for the surface exception | the card's derived block (never in a digest; rebuilt on open, V14 §3.1) |
| `ComplexityVector` (V14 §2.2): target and measured | G2 (the target: a preset's vector adjusted by the request), G5's close (the measured, on the finished geometry) | T-V14-6's assertion, the clerk, the size dialog (a preset is a named vector), V12's measures | the card |
| `UnitGraph`, `Unit`, `UnitEdge`, `VerticalLink` (V14 §2.2) | G4 (the graph), G5 (each unit's geometry reference, each vertical link's two ends with their elevations) | G5 (the embedding), G6 (per-unit classes), G7 (collapses close units, breaches open edges), the tactical check, the 2.5D slabs (`VerticalLink` drawn as stacked-slab joins), the clerk (every unit's reason), the exports (portals, stairs) | the site document's entities block; `VerticalLink` the base's vertical-link row (BCR-V14-6) |
| `SiteHistoryLayer` (V14 §2.2) | G5 (one per materializer run, in chronological order) | G7 (a layer's age sets its decay run), the clerk ("built over the old cave"), the `ruinMasonry`-style programs per layer | the card |
| `SiteLevel` (V14 §2.2; C14-05): one per `site` part — its elevation, headroom cap, name, band, units | G5 (one per level; the owner of the part's L1 rock face and margin; the `system` every `Chamber` and `Gallery` of the part names) | the band ladder and the level chip (V09), `depthBand`, V04 §5.2's programs (a level read as a system of kind `site`), `verticalEnds`, the per-level VTT scene's `plat.level`, `storeysBelow`'s count, the exports | the site document's (or the host's, `inFrame`) entities block; BCR-V14-11 |
| `WorldSite.attraction`, `.routed` (V14 §2.2; C14-04) | the kind row's columns, copied to the card at the drop and editable by `setAttr` | V13 W6's `site` term (the pull within `siteReachKm`) and W7's seats (a routed site) | the card |
| `SiteReach.floorCm` (V14 §2.3; C14-24) | G8 (a); every G5 of the entrance's level | `verticalEnds` of a `site`-sourced access in the host, the VTT portal's elevation, the clerk | the access record |
| the element set of a carved or natural unit (`UnitElement`, V14 §2.2; C14-13) | G5, derived from the unit's geometry, keyed for §6.3's `plan.damage` draw | G7's thresholds and collapses, V03 §5.6's comparison, the exports' fallen walls | derived with the unit (never stored); its keys V14 §2.8 |
| `effectiveKnownTo(access)` (V14 §2.3; C14-18) | the anchor's `SecretState` over the access's stored `knownTo` | every reader of `AccessPoint.knownTo` for a `site`-sourced access: V03's head, V01's symbol, the VTT portal, the admission function | — (BCR-V14-2) |
| the open `Encounter`'s memo and the scene's `waterStamp` (V14 §3.10; C14-20) | E1 (the memo per address in the elaboration cache); every VTT scene export (the stamp) | a re-open at the same head (the memo), V13's cascade step 5 (invalidation), T-V13-21 (11), (12) | §2.9's non-canonical set; the `.dd2vtt` `plat` object |
| `siteEnvelopes(doc)` (a V04 reading, V14 §10.2; C14-10) | the cards' `envelope` and each level's band in the host's cm (model data on an attached card) | V04's catacomb growth, sewer extension and U-DIG's connector as an obstacle (`blockedBy: 'site'`, `W_SITE_NEAR_VOID`) | the card |
| `WorldSite.frameDigest` (V14 §3.1; C14-11) | the first materialization (the host frame's digest) | the open's staleness check | the card |
| `WorldSiteLifecycle` (V14 §2.2) with its `LifecycleEvent`s and causes | G7, `destroySite`, the `siteState` conversions, a host event (V08), promotion | the icon's state glyph, the condition transforms, the clerk, V12's lifecycle bars, the exports' `state` | the card; §2.8's lifecycle (BCR-V14-16's rows) |
| `SiteKnowledge`, `SecretState` (V14 §2.3) | the DM (`setAttr` on `anchor/secret/state`), the host's reveal (V08 §3.14), the party's reach (a host event or a DM mark), G6 (submergence feeds `discoverable`) | the admission function through the anchor's `knownTo`, the icon's cue, the site panel, V08's party pictures, the exports | the anchor and the card |
| `WorldSite.document` (`SiteDocumentRef`) | G5's first materialization (the site document minted lazily on first open) | the icon's open, V09's document switch, the per-level exports, adoption | the card |
| `SitePolicy` (V14 §2.2) | `SiteKindRow.policy` resolved by G2 | G5 (which materializers run, on which parts, in which order) | `tables/sites/kinds.json` |
| the tables `SiteAdmissibilityRow`, `SiteKindRow`, `UnitGrammarRule`, `EncounterExtentRow`, `SitePurposeWeightRow`, `SiteLifecycleRow`, `OccupancyRow`, `CropRule`, `EmbedRule`, `SiteDamageRow`, `ProjectionRow` (V14 §2.5) | shipped defaults (provenance `own`, calibratable unless marked); `editTable` (§7.6) | G1, G2, G4, G5, G7, E2, E3, E4, R2, R3; V12's register | §7.6's registry (BCR-V14-10 and V14 §10.2) |
| `Encounter`, `EncounterAddress`, `EncounterCrop` (derived, never persisted; V14 §2.4) | E1–E3 on the DM's click | E4 (the transient layer), the crop view, the VTT crop export, `promoteEncounter` (its input), V10's `encounter` section | — (a view; the `encounter` view key holds the DM's items, BCR-V14-19) |
| `OccupancySummary` (derived; V14 §2.4) | E2 (b) | the crop's occupancy marks and legend, the scene's `plat` note, the clerk | — |
| `TransientItem` (V14 §2.4) | E4 (derived items from the crisis looks and the site's occupant layer); the DM (the `encounter` view key's items) | the crop view, the VTT objects, promotion (items become the card's occupant layer) | the `encounter` view key (shared view state, §2.9) |
| the view keys `projection`, `encounter`, `siteOpen` and the shared `party` key (V14 §2.6; C14-17) | V09's controls; `siteOpen` by the icon's click; `party` by the DM's reveal (mirrored from `MapRecord.party` when a host is bound) | R2–R4; E1–E4; the site document's view; the admission function and View as (the party's places) | §2.9 (BCR-V14-7, -19) |
| `StyleSheet.vtt.squareM` (V14 §2.5; C14-39) | the style state (default 1.5; the export dialog's "remember") | E3's grid cell, the crop overlay, the VTT export's default `squareM` | §8.2 (BCR-V14-8) |
| `Projection`, `ProjectionRow` (V14 §2.6) | the viewer; the style sheet's family rows | R2 (the transform and sort), R3 (the drawing), R4 (hit testing), the picture export | §2.9, §8.2 (BCR-V14-7) |
| `ZDecl` — the z-completeness declaration per drawable record kind (V14 §5.4) | each record kind's registry row (the base's and the volumes') | R3's extrusion, the gap lint (T-V14-16), the glTF path | §2.8's entity registry (BCR-V14-5) |
| `verticalEnds(id)` (derived; V14 §5.4) | the base's and V04's records at read | R3's stacked-slab joins, the VTT portal elevations, T-V14-16 (M10) | — (BCR-V14-6) |
| `Reservation.kind: 'worldSite'`, `Destination.kind: 'worldSite'` | G8 (e)'s and (g)'s adoption (the reservation); after adoption the site's gate as S4's destination | S3's siting and claims (a site claims ground first); S4's router inside the settlement's frame only | §2.5, §4.12 (BCR-V14-13) |
| the `SuitabilityTerm` plug-ins of V14 §2.5 (C14-04) | `@plat/sites/siting`, registered with V13's `SuitabilityScore` | G3's score with the purpose weights | V13 §1b.2's slot |
| the edge role `passage` (C14-29) | §2.2 rule 7's registry (BCR-V14-24) | G5's L1 chains, `corridorUnion` through the `SpineWidths` callback | §2.2 |
| `Assignment.site` (V14 §3.9 G8 (c)) | `dropSite` in an urban-surface context | S10b's placement, S11's mutator and V03's programme row (A1's first match) | §7.7 (BCR-V14-12) |
| `Document.nextSitePart`; `Layer` `'site'` | the site pipeline's G5 (one part per level) | every site address, the exports, V09's working layer (Site), adoption | §2.1, §2.2, §2.9 (BCR-V14-3) |
| the concern `site` and the stage ids `G1`…`G8`, `E1`…`E4` | §6.1's registries, appended | every draw V14 §3.15 lists | §6.1 (BCR-V14-14) |
| the warnings `W_SITE_CONTEXT_BENT`, `W_SITE_VECTOR_MISSED`, `W_SITE_ENVELOPE_SHRUNK`, `W_SITE_NO_ACCESS`, `W_SITE_NO_LEVEL`, `W_SITE_NEAR_VOID`, `W_SITE_WATER_PROVISIONAL`, `W_CROP_EXTENT_CLAMPED`, `W_CROP_INCOMPLETE`, `W_Z_FLAT_UNDECLARED` | the stages and the view | the report (§5.4), V10 | §5.4 (BCR-V14-16) |
| the register entries of this volume's calibratable columns (V12 §2.6) | the seat landing each step of V14 §8 | V12's lint and the corpus stage | §13.7, §13.9 |

### 1b.2 Stage outputs and interfaces

| output or interface | implementer | caller or consumer |
|---|---|---|
| `SiteContext.of(doc, address): SiteContext` (V14 §3.2 G1) | `@plat/sites/admit` | `dropSite`'s dry run, E1 (the crop's context), the site dialog's kind list (V09), the clerk |
| `SiteRequestResolver.resolve(doc, card, context, tables, rng): { programme: SiteProgramme; reasons: ReasonRecord[] }` (G2) | `@plat/sites/request` | the site pipeline; `setSiteRequest`'s re-resolution; `promoteEncounter` |
| `SiteSiting.site(world: WorldDocument /* V13 */, request, weights: SitePurposeWeightRow): { placement: Placement /* V13 */; score; reasons }` (G3) | `@plat/sites/siting` over V13's `SuitabilityScore` with this volume's plug-in terms (**V13**: the plug-in interface) | a free-standing `dropSite` with no point ("somewhere fitting"); V13's W6 when the host asks for sites |
| the world crop frame (V14 §3.10 (4); C14-08): V13's `charterFor(world, placement)` at a transient placement, S1, the roads as way bands, S12a's cover, on the crop's transient arena | `@plat/sites/cropFrame` in the generation worker | E1's `world` context |
| `TopologyBuilder.build(programme, rng): { graph: UnitGraph; reasons }` (G4) | `@plat/sites/topology` | the site pipeline; `setSiteRequest` (a re-build keeping locked units as fixed nodes) |
| `Embedder.embed(doc, graph, policy, k): KernelResult<EmbedResult>` (G5) | `@plat/sites/embed` | the site pipeline; a programme edit's local rematerialization |
| the materializer functions `NaturalCave.lay`, `RockCut.lay`, `MineExcavate.lay`, `BuiltLevel.lay`, `GroundComposer.lay` (G5 (b)–(f)) | `@plat/sites/materialize` — three materializers of this volume's own (natural, rock-cut, mine) reusing V04's **records and programs** (`Gallery`, `Chamber`, the quarry program, the light rows), never its stages (C14-28); the built and ground ones calling S12a's hinterland unit, S7's `EnceinteStrategy.trace`, S11's `SitePlanStrategy` and V03's `plan` | `Embedder` per history layer |
| the `SuitabilityTerm` plug-ins (V14 §2.5): `overlook`, `relief`, `slopeFlat`, `waterNear`, `shoreNear`, `routeNear`, `roadControl`, `settlementNear`, `settlementFar`, `territoryBorder`, `floodSafe`, `ore`, `stone`, `wood`, `solitude`, `concealment`, `oneApproach` | `@plat/sites/siting`, each over V13's rasters and layers | V13's `SuitabilityScore.score` when G3 passes the purpose weights |
| `SiteWaterClasses.classify(doc, card): WaterClassReport` (G6) | `@plat/sites/water` calling V13's classifier (**V13**) | the card's water state, the lifecycle (`submerged`), the exports, the clerk |
| `SiteCondition.apply(doc, card, event): KernelResult<ConditionResult>` (G7) | `@plat/sites/condition` over V06 §3.23's `decayLevel`, V06 §2.8's ops and V03 §5.6's drawing | `destroySite`, the `siteState` conversions, a host event, an epoch over an adopted site (V06) |
| `SiteAttach.attach(doc, card, anchor): KernelResult<{ access: AccessPoint }>` (G8 (a)–(d)) | `@plat/sites/attach` over V04's dig generators (V04 §3.8) | `dropSite` (attached), `moveAnchor` |
| `SiteAdopt.adopt(settlement: Document, site: Document, placement): KernelResult<AdoptResult>` (G8 (e)) | `@plat/sites/adopt` | V13's P4/P5 when a settlement is placed over a site; V07's siting at a village rung; a hand `adoptSite` |
| `PlatApi.encounter.open(h, address) → Encounter`, `.items(h, key, ops)`, `.crop(h, key)`, `.close(h, key)` and the `query` kind `encounter` (BCR-V14-25; C14-07) | the generation worker (`@plat/sites/encounter`): the resolve, the completion, the crop, the transient arena and its items live there behind §11.2's boundary | `EncounterService` in `@plat/app` (the DM's click — V09's T6 `place` **Encounter here** —, the clerk's `useTool`, the VTT crop export) |
| `EncounterService.promote(doc, encounter, as): EditEvent` | `@plat/app` → the `promoteEncounter` event | the crop's **Keep this** button |
| `Occupancy.summarize(doc, building \| unit, week): OccupancySummary` (E2 (b)) | `@plat/sites/occupancy` | the crop, the clerk |
| `TacticalCheck.run(doc, card): TacticalReport` (G5 (h)) | `@plat/sites/tactical` | T-V14-6, the clerk, the site panel |
| `zDecl(kind): ZDecl` and `verticalEnds(id)` (R1) | `@plat/model` (the registry) and `@plat/render` | R3, the gap lint, the exports |
| `ProjectionRenderer.build(tile, projection, lod): DisplayList25` (R2–R3) | `@plat/render/projection` | the tile worker, the picture export |
| `hitTest25(screen, projection): HitStack25` (R4) | `@plat/render/projection` | V09's tools in a 2.5D view |
| the `raiseLower` dry run (R4) | `@plat/app` over §7.1's `setAttr` and the base's operators | T9 `shape` in a 2.5D view |
| the `site` and `encounter` `WhySectionProvider`s and the `WorldSite`, `SiteAnchor`, `Unit`, `Encounter` `WhyProvider`s | `@plat/sites` (V14 §4.7) | V10's `why`, V09's cards and panels |

### 1b.3 Edit kinds (each with its tool, lifecycle row and undo)

| edit | the authoring tool (§7.1's binding table; V09 §4.3) | lifecycle row | undo |
|---|---|---|---|
| `dropSite` (V14 §4.2) | T6 `place` (**Drop a site** with the site dialog; on Below, Sky or a plan storey the same) | V14 §4.2's row (BCR-V14-15) | the card, the anchor and the access removed; the site document unlinked and kept in the session's undo record |
| `setSiteRequest` (a programme edit) | T9 `shape` on a card (the site panel's fields) | V14 §4.2's row | the former request and the replaced site scope |
| `setAttr` on `anchor/address` (`moveAnchor`), `anchor/secret/state`, a unit's `knownTo`, `floorCm`, `ceilingCm`, `role`, a vertical link's `kind` | T9 `shape` | §7.4's setAttr row | the inverse |
| `delete` on a card (**Remove** — the retcon; V14 §4.3) | T9 `shape` / T10 `hold`'s delete | §7.4's delete row, V14 §4.3's retcon rule | the replaced scope (the card, anchor, access and document back) |
| `convert { op: 'destroySite' }` (**Destroy** — the event; V14 §4.3) and the `siteState` ops `occupySite`, `vacateSite`, `damageSite`, `restoreSite`, `repurposeSite`, `expandSite`, `collapseUnit` | T9 `shape`'s context actions on a card or a unit | §7.4's convert row | the former lifecycle and the transform's inverse |
| `promoteEncounter` | the crop's **Keep this** (T6 `place` while an encounter is open) | V14 §4.4's row | the card or place removed; the transient items return to the view key |
| `adoptSite` (a hand adoption; V14 §4.5) | T10 `hold` on a free-standing site under a settlement's frame | V14 §4.5's row | the parts return to the site document, addresses mapped back |
| V13's `setPlacement` / `placeFrame` / `unplaceFrame` with a `site` subject (C14-15) | V13's T6 `place` on the world document | V13 §2.6's placement row; V14 §4.7's row (the site's arenas byte-identical, its charter stale) | V13's |
| the delete gesture on a card: a fates sheet offering **Remove** and **Destroy** (C14-46; a V09 request, V14 §10.2) | the Delete key or T9/T10's delete on a card | the chosen verb's row | the chosen verb's |
| `raiseLower` (V14 §4.6; item 141) | T9 `shape` in a 2.5D view (a vertical drag of a top face) and the context panel's height field in either view | V14 §4.6's row, folding as the mapped `setAttr` or operator | the mapped event's inverse |
| `regenerate` (New random) on a site, a level or a unit | T10 `hold` | §7.4's regenerate row | the replaced scope |
| `drawTunnel` / `drawChamber` / `addLink` / `placeAccess` on a `site` part | T4 `road` / T6 `place` with Site the working layer (V09) | §7.4's underground tools row, read on a `site` part | as V04 §1b.3 |
| the plan events on a site building's storeys | V03's | V03's rows | V03's |

The `encounter` view key's items (the DM's placed barricades, fires, carts, markers) and `projection` are view keys
(§2.9): never events, never undone, never in any digest.

### 1b.4 Entity kinds (each rendered, labelled, exported, persisted)

| entity | rendered | labelled | exported | persisted |
|---|---|---|---|---|
| `WorldSite` | through its anchor's icon (attached) or its document (free-standing: its ground, buildings, levels) | its name (V14 §5.2) | GeoJSON point (free-standing: a feature with its placement, kind, state, measured vector) | the entities block |
| `SiteAnchor` | the icon in its context, its secret cue | none (its site's name on hover) | GeoJSON point with `siteRef`, `secret` (at `secret` only) | the entities block |
| the access record (`AccessPoint` of source `site`) | V04 §5.2 (7)'s underground end on a `site` part; V01's ground symbol or V03's head | none | VTT portal (a door in a wall line) or shaft light with a `plat` object; GeoJSON point | the entities block |
| `Unit` | through its geometry (a `Chamber`, `Gallery`, a V03 room or a ground face), the role's second cue in the site view | the core's and the entrance's names | GeoJSON feature per unit with `role`, `layer`, `waterClass`, `reason` | the site document's entities block |
| `VerticalLink` | a stair, ladder, shaft, ramp or trapdoor glyph at each end; stacked-slab joins in 2.5D | none | VTT named portals on both scenes; glTF opening | the entities block |
| `SiteLevel` | its part through V04 §5.1's view (one level at a time) | the band ladder's entry ("Level −2 — the lower crypt") | the per-level `.dd2vtt` scene (its ordinal the file suffix, `plat.level` its elevation and name); GeoJSON a feature per level | the entities block |
| `Gallery`, `Chamber` on a `site` part | V04 §5.2's programs by `kind` | the level's label | all six formats as V04 §5.5 | the part chunk |
| a site's ground `Plot`, `Building`, `Enceinte`, `LandUse`, `Way` | the base's | the base's | the base's | the site document's ground part |
| `Encounter` / `EncounterCrop` | the crop view (V14 §5.3) | the crop's title | `.dd2vtt` and Foundry with the crop scope; PNG, SVG | never |
| `TransientItem` | the crop's transient marks | none | VTT objects (`objects_line_of_sight` for a barricade or cart) | the `encounter` view key only |

### 1b.5 Host facts, traced to their field and derivation row

A world site is an institution-like host record whose location is not inside a settlement (item 132 (h)). The port
carries it as V08's staged records carry a deposit or a condition, by a new row of V08's dossier row sets (V14 §10.2's
cross-volume request to V08); until that lands a site has no host-owned facts and every field is the map's own.

| fact the site uses | host field (through `DossierDigest`, §14; V08's adapter) | derivation row (§7.7) | reader here |
|---|---|---|---|
| a site's existence, kind, name, owner or faction, status | the host's site record (`WorldSiteRecord`: V14 §2.2's host-owned fields) | DR-V14-1 (a new DR row V08 adds) | `WorldSite.host` — the card's host-owned fields, `factTier` `dossier` |
| a status change (garrisoned, abandoned, destroyed, cleared, restored) | the record's status and its receipt week | DR-V14-1; V08 §3.6's events | G7's transform with cause `dossier` |
| a placement the host fixes | the record's world position (V13's regime) | DR-V14-1 through V13's `Placement` | G3 (a fixed placement, never re-sited) |
| the party's knowledge of a site | V08 §3.14's party knowledge (reveal; reached) | DR-V14-1 | `SecretState` `revealed` / `discovered` |
| a settlement founded at a site | the host's new settlement record whose placement lies over a site's frame | V13's P1–P5 and V08's creation | G8 (e) adoption |
| recent events near a world point (a battle, a plague, a fire) | V13's world document's event index (**V13**) | V13's | E1's `world` context (after V13 lands) |

Every other value a site holds is the map's own derivation (item 20 (h)); a gap in the host's record is filled by the
rules, never by a question to the host. A host change reaches a site through the change envelope and §7.7 item 5's
least-disruption mutation: a status change applies G7's transform; a removed record leaves the card as `map`-tier
(the site stays, its host fields cleared and reported), never torn down (item 11; J-V14.25).

### 1b.6 Volume 13's dependencies (named, never restated)

| what V14 needs | V13's piece | V14's reader | until it lands |
|---|---|---|---|
| the world document and its facts at a point (terrain class, biome, route, territory, recent events) | V13 §2 `WorldDocument`, `WorldRaster`, `WorldRoute`, `Territory`; W2–W8 | E1's `world` context; G3's siting inputs | E1 refuses a world click with `refuse.encounter.noWorld` (V09 §4.9's catalogue); G3 sites only within a settlement's frame (hinterland contexts) |
| the frame charter for a site's own frame (edge elevation profiles, datum, water edges, climate, water table, biome, resources, territory) | V13 §2 `FrameCharter`; P4 | G5 (f) (the ground composer's S1 inputs); G6 (the water table) | a free-standing site document takes a flat charter with the base's S1 defaults, reported |
| placement in the world regime | V13 §2 `Placement`; P1–P5 | G3 (a free-standing site's placement); G8 (e) (the settlement's placement over a site) | free-standing sites wait (V14 §8) |
| the `SuitabilityTerm` plug-in interface: the rasters and layers a term may read (`dem`, `distToRiverM`, `distToShoreM`, the `route` layer, the placements' origins, `Territory.border`, the wet-season `FloodSpread`, W5's resource sites, `landUse`) and the `site` term's read of `WorldSite.attraction` within `siteReachKm` | V13 §1b.2, §3.7 (1) | G3 registers V14 §2.5's terms; the kind row's `attraction` and `routed` on the card | a free-standing drop takes a point only |
| W7's seats reading `WorldSite.routed` from the card | V13 §3.8 (1) | G3 (d) | — |
| `charterFor(world, placement)` for a transient, non-settlement placement at a point (a 100 m frame) that records no `Placement` | V13 §3.11.4, §3.11.6 (the form `WorldPort.charter` nearly gives) | E1 (4)'s crop frame | the world click is refused |
| the names "V14's E3 cache" and "VTT scene stamps" resolved to the `Encounter` memo and the scene's `waterStamp` | V13 §3.14.2 step 5, §3.14.3 (T-V13-21 (11), (12)) | V14 §3.10, §5.3 | — |
| a `WaterSurface` of kind `site` with `body` the card and the unit as its cells, admitted by `governingSurface` for a dated `floodedLevel`; the connected-set walk over `site` parts and `VerticalLink`s | V13 §2.2, §3.12.6, §3.13.1 | G6; J-V14.39 | the provisional classes |
| `setPlacement` with a `site` subject leaving the site's arenas byte-identical and marking its charter stale | V13 §3.11.5, §4.3 | V14 §4.7's row | — |
| the site glyph's levels (a kind glyph at level 0, the envelope at level 2) made by W9's hook from the card | V13 §3.10, §5.1 | V14 §5.1 | — |
| W8's `foreignCulture` reads the host's or the recipe's culture, never a raster of V14's (V14 has none) | V13 §3.9 | — | — |
| the water class test: the governing surface, thresholds, route classes, the aggregate | V13 §3's classifier (the mechanism of `proposal-hydrology` §4, stated once there) | G6 per unit, per storey; the lifecycle's `submerged` | G6 reads the base's §2.6 water table and classes `dry` / `flooded` only, reported `W_SITE_WATER_PROVISIONAL` |
| the two edit verbs ("this happened" / "this was always so"), the cascade, the counterfactual fork | V13 §4 | V14 §4.3's two deletion verbs; a site's terrain pre-edit (G3 (b)) | the base's `setField` terrain stroke, undated |
| `ReasonRecord` (shared) | V13 §2's declaration | every G- and E- stage writes one per generated fact (V14 §2.7) | — (declared in V13; this volume cites it) |
| the charter for a free-standing site (what a site frame must carry to be placed) | V13 §2's `FrameCharter` as read by V13 P4 for a non-settlement frame | G3 (c) | — |
| the world-map encounter case's inputs | V13 W2–W8 | E1 | waits (item 132 (e)) |

## 2 Data model

### 2.1 What the base and the volumes already declare (read as declared)

`Layer`, `PlatKey`, `Level`, the part counters and the address prefixes (§2.1, §2.2, §2.9; the fourth value
BCR-V14-3 adds); `Identity`, `Lifecycle`, `LifecycleEvent`, `Existence`, `Tombstone`, `DerivationRecord`, `Provenance`,
`NamingRecord`, `FactTier` (§2.8); `Document`, `ViewState` and the view keys (§2.9); `TransientKey`, `ArenaKey`,
`transientArena`, `readBack`, `release` (§3.4); `Terrain`, `Heights`, `Building`, `Storey`, `Basement`, `Entrance`,
`BuildingInput`, `BuildingGenerator` (§2.3, §2.6); `Reservation`, `Assignment`, `PlacementCriteria`,
`PlacementRequest`, `PlacementSolver`, `Destination` (§2.5, §4.7, §7.7, §4.12); `AccessPoint`, `UndergroundSystem`,
`Gallery`, `Chamber`, `ChamberKind`, `UndergroundLink`, `LightSource`, `LightRule`, `Decoration`, `Pin`, `HoodPlace`,
`ConditionOverlay` (§2.7, II.7.4, V04 §2.2's `AccessCause`); `StageDecl`, `StageId`, `DataKey`, `ProductDecl` (§4.12,
V07 §2.1); `EditEvent`, `EditBase`, `PointsForm`, `EditScope`, `EditFate`, `ClosureRecord` (§7.1, §7.3); `EvolveOp`,
`ConversionOp`, `decayLevel`, `decayPeak` (§4.11, V06 §2.8, V06 §3.23); `StyleSheet`, `LayerSpec`, `LightingSpec`,
`LodBand` (§8.2, §8.4); `ExportOpts`, `Format` (§11.1, §11.2); `Unit` — the unit vocabulary of §2.1 (every table
column below names its unit from it). V13's: `WorldDocument`, `WorldRaster`, `WaterSurface`, `FrameCharter`,
`Placement`, `WorldRoute`, `Territory`, `ReasonRecord` and the water classifier's result record (V13 §2; cited as
**V13** below). Units, ids and addresses are §2.1's; every length below is an integer centimetre (`Cm`) or a metre
field named `…M`; every angle a `Cdeg`.

**Two words with one meaning each.** A **unit** (`Unit`) is one room, chamber, gallery stretch, court or open space
of a site, the node of its `UnitGraph`; its geometry is a record another volume declares (a V04 `Chamber` or `Gallery`
on a `site` part, a V03 room of a site building's storey, or a ground face of the site's ground part), referenced,
never duplicated. A **level** is one `site` part with its `SiteLevel` record (V14 §2.2): one carved or natural floor of a site,
numbered by `Document.nextSitePart` from 1 (there is no part 0 on the `site` layer: a site's ground is its `ground`
part 0, and a site attached inside a settlement has no ground of its own); a built storey above ground is a V03 storey
of a site building and never a part.

### 2.2 The card, the request, the programme, the vector, the graph and the lifecycle

```ts
// @plat/sites — the persistent world site (item 132 (f), (g); item 133; item 134); the entities block of its host or own document
type WorldSiteKind = 'fort'|'tower'|'temple'|'shrine'|'manor'|'guildhall'|'ruin'|'cave'|'mine'|'hideout'|'crypt'|'cellarComplex'
                   |'sewerLair'|'dungeon'|'camp'|'battlefield'|'graveyard'|'watchpost'|'hermitage'|'bridgeFort';   // SiteKindRow.kind (V14 §2.5); data, extensible by a row
type SiteAttachment = 'free'|'attached'|'inFrame'|'ground'|'surface';
  // item 133 (b), (c): free — a document of its own placed in V13's world, never inside a settlement's frame (J-V14.41); attached — a document of its own
  // (levels only) behind an anchor in a host document; inFrame — a site with a ground policy inside a settlement's frame, adopted at the drop into the host
  // document (V14 §3.9 (g); C14-01); ground — a marker-like card on a ground face with no document (a camp, a battlefield, a graveyard; V14 §3.9 (h);
  // C14-09); surface — a building on a plot through the assignment path
type SiteContextKind = 'urbanSurface'|'urbanInside'|'urbanBelow'|'urbanSky'|'hinterlandNear'|'hinterlandFar'|'country'|'world';   // V14 §3.2 G1
interface WorldSite {                                           // the card (item 132 (f)): one per site
  id: Id;                                                       // `site:<token>` — in a host document the token is §6.3's user-created form (the dropSite event's seq and ordinal); the card never lives on an arena
  kind: WorldSiteKind; purpose: SitePurpose;                    // SitePurpose: SiteKindRow.purposes' ids (V14 §2.5): 'defence'|'worship'|'dwelling'|'extraction'|'concealment'|'burial'|'storage'|'watch'|'solitude'|'trade'
  attachment: SiteAttachment;
  context: SiteContextKind;                                     // the context G1 read at creation; re-read on moveAnchor
  placement?: Placement;                                        // V13: a free-standing site's placement in the world regime (origin, bearing, precedence stamp); absent attached or surface
  anchor?: Id;                                                  // attached: its SiteAnchor in the host document (V14 §2.3)
  building?: Id;                                                // surface: the building the assignment path placed, in the host document (V14 §3.9 G8 (c))
  document?: SiteDocumentRef;                                   // attached and free-standing: the site's own document once materialized (lazily on first open, item 133 (h)); absent while `lifecycle.materialized` is 'candidate';
                                                                // a `surface` card's: present exactly when a level beyond item 29 (b)'s basement gate exists (then `anchor` is set on the lowest basement storey, V14 §3.9 (c); C14-26); never for `inFrame` or `ground`
  levels: Id[];                                                 // the SiteLevel records, ordinal order (in the site document, or in the host for an inFrame site)
  attraction: number; routed: boolean;                          // the kind row's columns copied at the drop, editable: V13's `site` term reads `attraction` (0–1) within `siteReachKm`; W7 seats a `routed` site (C14-04)
  frameDigest?: Hash64;                                         // an attached card: the host frame's digest at materialization (V14 §3.1; C14-11)
  envelope?: { ring: PolygonCm; levelBands: { level: number; floorCm: Cm; ceilingCm: Cm }[] };   // an attached card: the envelope and each level's band in the host's cm, read by V04's `siteEnvelopes(doc)` (C14-10)
  request: SiteRequest; programme?: SiteProgramme;              // the request (stated and derived), the programme G2 resolved (absent while candidate)
  complexity: { target: ComplexityVector; measured?: ComplexityVector };   // the target G2 set; the measured vector G5's close wrote on the finished geometry (absent while candidate)
  history: SiteHistoryLayer[];                                  // chronological (V14 §3.6 G5 (a)); empty while candidate
  lifecycle: WorldSiteLifecycle;                                // V14 §2.2 below (the set of states with causes), beside §2.8's Lifecycle on the record
  knowledge: SiteKnowledge;                                     // V14 §2.3
  water?: WaterClassReport;                                     // V13's classifier's aggregate for the site (G6); absent while candidate
  host?: WorldSiteHost;                                         // the host-owned facts (item 132 (h)); factTier 'dossier' on each path; absent standalone
  ageYears: number;                                             // 'yr': the oldest history layer's age at the drawn week; a request's `age` sets it, else G2 derives it
  name?: NameRef; identity: Identity; lifecycleBase: Lifecycle } // §2.8's two parts; `lifecycleBase.existence` mirrors `lifecycle.condition` (V14 §2.9); `identity.key` the anchor's part for an attached
                                                                // card, ground part 0 otherwise — a geometry-less record's key, read by nothing but the registry's path test (C14-54)
// Which fields are model data and which are derived (C14-03; J-V14.42): `kind`, `purpose`, `attachment`, `context`, `placement`, `anchor`, `building`, `request`,
// `attraction`, `routed`, `lifecycle` (every Dated state), `knowledge` (but `discoverable`), `host`, `name` and the identity are declared — in the model digest,
// moved only by events. `programme`, `complexity`, `history`, `document`, `levels`, `water`, `ageYears` (where not stated), `frameDigest`, `envelope` and
// `knowledge.discoverable` are G2–G8's products: they live in the host document's **derived block** (§2.9's non-canonical set, beside the elaboration cache),
// rebuilt from the declared fields on open and never in any digest, log or export's model.
type SiteDocumentRef = { docId: Uuid; product: 'site'; outputVersion: string; digest: Hash128 /* its model digest at the last commit the host document saw; checked at open (§2.9 step 3) */ };
interface WorldSiteHost { element: string /* the host's binding key (§7.7 item 12) */; owner?: string; faction?: string; status?: string /* the host's own word, mapped to a lifecycle cause by V14 §3.8's table */; version?: string }

// The request record (item 132 (g); item 133 (f)): what the user stated, what context derived, what the preset defaulted — every field a Stated<T>
type Stated<T> = { value: T; source: 'stated'|'derived'|'default'; by?: string /* for 'derived': the rule of V14 §3.3 G2's table that derived it; for 'default': the preset or kind row */ };
interface SiteRequest {
  kind: Stated<WorldSiteKind>; purpose: Stated<SitePurpose>;
  sizePreset: Stated<SizePreset>;                               // 'lair'|'small'|'medium'|'large'|'vast' — a named ComplexityVector of the kind row (V14 §2.5), never a slider
  floorsAbove: Stated<number>; levelsBelow: Stated<number>;     // 'lvl' (item 133 (f)): storeys above the site's datum; levels (site parts) below it
  footprint: Stated<FootprintShape>;                            // 'round'|'square'|'oblong'|'irregular'|'polygon' with `ring?: PolygonCm` for 'polygon' (a drawn shape); the envelope G5 embeds in
  terrain: Stated<TerrainShaping>;                              // 'none'|'level'|'raise'|'cut'|'moat'|'cliffFace' — a terrain pre-edit run before siting (V14 §3.4 G3 (b))
  owner: Stated<string|null>;                                   // a faction or person name (a host fact where the host gives one)
  condition: Stated<SiteCondition>;                             // 'pristine'|'occupied'|'vacant'|'damaged'|'ruined' (V14 §2.2's lifecycle)
  age: Stated<number>;                                          // 'yr'
  hiddenEntrance: Stated<boolean>;                              // the entrance unit's edge is a secret edge (V14 §3.5 G4)
  floodedLevel: Stated<number|null>;                            // 'lvl': the level below which units are flooded by request — G6 sets the governing surface at that level's floor (a dated surface in V13's terms)
  envelopeM2?: Stated<number>;                                  // 'm2': the plan envelope; defaulted from the preset's areaM2
  entrances?: Stated<number>; secrecy?: Stated<'open'|'discreet'|'secret'> }   // 'count'; the whole site's default knowledge
type SizePreset = 'lair'|'small'|'medium'|'large'|'vast';
type FootprintShape = { shape: 'round'|'square'|'oblong'|'irregular'|'polygon'; ring?: PolygonCm; aspect?: number /* oblong: 1.3–3 */ };
type TerrainShaping = { op: 'none'|'level'|'raise'|'cut'|'moat'|'cliffFace'; amountCm?: Cm /* raise or cut: ≤ EmbedRule.terrain.maxShapeCm */; radiusM?: number };
type SiteCondition = 'pristine'|'occupied'|'vacant'|'damaged'|'ruined';

// The programme (item 132 (g)): the request resolved — what to lay, in which order, under which policy
interface SiteProgramme {
  policy: SitePolicy;                                           // the kind row's policy, bound to this site (V14 §2.5)
  grammar: string;                                              // the UnitGrammarRule id G4 expands (the kind row's, or the request's purpose override)
  layers: ProgrammeLayer[];                                     // chronological: what each history layer lays (V14 §3.6 G5 (a))
  envelope: { ring: PolygonCm; areaM2: number; datumCm: Cm /* the site's datum: the ground height at the anchor or the frame's charter datum */ };
  storeys: { above: number; below: number };                    // 'lvl'
  entrances: { count: number; side: 'approach'|'any'|'hidden'; hidden: boolean };
  water: { floodedLevel: number|null };
  rooms?: ProgramRoom[];                                        // a surface site: V03's programme rows the building's plan takes (V03 §3.2 A2's form), riding as the building's programme (BCR-V14-12)
  reasons: Id[] }                                               // the ReasonRecords (V13) G2 wrote, one per derived field
interface ProgrammeLayer { ordinal: number; kind: 'natural'|'carved'|'built'; event: 'geology'|'construction'|'use'|'abandonment'|'damage'|'reuse'|'expansion'; ageYears: number; materializer: MaterializerId; budget: Partial<ComplexityVector> /* this layer's share of the target */ }
type MaterializerId = 'ground'|'enclosure'|'buildings'|'plan'|'naturalCave'|'rockCut'|'mine'|'builtLevel'|'ruination'|'occupants';
interface SitePolicy {                                          // which materializers a kind runs, on which parts, in which order; data (SiteKindRow.policy)
  ground: 'hinterland'|'none';                                  // a free-standing site's ground part: S12a's hinterland unit over the frame, or none (attached)
  enclosure: 'wall'|'palisade'|'none';                          // S7's trace over the envelope
  buildings: { classes: BuildingClass[]; arrangement: SitePlan['arrangement'] }[];   // S11 on plots the policy cuts inside the envelope (V14 §3.6 G5 (e))
  above: 'plan'|'none';                                         // V03's plan rung on the site's buildings
  below: ('naturalCave'|'rockCut'|'mine'|'builtLevel')[];       // the materializers admitted for levels, in the order they are layered when the history asks for several
  ruination: boolean; occupants: boolean }                      // G7's transforms admitted; an occupant layer admitted

// The complexity vector (item 132 (g)): every entry with its unit and its measurement (V14 §3.6 G5 (h) measures; V14 §2.2's table below defines)
interface ComplexityVector {
  units: number;            // 'count'
  passages: number;         // 'count'
  areaM2: number;           // 'm2'
  storeysAbove: number;     // 'lvl'
  storeysBelow: number;     // 'lvl'
  verticalLinks: number;    // 'count'
  entrances: number;        // 'count'
  loops: number;            // 'count' — the cyclomatic number of the passable unit graph
  branching: number;        // 'ratio' — the mean degree of the hub nodes
  chokepoints: number;      // 'count'
  openShare: number;        // 'share'
  concealedShare: number;   // 'share'
  defensiveDepth: number;   // 'count' — chokepoints between the nearest entrance and the core
  hazards: number;          // 'count'
  floodedShare: number;     // 'share'
  historicalLayers: number; // 'count'
  damage: number }          // 'share' — a reading at the drawn week, never a target (V14 §2.2's table)

// The unit graph (item 133 (g)): topology first
type UnitRole = 'entrance'|'hub'|'chokepoint'|'loop'|'deadEnd'|'secret'|'verticalLink'|'core'|'passage'|'court'|'cell'|'sump'|'shaft';
interface Unit { id: Id /* `site<n>/unit:<token>` on its level; a ground or built unit `unit:<token>` in the site document's entities block */;
  role: UnitRole; kind: 'built'|'carved'|'natural'; layer: number /* the SiteHistoryLayer ordinal that laid it */;
  level: number /* the site part, or 0 for the ground and the storeys above (then `storey` names the storey) */; storey?: number;
  geometry: { chamber: Id } | { gallery: Id } | { room: { building: Id; storey: number; room: Id } } | { face: FaceRef } | null /* null while the graph is unembedded */;
  floorCm: Cm; ceilingCm: Cm;                                   // z-completeness (item 141 (c) M9): the floor against the site's datum; the ceiling the floor plus the clear height — a court's or an open unit's ceiling is `floorCm + EmbedRule.openCeilingCm`
  area2?: number;                                               // twice the area, exact, written at embedding
  water?: UnitWaterClass;                                       // V13's per-unit class (G6): its class, governing surface, depth, thresholds, why — stored as V13's classifier returns it
  hazard?: ('collapse'|'pit'|'swimming'|'diving'|'unstable')[];
  elements?: UnitElement[];                                      // derived at G5 from the geometry (never stored): the pieces §6.3's `plan.damage` draw keys and G7 reads (C14-13)
  knownTo: 'public'|'local'|'secret'; reached?: true;           // the players reached it (SiteKnowledge.reached lists them too; the unit's flag is the drawing's read)
  reason: Id;                                                   // the ReasonRecord (V13): layer, programme role, event
  lifecycle: Lifecycle }
interface UnitElement { kind: SiteDamageRow['kind']; key: [Id, string, number] /* (the unit or gallery, the kind's word, the ordinal): V14 §2.8's element keys */; geom: { segment: [PointCm, PointCm] } | { face: FaceRef } | { point: PointCm } }
  // one `rockCeiling` and one `rockFloor` per chamber; one `rockWall` per segment of the `chamber_wall` chain between consecutive kerb vertices; one `shoring` per
  // gallery stretch between junctions; one `pillar` per pillar instance; one `stairFlight` per VerticalLink; one `trapdoor` per access; `builtVault` and
  // `builtWallBelow` per built chamber beside V11's built kinds
interface UnitEdge { a: Id; b: Id; kind: 'passage'|'door'|'secretDoor'|'breach'|'vertical'|'open'; widthClass: 'squeeze'|'narrow'|'normal'|'wide'; passable: boolean /* false while collapsed or submerged (G7, G6) */; link?: Id /* kind 'vertical': the VerticalLink */ }
interface UnitGraph { site: Id; nodes: Id[]; edges: UnitEdge[]; entrances: Id[]; core: Id|null; grammar: string; expansions: number /* the rules applied, for the report */ }
interface VerticalLink {                                        // a stair, ladder, shaft, ramp, trapdoor or well joining two units on different levels or storeys (item 141 (b), (c) M10)
  id: Id; kind: 'stair'|'ladder'|'shaft'|'ramp'|'trapdoor'|'well';   // the link's word; its AccessPoint, where one exists, takes II.7.4's kind — a `trapdoor` link's access is a `hatch` (C14-35)
  a: { unit: Id; level: number; storey?: number; elevationCm: Cm /* the floor at this end */; at: VertexRef /* ('link_end', id, 0) on the unit's wall or kerb */ };
  b: { unit: Id; level: number; storey?: number; elevationCm: Cm; at: VertexRef };
  risePerRunCm?: [Cm, Cm];                                      // a ramp's or stair's slope as (rise, run)
  state: 'open'|'blocked'|'collapsed'|'flooded'; knownTo: 'public'|'local'|'secret'; cause: AccessCause /* V04 §2.2's, rule 'site' added */; lifecycle: Lifecycle }

// The history superposition (item 133 (g); V14 §3.6 G5 (a))
interface SiteHistoryLayer { ordinal: number; kind: 'natural'|'carved'|'built'; event: ProgrammeLayer['event']; ageYears: number; materializer: MaterializerId; units: Id[]; reason: Id }

// A level (C14-05): one per `site` part, created by G5; the `system` every Chamber and Gallery of the part names; the owner of the part's L1 rock face and margin
interface SiteLevel { id: Id /* `site<n>/level:0` */; site: Id; part: number; ordinal: number /* 1 the first below the datum; negative ordinals never: a level above the datum is a V03 storey */;
  elevationCm: Cm /* the floor datum of the level */; ceilingCm: Cm /* the part's headroom cap: no unit's ceiling exceeds elevationCm + ceilingCm */; bandCm: Cm /* the depth band the level draws in (§8.4's depthBandCm) */;
  name?: NameRef; units: Id[]; lifecycle: Lifecycle }

// The lifecycle (item 134 (b); proposal §6's states as a set with causes, never a sequence)
interface WorldSiteLifecycle {
  materialized: Dated<'candidate'|'generated'>;                 // a dropped icon is a candidate; the first open materializes (item 133 (h))
  retention: Dated<'transient'|'persistent'>;                   // a promoted encounter is persistent; a card is always persistent — the field exists so a promotion's record reads its origin
  occupancy: Dated<'vacant'|'occupied'|'active'>;               // 'active': occupied and in use by its host status (garrisoned, worked, worshipped)
  condition: Dated<SiteCondition|'destroyed'|'cleared'|'restored'>;   // the condition transform in force (V14 §3.8 G7)
  shape: Dated<'asBuilt'|'repurposed'|'expanded'|'collapsed'>;  // a programme change since the first materialization
  water: Dated<'dry'|'damp'|'wading'|'swimming'|'submerged'> }  // the aggregate's median class over the units (V13 §2.4's words), a reading written for the icon and the host (C14-37)
type Dated<T> = { state: T; since: { epoch: number; seq: number; week: number }; cause: LifecycleEvent['cause'] };
```

**The complexity vector's measurement** (one rule per entry; measured by G5 (h) on the finished geometry, the
measured vector compared with the target by T-V14-6; every entry's unit from §2.1's list):

| entry | unit | measured as |
|---|---|---|
| `units` | count | the `Unit`s with a geometry whose role is not `passage` |
| `passages` | count | the `Unit`s of role `passage` |
| `areaM2` | m2 | Σ `area2 ÷ 2` over every unit, in m² |
| `storeysAbove` | lvl | the site buildings' highest `Storey.level` + 1, 0 with none |
| `storeysBelow` | lvl | the count of `site` parts, plus the site buildings' basement storeys where a building's basement is a unit's host |
| `verticalLinks` | count | the `VerticalLink`s |
| `entrances` | count | the units in `UnitGraph.entrances` that carry an access record or an opening in the envelope's exterior (an `AccessPoint`, a gate, a cave mouth) (C14-36) |
| `loops` | count | `E − V + C` over the passable edges and the nodes they join (`C` the connected components), by one union-find |
| `branching` | ratio | the mean degree over the nodes of degree ≥ 3 (the hubs), 0 with none, to two decimals |
| `chokepoints` | count | the bridges of the passable graph lying on some entrance-to-core path, plus every unit of role `chokepoint` (an edge and its unit counted once), by one bridge search (lowlink) |
| `openShare` | share | Σ area of the units of role `hub`, `core` or `court` whose area ≥ `EmbedRule.openMinM2` ÷ `areaM2` |
| `concealedShare` | share | the units reachable from every entrance only through a `secretDoor` edge or a `secret` unit ÷ `units` |
| `defensiveDepth` | count | the minimum over entrances of the number of `chokepoint` units and bridge edges on the shortest passable path to the core, 0 with no core |
| `hazards` | count | the units with a non-empty `hazard` |
| `floodedShare` | share | the units whose `water.class` is `wading`, `swimming` or `submerged` ÷ `units` |
| `historicalLayers` | count | the `SiteHistoryLayer`s |
| `damage` | share | the units with at least one element past its damage threshold at the drawn week (V03 §5.6's comparison over the unit's elements) ÷ `units` — a reading, never persisted in `measured` (written 0 there) |

**Above the datum the graph is read from the plan (C14-14; J-V14.48).** A built storey's units are V03 rooms, whose
adjacency V03's partition decides (V03 §3.2 A1–A6); after each storey's cut G5 (e) **re-reads the unit graph's edges**
from the plan — a `door`, `arch` or `open` opening between two rooms that are units' geometries gives a `door` edge,
a stair core a `vertical` edge, a concealed opening a `secretDoor` edge — and every entry above is measured on the
whole graph so read. For a kind whose policy has `above: plan` the target's `loops`, `chokepoints` and
`defensiveDepth` apply to the **enclosure's gate chain and the levels below** (the entrance units, the court and
chokepoint units G5 (e) lays as gates and wards, and every `site` part); the storeys' own entries are measured and
reported, never asserted. No adjacency wish is sent to V03 (its programme rows stay the one input).

A target vector sets `units`, `storeysAbove`, `storeysBelow`, `entrances`, `loops`, `chokepoints`, `defensiveDepth`,
`openShare`, `concealedShare`, `floodedShare` and `historicalLayers` as goals with the tolerances of
`EmbedRule.vectorTolerance` (V14 §2.5); `passages`, `areaM2`, `verticalLinks`, `branching`, `hazards` and `damage` are
consequences, reported only. A preset is a vector (the kind row's); the request's `floorsAbove`, `levelsBelow`,
`entrances`, `hiddenEntrance` and `floodedLevel` overwrite its entries before G4 reads it (V14 §3.3 G2).

### 2.3 The anchor, the access record and the knowledge layers

```ts
// The anchor (item 133 (a); the one new piece; BCR-V14-1): where an attached site hangs in its host document
interface SiteAnchor {
  id: Id /* `anchor:<token>`, user-created (§6.3) */; site: Id /* the WorldSite */;
  address: AnchorAddress;                                       // the context the icon draws in (V14 §5.1)
  at: PointCm;                                                  // the icon's point in the address's arena; moves with its host face under a warp (§7.4) as a Decoration's point does
  access?: Id;                                                  // the one AccessPoint of source 'site' (below), headed on the anchor's storey by V14 §3.9 (a)'s head rule; absent only while G8 (a) found no head (`W_SITE_NO_ACCESS`) or for a `ground` card without levels
  secret: SecretState;                                          // the three states (item 133 (e))
  knownTo: 'public'|'local'|'secret';                           // derived from `secret.state` (below), stored for §9.2's filter and S14's byte; never set by hand
  lifecycle: Lifecycle }
type AnchorAddress =
  | { layer: 'ground'; part: number; host: Id /* the corridor, square, yard, block or building face the icon stands in (pointLocate, ground part 0 or a raised part) */ }
  | { layer: 'ground'; part: 0; building: Id; storey: number; room?: Id /* V03: inside a plan at that storey; the icon draws only with that plan open at that storey (V14 §5.1) */ }
  | { layer: 'underground'|'site'; part: number; element: Id /* a tunnel, gallery, chamber or underground building of that part */ }
  | { layer: 'sky'; part: number; host: Id };
interface SecretState { state: 'dmOnly'|'revealed'|'discovered'; since: { seq: number; week: number }; cause: LifecycleEvent['cause'] }
  // dmOnly: knownTo 'secret' and the anchor absent from every party key's `places`; revealed: the DM or the host added the anchor to the party's `places`
  // (V08 §3.14's reveal), knownTo 'secret' still; discovered: the party reached it (a host event, or the DM's mark), knownTo 'local'. The admission
  // function (§9.2) reads knownTo and the key's `places` as for any place; the state adds the second cue (V14 §5.1) and the clerk's words only.

// The one access record (item 133 (b)): II.7.4's AccessPoint with its `under` reaching the site document (BCR-V14-2)
type SiteReach = { site: Id /* the WorldSite, written whole with its namespace (V14 §2.8) */; unit: Id /* the entrance unit in the site document, whole */; level: number /* its site part */;
  at: VertexRef /* ('access_point', id) on that unit's wall or kerb, in the site document */; floorCm: Cm /* the entrance unit's floor against the host's datum, written by G8 (a) and re-written by every G5 of that level — what the host's `verticalEnds` reads (C14-24) */ };
// AccessPoint.under: { part; element; at } | SiteReach; AccessPoint.ground gains `storey?: number` for source 'site' (the anchor's storey; V14 §3.9 (a)'s head rule, C14-02);
// AccessPoint.source gains 'site'; AccessCause.rule gains 'site'. Its `state` and condition (bricked, collapsed while its unit is closed) are II.7.4's. Its
// stored `knownTo` is its own (a trapdoor may be found before anyone knows what lies beneath), but every reader takes it through one function
//   effectiveKnownTo(access) = anchor.secret.state === 'dmOnly' ? 'secret' : anchor.secret.state === 'discovered' ? max(access.knownTo, 'local') : access.knownTo
// (C14-18; BCR-V14-2): while the site is DM-only its head draws in no party plan, exports in no party scene and is listed nowhere below `secret`. A
// `site`-sourced access is never a `HoodPlace`: V01's opening pass and V04's excavation reading skip it (its `under` is a `SiteReach`); its surface
// symbol is V01 §3.8.8's ground symbol at the effective knowledge only (C14-33).

// The site's knowledge layers (the world-fact contract, item 131 (c); proposal §3's five layers)
interface SiteKnowledge {
  exists: true;                                                 // a card exists whether or not anyone knows (the DM's secret)
  dm: true;                                                     // every card is DM-known
  players: 'none'|'revealed'|'discovered';                      // mirrors the anchor's SecretState for an attached site; a free-standing site's own (set by the host's reveal or the DM)
  reached: Id[];                                                // the units the party has reached (host event or DM mark), sorted by address; each listed unit has `reached: true`
  discoverable: boolean;                                        // derived: false while every entrance's access is submerged at diving depth or bricked and no secret edge admits (G6; item 137 (g)); read by the icon's cue and the clerk
  default: 'public'|'local'|'secret' }                          // the units' default knownTo from the request's secrecy
```

**Where the words land.** The owner's "DM only / revealed / discovered" are `SecretState.state`; "players know" is
`revealed` or `discovered`; "players reached" is `SiteKnowledge.reached` (the units) and the anchor's `discovered`;
"discoverable" is the derived flag. The admission function is unchanged: a `dmOnly` anchor is a `secret` place not in
the party's `places`, so a party view neither draws, lists, counts, names nor exports it; `revealed` puts its address in
the party's `places` by the host's reveal (V08 §3.14) or the DM's `setAttr`, so the same function admits it; `discovered`
raises its `knownTo` to `local`, so anyone who grew up there may know it too. The second cue beside colour is the
icon's glyph (V14 §5.1). The DM toggles the state by one `setAttr` on `anchor/secret/state` (V14 §4.2); a lowering
(`discovered` → `dmOnly`) is admitted and recorded with its cause, as the owner's "toggled secret on and off" asks.
**The party's places** (C14-17): the base's `knowledge` key is per viewer and the party's places live in the host's
`MapRecord.party` (§11.3) only while a host is bound, so this volume adds one **shared** view key `party: { tier:
'public'|'local'; places: Id[] }` (V14 §2.6; BCR-V14-19; last-writer-wins by Lamport and session, written by the owner
and editor roles only): the document's own party key when no host is bound and a mirror of `MapRecord.party` when one
is (V08's reveal writes both). `revealed` writes the anchor's address there; View as (V09 §4.8) and the party picture
read it through `ViewOpts.viewAs`'s key form; the admission function is unchanged.

### 2.4 Derived transients (never persisted)

```ts
// The encounter (item 132 (a), (b)): one operation — materialize detail at an address at a scale — with the discard policy
interface EncounterAddress {                                    // keyed by world address and time; never an hour (item 136 (a))
  doc: Uuid;                                                    // the document clicked (a settlement, a site document, or V13's world document)
  arena: PlatKey | { world: true /* V13's regime, in metres */ } | { site: Id; level: number };
  at: PointCm | { xM: number; yM: number /* the world point, V13 */ };
  storey?: number;                                              // a click inside an open plan: that storey
  depthBand?: number;                                           // a click on Below: the drawn band (§8.4)
  week: number;                                                 // §2.9's `week` at the click — the time in the key
  logHead: number }                                             // the document's logHead at the click (§11.3): the same address at another head is another encounter (its facts may differ); never a model input
interface Encounter {
  key: EncounterAddress; context: SiteContextKind; profile: string /* the EncounterExtentRow id E3 chose */;
  resolved: { layers: PlatKey[]; buildings: Id[]; elements: Id[] /* tunnels, galleries, chambers in the crop */; places: Id[]; site?: Id /* a crop over a site document */ };
  completed: { plans: Id[] /* the buildings whose plan rung E2 derived */; occupancy: Record<Id, OccupancySummary> };
  water: { byFace: Record<Id, WaterClassResult> /* V13's classes for every unit, plot and street face of the resolved set at the key's week (C14-21) */; routes: RouteClassResult[] /* V13's `routeClass` over the crop's ways */ };
  crop: EncounterCrop; transient: TransientItem[] /* E4's derived items; the DM's own are the view key's */;
  reasons: ReasonRecord[] /* V13's shape, view-only: held with the open encounter, never persisted (C14-38; V14 §2.7) */ }
interface EncounterCrop {
  rect: { x0: Cm; y0: Cm; x1: Cm; y1: Cm };                      // in the arena's cm, snapped outward to whole grid cells (E3)
  gridCm: Cm; origin: PointCm;                                  // the tactical grid's cell (`StyleSheet.vtt.squareM` × 100, C14-39) and its origin: the crop's south-west corner, which lies on the world grid (E3's origin rule) — stable per address (item 136 (b))
  cols: number; rows: number;
  scenes: { ordinal: number /* the file suffix: 0 the ground, then each storey or level in elevation order (the multi-floor convention, V14 §5.3; C14-06) */;
            scene: { key: PlatKey } | { depthBand: number } | { building: Id; storey: number } | { site: Id; level: number } | { raisedWay: Id } }[];   // the scene set the VTT export writes for the crop (§11.1's forms plus the site level)
  waterStamp: Hash64;                                           // the digest of the surface set in force at the key's week (V13 §2.7's form), written into every scene's `plat` object (C14-20)
  transientKey?: TransientKey }                                 // E4's owner-less transient arena while the crop is open (BCR-V14-4)
interface OccupancySummary {                                    // item 132 (c): the moment's occupancy by an abstraction, never individuals, never an hour
  band: 'empty'|'few'|'some'|'crowded';                         // the band over the parts' summed headcount
  headcount: [number, number];                                  // 'people': the summed range
  parts: { of: 'households'|'staff'|'patrons'|'congregation'|'garrison'|'occupants'; headcount: [number, number]; from: { count: number /* households, workers, parish coverage, strength */; capacity?: number; use?: Id; row: string /* the OccupancyRow */ } }[] }   // one part per presence a building has (a tavern: patrons, staff and its household) (C14-40)
interface TransientItem { id: string /* local to the crop */; kind: 'barricade'|'cart'|'fire'|'smoke'|'fog'|'debris'|'camp'|'tent'|'marker'|'pool'|'corpse'|'wagon';
  shape: { point: PointCm; rotCdeg?: Cdeg; wCm?: Cm; dCm?: Cm } | { ring: PolygonCm } | { line: PointCm[]; widthCm: Cm };
  blocks: { sight: boolean; move: boolean }; source: 'derived'|'dm'; from?: { look: Id /* the ConditionOverlay a derived item came from */ } | { site: Id /* the site's occupant layer */ } }
interface TacticalReport { cover: number /* 'share': the crop's or site's floor area within 2 m of a sight-blocking edge */; sightlines: { meanM: number; maxM: number }; chokepoints: number; loops: number; deadEnds: number;
  flanks: number /* 'count': entrance pairs with two disjoint paths to the core */; vector: ComplexityVector /* the measured vector, for the comparison */ }
interface WaterClassReport { floodedShare: number; submergedShare: number; lowestDryCm: Cm|null; access: 'walkable'|'wading'|'swimming'|'diving'|'none'; byUnit: Record<Id, UnitWaterClass>; surface: Id /* V13's governing surface */; stamp: Hash64 }   // V13 §3.13.3's site summary; `lowestDryLevel` is derived from `lowestDryCm` against the levels' floors (C14-37)
type UnitWaterClass = WaterClassResult;                          // V13 §2.4's record: class, depth, share, the governing surface with `via` and `kind`, the thresholds, why — stored as returned, read never inferred
interface AdoptResult { parts: { from: PlatKey; to: PlatKey }[]; addresses: { from: Id; to: Id }[]; reservation: Id; kept: { locks: number; pins: number; edits: number } }
interface EmbedResult { units: Id[]; links: Id[]; parts: number[]; measured: ComplexityVector; warnings: string[]; attempts: number }
interface ConditionResult { closed: Id[] /* units made impassable */; opened: UnitEdge[] /* breaches that joined units */; robbed: Id[] /* elements robbed for stone (V06's ledger) */; level: number /* the decay level applied */ }
```

Each transient is total over its inputs: an `Encounter` at a point with nothing resolvable (open water of the world,
the frame's margin) still returns a crop with its profile `open` and no completions (E3's `open` row); an
`OccupancySummary` with no households, use or capacity is `{ band: 'empty', headcount: [0, 0], parts: [] }`; a
`TacticalReport` over no unit is all zeros; a `WaterClassReport` before V13 lands is V14 §1b.6's provisional form; an
`AdoptResult` over a site with no part lists none. Tested by T-V14-26 (a).

### 2.5 New rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

Every value below is **our own** (provenance `own`, `extension`: no reference the base calibrates against has a
site, an encounter crop or a 2.5D view; the surveyed tools (`research/sites/survey.md` §2–§3) expose sliders and
seeds whose values are neither read nor transferred, §17.1), calibratable against the corpus when its stage comes
(§13.9) unless marked `calibratable: false` (enumerations, keys, grammars). The survey's §6.2 records that no
reference takes context as an input or measures its own output, so these tables have no reference to calibrate
against and the V14-P panel rates them. Historical anchors named are orders of magnitude, not measurements. V11's registry
gains the rows V14 §10.2 requests; their schema is here.

```ts
// tables/sites/admissibility.json — G1 (item 134 (a)); BCR-V14-10 gives it its registry row
interface SiteAdmissibilityRow { context: SiteContextKind; kinds: WorldSiteKind[]; attachment: SiteAttachment[] /* the modes admitted, the first the default */; note?: string }
interface SiteAdmissibilityRule { rows: SiteAdmissibilityRow[];
  edge: { nearM: number /* 400: within this of the enclosure the hinterland is 'near' */; farM: number /* 1 500: beyond this, inside the frame, the context is 'country'; outside every frame the context is 'world' (G1 rule 1) */;
          enclosure: 'outermostEnceinte'|'perimeter' /* which line the distance is measured from where both exist: the outermost enceinte's outer strip, else S6's settlement perimeter */ } }
```

| context | kinds admitted (`own`) | attachment (the first the default) |
|---|---|---|
| `urbanSurface` | tower, temple, shrine, manor, guildhall, watchpost → `surface` (the assignment path; BCR-V14-12); camp, battlefield, graveyard → `ground` (C14-09) | `surface`; `ground` for the three marker-like kinds |
| `urbanInside` (a storey of a building) | crypt, cellarComplex, hideout, shrine, dungeon | `attached` |
| `urbanBelow` (an underground part) | crypt, cellarComplex, hideout, sewerLair, dungeon, cave, temple | `attached` |
| `urbanSky` (an island's part) | shrine, tower, hideout, watchpost → `inFrame` (the island's `ground` part is the host, its reservation on the island's unbuilt land); camp, graveyard → `ground`; a cave or crypt under an island's buildings → `attached` | `inFrame`; `ground`; `attached` |
| `hinterlandNear` | cave, hideout, crypt, hermitage (its cell) → `attached` (levels only, anchored on the hinterland face); shrine, graveyard, watchpost, camp, battlefield, mine, ruin, tower, manor, fort, temple → `inFrame` (adopted at the drop, V14 §3.9 (g)); camp, battlefield, graveyard → also `ground` | `attached` for the level-only kinds; `inFrame` for every kind with a ground policy; `ground` for the markers |
| `hinterlandFar` | every kind but cellarComplex, sewerLair, guildhall: the level-only kinds `attached`, the rest `inFrame`, the markers also `ground` | `inFrame`; `attached`; `ground` — never `free` inside a frame (C14-01; J-V14.41) |
| `country` | every kind but cellarComplex, sewerLair, guildhall, manor | `free` (a cave attached to a terrain feature: `free` with `placement` on V13's feature, J-V14.11); camp, battlefield, graveyard also `ground` on V13's regime through a crop frame's promotion only |
| `world` (V13's regime, no frame) | as `country` | `free` |

A kind's policy decides the mode class: a kind whose policy has `ground: 'none'` and no `buildings` (cave, hideout,
crypt, cellarComplex, sewerLair, dungeon; a hermitage's cell) is **level-only** and takes `attached`; every kind with
a ground policy or buildings takes `inFrame` inside a frame and `free` outside one; `camp`, `battlefield` and
`graveyard` are **marker-like** and take `ground` wherever a ground face exists.

`edge.nearM` 400 and `farM` 1 500 (own): a hamlet's fields lie within a few hundred metres of its houses and a town's
hinterland rarely reaches two kilometres (§4.9's land-use rings); the frame's edge caps `farM` where the frame is
smaller. The distance is the plan distance from the click to the nearest point of the enclosure line, by the ground's
static index (one query).

```ts
// tables/sites/kinds.json — G2, G4, G5: one row per WorldSiteKind
interface SiteKindRow { kind: WorldSiteKind; purposes: SitePurpose[] /* the first the default purpose */; grammar: string /* UnitGrammarRule id by purpose: `${kind}.${purpose}` */;
  presets: Record<SizePreset, ComplexityVector> /* named vectors (item 132 (g)) */; policy: SitePolicy;
  defaults: { floorsAbove: number; levelsBelow: number; footprint: FootprintShape['shape']; condition: SiteCondition; ageYears: [number, number] /* drawn by G2 */; secrecy: 'open'|'discreet'|'secret'; entrances: number };
  envelopeM2PerUnit: number /* 'm2': the envelope's area per target unit, the plan density of the kind */; history: ProgrammeLayer['event'][] /* the default layer events in order */;
  buildingClass?: BuildingClass /* the surface exception's class; the fort's keep, the tower's class … (V11 §3.5's rows) */; icon: string /* the anchor icon's glyph id (V14 §5.1) */ }
```

Shipped rows (own; the vectors are the `medium` presets, the other presets scale `units`, `loops`, `chokepoints`,
`entrances` and `areaM2` by `lair` 0.25 · `small` 0.5 · `large` 2 · `vast` 4, rounded, and `storeysBelow`,
`defensiveDepth`, `historicalLayers` by the kind's `presetSteps` row, `calibratable: false` for the scaling):

| kind | purposes | medium: units · loops · chokepoints · entrances · defensiveDepth · openShare · concealedShare · storeysAbove · storeysBelow · historicalLayers | policy (ground · enclosure · buildings · above · below · ruination · occupants) | defaults (floorsAbove, levelsBelow, footprint, condition, age yr, secrecy, entrances) | m² per unit |
|---|---|---|---|---|---|
| `fort` | defence, watch | 24 · 3 · 3 · 2 · 2 · 0.35 · 0.05 · 2 · 1 · 2 | hinterland · wall · [keep, barracks, hall, stable, store] row+institution · plan · [builtLevel] · yes · yes | 2, 1, square, occupied, [30, 400], open, 2 | 60 |
| `tower` | solitude, watch, dwelling | 10 · 0 · 1 · 1 · 1 · 0.2 · 0.1 · 4 · 1 · 1 | hinterland · none · [tower] institution · plan · [builtLevel] · yes · yes | 4, 1, round, occupied, [20, 300], discreet, 1 | 35 |
| `temple` | worship, burial | 18 · 2 · 1 · 1 · 1 · 0.4 · 0.15 · 1 · 1 · 2 | hinterland · none · [temple] institution · plan · [builtLevel, rockCut] · yes · yes | 1, 1, oblong, occupied, [50, 800], open, 1 | 70 |
| `shrine` | worship | 3 · 0 · 0 · 1 · 0 · 0.6 · 0 · 1 · 0 · 1 | none · none · [shrine] institution · plan · [] · yes · no | 1, 0, square, pristine, [10, 300], open, 1 | 30 |
| `manor` | dwelling, trade | 16 · 1 · 1 · 2 · 1 · 0.3 · 0.05 · 2 · 1 · 1 | hinterland · palisade · [manor, barn, stable] institution · plan · [builtLevel] · yes · yes | 2, 1, oblong, occupied, [20, 300], open, 2 | 55 |
| `guildhall` | trade | 12 · 1 · 1 · 1 · 0 · 0.4 · 0.1 · 2 · 1 · 1 | none · none · [guildhall] institution · plan · [builtLevel] · yes · yes | 2, 1, oblong, occupied, [20, 200], open, 1 | 60 |
| `ruin` | (any; the purpose of the site it was) | 20 · 2 · 1 · 2 · 1 · 0.5 · 0.1 · 1 · 1 · 3 | hinterland · wall · [hall, store] row · plan · [builtLevel] · yes (forced ruined) · yes | 1, 1, irregular, ruined, [100, 1 500], open, 2 | 60 |
| `cave` | concealment, dwelling | 14 · 3 · 2 · 1 · 1 · 0.3 · 0.1 · 0 · 2 · 2 | none · none · [] · none · [naturalCave] · no · yes | 0, 2, irregular, vacant, [1 000, 20 000], discreet, 1 | 45 |
| `mine` | extraction | 22 · 2 · 2 · 1 · 1 · 0.1 · 0 · 1 · 3 · 2 | hinterland · none · [mineHead, store] row · plan · [mine] · yes · yes | 1, 3, square, occupied, [10, 200], open, 1 | 25 |
| `hideout` | concealment | 9 · 1 · 2 · 2 · 2 · 0.2 · 0.4 · 0 · 1 · 2 | none · none · [] · none · [rockCut, builtLevel] · yes · yes | 0, 1, irregular, occupied, [5, 60], secret, 2 (one a bolt-hole) | 30 |
| `crypt` | burial | 8 · 1 · 1 · 1 · 0 · 0.3 · 0.1 · 0 · 1 · 1 | none · none · [] · none · [builtLevel] · yes · no | 0, 1, oblong, vacant, [50, 600], discreet, 1 | 40 |
| `cellarComplex` | storage, concealment | 10 · 2 · 1 · 2 · 1 · 0.2 · 0.2 · 0 · 1 · 2 | none · none · [] · none · [builtLevel, rockCut] · yes · yes | 0, 1, irregular, occupied, [20, 300], discreet, 2 | 30 |
| `sewerLair` | concealment, dwelling | 8 · 1 · 2 · 1 · 1 · 0.25 · 0.3 · 0 · 1 · 1 | none · none · [] · none · [rockCut, builtLevel] · yes · yes | 0, 1, irregular, occupied, [5, 80], secret, 1 | 30 |
| `dungeon` | (the request's: defence, worship, burial, extraction, concealment) | 40 · 6 · 4 · 1 · 3 · 0.3 · 0.15 · 0 · 3 · 4 | none · none · [] · none · [naturalCave, rockCut, builtLevel, mine] · yes · yes | 0, 3, irregular, vacant, [200, 2 000], secret, 1 | 40 |
| `camp` | dwelling, defence | 8 · 0 · 1 · 2 · 0 · 0.7 · 0 · 0 · 0 · 1 | hinterland · palisade · [tent] cluster · none · [] · yes · yes | 0, 0, round, occupied, [0, 5], open, 2 | 50 |
| `battlefield` | (none) | 4 · 0 · 0 · 0 · 0 · 1 · 0 · 0 · 0 · 1 | hinterland · none · [] · none · [] · yes · no | 0, 0, irregular, vacant, [0, 50], open, 0 | 200 |
| `graveyard` | burial | 4 · 0 · 0 · 1 · 0 · 0.8 · 0 · 0 · 0 · 1 | hinterland · none · [chapel] institution · plan · [crypt as builtLevel] · yes · no | 1, 0, oblong, occupied, [20, 500], open, 1 | 80 |
| `watchpost` | watch | 4 · 0 · 1 · 1 · 1 · 0.3 · 0 · 2 · 0 · 1 | none · palisade · [watchtower] institution · plan · [] · yes · yes | 2, 0, round, occupied, [5, 200], open, 1 | 30 |
| `hermitage` | solitude, worship | 4 · 0 · 0 · 1 · 0 · 0.3 · 0.1 · 1 · 0 · 1 | hinterland · none · [cell] institution · plan · [rockCut] · yes · yes | 1, 0, square, occupied, [10, 300], discreet, 1 | 30 |
| `bridgeFort` | defence, trade | 10 · 1 · 2 · 2 · 2 · 0.3 · 0 · 2 · 0 · 1 | none · wall · [gatehouse, barracks] row · plan · [] · yes · yes | 2, 0, oblong, occupied, [20, 400], open, 2 | 50 |

`presetSteps` (own, `calibratable: false`): `storeysBelow` +0 / +0 / +1 / +2 for `lair` / `small` / `large` / `vast`
(the `dungeon` row +0 / +1 / +2 / +4), `defensiveDepth` −1 / 0 / +1 / +1 clamped to [0, 5], `historicalLayers`
−1 / 0 / +1 / +2 clamped to [1, 6].

Two more kind-row columns feed V13's siting (C14-04; `SiteKindRow.attraction: number` 0–1 and `.routed: boolean`,
own, calibratable), copied to the card at the drop (`WorldSite.attraction`, `.routed`) and read by V13's `site` term
within its `siteReachKm` and by W7's seats:

| kind | `attraction` | `routed` | why |
|---|---|---|---|
| fort, bridgeFort | 0.6 | yes | protection and a toll draw settlement and roads |
| watchpost | 0.2 | no | a garrison's post, no market |
| mine | 0.5 | yes | ore is traded |
| manor, guildhall | 0.3 | yes | a market in small |
| temple, shrine, graveyard, hermitage | 0.15 | temple yes, the rest no | pilgrims |
| ruin | 0.1 | no | stone to rob |
| camp | 0.05 | no | transient |
| cave, hideout, cellarComplex, sewerLair, dungeon, crypt, battlefield, tower | 0 | no | unknown to siting, or a solitude that repels (a tower's `solitude` term already keeps settlements off) |

```ts
// tables/sites/grammar.json — G4: grammars as data (item 133 (g)); calibratable: false (a grammar is a key set)
interface UnitGrammarRule { id: string /* `${kind}.${purpose}` or a shared id a kind row names */;
  axiom: UnitRole[];                                            // the starting chain, entrance first
  shape: 'concentric'|'axial'|'tree'|'organic'|'approach'|'ring'|'cluster';   // the embedding family G5 reads (V14 §3.6)
  rules: { lhs: UnitRole; rhs: { role: UnitRole; kind?: Unit['kind']; edge: UnitEdge['kind'] }[]; weight: number /* 'weight' */;
           when?: { minUnits?: number; maxDepth?: number; needsCore?: boolean; purpose?: SitePurpose[] } }[];
  caps: { maxDegree: number; maxDepth: number; loopsPerHub: number /* a loop closes a hub's two branches; 'ratio' */; secretShare: [number, number] /* 'share' */ };
  core: UnitRole /* the role the expansion must reach once */; stop: 'budget' /* expansion stops when the target's `units` is met */ }
```

Shipped grammars (own, `calibratable: false`; each written out in V14 §3.5 G4): `fort.defence` (concentric),
`tower.solitude` (axial, vertical), `temple.worship` (axial with the crypt below), `temple.burial`, `mine.extraction`
(tree on a shaft), `cave.concealment` (organic), `hideout.concealment` (approach with a bolt-hole),
`crypt.burial` (ring of bays), `cellarComplex.storage` (cluster), `sewerLair.concealment` (approach),
`dungeon.*` (the purpose's grammar per layer), `manor.dwelling` (cluster with a hall core), `camp.dwelling` (ring).

```ts
// tables/sites/extent.json — E3 (item 132 (d)): the crop's extent by the location's profile
interface EncounterExtentRow { id: string; context: SiteContextKind[]; match: ProfileMatch; sideM: [number, number] /* min, max; 30–100 m (proposal §8) */;
  centre: 'click'|'placeCentre'|'junction'|'chamberCentre'; include: ('frontages'|'wholePlace'|'chamberSet'|'junctionArms'|'landing'|'bothBanks')[]; scenes: ('ground'|'storeys'|'band'|'deck'|'level')[] }
type ProfileMatch = { kind: 'corner'|'bend'|'straight'|'square'|'gate'|'bridge'|'quay'|'yard'|'place'|'interior'|'sewerJunction'|'sewerRun'|'chamber'|'gallery'|'landing'|'field'|'creek'|'road'|'wood'|'shore'|'open'|'siteLevel'|'siteGround' };
```

| id | context | match | sideM | centre | include | scenes |
|---|---|---|---|---|---|---|
| `street.corner` | urbanSurface, urbanSky | corner (a junction within 12 m) | [40, 60] | junction | frontages, junctionArms | ground, storeys |
| `street.bend` | urbanSurface, urbanSky | bend (a way vertex turning ≥ 30°) | [40, 60] | click | frontages | ground, storeys |
| `street.straight` | urbanSurface, urbanSky | straight | [36, 50] | click | frontages | ground, storeys |
| `square` | urbanSurface, urbanSky | square (an L1 square or square block, V04 §1.2's public ground) | [50, 100] | placeCentre | wholePlace, frontages | ground, storeys |
| `gate` | urbanSurface | gate (within 20 m of a gate) | [50, 80] | placeCentre | wholePlace | ground, deck |
| `bridge` | urbanSurface | bridge deck or within 15 m of a deck end | [40, 80] | placeCentre | bothBanks | ground, deck |
| `quay` | urbanSurface | a quay way or basin edge within 15 m | [50, 90] | click | frontages | ground |
| `yard` | urbanSurface, urbanSky | a yard or passage face | [30, 45] | placeCentre | wholePlace | ground, storeys |
| `place` | urbanSurface, urbanSky, hinterlandNear, hinterlandFar | a named place or institution within 10 m (a tavern plus its street; a mill, an inn or a farmstead in the hinterland) | [45, 70] | placeCentre | wholePlace, frontages | ground, storeys |
| `interior` | urbanInside | inside a plan | [30, 50] | placeCentre | wholePlace | storeys |
| `sewer.junction` | urbanBelow | an underground junction within 15 m | [40, 70] | junction | junctionArms, chamberSet | band |
| `sewer.run` | urbanBelow | a tunnel run | [40, 60] | click | chamberSet | band |
| `chamber` | urbanBelow | a chamber (any system) | [36, 80] | chamberCentre | chamberSet | band |
| `gallery` | urbanBelow | a gallery | [40, 60] | click | chamberSet | band |
| `landing` | urbanSky | an island's landing yard | [40, 70] | placeCentre | landing | ground (the island's part) |
| `field` | hinterlandNear, hinterlandFar | a field, strip or close face | [60, 100] | click | — | ground |
| `creek` | hinterland, country | within 20 m of a water body's shore or a brook | [60, 100] | click | bothBanks | ground |
| `road` | hinterland, country, world | within 15 m of a way or route | [60, 100] | click | — | ground |
| `wood` | hinterland, country, world | a wood face | [60, 100] | click | — | ground |
| `shore` | hinterland, country, world | a coast within 30 m | [60, 100] | click | — | ground |
| `site.level` | a site document's level | a unit | [36, 80] | chamberCentre | chamberSet | level |
| `site.ground` | a site document's ground | the site's envelope | [50, 100] | placeCentre | wholePlace | ground, storeys |
| `open` | any | nothing matched | [60, 100] | click | — | ground |

The rows are tried in this order; the first whose `match` holds and whose `context` admits the click wins (the first
row is `street.corner`, so a corner beats a straight). `sideM` is resolved by E3's extent rule (V14 §3.12). The 30–100 m
band is the proposal's (own): thirty metres is one house and its street, a hundred a square with its frontages; a
battle larger than that is a siege, not an encounter (J-V14.5).

```ts
// tables/sites/purpose.json — G3: purpose weights on V13's suitability score (proposal §5): the terms are THIS VOLUME'S `SuitabilityTerm` plug-ins in
// `@plat/sites/siting`, registered with V13's `SuitabilityScore` (V13 §1b.2's plug-in slot; C14-04), each a pure function of V13's rasters and layers
interface SitePurposeWeightRow { purpose: SitePurpose; terms: Partial<Record<SiteTerm, number>> /* 'weight': the term's weight in V13's score; a negative weight repels */; hard?: SiteTerm[] /* terms whose zero refuses the candidate */ }
type SiteTerm = 'overlook'|'relief'|'slopeFlat'|'waterNear'|'shoreNear'|'routeNear'|'roadControl'|'settlementNear'|'settlementFar'|'territoryBorder'|'floodSafe'|'ore'|'stone'|'wood'|'solitude'|'concealment'|'oneApproach';
// each plug-in, stated once (its V13 input; every output in [0, 1]; constants own, calibratable):
//   overlook   — the dem's local prominence: (h(c) − mean h over overlookRadiusM 300) ÷ overlookNormM 40, clamped;  relief — the dem's range over the same radius ÷ reliefNormM 120
//   slopeFlat  — 1 − the dem's gradient ÷ slopeMax 0.25, clamped;  waterNear — exp(−distToRiverM ÷ 400) (a lake or spring counts as a river edge);  shoreNear — exp(−distToShoreM ÷ 600)
//   routeNear  — exp(−d_route ÷ 300), d_route the distance to the `route` layer;  roadControl — routeNear × min(1, crossings within 300 m ÷ 2) × overlook
//   settlementNear — exp(−d_settlement ÷ 2 000) over the placements' origins;  settlementFar — 1 − settlementNear;  territoryBorder — exp(−d_border ÷ 1 000) over Territory.border
//   floodSafe  — 0 inside the wet-season FloodSpread at stage 1, else min(1, height above the stage ÷ 300 cm);  ore, stone — 1 within 200 m of a W5 resource site of that class, falling to 0 at 1 000 m
//   wood       — the landUse's wood share within 300 m;  solitude — settlementFar × (1 − routeNear)
//   concealment — 1 − max(overlook, routeNear) (the inverse of being seen from routes and heights; J-V14.36);  oneApproach — 1 when exactly one low-cost approach (a route-cost basin under V13's cost law reaches the cell from one direction within 2 × its cost to the nearest route), 0.5 for two, 0 beyond
```

| purpose | weights (own) | hard |
|---|---|---|
| `defence` | overlook 3, roadControl 3, waterNear 1, floodSafe 2, slopeFlat 1, territoryBorder 2 | floodSafe |
| `watch` | overlook 4, roadControl 2, solitude 1 | overlook |
| `worship` | overlook 1, solitude 1, waterNear 1, settlementNear 1, relief 1 | — |
| `burial` | settlementNear 2, slopeFlat 1, floodSafe 2 | floodSafe |
| `dwelling` | waterNear 2, slopeFlat 2, wood 1, settlementNear 1, floodSafe 2 | floodSafe |
| `extraction` | ore 4, stone 2, waterNear 2, routeNear 1, relief 1 | ore (a mine), stone (a quarry) |
| `concealment` | concealment 4, oneApproach 3, settlementFar 1, wood 1 | oneApproach |
| `storage` | routeNear 2, settlementNear 2, floodSafe 2 | floodSafe |
| `solitude` | solitude 4, overlook 2, settlementFar 2, waterNear 1 | solitude |
| `trade` | routeNear 4, settlementNear 2, shoreNear 1, slopeFlat 1 | routeNear |

The terms are plug-ins computed here from V13's rasters (the `dem`, `distToRiverM`, `distToShoreM`, the `route`
layer, the placements' origins, `Territory.border`, the wet-season `FloodSpread`, W5's resource sites, `landUse`);
V13 owns the score, its own terms (`habitability`, `discharge`, `lowland`, `coastType`, `resource`, `spring`, `site`,
`connectivity`) and the plug-in interface; nothing is asked of V13 but that interface's inputs (V14 §10.2). The
`siting` draw is the tie-break among equal candidates, V13's own rule (C14-04).

```ts
// tables/sites/lifecycle.json — G7 (item 134 (b)): transitions with causes and the transform each applies; calibratable: false
interface SiteLifecycleRow { from: SiteCondition|'destroyed'|'cleared'|'restored'|'*'; to: SiteCondition|'destroyed'|'cleared'|'restored'; causes: ('host'|'dm'|'epoch'|'water'|'promotion')[];
  transform: 'none'|'occupy'|'vacate'|'decay'|'ruin'|'destroy'|'clear'|'restore'; level?: [number, number] /* the decay level band the transform applies (V06 §3.23's thirds) */; leaves?: 'ruin'|'record'|'both' }
// shipped rows (own; `calibratable: false`; C14-34):
//   * → occupied            causes host, dm, promotion    transform occupy
//   occupied → vacant       causes host, dm, epoch        transform vacate
//   vacant | occupied → damaged   causes host, dm, epoch  transform decay   level [0, 2/3]
//   damaged | vacant → ruined     causes host, dm, epoch  transform ruin    level [2/3, 1]
//   * → destroyed           causes host, dm, epoch        transform destroy leaves both
//   destroyed | ruined → cleared  causes host, dm, epoch  transform clear   leaves record
//   * (but cleared) → restored    causes host, dm         transform restore
//   restored → pristine     cause rule (the restore Works' FINISHED week)  transform none
//   pristine | vacant → vacant    cause water (G6's aggregate `submerged`)  transform vacate
//   occupied → vacant       cause rule:host (the host building's decay run, C14-32)  transform vacate
// tables/sites/occupancy.json — E2 (b) (item 132 (c))
interface OccupancyRow { of: OccupancySummary['of']; by: 'households'|'use'|'garrison'|'site'; perHousehold?: [number, number] /* 'people' present per household at any moment: [1, 3] */; perCapacity?: number /* 'share' of a use's capacity present: patrons 0.4, staff 0.15, congregation 0.1, garrison 0.6 */;
  bands: { empty: [number, number]; few: [number, number]; some: [number, number]; crowded: [number, number] } /* 'people': [0,0], [1,3], [4,10], [11, ∞) */; seasonal?: Record<'festival'|'winter'|'market', number> /* multipliers read from §2.9's week and the festival display */ }
// shipped rows (own, calibratable; C14-34, C14-44): households by households, perHousehold [1, 3]; staff by use, perCapacity 0.15 of the use's workers (V11's class capacity row); patrons by use, perCapacity 0.4 of
// the use's capacity, seasonal festival 1.5, winter 0.8, market 1.3 (a market week: DR43's festival window's twin, the market's own weeks); congregation by use, perCapacity 0.1 of the church class's coverage
// unit at the plot (V11 §2.3's `cov/<class>`); garrison by garrison, perCapacity 0.6 of `WorldSiteHost.strength` (the V08 request's row) else the barracks class's capacity; occupants by site, the occupying kind's row
// tables/sites/crop.json — E1–E4: the crop's constants
interface CropRule { snapToGrid: true /* the rectangle snaps outward to whole cells; the geometry never snaps (proposal §8) */; maxBuildings: number /* 12: the most plans E2 completes in one crop; beyond it the nearest to the centre, the rest drawn as shells, W_CROP_INCOMPLETE */;
  maxScenes: number /* 8 */; occupancyMarkM2: number /* 40: one occupancy mark per 40 m² of a room or chamber */; lookItems: Record<string /* a crisis look kind (§10.2) */, { kind: TransientItem['kind']; perHa: number; where: 'gates'|'streets'|'edges'|'hosts' }>;
  transientBudget: number /* 200 items */; firstFrameMs: number /* 100 */; completeMs: number /* 300 */;
  recentEventWeeks: number /* 104: how far back E1's `world` context reads V13's event index */; maxInstitutions: number /* 2: the institutions a crop completes before `maxBuildings` falls to 8 (C14-43) */ }
// shipped lookItems rows (own, calibratable; C14-34): siege → barricade at gates 4 per ha and debris on streets 6 per ha; fire → fire 2 per ha and smoke 4 per ha on hosts; plague → none;
// refugee camp → tent 8 per ha on hosts; quarantine → barricade 2 per ha at edges; a battle (V13's event index) → corpse 3 per ha, debris 4 per ha, wagon 0.5 per ha on edges
// StyleSheet.vtt (BCR-V14-8; C14-39): { squareM: 1.5 /* or 1; the crop's grid cell and the export's default `vtt.squareM`; set by the export dialog's "remember" (a `setStyle`), never a view key */ }
// tables/sites/embed.json — G5: the embedding's constants
interface EmbedRule {
  passage: { widthCm: Record<UnitEdge['widthClass'], Cm> /* squeeze 60, narrow 100, normal 150, wide 250 */; headroomCm: Cm /* 220 */; wallCm: Cm /* 40 rock; 30 masonry */; minRunCm: Cm /* 300 */ };
  unit: { minM2: Record<UnitRole, number> /* entrance 12, hub 40, chokepoint 8, loop 15, deadEnd 10, secret 8, verticalLink 6, core 50, passage 0, court 120, cell 6, sump 10, shaft 4 */; aspectMax: number /* 3 */; ceilingCm: Record<Unit['kind'], [Cm, Cm]> /* built [240, 600], carved [200, 400], natural [150, 1 200] */;
          maxPerLevel: number /* 36: the unit budget per materialization (one level is one embedding); G4 rule 9 cuts a larger level in two joined by a vertical edge — the survey's graph-embedding warning (§4.7, §6.1 (7)), own, calibratable (C14-31) */ };
  openCeilingCm: Cm /* 100 000: an open unit's nominal ceiling for the classifier */; openMinM2: number /* 40 */;
  cave: { octaves: number /* 4 */; shapeM: number /* 18: the noise's feature size */; threshold: number /* 0.52 */; smoothing: number /* 2 Chaikin passes */; minChamberM2: number /* 15 */; passageSampleM: number /* 4 */; cellular?: { passes: number; birth: number; survive: number } /* an optional raster pre-pass; off by default */ };
  mine: { agents: number /* 3 per level */; stepM: number /* 4 */; turnMaxCdeg: Cdeg /* 3 000 */; followOre: number /* 0.8: the share of steps that follow the ore gradient */; driftMaxM: number /* 80 */; pillarSpacingM: number /* 10 */ };
  rockCut: { gridCm: Cm /* 100: the carved plan's module */; bayM: [number, number] /* Voronoi bay size for a crypt or a cistern: [3, 6] */ };
  built: { moduleCm: Cm /* V03's moduleCm, read there */ };
  vertical: { stairRunCm: Cm /* 28 */; stairRiseCm: Cm /* 18 */; shaftMaxCm: Cm /* 2 000 */; rampGrade: number /* 0.125 */; linkReachM: number /* 6: how far a link's two ends may stand apart in plan */ };
  terrain: { maxShapeCm: Cm /* 600: a request's raise or cut */; moatWidthM: number /* 6 */; cliffMinCm: Cm /* 400 */ };
  vectorTolerance: { units: number /* ± 15 % */; loops: number /* ± 1 */; chokepoints: number /* ± 1 */; entrances: number /* exact */; defensiveDepth: number /* ± 1 */; openShare: number /* ± 0.1 */; concealedShare: number /* ± 0.1 */; floodedShare: number /* ± 0.1 */; historicalLayers: number /* exact */ };
  attempts: number /* 3: G5's ladder attempts before the envelope grows */; envelopeGrow: number /* 1.25 per attempt, ≤ 2 */ }
// tables/sites/damage.json — G7: the carved and natural element kinds' decay ranges (V11 §3.25.10's form; V14 §10.2 asks V11 to adopt the rows)
interface SiteDamageRow { kind: 'rockWall'|'rockCeiling'|'shoring'|'pillar'|'rockFloor'|'caveFormation'|'stairFlight'|'trapdoor'|'builtVault'|'builtWallBelow'; range: [number, number] /* the level band inside V06 §3.23's thirds where this kind breaks */; effect: 'collapse'|'rubble'|'breach'|'none'; closes: boolean;
  material: 'rock'|'timber'|'masonry' /* the unit kind's material: natural and carved rock, a mine's shoring timber, a built level's masonry */; ratePerYear: number /* 'share' per yr: V06 §3.23 (2)'s `r` for a card's lineage — rock 0.002, timber 0.05, masonry 0.01, own, calibratable (C14-13) */ }
```

| `SiteDamageRow` (own) | range | effect | closes the unit |
|---|---|---|---|
| `shoring` (a mine's timber; timber 0.05/yr) | [0.20, 0.45] | collapse | yes |
| `stairFlight` | [0.30, 0.60] | rubble | no (climbable rubble, V04 §5.6 (3)) |
| `trapdoor` | [0.25, 0.50] | none (a gap) | no |
| `builtWallBelow` | [0.50, 0.80] | rubble | no |
| `builtVault` | [0.60, 0.90] | collapse | yes |
| `pillar` | [0.55, 0.85] | collapse | yes where every pillar of the unit falls |
| `rockCeiling` | [0.70, 0.95] | collapse | yes |
| `rockWall` | [0.80, 1.00] | breach | no — opens a `breach` edge to the adjacent unit where one lies within `passage.wallCm × 3` |
| `rockFloor` | [0.85, 1.00] | pit (hazard) | no |
| `caveFormation` | never | none | no |

A natural cave hardly decays: the `cave` kind's `ruination` is `no`; its damage is the collapses a host or DM
`collapseUnit` applies by hand (V14 §4.3). The ranges follow V04 §5.6's precedent that what lies below ground holds
out longest (`builtVault` above `cellarVault`'s band there), own.

```ts
// tables/sites/view25.json — R2, R3 (item 141): the projection families and the level of detail; the style family's rows live in each sheet (BCR-V14-7)
interface ProjectionRow { family: 'isometric'|'oblique'|'perspective'; azimuthCdeg: Cdeg /* default 4 500 (north-east up-right) */; elevationCdeg: Cdeg /* the view's tilt: isometric 3 526 (true isometric), oblique 4 500 with the cabinet half-depth, perspective 4 000 */;
  exaggeration: [number, number] /* 'ratio': [1, 3], default 1.5 */; cabinet?: number /* oblique: the depth factor 0.5 */; fovCdeg?: Cdeg /* perspective: 4 500 */ }
interface Lod25Row { band: LodBand; terrain: 'flat'|'draped'|'drapedWithContours'; massing: 'none'|'prism'|'prismRoof'|'composed'; storeys: 'none'|'slabs'; walls: 'line'|'extruded'; trees: 'none'|'dot'|'cone'|'crown'; underground: 'none'|'bandSlab'; islands: 'disc'|'slab'; lights: boolean }
```

| band | terrain | massing | storeys | walls | trees | underground | islands | lights |
|---|---|---|---|---|---|---|---|---|
| `city` | draped | prism (flat tops at `eaveCm`) | none | extruded | dot | bandSlab (the drawn band only) | disc | no |
| `district` | draped | prismRoof (V02's roofs where composed, else the base's roof spec) | none | extruded | cone | bandSlab | slab | no |
| `neighbourhood` | drapedWithContours | composed (V02's wings) | slabs (the storeys of the buildings whose plan exists, cut at `storey`) | extruded | crown | bandSlab | slab | yes |
| `building` | drapedWithContours | composed | slabs | extruded | crown | bandSlab | slab | yes |

### 2.6 View state (never in any digest)

```ts
// §2.9's view keys this volume adds (BCR-V14-7, BCR-V14-19)
interface Projection { family: 'flat'|'isometric'|'oblique'|'perspective'; azimuthCdeg: Cdeg; elevationCdeg: Cdeg; exaggeration: number /* 'ratio' 1–3 */;
  cutaway: { storey?: number /* draw the slabs up to and including this storey, the ones above removed; absent: every storey */; depthBand?: number /* the underground band drawn as a slab; default §8.4's */ } }
  // the per-viewer view key `projection`, default { family: 'flat' } — the flat map is the default (item 141, the owner's clarification); M11: view state, outside the hash
type EncounterViewKey = { open?: { key: EncounterAddress; items: TransientItem[] /* the DM's placed items (source 'dm') */; notes: string[] } };   // the SHARED view key `encounter` (§2.9's shared keys; last-writer-wins by Lamport and session): one open encounter per document at a time, seen by every editing role; a viewer role sees its exported picture only
type SiteOpenKey = { site: Id; level?: number; storey?: number };   // the per-viewer view key `siteOpen`: the site document the viewer has opened from an icon, and where in it; the app switches documents on it (V09)
type PartyKey = { tier: 'public'|'local'; places: Id[] };       // the SHARED view key `party` (C14-17): the party's knowledge when no host is bound, a mirror of `MapRecord.party` when one is; written by `revealed`, the host's reveal and the DM; read by View as and the party picture through `ViewOpts.viewAs`
```

The `encounter` key is shared so a co-DM sees the same crop and items (V08's roles); its `items` are view data: they
never enter a digest, the log or an export's model, and leave with the key. `projection.exaggeration` and `family`
change no tile key of the flat view (§8.8): the 2.5D tiles are a separate tile set keyed by the projection (V14 §5.5).

### 2.7 Reason records (V13's; this volume's writers)

`ReasonRecord` is declared by V13 §2 (the world-fact contract's eighth field, item 131 (c)); this volume writes one
per generated fact and never restates its shape. The writers and what each names, so bar 10's test can fail when a
chain is missing: G1 (the context: the enclosure line read, the distance, the row matched); G2 (one per derived
request field: the rule of V14 §3.3's table, the context facts read); G3 (the placement: V13's score terms with the
purpose weights, the candidates considered, the terrain pre-edit); G4 (one per unit: the grammar rule applied, its
parent unit, the budget state); G5 (one per history layer and one per unit's geometry: the materializer, the
constraints met, the attempt); G6 (per unit: what V13's classifier returns, stored on the unit); G7 (per transition:
the cause, the level, the elements closed or opened); G8 (the anchor's host, the access's dig, an adoption's
mapping); E1–E4 (the profile, the extent, each completion, each derived item) — these **view-only**: the same shape, held with
the open encounter in its memo, never persisted, read by V10's `encounter` section while it is open (C14-38). The G-
stages' records are persisted as V13 states (the entities block, the records digest only). The clerk's `why` reads
them through V14 §4.9's providers; V10's chain test (bar 10) walks from a unit to its layer to its programme to its
request.

### 2.8 Identity: lineage units and creation keys

Addresses, lineage and anchors are §6.3's, with V13 §2.5's **namespace segment** (item 140 M1; C14-22): every id that
names an entity of another document is written whole with that document's namespace (`<ns>:site2/unit:k`) —
`SiteReach.site` and `.unit`, `SiteDocumentRef` (which carries `namespace`), `WorldSite.adoptedFrom`,
`EncounterAddress.doc` with its `arena`, `AdoptResult.addresses`, the anchor's `site` and the card's `anchor` — while a
document's own addresses are bare inside it; adoption rewrites the segment to the settlement's (the mapping in
`AdoptResult.addresses`), so two adopted site documents never collide on a token (bar 7). The site document's town
root is the card (its lineage the dropSite
event's seq, or the placement's stamp for a host-placed site), so every entity of a site derives from the card and two
sites never share draws (bar 7). What this volume adds is each generated entity's **lineage parent and creation key**:

| entity | parent | creation key |
|---|---|---|
| the card (in a host document) | the creating event (`dropSite`, `promoteEncounter`) | (`site`, the event's seq) — §6.3's user-created form |
| the card (host-placed, a free-standing site the host's record creates) | the host's binding key hashed as the unit | (`site`, the record's key) |
| the anchor | the card | (`anchor`, 0) |
| the access record | the card | (`access`, 0); a re-dug access after `moveAnchor` keeps the key (its id kept, its geometry replaced) |
| the site document | the card | its `docId` minted from the card's lineage (§6.3's permalink form), so a re-materialization of the same card yields the same document id |
| a history layer | the card | (`layer`, its ordinal) |
| a `SiteLevel` | the card | (`level`, its ordinal) |
| a unit's `UnitElement` (a derived piece; its key feeds §6.3's `plan.damage` draw) | the unit or gallery | (the kind's word, the ordinal): `ceiling` 0, `floor` 0, `wall` i by the chain's kerb-vertex order, `shoring` i by the gallery's junction order, `pillar` i, `stair` the link's key, `trapdoor` the access's key |
| a graph node (`Unit`) | the history layer | (the grammar rule's id, the parent unit's key, the rhs ordinal) — so an expansion kept by a re-build keeps its units; the axiom's units (`axiom`, ordinal) |
| a unit's `Chamber` or `Gallery` on a `site` part | the unit | (the unit's key, `geom`) |
| a passage unit's gallery | the edge | (the two end units' keys sorted, `passage`) |
| a `VerticalLink` | the edge | (the two end units' keys sorted, `vertical`) |
| a site building on the ground | the card | (the policy's building ordinal, the class) — S11 then keys its wings and plan as the base does, the building as their unit |
| a site plot | the card | (`plot`, the policy's ordinal) |
| the site's enclosure, gates, towers | the card | S7's keys with the card as the town root |
| the hinterland unit's faces | the card | S12a's keys with the card as the town root |
| a mine agent's drift | the level | (`drift`, the agent ordinal, the step) |
| a cave chamber from the outline | the level | (`cave`, the outline component's lowest-then-leftmost lattice point) |
| a Voronoi bay | the unit | (`bay`, the seed's ordinal) |
| an occupant item promoted from an encounter | the card | (`occupant`, the item's local id) |
| a derived `TransientItem` | — (a view) | the render key: (the seed, the look's id, the crop's origin, the item ordinal) on `render.instances` |
| an `Encounter` | — (a view) | none: its key is the `EncounterAddress` itself |

Two entities whose keys collide take §6.3's ordinal suffix in address order; a key whose source is gone keeps the
entity by §6.3's anchor carry-over. On **adoption** (G8 (e)) every address keeps its token and changes only its part
prefix (`site2/unit:k` → `site7/unit:k` in the settlement document, by its own `nextSitePart`), the mapping recorded in
`AdoptResult.addresses` and in the `adoptSite` event, so locks, pins, assignments and edits follow by §7.5's mapping.
Tested by T-V14-7 and T-V14-26 (b).

### 2.9 The lifecycle of every state field this volume adds or gives a producer

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `WorldSite` (the card) | `dropSite`, `promoteEncounter`, the host's record | V14 §1b.1's readers | the entities block | kept whole by every re-derivation of its host document (a card is declared, §7.2); its own document re-derives by G-SITE under its own locks | the creating event's | absent: no site; the upgrade creates none |
| `WorldSite.request` | the creating event; `setSiteRequest` | G2 | the card | an input override (declared fields) kept by every re-derivation; derived fields re-derived when their context facts change (V14 §4.2's locality) | the former request | each field's `source` read `default` where absent |
| `WorldSite.programme`, `.complexity.target`, `.complexity.measured`, `.history`, `.document`, `.levels`, `.water`, `.ageYears` (unstated), `.frameDigest`, `.envelope`, `.knowledge.discoverable` — G2–G8's products (C14-03; J-V14.42) | G2–G8 on the first open and on every re-materialization | G4–G8, the icon, the clerk, V12, the exports, adoption | the host document's **derived block** (§2.9's non-canonical set; never in the model, records or document digest, never in the log or an export's model) | rebuilt from the card's declared fields on open — the same seed, request, context facts and tables give the same products byte for byte (V14 §3.15) | not an undo target (no event moved them); the unlink of the site document follows the `dropSite` undo | absent: rebuilt at the next open |
| `WorldSite.history`'s ages where `request.age` is stated | the request | G7 | the card (declared) | kept | with the request | — |
| `WorldSite.lifecycle.*` | G7, the conversions, the host's events, promotion | the icon, the transforms, the clerk, exports | the card; each change a `LifecycleEvent` with cause | never re-derived: a state is an event's product | the event's inverse | absent: `generated`/`persistent`/`vacant`/`pristine`/`asBuilt`/`dry` |
| `WorldSite.knowledge`, `SiteAnchor.secret`, `.knownTo` | the DM's `setAttr`, the host's reveal, a reach event | the admission function, the icon, V08, the clerk | the card and the anchor (model data) | never re-derived (`discoverable` is the derived block's) | the inverse | absent: `dmOnly`, `secret`, `none` |
| the shared `party` view key (C14-17) | `revealed`, the host's reveal (mirrored from `MapRecord.party`), the DM | the admission function under `viewAs`, View as, the party picture | the document's shared view state; never canonical | a view | not an event | absent: `{ tier: 'public', places: [] }` |
| `SiteLevel` (C14-05) | G5, one per `site` part | the band ladder, the level chip, the programs, `verticalEnds`, the exports | the site document's entities block (an `inFrame` site's: the host's) | kept by its key; re-laid with its level | the scope's | absent: one per part, built on load from the part's `elevationCm`, reported |
| the site document's `week` (C14-12) | mirrored from the host at every open and before every G7 call (attached, `inFrame`, adopted); V13 §3.12.4's campaign week for a free site in a world; its own `generate` week for a standalone free site, advanced by `advance` on it alone | G7's decay runs, E2's occupancy, G6's dated surfaces, `SecretState.since` | §2.9's week source (a mirror writes nothing: the host's week is read at the call) | — | — | absent: the host's |
| `WorldSite.water`, `Unit.water` | G6 at each materialization and at every V13 cascade that touches the site's governing surface | the lifecycle's `water`, the exports, the clerk, `floodedShare` | the card and the unit | recomputed by G6 (V13's cascade) | follows its causes | absent: V14 §1b.6's provisional reading |
| `WorldSite.host` | V08's port | `factTier`, G7's causes | the card | held by the dossier (§7.7 item 2) | never an undo target (§7.4's port rule) | absent standalone |
| `SiteAnchor` | `dropSite`, `promoteEncounter`, adoption | the icon, the access, the admission, V09, V10 | the entities block | kept (declared); its `address.host` re-hosted by `pointLocate` under a warp (§7.4); on a deleted host face moved to the nearest admitted face of the same context and reported (never silently dropped) | the creating event's; `moveAnchor`'s inverse | absent: none |
| the access record of source `site` | G8 (a); `moveAnchor` | V03's head, V04's and V01's drawing, VTT, the clerk | the entities block | re-dug by `moveAnchor`; its state by II.7.4's rules and V14 §3.9's closures (a submerged entrance reads `flooded`) | with its event | absent: dug at the next open, reported `W_SITE_NO_ACCESS` |
| `Unit`, `UnitEdge`, `UnitGraph` | G4, G5 | G5–G7, the drawing, the exports, the clerk | the site document's entities block | a `setSiteRequest` re-builds the graph keeping locked units as fixed nodes and every unit §6.3's carry-over matches; a New random on a level re-draws that level's units | the scope's | absent: rebuilt from the geometry's owners (one unit per owned face, roles `hub`), reported |
| `Unit.geometry`, `floorCm`, `ceilingCm`, `area2` | G5 | the classifier, the drawing, 2.5D, the exports | the unit | with its level | the scope's | absent: `floorCm` from the part's `elevationCm`, `ceilingCm` the kind's default |
| `Unit.knownTo`, `.reached` | the request's secrecy (G2), the DM, a host reach event | the admission function, the drawing | the unit | kept (declared) | the inverse | absent: the site's default |
| `VerticalLink` | G5 (g) | the drawing, 2.5D's slab joins, VTT portals, the clerk | the entities block | kept by its key; re-laid where either unit moves | the scope's | absent: none (a storey link is V03's stair) |
| `SiteHistoryLayer.ageYears` | G2 | G7 | the card | kept | with the request | absent: the kind row's draw |
| the `encounter` view key | the DM's click and placements | E1–E4, the crop view, the VTT crop | the viewer's shared view state, never the document | a view | not an event | absent: none open |
| the `projection` view key | V09's view switch | R2–R4 | per-viewer view state | a view | not an event | absent: `flat` |
| the `siteOpen` view key | the icon's click | the app's document switch | per-viewer view state | a view | not an event | absent: none |
| `Document.nextSitePart` | G5 (one per level) | every site address | the canonical form | never decreases; an undone level's number stays spent (§2.9's rule) | — | absent: 1 |
| `Reservation` of kind `worldSite` | G8 (e)'s adoption | S3's claims, S4's destinations | the settlement document's reservations | kept (a declared claim) | with the adoption | absent: none |
| the tables of V14 §2.5 | shipped; `editTable` | their stages | the override layer | a table edit re-derives from its first reader stage (§7.6) | §7.4's editTable row | an older document reads the shipped defaults |

## 3 Generation

### 3.1 The site pipeline: order, registration, the site document, scheduling

**One operation, two retention policies (item 132 (a); J-V14.2).** The one operation is *materialize detail at an
address at a scale*. The encounter crop (E1–E4) runs it on a document the viewer has open, at the crop's scale, with
the **discard** policy: its products are views (§2.9's view keys, §3.4's transient arena, the elaboration cache's
plans) and never the model. The world site (G1–G8) runs it inside a **site document** of its own at the site's scale
with the **persist** policy: its products are a card in the host document and a document of PLAT arenas. A crop
opened over a site document is the first on top of the second. **Promotion** (V14 §3.13) turns the first into the
second: a named place, or a card whose request is derived from what was there.

**The site document (J-V14.3).** A site is a `Document` (§2.9) whose recipe's `product` is `'site'` (V01 §2.6's
`Recipe.product` gains the value; BCR-V14-3) and whose creation prefix holds one `dropSite` or `promoteEncounter`
event copied from the host (the card's request and context, so the document replays from its own log) and, for a
free-standing site, V13's charter record as S1's input (V13 §2's `FrameCharter`, M5's one input record). Its stage
set (`ProductDecl.stages`, §4.12) is the G- stages below, which call the base's and the volumes' materializers **as
functions**, never the settlement's stage graph: no S0–S15 run on a site document, `Features.sewers` is false, no tail
runs, no epoch runs unless the host's events or V06 over an adopted site call G7. Its arenas: `ground` part 0 only for
a free-standing site (the frame V13's placement gives it; its terrain from S1 under the charter), `site` parts from 1
(its levels), `underground` parts never, `sky` parts never. An attached site document has no `ground` part: its
levels are `site` parts and its anchor and access live in the host. The site document's `docId` is minted from the
card's lineage (V14 §2.8), so a re-materialization of the same card after an unlink finds the same id. The host
document holds the card and, for an attached site, the anchor and the access record; it never holds a site's geometry
(item 133 (b): the city's plots never move). An `inFrame` site (V14 §3.9 (g)) and a `ground` card (V14 §3.9 (h)) have
no document: their content is the host's. **The attached site document's frame (C14-11)** is the host's `Frame`
(`widthCm`, `heightCm`, the same centre; K3 holds — the frame is local and no absolute position enters a digest), so a
point in the host is the same point in the site document and A3's envelope, `SiteReach.at`, the cutaway's projection
and `siteEnvelopes` read one coordinate system; every arena content lies inside the envelope's rectangle grown by
the rock margin; the card records `frameDigest` (the host frame's digest at materialization) and a host frame change
(a future `adjust` of the frame; none exists today) marks the site stale and reported. A free-standing site's frame
is G3 (c)'s. **The clock (C14-12).** An attached, `inFrame` or adopted site reads its host document's `week`: an
attached site document's `week` is mirrored from the host at every open and before every G7 call, never advanced on
its own (`advance` on a site document is refused `refuse.site.clock`); a free-standing site placed in a world reads
the world document's campaign week (V13 §3.12.4); a standalone free-standing site reads its own `generate` week,
advanced only by `advance` on it. **What the open writes (C14-03; J-V14.42).** The first open and every
re-materialization write the host's **derived block** only (V14 §2.2's list: the programme, the vectors, the history,
the document reference, the levels, the water, the unstated age, the frame digest, the envelope, `discoverable`) —
never the model, the log or a digest; so opening and closing every card of a document leaves its model digest,
records digest, log and every arena byte-identical (T-V14-31), two machines that opened different cards hold one
digest of one log, and §2.9 step 3's check never meets an opened card. Only `dropSite`, `setSiteRequest`, `moveAnchor`,
the conversions and the secret toggle move the host's digest.

**Registration and scheduling.** The G- stages register as `StageDecl`s by declared I/O (§4.12) in `@plat/layout`'s
registry under the product `site`, each with `phase: 'main'` of that product and the stream concern `site`
(BCR-V14-14). A candidate card is materialized **lazily on first open** (item 133 (h)): the icon's click, the clerk's
`open`, an export naming the site or a host event that needs its geometry runs G2–G8 on the generation worker and
posts §11.2's `Progress` per stage past one second (g item 119's rule as V04 §6 reads it). G1 and G2 run inside the
`dropSite` event's dry run (they size the ghost and list what the context derives); G3 runs there for a free-standing
drop with a point, and on the worker for a drop with no point.

| order | stage | reads | writes | streams (§6.1) | lineage unit | ladder |
|---|---|---|---|---|---|---|
| G1 | admissibility `SiteContext.of` | the clicked address; the host document's enceintes, perimeter, districts, buildings, plans, underground parts, islands (read); V13's world facts for a world point; `SiteAdmissibilityRule` | the card's `context`; the admitted kinds and attachment (the dialog's list) | none (no draw) | the card | F-SITE |
| G2 | request resolution `SiteRequestResolver.resolve` | the request; the context's facts (V14 §3.3's table); `SiteKindRow`; the host's record | `WorldSite.programme`, `.complexity.target`, `.ageYears`, `.history` (the layers' events and ages); the derived fields' `source` and `by`; reason records | `site` keyed by the card, salt `age` (the one draw) | the card | F-SITE |
| G3 | siting `SiteSiting.site` and the terrain pre-edit | V13's world document and score; `SitePurposeWeightRow`; the request's `terrain`; the host's placement | `WorldSite.placement` (V13's `Placement`); the site document's frame and charter; the terrain pre-edit as a `setField` of the site document's creation prefix | `site` keyed by the card, salt `siting` (the controlled random term V13's score admits) | the card | F-SITE |
| G4 | topology `TopologyBuilder.build` | the programme; `UnitGrammarRule`; locked units (a re-build) | `UnitGraph`, the `Unit`s (geometry null), the `UnitEdge`s; reason records | `site` keyed by (the card, the history layer, the rule) | the history layer | F-SITE |
| G5 | embedding `Embedder.embed` | the graph; `EmbedRule`; the policy; V13's charter (a free-standing site's ground); the host element's geometry for an attached site (the building's basement ring, the tunnel's band, the chamber's outline: the envelope's neighbours) | the site document's `ground` part (a free-standing site) and `site` parts (levels): L0 rock and margin, L1 passage and wall chains, L2 bands, L3 unit faces, L4 built things; `Gallery`, `Chamber`, `VerticalLink`, `LightSource`; the site buildings and their plans; `Unit.geometry`, `floorCm`, `ceilingCm`, `area2`; `complexity.measured`; `history` | `site` keyed by (the card, the layer, the unit); `plot.*`, `siting`, `siteplan`, `heights`, `pin.light` for the ground's buildings (the base's own concerns, the card as the town root) | the history layer; each unit | F-SITE, F-PLAN (V03's), F-SITING |
| G6 | water classes `SiteWaterClasses.classify` | every unit's floor and ceiling; V13's governing surfaces, the water table and the classifier | `Unit.water`, `WorldSite.water`, `lifecycle.water`, `knowledge.discoverable`; `UnitEdge.passable` for submerged edges | none | the card | — (total) |
| G7 | condition `SiteCondition.apply` | the lifecycle event (a host status, a DM op, an epoch over an adopted site); `SiteLifecycleRow`; V06 §3.23's level; `SiteDamageRow`, V11's ranges for built elements | `lifecycle.*`; the closed units and opened breaches (`UnitEdge.passable`, new `breach` edges); the robbed elements; the occupant layer | `epoch.transform` keyed by (the card, the event's seq) for the ops V06's own draws admit (a collapse's choice among candidates) | the card | — (an event's product) |
| G8 | attachment `SiteAttach.attach` / `SiteAdopt.adopt` | the anchor's address and host; V04's dig generators; S10b for the surface exception; a settlement's placement over a site (adoption) | the access record; the anchor's `access`; `Assignment.site` (surface); `AdoptResult`, the re-addressed parts, the `worldSite` reservation | `site` keyed by (the card, `access`) for the dig's candidate choice | the card | F-SITE, F-EDIT |

The eager sequence on first open is G2 (re-run, so a changed host record or table reaches the programme), G3 where
the site has no placement yet, G4, G5, G6, G8 (a) for an attached site's access when the anchor has none; G7 runs on
events only; G1 runs only at creation and at `moveAnchor`. A stage whose inputs are empty commits nothing and reports
its zero counts; a degenerate result is refused by the kernel and handled on F-SITE's ladder (V14 §3.14), never by a
whole-site retry. A card whose document is unlinked (its file lost, its digest mismatched at open) is re-materialized
from the card alone — the same seed, the same request, the same context facts give the same document byte for byte
(V14 §3.15) — and reported.

**At every rung, and in no settlement at all.** A card may hang in a document of any rung, THORP to the cap, and in a
standalone neighbourhood document (V01 §3.10.1; its context then read at the `contextRung`), and a free-standing site
needs no settlement: its document stands on its own under V13's placement. The village product's hand-offs (V07 §3.12)
carry a settlement's cards and anchors unchanged in both directions.

### 3.2 G1 — Admissibility: the context, the edge of town, the table (item 134 (a))

**The context** of a clicked address (`SiteContext.of`) is decided by the first rule that holds, in this order, each a
read on the host document (no draw):
1. **`world`** — the address is in V13's regime with no settlement frame under it (V13 W0's extent; a frame's
   placement covers a point when V13's `Placement` maps the point inside the frame's rectangle).
2. **`urbanInside`** — the address names a storey of a building (`AnchorAddress` with `building` and `storey`: the
   click landed inside an open plan, V03 §4.5, or on a building with `storey` named).
3. **`urbanBelow`** — the address is on an `underground` part, or on a `site` part of an attached site (a site inside
   a site: admitted, its anchor on that unit).
4. **`urbanSky`** — the address is on a `sky` part (V05).
5. **`urbanSurface`** — the address is on the ground (part 0 or a raised part) and `pointLocate` on the ground's L1
   finds a face owned by a district whose kind is neither `hinterland`, `underground` nor `undercity` (V04 §3.2 N1's
   region `R`), or a `wall_strip`, square or gate-plaza face of such a district.
6. **`hinterlandNear`** — on the ground outside `R`, within `edge.nearM` of the **enclosure line**: the outermost
   enceinte's outer strip (`Enceinte.strips`, §2.7) where one exists, else S6's settlement perimeter (§4.5), by the
   rule's `edge.enclosure`; the plan distance to its nearest point by the ground's static index.
7. **`hinterlandFar`** — on the ground outside `R`, farther than `nearM` and within `farM`, and inside the frame.
8. **`country`** — beyond `farM` **inside** a frame (a point outside every frame is `world` by rule 1; C14-48).
A standalone neighbourhood document reads `urbanSurface` inside its outline and `hinterlandNear` outside it (V01
§3.10.1 gives it no enceinte). A site document's own ground reads `siteGround` for E3 and `country` for G1 (a site
inside a site's frame is a free-standing site of its own, J-V14.11).

**The table** is `SiteAdmissibilityRule` (V14 §2.5): the context's row lists the kinds admitted and the attachment
modes, the first mode the default. A `dropSite` whose kind the context does not admit is **bent** (J-VI.4) to the
nearest admitted kind of the same purpose — the kind row's `purposes` intersected, the first kind of the context's
row sharing one — and the bend named in the dry run (`bend.site.kind`; V09 §4.9's catalogue), or, where no kind shares
a purpose, refused `refuse.site.context` with the context's row listed (F-SITE's refusal rung). The attachment is
the row's default unless the request names another the row admits; inside a frame `free` is never admitted (the
mode class rule of V14 §2.5: level-only kinds `attached`, kinds with a ground policy `inFrame`, the markers `ground`;
J-V14.41) — one ground has one owner, so a site inside a settlement's frame is the settlement's content from the
drop (V14 §3.9 (g)). An `editTable` on
the rule re-reads nothing already placed: existing cards keep their context (a card is declared); the table governs
new drops and `moveAnchor` (V14 §4.2).

**The edge of town (the owner's "urban vs country").** `edge.nearM` and `farM` are the two distances; the enclosure
line is the one line both are measured from, so a town that builds a new ring moves its edge outward at the epoch
that founds it (V06 §3.7), and a card dropped in the old hinterland keeps its context — only new drops read the new
line. Reported in the card's reason record: the line read (which enceinte, or the perimeter), the distance in metres,
the row matched.

### 3.3 G2 — Request resolution: derive before invent, the programme, the vector (item 132 (g))

**A1 — The stated fields.** Every `SiteRequest` field the user set carries `source: 'stated'`; a field a host record
sets carries `'stated'` with `by: 'host'` (factTier `dossier`). A stated field is never overwritten by G2; where a
stated field is impossible in the context (a `floorsAbove` of 3 on `urbanBelow`) it is bent to the nearest lawful
value and the bend named (J-VI.4): `floorsAbove` to 0 below ground, `levelsBelow` to the geology's and the water's
cap (A2's rule), `footprint.polygon` clipped to the envelope the context admits.

**A2 — The derived fields (derive before invent).** Each unstated field is derived by the first rule of its row that
has an input, the rule's id written to `by`; a field no rule reaches takes the kind row's default with `source:
'default'`. No field is drawn but `age`'s band, and that only after every derivation fails.

| field | rule id | derived from |
|---|---|---|
| `purpose` | `purpose.host` | the host record's status word mapped by V14 §3.8's table (garrisoned → defence, worked → extraction, worshipped → worship) |
| | `purpose.context` | `urbanBelow` under a church-class building (V04 §3.5.1 (9)'s church-class rule) → `burial`; under a tavern, warehouse or merchant class → `storage`; off a sewer run → `concealment`; `country` within `roadControl` reach of a route (V13's term ≥ 0.5) → `defence` for a fort, `watch` for a tower |
| | `purpose.kind` | the kind row's first purpose |
| `sizePreset` | `size.host` | the host record's size word (`small`/`large` …) mapped to a preset |
| | `size.envelope` | the largest preset whose envelope (`units × envelopeM2PerUnit`) fits the context's available envelope (A3) |
| | `size.context` | `urbanInside`, `urbanBelow`, `urbanSky` → `small`; hinterland → `small`; `country`, `world` → `medium` |
| `floorsAbove` | `floors.context` | `urbanInside`, `urbanBelow`, `urbanSky` (attached) → 0; `urbanSurface` → the class row's storeys at the plot's band (`ClassRules.pick`, read through the assignment path) |
| | `floors.kind` | the kind row's default |
| `levelsBelow` | `levels.water` | the kind row's default, each level's floor at `datumCm − n × (ceilingCm + wallCm)` tested against the water table (V13's table; the base's §2.6 reading until it lands) less the damp margin: levels below it are cut unless `floodedLevel` is stated — "a site in wet ground has fewer levels" |
| | `levels.wet` | the kind row's default; on `soluble` geology (§2.3's `Terrain.geology`: `ordinary`, `soluble`, `volcanic`; V13's `impermeable` read as `ordinary`) + 1 for a cave or dungeon; on **wet ground** — the charter's biome `wetland`, or a `flood` or `damp` terrain class (§2.3's classes) under the envelope — − 1 (never below 0 but for a kind whose default is 0) (C14-23) |
| `footprint` | `shape.surface` | `urbanSurface` → the plot's ring the assignment path chooses (`polygon`) |
| | `shape.below` | `urbanBelow` under a building → the building's basement ring grown by `envelopeM2PerUnit × units` as an `irregular` outline round it; off a tunnel → `irregular` on the rock between the run's band and its neighbours; in a chamber → the chamber's outline |
| | `shape.kind` | the kind row's default |
| `terrain` | `terrain.kind` | a `fort` or `manor` on ground sloping ≥ 8 % across the envelope → `level`; a `fort` of purpose `defence` on flat damp ground → `moat`; a `cave` on a slope ≥ 30 % → `cliffFace`; else `none` |
| `owner` | `owner.host` | the host's owner or faction |
| | `owner.none` | null |
| `condition` | `condition.host` | the host's status word mapped (abandoned → `vacant`, ruined → `ruined`, destroyed → `ruined` with the lifecycle `destroyed`) |
| | `condition.ruinKind` | kind `ruin` → `ruined` |
| | `condition.age` | derived or stated `age` ≥ the kind row's `ageYears[1] × 0.5` and no host status → `vacant` |
| | `condition.kind` | the kind row's default |
| `age` | `age.host` | the host's founding or event year against the dossier's present (V08's history reading) |
| | `age.settlement` | an attached site: ≤ its host building's age (its lineage's build event, V06 §3.23 (1)'s weeks) or the settlement's `history.ageYears` (§7.7 DR37); taken as that bound × the kind row's band fraction |
| | `age.draw` | one uniform on `site` keyed by (the card, `age`), mapped into the kind row's band — the one draw, `source: 'default'` |
| `hiddenEntrance` | `hidden.secrecy` | `secrecy` `secret` → true; a `hideout` or `sewerLair` → true; else false |
| `floodedLevel` | `flooded.water` | the lowest level whose floor lies at or below the governing surface (G6's reading at resolution) → that level; else null |
| `envelopeM2` | `envelope.preset` | the preset's `units × envelopeM2PerUnit`, capped by A3 |
| `entrances` | `entrances.kind` | the kind row's default; a `hideout` 2 (one the bolt-hole) |
| `secrecy` | `secrecy.context` | `urbanBelow`, `urbanInside` → at least `discreet`; a `hideout` or `sewerLair` → `secret` |
| | `secrecy.kind` | the kind row's default |

**A3 — The available envelope** by context: `urbanInside` and `urbanBelow` under a building — the plot's area × 1.5,
centred on the building's basement ring (or its footprint with no basement), never crossing a neighbouring plot's
basement ring nor a foundation obstacle (V04 §3.5.0's `foundationObstacles`) by less than `surfaceClearCm` ÷ 2;
`urbanBelow` off a tunnel or in a chamber — the rock face of that part between the run's band and every other
element's band within the frame, by one static-index query, the envelope the largest axis-aligned rectangle of
`lir` inside it; `urbanSky` — the island's unbuilt land; `hinterlandNear` (attached) — the hinterland face clicked;
`hinterlandFar`, `country`, `world` (free) — unbounded but by the preset. An envelope smaller than the preset's need
steps the preset down (`vast` → `large` → … → `lair`) until it fits, reported `W_SITE_ENVELOPE_SHRUNK`; below `lair`'s
need the drop is refused with the room available (F-SITE).

**A4 — The programme.** G2 writes `SiteProgramme`: the policy (the kind row's, with `below` filtered to the
materializers the geology admits — `naturalCave` only on `soluble` or `volcanic` geology, `mine` only where V13's or
S1's resources give ore or stone within the envelope, `rockCut` and `builtLevel` on every geology value but
`rockCut` refused on wet ground (A2's reading; C14-23), `builtLevel` the fallback there); the grammar (`${kind}.${purpose}`, or the kind row's shared id); the history layers in the kind row's
`history` order, their count the target's `historicalLayers`, their ages spaced from `ageYears` down to 0 by the
layer events (geology at a natural layer `10 000` yr before the rest; construction at `ageYears`; use at
`ageYears × 0.8`; abandonment or damage at `ageYears × 0.3` where the condition is `vacant`, `damaged` or `ruined`;
reuse at `ageYears × 0.1` where `occupancy` is `occupied` on a `vacant`-derived condition; expansion at
`ageYears × 0.5` for `large` and `vast`); the envelope (A3's ring, or the footprint's shape fitted to `envelopeM2`:
a round envelope a 16-gon, a square its square, an oblong at the request's aspect, an irregular a 4-octave noise
outline of `EmbedRule.cave` at the envelope's mean radius); `storeys`; `entrances`; `water`; the surface exception's
`rooms` (V14 §3.9 G8 (c)). **The target vector** is the preset's vector with the request's `floorsAbove` →
`storeysAbove`, `levelsBelow` → `storeysBelow`, `entrances` → `entrances`, `hiddenEntrance` → `concealedShare` raised
to at least 0.1, `floodedLevel` → `floodedShare` set to the share of levels at or below it, and the condition's
`damage` left 0 (a reading). Every derived field writes one reason record (V14 §2.7).

### 3.4 G3 — Siting a free-standing site, the terrain pre-edit, the frame; a site as a destination

**(a) The placement (V13's).** A free-standing `dropSite` with a point takes that point as its placement origin and
the request's bearing (default: the approach side faces the nearest route, by V13's route field, else north); V13's
P1–P5 produce the `Placement` and the frame charter for the site's frame (V13 §3's placement, run for a
non-settlement frame as V13 §2's charter admits, V14 §1b.6). A drop **with no point** ("a fort somewhere on the
pass") runs V13's `SuitabilityScore.score` over the world document with this volume's `SuitabilityTerm` plug-ins (V14 §2.5:
each a pure function of V13's rasters, registered in V13 §1b.2's slot) weighted by `SitePurposeWeightRow` — the
row's weight multiplying each plug-in's value, a `hard` term's zero refusing the candidate — beside V13's own terms at
V13's weights; equal candidates are tie-broken by one draw on `site` keyed by (the card, `siting`) (V13's own
tie-break rule; no random term enters the score, C14-04); the best candidate is the placement, the top five kept in
the reason record as "the other sites considered" (V09's **Why here?** reads them). A host-placed site (its record's
position) is never re-sited. **Moving a site (C14-15)** is V13's `setPlacement` (or `placeFrame` / `unplaceFrame`)
with a `site` subject on the world document: every arena of the site stays byte-identical (bar 3), its charter is
marked stale by V13's stamp rule, a `worldWins` is the DM's explicit re-derive from S1 with carry-over, the
hinterland decoration, the world glyph and V13's W6/W7 re-run, and the card's `context` is re-read — a placement
that lands inside a settlement's frame adopts by V14 §3.9 (g)'s rule.

**(b) The terrain pre-edit (item 133 (f)).** Terrain shaping is a terrain edit run before siting's geometry: the
request's `terrain` becomes one `setField { field: 'terrain', stroke }` in the site document's creation prefix
(§7.4's read-ahead), dated "this happened" at the construction layer's year under V13 §4's first verb — `level`: a
`flattenTo` stroke over the envelope at the envelope's mean ground height; `raise` or `cut`: a Δ of `amountCm`
(≤ `EmbedRule.terrain.maxShapeCm`) with a cosine falloff over `radiusM` (default the envelope's radius + 10 m);
`moat`: a `cut` ring of `moatWidthM` round the envelope to `amountCm` (default 250), then V13's cascade fills it from
the nearest body whose level reaches it, else it stays a dry ditch (the classifier's `dry`); `cliffFace`: a `cut`
on the downhill side making a face ≥ `cliffMinCm`, the cave's mouth on it. The stroke's `water` is `locked`
(§7.1). The prefix event replays with the document, so the site's ground is byte-identical on every open.

**(c) The frame and its ground.** The site document's frame is V13's placement's rectangle: `max(envelope's radius ×
4, 120 m)` on a side for a site whose policy's `ground` is `hinterland`, the envelope's rectangle plus 20 m
otherwise, clamped to V13's frame limits. S1 runs on it under the charter (V13's edge elevation profiles, datum, water
edges, climate, water table, biome, resources: M5's one input record), giving the site's terrain and water; the
hinterland unit (S12a, S12b; §4.9) lays fields, tracks, woods and land use over the frame with the site's envelope as
its "settlement perimeter" (the envelope ring stands in for S6's perimeter; its outside sites are the kind row's
`buildings` with `arrangement` `cluster` where the policy names them outside the envelope, else none), so a tower
stands in its own closes and a fort in its glacis. Until V13 lands, a free-standing site document takes a flat charter
with the base's S1 defaults and reports it (V14 §1b.6).

**(d) A site as a destination (item 134 (c); C14-04).** Every free-standing site carries `attraction` (0–1) and
`routed` from its kind row (V14 §2.5's table; editable on the card): V13 W6's `site` term sums the `attraction` of
the sites within its `siteReachKm` into a settlement candidate's score, and W7 seats a `routed` site among the
route graph's seats, so a road is drawn to a fort or a mine as to a settlement. A hideout, a cave or a crypt has
`attraction` 0 and is unknown to siting. A settlement the host founds over a site's frame adopts it (V14 §3.9 G8
(e)): the site is older and so prior in the layout — its envelope becomes a `Reservation` of kind `worldSite` that S3
claims first, as a castle reserve does (§4.2 S3 (2), (8)), the village's houses then growing in front of or round it
(V07's siting reads the reservation as it reads a castle's); after adoption the site's gate is a `Destination` of kind
`worldSite` for S4's router inside the settlement's frame (BCR-V14-13's one remaining clause).

The relation runs both ways (item 134 (c)): a fort the settlement adopts is garrisoned by its institution row (the
settlement's roster places a garrison use in the fort's keep through S10b, the site's buildings being plots of the
settlement after adoption); a ruin the settlement adopts is **robbed for stone** — V06's salvage ledger credits its
elements as a cleared trace's (V06 §3.5's robbing) at every epoch the settlement builds, and when its last standing
element is robbed the site's lifecycle turns `cleared` with cause `rule:robbed`, its levels surviving as the ruin
beneath the village (V04's `buried` kind takes them: the settlement's U-SYS buried step adopts the site parts'
elements by `reusedBy`, V04 §3.5.5's form) — the owner's "robbed for stone and absorbed as the ruin beneath the
village".

### 3.5 G4 — Topology first: the unit graph by purpose (item 133 (g); J-V14.14)

The graph is built before any geometry, layer by layer in chronological order, each history layer expanding its own
grammar over the graph the earlier layers left, so the superposition (V14 §3.6 G5 (a)) is in the topology too.
`TopologyBuilder.build(programme, rng)`:

1. **Per layer, the axiom.** The first layer starts the graph with its grammar's `axiom` chain — roles in order,
   the first an `entrance`, consecutive units joined by the rule's edge kind (`door` built, `passage` carved or
   natural), each unit's `kind` the layer's, `layer` its ordinal, `level` 0. A later layer starts from the existing
   graph: its axiom's first unit attaches to the existing node of highest degree below `caps.maxDegree` (ties by
   key) by an edge of its first rule's kind — the builders came in through the cave; the squatters through the
   builders' door.
2. **The budget.** The layer's share of the target (`ProgrammeLayer.budget`: `units`, `loops`, `chokepoints`,
   `entrances`, `concealedShare`; the shares the kind row's `history` gives each event — construction 0.6, use 0.1,
   geology 0.6 for a natural first layer with construction then 0.3, expansion 0.3, reuse 0.1, abandonment and damage
   0, renormalised to 1 over the layers present — `calibratable: false`) bounds the expansion: `U_layer = max(round(units
   × share), the layer's axiom length)` — the axiom is the floor, so a `lair` hideout lays its six axiom units
   (C14-36).
3. **The expansion.** A frontier holds every node whose degree < `caps.maxDegree` and whose depth (BFS from the
   layer's first unit) < `caps.maxDepth`. While the layer's unit count < `U_layer` and the frontier is not empty: the
   node is the frontier's first in the order (role rank `hub` < `core` < `court` < `loop` < `chokepoint` < `entrance`
   < `cell` < `deadEnd` < `secret` < `passage` < `verticalLink` < `shaft` < `sump`, then depth ascending, then key);
   the admissible rules are those whose `lhs` is the node's role and whose `when` holds (`minUnits` ≤ the count,
   `maxDepth` ≥ the depth, `needsCore` matching whether a core exists, `purpose` containing the programme's); one is
   chosen by a weighted draw on `site` keyed by (the card, the layer, the node's key, the step); its `rhs` units are
   added as children with the rule's edges and the node leaves the frontier when its degree reaches the cap. A node
   with no admissible rule leaves the frontier. The draw is the only randomness of G4.
4. **The core.** Where the grammar's `core` role has not appeared by the time the count reaches `0.7 × U_layer`
   (or the frontier empties), the deepest frontier node (ties by key) expands by the rule whose `rhs` holds the core
   role, forced; a grammar with `core` `passage` (a camp, a battlefield) has none.
5. **Loops.** After expansion, loop edges are added until the layer's `loops` share is met: candidate pairs are nodes
   of the layer on the same level, both below the degree cap, at graph distance ≥ 3 and plan-independent (the
   embedding later tests adjacency; a pair whose faces end up non-adjacent takes a passage unit between them, G5);
   pairs in the order (distance descending, `loopsPerHub` not exceeded at either end, keys), each a `passage` edge.
6. **Chokepoints and the defensive depth.** The bridges of the passable graph on entrance-to-core paths are counted
   (one lowlink search); while fewer than the target's `chokepoints`, the edge of the shortest entrance-to-core path
   nearest the core that is not already a bridge is split by a `chokepoint` unit (its edges `door` for a built layer,
   `passage` narrow for carved or natural); while more, a loop edge is added round the bridge nearest the entrance
   (rule 5's candidates restricted to its two ends' neighbours). Then every entrance's shortest path to the core must
   carry ≥ `defensiveDepth` chokepoints or bridges: a path short of it takes chokepoint units as above, nearest the
   core first.
7. **Entrances.** The axiom gives one. Each further entrance (to the target's `entrances`) attaches an `entrance`
   unit by an `open` edge to the periphery node — a `deadEnd` or `loop` node at depth ≥ 2 farthest in graph distance
   from the first entrance, ties by key. With `hiddenEntrance` the last entrance's edge is a `secretDoor` and the unit's
   role `secret`; a `hideout`'s second entrance is always so (the bolt-hole).
8. **Concealment.** While the concealed share (V14 §2.2's measure, computed on the graph) is below the target's: the
   node of degree 2 at depth ≥ 2 whose subtree (away from the entrances) is nearest `(target − measured) × units` in
   size (ties by key) has its parent edge turned `secretDoor`, the subtree's units `knownTo` `secret`.
9. **Levels.** With `storeysBelow` > 0 or `storeysAbove` > 0 the nodes are stratified: `tree` grammars (a mine) put
   the shaft unit at level 0 and each drift subtree at the level its rule's `rhs` names (`shaft` → the next level
   down); every other shape takes the BFS depth bands — the nodes sorted by depth are cut into `storeysAbove +
   storeysBelow + 1` contiguous runs of near-equal size (the entrance's run the ground or the top storey by the kind:
   a tower is entered at the bottom and climbs, a crypt is entered at the top and descends, the kind row's `defaults`
   `floorsAbove` > 0 deciding which), each run one level or storey; an edge joining two runs becomes a `vertical`
   edge with a `VerticalLink` (G5 (g)). A level with no unit is dropped and the storey counts reported short.
   **The unit budget per level (C14-31; the survey's §4.7 and §6.1 (7)):** a run holding more than
   `EmbedRule.unit.maxPerLevel` units is cut into two contiguous runs at the BFS depth that halves it, joined by a
   `vertical` edge — one more `site` part, `storeysBelow` reported +1 as a bend (`bend.site.levels`) — so no
   embedding ever holds more units than the budget.
10. **The report.** `UnitGraph.expansions`, the per-layer counts and the graph's own vector (rules 5–8's measures) go
    to the card's report; one reason record per unit names the rule, the parent and the budget state.

**The shipped grammars** (`tables/sites/grammar.json`; own; each rule `lhs → rhs (edge) weight [when]`;
`caps` per grammar; `calibratable: false`):

* `fort.defence` — shape `concentric`; axiom `entrance → chokepoint (gatehouse) → court (outer ward) → chokepoint
  (inner gate) → court (inner ward) → core (keep)`; rules: `court → cell (barracks) (door) 3`, `court → cell (store)
  (door) 2`, `court → hub (hall) (door) 2 [needsCore]`, `court → loop (wall walk) (passage) 2`, `loop → chokepoint
  (tower) (door) 2`, `core → verticalLink (door) 1 [maxDepth 6]`, `verticalLink → cell (cellar) (passage) 2`,
  `cell → deadEnd (passage) 1`; caps `maxDegree` 5, `maxDepth` 8, `loopsPerHub` 1, `secretShare` [0, 0.1]; core `core`.
* `tower.solitude` — `axial`; axiom `entrance → hub (ground hall) → verticalLink → hub (upper) → core (the study)`;
  rules: `hub → cell (door) 2`, `hub → verticalLink (door) 1`, `verticalLink → hub (door) 2`, `core → secret (secretDoor)
  1 [purpose solitude]`, `verticalLink → cell (cellar) (passage) 1`; caps 4, 10, 0, [0, 0.2].
* `temple.worship` — `axial`; axiom `entrance → court (porch) → hub (nave) → core (sanctum)`; rules: `hub → cell
  (chapel) (door) 3`, `hub → cell (vestry) (door) 1`, `core → verticalLink (crypt stair) (door) 2`, `verticalLink → hub
  (crypt) (passage) 2`, `hub → loop (ambulatory) (passage) 1`, `cell (crypt bay) → cell (passage) 2`, `hub (crypt) →
  secret (reliquary) (secretDoor) 1`; caps 5, 7, 1, [0.05, 0.2]. `temple.burial` the same with the crypt rules'
  weights doubled and the sanctum rule halved.
* `mine.extraction` — `tree`; axiom `entrance (adit or head) → shaft`; rules: `shaft → hub (level landing) (vertical)
  3`, `hub → passage (drift) (passage) 4`, `passage → passage (passage) 3 [maxDepth 12]`, `passage → deadEnd (face)
  (passage) 3`, `passage → cell (stope) (passage) 2`, `hub → sump (passage) 1 [minUnits 8]`, `hub → shaft (vertical)
  1`; caps 4, 14, 0, [0, 0]; core `hub`.
* `cave.concealment` — `organic`; axiom `entrance (mouth) → passage → hub`; rules: `hub → passage (passage) 4`,
  `passage → hub (passage) 3`, `passage → deadEnd (passage) 2`, `hub → loop (passage) 2`, `hub → shaft (vertical) 1`,
  `shaft → hub (vertical) 2`, `hub → sump (passage) 1`, `hub → core (the great chamber) (passage) 1 [needsCore]`;
  caps 5, 12, 2, [0.1, 0.3]; core `core`.
* `hideout.concealment` — `approach`; axiom `entrance → chokepoint → passage → chokepoint → hub → core`; rules: `hub →
  cell (door) 3`, `core → secret (bolt-hole passage) (secretDoor) 1`, `secret → entrance (open) 1 [maxDepth 8]`,
  `passage → deadEnd (passage) 1`; caps 4, 9, 0, [0.2, 0.5]; core `core`.
* `crypt.burial` — `ring`; axiom `entrance (stair foot) → hub (aisle)`; rules: `hub → cell (bay) (open) 4`, `cell →
  cell (passage) 2 [maxDepth 4]`, `hub → core (the tomb) (door) 1 [needsCore]`, `hub → loop (ambulatory) (passage) 1`,
  `core → secret (secretDoor) 1`; caps 6, 5, 1, [0, 0.15].
* `cellarComplex.storage` — `cluster`; axiom `entrance (cellar stair) → hub`; rules: `hub → cell (door) 4`, `cell →
  cell (door) 2`, `hub → hub (passage) 1`, `cell → secret (strongroom) (secretDoor) 1`, `hub → verticalLink (door) 1
  [minUnits 6]`, `verticalLink → hub (passage) 1`; caps 5, 6, 1, [0.1, 0.3].
* `sewerLair.concealment` — `approach`; axiom `entrance (off the run) → chokepoint → hub → core`; rules: `hub → cell
  (passage) 3`, `hub → passage (passage) 1`, `passage → deadEnd (passage) 1`, `core → secret (secretDoor) 1`; caps 4, 6,
  0, [0.2, 0.5].
* `manor.dwelling` — `cluster`; axiom `entrance → court → core (hall)`; rules: `court → cell (barn, stable) (door) 3`,
  `core → cell (door) 3`, `cell → cell (door) 1`, `core → verticalLink (door) 1`, `verticalLink → cell (cellar)
  (passage) 2`; caps 5, 5, 1, [0, 0.1].
* `camp.dwelling` — `ring`; axiom `entrance → court`; rules: `court → cell (tent) (open) 6`, `court → entrance (open)
  1 [minUnits 4]`; caps 8, 2, 0, [0, 0]; core `court`.
* `dungeon.*` — the purpose's grammar per layer: a dungeon's layers run `cave.concealment` for a natural layer,
  `mine.extraction` for an extraction layer, `temple.burial` or `crypt.burial` for a burial layer, `fort.defence`
  for a defence layer, `hideout.concealment` for a reuse layer, each with its share of the budget (rule 2).
* `shrine`, `graveyard`, `watchpost`, `hermitage`, `bridgeFort`, `battlefield`, `guildhall`, `ruin`: the kind row names
  one of the above (`shrine` → `temple.worship` with `lair`; `graveyard` → `crypt.burial` below a `camp.dwelling`-like
  ring of plots above; `watchpost` → `tower.solitude` with `watch`; `hermitage` → `tower.solitude`; `bridgeFort` →
  `fort.defence`; `battlefield` → `camp.dwelling` with no cells; `guildhall` → `manor.dwelling`; `ruin` → the purpose
  it was, then `ruination`).

**Why grammars, and why topology first (J-V14.14 – J-V14.20).** A grammar as data gives every unit a programme role
and a reason (the rule), is editable like every table, and is budgeted by the target vector; the three structural
alternatives are rejected for structure: **binary space partition** and **room-and-corridor** place rooms by cutting
or packing space and only afterwards ask what each room is for, so a unit has no role and no reason but "the cut
fell here" (the plan programme's rule that every room has a role and a reason, V03 §3.2, holds below ground too);
**wave-function collapse** chooses each cell by local compatibility with no chain back to a purpose, so it cannot carry
a reason record (the world-fact contract's eighth field) and its result cannot be budgeted against a vector; each is
admitted as a **texture** only where V14 §3.6 names it (none in the shipped policies). Tactical analysis is a check
on the result (G5 (h)), never a generator, because a generator optimising sightlines would overwrite the purpose's
shape.

### 3.6 G5 — Embedding on the kernel: the history superposition, the materializers, the technique placement

**(a) The superposition (item 133 (g); J-V14.15).** The site is laid as its history layers in chronological order,
each layer by its kind's materializer over the geometry the earlier layers left, each run a `SiteHistoryLayer` with
its units: *geology* (`naturalCave`) → *construction* (`builtLevel`, `rockCut`, `mine`, and on the ground the
enclosure, the buildings and their plans) → *use* (the occupant furniture of the use, V03's furnishing on built
units; a carved unit's props by the use's row) → *abandonment* or *damage* (G7's transform at the layer's age, so
the card is first met in its condition) → *reuse* (an occupant layer: `builtLevel` partitions inside existing units,
`occupants` items) → *expansion* (the layer's grammar expanded from the graph's frontier, embedded in the rock left).
A built layer over a natural one keeps the cave's units as faces and carves the builders' rooms into the rock beside
them, joining by the graph's edges; a carved layer over a built one (a mine driven under a fort) tunnels beneath, its
level a new part. The classic dungeon is exactly this: cave, temple, use, abandonment, squatters.

**(b) The natural materializer `NaturalCave.lay`** (noise outlines; passages along the void's skeleton; J-V14.16). On
a `site` part at the level's elevation, over the envelope `E` (grown by `passage.wallCm × 4` as the rock margin):
1. **The outline field.** `f(p) = fbm(noiseStream(stream, EmbedRule.cave.shapeM, octaves), p)` over a lattice of
   `cave.passageSampleM` inside `E`, the stream on `site` keyed by (the card, the layer, `cave`); the void is
   `{ f ≥ threshold }` ∩ `E`, biased toward the graph's demand: the threshold is lowered by 0.08 within 2 m of each
   graph node's target point (step 2) and raised by 0.08 within the rock margin, so the cave's rooms fall where the
   graph wants them without the field being overwritten. An optional **cellular pre-pass** (`cave.cellular`, off
   by default) runs `passes` rounds of the birth/survive rule over the thresholded raster before the outline is
   taken — a texture, never the structure (the graph is), J-V14.16.
2. **Target points.** The graph's nodes of this layer are placed by the shape family `organic`: the entrance at the
   mouth — the point of `E`'s boundary nearest the approach side (a cliff face from the terrain pre-edit, the host
   element for an attached site, else the side facing the nearest route) — and the rest by a breadth-first spiral
   from it over a `hexLattice` of `(unit.minM2[role] ÷ π)^½ × 2` spacing with jitter `spacing ÷ 4`, each node taking
   the nearest free lattice point to its parent's at graph distance ≥ 1 cell, ties by key.
3. **Components to units.** The void's connected components (one flood on the raster) of area ≥ `cave.minChamberM2`
   become chamber candidates; each graph node of role `hub`, `core`, `loop`, `deadEnd`, `sump` or `cell` is matched to
   the candidate containing its target point, else to the nearest candidate within one spacing, else (no candidate) a
   chamber is **dug**: a disc of the role's `minM2` at the target point unioned into the void. Unmatched candidates
   become `deadEnd` units of this layer (the cave has more rooms than the graph asked; counted in the measured
   vector; the ladder trims them where `units` overshoots the tolerance).
4. **Passages along the skeleton.** The void's union is traced as rings (`sampleBoundary` at `passageSampleM`,
   Chaikin-smoothed `cave.smoothing` passes, `simplify` at `minEdge` with the chamber rings pinned), and its
   **medial axis** (`medialAxis(rings, stepCm)`, the kernel's) is taken; each graph edge of this layer between two
   matched chambers is realised as the medial-axis path between their centres (`astar` over the axis graph); an edge
   with no axis path (the chambers lie in different components) is **dug** as a passage band along the `astar` route
   over the hex lattice with rock cost 1 and void cost 0.2, its width `widthClass` `narrow` for a natural passage;
   the passage units are `passage` galleries. A `vertical` edge is a `shaft` or a `sump` (G5 (g)).
5. **Commit.** The level's `SiteLevel` record is minted first (C14-05): the `system` every `Chamber` and `Gallery`
   of the part names, the owner of the part's L0 rock face and margin ring. One L0 batch: the rock face (`E`'s ring)
   and the margin, owned by the level; one L1 batch: every chamber's ring as a `chamber_wall` chain owned by its
   `Chamber` record (V04's record; its kind `hall` where the chamber's area ≥ `hallBaseM2`'s V04 row, else
   `breakdown` — §2.7's existing cavern kinds, no new value, C14-27), every passage's centreline as a `passage` chain
   (the structural edge role BCR-V14-24 appends to §2.2 rule 7 — the tunnel role's twin on `site` parts, Part E bar
   1's new role; C14-29) owned by its `Gallery`; one L2 batch: `corridorUnion` over the part's L1 faces — the rock
   face owned by the level, so no face is unowned — with half-widths the site kernel's `SpineWidths` callback answers
   for `passage` chains (`passage.widthCm[widthClass] ÷ 2 + wallCm`; V14 §1.1), giving every passage its strips and
   every junction its wedge, the chambers' interiors as L2 faces; one L3 batch: each unit's face set `setOwner` to the
   `Unit`. Then the unit's **element set** (V14 §2.2's `UnitElement`s; C14-13) is derived from the committed geometry
   for G7's draw keys. Floors: the level's `elevationCm` plus a slope of ≤ `vertical.rampGrade` along the medial axis from the
   mouth (a cave falls inward), written per unit as `floorCm` (the unit's centroid's), `ceilingCm` from
   `unit.ceilingCm.natural` scaled by the chamber's area (√(area ÷ minM2), clamped).
6. **Formations.** Decoration instances (`caveFormation` elements, §8.10's instances per chamber on `render.instances`),
   a drawing only.

**(c) The rock-cut materializer `RockCut.lay`** (carved rooms; Voronoi bays; J-V14.17). Over the envelope on a `site`
part, by the shape family: `axial` — the spine is `E`'s OBB major axis (`obb`); the entrance unit at the end nearest
the approach side, the core at the far end, the axiom's chain spaced along the spine by their areas, each unit a
rectangle on the `rockCut.gridCm` module of area ≥ `unit.minM2[role]` and aspect ≤ `aspectMax`, its long side across
the spine; side units (the rules' children) alternate left and right of their parent, offset by one passage width;
`ring` — the hub is a disc or square at `E`'s centre, the bays are the **Voronoi cells** of seeds placed on a ring at
`rockCut.bayM` spacing round it (`voronoiEdges` over the seeds, clipped to `E` and to the hub's outline) — a crypt's
bays, a cistern's — with the core at the ring's far side; `approach` — a chain with a turn of ≥ 60° at every
chokepoint (the turn breaks sightlines; a tactical fact the grammar asked for), the bolt-hole a narrow passage from
the core to the envelope's far boundary; `cluster` — grown from the parent: each child unit a rectangle placed
adjacent to its parent's face on the side with the most free rock (the four sides tried in the order away from the
entrance, by `lir` of the free region), sized by its role. Passages are straight corridor bands between the units'
nearest sides (an L-route where a straight one crosses a unit, `astar` on the module grid), walls `passage.wallCm`.
Commit as (b) 5 with the chambers' kind `room` (§2.7's existing value; C14-27), the floors level per level.

**(d) The mine materializer `MineExcavate.lay`** (agent excavation over the geology; J-V14.18). Over the ore field
(V13's resources for a free-standing site, S1's `Terrain.mining` cells (§4.2 S1 (10)) inside a settlement's frame;
with neither, a synthetic lode: one `fbm` field on `site` keyed by (the card, `ore`) whose maximum stands at the
envelope's centre) on each level's part: the shaft unit at the entrance (a head-frame above ground on the ground part
for a vertical shaft; an adit at a cliff face for a `cliffFace` terrain); from the level's landing `mine.agents`
agents each walk `stepM` steps: at each step the heading turns by at most `turnMaxCdeg` toward the ore gradient with
probability `followOre` (a draw on `site` keyed by (the card, the level, the agent, the step)) else keeps straight,
stops at `driftMaxM`, at the envelope or when it meets an existing drift within one passage width (a junction, a
loop); the graph's `passage` units are matched to the drifts in walk order (the first drift the axiom's, the children
the next agents' or the branches), `cell` (stope) units are chambers of the role's area at the three highest ore
samples the drift passed, `deadEnd` units the faces where agents stopped, `sump` the lowest point; pillars every
`pillarSpacingM` along a stope are `pillar` elements (V14 §2.5's damage row) drawn by V04's quarry program (V04 §3.5.3's
room-and-pillar drawing, cited). The drifts are `passage` chains of `widthClass` `narrow`, commit as (b) 5, the
chambers' kind `workings` (§2.7's quarry kind, whose program draws the pillars; C14-27). Levels are joined by the shaft (G5 (g)).

**(e) The built materializer `BuiltLevel.lay` and the ground composition** (the plan programme generalized; J-V14.19).
Above ground a built layer is the base's and the volumes' own machinery on the site document's `ground` part, the
card as the town root: (1) the **enclosure** — `policy.enclosure` `wall` or `palisade` → `EnceinteStrategy.trace`
(§4.12) over the envelope ring as the boundary, the entrance units' points as its `GateSite`s (`forced: true`), no
reservations, the frame's terrain and water, policy `aroundAll`; a `fort`'s inner ward is a second trace over the
inner court's ring; its towers are the `loop` units' chokepoints (S7's furniture, §4.8); (2) the **plots** — the
envelope's L2 faces (one block per court unit) cut by S10 (§4.7) under the policy's arrangement with the court as
the open space; (3) the **buildings** — `SitePlanStrategy` (S11) places the policy's classes on those plots with
`PlacementSolver.place({ kind: 'generation' })`, the core unit's building first (the keep, the hall, the tower, the
temple), each unit of role `cell` or `hub` of this layer a building of its class; heights by `ClassRules.pick` with
`storeysAbove` as the main building's `floors` (an override, `editedPaths`-style, so a later S11 run keeps it); (4)
the **plans** — V03's `plan` on each building with the unit's role as the programme row's `for.use` (V03 §3.2 A1's
first match, the `rooms` the programme carries), basements `levelsBelow` deep where the kind's `below` is
`[builtLevel]` alone (a tower, a manor, a guildhall: the levels are V03's basement storeys, their count the request's,
through item 29 (b)'s basement gate with the gate's cap raised to the request by the override), and otherwise one
basement storey whose stair core is the `VerticalLink` down to the first `site` part (J-V14.21). After every storey's
cut the unit graph's edges above the datum are **re-read from the plan** (V14 §2.2's rule; C14-14): each opening
between two rooms that are units' geometries an edge of its kind, each stair core a `vertical` edge; the storeys'
entries of the vector are measured and reported, the goals holding on the gate chain and the levels (J-V14.48). Below ground a built
layer on a `site` part is (c)'s `axial` or `cluster` embedding with masonry walls (`passage.wallCm` 30, the chamber's
kind `storey` — §2.7's buried-town kind, drawn by V04 §5.2's `storey` program with the double wall stroke of its
`ruinMasonry` program where the layer is ruined; C14-27).

**(f) The ground composer `GroundComposer.lay`** — a free-standing site's frame under V13's charter (V14 §3.4 (c)):
S1 (terrain and water from the charter), the terrain pre-edit (G3 (b)), S12a and S12b with the envelope as the
perimeter, then (e); an attached site has no ground.

**(g) Vertical links.** Each `vertical` edge takes a `VerticalLink`: its kind by the layers of its two units —
built–built `stair` (V03's stair core where the upper unit is a V03 storey: the link references `AccessHead`, V03
§3.7.2, and the lower unit's `at` is the core's bay centre), carved `stair` where the rise ≤ `stairRunCm ÷ stairRiseCm
× the unit's long side` else `ladder`, natural `shaft` where the rise > 3 m else `ramp` at `rampGrade`, a mine's
`shaft` with a `ladder`, a `trapdoor` where the upper unit is a V03 room of a host building (an attached site's entrance
from a storey), a `well` where the upper unit is a yard. Its two ends stand within `linkReachM` in plan: the point of
the lower unit's wall nearest the upper unit's face (both `link_end` vertices on their kerb or wall, §2.2 rule 7),
both elevations the units' floors (M10). A link whose ends cannot be brought within reach takes a `passage` unit
on the lower level to close the gap (dug by (b) 4's `astar`), reported.

**(h) The close: the measured vector and the tactical check.** G5 measures `ComplexityVector` on the finished geometry
by V14 §2.2's rules and compares with the target under `vectorTolerance`: a miss on `units`, `loops`, `chokepoints`,
`entrances` or `defensiveDepth` re-runs G4's rules 5–7 on the graph with the geometry held (new loop edges are dug
as passages; a surplus deadEnd is dropped) up to `attempts` times; a miss on `openShare` or `concealedShare` adjusts
the next attempt's unit areas or secret edges; a miss that stands after the attempts is reported
`W_SITE_VECTOR_MISSED` with the entry and both values, never a whole-site retry. `TacticalCheck.run` then reads
cover (the floor area within 2 m of a sight-blocking edge), sightlines (the longest and mean unobstructed segment
through unit faces along passages), chokepoints, loops, dead ends and flanks and writes the `TacticalReport` beside
the vector for the panel and the clerk; it changes nothing (J-V14.20).

**The technique placement** (one table; the proposal's placements stated once, each a decision in V14 §9):

| need | technique | where | why (J-V14.n) |
|---|---|---|---|
| programme expansion | grammars as data | G4 | roles and reasons per unit; budgeted; editable (J-V14.14) |
| passages, centrelines | the straight skeleton (`skeleton`, spine use) and the medial axis (`medialAxis`) of the void | G5 (b) 4, (c) | the kernel's own, validated, deterministic (J-V14.16) |
| mines | agent excavation over the geology | G5 (d) | drifts follow what was dug for (J-V14.18) |
| caves | noise outlines (`fbm`), cellular automata as an optional raster pre-pass | G5 (b) | the coast's own routine's family (§4.2 S1 (2)); texture, never structure (J-V14.16) |
| crypt bays, cavern partitions | Voronoi (`voronoiEdges`) | G5 (c) `ring` | bays round an aisle are cells of their seeds (J-V14.17) |
| rooms above ground | the plan programme (V03), S11's site plans, S7's enceinte, S12a's hinterland | G5 (e), (f) | composition, no second generator (J-V14.6, J-V14.19) |
| ruination | V06's decay level and ops over the persisted plan | G7 | one plan, never redrawn (J-V14.24) |
| structure | binary space partition, room-and-corridor, wave-function collapse | **rejected** | no role, no reason chain, no budget (J-V14.14) |
| quality | tactical analysis | G5 (h) as a check | never a generator (J-V14.20) |

**The ladder (F-SITE; V14 §3.14).** A unit whose face falls below `0.8 × unit.minM2[role]`: (1) its neighbours'
areas shrink toward their minima by the module; (2) the envelope grows by `envelopeGrow` (≤ 2 ×) and the layer
re-embeds; (3) the unit is dropped (`deadEnd` and `loop` first, `cell` next, never an `entrance`, `chokepoint` on an
entrance path or the `core`) and the vector reported. A kernel refusal (`E_DEGENERATE` on a chamber ring, `E_LEVEL`,
`E_STRUCTURAL`) takes the same rungs on the refused unit. Every attempt is counted in `EmbedResult.attempts` and
keyed on the stream's `attempt` component (§6.1).

### 3.7 G6 — Water classification (V13's classifier; item 137 (f), (g))

For every unit G6 calls V13's water class test with the unit's `floorCm` (a range for a unit whose floor slopes,
sampled at `passageSampleM`), `ceilingCm` (the clear height; for a ruined built unit the standing height from the
damage layer, V03 §5.6; `openCeilingCm` for a court or open ground), and the governing surface V13 derives — the
site's water table from the charter or the host document's §2.6 reading, the surface of any body reached through a
passage whose floor lies below it, for an above-ground unit open water or a flood stage only, and the request's
`floodedLevel` as a `WaterSurface` of kind `site` with `body` the card and the level's units as its cells, dated at
the layer's week (V13's record; the V13 request of V14 §10.2, designed as granted; C14-58) — and stores the result
on the unit as returned (`WaterClassResult`, V13 §2.4) (its class,
governing surface, depth, thresholds, why); the site's aggregate (`WaterClassReport`: flooded share, submerged
share, lowest dry level, access state by the route class from each entrance) goes on the card, `lifecycle.water`
takes the aggregate's median class (V13's words; C14-37), `UnitEdge.passable` is false across a `submerged` unit, and `knowledge.discoverable` is
false while every entrance's route class is `diving` or `none` and no `secretDoor` edge from a dry unit admits (item
137 (g): submergence feeds discoverability). V13's connected-set walk (V13 §3.12.6) runs over `site` parts and `VerticalLink`s as over V04's elements (the same
request). G6 re-runs on every V13 cascade whose dirty set reaches the site's
governing surface (a sea-level rise, a dam, a DM's water edit under V13 §4's verbs) and on every G7 transform that
changes a unit's ceiling; it never changes an identity (bar 12). Until V13 lands, G6 reads the base's §2.6 water
table and classes a unit `dry` above it and `flooded` (swimming) at or below it, reported
`W_SITE_WATER_PROVISIONAL`.

### 3.8 G7 — Condition as a transform over a persisted plan; the lifecycle (item 134 (b))

**The rule.** A site's plan — its units' faces, walls, openings, V03's rooms, the cave's rings — is laid once by G5
and never redrawn by a change of condition. Condition is a **transform** read over it at the drawn week: V06
§3.23's `decayLevel` per lineage — each site building its own as V06 defines it; the card the lineage of its carved
and natural units through the V06 request of V14 §10.2 (C14-13): `decayLevel(doc, lineage: card, week)` over the
card's `WorldSiteLifecycle` events (`condition.since` the run's `A`), Works-less (V06 §3.23 (3)'s no-Works branch),
with `r` the unit's `SiteDamageRow.ratePerYear` by its material (rock 0.002, timber 0.05, masonry 0.01 per year) in
place of V11's walls rate, and `decayPeak` per element with `since` the element's layer's age — then V03 §5.6's one
comparison per element against its keyed threshold (§6.3's `plan.damage` draw keyed by the lineage and the
element's key: a carved or natural unit's elements are its derived `UnitElement`s, V14 §2.2, keyed by V14 §2.8's
element keys), with `SiteDamageRow`'s kinds beside V11's ranges for built elements. The driver is an event through the one-way flow — a host status change (V08's envelope
mapped by the table below), a DM's `siteState` conversion (V14 §4.3), or V06's epoch over an adopted site's parts —
never chance; a transient crop has nothing to evolve unless promoted. `SiteCondition.apply(doc, card, event)`:
1. **The transition.** `SiteLifecycleRow` (the shipped rows of V14 §2.5; C14-34) with `from` the card's `condition`
   (or `*`) and `to` the event's target, admitting the event's cause, gives the transform; no row → the event is
   refused `refuse.site.transition` with the rows admitted (a `destroyed` site is not `occupied` without `restore`).
2. **The level.** `occupy` and `vacate` write `occupancy` and run the occupant layer (below); `decay` starts a decay
   run at the event's week in `abandoned` (V06 §3.23 (1)'s `A` = the event's effective week, V06 §2.11); `ruin` starts
   it in `ruined` with `D` years already run (V06 §3.23 (4)'s default age, from the card's `ageYears × 0.3` where the
   history gives a damage layer); `destroy` sets `ruined` at level 1 and the lifecycle `destroyed`, leaves a ruin
   (every built element past its threshold: V06 §3.23's state floor at `ruined` is 2/3, so the drawing is a ruin; a
   free-standing site's ground gains a `ruin` decoration (§2.7's `Decoration` kind `ruin`) at the envelope's centre)
   and a record (the `LifecycleEvent` with cause and the host's or the DM's word); `clear` sets `cleared` (the stone
   gone: V06's salvage ledger credited, the elements drawn as traces as a cleared building's L4 face is, §2.8);
   `restore` lowers the level by V06 §3.23 (3)'s repair Works from the event's week (a hand restore with no Works:
   0 at once, the patches drawn in patch material).
3. **Collapses close units; breaches open connections** (proposal §6). At each level the elements past their
   threshold are read: a `SiteDamageRow` whose `closes` holds makes its unit impassable (`UnitEdge.passable` false on
   every edge into it; a `collapse` of a `rockCeiling` or `builtVault`, every `pillar`, `shoring`); a `rockWall`
   `breach` opens a new `breach` edge to the nearest unit whose face lies within `passage.wallCm × 3` of the breached
   wall segment (the segment the threshold draw picks: the unit's wall segments ranked by the `plan.damage` draw,
   the first past the threshold), joining two units the builders never joined — the classic dungeon's "a wall has
   fallen through into the old cave"; a `rockFloor` pit adds the `pit` hazard; a `stairFlight` rubble keeps the
   vertical link passable (climbable rubble, V04 §5.6 (3)). The closures and openings are written as `UnitEdge`
   changes in the event's commit (so the graph's measures and the VTT portals follow) and reversed by its undo; the
   faces, walls and ids are untouched.
4. **Stone is robbed.** A `ruined` or `cleared` site within V06's robbing reach of a settlement that builds (an
   adopted site, or a free-standing site within `edge.farM` of a settlement's frame whose epoch runs) credits V06's
   salvage ledger as a cleared trace does and its built elements above ground take V06's robbed drawing; the
   underground's elements are never robbed (rock is not stone to carry).
5. **The occupant layer.** `occupy` with `policy.occupants` lays one more history layer (`reuse`): barricades at the
   chokepoints (a `TransientItem`-shaped record persisted as an `occupant` element of the unit, kind `barricade`), a
   camp in the core (`camp`, `fire`), the use's furniture in built units by V03's F3 over the occupying use's row
   (the host's or the DM's named occupant kind → a class row: a garrison `barracks`, bandits `hideout`, a cult
   `shrine`), `LightSource`s by §4.7's light table on the occupied units (host `chamber`); `vacate` ends the layer
   (its items leave, the furniture breaks by the decay run). The occupancy abstraction (V14 §2.4's
   `OccupancySummary`) gives the moment's headcount band from the occupant kind's row; never individuals.
6. **Authored edits survive every state** because the plan beneath is untouched (item 134 (b); J-V14.24): a locked
   wall, a moved door, a renamed unit keep through every transform, and `restore` draws them again whole.

**The host's words → causes and transitions** (V08's envelope; `calibratable: false`; a word with no row reads
`none`, reported `unmapped_word` as V08 does):

| host status word (V08's adapter normalises it) | lifecycle change | transform |
|---|---|---|
| founded, built, raised | `materialized` generated; `condition` pristine | none |
| garrisoned, worked, inhabited, worshipped, held | `occupancy` active, `occupied` | occupy |
| abandoned, deserted, emptied | `occupancy` vacant; `condition` vacant | decay |
| damaged, breached, burned, flooded | `condition` damaged | decay at V06's `decayed` third; `burn` on the buildings (V06 §2.8) for burned; G6 for flooded |
| ruined, fallen | `condition` ruined | ruin |
| destroyed, razed, sacked | `condition` destroyed | destroy |
| cleared, demolished, quarried | `condition` cleared | clear |
| restored, rebuilt, reoccupied | `condition` restored → pristine | restore (then occupy where the word implies it) |
| expanded, enlarged | `shape` expanded | a programme edit: `sizePreset` one step up, G4–G5 on the expansion layer |
| repurposed, converted | `shape` repurposed; `purpose` changed | a programme edit: the purpose's grammar on a reuse layer |

**The host building's fate reaches an attached site (item 134 (b); C14-32; cause `rule:host`).** A card hangs on a
building, a tunnel or a chamber whose own lifecycle moves — by V06's epoch, a hazard or a hand conversion — and the
site follows: the host building enters a decay run (`abandoned`, `decayed`, `ruined`) → `vacate` on every card
anchored in it (its occupants leave; the site's own condition is untouched); the host is `cleared` or `demolished`
→ the access reads `collapsed` (II.7.4's derived reading while its head has no host) and the anchor re-hosts to the
trace's face (V14 §2.9's anchor row), the icon drawing on the ground at that face; a successor building raised on
the trace (§6.3's succession) re-heads the access by V14 §3.9 (a)'s rule in the successor's lowest storey, the
anchor's storey bent to it and named; a host tunnel or chamber `sealed`, `collapsed` or `flooded` (II.6's conditions)
→ the access reads the element's closure. Each is a `LifecycleEvent` on the card with cause `rule:host` and the
host's event in `detail`; V14 §4.7's row names the locality.

A card's `lifecycleBase.existence` (§2.8's `Existence`) mirrors the condition for every base reader: pristine and
occupied → `built`, vacant → `abandoned`, damaged → `decayed`, ruined and destroyed → `ruined`, cleared → `cleared`,
restored → `altered`.

### 3.9 G8 — Attachment: the access record, the anchor, the surface exception, the icon's record, adoption

**(a) The one access record (item 133 (b)).** An attached site has exactly one `AccessPoint` of source `site` in
the host document, dug by `SiteAttach.attach` from the anchor to the site's entrance unit: its `ground` is the
anchor's host with `ground.storey` the anchor's storey (BCR-V14-2) — **the head rule (C14-02; J-V14.45; the V03
request of V14 §10.2):** a `site`-sourced access heads **on its anchor's storey**, a `hatch` in that room's floor
(II.7.4's kind; the link's word `trapdoor`, C14-35) or a concealed `door` in the room's wall (V03 §3.7.3's secret
head form), and its descent to the building's lowest storey is a V03 stair core of kind `secret` the plan places
like any core (V03 §3.3's stair kinds), the storeys it crosses re-cut by V03 §3.11, ending at the ordinary head on
the lowest storey (V03 §3.7.2) where the `SiteReach` begins; every storey between goes stale (item 28's inputs). The
head's storey count is written to `requestedVsBuilt`; a building whose secret core cannot be placed bends the anchor
to the lowest storey, named (`bend.site.storey`), never refused. A tunnel or chamber host → a `door` in its wall at
the anchor's `at`, the kerb vertex by `placeAccess`'s rule (V04 §4.1); a ground face → a `stair`, `shaft` or `hatch`
by II.7.3's kinds; an island's yard → a `stair`. Its `under` is the `SiteReach` naming the entrance unit, its
`access_point` vertex on that unit's wall in the site document and the unit's `floorCm` (C14-24); its kind the
vertical link's (G5 (g)); its `state` `open` (or `locked` where the request's secrecy is `secret`); its stored
`knownTo` by the request's secrecy (`open` → the host's `public`/`local` by II.7.4's rule, `discreet` → `local`,
`secret` → `secret`), read by every reader through `effectiveKnownTo` (V14 §2.3; C14-18); its `cause` `{ rule:
'site', system: the card, event: the seq }`. It is never a `HoodPlace` and never enters V01's opening pass or V04's
excavation reading (C14-33). The dig itself is V04 §3.8's generators where the way in needs a
connector (an anchor on a storey whose site lies under the next building: the connector is a passage unit of the
site document's first level, not a `dug` system of the host — the host document gains no geometry, J-V14.10). With
no admissible head (a room too small for an opening, a tunnel wall with no free kerb stretch of `moduleCm × 2`) the
anchor is bent to the nearest admissible point of the same context within 5 m, the bend named, else the access is
left unmade and reported `W_SITE_NO_ACCESS` (the site stays reachable to the DM through its icon).

**(b) The anchor.** `dropSite` writes the `SiteAnchor` at the clicked address (V14 §2.3's `AnchorAddress` by the
context of G1), its `at` the click snapped to the host face's interior, its `secret` `dmOnly` with cause the event,
its `knownTo` `secret`. The icon is its rendering (V14 §5.1), map furniture over a canonical anchor: nothing else in
the host document changes (bar 6: nothing outside the dirty set reshuffles).

**(c) The surface exception (item 133 (c)).** An `urbanSurface` drop takes the `surface` attachment: the dry run
expands `dropSite` into an `assign` (§7.7; `Assignment` with `granularity: 'building'`, the kind row's
`buildingClass`, `criteria` from the request's purpose and the click as its locus, and `Assignment.site` naming the
card, BCR-V14-12) placed by S10b's solver at the event's position as any positive placement (§4.7 S10b; `placeAt` with
`from` the click, item 20 (g)) — a building on a plot, its massing by V02 with `storeysAbove` as its floors, its
basement `levelsBelow` deep by the override of (e) 4, its plan by V03 with the site programme's `rooms` **riding as
the building's programme**: V03 §3.2 A1's resolution reads `Assignment.site` first — the card's `programme.rooms`
(the grammar's units mapped to `ProgramRoom`s: `core` → the class row's main room, `cell` → its named rooms, `hub` →
`hall`, `secret` → a concealed room by V03's concealed rule, `verticalLink` → the stair core) — before its class-id
rows. The card's `building` names the building and its units' geometry references V03's rooms (`Unit.geometry.room`).
**One rule for the document (C14-26):** a `surface` card's `document` is present exactly when a level beyond item
29 (b)'s basement gate's cap exists — then the lowest basement storey hosts the anchor (`AnchorAddress` with the
building and that storey) and the access (a `hatch` head by (a)), the card's `attachment` reads `surface` with
`anchor` set, and the levels are an attached document's `site` parts; otherwise the site is the building and the
card has no document. The city's plots move by the
placement only as any assignment moves them (§7.3 item 8's disruption budget).

**(d) The icon's record** is the anchor; a free-standing site's world glyph is a `SettlementGlyph`-shaped record made
by V13 W9's commit hook from the card (level 0 the kind's glyph as a dot, level 2 the envelope's outline and its
enclosure; `sourceDigest` the site document's; the V13 request of V14 §10.2; C14-53), and an `inFrame` site inside a
settlement's frame carries a `Decoration` of kind `worldSite` on its reservation's face (§2.7's `Decoration`, point
form) that V01's and the base's ground drawing carry at every band, so the hinterland shows the site at the city
band (C14-50).

**(e) Adoption (item 134 (d)).** When a settlement is placed over a free-standing site's frame — V13's P1–P5 for a
host-founded settlement, or a hand `adoptSite` — `SiteAdopt.adopt(settlement, site, placement)`: (1) **the ground, as drawn constraints (C14-16).** At a host-founded
settlement the site's enclosure (as `drawWall` strokes with its kind), its buildings (`drawFootprint` with class and
heights), its plots, its ways and its terrain pre-edit (`setField`, dated) enter the settlement's creation prefix
as **drawn constraints** (§7.2; V13's `charter.sites` row names them so), locked and pinned, keyed by the site's
tokens (the mapping in `AdoptResult.addresses`, the namespace rewritten to the settlement's, V14 §2.8); the envelope
is the `worldSite` reservation (BCR-V14-13) S3 claims first, as the castle reserve; the site's hinterland land use is
**not** carried (the settlement's S12a lays its own round the reservation); the settlement's S1 runs under the
settlement's charter with the site's pre-edit re-applied on it. A hand `adoptSite` over an existing settlement
applies the same list by §7.3's reservation operator and the drawn constraints' local re-derivation ("rebuild around
my drawings" over the reservation's faces and the blocks they touch). (2) Every `site` part becomes a `site` part of
the settlement document by its `nextSitePart`, addresses re-prefixed and re-namespaced, every lock, pin, assignment
and edit mapped (§7.5's address mapping; bar 7); (3) the card moves into the settlement's entities block with `attachment` `free`
still and `placement` the settlement's (its origin relative to the settlement's frame); the site document is
retired (its `docId` recorded on the card as `adoptedFrom`); (4) V04's U-ACCESS at the settlement's tail reads the
site parts as any part for links and the excavation reading (a site's units start `accessible` through the site's
own entrances); (5) V06's epochs run over the site's parts as over the settlement's (its buildings in the strike
pool, its ruin robbed, G7's transforms on its lifecycle events); (6) the `AdoptResult` lists every mapping and the
kept locks. The reverse never happens by rule: a settlement that dies leaves its sites adopted in its document, their
history the settlement's (V06's replay keeps them).

**(f) Sites seed settlements (item 134 (c)).** V13's W6 reads every free-standing site as a destination (G3 (d));
a settlement founded there adopts it by (e); a thorp "in front of or surrounding an abandoned or occupied fort" is
V07's village placed by V13 with the fort's reservation claimed first, its tofts growing outside the fort's glacis
(V07 §3's siting reads the reservation), the fort's keep an institution of the village's roster where the host
garrisons it (the card's `host.status`), else a ruin the village robs (G7 (4)).

**(g) `inFrame` — adoption at the drop (C14-01; J-V14.41).** A site with a ground policy dropped inside a
settlement's frame (`hinterlandNear`, `hinterlandFar`, an island) is the settlement's content from the drop: the card
lives in the host document (`attachment` `inFrame`, no site document, no placement); its envelope — the request's
footprint fitted at the click on the hinterland or island faces — becomes a `Reservation` of kind `worldSite` claimed
by §7.3's reservation operator (the row V14 §4.5 uses), its context faces the reservation's and the blocks they touch;
G5 (e) runs on the host's `ground` part 0 inside the reservation with the card as the town root — S7's trace over the
envelope ring with the entrance units as gates, S10/S11 on the reservation's faces, V03's plans — and its levels are
`site` parts of the host document by the host's `nextSitePart`, each with its `SiteLevel`; the hinterland unit is not
run (the host's S12a fields stand, re-derived locally round the reservation by §7.3's S12 row); V04's tail reads its
parts as adopted parts (SC2; BCR-V14-11); V06's epochs run over its buildings and G7 over its lifecycle with cause
`epoch`; its icon is the `worldSite` decoration on the reservation's face (d). A free site never stands inside a
frame: a `setPlacement` that moves one inside a frame adopts it by G8 (e) (C14-15).

**(h) `ground` — a marker-like card on a ground face (C14-09; J-V14.46).** `camp`, `battlefield` and `graveyard`
dropped or promoted on any ground context take `attachment` `ground`: the anchor on the ground face (`AnchorAddress`'s
ground form), the occupant layer's items persisted as `occupant` elements hosted on that face (a point set as a
`Decoration`'s, moving with the face under a warp), the lifecycle and the knowledge as any card's, no site document,
no levels, no reservation and no access record — the fight's debris, the graves, the tents. When a later
`setSiteRequest` asks for levels or buildings the card becomes `inFrame` (inside a frame) or `attached` (the graves'
crypt below) by (g) and (a), the items kept.

### 3.10 E1 — Resolve the address: one operation with the discard policy (item 132 (a), (b))

`PlatApi.encounter.open(h, address)` (BCR-V14-25; C14-07) runs in the generation worker on the DM's click (V09's
T6 `place` **Encounter here**, on any layer and inside an open plan, through `EncounterService` in `@plat/app`) and
on the clerk's `useTool`. It is a **view operation**: it writes no event, no record and no digest; its products live
in §2.9's view keys, the elaboration cache (V03's plans and the encounter's **memo**) and §3.4's transient arena.
**The memo (C14-20).** The open `Encounter` is memoised per address in the elaboration cache (never canonical, §2.9),
so a re-open at the same head returns it without re-resolving; it is invalidated by any commit of its document and
by V13's cascade whose dirty set reaches its rectangle (V13 §3.14.2 step 5's "V14's E3 cache"; one row in V14
§4.7), and every VTT scene the crop exports carries `waterStamp` (V14 §2.4) so a re-export after a cascade differs
exactly there ("VTT scene stamps").
1. **The key.** `EncounterAddress` = the document, the arena (`PlatKey`, a site level, or V13's world), the point, the
   open plan's `storey` where the click lies inside one, the drawn `depthBand` on Below, the drawn `week` (§2.9) and
   the document's `logHead`. The same key gives the same encounter on every machine (V14 §3.15); the week is the
   time in the key and there is no hour (item 136 (a)).
2. **The context** is G1's `SiteContext.of` on the same address (V14 §3.2) with the E3 profiles' finer matches
   (`ProfileMatch`): a corner, a bend, a straight, a square, a gate, a bridge, a quay, a yard, a place, an interior, a
   sewer junction or run, a chamber or gallery of any system, a landing, a field, a creek, a road, a wood, a shore,
   a site level or ground, or `open`.
3. **The resolved set.** By one static-index query of the crop's rectangle (E3 sizes it first from the profile's
   `sideM` midpoint, then E3 refines): every layer and part present under the rectangle (`EncounterCrop.scenes`), the
   buildings whose footprint intersects it, the underground elements of the drawn band (and, on the ground, the
   elements whose ceiling lies within `surfaceClearCm` of the ground, so a cellar fight can open a sewer), the named
   places and institutions, a site's units where the click lies in a site document.
4. **The world case (item 132 (e); C14-08; J-V14.44).** A `world` context reads V13's facts at the point — terrain
   class, biome, the route or river within the rectangle, the territory, and the events V13's world document indexes
   near the point within `CropRule.recentEventWeeks` — and the profile from `road`, `creek`, `wood`, `shore` or
   `open`. Its ground is a **crop frame**: a transient materialization on the crop's owner-less transient arena
   (E4's, keyed by the address) of (i) V13's `charterFor(world, placement)` at a transient placement at the clicked
   point — a 100 m frame, no settlement, no `Placement` recorded (the V13 request of V14 §10.2; the form
   `WorldPort.charter` nearly gives) —, (ii) S1's terrain and water under that charter (the DEM, the water surfaces
   and the river reaches the charter carries, refined by S1's resolution rule — item 135 (c): the coarse fact, the
   position and the seed, so two adjacent crops agree at their shared edge), (iii) the charter's `roads` as way bands
   of their class (`corridorUnion` over the route's polyline at its class width), (iv) S12a's land use over the frame
   (the biome's cover: wood, scrub, pasture, marsh; no tofts, no fields unless a route's verge row says so), all as
   `fixed` faces of the arena (E4 (a)) so `line_of_sight` (cliffs, the river's banks as water faces), the road band,
   the water face and the VTT scene exist; never persisted, released with the encounter. "Generic" means only that
   nothing named exists there yet: a recent battle adds E4's derived items (corpses, debris, wagons); a camp a
   settlement's host reports adds a camp. Its budget is V14 §6's crop-frame row. Until V13 lands the world click is
   refused `refuse.encounter.noWorld` (V14 §1b.6).
5. **Nothing is written.** The one-way flow holds (item 132 (h)): the DM commits an outcome in the host, a world
   event changes a fact, the map rematerializes locally; the encounter never writes into the world.

### 3.11 E2 — Complete: interiors and the occupancy abstraction (item 132 (c); J-V14.4)

In town nothing nearby is generated, only completed. The buildings in the crop are the buildings the town has; their
interiors are the plan rung's.
* **(a) Interiors.** For each building in the resolved set, nearest the crop's centre first, up to
  `CropRule.maxBuildings`: the building's `wings`, `rooms` and `plan` rungs are derived into the elaboration cache
  where absent or stale (§4.1's lazy contract; V03 §4.5's click path without moving the view), deterministic from
  the seed (V03 §3.10), so the tavern's common room is the same room at every opening. The `maxBuildings` beyond
  draw as shells (their footprints and entrances, V02's massing) with `W_CROP_INCOMPLETE` in the crop's notice,
  completed as the DM clicks them. A stored (edited) plan is used as stored. A building in a decay run draws its
  damage (V03 §5.6) — the damaged plan is the one the fight happens in. The underground elements draw as V04 §5.2
  draws them; a site's units as V14 §5.2.
* **(b) The occupancy abstraction.** For each completed building and each underground dwelling or occupied unit,
  `Occupancy.summarize` reads the `OccupancyRow` for its kind of presence: one **part** per presence the building has (C14-40): `households` × `perHousehold`
  for its households (§2.6's `Building.households`), and per use `perCapacity` × the row's count — patrons 0.4 × the
  use's capacity (V11's class capacity row), staff 0.15 × its workers, a congregation 0.1 × the church class's
  coverage unit at the plot (V11 §2.3's `cov/<class>`), a garrison 0.6 × `WorldSiteHost.strength` (the V08 request's
  row) else the barracks class's capacity (C14-44) —, an occupied site unit's `occupants` by G7 (5)'s kind; the week's
  `seasonal` multipliers (a festival week ×1.5 on patrons and congregation, winter ×0.8 on patrons, a market week ×1.3
  on patrons — a market week being the market's own weeks, DR43's festival window's twin — read from §2.9's `week` and
  the festival display, never an hour); each part's headcount range is `[round(0.5 × n), round(1.5 × n)]`, the
  summary's the sum, and the band the row's over the sum. It is **never individuals**: §10.3's people, their schedules and their
  names are not read (J-V14.4) — the DM decides who is there. The summary draws as one mark per
  `occupancyMarkM2` of the room's area (V14 §5.3) and is written into the scene's `plat` note, never as tokens.
* **(c) Lights.** Every `LightSource` lit at the drawn week and every room whose `lit` holds by its role or an edit
  (V03 §5.6) exports as a fixture (item 136 (a)) — §11.1's `lights` clause as BCR-V14-23 rewrites it, with no hour
  (C14-19); the crop's picture draws the day look of the sheet (§8.4's global light at the fixed sun) unless the
  viewer's `light` key says `night`; a `light` key of `time` is read as `day` by the crop's picture and export, the
  bend named (`bend.encounter.noHour`); neither is a parameter of the encounter, and the lights set is a pure
  function of the week (T-V14-3).

### 3.12 E3 — The extent by table, the crop, the stable grid origin (item 132 (d); item 136 (b))

1. **The profile.** The first `EncounterExtentRow` whose `match` holds and whose `context` admits the address
   (V14 §2.5's order) is the profile.
2. **The centre.** `click`: the point; `placeCentre`: the place's or institution's footprint centroid (a square's
   face centroid, a gate's plaza centroid, a bridge's deck midpoint, a landing's yard centroid, a site's envelope
   centroid); `junction`: the nearest junction vertex; `chamberCentre`: the chamber's pole of inaccessibility.
3. **The side.** `s = clamp(sideM[0] + (sideM[1] − sideM[0]) × fill, sideM)` where `fill` is the share of the
   profile's `include` set's extent — the whole place with its frontages, the junction's arms to their next
   junctions, the chamber set (the chamber and every chamber or gallery joined to it within one passage), both
   banks within 25 m — that the minimum side would not cover, 0 when the minimum covers it, 1 when the maximum does
   not; so a small tavern takes 45 m and a great inn with its yard 70 m. A side beyond `sideM[1]` is clamped and
   `W_CROP_EXTENT_CLAMPED` reported (the include set is cut at the edge, the fight spills off the map — the DM
   re-clicks).
4. **The rectangle** is the square of side `s` centred on the centre, axis-aligned with the arena, **snapped outward
   to whole grid cells** on the world grid (5); the canonical geometry never snaps (proposal §8; J-V14.5).
5. **The stable grid origin (item 136 (b); J-V14.7).** The tactical grid is the **world grid**: cells of `gridCm` =
   `StyleSheet.vtt.squareM` × 100 (1.5 m by default — the document's style field, set by the export dialog's
   "remember" as a `setStyle`, read by the overlay and the export's default `vtt.squareM` alike, so the grid exists
   before any export is requested (C14-39); the proposal's 152 cm is five feet, which the base's 1.5 m rounds — 1 or
   1.5 is the one choice; changing it re-snaps every open crop's rectangle, a view) with its origin at the arena's
   origin (0, 0) (§2.1: the frame's centre; for a site document its own frame's centre; for V13's regime the world's
   origin in metres), so every cell's corner is a multiple of `gridCm` in the arena's coordinates. The crop's origin
   is its south-west corner, which lies on that grid by (4). It depends on the address alone — not on the viewer, the
   window, the zoom or the time — so re-exporting the same crop keeps every token's cell, and two crops of one
   document side by side share their cells edge to edge (T-V14-11). A storey scene of a building in the crop uses the
   same grid; a deck scene (§11.1's per-raised-way) and an underground band scene likewise. The grid is a display
   overlay (§9.5's grid furniture, kind `square`, `skip water` off, colour role `grid`) and an export fact
   (`resolution.map_origin` = the crop's origin in grid units from the arena's origin, `map_size` = `cols × rows`);
   the model has no grid.
6. **The scenes.** The profile's `scenes` resolved over the resolved set: `ground` the arena's part(s) under the
   rectangle (a raised part adds a `deck` scene), `storeys` one per storey of each completed building (the storey
   under the click first), `band` the drawn depth band, `level` the site level, each a member of `EncounterCrop.scenes`
   in §11.1's forms with its **ordinal** — 0 the ground, then each storey or level in elevation order, the file
   suffix of the multi-floor convention (V14 §5.3; C14-06) — capped at `CropRule.maxScenes` (the nearest first; the
   rest named in the dialog).
7. **The water (C14-21).** E3 reads V13's `classifyWater` for every unit, plot and street face of the resolved set
   and `routeClass` over the crop's ways (V13 §3.13.3) at the key's week into `Encounter.water` (V14 §2.4): a flooded
   face's class and depth, a submerged interior, the wading and swimming routes; the crop view and the export draw
   and write them as V14 §5.3 states.

### 3.13 E4 — The transient layer on a transient arena; promotion (item 132 (a); J-V14.2)

**(a) The arena (C14-07).** The crop opens one `transientArena` (§3.4) in the generation worker with **no owner
document** (BCR-V14-4; K9): its `TransientKey.owner` is an `Id` of the form `view:<the encounter key's hash64>` —
no entity, no kernel type change —, its **seed one ring, the crop's rectangle** (§3.4 refuses a seed with holes), its
**`fixed` rings every footprint, water face and underground element face of the resolved set clipped to the
rectangle, each owned by its entity** (§3.4's form: faces made before any cut and never cut by one, each inside the
one seed ring; a world crop's frame faces the same way, E1 (4)). The DM's and the derived items enter through the
face partitioners only — a closed-ring item (a camp, a fire, a pool) by `splitFace` on the rectangle's free face, a
strip item (a barricade, a cart, a wagon) by `partition` of that face — never by `insertChain`; a ring the kernel
refuses (`E_DEGENERATE` `overlap`, a ring crossing a fixed face) is simplified at `minEdge` and re-tried once, then
the item is drawn only (not hit-tested), reported. So line of sight, the hit stack and the export read the items
with the model's faces by one `pointLocate` on the arena. It lives while the encounter does — released by
`encounter.close`, never at a derivation call's end (BCR-V14-4's lifetime rule) — and nothing on it is persisted,
digested or frozen (§3.4's rule); the model's own arenas are read, never written.

**(b) Derived items** (never random; keyed by the address): for each crisis look standing in the view at the
week (§2.9's `crises`, DR44, V08) whose look kind has a `CropRule.lookItems` row, items of the row's kind at `perHa` ×
the crop's area, placed by the row's `where` — `gates`: at the gate units in the crop; `streets`: along the way
corridors at even stations; `edges`: along the crop's boundary inside the look's area; `hosts`: on the look's host
faces — in the render-instance order of §8.10 on `render.instances` keyed by (the seed, the look's id, the crop's
origin, the ordinal); a `siege` look gives barricades at gates and debris on streets, a `fire` look fire and smoke on
its hosts, a `plague` look none, a `refugee camp` tents at its camp faces; an occupied site's occupant layer (G7 (5))
gives its persisted items as transient ones in a crop over the site; a `world` context's recent battle gives
`corpse`, `debris` and `wagon` items by V13's event index. The items are view data, drawn and exported with the crop.

**(c) The DM's items.** The crop's palette (V09) places `TransientItem`s of source `dm` into the shared `encounter`
view key — barricades, carts, fires, fog, markers — moved and removed there; no event, no undo stack (a view), no
digest; they leave with the key and are kept across the session by §2.9's shared view state.

**(d) Promotion.** **Keep this** emits one `promoteEncounter` event (V14 §4.4): `as: 'place'` creates a named
`HoodPlace` of kind `place` (V01 §3.7.1's record; its `knownTo` the DM's choice) at the crop's centre with the
crop's items dropped — the owner's "a named place"; `as: 'site'` creates a `WorldSite` card whose `SiteRequest` is
**derived from what was there** (the preferred path, proposal §1): the context by G1, the kind and the **attachment**
by the profile and the items (C14-09) — a `camp` look or camp items → `camp`, `ground`; a `siege` look or barricades
→ `battlefield`, `ground`, then `camp`; a battle in V13's events → `battlefield`, `ground`; a place on `urbanSurface`
→ the place's own kind row where the admissibility row admits it as `surface` (a tower, a temple, a manor), else
`camp`, `ground`; a hinterland place → `manor` or the place's kind as `inFrame`; an underground chamber → `hideout`
or `cave` by its system's kind, `attached`; a site level → an expansion of that site (`setSiteRequest`), not a new
card — the size by the crop's area over the kind's m² per unit, the condition `occupied` where occupant items stand,
the age 0, the owner the DM's word; the crop's items become the card's occupant layer (G7 (5)'s `occupant`
elements, hosted on the anchor's face for a `ground` card) and the anchor stands at the crop's centre in the crop's
context — every derived pair admitted by V14 §2.5's table, so "keep this" at a street corner is never refused or
bent into a building. The
promoted card is `persistent` with `retention.since` the event; its document materializes on first open as any
card's; the encounter closes, its key cleared. A battlefield promoted so gains, on its first `destroySite`-like
host word or on a DM's `siteState` `damageSite`, graves and later ruins by G7 (the proposal's "a battlefield becomes a
site with graves and later ruins; a camp becomes permanent").

### 3.14 Failure handling (no whole-site or whole-crop retry; §5)

**F-SITE** (BCR-V14-16) is the site pipeline's failure class, with §5.1's tiers: (1) bend to the nearest lawful
form, named; (2) the ladder of the stage; (3) leave out and report; (4) refuse with the reason and the alternatives
(an edit's dry run). Never a whole-site retry; a crop's failures are view notices, never refusals of the click.

| where | detection | ladder | report |
|---|---|---|---|
| G1 context | the kind not admitted | bent to the nearest admitted kind of the same purpose → refused `refuse.site.context` | the row, the context, the distance read |
| G2 request | a stated field impossible in the context | bent to the nearest lawful value, named | the bend |
| G2 envelope | the preset's envelope does not fit | the preset steps down to `lair` → refused with the room available | `W_SITE_ENVELOPE_SHRUNK` |
| G3 siting | no candidate passes the hard terms; a free-standing drop with no point before V13 lands | the hard terms relaxed one at a time in the row's order → refused with the terms; refused `refuse.site.noWorld` (C14-49) | the terms failed |
| G3 terrain pre-edit | the stroke's Δ exceeds `maxShapeCm` or crosses water | clamped to the limit; a stroke over water bent to the shore (§7.1's terrain rules) | the clamp |
| G4 expansion | the frontier empties before the budget | the caps raised one step (`maxDegree` + 1, then `maxDepth` + 2) → the count reported short | the units short |
| G4 core | no core reached | forced at the deepest frontier node | — |
| G4 levels | a level with no unit | the level dropped, the storey counts reported short | the count |
| G5 unit | a face below 0.8 × its minimum; a kernel refusal | neighbours shrink → the envelope grows ≤ 2 × → the unit dropped (never an entrance, an entrance path's chokepoint or the core) | `EmbedResult.warnings`, the vector |
| G5 passage | no medial-axis or `astar` route between two chambers | dug straight where rock admits → the edge dropped and a loop reported short | the edge |
| G5 vertical link | the two ends beyond `linkReachM` | a passage unit dug on the lower level → the link made a `shaft` at the upper unit's point (a straight drop) | the gap |
| G5 enclosure | S7's trace refuses the envelope ring | the ring's `regularFit` polygon traced → `palisade` → none, reported | the rung |
| G5 buildings | S11 seats fewer classes than the policy names | F-SITING's ladder (§5.2) | `requestedVsBuilt` |
| G5 plans | V03's F-PLAN | V03's ladder | V03's report |
| G5 vector | the measured vector misses the target | G4's rules 5–7 re-run ≤ `attempts` → `W_SITE_VECTOR_MISSED` | the entry, both values |
| G6 classifier | V13 absent | the provisional classes | `W_SITE_WATER_PROVISIONAL` |
| G7 transition | no lifecycle row | refused `refuse.site.transition` with the rows admitted | — |
| G7 breach | no unit within reach of a breached wall | no edge (the breach is a drawing) | — |
| G8 access | no admissible head within 5 m | the anchor bent → the access unmade | `W_SITE_NO_ACCESS` |
| G8 surface | S10b finds no plot | the assignment's own ladder (§4.7 S10b; F-SITING) → the drop bent to `attached` below the nearest building, named | the fate |
| G8 adoption | an address collision between the site's and the settlement's entities | §6.3's suffix rule | the mapping |
| E1 context | a world click before V13 | refused `refuse.encounter.noWorld` | — |
| E2 interiors | more buildings than `maxBuildings`; a plan refused by F-PLAN | the farthest drawn as shells; the refused building a shell | `W_CROP_INCOMPLETE` |
| E3 extent | the include set exceeds `sideM[1]` | clamped | `W_CROP_EXTENT_CLAMPED` |
| E4 arena | the transient arena refuses the seed rectangle (`E_DEGENERATE` `seed`) or an item ring (`overlap`: a ring crossing a fixed face) | the seed simplified at `minEdge` → the crop without a transient arena (items drawn, not hit-tested); an item ring simplified and re-tried once → drawn only (C14-07) | the notice |
| E4 items | more than `transientBudget` | the farthest from the centre dropped | the count |
| R2 projection | a drawable with no `ZDecl` | drawn flat at its layer's `elevationCm` | `W_Z_FLAT_UNDECLARED` (the gap lint fails in CI, T-V14-16) |
| R4 raiseLower | the target has no elevation path | refused `refuse.raise.flat` naming the reason it is flat | — |

Degenerate geometry follows §5.1 (9) everywhere; an edit's class is F-EDIT (§7.1's outcome table).

**The edges of every mechanism** (J-V14.30; E1 no input, E2 one item, E3 the maximum and its caps, E4 degenerate
geometry, E5 missing, empty or contradictory data, E6 every rung and context, E7 every toggle and preset, E8 save,
load, undo, redo, regenerate, migrate):

| row | mechanism | edges and outcome | rung | test |
|---|---|---|---|---|
| SE1 | the card (V14 §2.2) | E5: a card with no `document` (candidate) is valid; `placement`, `anchor`, `building` absent by attachment; a card naming a document that cannot be opened re-materializes from itself; E8: V14 §2.9's rows | leave out and report | T-V14-26 (a) |
| SE2 | the request (V14 §2.2) | E1: an empty request (kind only) resolves every field by A2; E5: a `polygon` footprint with < 3 points reads `irregular`; a negative count reads 0; E7: every kind row | bend | T-V14-26 (a), T-V14-5 |
| SE3 | the tables (V14 §2.5) | E5: an `editTable` out of range refused by §7.6; a grammar with no rule reaching its core forces the core at the axiom's last unit; a kind with no row refused at the dialog | check | T-V14-26 (c) |
| SE4 | the transients (V14 §2.4) | E5: V14 §2.4's closing sentence | — | T-V14-26 (a) |
| SE5 | identity (V14 §2.8) | E5: collisions by §6.3; adoption keeps every token | — | T-V14-7, T-V14-26 (b) |
| SE6 | the site pipeline (V14 §3.1) | E1: a candidate never opened costs nothing but the card; E2: a `shrine` of one unit lays one unit; E3: `vast` on `dungeon` ≤ `EmbedRule`'s caps (V14 §6); E6: every rung and context; E7: the parity presets (no site exists unless dropped; a dropped site under `MFCG` or `FTG` materializes as under the default — a site is declared, J-V14.26 — `SiteAttach` calling V04 §3.8's dig generators as functions regardless of `Features.sewers` and the presets, under which "nothing of the layer runs" means V04's stages, not a card's act; C14-51); E8: a replay of the site document is byte-identical | each stage's | T-V14-26 (d) |
| SE7 | G1 (V14 §3.2) | E4: a click on water reads the nearest land face's context; E6: a standalone neighbourhood document's two contexts; no enceinte → the perimeter | — | T-V14-2 |
| SE8 | G2 (V14 §3.3) | E5: a host word with no row reads `none`; E7: every preset and kind | bend | T-V14-5 |
| SE9 | G3 (V14 §3.4) | E1: no world → hinterland contexts only; E5: a `cliffFace` on flat ground makes a cut of `cliffMinCm` (a quarry face) | the terms | T-V14-8 |
| SE10 | G4 (V14 §3.5) | E2: a budget of 1 unit is the axiom's first; E3: `maxDepth` and `maxDegree` cap every grammar; E5: a grammar whose rules never match its roles stops at the axiom, reported | the caps | T-V14-6, T-V14-26 (e) |
| SE11 | G5 (V14 §3.6) | E3: an envelope beyond the frame is clipped to it (a free-standing site's frame grows, V14 §3.4 (c)); E4: a chamber ring the kernel refuses takes the ladder; E5: no ore → the synthetic lode; E6: every geology | F-SITE | T-V14-6, T-V14-9 |
| SE12 | G6 (V14 §3.7) | E1: no unit → an empty report; E5: V13 absent → provisional | — | T-V14-12 |
| SE13 | G7 (V14 §3.8) | E5: a word with no row → none; a transition with no row refused; E8: a transform's undo restores the edges; a replay re-reads the level | refuse | T-V14-10 |
| SE14 | G8 (V14 §3.9) | E4: an anchor on a face deleted later re-hosts (V14 §2.9); E5: no head → unmade, reported; adoption of a site with no part maps nothing | F-SITE, F-EDIT | T-V14-7, T-V14-13 |
| SE15 | E1–E3 (V14 §3.10–§3.12) | E1: a click on nothing → `open`; E2: one building → its plan; E3: `maxBuildings`, `maxScenes`; E6: every rung and layer (a crop on an island, in a plan, Below); E7: a parity preset's crop completes its plans as any | notices | T-V14-1, T-V14-4 |
| SE16 | E4 (V14 §3.13) | E1: no look → no derived item; E3: `transientBudget`; E4: the arena refused → items drawn only; E8: the key survives a reload (shared view state), its items with it; promotion's undo returns them | notices | T-V14-4, T-V14-19 |
| SE17 | the 2.5D view (V14 §5.4–§5.8) | E1: an empty document projects its terrain alone; E5: an undeclared kind drawn flat, linted; E7: every projection family at every exaggeration, every sheet; E8: a view — nothing to save | — | T-V14-14 – T-V14-17 |

**Where sites and crops meet the other units** (each row's fixture runs at every rung the row names):

| row | combinations | outcome | test |
|---|---|---|---|
| SC1 | a site × a cliff, steep ground, a coast, a moat, a bridge, an oasis, the frame | the envelope never crosses water (`A3`'s cap; a `cliffFace` site's mouth on the face); steep ground levels by the pre-edit where the kind asks; an attached site's levels keep `surfaceClearCm` under water (V04 §3.5.0's rule read for `site` parts) and read `flooded` otherwise (G6); the frame clips the envelope | T-V14-27 (a) |
| SC2 | a site × V04's systems (a sewer, a catacomb, a cavern) | a `site` part never overlaps another part's elements at a shared depth: `A3`'s envelope excludes every other part's band. For an **adopted or `inFrame`** site (parts of the same document) a later V04 growth (a catacomb's, a sewer's extension) meeting a unit at a shared depth makes a `breach` link to it as to any element (V04 §3.5.7 (a) over `site` parts, BCR-V14-11). For an **attached** site (its parts in another document) V04's growth, extension and U-DIG's connector read the card's `envelope` and level bands through `siteEnvelopes(doc)` (V14 §10.2's V04 request) as an obstacle — `blockedBy: 'site'`, `W_SITE_NEAR_VOID` — and never breach it (C14-10) | T-V14-27 (b) |
| SC3 | a site × a raised way, a terrace, a deck plot | an anchor never on a deck building (V02 §3.16 (6): no basement); a site under a raised part's pier keeps `foundationObstacles`' reach (V04 §3.5.0); a terrace's levelled ground is the datum for a site on it (`levelledGroundCm`) | T-V14-27 (c) |
| SC4 | a site × a composed or tiered building (V02) | the surface exception's building composes by V02 as any; its site programme's rooms ride the plan of every wing | T-V14-27 (d) |
| SC5 | a site × a sky island (V05) | an island anchor hangs on the island's `ground` part; a site below an island is refused (no rock) — bent to the island's yard | T-V14-27 (e) |
| SC6 | a site × an epoch (V06) | an adopted site's parts take V06's strike pool, its lifecycle G7's transforms with cause `epoch`; a free-standing site runs no epoch unless the host's event says so | T-V14-10 (c) |
| SC7 | a site × the village (V07) | a thorp placed over a fort adopts it; a hamlet's hand-off up or down carries its cards and anchors | T-V14-7 (c) |
| SC8 | a site × the host (V08) | a host record creates a card; its status words transform; a removed record leaves the card at `map` tier | T-V14-10 (b) |
| SC9 | a crop × every layer and band | a crop on Below completes no plan but the dwellings' (V04's F4, F6, C4 buildings are buildings); on Sky the island's plans; in a plan the storey's crop | T-V14-4 (b) |
| SC10 | a crop × a crisis look, a festival, a season | the look's derived items; the festival's occupancy multiplier; the season's cover in the picture (§8.2's season rows) — no model change | T-V14-4 (c) |
| SC11 | a crop × a site document | the `site.level` and `site.ground` profiles; an occupied site's items; a promotion inside a site is an expansion edit | T-V14-4 (d) |
| SC12 | a 2.5D view × every layer, band, storey, deck, island, look, Find | each drawn by its `ZDecl`; the look's marks on the surface; Find's veil projected | T-V14-15, T-V14-17 |
| SC13 | a secret anchor × View as, the party pictures, every export | withheld below the key; `revealed` in the party's `places` admits it | T-V14-12 |

### 3.15 Determinism (§6)

Every draw is listed, each on a registered concern: G2's age (`site`, the card, salt `age`); G3's controlled
random term (`site`, the card, `siting`); G4's rule choice (`site`, the card, the layer, the node's key, the step);
G5's cave field (`site`, the card, the layer, `cave` — the `noiseStream`'s seed), the mine agents' turns (`site`, the
card, the level, the agent, the step), the synthetic lode (`site`, the card, `ore`), the hex lattice's jitter
(`site`, the card, the layer, `lattice`); G5 (e)'s ground: the base's own concerns (`plot.*`, `siting`, `siteplan`,
`heights`, `pin.light`, `naming`) with the card as the town root, so a site's buildings never share a stream with any
settlement's; G7's collapse choice among candidates (`epoch.transform`, the card, the event's seq) and the
`plan.damage` thresholds (§6.3's, keyed by the lineage and the element — for a carved or natural unit the `UnitElement`
keys of V14 §2.8 — fixed-key draws, never re-drawn, V04 §3.12's pattern; C14-13); G8's access candidate (`site`, the card, `access`); E4's derived items (`render.instances`, the view
stream, keyed by the seed, the look's id, the crop's origin and the ordinal — a view draw as the crisis looks', never
a model stream; a `rerollLayer` on `render.instances` changes the crop's derived items, a view, and nothing else). G1, G6, E1–E3, R1–R4 and the tactical check draw nothing. The `week` and the `logHead` in the
encounter's key change what facts the crop reads, never a draw; a crop at another head reads the facts of that head.
Every loop runs in address order; every search breaks ties by address, key or index; the site pipeline runs serially
on one worker; every length is an integer centimetre and every transcendental goes through `dmath` (§6.5). The
same card — the same seed (the host document's), request, context facts and tables — gives the same site document
byte for byte on the five engines and between generation and replay (T-V14-25); a New random on a site advances the
card's reroll and re-draws G2's age (where not stated), G4 and G5; on a level, that level's G4 subtree and G5; on a
unit, its geometry only, its neighbours held. The 2.5D view's tile keys carry the projection (V14 §5.5); the flat
view's keys are unchanged, and the document's digests are identical under every projection (bar 14; M11).

## 4 Editing

The edit kinds are §7.1's events, their lifecycle rows §7.4's form, the closure rule §7.3 item 9's; everything on a
site is PLAT geometry, so locks, pins, undo, local repair and persistent addresses apply unchanged (item 133 (h)).
"Move this wall" is kernel geometry (the base's `moveVertex` on a `site` part, V03's `moveWall` on a site building's
storey); "add a floor", "flood the lower crypt", "collapse this passage", "expand this fortress" are programme or
lifecycle edits rematerialized locally with locks preserved, each a recorded event. This section adds the points
forms, the new event kinds with their semantics, the two deletion verbs, promotion, adoption, the raise-or-lower
edit, the locality of each, undo, the clerk's view and migration.

### 4.1 Declarations — points in, shape out (item 101 (i))

| event | its points form | the dry run derives | the handles |
|---|---|---|---|
| `dropSite` | one point (the anchor) — T6's **Drop a site** drops at once with the context row's first kind and an empty request (G2 derives every field; the survey's one-click bar, §6.1 (4); C14-45), the site panel opening afterwards; the dialog is the long form; a free-standing drop with no point ("somewhere fitting") takes none | G1 (the context, the admitted kinds, the attachment), G2 (the programme and the ghost: the envelope ring and the entrances' points, the derived fields listed "derived: 2 levels below — the water table"), G3 for a free-standing drop (the placement's rectangle), the surface exception's `assign` expansion and its plot (S10b's dry run), the access's head (G8 (a)) — shown as the ghost with its fates; accepted, the card, the anchor and the access are stored; the document materializes on first open | the anchor's point; the envelope's corners (a `polygon` footprint); the bearing |
| `setSiteRequest` | the panel's fields | the re-resolved programme and vector, the units it keeps (locked, or matched by §6.3's carry-over) and the units it re-lays, listed as fates; the storeys added or removed | — |
| `setAttr` on `anchor/address` (`moveAnchor`) | one point (the new anchor) | G1 on the new address (the context may change: a `moveAnchor` from a cellar to the sewer keeps the card and re-reads the context; a context whose row no longer admits the kind is bent to the nearest admitted address of the old context, named); the access re-dug by G8 (a), the old removed, the site's entrance unit kept (its `at` re-seated) | the point |
| `promoteEncounter` | the open encounter (no point) | the derived request (V14 §3.13 (d)) shown as the card's ghost, the items that become the occupant layer | — |
| `adoptSite` | the site (a click on its icon under a settlement's frame) | `AdoptResult`'s mappings and the reservation's ring as fates | — |
| V13's `setPlacement` / `placeFrame` / `unplaceFrame` with a `site` subject (C14-15) | V13's points form on the world document | V13's placement dry run; the site's arenas untouched, its charter stale, its context re-read (adoption where the new placement lies inside a frame) | V13's |
| `raiseLower` | a vertical drag of a drawable's top face in a 2.5D view, or the height field | the mapped attribute path and the lawful value (V14 §4.6) | the top face |
| `drawTunnel`, `drawChamber`, `addLink`, `placeAccess` on a `site` part | V04 §4.1's forms with Site the working layer and the level the **level chip** names (V09's system chip's twin) | V04 §4.1's derivations on the level's part (`system` is the level) | V04 §4.1's |

Every ground point is read as V04 §4.1's *two reads* state; a point inside a plan reads the storey and room
(`AnchorAddress` with `building`, `storey`, `room`). A dry run shows the derived shape as a ghost with its fates;
accepted, the shape is stored resolved and no later derivation moves it (declared means held, §7.2).

### 4.2 The edit events (§7.1's union gains these; BCR-V14-15)

```ts
  | { t: 'dropSite'; at?: PointCm | { xM: number; yM: number }; key?: PlatKey | { world: true }; storey?: number; room?: Id; request: SiteRequest; attachment?: SiteAttachment;
      expansion: number /* the surface exception's `assign` and `placeAt` expanded at the fold (§7.1's sugar rule); 0 for attached and free */;
      card: Id /* written at the dry run: the card's address */; anchor?: Id; access?: Id; placement?: Placement /* V13; a free-standing drop */; fates: EditFate[] }
  | { t: 'setSiteRequest'; card: Id; request: Partial<SiteRequest> /* the fields set; a field set to null returns it to 'derived' */; keep: Id[] /* the units held (locked, or chosen in the fates sheet) */; fates: EditFate[] }
  | { t: 'promoteEncounter'; key: EncounterAddress; as: 'place'|'site'; request?: SiteRequest /* the derived request, overridable in the dialog */; items: TransientItem[] /* the view key's items at the event, copied in */; card?: Id; place?: Id; fates: EditFate[] }
  | { t: 'adoptSite'; card: Id; settlement: Uuid; result: AdoptResult /* written at the fold: the mappings */ }
  | { t: 'raiseLower'; id: Id; target: 'base'|'top'|'floor'|'ceiling'|'deck'|'altitude'|'level'|'ground'; deltaCm: Cm; mapped: { t: 'setAttr'|'setField'|'convert'; path?: string; value?: unknown } /* the dry run's resolution: the one base event the fold runs (V14 §4.6) */ }
  // `setAttr` paths this volume adds: `anchor/address` (moveAnchor), `anchor/secret/state`, `site/name`, `site/host/*` (dossier-owned, refused), `unit/knownTo`, `unit/role`, `unit/floorCm`, `unit/ceilingCm`, `link/kind`, `link/state`
  // `convert` ops this volume adds (ConversionOp gains them): `destroySite`, `occupySite`, `vacateSite`, `damageSite`, `restoreSite`, `repurposeSite`, `expandSite`, `collapseUnit`, `breachUnit`, `floodSite` (a dated surface through V13's verbs), `drainSite`
```

**`dropSite`** is a closure-like sugar (§7.1): attached and free drops write one card and, attached, one anchor and
one access record in one undo step; the surface exception expands into `assign` + `placeAt` by §7.1's sugar rule with
`Assignment.site` naming the card. The card is `candidate`; its document is not made (nothing is materialized until
the first open, J-V14.22), so the drop costs one event and three records.

**`setSiteRequest`** (a programme edit) re-runs G2 on the card, then G4 and G5 **locally**: the units in `keep` and
every locked unit are fixed nodes of G4 (their rules not re-drawn, their geometry held as fixed rings of the
embedding, §3.4's `fixed` form on the level's part read as kept content, §3.3), the rest re-derived by §6.3's
carry-over (a unit whose key the re-build re-mints keeps its id and geometry where its face still fits); "add a
floor" adds a storey above (V02's massing `floors` + 1, V03's plan re-cut by its interior ladder for the new storey
alone, V03 §3.11) or a level below (a new `site` part from `nextSitePart`, the vertical link from the lowest level);
"flood the lower crypt" is `floodedLevel` → G6 with a dated surface (V13's "this happened"); "expand this fortress"
is `sizePreset` one step up → G4's expansion layer on the frontier, G5 on the rock left; "collapse this passage" is
not a request edit but `collapseUnit` (V14 §4.3). Locks are preserved; every removed or re-laid unit is a fate.

**`setAttr` on `anchor/secret/state`** is the DM's secret toggle (item 133 (e)): `dmOnly` ↔ `revealed` ↔ `discovered`
in any direction, each a logged event with `cause` the event; `revealed` also writes the anchor's address into the
shared `party` view key's `places` (V14 §2.6; C14-17) — a mirror of `MapRecord.party` where a host is bound, which
V08's reveal writes too (V08 §3.14), the document's own party key otherwise; `discovered` raises `knownTo` to
`local`.

### 4.3 The two deletion verbs, the lifecycle conversions (item 133 (h); item 134 (b); J-V14.23)

The two verbs are this volume's own semantics on the card (C14-30): V13's `EditBase.verb` is read on terrain and
water edits only and ignored on every other kind, so no `verb` field is read here; the retcon's descendant rule is
stated below. The delete gesture on a card (the Delete key, T9/T10's delete) opens a fates sheet (V09 §5.5; the V09
request of V14 §10.2; C14-46) offering **Remove** and **Destroy**, one line each; neither runs silently.
* **Remove** — the base's `delete` on the card: a **retcon** ("this was always so" in this volume's sense). The card,
  its anchor, its access record, its `Assignment.site` building's site programme (the building stays as an ordinary
  building of its class, re-planned by V03's ladder at its next click), its reservation (an adopted site) and every
  record that exists only because of the card (its descendants without a cause of their own: the occupant layer's
  items, the `worldSite` decoration, the derived-facts the port sent — retracted by V08's next absorb as a removed
  derived fact) go; the site document is unlinked (kept in the session's undo record, §7.4, until the record's cap);
  an adopted or `inFrame` site's parts are **tombstoned** in the settlement document (their units `demolished`, cause
  `convert:removeSite`; the village grew round it, so its ground is "this happened" — a true retcon of the ground
  would be a declared Re-derive from S3 under §7.1, offered as the alternative in the dry run, never the default; the
  bend named `bend.site.removeAdopted`), the terrain untouched (the DM's terrain pre-edit stays as the ground's own
  dated event, deletable on its own by V13 §4's trace rule); nothing else moves. The host's record, where one exists,
  outranks it: a `delete` of a host-created card returns F-EDIT `dossier-owned` (§7.1's outcome table) — the host
  removes it.
* **Destroy** — `convert { op: 'destroySite' }`: an **event** ("this happened") at the drawn
  week, G7's `destroy` transform: the lifecycle `destroyed` with the DM's cause, the plan kept, every element drawn
  past its threshold, the ruin decoration on a free-standing site's ground, the record in the log and the card's
  `LifecycleEvent`; the access record reads `collapsed` while its entrance unit is closed; the icon shows the ruin
  glyph. A destroyed site may be `restoreSite`d (the lifecycle row admits it) and is robbed by G7 (4).
* **The other conversions**: `occupySite` (the occupant kind named), `vacateSite`, `damageSite` (the level's third
  named: `damaged` or `ruined`), `restoreSite`, `repurposeSite` (the new purpose: a reuse layer), `expandSite` (the
  `setSiteRequest` sugar for `sizePreset` + 1), `collapseUnit` (one unit: its `closes` elements set past their
  threshold by a `plan.damage` override — the element's threshold written as the current level, an `editedPaths`
  entry — so the collapse persists through every level and `restoreSite` repairs it last), `breachUnit` (a `breach`
  edge between two units within reach, by hand), `floodSite` and `drainSite` (a dated governing surface through
  V13's verbs, G6 re-run). Each is a `convert` with cause `convert:<op>` and §7.4's convert row; each shows its fates
  (the units closed, the edges opened, the dwellings or occupants affected).

### 4.4 Promotion (`promoteEncounter`; item 132 (a))

The event carries the encounter's key, the choice `place` or `site`, the derived request (overridable in the
dialog) and the items copied from the view key. Its fold: `as: 'place'` creates the `HoodPlace` (V01's record, kind
`place`, named by S13a's naming on `naming` keyed by the place) at the crop's centre and clears the key; `as:
'site'` runs `dropSite`'s fold with the derived request, the anchor at the crop's centre in the crop's context, the
items as the card's occupant layer (persisted `occupant` elements, G7 (5)), the lifecycle `retention` `persistent`
with `since` the event and `cause` `edit`, and clears the key. Its undo removes the place or the card (with its
anchor and access) and returns the items to the view key (the key is restored from the undo record's copy). A
promotion inside a site document is a `setSiteRequest` (an expansion layer over the crop's units), never a second
card.

### 4.5 Adoption by hand (`adoptSite`; item 134 (d))

A free-standing site whose placement lies under a settlement's frame (V13's `Placement` of both) and that V13's P5
has not adopted (an older site placed after the settlement, say) is adopted by T10 `hold`'s **Adopt into the town**:
`SiteAdopt.adopt` as V14 §3.9 G8 (e), one undo step, the mappings in the event. The settlement's S3 then re-claims
with the reservation by §7.3's local operator for a reservation change (its scope the reservation's faces and the
blocks they touch, listed as fates); the site's buildings become the settlement's plots and buildings by the
mapping, every lock and pin kept (bar 7). Undo returns the parts to the site document, addresses mapped back.

### 4.6 The raise-or-lower edit (`raiseLower`; item 141 (a); J-V14.32)

One new edit kind, offered in the 2.5D view as a vertical drag of a drawable's top face and in both views as the
context panel's height field. Its dry run maps the drag to **the one attribute the model already stores** for that
drawable and target — the table below — clamped to the attribute's range (§7.1's ranges; a bend named), and the
event's `mapped` holds the resolved base event, which the fold runs: so a `raiseLower` is a `setAttr`, a `setField`
or a `convert` by another hand, with that event's locality, lifecycle row and undo, and the digest moves exactly as
that event moves it. A target the drawable has no attribute for (a pin, a label, a way's corridor: flat by its
`ZDecl` reason) is refused `refuse.raise.flat`. No overhang, no arch as a volume, no chamber above a chamber in one
arena (item 141 (b)): a raise never creates one, because every target is a stored height, not a shape.

| drawable | target | the mapped attribute |
|---|---|---|
| a building | `top` | `setAttr heights/eaveCm` (ridge and tower following by the roof spec's ratios, V02's massing rule where composed); `base`: `heights/baseCm` is the ground datum and is never set by hand — bent to the terrain's `flattenTo` under the footprint (`setField` terrain) |
| a storey (a per-storey slab) | `top` | `setAttr storeys/groundCm` for the ground storey, `setAttr storeys/upperCm` for every upper storey together (V02's `Building.storeys: { groundCm; upperCm }`; the bend named "the upper storeys share one height"), within V02's ranges (the V02 request of V14 §10.2; C14-25) |
| a wall (enceinte, retaining) | `top` | `setAttr heights/eaveCm` on the enceinte; a retaining wall's step by its `levelCm` (`terrace`'s level, item 110 (a)) |
| a raised deck | `deck` | `setAttr clearanceCm` (item 244's path), the spans re-read |
| a sky island | `altitude` | V05's `setAttr altitudeCm` |
| the terrain under a brush | `ground` | `setField { field: 'terrain', stroke }` with the drag as `amount` (V13's "this happened" by default) |
| a water body | `level` | V13's water-level verb (`drawWater`'s `levelCm` form, dated) |
| an underground or site element | `floor`, `ceiling` | `setAttr elevationCm` / `ceilingCm` within the part's band (V04 §4.2's ranges) |
| a vertical link | `floor` at either end | the end unit's `floorCm` (the link follows) |

### 4.7 Locality (§7.3's form; J-V14.27)

| edit | re-derives | byte-identical |
|---|---|---|
| `dropSite` (attached) | the card, the anchor, the access record; the host building's plan rung marked `stale` for the head (item 28's inputs: an access); nothing else of the host | every arena of the host; every other card |
| `dropSite` (surface) | the assignment's placement: §7.3 item 8's scope (the site, its joined neighbour, each displaced use's new site), S11's mutator on the plot, V03's plan of the building | the ground outside the placement's touched set |
| `dropSite` (free) | the site document (created on first open); V13's W6 `site` term and W7's seats read the card's `attraction` and `routed` at their next run (a settlement already placed never moves: a term is read at placement only) | the host documents; every other site |
| `dropSite` (`inFrame`) (C14-01) | the reservation's faces and the blocks they touch: §7.3's reservation operator, S7's trace, S10/S11 on those faces, V03's plans of the site's buildings, the host's `nextSitePart` levels; §7.3's S12 row round the reservation | the ground beyond the reservation's faces and the blocks they touch; every other card |
| `dropSite` (`ground`) (C14-09) | the card, the anchor and its hosted `occupant` elements | every arena |
| `setPlacement` / `placeFrame` / `unplaceFrame` on a site (V13's events; C14-15) | V13's: the placement, the charter marked stale, the glyph, W6/W7's re-run; here the card's `context` and, inside a frame, G8 (e)'s adoption | every arena of the site (bar 3) |
| the host building's or element's lifecycle change under an anchor (C14-32) | G7's `rule:host` transform on the cards anchored in it (V14 §3.8): their occupancy, the access's reading, the anchor's re-host | the site document |
| a V13 cascade or any commit reaching an open encounter's rectangle (C14-20) | the encounter's memo invalidated (re-resolved at the next read); the `waterStamp` of the next export | the document |
| `setSiteRequest` | G2; G4 on the un-held nodes; G5 on their levels' units (the held units fixed rings); G6; the vector | the held units, every other level's geometry, the ground where no building changes |
| `moveAnchor` | G1 at the new address; the access re-dug; the old host's plan rung stale, the new host's stale | the site document (its entrance unit's `at` re-seated only) |
| `setAttr anchor/secret/state` | the anchor's `knownTo`, the party's `places` | everything |
| `delete` of a card (remove) | the card's descendants (V14 §4.3); an adopted site's parts tombstoned; S3's reservation lifted and §7.3's reservation operator over its faces | the ground beyond the reservation's faces; the terrain |
| `destroySite` and the conversions | G7's transform: the lifecycle, the edges' passability, the occupant layer, the ruin decoration; G6 where a ceiling changed | every face, wall and id of the plan |
| `collapseUnit`, `breachUnit` | the unit's elements' thresholds (an override) and its edges | the rest |
| `floodSite`, `drainSite` | V13's cascade from the dated surface (its dirty set); G6 | identities everywhere (bar 12) |
| `promoteEncounter` | as `dropSite` (attached, in the crop's context) plus the occupant layer | the host's arenas |
| `adoptSite` | the settlement's S3 reservation operator and the merged ground's local re-derivation (§7.3's S12 row for the hinterland faces the site's ground replaces); the mapped parts untouched | the site's units, locks and pins (mapped, byte-identical in content) |
| `raiseLower` | the mapped event's own locality (§7.3's row for it) | the mapped event's |
| `drawTunnel` / `drawChamber` / `addLink` / `placeAccess` on a level | V04 §4.3's rows read on the `site` part; the unit graph gains a unit (role `cell` for a chamber, `passage` for a tunnel) with reason `edit`; the vector re-measured | the rest |
| a ground edit of the host near an anchor | nothing of the site; the anchor re-hosted under a warp (§7.4) | the site document |
| a host building's plan re-cut (V03) carrying a site's head | the head re-placed by V03's access head rule; the access record's `ground.at` follows | the site document |
| an `editTable` on `tables/sites/*` | new drops and the next materialization; a `setSiteRequest` re-reads them; existing cards keep their context, programme and geometry (a card is declared) | every existing card's geometry |
| a V13 cascade reaching a site's governing surface | G6; the lifecycle's `water`; `discoverable` | identities, faces, walls |
| an epoch over an adopted site (V06) | G7 with cause `epoch`; V06's strike pool over the site's buildings; V04's access pass over its parts | the site's plan beneath the transforms |

### 4.8 Undo

Every row is §7.4's; additions: a `dropSite`'s undo removes the card, anchor and access and unlinks the document (the
document's bytes in the undo record until its cap, so a redo re-links without re-materializing); a `setSiteRequest`'s
undo restores the former request, programme, vector and the replaced units' geometry and ids (the replaced scope);
a `moveAnchor`'s undo restores the former address, host and access; a secret toggle's undo the former state and the
party's `places` entry; a remove's undo restores the card with every descendant, the reservation and the adopted
parts' live state; a `destroySite`'s or conversion's undo the former lifecycle, the edges' passability, the occupant
layer and the decoration; a `collapseUnit`'s undo the former thresholds; a promotion's undo returns the items to the
view key; an adoption's undo maps the parts back to the site document; a `raiseLower`'s undo is its mapped event's; a `setPlacement`'s undo is V13's (the site's arenas untouched either
way).
The `encounter` and `projection` keys are never undo targets. A `creation` event (a site document's `dropSite` copy,
its charter, its terrain pre-edit) is no undo target (§7.4's rule).

### 4.9 The clerk's view (§11.2's tool API; V10 §3.9, §3.9a)

Through the reader, filtered by the viewer's knowledge key: per card its kind, purpose, attachment, context, state
set with causes and weeks, request (each field with its source and rule), target and measured vector with the
entries that missed, history layers with ages, water aggregate, knowledge state and reached units, host fields with
their tier; per unit its role, kind, layer, level or storey, area, floor and ceiling, water class with its governing
surface and why (V13's record read back, never inferred), hazards, reason (the rule, the parent, the event); per
vertical link its kind, ends and elevations; per anchor its context and secret state; per encounter its profile, the
rule that chose it, its extent and why, the completions, the occupancy summaries with their rows, the derived items
with their looks. The `site` `WhySectionProvider` answers V10's *why is this here* (the siting's terms and weights,
the other sites considered), *what caused this* (the lifecycle event's cause and the host's word), *what changed*
(the unit edges a transform closed or opened), *what if* (a counterfactual fork of V13 §4 with a `siteState` op
applied, read and discarded); the `encounter` section answers the profile and the occupancy. Every answer is a
reason record's chain (V14 §2.7); the chain test (T-V14-18) fails when a unit's reason, its layer's or its
programme's is missing. Every word is a catalogue key (V09 §4.9): `info.site.*`, `info.unit.*`, `info.encounter.*`,
`bend.site.*` (`bend.site.kind`, `bend.site.storey`, `bend.site.levels`, `bend.site.removeAdopted`), `bend.encounter.noHour`,
`refuse.site.*` (`refuse.site.context`, `refuse.site.transition`, `refuse.site.noWorld`, `refuse.site.clock`),
`refuse.encounter.noWorld`, `refuse.raise.flat`.

### 4.10 Migration (§7.5)

A document saved before this volume's version holds no card, anchor, site part or `nextSitePart`: the upgrade adds
`nextSitePart` 1 and nothing else (no site is invented). A site document of an older output version opens as §2.9
states, its log replayed under its own version; the `upgrade` to a later version maps its addresses by §7.5. A
card whose `document` names an unknown `outputVersion` keeps the card and re-materializes the document under the
current version on first open, reported. The `encounter` key of an older session reads as none open; `projection`
absent reads `flat`.

## 5 Rendering, labels and exports

### 5.1 The anchor's icon: the context rule and the secret cue (item 133 (d), (e); J-V14.12)

**The icon** is map furniture over a canonical anchor: one mark of semantic `site.icon` (role `pin`, §8.2's pin
rows) at `SiteAnchor.at`, its glyph the kind row's `icon` (a keep, a tower, a temple, a cave mouth, a pick, a mask
for a hideout, a slab for a crypt, a stair for a cellar complex, a grating for a sewer lair, a skull for a dungeon, a
tent, crossed swords, a cross), 24 CSS px at the building band and 16 px at the neighbourhood band. **Two rules by attachment (C14-50):** an
**anchor's** icon (`attached`, `surface` with levels, `ground`) draws at the neighbourhood and building bands only
(the anchor is a local fact; at the district and city bands the card is listed by Find and the panel); a **free** or
**`inFrame`** site's `worldSite` decoration (V14 §3.9 G8 (d)) draws at every band, and a free site's world glyph on
V13's world view by W9's levels. Both are drawn in the `pins` group (`StyleSheet.groups.pins`, §8.2); Find lists both.

**The context rule (the owner's "it shows only once we access that interior and specific floor").** The icon draws
only in a view whose **context contains the anchor's address**:

| `AnchorAddress` | drawn when |
|---|---|
| a ground face (part 0 or a raised part) | the ground is drawn and the view is at the neighbourhood or building band over the face; on a raised part only with that part's deck in the hit stack's top (V09 §4.20.8) |
| a building's storey (and room) | that building's plan is open at exactly that `storey` (§2.9's `storey` view key; V03 §4.5's switcher), at the building band; the icon stands in the room's floor; with the plan closed the building carries no icon — the panel's "ways down" line names the site for an admitted key instead (V03 §4.5's list) |
| an underground or site element | Below (or Site) is drawn — visible or the working layer (§8.4) — at the depth band holding the element's floor (`depthBand`), in `cutaway`, `overlay` or `solo` alike; the icon stands on the element's floor at `at` |
| a sky island's face | the island's part is drawn (`LayerSpec.visible` for `sky`, or Sky the working layer) at the neighbourhood or building band |

Outside its context the anchor draws nothing and is not hit-testable; Find's listing (§11.2's gazetteer) still lists
an admitted card with **Go there**, which sets the view keys (the working layer, the band, the building's plan at
the storey) that bring its context — view keys only, no event (item 120 (a)'s rule). The admission function
withholds the icon, its hover, its listing and its export below the viewer's key (V14 §2.3).

**The secret cue (a second cue beside colour; g item 112).** The icon's ring is the cue: `dmOnly` — a dashed ring
(4 : 3 at 1 paper px) in the `secret` colour role with a small eye-slash glyph at its corner; `revealed` — an open
ring in the `local` role; `discovered` — a filled ring in the `public` role; a `destroyed` or `cleared` site adds the
ruin glyph (a broken outline) over the kind's glyph; a `submerged` site's glyph is drawn over a water wave. The
legend (§9.5) lists each state's cue while one is drawn ("DM only · revealed to the party · discovered by the
party"). Under View as (V09 §4.8) at a lower key the icon is simply absent — the DM sees what the party sees.

**Opening a site.** A click on the icon (T6's hit stack puts the icon first) sets the per-viewer `siteOpen` key and the
app opens the site document beside the host (V09's document switch; the host stays loaded), materializing it on
first open with §11.2's `Progress`; the site document's view opens at its ground (free-standing) or its first level
(attached) with Site the working layer. A back control returns to the host at the anchor.

### 5.2 The site document's view: figure-ground, roles, labels, lights

A site document draws by the base's style sheet as any document: its ground part through §8's ground rows (the
hinterland, the enclosure, the buildings with V02's massing and V03's plans at the building band), its `site`
parts through **V04 §5.1–§5.2's underground view** read on the `site` layer (`LayerSpec` for `site` with
`underView` `cutaway` by default over the ground's ghost where the site has a ground, `solo` where it has none; one
level at a time, `depthBand` naming the level's band; the band ladder listing the levels by name and depth): the
rock halo and the voids in paper (J-V4.31's dungeon-map figure-ground, cited), the walls, the water, the buildings,
the accesses and links, the adjacent levels' traces, the light pass with V04 §5.3's legibility floor, V04 §5.2's
programs by `Chamber.kind` — §2.7's existing kinds, no new value (C14-27): a natural chamber `hall` or `breakdown`
with the cavern's irregular fill, a rock-cut room `room`, a stope `workings` with the quarry program's hatch and
pillars, a built room below ground `storey` with the buried town's program and the `ruinMasonry` double stroke
where the layer is ruined, the `caveFormation` instances as stipples. Added for sites (item 407's form; the rows in
every shipped sheet by V04 §5.2's per-family rule):
* **Roles as a second cue.** Each unit's role draws one small glyph at its pole of inaccessibility in the `label`
  role at the building band only: a door arch for `entrance`, a hub dot, a narrowing chevron for `chokepoint`, a
  ring for `loop`, a bar for `deadEnd`, a key for `secret` (at an admitting key only), a stair or shaft glyph for
  `verticalLink` (its kind's), a crown for `core`, a wave for `sump`; switched by `StyleSheet.groups.siteRoles`
  (default on in the site view, off in a crop's picture).
* **The history layers** tint the voids one step apart on the sheet's `void` role per layer ordinal (at most four
  steps; later layers lighter), so a built room in an old cave reads as later — a sheet with `mono` keeps the steps
  in value.
* **Water classes** draw V13's rendering rule for units (a waterline on walls, the `water` fill at depth, a
  submerged unit withheld by depth and key) as V13 states it; nothing restated.
* **Damage** draws by V03 §5.6's and V04 §5.6's rules over the unit's elements with `SiteDamageRow`'s kinds.
* **Labels** (§9; V04 §5.4's form): the site's name as a `system` label at its envelope's centroid in the main
  level, the core's and the entrances' names as `place` labels, a level's name ("Level −2 — the lower crypt") in the
  band ladder; names drawn once on `naming` (S13a's slice `site`, V14 §10.2's request to V11's naming pack) and
  protected as any (§2.8); every label admitted by the knowledge filter at the viewer's key.
* **Lights**: the occupant layer's `LightSource`s by §4.7's light table on hosts `chamber` and `gallery` (V04's rows
  read on the `site` layer); an unoccupied site lit by its openings' shafts and the ambient alone.

### 5.3 The encounter crop: the tactical style, the grid, the exports (item 136)

**The crop view.** The crop opens as a framed region of the document's own view (never a second document): the
rectangle at the frame stop that fills `view.frameShare` with the crop, the rest of the map dimmed to 35 %
(§8.4's working-layer dim), the tactical grid over it (§9.5's grid, kind `square`, cell `gridCm`, origin V14 §3.12
(5)'s, role `grid`, `skip water` off), the scenes' switcher (ground, each storey, the band, the deck, the level) where
the crop holds several, the completed plans drawn at the building band's rows (V03 §5.1), the occupancy marks (one
`occupancy` mark per `occupancyMarkM2` of a room's or chamber's area, a small figure glyph in the `label` role, its
count the band's — never a name), the transient items (`site.transient` rows: a barricade as a hatched bar, a cart as
a rectangle with wheels, a fire as a flame glyph with a glow at night, smoke and fog as soft discs at alpha 0.3, a
camp as a tent ring, a marker as a numbered pin), the derived items under the DM's; and **the water (C14-21; V13 §5.1's rule read by E3 (7))**: a face whose class is
`wading` or `swimming` takes V13's depth tint over the ground (water as terrain with depth bands), a `submerged`
interior is withheld below the viewer's key by depth as V13 states, and under a flood stage over a storey the
rooftops of the flooded buildings draw as the dry ground. The style is the sheet's — no separate tactical sheet —
with the grid and the `siteRoles` group on, so the crop reads as the town does (J-V14.5). The `light` key draws day
by default (the sheet's default) or night, `time` read as `day` (E2 (c)); the DM narrates the hour.

**The VTT crop scope (BCR-V14-8).** `ExportOpts.vtt` gains `crop?: { key: EncounterAddress }` (the open encounter;
the dialog's default while one is open) and `gridOrigin: 'address'` (always, for a crop): the scope is the crop's
rectangle, `resolution.map_origin` the crop's origin in grid units from the arena's origin, `map_size` `cols × rows`,
`pixels_per_grid` the request's, and one scene per member of `EncounterCrop.scenes` by §11.1's profile — the ground
scene with `line_of_sight` from the footprints, walls, cliffs and retaining walls in the rectangle and the transient
items' sight-blocking shapes as `objects_line_of_sight`, portals at the entrances and gates, the lights in the
rectangle; a storey scene per completed building (§11.1's per-storey rule, V03 §5.3) and the band scene (V04 §5.5)
cut to the rectangle; a site level's scene by the same per-band path. The transient items export as objects, the
occupancy summaries as a `plat` note per room (`plat.occupancy: { room, band, parts }`), tokens never (the VTT's).
**The multi-floor convention (C14-06; the survey's §2.1 and §6.1 (1)):** a multi-scene export of a crop or a site
writes **one image and one JSON per scene**, named `<base>.<ordinal>.dd2vtt` with the scene's ordinal as the numeric
suffix (0 the ground, then each storey or level in elevation order, `EncounterCrop.scenes`' ordinals) and the
scene's elevation and name in its `plat` object (`plat.level`, `plat.storey`) — the pairing the Foundry Scene Levels
importer reads; the research seat's item 136 (c) re-verification pins the exact rule with the profile's version.
**The fields per scene** are the Universal VTT contract's (the survey's §2.9, read as evidence): `format`,
`resolution` with `map_origin` and `map_size` in squares and `pixels_per_grid`, `line_of_sight`,
`objects_line_of_sight`, `portals` with `closed` and `freestanding`, `lights` with `range`, `intensity`, `color` and
`shadows`, `environment`, `image` — §11.1's profile emits exactly these per scene. **Water and difficult terrain
(C14-21):** the VTT export writes `plat.difficultTerrain: { kind: 'wading'|'swimming'; ring }[]` from `Encounter.water`
and, under a flood stage over a storey, the rooftops' faces as the ground scene's walkable set; a `submerged` interior
is left out of the party's scene by depth and key. **The vendor block (the survey's open question 1; V14 §11 Q4;
J-V14.47):** the `plat` object may carry, optionally and off by default (`ExportOpts.vtt.vendorBlock`), each unit's
reason-record id and the anchor's knowledge state under the namespaced key `plat.sites`, admitted by the export's
key as any fact; the common fields never change. **The lights** are BCR-V14-23's hour-free set. The same crop
exported twice gives byte-identical files but a changed `waterStamp` after a cascade (T-V14-11); a crop over a
storey keeps the world grid, so a token placed on the ground scene stands on the same cell of the storey scene above
it.

**A site's exports.** A site document exports as any document: GeoJSON (its units as features, V14 §1b.4), SVG and
PNG, glTF and CityJSON (its levels as V04 §5.5's inward-facing void solids), VTT one scene per ground, storey and
level through the per-storey and per-band paths, each at the export's key.

### 5.4 R1 — Z-completeness: every drawable record declares its vertical extent (item 141 (c) M9, M10; J-V14.31)

The kernel stays planar and stores no elevation (K13); every record on it carries one. `ZDecl` is one row per
drawable record kind in §2.8's entity registry (BCR-V14-5): `base` and `top` (two readings in cm against the datum),
or `surface` (a height function over the record's face), or `flat` with a reason. The table is the gap list the
gate's M9 asks for, complete at this volume's landing (T-V14-16 lints the registry against it; a kind without a row
fails CI):

| record kind | `ZDecl` | base | top / surface |
|---|---|---|---|
| terrain (`Terrain`) | surface | — | the heightfield (`levelledGroundCm` where terraces apply, item 309) |
| water body (`WaterBody`), a V13 `WaterSurface` | surface | — | its level (`levelCm`, a dated surface) — drawn as a plane at the level over the draped bed |
| way, corridor, kerb band, square, plaza | surface (draped) | — | the terrain under it |
| plot, block, residue, yard part, land use, greenery face, field | surface (draped) | — | the terrain |
| building (footprint) | base + top | `Heights.baseCm` | `eaveCm`, the roof to `ridgeCm` (the roof spec's form: gable, hip, flat, by V02's massing where composed), `towerCm` for a tower wing |
| wing (V02) | base + top | the building's base, or the wing's tier base (`TierLay`) | its own eave and ridge |
| storey (V03) | base + top | `baseCm` + Σ the storeys below (V03's storey heights) | + its own height; a basement storey below `baseCm` |
| room (V03) | base + top | its storey's | its storey's |
| enceinte run, tower, gate | base + top | the terrain at the run | `heights.eaveCm` (a tower its `towerCm`); a `breached` or `dismantled` run flat with reason "no standing wall" |
| retaining wall | base + top | the low side's levelled ground | the high side's (`stepProfile`, §2.7) |
| raised way's deck, piers, spans | base + top | the ground under the pier | `deckMinCm`/`deckMaxCm` along the deck (item 244); a span's underside the deck less its thickness row |
| bridge deck, pier, mole, quay platform | base + top | the water's level | the deck elevation (item 246) |
| tunnel, gallery (V04) | base + top | `elevationCm` (the invert or floor) | + `headroomCm` |
| chamber (V04; a site's unit) | base + top | the floor (`elevationCm`; a unit's `floorCm`) | `ceilingCm` |
| underground building (V04) | base + top | its chamber's or tunnel's floor | its `eaveCm` under the ceiling |
| `AccessPoint`, `UndergroundLink`, `VerticalLink`, V03's stair core | base + top (both ends, M10) | the lower end's elevation (`verticalEnds(id).a`) | the upper end's (`.b`) |
| sky island (V05) | base + top | its underside profile (V05 §5.3's slab) | its altitude + its terrain |
| `LightSource` | base + top | its host's surface + `heightCm` | the same (a point) |
| tree, decoration instance (§8.10) | base + top | the terrain | + its crown (`crownM` for a tree; the decoration row's `heightM`, default 2 m) |
| `Pin` (a well, a cross, a stall) | flat, reason "a symbol" — drawn as a billboard at the terrain | — | — |
| label, annotation, view pin, the compass, the grid, the legend | flat, reason "furniture" (view space) | — | — |
| `Reservation`, district, quarter, seam, `HoodPlace`'s face | flat, reason "an area, drawn draped as its faces" | — | — |
| `SiteAnchor` icon | flat, reason "furniture", drawn at its address's floor | — | — |
| `TransientItem` | base + top | the floor it stands on | + `EmbedRule`-declared heights per kind (a barricade 120 cm, a cart 150, a tent 250, fire and fog 0: flat) |
| `Chimney` (V03) | base + top | its hearth's storey base | the stack's top above the ridge (V03 §3.3 H3) |
| `SkyAccess` (V05) | base + top (both ends) | its foot's ground | the rim's altitude |
| `Outfall` (V04) | base + top | the invert at the mouth | + the tunnel's headroom |
| a plan's furniture item (V03) | flat, reason "a floor glyph" | — | — |
| a Works' marks (§4.11) | flat, reason "furniture" | — | — |
| a castle's wards (§4.8) | surface (draped) | — | the terrain |
| V13's world kinds (`WorldRaster`, `WaterSurface`, `WorldRoute`, `Territory`, the glyphs) | V13's own rows (declared there; excluded from this lint's list) | — | — |
| crisis-look marks (§8.2) | surface | — | the terrain |

`verticalEnds(id)` (BCR-V14-6) is a derived reading for every vertical link kind — an `AccessPoint`'s ground end is the
terrain or floor at `ground.at` (its anchor's storey floor for source `site`) and its under end the element's floor
at its `access_point` vertex, or for `under: SiteReach` the reach's stored `floorCm` (C14-24: the site document is
never read by the host's renderer; a candidate card's access reads the anchor's floor at both ends, reported
`W_SITE_NO_LEVEL`); an
`UndergroundLink`'s two elements' floors; a `VerticalLink`'s stored ends; V03's stair core's two storeys' bases —
so M10 holds for the base's records by derivation and for this volume's by storage, and the renderer, the VTT
portal elevations and the clerk read one function.

### 5.5 R2 — The projection family, the transform, the depth sort, the tiles (item 141 (a) M11; J-V14.31)

**View state.** `projection` (V14 §2.6) is per-viewer view state outside every digest: the document hashes
identically under `flat` and every family at every exaggeration (bar 14; T-V14-14). The flat map is the default and
is unchanged: with `family: 'flat'` nothing of this section runs and the flat tiles draw as before this volume.

**The transform.** For a model point `(x, y)` in cm and an elevation `z` in cm (the `ZDecl`'s base or top, times
`exaggeration`): the view's azimuth rotates the plan by `azimuthCdeg` about the frame centre; `isometric` projects
`(x', y', z) → (x' − y') × cos 30°, (x' + y') × sin 30° − z` (true isometric at `elevationCdeg` 3 526); `oblique`
(cabinet) → `x' + cabinet × y' × cos 45°, cabinet × y' × sin 45° − z` with `cabinet` 0.5; `perspective` → a
pinhole at the view's eye (the camera at `elevationCdeg` above the frame centre's horizon, `fovCdeg` 4 500, the
eye's distance set so the frame fills the view at the current zoom stop), `(x', y', z)` through the view matrix
and the division by depth. Every projected coordinate is a double in screen space; the model is never touched (K13).
**The depth key** of a drawable is `(layerOrder, bandIndex, depth, zOrder)`: `layerOrder` the `LayerSpec.zOrder`
(underground below ground below sky); `bandIndex` the depth band's or storey's ordinal; `depth` the projected
depth of the drawable's **base centroid** (isometric and oblique: `x' + y'` along the view's diagonal; perspective:
the eye distance); `zOrder` the flat `z` (§2.1). Drawables are drawn in ascending key (painter's order) per tile on
the canvas backend, and with a per-tile depth buffer on the WebGL backend (§8.9's backends), where the painter's
order is the fallback for translucent marks (the ghost, water, fog). Within one drawable the faces draw bottom to
top: base face, sides (the two visible of a prism by the azimuth), top, roof. This resolves every case item 141 (b)
admits (stacked slabs are separate drawables; no overhang exists) and is deterministic (ties by address).

**Tiles.** A 2.5D tile is a projected-space tile keyed by `(projection, exaggeration, cutaway, …the flat key)`
(§8.8's tile key gains the projection, BCR-V14-7); its content is the model's drawables whose projected extents
intersect it, found by the flat static index over the **un-projected extent** of the tile (the tile's four corners
unprojected at `z = 0` and at the layer's maximum `top`, the hull of the eight points), so the index is the flat one
and no second index exists. Zoom stops, bands and the label stops are the flat view's (§8.5, §9.2): labels are placed
on the projected plan as §9.2's greedy places them on the flat plan (the candidate boxes projected), a label's
anchor at its target's **top** face (a roof's ridge, a slab's top), so names sit on things, not under them.

### 5.6 R3 — What is drawn: draped terrain, extruded massing, per-storey slabs, cutaway bands, islands; the style family; LOD

By `Lod25Row` (V14 §2.5) per band:
1. **Draped terrain.** The terrain raster per tile (the ground's heightfield at §8.2's contour-extraction
   resolution) as a triangulated surface (two triangles per cell), shaded by the sheet's key light (below), the
   flat ground rows (land use, fields, greenery faces, ways, water) drawn on it as textures in projected space — the
   same marks §8.1's display list holds, each face projected with its surface heights, a way's band draped along its
   spine's heights; water as a plane at its level (a river's surface sloping with its reaches, V13's or §2.3's
   course heights), the bed draped beneath where the plane is translucent; contours at the finer bands.
2. **Extruded massing.** Each building's footprint as a prism from its base to its eave with the roof form — the
   base's roof spec (gable, hip, flat), V02's composed roofs where the `wings` rung exists at the band — the sides
   shaded by azimuth (the two lit faces lighter, the shaded darker by the family's `sideStep`), the `raised` under-copy
   off; walls, towers and gates extruded likewise; retaining walls as a step; raised decks as slabs on piers; bridges
   and piers as decks over the water plane; trees as dots, cones or crowns by band; lights as the night view's glow
   sprites at their height.
3. **Per-storey slabs (bar 17).** At the neighbourhood and building bands a building whose plan rung exists draws
   its storeys as stacked slabs — each storey's rooms (V03's plan, the same plan the flat view draws, byte-identical
   in the model) as a slab of the storey's height with its walls extruded, doors and windows cut, furniture as its
   glyphs on the floor — separated by the storey height; `projection.cutaway.storey` removes every slab above it (the
   roof and upper storeys gone) so the DM looks into the storey; with no plan the massing prism draws. Basement
   storeys draw below the terrain in a cut (4).
4. **Cutaway bands.** The underground (and a site's levels) as V04's cut-away projected: the drawn band's voids as
   recessed slabs below the ghosted ground (the ground's drapery at `ghostAlpha` over a pit the band's extent cuts),
   each tunnel, gallery and chamber a prism from its floor to its ceiling with the rock between drawn as the band's
   hatched halo on the pit's sides; the bands above and below as traces at their depths; `projection.cutaway.depthBand`
   names the band (the flat `depthBand`'s twin, defaulting to it).
5. **Islands at altitude** (V05): the island's terrain draped on its slab at its altitude, its underside profile as
   the slab's sides, its shadow by the lighting model on the ground beneath (§8.4's casters unchanged); its buildings
   extruded on it.
6. **Stacked spaces** are separate arenas or levels joined by vertical-link records drawn as **stacked-slab joins**
   (item 141 (b)): a stair as a flight between its two ends' elevations (`verticalEnds`), a shaft as a vertical tube,
   a ramp as a sloped slab (`risePerRunCm`), a trapdoor as a hatch on the upper floor; never an arch as a volume, never
   a chamber above a chamber in one arena (true solids go through the glTF path).
7. **The style family (BCR-V14-7).** `StyleSheet.projection` holds one row per family: the key light's azimuth and
   elevation (the sheet's sun at the fixed position, `sunMode` `fixed`; no hour), `sideStep` (the value step of a
   shaded side, `ink` 0.12, `lit` 0.18, `hatched` the hatch density ×1.5, `painterly` V07's wash two steps darker),
   the edge stroke of extruded faces (the sheet's `wall` role at 0.75 ×), the roof's tone (the sheet's roof rows),
   the terrain's shading (a slope-darkening of the ground ramp by 0.08 per 10°), the default `exaggeration` (1.5;
   `bw-print` 1.25), the ghost alpha of a cutaway's ground (0.35). Every shipped sheet resolves the family's rows
   (§8.2's slot resolution; a user sheet missing them resolves by it), so the loader never refuses one.
8. **Level of detail** by `Lod25Row`: at the city band the massing is flat-topped prisms and the trees dots so a
   metropolis stays inside the frame budget (V14 §6); the storey slabs only from the neighbourhood band; the
   contours only from the neighbourhood band.
9. **Everything else the flat view draws** — Find's veil and glow (projected on the top faces), the crisis looks'
   marks (draped), the season's covers, the weather effects (screen space, unchanged), the thematic views (on the
   faces), the labels (5.5) — draws as the flat view does, projected.

### 5.7 R4 — Hit testing projected back to the 2D address (item 141 (d); bar 15; J-V14.33)

A pointer in a 2.5D view resolves to **the same address as the flat view at the same model point**. `hitTest25`:
1. The tile under the pointer gives the drawables whose **projected extents** (a per-tile list of projected boxes,
   built with the tile) contain the screen point, in descending depth key (the topmost first).
2. For each candidate in that order, the screen point is **unprojected** onto the candidate's faces in order top,
   sides, base: the top face at the drawable's `top` elevation (the plane `z = top` under the inverse transform), a
   side as the plane of that face; the first face containing the unprojected point is the hit, with its model point
   `(x, y)` and the surface `top`, `side` or `ground`.
3. With no drawable hit, the terrain: the screen point unprojected onto the draped surface by a short march along the
   view ray over the raster (≤ 32 steps of one cell), giving the ground point.
4. The hit's **address** is the flat view's answer at that model point: `pointLocate` on the layer and part the
   drawable lies in (a storey slab → the building and the storey; a cutaway void → the element on its part; the
   ground → the base's hit stack, V09 §4.20.8), so every tool, panel, why card and handle works unchanged; the hit
   stack is V09's with the drawable's surface as one more entry (a roof click selects the building, a storey slab's
   floor the room, a void's floor the chamber).
5. Handles and ghosts (V09 §3.3, §3.5) project with their drawables; a drag moves in the unprojected plane of the
   handle's surface (a plan drag on the top face moves in the plan; a vertical drag on a side is `raiseLower`, V14
   §4.6).

### 5.8 The 2.5D picture export and knowledge

The projection is a **picture export** beside glTF and CityJSON (item 141 (a)): PNG, SVG and print of the projected
view at the export's zoom stop, drawn by the tile worker from the projected tiles with the legend's family named
("isometric, exaggeration 1.5") — the model unchanged, the export's knowledge key applied as any picture's (§11.1's
*Knowledge*; the cutaway never shows what the key withholds). glTF and CityJSON are the solids' path and gain
nothing here. No interchange format carries the projection.

## 6 Performance budgets

Measured as §12.1 states (the reference hardware, the harness, p50 and p95 over the rung's golden seeds and the
frozen fixtures `B-SITE` and `B-CROP`, V14 §7). Every row is a **target** under g item 119's comfort level as V04 §6
reads it: every one-time wait this volume adds completes within ten seconds from the click to the complete result at
every rung up to the metropolis cap, with §12.1's progress named per stage past one second; the interactive rows are
unchanged. Work sizes are PLAUSIBLE until the spikes of V14 §8 measure them (SE0, V0). Budgets are per regime (item
135 (e)): the crop's at the encounter scale, the site's at the site scale, the view's at the document's rung.

**The encounter crop — "the crop must feel instant at the table".**

| step | work at the default profile (a `place` of 70 m: ≈ 12 buildings, 2 ways, 1 square) | rate assumed | p50 · p95 |
|---|---|---|---|
| E1 resolve | one static-index query of the rectangle; G1's context (one query of the enclosure line) | ≈ 1 µs per index query | 0.5 · 1 ms |
| E2 (a) interiors | ≤ `maxBuildings` 12 plans, nearest first — each V03's `wings` + `rooms` + `plan` where absent (V03 §6's per-plan row: ≈ 15 ms p95 a house, ≈ 40 ms an institution), from the elaboration cache where present; **the mix assumption (C14-43):** ≤ `CropRule.maxInstitutions` 2 institutions in a `place` crop, the rest houses (2 × 40 + 10 × 15 = 230 ms); a crop whose resolved set holds more institutions drops `maxBuildings` to 8 for that crop (fallback (3) per crop, the rest shells) | V03 §6 | the first (the building under the click) within 40 ms; all twelve ≤ 180 · 300 ms, arriving progressively as `DisplayDelta`s (§8.6) |
| E1 (4) the world crop frame (C14-08) | V13's `charterFor` at a transient placement (V13's row), S1 on a 100 m frame (≈ 4 ms: §12.4's S1 row at 1/36 of a CITY frame), the roads as bands (≤ 3 ways, ≈ 1 ms), S12a's cover (≈ 3 ms), the arena's `fixed` faces (≈ 2 ms) | §12.4's rates | 10 · 16 ms, inside the first frame |
| E2 (b) occupancy | one row read per building and unit | ≈ 2 µs each | ≤ 0.1 ms |
| E3 extent | the include set's extent (one query), the rectangle, the scenes | — | ≤ 1 ms |
| E4 arena and items | one `transientArena` open over the rectangle minus ≈ 20 rings; ≤ `transientBudget` items placed | §3.4's open ≈ 2 ms for 20 rings | 3 · 6 ms |
| **the first frame** | the crop framed, the grid, the shells and the plan under the click | — | **≤ 100 ms p95** (`CropRule.firstFrameMs`) |
| **complete** | every plan and item drawn | — | **≤ 300 ms p95** (`completeMs`) at CITY and METROPOLIS alike (the crop's size is the profile's, not the rung's: scope invariance, R12-12) |
| the crop's VTT export | the scene set (≤ `maxScenes` 8) through §11.1's path | §12.7's export laws | ≤ 1.5 s p95 for 8 scenes at 100 px per square |
| `promoteEncounter` | one `dropSite` fold | V14's dropSite row | ≤ 10 ms |

**The world site — the first materialization (the one-time wait).**

| stage | work (a `medium` fort: 24 units, 2 storeys, 1 level; a `medium` dungeon: 40 units, 3 levels, 4 layers; a `medium` cave: 14 units, 2 levels) | rate assumed | p50 · p95 (fort · dungeon · cave) |
|---|---|---|---|
| G1 + G2 | reads and the table | — | ≤ 1 ms each |
| G3 (free-standing) | V13's score over its candidates (V13's budget row); the terrain pre-edit (one `setField`, §12.6's terrain stroke) | V13 §6 | V13's row + 5 ms |
| G4 | ≤ 200 expansions, one lowlink search, ≤ 50 loop candidates | ≈ 5 µs per expansion | 1 · 2 · 1 ms |
| G5 (b) natural | the noise field over ≤ 60 × 60 samples per level, the flood, the rings, the medial axis of ≤ 40 rings, ≤ 20 `astar` routes on a ≤ 100 × 100 hex lattice | noise ≈ 27 ns per sample; medial axis ≈ 1 ms per 1 000 ring points; `astar` ≈ 0.3 µs per relaxation | — · 25 · 15 ms per level |
| G5 (c), (d) carved | the rectangles and bays, the agents' ≤ 3 × 20 steps per level, the bands | ≈ as (b) without the field | 4 · 10 · — ms per level |
| G5 (e) built (the ground) | S1 on a ≤ 240 m frame under the charter (§12.4's S1 row scaled: ≈ 8 ms), S12a/S12b on it (≈ 10 ms), S7's trace (≈ 5 ms), S10 + S11 on ≤ 12 plots (≈ 16 µs each), V03's plans on ≤ 6 buildings on first open (≈ 40 ms each, lazily at the band) | §12.4's rates | 60 · 20 · — ms (the plans lazily, by V03's rows) |
| G5 commits | per level: one L0, one L1 (≤ 120 chains), one L2 `corridorUnion`, one L3 batch | insertion ≤ 8 µs (§12.4); `corridorUnion` at S9's rate | 5 · 15 · 8 ms |
| G5 (h) measure and the tactical check | the vector (one union-find, one lowlink), sightlines by ≤ 400 ray casts on the static index | ≈ 1 µs per query | 1 · 3 · 2 ms |
| G6 | V13's classifier per unit | V13's row | ≤ 2 ms |
| G8 (a) | one dig (V04 §3.8's generator on a ≤ 60 × 60 grid) | V04 §6's `addUndergroundAccess` row | ≤ 30 ms |
| **the first open (attached, no ground)** | | | **≤ 60 · 150 · 60 ms p50; ≤ 120 · 300 · 120 ms p95** |
| **the first open (free-standing, with ground)** | + G3 + G5 (e) | | **≤ 140 · 220 · 120 ms p50; ≤ 300 · 500 · 300 ms p95** (+ V13's siting row for a drop with no point) |
| a `vast` dungeon (160 units over ≥ 5 levels at ≤ `maxPerLevel` 36 units each, 6 layers; C14-31) | the cap: each level one embedding of ≤ 36 units (≈ the `medium` dungeon's per-level row), the levels serial | | ≤ 1.2 s p95 — inside the comfort level; spike (a)'s fixture holds levels at the cap |
| `setSiteRequest` | G2, G4 and G5 on the un-held nodes and their levels | the rows above × the share re-laid | ≤ the first open's p95 × the share + 10 ms |
| `destroySite`, the conversions | G7: one level read, ≤ 400 threshold comparisons, the edges | ≈ 2 µs per element | ≤ 5 ms |
| `adoptSite` | the mapping of ≤ 500 addresses, the reservation operator (§7.3's), the merged ground's local re-derivation | §12.6's scoped law over the touched faces | ≤ 60 ms at CITY |
| a site's VTT export | one scene per level and storey | §12.7's laws; V04 §6's band scene ≤ 1.5 s | ≤ 1.5 s per scene |

**The 2.5D view.**

| budget | bound | measured at |
|---|---|---|
| a projected tile's build (the tile worker): the flat tile's marks projected plus the prisms' sides and the terrain's triangles | ≤ 1.6 × the flat tile's build at the same band (§12.5's re-raster rate × 1.6): the terrain's two triangles per cell ≈ 20 µs per 1 000 cells, a prism's three extra faces ≈ 2 µs | V0 at CITY, METROPOLIS |
| the GPU frame (R12-9's twin): ≤ 8 ms on the reference device, ≤ 16 ms on the low end, ≤ 1 ms of main-thread work, **at the metropolis rung** at the city band (flat-topped prisms, dots, no slabs) and at the building band (slabs over ≤ 60 buildings) | the same bounds as the flat view's | V0, then V2 at METROPOLIS |
| the settle after a projection switch (`flat` → a family, a family's azimuth or exaggeration change): the visible projected tiles rebuilt | ≤ 250 ms (CITY view), ≤ 400 ms (METROPOLIS view): §12.5's settle bound × 1.6 | V1 |
| hit testing | ≤ 0.5 ms per pointer event (≤ 64 candidates unprojected) | V3 |
| a `raiseLower` dry run | the mapped event's preview budget (§12.6's preview row) + 1 ms | V3 |
| the 2.5D picture export | §12.7's picture laws × 1.6 | V4 |
| memory | the two tile sets together within §12.8's per-rung cap (C14-42): the projected set ≤ 1.3 × the flat set's visible bands, and on a switch the **other** family's finer bands (neighbourhood and building) are evicted and re-rastered on the way back inside the settle budget, so the total at METROPOLIS stays ≤ §12.8's line + 0.3 × the flat view's city-and-district bands; the per-tile projected extents ≤ 64 bytes per drawable | V0 measures the total |

**Pre-decided fallbacks** (in order, each triggered by the named spike's METROPOLIS measurement): (1) 2.5D: the
city band's trees off and the terrain's cell doubled (`Lod25Row.terrain` `flat` at the city band); (2) 2.5D: the
storey slabs from the building band only; (3) the crop: `maxBuildings` 8; (4) the site: `EmbedRule.cave.passageSampleM`
6 and `mine.agents` 2; (5) the site: the tactical check's ray casts halved (200). Each is a table value with a
declared shift (§13.3).

**The register (R12-V14-1 – R12-V14-6; §12.10's form):** R12-V14-1 the crop's first frame and complete (SE1 at
CITY; nightly at METROPOLIS; a miss re-declares the row at the measured p95, a target miss in D-18); R12-V14-2 the
first open per kind (SE3, SE4; the same); R12-V14-3 the projected tile build and frame (V0, V2); R12-V14-4 the
settle after a projection switch (V1); R12-V14-5 hit testing (V3); R12-V14-6 the comfort level over every one-time
wait this volume adds (SE4, V4; T-V14-24 (b); a one-time wait past ten seconds fails, R12-31's rule).

## 7 Tests and acceptance bars

§13's families; every bar runs on generated output from the step V14 §8 names and keeps the base's bars green on the
same output. **Fixtures:** `B-SITE` — a CITY and a VILLAGE of the golden seeds with one card of every kind dropped in
each admitted context (a fort and a mine in the country, a tower and a manor in the hinterland, a temple and a
guildhall on the surface, a crypt under the cathedral, a cellar complex under a merchant's house, a hideout off a
sewer run, a cave under the hills, a dungeon of four layers), each at `lair`, `medium` and `vast`, and the second
known-city fixture (V12) with a fort on its headland; `B-CROP` — the same documents with twenty encounter addresses
each (every profile row at least once, two per layer, one inside a plan, one on an island, one on a site level);
`B-25D` — the golden seeds at every rung under every family at exaggeration 1, 1.5 and 3. **Parity:** no reference
owns a site, a crop or a 2.5D view: the site-generator survey (`research/sites/survey.md` §2–§3, read whole) finds
every surveyed tool a layout-first picture generator or a furnishing editor with sliders and, at best, a seed — none
takes context, purpose, history or water as an input or measures its output (its §1 (2), §6.2) — and the base's
references have no projection; the survey's parity rows this volume carries are the Universal VTT field set per
scene and the multi-floor export convention (its §2.9, §2.1, §6.1 (1); T-V14-11), the unit budget per level (its
§4.7, §6.1 (7); T-V14-6), the submerged and difficult-terrain export (its §6.2; T-V14-11, T-V14-12) and the
one-click drop (its §6.1 (4); T-V14-5); the parity metric is otherwise **invisibility**: with no card dropped, no encounter open and `projection` `flat`, every
document renders pixel for pixel and hashes byte for byte as before this volume (T-V14-21: the `item141.flat` and
`item132.none` no-op pins on V12 §3.7.8's engine). Every other bar is a rule bar or a realism bar without a
reference (§13.7; provenance `own`, PLAUSIBLE until the owner's panel). The brief's Part E bars this volume carries:
2 → T-V14-22; 6 → T-V14-9; 8 → T-V14-23; 10 → T-V14-18; 11 → T-V14-1; 12 → T-V14-12; 14 → T-V14-14; 15 → T-V14-15;
16 → T-V14-16; 17 → T-V14-17.

| id | family (§13) | bar | tier (§13.8) |
|---|---|---|---|
| T-V14-1 | determinism; **Part E bar 11** | on `B-CROP`, every address opened twice in one session, after a reload, on the five engines of §6.5 and after an unrelated edit elsewhere in the document (the `logHead` differing): the `Encounter` — profile, rectangle, origin, resolved set, completions' plan digests, occupancy summaries, derived items — identical in every case; the VTT re-export byte-identical with `resolution.map_origin` unchanged (bar 11); the same address at another `week` with a festival standing differs only in the occupancy and the derived items | PR (20 addresses), nightly |
| T-V14-2 | rule bar | G1's context on 500 points per `B-SITE` document: `urbanSurface` ⇔ inside `R`; `hinterlandNear` ⇔ within `edge.nearM` of the enclosure line (the outermost enceinte's outer strip where one exists, else the perimeter — both fixtures); `country` beyond `farM` or the frame; every point's reason record names the line and the distance; an `editTable` of `nearM` changes new drops' contexts and no existing card's | PR |
| T-V14-3 | the owner's rule (item 136 (a)) | no record, key, table cell, export field or catalogue string of this volume names an hour: the schema lint over `@plat/sites`, the `encounter` and `projection` keys and `tables/sites/*` finds no field whose unit is an hour or whose name contains `hour`, `time` or `clock`; the crop's lights export as fixtures; the occupancy summary reads the week and the festival only | PR |
| T-V14-4 | the crop | on `B-CROP`: (a) every address's profile is the first matching row (a corner never reads `street.straight`); the side within `sideM`; the rectangle axis-aligned, snapped outward to whole cells, its origin on the world grid; (b) every layer: a Below address completes only the dwellings' plans and writes the band scene; an island address the island's part; an in-plan address the storey's scene first; (c) a crisis look standing at the week gives its `lookItems` and none at another week; a festival week raises the patrons' band; the season's cover in the picture; (d) a site-level address uses `site.level`; (e) in town nothing nearby is generated: the document's model digest, records digest, log and every arena byte-identical before and after every open and close (the elaboration cache alone grows); 0 people read (§10.3's `derivePerson` never called — a spy on the call) | PR, nightly |
| T-V14-5 | derive before invent | on `B-SITE`'s requests with every field unstated but the kind: every derived field carries `source: 'derived'` with a rule id of V14 §3.3's table, or `default` with the kind row, and `age.draw` only where no earlier rule fired; a stated field is never overwritten and an impossible one is bent with its bend named; a `urbanBelow` crypt under the cathedral derives `purpose` `burial`, `floorsAbove` 0, `secrecy` ≥ `discreet`; a tower in dry hills derives `floodedLevel` null, in a marsh a level; `levelsBelow` never puts a floor below the water table less the damp margin unless stated; on wet ground (a `wetland` biome or a `flood`/`damp` class under the envelope) one level fewer and no `rockCut` (C14-23); **the no-dialog drop** (C14-45): T6's one-click drop on every context of B-SITE yields a card whose every field is `derived` or `default`, the panel opening afterwards | PR |
| T-V14-6 | the vector (item 132 (g)) | on every `B-SITE` card at every preset, over 50 seeds: the measured vector within `vectorTolerance` of the target on every goal entry on ≥ 95 % of seeds, the rest reported `W_SITE_VECTOR_MISSED` with the entry; every unit has a role, a layer, a reason record naming its grammar rule and parent; the graph's loops equal `E − V + C`; the chokepoints are bridges or `chokepoint` units; a `hideout` has two entrances one of which is a `secretDoor`; the `TacticalReport` reads each site; a preset is a named vector (the `large` fort's `units` ≈ 2 × the `medium`'s); **no level holds more than `maxPerLevel` units** (C14-31); for a kind with `above: plan` the goals are asserted on the gate chain and the levels, the storeys' edges read back from V03's plan and their entries reported (C14-14) | PR (10 seeds), nightly |
| T-V14-7 | adoption (item 134 (d)); **Part E bar 7's site half** | a free-standing fort adopted by a thorp V13 places over it (and by a hand `adoptSite`): every address keeps its token with a new part prefix, every lock, pin, assignment and edit of the site mapped and in force, the reservation of kind `worldSite` claimed first by S3 (the village's houses outside the glacis), the site's enclosure, buildings, plots, ways and terrain pre-edit entering the settlement as drawn constraints of its creation prefix (locked, pinned, keyed by the site's tokens; the site's land use not carried; C14-16), the settlement's digest changed only by those constraints, the reservation and the parts; every mapped address carrying the settlement's namespace segment (C14-22); undo maps every address back; (c) a hamlet's hand-off up and down (V07) carries every card and anchor; two site documents adopted into one settlement take no colliding address (bar 7's first half is V13's) | PR |
| T-V14-8 | siting | on V13's world fixture (from V13's W1 landing): each of V14 §2.5's seventeen `SuitabilityTerm` plug-ins is a pure function of V13's rasters in [0, 1] (a fixture cell per term with its expected value); a fort with no point lands on a candidate whose `overlook` and `roadControl` plug-ins exceed the frame's median and whose `floodSafe` is non-zero; a mine on ore; a hidden temple at a candidate with `oneApproach` 1; no random term enters the score (two runs with different `siting` draws differ only among tied candidates); the reason record lists the five candidates considered; the card's `attraction` and `routed` reach V13's `site` term and W7 (a routed fort gains a road); a host-placed site never moves; until V13 lands, a free-standing drop without a point is refused `refuse.site.noWorld` (C14-04, C14-49) | nightly (from V13's W1) |
| T-V14-9 | locality (§7.3's oracle); **Part E bar 6** | a town regenerated locally around a new free-standing site (an `adoptSite` over a CITY) and a site dropped inside a town (every attachment) change exactly the oracle's dirty set: an attached drop changes the card, anchor, access and the host building's elaboration state only; a surface drop the assignment's touched set; an `inFrame` watchpost and manor (C14-01) the reservation's faces and the blocks they touch, the host's new `site` parts and nothing else; a `ground` camp the card, anchor and its items; an adoption the reservation's faces, the drawn constraints' faces and the mapped parts; nothing outside reshuffles — every other arena's digest, every other plot's and building's id and geometry byte-identical (bar 6); `setSiteRequest` with held units changes none of them | PR (B-EDIT sequences with site events) |
| T-V14-10 | lifecycle (item 134 (b)) | (a) on every `B-SITE` card: `destroySite` then `restoreSite` draws the plan byte-identically to its pristine drawing at level 0, every id kept, the ruin decoration gone; at levels 0 to 1 in 0.05 steps the damaged element set is monotone and each `SiteDamageRow` kind breaks inside its range, every carved or natural unit's `UnitElement`s keyed by V14 §2.8 and the same element breaking at the same level for a seed, the level rising at the unit's material's `ratePerYear` through the V06 request's signature (C14-13); `collapseUnit` closes exactly its unit's edges and `restoreSite` repairs it last; a `rockWall` breach opens a `breach` edge only to a unit within reach; (b) a host word of every row applies its transform and an unmapped word reports `unmapped_word`; a removed host record leaves the card at `map` tier; (c) over 30 epochs of V06's trajectories an adopted ruin's above-ground elements are robbed with V06's ledger credited and its levels never robbed; a free-standing site runs no epoch; an attached site's `decayLevel` reads the host's week (C14-12); **the host's fate (C14-32):** a crypt under a church V06's epoch ruins reads `vacate` with cause `rule:host`, a cellar complex under a demolished house has its access `collapsed` and its anchor on the trace, and a successor building re-heads it on its lowest storey; (d) every transition has its `LifecycleEvent` with cause; an edit on a locked wall survives every transform | nightly |
| T-V14-11 | VTT (item 136 (b)); **Part E bar 11's export half** | on `B-CROP`: every crop's `.dd2vtt` and Foundry scene validates; `map_origin` equals the crop's origin in grid units from the arena's origin and is a multiple of `gridCm`; two crops whose rectangles share an edge share their cell lines exactly (a token's cell in one is the same cell in the other); a storey scene's grid equals the ground scene's; the transient items appear as objects and the occupancy as `plat.occupancy` notes, never as tokens; a site document exports one scene per level and storey through the per-band and per-storey paths at the export's key; **the multi-floor convention (C14-06):** a crop's or a site's multi-scene export writes one image and one JSON per scene named `<base>.<ordinal>.dd2vtt`, the ground 0 and each storey or level by its ordinal, each JSON holding exactly the Universal VTT fields (`format`, `resolution` with `map_origin`, `map_size` in squares and `pixels_per_grid`, `line_of_sight`, `objects_line_of_sight`, `portals` with `closed` and `freestanding`, `lights` with `range`, `intensity`, `color` and `shadows`, `environment`, `image`) plus the `plat` object with `level`/`storey`, `waterStamp` (C14-20) and, when asked, `plat.sites`; `plat.difficultTerrain` lists every wading and swimming face and the rooftops' faces form the walkable set under a flood stage (C14-21); a re-export after a V13 cascade over the crop differs in `waterStamp` and the water fields alone; the research seat's re-verification of the Universal VTT fields and Foundry's wall and door schema (item 136 (c)) is recorded with the profile's version pin before SE2 exits | milestone |
| T-V14-12 | water and knowledge (item 137 (f), (g); item 133 (e)); **Part E bar 12** | (a) a flooded crypt, a drowned ruin and a flooded street — one fixture with a dated surface rising a metre at a week — are classified by V13's one test per storey, by share and by route: their classes change under the dated surface and no identity, face, wall or id changes (bar 12; the classifier's bar is V13's, this clause its reader); the site's `discoverable` falls false when every entrance's route class is `diving`; a crop over the flooded street draws the depth tint and exports the difficult terrain (C14-21); (b) the three secret states: at the party's key a `dmOnly` anchor is absent from every view, label, listing, `why` answer, Find and export (T30-5's enumeration on `B-SITE`), **its access's head absent from the party's plan, ground symbol and VTT portals whatever the access's stored `knownTo` (`effectiveKnownTo`; C14-18)** and its site withheld; the `party` view key holds the revealed places with and without a host bound (C14-17); `revealed` admits the icon through the party's `places` with the open-ring cue; `discovered` the filled ring and `knownTo` `local`; the DM's View as at the party's key shows exactly what the party picture shows (V08's render); (c) the second cue is drawn in every shipped sheet and under every `cvdVariant` | PR, nightly |
| T-V14-13 | the context rule (item 133 (d)) | on `B-SITE`: the crypt's icon draws only with the cathedral's plan open at the basement storey and at no other storey or band; **an upper-storey crypt (C14-02):** a card dropped in a second-floor room of a merchant's house draws its icon at that storey only, its `hatch` head lies in that room, a V03 stair core of kind `secret` descends to the cellar where the `SiteReach` begins, every storey between re-cut and marked stale, and a house whose core cannot be placed bends the anchor to the lowest storey with `bend.site.storey`; the `inFrame` manor's and watchpost's decorations draw at every band (C14-01, C14-50); the hideout's only with Below drawn at the band holding its run; the island shrine's only with the island drawn; the manor's on its hinterland face at the neighbourhood and building bands and never at the city band; Find's **Go there** brings each context by view keys alone (0 events); hit testing outside the context never returns the anchor | PR |
| T-V14-14 | **Part E bar 14** (item 141 (d)) | on `B-25D`: the model digest, the records digest, the document digest and every per-arena digest identical under `flat`, `isometric`, `oblique` and `perspective` at every azimuth and exaggeration tried (1, 1.5, 3), before and after a projected session of pans, zooms, band switches, cutaways and an `undo`; `projection` absent from every digest input and from every export's model | PR |
| T-V14-15 | **Part E bar 15** | on `B-25D` at every band and family, 2 000 screen points per view: `hitTest25`'s address equals the flat view's `pointLocate` (V09's hit stack) at the returned model point on 100 %; a roof click selects the building, a storey slab's floor its room, a cutaway void's floor its element, the ground the ground's stack; handles project and a plan drag moves in the plan; a vertical drag on a storey slab maps to `storeys/groundCm` or `storeys/upperCm` within V02's range (C14-25) | PR |
| T-V14-16 | **Part E bar 16** (M9, M10) | the registry lint: every drawable record kind of the base's and the volumes' registries has a `ZDecl` row — base + top, surface, or flat with a reason — and the list of flat kinds holds no unexplained entry (the lint fails CI on a kind without a row, `W_Z_FLAT_UNDECLARED` never fires on the goldens); `verticalEnds(id)` returns both ends with elevations for every `AccessPoint`, `UndergroundLink`, `VerticalLink` and stair core of `B-SITE` (M10), the lower below the upper — a `site`-sourced access's under end from `SiteReach.floorCm` without opening the site document, a candidate card's both ends at the anchor's floor with `W_SITE_NO_LEVEL` (C14-24); the chimney, sky access, outfall, furniture, Works and castle-ward rows present, V13's kinds excluded by name (C14-41) | PR |
| T-V14-17 | **Part E bar 17** | on `B-25D` at the building band, every building whose plan rung exists: its per-storey slabs are drawn from the plan the flat view draws — the same `Plan` record and elaboration hash, the model byte-identical — and a `cutaway.storey` removes exactly the slabs above; the slab count equals the storey count; the visual-regression goldens of the projected view in every shipped sheet (`ink`, `lit`, `hatched`, `parchment`, `bw-print`, `night`, `painterly`) at each band, day and night, the loader refusing no sheet | milestone |
| T-V14-18 | the clerk; **Part E bar 10's site and encounter half** | on `B-SITE` and `B-CROP`, V10's `why` for a site, a unit and an encounter answers "why is this here", "what caused this", "what changed" and "what if" from recorded reason chains alone: the chain test walks unit → layer → programme → request → context and fails (a planted missing `reason`) when a link is absent; every word a catalogue key; at `public` no withheld id or fact; after a load, an undo and a redo every answer equals the one before (the river's and the settlement's halves are V13's) | PR |
| T-V14-19 | promotion (item 132 (a)) | on `B-CROP`: **Keep this** as a place makes one `HoodPlace` at the crop's centre with the DM's name and clears the key; as a site makes one card whose request and **attachment** are derived from the crop (the kind and attachment by the profile and items on 100 % of the fixture's twenty cases as V14 §3.13 (d) says: a street-corner ambush a `camp` of attachment `ground`, never refused or bent into a building; C14-09), its items the occupant layer, its lifecycle `persistent` with the event's cause; undo returns the items to the key and removes the card; a promotion inside a site document is a `setSiteRequest`; the transient crop before promotion changed no digest (T-V14-4 (e)) | PR |
| T-V14-20 | the two deletion verbs (item 133 (h)) | **Remove** on every `B-SITE` card leaves no card, anchor, access, occupant item, decoration or reservation, tombstones an adopted or `inFrame` site's units with `bend.site.removeAdopted` named and the S3 re-derive offered (C14-30), keeps the terrain pre-edit as a deletable trace, and undo restores every descendant with its id; a host-created card's remove is refused `dossier-owned`; **Destroy** keeps every id and face, sets `destroyed` with cause, draws the ruin, leaves the record in the log and the card, and `restoreSite` repairs it; the surface exception's building survives a remove as an ordinary building re-planned at its next click | PR |
| T-V14-21 | no-op pin | `item132.none` and `item141.flat` registered on V12 §3.7.8's engine: with no card, no encounter and `projection` `flat`, every golden's pixels, model digest and exports are byte-identical to the build before this volume, at every rung, under every preset (the parity presets included) | PR |
| T-V14-22 | **Part E bar 2** | a two-part site document (a dungeon of two levels) round-trips save → load → save digest-equal (model, records and document digests), resolves every reference form (`FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef`, `StretchRef` inside a batch) per part against a separately supplied key (K4), every cross-document id in it (its `SiteReach`, its card's `anchor`) carrying its namespace segment and every own id bare (C14-22), and its `nextSitePart` never decreases across an undone level | PR |
| T-V14-23 | **Part E bar 8's site half** | a counterfactual fork (V13 §4's) of a `B-SITE` document with `destroySite`, `floodSite` and a `setSiteRequest` applied, inspected by the clerk's `scratch` (§11.2) and discarded: the canonical package byte-identical; a `siteState` "what if" answered from the fork never writes | PR |
| T-V14-24 | performance | (a) V14 §6's rows on `B-CROP` and `B-SITE` at CITY (PR) and METROPOLIS (nightly): the crop's first frame ≤ 100 ms and complete ≤ 300 ms p95, every first open within its row, the projected tile build ≤ 1.6 × the flat, the GPU frame inside R12-9's bounds at the metropolis rung at the city and building bands, the settle inside its bound, hit testing ≤ 0.5 ms; (b) the comfort level (g item 119; V12 §3.15.9's wait timer): a `vast` dungeon's first open, a site's every-scene VTT export, the 2.5D picture export of a METROPOLIS and an `adoptSite` over a CITY each complete within 10 000 ms p95 from the click, progress named within 1 000 ms, no empty frame; scope invariance of the crop across rungs within ± 20 % (R12-12) | PR, nightly |
| T-V14-25 | determinism | the site document's per-part digests, the card's vector and every reason record identical on the five engines and between the first open and a replay; a New random on a unit changes its geometry alone; two cards dropped in one document share no draw (their lineages differ by seq); a card re-materialized after an unlink gives the same `docId` and digests; a free site moved by V13's `setPlacement` keeps every per-part digest unchanged (C14-15) | nightly |
| T-V14-26 | edges | each row of V14 §3.14's edge table on its fixture — (a) SE1, SE2, SE4; (b) SE5; (c) SE3; (d) SE6; (e) SE10 — gives the row's outcome and reports its rung, never a crash, a hang, lost data, a silent wrong result or a whole-site or whole-crop retry | PR (fixtures) |
| T-V14-27 | combinations | each row of V14 §3.14's combination table — (a) SC1, (b) SC2 — an adopted or `inFrame` site: a catacomb grown into a unit at a shared depth takes one `breach` link per meeting pair in the growth's commit (V04's T-V4-80 (k)'s pattern); an attached site: the growth stops at the card's envelope with `blockedBy: 'site'` and `W_SITE_NEAR_VOID`, no breach, the site document untouched (C14-10), (c) SC3, (d) SC4, (e) SC5 — at every rung it names | nightly, PR (fixtures) |
| T-V14-28 | the grammars and the rejections | every shipped grammar expands to its core on 100 % of 500 seeds within its caps; a fort's entrance-to-core paths carry ≥ its `defensiveDepth`; a mine's graph is a tree but for its loops; a cave's loops ≥ 1 at `medium`; the structural rejections hold as a lint: no code path of `@plat/sites` partitions space by recursive bisection, packs rooms before assigning roles, or chooses cells by local compatibility (three planted implementations fail the lint's call-graph check) | PR |
| T-V14-29 | the occupancy abstraction (item 132 (c)) | on `B-CROP`: every `OccupancySummary` reads its row, its headcount range from the households, capacity and week alone, never a person; a festival week multiplies patrons by its row; a garrison reads the host's strength; `derivePerson` is never called by the crop (T-V14-4 (e)'s spy) | PR |
| T-V14-30 | the surface exception (item 133 (c)) | an `urbanSurface` drop of a tower on `B-SITE`'s CITY places one building through `assign` + `placeAt` within §7.3 item 8's budget, with `floors` the request's, its plan's rooms the site programme's (the core the class row's main room, a `secret` unit a concealed room), its basement storeys the request's `levelsBelow` up to the gate's cap and, beyond it, a site document whose anchor sits on the lowest basement storey with a `hatch` access — the card's `document` present in exactly that case (C14-26); `Assignment.site` names the card; the plot is a plot like any (S10b's, S11's and V03's bars green on it) | PR |
| T-V14-31 | lifecycle / determinism (C14-03) | opening and closing every `B-SITE` card — the icon's click, the clerk's `open`, an export naming the site, a host event that needs its geometry — in two orders and on two machines changes no host model digest, records digest, document digest, log entry or arena; the derived block alone grows, and after a reload it is rebuilt byte-identically; `dropSite`, `setSiteRequest`, `moveAnchor`, each conversion and the secret toggle are the only events that move the host's digest | PR |

**The owner's panel** (§13.6 without a reference; V12 §3.9.1's `PanelSpec` V14-P, stated here once): at SE6's exit
the owner rates, blind to which is which, SOLO 24 — six sites (a fort, a temple with its crypt, a cave, a mine, a
hideout, a four-layer dungeon) each at `medium`, shown as the site view's ground and one level, plus six encounter
crops (a corner, a tavern, a square, a sewer junction, a cavern chamber, a field) — on `legibility`, `realism` and
`playability` (does the crop read as a battle map at the table); and at V4's exit SOLO 12 — the golden CITY and
VILLAGE under the three families at exaggeration 1.5, day and night, with the flat view beside each, shown and never
rated — on `legibility` and whether the projection reads as the same town; an unrated panel follows §13.6 (7).

## 8 Build plan

**Where it slots (J-V14.34; §16's staged-milestones table gains three rows, BCR-V14-20).** Three milestones in the
brief's order (`OWNER-BRIEF` §9): **M-ENC — the encounter crop**, after M1 (the viewable town) for everything but
the interiors, which land with V03's P1 (M6-P, after M4) and the occupancy with M4b's content module; **M-SITE** —
world sites in two halves: **M-SITE-A**, the attached kind (a crypt under a church, a cellar complex, a hideout off a
sewer) after V04's M6-U (its access generators, parts, records and figure-ground), then a small fort's levels; and
**M-SITE-F**, free-standing sites with their ground, siting, destinations and adoption, after V13's W1 (the charter
and placement) — the attached half may run beside M6-P and V13's W1, the free half beside V13's W2; **M-25D — the 2.5D
renderer**, after M4 (the hardened render tier and the incremental path), beside M5. Staffing per the owner: rulings
on the Fable seat, building and verification on Opus seats. Prices are expert estimates (PLAUSIBLE); the total is
this volume's own line, outside §16's first total, computed once by the coherence pass (item 568's rule).

| step | content | exit (executed, not asserted) | est. (pw) |
|---|---|---|---|
| **SE0 — spike** (risk retirement, at M-ENC's start) | E1's resolve and E3's crop on B-CITY-lite; the owner-less transient arena (BCR-V14-4) opened over a crop's rectangle minus twenty rings; E4's items on it; V03's plan completion timed on twelve buildings where M6-P's P1 exists, else the shells; G4 + G5 (b) on a `vast` cave and G5 (d) on a `vast` mine on a scratch level, timed | the crop's first frame ≤ 100 ms and complete ≤ 300 ms p95 at CITY; the arena's open ≤ 2 ms; the `vast` cave and mine within V14 §6's rows; T-V14-1 green on 20 addresses; the register check (below) | 0.75–1 |
| **SE1 — the in-town crop (M-ENC)** | E1–E3 whole (every profile row; the contexts; the extent rule; the grid origin), E4's arena and derived items, the `encounter` shared view key and the DM's items, the crop view (V14 §5.3), the clerk's `encounter` section; E2's interiors when V03's P1 lands (a registry lookup: without the plan rung the crop draws shells and reports `W_CROP_INCOMPLETE`); the occupancy abstraction with its table when M4b's content lands | T-V14-1, T-V14-3, T-V14-4 ((a)–(c), (e)), T-V14-21's `item132.none`, T-V14-24 (a)'s crop rows, T-V14-26 (a), (d), T-V14-29; the register check | 2.5–3.25 |
| **SE2 — the VTT crop scope** | `ExportOpts.vtt.crop` and the stable grid origin (BCR-V14-8); the scene set per crop; the transient items as objects, the occupancy notes; the research seat's re-verification of the Universal VTT and Foundry schemas with the profile's version pin (item 136 (c)) | T-V14-11 (its crop clauses), bar 11 whole; the pin recorded; the register check | 1–1.5 |
| **SE3 — the anchor, the icon, the secrets (M-SITE-A)** | `WorldSite` (candidate cards), `SiteAnchor`, the access record of source `site` (BCR-V14-1, -2), `dropSite`'s attached form with its dry run, G1 and its table, G2's resolution, the icon in its context with the three cues, the `siteOpen` switch, the site panel (V09), V08's reveal path for `revealed`, the `Layer` `site` and `nextSitePart` (BCR-V14-3), migration | T-V14-2, T-V14-5, T-V14-12 (b), (c), T-V14-13, T-V14-20's attached clauses, T-V14-26 (b), (c); the register check | 2–3 |
| **SE4 — topology and embedding** | G4 whole with every shipped grammar; G5 (b) natural, (c) rock-cut, (d) mine, (e)'s below-ground built level, (g) vertical links, (h) the measure and the tactical check; the site document's materialization on first open; the site view (V14 §5.2) over V04's programs with the new `ChamberKind`s, the roles' cues, the layers' tints; G6 with the provisional classes (V13's classifier called when it lands); `setSiteRequest` with held units; New random on a site, a level, a unit; the per-level exports; the rejections' lint | T-V14-6, T-V14-10 (a) (the transforms' part after SE5), T-V14-22, T-V14-25, T-V14-26 (e), T-V14-28, T-V14-24 (a)'s attached rows; V04's hook bars green on `site` parts (T65-6's isolation pattern); the register check | 5–7 |
| **SE5 — condition, the surface exception, editing, the clerk** | G7 whole with the lifecycle table, the host-word table, `SiteDamageRow`, the two deletion verbs and every conversion, the occupant layer; G8 (c)'s surface exception through `assign` + `placeAt` with `Assignment.site` and V03's programme override (BCR-V14-12); `promoteEncounter`; the `site` why section and the reason chains; GeoJSON, glTF, CityJSON of a site | T-V14-10 ((a), (b), (d)), T-V14-18 (its site half), T-V14-19, T-V14-20, T-V14-23, T-V14-30, T-V14-27 ((b)–(e)); the owner's panel V14-P's site half offered; the register check | 2.5–3.5 |
| **SE6 — free-standing sites (M-SITE-F)** | G3 whole over V13's score with the purpose weights and the two added terms (V14 §11 Q2), the terrain pre-edit under V13's verbs, the frame and the charter, G5 (e)'s ground composition (S1, S12a/S12b, S7, S10/S11, V03 on the site's ground) and (f); the `worldSite` decoration and destination (BCR-V14-13); G8 (e) adoption with V13's P5 and the hand `adoptSite`, the reservation claimed first; G3 (d)'s pull classes; the robbing relation with V06; the world-map encounter context (E1's `world`) over V13's facts | T-V14-7, T-V14-8, T-V14-9 (bar 6), T-V14-10 (c), T-V14-27 (a), T-V14-4's world clause, T-V14-24 (b)'s site waits; the panel V14-P's site half rated or offered (§13.6 (7)); the register check | 3.5–5 |
| **V0 — spike** (at M-25D's start) | R2's transform and depth sort on one CITY tile set in isometric; the projected tile build timed against the flat at CITY and METROPOLIS; the GPU frame at the city band at the metropolis cap; the memory of the second tile set | the tile build ≤ 1.6 × the flat; the frame inside R12-9's bounds; memory ≤ 1.3 ×; each fallback of V14 §6 triggered by the measurement or not | 0.75–1 |
| **V1 — the projection and the massing** | the `projection` view key and V09's switch (flat the default; BCR-V14-7), R2 whole (the three families, azimuth, exaggeration, the depth key, the projected tile keys, labels on tops), R3 (1)–(2) (draped terrain, water planes, extruded massing, walls, decks, trees by band) with the style family's rows in every shipped sheet, the `ZDecl` registry rows and `verticalEnds` (BCR-V14-5, -6) with the gap lint | T-V14-14, T-V14-16, T-V14-21's `item141.flat`, T-V14-24 (a)'s tile and frame rows at CITY; B-ZOOM role continuity under each family; the register check | 2.5–3.5 |
| **V2 — slabs, cutaways, islands** | R3 (3)–(6): per-storey slabs from V03's plans with `cutaway.storey`, the underground's cutaway bands, the islands' slabs (with V05 where landed; a registry lookup), the stacked-slab joins from `verticalEnds`, Find and the looks projected | T-V14-17, T-V14-15's slab and void clauses, T-V14-24 (a)'s building-band frame at METROPOLIS; the register check | 2–3 |
| **V3 — hit testing and the raise-or-lower edit** | R4 whole; `raiseLower` (BCR-V14-9) with its mapping table and refusals; handles and ghosts projected; V09's tools in a 2.5D view | T-V14-15, T-V14-24 (a)'s hit row; B-EDIT sequences in a 2.5D view equal to the flat view's digests; the register check | 1.5–2 |
| **V4 — the picture export and hardening** | the 2.5D picture export (§11.1); the goldens in every shipped sheet; performance at METROPOLIS with the comfort-level runs; the owner's panel V14-P's view half | T-V14-17's goldens, T-V14-24 (b)'s view waits; the panel rated or offered; the register check | 1–1.5 |
| content | the kind rows, grammars, extent rows, purpose weights, lifecycle and occupancy rows, the damage rows, the projection rows, the naming slice `site`, the catalogue's `info.site.*`, `info.unit.*`, `info.encounter.*`, `bend.site.*`, `refuse.*` lines (English, own), the icons' glyphs | reviewed by the clean-room scanner (§17.1); every cell with provenance; the register check | 0.75–1 |
| **total** | | | **26.75–37.25** (M-ENC 4.25–5.75 with SE0; M-SITE 13–18.5; M-25D 7.75–11; content 0.75–1); owner question Q3 |

**Dependencies.** SE1's interiors wait on V03's P1 (a registry lookup; the crop draws shells until then); SE3 waits
on M6-U's U3b (V04's dig generators, parts, `ChamberKind`, the figure-ground) and M5's W15 for a close-up's context
(the anchor on a hinterland face is a ground face in any case); SE4 waits on nothing new but SE3; SE5's surface
exception waits on M6 (V02's massing) for `floors` beyond the base's heights and on M6-P for the programme override
(until M6-P the surface site is a building of its class, reported); SE6 waits on V13's W1 (the charter, placement)
and W6 (the score) — until W6 lands a free-standing drop takes a point only; V2's islands wait on M6-sky (a
registry lookup: no island, no slab); V0–V4 wait on M4's render tier and on nothing of V13 (V13's world view's
projection is V13's own, reading R2's transform through `@plat/render`, V14 §10.2). The site-generator survey the
brief names (unsurveyed tools) is **not** a dependency: SE4 is designed from first principles; a later survey may
file findings against V14 §9's rejections (V14 §11 Q4).

**The register at each exit** (X-V12-16; V04 §8's pattern): every step that lands a registry table of this volume,
or a calibratable column of one, exits with `plat calibrate register --check` green over the cells it lands — their
entries from V12 §3.11's default line (`--defaults --milestone <the step's id>`), this volume writing no register
line of its own (J-V14.35): SE1 lands `sites.extent`, `sites.crop`, `sites.occupancy`; SE3 `sites.admissibility`,
`sites.kinds`; SE4 `sites.grammar` (not calibratable), `sites.embed`, `sites.damage`; SE5 `sites.lifecycle` (not
calibratable); SE6 `sites.purpose`; V1 `sites.view25` and the sheets' projection rows (rows of the base's style
tables, their columns already bound). No reference owns the subject, so the default line's corpus stage is the only
outside measurement most columns can get, closing `fixed` with "no admissible frame" at M-CAL (or `M-CAL/sites`
when a step lands after it) while the V14-P panel rates the whole.

**Risks, in order.** (1) The crop's completion time where twelve plans are absent from the cache (SE0 measures;
fallback (3) of V14 §6). (2) The natural cave's outline not matching the graph (unmatched components, dug chambers
looking forced): spike (a). (3) The embedding ladder dropping units often enough to miss the vector (T-V14-6's
95 %): spike (a), the tolerances calibratable. (4) The 2.5D frame at the metropolis cap (V0; fallbacks (1), (2)).
(5) V13's score lacking the two terms (V14 §11 Q2; the fallback: concealment as 1 − overlook, one approach from the
route count — both readable from V13's distance fields). (6) The surface exception's programme override landing
before M6-P: the site building is a plain building of its class until then, reported. (7) Legibility of the site
view's role cues and layer tints (the panel; the cues switchable). (8) The host's site record (V14 §11 Q2's second
half): until SettlementForge carries one, every site is map-tier, which loses nothing of the map.

**Risk spikes.** (a) At SE4's start: `NaturalCave.lay` and the ladder on 50 `medium` and 20 `vast` caves and dungeons —
the share of dug chambers ≤ 20 % and the vector met on ≥ 95 %; pre-decided fallback: `cave.threshold` 0.48 (a
larger void) and the hex lattice's spacing × 1.2. (b) At V0: the depth sort's correctness on a fixture of stacked
slabs, decks and islands against a reference z-buffer render — 0 mis-ordered pixels; fallback: the WebGL depth
buffer made the only path and the canvas backend limited to `isometric`.

**Evidence that ends each step** is the step's bars executed and quoted, the declared shifts recorded (§13.3), the
register check green over the cells it lands, and `docs/lane-events.log`'s LANDED line.

## 9 Decisions (each vetoable)

A decision another later one replaced or changed carries one mark: *superseded by* or *amended by* the governing
row, which keeps the reason. The owner deferred every decision to the session (2026-10-16: "i defer all decisiosn to
you"); each row below is vetoable.

| id | decision |
|---|---|
| J-V14.1 | chose one package `@plat/sites` for the site pipeline, the attachment, the adoption, the occupancy and the clerk's providers, registered in `@plat/layout`'s registry as `@plat/under` is, with the crop's view half in `@plat/app` and the 2.5D renderer in `@plat/render`, over spreading them through the base's packages, because each lands and versions as one unit and §14's dependency rule keeps the renderer and the app readers of records they never own |
| J-V14.2 | chose one operation with two retention policies and a promotion path — the crop a view (view keys, the elaboration cache, a transient arena), the site a document — over a stored encounter record or a site generator, because the owner's two kinds differ only in what is kept (item 132 (a)), a view costs nothing to discard and nothing to hash, and a promoted crop becomes an editable card rather than a frozen picture |
| J-V14.3 | chose a site as a `Document` of product `site` with its own arenas and a creation prefix holding its drop and charter, run by the G- stages calling the materializers as functions, over a site inside the host document's arenas or a product running the settlement's stage graph, because the city's plots must never move for a site (item 133 (b)), the settlement's stages carry invariants a site has no use for (the sewer's part 0, the undercity's bound, the tail's lotteries), and a document replays, exports and adopts as one unit (bar 2, bar 7) |
| J-V14.4 | chose the moment's occupancy as a headcount band from the households, capacities, the week and the festival (`OccupancyRow`), never §10.3's people, over summarising the people and their schedules, because the owner rules "never individuals" (item 132 (c)), schedules carry an hour (item 136 (a)) and the DM decides who is there |
| J-V14.5 | chose the crop's extent by a profile table (30–100 m) with the first matching row, the rectangle snapped outward to whole cells and the geometry never snapped, drawn in the sheet's own style with the grid and the role cues on, over a fixed radius or a tactical sheet of its own, because a corner and a square need different maps, a snapped geometry would differ from the town's, and a crop that reads as the town keeps one look |
| J-V14.6 | chose a persistent site as a card composed by the existing materializers — the hinterland unit, S7's enceinte, S10/S11's plots and site plans, V02's massing, V03's plans, V04's chambers and galleries with its cavern and quarry steps as functions — under a site policy, with three new materializers only (`NaturalCave.lay`, `RockCut.lay`, `MineExcavate.lay`) and ruination by V06's level, over a dungeon generator, because the owner names the composition (item 132 (f)), no second generator can be kept coherent with the town's rules, and every reused materializer brings its tests |
| J-V14.7 | chose the world grid — cells of the export's `squareM` from the arena's origin, the crop's origin its snapped south-west corner — as the stable grid origin, over an origin at the click or the crop's centre, because it depends on the address alone, two crops tile edge to edge, a storey scene shares its ground scene's cells, and no model fact is added (item 136 (b)) |
| J-V14.8 | chose the request record as `Stated<T>` fields resolved derive-before-invent by an ordered rule table with one draw (the age's band, last), the programme as data and the complexity as a measured vector with units and tolerances, over sliders or a blind roll, because the owner forbids sliders (the brief's §7), a derived field explains itself (its rule in `by`), and a vector a test can assert and the clerk can read |
| J-V14.9 | chose the vector's goal entries (`units`, `storeysAbove`, `storeysBelow`, `entrances`, `loops`, `chokepoints`, `defensiveDepth`, `openShare`, `concealedShare`, `floodedShare`, `historicalLayers`) with the rest consequences, and `damage` a reading never persisted in `measured`, over asserting every entry, because branching, area and hazards follow from the goals and the geology, and damage is the drawn week's |
| J-V14.10 | chose an attached site as a separate document with exactly one anchor and one access record in the host, the connector a passage unit of the site's first level rather than a `dug` system of the host, over writing the site's levels as the host's underground parts, because the host document must gain no geometry for a site (item 133 (b)), V04's tail would otherwise run over it, and one access is one knowledge flag and one condition (the owner's "one access record") |
| J-V14.11 | chose a cave attached to a terrain feature in the country as a free-standing site whose placement names V13's feature, and a site inside a site's frame as a site of its own, over a third attachment mode, because two modes and the surface exception cover every case the owner named and a feature is a placement target, not a host document |
| J-V14.12 | chose the three secret states on the anchor as `SecretState` with `knownTo` derived from them and the party's `places` carrying `revealed`, the admission function unchanged, and the icon's ring as the second cue, over a fourth knowledge tier or a new admission column, because §9.2's one admission already withholds a secret place not in `places` and admits a listed one, so the owner's three words are states of one place, not new rules |
| J-V14.13 | chose `SiteKnowledge.reached` as the units the party reached, written by a host event or the DM's mark, over inferring reach from the party pictures, because the party's movement is the host's fact (V08 §3.14) and the map never infers knowledge |
| J-V14.14 | chose grammars as data for programme expansion, budgeted by the target vector, with binary space partition, room-and-corridor and wave-function collapse rejected for structure (admitted as textures only where named), over any of the three as the structure, because a grammar gives each unit a role and a reason the clerk can read (the world-fact contract), a vector can budget it, and a cut, a packing or a local-compatibility choice cannot carry a reason chain (item 133 (g)) |
| J-V14.15 | chose the history superposition as layers laid in chronological order by their kinds' materializers, the topology expanded layer by layer too, with the layers' ages spaced from the site's age by the event kind, over one materializer per site or a single layer, because the owner's classic dungeon is geology, construction, use, abandonment and reuse (item 133 (g)), and a later layer that reads the earlier one's geometry is what makes "a wall fallen through into the old cave" possible |
| J-V14.16 | chose natural caves by a noise outline over the envelope, biased toward the graph's target points, with the medial axis of the void as the passages and `astar` digging where the void has no path, cellular automata an optional raster pre-pass off by default, over a random walk, a cellular-automata structure or a pure skeleton, because the coast's own routine gives organic outlines (§4.2 S1 (2)), the medial axis is the kernel's validated service, the graph keeps the rooms where the purpose wants them, and the automata are texture |
| J-V14.17 | chose Voronoi bays round an aisle for crypts and cisterns, rectangles on a module along a spine for axial carved rooms, growth from the parent for clusters, and a turn at every chokepoint for approaches, over one carved layout, because each is the shape its purpose makes and each is deterministic over the kernel's `voronoiEdges`, `obb` and `lir` |
| J-V14.18 | chose agent excavation for mines — agents walking from a landing, turning toward the ore gradient with a drawn share, stopping at the envelope or an existing drift — over a grammar-placed drift plan, because a mine follows what was dug for and the ore field is the geology the site stands in (V13's resources or S1's mining cells) |
| J-V14.19 | chose the site's above-ground built part as the base's own machinery on the site document's `ground` part (S7's trace over the envelope, S10/S11 on plots the policy cuts, V02's massing, V03's plans with the units as programme rooms), and a below-ground built level as a `site` part with masonry drawn by V04's `storey` program, over a built materializer of this volume's, because the plan programme already generalises to any room with a role (V03 §3.2) and the base's buildings bring their heights, roofs, entrances, basements and exports |
| J-V14.20 | chose tactical analysis as a check written to a report beside the vector, never a generator, over optimising sightlines or cover in the embedding, because an optimiser would overwrite the purpose's shape and the owner asked that the result be measurable, not steered |
| J-V14.21 | chose a kind whose policy lays buildings and whose `below` is `[builtLevel]` alone (a tower, a manor, a guildhall, a crypt under a chapel) to take its levels as V03's basement storeys through item 29 (b)'s gate with the request as an override, and every other kind or deeper request a `site` part linked by a `VerticalLink` from the lowest basement storey, over site parts for every level, because the owner's "floors and basements" is the existing storey and stair model (item 133 (f)) and a tower's cellar is a cellar, while a dungeon's level is a level |
| J-V14.22 | chose a dropped icon to create a candidate card materialized lazily on first open, costing one event and three records, over materializing at the drop, because the owner asked it (item 133 (h)), a DM drops many icons and opens few, and a candidate re-materializes from the card alone (V14 §3.15) |
| J-V14.23 | chose **remove** as the base's `delete` on the card under V13 §4's retcon verb (descendants without a cause go; the terrain pre-edit stays as the ground's own dated trace; a host-created card refused `dossier-owned`) and **destroy** as a `convert` under the event verb (the lifecycle `destroyed`, the plan kept, a ruin and a record left), over one delete with a flag, because the owner names two verbs with two meanings (item 133 (h)) and the two edit verbs are V13's one rule for every dated change |
| J-V14.24 | chose condition as a transform read over the persisted plan at the drawn week — V06's level, V03's one comparison per element, `SiteDamageRow`'s kinds for carved and natural elements, collapses closing units and breaches opening edges as `UnitEdge` changes in the event's commit — over a reroll or a stored damaged plan, because the owner rules it (item 134 (b)), "the same wall always falls first" is §6.3's fixed-key threshold, authored edits then survive every state, and a restore draws the pristine plan byte for byte |
| J-V14.25 | chose to keep a card whose host record is removed — at `map` tier, its host fields cleared, reported — over removing the site, because the underground and the world are never torn down by a dossier change (item 11; V04's J-V4.99 for a ruin), and the host's word to remove is its own event the DM applies |
| J-V14.26 | chose that a dropped site materializes identically under the parity presets, over suppressing it there, because a card is declared (the DM's word, §7.2) and the parity metric is invisibility with nothing dropped (T-V14-21), not the refusal of an author's act |
| J-V14.27 | chose the locality rows of V14 §4.7 — an attached drop touching the card, the anchor, the access and the host building's elaboration state only; a programme edit re-laying only the un-held units; an adoption touching the reservation's faces and the merged ground — over re-deriving a host around its sites, because bar 6 demands that nothing outside the dirty set reshuffles and the city's plots never move for a site |
| J-V14.28 | chose the occupant layer as persisted `occupant` elements of the site (barricades, camps, fires, the use's furniture, lights) laid by `occupySite` and removed by `vacateSite`, and the same items as transient ones in a crop over the site, over keeping occupants in the view key, because an occupied site's state is a card fact the host reports, while a crop's own items are the DM's moment |
| J-V14.29 | chose a free-standing site's frame as V13's placement rectangle (the envelope's radius × 4, at least 120 m, for a site with a ground policy) under V13's charter with the envelope standing in for S6's perimeter in the hinterland unit, over a site with no ground or a full settlement frame, because a tower stands in its closes and a fort in its glacis, and the hinterland unit already lays fields round a perimeter |
| J-V14.30 | chose the edge and combination outcomes of V14 §3.14's two tables, stated once and barred by T-V14-26 and T-V14-27 — among them a `site` part never overlapping another part's elements at a shared depth, a catacomb's growth into a site unit opening one breach link as into any element, no site below an island, a click on water reading the nearest land — over leaving each to the general ladder, because each is a choice between defensible outcomes that a bar must fix |
| J-V14.31 | chose the 2.5D view as a render-tier projection family over the same document — the kernel planar, every drawable declaring base and top, surface, or flat with a reason (`ZDecl`), the projection per-viewer view state, the depth key painter's order with a WebGL depth buffer, stacked spaces as separate drawables joined by vertical links, the flat map the default — over a 3-D model, a stored elevation on the kernel or a replacement of the flat view, because the owner's rule and clarification say so (item 141; "i want both"), the model already carries every height (M9's table has no unexplained gap), and nothing enters the hash (bar 14) |
| J-V14.32 | chose `raiseLower` as one edit kind whose dry run maps the drag to the one attribute the model already stores for the drawable and target, the fold running that base event, over a new elevation record or a free vertical move, because every height the view shows is a stored attribute with its own range, locality and undo, and a raise that is not an attribute change would be an overhang (item 141 (b)) |
| J-V14.33 | chose hit testing by unprojecting the pointer onto the candidates' top, side and base faces in depth order and then asking the flat view's `pointLocate` at the model point, over a 3-D picking buffer carrying ids, because bar 15 demands the flat view's address and the flat hit stack already answers it for every tool, panel and clerk |
| J-V14.34 | chose three milestones in the brief's order — M-ENC after M1 (interiors with V03's P1), M-SITE in an attached half after M6-U and a free half after V13's W1, M-25D after M4 beside M5 — over one milestone after V13, because the in-town crop works on the viewable town today (bar 11's milestone), the attached site reads only M6-U's parts, and the renderer reads nothing of V13 |
| J-V14.35 | chose to bind every calibratable column this volume lands to V12 §3.11's default line and to write no register line of its own, with the register check at every exit, over lines of this volume's, because no reference owns the subject, the V14-P panel rates the whole, and a second line for one column fails the lint (V04's J-V4.117, the same reason) |
| J-V14.36 | chose to ask V13 for two score terms (`concealment`, `oneApproach`) and to fall back to 1 − overlook and the route count from V13's distance fields, over computing a viewshed of this volume's own, because the suitability score is V13's one score (the spine's rule: a purpose term plugs in, never a second score) |
| J-V14.37 | chose the pull classes of V14 §3.4 (d) as this volume's one table for V13's destination term, with the weights V13's, over weights of this volume's, because a settlement's siting is V13's and a site contributes only what kind of pull it is |
| J-V14.38 | chose the world-map encounter case as E1's `world` context over V13's facts, refused until V13's W1–W5 land, over a generic wilderness generator now, because the owner's "generic" means "nothing named there yet" (item 132 (e)), and a crop that invented terrain the world will later contradict would break item 135 (a) |
| J-V14.39 | chose the request's `floodedLevel` as a dated governing surface at that level's floor handed to V13's classifier, over a per-unit `flooded` flag, because item 137 (f) makes water a consequence of one surface and the classes then change under any later surface without an identity moving (bar 12) |
| J-V14.40 | chose the site document's `docId` minted from the card's lineage, over a fresh uuid, because a card unlinked by an undo or a lost file must find the same document again and two cards never share a lineage (V14 §2.8) |

## 10 Base change requests

Every request names the exact base heading, quotes the current text once, and gives the new text or mechanism; the
base is **not** edited here — the coherence pass applies them with volumes 13 and 14 (item 139 (d); file j's BCR-j
rows name the homes), numbered into the amendments series from 600 with V13's (the spine's rule), and this volume is
designed as if each were applied. File j's BCR-j5, -j6, -j9, -j10, -j11 and -j15 are the rows this volume fills.

### 10.1 Requests to the base

| request | base heading | the current text (quoted once) | the new text or mechanism |
|---|---|---|---|
| **BCR-V14-1** the anchor record and the card's registry row (item 133 (a); file j BCR-j5; M7) | §2.7 *the staged layers' records*; §2.8's entity registry | §2.7 lists the staged records (`Tunnel`, `UndergroundSystem`, `Gallery`, `Chamber`, `UndergroundLink`, `LightSource`, `HistoryHint`, `HistoryRecord`, the dossier's staged records) and §2.8's registry their rows; no anchor or site card exists ("M7 an anchor record reserved (item 133 (a))", item 140) | add `SiteAnchor` and `WorldSite` (V14 §2.2, §2.3) as staged records, schema-complete and empty until M-SITE, with registry rows (kinds `anchor`, `site`), their `ZDecl` flat with reason "furniture" (the anchor) and none (the card: no geometry), their lifecycle rows V14 §2.9's |
| **BCR-V14-2** the access record reaches a site document; its knowledge flag (item 133 (b); BCR-j5) | II.7.4 `AccessPoint` | `under: { part: number /* the underground part it reaches (§3.4; 0 the sewer network) */; element: Id …; at: VertexRef … }` and `source: 'neighbourhood'\|'basement'\|'system'\|'lifeline'\|'edit'\|'dig'\|'opening'\|'overlap'\|'crypt'\|'dossier'` | `under: { part; element; at } \| SiteReach` (V14 §2.3), `source` gains `'site'`, `AccessCause.rule` gains `'site'` (V04 §2.2's union); `knownTo` and `state` unchanged — the access's own flag and condition are the record's existing fields, read independently of the anchor's |
| **BCR-V14-3** the fourth `Layer` value, `nextSitePart`, the site product (item 134 (d); K1; BCR-j4) | §2.1 *Layers*; §2.2 `PlatKey`; §2.9 `Document` and the canonical form | "`layer ∈ {underground, ground, sky}` is a field on every geometric entity and every display-list item"; "the three part counters (`nextUndergroundPart`, `nextSkyPart`, `nextGroundPart`)"; `Recipe.product` `'hood'` (V01 §2.6) | `layer ∈ {underground, ground, sky, site}` — `site`: a world site's levels, one part per level numbered by `Document.nextSitePart` from 1 (no part 0), addresses `site<n>/kind:token`, level mapping §2.2 rule 1's underground mapping, drawn by §8.4's underground view on its own `LayerSpec` (`underView` admitted); the canonical form's four part counters; `Recipe.product` gains `'site'`; the kernel's `Layer` type (`types/ids.ts`) appended — K1's append-only test is the bar (bar 1) |
| **BCR-V14-4** the transient arena with no owner document (K9; item 132 (a)) | §3.4 *Transient arenas* | "`type TransientKey = { transient: true; owner: Id /* the entity whose derivation opened it */; n: number /* per call, never persisted */ }`" and "opened for one derivation call and gone at its end" | `owner: Id \| { view: Hash64 /* an owner-less arena: the view id that opened it — an encounter crop's key hash (V14 §3.13) */ }`; an owner-less arena is opened by a view, lives while the view does (released on the encounter's close, never at a derivation call's end), is never persisted, digested or frozen (the rule unchanged), and is read by `pointLocate`, `faceNeighbours` and §14's `view` as any; the kernel's stub row (`API.md` §8) admits the form at M6-P's build |
| **BCR-V14-5** z-completeness: `ZDecl` per drawable record kind (item 141 (c) M9; BCR-j15) | §2.8 *the entity registry*; §8.1 *the display list* | the registry declares each kind's record, lifecycle row and paths; no vertical extent is declared ("M9 z-completeness: every drawable record kind declares a base elevation and a top, or a surface, or is listed as flat with a reason", item 140) | every registry row of a drawable kind carries `z: ZDecl` — `{ base: Reading; top: Reading } \| { surface: Reading } \| { flat: true; reason: string }` with `Reading` a path or a derived function name — the table of V14 §5.4 the shipped rows; a drawable kind without one fails the registry's CI test (T-V14-16); §8.1's display-list item gains `baseCm` and `topCm` columns filled from it (unused by the flat renderer) |
| **BCR-V14-6** elevation at both ends of every vertical link (M10; BCR-j15) | II.7.4 `AccessPoint`; §2.7 `UndergroundLink`; §2.6's stair core (item 28) | an access's `ground.at` and `under.at` carry no elevation; `UndergroundLink`'s ends `a`, `b` name parts and elements only | the derived reading `verticalEnds(id): { a: { elevationCm; at }; b: { elevationCm; at } }` declared in §2.7 for `AccessPoint` (the terrain or floor at `ground.at`; the element's floor at `under.at`), `UndergroundLink` (the two elements' floors), V03's stair core (its two storeys' bases) and V14's `VerticalLink` (its stored ends); read by §8's renderers, §11.1's VTT portals and the clerk |
| **BCR-V14-7** the projection as view state; the style family; the tile key (item 141 (a) M11; BCR-j15, -j11) | §2.9 *View state*; §8.2 `StyleSheet`; §8.8 *the tile key* | the view keys list (`storey`, `depthBand`, `knowledge`, `week`, `light`, …) holds no projection; `StyleSheet` has no projection rows; the tile key carries §8.8's view-state switches | the per-viewer view key `projection` (V14 §2.6; default `{ family: 'flat' }`; never in a digest, an export's model or the log); `StyleSheet.projection: ProjectionStyleRow[]` (V14 §5.6 (7)) resolved by §8.2's slot resolution in every shipped sheet; the tile key gains the projection, exaggeration and cutaway for the 2.5D tile set (the flat set's key unchanged); `LodBand` unchanged |
| **BCR-V14-8** the VTT crop scope and the stable grid origin (item 136 (b); BCR-j10) | §11.1 *The `.dd2vtt` profile*, *Scope*; §11.2 `ExportOpts.vtt` | "Scope: a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares"; `vtt?: { squareM?; pxPerSquare?; plainPng?; scene? }` | `vtt.crop?: { key: EncounterAddress }` — the open encounter's crop as the scope, its scene set `EncounterCrop.scenes` (the `site` level form added to `scene`'s union), and for every VTT export `resolution.map_origin` the scope's south-west corner in grid units from the arena's origin on the world grid (V14 §3.12 (5)) — the grid's origin derived from the address, never from the view; the profile's version pinned by item 136 (c)'s re-verification before M-ENC's SE2 |
| **BCR-V14-9** the raise-or-lower edit kind (item 141 (a); BCR-j15) | §7.1 `EditEvent`; §7.4's table | the union has no elevation edit; heights change by `setAttr` on their paths | `{ t: 'raiseLower'; id; target; deltaCm; mapped }` (V14 §4.2, §4.6) with its lifecycle row: create T9 `shape`'s vertical drag or the height field; read the mapped attribute; persist the event with its mapping; regenerate as the mapped event; undo the mapped event's inverse; migrate by the mapped event's row |
| **BCR-V14-10** the admissibility table's home (item 134 (a); BCR-j5) | §7.6 *editable tables*; V11 §3.1's registry (by V14 §10.2) | the registry's rows are V11's; no site table exists | the registry gains `tables/sites/*` (V14 §2.5: `admissibility`, `kinds`, `grammar`, `extent`, `purpose`, `lifecycle`, `occupancy`, `crop`, `embed`, `damage`, `view25`), editable by `editTable` with §7.6's validation, the admissibility row's `context` keys fixed, every other cell by its schema |
| **BCR-V14-11** links across layers; V04's overlap test over `site` parts | §2.7 `UndergroundLink` ("a link between elements of different parts"); II.7.6's connection graph; V04 §3.5.7 (a) | a link joins two underground parts; the overlap test runs over the underground's parts | a link's ends may lie on an `underground` part and a `site` part (the address keyed on end `a`'s part as today); V04's U-ACCESS overlap test and the excavation reading read `site` parts of the same document as parts (an adopted site's units start `accessible` through their entrances); `ChamberKind` gains `naturalChamber`, `rockCutRoom`, `stope`, `builtRoom` with V04 §5.2's programs as V14 §5.2 maps them |
| **BCR-V14-12** the assignment path carries a site programme (item 133 (c); BCR-j5) | §7.7 `Assignment`; V03 §3.2 A1 (by V14 §10.2) | `Assignment { id; granularity; target?; dispersed?; criteria? … }`; A1 resolves the programme by the class-id rows | `Assignment.site?: Id` — the card whose programme rides as the building's programme; V03's A1 reads it first (the card's `programme.rooms`); S11's mutator and `ClassRules.pick` read the card's `storeysAbove` and `levelsBelow` as overrides (`editedPaths`-style, kept by every later run) |
| **BCR-V14-13** a world site as a reservation and a destination (item 134 (c); BCR-j4) | §2.5 `Reservation` (`kind: 'castle'\|'plaza'\|…`); §4.12 `Destination` (`kind: string`) | the reservation kinds listed; destinations are S3's typed ones | `Reservation.kind` gains `'worldSite'` (claimed first as the castle's, §4.2 S3 (2), (8), with `site: Id`); `Destination` admits `kind: 'worldSite'` with `pull: 'protection'\|'market'\|'sacred'\|'stone'\|'none'` (V14 §3.4 (d)'s table) read by V13 W6's destination term and S4's router |
| **BCR-V14-14** the `site` concern and the stage ids (§6.1; BCR-j13) | §6.1 *RNG and stream design*, the concern registry and the stage ids | the concerns and stage ids listed (`S0`…`S15`, `EVO_*`, `VS*`, `STAGE_VIEW`, the tail's) | the concern `site` (the site pipeline's draws, V14 §3.15) and the stage ids `G1`…`G8` and `E1`…`E4`, appended; no existing key moves (bar 1) |
| **BCR-V14-15** the site edit kinds and conversions (item 133 (h); BCR-j6) | §7.1 `EditEvent`, `ConversionOp`; §7.4's table | the union and the ops listed | `dropSite`, `setSiteRequest`, `promoteEncounter`, `adoptSite` (V14 §4.2) with their lifecycle rows (V14 §4.2–§4.5); `ConversionOp` gains `destroySite`, `occupySite`, `vacateSite`, `damageSite`, `restoreSite`, `repurposeSite`, `expandSite`, `collapseUnit`, `breachUnit`, `floodSite`, `drainSite`; the `setAttr` paths of V14 §4.2 |
| **BCR-V14-16** F-SITE, the warnings, the lifecycle states (§5.2, §5.4, §2.8; BCR-j6) | §5.2 *Failure classes*; §5.4's `stages[].warnings`; §2.8 `Existence` | the classes listed (F-NET, F-VOID, F-UNDER, F-PLAN …); the warning codes; the existence values | F-SITE with V14 §3.14's ladder; the codes `W_SITE_*`, `W_CROP_*`, `W_Z_FLAT_UNDECLARED`; `WorldSiteLifecycle` beside `Lifecycle` on the card with its mirror rule (V14 §3.8) — `Existence` unchanged |
| **BCR-V14-17** the budget rows | §12.10 *The budget register*; §12.5–§12.7 | the register's rows R12-1 … | R12-V14-1 – R12-V14-6 (V14 §6) with their homes, measurement, pass bars and pre-decided changes |
| **BCR-V14-18** the package | §14 | the package list ends with `@plat/app`'s line; `@plat/world` is V13's request | `@plat/sites` after `@plat/under` and `@plat/world` with V14 §1.1's dependency rule; the encounter module in `@plat/app`; `@plat/render/projection` |
| **BCR-V14-19** the `encounter` shared view key and `siteOpen` | §2.9 *View state* | the shared and per-viewer keys listed | `encounter` (shared, V14 §2.6), `siteOpen` (per viewer) |
| **BCR-V14-20** the milestones | §16 *The staged milestones, in the owner's order* | the staged rows (V-M0 … M-SF) | the rows M-ENC, M-SITE (A and F) and M-25D with V14 §8's starts, companions, exits and prices |
| **BCR-V14-21** the knowledge layers' words (item 133 (e); BCR-j9) | §9.2 *The knowledge filter*; §11.2 *Knowledge* | the three tiers and `places`; no DM-only / revealed / discovered wording | one sentence at §9.2: a place's `SecretState` (V14 §2.3) is read through `knownTo` and `places` by the same admission function; `discovered` raises `knownTo` to `local`; the legend's second cue for the three states (§9.5) |
| **BCR-V14-22** the bars of V14 §7 (every T-V14 test) | §13.2 | the volumes' take-over rows | the T-V14 rows and the fixtures `B-SITE`, `B-CROP`, `B-25D`; the no-op pins `item132.none`, `item141.flat` on V12 §3.7.8's engine |

### 10.2 Cross-volume requests (to the siblings; not base changes)

| to | request | V14's reader |
|---|---|---|
| V13 | the two score terms `concealment` and `oneApproach` (or their fallback named in J-V14.36); the destination term's reading of `pull`; `FrameCharter` for a non-settlement frame; the classifier's call for a unit with a dated `floodedLevel` surface; `ReasonRecord`'s declaration cited by V14 §2.7; the world document's event index for E1's `world` context; the world view's projection reading R2's transform from `@plat/render` | V14 §3.4, §3.7, §3.10, §5.5 |
| V03 | A1's first match on `Assignment.site` (the card's `programme.rooms`); the access head for a `site`-sourced access (a trapdoor or cellar stair in the anchor's room); `Storey.heightCm`'s range for `raiseLower`; the plan's per-storey scene path for a site building | V14 §3.9 G8 (a), (c); §4.6; §5.3 |
| V04 | the overlap test, the excavation reading and the per-band exports over `site` parts (BCR-V14-11's V04 side); the cavern and quarry steps callable as functions on a `site` part; the four `ChamberKind`s' programs; the dig generators called by `SiteAttach.attach`; the buried step's adoption of a robbed site's levels by `reusedBy` | V14 §3.6 (b)–(d), §3.4 (d), §3.9 (a) |
| V06 | `decayLevel` over a card's lineage; the robbing relation over an adopted or near ruin; the epoch's call of G7 with cause `epoch` over an adopted site; a `siteState` op's place in the hand forms | V14 §3.8, §4.3 |
| V07 | the reservation of kind `worldSite` read by the village's siting; the hand-offs carrying cards and anchors | V14 §3.9 (f), §3.1 |
| V08 | a site's host record (`WorldSiteRecord`) in the dossier row sets with DR-V14-1; the party's reach as a host event; the reveal of an anchor through the party's `places`; a site's derived capacity as a derived fact; the status words' normalisation | V14 §1b.5, §2.3, §3.8 |
| V09 | T6 **Drop a site** with the site dialog, **Encounter here** and the crop's palette, the `projection` switch (flat the default), the Site working layer and the level chip, the site panel, the icon's hit entry, `siteOpen`'s document switch, the catalogue keys of V14 §4.9 | V14 §4.1, §5.1, §5.3, §5.5 |
| V10 | the `site` and `encounter` sections' rows and the chain test (bar 10) | V14 §4.9 |
| V11 | the registry rows for `tables/sites/*` (BCR-V14-10) with V14 §2.5's schema and shipped values; the naming slice `site`; the decay ranges of `SiteDamageRow` adopted beside its `states` rows; the kind rows' `icon` glyphs in the symbol catalogue | V14 §2.5, §5.1, §5.2 |
| V12 | the fixtures `B-SITE`, `B-CROP`, `B-25D`; the panel V14-P's `PanelSpec`; the no-op pins; the measures `site.vector.*`, `crop.firstFrameMs`; the register's default-line entries at each exit | V14 §7, §8 |

## 11 Owner questions

Only true owner decisions — money, licence, a capability across the SettlementForge boundary, or product order —
each with the session's recommendation under the delegation (J122's form); every other choice is a J-V14 row.

| # | question | recommendation |
|---|---|---|
| Q1 | **Product order:** the in-town encounter crop ships after M1 with shells and the VTT crop (bars 11, 13), its interiors arriving with V03's P1 — or waits whole for M6-P? | ship after M1: a DM gets a gridded, walled crop of the town at once, and the interiors appear in it when the plan rung lands (a registry lookup, no rework); the brief's §9 asks for the crop "on the viewable town" |
| Q2 | **A capability across the SettlementForge boundary:** a host record for world sites (`WorldSiteRecord` — existence, kind, name, owner, status, position; the party's reach as an event; the reveal of an anchor) in the dossier (V14 §1b.5; V08's row) — to be scheduled in SettlementForge's own program | yes, with V13's host changes (item 138 (e)): until it lands every site is map-tier and nothing of the map is lost; the record's shape is V14 §2.2's `WorldSiteHost` and V08 §2.8's custom-record form |
| Q3 | **Money:** the cost, 26.75–37.25 person-weeks across three milestones (V14 §8) | accept; the encounter crop's 4.25–5.75 pw buys bar 11 on the viewable town, the sites' 13–18.5 pw the owner's items 132–134 whole, the view's 7.75–11 pw item 141's bars 14–17 |
| Q4 | **Product order:** the site-generator survey (Dungeon Alchemist, DunGen, Donjon, Dungeon Scrawl, RPG Map Editor; observation-only, a research seat) before SE4, or after it as a critique of V14 §9's rejections? | after SE4, as a critique: the design stands on the kernel's own services and the plan programme, nothing of theirs is needed to build it, and a survey read first would risk the clean-room's chain (§17.1) for a design that must not copy them anyway |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed evidence this volume was written from):
* The owner's words of 2026-10-16 are items 131–141 of `docs/AMENDMENTS-2026-10-16j.md`, read whole, with the
  clarification on item 141 ("i'm not replacing 2d with 2.5d. i want both"); the brief
  (`docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`) read whole, its Part A rows M7, M9–M11, K9 and K13
  and its Part E bars 2, 6, 8, 10–12, 14–17 carried here; the three proposals read whole, `proposal-sites-encounters.md`
  restated in full here and `proposal-hydrology-water-state.md` §4 cited to V13 only.
* The base as files f and g apply it: §2.1–§2.2, §2.6–§2.9, §3.4, §4.2 S3, §4.7, §4.9, §4.12, §6.1, §6.3, §7.1,
  §7.3, §7.4, §8.2, §8.4, §9.2, §9.5, §11.1, §11.2, §12.6, §12.10, §14, §16, II.6, II.7.4 were read in the base text;
  the kernel's public surface (`plat/packages/kernel/API.md`) read for what exists: the transient arena is a stub to
  M6-P (`API.md` §8), `medialAxis`, `voronoiEdges`, `delaunay`, `skeleton`, `hexLattice`, `noiseStream`, `fbm`, `astar`,
  `obb`, `lir`, `corridorUnion` and `bandUnion` exist; `Layer` is `'underground' | 'ground' | 'sky'` in
  `types/ids.ts` (the fourth value is BCR-V14-3).
* The base's §9.2 admission function admits a `secret` place listed in the viewer's `places`, so the three secret
  states need no new admission rule (J-V14.12); §2.9's `knowledge` key carries `places`; V08 §3.14 reveals places
  to the party.
* V04's records, programs, cut-away, per-band exports and dig generators exist at M6-U for `site` parts to reuse
  (V04 §2.2, §3.5.2, §3.5.3, §3.8, §5.1–§5.5 read); V03's plan rung, storeys, basements and access heads (V03 §0,
  §2.1, §3.2, §3.7, §4.5 read); V06's `decayLevel` and `EvolveOp` (V06 §2.8, §3.23 read); V09's working layer,
  system chip and underground screens (V09 §2.2, §4.2, §4.17 read); V08's scope and hooks (V08 §0, §1 read); V01's
  `HoodPlace` and `Recipe.product` (cited from the base's declarations).
* No reference owns the subject: the brief's §1 (3) records the dungeon tools as unsurveyed; the base's references
  (MFCG, FTG, VG, NG) have no site, crop or projection; nothing of any tool is read or described (§17.1).
* The spine (`scratchpad/v13v14/SPINE.md`) fixes the stage names, the records, the package, the naming hazard and the
  shared rules this volume follows; the counterpart V13 is in flight and is cited by the spine's section names only
  (V14 §1b.6).

**PLAUSIBLE** (reasoned, not measured):
* Every default constant of V14 §2.5 (own, calibratable): the edge distances, the kind rows' vectors and defaults,
  the grammars' weights and caps, the extent rows' sides, the purpose weights, the occupancy rows, the crop's
  constants, the embedding's widths, headrooms, noise and agent parameters, the tolerances, the damage ranges, the
  projection rows; the historical anchors (a hamlet's fields within a few hundred metres; a tavern plus its street
  within fifty metres) are orders of magnitude.
* That the rule table of V14 §3.3 derives what a DM would expect ("derived: 2 levels below — the water table"); that
  one draw (the age) is few enough to count as derive-before-invent.
* That the grammars of V14 §3.5 reach their cores and vectors within their caps on ≥ 95 % of seeds (T-V14-6; spike
  (a)); that the noise outline's bias keeps dug chambers ≤ 20 %; that the embedding ladder's three rungs suffice
  before a unit is dropped.
* That V13's score exposes the terms V14 §2.5 names or their fallbacks (J-V14.36); that V13's charter admits a
  non-settlement frame; that the classifier's per-unit call is cheap enough for G6's row (V14 §6).
* The budgets of V14 §6 (SE0 and V0 measure them; the fallbacks are pre-decided); the estimates of V14 §8; that the
  projected tile set stays within 1.3 × the flat's memory; that the painter's order with a depth buffer draws every
  case item 141 (b) admits without artefacts (spike (b)).
* That the owner's "DM only / revealed / discovered" is satisfied by three states on one place with the ring cue
  (J-V14.12, vetoable); that the context rule's four rows are what "it shows only once we access that interior and
  specific floor" means (vetoable); that the two deletion verbs map to V13's two edit verbs (J-V14.23, vetoable).
* That the crop's completion of twelve plans within 300 ms holds when the plans are absent from the cache (SE0;
  fallback (3)); that the occupancy bands read as a useful sense of "who is about" at the table (the panel).
* That adoption keeps every lock and pin through V13's P5 (T-V14-7 bars the mechanism; V13's placement is V13's);
  that the robbing relation over a free-standing ruin near a settlement is wanted (J-V14.25's family; vetoable).
* That the three milestones' order (J-V14.34) is the owner's preference under the brief's §9; Q1 and Q4 are put.

## 13 Fix list

The Fix list is empty until revision: this volume is the architect seat's first landing; the critique, seam and
coherence lanes that follow route their findings here, each fixed in the text and recorded in
`docs/volumes/critique/V14.md` and `docs/validation/coherence/` when they run.

## Integration notes

* **What the sibling units hold for this volume** (each written at its home, cited here): V13's world regime,
  placement, charter, score, classifier, `ReasonRecord` and the two edit verbs (V14 §1b.6); V03's programme
  resolution and access heads; V04's records, programs, exports, dig generators and overlap test over `site` parts;
  V06's level and robbing; V07's reservation reading and hand-offs; V08's site record, reveal and reach; V09's
  tools, switch, panels and catalogue; V10's sections; V11's registry rows and naming slice; V12's fixtures, panel,
  pins and register (V14 §10.2).
* **The spine's shared rules** are obeyed: the materializer contract (every G- and E- stage declares its inputs, its
  context record and its outputs with reason records, V14 §3.1's table); addresses namespaced (`site<n>/`, the card
  `site:`); placement never changes an arena digest (V13's; adoption re-prefixes addresses, never geometry);
  transient content never enters the hash (the crop, the items, the projection); the two edit verbs; the knowledge
  layers on `knownTo` and the admission function; per-stage streams on the `site` concern; per-regime budgets; the
  brief's bars as T-V14 rows; no hour anywhere; 2D the default, 2.5D a second switchable view.
* **The coherence pass** applies BCR-V14-1 – BCR-V14-22 with V13's into `docs/AMENDMENTS-2026-10-16k.md` from 600,
  adds the three milestones to §16 and INDEX.md's tables, and folds the cross-volume requests of V14 §10.2 into the
  siblings' fix lists.
