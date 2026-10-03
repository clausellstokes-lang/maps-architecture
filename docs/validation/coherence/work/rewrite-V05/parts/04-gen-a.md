
## 3 Generation

### 3.1 Where the sky runs in the stage graph

| step | when (§4.1's graph) | worker | writes |
|---|---|---|---|
| **S7b (5)** — gate, slots, reasons, fills, outline and placement per slot (V05 §3.2–§3.7) | inside S7b, before S7b (6) and (1) | generation, eager, town-wide | the sky `Allocation`s; data only (no batch) |
| **SKY** — `SkyStrategy.place` (II.6), per island in slot order: the arena (V05 §3.8), the underside, the ground reference and the altitude (V05 §3.9 (1)–(4)), the access tops and feet, the island's claims, the ground landing claims (V05 §3.10), the field (V05 §3.11); then, once every island has its solid, its **shade evaluation**: every island's `shadeBasis` written, then the strips onto the islands and the sky receivers' shade (V05 §3.11, §3.19 (6)) | after S7b (its S7c hook included, V01 §3.1) and before S12a, S8 and S10a, by declared I/O (below); S7c reads none of SKY's outputs — a landing claim is a hole S8 cuts around (V01 §3.4.1) | generation, eager | on each island's arena: one L0 batch, then one L1 batch; on the ground arena: one L1 batch of landing claims (`claimSubFace`, as S7b (3)'s claims) |
| **S10a — the strips onto the ground and field pass 2** (§4.5, item 296) — the islands' strips onto the ground, from each island's `shadeBasis`, computed once per shade evaluation at their first read and held, OR-ed by pass 2 into the daylight term's per-sample mask (V05 §3.19 (6)) | S10a, after SKY and before the pool | generation, eager, town-wide | the strips, held with the field's rasters (V05 §2.3a); at a re-derivation starting after SKY and at or before S10a, first — at S10a's start, before step (i) and every hook — the `shadeBasis` of every live island, then the strips onto islands |
| **the unit run** (V01 §3.10.3), one per island | after the ground's S10 (0); concurrent with the pool, on its own overlay, merged in lineage order like the hinterland unit (§4.1, item 282) | generation | only its island's arena |
| **SKY-F** — the post step: the clearance check (V05 §3.9 (5)), the landing check and repair (V05 §3.12), the crypt re-test (V05 §3.10 (5)), the sky lights (V05 §3.13) | after the pool's merge, before S12c and S13a | generation, eager | island records; `LightSource` records; at most one L1 repair batch per island |
| S12c, S13a, S14 | as the base; S12c gives the island's districts character and identity as the ground's (§4.5) | — | the island's names and labels (V05 §3.14); its marks (V05 §5) |

**Declared I/O** (J-V5.70). SKY's `StageDecl` (§4.12) reads S7b's outputs — with S7b's hooks united into their host's
declared inputs and outputs (V01 §3.1), S7c's among them — and writes on the ground only its two data keys,
`reservations.landing` (the ground landing yards) and `allocations.landing` (the positioned `sky_landing` rows), as §4.1
states (item 282); on each island it writes that island's arena, records and field. SKY is one of the ground's L1
writers in §4.1's order. No stage or hook before SKY declares either landing key (V01 §3.1's hook table reads
`reservations` as S3's and S7b (3)'s keys only); S8, S10a with its hook S9b, and S12a declare both, so §4.1's sort puts
SKY after S7b and before S8, S10a and S12a, with no cycle (T-V5-32). SKY rewrites no row S7b wrote: a landing's two
staff households belong to its landing row, and S10a takes them from the host district's `modest` residential demand
when it reads the two keys together (§2.5, item 213).

Nothing of the sky runs on the one-click path: `recipe.layers.islands` is off by default (D-3), and with it off S7b (5)
makes no allocation and SKY registers but writes nothing under either key — the ground model is byte-identical to the
realism golden (T13-1).

**Item 110's raised ways in the order** (J-V5.63). Every generated raised part is committed before S7b (1) — §4.3's
slot (item 290 (1)) — so it exists when S7b (5) places the islands and when SKY fixes the ground reference, and it never
reads an island: the generated raised-way set is the same with islands on or off (T-V5-30). A raised part that exists
when SKY runs is read by SKY (V05 §3.7 (2), §3.9 (3), §3.10); one committed after SKY — by an epoch's raised-way pass or
a T4 stroke — is read by SKY-F's clearance check (V05 §3.9 (5)), the epoch's clearance re-check (V05 §3.15 (7)) or the
adding edit's dry run (V05 §4.3), and its course keeps clear of the accesses through `skyAccessObstacles` (V05 §2.3b).

### 3.2 Existence and count

1. **The gate.** Islands exist only if all hold: `recipe.layers.islands = 'on'`; the rung's `RungProfile.layers.islands`
   admits them (§1.1); the recipe is not a parity preset's (`MFCG` and `FTG` hold `off`: no reference has islands, item
   23); and, for a dossier-bound document, the circumstance `magic` that DR27 derives from the dossier's `site.magic` is
   not `none` (V05 §4.4). A failed gate makes no allocation and reports `islands: off`, `gated: rung` or
   `gated: dossier magic`.
2. **The town supply** `S_town` and `h_town` (V05 §3.3).
3. **Forced slots.** Every declared island of the creation prefix (T5 `quarter` with `sky`, V05 §4.2) and every
   assignment whose criteria carry `sky: true` forces the lowest free slot open, in log order. A fourth is bent at its dry
   run to join the nearest open island as a district on it ("At most three islands float here; this quarter joins
   {island}"; J-VI.4 (a), item 101 R2).
4. **The count.** `recipe.params['islands.count']` — `auto` (default), or 0–3, the `adjust` of V05 §4.2. At an integer
   `n`, exactly `n` slots are open (the forced ones counted first, a slot held by a removal counted as one of them, (6);
   `n` below the forced count is raised to it at its dry run, a bend, J-VI.4 (a)), with no draw. At `auto`, each slot k
   above the forced ones, in order, opens with probability `chance[k] · h_town` and only if slot k − 1 is open: one
   uniform on `island.place` keyed by the town's lineage with creation index `slot:k` (V05 §3.18).
5. **The report** lists the count, the forced slots and each slot's outcome (V05 §3.4–§3.7), a held slot's outcome being
   `removed by you` (6). With the setting on, the gate passed and no island present, it carries one plain sentence for
   the author and the clerk — "Islands are on, but the city is not prosperous enough to keep one aloft" when `h_town` is 0
   or every slot closed `no supply`, "… none rose this time" when the slot draws came up empty — and names both remedies:
   raise the town's wealth (T1 `intend`), or place an island by hand (T5 with `sky`, held against its supply, J-V5.10).
6. **Removed slots** (the owner's "a user can decide to add or remove" and item 110 (b)'s "a removal is an edit that
   holds through regeneration", applied to islands; J-V5.62). A slot held by an island record in state `removed` whose
   `removed.releasedBy` is absent (`convert removeIsland`, V05 §4.2 — a generated or a declared island alike) is **closed
   with the outcome `removed by you`**: no draw on its `slot:k` or `reason:k` index, no fill, no outline, no placement,
   no SKY run. It **counts as open and filled** — for the slot chain of (4), so a higher slot draws on its own creation
   index exactly as before the removal, and toward an integer `islands.count`, so the removal is never replaced by an
   island in another slot (the owner removed that island, not the town's quota). It re-opens only by item 260's lift
   rule: (i) the removal's undo, or (ii) a T5 `sky` declaration when no slot is free — the user's re-add serving that key:
   the lowest held slot then counts as free for it, and the declaring event sets `removed.releasedBy`. **A count never
   releases a hold:** an integer `islands.count` counts every held slot as filled and opens only free slots — a cap
   increase opens only new keys (item 260) — and `auto` never draws a held slot; an adjust whose integer exceeds the slots
   it can open lists the fate "slot k is held by your removal of <name>; undo the removal or draw an island to use it",
   and opens what it can. The removed island's households were relocated by its removal (V05 §4.2), so S7b (1) allocates
   them to the ground at every re-derivation and the population stays whole (T-V5-29).

### 3.3 The two supplies, on absolute values (answering RV-pc-3)

A town supply read against the town's own cuts compares a mean with a per-town quantile, which measures the
distribution's shape, not the town's wealth, and a mean never reaches the field's top
(`docs/retrovalidation/pipeline-content.md` RV-pc-3). Both supplies are therefore read on the field's **absolute** value,
which the dials, `wealthLevel`'s character offset (§7.7 layer 1) and the epochs' drivers move (J-V5.3):

* **`S_town`** — the mean prosperity value `P` over the settlement's built land: the cells of §4.5's 32 m field raster
  whose centres lie in a district face (the hinterland, underground, undercity and sky pseudo-districts excluded), less
  the cells in water and in reservations of kind `park`, `harbour_basin`, `moat` or `canal`; at S7b the value after field
  pass 1, at an epoch the island-free value of that epoch's re-evaluation (§4.5, item 296; §4.11).
* **`S_carried`** — the mean, over the households an island carries, of their band's value `v(b)`: the midpoint of the
  band's two cuts on the absolute value (`FieldBands.cuts`), the lowest band's lower cut 0 and the top band's upper cut
  1. An institution island's `S_carried` is `v(requirementBand)` of its row.
* `h_town(S_town)` and `h_carried(S_carried)` interpolate the rule's `townSupply` and `carriedSupply` rows linearly along
  the value, 0 below the first row and 1 above the last. The **supported area** `A` and the **law's altitude** `E` are
  II.6 (5)'s, read with these two values.
* **The magical node** (J-V5.41; II.6 (3), item 547). Where the dossier digest's `site.deposits` carries a
  `magical_node` in state `available` — or `discovered`, from the epoch after the one that discovered it — `h_town` is
  `min(1, the interpolated value + node.bonus)`: magic that wells up on the site costs the town less to keep aloft. It is
  one addend however many such deposits the dossier lists; `depleted` and `removed` add nothing. It acts only where the
  interpolated value is above 0 — a town too poor to supply magic at all is not lifted by a node (the owner's "if there
  is no prosperity, there is no floating islands") — and reaches every reader of `h_town` (the slots, `A`, `E`, the
  epochs). A map without a dossier has no deposits and no node term; the report and the clerk's `why` name the deposit
  when it acts. **Where the node stands is not this volume's:** item 109 (f) puts it at the heart of an underground ruin
  where one exists (its position volumes 4's and 8's, else S12a's decoration site), and the term stays positionless: it
  reads the deposit's state alone, never the underground arena (item 2). The clerk's `why` names "the node beneath the old
  ruins" from the generation report's `ruin.node` line (V04 §3.5.0a (9): the deposit, the ruin system and the ruin's
  `NameRef`, so a renamed ruin reads its new name), never by reading the ruin; with no such line for the deposit it names
  the deposit alone.

**Calibration ⟨P0⟩ (the confirming measurement, V05 §8).** On 200 CITY and 100 METROPOLIS seeds at their targets, at
`wealthLevel` ∈ {0, 0.25, 0.5, 0.75, 1} with the setting on, record `S_town`'s median `m_w` per level; set `townSupply`
to (m_0.25, 0) (m_0.5, 0.5) (m_1, 1). Bars: the median `h_town` at `wealthLevel` 0 ≤ 0.05, at 0.5 within [0.35, 0.65], at
1 ≥ 0.9, all on standalone intents, so with no node term. **Pre-decided fallback:** if `m_1 − m_0` < 0.10 (the field does
not tell a rich town from a poor one), `S_town` becomes `0.5 · (the field mean) + 0.5 · w`, `w` the intent's
`wealthLevel` (with a dossier its derived value, DR6), the rows are re-fitted by the same rule, and the change is
recorded as a declared shift. `carriedSupply` is checked at the same run: `h_carried(v(rich))` ≥ 0.7 and
`h_carried(v(modest))` = 0 at `wealthLevel` 0.5 on ≥ 90 % of seeds; else its rows are moved so that the midpoint of
`v(modest)` and `v(comfortable)` maps to 0 and `v(rich)` to 1, re-measured once.

### 3.4 Purpose — a prosperity island or an institution island

For each open slot, in slot order:

1. **A forced slot** takes its declaration's kind (an institution kind makes it an institution island; any other kind a
   prosperity island) or its assignment's institution.
2. **Otherwise the candidates are:** `prosperity`, weight 1.0, where the roster's households of the bands with
   `h_carried(v(b)) > 0` not yet carried by an earlier slot give at least `minAreaHa` of plot land; and each
   `IslandInstitution` row, at its `weight`, where the roster demands at least one eligible instance of a class carrying
   one of its `tags` (the first tag in the row's order that has one, its lowest roster ordinal) — or the dossier carries
   a custom institution whose resolved profile's scene archetype is one of the row's `archetypes` (a `landmarkOnly`
   entry admitting only `landmarkLevel: landmark`; item 104 (a) (2)), the lowest `localUid` first — that no earlier slot
   carries and that no creation-prefix `placeAt` holds on the ground, its `requires.government` (when present) holds for
   the town's `Government.kind`, its `requires.magic` (when present) admits the recipe's `magic` circumstance, and
   `areaHaMax · h_carried(v(requirementBand)) · h_town` ≥ `institutionFit.fitFactor` × the row's `areaHa`. **An eligible
   instance is one building or one compound** (item 108 (a)): a singular record, a record whose ladder step is SIZE, or a
   roster instance bound to neither — never a COUNT, GUILD or QUARTER record, nor a member `#k` of one (a collective's
   members stand where their record's spread puts them). A dossier institution counts as a roster instance (DR9, DR24):
   the island moves where it stands, never whether it exists (§7.7). The archetype is read at this draw only: a later
   revision of a custom kind re-resolves its profile and keeps it on its island unless a hard row of the new profile
   fails there, when item 104 (e)'s least disruption re-sites it on the ground; the island keeps its reason and its
   claim, the vacated building steps down the base's building ladder as any vacated building does, and the
   regrowth-first order re-occupies it with the next instance of one of the row's tags or its archetype before any ground
   site (§4.11; V05 §3.15 (4)'s rule for vacant stock).
3. **The draw:** one weighted choice on `island.place` (town lineage, index `reason:k`). With no candidate the slot
   closes, reported `no supply` or `nothing to carry`.

### 3.5 The sky allocation (S7b (5) at depth)

**A prosperity slot.**
1. The eligible bands are those with `h_carried(v(b)) > 0`, richest first.
2. Households are taken from the roster's residential demand of the richest eligible band, in batches of
   `fill.batchShare` of that band's demand (at least one household), each batch split over the classes by the band's
   class mix at its centre (item 71; largest remainder); after each batch `S_carried` and `A` are recomputed. **Held
   shares are never taken:** the households a dossier district-defining record's raised share holds on its ground
   district (item 72) — a QUARTER record of item 108 (a) among them, a noble or luxury quarter above all — are subtracted
   from the band's demand before the fill, so the island never drains a quarter the dossier names. The fill stops at the
   first of: the carried plot land — Σ over the carried rows of `plotArea(c, b)` × count, S2's plot areas at the band
   centres — reaching `plotShare · A`, `plotShare` volume 1's `hood.constants.sky.plotShare` (V01 §3.14; its default the
   base's dense-core share, §4.2 S2), the one share the island's district count divides by, so an edit of it moves the
   fill and the count together (J-V5.45); the carried households reaching `fill.householdCapDistricts` × `H_d`, `H_d` the
   town's households ÷ its district count after S6; or the band's demand exhausted, when the next band is taken only if
   the batch would leave the carried plot land within the recomputed `plotShare · A`. `A` falls as poorer households
   join, so the fill converges (II.6 (5)).
3. **What goes up with them — the carried workplaces, read through `IslandRule.carry`** (J-V5.32, J-V5.39, J-V5.51; §4.5
   S7b (5), item 308). For each workplace or institution class demanded at the carried bands, the carried households'
   share of their band's households × its count, by largest remainder, except:
   (a) **never carried** — the `IslandInstitution` tags (their own slots); the town-unique classes (§10.2's `unique`
   column: the principal market, the castle, the government's seat); every class whose balance profile (item 107 (a)) is
   in `carry.never.balance` — the heavy processors (mill, tannery, smelter, brewery, dyer) and wholesale and storage,
   which belong by the gates and quays; every class whose siting profile (item 103 (a)) emits one of
   `carry.never.emitsTopStep` at the profile scale's top step, since nothing on an island can lie downwind or downstream
   of its homes; every class with a hard NEEDS row naming a `carry.never.hardNeeds` feature — the conjured river and the
   spring pond satisfy no NEEDS row (V05 §3.20 (1)); and every resource or processing node of an active chain — a custom
   chain (item 104 (b)) or one of the dossier's `activeChains[]` with its processors resolved by kind family (item 105
   (i); V08) — the island institution of V05 §3.4 excepted. Their demand stays on the ground, where the chain keeps its
   working steps together (V05 §3.20 (9)).
   (b) **carried by share** — every class (a) does not exclude: the everyday services and the town-wide specialists of
   `carry.share.balance` above all, a chain's final seller and its consumers among them.
   (c) **split across the arenas** — a class whose row declares `split` (item 105 (h)) and whose works (a) excludes (a
   butcher's slaughterhouse emits at the top step; a brewer's brewhouse is a heavy processor): with `carry.share.splitShop`
   on, its **shop** may go up by the share while its **works** stays on the ground — one item on two plots on two arenas,
   the shop's building carrying a `Use` whose `branchOf` names the works' use (J-V5.51). Item 105 (h)'s split threshold
   is read with the route distance (V05 §3.20 (1)) between the island's demand and the works' ground site; below it the
   class stays whole on the ground. Every split is reported; off in the parity presets, as the islands are.
   (d) **collective members** (item 108 (b), (c)) — a member `#k` of a COUNT, GUILD or QUARTER record carried by the
   share keeps its record and its key; the record's range check (T73-4) counts its members on both arenas together; a
   lesser a greater subsumes is carried as that greater's member, never as an addition.
   **Coverage** (item 103 (f); J-V5.37). For a class with a coverage row, the island counts as **k units** for a row
   counted by district or neighbourhood — k its district count, `skyDistrictCount(plotLandM2, districtHa)` (V01 §3.16),
   computed here from the allocation's plot land by the same call the unit runner makes — **one unit** for a row counted
   by walking radius (the route to the ground passes every walking radius, V05 §3.20 (3)), and **⌈its carried
   households ÷ N⌉ units** for a row counted by N households. The proportional share above stands, and the island's units
   then join S7b (1)'s coverage step as candidate units beside the ground's districts (§4.5, item 308), which may add an
   instance of the class to this allocation from the demand it distributes — never remove one — unless the add would
   carry the plot land past `fill.coverageOvershoot` × `plotShare · A`, when that unit is skipped for that class
   (reported). Inside the island, the unit run's S10b spreads a coverage class over its districts and spaces its members
   by item 107 (d)'s same-kind row, as on the ground (V05 §3.20 (12)).
4. If `A` < `minAreaHa`, the slot closes (reported) and its rows return to the demand.
5. The island's district count and its partition are volume 1's (V01 §3.10.3 (2), read with `districtHa`); this volume
   counts none (J-V5.28).
6. One `Allocation` (level `district`, target the island's sky pseudo-district) holds the rows; `S_carried` and `A` are
   written to the slot's record-to-be.

**An institution slot.** Its row's instance (V05 §3.4 (2)) with `claim` set once SKY makes the claim (V05 §3.10 (5)),
plus `staffHouseholds` households of the requirement band; `A` = min(the law's `A`, `institutionFit.areaCapShare` × the
row's `areaHa`) — a compact island, its surround the unit run's gardens, close or yard; its claim's face is typed by the
row's `districtKind` (V01 §3.10.3 (2), V05 §3.12). Then, in order:
1. **A greater goes up alone** (item 108 (c); J-V5.57). A greater that subsumes lessers — a cathedral over the parish
   church, the resident priest and the wayside shrine — takes only its own building up. Its lessers stay separate
   buildings, members of its collective each keeping its `#k`: on the ground by their own rules, and on an island only by
   a prosperity slot's share; each counts once, never as an addition.
2. **The ground reservation's hand-over** (J-V5.46; §4.2 S3 (2), (8), item 286). Where the instance holds an S3
   reservation — the temple or cathedral precinct (§4.2 S3 (2)), or the reservation a palace takes by the castle's siting
   rules (V11's `palace` row) — the reservation stays exactly as it is (no L1 change) and passes to the row's
   `handover`: the first of its `tags` the roster demands on the ground, its largest instance (V05 §2.4), which S10b
   places into it as its claim (the reservation's `owner` becomes that instance and its `handedFrom` the institution that
   went up); a reservation sized for the greater keeps its size, the surplus becoming the incoming instance's churchyard,
   close or garden by its template's yard rows (§4.9). With no such tag demanded, `else`: `park` — the reservation
   re-typed `park`, owner `commons`, laid out by S12b as the old palace gardens or the old close's green — or `none`. An
   institution the creation prefix sends up (a T5 `sky` declaration of its kind, a T6 `criteria.sky` assignment) leaves
   nothing to hand over: S3 never reserves it. After generation — a T6 assignment or an epoch's `raiseIsland` taking a
   ground institution up — its vacated building steps down the base's ladder as any vacated building does, and the
   regrowth-first order re-occupies it with the row's hand-over classes first. The report and the clerk name the
   hand-over ("the old cathedral close — now the mother church").
3. **Burial and the crypt** (item 109 (k) (2)–(3), J111; item 2; J-V5.43). The churchyard part the base gives every
   church and temple plot (§4.9's churchyard row) — the island cathedral's, and any church's a prosperity island
   carries — is a surface burial ground only: it is left out of item 109 (k) (3)'s catacomb candidates and out of its
   "largest cemetery" ranking (V04's candidate list skips every sky-arena face). Each church on an island still counts
   once toward the catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V04 §2.3), since the dossier's
   church records and the roster set that count wherever the churches stand. The island cathedral's crypt — always the
   settlement's largest (V11's crypt column, `always`) — is a vault cut into the island's rim slab under the cathedral
   (V05 §3.10 (5)): part of its building, never an `UndergroundSystem` part or an item 109 (j) (3b) link, and no catacomb
   grows beneath it. The ground church that takes the old close keeps its own crypt by the crypted-class rows and is
   never ranked above the cathedral's.

**The rest.** S7b (1) allocates the remainder to the ground's districts, so the population stays whole (II.6).

### 3.6 Shape (S7b (5), per open slot, in the island's local frame)

1. **Template.** A declaration's points form gives it (a lasso is the outline itself, one point a disc of area `A`, two
   to four corners the routine fitted to their hull); otherwise one weighted draw of `outline.templates` on
   `island.place` (the island's lineage, index `template`).
2. **Bearing.** The long axis takes the ground's principal river's bearing (its course from inlet to outfall) where the
   site has a river; otherwise a uniform bearing on `island.place` (index `bearing`).
3. **The routine.** §4.2 S1 (2)'s closed-outline routine on the template's base curve, with the rule's detail row and a
   uniform envelope (no town side), from `island.place` (index `outline`); the base curve's scale is set by one secant
   step so that the displaced outline's area is `A` within 1 %. F-OUTLINE's ladder applies (§5.2).
4. The outline's centroid is the local origin, and the arena's frame is sized from the outline now drawn (V05 §3.8 (1)).

### 3.7 Placement — where the island floats (S7b (5), per open slot, in slot order)

1. **The class raster.** A 64 m raster over the ground frame classes each cell: `water` (its centre in an L0 water face,
   an oasis included — item 111 (a): an oasis is water for every rule that reads water); `core` (in a district of growth
   stage 1); `outskirts` (in any other district); `fields` (land outside the settlement perimeter). It is built once per
   S7b from the ground plan that exists then (L0, L1, the districts, the perimeter).
2. **Candidates.** The centroids of a `latticeM` lattice over the frame whose translated outline lies inside the frame
   inset by `frameInsetM`, does not meet any placed island's projected outline dilated by `gapM`, and **can be reached**
   (J-V5.54): at least one of its rim's cells on the class raster lies on admissible ground (for a hoist or a stair) or
   within the horizontal run of an admitted slanted access row (`ropeway`, and `lightBridge` where the `magic`
   circumstance admits it) of admissible ground. Admissible ground is the raster's land cells outside water, reservations
   and wall strips, and outside every committed raised part's raised-way pier footprints, its deck's plan dilated by
   `accessSiting.deckGapM` and every deck face of item 110 (d) (a mole, a pier, a quay platform or a bridge deck that
   carries plots) — V05 §3.10 (3)'s admissible faces at the raster's cell (a cell is admissible when its centre is); the
   test reads one chamfer distance transform to it (integer, 3–4 weights on the 64 m cells), built once with the class
   raster (J-V5.60).
3. **The score** of a candidate, over the outline's cells on the class raster: (a) the mean class weight — the rule's
   `prefs`, with an institution row's `overWeights` over them, and with `core` at 1.0 when the island is placed by
   assignment or declaration — × 1.0; (b) proximity, − 0.5 × min(1, d ÷ `nearM`), `d` the distance from the outline to the
   settlement perimeter (0 over the town); (c) purpose, 0.5 × one term, by the target the island's row names: `near`
   gives 1 − min(1, d ÷ the row's `nearM`) to the target, `far` gives min(1, d ÷ the row's `nearM`) from it. The targets:
   `plaza` the main plaza; `precinct` the precinct S3 reserved, else the plaza (it is then the hand-over church's close,
   V05 §3.5); `richest` the ground district of highest prosperity mean (ties by district address). A prosperity island
   reads `near: 'richest'` with the rule's `placement.nearM`; an institution island reads its row's `near` or `far`
   (V05 §2.4: the palace near the plaza, the cathedral near the precinct, the prison and the tower far from the plaza),
   and a row with neither takes no purpose term.
4. **The draw.** The `topK` best (ties by lattice y, then x), then one draw weighted by score − min score + 0.01 on
   `island.place` (index `place`). The chosen centroid is `anchor`; `placement.over` is the class of largest share under
   the outline (ties in the order water, fields, outskirts, core); `byAssignment` is set for a forced slot.
5. **F-SKY-PLACE** (V05 §3.17) when no candidate passes.
