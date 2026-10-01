# Design volume 4 — The underground: sewers, tunnels, underground neighbourhoods, catacombs, caverns, quarries and the undercity

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V4-underground, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the subject the base (`docs/ARCHITECTURE.md`, with files
f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in II.6 and
II.7. The implementer holds the base and this volume and nothing else (§17.1). Every fact the base or another volume
states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's;
`Vnn §n` is a design volume's section, this one included (`V04 §3.2`); `item n` is an amendment item — items numbered below 200 the
owner's rules (item 112 the program's, under J122), items 200 and above file f's, each the applied text of a volume's
base change request (V04 §10 lists this volume's); `J-VI.n` is a volumes-integration decision
(`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V4.n` (V04 §9), tests `T-V4-n` (V04 §7).

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
| **U-FADE** the underground's part of an epoch | §4.11's decline step and grow path, as V06's participants call them: `under.fade` (the underground's own lottery after the fabric pool, item 319), `under.extend`, `under.access`, `under.undercity` (V06 §3.2) | the fade candidates and their conversion, the foundations over the epoch's new footings (`Foundations.apply`), the network laid whole the first epoch sewers turn on and extended at every later one (with its drops at new retaining walls), the new quarry and mine workings, the catacombs' growth (the span's calamity deaths in the need), the arch-vault reconcile over the epoch's raised ways, the scoped access pass (the village workings included) with the lost reading, the undercity's re-read and clearance, F6's dwellings filled by V06's relocation | 3.10 |
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
| the hook tests T11-1, T12-1, T14-1, T63-4, T64-1 – T64-3, T65-1 – T65-8, T66-1 – T66-4 and T66-6, and the owner items' bars T109-1 – T109-6, T113-4, T113-5, T120-4, T120-5, T123-1, T123-2 and T123-6 | §13.2 (the underground layer's take-over row) | kept and run on generated output, each V04 §7 test naming the bar and the clause it takes; V04 §7 adds T-V4-n |
| DR17, DR19, DR24, DR29–DR34, DR36–DR39 and the dossier's staged rows | §7.7, item 88 | V04 §1b.5's dossier trace |
| item 109's base side: the `ruin` kind and depth band, the relief rows, the mining boost and the fissure variant, a ruin as a void source and its rank, basement access over ruins, the DR rows, the ruin style, the catacomb gate, sources, count rows and ratchet | g item 109 (a)–(k) at §2.7, §4.2 S1, II.7.3, II.7.5, II.7.6, §7.7, §8.2; items 554–564 | U-SYS, U-ACCESS, U-CITY, U-FADE, U-VIEW build it to depth |
| items 102–108's base side: the daylight-share term, the siting profiles and relation families, custom profile resolution, the supply web, walls on natural barriers, spread and pull, institution ladders | g items 102–108 | V04 §3.6a (the cross-arena distance), F4 and C4 (members, clandestine modes), N11a (grilles at walls), F2 and C5 (the daylight-share term in the prosperity the underground inherits — a model reading, never a render input; a shaft's light reads the render's shadow term, V04 §5.3), V04 §3.5.3 (chain mines) |
| item 113's base side: history-first generation and the replay, the buried former settlement, access through open links only | g item 113 at §4.2 S0, §4.11, §7.7, II.7.6 | V04 §3.5.5 (the buried former settlement), V04 §3.5.7 (the lost reading), V04 §3.10 (the reading at an epoch) |
| item 119's base side: §12's laws as the targets, the ten-second comfort level of total time for a one-time wait, the measured-gain and progress rules, the interaction budgets kept | g item 119 at §12.1, §12.10's R12-31 – R12-34; V11 §3.25.8's `perf.qualitySpend` rows | V04 §6 *The comfort level*; T-V4-32 (b) |
| item 120's base side: the per-viewer view key `find` (its chips and the Show gaps switch), the veil, halo, outline, pin and count-bubble rows, the gazetteer's match listing by class, area and layer under knowledge admission, a picture export drawing Find, the overlay's budget; V09's Find panel and its `live.find` provider | g item 120 at §2.9, §8.2, §11.1, §11.2, §12.5; V09 | V04 §5.1 *Find on Below* (`underFindPlaces`); V04 §5.5; T-V4-81 |
| item 123's base side: one plan, never redrawn, under a damage layer (§2.6 step 7); one keyed threshold per plan element, §6.3's concern `plan.damage` keyed by the building's lineage and the element's id, no id minted; the damaged plan's drawing and the battle maps' line of sight; V03's damage layer and its drawing, V06's `decayLevel` and `decayPeak`, V11's ranges by element kind | g item 123 at §2.6, §6.3, §8.6, §11.1, §13.2; V03; V06 §3.23; V11 | V04 §5.6 (the kinds below ground, the level each element reads, the drawing in the underground view and the per-band exports); T-V4-82 |
| item 122 (d)'s disaster look over a building: §2.7's `ConditionOverlay` and its reader rule, §2.9's `crises`, §7.7's DR44, §10.2's `lookLevel` by severity, read through V03 §5.6 (4)'s drawn level (`PlanDamage.level`) | g item 122 at §2.7, §2.9, §7.7, §10.2; V03 §5.6 (4) | V04 §5.6 (1) (a storey below 0 under a look over its building); UE33; T-V4-82 (i) |
| the declarations read ahead and the creation prefix | §4.1 *Declarations read ahead*, §7.1 (`creation`) | V04 §4.7 |
| the parity presets and the `extension` cells | §7.6 | item 556, T-V4-35 |
| basements, their water table and the requested-mode ladder | §2.6 *Basements*, II.7.6 step 1 | U-ACCESS's dig floor, U-LINK L5, item 243 |
| `CircumstanceSlice.undercity`, `.magic`, `.biome` | §7.7 layer 2 | U-FORECAST P6, C0, the light rows |
| the concealed institutions' modes and their fallback chain | §4.7 *Concealed institutions* | F4, C4, T8 |
| S10b's plan–fit–reconcile | §4.7 S10b | T8 (V04 §3.7a) |
| the naming record and protected names | §2.8 | tunnel, system, complex and ruin names (V04 §5.4) |
| the stream key's components (stage id, concern, salt, epoch) | §6.1 | V04 §3.12 |
| item 110's base side: `RetainingWall` and S10–S11's levelled ground; the raised way's record on ground parts from 1 (its deck, its raised-way piers, its spans with their `use` and the span rule), the aqueduct's terminal and the fountains it feeds; the revised deck invariant; `levelledGroundCm`, the one reader of levelled heights | g item 110 (a), (b) at §2.7, §3.4, §4.3, §4.6, §4.7, §5.3; items 244, 245, 309 | the ground reads (below), U-NET N3 and N6–N7, the foundations (V04 §3.5.0), the arch vaults, the cistern test and the terminal cistern (V04 §3.5.4), U-ACCESS, U-DIG, the drawing (V04 §5.2) |
| `layTiers`, `TierInput`, `TierLay`, the `stepped-monument` composition row | V02 §2.6, V02 §3.15.1, V02 §3.15.4, V02 §3.15.6 | the ruin's stepped monuments (V04 §3.5.0a (5a)) |
| `Basement.crypt`, `Entrance.faces` `'tunnel'`, `AccessHostRow`; the plan's parts and their ids, the basement storeys, the crypt's plan and column grid | V03 §2.1, V03 §2.2, V03 §2.4, V03 §3.7.2 (6), V03 §3.7.4, V03 §3.7.5 (items 238, 239) | the crypt join (V04 §3.5.7 (c)), the burial-face entrance (V04 §3.5.1 (9)), the underground buildings' entrances (F4, F6, C4); the kinds below ground (V04 §5.6) |
| V11's `stepped-shrine` heights row, the `CultureRow.monument` values, `era.raisedVaultM`, `culture.raisedVaultM`, the span's `vaultShare` | V11 §3.6.4, V11 §3.23.4, V11 §3.19.1, V11 §3.20.3, V11 §3.24.2 | the monuments (V04 §3.5.0a (5a)); the span rule's vault share |
| the underground's content rows (ruin chances, cultures, survival order, source rank, dig and opening rows, catacomb rows, burial threshold) | V11 §3.23 | U-SYS, U-ACCESS, U-CITY (V04 §2.3 keeps their schema) |
| `EpochScope` (`raised`, `levelled`, `built`, `basementGrown`, `elements`, `surfaceChanged`, `workings`), the participants `under.fade`, `under.extend`, `under.access`, `under.undercity`, V06's derived catacomb primary and per-epoch cap, the span's calamity deaths (`CalamityRef.deaths`, item 573), the relocation that fills F6's dwellings at an epoch and the in-participant re-homing, the history replay | V06 §2.1, V06 §2.4, V06 §3.2, V06 §3.18 (V06 §3.18.1 (2c), (4), (6); V06 §3.18.2 (3)) | the callers of V04 §3.10's functions (V04 §1b.2) |
| V01's local-place step and its opening pass, `HoodPlace`, the ground `AccessPoint` symbols, `hood.pins` (arena-keyed); its services `districtsAbove(part, element)` and `fabricSignature(region)`; `Recipe.product`, the standalone neighbourhood document's `contextRung` and its one-district allocation; the stage-2 switch `fabric.extensionWeight` and its edit | V01 §2.2, V01 §2.6, V01 §3.7.1, V01 §3.8.2, V01 §3.8.8, V01 §3.10.1 step 6 and (7), V01 §3.15, V01 §3.16, V01 §5.1.2; `HoodPlace` declared at §2.7 with its registry row (item 207 (b)) | the opening pass (V04 §3.10 *The opening pass*); an access's surface head is V01's symbol (V04 §5.2 (7)); no underground hood pins (V04 §1.3); `districtsAbove` read by C5 and V04 §4.5, `fabricSignature` by V04 §3.5.0a (7); the standalone line (V04 §3.1) |
| live sky islands and their churches; the landfall's `fallen_island` decoration, its rubble `quarry` land use and the raised parts it ruins | V05 §1.3, V05 §3.5 (3), V05 §3.16 (4)–(5); item 253 | the catacomb count (V04 §3.5.1 (3)); the access closures (V04 §3.10); the arch vaults' condition (V04 §3.5.4 (d) (2)); a `quarry` with a `source` is never the surface quarry (V04 §3.5.3); nothing else of the sky layer is read |

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
(3); V05 §3.5 (3)). While Below is the working layer the tools pick ground buildings and points only (V04 §4.1).

**Public ground (J-V4.100).** Stated once here: **public ground** is a way corridor, an L1 `square` or gate-plaza face, or
a block whose `Block.content` is `square` or `green` (V01's dispatched square and green blocks, each one L3 residue face,
V01 §3.5.10; item 210); **a square** is an L1 `square` face or a `square` block; **a yard** is a plot's yard part or a
`yard` block's `yard_common` residue. Each is resolved by `pointLocate` on ground part 0 and, for a block, its
`Block.content` (S9b's eager typing, so every district's blocks carry it before the tail). II.7.3's surface test admits
all of them already, so F3 is unchanged; the readers of the definition are N11's gratings, F5's access order and shafts,
L1's lifeline stair and air grating, `placeAccess`'s kinds, the forced vaults (V04 §3.5.6), the terminal cistern
(V04 §3.5.4 (e)), a buried town's squares (V04 §3.5.5) and `UnderOpeningRow`'s `collapsed_shaft` row.

### 1.3 Out of scope, with the reason

* **The evolution engine's scheduling** — when an epoch runs, its population target, its strike pool and the history
  replay's epochs — is the evolution engine's (§4.11; V06). This volume supplies what that engine calls for the
  underground (`UndergroundFade`, `Foundations.apply`, `SewerStrategy.derive` at the first sewers epoch and `.extend`
  after it, `QuarryWorkings.extend`, `CatacombGrowth.grow` with V06's cap, primary and calamity deaths,
  `AccessPassStrategy.run` (II.7.6) over an `EpochScope`, `ArchVaults.reconcile`, `BuriedFormer.lay`, the undercity's
  epoch re-read; V04 §3.10, each with
  its caller in V04 §1b.2) and runs them by hand now.
* **The plan rung's basement plan** (stage 3; §2.6, item 28) draws the stair, ladder or hatch this volume's access
  records reserve; the plan itself is V03's. This volume writes the reservation (the access record and its `basement`
  host) and marks the rung `stale` (§7.3 item 9 (d)).
* **The underground close-up** (II.1's `layer: 'underground'`) is stage 2's workflow; it reads the committed part and
  needs nothing from this volume beyond the records. The `underground` rows of V01's `hood.pins` (V01 §2.2, V01 §3.8.2,
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
  (V11 §3.23, V11 §3.20); their schema is V04 §2.3's.
* **The scheduling over epochs** of excavation, catacomb growth, ruin decay and the links' re-binding is V06's, over this
  volume's rules (V04 §3.10).
* **The controls** for `showUnexcavated` and for the working layer (`workingLayer`, V09 §4.2) are V09's; this volume names the view key and what it
  draws.
* **Find** (g item 120) — its panel, type-ahead, chip grid, results list and `live.find` provider are V09's;
  the veil, halo, outline, pin and count-bubble rows rendering's (§8.2); the matches §11.2's gazetteer listing. This volume
  states only where a match lies Below and how it reads across the depth bands (V04 §5.1 *Find on Below*).
* **The damage layer** (g item 123) — the plan it lies over, its drawing and its panel lines are V03's, the decay level
  V06's (V06 §3.23), the ranges by element kind V11's and the threshold draw §6.3's. This volume states the kinds below
  ground, the level each element below ground reads, the drawing of damage in the underground view and the per-band
  exports, and that the damage never touches the access model (V04 §5.6).
* **The village product's display of the layer** is V07's; this volume runs the tail at the village rungs (V04 §3.1).
* **The clerk's explanations** are V10's, reading `cause`, `blockedBy`, `reusedBy`, the excavation reading and the records
  this volume writes through its providers (V04 §4.5).
* **The port's side of the dossier sources** is V08's; this volume traces every fact it reads (V04 §1b.5).
* **Nothing else is out of scope.** Caverns and ruins exist at every rung (g item 109 (j) (1)); the other void systems keep
  TOWN and above, save an inherited system in maintenance mode at a village rung (V04 §3.1), a buried former settlement
  under a place that once stood at TOWN or above (V04 §3.5.5), and the arch vaults and terminal cistern, which follow their
  raised way at every rung; the dug passage and a dossier catacomb record's charnel vault (V04 §3.5.1 (10)) exist at every
  rung.

## 1b Wiring table — every new piece, what feeds it and what it feeds

Every record, field, table, stage output, interface, edit kind and entity kind this volume adds, with its producer and
its consumer. A piece the base carries names its base home and the file f item that put it there; the base declares it
and this volume states only its own producers and consumers. No piece is listed without a consumer.

### 1b.1 Records, fields and tables

| piece | fed by (producer) | feeds (consumers) | home |
|---|---|---|---|
| `Outfall` | S1 (3) writes `Terrain.outfalls`; U-NET N2 writes `Tunnel.outfall` | U-NET N2 (candidates), N3 (roots); U-LINK L1 (a route outside); §8.2's mouth glyph; §11.1's GeoJSON point | §2.3, §2.7 (item 205) |
| `Junction` on an underground part, with `arms` and `chamber` | U-NET N9, N10; U-CITY C3 (walkway junctions); U-SYS (gallery junctions); a `drawTunnel` fold | `corridorUnion` (the wedge's owner, §2.2 rule 1); the `tunnel` light rows (V04 §3.9); the chamber program (V04 §5.2); U-FRONT F2 (no plot on a chamber wedge) | §2.4 (item 208) |
| `wayFall(way)` (a reading) | the terrain sampler, at read | U-NET N3's edge direction; the reader (§11.2) | §2.4 (item 208) |
| `Tunnel.depthOffsetCm`, `.serves`, `.chambers` (a view), `.name`, `.grilles` (a view) | `setAttr` (V04 §4.2); U-NET N8; the kernel's wedge resolution; S13a; U-NET N11a | U-NET N7; `drainOf`, U-FADE's usage; the chamber program, VTT portals, glTF solids; labels, the reader; S14's grille bar, VTT closed portals | §2.7 (item 247) |
| `Chamber.kind` | U-SYS (each kind's chamber rows), U-CITY C2 (`market`), `drawChamber` | §8.2's chamber program (cistern water, ossuary niches); the light rows' `chamber` host; U-CITY C1 (void choice); labels | §2.7 (item 247) |
| `District.core` | U-CITY C2 | U-CITY C3 (walkways end at its plaza rim), C4 (the black market's plot and the ring's stall pins), C5 (the parent, through `districtsAbove(part, core)`, V01 §3.16); the light rows (C6: the market chamber's braziers); the neighbourhood's label anchor | §2.5 (item 212) |
| `NetworkRule` (`tables/under/network.json`), `UndergroundFadeRule` (`fade.json`), `UnderLayoutRule` (`layout.json`), `RuinRule`, `UnderOpeningRow`, `DigRule`, `CatacombRule` (`ruin.json`, `openings.json`, `dig.json`, `catacomb.json`) | shipped defaults (V04 §2.3; the rows V11 owns from V11 §3.23); `editTable` (§7.6) | U-NET N1–N12 and U-FORECAST; U-FADE (V04 §3.10); U-CITY C2–C3, U-LINK L1, the light placement's lived scope (V04 §3.9), F0, C1, F6, P7 (`voidDwellings`, S7b (6)'s void part; S7b (6)–(7)'s cap `forecastSafety` and P7's floor `accessForecastMin` are II.7.4's `UndergroundRule` cells, read there), §8.4 (b)'s shaft, glTF, VTT, the symbol size; U-SYS, U-ACCESS, U-CITY C1, U-FADE, U-FORECAST P5–P7, V12's bars | §7.6; V11's registry rows 57–59 |
| the underground light rows (rows of `lights.json`, arena `underground`) | shipped defaults (V04 §3.9) | S11's light placement run by U-FRONT, U-SYS, U-CITY, U-LINK on their parts | §4.7 |
| `NetworkForecast` (derived, never persisted), with `.undercity` (P6) and `.voidAccess` (P7) | U-FORECAST at S7b (in a standalone neighbourhood document after the one-district allocation, V01 §3.10.1 step 6, P7's cap from that allocation's poorest-band households) | S7b (6) (the capacity cap), S7b (7) (the void capacities), S7b (6)'s void-dwelling part, U-CITY C0 (re-read, never re-drawn), U-FRONT F6 | §4.5 |
| `StageDecl.phase` | the registry declarations of this volume's engines | §4.1's scheduler (the tail after the first map) | §4.1, §4.12 (item 325) |
| the two controls `layers.sewers.family`, `layers.sewers.preset` | the recipe's params (§2.9), the advanced panel | U-NET (family, preset); U-FRONT (the preset's navigable rows); U-CITY (`UndercityRule.presets`) | §7.8 (item 403) |
| `LayerSpec.underView` and the roles `rock`, `void` | every shipped sheet's rows for the `under.*` semantics (V04 §5.2) and `setLayer` | S14's underground build, the tile worker, §8.2's slot resolution | §8.2, §8.4 (item 413) |
| label kinds `tunnel`, `system`; naming slices `sewer`, `catacomb`, `cavern`, `quarry`, `vaults`, `buried`, `undercity.plaza` | S13a in the tail; the naming pack | S13b, the knowledge filter; S13a's naming of named runs, systems and the main chamber | §9.1 (item 423); §10.4 (item 445) |
| the dossier rows `tables/dossier/sanitation` and `tables/dossier/subterranean` (V04 §2.3a) | shipped rows, not calibratable (every column `calibratable: false`, as V11 §3.1 row 63's) | the port's creation: `toggles.sewers`, a system's forced existence, a placement's `arena` row, each record's binding target | §7.7 DR17 (item 386) |
| F-NET | U-NET's detections | the report's `requestedVsBuilt` and ladder counts (§5.4) | §5.2 (item 330) |
| `RuinRecord` (V04 §2.2) | U-SYS (V04 §3.5.0a) | U-SYS's layout and decay; U-ACCESS (the entrance at its marker); U-CITY C1 (the rank) and C2 (core candidates); S13a (its name); S14 (the `ruinMasonry` program); the exports; V08's `magical_node` site through `ruinCentre()`; the report's `ruin.node` line; V12's `undergroundInputOf`; the `underground` section provider (V04 §4.5) | V04 §2.2 (the `ruin` kind: §2.7) |
| `ruinCentre(doc)` (derived) | `RuinRecord.centre` | V08 (the `magical_node` site at the ruin's heart, g item 109 (f); DR30), the ruin light rows, the `ruin.node` line's test | — |
| the report line `ruin.node: { deposit: Id; ruin: Id; name: NameRef }` (V04 §3.5.0a (9)) | the tail's T6, after S13a names the ruin: one per `magical_node` deposit whose site stands at `ruinCentre()` | V05's why ("the node beneath the old ruins", V05 §3.3, V05 §4.5), V10's why, the reader | §5.4 |
| `CatacombComplex` (V04 §2.2) | U-SYS (V04 §3.5.1) | U-SYS (growth, ratchet, the rank cap against the primary), `CatacombGrowth.grow` under V06's `under.extend`, U-FADE (usage), U-ACCESS (crypt joins), S13a (its name), S14 (ossuary fill), V12's `catacomb.extentM2`, V10 (`blockedBy`), `catacombOutcome`, the report | V04 §2.2 (`UndergroundSystem.sources`: §2.7) |
| `AccessPoint.cause` (`AccessCause`, V04 §2.2) | every creator: U-NET N11, U-SYS's entrances, U-ACCESS, U-FRONT F5, U-LINK L1, L3, L5, U-DIG, the edits, the upgrade | the excavation reading, V10's why, V12's `void.*`, V03's access head (`AccessHostRow`), V01's opening pass (a catacomb entrance selected by `cause.system`, V01 §3.7.1), GeoJSON | II.7.4 (item 557) |
| `UndergroundLink.cause`, `Gallery.reusedBy`, `Chamber.reusedBy` | U-ACCESS, U-LINK L1, U-SYS (tomb reuse, the quarry ossuary), the edits | the excavation reading, the adopting system's extent and program, V10, V12's `link.*`, GeoJSON | §2.7 (item 249) |
| `UndergroundSystem.variant`, `.name` | U-SYS (V04 §3.5.2, a fissure); S13a | S14, V12 (a `cavern` with its variant), T-V4-12; labels | §2.7 (item 248) |
| `excavation(doc, cluster)` (derived, never stored): `unexcavated`, `accessible` or `lost` (V04 §2.2) | U-ACCESS (g) over the connection graph and `ExcavationRecord` | U-CITY C1, U-FRONT F6, the knowledge filter, S14's `unexcavated` program, the light rows, V12's `undergroundInputOf`, V10 (`info.under.*`), V01's `DistrictContext.under[].access` (V01 §2.3), the vacancy of a lost cluster's dwellings (V04 §3.5.7 (g)) | V04 §2.2 (item 113 (e); §2.7, II.7.6 cite it) |
| `ExcavationRecord` (V04 §2.2): the elements once reached from the surface | U-ACCESS (g), in the commit whose reading first makes an element's cluster `accessible` | the excavation reading (`lost` against `unexcavated`); V10 ("once known") | V04 §2.2 |
| the register entries of this volume's calibratable columns (V12 §2.6's `CalibrationEntry`, one per column; V04 §8 *The register at each exit*) | the seat landing each step of V04 §8, in the step's change: V12 §3.11's lines for V04's cells, then `plat calibrate register --defaults --milestone <the step's id>` for the rest (J-V4.117) | the provisional-number lint (`plat calibrate register --check`, T-V12-20) at PR tier and at each step's exit; the history rows the due steps append (T-V4-43, T-V4-44, T-V4-45, T-V4-62, T-V4-68; the V4-U5 panel); the corpus stage's target lists at the default line's due — M-CAL, or `M-CAL/under` when a step lands after M-CAL (V12 §3.10.1, V12 §3.10.5) | §13.7, §13.9 |
| the second values of V04 §8's fallbacks table (`distinct.rotateDeg` 45; `monument.tierDecay` 0.9 with `monument.ceilingClearCm` 150) | V04 §8 (J-V4.118) | V12 §3.11's `under.ruin` line: a fallback run (V12 §3.7) after T-V4-45's miss, the panel rule after a V4-U5 No | §13.7 |
| `recipe.layers.ruins` | the recipe's params; the advanced panel's *Ancient ruins* | U-SYS (V04 §3.5.0a, the no-dossier chance), U-FORECAST P5 | §7.8 (item 404), D-3 |
| the view key `showUnexcavated` (J-VI.19) | V09's per-viewer control | S14's `unexcavated` program for unexcavated clusters (drawn only for a `secret` key) | §2.9, §8.4 (items 278, 413) |
| the stage warnings `W_NET_CROSS`, `W_BASEMENT_NEAR_VOID`, `W_VOID_UNDER_WATER`, `W_RUIN_SIMILAR`, `W_CATACOMB_BELOW_TOWN`, `W_SUBTERRANEAN_WET`, `W_OUTFALL_LOW`, `W_RUIN_SOURCE_REMOVED`, `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR`, `W_TERMINAL_CISTERN_SKIPPED`, `W_BURIED_FORMER_SKIPPED` | the tail stages; `W_RUIN_SOURCE_REMOVED` by U-SYS or the dossier phase's mutation (V04 §2.6); `W_BURIED_FORMER_SKIPPED` by `BuriedFormer.lay` (V04 §3.5.5) | the report's `stages[].warnings`, V10 | §5.4 (item 338) |
| `underDistance(member, target)` (V04 §3.6a) | the part's walkway, gallery and tunnel graph and the solver's `street` mode | S10b's relation families for underground members (supply, clientele, competition, links, comfort), the coverage catchments | §4.7 S10b; g items 103, 105, 107 |
| T8's writes | U-RECONCILE | the ground's model digest (finalised after T8), the report's `requestedVsBuilt` | §4.7 S10b |
| the arch vaults (`Chamber` of kind `archVault`, `Chamber.span`) | U-SYS's vaults step from the base's `vault` spans; `ArchVaults.reconcile` at an edit or an epoch | S14 (the vault hatch in the shallowest band), the exports, V10 (the span's reason), a declared institution's placement and V03's plan of it | §2.7 (items 247, 250); item 244 (the span rule) |
| `gradeFaces(chamberId)` (derived, never stored; V04 §3.5.4 (f)) | the chamber's outline and its kind's open faces: an arch vault's two arch mouths, a street vault's and a bridge vault's open arch | V03 §3.12 (9) (windows, the frontage entrance, the face flue on a grade face), V03's `ElaborationRecord.inputs`, the reader | — |
| `Chamber.monument` | the ruin step (V04 §3.5.0a (5a)) through V02's `layTiers`; a `setAttr` on `monument/count` | S14 (a ring and a shadow per standing tier, the mound), the light pass's prisms, U-CITY (obstacles; the core's plaza), GeoJSON rings, glTF prisms, V10 | §2.7 (item 250) |
| `ruinColumns(chamberId)` (derived) | the ruin step (V04 §3.5.0a (5b)) | the `ruinMasonry` program's column dots, V03 §3.12 (6)'s fixed rings, U-CITY's cut (obstacles), glTF and VTT | — |
| `CultureRow.monument` | V11's ancient-culture rows (V11 §3.23.4) | the ruin step's monument rule | §7.6 |
| `foundationObstacles(doc)` (derived) | the base's raised-way piers (to `span.supportFoundationCm`, item 244), the `RetainingWall` footings, the buried aqueduct stretches | the shallow-element rule and the ruin's inverse rule (V04 §3.5.0), the cavern step, catacomb growth (`blockedBy: 'foundation'`), the forced vaults, U-DIG's cost, U-CITY's carve | g item 110 (a), (b) |
| `FoundationsResult` (derived, V04 §2.4) | `Foundations.apply` at an epoch | V06's `under.extend` (the vacated households re-homed inside the participant, V06 §3.18.1 (4)), its report `under.collapsedByFoundation`, V10 (the footing that filled a void) | — |
| `aqueductDelivery(doc)` (derived) | the base's aqueduct records: the terminal and the fountains it feeds (item 244) | the cistern test (V04 §3.5.4 (c)), the terminal cistern | g item 110 (b) |
| the terminal cistern | U-SYS's vaults step, one per aqueduct whose terminal kind is `cistern` | its `well` access, N8 (the terminal building's `channel` need), S14, V10 | II.7.6 (item 559) |
| the wall-crossing knots and drops (V04 §3.2 N6–N7) | U-NET from the base's `RetainingWall`s and levelled ground | N7's inverts, S14's drop glyph, GeoJSON's invert profile | g item 110 (a) |
| `Entrance.faces` `'tunnel'` | S11 under F4, F6 and C4 | V03 §3.12 (4), VTT portals | §2.6 (item 239) |
| `CatacombComplex.blockedBy` `'rung'` | U-SYS at a village rung (V04 §3.5.1 (6)) | V10, the report, V07's hand-off down | V04 §2.2 |
| `UnderLayoutRule.openings.archDoor`; the `vaults` row's `archVault` and `terminalCisternM2` params | shipped defaults | the arch vault's geometry and door light, the terminal cistern | §7.6 |
| the buried former settlement (the `buried` system's elements keyed `former`, V04 §3.5.5 (b)) | `BuriedFormer.lay` at the replay's burial epoch | U-ACCESS (its access by item 109 (j)), U-CITY C1 (the rank of a `buried` source), S14, S13a (its name), the exports, `HistoryRecord.buried` (V06 writes the id), V10 (the story) | II.7.6 (item 113 (c)); §2.7 `HistoryRecord` |
| `underFindPlaces(doc, ids)` (derived, never stored; V04 §5.1 *Find on Below*): each matched underground entity's part, depth bands, glow shapes and plan anchor | the underground records and their bands (§8.4), read at each commit that rebuilds Find's index and at each change of §2.9's `week`, over the model the view draws (the head, or a history frame, V06 §3.15.2) | V09's `live.find` (the glow in the band shown, the ghost pins, **Go there**'s band, the area lift) and its panel's Below count, drawn by §8.2's Find rows; T-V4-81 | §2.9's view key `find` (g item 120) |
| the kinds below ground `cellarWall`, `cellarVault`, `cryptWall`, `cryptVault`, `cryptTomb`, given by `belowKind(building, element)` (derived, never stored; V04 §5.6) | V03's plan parts of each storey below 0 (V03 §2.2, V03 §3.7), the crypt's column grid (V03 §3.7.5), each underground building's footprint sides on its part's rock (off the bands `corridorUnion` commits and the chambers' floors, §3.7; V04 §5.6 (2)) | §6.3's `plan.damage` draw (the kind names V11's range row), V03's drawing of a storey below 0, S14's underground footprints (V04 §5.2 (5)), the per-band VTT's line of sight, T-V4-82 | g item 123 (c); V04 §5.6 |

### 1b.2 Stage outputs and interfaces

| output or interface | implementer | caller or consumer |
|---|---|---|
| `SewerStrategy.derive` | U-NET (`@plat/under/net`) | the tail scheduler, first, after the first map (V04 §3.1); V06's `under.extend` (`afterGrowth` 10) at the first epoch whose prelude turns `Features.sewers` on (V06 §3.2): U-NET whole over the current ways as the epoch's mutation, every existing entity kept and never re-derived, then U-ACCESS (a)'s overlap test over the new runs (V04 §3.10) |
| `SewerStrategy.extend` (V04 §3.10) | U-NET | V06's `under.extend` (`afterGrowth` 10) at every later epoch with `Features.sewers` on, its wall drops over `EpochScope.levelled`; on the grow-by-stage path, §4.11's grow step after the new stage's S11 (item 319) |
| `NetworkForecaster.forecast` | U-FORECAST (`@plat/under/forecast`) | S7b (6), (7) in `@plat/content` (item 551); in a standalone neighbourhood document run by V01's unit run after the one-district allocation (V01 §3.10.1 step 6; V04 §3.1) |
| `UndergroundStrategy.derive` | U-FRONT | the tail scheduler |
| `UndergroundSystemStrategy.derive` ×6 (ruin first) | U-SYS | the tail scheduler, in V04 §3.5.0's order |
| the buried-system builder (V04 §3.5.5) | U-SYS (`@plat/under/sys`) | T2's buried step (a history scar at generation); the `raiseGrade` conversion's operator (II.7.6) at an epoch (V06's hazard phase, V06 §3.11.6) or by hand, which passes it the raised region's records and the `RetainingWall`s the same batch tombstones (V06 §3.19.4 (1)), read on their last live state as the buried floor's steps; `BuriedFormer.lay` (below) |
| `BuriedFormer.lay(doc, epoch, former: Id[]): { system: Id } \| null` (V04 §3.5.5 (b)) | U-SYS (`@plat/under/sys`) | V06's history replay (§4.11 *History-first generation* (5)) at the coarse epoch whose age first passes the burial threshold for a former fabric, inside that epoch's batch; its returned system id is written by V06 into `HistoryRecord.buried` (§2.7) |
| `UndercityStrategy.derive` | U-CITY | the tail scheduler |
| `UndergroundLinkStrategy.link` (item 562's return) | U-LINK | the tail scheduler, T5, after U-CITY |
| `AccessPassStrategy.run(doc, rules, ctx, k, scope?: EpochScope)` (II.7.6) with `excavation(doc, cluster)` | U-ACCESS (`@plat/under/access`) | the tail scheduler, T2b, after U-SYS, with no scope (the whole document; at a village rung every mining use's outside-plot working, V04 §3.5.7 (a)); V06's `under.access` (`afterGrowth` 20) with the epoch's scope — `scope.workings` included — its last step V01's opening pass over the public openings it made (V04 §3.10); every commit that touches an access, a link, an element's closure or a building over a void (the excavation reading and `ExcavationRecord` only) |
| `ruinCentre(doc)` | U-SYS | V08, the ruin light rows, the `ruin.node` report line (T6) |
| V01's opening pass (V01 §3.7.1) | V01's local-place step (`@plat/hood`), called only while it is registered and runs — while `fabric.extensionWeight` > 0 (V01 §3.7.1, V01 §3.15) | the commits V04 §3.10 *The opening pass* lists (the list is stated there once) |
| `districtsAbove(part, element)`, `fabricSignature(region)` (V01 §3.16) | V01's `@plat/hood` | U-CITY C5 (an undercity neighbourhood's `parent`: the first entry for its core, II.7.5 (2)); V04 §4.5's clerk (the districts above a ruin); V04 §3.5.0a (7), the ruin's distinctness step, with the ruin's outline |
| `ArchVaults.reconcile(doc, raised, cause)` (V04 §3.5.4 (d)) | U-SYS | the tail's T2 vaults step (every raised way, after generation's last support run, §2.7's support step (6) (a)); the commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it (V04 §4.3) — among them an edit naming it (its add, removal or re-shape; a `setAttr` on its spans, a span's `use` included, crossings, `clearanceCm` or `spanSpacingCm`; a hand `repairRaised`), a hand landfall (V05 §3.16 (4)) and a hand trace through one of its stations (§2.7's support step (6) (b) (iii)); at an epoch V06's `under.extend` over `EpochScope.raised` (an epoch's raised-way op, a landfall, a circuit's, contraction's or re-anchored stretch's crossing station, the frame growth's deck extension, §3.2 (9); V06 §2.1) |
| `foundationObstacles(doc)`, `aqueductDelivery(doc)`, `ruinColumns(chamberId)`, `gradeFaces(chamberId)`, `workedOut(working, scope?)` | `@plat/under/sys` | the readers of V04 §1b.1's rows; `workedOut` by V04 §3.5.1 (1) (e)'s quarry-ossuary candidates, V06's candidate list (V06 §3.18.2 (1)), V10 |
| `Foundations.apply(doc, scope: EpochScope, cause): FoundationsResult` (V04 §3.5.0) | U-SYS | V06's `under.extend` (`afterGrowth` 10), its first act (V06 §3.18.1 (6)), at every rung, the maintenance mode included (the rule is V04 §3.5.0 *At an epoch*) |
| `underDistance(member, target)` | `@plat/under/distance` | S10b's scorer on the underground parts (V04 §3.6a) |
| `CatacombGrowth.grow(doc, epoch, opts?: { capM2: Record<Id, number>; primary: Id; deaths?: number })` (V04 §3.5.1 (5)–(8)) | U-SYS | V06's `under.extend` (`afterGrowth` 10, after the sewer's extension) with its per-complex cap, derived primary and the span's calamity deaths (V06 §3.18.2 (3), (3a); `CalamityRef.deaths`, item 573, V08 §3.6); on the grow-by-stage path, `SewerStrategy.extend`'s growth stage; every re-derivation (the ratchet) — the last two with `opts` absent |
| `QuarryWorkings.extend(doc, scope: EpochScope, epoch)` (V04 §3.5.3) | U-SYS | V06's `under.extend` (`afterGrowth` 10, after the catacombs' growth), TOWN and above; on the grow-by-stage path, `SewerStrategy.extend`'s growth stage |
| `Reconcile.run` (T8) | U-RECONCILE | the tail scheduler, last |
| `DugGenerators` (basement, target, connector, system, access, reservation, link) | U-DIG | `addUndergroundAccess`'s closure (§7.3 item 9), U-LINK's lifeline closure (II.7.5), U-LINK L5 for a subterranean dossier institution (V04 §3.7); a dwelling declaration's closure on a sealed void (its first rung: target, connector where needed, access, reservation) and the grouped access before it (item 372; V04 §3.8) — at an edit's dry run, and in a skeleton prefix at U-CITY C0 (V04 §4.7) |
| `UndergroundFade.candidates` / `.apply` | U-FADE | V06's `under.fade` (`decline` 10): the underground's own lottery after the fabric pool, uncapped by the district's `fabric` cap (item 319; V06 §3.5.2); a hand `convert` (§7.1) |
| `UndercityEpoch.reread` | U-CITY | V06's `under.undercity` (`afterGrowth` 30), then F6 over the clusters `under.access` made accessible, its new dwellings filled by V06's relocation of the district's poorest-band ground households (up to `voidDwellings.share` and each cluster's `maxHouseholds`), never an S7b (6) allocation at an epoch (V06 §3.18.1 (4); item 319); the households a shrinking or cleared neighbourhood vacates returned to the participant for its re-homing |
| the underground `WhyProvider` (kinds: the underground systems, `AccessPoint`, `UndergroundLink`, `RuinRecord`, `CatacombComplex`, a void cluster) and the `underground` `WhySectionProvider` (on burial faces, buildings over a void, districts above a ruin, raised ways with arch vaults, the terminal building) | `@plat/under` (V04 §4.5) | V10's `why` query (V10 §3.9, V10 §3.9a; BCR-V10-3's section registry), V09's why card and underground panels |
| `catacombOutcome(doc, face)` (read-only, V04 §4.5) | U-SYS, over the candidate pass's derived per-face record | the `underground` section on a burial face; V09's cemetery panel |
| `underFindPlaces(doc, ids)` (V04 §5.1 *Find on Below*) | `@plat/under` | V09's `live.find` overlay provider (g item 120), for the ids §11.2's gazetteer match listing gives on underground parts, after each commit that rebuilds Find's index and at each change of §2.9's `week`, over the model the view draws (the head, or a history frame, V06 §3.15.2) |
| `belowKind(building, element)` (V04 §5.6) | `@plat/under` | §6.3's `plan.damage` draw for an element below ground (its kind's range row, V11's); V03's plan draw of a storey below 0; S14's underground builder (the damaged footprints); the per-band VTT export |
| `drainOf(plot)` (II.7.1's view) | U-NET's `serves` | §11.2's reader; the plot inspector |
| the underground display list (semantics `under.*`, V04 §5.2) | S14's underground builder in `@plat/render` | the tile worker; the exports |
| per-band exports | `@plat/export` (V04 §5.5) | the user; a VTT host |

Each stage's output is consumed: the `sewer` system record and part 0's tunnels by U-FRONT, U-ACCESS, U-LINK, S14 and
the exports; U-FRONT's plots by S10b, S11, S12c, S13a and the statistics; U-SYS's parts by U-ACCESS, U-CITY, U-LINK,
S14; U-ACCESS's links, accesses, excavation reading and `ExcavationRecord` by U-FRONT F6, U-CITY C1, S14, the filter and
the reader; U-CITY's districts by S12c (character), S13a (names), §9.1's quarter tree; U-LINK's links and accesses by S14,
§2.6's plan rung reservation and the reader; T8's writes by the ground's model digest and the report.

### 1b.3 Edit kinds (each with its tool, lifecycle row and undo)

| edit | the authoring tool (§7.1's binding table) | lifecycle row | undo |
|---|---|---|---|
| `drawTunnel` (with `from`, item 355) | T4 `road` (on the underground layer the road tool draws a tunnel) | §7.4's underground tools row | the replaced underground scope |
| `drawChamber` (with `from` and `system`, items 355, 361) | T6 `place` (a chamber is placed by one point and a size) | the same row | the same |
| `addLink` | T4 `road` (two points on two elements) | the same row | the same |
| `placeAccess`, `addUndergroundAccess` | T6 `place` | the underground tools row; the closure row | the closure record |
| `setAttr` on `depthOffsetCm`, `widthCm`, `headroomCm`, kind, `knownTo`, `state`, `Chamber.kind` | T9 `shape` | §7.4's setAttr row | the inverse |
| `convert` `silt`, `caveIn`, `seal`, `reopen`, `flood`, `raiseGrade`, `clearUndercity` | T9 `shape` | §7.4's convert row | the replaced scope |
| `regenerate` on a tunnel run, a system, an undercity neighbourhood | T10 `hold` | §7.4's regenerate row | the replaced scope |
| `adjust` of `layers.sewers.family` / `.preset`, of `recipe.layers.ruins`, of the TOWN *Sewers* toggle (Re-derive from S7b with carry-over; items 403, 404, 549) | T1 `intend` | §7.4's adjust row | the replaced scope |
| `drawTunnel` / `drawChamber` with system `ruin` (on the ruin's axis) | T4 `road` / T6 `place` | the underground tools row | the replaced scope |
| `placeAccess` over an unexcavated or lost cluster (the user's excavation, cause `edit`) | T6 `place` | the underground tools row | the replaced scope (the `ExcavationRecord` entries it wrote go with it) |
| `setAttr` on a `CatacombComplex`'s `fill` | T9 `shape` | §7.4's setAttr row | the inverse |
| `delete` of catacomb galleries (lowers `extentFloorM2`, tombstones the nodes; J-V4.56) | T9 `shape` | §7.4's delete row | the replaced scope |
| `setLayer` (underground visibility, `underView`) | T12 `dress` | §7.4's layer row | the inverse |
| `placeLight` on an underground host | T12 `dress` | §7.4's light row | exact |
| `setAttr` on a raised way's span `use` (the base's path `spans/<a>-<b>/use`, item 244; a held user edit) — V04 lays or removes that span's arch vault in the same commit | T9 `shape` | §7.4's setAttr row | the inverse (the chamber restored with its id) |
| `setAttr` on a ruin chamber's `monument/count` (the monument re-laid by `layTiers`) | T9 `shape` | §7.4's setAttr row | the inverse |
| a raised way added (T4 `road` with `raised`, the aqueduct class), re-shaped (`moveVertex`; a `setAttr` on its `clearanceCm` or `spanSpacingCm`) or deleted (generated or drawn), or crossed by a hand trace through one of its stations (`drawWall`, or `moveVertex` on an enceinte's trace, a re-anchored stretch among them; §2.7's support step (6) (b) (iii)): the base's edit, with V04's `ArchVaults.reconcile` and `foundationObstacles` re-read in the same commit (V04 §4.3), the arch vaults, their links and accesses as fates | T4 `road`; T9 `shape` (its `setAttr` and delete); T3 `wall` | the base's rows; V04 §2.6's arch-vault row | the replaced scope (the vaults' ids and footprints restored) |

`depthBand` and `showUnexcavated` are view keys (§2.9), set by V09's per-viewer controls, never edits and never undone.

### 1b.4 Entity kinds (each rendered, labelled, exported, persisted)

| entity | rendered (V04 §5.2) | labelled (V04 §5.4) | exported (V04 §5.5) | persisted |
|---|---|---|---|---|
| `Tunnel` | band by kind, states | a named run (trunk, culvert) | GeoJSON, SVG, PNG, VTT walls, glTF, CityJSON `Tunnel` | part 0 chunk (§3.9) |
| underground `Junction` | wedge; a chamber in `chamber` | none | as the wedge face (GeoJSON) | part chunk |
| `UndergroundSystem` | its part's rock and voids | a system label (catacombs, caves, quarries, old town, the former town) | GeoJSON (a feature per system with its part and depth range) | entities block |
| `Gallery`, `Chamber` | the system programs | the main chamber's name | all six formats | part chunk |
| `UndergroundLink` | by kind | none | GeoJSON line, VTT portal (in a wall line only), glTF opening | entities block |
| `AccessPoint` | its underground end: symbol by kind and state, sized by its opening row; the shaft's light — its surface head is V01's ground symbol (V04 §5.2 (7)) | none (a public opening's or a catacomb entrance's place is V01's `HoodPlace`, made by the opening pass) | GeoJSON point (with `cause`); VTT: a portal only for a door in a wall line, else a shaft light and a `plat` extension object; glTF shaft of the opening's section | entities block |
| ruin `Gallery`, `Chamber` | the `ruinMasonry` program; the `unexcavated` program while unexcavated or lost | the ruin's `system` label | as every system's; GeoJSON with `culture` and `excavation` | part chunk |
| `RuinRecord` | through its elements and its surface marker | its name (V04 §5.4) | the ruin's GeoJSON system feature | entities block |
| `CatacombComplex` | its galleries; the ossuary fill's niche density | "the Catacombs of ⟨cemetery⟩" | a GeoJSON feature per complex with `source`, `rank`, `extentFloorM2`, `fill` | entities block |
| `ExcavationRecord` | through the `unexcavated` program's choice of a lost cluster | none | GeoJSON's `excavation` property (`lost`) on each element | entities block |
| a tunnel grille (`Tunnel.grilles`) | the gate bar across the band | none | GeoJSON point on the tunnel; VTT closed portal | with its tunnel (a view) |
| underground `Block`, `Plot`, `Building` | as ground, through the cut-away; `vault` hatch; a building's damage (g item 123) by V04 §5.6 | cells unnamed; institutions by the knowledge filter | as ground at depth; the per-band VTT's line of sight following its damage (V04 §5.6) | part chunk |
| undercity `District` | its plaza and walkways | the Under-⟨quarter⟩ label | GeoJSON with `parent` | entities block |
| underground `LightSource` | the light pass | none | GeoJSON, VTT `lights`, glTF `KHR_lights_punctual` | entities block |
| `Outfall` (value on a tunnel) | the mouth glyph at the bank | none | GeoJSON point on the tunnel's feature | with its tunnel |
| an arch vault (`Chamber` of kind `archVault`) | the `vault` hatch in the shallowest band; the raised way's outline in the cut-away; the base draws its infill and door on the ground | one `system` label per raised way's run of vaults, "the ⟨way⟩ Arches" | GeoJSON with absolute floor and ceiling and `span`; VTT walls from the raised-way pier faces, its door a portal; glTF interior only | the vaults part chunk |
| a ruin monument (`Chamber.monument`) | a ring and a shadow per standing tier; the mound in rubble stipple | none (its ruin's label) | GeoJSON a Polygon per standing tier with `tier`, `baseCm`, `topCm`; glTF prisms | with its chamber |
| ruin column points (`ruinColumns`, derived) | the `ruinMasonry` program's dots | none | glTF columns; VTT `line_of_sight` squares | never (derived) |
| the terminal cistern | as a `cistern` | none | as a chamber | the vaults part chunk |
| the buried former settlement (the `buried` system's `former` elements) | as a buried town: streets, storeys, squares, its wall bands as masonry | the `buried` system's label (V04 §5.4) | as every system's, GeoJSON with `formerEpoch` | the `buried` part chunk |

### 1b.5 Dossier facts, traced to their field and derivation row

| fact the underground uses | dossier field (through `DossierDigest`, §14) | derivation row (§7.7) | reader here |
|---|---|---|---|
| population (the TOWN law, the size law's N) | the population | DR7, DR17 | II.7.1's law (S0), II.7.5's size law in U-CITY |
| wealth level (the TOWN law) | `wealth.label` → `intent.wealthLevel` | DR6, DR17 | II.7.1's law |
| sewers forced on at TOWN; the network's binding | an institution matching a `tables/dossier/sanitation` row (V04 §2.3a) | DR17 | the port sets `toggles.sewers = 'on'`; U-NET's gate reads `Features.sewers`; the `sewer` system takes the record's binding |
| a system forced to exist | an institution matching a `tables/dossier/subterranean` row naming a system kind (V04 §2.3a) | DR17 | U-SYS's existence (V04 §3.5.0), U-LINK L5's network (V04 §3.7), the binding |
| a crypt record | an institution matching the subterranean row `crypt` | DR17 | its church building, which V03 §3.7.4 makes `always` (`Basement.crypt`), never a plan room and never a system |
| an institution placed underground | an institution with `facets.subterranean` and no system row | DR17, DR10 | S10b's `arena` hard row; on the surface, the forced basement (item 243) and U-LINK L5 |
| the services and bans of `Underground network` | its record's services ("Discreet passage", "Untaxed storage") and `forbiddenResources` (marsh, floodplain) | DR17, mapping row 34 | L5's network: the `beyondWalls` outlet first and a storage chamber; U-DIG's infinite cost on `damp` and `flood` cells |
| the undercity required or forbidden | `CircumstanceSlice.undercity` (§7.7 layer 2), set to `require` by an `Underground city` record | DR17 | U-FORECAST P6, U-CITY C0, the forced vaults (V04 §3.5.6); the first neighbourhood bound to the record and named by it |
| the black market's binding | a `Black market bazaar` record | DR9, DR17 | the core's black-market use (C5) |
| disorder | the blueprint's `disorder` | DR17 | II.7.5's size law; U-FADE's seal weight; the clearance rule |
| crime | `PortRows.crime` (item 88) | DR16, DR17 | §4.6's access factor and undercity factor (J-A88.41) |
| concealment and knowledge of an institution | `facets.clandestine`, `knownTo` | DR16, DR20 | access `knownTo` (II.7.3 (4)), the concealed modes (F4, C4) |
| the settlement's age and scars | `history.ageYears`, `history.events` (→ `HistoryHint`, item 88) | DR37 (§4.2 S2's stage count reads the same fields) | the catacomb age gate, the scar's buried town (II.7.6), a ruin's `ageYears` |
| the former settlement buried beneath | the history's peak, destruction and events (`peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, terminal death and resettlement; V08's reading) | DR36, DR38, DR39 | `BuriedFormer.lay` at the replay's burial epoch (V04 §3.5.5 (b)); `history.burialYears` and its factors (V11 §3.25.2) |
| an ancient ruin | `site.deposits` of kind `ancient_ruins`, or an institution of scene archetype `ruined-landmark` (item 104) | DR19, DR24, DR30 | V04 §3.5.0a's strongest source; the port's ruin decoration becomes its surface marker; a source the dossier later removes clears `RuinRecord.source.ref` and the ruin stays (V04 §2.6) |
| a magical node and ley lines | `site.deposits` of kind `magical_node`; the economy's "Magical ley lines" income rows | DR19, DR30 | a ruin source (`ruin.chance.magic`); the node's site at `ruinCentre()` (V08) and the report's `ruin.node` line, which V05's and V10's why read (V04 §3.5.0a (9)) |
| a magical history or an ancient founding | `history.events` of type `magical`; `history.ageYears` beyond `ruin.ancientYears` | DR30, DR37 | a ruin source (`ruin.chance.history`) and its `ageYears` |
| delving nearby | an institution of the Adventuring category whose tags carry `delving` | DR9, DR30 | the ruin chance × `ruin.delvingFactor`, never alone |
| mining | `site.deposits` of kinds `iron_deposits`, `precious_metals`, `gemstone_deposits`, `coal_deposits`, copper | DR19, DR31 | `Terrain.mining` (§4.2 S1 (10)), which the cavern's boost reads (V04 §3.5.2) |
| mountainous relief | `site.terrain` `mountain` | DR1, DR31 | the relief class (g item 109 (a) (1)): the cavern rows, the fissure gate |
| how many catacombs | the church-class records (`Parish church` and its count ranges, `Monastery or friary` and its counts) and item 108's collective members | DR9, DR10, DR32 | V04 §3.5.1's count (its counted classes stated there); re-read at each epoch by V06 (V06 §3.18.2 (1)) |
| the cathedral | `Cathedral (10,000+ only)`, `Great cathedral` | DR9 | V03's crypt (always, the largest); V04 §3.5.7's crypt join reads its `Basement.crypt` |
| the water system | an `aqueduct_or_water_system` record | DR34 (V11's mapping to `conduit_house`; V06's factor on the aqueduct's chance) | no system of its own: its terminal building is the `conduit_house`, and where the aqueduct's terminal is a cistern, V04 §3.5.4 (e)'s terminal cistern lies under that building's yard |
| the burial faces | `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house`, `Graveyard`, `Cemetery network` | DR9, DR10, DR32, item 108 | V04 §3.5.1's candidates (seated as `cemetery` uses; the network one ground beyond each gate); a village `Graveyard` forms none (the TOWN gate) |
| the calamity deaths | a calamity record's deaths (`CalamityRef.deaths`, V08 §2.6a (4), V08 §3.6), carried by the port in `EpochInputs.events` (item 573) | DR28, through V06 (V06 §2.4, V06 §3.18.2 (3)) | `CatacombGrowth.grow`'s `opts.deaths` at an epoch: added to each face's need by its `burialShare`, never to the cap (V04 §3.5.1 (2), (5)) |
| a custom institution's siting and its chains | `DossierInstitution.custom` and its resolved profile; `activeChains` | DR24 (item 104), item 105 | the row-set match (V04 §2.3a); the chain mine (V04 §3.5.3) |
| the magic circumstance and the biome | `CircumstanceSlice.magic`, `.biome` | DR17 | the light rows (V04 §3.9) |

Every other value the underground holds is the map's own derivation (item 20 (h)): a gap in the dossier is filled by
these rules, never by a question to the host. **A dossier change** reaches the underground through the change envelope
and §7.7 item 5's least-disruption mutation, by the rows above, and nothing underground is torn down by it (item 11):
a removed ruin source clears `RuinRecord.source.ref` (V04 §2.6); a removed or closed subterranean institution releases
its L5 pieces (V04 §4.4); a removed sanitation record releases `toggles.sewers` to the TOWN law and its toggle's locality
(item 549; V04 §4.3); a removed catacomb record leaves its complex to the ratchet (V04 §3.5.1 (6)), a removed mine or
cistern record its element, no longer forced, to U-FADE; a changed church count is re-read at the next epoch; a changed
calamity reaches only the epoch that carries it; a changed history reaches the buried former settlement only through a
re-derivation that re-runs the replay (V04 §3.5.5 (b)).

## 2 Data model

### 2.1 What the base already declares (read as declared)

`Features` (II.7.4, §2.9); `Outfall` and `OutfallInto` (§2.3, with the receiving-water mapping, item 205); `Way`'s
`wayFall` reading and `Junction.arms`, `.chamber` (§2.4, item 208); `District.core`, `.parent`, `.outskirts` and the
`underground` and `undercity` kinds (§2.5, item 212); `ContextVector.arena` (§2.5); `Terrain.geology` (§2.3); `Tunnel`
(its `outfall`, `serves`, `chambers`, `depthOffsetCm`, `name`, `grilles`), `UndergroundSystem` (the `ruin` kind,
`variant`, `name`, `sources`), `Gallery` and `Chamber` (`ChamberKind`, `reusedBy`, `span`, `monument`),
`UndergroundLink` (its `cause`), `LightSource`, `HistoryHint` and `HistoryRecord` (§2.7, items 247–250 and g item 113);
`AccessPoint` with its kinds, sources and `cause`, `UndergroundRule`, `TunnelProfileRow`, `SewerExistenceRow` (II.7.4,
items 554, 555, 557); `UndercityExistenceRow`, `UndercityRule`, `ClearUndercity` (II.7.5); `UndergroundSystemRow`,
`LinkRule`, `RaiseGrade` (II.7.6); `DeclineOp`'s underground ops (§4.11); `Document.nextUndergroundPart` (§2.9); the
vertex and edge roles `tunnel`, `gallery`, `chamber_wall`, `access_point`, `link_end`, `invert_knot`, `margin` (§2.2 rule
7); the class table's `drain`, `underground`, `undercity`, `undergroundAccess` and concealment columns (§10.2). Units,
ids and addresses are §2.1's; every length below is an integer centimetre (`Cm`) or a metre field named `…M`.

### 2.2 New records and the access-state set

This volume's own records (the base cites them here):

```ts
// II.7.4's AccessPoint.cause (item 557): why an access exists
interface AccessCause {
  rule: 'neighbourhood'|'basement'|'system'|'dig'|'opening'|'overlap'|'mineBreach'|'lifeline'|'edit'|'dossier'|'crypt'|'legacy';
  system?: Id;                // the system whose growth or rule made it (the reached void for a dig, the growing system for an overlap)
  event?: number }            // the `seq` of the edit or the epoch that made it; 0 at generation
// persisted, written once by the access's creator (V04 §2.6); read by the excavation reading, V10, V12's void measures,
// V03's access head, V01's opening pass (a catacomb entrance by `system`, V01 §3.7.1) and GeoJSON

interface RuinRecord {                       // one per ruin system, in the entities block; V04 §3.5.0a
  system: Id;
  culture: string;                           // a `RuinRule.cultures` row id (V11 §3.23.4)
  family: 'grid'|'axial'|'radial'|'terraced';
  centre: PointCm; axisDeg: number /* [0, 180) */; sharedAxis: boolean;
  outline: PolygonCm;                        // the plan's rectangle on axisDeg, clipped to the frame
  extentM2: number; significance: 'shrine'|'palace'|'district';
  ageYears: number; burialCm: Cm;            // the ancient ground's depth below the smoothed present terrain
  source: { kind: 'dossierRuins'|'ruinedLandmark'|'magicalNode'|'leyLine'|'magicalHistory'|'blueprint'|'declared'; ref: Id | null };
  marker: Id | null;                         // the surface decoration that marks it (the port's ruin decoration), if any
  name?: NameRef;
  attempts: number; similar: boolean }       // the distinctness retries used (0–4) and W_RUIN_SIMILAR (V04 §3.5.0a (7))

interface CatacombComplex {                  // one per catacomb complex, in the entities block; V04 §3.5.1
  id: Id; system: Id;
  source: { kind: 'churchyard'|'cemetery'|'network'|'monastery'|'quarryOssuary'|'legacy'; ref: Id };
                                             // the churchyard part, the cemetery use, the network's ground, the monastery's burial
                                             // yard, the adopted quarry working, or (legacy) the church an older document held
  rank: number;                              // 1 for the first formed; set at creation, never re-ranked; the primary (V04 §3.5.1 (5))
                                             // is a reading — rank 1 at generation, V06's derived primary at an epoch — never stored
  anchor: PointCm; axisDeg: number; floorCm: Cm;   // the grid's anchor and axis; the complex's one floor
  extentFloorM2: number;                     // the high-water extent: the ratchet's floor
  fill: number;                              // [0, 1]: how full its ossuaries are (stagnation's reuse)
  blockedBy?: ('reach'|'wet'|'system'|'foundation'|'wallStrip'|'depth'|'sourceClosed'|'rank'|'rung')[];   // derived at each
                                             // derivation; 'rung': the settlement stands below TOWN (V04 §3.5.1 (6))
  lastGrowth: { epoch: number; addedM2: number };
  tombstones: [number, number][];            // grid nodes (i, j) the author deleted: growth never digs them again (J-V4.56)
  overCount?: true;                          // an upgraded document holding more complexes than the count (V04 §4.6)
  name?: NameRef }

// The access-state set of a void cluster (item 113 (e); §2.7 and II.7.6 cite it). Its three states differ from the
// way decline ladder, a wall stretch's condition and a building's lifecycle in scope (per cluster, not per link, way,
// stretch or record), values, transitions and writers, and stay apart from them.
type Excavation = 'unexcavated'|'accessible'|'lost';
  // accessible: the cluster is joined to a surface access through passable links only (V04 §3.5.7 (g));
  // unexcavated: not joined, and no element of the cluster was ever reached;
  // lost: not joined, and at least one element was reached before — remembered as once known, drawn faded like an
  //       unexcavated cluster (V04 §5.2), until refound
interface ExcavationRecord {                 // one per system the excavation reading covers (cavern, ruin, a buried former
  system: Id;                                // settlement), in the entities block; written only by U-ACCESS (g)
  reached: Id[] }                            // the galleries and chambers that have stood in an `accessible` cluster, sorted by
                                             // address; an entry is added in the commit whose reading first makes its element's
                                             // cluster accessible and is removed only with its element (tombstoned or not carried
                                             // over by a regeneration, §6.3) or by the undo of the commit that added it
```

The base fields this volume writes carry their meanings at their homes: `Tunnel.outfall` is re-seated by V04 §4.3's
outfall re-seat; `Chamber.span` holds the raised way and the two raised-way piers' keys bounding one span (keys minted
once along the deck and never reused, item 244), written once by the arch source (V04 §3.5.4 (d)); `Chamber.monument`'s
`lay`, `standing`, `moundCm` and `count` mean what V04 §3.5.0a (5a) and (6) state; `Chamber.columns` is a view, exported
as `ruinColumns(chamberId)` (V04 §3.5.0a (5b)); an arch vault's, a street vault's and a bridge vault's open faces are the
derived reading `gradeFaces(chamberId)` (V04 §3.5.4 (f)). The buried former settlement is part of the settlement's
one `buried` system (II.7.6: one system per kind), its elements known by their creation key (V04 §2.5) and the system
listed in `HistoryRecord.buried` (§2.7).

### 2.3 New rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

Every value below is **our own** (provenance `own`, `extension`: no reference has an underground — `ftg-posts-c.md`
records FTG's author stating underground settlements unsupported; MFCG has none), calibratable against the corpus when
its stage comes (§13.9). Historical anchors are named where a value leans on one; they are orders of magnitude, not
measurements. The rows V11 owns — the ruin chances, the ancient-culture rows and their monument cells, the survival
order, the source rank, the dig rows, the opening chances, the catacomb rows, `miningCellShare` and the history's burial
threshold — are written once in V11 §3.23 and V11 §3.24 (and `history.*` in V11's history rows); the tables below give
their schema and cite them.

```ts
type Preset = 'historical'|'navigable';
interface NetworkRule {                                    // tables/under/network.json — U-NET and U-FORECAST
  classes: Record<Preset, { main: WayClass[]; drain: WayClass[] }>;   // which ways may carry a main or a drain
  classCost: Record<WayClass, number>;                     // multiplies an edge's length in the tree search
  mainMinHa: Record<Preset, number>;                       // served area at which a run becomes a main
  drainMinHa: Record<Preset, number>;                      // served area at which a run becomes a drain
  trunkHa: number;                                         // served area at which a main is a named trunk
  culvertCatchHa: number;                                  // a drainage line with this catchment is a stream the town culverts
  culvertLinkM: number;                                    // how far a street node reaches to join a culvert
  culvertFactor: number;                                   // cost factor of a culvert edge (≤ 1: flows prefer the old stream)
  adverseCostPerM: number;                                 // tree-search cost per metre of rise along an edge, in metres of length
  coverMinCm: Cm; coverMaxCm: Cm;                          // the crown's depth: a terrain edit below min is reported; above max a run is infeasible
  outfall: { reachM: number; linkM: number; maxOutfalls: Record<Preset, number>; minOutfallHa: number;
             harbourClearM: number; moatPenalty: number; below: ('harbour'|'mill')[]; stretchM: number;
             freeboardCm: Cm /* the outfall invert's height above the receiving water (V04 §3.2 N7) */ };
  drainExtendM: number; drainPriority: Record<Preset, string[] /* class tags */>;
  passage: { reachM: number; loopM: number; perKm: number; maxGrade: number };   // navigable only
  manholeSpacingM: Record<Preset, number>;
  chamberMinArms: number;
  levelCm: Cm;                                             // wayFall's dead band
  chaikin: number;                                         // smoothing passes of a drainage-line centreline
  maxReroute: number }                                     // N7's re-route rung cap (the attempt cap of §6.1's geometry ladders)
```

| `NetworkRule` field | default | note |
|---|---|---|
| `classes.historical` | main: `through`, `primary`, `quay`; drain: `secondary`, `lane` | medieval mains ran under the principal streets (the vaulted sewer of 1370s Paris ran under a principal street to the river) |
| `classes.navigable` | main: `through`, `primary`, `secondary`, `quay`, `lane`; drain: `alley`, `cul_de_sac`, `track`, `path` | the fantasy network |
| `classCost` | through 0.8 · primary 0.9 · quay 0.9 · secondary 1.0 · lane 1.3 · cul_de_sac 1.6 · alley 2.0 · track 2.5 · path 3.0 · pier ∞ · ford ∞ · bridge ∞ · aqueduct ∞ | flows prefer the main streets; a way over water and an aqueduct's channel never carry a sewer (V04 §3.2 N3) |
| `mainMinHa` | historical 8 · navigable 1.5 | |
| `drainMinHa` | historical 3 · navigable 0.3 | below it the street's gutter serves |
| `trunkHa` | 40 | |
| `culvertCatchHa` | 25 | a brook, not a river (a river is a `WaterBody`); London's Walbrook and Fleet are the pattern of a culverted town stream |
| `culvertLinkM` / `culvertFactor` | 30 / 0.5 | |
| `adverseCostPerM` | 50 | one metre of climb costs as fifty metres of level run |
| `coverMinCm` / `coverMaxCm` | 50 / 800 | cut-and-cover, never mined |
| `outfall` | reachM 600 · linkM 80 · maxOutfalls historical 3, navigable 6 · minOutfallHa 5 · harbourClearM 150 · moatPenalty 4 · below `harbour`, `mill` · stretchM 50 · freeboardCm 30 | town ditches received sewage historically, so a moat is admitted last, not never; the freeboard keeps the mouth above the water it discharges into |
| `drainExtendM` | 120 | |
| `drainPriority` | historical: `hospital`, `monastery`, `bath`, `tannery`, `dyer`, `fuller`, `brewery`, `slaughterhouse` · navigable: every `channel` class | institutions with their own drains |
| `passage` | reachM 35 · loopM 250 · perKm 3 · maxGrade 0.125 | |
| `manholeSpacingM` | historical 100 · navigable 60 | |
| `chamberMinArms` / `levelCm` / `chaikin` / `maxReroute` | 3 / 10 / 2 / 3 | |

```ts
interface UndergroundFadeRule {                            // tables/under/fade.json — U-FADE (V04 §3.10)
  sampleM: number;                                         // exposure samples along an element's centreline or outline
  neglectGain: number;                                     // the weight's rise with disuse
  ops: { element: 'drain'|'culvert'|'main'|'passage'|'galleryDry'|'galleryWet'|'chamber'|'ruinGallery'|'ruinChamber';
         from: 'inUse'|'neglected'|'cavedIn';
         weights: Partial<Record<'silt'|'caveIn'|'seal'|'flood', number>> }[];
  sealBase: number; orderGain: number;                     // a seal's weight × (1 + orderGain × (1 − disorder))
  undercity: { clearanceDisorder: number; clearancePerYear: number } }
```

| `UndergroundFadeRule` | default |
|---|---|
| `sampleM` / `neglectGain` | 25 / 1.5 |
| `drain`, `culvert`, `main` from `inUse` | silt 0.7 · caveIn 0.2 · seal 0.1 |
| the same from `neglected` | caveIn 0.6 · seal 0.4 |
| any tunnel, gallery or chamber from `cavedIn` | caveIn 0.7 (to collapsed) · seal 0.3 |
| `passage`, `galleryDry` (catacomb, quarry, vaults, buried, dug) from `inUse` | caveIn 0.8 · seal 0.2 |
| `galleryWet` (a cavern gallery, any gallery with `water`) from `inUse` | silt 0.5 · caveIn 0.2 · flood 0.3 |
| `galleryWet` from `neglected` | caveIn 0.4 · seal 0.2 · flood 0.4 |
| `chamber` from `inUse` | caveIn 0.6 · seal 0.2 · flood 0.2 |
| `ruinGallery`, `ruinChamber` from `inUse` or `neglected` | caveIn 0.6 · seal 0.1 · flood 0.3, the weight × `RuinRule.fadeFactor` (0.25: a ruin decays slowly) |
| `sealBase` / `orderGain` | 0.1 / 1.0 |
| `undercity.clearanceDisorder` / `.clearancePerYear` | 0.15 / 0.02 |

`flood` is admitted only on an element whose floor lies below the water table (II.6's condition table); a weight whose
op is not admitted is dropped and the rest renormalised. An element whose class and condition have no row is not a
candidate, so the table has no dead end.

**Parameters added to the rows' open `params`** (II.7.6's `UndergroundSystemRow.params`; our own, `extension`,
calibratable; item 23: no number of V04 §3.5 stands outside a row). Every row: `surfaceClearCm` 600 (V04 §3.5.0's
shallow-element rule; the undercity reads its host system's). `cavern`: `caveCatchHa` 5; `caveKmPerKm2` 1.0 (the length
cap: × the frame's area in km², replacing a per-rung cap, g item 109 (j) (1)); `meanderM` 6, `meanderWaveM` 40;
`reliefWindowM` 100, `hallReliefM` 15, `hallBaseM2` 400, `hallPerReliefM2` 40, `hallMaxM2` 2 000, `hallAxisRatio` 1.6,
`hallJitter` 0.2, `hallDryCm` 100 (a hall's floor above the local water table); `tubeMax` 3, `tubeSpacingM` 300,
`tubeMaxM` 1 500, `tubeDepthCm` 800, `tubeChamberM` 200; `mouthCoverCm` 100, `skylightDepthM` 10, `sinkholeCoverM` 8;
`forecastFloorShare` 0.4; `mineBoost` 1.4, `mineCap` 0.9 (g item 109 (a) (2); `miningCellShare` is V11 §3.23.1's);
`breachM` 40 (a mine working's reach into a cave, g item 109 (a) (3)); `fissureChance` 0.15, `fissureMax` 2,
`fissureMaxM` 400, `fissureWidthCm` 80–150, `fissureHeadroomCm` 600–1 200, `fissureChamberM2` 150. `quarry`:
`oreM3PerMine` 2 000, `workingMaxHa` 4, `stoneWallCm` 60, `chainVolume` {low 0.5, moderate 1, high 2} (a chain mine's
volume factor), `headingWidthCm` 150, `headingHeadroomCm` 200. `vaults`: `bridgeRiseCm` 150, `approachM` 30,
`vaultBelowCm` 400, `cisternBelowCm` 700, `forcedGridM` 8 (the forced vaults' pitch, V04 §3.5.6), `archInsetPierCm` 60
and `archInsetOpenCm` 30 (an arch vault's inset at its raised-way piers and at its open faces, V04 §3.5.4 (d)),
`archDoorStripM` 2 (the strip beyond an open face that the door's choice reads), `terminalCisternM2` 600 (an aqueduct's
terminal cistern: 4 × the precinct cistern's 150 m², provisional; V12 §3.11 register entry). The arch vault's headroom and fall bounds and its
share are the base's, since a span's use is an eager base fact (item 244). `buried`: `formerStoreyMinM2` 120 (a former
building's footprint from which its ground storey is laid as a `storey` chamber), `formerWallCm` 150 (a former wall
line's masonry band), `formerGateM2` 40 (a former gate's passage chamber), `formerMinGalleryM` 12 (the shortest former way
stretch laid as a gallery), `formerRiseCmPerCentury` 60 (the ground's rise over a buried former settlement per century of
age, before the history's factors; a Roman-to-medieval town street rose on the order of 1–2 m per few centuries),
`formerRiseMaxCm` 900, `formerMinHeadroomCm` 190 (the dug passage's headroom: a former element with less is filled)
(V04 §3.5.5 (b)). `dug`: `digGridCm` 100, `digMaxGrade` 0.25, `rockCost` {rock 3, high 1.5, mid 1,
low 1.2}, `networkCellars` 3 (the `Underground network`'s joined cellars, V04 §2.3a), `storageM2` 20. S1's
`outfallStretchM` 50 is §2.3's.

```ts
interface UnderLayoutRule {                                // tables/under/layout.json — U-CITY, U-LINK, the light placement scope; our own, extension
  undercity: { walkwayCm: Cm /* 300 */; plazaShare: number /* 0.35 of the core's area */; walkwayMinChamberM2: number /* 150 */;
    carveMarginM: number /* 2 */; carveMinShare: number /* 0.8 */; airPerM2: number /* one air opening per 1 500 m² of floor */;
    lifelineReachM: number /* 80 */; lifelineSecretShare: number /* 0.5 */; stairMaxDepthCm: Cm /* 600 */ };
  lights: { litReachM: number /* 60: a run or system within this of a plot is lived and lit (V04 §3.9) */ };
  // S7b (6)–(7)'s cap forecastSafety and P7's floor accessForecastMin are II.7.4's UndergroundRule cells (V04 §3.3 reads them)
  crowdCap: number /* 2: households an underground cell may hold when the tail absorbs a surplus below (V04 §3.4 F0) */;
  voidDwellings: { maxHouseholds: number /* 8 per cluster */; share: number /* 0.05 of the poorest band's households */ };
  openings: Record<AccessPoint['kind'] | 'archDoor', { widthCm: Cm; areaM2: number; lightTransmission: number }>;
  links: { overlapShaftM: number /* 6 */; overlapShaftChance: number /* 0.1 */; reuseM: number /* 3 */; reuseMinM: number /* 30 */ };
  foundations: { footingWidthCm: Cm /* 100: a retaining wall's footing strip, centred on its chain */;
    footingBelowCm: Cm /* 100: the footing's depth below the wall's low-side ground */;
    conduitClearCm: Cm /* 100: a buried aqueduct stretch's reach beyond its channel's band and below its floor */;
    collapseShare: number /* 0.25: the share of an older void's chamber floor that grown footings must cover to collapse it (V04 §3.5.0) */ } }
```

| `UnderLayoutRule.openings` (our own, calibratable) | `widthCm` | `areaM2` | `lightTransmission` |
|---|---|---|---|
| `grating` | 60 | 0.36 | 0.6 |
| `shaft` | 100 | 1.0 | 1.0 |
| `well` | 120 | 1.1 | 1.0 |
| `stair` | 120 | 2.4 | 0.8 |
| `cellar_stair`, `hatch` | 90 | 0.8 | 0 (closed from above) |
| `door` | 90 | 0 | 0 |
| `ladder` | 60 | 0.4 | 0 |
| `mouth` | the gallery's bore | bore × headroom | 1.0 |
| `sinkhole` | √ of its area | min(0.02 × the chamber's area, 25) | 1.0 |
| `collapsed_shaft` | 150 | 2.0 | 1.0 |
| `ruin_entrance` | 200 | 3.0 | 0.8 |
| `archDoor` (an arch vault's `door`, V04 §3.5.4 (d)) | 200 | 5.0 | 1.0 (a daylight opening at grade) |

Readers: §8.4 (b)'s shaft (item 414), the glTF shaft's section, the VTT shaft light's radius, §8.2's symbol size. A
`door` access whose element is an `archVault` chamber reads the `archDoor` row, not the `door` row.

```ts
interface RuinRule {                                       // tables/under/ruin.json — U-SYS V04 §3.5.0a, U-ACCESS, U-CITY C1, U-FADE, U-FORECAST
  chance: { magic: number; history: number; delvingFactor: number;
            blueprint: Record<Rung, Record<'plain'|'rolling'|'hilly'|'mountainous', number>> /* only while recipe.layers.ruins is on */ };
                                                           // V11 §3.23.2's rows
  ancientYears: number;                                    // 500: a founding older than this is an ancient founding
  significance: Record<'shrine'|'palace'|'district', { extentHa: [number, number]; weight: number }>;
  maxFrameShare: number; maxChambers: number;              // 0.05 of the frame; 1 500
  forecastFloorShare: number;                              // 0.3: P5's usable floor share of a forecast ruin's extent
  depthM: [number, number];                                // [4, 30] (item 563)
  burialByAge: { ageYears: number; burialM: number }[];    // interpolated; clamped to depthM
  smoothM: number;                                         // 50: the kernel that smooths today's terrain into the ancient ground
  sharedAxisChance: number;                                // 0.25
  cultures: CultureRow[];                                  // V11 §3.23.4's rows
  survival: Record<PersistenceClass, number>;              // V11 §3.23.5's persistence order as survival shares at ageRefYears
  ageRefYears: number; coverKeep: number;                  // 1 000; +0.1 survival per 10 m of cover, capped at 1
  distinct: { retries: number /* 3 */; rotateDeg: number /* 30 */ };
  fadeFactor: number; magicLightChance: number;            // 0.25; 0.5
  sourceWeight: Record<UndergroundSystem['kind'], number>; // the undercity's rank: V11 §3.23.6's row
  monument: { clearM: number /* 3 */; tierDecay: number /* 0.85 */; ceilingClearCm: Cm /* 200 */; moundShare: number /* 0.4 */ } }
                                                           // V04 §3.5.0a (5a), (6): a monument's clearance to its chamber walls, the
                                                           // per-tier fall of survival, the headroom kept over its top, the mound's
                                                           // height as a share of the fallen tiers'
interface CultureRow {                                     // V11 §3.23.4's rows; schema here
  id: string; family: 'grid'|'axial'|'radial'|'terraced';
  blockPitchM: [number, number]; streetCm: [Cm, Cm] /* main, minor */; aspect: number;
  orientation: 'cardinal'|'solar'|'contour'|'free'; roomM: [number, number]; columnPitchM: number;
  hallShare: number; terraceRiseM?: number; weight: number;
  monument?: { band: 0|1|2|3 /* V02's anchor index into the stepped-monument row */; hosts: ('temple'|'hall'|'tomb')[] } }
                                                           // absent: the culture raised no stepped monuments
type PersistenceClass = 'hall'|'wall'|'colonnade'|'cistern'|'gate'|'axis'|'street'|'room';
interface UnderOpeningRow { kind: 'sinkhole'|'mouth'|'skylight'|'collapsed_shaft'|'ruin_entrance'; chance: number; coverM?: number }   // tables/under/openings.json
interface DigRule {                                        // tables/under/dig.json — U-ACCESS (c)
  cap: number; reachM: number; decayM: number; maxM: number; basementFactor: number; planReachM: number;
  classRow: Record<string /* class id or family tag */, number>; sealedFloor: number }
interface CatacombRule {                                   // tables/under/catacomb.json — U-SYS V04 §3.5.1, U-ACCESS (c), U-FADE, U-FORECAST P5
  count: Record<'TOWN'|'CITY'|'METROPOLIS', { churchesPer: number | null; cap: number }>;
  order: Record<'TOWN'|'CITY'|'METROPOLIS', ('network'|'burial'|'quarryOssuary')[]>;
  chance: Record<'churchyard'|'cemetery'|'network'|'monastery'|'quarryOssuary', Partial<Record<Rung, number>>>;
  rankCap: number; growthCapShare: number; growthFloorM2: number; plagueNeedFactor: number;
  ossuaryReachM: number; cryptJoin: { own: number; other: number }; charnelMaxM2: number }
```

| table | defaults |
|---|---|
| `RuinRule.chance`, `.cultures`, `.survival`, `.sourceWeight`; `CultureRow.monument` | V11 §3.23.2, V11 §3.23.4, V11 §3.23.5, V11 §3.23.6 (a dossier `ancient_ruins` deposit or a `ruined-landmark` record is 1, by rule, no draw; delving multiplies and never stands alone) |
| `RuinRule.significance` | shrine 0.3–1 ha, weight 0.5 · palace 1–3 ha, 0.35 · district 4–15 ha, 0.15; a `ruined-landmark` record forces palace, an `ancient_ruins` deposit draws |
| `RuinRule.burialByAge` | 300 y → 4 m · 1 000 y → 9 m · 2 000 y → 18 m · 3 000 y → 30 m |
| `RuinRule` ageing | `ageDecay` survival^(ageYears ÷ ageRefYears), raised by `coverKeep` |
| `RuinRule.monument` | clearM 3 · tierDecay 0.85 · ceilingClearCm 200 · moundShare 0.4 (our own) |
| `UnderOpeningRow` | chances V11 §3.23.7; the candidates (our own): sinkhole per soluble chamber with cover < `sinkholeCoverM` under no footprint · mouth per candidate · skylight per breakdown chamber within `skylightDepthM` · collapsed_shaft per quarry, mine or ruin chamber under a square (V04 §1.2) or a field face with cover ≤ 15 m · ruin_entrance at the ruin's marker, 1 where the dossier makes the ruin known (a `ruined-landmark` record, or an `ancient_ruins` deposit in state `discovered`) |
| `DigRule` | V11 §3.23.7 (`cap`, `reachM`, `decayM`, `maxM`, `basementFactor`, `sealedFloor`, `classRow` by family with class overrides; V07's village classes V07 §3.16 (3)); `planReachM` 5 (our own) |
| `CatacombRule` | V11 §3.23.8 (`count`, `order`, `chance`, `rankCap`, `growthCapShare` — a share per year compounded over an epoch's span —, `growthFloorM2`, `plagueNeedFactor`, `cryptJoin`, `charnelMaxM2`); `ossuaryReachM` 500 (our own) |

V11's registry rows 57–59 list these tables beside `under.network`, `under.layout` and `under.fade`, schema V04; V04 §1b.1
names each reader.

### 2.3a The dossier's row sets

The base's DR17 reads its row sets and binding targets from here (item 386).

`tables/dossier/sanitation` — a record matching a row turns `toggles.sewers` to `on` and binds to the `sewer` system
(`Identity.dossier`, §2.8):

| match (kind, `catalogId`, tag or resolved profile) | binding |
|---|---|
| kind `Sewage system` | the `sewer` `UndergroundSystem` |
| a record whose tags, or whose resolved profile (item 104 (a)), carry `sanitation` | the `sewer` `UndergroundSystem` |

`tables/dossier/subterranean` — a record with `facets.subterranean`, or a custom record whose resolved profile matches the
last row, takes its row's effect:

| match | effect | binding |
|---|---|---|
| `Underground network` | the dug network (V04 §3.7 L5): from the record's building a passage to the `beyondWalls` outlet first ("Discreet passage"), up to `networkCellars` cellars of uses in its district joined by dug passages, one `storage` chamber of `storageM2` ("Untaxed storage"), all `knownTo: 'secret'`; its `forbiddenResources` (marsh, floodplain) make `damp` and `flood` cells infinite in U-DIG's cost | the `dug` system's network pieces |
| `Underground city` | `CircumstanceSlice.undercity = 'require'` (V04 §3.6 C0, V04 §3.5.6) | the first undercity neighbourhood |
| `Black market bazaar` | the core's black market use (C5), else an `undercity: 'preferred'` placement | that use |
| a catacomb record (kind label `Catacombs`, `Ossuary`) | one complex forced within the count (V04 §3.5.1 (7)) | its `CatacombComplex` |
| a crypt record | no system: its church building takes the crypt (V03 §3.7.4 makes a building a dossier crypt record binds to `always`; g item 109 (k) (2)); never a plan room | the church building |
| a mine record (`Mine`, a mining class with `facets.subterranean`) | one mine working forced (V04 §3.5.3) | the working's chamber |
| a cistern record | one cistern forced under its precinct (V04 §3.5.4) | the cistern chamber |
| a record of any other kind with `facets.subterranean`, or a custom record whose resolved profile NEEDS `secrecy` and carries a tag `underground`, `smuggling` or `illicit` (item 104 (a); the match is written into the profile's sources) | the `arena: 'underground'` hard row; placed on the surface, the forced basement (item 243) and U-LINK L5 | its placement |

An `aqueduct_or_water_system` record matches neither set: V11 maps it to `conduit_house`, the base's aqueduct names that
building as its terminal (V02 §3.17 (b)), and where the terminal's kind is `cistern` the underground part is V04 §3.5.4
(e)'s terminal cistern under its yard, listed among the vaults system's `sources` with the building.

**Edges of the row sets.** A record matching no row of either set and without `facets.subterranean` reads nothing here.
A record matching both sets takes both effects (a sanitation-tagged `Underground network` turns sewers on and digs its
network). Two records matching the same single-binding row (`Sewage system`, `Underground city`, `Black market bazaar`)
bind in the port's record order, the first taking the binding and the others read as matches without a binding
(reported by the port, V08). A catacomb record beyond the count is refused by the count's clamp (V04 §3.5.1 (7)), a mine
or cistern record with no admissible site forces nothing and is reported `W_SUBTERRANEAN_WET` (a wet site) or by the
stage's F-VOID rung (no site). Tested by T-V4-38.

### 2.4 Derived transients (never persisted)

```ts
interface NetworkForecast {                                // U-FORECAST's output at S7b; recomputed on every replay, in no digest
  runs: { lengthM: number; navigable: boolean; admissibleShare: number /* the share of its side strips under admitted ground */ }[];
  navigableRunM: number;                                   // Σ lengthM over navigable runs of ≥ UndergroundRule.minRunM
  capacityHouseholds: number;                              // II.7.3's capacity law, over these runs
  voids: { kind: 'ruin'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'; capacityHouseholds: number; source: Id | null /* read by the
           report's forecast line */; pAccess: number /* P7: 1 for a kind dug from the surface */ }[];
  undercity: { exists: boolean; n: number; H: number };  // P6: II.7.5's existence verdict and size, re-read by U-CITY C0
  voidDwellingHouseholds: number }                       // P7's allocation for F6: Σ over accessible-forecast cavern and ruin voids
interface SewerGraph {                                     // U-NET's working graph (V04 §3.2), built and dropped inside the stage
  nodes: { id: number; at: PointCm; groundCm: Cm; kind: 'junction'|'bend'|'culvert'|'outfall'; ref: Id | number /* way junction, hydro cell */;
           bank: number /* N3's bank: its connected component once the stretches over water are left out, numbered by its lowest node */ }[];
  edges: { a: number; b: number; lengthCm: Cm; kind: 'way'|'culvert'|'drainage'|'outfallRun'; way?: Id; cost: number /* per direction */ }[] }
interface FoundationsResult {                              // Foundations.apply's return at an epoch (V04 §3.5.0 *At an epoch*); never persisted
  collapsed: Id[];                                         // the gallery stretches and chambers created or converted `collapsed`, cause `foundation`, in address order
  pillars: Id[];                                           // the chambers that keep their floor with a footing standing in them as a pillar
  vacated: { plot: Id; households: Id[] }[] }              // the void dwellings (F6's, an undercity neighbourhood's) on collapsed floors, vacated by II.7.3's
                                                           // rules in the same batch — each plot with its households' ids (§2.7's `Household.id`), address
                                                           // order, for the caller's re-homing by name (V06 §3.18.1 (4), (6))
```

Each transient is total over its inputs: with no way, no run and no void the forecast is all zeros and `undercity.exists`
false; a `SewerGraph` with no edge makes no run (U-NET's F-NET rung, V04 §3.2); an epoch whose scope holds no footing
returns three empty lists. Tested by T-V4-79 (a).

### 2.5 Identity: lineage units and creation keys

Addresses, lineage and anchors are §6.3's; the anchor rows for access points, tunnels, galleries, chambers, links and
undercity neighbourhoods are its table's. What this volume adds is each generated entity's **lineage parent and creation
key** — the structured components of its lineage hash (§6.3), chosen so an upstream change that does not touch the
entity's source leaves its key unchanged:

| entity | parent | creation key |
|---|---|---|
| the `sewer` system | the town root | (`UndergroundSystem`, `sewer`) |
| a void system | the town root | (`UndergroundSystem`, its kind) — one per kind (II.7.6) |
| a way-following tunnel run | the `sewer` system | (the followed way's lineage, the station of the run's upstream end along the way from its `from` node, rounded to 1 m); §6.3's anchor matching resolves a moved station |
| a culvert or drainage-line run | the `sewer` system | (`culvert`, the lineage of the receiving outfall's water body, the hydro cell of the run's downstream end) |
| an outfall run | the `sewer` system | (`outfall`, the receiving water's lineage, the `Outfall.cell`) |
| a passage | the `sewer` system | (`passage`, the two mains' lineages sorted) |
| a drain for a plot | the `sewer` system | (`drain`, the plot's lineage) |
| an underground `Junction` | its part's system | the arms' lineages sorted |
| a catacomb gallery or chamber | the `catacomb` system | (its source's lineage, the grid coordinate (i, j) from the source's anchor) |
| a cavern gallery or chamber | the `cavern` system | (the hydro cell of its upstream end; a tube's start cell) |
| a quarry gallery or chamber | the `quarry` system | (the working's ordinal, the grid coordinate) |
| a vault chamber | the `vaults` system | (its source way's, bridge's or precinct's lineage, its ordinal) |
| an arch vault | the `vaults` system | (`arch`, the raised way's lineage, the two raised-way piers' keys `a`, `b`) — so a span keeps its chamber's id through every regeneration that keeps the way, and a re-laid span of the same raised-way piers finds it again |
| the terminal cistern | the `vaults` system | (`terminal`, the aqueduct raised way's lineage) |
| a monument's tiers, stairs and shrine | its chamber (a sub-record, as a building's wings are; §2.8) | `layTiers`' keys in its order (V02 §3.15.1 ST7); its draws keyed as V04 §3.12 lists |
| a buried gallery or chamber | the `buried` system | the cleared record's lineage (II.7.6: fresh records keyed from what they bury) |
| a buried former settlement's gallery, chamber or wall band | the `buried` system | (`former`, the replay epoch that buried it, the former record's lineage) — so a re-run replay of the same seed and history finds the same ids |
| a dug passage | the `dug` system | the closure event's `seq` and its piece ordinal (§7.3 item 9 (b)) |
| a lifeline's dug piece at generation | the `dug` system | (its neighbourhood district's lineage, the piece ordinal) — II.7.6's "keyed by that district's lineage" |
| an L5 piece (a subterranean institution's passage, its network, its cellar chamber) | the `dug` system | (the institution's binding key hashed as the unit, the piece ordinal) |
| a ruin gallery or chamber | the `ruin` system | (the ruin system, its plan coordinate: a street's index, or a room's (i, j, k) in the plan's lattice) |
| a `CatacombComplex` | the `catacomb` system | its source's lineage |
| an `ExcavationRecord` | its system | (`excavation`, the system's lineage) |
| a forced-vaults chamber | the `vaults` system | (the forced district's lineage, the grid coordinate (i, j)) |
| a chain mine | the `quarry` system | (the chain's key, its resource node) |
| a heading gallery (a mine breach) | the `quarry` system | (the working's key, the cavern gallery's lineage) |
| a scattered-dwelling block (F6) | the underground pseudo-district | (the cluster's lowest element lineage, the block ordinal) |
| an undercity walkway | the neighbourhood's district | (the chamber's lineage, the walkway's ordinal in its tree) |
| an access point | its source: the system, the neighbourhood's district, the building, the link or the event | (its role, its host's lineage, its ordinal); a dig access (the building's lineage, `dig`, the void kind); an opening (the element's lineage, the opening kind); a crypt join (the church's and the complex source's lineages); an arch vault's door (the chamber's key, `door`); the terminal cistern's well (the chamber's key, `well`) |
| a link | the connection stage's run (the settlement) | the two end elements' lineages sorted, and its station ordinal on the first; an overlap or mine breach (the pair, `overlap` or `mineBreach`); a reuse (the adopted element, the adopting system) |
| an underground light | its host | §4.7 (1)'s rule: host lineage, row, ordinal |

Two entities whose keys collide (two runs of one way starting at the same metre, two openings of one kind on one
element) take §6.3's ordinal suffix in address order; a key whose source is gone (a followed way deleted) keeps the
entity by §6.3's anchor carry-over and never re-keys it. Tested by T-V4-30 and T-V4-79 (a).

### 2.6 The lifecycle of every state field this volume adds or gives a producer

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `Terrain.outfalls` | S1 (3) at generation; S1's water operator after a water edit (§7.3 (b)) | U-NET N2 | the terrain chunk | re-derived with S1's hydrology | the water edit's replaced scope | absent in an older document: recomputed on load from the hydro grid |
| `Tunnel.outfall` | U-NET N2/N3 | U-NET N7 (the root invert), U-LINK L1, S14, exports | the tunnel record | kept while the run's root is kept; re-seated by V04 §4.3 when its shore moves | the edit's undo record holds the former value | absent: the run's downstream end's nearest `Terrain.outfalls` entry, found on load and reported |
| `Tunnel.serves` | U-NET N8 | `drainOf`, the reader, U-FADE's usage | the tunnel record | re-derived for the plots an edit re-cuts (V04 §4.3) | the edit's undo record | ids mapped by §7.5 |
| `Tunnel.depthOffsetCm` | `setAttr` | U-NET N7 | the tunnel record; the event in the log | an input override kept by every re-derivation (§7.2) | the inverse | absent = 0 |
| `Junction.chamber` | U-NET N10 | S14's chamber program, the light rows, U-FRONT F2 | the junction record | re-derived with its arms | with its arms' scope | absent: re-derived on load |
| `Chamber.kind` | U-SYS, U-CITY, `drawChamber` | S14, light rows, U-CITY C1 | the chamber record | re-derived with its system; `setAttr` override kept | the inverse | absent: the system row's first chamber kind |
| `District.core` | U-CITY C2 | U-CITY C3, C5, C6, light rows, labels | the district record | re-derived with the neighbourhood | the scope's undo | absent: the neighbourhood's largest chamber, found on load |
| the family and preset controls | the recipe's params (creation), `adjust` | U-NET, U-FRONT, U-CITY | the recipe; the `adjust` event | Re-derive from the network stage (§7.1) | the adjust's replaced scope | absent: `mixed`, `historical` |
| `LayerSpec.underView` | `setLayer` | S14, the tile worker | the style state | view only | the inverse | absent: `cutaway` |
| `NetworkForecast` (with P6, P7) | U-FORECAST at S7b (in a standalone neighbourhood document after the one-district allocation, V01 §3.10.1 step 6) | S7b (6), (7); U-CITY C0; F6 | never | recomputed on every replay | — | — |
| `RuinRecord` | U-SYS (V04 §3.5.0a); a declared ruin element (V04 §4.7) | its readers in V04 §1b.1 | the entities block | kept whole (culture, axis, plan) by every re-derivation; a New random on the ruin system re-draws culture, axis and plan, its openings re-drawn by U-ACCESS (e) over the new elements and V01's opening pass run over those made and removed in the same commit (V04 §3.10); a source the dossier removes — at an epoch's `dossier` phase or before a re-derivation — clears `RuinRecord.source.ref` (its `kind` kept), reported `W_RUIN_SOURCE_REMOVED`, and the system stays, fading by U-FADE, because the underground is never torn down (item 11; DEFINITION §4; J-V4.99); a blueprint ruin follows the toggle only at a re-derivation (the toggle's Re-derive from S7b, V04 §4.3), never at an epoch | the scope's | absent: no ruin (g item 109 (h)); the upgrade creates none |
| `CatacombComplex` | U-SYS (V04 §3.5.1) | U-SYS, U-FADE, U-ACCESS, S14, V12's `catacomb.extentM2`, V10, `catacombOutcome` | the entities block | only adds (V04 §3.5.1 (6)): every derivation — a growth stage, an epoch, a dossier event, a replay, a Re-derive, a New random — keeps every element and `extentFloorM2`; `fill` and `blockedBy` re-derived | the event's | absent: `extentFloorM2` = the laid extent, `fill` 0, `overCount` where the count is exceeded (V04 §4.6) |
| `AccessPoint.cause` | its creator | the excavation reading, V10, V12, V03, V01's opening pass (a catacomb entrance selected by `cause.system`), GeoJSON | the access record | kept with its access (§6.3's anchor) | the causing event's | absent: `legacy` |
| `UndergroundLink.cause` | U-ACCESS, U-LINK L1, U-SYS, the edits | the same | the link record | kept with its link | the causing event's | absent: `legacy` |
| `Gallery.reusedBy`, `Chamber.reusedBy` | U-ACCESS (f), U-SYS (tomb reuse, the quarry ossuary) | the adopting system's extent and program, V10 | the element's record | re-derived with the adopting system; never removed by the adopted system's re-derivation | the scope's | absent: none |
| `excavation(doc, cluster)` | U-ACCESS (g) | V04 §1b.1's readers | never (derived) | recomputed after every commit that touches an access, a link, an element's closure or a building over a void | follows its causes | — |
| `ExcavationRecord.reached` | U-ACCESS (g), in the commit whose reading first makes an element's cluster `accessible` — generation's T2b, a replay epoch's `under.access`, a live epoch's, an edit's | the excavation reading (`lost` against `unexcavated`), V10 | the entities block | kept for every element §6.3 carries over; an element not carried over loses its entry, a fresh element starts without one and gains it at the reading that makes its cluster accessible | the replaced scope (the entries a commit added leave with its undo; an undone closing commit restores `accessible` and the dwellings byte-identically) | absent in an older document: built on load from the current reading (every element of an accessible cluster entered), so an older document holds no lost cluster |
| the carve's cleared galleries | U-CITY's carve post-pass (V04 §3.6 C2) | S14 (not drawn), the host's extent | the gallery records, existence `cleared`, cause `rule:undercity-carve` | a New random on the host system re-runs the carve; a New random on the neighbourhood `resurrect`s them, then re-carves | the scope's | absent: the upgrade re-runs the carve |
| `District.outskirts` | U-LINK L6 | labels, counts, the reader | the district record | re-run after any part-0 edit within `outskirtsReachM` of a lifeline link | the edit's scope | absent: recomputed |
| `Tunnel.name` | the tail's S13a | labels, the reader | the tunnel record with its `NamingRecord` | kept by §6.3's cases; protected by a `setAttr` (§2.8) | the inverse | absent: drawn |
| `Tunnel.grilles` | a view (N11a) | S14, VTT | never | recomputed with the run or a wall edit crossing it | — | — |
| `recipe.layers.ruins` | the recipe's params, `adjust` | U-SYS, U-FORECAST | the recipe | Re-derive from S7b | the adjust's scope | absent: `off` |
| the view key `showUnexcavated` (J-VI.19) | V09's per-viewer control | S14 | the viewer's view state, never the document | view only | not an event (a view key) | absent: `false` |
| `underFindPlaces` (Find on Below; g item 120) | derived on read for V09's `live.find` (V04 §5.1) | `live.find`, the Find panel's Below count | never: a view (the chips are §2.9's view key `find`, kept in view pins) | recomputed at each commit that rebuilds Find's index and at each change of §2.9's `week`, over the model the view draws (the head, or a history frame, V06 §3.15.2) | follows its records | — |
| an arch vault (`archVault` chamber, `Chamber.span`, its `door`) | U-SYS's vaults step (T2) from the base's `vault` spans; `ArchVaults.reconcile` in the commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it — among them an edit that adds a raised way (T4 `road` with `raised`, the aqueduct class; the same span rule), re-shapes it, sets its spans (a span's `use` to `vault` included), crossings, `clearanceCm` or `spanSpacingCm` or repairs it by hand, a hand landfall (V05 §3.16 (4)), and a trace's crossing station taken on it (§2.7's support step (6) (b) (iii)); at an epoch through V06's `under.extend` over `EpochScope.raised` (its raised-way ops, a landfall, a trace's crossing station, the frame growth's deck extension, §3.2 (9)) | S14, the exports, U-ACCESS (b), V10, a declared placement, `gradeFaces` | the vaults part chunk | re-derived with its raised way, its id kept by its key, its footprint re-laid between its span's raised-way piers' inner faces at each reconcile; its closure follows its span at every derivation by V04 §3.5.4 (d) (2); **removed** in the same commit as its raised way is deleted, generated or drawn, or its span is gone or set `open` — its links and accesses with it, listed as fates in the dry run; a regeneration after a removal lays none, because the base's generator is the removal's only reader and V04 reads only the resulting raised-way set | the replaced scope: the way and its vaults back with the same ids | absent in an older document: laid at the next vaults derivation, the upgrade's diff listing them (V04 §4.6) |
| the terminal cistern | U-SYS's vaults step, one per aqueduct whose terminal kind is `cistern` | N8, S14, V10, the exports | the vaults part chunk | re-derived with its aqueduct, its id kept by its key; removed with it | the replaced scope | absent: laid at the next vaults derivation, reported |
| `Chamber.monument` | the ruin step (V04 §3.5.0a (5a)) | S14, the light pass, U-CITY, the exports, V10 | with its chamber | kept byte for byte while its chamber's plan is kept; re-laid through `layTiers` with the same draws on a `setAttr` of `monument/count` (the count kept as an input override); laid at the next ruin derivation where absent and its culture row names the host; removed where the row no longer names it (a table edit); a New random on the ruin re-draws it with the plan | the inverse, or the scope's | absent: laid at the next ruin derivation, reported |
| `Chamber.columns` (`ruinColumns`), `gradeFaces` | derived with their chamber | V03 §3.12 (6) and (9), S14, glTF, VTT | never | recomputed with the chamber (and its monument) | follows its chamber | — |
| `Entrance.faces` `'tunnel'` | S11 under F4, F6 and C4 | V03 §3.12 (4), VTT | the entrance record | re-derived with its building | the building's | absent on an older document's underground building: rewritten by the upgrade (V04 §4.6) |
| a village working's breach access (V04 §3.5.7 (a)) | U-ACCESS (a) at T2b at a village rung; `AccessPassStrategy.run` over `scope.workings` at an epoch | the excavation reading, V10, V12's `void.*`, GeoJSON | the access record | kept by its key (the working's and the element's lineages) at every derivation; follows V04 §3.10's access closures with the working's plot as its host; kept at V07's hand-off up | the causing event's | absent: made at the next T2b, reported |
| the buried former settlement (its elements in the `buried` system) | `BuriedFormer.lay` at the replay's burial epoch (V04 §3.5.5 (b)) | U-ACCESS, U-CITY C1, S14, S13a, the exports, `HistoryRecord.buried`, V10 | its part chunk; the replay epoch in the log's creation prefix | re-laid byte for byte by every replay of the same seed and history (its keys carry the epoch); a re-derivation that re-runs the replay with a changed history lays it anew by the least-disruption mutation (§7.7 item 5), its surviving keys kept; kept (never torn down) by every later epoch, fading by U-FADE | the creation prefix is never an undo target (§7.4); a later edit's undo restores its replaced scope | absent in an older document: none (the replay runs only at generation) |
| the damage drawn below ground (`belowKind` and the level each element reads; V04 §5.6) | derived on read from V03's plan parts, the footprint's rock sides and V06's `decayLevel` and `decayPeak` at the drawn week | V03's plan draw of a storey below 0, S14's underground footprints, the per-band picture and VTT exports | never: a look — the plan, its ids and every digest unchanged | recomputed with the plan, the footprint and the level's events | follows the records and the lifecycle events it reads | — (nothing stored; an older document reads it at once) |

`AccessPoint.state`'s lifecycle is §7.4's underground row as item 555 amends it (an access's state follows its host;
V04 §3.10's access closures are its writers here). The base's other fields keep their base rows (§7.4, §2.8):
`Tunnel.navigable`, `headroomCm`, `closure`, the condition reading, `AccessPoint.knownTo`, `source`, `Gallery.walkway`,
`Features.underground`.

## 3 Generation

### 3.1 The underground tail: order, registration, scheduling

The tail's engines register as stages by declared I/O (§4.12) in `@plat/layout`'s registry, their code in `@plat/under`
(item 505). Each declares `phase: 'tail'` (item 325): the scheduler runs the main path unchanged to the first map (§4.1,
§8.5), then runs the tail stages eagerly and serially on the generation worker, in this order, before it takes any queued
edit; between two tail stages it yields to a queued view request (pan, zoom, a layer or band switch), never to an edit.
The ground arena's geometry and its per-arena digests are final before the tail, and no tail stage writes ground geometry
(the ground `PlatKey`; §3.4; §5.3's cross-arena write count). Two tail steps write ground *records*, never geometry: T8,
the reconcile, which writes uses and household counts only, and T6's S13a step, which writes V01's opening places
(`HoodPlace` records of kind `opening` with their `place` labels, V01 §3.7.1); the ground's model digest and the
document's root digest are finalised after T8 (J-V4.2; J-V4.59).

| order | stage | reads | writes | streams (§6.1) | lineage unit | ladder |
|---|---|---|---|---|---|---|
| T1 | U-NET `SewerStrategy.derive` | `Features.sewers`; ways, junctions, districts, plots and uses with the class `drain` column (ground part 0, read); `Terrain` (sampler, `hydro`, `outfalls`), the levelled ground (`levelledGroundCm`, item 309) and the `RetainingWall`s (item 245), water bodies, enceintes and quay walls (read); `NetworkRule`, `TunnelProfileRow`, the connection table (II.7.1); the family and preset controls; the creation prefix's tunnels (V04 §4.7) | the `sewer` system; part 0's L0–L2; tunnels, underground junctions, the network's access points; `serves` | `sewer` (the `pit` share) | the `sewer` system | F-NET |
| T2 | U-SYS ruin → catacomb → cavern → quarry → vaults → buried | the ground (read); the raised ways' raised-way piers, spans and aqueduct terminals on ground parts ≥ 1 and the `RetainingWall`s (read; item 244); `SiteResources`; the religious, burial and stone rows; `HistoryHint`; the dossier digest's ruin, magic and mining facts (V04 §1b.5); the system rows, `RuinRule`, `CatacombRule`; V02's `layTiers` and its `stepped-monument` row; part 0 (read, for depth reports and the forced vaults); `Recipe.product` (the standalone line, below) | each system's record, part, galleries, chambers and own entrances; `RuinRecord`; `CatacombComplex`; the monuments; the arch vaults and the terminal cistern | `sewer` keyed by the system and the source | each system | F-VOID |
| T2b | U-ACCESS the access pass (V04 §3.5.7) | every part; ground buildings with their footprints, basements and `Basement.crypt` (read); the foundation obstacles; wells; at a village rung the mining uses' outside-plot workings and V07's `mine.workingDepthM` (V07 §3.16 (4)); `LinkRule`, `DigRule`, `UnderOpeningRow`, `CatacombRule`; `ExcavationRecord` | links (proximity, overlap, mine breach, crypt, reuse), access points (dig, opening, crypt, a village working's breach), heading galleries (quarry part), `reusedBy`; the excavation reading and `ExcavationRecord` | `sewer`, keyed by the element pair, the building and the void kind, the candidate element | each building; each element pair | F-VOID |
| T3 | U-FRONT `UndergroundStrategy.derive` | part 0; the ground (read); the three field rasters; the underground `Allocation`; `UndergroundRule`; the granularity and designation rows; `UnderLayoutRule`; the excavation reading (F6) | part 0's L3–L4, the underground pseudo-district's blocks, plots, buildings; neighbourhood access points; F6's blocks, plots and buildings in accessible cavern and ruin clusters; lights | `plot.*`, `siting`, `siteplan`, `heights`, `pin.light` | the underground pseudo-district | F-UNDER, F-PLOT, F-SITING |
| T4 | U-CITY `UndercityStrategy.derive` | the void parts; the ground (read); the fields; the undercity `Allocation`; `UndercityRule`; U-FORECAST's P6 verdict; the excavation reading | undercity districts, walkways, carved chambers (the carve post-pass), blocks, plots, buildings; lights | `plot.*`, `siting`, `siteplan`, `heights`, `pin.light` (existence is P6's, never re-drawn) | each neighbourhood | F-VOID, F-UNDER, F-SITING |
| T5 | U-LINK `UndergroundLinkStrategy.link` | every part; ground buildings with basements; `LinkRule`; `UndergroundRule.access` | lifeline links and accesses; item 64's basement accesses; L5's pieces and networks; `District.outskirts` | `sewer` | the settlement; each building; each district; each dossier institution | F-VOID, F-EDIT (none at generation) |
| T6 | the tail's S12c and S13a | the underground and undercity districts and entities; the ground `AccessPoint`s of the public openings and catacomb entrances; the `magical_node` deposit sites (read) | characters, names, label candidates of the underground; then, after the naming of systems and complexes, V01's opening pass (V04 §3.10 *The opening pass*): one `HoodPlace` of kind `opening` per public opening of role `access` and per catacomb entrance, with its `place` label — records only — so a catacomb entrance's place carries its complex's name; the report's `ruin.node` lines (V04 §3.5.0a (9)) | `naming` | as §4.10; an opening place as V01 §2.8 (its host access's) | §9.6's naming ladder |
| T8 | U-RECONCILE (V04 §3.7a) | the households and institutions the tail could not seat below; the ground's placed plots, buildings and uses (read) | ground uses and household counts only, never geometry | `siting` keyed by the receiving ground district | each receiving district | F-SITING |
| T7 | S14's underground build | the layer's records | the underground display list, built when the layer is first shown (lazy; §8.1) | `render.instances` | — | — |

The eager sequence is T1, T2, T2b, T3, T4, T5, T6, T8; T7 runs when the layer is first shown. A stage whose inputs are
empty commits nothing and reports nothing but its zero counts; a degenerate result of any stage is refused by the kernel
and handled on the stage's ladder in the last column (§5.1 (9)), never by a re-run of the tail.

**At every rung** (g item 109 (j) (1)): at THORP, HAMLET and VILLAGE the tail runs T2 (ruin and cavern — catacombs,
quarries, vaults and the buried town keep TOWN and above —, the vaults step for the arch vaults and terminal cistern of a
raised way, which follow their way at every rung, and the catacomb step for a dossier catacomb record alone, which lays
its charnel vault (V04 §3.5.1 (10))), T2b, T3's F6 only, T5 (L3, L5, L7), T6 and T8, and T7 on show; never T1 or T4 as
generators (no new network; the undercity keeps II.7.5's rows). At a TOWN whose draw left `Features.sewers` false the
tail runs as at any TOWN, save that T1 commits nothing (N0) and T3 runs F6 alone (F0). The village product shows the
layer (V07). A buried former settlement (V04 §3.5.5 (b)) is laid by the
history replay at whatever rung the place stands, where the former settlement stood at TOWN or above.

**The maintenance mode (V07 §3.12; J-V4.90).** At a village rung, a system that an earlier, larger rung left (V07's
hand-off down) — the sewer network, a catacomb, a quarry, vaults or a buried town — stays registered in maintenance mode:
its stage re-derives its own part from its kept elements by `corridorUnion` (§4.11's rule for the buried and dug parts),
lays nothing new and never grows; U-FADE ages it at the underground's rate (V04 §3.10); the foundation rule (V04 §3.5.0;
`Foundations.apply` at an epoch) still collapses what a new footing meets; a catacomb's complex keeps its
`extentFloorM2` and is `stagnant` with `blockedBy` holding `'rung'` (V04 §3.5.1 (6)); an inherited undercity is re-read by
`UndercityEpoch.reread` against the village row's bound 0 and vacates by II.7.5's rules, its chambers staying as their
host system's elements. V04 §3.5.0's TOWN gates bar only the laying of a new system of those kinds. A replay runs the
tail at the same position of the fold as the generation did, so replays and generations agree byte for byte (§6.2).

**The standalone line (V01 §3.10.1 step 6 and (7); J-V4.105, J-V4.116).** A standalone neighbourhood document's S0 writes
`Features.sewers` false and the undercity circumstance `forbid`, so N0 commits nothing, P1–P4 forecast nothing, P6 finds
no undercity and U-CITY never runs. There U-FORECAST runs after the one-district allocation, not before S7b (5), and P7's
cap reads that allocation's poorest-band households in place of the roster's (J-V1.92); S7b (6) (d)'s void part is taken
from that allocation; P5's catacomb expectation ranks only the burial faces that allocation's anchors bring (a temple's
churchyard, a burial ground, a monastery's burial yard), never the virtual host town's roster. `Recipe.product` is read
by this line — in U-FORECAST at S7b and in the tail's T2 — its only reader besides S0. Where it is `'hood'`, the tail
runs the below-TOWN set above whatever the document's `contextRung`: T2's ruin and cavern, with the vaults step only for
the arch vaults and terminal cistern of a declared raised way (the unit run generates none); T2b; T3's F6; T5's L3, L5
and L7; T6; T8; and T7 on show. It adds U-SYS's catacomb step (V04 §3.5.1) at TOWN's rules, chances and count — **one** —
its candidates only the document's own burial faces ((1) (a)–(d) inside its outline; never a quarry ossuary, which (1)
(e) keeps to CITY and above). No quarry, generated or forced vault or buried town is laid, and P5 and P7 forecast only
the kinds this set lays: a ruin, a cavern and the one catacomb. Every other rung-scaled row the set reads (the ruin's
blueprint chance, the cavern rows, `UnderOpeningRow`, `DigRule`) is read at the `contextRung` (V01 §2.6). A standalone
neighbourhood document runs no epoch in V06's first build (V01 §3.10.1 (7)), so V04 §3.10 never meets one. Tested by
T-V4-75.

### 3.2 U-NET — the sewer network by medieval rules

**Inputs and constants.** The rule families are II.6's; the default family is `mixed` (J-V4.3): the town's small streams
culverted as trunks, mains under the principal streets feeding them, everything falling to the nearest admitted outfall
downstream. Constants are `NetworkRule`'s (V04 §2.3) and the profile table's (II.7.2).

**N0 — Gate and records.** If `Features.sewers` is false, U-NET commits nothing and part 0 stays schema-complete and empty
(II.7.2): never below TOWN, at TOWN by II.7.1's draw or the dossier's sanitation record (V04 §2.3a), always at CITY and
METROPOLIS (II.7.1's rung rows); an inherited network at a village rung is in maintenance mode (V04 §3.1). Else it mints
the `UndergroundSystem` of kind `sewer` on part 0 (V04 §2.5), its `rule` naming the family and preset row
(`net.<family>.<preset>`), and writes part 0's L0: the `margin` ring (the ground's frame plus its context margin, §3.2 (9))
and the rock face.

**N1 — The service region `R`.** The ground districts (never a sky district, V04 §1.2) whose kind is neither
`hinterland`, `underground` nor `undercity`: the settlement's built extent, intramural and extramural. A point is in `R`
when `pointLocate` on the ground's L1 finds a face owned by one of them (§3.4).

**N2 — Outfalls.** Candidates are `Terrain.outfalls` (item 205) with `into` ∈ {`river`, `sea`, `lake`, `canal`, `ditch`}
whose `at` lies within `outfall.reachM` of `R`. A candidate is admitted when it lies downstream of the settlement (II.7.2):
* on a river, `ContextVector.upstream ≥ 0.5` at the candidate's `Outfall.cell` (§2.5's field), and its course station `s`
  (the cumulative length of the course to the course vertex nearest `at`) ≥ the station of every harbour basin's mouth and
  every water mill's intake on that course (`outfall.below`, II.7.2's policy row). A mill's intake station is the course
  station nearest its building's footprint centroid; a basin's mouth station is the course station nearest the centroid
  of the basin face's edge shared with the river;
* on the sea or a lake, `at` lies ≥ `outfall.harbourClearM` from every harbour basin face and from the harbour-mouth
  chain's line where one is drawn (g item 106 (e));
* on a canal or ditch, its `flowTo` end is the one beyond `at` (the flow leaves the town).

**The order, the banks and each candidate's bank (J-V4.129).** U-NET first builds N3's way, culvert and drainage edges,
without outfall runs, and from them N3's banks (the parts of the graph the water divides, never crossed). Then every
candidate — and every `Terrain.outfalls` entry with `into: 'moat'` within `outfall.reachM` of `R`, a **moat candidate** —
takes its **link**: the nearest way junction (under `drainage-lines`, the nearest graph node) within `outfall.linkM`
whose straight segment to the candidate's `at` crosses no water face, by plan distance, ties by address; the candidate's
**bank** is its link's, and a candidate with no link is dropped. **A bank's stretch** of `R`'s boundary is the set of
`R`'s boundary `hydro` cells — each a cell of `R` with a D8 neighbour outside `R` — whose nearest graph node, by plan
distance, ties by address, lies on that bank; a cell of the stretch is **on water** when each of its D8 neighbours
outside `R` lies in a water face. Admission and its fallbacks then run bank by bank, in N3's bank order, and last each
admitted candidate's straight `outfallRun` edge to its link joins the graph, before N3's tree search. On a bank with
none admitted, its moat candidates are admitted with the start cost `outfall.moatPenalty × outfall.reachM` (a town ditch
took the town's waste; J-V4.7). With none of those either, U-NET makes that bank one **field outfall**, its D8 path
followed over land only: the stretch's cells not on water are taken in descending accumulation (ties by address), and the
first whose D8 path, followed downstream, reaches a cell outside `R` and beyond the outermost enceinte's outer strip
without entering a water face gives it — the field outfall is that path's first such cell, and a stretch cell whose path
enters a water face first is passed over for the next. The Outfall there is `{ into: 'field', water: null, at: that
cell's centre, snapped }`, the cess field of a dry town, and its outfall run follows that D8 path back to the stretch's
cell and joins the cell's nearest graph node by a straight edge that crosses no water face (the bank's next nearest node
where it would). A bank that holds no candidate makes none where its stretch is empty or lies wholly on water (an island
in the river, a quarter between a river and a canal) or where every stretch cell's path enters a water face first (a
bank whose ground falls to the river all along it): its plots drain by gutter and pit, its area reported unsewered
(F-NET's truncate rung).

**N3 — The drainage graph and its tree.** The `SewerGraph` (V04 §2.4) holds:
* **way edges** — every way spine between consecutive junctions with at least one end within `outfall.reachM` of `R`'s
  convex hull (the extent is fixed before the search; the Dijkstra then selects), plus N2's outfall-run edges, which join
  last (N2's order) — each with
  its spine vertices as its polyline, its class and both directions' costs
  `cost(u→v) = len · classCost[class] + adverseCostPerM · max(0, h_v − h_u)` (heights by the terrain sampler at the end
  vertices, in centimetres); `pier`, `ford`, `bridge` and `aqueduct` ways never carry a sewer (`classCost` ∞). The way
  edges are ground part 0's only (V04 §1.2): a raised spine is never an edge, never split by a culvert crossing and never a
  junction, and the way beneath it keeps its own edges, so a sewer follows the street under a viaduct, never the viaduct.
  **No edge lies over water (J-V4.129):** a spine stretch over a water face of ground part 0's L1 — the span between a
  `Bridge`'s two deck ends whatever its way's class, a pier, mole or quay platform standing over water — is left out,
  found by a segment sweep of each spine against those faces: the edge is cut where its spine meets a water face's edge,
  each land stretch kept as an edge ending at a new node there;
* **culvert edges** (`mixed`, `drainage-lines`) — every maximal D8 path of `hydro` cells in `R` whose catchment
  (`flowAccum` × the cell's area) reaches `culvertCatchHa` and which lies outside every water face: the town's unwatered
  brooks. Its polyline is the cells' centres, smoothed by `chaikin` Chaikin passes, snapped (§3.2 (7)) and simplified at
  `minEdge`; it is directed downstream only, cost `len · culvertFactor`. Where it leaves `R` or enters a water face its end
  is an outfall node (`Terrain.outfalls`' entry for that stretch; a brook that flows on outside `R`, never a water body,
  ends at an Outfall `{ into: 'stream' }`, item 205). Each crossing of a culvert polyline with a way edge (a segment
  sweep) splits both at a new node; each way node within `culvertLinkM` of a culvert gains a link edge to its nearest
  culvert node, unless that edge would cross a water face;
* **drainage edges** (`drainage-lines` only) — the D8 tree on the `hydro` cells of `R` itself, each cell a node draining
  to its D8 neighbour, a cell in a water face no node; no way edge is used.

**Banks.** With the stretches over water left out, the graph's nodes fall into connected components, each a **bank**
(`SewerGraph` node `bank`): one for a town on one side of its water, two or more where a river, a canal, a moat or the
harbour divides `R`. No sewer crosses from one bank to another — that would be a cut-and-cover main under flowing water,
which the cover rows forbid (`coverMinCm`, `coverMaxCm`: cut-and-cover, never mined): a run reaching the water ends at an
admitted outfall on its own bank, N2's fallbacks are taken per bank, and a bank they cannot drain keeps its gutters and
pits, reported. A plot's bank is its frontage way's (N4, N8).

For `follow-streets` and `mixed` the tree is a **multi-source Dijkstra** (§3.1's binary-heap search) from the admitted
outfall nodes over the reversed edges, the heap keyed by (cost, node address), so equal costs resolve by address
(J-V4.4). For `drainage-lines` the tree is D8 itself. Roots whose subtree drains less than `outfall.minOutfallHa` (N4's
area) are dropped and the search re-run once without them; if more than `outfall.maxOutfalls[preset]` remain, the largest
subtrees' roots are kept — first each bank's largest, so the cap never leaves a bank that held a root without one (more
such banks than the cap keep one root each, the excess reported) — and the search re-run once more. A node no root
reaches drains by its gutters: its area is reported as unsewered.

**N3a — Declarations.** The network honours what the author declared before it searches:
1. **Held runs.** Each drawn or held run (a `drawTunnel` without `system`, a locked or pinned run, a creation-prefix
   tunnel, V04 §4.7) enters the `SewerGraph` as a fixed chain of edges: its committed centreline, its kind and profile
   kept, cost 0 along it, its invert knots fixed. A declared run never lies over water: its dry run bent it at the bank
   (V04 §4.1). N7 treats them as constraints: a receiver's head takes min(its own upper
   bound, the held knot), and a held run is never re-laid, re-routed or truncated.
2. **Deleted runs.** A user's `delete` of a generated run leaves a tombstone on its creation key (V04 §2.5) in the
   network's derivation record: the way edges it followed take cost ∞ and N5 never re-selects them.
3. **Carry-over.** Regenerated runs are matched to their predecessors by creation key (§6.3); a matched run keeps its
   `depthOffsetCm`, its protected name and its moved or edited access points (their `ground.at` re-hosted by
   `pointLocate`).
4. `SewerStrategy.extend` (V04 §3.10) and Re-derive from any stage read the same declarations.

**N4 — Served area.** Each ground plot of `R` (the L3 plots of `R`'s districts) adds its area to the node nearer, by
station, to the projection of its frontage midpoint on its frontage way's edge (`Frontage.way`); each edge adds the part of
its corridor area inside `R` (length inside `R` × the way's width) half to each end; under `drainage-lines` a plot adds to
the hydro cell of its centroid. In reverse tree order (deepest first; ties by address)
`served(n) = local(n) + Σ served(child)`, in hectares; the edge `n → parent(n)` carries `served(n)`.

**N5 — Which edges are tunnels, and of what kind.** A culvert edge is always a `culvert`. A way or outfall-run edge
carrying `S` hectares is a `main` when `S ≥ mainMinHa[preset]` and its class is in `classes[preset].main`, a `drain` when
`S ≥ drainMinHa[preset]` and its class is in `main ∪ drain`; else it is no tunnel. **Downstream closure:** every edge on
the tree path from a selected edge to its root is selected, its kind the greater of its own and its upstream's in the
order `drain` < `main` (a culvert stays a culvert); an outfall run takes its incoming edge's kind. Under `drainage-lines`
a drainage edge is a `drain` at `drainMinHa`, a `main` at `mainMinHa`, and a `culvert` where its catchment reaches
`culvertCatchHa`.

**N6 — Runs and profiles.** The selected subgraph is cut into **runs** at every node of degree ≠ 2, at every kind change,
at every change of the way followed and at outfall nodes; each run is one `Tunnel` (II.6: one record, one condition). Its
centreline is its edges' polylines in flow order — a way run's positions read from the way's spine by `resolve` on the
ground key, a copy of positions, never of topology (J-A12.43) — `follows` the way (absent for culverts, drainage and
outfall runs), `widthCm` and `headroomCm` from the profile table at (kind, preset), a historical main's by II.7.2's law
with `servedHa` the served area at the run's downstream edge (kept in the run's derivation record, §2.8), `navigable`
derived and stored (§2.7), `rule` the row's id. A run whose served area reaches `trunkHa` is a **trunk** (named, V04 §5.4).
**Wall crossings (g item 110 (a)).** Where a run's centreline crosses a `RetainingWall`'s chain (a segment sweep of the run
against the walls' chains), two vertices are inserted on the centreline at the wall's two faces — the chain offset by half
the wall's thickness to its high and to its low side — each with its height `levelledGroundCm` on its own side (item
309). A way the wall turns into a stair or a ramp keeps its spine; the run copies the spine's positions and adds these
two. With no `RetainingWall` (the terrace rows off) no vertex is added and U-NET is byte-identical.

**N7 — The invert pass (J-V4.6; root-first).** Two sweeps; every height `h` is `levelledGroundCm` at the knot (item 309),
so a wall-face knot reads its own side's datum.
1. **Root-first.** Each outfall knot's floor is `low = s + freeboardCm`, `s` the receiving water's surface as §2.6's
   water table reads it — a moat's the derived level of §4.2 S3 (10), every other body's terrain height at the shore,
   `h(at)` — so the mouth sits `outfall.freeboardCm` above the water it discharges into; a field outfall's is
   `h(at) − coverMinCm − headroomCm`. Upstream along the tree,
   `low(v) = low(next) + minGradient · len(v, next)` is the lowest invert from which `v` still falls to its mouth. Each
   knot starts at `inv(v) = upper(v)` with `upper(v) = h(v) − coverCm − headroomCm + depthOffsetCm` (the profile row's
   `coverCm`, the run's `depthOffsetCm`, item 247) where `upper(v) ≥ low(v)`; else at `low(v)`, its cover shrinking below
   `coverCm`, admitted while the crown keeps `coverMinCm` — the knots of an outfall run are exempt, being the mouth's cut
   through the bank face — and failing at `v` otherwise.
2. **Leaves-first.** Runs are then visited from the leaves; along each run, vertex by vertex in flow order,
   `inv(v) = min(inv(v), inv(prev) − minGradient · len(prev, v))`; a run's head takes `min(its invert, the lowest
   downstream-end invert of the runs entering it)`, so every branch falls into its receiver; held knots (N3a) are fixed.
   Since every upstream knot starts at or above `low`, this sweep never lowers a knot below `low(v)`.
3. **The drop at a wall.** Where the flow crosses a `RetainingWall` from its high face to its low face, the low-face knot
   starts at its own `upper` (the low side's cover), and the sweep's `min` makes the invert fall across the wall's
   thickness. The segment between the two face knots is a **drop** when its fall exceeds `minGradient ×` its length: one
   run and one record still (no junction; J-V4.85), drawn as a drop shaft at the wall (V04 §5.2) and exported with both
   knots. A run whose flow climbs a wall keeps falling by N7's rule, its cover growing on the high side, and the
   `coverMaxCm` ladder applies as anywhere. So no crown rises above the levelled ground at either face (T-V4-67).

The crown's depth `h(v) − inv(v) − headroomCm` must stay ≤ `coverMaxCm`. **Its ladder (F-NET, item 330):** (1) re-route —
the tree edge downstream of the first failing vertex takes cost ∞ and the Dijkstra re-runs for the nodes whose root path
used it (≤ `maxReroute` attempts, no draw); (2) truncate — the subtree above the failing edge takes a local root if an
admitted outfall lies within `outfall.linkM` of one of its nodes, else it carries no tunnel and its plots drain by gutter
and pit, reported; the terrain is never lowered. An outfall whose knot cannot keep the freeboard (a bank lower than the
run allows) keeps it anyway and reports `W_OUTFALL_LOW`. Each vertex carries an `invert_knot` row; `elevationCm` is the
rounded mean invert; the `sewer` system's `depthM` is the range of the runs' crown depths.

**N8 — Plot connections (`serves`; J-V4.8, J-V4.43).** For each plot of `R` (on ground part 0; its `Frontage.way` a
part-0 way), its need is the highest `drain` value among its uses' class rows (`channel` > `pit` > `none`) — and at least
`channel` for the plot of an aqueduct's terminal building, whose overflow leaves by the sewer (V04 §3.5.4 (e)); II.7.1's
connection table then decides:
* `channel` — connected to the nearest `main` or `culvert` run on its bank whose centreline lies within `reachM[preset]`
  of its frontage midpoint (ties by address; item 548 names the culvert, the trunk of the `mixed` family); else, where its
  class carries a tag in `drainPriority[preset]` and a selected run's node lies within `drainExtendM` along its frontage
  way's spine on its bank (a stretch over water is none, N3), a **drain run** is added along that spine stretch (kind
  `drain`, its profile row, its invert laid by N7's rule from its head down to the receiving run's invert at the
  junction, dropped if its head's crown would exceed
  `coverMaxCm`) and the plot connected to it; else unconnected, reported;
* `pit` — one uniform on `sewer` keyed by the plot's lineage; connected, to the nearest run on its bank within `reachM`,
  when it falls below the band's `pitShareByBand` (II.7.1); else unconnected, silently (a pit is the norm);
* `none` — never connected.

A connection is logical: the plot's id in the run's `serves`, sorted; no chain, no pin, no ground change (II.7.1).

**N9 — Passages (navigable preset only; J-V4.10).** For every pair of navigable runs, not sharing a junction, whose
centrelines come within `passage.reachM` in plan (a uniform grid index over run segments), the closest pair of points is a
candidate when the network path between them is longer than `passage.loopM`; candidates are taken in order of (plan
distance, the pair's sorted lineage), each run accepting at most `⌊length ÷ 1 000 m × passage.perKm⌋`, a candidate whose
straight segment crosses an accepted passage or a water face, or whose grade exceeds `passage.maxGrade`, refused. Each
accepted one is a `passage` run (profile row `passage`), splitting both mains at its ends (new junctions), its invert
linear between theirs.

**N10 — Commit on part 0.** One L1 batch inserts every run's centreline in address order as a `tunnel` chain with its
`invert_knot` rows; every vertex where ≥ 3 run ends meet takes a `junction` row and a `Junction` record (item 208) whose
`arms` are the runs, `chamber` set where the preset is `navigable` and at least `chamberMinArms` arms are navigable
(J-V4.9). A crossing the kernel finds between two runs the graph did not join (an outfall run across a drain) is a
junction too (§3.4), reported `W_NET_CROSS`: each run keeps its own invert knots at the vertex, the drop between them
standing. Every underground `Junction` takes `kind` as the ground does (§2.4's union): `T`, `X` or `Y` by its arm count and
angles, `end` at a dead end. One L2 batch runs `corridorUnion` over part 0's L1 faces with half-width
`widthCm ÷ 2 + wallCm` (§3.7), giving every run its two half-band strips, every junction its wedge and the rock between as
part 0's blocks.

**N11 — The network's own openings (J-V4.11).** On every `main` and `culvert` run, at its head where the head lies in `R`
and at every `manholeSpacingM[preset]` of centreline from it, the ground point above is tested by `pointLocate` on ground
part 0 (a point under a raised deck is tested on the way beneath, whose corridor it is): on public ground (V04 §1.2) it
takes an `AccessPoint` of kind `grating`, role `access`, source `system`, `knownTo: 'public'`, state `open`; off public
ground the site slides along the run in 5 m steps up to half the spacing each way, else the site is skipped. Each outfall
takes a `mouth` (role `access`, its `ground.host` the land face at `at`), and each culvert's inlet where its brook enters
`R` another. Their `access_point` vertices lie on the run's kerb at the nearest point (a transaction on part 0). Each
carries `cause: { rule: 'system', system: the sewer }`. A grating on a lived run is also the sewer-front neighbourhood's
access (V04 §3.4 F5).

**N11a — Grilles at walls (g item 106).** `Tunnel.grilles` is a view: the stations where a run's band crosses an
enceinte's `wall_strip`, a quay wall or a sea wall, found by a segment sweep of the run's centreline against those strips'
outlines at read. Each draws as a gate bar across the band (V04 §5.2), exports as a closed VTT portal and is public to the
knowledge filter; an outfall run through a quay or sea wall keeps its mouth, so no wall cuts off the water's access (g item
106 (d)).

**N12 — Close.** `Features.underground` is true; the report carries the network's length by kind, the outfalls by `into`,
the connected share of plots by need, the unsewered area and every F-NET use (§5.4).

### 3.3 U-FORECAST — what S7b needs before any tunnel exists (J-V4.13)

S7b (6) and (7) cap the underground and undercity allocations by predicted capacities (II.7.3, II.7.5); the base states the
prediction for street-following mains only. `NetworkForecaster.forecast(doc, rules)` runs at S7b, before (5) (in a
standalone neighbourhood document after the one-district allocation, V04 §3.1's standalone line), on what exists then — the
ways of S4 and S5, the district faces of S6, `Terrain`, the roster of S2 — **gated**: P1–P4 run only where
`Features.sewers` is true and for the chosen family only; P5 and P7 run at every rung for caverns and ruins and at TOWN
and above for the other kinds; P6 runs at TOWN and above; under the standalone line P5 and P7 forecast a ruin, a cavern and
at most one catacomb only.
1. **P1** — N1–N3 exactly, on the same code (`R` from S6's districts).
2. **P2** — served area from the district faces: each district's L1 faces' area × the dense core's plot share (§4.2 S2),
   spread over its bounding way edges in proportion to their length, then N4's accumulation.
3. **P3** — N5 and N6 (no N7: the invert changes no size), giving each run's kind, profile and `navigable`.
4. **P4 — the admissible share.** A way run's side strips lie under the street where `halfWidth(way) − (widthCm ÷ 2 +
   wallCm)` reaches the poorest band's minimum underground depth (II.7.3's depth rule), else under the frontage buildings,
   which II.7.3 excludes: its share is the fraction of its length under square faces or under ways meeting that margin; a
   culvert or drainage run under blocks takes 1 − the district's coverage row. The capacity is II.7.3's capacity law over
   the navigable runs of at least `minRunM`.
5. **P5 — the voids, realised where the key exists.** Each system's floor area ÷ `m2PerHousehold` (II.7.5):
   * a **ruin** by its own existence draw and extent draw (the keys U-SYS uses, V04 §3.5.0a — its sources are dossier facts
     and the recipe, all known at S7b) × `RuinRule.forecastFloorShare`;
   * a **cavern** by its existence draw (the key U-SYS uses; the geology is S1's) and the frame's rock × `maxRockShare` ×
     `forecastFloorShare`;
   * **vaults** by the part-0 bridges and steep ways present (exact), and the **forced vaults** under `require`
     (V04 §3.5.6) by their law (exact) — never an arch vault or a terminal cistern, which no undercity takes; a **buried** town
     by the scar rule (exact); a buried former settlement is never forecast: the history replay lays it at a coarse epoch
     after the generation's S7b (§4.11 *History-first generation* (2), (5); V04 §3.5.5 (b)), and its voids take
     dwellings only by V06's relocation at an epoch (V04 §3.10);
   * a **quarry** by V04 §3.5.3's volume law over the roster's predicted stone stock;
   * **catacombs**, the one expectation (their burial faces are seated at S10b): the roster's expected burial faces ranked
     by expected burials, the first `count` of them (V04 §3.5.1's count), each need × its face chance (under the standalone
     line the burial faces the one-district allocation's anchors bring, the first one).
6. **P6 — the undercity's existence.** II.7.5's rung row; the TOWN draw — one uniform on `sewer` keyed by (the settlement,
   `undercity`), which U-CITY C0 re-reads and never re-draws; `CircumstanceSlice.undercity` (`require` → exists at TOWN and
   above with `n ≥ 1`, the forced vaults counted where no counted void qualifies; `forbid` → none); the size law's `H` and
   `n`, capped by the counted voids' capacities in rank order (capacity × `RuinRule.sourceWeight`). It returns
   `undercity: { exists, n, H }`.
7. **P7 — the chance of access (g item 109 (j)).** For each forecast cavern or ruin void,
   `pAccess = 1 − (1 − pOpen) × Π_b (1 − pDig(b))`: `b` the buildings expected over its plan extent — each district face
   over it × the district's coverage row × its band's buildings per hectare — each priced by `DigRule` at the ordinary
   house's class row and `depthFactor` at the void's top depth; `pOpen = 1 − Π (1 − chance)` over its expected opening
   candidates (`UnderOpeningRow`); `pAccess = 1` where a P3 run's plan passes over the void within its depth range (the overlap
   rule). A kind dug from the surface has `pAccess = 1`. A void counts toward P6's capacity and F6's allocation only when
   `pAccess ≥ accessForecastMin` (II.7.4's `UndergroundRule`, 0.5). `voidDwellingHouseholds` is
   Σ min(`voidDwellings.maxHouseholds`, capacity) over the counted cavern and ruin voids the undercity forecast does not
   take, capped at `voidDwellings.share` × the poorest band's households (under the standalone line, the one-district
   allocation's poorest-band households).

S7b (6) and (7) allocate at most `forecastSafety` (II.7.4's `UndergroundRule`) × each forecast capacity (item 551), so
over-forecasts are rare. The forecast is advisory and deterministic: its misses are absorbed below (V04 §3.4 F0, V04 §3.6
C1) and the remainder by T8 (V04 §3.7a), reported, never re-rolled. **Its edges.** It commits nothing, so degenerate
input only shrinks it: a zero-length
run adds no length, a zero-area face no served area, a void of zero extent no capacity, and with nothing to forecast it
returns V04 §2.4's all-zero record. It is never persisted: load, undo, redo, regenerate and migrate recompute it through
the replay that re-runs S7b (V04 §2.6). Budget: item 475's §12.4 row (V04 §6).

### 3.4 U-FRONT — the sewer-front neighbourhoods (II.7.3's rules, as steps)

The rules — U1–U3, the occupants, the cut, the surface constraint, access, depth, lifecycle, order — are II.7.3's; these
are its steps.
1. **F0 — gate and absorption.** The underground `Allocation` exists (S7b (6)) and part 0 holds at least one open
   navigable run; with neither, F0–F5 commit nothing (below TOWN, and at a TOWN or above without sewers or navigable runs,
   only F6 runs). With an allocation and no such run, its households go first to the other underground allocations with
   free capacity (an undercity neighbourhood, then F6's clusters), and only the remainder to T8 (V04 §3.7a), reported
   (F-SITING). A surplus S10b cannot seat on the plots F2 cut raises the occupancy of the placed sewer-front cells, in
   address order, up to `crowdCap` households per cell; the rest goes to T8.
2. **F1 — frontages.** On each part-0 block, each kerb edge of an open navigable run is a frontage (II.7.3's cut (1)) — a
   wedge at a `chamber` junction never is (J-V4.9): the chamber stays open floor. `Frontage` records are made per block
   and run (§2.5), class the run's kind. A kerb edge below `minEdge` is no frontage; a block with no frontage cuts no plot.
3. **F2 — regions and plots.** S10 (2)–(10) with the context vector of II.7.3 (the ground's field shifted by
   `undergroundOffset`, `ContextVector.arena = 'underground'`), the regions' depth capped by `depthScale`; a degenerate cut
   takes F-PLOT's ladder (§5.2). The prosperity sampled is the ground raster with its daylight-share term (g item 102): the
   underground inherits its parent ground's standing, not a sun of its own (J-V4.51).
4. **F3 — the surface test.** II.7.3's sampled `pointLocate` test and F-UNDER's ladder on every plot before commit; each
   block's **recorded ground cells** — the ground L1 faces its samples touched, by address — are written into its
   derivation record (§2.8), the declared read §7.3's locality row uses.
5. **F4 — placement and buildings.** S10b places the allocation, its relation families measured by `underDistance`
   (V04 §3.6a); S11 lays `row` and `institution` arrangements only, heights by II.7.3's depth rule.
   * **Members (g item 108).** A COUNT or GUILD ladder record of an underground-preferred or subterranean kind places each
     member as its own item, keyed `#k` (item 108's member key), each by the scorer; a SIZE step places one larger
     compound; members are never double-counted with their record.
   * **Clandestine institutions (item 63).** An `underground`-mode concealed use takes a plot whose `knownTo` is the
     institution's (default `secret`); its exposure preference is the station farthest along the run from a public
     grating (a soft row); it has no front (`Building.concealed` without `Use.front`); its door light carries the
     `exposure` row `hidden`, so the light draws only for a key that admits it (§8.1 item 7); its way to the surface is
     L3's basement access with the concealed multiplier where a building above reaches it.
   * **No crypt below.** F4 never seats a crypt as an underground plot: the `preferred` classes are V11's rows, and a crypt
     is its church's `Basement.crypt` (V03 §3.7.4; g item 109 (k) (2)).
   * **Entrances.** Every entrance S11 derives on an underground building here opens onto its tunnel run's kerb: it takes
     `Entrance.faces: 'tunnel'` (item 239; J-V4.91), which V03 §3.12 (4) and the VTT portals read. F6 and C4 write the
     same on their buildings' entrances (a gallery kerb, a chamber wall, a walkway kerb).
6. **F5 — access, air, light.** Per neighbourhood (a connected component of open navigable run edges carrying a plot)
   II.7.3's access order, its squares, yards and public ground read by V04 §1.2's definition; shafts every
   `shaftSpacingM` on public ground. Shaft spacing counts every surface-breaking opening whatever its role, the record
   keeping its own role; an N11 grating on a lived run satisfies the neighbourhood's access (T12-1's ≥ 1 access row), so
   no second stair is made beside it. Lights by V04 §3.9's sewer rows.
7. **F6 — scattered dwellings in the voids (g item 109 (e), (j) (4)).** In each cavern or ruin cluster (U-CITY C1's
   connected component) whose excavation reading is `accessible` and which no undercity neighbourhood took, at every rung:
   S10 cuts the cluster's floor with frontages on gallery kerbs and chamber walls (II.7.5's cut; `water` galleries are
   never frontages), S10b places up to `voidDwellings.maxHouseholds` households of F6's allocation (S7b (6)'s void part,
   item 551; under the standalone line taken from the one-district allocation) — at an epoch, in a cluster `under.access`
   made accessible that epoch, the households V06 relocates into its new dwellings (V06 §3.18.1 (4); V04 §3.10), and in a
   cluster accessible before that pass, the crowding hook's void part up to the free capacity (V06 §3.6 (1); item 574) —
   by II.7.3's rows, and S11 lays the `row` and `hovel` arrangements, ceiling-capped (II.7.5). The occupants are squatters
   and hermits of the poorest band and, where the roster holds one, a forbidden shrine (a cult). F6's blocks join the
   underground pseudo-district's `faces` (a `FaceRef` names its part), keyed by the cluster (V04 §2.5). A cluster that is
   `unexcavated` or `lost` holds no dwelling (J-V4.53); one that turns `lost` vacates them by II.7.3's vacancy rules in
   the commit that closes its last open path, and dwellings may return at the next placement after it is refound
   (V04 §3.5.7 (g); g item 113 (e)).

**Existence along the sewers.** II.7.3's surface test excludes every footprint, so under 4–8 m streets the sewer-front
plots may be rare. T-V4-41 measures it at U2 (at least one sewer-front neighbourhood on 60 % of navigable and 10 % of
historical CITY seeds). **The pre-decided fallback** if it fails: item 552 applies — II.7.3's surface constraint binds
sewer-front plots only where their ceiling lies within `surfaceClearCm` of the ground, as J-V4.21 does for voids — and the
navigable profile's `coverCm` rises to 600, so those dwellings' ceilings clear that depth (J-V4.60).

### 3.5 U-SYS — the void systems

**3.5.0 Existence, order and what every system shares.** In the order ruin, catacomb, cavern, quarry, vaults, buried —
the ruin laid first, so every later system meets it (g item 109 (c)) — each kind is gated by rung (g item 109 (j) (1);
II.7.6's gate sentence and PART III's village rows):

| kind | rungs | existence |
|---|---|---|
| `ruin` | every rung, THORP to METROPOLIS | V04 §3.5.0a's sources |
| `cavern`, the fissure variant included | every rung | the geology flag and its row chance × the mining boost (V04 §3.5.2) |
| `catacomb` | TOWN and above | V04 §3.5.1's candidates, rank and count |
| `quarry` (mines and chain mines) | TOWN and above | V04 §3.5.3's volume law; mines where the roster holds a mining class |
| `vaults` | TOWN and above for the generated sources (bridge, street and cistern vaults, the forced vaults); the arch vaults and the terminal cistern at every rung, following their raised way | V04 §3.5.4's rules; the forced vaults (V04 §3.5.6); the base's `vault` spans and `cistern` terminals (item 244) |
| `buried` | TOWN and above for a raised grade and a scar; the replay's former settlement wherever the former settlement stood at TOWN or above | the scar rule (II.7.6); `raiseGrade`; `BuriedFormer.lay` (V04 §3.5.5 (b)) |
| `dug` | every rung | U-DIG's closures and U-LINK L5; below TOWN, a dossier catacomb record's charnel vault (V04 §3.5.1 (10)) |

**Under the standalone line** (V04 §3.1) the rung column reads: `ruin`, `cavern` and `dug` as at every rung; `catacomb` at
TOWN's rules and count, on the document's own burial faces; `vaults` the arch vaults and terminal cistern of a declared
raised way only; no `quarry` and no `buried`.

Each chance is one uniform on `sewer` keyed by (the kind, the source's lineage). The parity presets set every chance to 0
(a dossier source's included: a parity run carries no dossier), the ruin toggle `off`, the scar rule off and the history
replay off (T-V4-35). **Dossier forcing (item 386; V04 §2.3a):** a subterranean record whose row names this system kind
makes the system exist with at least one source — its own building where it has one; else a catacomb record the first
burial face in rank order that passes the dry-ground gate (V04 §3.5.1 (10)), a mine record the ore cell nearest the town
(V04 §3.5.3), a cistern record the oldest precinct's court (V04 §3.5.4) — its chance taken as 1. A crypt record forces no
system. A system is created (its part the next unused, §2.9) only when its first element can be laid; it writes its L0
margin ring, then its elements in one L1 batch (galleries as `gallery` chains, chambers as closed `chamber_wall` chains; a
gallery segment inside a chamber is dropped so galleries end on the wall), then one L2 `corridorUnion` batch. **The
shallow-element rule (J-V4.21):** an element of a system laid after the town whose ceiling lies within `surfaceClearCm` of
the ground above keeps `foundationClearM` (II.7.6) from every basement ring of another building and never lies under a
water face; deeper elements are free of the surface. A ruin is older than the town, so the rule runs the other way for it:
a ruin element under a footprint or within `foundationClearM` of a basement ring is created `collapsed`, cause
`foundation` (the town's foundations cut through it; g item 109 (c), (d)); a buried former settlement's element takes the
ruin's direction (V04 §3.5.5 (b)). A dry kind (catacomb, quarry, vaults, dug) keeps its floor above the water table; a
buried or ruin element found below it is created `flooded` (II.6's row). An arch vault stands at grade and is exempt from
the cover rows and from the dry-kind rule (V04 §3.5.4 (d)).

**Foundations (g item 110 (a), (b); J-V4.82).** `foundationObstacles(doc)` is derived at every derivation from the ground
as it stands: (1) each raised-way pier's footprint — the raised-way record's `supports` (item 244's support step, whose
keys bound the spans), its ring on ground part 0, for the raised way of every raised part — from `levelledGroundCm` at its
centroid (item 309) down to `span.supportFoundationCm` (§2.7) below it; (2) each `RetainingWall`'s footing — a live
wall's, and one a `raiseGrade` tombstoned (V06 §3.19.4 (1)), whose footing stays in the ground under the buried town — a
strip `foundations.footingWidthCm` wide centred on its chain, from its high-side ground down to its low-side ground (each
`levelledGroundCm` on its own side, a tombstoned wall's on its last live state) less `footingBelowCm`, that is the step
height plus `footingBelowCm`, station by station along the wall; (3) each buried aqueduct stretch's channel band grown by
`conduitClearCm`, from the ground down to its channel floor less `conduitClearCm`. An element lies **within reach** of an
obstacle when its plan band meets the obstacle's footprint grown by `foundationClearM` (II.7.6) and its top lies above the
obstacle's bottom. Every rule that reads basement rings reads these beside them. A system laid after the town (a
catacomb, a quarry or mine working, vaults, the forced vaults, the undercity's carve, a dug passage and U-DIG's connector)
lays no element within reach; a catacomb node so refused records `blockedBy: 'foundation'`. An older void (a cavern, its
fissures, a ruin, a buried former settlement) keeps its plan and the builders fill what they met: a gallery's stretch
within reach is split out by II.6's stretch split and created `collapsed`, cause `foundation`; a chamber whose floor the
grown footprints cover by at least `foundations.collapseShare` is created `collapsed`, cause `foundation`, and one covered
less keeps its floor with the footing standing in it as a masonry pillar — no floor, no plot, no walkway and no pin on it
(drawn by V04 §5.2, explained by V10: "the footing of a raised-way pier of ⟨way⟩"). The reading is re-made at every
derivation from the current raised-way piers and retaining walls, so a removed raised way's fill goes with it and a new
one's comes with it (T-V4-65). A raised-way pier is no building and never a dig host for U-ACCESS (d). The buried town's
own elements (a raised grade's, a scar's) are never collapsed by a footing: its old streets and storeys are the ground the
walls held (V04 §3.5.5 (a)).

**At an epoch (J-V4.109)** no V04 stage derives, so the rule is applied by `Foundations.apply(doc, scope, cause)`
(V04 §1b.2), V06's `under.extend`'s first act (V06 §3.18.1 (6)), at every rung, the maintenance mode included: over the new
footprints and basement rings of `scope.built` and `scope.basementGrown`, the raised-way piers of the raised ways in
`scope.raised` (V06 §2.1: every raised way whose `feet`, `supports` or `spans` the epoch changed, a trace's crossing
station and the frame growth's deck extension among them) and the footings of the retaining walls in
`scope.levelled`, it applies this paragraph's rule to the
elements within reach of those obstacles — an older void's stretch split out `collapsed`, a chamber covered by at least
`collapseShare` `collapsed`, one covered less holding the footing as a pillar, a later system's element `collapsed` (a
catacomb's staying in its extent, V04 §3.5.1 (6)) — cause `foundation` with `event` the epoch's `seq`, one batch per part,
no draw. The plots on a floor it collapses (F6's, an undercity neighbourhood's) are vacated by II.7.3's vacancy rules in the
same batch and returned in `FoundationsResult` (V04 §2.4) — each plot with its households' ids — with the collapsed
elements and the pillars, for V06's re-homing by name inside the participant. An epoch op removes no obstacle — a breached
or dismantled span keeps its piers' footings (V06 §3.19.2), a tombstoned wall its footing (above), a crossing station
its pier's former ring (§2.7's support step (6) (b) (iii)) — so the element set it
collapses is the one a regeneration of the same state collapses (T-V4-65; V06's T-V6-67). With an empty scope it returns
three empty lists.

The rows' gallery and chamber defaults, which II.7.6 leaves to the rows (our own values; J-V4.16 – J-V4.20, J-V4.52):

| system | gallery `widthCm` / `wallCm` / `headroomCm` | `coverM` | chamber kinds: `minM2` / `ceilingCm` |
|---|---|---|---|
| `ruin` | a street at its culture row's `streetCm` / 60 / 300; a corridor 150 / 50 / 250 | `burialCm ÷ 100` less the ceiling | `hall` 150 / 800 · `temple` 100 / 700 · `court` 100 / 600 · `gate` 20 / 400 · `room`, `tomb`, `vault` 6 / 300 · `cistern` 40 / 500 — each ceiling capped at `burialCm − 100` |
| `catacomb` | 120 / 50 / 200 | 2.5 | `ossuary` 9 / 250 |
| `cavern` | 300 / 100 / 400 (a volcanic tube 500 / 100 / 400; a fissure 80–150 / 100 / 600–1 200) | 3 | `hall` 400 / 800 · `breakdown` 300 / 600 (a fissure's ≤ `fissureChamberM2`) |
| `quarry` | haulage 250 / 50 / 250; a heading 150 / 50 / 200 | 6 (`minCoverM`) | `workings` 400 / 250 (the pillars drawn, not modelled) |
| `vaults` | 400 / 60 / 300 | 1 (an arch vault 0: at grade) | `cistern` 150 (a castle's 250; a terminal cistern `terminalCisternM2`) / 500 · `streetVault` 40 / 300 · `bridgeVault` 60 / 300 · `archVault` the span's inset rectangle / the soffit less its floor (V04 §3.5.4 (d)) |
| `buried` | the old way's width / 30 / the raise − 50 (a former settlement's: its depth − 50) | 0 | `storey` the footprint / min(the storey height, raise − 50) · `square` the old square / raise − 50 · a former settlement's `storey` and `gate` / min(the storey height, its depth − 50) |
| `dug` | 100 / 30 / 190 | 1.5 | `cellar` 6 / 220 · `storage` `storageM2` / 220 · a charnel `ossuary` ≤ `charnelMaxM2` / 250 |
| undercity carved (in the host's part) | walkway 300 / 0 / the chamber's ceiling | — | `market` `mainChamberM2` / min(the host row's largest ceiling, the adjoining headroom + 200) |

**3.5.0a Ruins (g item 109 (b), (c), (e)–(h); J-V4.52).** An older civilisation's remnant plan, laid first, at every rung.
1. **Existence, strongest first.** A ruin the document already holds is kept whole whatever its dossier source now says — a
   removed source clears `source.ref` (V04 §2.6; `W_RUIN_SOURCE_REMOVED`) — save a `blueprint` ruin, which a re-derivation
   with `recipe.layers.ruins` off does not lay. Otherwise the sources are read in this order — `site.ruinEvidence`'s kinds
   in V08 §2.6a's reading, through DR30 — and the first that fires sets `RuinRecord.source`: (a) a `site.deposits` entry of
   kind `ancient_ruins`, or an institution of scene archetype `ruined-landmark`: the ruin exists, no draw; (b) a
   `magical_node` deposit or a ley-line income row: `RuinRule.chance.magic`; (c) a `magical` history event, or
   `history.ageYears ≥ ancientYears` (an ancient founding): `chance.history`; (d) with none of these,
   `chance.blueprint[rung][relief]`, only while `recipe.layers.ruins` is `on` (item 404; D-3). A delving institution
   multiplies (b)–(d) by `delvingFactor`, capped at 1, and alone gives nothing (the chances V11 §3.23.2's). One ruin system
   per settlement; one uniform on `sewer` keyed by (`ruin`, the source's lineage — the deposit's, the institution's, the
   event's — or the town root for the blueprint). A declared ruin element in the creation prefix (V04 §4.7) makes it exist
   whatever the draw, `source: 'declared'`.
2. **Culture and axis.** The culture row is one draw over `RuinRule.cultures` by weight on the ruin's stream, or the row V11
   maps to the ancient civilisation the dossier's history names. `axisDeg` follows the row's orientation law: `cardinal` 0°
   (north–south) ± 5°; `solar` 90° (east–west) ± 10°; `contour` the mean contour bearing over the outline (perpendicular to
   the mean terrain gradient); `free` uniform on [0°, 180°) — the jitter a draw. With `sharedAxisChance` it takes instead
   the bearing of the present tier-1 way whose spine passes nearest the centre (its OBB axis), and `sharedAxis` is set: the
   old axis surviving as the new (g item 109 (c)).
3. **Place, size and outline.** The centre is the marker's position (the port's ruin decoration or the ruined landmark's
   site); else the magical node's position (DR19's deposit site); else the centroid of the growth-stage-1 districts; else,
   at a village rung with no stage-1 district, the centroid of the village's district (V07's one district); else the town
   root's anchor. The significance is drawn by weight (a `ruined-landmark` record forces `palace`), the extent uniform in
   its `extentHa` range, capped at `maxFrameShare` × the frame's area. The outline is a rectangle of that area on `axisDeg`
   with the row's `aspect`, centred and clipped to the frame; a clip that removes more than half moves the centre toward the
   frame's centre, in 10 m steps, until half remains.
4. **Depth.** The ancient ground `g(p)` is the present terrain smoothed by a `smoothM` box kernel less `burialCm`,
   `burialCm` = `burialByAge(ageYears)` interpolated and clamped to `depthM` (item 563); `ageYears` is the source's (a
   history event's `yearsAgo`, a founding's age) where it gives one, else drawn on [`ancientYears`, 3 000]. A `terraced` plan
   steps its floor by `terraceRiseM` per terrace along the fall line. Each element's floor follows `g` at its vertices (a
   gallery graded, a chamber level at its centroid's value); each chamber's ceiling is its kind's, capped at
   `burialCm − 100`. An element whose floor lies below the water table is created `flooded`.
5. **The ancient plan, by family** (V11's row gives `blockPitchM`, `streetCm`, `aspect`, `roomM`, `columnPitchM`,
   `hallShare`, `terraceRiseM`):
   * `grid` — streets on a pitch drawn in `blockPitchM` along and across `axisDeg`, every third a main street at
     `streetCm[0]`, the rest `streetCm[1]`; each block cut into rooms by recursive splits along its longer side until both
     sides lie within `roomM`; the `hallShare` of blocks nearest the centre become one `hall` each, the central block a
     `temple`, and where the perimeter streets meet the outline a `gate`;
   * `axial` — a processional axis through the centre along `axisDeg` at `streetCm[0]`; along it alternate `court`s and rows
     of rooms mirrored across the axis; a `temple` at its head; `hall`s at a third of its length from the head;
   * `radial` — a ring road at 0.7 of the outline's inradius and spokes every 45° to a central `hall` (the citadel); the
     wedges cut into rooms as `grid` cuts blocks;
   * `terraced` — terraces along the contours `blockPitchM` apart, each a terrace gallery with a row of rooms on its uphill
     side, joined by a stair gallery every `blockPitchM` along the terrace.

   Streets and corridors become galleries; rooms become chambers of kind `room`, those of the outermost row in the quarter
   farthest from the centre along the axis `tomb` (the necropolis), those adjoining a `hall` `vault`; a cistern where the
   row's `hallShare` block lies lowest. Where the culture row's `monument.hosts` holds `tomb`, the necropolis's block
   nearest the centre is not cut into rooms: it is one `tomb` chamber, a mausoleum, so a monument fits (J-V4.86). Each main
   street carries its ancient drain as a channel (the `water` stroke), the element the sewer may adopt (V04 §3.5.7 (f)). At
   most `maxChambers` chambers: beyond it the plan's outer rooms are dropped from the outline inward. A plan the outline
   leaves no block for (an outline narrower than one `blockPitchM`) is one `hall` chamber on the outline, inset by the
   row's wall; a degenerate element is refused by the kernel and left out, reported (F-VOID, §5.1 (9)). One L1 batch, one L2
   `corridorUnion` batch, on the next unused part.
5a. **Stepped monuments (g item 110 (c); J-V4.84).** Where the culture row carries `monument` (V11 §3.23.4's cells), each
   host kind it names takes one monument: `temple` the temple chamber nearest the centre, `hall` the hall nearest the centre,
   `tomb` the mausoleum of (5); ties by address. V02's `drawTiers` (ST1) draws on the ruin's stream and V02's `layTiers`
   (V02 §3.15.1) lays it with:
   * `frame` — the chamber's rectangle on `axisDeg`: `u` along its **front**, the side facing the nearest main-street
     (`axis`) gallery, else the side facing the centre, ties by the lower side index; `v` inward; the origin the front's
     corner that makes (`u`, `v`) right-handed, moved inward by `monument.clearM` along both;
   * `region` — `W` the front's length and `D` the depth, each less 2 × `monument.clearM`;
   * `scale` 1; `cells` V02's `stepped-monument` row at the anchor `monument.band`; `heights` V11's `stepped-shrine` row
     (V11 §3.6.4), not the great temple's nave row; `pitch` M11's one pitch rule at the site's climate row; `parapetCm` 0
     and `plinthCm` 0 (a ruin keeps neither); no `anchor`;
   * `draws` — ST1's list, drawn by `drawTiers` in ST1's order (V02 §3.15.1) on `sewer`, keyed by (the ruin system, the
     chamber's plan coordinate, `'tiers/0'`) for the first pass and (…, `'tiers/1'`) for the per-tier pass; an author's
     `monument.count` replaces `n`, every other draw unchanged. ST6's failed check is an attempt on the same keys with the
     attempt index, as V02 states.

   **Its failure path, stated once.** An ST0-infeasible region is retried once with `clearM` halved; still infeasible, the
   chamber keeps its form with no monument and `W_RUIN_MONUMENT_SKIPPED` is reported — nothing is discarded (§5). A
   `TierFailure` `layTiers` returns truncates the monument to the tiers laid, counted in `lay.truncated`. **The ceiling
   cut:** with `top` the laid stack's highest point above the chamber's floor (V02 §3.15.2's envelope), the chamber's
   ceiling becomes `min(burialCm − 100, max(its kind's ceiling, top + monument.ceilingClearCm))`; the tiers, stairs and
   shrine whose top would rise above that ceiling less `ceilingClearCm` are removed from the top down and also counted into
   `lay.truncated`, so the top stays under the ceiling — the ground above pressed on it. `standing` is the decay's reading
   only ((6)); `lay.truncated` records the two cuts. The result is `Chamber.monument` (§2.7, item 250). Its standing tiers
   and its mound are obstacles for U-CITY (V04 §3.6). With no `monument` cell the ruin draws nothing on the `'tiers/*'`
   keys and is byte-identical (T-V4-68).
5b. **Columns, modelled (J-V4.92).** In every `hall` and `temple` chamber, in its rectangle's frame, the column grid of pitch
   `columnPitchM` centred on the rectangle, every node at least `columnPitchM ÷ 2` inside its walls and outside its
   monument's tier-0 ring grown by 100 cm; each line of nodes along `u` is one colonnade row, indexed from the front. The
   nodes of the rows (6) keeps are `Chamber.columns`, derived, never stored, exported by `@plat/under` as
   `ruinColumns(chamberId)`: V03 §3.12 (6) reads them as fixed rings, the ruin program draws them as its 60 cm dots
   (V04 §5.2), C3's walkways keep 60 cm clear of each, and glTF and VTT export them. The drawn dots are the modelled points
   (T-V4-44). A chamber too small for one node has none.
6. **Decay (the persistence order).** Each element's persistence class — `hall` for halls and temples, `cistern`, `gate`,
   `axis` for the main streets, `street` for the rest, `wall` for vaults, `room` for rooms, courts and tombs; `colonnade` for
   the columns' rows — survives when one uniform on `sewer` keyed by the element falls below
   `S(class) = min(1, survival[class]^(ageYears ÷ ageRefYears) + coverKeep × burialCm ÷ 1 000)`. A non-survivor stays as a
   record with `closure: 'collapsed'`, cause `decay` — g item 109 (c)'s "collapsed or filled", since the base has no filled
   state. Collapsed elements count in V12's plan measures and never in capacity or access. **A colonnade row** survives when
   one uniform keyed by (the chamber's key, `'colonnade'`, the row's index) falls below `S(colonnade)`; a fallen row's nodes
   leave `Chamber.columns`, and a collapsed chamber has none. **A monument decays from the top:** tier k stands while one
   uniform keyed by (the chamber's key, `'tiers/decay'`, k) falls below `S(hall) × monument.tierDecay^k`; `standing` is the
   first k that fails, and every tier from it up falls with its stair; the shrine stands only when every tier stands and its
   own uniform (index n) passes. The fallen tiers lie as a rubble mound on the first fallen tier's ring,
   `moundCm = moundShare × Σ` the fallen tiers' heights, capped at the ceiling less 50 cm. A host chamber created `collapsed`
   keeps its monument with `standing` 0: a mound in the rubble.
7. **Distinct from the town above (g item 109 (c)).** After the decay, V12's paired measures (`ruin.blockArea`, `grid.r4`,
   `grid.axis`) are computed for the ruin's plan and for the district fabric over its outline (V01's
   `fabricSignature(outline)`, V01 §3.16); where they fail V12's `paired` margins, the next culture row in the draw's order
   is tried (up to `distinct.retries`), then the axis is turned by `distinct.rotateDeg` (skipped when `sharedAxis`); if all
   fail the last attempt stands and `W_RUIN_SIMILAR` is reported (`attempts`, `similar`). With no district over the outline
   (a ruin beyond the fabric) the test passes at the first attempt.
8. **Its surface.** The marker — the port's ruin decoration, or the ruined landmark's building — stays on the ground and is
   the `ruin_entrance` candidate of U-ACCESS (e); `RuinRecord.marker` names it.
9. **`ruinCentre(doc)`** returns the record's centre (else null): the magical node sits at the ruin's heart, the position
   V08's `magical_node` site reads (g item 109 (f); DR30). **The report line.** For each `magical_node` deposit whose site
   stands at `ruinCentre()`, the tail's T6, once S13a has named the ruin, writes the generation report's line
   `ruin.node: { deposit: Id; ruin: Id /* the ruin system */; name: NameRef /* RuinRecord.name, a reference, so a renamed
   ruin reads its new name */ }` (§5.4), derived with the report and gone with the deposit or the ruin. V05's why ("the node
   beneath the old ruins", V05 §3.3, V05 §4.5) and V10's read it. V05's node term stays positionless (J-V5.41): no island rule
   reads this volume's arena, and this line is all a sky reader takes from it (J-V4.102).
10. **Identity.** A ruin element's creation key is (the ruin system, its plan coordinate), so a regeneration that keeps the
    plan keeps every key; the record is kept whole while its source stands (V04 §2.6).

A ruin exists whole whether or not anyone can reach it: its excavation reading (V04 §3.5.7 (g)) starts `unexcavated`.

**3.5.1 Catacombs — under cemeteries only, counted, ranked, never shrinking (g item 109 (k); J-V4.16, J-V4.55).** TOWN and
above. The law, the sources and the stagnation are II.7.6's; these are its steps. The values of `CatacombRule` are
V11 §3.23.8's.
1. **Candidates: burial faces only.** (a) The `churchyard` part of a church or temple plot (§4.9's churchyard row) — the
   church building is never the source; (b) every `cemetery`-class use (V11 §3.5, its `extramural` row letting it lie
   outside the walls), the dossier's `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house` and
   `Graveyard` records seated as that class; (c) each burial ground of a `Cemetery network` record, one beyond each gate on a
   through route (item 108's COUNT row, V11); (d) a monastery's `burial` yard part; (e) at CITY and METROPOLIS only, after
   every burial face, a worked-out quarry working (V04 §3.5.3) within `ossuaryReachM` of `R`: the **quarry ossuary**, which
   adopts the working by `reuse` (V04 §3.5.7 (f)). A burial face on a sky island is skipped (V05 §1.3, V05 §3.5 (3)). With no
   candidate, no complex forms and `blockedBy` is not written.
2. **Rank by the burials each face serves.** At growth stage k of K, `burialShare_k(f)` is the share of that stage's
   households whose nearest open burial face, by the street solver's `street` distance from their plot (§4.7), is `f` (ties
   by address), over the faces standing at stage k. The face's need `A(f)` is II.7.6's ossuary law (item 560) summed over
   the stages with that share, a plague epoch's burials × `plagueNeedFactor`, and at an epoch the span's calamity deaths as
   burials — `burialShare(f) × opts.deaths × ossuaryShare × m2PerBurial`, `burialShare` the epoch's ((5)) — each added to the
   need, never to the cap ((6)). Candidates rank by `A` descending, then the face's area, then address. A quarry ossuary's
   need is the burials of the faces left without a complex after the burial-face pass plus the unmet need of the stagnant
   complexes ((7)); one whose need is under `growthFloorM2` is not adopted.
3. **Count.** One at TOWN; at CITY and METROPOLIS `min(cap, 1 + ⌊churches ÷ churchesPer⌋)` (`CatacombRule.count`).
   `churches` counts the buildings of classes `cathedral`, `great_temple`, `church` and `v.parish_church` (V07 §2.4,
   V11 §2.9) on the ground and on every live sky island, each once (V05 §3.5 (3); the one exception to V04 §1.2's sky rule — a
   count, never a candidate: (1) skips every sky face), and each monastery's church; a collective dossier record counts each
   member once (item 108 (c)); V06 re-reads the count at each epoch (V06 §3.18.2 (1)). The churches set how many; only burial
   faces hold them. Candidates are tried in rank order until the count is reached, each passing II.7.6's dry-ground gate
   (not `damp` or `flood`), its age gate (`minAgeYears` by the face's growth stage, `HistoryHint` or the log) and its source
   chance: the fixed-key draw (§6.1) on `sewer` keyed by (`catacomb`, the face's lineage; a quarry ossuary by (`catacomb`,
   the working's lineage)), compared at every derivation against `CatacombRule.chance` at the rung then standing — so a face
   that failed at TOWN is compared again, with the same draw, against CITY's chance when the town becomes a city. A face that
   fails is skipped and not counted, so not every town has one. Every existing complex counts, closed ones included; a
   created complex's existence is never drawn again.
4. **Layout.** A `CatacombComplex` per formed complex. Its anchor is the face's centroid (a quarry ossuary's, the working's),
   its axis the face's OBB long axis; grid nodes at `gridM` pitch along that axis. A breadth-first growth from the anchor
   node, in order (grid distance, then (i, j)), admits node `n` when: it lies within `reachM` of the anchor (else `reach`);
   its ground point is neither `damp` nor `flood` (`wet`); it is no tombstone; it lies under no `wall_strip` band
   (`wallStrip`); it passes the shallow-element rule and lies within reach of no foundation obstacle (V04 §3.5.0: basements,
   raised-way piers, retaining-wall footings; `foundation`); it lies in no element of another complex of this part at
   another depth band (`system`: a part holds no crossing, II.7.6); and, with `A` the admitted set, the level floor holds:
   `max_{m ∈ A∪{n}} h(m) − floor(A∪{n}) ≤ depthM.max`, with `floor(X) = min_{m ∈ X}(h(m) − coverM − headroom)` (`depth`).
   Each rejection's reason is kept in `blockedBy`. An element of another system, on that system's own part — a sewer run, a
   cavern gallery, a quarry working, a vault — never refuses a node: where a gallery or chamber of the complex meets one
   at a shared depth, U-ACCESS (a)'s overlap test opens the meeting in the growth's commit, the complex's course never
   bent for it (II.7.6), and one it passes over or under at another depth stays apart (V04 §3.11 UC20). A node inside a
   ruin `tomb` chamber in plan at a shared depth reuses it:
   the tomb's area counts toward the complex and takes `reusedBy` (V04 §3.5.7 (f)). Growth stops when the galleries' floor
   area plus the chambers' reaches the target. Every grid edge between two admitted nodes is a gallery; every admitted node
   where `(i + j) mod 4 = 0` and three or more galleries meet takes an `ossuary` chamber, a square of half the pitch. One
   complex, one floor (`floorCm`). Complexes are laid in rank order; a node within one pitch of an earlier complex joins it
   (its floor) when that floor is admissible there, else is not admitted — two complexes meet or keep apart, never cross
   (II.7.6). An anchor node that is itself refused leaves the complex at its entrance's chamber only, stagnant from its
   first derivation.
5. **The largest under the largest cemetery (J-V4.95).** Every complex but the **primary** is capped at `rankCap` × the
   primary's extent. The primary is a reading, never stored: the complex whose source serves the most burials — the greatest
   need `A` of (2) (a quarry ossuary's its need), ties by rank, so rank 1 at generation — at every derivation; at an epoch,
   V06's derived primary, the same reading held by its hysteresis (V06 §3.18.2 (3a)), passed in `opts.primary`. The cap only
   blocks growth (`blockedBy: 'rank'`) and never removes anything, so the largest catacomb lies under the cemetery serving
   the most burials — in a big city usually the main cemetery outside the walls, which overtakes an older churchyard's
   complex over epochs (g item 109 (k) (3)). **The signature:** `CatacombGrowth.grow(doc, epoch, opts?: { capM2: Record<Id,
   number>; primary: Id; deaths?: number })` — with `opts` (V06's `under.extend`), `capM2[id]` bounds each complex's growth
   at this call (V06's per-epoch cap, V06 §3.18.2 (3)), `primary` names the primary and `deaths` carries the span's calamity
   deaths (V06's sum of `CalamityRef.deaths` over the epoch's events, V06 §2.4, V06 §3.18.2 (3); V08 §3.6; item 573; absent 0),
   which (2) adds to the need and never to the cap; without `opts`, the cap is (6)'s — none at generation and at a
   re-derivation (each complex to its need), the per-epoch cap with `years` the stage's span at a growth stage of the
   grow-by-stage path —, the primary is the reading above and no deaths are added.
6. **The ratchet (g item 109 (k) (4)).** Generation lays each complex to its need (the generation stands for the
   settlement's whole past; the per-epoch cap is an epoch rule) and sets `extentFloorM2`. Every later derivation — a growth
   stage (`extend`), an epoch, a dossier event, a replay, a Re-derive from any stage, a New random, a migration — only adds:
   every existing element is kept, closed ones included; the target is `max(the current extent, the recomputed need)`; at an
   epoch the growth is at most `max(the current extent × ((1 + growthCapShare)^years − 1), growthFloorM2)`, `years` the
   epoch's span and `growthCapShare` V11 §3.23.8's share per year (J-VI.6) — or V06's `opts.capM2[id]` where it passes one,
   (5); growth continues from the existing frontier in (grid distance, (i, j)) order; `extentFloorM2` becomes the greater of
   itself and the laid extent. A kept element that a later town puts under a basement ring is converted `collapsed`, cause
   `foundation`, and stays in the extent. A New random on the catacomb system re-derives its lights and labels only; its dry
   run says "catacombs keep their extent". **Below TOWN.** At a village rung an existing complex (V04 §3.1's maintenance
   mode) never grows: `blockedBy` gains `'rung'`, it is stagnant, and its `fill` rises by (7) with the burials of its
   standing faces; its extent never falls below `extentFloorM2`; a rise back to TOWN lifts the block at the next derivation.
7. **Stagnation, a reading (g item 109 (k) (5)).** A complex is stagnant when its need exceeds its laid capacity and its
   frontier has no admissible node (or the rank cap blocks it). Its `fill` is then raised to
   `max(fill, clamp((need − laid) ÷ its ossuary chambers' area, 0, 1))` — ossuaries only fill; the bones never leave — and
   §8.2's ossuary program draws it as denser niches (V04 §5.2); a complex with no ossuary chamber reads `fill` 1 while
   stagnant. When a block lifts (V01's `blockLifted` notice, a plot above demolished, the source reopened) growth resumes at
   the next derivation by least disruption.
8. **A closed face (stated here once, V06 citing it).** A face is **closed** when its cemetery use is closed or ruined; when
   its face is retyped to another land use; when the dossier removes its record; for a churchyard, when its churchyard part
   is removed or its plot holds no live church-family use (the church's use closed, or moved off the plot); for a quarry
   ossuary, when no face feeding it is open. Its complex is then frozen — no growth and no change of `fill`
   (`blockedBy: 'sourceClosed'`) — and stays, every element kept. A church-family use arriving on a closed churchyard's plot
   **reopens the same face**, its lineage kept, and the complex resumes at the next derivation from its frontier by least
   disruption. A new cemetery may begin a new complex only where the count allows.
9. **The entrance (item 560).** A `stair` `AccessPoint`, source `system`, cause `{ rule: 'system', system }`,
   `knownTo: 'local'`, at the grid node nearest the face's centroid, its ground host the face; its head inside the burial
   ground's chapel where one stands on the face and its class's crypt column is `never` (V11's `cemetery` chapel slot), in a
   cellar, the nave or a store by V03's `AccessHostRow` (catacomb, any cause but `crypt`) — never a crypt — else in the open
   face, drawn with the stair symbol. **A church-class building** (its class's crypt column `always` or `basement`,
   V03 §3.7.4) never hosts a catacomb access of source `system` (V03 §3.7.2 (6)): a churchyard's catacomb is entered from the
   churchyard, and through its church only by the crypt join (V04 §3.5.7 (c)); a quarry ossuary by its working's shaft and a
   stair at the working's surface head.
10. **Dossier forcing.** A catacomb record forces one complex, within the count, on the first burial face in rank order that
    passes the dry-ground gate: its chance 1, its age gate waived and reported. Where the roster holds no burial face at
    all, item 386's row seats the record's surface as a `cemetery` use at S10b (extramural soft, V11 §3.5) before the tail,
    so the tail never writes the ground. Below TOWN the TOWN gate stands: the record becomes one `ossuary` chamber of the
    `dug` system under its burial face — a charnel vault, its area the need capped at `charnelMaxM2`, reached by a `stair`
    from the face or its chapel — reported `W_CATACOMB_BELOW_TOWN`; never a church crypt and never a gallery system. A
    catacomb record whose every burial face is wet forces nothing and is reported `W_SUBTERRANEAN_WET`.
11. **Crypts are the church's.** V04 lays nothing with a church as its source; F4 and C4 never seat a crypt as an
    underground plot; a crypt record binds to its church building, which V03 §3.7.4 makes `always` (V04 §2.3a). The
    cathedral always has a crypt, the largest in the settlement — V03's bar, cited here.

**3.5.2 Caverns (J-V4.17; g item 109 (a), (j) (1)).** At every rung; the extent is the site's. *Existence:* the geology
flag (S1, with g item 109 (a) (1)'s relief rows) and its row chance, × `mineBoost` (capped at `mineCap`) where the site
**holds mining** — `Terrain.mining`, by §4.2 S1 (10)'s test (V04 §1b.5); one uniform on `sewer`
keyed by (`cavern`, the town root) (the chances II.7.6's). **The fissure variant:** where the flag is `ordinary` and the
relief class is `hilly` or `mountainous`, a `cavern` system of `variant: 'fissure'` (item 248) exists with
`fissureChance`, × the same boost, capped. *Soluble rock:* the D8 paths over the frame's `rock`, `high` and `mid` cells
whose catchment reaches `caveCatchHa`, in descending accumulation, until the extent cap `maxRockShare` of the frame's rock
area or the length cap `caveKmPerKm2` × the frame's area in km² is reached; each path's gallery follows it with a lateral
meander of amplitude `meanderM` and wavelength `meanderWaveM` (value noise on `sewer` keyed by the path's start cell); its
floor is `max(WT(v) − 50, h(v) − depthM.max)`, capped at `h(v) − coverM − headroom`, and it carries `water` where the floor
lies at or below the water table WT (§2.6's definition). A confluence under local relief (the height range within
`reliefWindowM`) of at least `hallReliefM` takes a `hall`: an ellipse of area
`min(hallMaxM2, hallBaseM2 + hallPerReliefM2 × relief)` m², axis ratio `hallAxisRatio` along the downstream path, eight
vertices each moved radially by ± `hallJitter` (a draw per vertex); **its floor lies `hallDryCm` above the local water
table**, joined to each gallery by a `stair` step (a gallery segment graded at `digMaxGrade`), the cave stream crossing
the hall as a `water` channel along the downstream path. *Volcanic rock:* `1 + ⌊tubeMax × u⌋` tubes (one uniform, capped at
`tubeMax`), started from the highest rock cells at least `tubeSpacingM` apart, following steepest descent for up to
`tubeMaxM` or the cap, floor at `h − tubeDepthCm`, a `breakdown` chamber every `tubeChamberM`. *Fissures:*
`1 + ⌊fissureMax × u⌋` fissures (capped at `fissureMax`), each started from a rock cell of the frame's top decile of slope
(the steepest first, at least `tubeSpacingM` apart), following the steepest line along the fall of the slope for up to
`fissureMaxM`; galleries of width drawn in `fissureWidthCm` and headroom in `fissureHeadroomCm` (a draw per gallery), each
floor at `h − coverM − headroom` capped by `depthM`; one or two `breakdown` chambers of at most `fissureChamberM2`; never a
`hall`. A frame with no rock cell, or no path reaching `caveCatchHa`, lays no gallery and the system is not created (F-VOID,
reported). *Openings are candidates, not certainties* (g item 109 (j) (3) (ii)): where a gallery's crown cover falls below
`mouthCoverCm` the gallery is a `mouth` candidate there; a breakdown chamber within `skylightDepthM` of the surface a
`skylight` candidate; a soluble chamber whose cover is under `sinkholeCoverM`, under ground that is no footprint, a
`sinkhole` candidate — each drawn by U-ACCESS (e); a failed mouth candidate ends its gallery sealed by talus. Every cavern
and fissure element within reach of a foundation obstacle takes V04 §3.5.0's foundation rule.

**3.5.3 Quarries, mine voids and chain mines (J-V4.18).** *Volume* (II.7.6, J-A65.45): `V = wasteFactor ×
(Σ_stone buildings perimeter × (eaveCm − baseCm) × 60 cm + Σ enceintes length × thicknessCm × heightCm + Σ towers 0.4 π r² h)`.
*Cells:* the frame's cells with `SiteResources.stone ≥ 0.5` within `reachM`, ordered by (inside `R` first, stone value
descending, distance to the centre, cell index), taken until their volume reaches `V`. **The surface quarry** is §4.9's
`quarry` land use without a `source`; a landfall's rubble working — a `quarry` with a `source` (V05 §3.16 (4), item 252)
— is never the surface quarry, a stone working or a volume source (the sky layer is never read, V04 §1.2). **The surface
split** (II.7.6's "left to the hinterland's surface quarry"): a taken cell whose terrain class is `high` — the outcrop at
the surface, its cover under `minCoverM` — contributes its volume to §4.9's surface quarry and is laid nowhere underground;
the other taken cells, at `headroom × (1 − pillarShare)` per unit area, are grouped into **workings** (4-connected
components, a component over `workingMaxHa` split along its OBB's short axis). **A working's floor** is
`min_cells(h) − max(minCoverM + headroom, depthM.min)` in centimetres, a cell whose floor would lie deeper than
`depthM.max` dropped. *Layout:* each working is one `workings` chamber, its outline the working's cell union simplified at
`minEdge`; the room-and-pillar field inside it is **drawn, not modelled** — §8.2's `quarry` program lays square pillars of
side `√pillarShare × roomM` at pitch `roomM` along the chamber's OBB axis (J-V4.18); a `shaft` (public, source `system`)
opens on the nearest ground point within 30 m of the working's centre that is no footprint (none within 30 m: the shaft
sits at the nearest such point beyond, its surface head on public ground, reported), its `access_point` vertex on the
chamber's wall nearest below it; the workings are joined by `haulage` galleries along a minimum spanning tree over their
centroids (Euclidean, Prim's, ties by index), the nearest working to the town joined to its outcrop by an `adit` gallery
ending in a `mouth` where the stone cell lies outside `R`. With no stone cell within `reachM` the whole volume goes to the
surface quarry and no system is created. *Mine voids:* the same on `SiteResources.ore ≥ 0.5` cells, volume `oreM3PerMine`
per mining class instance, in the same `quarry` part. *Chain mines (item 104 (h) (1), item 105):* each ACTIVE supply chain
whose resource node is of kind `subterranean` reuses the nearest mine or quarry working within `reachM`, or makes one — a
working at the hinterland edge on the nearest `SiteResources.ore` or `stone` cell — of volume `oreM3PerMine` × the chain's
volume factor (`chainVolume`), its surface head the map feature item 104 (h) (1) places; the working is the chain's resource
node for the supply web (item 105). The undercity settles a workings chamber as any chamber (V04 §3.6): S10 cuts its floor,
the drawn pillars yielding to its plots.

*Worked out (J-V4.98).* `workedOut(working, scope?)` is a reading, derived at every derivation and never stored: a mine
working is worked out while its mining use is closed or gone; a chain mine while its chain is not ACTIVE; a stone working —
which serves the town's building stone and has no use — is worked out unless it is in the running epoch's
`scope.elements` (laid or extended by this epoch), so at generation, which stands for the town's past, every stone working
is worked out. Readers: the quarry-ossuary candidates (V04 §3.5.1 (1) (e)), V06's candidate list (V06 §3.18.2 (1)), V10.

*New workings at an epoch.* `QuarryWorkings.extend(doc, scope, epoch)` (TOWN and above; V06's `under.extend`, after the
catacombs' growth) lays, one commit per kind: (1) **stone** — the stone the epoch built, `ΔV = wasteFactor ×` (the volume
law's terms over the stone buildings of `scope.built` and the enceinte stretches and towers the epoch's fortification step
built), taken as new cells in the volume law's order, skipping every cell under an existing working or the surface quarry's
face, with the surface split, grouped into new workings; (2) **mines** — one working of `oreM3PerMine` per mining-class use
whose `opened` epoch is this one, on the ore cells in the same order; (3) **chain mines** — each ACTIVE chain with a
subterranean resource node and no working, as above. Every existing working is kept and never re-derived. Each new working
takes its `workings` chamber, its `shaft` and one `haulage` gallery to the nearest existing working of its kind by centroid
(ties by index; none for the first), its ordinal the system's next unused (so an epoch renumbers nothing, V04 §2.5), and
joins `EpochScope.elements`; its commit runs U-ACCESS (a)'s overlap test and, for a mine working, the mine breach. Where the
cells within `reachM` run out before `ΔV` is met, the rest comes from the surface quarry, the unmet m³ reported. An epoch
that built no stone and opened no mine lays nothing. No draw is made (V04 §3.12).

**3.5.4 Vaults (J-V4.19; g item 110 (b)).**
* **(a) Bridge vaults:** each deck end of a built bridge — a part-0 `Bridge` deck over water (§2.7), never a raised deck —
  whose `deckCm` stands more than `bridgeRiseCm` over the bank's ground takes one `bridgeVault` chamber under its approach
  way: the way's corridor over `approachM` from the deck end, inset 50 cm, floor `vaultBelowCm` below the street, ceiling
  300.
* **(b) Street vaults:** every part-0 way stretch of at least 12 m in `R` whose along-way grade exceeds `vaultSlope` takes a
  `streetVault` under its corridor, inset 50 cm, floor `vaultBelowCm` below the stretch's lowest street point. The grade is
  measured over the way's ramped profile with its stair intervals left out, so a stair where a way crosses a
  `RetainingWall` is no vault source; a raised ramp is never a street-vault stretch.
* **(c) Cisterns:** each precinct of growth stage 1 and the castle where `min(dist.water, the plan distance to the nearest
  aqueduct delivery point)` exceeds `cisternDistM` takes a `cistern` under its open court (a yard part of its plot; the
  castle's inner ward or bailey face), a rounded square of the row's area, floor `cisternBelowCm` below, with a `well`
  access in the court above; a cistern record forces one under its precinct (V04 §2.3a). `aqueductDelivery(doc)` is each
  aqueduct's terminal point and every public fountain the base records it feeds (item 244). This reads only the base's
  eager aqueduct records, and the base's aqueduct need test reads none of V04's placed cisterns (item 244), so the two
  never form a cycle (J-V4.83).
* II.7.3's surface list binds every vault of (a)–(c) and (e), the cistern's own host admitted (a castle's reservation
  excludes sewer dwellings, not its own cistern; item 559). Each street or bridge vault takes a `stair` from the corridor at
  its downhill end, source `system`, `knownTo: 'public'`.
* **(d) Arch vaults — the fourth source** (g item 110 (b): "the spaces between piers stay open or hold the base's vaults";
  J-V4.79 – J-V4.81). The base fixes each span's `use` eagerly by §2.7's span rule (item 244) — a span whose under-deck strip
  lies wholly on hinterland land-use faces stays `open`, reason `country`, at every rung (J-C4) — and V04 reads it and never
  decides it; the span's `reason` is the span rule's vocabulary, distinct from the raised way's own recorded reason (V06's
  `RaisedReasonKey`, J-VI.2). `ArchVaults.reconcile(doc, raised, cause)` visits each raised way of `raised` (every one at
  T2) in address order:
  1. **Lay.** Each span of use `vault` has one chamber — kind `archVault`, key (`arch`, the way's lineage, `a`, `b`), `span`
     its `SpanKey` — found by its key or created: its footprint the span's under-deck rectangle between the two raised-way
     piers' inner faces (the deck's plan outline on ground part 0), inset `archInsetPierCm` at the raised-way piers and
     `archInsetOpenCm` at the two open faces; its floor (`elevationCm`) `levelledGroundCm` at the span's axis midpoint
     (item 309), levelled and cut into the uphill side; its ceiling the span's soffit (item 244) less that floor — the
     ceiling V02's `vaultClamp` reads for a building standing in it. One `door` `AccessPoint` (source `system`,
     `knownTo: 'public'`, cause `{ rule: 'system', system: the vaults system }`, `ground.host` the part-0 face at its
     point) stands at the midpoint of the open face whose `archDoorStripM` strip beyond holds the most part-0 way or open
     ground (no footprint, no water), ties by the lower side index; where neither face opens onto either, no door is made
     and `W_ARCH_VAULT_NO_DOOR` is reported (a walled-up arch). An inset rectangle below `minEdge` on a side is no chamber:
     the span stays unvaulted in the model and is reported.
  2. **Condition.** Its closure follows its span, re-read at every reconcile: `collapsed` where the span's `state` is
     `ruined` or `cleared`, where its V06 condition reads breached or dismantled (item 291), or where a bounding support's
     `state` is `ruined` or `cleared` (item 244) — a landfall's ruin included (V05 §3.16 (4)); else none. U-FADE never
     strikes it.
  3. **Remove.** Every arch vault of the way whose span no longer exists or whose use is `open`, and every arch vault of a
     way no longer in the model, is deleted with its door, its links and its accesses in the same commit, each a fate in the
     dry run.

  The chambers sit in the `vaults` system's part (created at the first, §2.9), one L1 batch and one L2 `corridorUnion` per
  reconcile. **They are not undercity voids:** P5, C1, the forced vaults, U-FRONT, F6 and U-FADE's candidates exclude them;
  L3's basement accesses and U-DIG's connector never target one (a cellar reaches it by the street); U-ACCESS (b)'s
  proximity links reach it as any vaults element. §8.2's chamber row reads it as storage (the vault hatch, V04 §5.2). An
  institution stands in one only by declaration: a declared placement naming the chamber (T6 `place` inside its footprint,
  a skeleton `placeAt`) seats the use on one plot equal to the chamber's floor and one single-storey building under its
  ceiling, its entrance at the door, `faces` by the ground the door opens onto (§2.6's rule) — never `tunnel`; V03 plans it
  as any building.
* **(e) The terminal cistern.** An aqueduct whose terminal kind is `cistern` (item 244; only under a `conduit_house` the
  roster or the dossier holds, otherwise `fountain` or `basin`, J-VI.9) takes one `cistern` chamber, key (`terminal`, the
  aqueduct's lineage): under the yard part of its terminal building's plot (V11's `conduit_house`, V02 §3.17 (b)) where one
  stands, else under the public ground (V04 §1.2) nearest the terminal point; a rounded square of `terminalCisternM2`, floor
  `cisternBelowCm` below, with a `well` access in the yard or on the public ground above (source `system`, cause
  `{ rule: 'system', system }`). The terminal building's plot's drain need is at least `channel` (N8), so the overflow
  leaves by the sewer where one runs. Where neither a yard nor public ground takes the rounded square, it shrinks in 10 %
  steps down to the precinct cistern's 150 m², else it is skipped and `W_TERMINAL_CISTERN_SKIPPED` is reported. The
  aqueduct's buried stretches (where the terrain stands above its gradient line) stay the base's line on ground part 0,
  never an underground system; they are foundation obstacles (V04 §3.5.0).
* **(f) Grade faces.** `gradeFaces(chamberId)` is a derived reading, never stored, read by V03 §3.12 (9): for an `archVault` chamber its two open faces — the sides of its inset rectangle that face out of the span, not
  the raised-way piers — and for a `streetVault` or `bridgeVault` the side at its downhill stair's end; for every other
  chamber none. Each face is `{ side: 0|1|2|3 /* the rectangle's side index */; at: ChainRef /* the chamber_wall segment */;
  opensOnto: Id /* the part-0 face beyond it */ }`, in side order. It is recomputed with its chamber (its lifecycle row
  V04 §2.6's `Chamber.columns`, `gradeFaces` row); a building seated in the chamber takes its frontage entrance on a grade
  face with `faces` `street`, `lane`, `alley` or `yard` by the ground the face opens onto, never `tunnel`, and V03 §3.12 (9)
  puts its windows and face flue there. Tested by T-V4-78 (c).

**3.5.5 The buried town and the buried former settlement.**

**(a) A buried old town (J-V4.20).** II.7.6's rule, with its region the growth-stage-1 districts; its galleries those
districts' way centrelines (the old streets under the new, the regrowth-first town having kept their lines), its `storey`
chambers their buildings' footprints, and each square of the region (an L1 `square` face or a `square` block, V04 §1.2) a
`square` chamber: the old market under the new (item 559). Floors at `scarBaseCm + scarGainCm × severity` below the
present grade; headrooms and ceilings by the table above; a building's entrance vertices are kept on its storey chamber's
wall as `portal` rows for the exports. The same builder serves `raiseGrade` at an epoch or by hand (II.7.6), over the
raised region's records. T2's scar step runs only in a document with no history replay (`HistoryRecord` absent or holding no
epoch): under the replay the same fire or flood is played at its epoch as a `raiseGrade` (§4.11 *History-first generation*
(2)), so one scar never buries twice. **Terraces under a raised grade (J-V4.112).** The floors follow the old grade point by
point: `levelledGroundCm` (item 309) read on the region's last live state, before the `raiseGrade` batch applies the raise,
less the depth the rule gives. A `RetainingWall` that the same batch tombstones inside the region (cause
`convert:raiseGrade`, V06 §3.19.4 (1)) is therefore a step in the buried floor: the galleries and the `storey` and `square`
chambers on its high side keep the high side's datum — the step being the wall's `stepProfile` (V01's BCR-V1-43) on that
last live state at their nearest station — and a gallery crossing the wall's line takes two knots at the wall's faces, as
N6 places them for a run, the segment between them a **stair step** (one gallery and one record still, drawn as a stair,
V04 §5.2). A `square` chamber the line crosses is split along it, each side at its own datum (a footprint never crosses a
retaining wall). So the buried town keeps its terraces and its old stairs; with no wall inside the region nothing changes.
A buried town is reachable by construction — the raised town's cellars open into its old storeys — so every cluster
holding an element of a raised grade or a scar reads `accessible` (J-V4.62).

**(b) The buried former settlement (g item 113 (c); §4.11 *History-first generation* (5); II.7.6; DR39; J-V4.122).** The
settlement's own past, buried: distinct from a ruin (V04 §3.5.0a), whose plan is an older civilisation's.
1. **The call.** V06's history replay calls `BuriedFormer.lay(doc, epoch, former: Id[])` inside the batch of the coarse
   epoch at which a former fabric's years since it was ruined first pass its factored burial age `T` (V11 §3.25.2,
   registry row 93: `burialYears` and the flood, silt, rebuilt and bare-rock factors, read through DR39 — shortened by
   floods, river silt and rebuilding on top, lengthened on bare rock); `former` lists the surface records the epoch buries
   of the former fabric V06 §3.20.5 (4) defines — its ruined buildings, its ways retired or effaced to traces, and its
   enceinte runs in the condition V06 §3.20.5 lists, with the towers and gates drawn on them; the replay clears them on the
   ground in the same batch (their existence `cleared`, §2.8), as `raiseGrade` clears its region; `lay` reads each on its
   last live state. A former settlement that
   stood below TOWN at its peak is not laid (`lay` returns null). The replay writes the returned system into
   `HistoryRecord.buried` (§2.7).
2. **Its depth.** The fabric lies at its old ground level: `depthCm(r) = min(formerRiseMaxCm, formerRiseCmPerCentury ×
   years(r) ÷ 100 × f)` below `levelledGroundCm` at each vertex, `years(r)` the years from the fabric's ruin to the present
   (the replay record's epochs), `f` the burial-speed factor `burialYears ÷ T` (V11 §3.25.2: the default age over the
   fabric's factored burial age), so floods, silt and rebuilding deepen it and bare rock keeps it shallow. It is fixed when
   laid: later epochs never re-lay it.
3. **Its elements**, fresh records of the settlement's one `buried` system (created at the first, §2.9), keyed (`former`,
   the burial epoch, the former record's lineage) (V04 §2.5), in one L1 batch and one L2 `corridorUnion` batch on its part:
   * each former way stretch of at least `formerMinGalleryM` → a gallery along its last live centreline, its width the old
     way's, `wallCm` 30, its floor at the old ground, headroom `depthCm − 50`;
   * each former building whose footprint reaches `formerStoreyMinM2` → a `storey` chamber on the footprint, ceiling
     min(its storey height, `depthCm − 50`), its entrance vertices kept on the chamber's wall as `portal` rows (as (a)'s); a
     smaller building's remains are the fill, laid nowhere;
   * each former enceinte run → a **wall band**: a gallery along the run's chain, `widthCm` the wall's thickness (at
     least `formerWallCm`), created `collapsed`, cause `decay` — solid masonry, drawn by the `ruinMasonry` program, never
     counted in capacity or access; a tower drawn on it lays no element of its own (a tower carries no state, §2.7, item
     575), its remains the band's masonry and the fill; each gate drawn on it → a `gate` chamber of `formerGateM2` across
     the band, open, through which the street galleries pass.

   An element whose headroom or ceiling falls below `formerMinHeadroomCm` is created `collapsed`, cause `decay` (filled
   with the deposits over it): a young burial is mostly filled, an old one walkable. The shallow-element rule takes the
   ruin's direction (V04 §3.5.0): an element under a present footprint or within reach of a basement ring or a foundation
   obstacle is created `collapsed`, cause `foundation`; one below the water table `flooded`. The elements follow U-FADE's
   dry-gallery and chamber rows thereafter and are never torn down (item 11).
4. **Access and reading.** For U-ACCESS a `former` element is a ruin element: (a)'s overlap and (b)'s proximity links, (d)'s
   dig from above, (e)'s `collapsed_shaft` candidate (a former chamber under a square or a field face with cover ≤ 15 m)
   and (f)'s well pin read it as they read a ruin's (V04 §3.5.7). Its clusters take the excavation reading — starting
   `unexcavated` — unless joined to an element of (a), and `ExcavationRecord` covers them (V04 §2.2). The undercity may
   settle it as any `buried` source (V04 §3.6 C1).
5. **Edges.** A `former` list with no element passing (3)'s filters lays nothing and reports `W_BURIED_FORMER_SKIPPED`
   (returning null); two burial epochs extend the one system (fresh keys carry each epoch); a former record the replay no
   longer holds at a re-run of the same seed and history is never passed, so the same elements come back byte for byte
   (T-V4-77); with the replay off `lay` is never called and the output is byte-identical (T-V4-77 (d)). No draw is made.

**3.5.6 Forced vaults — a required undercity always has a void (II.7.5; J-V4.61).** Where
`CircumstanceSlice.undercity = 'require'` and U-FORECAST's P6 finds no counted void with capacity for one neighbourhood,
U-SYS lays a `vaults` complex under the **oldest district** (the lowest `growthStage`, then the largest area, ties by
address), after the ordinary vaults: a grid of `streetVault` chambers of `forcedGridM` pitch under that district's public
ground (V04 §1.2; ground part 0, by `pointLocate`), never within reach of a foundation obstacle (V04 §3.5.0) and never
counting or joining an arch vault, at the vault row's floor `vaultBelowCm`, joined by vault galleries along the grid, grown
breadth-first from the district's largest square of either kind (V04 §1.2; else its centroid's nearest corridor) until the
floor area reaches `max(minHouseholds, H) × m2PerHousehold`, plus one `market` chamber of `mainChamberM2` at the grid's
start. The shallow-element rule binds it; where the ground cannot take it, the complex steps its floor below
`surfaceClearCm` (the surface rule then releases it, J-V4.21) and grows again. So C1's "none formed" cannot occur under
`require` (T-V4-37). Under `forbid`, S7b (7) makes no allocation and U-CITY does not run.

**3.5.7 U-ACCESS — the access pass (T2b; g item 109 (j) (3), (3b), (k) (2), (a) (3), (d); g item 113 (e)).** After U-SYS and
before U-FRONT, in this order; every link and access it makes records its `cause` (items 249, 557).
* **(a) Overlap and mine breaches.** *Overlap:* for every pair of elements of different parts whose plan bands intersect
  (each part's static index) and whose vertical intervals — floor to floor plus headroom or ceiling — also intersect, one
  link at the intersection's centroid, `via: 'breach'`, cause `overlap`, naming the growing system and event. Where one end
  is a sealed cavern or ruin element its kind is `open` (the owner's rule); for any other pair the kind comes from
  `LinkRule.kinds`, a builders' grille reading `gated`. Neither element moves: the sewer's course and hydraulics are never
  bent. Where the plan bands intersect and the vertical gap is above 0 and at most `links.overlapShaftM`, a `shaft` link at
  `links.overlapShaftChance`: the fixed-key draw (§6.1) keyed by the pair. *Mine breach:* a mine working whose wall lies
  within `breachM` in 3-D of a cavern gallery joins it by a `heading` gallery in the quarry part along the straight 3-D
  segment (floor graded at most `digMaxGrade`, a `stair` link where steeper), with a `breach` link of kind `open`, cause
  `mineBreach`, at the cavern end; the working's shaft is then the cave's access by transitivity. *The village working
  (V07 §3.16 (4); J-V4.113):* at a village rung, where no `quarry` system exists, each mining use's outside-plot working —
  at T2b every one, with a scope those in `scope.workings` — is tested against the `cavern` and `ruin` elements whose plan
  band lies within `breachM` of the working's plot ring and whose top lies at most the working's `mine.workingDepthM` row
  (V07) below `levelledGroundCm` at the plot's centroid; the nearest such element of each void system (plan distance, ties
  by address) takes an `AccessPoint` at the working — kind `shaft`, role `access`, source `dig`, `knownTo: 'local'`, state
  `open`, its `ground.host` the working's plot face and its `ground.at` the plot's pole of inaccessibility, its
  `access_point` vertex on the element's kerb or wall nearest below it — cause `{ rule: 'mineBreach', system: <the void's
  system>, event }` (0 at generation, the epoch's `seq` with a scope), and no link record, the working being no system. It
  is keyed, and so idempotent, by (the working's lineage, the element's lineage), and draws nothing; at V07's hand-off up the
  working becomes a quarry source by V04 §3.5.3 and the access is kept. **The same overlap test runs wherever a system
  grows** (g item 109 (j) (3b)): `SewerStrategy.extend`, a catacomb's growth, a new quarry, mine or chain working, U-DIG's
  passages, a lifeline, and an edit that draws or deepens an element — each in its own commit, recording its cause.
* **(b) Proximity links (II.7.6 (2)–(4)).** For each pair of parts (a < b) and each element `e` of part a — tunnels,
  galleries, chambers, open or closed — samples every 5 m of its centreline or outline query part b's static index for
  elements within `linkReachM` in plan whose floor lies within `linkDepthM`; per element pair the stations are taken
  greedily along `e`, each at least `linkSpacingM` beyond the last and beyond any link (a) made; at each, one uniform on
  `sewer` keyed by (the two elements' lineages, the station ordinal) against the pair of kinds' chance (II.7.6); its kind by
  the weights, `flooded` only where both floors lie below the water table; its `via` by the floor difference — ≤ 100 cm
  `breach` (`door` where an end is an underground building's wall), ≤ 300 cm `stair`, else `shaft`; `knownTo` by II.7.6 (4);
  cause `proximity`. Its two `link_end` vertices land on each element's kerb or wall at the nearest points, one transaction
  per part (§3.4). An element shorter than one 5 m sample takes one sample at its midpoint.
* **(c) Crypt joins (g item 109 (k) (2)).** A church-class building on ground part 0 (never a sky-layer building, V04 §1.2;
  its class's crypt column `always` or `basement`) with `Basement.crypt` (item 238: derived with the basement at S11, so it
  exists at generation without any plan elaborated) whose crypt ring lies over a catacomb element in plan, or within
  `accessReachM` (II.7.6) of one, draws once per (church, complex) pair: the fixed-key draw (§6.1) keyed by the pair (the
  one mixer over the church's and the complex source's lineages, as (b)'s pairs are), so a join first reached by an epoch's
  growth gives the answer a regeneration gives; its chance `cryptJoin.own` when the complex's source is the church's own
  churchyard, else `cryptJoin.other` (V11 §3.23.8). A success makes an `AccessPoint` from the crypt, source `crypt`, cause
  `{ rule: 'crypt', system }`: kind `door` where the element's floor lies within `stairDropCm` of the crypt floor, else
  `cellar_stair`; its head stays in the crypt (V03's `AccessHostRow`: catacomb with cause `crypt` → crypt). The join
  replaces item 64's draw for that pair. A building without `Basement.crypt` draws nothing. A church-class building's only
  way to a catacomb is this join: L3 gives it no basement access to a catacomb element, and no catacomb access of source
  `system` is headed in it (V04 §3.5.1 (9); V03 §3.7.2 (6)). Catacomb galleries under a church keep `foundationClearM`
  below its basement floor; a crypt is joined only by this access, never cut. The join set is a function of the basements
  and the complexes alone, never of an elaborated plan (T-V4-50).
* **(d) Dig from above (g item 109 (j) (3) (i), (j) (5)).** Every ground building (on ground part 0; a raised-way pier is no
  building and never a dig host) whose footprint overlaps in plan a cavern, ruin or former-settlement element whose top lies
  below the building's **dig floor** — its basement floor (II.7.6's basement floor, §2.6) where it has a basement, else its
  `baseCm` — or whose basement ring lies within `DigRule.planReachM` in plan of one, draws once per void kind: the
  fixed-key draw (§6.1) keyed by (the building's lineage, `dig`, the void kind), in this stage, its key carrying the wing
  key of a wing V02's mutator adds (V02 §3.9 W6) — the building's lineage already carries the epoch that built it (§6.3).
  `p = min(cap, classRow(class) × basementFactor × depthFactor(d))`, `classRow` by the building's class (V11 fills every
  class by its family), `basementFactor` with a basement and 1 without, `depthFactor(d)` 1 for `d ≤ reachM`,
  `exp(−(d − reachM) ÷ decayM)` beyond and 0 beyond `maxM`, `d` the vertical distance from the dig floor to the element's
  top (the values V11 §3.23.7's). The footprint and basement floor are V02's (V02 §3.14.5 (f)). A success makes an
  `AccessPoint` to the shallowest such element under the footprint, source `dig`, cause `{ rule: 'dig', system, event }`: a
  `cellar_stair` where the building has a basement and the drop lies within `stairDropCm`, else a `shaft`, and a `well`
  where the plot's well pin stands over the element; its head in the basement (V03's access head). The draw is compared at
  every derivation: an access once made persists (removed only by V04 §3.10's host closures), and one not yet made appears
  when the building's chance later rises above its draw (a basement added, a deeper void reached) — so more buildings,
  deeper cellars and more digging raise the chance of access as the settlement grows, and a building draws once per
  void kind, plus once for each wing V02's mutator adds over a void (a `MutationPlan` step or a rung-3 op), its key
  carrying that wing's key, never twice for one key (V06 §3.18.1 (2a); T-V6-34). Item 109 (d)'s "chance raised over a
  ruin" is this row.
* **(e) Public openings (g item 109 (j) (3) (ii)).** Each candidate V04 §3.5.2, V04 §3.5.0a and V04 §3.5.5 (b) name, in this order —
  a `sinkhole`, a `mouth`, a `skylight`, a `collapsed_shaft` over a quarry, mine, ruin or former-settlement chamber under a
  square, a square or green block (V04 §1.2) or a field face with cover ≤ 15 m, a `ruin_entrance` at the ruin's marker —
  draws its `UnderOpeningRow.chance` (V11 §3.23.7): the fixed-key draw (§6.1) keyed by (the candidate element's lineage, the
  opening kind). A success makes an `AccessPoint` of that kind (item 554), source `opening`, role `access` (a `skylight` is a
  `mouth` of role `light`), cause `{ rule: 'opening', system }`, `knownTo: 'public'` (a `ruin_entrance` `local` unless the
  dossier says the ruin is known).
* **(f) Reuse (g item 109 (d)).** An element of one part adopted by another system keeps its place, part and kind and takes
  `reusedBy: { system, since }` (item 249), with one link of cause `reuse`, `via: 'breach'`, at the adopting system's
  nearest element; the adopting system counts its area in its extent and draws it with its own program as an overlay, so
  nothing is laid twice. The sewer adopts an ancient drain after the fact: a ruin main street carrying its drain takes
  `reusedBy` the sewer where a laid run's centreline lies within `links.reuseM` of it for at least `links.reuseMinM`, its
  floor falls in the run's flow direction at ≥ `minGradient`, and its crown depth is at most `coverMaxCm` — the run keeps its
  own record and course, so the rule never works against hydraulics. A catacomb's tomb reuse and the quarry ossuary's
  adoption are made by U-SYS and recorded the same way. A well pin whose shaft — to the water table plus 100 cm — passes
  through a ruin, cavern or former-settlement chamber is always an access: kind `well`, source `dig`, cause `dig` — at every
  rung, V07's village `well` and `pump` pins being this same pin record (V07 §3.16 (3) (ii)). A buried chamber within
  `linkReachM` above a ruin chamber takes a `stair` link at the `any–buried` chance.
* **(g) The excavation reading (g item 109 (j) (2)–(4); g item 113 (e); J-V4.53, J-V4.122).** `excavation(doc, cluster)` returns the
  cluster's state in the access-state set (V04 §2.2) for every cluster — a connected component of a part's open galleries
  and chambers, joined at junctions and chamber walls — of a `cavern` or `ruin` part and of the `buried` part's former
  settlement.
  1. **Only open paths count (g item 113 (e)).** The connection graph's nodes are the clusters of every part and the
     surface; its edges are the **passable** joins: links of kind `open`, `gated` or `secret` and access points in state
     `open` or `locked`, each only while both its elements are open (no `closure`). A gate, a lock and a secret door are
     passable to those who hold the key or know the way — the squatters, the cult and the thieves among them — so they
     count; a link of kind `collapsed` or `flooded`, a `bricked` access, an access reading collapsed (its element closed,
     II.6) and every closed element — a sewer sealed or caved in, a cellar filled, a building above lost — break the path.
     The reading is physical and one per document: which viewer sees a secret way is the knowledge filter's (§9.2, §8.1
     item 7; T-V4-21), and dwellings, capacities and digests never depend on the viewer.
  2. **The states.** A cluster is `accessible` when the graph joins it to the surface — transitively, so opening one void
     can open those beyond it; `lost` when it is not joined and at least one of its elements stands in its system's
     `ExcavationRecord.reached` (it was reached before and every open path since closed); `unexcavated` otherwise. A part
     of any other kind is always `accessible`: the sewer, catacombs, quarries, vaults and dug passages were dug from the
     surface, and a raised grade's or a scar's buried town is entered from the cellars above (V04 §3.5.5 (a)).
  3. **The memory.** In the commit whose reading first makes a cluster `accessible`, each of its elements not yet in
     `ExcavationRecord.reached` is entered (in address order); an entry leaves only with its element or with the undo of
     the commit that added it (V04 §2.6). So a cluster found and then cut off reads `lost`, and the undo of the finding
     itself returns it to `unexcavated`.
  4. **Refound.** A `lost` cluster turns `accessible` again in the commit that restores a path: a `reopen` of the sealed
     sewer, a new dig or crypt join, a new public opening (a collapse), a new overlap link from a growing system, or the
     user's excavation (`placeAccess`, V04 §4.1).
  5. **Its dwellings.** In the commit (or the epoch batch) in which a cluster turns `lost`, every dwelling plot on it (F6's,
     an undercity neighbourhood's) takes `existence: 'abandoned'`, cause `rule:void-lost`, as II.7.3's lifecycle abandons a
     closed run's plots. At an epoch, a cluster turned `lost` at the `decline` step (`under.fade`) returns its households
     to V06's ledger as displaced, cause `void`, and they are re-housed at `siting` the same epoch; a cluster turned
     `lost` in an `afterGrowth` participant's commit (`under.extend`'s foundation or arch-vault collapse, `under.access`,
     `under.undercity`), after `siting`, has its households re-housed inside that participant by §4.7's overflow pass,
     counted `households.undergroundVacated` and never left for the epoch's `close` (V06 §3.18.1 (4), (6); J-V4.128). At
     an edit they are listed as the dry run's `displaced` effect (§11.2). When the cluster is refound, its
     abandoned plots whose rings still exist are `resurrect`ed (§2.8) in that commit, empty, and households return at the
     next placement: V06's relocation at the next epoch (V04 §3.10), or F6's allocation at a re-derivation. An `unexcavated`
     cluster never holds dwellings (V04 §3.4 F6).

  It is derived, never stored, but for `ExcavationRecord`: a union-find over clusters, recomputed after every commit that
  touches an access, a link, an element's closure or a building over a void, for the clusters that commit touches, and
  cached by the underground's digest. A document saved and loaded reads the same states (the reading is a function of the
  records and `ExcavationRecord`; T-V4-76 (c)). V12's `undergroundInputOf` reads both `unexcavated` and `lost` as
  `state: 'unexcavated'`: sealed to the inhabitants.

**Determinism.** Item 64's basement draw stays in U-LINK (T5); the dig draws are U-ACCESS's; the two stages' stream keys
differ by their stage id (§6.1), and within U-ACCESS each dig key — the building, the void kind and, for an added wing,
its key ((d)) — has its own salt, so no draw's value depends on another rule's presence. Every key is listed in
V04 §3.12.

**With a scope.** `AccessPassStrategy.run(doc, rules, ctx, k, scope?: EpochScope)` (II.7.6): without a scope (T2b) it runs
(a)–(g) over the whole document;
with V06's scope (`under.access`, `afterGrowth` 20) it runs (a), (b) and (f) over `scope.elements` and (a)'s village-working
test over `scope.workings`, (c) for the pairs whose catacomb element is in `scope.elements`, (d) for the buildings of
`scope.built` and `scope.basementGrown`, (e) for the candidates among `scope.elements` and under the faces of
`scope.surfaceChanged`, then (g) — the `lost` transitions and their vacated plots included. Every step is idempotent — a link
or access found by its creation key is kept, never made twice — so running it after `under.extend`'s own overlap tests adds
nothing twice, and each made access or link records `event` = the epoch's `seq`. With an empty scope it runs (g) only. Its
last step is V01's opening pass over the public openings (e) made (V04 §3.10 *The opening pass*).

### 3.6 U-CITY — the undercity (II.7.5's rules, as steps)

Existence, the size law, the allocation, the shadow rules, the outskirts and the light are II.7.5's; the layout constants
are `UnderLayoutRule`'s (V04 §2.3). U-CITY runs at TOWN and above (II.7.5's rung row); below TOWN it never runs as a
generator, and an inherited undercity is re-read against the village row's bound 0 (V04 §3.1's maintenance mode).
1. **C0 — existence.** U-CITY re-reads U-FORECAST's P6 verdict `{ exists, n, H }` and never re-draws; the four requirements
   are checked on the built voids. Under `require` at least one neighbourhood forms (V04 §3.5.6 lays its void where none is
   counted), and the first neighbourhood takes the `Underground city` record's assignment: its `District.identity.dossier`
   is the record's binding key and its name the record's name, a protected dossier name, never a naming-slice draw. Under
   `forbid` U-CITY does not run.
2. **C1 — the voids, read-only first.** For each built system part whose kind the preset admits (`UndercityRule.presets`;
   the `historical` preset admits `ruin`, item 558), its **clusters** are the connected components of its open galleries
   and chambers (joined at junctions and chamber walls), the arch vaults and the terminal cistern excepted — they stand at
   grade or under a conduit house and no undercity takes them. A cavern, ruin or former-settlement cluster is a candidate
   only while its excavation reading is `accessible` (V04 §3.5.7 (g); the undercity never excavates a sealed void,
   J-V4.54). A cluster's capacity is its floor area — chambers plus the bands of galleries that carry no `water` (a `water`
   gallery counts 0, is never a walkway, and still joins clusters and serves as a water lifeline) — ÷ `m2PerHousehold`.
   Before any commit, each candidate passes a **read-only lifeline test**: L1's candidate search for access, air and water
   (V04 §3.7 L1) and C2's carve feasibility, run against the parts as they stand after U-ACCESS; a cluster that fails is
   not a candidate, so no neighbourhood is ever dropped after it is committed. Candidates are ranked by
   `capacity × RuinRule.sourceWeight[kind]`; where a ruin and another kind both qualify, the first pick is one draw on
   `sewer` keyed by (the settlement, `undercityRank`) weighted by those products (so V12's `ruinChosen` share is
   `w_ruin ÷ Σ w`), the rest in descending product, ties by lowest address; one neighbourhood each, while fewer than `n` are
   formed and the cluster holds at least `minHouseholds`; where fewer clusters qualify than `n` and the largest holds at
   least `2 × householdsPerNeighbourhood`, it is split in two by its chamber graph — seeds the two chambers farthest apart by
   graph distance, every node to the nearer seed, ties by address (J-V4.24; deterministic, no draw). `H` is shared among the
   neighbourhoods in proportion to capacity, each capped at its own. **None formed** (never under `require`): no undercity;
   its households go to the underground pseudo-district's free capacity — its sewer-front plots, then F6's void dwellings —
   and only the remainder to T8 (V04 §3.7a), reported (F-VOID). Under `require`, where the one counted void the forecast
   relied on proves sealed, the required neighbourhood takes it with a lifeline stair of cause `dossier` (the dossier
   outranks the chance). A neighbourhood whose cluster later turns `lost` (every lifeline and other way in closed) is vacated
   by V04 §3.5.7 (g) (5), its chambers kept; the next epoch's re-read finds it no candidate.
3. **C2 — the main chamber (J-V4.22).** The core (`District.core`, item 212) is, in order: a ruin `court`, `temple` or
   `hall` chamber of at least `mainChamberM2` (an ancient forum is the first plaza candidate, g item 109 (e)); else the
   cluster's largest chamber of at least `mainChamberM2`; else one is **carved** by U-CITY's carve post-pass on the host
   part: from the cluster node nearest its area centroid (ties by address) a 16-gon of radius
   `√(mainChamberM2 ÷ π) + carveMarginM` is inserted as a `chamber_wall` chain of kind `market`, its floor the seed's, its
   ceiling by V04 §3.5.0's table. A ruin chamber holding a monument is a core candidate where its floor less the monument's
   tier-0 ring and mound reaches `mainChamberM2`; the monument then stands inside the plaza disc, which the ring's stall pins
   and walkways keep clear of (an undercity market round an ancient pyramid). The carve lays nothing within reach of a
   foundation obstacle (V04 §3.5.0). Each host gallery crossing the 16-gon is split at the wall by §6.3's SPLIT rule; its
   inside parts take `existence: 'cleared'`, cause `rule:undercity-carve`, and are kept, never deleted (in a catacomb its
   grid of galleries — the undercity hollowed its own square). A New random on the host system re-runs the carve for every
   neighbourhood whose core it held, in the same transaction set; a New random on the neighbourhood `resurrect`s the
   cleared parts (§2.8) and re-carves. The carve's feasibility — its admitted area, inside the part's depth band and clear
   of every other cluster's elements, reaching `carveMinShare` of `mainChamberM2` — is part of C1's read-only test, so a
   degenerate carve (a 16-gon the kernel refuses) is a cluster that is no candidate.
4. **C3 — streets (J-V4.23).** The core's plaza is the disc of radius `√(plazaShare × area ÷ π)` about its centroid,
   ringed by a closed walkway (a `Gallery` with `walkway`, width `walkwayCm`, wall 0): plots front the ring's outer kerb and
   the disc inside it stays open. In every chamber of at least `walkwayMinChamberM2`, the openings — the vertices where
   galleries meet its wall, and its access points — and one hub (the ring's nearest point for the core, the centroid
   otherwise) are joined by a minimum spanning tree (Prim's, ties by index) whose edges are shortest paths inside the chamber
   polygon (a visibility graph on its vertices, ties by index; a monument's standing rings and mound, a foundation pillar
   and each column point grown to 60 cm are holes in the polygon), each edge a walkway; a chamber with one opening takes the
   one walkway from it to the hub, and an edge shorter than `minEdge` is dropped. Every gallery of the cluster that joins two
   chambers of the neighbourhood and carries no `water` takes `walkway` (II.7.5's adopted streets). One L1 batch inserts
   them; one L2 `corridorUnion` batch bands them.
5. **C4 — plots and buildings.** S10 on the neighbourhood's blocks with frontages on walkway and gallery kerbs and on
   chamber walls (II.7.5); the surface test of V04 §3.5.0's shallow-element rule applied through F-UNDER's samples where the
   ceiling lies within the host row's `surfaceClearCm` of the ground, those blocks recording their ground cells as F3 does;
   no plot on a floor at or below the water table (a cavern hall's floor lies `hallDryCm` above it, V04 §3.5.2); no plot on
   a monument's standing tiers or mound or on a foundation pillar (obstacles cut out of the floor), while a plot may hold
   column points, which V03 §3.12 (6) plans round. Every entrance S11 derives here takes `Entrance.faces: 'tunnel'` (item
   239). S10b places the neighbourhood's share of the allocation, its relation families measured by `underDistance`
   (V04 §3.6a), the black market as a hard `near: core` row fronting the ring — bound to a `Black market bazaar` record where the
   dossier holds one (V04 §2.3a); ladder members, SIZE steps and clandestine modes as F4 states; no crypt is ever seated
   below (V04 §3.5.1 (11)). S11 with `UndercityRule.arrangements`, heights ceiling-capped (II.7.5); the ring's stall pins by
   §4.7's market pins at the secondary-market scale.
6. **C5 — the district.** `District { kind: 'undercity', parent, core, faces }` with II.7.5 (2)'s parent rule, computed as
   the first entry of V01's `districtsAbove(part, core)` (V01 §3.16); its prosperity field as II.7.5 states (the parent's
   field with its daylight term, J-V4.51); `outskirts` is written by U-LINK L6 (item 212).
7. **C6 — lights.** V04 §3.9's undercity rows.

Its records keep §2.6's and V04 §2.6's lifecycle rows: saved and loaded with their part, undone by their scope, re-derived by
a New random on the neighbourhood or its host (C2), re-read at an epoch (V04 §3.10), and absent from an older document until
its Re-derive from S7b (V04 §4.6).

### 3.6a The cross-arena distance (items 103, 105, 107; II.7.5 (3); J-V4.66)

1. **`underDistance(member, target)`** for a member on an underground part is the shortest path over the member's part's
   open walkways, galleries, chamber floors and tunnels — and on through open links into other parts — to an open access
   point or lifeline whose `knownTo` the member's use admits (a public use: `public` and `local` accesses; a clandestine
   use: its own `knownTo` and wider), plus the ground's `street`-mode distance (§4.7's solver) from that access's
   `ground.at` to the target; a target that is itself underground takes the underground path where it is shorter. It is
   II.7.5 (3)'s "along its walkways to its nearest lifeline and on from the lifeline's ground point", built. Where no
   admissible access is reachable (a member of a cluster that turned `lost`, or one whose every way out its use may not
   take), the distance is +∞: every family reads the member as out of reach, never at distance 0.
2. The relation families SUPPLY, CLIENTELE and COMPETITION, item 105's links (each consumer bound to its nearest provider)
   and item 107's comfort distance read `underDistance` for underground members.
3. EMITS and SENSITIVE-TO act within an arena only — rock absorbs smell, smoke and noise — except water pollution, which
   reaches the ground at the network's outfalls (a sewer-front tannery's counts at its run's outfall), and disorder, which
   reaches the parent district.
4. ALIGNMENT reads plan distance, so a guild seat under the garrison still repels (item 103 (b)'s example).
5. Coverage (item 103): each undercity neighbourhood and the underground pseudo-district (the sewer-front neighbourhoods and
   F6's void dwellings) is a catchment of its own for the everyday-service classes whose V11 row admits the arena.
6. The siting statistics of item 103 (e) run on underground members against a random-placement baseline (T-V4-60).

### 3.7 U-LINK — the connection stage (II.7.6's rules, as steps)

1. **L1 — lifelines, realised (II.7.5 (4); J-V4.25).** For each undercity neighbourhood, in address order, L1 makes what
   C1's read-only test found: *access* — the cluster is accessible by construction; where its nearest access is another
   part's element, L1 writes that **lifeline link** itself (kind `open`, or `secret` by `lifelineSecretShare`, a draw on
   `sewer` keyed by the district; its `via` by U-ACCESS (b)'s floor rule; cause `lifeline`), and where a basement access is
   the cheapest access L1 creates it with source `lifeline`, cause `lifeline`, and L3 skips that building; else the
   shallowest element's ground point above, on ground part 0 — public ground or a yard (V04 §1.2), or outside ground (a
   point under a raised deck on the way beneath, never inside a raised-way pier's footprint) — within `lifelineReachM`: a
   `stair` where the drop is at most `stairMaxDepthCm`, else a `shaft`, source `lifeline`, `knownTo` `secret` by the same
   draw else `local`; *air* — a `grating` of role `air` on public ground (V04 §1.2) above a walkway or chamber, else a well
   pin's point, else a ruin decoration's, else a `shaft` through a building whose footprint lies over the cluster (its
   chimney), one per neighbourhood and one more per `airPerM2` of floor; *water* — a `water` gallery or a cistern of the
   cluster or one linked to it within `linkReachM` (U-ACCESS's links exist by now), else a well pin within 30 m of the
   cluster in plan (a `well` access), else a river-bank `mouth` of a cavern of the cluster; *a route outside* — satisfied
   when the graph reaches a `mouth` or an outfall, never required. A realisation that cannot place a vertex the test found
   runs U-DIG's lifeline closure from the district ring, its pieces keyed by (the district's lineage, the piece ordinal),
   its target never a sealed (`unexcavated` or `lost`) cluster. No neighbourhood is dropped here.
2. **L2 — links between parts** are U-ACCESS (b)'s (V04 §3.5.7), run before the undercity.
3. **L3 — basement accesses (item 64).** II.7.3's *Basement accesses* (1)–(5), building by building on ground part 0 (never
   a sky-layer building, V04 §1.2) in address order, cause `{ rule: 'basement' }`, for every target but a cavern, ruin or
   former-settlement element (U-ACCESS (d)'s dig draw decides those), a catacomb element from a church-class building
   (U-ACCESS (c)'s join is its only way to a catacomb) and an arch vault (at grade, reached by the street), skipping a
   building L1 gave a lifeline access. It runs here, after U-FRONT and U-CITY, because its targets include sewer dwellings'
   and undercity buildings' walls and undercity walkways (II.7.3 (1)).
4. **L4 — lifeline closures** run inside L1 (above).
5. **L5 — subterranean dossier institutions (item 386).** An institution with `facets.subterranean` that S10b placed on a
   surface plot (no underground allocation could take it) has a basement — S10b's hard row admits only plots whose terrain
   gate allows one, and S11 forces it by the requested-mode ladder (item 243) — and takes the first rung that succeeds: (1)
   a basement access to the nearest element within `accessReachM`; (2) U-DIG's connector to an element within `digReachM`;
   (3) U-DIG's minimal `dug` system to an outlet; (4) always: a `cellar` chamber of the `dug` system directly beneath its
   basement (floor at the `dug` row's upper depth, `cellar` 6 m², `knownTo` the institution's, no connector), reached by a
   `hatch` — where the water table lies above that floor the chamber is created `flooded` and `W_SUBTERRANEAN_WET`
   reported, and the fact still has its underground. An `Underground network` record takes the **dug network** instead
   (V04 §2.3a): from its building the passage to the `beyondWalls` outlet first, then up to `networkCellars` cellars of uses
   in its district by dug passages, one `storage` chamber, all `knownTo: 'secret'`, its `forbiddenResources` infinite in
   U-DIG's cost. Every L5 piece is keyed by (the institution's binding key, the piece ordinal) on `sewer`, source `system`
   with the building among the dug system's `sources`, cause `dossier`, held while the institution is live (V04 §4.4); the
   rung used is reported (T-V4-34). **When the dossier removes or closes the institution** — at an epoch's `dossier` phase,
   an absorb, or before a re-derivation — its L5 pieces are **released**, never torn down (item 11): every piece stays a
   `dug` element with its cause `dossier` kept, the building leaves the `dug` system's `sources` (as a ruin's
   `source.ref` clears, V04 §2.6), the pieces are no longer held (a user may now delete them) and they join U-FADE's
   candidates from the next epoch; their accesses keep their state until their host changes (V04 §3.10 *Access closures*).
   An institution the dossier relocates re-derives its pieces with its owner at the new building, keyed by the same binding
   key (V04 §3.8 *Keys*) (J-V4.123). Tested by T-V4-34 (e).
6. **L6 — outskirts.** From each link endpoint on part 0 that joins a neighbourhood's cluster, a walk along open part-0 runs
   up to `outskirtsReachM`; the U-FRONT blocks whose frontage runs it reaches are `District.outskirts` (II.7.5). L6 re-runs
   after any part-0 edit within `outskirtsReachM` of a lifeline link (V04 §2.6).
7. **L7 — close.** `Features.underground` recomputed (II.7.4).

U-LINK runs at every rung: below TOWN only L3, L5 and L7 (V04 §3.1), since there is no undercity and no network; L1 and L6
wherever a neighbourhood exists.

### 3.7a T8 — U-RECONCILE, the tail's only writer of ground uses and households (J-V4.59)

The last eager tail stage, at every rung. Its inputs are what the tail could not seat below after absorption (V04 §3.4 F0,
V04 §3.6 C1, F6): surplus households, and institutions no underground plot took (an `underground`-mode concealed use; an
`undercity: 'preferred'` or `underground: 'preferred'` class). *Households* go by S10b's reconcile (§4.7) to the ground's
vacant residential buildings of the poorest band — first in the parent district of the neighbourhood they were meant for,
else the district above their run, else the town's poorest district — then to occupied poorest-band buildings up to each
building's capacity (§4.7's generation fill), in address order; a remainder (practically nil after `forecastSafety` and the
absorption) is reported in `requestedVsBuilt` and still counted in the population. *Institutions* take item 63's chain
(§4.7 *Concealed institutions* (2): `underground` → `front` → `hidden`) or their class row's ground placement, each by
S10b's reconcile on a vacant ground plot. With nothing to seat T8 writes nothing and reports zero; one household goes to the
first building of that order. T8 writes uses and household counts only: no plot, face, footprint or building is created,
moved or removed — so it commits no geometry that could be degenerate — the ground arena's geometry and digests stay those
of the first map and T12-1's "0 writes on the ground `PlatKey`" holds for the underground stage. The ground's model digest is
finalised after T8. Every T8 write is reported; T-V4-3 bars its rate.

### 3.8 U-DIG — the pieces an access generates (II.7.6's seven steps, as algorithms)

The pieces and their order are II.7.6's; the closure mechanics are §7.3 item 9's. U-DIG runs at every rung. Added here:
* **Target search.** Each part's static index is queried for elements within `accessReachM` of the basement ring (a direct
  access, no connector), then within `digReachM`, in II.7.6's order; ties by plan distance, then address. An arch vault is
  never a target; from a church-class building a catacomb element is a target only as a hand crypt join (V04 §4.1).
* **The connector (J-V4.27).** A local grid of `digGridCm` cells over the bounding box of the basement ring and the target
  point grown by 20 m (at most 400 × 400 cells; larger is a refusal naming the bound). Step cost = step length × `rockCost`
  of the terrain class under the cell (`damp` and `flood` infinite); infinite within `foundationClearM` of every other
  building's footprint and basement ring (the ground, read), within reach of every foundation obstacle (V04 §3.5.0) and of
  every dug passage's band, under a water face, and where the water table lies above the passage floor. A\* with the octile
  heuristic × the least cost, ties by (f, g, cell index). The path's cell centres are simplified (Visvalingam at `minEdge`)
  and snapped. Its floor falls linearly from the basement floor to the target's floor, clamped to the `dug` row's depth
  range, above the water table by 30 cm and below the network's `coverCm` (II.7.2); a remaining drop beyond `digMaxGrade` is
  taken by the end link's `stair` (`via`). A route longer than `2 × digReachM` is a refusal with the reason (II.7.6); a
  target within `accessReachM` needs no connector.
* **The minimal system.** Where nothing lies within `digReachM`, the outlet row's first kind with a candidate within
  `2 × digReachM` — another cellar of the same `Use.owner`, a void, the nearest river or canal bank, the shore, the nearest
  point beyond the outermost enceinte's outer strip — ends the passage: a `mouth` on outside ground, or a `door` into the
  other cellar. A kind with no candidate (no enceinte at a village rung, no bank) is skipped.
* **Keys at generation and at an edit.** An edit's pieces are keyed by the event's `seq` (§7.3 item 9 (b)); a lifeline's
  pieces at generation by (the district's lineage, the piece ordinal); L5's by (the institution's binding key, the piece
  ordinal); each on `sewer` with the same key. Generated pieces re-derive with their owner (the neighbourhood's New random;
  the institution's relocation); edit-made pieces are held (§7.3 item 9 (c)); a `regenerate` on the `dug` system re-derives
  only its generated pieces, its dry run listing the held ones as kept (item 561).
* **Voids and bans.** The target search never picks an element of a sealed (`unexcavated` or `lost`) cluster unless the
  edit names it, or the access is item 372's grouped access (§7.3 item 9 (d)): an `addUndergroundAccess { building }` with
  no `target`, grouped before a dwelling declaration on a sealed cluster (V09 §4.17.4's forms), targets that cluster's
  element nearest in plan to the building's footprint (ties by address). Either is the user's excavation (cause `edit`), its
  dry run listing the clusters it opens, and the declaration's closure then finds the cluster reachable and adds no access.
  The grouped access keeps every other piece of its own closure (the basement by §2.6's requested-mode ladder, the connector
  where the target lies beyond `accessReachM` of the basement ring, the plan reservation); the rule holds for a building the
  dwelling closure's first rung qualifies (below; the base's "one of those buildings"), and an untargeted access from any
  other building takes the ordinary search, the declaration's closure then making its own way in. A record's
  `forbiddenResources` make `damp` and `flood` cells infinite in the connector's cost.
* **The dwelling closure's way in (§7.3 item 9 (d), item 372; V09 §4.17.4; J-V4.119).** A dwelling declaration on a sealed
  cluster — a `quarter` or `drawBoundary` on a void part, a `placeAt` of a dwelling class on a void plot, a clerk's proposal
  of either — is a closure, and its first rung calls U-DIG. The buildings **above the cluster** are the ground buildings
  (ground part 0; never a raised-way pier) that V04 §3.5.7 (d)'s geometry admits over one of its elements — a footprint
  overlapping the element in plan, or a basement ring within `DigRule.planReachM` of it — each measured to the cluster's
  element nearest in plan to its footprint (ties by address); one **qualifies** when its dig floor (V04 §3.5.7 (d)) lies
  within `DigRule.maxM` above that element's top. They are ordered by that plan distance, then address, and the first
  digs: its target that element (a `reused` piece of the closure record); its pieces U-DIG's connector, only where the
  element lies beyond `accessReachM` of the basement ring (or, without a basement, of the footprint), the access and the
  plan reservation — no basement piece, the rung taking the building as it stands so that its dig floor stays the one it
  qualified by, and no minimal system; the access of V04 §3.5.7 (d)'s kinds (a `cellar_stair` where the building has a
  basement and the drop lies within `stairDropCm`, else a `shaft`, a `well` where the plot's well pin stands over the
  element), its head by V03's access head as (d)'s, source `dig`, cause `{ rule: 'edit', system: the cluster's system,
  event: the declaration's seq }`, with `bend.under.accessDug`. A building whose connector U-DIG refuses (the
  `2 × digReachM` bound above, or no finite path) is passed over for the next, listed in the dry run with its reason, and
  the rung fails only when none remains. The dry run lists in `PreviewResult.alternatives` the qualifying buildings after
  the one that dug, in the same order, at most three (the base's), without digging them in the dry run; a re-preview of the
  grouped access from one whose connector U-DIG then refuses is refused with its reason (§7.3 item 9 (e)). The base's
  second and third rungs — a public opening at the nearest of V04 §3.5.7 (e)'s candidates with its chance waived, else a
  `collapsed_shaft` at the base's point of public ground over the cluster — are made by U-ACCESS (e)'s opening maker as
  `placeAccess`'s public-opening form makes them (V04 §4.1): source `opening`, role `access`, cause `{ rule: 'edit',
  system, event }`, `knownTo` by (e)'s rule, V01's opening pass in the same commit (V04 §3.10); the fourth, the bend onto
  ground part 0, is the base's and adds no underground piece. The pieces are keyed as an edit's (above) by the
  declaration's `seq`, recorded in its closure record, held while it is live and removed by its undo (§7.3 item 9 (c)); the
  excavation reading opens the cluster in the same commit, and the declaration's own pieces follow in the same event (§7.3
  item 9 (a)'s order). In a skeleton prefix the closure runs where U-CITY C0 reads the declaration on a cluster still sealed
  after T2b (V04 §4.7), a grouped access before it in the prefix running there first rather than among T5's closures
  (J-V4.120).
* **The edit-triggered lifeline closure (§7.3 item 9 (d)).** After the dry run of a `drawBoundary` or `split` on an undercity
  district, C1's read-only lifeline test runs for each resulting district; one that fails calls the lifeline generators
  from its ring, keyed by its lineage and the event's `seq`, the pieces shown as fates on the tools T5 and T9.

### 3.9 Light underground — the rows (item 68 (d′); J-V4.33)

The model is §8.4's (no global light; ambient `ambient.underground`; shafts; the hand lantern). The rows, arena
`underground` (§4.7's `LightRule`; `extension`; our own values), placed by the engine that makes the host. `magic` is the
row's admitted circumstance values (item 306 lets it include `'none'`); a row with no `magic` field lights under every value,
and a missing circumstance reads `none`. The rows run at every rung where their host exists.

| system | host | kind, source | height cm | cd | radius cm | size cm | count or spacing | magic |
|---|---|---|---|---|---|---|---|---|
| sewer, void dwellings (F6) | `door` | the band's fuel, fire (below) | 170 | 6 | 500 | 3 | one per entrance | — |
| sewer | `tunnel` (a junction) | torch, fire | 220 | 15 | 800 | 5 | one per junction of a lived run; its host the arm of the lowest address | — |
| sewer | `accessPoint` | torch, fire | 220 | 12 | 700 | 5 | one per access of a lived run | — |
| undercity | `door` | the band's fuel, fire | 180 | 10 | 700 | 5 | one per entrance | — |
| undercity | `door` (tavern, fence, guild seat, shrine, pit, healer) | lantern, fire | 250 | 25 | 1 000 | 8 | one per main entrance | — |
| undercity | `gallery` (a walkway) | torch, fire | 230 | 15 | 900 | 5 | spacing solved by §4.7 (2) for `minLux` poor 0.5, modest 0.8, prosperous 1.2 lx | `none`, `low` |
| undercity | `gallery` (a walkway) | magical orb, magic | min(500, ceiling − 30) | 30 | 1 200 | 30 | the torch row's spacing × 1.5 | `high` |
| undercity | `chamber` `market` | brazier, fire | 100 | 60 | 1 400 | 25 | ⌈area ÷ 150 m²⌉ on the ring's inner kerb, evenly by arc length | — |
| undercity | `chamber` other, ≥ 400 m² | fire pit, fire | 30 | 40 | 1 200 | 25 | ⌈area ÷ 400 m²⌉ at the chamber's hubs | — |
| catacomb | `chamber` `ossuary` | shrine lamp, fire | 120 | 3 | 400 | 5 | one per ossuary chamber | — |
| catacomb | `accessPoint` (its entrance) | shrine lamp, fire | 120 | 3 | 400 | 5 | one | — |
| cavern | `gallery` | glow fungus, magic | 20 | 0.5 | 300 | 30 | every 15 m, where the magic circumstance is `low` or `high` or the biome is in the row's list (`temperate_forest`, `wetland`, `jungle`; V11 reviews) | `none`, `low`, `high` with the biome clause |
| ruin | `chamber` `hall`, `temple` | ancient glow, magic | ceiling − 30 | 8 | 900 | 20 | ⌈area ÷ 300 m²⌉, each chamber with `magicLightChance` (a draw on `sewer` keyed by the chamber) | `low`, `high` |
| ruin | `accessPoint` | torch, fire | 220 | 12 | 700 | 5 | one per access of a lived cluster | — |
| quarry, vaults, buried | `accessPoint` | torch, fire | 220 | 12 | 700 | 5 | one per access of a lived system, an arch vault's door excepted | — |

**Fuel (item 68 (d′) (1)).** A `door` row's "the band's fuel" resolves by the plot's band and the era row: poor a
rushlight (6 cd, size 3), modest a tallow lamp (8 cd, size 4), prosperous and above an oil lamp (10 cd, size 5); an era row
may replace them (V11's era rows). A run, system or cluster is **lived** when it carries plots — F6's scattered dwellings
included — or lies within `lights.litReachM` of one; an unlived network or system is dark but for its shafts, and a sealed
(`unexcavated` or `lost`) cluster carries no light at all. Every underground light's height is capped at its host's ceiling
− 30 cm; a host whose ceiling is under 60 cm takes no light. Door sides are drawn on `pin.light` as on the ground (§4.7
(4)). **Arch vaults** carry no light row: each is daylit through its door, which the light pass treats as §8.4 (b)'s shaft
with the `archDoor` opening row (V04 §2.3); a declared institution in one takes the sewer `door` row's lamp by its band's
fuel.

### 3.10 U-FADE and the underground at an epoch (item 11; J-V4.28 – J-V4.30)

The evolution engine owns the epoch; these are the underground's parts it calls (item 319), usable by hand now. V06
schedules them over epochs (the links' re-binding, excavation, ruin decay, catacomb growth). **Their callers** are V06's four
participants (V06 §3.2; V04 §1b.2), each registered with `stage: 'U-FADE'` (V06 §2.1's `EpochParticipant.stage`):
`under.fade` at `decline` (order 10) runs `UndergroundFade`; `under.extend` at `afterGrowth` (order 10) runs
`Foundations.apply` over the epoch's scope (V06 §3.18.1 (6)), then the arch-vault reconcile, then `SewerStrategy.derive`
the first epoch `Features.sewers` turns on (else `.extend` with its wall drops), then `CatacombGrowth.grow` with its `opts`,
then `QuarryWorkings.extend`; `under.access` (order 20) runs `AccessPassStrategy.run(doc, rules, ctx, k, scope)`;
`under.undercity` (order 30)
runs `UndercityEpoch.reread`, then F6, its new dwellings filled by V06's relocation (below). On the grow-by-stage path V04's
own M4 hooks call the same functions without V06's scope and `opts`. The history replay's coarse epochs run the same
participants (§4.11 *History-first generation* (2)), and `BuriedFormer.lay` inside the batch of a burial epoch (V04 §3.5.5
(b)).
* **`UndergroundFade.candidates(doc, epoch)`** — every tunnel, gallery and chamber neither locked nor pinned — an arch vault
  excepted, whose condition follows its span (V04 §3.5.4 (d)) — in use, neglected or partly caved in, whose dwell band has
  run (§4.11's tunnel dwell, from its last condition change), with weight `w = E_u · rate(underground) · u · neglect`: `E_u`
  the mean of §4.11's exposure field over the ground points above the element every `sampleM` (II.6: "the exposure of the
  ground it runs under"); `rate` the `underground` persistence row (§4.11); `u` the underground lottery's draw on
  `epoch.transform` keyed by (the element's lineage, the epoch); `neglect = 1 + neglectGain × (1 − usage)`, `usage` ∈ [0, 1]
  the share of a run's served and fronting plots that are occupied, of a lived system's plots that are occupied, 1 for a
  catacomb whose burial face is open (a stagnant one included) and 0 for one whose face is closed, 1 for a vault whose way is
  live, a ruin or former-settlement cluster's its dwellings' occupancy (0 while sealed), 0 for an unlived cavern or quarry.
  A ruin element's weight is further × `RuinRule.fadeFactor` (V04 §2.3's fade rows). An element shorter than one `sampleM`
  takes one sample at its midpoint.
* **`UndergroundFade.apply(element, epoch)`** — the op drawn on `epoch.transform` from `UndergroundFadeRule.ops` at the
  element's class and condition, a seal's weight × `(1 + orderGain × (1 − disorder))`; a run longer than 120 m is struck on
  a 120 m stretch centred at its most exposed sample (II.6's stretch split), so cave-ins are local. A catacomb gallery that
  silts, caves in or is sealed stays in its complex's extent and in `extentFloorM2` (g item 109 (k) (4)).
* **Its own lottery (J-V4.103).** The underground's strikes are drawn by this lottery at the evolution engine's `decline`
  step, after the fabric pool (V06's `under.fade`), at the underground's rate: never in the fabric pool, never counted
  against a district's `fabric` cap and never in the pool's persistence order (item 319; V06 §3.5.2). A strike that closes
  the last open path of a lived cluster turns it `lost` and vacates its dwellings in the same batch (V04 §3.5.7 (g) (5);
  V06 §3.18.1 (4)); a later `reopen`, dig or overlap refinds it and dwellings return at the next placement.
* **`Foundations.apply(doc, scope, cause)`** (`under.extend`, its first act; J-V4.109) — V04 §3.5.0's rule over the epoch's
  new footings (V04 §3.5.0, *At an epoch*), at every rung; it returns `FoundationsResult` (V04 §2.4): the collapsed
  elements, the pillars and the void households vacated on collapsed floors, which V06 re-homes inside the participant
  (V06 §3.18.1 (4), (6)); a catacomb node a new footing refuses records `blockedBy: 'foundation'` at the next growth.
* **`SewerStrategy.derive` at the first sewers epoch.** The first epoch whose prelude turns `Features.sewers` on (V06 §3.2,
  *The feature set at an epoch*), `under.extend` runs U-NET whole (N0–N12) over the current ways as the epoch's mutation
  instead of `extend`: part 0 is laid on the sewer's empty part; N3a's declarations are honoured; every existing entity —
  another system's elements, the accesses, the links, the ground — is kept and never re-derived; N8 connects the plots of
  `R`; the new runs join `EpochScope.elements`, and U-ACCESS (a)'s overlap test runs over them in the same commit (a run
  crossing a sealed void opens it, cause `overlap`, `event` the epoch's `seq`). V06 reports it (`under.featureOn`).
  Sewer-front dwellings follow through the crowding hook (below).
* **`SewerStrategy.extend(doc, epoch)`** — `under.extend` at every later epoch; on the grow-by-stage path, after the new
  stage's S11: N1–N6 over the current ways with N3a's declarations, every node under an open existing run a root of cost 0
  beside the outfalls, existing runs never re-derived; a tree path over an edge under a closed run `reopen`s that run
  (regrowth-first, II.6; g item 113 (d)) before any new run is made; new runs' inverts fall into their receiver's; N8 for
  the new plots only; then U-ACCESS (a)'s overlap test for the new runs (a new run crossing a sealed void opens it, cause
  `overlap`, event the epoch). **The wall drops:** over V06's `EpochScope.levelled`, each existing run whose centreline
  crosses a `RetainingWall` the epoch made or re-derived takes N6's two wall-crossing vertices, and N7 re-lays the connected
  network's knots, its plan unchanged (as a depth offset re-lays them, J-V4.15).
* **`ArchVaults.reconcile(doc, EpochScope.raised, epoch)`** (V06's `under.extend`) — in the epoch's commit, over every
  raised way whose `feet`, `supports` or `spans` the epoch changed (V06 §2.1's `EpochScope.raised`): lays the arch vaults
  of the `vault` spans of a raised way the epoch founded or repaired (a town becoming a city), collapses those whose span
  or a bounding support reads `ruined` or `cleared`, or whose span V06 breached or dismantled (V04 §3.5.4 (d) (2); a
  landfall's ruin included), re-lays those of a raised way a circuit, contraction or re-anchored stretch crossed through
  one of its stations (§2.7's support step (6) (b) (iii): that station's support the band's stretch, each vault between
  its raised-way piers' inner faces) or whose deck the frame growth extended (§3.2 (9): a new `vault` span's vault laid,
  one whose span is gone or `open` deleted), and deletes those of a removed raised way, with their links and accesses;
  the new chambers join `EpochScope.elements`, so the access pass tests them in the same epoch (g item 109 (j) (3b)).
* **At a village rung** the maintenance mode (V04 §3.1) makes U-FADE, the foundation rule (`Foundations.apply`: a new footing
  collapses what it meets, at every rung), the arch-vault reconcile and the undercity's re-read the only changes an
  inherited system sees: nothing grows, nothing new is laid; the access pass still tests the caverns, ruins, openings and
  the village workings (V04 §3.5.7 (a)).
* **`CatacombGrowth.grow(doc, epoch, opts?)`** (`under.extend`, after the sewer's extension) — each complex's ratchet step
  (V04 §3.5.1 (5)–(8)) at the epoch, bounded and held as V04 §3.5.1 (5)–(6) state; each new gallery joins
  `EpochScope.elements` and runs U-ACCESS (a)'s overlap test and (c)'s crypt join for a church whose crypt it first reaches
  (V06 §3.18.3 (6)). A complex it founds lays its entrance `stair` (V04 §3.5.1 (9)), and its last step is V01's opening pass
  over that entrance (below).
* **`QuarryWorkings.extend(doc, scope, epoch)`** (`under.extend`, after the catacombs' growth) — V04 §3.5.3's new workings of
  the epoch's stone, mining uses and chains, each commit with its overlap test and mine breach; `workedOut` is read at every
  epoch (V04 §3.5.3).
* **`UndercityEpoch.reread(doc, epoch)`** (`under.undercity`, order 30; then F6 over the clusters `under.access` made
  accessible this epoch) — II.7.5 (5)'s size re-read past `hysteresis`; a shrinking neighbourhood vacates its plots farthest
  (walkway distance) from its core first; a new neighbourhood opens only in free capacity and only in an accessible cluster;
  when `disorder` < `clearanceDisorder`, each neighbourhood draws clearance at `1 − (1 − clearancePerYear)^years` on
  `epoch.transform` keyed by its lineage, at most one `clearUndercity` per epoch, in address order.
* **Access at an epoch (g item 109 (j) (3)–(4); g item 113 (e)).** `under.access` runs
  `AccessPassStrategy.run(doc, rules, ctx, k, scope)` (V04 §3.5.7, *With a scope*): each building the epoch builds, or
  gives a basement, over a cavern, ruin or former-settlement element draws U-ACCESS (d)'s dig draw; the excavation reading is recomputed; a cluster that became `accessible` takes F6's
  new dwellings (V04 §3.4 F6's cut and arrangements), filled by V06's relocation of the district's poorest-band ground
  households (V06 §3.18.1 (4)) — never by S7b (6), whose allocation at an epoch is the crowding hook's alone and runs before
  this pass (below); one that turned `lost` in this pass — its last open path bricked, collapsed or deleted after the
  `decline` step — vacates its dwellings and undercity plots by V04 §3.5.7 (g) (5), as fates of the epoch, its households
  re-housed inside `under.access` (the `afterGrowth` case there; one that `under.fade` closed was vacated at `decline`, its
  households through V06's ledger).
* The crowding hook (II.7.3 (c); V06 §3.6 (1)) sends its households through S7b (6)'s underground allocation at the epoch
  (item 574), at `growth`, before `under.access`: U-FRONT places them on the lived runs first, then on reopened ones (both
  only where `Features.sewers` is on), then in the free capacity of the void clusters accessible before this epoch's access
  pass (F6; V06 §3.6 (1)). They are new households, part of the epoch's target; F6's new dwellings in a cluster the pass
  opens take relocated households only (above), so ground, underground and sky households equal the target (T-V4-72 (f)).
* **Access closures (item 64 (c); item 555).** An access point's own state changes only with its host, at the epoch or edit
  that changes the host: a basement access whose building's use turns to a class whose `undergroundAccess.prob` is 0 at its
  band becomes `bricked` (stored, cause `convert:<the use op>`); one whose building is demolished or whose basement is
  removed is deleted with its host (§2.8); a street grating or stair whose ground host is re-hosted by `pointLocate` onto
  ground II.7.3 does not admit (a footprint over a former street) becomes `bricked`; an access whose ground host a landfall
  covers — its ground point in a member of a `fallen_island` decoration (a covered way, plot, land use or reservation;
  V05 §3.16 (4)–(5)): a grating, a street stair, a public opening, a catacomb stair — becomes `bricked`, cause
  `convert:fallIsland`, until the batch in which that host leaves its `fallen_island` decoration — whichever op ends its
  cover, at an epoch or by hand (V06 §3.5.2, V06's member-leaving batch) — when it returns to `open` (`locked` where its
  `knownTo` is `secret`); a basement or dig access whose building the landfall demolishes is deleted with its host (above);
  a secret access whose building's concealed use relocates stays, `locked`, its `knownTo` unchanged. The `collapsed` and
  element-sealed readings stay II.6's derived ones. Each closure that ends a cluster's last open path turns it `lost`
  (V04 §3.5.7 (g)).
* **The opening pass (J-V4.106) — the one list of the commits that run it.** V01's opening pass (V01 §3.7.1) runs only while
  `@plat/hood`'s local-place step is registered and runs — while `fabric.extensionWeight` > 0 (V01 §3.15); the registration
  is V04 §8's registry lookup, and with either missing no opening place is made and their count is reported (V04 §3.11). It
  selects the public openings of source `opening` and role `access` and each catacomb system's entrance `stair`, and it runs:
  1. at a T6 over every access it selects — at generation's T6 (V04 §3.1) and at the T6 of the tail that follows a
     re-derivation (V04 §4.3's `adjust` and switch rows);
  2. at an epoch, as the last step of `AccessPassStrategy.run` with a scope (over its (e) openings) and of
     `CatacombGrowth.grow` when it lays a new complex's entrance;
  3. in an edit, in the commit of: a `delete` of a selected access; a `setAttr` of its `kind` or `role`; a `placeAccess` that
     makes a public opening (V04 §4.1); the `delete` of a gallery or chamber that carries a selected access (the access
     removed with its element, a fate of the commit, its place tombstoned); a `regenerate` (New random) of a `cavern`,
     `ruin` or `quarry` system — the systems whose elements carry opening candidates (V04 §3.5.7 (e)) — which removes the
     old elements' openings with them, re-runs U-ACCESS (e) over the regenerated elements' candidates (keyed by the new
     elements' lineages), recomputes the excavation reading, then runs the pass over the openings made and removed
     (J-V4.115); a dwelling declaration's closure whose second or third rung makes a public opening (V04 §3.8), over that
     opening; and the re-derivation that an `editTable` or `editPreset` of V01's stage-2 switch `fabric.extensionWeight`
     makes (V01 §3.15, *The switch's edit*), at its T6: raised above 0, the places made; lowered to 0, none made and the
     old ones retired by §6.3's carry-over (J-V4.121).

  A made access gains its `HoodPlace`, named on `naming` by V01 §2.8's key in the same commit; a removed one, or one
  re-kinded out of the selection (its `role` set to `light`), tombstones its place (V01 §2.7); a kind changed within the
  selection re-derives the place's subtype; each is a fate of the commit. A state change (`bricked`, `locked`, the landfall
  closure) changes the place's symbol, never the place.

### 3.11 Failure handling (no whole-map retry; §5)

| where | detection | ladder | report |
|---|---|---|---|
| U-NET outfalls | no admitted candidate on a bank (V04 §3.2 N2, N3) | that bank's moat candidates → its field outfall → its gutters and pits where its stretch of `R`'s boundary is empty or lies wholly on water, or where every stretch cell's D8 path enters a water face before it reaches beyond the outermost enceinte's outer strip (V04 §3.2 N2; F-NET's truncate rung) | `requestedVsBuilt`: "sewers discharge to the town ditch / a cess field"; the unsewered hectares |
| U-NET runs | crown deeper than `coverMaxCm` | re-route ≤ `maxReroute` → truncate to a local root → gutters and pits | F-NET counts, unsewered hectares |
| U-NET drains | a drain's head too deep | the drain dropped, the plot unconnected | the count |
| U-NET wall crossing | the fall across a wall beyond `minGradient` | the drop (V04 §3.2 N7 (3)); a climbing run's cover by the `coverMaxCm` ladder | F-NET counts |
| U-FORECAST vs built | capacity missed | S10b's reconcile, F-SITING (II.7.3) | the miss in households |
| U-FRONT plots | a sample under excluded ground | F-UNDER (II.7.3) | per rung |
| U-FRONT, U-CITY | households the built voids cannot seat | `crowdCap` occupancy → the other underground allocations → T8 (never a ground re-placement by these stages) | the households moved, by step |
| U-SYS | no admissible ground in the band | a smaller extent → the system omitted (F-VOID) | per system |
| U-SYS ruin | a plan too like the town above | the next culture rows (≤ `distinct.retries`) → the axis turned `distinct.rotateDeg` → kept, `W_RUIN_SIMILAR` | the record's `attempts` |
| U-SYS ruin | its dossier source removed | the system kept whole, `source.ref` cleared (V04 §2.6) | `W_RUIN_SOURCE_REMOVED` |
| U-SYS ruin monument | an ST0-infeasible region; a `TierFailure` | `clearM` halved once → the chamber without a monument, `W_RUIN_MONUMENT_SKIPPED`; a `TierFailure` truncates to the tiers laid | the count; `lay.truncated` |
| U-SYS catacomb | a face failing a gate; growth blocked | the next face in rank order; stagnation (`fill` rises, `blockedBy`) | per complex |
| U-SYS forced vaults | the ground refuses the shallow grid | the floor steps below `surfaceClearCm` and the grid grows again | the step |
| U-SYS arch vault | no open face for its door; an inset rectangle below `minEdge` | the vault laid walled up, no door, `W_ARCH_VAULT_NO_DOOR`; no chamber for a degenerate span | the count |
| U-SYS terminal cistern | no yard or public ground takes it | the square shrinks in 10 % steps to 150 m² → skipped, `W_TERMINAL_CISTERN_SKIPPED` | the count |
| U-SYS quarry at an epoch | the stone cells within `reachM` run out before the epoch's `ΔV` | the rest from the surface quarry (a `quarry` land use without a `source`) | the unmet m³ |
| U-SYS buried former settlement | no element of `former` passes V04 §3.5.5 (b)'s filters | nothing laid, `lay` returns null | `W_BURIED_FORMER_SKIPPED` |
| U-ACCESS, U-LINK | a link end with no admissible vertex | the link skipped | the count |
| U-CITY | a void, a core, a lifeline missing | C1's read-only test: the cluster is not a candidate → fewer neighbourhoods → none (F-VOID; never under `require`) | per neighbourhood |
| U-LINK L5 | a basement access, a connector or an outlet missing | the next rung → the cellar chamber (always), `flooded` on wet ground (`W_SUBTERRANEAN_WET`) | the rung used |
| T8 | ground capacity short | vacant stock → occupied stock to capacity → reported, counted | `requestedVsBuilt` |
| U-DIG | a basement, a route or a stage missing | the nearest lawful form or the refusal (F-EDIT, §7.3 item 9 (e)); in a dwelling closure's first rung a building whose connector is refused is passed over for the next, then the base's opening rungs and its bend (V04 §3.8) | in the dry run |
| `Foundations.apply` at an epoch | a new footing over a lived void floor | the floor collapsed, its dwellings vacated and returned for V06's re-homing (V06 §3.18.1 (4)); never a discard | V06's `under.collapsedByFoundation` |
| the opening pass (T6 and the commits of V04 §3.10) | `@plat/hood`'s local-place step not registered (M6-U built beside M5, V04 §8); or registered with the stage-2 switch `fabric.extensionWeight` at 0, so that the step does not run (V01 §3.7.1, V01 §3.15) | no opening place made, the underground kept whole; unregistered, the first tail run after it registers makes them, a declared shift (§13.3); switched off, they are made at the T6 of the re-derivation that an `editTable` or `editPreset` raising the switch above 0 makes (V01 §3.15, *The switch's edit*), fates of that edit (V04 §3.10; J-V4.121) | the count of unplaced openings, the line naming its cause (the step unregistered, or the switch at 0) |

Degenerate geometry follows §5.1 (9) everywhere: each stage's class is the ladder column of V04 §3.1's table, and an
edit's is F-EDIT (§7.1's outcome table).

**The edges of every mechanism.** Each row states the outcome at the mechanism's extremes (E1 no input, E2 one item, E3 the
maximum and its caps, E4 degenerate geometry, E5 missing, empty or contradictory data, E6 every rung, E7 every toggle and
preset, E8 save, load, undo, redo, regenerate and migrate), where its home section does not already state it, its failure
rung and its test (J-V4.124). No edge ends in a crash, a hang, lost data, a silent wrong result or a whole-map retry.

| row | mechanism | edges and outcome | rung | test |
|---|---|---|---|---|
| UE1 | the records (V04 §2.2) | E5: `RuinRecord.source.ref` null and `marker` null are valid states; an absent `name` is drawn by S13a; an empty `tombstones`, an absent `blockedBy` (not blocked) and an empty `ExcavationRecord.reached` (never reached) are valid; a record naming an id the document no longer holds is dropped at load by §7.5's schema check and reported. E8: V04 §2.6's rows | check → leave out and report | T-V4-79 (a), T-V4-33 |
| UE2 | the rule tables (V04 §2.3) | E5: an `editTable` leaving a cell out of its range or empty is refused by §7.6's validation, naming the cell; a class and condition with no fade row is no candidate; an `openings` kind with no row reads `widthCm` 0 and transmits no light. E8: a table edit is an event with §7.4's `editTable` row; an older document reads the shipped defaults | check | T-V4-79 (b) |
| UE3 | the dossier row sets (V04 §2.3a) | E5 as V04 §2.3a's *Edges*; E8: a dossier event re-evaluates the matches by §7.7 item 5's least-disruption mutation; the row sets are shipped, never edited | check → leave out and report | T-V4-38 |
| UE4 | the transients (V04 §2.4) | E5: V04 §2.4's closing sentence; E8: never persisted, recomputed | — | T-V4-79 (a) |
| UE5 | identity (V04 §2.5) | E5: key collisions and gone sources as V04 §2.5 states; E8: keys are lineage hashes, stable through save, load and every re-derivation (§6.3) | — | T-V4-30, T-V4-79 (a) |
| UE6 | the lifecycle rows (V04 §2.6) | E5 and E8: each row's `absent` column is its missing-data rule; a round trip of every field (save, load, undo, redo) is byte-identical | — | T-V4-33, T-V4-79 (c) |
| UE7 | the tail (V04 §3.1) | E1: empty inputs commit nothing and report zeros; E2: one district, one run, one void lay as many; E3: the METROPOLIS caps and budgets are V04 §6's; E4: §5.1 (9) on the table's ladders; E5: no dossier reads the recipe; E6: the rung set of V04 §3.1; E7: the parity presets (T-V4-35), the Sewers and ruins toggles (V04 §4.3's `adjust` row); E8: a replay runs the tail at the same fold position, byte-identical | each stage's ladder | T-V4-30, T-V4-35, T-V4-43, T-V4-75, T-V4-79 (d) |
| UE8 | U-NET (V04 §3.2) | E6: N0's rung gate — never below TOWN, at TOWN by the draw or the dossier, always at CITY and METROPOLIS, an inherited network in maintenance mode | — | T-V4-79 (e), T-V4-35 |
| UE9 | U-FORECAST (V04 §3.3) | E1–E8 as V04 §3.3 states (gates, the all-zero record, the standalone line, never persisted) | — | T-V4-8, T-V4-75, T-V4-79 (f) |
| UE10 | U-FRONT (V04 §3.4) | E1: F0's gate — no allocation or no open navigable run commits nothing but F6; E4: a kerb edge below `minEdge` is no frontage, a degenerate cut takes F-PLOT's ladder; E6: F0–F5 at TOWN and above where navigable runs exist, F6 at every rung | F-PLOT, F-UNDER | T-V4-9, T-V4-79 (g) |
| UE11 | U-CITY (V04 §3.6) | E1: `n` 0 or no candidate forms none (never under `require`); E2: one neighbourhood takes all of `H` up to its capacity; E4: a carve the kernel refuses makes the cluster no candidate, a walkway edge below `minEdge` is dropped; E5: `require` with no void → the forced vaults, `forbid` → U-CITY does not run; E6: TOWN and above, re-read below; E8: V04 §3.6's closing paragraph | F-VOID | T-V4-18, T-V4-37, T-V4-79 (h) |
| UE12 | the cross-arena distance (V04 §3.6a) | E5: no admissible access reachable → +∞, read as out of reach | — | T-V4-60, T-V4-79 (i) |
| UE13 | U-LINK (V04 §3.7) | E4: a lifeline point the kernel refuses takes L1's next candidate, then the lifeline closure; E6: V04 §3.7's closing sentence; E8: generated pieces re-derive with their owner, edit pieces are held, L5 pieces released by the dossier (V04 §3.7 L5) | F-VOID | T-V4-34, T-V4-79 (j) |
| UE14 | T8 (V04 §3.7a) | E1: nothing to seat writes nothing; E2: one household to the first building of the order; E4: no geometry is written; E6: at every rung | F-SITING | T-V4-3, T-V4-79 (k) |
| UE15 | U-DIG (V04 §3.8) | E1: no target and no outlet → §7.3 item 9 (e)'s refusal with its reason; E2: one qualifying building digs, no alternatives listed; E4: a connector path the simplification would collapse to one cell is a direct access; E5: a missing basement takes §2.6's requested-mode ladder; E6: every rung, an outlet kind with no candidate skipped; E8: held and generated pieces as V04 §3.8's *Keys* | F-EDIT | T-V4-22, T-V4-48, T-V4-79 (l) |
| UE16 | light rows (V04 §3.9) | E1: no host → no light; E2: one host takes its row's count; E5: a missing circumstance reads `none`; E6: at every rung where the host exists; a ceiling under 60 cm takes none | — | T-V4-26, T-V4-79 (m) |
| UE17 | U-FADE (V04 §3.10) | E4: a run of 120 m or less is struck whole; a stretch split the kernel refuses strikes the whole run | — | T-V4-23, T-V4-79 (n) |
| UE18 | the failure ladders (this section) | every row's ladder on a fixture forcing its detection | — | T-V4-79 (o) |
| UE19 | determinism (V04 §3.12) | E4: a kernel refusal is deterministic on the same key, so a replay refuses the same entity; E5: every entity has a lineage (§6.3), and a fixed-key draw whose subject is gone is never re-drawn for another | — | T-V4-30, T-V4-79 (p) |
| UE20 | declarations (V04 §4.1) | E1: a form short of its points commits nothing, the tool waiting for its next point; E2: `drawChamber` with one point takes the size; E4: coincident or collinear points make no shape, the form staying open (no degenerate shape reaches a commit); E5: a point on the sky layer or a raised deck reads ground part 0; E7: with Ground the working layer the tools act on the ground (T4 draws a way), the underground hidden or shown; with Below the working layer they act Below, a hidden underground drawn in that view (§8.4); E8: §7.4's rows | F-EDIT | T-V4-36, T-V4-79 (q) |
| UE21 | attribute paths (V04 §4.2) | E3 and E5: a value outside its range is bent to the nearest lawful value, the bend named (J-VI.4); E4: a width or headroom at its minimum keeps a band the kernel admits, a lower one bent to it; E8: the inverse | F-EDIT | T-V4-36, T-V4-79 (r) |
| UE22 | locality (V04 §4.3) | E4: a degenerate edit shape is refused before any re-derivation; E6: the rows hold at every rung, an inherited system in maintenance mode laying nothing new | F-EDIT | T-V4-31, T-V4-79 (s) |
| UE23 | undo (V04 §4.4) | E5: an undo whose target a later dossier event changed follows §7.4 (the dossier's precedence: restored where it can, the rest reported) | — | T-V4-79 (t) |
| UE24 | the clerk's view (V04 §4.5) | E1: a document with no underground answers the key `info.under.none`; E2: one element answers as any; E8: pure reads, recomputed after every load, undo, redo and regeneration | — | T-V4-78 |
| UE25 | migration (V04 §4.6) | as V04 §4.6 states | — | T-V4-33 |
| UE26 | read-ahead (V04 §4.7) | E5: a declaration naming a system the document lacks makes it exist (a declaration is a fact, V04 §4.7); two held runs that cross unjoined are joined at their crossing (N10's crossing junction, `W_NET_CROSS`); one a stage cannot honour otherwise is refused at its dry run with the reason and the closest alternatives (item 20 (g)) | F-EDIT | T-V4-40, T-V4-79 (u) |
| UE27 | the view (V04 §5.1) | E1: with no non-empty band the layer draws the ghost only, the band ladder empty with the key `info.under.none`; E2: one band is the drawn band; E7: the layer hidden — not drawn, or drawn in a view whose working layer is Below (§8.4) —, each `underView` mode, `showUnexcavated` on and off (drawn only for `secret`) | — | T-V4-27, T-V4-79 (v) |
| UE28 | marks and programs (V04 §5.2) | E1: an empty band draws no rock; E2: one element draws its halo; E4: a mark of zero length or area is not written; E6: the same programs at every rung | — | T-V4-27, T-V4-79 (w) |
| UE29 | light (V04 §5.3) | E1: no source → the ambient alone; E6: at every rung | — | T-V4-25 |
| UE30 | labels (V04 §5.4) | E5: a missing name is drawn by S13a; E6: at every rung | — | T-V4-79 (x) |
| UE31 | exports (V04 §5.5) | E4: a zero-length or zero-area feature is left out of the export and listed in its log; E6: at every rung; E7: the parity presets export only the hidden sewer; the layer's visibility never changes the per-band export | leave out and report | T-V4-28, T-V4-29, T-V4-79 (y) |
| UE32 | Find on Below (V04 §5.1) | E1: no chip, or no match Below, draws nothing Below and counts 0; E2: one match glows or pins as any; E3: at the city band every match has a pin or a count bubble (item 120 (k)) — a match whose element is under about 6 px carries its chip's pin, and pins and ghost pins closer than about 24 px merge into a count bubble by §8.2's rule, up to the metropolis cap; Show gaps Below: every `district` unit Below without a member — each undercity neighbourhood and the underground pseudo-district — is outlined dashed "none here", and a `walk` or `households` unit reads `underDistance` (V01 §5.4 (3); V04 §3.6a (5)); E5: an element of an `unexcavated` cluster is absent below `secret` and a ghost pin at `secret` while its cluster is not drawn; E6: at every rung where the layer has a match; E7: the layer not drawn — hidden and not the working layer (every match Below a ghost pin), each `underView` mode, `showUnexcavated` on and off; E8: a view — the chips saved in view pins, re-evaluated after load, undo, redo, regenerate and migrate and at each change of the drawn week (a frame not the head: the frame's matches, bands and glow shapes, V04 §5.1 (7)), the document never changed | — | T-V4-81 ((c) the gaps, (f) and (j) E8, (i) E3) |
| UE33 | the damage below ground (V04 §5.6) | E1: a building never decayed (level 0), and an underground none of whose buildings has decayed, draw byte-identically to the build without the layer (`item123.damage`); E2: one element past its threshold is drawn damaged alone, and a crypt whose ring holds no cell centre of its column grid has one `cryptVault`, its room's ceiling whole; E3: at level 1 every element below ground is past its threshold — a cellar and a crypt draw partly collapsed, every room, wall line, way down and join kept (a ruined church keeps its crypt), the lowest storey's floor walkable; a restoration lowers the level, the damage leaving in reverse threshold order, a repaired element drawn in patch material (V06 §3.23 (3)); E4: a crypt-only basement on its ring alone takes its crypt's kinds only, a grid cell whose centre lies outside the ring is no bay, and an element a plan edit removes leaves with its part; E5: a kind with no V11 row, and every building before V06's level lands, read as V06 §3.23 (4) states; a building over a void whose cellar vault has fallen keeps its dig access, a church its crypt join — no stage reads the level; E6: every rung where a basement, a crypt or an underground building stands; E7: every toggle and preset alike, the parity presets included (a look); the layer hidden draws none of the underground view's part, a plan's storey below 0 still drawn; Show crises on and off under a disaster's look (item 122 (d)): a church of one of the look's units (§10.2 (d)) draws its crypt at the higher of its own level and the look's while the look stands over the church (the condition's weeks, until a Works begun on it hands it over, V06 §3.22 (3)) and at its own level outside them, no patch left, its join kept, and an underground building, in no look's unit, at its own level (V04 §5.6 (1)); E8: a reading — save, load, undo, redo, regenerate and migrate re-read it at the drawn week, an undone restoration giving back the level its events give | — | T-V4-82 |

**Where the underground meets the other units.** Each combination's outcome at its limits, with its rung and test (the
fixture of each row runs at every rung the row names).

| row | combinations | outcome | rung | test |
|---|---|---|---|---|
| UC1 | a cliff (a bank of kind `cliff`, or terrain whose slope exceeds the barrier table's `cliff` threshold over its height, §4.3) × the sewer | where a run's centreline crosses cliff terrain, N6 inserts two vertices where it enters and leaves it (sampled at the terrain cell), each at its own `levelledGroundCm`, and the segment between them is a drop exactly as N7 (3) makes one at a wall; a run never leaves by a cliff face (outfalls lie on water or on the field outfall's path) | F-NET's cover ladder | T-V4-80 (a) |
| UC2 | a cliff × a cavern, a void, a ruin | a cavern gallery meeting a cliff face is a `mouth` candidate there (its cover falls to 0 at the face), drawn by U-ACCESS (e); a ruin or former-settlement element whose ceiling would stand less than 100 cm under the present ground at a cliff's foot is created `collapsed`, cause `decay` (the face eroded it); a quarry working's adit ends in its `mouth` at the face | — | T-V4-80 (a) |
| UC3 | a cliff × a catacomb | the level floor refuses every node past the cliff (`blockedBy: 'depth'`), and a node whose cover at the foot falls under `coverM` likewise, so a catacomb never breaks out of a face | stagnation | T-V4-80 (a) |
| UC4 | a cliff × the undercity, an access, a vault | nothing new: a cliff mouth counts for L1's *access* and *a route outside* as any `mouth`; an access's ground point never lies on cliff terrain (a generated one slides as N11's sites do, `placeAccess` moves it to the nearest point off it, reported); no vault source stands on a cliff — a street vault's stretch leaves a stair or cliff interval out as a wall's (V04 §3.5.4 (b)), and a span over one fails the span rule's height or slope test and stays open (§2.7) | — | T-V4-80 (a) |
| UC5 | steep ground × the sewer, a cavern, a ruin, a catacomb, the undercity, a void, an access, a vault | steep ground only steepens: N7's inverts follow it within the cover bounds (no maximum fall, the cover ladder unchanged); a fissure prefers it (V04 §3.5.2); a ruin's `terraced` family and the smoothed ancient ground absorb it, UC2's erosion rule applying; the catacomb's level floor refuses it (`depth`); the carve's depth-band test refuses it; an access's kind follows its drop; a street vault is its product (V04 §3.5.4 (b)) | each kind's own | T-V4-80 (b) |
| UC6 | a coast × an access | no access's ground point lies in a water face: generated ones stand on land (an outfall's `mouth` hosts on the land face at `at`; a candidate under water is none); `placeAccess` on water is bent to the nearest shore point, the bend named | F-EDIT | T-V4-80 (c) |
| UC7 | a moat × a cavern, a ruin, a catacomb, an access, a vault | an older void's element under a moat's water face within `surfaceClearCm` is created `flooded`, deeper ones by the water table; a later system never passes under it (the shallow-element rule; a catacomb node is refused `wet`); an access stands on land (UC6); no vault lies under a moat — a bridge vault stands at a deck end on its bank, a drawbridge (`draw`) takes none, cisterns and street vaults stay under public ground | — | T-V4-80 (c) |
| UC8 | a bridge × an access | an access's ground point on a bridge deck over water is no candidate (N11 slides it off; `placeAccess` is bent to the nearest bank point); a bridge vault's `stair` stands on its approach way on land | F-EDIT | T-V4-80 (c) |
| UC9 | a deck plot (item 110 (d)) × the sewer, a cavern, a ruin, a catacomb, the undercity, a void, an access, a vault | a deck building has no basement, no dig floor and no crypt (V02 §3.16 (6)): it is never a dig host, an L3 host, a crypt-join host or a lifeline's chimney; N8 reads ground part-0 plots only, so a deck plot is never connected and never counted unsewered; it adds no foundation obstacle (the deck's piers are the obstacles); it is never a burial face; `placeAccess` in one is bent to the nearest part-0 point; an arch vault and the deck plots above its span coexist, the vault at grade under the deck | F-EDIT | T-V4-80 (d) |
| UC10 | an oasis (item 111) × the sewer | an oasis's water is never an outfall candidate (N2 skips a `WaterBody` carrying `spring`, §2.3: the town's own water), so a sewered oasis town discharges to a field outfall or another admitted water | the field outfall | T-V4-80 (e) |
| UC11 | an oasis × a cavern, a ruin, a catacomb, the undercity, a void, an access, a vault | an oasis is water for every rule that reads water (g item 111): no later-system element under its face, catacomb nodes refused `wet` on its damp ground, older elements `flooded` below the water table; its wells are well pins for U-ACCESS (f); the cistern test's `dist.water` reads it (a precinct beside it takes no cistern); L1's water rows are unchanged | — | T-V4-80 (e) |
| UC12 | the frame × a cavern, a ruin, a catacomb, the undercity, a void, an access, a vault | every system lays inside its L0 margin ring (the frame plus its context margin): an element crossing it is clipped by the kernel — a gallery ending there sealed, with no opening, a chamber kept where its inside part reaches its kind's `minM2`, else not laid; a catacomb node beyond it is refused `reach`; the carve and every access's ground point lie inside the frame (else no candidate); an arch vault is laid only for a span inside it; a ruin's outline is clipped and re-centred (V04 §3.5.0a (3)) | leave out and report | T-V4-80 (f) |
| UC13 | a standalone neighbourhood document × vaults | the standalone line: only a declared raised way's arch vaults and terminal cistern (V04 §3.1, V04 §3.5.0) | — | T-V4-75 |
| UC14 | a terraced ward (V01) × the sewer, a cavern, a ruin, the undercity, an access, a vault | the wall crossings and drops (V04 §3.2 N6–N7); the retaining walls' footings as foundation obstacles (V04 §3.5.0) for voids and the carve; an access's drop measured from its terrace's own datum (`levelledGroundCm`); a street vault never at a wall's stair (V04 §3.5.4 (b)); a raised grade over terraces keeps the steps (V04 §3.5.5 (a)) | each rule's | T-V4-67, T-V4-65, T-V4-15, T-V4-80 (g) |
| UC15 | a composed building (V02) × the sewer, a cavern, a catacomb, the undercity, an access | a composed building is a building: its footprint and basement floor are V02's (V02 §3.14.5 (f)), read by the shallow-element rule, the dig draw (its key carrying a mutator-added wing's key, V02 §3.9 W6) and L3; N8 connects its plot as any; a church's crypt is its basement's (V03); the undercity's buildings compose by `UndercityRule.arrangements`, heights ceiling-capped | — | T-V4-30, T-V4-80 (h) |
| UC16 | a tiered building (V02) × an access | its footprint and basement are its ground tier's; an access heads in its basement by V03's access head as any | — | T-V4-80 (h) |
| UC17 | a cavern or a ruin × undo | an excavation's undo returns its clusters to `unexcavated` (its `ExcavationRecord` entries leave); an undo of a closing commit restores `accessible` and the dwellings byte-identically; a New random's undo restores the elements, openings and opening places (T-V4-17) | — | T-V4-17, T-V4-48, T-V4-76 (b) |
| UC18 | a vault × a lock | a locked vault element is held against every generator: U-FADE never strikes it (its candidates exclude locked elements); a reconcile or regeneration that would re-lay, collapse or delete it keeps it — at an epoch reported with E_LOCKED's cause, at an edit's dry run returned E_LOCKED (§7.3), the user free to unlock; the removal of a raised way or a span's `open` with a locked arch vault under it is refused E_LOCKED until it is unlocked | check | T-V4-80 (i) |
| UC19 | water — a river, a canal, a moat or the harbour, with its bridges and any pier, mole or quay platform over it — × the sewer | no sewer edge, run, knot, grating, drain run or passage lies over a water face (V04 §3.2 N3: a `Bridge`'s deck span whatever its way's class, the `bridge`, `pier`, `ford` and `aqueduct` classes and every spine stretch over water left out of the `SewerGraph`; N8 and N9 the same); each bank drains to an admitted outfall on its own bank, the outfall cap keeping each bank's largest root; a bank with none takes its own moat candidates, then its own field outfall, its D8 path and outfall run over land only (V04 §3.2 N2), and a bank with no dry stretch of `R`'s boundary, or none whose path reaches beyond the outermost enceinte's outer strip without entering a water face, drains by gutter and pit, its area reported unsewered — never a crossing; a drawn or prefix-declared run that would cross water is bent at the bank, the bend named (V04 §4.1) | F-NET's truncate rung | T-V4-80 (j) |
| UC20 | a catacomb growing into a sewer (the owner's named combination) | the growth's course is never bent for the sewer, and a sewer run refuses no node (V04 §3.5.1 (4): `system` reads another complex of the catacomb's own part); each gallery or chamber of the growth that meets a run where their vertical intervals intersect commits one typed opening in the growth's commit — a `breach` link, cause `overlap` naming the catacomb system and the epoch's `seq`, its kind by `LinkRule.kinds`, a builders' grille reading `gated` (V04 §3.5.7 (a)) — one per meeting element pair; no element moves or changes system (two parts, never a merge) and the run's knots, profile and `serves` are unchanged; a complex passing over or under a run at another depth is linked only by U-ACCESS (b)'s chance or the overlap shaft's; the opening is a path of the connection graph like any link | — | T-V4-80 (k) |
| UC21 | item 123's damage × the underground's access model — a ruined church whose crypt is joined to a catacomb, a ruined building over a cavern with its dig access, a cellar under a decayed building over a ruin, the buildings of a cluster turned `lost` | a drawing only (V04 §5.6 (4); J-V4.130): every access, link, crypt join, `ExcavationRecord` entry and excavation state is the same at every level, so a scrubbed week never opens or closes a way; a damaged stair core below 0, with any access head on it, draws as rubble over steps still climbable; a way closes only by this volume's closure states, and a `lost` cluster stays lost whatever its buildings show; a building in a `collapsed` or `flooded` element draws that element's §8.2 `states` row over its own damage | — | T-V4-82 (d) |

### 3.12 Determinism (§6)

Every draw is listed, each on an existing concern (§6.1), its stream keyed by the stage id, the entity key and the salt
named: the `pit` connection (`sewer`, the plot); the systems' existence and each source's chance (`sewer`, kind and source);
the ruin's existence (`sewer`, its source or the town root), its culture row and shared axis, its axis jitter,
significance, extent and age (`sewer`, the ruin), its decay survival (`sewer`, the element); each burial-face candidate's
chance (`sewer`, the face); a cavern's meander and hall vertices (`sewer`, the path's start cell); a volcanic tube count
and a fissure count and each fissure gallery's width and headroom (`sewer`, the cavern system, the gallery); the
undercity's existence (`sewer`, the settlement, `undercity` — drawn once at S7b by P6 and re-read by C0; C1's split is
deterministic, no draw); the undercity's rank pick (`sewer`, the settlement, `undercityRank`); a lifeline's knowledge
(`sewer`, the district); each proximity link (`sewer`, the element pair and station); each overlap shaft (`sewer`, the
element pair); each opening (`sewer`, the candidate element and the opening kind); each dig (`sewer` in U-ACCESS, the
building, salt the void kind and, for a wing V02's mutator adds over a void, that wing's key; V04 §3.5.7 (d)); each crypt
join (`sewer`, the church and the complex source); the quarry ossuary's chance
(`sewer`, the working); each basement access (`sewer` in U-LINK, the building — item 64's draw, a different stage from the
dig draw, so neither shifts the other); U-DIG's pieces (`sewer`, the edited entity, the target, the event's `seq`; at
generation the district's lineage for a lifeline, the institution's binding key for L5); the ruin's magic lights (`sewer`,
the chamber); a monument's ST1 draws (`sewer`, the ruin system, the chamber's plan coordinate, `'tiers/0'` then
`'tiers/1'`, the attempt index on an ST6 retry), its tier decay (`sewer`, the chamber's key, `'tiers/decay'`, the tier's
index) and each colonnade row's survival (`sewer`, the chamber's key, `'colonnade'`, the row's index); the underground plots
and buildings (`plot.*`, `siting`, `siteplan`, `heights`, keyed from their pseudo-district or neighbourhood); door-light
sides (`pin.light`); the fade and clearance draws (`epoch.transform`); T8's placements (`siting`, the receiving district);
and names (`naming`) — no new concern (§6.1). A span's `use` is the base's draw on its raised-way stream (item 244), fixed
before the tail; V04 draws nothing for an arch vault or the terminal cistern, so the arch-vault set never depends on the
order districts are opened (T-V4-70).

**The fixed-key draws** (§6.1's pattern). At an epoch the keys take the epoch component (§6.1) except these, each a
fixed-key draw — fixed by its key and never re-drawn (V06's J-V6.52, T-V6-34): the dig draw (the building's lineage
carries its epoch; a made access persists, and one not made appears when the chance later rises above the draw, V04 §3.5.7
(d)); the catacomb source draw (keyed by the face's lineage; a quarry ossuary's by its working; compared again against
CITY's chance when the rung rises, V04 §3.5.1 (3)); each public opening's draw (keyed by its element and kind, drawn in
V04 §3.5.7 (e)'s candidate order); each overlap shaft's (keyed by its element pair, at `links.overlapShaftChance`); and the
crypt join (keyed by the church and the complex source, at `cryptJoin.own` or `.other`). So a building's dig draw at the
epoch that builds it equals the one a regeneration of that epoch gives (prefix-stable), and a face refused its catacomb at
TOWN compares the same draw against CITY's chance when the town becomes a city.

`QuarryWorkings.extend` and `SewerStrategy.derive` at an epoch draw nothing new but the network's `pit` draws. The standalone
line, `Foundations.apply`, the village-working test, the buried floor's terrace steps, `BuriedFormer.lay` and the excavation
reading (the `lost` state and its memory included) draw nothing; nor does the damage below ground, whose thresholds are
§6.3's `plan.damage` draws keyed by the building's lineage and the element's id (V04 §5.6); the opening pass's names are
V01's draws on `naming`
(V01 §2.8). Every loop runs in address order; every search breaks ties by address or index; the tail runs serially on one
worker; every length is an integer centimetre and every transcendental goes through `dmath` (§6.5). A New random on a
system, a tunnel run or an undercity neighbourhood advances its reroll and writes only its own part, but for its links'
far ends (§3.4), the carve's split parts (V04 §3.6 C2) and, on a `cavern`, `ruin` or `quarry` system, V01's opening
places over the openings U-ACCESS (e) makes and removes (V04 §3.10); a New random on the catacomb system removes nothing
(V04 §3.5.1 (6)).

## 4 Editing

The edit kinds are §7.1's (the underground tools row of its edit-target table), their lifecycle rows §7.4's and the
closure rule §7.3 item 9's. This section adds what they need to be built: the points forms, the attribute paths with
their ranges, the locality of each, and what the clerk sees.

### 4.1 Declarations — points in, shape out (item 101 (i); item 355)

| event | its points form | the dry run derives | the handles |
|---|---|---|---|
| `drawTunnel` (sewer, no `system`) | two points; the kind optional | a route: where both points lie within `outfall.linkM` of ways, U-NET's tree search between the nearest graph nodes (N3's costs); else the straight segment; a route or segment that would cross a water face is bent to end at the bank on the first point's side, the bend named (a sewer never crosses water, V04 §3.2 N3; item 101 R2, J-VI.4); an end within 2 m of a run joins it (a junction); the kind, when not given, a `main` where either end lies within `outfall.linkM` of a way, else a `drain`; the profile by the kind and the preset; the invert by N7 from the lower end; `navigable` derived; the overlap test (U-ACCESS (a)) at commit | four to eight vertices of the route; the ends |
| `drawTunnel` with a `system` (a gallery) | two points | a catacomb or quarry gallery an L-route on its system's grid axis; a `ruin` gallery an L-route on the ruin's `axisDeg`; any other a straight segment; the floor from the nearer existing element of the system, else the row's depth range's middle (a ruin's: `g(p)`, V04 §3.5.0a (4)) | as above |
| `drawChamber` (with `system`, item 355) | one point and a size, or three or more points | a rounded rectangle of the size aligned with the nearest gallery of the system (a `ruin` chamber: a right-angled rectangle on the ruin's axis, kind `room` unless a kind is given), or the polygon; floor from the nearest element; `kind` the row's first chamber kind | the corners |
| `drawChamber { system: { newKind } }` (item 361) | as `drawChamber` | a closure (§7.3 item 9) creating the `UndergroundSystem` with this chamber as its first: a `ruin` with its `RuinRecord` of source `declared`, its axis the chamber's (V04 §4.7); a `cavern` of the site's geology; a `catacomb` by §7.3's *A new catacomb from a chamber* ladder (bent, never refused); its undo removes the system and the chamber | the corners |
| `addLink` | one point on each of two elements of different parts | the elements (nearest within 5 m), `via` by the floor difference (U-ACCESS (b)'s rule), kind `open` unless given, cause `edit` | the two ends |
| `placeAccess` | one ground point | the element nearest below it within 10 m in plan on any part (shallowest first); the kind by the drop and the host: on public ground (V04 §1.2) II.7.3's neighbourhood kinds — a street `stair` where the drop is within `stairMaxDepthCm`, a `well` shaft in a yard or square, else a `shaft` (a `grating` of role `air` when asked); in a building the basement kinds (II.7.3 (3)); role `access`, cause `edit`. Asked for a public opening's kind (`sinkhole`, `mouth`, `collapsed_shaft`, `ruin_entrance`), it makes that opening at the nearest opening candidate of that kind within 10 m (V04 §3.5.2's, V04 §3.5.0a (8)'s, V04 §3.5.5 (b)'s and `UnderOpeningRow`'s, whatever its draw gave): source `opening`, role `access`, cause `{ rule: 'edit', system, event }`, `knownTo` by U-ACCESS (e)'s rule, and V01's opening pass places it in the same commit (V04 §3.10); with none within 10 m it is bent to the nearest candidate of that kind, and with none at all to the ordinary kind at the point, the bend named in the dry run (J-V4.107; item 101 R2, J-VI.4). Over a sealed (`unexcavated` or `lost`) cluster it is the user's excavation — the finding, or the refinding of a lost one: the dry run lists every cluster that becomes `accessible`, transitively, and says that dwellings come at the next Re-derive from S7b or the next epoch | the opening and the underground end |
| `addUndergroundAccess` | the building (a click) | the closure (V04 §3.8); with no `target` and grouped before a dwelling declaration on a sealed cluster (V09 §4.17.4's **Use another building**), its target by V04 §3.8's grouped-access rule (item 372) | the access; the connector's vertices |
| a raised way added (the base's T4 `road` with `raised`, or the aqueduct class; g item 110 (b)) | the base's | the base's spans with their `use` by §2.7's span rule (item 244); V04's arch vaults of its `vault` spans and, for an aqueduct with a `cistern` terminal, its terminal cistern, shown as fates in the same dry run | the base's |

**Two reads every points form shares.** A ground point is read on ground part 0: a point on a raised deck resolves to the
ground beneath it, a click on the sky layer resolves to ground part 0 beneath it (no island building or face is ever a
host, V04 §1.2), and one inside a raised-way pier's footprint moves to the nearest free part-0 point, the move reported in
the dry run. An access from a church-class building (its class's crypt column `always` or `basement`) to a catacomb element
— by `placeAccess` in it or `addUndergroundAccess` naming a catacomb target — is a hand crypt join: source `crypt`, cause
`{ rule: 'crypt', system, event }`, its head in the crypt; a building without `Basement.crypt` is bent: the
dry run adds its crypt (`setAttr(basement)` on `basement/crypt/ring`, V03 §4.2) and joins from it, the bend named (J-V4.89;
J-VI.4).

A dry run shows the derived shape as a ghost with its fates; accepted, the shape is stored resolved and no later derivation
moves it (declared means held, §7.2; N3a). The toolkit's layer is the view's working layer
(V09 §4.2's switch, a per-viewer view key; Below drawn whatever its visibility, §8.4): while Below is the working layer
the road tool T4 draws a tunnel or a link, the place tool T6 a chamber or an access, the shape tool T9 every attribute below (V04 §1b.3) — no thirteenth tool
(§13.2's elegance bars). The forms' edges are V04 §3.11's row UE20.

### 4.2 Attribute paths (`setAttr`), with ranges and effects

| entity | path | range | effect (re-derived, locally) |
|---|---|---|---|
| tunnel | `kind` | `drain`, `main`, `culvert`, `passage` (a `passage` only in the navigable preset) | the profile row re-read; `navigable` re-derived; its bands |
| tunnel | `widthCm`, `headroomCm` | 40–600, 60–600 | `navigable` re-derived; its bands; a run turning non-navigable lists its frontage plots as fates (vacated, their faces residue) to confirm |
| tunnel | `depthOffsetCm` | such that every crown stays ≤ `coverMaxCm` | N7 re-run over the connected network's inverts (plan unchanged); an offset past the cover limit is bent to the nearest lawful offset, the bend named (item 355; J-VI.4); the overlap test at commit |
| tunnel | `name` | text | `Tunnel.name` (item 247), a protected name (§2.8) |
| gallery | `widthCm`, `headroomCm`, `elevationCm`, `knownTo` | 60–800, 150–1 000, inside its system's `depthM` | its bands; a floor crossing another element of its part at another band is bent to the nearest floor that crosses none (II.7.6), the bend named; the overlap test at commit |
| chamber | `kind`, `ceilingCm`, `elevationCm`, `knownTo` | the row's kinds (`ChamberKind`) — `archVault` only by the arch source, a `setAttr` to or from it bent to the span's `use` edit, its first alternative, the kind kept; ≥ 200; the depth range | the plots under it re-capped (II.7.5); a lowered ceiling re-fits the buildings by S11's mutator and cuts a monument's tiers by V04 §3.5.0a (5a) |
| ruin chamber | `monument/count` | 2 … the `stepped-monument` row's `count` maximum at the monument's band | re-laid by `layTiers` with the same draws, `n` replaced; the ceiling cut and the decay re-run; the plots on its floor re-cut where they meet the new rings |
| raised way span (the base's path `spans/<a>-<b>/use`, item 244) | `use` | `open`, `vault` | a held user edit, kept through regeneration; V04's reconcile lays or removes that span's arch vault in the same commit, a removal listing its links, accesses and any declared institution in it as fates |
| catacomb complex | `fill` | 0–1 | its ossuaries' drawing; later derivations only raise it (V04 §3.5.1 (7)) |
| link | `kind`, `knownTo`, `via` | II.7.6's values | its marks; the excavation reading re-derived (a `collapsed` or `flooded` kind on a cluster's last open path turns it `lost`, its vacated dwellings listed as fates) |
| access point | `kind`, `role`, `state`, `knownTo`, `ground.at` | II.7.4 (with item 554's kinds) | re-hosted by `pointLocate` (§7.1); a `state` of `bricked` on a cluster's last open path lists the cluster turning `lost` and its vacated dwellings as fates; a `kind` or `role` change on an access V01's opening pass selects runs the pass in the commit, its place re-derived or tombstoned as a fate (V04 §3.10) |
| undercity district | as a ground district (§7.1's districts row) | — | — |

A tunnel's condition is never a path (J-A11.21): `convert` `silt`, `caveIn`, `seal`, `reopen`, `flood` (§7.1).

### 4.3 Locality (§7.3; J-V4.14)

| edit | re-derives | byte-identical |
|---|---|---|
| a tunnel drawn, moved, re-profiled or deleted | U-FRONT on the part-0 blocks its edges bound (II.7.2); N8 for the plots within `reachM` of it; the lights of those blocks; the overlap test for the drawn or moved run; the excavation reading | the ground; every other part but a new link's far end; the rest of part 0 |
| a depth offset | the inverts of the connected network (knots only); the overlap test | every face and plot |
| a ground edit (way, plot, building, field) | the part-0 blocks, and the undercity blocks under a ceiling within `surfaceClearCm`, whose recorded ground cells its clear region covers (II.7.3); N8 for the plots it re-cut; a building created or given a basement over a cavern, ruin or former-settlement element draws U-ACCESS (d) in the edit's commit, keyed as at generation; the access closures of V04 §3.10; the excavation reading; nothing of the network's plan — sewers outlive the streets above them. A tunnel whose followed way is deleted keeps its course, `follows` absent; one whose way is split re-points `follows` to the part over the run's midpoint | every tunnel's geometry and invert |
| a water edit moving a shore that holds an outfall | the **outfall re-seat**: the run's `Tunnel.outfall.at` moves to the nearest point of the same water body's shore, its last segment extended or shortened within `outfall.linkM`; beyond it, F-EDIT names the stranded outfall and offers Re-derive from the network stage | every other run |
| a water or terrain edit that puts water, or the water table, over a void element whose ceiling lies within `surfaceClearCm` | each such gallery and chamber converted `flooded` (II.6) as fates of the edit, or, where `flood` is not admitted, reported `W_VOID_UNDER_WATER` | the rest |
| a terrain edit | nothing moves; runs whose crown cover falls below `coverMinCm` are listed in the fate report (`exposed`); S1's water operator recomputes `Terrain.outfalls` wherever D8 re-runs | all |
| the commits of V04 §3.10's opening-pass list (3) | V01's opening pass over that access: its `HoodPlace` made and named, re-derived or tombstoned, a fate of the commit | every other place |
| an edit that closes a cluster's last open path — a `delete`, `seal`, `caveIn` or `bricked` of its last access, or of a run, link or element that path depended on | the excavation reading: the cluster turns `lost`; its F6 dwellings and undercity plots abandoned by V04 §3.5.7 (g) (5), listed as fates in the dry run; its undo restores `accessible` and the dwellings byte-identically | the rest |
| a dwelling declaration on a sealed cluster, alone or after its grouped `addUndergroundAccess` (item 372) | the closure's way in (V04 §3.8: U-DIG's pieces from the building that digs, or the base's opening rungs with V01's opening pass); the excavation reading; the declaration's own pieces on the cluster it opens | the rest |
| an `editTable` or `editPreset` that changes the resolved `fabric.extensionWeight` (V01's stage-2 switch, V01 §3.15) — across 0, or inside (0, 1] | V01's re-derivation of the edit (V01 §3.15, *The switch's edit*: from the switch's first reader stage, S2, with §6.3's carry-over), then T1–T8 as after the `adjust` row's Re-derive — the re-cut plots and buildings drawing U-ACCESS (d) and the access closures (V04 §3.10) as the ground-edit row states, the excavation reading recomputed. T6's opening pass runs under the new gate: a place is made for each selected access where the switch rose above 0; where it fell to 0 none is made, and each old place is retired by the carry-over; a change inside (0, 1] keeps the gate, and the pass runs as at generation over the accesses the re-derived document selects. These are fates of the edit (V04 §3.10; J-V4.121) | what the stages before that first reader stage commit |
| a `drawBoundary` or `split` on an undercity district | C1's read-only lifeline test per resulting district; a failing district's lifeline closure (V04 §3.8), its pieces shown as fates | the rest |
| a `delete` of catacomb galleries | the author's declaration: `extentFloorM2` lowered by the deleted area and the deleted grid nodes tombstoned, so growth never digs them again (J-V4.56) | the rest |
| `regenerate` (New random) on a system, a run or an undercity neighbourhood | that system's part, that run's blocks, that neighbourhood's elements; the links' far ends (§3.4); a host system's carve re-run (V04 §3.6 C2); on the catacomb system its lights and labels only; on the `dug` system its generated pieces only; on a `cavern`, `ruin` or `quarry` system U-ACCESS (e) over the new elements' opening candidates (the old elements' openings removed with them), the excavation reading, and V01's opening pass over the openings the new plan makes or removes (V04 §3.10) | the ground but those opening places, every other part |
| `adjust` of the family or the preset, of `recipe.layers.ruins`, or of the TOWN *Sewers* toggle | **Re-derive from S7b** with carry-over (§6.3): these change S7b (6)–(7)'s inputs (the navigable preset always allocates, the undercity presets change its bound and sources, a TOWN toggled on gains the allocations, a ruin feeds P5 and P7), so the ground's allocation re-runs, surviving placements kept by §6.3's rules, then T1–T8 (items 403, 404, 549) | the ground's geometry outside the re-placed uses |
| a basement edit bringing a ring within `foundationClearM` of a shallow void element | nothing; reported `W_BASEMENT_NEAR_VOID`, and U-LINK's basement rule may give it a way down at its next re-derivation | all |
| any change to a raised way's `feet`, `supports` or `spans` by an edit — among them the way added, removed or re-shaped, generated or drawn; a `setAttr` on its spans (a span's `use` set), crossings, `clearanceCm` or `spanSpacingCm`; a hand `repairRaised`; a hand landfall (V05 §3.16 (4)); a hand trace through one of its stations (a `drawWall`, or a moved trace vertex, a re-anchored stretch among them, bent there by §2.7's support step (6) (b) (iii)); the same change at an epoch (V06's raised-way ops, a landfall, a circuit's, contraction's or re-anchored stretch's crossing station, the frame growth's deck extension, §3.2 (9)) runs the reconcile and `Foundations.apply` over `EpochScope.raised` instead (V04 §3.10; V04 §3.5.0 *At an epoch*) | `ArchVaults.reconcile` over that way in the same commit — its vaults laid, re-laid between their raised-way piers' inner faces or deleted (V04 §3.5.4 (d) (1)–(3)), with their links and accesses, fates in the dry run (a span's `use` set lays or removes that span's arch vault alone); `foundationObstacles` re-read under its raised-way piers: the older voids' collapsed stretches and pillars there re-derived, and an existing element of a later system a new or widened raised-way pier (a crossing station's band stretch) puts within reach converted `collapsed`, cause `foundation`, as a fate (a catacomb's staying in its extent, V04 §3.5.1 (6)); the excavation reading; the terminal cistern of an aqueduct | the network (a raised spine is never an edge); every other part |
| a `RetainingWall` drawn, moved or removed, or a levelling edit | N6's wall-crossing vertices and N7's re-lay for the runs crossing it (knots only, the plan unchanged); `foundationObstacles` re-read along it (as above); the street-vault stretches of the ways it re-profiles | every tunnel's plan |
| a `setAttr` on `monument/count` | that monument, its chamber's ceiling, U-CITY's plots on its floor where the new rings meet them | the rest |

### 4.4 Undo and the closure record

Every row is §7.4's; the closure record (§7.3 item 9 (c)) names U-DIG's pieces. Additions: the outfall re-seat's former
`at` is in the water edit's undo record; a depth offset's undo restores the knots of every run N7 re-laid; an excavation's
undo removes its access and the `ExcavationRecord` entries it added, restoring the cluster's former state by the replaced
scope; a closing edit's undo restores the cluster `accessible` and its abandoned dwellings byte-identically; an opening
place that an edit's opening pass made or tombstoned returns with the edit's undo (a place's undo is its host's event,
V01 §2.7); a catacomb delete's undo restores the galleries, `extentFloorM2` and the tombstones; a raised way's removal's undo
restores the way, its arch vaults, their doors, links and accesses with the same ids (the replaced scope); a monument
count's undo restores the former lay. **Held pieces:** L5's pieces for a subterranean dossier institution are held while
that institution is live: a `delete` of one returns F-EDIT `dossier-owned` with `rejectSite` offered (the institution moved,
its underground re-made; item 20). When the dossier removes or closes the institution they are released (V04 §3.7 L5): kept,
no longer held, deletable as any `dug` element. Edit-made `dug` pieces are held (§7.3 item 9 (c)); generated ones
re-derive with their owner (V04 §3.8).

### 4.5 The clerk's view (§11.2's tool API; item 101)

The clerk reads the underground through the reader, filtered by its viewer's knowledge key (§9.2): per system its kind,
depth range, floor area and element counts; per band its contents; per named run its name, kind, served area and outfall;
per undercity neighbourhood its parent, households, institutions it may know; per access its kind, state, `knownTo` and
`cause` where admitted; per link its kind, `via` and `cause`; per catacomb complex its source, rank, extent, `fill` and
`blockedBy`; per ruin its culture, age and the districts above it (V01's `districtsAbove(part, element)`, V01 §3.16, for
"under the old quarter"); per ruin monument its tiers laid, standing and truncated and its mound; per arch vault its raised
way and its span's `reason` (a street, water, flood, too tall, too low, too steep, the country, the chance, the cap or the
user; item 244); per terminal cistern its aqueduct and source; per cistern the nearest water and aqueduct delivery point its
test read; per foundation pillar or collapsed stretch the raised-way pier or retaining wall that made it, and the epoch whose
`Foundations.apply` made it; per village working's breach its working and the void it reached; per buried stair step the
tombstoned retaining wall it keeps; per buried former settlement its burial epoch and the former fabric it lies under (the
story's `HistoryRecord`, §2.7). A ruin, a cavern cluster and every unexcavated element are known to a `secret` key only
(V04 §5.2); a `lost` cluster to the knowledge it had while accessible.

**The providers** (implemented by `@plat/under`, V04 §1b.2; called by V10's `why` query, V10 §3.9, V10 §3.9a, and V09's why
card and underground panels). Every row's words are a key of V09's catalogue — `info.under.*`, `info.catacomb.*` — one per
value of every union below; this volume writes no words:
* **The underground `WhyProvider`**, on its kinds (the underground systems, `AccessPoint`, `UndergroundLink`, `RuinRecord`,
  `CatacombComplex`, a void cluster): the rows above for its subject, each fact under its key — `info.under.cause.<rule>`
  for `AccessCause.rule`, `info.catacomb.source.<kind>` for `CatacombComplex.source.kind`, `info.catacomb.blocked.<reason>`
  for each `blockedBy` value.
* **The `underground` `WhySectionProvider`** (V10 §3.9a's rows), on a void element, a system, an access, a link, a burial
  face, a building over a void, a district above a ruin, a raised way with arch vaults and the terminal building. Its rows
  add: on a cavern, ruin or former-settlement cluster, the fact `under/wayIn` — the connection graph's path from the nearest
  surface access through passable joins (V04 §3.5.7 (g) (1)), or none — and its state by the catalogue's keys: `accessible`
  as V10 §3.9a's chain row over `under/wayIn`, `unexcavated` as `info.under.sealed`, `lost` as `info.under.lost` with the
  closing that ended its last path where the commit record dates it, else `info.under.lostUndated` (their words V09
  §4.17.1's); the `ruin.node` line (V04 §3.5.0a (9)); `reusedBy`; an arch vault's span
  and the span's `reason`; a monument's tiers laid, `standing` and `lay.truncated`; a `FoundationsResult` footing; the
  terminal cistern and its aqueduct; each `CatacombComplex.blockedBy`.
* **`catacombOutcome(doc, face)`**, read-only, derived from U-SYS's candidate pass for that face (V04 §3.5.1 (1)–(3)): one of
  `holds` (the face holds a complex, with its id), `countReached`, `wet`, `age`, `island`, `belowTown`, `chance`, each an
  `info.catacomb.outcome.<value>` key; read by the section on a burial face and by V09's cemetery panel.

Each is a pure read over the committed records and the derived readings: with no underground it answers `info.under.none`,
and nothing it returns is stored, so a load, undo, redo or regeneration recomputes it. V10 builds "why is this here" from
these rows and the rows that pulled each member (V04 §3.6a) — among them the span's reason, the aqueduct serving a precinct
and a raised-way pier's footing in a cave. The clerk proposes the same events (V04 §4.1) as ghosts; accepted, they commit
with `proposedBy: 'clerk'`. A secret element it cannot see it cannot edit: an event naming a withheld id is refused as if
the id did not exist. Tested by T-V4-78.

### 4.6 Migration (§7.5)

A document saved before U-NET's output version holds `Features.sewers` true and an empty part 0. On first opening under
that version the tail runs as part of the version's `upgrade` event (§7.5): the diff lists the underground records made,
declared as the release's shift of the underground layer; the ground's digests are unchanged. Such a document had no S7b
(6)–(7) allocations, so the upgrade makes no sewer-front plots, void dwellings or undercity; its diff says so and offers
**Re-derive from S7b** to make them. A stored `flowToward` is dropped (item 208); a `Chamber` without `kind` takes its row's
first kind; a `Tunnel` without `outfall` takes the nearest `Terrain.outfalls` entry to its downstream end, reported. A
document saved before item 109's version, in the same `upgrade` event, with a declared shift (§13.3):
1. Every existing catacomb complex is kept — the ratchet outranks the count — and gets a `CatacombComplex` with
   `extentFloorM2` equal to its laid extent and `fill` 0, flagged `overCount` where the count is exceeded; no complex is
   added until the count allows. A complex whose source is a church building (the old crypted-church row) is kept whole,
   re-sourced to that church plot's `churchyard` part where one exists, else `legacy` naming the church, reported; no
   complex is ever created under a church.
2. Every existing access and link keeps its record, with cause `legacy`. A dwelling or undercity in a cavern is kept where
   any existing access makes its cluster accessible; otherwise its plots vacate as the upgrade's fates, listed.
3. The access pass (U-ACCESS) runs; it adds accesses and never removes one.
4. No ruin is created (g item 109 (h)); `recipe.layers.ruins`, absent, reads `off`.

A document saved before item 110's version, in the same `upgrade` event, with a declared shift: every `vault` span of a
raised way the document holds gets its arch vault and every `cistern` terminal its terminal cistern, the diff listing
them; a ruin whose culture row names a monument gets it; the foundation reading, the wall-crossing vertices and drops and
the church-class host rule apply; and the entrances of its underground buildings are rewritten to `faces: 'tunnel'`.
Nothing is removed but what the foundation reading collapses, each listed. A document saved before item 113's version gains
its `ExcavationRecord`s on load from its current reading (every element of an accessible cluster entered), so it holds no
`lost` cluster until a later commit closes a path, and it gains no buried former settlement: the replay runs only at
generation (V04 §2.6).

### 4.7 Read-ahead — the skeleton file's underground bones (item 101; §4.1 *Declarations read ahead*; item 281)

A skeleton file, or any log whose creation prefix holds underground declarations, is read ahead by the tail stages, each
declaration by the stage that owns its subject and as a constraint of that stage:
* **U-NET** reads the prefix's `drawTunnel` without `system` as held runs (N3a (1)).
* **U-SYS** reads `drawTunnel` with a `system` and `drawChamber` as held elements of their kind; a declared element makes its
  system exist whatever its chance draws (a declaration is a fact), and the system's layout grows around it (a ruin's plan
  on the declared elements' axis, a catacomb's grid from the declared gallery's axis). A raised way the prefix declares (the
  base's) has its arch vaults and terminal cistern laid by V04 §3.5.4 (d), (e) like any.
* **U-CITY** reads a `quarter` or `drawBoundary` on a void part as a required neighbourhood, as `require` places one
  (V04 §3.6 C0), in the declared cluster; on a cluster still sealed after T2b its way in is the dwelling closure's (V04 §3.8), run
  at C0 before C1's lifeline test with the declaration's `seq`, never `require`'s lifeline stair of cause `dossier`
  (J-V4.120).
* **U-LINK** reads `addLink`, `placeAccess` and `addUndergroundAccess`, whose closures run at their prefix positions after
  T5, in prefix order, each folding nothing the derivation has already made (§7.4) — save an `addUndergroundAccess` grouped
  before a dwelling declaration on a sealed cluster, which runs with that declaration's closure at U-CITY C0 (above;
  V04 §3.8).

A declaration a stage cannot honour is refused at its dry run with the reason and the closest alternatives (item 20 (g)).
The skeleton file, the canvas and the tool API give one model digest for the same declarations (T-V4-40).

## 5 Rendering, labels and exports

### 5.1 The underground view (§8.4; item 413; J-V4.31)

Hidden by default at every rung (§8.4). When the underground layer is drawn — visible, or Below the view's working
layer (§8.4) — one depth band draws at a time (`depthBand`, §2.9; its default §8.4's), in one of three modes,
`LayerSpec.underView` (item 413), default `cutaway`:
* **`cutaway`** — the ground drawn first as a **ghost**: every ground mark at `ghostAlpha`, in its luminance only, ground
  labels hidden but for the district and quarter labels at half alpha; then the band's underground marks over it, so every
  tunnel reads against the street above it;
* **`overlay`** — the ground at full strength, the band's underground marks over it at alpha 0.7;
* **`solo`** — the underground alone, the ground reduced to its way centrelines as `trace` hairlines (the export default).

The adjacent bands' traces are §8.4's. While the underground layer is drawn (`cutaway`, `overlay` or `solo`) the weather
effects draw nothing over the view (§8.8). The **band ladder** in the layer panel lists every non-empty band as its
depth range (−2.5 to −5 m …) with the kinds present, the drawn band marked; PageUp and PageDown step it by §14's keymap precedence —
with a building's plan open they step its storey (V03 §4.5), otherwise, with Below the working layer, the band. A
document opened with the underground drawn shows the ghosted ground with the notice "building the underground…" until T7
has built the drawn band. **`showUnexcavated`** (item 278; a per-viewer view key, default `false`, its control V09's) draws
the unexcavated clusters in their own style (V04 §5.2) — for a `secret` key only, whatever its value, so a game master sees
what the inhabitants do not (g item 109 (j) (2)). **Raised parts.** In `cutaway` and `overlay` the raised parts' decks and
raised-way piers over the drawn area draw as `trace` hairline outlines over the ghost, so an arch vault reads under its
arch; in `solo` only the raised-way piers' outlines. The ground view draws nothing of this volume, save V01's ground
symbols and opening places, which read this volume's `AccessPoint` records (V01 §3.8.8, V01 §5.1.2, V01 §5.2.2); a span's infill
wall and door are the base's drawing.

**Find on Below (g item 120 (f), (h); J-V4.127).** Find — §2.9's per-viewer view key `find`, V09's panel and `live.find`
overlay provider, §8.2's veil, halo, outline, pin and count-bubble rows, §11.2's gazetteer match listing at the view's
effective key — reads this volume for what lies Below through one derived reading, `underFindPlaces(doc, ids)`
(`@plat/under`, never stored; `doc` the model the view draws, (7)): for each matched id on an underground part — an
underground building and its use (a sewer dwelling, an F4, F6 or C4 building, an undercity institution), an undercity or
sewer-front district, a named system or
catacomb complex, a named run, the core's plaza, a named chamber — it gives the part, the depth bands its open elements
occupy (§8.4's `depthBandCm`), its glow shape in each of those bands (a footprint, a chamber's wall, a run's or gallery's
band, a district's outline on its part) and its plan anchor (a building's footprint pole of inaccessibility, a district's
label anchor, else the point V04 §5.4 places its label at). The matches are the listing's; this volume adds no match
rule. With band b drawn:
1. **The band shown glows.** A match with an element in band b glows on those elements over the veil, which lies over the
   band's rock, voids and the cut-away's ghost alike, the plan lines (V04 §5.3) under it.
2. **The other bands are ghost pins.** A match Below with no element in band b is a faint ghost pin at its plan anchor
   carrying its shallowest band's depth range as the band ladder writes it; the ladder marks each band holding matches
   with their count; **Go there** makes Below the working layer and sets `depthBand` to the match's shallowest band —
   view keys only, Below drawn whatever its visibility (§8.4), no event sent (item 120 (a); V09 §4.21.10 (8)). A match on
   Ground or Sky is a ghost pin at its plan anchor over the ghost (item 120 (f)).
3. **From Ground and Sky** every match Below is a ghost pin at its plan anchor, counted by V09's panel ("N more Below").
4. **Areas.** An undercity or sewer-front district chip lifts that district's blocks, walkways and plaza in band b and
   glows along its outline there; a ground district, neighbourhood or quarter chip lifts every element of band b whose
   plan band lies inside its outline, glowing along that outline traced in the band — the area reaching down, as
   `districtsAbove` (V01 §3.16) reads it upward. Show gaps' units Below are V01 §5.4 (3)'s `gapUnits` on the underground
   parts, restating none. Each undercity neighbourhood and the underground pseudo-district is a `district` unit (V04 §3.6a
   (5)), and the per-plot units read `underDistance`. Each gap is outlined dashed "none here" in every band holding its
   plots, an undercity neighbourhood's in the band holding its core.
5. **What the viewer may know.** §11.2's admission holds: an element of an `unexcavated` cluster is absent below `secret`
   — never suggested, counted, drawn or pinned; at `secret` it glows only while its cluster is drawn (`showUnexcavated`
   on), a ghost pin otherwise; a `lost` cluster's matches glow over its sealed style for every key that admits them; a
   secret access, link or `dug` gallery and a concealed use's true kind follow the same admission (T-V4-21).
6. **When it changes.** The underground's records join Find's index at the commit that writes them — each tail stage's,
   so chips set before the tail ends gain each Below match as its stage commits, each underground edit's and each
   underground epoch participant's — and the chips re-evaluate then (V09); and at each change of §2.9's `week` (a
   timeline scrub, a host's `view.set { week }`) `underFindPlaces` is read again over the model the view draws ((7)).
7. **At a drawn week** (§11.2's *At a drawn week*; V06 §3.15.2). At a drawn week whose frame is not the head,
   `underFindPlaces` reads the model the view draws, that frame, for the ids §11.2's listing gives at that week — a
   building matched by its use at that week, never its head use. Each glow shape, depth band, ghost pin's band, the band
   ladder's counts and **Go there**'s band are then the frame's: a run, gallery or undercity district an epoch has since
   extended or re-cut glows over the elements the frame holds, a match the frame lacks is neither glowed, pinned nor
   counted, **Go there** sends the view to a band the frame holds, and (5)'s admission reads that frame. Show gaps' units
   Below are V01 §5.4 (3)'s `gapUnits` at that week. With no drawn week, or at the head, the head.

Find writes no record of this volume, never the excavation reading or `ExcavationRecord`, and no digest; with no chip on,
nothing of it is drawn.

### 5.2 Marks and programs (§8.1, §8.2)

The underground builder of S14 writes, per part and band, marks of the semantics `under.rock`, `under.void`, `under.water`,
`under.wall`, `under.building`, `under.trace`, `under.access`, `under.link`, `under.label` with the ordinary columns (§8.1;
`knownTo` and `concealed` on every mark, item 7). The draw order inside a band:
1. **Rock** — a hatched halo of `rockHaloM` (4 m) outside every void's kerb, in the role `rock` (item 413; each sheet's
   facts below), the rest of the rock transparent so the ghost shows: the dungeon-map figure-ground, where voids read as
   carved (J-V4.31).
2. **Voids** — tunnel bands, gallery bands and chamber floors in the role `void` (one step lighter than the
   ghosted ground; each sheet's facts below). A tunnel draws by §8.2's kind rows over the void (the cased band for a
   `main`, the hairline pair for a `drain` or `culvert`, arch glyphs at a `passage`'s ends); a `chamber` junction wedge in `chamber`'s fill.
3. **Water** — along every `drain`, `main` and `culvert` its channel, a `water` stroke 0.4 × the bore wide on the
   centreline; a gallery with `water` and a `cistern` filled in `water`; a flooded element by §8.2's `states` row.
4. **Walls** — every void's kerb and chamber wall as a `wall` stroke, 1.5 × a way's casing for a `main`, 1 × elsewhere.
5. **Buildings** — the footprints of the sewer dwellings and the undercity in `building`, the vault classes with the `vault`
   hatch (§8.2), party walls and door ticks as on the ground; the undercity's informal clusters by §4.7's cluster rows; a
   building's damage (g item 123) by V04 §5.6.
6. **The plaza** — the core's ring walkway, the stalls as pins.
7. **Access points and links** — §8.2's `states` rows, each access by its underground end only, its symbol chosen by
   `cause.rule` (V09 §4.17.3's column). Its surface head — an outfall's `mouth` at the bank (a small arch glyph facing the
   water) included — is V01's ground symbol (V01 §3.8.8, V01 §5.1.2), drawn in an opened close-up by the knowledge filter and
   the `pins` toggle whatever the underground layer's visibility; the underground layer draws only the underground end
   (J-V4.96).
8. **The adjacent bands' traces** (§8.4).
9. **Light**, then the **plan lines** (below).

A band with nothing in it draws no rock; a mark of zero length or area is not written. The `states` rows of §8.2 cover every
declined condition; the undeclined defaults are the rows above. Added programs and rules (item 407):
* **Chamber fill by kind.** §8.2's chamber row is keyed by `Chamber.kind`: `streetVault`, `bridgeVault` and `archVault` with
  the `vault` hatch (an arch vault in the shallowest band, its floor at grade; its door a daylight opening), `storey` and
  `square` as buried-town floors, `cellar` and `storage` as `dug`, `ossuary` with niche ticks whose density rises with its
  complex's `fill` (1 tick per 60 cm of wall at `fill` 0 to 1 per 30 cm at 1), `market` as the undercity's plaza.
* **The `ruin` program** (`ruinMasonry`; g item 109 (g)): walls as two parallel `wall` strokes 30 cm apart on every chamber
  outline and gallery kerb; a 60 cm dot at each point of `Chamber.columns` (the modelled points); `collapsed` elements in a
  rubble stipple of the `rock` role; the main streets' ancient drains as the `water` stroke — distinct from the cavern's
  irregular fill. **A monument:** each standing tier's ring as a `wall` stroke, its stairs as hatched strips, the shrine's
  ring where it stands, each tier casting its own shadow (V04 §5.3); the mound as the rubble stipple within the first fallen
  tier's ring. **A buried former settlement** draws as a buried town (its streets, storeys and gates) with the program's
  double wall strokes, and each of its wall bands as a solid `wall`-filled band — masonry, not rubble — its gate chambers
  open through it.
* **Foundations and drops.** A foundation pillar in a void's floor draws as a filled `wall` square of its footing; a stretch
  collapsed by a foundation as the rubble stipple; a drop at a retaining wall or a cliff (V04 §3.11 UC1) as a small filled
  square on the run at the wall's or the cliff's line (the drop shaft). A buried gallery's stair step at a tombstoned
  retaining wall's line (V04 §3.5.5 (a)) draws as a hatched strip across its band, as a monument's stairs do.
* **The sealed style** (the `unexcavated` program; g item 109 (j) (2); g item 113 (e)): every element of a sealed cluster
  draws its kerbs and walls dashed (4 : 3 at 1 paper px) at 40 % alpha, with no fill, no light and no label but its
  system's. An `unexcavated` cluster draws so only while `showUnexcavated` is on and only for a `secret` key; a `lost`
  cluster — remembered as once known — draws so for every key that admits its elements, whatever `showUnexcavated`.
* **Grilles.** Each station of `Tunnel.grilles` draws the link style's gate bar across the band.
* **Access symbols** are sized by their opening row (`UnderLayoutRule.openings`).
* **Knowledge.** The knowledge filter admits an unexcavated element, its label, its links and its exports only at `secret`
  (the game master's key, §11's audience table), whatever its `knownTo`; a ruin's and a cavern cluster's existence is
  otherwise known as its `knownTo` says once it is accessible, and a `lost` cluster keeps that knowledge.

**Every shipped sheet** (§8.2's slot resolution; J-V4.131). The underground layer composes its own list in the draw order
above; every shipped sheet — §8.2's presets table: `ink`, `lit`, `hatched`, the ink-family variants `parchment`,
`bw-print` (on its grey ramp) and `night`, `painterly` from V07's V-M1, and the parity presets, in the `ink` (MFCG) and
`lit` (FTG) families — resolves every `under.*` semantic, so the loader never refuses one; a user sheet missing one
resolves it by §8.2's slot resolution. The per-family facts are this volume's, their values the style sheets' (V11's
registry row 52), and `painterly`'s are drawn by V07 §5.1's programs in its palette:

| semantic (role) | per-family facts |
|---|---|
| `under.rock` (`rock`) | the halo of `rockHaloM`, the rest of the rock transparent: in `ink` a 40 %-ink cross-hatch at 1.2 paper px, and so in `parchment` (over its texture) and in `night` (in its `@night` ink); in `bw-print` that cross-hatch on its grey ramp; in `lit` a dark stone fill, lit by the light pass's rock prisms (V04 §5.3); in `hatched` its dense hatch; in `painterly` a wash of its ground ramp's darkest step under dense hachures in its relief tier's stroke; the rubble stipple (the `ruin` program's, V04 §5.6's) in the same tone |
| `under.void` (`void`) | one step lighter than the ghosted ground, so a void reads as carved in every sheet: the paper in `ink`, `hatched` and `painterly` (its paper tone), `parchment`'s texture, `bw-print`'s white, `night`'s `@night` paper, `lit`'s `ground` tone lifted one step |
| `under.water` (`water`) | the family's own `water` role: the ink-family water tone in `ink`, `parchment` and `night`, its grey in `bw-print`, `lit`'s water ramp, `hatched`'s water tone, `painterly`'s first water band alone (a channel is 0.4 × its bore wide) |
| `under.wall` (`wall`) | the `wall` stroke at (4)'s weights in every family, black in `bw-print`; in `painterly` one of its selectively outlined lines, so always drawn; the `ruin` program's double stroke and the sealed style's dash alike in every family |
| `under.building` (`building`) | the family's footprint fill and outline as on the ground — no roof is seen below —, the `vault` hatch on the vault classes in every family (`bw-print` in its grey) |
| `under.trace` | the adjacent bands' traces (§8.4): an `ink` hairline at alpha 0.5 in every family (`bw-print` its mid grey, `night` its `@night` ink) |
| `under.access`, `under.link` | §8.2's `states` glyphs in `ink` in every family — `parchment`, `bw-print` and `painterly` as `ink`, `night` in its `@night` ink, a lit access's `light` marks carrying the `glow` sprite at night (§8.4) |
| `under.label` | role `label` in every family, by §9's faces |

### 5.3 Light underground (§8.4; item 68 (d′); J-V4.32)

The surface layer (§8.4 (a)) of an underground band: each void's floor at its floor elevation relative to the band's datum
(the band's upper bound); **rock as a prism** to the band's roof — the highest ceiling in the band plus 100 cm — so no point
light passes through rock and a torch in one tunnel never lights the next; the underground buildings as their prisms to
their eaves under the ceiling; a monument's standing tiers, stairs and shrine as their prisms from their bases to their
tops, each casting its own shadow, and its mound as a prism of `moundCm`; a foundation pillar as a prism to the band's roof;
a chamber's ceiling never drawn. Sources: the band's `LightSource`s, the light shafts at every access or mouth that breaks
the surface (§8.4 (b), item 414: the global light × the opening's `areaM2` × its `lightTransmission` (V04 §2.3) × its
direct-light visibility — the ground pass's shadow term at its `ground.at` under the current sun, every caster included, a
sky island's slabs among them (V05 §5.3 (1)); item 102's daylight share, a model reading, never enters the picture — plus
its sky-ambient share), the hand lantern; the ambient `ambient.underground` (§8.4), `E_key` `nightLux`. With no source in a
band only the ambient lights it. **The legibility floor:** the plan lines — every kerb, chamber wall and building outline of
the band — are composed after the light pass in their unlit colours at 60 % alpha, as labels are (J-A68.87), so the dark
between the pools of light is part of the look and the plan stays readable. The light pass runs per band tile, its bake
keyed by the band; a band switch re-bakes only the tiles in view (V04 §6).

### 5.4 Labels (§9; items 423, 445; J-V4.34)

| what | label kind | placement | name source |
|---|---|---|---|
| a trunk or a culvert run | `tunnel` | curved along its centreline (§9.3's spine candidates), watercourse italic | the naming pack's `sewer` slice; a culvert reads as its brook's (the ⟨name⟩ Brook, the ⟨name⟩ Culvert) |
| a void system | `system` | at the centroid of its floor in the band holding the largest share of its floor area, only in that band | the `cavern`, `quarry`, `vaults`, `buried` slices (`UndergroundSystem.name`); a buried town its quarter's (Old ⟨quarter⟩); a buried former settlement the settlement's (Old ⟨settlement⟩) |
| a catacomb complex | `system` | at its floor's centroid | `CatacombComplex.name`: a complex under a burial face reads its cemetery's name (the Catacombs of ⟨cemetery⟩), a churchyard's its church's; a quarry ossuary its quarter's (the Ossuary of ⟨quarter⟩); a crypt's label is V03's |
| a ruin | `system` | at its outline's centroid, in its main band | `RuinRecord.name`: the ancient civilisation the dossier's history names (a protected dossier name), else V11's `ruin` slice (item 445); an unexcavated ruin's label only at `secret` |
| a raised way's arch vaults | `system` | at the midpoint of its run of arch vaults, in the shallowest band; the target its lowest-address arch vault | the `vaults` slice naming the run after its way ("the ⟨way⟩ Arches") |
| an undercity neighbourhood | `district` (§9.1) | II.7.5's | II.7.5's `undercity` slice |
| the core's plaza | `place` | its disc | the `undercity.plaza` slice |
| the sewer-front neighbourhood | `district` | at its largest block | II.7.3's family of its own |

Names are drawn once on `naming` in the tail's S13a and kept by §6.3's cases; a missing name is drawn there. Every label is
a candidate only while the underground is drawn — visible, or Below the view's working layer (§8.4) — and its band
drawn, and only where the knowledge filter admits its entity
(§9.2), at every rung.

### 5.5 Exports (§11.1; item 452; J-V4.35, J-V4.36)

| format | the underground |
|---|---|
| GeoJSON | §11.1's rows; each tunnel with `kind`, `navigable`, `widthCm`, `headroomCm`, its invert profile (drops included), `depthBand`, its grilles and its outfall as a Point feature with `into`; each system a feature with its part, depth range and `variant`; each element with `excavation` (`accessible`, `unexcavated` or `lost`, for a cavern, ruin or former-settlement element), `culture` (a ruin's) and `reusedBy`, a buried gallery with its floor profile, its terrace stair steps included, a former-settlement element with `formerEpoch`; each arch vault with its absolute floor and ceiling (terrain-datum cm) and its `span`; each monument's standing tier a Polygon with `tier`, `baseCm`, `topCm` (absolute) and its mound a Polygon with `moundCm`; `ruinColumns` as a MultiPoint per chamber; each catacomb complex a feature with `source`, `rank`, `extentFloorM2` and `fill`; each access and link with its `cause`; `plat:tier` on every property |
| SVG | one group per band, `layer.underground.band<k>`, holding the band's semantics groups in V04 §5.2's order; the ghost ground in `layer.ground` at the export's `underView` |
| PNG / tiles | per band, per layer transparent; lit by the CPU reference at the export's light setting (no hand lantern, J-A68.92) |
| VTT (dd2vtt and Foundry-class scenes) | one scene per non-empty band (§11.1), `solo` and lit: `line_of_sight` from every void kerb and chamber wall and every underground building's footprint less its doors and the outer wall runs its damage has felled (V04 §5.6), from each arch vault's walls — its raised-way pier faces and its open faces less its door, the door a portal — and from each column's 60 cm square, each foundation pillar, each former wall band and each monument's lowest standing tier; `portals` **only at openings in a wall line** — a `door` access, a link whose `via` is `door` or `breach` (`gated` and `secret` closed, `open` open), an underground building's entrances and each tunnel grille (closed); every vertical access (a stair, shaft, ladder, hatch, well, grating, mouth, sinkhole) is its shaft light plus a `plat` extension object naming the band it leads to, sized by its opening row — a vertical access has no wall opening to portal through; `lights` the band's lights and shafts; a `plat` extension object with the band's depth range; unexcavated elements and their links are left out |
| glTF | voids as inward-facing solids — a tunnel or gallery swept along its centreline as its bore by its headroom, a `main` whose headroom reaches half its bore plus 50 cm with a half-round crown; chambers as floor, walls and a flat ceiling at `ceilingCm` (an arch vault's interior only, its ceiling at the soffit; the raised way's own solid is the base's); a monument's standing tiers, stairs and shrine as prisms and its mound as a prism; columns as 60 cm prisms floor to ceiling; the rock never exported; underground buildings extruded base to eave (§11.1); access points as shafts from floor to ground; each band a node, its lights in it |
| CityJSON | one `Tunnel` object per system (the sewer's per run, §11.1) with a `TunnelPart` per run or gallery and a `TunnelHollowSpace` per chamber; underground buildings as §11.1 states |
| CSV | the network's statistics: length by kind, served area, connected shares, outfalls |

Every export is filtered by its knowledge key (§11.1): a secret access, link, `dug` gallery (the secret passage of T-V4-21)
or place is left out with its lights, and an unexcavated element exports only at `secret`. A feature of zero length or area
is left out and listed in the export's log; the layer's visibility never changes a per-band export. **Find** (item 120
(i)): a per-band PNG or SVG export draws Find as shown in its band, the chips in the legend (§11.1's picture-export rule);
a VTT scene carries it only when asked (§11.1's battle-map rule); GeoJSON, glTF, CityJSON and CSV never carry it (a
view, never the model). **Damage** (item 123 (e)): a per-band PNG, SVG and VTT scene draw an underground building's
damage at the export's drawn week (V04 §5.6); GeoJSON, glTF, CityJSON and CSV export the model, never the damage.

### 5.6 Damage below ground — cellars, crypts and underground buildings (g item 123; J-V4.130)

Item 123's damage layer — one plan, never redrawn; each plan element shown damaged while the decay level is above 0 and
at least the element's keyed threshold (§6.3 *Plan damage*'s comparison; §2.6 step 7; the threshold §6.3's
`plan.damage`, the level V06 §3.23's `decayLevel`) — reaches below ground by the rules below; an element so damaged is
**past its threshold** in this volume. V03 draws the plan and its damage, V02 the exterior;
this volume states what is particular below ground. It is a drawing only: no record, field, id or digest changes.
1. **The level each element reads.** A storey below 0 of a ground building — its cellars, stores and undercrofts, and
   its crypt with its capped bays (V03 §3.7) — is part of that building's one plan and reads that building's level,
   `decayLevel(doc, its lineage, week)`. An underground building — a sewer-front dwelling, an F4, F6 or C4 building, an
   undercity building (V03 §3.12) — reads its own lineage's, whose decay run the underground's own events start
   (V06 §3.23 (1)): the abandonment of a `lost` cluster's dwellings (V04 §3.5.7 (g) (5)), the plots a shrinking or
   cleared undercity neighbourhood vacates (V04 §3.10), a void dwelling vacated on a floor `Foundations.apply`
   collapses; its restoration is V06 §3.23 (3)'s, as for every building. Where a disaster look stands over its building
   (item 122 (d): a building of one of the look's units, §10.2 (d), on which V06 §3.22 (3)'s `crisisLookYields` is not
   yet true, and every building of a preview's units; V03 §5.6 (4)), a storey below 0 draws at its building's drawn
   level — `PlanDamage.level`, the higher of its own level and the look's `lookLevel` by severity — its kinds'
   thresholds unchanged, the look leaving no patch; the
   per-storey scene's walls, portals and lights stay at the own level, the look in its image only (V03 §5.3;
   V03 §5.6 (2) (d)). An underground building lies in no look's unit — V01's `disasterDistricts` returns ground part 0's
   districts, at the village rungs V07 §5.6 (3)'s units, its ends or an end-less thorp's toft groups, all of part 0's
   plots (V01 §3.16 (1)) — so no look stands over it and it reads its own level only. No level reads a void's
   closure state or the excavation reading.
2. **The kinds below ground, each with its own thresholds** (item 123 (c)). `belowKind(building, element)`
   (`@plat/under`, derived, never stored) gives an element below ground one of five kinds, each a row of V11's item-123
   table by element kind, so it draws its own range and its own threshold — §6.3's `plan.damage` draw, keyed by (the
   building's lineage, the element's id), as every element's; no id is minted:

| kind | the elements | element id | damaged, drawn as |
|---|---|---|---|
| `cellarWall` | a wall run of a storey below 0 on `Basement.ring`'s outer edge outside the crypt's ring; an underground building's wall run on a footprint side that lies on its part's rock — its outside in neither a band `corridorUnion` commits (a tunnel's, a gallery's or a walkway's) nor a chamber's floor (§3.7) | its `wall:` id (V03 §2.2) | partly collapsed: the run's middle third broken over a rubble spill 60 cm deep into its room, still a wall to sight and passage, earth or rock behind it |
| `cellarVault` | the ceiling over each room of a storey below 0 outside the crypt and its capped bays | its room's address | fallen: a rubble heap over the room's middle half (its ring inset by a quarter of its least width), the ceiling drawn open above it |
| `cryptWall` | a wall run on the crypt's ring (`Basement.crypt.ring`) or on its capped bays' ring | its `wall:` id | as a `cellarWall` |
| `cryptVault` | each cell of the crypt's column grid (V03 §3.7.5: pitch `crypt.bayCm` in the step-2 ring's frame, which no rank event moves) whose centre lies inside the crypt's or its capped bays' ring; a crypt whose ring holds no cell centre has one, its room's ceiling whole | (its room's address, (i, j)) — i and j the whole-pitch coordinates, along the step-2 ring's OBB axes, of the cell's lowest-leftmost corner node (its corner of least coordinate on each axis), counted from the grid node at the OBB's centre (V03 §3.7.5's centring); the one `cryptVault` of a crypt whose ring holds no cell centre, its room's address — a key, never a new id | fallen: a rubble heap filling the cell, its columns standing |
| `cryptTomb` | each furniture piece of a `crypt` room (V03 §3.8: its tombs, ledger slabs and niches) | its `furn:` id (V03 §2.2) | broken open: a lid cracked, a slab split, a niche breached, as V03 draws a broken piece |

Every other element below ground keeps its V03 kind and range: a partition, an opening, a stair core, a cellar's
furniture, and an underground building's elements other than its rock-side runs; an access head is no element
(V03 §5.6 (1)): its state is its access's. The floor of the lowest
storey below 0 lies on the earth and is no element, so it never fails. **The ranges** are V11's values in an order this
volume rules: each of the five kinds' ranges lies inside the `ruined` share of the level (V06 §3.23 (2)), the crypt's
kinds at its top, so a cellar and a crypt stand intact through `abandoned` and `decayed` and partly collapse only once
`ruined`; and a damaged element of the five never removes a room, a wall line, a way down or a join — at level 1 a
ruined church keeps its crypt (V03 §5.1), every bay fallen and every tomb broken open, its rooms and its ways standing.
3. **Below ground, drawn.** A damaged element below 0 not of the five kinds is drawn as V03 draws its kind damaged, but
   for one rule: a stair core whose `levels` include a storey below 0, once damaged, draws as rubble over its steps
   below 0, a way still climbable, an access head standing on it drawn with it — the way down is the access model's
   (4). The rubble below ground is the `ruin` program's stipple in the `rock` role (V04 §5.2), one stipple for every
   collapse below ground; a repaired element — its threshold above the level and at or below its own `decayPeak`, the
   highest level since it entered the plan (V06 §3.23 (3); V03 §5.6 (2) (b)) — is drawn in item 114's patch material
   (§8.6). On a building's plan V03 draws a storey below 0 at its storey (V03 §5.1; PageUp and PageDown step to it,
   V04 §5.1). In the underground view an underground building's footprint (V04 §5.2 (5)) draws its plan's damage as V02
   draws a ground building's exterior (item 123 (d)): an outer wall run past its threshold a gap in the outline over the
   stipple — a `cellarWall` run instead broken over its spill, the outline kept closed —, a roof bay over a room past
   its threshold a hole in the footprint's fill over the room's rubble, a door past its threshold an open gap without
   its tick. §5.3's prisms follow: a fallen outer wall run and a fallen roof bay leave their prisms, so light passes
   the gap. An underground building in a `collapsed` or `flooded` element draws that element's §8.2 `states` row over
   its own damage.
4. **A drawing only; the access model untouched.** No stage of this volume — U-NET, U-SYS, U-ACCESS with its
   excavation reading, U-FRONT, U-CITY, U-LINK, U-DIG, U-FADE — reads a level or a threshold. A crypt join (V04 §3.5.7
   (c)), a dig access ((d)), a basement access (L3) and every link keep their records and states at every level, and a
   way below ground closes only by this volume's closure states: an access `bricked` or deleted with its host
   (V04 §3.10), a link `collapsed` or `flooded`, an element sealed, silted or caved in (II.6), a cluster `lost` — which
   stays lost whatever its buildings show. So a ruined church keeps its crypt and its join, a building over a void
   whose cellar vault has fallen keeps its dig access, and a collapsed access head is V03 §5.3's trace of a closed
   host, never a level's.
5. **Exports** (item 123 (e)). A per-band PNG and SVG draw the damage as shown at the export's drawn week. The per-band
   VTT scene follows it (§11.1's battle-map rule): an underground building's outer wall run past its threshold gives no
   `line_of_sight` segment and a door past its threshold no portal (an open gap), a `cellarWall` run keeps its segment,
   and rubble and holes are drawn in the image, never as walls; a plan's storey below 0 exports in V03's per-storey
   scene by the same rules. GeoJSON, glTF, CityJSON and CSV export the model, never the damage.
6. **Landing, budget, edges, bar.** It lands at the later of U5 (V04 §8) and V03's P4, the step that draws a decayed or
   ruined plan and with which §2.6 step 7, §6.3's `plan.damage` and §8.6 land (§16's milestone rows): the underground
   view's footprints and the per-band exports with it, a plan's storeys below 0 with V03's drawing of the plan's damage
   (V03 §8), the look over a storey below 0 with V03 §5.6 (4)'s, and every level read from the existence state at V11's
   default age until V06's level lands (V06 §3.23 (4)); before it nothing of this section is drawn. A building never
   decayed draws byte-identically to its build without the layer (`item123.damage`). Its budget is V04 §6's *Damage
   below ground*, its edges UE33 and UC21 (V04 §3.11), its bar T-V4-82.

## 6 Performance budgets

Measured as §12.1 states (the reference hardware, the harness, p50 and p95 over the rung's golden seeds). The tail is off
the first map (J-V4.2): the first map's laws of §12.5 are unchanged; the tail's time is reported as `timings.tail` and
bounded here. Work sizes are PLAUSIBLE until the U0 spike measures them at CITY **and METROPOLIS** (V04 §8).

| stage | work at CITY (historical / navigable) | rate assumed | p50 village rungs · TOWN · CITY · METROPOLIS (historical) | navigable × |
|---|---|---|---|---|
| U-FORECAST (at S7b, on the main path; its own §12.4 row, item 475) | ≈ 2 000 way edges, ≈ 20 000 `hydro` cells in `R`; P5–P7 over ≤ 10 voids | Dijkstra ≈ 0.3 µs per edge relaxation; cell scan ≈ 50 ns | ≤ 1 · 1 · 3 · 6 ms | 1 |
| T1 U-NET | ≈ 12 km / 40 km of runs, ≈ 1 000 / 3 500 chain vertices; 5 500 plot connections | insertion ≤ 8 µs (§12.4); `corridorUnion` at S9's rate per km; a connection ≈ 0.4 µs by the grid index | — · 6 · 18 · 45 ms | × 2 |
| T2 U-SYS (catacomb, cavern, quarry, vaults, buried) | catacombs ≤ 300 grid nodes per complex, ≤ 5 complexes; caverns ≤ `caveKmPerKm2` × the frame; quarries one chamber per working; vaults ≤ 60 chambers | as T1 | 2 · 5 · 15 · 35 ms | × 1.3 |
| T2 U-SYS ruin | a sunken district of ≤ 15 ha: ≤ `maxChambers` chambers, ≈ 400 galleries; the distinctness measures ≤ 4 times; ≤ 3 monuments, each one `layTiers` of ≤ 8 tiers (≤ 0.5 ms p95 each, J-V4.87); the column grids | as T1 | 1.5 · 6 · 12 (p95 ≤ 20) · 20 ms | 1 |
| T2 U-SYS arch vaults, terminal cistern, foundations | arch vaults ≤ `span.vaultCap` at the rung (§2.7, item 244), O(spans); the foundation obstacles by the static index | ≈ 5 µs per span; ≈ 1 µs per index query | 0.2 · 0.3 · 1 · 2 ms; p95 ≤ 3 ms | 1 |
| T2b U-ACCESS | the overlap and proximity queries over every part's static index; the buildings over voids by the index; the excavation reading a union-find over clusters | ≈ 1 µs per index query | 1 · 4 · ≤ 12 p95 · ≤ 30 p95 ms | × 1.5 |
| T3 U-FRONT (F6 included) | ≤ 300 plots historical, ≤ 1 500 navigable; ≤ 8 households per void cluster | S10 + S11 ≈ 16 µs per plot; 5 samples per plot by `pointLocate` ≈ 1 µs | 1 · 1 · 3 · 8 ms | × 4 |
| T4 U-CITY | ≤ 3 × 120 households, ≤ 400 plots; C1's read-only test | as T3; the visibility-graph MST over ≤ 200 openings | — · 1 · 4 · 8 ms | × 1.5 |
| T5 U-LINK | L1, L3 over ≈ 2 000 basements, L5, L6 | ≈ 1 µs per index query | 1 · 1 · 4 · 10 ms | × 1.5 |
| T6 tail S12c + S13a | ≤ 5 districts, ≤ 400 names | §12.4's rates | 1 · 1 · 2 · 4 ms | 1 |
| T8 U-RECONCILE | usually none; ≤ 100 households | S10b's reconcile rate | 0 · 0 · ≤ 1 · ≤ 2 ms | 1 |
| **tail total** | | | **≤ 10 ms p95 at each village rung (p50 ≈ 7.7); 26 · 71 · 162 ms p50 at TOWN · CITY · METROPOLIS; p95 ≤ 36 · 112 · 253 ms** | navigable p95 ≤ 61 · 192 · 343 ms |
| T7 S14 underground build (on first show of the layer) | ≤ 12 000 marks per band at CITY | §12.4's S14 rate | ≤ 6 ms per band at CITY | — |

A standalone neighbourhood document's tail is ≤ 12 ms p95 at every `contextRung` (the village rungs' ≤ 10 ms plus one
catacomb complex's layout, ≤ 2 ms).

**The first edit after the first map.** The tail yields between stages to a queued view request, never to an edit, so an
edit queued during the tail commits within §12.6's budget for its scope plus the tail's remaining p95 (T-V4-42).

**View.** Showing the layer (its toggle, or Below made the view's working layer, §8.4) or switching band re-rasters the
visible tiles of the underground layer only (the ground's ghost
is the cached ground tiles composited at `ghostAlpha`): ≤ 150 ms to the lit band at CITY on the reference device, the unlit
band first within one frame (J-A68.88's order). The light pass's frame and bake budgets are §12.5's; a band's bake is keyed
by the band, so returning to a band reuses its bake.

**Edits** (§12.6's functions of scope): a tunnel edit ≤ 30 ms at CITY (its bounded blocks and their plots, the overlap
test); a depth offset ≤ 5 ms; `addUndergroundAccess`'s dry run ≤ 60 ms (a connector grid of at most 160 × 160 cells at the
default reach); a dwelling closure's first rung ≤ 60 ms for the building that digs and ≤ 60 ms more for each one passed
over, its qualifying test ≤ 1 ms (a plan query of the part's static index; V04 §3.8); the excavation reading ≤ 1 ms per
commit (only the clusters the commit touches, the `lost` state and the vacated plots included); the opening pass ≤ 0.1 ms
per access it visits; a New random on a system ≤ its T2 share; the family, preset, ruins and TOWN-toggle adjusts at §12.6's
*re-derive from S7b* row plus the tail's p95; Re-derive from the network stage ≤ the tail's p95; the stage-2 switch's edit
(V04 §4.3; V01 §3.15) at V01's Re-derive-from-S2 line (V01 §6) plus the tail's p95, as the adjusts are; a change to a raised
way's `feet`, `supports` or `spans` by an edit (its add, re-shape or removal, a hand trace's crossing station) adds
≤ 2 ms for its arch vaults and foundations; a span's `use` edit ≤ 1 ms; a monument's count ≤ 1 ms; a
retaining-wall edit's re-laid knots ≤ 5 ms, as a depth offset.

**Epochs.** The participants' per-epoch budgets at TOWN · CITY · METROPOLIS, which V06 §6.2's century sums read (J-V4.125):
`under.fade` ≤ 3 · 8 · 20 ms (the fade candidates over their exposure samples); `under.extend` ≤ 6 · 17 · 43 ms (the
foundations act, the sewer's extension over the new ways, catacomb growth ≤ 300 nodes, crypt joins, workings, the
arch-vault reconcile over `scope.raised` ≤ 3 ms p95, the invert drops); `under.access` ≤ 5 · 15 · 40 ms (a static-index
query over the epoch's new footprints and elements, the `lost` transitions included); `under.undercity` ≤ 1 · 4 · 8 ms
(F6's relocations and the in-participant re-homing ≤ 1 ms at CITY). Inside them: `Foundations.apply` ≤ 1 ms per 100 new
footings at CITY (one static-index query each); the village-working test ≤ 0.2 ms per village (≤ 10 workings, one index query each); the buried floor's
terrace steps inside the `raiseGrade` builder's own time, O(walls × elements within one wall's reach); `BuriedFormer.lay`
≤ 5 ms per burial epoch at CITY (one L1 and one L2 batch over the former fabric's ways and buildings), inside V06's replay
budget.

**Memory** (§12.8): part 0 ≤ 1 MB historical, ≤ 3 MB navigable at CITY; a ruin part ≤ 2 MB; each other part ≤ 1.5 MB; the
underground display list ≤ 2 MB per drawn band; ×2.5 at METROPOLIS.

**Exports.** A VTT band scene ≤ 1.5 s at CITY; the underground glTF ≤ 2 s; within §12.7's export laws.

**Find on Below** (g item 120 (j)): `underFindPlaces` ≤ 2 ms p95 for 500 matches at METROPOLIS (one static-index read
per match, the bands from the element records), inside §12.5's overlay budget — the glow drawn within about 100 ms of the
click; a band step with chips on re-composes the overlay within the band switch's own ≤ 150 ms and re-rasters no base
tile for Find.

**Damage below ground** (g item 123; V04 §5.6): a reading inside the drawing — one `decayLevel` read per building, one
comparison per element and one `belowKind` look-up of the element's storey, ring or room: ≤ 1 ms per band at CITY for
the underground buildings' footprints (≈ 400 buildings, ≈ 20 elements each), inside T7's ≤ 6 ms per band; a storey
below 0 inside V03's plan draw; a week that moves no element past its threshold re-rasters nothing; the per-band VTT's
line of sight inside its ≤ 1.5 s.

**The comfort level (g item 119; J130; J-V4.126).** The rows above and §12's underground rows stay the **targets** — as
fast as possible (§12.1). Every one-time wait this layer adds to completes within §12.1's comfort level of ten seconds of
total time, from the click to the complete result on §12.1's reference machine, at every rung up to the metropolis cap
and in both presets: a generate, a regenerate, a Re-derive (the family, preset, ruins and TOWN-toggle adjusts', the
network stage's, the stage-2 switch's) and an open from SettlementForge that generates, each with its tail; a
migration's `upgrade` tail (V04 §4.6); and every per-band export. The tail's own targets (≤ 343 ms p95 at METROPOLIS,
navigable) keep it far inside. The four epoch participants and `BuriedFormer.lay` add to V06's advance-time and
history-replay waits, which take the comfort level as V06 §6 reads it for them (item 119's V06 part). A wait past one
second shows §12.1's progress: each tail stage is a `StageDecl`, so the generation worker posts §11.2's `Progress` as it
starts and V09 names it, the map drawn under the strip and, on a shown layer, the notice "building the underground…"
(V04 §5.1). No row here runs slower than its target; one may only for a recorded measured gain — a V11
`perf.qualitySpend` row (V11 §3.25.8) whose step stays inside the comfort level (R12-33). The interactive rows are
unchanged (§12.1; R12-34): the band step by PageUp and PageDown and the band switch's ≤ 150 ms, the `underView` switch and
the cut-away, every underground tool's live preview — the access tool's included —, hover and click-to-inspect, undo and
redo. T-V4-32 (b) bars it.

**Pre-decided fallbacks** (in order, each triggered by the U0 spike's METROPOLIS navigable measurement and re-checked at
U5): (1) U-ACCESS's proximity sampling every 10 m; (2) the cavern and quarry caps halve (`caveKmPerKm2`, `workingMaxHa`)
and the ruin's `maxChambers` falls to 1 000; (3) U-NET's historical `drainMinHa` rises to 5 ha. Each is a table value with a
declared shift (§13.3).

## 7 Tests and acceptance bars

§13's families; every bar runs on generated output from U1 (V04 §8) and keeps the base's hook tests T11-1, T12-1, T14-1,
T63-4, T64-1 – T64-3, T65-1 – T65-8, T66-1 – T66-4 and T66-6 green on the same output; a bar that re-runs a base hook bar
names the clause it takes over — §13.2's underground take-over row (T63-4, T109-1 – T109-6, T113-4, T113-5, T120-4,
T120-5, T123-1, T123-2, T123-6) by T-V4-34 (f), T-V4-43 – T-V4-58, T-V4-76, T-V4-77, T-V4-81 and T-V4-82, each naming its
bar and clause. **Parity:** no
reference owns the underground — MFCG has none and FTG's author states underground settlements unsupported
(`research/findings/ftg-posts-c.md`) — so the parity metric is invisibility **under the parity presets**: with a parity
preset on and the layer hidden, a CITY renders pixel for pixel as before M6-U (T14-1 as item 485 amends it), and no system
but the tier's hidden sewer exists, no household goes below and the ground's model digest equals the pre-M6-U digest
(T-V4-35). Under the default presets the ground differs only by the households and `preferred` uses S7b (6)–(7) send below:
a declared one-time shift of the M6-U output version, recorded in `plat/goldens/` at U1 (§13.3). **The look's precedent:**
the hatched-rock figure-ground (J-V4.31) is the look of the reference family's dungeon and cave maps
(`research/findings/watabou-extra-a.md` §2.7 and §2.8, the hatching and its two-layer mask;
`research/findings/dwellings-posts.md`, its "house-like dungeons"); nothing of it is copied, and the owner's panel carries a
side-by-side against a render in that style. Every other bar is a rule bar or a realism bar without a reference source
(§13.7; provenance `own`, PLAUSIBLE until the owner's panel, V04 §8). The item-109 statistical bars (T-V4-43, T-V4-44,
T-V4-45, T-V4-49, T-V4-51, T-V4-52 — the bar map's item 109 (k) (5)–(6) rows, the stagnant fill's `exactMonotone` and the
growth cap's `exactBound` —, T-V4-54, T-V4-55, T-V4-58) are `StatBarSpec`s of V12 §3.6b's bar map at its levels
(forced-source fixture sites), `undergroundInputOf` reading this volume's system records; their "± 3 s.e." and seed counts
are the specs' parameters.

| id | family (§13) | bar | tier (§13.8) |
|---|---|---|---|
| T-V4-1 | stage invariant | every run's invert knots fall monotonically in flow order at ≥ `minGradient`; every branch's downstream invert ≥ its receiver's at the junction — 0 violations on 500 seeds per rung × 3 families × 2 presets | PR (20 seeds), nightly |
| T-V4-2 | stage invariant | every run reaches an outfall along its tree path; every river outfall at `ContextVector.upstream` ≥ 0.5 and below every harbour mouth and mill intake; every sea or lake outfall ≥ `harbourClearM` from a harbour basin and the harbour-mouth chain; a moat or field outfall only where none was admitted on its bank, every field outfall on land beyond the outermost enceinte's outer strip, its D8 path and outfall run over no water face; every outfall invert ≥ its receiving water's surface `s` + `freeboardCm` — a moat's derived level (§4.2 S3 (10)), every other water's shore height, as V04 §3.2 N7 (1) reads it —, or `W_OUTFALL_LOW` reported — 0 violations; **the no-water fixture** (a TOWN and a CITY with no river, lake, sea, canal or oasis, `moat: 'none'`): every run reaches the one field outfall beyond the outermost enceinte's outer strip, `requestedVsBuilt` naming the cess field, 0 `frame` outfalls | PR, nightly |
| T-V4-3 | stage invariant | every crown ≤ `coverMaxCm`; the ground's terrain and arena digests identical with the tail run and not run (nothing trenched, no ground geometry written by any tail stage); T8's use writes on ≤ 2 % of CITY seeds at the default presets, each in `requestedVsBuilt` | PR |
| T-V4-4 | rule bar | every main's bore and headroom equal II.7.2's law at its downstream served area; `navigable` equals the thresholds' verdict; historical preset: navigable runs ≤ 10 % of network length at the CITY median (realism, own) | nightly |
| T-V4-5 | conservation | Σ served area at the outfalls + unsewered area = the plot and corridor area of `R` within 0.1 % | PR |
| T-V4-6 | statistics | `channel` plots connected (to a main or culvert, item 548) ≥ 90 % at CITY historical; `pit` connections per band within ± 3 s.e. of `pitShareByBand` over 500 seeds; every `serves` id within `reachM` of its run or on its drain | nightly |
| T-V4-7 | rule bar | `follow-streets`: every way run's centreline equals its way's spine positions; `drainage-lines`: every cell step follows D8; `mixed`: every culvert on a drainage line of catchment ≥ `culvertCatchHa` | PR |
| T-V4-8 | forecast | on 200 CITY seeds, navigable preset: the forecast capacity within ± 25 % of the built on ≥ 90 % of seeds; historical: the forecast navigable length within ± 30 %; each void kind's forecast capacity within ± 30 % of the built on ≥ 80 % of seeds; P6's verdict equals C0's on 100 % | nightly |
| T-V4-9 | the owner's rules | T12-1's rows (U1–U3, ≥ 1 access per neighbourhood, 0 plots under excluded ground, 0 ground writes) on 500 generated seeds per rung, both presets; every entrance of an underground building on a tunnel, gallery or walkway kerb or a chamber wall has `faces: 'tunnel'` | nightly |
| T-V4-10 | rule bar | every lived run stretch of `2 × shaftSpacingM` holds a grating, or the gap is reported with its reason | nightly |
| T-V4-11 | rule bar | each catacomb complex: its extent ≥ min(its need, the cap-limited growth) and ≥ `extentFloorM2`; one floor, the level-floor admission holding; no node on `damp` or `flood` ground or a tombstone; its stair on its burial face | nightly |
| T-V4-12 | rule bar | a non-fissure cavern only on `soluble` or `volcanic` geology, a fissure only on `ordinary` rock at hilly or mountainous relief and never with a `hall`; its length ≤ `caveKmPerKm2` × the frame's km²; `water` ⇔ floor ≤ the water table; every `hall` floor ≥ the water table + `hallDryCm` and no undercity plot on a floor at or below it; a mouth only at a candidate whose cover < `mouthCoverCm` | nightly |
| T-V4-13 | rule bar | quarries: Σ workings area × headroom × (1 − `pillarShare`) within ± 10 % of the volume law; no working with cover < `minCoverM`; one shaft per working | nightly |
| T-V4-14 | rule bar | vaults under public ground (a cistern under its own host's court); cisterns only where `dist.water` > `cisternDistM`; every bridge vault at a deck end risen ≥ `bridgeRiseCm` | nightly |
| T-V4-15 | rule bar | T65-8 extended: a buried town's squares are `square` chambers; its buildings' entrances are portals on their storey chambers; **the terraced fixture:** a `raiseGrade` over a terraced quarter keeps each tombstoned wall's step in the buried floor — every high-side gallery vertex and chamber floor within 10 cm of the high side's last live datum less the rule's depth, a stair step in every gallery crossing a wall's line — and a region with no wall buries as before; under a history replay the scar step lays nothing at generation | PR |
| T-V4-16 | stage invariant | no element of a system laid after the town within `surfaceClearCm` of the ground lies under water or within `foundationClearM` of another building's basement at generation; after a water or terrain edit every such element is `flooded` or `W_VOID_UNDER_WATER` is reported | nightly |
| T-V4-17 | isolation | T65-6 on generated output: re-deriving each system leaves the ground and every other part byte-identical but for its links' far ends and, for a `cavern`, `ruin` or `quarry` system, V01's opening places over the openings it makes and removes; a New random on a carved host re-carves its neighbourhoods' cores, and one on the neighbourhood resurrects the cleared parts before re-carving, both undoing exactly | PR |
| T-V4-18 | the undercity | T65-1 – T65-5 on generated output; every neighbourhood has a core ≥ `mainChamberM2` with its plaza ring and the black market fronting it; its chambers joined by walkways; its lifelines (access, air, water) present on 100 % | nightly |
| T-V4-19 | statistics | neighbourhood counts and `H` follow II.7.5's size law on 500 seeds per rung; on 200 paired seeds a higher `wealthLevel` never raises `H` and a higher `disorder` never lowers it | nightly |
| T-V4-20 | statistics | link frequencies per pair of kinds within ± 3 s.e. of `LinkRule.chance` over 500 seeds; spacing ≥ `linkSpacingM`; `flooded` only below the water table | nightly |
| T-V4-21 | knowledge | T30-5's enumeration on an underground fixture: at tier `public` no secret access, link, `dug` gallery, lifeline or concealed place in any view, label, reader answer or export, with its lights; at `secret` all of them | PR |
| T-V4-22 | the closure | T66-1 – T66-4, T66-6 on generated output; every connector keeps `foundationClearM`, its floor above the water table and inside its band, its length ≤ `2 × digReachM`; the A\* route identical on the five engines | PR |
| T-V4-23 | lifecycle | 1 000 hand-applied fade rounds on the hook city: only ladder moves (silt only from in use; collapse only from caved in; flood only below the water table; no `demolish`); `extend` on a fixture whose growth crosses a sealed run reopens it on 100 % of seeds and digs no new run on its line | nightly |
| T-V4-24 | statistics | clearance draws within ± 3 s.e. of `1 − (1 − clearancePerYear)^years` when `disorder` is under the threshold; none above it | nightly |
| T-V4-25 | light (§8.3's row family) | underground, the CPU reference gives a floor point with no light and no shaft in reach ≤ `ambient.underground` × its albedo; a floor point under a grating at noon is brighter than every point of its band without a light or shaft in reach; a torch in one run adds 0 to a parallel run through 3 m of rock; the GPU pass within §13.4's tolerance | PR (fixture) |
| T-V4-26 | light | an unlived network or system carries no light but its shafts, and a sealed cluster none; every underground light's height ≤ its host's ceiling − 30 cm | PR |
| T-V4-27 | visual regression | the underground hook fixture in `cutaway`, `overlay` and `solo` at each band, day and night, in every shipped sheet of §8.2's presets table (`ink`, `lit`, `hatched`, `parchment`, `bw-print`, `night`, `painterly` from V07's V-M1, the parity presets), against its goldens, the loader refusing no `under.*` pair in any of them (V04 §5.2); only the drawn band in full; hiding the layer restores the ground's golden pixel for pixel | milestone |
| T-V4-28 | export | every band's dd2vtt validates; every void kerb and chamber wall is a `line_of_sight` segment; a portal at every opening in a wall line the key admits — each `door` access, each link whose `via` is `door` or `breach`, each underground building's entrance and each tunnel grille — and at no vertical access, each vertical access being its shaft light plus a `plat` extension object naming its band | milestone |
| T-V4-29 | export | the underground glTF and CityJSON validate (§11.1's validators); every void solid's normals face inward | milestone |
| T-V4-30 | determinism | the tail's per-part digests, U-ACCESS's links and accesses and T8's writes identical on the five engines of §6.5 and between generation and replay; a building's dig draw unchanged by a void added under another kind; two entities whose keys collide take the ordinal suffix in address order | nightly |
| T-V4-31 | locality (§7.3's oracle) | a tunnel edit changes only the blocks it bounds, N8's plots and its overlap links; a ground edit changes no tunnel's geometry or invert; a depth offset changes only invert knots; the family, preset, ruins and TOWN-toggle adjusts change exactly the S7b scope the oracle predicts; a stage-2 switch edit — across 0 in either direction, or inside (0, 1] — changes nothing that the stages before the switch's first reader stage commit, the underground re-derived by T1–T8 after V01's re-derivation (V01 §3.15, *The switch's edit*), the edit within V04 §6's switch line | PR (B-EDIT sequences with underground events) |
| T-V4-32 | performance | (a) V04 §6's p95 bars on B-CITY-lite (PR tier) and at METROPOLIS (nightly); (b) the comfort level (g item 119; T119-2, T119-3 and T119-5's clauses on this layer, beside V12's T-V12-50): with V12 §3.15.9's wait timer (§12.10's R12-31), five seeds per wait kind at every rung's top and at the metropolis cap in both presets, a generate with its tail, a Re-derive from S7b, a migration's `upgrade` tail and every per-band export each complete within 10 000 ms p95 from the click to the complete result, every wait over one second naming its running stage within 1 000 ms and no frame of it an empty screen; the band step and switch, the `underView` switch, the tools' live previews, hover, inspect, undo and redo no slower than V04 §6's rows and the previous release (R12-34); the participants and `BuriedFormer.lay` timed inside V06's advance and replay waits (V06 §6) | PR, nightly |
| T-V4-33 | migration | a document saved before U-NET's version opens with its ground digests unchanged, its underground made by the upgrade's diff, no sewer-front plots or undercity, and the diff offering Re-derive from S7b; a pre-item-109 document keeps every catacomb complex (`overCount` flagged, church-sourced ones re-sourced or `legacy`), gives every access and link cause `legacy`, keeps a cavern's dwellings only where its cluster is accessible, gains accesses only, and holds no ruin; a pre-item-113 document loads with its `ExcavationRecord`s built from its reading, no `lost` cluster and no buried former settlement | milestone |
| T-V4-34 | dossier (B-DOSSIER) | (a) a TOWN dossier with a sanitation record has sewers on 100 % of seeds; (b) a subterranean catacomb record has a complex on a burial face (a charnel vault below TOWN); (c) a subterranean institution no allocation takes has an underground by L5 on 100 % of seeds, the rung used reported; (d) a COUNT or GUILD subterranean record places each member `#k` below and a SIZE step one compound; (e) a dossier event removing or closing the institution leaves every L5 piece standing, its cause `dossier`, no longer held, the building gone from the `dug` system's `sources`, a U-FADE candidate from the next epoch; a relocation re-derives the pieces at the new building under the same binding key; (f) (takes T63-4 on generated output) over 1 000 seeds of the underground hook fixture and B-DOSSIER's clandestine fixtures, a concealed institution's `underground` mode is never chosen without an underground allocation (II.7.3), and the parity presets place no concealment | nightly |
| T-V4-35 | parity presets | under `MFCG` and `FTG` no system but a CITY's or METROPOLIS's hidden sewer exists — no ruin and no cavern at any rung (item 109 (i)'s pin is T-V4-47), no buried former settlement — no undercity, no link, no underground plot, no undercity or void-dwelling allocation, and the ground's model digest equal to the pre-M6-U digest on 200 seeds per rung | PR |
| T-V4-36 | editing | a two-point `drawTunnel` between points near ways routes along them, its kind derived when not given; a depth offset past the cover limit is bent to the nearest lawful offset, the bend named; a `drawWay` on the underground is bent to `drawTunnel`; a `placeAccess` on public ground takes a neighbourhood kind; a ruin draw follows the ruin's axis; a `drawChamber` with `newKind` `ruin`, `cavern` or `catacomb` creates its system with that chamber as its first (a ruin of source `declared` on the chamber's axis; a catacomb by §7.3's ladder, each outcome's bend named) and its undo removes both | PR |
| T-V4-37 | dossier | B-DOSSIER fixtures with `require` at TOWN on a site with no void: ≥ 1 neighbourhood on 100 % of seeds, bound to the `Underground city` record and named by it; `forbid`: 0 neighbourhoods and no allocation | nightly |
| T-V4-38 | dossier | every surveyed subterranean or sanitation record (`Sewage system`, `Underground network`, `Underground city`, `Black market bazaar`, catacomb, crypt, mine, cistern) binds to its map entity by V04 §2.3a on 100 % of B-DOSSIER seeds; a crypt record binds to its church building, which has `Basement.crypt`, never to a system or a plan room; V04 §2.3a's *Edges* (no row, both sets, duplicates, clamps) on their fixtures | nightly |
| T-V4-39 | lifecycle | a Re-derive from the network stage, and an epoch's `extend`, after a `drawTunnel`, a `delete` of a generated run and a depth offset keep all three on 100 % of B-EDIT sequences | PR |
| T-V4-40 | editing (T101's pattern) | an underground skeleton fixture (tunnels, a ruin chamber, a catacomb gallery, a link, an access, a required neighbourhood) authored as a skeleton file, on the canvas and through the tool API gives one model digest | PR |
| T-V4-41 | existence | at U2, on 200 CITY seeds: ≥ 1 sewer-front neighbourhood on ≥ 60 % (navigable) and ≥ 10 % (historical); failing, the pre-decided fallback (item 552, navigable `coverCm` 600) applies and the bar re-runs | nightly |
| T-V4-42 | performance | the first edit queued during the tail commits within §12.6's budget for its scope plus the tail's remaining p95; the tail yields only to view requests | PR |
| T-V4-43 | presence (V12's `presence` rule; takes T109-3's presence clause) | caverns and ruins present at every rung, THORP to METROPOLIS, at their rows' rates (± 3 s.e., 500 seeds per rung on forced-geology and forced-source sites); the tail within 10 ms p95 at each village rung | nightly |
| T-V4-44 | structure (V12's `twoSample`; takes T109-2's structure clause) | ruin systems beat cavern systems on `plan.rightAngle` and `plan.straight`, ≥ 30 systems each, the structure test never reading a monument's tiers; every ruin `hall` and `temple` chamber's `Chamber.columns` equals the ruin program's drawn dots point for point, and none lies inside a monument's tier-0 ring grown by 100 cm | nightly |
| T-V4-45 | distinctness (V12's `paired`; takes T109-2's distinctness clause) | each ruin differs from the district fabric above it on `ruin.blockArea`, `grid.r4` and `grid.axis` by V12's margins, `W_RUIN_SIMILAR` on ≤ 5 % | nightly |
| T-V4-46 | dossier (takes T109-2's dossier clause) | on 100 % of B-DOSSIER seeds a dossier carrying `ancient_ruins` or a `ruined-landmark` record has a ruin system, its marker linked, or a reported reason | nightly |
| T-V4-47 | no-op pin (g item 109 (i); takes T109-6) | a `NoOpPin` registration of the underground goldens on V12 §3.7.8's engine (`item109.underground`): with the ruin chance 0 and the relief, boost and fissure rows at the base's values, the output is byte-identical to the base's | PR |
| T-V4-48 | access (takes T109-3's dwelling and cause clause) | 0 dwellings in a sealed (`unexcavated` or `lost`) cluster on 100 % of seeds at every rung; every access and link carries its `cause`; **the closures' clause (at U4):** on T-V9-38's three-building fixture the group `[addUndergroundAccess { building: the second building }, the dwelling declaration]` digs from that building to the cluster's element nearest its footprint, opens the cluster (cause `edit`), and the declaration adds no second access (J-SS3.10); the declaration alone digs from the first building (plan distance, then address) with `bend.under.accessDug`, lists the other two in `PreviewResult.alternatives`, and its undo removes the access and leaves the cluster `unexcavated`; an untargeted `addUndergroundAccess` not grouped before a dwelling declaration never targets a sealed element; a skeleton prefix holding the same group gives the model digest the edit gives (T-V4-40's pattern) | PR, nightly |
| T-V4-49 | access (V12's `trend`; takes T109-3's access clause) | the accessible share of voids rises with the buildings over them: `voidAccessible` binned, 40 towns per rung from THORP to METROPOLIS on a forced-void site | nightly |
| T-V4-50 | catacombs (500 seeds per rung; takes T109-4, and T109-5's sources clause) | ≤ 1 complex at TOWN, counts within `CatacombRule.count` at CITY and METROPOLIS, `churches` counting `v.parish_church` and each church on a live sky island once (0 sky faces among the candidates); every complex's source a burial face or, at CITY and above, a quarry ossuary — 0 sourced at a church building; no quarry ossuary at TOWN; the largest complex (by `extentFloorM2`) under the primary (at generation the highest-ranked face holding one); every crypt join in a building with `Basement.crypt`, where an element lies within `accessReachM` of its crypt ring, cause `crypt`, its head in the crypt; with no building elaborated, the set of crypt joins equals the set after elaborating every church (V03's T-V3-23 (g)); 0 catacomb accesses of source `system` in a church-class building (crypt column `always` or `basement`), and every catacomb access headed in a building with `Basement.crypt` of cause `crypt` (V03's T-V3-23 (d)) (the cathedral's crypt is V03's bar) | nightly |
| T-V4-51 | ratchet (V12's `exactMonotone`; takes T109-5's ratchet clause) | `catacomb.extentM2` never decreases across every epoch sequence of H-100 and V06's trajectories and across replay, Re-derive and New random, by V12 §3.6b's step script (the dossier burial event and `extend` growth included), each complex tracked by its `CatacombComplex.id` (its source's lineage, V04 §2.5); **the decline case:** a town's catacomb carried into a village by V07's hand-off down keeps its extent, is stagnant with `blockedBy` holding `'rung'`, and its `fill` never falls | nightly |
| T-V4-52 | ratchet (V12's `exactBound` and `exactMonotone`; takes T109-5's cap and stagnation clauses) | growth per epoch ≤ `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)` (J-VI.6), or ≤ `opts.capM2[id]` where V06 passes it; a stagnant complex's `fill` rises while its extent holds; **the overtaking fixture:** on 100 CITY histories of V06's trajectories in which a newer extramural cemetery comes to serve more burials than the rank-1 churchyard, the newer complex becomes the primary and, within the epochs its cap allows, the largest complex, no complex's extent ever falling and the older one held by the rank cap in growth only; **the calamity deaths:** an epoch whose `opts.deaths` is D raises each face's need by its `burialShare` × D × `ossuaryShare` × `m2PerBurial` and never its cap, and `deaths` absent reads 0 (V06's T-V6-69) | nightly |
| T-V4-53 | overlap (takes T109-3's breach clause) | on a fixture whose sewer crosses a sealed ruin chamber and a cavern gallery at a shared depth: a breach link on 100 % of seeds and both voids `accessible`; no link where the vertical gap exceeds `links.overlapShaftM` but by the shaft chance; every such link carrying its cause | PR |
| T-V4-54 | depth keeps secrets (V12's `floor` on `voidSealedDeep`; takes T109-3's depth clause) | at METROPOLIS on a forced deep-void site, the sealed share of deep voids — V12's connected components, at most three per town, deeper than `dig.reachM` below every footprint over them — ≥ `sealedFloor`; pre-decided fallback: `decayM` halves once, then `maxM` falls to 12 m | nightly |
| T-V4-55 | caverns (V12's `trend`, `higherWith`; takes T109-1's relief and mining clause) | cavern presence rises with relief and is higher with mining than without, per relief class | nightly |
| T-V4-56 | caverns (takes T109-1's breach clause) | every mine–cavern breach lies within `breachM` in 3-D; **the village working:** at a village rung, on a forced-cavern fixture with a mining use's outside-plot working, one `AccessPoint` of cause `mineBreach` and no link on 100 % of seeds where a cavern or ruin element lies within `breachM` of the working at a depth within its `mine.workingDepthM` row, none otherwise — at T2b, and for a working opened at an epoch by `AccessPassStrategy.run` over `scope.workings` with the epoch's `seq` (V06's T-V6-68; V07's T-V7-39) | PR |
| T-V4-57 | ruins (takes T109-2's link clause) | every ruin link obeys the connection graph: U-ACCESS (a)'s overlap test, (b)'s reach, (f)'s reuse admission | nightly |
| T-V4-58 | ruins (V12's `rate` on `ruinChosen`; takes T109-2's ranked-share clause) | where a ruin and a cavern both qualify, the undercity takes the ruin at `w_ruin ÷ Σ w` ± 3 s.e., ≥ 200 undercities | nightly |
| T-V4-59 | knowledge | at `public` no unexcavated element, label or light in any view, reader answer or export; with `showUnexcavated` off none is drawn at any key | PR |
| T-V4-60 | siting (item 103 (e)) | underground members' supply, clientele and competition distances by `underDistance` beat a random-placement baseline; no undercity guild seat within the garrison's repel radius in plan; a member with no admissible way out reads out of reach, never at distance 0 | nightly |
| T-V4-61 | custom content (B-DOSSIER) | custom fixtures — tag only, scene archetype only, an active chain with a subterranean resource — each reach the underground (a placement below, or the chain mine) | nightly |
| T-V4-62 | arch vaults (200 CITY and 100 METROPOLIS seeds with raised ways, and the second known-city fixture) | an arch vault in exactly each `vault` span, keyed by its way and raised-way piers — none over a part-0 way, water, a flood cell or a strip wholly on hinterland land-use faces (reason `country`, at every rung including the village rungs; J-C4); each headroom within [`minHeadroomCm`, `maxHeightCm`] and each fall under the span ≤ `maxFallCm` (§2.7, item 244); a door on an open face, or `W_ARCH_VAULT_NO_DOOR`; 0 arch vaults in an undercity cluster, a forced-vault count, U-FADE's candidates, an L3 or U-DIG target or a sewer-front block; each `collapsed` exactly when V04 §3.5.4 (d) (2) says so (the span's or a bounding support's `state` `ruined` or `cleared`, a landfall's included, or the span breached or dismantled) | nightly |
| T-V4-63 | lifecycle (B-EDIT sequences with raised-way events) | on 100 %: a removed raised way, generated or drawn, leaves no arch vault, door, link or access after its removal and after a regeneration; its undo restores them with the same ids; a user-added raised way's `vault` spans have their vaults in the same commit; a span's `use` edit lays or removes exactly that vault and survives a regeneration; an epoch that founds a raised way (V06's `under.extend`) lays its vaults in the epoch's commit; on a CITY fixture whose viaduct holds a `vault` span with its arch vault, crossed through one of its stations by an epoch circuit and, on a second run, by a hand `drawWall` (§2.7's support step (6) (b) (iii)), and an aqueduct whose deck an epoch's frame growth extends to the new ring (§3.2 (9)): after each commit every arch vault's key names a standing span of use `vault`, its footprint lies between that span's raised-way piers' inner faces (a crossing station's support its band stretch), no chamber stands under an `open` span, each new `vault` span holds its chamber, and `foundationObstacles` reads the new supports in that commit; the hand case's undo restores the vaults with the same ids and footprints | PR |
| T-V4-64 | ground parts | 0 sewer edges, junctions, runs or gratings on a raised part; no tunnel `follows` a raised way; no street vault under a raised ramp; no bridge vault at a raised deck; every access's `ground.host` a part-0 face, none inside a raised-way pier's footprint | PR |
| T-V4-65 | foundations | 0 open void floor or open gallery stretch within reach of a foundation obstacle (raised-way piers to `span.supportFoundationCm`, retaining-wall footings, buried aqueduct stretches); 0 later-system elements laid within reach; 0 dig accesses from a raised-way pier; removing the raised way returns the older voids' stretches to their state without it; **at an epoch:** `Foundations.apply` over a raised way founded over a lived cavern chamber, a basement grown over a ruin gallery and a terrace levelled over a cavern collapses exactly the element set a regeneration of the same state collapses (V06's T-V6-67), returns the vacated dwellings' households by id and draws nothing | nightly |
| T-V4-66 | the aqueduct seam | the base's raised-way set, span uses and aqueduct verdicts byte-identical with the underground tail run and not run; every cistern where `min(dist.water, the nearest delivery point) > cisternDistM`, or forced by a record; one terminal cistern per `cistern` terminal, under its conduit house's yard or public ground with a `well`, or `W_TERMINAL_CISTERN_SKIPPED`; the terminal building's plot connected as `channel` where a run lies within reach | nightly |
| T-V4-67 | retaining walls (terraced fixtures and 200 hilly CITY seeds) | 0 crowns above the levelled ground at any knot, the wall-face knots included, and at 1 m samples between knots; a drop at every wall crossing whose fall exceeds `minGradient ×` its length; T-V4-1 still holds; with the terrace rows off, U-NET byte-identical to its output before item 110 | nightly |
| T-V4-68 | monuments | every monument's tiers nest (each ring inside the one below, V02's ST6 test) and its stairs abut; `standing` ≤ the tiers laid; the laid top + `ceilingClearCm` ≤ the chamber's ceiling ≤ `burialCm − 100`; `lay.truncated` counts both cuts and a `TierFailure`'s truncation; a monument laid twice from the same seed is byte-identical; a ruin without the `monument` cell draws nothing on the `'tiers/*'` keys and is byte-identical to its output without it; no plot, walkway or pin on a standing ring or mound | PR |
| T-V4-69 | no-op pin (g item 110 (f)) | registered on V12 §3.7.8's engine: with every switch of V11 §3.24.0's switch table off (the terrace, raised-way and deck-plot rows) and no `CultureRow.monument`, the underground's output equals V12 §3.7.8's off-state set — byte-identical to its output before item 110 — on 200 seeds per rung | PR |
| T-V4-70 | laziness | opening every district in two orders leaves the arch-vault set, the span uses and the tail's per-part digests byte-identical (V01's T-V1-15 on the raised-way set) | PR |
| T-V4-71 | layers (V05's T-V5-26) | on 100 % of B-CITY seeds with sky islands: 0 dig hosts, basement-access hosts, crypt-join hosts or catacomb candidates on the sky layer; `R` holds no sky district; 0 underground elements, links or accesses with an end on the sky layer; the catacomb count equals the count with each island church counted once | PR, nightly |
| T-V4-72 | epoch contracts (V06's participants) | (a) a TOWN whose `Features.sewers` turns on at an epoch gets U-NET whole, every pre-existing underground entity and the ground byte-identical; (b) across V06's trajectories each catacomb source, public opening and overlap shaft key is drawn once, the same value at every epoch; (c) 0 underground strikes in the fabric pool or counted against a district's `fabric` cap; (d) a mining use opened at an epoch has its working in that epoch's commit with its overlap test, and every stone working reads worked out outside the epoch that laid it; (e) `AccessPassStrategy.run` with a scope, run twice, adds nothing the second time; (f) F6's new dwellings in a cluster that `under.access` made accessible this epoch are filled only by V06's relocation (V06 §3.18.1 (4); T-V6-52), none of their households new; the crowding hook's S7b (6) allocation (V06 §3.6 (1); item 574) runs at `growth`, before `under.access`, and seats only on runs and clusters accessible before it; ground + underground + sky households equal the epoch's target | nightly |
| T-V4-73 | sources and closures | (a) a dossier event removing a ruin's `ancient_ruins` source leaves the ruin whole with `source.ref` null and `W_RUIN_SOURCE_REMOVED`; (b) a churchyard whose church use closes freezes its complex (`sourceClosed`, `fill` unchanged), and a church-family use arriving on the plot resumes it with the same face lineage; (c) a landfall over a grating, a street stair and a catacomb stair bricks each, cause `convert:fallIsland`, and the batch in which its host leaves the decoration — at an epoch, and by a hand op — reopens it (V06 §3.5.2); the arch vault under a span a landfall ruins is `collapsed` in the same batch | PR |
| T-V4-74 | public ground, places and the report | (a) on B-CITY seeds with V01's dispatched squares: gratings, lifeline stairs and forced vaults land on square and green blocks as on L1 squares, and a buried town's square blocks are `square` chambers; (b) after the tail, one `HoodPlace` of kind `opening` per public opening of role `access` and per catacomb entrance, 0 ground geometry writes by the tail (T12-1), the ground digest finalised after T8; after each commit of V04 §3.10's opening-pass list — an epoch that opens a sinkhole, a `CatacombGrowth.grow` that founds a complex, an edit that deletes a public opening or sets its `role` to `light`, a `regenerate` of a cavern and of a ruin system that carry openings, a `delete` of a chamber carrying a sinkhole and of the ruin element carrying its entrance, a dwelling declaration whose closure makes a public opening (a sealed cluster with no qualifying building above it, so that the base's second rung places the opening), and an `editTable` that raises `fabric.extensionWeight` from 0 to 1 (J-V4.121) — the opening places equal V01 §3.7.1's selection over the standing accesses: 0 orphan places, 0 unplaced openings; with the local-place step unregistered or the stage-2 switch at 0, 0 places and their count reported, and after an `editTable` that lowers the switch from 1 to 0, 0 opening places, each tombstoned (retired by §6.3's carry-over) as a fate of the edit and restored by its undo; after either switch edit, the underground re-derived with the ground by T1–T8, never held byte-identical; (c) an outfall's surface head draws in an opened close-up with the underground layer hidden, and not for a key that does not admit it; (d) one `ruin.node` line per `magical_node` deposit at `ruinCentre()`, none otherwise; (e) every access of source `opening` has role `access` but a skylight's `light` | PR |
| T-V4-75 | standalone neighbourhood documents (V01's T-V1-20) | on 100 standalone neighbourhood documents per `contextRung` (TOWN, CITY, METROPOLIS) on forced-cavern sites with a temple anchor: 0 sewer, quarry, buried or undercity elements; 0 vaults but a declared raised way's arch vaults and terminal cistern; ≤ 1 catacomb complex, its source a burial face inside the document, formed by TOWN's chance; caverns and ruins at their rows' rates at the `contextRung`; U-FORECAST's P5 kinds within {ruin, cavern, catacomb}, its catacomb expectation over burial faces inside the document only, and P6's verdict none; U-FORECAST called after the one-district allocation (V01 §3.10.1 step 6), P7's `voidDwellingHouseholds` ≤ `voidDwellings.share` × the one-district allocation's poorest-band households, and the underground pseudo-district's allocation ≤ `forecastSafety` × that forecast; the tail ≤ 12 ms p95 | PR (20), nightly |
| T-V4-76 | the lost reading (g item 113 (e), (g); takes over T113-5's underground clause) | (a) on a forced-void fixture whose one way in is a sewer run crossing a sealed cavern, a U-FADE `seal` of that run at an epoch turns the cluster `lost` in the same batch, its F6 dwellings abandoned (cause `rule:void-lost`) and their households returned displaced (cause `void`) and re-housed at that epoch's `siting`; a later `reopen` of the run, a new dig and a new overlap each refind it (`accessible`), and dwellings return at the next placement, never in the refinding commit; (b) an edit setting the last access `bricked` on a cluster holding F6 dwellings, then its undo: the cluster `accessible` and the dwellings byte-identical to before; an excavation undone leaves the cluster `unexcavated`, never `lost`; (c) a document holding `unexcavated`, `accessible` and `lost` clusters, saved and loaded, reads the same state on every cluster; (d) a cluster joined only through a `secret` link or a `locked` access reads `accessible` for every viewer and may hold dwellings while the way stays hidden at `public` (T-V4-21), and a `collapsed` or `flooded` link or a `bricked` access never joins; (e) a `lost` cluster draws in the sealed style for every key admitting it whatever `showUnexcavated`, an `unexcavated` one only at `secret` with `showUnexcavated` on, and its GeoJSON `excavation` reads `lost`; (f) the reading, its memory and the vacancies are byte-identical on the five engines; (g) a `Foundations.apply` collapse in `under.extend` and a host closure `under.access` reads, each ending a lived cluster's last open path after `siting`: the cluster `lost` in that participant's commit, its households re-housed inside the participant by §4.7's overflow pass and counted `households.undergroundVacated`, none in the ledger and none left for `close` (V06's T-V6-52) | PR, nightly |
| T-V4-77 | the buried former settlement (g item 113 (c), (g); takes over T113-4's underground clause) | on T113-1's city-to-village fixture and a refounded fixture: (a) former elements exist only where the replay's former fabric is older than its factored burial age (V11 §3.25.2), none younger; (b) each former gallery's centreline within 10 cm of its former way's last live centreline, each `storey` chamber's outline its former footprint (≥ `formerStoreyMinM2`), each wall band on its former enceinte run's chain, each floor `depthCm` below `levelledGroundCm` within 1 cm; (c) an element below `formerMinHeadroomCm`, under a present footprint or within reach of a basement ring or foundation obstacle created `collapsed`; (d) the replay run twice gives one digest on the five engines, and with the replay off 0 former elements and the output byte-identical (`item113.history`, the underground goldens registered on V12 §3.7.8's engine); (e) its clusters start `unexcavated`, are reached only through U-ACCESS's joins, and `HistoryRecord.buried` names the system; `W_BURIED_FORMER_SKIPPED` exactly when nothing passes | PR (fixtures), nightly |
| T-V4-78 | the clerk's providers and grade faces | (a) on fixtures with a ruin with a monument, a cavern, a `lost` cluster, an arch vault, the terminal cistern, a foundation pillar, catacombs in each `blockedBy` state and one burial face per `catacombOutcome` value: the `underground` section's rows equal V10 §3.9a's, every word a catalogue key — the excavation state by `info.under.sealed`, `info.under.lost` and `info.under.lostUndated`, the accessible state by V10 §3.9a's chain row —, `catacombOutcome` equal to U-SYS's candidate pass and `under/wayIn` to the connection graph's path; (b) at `public` no withheld id or fact in any row; a document with no underground answers `info.under.none`; after a load, an undo and a redo every answer equals the one before; (c) every `archVault` chamber's `gradeFaces` are exactly its two open faces, a street or bridge vault's its downhill face, every other chamber's none; a building seated in an arch vault takes its frontage entrance on a grade face with `faces` other than `tunnel` (V03's T-V3-32 reads the same faces) | PR |
| T-V4-79 | edges | each row of V04 §3.11's edge table on its fixture — (a) UE1, UE4, UE5; (b) UE2; (c) UE6's round trip of every field; (d) UE7; (e) UE8; (f) UE9; (g) UE10; (h) UE11; (i) UE12; (j) UE13; (k) UE14; (l) UE15; (m) UE16; (n) UE17; (o) UE18, a fixture forcing each failure row's detection; (p) UE19; (q) UE20; (r) UE21; (s) UE22; (t) UE23; (u) UE26; (v) UE27; (w) UE28; (x) UE30; (y) UE31 — gives the row's outcome and reports its rung, never a crash, a hang, lost data, a silent wrong result or a whole-map retry | PR (fixtures) |
| T-V4-80 | combinations | each row of V04 §3.11's combination table on its fixture at every rung it names — (a) UC1–UC4, (b) UC5, (c) UC6–UC8, (d) UC9, (e) UC10–UC11, (f) UC12, (g) UC14, (h) UC15–UC16, (i) UC18, (j) UC19, (k) UC20 — gives the row's outcome: (j) on river-town fixtures whose kept outfalls lie on one bank (a town astride a river, a walled core in a wet moat on level and on sloping ground, an island quarter, a river town whose candidates on one bank all lie upstream of a mill intake, `moat: 'none'`), 0 sewer edges, knots, gratings, drain runs, passages or outfall-run edges over a water face, each bank's plots connected only to runs on their bank, a bank with no admitted outfall draining to its moat — the mouth `freeboardCm` above the moat's derived level (§4.2 S3 (10)), never above its bank —, to its field outfall — on land beyond the outermost enceinte's outer strip, its D8 path and outfall run entering no water face — or, with a stretch empty or wholly on water or every stretch cell's path entering the river first, by gutter and pit reported unsewered, and a two-point `drawTunnel` across the river bent at the first point's bank, the bend named; (k) on a CITY fixture whose catacomb frontier grows over epochs toward a sewer run at a shared depth, at TOWN, CITY and METROPOLIS, one `breach` link per meeting element pair in the growth's commit, cause `overlap` naming the catacomb system and the epoch, its kind from `LinkRule.kinds`, no element moved or changing system, the run's knots, profile and `serves` byte-identical, no node refused `system` by the run, a run passed at another depth linked only by U-ACCESS (b)'s or the overlap shaft's chance, and save, load, undo and redo of each such epoch byte-identical; UC13 and UC17 are T-V4-75's, T-V4-17's, T-V4-48's and T-V4-76's | nightly, PR (fixtures) |
| T-V4-81 | Find on Below (g item 120 (f), (h), (k); takes T120-4's underground clause by (f), and T120-5's by (i)) | on the underground hook fixture and a METROPOLIS fixture holding sewer-front dwellings, an undercity with its tavern, fence and guild seat, an F4 concealed use, a ruin, a catacomb complex, an unexcavated cavern and a `lost` cluster: (a) each chip's Below matches equal §11.2's gazetteer match listing rows on underground parts at the view's key; (b) with Below shown at band b, every match with an element in b glows on exactly those elements and every other match — Below in another band, on Ground or on Sky — is one ghost pin at its plan anchor, the band ladder's counts equal the matches per band, and **Go there** makes Below the working layer and sets `depthBand` to the match's shallowest band, 0 events logged and `LayerSpec.visible` unchanged; with Ground shown, every Below match is a ghost pin and V09's Below count equals them; (c) an undercity district chip lifts exactly its blocks, walkways and plaza, a ground quarter chip exactly the elements of band b inside its outline; with Show gaps on, a kind chip whose class the fixture's sewer-front neighbourhood and F6 dwellings lack outlines the underground pseudo-district dashed "none here" in every band holding its plots, an undercity neighbourhood lacking it in the band holding its core, and a `walk` or `households` chip reads its per-plot units by `underDistance` — every gap Below equal to V01 §5.4 (3)'s `gapUnits`; (d) at `public`, 0 suggestions, counts, glows, pins or ghost pins for any element of the unexcavated cluster, any secret access, link or `dug` gallery, or the concealed use's true kind (T-V9-66's canary placed Below); at `secret` with `showUnexcavated` off the unexcavated match is a ghost pin, with it on it glows; the `lost` cluster's match glows for every key admitting it; (e) the document hash, every record of this volume, the excavation reading and `ExcavationRecord` identical with Find on and off, and Clear restoring the band's tiles byte-identical; (f) T120-4: the chips held across a band step, an `underView` change, a layer switch, an underground commit, an epoch, an undo, a redo, a regenerate, a load and a migration — a match the commit makes glowing at that commit, one it removes gone, a chip whose last match goes kept at count 0, dark; after the load, the redo, the regenerate and the migration the glowing set, the ghost pins and the band counts equal a fresh reading, the chips kept in the view pin; (g) a per-band PNG and SVG export draw Find as shown with the chips in the legend, a VTT scene none unless asked; (h) at the metropolis cap with Below shown, the glow within 100 ms of the click and `underFindPlaces` ≤ 2 ms p95; (i) T120-5: at the city band with Below shown on the METROPOLIS fixture, every match in the drawn band whose element is under about 6 px carries a pin with its chip's glyph, and pins and ghost pins closer than about 24 px merge into a count bubble whose number equals its members (item 120 (e), (k)); (j) at a drawn week whose frame is not the head (V04 §5.1 (7)) — the METROPOLIS fixture advanced over epochs, one of which extends its catacomb complex and re-cuts an undercity district, and scrubbed to a week before that epoch —: the glow shapes, depth bands, ghost pins' bands, the band ladder's counts and **Go there**'s band those of `underFindPlaces` over that frame for §11.2's listing at that week, no glow over a gallery the frame lacks, the gaps Below V01's `gapUnits` at that week, and the head's reading back when the scrub returns to the head | PR (fixtures), nightly |
| T-V4-82 | damage below ground (g item 123 (b), (c), (e), (f), and g item 122 (d)'s look below ground; takes T123-1's, T123-2's and T123-6's clauses below ground) | on a fixture holding a ruined church with a crypt joined to a catacomb, a ruined building over a cavern with its dig access, a decayed building's cellar over a ruin, an undercity neighbourhood whose cluster turns `lost` and decays over a century of epochs, and a never-decayed control, at levels 0 to 1 in steps of 0.05: (a) T123-1: every room, wall, opening and id of each storey below 0 and of each underground building identical between the intact and the damaged plan; (b) T123-2: the damaged set of every element below ground at each level contains the set at every lower level, each element damaged exactly while the level is above 0 and at least its threshold (§6.3 *Plan damage*'s comparison), the same element breaking at the same level for a seed; (c) the kinds: `belowKind` gives each element of the fixture's storeys below 0 and rock-side runs its kind of V04 §5.6, no element of the five kinds damaged below the `ruined` share's floor (V06 §3.23 (2)), and at level 1 every crypt room, wall line, way down and the crypt join present, the crypt drawn partly collapsed; (d) a drawing only: the excavation reading, every access and link record, `ExcavationRecord`, the document hash and every digest byte-identical at levels 0, ½ and 1, every closure state unchanged by any level and the `lost` cluster still `lost` (UC21); (e) T123-6 per band: each band's dd2vtt holds no `line_of_sight` segment for an underground building's outer wall run past its threshold and keeps one for each `cellarWall` run past it, a door past its threshold no portal, and the rubble drawn in the image, never as a wall; (f) a restoration lowering the level clears the damage in reverse threshold order, each element between the level and its own `decayPeak` (since it entered the plan, V06 §3.23 (3)) drawn in patch material; (g) the never-decayed control and every band of an underground with no decayed building draw and export byte-identically to the build without the layer — the `item123.damage` registration of the underground's bands and per-band exports on V12 §3.7.8's engine (V12 §2.13), written by the U5 seat; (h) save, load, undo, redo, regenerate and migrate at levels 0, ½ and 1 re-read the same drawing, within V04 §6's *Damage below ground*; (i) the look (g item 122 (d); V03 §5.6 (4)): on a fixture calamity with its linked `reconstruction` condition whose disaster look ruins the district of two churches with crypts — one never decayed, one whose own level lies above the look's at severity 0 — at severities 0, ½ and 1: in the condition's weeks each crypt's elements draw at its church's drawn level (`PlanDamage.level`, the higher of its own level and the look's `lookLevel` by severity) by the same thresholds, and at its own level with Show crises off, in the weeks outside the condition's and from the week a Works begun on the church hands it over (V06 §3.22 (3)'s `crisisLookYields`; this clause once V06's E2 has landed); under View as at `public`, `local` and `secret` the same drawing, the condition `public` (§7.7's DR44), and a `none`-row condition carried beside it changing no crypt's drawing at any key; no element drawn repaired as the look leaves; each crypt join, every access and link record and every digest byte-identical with the look and without; each crypt storey's per-storey scene walls, portals and lights at the own level, the look in its image only; an underground building under the ruined district at its own level throughout | PR (fixtures), nightly |

**The owner's panel** (§13.6 without a reference; V12 §3.9.1's `PanelSpec` V4-U5, its spec stated here once and cited by
V12): at U5 the owner rates, blind to which is which, SOLO 30 — ten CITY and five METROPOLIS underground bands, each seed
in the historical and the navigable mode, shuffled, a ruin among the frames, each frame holding the cathedral's crypt (or
the largest church's) and the largest catacomb complex — on `legibility` and `realism`, with one render in the reference
family's hatched style beside the set, shown and never rated (V12's `styleReference`; the side-by-side of the parity
paragraph above); an unrated panel follows §13.6 (7) — the build continues, the milestone is *provisional — not rated*.

## 8 Build plan

**Where it slots (J-V4.46; item 526; J122).** The underground is staged by the owner "after the city is mastered"
(DEFINITION §4): it is milestone **M6-U — the underground layer**, after M4 ("mastered") and after M5 (stage 2), beside M5
when a second pair of seats is free — owner question 1, decided (J122); §16 and INDEX.md carry the combined order. It reads
three services of V01's `@plat/hood`, which V01 builds in its W15 at M5 (V01 §8.2): `fabricSignature` (U3, the ruin's
distinctness step, V04 §3.5.0a (7)), `districtsAbove` (U4, C5's parent and the clerk's ruin answer, V04 §3.6, V04 §4.5) and the
local-place step's opening pass (U4, T6 and the commits of V04 §3.10). Run beside M5, U3's distinctness step and U4's C5 are
scheduled after W15's services land, and T6 runs the opening pass only while `@plat/hood`'s local-place step is registered
— a registry lookup (§4.12): absent, no opening place is made and their count is reported (V04 §3.11), and the first tail
run after it registers makes them, a declared shift of the places (§13.3) (J-V4.108). Its hooks are M4's (the records, the
tools, the closure rule, the basement row, the underground hook fixture); it builds on M2b's placement solver and
granularity law, M3a's edit system and API, M3b's exports, lights and night view; V06's replay (M6-E) calls its
`BuriedFormer.lay` only while `@plat/under`'s U-SYS is registered (a registry lookup), so a history replayed before U3 lands
clears its former fabric and buries nothing underground. V09's application share of the layer (AP6) lands with M6-U, priced
in §16's row for V09's staged screens, outside this total. Staffing per the owner: rulings on the Fable seat, building and
verification on Opus seats.

| step | content | exit (executed, not asserted) | est. (pw) |
|---|---|---|---|
| **U0 — spike** (risk retirement) | U-NET N1–N10 on B-CITY-lite (the graph, the tree, the root-first invert pass, the commit and `corridorUnion` on part 0); the tail scheduler with `phase` and its yield to view requests; U-DIG's A\* on the 160 × 160 grid; the METROPOLIS navigable tail on a forced-void site (T1, T2 with a ruin, T2b) | T1's p95 at CITY ≤ 40 ms (historical) and ≤ 80 ms (navigable); **the METROPOLIS navigable tail p95 ≤ 343 ms and U-ACCESS's sample count at METROPOLIS measured, each V04 §6 fallback triggered by it**; T-V4-1, T-V4-3, T-V4-5 green on 20 seeds per rung; the A\* identical on the five engines; the first map unchanged (§12.5); the register check (below) | 1.25–1.75 |
| **U1 — the network** | U-NET whole (N0–N12 with N3a and N11a, the three families, both presets; the part-0 reads, and N6's wall-crossing and cliff vertices with N7's drop: 0.25 pw); U-FORECAST wired into S7b (item 551) with P1–P6, `forecastSafety` and its own §12.4 row (item 475); T8 (U-RECONCILE); `Outfall` from S1 (item 205); the drain rule and `drainOf`; the two controls (item 403) with their S7b locality (item 549); the cut-away with its three modes and the band ladder; the `rock` and `void` roles; GeoJSON, SVG and PNG per band; the tail's S13a for runs; migration (V04 §4.6) | T-V4-1 – T-V4-8, T-V4-30, T-V4-33, T-V4-35, T-V4-39, T-V4-42, T-V4-64 (the network's part), T-V4-67; T14-1 as item 485 amends it (pixel parity under the parity presets); T-V4-79's (a)–(f) and (y) clauses for what U1 lands; T-V4-80 (j); **the default presets' one-time ground shift recorded as the M6-U output version's declared shift in `plat/goldens/`**; the tail within V04 §6 at CITY; the register check | 4.75–5.75 |
| **U2 — the sewer-front neighbourhoods** | U-FRONT (F0–F5) with the surplus absorption, members and clandestine modes; the neighbourhood accesses and shafts; the sewer light rows; `Junction.chamber`; labels of runs and the sewer-front district; VTT per band | T12-1 and T-V4-9, T-V4-10, T-V4-25 (sewer part), T-V4-26, T-V4-28, **T-V4-41 (existence, with its pre-decided fallback)**; T-V4-79 (g), (m), (w), (x); the crowding hook by hand; the register check | 2.75–3.75 |
| **U3 — the void systems** | U-SYS: **the ruin** (V04 §3.5.0a: sources, culture and axis, plan families, decay, distinctness, `RuinRecord`, `ruinCentre`; 2.5–3.5 pw), catacomb (layout), cavern with **the mining boost, fissures and the mine breach** (0.5–1 pw), quarry and mine voids with the surface split and chain mines, vaults, buried — the buried former settlement and `BuriedFormer.lay` among them (g item 113 (c)) — with `Chamber.kind`; **item 110's parts** (1–1.75 pw): the arch vaults and `ArchVaults.reconcile`, `gradeFaces`, the terminal cistern and the aqueduct-delivery cistern test, `foundationObstacles`, the ruin's monuments through V02's `drawTiers` and `layTiers` and its modelled columns; the system programs (the `ruin` program, the monuments, the pillars, the former wall bands) and labels; the dossier's system forcing (item 386, V04 §2.3a) | T-V4-11 – T-V4-17, T-V4-38, T-V4-43 – T-V4-47, T-V4-55, T-V4-56, T-V4-61, T-V4-62, T-V4-64 – T-V4-66, T-V4-68, T-V4-69, T-V4-77, T-V4-78 (c), T64-1 – T64-3, T65-4, T65-6 – T65-8 on generated output; T-V4-80 (a)–(f); the register check | 8–11.75 |
| **U3b — access and excavation** | U-ACCESS (T2b): overlap and mine breaches, proximity links, dig draws, public openings, reuse, the excavation reading with the `lost` state and `ExcavationRecord` (g item 113 (e)); F6's void dwellings and their vacancy on a lost cluster; the sealed style and `showUnexcavated`; the forecast's P7; the village working's breach at T2b and over `scope.workings`, the public-opening `placeAccess` and the opening pass's edit callers (the stage-2 switch's edit reaching the pass only as its re-derivation's T6, V01 §3.15, so nothing of its own to build; 0.25 pw) | T-V4-20, T-V4-21, T-V4-48, T-V4-49, T-V4-53, T-V4-54, T-V4-56's village clause, T-V4-57, T-V4-59, T-V4-76 (b)–(f); the register check | 2.25–3.25 |
| **U4 — the undercity, the catacomb rules and the closures** | U-CITY (C0–C6) with `District.core`, the read-only lifeline test, the rank draw, the carve post-pass, the plaza ring and visibility-graph walkways; `underDistance`; the forced vaults; **the catacomb rules** (burial-face candidates and catchments, the count, the rank cap, the ratchet, stagnation and fill, the quarry ossuary, the crypt join, the burial-face entrance, the charnel vault; 1.25–1.75 pw); **the crypt derivation**, moved from V03's P2 (`Basement.crypt` with its seed, growth and rank — V03 §3.7.4 steps 1–3, item 238 —; V02's crypt ladder with its `raised` form and lift, the lift and the half raise acting on the ground wings over the basement's ring (V02 §3.14.5 (d)); the stair-entered test and the whole basement of a crypt no stair reaches (V03 §3.7.4's *A stair-entered crypt* and its `always` bullet); and V03 §3.7.1's crypt clause of `basementDoor(b)`, the door point off the crypt's vault (item 578), whose first reading moves a walk-out church's outside door off its crypt and V01's entrance reserve with it (V01 §3.8.2 step 5; its close-up chunks stale by V01 §3.8.3's digest); 0.25 pw); the hand-offs of V03 and V07 (the join on `Basement.crypt`, the church-class host rule, `Entrance.faces`, `'rung'`, `v.parish_church`, the maintenance mode; 0.25 pw); the standalone line (V04 §3.1: a gate over the existing steps, within the range); U-LINK L1, L3, L5 (its always rung, the dug network and the release), L6, L7; U-DIG's pieces for `addUndergroundAccess`, the lifeline closure and L5, with the dwelling closure's way in and the grouped access (item 372; absorbed in the range); the read-ahead (V04 §4.7); the undercity light rows and labels | T65-1 – T65-5, T66-1 – T66-4, T66-6, T-V4-18, T-V4-19, T-V4-22, T-V4-34, T-V4-37, T-V4-40, T-V4-48's closures' clause, T-V4-50 – T-V4-52, T-V4-58, T-V4-60, T-V4-71, T-V4-74, T-V4-75; T-V4-79 (h)–(l), (q)–(u); T-V3-23 (j)'s door and basement-extent clauses (V03; they run from M6-U on); the crypt derivation's first reading recorded in the M6-U output version's declared shift (§13.3) — the churches' crypts and their basements, the `raised` form's lifted wings, and each walk-out church's outside door moved off its crypt with V01's entrance reserve — beside U1's forecast shift; the register check | 5.25–7.25 |
| **U5 — time, 3-D and hardening** | U-FADE, `extend` (with the wall drops over `EpochScope.levelled`), `CatacombGrowth.grow`, `UndercityEpoch.reread`, `ArchVaults.reconcile` over `EpochScope.raised` and access at an epoch (item 319; V06's `under.extend`) run by hand and on M4's grow path; **the epoch contracts** (0.25–0.5 pw): U-NET laid whole at the first sewers epoch, `AccessPassStrategy.run` over an `EpochScope` with the `lost` transitions, `CatacombGrowth.grow`'s `opts` and the primary reading, `QuarryWorkings.extend` and `workedOut`, the landfall closure; `Foundations.apply` with its `FoundationsResult`, F6 filled by V06's relocation, the calamity deaths in `CatacombGrowth.grow`, the buried floor's terraces under `raiseGrade`, the opening pass's epoch callers (0.25 pw); the clerk's providers (V04 §4.5); glTF and CityJSON of the underground; performance at METROPOLIS with item 119's comfort-level runs (T-V4-32 (b)); Find on Below (`underFindPlaces`, item 120, at U5 — M5, Find's milestone, lands before M6-U); both absorbed in the range (J-V4.126, J-V4.127); **the damage below ground** at the later of U5 and V03's P4 (item 123: `belowKind`, the underground view's damaged footprints, the per-band exports, the look over a storey below 0; a plan's storeys below 0 drawn with V03's P4; 0.25 pw; J-V4.130; V04 §5.6 (6)); the owner's panel | T-V4-23, T-V4-24, T-V4-27, T-V4-29, T-V4-31, T-V4-32, T-V4-36, T-V4-63, T-V4-70, T-V4-72, T-V4-73, T-V4-76 (a), T-V4-78 (a)–(b); T-V4-79's remaining clauses, T-V4-80 (g)–(i) and (k), T-V4-81, T-V4-82 (at the later of U5 and V03's P4); the epoch clauses of T-V4-15, T-V4-52, T-V4-56, T-V4-65 and T-V4-74 (b); the panel rated or offered (§13.6 (7)); the register check | 3.25–4.5 |
| content | the naming slices (item 445, the `ruin` slice with V11), the dossier row sets (V04 §2.3a), the ruin, openings, dig and catacomb tables, the ancient-culture rows reviewed with V11, the light rows' tuning, the underground's style rows in every shipped sheet (V04 §5.2) | reviewed by the clean-room scanner (§17.1); every cell with provenance; the register check | 1–1.5 |
| **total** | | | **28.5–39.5** (accepted, owner question 2, J122; §16's total is the base's, computed once, item 568) |

**Item 110's dependencies.** The raised-way record with its spans' `use` (item 244), `RetainingWall` and the levelling land
with the base's item 110 side at M3a, and V02's `layTiers` with the base outline builder at M3a (item 229) — both before
M6-U, so M6-U waits on nothing new. The second known-city fixture (V12, M3a) carries a raised road, a ravine and a stepped
temple; this volume runs T-V4-62 – T-V4-70 on it from U3.

**The register at each exit** (X-V12-16; J-V4.117, J-V4.118). Every step above that lands a registry table of this volume,
or a calibratable column of one, exits with "`plat calibrate register --check` green over the cells it lands — their entries
from V12 §3.11's default line (`plat calibrate register --defaults --milestone <the step's id>`) unless a V12 §3.11 line
names the column" — the *register check* of the table above. The lint runs at PR tier from M1 (T-V12-20), so the change
that lands a column carries its entry, never a later change (V12 §3.11, *Every volume's landing exits green*). A table lands
whole, every column, in the first step whose change first ships its rows (holds a compiled cell; V11 §2.1's empty-table
rule: every registry row compiles from C0 as its schema's empty table, J-V11.84, and `--defaults` writes no entry for an
empty table's column), and that change writes one entry per calibratable column (V11's `ColumnSpec`; `rows` absent, so a row
a later step adds — a light row, an opening kind, a culture row — needs none); a table that first ships rows in an earlier
step than planned below takes its entries in that step, the check failing the step otherwise. The landing seat writes the
named lines' entries first, then runs `--defaults` for the rest (V12 §3.11's order). Each change that lands a V04 stage names
its `U-*` id among the readers of the registry rows its stage reads (57, 58, 58a, 59; V11 §8's readers paragraph). V11's
cells in these tables are authored by V11's C8 (V11 §8), whose rows land inside the step that first ships their table's
rows, so that change carries C8's entries by V12 §3.11's lines for them — the check reads the change, not the seat. A base
cell that one of this volume's requests (V04 §10) adds lands with the step that builds its reader, owner `base`, by a V12
line where one names it, else by the default line (V12 §3.11's items 109 and 110 paragraph); so do the cells of the base's
II.7 tables (registry rows 57 and 59) where a step here, not M4's hook fixture, first ships their rows. Keys, laws,
enumerations, switches, word lists and dossier row sets take no entry (V11 marks them `calibratable: false`). This volume
writes no register line of its own (J-V4.117). As planned:

| step | first ships rows here — holds a compiled cell, V11 §2.1's empty-table rule (registry row) | each column's entry from |
|---|---|---|
| U0 | `under.network` (58), every column — N1–N10 read it | the default line |
| U1 | `under.layout` (58), every column — S14's access symbols (its `openings` rows, N11's gratings) read it; and the base cell `forecastSafety` of `under.rule` (57; II.7.4's `UndergroundRule`, item 551), whose reader U-FORECAST lands here | `under.layout`: the default line; `voidDwellings`, `links.overlapShaftM` and `links.overlapShaftChance` by V12 §3.11's "V04's other item-109 cells" line, which is the default line's entry itself (one entry each); `forecastSafety`, owner `base`, by the default line |
| U2 | none of this volume's: the sewer light rows are rows of the base's `lights` (51), whose columns the base's landing of that table already bound | — (the check runs and is green) |
| U3 | `under.ruin` (58a), every column; `under.catacomb` (58a) — U-SYS V04 §3.5.1 and T-V4-11 read it; this volume's `params` keys of `under.systems` (59): every row's `surfaceClearCm` and the `cavern`, `quarry`, `vaults`, `buried` and `dug` keys of V04 §2.3 | `under.ruin`: V04's cells by V12's `under.ruin` V04 line, V11's (`chance`, `cultures`, `survival`, `sourceWeight`) by V12's lines for them; `under.catacomb`: `ossuaryReachM` by V12's line for it, V11's cells by V12's `under.catacomb` line; `under.systems`: `mineBoost`, `mineCap`, `fissureChance` and `breachM` by V12's item 109 (a) line (owner `base`), `miningCellShare` by V12's line for it (V11), every other key by the default line |
| U3b | `under.openings`, `under.dig` (58a) — U-ACCESS reads them; and the base cell `accessForecastMin` of `under.rule` (57; II.7.4's `UndergroundRule`), whose reader, P7, lands here | `coverM` and `planReachM` by V12's lines for them; V11's cells by V12's `under.openings` and `under.dig` lines (`sealedFloor` by its own); `accessForecastMin`, owner `base`, by V12 §3.11's "V04's other item-109 cells" line |
| U4 | none: the catacomb rules, U-CITY, U-LINK and U-DIG read tables U1 and U3 landed | — (the check runs and is green) |
| U5 | `under.fade` (58), every column — U-FADE reads it | the default line (V12's "V04's other item-109 cells" line names the fade rows and defers to it) |
| content | none: the naming slices (68) and the dossier row sets (V04 §2.3a) are not calibratable; the light rows' tuning and the underground's style rows in every shipped sheet are rows of tables (51, 52) whose columns the base's landing already bound — entered, or not calibratable | — (the check runs and is green) |

**The due steps.** A V12 §3.11 line whose `measure` names a step at which the bar it cites does not run in this plan is due
at the step whose exit runs that bar, written `'V4-<step>'` (a volume's phase as V12 §2.8's milestone ids write it,
`'V4-U5'`): the `under.openings` and `under.dig` lines' "`measure` at U3" (the bar map's 109 (j) (5) rows, T-V4-49 and
T-V4-54) at `'V4-U3b'`, and the `under.ruin` `sourceWeight` line's (the 109 (i) row, T-V4-58, U-CITY's source choice) at
`'V4-U4'`; every other V04 line falls due where it says (U3 for the ruin, cavern and span-rule measures, U5 for the V4-U5
panel, and the default line's due for the default line — V12 §3.11: M-CAL, or `M-CAL/under`, the underground's later corpus
run, when a step lands after M-CAL).

**What V12 §3.11's V04 lines leave to this section** (J-V4.118). Its `under.ruin` V04 line and its span-rule line close on
"V04 §8's pre-decided fallbacks, else the panel rule". The history row at each stage, and what passes it (V12 §3.11's
*Staged entries*: the last non-`corpus` stage's pass confirms), and the pre-decided move:

| cells (V12 §3.11's line) | the history row at each stage, and what passes it | the pre-decided move (once; the bar re-runs or the group re-sits) | a second miss |
|---|---|---|---|
| `distinct.retries`, `distinct.rotateDeg` (the `under.ruin` V04 line) | T-V4-45 at U3: the `W_RUIN_SIMILAR` share and V12's `paired` margins on `ruin.blockArea`, `grid.r4` and `grid.axis` — the U3 stage passes when the share ≤ 5 %; the V4-U5 panel's rated pass confirms | only when T-V4-45 still fails after V11 §3.23.4's culture-row move (V12's `cultures` line) has run: `distinct.rotateDeg` 30 → 45, a grid's greatest axis difference, as a `fallback` run (V12 §3.7) | `not-achieved`, reported to the owner as a table defect (V12 §5.5) |
| `monument.clearM`, `.tierDecay`, `.ceilingClearCm`, `.moundShare` (the same line) | T-V4-68 at U3 (conformance, 0 violations; it moves no cell), then the V4-U5 panel's `realism` on the frames holding a ruin, which confirms | a No at V4-U5: `monument.tierDecay` 0.85 → 0.9 and `monument.ceilingClearCm` 200 → 150 — more tiers stand and fit under the chamber's ceiling, T-V4-68's clearance clause reading the new margin | the panel rule: `not-achieved`, reported |
| the line's other V04 cells — `ancientYears`, `significance`, `maxFrameShare`, `maxChambers`, `forecastFloorShare`, `depthM`, `burialByAge`, `smoothM`, `sharedAxisChance`, `ageRefYears`, `coverKeep`, `fadeFactor`, `magicLightChance` | T-V4-43's presence rates and T-V4-44's structure at U3 (the U3 stage passes when both pass), then the V4-U5 panel, which confirms | none stated | the panel rule |
| the span-rule constants — the cells `raisedWays.structure.span.*` (row 80; the rule at §2.7, item 244; their values in V11 §3.24.2) — base cells landed at M3a with the base's item 110 side, never by a step here | the M4-110 panel at M4, then T-V4-62 at `V4-U3` (conformance, 0 violations; the stage passes), then the V4-U5 panel's `realism`, which confirms (V12 §3.11's span-rule line, the line's home) | none stated | the panel rule |

T-V4-62 reads no `under.ruin` cell: the `under.ruin` V04 line's history row records the bars this table names for its groups
(T-V4-43, T-V4-44, T-V4-45, T-V4-68), and T-V4-62's row belongs to the span-rule line. No line names a `bar.T-V4-n` metric,
so this volume registers no `BenchBarDef` (X-V12-15).

**Risks, in order.** (1) The tail's time at METROPOLIS in the navigable preset, now with a ruin and the access pass (U0
measures at METROPOLIS; V04 §6's fallbacks). (2) The forecast's miss moving households between the surface and the
underground (T-V4-8; `forecastSafety`, the absorption below and T8 absorb it; a miss over 25 % re-tunes P4's admissible share
and P7's building estimate). (3) `corridorUnion` on sparse, frame-sized rock faces (U0; §3.7's fallback applies unchanged).
(4) Legibility of the dark underground and of the ruin program (V04 §5.3's plan lines; the owner's panel). (5) The volume
laws giving voids too large or too small to host an undercity (T-V4-11, T-V4-13; the rows are calibratable). (6) A ruin
plan too like the town above (T-V4-45). (7) The span rule leaving too many or too few arch vaults (T-V4-62;
`span.vaultShare` and the cap are calibratable rows). (8) Shallow ruins cutting most monuments to stubs (T-V4-68; the
owner's panel; `burialByAge` is calibratable; the pre-decided move above: `monument.tierDecay` 0.9, `ceilingClearCm` 150).
(9) Built beside M5, M6-U waiting on V01's W15 services (`fabricSignature`, `districtsAbove`, the opening pass): U3's
distinctness step and U4's C5 are scheduled after them, and the opening places arrive as a declared shift.

**Risk spikes.** (a) At U3's start: the ruin plan's distinctness and structure bars (V12's `paired` and `twoSample`) on 50
fixture seeds; pre-decided fallback: the next culture family becomes the default draw. (b) At U3b's start: the excavation
reading's per-commit cost at METROPOLIS (≤ 1 ms); pre-decided fallback: the reading recomputed per band of parts touched
rather than per cluster, cached by part digest.

**Evidence that ends each step** is the step's bars executed and quoted, the declared shifts recorded (§13.3), the register
check green over the cells it lands (*The register at each exit*, above), and `docs/lane-events.log`'s LANDED line.

## 9 Decisions (each vetoable)

A decision another later one replaced or changed carries one mark: *superseded by* or *amended by* the governing row, which
keeps the reason.

| id | decision |
|---|---|
| J-V4.1 | chose one package `@plat/under` for the engines (registered in `@plat/layout`'s registry) over spreading them through `@plat/layout` and `@plat/plots`, because the layer is staged and must land and version as one unit with no edit to the base's packages but registrations |
| J-V4.2 | chose to run the underground as a tail after the first map, serially on the generation worker and before any queued edit (yielding only to view requests), over adding it to the main critical path, because §12.3's CITY model budget has no room for it and the default view hides the layer, while the population and the digest stay whole; the ground arena's geometry and digests are final before the tail, T8 is the tail's one writer of ground uses and household counts (J-V4.59), and the ground's model digest and the root digest are finalised after T8 |
| J-V4.3 | chose `mixed` (culverted drainage lines as trunks, street mains feeding them) as the default family over `follow-streets`, because medieval towns covered their brooks and laid a few mains under the principal streets — the realism tiebreaker |
| J-V4.4 | chose the tree as a multi-source shortest-path search from the admitted outfalls over the way graph (D8 itself for `drainage-lines`) over a network optimisation, because it is deterministic, O(E log V), and reproduces the downhill-to-the-nearest-outlet shape |
| J-V4.5 | chose tunnel selection by accumulated served area against per-preset thresholds, with the downstream closure, over per-street rules, because the served area is what sizes a sewer (II.7.2's law) and so one quantity decides existence and size |
| J-V4.6 | chose one invert pass with a re-route, then truncate, ladder over lowering the terrain, because the owner's town never trenches and every run must fall |
| J-V4.7 | *Amended by J-V4.129.* Chose outfalls from S1's drainage outlets, admitted downstream of the harbour and the mills, with the town moat and then a cess field as fallbacks, over a fixed river outfall, because a town may lie on the sea, a lake or dry ground and historically discharged to its ditch when it had nothing better |
| J-V4.8 | chose logical house connections (`serves`) over drawn house drains, and drains only for the priority institutions, because thousands of stub tunnels would cost arena edges and draw clutter for a fact the reader already gives |
| J-V4.9 | chose sewer chambers as flagged junction wedges on part 0 over `chamber_wall` chains there, because U2 keeps part 0's L1 to tunnel chains only |
| J-V4.10 | chose navigable-preset passages at the mains' closest approaches over random cross-links, because loops where mains nearly meet read as a planned fantasy network and stay deterministic |
| J-V4.11 | chose the network's own gratings at a manhole spacing on public ground and mouths at outfalls and culvert inlets, over access only where people live, because a maintained sewer has openings and the undercity's lifelines and the connection graph need them |
| J-V4.12 | chose a way's fall as a derived reading (`wayFall`, item 208) over the stored `Way.flowToward`, because no stage produced the field and a stored copy would go stale after every terrain edit |
| J-V4.13 | chose a forecast that runs the network's own first steps at S7b for every family over the base's street-only prediction, because the prediction had no input under `drainage-lines` |
| J-V4.14 | chose to keep the network's plan through ground edits (only connections and the fronting blocks re-derive) over re-deriving it, because sewers outlive the streets above them and an edit's locality must stay small; the whole network re-derives only by Re-derive from the network stage |
| J-V4.15 | chose `Tunnel.depthOffsetCm` as the one depth edit of a tunnel over editing invert knots, because the invert must stay monotone and one offset re-laid by N7 keeps it so |
| J-V4.16 | chose catacombs as a level grid aligned to their burial face, grown breadth-first to the ossuary need (and, after generation, by the ratchet), over a random walk, because it is deterministic, sized by the law and matches the grid-like ossuary galleries of the historical pattern |
| J-V4.17 | chose soluble caverns along the drainage lines at the water table and volcanic tubes along the steepest descent, capped by length near the town, over rock-share-only extents, because caves follow water or flow and a frame-wide cave would cost more than its reader |
| J-V4.18 | chose each quarry working as one chamber with its pillars drawn by the `quarry` program over modelled pillars, because a modelled room-and-pillar field is tens of thousands of edges at CITY for no reader but the picture |
| J-V4.19 | chose vaults under bridge approaches and steep streets and cisterns under old precincts and the castle's own court, admitting a cistern's own host, over the literal "public ground only", because a castle's cistern under its ward is the historical case |
| J-V4.20 | chose to bury a buried town's squares as `square` chambers and keep its buildings' entrances as portals, because the old market under the new is the buried town's natural plaza and the exports need its doors |
| J-V4.21 | chose to apply the surface constraint to void elements and undercity plots only within `surfaceClearCm` of the ground, over everywhere, because deep rock is not constrained by what stands above it |
| J-V4.22 | chose to carve an undercity's main chamber where its void has none (within its own part), over dropping the neighbourhood, because an undercity hollows its own square — and to drop it only when the rock will not take the carve |
| J-V4.23 | chose walkways as a minimum spanning tree over each chamber's openings and a ring round the core's plaza, over a grid of streets, because it is deterministic, connects every opening and keeps the plaza open |
| J-V4.24 | chose one neighbourhood per void cluster, a large cluster split by its chamber graph, over free partition, because a neighbourhood should be one connected place |
| J-V4.25 | chose to realise lifelines in the order access, air, water, then an optional route outside, reusing existing openings first, over new openings always, because the fewest new openings keep the map legible and the rules satisfied |
| J-V4.26 | chose links by per-part index proximity with station-greedy spacing and `via` by the floor difference, over all-pairs, because it is linear in the elements and matches II.7.6's spacing rule |
| J-V4.27 | chose a local 1 m grid A\* for dug connectors over the terrain grid, because a 5–10 m cell cannot keep a 0.5 m foundation clearance |
| J-V4.28 | chose the fade weight as exposure × rate × chance × neglect-by-usage, and the op by a table per element class and condition with seals favoured by order, over uniform ops, because disused tunnels decay first and authorities seal where they rule |
| J-V4.29 | chose, at a growth stage, to connect new faces to the existing network and reopen closed runs on the chosen path before digging new ones, over re-deriving the network, because regrowth-first (II.6) and survivors never re-roll — the rule g item 113 (d) keeps, in the replay as in the live epochs |
| J-V4.30 | chose an undercity clearance only while `disorder` is below a threshold, at a per-year rate, one per epoch, over clearance by hand only, because order is what clears a warren |
| J-V4.31 | chose the dungeon-map figure-ground (a hatched rock halo, voids in paper) over the ground's ghost, `cutaway` by default, over a translucent overlay by default, because it reads at once as underground and stays legible — the look of the reference family's dungeon and cave maps (`research/findings/watabou-extra-a.md` §2.7–§2.8; `research/findings/dwellings-posts.md`), named as the visual precedent, nothing copied |
| J-V4.32 | chose rock as a light-blocking prism to the band's roof and the plan lines composed after the light, over a lit plan alone, because light must not pass through rock and legibility is the floor |
| J-V4.33 | chose "lived only" lighting of the network's junctions and accesses over item 68 (d′) (1)'s lighting of every run's junctions and access points, because nobody tends a torch where nobody lives, and (d′)'s "sewer tunnels sparse" is kept by the lived runs' junctions and the shafts; a narrowing of (d′) (1), recorded here as vetoable — reverting it is one table change (the lived test removed from the sewer rows) |
| J-V4.34 | chose labels for named runs, systems (in their main band), undercity neighbourhoods and the plaza only, over labelling every tunnel, because the underground's label budget is small and names mark what matters |
| J-V4.35 | chose the VTT band scene's walls from void kerbs, chamber walls and underground footprints, with portals only at openings in a wall line (a door access, a door or breach link, an underground building's entrance, a grille) and each vertical access a shaft light with a `plat` object, over walls from the rock face or portals at every access, because the kerb is the wall a token meets and a vertical access has no wall opening to portal through (V04 §5.5) |
| J-V4.36 | chose glTF voids as inward-facing solids with the rock not exported, over exporting rock, because the voids are the model and a rock mass would dwarf the file |
| J-V4.37 | chose to reuse `Junction` records on underground parts, over a separate record, because `corridorUnion`'s wedge needs an owner and the light and chamber rules need a junction to host |
| J-V4.38 | chose `Chamber.kind` as a stored row reference, over inferring a cistern or an ossuary from its system, because one system holds several chamber kinds that draw and light differently |
| J-V4.39 | chose `District.core` for an undercity neighbourhood's main chamber, over a search at every read, because six readers need it and a carve makes it |
| J-V4.40 | chose the connection stage as the one writer of `District.outskirts`, over the undercity stage, because outskirts are defined by the links that join the neighbourhood and those exist only after U-LINK |
| J-V4.41 | chose the family and the preset as two model controls in the advanced panel, over fixed values, because D-3's fantasy toggle must be settable and the families are the owner's "exactly follows the roads. Or they don't" |
| J-V4.42 | chose `LayerSpec.underView` with three modes over one fixed cut-away, because relating a tunnel to its street and reading the underground alone are both needed |
| J-V4.43 | chose `Tunnel.serves` to list plots only, over plots or buildings, because a plot's buildings drain through it and one list is one truth |
| J-V4.44 | chose `Tunnel.chambers` as a view over its junctions' flags, over a stored field, because the flag lives on the junction and two stores would diverge |
| J-V4.45 | chose to read the dossier's sanitation and subterranean records through two row sets with written rows and binding targets (V04 §2.3a), matching custom records by their resolved profile, forcing sewers and systems, and to give a subterranean institution no allocation takes a dug underground from its cellar, over ignoring them, because DR17 names them and a dossier fact must exist and be bound on every map |
| J-V4.46 | *Amended by J122.* Chose M6-U after M5, beside M5 when a second pair of seats is free, because the owner stages the layer after the city is mastered; since M6-U reads three of V01's M5 services (`fabricSignature`, `districtsAbove`, the opening pass), a lane beside M5 schedules U3's distinctness step and U4's C5 after V01's W15 and gates the opening pass on its registration (J-V4.108) |
| J-V4.47 | chose invisibility as the parity metric and an owner panel without a reference, over inventing a reference, because no generator has an underground |
| J-V4.48 | chose to declare `Outfall` with S1 as the producer of `Terrain.outfalls`, and the `stream` and `field` kinds, because the base names the type and the field and never declared or filled them (item 205) |
| J-V4.49 | chose to make a pre-U-NET document's underground by the version's upgrade event with the ground unchanged, over leaving it empty, because `Features.sewers` already says a CITY has a network |
| J-V4.50 | chose to hold L5's pieces while their dossier institution is live, a delete refused `dossier-owned` with `rejectSite` offered, over letting a delete stand, because the institution's underground is part of the dossier fact on the map |
| J-V4.51 | chose to have underground plots sample the ground's prosperity field with its daylight-share term (item 102), and light shafts take the opening's direct-light visibility — the render's shadow term under the current sun, never item 102's model share — over an underground sun term of their own, because the underground's standing follows its parent ground's wealth, and a shaft in shade is darker |
| J-V4.52 | chose a ruin laid as an ancient plan from a culture row (grid, axial, radial, terraced) and decayed by a persistence order, with a distinctness retry, over a cavern-like organic layout, because the owner asked for "the remain outline of past civilization", much more structured than a cave |
| J-V4.53 | *Amended by J-V4.122.* Chose the excavation state as a reading derived from the connection graph, recomputed per commit, over a stored flag, because access arises from many causes (digs, openings, overlaps, links, edits) and is transitive, and a stored copy would go stale after any of them |
| J-V4.54 | chose that the undercity never excavates a sealed void — it settles only accessible clusters, and its lifeline closure never targets a sealed one — save the dossier's `require` on the void its forecast counted, over lifelines that open any void, because the owner rules that dwellings come only once access exists, and the dossier outranks the chance |
| J-V4.55 | chose catacombs only under burial faces ranked by the burials they serve, the church count setting how many, the largest kept under the first by a rank cap, and the crypt left to its church with a V04 join draw, over a church-sourced catacomb, because the owner switched it (J111: "cathedral also gets crypts but cemetaries get catacombs") and historically the great catacombs lay under cemeteries, mostly outside the walls |
| J-V4.56 | chose that the author's `delete` of catacomb galleries lowers `extentFloorM2` and tombstones the nodes, over refusing it, because everything is editable and the ratchet binds derivations, not the author |
| J-V4.57 | chose the ruin's depth band [4, 30] m drawn by age (item 563) over g's 8–30 m, because a young ruin lies within a sewer's reach and ancient streets commonly lie 3–8 m under a later town, so the owner's own example (a sewer growing through a ruin chamber) happens; with 8–30 m it would rest on the shaft chance alone |
| J-V4.58 | chose to admit `ruin` among the `historical` preset's undercity sources (item 558), because a ruin is a built void and so realism, as vaults and a buried town are |
| J-V4.59 | chose one declared tail stage, T8, as the only writer of ground uses and household counts — never geometry; the only other ground records the tail writes are V01's opening places in T6's S13a step, records and labels — after capping allocations at `forecastSafety` and absorbing surpluses below, over re-placing households on the ground from several tail stages, because the ground's geometry must stay the first map's and one writer is testable |
| J-V4.60 | chose to measure sewer-front existence at U2 (T-V4-41) with a pre-decided fallback — item 552's surface rule within `surfaceClearCm` and navigable `coverCm` 600 — over relaxing the surface rule now, because II.7.3's rule is the owner's and may suffice; the fallback applies only on a failed measurement |
| J-V4.61 | chose forced vaults under the oldest district for a required undercity where no counted void qualifies, over failing the requirement, because II.7.5 names "the vaults under the oldest district" and the dossier's word outranks the rule |
| J-V4.62 | *Amended by J-V4.122.* Chose that only cavern and ruin parts read the excavation state, every other part being accessible by construction (dug from the surface; the buried town entered from the raised town's cellars), because those were made by the settlement and so reached |
| J-V4.63 | chose to keep item 64's basement draw in U-LINK (after U-FRONT and U-CITY, whose walls and walkways it targets) and to move the void accesses — overlap, mine breach, proximity links, crypt joins, dig draws, openings, reuse — into T2b, over moving item 64 into T2b, because item 64's targets do not exist before T3 and T4, and the two draws then sit in different stages with different stream keys |
| J-V4.64 | chose, below TOWN, a catacomb record's charnel vault as one `ossuary` chamber of the `dug` system capped at `charnelMaxM2`, over a catacomb system or a church crypt, because the TOWN gate stands, J111 gives churches crypts, and the dossier fact must exist |
| J-V4.65 | chose L5's always-successful last rung — a cellar chamber under the basement reached by a hatch, `flooded` on wet ground and reported — with the basement guaranteed by S10b's hard row and S11's forced basement, over a refusal, because every subterranean dossier fact must have its underground |
| J-V4.66 | chose `underDistance` as the walkway path to an admitted access plus the street distance from it, rock absorbing emissions but water pollution and disorder, alignment by plan, over plan distance for every family, because an undercity trade reaches its market through the ways up while a guild seat still fears the garrison overhead |
| J-V4.67 | chose chain mines that reuse or make a working at the hinterland edge sized by the chain's volume factor, over a surface pit only, because item 104 (h) (1) sites a subterranean resource as a mine and the underground is where a mine lives |
| J-V4.68 | chose to key a way-following run by its upstream station rounded to 1 m, over its ordinal along the way, because a new junction must not renumber the later runs and detach their locks, names and offsets |
| J-V4.69 | chose the dig draw keyed by (building, void kind) with no epoch component, compared at every derivation with its made access persisted, over a one-time draw record, because the key already fixes the value, a rising chance may later cross it (a basement added), and no draw is ever repeated with a new value — §6.1's fixed-key draw |
| J-V4.70 | chose stagnation's `fill` as a monotone maximum of the derived shortfall over an accumulator, because a re-derivation must not count one epoch's burials twice and ossuaries only fill |
| J-V4.71 | *Superseded by J-V4.114.* Chose to price the mechanisms the first critique's findings add (T8, the cross-arena distance, N3a and the read-ahead, the forced vaults, L5's ladder, the root-first invert) over the critique's lower estimate |
| J-V4.72 | chose root-first outfall inverts with `freeboardCm` above the shore height, the shore's terrain standing for the water surface as §2.6 reads it, over leaf-first depths alone, because a mouth below the water backs the river into the network |
| J-V4.73 | chose to connect `channel` plots to mains and culverts (item 548), over mains only, because in the `mixed` family the culverted brook is the trunk the historical town drained into |
| J-V4.74 | chose tunnel grilles as a derived view over a stored field, because they follow the walls and the runs and a stored copy would go stale after either is edited |
| J-V4.75 | chose that an unexcavated element is drawn, labelled, explained and exported only for a `secret` key, whatever `showUnexcavated` says, because the view key must never leak what no inhabitant knows to a player's view |
| J-V4.76 | chose F6's scattered dwellings as blocks of the one underground pseudo-district (a `FaceRef` naming its part), over a pseudo-district per cluster, because II.7.3 keeps one pseudo-district per settlement and a handful of squatters is no neighbourhood |
| J-V4.77 | chose to read "secret passage" as a `dug` gallery, whose `knownTo` exists, over adding `Tunnel.knownTo`, because the network's own passages are public works |
| J-V4.78 | chose the undercity's first pick as a weighted draw over capacity × source weight when a ruin competes, over a fixed order, because item 109 (i)'s bar reads a ranked share, not a certainty |
| J-V4.79 | chose a span's `use` as an eager base fact, fixed at the raised way's generation from ground part 0 only (item 244) and read by this volume, over this volume deciding the spans in its tail, because the tail never writes the ground (J-V4.59), the ground's plots and V01's lanes must know which arches are walled before the tail runs, and a span decided lazily would depend on the order close-ups are opened |
| J-V4.80 | chose the arch vault as an at-grade chamber of the `vaults` system (`ChamberKind` `archVault`) under the base's infill, over a ground building or a new system kind, because the vaults system already owns the town's vaults, the base draws the span's wall and door, and a chamber carries the storage reading and a declared institution without a new entity kind |
| J-V4.81 | chose that an arch vault is no undercity void, never a fade candidate and never an L3 or U-DIG target, its condition following its span's, over treating it as any vault, because it stands at grade under a daylit structure that V06 decays as one, and an arch cannot outlive its arch |
| J-V4.82 | chose raised-way piers, retaining-wall footings and buried aqueduct stretches as foundation obstacles, re-derived at every derivation — later systems keeping out of their reach, older voids filled by the stretch or holding the footing as a masonry pillar where it covers under `collapseShare` of a chamber — over ignoring them or collapsing whole elements, because builders filled what their footings met and a whole cave does not vanish under one raised-way pier |
| J-V4.83 | chose to keep the base's aqueduct need test on eager inputs and this volume's cistern test reading the aqueduct's delivery points, with the terminal cistern this volume's and the buried stretches the base's line, over one joint test, because a cistern placed in the tail cannot feed a decision made before it, while the delivery points exist before the tail |
| J-V4.84 | chose monuments laid by V02's `layTiers` from the culture row's `monument` cell with V11's `stepped-shrine` heights row, decayed from the top under a ceiling cut, over a tier builder of this volume's or the great temple's heights row, because one tier construction serves ruins and living temples alike (V02 §3.15.6) and a temple's nave row would put a 20 m shrine on a pyramid |
| J-V4.85 | chose a drop at a retaining wall as a steep segment between two wall-face knots within one run, over a drop junction splitting the run, because the run stays one record with one condition (II.6) and the two knots alone keep every crown below the levelled ground |
| J-V4.86 | chose to make the necropolis's block nearest the centre one mausoleum chamber where the culture's monument hosts a tomb, over laying the monument in an ordinary tomb room, because a 6 m² room never fits a stepped mass and would be skipped every time |
| J-V4.87 | chose a monument budget of 0.5 ms p95 each over 2 ms, because `layTiers` is constant-size geometry of at most eight tiers, and three monuments at 2 ms would break the village rung's 10 ms tail |
| J-V4.88 | chose to count the arch-vault cap in the order raised ways were founded (their creation event, then address) and along each deck, over address order, so that a later way never displaces an earlier way's vaults (prefix-stable, §6.2; item 244) |
| J-V4.89 | *Amended by J-VI.4.* Chose that a hand access from a church-class building to a catacomb is a hand crypt join (source `crypt`, cause `crypt` with its event), a building without `Basement.crypt` bent to gain its crypt first, over admitting a `system` or `edit` catacomb head there, because V03's T-V3-23 (d) holds every catacomb head in a crypted building to cause `crypt` |
| J-V4.90 | chose a maintenance mode at village rungs for every inherited system, the sewer network and the undercity included, over the catacomb, quarry, vaults and buried town only, because V07's hand-off down keeps the sewer network's records too and tunnels are never torn down (DEFINITION §4) |
| J-V4.91 | chose that S11, run by F4, F6 and C4, writes `Entrance.faces: 'tunnel'`, over a post-pass, because the entrance derivation is S11's and the three stages run S11 on their arenas |
| J-V4.92 | chose column points modelled from the chamber, with a colonnade decay per row, over drawn-only columns, because V03 plans buildings round them and the dots drawn must be the points the plan avoids |
| J-V4.93 | chose to file the span rule's constants (`span.vaultShare`, the headroom and fall bounds, the cap, the deck depth) and `span.supportFoundationCm` among the base's raised-way rows (§2.7, item 244; V11's cells `raisedWays.structure.span.*`, V11 §3.24.2), over this volume's tables, because the base fixes the spans at M3a, before this volume exists, and a raised-way pier's depth is the base structure's own dimension |
| J-V4.94 | *Superseded by J-V4.114.* Chose to price item 110's parts and the two hand-offs in U1, U3 and U4, and the crypt derivation moved from V03 in U4 |
| J-V4.95 | chose the catacomb primary as a reading — the complex whose source serves the most burials, ties by rank (rank 1 at generation), and at an epoch V06's hysteresis-held primary passed in `opts` with its per-complex cap — over the formation rank, because the owner's rule is the largest catacomb under the largest cemetery across a history, and a newer extramural cemetery must be able to overtake an old churchyard's complex |
| J-V4.96 | chose V01's one visibility rule for an access's surface head — its ground symbol, drawn by the knowledge filter and the `pins` toggle whatever the underground layer's visibility — with the underground layer drawing only the underground end, over hiding the surface head with the layer, because a mouth or a grating stands on the ground where anyone who knows of it sees it: knowledge, not layer visibility, hides what a viewer does not know |
| J-V4.97 | chose to ship no `underground` rows of V01's `hood.pins`, so an underground close-up draws no hood pins, over furnishing tunnels with pins, because the underground's furniture is its light rows and access marks, and a pin set tuned for streets would clutter a tunnel's kerbs |
| J-V4.98 | chose `workedOut` as a derived reading — a mine's use closed, a chain inactive, a stone working outside the epoch that laid it — and `QuarryWorkings.extend` laying the epoch's new stone, mining and chain workings with their overlap tests, over a stored worked-out flag or a re-derived quarry system, because every input is already in the model, a stored flag would go stale, and existing workings must never be re-laid |
| J-V4.99 | chose to keep a ruin whose dossier source is removed — `source.ref` cleared, reported, fading by U-FADE — over removing the system, because the underground is never torn down (item 11; DEFINITION §4) and a removal would delete a lived void with no household channel; a blueprint ruin still follows its toggle at a re-derivation, never at an epoch |
| J-V4.100 | chose one definition of public ground (a way corridor, an L1 square or gate-plaza face, or a square or green block; a yard including a `yard` block's residue), cited by every reader, over L1 square faces only, because V01's dispatched squares are the town's squares on the ground, and a grating, a lifeline stair, a forced vault or a buried market belongs under them as under an L1 square |
| J-V4.101 | chose that the underground never reads the sky layer — no dig, basement-access or crypt-join host, burial face, district of `R` or element end on an island — save the catacomb count, which counts each island church once, over a plan-only test, because the owner's item 2 keeps islands out of the underground while the church count is a dossier and roster fact wherever the churches stand |
| J-V4.102 | chose to run V01's opening pass and write the `ruin.node` report line in the tail's T6, after S13a names the systems, complexes and ruin, over a stage of their own or a write by T2, because both need the names and T6 already writes the underground's names; the opening places are records and labels, never geometry, so the tail still writes no ground geometry |
| J-V4.103 | chose the underground's own lottery at the `decline` step after the fabric pool (V06's `under.fade`), uncapped by the district's `fabric` cap, over one shared strike lottery, because tunnels decay by their own exposure and rate and must not compete with the fabric's cap or enter its persistence order |
| J-V4.104 | *Superseded by J-V4.114.* Chose to price the epoch contracts — the network laid whole at the first sewers epoch, the scoped access pass, the primary and cap, the new workings and `workedOut`, the landfall closure — in U5 |
| J-V4.105 | chose to read `Recipe.product` on the standalone line — U-FORECAST and T2 — and to run the below-TOWN set with the catacomb step at TOWN's rules and count (one) on the document's own burial faces whatever its `contextRung`, over reading the `contextRung`'s TOWN-and-above rows for every kind, because V01 rules a standalone neighbourhood document's layers (J-V1.77: no host town whose stone a quarry supplies, no growth history whose scar a buried town fills, no town bridges or streets whose vaults this volume generates), and an input no stage of this volume read would leave it laying quarries, vaults and up to three catacombs in a standalone neighbourhood document |
| J-V4.106 | chose to run V01's opening pass inside every commit that creates, removes or re-kinds an access it selects — V04 §3.10's one list: T6, the scoped access pass, a complex founded at an epoch, the edits, a `regenerate` of a `cavern`, `ruin` or `quarry` system and the `delete` of an element carrying a selected access (J-V4.115) — over T6 alone or a periodic sweep, because a place lives exactly as long as its host (V01 §2.7), and only a commit-local pass keeps the two in step with no orphan place and no unnamed sinkhole |
| J-V4.107 | *Amended by J-VI.4.* Chose to let `placeAccess` make a public opening of a named kind at the nearest opening candidate of that kind, whatever its draw gave — source `opening`, cause `edit` — bent to the nearest such candidate or, with none, to the ordinary kind, over refusing the public-opening kinds to the author, because everything is editable, V01 selects places by source, and a sinkhole the author opens must get the record, place and name a generated one gets |
| J-V4.108 | chose to schedule the ruin's distinctness step and the undercity's parent after V01's W15 services and to gate T6's opening pass on the local-place step's registration, the missing places a declared shift, over duplicating the three services in `@plat/under`, because each service is stated and built once, by V01, and a registry lookup keeps an M6-U beside M5 buildable without them |
| J-V4.109 | chose an exported `Foundations.apply(doc, scope, cause)` applying V04 §3.5.0's rule to the epoch's new footings only, at every rung, returning the collapsed elements, the pillars and the vacated plots with their households' ids (V06 re-houses them by name), with a `raiseGrade`-tombstoned retaining wall's footing kept among the obstacles, over re-deriving the whole foundation reading at an epoch, because an epoch runs no stage of this volume, a scoped application costs O(scope), and with no epoch op removing an obstacle it collapses the regeneration's element set (T-V4-65; V06's T-V6-67) |
| J-V4.110 | chose to fill F6's new dwellings at an epoch only by V06's relocation of the district's poorest-band ground households, while the crowding hook's residual households take S7b (6)'s underground allocation at the epoch — on lived, then reopened runs, then accessible void clusters (V06 §3.6 (1); item 574) — over allocating F6's new dwellings through S7b (6), because S7b does not run over standing districts at an epoch and the relocated households keep the total equal to the target (V06 §3.18.1 (4); T-V6-52) |
| J-V4.111 | chose to take the span's calamity deaths as `CatacombGrowth.grow`'s `opts.deaths`, spread over the faces by their `burialShare` and added to the need only, over adding them to the cap or leaving them unread, because a plague's or a siege's dead are buried where the living were, while the per-epoch cap is the ratchet's pace (V06 §3.18.2 (3)) |
| J-V4.112 | chose to lay a raised grade's buried floor on the old grade point by point — `levelledGroundCm` on the region's last live state — each tombstoned retaining wall a step, a gallery crossing its line taking a stair step inside the gallery, over a stair link, because a link joins elements of different parts (§2.7) while the buried streets are one system on one part, as the cavern hall's stairs and N7's drops are |
| J-V4.113 | chose, at a village rung, to record a mining use's outside-plot working breaking into a cavern or ruin as one `shaft` `AccessPoint` of source `dig` and cause `mineBreach` per void system — its nearest element, keyed by the working's and the element's lineages, no link and no draw — tested at T2b and over `scope.workings`, over a heading gallery or a link, because below TOWN no `quarry` system exists to hold one (V07's J-V7.49) and the key makes the test idempotent at every derivation |
| J-V4.114 | chose the underground's price at 28.5–39.5 pw (V04 §8's table), over the critique's 24.25–34.25, because every mechanism the design states is priced where it is built: the first critique's findings' mechanisms (T8, the cross-arena distance, N3a and the read-ahead, the forced vaults, L5's ladder, the root-first invert); item 110's parts and the two hand-offs (1.5–2.25 pw in U1, U3 and U4); the crypt derivation moved from V03 (0.25 pw in U4); the epoch contracts (0.25–0.5 pw in U5, U5 at 3.25–4.5 pw); the village working, the public-opening `placeAccess` and the opening pass's edit callers (0.25 pw in U3b, J-V4.115's two commits inside it); `Foundations.apply`, F6 by relocation, the deaths, the buried terraces and the opening pass's epoch callers (0.25 pw in U5); the standalone line absorbed in U4 as a gate over existing steps; and g item 113's parts absorbed in U3, U3b and U5 (J-V4.122), and g item 123's damage below ground (0.25 pw in U5; J-V4.130) — accepted by the owner's delegation (owner question 2, J122) |
| J-V4.115 | chose to run V01's opening pass in two more commits — a `regenerate` of a `cavern`, `ruin` or `quarry` system, after U-ACCESS (e) re-runs over the new elements' candidates keyed by their lineages, and the `delete` of a gallery or chamber carrying a selected access — and to include the `quarry` system beside the cavern and ruin, over leaving a regenerated system's openings unplaced until the next T6, because a place lives exactly as long as its host (V01 §2.7) and a quarry chamber carries the `collapsed_shaft` candidate (V04 §3.5.7 (e)) |
| J-V4.116 | chose, in a standalone neighbourhood document, to run U-FORECAST after the one-district allocation and to read that allocation wherever the forecast reads the roster — P7's cap on `voidDwellingHouseholds` (its poorest-band households) and P5's catacomb expectation (the burial faces its anchors bring, the first one) — with S7b (6) (d)'s void part taken from it, over the town order (the forecast before S7b (5), on the roster of S2) with the virtual host town's roster, because V01 rules the order and the cap (V01 §3.10.1 step 6; J-V1.92: the document's demand is its capacity, and the virtual town's poorest band would cap the void part at a whole town's share), and the catacomb expectation read from the same roster would rank a virtual town's cemeteries that lie outside the document, while U-SYS's catacomb step there takes only the document's own burial faces (V04 §3.1's standalone line) |
| J-V4.117 | chose to bind every calibratable column this volume lands to V12 §3.11's named lines for V04's cells (the `under.ruin` V04 line, `coverM`, `planReachM`, `ossuaryReachM`, the item 109 (a) cavern line, the span-rule line, "V04's other item-109 cells") or to its default line, and to write no register line of its own, with every step's exit carrying the register check over the cells it lands (V04 §8 *The register at each exit*), over writing lines in V02 §3.10.10's form for the columns T-V4-45, T-V4-62 and T-V4-68 confirm, because the columns those bars bear on are already named by V12's lines — `distinct`, `monument` and `burialByAge` by the `under.ruin` V04 line, the span-rule constants by the span-rule line — and a second line for one column fails the lint as two entries for one knob, while the rest they touch (the arch vault's insets and door strip, `terminalCisternM2`, the opening rows) are admitted by rule bars that confirm the rule, not the value; so no line names a `bar.T-V4-n` metric and no `BenchBarDef` is needed. No reference owns the underground, so the default line's corpus stage is the only outside measurement the other columns can get, most closing `fixed` with "no admissible frame" at M-CAL (or at `M-CAL/under` when their step lands after M-CAL) while the V4-U5 panel rates the underground whole. Where V12's lines say "`measure` at U3" of a bar this plan runs later, the entry is due at the step that runs the bar (`'V4-U3b'` for `under.openings` and `under.dig`, `'V4-U4'` for `sourceWeight`), because an entry written at U3b with a due of U3 would fail its own landing's exit as provisional past due; the dossier row sets are not calibratable (V11 §3.1 row 63) |
| J-V4.118 | chose the pre-decided moves V12 §3.11's `under.ruin` V04 line and span-rule line leave to this volume — `distinct.rotateDeg` 30 → 45 after V11 §3.23.4's culture-row move has failed to clear T-V4-45, and `monument.tierDecay` 0.85 → 0.9 with `monument.ceilingClearCm` 200 → 150 on a V4-U5 No, and no second value for the ruin's other cells or for the span-rule constants (the cells `raisedWays.structure.span.*`; the rule at §2.7, item 244; their values in V11 §3.24.2) — over a second value for every cell, because 45° is a grid's greatest axis difference (the most the turn can buy), a slower tier decay and a smaller ceiling margin are the two cells that lengthen a monument's standing tiers without moving the burial law (item 563's band) or the persistence order (V11's), and the arch vaults' number and the ruin's age laws have no one-directional failure a single second value can answer (a No may mean too many or too few), so the panel rule reports them to the owner as table defects; the culture move runs first because the plan's likeness to the town comes from the culture row, the turn only from the axis; each group's history row passes at its stage and confirms at the last non-`corpus` stage (V12 §3.11's *Staged entries*), the span-rule line in V12's order (M4-110 at M4, T-V4-62 at `V4-U3`, the V4-U5 panel) |
| J-V4.119 | chose to read the base's "ground building nearest above the cluster" (item 372; V09 §4.17.4 step 1) through V04 §3.5.7 (d)'s geometry — a footprint overlapping one of the cluster's elements in plan, or a basement ring within `DigRule.planReachM` of one — and to dig the first rung's access with no basement piece and no minimal system, over ranking every ground building by plan distance or giving the rung `addUndergroundAccess`'s full closure, because "above" and the bend's "every footprint over it" name footprints over the void, (d) already decides when a building can dig down into a void (so a dig by chance and a dig by a declaration answer to one geometry), and taking the building as it stands keeps its dig floor the one it qualified by and gives V09's `cellar_stair` or `shaft`, where a basement ladder could deepen or refuse it; to pass over a building whose connector U-DIG refuses for the next qualifying one, over dropping to the base's opening rung, because the base's order prefers a dug access from a building whenever one can be dug; and to list the alternatives by the base's rule without digging them in the dry run, over pre-digging up to three more connectors, because the dry run's budget (V04 §6) holds one building's connector and a refused alternative is answered by its own re-preview's refusal. The grouped access keeps its own closure's pieces (the basement ladder among them), being the user's `addUndergroundAccess`; only its target is the base's rule |
| J-V4.120 | chose that in a skeleton prefix a dwelling declaration on a cluster still sealed after T2b takes the dwelling closure's way in at U-CITY C0, before C1's lifeline test, a grouped access before it in the prefix running there first, over reading it as `require` places a neighbourhood (a lifeline stair of cause `dossier`) or leaving the grouped access among T5's closures, because a declaration is the user's word, not the dossier's (cause `edit`; item 20 (h)), and a grouped access run after U-CITY had opened the cluster would add the second access T-V9-38 forbids; the prefix and the edit then give one model digest (T-V4-48's prefix clause, T-V4-40's pattern) |
| J-V4.121 | chose to gate V01's opening pass on V01's stage-2 switch as well as on its registration — the pass runs only while `fabric.extensionWeight` > 0 (V01 §3.7.1, V01 §3.15), a switched-off document keeping its underground whole with no opening place and the count reported — with the switch's own edit being V01's re-derivation from the switch's first reader stage, S2, a first-reader re-derivation, never §7.6's slice invalidation (V01 §3.15; J-V1.101), whose tail's T6 runs the pass under the new gate: after an `editTable` or `editPreset` that raises the resolved switch above 0 the places are made over the accesses the re-derived document selects; after one that lowers it to 0 none is made and every old opening place is retired by §6.3's carry-over; a change inside (0, 1] keeps the gate and runs the pass as at generation; each a fate of the edit and restored by its undo (§7.4's `editTable` / `editPreset` row), the edit priced as the re-derivation (V04 §6's switch line); over leaving the places to the next generation, keeping them while the switch is off, or treating the edit as one more commit of V04 §3.10's list over a held-still underground, because the pass belongs to the step the switch gates, V01 §3.15 and T-V1-4 hold a switched-off document to 0 places, a place lives as long as its host only while the step runs (V01 §2.7), and the edit re-types blocks and fabrics and re-cuts plots and buildings from S2, so the underground's accesses, excavation reading and dwellings follow by this volume's ground-edit and closure rules (V04 §4.3, V04 §3.10) and nothing below is byte-identical; the dwelling closure's opening rungs join the same list, so the one list V01 cites is whole |
| J-V4.122 | chose, for g item 113's underground parts: **(e) the lost state** as the excavation reading plus one stored memory — `ExcavationRecord.reached`, the elements ever reached — over a stored state per cluster, because the memory is the one fact the connection graph cannot derive while the state must still follow every access, link and closure; **"open"** read as passable — a gate, a lock and a secret door joining for those who hold the key or know the way, a `collapsed` or `flooded` link, a `bricked` access and every closed element breaking the path — over counting links of kind `open` alone, because item 113 (e)'s closings are a sewer sealed, a cellar filled, a building lost, not a key held; the reading physical and one per document, so dwellings and digests never depend on the viewer and a viewer's sight of a secret way stays the knowledge filter's; a lost cluster drawn in the sealed style for every key that admits it and an unexcavated one only at `secret`, because a lost void is remembered and an unexcavated one is known to nobody; its dwellings abandoned by II.7.3's lifecycle in the closing commit and returning at the next placement after it is refound, never in the refinding commit, because households come by placement; **(c) the buried former settlement** laid by `BuriedFormer.lay` from the replay's own former fabric at its old ground level — its depth by the rise law (`formerRiseCmPerCentury` × its years × the burial-speed factor `burialYears ÷ T`, `T` the fabric's factored burial age (V11 §3.25.2), capped at `formerRiseMaxCm`), its streets as galleries, its buildings of at least `formerStoreyMinM2` as `storey` chambers, its walls as collapsed masonry bands with open gate chambers, and every element below `formerMinHeadroomCm` filled — over laying every former building, re-deriving it at later epochs or a void wall, because smaller buildings' remains are the fill, masonry walls are solid, a young burial is mostly filled while an old one is walkable, and the former geometry is fixed when it is buried; the shallow-element rule taking the ruin's direction because the former settlement is older than the present town; and every part priced inside U3, U3b and U5's ranges (J-V4.114) |
| J-V4.123 | chose, when the dossier removes or closes a subterranean institution, to release its L5 pieces — kept as `dug` elements with cause `dossier`, the building gone from the system's `sources`, no longer held, fading from the next epoch — over removing them with the institution or keeping them held, because the underground is never torn down (item 11), a released passage is the ruin's `source.ref` case again (J-V4.99), and a hold without its dossier fact would refuse the author's delete for no fact (J-V4.50) |
| J-V4.124 | chose the edge and combination outcomes of V04 §3.11's two tables, stated once there and barred by T-V4-79 and T-V4-80 — among them: an oasis's spring never an outfall; a cliff crossed by a run as a drop, as a wall is; no access on water, a bridge deck, a cliff or a deck building, a hand one bent to the nearest lawful point; a locked vault held against every generator with E_LOCKED; every system clipped at its margin ring; a sewer never crossing water, each bank draining on its own (J-V4.129); a catacomb meeting a sewer at a shared depth opened into it by one typed opening per meeting element pair, its course never bent and never a merge — over leaving each to the mechanism's general ladder, because each is a choice between defensible outcomes (a town fouling its own spring, a mouth on a cliff face, a vault under a lock) that the realism tiebreaker settles and a bar must fix |
| J-V4.125 | *Amended by J-V4.128.* Chose V06 §6.2's per-epoch sums as the four participants' own budgets (V04 §6 *Epochs*) and the lost void's households returned to V06's ledger as displaced with cause `void`, over budgets of this volume's own or a separate channel, because V06's century bound reads these rows and its ledger re-houses by cause in the same epoch |
| J-V4.126 | chose, for g item 119's part in this volume (J130), to keep §12's underground rows and every row of V04 §6 as the targets and to read the ten-second comfort level for each one-time wait the layer adds to — a generate, regenerate, Re-derive or SettlementForge open with its tail, a migration's upgrade tail, every per-band export — with §12.1's progress named per tail stage (each a `StageDecl` posting §11.2's `Progress`), the interactive rows (the band step and switch, the `underView` switch, the tools' live previews, hover, inspect, undo, redo) unchanged, the epoch participants and `BuriedFormer.lay` counted inside V06's advance and replay waits as V06 §6 reads the level for them, and no quality spend, over a ceiling of this volume's own or per-stage seconds, because the tail's targets (≤ 343 ms p95 at METROPOLIS, navigable) already sit far inside ten seconds, a slower step is admitted only for a recorded measured gain (R12-33), and the owner keeps moment-to-moment feedback fast (item 119 (d)); absorbed in U5's range |
| J-V4.127 | chose, for g item 120's part Below (J133), one derived reading, `underFindPlaces`, giving each matched underground entity's part, depth bands, glow shapes and plan anchor, with the drawn band the one that glows — a match Below in another band a ghost pin carrying its band, **Go there** setting `depthBand` —, an area chip lifting the underground under its plan outline, and an unexcavated match at `secret` glowing only while its cluster is drawn, over glowing every band at once, a match rule of this volume's own or areas stopping at the ground, because one band is drawn at a time (§8.4) and a glow beneath it would read as the drawn band's, the owner's "even if you're going through different layers" is kept by the ghost pins and the band counts, an area is a plan region whose underside a user asks after ("what lies under the old quarter"), the matches must be §11.2's one listing so every count agrees, and a glow on a cluster not drawn would show the sealed void the view key hides; absorbed in U5's range |
| J-V4.128 | chose to route a lost void's households by when the void is lost — at the `decline` step (`under.fade`) to V06's ledger as displaced, cause `void`, re-housed at `siting`; in an `afterGrowth` participant's commit (`under.extend`'s foundation or arch-vault collapse, `under.access`, `under.undercity`) re-housed inside that participant by §4.7's overflow pass, counted `households.undergroundVacated` — over one ledger route for both, because the `afterGrowth` participants run after `siting`, so a ledger entry made there would reach only `close`'s last rung, while V06 re-houses every other underground vacancy of those participants inside them (V06 §3.18.1 (4), (6)) |
| J-V4.129 | chose that no sewer lies over water — a `Bridge`'s deck span whatever its way's class, the `bridge`, `pier`, `ford` and `aqueduct` classes and every spine stretch over a water face left out of the `SewerGraph`, N8's connections and drain runs and N9's passages kept on their bank — with the graph's water-divided components as banks, N2's moat and field fallbacks taken per bank, a field outfall's D8 path followed over land only, the outfall cap keeping each bank's largest root and a bank with no dry boundary, or none whose field path reaches beyond the outer strip over land, draining by gutter and pit, reported, and a drawn run that would cross bent at the bank (item 101 R2), over routing one bank's flow across a bridge to the other bank's outfall, because a sewer is cut-and-cover, never mined (`NetworkRule`'s cover rows), so a main under a flowing river or a wet moat is a silent wrong result, while a medieval town discharged each bank into the water at its own edge or into its own ditch; a town no water divides is one bank |
| J-V4.130 | chose, for g item 123's part below ground (J136), five kinds of their own — `cellarWall`, `cellarVault`, `cryptWall`, `cryptVault`, `cryptTomb` — whose V11 ranges lie inside the `ruined` share, the crypt's at its top, a damaged one partly collapsing but never removing a room, a wall line, a way down or a join, the lowest storey's floor no element; a storey below 0 reading its building's level — where a disaster look stands over the building (until V06 §3.22 (3)'s hand-over), the whole building's drawn level, the higher of its own and the look's (V03 §5.6 (4)) — and an underground building, in no look's unit, its own; and the damage a drawing only, read by no stage, link, access or excavation reading, V04's closure states staying the model's access facts — over elements below ground taking the above-ground kinds and ranges, a level of the crypt's own, or a fallen element closing a way, because item 123 (c) keeps cellars and crypts intact or partly collapsed in a ruin (a ruined church keeps its crypt), earth and rock behind a wall below grade hold it up and keep it opaque to sight, one plan has one level (item 123 (a)), and the access model's states are model facts written by epochs and edits while the level is a reading at the drawn week that moves no digest (§2.6 step 7), so a scrubbed week never opens or closes a way; 0.25 pw in U5, landing at the later of U5 and V03's P4, whose base parts it reads (V04 §5.6 (6)) |
| J-V4.131 | chose to draw the underground in every shipped sheet by each family's own drawing of the matching role — the rock halo in the family's hatch, fill or wash, the void one step lighter than the ghosted ground, water, walls, buildings, traces, glyphs and labels as the family draws them on the ground, `painterly`'s by V07 §5.1's programs and palette — over one underground look for every sheet or `painterly` falling back to `ink`'s rows, because §8.2's loader refuses a sheet with an unresolved pair, the village product opens in `painterly` and draws the layer at the village rungs (V04 §3.1), and a void must read as carved in every sheet (J-V4.31) |

## 10 Base change requests

Every request this volume made of the base is applied by file f and lives at its base home; this volume cites the item.
Each keeps its number in the set's one family (`BCR-V4-n`). One request changes a ground output: BCR-V4-19 (item 551)
wires the forecast into S7b (6) and (7), so under the default presets a CITY sends households and `preferred` uses below —
a one-time declared shift of the M6-U output version (item 485), never under the parity presets (item 556). No further
request is made: the standalone line reads V01's `Recipe.product`, and `Foundations.apply`, the calamity deaths, the buried
terraces, the village working, the opening pass's callers, the lost reading, the buried former settlement and the
damage below ground are this volume's mechanisms over hooks the base and its sibling volumes declare (§2.7's
`HistoryRecord`, II.7.6, §4.11, §2.6 step 7, §6.3's `plan.damage`).

| request | subject | applied by |
|---|---|---|
| BCR-V4-1 | the outfall type and its producer | item 205 |
| BCR-V4-2 | a way's fall derived; junctions on the underground | item 208 |
| BCR-V4-3 | tunnels and chambers | item 247 |
| BCR-V4-4 | the undercity's core and the outskirts' writer | item 212 |
| BCR-V4-5 | the tail | item 325 |
| BCR-V4-6 | the underground at an epoch | item 319 (applied after item 574) |
| BCR-V4-7 | F-NET | item 330 |
| BCR-V4-8 | points forms and paths of the underground tools | item 355 (with item 361's `drawChamber` union) |
| BCR-V4-9 | the network's two controls | item 403 |
| BCR-V4-10 | the view (`underView`) | item 413 |
| BCR-V4-11 | the tail's budget row | item 475 |
| BCR-V4-12 | the package | item 505 |
| BCR-V4-13 | the build plan | item 526 (§16's totals, item 568) |
| BCR-V4-14 | the dossier's underground facts | item 386 |
| BCR-V4-15 | the bars of V04 §7 (every T-V4 test) | item 484 |
| BCR-V4-16 | the VTT underground scene (portals only in a wall line) | item 452 |
| BCR-V4-17 | label kinds | item 423 |
| BCR-V4-18 | naming slices | item 445 |
| BCR-V4-19 | the sewer-front allocation's prediction | item 551 |
| BCR-V4-20 | the buried town's squares, the cistern's host, the network's interface | item 559 |
| BCR-V4-21 | an access's state follows its host | item 555 |
| BCR-V4-22 | T14-1's parity clause | item 485 |
| BCR-V4-23 | the underground's shares are extension cells | item 556 |
| BCR-V4-24 | the `dug` system's generation-time creators | item 561 |
| BCR-V4-25 | the underground's read-ahead | item 281 |
| BCR-V4-26 | the connection stage's interface | item 562 |
| BCR-V4-27 | the surface rule within reach of the ground (applied only if T-V4-41 fails at U2, J-V4.60) | item 552 |
| BCR-V4-28 | culverts connect plots | item 548 |
| BCR-V4-29 | the public openings | item 554 |
| BCR-V4-30 | an access's cause | item 557 |
| BCR-V4-31 | the ruin's depth band | item 563 |
| BCR-V4-32 | the system's variant and name | item 248 |
| BCR-V4-33 | a link's cause; reuse | item 249 |
| BCR-V4-34 | the dossier's ruin, magic, mining, church and burial facts | carried in item 386's DR17 cell (V04 §1b.5 traces each) |
| BCR-V4-35 | the ruins toggle | item 404 |
| BCR-V4-36 | the catacomb's sources, share and entrance | items 560, 564 |
| BCR-V4-37 | the TOWN toggle's locality | item 549 |
| BCR-V4-38 | the light shaft's opening and shadow | item 414 |
| BCR-V4-39 | light rows under no magic, and by biome | item 306 |
| BCR-V4-40 | the chamber fill by kind, the ruin program, the unexcavated style | item 407 |
| BCR-V4-41 | a stage's own warnings — V04 §1b.1's twelve codes | item 338 |
| BCR-V4-42 | a ruin under the historical preset | item 558 |
| BCR-V4-43 | a forced basement for a subterranean institution on the surface | item 243 |
| BCR-V4-44 | tunnel grilles | carried in item 247's `Tunnel` line (`grilles`, a view) |
| BCR-V4-45 | the raised way's spans, piers, foundations and aqueduct delivery; the span rule | items 244, 559 |
| BCR-V4-46 | the chamber's arch vault, span and monument | item 250 |

The sibling volumes' requests this volume reads are theirs: `Basement.crypt` (item 238), `Entrance.faces` `'tunnel'` (item
239), PART III's maintenance mode (item 565), the landfall decoration (item 252), levelling as datums (item 309), the
raised ways' decline rows (item 291), the calamity's deaths (item 573), the crowding hook's void part (item 574), the
hidden-voids view key (item 278) and the dwelling closure (item 372).

## 11 Owner questions

Both are answered (J122; docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md), each vetoable by the owner:

| # | question | answer |
|---|---|---|
| Q1 | when to build the underground | **answered (J122): yes** — M6-U right after M5, beside M5 when a second pair of seats is free (V04 §8; §16; INDEX.md) |
| Q2 | its cost, 28.5–39.5 pw | **answered (J122): accepted** — it carries owner rules 109 and 110 (J-V4.114) and item 123's part below ground (J-V4.130) |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed evidence this volume was written from):
* The base as file f and g apply it: every section this volume cites was read in the coherence pass's base text, and every
  request of V04 §10 is an f item that text carries; file g's items are read whole in
  `docs/AMENDMENTS-2026-09-28g.md`, the underground parts of items 113, 119, 120 and 123 written here, and item 122 (d)'s
  look read below ground (V04 §5.6 (1)); item 126 holds none for this volume.
* The base names `Outfall` and the way's fall and declared neither before items 205 and 208; the sewer-front allocation's
  prediction had no input under `drainage-lines` before item 551 and V04 §3.3.
* The parity presets zero every `extension` cell (§7.6), `undergroundShare` among them (item 556); T14-1's pixel clause is
  item 485's.
* §6.1's stream key carries the stage id and a salt, so item 64's draw in U-LINK and the dig draw in U-ACCESS never share a
  stream (J-V4.63); §6.1 states the fixed-key draw pattern V04 §3.12 cites.
* §2.6 reads a basement's water table as the nearest water body's surface — a moat's the one level §4.2 S3 (10) derives,
  every other body's shore sample — plus a freeboard; N7's root-first outfall reads the same surface `s`.
* No reference owns the subject: `research/findings/ftg-posts-c.md` records FTG's author stating underground settlements
  unsupported; the base's emulation notes (II.7.3, II.7.5) record MFCG's and FTG's absence. The hatched look's precedent is
  named by file and section only (`research/findings/watabou-extra-a.md` §2.7–§2.8).
* V01's stage-2 switch: its first reader stage is S2 and its edit a first-reader re-derivation, never §7.6's slice
  invalidation (V01 §3.15; J-V1.101); its undo is §7.4's `editTable` / `editPreset` row.
* The counterpart texts at every seam were read: V01 §2.2–V01 §2.7, V01 §3.7.1, V01 §3.10.1, V01 §3.15, V01 §3.16, V01 §5.4; V02 §2.6, V02 §3.9, V02 §3.14.5,
  V02 §3.15–V02 §3.17; V03 §2.1, V03 §2.2, V03 §2.4, V03 §3.7, V03 §3.12, V03 §4.5, V03 §5.1; V05 §1.3, V05 §3.3, V05 §3.5, V05 §3.16, V05 §5.1; V06 §2.1, V06 §2.4, V06 §3.2, V06 §3.5.2, V06 §3.6, V06 §3.11,
  V06 §3.18, V06 §3.19, V06 §3.20.5, V06 §6.2; V07 §3.12, V07 §3.16, V07 §5.1; V08 §2.6a, V08 §3.6; V09 §4.9, V09 §4.17; V10 §3.9, V10 §3.9a; V11 §3.23, V11 §3.24, V11 §3.25.2, V11 §3.25.8; V12 §2.13, V12 §3.6b, V12 §3.7.8,
  V12 §3.9.1, V12 §3.11.
* The clean-room checks of this text are recorded in V04 §13.

**PLAUSIBLE** (reasoned, not measured):
* That a stage-2 switch edit over a document with voids changes the underground's accesses, excavation reading and dwellings
  only through the ground-edit and closure rules (V04 §4.3, V04 §3.10), so the tail needs no switch-specific step — T-V4-31's
  and T-V4-74 (b)'s switch clauses test the outcome; no bar measures how much of the underground a switch edit moves.
* That an `editTable` of the cell or an `editPreset` changing its entry are the only ways the resolved stage-2 switch crosses
  0 inside a document.
* That V04 §3.5.7 (d)'s geometry is what the base means by a building "above the cluster" (J-V4.119; T-V4-48 and T-V9-38
  test the mechanism, not the reading); that a connector is rarely dug in the dwelling closure at the default reaches and
  that passing over a refused building keeps the rung inside V04 §6's budget.
* That no corpus frame admits most of this volume's default-line columns, so they close `fixed` with "no admissible frame"
  at their due and the V4-U5 panel stays their only outside rating; that J-V4.118's second values move T-V4-45's similar
  share and the monuments' standing tiers the way wanted; that every table lands in the step V04 §8's plan names.
* That P7's cap read from the one-district allocation keeps a standalone neighbourhood document's void part at a
  neighbourhood's scale (T-V4-75 and T-V1-20 measure the bound, not the realism of the share).
* That re-running U-ACCESS (e) over a regenerated system's elements yields the opening share a fresh derivation yields; that
  the crowding hook's void part at `growth` finds free capacity in clusters opened in earlier epochs often enough to matter
  (T-V4-72 (f) measures the total, not the share).
* That `Foundations.apply` over the epoch's new footings collapses the same element set as a regeneration (T-V4-65 measures
  it; it rests on no epoch op removing an obstacle); that the village working's plan-distance test with a depth bound is
  what V07 §3.16 (4) means by "within reach, at a depth the working reaches"; that the buried floor's point-by-point old
  grade with the walls' steps reproduces the terraces (T-V4-15).
* That the primary read at a re-derivation agrees with V06's hysteresis-held primary except inside its band; that the
  epoch's built stone is a fair `ΔV` for new stone workings; that reopening a landfall-bricked access as `open` (`locked`
  when secret) matches its former state in practice.
* That reading item 113 (e)'s "open" as passable (a gate, a lock, a secret door joining) is the owner's meaning (J-V4.122,
  vetoable); that the buried former settlement's rise law and `formerMinHeadroomCm` make old burials walkable and young ones
  filled at plausible depths (T-V4-77 and the owner's panel); that V04 §3.11's edge and combination outcomes are the
  realistic ones (J-V4.124).
* Every default constant of V04 §2.3, V04 §3 and V04 §3.9 (our own, `extension`, calibratable): the span rule's and the foundations'
  constants, the arch vault's insets and door strip, `terminalCisternM2`, the monument's `clearM`, `tierDecay`,
  `ceilingClearCm` and `moundShare`, the `archDoor` row, the buried former settlement's `former*` parameters, `crowdCap`,
  `voidDwellings`, II.7.4's `forecastSafety` and `accessForecastMin`, `freeboardCm`, `hallDryCm`, the opening sizes, and
  V11's rows this volume reads. The historical anchors (the culverted brooks of London, the fourteenth-century vaulted
  sewer of Paris, the quarries and ossuaries under Paris, the great catacombs under cemeteries outside the walls, the rise
  of a Roman street under a medieval town) are orders of magnitude, not measurements.
* That `forecastSafety` and the absorption keep T8's writes under 2 % of CITY seeds (T-V4-3); that the dig rows keep deep
  voids sealed at METROPOLIS (T-V4-54, fallback pre-decided); that item 563's 4–30 m band makes a sewer's growth through a
  ruin common (T-V4-53); that the ruin plans pass the distinctness bar (spike (a)); that sewer-front neighbourhoods appear
  under ordinary streets (T-V4-41, fallback pre-decided); that the span rule walls a plausible share of arches (T-V4-62) and
  shallow ruins still show legible monuments (T-V4-68).
* The budgets of V04 §6 (U0 measures them at CITY and METROPOLIS; the fallbacks are pre-decided); the forecast's accuracy
  bar (T-V4-8); the estimates of V04 §8.
* That the dungeon-map figure-ground, the ruin program and the plan lines after the light are legible enough (the owner's
  panel decides).
* That each bank of a water-divided town finds an admitted outfall on its own bank often enough that the per-bank rule
  leaves little area unsewered (T-V4-80 (j) bars the rule, not the share); that the underground's one-time waits stay far
  inside the comfort level at the metropolis cap (T-V4-32 (b) measures them); that a ghost pin carrying its band is what
  the owner's "across layers" asks of Find Below (J-V4.127, vetoable).
* That the five kinds below ground, their ranges inside the `ruined` share and the partial collapse drawn read as item
  123 (c)'s "intact or partly collapsed" (J-V4.130, vetoable; T-V4-82 bars the rule, and the V4-U5 panel, whose frames
  hold the cathedral's crypt, rates the look); that every shipped sheet's underground rows stay legible (T-V4-27's
  goldens, `painterly`'s from V07's V-M1).

## 13 Fix list

The Fix list holds no item: every finding the reviews and the coherence pass routed to this volume is fixed in the text,
none deferred (the validation records keep the history: `docs/volumes/critique/V04.md`, the seam files and
`docs/validation/coherence/rewrite-V04.md`).

**What the sibling units hold for this volume** (their own parts, each written at their home):

| unit | its part |
|---|---|
| V01 | the services `fabricSignature`, `districtsAbove` and the local-place step's opening pass, built in W15 (V01 §3.7.1, V01 §3.16); `HoodPlace (opening)`'s lifecycle citing V04 §3.10's list |
| V03 | the `AccessHostRow` rows (catacomb → crypt for a crypt join, catacomb → nave for a chapel's entrance head); the cathedral's largest-crypt bar; V03 §3.12 (9) reading V04 §3.5.4 (f)'s `gradeFaces`; T-V3-23 (g) and (d) closed by T-V4-50; its damage layer drawing a storey below 0 by V04 §5.6's kinds and rules (item 123) |
| V05 | its why reading the `ruin.node` report line (V04 §3.5.0a (9)); its islands' exclusion of burial faces |
| V06 | the four participants' calls (V04 §3.10), their scopes and `opts`; the replay calling `BuriedFormer.lay` at a burial epoch while `@plat/under` is registered, clearing the former fabric's surface records in that batch and writing `HistoryRecord.buried`; the households of a void lost at the `decline` step re-housed through its ledger (cause `void`), and those of one lost in an `afterGrowth` participant's commit re-housed inside that participant by §4.7's overflow pass, counted `households.undergroundVacated` (V04 §3.5.7 (g) (5)); item 119's comfort level for advance time and the replay, the participants' time inside them; `decayLevel` and `decayPeak` (V06 §3.23), read by V04 §5.6 |
| V07 | the maintenance mode and the village rows (item 565); the span rule's `country` reason (§2.7; J-C4) cited by V07 §1 (5) and V07 §3.16 (1); V07 §3.16 (1)'s village subset as V04 §3.1 names it, the catacomb step for a dossier record's charnel vault included; `UnderOpeningRow` in V07 §1b (W46) and V07 §3.16 (3) (iii); V07 §5.1's `painterly` programs and palette drawing V04 §5.2's per-family rows |
| V08 | the port side of the ruin, magic, mining, church, burial and history facts (V04 §1b.5) |
| V09 | the `showUnexcavated` and working-layer controls; the lost void's panel line; the catalogue keys `info.under.*`, `info.catacomb.*` of V04 §4.5 — `info.under.sealed`, `info.under.lost`, `info.under.lostUndated` and `info.under.none` among them; the Find panel and its `live.find` provider calling `underFindPlaces` (V04 §5.1) |
| V10 | the explanations over V04 §4.5's providers; V10 §3.9a's void-cluster row gaining the `lost` state |
| V11 | the underground's content rows (V11 §3.23), the stepped-shrine heights row, the span cells, the `ruin` naming slice, `history.burialYears` with its factors and the factored burial age `T` (V11 §3.25.2, read by V04 §3.5.5 (b)); registry row 58a and V11 §3.23.7 naming `UnderOpeningRow`; the `perf.qualitySpend` rows (V11 §3.25.8); the item-123 rows of V04 §5.6's five kinds below ground, their ranges inside the `ruined` share |
| V12 | the bar specs of V04 §7's item-109 bars, T-V4-52's two rows among them (V12 §3.6b); the no-op pin engine (V12 §3.7.8) with the underground goldens on `item109.underground` and `item113.history` (V12 §2.13); the V4-U5 row citing V04 §7's panel spec, its extras the hatched-style render (V12 §3.9.1); the register lines of V04 §8, `accessForecastMin` named as `under.rule`'s cell; T-V12-50's timer over the underground's waits; the `item123.damage` pin over the underground's bands and per-band exports (T-V4-82 (g)) |
| the base | II.7.4's `UndergroundRule` writing `accessForecastMin`'s default (0.5) beside `forecastSafety`'s; II.7.6's `AccessPassStrategy` reading `openings: UnderOpeningRow[]`; §13.2's underground take-over row naming T120-4, T120-5, T123-1, T123-2 and T123-6 with T-V4-81 and T-V4-82, and *The underground layer built* line reading every T-V4 test (V04 §7); §8.2's slot resolution listing the `under.*` entries in every shipped sheet with V04 §5.2's facts; §6.3's `plan.damage` reading V04 §5.6's kinds for their V11 ranges; §8.6's damaged-plan drawing and §11.1's battle-map rule, read below ground by V04 §5.6 |

**Clean-room checks of this text** (`docs/validation/bench/doc_checks.py --doc` this file `--heads docs/ARCHITECTURE.md`,
2026-10-01): C1 identifiers 0, C2 colours 0, C4 copied lists 0, S1 tables 0; C3 214 three-gram runs, each read — common
English phrases ("a new random on the", "one step lighter than the", "a gap in the outline"), digit runs of section
numbers and values, the marker line and file paths cited by file and section — no reference content; S2 127, each a
volume-prefixed pointer (`V04 §3.11`, `V06 §3.23`, `V11 §3.23` …) the tool resolves against the base's headings, every
one resolving in its volume. The reference corpus is incomplete in the checkout that ran them (no `captures/`,
`research/patreon`, `research/devlogs`, `research/ftg-docs`, `research/external`), so C1–C4 are provisional until re-run
where the corpus is held.

## Integration notes

The integration lane's decisions for this volume (`docs/volumes/_integrate.md`) are folded into the body at their homes;
each note's content now lives as follows:

| note | decision | now at |
|---|---|---|
| IN-V04-1 | J-VI.6 | `growthCapShare` per year compounded over the epoch's span: V04 §2.3's `CatacombRule` row, V04 §3.5.1 (6), T-V4-52; V11's rows cited, not restated: V04 §2.3 |
| IN-V04-2 | J-VI.5 | the monument through V02's `drawTiers` and `layTiers` and its one failure path: V04 §3.5.0a (5a); an arch vault's soffit as the ceiling V02's `vaultClamp` reads: V04 §3.5.4 (d) (1) |
| IN-V04-3 | J-VI.17 H2 | the dig key's wing key and V02's footprint and basement floor: V04 §3.5.7 (d) |
| IN-V04-4 | J-VI.17 H12 | `gradeFaces`: V04 §3.5.4 (f), V04 §1b.1, V04 §2.6; T-V4-78 (c) |
| IN-V04-5 | J-VI.17 H13 | the arch vaults under a landfall-ruined span: V04 §3.5.4 (d) (2) |
| IN-V04-6 | J-VI.17 H14 | the ruin's sources in V08's reading through DR30: V04 §3.5.0a (1); V04 §1b.5 |
| IN-V04-7 | J-VI.17 H15 | `under/wayIn` and the access symbol by `cause.rule`: V04 §4.5, V04 §5.2 (7) |
| IN-V04-8 | J-VI.17 H16 | `catacombOutcome` and the `underground` section provider: V04 §1b.2, V04 §4.5; T-V4-78 |
| IN-V04-9 | J-VI.9 | the terminal kind `cistern` only under a `conduit_house`: V04 §3.5.4 (e) |
| IN-V04-10 | J-VI.2 | the span's `reason` and the raised way's `RaisedReasonKey`, two fields: V04 §3.5.4 (d) |
| IN-V04-11 | J-VI.19 | `showUnexcavated` a per-viewer view key: V04 §1b.1, V04 §1b.3, V04 §2.6, V04 §5.1 |
| IN-V04-12 | J-VI.22 | the milestone M6-U: V04 §8 |
| IN-V04-13 | J-VI.28 | the view key in V04 §1b's and V04 §2's rows: V04 §1b.1, V04 §2.6 |
| IN-V04-14 | J-VI.27 | the raised way's `supports` from item 244's support step: V04 §3.5.0 *Foundations* (1) |
