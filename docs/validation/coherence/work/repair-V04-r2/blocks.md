=== FILE docs/volumes/V04-underground.md ===

=== REPLACE ### 1.2 The base hooks this volume consumes (cited, never restated) ===
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
(3); V05 §3.5 (3)). While the underground is the active layer the tools pick ground buildings and points only (V04 §4.1).

**Public ground (J-V4.100).** Stated once here: **public ground** is a way corridor, an L1 `square` or gate-plaza face, or
a block whose `Block.content` is `square` or `green` (V01's dispatched square and green blocks, each one L3 residue face,
V01 §3.5.10; item 210); **a square** is an L1 `square` face or a `square` block; **a yard** is a plot's yard part or a
`yard` block's `yard_common` residue. Each is resolved by `pointLocate` on ground part 0 and, for a block, its
`Block.content` (S9b's eager typing, so every district's blocks carry it before the tail). II.7.3's surface test admits
all of them already, so F3 is unchanged; the readers of the definition are N11's gratings, F5's access order and shafts,
L1's lifeline stair and air grating, `placeAccess`'s kinds, the forced vaults (V04 §3.5.6), the terminal cistern
(V04 §3.5.4 (e)), a buried town's squares (V04 §3.5.5) and `UnderOpeningRow`'s `collapsed_shaft` row.
=== END ===

=== REPLACE ### 1.3 Out of scope, with the reason ===
### 1.3 Out of scope, with the reason

* **The evolution engine's scheduling** — when an epoch runs, its population target, its strike pool and the history
  replay's epochs — is the evolution engine's (§4.11; V06). This volume supplies what that engine calls for the
  underground (`UndergroundFade`, `Foundations.apply`, `SewerStrategy.derive` at the first sewers epoch and `.extend`
  after it, `QuarryWorkings.extend`, `CatacombGrowth.grow` with V06's cap, primary and calamity deaths,
  `AccessPassStrategy.run` (II.7.6) over an `EpochScope`, `ArchVaults.reconcile`, `BuriedFormer.lay`, the undercity's epoch re-read; V04 §3.10, each with
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
* **The controls** for `showUnexcavated` and for the active layer are V09's; this volume names the view key and what it
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
=== END ===

=== REPLACE ### 1b.1 Records, fields and tables ===
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
| `underFindPlaces(doc, ids)` (derived, never stored; V04 §5.1 *Find on Below*): each matched underground entity's part, depth bands, glow shapes and plan anchor | the underground records and their bands (§8.4), read at each commit that rebuilds Find's index | V09's `live.find` (the glow in the band shown, the ghost pins, **Go there**'s band, the area lift) and its panel's Below count, drawn by §8.2's Find rows; T-V4-81 | §2.9's view key `find` (g item 120) |
| the kinds below ground `cellarWall`, `cellarVault`, `cryptWall`, `cryptVault`, `cryptTomb`, given by `belowKind(building, element)` (derived, never stored; V04 §5.6) | V03's plan parts of each storey below 0 (V03 §2.2, V03 §3.7), the crypt's column grid (V03 §3.7.5), each underground building's footprint sides on its part's rock (§3.7's `bandUnion`) | §6.3's `plan.damage` draw (the kind names V11's range row), V03's drawing of a storey below 0, S14's underground footprints (V04 §5.2 (5)), the per-band VTT's line of sight, T-V4-82 | g item 123 (c); V04 §5.6 |
=== END ===

=== REPLACE ### 1b.2 Stage outputs and interfaces ===
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
| `ArchVaults.reconcile(doc, raised, cause)` (V04 §3.5.4 (d)) | U-SYS | the tail's T2 vaults step (every raised way); the commit of a ground edit that adds, removes or re-shapes a raised way or sets a span's `use` (V04 §4.3); V06's `under.extend` at an epoch over `EpochScope.raised` |
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
| `underFindPlaces(doc, ids)` (V04 §5.1 *Find on Below*) | `@plat/under` | V09's `live.find` overlay provider (g item 120), for the ids §11.2's gazetteer match listing gives on underground parts, after each commit that rebuilds Find's index |
| `belowKind(building, element)` (V04 §5.6) | `@plat/under` | §6.3's `plan.damage` draw for an element below ground (its kind's range row, V11's); V03's plan draw of a storey below 0; S14's underground builder (the damaged footprints); the per-band VTT export |
| `drainOf(plot)` (II.7.1's view) | U-NET's `serves` | §11.2's reader; the plot inspector |
| the underground display list (semantics `under.*`, V04 §5.2) | S14's underground builder in `@plat/render` | the tile worker; the exports |
| per-band exports | `@plat/export` (V04 §5.5) | the user; a VTT host |

Each stage's output is consumed: the `sewer` system record and part 0's tunnels by U-FRONT, U-ACCESS, U-LINK, S14 and
the exports; U-FRONT's plots by S10b, S11, S12c, S13a and the statistics; U-SYS's parts by U-ACCESS, U-CITY, U-LINK,
S14; U-ACCESS's links, accesses, excavation reading and `ExcavationRecord` by U-FRONT F6, U-CITY C1, S14, the filter and
the reader; U-CITY's districts by S12c (character), S13a (names), §9.1's quarter tree; U-LINK's links and accesses by S14,
§2.6's plan rung reservation and the reader; T8's writes by the ground's model digest and the report.
=== END ===

=== REPLACE ### 1b.4 Entity kinds (each rendered, labelled, exported, persisted) ===
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
=== END ===

=== REPLACE ### 1b.5 Dossier facts, traced to their field and derivation row ===
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
=== END ===

=== REPLACE ### 2.6 The lifecycle of every state field this volume adds or gives a producer ===
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
| `underFindPlaces` (Find on Below; g item 120) | derived on read for V09's `live.find` (V04 §5.1) | `live.find`, the Find panel's Below count | never: a view (the chips are §2.9's view key `find`, kept in view pins) | recomputed at each commit that rebuilds Find's index | follows its records | — |
| an arch vault (`archVault` chamber, `Chamber.span`, its `door`) | U-SYS's vaults step (T2) from the base's `vault` spans; `ArchVaults.reconcile` in the commit of an edit that adds a raised way (T4 `road` with `raised`, the aqueduct class; the same span rule), sets a span's `use` to `vault`, or re-shapes a way; at an epoch through V06's `under.extend` over `EpochScope.raised` | S14, the exports, U-ACCESS (b), V10, a declared placement, `gradeFaces` | the vaults part chunk | re-derived with its raised way, its id kept by its key; its closure follows its span at every derivation by V04 §3.5.4 (d) (2); **removed** in the same commit as its raised way is deleted, generated or drawn, or its span set `open` — its links and accesses with it, listed as fates in the dry run; a regeneration after a removal lays none, because the base's generator is the removal's only reader and V04 reads only the resulting raised-way set | the replaced scope: the way and its vaults back with the same ids | absent in an older document: laid at the next vaults derivation, the upgrade's diff listing them (V04 §4.6) |
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
=== END ===

=== REPLACE ### 3.2 U-NET — the sewer network by medieval rules ===
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
took the town's waste; J-V4.7). With none of those either, U-NET makes that bank one **field outfall**: the D8 path of
the cell of largest accumulation (ties by address) among its stretch's cells not on water is followed outward to its
first cell outside `R` and beyond the outermost enceinte's outer strip; the Outfall there is `{ into: 'field', water:
null, at: that cell's centre, snapped }`, the cess field of a dry town, and its outfall run follows that D8 path back to
the stretch's cell and joins the cell's nearest graph node by a straight edge that crosses no water face (the bank's next
nearest node where it would). A bank whose stretch is empty or lies wholly on water (an island in the river, a quarter
between a river and a canal) and that holds no candidate makes none: its plots drain by gutter and pit, its area
reported unsewered (F-NET's truncate rung).

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
=== END ===

=== REPLACE ### 3.5 U-SYS — the void systems ===
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
footprints and basement rings of `scope.built` and `scope.basementGrown`, the raised-way piers of the parts in
`scope.raised` and the footings of the retaining walls in `scope.levelled`, it applies this paragraph's rule to the
elements within reach of those obstacles — an older void's stretch split out `collapsed`, a chamber covered by at least
`collapseShare` `collapsed`, one covered less holding the footing as a pillar, a later system's element `collapsed` (a
catacomb's staying in its extent, V04 §3.5.1 (6)) — cause `foundation` with `event` the epoch's `seq`, one batch per part,
no draw. The plots on a floor it collapses (F6's, an undercity neighbourhood's) are vacated by II.7.3's vacancy rules in the
same batch and returned in `FoundationsResult` (V04 §2.4) — each plot with its households' ids — with the collapsed
elements and the pillars, for V06's re-homing by name inside the participant. An epoch op removes no obstacle — a breached
or dismantled span keeps its piers' footings (V06 §3.19.2), a tombstoned wall its footing (above) — so the element set it
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
differ by their stage id (§6.1), and within U-ACCESS each dig key — the building, the void kind and, for an added wing, its key ((d)) — has its own salt, so no draw's value depends
on another rule's presence. Every key is listed in V04 §3.12.

**With a scope.** `AccessPassStrategy.run(doc, rules, ctx, k, scope?: EpochScope)` (II.7.6): without a scope (T2b) it runs
(a)–(g) over the whole document;
with V06's scope (`under.access`, `afterGrowth` 20) it runs (a), (b) and (f) over `scope.elements` and (a)'s village-working
test over `scope.workings`, (c) for the pairs whose catacomb element is in `scope.elements`, (d) for the buildings of
`scope.built` and `scope.basementGrown`, (e) for the candidates among `scope.elements` and under the faces of
`scope.surfaceChanged`, then (g) — the `lost` transitions and their vacated plots included. Every step is idempotent — a link
or access found by its creation key is kept, never made twice — so running it after `under.extend`'s own overlap tests adds
nothing twice, and each made access or link records `event` = the epoch's `seq`. With an empty scope it runs (g) only. Its
last step is V01's opening pass over the public openings (e) made (V04 §3.10 *The opening pass*).
=== END ===

=== REPLACE ### 3.10 U-FADE and the underground at an epoch (item 11; J-V4.28 – J-V4.30) ===
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
* **`ArchVaults.reconcile(doc, EpochScope.raised, epoch)`** (V06's `under.extend`) — in the epoch's commit: lays the arch
  vaults of the `vault` spans of a raised way the epoch founded or repaired (a town becoming a city), collapses those whose
  span or a bounding support reads `ruined` or `cleared`, or whose span V06 breached or dismantled (V04 §3.5.4 (d) (2); a
  landfall's ruin included), and deletes those of a removed raised way, with their links and accesses; the new chambers
  join `EpochScope.elements`, so the access pass tests them in the same epoch (g item 109 (j) (3b)).
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
  `AccessPassStrategy.run(doc, rules, ctx, k, scope)` (V04 §3.5.7, *With a scope*): each building the epoch builds, or gives a basement, over a cavern, ruin or former-settlement
  element draws U-ACCESS (d)'s dig draw; the excavation reading is recomputed; a cluster that became `accessible` takes F6's
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
  2. at an epoch, as the last step of `AccessPassStrategy.run` with a scope (over its (e) openings) and of `CatacombGrowth.grow` when
     it lays a new complex's entrance;
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
=== END ===

=== REPLACE ### 3.11 Failure handling (no whole-map retry; §5) ===
### 3.11 Failure handling (no whole-map retry; §5)

| where | detection | ladder | report |
|---|---|---|---|
| U-NET outfalls | no admitted candidate on a bank (V04 §3.2 N2, N3) | that bank's moat candidates → its field outfall → its gutters and pits where its stretch of `R`'s boundary is empty or lies wholly on water (V04 §3.2 N2; F-NET's truncate rung) | `requestedVsBuilt`: "sewers discharge to the town ditch / a cess field"; the unsewered hectares |
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
| UE20 | declarations (V04 §4.1) | E1: a form short of its points commits nothing, the tool waiting for its next point; E2: `drawChamber` with one point takes the size; E4: coincident or collinear points make no shape, the form staying open (no degenerate shape reaches a commit); E5: a point on the sky layer or a raised deck reads ground part 0; E7: with the underground hidden the tools act on the ground (T4 draws a way); E8: §7.4's rows | F-EDIT | T-V4-36, T-V4-79 (q) |
| UE21 | attribute paths (V04 §4.2) | E3 and E5: a value outside its range is bent to the nearest lawful value, the bend named (J-VI.4); E4: a width or headroom at its minimum keeps a band the kernel admits, a lower one bent to it; E8: the inverse | F-EDIT | T-V4-36, T-V4-79 (r) |
| UE22 | locality (V04 §4.3) | E4: a degenerate edit shape is refused before any re-derivation; E6: the rows hold at every rung, an inherited system in maintenance mode laying nothing new | F-EDIT | T-V4-31, T-V4-79 (s) |
| UE23 | undo (V04 §4.4) | E5: an undo whose target a later dossier event changed follows §7.4 (the dossier's precedence: restored where it can, the rest reported) | — | T-V4-79 (t) |
| UE24 | the clerk's view (V04 §4.5) | E1: a document with no underground answers the key `info.under.none`; E2: one element answers as any; E8: pure reads, recomputed after every load, undo, redo and regeneration | — | T-V4-78 |
| UE25 | migration (V04 §4.6) | as V04 §4.6 states | — | T-V4-33 |
| UE26 | read-ahead (V04 §4.7) | E5: a declaration naming a system the document lacks makes it exist (a declaration is a fact, V04 §4.7); two held runs that cross unjoined are joined at their crossing (N10's crossing junction, `W_NET_CROSS`); one a stage cannot honour otherwise is refused at its dry run with the reason and the closest alternatives (item 20 (g)) | F-EDIT | T-V4-40, T-V4-79 (u) |
| UE27 | the view (V04 §5.1) | E1: with no non-empty band the layer draws the ghost only, the band ladder empty with the key `info.under.none`; E2: one band is the drawn band; E7: the layer hidden, each `underView` mode, `showUnexcavated` on and off (drawn only for `secret`) | — | T-V4-27, T-V4-79 (v) |
| UE28 | marks and programs (V04 §5.2) | E1: an empty band draws no rock; E2: one element draws its halo; E4: a mark of zero length or area is not written; E6: the same programs at every rung | — | T-V4-27, T-V4-79 (w) |
| UE29 | light (V04 §5.3) | E1: no source → the ambient alone; E6: at every rung | — | T-V4-25 |
| UE30 | labels (V04 §5.4) | E5: a missing name is drawn by S13a; E6: at every rung | — | T-V4-79 (x) |
| UE31 | exports (V04 §5.5) | E4: a zero-length or zero-area feature is left out of the export and listed in its log; E6: at every rung; E7: the parity presets export only the hidden sewer; the layer's visibility never changes the per-band export | leave out and report | T-V4-28, T-V4-29, T-V4-79 (y) |
| UE32 | Find on Below (V04 §5.1) | E1: no chip, or no match Below, draws nothing Below and counts 0; E2: one match glows or pins as any; E3: at the city band every match has a pin or a count bubble (item 120 (k)) — a match whose element is under about 6 px carries its chip's pin, and pins and ghost pins closer than about 24 px merge into a count bubble by §8.2's rule, up to the metropolis cap; Show gaps Below: every `district` unit Below without a member — each undercity neighbourhood and the underground pseudo-district — is outlined dashed "none here", and a `walk` or `households` unit reads `underDistance` (V01 §5.4 (3); V04 §3.6a (5)); E5: an element of an `unexcavated` cluster is absent below `secret` and a ghost pin at `secret` while its cluster is not drawn; E6: at every rung where the layer has a match; E7: the layer hidden (every match Below a ghost pin), each `underView` mode, `showUnexcavated` on and off; E8: a view — the chips saved in view pins, re-evaluated after load, undo, redo, regenerate and migrate, the document never changed | — | T-V4-81 ((c) the gaps, (f) E8, (i) E3) |
| UE33 | the damage below ground (V04 §5.6) | E1: a building never decayed (level 0), and an underground none of whose buildings has decayed, draw byte-identically to the build without the layer (`item123.damage`); E2: one element past its threshold is drawn damaged alone, and a crypt whose ring holds no cell centre of its column grid has one `cryptVault`, its room's ceiling whole; E3: at level 1 every element below ground is past its threshold — a cellar and a crypt draw partly collapsed, every room, wall line, way down and join kept (a ruined church keeps its crypt), the lowest storey's floor walkable; E4: a crypt-only basement on its ring alone takes its crypt's kinds only, a grid cell whose centre lies outside the ring is no bay, and an element a plan edit removes leaves with its part; E5: a kind with no V11 row, and every building before V06's level lands, read as V06 §3.23 (4) states; a building over a void whose cellar vault has fallen keeps its dig access, a church its crypt join — no stage reads the level; E6: every rung where a basement, a crypt or an underground building stands; E7: every toggle and preset alike, the parity presets included (a look); the layer hidden draws none of the underground view's part, a plan's storey below 0 still drawn; E8: a reading — save, load, undo, redo, regenerate and migrate re-read it at the drawn week, an undone restoration giving back the level its events give | — | T-V4-82 |

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
| UC19 | water — a river, a canal, a moat or the harbour, with its bridges and any pier, mole or quay platform over it — × the sewer | no sewer edge, run, knot, grating, drain run or passage lies over a water face (V04 §3.2 N3: a `Bridge`'s deck span whatever its way's class, the `bridge`, `pier`, `ford` and `aqueduct` classes and every spine stretch over water left out of the `SewerGraph`; N8 and N9 the same); each bank drains to an admitted outfall on its own bank, the outfall cap keeping each bank's largest root; a bank with none takes its own moat candidates, then its own field outfall, and a bank with no dry stretch of `R`'s boundary drains by gutter and pit, its area reported unsewered — never a crossing; a drawn or prefix-declared run that would cross water is bent at the bank, the bend named (V04 §4.1) | F-NET's truncate rung | T-V4-80 (j) |
| UC20 | a catacomb growing into a sewer (the owner's named combination) | the growth's course is never bent for the sewer, and a sewer run refuses no node (V04 §3.5.1 (4): `system` reads another complex of the catacomb's own part); each gallery or chamber of the growth that meets a run where their vertical intervals intersect commits one typed opening in the growth's commit — a `breach` link, cause `overlap` naming the catacomb system and the epoch's `seq`, its kind by `LinkRule.kinds`, a builders' grille reading `gated` (V04 §3.5.7 (a)) — one per meeting element pair; no element moves or changes system (two parts, never a merge) and the run's knots, profile and `serves` are unchanged; a complex passing over or under a run at another depth is linked only by U-ACCESS (b)'s chance or the overlap shaft's; the opening is a path of the connection graph like any link | — | T-V4-80 (k) |
| UC21 | item 123's damage × the underground's access model — a ruined church whose crypt is joined to a catacomb, a ruined building over a cavern with its dig access, a cellar under a decayed building over a ruin, the buildings of a cluster turned `lost` | a drawing only (V04 §5.6 (4); J-V4.130): every access, link, crypt join, `ExcavationRecord` entry and excavation state is the same at every level, so a scrubbed week never opens or closes a way; a damaged stair core or access head below 0 draws as rubble over steps still climbable; a way closes only by this volume's closure states, and a `lost` cluster stays lost whatever its buildings show; a building in a `collapsed` or `flooded` element draws that element's §8.2 `states` row over its own damage | — | T-V4-82 (d) |
=== END ===

=== REPLACE ### 3.12 Determinism (§6) ===
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
building, salt the void kind and, for a wing V02's mutator adds over a void, that wing's key; V04 §3.5.7 (d)); each crypt join (`sewer`, the church and the complex source); the quarry ossuary's chance
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
§6.3's `plan.damage` draws keyed by the building's lineage and the element's id (V04 §5.6); the opening pass's names are V01's draws on `naming`
(V01 §2.8). Every loop runs in address order; every search breaks ties by address or index; the tail runs serially on one
worker; every length is an integer centimetre and every transcendental goes through `dmath` (§6.5). A New random on a
system, a tunnel run or an undercity neighbourhood advances its reroll and writes only its own part, but for its links'
far ends (§3.4), the carve's split parts (V04 §3.6 C2) and, on a `cavern`, `ruin` or `quarry` system, V01's opening
places over the openings U-ACCESS (e) makes and removes (V04 §3.10); a New random on the catacomb system removes nothing
(V04 §3.5.1 (6)).
=== END ===

=== REPLACE ### 5.1 The underground view (§8.4; item 413; J-V4.31) ===
### 5.1 The underground view (§8.4; item 413; J-V4.31)

Hidden by default at every rung (§8.4). When the underground layer is visible, one depth band draws at a time (`depthBand`,
§2.9; its default §8.4's), in one of three modes, `LayerSpec.underView` (item 413), default `cutaway`:
* **`cutaway`** — the ground drawn first as a **ghost**: every ground mark at `ghostAlpha`, in its luminance only, ground
  labels hidden but for the district and quarter labels at half alpha; then the band's underground marks over it, so every
  tunnel reads against the street above it;
* **`overlay`** — the ground at full strength, the band's underground marks over it at alpha 0.7;
* **`solo`** — the underground alone, the ground reduced to its way centrelines as `trace` hairlines (the export default).

The adjacent bands' traces are §8.4's. The **band ladder** in the layer panel lists every non-empty band as its depth range
(−2.5 to −5 m …) with the kinds present, the drawn band marked; PageUp and PageDown step it by §14's keymap precedence —
with a building's plan open they step its storey (V03 §4.5), otherwise, with the underground layer active, the band. A
document opened with the underground visible shows the ghosted ground with the notice "building the underground…" until T7
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
(`@plat/under`, never stored): for each matched id on an underground part — an underground building and its use (a sewer
dwelling, an F4, F6 or C4 building, an undercity institution), an undercity or sewer-front district, a named system or
catacomb complex, a named run, the core's plaza, a named chamber — it gives the part, the depth bands its open elements
occupy (§8.4's `depthBandCm`), its glow shape in each of those bands (a footprint, a chamber's wall, a run's or gallery's
band, a district's outline on its part) and its plan anchor (a building's footprint pole of inaccessibility, a district's
label anchor, else the point V04 §5.4 places its label at). The matches are the listing's; this volume adds no match
rule. With band b drawn:
1. **The band shown glows.** A match with an element in band b glows on those elements over the veil, which lies over the
   band's rock, voids and the cut-away's ghost alike, the plan lines (V04 §5.3) under it.
2. **The other bands are ghost pins.** A match Below with no element in band b is a faint ghost pin at its plan anchor
   carrying its shallowest band's depth range as the band ladder writes it; the ladder marks each band holding matches
   with their count; **Go there** sets `depthBand` to the match's shallowest band (a view key, never an edit). A match on
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
   underground epoch participant's — and the chips re-evaluate then (V09).

Find writes no record of this volume, never the excavation reading or `ExcavationRecord`, and no digest; with no chip on,
nothing of it is drawn.
=== END ===

=== REPLACE ### 5.2 Marks and programs (§8.1, §8.2) ===
### 5.2 Marks and programs (§8.1, §8.2)

The underground builder of S14 writes, per part and band, marks of the semantics `under.rock`, `under.void`, `under.water`,
`under.wall`, `under.building`, `under.trace`, `under.access`, `under.link`, `under.label` with the ordinary columns (§8.1;
`knownTo` and `concealed` on every mark, item 7). The draw order inside a band:
1. **Rock** — a hatched halo of `rockHaloM` (4 m) outside every void's kerb, in the role `rock` (item 413; each sheet's
   facts below), the rest of the rock transparent so the ghost shows: the dungeon-map figure-ground, where voids read as
   carved (J-V4.31).
2. **Voids** — tunnel bands, gallery bands and chamber floors in the role `void` (one step lighter than the
   ghosted ground; each sheet's facts below). A tunnel draws by §8.2's kind rows over the void (the cased band for a `main`, the hairline pair for a
   `drain` or `culvert`, arch glyphs at a `passage`'s ends); a `chamber` junction wedge in `chamber`'s fill.
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
=== END ===

=== REPLACE ### 5.5 Exports (§11.1; item 452; J-V4.35, J-V4.36) ===
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
=== END ===

=== APPEND TO SECTION ## 5 Rendering, labels and exports ===
### 5.6 Damage below ground — cellars, crypts and underground buildings (g item 123; J-V4.130)

Item 123's damage layer — one plan, never redrawn; each plan element shown damaged when its building's decay level
reaches the element's keyed threshold, the one comparison every reader makes (§2.6 step 7; §6.3's `plan.damage`;
V06 §3.23's `decayLevel`) — reaches below ground by the rules below. V03 draws the plan and its damage, V02 the exterior;
this volume states what is particular below ground. It is a drawing only: no record, field, id or digest changes.
1. **The level each element reads.** A storey below 0 of a ground building — its cellars, stores and undercrofts, and
   its crypt with its capped bays (V03 §3.7) — is part of that building's one plan and reads that building's level,
   `decayLevel(doc, its lineage, week)`. An underground building — a sewer-front dwelling, an F4, F6 or C4 building, an
   undercity building (V03 §3.12) — reads its own lineage's, whose decay run the underground's own events start
   (V06 §3.23 (1)): the abandonment of a `lost` cluster's dwellings (V04 §3.5.7 (g) (5)), the plots a shrinking or
   cleared undercity neighbourhood vacates (V04 §3.10), a void dwelling vacated on a floor `Foundations.apply`
   collapses; its restoration is V06 §3.23 (3)'s, as for every building. No level reads a void's closure state or the
   excavation reading.
2. **The kinds below ground, each with its own thresholds** (item 123 (c)). `belowKind(building, element)`
   (`@plat/under`, derived, never stored) gives an element below ground one of five kinds, each a row of V11's item-123
   table by element kind, so it draws its own range and its own threshold — §6.3's `plan.damage` draw, keyed by (the
   building's lineage, the element's id), as every element's; no id is minted:

| kind | the elements | element id | damaged, drawn as |
|---|---|---|---|
| `cellarWall` | a wall run of a storey below 0 on `Basement.ring`'s outer edge outside the crypt's ring; an underground building's wall run on a footprint side that lies on its part's rock (outside the part's `bandUnion`, §3.7) | its `wall:` id (V03 §2.2) | partly collapsed: the run's middle third broken over a rubble spill 60 cm deep into its room, still a wall to sight and passage, earth or rock behind it |
| `cellarVault` | the ceiling over each room of a storey below 0 outside the crypt and its capped bays | the room's id | fallen: a rubble heap over the room's middle half (its ring inset by a quarter of its least width), the ceiling drawn open above it |
| `cryptWall` | a wall run on the crypt's ring (`Basement.crypt.ring`) or on its capped bays' ring | its `wall:` id | as a `cellarWall` |
| `cryptVault` | each cell of the crypt's column grid (V03 §3.7.5: pitch `crypt.bayCm` in the step-2 ring's frame, which no rank event moves) whose centre lies inside the crypt's or its capped bays' ring; a crypt whose ring holds no cell centre has one, its room's ceiling whole | (its room's id, the cell's grid node (i, j)), or its room's id — a key, never a new id | fallen: a rubble heap filling the cell, its columns standing |
| `cryptTomb` | each furniture piece of a `crypt` room (V03 §3.8: its tombs, ledger slabs and niches) | its `furn:` id (V03 §2.2) | broken open: a lid cracked, a slab split, a niche breached, as V03 draws a broken piece |

Every other element below ground keeps its V03 kind and range: a partition, an opening, a stair core, an access head, a
cellar's furniture, and an underground building's elements other than its rock-side runs. The floor of the lowest
storey below 0 lies on the earth and is no element, so it never fails. **The ranges** are V11's values in an order this
volume rules: each of the five kinds' ranges lies inside the `ruined` share of the level (V06 §3.23 (2)), the crypt's
kinds at its top, so a cellar and a crypt stand intact through `abandoned` and `decayed` and partly collapse only once
`ruined`; and a damaged element of the five never removes a room, a wall line, a way down or a join — at level 1 a
ruined church keeps its crypt (V03 §5.1), every bay fallen and every tomb broken open, its rooms and its ways standing.
3. **Below ground, drawn.** A damaged element below 0 not of the five kinds is drawn as V03 draws its kind damaged, but
   for one rule: a stair core whose `levels` include a storey below 0, and an access head on one, draws as rubble over
   its steps, a way still climbable — the way down is the access model's (4). The rubble below ground is the `ruin`
   program's stipple in the `rock` role (V04 §5.2), one stipple for every collapse below ground; a repaired element —
   its threshold above the level and at or below `decayPeak` (V06 §3.23 (3)) — is drawn in item 114's patch material
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
6. **Landing, budget, edges, bar.** It lands at U5 (V04 §8): the underground view's footprints and the per-band exports
   there, a plan's storeys below 0 once V03's item-123 step draws the plan's damage (V03 §8), and every level read from
   the existence state at V11's default age until V06's level lands (V06 §3.23 (4)). A building never decayed draws
   byte-identically to its build without the layer (`item123.damage`). Its budget is V04 §6's *Damage below ground*,
   its edges UE33 and UC21 (V04 §3.11), its bar T-V4-82.
=== END ===

=== REPLACE ## 6 Performance budgets ===
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

**View.** Showing the layer or switching band re-rasters the visible tiles of the underground layer only (the ground's ghost
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
(V04 §4.3; V01 §3.15) at V01's Re-derive-from-S2 line (V01 §6) plus the tail's p95, as the adjusts are; a raised way's add
or removal adds ≤ 2 ms for its arch vaults and foundations; a span's `use` edit ≤ 1 ms; a monument's count ≤ 1 ms; a
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
=== END ===
