
######## f item 202 (§1.1) — STAGED (the village product, V-M0 to V-M4; the port's consultation with the SettlementForge stage, SF0 to SF7).
**The village product's one registration** (SS-19; reconciliation round 1). **Consolidated.** The one registration is `ProductDecl` in `StrategyRegistry.products: Map<'base'|'village', ProductDecl>` (V07 §2.1's type; BCR-V7-11); `LadderRouter.route` reads it — a registered product's rung for a population inside that product's range, the base's clamp otherwise. The port asks `LadderRouter` whether a population lies in a registered product's range, at `creation` and at every `absorb`, and registers nothing itself: BCR-V8-9's `PortRungPath` and `registerRungPath` are dropped (withdrawn into this item). §1.1 *Requests at the ends of the ladder*: the routing sentence names the registration ("… to the village product registered in `StrategyRegistry.products` (§4.12; PART III)"); the refusal of a dossier below 1 500 (there and in §7.7 item 15) holds only while no village product is registered; with one registered, an absorb whose population is 0 routes to THORP and runs volume 7's desertion (V07 §3.12; an outcome, not a refusal), while a creation below 1 stays refused (BCR-V7-17); the product at an epoch is item 322's fold (§4.11). §1.1's sentence "A dossier's rung follows its population by these bands, at creation and at each epoch's target (§4.11), while its own tier word titles the map (§9.5)." reads "A dossier's rung follows its population by these bands at creation and, at each epoch's target, by §4.11's rung at an epoch (inside the hand-off band item 322 brings to §4.11 from volume 7 §2.1, the previous product's edge row), while its own tier word titles the map (§9.5)." (SR1-29; reconciliation round 2). §4.12: BCR-V7-11's pipeline-order sentence as written. PART III gains one line: "the product registers its `ProductDecl` in `StrategyRegistry.products` (§4.12); the port consults `LadderRouter` at creation and at every absorb; one document crosses the 1 500 boundary by item 322's fold"; and in PART III's last paragraph "waits for the village product's own port path, which registers its rung rows behind the same port (§14) rather than a second one" reads "waits for the village product's registration (its `ProductDecl`, §4.12), which the one port consults through `LadderRouter`" (SR1-29; reconciliation round 2). **The records hook** (seam-time-r5 TW-03 (3), seam-settlements-r5 SR5-15 (a); reconciliation round 6): `ProductDecl.records?` (V07 §2.1; an `EpochPlacement`, V6 §2.1, with its placement and, for a removed record, its removal) and its calls as BCR-V7-18 words them are hooks of this registration — at an epoch whose product (item 322's fold) declares it, the dossier step's (§4.11's order (e)) for each `assign` it places — a record it adds, a member a count step adds, or the greater a REPLACEMENT re-key places new (V08 §3.5.1 (c)'s second and third cases, (d)); a re-key whose greater keeps the lesser's thing is a `rebind`, never offered (seam-time-r6 TX-06) — and for the records it removes; and for an absorb without an epoch at a rung of that product, the placement of each record it adds and the removal call after each it removes — and so are, before volume 6 lands, the product's two phase overrides (`siting`, `growth`), which `grow-by-stage` consults, and its participants — all at **the call points** this item adds to the grow path's order in §4.11 (a)–(j), at the places V6 §3.2's table gives the same steps, so volume 6's runner reproduces them (T-V6-1): the `siting` override in place of step (f)'s placement and the `growth` override in place of step (g)'s; the records placement's `place` inside step (e) before each added record's *One path* placement and its `remove` after each §7.7 item 2 removal; the participants registered at `afterField` after step (a) and before (b), at `decline` at the end of (c), and at `afterGrowth` after (g) and before (h), each in (order, id) order, each run's ops one batch of the `epoch` event. They are called with volume 6's `ProductEpochContext` (V6 §2.1: doc, epoch, seq, week, prevWeek, years, inputs, tables, product, rung, productRows?, stream(stage, entity), scope()), which the grow path fills and which lands with this item beside `EpochPhase`, `EpochParticipant`, `EpochPlacement` and `ProductDeclEpoch`; the placement takes the five-member pick (doc, tables, product, rung, week) an absorb fills; volume 6's `EpochContext` extends it at M6-E (seam-time-r6 TX-02; finalization). Volume 4's own M4 hooks stay BCR-6's sentences at their fixed places. They land with this registration on M4's grow path (V07 §8's V-M2 row; TW-03 (1), (2)), and BCR-V6-1 (a) carries them into its phase interface at M6-E (item 317). The absorb-path placement call is inserted in §7.7's *One path — placement, then mutation* sentence "every `assign` event … is placed by §4.7 S10b's one solver for its scope": at a rung of a product that declares `ProductDecl.records`, an added record is first offered to that placement, which places it or declines it, and a declined record takes S10b's placement as that sentence gives it. The requests' "§7.7 item 2's placement" means this sentence; §7.7's item 2 is *Existence* and places nothing, and its removal of a record (through `closeUse`) is what the removal call follows. *Requests:* BCR-V7-11, BCR-V8-9, BCR-V7-17, BCR-V7-18 (its `records` member and calls, and its grow-path overrides and participants; its phases in the phase interface with item 317). Also touches: §4.11 (the dossier step's call; the grow path's call points), §4.12, §7.7, PART III. *Needed by:* V06, V07, V08. **STAGED (the village product, V-M0 to V-M4; the port's consultation with the SettlementForge stage, SF0 to SF7).**

--- V06 BCR-V6-1 (lines [3646])
**BCR-V6-1 — the phase-based `EvolutionStrategy` and its package.**
(a) Heading `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)`.
Current: "interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs, tables: TableView, rng: Stream):
KernelResult<(ConversionOp | EditEvent)[]> }   // registered by name (§4.12)". New: the interfaces of V6 §2.1 —
`EvolutionStrategy { id; phases: EpochPhase[] }`, `EpochPhase { step; stage; run(ctx) }`, `EpochParticipant`,
`EpochContext`, `EpochOps` (with `displaced` and `demandTaken`), `HouseholdLedger`, `EpochScope` (with `raised` and
`levelled`), `ChurnLedger`, with `EpochStep`'s twenty steps in V6 §3.2's order — and the sentences: "The epoch runner (in `@plat/edit`'s fold) runs, for
each step in order, the phase for that step — the override the epoch's product declares in `ProductDecl.phases` (the product
the fold of V07 §2.1 gives at the epoch, BCR-V7-26, applied before this request), else the strategy's; **a step for which neither registers a phase runs nothing** — and then every
participant registered at that step (the product's included), at every epoch whatever its product — a participant scoped
to a product, a rung or a state returns no ops outside it (V6 §2.1; TW-08) — in (order, id) order, committing each one's ops in the order
given as single-level batches of the one `epoch` event. `'grow-by-stage'` registers the phases `prelude`, `demand`,
`field` (without the building mask), `dossier`, `siting`, `growth`, `lapse`, `character` and `works` — the base's steps
before S2, S2, (a), (e), (f), (g), (h), (i) and (j), built once in `@plat/edit` and reused by any strategy — and reproduces
the path above byte for byte." The epoch's order (a)–(j) gains the steps `prelude`, `hazards`, `fortification`,
`terrainWater`, `raisedWays`, `close` and the participant steps at the places V6 §3.2's table gives. **§1.1's `ProductDecl`** gains
`phases?: Partial<Record<'siting'|'growth', string>>` (registered `EpochPhase` ids), `participants?: string[]` and
`rows?: TableId` — the product's epoch rows, typed `ProductEpochRows`, read by the decline and hinterland steps (V6
§2.1's `ProductDeclEpoch`; ST-26) — and `records?: string`, an `EpochPlacement` id (V6 §2.1): at an epoch whose product
declares it, the dossier step (e) calls its `place` for each `assign` it places — a record it adds, a member a count step adds, or the greater a REPLACEMENT re-key places new (V08 §3.5.1 (c)'s second and third cases, (d)); a re-key whose greater keeps the lesser's thing is a `rebind`, never offered (seam TX-06) — before
the placement of the record by §7.7's *One path* sentence ("every `assign` event … is placed by §4.7 S10b's one solver
for its scope"), a record `place` declines taking that placement, and its `remove` after §7.7 item 2's removal
(`closeUse`) of each record it removes; an absorb without an epoch at a rung of that product calls them the same way, the
*One path* placement of an added record offering it first to `place` and §7.7 item 2's removal calling `remove` after;
the placement draws and mints keyed by the dossier event's `seq`, epoch component 0, as a post-build placement (§6.1,
§6.3; §7.7 item 6) (TV-02, TW-01, TW-02; volume 7's `village.records`, V07 §3.12, J-V7.128 – J-V7.130); the member and
its calls, with the two phase overrides on `grow-by-stage`, land with the product's registration (file f item 202) on
M4's grow path, this request carrying them into the phase interface at M6-E (TW-03; V07 BCR-V7-18) — this absorbs volume 7's BCR-V7-18, whose mechanism is the same: at a village rung the runner
takes the village's `siting` and `growth` phases, and the village's participants, run at every epoch, act where their own
scopes admit (`village.plan` and `village.pins` at a village rung, `village.density` while a superseded `VillagePlan`
exists; V6 §3.2; TW-08).
(b) Heading `## §14 Package and module layout, key interfaces, dependency rules, extension points`. Current (the line
after which to insert): "@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and
schedules, calendar, factions, events, economy,". New line before it: "@plat/evolve   the owner-staged evolution engine
(volume 6): the `'history'` EvolutionStrategy, its phases, the history index, store and frames; depends on @plat/layout,
@plat/plots, @plat/content, @plat/edit's operators; registers into `StrategyRegistry.evolution`; the participants of
@plat/sky, @plat/under and @plat/hood register there too".
--- V07 BCR-V7-11 (lines [3678])
**BCR-V7-11 — products in the registry.** Heading as BCR-V7-10. Current: "interface StrategyRegistry { terrain:
Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>;". New: the registry gains
`products: Map<'base'|'village', ProductDecl>` (V07 §2.1's type); `LadderRouter.route` returns a registered product's
rung for its range and the base's clamp otherwise. And `### 4.12 The strategy interface, stage registration by declared
I/O, and the stage-2 seam (pointer)`, current: "The pipeline order is the topological order of the registered
`StageDecl`s (§4.1), so a product may add a stage by"; new: "The pipeline order is the topological order of the routed
product's stage set (`ProductDecl.stages`, the base's own set for `base`), so a product may add a stage by" (the rest
unchanged).
--- V07 BCR-V7-17 (lines [3712])
**BCR-V7-17 — the village's range at the port** (merged into file f item 202). Heading as BCR-V7-1, *Requests at the ends of the ladder*. Current: "A
request below 1 500 inhabitants is routed by `LadderRouter.route(population)". **Merged into file f item 202**
(SS-19; reconciliation round 1), the one registration: the village package registers its `ProductDecl` (range `[1, 1 500)`)
at load, the port consulting `LadderRouter` (with §4.11's
sentence changed by BCR-V7-26); at an absorb a
population of 0 routes to THORP and runs V07 §3.12's desertion (an outcome, J-V7.2), while a creation below 1 stays
refused. Nothing else in the port changes.
--- V07 BCR-V7-18 (lines [3720])
**BCR-V7-18 — a product's epoch phases.** `### 4.11 Incremental mode, transformations and conversions (the evolution
hook; one path built in the base)`. Current: "interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs,
tables: TableView, rng: Stream): KernelResult<(ConversionOp | EditEvent)[]> }". Rides on V06's BCR-V6-1 (the phase-based
strategy): mechanism to add — for each `EpochStep`, the runner takes the phase registered in `ProductDecl.phases` by the
product the epoch's fold gives (BCR-V7-26; file f item 322), else the engine's; `ProductDecl.participants` register as every
participant does. Without V06, `grow-by-stage` consults the same two overrides (`siting`, `growth`), its dossier step (e)
calls the product's records placement as below, and the village's participants `village.plan`, `village.density` and
`village.pins` run on M4's grow path at the call points file f item 202 adds to the grow path's order in base §4.11 — at the places V6 §3.2's table gives the same steps, so V06's runner reproduces them (T-V6-1): the `siting` override in place of step (f)'s placement and the `growth` override in place of step (g)'s; `place` inside step (e) before each added record's *One path* placement and `remove` after each §7.7 item 2 removal; the participants registered at `afterField` after step (a) and before (b), at `decline` at the end of (c), at `afterGrowth` after (g) and before (h), each in (order, id) order, each run's ops one batch of the `epoch` event, all called with the `ProductEpochContext` the grow path fills (V6 §2.1; seam TX-02), each returning no ops outside its scope (reconciliation round 6, TW-03; finalization, TX-02). The village's phases are V07 §3.12. File f item 317 absorbs this
request into BCR-V6-1 (volume 6's `ProductDeclEpoch`), so the fold's product, not the target's rung, chooses the phases
there too (reconciliation round 2, TR-01). **Reconciliation rounds 5 and 6 (TV-02; TW-01 – TW-03, SR5-02; J-V7.125,
J-V7.128 – J-V7.132):** the mechanism adds `ProductDecl.records?: string` — the product's placement of a dossier record
(an `EpochPlacement`, V07 §2.1, typed in V6 §2.1 with `place(ctx, record, event)` and `remove?(ctx, record, event)`,
`event.seq` the adding or removing dossier event's) — and the sentences: at an epoch whose product (the fold's) declares
it, the dossier step (the epoch's order's (e)) calls `place` for each record it adds, member a count step adds, or greater a REPLACEMENT re-key places new (V08 §3.5.1 (c)'s second and third cases, (d)) — a re-key whose greater keeps the lesser's thing being a `rebind`, never offered (seam TX-06) —
in binding-key order, before the placement of that record by §7.7's *One path* sentence ("every `assign` event … is
placed by §4.7 S10b's one solver for its scope"), and `remove` after §7.7 item 2's removal (`closeUse`) of each record it
removes; the placement places the record or declines it, and a declined record takes the *One path* placement. On an
absorb without an epoch at a rung of that product, the *One path* placement of a record the absorb adds offers it first
to `place`, and §7.7 item 2's removal of a record it removes calls `remove` after, with a context holding the document,
the tables, the product, the rung and the absorb's week (J-V7.128). On both paths the placement draws and mints as a
post-build placement does, keyed by `event.seq` with epoch component 0 (§6.1, §6.3; §7.7 item 6, J-A22.76; J-V7.129).
**Where it lands** (TW-03; J-V7.132): `ProductDecl.records`, both calls on both paths, the two phase overrides and the
participants' run on `grow-by-stage` are hooks of the product's registration and land with file f item 202 (the village
product, V-M0 to V-M4) on M4's grow path; BCR-V6-1 carries them into its phase interface at M6-E (file f item 317, whose
note says so). Round 5's "§7.7 item 2's placement" named the placement by the wrong item — item 2 is *Existence* and
places nothing; the placement is the *One path* sentence (seam-settlements-r5 SR5-15 (a)) — and item 2 stays the removal's
pointer.
--- V08 BCR-V8-9 (lines [3000])
**BCR-V8-9 — the village product's port path.** **WITHDRAWN** (SS-19, SS-28; reconciliation round 1) in favour of
file f item 202, the one registration: the village product registers its `ProductDecl` in `StrategyRegistry.products`
(BCR-V7-11), `LadderRouter` reads it, and the port consults `LadderRouter` at `creation` and at every `absorb` and
registers nothing; `PortRungPath` and `registerRungPath` are dropped, and the first version's mechanism and PART III line
are not applied (item 202 states the PART III line).

######## f item 203 (§2.2) — STAGED (M6-sky).
BCR-V5-2 (V05 §10) — the sky arena's key, levels and roles; the part counter. Also touches: §6.3, §2.9. *Needed by:* V05. **STAGED (M6-sky).**

--- V05 BCR-V5-2 (lines [2846])
**BCR-V5-2 — the sky arena's key, levels and roles; the part counter.** Heading: `### 2.2 The plat — one arena per
layer, five refinement levels as views, roles instead of stored indices`. Current (the `PlatKey` comment): "sky parts 1–3
= one arena per sky island (§4.2, II.1)". New: "sky parts ≥ 1 = one arena per sky island, each allocated once from
`Document.nextSkyPart` at the island's creation and never reused (the island's count-law slot is `SkyIsland.slot`)". In
rule 1, after the paragraph **The underground layer's further parts**, add: "**The sky layer's levels (V05).** A sky
island's part takes the same five views in its own local frame: **L0** the arena's outer ring (`margin` on its
`Terrain`), the **rim** — one closed structural chain carrying the `rim` role on the island — the **void** face (L0 kind
`sky`) between them and the **land** face inside the rim, and its water faces; **L1** its ways, district boundaries, the
rim strip's `setback` line and its landing and institution claims; **L2–L4** as the ground's." In rule 7 add the edge
role `rim` (structural) and the vertex role `sky_access`. Heading `### 6.3 Identity: address ids, lineage keys, carry-over
(and the scope of stability, stated)`, current "the island's slot on the sky layer" → new "the island's part on the sky
layer". Heading `### 2.9 The document and serialisation`, `interface Document`: after `nextUndergroundPart` add
"`nextSkyPart: number; // V05: the part the next sky island takes (1 at creation); never decreases, as nextSeq — a fallen
or undone island's number stays spent; the island's address records it`".

######## f item 204 (§2.2) — STAGED (M6-sky).
BCR-V5-24 (V05 §10) — the void face at L0 (C5-44). *Needed by:* V05. **STAGED (M6-sky).**

--- V05 BCR-V5-24 (lines [3186])
**BCR-V5-24 — the void face at L0 (C5-44).** Heading: `### 2.2 The plat — one arena per layer, five refinement levels
as views, roles instead of stored indices`, rule 1. Current: "**L0** faces: land components, sea, lakes, river reaches,
islets, ponds, moats — land and water only." New: the same, then "On a sky island's arena the face between its outer
ring and its rim is the **void** (L0 kind `sky`, V05 §3.8): no land, no water, never cut or plotted — the one L0 face
that is neither."

######## f item 205 (§2.3) — STAGED (M6-U, the underground layer).
V04 BCR-1 (V04 §10) — the outfall type and its producer. Also touches: §4.2. *Needed by:* V04. **STAGED (M6-U, the underground layer).**

--- V04 BCR-1 (lines [3003])
**BCR-1 — the outfall type and its producer.**
* `### 2.3 Terrain and water` — current: "flowAccum: Uint32Array /* on `hydro` */; outfalls: Outfall[];" — new: the same
  line with the comment `/* S1 (3)'s drainage outlets (§4.2): one per bank stretch of outfallStretchM (50 m) of each water
  body into which D8 flow from land enters, and per 50 m of frame edge the flow leaves by — the one of largest accumulation
  per stretch; read by the network stage (II.7.2) */`, and after `interface HydroGrid …` the declarations of
  `OutfallInto` and `Outfall` exactly as V4 §2.2 gives them.
* `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace` —
  current: "(9) Drainage stays queryable." — new: "(9) Drainage stays queryable, and S1 writes `Terrain.outfalls` (§2.3):
  per water body, each 50 m bank stretch into which D8 flow from land enters, and each 50 m of frame edge the flow leaves
  by, as one `Outfall` at its cell of largest accumulation; recomputed by S1's water operator after a water edit (§7.3 (b))."

######## f item 206 (§2.3) — STAGED (M6-E, the evolution engine).
BCR-V6-6 (V06 §10) — the oxbow. *Needed by:* V06. **STAGED (M6-E, the evolution engine).**

--- V06 BCR-V6-6 (lines [3723])
**BCR-V6-6 — the oxbow.** (a) Heading `### 2.3 Terrain and water`. Current: "interface WaterBody { id: Id; kind:
'sea'|'lake'|'river'|'tributary'|'distributary'|'islet_channel'|'pond'|'moat'|'estuary'|'harbour_basin'|'canal'|'ditch'".
New: the kind union gains `'oxbow'` — a still body cut off from a river, with `cutFrom: Id` (the river) and `epoch`. (b)
Heading as BCR-V6-1 (a). Current: "| { op: 'shiftCourse'; water: Id; from: number; to: number /* control-knot ordinals
(§2.3): the reach between them re-traced — a meander cut-off or an avulsion */ }". Mechanism to add: a cut-off's
abandoned loop becomes an `oxbow` water body minted in the same op (the river's lineage, the op's epoch, index 0); an
avulsion's abandoned channel becomes a `marsh` `LandUse` face; `siltReach` on an `oxbow` shrinks its shore by the row's
share and, below 0.1 ha, removes the water face and types the land `marsh` (volume 6 §3.12).

######## f item 207 (§2.4) — BASE (M1) for (b), `HoodPlace` declared with its registry row; BASE (M2b) for (a), `slopeP95` and the way-surface rule (volume 1 §8.1).
V01 BCR-6 (V01 §10) — a way's `surface` derived at S10a's end; `slopeP95` always present; `HoodPlace` in §2.7 and the entity registry. Also touches: §2.7. *Note:* Applied after item 208 and before item 209 (SL-18): its (a) `slopeP95` text is written on the `Way` line as item 208 leaves it (without `flowToward`), its comment's last clause reading "volume 1's stepped rule reads it (V1-3.6; the sewer reads `wayFall`, V04 BCR-2)" in place of "the sewer hook and volume 1's stepped rule read it (V1-3.6)". The order is the text's, not the build's: item 208's `flowToward` is built at M6-U and absent before it. *Build (SCC-R3C-5; reconciliation round 4, continuation):* as volume 1 §8.1 schedules it — (b), `interface HoodPlace` in §2.7 with its entity-registry row and no producer before M5, at M1 with the schema; (a), `slopeP95` written by S9 for every way and the `surface` comment with the way-surface rule (V1-3.7.3) run at S10a's end after field pass 2 (items 280 and 300 place it), at M2b, since the close-up bands of `lit` and `ink` draw surfaces from M2b — so the M4 goldens hold both (T-V1-4). *Needed by:* V01, V04. **BASE (M1) for (b), `HoodPlace` declared with its registry row; BASE (M2b) for (a), `slopeP95` and the way-surface rule (volume 1 §8.1).**

--- V01 BCR-6 (lines [3386])
**BCR-6 — `### 2.4 Ways (the skeleton) and typed edges` and `### 2.7 Walls, gates, towers, castle, bridges; greenery, land
use, decorations, pins; labels; content entities; the staged layers' records`.** (a) Current "`surface:
'paved'|'cobble'|'dirt'|'planks';`" → "`surface: 'paved'|'cobble'|'dirt'|'planks' /* derived at S10a's end by volume 1's
rule unless edited (V1-3.7.3) */;`"; current "`slopeP95?: number;`" → "`slopeP95: number /* written by S9 for every way from
the unlevelled terrain along its spine — S10 and S11's levelling (item 110 (a)) never rewrites it; a terrain stroke re-samples it (§7.3): volume 1's stepped rule reads it (V1-3.6; the sewer reads `wayFall`, V04 BCR-2) */;`", written on the
`Way` line as V04 BCR-2 leaves it (file f item 208 applied before item 207; SL-18). (b) §2.7: after `Pin`,
add V1-2.2's `interface HoodPlace` in the entity registry (§2.8).
--- V04 BCR-2 (lines [3014])
**BCR-2 — `flowToward` derived; junctions on the underground.** `### 2.4 Ways (the skeleton) and typed edges` — current:
"slopeP95?: number; flowToward?: 'from'|'to' /* sewer hook: drainage direction along the way */; corridor?: FaceRef /* L2 view */; lifecycle: Lifecycle }"
and "interface Junction { id: Id; vertex: VertexRef /* ('junction', id) */; arms: Id[]; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square'; wedges?: FaceRef /* L2 view */ }"
— new: the `Way` line without `flowToward`, and after the interfaces: "`wayFall(way)` — the drainage direction along a
way, a reading, never stored: the terrain sampler's height at the spine's `from` end less that at its `to` end, beyond
`NetworkRule.levelCm` (10 cm) either way, gives `'to'` or `'from'`, else `'level'` (II.7.2); a stored `flowToward` in an
older document is dropped on load (§7.5)"; and `interface Junction { id: Id; vertex: VertexRef /* ('junction', id) */; arms: Id[] /* ways; on an underground part the tunnels or galleries meeting there (V4) */; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square'; wedges?: FaceRef /* L2 view */; chamber?: true /* underground: a navigable junction wedge drawn and used as a sewer chamber (II.7.2) */ }`.

######## f item 208 (§2.4) — STAGED (M6-U, the underground layer).
V04 BCR-2 (V04 §10) — `flowToward` derived; junctions on the underground. *Note:* Applied first of the three items on the `Way` line (SL-18): before item 207 (V01 BCR-6 (a), whose `slopeP95` text is written on the line as this item leaves it) and before item 209 (BCR-V6-5 (b)), which then inserts `formerClass` into the line without `flowToward`. After items 208, 207 and 209 the line reads `slopeP95: number /* item 207's comment */; corridor?: FaceRef /* L2 view */; formerClass?: WayClass /* BCR-V6-5 (b)'s comment */; lifecycle: Lifecycle }`. *Needed by:* V04. **STAGED (M6-U, the underground layer).**

--- V06 BCR-V6-5 (lines [3711])
**BCR-V6-5 — the engine's new conversion kinds and `Way.formerClass`.** (a) Heading as BCR-V6-1 (a). Current: "| LadderOp |
DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity;". New: "| LadderOp | DeclineOp |
UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity | EvolveOp;" with `EvolveOp` as V6 §2.8 states
it (`absorbWall`, `downgradeWay`, `upgradeWay`, `burn`, `repairWall`, `retypeLand`, `repairRaised`, `repairRetaining`), each usable by hand through
`convert` (§7.1) with an undo record (§7.4) and a lifecycle cause `convert:<op>`; a hand repair of stone that is gone —
a dismantled wall stretch, a dismantled span or cleared support, a ruined retaining stretch — bends (item 101 R2,
J-VI.4) to a new stretch or part drawn on its line, the dry run naming the bend (ST-35, ST-10). (b) Heading `### 2.4 Ways (the skeleton)
and typed edges`. Current (the `Way` record's last line): "slopeP95?: number; flowToward?: 'from'|'to' /* sewer hook:
drainage direction along the way */; corridor?: FaceRef /* L2 view */; lifecycle: Lifecycle }". New: insert before
`lifecycle` "formerClass?: WayClass /* written by downgradeWay and by volume 5's landfall when it drops a covered way to
track; cleared by upgradeWay, the landfall clearance (volume 6 §3.5.2) or a setAttr of class (§4.11) */".
[V01 BCR-6: printed above]
[V04 BCR-2: printed above]

######## f item 209 (§2.4) — STAGED (M6-E, the evolution engine; the land retype also with the village product, V-M0 to V-M4, whichever lands first; `repairRetaining` with the earlier of M6-sky and M6-E).
BCR-V6-5 (V06 §10) — the engine's new conversion kinds and `Way.formerClass`, **with BCR-V7-22 absorbed** (ST-25; reconciliation round 1). The land retype is one op: `EvolveOp`'s `{ op: 'retypeLand'; landUse: Id; to: LandUse['kind']; crop?: string; rotation?: { scheme: string; slot: number } }` — volume 6's name and fields with volume 7's two optional fields — serving the hinterland's fallow ladder and its reversal (V06 §3.5.3) and the village's furlongs to pasture (V07 §3.12); one hand form (T2 `ground`'s land-use chip on a `LandUse` face; volume 7's T9 line re-pointed to it), one undo record and one §7.4 lifecycle row (cause `convert:retypeLand`); BCR-V7-22's separate `ConversionOp` member is not added. *Note:* Its (b) inserts into the `Way` line as items 208 and 207 leave it (SL-18). `repairRaised` among its `EvolveOp`s is BASE at M3a with item 110 (b) (volume 6's X13); `repairRetaining` lands with the earlier of M6-sky and M6-E, since volume 5's landfall (M6-sky) can decay a retaining stretch before the engine's pool does, as `repairRaised` restores a span from M3a (TR-23 (c); reconciliation round 2). *Requests:* BCR-V6-5, BCR-V7-22. *Needed by:* V06, V07. **STAGED (M6-E, the evolution engine; the land retype also with the village product, V-M0 to V-M4, whichever lands first; `repairRetaining` with the earlier of M6-sky and M6-E).**

[V06 BCR-V6-5: printed above]
--- V07 BCR-V7-22 (lines [3772])
**BCR-V7-22 — the land-use retype.** Heading as BCR-V7-18. Current, in `ConversionOp`, the members
"| { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }". **Absorbed into file f item 209** (ST-25; reconciliation round 1): no new member; volume 6's `EvolveOp` member
`{ op: 'retypeLand'; landUse: Id; to: LandUse['kind']; crop?: string; rotation?: { scheme: string; slot: number } }` carries this
volume's fields, with one undo record (§7.4) and one hand form, T2 `ground`'s land-use chip (V07 §3.12, V07 §4.1).

######## f item 210 (§2.5) — BASE (M1) for (a)'s `content` and `overrides?`, (b) and (d)'s first row; STAGED (M5, stage 2) for the rest.
V01 BCR-5 (V01 §10) — `Block` gains `content`, `squareType`, `ringCentre`, `voidCorner`; `boundary` a derived view; migration rows. *Note:* Co-applies with BCR-V7-14 (the `District.fabric` comment and `fabricParams.depthRatio`). *Build (SCC-R3C-5; reconciliation round 4, continuation):* as volume 1 §8.1 schedules it — at M1, with the schema, (a)'s `content` (always `ordinary` before M5) and `overrides?`, (b)'s `boundary` comment (a derived view over seams, never serialised, which II.5's readiness reads) and (d)'s first migration row (a block without `content` reads `ordinary`); at M5 (a)'s `squareType?`, `ringCentre?` and `voidCorner?`, (c), (d)'s second row (a stored square type `market` reads `trading`) and (e). *Needed by:* V01. **BASE (M1) for (a)'s `content` and `overrides?`, (b) and (d)'s first row; STAGED (M5, stage 2) for the rest.**

--- V07 BCR-V7-14 (lines [3696])
**BCR-V7-14 — the depth ratio as a fabric parameter.** Heading as BCR-V7-4. Current: "fabric: FabricStrategyId /*
'bent-cut' in the base; ring / square / street at stage 2 */; fabricParams: Record<string, number>;". Mechanism: S11's
footprint templates for the `detached` and `hovel` arrangements read `District.fabricParams.depthRatio` when present as
the footprint's depth-to-width ratio (V07 §3.2 (5)); absent, the template's own.
--- V01 BCR-5 (lines [3375])
**BCR-5 — `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context
vector`.** (a) Current "`interface Block { id: Id; face: FaceRef /* L2 built block(s) */; district: Id; subDistrict?: Id;
frontages: Frontage[]; depthClass: string;`" — add V1-2.2's fields `content`, `squareType?`, `ringCentre?`, `voidCorner?`
and §2.7's uniform `overrides?` with their comments. (b) Current "`boundary: TypedBoundary;`" → "`boundary: TypedBoundary /* a
derived view over seams, never serialised (volume 1, V1-2.3) */;`". (c) Current "`stage: StageId /* S3, S7 (gate plazas) or
S7b */;`" → "`stage: StageId /* S3, S7 (gate plazas), S7b, or S8 (a template plaza or green plaza, volume 1 V1-3.4.5) */;`".
(d) §7.5's schema migration gains the rows: a block without `content` reads `ordinary`; a stored square type `market`
reads `trading`. (e) The `District.fabric` comment, current "`/* 'bent-cut' in the base; ring / square / street at stage 2
*/`", → "`/* a hood.templates row id (volume 1, V1-2.1): 'bent-cut' in the base and the parity presets; S7c or a declaration
sets any row at stage 2 */`" (V1C-39).

######## f item 211 (§2.5) — BASE (M3a, item 110 (V01 §8.1)).
V01 BCR-41 (V01 §10) — `District.terrace` (a declared terracing). *Needed by:* V01. **BASE (M3a, item 110 (V01 §8.1)).**

--- V01 BCR-41 (lines [3697])
**BCR-41 — `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context
vector` (a declared terracing; V1C-64 (1)).** Current: "`parent?: Id /* item 65: an undercity neighbourhood's surface
district, the one it shadows (II.7.5) */;`" New: that line, followed by "`terrace?: 'on'|'off' /* item 110 (a): a declared
terracing (volume 1, V1-2.2); absent: derived by terraceState (volume 1, V1-2.3), which §4.7 S10's district-edge source
reads; model data in the digest */;`". §14's `@plat/model` gains `TerraceState` and `terraceState` (BCR-1).

######## f item 212 (§2.5) — STAGED (M6-U, the underground layer).
V04 BCR-4 (V04 §10) — the undercity's core and the outskirts' writer. Also touches: §2.8. *Note:* Co-applies with V01 BCR-41 on the `District` record (`core?` and `terrace?`). *Needed by:* V04. **STAGED (M6-U, the underground layer).**

[V01 BCR-41: printed above]
--- V04 BCR-4 (lines [3031])
**BCR-4 — the undercity's core and the outskirts' writer.**
* `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector` —
  current: "parent?: Id /* item 65: an undercity neighbourhood's surface district, the one it shadows (II.7.5) */; outskirts?: Id[] /* item 65: an undercity neighbourhood's sewer-front blocks in part 0 (II.7.3) — a link across parts, never a second key (J-A65.31) */;"
  — new: the same, `outskirts`' comment ending "…(J-A65.31); written by the connection stage (II.7.6)", and
  `core?: Id /* item 65: an undercity neighbourhood's main chamber — its plaza and black market (II.7.5) */;` after it.
* `### 2.8 Identity, lifecycle, provenance, the entity registry` — current: "`parent` and `outskirts` (written by the
  undercity's stage)" — new: "`parent` and `core` (written by the undercity's stage) and `outskirts` (written by the
  connection stage)".

######## f item 213 (§2.5) — STAGED (M6-sky).
BCR-V5-6 (V05 §10) — the plot model's sky fields. Also touches: §10.2. *Needed by:* V01 (its S9b hook declares the keys, SLR1-03), V05, V11. **STAGED (M6-sky).**

--- V05 BCR-V5-6 (lines [2907])
**BCR-V5-6 — the plot model's sky fields.** Heading: `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL,
reservations, allocations and the context vector`. Current: "arena: 'ground'|'underground' /* item 12: …". New: "arena:
'ground'|'underground'|'sky' /* … 'sky' on an island's arena, its values read as V05 §3.11 states */". In `Allocation`'s
rows, current "areaM2?: number /* area-sized rows: edge orchards, sky capacity */ }[];" → new "areaM2?: number /*
area-sized rows: edge orchards, sky capacity */; at?: PointCm /* a positioned row: a sky landing's foot (V05 §3.10) */;
access?: Id /* its SkyAccess */ }[];" — the positioned `sky_landing` rows are SKY's writes under their own data key
`allocations.landing` (§4.1, BCR-V5-3), never a rewrite of a row S7b wrote, and S10a, which reads `allocations` and
`allocations.landing` together, takes each landing row's staff households (its class's) from the host district's `modest`
residential rows (V05 §3.10 (4)). In `Reservation.kind` add `'landing'` (a sky landing's yard, V05 §3.10; on the
ground, SKY's writes under the data key `reservations.landing`, BCR-V5-3); in
`Block.interior` add `'rim_strip'` (a sky island's unbuilt rim walk, V05 §3.10). In `### 10.2 Roster (data-driven,
replaceable; sequential and prefix-stable; our values)`, the district-kind rows gain `sky-island`, `sky-palace`, `sky-temple`, `sky-prison` and `sky-tower` (V05 §2.4:
keyed apart from every ground kind) and the class table gains `sky_landing` and `sky_landing_top` with the facts of V05
§2.4, `sky_landing` with a `front` column for a secret access's landing (their rows volume 11's).

######## f item 214 (§2.5) — STAGED (the village product, V-M0 to V-M4).
BCR-V7-4 (V07 §10) — the `village` district kind. *Needed by:* V07. **STAGED (the village product, V-M0 to V-M4).**

--- V07 BCR-V7-4 (lines [3633])
**BCR-V7-4 — the `village` district kind.** `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations,
allocations and the context vector`. Current, in `District.kind`'s list: "hinterland, underground (the owner-staged
layer's pseudo-district, II.7.3 — a pseudo-district like hinterland)". Mechanism to add: the data-defined kind list
gains `village` — "the village product's one district covering its settlement (PART III (4); V07 §3.7)" — and the
district-kind table gains its row: every village class's affinity 1, `fabric: 'village-ways'`, one quarter.

######## f item 215 (§2.5) — STAGED (the village product, V-M0 to V-M4).
BCR-V7-5 (V07 §10) — the green reservation. *Needed by:* V07. **STAGED (the village product, V-M0 to V-M4).**

--- V07 BCR-V7-5 (lines [3639])
**BCR-V7-5 — the green reservation.** Heading as BCR-V7-4. Current: "interface Reservation { id: Id; kind:
'castle'|'plaza'|'market'|'precinct'|'institution'|'park'|'harbour_basin'|'moat'|'canal';". New: the kind union gains
`'green'` — a village green, owner `commons`, its `Greenery` of kind `green` — which §4.2 S3 (12)'s market rule reads as
a plaza candidate at village rungs (V07 §3.6 (4)).

######## f item 216 (§2.6) — BASE (M1, fields carried so stage 3 needs no migration).
BCR-V2-01 (V02 §10) — wing roles and keys, from M1. *Needed by:* V01 (V1-5.1.3's stack ties by wing key; S23R1-18), V02, V03. **BASE (M1, fields carried so stage 3 needs no migration).**

--- V02 BCR-V2-01 (lines [3639])
**BCR-V2-01 — wing roles and keys, from M1.** `### 2.6 Buildings, heights and ground datum, wings, materials,
sub-locations, the stage-3 interface`. Current (the last line of `BaseWing`): "`  heights: Heights; roof: RoofSpec }`".
New: "`  heights: Heights; roof: RoofSpec; role: WingRole /* its part in the building's plan: main, range, cross, block,
back, service, tower, turret, gate, part, shelter — volume 2 §2.1; the base outline builder writes main (a rectangle, the
bar of an L or T), range (their other rectangle) or part (a template or axis-locked part) */; key: number /* a stable
ordinal in the building: written once when the wing is minted, never changed, never re-used after a removal
(Building.nextWingKey); edit paths and stage 3's per-wing streams name the wing by it */; arcade?: true /* stage 3: the
ground storey is an open arcade (volume 2 §2.1); the capacity function gives it no ground-storey rooms */ }`", with `type WingRole` declared
beside it as volume 2 §2.1 states it.

######## f item 217 (§2.6) — BASE (M1, fields carried so stage 3 needs no migration).
BCR-V2-02 (V02 §10) — the building's massing reference and next key. *Needed by:* V02. **BASE (M1, fields carried so stage 3 needs no migration).**

--- V02 BCR-V2-02 (lines [3649])
**BCR-V2-02 — the building's massing reference and next key.** Same heading. Current: "`  composition?: Composition /*
stage 3: lazily generated rung by rung`". New: insert before it "`  nextWingKey: number /* the next free wing key (BCR-V2-01)
*/; massing?: MassingRef /* stage 3 (volume 2 §2.1): the family, the composition row and grammar the massing read, and
the entrance hint; absent before stage 3 */;`".

######## f item 218 (§2.6) — STAGED (M6, stage 3).
BCR-V2-03 (V02 §10) — a composed wing names its base wing. *Needed by:* V02, V03. **STAGED (M6, stage 3).**

--- V02 BCR-V2-03 (lines [3654])
**BCR-V2-03 — a composed wing names its base wing.** Same heading. Current: "`interface Wing { footprint: Polygon /* the
wing's ground ring */; heights: Heights; roof: RoofSpec; dormers?: number`". New: "`interface Wing { base?: number /* the
key of the base wing it composes (volume 2 §2.2); when set, footprint, heights, roof and spans are that wing's, read at
read and never stored */; footprint: Polygon /* the wing's ground ring */; heights: Heights; roof: RoofSpec; dormerRows?:
DormerRow[] /* volume 2 §2.2 */; dormers?: number /* with dormerRows: derived, their counts' sum`" — the rest of the
comment unchanged.

######## f item 219 (§2.6) — STAGED (M6, stage 3).
BCR-V2-04 (V02 §10) — porch kinds. *Needed by:* V02, V03. **STAGED (M6, stage 3).**

--- V02 BCR-V2-04 (lines [3661])
**BCR-V2-04 — porch kinds.** Same heading. Current: "`interface Porch { side: number /* the side of its wing's footprint
ring that it stands on, by ring index */;`". New: insert after it "` kind?: 'hood'|'gabled'|'twoStorey'|'recessed'|'halfRound' /*
volume 2 §2.2 and volume 2 §3.7; absent: gabled */;`".

######## f item 220 (§2.6) — STAGED (M6, stage 3).
BCR-V2-05 (V02 §10) — composed towers name their tower wing; composition row and grammar. *Needed by:* V02. **STAGED (M6, stage 3).**

--- V02 BCR-V2-05 (lines [3665])
**BCR-V2-05 — composed towers name their tower wing; composition row and grammar.** Same heading. Current: "`interface
ComposedTower { centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }`". New: "`interface ComposedTower { base?:
number /* the key of the massing's tower or turret wing (volume 2 §2.2): its ring is that wing's ring, and centre (the
ring's area centroid), radiusCm, heights and roof are read from it — never stored, never carried on their own */; centre:
Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }`". And in `interface Composition`, after "`lod:
('outline'|'wings'|'rooms'|'plan')[]`" insert "`; row?: string; grammar?: string /* the composition.json row and version
(volume 2 §2.2) */`", with one sentence after the carry paragraph: "Under stage 3, `Composition.courts` is derived at
read from the footprint face's holes, and a composed wing or tower that names its base wing carries nothing of its own;
a stored composition's carried points are then its rooms' and its plan's."

######## f item 221 (§2.6) — STAGED (M6, stage 3).
BCR-V2-06 (V02 §10) — the path-shape rows become the massing family rows. *Needed by:* V02. **STAGED (M6, stage 3).**

--- V02 BCR-V2-06 (lines [3675])
**BCR-V2-06 — the path-shape rows become the massing family rows.** Same heading. Current: "`interface PathShapeRow {   //
item 59: stage 3's path-shape rows`". New: the interface is replaced by "`type PathShapeRow = MassingFamilyRow   // volume
2 §2.3: the massing family rows; item 59's five families keep their rows and their provenance (P21) under our own ids —
regularCourt, starCourt, chordArc, rectCourt, gridWalk — by the table-migration row below`"; the item-59 paragraph above it
stands, its family names read through that row. **The table-migration row** (§7.6's keyed row operations), applied before
M6 ships any document: the base's five item-59 family ids, in the order of `PathShapeRow.family`'s union, map one to
one onto `regularCourt`, `starCourt`, `chordArc`, `rectCourt` and `gridWalk`; the `family` union itself is re-typed as
`MassingFamilyId` (volume 2 §2.1); a document or table naming an old id is rewritten on load.

######## f item 222 (§2.6) — STAGED (M6, stage 3).
BCR-V2-07 (V02 §10) — the `shed` roof. *Needed by:* V02. **STAGED (M6, stage 3).**

--- V02 BCR-V2-07 (lines [3684])
**BCR-V2-07 — the `shed` roof.** Same heading. Current: "`type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|
'dome'|'skeleton'|'tent'|'plain'`". New: "`type RoofSpec = { kind: 'gable'|'hip'|'shed' /* one pitch; volume 2 §2.1 */|
'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain'`", and the field "`high?: number /* shed only: the ring side at
ridge height */`" added after `pitch?`.

######## f item 223 (§2.6) — STAGED (M6, stage 3).
BCR-V2-22 (V02 §10) — the stage-3 contract and the admission bounds. Also touches: §12.7. *Needed by:* V02. **STAGED (M6, stage 3).**

--- V02 BCR-V2-22 (lines [3832])
**BCR-V2-22 — the stage-3 contract and the admission bounds.** `### 2.6 …`. Current: "`the composed wings equals the
outline's union exactly (integer equality after snapping)`" → "`the composed wings and of the composed towers' ground
rings equals the outline's union exactly (integer equality after snapping)`", with, at the paragraph's end, "Stage 3's
composer composes each wing at exactly its base wing's storeys (volume 2 §3.6)." Current: "`If it exceeds §12.7's 10 µs
median, `outline()` runs the generator's own massing step`" → "`If the town-wide median exceeds §12.7's 10 µs, or the
composed classes' median exceeds 60 µs or their p99 250 µs (volume 2 §6.1), the fallbacks of volume 2 §6.1 (a)–(b) apply
first; if those still miss, `outline()` runs the generator's own massing step`". `### 12.7 Labels, trees, exports
(SCL-8, SCL-10, SCL-14)`. Current: "`a stage-3 generator's `outline()` is admitted at ≤ 10 µs per`" (with its next line) →
"a stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median over the town, ≤ 60 µs median and ≤ 250 µs
p99 over its composed classes, and ≤ 12 µs mean (volume 2 §6.1), and its registration re-declares S11's row of §12.4 by
the measured difference (§2.6, §3.7);".

######## f item 224 (§2.6) — BASE (M3a, with items 228 and 230: the hint clause applies wherever `Building.massing.entrance` is set, before M6 a stepped or oval building's).
BCR-V2-23 (V02 §10) — the entrance hint. *Note (SCC-R0C-1; reconciliation round 1, continuation):* one build unit with item 229; applied before items 228 (BCR-V2-38), which rewrites this clause, and 230 (BCR-V2-41), which keeps rule 1 as this item leaves it. Built at M3a because M3a's stepped and oval buildings already carry `Building.massing.entrance` (item 229 brings BCR-V2-02's `MassingRef` with its `entrance`): the clause applies wherever that field is set (non-null) — before M6 only a stepped or oval building's, from M6 also stage 3's composed buildings' — and where it is null or absent rule 1 reads as before, so no other building's door moves. *Needed by:* V02. **BASE (M3a, with items 228 and 230: the hint clause applies wherever `Building.massing.entrance` is set, before M6 a stepped or oval building's).**

[V02 BCR-V2-02: printed above]
--- V02 BCR-V2-23 (lines [3844])
**BCR-V2-23 — the entrance hint (from M3a, with BCR-V2-39; reconciliation round 1, SCC-R0C-2).** `### 2.6 …` (Entrances, rule 1). Current: "`Exactly one entrance has role `main`. It
stands on the footprint side that`". New: "`Exactly one entrance has role `main`. Where the building's massing names an
entrance hint (`Building.massing.entrance`, volume 2 §2.1) it stands on the side that hint names, which faces the plot's
frontage access edge by construction; otherwise it stands on the footprint side that`". The clause applies wherever
`Building.massing.entrance` is set — before M6 only a stepped or oval building's, laid by the base outline builder's
constructions (BCR-V2-39) — and BCR-V2-38 and BCR-V2-41 read it from the same milestone (reconciliation round 1, SCC-R0C-2).
--- V02 BCR-V2-38 (lines [4083])
**BCR-V2-38 — the main door on the part of its side the footprint keeps (item 110 fold).** `### 2.6 …`, *Entrances* rule
1 as BCR-V2-23 amends it: "Where the building's massing names an entrance hint (`Building.massing.entrance`, volume 2
§2.1) it stands on the side that hint names" reads "… it stands on the part of the side that hint names which lies on
the footprint's boundary — a wing abutting that side (a stair, a church porch) covers the rest (volume 2 §3.15.1 ST7) —;
`deriveEntrances` keeps its drawn position where it already lies on that free part and moves a covered one to the nearest
free point, with no second draw" (second revision, V2C-72: so every door not under an abutting wing keeps its bytes, and a
forecourt `U`'s covered door is T-V2-50's one reported difference).
--- V02 BCR-V2-41 (lines [4126])
**BCR-V2-41 — a solid stack's entrance and the plan's root (second revision, V2C-53; J-V2.83).** `### 2.6 …`, *Entrances*
rule 5. Current: "5. **The plan opens a door at every entrance** and roots its circulation at the main one;". New: the same,
followed by: "— except a building with no storeyed wing standing on the ground (a solid stack, volume 2 §3.15): its main
entrance is the foot of its stair chain (rule 1 unchanged, the stair's outer side on the footprint and facing the
frontage); the plan opens no door there and roots its circulation at the landing door of the first storeyed wing the chain
reaches (volume 2's `landingSide`); a building with no storeyed wing at all (a solid monument, a sealed stack whose every
wing is solid) has no plan above the ground — no level at or above it and no room there; its basement storeys and the heads
of its hosted accesses are planned as volume 3 §3.1 states — and its main entrance opens nothing; a sealed stack (volume 2's
stair form `none`) that carries a storeyed tier or shrine keeps that wing's plan, reached by nothing (volume V03 §3.3 S6
(e), `W_TIER_UNREACHED`), and its main entrance, on tier 0's front side, opens nothing;" (seam S23R2-11; seam S23R3-14:
a sealed temple with its shrine is the common sealed stack, and volume 3 plans the shrine and flags it). §5.3's entrance row is unchanged (exactly one main entrance, facing its street).

######## f item 225 (§2.6) — STAGED (M6, stage 3).
BCR-V2-27 (V02 §10) — wings named by key under stage 3 (the revision, V2C-09). *Needed by:* V02, V03. **STAGED (M6, stage 3).**

--- V02 BCR-V2-27 (lines [3893])
**BCR-V2-27 — wings named by key under stage 3 (the revision, V2C-09).** `### 2.6 Buildings, heights and ground datum,
wings, materials, sub-locations, the stage-3 interface`. Current (in `interface Room`): "`wing: number /* index into
Composition.wings; a tower's round room names its ComposedTower by wings.length + the tower's index; the passage room
names the wing that spans it */`". New: "`wing: number /* the key of its base wing (BaseWing.key; BCR-V2-01), which under
the base outline builder equals the wing's index; a tower's round room names its tower wing's key; the passage room names
the wing that spans it; Composition.wings is looked up by its base key, never by position */`"; and one sentence after the
stage-3 contract paragraph: "Every other wing reference of this section — `Entrance.wing`, a porch through its wing,
`StairCore.wing`, `Chimney.wing`, each entry of `Storey.wings` and `ProgramRoom.wing` — likewise holds a base wing's key,
and every writer keeps `Building.wings` in volume 2 §2.1's canonical order (towers and turrets by key, then the other wings
by key); the base's keys equal its indices, so nothing changes before stage 3."

**Extended by reconciliation round 1 (S23-09).** Same heading. Current (in `interface StairCore`): "`tower?: number /* index into Composition.towers: a spiral in a round wing */`". New: "`tower?: number /* the key of the tower wing (BaseWing.key) whose round room holds this spiral — the wing its ComposedTower names by base (volume 2 §2.2); Composition.towers is looked up by that base key, never by position; a composed tower with no base (before stage 3) is named by its index, as before */`"; and the sentence this request adds after the stage-3 contract paragraph names `StairCore.tower` beside `StairCore.wing`. Test: T-V2-34 (a tower removed before the spiral's tower keeps the spiral's tower).

######## f item 226 (§2.6) — BASE (M2b, with §2.6's basement gate) for the half cellar's raise — its round-1 extension (a) and (b), applied after items 370 (BCR-V2-32) and 231 (BCR-V2-42), whose datum sentence (a) extends, and before the milestone that builds the gate (else J-V2.91's declared one-time shift); BASE design, built at M6-U for the raised crypt, the crypt parts (c) and `kind 'raised'` (item 109 (k)'s crypt rule, with the underground layer; J111; S23-20, SCC-29).
BCR-V2-28 (V02 §10) — the raised crypt (the revision, V2C-18 (b3); J111), with its round-1 extension (S23-10, S23-31: the half cellar's raise). Also touches: §5.3. *Note:* For its crypt parts — `kind 'raised'`, the crypt ladder and lift, and the extension's (c) — applied after item 238 (it reads `Basement.crypt` and the seed rule); one build unit with items 238 and 436 (S23-20). Its round-1 extension (a) and (b) — the half cellar's raise: the datum term in *Heights and the ground datum* and the *Basements* floor clause — applied after items 370 (BCR-V2-32) and 231 (BCR-V2-42), whose datum sentence (a) extends; the crypt-only case of the half raise — since the finalization (seam S23R6-02) the wings over the crypt's ring, the extension's clause (a) keyed on the basement's ring and (b) naming "its seed wings where volume V03 §3.7.4 keeps a derived half-sunk crypt under them"; the raised form's lift likewise acts on the ground wings over the basement's ring — is inert until M6-U, as item 238's fields are absent before it (seam S23R6-08) (S23R1-05; reconciliation round 2). Its bar T-V2-52 enters §13.2 at M2b by item 522's bullet (SCC-R1C-4; reconciliation round 2, continuation). *Needed by:* V02, V03, V06, V11. **BASE (M2b, with §2.6's basement gate) for the half cellar's raise — its round-1 extension (a) and (b), applied after items 370 (BCR-V2-32) and 231 (BCR-V2-42), whose datum sentence (a) extends, and before the milestone that builds the gate (else J-V2.91's declared one-time shift); BASE design, built at M6-U for the raised crypt, the crypt parts (c) and `kind 'raised'` (item 109 (k)'s crypt rule, with the underground layer; J111; S23-20, SCC-29).**

--- V02 BCR-V2-28 (lines [3906])
**BCR-V2-28 — the raised crypt (the revision, V2C-18 (b3); J111).** `### 2.6 …`. Current: "`kind: 'full'|'half'|'walkout'|'crawl'
/* crawl: item 66's requested form — a void under a raised ground storey, reached by a hatch (Basements, below) */`". New:
"`kind: 'full'|'half'|'walkout'|'crawl'|'raised' /* crawl: item 66's requested form — a void under a raised ground storey,
reached by a hatch (Basements, below); raised: the no-refusal crypt ladder's wet-ground form (volume 2 §3.14.5) — a crypt
storey whose floor lies at max(the lowest terrain sample under its ring, the water table + crypt.freeboardCm), under the ground wings over its ring lifted so their ground storey clears it by crypt.clearCm — for a basement that is only a crypt the wings over the crypt's ring (its seed wings, under which volume V03 §3.7.4 keeps a derived raised crypt), for the ground wings' whole inset that volume V03 §3.7.4 gives a crypt no stair reaches every ground wing over it; a solid tier 0 that holds the crypt inside it keeps its height */`". In the paragraph *Basements*, with
volume 3's BCR-V3-20 (the `crypt` column and `Basement.crypt`): the `always`-crypt ladder is "a full crypt; a half-sunk
crypt where the full floor would lie below the water table or the plot is `low`; a `raised` crypt where even a half floor
would lie below it or the plot is `damp` or `flood` — never a refusal", and the lift is written by the basement step as the `Heights.baseCm` of the ground wings over the basement's ring (volume 2 §3.14.5), with steps at the crypt ring's edge. `### 5.3 The invariant suite, by
scope (SCL-1)`. Current: "`a basement other than a crawl space never under the flood band or below the water table
(§2.6's terrain gate, item 29)`". New: "`a basement other than a crawl space or a raised crypt never under the flood band or
below the water table (§2.6's terrain gate, item 29; a raised crypt's floor lies above the water table by
crypt.freeboardCm, volume 2 §3.14.5)`". Where volume 3's BCR-V3-20 already carries this text verbatim (its pre-decided
fallback), this request is that one.

**Extended by reconciliation round 1 (S23-10, S23-31; J-V2.91, J-V2.92; J-S23.2).** Same heading. (a) *Heights and the ground datum*, current: "— over a requested crawl space, also half the class's cellar depth (Basements, below) —". New: "— over a requested crawl space, and over the ring of a `half` basement, also half the class's cellar depth (Basements, below); the terrain gate reads the datum without this raise —" (applied after BCR-V2-32 and BCR-V2-42, which rewrite the sentence before it). (b) *Basements*, current: "its floor `baseCm` less the depth per storey)". New: "its floor `baseCm` less the depth per storey — a `half` basement raises the ground wings standing over its ring by `cellar.depthCm ÷ 2` above the datum `deriveBase` gives without the raise, as the crawl form raises its storey, written by the basement step as those wings' `Heights.baseCm` (through the building datum pass for a building with a wing standing on another, whose ground-wing pass lists the raise) and kept by every later re-basing path while the basement stays `half`, so its floor lies at the datum less half the depth, the floor the gate tests; a basement that is only a crypt raises the wings over the crypt's ring — its seed wings where volume V03 §3.7.4 keeps a derived half-sunk crypt under them, a raised choir over it)". (c) *Basements*, with volume 3's BCR-V3-20: the crypt's seed wings are volume 2's `cryptSeedWings(b)` (volume 2 §3.14.5 (c), exported by `@plat/plots`), which the crypt ring reads (volume V03 §3.7.4), the lift and the half raise then acting on the wings over the basement's ring (finalization, seam S23R6-02). **Milestone:** (a) and (b) are BASE with §2.6's basement gate and are applied before the milestone that builds it (file f
item 226's M6-U label covers the crypt parts (c) and the raised form only). **Declared shift:** applied before the base
milestone that builds §2.6's basement gate, no document shifts; applied after it, every building with a half basement stands `cellar.depthCm ÷ 2` higher from the milestone that lands it — one declared shift (§13.3) with its diff report (J-S23.2). Test: T-V2-52; T-V2-36's half-sunk crypt.
--- V02 BCR-V2-32 (lines [3946])
**BCR-V2-32 — the datum of a stacked wing and of a deck building (item 110 (c), (d); item 110 fold).** Same heading,
paragraph *Heights and the ground datum*. Current: "a wing's `baseCm` from the terrain sampler (bilinear on the refined
2.5 m raster at the wing's vertices and centroid) is `max(samples) + plinthCm`". New: "a wing that stands on another
(`BaseWing.on`, volume 2 §2.6) has `baseCm` = that wing's deck level — its `baseCm + eaveCm`, less its family's
`parapetCm` under a flat roof — with no plinth and no skirt, computed after the wing it stands on (in stack order, which a key order need not be); a wing
of a building whose plot lies on a deck built over water (item 110 (d); `BuildingInput.deck` with `surfaceCm` set — a quay
built on the bank is ground, volume 2 §3.16 (1)) has `baseCm` = the deck's surface height
(`Bridge.deckCm`, or the pier's, mole's or quay's deck height, §4.8), with no plinth and no skirt, and the buildings on a
deck are re-based in the step that re-bases the deck, their plots in its effective scope; every other wing's `baseCm`
is `max(samples) + plinthCm`, the samples taken by `levelledGroundCm(doc, key, p)` (volume 5's BCR-V5-30: the platform
datum of the levelled plot, block or ward holding `p` on the arena `key` its plot lies on, else the unlevelled raster
there, bilinear) at the wing's vertices and centroid; every other ground sample this paragraph and *Basements* read — the
fall under the footprint (the skirt facts the basement gate reads) and the lowest sample under a raised crypt's ring — is
the same reader's" (reconciliation round 3, S23R2-01: levelling is a platform datum never written to the raster, so the
datum reads it through BCR-V5-30's one reader and a terraced house stands on its own platform, the step volume 1's
`stepProfile` draws; applied after BCR-V5-30's ground part, file f item 309). Current (in `interface Building`): "`heights: Heights /* the building's max over its wings */`". New: "`heights:
Heights /* the building's max over its wings; with a wing standing on another, the stack's envelope measured from its
least ground wing's baseCm, floors = 1 + the highest storey level any wing reaches (volume 2 §3.15.2) */`".
**Extended by the second revision (V2C-50, V2C-60; J-V2.81) — one building-level datum pass.** Same paragraph, after the
new text above: "For a building with a wing that stands on another, the datum is computed by **one building-level pass,
`rebaseStack`** (volume 2 §2.6, §3.15.2): its ground wings by the rule above, then each wing standing on another in stack
order from the deck level of its support, then each stair's rise re-set to its terrace-to-terrace difference, then the
building's heights by the envelope; every path that re-bases any wing of such a building calls this pass for the whole
building, never the per-wing step." `### 7.3 …` (a) 4, current: "every entity on a changed sample is re-based by §2.6's
per-entity datum step (the function S11 and S7 call)". New: "… (the function S11 and S7 call), and a building with a wing
standing on another (volume 2) is re-based whole by §2.6's building datum pass when any of its ground wings is on a changed
sample". `### 7.4 …`, current: "Every entity whose footprint, trace, deck or pier the move carried is re-based by §2.6's
datum step on the ground it now stands on". New: "… by §2.6's datum step on the ground it now stands on (a building with a
wing standing on another by the building datum pass, whole)". `### 2.6 …`, the wing-carrying rule's rule (2), current:
"each composed wing and tower is then re-based by `deriveBase` on the ground it now stands on, as the base wings are
(§7.4)." New: "… as the base wings are (§7.4); a building with a wing standing on another is re-based by the building datum
pass after the carry." And in *Heights and the ground datum*: "a user's edit of the `baseCm` of a wing standing on another
is applied as the same change to the height of the wing it stands on (volume 2 §4.6); a user-edited `baseCm` of a ground
wing is kept (J-DET-24) and carries the wings standing on it".
--- V02 BCR-V2-42 (lines [4138])
**BCR-V2-42 — the wall-side datum sample (second revision, V2C-57; J-V2.72 amended; reconciliation round 3,
S23R2-01).** `### 2.6 …`, *Heights and the ground datum*, applied with item 110 (a)'s coherence pass. Current (as
BCR-V2-32 rewrites the sentence, its last clause): "every other wing's `baseCm` is `max(samples) + plinthCm`, the samples
taken by `levelledGroundCm(doc, key, p)` … at the wing's vertices and centroid". New, after "at the wing's vertices and
centroid": "— a sample point within `terrace.wallBandCm` (250 cm, one refined raster cell; volume 2 §3.10.9) of a
`RetainingWall` chain (item 110 (a)) is replaced by the point moved along the wall's normal, toward the side that holds the
wing's centroid, until it lies `terrace.wallBandCm` from the wall's line, so `levelledGroundCm` reads the wing's own
terrace, never the platform across the wall". Test: volume 2's T-V2-51. (Reconciliation round 3, S23R2-01: the samples are
BCR-V2-32's `levelledGroundCm` samples; a vertex on or beside the wall's line would otherwise read the neighbouring
platform, or, off every platform, the raster's slope across the step.)

######## f item 227 (§2.6) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-31 (V02 §10) — stacked and solid wings (item 110 (c); item 110 fold). *Needed by:* V01 (`BaseWing.on` and `solid`: the stack order and tier shadows, V1-5.1.2 – V1-5.1.3; S23R1-18), V02, V03. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

--- V02 BCR-V2-31 (lines [3938])
**BCR-V2-31 — stacked and solid wings (item 110 (c); item 110 fold).** `### 2.6 Buildings, heights and ground datum,
wings, materials, sub-locations, the stage-3 interface`. Current (the last line of `BaseWing`, as BCR-V2-01 quotes it):
"`  heights: Heights; roof: RoofSpec }`". New: BCR-V2-01's new text with, before its closing brace, "`; on?: number /* the
key of the wing this wing stands on — its floor is that wing's deck level (volume 2 §2.6): a stepped building's upper
tiers, its shrine and its upper stairs; absent: the wing stands on the ground */; solid?: true /* a solid mass with no
interior: floors 0, its eave its top; no storey, room or capacity (volume 2 §2.6) */`", and `WingRole` gains `tier`,
`shrine` and `stair` (volume 2 §2.1).
--- V02 BCR-V2-39 (lines [4091])
**BCR-V2-39 — the base outline builder's stepped and deck constructions, from M3a (item 110 (c), (d), (e); item 110
fold).** `### 2.6 …`, *The base outline builder*. Current: "and — for institution classes (keep, temple, church, manor,
hall, farmstead) — two further constructions behind the same `outline()`:". New: "and — for institution classes (keep,
temple, church, manor, hall, farmstead) — two further constructions behind the same `outline()`, and from M3a (item 110)
two more: the **stacked-tier construction** `layTiers` (volume 2 §3.15.1, exported by `@plat/plots`) for a class whose
designation template's `composition` names a `stepped` row of `composition.json`, drawing on the building's `massing`
concern with creation indices 8–9 so that stage 3's massing reproduces it byte for byte, and on a deck plot a rectangle
(or the row's quad) inside volume 2 §3.16's deck budget with its storey cap and the deck's datum; `composition.json` ships
at M3a with those rows and constants (volume 2 §8.5), and the `massing` concern of BCR-V2-10 is appended to the registry
then, with the next append-only u16 id:" — which brings BCR-V2-07's `shed` roof kind and BCR-V2-31's fields to M3a with
it (BCR-V2-01's `role` and `key` are there from M1). **Restated by the second revision (V2C-48, V2C-59; J-V2.80, J-V2.84):**
the stacked-tier construction the base outline builder calls is **`massStepped`** (volume 2 §3.15.1: the frame, `slotBand`,
ST0, `drawTiers` on the `massing` concern's creation indices 8–9, the pure `layTiers`, ST8, the attempts and the fallbacks),
the one function stage 3's massing also calls, with **`stairTreads`** (volume 2 §2.6; the per-wing constructions' treads,
BCR-V2-36; reconciliation round 1, S23-07), and beside it **`massOval`** for a class whose composition row names
`ovalCourt` (the second fixture's arena); the request also brings **BCR-V2-02's `MassingRef`** for a stepped or oval
building — its `family`, `row`, `grammar`, `entrance`, `segments` and `stack` — with volume 2 §2.6's stack migration row,
and `DriftBounds.families`' M3a list admits `stepped`. *Reconciliation round 1 (SCC-R0C-2):* the request also brings
**BCR-V2-09's `composition?`** on the designation template and its structures (written by volume 11's specialisation
replacement, BCR-V11-27; read by `massStepped`'s and `massOval`'s gates through volume 2 §3.2's chain) and **BCR-V2-23's
hint clause** of *Entrances* rule 1, which BCR-V2-38 and BCR-V2-41 amend and keep for M3a's stepped and oval buildings. *Reconciliation round 2 (S23R1-17):* the request also brings
**BCR-V2-24's hole sentence** (S11's yard partition types every hole of a footprint face as a `court` yard part, the
`massOval` arena's floor among them), the rest of BCR-V2-24 staying at M6 (its build note).

######## f item 228 (§2.6) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-38 (V02 §10) — the main door on the part of its side the footprint keeps (item 110 fold). *Needed by:* V02, V03. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

[V02 BCR-V2-38: printed above]
[V02 BCR-V2-39: printed above]

######## f item 229 (§2.6) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-39 (V02 §10) — the base outline builder's stepped and deck constructions, from M3a (item 110 (c), (d), (e); item 110 fold). *Note (SCC-R0C-1; reconciliation round 1, continuation):* one build unit with items 224 (the hint clause of *Entrances* rule 1, which its `MassingRef.entrance` feeds) and 426 (the designation template's `composition?`, whose `stepped` row its gate reads), and with item 303's hole sentence (every footprint hole a `court` yard part; S23R1-17, S23R1-18; reconciliation round 2, continuation); its bars T-V2-44 – T-V2-47, T-V2-50 and T-V2-51 enter §13.2 at M3a by item 522's bullet (SCC-R1C-4). *Needed by:* V02, V03, V04, V11, V12. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

[V02 BCR-V2-39: printed above]

######## f item 230 (§2.6) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-41 (V02 §10) — a solid stack's entrance and the plan's root (second revision, V2C-53; J-V2.83). *Note:* Applied before BCR-V3-26; carries rule 5 for both volumes. *Needed by:* V02, V03. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

[V02 BCR-V2-39: printed above]
[V02 BCR-V2-41: printed above]
--- V03 BCR-V3-26 (lines [3004])
**BCR-V3-26 — the storey an entrance opens on** (item 110 (a), (c); V3C-66 (3), V3C-70 (2); J-V3.99). Same heading. In
`interface Entrance`, current: "offsetCm: Cm /* along that side; side and offset re-read from the vertex after every carry
(rule 3) */ }". New: "offsetCm: Cm /* along that side; side and offset re-read from the vertex after every carry (rule 3)
*/; storey: number | null /* derived with the entrance, never set alone, after the basement decision: the level (basement levels
included — for the main entrance only where `Basement.access` is not `external`, whose core stops at the ground storey, the
plan rung's step 3) whose floor at its wing meets the outside ground at its vertex within the plan's step tolerance, the nearest where two meet; the main
entrance 0 where none meets (opened with a stoop); null where no storeyed wing stands on the ground (rule 5's exception);
the rule and the tolerance are volume V03 §3.6's */ }". In *Entrances* rule 4, current: "entrances are re-derived when the
designation mutates and kept where an edit fixed them (§7.2)." New: "entrances are re-derived when the designation mutates, and when the ground or the stack beside them or the building's basement (its `access`, `kind` or `floors`) changes — their `storey` with them (volume V03 §3.6) — and kept
where an edit fixed them (§7.2); a side, rear, yard or service entrance whose outside ground meets no level's floor is not
derived, after its draws (volume V03 §3.6)." Rule 5's exception for a building whose every ground wing is solid is volume 2's BCR-V2-41, cited whole (seam S23R4-06; file
f items 230 and 241: rule 5 is carried there; this request carries no rule-5 text). Built at M3a in S11's entrance
derivation, with BCR-V2-41 (volume 3 §8's PE; file f item 241; S23R3-05); S11 derives the storeys — a step with no draw — after the basement decision, whose levels and access they read;
the door and basement draws keep their order on the `siteplan.entrance` concern (§6.1, J-A29.61) (reconciliation rounds
5 and 6; seams S23R4-01, S23R5-03; J-V3.124). File f item 241 carries the text by reference; its label is unchanged.

######## f item 231 (§2.6) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-42 (V02 §10) — the wall-side datum sample (second revision, V2C-57; J-V2.72 amended). *Note:* Reads the `RetainingWall` record's chain; applied after item 309 (BCR-V5-30; S23R2-02) and item 370. *Needed by:* V02, V03. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

[V02 BCR-V2-39: printed above]
[V02 BCR-V2-42: printed above]
--- V05 BCR-V5-30 (lines [3249])
**BCR-V5-30 — levelling as datums, the field's receivers unlevelled (C5-54; applied once the coherence pass has applied
item 110).** Heading: `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and
footprints — the plot model`, in the levelling text item 110 (a)'s application writes for S10 and S11. Current (file g,
item 110 (a)): "the generator raises one where a block, a plot or a ward is levelled on ground steeper than
`terrace.slopeMin` and the step exceeds `terrace.stepMinCm` (S10 and S11's levelling". Mechanism to add: "A levelled
block, plot or ward is a **platform datum** and **never a write to the `Terrain` raster**. Levelled heights have one
reader function, `levelledGroundCm(doc, key: PlatKey, p: PointCm): Cm` (pure, draw-free): the datum of the levelled
plot, block or ward holding `p` on the arena `key` — the ground's, or a sky island's (V05 §3.22 (4)) — else the
unlevelled raster there (bilinear). Its readers: the buildings' datum step (volume 2's `deriveBase`); the ways'
stair-or-ramp crossing rule; the retaining walls' derived step profile (volume 1's `stepProfile`, its BCR-43); volume
1's island bridge build after S8, `deckCm` from the two bank elevations on the island's key, where nothing is levelled
yet (V01 V1-3.10.3 (4); V01's BCR-45, file f item 580; seam SLR4-04); volume 4's wall-face knots (N6–N7), arch-vault floors and foundation obstacles (V04 §3.2, §3.5.0, §3.5.4), the span rule of
volume 4's BCR-45, volume 4's buried floor under a raised grade (V04 §3.5.5) and its village working's depth test (V04
§3.5.7 (a)); and the sky's surface top, crypt re-test and clearance check (V05 §3.9 (4)–(5), §3.10 (5)). Every
**field** reader of the raster (the prosperity field and its daylight term, the islands' strips, V05 §3.19 (3), volume
6's building shade mask) keeps the unlevelled heights, S1's raster with the T2 terrain strokes, before and after S10 and
S11 alike (seam SL-26). Should the application need levelled heights in the raster, it keeps the unlevelled heights
readable as the raster the field reads, and every field reader reads that one."

######## f item 232 (§2.6) — STAGED (M6-P, the plan rung).
BCR-V3-2 (V03 §10) — the plan records. Also touches: §12.8. *Needed by:* V03. **STAGED (M6-P, the plan rung).**

--- V03 BCR-V3-2 (lines [2766])
**BCR-V3-2 — the plan records.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials,
sub-locations, the stage-3 interface`. Current: "rooms: Room[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[] }"
(in `interface Storey`). New: "rooms: Room[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[]; furniture:
FurnitureItem[] /* V03 §2.1 */ }". Mechanism for the rest: add to `Room` the fields `nextFurniture: number` and `name?:
string`; to `Opening` the fields `hinge?: 0|1`, `swing?: Id` and `steps?: number`; to `WindowRec` the field `kind:
'window'|'slit'|'light'`; to `Chimney` the field `air?: Id[]`; to `ProgramRoom` the fields `origin` and `subLocation?` (V03
§2.1); declare `FurnitureItem` as V03 §2.1 states (`rotCdeg` integer centidegrees). In step 6, after "furniture is
abstract shapes by role from the row's `furnish` columns, never blocking an opening or the stair bay" add "(`Storey.
furniture`, placed by V03 §3.8)". In `interface CarriedShapes`, current "and with a stored plan every storey's room rings,
walls' end points, stair-core bays and chimney columns (rule 2 (b); J-P48)" → new "and with a stored plan every storey's
room rings, walls' end points, stair-core bays, chimney columns and furniture points (rule 2 (b); J-P48)"; in the
paragraph *A stored composition is carried with its wings (J-P48)*, current "each `StairCore.bay`, each `Chimney.column`"
→ new "each `StairCore.bay`, each `Chimney.column`, each `Storey.furniture[].at` (re-snapped or orphaned after the carry
by V03 §4.3)". In `### 12.8 Memory (what is counted, per rung)`, *The elaboration cache*: current "(rings and walls as
integer cm, openings and windows as offsets along their walls)" → new "(rings and walls as integer cm, openings, windows
and furniture as offsets along their walls or in cm)".

######## f item 233 (§2.6) — 
BCR-V3-12 (V03 §10) — a stair and a landing in the capacity. *Note (S23R3-06; reconciliation round 4):* `R(s)` changes an eager fact — *One capacity function*, which S10b's placement and the capacity rule's re-homing read before any plan exists — so the request is built with that function, not with the plan rung (volume 3 §8's PE row; S23R3-05); of `PlanGeometryRow` its two `stair` cells, `stair.ladder` and `stair.landingCm`, ship then, in the base's `roomProgram.json`; five more ship at M3a with items 241, 242 and 578 — `datum.maxSteps`, `stair.riserCm` and `exposureAllStoreys` (item 241's `Entrance.storey` and rule 4), `moduleCm` and `door.mainCm` (item 578's `basementDoor(b)` and W2's outside-ground sample; volume 3 §8's PE); the rest of the row with M6-P (seam S23R2-09; reconciliation round 3, continuation). *Needed by:* V03. **BASE (M2b, with *One capacity function*; its two `PlanGeometryRow.stair` cells shipped then; S23R3-05).**

--- V03 BCR-V3-12 (lines [2850])
**BCR-V3-12 — a stair and a landing in the capacity.** Heading: `### 2.6 Buildings, heights and ground datum, wings,
materials, sub-locations, the stage-3 interface`, *One capacity function (J-A28.23, J-A28.28)*. Current: "`capacity(b) =
min(households.max of the designation template at the plot's builtBand (§10.2), floor(Σ over the storeys s at or above the
ground of A(s) × (den − num) ÷ (2 · den · minRoomCm2)))`". New: "`capacity(b) = min(households.max of the designation
template at the plot's builtBand (§10.2), floor(Σ over the storeys s at or above the ground of (A(s) × (den − num) − den ×
R(s)) ÷ (2 · den · minRoomCm2)))` — `R(s)` 0 at the ground and, on every storey above it, the `area2` of a `ladder` stair
bay and a landing (`PlanGeometryRow.stair.ladder` and `.landingCm`, volume V03 §2.4), so the plan rung's no-abort fit
ladder always houses a shell at capacity (V03 §3.9)". And after "basement storeys excluded." add "An edit of the `room`
role's min, `stair.ladder` or `stair.landingCm` (§7.6) re-runs the capacity rule's re-homing, like a template edit." Built at M2b with *One capacity function*, the cells
`stair.ladder` and `stair.landingCm` shipped in the base's `roomProgram.json` then (volume 3 §8's PE; file f item 233;
S23R3-05).

######## f item 234 (§2.6) — BASE (M3a, the base outline builder's templates carry their part names; S23-20).
BCR-V3-13 (V03 §10) — template part names. *Needed by:* V02, V03. **BASE (M3a, the base outline builder's templates carry their part names; S23-20).**

--- V03 BCR-V3-13 (lines [2862])
**BCR-V3-13 — template part names.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials,
sub-locations, the stage-3 interface`, *The base outline builder*, item 1 *Footprint templates*. Current: "each template
is stored as its constituent rectangles and wedges so the wing rule below holds." New: "each template is stored as its
constituent rectangles and wedges so the wing rule below holds, each carrying a `partName` (nave, transept, crossing,
chancel, apse, tower, cloister walk, …; data) that the fitted wing keeps (`BaseWing.partName?: string`, written by the
outline builder and carried with the wing), read by the plan rung's room placement and the crypt's seed (volume V03 §3.2
A5 (e), §3.7.4)". In `interface BaseWing`, after `ridgeAxis` add "`partName?: string /* a template part's name, above;
absent on every other wing */`". *Reconciliation (S23-15):* the field's lifecycle is volume V03 §2.5's row — kept by every
wing writer on the wing that keeps its key (a re-joined block keeps the lowest key's), absent on a new wing, restored
with the wings on undo, re-derived at load for a template-family building by matching each wing's ring to its template
part, else absent and reported. In `### 11.1 Formats`, the JSON schema row needs no new text: the schema is generated
from the `zod` types, so `partName` rides the wing record of `Building.wings` by construction (volume V03 T-V3-13 checks
the round trip).

######## f item 235 (§2.6) — STAGED (M6-P, the plan rung).
BCR-V3-15 (V03 §10) — declared rooms. Also touches: §2.8. *Note:* Applied after item 261 (BCR-V2-13): its additions go to the `plan` rung's inputs in the per-rung `inputs` comment and `stale` sentence (S23-39; reconciliation round 1). *Needed by:* V03. **STAGED (M6-P, the plan rung).**

--- V02 BCR-V2-13 (lines [3727])
**BCR-V2-13 — the rungs' recorded inputs.** `### 2.8 Identity, lifecycle, provenance, the entity registry`. Current:
"`slices: SliceRef[] /* the table slices the rung consulted — programme, pattern, furniture and interior-ladder rows;`".
New: "`slices: SliceRef[] /* the table slices the rung consulted — programme, pattern, furniture and interior-ladder rows,
and for the wings and rooms rungs the composition.json rows (volume 2). Under stage 3 the wings rung's inputs are exactly
wingsInputs (volume 2 §3.11): the base wings (keys, roles, rings, heights, roofs), the main entrance (wing key, side,
offset) and a secondary porch's entrance, Building.massing, these slices, and the plot's ring with the footprints and yard
parts of its other buildings within the porch's reach — never the whole leaf digest; the rooms rung adds the occupants'
band row and value, the household count and the programme's hall row;`".

**Extended by reconciliation round 1 (S23-06; J-V2.52 amended).** The same heading; the per-rung rule is written into the record's other two statements of its inputs and into §4.1's, so the base alone stales each rung only on its own list. Current (the `inputs` comment, whole): "`inputs: Hash64 /* the digest of the rung's recorded inputs — for a building: its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans), the leaf digest of each spanned Passage (its face's ring, which the span rings are cut from, §2.6), the occupants' band (Plot.fieldBand) and value (the value at §7.2's τ), the accesses that open in its basement (item 64), its running Works' stage at the drawn week (item 67 (j)) and the households housed in address order (item 28 (f)), and the slices below */;`". New: "`inputs: Hash64 /* the digest of the rung's recorded inputs, per rung. For a building's plan rung — and every rung of a building before stage 3 registers —: its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans), the leaf digest of each spanned Passage (its face's ring, which the span rings are cut from, §2.6), the occupants' band (Plot.fieldBand) and value (the value at §7.2's τ), the accesses that open in its basement (item 64), its running Works' stage at the drawn week (item 67 (j)) and the households housed in address order (item 28 (f)), and the slices below. Under stage 3, the wings rung's: exactly volume 2's wingsInputs (§3.11 there) and its slices; the rooms rung's: wingsInputs, the occupants' band and value, the household count, the class programme's hall row and its slices */;`". Same paragraph, current: "`stale`: an input changed — a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a concealed use, an access into its basement, its Works' stage, a slice, a dossier event of items 18, 22 or 31 —". New: "`stale`: an input **of that rung** changed (the per-rung lists of `inputs`) — for the plan rung (and every rung before stage 3) a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a concealed use, an access into its basement, its Works' stage, a slice, a dossier event of items 18, 22 or 31; for the wings and rooms rungs only what their lists name —". `### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker`, current: "a batch that changes one of its recorded inputs — a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a table slice it cites, or a dossier event of items 18, 22 or 31 (§2.8's `ElaborationRecord.inputs`) —". New: "a batch that changes one of the rung's recorded inputs (§2.8's per-rung lists of `ElaborationRecord.inputs`) — for the plan rung a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a table slice it cites, or a dossier event of items 18, 22 or 31; for the wings and rooms rungs only what their lists name —". Volume 3's BCR-V3-15, -19 and -28 add their inputs to the plan rung's list and are applied after this request (S23-39). Test: T-V2-21.
--- V03 BCR-V3-15 (lines [2897])
**BCR-V3-15 — declared rooms.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations,
the stage-3 interface`. Mechanism: `interface Building` gains "`declaredRooms?: { role: RoomRole; count: number; storey?:
number }[] /* item 101: rooms the author declares this building must hold; setAttr path declaredRooms (T9 shape); read by
the plan rung as hard programme rooms (V03 §3.2 A2 (7)); in the leaf digest */`". In `### 2.8 Identity, lifecycle,
provenance, the entity registry`, `ElaborationRecord.inputs`' comment **as volume 2's BCR-V2-13 (its reconciliation-round-1 extension)
splits it per rung** (this request applies after it; S23-39), in the **`plan` rung's list**, current
"its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans)" → new
"its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, declared rooms, the wings'
spans)"; the `wings` and `rooms` rungs' lists do not gain it.

######## f item 236 (§2.6) — STAGED (M6-P, the plan rung).
BCR-V3-17 (V03 §10) — floor openings. *Needed by:* V03. **STAGED (M6-P, the plan rung).**

--- V03 BCR-V3-17 (lines [2916])
**BCR-V3-17 — floor openings.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations,
the stage-3 interface`. Current: "interface Opening { id: Id; wall: Id; at: Cm /* from a */; widthCm: Cm;". New:
"interface Opening { id: Id; wall: Id /* for a floor opening (point set): the host room's nearest wall, for ordering only */;
at: Cm /* from a */; point?: PointCm /* a floor opening's centre — a trapdoor, a hatch, an access head's opening (V03 §3.7)
*/; widthCm: Cm;".

######## f item 237 (§2.6) — STAGED (M6-P, the plan rung).
BCR-V3-19 (V03 §10) — every access a building hosts is a plan anchor. Also touches: §2.8. *Note:* Applied after item 261 (BCR-V2-13): its additions go to the `plan` rung's inputs in the per-rung `inputs` comment and `stale` sentence (S23-39; reconciliation round 1). *Needed by:* V03. **STAGED (M6-P, the plan rung).**

[V02 BCR-V2-13: printed above]
--- V03 BCR-V3-19 (lines [2926])
**BCR-V3-19 — every access a building hosts is a plan anchor.** Heading: `### 2.6 Buildings, heights and ground datum,
wings, materials, sub-locations, the stage-3 interface`. In `BuildingInput`, current "accesses?: Id[] /* item 64: the
AccessPoints that open in its basement (II.7.3's Basement accesses, declared in II.7.4) — anchors of the plan (step 3) */"
→ new "accesses?: Id[] /* every AccessPoint whose ground.host is this building or its basement, any source or cause —
II.7.3's neighbourhood cellar stair and Basement accesses, a system's own entrance and the crypt join (II.7.6, volume 4),
an undercity lifeline (II.7.5), an access edit (§7.3 item 9) and item 109 (j) (3)'s dug access — anchors of the plan (step
3; V03 §3.7.2) */"; in the plan rung's step 1, current "the basement's accesses (item 64)" → new "the accesses the
building hosts (`BuildingInput.accesses`)"; in `ProgramRoom`, current "| 'core' | 'hearth' | 'passage' /* the passage room:
the span ring (step 1) */" → new "| 'core' | 'hearth' | 'passage' /* the passage room: the span ring (step 1) */ | {
access: Id } /* the room holding an access head, V03 §3.7.2 */"; `interface Plan` gains "`heads: AccessHead[] /* V03 §2.1
*/`". In `### 2.8 Identity, lifecycle, provenance, the entity registry`, `ElaborationRecord.inputs`' comment **as
volume 2's BCR-V2-13 (its reconciliation-round-1 extension) splits it per rung** (applied after it; S23-39), in the
**`plan` rung's list**, current "the accesses that open in its basement (item 64)" → new "the accesses it hosts, each with
its kind, state and knowledge"; in the `stale` sentence, which BCR-V2-13 makes per rung, current "an access into its
basement" → new "an access it hosts, its crypt" — inputs of the `plan` rung only, so neither stales `wings` or `rooms`.

######## f item 238 (§2.6) — BASE design, built at M6-U (item 109 (k)'s crypt rule, with the underground layer; J111; S23-20, SCC-29).
BCR-V3-20 (V03 §10) — the crypt on the basement. *Note (S23-20, SCC-29; reconciliation round 1):* applied before item 226. One build unit with items 226 and 436 and volume 2's seed function `cryptSeedWings` (V02 §3.14.5 (c); S23-31): `Basement.crypt`, the no-refusal crypt ladder with its `raised` form and the seed wings' lift, the seed rule and the rank are base fields and functions from M6-U and absent before it (migration: absent = no crypt; before M6-U, with no `crypt` column yet (item 436), a church takes its class row's ordinary basement draw). Its build leaves volume 3's P2 (re-priced by −0.25 pw) for §16's M6-U row (V04 BCR-13), whose content gains "the crypt derivation — volume 3 §3.7.4's seed, growth and rank; volume 2 §3.14.5's crypt ladder and lift; the stair-entered test and the whole basement of a crypt no stair reaches (volume 3 §3.7.4; seam S23R5-01); volume 3 §3.7.1's crypt clause of `basementDoor(b)` (the door point off the crypt's vault; item 578), whose first reading — a walk-out church's outside door moved off its crypt, volume 1's entrance reserve with it — M6-U's shift record declares with the crypt's first derivation" in volume 4 §8's U4 line (+0.25 pw, unchanged; volume 3 §8's PE; seam S23R5-04; reconciliation round 6); the crypt's plan, columns, stairs and choir flights stay volume 3's (P2). *Needed by:* V01, V02, V03, V04, V10, V11. **BASE design, built at M6-U (item 109 (k)'s crypt rule, with the underground layer; J111; S23-20, SCC-29).**

--- V03 BCR-V3-20 (lines [2942])
**BCR-V3-20 — the crypt on the basement** (item 109 (k) (2), (6) as revised ~20:05, J111; critique/V03.md V3C-61; the seed named by reconciliation round 2, S23R1-01).
Heading: `### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface`. In
`interface Basement`, after the `access` field add "`crypt?: { ring: Polygon; edited?: true } /* item 109 (k) (2): the
building's crypt, derived with the basement (Basements, below; volume V03 §3.7.4); carried with the wings by rule 2 (b)
as ring is; edited by setAttr(basement) on basement/crypt/ring; never written by the plan rung */`" (the `kind` union's
`'raised'` is volume 2's BCR-V2-28). In the paragraph *Basements (owner: "selective but appropriate basements"; item 29
(b); J-A29.22, J-A29.24)*, current "none for hovels, tents, sheds, shacks and lean-to shelters;" → new "none for hovels,
tents, sheds, shacks and lean-to shelters; the class row's `crypt` column (volume 11, BCR-V11-13) decides the building's
crypt — `always` (the cathedral, a great temple, and any building a dossier crypt record binds to) takes its basement by
the no-refusal crypt ladder, full, then half, then raised (BCR-V2-28; on a sky island volume 5's rim-slab vault), in place
of the class probability and of the terrain gate's no-cellar rows, a crypt-only basement where its ordinary draw gives
none — the ground wings' whole inset instead where a storeyed ground wing stands but over none of the crypt's vault — its ring before the rank's trim, or the author's ring (volume V03
§3.7.4); `basement` holds a crypt exactly when a full, half or walk-out basement is drawn; `never` none — its ring seeded
under volume 2's `cryptSeedWings(b)` (else the far third), grown to volume 11's `cryptM2` and ranked (the principal crypt, the cathedral's, strictly the largest: every other trimmed
to `crypt.rankShare` × its area, in a closing pass after S11 over the settlement and again whenever the principal's area
changes) as volume V03 §3.7.4 states;". And in *A requested basement (item 66; J-A66.21)*, at its end, add: "A requested
basement of an `always` class keeps its crypt; a crypt ring the author edits is never trimmed by the rank (V03 §4.2); a
crypt ring set by `setAttr(basement)` on a building without a basement makes a crypt-only basement by the crypt ladder
(the ground wings' whole inset where a storeyed ground wing stands but over none of that ring, volume V03 §3.7.4), the
building `always` for that derivation (volume V03 §4.2; V3C-75)." *Reconciliation round 6 (seam S23R5-01; J-V3.127):*
the two clauses on a crypt no stair reaches are added; file f item 238 carries the text by reference, its label
unchanged.
--- V04 BCR-13 (lines [3126])
**BCR-13 — the build plan.** `## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2`
— after the M5 row add the row "**M6-U — the underground layer** (staged by the owner; built when the owner orders it,
after M5 or beside it)" with the underground volume §8's content, exits and estimate (28.25–39.25 pw), priced outside the
base total like every staged engine until ordered. `# Staged by the owner's roadmap (this document defers nothing)` —
the underground row's subject gains "(built at M6-U by the underground volume)".

######## f item 239 (§2.6) — STAGED (M6-P, the plan rung).
BCR-V3-21 (V03 §10) — the tunnel frontage. *Needed by:* V03, V04. **STAGED (M6-P, the plan rung).**

--- V03 BCR-V3-21 (lines [2965])
**BCR-V3-21 — the tunnel frontage.** Heading: `### 2.6 Buildings, heights and ground datum, wings, materials,
sub-locations, the stage-3 interface`. Current (in `interface Entrance`): "faces: 'street'|'lane'|'alley'|'yard'|'court'|
'passage'|'footpath' /* the way or part the door opens onto; passage: an item 30 passage face; footpath: a cluster
structure's path (item 70) */;". New: "faces: 'street'|'lane'|'alley'|'yard'|'court'|'passage'|'footpath'|'tunnel' /* the way
or part the door opens onto; passage: an item 30 passage face; footpath: a cluster structure's path (item 70); tunnel: an
underground building's frontage door onto its tunnel run, gallery or undercity walkway (II.7.3, II.7.5; volume V03 §3.12)
*/;".

######## f item 240 (§2.6) — STAGED (M6-P, the plan rung).
BCR-V3-25 (V03 §10) — the levels a wing reaches, in the plan rung and the fourth rung. *Needed by:* V03. **STAGED (M6-P, the plan rung).**

--- V03 BCR-V3-25 (lines [2993])
**BCR-V3-25 — the levels a wing reaches, in the plan rung and the fourth rung** (item 110 (c); V3C-65 (5)). Heading:
`### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface`. (1) The plan
rung's step 1, current: "The wings that reach each storey (`BaseWing.ring` or the composed `Wing.footprint`, with their
`spans`". New: "The wings that reach each storey (a wing reaches the levels of volume 2's `storeyRange`, a solid wing
none; volume V03 §3.3) (`BaseWing.ring` or the composed `Wing.footprint`, with their `spans`". (2) The stage-3 contract's
fourth rung, current: "the union of the plan's rooms equals the union of the **extents** of the wings that reach the
storey —". New: "the union of the plan's rooms equals the union of the **extents** of the wings that reach the storey — a
solid wing (`BaseWing.solid`, volume 2) reaching none —". The capacity's `A(s)`, `Storey.wings`, `Storey.level`'s 0 and
the basement's ring inside the ground wings are volume 2's BCR-V2-33's (as its second revision extends it; from V2C-61 (1)),
cited, never restated.

######## f item 241 (§2.6) — BASE (M3a, with item 110 (a), (c) and item 230 (BCR-V2-41) — S11's entrance derivation; S23R3-05).
BCR-V3-26 (V03 §10) — the storey an entrance opens on. *Note:* Its rule-5 text is dropped: BCR-V2-41 carries rule 5 (V03's own condition; group with BCR-V2-41). Its `Entrance.storey` field and rule-4 change apply; both are eager facts of S11's entrance derivation, read before any plan exists, so they are built with item 230's rule 5, not with the plan rung (volume 3 §8's PE row; S23R3-05, S23R3-06; reconciliation round 4). Its cells `datum.maxSteps`, `stair.riserCm` and `exposureAllStoreys` ship with it at M3a (item 233's note; S23R2-09, reconciliation round 3, continuation). *Needed by:* V01 (the entrance set with rule 4's non-derivation: the entrance reserve, V1-3.8.2 step 5; S23R1-18), V03. **BASE (M3a, with item 110 (a), (c) and item 230 (BCR-V2-41) — S11's entrance derivation; S23R3-05).**

[V02 BCR-V2-41: printed above]
[V03 BCR-V3-26: printed above]

######## f item 242 (§2.6) — BASE (M3a, with item 110 (a)'s retaining walls — S11's basement decision; S23R3-05).
BCR-V3-27 (V03 §10) — the walk-out at a retaining wall. *Note (S23R3-06; reconciliation round 4):* the walk-out at a wall sets `Basement.access` in S11's basement decision, an eager fact, so it is built with item 110 (a)'s retaining walls, not with the plan rung (volume 3 §8's PE row; S23R3-05), and with it `basementDoor(b)` (item 578), whose door volume 1's entrance reserve reads. *Needed by:* V01, V02, V03. **BASE (M3a, with item 110 (a)'s retaining walls — S11's basement decision; S23R3-05).**

--- V03 BCR-V3-27 (lines [3020])
**BCR-V3-27 — the walk-out at a retaining wall** (item 110 (a); V3C-70 (3)). Same heading, paragraph *Basements*.
Current: "a **walk-out** cellar where the fall under the footprint exceeds the row's `slopeCm` (the same samples
`deriveBase` reads — the skirt facts)". New: "a **walk-out** cellar where the fall under the footprint exceeds the row's
`slopeCm` (the same samples `deriveBase` reads — the skirt facts), or where a footprint side lies on or within
`cellar.insetCm` of a `RetainingWall`'s high side (item 110 (a); §2.7) whose step there (volume 1's `stepProfile`,
BCR-43) is at least half the cellar depth — its outside door (step 3's `external`) then on that side, at `basementDoor(b)`
(volume V03 §3.7.1; BCR-V3-32)". Built at M3a with item 110 (a)'s retaining walls, `basementDoor(b)` with it (volume 3
§8's PE; file f items 242 and 578; S23R3-05). Volume 2's sentence "A walk-out
basement where the plot's low edge is a wall is volume 3's BCR-V3-27 (a) (§2.6's basement rule reading the step there; its
door on that side)" (V2 §3.17 (a), as V02's reconciliation round 3 words it, S23R2-07) points here. The request's parts (b), the deck gate, and (c), the outside door of a stack, are dropped for
volume 2's BCR-V2-34 and for volume 2's BCR-V2-33 (the access external where no ground wing is storeyed; provenance
V3C-82), whose door volume 2 §3.15.3 leaves to volume V03 §3.7.1's tomb door.

######## f item 243 (§2.6) — STAGED (M6-U, the underground layer).
V04 BCR-43 (V04 §10) — a forced basement for a subterranean institution on the surface (C4-02 (4), C4-07). *Needed by:* V04. **STAGED (M6-U, the underground layer).**

--- V04 BCR-43 (lines [3368])
**BCR-43 — a forced basement for a subterranean institution on the surface (C4-02 (4), C4-07).** `### 2.6 Buildings,
heights and ground datum, wings, materials, sub-locations, the stage-3 interface`, *Basements* — current: "derived by the
same function, never rolled alone, from:" — new: "derived by the same function, never rolled alone — and forced by
II.7.6 step 1's requested-mode ladder (the probability taken as 1, the terrain gate kept) for a building whose use is a
subterranean dossier institution placed on the surface (DR17; the underground volume §3.7 L5) — from:"; its S10b hard row
is BCR-14's amended DR17 cell.

######## f item 244 (§2.7) — BASE (M3a (the record, the support step and the span rule); the arch-vault chambers M6-U).
**The raised-way record** (g item 110 (b), homed by the coherence pass) — one record for all volumes. **Consolidated (J-VI.2, J-VI.15, J-VI.21).** A raised way is a `Way` (§2.4) on a ground arena part ≥ 1 whose `Way` record gains `raised?: RaisedWayRecord`, declared in §2.7: `{ kind: 'viaduct'|'elevated'|'aqueduct'; reason?: RaisedReasonKey /* generated ways; volume 6 §2.13; the reason WORD shown by readers and exports is derived: viaduct → 'drop', elevated → 'link', aqueduct → 'water' */; underuseSince?: number /* volume 6 */; supports: { key: number; ring: Polygon; state?: 'ruined'|'cleared' }[]; spans: { a: number; b: number; use: 'open'|'vault'; reason: 'way'|'water'|'flood'|'tall'|'low'|'slope'|'chance'|'cap'|'land'|'user'; soffitCm: Cm /* derived */; held?: true; state?: 'ruined'|'cleared' }[]; terminal?: { kind: 'basin'|'cistern'|'fountain'; at: PointCm; building?: Id }; feeds?: Id[]; waterUse?: Id; clearanceCm?: Cm /* held once a user edits it (BCR-V9-33); absent: derived, below */; spanSpacingCm?: Cm /* held once edited (BCR-V9-33); absent: drawn, below */ }`. **The support step** (J-VI.27; integration continuation, 2026-09-29), run for every raised way — generated, declared or drawn — after its course and deck level are fixed and before the span rule, from ground part 0 only: (1) the deck's centre-line between its two feet (where its ramps or stairs meet part 0) has length L m; the pitch p is `spanSpacingCm` ÷ 100 where held, else one uniform on the raised-way stream keyed by (the way's lineage, `pitch`) inside the `pierSpacingM` band of the way's material (volume 11's `raisedWays.structure`, the material drawn by its `material` row by band; an aqueduct never timber); (2) n = max(1, round(L ÷ p)) spans, the n − 1 interior stations evenly spaced at L ÷ n; (3) a station whose pier would meet a part-0 way's corridor or a water face slides along the deck to the nearest clear position at which both neighbouring spans stay ≤ `raisedWays.structure.slideMaxFactor` × the band's upper bound (1.5; volume 11's cell, row 80; own, calibrate-later, `extension`; seam SCC-114), else it is omitted and the merged span is `open` by the span rule's step (2); (4) each pier's `ring` is a rectangle centred on its station, across the deck of the deck's width and along it of max(`pierWidthShare` × the realised span, `pierMinCm` ÷ 100) m; a pier higher than `maxPierM[kind]` (the deck's level less `levelledGroundCm` at its station) drops a generated course (`raised_too_tall`, volume 11) and makes a declared one's dry run bend it to the nearest course the pier heights admit (item 101 R2; rule R-a); (5) keys are minted in order along the deck and never reused (V04 BCR-45): an unchanged course re-derives the same stations from the same stream key and so keeps its keys; a changed course keeps the key of every station within p ÷ 2 of a former one and mints the rest after the largest key the way has held. **The clearance:** over each crossed part-0 way the deck stands at least `clearanceCm` + `raised.deckDepthCm` above that way's levelled ground, `clearanceCm` the held value or, absent, volume 11's `raisedWays.structure.clearanceCm` for the crossed class (cart or foot); the course solver reads it as the deck's lower bound there (volume 11: the cells bound the deck's level, never set it), and a held value below the crossed class's is bent up to it (`bend.raised.clearance`, BCR-V9-33). The piers the step lays are read by volume 1's crossings and under-deck strip, volume 4's arch vaults and foundations, volume 5's access siting, volume 6's decay and clearance, volume 7's obstacles, volume 9's **Deck height** and **Arch spacing** steppers and the exports (item 447). Sources of the fields: BCR-V9-33 (`clearanceCm`, `spanSpacingCm`; the support step, J-VI.27), V04 BCR-45 (supports, spans and **the span rule**, terminal, feeds, `raised.deckDepthCm` 150 and `raised.supportFoundationCm` 400), BCR-V6-25 (b) (reason key, `underuseSince`, the span and support `state`), BCR-V8-28 (`waterUse`), J-VI.2 as amended by ST-06 (the derived source and word), J-VI.9 (`terminal.kind` `cistern` only under a conduit house the roster or dossier holds). A raised way's **source** is derived at read, never stored (ST-06; reconciliation round 1): `declared` when the way's lifecycle cause is an edit or a skeleton file, else `generated` (volume 6 §3.19.1 (2)); there is no `carried` value — a reader that says "carried down from year N" reads the lifecycle and the epochs' rungs (volume 6 §4.5) — and no stored founding rung (the founding epoch's `EpochRecord` holds it). Lifecycle: generated ways re-derive with their reason key; declared ways are held; a removal of a generated way is a suppression (the suppression item); undo is the log's; migration: absent `raised` is a ground way. The **II.7.6 Vaults** sentence is V04 BCR-45's. *Requests:* V04 BCR-45, BCR-V8-28, BCR-V9-33. *Needed by:* V01, V04, V05, V06, V07, V08, V09, V11. **BASE (M3a (the record, the support step and the span rule); the arch-vault chambers M6-U).**

--- V06 BCR-V6-25 (lines [3904])
**BCR-V6-25 — item 110's generation on the epoch's terms (C6-39, C6-37; for the coherence pass, which applies item 110
(b) to the base).** Headings `### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph` (the
viaduct in the route solve), `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims` (the
elevated road and the aqueduct at S6's end) and `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use,
decorations, pins; labels; content entities; the staged layers' records` (the raised way's record). Current: none — the
base has no raised-way text yet (md5 01fea21f…, 0 hits for "raised way", "viaduct" or
"aqueduct"). Mechanism to add with item 110 (b): (a) generation's raised-way emission uses volume 6 §2.13's
`RaisedReasonKey` as each generated way's derivation unit (creation index 0, epoch component 0), one uniform per key on
the raised-way stream with epoch component 0, the kind order aqueduct, viaduct, elevated road with strength then address
inside a kind, the three readings of volume 6 §3.19 (2), and the `RaisedWayLedger` — the count of standing generated,
suppressed and declared ways against V11's caps, suppressed keys skipped — exported by the generator's package and read
by S4, S6's end, a new stage's S5b and volume 6's `raisedWays` step; (b) the raised way's record carries `reason?:
RaisedReasonKey` (generated ways only), `underuseSince?: number` (written by volume 6's pass) and, per span and per
support, `state?: 'ruined'|'cleared'` (BCR-V6-26), and its creation event writes the reason's `detail.why` rows
(BCR-V6-20); (c) the raised-way course solver and the hand operator (T4 `road` with `raised`, the aqueduct class) are
callable from an epoch's phase with given ends; the aqueduct's eager water-need reading is a function of the ground
households and the state (critique-V4 C4-110-6, critique-V5 C5-52 (c)); a ravine or valley `SiteFeature` keeps its
extent; the aqueduct's terminal follows volume 6 §3.19 (6) at generation too; (d) raised ways and retaining walls are
casters of item 102's daylight driver (§4.5, §8.4).
--- V08 BCR-V8-28 (lines [3149])
**BCR-V8-28 — an aqueduct's link to its conduit house (C8-41 (e)).** `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records`, the raised-way record g
item 110 (b) adds (not yet in the base text; the coherence pass homes it). Mechanism: the record gains "`waterUse?: Id /*
an aqueduct's terminal use when a dossier-bound conduit house took it (V08 §2.6b (1) (e)): the use's closure leaves the
aqueduct dry and disused, its ruin ruins the arches by least disruption, its infrastructure impairment applies the
condition steps; removing the use never removes the aqueduct */`".
--- V09 BCR-V9-33 (lines [4184])
**BCR-V9-33 — a crossing's form and a raised way's measures (V9C-76).** `### 7.1 …`, the edit-target table's ways row as
BCR-V9-26 (d) gives it: its `setAttr` gains `crossings/<retaining wall id>/form` = `stair` · `ramp` and, on the raised-way
record as the coherence pass writes it in §2.7, `clearanceCm` (the least soffit height over the ways it crosses) and
`spanSpacingCm` (the support spacing). The dry run bends a ramp too steep for the way's class into a longer ramp along the
way where its run allows, else back to a stair (`bend.crossing.steep`); a clearance below volume 11's
`raisedWays.structure.clearanceCm` for a crossed way's class up to it (`bend.raised.clearance`); a spacing outside the
material's `pierSpacingM` band to its nearest bound (`bend.invalid`). Each path is held once edited (§7.2).
--- V04 BCR-45 (lines [3377])
**BCR-45 — the raised way's spans, piers, foundations and aqueduct delivery (C4-110-1, C4-110-3, C4-110-5, C4-110-6;
J-V4.79, J-V4.88, J-V4.93).** File g item 110 (b)'s raised-way record, homed by the coherence pass in `### 2.7 Walls,
gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers'
records` (g's current text: "Its piers are footprints on the ground part; the spaces between piers stay open or hold the
base's vaults (II.7.6)"). Mechanism to add to the record:
```ts
supports: { key: number /* minted once in order along the deck, never reused: a raised-way pier's identity with its way's lineage */;
  ring: Polygon /* its footprint on ground part 0 */ }[];            // its state is V06's BCR-V6-26
spans: { a: number; b: number /* the bounding piers' keys, a before b along the deck */;
  use: 'open'|'vault'; reason: 'way'|'water'|'flood'|'tall'|'low'|'slope'|'chance'|'cap'|'land'|'user';
  soffitCm: Cm /* derived: the deck's level at the span's crown less raised.deckDepthCm */;
  held?: true /* a user's setAttr on spans/<a>-<b>/use: an input override every regeneration keeps (§7.2) */ }[];
terminal?: { kind: 'basin'|'cistern'|'fountain'; at: PointCm; building?: Id /* its conduit_house */ };   // an aqueduct's
feeds?: Id[];                                                       // an aqueduct's: the public fountains it supplies
```
**The span rule**, run eagerly at the end of the raised way's generation (after §4.6's cut), for every raised way —
generated, declared or drawn, the user's operator running it on a new way — from ground part 0 only: (1) the under-deck
strip is the deck's plan outline between the two piers' inner faces; (2) the span is `open` where the strip meets a part-0
way's corridor (`way`), a water face (`water`) or a flood cell (`flood`), where `soffitCm` less `levelledGroundCm` (volume 5's BCR-V5-30) at the
span's axis midpoint exceeds `raised.vault.maxHeightCm` (900; `tall`) or falls below `minHeadroomCm` (250; `low`), or
where `levelledGroundCm` under the strip falls more than `maxFallCm` (150; `slope`); (3) otherwise one uniform on the
raised-way stream keyed by (the way's lineage, `a`, `b`) decides it against `raised.vaultShare[kind]` (viaduct 0.6,
elevated road 0.7, aqueduct 0.15) × volume 11's `era.raisedVaultM` × `culture.raisedVaultM` (1 by default), capped at 1:
`vault` (`land`) below it, else `open` (`chance`); (4) at most `raised.vaultCap[rung]` (10 at each village rung, 40 at
TOWN, 120 at CITY, 240 at METROPOLIS) spans are `vault` in the settlement, counted in the order the raised ways were
founded (their creation event, then address) and along each deck, the rest `open` (`cap`); (5) a `setAttr` on a span's
`use` is a held user edit (`user`). `raised.deckDepthCm` is 150 and `raised.supportFoundationCm` — each pier's depth below
the levelled ground, which the underground volume's foundation rule reads (§3.5.0) — is 400; all our own, calibrate-later,
`extension` cells. **The aqueduct's need test** (g item 110 (b): "the base's cistern rule reads the same distances")
reads only eager inputs — river and lake frontage, springs, the well estimate and the climate row's rain term per walled
area — and never the underground's placed cisterns, so no cycle arises; the underground's cistern rule reads the
aqueduct's delivery points (`terminal.at` and `feeds`) in return. And `### II.7.6 …`, the **Vaults** bullet — current:
"cistern under the oldest precincts and the castle where `dist.water` exceeds `cisternDistM` (400 m) — each a chamber or a
short run of vaults under its way or precinct, under public ground only (II.7.3's surface constraint applies)." — new:
"cistern under the oldest precincts and the castle where the lesser of `dist.water` and the distance to the nearest
aqueduct delivery point exceeds `cisternDistM` (400 m) — each a chamber or a short run of vaults under its way or precinct,
under public ground only (II.7.3's surface constraint applies); an aqueduct's cistern terminal takes a terminal cistern
under its conduit house's yard; and each span a raised way's record marks `vault` holds one arch vault at grade, laid by
the underground volume (§3.5.4) and following its raised way at every rung — the TOWN gate binds the other vault sources
only" (BCR-20's precinct admission and BCR-V7-27's gate sentence stand beside it).

######## f item 245 (§2.7) — BASE (M3a; the island form M6-sky; the state profile's writers with their ops — M6-E, M6-sky).
**The `RetainingWall` record** (g item 110 (a)) — one record for all volumes. **Consolidated.** `RetainingWall { id; chain: ChainRef /* on the ground layer, or on a sky island's arena (BCR-V5-27) */; highSide: 'left'|'right' /* resolved at the dry run when drawn without it (BCR-V9-26 (a)); generated: the side D holds (V01 BCR-42) */; closed: boolean /* a platform, high side inside (BCR-V9-26 (a)) */; material: string /* volume 11's MaterialRow key (BCR-V11-30) */; buttresses?: …; towers?: … /* decorative, a table row */; source: 'generated'|'declared'; state?: RetainingState | ChainProfile<RetainingState> /* 'retaining_state_knot' on the chain, step (§2.2 rule 5, J-K10): the wall's condition by stretch; a constant state is a scalar; absent = 'standing' throughout (TR-14) */ }` with `type RetainingState = 'standing'|'decayed'|'ruined'`; the step profile is a **derived view** `stepProfile(wall)` never stored (V01 BCR-43). §2.2 rule 7's knot roles gain `retaining_state_knot` (indexed, as every knot role). Never an `Enceinte`; no gate, no circuit, no barrier closure. Lifecycle as item 110 (a) states, and for `state`: **The state profile** (TR-14; reconciliation round 2). *Writers:* BCR-V6-26's retaining member (`breach` → `decayed`, `dismantle` → `ruined`), `repairRetaining` (a `decayed` run back to `standing`; volume 6 §2.8, item 209) and volume 5's landfall (`decayed` over its covered length, V5 §3.16 (4)); volume 7's house-platform walls decay through volume 6's pool (V07 §3.12). Each writes over its `StretchRef` — the whole chain when it names none — by a knot at each end, an end that is no vertex placed first by `splitThrough` (§3.4): the near knot carries the new state, the far knot the state that held there before; since a step profile is constant before its first knot (§2.2 rule 5), an open wall's profile always keeps a knot on the chain's first vertex (placed with the value that held there when a scalar is first expanded), a closed wall's needs none. The writer then drops every knot whose value equals the knot before it (never an open chain's first-vertex knot), stores a profile whose values are all equal as that scalar, and a scalar `standing` as absent — one canonical form, so the digest (§6.3) is stable. *Read* by `sampleProfile` by arc length (§3.4; a closed wall's profile cyclic): the pool and the restoration rule (volume 6 §3.19.4), volume 4's footings (a footing stands where the wall stands), the renderer (each run drawn by its state row, BCR-V6-26's §8.2 rows), item 447's export and the clerk. *Persisted* as the knot rows and values. *Regenerated:* a generated wall re-derived where an epoch levels keeps its profile while it is not restored (volume 6 §3.19.4 (1), (6)): a knot stays on its vertex while the vertex survives (carry-over by lattice point, §3.10, §6.3); a knot whose vertex is gone is re-placed by `splitThrough` at the new chain's point nearest its old point when that point lies within `retaining.settings.stateSnapCm` (volume 11's `retaining` table, its named `settings` row; 100 cm; our own, calibrate-later; seam SCC-114), else dropped and its run merged into the run before it (an open wall's first-vertex knot always re-placed on the new chain's first vertex); the restoration writes `standing` over the re-levelled length. A cut or join of the chain carries the profile by J-K23's `rekey` pairing. *Undo:* the writing op's undo record restores the former profile, knot rows included. *Migrate:* absent reads `standing`; a document holding the pre-round-2 scalar reads it as the constant profile. *Requests:* V01 BCR-43, BCR-V5-27; the state profile TR-14 (integration). *Needed by:* V01, V04, V05, V06, V07, V09. **BASE (M3a; the island form M6-sky; the state profile's writers with their ops — M6-E, M6-sky).**

--- V11 BCR-V11-30 (lines [4634])
**BCR-V11-30 — the retaining walls' materials (item 110 (a); V11C-43).** Section `### 8.2 Style sheets as data: roles,
contrast, symbolisation, paint programs, layer order, presets (G-R2)`. Mechanism to add: the texture and colour roles
`wall.dry_stone`, `wall.earth_bank` and `wall.timber_crib` beside the existing wall-material roles; their values are the
style sheet's (volume V11 writes no colour).

**Amendments by reconciliation round 1** (2026-09-29; the texts above stand with these additions):
* **BCR-V11-1** — `villageForm?: string /* a v.<id> village class key: the village row that plays this class at village
  rungs; village rows of roster.classes are keyed v.<id> (volume V11 §2.9; SS-01) */` (file f item 430 carries the same
  comment, SS-30).
* **BCR-V11-4** (file f item 510) — as consolidated there: the shapes of `ladders` (`LadderStepRow`) and `goodWords`
  (`GoodWordRow`) are volume V11's (V11 §2.6, §2.8; SS-25); the `archetypes` shape, V08's, carries the optional `village`
  cell typed by V11 §2.8 (`ArchetypeVillageCell`; SS-09); every column of the dossier row sets is `calibratable: false`
  (§13.9 (7); SCC-06).
* **BCR-V11-5** — `WallBarrierRow` carries `arcKind` (V11 §2.7): the arc is a closure feature exactly when its row closes
  and its wall is `none`; at village kinds every water arc closes (V11 §3.16.1; SS-15, SCC-01).
* **BCR-V11-8** — `GovernmentRow` carries `villageSeat` (SS-06); `TerraceRow` carries `retainingReachM`, `flatDepthM` and
  `coverShare` (SCC-19); `CultureSpecialisationRow` carries no `villageCap` (the village cap is V07's, per settlement;
  SS-31); `RaisedWaySettings.aqueduct` carries no `dossierFactor` (SS-13) — as V11 §2.8 and §2.8c declare them.
--- V05 BCR-V5-27 (lines [3214])
**BCR-V5-27 — a retaining wall on a sky island's arena (C5-50; applied once the coherence pass has applied item 110).**
Heading: `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content
entities; the staged layers' records`, the `RetainingWall` record item 110 (a) adds. Current (file g, item 110 (a), the
text the application carries): "a chain on the ground layer holding level ground on its high side". New: "a chain on the
arena whose terrain it levels — the ground's, or a sky island's (V05 §3.22 (4)) — holding level ground on its high side";
and in the record's lifecycle add "on a sky island: generated by the island's unit run, drawn by T3 `retaining` or a T2
terrace stroke with the island's `key`, never on the rim strip, tombstoned with the island at a fall (V05 §3.16 (7))".
--- V06 BCR-V6-26 (lines [3924])
**BCR-V6-26 — raised ways, retaining walls and decks in the decline table and `DeclineOp` (C6-41–C6-43; J-V6.87–J-V6.89,
J-V6.93).** Heading as BCR-V6-1 (a), the decline table. Current (the persistence row): "`use` 1.0 · `building` 0.6 ·
`plotBoundary` 0.3 · `street` 0.08 · `wall` 0.05 · `underground` 0.03 · `terrainWater` 0.005". New: "`use` 1.0 · `building`
0.6 · `plotBoundary` 0.3 · `street` 0.08 (decks too) · `wall` 0.05 · `raised` 0.05 · `retaining` 0.05 · `underground` 0.03 ·
`terrainWater` 0.005". Current (the dwell bands): "walls one band slower, tunnels two". New: "walls, raised ways and
retaining walls one band slower, tunnels two". Current (`DeclineOp`'s wall member): "| { op: 'neglect' | 'breach' |
'dismantle'; enceinte: Id; stretch?: StretchRef }        // walls and gates; the old line persists as a trace;
contractWall and wallToWay above supersede a ring". New: that member kept, and after it three members —
"| { op: 'neglect' | 'breach' | 'dismantle'; raised: Id; span?: SpanRef; support?: number }   // item 110 (b)'s raised
ways (volume 6 §3.19.2): neglect the way (abandoned); breach a span (its deck and arch ruined, the rubble left);
dismantle a ruined span's rubble or a support whose spans are both down (cleared, stone credited); breach and dismantle
collapse the span's arch-vault chambers in the same batch (V04), and removal deletes them" ·
"| { op: 'breach' | 'dismantle'; retaining: Id; stretch?: StretchRef }   // item 110 (a)'s retaining walls (volume 6
§3.19.4): a stretch decayed (slumped) or ruined (stone taken); no edge removed, no terrain changed" ·
"| { op: 'breach' | 'ruin'; deck: Id }   // item 110 (d)'s decks (volume 6 §3.19.5): `deck` is the deck plots'
`Plot.deck.host` (item 246) — a Bridge for a bridge deck, a pier or quay way for a mole, pier or quay platform — and
the deck's condition is that host's lifecycle existence: breach — decayed (charred or damaged, impassable); ruin —
ruined (fallen or taken down), its way cut only where §5.3's network invariant allows; repairRaised's deck form restores
the host's former existence from the striking op's undo record; Bridge.state is untouched; the buildings on its deck
plots ruined by least disruption in the same batch and the deck plots tombstoned" (ST-56; file f item 246) — with `type SpanRef = { raised:
Id; from: number; to: number }` (support ordinals; a view resolved in its batch, as `StretchRef`) and, in §8.2's state
rows, the raised part's decline classes (in use, neglected, span fallen, supports alone), the retaining wall's (decayed,
ruined) and the deck's (decayed, ruined).
--- V09 BCR-V9-26 (lines [4052])
**BCR-V9-26 — item 110's events (item 110 (a), (b), (f); V9C-52; J-V9.59; one text for volumes 9 and 10, XV-V9-10).**
`### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation`, and `### 2.4 Ways
(the skeleton) and typed edges` for the class.
(a) Current: "| { t: 'drawWall'; points: PointCm[]; kind: Enceinte['kind']; closed: boolean; from?: PointsForm /* two or
more points: the run derived along ridges and contours by S5a's trace */ }". New: "| { t: 'drawWall'; points: PointCm[];
kind: Enceinte['kind'] | 'retaining'; closed: boolean; highSide?: 'left' | 'right' /* retaining only, relative to the
points' order; absent: the side whose mean ground within 10 m of the chain is higher */; from?: PointsForm /* two or more
points: the run derived along ridges and contours by S5a's trace; for a retaining wall, along the slope break nearest the
drawn run */ }". With `retaining` the fold makes a `RetainingWall` (§2.7), never an `Enceinte`: no gate, no tower spacing of
S7, no circuit and no barrier closure; `closed: true` is a platform whose high side is inside; `placeGate` never targets
one. Its dry run never refuses on the ground's account: a run on flat ground — at least `terrace.coverShare` of its stations,
sampled every 2 m, stepping less than `terrace.stepMinCm` and sloping less than `terrace.slopeMin` across ± 3 m — moves onto
the nearest slope break, terrace edge or retaining wall stepping at least `terrace.stepMinCm` within
`terrace.retainingReachM` of that share of the stations, else becomes a `terrace` (c) over the strip on the high side
between the drawn line and `terrace.flatDepthM`, levelled to the strip's highest ground plus `terrace.stepMinCm` (volume 9
§4.20.1 (3); the cells volume 11's, XV-V9-13); each way it crosses takes a stair or a ramp by the way-class rule (item
110 (a)).
(b) Current: "| { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm: Cm; from?: PointsForm /* two points: the route
derived by S4's router at the dry run (§4.3) */ }". New: "| { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm: Cm;
raised?: true /* item 110 (b): the deck in its own ground arena part (§3.4, parts from 1), its two ends ramps or stairs
joined to ground vertices, crossing the ways beneath with no junction */; from?: PointsForm /* two points: the route derived
by S4's router at the dry run (§4.3); with `raised`, the course by the raised-way course solver */ }". §2.4's current "type
WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'track'|'path'|'quay'|'pier'|'bridge'|'ford';" becomes
"…|'bridge'|'ford'|'aqueduct';" — a water channel, `raised` wherever it is carried above the ground, never a traffic edge
and never a portal; its buried stretches stay a line on ground part 0. The dry run of a raised `drawWay`: its ends resolve
onto ground vertices (an end on a way's centre-line splits that way, making the vertex; an end elsewhere moves along the
course to the nearest one); its interior points never split a way on part 0; a course meeting an enceinte's trace follows
BCR-V9-29; an aqueduct's first point is a source lying above its terminal within `aqueduct.sourceReachKm`, else it is bent
to the nearest such, else bent to a well at the terminal (J-VI.4 (h)); a terminal on open ground receives a fountain
pin in the same event's closure (§7.3 item 9); a stroke ending on a floating island's rim, or lying on an island's key,
is bent as J-VI.4 (d) and (e) state — a stroke ending on a rim becomes `placeSkyAccess`, one on an island's key the island's own way — with volume 5's words (V5 §4.2; file f item 362's note).
(c) A new sugar event: "| { t: 'terrace'; stroke: FieldStroke; levelCm?: Cm /* absent: the ground height at the stroke's
first point */; expansion: number }". Its `sugar.json` row expands it at its fold into `setField { field: 'terrain', stroke:
{ …stroke, mode: 'flattenTo', amount: 1, levelCm } }` — volume 10's flatten mode (BCR-V10-17) with its `levelCm`
(critique-V10's C10-51 (2)), so the base carries one flatten mechanism — and one `drawWall { kind: 'retaining', points,
closed, highSide }` per edge run of the levelled footprint along which the step reaches `terrace.stepMinCm`, each minted
from the sugar's `seq` (§6.3). An expansion replaces, in the same group, the retaining walls an earlier `terrace`
expansion made inside its footprint, so a re-levelled terrace never leaves a wall of the old step.
(d) The authoring toolkit table: T2's row "`setField(terrain)`, `warp`, `drawWater` (its points and level forms),
`moveCourseKnot`" gains "`terrace` (item 110 (a))"; T3's "`drawWall` (its points form), `placeGate`" reads "`drawWall` (its
points form; its `retaining` kind, item 110 (a)), `placeGate`"; T4's row gains "with `raised`, or the `aqueduct` class
(item 110 (b))". The edit-target table: current "| ways, junctions, bridges | `drawWay` (class `bridge` for a new crossing),
`moveVertex`, `warp`, `split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind) |". New: "| ways,
junctions, bridges, raised ways | `drawWay` (class `bridge` for a new crossing; `raised` and the `aqueduct` class, item 110
(b)), `moveVertex` (a raised way's interior points on its part's lattice; its ends only onto ground vertices), `warp`,
`split`, `merge`, `delete`, `setAttr` (class, width, surface, name; a bridge's kind; on a raised way `spans/<ordinal>/use` =
`open` · `vault`, a held user edit, kept `open` over a part-0 way, water or a flood cell by the span's recorded reason; and
BCR-V9-33's paths) |", and a row after the walls row: "| retaining walls | `drawWall` (kind `retaining`), the `terrace`
sugar, `moveVertex`, `setAttr` (material, towers, `highSide`), `delete`; a generated one re-derives with its terrain until
edited, then held (§7.2) |".
(e) **Removal.** A `delete` of generated content is the plain `delete { id }`. The delete operator — never a client —
records what the removal suppresses: BCR-V6-24's `detail.suppress` for the kinds file f item 260 names (a raised way, a
harbour-mouth chain, a quay wall, a retaining wall, a deck plot), volume 5's removed slot for an island or a sky access. A
journal or a transcript therefore replays the call exactly. Its
preview carries `holds` (BCR-V9-27).
--- V01 BCR-42 (lines [3703])
**BCR-42 — `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the
plot model` (the district-edge source and one producer per wall line; g item 110 (a); V1C-64 (6); J-V1.61).** File g gives
the source as "along a terraced district's edge when the relief row asks for terraces", inside "S10 and S11's levelling".
Mechanism to add, in S10 before D's plots are cut: "**The district-edge source.** For each district D whose fabric
declares `terracedEdges` (BCR-V7-34: the bent cut and volume 1's `TemplateFabric` true, the village's `village-ways` false)
and for which `terraceState(D)` (volume 1, V1-2.3) has `asks` and `walls`, S10 raises one `RetainingWall` (source
`generated`) along D's boundary setback line, inside D's faces, on each **backing soft run** — a `field` run, or a `way`
run along which no block of D has a frontage (S9's `Block.frontages`) — across which D's ground within `dBar` of the run
stands at least `terrace.stepMinCm` above the ground on the other side (the unlevelled terrain at the run's boundary
samples; D the high side). It is split where that step stays below `terrace.stepMinCm` over at least `eLo`, and pieces
shorter than `eHi` are dropped. None stands on a hard run (`wall`, `water`, `cliff`, `marsh`, `frame`, `sky`: the enceinte,
the shore, the barrier or the rim already holds the ground) or a `reserve` run (the reservation levels itself, S11). A
portal's lane on the run crosses the wall as a stair or a ramp by the way-class crossing row, never a gap. Identity:
derivation unit the L1 cell whose face the run bounds on D's side, stage S10, creation index 4 096 + the run's ordinal on
that face. D's edge plots back onto it. **One producer per wall line:** the plot and block levelling raises no wall along a
line a `RetainingWall` already holds (within 0.5 m and parallel within 10°), and a district's levelling raises walls only
inside its own faces (volume 1, V1-3.11 (7))."
--- V01 BCR-43 (lines [3721])
**BCR-43 — `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities;
the staged layers' records` (the step profile derived; V1C-65; J-V1.63).** File g's `RetainingWall` has "a step-height
profile along it (from the terrain on each side)". Mechanism to add: the record persists its chain, material, source and
buttresses; the profile is a derived view, `stepProfile(wall): { atCm: Cm; stepCm: Cm }[]`, computed on read from the
committed levels on each side — `levelledGroundCm` (BCR-V5-30) for ground, a way's level where a way bounds it — and never
stored, so a
re-derivation of the district on one side writes no record of the other (volume 1, V1-3.11 (7)); §8's shadow, §11.1's
exports and the VTT threshold read the view, and volume 4's buried floor (V04 §3.5.5), volume 3's walk-out at a wall
(BCR-V3-27 (a)) and `basementDoor(b)` (volume 3 §3.7.1; seam S23R1-21).

######## f item 246 (§2.7) — BASE (M3a).
**Deck plots** (g item 110 (d)) — the record's fields. **Consolidated (volume 2's X28, BCR-V9-30).** A deck plot is a `Plot` whose record gains `deck?: { host: Id; kind: 'bridge'|'pier'|'mole'|'quay'; surfaceCm: Cm | null /* null: a quay platform built on the bank, ground */; landmark: boolean /* a mole's head or mid-mole slot, or a bridge's mid-span slot */ }`; S11 copies it to volume 2's `DeckContext`. A `Bridge` of kind `ford` or `draw`, or with no `deckCm`, offers no deck plot. The landmark slots are a mole's head and midpoint and, on a bridge whose deck span is at least volume 11's `deck.landmarks/bridgeMid/minSpanM` (40 m), one mid-span slot, offered to a tower or fort class only; registry path `deck/landmarks/<head|mid>` (IN-V02-3). Budget and admission are volume 11's `deck` rows and `deckOk` column. A deck's condition is its host's lifecycle existence (ST-56; reconciliation round 1): `deck.host` names a `Bridge` for a bridge deck and a `pier` or `quay` way for a mole, pier or quay platform; volume 6's `breach` makes the host `decayed`, `ruin` makes it `ruined` and `repairRaised` restores its former existence from the op's undo record (BCR-V6-26); `Bridge.state` (`site`|`built`) is untouched, a ruined bridge's crossing closed by its way's existence. *Requests:* BCR-V9-30. *Needed by:* V01, V02, V05, V06, V09, V10, V11. **BASE (M3a).**

[V06 BCR-V6-26: printed above]
--- V09 BCR-V9-30 (lines [4145])
**BCR-V9-30 — a long bridge's mid-span landmark slot (item 110 (d); V9C-58 (7); J-V9.66).** `### 2.7 Walls, gates, towers,
castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records` — the deck
plots as the coherence pass writes them from item 110 (d); there is no current text to quote. The mechanism to add: "A
deck's landmark slots are a mole's head and its midpoint and, on a `Bridge` whose deck span is at least
volume 11's `deck.landmarks/bridgeMid/minSpanM` (volume 11 §3.24.4), one slot at its mid-span — the same mechanism serves both. A slot
is a landmark plot (`DeckContext.landmark`, volume 2 §2.6), offered to a tower or fort class and to no other; its registry
path is `deck/landmarks/<head | mid>` (critique-V10's CVR-V10-8)." Pre-decided fallback, if the coherence pass declines
it: the fort stands on the bridgehead plot, and the first known-city fixture's checklist reads "the fortress at the bridge"
(volume 9 §4.20.4 (7)).

######## f item 247 (§2.7) — STAGED (M6-U, the underground layer).
V04 BCR-3 (V04 §10) — tunnels and chambers. *Needed by:* V04. **STAGED (M6-U, the underground layer).**

--- V04 BCR-3 (lines [3022])
**BCR-3 — tunnels and chambers.** `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records`
* current: "invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; follows?: Id /* way */; outfall?: Outfall; serves: Id[] /* plots or buildings drained */; chambers?: FaceRef; rule: string;"
  — new: "invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; follows?: Id /* way */; outfall?: Outfall /* §2.3; re-seated when its shore moves (II.7.2) */; serves: Id[] /* the plots drained, sorted by address; a plot's buildings drain through it */; chambers?: FaceRef /* a view: the wedges of its end junctions whose Junction.chamber is set, never stored separately */; depthOffsetCm?: Cm /* a hand offset added to the derived invert at every knot; absent 0; setAttr only */; name?: NameRef /* a trunk's or a culvert's name (S13a); a setAttr protects it (§2.8) */; grilles?: Cm[] /* BCR-44: a view, never stored — the stations along the centreline where the run crosses a wall_strip, a quay wall or a sea wall (item 106) */; rule: string;"
* current: "interface Chamber { id: Id; system: Id; outline: ChainRef /* ('chamber_wall', id): its closed L1 chain */; floor: FaceRef /* L1 */; elevationCm: Cm /* its floor */; ceilingCm: Cm /* clear height above the floor: caps what stands in it (II.7.5) */;"
  — new: the same with `kind: ChamberKind /* ossuary, hall, breakdown, workings, cistern, streetVault, bridgeVault, square, storey, market, cellar, storage, and the ruin's temple, court, tomb, vault, room, gate (the underground volume §2.2; C4-29) */;` after `system: Id;`, and `type ChamberKind` declared beside it as the underground volume §2.2 gives it.
* `UndergroundSystem.sources`' comment gains, before "or the undercity neighbourhood's `District`": "the building of a
  subterranean dossier institution whose passage the connection stage dug,".
* The stretch split of II.6 ("its chambers (`Tunnel.chambers`)") reads the view: nothing to re-point.

######## f item 248 (§2.7) — STAGED (M6-U, the underground layer).
V04 BCR-32 (V04 §10) — the system's variant and name (C4-53). *Needed by:* V04. **STAGED (M6-U, the underground layer).**

--- V04 BCR-32 (lines [3287])
**BCR-32 — the system's variant and name (C4-53).** `### 2.7 …` — current: "interface UndergroundSystem { id: Id; kind:
'sewer'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'" — new: "interface UndergroundSystem { id: Id; kind:
'sewer'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'|'ruin'" (g item 109 (b)), and after the kind's comment
`variant?: 'fissure' /* a cavern of ordinary rock at hilly or mountainous relief (item 109 (a) (2)) */; name?: NameRef /*
its label's text (the underground volume §5.4) */;`.

######## f item 249 (§2.7) — STAGED (M6-U, the underground layer).
V04 BCR-33 (V04 §10) — a link's cause; reuse (C4-54). *Needed by:* V04. **STAGED (M6-U, the underground layer).**

--- V04 BCR-33 (lines [3293])
**BCR-33 — a link's cause; reuse (C4-54).** `### 2.7 …` — current: "kind: 'open'|'gated'|'secret'|'collapsed'|'flooded';
via: 'breach'|'stair'|'shaft'|'door'; knownTo: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }" — new:
"kind: 'open'|'gated'|'secret'|'collapsed'|'flooded'; via: 'breach'|'stair'|'shaft'|'door'; knownTo: 'public'|'local'|
'secret'; cause: 'proximity'|'overlap'|'mineBreach'|'reuse'|'lifeline'|'edit'|'dig'|'dossier'|'crypt'|'legacy' /* why it
exists; item 109's "breach" is `via: 'breach'` and its "reuse" is `cause: 'reuse'` — superseding g's HOMES wording "link
kinds breach and reuse" */; rule: string; lifecycle: Lifecycle }"; and the `Chamber` line — current: "closure?:
'collapsed'|'sealed'|'flooded'; knownTo?: 'public'|'local'|'secret'; rule: string; lifecycle: Lifecycle }" — new: the
same with `reusedBy?: { system: Id; since: number } /* an element another system adopted (item 109 (d)) */;` before
`rule`, and the same field on `Gallery`.

######## f item 250 (§2.7) — STAGED (M6-U, the underground layer).
V04 BCR-46 (V04 §10) — the chamber's arch vault, span and monument (C4-110-1, C4-110-8). *Needed by:* V04. **STAGED (M6-U, the underground layer).**

--- V04 BCR-46 (lines [3418])
**BCR-46 — the chamber's arch vault, span and monument (C4-110-1, C4-110-8).** `### 2.7 …`, the `Chamber` line as BCR-3 and
BCR-33 amend it — mechanism: `ChamberKind` gains `'archVault'` (the walled-in arch of a raised way's span, at grade), and
the line gains, before `rule`, `span?: { raised: Id; a: number; b: number } /* an arch vault's span: the raised way and its
two bounding piers' keys (II.7.6's Vaults) */; monument?: { host: 'temple'|'hall'|'tomb'; lay: TierLay; standing: number;
moundCm: Cm; count?: number } /* a ruin chamber's stepped monument (item 110 (c)), laid by volume 2's layTiers and decayed
from the top (the underground volume §3.5.0a) */;`.

**Amendments of the second round (2026-09-29).** BCR-11 (the tail row's times, C4-110-11), BCR-13 (the estimate,
C4-110-12) and BCR-15 (the bars' range) are amended in place above. BCR-20's cistern sentence is superseded by BCR-45's.
BCR-36's count reads the churches of the classes `cathedral`, `great_temple`, `church` and `v.parish_church` (SR1-24) on the ground
and on every live sky island, each once (SL-04), and each
monastery's church (C4-65 (2)). BCR-40's chamber row gives `archVault` the `vault` hatch, and its `ruin` program draws
its column dots at the chamber's modelled points, each standing monument tier's ring with its own shadow, the mound in rubble
stipple, a foundation pillar as a filled square and a drop at a wall as a small filled square (C4-110-8, C4-110-10,
C4-64 (5)). BCR-41's warning codes gain `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR` and
`W_TERMINAL_CISTERN_SKIPPED`. `Basement.crypt` (BCR-V3-20), `Entrance.faces` `'tunnel'` (BCR-V3-21) and PART III's
maintenance mode (BCR-V7-27) are the sibling volumes' requests, read here and not re-filed.

**Amendments of the second reconciliation (2026-09-29).** BCR-13's estimate (28.25–39.25 pw; J-V4.114), BCR-15's range
(T-V4-1 – T-V4-75; SLR1-15), BCR-45's span rule (its heights read through volume 5's `levelledGroundCm`, BCR-V5-30; SLR1-16)
and the BCR-36 paragraph's class key (`v.parish_church`; SR1-24) are amended in place above. No new base change is
requested: the hood line reads volume 1's `Recipe.product` (V01's own request), and `Foundations.apply`, the calamity
deaths, the buried terraces, the village working and the opening pass's callers are this volume's mechanisms over hooks the
base and its sibling volumes already declare.

######## f item 251 (§2.7) — STAGED (M6-sky).
BCR-V5-1 (V05 §10) — the island record and the access record. Also touches: §2.8. *Needed by:* V01, V05 (volume 1's `terraceState` on an island reads `terrainEcho.reliefClass`, V1-3.17.7 (2); SLR3-03; seam SLR4-10 (b), reconciliation round 5). **STAGED (M6-sky).**

--- V05 BCR-V5-1 (lines [2829])
**BCR-V5-1 — the island record and the access record.** Heading: `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records`. Current: "interface
SkyIsland { id: Id; outline: Polygon; elevationCm: Cm; terrain?: Terrain; terrainEcho?: { river?: Id /* the ground river
it echoes */; relief?: 'echo'|'own' }; key: PlatKey /* its own arena, part 1–3 (§2.2) */; districts: Id[]; reason:
'prosperity'|'institution'; institution?: Id; placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment:
boolean }; occlusion: 'opaque'|'ghost'|'offset'; supply: … ; areaHa: number …; state: … }". New: `SkyIsland`,
`UndersideProfile` and `ShadeBasis` as V05 §2.1 declares them (`outline` becomes `rim: ChainRef` and `land: FaceRef`,
since §2.2 rule 5 lets no record store a vertex position; `elevationCm` becomes the reading `groundRefCm + altitudeCm`;
`shadeBasis` added — a persisted copy of the island as the field's shade last read it, written only by a shade
evaluation, in the model digest; `lifecycle` added; the state `removed` with the fields `removed` and `removedAccesses`,
V05 §3.2 (6) and §3.10 (1); `terrainEcho.relief` gains `'none'` and `terrainEcho` the optional `reliefClass`, the relief
class SKY drew for an `own` relief, which volume 1's terrace rule reads, V05 §3.8 (3), V01 V1-3.17.7 (2), seam SLR3-03),
and `SkyAccess` as V05 §2.2 declares it, with the comment "the rules are V05's". In `### 2.8 Identity, lifecycle,
provenance, the entity registry`, in the registry additions of 2026-09-27 and 2026-09-28, add: "`SkyAccess` (§2.7;
lineage unit its island, anchor its island's address, role and ordinal; `placeSkyAccess`, `setAttr`, `delete`, `lock`),
and on `SkyIsland` the fields of V05 §2.1 with their edit kinds (V05 §4.2) and migration hook (V05 §2.6)".

######## f item 252 (§2.7) — STAGED (M6-sky).
BCR-V5-9 (V05 §10) — the landfall decoration and the waterfall. Also touches: §2.3. *Needed by:* V04, V05, V06 (volume 6's clearance writes the decoration's `members`, volume 4's closures read them; TT-10 (b)). **STAGED (M6-sky).**

--- V05 BCR-V5-9 (lines [2943])
**BCR-V5-9 — the landfall decoration and the waterfall.** Heading: `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records` (as BCR-V5-1). Current: "interface
Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, …
data-defined */; face?: FaceRef;". New: add `fallen_island` to the kind comment and the fields "`members?:
DecorationMember[] /* what a fallen island covers, drawn with the ruin program (V05 §3.16 (5)) */; source?: Id /* the
fallen island */; name?: NameRef`", with the type "`type DecorationMember = Id /* a plot, land use, reservation, way or
retaining wall */ | { raised: Id; span: [number, number] /* the span between two support keys, item 244's a and b */ } |
{ raised: Id; support: number /* item 244's support key */ }`" (seam TT-03; J-V5.76). A raised member's keys are
item 244's support keys, minted once along the deck and never reused (volume 4's BCR-45), so a member names the same
pier or span for its raised way's whole lineage — never volume 6's batch-local `SpanRef`, which no record stores; its
geometry is resolved at read through the raised way's record: a span's deck band in plan, a support's `ring`. Heading `### 2.3 Terrain and water`, `WaterBody`: current "flowFrom?: Id; flowTo?: Id;" →
new "flowFrom?: Id; flowTo?: Id; fall?: true /* a sky island's conjured river whose outfall is the rim: a waterfall
(V05 §3.8) */;".

######## f item 253 (§2.7) — STAGED (M6-sky).
BCR-V5-26 (V05 §10) — the landfall's quarried land (C5-25). *Needed by:* V05. **STAGED (M6-sky).**

--- V05 BCR-V5-26 (lines [3208])
**BCR-V5-26 — the landfall's quarried land (C5-25).** Heading: `### 2.7 Walls, gates, towers, castle, bridges; greenery,
land use, decorations, pins; labels; content entities; the staged layers' records`, `interface LandUse`: current
"reclaimed?: { from: 'marsh'|'foreshore'; epoch: number }". New: the same, then "; source?: Id /* a `fallen_island`
decoration whose rubble this `quarry` works (V05 §3.16): a surface rubble working that sources no underground quarry
system, no mine–cavern breach and no dig-down draw (II.7.6) */".

######## f item 254 (§2.7) — STAGED (M6-E, the evolution engine).
BCR-V6-3 (V06 §10) — `Enceinte.pathway` and `Enceinte.underuseSince`. *Needed by:* V06. **STAGED (M6-E, the evolution engine).**

--- V06 BCR-V6-3 (lines [3692])
**BCR-V6-3 — `Enceinte.pathway` and `Enceinte.underuseSince`.** Heading `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records`. Current (the record's first
line): "interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork';". Mechanism:
append V6 §2.7's two optional fields to the record, model data, written by the evolution engine's fortification phase
(`underuseSince`: engine only) and by `setAttr` (`pathway`), each with its registry row (BCR-V6-7).

######## f item 255 (§2.7) — STAGED (the village product, V-M0 to V-M4).
BCR-V7-6 (V07 §10) — two pin kinds. *Needed by:* V07. **STAGED (the village product, V-M0 to V-M4).**

--- V07 BCR-V7-6 (lines [3644])
**BCR-V7-6 — two pin kinds.** `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins;
labels; content entities; the staged layers' records`. Current, in `Pin.kind`: "'stall'|'trough'|'lamp'|'notice'". New:
the union gains `'stocks'|'maypole'` (V07 §3.10); §8.3's symbol catalogue gains their glyphs (V07 §5.1).

######## f item 256 (§2.7) — STAGED (SettlementForge stage, SF0 to SF7).
BCR-V8-14 (V08 §10) — custom chains and services as staged records, and their keys (g item 104). Also touches: §7.7. *Needed by:* V08. **STAGED (SettlementForge stage, SF0 to SF7).**

--- V08 BCR-V8-14 (lines [3040])
**BCR-V8-14 — custom chains and services as staged records, and their keys (g item 104).** `### 2.7 Walls, gates, towers,
castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records`: add
`CustomChainRecord` and `CustomServiceRecord` (V08 §2.8) beside the staged records, schema-complete and filled only by
`dossierRecord`. `### 7.7 …`, item 12's key law. Current: "| a condition; a resource; a quarter; the government |
`cond:<id>`; `res:<key>`; `quarter:<slug(name)>`; `government` | none |". New: "| a condition; a resource; a quarter; the
government; a custom chain; a custom service; a custom library entry | `cond:<id>`; `res:<key>`, or `res:uid:<localUid>`
for a custom resource; `quarter:<slug(name)>`; `government`; `chain:<chainId>`; `svc:uid:<localUid>`;
`def:<definitionId>` | none |". Item 8's list "`ConditionOverlay`, `DepositSite`, `HistoryHint`, `PowerRelation` and the dossier-backed
`Person` (§2.7)" gains "`CustomChainRecord`, `CustomServiceRecord`".

######## f item 257 (§2.7) — STAGED (SettlementForge stage, SF0 to SF7).
BCR-V8-26 (V08 §10) — the power relation's sign and visibility (C8-10). *Needed by:* V08. **STAGED (SettlementForge stage, SF0 to SF7).**

--- V08 BCR-V8-26 (lines [3135])
**BCR-V8-26 — the power relation's sign and visibility (C8-10).** `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records`, `PowerRelation`. Current:
"`kind: string /* the dossier's pair type: alliance, rivalry, feud … data */; strength: number /* 0–1 */;`". New: "`kind:
string /* the neutral kind of tables/dossier/relations: ally, dependent, subordinate, rival, tense, corrupt, neutral */;
sign: -1 | 0 | 1 /* attraction or repulsion for §4.5's typing */; hidden: boolean /* never named on a public view (DR20)
*/; strength: number /* 0–1, the row's strength × its trend factor */;`" — the key stays unordered (V08 §2.3, J-V8.52).

######## f item 258 (§2.7) — BASE (M2b, V11 C4's wall rows with item 106's base).
BCR-V11-5 (V11 §10) — the wall rows (g item 106). *Needed by:* V11. **BASE (M2b, V11 C4's wall rows with item 106's base).**

--- V11 BCR-V11-5 (lines [4444])
**BCR-V11-5 — the wall rows (g item 106).** Section `### 2.7 Walls, gates, towers, castle, bridges; greenery, land use,
decorations, pins; labels; content entities; the staged layers' records`. Mechanism to add (after g's `barrier` closure
and `ChainProfile` land): "The arc classification reads `walls.barriers` (`WallBarrierRow`) and the waterfront
`walls.waterfront` (`WaterfrontThreatRow`), both declared as V11 §2.7 and written as V11 §3.16."

######## f item 259 (§2.7) — BASE (M3a, V11 C3b).
BCR-V11-27 (V11 §10) — the culture specialisation (item 110 (c); V11C-35). Also touches: §4.7. *Note (SCC-R0C-1; reconciliation round 1, continuation):* its S11 replacement writes the band template's `composition`, the field item 426 (BCR-V2-09) declares, built with it at M3a. *Needed by:* V11. **BASE (M3a, V11 C3b).**

--- V11 BCR-V11-27 (lines [4612])
**BCR-V11-27 — the culture specialisation (item 110 (c); V11C-35).** Section `### 2.7 Walls, gates, towers, castle, bridges;
greenery, land use, decorations, pins; labels; content entities; the staged layers' records`, `Use`. Current text:
"`specialisation?: string /* the designation template's discrete row at the band (§4.7 S11, item 19) */;`". New text:
"`specialisation?: string /* the designation template's discrete row at the band (§4.7 S11, item 19), or a culture
specialisation of volume V11 §3.24.3 drawn once at the use's first building (item 110 (c)) and held once set */;`". And
section `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the
plot model`, S11, mechanism to add: "before the composition resolves, S11 draws the use's culture specialisation once — on
`siteplan` keyed by (the use's lineage, `'spec'`), against the row's `chance`, the cap `max(capMin, ⌊capShare × S2's
building count⌋)` counted in roster sequence order; a user-set, declared or keyword specialisation is exempt from the
chance and the cap and never overwritten; the chosen row's `composition` and `heights` replace the band template's".
--- V02 BCR-V2-09 (lines [3694])
**BCR-V2-09 — the composition key on the template; the heights row named (from M3a, with BCR-V2-39; reconciliation round 1, SCC-R0C-2).** `### 10.2 Roster (data-driven, replaceable;
sequential and prefix-stable; our values)`. Current: "`programme: string /* item 28: the key of a RoomProgramRow (below),
which the plan rung of §2.6 reads */;`". New: insert after it "`composition?: string /* stage 3: the key of the
CompositionRow (volume 2 §2.3) the massing and the composer read for the main slot; absent: volume 2 §3.2's resolution
chain (the class override, the template family, the arrangement's default) */;`"; in the `structures` entries add
"`composition?: string /* the slot's own composition row; absent: volume 2 §3.2's role chain */`". Current: "`floors:
[number, number]; heights: string /* the class heights row */`" → "`… heights: string /* the template family's HeightsRow
(volume 11 §2.8, with volume 2's BCR-V2-26 columns) */`".

######## f item 260 (§2.8) — BASE (M3a (raised way, harbour chain, quay wall, retaining wall, deck plot); islands and accesses M6-sky).
**Removals that hold**: one suppression rule for re-adding generators, in two record forms (J-VI.14; amended by reconciliation round 1, ST-05, ST-15). BCR-V6-24 as written, its `suppress.kind` widened to `'raised'|'harbourChain'|'quayWall'|'retaining'|'deckPlot'`: a generated retaining wall is keyed by its chain's lineage address, a generated deck plot by its deck host's id and its slot ordinal along the deck; the re-derivation of walls where an epoch levels and the deck-face tier skip a suppressed key and count it as held (volume 6 §2.13, §3.19.4 (1), §3.19.5 (1)). **Islands and sky accesses keep volume 5's record form** and are never written to `detail.suppress`: `SkyIsland.removed` and `.removedAccesses`, written by `convert removeIsland` and by the fold of an access's `delete`, read through `removedSlots(doc)` (volume 5 §2.1, §3.15 (5)). One lift rule for both forms: only the removal's undo, or the user's own re-add serving the same key; a cap increase opens only new keys (volume 8's X8, C5-51). BCR-V8-31 (§7.7 item 3: generated content no dossier record binds is deleted as any generated content, and the deletion holds through regeneration, every absorb and every epoch) applies beside it. *Requests:* BCR-V6-24, BCR-V8-31. *Needed by:* V01, V02, V05, V06, V08, V09, V10. **BASE (M3a (raised way, harbour chain, quay wall, retaining wall, deck plot); islands and accesses M6-sky).**

--- V06 BCR-V6-24 (lines [3890])
**BCR-V6-24 — a removal that suppresses its generator's key (C6-38; J-V6.83).** (a) Heading as BCR-V6-20 (§2.8), the same
`LifecycleEvent.detail` BCR-V6-20 quotes. Mechanism to add, after BCR-V6-20's `why?`: "; suppress?: { kind:
'raised'|'harbourChain'|'quayWall'|'retaining'|'deckPlot'; key: string; reason?: RaisedReasonKey; enceinte?: Id; water?:
Id; chain?: string; host?: Id; slot?: number } /* written by the `delete` operator when it removes an entity whose
lifecycle cause is a generation or epoch rule of a re-adding generator — a raised way (item 110 (b)), a harbour-mouth
chain or a quay wall (item 106), a retaining wall (item 110 (a); keyed by its chain's lineage address) or a deck plot
(item 110 (d); keyed by its deck host's id and its slot ordinal along the deck): every such generator derives the
suppressed set from the log's live removals, skips the key and counts it as filled against its caps; lifted only by the
delete's undo, or held by a user's re-add serving the same key; islands and sky accesses keep volume 5's record form under
the same lift rule; volume 6 §2.13, §3.19.3 */" (ST-15, ST-59; file f item 260), with `RaisedReasonKey` as volume 6
§2.13 states it. (b) Heading `### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run
validation`. Mechanism to add to the `delete` action: its dry run for such an entity names the suppression in plain words
("The city will not rebuild this aqueduct; undo brings it back") with the entity's fates (volume 6 §3.19.3 (6)).
--- V08 BCR-V8-31 (lines [3171])
**BCR-V8-31 — generated content no dossier record binds (C8-42; g item 110).** `### 7.7 …`, the dossier contract's item 3.
Current: "3. *Rejection, not deletion.* A map "delete" of a dossier-backed element is the `rejectSite` event (§7.1):".
New, after its first sentence: "A generated entity that no dossier record binds — a raised way, a retaining wall (a generated
terrace's walls among them) or a deck plot among them (g item 110) — is deleted as any generated content (§7.1), and the deletion holds through
regeneration, every absorb and every epoch; a dossier record read as an input of its reason does not bind it."

######## f item 261 (§2.8) — STAGED (M6, stage 3).
BCR-V2-13 (V02 §10) — the rungs' recorded inputs. *Needed by:* V02. **STAGED (M6, stage 3).**

[V02 BCR-V2-13: printed above]

######## f item 262 (§2.8) — STAGED (M6-P, the plan rung).
BCR-V3-22 (V03 §10) — plan addresses in the explainer registry. *Needed by:* V03. **STAGED (M6-P, the plan rung).**

--- V03 BCR-V3-22 (lines [2973])
**BCR-V3-22 — plan addresses in the explainer registry.** Heading: `### 2.8 Identity, lifecycle, provenance, the entity
registry`, the explainer registry as volume 10's BCR-V10-3 adds it ("`interface WhyProvider { kinds: string[];
explain(model: ModelView, id: Id, path: string | undefined, key: Knowledge): WhyAnswer }`"). Mechanism: after it add "An
address whose prefix is `room:` resolves to the kind `room`, whose provider (volume V03 §4.6) resolves it through its
building's plan — stored, cached or derived into the cache as the `plan` query does — so plan parts need no registry
entry (§6.2)."

######## f item 263 (§2.8) — STAGED (M6-P, the plan rung).
BCR-V3-28 (V03 §10) — the outside ground among a plan's inputs. *Note:* Applied after item 261 (BCR-V2-13): its additions go to the `plan` rung's inputs in the per-rung `inputs` comment and `stale` sentence (S23-39; reconciliation round 1). *Needed by:* V03, V06. **STAGED (M6-P, the plan rung).**

[V02 BCR-V2-13: printed above]
--- V03 BCR-V3-28 (lines [3033])
**BCR-V3-28 — the outside ground among a plan's inputs** (V3C-71; J-V3.97). Heading: `### 2.8 Identity, lifecycle,
provenance, the entity registry`, `ElaborationRecord.inputs`' comment, as BCR-V2-13 splits it per rung and BCR-V3-19 words
the **`plan` rung's list** (applied after both; S23-39): after "the accesses it
hosts, each with its kind, state and knowledge" add ", the outside ground — the digest of the `RetainingWall`s within
`cellar.insetCm` + `door.mainCm` of the footprint, of the surface samples volume V03 §3.6 W2 reads outside each exterior
wall (the values §4.7's levelled-ground reader `levelledGroundCm` returned there, and its deck, water and roof samples)
and, for a building below ground, of its host chamber's ring and grade faces (volume V03 §3.12 (9))". In the `stale`
sentence, after BCR-V3-19's "an access it hosts, its crypt" add ", a retaining wall, the terrain or a levelled platform's
datum, a deck or the host chamber beside it" — inputs of the `plan` rung only: a retaining wall drawn beside a house
stales its plan, never its `wings` or `rooms` rung.

######## f item 264 (§2.8) — STAGED (M6-E, the evolution engine).
BCR-V6-7 (V06 §10) — `MutationPlan` in the registry and the step on `mutate`; the registry's new paths. Also touches: §7.1. *Needed by:* V06. **STAGED (M6-E, the evolution engine).**

--- V06 BCR-V6-7 (lines [3732])
**BCR-V6-7 — `MutationPlan` in the registry and the step on `mutate`; the registry's new paths.** (a) Heading `### 2.8
Identity, lifecycle, provenance, the entity registry`. Current (the sentence after which to add): "The amendments of
2026-09-27 and 2026-09-28 (items 63–88, 101) add:". New sentence after that list: "Volume 6 adds `MutationPlan` (lineage
unit its plot, anchor the plot's address; edit kinds `setAttr` of a step's `dueWeek` and `delete`), `Enceinte.pathway`
(`setAttr`) and `Enceinte.underuseSince` (engine only), `Way.formerClass` (the engine and the `fallIsland` convert; never
a hand `setAttr` target — a `setAttr` of `class` clears it; TR-19), `Use.strain` (`setAttr`) and
`BuildingShadeMask` (one per arena — the ground's and each live island's — engine only; ST-37), each in §13.2's path-completeness test." (b) Heading as BCR-V6-1 (a).
Current: "| { op: 'mutate'; plot: Id; to: Designation; spread?: 'now' | 'epochs' /* §4.7 S11's operator; 'epochs' issues
its steps over the ladder's durations */ };". New: add `step?: { plan: Id; step: 'adapt'|'extend'|'rebuild' }` — the op
then applies exactly that step's parts of the plan's stored `MutationRecord` (volume 6 §3.10). (c) Heading `### 7.1 Edits
are ordered events on addresses; the named actions; the edit targets; dry-run validation`: the edit-target table gains the
row "mutation plan (volume 6) | `setAttr` of a step's `dueWeek`; `delete`; a `mutate` with its step".

######## f item 265 (§2.8) — BASE (M3a, item 110 (b)'s generation and removal holds).
BCR-V6-20 (V06 §10) — why rows on lifecycle events (J-V6.71). *Needed by:* V06. **BASE (M3a, item 110 (b)'s generation and removal holds).**

--- V06 BCR-V6-20 (lines [3854])
**BCR-V6-20 — why rows on lifecycle events (J-V6.71).** Heading `### 2.8 Identity, lifecycle, provenance, the entity
registry`. Current (the end of `LifecycleEvent.detail`): "works?: { startWeek: number; durationWeeks: number } /* item 67: the
timetable of the Works that carried this change, kept here when the Works record retires (§4.11) */ } }". New: insert before
the closing braces "; why?: { row: string; family: string; share: number; good?: string; other?: Id }[] /* ≤ 5: the rows that
pulled a use's opening, relocation or closing, a circuit's conditions, or a raised way's reason, its values and its gate —
written by the evolution engine (volume 6 §3.9.7, §3.7.1, §3.19) and by the base's raised-way generator at creation
(BCR-V6-25); model data in the identity layer, read by the explanation providers */".

######## f item 266 (§2.8) — STAGED (M6-E, the evolution engine).
BCR-V6-21 (V06 §10) — the epoch-spread mutation as the history engine applies it (item 18 (c), (e); J-V6.27). *Needed by:* V06. **STAGED (M6-E, the evolution engine).**

--- V06 BCR-V6-21 (lines [3862])
**BCR-V6-21 — the epoch-spread mutation as the history engine applies it (item 18 (c), (e); J-V6.27).** Heading as BCR-V6-1
(a), the paragraph *The epoch-spread mutation (item 18 (c))*. Current: "§4.7 S11's `MutationRecord` as a sequence of `mutate`
events over the ladder's rung durations (item 31) — first occupy, when the present design is compatible (every kept part,
nothing added); then adapt; then extend (the adds); and rebuild only the parts that cannot be adapted". New: "§4.7 S11's
`MutationRecord`, **decided once at the creating op**, as a sequence of `mutate` events each applying its own parts of that
record, due at the evolution table's `mutation.stepYears` rows (volume 6 §2.2) — first occupy, when the present design is
compatible (every kept part, nothing added; an always-crypt target's crypt basement exempt and laid then); otherwise the
use opens at the first step whose result is compatible, a relocating use staying at its former site until then; then adapt;
then extend (the adds); and rebuild only the parts that cannot be adapted. A plan cancelled because its use left keeps its
done steps; when the building next takes its former designation, the mutator's record is the inverse of the done steps
(item 18 (e))". The sentence "Each of those events decides and records its step at once, as a host or user change does
(§4.7 S11 step 6)" reads "Each of those events applies and records its step at once".

######## f item 267 (§2.8) — STAGED (the village product, V-M0 to V-M4).
BCR-V7-3 (V07 §10) — three entity kinds. *Needed by:* V07. **STAGED (the village product, V-M0 to V-M4).**

--- V07 BCR-V7-3 (lines [3625])
**BCR-V7-3 — three entity kinds.** `### 2.8 Identity, lifecycle, provenance, the entity registry`. Current: "* **The entity
registry** (`@plat/model`) declares per entity type: generator stage and **lineage unit** (§6.3);". Mechanism to add:
the registry gains `VillagePlan` (stage VS1, lineage unit the town root), `VillageEnd` (VS8, its anchor's lineage and
kind) and `VillageField` (the hinterland unit, its seed furlong) with every path the registry declares — digest,
persistence, symbols per band, export mapping (V07 §5.4), edit kinds with undo and lifecycle rows (V07 §2.6, V07 §4.4),
migration hooks, dossier paths (V07 §3.11: ends from quarters) — so §13.2's completeness test covers them. They are
registered by `@plat/village` and absent from a base-only build.

######## f item 268 (§2.8) — STAGED (the village product, V-M0 to V-M4).
BCR-V7-32 (V07 §10) — the ways' decline ladder. *Needed by:* V06 (its decline and regrowth issue `retireWay`, `effaceWay` and `reopenWay`, TR-03), V07. **STAGED (the village product, V-M0 to V-M4).**

--- V07 BCR-V7-32 (lines [3844])
**BCR-V7-32 — the ways' decline ladder** (as amended by the second revision, critique V7C-41, and by reconciliation
round 1, ST-27; J-V7.98). (a) `### 2.8 Identity, lifecycle, provenance, the entity registry`, *The decline and regrowth
hooks*. Current: "*islands* `SkyIsland.state` (§2.7)". Mechanism to add before it: "*ways on ground part 0 of the land
classes* (`through`, `primary`, `secondary`, `lane`, `alley`, `cul_de_sac`, `track`, `path`) at a village rung: in use →
disused (`abandoned`: a hollow way, retired from the network — no router, tracker or merge test reads it; its disuse
epoch the lifecycle's `since.epoch`) → effaced (`decayed`), reopened to `built` by regrowth first (volume 7 §3.12) — by
`DeclineOp`'s `retireWay`, `effaceWay` and `reopenWay` (§4.11), the decline step's street candidate striking at the street
layer's rate per year (§4.11 *The clock* (5)); retirement is not volume 6's `downgradeWay`, whose primaries never
downgrade at any rung; the crossing and water classes (`bridge`, `pier`, `quay`, a mole) and every raised part never
become hollow ways — a bridge, pier, mole or quay deck is struck to `decayed` or `ruined` by volume 6's deck candidate
(its `DeclineOp` deck member), a raised way declines by stretch with its supports persisting (volume 6) — a `ford` retires
with its carried way and is never a hollow way, and a deck's plots fall with it (item 110 (d));". A `cleared` building is
already the footprint trace the village draws as a house platform (no change). (b) `### 4.11 Incremental mode,
transformations and conversions (the evolution hook; one path built in the base)`, `DeclineOp`. Current:
"| { op: 'neglect' | 'breach' | 'dismantle'; enceinte: Id; stretch?: StretchRef }". New member, after that member and volume 6's three
item-110 members (BCR-V6-26): "| { op: 'retireWay' | 'effaceWay' | 'reopenWay'; way: Id }   // a way of a land class on
ground part 0 at a village rung (volume 7 §3.12): retire — in use → abandoned (a hollow way); efface — abandoned →
decayed; reopen — a hollow way back to built, regrowth first; issued through the product's epoch rows (volume 6's
ProductDeclEpoch.rows) or by hand through `convert`; never on a deck, a ford or a raised part".

######## f item 269 (§2.8) — BASE (M1–M3b, the reference UI (AP1–AP4)).
BCR-V9-19 (V09 §10) — a label and a help anchor per edit path. *Note:* Applied after BCR-V10-3. *Needed by:* V09. **BASE (M1–M3b, the reference UI (AP1–AP4)).**

--- V10 BCR-V10-3 (lines [3091])
**BCR-V10-3 — each kind's explainer in the registry.** `### 2.8 Identity, lifecycle, provenance, the entity registry`.
Current: "for a named kind; pick behaviour; **edit kinds with their undo path and lifecycle row** (§7.1, §7.4); migration
hooks". New: "for a named kind; pick behaviour; **edit kinds with their undo path and lifecycle row** (§7.1, §7.4); **its
explainer** — the `WhyProvider` that answers §11.2's `why` for the kind (V10 §3.9), the base's kinds by the defaults of
V10 §3.9 and each staged layer's by its own registration; migration hooks", and the completeness test's list gains the
explainer, so a kind without one fails it. Three further additions to the same registry paragraph (C10-01 (2), C10-11;
J-V10.41, J-V10.48): (a) each readable path is marked `purpose: boolean` — true where the value names or implies the
entity's purpose (its class, use, function, sector, powers, a crypt or catacomb path) — and the knowledge filter keeps
only `purpose: false` paths for a withheld entity; (b) a registry of **section providers** (`WhySectionProvider`, V10
§2.13) whose rows the facade appends to every `why` after the kind's provider, in registration order, and filters
generically; (c) a **generic provider** answers any registered kind without a specific one (its readable paths, its
latest lifecycle event and derivation record, its history), and the completeness test checks a specific provider or
section provider only for the kinds and sections V10 §3.9's owed table lists, naming the owing volume.
--- V09 BCR-V9-19 (lines [3969])
**BCR-V9-19 — a label and a help anchor per edit path.** `### 2.8 Identity, lifecycle, provenance, the entity registry`,
*The entity registry*. Current: "**edit kinds with their undo path and lifecycle row** (§7.1, §7.4);". New: "**edit kinds with
their undo path and lifecycle row** (§7.1, §7.4), and per editable attribute path a display `label` (a message-catalogue key)
and a `help` anchor in `@plat/docs` — read by the reference UI's generated context panel (volume 9 §4.4) and by the guide;
the completeness test covers them;".

######## f item 270 (§2.8) — BASE (M3a, the oracle and the tool API (item 101)).
BCR-V10-3 (V10 §10) — each kind's explainer in the registry. *Note:* Applied before BCR-V9-19 (same registry paragraph). *Needed by:* V01, V02, V03, V06, V09, V10. **BASE (M3a, the oracle and the tool API (item 101)).**

[V10 BCR-V10-3: printed above]
[V09 BCR-V9-19: printed above]

######## f item 271 (§2.8) — BASE (M3a, the oracle and the tool API (item 101)).
BCR-V10-15 (V10 §10) — the placement order on the derivation record. Also touches: §4.7. *Needed by:* V10. **BASE (M3a, the oracle and the tool API (item 101)).**

--- V10 BCR-V10-15 (lines [3245])
**BCR-V10-15 — the placement order on the derivation record** (C10-05; J-V10.44). `### 2.8 Identity, lifecycle,
provenance, the entity registry`. Current: "params: Hash64 /* digest of the effective parameters read */; slices:
SliceRef[] /* the table slices consulted */ }". New: "params: Hash64 /* digest of the effective parameters read */;
slices: SliceRef[] /* the table slices consulted */; placements?: PlacementOrder[] /* S10b, for each use placed on this
plot: the event whose run placed it, its index in that run's order and its pass (V10 §2.13); read only by the solver's
explanation */ }", with `PlacementOrder` declared after it exactly as V10 §2.13 gives it. And in `### 4.7 S9 Corridors ·
S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model`, after BCR-V10-2's
*Explanation* paragraph: "S10b records, for every item it places, its `PlacementOrder` on the derivation record of the
plot it stands on — `seq` the event whose run placed it (0 at generation), `k` its index in the run's order (claims first,
then item 105 (f)'s anchors first), `pass` 2 when the relaxation pass moved it — so `explain`'s `asPlaced` reading scores
against the members placed before it." **Declared one-time shift:** the records digest (§6.2) gains these bytes, so its
goldens are re-recorded once at the milestone that lands this request; the model digest does not move, and an older
document without them answers `asNow` with `exact: false` (V10 §2.14).

######## f item 272 (§2.9) — BASE (M1) for (a)'s `Recipe.product`; STAGED (M5, stage 2) for the rest.
V01 BCR-12 (V01 §10) — `Recipe.product` and `HoodRecipe` for a standalone neighbourhood; the `closeup` event. Also touches: §7.1. *Build (SCC-R3C-5; reconciliation round 4, continuation):* (a)'s `product?` at M1 with the schema, absent (read `town`) until M5's standalone neighbourhood (volume 1 §8.1); (a)'s `hood?`, (b), (c) and (d) at M5. *Needed by:* V01. **BASE (M1) for (a)'s `Recipe.product`; STAGED (M5, stage 2) for the rest.**

--- V01 BCR-12 (lines [3442])
**BCR-12 — `### 2.9 The document and serialisation` and `### 7.1 Edits are ordered events on addresses; the named
actions; the edit targets; dry-run validation`.** (a) `Recipe` gains "`product?: 'town'|'hood' /* absent reads 'town';
'hood' a standalone neighbourhood (volume 1, V1-3.10.1) */; hood?: HoodRecipe /* present exactly when product is 'hood'
(V1-2.6) */;`". (b) Current "`| { t: 'closeup'; district: Id; strategy: FabricStrategyId; params: Record<string, number>
}`" → "`| { t: 'closeup'; district: Id; strategy: FabricStrategyId /* informative: the district's fabric at the event */;
params: CloseupParams /* volume 1, V1-2.5 */ }`". (c) The toolkit table: T1 `intend` gains `product`; T6 `place` the
furniture stamp; T8 `fill` `fabric` on a district scope; T11 `name` a new place on an unnamed court, yard or square; T12
`dress` the close-up's `pinGate` and vignette (V1-4.2); the events columns by BCR-35. (d) The edit-targets row "close-ups
(stage 2)", current "every kind above on close-up entities, after `closeup`; `instance` for presentation edits" → "`instance`
on a hood pin (its block and ordinal) and the close-up's params, after a `closeup` event; every other close-up entity is a
base entity edited as one, with no `closeup` event; a district's layout is `setAttr(fabric)` + `regenerate` (T8), a
block's content `setAttr(content)` (T9), a local place's name and knowledge `setAttr` (T11) — volume 1, V1-4.1" (V1C-53).

######## f item 273 (§2.9) — STAGED (M6-P, the plan rung).
BCR-V3-8 (V03 §10) — the report in the cache. *Needed by:* V03. **STAGED (M6-P, the plan rung).**

--- V03 BCR-V3-8 (lines [2827])
**BCR-V3-8 — the report in the cache.** Heading: `### 2.9 The document and serialisation`. Current (`ElaborationChunk`):
"a derived Composition, Plan or close-up, or one memoised step of a re-cut chain (§2.6)". New: "a derived Composition,
Plan (with its `PlanReport`, V03 §2.3) or close-up, or one memoised step of a re-cut chain (§2.6)".

######## f item 274 (§2.9) — STAGED (M6-sky).
BCR-V5-21 (V05 §10) — the island's shade basis on load (C5-01). *Needed by:* V05, V06. **STAGED (M6-sky).**

--- V05 BCR-V5-21 (lines [3157])
**BCR-V5-21 — the island's shade basis on load (C5-01).** Heading: `### 2.9 The document and serialisation`, *What the
snapshot holds*. Current: "an editable document recomputes them from their drivers and the stroke list on load (§4.5,
§7.2)". New: the same, then "— the one sky input that recomputation reads is each island's persisted `SkyIsland.shadeBasis`
(V05 §2.1), from which the islands' shade strips are rebuilt, never the island as it now stands, so the shade's lag
behind an island edit (item 102 (e)) survives a save, a load and a replay; an island without a basis — raised or declared
since the last shade evaluation — casts and receives none, and the load never computes a basis from its absence". Heading
`### 7.5 Migration and upgrade (G-P9)`, item 1. Current: "a sequence of pure, versioned transforms over the document
format, forward only". New: the same, then "— among them the sky's island-basis step (V05 §2.6): a document whose
`schemaVersion` predates it gets, once, the `shadeBasis` of every island not fallen or removed, computed from the island
as stored" (seam ST-49).

######## f item 275 (§2.9) — STAGED (M6-E, the evolution engine).
BCR-V6-13 (V06 §10) — the building shade mask (g item 102 (b), (e)). *Needed by:* V06. **STAGED (M6-E, the evolution engine).**

--- V06 BCR-V6-13 (lines [3793])
**BCR-V6-13 — the building shade mask (g item 102 (b), (e)).** Heading `### 2.9 The document and serialisation`. Current:
"interface ChunkRef { block: 'geometry'|'entities'|'archive'|'history'|'fields';". Mechanism to add: the `fields` block
holds, besides the field rasters, one `BuildingShadeMask` per arena — the ground's and each live island's (volume 6
§2.6; ST-37) — model data, in the digest,
written only by an epoch's field phase; and in §4.5's daylight driver (as the coherence pass writes it from g item 102):
"at and after an epoch, the driver's casters include the buildings as that epoch's mask records them".

######## f item 276 (§2.9) — STAGED (the village product, V-M0 to V-M4).
BCR-V7-12 (V07 §10) — the recipe's rung. *Needed by:* V07. **STAGED (the village product, V-M0 to V-M4).**

--- V07 BCR-V7-12 (lines [3687])
**BCR-V7-12 — the recipe's rung.** `### 2.9 The document and serialisation`. Current: "rung: Rung; tablePins:
Record<TableId, string>;". Mechanism: `Rung` is BCR-V7-1's widened type; the replay runs the stage set of the product
that registered the recipe's rung; a reader without that product refuses to replay, naming it (§7.5).

######## f item 277 (§2.9) — BASE (M1–M3b, the reference UI (AP1–AP4)).
BCR-V9-3 (V09 §10) — three view keys. *Needed by:* V09. **BASE (M1–M3b, the reference UI (AP1–AP4)).**

--- V09 BCR-V9-3 (lines [3816])
**BCR-V9-3 — three view keys.** `### 2.9 The document and serialisation`, *View state*. Current: "season, weather, frame,
map rotation, compass, legend and emblem settings, `exportAnchor` (§11.1)". New: "season, weather, frame, map rotation,
compass, legend and emblem settings, `exportAnchor` (§11.1), `thematic` (per viewer: the thematic view shown — `none`,
`wealth`, `shade`, `links`, `quarters`, `uses`, `knowledge`, `coverage`, `voids`, `supplyChains` (volume 8 §5.2's view of
SettlementForge's active custom chains, BCR-V8-15; reconcile-V09-r1, SS-41); volume 9 §5.4), `workingLayer` (per viewer: the layer the
tools act on — ground, a sky island's `PlatKey`, or an underground depth band; volume 9 §4.2), `restore/<id>` (shared, one
key per restore point: `{ seq, name, auto?, createdAt, session }`, written to `null` to delete; volume 9 §2.8)". §11.3's
*View state* list gains `thematic` and `workingLayer` among the per-viewer keys that travel by `view.set` and never cross
to other clients as shared state, and `restore/<id>` among the shared keys.

######## f item 278 (§2.9) — STAGED (M6-U, with the underground layer (AP6)).
BCR-V9-20 (V09 §10) — the hidden-voids view key and its knowledge rule (item 109 (j) (2); V9C-04; J-V9.38). Also touches: §11.3, §11.1. *Needed by:* V04, V09. **STAGED (M6-U, with the underground layer (AP6)).**

--- V09 BCR-V9-20 (lines [3975])
**BCR-V9-20 — the hidden-voids view key and its knowledge rule (item 109 (j) (2); V9C-04; J-V9.38).** (a) `### 2.9 The
document and serialisation`, *View state*. Current: "`handLantern` (underground only; off by default)". New:
"`handLantern` (underground only; off by default), `showUnexcavated` (underground only; per viewer; off by default: draw the
caverns and ruins nobody in town has found in V04's unexcavated style — honoured only for a key of tier `secret`, read as
`false` by any other; volume 9 §4.17.1)". (b) `### 11.3 The host bridge — the host is the store (FTG-12)`, *View state*.
Current: "and so do the light keys `light`, `sunMode`, `sunHeight` and `handLantern` (§8.4; item 68)". New: "and so do the
light keys `light`, `sunMode`, `sunHeight` and `handLantern` (§8.4; item 68) and the per-viewer `showUnexcavated` (volume 9
§4.17.1)". (c) `### 11.1 Formats`, *Knowledge*. Current: "nor the lights, glows and shafts those hosts carry (§8.1 item 7;
J-A63.82)." New: the same, then "An unexcavated cavern or ruin element (volume 4's excavation reading), its label, its links
and its lights are admitted only at tier `secret`: a picture draws them only when the request's view has
`showUnexcavated` on, GeoJSON and glTF carry them only at `secret`, and a VTT scene never." The request replaces V04's
`LayerSpec.showUnexcavated` field of BCR-10 (V9 §10.2 XV-V9-3).

######## f item 575 (§2.7) — BASE (M4, with §4.11's decline table and `DeclineOp`).
**An enceinte's condition by stretch** (integration; reconciliation round 2, found beside TR-14). **Consolidated.** §4.11's wall ladder marks a breached or partly dismantled stretch by a `StretchRef` ("the gap a `StretchRef`") and §8.2's `decayed` row draws "a gap glyph over each breached stretch", but a `StretchRef` is batch-local and never stored (§3.4), so no field holds which stretch is breached — the defect TR-14 found in the retaining wall. `Enceinte` (§2.7) gains `condition?: WallCondition | ChainProfile<WallCondition> /* 'wall_state_knot' on the trace, step (§2.2 rule 5, J-K10); absent = 'standing' throughout */` with `type WallCondition = 'standing'|'breached'|'dismantled'`, written, read, persisted, carried through a re-derivation, cut or joined, undone and migrated exactly as item 245's `state` profile (its canonical form included); its writers: `DeclineOp`'s `breach` (→ `breached`) and `dismantle` (→ `dismantled`) over their `stretch`, the whole trace when they name none; volume 5's landfall over the walls it covers (→ `breached`); volume 6's `repairWall` (a `breached` run back to `standing`; on a `dismantled` run it bends as volume 6 §2.8 states; with no stretch, volume 6's lift of the ring's `neglect` (V6 §2.8)). The record's `lifecycle` stays the ops' (`abandoned` on `neglect`, until volume 6's no-stretch `repairWall` lifts it — back to the pre-neglect existence when every run is `standing`, else `decayed`; `decayed` while any run is not `standing`; back to its former state when `repairWall` leaves every run `standing`). §2.2 rule 7's knot roles gain `wall_state_knot`. §8.2's `decayed` row draws its gap glyph over each `breached` run and the towers of each `dismantled` run as trace discs; §11.1's wall LineStrings split per run of equal condition, each run's LineString carrying its enceinte's `id` (§11.1's entity address) and `run`, its ordinal from the trace's first vertex in vertex order, as item 447's retaining runs do (SCC-86; reconciliation round 4), `condition` absent when standing. *Note:* Applied after item 254 (BCR-V6-3), whose `pathway` and `underuseSince` it follows on the `Enceinte` line. The no-stretch `repairWall` and the exit from `abandoned` are volume 6's hand-off X42 (seam TV-05, TU-02's residual; reconciliation round 5): no field changes, the op being BCR-V6-5's `EvolveOp` as V6 §2.8 states it (J-V6.115). *Requests:* — (integration). *Needed by:* V05, V06, V12 (V12 §2.2 merges the runs by the enceinte's `id`, T-V12-4 reads them; SCC-86). **BASE (M4, with §4.11's decline table and `DeclineOp`).**

[V06 BCR-V6-3: printed above]
[V06 BCR-V6-5: printed above]

######## f item 578 (§2.6) — STAGED (M6-P, the plan rung) for the step-3 and T28-3 texts; `basementDoor(b)` itself BASE (M3a, with item 242), its crypt clause with item 238 (M6-U).
BCR-V3-32 (V03 §10) — the outside door of an external basement: the plan rung's step 3 and §13.2's T28-3 read `basementDoor(b)` (S23R3-01), volume 3 §3.7.1's derived function — pure, draw-free, of eager records only, null unless `Basement.access` is `external` — so the wall walk-out, the tomb door and the fall walk-out have one producer. Also touches: §13.2 (T28-3). *Note (S23R3-06; reconciliation round 4):* applied after items 371 (BCR-V2-33) and 242 (BCR-V3-27). `basementDoor(b)` itself, implemented in `@plat/plots`, lands with item 242 at M3a, so volume 1's entrance reserve (M5) can call it; the step-3 and T28-3 texts are the plan rung's. `basementDoor(b)` reads `moduleCm` and `door.mainCm`, shipped with it at M3a (item 233's note), and the basement gate's `cellar.insetCm` and `cellar.depthCm` (M2b) (S23R2-09; reconciliation round 3, continuation). The step-3 text's crypt clause and `basementDoor(b)`'s door point off the crypt's vault read `Basement.crypt` (item 238) and are built with it at M6-U, inert before; their first reading moves a walk-out church's door off its crypt once, volume 1's entrance reserve with it, declared in M6-U's shift record (item 238's note; volume 3 §8's PE; seams S23R4-03, S23R5-04; reconciliation round 6). *Needed by:* V01, V02, V03. **STAGED (M6-P, the plan rung) for the step-3 and T28-3 texts; `basementDoor(b)` itself BASE (M3a, with item 242), its crypt clause with item 238 (M6-U).**

--- V02 BCR-V2-33 (lines [3981])
**BCR-V2-33 — the storeys a wing reaches (item 110 (c); item 110 fold).** Same heading, the interior ladder's *One
capacity function*. Current: "`A(s)` the exact integer twice-area (`area2`, §3.2 (6)) of the union of the extents of the
building's base wings (`Building.wings`, with their `spans`) that reach storey `s`". New: the same, followed by "— a wing
reaches the storeys volume 2's `storeyRange` gives: a solid wing (`BaseWing.solid`) none, a wing standing on another
from the storey above the one it stands on, every other wing `[0, floors − 1]` —". Current: "at the ground the footprint
face's `area2`". New: "at the ground the footprint face's `area2` where every ground wing reaches storey 0, else (a
stepped building, volume 2 §3.15) the `area2` of the union of the extents that reach it". Current (in `interface
Storey`): "`wings: number[] /* the wings whose floors — or the basement ring — reach this level */`". New: "`wings:
number[] /* the wings whose floors — or the basement ring — reach this level, by volume 2's storeyRange (a solid wing
none; a stacked wing from the storey above the one it stands on) */`". **Extended by the second revision (V2C-61):** in
`interface Storey`, current "`level: number /* −k … −1 the basement's storeys, 0 the ground, 1 … n above */`". New: "`level:
number /* −k … −1 the basement's storeys; 0 the lowest storeyed level — the ground, except on a stack whose ground wings
are solid (volume 2's storeyRange: a solid pyramid's shrine is level 0); 1 … n above */`". Paragraph *Basements*, current: "The basement lies
inside the ground storey's wings and smaller than their union". New: "The basement lies inside the ground wings (those
standing on no other wing, `BaseWing.on` absent — for a stepped building its tier 0, whatever storeys they reach) and
smaller than their union"; and, in the same paragraph, the sentence "`Basement.access`, derived with it: `external` for a
walk-out, else the class's programme row's `basementAccess`" reads "… `external` for a walk-out, or where no wing standing on no other wing is storeyed (volume V03 §3.3's
`ground(b)` absent; volume 2's `storeyRange` gives each such wing no storey) — its door then at volume 3's
`basementDoor(b)` (V03 §3.7.1: a retaining wall's side first, else the tomb door), else the class's programme row's
`basementAccess`" (the condition's words as reconciliation round 4 gives them, S23R3-03: volume 3's `ground(b)`, never
"storey 0", which names the lowest storeyed level; the door's words as seam S23R2-12 gives them, since `basementDoor(b)`'s
rule 1 takes a retaining wall's side before the tomb door for every `external` basement, a storey-less stack's included), and `### 10.2
…`'s `basementAccess` comment "never external, which only a walk-out's fall derives" reads "never external, which only a
walk-out's fall or a building with no storeyed ground wing (§2.6) derives" (reconciliation round 3, S23R2-03: volume 3's
J-V3.88 condition — a storeyed ground wing beside a solid one, an arena's façade ring or a stepped temple's annex, joins
the basement by its core or the trapdoor fallback, never outside; volume 2 §3.15.3).

**Extended by reconciliation round 4 (S23R3-03; J-V2.99).** The widened `external` reaches every base text that still
reads it as a walk-out, and every text that places or checks the basement by "the ground storey" — which, on a stack whose
ground wings are all solid, names no storey (`Storey.level` 0 is then the shrine's floor, above). §2.6's plan rung step 3
(where the outside door opens) and §13.2's T28-3 are volume 3's BCR-V3-32 (S23R3-01), not this request's. (a) `### 13.2
Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`, T29-4. Current: "the stair core, a trapdoor
or, for a walk-out, an outside stair". New: "the stair core, a trapdoor or, for an `external` access (a walk-out, or a
building with no storeyed ground wing), an outside stair". (b) `# Judgment calls ("chose X over Y because Z"; each
vetoable)`, J-A29.25. Current: "`external` for a walk-out, else the programme row's `basementAccess` at `builtBand`". New:
"`external` for a walk-out or where no ground wing is storeyed (§2.6 *Basements*; its door volume V03 §3.7.1's), else the
programme row's `basementAccess` at `builtBand`". In the same row, current: "a walk-out's outside stair a door in the
lowest of the basement ring's sides at least two wing-local modules long". New: "an `external` basement's outside stair a
door at the point §2.6's plan rung step 3 gives (volume V03 §3.7.1)". (c) `### 2.6 …`, the plan rung's step 5
(*Circulation and openings*). Current: "a walk-out basement's outside door, where step 3 opens one (`external`), the root
of the basement's storeys". New: "an `external` basement's outside door (a walk-out's, or that of a building with
no storeyed ground wing — both at volume V03 §3.7.1's `basementDoor(b)`), where step 3 opens one, the root of the basement's
storeys" (seam S23R2-12, the same-shape sweep: `basementDoor(b)` places a storey-less building's door at a retaining wall's
side before the tomb door). (d) The basement's place, read as
*Basements* now states it — inside the ground wings, those standing on no other wing, whatever storeys they reach. `### 2.6
…`, `interface Basement`, current: "ring: Polygon /* inside the ground storey's wings and smaller than their union"; new:
"ring: Polygon /* inside the ground wings (those standing on no other wing; Basements, below) and smaller than their
union". `### 2.6 …`, the terrain gate's list of §5.3's rows, current: "every basement inside its ground-storey footprint and
smaller than it"; new: "every basement inside the footprint of its ground wings and smaller than it". `### 5.3 The
invariant suite, by scope (SCL-1)`, current: "a basement lies inside and is smaller than its ground storey's wings"; new:
"a basement lies inside and is smaller than its ground wings (those standing on no other wing, §2.6 *Basements*)". `### 7.4
Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8`, current: "The check requires
the basement's ring within the wings of its ground storey"; new: "The check requires the basement's ring within its ground
wings (§2.6 *Basements*)". `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)`, the
`cellar` comments, current: "a full cellar's floor below the ground storey's baseCm"; new: "a full cellar's floor below
the baseCm of the ground wing above it (§2.6 *Basements*)"; and current: "the basement ring's inset inside the
ground-storey wings"; new: "the basement ring's inset inside the ground wings (§2.6 *Basements*)". On a building none of
whose ground wings is solid, the ground wings are the ground storey's, so every text in (d) reads as before and no
document shifts. Every current text above is found once in `docs/ARCHITECTURE.md` (md5 01fea21f…). Test: volume 2's
T-V2-44 (*Basement access*, T29-4 on both temples).
[V03 BCR-V3-27: printed above]
--- V03 BCR-V3-32 (lines [3079])
**BCR-V3-32 — the outside door of an external basement** (reconciliation round 4; critique/seam-stage2-3-r3.md S23R3-01;
J-V3.114, J-V3.115; file f item 578, applied after items 371 (BCR-V2-33) and 242 (BCR-V3-27)). (a) Heading: `### 2.6
Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface`, *The plan rung*, step 3.
Current: "`external`, a walk-out's outside stair: the core stopping at the ground storey, a door (an `Opening` of kind
`door`) opens the basement in the side of `Basement.ring`, among those at least two of step 4's wing-local modules long
(a door's width), whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index) —
where no side is that long, the basement is joined by the `trapdoor` fallback above, reported —". New: "`external`, an
outside stair (BCR-V2-33's external access — a walk-out's, or that of a building with no storeyed ground wing): the core, where
one serves the ground, stopping at the ground storey, a door (an `Opening` of kind `door`) opens the basement at the
point volume V03 §3.7.1's `basementDoor(b)` gives — on a side of `Basement.ring` at least two of step 4's wing-local
modules long (a door's width) — and, where the building has a crypt and a storeyed ground wing, one whose door lies off
the crypt (its ring and capped bays; volume V03 §3.7.1): a retaining wall's side first, else, where no ground wing is storeyed, the tomb door's, else the side
whose outside ground samples lowest on `levelledGroundCm` (ties by ring index); a pure function of eager records,
implemented in `@plat/plots` — where it gives none, the basement is joined by the `trapdoor` fallback above, reported
—". (b) Heading: `### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT`, T28-3. Current:
"or, for a walk-out, where no side of the ring is long enough for its door (§2.6's fallback, step 3; J-A29.25) — or, for
any other walk-out (`Basement.access` `'external'`), by its outside stair;". New: "or, for an external access, where
`basementDoor(b)` gives no door (§2.6's fallback, step 3; J-A29.25) — or, for any other external access (a walk-out, or a
building with no storeyed ground wing), by its outside stair at `basementDoor(b)` (volume V03 §3.7.1);". `basementDoor(b)`
itself is built at M3a with BCR-V3-27 (a) (volume 3 §8's PE; file f item 578's BASE label), so volume 1's entrance
reserve (M5) calls it; the step-3 and T28-3 texts are the plan rung's (M6-P). Both quotations checked present once in
the base by a whitespace-normalised search (scratchpad receipt rcV3r4/quote-receipt.txt). *Reconciliation round 5 (seam
S23R4-03; J-V3.125):* the crypt clause of the new step-3 text reads `Basement.crypt`, which exists from M6-U (file f item
238); before it the clause is inert, and its first reading moves such a church's door once, declared in M6-U's shift
record with the crypt's first derivation (volume 3 §8's PE). File f item 578 carries the text by reference; its label is
unchanged.

######## f item 286 (§4.2) — STAGED (M6-sky).
BCR-V5-19 (V05 §10) — reservations an institution island leaves (C5-02). Also touches: §2.5. *Needed by:* V05. **STAGED (M6-sky).**

--- V05 BCR-V5-19 (lines [3139])
**BCR-V5-19 — reservations an institution island leaves (C5-02).** Heading: `### 4.2 S0 Blueprint · S1 Site · S2
Programme · S3 Siting, reservations, the stage-1 boundary and its trace`, S3 (2). Current: "The **temple or cathedral
precinct** adjacent to the main plaza by score, sized from its institution row". New: the same, then "— not reserved
where the creation prefix sends its institution to a sky island (a T5 `sky` declaration of its kind or a T6
`criteria.sky` assignment, V05 §3.5); likewise the reservation a palace takes by the castle's siting rules (S3 (8)). A
reservation whose institution a later S7b (5) slot takes up is handed over by V05 §3.5 (the row's hand-over class, else a
park), never left without an owner". Heading `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations,
allocations and the context vector`, `Reservation`: current "owner?: Id /* castle, institution, commons */;". New:
"owner?: Id /* castle, institution, commons */; handedFrom?: Id /* V05 §3.5: the institution whose reservation this was
before it went up to a sky island; the owner is then its hand-over instance, or commons for a park */;".

######## f item 303 (§4.7) — BASE (M3a, with item 229's base outline builder) for its hole sentence — S11's yard partition types every hole of a footprint face as a yard part of kind `court`; STAGED (M6, stage 3) for the rest
BCR-V2-24 (V02 §10) — S11 and the massing. Also touches: §2.6. *Note:* Applied before BCR-V2-34 (`BuildingInput`). Its hole sentence — "S11's yard partition types every hole of a footprint face as a yard part of kind `court`" — is built at M3a, one build unit with item 229: volume 2's `massOval` arena and the base's court-institution construction lay holed footprints from M3a, and volume 2's T-V2-42, volume 1's hood-pin sites (V1-3.8.2 step 1) with T-V1-26 and T-V1-54, and volume 3's court openings read the floor as a `court`; the request's other sentences (the outline registration, `BuildingInput`'s stage-3 fields) have no reader before M6 (S23R1-17, volume 2's half; S23R1-18; reconciliation round 2, continuation). *Needed by:* V01 (the typed court: V1-3.8.2 step 1's sites and the `ovalCourt` exclusion; S23R1-18), V02. **BASE (M3a, with item 229's base outline builder) for its hole sentence — S11's yard partition types every hole of a footprint face as a yard part of kind `court`; STAGED (M6, stage 3) for the rest** (S23R1-17).

--- V02 BCR-V2-24 (lines [3851])
**BCR-V2-24 — S11 and the massing (its hole sentence from M3a, with BCR-V2-39; reconciliation round 2, S23R1-17).** `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11
Site plans and footprints — the plot model`. Current: "`from `outline()` itself — rectangles and L / T compositions as
`rect` wings with per-wing ridge axes (VIS-10), footprint`". New: "`from the registered generator's `outline()` — with
stage 3, volume 2's massing (§3.5 there), whose baseOutline, template and axisLocked families are the base builder's —
rectangles and L / T compositions as `rect` wings with per-wing ridge axes (VIS-10), footprint`"; three sentences added at
the paragraph's end: "The cluster packer hands each structure to `outline()` as one fixed wing. S11's yard partition
types every hole of a footprint face as a yard part of kind `court`. S11 passes the slot's composition row key and the
plot's field and manifested bands, its layer and the attached structures (BCR-V2-29) in `BuildingInput`." `### 2.6 …`:
current "`interface BuildingInput { lot: Polygon; access: Segment[];`" → "`interface BuildingInput { lot: Polygon; access:
Segment[]; compositionRow?: string /* stage 3: the slot's CompositionRow key (volume 2 §3.2) */; bands?: { field: { band:
string; value: number }; manifested: { band: string; value: number } } /* as ClassRules.pick receives them */; layer?:
'surface' | 'underground' /* the plot's layer: II.7.3's sewer-front plots, II.7.5's undercity and item 109 (j) (4)'s cavern
and ruin dwellings are 'underground' (volume 2 §3.2 step 2's @underground rows); absent: surface */; attached?: { key:
string; count: number }[] /* stage 3: the template's attach-main structures and their drawn counts (BCR-V2-29) */;`".

*Build note (reconciliation round 2, S23R1-17; J-V2.104).* The sentence "S11's yard partition types every hole of a
footprint face as a yard part of kind `court`" is built at **M3a**, with BCR-V2-39: the base outline builder lays
`massOval`'s arena from M3a and falls to its court-institution construction there, and bars read the arena's floor as a
`court` before M6. The rest of this request is built at M6. From M3a every hole of a footprint face is one `court` yard
part, whatever the designation template's yard rows name (their shares type the plot's other yard parts). A hole in a
base footprint template, such as the ring cloister, whose kind those rows set otherwise before M3a is retyped `court`
once at M3a. That is a declared shift (§13.3) with its diff report. Readers of the typed court from M3a: this volume's
T-V2-42 (the arena's floor); volume 1's hood-pin sites (V1-3.8.2 step 1: no pin on an `ovalCourt` floor), with T-V1-26 and
T-V1-54 at M5; and volume 3's court openings (V03 §3.6 O1 (b)) at M6-P.
--- V02 BCR-V2-34 (lines [4042])
**BCR-V2-34 — the deck input; no cellar on a deck (item 110 (d); item 110 fold).** Same heading. Current: "`interface
BuildingInput { lot: Polygon; access: Segment[];`" (as BCR-V2-24 amends it). New: BCR-V2-24's text with, after its
`attached?` field, "`deck?: DeckContext /* item 110 (d): the plot's deck — its host, kind and surface height, and whether
the building is a placed landmark (volume 2 §2.6); absent off a deck */;`". Paragraph *Basements*, current: "Against it:
**no cellar** where the plot's `terrainClass` is `damp` or `flood`". New: "Against it: **no cellar** on a deck plot built
over water (item 110 (d); volume 2 §3.16 — a quay built on the bank, `DeckContext.surfaceCm` null, is ground and takes this
gate like any plot), nor where the plot's `terrainClass` is `damp` or `flood`"; and in *A requested basement*, after "(4)
otherwise a refusal naming the gate each form failed", "— on a deck plot over water every form fails at once and the
request bends (item 101 R2) to the same request on the nearest building on the ground of its plot group, else of its block,
else the nearest building on the ground (volume 3 §4.2), named (`bend.deck.basement`, volume 2 §1b's bend list)" (second
revision, V2C-66 (1); reconciled with S23-17: a bend, not the ladder's refusal rung; file f item 305; its third rung, V03's,
added by reconciliation round 2, S23R1-14, so a deck block with no ground building — a bridge's shop row — has a target). `### 4.7 …`: BCR-V2-24's sentence "S11 passes the slot's composition row key and the plot's field and manifested
bands, its layer and the attached structures (BCR-V2-29) in `BuildingInput`" gains ", and on a deck plot its
`DeckContext`".

######## f item 313 (§4.9) — STAGED (M5, stage 2; the rim-walk row and the optional `way` built by volume 1's W8 on a fixture island, in use on real islands with M6-sky).
V01 BCR-10 (V01 §10) — §4.9's greenery rule table: the court-greening row and the green-and-yard-blocks row; the parks row widened to a green block's or a `park` plaza's green at any size; (c) the rim walk's row, planted once per island by volume 1's `plantRimWalk`, never by a district's S12b; and §2.7's `Greenery.along.way` optional for that row alone. Also touches: §2.7. *Note (seam SLR5-05; reconciliation round 6):* the item named two of the request's four parts until this round (volume 1's cross-volume note (36)). *Needed by:* V01, V05 (the rim walk, J-V5.26, V5 §3.12). **STAGED (M5, stage 2; the rim-walk row and the optional `way` built by volume 1's W8 on a fixture island, in use on real islands with M6-sky).**

--- V01 BCR-10 (lines [3419])
**BCR-10 — `### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)`.** Add
two rows to the rule table, both `extension` (0 or off in the parity presets; V1C-34): "| court greening (volume 1,
V1-3.5.7) | band, greenery value, `leafy` | every court residue of an ordinary block | the court as a green with trees, with
the band's probability × (0.5 + greenery) (× 1.5 when `leafy`), drawn on `greenery` keyed by the block; while `hood.constants`' `ng.courts` is on (the `NG` preset's entry, volume 1
V1-3.15), exactly when the block's frontage ring is complete |" and "| green and yard blocks (volume 1, V1-3.5.10) |
`Block.content` | every `green` block and every grassed `yard` block | a `green` on its residue face, owned by the commons, a
grove layout by the park rule for small faces |". The parks row, current "only on S7b reserved faces or residue ≥ 0.3 ha",
→ "only on S7b reserved faces or residue ≥ 0.3 ha, or on a green block of S9b's dispatch or a `park` template's green plaza
(volume 1, V1-3.4.5, V1-3.5.4), at any size" (V1C-49). (c) **The rim walk** (seam SL-12; volume 5 J-V5.26): add the row
"| rim walk (volume 1, V1-3.10.3; volume 5) | a sky island | the `rim_strip` face (§2.5, BCR-V5-6) | one `esplanade` on the
face and one `street_trees` row along the strip's inner setback line, spaced by the street-trees row (a tree every 10–14 m);
no way laid; planted once per island by volume 1's `plantRimWalk` (V1-3.10.3 step 4), never by a district's S12b |"; and in §2.7's `Greenery`, current "`along?: { way: Id; strip: FaceRef /* one half-corridor strip on the
planting district's own side */; offsetCm: Cm }`" → "`along?: { way?: Id /* absent only for the rim walk's row, whose trees
run along the strip's inner setback line (volume 1, V1-3.10.3) */; strip: FaceRef /* one half-corridor strip on the planting
district's own side, or the rim strip */; offsetCm: Cm }`".

######## f item 333 (§5.3) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-35 (V02 §10) — stacked wings in the invariants and the carry check (item 110 (c); item 110 fold). Also touches: §2.6. *Needed by:* V02. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

--- V02 BCR-V2-35 (lines [4057])
**BCR-V2-35 — stacked wings in the invariants and the carry check (item 110 (c); item 110 fold).** `### 5.3 The
invariant suite, by scope (SCL-1)`: BCR-V2-17's row "stage 3: every wing inside its plot; the non-tower wings of a
building tile; …" reads "… the ground wings that are not towers tile, and every wing that stands on another lies inside
that wing's ring, the wings standing on one wing pairwise disjoint (volume 2 §3.15.1 ST6); …". `### 2.6 …`, the wing-carrying rule's rule 4: current "The basement ring is
checked in the same pass — simple, counter-clockwise and inside the footprint face (exact `orient2d` tests):". New:
"Every ring of a wing that stands on another (`BaseWing.on`, volume 2) is checked in the same pass inside the ring of the
wing it stands on (exact `orient2d` tests), and the wings standing on one wing are pairwise interior-disjoint (exact
`orient2d` tests; second revision, V2C-54); a failure halves a warp's or a `moveVertex`'s step, and after any other batch
the building is re-derived by S11 (F-REDERIVE, reported). The basement ring is checked in the same pass — simple,
counter-clockwise and inside the footprint face (exact `orient2d` tests):".
[V02 BCR-V2-39: printed above]

######## f item 362 (§7.1) — BASE (M1–M3b, the reference UI (AP1–AP4)).
BCR-V9-26 (V09 §10) — item 110's events (item 110 (a), (b), (f); V9C-52; J-V9.59; one text for volumes 9 and 10, XV-V9-10). Also touches: §2.4. *Note:* `drawWay` carries both `raised?: true` (this BCR) and BCR-V7-19's `walk?`; its retaining form is the `RetainingWall` record's producer; its uphill-aqueduct last resort is the bend to a well (J-VI.4 (h)); its island strokes bend per J-VI.4 (d)–(e). *Needed by:* V09, V10. **BASE (M1–M3b, the reference UI (AP1–AP4)).**

--- V07 BCR-V7-19 (lines [3748])
**BCR-V7-19 — the village edit forms.** `### 7.1 Edits are ordered events on addresses; the named actions; the edit
targets; dry-run validation`. Current, in `EditEvent`: "| { t: 'drawWay'; points: PointCm[]; class: WayClass; widthCm:
Cm; from?: PointsForm /* two points: the route derived by S4's router at the dry run (§4.3) */ }" and "| { t: 'quarter';
boundary: PolygonCm /* resolved at dry run */;". New: `drawWay` gains `walk?: { headingCdeg: Cdeg; class:
'road'|'track'; maxLengthM?: M }` (resolved into `points` at the dry run, V07 §4.2); the union gains
`{ t: 'declareEnd'; anchor?: Id | PointCm; boundary?: PolygonCm; kind: VillageEnd['kind']; name?: string }` (the lasso's
plots join the declared end, which is keyed by the event's address and held; V07 §4.2); the `quarter` sugar expands at a
village rung to `declareEnd` carrying its `boundary` (V07 §4.1, T5); the edit-target table gains the village rows (V07 §4.1, §4.4).
[V09 BCR-V9-26: printed above]

######## f item 371 (§7.3) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-33 (V02 §10) — the storeys a wing reaches (item 110 (c); item 110 fold). Also touches: §2.6, §5.3, §7.4, §10.2, §13.2 (T29-4), Judgment calls (J-A29.25) — its round-4 extension (S23R3-03; volume 2's lane note to reconciliation round 4). *Needed by:* V01 (`Basement.access` `external`: the entrance reserve's second rectangle, V1-3.8.2 step 5; S23R1-18), V02, V03. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

[V02 BCR-V2-33: printed above]
[V02 BCR-V2-39: printed above]

######## f item 385 (§7.7) — STAGED (M6, stage 3).
BCR-V2-08 (V02 §10) — `DriftBounds` typed. *Needed by:* V02. **STAGED (M6, stage 3).**

--- V02 BCR-V2-08 (lines [3689])
**BCR-V2-08 — `DriftBounds` typed.** `### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the
ASSIGN hook)`. Current: "`drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family — read
against §4.7 S11's designation template (item 19) */`". New: the same, its comment ending "`… (item 19); typed in volume 2
§2.1 */`".

######## f item 459 (§11.2) — STAGED (SettlementForge stage, SF0 to SF7).
BCR-V8-2 (V08 §10) — a host-minted document id and the creation prefix at `generate`. Also touches: §2.9, §6.3. *Note:* `generate`'s options also carry BCR-V10-5's `scratch?`. *Needed by:* V08. **STAGED (SettlementForge stage, SF0 to SF7).**

--- V10 BCR-V10-5 (lines [3114])
**BCR-V10-5 — scratch documents.** `### 11.2 The embedding API and the worker boundary (SCL-6)`. Current: "generate(bp:
Blueprint, opts?: { onProgress?: (p: Progress) => void }): Promise<DocHandle>;". New: `generate(bp: Blueprint, opts?: {
onProgress?: (p: Progress) => void; scratch?: boolean }): Promise<DocHandle>;` and a new member `scratch(h: DocHandle):
Promise<DocHandle>; // the committed state of h at its logHead, written to its snapshot form in the generation worker and
opened as a new handle by §2.9's reader: never saved, never bridged, never resolved by a DocResolver, its session
'clerk:<n>', its role and knowledge key h's; an editing role's call (a viewer's refused 'role'); its memory a session line
counted beside the rung's (V10 §6.2)`. A handle made with `scratch: true` has the same properties.
--- V08 BCR-V8-2 (lines [2922])
**BCR-V8-2 — a host-minted document id and the creation prefix at `generate`.** `### 11.2 The embedding API and the
worker boundary (SCL-6)`. Current: "`generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void }):
Promise<DocHandle>;`". New: "`generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void; docId?: Uuid /* a
host-minted id, e.g. a SettlementForge map record's mapId; else minted here */; prefix?: EditEvent[] /* the port's
creation prefix, written at positions 0…k with `creation` set */ }): Promise<DocHandle>;`". And `### 2.9 The document
and serialisation`, the `docId` field's comment "minted at creation by @plat/api (outside the model packages)" becomes
"minted at creation by @plat/api, or given by the host to `generate` (§11.2)"; `### 6.3 Identity: address ids, lineage
keys, carry-over (and the scope of stability, stated)`, *Document identity*: "`docId` (a UUID) is minted when a document
is created" gains ", or taken from the host when it passes one (§11.2)".

######## f item 505 (§§14) — BASE (M1, M2b, M3a) for V01 BCR-1's early parts as the note lists them; STAGED for the rest, each line with its own stage (M5, M6 for stage 3, M6-P for the plan rung, M6-U for the underground, the village product).
The package list: four new packages after `@plat/hood`. V01 BCR-1 replaces the `@plat/hood` line and extends `@plat/tables` and `@plat/model`; after it, in this order, BCR-V2-18's `@plat/buildings` line (with its dependency-rule changes), then BCR-V3-31's plan-rung additions to that line and rule (S23-37; reconciliation round 1), V04 BCR-12's `@plat/under` line and BCR-V7-10's `@plat/village` line. The four package lines quote the same current line; they add, none removes another's. Texts: V01 §10, V02 §10, V03 §10, V04 §10, V07 §10. *Requests:* V01 BCR-1, BCR-V2-18, BCR-V3-31, V04 BCR-12, BCR-V7-10. *Build (SCC-R3C-5; reconciliation round 4, continuation; revised by reconciliation round 5, seams SCC-89 and S23R4-05, volume 1's cross-volume note (35)):* V01 BCR-1's early parts are built as volume 1 §8.1 schedules them — at M1 `@plat/model`'s `HoodPlace`, `DistrictContext`, `TypedBoundary` and `WayNamingContext` (S13a's naming input, item 444) with the `FabricStrategy` comment (the base's `FabricStrategy.partition` and `District.boundary` already name the two views; items 207 (b), 210), and `@plat/tables`' `hood.constants` — its one `settings` row (volume 1 V1-2.2's `HoodSettings`) shipped whole, every column of volume 1 V1-3.14's column table at its default, the naming context reading four of its columns (item 444), every calibratable column taking its register entry at M1 (volume 1 §8.1; J-V1.99); at M2b `way.surface` and `squares.quota` (items 207 (a), 301); at M3a `TerraceState`, `terraceState` and `stepProfile` (items 211, 245) with `hood.templates`' `stepped` row, shipped whole, whose `params.terraceSpacingM` `terraceState` reads with `hood.constants`' `terrace.siteShare` (landed at M1), every calibratable column of `hood.templates` taking its register entry at M3a (volume 1 §8.1, with its seam SCC-92); the `@plat/hood` line, every other stage-2 table cell (`hood.templates`' other rows among them, their columns' entries written at M3a) and the other `@plat/model` types at M5 (volume 1 §8.1's register clause names each milestone's cells). *Needed by:* V01, V02, V03, V04, V07. **BASE (M1, M2b, M3a) for V01 BCR-1's early parts as the note lists them; STAGED for the rest, each line with its own stage (M5, M6 for stage 3, M6-P for the plan rung, M6-U for the underground, the village product).**

--- V02 BCR-V2-18 (lines [3782])
**BCR-V2-18 — the package.** `## §14 Package and module layout, key interfaces, dependency rules, extension points`.
Current: "`@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the
base; the interface lives in @plat/layout]`". New, a line after it: "`@plat/buildings stage 3: the massing (outline), the
composer (compose), composition.json's loaders, the roofscape and facadeBays   [built after stage 2; the BuildingGenerator
interface lives in @plat/plots]`". Current: "`layout ← plots ← labels ← render`" → "`layout ← plots ← buildings ← labels ←
render`", and after "`` `hood` depends on `layout` / `plots` only through their interfaces; ``" add "`` `buildings`
implements `plots`' `BuildingGenerator` and is imported by `render` and `export` for its pure `roofscape` and
`facadeBays` only; ``". **Reconciliation round 2 (S23R1-12):** that line stays as quoted (BCR-V3-31 quotes it), and one
sentence follows it in §14: "`facadeBays` and its two constants' reader (`bayM`, `endMarginM`) are implemented in
`@plat/plots` beside `massStepped`, `stairTreads` and `cryptSeedWings`, in every build order, and re-exported by
`@plat/buildings`; `render` and `export` may import it from either."
--- V03 BCR-V3-31 (lines [3067])
**BCR-V3-31 — the plan rung's package** (reconciliation round 1; S23-37; joins file f item 505, applied after
BCR-V2-18). Heading: `## §14 Package and module layout, key interfaces, dependency rules, extension points`. In BCR-V2-18's
`@plat/buildings` line, current "the massing (outline), the composer (compose), composition.json's loaders, the roofscape
and facadeBays" → new "the massing (outline), the composer (compose), composition.json's loaders, the roofscape and
facadeBays, and the plan rung (volume 3: plan() — the programme, the anchors, the partition, openings, heads, the crypt's
plan, furnishing and the plan report; its tables load through @plat/tables, BCR-V3-1)"; in BCR-V2-18's dependency rule,
current "is imported by `render` and `export` for its pure `roofscape` and `facadeBays` only" → new "is imported by
`render` and `export` for its pure `roofscape` and `facadeBays`, and by `export` for the plan's pure readers (the JSON
`plan` block, the `.dd2vtt` and Foundry storey scenes, CityJSON storeys and glTF interiors), only". Where the plan rung
lands before volume 2 (volume 3 §11's Q1 answered yes), M6-P creates the package with the plan rung alone and volume 2's
M6a adds its members.
--- V07 BCR-V7-10 (lines [3671])
**BCR-V7-10 — the village package.** `## §14 Package and module layout, key interfaces, dependency rules, extension
points`. Current, in the package list: "@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the
neighbourhood LOD workflow". New line after it: "@plat/village  the village product: its `ProductDecl`, VS1–VS8, the
`course-first` RiverStrategy, the `tracker` NetworkStrategy, the `palisade` EnceinteStrategy, the `village-ways`
FabricStrategy, the `toft` PlotStrategy, the village field presets and epoch phases (V07) [built after the base; depends
on @plat/layout and @plat/plots through their interfaces only]".
--- V01 BCR-1 (lines [3314])
**BCR-1 — `## §14 Package and module layout, key interfaces, dependency rules, extension points`.** Current: "`@plat/hood
stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow [built after the base; the interface
lives in @plat/layout]`". New: "`@plat/hood     stage 2 (volume 1): TemplateFabric over the hood.templates rows (the four NG
templates and seven context templates) and its seed primitives, S7c's FabricSelector (S7b's hook) with templateLandM2,
S9b's BlockDispatcher (S10a's hook), the local-place step (an S13a registration with its opening pass), the refine
close-up's CloseupDeriver (the outline close-up, the ground access symbols), the unit runner (standalone and sky), the
DistrictContext and DistrictSignature builders, the services catchmentOf / districtsAbove / fabricSignature, the
WhyProviders and the hood.fabric epoch participant [built at M5; the interfaces live in @plat/layout and @plat/model]`".
`@plat/tables`' list gains "the stage-2 tables `hood.templates`, `hood.dispatch`, `hood.squares`, `hood.pins`,
`hood.kinds`, `hood.placeKnowledge`, `hood.defaultCuts`, `hood.constants` (one settings row, holding the `NG` preset's
entries, volume 1 V1-3.15) and
`way.surface`, and the base table `squares.quota` (volume 1)"; `@plat/model`'s list gains "`HoodPlace`, `CloseupRecord`,
`CloseupParams`, `HoodRecipe`, the views `DistrictContext`, `TypedBoundary`, `DistrictSignature`, `FabricSignature`, `WayNamingContext` (from M1, S13a's naming input; found in passing, file f's round-4 note), `TerraceState` with its function `terraceState` (from M3a) and `stepProfile` (BCR-43)
(volume 1, V1-2)". After "`interface FabricStrategy { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc:
StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }`" add the comment "`// DistrictContext and
TypedBoundary: @plat/model (volume 1, V1-2.3), assembled from committed state, draw-free; FabricStrategyId is a row key of
hood.templates (V1-2.1)`".
--- V04 BCR-12 (lines [3118])
**BCR-12 — the package.** `## §14 Package and module layout, key interfaces, dependency rules, extension points` — current:
"@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]"
— add after it: "@plat/under    the underground layer (staged, M6-U): the network, its forecast, the sewer-front neighbourhoods, the
void systems, the undercity, the connection stage, the closure generators, the fade — over @plat/kernel, @plat/model,
@plat/tables, @plat/plots and @plat/content; registered in @plat/layout's registry; never imported by the ground's
packages"; `@plat/tables` gains "the underground's `tables/under/network.json`, `layout.json` and `fade.json` and the
dossier's `tables/dossier/sanitation` and `subterranean` row sets".

######## f item 510 (§§14) — STAGED (SettlementForge stage, SF0 to SF7; V11 C4).
**The dossier row sets of §14 item 7, written once** (SS-29; reconciliation round 1). **Consolidated.** BCR-V8-10 and BCR-V11-4 extend the same list; applied once: the list gains `tags`, `categories`, `crime`, `cultures`, `archetypes`, `categorySynonyms`, `keywords`, `relations`, `historyScars`, `magic`, `era`, `materials`, `customWeights` (J-V8.108; SCC-R3C-10, reconciliation round 4, continuation), `isolation`, `chainStatus`, `dependencySeverity`, `calamitySeverity`, `qualifiers`, `threats` and `ruinEvidence` (V08 §2.6, §2.6a), `ladders` (`LadderStepRow`, V11 §2.6, carrying `identity`) and `goodWords`; and after "§7.7 states the rules that read them" it adds "; volume V08 §2.6 writes the default rows of every set §7.7 does not; the shapes of `kinds`, `archetypes`, `categorySynonyms` and `keywords` are volume V08's (the `archetypes` row's optional `village` cell typed by volume V11 §2.8), the shapes of `ladders` and `goodWords`, and the rows of all six, volume V11's (V11 §3.11–§3.13); `dossier.catalogue`'s `ladderPairs` is V08's committed data (V11 §3.1 row 77)". *Requests:* BCR-V8-10, BCR-V11-4. *Needed by:* V08, V11. **STAGED (SettlementForge stage, SF0 to SF7; V11 C4).**

--- V11 BCR-V11-4 (lines [4438])
**BCR-V11-4 — the dossier row sets V11 writes (g item 108; item 104).** Section `## §14 Package and module layout, key
interfaces, dependency rules, extension points`. Current text: "`7. **The dossier row sets** `tables/dossier/*` in
`@plat/tables` — `tiers`, `site`, `access`, `threat`, `deposits`,`". New text: the list gains `ladders` (`LadderStepRow`,
V11 §2.6), `archetypes`, `categorySynonyms`, `keywords` and `goodWords`, and the sentence "the rows of `kinds`,
`ladders`, `archetypes`, `categorySynonyms`, `keywords` and `goodWords` are volume V11's (V11 §3.11–§3.13)".
--- V08 BCR-V8-10 (lines [3006])
**BCR-V8-10 — the row sets written out.** `## §14 Package and module layout, key interfaces, dependency rules, extension points`, item 7. Current: "`tiers`, `site`, `access`, `threat`, `deposits`,
`quarters`, `landmarks`, `distribution`, `kinds`, `status`, `wealth`, `sectors` …, `government`, `powers`, `conditions`,
`calendar` …, `receipts` and `derivation`". New: add `tags`, `categories`, `crime`, `cultures`, `archetypes`,
`categorySynonyms`, `keywords`, `relations`, `historyScars`, `magic`, `era`, `materials`, `customWeights`, `isolation`,
`chainStatus`, `dependencySeverity`, `calamitySeverity`, `qualifiers`, `threats` and `ruinEvidence` (V08 §2.6, §2.6a), and after "§7.7 states the rules that read them" add "; V08 §2.6 writes the default
rows of every set §7.7 does not, and fixes the shapes of `kinds`, `archetypes`, `categorySynonyms` and `keywords`, whose
rows volume V11 writes".

######## f item 576 (§10.2) — STAGED (the village product, V-M0 to V-M4).
BCR-V7-36 (V07 §10) — a class's presence entries, the context readings and the government step at village rungs (SR1-01; J-V7.101; the title as volume 7 sets it by SR3-01, SR3-05): (a) `BuildingClassRow.presence?` with the types `PLaw` and `PresenceWhen`, read by S2 only at the rungs whose `RungProfile.frameLaw` is `territory`; (b) `ContextVector.dist` at those rungs, in the text seam SR2-02 widens it to (volume 7's half: `dist.market` and `dist.harbour` beside `dist.centre` and `dist.gate`); (c) on §10.2's *Government (COV-FTG-B13)* sentence, the paragraph under (a)'s heading ("the blueprint's `government` circumstance selects a `GovernmentRow` whose offices force seats"): at those rungs the government step reads the row's `villageSeat` alone and reads neither the row's seat class, nor its offices' seat classes, nor its military share (SR3-01, volume 7's half; SR3-05, reconciliation round 4). Also touches: §2.5 (part (b)); part (c) is in §10.2 with (a), §4.2 S2's citation of the sentence unchanged (seam SR4-03; reconciliation round 5). *Note (SR2-01; reconciliation round 3):* (a) applied after item 432 (BCR-V11-1), which extends the same interface; volume 11's compiler carries the column as volume 7 types it (V11 §2.3). Found uncarried by the round-2 seam check: volume 7's round 2 landed after this file's round-2 census. *Needed by:* V07, V11. **STAGED (the village product, V-M0 to V-M4).**

--- V11 BCR-V11-1 (lines [4412])
**BCR-V11-1 — the class row's profile and columns (g items 103 (a), 105 (h), 107 (a); V07's BCR-V7-21).** Section
`### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)`. Current text:
"`subLocations: SubLocationRow[]; openingHours: OpeningRow[]; tags: string[] }`". New text:
"`subLocations: SubLocationRow[]; openingHours: OpeningRow[]; tags: string[];` `profile: SitingProfile /* item 103: the
compiled siting profile — family, emits, sensitive-to, needs, clientele, alignment, competition, coverage, balance,
orientation, split, landmark (V11 §2.3) */; staff: { band: string; workers: [number, number] }[]; villageForm?: string;
templateFamily: string; producesShare?: Record<string, number> /* item 105 (c): the output shares, equal when absent */ }`",
with `SitingProfile`, `NeedSpec`, `CoverageSpec`, `Nuisance`, `Lvl`, `Need`, `Clientele` declared as in V11 §2.3.
--- V07 BCR-V7-36 (lines [3890])
**BCR-V7-36 — a class's presence entries, the context readings and the government step at village rungs**
(reconciliation round 2, SR1-01; J-V7.101; retitled and part (c) added by reconciliation round 4, SR3-01, J-V7.117). (a) `### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)`. Current, in
`BuildingClassRow`: "requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[] /* the
site-resource gates S2 reads from SiteResources (§4.2) */;". Mechanism to add after that field:
```ts
presence?: { member?: number /* 1 when absent */; when?: PresenceWhen; law: PLaw }[]
  /* read by S2 only at the rungs whose RungProfile.frameLaw is 'territory' (the village rows, V07 §2.4): member m is drawn once on
     roster/<class>/<m> against the law of the first entry for m whose condition holds, m ≥ 2 only when m − 1 is present; the members
     after the drawn ones are the per-capita count (perCapita, perOther) less those drawn, never below 0; the roster's coverage option
     adds none there; a government's villageSeat class is present with at least one member whatever its entries (V07 §3.11 DR11);
     absent: perCapita, min and firstAtPopulation as at every rung */
type PLaw = { at: [number /* persons */, number][] }   // piecewise linear in ln P between the anchors, clamped outside (V07 §2.2)
interface PresenceWhen {   // every member stated must hold; the readings are V07 §2.4's
  gov?: string[] /* GovernmentRow kinds */; with?: string; without?: string /* a class the roster holds, or lacks, drawn before this one */;
  site?: 'flowing'|'millSeat'|'water'; noSite?: 'flowing'|'millSeat'|'water';
  resource?: { key: 'ore'|'stone'|'timber'|'fish'|'clay'|'fertile'; min: number }; road?: string[] /* the drawn road topology */;
  defenceMin?: number /* Intent.defence */; threat?: boolean /* a key of PortValues.threats holds */ }
```
The compiler orders the classes so that every class a `with`, `without` or `perOther` names is drawn first, refusing a
cycle. (b) `### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector`.
Current, in `ContextVector`: "dist: { centre: M; plaza: M; market: M /* the nearest market of either rank (item 24) */;
gate: M; wall: M; water: M; shore: M; harbour?: M };". Mechanism to add (widened by reconciliation round 3, SR2-02;
J-V7.111): at the rungs whose `frameLaw` is `territory`, `dist.centre` is measured to the `VillagePlan`'s heart (volume 7
§3.2 (4)) and `dist.gate` to the palisade's gates, else to the points where a `through` way or a road to a neighbour
crosses the settlement's perimeter (volume 7 §3.7); `dist.market` is measured to the reservation that carries the
principal market rank (the open space, or the flanking square where there is none; volume 7 §3.6 (4)), else to the first
nucleus's open space, else to the heart — a secondary fair field never counted; and `dist.harbour` is measured to the
wharf's `quay` way (volume 7 §3.10) where one is laid, else it is absent, a class row's "at a port" reading "a wharf is
laid" at those rungs. So the `nearCentre`, `nearGate`, `nearMarket` and `nearHarbour` rows and needs of the village
classes and of the classes that play themselves there, and volume 11 §3.13.4's `stepInward` and `finalSeller`, read the
village's own centre, entries, centre of trade and wharf. (c) The heading of (a), *Government (COV-FTG-B13)* — the sentence
§4.2 S2's institution list cites for the seats the government forces (that list unchanged). Current: "the blueprint's
`government` circumstance selects a `GovernmentRow` whose offices force seats". Mechanism to add after that sentence: at
the rungs whose `RungProfile.frameLaw` is `territory`, the step reads the row's `villageSeat` alone — a dossier
government's (§7.7 DR11) or an `@seat` record's `villageSeat` class present with at least one member, a request
government's feeding only the `presence` conditions of (a) — and reads neither the row's seat class, nor its offices'
seat classes, nor its military share (guard posts per 1 000 inhabitants, barracks); there an `@office` record binds to
the `villageSeat` member's building and a religious office to the parish church, and a guard post arises only from a
town-watch record or a class's `presence` entries (volume 7 §3.2 (3), §3.11).

######## f item 305 (§4.7) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-34 (V02 §10) — the deck input; no cellar on a deck (item 110 (d); item 110 fold). *Note (rule R-a; S23-17, reconciliation round 1):* its *A requested basement* clause is written as a bend, not as the ladder's refusal rung: after "(4) otherwise a refusal naming the gate each form failed" it adds "— on a deck plot over water every form fails at once and the request bends (item 101 R2) to the same request on the nearest building on the ground of its plot group, else of its block, else the nearest building on the ground (volume 3 §4.2), named (`bend.deck.basement`, volume 2 §1b's bend list)" — the third rung, volume 3's, added by reconciliation round 2 (S23R1-14) so a deck block with no ground building, a bridge's shop row, has a target; volume 2's BCR-V2-34 clause reads the same. *Needed by:* V01 (`DeckContext`: V1-3.10.3 (4), T-V1-21; S23R1-18), V02, V03, V09, V10. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

[V02 BCR-V2-34: printed above]
[V02 BCR-V2-39: printed above]

######## f item 370 (§7.3) — BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).
BCR-V2-32 (V02 §10) — the datum of a stacked wing and of a deck building (item 110 (c), (d); item 110 fold). Also touches: §7.4, §2.6. *Note:* Applied after item 309 (BCR-V5-30; S23R2-02) and before BCR-V2-42 (the datum sentence). *Needed by:* V02, V03, V06. **BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)).**

[V02 BCR-V2-32: printed above]
[V02 BCR-V2-39: printed above]
[V02 BCR-V2-42: printed above]
[V05 BCR-V5-30: printed above]

######## f item 406 (§8.2) — STAGED (M6, stage 3).
BCR-V2-15 (V02 §10) — the roofscape construction, the façade bays and the paint programs. Also touches: §8.6, §2.6. *Note:* Applied after item 405 (V01 BCR-14; S23-03) and before BCR-V2-36 (§8.6's sentence order). *Needed by:* V01 (`roofscape` and the construction switch: V1-5.1.1 – V1-5.1.2's per-facet hatch; S23R1-18), V02, V03. **STAGED (M6, stage 3).**

--- V02 BCR-V2-15 (lines [3750])
**BCR-V2-15 — the roofscape construction, the façade bays and the paint programs.** `### 8.2 Style sheets as data: roles,
contrast, symbolisation, paint programs, layer order, presets (G-R2)`. Current: "`  roofConstruction:
'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing';`". New: "`  roofConstruction:
'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing'|'roofscape' /* volume 2 §5.2: every shipped family's default once
stage 3 registers */;`". Current: "`` `crown(library)`; `halo(role rule)` (§9.4); ``" → insert before it "`` `roofscape(tone)`,
`dormer`, `porch`, `towerRoof` (volume 2 §5.3); ``". `### 8.6 Stage-2 render tier and stage-3 LOD`. Current: "`Roof
construction (§8.2) runs per stored wing (VIS-10) by its `BaseWing.kind` (§2.6):`". New: prepend the sentence "With stage 3
registered, the `roofscape` construction (volume 2 §5.2) draws each building's roof plan from all its wings at once —
ends, valleys, walls and towers resolved, the facets planar and non-overlapping — and the light pass's surface layer takes
its roofs from it; the per-wing constructions below stay for the parity presets' sheets and as the per-wing downgrade."
`### 2.6 …` (plan step 6). Current: "`windows follow each room's exterior demand, one per façade bay of its exterior
wall`". New: "`… one per façade bay of its exterior wall (the bays of volume 2's facadeBays)`".

**Extended by reconciliation round 1 (S23-03).** `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)`, the presets table's `hatched` row, district cell. Current: "two-tone roofs by `fakeGablePerWing`". New: "two-tone roofs by `fakeGablePerWing`; by `roofscape` once stage 3 registers (volume 2 §5.3)". `## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6)`, *Render tier*. Current: "two-tone roofs over the stored wings". New: "two-tone roofs over the stored wings (over the roofscape's facets once stage 3 registers, volume 2 §5.2)". File f item 406 carries these clauses and is applied after item 405 (volume 1's BCR-14 edits the same row's neighbourhood cell).
--- V02 BCR-V2-36 (lines [4068])
**BCR-V2-36 — the stack order in the per-wing constructions (item 110 (c); item 110 fold).** `### 8.6 Stage-2 render
tier and stage-3 LOD`. Current: "Roof construction (§8.2) runs per stored wing (VIS-10) by its `BaseWing.kind` (§2.6):".
New: after BCR-V2-15's prepended sentence, one more: "A wing that stands on another (`BaseWing.on`) is drawn after it,
its ring clipping the lower wing's roof, and a solid stair's `shed` facet carries tread lines by volume 2's `stairTreads` (volume 2 §2.6, §5.6; reconciliation
round 1, S23-07); the
per-wing constructions draw a building's wings in that stack order."
--- V01 BCR-14 (lines [3461])
**BCR-14 — `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets
(G-R2)`.** (a) The presets table's `hatched` neighbourhood cell, current "tapered-triangle hatching from the ridge (≈ 17
per wing), one prism shadow pass, lobed crowns in two greens, large-tree pins under the buildings and block trees above
them (item 58 (d)), chimneys and wells" → "hatching per roof facet of the sheet's roof construction at a world pitch, each
sloped facet's lines parallel to its eave and clipped to the facet (a gable or hip wing's parallel to its ridge), with two
ridge tapers per ridge-bearing wing (15–20 triangles per gable or hip wing), one prism shadow pass, lobed crowns in two greens, large-tree pins under the
buildings and block trees above them (item 58 (d)), chimneys, pin and ground-access symbols, road surfaces and modes,
stepped ticks (volume 1, V1-5.1)". (b) `StyleSheet` gains `roads: { mode: 'full'|'outlined'|'dashed'|'hidden'; widthRatio:
number /* hatched 0.4 */ }`, `hatch: { pitchM: number /* a world length, calibrated at M5 */; minPx: number /* 1.5: below
it every second line */; details: boolean }` and `closeup: { vignette: 'none'|'fade'|'plateau' }`; the `hatched` sheet's
neighbourhood and building bands take volume 1's order list (V1-5.1.3), the `pins` and `trees` layers named; the
paint-program list gains `surface(kind)` (a shared stamp tile per kind), `steps`, the pin symbols and the ground-access
symbols of V1-5.1.2. (c) Item 110 (V1C-74, V1C-75, V1C-82): the paint-program list gains `way.stair` (a stair interval's
ticks; a ramp's converging hairlines), `retaining` and `raised` (V1-5.1.2); the hatch program runs per roof facet — `fakeGablePerWing`'s faces by
`RoofSpec.kind` until stage 3 registers, the `roofscape` facets after (V1-5.1.2; seam S23-02; the district cell's
construction switch is volume 2's BCR-V2-15); the `hatched` neighbourhood and building order gains slot 8b (retaining walls), the piers in
slot 11, raised decks in slot 14 with their shadow pass before it, and slot 12's stack order with tier shadows (V1-5.1.3).

######## f item 420 (§8.8) — STAGED (M6-P, the plan rung).
BCR-V3-6 (V03 §10) — the building band's stops, threshold, detail ladder, furniture role and wall shade. Also touches: §8.5, §8.2, §2.9. *Needed by:* V03. **STAGED (M6-P, the plan rung).**

--- V03 BCR-V3-6 (lines [2810])
**BCR-V3-6 — the building band's stops, threshold, detail ladder, furniture role and wall shade.** Heading: `### 8.8
Tiles, zoom stops, print and the canvas budget`. Current: "cover B-ZOOM's 1:50 000 → 1:500 in 27 stops". New: "cover
B-ZOOM's 1:50 000 → 1:500 in 27 stops, and eight building-band stops continue the same step to ≈ 1:125, drawn only for
buildings whose plan draws, with the plan's detail ladder by stop (V03 §5.1)". In `### 8.5 Level of detail, the city-band
figure-ground contract, way selection, first paint`, *Bands*, after "**building** — wings and" add "(entered at the stop
nearest 1:700)"; in `### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets
(G-R2)`, the colour-role list gains `furniture` (V03 §5.1), mapped in `ink` to ink at α 0.5 and in `lit` to a wood tone of
the sheet, and the paint programs gain `planWallShade` (V03 §5.1: a soft band inside each plan wall, broken at openings).
In `### 2.9 The document and serialisation`, the view keys gain `roomNumbers: 'off'|'storey'|'building'` (V03 §4.5), outside
the model hash.