# Design volume 14 — World sites, encounters and the 2.5D view

> PENDING FABLE REVIEW — written by the session's architect seat volumes/architect-V14 under the owner's delegation (J339; the owner, 2026-10-16: "i defer all decisiosn to you"); covered by the whole-design retrovalidation (J84).

<!-- PROGRESS (the architect seat's ledger; removed at revision)
0 In plain words ................................ done
1 Scope, hooks, owner rules, out of scope ....... done
1b Wiring table ................................. done
2 Data model .................................... done
3 Generation (G1–G8, E1–E4) ..................... done
4 Editing ....................................... planned
5 Rendering, labels, exports (R1–R4) ............ planned
6 Performance budgets ........................... planned
7 Tests and acceptance bars ..................... planned
8 Build plan .................................... planned
9 Decisions ..................................... planned
10 Base change requests ......................... planned
11 Owner questions .............................. planned
12 CONFIRMED versus PLAUSIBLE ................... planned
13 Fix list ..................................... planned
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
through the registry and §11.2's reader, as they read V04's.

### 1.2 The base hooks this volume consumes (cited, never restated)

| hook | where | how this volume uses it |
|---|---|---|
| layers, parts, addresses, the part counters | §2.1, §2.2, §2.9 (`nextUndergroundPart`, `nextSkyPart`, `nextGroundPart`) | the fourth layer `site` and `nextSitePart` (BCR-V14-3); a site part's level mapping follows §2.2 rule 1's underground mapping; every site address `site<n>/kind:token` |
| the transient arena, `TransientKey`, `readBack`, `release` | §3.4 (J-A28.31); the kernel's stub row (`API.md` §8) | E4's transient layer and E2's completion (V03's storeys cut there); the owner-less form BCR-V14-4 admits |
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
| the stream key, concern and stage registries, fixed-key draws | §6.1, §6.3 | the `site` concern and the stage ids G1–G8, E1–E4 (BCR-V14-14); every draw V14 §3.14 lists |
| the world regime, placement, the frame charter, the siting score, `ReasonRecord`, the water class test, the two edit verbs and the cascade | V13 §2, V13 §3 (W0–W9, P1–P5), V13 §3's water class test (`proposal-hydrology` §4's mechanism, stated once in V13), V13 §4 | V14's dependencies, each named in V14 §1b.6 and V14 §11 |
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
| 132 (b) | "a user as a DM could click anywhere … it will produce an appropriately scaled encounter map" — transient is not random: keyed by address and time, derived | V14 §3.10 E1, V14 §3.14 (determinism), T-V14-1 |
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
* **The reference dungeon tools** (Dungeon Alchemist, DunGen, Donjon, Dungeon Scrawl, RPG Map Editor) are not yet
  surveyed (the brief's §1 (3)); nothing of their mechanisms is described or read here. Every technique this volume
  places is stated from first principles over the kernel's own services (V14 §3.5–V14 §3.6; §17.1).
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
| `WorldSite` (the card; V14 §2.2) | `dropSite` (a candidate card), `promoteEncounter` (`as: 'site'`), G2–G8 (its programme, vector, document, lifecycle, knowledge, history), a host record through V08's port (its host-owned fields) | G-SITE (every stage), the icon (V14 §5.1), the site panel (V09), the `site` why section (V10), V12's measures, the derived-facts port (its capacity), V13's W6 (a destination), V07's and V13's adoption, the exports | the entities block of the host document (attached) or of the site document itself (free-standing); the registry row BCR-V14-1 |
| `SiteAnchor` (V14 §2.3) | `dropSite`; `promoteEncounter`; adoption (re-addressed); `moveAnchor` | the icon and its context rule, the access record's host, the admission function, V09's panels, V10, the exports (a point feature), Find's listing | the host document's entities block; §2.7's staged records (BCR-V14-1) |
| `AccessPoint.source: 'site'`, `AccessPoint.under` as `SiteReach` (V14 §2.3) | G8 (a) (the one access record), `moveAnchor` (re-dug) | V03's access head (the trapdoor, stair or hatch in the plan), V04's drawing of its underground end and V01's ground symbol, the per-storey and per-band VTT portals, the clerk | II.7.4 (BCR-V14-2) |
| `SiteRequest`, `Stated<T>` (V14 §2.2) | the user (the site dialog, V09; a skeleton line; the clerk's `propose`), `promoteEncounter` (derived from what was there), a host record's fields | G2 (the resolution), G3 (floors, shape, terrain), G4 (purpose, size), G7 (condition, age), the clerk ("asked for …, derived …") | the card |
| `SiteProgramme` (V14 §2.2) | G2 | G4 (the grammar's axiom and budget), G5 (the materializer composition, the envelope), G7 (the history layers' ages), the measured vector's comparison, V03's programme row override for the surface exception | the card (persisted, in the model digest) |
| `ComplexityVector` (V14 §2.2): target and measured | G2 (the target: a preset's vector adjusted by the request), G5's close (the measured, on the finished geometry) | T-V14-6's assertion, the clerk, the size dialog (a preset is a named vector), V12's measures | the card |
| `UnitGraph`, `Unit`, `UnitEdge`, `VerticalLink` (V14 §2.2) | G4 (the graph), G5 (each unit's geometry reference, each vertical link's two ends with their elevations) | G5 (the embedding), G6 (per-unit classes), G7 (collapses close units, breaches open edges), the tactical check, the 2.5D slabs (`VerticalLink` drawn as stacked-slab joins), the clerk (every unit's reason), the exports (portals, stairs) | the site document's entities block; `VerticalLink` the base's vertical-link row (BCR-V14-6) |
| `SiteHistoryLayer` (V14 §2.2) | G5 (one per materializer run, in chronological order) | G7 (a layer's age sets its decay run), the clerk ("built over the old cave"), the `ruinMasonry`-style programs per layer | the card |
| `WorldSiteLifecycle` (V14 §2.2) with its `LifecycleEvent`s and causes | G7, `destroySite`, the `siteState` conversions, a host event (V08), promotion | the icon's state glyph, the condition transforms, the clerk, V12's lifecycle bars, the exports' `state` | the card; §2.8's lifecycle (BCR-V14-16's rows) |
| `SiteKnowledge`, `SecretState` (V14 §2.3) | the DM (`setAttr` on `anchor/secret/state`), the host's reveal (V08 §3.14), the party's reach (a host event or a DM mark), G6 (submergence feeds `discoverable`) | the admission function through the anchor's `knownTo`, the icon's cue, the site panel, V08's party pictures, the exports | the anchor and the card |
| `WorldSite.document` (`SiteDocumentRef`) | G5's first materialization (the site document minted lazily on first open) | the icon's open, V09's document switch, the per-level exports, adoption | the card |
| `SitePolicy` (V14 §2.2) | `SiteKindRow.policy` resolved by G2 | G5 (which materializers run, on which parts, in which order) | `tables/sites/kinds.json` |
| the tables `SiteAdmissibilityRow`, `SiteKindRow`, `UnitGrammarRule`, `EncounterExtentRow`, `SitePurposeWeightRow`, `SiteLifecycleRow`, `OccupancyRow`, `CropRule`, `EmbedRule`, `SiteDamageRow`, `ProjectionRow` (V14 §2.5) | shipped defaults (provenance `own`, calibratable unless marked); `editTable` (§7.6) | G1, G2, G4, G5, G7, E2, E3, E4, R2, R3; V12's register | §7.6's registry (BCR-V14-10 and V14 §10.2) |
| `Encounter`, `EncounterAddress`, `EncounterCrop` (derived, never persisted; V14 §2.4) | E1–E3 on the DM's click | E4 (the transient layer), the crop view, the VTT crop export, `promoteEncounter` (its input), V10's `encounter` section | — (a view; the `encounter` view key holds the DM's items, BCR-V14-19) |
| `OccupancySummary` (derived; V14 §2.4) | E2 (b) | the crop's occupancy marks and legend, the scene's `plat` note, the clerk | — |
| `TransientItem` (V14 §2.4) | E4 (derived items from the crisis looks and the site's occupant layer); the DM (the `encounter` view key's items) | the crop view, the VTT objects, promotion (items become the card's occupant layer) | the `encounter` view key (shared view state, §2.9) |
| the view keys `projection`, `encounter`, `siteOpen` (V14 §2.6) | V09's controls; `siteOpen` by the icon's click | R2–R4; E1–E4; the site document's view | §2.9 (BCR-V14-7, -19) |
| `Projection`, `ProjectionRow` (V14 §2.6) | the viewer; the style sheet's family rows | R2 (the transform and sort), R3 (the drawing), R4 (hit testing), the picture export | §2.9, §8.2 (BCR-V14-7) |
| `ZDecl` — the z-completeness declaration per drawable record kind (V14 §5.4) | each record kind's registry row (the base's and the volumes') | R3's extrusion, the gap lint (T-V14-16), the glTF path | §2.8's entity registry (BCR-V14-5) |
| `verticalEnds(id)` (derived; V14 §5.4) | the base's and V04's records at read | R3's stacked-slab joins, the VTT portal elevations, T-V14-16 (M10) | — (BCR-V14-6) |
| `Reservation.kind: 'worldSite'`, `Destination.kind: 'worldSite'` | G8 (e)'s adoption (the reservation); G3 (d) (the destination) | S3's siting and claims (a site claims ground first), S4's destinations | §2.5, §4.12 (BCR-V14-13) |
| `Assignment.site` (V14 §3.9 G8 (c)) | `dropSite` in an urban-surface context | S10b's placement, S11's mutator and V03's programme row (A1's first match) | §7.7 (BCR-V14-12) |
| `Document.nextSitePart`; `Layer` `'site'` | the site pipeline's G5 (one part per level) | every site address, the exports, V09's working layer (Site), adoption | §2.1, §2.2, §2.9 (BCR-V14-3) |
| the concern `site` and the stage ids `G1`…`G8`, `E1`…`E4` | §6.1's registries, appended | every draw V14 §3.14 lists | §6.1 (BCR-V14-14) |
| the warnings `W_SITE_CONTEXT_BENT`, `W_SITE_VECTOR_MISSED`, `W_SITE_ENVELOPE_SHRUNK`, `W_SITE_NO_ACCESS`, `W_CROP_EXTENT_CLAMPED`, `W_CROP_INCOMPLETE`, `W_Z_FLAT_UNDECLARED` | the stages and the view | the report (§5.4), V10 | §5.4 (BCR-V14-16) |
| the register entries of this volume's calibratable columns (V12 §2.6) | the seat landing each step of V14 §8 | V12's lint and the corpus stage | §13.7, §13.9 |

### 1b.2 Stage outputs and interfaces

| output or interface | implementer | caller or consumer |
|---|---|---|
| `SiteContext.of(doc, address): SiteContext` (V14 §3.2 G1) | `@plat/sites/admit` | `dropSite`'s dry run, E1 (the crop's context), the site dialog's kind list (V09), the clerk |
| `SiteRequestResolver.resolve(doc, card, context, tables, rng): { programme: SiteProgramme; reasons: ReasonRecord[] }` (G2) | `@plat/sites/request` | the site pipeline; `setSiteRequest`'s re-resolution; `promoteEncounter` |
| `SiteSiting.site(world: WorldDocument /* V13 */, request, weights: SitePurposeWeightRow): { placement: Placement /* V13 */; score; reasons }` (G3) | `@plat/sites/siting` over V13 W6's pluggable score (**V13**) | a free-standing `dropSite` with no point ("somewhere fitting"); V13's W6 when the host asks for sites |
| `TopologyBuilder.build(programme, rng): { graph: UnitGraph; reasons }` (G4) | `@plat/sites/topology` | the site pipeline; `setSiteRequest` (a re-build keeping locked units as fixed nodes) |
| `Embedder.embed(doc, graph, policy, k): KernelResult<EmbedResult>` (G5) | `@plat/sites/embed` | the site pipeline; a programme edit's local rematerialization |
| the materializer functions `NaturalCave.lay`, `RockCut.lay`, `MineExcavate.lay`, `BuiltLevel.lay`, `GroundComposer.lay` (G5 (b)–(f)) | `@plat/sites/materialize`, calling V04's `UndergroundSystemStrategy` cavern and quarry steps as functions (V04 §3.5.2, V04 §3.5.3), S12a's hinterland unit, S7's `EnceinteStrategy.trace`, S11's `SitePlanStrategy` and V03's `plan` | `Embedder` per history layer |
| `SiteWaterClasses.classify(doc, card): WaterClassReport` (G6) | `@plat/sites/water` calling V13's classifier (**V13**) | the card's water state, the lifecycle (`submerged`), the exports, the clerk |
| `SiteCondition.apply(doc, card, event): KernelResult<ConditionResult>` (G7) | `@plat/sites/condition` over V06 §3.23's `decayLevel`, V06 §2.8's ops and V03 §5.6's drawing | `destroySite`, the `siteState` conversions, a host event, an epoch over an adopted site (V06) |
| `SiteAttach.attach(doc, card, anchor): KernelResult<{ access: AccessPoint }>` (G8 (a)–(d)) | `@plat/sites/attach` over V04's dig generators (V04 §3.8) | `dropSite` (attached), `moveAnchor` |
| `SiteAdopt.adopt(settlement: Document, site: Document, placement): KernelResult<AdoptResult>` (G8 (e)) | `@plat/sites/adopt` | V13's P4/P5 when a settlement is placed over a site; V07's siting at a village rung; a hand `adoptSite` |
| `EncounterService.open(doc, address, week): Encounter` and `.crop(encounter): EncounterCrop` (E1–E4) | `@plat/app`'s encounter module over §11.2's reader, V03's plan rung and §3.4's transient arena | the DM's click (V09's T6 `place` **Encounter here**), the clerk's `useTool`, the VTT crop export |
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
| the pluggable suitability score with purpose weights | V13 W6 | G3 reads it with V14's `SitePurposeWeightRow` as the purpose term | — |
| the settlement siting's destination list | V13 W6, W7 (routes to destinations) | G3 (d): a site as a destination | — |
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
never duplicated. A **level** is one `site` part: one carved or natural floor of a site, numbered by
`Document.nextSitePart` from 1 (there is no part 0 on the `site` layer: a site's ground is its `ground` part 0, and a
site attached inside a settlement has no ground of its own); a built storey above ground is a V03 storey of a site
building and never a part.

### 2.2 The card, the request, the programme, the vector, the graph and the lifecycle

```ts
// @plat/sites — the persistent world site (item 132 (f), (g); item 133; item 134); the entities block of its host or own document
type WorldSiteKind = 'fort'|'tower'|'temple'|'shrine'|'manor'|'guildhall'|'ruin'|'cave'|'mine'|'hideout'|'crypt'|'cellarComplex'
                   |'sewerLair'|'dungeon'|'camp'|'battlefield'|'graveyard'|'watchpost'|'hermitage'|'bridgeFort';   // SiteKindRow.kind (V14 §2.5); data, extensible by a row
type SiteAttachment = 'free'|'attached'|'surface';            // item 133 (b), (c): a document of its own placed in the world; a document of its own behind an anchor in a host document; a building on a plot through the assignment path
type SiteContextKind = 'urbanSurface'|'urbanInside'|'urbanBelow'|'urbanSky'|'hinterlandNear'|'hinterlandFar'|'country'|'world';   // V14 §3.2 G1
interface WorldSite {                                           // the card (item 132 (f)): one per site
  id: Id;                                                       // `site:<token>` — in a host document the token is §6.3's user-created form (the dropSite event's seq and ordinal); the card never lives on an arena
  kind: WorldSiteKind; purpose: SitePurpose;                    // SitePurpose: SiteKindRow.purposes' ids (V14 §2.5): 'defence'|'worship'|'dwelling'|'extraction'|'concealment'|'burial'|'storage'|'watch'|'solitude'|'trade'
  attachment: SiteAttachment;
  context: SiteContextKind;                                     // the context G1 read at creation; re-read on moveAnchor
  placement?: Placement;                                        // V13: a free-standing site's placement in the world regime (origin, bearing, precedence stamp); absent attached or surface
  anchor?: Id;                                                  // attached: its SiteAnchor in the host document (V14 §2.3)
  building?: Id;                                                // surface: the building the assignment path placed, in the host document (V14 §3.9 G8 (c))
  document?: SiteDocumentRef;                                   // attached and free-standing: the site's own document once materialized (lazily on first open, item 133 (h)); absent while `lifecycle.materialized` is 'candidate'
  request: SiteRequest; programme?: SiteProgramme;              // the request (stated and derived), the programme G2 resolved (absent while candidate)
  complexity: { target: ComplexityVector; measured?: ComplexityVector };   // the target G2 set; the measured vector G5's close wrote on the finished geometry (absent while candidate)
  history: SiteHistoryLayer[];                                  // chronological (V14 §3.6 G5 (a)); empty while candidate
  lifecycle: WorldSiteLifecycle;                                // V14 §2.2 below (the set of states with causes), beside §2.8's Lifecycle on the record
  knowledge: SiteKnowledge;                                     // V14 §2.3
  water?: WaterClassReport;                                     // V13's classifier's aggregate for the site (G6); absent while candidate
  host?: WorldSiteHost;                                         // the host-owned facts (item 132 (h)); factTier 'dossier' on each path; absent standalone
  ageYears: number;                                             // 'yr': the oldest history layer's age at the drawn week; a request's `age` sets it, else G2 derives it
  name?: NameRef; identity: Identity; lifecycleBase: Lifecycle } // §2.8's two parts; `lifecycleBase.existence` mirrors `lifecycle.condition` (V14 §2.9)
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
  knownTo: 'public'|'local'|'secret'; reached?: true;           // the players reached it (SiteKnowledge.reached lists them too; the unit's flag is the drawing's read)
  reason: Id;                                                   // the ReasonRecord (V13): layer, programme role, event
  lifecycle: Lifecycle }
interface UnitEdge { a: Id; b: Id; kind: 'passage'|'door'|'secretDoor'|'breach'|'vertical'|'open'; widthClass: 'squeeze'|'narrow'|'normal'|'wide'; passable: boolean /* false while collapsed or submerged (G7, G6) */; link?: Id /* kind 'vertical': the VerticalLink */ }
interface UnitGraph { site: Id; nodes: Id[]; edges: UnitEdge[]; entrances: Id[]; core: Id|null; grammar: string; expansions: number /* the rules applied, for the report */ }
interface VerticalLink {                                        // a stair, ladder, shaft, ramp, trapdoor or well joining two units on different levels or storeys (item 141 (b), (c) M10)
  id: Id; kind: 'stair'|'ladder'|'shaft'|'ramp'|'trapdoor'|'well';
  a: { unit: Id; level: number; storey?: number; elevationCm: Cm /* the floor at this end */; at: VertexRef /* ('link_end', id, 0) on the unit's wall or kerb */ };
  b: { unit: Id; level: number; storey?: number; elevationCm: Cm; at: VertexRef };
  risePerRunCm?: [Cm, Cm];                                      // a ramp's or stair's slope as (rise, run)
  state: 'open'|'blocked'|'collapsed'|'flooded'; knownTo: 'public'|'local'|'secret'; cause: AccessCause /* V04 §2.2's, rule 'site' added */; lifecycle: Lifecycle }

// The history superposition (item 133 (g); V14 §3.6 G5 (a))
interface SiteHistoryLayer { ordinal: number; kind: 'natural'|'carved'|'built'; event: ProgrammeLayer['event']; ageYears: number; materializer: MaterializerId; units: Id[]; reason: Id }

// The lifecycle (item 134 (b); proposal §6's states as a set with causes, never a sequence)
interface WorldSiteLifecycle {
  materialized: Timed<'candidate'|'generated'>;                 // a dropped icon is a candidate; the first open materializes (item 133 (h))
  retention: Timed<'transient'|'persistent'>;                   // a promoted encounter is persistent; a card is always persistent — the field exists so a promotion's record reads its origin
  occupancy: Timed<'vacant'|'occupied'|'active'>;               // 'active': occupied and in use by its host status (garrisoned, worked, worshipped)
  condition: Timed<SiteCondition|'destroyed'|'cleared'|'restored'>;   // the condition transform in force (V14 §3.8 G7)
  shape: Timed<'asBuilt'|'repurposed'|'expanded'|'collapsed'>;  // a programme change since the first materialization
  water: Timed<'dry'|'damp'|'partlyFlooded'|'submerged'> }      // the aggregate of G6's classes (V13's words), a reading written for the icon and the host
type Timed<T> = { state: T; since: { epoch: number; seq: number; week: number }; cause: LifecycleEvent['cause'] };
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
| `entrances` | count | the units of role `entrance` with an edge of kind `open`, `door` or `secretDoor` to the outside (the envelope's exterior, the ground or a host document's element) |
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
  access?: Id;                                                  // the one AccessPoint of source 'site' (below); absent while the site is a candidate with no way in yet, or for an anchor on a storey whose way in is the storey itself (a trapdoor in that room: the access then exists)
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
type SiteReach = { site: Id /* the WorldSite */; unit: Id /* the entrance unit in the site document */; level: number /* its site part */; at: VertexRef /* ('access_point', id) on that unit's wall or kerb, in the site document */ };
// AccessPoint.under: { part; element; at } | SiteReach; AccessPoint.source gains 'site'; AccessCause.rule gains 'site'. Its `state`, `knownTo` and
// condition (bricked, collapsed while its unit is closed) are II.7.4's; its knowledge is its own, independent of the anchor's (a trapdoor may be
// found before anyone knows what lies beneath).

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
  crop: EncounterCrop; transient: TransientItem[] /* E4's derived items; the DM's own are the view key's */;
  reasons: ReasonRecord[] /* V13: one per choice — the profile, the extent, each completion */ }
interface EncounterCrop {
  rect: { x0: Cm; y0: Cm; x1: Cm; y1: Cm };                      // in the arena's cm, snapped outward to whole grid cells (E3)
  gridCm: Cm; origin: PointCm;                                  // the tactical grid's cell (the export's `vtt.squareM` in cm) and its origin: the crop's south-west corner, which lies on the world grid (E3's origin rule) — stable per address (item 136 (b))
  cols: number; rows: number;
  scenes: ({ key: PlatKey } | { depthBand: number } | { building: Id; storey: number } | { site: Id; level: number } | { raisedWay: Id })[];   // the scene set the VTT export writes for the crop (§11.1's forms plus the site level)
  transientKey?: TransientKey }                                 // E4's owner-less transient arena while the crop is open (BCR-V14-4)
interface OccupancySummary {                                    // item 132 (c): the moment's occupancy by an abstraction, never individuals, never an hour
  band: 'empty'|'few'|'some'|'crowded';
  headcount: [number, number];                                  // 'people': a range, the band's
  of: 'households'|'staff'|'patrons'|'congregation'|'garrison'|'occupants'|'none';   // whose presence the band counts
  from: { households: number; capacity: number; use?: Id; row: string /* the OccupancyRow */ } }
interface TransientItem { id: string /* local to the crop */; kind: 'barricade'|'cart'|'fire'|'smoke'|'fog'|'debris'|'camp'|'tent'|'marker'|'pool'|'corpse'|'wagon';
  shape: { point: PointCm; rotCdeg?: Cdeg; wCm?: Cm; dCm?: Cm } | { ring: PolygonCm } | { line: PointCm[]; widthCm: Cm };
  blocks: { sight: boolean; move: boolean }; source: 'derived'|'dm'; from?: { look: Id /* the ConditionOverlay a derived item came from */ } | { site: Id /* the site's occupant layer */ } }
interface TacticalReport { cover: number /* 'share': the crop's or site's floor area within 2 m of a sight-blocking edge */; sightlines: { meanM: number; maxM: number }; chokepoints: number; loops: number; deadEnds: number;
  flanks: number /* 'count': entrance pairs with two disjoint paths to the core */; vector: ComplexityVector /* the measured vector, for the comparison */ }
interface WaterClassReport { floodedShare: number; submergedShare: number; lowestDryLevel: number|null; access: 'walkable'|'wading'|'swimming'|'diving'|'none'; byUnit: Record<Id, UnitWaterClass>; surface: Id /* V13's governing surface */ }
type UnitWaterClass = unknown;                                   // V13's per-unit classifier result: class, governing surface, depth, thresholds, why (V13 §3); stored as returned, read never inferred
interface AdoptResult { parts: { from: PlatKey; to: PlatKey }[]; addresses: { from: Id; to: Id }[]; reservation: Id; kept: { locks: number; pins: number; edits: number } }
interface EmbedResult { units: Id[]; links: Id[]; parts: number[]; measured: ComplexityVector; warnings: string[]; attempts: number }
interface ConditionResult { closed: Id[] /* units made impassable */; opened: UnitEdge[] /* breaches that joined units */; robbed: Id[] /* elements robbed for stone (V06's ledger) */; level: number /* the decay level applied */ }
```

Each transient is total over its inputs: an `Encounter` at a point with nothing resolvable (open water of the world,
the frame's margin) still returns a crop with its profile `open` and no completions (E3's `open` row); an
`OccupancySummary` with no households, use or capacity is `{ band: 'empty', headcount: [0, 0], of: 'none' }`; a
`TacticalReport` over no unit is all zeros; a `WaterClassReport` before V13 lands is V14 §1b.6's provisional form; an
`AdoptResult` over a site with no part lists none. Tested by T-V14-26 (a).

### 2.5 New rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

Every value below is **our own** (provenance `own`, `extension`: no reference the base calibrates against has a
site, an encounter crop or a 2.5D view; the dungeon tools the brief names are unsurveyed and nothing of theirs is
read, §17.1), calibratable against the corpus when its stage comes (§13.9) unless marked `calibratable: false`
(enumerations, keys, grammars). Historical anchors named are orders of magnitude, not measurements. V11's registry
gains the rows V14 §10.2 requests; their schema is here.

```ts
// tables/sites/admissibility.json — G1 (item 134 (a)); BCR-V14-10 gives it its registry row
interface SiteAdmissibilityRow { context: SiteContextKind; kinds: WorldSiteKind[]; attachment: SiteAttachment[] /* the modes admitted, the first the default */; note?: string }
interface SiteAdmissibilityRule { rows: SiteAdmissibilityRow[];
  edge: { nearM: number /* 400: within this of the enclosure the hinterland is 'near' */; farM: number /* 1 500: beyond this (or beyond the frame) the context is 'country' */;
          enclosure: 'outermostEnceinte'|'perimeter' /* which line the distance is measured from where both exist: the outermost enceinte's outer strip, else S6's settlement perimeter */ } }
```

| context | kinds admitted (`own`) | attachment |
|---|---|---|
| `urbanSurface` | tower, temple, shrine, manor, guildhall, watchpost | `surface` (the assignment path; BCR-V14-12) |
| `urbanInside` (a storey of a building) | crypt, cellarComplex, hideout, shrine, dungeon | `attached` |
| `urbanBelow` (an underground part) | crypt, cellarComplex, hideout, sewerLair, dungeon, cave, temple | `attached` |
| `urbanSky` (an island's part) | shrine, tower, hideout, watchpost | `attached` (an island's `ground` part is the host) |
| `hinterlandNear` | shrine, graveyard, watchpost, hermitage, camp, mine, cave, ruin | `attached` (in the settlement's frame, anchored on a hinterland face), `free` |
| `hinterlandFar` | every kind but cellarComplex, sewerLair, guildhall | `free`, `attached` |
| `country` | every kind but cellarComplex, sewerLair, guildhall, manor | `free` (a cave attached to a terrain feature: `free` with `placement` on V13's feature, J-V14.11) |
| `world` (V13's regime, no frame) | as `country` | `free` |

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
| `street.corner` | urbanSurface | corner (a junction within 12 m) | [40, 60] | junction | frontages, junctionArms | ground, storeys |
| `street.bend` | urbanSurface | bend (a way vertex turning ≥ 30°) | [40, 60] | click | frontages | ground, storeys |
| `street.straight` | urbanSurface | straight | [36, 50] | click | frontages | ground, storeys |
| `square` | urbanSurface | square (an L1 square or square block, V04 §1.2's public ground) | [50, 100] | placeCentre | wholePlace, frontages | ground, storeys |
| `gate` | urbanSurface | gate (within 20 m of a gate) | [50, 80] | placeCentre | wholePlace | ground, deck |
| `bridge` | urbanSurface | bridge deck or within 15 m of a deck end | [40, 80] | placeCentre | bothBanks | ground, deck |
| `quay` | urbanSurface | a quay way or basin edge within 15 m | [50, 90] | click | frontages | ground |
| `yard` | urbanSurface | a yard or passage face | [30, 45] | placeCentre | wholePlace | ground, storeys |
| `place` | urbanSurface | a named place or institution within 10 m (a tavern plus its street) | [45, 70] | placeCentre | wholePlace, frontages | ground, storeys |
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
// tables/sites/purpose.json — G3: purpose weights on V13's suitability score (proposal §5; V13 W6's pluggable term)
interface SitePurposeWeightRow { purpose: SitePurpose; terms: Partial<Record<SitingTerm, number>> /* 'weight': the term's weight in V13's score; a negative weight repels */; hard?: SitingTerm[] /* terms whose zero refuses the candidate */ }
type SitingTerm = 'overlook'|'roadControl'|'waterNear'|'ore'|'stone'|'wood'|'concealment'|'oneApproach'|'solitude'|'settlementNear'|'settlementFar'|'routeNear'|'shoreNear'|'slopeFlat'|'floodSafe'|'territoryBorder'|'relief';
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

The terms are V13 W6's score terms (its distance fields and relief); `concealment` and `oneApproach` are the two this
volume asks V13 to add (V14 §1b.6, V14 §11 Q2): concealment the inverse visibility from routes and settlements
(V13's viewshed term, if it has one; else 1 − overlook), one approach the count of distinct low-cost approaches to the
candidate under V13's cost law, 1 when exactly one.

```ts
// tables/sites/lifecycle.json — G7 (item 134 (b)): transitions with causes and the transform each applies; calibratable: false
interface SiteLifecycleRow { from: SiteCondition|'destroyed'|'cleared'|'restored'|'*'; to: SiteCondition|'destroyed'|'cleared'|'restored'; causes: ('host'|'dm'|'epoch'|'water'|'promotion')[];
  transform: 'none'|'occupy'|'vacate'|'decay'|'ruin'|'destroy'|'clear'|'restore'; level?: [number, number] /* the decay level band the transform applies (V06 §3.23's thirds) */; leaves?: 'ruin'|'record'|'both' }
// tables/sites/occupancy.json — E2 (b) (item 132 (c))
interface OccupancyRow { of: OccupancySummary['of']; by: 'households'|'use'|'garrison'|'site'; perHousehold?: [number, number] /* 'people' present per household at any moment: [1, 3] */; perCapacity?: number /* 'share' of a use's capacity present: patrons 0.4, staff 0.15, congregation 0.1, garrison 0.6 */;
  bands: { empty: [number, number]; few: [number, number]; some: [number, number]; crowded: [number, number] } /* 'people': [0,0], [1,3], [4,10], [11, ∞) */; seasonal?: Record<'festival'|'winter'|'market', number> /* multipliers read from §2.9's week and the festival display */ }
// tables/sites/crop.json — E1–E4: the crop's constants
interface CropRule { snapToGrid: true /* the rectangle snaps outward to whole cells; the geometry never snaps (proposal §8) */; maxBuildings: number /* 12: the most plans E2 completes in one crop; beyond it the nearest to the centre, the rest drawn as shells, W_CROP_INCOMPLETE */;
  maxScenes: number /* 8 */; occupancyMarkM2: number /* 40: one occupancy mark per 40 m² of a room or chamber */; lookItems: Record<string /* a crisis look kind (§10.2) */, { kind: TransientItem['kind']; perHa: number; where: 'gates'|'streets'|'edges'|'hosts' }>;
  transientBudget: number /* 200 items */; firstFrameMs: number /* 100 */; completeMs: number /* 300 */ }
// tables/sites/embed.json — G5: the embedding's constants
interface EmbedRule {
  passage: { widthCm: Record<UnitEdge['widthClass'], Cm> /* squeeze 60, narrow 100, normal 150, wide 250 */; headroomCm: Cm /* 220 */; wallCm: Cm /* 40 rock; 30 masonry */; minRunCm: Cm /* 300 */ };
  unit: { minM2: Record<UnitRole, number> /* entrance 12, hub 40, chokepoint 8, loop 15, deadEnd 10, secret 8, verticalLink 6, core 50, passage 0, court 120, cell 6, sump 10, shaft 4 */; aspectMax: number /* 3 */; ceilingCm: Record<Unit['kind'], [Cm, Cm]> /* built [240, 600], carved [200, 400], natural [150, 1 200] */ };
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
interface SiteDamageRow { kind: 'rockWall'|'rockCeiling'|'shoring'|'pillar'|'rockFloor'|'caveFormation'|'stairFlight'|'trapdoor'|'builtVault'|'builtWallBelow'; range: [number, number] /* the level band inside V06 §3.23's thirds where this kind breaks */; effect: 'collapse'|'rubble'|'breach'|'none'; closes: boolean }
```

| `SiteDamageRow` (own) | range | effect | closes the unit |
|---|---|---|---|
| `shoring` (a mine's timber) | [0.20, 0.45] | collapse | yes |
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
mapping); E1–E4 (the profile, the extent, each completion, each derived item). The clerk's `why` reads them through
V14 §4.7's providers; V10's chain test (bar 10) walks from a unit to its layer to its programme to its request.

### 2.8 Identity: lineage units and creation keys

Addresses, lineage and anchors are §6.3's. The site document's town root is the card (its lineage the dropSite
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
| `WorldSite.programme`, `.complexity.target` | G2 | G4, G5, the clerk | the card | re-resolved by `setSiteRequest`; kept otherwise | with the request | absent: re-resolved at the next open, reported |
| `WorldSite.complexity.measured` | G5 (h) | T-V14-6, the clerk, V12 | the card | rewritten at every materialization | with the scope | absent: measured at the next open |
| `WorldSite.document` | G5's first materialization | the icon's open, the exports, adoption | the card | kept; a site document's `digest` re-checked at each open | the unlink (the document kept in the session's undo record until the record's cap, §7.4) | absent: materialized on first open |
| `WorldSite.history` | G5 (a) | G7, the clerk | the card | kept whole by every re-materialization (a layer is a declared fact once laid; a New random on the site re-draws its ages and layers only when the request's `age` is not stated) | with the scope | absent: one layer `construction` at `ageYears` |
| `WorldSite.lifecycle.*` | G7, the conversions, the host's events, promotion | the icon, the transforms, the clerk, exports | the card; each change a `LifecycleEvent` with cause | never re-derived: a state is an event's product | the event's inverse | absent: `generated`/`persistent`/`vacant`/`pristine`/`asBuilt`/`dry` |
| `WorldSite.knowledge`, `SiteAnchor.secret`, `.knownTo` | the DM's `setAttr`, the host's reveal, a reach event, G6 (`discoverable`) | the admission function, the icon, V08, the clerk | the card and the anchor | never re-derived but `discoverable`, recomputed with G6 | the inverse | absent: `dmOnly`, `secret`, `none`, discoverable true |
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
(item 133 (b): the city's plots never move).

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
8. **`country`** — beyond `farM`, or outside the frame but inside V13's regime where a settlement frame's margin ends.
A standalone neighbourhood document reads `urbanSurface` inside its outline and `hinterlandNear` outside it (V01
§3.10.1 gives it no enceinte). A site document's own ground reads `siteGround` for E3 and `country` for G1 (a site
inside a site's frame is a free-standing site of its own, J-V14.11).

**The table** is `SiteAdmissibilityRule` (V14 §2.5): the context's row lists the kinds admitted and the attachment
modes, the first mode the default. A `dropSite` whose kind the context does not admit is **bent** (J-VI.4) to the
nearest admitted kind of the same purpose — the kind row's `purposes` intersected, the first kind of the context's
row sharing one — and the bend named in the dry run (`bend.site.kind`; V09 §4.9's catalogue), or, where no kind shares
a purpose, refused `refuse.site.context` with the context's row listed (F-SITE's refusal rung). The attachment is
the row's default unless the request names another the row admits (`hinterlandNear` admits both). An `editTable` on
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
| | `levels.rock` | on `rock` geology (§2.3 `Terrain.geology`) the kind row's default; on `soluble` + 1 for a cave or dungeon; on alluvium − 1 (never below 0 but for a site whose kind row's default is 0) |
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
materializers the geology admits — `naturalCave` only on `soluble`, `volcanic` or `rock` geology, `mine` only where
V13's or S1's resources give ore or stone within the envelope, `rockCut` anywhere but alluvium, `builtLevel`
anywhere); the grammar (`${kind}.${purpose}`, or the kind row's shared id); the history layers in the kind row's
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
pass") runs V13 W6's two-stage score over the world document with the purpose weights of `SitePurposeWeightRow`
(V14 §2.5) as the score's purpose term — the terms V13's score exposes (its distance fields, relief and route
control), each multiplied by the row's weight, a `hard` term's zero refusing the candidate — and the one controlled
random term V13's score admits drawn on `site` keyed by (the card, `siting`); the best candidate is the placement,
the top five kept in the reason record as "the other sites considered" (V09's **Why here?** reads them). A host-placed
site (its record's position) is never re-sited.

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

**(d) A site as a destination (item 134 (c)).** Every free-standing site with `lifecycle.materialized` `generated`
is a `Destination` of kind `worldSite` (BCR-V14-13) in V13 W6's settlement siting and W7's routes: a settlement's
candidate centre reads a site within `edge.farM` as a pull (a fort: +, by the host's cost law for its protection; a
mine: + for its trade; a hideout: 0 — unknown to the siting; a ruin: + small, the stone) through V13's score
(the weights are V13's `destination` term's; this volume supplies only the kind → pull class table below), and a
route is drawn to it as to a settlement when its pull class is `market` or `protection`. A settlement the host founds
over a site's frame adopts it (V14 §3.9 G8 (e)): the site is older and so prior in the layout — its envelope becomes
a `Reservation` of kind `worldSite` that S3 claims first, as a castle reserve does (§4.2 S3 (2), (8)), the village's
houses then growing in front of or round it (V07's siting reads the reservation as it reads a castle's).

| site kind | pull class (read by V13's destination term) |
|---|---|
| fort, bridgeFort, watchpost | `protection` |
| mine, manor, guildhall | `market` |
| temple, shrine, graveyard, hermitage | `sacred` (a small pull) |
| ruin | `stone` (a small pull; the robbing relation, V14 §3.9 G8 (e)) |
| cave, hideout, cellarComplex, sewerLair, dungeon, crypt | `none` |
| camp, battlefield | `none` |

The relation runs both ways (item 134 (c)): a fort the settlement adopts is garrisoned by its institution row (the
settlement's roster places a garrison use in the fort's keep through S10b, the site's buildings being plots of the
settlement after adoption); a ruin the settlement adopts is **robbed for stone** — V06's salvage ledger credits its
elements as a cleared trace's (V06 §3.5's robbing) at every epoch the settlement builds, and when its last standing
element is robbed the site's lifecycle turns `cleared` with cause `rule:robbed`, its levels surviving as the ruin
beneath the village (V04's `buried` kind takes them: the settlement's U-SYS buried step adopts the site parts'
elements by `reusedBy`, V04 §3.5.5's form) — the owner's "robbed for stone and absorbed as the ruin beneath the
village".

## 4 Editing

## 5 Rendering, labels and exports

## 6 Performance budgets

## 7 Tests and acceptance bars

## 8 Build plan

## 9 Decisions (each vetoable)

## 10 Base change requests

## 11 Owner questions

## 12 CONFIRMED versus PLAUSIBLE

## 13 Fix list
