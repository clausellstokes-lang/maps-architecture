### M-V07-833 V07 §2.3 2.3 Records
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | `YardPart.kind` is data-defined; each with its V07 §5.1 role and its V07 §5.4 export row); a **named beach** is no record — the `beach` run of the shore chain's `bankKinds` profile (the base's §2.3, d
### M-V07-1235 V07 §2.7 2.7 The request block, the field groups and the class column
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | `BuildingClassRow` gains `villageForm?: string` (BCR-V7-21; file f item 432): it **names a `v.` class** — the village row that plays this class at village rungs (§3.11's substitution; the compiler ref
### M-V07-1281 V07 §3.0 3.0 The village pipeline — stages, order and data keys
- UNDEFINED E1-none: no input / nothing to act on | tests=['T-V7-3'] | None
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-3'] | None
### M-V07-1354 V07 §3.1 3.1 S0 — the village draws
- UNTESTED E1-none: no input / nothing to act on | tests=[] | IN-V07-3) — forces a watercourse that the through road crosses: when terrain, access, the realm cell and this draw give none (`none`, or a still water), `water: brook` (on a `coastal` site `estuary` a
- UNTESTED E2-one: exactly one item | tests=[] | **u** — a single draw, uniform on (0, 1);
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | With such a fixed word, or on `desert` without `oasis_water`, no brook is forced: the toll house stands at an entry (else on the heart's approach) and `toll_bridge_dry` is reported (J-V7.97). 2.
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | S0 resolves the `VillageRequest` (§2.7): a value the request or a dossier gives is taken (its source recorded), and every `auto` is drawn once on `blueprint.features` from the town root (§6.1), in thi
- UNDEFINED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=[] | None
### M-V07-1395 V07 §3.2 3.2 S1 over the territory, S2 at village rungs, and VS1 — heart, nuclei, character, radius
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-13', 'T-V7-24'] | None
- UNDEFINED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=['T-V7-13', 'T-V7-24'] | None
### M-V07-1512 V07 §3.3 3.3 VS2 — the density raster
- UNDEFINED E3-cap: the maximum and its caps | tests=['T-V7-19', 'T-V7-20', 'T-V7-21'] | None
### M-V07-1544 V07 §3.4 3.4 VS3 — the palisade, before the roads
- UNTESTED E1-none: no input / nothing to act on | tests=[] | VS6 marks every block face there that lies outside the pre-reach trace as **reached** (`village.reached`, §2.7; no frontage runs on it);
- UNTESTED E2-one: exactly one item | tests=[] | *Reaching the barrier.* With `reach = min(wall.barrierReachM, palisade.barrierReachShare · R_s)` (the base's 150 m cap at the VILLAGE target, ≈ 120 m at the HAMLET target, ≈ 50 m at a 40-person thorp)
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | None
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | By default: a.
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | `policy = { waterfront: 'open', placement: 'aroundAll' }`; the density raster is read through the stage's declared input `village.density` in `ctx`.
### M-V07-1604 V07 §3.5 3.5 VS4 — the tracker-steered network
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-46'] | None
- UNDEFINED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=['T-V7-46'] | None
### M-V07-1722 V07 §3.5a 3.5a A raised way on a village map (file g item 110 (b) as revised ~23:40; J-V7.83)
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-46', 'T-V7-52'] | None
### M-V07-1807 V07 §3.6 3.6 The open space — a green or a small square
- UNTESTED E1-none: no input / nothing to act on | tests=[] | The member binds to it (its row builds nothing).
- UNTESTED E2-one: exactly one item | tests=[] | **Shape.** A `square`: round with probability `open.round[dry|water]` (0.7 / 0.9) — a regular polygon of one vertex per ≈ 3.5 m of circumference, randomly turned — else a square of side `2r` resampled
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | None
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | **Shape.** A `square`: round with probability `open.round[dry|water]` (0.7 / 0.9) — a regular polygon of one vertex per ≈ 3.5 m of circumference, randomly turned — else a square of side `2r` resampled
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | All draws on `village.open` keyed by the nucleus ordinal. 1.
- UNDEFINED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=[] | None
### M-V07-1869 V07 §3.7 3.7 VS5 — the perimeter and the one village district
- UNTESTED E1-none: no input / nothing to act on | tests=[] | The result is inserted as L1 chains with the `perimeter` role by the base's same-level splits (the base's §3.3), so every network face it crosses is split and nothing outside it is touched. 2.
- UNTESTED E2-one: exactly one item | tests=[] | **The perimeter.** The region where the density is at least `populated`, closed by a 20 m morphological close and Chaikin-smoothed, united with the palisade's enclosure where one exists and with the o
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | None
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | **The perimeter.** The region where the density is at least `populated`, closed by a 20 m morphological close and Chaikin-smoothed, united with the palisade's enclosure where one exists and with the o
### M-V07-1896 V07 §3.8 3.8 VS6 and S9–S11 — houses along ways: tofts, crofts and the slot race
- UNTESTED E1-none: no input / nothing to act on | tests=[] | **VS6, the fabric** (`FabricStrategy 'village-ways'`, PART III item 3): no block is cut.
- UNTESTED E2-one: exactly one item | tests=[] | Each slot is cut perpendicular to its frontage into **one plot** with two yard parts, the **toft** (the house yard, `toft.toftM` deep) and the **croft** (the plot's garden-close behind), and a `drive`
- UNTESTED E3-cap: the maximum and its caps | tests=[] | A block face deeper than twice the band's toft-plus-croft depth keeps its interior beyond the crofts as a **back close** — a `close` plot owned by the commons (grazing garths) of at most `slot.backClo
- UNTESTED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | VS6 estimates the slot count of every frontage run as its length ÷ the frontage centre of the band its prosperity (pass 1) reads, and the institutions' slots as the Σ of their templates' `plotAreaM2` 
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | **Block quotas (S10a).** The village dwellings `D_v` (§3.2 (3)) and the institutions are allocated to blocks (reached faces excluded) in proportion to `Σ_slots density(slot midpoint) · m` over their r
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | **VS6, the fabric** (`FabricStrategy 'village-ways'`, PART III item 3): no block is cut.
### M-V07-1973 V07 §3.8a 3.8a Levelling and retaining walls at village rungs (file g item 110 (a); J-V7.84 – J-V7.8
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-3'] | None
### M-V07-2035 V07 §3.9 3.9 S12a and the hinterland unit at village rungs — fields, meadow, commons, woods, outlyi
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V11-37', 'T-V7-17', 'T-V8-17', 'T-V8-18'] | None
### M-V07-2108 V07 §3.10 3.10 The wharf and piers (VS4's step); VS8 — ends, pins and names
- UNTESTED E1-none: no input / nothing to act on | tests=[] | The rows above run first; then a `@pin:<kind>` record (V11 §3.11) binds to a standing pin of its kind within `presence.siteReachM` of the frame's centre that no other record binds, nearest the heart f
- UNTESTED E2-one: exactly one item | tests=[] | **The wharf, landings and piers — VS4's seeding step 5** (ref:VG 1.6.9 wharf and piers (code), D5.11, restated in metres; laid in VS4's one L1 batch, since no L1 write may follow S9 — the pier count r
- UNTESTED E3-cap: the maximum and its caps | tests=[] | Without a wharf, every `Landing` recorded, with no bridge nearby, takes a single pier `s · (1 − ½F4)` long when that fits the river's maximum.
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | None
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | A `market_cross` stands at the centre of the reservation that carries the market (the open space, or the flanking square; §3.6 (4)), replacing the centrepiece §3.6 (5) drew there, or standing where no
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | Draws on `village.slot` keyed by the wharf's lineage.
- UNTESTED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=[] | The churchyard `cross` of a wayside shrine merged into a parish church (§2.4's REPLACEMENT row) is laid in the parish church's `churchyard` yard part, at its point nearest the church's door, whatever 
### M-V07-2185 V07 §3.10a 3.10a Deck plots at village rungs (file g item 110 (d); J-V7.91)
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-2'] | None
### M-V07-2217 V07 §3.11 3.11 The SettlementForge small-settlement dossiers — what the village product accepts, and
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-13', 'T-V7-21', 'T-V8-46'] | None
### M-V07-2411 V07 §3.12 3.12 Over time — the village's epochs, desertion, and the ladder hand-off in both directio
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V11-1', 'T-V6-1'] | None
### M-V07-2746 V07 §3.13 3.13 Failure handling — the village ladders (never a whole-map retry, the base's §5)
- UNDEFINED E1-none: no input / nothing to act on | tests=['T-V7-10', 'T-V7-11', 'T-V7-13', 'T-V7-31', 'T-V7-4', 'T-V7-47', 'T-V7-48', 'T-V7-5'] | None
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-10', 'T-V7-11', 'T-V7-13', 'T-V7-31', 'T-V7-4', 'T-V7-47', 'T-V7-48', 'T-V7-5'] | None
- UNDEFINED E5-data: missing, empty or contradictory data (the dossier included) | tests=['T-V7-10', 'T-V7-11', 'T-V7-13', 'T-V7-31', 'T-V7-4', 'T-V7-47', 'T-V7-48', 'T-V7-5'] | None
### M-V07-2770 V07 §3.14 3.14 Determinism — streams, addresses, locality
- UNDEFINED E1-none: no input / nothing to act on | tests=['T-V7-18'] | None
### M-V07-2858 V07 §3.16 3.16 Caverns and ruins under a thorp, hamlet or village (file g item 109 (a), (b), (j), (3
- UNDEFINED E1-none: no input / nothing to act on | tests=['T-V7-38'] | None
- UNDEFINED E2-one: exactly one item | tests=['T-V7-38'] | None
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-38'] | None
### M-V07-2950 V07 §4.1 4.1 The twelve tools on a village
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-19', 'T-V7-20', 'T-V7-21', 'T-V7-52', 'T-V7-53', 'T-V7-54'] | None
### M-V07-2987 V07 §4.2 4.2 The new event forms
- UNDEFINED E2-one: exactly one item | tests=[] | None
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | `setAttr` reaches the village's recorded inputs — `VillagePlan.form`, `.roads`, `.nuclei`, `.character.*` (each a recorded input, §2.3), `VillageRequest.*` (the Adjust events of T1), `Reservation.kind
- UNTESTED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=[] | `setAttr` reaches the village's recorded inputs — `VillagePlan.form`, `.roads`, `.nuclei`, `.character.*` (each a recorded input, §2.3), `VillageRequest.*` (the Adjust events of T1), `Reservation.kind
### M-V07-3007 V07 §4.3 4.3 Locality — what each village edit re-derives
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | None
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | "the village is re-laid around the new heart;
- UNTESTED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=[] | edit | re-derives from | effective scope (§7.3) | fate report says | |---|---|---|---|
### M-V07-3036 V07 §4.4 4.4 Lifecycle of every village edit kind (§7.4's columns)
- UNTESTED E1-none: no input / nothing to act on | tests=[] | `retireWay`, `effaceWay`, `reopenWay` (a hand `convert`, or the epoch's ops at a village rung) | the event or the epoch's op | the network's readers (a hollow way read by none), V07 §5.1's `hollow_way
- UNTESTED E2-one: exactly one item | tests=[] | `retypeLand` (one lifecycle row with volume 6's, file f item 209) | `convert` (hand) or an epoch's op | S12b, the hinterland unit, render | log / the epoch record | kept | the conversion's undo record
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | None
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | `drawWall` `retaining`; the T2 terrace stroke | the event | S10–S11's levelling, the hinterland unit, render, exports, the clerk | log | held (a drawn wall, a stroked terrace) | the event's inverse | 
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | `declareEnd` | the event (sugar `quarter` at a village rung) | VS8, labels, exports | log | held: its lasso's plots re-joined on every re-derivation; never merged or capped (§3.10) | the event's inver
- UNTESTED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=[] | edit kind | create | read | persist | regenerate | undo | migrate | |---|---|---|---|---|---|---|
### M-V07-3052 V07 §4.5 4.5 The clerk's view
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | None
- UNDEFINED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | None
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | The clerk (V10, over §11.2's tool API) reads the same records a person sees: the `VillagePlan` (form, heart, character), the ends, the fields, the palisade and the dossier's facts; it proposes with th
- UNDEFINED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=[] | None
### M-V07-3084 V07 §5.1 5.1 The look — the `painterly` family built, `ink` one click away
- UNDEFINED E1-none: no input / nothing to act on | tests=['T-V7-25'] | None
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=['T-V7-25'] | None
- UNDEFINED E8-lifecycle: save, load, undo, redo, regenerate and migrate | tests=['T-V7-25'] | None
### M-V07-3179 V07 §5.2 5.2 Bands, the first view and level of detail
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | The four bands read at village scale (§8.5's `LodBand`):
### M-V07-3189 V07 §5.3 5.3 Labels and map furniture
- UNTESTED E5-data: missing, empty or contradictory data (the dossier included) | tests=[] | "the hamlet of …"; else the rung's), then a **water qualifier** from the resolved water type (our own row: riverside, by the sea, on the island, at the ford …;
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | * **The title plate** — the village's name, its tier word (the dossier's when bound:
### M-V07-3207 V07 §5.4 5.4 Exports
- UNDEFINED E1-none: no input / nothing to act on | tests=[] | None
- UNTESTED E2-one: exactly one item | tests=[] | VTT scenes (one at the district band — the palisade and buildings as walls, gates as doors — and one at the city band); glTF / OBJ with heights;
- UNDEFINED E4-degenerate: degenerate geometry (zero-length, zero-area, self-touching, collinear, coincident) | tests=[] | None
- UNTESTED E6-rungs: every rung from THORP to the METROPOLIS cap | tests=[] | Every base format exports a village (§11.1):
C C-cliff-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-steep-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-river-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-coast-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-wall-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-bridge-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-retaining-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-deckplot-village owner=V07 DEFINED ["VILLAGE"]
C C-square-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-hinterland-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-oasis-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-frame-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-composed-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-crypt-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-plan-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-cavern-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-ruin-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-void-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-access-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-vault-village owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-epoch-village owner=V06 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-history-village owner=V06 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-works-village owner=V06 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-dossier owner=V08 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-custom owner=V08 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-players owner=V08 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-edit owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-lock owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-undo owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-saveload owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-regen owner=V07 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-light owner=rendering UNDEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-labels owner=rendering DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-export owner=rendering DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-tools owner=V09 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-layers owner=V09 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-clerk owner=V10 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-tables owner=V11 DEFINED ["THORP", "HAMLET", "VILLAGE"]
C C-village-presets owner=V12 DEFINED ["THORP", "HAMLET", "VILLAGE"]