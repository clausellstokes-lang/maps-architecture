# Design volume 4 — The underground: sewers, tunnels, underground neighbourhoods, catacombs, caverns, quarries and the undercity

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V4-underground, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the subject the base (`docs/ARCHITECTURE.md`, with files
f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in II.6 and
II.7. The implementer holds the base and this volume and nothing else (§17.1). Every fact the base or another volume
states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's;
`Vnn §n` is a design volume's section, this one included (`V04 §3.2`); `item n` is an amendment item — items 1–113 the
owner's, items 200 and above file f's, each the applied text of a volume's base change request (V04 §10 lists this
volume's); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions
are `J-V4.n` (V04 §9), tests `T-V4-n` (V04 §7).

## 0 In plain words

Under every settlement this stage builds the underground the way the town itself was built: from rules, from the same
seed, after the streets and houses above it exist. It is hidden until you switch it on; when you do, the ground fades to
a pale ghost and the underground appears beneath it as a dungeon-style map — solid rock drawn dark and hatched, every
tunnel, gallery and chamber a pale void cut into it, one depth level at a time.

**The sewers come first** — sometimes in a town, always in a city. They follow medieval practice: the town's small
streams are covered over and become the main drains, a few big sewers run under the principal streets, and everything
falls downhill, never uphill, to an outlet just above the river or the shore below the harbour and the mills — or, where
there is no water, to a cess field outside the walls. Each sewer is as big as the part of the town that drains into it,
so the trunks near the river are large and the branches small. Most houses empty into the street or a pit; only the
wealthier houses and the trades that need water are connected. Where a sewer passes under the town wall a grille closes
it. In the realistic setting few sewers are big enough to walk in; the fantasy setting makes them large, vaulted and
looped.

**People live along the walkable sewers,** in rooms cut into the tunnel wall on both sides, one or two rooms deep, with
no alleys — the owner's rules — and never under a house, a wall, the river or wet ground. They are the town's poorest
and those with reasons to hide.

**Beside the sewers,** where history or geology explains them. Catacombs grow under the town's **cemeteries** — its
churchyards, its burial grounds and, in a big city, the great cemeteries outside the gates — as large as the dead they
hold: at most one in a town, a few in a city by its number of churches, the largest under the cemetery that buries the
most. A church keeps its own **crypt** in its basement (the cathedral always, the largest); a crypt joins a catacomb only
where one grows beneath it. Caves follow the water in limestone or old lava, more often in mountains and where people
mine, and narrow fissures open in ordinary hill rock; a mine may break into a cave. Old quarries lie under or near a
town, as large as the stone the town was built from, and a great city may turn a worked-out quarry into an ossuary.
Vaults carry streets over slopes and bridges onto their banks, and cisterns hold water under the oldest precincts; where
a great fire or flood made the townspeople raise the ground, the old streets survive underneath as a buried town — and
where the settlement's own history shows it was once larger, or was destroyed and built over, its former streets, walls
and great buildings lie buried at their old level once enough time has passed.

**Under the arches.** Where a city carries a road on a viaduct, a raised road or an aqueduct, the ground under some of its
arches is walled in as a vault — a store, a stable, a workshop's back room — while the arches over a street, a stream,
steep ground or open fields stay open. You can open or close any arch, and removing the raised way removes its vaults with
it. Where the city draws water from an aqueduct, a great cistern lies under the conduit house at its end, and the other
cisterns are dug only where neither a river nor the aqueduct's fountains are near. Terraced streets step down at their
retaining walls, and the sewer beneath drops down a shaft there rather than breaking the surface. The piers of a viaduct
and the footings of a retaining wall go down into the ground: where they meet a cave or a ruin, the builders filled it.

**Older than the town.** Where the dossier or the site gives a reason — ancient ruins, a magical node, a history of
magic — the remains of an older civilisation lie beneath: its streets, halls, temples and tombs laid out on its own plan,
straight-walled and columned, visibly not the town above, and decayed so that its great halls survive and its houses are
rubble. Where the older people built in steps, their temple or tomb stands as a stepped monument in its hall, its upper
tiers fallen into a mound and its top cut off where the ground above presses down.

**Found, or not.** A cave or a ruin can lie under a hamlet as easily as under a city, and most start sealed: nobody
knows they are there. Every house built over one may dig down into it, a sinkhole or a cave mouth may open it, a new sewer
or a growing catacomb may cut through it; so a village over a cave rarely reaches it and a city over it usually has, and
the deepest chambers stay hidden even under a metropolis. Only once a way in exists do people settle in it — a few
squatters or a cult, or, in a large place, the undercity. A way in counts only while it is open: when the last open path
closes — the sewer sealed, the cellar filled, the house above gone — the place is **lost**, remembered but drawn faded,
its people leave, and it waits to be found again. A game master can show the sealed and lost voids to see what the
inhabitants do not.

**The undercity** — at most one to three neighbourhoods — settles in the largest reachable void, an old ruin first: it
has its own market square in a great chamber, its own walkways, its own tavern, fence and guild seat, and its lifelines
to the surface for air, water and food. Each of its neighbourhoods is the shadow of a real district above, named as its
underside, and its people are the town's own. Its places sit where the town's rules put them: its trades within reach of
the markets they serve through the ways up, its guild seat away from the garrison above.

**The parts meet, or not.** A catacomb may break into a sewer, a quarry into a cave; each meeting is a typed opening —
open, gated, secret, collapsed or flooded — and some are known only to those who know. Cellars may have a way down; a
thieves' den is more likely to have one.

**Nothing is torn down.** Tunnels silt up, cave in, flood or are bricked up and sealed; they stay as ruins and a growing
town reopens them before it digs new ones. A catacomb never shrinks: when it can grow no further, the old bones are moved
and its ossuaries fill instead.

**Light.** There is no sun below. Lamps at doors, torches at junctions, braziers in the undercity's market, and the
columns of daylight that fall through gratings and shafts are all the light there is.

**Editing** is the same as above ground: draw a tunnel with two points and it routes itself; drag it; make it deeper;
silt it or reopen it; draw an old street into a ruin and it follows the ruin's grid; add a way down from any cellar and
everything that way needs — the cellar, the passage, the opening — is built for you in one step you can undo; open a way
into a sealed cave and the preview lists everything that opening reaches.

## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds

Ten engines, one view and their editing, all in one package `@plat/under` (J-V4.1; item 505):

| engine | the base's slot | what it makes | V04 § |
|---|---|---|---|
| **U-NET** the sewer network | `SewerStrategy` (II.6; II.7.1–II.7.2) | the `sewer` system record, part 0's rock face, `Tunnel` records with their chains, invert profiles, outfalls and grilles, underground `Junction` records with the chamber flag, the plot connections (`serves`), the network's own gratings and mouths | 3.2 |
| **U-FORECAST** the S7b predictor | S7b (6)–(7) (§4.5) | `NetworkForecast`: the predicted navigable run length and capacity, each void source's predicted capacity, the undercity's existence verdict (P6) and each cavern or ruin void's chance of access (P7), read by S7b's allocations | 3.3 |
| **U-FRONT** the sewer-front neighbourhoods | `UndergroundStrategy` (II.7.3–II.7.4) | part 0's blocks, plots, buildings and access points; F6: the scattered dwellings of accessible cavern and ruin clusters | 3.4 |
| **U-SYS** the void systems | `UndergroundSystemStrategy` (II.7.6; g items 109, 110, 113 (c)) | `ruin` (with its stepped monuments and modelled columns), `catacomb` (with its `CatacombComplex` records), `cavern` (the fissure variant included), `quarry` (mine voids, chain mines and the quarry ossuary), `vaults` (forced vaults, the arch vaults under raised ways and an aqueduct's terminal cistern included) and `buried` systems (a raised grade's, a scar's and the history replay's former settlement): their parts, galleries, chambers and their own entrances | 3.5 |
| **U-ACCESS** the access pass | II.7.6's connection graph (2)–(4); g items 109 (j) (3), (3b), (k) (2), 113 (e) | overlap and mine breaches, proximity links, crypt joins, dig-from-above accesses, public openings, the sewer's adoption of ancient drains, and the excavation reading (`unexcavated`, `accessible`, `lost`) | 3.5.7 |
| **U-CITY** the undercity | `UndercityStrategy` (II.7.5) | undercity districts, blocks, plots, buildings, walkways, the main chamber | 3.6 |
| **U-LINK** the connection stage | `UndergroundLinkStrategy` (II.7.6 (1), (5)) | lifelines, item 64's basement accesses, the passages of the dossier's subterranean institutions, outskirts | 3.7 |
| **U-DIG** the closure generators | §7.3 item 9 (d), II.7.6's *pieces* | the `dug` system and its passages, for `addUndergroundAccess`, an undercity lifeline, a subterranean dossier institution and its network, a dwelling declaration's closure on a sealed void and the grouped access before it (item 372) | 3.8 |
| **U-RECONCILE** the tail's reconcile | S10b's plan–fit–reconcile (§4.7) | T8: the only tail stage that writes ground records — uses and households only, never geometry — for what the tail could not seat below | 3.7a |
| **U-FADE** the underground's part of an epoch | §4.11's decline step and grow path, as V06's participants call them: `under.fade` (the underground's own strikes after the fabric's strike pool, item 319), `under.extend`, `under.access`, `under.undercity` (V06 §3.2) | the fade candidates and their conversion, the foundations over the epoch's new footings (`Foundations.apply`), the network laid whole the first epoch sewers turn on and extended at every later one (with its drops at new retaining walls), the new quarry and mine workings, the catacombs' growth (the span's calamity deaths in the need), the arch-vault reconcile over the epoch's raised ways, the scoped access pass (the village workings included) with the lost reading, the undercity's re-read and clearance, F6's dwellings filled by V06's relocation | 3.10 |
| **U-VIEW** view, labels, exports | §8.1, §8.2, §8.4, §9, §11 | the underground display list and its programs (`ruinMasonry` and the `unexcavated` program among them), the cut-away, labels, the per-band exports | 5 |

The underground's light rows (§4.7's `LightRule`, arena `underground`) are placed by the engines that make their hosts
(V04 §3.9); the edit kinds are the base's (§7.1), completed in V04 §4.

### 1.2 The base hooks this volume consumes (cited, never restated)

| hook | where | how this volume uses it |
|---|---|---|
| existence by tier, the S0 draw, `Features.sewers`, `Features.underground`, the toggle as visibility | II.7.1, §4.2 S0, §2.9, §7.8 | U-NET's gate; the tail's gate (V04 §3.1) |
| the rung rows `RungProfile.layers.sewers`, `.undercity` | §1.1 | U-NET's and U-CITY's gates |
| the network's declaration, families, presets | II.6 (`SewerStrategy`) | implemented by U-NET; the family and preset are two recipe controls (item 403) |
| the tunnel profile table, navigability, depth and fall, outfalls on the downstream side | II.7.2 | U-NET's sizing and invert pass |
| the drain connection table and `drainOf` | II.7.1 | U-NET step N8 |
| the owner's rules U1–U3, the occupants, the cut, the surface constraint, access, depth, lifecycle, order | II.7.3 | U-FRONT, verbatim as rules; this volume adds only the steps and the constants' provenance |
| `AccessPoint`, `UndergroundRule`, `UndergroundStrategy` | II.7.4 | records and rules read as declared |
| the undercity: requirements, existence and bound, size law, allocation, shadow rules, outskirts, lifelines and light | II.7.5 | U-CITY and U-LINK |
| the systems, parts, depth bands, derivations, connection graph (the lost void included, item 113 (e)), access-edit pieces, `UndergroundSystemRow`, `LinkRule`, `RaiseGrade`, the buried former settlement (item 113 (c)) | II.7.6 | U-SYS, U-ACCESS, U-LINK, U-DIG |
| the condition table, `silt`/`caveIn`/`seal`/`reopen`/`flood`, the stretch split | II.6, §4.11 (`DeclineOp`) | U-FADE and the hand conversions |
| the records `Tunnel`, `UndergroundSystem`, `Gallery`, `Chamber` (`ChamberKind`), `UndergroundLink`, `LightSource`; `Outfall` | §2.7; §2.3 | written as declared (items 247–250) |
| `HistoryHint` and `HistoryRecord` (the replay's record, its `buried` list) | §2.7, §4.11, §7.7 DR36–DR39 | the catacombs' age, the scar's buried town, the replay's buried former settlement (V04 §3.5.5) |
| the underground levels and parts, the `under<n>/` prefixes | §2.1, §2.2 rule 1, §3.4 | every stage's transactions |
| `kerb`, `corridorUnion`, `bandUnion` on every arena; chambers as closed chains | §3.7 (J-A12.31, J-A65.32) | every stage's band and cut |
| path search (A\*/Dijkstra) | §3.1 | U-NET's tree, U-DIG's connector |
| S9–S11 and the placement solver on another arena | §4.7, §4.7 S10b | U-FRONT and U-CITY run them with `ContextVector.arena = 'underground'` |
| S7b (6) and (7) | §4.5 | read U-FORECAST (in a standalone neighbourhood document after the one-district allocation, V04 §3.1) |
| the light table and the lighting model (sources, shafts, hand lantern) | §4.7 *Light sources*, §8.4 | V04 §3.9 and V04 §5.3 |
| the `states` rows and the underground programs (`ruinMasonry`, `unexcavated`) | §8.2 | V04 §5.2 adds the undeclined programs' details |
| depth bands, the cut-away, `depthBand` view key, the view key `showUnexcavated` | §8.4, §2.9 | V04 §5.1 |
| the knowledge filter | §9.2, §8.1 item 7 | every mark and label |
| the exports' underground rows | §11.1 | V04 §5.5 |
| the `sewer` concern, the ordinary concerns and the fixed-key draw | §6.1 | every draw (V04 §3.12) |
| the anchor table rows for access points, tunnels, galleries, chambers, links, undercity neighbourhoods | §6.3 | identity across re-derivation |
| the edit kinds, the locality rows, the lifecycle rows, the closure rule | §7.1, §7.3, §7.4, §7.3 item 9 — its (d) with the dwelling closure and the grouped access (item 372) | V04 §4; the dwelling closure's way in, V04 §3.8 |
| F-UNDER, F-VOID, F-NET, §5.3's underground rows; a stage's own warnings | §5.2, §5.3, §5.4 | V04 §3.11 |
| the hook tests T11-1, T12-1, T14-1, T63–T66 | §13.2 | kept and run on generated output; V04 §7 adds T-V4-n |
| DR17, DR19, DR24, DR29–DR34, DR36–DR39 and the dossier's staged rows | §7.7, item 88 | V04 §1b.5's dossier trace |
| item 109's base side: the `ruin` kind and depth band, the relief rows, the mining boost and the fissure variant, a ruin as a void source and its rank, basement access over ruins, the DR rows, the ruin style, the catacomb gate, sources, count rows and ratchet | g item 109 (a)–(k) at §2.7, §4.2 S1, II.7.3, II.7.5, II.7.6, §7.7, §8.2; items 554–564 | U-SYS, U-ACCESS, U-CITY, U-FADE, U-VIEW build it to depth |
| items 102–108's base side: the daylight-share term, the siting profiles and relation families, custom profile resolution, the supply web, walls on natural barriers, spread and pull, institution ladders | g items 102–108 | V04 §3.6a (the cross-arena distance), F4 and C4 (members, clandestine modes), N11a (grilles at walls), F2 and C5 (the daylight-share term in the prosperity the underground inherits — a model reading, never a render input; a shaft's light reads the render's shadow term, V04 §5.3), V04 §3.5.3 (chain mines) |
| item 113's base side: history-first generation and the replay, the buried former settlement, access through open links only | g item 113 at §4.2 S0, §4.11, §7.7, II.7.6 | V04 §3.5.5 (the buried former settlement), V04 §3.5.7 (the lost reading), V04 §3.10 (the reading at an epoch) |
| the declarations read ahead and the creation prefix | §4.1 *Declarations read ahead*, §7.1 (`creation`) | V04 §4.7 |
| the parity presets and the `extension` cells | §7.6 | item 556, T-V4-35 |
| basements, their water table and the requested-mode ladder | §2.6 *Basements*, II.7.6 step 1 | U-ACCESS's dig floor, U-LINK L5, item 243 |
| `CircumstanceSlice.undercity`, `.magic`, `.biome` | §7.7 layer 2 | U-FORECAST P6, C0, the light rows |
| the concealed institutions' modes and their fallback chain | §4.7 *Concealed institutions* | F4, C4, T8 |
| S10b's plan–fit–reconcile | §4.7 S10b | T8 (V04 §3.7a) |
| the naming record and protected names | §2.8 | tunnel, system, complex and ruin names (V04 §5.4) |
| the stream key's components (stage id, concern, salt, epoch) | §6.1 | V04 §3.12 |
| item 110's base side: `RetainingWall` and S10–S11's levelled ground; the raised way's record on ground parts from 1 (its deck, its raised-way piers, its spans with their `use` and the span rule), the aqueduct's terminal and the fountains it feeds; the revised deck invariant; `levelledGroundCm`, the one reader of levelled heights | g item 110 (a), (b) at §2.7, §3.4, §4.3, §4.6, §4.7, §5.3; items 244, 245, 309 | the ground reads (below), U-NET N3 and N6–N7, the foundations (V04 §3.5.0), the arch vaults, the cistern test and the terminal cistern (V04 §3.5.4), U-ACCESS, U-DIG, the drawing (V04 §5.2) |
| `layTiers`, `TierInput`, `TierLay`, the `stepped-monument` composition row | V02 §2.6, §3.15.1, §3.15.4, §3.15.6 | the ruin's stepped monuments (V04 §3.5.0a (5a)) |
| `Basement.crypt`, `Entrance.faces` `'tunnel'`, `AccessHostRow` | V03 §2.1, §2.4, §3.7.2 (6), §3.7.4 (items 238, 239) | the crypt join (V04 §3.5.7 (c)), the burial-face entrance (V04 §3.5.1 (9)), the underground buildings' entrances (F4, F6, C4) |
| V11's `stepped-shrine` heights row, the `CultureRow.monument` values, `era.raisedVaultM`, `culture.raisedVaultM`, the span's `vaultShare` | V11 §3.6.4, §3.23.4, §3.19.1, §3.20.3, §3.24.2 | the monuments (V04 §3.5.0a (5a)); the span rule's vault share |
| the underground's content rows (ruin chances, cultures, survival order, source rank, dig and opening rows, catacomb rows, burial threshold) | V11 §3.23 | U-SYS, U-ACCESS, U-CITY (V04 §2.3 keeps their schema) |
| `EpochScope` (`raised`, `levelled`, `built`, `basementGrown`, `elements`, `surfaceChanged`, `workings`), the participants `under.fade`, `under.extend`, `under.access`, `under.undercity`, V06's derived catacomb primary and per-epoch cap, the span's calamity deaths (`CalamityRef.deaths`, item 573), the relocation that fills F6's dwellings at an epoch and the in-participant re-homing, the history replay | V06 §2.1, §2.4, §3.2, §3.18 (§3.18.1 (2c), (4), (6); §3.18.2 (3)) | the callers of V04 §3.10's functions (V04 §1b.2) |
| V01's local-place step and its opening pass, `HoodPlace`, the ground `AccessPoint` symbols, `hood.pins` (arena-keyed); its services `districtsAbove(part, element)` and `fabricSignature(region)`; `Recipe.product`, the standalone neighbourhood document's `contextRung` and its one-district allocation; the stage-2 switch `fabric.extensionWeight` and its edit | V01 §2.2, §2.6, §3.7.1, §3.8.2, §3.8.8, §3.10.1 step 6 and (7), §3.15, §3.16, §5.1.2 | the opening pass (V04 §3.10 *The opening pass*); an access's surface head is V01's symbol (V04 §5.2 (7)); no underground hood pins (V04 §1.3); `districtsAbove` read by C5 and V04 §4.5, `fabricSignature` by V04 §3.5.0a (7); the standalone line (V04 §3.1) |
| live sky islands and their churches; the landfall's `fallen_island` decoration, its rubble `quarry` land use and the raised parts it ruins | V05 §1.3, §3.5 (3), §3.16 (4)–(5); item 253 | the catacomb count (V04 §3.5.1 (3)); the access closures (V04 §3.10); the arch vaults' condition (V04 §3.5.4 (d) (2)); a `quarry` with a `source` is never the surface quarry (V04 §3.5.3); nothing else of the sky layer is read |

**The ground, and part 0.** Item 110 (b) gives the ground layer parts from 1 (raised decks). In this volume **the ground**
means `{ layer: 'ground', part: 0 }` unless a raised part is named: every ground read — `pointLocate`, `resolve`, a way, a
junction, a face, a frontage, a footprint, a basement ring, a well pin — is on ground part 0, and the heights read are
`levelledGroundCm(doc, ground, p)` (item 309; the levelling is never written into the `Terrain` raster). **Part 0**
without a layer means the underground layer's part 0, the sewer's. A raised part is read only where this volume names
it: the raised-way record's raised-way piers and spans (V04 §3.5.0's foundations, V04 §3.5.4's arch vaults) and the
cut-away's outlines (V04 §5.2). A raised spine is never a T1 edge, never split and never a junction; its deck carries no
sewer; the way beneath it keeps its own edges, junctions, runs and gratings. In prose the raised way's supports are
**raised-way piers**, always with the qualifier; in identifiers they are `raisedSupport`, because `pier` is this
volume's jetty way class (`NetworkRule.classCost`).

**The sky layer is never read (owner item 2; V05 §1.3; J-V4.101).** Every building, basement, crypt, plot, district,
reservation and face the underground reads is on the ground layer: an island's buildings — its cathedral's rim-slab crypt
included (V05 §3.10 (5)) — are never a dig host, a basement-access host, a crypt-join host or a burial face, a sky
district is never in U-NET's service region, and no underground element, link or access has an end on the sky layer.
The one exception is a count, not a source: the catacomb count counts each church on a live sky island once (V04 §3.5.1
(3); V05 §3.5 (3)). While the underground is the active layer the tools pick ground buildings and points only (V04 §4.1).

**Public ground (J-V4.100).** Stated once here: **public ground** is a way corridor, an L1 `square` or gate-plaza face, or
a block whose `Block.content` is `square` or `green` (V01's dispatched square and green blocks, each one L3 residue face,
V01 §3.5.10; item 210); **a square** is an L1 `square` face or a `square` block; **a yard** is a plot's yard part or a
`yard` block's `yard_common` residue. Each is resolved by `pointLocate` on ground part 0 and, for a block, its
`Block.content` (S9b's eager typing, so every district's blocks carry it before the tail). II.7.3's surface test admits
all of them already, so F3 is unchanged; the readers of the definition are N11's gratings, F5's access order and shafts,
L1's lifeline stair and air grating, `placeAccess`'s kinds, the forced vaults (V04 §3.5.6), the terminal cistern (V04
§3.5.4 (e)), a buried town's squares (V04 §3.5.5) and `OpeningRow`'s `collapsed_shaft` row.

### 1.3 Out of scope, with the reason

* **The evolution engine's scheduling** — when an epoch runs, its population target, its strike pool and the history
  replay's epochs — is the evolution engine's (§4.11; V06). This volume supplies what that engine calls for the
  underground (`UndergroundFade`, `Foundations.apply`, `SewerStrategy.derive` at the first sewers epoch and `.extend`
  after it, `QuarryWorkings.extend`, `CatacombGrowth.grow` with V06's cap, primary and calamity deaths, `AccessPass.run`
  over an `EpochScope`, `ArchVaults.reconcile`, `BuriedFormer.lay`, the undercity's epoch re-read; V04 §3.10, each with
  its caller in V04 §1b.2) and runs them by hand now.
* **The plan rung's basement plan** (stage 3, §2.6 item 28) draws the stair, ladder or hatch this volume's access
  records reserve; the plan itself is V03's. This volume writes the reservation (the access record and its `basement`
  host) and marks the rung `stale` (§7.3 item 9 (d)).
* **The underground close-up** (II.1's `layer: 'underground'`) is stage 2's workflow; it reads the committed part and
  needs nothing from this volume beyond the records. The `underground` rows of V01's `hood.pins` (V01 §2.2, §3.8.2,
  arena-keyed) are this volume's: it ships none, so an underground close-up draws no hood pins — the underground's
  furniture is its light rows (V04 §3.9) and its access marks (V04 §5.2) (J-V4.97).
* **The port's wiring to a live host** is the SettlementForge stage's; this volume reads only the neutral digest and the
  blueprint fields the port already fills (V04 §1b.5).
* **Crypts** — a church's burial vault in its own basement — are V03's (`Basement.crypt`, item 238, derived with the
  basement; the cathedral's largest-crypt bar), V11's (the class rows' three-valued crypt column, V11 §3.5.8) and V02's
  (the forced basement), g item 109 (k) (2). This volume lays nothing with a church as its source; it reads
  `Basement.crypt` only for the crypt join (V04 §3.5.7 (c)) and the class's crypt column only for the church-class host
  rule (V04 §3.5.1 (9)).
* **The raised way itself** — its generation, course, raised-way piers, spans and their `use`, the span rule, its decay
  and repair — is the base's (item 244) and V06's over epochs (V06 §3.19); this volume lays the arch vaults the base's
  `vault` spans name, the aqueduct's terminal cistern and nothing on a raised deck. The vault's infill wall and door on
  the ground view are the base's drawing.
* **Terraces and deck plots.** `RetainingWall` and the levelling are the base's (S10–S11, item 245); this volume reads
  the walls and the levelled ground. Deck plots (item 110 (d)) have no underground part: a deck building has no basement,
  no dig floor and no crypt (V02 §3.16 (6)), so U-ACCESS (d) and L3 never meet one.
* **The second known-city fixture** (item 110 (e)) is V12's; its raised road and ravine run this volume's bars T-V4-62 –
  T-V4-70.
* **The underground's content rows** — the ancient-culture plan rows, the persistence order, the rank weights, the ruin
  chances, the dig and opening rows, the catacomb rows, the burial threshold and the `ruin` naming slice — are V11's
  (V11 §3.23, §3.20); their schema is V04 §2.3's.
* **The scheduling over epochs** of excavation, catacomb growth, ruin decay and the links' re-binding is V06's, over this
  volume's rules (V04 §3.10).
* **The controls** for `showUnexcavated` and for the active layer are V09's; this volume names the view key and what it
  draws.
* **The village product's display of the layer** is V07's; this volume runs the tail at the village rungs (V04 §3.1).
* **The clerk's explanations** are V10's, reading `cause`, `blockedBy`, `reusedBy`, the excavation reading and the records
  this volume writes through its providers (V04 §4.5).
* **The port's side of the dossier sources** is V08's; this volume traces every fact it reads (V04 §1b.5).
* **Nothing else is out of scope.** Caverns and ruins exist at every rung (g item 109 (j) (1)); the other void systems keep
  TOWN and above, save an inherited system in maintenance mode at a village rung (V04 §3.1), the buried former settlement,
  which follows the history replay at every rung (V04 §3.5.5 (b)), and the arch vaults and terminal cistern, which follow
  their raised way at every rung; the dug passage exists at every rung.
