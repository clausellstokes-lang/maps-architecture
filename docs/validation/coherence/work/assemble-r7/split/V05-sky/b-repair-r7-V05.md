
=== REPLACE ### 2.6 The lifecycle of every state field this volume adds or gives a producer ===
### 2.6 The lifecycle of every state field this volume adds or gives a producer

Every `SkyIsland` and `SkyAccess` field plugs into §2.7's staged block (file f item 251) and §2.8's registry; every other
row names its base hook in its first cell. The create column is the field's producer, the read column its consumers
(V05 §1b wires every other piece).

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `slot` | S7b (5)'s slot draw; a declaration takes the lowest free slot, or the lowest held slot when none is free (V05 §3.2 (6)) | the epoch redraw, `raiseIsland`, the anchor match | model digest | kept by succession (slot anchor); a slot a `removed` record holds is never drawn or filled at any re-derivation or epoch | restored from the undo record | — (new) |
| `key` / `Document.nextSkyPart` (§2.9) | island creation takes `nextSkyPart` and bumps it | every island reader | model digest; the counter in the document | a successor keeps its predecessor's key (§6.3) | the counter never decreases (spent) | older documents: `nextSkyPart` = 1 + the highest sky part present, 1 if none |
| `anchor` | placement (V05 §3.7) or a declaration | S14, slabs, exports, landings, the reader | model digest | kept by a scoped regeneration; recomputed only by Re-derive from S7b | inverse `setAttr` | a record with the base's world `outline` gets as anchor the outline's area centroid rounded to the lattice, and its polygon less the anchor as the rim (below) |
| `rim`, `land` | SKY's L0 batch | the unit run, the draw, the resize | geometry (the arena) | re-derived by New random on the island; kept by regenerate-keep | the batch's undo record | the base's `outline: Polygon` becomes the rim chain by one `insertChain` in a fresh arena |
| `areaHa` | the supply law or an edit | the resize, the fill, the reader | model digest | the law re-evaluates only at an epoch | inverse | — |
| `altitudeCm`, `groundRefCm` | V05 §3.9 at SKY, before field pass 2; the clearance rule (V05 §3.9 (5)); `setAttr`; a move | `elevationCm`, slabs, marks, access runs | model digest | kept, but for the clearance rule; New random re-checks the floor after re-drawing the underside | inverse | the base's `elevationCm` → `altitudeCm` = `elevationCm` − `groundRefCm` recomputed |
| `underside` | SKY (V05 §3.9 (1)) from the rule row and `island.place` | `undersideTiers` (slabs, the offset view, glTF), the strip's solid through the basis, the altitude floor | model digest | re-scaled by a resize; re-drawn by New random unless `source: 'edit'` | inverse | a base record without it gets the rule's default profile, drawn on its slot's key; a `flat` profile carries `depthCm` 0 and `tiers` 0 |
| `terrain`, `river` | SKY (V05 §3.8) | the unit run's context vector, exports, the island's `levelledGroundCm` fallback | model digest (the terrain raster in the arena's chunk) | New random on the island re-derives; T2 edits on the island key | inverse | — |
| `terrainEcho` (`river`, `relief`, `reliefClass`) | SKY (V05 §3.8 (3)–(4)): for an `own` relief the class drawn on `island.place` (index `relief`) | the island's terrain; volume 1's `terraceState` on the island's districts (V01 §3.17.7 (2)) and so the unit run's levelling (V05 §3.22 (4)); exports | model digest | re-drawn by New random on the island with the terrain; kept by every other edit (a T2 stroke changes heights, never the class) | inverse | an `own` island without `reliefClass` re-draws the class on its `island.place` key (index `relief`) at load, written and reported (J-V5.78) |
| `districts` | SKY-F, from the unit run's `NeighbourhoodResult.districts` (V01 §2.4) | the reader, labels, epochs | model digest | rewritten by SKY-F after every unit run (generation, a raise, New random, a Re-derive); otherwise succession | inverse | — |
| `reason`, `institution` | S7b (5) (V05 §3.4) or an assignment; V05 §3.15 (1b) | the fill, the unit inputs, labels | model digest | Re-derive from S7b | inverse | — |
| `placement` | V05 §3.7 | the reader, the report | model digest | kept by scoped regeneration | inverse | — |
| `occlusion` | absent; `setAttr` | S14, §8.4 | model digest | kept | inverse | — |
| `supply` | every evaluation (V05 §3.3) | the report, epochs, the reader | model digest | recomputed at S7b and each epoch only | restored | — |
| `field` (mean, density, greenery) and the island's gradient (V05 §3.11) | SKY: the gradient from the carried bands' shares, its mean written; `setAttr(field.prosperity)` a declared target (`declared.field`); island brush strokes (`setField` with `key`) | the context vector on the island (through `SkyUnitInput.field`), S10a's band capacity on the island, the clerk | model digest (the three values); the raster never stored — rebuilt on load from the island's terrain, rim, allocation, the cuts and the stroke list, as §2.9 rebuilds the ground's fields | recomputed at an epoch and by a re-derivation from S7b; a declared target and the strokes are held | inverse | older records: the mean is their uniform value, no strokes |
| `shadeBasis` (§2.9, file f item 274) | every shade evaluation (V05 §3.19 (6)), from the island as it then stands; absent on an island raised or declared since the last evaluation | every strip (onto the ground and onto islands) on generation, load, replay and every field recomputation; the strip's `basis`; the clerk | model digest (≤ 2.5 KB per island; nothing when absent) | rewritten only at those evaluations; kept by every island edit, every scoped regeneration of an island and the clearance rule (item 102 (e); J-V5.27) | restored by the undo record of the event whose evaluation rewrote it (absent again where that event wrote the first) | §7.5's island-basis step (file f item 274): a document older than it gets, once, the basis of every island not fallen or removed, from the island as stored; at or after that version an absent basis is never computed at load (J-V5.72) |
| the strips onto the ground (V05 §2.3a) | once per shade evaluation, at their first read (V05 §3.19 (6)) | the readers of V05 §2.3a | held with the field's rasters, rebuilt on load and replay from the bases and the unlevelled ground heights; never in the log | only at the evaluations and, over its scope, a ground terrain edit (V05 §3.19 (6)) | restored with the field's former state by the recomputing event's undo | tables that predate item 102 read `w_sun` = 0 (item 102 (g)'s no-op pin) |
| the strips onto an island; the island's `shadeSky` (V05 §3.11) | SKY's last step after every island's own steps; a re-derivation starting after SKY at S10a's start; each epoch; Update shade now — from the caster's and receiver's bases; at an epoch OR-ed with volume 6's building mask on the island's lattice | that island's context vector; volume 1's sky-arena readers (V01 §2.3, V01 §3.5.5, V01 §3.8.2; J-V1.87) | derived: rebuilt on load with that island's field from the two bases | with the strips onto the ground | as above | — |
| a strip's `bits`, `mask`, `basis` and `evaluated` | with the strip | the field's composition, the clerk, the view, the report | with the strip | a sampler digest that differs from the strip's basis recomputes it whole (§4.5 *Fields* (iv)) | with the strip | — (re-derived on load, never migrated) |
| `accesses` and every `SkyAccess` field | V05 §3.10 or `placeSkyAccess` | marks, lights, exports, the landings, `skyAccessObstacles`, `skyRoute`, the reader | model digest | tops re-seated on a re-derived rim (V05 §4.3), and on a resized or reshaped one with their feet re-landed as a move re-lands them (V05 §4.2) | inverse | — |
| `name` (§2.7's `SkyIsland.name`) | S13a (V05 §3.14) | labels, the gazetteer, exports | model digest with its naming record | §6.3's naming cases | inverse | — |
| the ground landing row `{ cls: 'sky_landing', at, access }` under `allocations.landing` (§2.5, §4.1; file f items 213, 282) | SKY's access step (V05 §3.10 (4)) | S10a, which takes its staff households from the host district's `modest` demand; S10b or the hinterland unit's S12a (the plot); S11 (the landing house); field pass 2's landing kernel | model digest (the allocation) | recomputed with the access | inverse | — |
| the ground landing yard, a `Reservation` of kind `landing` under `reservations.landing` (§2.5, §4.1) | SKY's ground L1 batch (V05 §3.10 (4)); `placeSkyAccess`; a move's re-landing | S8 (a hole; its attach a destination, §4.6), S10a with S9b, S12a (V01 §3.1's read-set) | geometry (the ground arena); the reservation in the model digest | re-claimed with the access | the batch's or the event's undo record | — (new) |
| the rim strip (its `setback` line and `rim_strip` face) and the island's claims — each landing `Reservation` and the institution claim (V05 §3.10 (5)) | SKY's island L1 batch | the unit run through `SkyUnitInput` (V01 §3.10.3 (2)); S10b (the top landing plot, the institution); `plantRimWalk` (V01 §3.10.3 step 4); the rim lights; SKY-F's checks | geometry (the island's arena); the reservations in the model digest | re-laid at a resize and a rim reshape (V05 §4.2), at New random on the island and at a Re-derive from SKY or earlier; a yard claimed by `placeSkyAccess`, released by an access's delete | the undo record of the event (or batch) that re-laid them | — (new; a migrated base island's arena is laid by the same batch) |
| `state`, `stateSince`, `dwellUntilWeek`, `landfall` | `IslandEpochStep` or a hand `convert` (`removeIsland` among them) | epochs, §8.2's rows, the reader | model digest | never by a re-derivation | the conversion's undo record | — |
| `declared` | a declaring event | every re-derivation (held) | model digest | held | inverse | — |
| `removed` (`seq`, `generated`, `releasedBy`) — the suppression's island form (§2.8, file f item 260; E-02) | `convert removeIsland` (V09's delete row (T10), the clerk); `releasedBy` by a T5 `sky` declaration re-filling the slot when none is free (V05 §3.2 (6)) | S7b (5)'s slot chain, V05 §3.15 (5), the report, the clerk, `removedSlots(doc)` | model digest | held: never drawn, filled or re-opened (J-V5.62) | the removal's undo restores the island whole (arena, households, accesses, landing uses); undoing the releasing event clears `releasedBy` | absent: no removal |
| `removedAccesses` (V05 §3.10 (1)) | the fold of a `delete` whose target is a generated `SkyAccess`: its ordinal appended | V05 §3.10's siting at every re-derivation that re-sites accesses; the `main` succession; the clerk; `removedSlots(doc)` | model digest | held: the ordinal skipped and counted, the lowest surviving generated ordinal taking `main` | the delete's undo removes the ordinal and restores the access | absent: `[]` |
| island `RetainingWall`s (§2.7, file f item 245; V05 §3.22 (4)) | volume 1's unit run on the island (item 110 (a)'s levelling at S10, S11); T3 `retaining` and T2 terrace strokes with the island's `key` | the island's marks and labels, the surface top, SKY-F's crypt re-test, exports, the fall | geometry (the island's arena) | generated ones re-derive with the island's terrain and plots (item 110 (a)'s rule); drawn ones held | the batch's or the event's undo record | none before item 110 |
| `Decoration.name`, `.source` (§2.7, file f item 252) | `fallIsland` | labels, the reader | model digest | never | inverse | — |
| `Decoration.members` (`DecorationMember[]`, §2.7, file f item 252; J-V5.76) | `fallIsland` (V05 §3.16 (5)) | §8.2's `fallen` row, volume 6's landfall candidate (V06 §3.5.2), volume 4's access closures (V04 §3.10), the accesses' admissible ground, the clerk, the per-landfall CSV | model digest | shrunk only by volume 6's member-leaving `setAttr` in the batch of the op that ends a member's cover (V06 §3.5.2; J-V6.108), the decoration tombstoned with the last | the `fallIsland` undo removes it; the writing event's undo restores the prior list | an older list of `Id`s reads as it stands; absent = none |
| `Way.formerClass` (volume 6's field; its row V06 §2.12) | this volume's writer: `fallIsland` (V05 §3.16 (4)), a covered way's class before it drops to `track`, only where the way carries none | V06 §2.12's row | V06 §2.12's row | written again when the `fallIsland` event replays | the `fallIsland` undo restores the prior value (absent where the fall wrote the first) | V06 §2.12's row |
| `Enceinte.condition` with its `conditionEpoch`, and `RetainingWall.state` — the stretch-state profiles (§2.2 rule 5; file f items 575, 245; item 114 (b); E-01) | this volume's writer: `fallIsland` (V05 §3.16 (4)), `breached` over each covered wall length with `conditionEpoch` the epoch in force at the fall over every run it changes (`conditionMaterial` kept), and `decayed` over each covered retaining length — both only stepping down their ladders, a run already further down kept | the profile rule's readers (§2.2 rule 5; items 575, 245, 114; V06 §2.12; V06 §3.7.7's oldest-patch-first order reads the epoch) | the profile rule's | written again when the `fallIsland` event replays; never by a re-derivation of its own | the `fallIsland` undo restores the prior profiles (and the enceinte's `lifecycle`) | the profile rule's |
| `ContextVector.arena 'sky'` (§2.5, file f item 213) | the unit run's context read | every arena-keyed row | derivation record | recomputed | — | — |
| `Reservation.owner` and `.handedFrom` of an S3 reservation an institution island leaves (§2.5, file f item 286) | S7b (5), when the slot's institution holds the reservation (V05 §3.5) | S10b (the hand-over instance's placement), S12b (a park), the raised-way generator's endpoint reason (V05 §3.22 (5)), the reader, the clerk | model digest | re-made by a re-derivation from S7b; kept by every island edit | the event's undo record | absent `handedFrom`: no hand-over |
| the island cathedral's crypt site (V05 §3.10 (5)) | SKY's claim site search with the crypt test | the cathedral's basement crypt (volumes 2 and 3's `Basement` record, which persists it); the fate list | not stored here: the building's basement record holds the crypt | re-tested with every re-claim | with the claim | — |
| `EpochOps.demandTaken`; the displaced pool's entries with cause `island` (V06 §2.1, V06 §3.8.1) | `IslandEpochStep` (V05 §3.15) | volume 6's `siting` step, the same epoch | inside the epoch event only; their effects persist as the events the step and `siting` commit | recomputed by a replay of the epoch | the epoch event's undo | — |
| the node term (derived, never stored: `h_town`'s addend) | S7b (5) and each epoch's evaluation, from the digest's `site.deposits` | `h_town` | recorded in the evaluation report only | re-read at every evaluation; a deposit change reaches it at the next epoch | — | — |
| the rule cells (`islands.json`, V05 §2.4) | the table defaults | V05 §3 where each is cited | the table (§7.6) | an `editTable` re-derives from the first reader stage (§7.6): S7b for `node`, `carry`, `fill`, `institutionFit`, `districtHa`; SKY for the arena, access and crypt cells, `casterAllowanceM` and `shade` (SKY's last step writes the bases and the strips onto the islands); S10b for `routing`; S7c for `fabricPrior`; S13a for `naming`; none for `export`; a later edit of `accessCount.handMax` removes nothing (V05 §3.23) | `editTable`'s inverse | a table version without a cell reads its default |
=== END ===

=== REPLACE ### 3.16 The fall and the landfall (`fallIsland`) ===
### 3.16 The fall and the landfall (`fallIsland`)

One `convert` event, as a declared sequence of batches (§4.11), whatever its author (the engine or a hand):

1. **Footprint.** The island's projected land face in world coordinates (`anchor` + the local ring).
2. **Covered set** (J-V5.11). Every ground entity of which at least `landfall.coverShare` of its face or band lies inside
   the footprint, by the kinds of the table below — less every locked or pinned entity and the plots that hold one (kept
   content, as §3.3's fixed obstacles; the ruin laps around them). A reservation or face that is water (a moat, a canal, a
   harbour basin, an oasis) is never covered: the part of the footprint over water leaves nothing on the ground, reported
   ("sank in <water body>"). The part of the footprint beyond the ground frame covers nothing.
3. **Relocation first.** Every use in a covered building or reservation is relocated by §4.11's rule for a step that
   empties a building (a dossier-backed use by the solver's `dossier` request; *Dossier content across epochs*), every
   household by §4.7's overflow pass inside the event — in an epoch, into volume 6's displaced pool with cause `island`
   (V05 §3.15) — the households of the deck plots that fall with their deck included, before their deck falls.
4. **The ground — one outcome per covered kind** (J-V5.11, J-V5.64, J-V5.73, J-V5.79). No edge of the ground's streets and
   plots is added or removed — the tombstoned deck plots' lines excepted, which go with them — so the plan survives under
   the rubble, ready for regrowth. Each change is a listed fate; the event's undo restores it from the undo record
   (§7.4's convert row).

   | covered kind | outcome | how it draws (§8.2) | cleared or restored by |
   |---|---|---|---|
   | building | demolished (cause `convert:fallIsland`) | gone | regrowth |
   | L3 plot (not a deck plot) | its use vacant with the `ruin` treatment | the `fallen` row's rubble over its face | volume 6's landfall clearance (V06 §3.5.2) |
   | reservation (plaza, market, precinct, park, castle bailey) | left vacant under the rubble, the `ruin` treatment | the `fallen` row's rubble | volume 6's landfall clearance |
   | hinterland `LandUse` face | kind `quarry`, owner `commons`, `source` the landfall decoration (§2.7, file f item 253): a surface rubble working that sources no underground quarry system, no mine–cavern breach and no dig-down draw (item 2) | the quarry row | volume 6's `retypeLand` of the quarry face |
   | way (its corridor band) | surface `rubble`, its routing class dropped to `track`, the class it had written to `Way.formerClass` in the `fallIsland` batch — a way already carrying a `formerClass` (a lane volume 6 downgraded) keeps it | its own state rows | volume 6's landfall clearance, which restores the class from `formerClass` and clears it (V06 §3.5.2), or a hand `setAttr` of `class` (V06 §2.8) |
   | wall stretch (its band) | `breached` over its covered length in the enceinte's `condition` (§2.2 rule 5's stretch-state profile, file f item 575): knots at the covered length's ends; a run already `breached` or `dismantled` kept, the ladder only stepping down; over every run the fall changes, the run's last-change epoch `conditionEpoch` written as the fall's epoch — the epoch in force at the `fallIsland` event — over the same stretch in the same batch, its material `conditionMaterial` kept (a `breached` patch keeps its patch row; item 114 (b); §2.7), so volume 6's oldest-patch-first order (V06 §3.7.7) reads the fall as the run's last change; the record's `lifecycle` `decayed` while any run is not `standing` — a state, no edge removed | §8.2's run `breached` row (a break with its rubble spill) | volume 6's repair of a breached ring in use (`repairWall`, V06 §3.7.5) |
   | tower; gate of any kind (`main`, `postern`, `water`, `gatehouse`, `castle`) | no state of its own (§2.7): the `breached` length on its stretch is extended over the chord of its footprint along the trace, so every covered tower's vertex and gate's junction lies inside a `breached` run; one covered while its stretch is not has `breached` written over its footprint's chord alone | by its run's `condition` | standing again with its run (V06 §3.7.5) |
   | bridge, pier, mole or quay-platform deck | `ruined` (the deck falls; under a bridge the river stays one L0 face and the way's crossing is closed) | its own state row | volume 6's `repairRaised` (item 246) |
   | deck plot on a covered deck | falls with its deck by item 110 (d)'s least disruption: its households relocated first ((3)), its building demolished, the plot **tombstoned with the deck**, as volume 6 does for a struck deck (V06 §3.19.5 (3)); never a vacant plot left on a ruined deck | nothing | a repaired deck re-offers its faces; the buildings raised on them are new lineages (V06 §3.19.5 (1), (4); V02 §3.16 (7)) |
   | raised span (its deck band's plan projection, in a ground part ≥ 1) and raised-way pier (its footprint) | `ruined` (item 244's span and support `state`) — one already `ruined` kept, one already `cleared` (its stone taken, V06 §3.19.2 (3)) kept `cleared` and never a member, the state only stepping down as the wall row's ladder does; a span whose pier is ruined becomes `ruined` with it, a `cleared` one kept `cleared` (a wall run beneath it breached by the wall row as any run the footprint covers) (arches fall with their piers, whatever their own cover); a raised way with a ruined span has its crossing closed — it has no junctions with the ways beneath, so the `track` fallback does not apply to it, and the ways beneath are touched only where the footprint covers them; an aqueduct ruined this way loses its terminal's supply, a listed fate ("the fountain in <square> runs dry") | item 110's state rows | volume 6's `repairRaised`; the vaults beneath follow the span's state by volume 4's rule (this volume writes nothing underground) |
   | `RetainingWall` stretch, generated or drawn (its band) | `decayed` over its covered length, a run of it already `ruined` (its stone gone) kept `ruined`, the state only stepping down (item 245's state, the `breach` op's result; a state, no edge removed), keyed by the wall's lineage address, so a later re-derivation of a generated wall keeps it `decayed` until an epoch's restoration re-derives it (V06 §3.19.4 (6)); a drawn wall is restored by hand | its state row | volume 6's restoration or `repairRetaining` |
   | another island's ground landing plot, yard or access foot | the plot's use closed with its building demolished like any covered building; in the `fallIsland` batch the access is re-landed as a move re-lands it (V05 §4.2): a slanted access at the nearest admissible point outside the covered set within its run; a vertical access becomes a `ropeway` from the same top where its row admits one, else F-SKY-ACCESS's ladder from its top; an access no rung places is dropped, reported, and an island left with none is reported `unreachable` (V05 §3.17) | its new landing's rows | its island's own re-derivation (V05 §3.10) |

   **Inside an epoch** the op's ruined raised parts are lifecycle entries of the epoch event, so they stand in
   `EpochScope.raised` (V06 §2.1), and volume 6's raised-way pass reads an aqueduct's lost supply at that epoch's
   `raisedWays` step (V06 §3.19.2 (4)); after a hand `convert`, at the next epoch's.
5. **The landfall record** (§2.7, file f item 252; J-V5.76). One ground `Decoration` of kind `fallen_island` whose
   `members` (`DecorationMember[]`) are the covered plots, land uses, reservations, ways and retaining walls, each by its
   `Id` (a retaining wall's cover the length the fall made `decayed`; a wall whose covered length was all `ruined`
   already, so the fall wrote nothing of it, no member), and the covered raised spans and raised-way piers not
   `cleared`, each by its raised way and item 244's support keys (`{ raised, span: [a, b] }`, `{ raised, support }`) —
   never a deck plot, which is tombstoned with its deck and listed as a fate —
   `source` the island's address and `name` the grammar's fallen form of its name. Each member leaves the list in the
   batch of the op that ends its cover (volume 6's member-leaving `setAttr`, V06 §3.5.2; J-V6.108). §8.2's `fallen` row
   draws its rubble over the members' faces and bands — a raised member's the span's deck band in plan or the support's
   `ring`; the walls with their towers and gates by their runs' `condition`, the bridges, raised parts and retaining walls
   by their own state rows. While a member stands, its face is no admissible ground for an access (V05 §3.10 (3)).
6. **The salvage ledger** is credited with `stone` = the covered land area × `stoneM3PerM2` m³, `from` the island (§2.7's
   `MaterialLedger`), so later building within the haul radius draws on it and §4.11's salvage demand weighs clearance
   near it.
7. **The sky.** Every entity of the island's arena — its own retaining walls and its bridges' deck plots included — and
   its accesses become tombstones (cause `convert:fallIsland`); each ground landing's use closes (`closeUse`), the landing
   house left vacant to step down the ladder; the island record stays live at its address with `state: 'fallen'` and
   `landfall` set, its slot freed.
8. **Undo** restores all of it from the event's undo record (§7.4's convert row) — each covered way's `class`, surface and
   prior `formerClass` (absent again where the fall wrote the first), each covered enceinte's `condition` and
   `conditionEpoch` profiles (its `conditionMaterial` untouched by the fall) and `lifecycle`, each covered retaining
   wall's `state`, and each re-landed access of another island.
=== END ===

=== REPLACE ### 3.23 Edges — every mechanism at its limits (principle (11)) ===
### 3.23 Edges — every mechanism at its limits (principle (11))

Each row gives an edge of a mechanism of V05 §2–V05 §5, or a combination with another unit's feature, its defined outcome,
its rung on §5.1's ladder (never a whole-map retry) and its test; **T-V5-33** runs one fixture per row that names it.
Degenerate geometry a kernel transaction refuses is handled by the stage's failure class on its ladder (§5.1's general
rule).

**(a) The mechanisms.**

| edge | defined outcome | rung | test |
|---|---|---|---|
| the island record at load | §7.5's validation repairs what one value re-derives from the others: `anchor` snapped to the lattice, `areaHa` re-read from the land face, `altitudeCm` raised to the floor (a fate), `removed` read from `state`, a missing `removedAccesses` read as []; a slot another live record holds is given the lowest free slot, else the record is loaded in state `removed` (its slot held, `generated` false) — each reported | repair locally | T-V5-33 |
| the access record | a top whose rim vertex is gone is re-seated (V05 §4.3); an access whose island is tombstoned is tombstoned with it; a kind the `magic` circumstance no longer admits stays until the next re-siting, which bends it to the nearest admitted kind (a fate); a foot outside the ground frame is re-landed at the nearest admissible foot inside it; the lifecycle is V05 §2.6's rows | repair locally; substitute | T-V5-33; T-V5-16 |
| the unit inputs | an island with no river, no claim (a prosperity island) or one landing carries none, none or one; the view is re-assembled identically after a save, load or replay (never stored) | check | T-V5-9; T-V5-21 (d) |
| the strip | a caster fallen, removed or without a basis casts nothing; a receiver without a basis receives nothing; a mask whose sampler digest differs is recomputed whole; a window with no cell gives `w` = `h` = `cells` = 0; save, load and replay rebuild the same bits | check; retry that piece | T-V5-33; T-V5-21 (h) |
| the rule table | a missing cell reads its default; an edited cell out of range or order is bent by §7.6's cell validation to the nearest valid value (the supply rows sorted by `v` and made non-decreasing in `h` within [0, 1]; `altitudeM` ordered; counts ≥ 1; shares within [0, 1]), the line naming it | repair locally | T-V5-33 |
| identity and lifecycle | V05 §2.5's anchors and V05 §2.6's rows at save, load, undo, redo, regenerate and migrate | check | T-V5-15; T-V5-16 |
| the supplies | with no built district cell `S_town` is 0 and no slot opens (`no supply`); below CITY the gate fails before any supply is read (`gated: rung`), and at an epoch whose rung row is `none` the target is 0 (V05 §3.15 (6)); `supply` is recomputed at S7b and each epoch, restored by undo, and an older record's value is read until the next evaluation | check | T-V5-3; T-V5-33 |
| purpose | no candidate closes the slot (`no supply` / `nothing to carry`); one candidate is taken by the same draw, its uniform consumed; a dossier institution with no roster class of the row's tags counts by its archetype or not at all; the reason is re-drawn only by a Re-derive from S7b, kept by every island edit, restored by undo | substitute; leave out and report | T-V5-4 |
| the fill | the fill stops at its first cap (plot land, 3 × `H_d`, the band's demand) within 100 batches; `A` equal to `minAreaHa` passes and below it closes; below CITY no fill runs; the sky `Allocation` is re-made by a re-derivation from S7b, kept by island edits, restored by undo | leave out and report | T-V5-4 |
| the shape | a secant step that misses `A` by more than 1 % or a non-simple outline takes F-OUTLINE's rungs; a declared lasso that is not simple, has fewer than three distinct points or zero area is bent at its dry run to the routine's clamp, else to a disc of the kind's area at its centroid (item 101 R2) | simpler shape | T-V5-6 |
| placement | no candidate runs F-SKY-PLACE; one candidate is drawn from a top-K of one; a frame smaller than the outline and its inset gives no candidate; no ground river gives a uniform bearing; no reserved precinct scores the plaza | simpler shape; leave out and report | T-V5-5 |
| the arena | the frame of a single-island document is sized as any; no ground river means no conjured river and a spring pond by its draw; a ground river with no reach near the anchor reads its nearest reach's accumulation; the hydro cell follows the rung (12.5 m CITY, 16 m METROPOLIS) | substitute | T-V5-6; T-V5-7 |
| the underside and the altitude | `flat` has no root tiers; a ring below 1 % of the land ends the stack; `depthCm` is capped by `maxDepthM`; a floor above `E_max` wins (the altitude exceeds the row, a listed fate); a surface top with no building reads the terrain; the clearance rule's lag survives save and load | check | T-V5-10; T-V5-21 (h) |
| access | every removed ordinal skipped and counted; one admitted kind drawn from a set of one; the altitude over a row's limit drops that row; a crypt with no passing site takes the half-sunk form; a foot on a deck, a pier's footprint or rubble counts as none (F-SKY-ACCESS) | substitute; leave out and report | T-V5-8; T-V5-26 |
| the island's field | computed only at CITY and METROPOLIS, where islands exist | check | T-V5-1 |
| the unit run's contract | no claim or one landing is served as any; the district count is V01 §3.16's, bounded by the fill's household cap; an outline face below one district's size makes no district and sends the allocation to F-SKY-UNIT; the run exists only where islands do | leave out and report | T-V5-9 |
| lights | a settled island's magical lights stand at 0 cd; a `flat` island's keel hangs at the rim slab's base; one access has one lantern; a missing light row reads its default | check | T-V5-11 |
| names and labels | only islands of CITY and METROPOLIS are named; an island whose land face cannot hold its `quarter` label at the city band drops it by §9.3's area rule, the name kept for the gazetteer | leave out and report | T-V5-11; T-V5-12 |
| over time | a resize whose erosion would split the land face or leave no land beyond the rim strip and the yards stops, by the buffer bisection, at the least area that keeps one face with land beyond them, listed in the epoch's report; a downward rung crossing wanes every island over its dwells, an upward one lets empty slots re-open | repair locally | T-V5-14 |
| the landfall | a footprint that covers nothing on land, or whose covered set gives no member (only `cleared` raised parts over water), lays no decoration, leaves `landfall` absent and reports "sank in <water body>"; one covered entity gives one member; covered content that is locked stays; a covered span or support already `cleared`, or a covered retaining run already `ruined`, kept as it is and no member — a `cleared` part's way still released (V06 §3.19.1 (3)), a retaining wall a member only by the length the fall made `decayed` (V05 §3.16 (4)–(5)); a fall runs at any rung (after a downward crossing included); undo restores everything of V05 §3.16 (8) | leave out and report | T-V5-14 |
| determinism with one island | its draws are slot 1's and its own lineage's; the goldens hold | check | T-V5-15 |
| the strip's geometry | a tier ring that sets no mask cell blocks nothing; a sun at the reach cap sweeps 8 × the height; a receiver above the apex is never blocked | check | T-V5-20 |
| the route | a foot coincident with its class gives `d_G` = 0; an island with no admitted access routes nothing (∞, `unreachable`); the route exists only at CITY and METROPOLIS | leave out and report | T-V5-22 (g) |
| the rim as a barrier | an island with one landing gets one stretch; a stroke of fewer than two distinct points emits no event; a stroke wholly along the rim is bent to the landing stretches | check | T-V5-27 |
| item 110 under the island | a caster whose footprint touches the projected solid only at an edge or a corner is read by cell centres, as V05 §3.9 (3) states | check | T-V5-31 |
| the declarations | every tool gains at most one parameter; a zero-length T4 stroke emits nothing; a degenerate T5 lasso is bent as the shape row states; every declaration's lifecycle is §7.4's row | check; simpler shape | T-V5-16 |
| the events | a resize to 0 or below the claim floor is bent to the floor; a `moveVertex` or `warp` that would make the rim non-simple is bent back along its drag to the last simple position (bisection, ≤ 12 steps); below CITY T5's `sky` parameter is disabled with the islands control's reason (§7.8), and an API or clerk event carrying it is bent to the plain quarter on the ground ("Floating islands need a city; this quarter is laid on the ground") — refused only where the rung is a dossier fact (F-EDIT `dossier-owned`) | simpler shape; substitute | T-V5-16 |
| locality | a one-island document's edit scopes are V05 §4.3's; an edit whose effective scope is empty (a move by zero, a `setAttr` to the same value) folds with no change | check | T-V5-16 |
| the dossier | no deposits, no node term; more eligible institutions than slots are drawn among by V05 §3.4, three at most; many nodes add one bonus; a dossier population at a village or TOWN rung fails the gate (`gated: rung`); a derivation record written under the working name DR-SKY reads as DR27 (file f item 383); an absorb's changes reach the islands at the next epoch and undo with it | check | T-V5-25; T-V5-33 |
| the clerk | an island without a basis is named "not yet in the ground's shade"; one caster over a point gives one attribution; a removed island answers "removed by you"; answers are the same before and after a save and load | check | T-V5-33 |
| marks | a strip with no cell at three samples draws no outline; an unfallen island draws its land, rim and shadow at every band; every shipped sheet of §8.2's presets table (V05 §5.1's list, the ink-family variants and `painterly` among them) resolves every sky semantic (a user sheet missing one resolves it by §8.2's slot resolution); no island, no sky mark; the parity presets carry the rows; marks are view data rebuilt by S14 after undo and redo | check | T-V5-12 |
| light and shadow | no island, no slab and no second base, and the cursor sun's floor is off; a degenerate tier ring drops its slab; a sky layer the view does not draw (hidden, and not the view's working layer; §8.4): its slabs light nothing and are not drawn, the model's strips unchanged; each occlusion mode lights as V05 §5.3 states | check | T-V5-13 |
| exports | with the setting on and no island the `sky` FeatureCollection is present and empty, with it off absent; a strip with no cells omits its MultiPolygon features; the parity presets export no sky content; an export mid-lag writes `basisCurrent` false, and an export after a load equals the one before | check | T-V5-17 |
| a lock against a dossier removal | V05 §3.15 (1b)'s lock clause | check | T-V5-14 |
| a landfall on another island's landing | V05 §3.16 (4)'s row | substitute; leave out and report | T-V5-14 |
| the most accesses | at most `accessCount.max` generated and `accessCount.handMax` hand-placed per island; a `placeSkyAccess` past the hand-placed cap is bent into a move of the island's nearest hand-placed access to the requested site ("An island takes at most {n} ways up by hand; moved {access} here"), with "Delete one first" as the alternative; an `editTable` lowering the cell below an island's count removes nothing — the accesses stand and only a new placement is bent; `skyAccessObstacles` ≤ 27 entries at the defaults | substitute | T-V5-16; T-V5-18 |
| a lock under `sky.clearance` | V05 §3.9 (5)'s lock clause | check | T-V5-31 (f) |
| the seasonal look (V05 §5.1) | every week of 0–51 the same model, hash, save, bases and strips; an arid row draws no ice and no snow on an island; a week in no band of a phase keeps the row's last phase (§8.2's cyclic read); a document whose pinned tables hold no item-117 rows draws §8.2's four override rows on the island as on the ground; a river all of whose stretches are fast draws no ice, a spring pond freezes as any `pond`; a `settled` or `waning` island dresses as a floating one; a `fallen` or `removed` island has no sky look (its landfall takes the ground's); a moved island's leaf cover moves with it | check | T-V5-34 |
| the pennants (V05 §5.1) | no festival in the view's week, or the display off: none; two festivals in one week: both, in window order (§8.2); an island with no landing: rim pennants only; a rim stretch wholly inside landing yards or the waterfall's lip: none there; a `fallen` or `removed` island: none; an island an epoch carried below CITY: V11's `SKY` row as at any rung; a ground landing: none of the `SKY` row's | check; leave out and report | T-V5-35 |
| Find on Sky (V05 §5.6) | no island: no sky entry and no "on Sky" count; one island: its matches alone; a hidden sky layer with Ground or Below working: its matches still counted and shown as ghost pins, and Go there makes Sky the working layer, drawn whatever its visibility, no event sent; a bubble never joins two islands' or two layers' pins; a match withheld by the key: absent everywhere; a `fallen` island: its matches dark, its landfall a Ground place; a `removed` island: never offered; Show gaps on an island (V05 §5.6 (4)): V01 §5.4 (3)'s `gapUnits` over its arena — under a walking-radius row an island holding no member a gap over every residential plot of it, whatever the ground beneath holds, and one holding a member no gap; under a households row each district's unserved plots; a district with no residential plot no per-plot unit; a class `IslandRule.carry.never` excludes a gap like any other; at a drawn week whose frame is not the head, an island raised, resized, moved, fallen or removed since that week: its matches, pins and gaps §11.2's listing at that week, drawn on its land and at its anchor in that frame (V05 §5.6 (5)), one raised since offering none | check | T-V5-36 |
| the one-time waits (V05 §6) | each wait at CITY and METROPOLIS with three islands, up to the population cap, within §12.1's comfort level, a row past its target only with its recorded measured gain; a wait past one second shows progress; the interactive rows never relaxed | check | T-V5-18 |

**(b) The combinations** (every one at CITY and METROPOLIS, where islands exist).

| combination | defined outcome | rung | test |
|---|---|---|---|
| cliff × shade; steep × shade | the receiver heights are the unlevelled raster, bilinear across the cliff; terrain shade (pass 1) and the island's bits are OR-ed, a point counted once; the pre-test reads the frame's `g_min` and `g_max` | check | T-V5-19; T-V5-33 |
| cliff × landfall; steep × landfall | the terrain is never a member and never changed: the rubble lies on each level where it covers a member; covered retaining walls step to `decayed`, a run already `ruined` kept (V05 §3.16 (4)) | check | T-V5-14 |
| coast × shade; harbour × shade; moat × shade | bits are set on every receiver cell, water included; no plot reads a water cell, and `S_town` leaves harbour basins and moats out; the clerk's and the CSV's areas count every covered cell | check | T-V5-33 |
| coast × landfall; moat × landfall | the part over water sinks ("sank in <water body>"); a quay, pier or mole deck covered on land is `ruined`; a moat is never a member | leave out and report | T-V5-14 |
| moat × sky access | a moat is water and its wall strip a strip: neither is admissible ground; a moat bridge's deck face is excluded as a deck | substitute | T-V5-8 |
| bridge × shade; deck plot × shade | a deck is no receiver height: its cells read the field at the unlevelled ground, and a deck plot takes that cell's value | check | T-V5-33 |
| retaining wall × shade | a retaining wall is a pass-1 caster of the daylight term (file f item 290) and a caster to the island's clearance; its levelled platforms move no receiver | check | T-V5-21 (h) |
| square × landfall | a covered plaza or market reservation is left vacant under the rubble; its market use is relocated first | substitute | T-V5-14 |
| oasis × shade | the strips set bits over an oasis as over any ground; the ground's weight is §4.5's `w_sun` × the climate row's sunlight cell, so in a hot arid row an island's under-hang reads as valued shade by the ground's own rule, while `P_I` on the island reads `w_sun` alone (V05 §3.11 (4)); with item 111's cells neutral, byte-identical to the run without item 111 | check | T-V5-33 |
| frame × shade | F-SKY-SHADE clips the window, reported as the clipped share | leave out and report | T-V5-19 (e) |
| frame × sky access | a foot is searched on the ground frame's raster cells only; a slanted row whose only admissible point lies beyond the frame is not admitted there — F-SKY-ACCESS's next rung | substitute | T-V5-8 |
| frame × landfall | the part of the footprint beyond the ground frame covers nothing; the ledger counts covered land only | check | T-V5-14 |
| neighbourhood fabric × sky access | in a ground district whose S8 is volume 1's template fabric, a ground landing's attach is a gate-ranked portal of that district's template, which a seed or a lane must reach, as on an island (V01 §3.10.3 step 4); SKY-F's check and repair lane stand | repair locally | T-V5-8 |
| terraced ward × shade | levelling moves no receiver: the strips computed at S10a equal a load's rebuild | check | T-V5-21 (h) |
| terraced ward × sky access | a landing yard is a reservation hole the ward's levelling leaves unplotted; the hoist's run reads `levelledGroundCm` at the foot; a retaining wall follows plot and block edges and never crosses a yard | check | T-V5-33 |
| terraced ward × landfall | covered retaining walls `decayed`, a run already `ruined` kept, platforms keep their datums, buildings demolished | check | T-V5-14 |
| composed building × shade; × landfall | a composed (stage-3) building casts at an epoch through volume 6's mask and is a caster to the clearance at its stack envelope's top; covered, it is demolished with its composition | check | T-V5-31; T-V5-14 |
| floor plan × landfall | a covered building's plan records (volume 3) are tombstoned with it and restored by the fall's undo | check | T-V5-14 |
| vault × island; × shade; × sky access | nothing of the sky reads or writes an underground part (item 2): vaults are no receivers and no members (a ruined span's arch vaults follow the span by volume 4's rule); an access foot never stands under a raised deck, so never on an arch vault | check | T-V5-26; T-V5-8 |
| shade × lock | a lock never holds a basis or a strip (derived, no edit kind): evaluations write every live island's basis, locked or not; a locked or pinned ground plot keeps its content while its field value follows the strips | check | T-V5-33 |
| shade × undo | an island edit's undo touches no basis; the undo of an evaluation's event (an epoch, Update shade now, a re-derivation) restores the former bases, strips and field cells | check | T-V5-16; T-V5-21 (b) |
| landfall × save and load | the decoration, its `members`, the ways' `formerClass`, the walls' profiles and the quarry's `source` persist in the model digest; a replay of the `fallIsland` event reproduces them byte for byte | check | T-V5-15 |
| season × offset; pennants × offset; Find × offset | the island's season, pennants, glow and pins drawn in its frame and displaced with it; the ground's look beneath unchanged | check | T-V5-34; T-V5-35; T-V5-36 |
| season × shade | the strips and `shadeSky` identical in every week; only the drawn shadow follows the view sun's height | check | T-V5-34 |
| season × landfall | the landfall's rubble and quarry face are ground faces: they take the ground's snow and leaf cover; nothing of the fallen island is drawn on the sky | check | T-V5-34 |
| festival × landing yard; festival × waterfall | no pennant in a yard's passage or at the waterfall's lip; a yard's two pennants flank its access top | check | T-V5-35 |
| Find × season; Find × festival | Find draws over both, under its veil, never re-rendering the sky base tiles | check | T-V5-36 |
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets. They take over the base's
island bars T10-1, T13-1, T15-1 and T102-2 (file f item 476), the island clauses of T117-1 – T117-8 (T-V5-34),
T118-1 – T118-6 (T-V5-35) and T119-2 – T119-5 (T-V5-18), T114-3's landfall clause (T-V5-14), and T120-1's registration
with T120-4's and T120-5's sky clauses (T-V5-36), as §13.2's take-over table names them. Every clause that restates an
owner item's no-op or view pin registers its fixture on V12 §3.7.8's engine under its V12 §2.13 pin, naming the pin, its
off form and the seat that writes the registration (X-V12-11): T-V5-15's item-110 clause, T-V5-19 (c), T-V5-22 (b) and
(k), T-V5-27's two, T-V5-33's item-111 clause and T-V5-34 – T-V5-36.

* **T-V5-1 — the gate** [C]. TOWN and every village rung never carry a sky allocation; a CITY with the setting off carries
  none and its ground digest equals the realism golden (T13-1); the `MFCG` and `FTG` presets carry none; a dossier-bound
  CITY whose `site.magic` resolves `none` refuses the setting (F-EDIT `dossier-owned`).
* **T-V5-2 — the count** [C]. 500 CITY seeds at the target at `wealthLevel` 0.5 and 1: every count 0–3 within ± 3 s.e. of
  the slot law at each seed's own `h_town`; slots never skip; `islands.count` 0–3 give exactly that many open slots on 200
  seeds each (their supply permitting, each empty slot reported).
* **T-V5-3 — the supply** [C, O]. V05 §3.3's calibration bars at P0; `A` monotone non-decreasing in `h_town` and
  `h_carried` over the rows (T10-1); `S_carried` equals the mean of the carried households' band values to 10⁻⁹; a
  fixture with no built district cell gives `S_town` 0 and no slot open (`no supply`).
* **T-V5-4 — the fill** [C]. On 500 CITY seeds with islands: ground plus sky households equal the roster's total exactly;
  carried households by band never include a band poorer than a band left uncarried; the stop cause is one of V05 §3.5's
  three; the fill converges within 100 batches; a slot below `minAreaHa` closes and its rows return, one at exactly
  `minAreaHa` passes; an institution slot carries exactly one instance of one of its tags and its staff, never a COUNT,
  GUILD or QUARTER record or member; with no candidate a slot closes (`no supply` / `nothing to carry`) and with one it
  takes it; no S3 reservation is left without an owner by an institution slot (100 %: the hand-over instance or `park`,
  F-SKY-HANDOVER counted); no household a dossier district-defining record's raised share holds is carried (100 %).
* **T-V5-5 — placement** [C, O]. 1 000 islands on B-CITY: no island without an assignment or declaration has more than 10 %
  of its outline cells over `core`; 0 islands within `gapM` of another; 100 % inside the frame inset; ≥ 80 % of prisons
  ≥ 1 000 m from the plaza and ≥ 80 % of palaces within 1 000 m of it; every F-SKY-PLACE rung counted in the report, a
  fixture with no candidate and one with a single candidate among them; 100 % of islands placed by rule have a rim cell on
  admissible ground or within an admitted slanted row's run of it, including on the lake, estuary and sea fixtures.
* **T-V5-6 — outline and arena** [C]. 10 000 sky outlines per template: simple (§13.2's outline property), area within
  1 % of `A`; each arena's rim is one closed chain carrying `rim`; exactly one void and one land face at L0 before water;
  every SKY commit record writes only its island's key and the ground's landing claims; for every template at every aspect
  its row admits, 100 % of outlines grown by the buffer resize to 1.5 × `areaHaMax` lie inside their frame; a degenerate
  declared lasso is bent as V05 §3.23 states.
* **T-V5-7 — terrain and the conjured river** [C]. On 500 islands with a river: its mean bearing within ± 15° of the ground
  river's; 0 non-monotonic beds; every river ends at the rim with `fall`; its width inside its clamp; F-SKY-TERRAIN's rungs
  counted; with no ground river no conjured river is drawn and a spring pond appears at its draw's rate.
* **T-V5-8 — access** [C]. Every island placed by rule has ≥ 1 access (0 % `unreachable`); a declared island has ≥ 1 or is
  reported `unreachable`; every hoist and stair foot lies on land in an admissible face (never water, a moat, a wall strip,
  a deck face, a pier's footprint, rubble, or beyond the ground frame); every ground landing plot fronts a way or has its
  trail; rope lines ≤ 350 m and bridges of light ≤ 600 m of horizontal run; every stair's helix ends at its top with a
  landing every 20 m of rise; no stair or bridge of light where `magic` is `none`; `guarded` only on a prison; after SKY-F
  every island landing attach is met by an island way, and 100 % of ground landing attaches are met by a walkable part-0
  way after S8 — in a district laid by volume 1's template fabric as in one laid by §4.6; the ground landing of a `secret`
  access is fronted and withheld from every key that does not admit it (100 %). **With item 110** (on 500 CITY and
  METROPOLIS seeds with islands and item 110's rows on, and on hand-built fixtures): 0 raised decks or raised-way piers
  inside any access column or any landing yard dilated by `deckGapM` (100 %, whether the raised part came before SKY or
  after it); every rope line and bridge of light ≥ `lineClearM` over every raised deck and raised-way pier it crosses; 0
  feet and 0 landing yards on a deck face; 0 landing attaches met only by a raised deck or an aqueduct; a T4 `raised`
  stroke ending on a rim leaves 0 ways on the sky arena and places 1 access of an admitted kind (J-VI.4 (d)), an aqueduct
  stroke to a rim and a `raised` or aqueduct stroke on an island's key are bent (J-VI.4 (d)–(f)), each with its line, and
  a `raised` stroke across an access's column is re-routed or, where `skyAccessObstacles` offers no re-route, ends at the
  last ground vertex before it with "this would cut <island>'s hoist; it ends here".
* **T-V5-9 — the unit run's contract** [C]. The rim strip is never cut or plotted; `SeamReport.portalsTotal` = 0; the
  island's district count equals V01 §3.10.3 (2)'s count for its allocation read with `districtHa`; an island with
  `h_carried` = `h_town` = 1 has 3 districts at METROPOLIS and at least 2 at CITY on ≥ 90 % of seeds; every island
  district's kind is a `sky-*` kind of V05 §2.4 and every fabric hint a valid `FabricStrategyId`; on 500 seeds, 0
  households re-homed from an island by S10a's band-range step, and each carried band's share of the island's plot land
  within ± 5 % of its carried share; its housed households equal its allocation's, or F-SKY-UNIT's overflow is reported
  (a fixture island whose land is all rim strip and claims among them); the runner lays no second terrain on the island
  and its field step reads the unit inputs' values; an island with no river, no claim or one landing is served; the
  inputs re-assembled after a save and load equal the session's.
* **T-V5-10 — underside and altitude** [C, O]. The apex clears the tallest caster beneath by ≥ `clearanceM` on 100 % of
  islands after SKY-F, locked ones excepted as V05 §3.9 (5) lists them; the altitude fixed at SKY stands (no F-SKY-CLEAR
  raise) on ≥ 99 % of 1 000 islands at CITY and METROPOLIS (V05 §3.9 (5)'s measurement, with item 110's terrace,
  raised-way and deck-plot rows on at their defaults), and the 100 % clause holds after every epoch of a century run
  (`sky.clearance`); each underside tier's ring lies inside the one above it translated by the apex step, with decreasing
  area; each profile's measured radius ratio (the tier rings' equivalent radii ÷ R) within 0.05 of ρ(z_i) at every tier;
  a `flat` island has no root tier, a floor above `E_max` wins (listed), and `depthCm` never exceeds `maxDepthM`.
* **T-V5-11 — lights and names** [C]. Rim orbs at 40 m ± 1 m; the keel light's intensity 4 000 × `h_carried`; a settled
  island's magical lights 0 cd and back at a refloat; every island named; its `quarter` label drawn at the city band at the
  reference viewport on 100 % of visible islands whose land face holds it.
* **T-V5-12 — labels and occlusion** [C]. Under `opaque`, 0 ground labels drawn inside a visible island's land face;
  under `ghost`, a sky label wins a collision against a ground label of equal priority; under `offset`, sky labels drawn at
  their displaced positions; with the sky layer hidden and Ground the working layer, 0 sky labels and no model digest
  changed (T15-1); every shipped
  sheet of §8.2's presets table — V05 §5.1's list, the ink-family variants `parchment`, `bw-print` and `night` and, from
  volume 7's V-M1, `painterly` among them — loads at every band with every sky semantic resolved, and the `fallen` row
  draws over the landfall's members; a strip with no three-sample cell draws no outline.
* **T-V5-13 — the underside's shadow under the fixed, path and cursor suns** (the owner's J98) [C, O]. A hand-built
  island (8 ha, `root` profile, 100 m altitude) above the golden TOWN, `ghost` occlusion (and (a)–(c) again under
  `opaque`), the view at the 1:500 stop, CPU reference and GPU pass: (a) under the fixed sun set to 15°, 30° and 60° and
  the path sun at three hours, the shadow's boundary on open ground within max(1 px, §8.4 (c)'s floor-cell diagonal) of the
  analytic union of the tiers' projections; (b) the shadow's area strictly increasing as the sun lowers; (c) the same
  island with a `flat` profile: at 15° the `root`'s shadow reaches past the `flat`'s by `depth · cot 15°` within 1 px
  toward the sun (toward the footprint); (d) the cursor sun at nine pointer positions at the 1:500 and 1:2 000 stops: the
  shadow falls away from the pointer, `H` ≥ 1.5 × the list's top, the GPU within §13.4's tolerance, and at a fixed zoom
  panning the island into and out of view changes `H` by 0; (e) at 15° a ground point under the island's centroid but
  outside the root's projection is lit (V > 0); (f) the penumbra's width at 200 m altitude exceeds that at 100 m; (g) the
  `flat` island with a 30 m rim against a 10 m rim: at 15° its shadow reaches 20 m · cot 15° farther toward the sun within
  1 px (the owner's "thickness"); (h) at 15° the `root`'s rung-3 shadow is one connected region (the prism form); (i) with
  the sky layer hidden and Ground the working layer no slab is lit or drawn and the ground's picture equals the map
  without islands, and with no island
  no second base exists; §13.4's base island-shadow golden stands.
* **T-V5-14 — over time** (takes T114-3's landfall clause) [C]. T8-6 stands (a CITY dropping below 10 000 loses its
  islands through waning, settled and fallen over their dwells); on the hook fixture a settled island refloats before
  any island is raised; a resize keeps
  every plot address away from the rim (100 %); after a growing and a shrinking resize and a rim reshape on the hook
  fixture's institution island, the rim strip lies `rimStripM` inside the new rim everywhere and every landing yard meets
  its top on it (100 %), the rim walk stands on the re-laid strip — one `esplanade` and one `street_trees` `Greenery` after
  each — 0 ways cross the strip, a growing resize re-derives exactly the districts that receive band faces and the district
  whose institution claim is re-searched, a shrink and a reshape's inward stretch no district but that claim's district
  where the claim is re-searched (every other island district byte-identical, the district count unchanged), after a
  re-search the institution stands on its new claim in one building with the old one demolished, a shrink requested below
  the institution floor is bent to it with the claim keeping a site in its own district, and an epoch's erosion toward a
  sliver stops at the one-face floor, listed (J-V5.77). **The landfall:** it adds and removes no ground edge, demolishes
  exactly the covered set's buildings, keeps every locked entity, credits the ledger with the covered land area × 3 m³,
  relocates every dossier use before its building goes; on a fixture whose footprint covers a wall stretch, a `main`
  gate, a tower, a bridge deck, a market reservation, a way, a harbour quay, the sea and a cliff, each covered entity takes
  its row of V05 §3.16 (4)'s table — the `breached` run with a knot at each end (a `dismantled` run kept) standing again at
  the next `fortification` phase when the ring is in use (V06 §3.7.5; T-V6-11), the tower and the gate inside it with no
  state written to any `Tower` or `Gate`, the market's use relocated, the way a `track` holding its former class in
  `Way.formerClass` (a lane volume 6 had downgraded keeping its earlier one; 0 covered ways without one) until an epoch's
  clearance restores it (V06 §3.5.2; T-V6-66), the landfall's quarry carrying its `source` and read by no underground
  quarry rule — the part over the sea reported sunk, the cliff unchanged, a locked wall kept, each listed as a fate, and the
  undo restoring every class, `formerClass`, profile and state; a fall wholly over water lays no decoration and reports
  "sank in <water body>" — on a second run, its only covered entity a `cleared` aqueduct span over that water,
  likewise (no member); a fall covering another island's hoist foot and landing plot re-lands that access as a
  `ropeway` from the same top (or by F-SKY-ACCESS's ladder), the other island keeping a way up or reported `unreachable`,
  and the undo restores it; a covered composed building and its floor plans go with it and return with the
  undo. **The dossier:** an absorb removing an
  island's palace leaves the island at once without it, and at the next epoch the island takes the next palace instance
  where one exists, else becomes a prosperity island where the rich band admits it, else wanes (the three cases on
  fixtures); with the island locked, the palace still leaves at once, the island keeps its reason and vacant claim listed
  `held without its institution` at every epoch, and (1b) runs at the first epoch after the unlock; each
  conversion's undo restores the model byte for byte. **With item 110:** the landfall fixture also covers an aqueduct span,
  a viaduct's raised-way pier and the span it carries (itself less than half covered), a generated retaining wall on a
  terraced ward and a bridge carrying deck plots — each by its row of V05 §3.16 (4)'s table: the span on the ruined pier
  `ruined` with it, the viaduct's crossing closed and the ways beneath touched only where covered, the aqueduct's lost
  supply read at that epoch's `raisedWays` step when the fall is an epoch's (its ruined parts in `EpochScope.raised`; the
  next epoch's for a hand `convert`), the wall still `decayed` after a re-derivation until an epoch's restoration (on a
  second run, a covered stretch of it made `ruined` before the fall — a `DeclineOp` `breach`, then its `dismantle`,
  V06 §3.19.4 (3) — kept `ruined`, the rest of its covered length `decayed` and the wall a member; on a third, its
  whole covered length so made, nothing of the wall written and the wall no member), the platforms' datums unchanged,
  0 vacant plots left on the ruined deck and its later repair re-offering its faces to new
  lineages; the covered spans, piers and walls in `members` as `{ raised, span: [a, b] }`, `{ raised, support }` and `Id`s,
  the same members after a re-derivation of the viaduct, each leaving in the batch of the op that ends its cover (V06
  §3.5.2), the deck plots listed as fates, never members; all of it in V05 §5.5's per-landfall CSV, and 0 edges of the
  ground's streets and plots added or removed beyond the tombstoned deck plots' lines. **A raised way over a wall**
  (T114-3's landfall clause): on a fixture whose footprint covers an aqueduct's span and the run beneath it, the run
  `breached` by the wall row and the span and the supports it covers `ruined` by theirs, `members` holding the span and
  the supports; then the deck's repair, by hand and, on a second run, by V06 §3.19.2 (5) at the next epoch —
  `repairRaised` alone, no `repairWall` (§2.7's crossing table, *unchanged meeting*) — and the landfall's undo restoring
  the run and the span. The other way round, the run stands again by its `repairWall` (V06 §3.7.5) with the span still
  `ruined`, no `repairRaised` in that batch. §2.7's crossing table (row W12) names this clause for the raised way's
  other states too, each on its own run of that fixture: a span over the run already `ruined` and, on a second run,
  `cleared` (kept `cleared`, no member, its way still released, V06 §3.19.1 (3); on a third run, one whose record reads
  `vault`, read `open` under the wall, so no chamber stands under it); every span over the run fallen; a support by the
  run's band `cleared` (kept `cleared`, no member) and, on a second run, `ruined` with both its spans as a topple leaves
  it; the deck extended by a frame growth before the fall (a variant whose raised way over the
  run has a foot on the old frame ring) and, on another, re-spaced by a hand edit of its `spanSpacingCm`; and, from the
  later of P6 and V07's V-M3 (which builds the hand-off down), a VILLAGE whose hand-off down carried the raised way and
  made the ring its palisade (V07 §3.12), a settled island falling there at its dwell's end (V05 §3.15 (4)). Each is an
  *unchanged meeting*: the run `breached` by the wall row and the covered spans and supports by theirs, the wall row
  writing nothing of the raised way and the raised rows nothing of the run. With the aqueduct locked, it is kept as
  content the ruin laps around (V05 §3.16 (2); F-SKY-LANDFALL), `members` holding none of its parts, and the run beneath
  is `breached` all the same.
* **T-V5-15 — goldens and determinism** [C]. Two sky fixtures join §13.3's goldens — a CITY with a prosperity island and a
  conjured river; a METROPOLIS with a palace island and a prison island — identical on the five engines; every stream key
  distinct (§6.1's sky fixture); a one-island document draws slot 1's indices only; an island raised after a fall takes a
  new part; a document with an island declared, moved, resized, given an access and brought down replays to the session's
  digest, and a saved and reloaded landfall equals the session's byte for byte. **Item 110's pin and shift** (J-V5.67):
  the suite registers on V12 §3.7.8's engine (X-V12-11); with item 110's rows off, read as V11 §3.24.0's switch table,
  both sky goldens are byte-identical to their pre-item-110 digests (V12 §3.7.8's off-state set); switching the rows on at
  their defaults changes both once, recorded as one declared shift naming the two fixtures by V12 §3.7.6's rule (raised
  ways and retaining walls beneath and on the islands; `groundRefCm` and the altitudes where a raised part stands under a
  solid); the METROPOLIS fixture pins one raised way under an island (T-V5-31 (a)).
* **T-V5-16 — editing** [C, O]. Every event of V05 §4.2 undoes exactly; §7.3's oracle checks byte for byte outside V05
  §4.3's scopes on B-EDIT sequences with island edits (10³ in the PR tier, 10⁴ nightly); a move keeps every address on the
  island; New random on an island keeps the ground's digest; a declaration where `h_town` = 0 carries the `held against
  its supply` fate; a fourth island is bent to join the nearest island (J-VI.4 (a)); the dossier-magic refusal holds; a
  resize below the claim floor and a reshape past it are bent with `bend.island.keepRoom` and `bend.island.rimStop`, a
  reshape toward a non-simple rim is bent back to the last simple position; a seventh hand-placed access on one island is
  bent into a move of its nearest hand-placed access; a `sky` quarter at a TOWN rung is bent to the ground
  on a standalone map and refused on a dossier-bound one; every tool gains at most one parameter; an edit with an empty
  effective scope folds with no change; the undo of an epoch, of Update shade now and of a re-derivation restores the
  former bases, strips and field cells, while an island edit's undo touches none.
* **T-V5-17 — exports** [C]. GeoJSON sky coordinates equal `anchor` + local exactly and validate; the `sky` collection is
  present and empty with the setting on and no island, absent with it off; each island's VTT scene imports with no manual
  steps; the glTF island mesh is a closed manifold and validates; CityJSON with PLAT's extension validates; the parity
  presets export no sky content; an export mid-lag carries `basisCurrent` false and one after a load equals the one before.
* **T-V5-18 — budgets and the comfort level** (item 119; takes T119-2 – T119-5's island clauses) [C]. V05 §6's rows
  on B-CITY and B-CITY-lite METROPOLIS seeds with three islands, or their fallbacks applied and reported, the obstacle
  row with 27 accesses; the one-click path unchanged (§12.5). Item 119's comfort level at every island rung — CITY and METROPOLIS, each at its top and at the population
  cap, with three islands: each one-time wait of V05 §6's list, five seeds, p95 ≤ 10 000 ms from the click to the complete
  result on V12 §3.15.9 (2)'s wait timer (T119-2), an `advance` with islands timed in total (V06's T-V6-24 fixtures with
  their islands); every wait over one second naming its stage within one second, never an empty frame (T119-3); every
  sky row above its target holding its `perf.qualitySpend` row (T119-4); V05 §6's interactive rows not relaxed against
  the previous release (T119-5).
* **T-V5-19 — the shade strip moves the field, gently** (item 102 (g)'s island clause) [C, O]. A uniform district — level
  ground, one district kind, no driver varying across it — with a hand-built island (8 ha, `root`, underside 100 m above its
  ground) over its southern edge, latitude 50°, `w_sun` at its default: (a) the mean pass-2 prosperity over the cells the
  strip blocks for at least three samples is lower than over the district's unblocked cells by the expected difference —
  `w_sun` × the mean shade share of those cells, passed through the field's smoothing computed on the same fixture, never
  assumed — within ± 10 % of it; (b) no plot's band differs by more than one from the same fixture with the strip left out;
  (c) with `w_sun` = 0 the field and the town are byte-identical to the run without the island term, and with no island
  every strip is empty and the field byte-identical to the base's pass 2 (no-op pins) — this fixture's NoOpPin
  registration on V12 §3.7.8's engine under `item102.sun` (V12 §2.13; its off form the cells T102-1 names, `w_sun` 0),
  written by the M6-sky seat landing P1; (d) the strip identical on the five engines;
  (e) an island at the frame's edge reports F-SKY-SHADE's clipped share; (f) V05 §6's strip row; (g) over a cliff
  and a steep valley the island's bits and the terrain's are OR-ed, each point counted once.
* **T-V5-20 — the model and the picture agree; the underside shapes the strip** (J98) [C]. For each sample, the CPU
  reference's rung-3 shadow of the smooth tiers under the path sun set to the equinox at that sample's hour, on flat
  ground, covers exactly the cells the strip marks for that sample except cells its boundary crosses; a `root` island's
  strip at sample 0 reaches past a `flat` island's of the same outline by its depth × `c` within one cell along +ŝ (toward
  the footprint); a 30 m rim against a 10 m rim lengthens the `flat` island's strip at sample 0 by 20 m × `c` within one
  cell along +ŝ; the basis rim's simplification (≤ 256 vertices) moves no strip bit on the fixtures; a tier ring below one
  mask cell blocks nothing and a receiver above the apex is never blocked.
* **T-V5-21 — order, lag and the supply** [C]. (a) `S_town` at S7b and at an epoch equal to 10⁻⁹ between `w_sun` at its
  default and 0 when only the islands' strips differ; (b) after a move, an altitude, a resize and New random on an island,
  the ground's field rasters, every plot's derivation record and the shade view's veil byte-identical to before — only the
  pending outline moves — the strip's basis stale and the fate listed; at the next epoch (or after Update shade now, over
  its two windows only, the basis's `by` reading `update`) the strip recomputed from the island's new state and the field
  moved; (c) the epoch after a fall carries no bits from that island; (d) a document with an island moved and an epoch run
  replays to the session's field byte for byte; (e) a lower island under a higher one reads `shadeSky` > 0 on its cells in
  the higher one's strip and 0 elsewhere; (f) on a fixture where a house (volume 6's building shade mask, after one epoch)
  and the island shade the same sample point at the same sun, the OR counts it once, at the default sampler and at four
  points per cell alike, and the strip's `bits` equals the mask's; (g) the participant `sky.islands` runs once per epoch at
  `afterField`, after S6's re-evaluation, and a history run with the engine's other participants switched off draws the
  same island values; ground plus sky households equal the epoch's target after `siting` (100 %), the released households
  placed first from the displaced pool with cause `island` and the taken ones subtracted by `demandTaken`; (h) **the lag
  survives a save**: move an island, save, reload, then re-derive a block with a prosperity brush — the field raster and
  every derivation record equal those of the same session without the save, byte for byte; the same after an F-SKY-CLEAR
  raise and after a `w_sun` = 0 table (the strips still computed and held); the same on a **terraced fixture**: an island
  over a ward that S10 and S11 level with retaining walls — the strips computed at S10a equal those a load rebuilds after
  the levelling, bit for bit — and after a T2 terrain stroke under a strip (the bits re-read over its scope from the
  unchanged basis equal a load's rebuild); **a raised island**: an island raised at an epoch (after S6) and one declared by
  T5 between epochs, each saved and reloaded before the next evaluation — the load writes no basis, neither casts nor
  receives a strip, and the field raster and every derivation record equal those of the same session without the save,
  byte for byte; after the next epoch's S6 (or Update shade now on it) each casts; a document whose `schemaVersion`
  predates the basis step loads with the basis of every unfallen island computed once, and never again; **one strip per
  evaluation**: with volume 1's S9b registered, the strips S9b's manor sun factor reads and those field pass 2 folds are the
  same held strips, bit for bit, at generation and at a re-derivation from S10a (whose bases are written at S10a's start,
  before step (i)).
* **T-V5-22 — siting across the island** (item 103) [C, O]. On 300 CITY seeds with islands, in the siting statistics suite
  (item 103 (e)): (a) no class `IslandRule.carry.never` excludes is carried by any island (100 %) and no NEEDS row is
  satisfied by island water; (b) a class with a district coverage row serves the island's districts at or above the
  ground's served share of districts, its island members spaced by its same-kind row, and with the coverage weight 0 the
  run is byte-identical to one without coverage (no-op pin: these seeds' NoOpPin registration on V12 §3.7.8's engine
  under `item103.coverage`, its off form the cells T103-3 names, written by the M6-sky seat landing P2); (c) island classes
  with a ground supply edge stand at a mean route distance to their providers below that under random placement on the
  island; (d) the ground's suppliers of island
  classes stand nearer the landing feet than under random placement; (e) a `secret` access carries no pull of a class
  whose clientele is not clandestine (100 %); (f) the crime-aligned classes stand farther from a prison's guarded hoist
  foot than their baseline; (g) on hand-built fixtures every route distance equals the sum of its legs to the centimetre (a
  foot outside the walls reaching an inner class through its gate; a foot coincident with its class), `skyRoute` names the
  access of the least sum, a `river` or `sea` edge across arenas is ∞, and an island with no admitted access routes
  nothing; mirroring item 105 (k) across the arenas: (h) a multi-output producer with island consumers sits nearer its
  dominant output's landing foot than its random baseline, and island consumers of a shared ground provider bind to it by
  the route; (i) split pairs across the arenas appear for split classes past the threshold, are reported, and never appear
  in the parity presets; (j) the per-arena relaxation settles within its cap, the second pass moving fewer members than the
  first, byte-stable across runs and worker interleavings; (k) with the web's weights, `comfortM` and the spacing at 0, the
  result is byte-identical to the run without items 105 and 107 (no-op pin: these seeds' NoOpPin registration on V12
  §3.7.8's engine under `item105.web` and `item107.spread`, their off form V11 §3.7.4's web off form with the cells
  T107-4 names, written by the M6-sky seat landing P2).
* **T-V5-23 — custom institutions on islands** (item 104) [C]. A dossier custom institution of archetype `exotic-tower` is
  a `tower` candidate where the world has magic and not where `magic` is `none`; a `martial-keep` is a palace candidate at
  `landmarkLevel: landmark` and not at `standard`; a revision that changes its archetype keeps it on its island unless a
  hard row of its new profile fails there, and then re-sites it on the ground by least disruption, the claim standing
  vacant until a later epoch re-occupies it with the next instance first; zero placement failures.
* **T-V5-24 — custom chains across the island** (item 104 (h)) [C, O]. On 200 CITY seeds with islands and a fixture set of
  active custom chains — a perishable food chain, a luxury chain whose consumers are rich households, and a chain one of
  whose processors is a custom `exotic-tower` carried as the island's `tower` — in the siting statistics suite: (a) no
  chain's resource or processing node is carried by an island except the island institution, and no chain resource is
  sited on an island's conjured water (100 %); (b) the ground end of every cross-arena link stands nearer to the landing
  foot of its shortest route than under random placement of that node; (c) the flow order by route distance holds in at
  least the share the base's ground-only bar declares for the same chains; (d) a chain with nodes on two arenas is never
  reported as close at street scale across the arenas, and a quarter name, when one arises past item 72's threshold, lies
  on the ground; the same bars hold for a dossier's `activeChains[]` fixture; (e) an import or export store of a chain with
  an island node stands at a ground gate or quay (100 %); (f) a chain toggled off and on returns its island nodes to their
  sites where nothing else changed; (g) a T6 declaration of a processing node onto an island is held and lists the
  "crosses the hoist" fate; zero placement failures.
* **T-V5-25 — the magical node** [C]. On 300 CITY seeds each of a dossier fixture without deposits and the same dossier with
  a `magical_node` `available`: `h_town` rises by exactly `node.bonus` (clamped at 1) wherever the interpolated value is
  above 0 and not at all where it is 0; the count, `A` and `E` move monotonically with it (T10-1's monotonicity); two nodes
  add one bonus; `discovered` adds nothing at generation and the bonus at the next epoch; `depleted` and `removed` add
  nothing, and a node removed at an absorb leaves every island floating until the next epoch's evaluation, when the law may
  start its wane (never a vanishing); a standalone map's `h_town` equals the dossier-free fixture's; with a ruin fixture
  holding the node, the term is unchanged and no island rule reads the underground arena; on that fixture the `why` on the
  town supply names that ruin from the report's `ruin.node` line (V04 §3.5.0a (9)) — its new name after a rename of the
  ruin — while on the fixture with no ruin it names the deposit and no ruin; a dossier at a TOWN population fails the
  gate (`gated: rung`).
* **T-V5-26 — the island cathedral's crypt; no catacomb in the sky** (item 109 (k), J111) [C]. On 200 CITY and METROPOLIS
  seeds with a cathedral island: the cathedral carries the settlement's largest crypt, inside the island's rim slab — its
  floor ≥ `cryptFloorM` above the slab's base at every point of the claim — or, where no site passes, the half-sunk form
  with its fate (100 %); on a `flat` island likewise; 0 underground parts, links or catacomb sources on any island (100 %);
  every catacomb lies under a ground cemetery or a quarry ossuary; no island churchyard is a candidate or ranked as the
  largest cemetery; island churches are counted once in the catacomb count; the S3 precinct passes to the largest ground
  church (or `park`), whose crypt is never ranked above the cathedral's.
* **T-V5-27 — the rim as a barrier** (item 106) [C]. Generation lays 0 enceintes on any sky arena; a wall drawn on an
  island with two landings gives exactly two walled stretches, each across its landing yard with a gate at its attach and a
  tower at each rim anchor, and 0 wall edges elsewhere on the rim; one landing gives one stretch; the enclosure test reads
  the island as sealed, the barrier's kind `sheer`; a stroke along the rim away from a landing is bent to the landing
  stretches with "the drop is the wall here" (J-VI.4); adding a third access adds a third stretch; with item 106's `barrier`
  closure and profile off, byte-identical to the base (no-op pin: this fixture's NoOpPin registration on V12 §3.7.8's
  engine under `item106.barrier`, its off form the cells T106-5 names, written by the M6-sky seat landing P2). **With
  item 110:** 0 island `RetainingWall`s classed as an `Enceinte` or a member of a barrier circuit; a T3 `retaining` stroke or T2 terrace stroke on an island lays a
  `RetainingWall` on the island's arena, drawn in its frame and displaced with it under `offset`, tombstoned at a fall and
  exported in `sky`; a retaining stroke on the rim strip or along the rim is bent inward — every point in the strip moved
  radially to 1 m inside the `setback` line, the others unchanged — with `bend.retaining.rim` (J-VI.4 (g)); the unit run's
  levelling lays 0 retaining walls on the rim strip; with item 110's terrace rows off, the island is byte-identical (no-op
  pin: the same fixture registered under `item110.terrace`, its off form V11 §3.24.0's `terrace` row, by the same seat).
* **T-V5-28 — ladders across the arenas** (item 108) [C]. On the surveyed dossiers with islands: no ladder pair is counted
  twice across the arenas; every COUNT, GUILD and QUARTER record's members, counted on both arenas, lie inside its range; a
  cathedral island's subsumed parish churches, resident priest and wayside shrine each count once as its members, on the
  ground or carried, never as additions; an island institution is a singular or SIZE record (100 %).
* **T-V5-29 — the suppression's island form holds** (J-V5.62) [C]. On 200 CITY and METROPOLIS seeds with at least two
  islands: remove a generated island and a generated access on another island, then run a Regenerate, a Re-derive from
  S7b, New random on the other island, a save and reload, and a century of epochs at `auto`: both stay removed (100 %) —
  the removed slot never drawn, filled or re-opened, its outcome `removed by you` in the report; the higher slots' islands
  identical to a run where the removed island was never there but its slot counted filled; the deleted ordinal never
  re-sited and the island keeping a `main` access (the lowest surviving generated ordinal); 0 households allocated to a
  removed slot and ground plus sky households equal to the roster's total at every step; with `islands.count` pinned at 2
  and one of the two removed, 1 island after every re-derivation; an `adjust('islands.count')` to 3 after the removal
  releases nothing — the held slot stays `removed by you`, only the free slots open, and with every slot held the adjust
  opens none and lists its fate — a T5 declaration takes a held slot only when no slot is free, and the removal's undo
  restores the island byte for byte.
* **T-V5-30 — what the raised-way generator reads of the sky** (J-V5.63) [C]. At generation (§4.3's slot) the generated
  raised-way set is byte-identical with the islands setting on and off; on 500 CITY and METROPOLIS seeds with islands and
  on the epoch fixtures of volume 6's raised-way pass: 0 raised ways with a sky endpoint, sky evidence or a sky water source
  (100 %); an elevated road bound to a precinct whose cathedral an institution slot took up still stands, its reason naming
  the hand-over; the aqueduct's need at an epoch counts 0 island households; 0 aqueduct terminals, basins, cisterns or
  fountains on an island.
* **T-V5-31 — item 110 under and on the island** [C, O]. (a) The METROPOLIS sky golden pins one raised way under an
  island: the caster ceiling at SKY reads its deck top with its parapet and its raised-way piers, and the apex clears it by
  ≥ `clearanceM`. (b) On the epoch fixture where volume 6's raised-way pass builds an aqueduct under a floating island and
  a new stage raises a stepped temple beneath another: after the epoch, `sky.clearance` has raised each island's
  `groundRefCm` to the caster (its `elevationCm` kept unless the floor failed, a listed fate "raised clear of the
  aqueduct"), `shadeBasis` untouched, and a replay of the epoch gives the same values. (c) A stepped island temple (volume
  2's `stepped-temple` row): the surface top reads the highest massing tier at each point, and the crypt lies under massing
  tier 0 inside underside tier 0 with its floor ≥ `cryptFloorM` above the slab's base, re-tested at the levelled datum. (d)
  A raised way removed beneath an island leaves its `elevationCm` unchanged. (e) An `own` island's
  `terrainEcho.reliefClass` is the class its `island.place` draw (index `relief`) gives, 100 % over 500 seeds; New random
  re-draws it with the terrain; an `own` record loaded without it gets the same class, written and reported; an `echo` or
  `none` island carries none; and volume 1's `terraceState` on the island's districts reads that class, `plain` for `echo`
  and `none` (T-V1-21). (f) **A lock under the clearance**: on fixture (b) with one island locked (and
  again with only its `altitudeCm` path locked), `sky.clearance` rewrites its `groundRefCm` and `altitudeCm`, keeps its
  `elevationCm` where the floor then fails, lists "clearance held by your lock", and the invariant suite passes by the
  island's exemption; unlocked, the same island is raised. (g) A composed (stage-3) building beneath an island is read at
  its stack envelope's top.
* **T-V5-32 — the stage order and SKY's data keys** (J-V5.70) [C]. With `@plat/hood` and `@plat/sky` both registered, the
  `StageDecl`s sort at load with no cycle, SKY after S7b (its S7c hook included) and before S8, S10a and S12a; S7c's
  declared read-set holds neither `reservations.landing` nor `allocations.landing` (volume 1's read-set test, T-V1-35); S7b
  (1)'s supply term reads each sky pseudo-district at its island's `anchor` + the outline's centroid (100 %); on 500 CITY
  seeds with islands SKY's ground commit records write no data key but those two, and after S10a every host district's
  `modest` residential households plus its landing rows' staff equal the `modest` households S7b allocated it (100 %);
  with the islands setting off neither key carries a row and the ground digest equals the realism golden (T13-1).
* **T-V5-33 — the edge suite** (principle (11)) [C]. One fixture per row of V05 §3.23 whose test column names it — the
  island and access records at load, the strip with no caster, receiver or cell, the rule table's bends, the supplies with
  no built land, the dossier's caps and rung, the clerk's answers without a basis and after a save and load, the coastal,
  harbour and moat shade, the deck receivers, the oasis in a hot arid row, the terraced ward's landing yard, a lock and the
  shade — each asserting the row's outcome with its rung reported, and no crash, hang, lost datum, silent wrong result or
  whole-map retry. **Item 111 on the island** (g item 111; V05 §3.8 (4), V05 §3.11): on an arid fixture with an oasis, the water
  pull and the climate cell at their arid values, no oasis, spring or oasis grove stands on any island, every island's
  `P_I` and water are byte-identical to the same fixture with item 111's cells neutral, an island may float over the oasis
  (its class `water`) and the aqueduct's source search may take the oasis's spring but never an island's water — the arid
  fixture's NoOpPin registration on V12 §3.7.8's engine under `item111.water`, its off form V11 §3.24.0's `climate`
  dry-cell row, written by the M6-sky seat landing P1.
* **T-V5-34 — the island through the year** (item 117; V05 §5.1; takes T117-1 – T117-8's island clauses — T117-3's
  rows and T117-6's opening week have none, the island taking the ground's season rows at the view's week) [C]. On the
  two sky goldens (T-V5-15) and two METROPOLIS fixtures — an `arid` and a `cold` climate row, each with a prosperity
  island carrying a conjured river and one carrying a spring pond, deciduous crowns on both: (a) (T117-1) the same
  document hashes identically in all 52 weeks, its saved bytes, `shadeBasis`, strips and `shadeSky` unchanged — the
  `item117.season` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; a `view` pin over weeks 0–51),
  written by the M6-sky seat landing P3; (b) each island face and crown draws, week by week, the look a ground face or
  crown of its kind draws in the same week under the same climate row — never a row of the island's own (an `own`
  `mountainous` island over `plain` ground included); (c) (T117-2) at the leaf-colour weeks' middle week at least five
  distinct crown colours across a deciduous island's trees, its leaf cover deepening week by week through the leaf-fall
  weeks, on the island's surfaces only, and moving with the island after a move; (d) (T117-4) the arid fixture draws no
  ice and no snow on any island in any week; (T117-5) on the cold fixture the spring pond freezes in the ice weeks, its
  first ice week at or before any of the conjured river's, the river's fast stretches and the waterfall's 12 m lip disc
  stay open water, and `sky.fall` and `sky.mist` draw in every week; (e) (T117-7) at each season's middle week the
  island's look passes T112-1's contrast and colour-blind checks, and in a snow week the island's land, field faces and
  roofs draw `snow` and its rim ticks separate it from the snowy ground by the ink / ground row of §8.2's contrast
  matrix; (f) the drawn shadow's length follows the view sun's week while the strips do not change; (g) every picture
  export of an island draws and names the chosen season, and a VTT island scene carries its frozen water as `ice`
  polygons (§11.1); (h) (T117-8) the season switch re-skins the sky tiles within V05 §6's season row (R12-30).
* **T-V5-35 — festival pennants on the islands** (item 118; V05 §5.1; takes T118-1 – T118-6's island clauses —
  T118-5's staging has none, V11's `SKY` row naming no staging place) [C]. On the two sky goldens with a festival
  fixture (a dossier tradition with a two-week window, a culture motif row and a deity) and with a previewed generic
  festival: (a) (T118-1) the document hashes identically with decorations on and off and in every week — the
  `item118.festival` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; a `view` pin with its `tiles`
  clause), written by the M6-sky seat landing P3; (b) pennants stand on every island not `fallen` or `removed` exactly in
  the window's weeks (T118-2), at V11 §3.25.7's `SKY` row's counts, along the rim and two at each landing top, with no
  kind of a ground tier's row on any island of either golden (T118-4), and none in a landing yard's passage, at the
  waterfall's lip, on a ground landing, on the void or over a label's keep-out (T118-6); (c) (T118-3) the same festival
  draws byte-stable sky tiles per seed across views and exports, and a moved island's pennants move with it; (d) a
  picture export draws them and names the festival, a VTT island scene draws them in its image only; (e) (T118-1) with
  no tradition and no preview, the sky tiles are byte-identical to the base's (the pin's `tiles` clause).
* **T-V5-36 — Find on Sky** (item 120; V05 §5.6; takes T120-1's registration and T120-4's and T120-5's sky clauses)
  [C]. On the two sky goldens and B-CITY-lite's CITY and METROPOLIS seeds with islands, on V09's app harness, each with
  three chip sets — a class the islands hold, an island institution's name and an island by its name — with Show gaps
  off and on: (a) (T120-1) the document hashes identically with Find on and off, and every chip off, or **Clear**,
  restores byte-identical sky tiles — the `item120.find` registration of the sky goldens on V12 §3.7.8's engine (V12
  §2.13; a `view` pin with its `tiles` clause), written by the M6-sky seat landing P3; (b) each chip's sky matches equal
  §11.2's gazetteer rows on the islands at the key, the panel's "on Sky" count their number; (c) with Ground working,
  every sky match shows a ghost pin at its drawn position under each occlusion mode, with the sky layer shown and hidden,
  and Go there sets Sky with the match's island — Sky then drawn whatever its visibility, 0 events logged and its
  `LayerSpec.visible` unchanged (V05 §5.6 (3)); (d) (T120-5) at the city band every sky match has a pin or a bubble,
  each carrying its chip's second cue, and no bubble joins two islands' or two layers' pins; (e) under a player view on
  an island form of T-V9-66's knowledge canary — a `secret` access's landing yard and a concealed use on an island —
  nothing withheld surfaces in a suggestion, count, glow, pin or ghost pin; (f) (T120-4; its fall cases from the later
  of P3 and P6, which builds the landfall, and its `advance` from the later of P3 and V06's E6, which builds `advance`)
  the chips survive every band and layer change and a raise, a move (the glow moving with the island), a fall (its
  matches dark, its landfall offered on Ground), an `advance` with its epochs, an undo, a redo, a regenerate, a load and
  a migration, each match set equal to a fresh evaluation there, and a chip whose last match goes — an island
  institution's after its island falls — stays at count 0, dark; (g) Show gaps outlines exactly V01 §5.4 (3)'s
  `gapUnits` on the islands as V05 §5.6 (4) reads them — each island district for a class with no coverage row or a row
  counted by district or neighbourhood; under a walking-radius row every residential plot of an island holding no
  member, whatever the ground beneath holds, and none of one holding a member; under a households row each district's
  unserved plots by V01's per-plot reading — a class `IslandRule.carry.never` excludes among them; (h) item 120 (j)'s
  suggestion and glow timings hold with three islands at the METROPOLIS cap (V05 §6's Find row); (i) from the later of
  P3, P6 and V06's E6 (P6's `IslandEpochStep` and landfall; V06's `advance` and history frames, V06 §3.15.2), at a drawn
  week whose frame is not the head (V05 §5.6 (5)), on (f)'s fixture after an `advance` whose epochs raise one island and
  resize another, then a hand move of one island and the removal of another, and on T-V5-14's falling CITY, each
  scrubbed to a week before those epochs: every sky match, glow, pin, ghost pin and gap unit those of §11.2's listing at
  that week, drawn on its island's land and at its anchor in that frame — the raised island offering none, the moved
  one's at its former anchor, the removed one's offered, and the fallen island's on Sky as the frame holds it, never its
  landfall on Ground; the head's reading back when the scrub returns to the head.

**Parity.** No reference has islands (II.6 (8)), so no parity number binds them. The nearest look is Neighbourhood's lone
patch — its own ground tone and a drop shadow marking its extent on an empty field (`research/findings/vg-ng-devlogs.md`
§B3.5) — so M6-sky's sitting is V12 §3.9.1's `PanelSpec` for M6-sky, a descriptive NG set (X-V12-4): five island
close-ups in `hatched` beside five Neighbourhood patches, rated for "reads as a floating patch" — information for the
owner, never a gate.
=== END ===


