
## 1 Scope, the base hooks consumed, and what is out of scope

### 1.1 What this volume builds (to build depth)

| what | where |
|---|---|
| existence and count: the rung gate, the model setting, the dossier's coherence gate, the three ordered slots, the removals that hold | V05 §3.2 |
| the supply law made measurable: the town and carried supplies on absolute field values (RV-pc-3), the magical node (V08 §2.6's deposits row) | V05 §3.3 |
| purpose: a prosperity or an institution island (palace, cathedral, prison, tower), by rule or by assignment, custom institutions by archetype, item 108's ladders | V05 §3.4 |
| the sky allocation: S7b (5)'s fill, the carried workplaces, the coverage units, the S3 reservation's hand-over, the cathedral's crypt and item 109 (k) on an island | V05 §3.5 |
| shape and placement | V05 §3.6, §3.7 |
| the island arena: frame, void, land, rim, terrain echo, conjured river and waterfall; an island's own water under item 111 | V05 §3.8 |
| the underside, the ground reference and the altitude (J98) | V05 §3.9 |
| access: hoists, rope lines, floating stairs and bridges of light, with their landing yards | V05 §3.10 |
| the island's gradient field, its context vector, and the inputs volume 1's unit run reads | V05 §3.11, §3.12 |
| lights and names | V05 §3.13, §3.14 |
| over time: the island laws an epoch applies, the households through volume 6's channels, the fall and its landfall over every covered kind | V05 §3.15, §3.16 |
| failure ladders, determinism, every edge | V05 §3.17, §3.18, §3.23 |
| the shade strip (item 102 on the island's side) and the shade basis that lets its lag survive a save | V05 §2.1, §3.19 |
| the siting rulebook, the supply web and custom chains across the island (items 103–105, 107) | V05 §3.20 |
| the rim as a barrier (item 106) | V05 §3.21 |
| item 110 on, under and against the island | V05 §3.22 |
| editing, rendering, labels, exports, budgets, tests, build plan | V05 §4–§8 |

### 1.2 The base hooks this volume consumes

Each row names the base section and what this volume does with it; the base's values are read there.

| base section (and what it carries) | how this volume uses it |
|---|---|
| II.6 (the island rule (1)–(8), `IslandRule`, `SkyStrategy`; items 546, 547) | built to depth here: V05 §2.4's rows, V05 §3.2–§3.16 |
| II.1 rule (5) (the `sky` request, no portals, no roads in or out) | SKY makes the request and its unit inputs (`SkyUnitInput`, V05 §2.3); volume 1's unit run lays the districts |
| §1.1 `RungProfile.layers.islands` | the gate of V05 §3.2 (1) |
| §2.1, §2.2 (`PlatKey`, rules 1, 2, 5, 7; items 203, 204) | the island arena's levels, the void face, the `rim` and `sky_access` roles, local coordinates with a world anchor |
| §2.3 `Terrain`, `WaterBody` (item 252) | the terrain echo and the conjured river with its `fall` (V05 §3.8) |
| §2.5 `Allocation`, `ContextVector`, `Reservation`, `Block.interior` (items 213, 286) | the sky allocation, the positioned landing rows, `arena: 'sky'`, the `landing` reservation, `rim_strip`, `handedFrom` |
| §2.7 `SkyIsland`, `SkyAccess`, `Decoration`, `LandUse`, `LightSource`, `RetainingWall`, `Enceinte` (items 245, 251, 252, 253, 575) | the records V05 §2.1–§2.2 declare; the landfall decoration and quarry; the island's retaining walls; the condition the landfall writes |
| §2.8, §2.9 (item 274) | the registry rows; `Document.nextSkyPart`; the shade basis read on load |
| §3.4, §3.7 | the rim's resize by buffer; `splitThrough` for the landfall's knots (V05 §3.15, §3.16) |
| §4.1 (item 282) | `SKY`'s registration and its two ground data keys; the unit run as a unit of the hinterland unit's kind (V05 §3.1) |
| §4.2 S0, S1 (2)–(5), S3 (2), (8) (item 286) | outline, terrain, the conjured river, the island's crossing sites; the reservations an institution island leaves |
| §4.3 (item 290) | the raised ways' slot, stream and sky clauses (V05 §3.1, §3.22) |
| §4.5 (items 295, 296, 308) | S_town, S_carried, S7b (5)'s fill, the landing kernel, the daylight term and its sampler, the island-free value |
| §4.6 (item 299) | a ground landing's attach as an infill destination (V05 §3.10 (4)) |
| §4.7 S10–S11, S10b, *Light sources* (items 307, 308, 309) | the landing plots, the supply distance between arenas, the sky light rows, `levelledGroundCm` |
| §4.8 (item 580) | the island's crossing sites, laid by volume 1's unit run |
| §4.9 (items 313, 546) | the rim walk's greenery row; the value-keyed island rows |
| §4.11 (item 320) | the island kinds of `ConversionOp`, `IslandEpochStep`, the landfall, the salvage ledger (V05 §3.15, §3.16) |
| §5.1–§5.3 (item 331) | the F-SKY rows and the sky invariants (V05 §3.17) |
| §6.1, §6.3 (item 476) | `island.place` and its creation indices; the access anchor (V05 §3.18) |
| §7.1–§7.4, §7.6, §7.8 (items 356, 375) | V05 §4: the events, the targets, the bends, the lifecycle rows, the tables, the controls |
| §7.7 (item 387; DR27) | the dossier's islands row (V05 §4.4) |
| §8.1, §8.2, §8.4, §8.8 (items 408, 415, 416) | the island's marks, the sky slots and `sky.ground` role, the state rows, the slab tiers, the light window (V05 §5) |
| §9.1, §9.2, §11.1 (item 415) | the island's labels and their occlusion rule; the sky exports (V05 §5.4, §5.5) |
| §12.4, §12.6, §13.2, §14, §16 (items 476, 568) | V05 §6's budgets; T10-1, T13-1, T15-1 and the island-shadow golden beside T-V5-*; `@plat/sky`; M6-sky |
| item 102 (§4.5 *Fields*, §4.7 S10b, §7.6, §8.4, §13.2) | the islands' share of the daylight term and the sky receivers' shade (V05 §3.11, §3.19) |
| items 103, 104 (§10.2, §4.7 S10b, §7.6, §7.7, §13.2) | the route between arenas, the island's coverage units, the carried trades, the landing classes' facts, the custom archetypes and chains (V05 §2.4, §3.4, §3.5, §3.20) |
| items 105, 107 (the supply web; spread and pull) | applied across arenas (V05 §3.5 (3), §3.20 (10)–(12)) |
| item 106 (natural barriers; `Enceinte.closure`) | the rim a `sheer` barrier (V05 §3.21) |
| item 108 (institution ladders) | what an island institution may be; carried members keep their records (V05 §3.4, §3.5) |
| item 109 (f), (k) (J111) | the node term stays positionless; island churchyards never catacomb candidates; the crypt a rim-slab vault (V05 §3.3, §3.5, §3.10 (5)) |
| item 110 (a)–(d) (§2.7, §3.4, §4.3, §4.6, §4.7 S10–S11, §5.3, §7.1, §8; items 244–246, 260, 290, 309) | casters under an island, the accesses' admissible ground, the island's retaining walls, the landfall's covered set, the generator's reads of the sky (V05 §3.22) |
| item 111 (§2.3, §4.2 S0–S1, S3, §4.4, §4.5, §4.7 S10b) | stops at the island's rim (V05 §3.8 (4), §3.11) |
| V01 §2.4, §3.10.3, §3.16 (the unit runner, the island's partition, `skyDistrictCount`) | SKY calls the unit run once per island with a `sky` request; the run reads `skyUnitInput` (V05 §2.3, §3.12) |
| V02 §2.6 (`DeckContext`), §3.15.2 (the stack's heights envelope) | the caster ceiling and the surface top per point; the landfall's deck plots (V05 §3.9, §3.16) |
| V06 §2.1 (`EpochParticipant`, `EpochOps`, `EpochScope`), §3.2, §3.4, §3.8.1 | `sky.islands` at `afterField` and `sky.clearance` at `afterGrowth` (order 50); the sampler layout the building mask shares; the displaced pool's cause `island` (V05 §3.15, §3.19) |
| V08 §2.6 (the deposits row), §3.5 (the site latitude) | the node term (V05 §3.3); the samples' latitude (§4.5) |
| V09 §2.7, §4.9, §5.4, §6.4 | the Shade view reads the held strips; the bend rows (V05 §4.2, §5.1) |
| V10 §2.13 (`WhyProvider`, `FieldDrivers`) | the sky's `WhyProvider` and the daylight term's per-island attribution (V05 §4.5) |
| V11 §3.5, §3.9 (the class and district-kind rows) | the institution rows' tags and the `sky-*` district kinds (V05 §2.4) |

### 1.3 Out of scope, and whose it is

* **Laying the island's districts, blocks, plots and buildings** — volume 1's unit run (V01 §3.10.3). This volume gives
  it the arena, the land face, the rim strip, the claims, the landings, the allocation and the field values (V05 §2.3),
  and reads back what it made.
* **Scheduling epochs** — volume 6. This volume states the island laws an epoch applies (V05 §3.15) and the conversions
  they emit; the engine decides when an epoch runs.
* **Screens, panels and gestures** — volume 9; this volume fixes the tools' parameters and the events (V05 §4).
* **The clerk's prompts** — volume 10; this volume fixes what the clerk reads and proposes about islands (V05 §4.5).
* **Word lists and grammar rows** for island names — volume 11; this volume fixes the naming features (V05 §3.14).
* **Calibration runs** — volume 12; every calibrate-later constant here names its default, its measurement and its
  fallback.
* **The underground** — volume 4. Islands have no relation to it (item 2): nothing here reads or writes an underground
  part. Item 109 (k) (J111) on an island is this volume's to state: a churchyard on a sky plot (§4.9's churchyard row) is
  a surface burial ground only, never a catacomb candidate and never ranked as the largest cemetery, while each church on
  an island still counts once toward the catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V04
  §2.3); an island cathedral's crypt is a vault in the island's rim slab, part of its building, never an
  `UndergroundSystem` part or an item 109 (j) (3b) link (V05 §3.5, §3.10 (5); J-V5.43). The landfall's quarried rubble
  sources no underground quarry (V05 §3.16).
* **The daylight term itself** — `w_sun`, the model sampler, pass 1's terrain and wall shade, S10b's sunlit-side
  preference and the bars are the base's (item 102, item 296; §4.5, §13.2); this volume gives the islands' share. **Drift
  over epochs** of shade and siting is volume 6's (item 102 (e)); this volume states only when a strip is re-read (V05
  §3.19 (6)). **The shade map view** is volume 9's; **every class's siting profile, supply edges, coverage rows and
  signature pairs** are volume 11's (item 103) — this volume states the facts its landing classes and carried trades
  must satisfy (V05 §3.20). **Custom chains** — their discovery, activation and arrival are volume 8's, a chain's
  street-scale closeness and any quarter named past item 72's threshold volume 1's (item 107 (e)), the placement rules
  and rows volume 11's (item 104 (h)); this volume states what the island changes about a chain (V05 §3.20 (9)). **The
  `magical_node` deposit's position** (item 109 (f)) is volumes 8's and 4's; this volume reads only its state (V05 §3.3).
  **The crypt's room plan, stairs and furnishing** are volume 3's and its basement form volume 2's; this volume fixes
  where an island cathedral's crypt may lie (V05 §3.10 (5)). **Item 110's own work** — generating, drawing and decaying
  raised ways, retaining walls, stepped massing and deck plots — is the base's (§4.3, §4.7, items 244–246, 290, 309),
  volume 2's (massing and deck buildings), volume 1's (terraced wards and the island's levelling in its unit run), volume
  4's (the vaults under raised ways) and volume 6's (all of it over epochs); this volume states what an island changes
  about them and what they change about an island (V05 §3.22).
