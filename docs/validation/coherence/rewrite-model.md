# Rewrite — base part §2 (domain model and schemas)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-model; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-model`, 2026-09-29)
- P1 inputs read (§2 whole, inventory-model, canon model section and every ruling routed, f items 202–278, 575, 578 and the §2 parts of 286, 303, 305, 313, 333, 362, 370, 371, 406, 420, 459, 576 with every BCR text, g items 105, 106, 109, 110, 111, 113, owner documents): done
- P2 routing digest (work/rewrite-model/routing.md): done
- P3 new text (docs/validation/coherence/new/base/model/01-domain-model-and-schemas.md): done
- P4 sizes, mapping table, rulings, f items, conflicts, cross-part notes: done
- P5 results file, LANDED: done

## Outcome

The new §2 is one file, `docs/validation/coherence/new/base/model/01-domain-model-and-schemas.md`, starting with the
heading line `## §2 Domain model and schemas` exactly as today; its subsections keep their numbers and headings (§2.1 –
§2.9), so no cited subsection is renumbered and no id is renumbered. It applies every file f item routed to §2 (76 section
items, 575, 578 and the §2 parts of 14 items homed elsewhere), the model parts of g items 105, 106, 109, 110, 111 and 113,
the 14 conflict rulings routed here, the 7 wiring gaps, the 5 elegance rulings (3 UNIFY, 2 KEEP APART), the 12 agreement
disagreements and the 44 open findings, and defines the 3 UNDEFINED and 1 UNTESTED edges and the 3 UNDEFINED
combinations routed to model. The part grew: the f and g items add build-depth records and rules the base did not hold.
CONFIRMED by a word-level diff against the archived §2 (ARCHITECTURE.md md5 01fea21f, lines 469–2451): 39 131 words kept
verbatim, 3 395 removed, 15 024 added.

## Sizes (principle (9)'s shrink goal)

| measure | before | after |
|---|---|---|
| words | 42 526 | 54 155 |
| bytes | 268 919 (263 KB) | 343 687 (336 KB) |

**Words removed: 3 395** (measured). By source (PLAUSIBLE — attributed by reading the diff): restatement ≈ 1 950 (the
underground part-0 level details now II.7.2's and II.7.3's; the staged layers' island rules II.6's; the stage-3 hook's
Fantasy Manor narrative V02's; the geometry-floor bullet folded into its field; the entrance §5.3 row, the
schema-complete sentences, the capacity clamp, the elaboration states and the pack retention each stated once; the
content-records and placement pointers of §2.7; the Size paragraph's copy costs pointed to §3.3; the view-state bridge
list pointed to §11.3); narration ≈ 150 (the "(R12)" round finding id, the "amendments of 2026-09-25 / 2026-09-27 and
2026-09-28 add" framing of the registry list); duplicated mechanisms ≈ 350 (E-01: the stretch-state profile stated once
at §2.2 rule 5 instead of twice; E-02's lift rule once); verbose prose ≈ 950 (§2.1, §2.2 rules 1 and 7 — the role lists as
one table —, §2.5, §2.6's entrances, basements and plan steps, §2.9's document comments).

**Words added: 15 024** (measured). By source (PLAUSIBLE): file f items ≈ 12 600 (the raised-way record, support step,
clearance and span rule ≈ 1 500; the retaining wall and deck plots ≈ 1 100; the plan rung's records, the crypt ladder, the
half raise, the datum of stacked and deck wings, the entrance hint, storey and solid-stack rules ≈ 4 000; the massing
records and DriftBounds ≈ 900; the per-rung elaboration inputs, suppression and registry additions ≈ 1 800; the sky,
underground, village and dossier record additions ≈ 2 100; §2.9's counters and view keys ≈ 600); g items ≈ 900 (the
oasis's records and lifecycle, the barrier closure, closing arcs, stretch class and harbour-mouth chain, the history
record, the lost void); wiring, types and edges ≈ 1 500 (MB-02 – MB-13's types, MC-11's declarations, the producers and
readers of W-FLD-05/06/13 and MW-05, §2.4's missing-data edges, the frame combinations, the ground-part counter).

**Why the part is outside the band (not a defect; principle (9)).** The band assumes fixed content; here file f's items
and six g items are ruled content the base had not absorbed, each at build depth. Of the original content 8 % was
removable without touching a rule, value, bar, lifecycle row or reasoned decision: §2 is the model's schema — interfaces
whose every field and comment is a fact other parts cite (§3 cites §2.2 rules 3 and 5 as the home of demotion,
dissolution, the split flag and pin release; §4–§11 cite the record comments) — and the canon's REFERENCE rows that would
have cut more were applied only where the home states the fact (J-RM1). No part shrank by more than half, so no nuance
audit is triggered.

## Judgment calls (vetoable; say "veto" to flip)

* **J-RM1 — references applied only where the home states the fact.** Of the canon's 77 REFERENCE rows, 44 were applied
  and 33 kept at §2 because the named home does not state the fact: the kernel structures and rules §3 cites as §2.2's
  (demotion, dissolution, the split flag, pin release, rule 5's binding order, the hash tables, Size); the further
  underground parts' level mapping (II.7.6 does not state it); Tunnel, UndergroundSystem, Gallery, Chamber and
  UndergroundLink (V04 §2.1 reads them as base-declared, f items 247–250 edit the base lines); the dossier staged records
  (no volume declares them); the stage-3 intake fallback (f item 223 rewrites it in §2.6). Keeping over cutting because a
  cut to a home that lacks the fact loses it (principle (3)). Each row is in the mapping table.
* **J-RM2 — the hinterland's "lots" kept**: §2.2 rule 1's L3 list and `LandUse.face` name a hinterland holding (§4.9's
  weighted-Voronoi lots), not G-lot's building parcel; FTG's "around stage lots" is a quotation.
* **J-RM3 — ground arena parts ≥ 1 and `Document.nextGroundPart`** for g item 110 (b)'s raised decks ("ground parts from
  1, allocated once and never reused, as the underground's and sky's parts are"), canonical beside the other two
  counters; a raised part's entities keep unprefixed addresses (§2.1 prefixes only arenas outside the ground layer),
  their arena `Identity.key`.
* **J-RM4 — types a base record uses declared in the base (S3, MC-11)**: `Unit`, `Segment` (§2.1); `OutfallInto`,
  `Outfall` (§2.3); `FabricStrategyId`, `SeamRun`, `TypedBoundary`, `BlockKind`, `SquareType` (§2.5); `WingRole`,
  `MassingFamilyId`, `MassingRef` (with `stack`), `DriftBounds`, `DeckContext`, `FurnitureItem`, `basementDoor`'s
  signature (§2.6); `BarrierKind`, `WallCondition`, `RetainingState`, `RaisedWayRecord`, `InstanceOverride`,
  `DecorationMember`, `ChamberKind`, `HistoryRecord`, `PersonFields` (§2.7); `NameRef`, `TextRef`, `PlotUse`, `RosterRef`,
  `AssignmentRef`, `EditRef`, `RuleRef`, `PlacementOrder` (§2.8); `PackedIndex`, `UniformGrid` (§2.2); `StatisticsRecord`,
  `OrphanRecord` (§2.9). Left cited in their volumes (the f item cites them there and only staged fields read them):
  `DormerRow`, `MassingFamilyRow`, `TierLay` (V02), `AccessHead` (V03), `HoodRecipe` (V01), `RaisedReasonKey` (V06);
  `SkyIsland`, `UndersideProfile`, `ShadeBasis`, `SkyAccess` stay V05 §2.1–§2.2's (MODEL-0432's reference; f 251's "as V05
  §2.1 declares them"), §2.7 naming the fields the base reads.
* **J-RM5 — `Outfall.into` maps an oxbow to `'lake'`** (f 206 adds `oxbow`; V04's mapping listed every other still water
  as `'lake'`).
* **J-RM6 — `Block.depthClass` is `'standard' | 'deep'`**, S8's deep-interior test (§4.6), read by §13.5's keep-test
  (W-FLD-13; wiring chosen over dropping because the statistic needs it).
* **J-RM7 — the oasis's model (g 111's wiring consequence)**: `WaterBody.spring { at, flow }`, a grove as `Greenery`
  `grove` and gardens as `LandUse` `garden`, each with `fedBy`; channels drawn from the links; the pull weighted by
  `spring.flow`, which volume 6's failing spring lowers (a stored quantity for g 111 (b)'s weakening pull).
* **J-RM8 — §2.4's missing and contradictory data**: an unnamed way is legal until S13a names it; a trade partner the
  slice no longer holds leaves its road, bearing and key, weighed 0 by `TradeFlow` (roads outlive their trade); a
  document without `slopeP95` gets it on load by S9's rule; `formerClass` equal to `class` reads absent; the registry
  path test (§13.2 *Document tests*) covers `Way` and `Junction` lifecycles.
* **J-RM9 — the capacity (MC-09)**: residential max(1, floor(…)); a slot without houses makes a non-residential building
  of capacity 0; "the capacity bounds" stated once.
* **J-RM10 — g 106's barrier closure**: `Enceinte.closure` `'barrier'`; `anchors[].end` a number (stretch k's ends 2k,
  2k + 1), `on` the barrier kinds; `arcs` by anchor ends and `BarrierKind` (J-VI.3), written by S5a's classification;
  `stretchClass` a step profile of `'full' | 'parapet'` on the new knot role `wall_class_knot`, values V11's
  `walls.barriers` rows, absent = today's wall; `Gate.mouth` the harbour-mouth chain. Stored arcs chosen over a derived
  reading because the classification runs once at S5a and V01, V09, V12 and the exports read its result.
* **J-RM11 — g 113 in the model**: `HistoryRecord` one per document in the model digest (peak with `symbolic` and
  evidence, coarse epochs with mapped events, refoundings, buried systems); `Provenance.symbolic`; the lost void is V04's
  access state (E-39), §2.7 stating that access counts through open links.
* **J-RM12 — the frame combinations**: a raised part sized to the ground's frame plus margin, growing with it; an
  aqueduct sourced beyond the frame laid to the outer ring without a ramp, a declared course beyond it bent to the ring
  (item 101 R2); a retaining wall ends on the ring; a deck slot crossing the ring left out and reported, re-offered by
  frame growth.
* **J-RM13 — `Recipe.presetId`'s readers**: the generation report's recipe line (§5.4) and the reader's recipe panel
  (V09) (W-FLD-06).
* **J-RM14 — V11 values cited without numbers (S2, R-c)**: the span rule, support step, clearance and state snap cite
  `raisedWays.structure` and `retaining.settings` by name; the numbers (E-01's 100 cm included) stay at V11 rows 79–80.
* **J-RM15 — f item 266 (BCR-V6-21)** edits §4.11's *The epoch-spread mutation* paragraph (its heading is BCR-V6-1
  (a)'s); nothing of it lands in §2 (cross-part note to pipeline).
* **J-RM16 — narration tags not carried**: the new text cites owner items (item N, g item N), decisions (J-…) and homes,
  never the change-request or canon ids that brought a sentence (file f item N, MC-, MB-, W-, E- ids, seam ids); this
  report and the canon keep them.

## File f items applied (where each now lives)

| item | where in the new §2 |
|---|---|
| 202 | §2 part: none of its text lands in §2 (its homes are §1.1, §4.11, §4.12, §7.7, PART III); checked, no §2 change owed |
| 203 | §2.1 Arena parts (sky parts ≥ 1, `nextSkyPart`); §2.2 `PlatKey`, rule 1 sky island part, rule 7 `rim`, `sky_access`; §2.9 `nextSkyPart` |
| 204 | §2.2 rule 1 sky island part (the void face, L0 kind `sky`) |
| 205 | §2.3 `Terrain.outfalls` comment, `OutfallInto`, `Outfall` |
| 206 | §2.3 `WaterBody.kind` `oxbow`, `cutFrom`, `epoch`; slow change (`shiftCourse` cut-off, `siltReach` on an oxbow) |
| 207 | §2.4 `Way.surface`, `slopeP95`; §2.7 `HoodPlace`; §2.8 registry |
| 208 | §2.4 `wayFall`, `flowToward` dropped on load, `Junction.arms` comment and `chamber` |
| 209 | §2.4 `Way.formerClass` (the `EvolveOp` and `retypeLand` texts are §4.11's) |
| 210 | §2.5 `Block.content`, `squareType`, `ringCentre`, `voidCorner`, `overrides`; `District.boundary`, `fabric`, `fabricParams.depthRatio`; `Reservation.stage` S8; migration rows cited |
| 211 | §2.5 `District.terrace` |
| 212 | §2.5 `District.core`, `outskirts`' writer; §2.8 registry |
| 213 | §2.5 `ContextVector.arena` `'sky'`, `Allocation` rows `at`/`access`, `allocations.landing`, `Reservation.kind` `landing`, `Block.interior` `rim_strip`, the sky district kinds |
| 214 | §2.5 district kind `village` |
| 215 | §2.5 `Reservation.kind` `green` |
| 216 | §2.6 `BaseWing.role`, `key`, `arcade`; `type WingRole` |
| 217 | §2.6 `Building.nextWingKey`, `massing` |
| 218 | §2.6 `Wing.base`, `dormerRows`, `dormers` |
| 219 | §2.6 `Porch.kind` |
| 220 | §2.6 `ComposedTower.base`; `Composition.row`, `grammar`; the courts-derived sentence (stored composition) |
| 221 | §2.6 `type PathShapeRow = MassingFamilyRow` and the table-migration row |
| 222 | §2.6 `RoofSpec` `shed`, `high` |
| 223 | §2.6 the stage-3 contract (composed towers' ground rings; composer at the base wing's storeys) and the intake fallback |
| 224, 228 | §2.6 *Entrances* rule 1 (the entrance hint; the free part of its side) |
| 225 | §2.6 `Room.wing` by key; the wing-reference sentence after the stage-3 contract; `StairCore.tower` by key |
| 226 | §2.6 `Basement.kind` `raised`; *Basements* crypt ladder and lift; the half cellar's raise; datum raise sentence; §5.3 row text |
| 227 | §2.6 `BaseWing.on`, `solid`; `WingRole` `tier`, `shrine`, `stair` |
| 229 | §2.6 *The base outline builder* items 3–4 (`massStepped`, `stairTreads`, `massOval`, deck buildings) |
| 230 | §2.6 *Entrances* rule 5 (the solid stack) |
| 231 | §2.6 *Heights* (the wall-side datum sample) |
| 232 | §2.6 `Storey.furniture`, `FurnitureItem`, `Room.nextFurniture`/`name`, `Opening.hinge`/`swing`/`steps`, `WindowRec.kind`, `Chimney.air`, `ProgramRoom.origin`/`subLocation`, `CarriedShapes`, stored-composition carry, step 6 |
| 233 | §2.6 capacity `R(s)` and the table edits that re-home |
| 234 | §2.6 `BaseWing.partName`; builder item 1 |
| 235 | §2.6 `Building.declaredRooms`; §2.8 plan-rung inputs |
| 236 | §2.6 `Opening.point`, `wall` comment |
| 237 | §2.6 `BuildingInput.accesses`, step 1, `ProgramRoom.anchor` `{ access }`, `Plan.heads`; §2.8 inputs and `stale` |
| 238 | §2.6 `Basement.crypt`; *Basements* crypt; *A requested basement* end |
| 239 | §2.6 `Entrance.faces` `tunnel` |
| 240 | §2.6 step 1 `storeyRange`; the fourth rung (a solid wing reaches none) |
| 241 | §2.6 `Entrance.storey`; *Entrances* rule 4 |
| 242 | §2.6 *Basements* walk-out at a retaining wall |
| 243 | §2.6 *Basements* forced basement (DR17) |
| 244 | §2.4 `Way.raised`; §2.7 `RaisedWayRecord`, *Raised ways* (support step, clearance, span rule with `country`, readers, source, lifecycle) |
| 245 | §2.7 `RetainingWall`, `RetainingState`, `stepProfile`, *Retaining walls*; §2.2 rule 5 stretch-state profiles, rule 7 `retaining_state_knot` |
| 246 | §2.5 `Plot.deck`; §2.7 *Deck plots* |
| 247 | §2.7 `Tunnel` (`outfall`, `serves`, `chambers`, `depthOffsetCm`, `name`, `grilles`), `Chamber.kind`, `ChamberKind`, `UndergroundSystem.sources` |
| 248 | §2.7 `UndergroundSystem.kind` `ruin`, `variant`, `name` |
| 249 | §2.7 `UndergroundLink.cause`; `Chamber`/`Gallery.reusedBy` |
| 250 | §2.7 `ChamberKind` `archVault`; `Chamber.span`, `monument` |
| 251 | §2.7 sky island block (V05 §2.1–§2.2 cited, the fields the base reads); §2.8 registry |
| 252 | §2.3 `WaterBody.fall`; §2.7 `Decoration` `fallen_island`, `members`, `source`, `name`, `DecorationMember` |
| 253 | §2.7 `LandUse.source` |
| 254 | §2.7 `Enceinte.pathway`, `underuseSince`; §2.8 registry |
| 255 | §2.7 `Pin.kind` `stocks`, `maypole` |
| 256 | §2.7 `CustomChainRecord`, `CustomServiceRecord`; `DepositSite.key` `res:uid:`; §2.8 registry, dossier paths (the key law is §7.7's) |
| 257 | §2.7 `PowerRelation.kind`, `sign`, `hidden`, `strength` |
| 258 | §2.7 *Both faces of a wall* (the arc classification reads `WallBarrierRow`, `WaterfrontThreatRow`) |
| 259 | §2.7 `Use.specialisation` (the S11 draw is §4.7's) |
| 260 | §2.8 `LifecycleEvent.detail.suppress`; *Removals that hold* |
| 261, 263 | §2.8 `ElaborationRecord.inputs` per rung, `stale` per rung |
| 262 | §2.8 registry (`room:` addresses) |
| 264 | §2.8 registry (`MutationPlan`, `Enceinte.pathway`/`underuseSince`, `Way.formerClass`, `Use.strain`, `BuildingShadeMask`) |
| 265 | §2.8 `LifecycleEvent.detail.why` |
| 266 | not in §2 (J-RM15) |
| 267 | §2.8 registry (`VillagePlan`, `VillageEnd`, `VillageField`) |
| 268 | §2.8 decline hooks (hollow ways) |
| 269, 270 | §2.8 registry (label, help, explainer, purpose, section providers, generic provider) |
| 271 | §2.8 `DerivationRecord.placements`, `PlacementOrder`; the declared records-digest shift |
| 272 | §2.9 `Recipe.product`, `hood` (the `closeup` event text is §7.1's) |
| 273 | §2.9 `ElaborationChunk` comment (`PlanReport`) |
| 274 | §2.7 sky block (`shadeBasis`); §2.9 *What the snapshot holds* |
| 275 | §2.9 `ChunkRef.block` `fields` |
| 276 | §2.9 `Recipe.rung` |
| 277 | §2.9 view keys `thematic`, `workingLayer`, `restore/<id>` |
| 278 | §2.9 view key `showUnexcavated` (the §11.1 and §11.3 parts are rendering's) |
| 575 | §2.7 `Enceinte.condition`, `WallCondition`, *An enceinte's condition by stretch*; §2.2 rule 5, rule 7 `wall_state_knot` |
| 578 | §2.6 `basementDoor` declaration; step 3 `external` |
| 286 | §2.5 `Reservation.handedFrom`; *Reservations* hand-over sentence |
| 303 | §2.5 hole sentence (every footprint hole a `court`); §2.6 `BuildingInput.compositionRow`, `bands`, `layer`, `attached` |
| 305 | §2.6 `BuildingInput.deck`, `DeckContext`; *Basements* no cellar on a deck; *A requested basement* `bend.deck.basement` |
| 313 | §2.7 `Greenery.along.way` optional (the rim walk) |
| 333 | §2.6 carry rule 4 (stacked wings checked) |
| 362 | §2.4 `WayClass` gains `aqueduct` (BCR-V9-26 (b)'s class clause; `drawWay`'s `raised?` and the dry run are §7.1's) |
| 370 | §2.6 *Heights* (stacked wing, deck building, `levelledGroundCm`, `rebaseStack`), `Building.heights`, carry rule 2 |
| 371 | §2.6 capacity `A(s)` by `storeyRange`, ground `area2`; `Storey.level`, `wings`; *Basements* ground wings and `external` widened |
| 406 | §2.6 step 6 (`facadeBays`) |
| 420 | §2.9 view key `roomNumbers` |
| 459 | §2.9 `docId` (given by the host) |
| 576 | §2.5 `ContextVector.dist` at territory rungs |
| 385, 505, 510 | not in §2: 385's comment is §7.7's (the type itself is declared in §2.6 by MC-11 — cross-part note); 505 and 510 are §14's package lines |

## File g items (their model parts)

* **105** — `Use.branchOf` (§2.7) with its lifecycle, readers and migration; `Building.use` comment (§2.6); registry (§2.8).
* **106** — `Enceinte.closure` `barrier`, `anchors`, `arcs`, `stretchClass`, `Gate.mouth`, `BarrierKind` (§2.7);
  `wall_class_knot` (§2.2 rule 7); the waterfront rule's circumstances (§2.7 comment).
* **109** — `UndergroundSystem.kind` `ruin`, `variant`; link `via: 'breach'` and `cause: 'reuse'`; `reusedBy` (§2.7).
* **110** — `RetainingWall`, the raised ways, deck plots (§2.7; §2.4 `Way.raised`; §2.5 `Plot.deck`); ground parts ≥ 1
  (§2.1, §2.2, §2.9 `nextGroundPart`); stacked and solid wings (§2.6).
* **111** (wiring consequence, new design) — the oasis's records and lifecycle (§2.3 *The oasis*; §2.7 `Greenery`,
  `LandUse` `garden`, `fedBy`; §2.8 registry); the island exclusion sentence (§2.3).
* **113** (wiring consequence, new design) — `HistoryRecord` (§2.7), `Provenance.symbolic` (§2.8), the lost void (§2.7
  *The staged layers*, V04's access state).
* **102, 103, 104, 107, 108, 112** — no model part routed; checked: none of their text lands in §2 beyond the records
  already cited (104's custom records are f 256's).

## Conflicts resolved (14)

| ruling | resolution in the new §2 |
|---|---|
| MC-01 | `lot` → `plot` outside quotations (the plot mix, the plot cut, bent plot cuts); `BuildingInput.plot`; PathShapeRow's "lot-driven composer" gone with f 221; hinterland "lots" kept (J-RM2) |
| MC-02 | `lifecycle: Lifecycle` shown on every entity interface of §2.3–§2.7 (Terrain, Junction, SubDistrict, Block, Frontage, PlotBound, SubLocation, Gate, Tower, Castle, Bridge, LandUse, Institution, Household, Person, Faction, Religion, FamilyUnit, Membership; SkyIsland's is V05's) — checked by script |
| MC-03 | `Basement.floors` ≥ 0, 0 a crawl space |
| MC-04 | `LifecycleEvent.cause` gains `` `convert:${string}` `` |
| MC-05 | `ContextVector.arena` `'sky'` (f 213) |
| MC-06 | *Basements* names `deriveEntrances`' pass (S11's entrance and basement derivation) |
| MC-07 | the island's geometry is `rim`/`land` (V05 §2.1; §2.7) |
| MC-08 | `AssignmentRef` declared (§2.8) and used on Plot, Building, Use, ContextVector; `BuildingInput.assignment` the resolved `Assignment`; `rosterAssignment` and `assignment` defined with producers and readers |
| MC-09 | capacity max(1, …) for a residential building; 0 non-residential (J-RM9) |
| MC-10 | §2.9's canonical-form bullet lists `elaborations` among the never-canonical |
| MC-11 | Segment (§2.1), Outfall (§2.3), TypedBoundary, FabricStrategyId (§2.5), DriftBounds (§2.6) declared; Rung → §1.1, TableId → §7.6 (cross-part notes) |
| MC-12 | §2.2 rule 1 states once why part 0's `margin` role sits on the underground pseudo-district |
| KXC-03 | §2.2 rule 6: "what survives the clear, and how, is §3.3's (locks and pins: §7.2)" |
| V07-XCONF-2 | the span rule's step (2) gains `country` (J-C4); reason list gains `country` |

## Open findings closed (44)

* MODEL-RESTATEMENTCLUSTERS-001 – 014: each stated once — 001 §2.1 *Arena parts* (PlatKey, UndergroundSystem.part,
  Document counters and the registry cite it); 002 §2.1 *Layers* (§2.7's staged comments cite it); 003 `BaseWing.spans`
  (Passage.frontBuilding, Wing.spans cite it); 004 *Entrances* rule 1 (BuildingSlot.entranceOn, Building.entrances,
  Entrance and §5.3's row cite it); 005 rule 4 (`nextEntrance`, `Entrance.vertex` cite it); 006 the capacity bounds
  (Building.households, InteriorLadderRow, the ladder table cite them); 007 `Plot.fieldBand` (ContextVector, step 1, the
  ladder, the band memories cite it); 008 `Plot.builtBand` (the geometry floor there; the ladder and band memories cite
  it); 009 §2.8 *Fact tiers* (FactTier, factTier and Identity.dossier comments cite it); 010 *Basements* (`Basement.access`
  comment cites it); 011 §2.8's elaboration record (§2.6 cites it); 012 §2.9's pack-set rule (Document.packs and
  UndoRecord.redo cite it); 013 the Tunnel lifecycle comment (Gallery, Chamber, the decline hooks cite II.6's table); 014
  the plain-words summary kept by design (house style), restating no rule beyond §2.2 and §2.8's headlines.
* MC-01 – MC-12: closed by the rulings above.
* MW-01 – MW-04: accounted by the wiring lane; closed here by W-HOOK-02 (each staged record names its volume), the
  producers named for `ContextVector.dist`/`upwind`/`aspect`/`slope`/`baseCm` (S10 (10)), `Frontage.lengthCm` (S9),
  `Block.depthClass` (S8), `Way.slopeP95` (S9), `Outfall` (S1), and the readers of `Enceinte.walkCm`, `Recipe.presetId`.
* MW-05: §2.8 *Dossier paths* ends with the dossier's route into the model and §7.7 item 1's never-read list (item 86).
* MB-01: "II.7.4 (R12)" → "II.7.4" (§2.7 AccessPoint comment).
* MB-02 – MB-13: `AssignmentRef`, `OrphanRecord`, `PackedIndex`, `UniformGrid`, `PersonFields`, `PlotUse`, `RosterRef`,
  `StatisticsRecord`, `TextRef`, `NameRef`, `EditRef`, `RuleRef` declared (§2.2, §2.7, §2.8, §2.9).

## Wiring gaps closed (7)

W-HOOK-02 (BuildingGenerator's comment: the base implements `outline()`, V02 `outline()`/`compose()`, V03 `plan()`;
each staged block names its volume and milestone) · W-FLD-04 (MC-08) · W-FLD-05 (`Enceinte.walkCm`: S7 writes; §11.1's
VTT and glTF wall tops and §8.3's close-up symbol read) · W-FLD-06 (J-RM13) · W-FLD-13 (J-RM6) · KWG-09 (E-15: centidegrees
the one angle unit; the kernel removes the 16-bit binary angle — cross-part note) · MW-05 (above).

## Elegance rulings applied

* **E-01 UNIFY** — §2.2 rule 5 *Stretch-state profiles*. Equivalence list: ☑ canonical form (first-vertex knot on an
  open chain, none on a closed chain, equal neighbours dropped, all-equal → scalar, default → absent) · ☑ write (near knot
  new state, far knot the former; `splitThrough` for a non-vertex end; no stretch = whole chain) · ☑ read (`sampleProfile`
  by arc length, cyclic when closed) · ☑ regenerate (knot kept on a surviving vertex; re-placed within
  `retaining.settings.stateSnapCm` — the one cell both records read, its value V11's (J-RM14) — else dropped and merged;
  first-vertex knot always re-placed) · ☑ cut/join by J-K23's `rekey` · ☑ undo from the writing op's record, knot rows
  included · ☑ migrate (absent = default; the former scalar = constant profile) · ☑ RetainingWall keeps (§2.7):
  values, `retaining_state_knot`, writers (retaining `DeclineOp` breach → decayed, dismantle → ruined; `repairRetaining`;
  V05's landfall decayed; V07's house-platform walls through V06's pool), restoration writes standing, readers (V06
  §3.19.4, V04 footings, the renderer, §11.1's export per run, the clerk) · ☑ Enceinte keeps (§2.7): values,
  `wall_state_knot`, writers (DeclineOp breach/dismantle, V05 landfall breached, V06 repairWall), lifecycle rules
  (abandoned on neglect; decayed while any run is not standing; lifted by the no-stretch repairWall), §8.2's gap glyphs
  and trace discs, §11.1's per-run LineStrings with `id` and `run`.
* **E-02 KEEP APART** — §2.8 *Removals that hold*: the two record forms kept, the reason stated (an island's removal
  holds a slot and an archived arena for undo), one lift rule stated once.
* **E-15 UNIFY** — §2.1: centidegrees the model's one angle unit; ☑ every read angle is already `Cdeg`.
* **E-37 UNIFY** — §2.1 `type Unit` (the union of the three vocabularies); ☑ `deg` and `cdeg` both kept; ☑ `count` and
  `people` both kept; ☑ V11's `ColumnSpec.unit` and V12's `Unit` named subsets, each exactly its present list.
* **E-39 KEEP APART** — §2.8's decline hooks state that the ladders stay separate (scope, values, transitions, writers
  differ), the stretch-state profiles alone one mechanism; the lost void joins V04's access-state set (§2.7).

## Edges and combinations defined (routed to model)

| edge | outcome | failure rung | test |
|---|---|---|---|
| M-model-943 E5 (ways: missing, empty, contradictory data) | §2.4 *Missing and contradictory data* (J-RM8) | none needed (defined readings); a load-time `slopeP95` write is §7.5's migration | T77-1 gains the removed-partner clause (cross-part note); the registry path test |
| M-model-943 E8 (ways' save, load, undo, redo, regenerate, migrate) | §2.4 last sentence | — | §13.2 *Document tests*: the registry path test (O11 a) |
| EI-MC-05 (a sky plot's arena) | `ContextVector.arena` `'sky'`, values per V05 §3.11 | — | V05's tests (T-V5 series) read it |
| EI-MC-09 (capacity 0 vs the at-least-one clamp) | §2.6 capacity: max(1, …) residential, 0 non-residential | — | T19-4 and T28-13 – T28-18 (§13.2) exercise the bounds |
| C-raised-frame, C-retaining-frame, C-deckplot-frame | §2.7 *At the frame* (J-RM12) | bend to the ring (declared); leave out and report (deck slot) | item 110 (f)'s bars gain the frame clause (cross-part note to scope) |

## Agreement disagreements (12)

`FabricStrategyId`, `TypedBoundary` (V01) and `DriftBounds` (V02): declared in §2 (MC-11), the volumes cite them.
`BaseWing`, `BuildingInput` (V02, V03): `plot` for `lot` (MC-01); `PathShapeRow` (V02): the alias to V02's
`MassingFamilyRow`. `SkyIsland` (V05): V05 §2.1's record cited, `rim`/`land` (MC-07). `ContextVector` (V05): `'sky'`
(MC-05). `TableId` (V07, V11): declared at §7.6 (determinism's; cross-part note).

## Renumberings

None: §2.1 – §2.9 keep their numbers and headings; rule numbers 1–8 of §2.2 and *Entrances* rules 1–5 are unchanged; no
test or decision id is minted or renumbered here. New knot roles `retaining_state_knot`, `wall_state_knot`,
`wall_class_knot`, edge role `rim` and vertex role `sky_access` enter §2.2 rule 7's table.

## Cross-part notes (what another unit must change; not edited here)

* **kernel (§3)**: §3.2 (5) removes the 16-bit binary angle (E-15; KWG-09); §2.2 remains the home of rule 3's demotion,
  dissolution, split flag and pin release, rule 5's `resolveVertexAt` binding order, the hash tables and the Size
  paragraph (J-RM1) — keep citing §2.2; §3.4 names `Document.nextGroundPart` for ground parts ≥ 1 (J-RM3); §3.3 remains
  the home of the clear-region rules and "No item changes in place" (§2.2 cites them); KXC-03 (§3.3 states the clear rule,
  §7.2 locks and pins).
* **pipeline (§4, II)**: §4.4 S5a writes `Enceinte.arcs`, multi-stretch `anchors` and `stretchClass` (J-RM10); §4.8 builds
  the harbour-mouth `Gate.mouth` and the anchor towers; S1 (§4.2) writes the oasis records and `spring.flow` = 1, §4.4 and
  §4.5 weight the water pull by `spring.flow` (J-RM7); §4.7 S10 (10) is named as the context vector's writer, S8 as
  `Block.depthClass`'s (J-RM6); §4.11 receives f item 266's paragraph (J-RM15) and f 209's `EvolveOp`/`retypeLand`,
  f 268 (b)'s `DeclineOp` members; II.7.2 should drop "the level mapping is §2.2 rule 1's" only if it states part 0's
  mapping itself — §2.2 now states the mapping line and cites II.7.2 for the writes; II.6 holds the island rules §2.7 now
  cites; the raised-way generator writes `detail.why` and `suppress` keys as §2.8 states.
* **determinism (§5–§7)**: §7.6 declares `TableId` (MC-11); §7.7's DriftBounds comment reads "typed in §2.6" (MC-11 over
  f 385's "typed in volume 2 §2.1"); §7.7 cites §2.7's `HistoryRecord` for the replay's record and adds its history DR
  rows; §7.1's T2 `ground` spring flag writes `WaterBody.spring` and the grove and gardens with `fedBy`, one event, one
  undo (§7.4 row); §5.4's report recipe line reads `Recipe.presetId` (J-RM13); §7.5 carries the migration rows §2 names
  (a way's `slopeP95` on load, a stored `flowToward` dropped, a block without `content` → `ordinary`, square type
  `market` → `trading`, absent `spring`/`fedBy`, absent `raised`, absent stretch profiles → default, `nextGroundPart` = 1).
* **rendering (§8, §9, §11, §12)**: §8.2 draws the oasis's channels from `fedBy`, the grove and gardens, `stretchClass`
  runs, the harbour-mouth chain raised or lowered by era; §8.3's close-up wall symbol and §11.1's VTT/glTF wall tops read
  `Enceinte.walkCm`; §11.1 exports the closure LineStrings from `Enceinte.arcs`; §12.6 keeps the per-pass carry totals
  (§2.6 cites them).
* **scope (§13, §16, §1.1)**: §1.1 declares `Rung` (MC-11); §13.2's T77-1 gains the removed-partner clause (J-RM8); item
  110 (f)'s bars gain the frame clause for raised ways, retaining walls and deck slots (J-RM12); the registry path test
  covers `HistoryRecord`, `WaterBody.spring`, `fedBy`, `Enceinte.arcs`/`stretchClass`, `Gate.mouth`.
* **V01**: cite §2.5's `FabricStrategyId`, `SeamRun`, `TypedBoundary`, `BlockKind`, `SquareType` and §2.7's `HoodPlace`
  instead of declaring them (MC-11, S3).
* **V02**: cite §2.6's `WingRole`, `MassingFamilyId`, `MassingRef` (with `stack`), `DriftBounds`, `DeckContext` instead of
  declaring them (J-RM4); `BuildingInput.plot` for `lot` (MC-01).
* **V03**: cite §2.6's `FurnitureItem` and the record additions of its §2.1 now in §2.6 (the `Storey`, `Room`, `Opening`,
  `WindowRec`, `Chimney`, `ProgramRoom`, `Building.declaredRooms`, `Entrance.storey`, `Basement.crypt` fields);
  `BuildingInput.plot` for `lot` (MC-01).
* **V04**: §2.2 `Outfall`/`OutfallInto` now §2.3's — cite; the outfall mapping gains oxbow → `'lake'` (J-RM5); `ChamberKind`
  now §2.7's — cite; the lost void's state is V04's access-state set (§2.7 cites it; E-39).
* **V05**: §2.1–§2.2 stay the declaration home of `SkyIsland`, `UndersideProfile`, `ShadeBasis`, `SkyAccess` (§2.7 cites
  them); item 111's oasis does not apply on an island (§2.3 states it).
* **V06**: the failing spring lowers `WaterBody.spring.flow` (J-RM7); the replay writes §2.7's `HistoryRecord` and marks
  `Provenance.symbolic` (J-RM11); V06 §2.7's `pathway`/`underuseSince` declarations are now §2.7's — cite.
* **V08**: `CustomChainRecord` and `CustomServiceRecord` declared in §2.7 — V08 §2.8 cites them; the port writes a plot's
  and a building's `knownTo` and the oasis from `oasis_water` as map-tier derivations (§2.8).
* **V09**: the recipe panel reads `Recipe.presetId` (J-RM13); the T2 `ground` spring flag's tool rows.
* **V10**: its conversation record is named `Segment`; the base now declares a geometric `Segment` (§2.1, MC-11) — one term
  per concept needs one renamed (principle (2)); the adjudicator rules which.
* **V11**: `ColumnSpec.unit` is a named subset of §2.1's `Unit` (E-37); rows 79–80 hold the values §2.7 cites without
  numbers (J-RM14); the oasis grove and garden rows, `walls.barriers` class rows read by `stretchClass`.
* **V12**: its metric `Unit` is a named subset of §2.1's (E-37).

## CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): the output's heading line and subsection headings (grep); the word and byte counts and the diff
totals (wc, difflib); every f item's distinctive tokens present in the output (a script over 90 items and 6 g items; one
false miss was a line break, checked by hand); `lifecycle: Lifecycle` on every entity interface (script); no retired
synonym left outside the two kept senses (grep); no "file f item", MC-, MB-, W-, E- or XCONF tag left (grep).
PLAUSIBLE (reasoning): the split of removed and added words by source; that each kept canon reference's home lacks the
fact (checked by grep of the named home for each, not by reading every home section whole); the cross-part notes'
agreement with the other editors' parallel text, which the seam checkers verify.

## Mapping table — every inventory id of §2 (609)

| inventory id | kind | old section | disposition |
|---|---|---|---|
| MODEL-0001 | rule | §2 (plain words) | stated at §2 (plain words) |
| MODEL-0002 | rule | §2 (plain words) | stated at §2 (plain words) |
| MODEL-0003 | rule | §2 (plain words) | stated at §2 (plain words) |
| MODEL-0004 | rule | §2.1 | stated at §2.1 |
| MODEL-0005 | rule | §2.1 | reference → §3.2 (5), (6) (pointer kept in §2.1 Units) |
| MODEL-0006 | rule | §2.1 | stated at §2.1 |
| MODEL-0007 | rule | §2.1 | stated at §2.1 |
| MODEL-0008 | field | §2.1 | stated at §2.1 |
| MODEL-0009 | rule | §2.1 | stated at §2.1 |
| MODEL-0010 | rule | §2.1 | stated at §2.1 |
| MODEL-0011 | rule | §2.1 | stated once at §2.1 Layers (cluster 002; §2.7 cites §2.1) |
| MODEL-0012 | term | §2.1 | glossary term, stated at §2.1 |
| MODEL-0013 | type | §2.1 | stated at §2.1 |
| MODEL-0014 | rule | §2.1 | reference → §6.3 (pointer in §2.1 Ids) |
| MODEL-0015 | rule | §2.1 | stated at §2.1 |
| MODEL-0016 | rule | §2.1 | stated at §2.1 |
| MODEL-0017 | rule | §2.1 | reference → II.7 (compact pointer in §2.1 Arena parts) |
| MODEL-0018 | rule | §2.1 | stated once at §2.1 Arena parts (cluster 001; all other places cite §2.1) |
| MODEL-0019 | rule | §2.1 | reference → §7.3 item 9 (d), II.7.4 (pointer in §2.1 Arena parts) |
| MODEL-0020 | rule | §2.1 | stated at §2.1 |
| MODEL-0021 | rule | §2.1 | stated at §2.1 |
| MODEL-0022 | type | §2.2 | stated at §2.2 |
| MODEL-0023 | type | §2.2 | stated at §2.2 |
| MODEL-0024 | type | §2.2 | stated at §2.2 |
| MODEL-0025 | type | §2.2 | home kept at §2.2 (canon reference not applied: §3 cites §2.2 rule 5 for slots; kept) |
| MODEL-0026 | interface | §2.2 | stated at §2.2 |
| MODEL-0027 | field | §2.2 | home kept at §2.2 (canon reference not applied: only §2.2 states it (Plat.frame comment)) |
| MODEL-0028 | field | §2.2 | home kept at §2.2 (canon reference not applied: LatticeSpec declared here; §3.2 cites it) |
| MODEL-0029 | field | §2.2 | stated at §2.2 |
| MODEL-0030 | rule | §2.2 | home kept at §2.2 (canon reference not applied: §3.4 pinVertices cites §2.2 rule 3 (b) as the release rule) |
| MODEL-0031 | field | §2.2 | stated at §2.2 |
| MODEL-0032 | field | §2.2 | stated at §2.2 |
| MODEL-0033 | field | §2.2 | stated at §2.2 |
| MODEL-0034 | interface | §2.2 | stated at §2.2 |
| MODEL-0035 | interface | §2.2 | stated at §2.2 |
| MODEL-0036 | mechanism | §2.2 | home kept at §2.2 (canon reference not applied: the hash tables are declared only here (J-K22)) |
| MODEL-0037 | interface | §2.2 | stated at §2.2 |
| MODEL-0038 | interface | §2.2 | home kept at §2.2 (canon reference not applied: LevelIndex declared here; §3.3 states its use) |
| MODEL-0039 | type | §2.2 | stated at §2.2 |
| MODEL-0040 | type | §2.2 | stated at §2.2 |
| MODEL-0041 | type | §2.2 | stated at §2.2 |
| MODEL-0042 | interface | §2.2 | stated at §2.2 |
| MODEL-0043 | interface | §2.2 | stated at §2.2 |
| MODEL-0044 | rule | §2.2 | stated at §2.2 |
| MODEL-0045 | rule | §2.2 | stated at §2.2 |
| MODEL-0046 | rule | §2.2 | stated at §2.2 |
| MODEL-0047 | rule | §2.2 | reference → §4.1's S1 row (pointer in §2.2 rule 1 L0) |
| MODEL-0048 | rule | §2.2 | stated at §2.2 |
| MODEL-0049 | rule | §2.2 | reference → §4.1's S3 row (pointer in §2.2 rule 1 L1) |
| MODEL-0050 | rule | §2.2 | stated at §2.2 |
| MODEL-0051 | rule | §2.2 | stated at §2.2 |
| MODEL-0052 | rule | §2.2 | stated at §2.2 |
| MODEL-0053 | rule | §2.2 | stated at §2.2 |
| MODEL-0054 | rule | §2.2 | stated at §2.2 |
| MODEL-0055 | rule | §2.2 | stated at §2.2 |
| MODEL-0056 | rule | §2.2 | stated at §2.2 |
| MODEL-0057 | rule | §2.2 | reference → II.7.2 (L0–L2) and II.7.3 (L3–L4, U1–U3) for what the stage writes; the level mapping line kept in §2.2 rule 1 (II.7.2 names §2.2 rule 1 as the mapping home) |
| MODEL-0058 | rule | §2.2 | stated at §2.2 |
| MODEL-0059 | rule | §2.2 | home kept at §2.2 (canon reference not applied: II.7.6 does not state the further parts' level mapping) |
| MODEL-0060 | rule | §2.2 | stated at §2.2 |
| MODEL-0061 | rule | §2.2 | stated at §2.2 |
| MODEL-0062 | step | §2.2 | home kept at §2.2 (canon reference not applied: only §2.2 states the face walk) |
| MODEL-0063 | rule | §2.2 | stated at §2.2 |
| MODEL-0064 | rule | §2.2 | stated at §2.2 |
| MODEL-0065 | rule | §2.2 | stated at §2.2 |
| MODEL-0066 | rule | §2.2 | stated at §2.2 |
| MODEL-0067 | mechanism | §2.2 | home kept at §2.2 (canon reference not applied: splitThrough's effect on the level model; §3.6 states placement only) |
| MODEL-0068 | rule | §2.2 | stated at §2.2 |
| MODEL-0069 | term | §2.2 | glossary term, stated at §2.2 |
| MODEL-0070 | rule | §2.2 | stated at §2.2 |
| MODEL-0071 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0072 | rule | §2.2 | home kept at §2.2 (canon reference not applied: only §2.2 states it) |
| MODEL-0073 | rule | §2.2 | reference → §3.3's clear-region rules (pointer in §2.2 rule 3) |
| MODEL-0074 | rule | §2.2 | stated at §2.2 |
| MODEL-0075 | mechanism | §2.2 | home kept at §2.2 (canon reference not applied: §3.4 removeEdges cites "dissolves by §2.2 rule 3") |
| MODEL-0076 | term | §2.2 | glossary term, stated at §2.2 |
| MODEL-0077 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0078 | step | §2.2 | stated at §2.2 |
| MODEL-0079 | step | §2.2 | stated at §2.2 |
| MODEL-0080 | rule | §2.2 | stated at §2.2 |
| MODEL-0081 | step | §2.2 | stated at §2.2 |
| MODEL-0082 | rule | §2.2 | stated at §2.2 |
| MODEL-0083 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0084 | test | §2.2 | home kept at §2.2 (canon reference not applied: the bar is stated only here) |
| MODEL-0085 | rule | §2.2 | stated at §2.2 |
| MODEL-0086 | rule | §2.2 | home kept at §2.2 (canon reference not applied: first clause referenced (§3.3 "No item changes in place"); the rest only here) |
| MODEL-0087 | rule | §2.2 | home kept at §2.2 (canon reference not applied: rule 4 is a §2.2 rule; its mechanics referenced to §3.4, §3.6) |
| MODEL-0088 | rule | §2.2 | home kept at §2.2 (canon reference not applied: the owner inheritance clause only here) |
| MODEL-0089 | rule | §2.2 | stated at §2.2 |
| MODEL-0090 | rule | §2.2 | stated at §2.2 |
| MODEL-0091 | rule | §2.2 | stated at §2.2 |
| MODEL-0092 | rule | §2.2 | stated at §2.2 |
| MODEL-0093 | rule | §2.2 | stated at §2.2 |
| MODEL-0094 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0095 | rule | §2.2 | stated at §2.2 |
| MODEL-0096 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0097 | rule | §2.2 | stated at §2.2 |
| MODEL-0098 | rule | §2.2 | stated at §2.2 |
| MODEL-0099 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0100 | test | §2.2 | home kept at §2.2 (canon reference not applied: the bar is stated only here) |
| MODEL-0101 | rule | §2.2 | stated at §2.2 |
| MODEL-0102 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0103 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0104 | step | §2.2 | home kept at §2.2 (canon reference not applied: resolveVertexAt's binding order stated only here (§3.4 declares the signature)) |
| MODEL-0105 | step | §2.2 | stated at §2.2 |
| MODEL-0106 | rule | §2.2 | stated at §2.2 |
| MODEL-0107 | rule | §2.2 | stated at §2.2 |
| MODEL-0108 | table | §2.2 | stated at §2.2 |
| MODEL-0109 | table | §2.2 | stated at §2.2 |
| MODEL-0110 | table | §2.2 | stated at §2.2 |
| MODEL-0111 | table | §2.2 | stated at §2.2 |
| MODEL-0112 | rule | §2.2 | stated at §2.2 |
| MODEL-0113 | rule | §2.2 | stated at §2.2 |
| MODEL-0114 | rule | §2.2 | stated at §2.2 |
| MODEL-0115 | rule | §2.2 | stated at §2.2 |
| MODEL-0116 | mechanism | §2.2 | stated at §2.2 |
| MODEL-0117 | rule | §2.2 | stated at §2.2 |
| MODEL-0118 | rule | §2.2 | stated at §2.2 |
| MODEL-0119 | rule | §2.2 | home kept at §2.2 (canon reference not applied: rule 8 is a §2.2 rule citing §3.3, §3.10) |
| MODEL-0120 | number | §2.2 | stated at §2.2 |
| MODEL-0121 | number | §2.2 | home kept at §2.2 (canon reference not applied: 38.4 B/item referenced to §3.3; the finished-CITY count and 19.5–21 MB only here) |
| MODEL-0122 | number | §2.2 | stated at §2.2 |
| MODEL-0123 | number | §2.2 | home kept at §2.2 (canon reference not applied: Map rebuild costs only here) |
| MODEL-0124 | interface | §2.3 | stated at §2.3 |
| MODEL-0125 | field | §2.3 | stated at §2.3 |
| MODEL-0126 | field | §2.3 | stated at §2.3 |
| MODEL-0127 | interface | §2.3 | stated at §2.3 |
| MODEL-0128 | interface | §2.3 | stated at §2.3 |
| MODEL-0129 | interface | §2.3 | stated at §2.3 |
| MODEL-0130 | table | §2.3 | stated at §2.3 |
| MODEL-0131 | rule | §2.3 | stated at §2.3 |
| MODEL-0132 | rule | §2.3 | stated at §2.3 |
| MODEL-0133 | rule | §2.3 | stated at §2.3 |
| MODEL-0134 | rule | §2.3 | stated at §2.3 |
| MODEL-0135 | mechanism | §2.3 | stated at §2.3 |
| MODEL-0136 | number | §2.3 | home kept at §2.3 (canon reference not applied: CITY timing is also §12.4's; the METROPOLIS, TOWN and frame-only timings only here) |
| MODEL-0137 | rule | §2.3 | stated at §2.3 |
| MODEL-0138 | rule | §2.3 | reference → §4.2 S1 (3), §12.4 (pointer kept, §2.3) |
| MODEL-0139 | rule | §2.3 | stated at §2.3 |
| MODEL-0140 | rule | §2.3 | stated at §2.3 |
| MODEL-0141 | mechanism | §2.3 | stated at §2.3 |
| MODEL-0142 | rule | §2.3 | stated at §2.3 |
| MODEL-0143 | rule | §2.3 | stated at §2.3 |
| MODEL-0144 | rule | §2.3 | stated at §2.3 |
| MODEL-0145 | hook | §2.3 | stated at §2.3 |
| MODEL-0146 | rule | §2.3 | stated at §2.3 |
| MODEL-0147 | rule | §2.3 | stated at §2.3 |
| MODEL-0148 | rule | §2.3 | stated at §2.3 |
| MODEL-0149 | table | §2.3 | stated at §2.3 |
| MODEL-0150 | table | §2.3 | stated at §2.3 |
| MODEL-0151 | table | §2.3 | stated at §2.3 |
| MODEL-0152 | rule | §2.3 | stated at §2.3 |
| MODEL-0153 | rule | §2.3 | reference → §2.6 Basements (pointer, §2.3) |
| MODEL-0154 | decision | §2.3 | stated at §2.3 |
| MODEL-0155 | table | §2.4 | stated at §2.4 |
| MODEL-0156 | interface | §2.4 | stated at §2.4 |
| MODEL-0157 | rule | §2.4 | stated at §2.4 |
| MODEL-0158 | field | §2.4 | reference → §4.4 (comment pointer, §2.4) |
| MODEL-0159 | hook | §2.4 | stated at §2.4 as changed by the flowToward item (V04 BCR-2): no longer stored — the reading `wayFall`; an older document's value dropped on load |
| MODEL-0160 | interface | §2.4 | stated at §2.4 |
| MODEL-0161 | rule | §2.4 | stated at §2.4 |
| MODEL-0162 | rule | §2.4 | stated at §2.4 |
| MODEL-0163 | rule | §2.4 | stated at §2.4 |
| MODEL-0164 | interface | §2.5 | stated at §2.5 |
| MODEL-0165 | table | §2.5 | stated at §2.5 |
| MODEL-0166 | field | §2.5 | reference → II.1 (District.seams comment, §2.5) |
| MODEL-0167 | field | §2.5 | stated at §2.5 |
| MODEL-0168 | field | §2.5 | stated at §2.5 |
| MODEL-0169 | field | §2.5 | stated at §2.5 |
| MODEL-0170 | field | §2.5 | stated at §2.5 |
| MODEL-0171 | field | §2.5 | stated at §2.5 |
| MODEL-0172 | field | §2.5 | home kept at §2.5 (canon reference not applied: the District fields are base fields (V04 §2.1 reads them as base-declared)) |
| MODEL-0173 | field | §2.5 | stated at §2.5 |
| MODEL-0174 | field | §2.5 | stated at §2.5 |
| MODEL-0175 | field | §2.5 | stated at §2.5 |
| MODEL-0176 | interface | §2.5 | stated at §2.5 |
| MODEL-0177 | term | §2.5 | glossary term, stated at §2.5 |
| MODEL-0178 | rule | §2.5 | stated at §2.5 |
| MODEL-0179 | interface | §2.5 | stated at §2.5 |
| MODEL-0180 | interface | §2.5 | stated at §2.5 |
| MODEL-0181 | field | §2.5 | stated at §2.5 |
| MODEL-0182 | interface | §2.5 | stated at §2.5 |
| MODEL-0183 | interface | §2.5 | stated at §2.5 |
| MODEL-0184 | interface | §2.5 | stated at §2.5 |
| MODEL-0185 | table | §2.5 | reference → §4.6, §4.8 (comment pointer, §2.5) |
| MODEL-0186 | field | §2.5 | stated at §2.5 |
| MODEL-0187 | field | §2.5 | stated at §2.5 |
| MODEL-0188 | interface | §2.5 | stated at §2.5 |
| MODEL-0189 | interface | §2.5 | stated at §2.5 |
| MODEL-0190 | rule | §2.5 | stated at §2.5 |
| MODEL-0191 | field | §2.5 | stated at §2.5 |
| MODEL-0192 | field | §2.5 | stated at §2.5 |
| MODEL-0193 | field | §2.5 | stated at §2.5 |
| MODEL-0194 | field | §2.5 | stated at §2.5 |
| MODEL-0195 | field | §2.5 | stated at §2.5 |
| MODEL-0196 | field | §2.5 | stated at §2.5 |
| MODEL-0197 | field | §2.5 | stated at §2.5 |
| MODEL-0198 | field | §2.5 | stated at §2.5 |
| MODEL-0199 | interface | §2.5 | stated at §2.5 |
| MODEL-0200 | interface | §2.5 | stated at §2.5 |
| MODEL-0201 | rule | §2.5 | stated at §2.5 |
| MODEL-0202 | interface | §2.5 | stated at §2.5 |
| MODEL-0203 | interface | §2.5 | stated at §2.5 |
| MODEL-0204 | field | §2.5 | stated at §2.5 |
| MODEL-0205 | rule | §2.5 | stated at §2.5 |
| MODEL-0206 | field | §2.5 | stated at §2.5 |
| MODEL-0207 | interface | §2.5 | stated at §2.5 |
| MODEL-0208 | field | §2.5 | stated at §2.5 |
| MODEL-0209 | field | §2.5 | stated at §2.5 |
| MODEL-0210 | field | §2.5 | stated at §2.5 |
| MODEL-0211 | interface | §2.5 | stated at §2.5 |
| MODEL-0212 | interface | §2.5 | stated at §2.5 |
| MODEL-0213 | term | §2.5 | glossary term, stated at §2.5 |
| MODEL-0214 | rule | §2.5 | stated at §2.5 |
| MODEL-0215 | table | §2.5 | stated at §2.5 |
| MODEL-0216 | field | §2.5 | stated at §2.5, widened to 'sky' (MC-05) |
| MODEL-0217 | rule | §2.5 | stated at §2.5 |
| MODEL-0218 | term | §2.5 | glossary term, stated at §2.5 |
| MODEL-0219 | rule | §2.5 | reference → §8 (one clause, §2.5) |
| MODEL-0220 | rule | §2.5 | reference → §4.7 (pointer, §2.5) |
| MODEL-0221 | rule | §2.5 | stated at §2.5 |
| MODEL-0222 | rule | §2.5 | stated at §2.5 |
| MODEL-0223 | rule | §2.5 | stated at §2.5 |
| MODEL-0224 | rule | §2.5 | stated at §2.5 |
| MODEL-0225 | rule | §2.5 | stated at §2.5 |
| MODEL-0226 | rule | §2.5 | stated at §2.5 |
| MODEL-0227 | rule | §2.5 | stated at §2.5 |
| MODEL-0228 | rule | §2.5 | stated at §2.5 |
| MODEL-0229 | rule | §2.5 | stated at §2.5 |
| MODEL-0230 | rule | §2.5 | stated at §2.5 |
| MODEL-0231 | rule | §2.5 | stated once at §2.5 (Plot.builtBand comment; cluster 008) |
| MODEL-0232 | rule | §2.5 | stated at §2.5 (Exposure, passages and knowledge; field details at the fields) |
| MODEL-0233 | rule | §2.5 | stated at §2.5 |
| MODEL-0234 | table | §2.5 | stated at §2.5 |
| MODEL-0235 | rule | §2.5 | stated at §2.5 |
| MODEL-0236 | interface | §2.6 | stated at §2.6 |
| MODEL-0237 | interface | §2.6 | stated at §2.6 |
| MODEL-0238 | table | §2.6 | stated at §2.6 |
| MODEL-0239 | field | §2.6 | stated at §2.6 |
| MODEL-0240 | field | §2.6 | stated at §2.6 |
| MODEL-0241 | field | §2.6 | stated at §2.6 |
| MODEL-0242 | rule | §2.6 | stated at §2.6 |
| MODEL-0243 | interface | §2.6 | stated at §2.6 |
| MODEL-0244 | rule | §2.6 | stated at §2.6 |
| MODEL-0245 | table | §2.6 | stated at §2.6 |
| MODEL-0246 | field | §2.6 | stated at §2.6 |
| MODEL-0247 | field | §2.6 | stated at §2.6 |
| MODEL-0248 | field | §2.6 | stated at §2.6 |
| MODEL-0249 | field | §2.6 | stated at §2.6 |
| MODEL-0250 | field | §2.6 | stated at §2.6 |
| MODEL-0251 | field | §2.6 | stated at §2.6 |
| MODEL-0252 | field | §2.6 | stated at §2.6 |
| MODEL-0253 | field | §2.6 | stated at §2.6 |
| MODEL-0254 | field | §2.6 | stated at §2.6 |
| MODEL-0255 | field | §2.6 | stated at §2.6 |
| MODEL-0256 | field | §2.6 | stated at §2.6 |
| MODEL-0257 | field | §2.6 | stated at §2.6 |
| MODEL-0258 | field | §2.6 | stated at §2.6 |
| MODEL-0259 | field | §2.6 | stated at §2.6 |
| MODEL-0260 | type | §2.6 | stated at §2.6 |
| MODEL-0261 | interface | §2.6 | reference → V11's rows (MaterialRow interface kept in §2.6; values V11's) |
| MODEL-0262 | interface | §2.6 | stated at §2.6 |
| MODEL-0263 | interface | §2.6 | stated at §2.6 |
| MODEL-0264 | interface | §2.6 | stated at §2.6 |
| MODEL-0265 | field | §2.6 | stated at §2.6 |
| MODEL-0266 | interface | §2.6 | stated at §2.6 |
| MODEL-0267 | interface | §2.6 | stated at §2.6 |
| MODEL-0268 | interface | §2.6 | stated at §2.6 |
| MODEL-0269 | interface | §2.6 | stated at §2.6 |
| MODEL-0270 | interface | §2.6 | stated at §2.6 |
| MODEL-0271 | interface | §2.6 | stated at §2.6 |
| MODEL-0272 | type | §2.6 | stated at §2.6 |
| MODEL-0273 | interface | §2.6 | stated at §2.6 |
| MODEL-0274 | interface | §2.6 | stated at §2.6 |
| MODEL-0275 | field | §2.6 | stated at §2.6 |
| MODEL-0276 | interface | §2.6 | stated at §2.6 |
| MODEL-0277 | interface | §2.6 | stated at §2.6 |
| MODEL-0278 | interface | §2.6 | stated at §2.6 |
| MODEL-0279 | interface | §2.6 | stated at §2.6 |
| MODEL-0280 | interface | §2.6 | stated at §2.6 |
| MODEL-0281 | rule | §2.6 | stated at §2.6 |
| MODEL-0282 | interface | §2.6 | stated at §2.6 |
| MODEL-0283 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0284 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0285 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0286 | rule | §2.6 | stated at §2.6 |
| MODEL-0287 | rule | §2.6 | reference → §8.2 (compressed pointer, §2.6) |
| MODEL-0288 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0289 | rule | §2.6 | stated at §2.6 |
| MODEL-0290 | rule | §2.6 | stated at §2.6 |
| MODEL-0291 | test | §2.6 | stated at §2.6 |
| MODEL-0292 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0293 | rule | §2.6 | stated at §2.6 |
| MODEL-0294 | rule | §2.6 | stated at §2.6 |
| MODEL-0295 | step | §2.6 | stated at §2.6 |
| MODEL-0296 | step | §2.6 | stated at §2.6 |
| MODEL-0297 | step | §2.6 | stated at §2.6 |
| MODEL-0298 | step | §2.6 | stated at §2.6 |
| MODEL-0299 | step | §2.6 | stated at §2.6 |
| MODEL-0300 | rule | §2.6 | stated at §2.6 |
| MODEL-0301 | rule | §2.6 | stated at §2.6 |
| MODEL-0302 | number | §2.6 | reference → §12.6 for the per-pass and worst-step totals; per-building costs kept (§2.6 rule 4; §12 does not state them) |
| MODEL-0303 | step | §2.6 | stated at §2.6 |
| MODEL-0304 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0305 | rule | §2.6 | stated at §2.6 |
| MODEL-0306 | step | §2.6 | stated at §2.6 |
| MODEL-0307 | step | §2.6 | stated at §2.6 |
| MODEL-0308 | step | §2.6 | stated at §2.6 |
| MODEL-0309 | rule | §2.6 | stated at §2.6 |
| MODEL-0310 | rule | §2.6 | stated at §2.6 |
| MODEL-0311 | test | §2.6 | reference → §13.2 (§2.6 Test) |
| MODEL-0312 | rule | §2.6 | stated at §2.6 |
| MODEL-0313 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0314 | rule | §2.6 | stated at §2.6 |
| MODEL-0315 | rule | §2.6 | stated at §2.6 |
| MODEL-0316 | rule | §2.6 | stated at §2.6 |
| MODEL-0317 | rule | §2.6 | reference → §8.4 (pointer, §2.6 Heights) |
| MODEL-0318 | rule | §2.6 | stated at §2.6 |
| MODEL-0319 | rule | §2.6 | stated at §2.6 |
| MODEL-0320 | rule | §2.6 | stated at §2.6 |
| MODEL-0321 | rule | §2.6 | stated at §2.6 |
| MODEL-0322 | rule | §2.6 | stated at §2.6 |
| MODEL-0323 | test | §2.6 | reference → §13.2 T19-3 (§2.6 Materials) |
| MODEL-0324 | rule | §2.6 | stated at §2.6 |
| MODEL-0325 | hook | §2.6 | reference → V02 §3.3–§3.5 (§2.6 stage-3 hook) |
| MODEL-0326 | table | §2.6 | reference → V02 §2.3, §3.3 (PathShapeRow = MassingFamilyRow) |
| MODEL-0327 | rule | §2.6 | reference → V02 §3.3–§3.5 (J-A59.21 named) |
| MODEL-0328 | interface | §2.6 | reference → V02 §2.3 (`type PathShapeRow = MassingFamilyRow`, §2.6) |
| MODEL-0329 | rule | §2.6 | stated at §2.6 |
| MODEL-0330 | rule | §2.6 | stated at §2.6 |
| MODEL-0331 | rule | §2.6 | stated at §2.6 |
| MODEL-0332 | rule | §2.6 | stated at §2.6 |
| MODEL-0333 | rule | §2.6 | stated at §2.6 |
| MODEL-0334 | rule | §2.6 | stated at §2.6 |
| MODEL-0335 | rule | §2.6 | stated at §2.6 |
| MODEL-0336 | rule | §2.6 | stated at §2.6 |
| MODEL-0337 | rule | §2.6 | stated at §2.6 |
| MODEL-0338 | rule | §2.6 | stated at §2.6 |
| MODEL-0339 | rule | §2.6 | home kept at §2.6 (canon reference not applied: file f item 223 rewrites the intake paragraph in §2.6 (f > canon reference)) |
| MODEL-0340 | rule | §2.6 | stated at §2.6 |
| MODEL-0341 | rule | §2.6 | stated at §2.6 |
| MODEL-0342 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0343 | rule | §2.6 | stated at §2.6 |
| MODEL-0344 | step | §2.6 | stated at §2.6 |
| MODEL-0345 | step | §2.6 | stated at §2.6 |
| MODEL-0346 | step | §2.6 | stated at §2.6 |
| MODEL-0347 | step | §2.6 | stated at §2.6 |
| MODEL-0348 | step | §2.6 | stated at §2.6 |
| MODEL-0349 | step | §2.6 | stated at §2.6 |
| MODEL-0350 | test | §2.6 | stated at §2.6 |
| MODEL-0351 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0352 | rule | §2.6 | stated at §2.6 |
| MODEL-0353 | table | §2.6 | stated at §2.6 |
| MODEL-0354 | rule | §2.6 | stated at §2.6 |
| MODEL-0355 | rule | §2.6 | stated at §2.6 |
| MODEL-0356 | rule | §2.6 | stated at §2.6 |
| MODEL-0357 | rule | §2.6 | stated at §2.6 |
| MODEL-0358 | decision | §2.6 | stated at §2.6 |
| MODEL-0359 | test | §2.6 | stated at §2.6 |
| MODEL-0360 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0361 | rule | §2.6 | stated at §2.6 |
| MODEL-0362 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0363 | hook | §2.6 | stated at §2.6 |
| MODEL-0364 | step | §2.6 | stated at §2.6 |
| MODEL-0365 | step | §2.6 | stated at §2.6 |
| MODEL-0366 | step | §2.6 | stated at §2.6 |
| MODEL-0367 | step | §2.6 | stated at §2.6 |
| MODEL-0368 | step | §2.6 | stated at §2.6 |
| MODEL-0369 | step | §2.6 | stated at §2.6 |
| MODEL-0370 | step | §2.6 | stated at §2.6 |
| MODEL-0371 | table | §2.6 | stated at §2.6 |
| MODEL-0372 | number | §2.6 | stated at §2.6 |
| MODEL-0373 | rule | §2.6 | stated at §2.6 |
| MODEL-0374 | step | §2.6 | stated at §2.6 |
| MODEL-0375 | rule | §2.6 | stated at §2.6 |
| MODEL-0376 | step | §2.6 | stated at §2.6 |
| MODEL-0377 | step | §2.6 | stated at §2.6 |
| MODEL-0378 | step | §2.6 | stated at §2.6 |
| MODEL-0379 | rule | §2.6 | stated at §2.6 |
| MODEL-0380 | rule | §2.6 | stated at §2.6 |
| MODEL-0381 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0382 | rule | §2.6 | stated at §2.6 |
| MODEL-0383 | rule | §2.6 | stated at §2.6 |
| MODEL-0384 | rule | §2.6 | stated at §2.6 |
| MODEL-0385 | rule | §2.6 | stated at §2.6 |
| MODEL-0386 | rule | §2.6 | stated at §2.6 |
| MODEL-0387 | table | §2.6 | stated at §2.6 |
| MODEL-0388 | rule | §2.6 | stated at §2.6 |
| MODEL-0389 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0390 | rule | §2.6 | stated at §2.6 |
| MODEL-0391 | rule | §2.6 | stated at §2.6 |
| MODEL-0392 | rule | §2.6 | stated at §2.6 |
| MODEL-0393 | rule | §2.6 | stated at §2.6 |
| MODEL-0394 | rule | §2.6 | stated at §2.6 |
| MODEL-0395 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0396 | rule | §2.6 | stated at §2.6 |
| MODEL-0397 | mechanism | §2.6 | stated at §2.6 |
| MODEL-0398 | rule | §2.6 | stated at §2.6 |
| MODEL-0399 | rule | §2.6 | stated at §2.6 |
| MODEL-0400 | rule | §2.6 | stated at §2.6 |
| MODEL-0401 | test | §2.6 | reference → §13.2 T28-13 – T28-18 |
| MODEL-0402 | interface | §2.7 | stated at §2.7 |
| MODEL-0403 | field | §2.7 | stated at §2.7 |
| MODEL-0404 | field | §2.7 | stated at §2.7 |
| MODEL-0405 | field | §2.7 | stated at §2.7 |
| MODEL-0406 | field | §2.7 | stated at §2.7 |
| MODEL-0407 | field | §2.7 | stated at §2.7 |
| MODEL-0408 | field | §2.7 | stated at §2.7 |
| MODEL-0409 | interface | §2.7 | stated at §2.7 |
| MODEL-0410 | interface | §2.7 | stated at §2.7 |
| MODEL-0411 | interface | §2.7 | stated at §2.7 |
| MODEL-0412 | interface | §2.7 | stated at §2.7 |
| MODEL-0413 | field | §2.7 | stated at §2.7 |
| MODEL-0414 | interface | §2.7 | stated at §2.7 |
| MODEL-0415 | field | §2.7 | stated at §2.7 |
| MODEL-0416 | rule | §2.7 | stated at §2.7 |
| MODEL-0417 | interface | §2.7 | stated at §2.7 |
| MODEL-0418 | interface | §2.7 | stated at §2.7 |
| MODEL-0419 | interface | §2.7 | stated at §2.7 |
| MODEL-0420 | interface | §2.7 | stated at §2.7 |
| MODEL-0421 | rule | §2.7 | reference → §9.1 |
| MODEL-0422 | interface | §2.7 | stated at §2.7 |
| MODEL-0423 | interface | §2.7 | stated at §2.7 |
| MODEL-0424 | field | §2.7 | stated at §2.7 |
| MODEL-0425 | field | §2.7 | stated at §2.7 |
| MODEL-0426 | interface | §2.7 | stated at §2.7 |
| MODEL-0427 | interface | §2.7 | stated at §2.7 |
| MODEL-0428 | interface | §2.7 | stated at §2.7 |
| MODEL-0429 | interface | §2.7 | stated at §2.7 |
| MODEL-0430 | interface | §2.7 | stated at §2.7 |
| MODEL-0431 | interface | §2.7 | stated at §2.7 |
| MODEL-0432 | interface | §2.7 | reference → V05 §2.1 (SkyIsland declared there; §2.7 names the fields the base reads; `outline` replaced by `rim`/`land`, MC-07) |
| MODEL-0433 | interface | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads Tunnel as base-declared; f 247 edits the base line) |
| MODEL-0434 | interface | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads it as base-declared; f 248 edits the base line) |
| MODEL-0435 | interface | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads it as base-declared; f 249 edits the base line) |
| MODEL-0436 | interface | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads it as base-declared; f 247, 249, 250 edit the base line) |
| MODEL-0437 | interface | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads it as base-declared; f 249 edits the base line) |
| MODEL-0438 | rule | §2.7 | reference → II.7.4 (comment pointer, §2.7) |
| MODEL-0439 | interface | §2.7 | stated at §2.7 |
| MODEL-0440 | rule | §2.7 | stated at §2.7 |
| MODEL-0441 | interface | §2.7 | stated at §2.7 |
| MODEL-0442 | rule | §2.7 | stated at §2.7 |
| MODEL-0443 | interface | §2.7 | home kept at §2.7 (canon reference not applied: no volume declares ConditionOverlay) |
| MODEL-0444 | interface | §2.7 | home kept at §2.7 (canon reference not applied: no volume declares DepositSite) |
| MODEL-0445 | interface | §2.7 | home kept at §2.7 (canon reference not applied: no volume declares PowerRelation (f 257 edits the base line)) |
| MODEL-0446 | interface | §2.7 | stated at §2.7 |
| MODEL-0447 | rule | §2.7 | stated at §2.7 |
| MODEL-0448 | rule | §2.7 | stated at §2.7 |
| MODEL-0449 | rule | §2.7 | stated at §2.7 |
| MODEL-0450 | rule | §2.7 | reference → §4.4, §4.8, §4.2 S1 (5) |
| MODEL-0451 | rule | §2.7 | stated at §2.7 |
| MODEL-0452 | rule | §2.7 | reference → §4.7 S11, §4.9, §8.4 |
| MODEL-0453 | rule | §2.7 | stated at §2.7 |
| MODEL-0454 | rule | §2.7 | stated at §2.7 |
| MODEL-0455 | rule | §2.7 | stated at §2.7 |
| MODEL-0456 | rule | §2.7 | reference → II.6 and V05 (island rules; §2.7 staged layers trimmed) |
| MODEL-0457 | rule | §2.7 | home kept at §2.7 (canon reference not applied: the tunnel hook summary is the base's (V04 reads base)) |
| MODEL-0458 | rule | §2.7 | home kept at §2.7 (canon reference not applied: the underground hook summary is the base's) |
| MODEL-0459 | rule | §2.7 | home kept at §2.7 (canon reference not applied: the base hook summary; V08 §3.11 fills the records) |
| MODEL-0460 | rule | §2.7 | home kept at §2.7 (canon reference not applied: the dossier-backed Person's base rule; V08 §3.11 fills it) |
| MODEL-0461 | rule | §2.8 | stated at §2.8 |
| MODEL-0462 | rule | §2.8 | stated at §2.8 |
| MODEL-0463 | type | §2.8 | stated at §2.8 |
| MODEL-0464 | term | §2.8 | glossary term, stated at §2.8 |
| MODEL-0465 | type | §2.8 | stated at §2.8 |
| MODEL-0466 | interface | §2.8 | stated at §2.8 |
| MODEL-0467 | field | §2.8 | reference → §7.7 item 12 (binding key), §7.1 DossierRef (Dossier refs bullet, §2.8) |
| MODEL-0468 | type | §2.8 | stated at §2.8 |
| MODEL-0469 | mechanism | §2.8 | stated at §2.8 |
| MODEL-0470 | table | §2.8 | stated at §2.8 |
| MODEL-0471 | interface | §2.8 | stated at §2.8 |
| MODEL-0472 | interface | §2.8 | stated at §2.8 |
| MODEL-0473 | table | §2.8 | stated at §2.8 |
| MODEL-0474 | rule | §2.3 | resolved (MC-04): `LifecycleEvent.cause` gains `convert:<kind>` (§2.8) |
| MODEL-0475 | interface | §2.8 | stated at §2.8 |
| MODEL-0476 | interface | §2.8 | stated at §2.8 |
| MODEL-0477 | interface | §2.8 | stated at §2.8 |
| MODEL-0478 | interface | §2.8 | stated at §2.8 |
| MODEL-0479 | interface | §2.8 | stated at §2.8 |
| MODEL-0480 | rule | §2.8 | stated at §2.8 |
| MODEL-0481 | rule | §2.8 | stated at §2.8 |
| MODEL-0482 | rule | §2.8 | stated at §2.8 |
| MODEL-0483 | rule | §2.8 | stated at §2.8 |
| MODEL-0484 | table | §2.8 | stated at §2.8 |
| MODEL-0485 | rule | §2.8 | stated at §2.8 |
| MODEL-0486 | rule | §2.8 | stated at §2.8 |
| MODEL-0487 | interface | §2.8 | stated at §2.8 |
| MODEL-0488 | table | §2.8 | stated at §2.8 |
| MODEL-0489 | rule | §2.8 | stated at §2.8 |
| MODEL-0490 | mechanism | §2.8 | stated at §2.8 |
| MODEL-0491 | rule | §2.8 | stated at §2.8 |
| MODEL-0492 | number | §2.8 | stated at §2.8 |
| MODEL-0493 | rule | §2.8 | stated at §2.8 |
| MODEL-0494 | rule | §2.8 | stated at §2.8 |
| MODEL-0495 | rule | §2.8 | stated at §2.8 |
| MODEL-0496 | mechanism | §2.8 | stated at §2.8 |
| MODEL-0497 | number | §2.8 | stated at §2.8 |
| MODEL-0498 | rule | §2.8 | stated at §2.8 |
| MODEL-0499 | rule | §2.8 | stated at §2.8 |
| MODEL-0500 | rule | §2.8 | stated at §2.8 |
| MODEL-0501 | mechanism | §2.8 | stated at §2.8 |
| MODEL-0502 | table | §2.8 | stated at §2.8 |
| MODEL-0503 | table | §2.8 | stated at §2.8 |
| MODEL-0504 | table | §2.8 | stated at §2.8 |
| MODEL-0505 | rule | §2.8 | reference → §7.7 (pointer, §2.8 Dossier paths) |
| MODEL-0506 | rule | §2.9 | stated at §2.9 |
| MODEL-0507 | interface | §2.9 | stated at §2.9 |
| MODEL-0508 | field | §2.9 | stated at §2.9 |
| MODEL-0509 | field | §2.9 | stated at §2.9 |
| MODEL-0510 | field | §2.9 | stated at §2.9 |
| MODEL-0511 | field | §2.9 | stated at §2.9 |
| MODEL-0512 | field | §2.9 | stated at §2.9 |
| MODEL-0513 | field | §2.9 | stated at §2.9 |
| MODEL-0514 | field | §2.9 | stated at §2.9 |
| MODEL-0515 | field | §2.9 | reference → §7.7 item 12 (types; Document.dossier comment points to the block bullet) |
| MODEL-0516 | field | §2.9 | reference → §8.2 (Document.style comment) |
| MODEL-0517 | field | §2.9 | stated at §2.9 |
| MODEL-0518 | field | §2.9 | reference → §11.3, V09 (view keys; which travel is §11.3) |
| MODEL-0519 | field | §2.9 | stated at §2.9 |
| MODEL-0520 | field | §2.9 | stated at §2.9 |
| MODEL-0521 | type | §2.9 | stated at §2.9 |
| MODEL-0522 | type | §2.9 | stated at §2.9 |
| MODEL-0523 | field | §2.9 | stated at §2.9 |
| MODEL-0524 | interface | §2.9 | stated at §2.9 |
| MODEL-0525 | rule | §2.9 | stated at §2.9 |
| MODEL-0526 | interface | §2.9 | stated at §2.9 |
| MODEL-0527 | interface | §2.9 | stated at §2.9 |
| MODEL-0528 | interface | §2.9 | stated at §2.9 |
| MODEL-0529 | interface | §2.9 | stated at §2.9 |
| MODEL-0530 | interface | §2.9 | stated at §2.9 |
| MODEL-0531 | interface | §2.9 | stated at §2.9 |
| MODEL-0532 | type | §2.9 | stated at §2.9 |
| MODEL-0533 | interface | §2.9 | stated at §2.9 |
| MODEL-0534 | rule | §2.9 | stated at §2.9 |
| MODEL-0535 | rule | §2.9 | reference → §7.7 (dossier events via the host door) |
| MODEL-0536 | rule | §2.9 | stated at §2.9 |
| MODEL-0537 | rule | §2.9 | reference → §7.7 item 12 (declared there; bullet kept as the block's home) |
| MODEL-0538 | mechanism | §2.9 | stated at §2.9 |
| MODEL-0539 | rule | §2.9 | stated at §2.9 |
| MODEL-0540 | rule | §2.9 | stated at §2.9 |
| MODEL-0541 | rule | §2.9 | stated at §2.9 |
| MODEL-0542 | rule | §2.9 | stated at §2.9 |
| MODEL-0543 | number | §2.9 | stated at §2.9 |
| MODEL-0544 | step | §2.9 | stated at §2.9 |
| MODEL-0545 | step | §2.9 | stated at §2.9 |
| MODEL-0546 | rule | §2.9 | stated at §2.9 |
| MODEL-0547 | step | §2.9 | stated at §2.9 |
| MODEL-0548 | rule | §2.9 | stated at §2.9 |
| MODEL-0549 | step | §2.9 | stated at §2.9 |
| MODEL-0550 | step | §2.9 | stated at §2.9 |
| MODEL-0551 | rule | §2.9 | stated at §2.9 |
| MODEL-0552 | rule | §2.9 | stated at §2.9 |
| MODEL-0553 | mechanism | §2.9 | stated at §2.9 |
| MODEL-0554 | rule | §2.9 | stated at §2.9 |
| MODEL-0555 | rule | §2.9 | stated at §2.9 |
| MODEL-0556 | rule | §2.9 | stated at §2.9 |
| MODEL-0557 | rule | §2.9 | stated at §2.9 |
| MODEL-0558 | number | §2.9 | stated at §2.9 |
| MODEL-0559 | rule | §2.9 | stated at §2.9 |
| MODEL-0560 | test | §2.9 | reference → §13.2 |
| MODEL-0561 | step | §2.9 | stated at §2.9 |
| MODEL-0562 | rule | §2.9 | stated at §2.9 |
| MODEL-0563 | mechanism | §2.9 | stated at §2.9 |
| MODEL-0564 | rule | §2.9 | stated at §2.9 |
| MODEL-0565 | test | §2.9 | reference → §13.2, §11.3 |
| MODEL-0566 | step | §2.9 | stated at §2.9 |
| MODEL-0567 | rule | §2.9 | stated at §2.9 |
| MODEL-0568 | rule | §2.9 | stated at §2.9 |
| MODEL-0569 | mechanism | §2.9 | stated at §2.9 |
| MODEL-0570 | number | §2.9 | stated at §2.9 |
| MODEL-0571 | test | §2.9 | stated at §2.9 |
| MODEL-0572 | rule | §2.9 | stated at §2.9 |
| MODEL-0573 | rule | §2.9 | stated at §2.9 |
| MODEL-0574 | rule | §2.9 | stated at §2.9 |
| MODEL-0575 | rule | §2.9 | reference → §11.1, §6.3 (Formats bullet) |
| MODEL-0576 | rule | §2.9 | stated at §2.9 |
| MODEL-0577 | rule | §2.9 | stated at §2.9 |
| MODEL-0578 | table | §2.9 | stated at §2.9 |
| MODEL-0579 | rule | §2.9 | stated at §2.9 |
| MODEL-0580 | rule | §2.9 | stated at §2.9 |
| MODEL-0581 | term | §2 (plain words) | glossary term, stated at §2 (plain words) |
| MODEL-0582 | term | §2.1 | glossary term, stated at §2.1 |
| MODEL-0583 | term | §2.2 | glossary term, stated at §2.2 |
| MODEL-0584 | term | §2.2 | glossary term, stated at §2.2 |
| MODEL-0585 | term | §2.2 | glossary term, stated at §2.2 |
| MODEL-0586 | term | §2.5 | glossary term, stated at §2.5 |
| MODEL-0587 | term | §2.5 | glossary term, stated at §2.5 |
| MODEL-0588 | term | §2.5 | glossary term, stated at §2.5 |
| MODEL-0589 | term | §2.6 | glossary term, stated at §2.6 |
| MODEL-0590 | term | §2.6 | glossary term, stated at §2.6 |
| MODEL-0591 | term | §2.6 | glossary term, stated at §2.6 |
| MODEL-0592 | term | §2.8 | glossary term, stated at §2.8 |
| MODEL-0593 | term | §2.8 | glossary term, stated at §2.8 |
| MODEL-0594 | term | §2.8 | glossary term, stated at §2.8 |
| MODEL-0595 | term | §2.9 | glossary term, stated at §2.9 |
| MODEL-0596 | term | §2.9 | glossary term, stated at §2.9 |
| MODEL-0597 | term | §2.7 | glossary term, stated at §2.7 |
| MODEL-0598 | term | §2.6 | glossary term, stated at §2.6 |
| MODEL-0599 | term | §2.3 | glossary term, stated at §2.3 |
| MODEL-0600 | term | §2.6 | glossary term, stated at §2.6 |
| MODEL-0601 | term | §2.2 | glossary term, stated at §2.2 |
| MODEL-0602 | term | §2.8 | glossary term, stated at §2.8 |
| MODEL-0603 | term | §2.5 | glossary term, stated at §2.5 |
| MODEL-0604 | term | §2.5 | glossary term, stated at §2.5 |
| MODEL-0605 | term | §2.7 | glossary term, stated at §2.7 |
| MODEL-0606 | term | §2.2 | glossary term, stated at §2.2 |
| MODEL-0607 | term | §2.8 | glossary term, stated at §2.8 |
| MODEL-0608 | term | §2.7 | glossary term, stated at §2.7 |
| MODEL-0609 | term | §2.5 | resolved (MC-01): `lot` replaced by `plot` outside quotations; `BuildingInput.plot` |